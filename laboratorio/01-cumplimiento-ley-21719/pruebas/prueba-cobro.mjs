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
    // CAMBIÓ EL 24-OCT: un contracargo lo revierte el emisor tras una disputa, no nosotros.
    // Compartir estado con `refunded` hacía que la pantalla dijera «te devolvimos el dinero»,
    // que es atribuirse una acción que el registro no acredita.
    charged_back: [m.ACCIONES.MARCAR, P.ESTADOS.CONTRACARGADO],
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

  // Un contracargo sí mueve el pedido, pero a SU estado, no al de una devolución nuestra.
  const cb = m.decidirDesdeNotificacion({ pedido: pagado, pago: pago({ status: 'charged_back' }) });
  eq('un contracargo lo mueve a contracargado', cb.estado, P.ESTADOS.CONTRACARGADO);
  falso('y NO al de devuelto, que es el que decimos haber hecho nosotros',
    cb.estado === P.ESTADOS.DEVUELTO);
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
  // ⚠️ ESTE BLOQUE CAMBIÓ EL 24-OCT-2026, Y VALE LA PENA SABER POR QUÉ.
  //
  // Las tres aserciones de abajo esperaban `ev_123456`, `rec_payment_payment.updated_999` y
  // `rec_sin-tipo_sin-accion_999`: o sea, FIJABAN que el `data.id` se descartaba. Pasaban en
  // verde con el defecto puesto, porque una aserción que copia lo que el código hace no
  // protege nada — lo clava. El defecto era serio: la firma no cubre el cuerpo, así que con
  // una firma capturada se podía mandar cualquier cuerpo y quemar la clave de CUALQUIER
  // pedido, incluido uno nunca visto, y dejar sin marcar un cobro futuro.
  //
  // La forma de no repetirlo no es «escribir mejores aserciones»: es preguntarse, por cada una
  // que compara contra un literal, si ese literal se eligió por una razón o se copió de la
  // salida. Las de abajo ahora sí tienen razón escrita.
  const c = m.claveDeEvento({ id: 123456, type: 'payment', action: 'payment.updated' }, '999');
  eq('lleva el recurso firmado Y el id del aviso', c.clave, 'ev_999_123456');
  cierto('y dice que es exacta', c.exacta);

  // Lo que el literal de arriba protege: el recurso tiene que estar.
  cierto('dos recursos distintos con el mismo id de aviso NO colisionan',
    m.claveDeEvento({ id: 123456 }, 'ORD_A').clave !== m.claveDeEvento({ id: 123456 }, 'ORD_B').clave);
  // Y el reintento legítimo del MISMO aviso tiene que seguir colisionando, que es su trabajo.
  eq('el mismo aviso del mismo recurso da la misma clave',
    m.claveDeEvento({ id: 123456 }, 'ORD_A').clave, m.claveDeEvento({ id: 123456 }, 'ORD_A').clave);
  // El data.id llega con mayúsculas desde Mercado Pago; la caja no puede crear recursos nuevos.
  eq('la caja del data.id no cuenta',
    m.claveDeEvento({ id: 1 }, 'ORD_A').clave, m.claveDeEvento({ id: 1 }, 'ord_a').clave);

  // Sin id, se cae a una clave compuesta. Es peor y hay que saberlo.
  const sin = m.claveDeEvento({ type: 'payment', action: 'payment.updated' }, '999');
  eq('sin id, clave compuesta', sin.clave, 'rec_999_payment_payment.updated');
  falso('y avisa que NO es exacta', sin.exacta);
  cierto('la de reserva también separa recursos',
    m.claveDeEvento({ type: 'payment' }, 'ORD_A').clave !== m.claveDeEvento({ type: 'payment' }, 'ORD_B').clave);

  eq('sin cuerpo tampoco revienta', m.claveDeEvento(null, '999').clave, 'rec_999_sin-tipo_sin-accion');
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

