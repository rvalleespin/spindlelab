/**
 * Pruebas de la decisión del cobro (functions/api/cobro.js).
 *
 *   node prueba-cobro.mjs
 *
 * Es la lógica que decide si un pedido pasa a pagado. Si se equivoca hacia un lado, se entrega
 * trabajo que nadie pagó; si se equivoca hacia el otro, alguien pagó y no recibe nada.
 *
 * Los tres casos que más cuida:
 *
 *   1. `authorized` NO es pagado. Es el estado más traicionero del enum: la plata está
 *      autorizada pero no capturada. Un mapeo descuidado lo trataría como aprobado.
 *   2. El monto tiene que calzar con lo que se vendió. Un pedido de $177.310 que llega con
 *      $1.000 pagados no es un pedido pagado.
 *   3. La misma notificación llega hasta ocho veces. Procesarla de nuevo no puede romper nada
 *      ni escribir dos veces.
 */

import { rutaEnElRepo } from './rutas.mjs';

const RUTA = rutaEnElRepo('verificaycumple/functions/api/cobro.js', 'COBRO_JS');
const m = await import(RUTA);
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const PEDIDO = { id: 'vyc_abc123', estado: P.ESTADOS.CREADO, monto_total: 177310 };
const pago = (extra = {}) => ({
  external_reference: 'vyc_abc123',
  transaction_amount: 177310,
  status: 'approved',
  status_detail: 'accredited',
  ...extra,
});

/* ================================================================== */
console.log('=== 1. el camino feliz ===');
{
  const d = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago() });
  eq('se marca', d.accion, m.ACCIONES.MARCAR);
  eq('y queda pagado', d.estado, P.ESTADOS.PAGADO);
  cierto('habilita el trabajo', m.habilitaTrabajo(pago()));
}

/* ================================================================== */
console.log('=== 2. los nueve estados de Mercado Pago, uno por uno ===');
{
  // El enum completo. Si Mercado Pago agrega uno, cae en «desconocido» y no se inventa nada.
  const esperado = {
    approved:     [m.ACCIONES.MARCAR, P.ESTADOS.PAGADO],
    rejected:     [m.ACCIONES.MARCAR, P.ESTADOS.RECHAZADO],
    cancelled:    [m.ACCIONES.MARCAR, P.ESTADOS.RECHAZADO],
    refunded:     [m.ACCIONES.MARCAR, P.ESTADOS.DEVUELTO],
    charged_back: [m.ACCIONES.MARCAR, P.ESTADOS.DEVUELTO],
    pending:      [m.ACCIONES.NADA,   P.ESTADOS.CREADO],
    in_process:   [m.ACCIONES.NADA,   P.ESTADOS.CREADO],
    authorized:   [m.ACCIONES.NADA,   P.ESTADOS.CREADO],
    in_mediation: [m.ACCIONES.NADA,   P.ESTADOS.CREADO],
  };
  for (const [estadoMP, [accion, estado]] of Object.entries(esperado)) {
    const d = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ status: estadoMP }) });
    eq(`${estadoMP}: la acción`, d.accion, accion);
    eq(`${estadoMP}: el estado`, d.estado, estado);
  }
  eq('los nueve están en el catálogo', Object.keys(m.ESTADOS_MP).length, 9);
}

/* ================================================================== */
console.log('=== 3. EL TRAICIONERO: authorized no es pagado ===');
{
  // «The payment has been authorized but is not yet captured». Hay autorización, no hay plata.
  const d = m.decidirDesdeNotificacion({
    pedido: PEDIDO, pago: pago({ status: 'authorized', status_detail: 'pending_capture' }) });
  falso('NO se marca como pagado', d.estado === P.ESTADOS.PAGADO);
  eq('no se toca el pedido', d.accion, m.ACCIONES.NADA);
  falso('y no habilita el trabajo', m.habilitaTrabajo(pago({ status: 'authorized' })));
  cierto('el motivo dice que no hay plata todavía', /no capturado|todavía no hay plata/i.test(d.detalle));
}

