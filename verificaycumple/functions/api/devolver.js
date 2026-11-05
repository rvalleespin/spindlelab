/**
 * POST /api/devolver — deja escrito que a un pedido se le devolvió el dinero.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════
 * POR QUÉ EXISTE (4-nov-2026)
 *
 * `devuelto` era un estado al que, con Flow, NADA podía llegar. Lo escribía solo el mapa de
 * estados de Mercado Pago (`cobro.js`: `refunded → DEVUELTO`), y la pasarela viva desde el
 * 30-oct es Flow, cuyo mapa (`ESTADOS_FLOW`) tiene tres números: pendiente, pagado, rechazado.
 * No había endpoint, no había camino manual, no había nada.
 *
 * O sea que si alguien ejercía su derecho a retracto, se le devolvía la plata en el panel de
 * Flow y **el pedido quedaba en `entregado` para siempre**: su pantalla le seguía mostrando el
 * kit, la cola lo seguía listando, y de la devolución no quedaba rastro en ninguna parte.
 *
 * Y la promesa estaba publicada. Los términos del 3-nov declaran el retracto de 10 días,
 * prometen el 100% del dinero y ponen un tope de 45 días para devolverlo. Un sistema que no
 * puede anotar que cumplió una promesa publicada es un sistema que no puede demostrarlo.
 *
 * ── ESTE ENDPOINT NO MUEVE PLATA, Y ES A PROPÓSITO ───────────────────────────────────────
 *
 * La devolución se hace en el panel de Flow, a mano. Acá solo se ANOTA. Podría llamarse a la
 * API de Flow desde acá, y se decidió que no: un endpoint que mueve dinero con una sola clave
 * de cabecera es la clase de cosa que, si esa clave se filtra, vacía la cuenta. La clave ya se
 * filtró una vez hoy (quedó en un transcripto y se rotó), así que la hipótesis no es teórica.
 *
 * Esa separación obliga a una cosa: el correo le dice al cliente que la devolución ya salió.
 * Si se anotara antes de hacerla en Flow, le estaríamos afirmando algo falso. Por eso hace
 * falta la bandera `ya_devuelto_en_flow`: no es ceremonia, es la única forma de que quien
 * llama tenga que declarar que la plata ya se movió.
 * ══════════════════════════════════════════════════════════════════════════════════════════
 */

import { ESTADOS, ID_PEDIDO_NUESTRO } from './pedidos.js';
import { leerPedido, marcarEstado, vistaPublica } from './almacen.js';
import { etapaDelPedido, señalesDelPedido, TITULOS } from './etapas.js';
import { claveDeLaPeticion, mismoSecreto } from './entregar.js';
import { correoDeDevolucion, motivoValido, MOTIVOS_DEVOLUCION } from './correo.js';
import { mandarPorResend } from './correo.js';

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/**
 * Desde qué estados se puede devolver.
 *
 * No es la tabla de transiciones entera: `creado` y `pendiente` también la admiten, pero
 * devolverle plata a quien todavía no pagó no es una devolución, es un error de quien llama,
 * y conviene que el endpoint lo diga en vez de dejarlo pasar.
 */
export const SE_PUEDE_DEVOLVER = new Set([
  ESTADOS.PAGADO, ESTADOS.ENTREGADO, ESTADOS.CONTRACARGADO,
]);

