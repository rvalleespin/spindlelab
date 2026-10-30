/**
 * La notificación de pago de Flow.
 *
 * ── EL MODELO DE SEGURIDAD, QUE ES EL MISMO DE SIEMPRE ───────────────────────────────────
 *
 * Flow hace POST acá con **un token y nada más**. Con ese token hay que llamar a
 * `payment/getStatus` para saber qué pasó. O sea: **no se le cree al cuerpo de la
 * notificación, se vuelve a preguntar**.
 *
 * Eso hace que no haga falta verificar una firma de entrada, y conviene entender por qué y no
 * solo que es así: el cuerpo no es una afirmación en la que confiemos, es una pista para ir a
 * buscar la verdad al origen. Alguien que adivine un token lo único que logra es que
 * releamos un pago contra Flow y lleguemos a la misma conclusión que ya teníamos.
 *
 * ── LO QUE NO SE COPIÓ DEL WEBHOOK DE MERCADO PAGO, Y POR QUÉ ────────────────────────────
 *
 * `webhook-mp.js` tiene reserva de eventos, resolución de carreras y reintentos en cadena.
 * Eso nació de que Mercado Pago manda varios eventos por pago, de varios tipos, en paralelo.
 * Flow manda una confirmación por pago. Reproducir esa maquinaria acá sería arrastrar su
 * complejidad sin su motivo, y cada pieza copiada es una pieza más donde equivocarse.
 *
 * Lo que sí se conserva es lo que protege de verdad:
 *
 *   1. **`marcarEstado` es condicional.** Mueve solo si el pedido está donde esperábamos, así
 *      que dos entregas simultáneas no se pisan: una mueve y la otra no, sin candado.
 *   2. **Un pedido ya resuelto no se vuelve a tocar.** Es la idempotencia que Flow necesita,
 *      porque reintenta hasta recibir un 200.
 *   3. **Lo que no calza no se decide solo**: va a revisión Y se avisa.
 *
 * ── EL CÓDIGO DE RESPUESTA DECIDE SI FLOW REINTENTA ──────────────────────────────────────
 *
 * Por eso no se contesta 200 a todo. Se contesta 200 cuando el asunto quedó cerrado —aunque
 * la conclusión sea «no hay nada que hacer»— y 503 solo cuando el que falló fuimos nosotros y
 * un reintento puede salir distinto: la base no responde, o Flow no contestó.
 *
 * Devolver 200 ante un fallo nuestro perdería el aviso para siempre, y un pago quedaría sin
 * marcar sin que nadie se entere.
 */

import { leerPagoFlow, decidirDesdeFlow, credencialesFlow, ACCIONES_FLOW } from './flow.js';
import { leerPedido, marcarEstado } from './almacen.js';
import { ESTADOS, ESTADOS_RESUELTOS, ID_PEDIDO_NUESTRO } from './pedidos.js';
import { avisarVenta, avisarRevisar } from './aviso.js';
import { enviarCorreoDePago } from './correo.js';

function responder(estado, cuerpo) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/** Manda el envío al fondo si se puede; si no, lo espera. Nunca deja que un correo caído tumbe la respuesta. */
function alFondo(contexto, promesa) {
  const seguro = Promise.resolve(promesa).catch((e) => {
    console.log(`[flow] aviso falló: ${(e && e.message) || e}`);
  });
  if (contexto && contexto.waitUntil) contexto.waitUntil(seguro);
  return seguro;
}