/* ================================================================== */
console.log('=== 12. EL CAMINO DE LAS ORDENES, que es el que quedo configurado ===');
{
  // La cuenta quedo con el evento «Order (Mercado Pago)», topico `orders`. Ese mundo usa OTRO
  // enum: ni un valor de «pagado» en comun con el de pagos. `approved` no existe aca.
  const ORD = (extra = {}) => ({
    id: 'ORD01ABC', external_reference: 'vyc_abc123',
    total_amount: '177310', total_paid_amount: '177310',
    status: 'processed', status_detail: 'accredited',
    transactions: { payments: [{ id: 'PAY01', amount: '177310', status: 'processed' }] },
    ...extra,
  });

  const feliz = m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD() });
  eq('processed marca pagado', feliz.accion, m.ACCIONES.MARCAR);
  eq('y el estado', feliz.estado, P.ESTADOS.PAGADO);

  // Los nueve estados de orden, uno por uno.
  const esperado = {
    processed:       [m.ACCIONES.MARCAR, P.ESTADOS.PAGADO],
    failed:          [m.ACCIONES.MARCAR, P.ESTADOS.RECHAZADO],
    canceled:        [m.ACCIONES.MARCAR, P.ESTADOS.RECHAZADO],
    expired:         [m.ACCIONES.MARCAR, P.ESTADOS.RECHAZADO],
    refunded:        [m.ACCIONES.MARCAR, P.ESTADOS.DEVUELTO],
    charged_back:    [m.ACCIONES.MARCAR, P.ESTADOS.CONTRACARGADO],
    created:         [m.ACCIONES.NADA,    P.ESTADOS.CREADO],
    // CAMBIÓ EL 24-OCT, y los dos de abajo cambiaron en direcciones opuestas a propósito.
    //
    // `processing` mueve el pedido a `pendiente`: la persona está pagando con un medio que no
    // acredita al instante, y antes eso se veía igual que no haber vuelto nunca de Mercado Pago.
    processing:      [m.ACCIONES.MARCAR,  P.ESTADOS.PENDIENTE],
    // `action_required` NO lo mueve, y además sale como REVISAR en vez de NADA. Es «falta una
    // acción NUESTRA, por ejemplo capturar un pago autorizado»: si saliera como `pendiente`, la
    // pantalla diría «tu pago está en camino, no tienes que hacer nada» cuando el que tiene que
    // hacer algo somos nosotros, y la autorización vencería mientras la persona espera tranquila.
    // Y si saliera como NADA quedaría invisible hasta que alguien pregunte por qué no le llegó.
    action_required: [m.ACCIONES.REVISAR, P.ESTADOS.CREADO],
  };
  for (const [est, [accion, estado]] of Object.entries(esperado)) {
    const d = m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status: est }) });
    eq(`orden ${est}: la accion`, d.accion, accion);
    eq(`orden ${est}: el estado`, d.estado, estado);
  }
  eq('los nueve en el catalogo', Object.keys(m.ESTADOS_ORDEN).length, 9);

  // EL TRAICIONERO DE ESTE MUNDO. La doc: «Integrator action is required... For example, the
  // capture of an authorized payment». Hay autorizacion, no hay plata.
  const auth = m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status: 'action_required' }) });
  falso('action_required NO es pagado', auth.estado === P.ESTADOS.PAGADO);
  falso('ni habilita el trabajo', m.ordenHabilitaTrabajo(ORD({ status: 'action_required' })));
  cierto('y el texto dice que no hay plata', /NO hay plata/i.test(auth.detalle));
  // Y tampoco se lo trata como «pendiente», que sería la forma elegante de perderlo: deja de
  // parecer un problema y pasa a parecer un trámite en curso.
  falso('no lo manda a pendiente', auth.estado === P.ESTADOS.PENDIENTE);
  eq('pide que alguien lo mire', auth.accion, m.ACCIONES.REVISAR);
  cierto('processed si habilita', m.ordenHabilitaTrabajo(ORD()));

  // LOS MONTOS SON STRING. Compararlos sin convertir falla siempre.
  cierto('un monto string igual calza', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD() }).accion === m.ACCIONES.MARCAR);
  eq('uno distinto no', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_amount: '1000', total_paid_amount: '1000' }) }).motivo, 'monto-no-calza');
  eq('y uno vacio tampoco', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_amount: '' }) }).motivo, 'monto-no-calza');

  // ── EL REEMBOLSO PARCIAL, QUE NO CAMBIA EL `status` (27-oct) ──────────────────────────
  //
  // Mercado Pago documenta la devolución parcial como una orden que SIGUE en `processed`, con
  // la novedad en `status_detail`. Mirando solo `status`, el pedido quedaba pagado y
  // entregable con parte de la plata devuelta.
  const devuelta = m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status_detail: 'partially_refunded' }) });
  eq('una devolucion parcial se revisa', devuelta.accion, m.ACCIONES.REVISAR);
  eq('y lo dice', devuelta.motivo, 'detalle-de-pago-desconocido');
  eq('y NO la deja pagada', devuelta.estado, null);
  falso('ni habilita el trabajo', devuelta.estado === P.ESTADOS.PAGADO);

  // EL CRITERIO ES LISTA DE LO CONOCIDO, NO DE LO PROHIBIDO. Un detalle que MP invente mañana
  // tiene que parar igual, sin que nadie lo agregue a una lista negra.
  eq('un detalle nuevo tambien para',
    m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status_detail: 'inventado_manana' }) }).motivo,
    'detalle-de-pago-desconocido');
  eq('la lista de lo que pasa solo tiene un valor', [...m.DETALLES_PAGO_LIMPIO], ['accredited']);
  eq('y es el que marca pagado',
    m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status_detail: 'accredited' }) }).accion,
    m.ACCIONES.MARCAR);

  // LA ASIMETRIA DEL CASO AUSENTE, A PROPOSITO. Si el campo no viene, se sigue: solo hay UNA
  // observacion real de una orden pagada, asi que bloquear toda venta por un campo que quiza
  // no existe seria peor que el riesgo que evita. Un valor LEGIBLE que no entendemos si para.
  const sinDetalle = ORD(); delete sinDetalle.status_detail;
  eq('sin status_detail se marca igual', m.decidirDesdeOrden({ pedido: PEDIDO, orden: sinDetalle }).accion, m.ACCIONES.MARCAR);
  eq('y vacio tambien', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status_detail: '' }) }).accion, m.ACCIONES.MARCAR);

  // Y solo aplica al tramo de PAGADO: una orden devuelta entera ya tiene su propio estado.
  eq('refunded sigue yendo a devuelto',
    m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status: 'refunded', status_detail: 'lo-que-sea' }) }).estado,
    P.ESTADOS.DEVUELTO);

  // Procesada pero pagada de menos: se mira a mano, no se marca.
  const corta = m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_paid_amount: '1000' }) });
  eq('procesada con menos pagado se revisa', corta.accion, m.ACCIONES.REVISAR);
  eq('y lo dice', corta.motivo, 'pagado-no-calza');
  // Un peso de menos tambien. El corte esta en el total, no en «mucho menos».
  eq('un peso de menos tambien frena',
    m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_paid_amount: '177309' }) }).motivo,
    'pagado-no-calza');

  // ── PAGADO DE MAS: SE ENTREGA (26-oct) ────────────────────────────────────────────────
  //
  // Si Mercado Pago informara `total_paid_amount` con el interes de las cuotas, la condicion
  // simetrica («distinto del total») habria frenado toda venta en cuotas. No se pudo medir cual
  // lectura del campo es la real, asi que el codigo tiene que ser correcto bajo las dos: lo que
  // frena es que paguen DE MENOS. De mas, la plata entro y se entrega.
  const conInteres = m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_paid_amount: '195041' }) });
  eq('pagado de mas se marca igual', conInteres.accion, m.ACCIONES.MARCAR);
  eq('y queda pagado', conInteres.estado, P.ESTADOS.PAGADO);
  falso('no lo manda a revisar', conInteres.accion === m.ACCIONES.REVISAR);
  falso('ni inventa el motivo', conInteres.motivo === 'pagado-no-calza');
  // Un peso de mas, que es el caso de redondeo del emisor, tampoco frena.
  eq('un peso de mas tampoco frena',
    m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_paid_amount: '177311' }) }).accion,
    m.ACCIONES.MARCAR);
  // Y el total de la ORDEN sigue teniendo que calzar exacto: lo de arriba afloja lo que se
  // cobro, no lo que se vendio. Si la orden dice otro precio, eso es otra cosa y se revisa.
  eq('el total de la orden sigue exacto',
    m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ total_amount: '195041', total_paid_amount: '195041' }) }).motivo,
    'monto-no-calza');

  // Las mismas defensas que el otro camino.
  eq('otra referencia', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ external_reference: 'otro' }) }).motivo, 'referencia-no-calza');
  eq('estado nuevo', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status: 'inventado' }) }).motivo, 'estado-desconocido');
  eq('repetida', m.decidirDesdeOrden({ pedido: { ...PEDIDO, estado: P.ESTADOS.PAGADO }, orden: ORD() }).motivo, 'ya-estaba');
  eq('sin orden', m.decidirDesdeOrden({ pedido: PEDIDO, orden: null }).motivo, 'sin-pago');
  eq('sin pedido', m.decidirDesdeOrden({ pedido: null, orden: ORD() }).accion, m.ACCIONES.IGNORAR);

  // LOS DOS ENUM NO SE MEZCLAN. Un estado del mundo de los pagos no vale en una orden.
  eq('approved no existe en una orden', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status: 'approved' }) }).motivo, 'estado-desconocido');
  eq('ni rejected', m.decidirDesdeOrden({ pedido: PEDIDO, orden: ORD({ status: 'rejected' }) }).motivo, 'estado-desconocido');
  // Y al reves: un estado de orden no vale en un pago.
  eq('processed no existe en un pago', m.decidirDesdeNotificacion({ pedido: PEDIDO, pago: pago({ status: 'processed' }) }).motivo, 'estado-desconocido');
}

