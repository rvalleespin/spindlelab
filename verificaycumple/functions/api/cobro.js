/**
 * Qué hacer cuando Mercado Pago avisa algo.
 *
 * Esta es la lógica que decide si un pedido pasa a pagado, y está separada del handler a
 * propósito: así se puede probar sin red, sin base de datos y sin credenciales. El handler que
 * la usa es delgado y solo mueve datos.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * LAS TRES REGLAS QUE NO SE NEGOCIAN
 *
 * 1. EL BODY DE LA NOTIFICACIÓN NO DECIDE NADA. La firma de Mercado Pago cubre solo `data.id`,
 *    `x-request-id` y `ts`; el JSON del cuerpo NO entra en el cálculo. O sea que `status`,
 *    montos y cualquier otra cosa del body vienen SIN autenticar. Lo único que una firma
 *    válida prueba es el origen y el id del recurso. El estado se lee releyendo el pago contra
 *    la API con ese id.
 *
 * 2. SOLO `approved` HABILITA EL TRABAJO. El enum oficial tiene nueve valores y varios se
 *    parecen a «pagado» sin serlo. `authorized` es el más traicionero: el dinero está
 *    autorizado pero NO capturado («waiting for capture»), así que no hay plata.
 *
 * 3. LA MISMA NOTIFICACIÓN VA A LLEGAR VARIAS VECES. Mercado Pago reintenta ocho veces (0 min,
 *    15 min, 30 min, 6 h, 48 h, 96 h, 96 h, 96 h) hasta recibir un 200 o 201, y además el panel
 *    tiene un botón de «Reenviar notificaciones» que un humano puede apretar. Procesar dos
 *    veces el mismo evento tiene que ser inofensivo.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * DOS COSAS QUE LA DOC DICE Y CONVIENE TENER PRESENTES
 *
 * - «Test payments, created with test credentials, will not send notifications.» Los pagos de
 *   prueba NO disparan webhook. La única forma de probar la recepción es el simulador del
 *   panel. No es que el endpoint esté roto.
 *
 * - El índice para agentes de la propia doc dice que Chile (MLC) usa «Payments API como
 *   defecto», mientras la referencia de Checkout Pro para Chile titula su pestaña «Via Orders
 *   API (Recommended)». Lo más probable es que hablen de productos distintos (Checkout API
 *   contra Checkout Pro), pero queda anotado: si al conectar la cuenta real la creación de
 *   orden falla de forma rara, esto es lo primero que hay que mirar.
 */

import { ESTADOS, transicionValida } from './pedidos.js';

/**
 * El enum literal de `status` de /v1/payments/{id}, con lo que significa cada uno.
 * Está completo a propósito: un estado que no esté acá es un estado que no entendemos, y eso
 * se trata distinto que uno que entendemos y no mueve nada.
 */
export const ESTADOS_MP = {
  pending: 'El usuario todavía no completó el pago',
  approved: 'Aprobado y acreditado',
  authorized: 'Autorizado pero NO capturado: todavía no hay plata',
  in_process: 'En revisión',
  in_mediation: 'El usuario abrió una disputa',
  rejected: 'Rechazado, puede reintentar',
  cancelled: 'Cancelado o expirado',
  refunded: 'Devuelto al usuario',
  charged_back: 'Contracargo en la tarjeta',
};

export const ACCIONES = {
  MARCAR: 'marcar',        // hay que cambiar el estado del pedido
  NADA: 'nada',            // todo en orden, no hay nada que cambiar
  IGNORAR: 'ignorar',      // la notificación no es para nosotros
  REVISAR: 'revisar',      // algo no calza: no se toca el pedido y se avisa
};

/**
 * A qué estado nuestro lleva cada estado de Mercado Pago.
 *
 * `null` significa «no mueve el pedido». No es lo mismo que un estado desconocido: acá
 * entendemos lo que pasó y la respuesta correcta es esperar.
 */
const MAPA = {
  approved: ESTADOS.PAGADO,
  rejected: ESTADOS.RECHAZADO,
  cancelled: ESTADOS.RECHAZADO,
  refunded: ESTADOS.DEVUELTO,
  charged_back: ESTADOS.DEVUELTO,
  pending: null,
  in_process: null,
  authorized: null,     // autorizado NO es cobrado
  in_mediation: null,   // una disputa no degrada el pedido sola: se mira a mano
};

/**
 * Decide qué hacer con un pedido dada la relectura del pago.
 *
 * `pago` es lo que devolvió GET /v1/payments/{id}, ya traído de la API. No se le pasa el body
 * de la notificación a propósito: si no está en la respuesta de la API, no se usa.
 *
 * Devuelve siempre `{ accion, estado, motivo, detalle }`.
 */
