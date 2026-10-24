/**
 * POST /api/webhook-mp — la notificación de Mercado Pago.
 *
 * Es el único punto del sistema por el que un pedido pasa a «pagado». Todo lo que decide vive
 * en módulos aparte, probados sin red ni base; esto es el pegamento, y es delgado a propósito:
 * lo que no tiene lógica no puede tener un error de lógica.
 *
 * EL ORDEN IMPORTA Y NO ES ARBITRARIO:
 *
 *   1. Verificar la firma. Antes de eso no se toca nada, ni siquiera para registrar que llegó
 *      algo: si no, cualquiera llena la tabla de eventos desde afuera.
 *   2. Reclamar el evento. Es un INSERT OR IGNORE sobre la clave primaria, o sea atómico. El
 *      que no consigue la fila se va con un 200 sin hacer nada.
 *   3. Releer la orden CONTRA LA API. El cuerpo de la notificación no está firmado y no se usa
 *      para decidir: solo para sacar la clave del evento.
 *   4. Decidir y mover. Las dos cosas con sus propias defensas.
 *
 * Y SI EL TRABAJO FALLA DESPUÉS DE RECLAMAR, SE SUELTA EL EVENTO. Si no, el reintento ve que
 * ya está registrado y se va sin hacer nada: un pago perdido en silencio, que es el peor
 * resultado posible de este archivo.
 *
 * Mercado Pago espera 200 o 201 en 22 segundos y reintenta ocho veces (0 min, 15, 30, 6 h, 48,
 * 96, 96, 96). Por eso se contesta 200 incluso cuando el resultado fue «no hice nada»:
 * reintentar no cambiaría nada y lo único que se consigue son ocho copias del mismo problema.
 */

import { verificarFirma, CABECERA_FIRMA, CABECERA_REQUEST_ID, PARAM_DATA_ID } from './firma-mp.js';
import { claveDeEvento, leerOrdenMP, decidirDesdeOrden, pagoDeLaOrden, ACCIONES } from './cobro.js';
import {
  registrarEvento, liberarEvento, anotarResultado, leerPedido, marcarEstado,
} from './almacen.js';
import { ESTADOS, ID_PEDIDO_NUESTRO } from './pedidos.js';