export async function onRequestPost(contexto) {
  const { request, env } = contexto;

  // ── 1. El token ───────────────────────────────────────────────────────────────────────
  //
  // Flow lo manda como formulario. Se acepta también el query, porque es gratis y porque una
  // integración que cambie de forma no debería dejar pagos sin marcar.
  let token = null;
  try {
    const tipo = request.headers.get('content-type') || '';
    if (tipo.includes('application/json')) {
      const j = await request.json();
      token = j && j.token;
    } else {
      const f = await request.formData();
      token = f.get('token');
    }
  } catch { /* se intenta el query más abajo */ }
  if (!token) {
    try { token = new URL(request.url).searchParams.get('token'); } catch {}
  }
  if (!token || typeof token !== 'string') {
    // Sin token no hay nada que preguntar, y reintentar no lo va a inventar: 200 y se cierra.
    console.log('[flow] notificación sin token');
    return responder(200, { ok: false, motivo: 'sin-token' });
  }

  if (!env || !env.VYC_PEDIDOS) {
    console.log('[flow] sin base de pedidos');
    return responder(503, { ok: false, motivo: 'sin-base' });
  }

  // ── 2. Se vuelve a preguntar ──────────────────────────────────────────────────────────
  const credenciales = credencialesFlow(env);
  const lectura = await leerPagoFlow(token, credenciales);
  if (!lectura.ok) {
    // No pudimos saber qué pasó. **503 a propósito**: que Flow lo reintente. Un 200 acá
    // convertiría un problema momentáneo en un pago que nadie marca nunca.
    console.log(`[flow] no se pudo releer el pago: ${lectura.error}`);
    return responder(503, { ok: false, motivo: 'no-se-pudo-releer' });
  }
  const pago = lectura.pago;

  // ── 3. De qué pedido es ───────────────────────────────────────────────────────────────
  const idPedido = pago && pago.commerceOrder;
  if (!ID_PEDIDO_NUESTRO.test(String(idPedido || ''))) {
    // Un pago que no es de un pedido nuestro. No es un error que reintentar arregle.
    console.log(`[flow] commerceOrder que no es nuestro: ${String(idPedido).slice(0, 12)}…`);
    return responder(200, { ok: false, motivo: 'referencia-ajena' });
  }

  let pedido = null;
  try { pedido = await leerPedido(env.VYC_PEDIDOS, idPedido); } catch {
    return responder(503, { ok: false, motivo: 'base-no-responde' });
  }
  if (!pedido) {
    // El pedido se inserta ANTES de abrir el pago, así que esto no debería pasar. Si pasa,
    // 503 y que reintente: puede ser una carrera, y cerrar en falso perdería una venta.
    console.log(`[flow] pedido ${String(idPedido).slice(0, 12)}… todavía no está`);
    return responder(503, { ok: false, motivo: 'pedido-todavia-no-esta' });
  }

  // ── 4. La decisión ────────────────────────────────────────────────────────────────────
  const decision = decidirDesdeFlow({ pedido, pago });

  // Un pedido ya resuelto no se vuelve a tocar: Flow reintenta hasta recibir un 200, así que
  // la segunda entrega del MISMO resultado tiene que ser inofensiva.
  if (ESTADOS_RESUELTOS.has(pedido.estado)) {
    if (decision.estado === pedido.estado) {
      return responder(200, { ok: true, accion: ACCIONES_FLOW.NADA, motivo: 'ya-resuelto' });
    }
    // Pero si la notificación quiere llevarlo a OTRO lado, eso no se decide solo. Un pedido
    // pagado que de pronto recibe otra cosa es justo el caso que hay que mirar.
    console.log(`[flow] REVISAR ${pedido.id}: resuelto en ${pedido.estado} y la notificación dice ${decision.estado}`);
    await alFondo(contexto, avisarRevisar(pedido, decision));
    return responder(200, { ok: true, accion: ACCIONES_FLOW.REVISAR, motivo: 'resuelto-y-no-calza' });
  }

  if (decision.accion === ACCIONES_FLOW.REVISAR) {
    console.log(`[flow] REVISAR ${pedido.id}: ${decision.motivo}`);
    await alFondo(contexto, avisarRevisar(pedido, decision));
    return responder(200, { ok: true, accion: ACCIONES_FLOW.REVISAR, motivo: decision.motivo });
  }
  if (decision.accion !== ACCIONES_FLOW.MARCAR) {
    return responder(200, { ok: true, accion: decision.accion, motivo: decision.motivo });
  }

  // ── 5. Mover el pedido ────────────────────────────────────────────────────────────────
  const extra = {};
  if (decision.estado === ESTADOS.PAGADO) extra.pagado_en = new Date().toISOString();

  let movido;
  try {
    movido = await marcarEstado(env.VYC_PEDIDOS, pedido.id, pedido.estado, decision.estado, extra);
  } catch {
    return responder(503, { ok: false, motivo: 'base-no-responde' });
  }

  if (!movido.movido) {
    // Otra entrega llegó primero. Si lo dejó donde esta quería, el trabajo está hecho y pedir
    // un reintento sería avisar de un error que no existe.
    let actual = null;
    try { actual = await leerPedido(env.VYC_PEDIDOS, pedido.id); } catch { actual = null; }
    if (actual && actual.estado === decision.estado) {
      return responder(200, { ok: true, accion: ACCIONES_FLOW.NADA, motivo: 'lo-alcanzó-otra-entrega' });
    }
    console.log(`[flow] no se pudo mover ${pedido.id} de ${pedido.estado} a ${decision.estado}: ${movido.motivo}`);
    return responder(503, { ok: false, motivo: movido.motivo || 'no-se-pudo-mover' });
  }

  // ── 6. Una venta nueva tiene que llegarle a una persona ───────────────────────────────
  if (decision.estado === ESTADOS.PAGADO) {
    let pagado = pedido;
    try { pagado = (await leerPedido(env.VYC_PEDIDOS, pedido.id)) || pedido; } catch {}
    await alFondo(contexto, Promise.all([
      avisarVenta(pagado),
      enviarCorreoDePago(pagado, env.RESEND_API_KEY),
    ]));
  }

  console.log(`[flow] ${pedido.id}: ${pedido.estado} → ${decision.estado} (${decision.motivo})`);
  return responder(200, { ok: true, accion: ACCIONES_FLOW.MARCAR, estado: decision.estado });
}

/** Cualquier otro método. Un GET acá no es una notificación. */
export async function onRequest(contexto) {
  if (contexto.request.method === 'POST') return onRequestPost(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