/* ================================================================== */
console.log('=== 4. el monto tiene que calzar con lo que se vendió ===');
{
  const barato = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ transaction_amount: 1000 }) });
  eq('un pago menor no marca nada', barato.accion, m.ACCIONES.REVISAR);
  eq('y dice por qué', barato.motivo, 'monto-no-calza');
  cierto('nombra los dos montos', /177310/.test(barato.detalle) && /1000/.test(barato.detalle));

  const caro = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ transaction_amount: 999999 }) });
  eq('uno mayor tampoco', caro.accion, m.ACCIONES.REVISAR);

  const sinMonto = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ transaction_amount: null }) });
  eq('sin monto tampoco', sinMonto.accion, m.ACCIONES.REVISAR);

  // Mercado Pago puede devolver el monto como número con .0; eso sí calza.
  const conDecimalCero = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ transaction_amount: 177310.0 }) });
  eq('177310.0 sí calza', conDecimalCero.accion, m.ACCIONES.MARCAR);
}

/* ================================================================== */
console.log('=== 5. el pago tiene que ser de ESTE pedido ===');
{
  const otro = m.decidirDesdeNotificacion({
    pedido: PEDIDO, pago: pago({ external_reference: 'vyc_otroPedido' }) });
  eq('no se marca', otro.accion, m.ACCIONES.REVISAR);
  eq('el motivo', otro.motivo, 'referencia-no-calza');

  const sinRef = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ external_reference: null }) });
  eq('sin referencia tampoco', sinRef.accion, m.ACCIONES.REVISAR);
}

/* ================================================================== */
console.log('=== 6. la notificación repetida no rompe nada ===');
{
  // Mercado Pago reintenta 8 veces, y el panel tiene botón de reenviar. Va a pasar.
  const yaPagado = { ...PEDIDO, estado: P.ESTADOS.PAGADO };
  const d = m.decidirDesdeNotificacion({ pedido: yaPagado, pago: pago() });
  eq('no hay nada que escribir', d.accion, m.ACCIONES.NADA);
  eq('el motivo lo dice', d.motivo, 'ya-estaba');
  cierto('y explica que repetir es normal', /se repitió|normal/i.test(d.detalle));

  // Ocho veces seguidas da siempre lo mismo.
  const ocho = Array.from({ length: 8 }, () => m.decidirDesdeNotificacion({ pedido: yaPagado, pago: pago() }));
  eq('las ocho iguales', new Set(ocho.map((x) => x.accion + x.motivo)).size, 1);
}

/* ================================================================== */
console.log('=== 7. lo que NO puede degradarse solo ===');
{
  const pagado = { ...PEDIDO, estado: P.ESTADOS.PAGADO };
  const d = m.decidirDesdeNotificacion({ pedido: pagado, pago: pago({ status: 'rejected' }) });
  eq('un rechazo posterior NO degrada el pedido', d.accion, m.ACCIONES.REVISAR);
  eq('el motivo', d.motivo, 'transicion-invalida');
  falso('y no propone un estado', d.estado);

  // Un contracargo sí lo mueve, porque pagado → devuelto es una transición válida.
  const cb = m.decidirDesdeNotificacion({ pedido: pagado, pago: pago({ status: 'charged_back' }) });
  eq('un contracargo sí lo mueve a devuelto', cb.estado, P.ESTADOS.DEVUELTO);
}

/* ================================================================== */
console.log('=== 8. lo que no se entiende no se toca ===');
{
  const nuevo = m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ status: 'un_estado_nuevo' }) });
  eq('un estado que Mercado Pago agregue mañana', nuevo.accion, m.ACCIONES.REVISAR);
  eq('el motivo', nuevo.motivo, 'estado-desconocido');
  cierto('y lo nombra', /un_estado_nuevo/.test(nuevo.detalle));

  eq('sin pedido se ignora', m.decidirDesdeNotificacion({ pedido: null, pago: pago() }).accion, m.ACCIONES.IGNORAR);
  eq('sin pago se revisa', m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: null }).accion, m.ACCIONES.REVISAR);
  eq('con basura en vez de pago', m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: 'hola' }).accion, m.ACCIONES.REVISAR);
}