export function decidirDesdeNotificacion({ pedido, pago }) {
  if (!pedido) {
    return {
      accion: ACCIONES.IGNORAR, estado: null, motivo: 'pedido-desconocido',
      detalle: 'La notificación no corresponde a ningún pedido nuestro.',
    };
  }
  if (!pago || typeof pago !== 'object') {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'sin-pago',
      detalle: 'No se pudo releer el pago contra la API. No se toca el pedido.',
    };
  }

  // El pago tiene que ser de ESTE pedido. Si el external_reference no calza, algo está mal
  // en serio y no se toca nada.
  if (pago.external_reference !== pedido.id) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'referencia-no-calza',
      detalle: `El pago dice ser del pedido ${pago.external_reference} y se buscó ${pedido.id}.`,
    };
  }

  // Y el monto tiene que ser el que se congeló al vender. Si no calza, no se marca pagado:
  // se avisa. Un pedido de $177.310 que llega con $1.000 pagados no es un pedido pagado.
  const pagado = Number(pago.transaction_amount);
  if (!Number.isFinite(pagado) || Math.round(pagado) !== Math.round(Number(pedido.monto_total))) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'monto-no-calza',
      detalle: `Se vendió en ${pedido.monto_total} y el pago dice ${pago.transaction_amount}.`,
    };
  }

  const estadoMP = pago.status;
  if (!(estadoMP in MAPA)) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'estado-desconocido',
      detalle: `Mercado Pago devolvió un estado que no conocemos: ${estadoMP}. No se toca el pedido.`,
    };
  }

  const destino = MAPA[estadoMP];
  if (destino === null) {
    return {
      accion: ACCIONES.NADA, estado: pedido.estado, motivo: `mp-${estadoMP}`,
      detalle: ESTADOS_MP[estadoMP],
    };
  }

  // El reintento de una notificación ya procesada llega acá con el pedido ya en su destino.
  // No es un error: es lo esperado, y no hay nada que escribir.
  if (pedido.estado === destino) {
    return {
      accion: ACCIONES.NADA, estado: destino, motivo: 'ya-estaba',
      detalle: `El pedido ya estaba en ${destino}. La notificación se repitió, que es normal.`,
    };
  }

  if (!transicionValida(pedido.estado, destino)) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'transicion-invalida',
      detalle: `No se pasa de ${pedido.estado} a ${destino} solo. Mercado Pago dice ${estadoMP}.`,
    };
  }

  return {
    accion: ACCIONES.MARCAR, estado: destino, motivo: `mp-${estadoMP}`,
    detalle: ESTADOS_MP[estadoMP],
  };
}

/**
 * ¿Se puede empezar el trabajo?
 *
 * Una sola línea, pero vive acá para que nadie la reinvente en otro archivo con otro criterio.
 * `approved` y nada más. La doc dice que lo normal es que venga con `status_detail: accredited`,
 * pero el que manda es el `status`.
 */
export function habilitaTrabajo(pago) {
  return Boolean(pago && pago.status === 'approved');
}

/**
 * La clave con que se recuerda un evento ya procesado.
 *
 * La doc NO tiene una sección de idempotencia de webhooks. Lo único que vincula explícitamente
 * con evitar duplicados es el campo `id` del cuerpo de la notificación, descrito como
 * «Exclusive identifier of the event, prevents duplicate messages». Se usa ese.
 *
 * Si no viniera, se cae a la combinación de tipo y recurso, que no es tan buena —dos
 * actualizaciones distintas del mismo pago compartirían clave— pero es mejor que procesar sin
 * ninguna defensa. Se devuelve también `exacta` para poder registrarlo y saber en qué caso
 * estamos.
 */
export function claveDeEvento(cuerpo, dataId) {
  if (cuerpo && cuerpo.id !== undefined && cuerpo.id !== null && String(cuerpo.id) !== '') {
    return { clave: `ev_${String(cuerpo.id)}`, exacta: true };
  }
  const tipo = (cuerpo && cuerpo.type) || 'sin-tipo';
  const accion = (cuerpo && cuerpo.action) || 'sin-accion';
  return { clave: `rec_${tipo}_${accion}_${dataId || 'sin-id'}`, exacta: false };
}

/**
 * Lee un pago de la API de Mercado Pago.
 *
 * GET https://api.mercadopago.com/v1/payments/{id} con `Authorization: Bearer <token>`.
 * Devuelve `{ ok, pago, estadoHttp, error }` en vez de lanzar: el handler necesita decidir qué
 * contestarle a Mercado Pago, y una excepción le quitaría esa decisión.
 */