export async function onRequestPost(contexto) {
  const { request, env } = contexto;

  const esperado = typeof env.CLAVE_ENTREGA === 'string' ? env.CLAVE_ENTREGA.trim() : '';
  if (!esperado) {
    // Falla cerrado, igual que la cola y la entrega: no hay modo «sin clave, pasa».
    return json({
      ok: false, motivo: 'sin-clave',
      detalle: 'Falta CLAVE_ENTREGA en los secretos del proyecto.',
    }, 503);
  }
  if (!mismoSecreto(claveDeLaPeticion(request), esperado)) {
    return json({ ok: false, motivo: 'sin-permiso' }, 401);
  }

  let cuerpo = null;
  try { cuerpo = await request.json(); } catch { cuerpo = null; }
  if (!cuerpo || typeof cuerpo !== 'object') {
    return json({ ok: false, motivo: 'cuerpo-invalido' }, 400);
  }

  const id = typeof cuerpo.id === 'string' ? cuerpo.id : '';
  if (!ID_PEDIDO_NUESTRO.test(id)) return json({ ok: false, motivo: 'id-invalido' }, 400);

  const motivo = String(cuerpo.motivo || '').trim();
  if (!motivoValido(motivo)) {
    return json({
      ok: false, motivo: 'motivo-invalido',
      detalle: `El motivo tiene que ser uno de: ${Object.values(MOTIVOS_DEVOLUCION).join(', ')}. ` +
        'Cada uno escribe un correo distinto, así que no es una etiqueta suelta.',
    }, 400);
  }

  // ⚠️ La bandera que obliga a declarar que la plata ya se movió. Ver la cabecera del archivo:
  // el correo que sale de acá le dice al cliente que la devolución ya salió.
  if (cuerpo.ya_devuelto_en_flow !== true) {
    return json({
      ok: false, motivo: 'falta-confirmar-la-devolucion',
      detalle: 'Este endpoint solo ANOTA la devolución; la plata se devuelve en el panel de ' +
        'Flow. Manda "ya_devuelto_en_flow": true solo si ya la devolviste ahí, porque el ' +
        'correo al cliente le dice que la devolución ya salió.',
    }, 400);
  }

  let pedido;
  try { pedido = await leerPedido(env.VYC_PEDIDOS, id); } catch {
    return json({ ok: false, motivo: 'error-de-lectura' }, 409);
  }
  if (!pedido) return json({ ok: false, motivo: 'no-existe' }, 404);

  // Devolver dos veces no es un error que haya que gritar, pero NO se vuelve a mandar el
  // correo: el cliente ya lo recibió, y repetirlo le haría creer que hubo una segunda
  // devolución. Mismo criterio que la entrega.
  if (pedido.estado === ESTADOS.DEVUELTO) {
    return json({
      ok: true, ya_estaba: true, correo_enviado: false,
      motivo_registrado: pedido.motivo_devolucion || null,
      devuelto_en: pedido.devuelto_en || null,
      pedido: vistaPublica(pedido),
      etapa: etapaDelPedido(pedido),
    });
  }

  if (!SE_PUEDE_DEVOLVER.has(pedido.estado)) {
    return json({
      ok: false, motivo: 'no-se-puede-devolver',
      detalle: `Este pedido está en "${pedido.estado}". Solo se devuelve uno que pagó.`,
      estado: pedido.estado,
    }, 409);
  }

  const cuando = new Date().toISOString();
  const movido = await marcarEstado(env.VYC_PEDIDOS, id, pedido.estado, ESTADOS.DEVUELTO, {
    devuelto_en: cuando, motivo_devolucion: motivo,
  });
  if (!movido.movido) {
    return json({ ok: false, motivo: movido.motivo || 'no-se-pudo-mover' }, 409);
  }

  // El estado ya está escrito. Lo que viene no lo puede deshacer: un correo que no sale no
  // vuelve a cobrarle la plata a nadie, así que se informa y no se revierte.
  const fresco = (await leerPedido(env.VYC_PEDIDOS, id)) || { ...pedido, estado: ESTADOS.DEVUELTO };
  let correoEnviado = false;
  const mensaje = correoDeDevolucion(fresco, motivo);
  if (mensaje) {
    const r = await mandarPorResend(mensaje, env.RESEND_API_KEY);
    correoEnviado = Boolean(r.ok);
    if (!r.ok) {
      console.error(`[devolucion] el correo NO salió para ${id.slice(0, 12)}…: ${r.codigo}`);
    }
  }

  console.log(`[devolucion] ${id.slice(0, 12)}… · ${pedido.estado} → devuelto · ${motivo}`);
  return json({
    ok: true,
    correo_enviado: correoEnviado,
    motivo_registrado: motivo,
    devuelto_en: cuando,
    estado_anterior: pedido.estado,
    pedido: vistaPublica(fresco),
    etapa: etapaDelPedido(fresco),
    señales: señalesDelPedido(fresco, TITULOS),
  });
}

/** Cualquier otro método: un GET acá no devuelve plata ni la anota. */
export async function onRequest(contexto) {
  if (contexto.request.method === 'POST') return onRequestPost(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
