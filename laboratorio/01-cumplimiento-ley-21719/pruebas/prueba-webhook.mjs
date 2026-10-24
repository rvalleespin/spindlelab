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
  firmaRota = false } = {}) {
  const ts = '1742505638683';
  const manifiesto = F.armarManifiesto({ dataId, requestId, ts });
  const v1 = firmaRota ? 'a'.repeat(64) : await F.hmacHex(secreto, manifiesto);
  return new Request(
    `https://verifica.spindlelab.cl/api/webhook-mp?data.id=${encodeURIComponent(dataId)}&type=order`,
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
  const { db } = baseNueva();
  const id = await unPedido(db);
  const soltar = conFetch(respondeCon(ORDEN(id, { status: 'action_required', total_paid_amount: '0' })));
  const r = await W.onRequestPost({ request: await peticion(), env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  soltar();
  eq('contesta 200', r.status, 200);
  eq('pero no marca', (await r.json()).accion, 'nada');
  eq('y el pedido sigue en creado', (await A.leerPedido(db, id)).estado, P.ESTADOS.CREADO);
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

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
