/**
 * Pruebas del webhook de punta a punta (functions/api/webhook-mp.js).
 *
 *   node prueba-webhook.mjs
 *
 * Es el único punto del sistema por el que un pedido pasa a «pagado». Acá se arma una petición
 * de verdad, con su firma de verdad, contra una base SQLite de verdad y una API de Mercado Pago
 * fingida, y se mira qué queda escrito.
 *
 * LA PRUEBA QUE MÁS IMPORTA es la 5: si la API falla DESPUÉS de que el evento se reclamó, el
 * evento tiene que soltarse. Si no se suelta, el reintento lo ve registrado, se va sin hacer
 * nada, y el pago se pierde en silencio. Es el peor resultado posible de este archivo y no deja
 * rastro en ninguna parte.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const W = await import(rutaEnElRepo('verificaycumple/functions/api/webhook-mp.js', 'WEBHOOK_JS'));
const F = await import(rutaEnElRepo('verificaycumple/functions/api/firma-mp.js', 'FIRMA_MP_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/cobro.js', 'COBRO_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const SECRETO = 'clave-secreta-del-webhook';
const TOKEN = 'APP_USR-token-de-prueba';
const ID_ORDEN = 'ORD01M28P44G5FG8RJPM579EH56FV';
const REQUEST_ID = '2066ca19-c6f1-498a-be75-1923005edd06';

function comoD1(sqlite) {
  return {
    prepare(sql) {
      const st = sqlite.prepare(sql);
      let args = [];
      const api = {
        bind(...a) { args = a; return api; },
        async run() { const r = st.run(...args); return { meta: { changes: Number(r.changes) } }; },
        async first() { return st.get(...args) ?? null; },
        async all() { return { results: st.all(...args) }; },
      };
      return api;
    },
  };
}

function baseNueva() {
  const s = new DatabaseSync(':memory:');
  for (const sent of P.ESQUEMA.split(';')) if (sent.trim()) s.exec(sent + ';');
  return { db: comoD1(s), crudo: s };
}

/** Una petición igual a la que manda Mercado Pago, firmada de verdad. */
async function peticion({ dataId = ID_ORDEN, requestId = REQUEST_ID, secreto = SECRETO,
  cuerpo = { id: 991199, type: 'order', action: 'order.processed', data: { id: ID_ORDEN } },
  // La petición real del 24-oct trae también `data.external_reference` con NUESTRO id de
  // pedido. No se usa para decidir nada —no está firmado— pero sí para saber, cuando una firma
  // se rechaza, si quien llama conoce un id nuestro o está golpeando la puerta a ciegas.
  refExterna = null,
  firmaRota = false } = {}) {
  const ts = '1742505638683';
  const manifiesto = F.armarManifiesto({ dataId, requestId, ts });
  const v1 = firmaRota ? 'a'.repeat(64) : await F.hmacHex(secreto, manifiesto);
  return new Request(
    `https://verifica.spindlelab.cl/api/webhook-mp?data.id=${encodeURIComponent(dataId)}&type=order` +
      (refExterna ? `&data.external_reference=${encodeURIComponent(refExterna)}` : ''),
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-signature': `ts=${ts},v1=${v1}`,
        'x-request-id': requestId,
      },
      body: JSON.stringify(cuerpo),
    },
  );
}

/** Una orden como la devuelve GET /v1/orders/{id}. Los montos van como string, igual que allá. */
const ORDEN = (ref, extra = {}) => ({
  id: ID_ORDEN, external_reference: ref,
  total_amount: '177310', total_paid_amount: '177310',
  status: 'processed', status_detail: 'accredited',
  transactions: { payments: [{ id: 'PAY-9988', amount: '177310', status: 'processed' }] },
  ...extra,
});

/** Reemplaza el fetch global, que es lo que usa el handler por dentro. */
function conFetch(resp) {
  const antes = globalThis.fetch;
  globalThis.fetch = resp;
  return () => { globalThis.fetch = antes; };
}
const respondeCon = (cuerpo, status = 200) => async () => ({
  ok: status >= 200 && status < 300, status, json: async () => cuerpo,
});