export async function leerPagoMP(idPago, token, fetchImpl = fetch) {
  if (!token) return { ok: false, pago: null, estadoHttp: 0, error: 'sin-token' };
  if (!idPago) return { ok: false, pago: null, estadoHttp: 0, error: 'sin-id' };
  let r;
  try {
    r = await fetchImpl(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(idPago)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    return { ok: false, pago: null, estadoHttp: 0, error: `red: ${e && e.message}` };
  }
  if (!r.ok) return { ok: false, pago: null, estadoHttp: r.status, error: `http-${r.status}` };
  try {
    return { ok: true, pago: await r.json(), estadoHttp: r.status, error: null };
  } catch {
    return { ok: false, pago: null, estadoHttp: r.status, error: 'json-invalido' };
  }
}

/* ================================================================== *
 * EL CAMINO DE LAS ÓRDENES                                           *
 *                                                                     *
 * La configuración real de la cuenta quedó con el evento «Order       *
 * (Mercado Pago)», tópico `orders`, no `payment`. Lo de arriba quedó  *
 * escrito para `payment`, y NO sirve tal cual acá: el mundo de las    *
 * órdenes usa OTRO enum.                                              *
 *                                                                     *
 * No es un matiz. El de pagos es approved / rejected / authorized /   *
 * pending / in_process / in_mediation / cancelled / refunded /        *
 * charged_back. El de órdenes es created / processed /                *
 * action_required / processing / failed / canceled / expired /        *
 * refunded / charged_back. Ni un valor de «pagado» en común:          *
 * `approved` no existe acá, y lo que vale es `processed`.             *
 *                                                                     *
 * Las dos trampas, confirmadas en la referencia el 23-oct-2026:       *
 *                                                                     *
 *  - `action_required` es el `authorized` de este mundo. La doc lo    *
 *    dice literal: «Integrator action is required to complete         *
 *    processing. For example, the capture of an authorized payment».  *
 *    Hay autorización, no hay plata. No habilita el trabajo.          *
 *                                                                     *
 *  - `total_amount` y `transactions.payments[].amount` vienen como    *
 *    STRING, no como número. Compararlos sin convertir da falso       *
 *    siempre, y compararlos con `==` daría verdadero donde no debe.   *
 *                                                                     *
 * Se deja el camino de `payment` escrito y probado: la cuenta ofrece  *
 * también «Pagos (legacy)», y si algún día se activa, ya está.        *
 * ================================================================== */

/** El enum literal de `status` de una ORDEN, con lo que significa cada uno. */
export const ESTADOS_ORDEN = {
  created: 'La orden se creó, nadie pagó todavía',
  processed: 'Todas las transacciones se procesaron: está pagada',
  action_required: 'Falta una acción nuestra, por ejemplo capturar un pago autorizado. NO hay plata',
  processing: 'Se está procesando, sin que haya que hacer nada',
  failed: 'Falló el procesamiento: datos incorrectos, riesgo de fraude o rechazo del emisor',
  refunded: 'Se devolvió',
  canceled: 'Se canceló',
  expired: 'Expiró sin que nadie pagara',
  charged_back: 'Hubo un contracargo',
};

const MAPA_ORDEN = {
  processed: ESTADOS.PAGADO,
  failed: ESTADOS.RECHAZADO,
  canceled: ESTADOS.RECHAZADO,
  expired: ESTADOS.RECHAZADO,
  refunded: ESTADOS.DEVUELTO,
  charged_back: ESTADOS.DEVUELTO,
  created: null,
  processing: null,
  action_required: null,   // autorizado sin capturar: NO es cobrado
};

/** Los montos de la orden vienen como string. Se convierten acá y en un solo lugar. */
function montoDe(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/**
 * Decide qué hacer con un pedido dada la relectura de la ORDEN.
 *
 * Misma forma de respuesta que `decidirDesdeNotificacion`, y las mismas tres comprobaciones
 * antes de mirar el estado: que la orden sea de este pedido, que el monto calce, y que la
 * transición exista.
 */
export function decidirDesdeOrden({ pedido, orden }) {
  if (!pedido) {
    return {
      accion: ACCIONES.IGNORAR, estado: null, motivo: 'pedido-desconocido',
      detalle: 'La notificación no corresponde a ningún pedido nuestro.',
    };
  }
  if (!orden || typeof orden !== 'object') {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'sin-pago',
      detalle: 'No se pudo releer la orden contra la API. No se toca el pedido.',
    };
  }
  if (orden.external_reference !== pedido.id) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'referencia-no-calza',
      detalle: `La orden dice ser del pedido ${orden.external_reference} y se buscó ${pedido.id}.`,
    };
  }

  const total = montoDe(orden.total_amount);
  if (total === null || total !== Math.round(Number(pedido.monto_total))) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'monto-no-calza',
      detalle: `Se vendió en ${pedido.monto_total} y la orden dice ${orden.total_amount}.`,
    };
  }

  const estadoOrden = orden.status;
  if (!(estadoOrden in MAPA_ORDEN)) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'estado-desconocido',
      detalle: `Mercado Pago devolvió un estado de orden que no conocemos: ${estadoOrden}.`,
    };
  }

  const destino = MAPA_ORDEN[estadoOrden];
  if (destino === null) {
    return {
      accion: ACCIONES.NADA, estado: pedido.estado, motivo: `orden-${estadoOrden}`,
      detalle: ESTADOS_ORDEN[estadoOrden],
    };
  }

  // Si la orden dice pagada, lo que de verdad se cobró tiene que calzar también. La doc
  // describe `total_paid_amount` como «la suma de todos los paid_amount de la transacción»,
  // así que una orden `processed` con un pagado menor es algo que se mira a mano.
  if (destino === ESTADOS.PAGADO) {
    const pagado = montoDe(orden.total_paid_amount);
    if (pagado !== null && pagado !== total) {
      return {
        accion: ACCIONES.REVISAR, estado: null, motivo: 'pagado-no-calza',
        detalle: `La orden dice procesada pero se pagaron ${orden.total_paid_amount} de ${orden.total_amount}.`,
      };
    }
  }

  if (pedido.estado === destino) {
    return {
      accion: ACCIONES.NADA, estado: destino, motivo: 'ya-estaba',
      detalle: `El pedido ya estaba en ${destino}. La notificación se repitió, que es normal.`,
    };
  }
  if (!transicionValida(pedido.estado, destino)) {
    return {
      accion: ACCIONES.REVISAR, estado: null, motivo: 'transicion-invalida',
      detalle: `No se pasa de ${pedido.estado} a ${destino} solo. La orden dice ${estadoOrden}.`,
    };
  }

  return {
    accion: ACCIONES.MARCAR, estado: destino, motivo: `orden-${estadoOrden}`,
    detalle: ESTADOS_ORDEN[estadoOrden],
  };
}

