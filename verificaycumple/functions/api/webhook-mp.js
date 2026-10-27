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

import {
  verificarFirma, CABECERA_FIRMA, CABECERA_REQUEST_ID, PARAM_DATA_ID, PARAM_TIPO,
  PARAM_REF_EXTERNA,
} from './firma-mp.js';
import { claveDeEvento, leerOrdenMP, decidirDesdeOrden, pagoDeLaOrden, ACCIONES } from './cobro.js';
import {
  registrarEvento, liberarEvento, anotarResultado, leerPedido, marcarEstado, VENTANA_RECLAMO_MS,
} from './almacen.js';
import { ESTADOS, ID_PEDIDO_NUESTRO } from './pedidos.js';
import { avisarVenta, avisarRevisar } from './aviso.js';
import { enviarCorreoDePago } from './correo.js';

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
    // 401 es lo que la doc pide, y el motivo va en el cuerpo, que Mercado Pago sí guarda en su
    // registro de entregas. Pero ese registro está en SU panel, no acá: durante horas, el
    // 24-oct, todas las notificaciones de un pago real se rechazaron por tener cargado el
    // secreto de la aplicación equivocada, y de nuestro lado no quedó ni una línea. Un secreto
    // malo y alguien golpeando la puerta se ven exactamente igual: nada.
    //
    // Por eso se escribe acá lo que es NUESTRO y acotado. Nunca el secreto, nunca el `v1` ni el
    // `ts` de la firma, nunca el cuerpo, y nunca el valor de un parámetro que elige quien
    // llama: solo si venían, y si la referencia externa tiene la forma de un id nuestro. Esa
    // última es la que separa las dos hipótesis, porque un escaneo no conoce ningún id nuestro.
    const refExterna = url.searchParams.get(PARAM_REF_EXTERNA);
    console.log('[webhook] firma rechazada: ' + firma.motivo +
      ` · data.id:${dataId ? 'sí' : 'no'}` +
      ` · request-id:${requestId ? 'sí' : 'no'}` +
      ` · referencia nuestra:${ID_PEDIDO_NUESTRO.test(String(refExterna || '')) ? 'sí' : 'no'}`);
    return responder(401, { ok: false, motivo: firma.motivo });
  }

  // ── Un tópico que no atendemos se descarta ANTES de reclamar nada ──────────────────────
  //
  // La URL real trae `type=order` (capturado el 24-oct). Hoy la cuenta solo tiene suscrito
  // «Order (Mercado Pago)», así que este camino no se usa; existe para el día que se sume otro
  // tópico, que es cuando dejaría de ser inofensivo: sin esto, un aviso de otra cosa se trataría
  // como orden, se le pediría a Mercado Pago una orden con un id que no es de orden, y de paso
  // QUEMARÍA la clave del evento de esa orden.
  //
  // Va antes de `registrarEvento` justo por eso. Un `type` ausente se deja pasar: no está
  // firmado, y negar por su ausencia sería dejar que quien llama decida que no lo atendamos.
  const tipoUrl = url.searchParams.get(PARAM_TIPO);
  if (tipoUrl && tipoUrl !== 'order') {
    return responder(200, { ok: true, accion: ACCIONES.NADA, motivo: `tipo-no-atendido:${tipoUrl}` });
  }

  if (!env.VYC_PEDIDOS) {
    // Falla nuestra y recuperable: que reintente.
    //
    // ⚠️ El motivo que va en este cuerpo NO se puede leer en ninguna parte: Cloudflare
    // intercepta cualquier 5xx que salga de una Pages Function y lo reemplaza por su propia
    // página de texto plano, así que lo que Mercado Pago guarda en su registro de entregas es
    // la página de Cloudflare, no esto. El código 503 sí llega —y es lo que hace que reintente,
    // que es para lo que está—, pero el motivo solo existe si se escribe acá.
    console.log('[webhook] 503 sin-base');
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
    console.log('[webhook] 503 base-no-responde');
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
  //
  // Ese motivo se escribe además en el registro. El comentario anterior decía que se podía leer
  // «en el registro de entregas de Mercado Pago», y es falso: Cloudflare reemplaza el cuerpo de
  // cualquier 5xx por su propia página, así que allá llega la de Cloudflare. Sin este
  // `console.log` el motivo no existe en ninguna parte.
  const soltarYReintentar = async (motivo) => {
    const soltado = await liberarEvento(env.VYC_PEDIDOS, clave);
    const dicho = soltado && soltado.soltado ? motivo : `${motivo}+reclamo-vence-solo`;
    console.log(`[webhook] 503 ${dicho} · clave ${clave}`);
    return responder(503, { ok: false, motivo: dicho });
  };

  // ── 3. Releer la orden contra la API ────────────────────────────────────────────────────
  const lectura = await leerOrdenMP(dataId, env.MP_ACCESS_TOKEN);
  if (!lectura.ok) {
    // Un 404 de Mercado Pago no se arregla reintentando: esa orden no existe o no es nuestra.
    // Todo lo demás —red caída, 5xx, token vencido— sí.
    if (lectura.estadoHttp === 404) {
      // ── UN 404 NO SIEMPRE ES DEFINITIVO ─────────────────────────────────────────────────
      //
      // Antes se cerraba de inmediato, y cerrar quiere decir ESCRIBIR el resultado del evento,
      // que es irreversible: el rescate del reclamo abandonado exige `resultado IS NULL`, así
      // que ni el reintento de Mercado Pago ni un reenvío manual desde el panel vuelven a
      // procesarlo. Con la plata ya cobrada.
      //
      // Y hay un 404 que no es definitivo: el token puede estar apuntando a una aplicación
      // distinta de la que tiene el webhook configurado. Ese desajuste no es hipotético, esta
      // integración ya lo cometió el 24-oct con el OTRO secreto, y se puede repetir al cargar
      // las credenciales de producción. También puede serlo si la orden todavía no es visible
      // en la API cuando el aviso llega.
      //
      // La ventana se toma prestada de `VENTANA_RECLAMO_MS`, que ya es el horizonte en que este
      // sistema considera que un evento sigue en vuelo. Pasada, el 404 sí es definitivo: esa
      // orden no es nuestra y reintentar no lo va a cambiar nunca.
      // El parámetro con NUESTRO id no está firmado y puede no venir. Sin él no se puede saber
      // de qué pedido se trata, y entonces la pregunta no es «¿es reciente?» sino «¿qué hago
      // cuando no sé?». La respuesta es el lado seguro: NO cerrar. Cerrar es irreversible —el
      // rescate del reclamo exige `resultado IS NULL`— y los reintentos de Mercado Pago son
      // finitos, así que equivocarse hacia el reintento cuesta ruido y equivocarse hacia el
      // cierre cuesta un pago.
      const refUrl = url.searchParams.get(PARAM_REF_EXTERNA);
      let cerrable = false;
      if (refUrl) {
        try {
          const posible = await leerPedido(env.VYC_PEDIDOS, refUrl);
          // Solo se cierra si SABEMOS de qué pedido se trata y ya pasó su ventana. Un
          // `data.external_reference` que no corresponde a ningún pedido nuestro también es
          // cerrable: esa orden no es de esta integración.
          cerrable = !posible || !posible.creado_en ||
            Date.now() - Date.parse(posible.creado_en) >= VENTANA_RECLAMO_MS;
        } catch { cerrable = false; }
      } else {
        console.log('[webhook] 404 sin data.external_reference: no se cierra, se pide reintento');
      }

      if (!cerrable) return soltarYReintentar('orden-todavia-no-esta');

      await anotarResultado(env.VYC_PEDIDOS, clave,
        `orden inexistente (404)${exacta ? '' : ' (clave no exacta)'}`);
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
    await anotarResultado(env.VYC_PEDIDOS, clave,
      `referencia ajena: ${idPedido}${exacta ? '' : ' (clave no exacta)'}`);
    return responder(200, { ok: true, accion: ACCIONES.IGNORAR, motivo: 'pedido-desconocido' });
  }

  // ── 5. Decidir ──────────────────────────────────────────────────────────────────────────
  const decision = decidirDesdeOrden({ pedido, orden });

  if (decision.accion !== ACCIONES.MARCAR) {
    // REVISAR significa que la orden dice algo que no calza con lo que vendimos, y eso lo tiene
    // que mirar una persona. Hasta ahora la nota moría en una columna que nadie consulta.
    if (decision.accion === ACCIONES.REVISAR) {
      console.log(`[webhook] REVISAR ${pedido.id}: ${decision.motivo}`);
      // Y además se avisa. El registro queda igual, pero dejar de depender de que alguien lo
      // consulte es la diferencia entre un estado que existe y uno que no.
      const envio = avisarRevisar(pedido, decision);
      if (contexto && contexto.waitUntil) contexto.waitUntil(envio); else await envio;
    }
    await anotarResultado(env.VYC_PEDIDOS, clave,
      `${decision.accion}: ${decision.motivo}${exacta ? '' : ' (clave no exacta)'}`);
    return responder(200, { ok: true, accion: decision.accion, motivo: decision.motivo });
  }

  // ── 6. Mover el pedido ──────────────────────────────────────────────────────────────────
  const extra = { mp_order_id: orden.id || null };
  const pago = pagoDeLaOrden(orden);
  if (pago && pago.id) extra.mp_payment_id = String(pago.id);
  if (decision.estado === ESTADOS.PAGADO) extra.pagado_en = new Date().toISOString();

  let estadoFinal = decision.estado;
  let nota = '';
  let movido;
  try {
    movido = await marcarEstado(env.VYC_PEDIDOS, pedido.id, pedido.estado, estadoFinal, extra);
  } catch {
    return soltarYReintentar('base-no-responde');
  }

  // ── QUE NO SE HAYA MOVIDO SON DOS COSAS DISTINTAS, Y SE TRATABAN IGUAL ─────────────────
  //
  // El comentario que estaba acá decía que otro proceso «ya lo dejó donde tenía que quedar», y
  // daba el 200 por bueno. Eso es cierto en un caso y falso en el otro, y el falso pierde plata:
  //
  //   benigno — dos avisos que dicen LO MISMO se cruzan. El que pierde no tiene nada que
  //             aportar y el 200 corresponde.
  //   grave   — dos avisos con información DISTINTA se cruzan. Los dos leen el pedido en
  //             `creado`; el primero lo mueve a `pendiente`, el segundo traía `pagado` y su
  //             UPDATE no encuentra la fila en el estado que esperaba. Con el 200 de antes, esa
  //             entrega se daba por procesada y Mercado Pago no volvía a avisar: el pedido se
  //             quedaba en `pendiente` con la plata cobrada. La variante `rechazado` + `pagado`
  //             es peor todavía, y es el camino normal de quien reintenta con otra tarjeta.
  //
  // Para distinguirlos no hace falta criterio nuevo: se relee el pedido como quedó y se vuelve
  // a preguntar lo mismo. `decidirDesdeOrden` ya sabe contestar «ya estaba» cuando esta entrega
  // traía información vieja, y «no se pasa de X a Y solo» cuando no hay camino. Solo si vuelve
  // a decir MARCAR es que esta entrega traía algo que el pedido todavía no refleja.
  //
  // Por eso tampoco se puede quedar pegado reintentando: una entrega vieja nunca vuelve a dar
  // MARCAR.
  if (!movido.movido) {
    let actual = null;
    try { actual = await leerPedido(env.VYC_PEDIDOS, pedido.id); } catch { actual = null; }
    if (!actual) return soltarYReintentar('base-no-responde');

    const reintento = decidirDesdeOrden({ pedido: actual, orden });

    if (reintento.accion !== ACCIONES.MARCAR) {
      // No hay nada que alcanzar. La nota tiene que decir DÓNDE quedó el pedido de verdad: la
      // primera versión escribía el estado que esta entrega quería, que el pedido no tiene, y
      // eso convierte el registro en algo que miente justo cuando hay que auditarlo.
      estadoFinal = actual.estado;
      nota = ` (perdió la carrera; ${reintento.motivo})`;
      if (reintento.accion === ACCIONES.REVISAR) {
        console.log(`[webhook] REVISAR ${pedido.id} tras la carrera: ${reintento.motivo}`);
      }
    } else {
      const extra2 = { ...extra };
      if (reintento.estado === ESTADOS.PAGADO) extra2.pagado_en = new Date().toISOString();
      else delete extra2.pagado_en;
      try {
        movido = await marcarEstado(env.VYC_PEDIDOS, actual.id, actual.estado, reintento.estado, extra2);
      } catch {
        return soltarYReintentar('base-no-responde');
      }

      if (!movido.movido) {
        // Otra entrega volvió a ganar en el mismo instante. Antes de pedir reintento hay que
        // mirar: si esa otra entrega lo dejó justo donde esta quería, el trabajo está hecho y
        // un 503 sería avisar de un error que no existe — y encima soltaría el evento, que es
        // el único rastro que queda de esta entrega.
        let tercera = null;
        try { tercera = await leerPedido(env.VYC_PEDIDOS, pedido.id); } catch { tercera = null; }
        if (!tercera || tercera.estado !== reintento.estado) {
          return soltarYReintentar(`no-se-pudo-alcanzar:${reintento.estado}`);
        }
        estadoFinal = tercera.estado;
        nota = ` (lo alcanzó otra entrega: ya estaba en ${tercera.estado})`;
      } else {
        estadoFinal = reintento.estado;
        nota = ` (perdió la carrera contra ${actual.estado} y se alcanzó)`;
        console.log(`[webhook] ${pedido.id}: carrera perdida contra ${actual.estado}, alcanzado a ${estadoFinal}`);
      }
    }
  }

  // Una venta nueva tiene que llegarle a una persona. Va con `waitUntil` para no demorar la
  // respuesta a Mercado Pago: un aviso lento no puede convertirse en un reintento.
  //
  // Solo cuando ESTA entrega fue la que movió el pedido. Si lo alcanzó otra, esa otra ya avisó,
  // y dos avisos por la misma venta se leen como dos ventas.
  if (movido.movido && estadoFinal === ESTADOS.PAGADO) {
    const pagado = { ...pedido, estado: estadoFinal, pagado_en: extra.pagado_en };
    // Dos destinatarios distintos y por vías distintas: el aviso interno a nosotros, y el
    // correo con su enlace a quien compró. Se lanzan juntos y ninguno espera al otro: si uno
    // falla, el otro igual sale.
    const envios = Promise.all([
      avisarVenta(pagado),
      enviarCorreoDePago(pagado, env.RESEND_API_KEY),
    ]);
    if (contexto.waitUntil) contexto.waitUntil(envios); else await envios;
  }

  await anotarResultado(
    env.VYC_PEDIDOS, clave,
    `${movido.movido ? 'movido' : movido.motivo} a ${estadoFinal}${nota}${exacta ? '' : ' (clave no exacta)'}`,
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