/* ================================================================== */
console.log('=== 9. la clave del evento, para no procesar dos veces ===');
{
  const c = m.claveDeEvento({ id: 123456, type: 'payment', action: 'payment.updated' }, '999');
  eq('usa el id del evento', c.clave, 'ev_123456');
  cierto('y dice que es exacta', c.exacta);

  // Sin id, se cae a una clave compuesta. Es peor y hay que saberlo.
  const sin = m.claveDeEvento({ type: 'payment', action: 'payment.updated' }, '999');
  eq('sin id, clave compuesta', sin.clave, 'rec_payment_payment.updated_999');
  falso('y avisa que NO es exacta', sin.exacta);

  eq('sin cuerpo tampoco revienta', m.claveDeEvento(null, '999').clave, 'rec_sin-tipo_sin-accion_999');
  // Dos eventos distintos del mismo pago comparten clave compuesta: es la limitación conocida.
  eq('dos acciones distintas dan claves distintas',
    m.claveDeEvento({ type: 'payment', action: 'payment.created' }, '9').clave !==
    m.claveDeEvento({ type: 'payment', action: 'payment.updated' }, '9').clave, true);
}

/* ================================================================== */
console.log('=== 10. qué se le contesta a Mercado Pago ===');
{
  // La regla: 200 cuando se entendió, aunque el resultado sea «no hice nada». Reintentar no
  // cambiaría nada y lo único que se logra son ocho copias del mismo problema.
  eq('firma inválida → 401',
    m.respuestaParaMP({ firmaValida: false, accion: null, motivo: 'firma' }).estado, 401);
  eq('marcado → 200',
    m.respuestaParaMP({ firmaValida: true, accion: m.ACCIONES.MARCAR, motivo: 'mp-approved' }).estado, 200);
  eq('nada que hacer → 200 igual',
    m.respuestaParaMP({ firmaValida: true, accion: m.ACCIONES.NADA, motivo: 'ya-estaba' }).estado, 200);
  eq('pedido ajeno → 200, reintentar no ayuda',
    m.respuestaParaMP({ firmaValida: true, accion: m.ACCIONES.IGNORAR, motivo: 'pedido-desconocido' }).estado, 200);
  eq('monto raro → 200, reintentar tampoco ayuda',
    m.respuestaParaMP({ firmaValida: true, accion: m.ACCIONES.REVISAR, motivo: 'monto-no-calza' }).estado, 200);

  // La única excepción: cuando reintentar SÍ podría funcionar.
  eq('no se pudo leer el pago → 503 para que reintente',
    m.respuestaParaMP({ firmaValida: true, accion: m.ACCIONES.REVISAR, motivo: 'sin-pago' }).estado, 503);
}

/* ================================================================== */
console.log('=== 11. leer el pago contra la API, sin tocar la red ===');
{
  let pedida = null;
  const fingido = async (url, opts) => {
    pedida = { url, opts };
    return { ok: true, status: 200, json: async () => ({ id: 1, status: 'approved' }) };
  };
  const r = await m.leerPagoMP('12345', 'TOKEN', fingido);
  cierto('ok', r.ok);
  eq('el endpoint es el oficial', pedida.url, 'https://api.mercadopago.com/v1/payments/12345');
  eq('el método', pedida.opts.method, 'GET');
  eq('la autorización es Bearer', pedida.opts.headers.Authorization, 'Bearer TOKEN');
  eq('trae el pago', r.pago.status, 'approved');

  // Un id con caracteres raros se escapa, no se concatena a lo bruto.
  await m.leerPagoMP('12/../../otro', 'T', fingido);
  falso('el id va escapado', pedida.url.includes('/../'));

  // Y todos los fallos devuelven, no lanzan: el handler necesita decidir qué contestar.
  eq('sin token', (await m.leerPagoMP('1', null, fingido)).error, 'sin-token');
  eq('sin id', (await m.leerPagoMP(null, 'T', fingido)).error, 'sin-id');
  eq('404', (await m.leerPagoMP('1', 'T', async () => ({ ok: false, status: 404 }))).error, 'http-404');
  eq('json roto', (await m.leerPagoMP('1', 'T', async () => ({
    ok: true, status: 200, json: async () => { throw new Error('x'); } }))).error, 'json-invalido');
  const caido = await m.leerPagoMP('1', 'T', async () => { throw new Error('ECONNRESET'); });
  falso('la red caída no lanza', caido.ok);
  cierto('y dice que fue la red', /red:/.test(caido.error));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