/** ¿La orden habilita el trabajo? Solo `processed`, igual que `approved` del otro camino. */
export function ordenHabilitaTrabajo(orden) {
  return Boolean(orden && orden.status === 'processed');
}

/** El id del pago que quedó dentro de la orden, para poder guardarlo. Puede no haber. */
export function pagoDeLaOrden(orden) {
  const pagos = orden && orden.transactions && orden.transactions.payments;
  if (!Array.isArray(pagos) || !pagos.length) return null;
  // El que quedó procesado manda; si no hay ninguno, el primero sirve para dejar rastro.
  const procesado = pagos.find((p) => p && p.status === 'processed');
  const p = procesado || pagos[0];
  return { id: p.id ?? null, estado: p.status ?? null, monto: montoDe(p.amount) };
}

/**
 * Lee una ORDEN de la API de Mercado Pago.
 * GET https://api.mercadopago.com/v1/orders/{order_id}
 */
export async function leerOrdenMP(idOrden, token, fetchImpl = fetch) {
  if (!token) return { ok: false, orden: null, estadoHttp: 0, error: 'sin-token' };
  if (!idOrden) return { ok: false, orden: null, estadoHttp: 0, error: 'sin-id' };
  let r;
  try {
    r = await fetchImpl(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(idOrden)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    return { ok: false, orden: null, estadoHttp: 0, error: `red: ${e && e.message}` };
  }
  if (!r.ok) return { ok: false, orden: null, estadoHttp: r.status, error: `http-${r.status}` };
  try {
    return { ok: true, orden: await r.json(), estadoHttp: r.status, error: null };
  } catch {
    return { ok: false, orden: null, estadoHttp: r.status, error: 'json-invalido' };
  }
}

/**
 * Qué contestarle a Mercado Pago.
 *
 * La doc es clara: espera 200 o 201 dentro de 22 segundos, y si no lo recibe reintenta ocho
 * veces. Eso obliga a una distinción que es fácil de errar:
 *
 *   - Si la notificación se entendió, SE CONTESTA 200, aunque el resultado haya sido «ignorar»
 *     o «revisar». Reintentar no va a cambiar nada y lo único que se logra son ocho copias del
 *     mismo problema.
 *   - Solo se devuelve un error cuando reintentar PODRÍA funcionar: no se pudo leer el pago
 *     contra la API, o la base de datos no respondió. Ahí el reintento es justamente lo que
 *     queremos.
 *   - Y 401 cuando la firma no valida, que es lo que la doc pide.
 */
export function respuestaParaMP({ firmaValida, accion, motivo }) {
  if (!firmaValida) return { estado: 401, cuerpo: { ok: false, motivo: 'firma' } };
  if (motivo === 'sin-pago') return { estado: 503, cuerpo: { ok: false, motivo } };
  return { estado: 200, cuerpo: { ok: true, accion, motivo } };
}