async function unPedido(db) {
  const d = {
    id: P.nuevoIdPedido(), dominio: 'ejemplo.cl', url_medida: 'https://www.ejemplo.cl/',
    senales_contratadas: ['carga', 'cookies'], senales_fuera: ['politica'],
    informe_json: '{"puntaje":30}', monto_neto: 149000, monto_total: 177310,
    correo: 'cliente@ejemplo.cl',
  };
  await A.crearPedido(db, d);
  return d.id;
}

const eventos = (crudo) => crudo.prepare('SELECT * FROM eventos_mp').all();

/* ================================================================== */
console.log('=== 1. el camino feliz: firma válida, orden procesada, pedido pagado ===');
{
  const { db, crudo } = baseNueva();
  const id = await unPedido(db);
  const soltar = conFetch(respondeCon(ORDEN(id)));

  const r = await W.onRequestPost({ request: await peticion(), env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  const j = await r.json();
  soltar();

  eq('contesta 200', r.status, 200);
  eq('y dice que marcó', j.accion, 'marcar');
  const p = await A.leerPedido(db, id);
  eq('el pedido quedó pagado', p.estado, P.ESTADOS.PAGADO);
  eq('con el id de la orden', p.mp_order_id, ID_ORDEN);
  eq('y el del pago que venía adentro', p.mp_payment_id, 'PAY-9988');
  cierto('con su fecha', Boolean(p.pagado_en));
  eq('quedó UN evento registrado', eventos(crudo).length, 1);
}

/* ================================================================== */
console.log('=== 2. firma inválida: 401 y no se toca NADA ===');
{
  const { db, crudo } = baseNueva();
  const id = await unPedido(db);
  let llamoALaApi = false;
  const soltar = conFetch(async () => { llamoALaApi = true; return respondeCon(ORDEN(id))(); });

  const r = await W.onRequestPost({ request: await peticion({ firmaRota: true }), env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  soltar();

  eq('401', r.status, 401);
  eq('el pedido sigue en creado', (await A.leerPedido(db, id)).estado, P.ESTADOS.CREADO);
  // Antes de la firma no se registra nada: si no, cualquiera llena la tabla desde afuera.
  eq('no se registró ningún evento', eventos(crudo).length, 0);
  falso('y ni siquiera se llamó a la API', llamoALaApi);

  // Sin cabecera de firma tampoco.
  const sinFirma = new Request('https://v.cl/api/webhook-mp?data.id=X', { method: 'POST', body: '{}' });
  eq('sin cabecera de firma, 401',
    (await W.onRequestPost({ request: sinFirma, env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO } })).status, 401);
  // Y con otra clave secreta.
  const otraClave = await peticion({ secreto: 'otra-clave-distinta' });
  eq('firmada con otra clave, 401',
    (await W.onRequestPost({ request: otraClave, env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } })).status, 401);
}

/* ================================================================== */
console.log('=== 3. la notificación repetida no hace el trabajo dos veces ===');
{
  const { db, crudo } = baseNueva();
  const id = await unPedido(db);
  let llamadas = 0;
  const soltar = conFetch(async () => { llamadas++; return respondeCon(ORDEN(id))(); });
  const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };

  const primera = await W.onRequestPost({ request: await peticion(), env });
  eq('la primera marca', (await primera.json()).accion, 'marcar');

  // Mercado Pago reintenta ocho veces. Las siete siguientes no pueden rehacer nada.
  const resto = [];
  for (let i = 0; i < 7; i++) resto.push(await W.onRequestPost({ request: await peticion(), env }));
  eq('las siete contestan 200', [...new Set(resto.map((r) => r.status))].sort(), [200]);
  const cuerpos = await Promise.all(resto.map((r) => r.json()));
  eq('y todas dicen que ya estaba', [...new Set(cuerpos.map((c) => c.motivo))].sort(), ['repetido']);
  eq('la API se llamó UNA sola vez', llamadas, 1);
  eq('y hay un solo evento', eventos(crudo).length, 1);
  soltar();
}

/* ================================================================== */
console.log('=== 4. action_required NO paga, aunque la firma sea buena ===');
{
  const { db, crudo } = baseNueva();
  const id = await unPedido(db);
  const soltar = conFetch(respondeCon(ORDEN(id, { status: 'action_required', total_paid_amount: '0' })));
  const r = await W.onRequestPost({ request: await peticion(), env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  soltar();
  eq('contesta 200', r.status, 200);
  // «revisar» y no «nada»: `action_required` es falta una acción NUESTRA —capturar un pago
  // autorizado—, así que no mueve el pedido pero tampoco puede quedar invisible. Si saliera como
  // «nada», la única señal sería una nota en eventos_mp que nadie lee hasta que el cliente
  // pregunta por qué no le llegó el kit.
  eq('pero no marca: pide que alguien lo mire', (await r.json()).accion, 'revisar');
  eq('y el pedido sigue en creado', (await A.leerPedido(db, id)).estado, P.ESTADOS.CREADO);
  cierto('con el motivo escrito en el evento',
    String(eventos(crudo)[0].resultado).includes('action_required'));
}

/* ================================================================== */
console.log('=== 5. LA QUE MÁS IMPORTA: si la API falla, el evento se SUELTA ===');
{
  // Si no se suelta, el reintento lo ve registrado, se va sin hacer nada, y el pago se pierde
  // en silencio sin dejar rastro en ninguna parte.
  const { db, crudo } = baseNueva();
  const id = await unPedido(db);
  const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };

  const soltarCaida = conFetch(async () => { throw new Error('ECONNRESET'); });
  const caida = await W.onRequestPost({ request: await peticion(), env });
  soltarCaida();

  eq('contesta 503 para que reintente', caida.status, 503);
  eq('el evento quedó LIBRE, no reclamado', eventos(crudo).length, 0);
  eq('y el pedido no se movió', (await A.leerPedido(db, id)).estado, P.ESTADOS.CREADO);

  // Y ahora el reintento, con la API de vuelta, tiene que funcionar.
  const soltarOk = conFetch(respondeCon(ORDEN(id)));
  const reintento = await W.onRequestPost({ request: await peticion(), env });
  soltarOk();
  eq('el reintento sí marca', (await reintento.json()).accion, 'marcar');
  eq('y el pedido queda pagado', (await A.leerPedido(db, id)).estado, P.ESTADOS.PAGADO);

  // Lo mismo con un 500 de Mercado Pago.
  const { db: db2, crudo: crudo2 } = baseNueva();
  const id2 = await unPedido(db2);
  const env2 = { VYC_PEDIDOS: db2, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };
  const s500 = conFetch(respondeCon({}, 500));
  const r500 = await W.onRequestPost({ request: await peticion(), env: env2 });
  s500();
  eq('un 500 también da 503', r500.status, 503);
  eq('y también suelta el evento', eventos(crudo2).length, 0);
}

/* ================================================================== */
console.log('=== 6. un 404 de Mercado Pago NO se reintenta ===');
{
  // Esa orden no existe o no es nuestra. Reintentar ocho veces no la va a hacer aparecer.
  const { db, crudo } = baseNueva();
  await unPedido(db);
  const soltar = conFetch(respondeCon({ message: 'not found' }, 404));
  const r = await W.onRequestPost({ request: await peticion(), env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  soltar();
  eq('contesta 200, no 503', r.status, 200);
  eq('y lo ignora', (await r.json()).motivo, 'orden-inexistente');
  // El evento se queda reclamado a propósito: no hay nada que reintentar.
  eq('el evento queda registrado', eventos(crudo).length, 1);
}

/* ================================================================== */
console.log('=== 7. los dos «no encuentro el pedido» se tratan al revés ===');
{
  const env0 = { MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };

  // (a) La referencia tiene NUESTRA forma: es una carrera, el INSERT todavía no aterrizó.
  //     Reintentar lo arregla.
  const { db, crudo } = baseNueva();
  const nuestro = 'vyc_' + 'a'.repeat(32);
  const s1 = conFetch(respondeCon(ORDEN(nuestro)));
  const carrera = await W.onRequestPost({ request: await peticion(), env: { ...env0, VYC_PEDIDOS: db } });
  s1();
  eq('503 para que reintente', carrera.status, 503);
  eq('con el motivo claro', (await carrera.json()).motivo, 'pedido-todavia-no-esta');
  eq('y el evento se suelta', eventos(crudo).length, 0);

  // (b) La referencia es de otra integración de la misma cuenta. Reintentar no la va a hacer
  //     nuestra nunca.
  const { db: db2, crudo: crudo2 } = baseNueva();
  const s2 = conFetch(respondeCon(ORDEN('pedido_de_otra_cosa')));
  const ajeno = await W.onRequestPost({ request: await peticion(), env: { ...env0, VYC_PEDIDOS: db2 } });
  s2();
  eq('200, no se reintenta', ajeno.status, 200);
  eq('y se ignora', (await ajeno.json()).motivo, 'pedido-desconocido');
  eq('el evento queda registrado', eventos(crudo2).length, 1);
}

/* ================================================================== */
console.log('=== 8. un monto que no calza no paga nada ===');
{
  const { db } = baseNueva();
  const id = await unPedido(db);
  const soltar = conFetch(respondeCon(ORDEN(id, { total_amount: '1000', total_paid_amount: '1000' })));
  const r = await W.onRequestPost({ request: await peticion(), env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  soltar();
  eq('200: reintentar no lo arregla', r.status, 200);
  eq('pero se marca para revisar', (await r.json()).motivo, 'monto-no-calza');
  eq('y el pedido NO se pagó', (await A.leerPedido(db, id)).estado, P.ESTADOS.CREADO);
}

/* ================================================================== */
console.log('=== 9. sin base y sin secreto no se inventa nada ===');
{
  const { db } = baseNueva();
  const sinSecreto = await W.onRequestPost({ request: await peticion(), env: { VYC_PEDIDOS: db } });
  eq('sin el secreto del webhook, 401', sinSecreto.status, 401);
  eq('y el motivo lo dice', (await sinSecreto.json()).motivo, 'sin-secreto');

  const sinBase = await W.onRequestPost({ request: await peticion(), env: { MP_WEBHOOK_SECRET: SECRETO } });
  eq('sin base, 503 para que reintente', sinBase.status, 503);
}

/* ================================================================== */
console.log('=== 10. solo POST ===');
{
  const { db } = baseNueva();
  const get = new Request('https://v.cl/api/webhook-mp', { method: 'GET' });
  const r = await W.onRequest({ request: get, env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO } });
  eq('un GET da 405', r.status, 405);
  eq('y dice qué se permite', r.headers.get('Allow'), 'POST');
}

console.log('=== 11. EL RECLAMO ABANDONADO: la base falla, el reclamo queda, y el reintento lo rescata ===');
{
  // Este es el agujero que tenía el arreglo de la prueba 5, y es peor que el defecto original
  // porque PARECÍA resuelto. `soltarYReintentar` suelta el reclamo con un DELETE contra la
  // misma base cuyo fallo disparó la liberación: en el caso típico —D1 con un hipo— el DELETE
  // falla también. Antes el error se tragaba en silencio y el handler contestaba 503 creyendo
  // que había soltado; el reintento veía el evento registrado, decía «repetido» y se iba. El
  // cliente pagaba y el pedido se quedaba en `creado` para siempre.
  //
  // La prueba 5 no lo veía porque su base fingida funcionaba: fallaba la API, no D1, y
  // entonces el DELETE sí corría. La prueba y el arreglo salieron del mismo supuesto.
  const { db, crudo } = baseNueva();
  const id = await unPedido(db);
  const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };

  // Una base que deja reclamar y después se cae en TODO lo demás, que es el caso real.
  let caida = false;
  const dbCaida = {
    prepare(sql) {
      if (caida && !/INSERT OR IGNORE INTO eventos_mp/.test(sql)) {
        return { bind: () => ({ run: async () => { throw new Error('D1_ERROR'); },
                                first: async () => { throw new Error('D1_ERROR'); },
                                all: async () => { throw new Error('D1_ERROR'); } }) };
      }
      return db.prepare(sql);
    },
  };

  caida = true;
  const r1 = await W.onRequestPost({ request: await peticion(), env: { ...env, VYC_PEDIDOS: dbCaida } });
  const j1 = await r1.json();
  caida = false;

  eq('contesta 503', r1.status, 503);
  // El motivo ya no miente: dice que la liberación no salió.
  cierto('y el motivo avisa que el reclamo no se soltó', String(j1.motivo).includes('reclamo-vence-solo'));
  eq('el reclamo QUEDÓ puesto (el DELETE falló)', eventos(crudo).length, 1);
  eq('y sin resultado, que es la marca del reclamo abandonado', eventos(crudo)[0].resultado, null);

  // El reintento inmediato NO lo rescata: dentro de la ventana se respeta el reclamo, por si
  // el primer intento sigue en vuelo.
  const soltar1 = conFetch(respondeCon(ORDEN(id)));
  const pronto = await W.onRequestPost({ request: await peticion(), env });
  soltar1();
  eq('un reintento inmediato respeta el reclamo', (await pronto.json()).motivo, 'repetido');
  eq('el pedido sigue sin pagar', (await A.leerPedido(db, id)).estado, P.ESTADOS.CREADO);

  // Pasada la ventana (el reintento de los 15 minutos de Mercado Pago), sí lo rescata.
  const viejo = new Date(Date.now() - A.VENTANA_RECLAMO_MS - 60000).toISOString();
  crudo.prepare('UPDATE eventos_mp SET recibido_en = ?').run(viejo);

  const soltar2 = conFetch(respondeCon(ORDEN(id)));
  const rescate = await W.onRequestPost({ request: await peticion(), env });
  soltar2();
  eq('pasada la ventana, el reintento SÍ rescata y marca', (await rescate.json()).accion, 'marcar');
  eq('y el pedido queda pagado', (await A.leerPedido(db, id)).estado, P.ESTADOS.PAGADO);
  eq('sigue habiendo un solo evento', eventos(crudo).length, 1);
  cierto('ahora con resultado escrito', Boolean(eventos(crudo)[0].resultado));

  // Y un evento YA TERMINADO no se vuelve a reclamar nunca, por viejo que sea.
  crudo.prepare('UPDATE eventos_mp SET recibido_en = ?').run('2020-01-01T00:00:00.000Z');
  const terminado = await W.onRequestPost({ request: await peticion(), env });
  eq('un evento ya terminado no se reclama aunque sea antiquísimo', (await terminado.json()).motivo, 'repetido');
}

console.log('=== 12. la clave del evento sale de material FIRMADO ===');
{
  // La firma cubre data.id, x-request-id y ts. El cuerpo NO. Antes la clave era solo
  // `ev_<cuerpo.id>`, así que con una firma capturada se podía mandar cualquier cuerpo y
  // quemar la clave de CUALQUIER pedido, incluido uno nunca visto.
  const a = C.claveDeEvento({ id: 7 }, 'ORD_A');
  const b = C.claveDeEvento({ id: 7 }, 'ORD_B');
  cierto('dos recursos distintos con el mismo id de cuerpo NO comparten clave', a.clave !== b.clave);
  cierto('la clave lleva el recurso', a.clave.includes('ord_a'));
  cierto('y sigue llevando el id del aviso', a.clave.includes('7'));
  eq('sigue siendo exacta', a.exacta, true);

  // El data.id llega con mayúsculas (capturado del panel el 24-oct); dos cajas del mismo
  // recurso tienen que ser el mismo recurso.
  eq('la caja del data.id no crea recursos distintos',
    C.claveDeEvento({ id: 7 }, 'ORD_A').clave, C.claveDeEvento({ id: 7 }, 'ord_a').clave);

  // Y el camino de reserva, cuando el cuerpo no se puede leer.
  const s1 = C.claveDeEvento(null, 'ORD_A');
  const s2 = C.claveDeEvento(null, 'ORD_B');
  eq('sin cuerpo no es exacta', s1.exacta, false);
  cierto('pero igual separa recursos', s1.clave !== s2.clave);

  // El reintento legítimo —mismo recurso, mismo aviso— sigue dando la MISMA clave.
  //
  // ⚠️ La versión anterior de esto comparaba `claveDeEvento(X).clave` con `claveDeEvento(X).clave`,
  // o sea la función consigo misma. Eso solo demuestra que es determinista: una implementación
  // que devolviera siempre la misma constante, ignorando el recurso y el aviso, pasaba igual. Lo
  // encontró una revisión externa. Ahora la expectativa es independiente: se escribe la clave que
  // el contrato dice que tiene que salir.
  eq('el reintento legítimo da la clave esperada',
    C.claveDeEvento({ id: 991199 }, 'ORD_X').clave, 'ev_ord_x_991199');
  eq('y dos llamadas idénticas coinciden',
    C.claveDeEvento({ id: 991199 }, 'ORD_X').clave, C.claveDeEvento({ id: 991199 }, 'ORD_X').clave);
}

console.log('=== 13. un rechazo seguido de un pago es el reintento normal ===');
{
  // `failed` no es terminal en la Orders API: la persona puede reintentar con otra tarjeta
  // sobre la misma orden. Antes el pedido quedaba atrapado en `rechazado` con la plata cobrada.
  const { db } = baseNueva();
  const id = await unPedido(db);
  const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };

  const s1 = conFetch(respondeCon(ORDEN(id, { status: 'failed', total_paid_amount: '0' })));
  await W.onRequestPost({ request: await peticion(), env });
  s1();
  eq('la orden fallida deja el pedido rechazado', (await A.leerPedido(db, id)).estado, P.ESTADOS.RECHAZADO);

  // Segundo intento, con otra tarjeta: la misma orden pasa a processed. Es un aviso DISTINTO,
  // así que trae otro id de notificación en el cuerpo — por eso no es «repetido».
  const s2 = conFetch(respondeCon(ORDEN(id)));
  const r = await W.onRequestPost({
    request: await peticion({
      requestId: 'req-segundo-intento',
      cuerpo: { id: 991200, type: 'order', action: 'order.processed', data: { id: ID_ORDEN } },
    }), env,
  });
  s2();
  eq('el segundo intento SÍ marca', (await r.json()).accion, 'marcar');
  eq('y el pedido pasa a pagado', (await A.leerPedido(db, id)).estado, P.ESTADOS.PAGADO);
}

console.log('=== 14. anotarResultado no puede tumbar la respuesta ===');
{
  // La nota de auditoría se escribe DESPUÉS de mover el pedido y fuera de todo try. Un hipo de
  // D1 ahí convertía el camino feliz —con el pedido ya pagado— en un 500, y Mercado Pago lo
  // reintentaba ocho veces sobre un trabajo ya hecho.
  const { db } = baseNueva();
  const id = await unPedido(db);
  const dbSinNota = {
    prepare(sql) {
      if (/UPDATE eventos_mp SET resultado/.test(sql)) {
        return { bind: () => ({ run: async () => { throw new Error('D1_ERROR'); } }) };
      }
      return db.prepare(sql);
    },
  };
  const soltar = conFetch(respondeCon(ORDEN(id)));
  let r, lanzo = false;
  try {
    r = await W.onRequestPost({
      request: await peticion(),
      env: { VYC_PEDIDOS: dbSinNota, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN },
    });
  } catch (e) { lanzo = true; }
  soltar();
  falso('el handler NO lanza', lanzo);
  eq('contesta 200', r && r.status, 200);
  eq('y el pedido quedó pagado igual', (await A.leerPedido(db, id)).estado, P.ESTADOS.PAGADO);
}

console.log('=== 15. la lectura de la orden tiene corte de tiempo ===');
{
  // Sin `signal`, una conexión colgada nunca rechaza: el catch no se despierta, el evento queda
  // reclamado y la invocación muere esperando.
  cierto('hay un tope declarado', Number.isInteger(C.MS_LECTURA_ORDEN) && C.MS_LECTURA_ORDEN > 0);
  cierto('y cabe dentro de los 22 s que anuncia Mercado Pago', C.MS_LECTURA_ORDEN < 22000);
  let vioSignal = false;
  await C.leerOrdenMP('ORD1', 'tok', async (_u, o) => {
    vioSignal = Boolean(o && o.signal);
    return { ok: true, status: 200, json: async () => ({ id: 'ORD1' }) };
  });
  cierto('el fetch se hace con un signal de aborto', vioSignal);
}

console.log('=== 16. una firma rechazada deja rastro, y no filtra nada ===');
{
  // EL 24-OCT ESTO COSTÓ UN PAGO. Durante una hora, todas las notificaciones de una compra real
  // se rechazaron porque el secreto cargado era el de otra aplicación de Mercado Pago. De
  // nuestro lado no quedó ni una línea: la tabla de eventos estaba vacía —la firma se verifica
  // ANTES de escribir nada— y el motivo solo viajaba en el cuerpo del 401, que vive en el panel
  // de Mercado Pago y no acá. Un secreto equivocado y alguien golpeando la puerta se veían
  // exactamente igual: nada.
  //
  // La señal que los separa es si quien llama conoce un id de pedido NUESTRO. Mercado Pago lo
  // manda en `data.external_reference`; un escaneo no lo tiene.

  const env = { MP_WEBHOOK_SECRET: SECRETO };
  const lineas = [];
  const antesLog = console.log;
  console.log = (...a) => lineas.push(a.map(String).join(' '));
  let conNuestra, conAjena;
  try {
    conNuestra = await W.onRequestPost({
      request: await peticion({ firmaRota: true, refExterna: 'vyc_' + 'a'.repeat(32) }), env,
    });
    conAjena = await W.onRequestPost({
      request: await peticion({ firmaRota: true, refExterna: 'pedido-de-otro-sistema' }), env,
    });
  } finally {
    // Se restituye ANTES de afirmar nada: si no, un FALLA se escribiría en el array y no en la
    // pantalla, y la prueba fallaría en silencio.
    console.log = antesLog;
  }

  eq('la firma rota sigue dando 401', conNuestra.status, 401);
  eq('y la otra también', conAjena.status, 401);
  eq('quedaron dos líneas, una por rechazo', lineas.filter((l) => l.includes('firma rechazada')).length, 2);

  const nuestra = lineas.find((l) => l.includes('firma rechazada'));
  const ajena = lineas.filter((l) => l.includes('firma rechazada'))[1];
  cierto('dice el motivo', /no-coincide|firma/i.test(nuestra));
  cierto('con una referencia nuestra lo dice', /referencia nuestra:sí/.test(nuestra));
  cierto('y con una ajena, también', /referencia nuestra:no/.test(ajena));
  cierto('anota si venía data.id', /data\.id:sí/.test(nuestra));
  cierto('y si venía request-id', /request-id:sí/.test(nuestra));

  // ── Lo que NO puede aparecer nunca ────────────────────────────────────────────────────
  //
  // Un registro de depuración es un lugar donde los secretos se escapan sin que nadie lo note,
  // y este se escribe en el camino que ve el tráfico no autenticado.
  const todo = lineas.join('\n');
  falso('NUNCA el secreto del webhook', todo.includes(SECRETO));
  falso('ni la firma que trajo la petición', todo.includes('a'.repeat(64)));
  falso('ni el ts de la firma', todo.includes('1742505638683'));
  falso('ni el id de pedido completo, que lo elige quien llama', todo.includes('vyc_' + 'a'.repeat(32)));
  falso('ni el texto ajeno tal cual', todo.includes('pedido-de-otro-sistema'));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