/* ================================================================== */
console.log('=== 13. el pago que quedo dentro de la orden ===');
{
  const conDos = { transactions: { payments: [
    { id: 'A', amount: '177310', status: 'failed' },
    { id: 'B', amount: '177310', status: 'processed' },
  ] } };
  eq('toma el procesado, no el primero', m.pagoDeLaOrden(conDos).id, 'B');
  eq('con su monto convertido a numero', m.pagoDeLaOrden(conDos).monto, 177310);

  const soloFallido = { transactions: { payments: [{ id: 'A', amount: '1', status: 'failed' }] } };
  eq('si no hay procesado, deja rastro del que hay', m.pagoDeLaOrden(soloFallido).id, 'A');

  eq('sin pagos, null', m.pagoDeLaOrden({ transactions: { payments: [] } }), null);
  eq('sin transactions, null', m.pagoDeLaOrden({}), null);
  eq('sin orden, null', m.pagoDeLaOrden(null), null);
}

/* ================================================================== */
console.log('=== 14. leer la orden contra la API ===');
{
  let pedida = null;
  const fingido = async (url, opts) => { pedida = { url, opts };
    return { ok: true, status: 200, json: async () => ({ id: 'ORD01', status: 'processed' }) }; };
  const r = await m.leerOrdenMP('ORD01ABC', 'TOKEN', fingido);
  cierto('ok', r.ok);
  eq('el endpoint es el de ordenes', pedida.url, 'https://api.mercadopago.com/v1/orders/ORD01ABC');
  eq('Bearer', pedida.opts.headers.Authorization, 'Bearer TOKEN');
  eq('sin token', (await m.leerOrdenMP('1', null, fingido)).error, 'sin-token');
  eq('404', (await m.leerOrdenMP('1', 'T', async () => ({ ok: false, status: 404 }))).error, 'http-404');
  const caido = await m.leerOrdenMP('1', 'T', async () => { throw new Error('x'); });
  falso('la red caida no lanza', caido.ok);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