function responder(estado, cuerpo) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestPost(contexto) {
  const { request, env } = contexto;
  const url = new URL(request.url);
  const dataId = url.searchParams.get(PARAM_DATA_ID);
  const requestId = request.headers.get(CABECERA_REQUEST_ID);

  // ── 1. La firma, antes que todo ─────────────────────────────────────────────────────────
  const firma = await verificarFirma({
    dataId,
    requestId,
    cabeceraFirma: request.headers.get(CABECERA_FIRMA),
    secreto: env.MP_WEBHOOK_SECRET,
  });
  if (!firma.valida) {
    // 401 es lo que la doc pide. El motivo va en el cuerpo para poder depurar: sin él, un
    // webhook que rechaza todo es imposible de arreglar en producción.
    return responder(401, { ok: false, motivo: firma.motivo });
  }

  if (!env.VYC_PEDIDOS) {
    // Falla nuestra y recuperable: que reintente.
    return responder(503, { ok: false, motivo: 'sin-base' });
  }

  // El cuerpo se lee SOLO para sacar la clave del evento. No está firmado, así que nada de lo
  // que diga sobre el estado del pago se usa para decidir.
  let cuerpo = null;
  try { cuerpo = await request.json(); } catch { cuerpo = null; }
  const { clave, exacta } = claveDeEvento(cuerpo, dataId);

  // ── 2. Reclamar el evento ───────────────────────────────────────────────────────────────
  let reclamo;
  try {
    reclamo = await registrarEvento(env.VYC_PEDIDOS, clave, {
      tipo: (cuerpo && cuerpo.type) || null,
    });
  } catch {
    return responder(503, { ok: false, motivo: 'base-no-responde' });
  }
  if (!reclamo.primeraVez) {
    return responder(200, { ok: true, accion: ACCIONES.NADA, motivo: 'repetido' });
  }

  // De acá en adelante, cualquier salida recuperable tiene que soltar el evento.
  //
  // Soltarlo puede fallar, y falla justo en el caso típico: se llama porque la base no
  // respondió, así que el DELETE arranca con la base ya caída. Por eso hay dos defensas y no
  // una: el reclamo VENCE solo en `registrarEvento`, y acá el motivo dice si la liberación
  // salió o no, para poder leerlo en el registro de entregas de Mercado Pago. Lo que no se
  // hace es contestar 503 afirmando que se soltó cuando no se sabe.
  const soltarYReintentar = async (motivo) => {
    const soltado = await liberarEvento(env.VYC_PEDIDOS, clave);
    return responder(503, {
      ok: false,
      motivo: soltado && soltado.soltado ? motivo : `${motivo}+reclamo-vence-solo`,
    });
  };

  // ── 3. Releer la orden contra la API ────────────────────────────────────────────────────
  const lectura = await leerOrdenMP(dataId, env.MP_ACCESS_TOKEN);
  if (!lectura.ok) {
    // Un 404 de Mercado Pago no se arregla reintentando: esa orden no existe o no es nuestra.
    // Todo lo demás —red caída, 5xx, token vencido— sí.
    if (lectura.estadoHttp === 404) {
      await anotarResultado(env.VYC_PEDIDOS, clave, 'orden inexistente (404)');
      return responder(200, { ok: true, accion: ACCIONES.IGNORAR, motivo: 'orden-inexistente' });
    }
    return soltarYReintentar(`no-se-pudo-leer:${lectura.error}`);
  }

  const orden = lectura.orden;
  const idPedido = orden && orden.external_reference;

  // ── 4. Buscar nuestro pedido ────────────────────────────────────────────────────────────
  let pedido = null;
  try {
    pedido = idPedido ? await leerPedido(env.VYC_PEDIDOS, idPedido) : null;
  } catch {
    return soltarYReintentar('base-no-responde');
  }

  if (!pedido) {
    // Hay dos casos distintos detrás de «no está el pedido», y se tratan al revés.
    //
    // Si la referencia tiene nuestra forma, lo más probable es una carrera: la orden existe en
    // Mercado Pago y nuestro INSERT todavía no aterrizó. Reintentar lo arregla, así que se
    // suelta el evento y se pide reintento.
    //
    // Si no tiene nuestra forma, es de otra integración de la misma cuenta y reintentar no va
    // a cambiarlo nunca.
    if (typeof idPedido === 'string' && ID_PEDIDO_NUESTRO.test(idPedido)) {
      return soltarYReintentar('pedido-todavia-no-esta');
    }
    await anotarResultado(env.VYC_PEDIDOS, clave, `referencia ajena: ${idPedido}`);
    return responder(200, { ok: true, accion: ACCIONES.IGNORAR, motivo: 'pedido-desconocido' });
  }

  // ── 5. Decidir ──────────────────────────────────────────────────────────────────────────
  const decision = decidirDesdeOrden({ pedido, orden });

  if (decision.accion !== ACCIONES.MARCAR) {
    await anotarResultado(env.VYC_PEDIDOS, clave, `${decision.accion}: ${decision.motivo}`);
    return responder(200, { ok: true, accion: decision.accion, motivo: decision.motivo });
  }

  // ── 6. Mover el pedido ──────────────────────────────────────────────────────────────────
  const extra = { mp_order_id: orden.id || null };
  const pago = pagoDeLaOrden(orden);
  if (pago && pago.id) extra.mp_payment_id = String(pago.id);
  if (decision.estado === ESTADOS.PAGADO) extra.pagado_en = new Date().toISOString();

  let movido;
  try {
    movido = await marcarEstado(env.VYC_PEDIDOS, pedido.id, pedido.estado, decision.estado, extra);
  } catch {
    return soltarYReintentar('base-no-responde');
  }

  // Que no se haya movido acá no es un error: significa que otro proceso llegó primero y ya
  // lo dejó donde tenía que quedar. El evento igual se dio por procesado.
  await anotarResultado(
    env.VYC_PEDIDOS, clave,
    `${movido.movido ? 'movido' : movido.motivo} a ${decision.estado}${exacta ? '' : ' (clave no exacta)'}`,
  );

  return responder(200, {
    ok: true,
    accion: movido.movido ? ACCIONES.MARCAR : ACCIONES.NADA,
    motivo: movido.movido ? decision.motivo : movido.motivo,
  });
}

/**
 * Cualquier otro método.
 *
 * Mercado Pago manda POST. Un GET acá es alguien mirando, y no tiene por qué recibir una
 * pista de que esto existe más allá de que el método no se permite.
 */
export async function onRequest(contexto) {
  if (contexto.request.method === 'POST') return onRequestPost(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
