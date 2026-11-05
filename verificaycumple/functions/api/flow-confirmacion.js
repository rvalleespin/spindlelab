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
 *   2. **La segunda entrega del MISMO resultado no hace nada.** Es la idempotencia que Flow
 *      necesita, porque reintenta hasta recibir un 200.
 *
 *      ⚠️ Decía «un pedido ya resuelto no se vuelve a tocar», y así estaba escrito: cortaba
 *      para todo estado resuelto sin mirar a dónde iba la notificación. Eso no era idempotencia,
 *      era una puerta cerrada de más, y se comía el caso `rechazado → pagado` —reintentar con
 *      otra tarjeta— dejando el pedido en `rechazado` con la plata cobrada (3-nov-2026). Lo que
 *      decide si un pedido resuelto se puede reabrir es la tabla `TRANSICIONES`, no este
 *      archivo.
 *   3. **Lo que no calza no se decide solo**: va a revisión Y se avisa.
 *   4. **Y lo que la tabla permite tampoco se hace siempre solo.** `contracargado → pagado` es
 *      posible —una disputa se puede ganar— y aun así no lo ejecuta ningún manejador: una
 *      notificación no reabre un pedido cuyo dinero se llevó el emisor de la tarjeta. Esa
 *      lista es `SOLO_A_MANO`, en pedidos.js, y la consultan los dos manejadores (3-nov-2026).
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
import {
  ESTADOS, ESTADOS_RESUELTOS, ID_PEDIDO_NUESTRO, transicionValida, soloAMano, porQueSoloAMano,
} from './pedidos.js';
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

  // Un pedido ya resuelto se toca SOLO si la tabla de transiciones lo permite. Flow reintenta
  // hasta recibir un 200, así que la segunda entrega del MISMO resultado tiene que ser
  // inofensiva; eso lo resuelve la comparación de abajo, no un corte para todo.
  //
  // ⚠️ Esta línea decía «un pedido ya resuelto no se vuelve a tocar» y quedó describiendo lo
  // contrario de lo que hace el bloque desde el arreglo de hoy (ver :143 y siguientes).
  // Corregida el 3-nov-2026: arreglar solo donde te señalaron deja el texto contradiciéndose
  // solo, y el que lea esta línea primero entiende al revés.
  if (ESTADOS_RESUELTOS.has(pedido.estado)) {
    if (decision.estado === pedido.estado) {
      return responder(200, { ok: true, accion: ACCIONES_FLOW.NADA, motivo: 'ya-resuelto' });
    }

    // ── EL CORTE QUE COBRABA SIN MARCAR LA VENTA (3-nov-2026) ───────────────────────────
    //
    // Hasta hoy este bloque cortaba acá para TODO estado resuelto, sin mirar a dónde quería ir
    // la notificación, y eso dejaba afuera justo la transición que existe para este caso:
    // `rechazado → pagado`. El comentario que la justifica está en `TRANSICIONES`, en
    // pedidos.js, y dice textual que sin ella «el pedido se quedaba en `rechazado` con la plata
    // ya cobrada». Este manejador nunca la alcanzaba.
    //
    // No es un caso de borde: reintentar con otra tarjeta después de un rechazo es el camino
    // normal de una compra chilena. Y nada más lo rescataba — el manejador de Mercado Pago no
    // tiene este corte y por eso allá sí funcionaba, mientras que acá la segunda notificación
    // se iba en un 200 con `resuelto-y-no-calza`; y `convieneRefrescar` solo mira `pendiente` o
    // `creado`, así que la red de seguridad de la pantalla tampoco volvía a pasar nunca por un
    // pedido en `rechazado`. Quedaba cobrado, sin entregar, y con la pantalla diciéndole a la
    // persona que su pago fue rechazado.
    //
    // ⚠️ EL CORTE NO SE BORRA: SE LE DA EL CRITERIO QUE LE FALTABA. Lo que protege sigue
    // protegiendo —una notificación tardía no reabre un pedido cerrado— porque lo que decide
    // ahora es si ESA transición concreta está permitida.
    //
    // ⚠️⚠️ Y NO SE ESCRIBE UNA SEGUNDA LISTA DE «QUÉ SE PUEDE REABRIR». Esa lista ya existe,
    // es `TRANSICIONES`, y es la misma que `marcarEstado` va a consultar unas líneas más abajo.
    // Un `Set` propio acá serían dos constantes del mismo hecho: el día que una cambiara, la
    // otra seguiría contestando lo de antes, sin error y sin nada que mirar.
    if (!transicionValida(pedido.estado, decision.estado)) {
      console.log(`[flow] REVISAR ${pedido.id}: resuelto en ${pedido.estado} y la notificación dice ${decision.estado}`);
      await alFondo(contexto, avisarRevisar(pedido, decision, env));
      return responder(200, { ok: true, accion: ACCIONES_FLOW.REVISAR, motivo: 'resuelto-y-no-calza' });
    }

    // ── QUE LA TABLA LO PERMITA NO ES QUE SE HAGA SOLO (3-nov-2026) ────────────────────
    //
    // El arreglo de arriba —consultar `TRANSICIONES` en vez de cortar para todo estado
    // resuelto— rescató `rechazado → pagado`, que es el reintento con otra tarjeta. Y de paso
    // abrió una celda que antes el corte tapaba sin querer: `contracargado → pagado` también
    // está en la tabla, así que una notificación quedaba pudiendo reabrir sola un pedido
    // contracargado, disparar el aviso de VENTA y mandarle al comprador el correo de «tu pago
    // entró» por una plata que el emisor ya se llevó.
    //
    // Se saca del camino automático, no de la tabla: la reversión de una disputa ganada sigue
    // existiendo, pero la hace una persona que fue a mirar el panel. El criterio vive en
    // `SOLO_A_MANO`, en pedidos.js, que es la misma que consulta el manejador de Mercado Pago.
    //
    // Y el motivo es PROPIO, no `resuelto-y-no-calza`: las dos situaciones son distintas —una
    // es una transición que no existe, la otra una que existe y no se automatiza— y quien lea
    // el aviso tiene que poder distinguirlas sin investigar.
    if (soloAMano(pedido.estado, decision.estado)) {
      const aMano = {
        motivo: 'reapertura-a-mano',
        detalle: `${porQueSoloAMano(pedido.estado, decision.estado)} Flow dice ${decision.motivo}.`,
      };
      console.log(`[flow] REVISAR ${pedido.id}: ${pedido.estado} → ${decision.estado} no se hace solo`);
      await alFondo(contexto, avisarRevisar(pedido, aMano, env));
      return responder(200, { ok: true, accion: ACCIONES_FLOW.REVISAR, motivo: 'reapertura-a-mano' });
    }

    console.log(`[flow] ${pedido.id} estaba resuelto en ${pedido.estado} y se reabre a ${decision.estado}: la tabla de transiciones lo permite`);
  }

  if (decision.accion === ACCIONES_FLOW.REVISAR) {
    console.log(`[flow] REVISAR ${pedido.id}: ${decision.motivo}`);
    await alFondo(contexto, avisarRevisar(pedido, decision, env));
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
      avisarVenta(pagado, env),
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
