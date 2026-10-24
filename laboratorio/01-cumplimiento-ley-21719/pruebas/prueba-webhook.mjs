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
const AV = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));
const CO = await import(rutaEnElRepo('verificaycumple/functions/api/correo.js', 'CORREO_JS'));

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
  // Se cuentan SOLO las lecturas de la orden. Desde el 24-oct una venta dispara además un aviso
  // a Web3Forms, que es otra llamada de red y no tiene nada que ver con lo que esta prueba mide.
  const soltar = conFetch(async (u) => {
    if (String(u && u.url ? u.url : u).includes('web3forms')) return { ok: true, status: 200, json: async () => ({ success: true }) };
    llamadas++;
    return respondeCon(ORDEN(id))();
  });
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
console.log('=== 6. un 404 solo se cierra cuando se sabe de qué pedido se trata ===');
{
  // ⚠️ ESTA PRUEBA CAMBIÓ DE CONTRATO EL 24-OCT, a propósito. Antes afirmaba que CUALQUIER 404
  // se cerraba de inmediato, con el argumento de que «esa orden no existe o no es nuestra, y
  // reintentar no la va a hacer aparecer».
  //
  // El argumento falla en un caso que esta integración ya vivió: si el token apunta a una
  // aplicación distinta de la que tiene el webhook configurado, TODAS las órdenes dan 404
  // aunque existan. Ese desajuste pasó hoy con el otro secreto y se puede repetir al cargar las
  // credenciales de producción. Y cerrar es irreversible —el rescate del reclamo abandonado
  // exige `resultado IS NULL`—, así que cerrar de más cuesta pagos y reintentar de más cuesta
  // ruido, y los reintentos de Mercado Pago son finitos.
  //
  // Por eso ahora se cierra solo cuando se SABE de qué pedido se trata: con
  // `data.external_reference` en la URL, y pasada su ventana.

  // (a) Sin el parámetro: no se puede saber, no se cierra.
  {
    const { db, crudo } = baseNueva();
    await unPedido(db);
    const soltar = conFetch(respondeCon({ message: 'not found' }, 404));
    const r = await W.onRequestPost({ request: await peticion(),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
    soltar();
    eq('pide reintento', r.status, 503);
    // Lo decisivo: el evento NO queda cerrado, que es lo único que permite reprocesarlo.
    eq('y el evento no queda cerrado', eventos(crudo).filter((e) => e.resultado !== null).length, 0);
  }

  // (b) Con el parámetro, y la referencia no es de ningún pedido nuestro: ahí sí se cierra.
  {
    const { db, crudo } = baseNueva();
    await unPedido(db);
    const soltar = conFetch(respondeCon({ message: 'not found' }, 404));
    const req = await peticion();
    const url = new URL(req.url);
    url.searchParams.set('data.external_reference', 'vyc_' + '0'.repeat(32));
    const r = await W.onRequestPost({
      request: new Request(url, { method: 'POST', headers: req.headers, body: await req.text() }),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN },
    });
    soltar();
    eq('contesta 200, no 503', r.status, 200);
    eq('y lo ignora', (await r.json()).motivo, 'orden-inexistente');
    eq('el evento queda registrado', eventos(crudo).length, 1);
  }
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

console.log('=== 17. dos entregas que se cruzan: la que pierde no puede tirar lo que traía ===');
{
  // NINGUNA PRUEBA DE ESTE ARCHIVO EJERCÍA LA CARRERA. La 3 llama ocho veces a la MISMA
  // petición y las encadena con `await`, o sea que solo prueba la deduplicación por clave
  // idéntica. La 13 usa dos avisos distintos pero estrictamente en serie, que es justo el caso
  // que funciona. Las 15 pruebas pasaban sobre un handler que perdía el pago en el solape.
  //
  // El defecto: dos avisos con información DISTINTA llegan juntos. Los dos leen el pedido en
  // `creado`. El primero lo mueve a `pendiente`; el segundo traía `pagado` y su UPDATE no
  // encuentra la fila en el estado que esperaba. Antes eso se daba por bueno con un 200, así
  // que Mercado Pago no volvía a avisar y el pedido se quedaba en `pendiente` CON LA PLATA
  // COBRADA.
  //
  // La barrera es la misma técnica que ya está en prueba-crear-pedido.mjs: ninguna escribe
  // hasta que las dos leyeron, y además se fuerza el peor orden —que gane la menos avanzada—
  // para que el resultado no dependa del azar.

  const { db: cruda, crudo } = baseNueva();
  const ID = 'vyc_' + '7'.repeat(32);
  crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'creado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'c@clinicaejemplo.cl', ?)`,
  ).run(ID, new Date().toISOString(), ID_ORDEN);

  let leyeron = 0, abrir;
  const puerta = new Promise((r) => { abrir = r; });
  let yaPaso, pasoPendiente;
  const esperaPendiente = new Promise((r) => { yaPaso = r; });

  const db = {
    prepare(sql) {
      const st = cruda.prepare(sql);
      if (/SELECT \* FROM pedidos WHERE id = \?/.test(sql)) {
        return { bind: (...a) => ({ first: async () => {
          const r = await st.bind(...a).first();
          // Solo las DOS primeras lecturas son las de la carrera; la tercera es la relectura
          // del que perdió, y esa no puede quedarse esperando una puerta ya abierta.
          if (++leyeron === 2) abrir();
          return r;
        } }) };
      }
      if (/UPDATE pedidos SET/.test(sql)) {
        return { bind: (...a) => ({ run: async () => {
          await puerta;
          // El peor orden posible: la entrega que lleva `pagado` espera a que la de
          // `pendiente` haya escrito. Sin esto el resultado dependería de quién llegue antes.
          if (a[0] === 'pagado' && !pasoPendiente) await esperaPendiente;
          const r = await st.bind(...a).run();
          if (a[0] === 'pendiente') { pasoPendiente = true; yaPaso(); }
          return r;
        } }) };
      }
      return st;
    },
  };

  // Cada entrega trae su propio `action`, así que son claves de evento distintas y las dos
  // pasan la compuerta. Es el caso real: Mercado Pago avisa cada cambio de la orden.
  const ordenes = {
    'order.updated': ORDEN(ID, { status: 'processing', status_detail: null, transactions: { payments: [] } }),
    'order.processed': ORDEN(ID),
  };
  let cual = 0;
  const soltarFetch = conFetch(async () => {
    // Las dos entregas leen la MISMA orden por la misma URL, así que se reparten por turno:
    // la primera lectura ve `processing` y la segunda `processed`.
    const cuerpo = cual++ === 0 ? ordenes['order.updated'] : ordenes['order.processed'];
    return { ok: true, status: 200, json: async () => cuerpo };
  });

  const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };
  const [a, b] = await Promise.all([
    W.onRequestPost({ request: await peticion({
      requestId: '3ff28d90-b859-4008-984e-d3a09843a6a9',
      cuerpo: { type: 'order', action: 'order.updated', data: { id: ID_ORDEN } } }), env }),
    W.onRequestPost({ request: await peticion({
      requestId: 'bf373833-95f1-4b60-bce7-5b4a9927d3d5',
      cuerpo: { type: 'order', action: 'order.processed', data: { id: ID_ORDEN } } }), env }),
  ]);
  soltarFetch();

  eq('las dos entregas leyeron antes de que ninguna escribiera', leyeron >= 2, true);
  eq('las dos contestan 200', [a.status, b.status], [200, 200]);

  const f = crudo.prepare('SELECT * FROM pedidos WHERE id = ?').get(ID);
  eq('EL PEDIDO TERMINA PAGADO, no atascado en pendiente', f.estado, 'pagado');
  cierto('y con su fecha de pago', Boolean(f.pagado_en));

  // Las dos entregas quedan anotadas: son dos avisos distintos, no uno repetido.
  const evs = crudo.prepare('SELECT * FROM eventos_mp').all();
  eq('quedaron los dos eventos', evs.length, 2);
  cierto('y uno deja dicho que perdió la carrera',
    evs.some((e) => String(e.resultado || '').includes('perdió la carrera')));
}

console.log('=== 18. la entrega que pierde con información VIEJA no puede quedarse reintentando ===');
{
  // EL OTRO LADO DE LA CARRERA, y el que evita un bucle. Si la que pierde traía información más
  // nueva, hay que alcanzarla (prueba 17). Si traía información VIEJA, no: el pedido ya está
  // más adelante y no hay nada que aportar. Tratar los dos casos igual —volver a intentar el
  // estado que traía esta entrega, a ciegas— significaría pedirle a Mercado Pago que reintente
  // algo que nunca va a poder aplicarse, y un aviso viejo reintentaría para siempre.
  //
  // Por eso el rescate no reusa la decisión original: vuelve a preguntar con el pedido como
  // quedó. `decidirDesdeOrden` contesta «no se pasa de pagado a pendiente solo», que no es
  // MARCAR, y ahí el 200 sí corresponde.

  const { db: cruda, crudo } = baseNueva();
  const ID = 'vyc_' + '8'.repeat(32);
  crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'creado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'c@clinicaejemplo.cl', ?)`,
  ).run(ID, new Date().toISOString(), ID_ORDEN);

  let leyeron = 0, abrir;
  const puerta = new Promise((r) => { abrir = r; });
  let pasoPagado, yaPaso;
  const esperaPagado = new Promise((r) => { yaPaso = r; });

  const db = {
    prepare(sql) {
      const st = cruda.prepare(sql);
      if (/SELECT \* FROM pedidos WHERE id = \?/.test(sql)) {
        return { bind: (...a) => ({ first: async () => {
          const r = await st.bind(...a).first();
          if (++leyeron === 2) abrir();
          return r;
        } }) };
      }
      if (/UPDATE pedidos SET/.test(sql)) {
        return { bind: (...a) => ({ run: async () => {
          await puerta;
          // Acá gana la MÁS avanzada: la que lleva `pendiente` espera. Así la perdedora es la
          // que trae información vieja, que es el caso que esta prueba cuida.
          if (a[0] === 'pendiente' && !pasoPagado) await esperaPagado;
          const r = await st.bind(...a).run();
          if (a[0] === 'pagado') { pasoPagado = true; yaPaso(); }
          return r;
        } }) };
      }
      return st;
    },
  };

  let cual = 0;
  const soltarFetch = conFetch(async () => {
    const cuerpo = cual++ === 0
      ? ORDEN(ID, { status: 'processing', status_detail: null, transactions: { payments: [] } })
      : ORDEN(ID);
    return { ok: true, status: 200, json: async () => cuerpo };
  });

  const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };
  const [a, b] = await Promise.all([
    W.onRequestPost({ request: await peticion({
      requestId: '11111111-1111-4111-8111-111111111111',
      cuerpo: { type: 'order', action: 'order.updated', data: { id: ID_ORDEN } } }), env }),
    W.onRequestPost({ request: await peticion({
      requestId: '22222222-2222-4222-8222-222222222222',
      cuerpo: { type: 'order', action: 'order.processed', data: { id: ID_ORDEN } } }), env }),
  ]);
  soltarFetch();

  // Ninguna pide reintento: un 503 acá sería un aviso viejo golpeando para siempre.
  eq('las dos contestan 200, ninguna pide reintento', [a.status, b.status], [200, 200]);
  const f = crudo.prepare('SELECT * FROM pedidos WHERE id = ?').get(ID);
  eq('el pedido se queda pagado', f.estado, 'pagado');
  cierto('con su fecha de pago intacta', Boolean(f.pagado_en));

  // ── EL TESTIGO ────────────────────────────────────────────────────────────────────────
  //
  // Sin esto, la 18 pasaría igual con la barrera invertida, o sea ejerciendo el escenario de la
  // 17 y no el suyo. Lo que distingue a esta prueba es que acá NADIE alcanza nada: la que
  // pierde traía información vieja.
  const evs = crudo.prepare('SELECT * FROM eventos_mp').all();
  const notas = evs.map((e) => String(e.resultado || '')).join(' | ');
  falso('acá nadie alcanzó nada', /se alcanzó/.test(notas));
  cierto('y una entrega deja dicho que perdió', /perdió la carrera/.test(notas));

  // ── Y LA NOTA TIENE QUE DECIR LA VERDAD ───────────────────────────────────────────────
  //
  // La primera versión escribía el estado que ESTA entrega quería (`pendiente`), que el pedido
  // no tiene. Un registro que miente es peor que uno vacío, porque se audita con él.
  const perdedora = evs.map((e) => String(e.resultado || '')).find((t) => /perdió la carrera/.test(t));
  cierto('la nota dice dónde quedó el pedido de verdad', /pagado/.test(perdedora));
  cierto('y por qué no se pudo alcanzar', /transicion-invalida/.test(perdedora));
  falso('y NO afirma el estado que esta entrega quería', /a pendiente/.test(perdedora));
}

console.log('=== 19. un 404 temprano, un tópico ajeno, y el rastro de la clave débil ===');
{
  const SIN_ID = { type: 'order', action: 'order.processed', data: { id: ID_ORDEN } };
  const sembrar = (crudo, id, cuando) => crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'creado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'c@clinicaejemplo.cl', ?)`,
  ).run(id, cuando, ID_ORDEN);
  const ID = 'vyc_' + '9'.repeat(32);

  // ── Un tópico que no atendemos no puede quemar la clave de una orden ──────────────────
  {
    const { db, crudo } = baseNueva();
    const req = await peticion({ cuerpo: SIN_ID });
    const url = new URL(req.url); url.searchParams.set('type', 'payment');
    const r = await W.onRequestPost({
      request: new Request(url, { method: 'POST', headers: req.headers, body: JSON.stringify(SIN_ID) }),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN },
    });
    eq('contesta 200', r.status, 200);
    eq('diciendo que no lo atiende', (await r.json()).motivo, 'tipo-no-atendido:payment');
    eq('y NO reclama ningún evento', crudo.prepare('SELECT * FROM eventos_mp').all().length, 0);
  }

  // ── 404 con el pedido recién creado: se pide reintento, no se cierra ──────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo, ID, new Date().toISOString());
    const soltar = conFetch(async () => ({ ok: false, status: 404, json: async () => ({}) }));
    const req = await peticion({ cuerpo: SIN_ID });
    const url = new URL(req.url); url.searchParams.set('data.external_reference', ID);
    const r = await W.onRequestPost({
      request: new Request(url, { method: 'POST', headers: req.headers, body: JSON.stringify(SIN_ID) }),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN },
    });
    soltar();
    eq('pide reintento con 503', r.status, 503);
    // Lo decisivo: que el evento quede SIN resultado, que es lo único que permite reprocesarlo.
    const ev = crudo.prepare('SELECT * FROM eventos_mp').all();
    eq('y no deja el evento cerrado', ev.filter((e) => e.resultado !== null).length, 0);
  }

  // ── 404 con un pedido viejo: ahí sí es definitivo ─────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo, ID, new Date(Date.now() - 60 * 60 * 1000).toISOString());
    const soltar = conFetch(async () => ({ ok: false, status: 404, json: async () => ({}) }));
    const req = await peticion({ cuerpo: SIN_ID });
    const url = new URL(req.url); url.searchParams.set('data.external_reference', ID);
    const r = await W.onRequestPost({
      request: new Request(url, { method: 'POST', headers: req.headers, body: JSON.stringify(SIN_ID) }),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN },
    });
    soltar();
    eq('se cierra con 200', r.status, 200);
    eq('como orden inexistente', (await r.json()).motivo, 'orden-inexistente');
    const ev = crudo.prepare('SELECT * FROM eventos_mp').all();
    cierto('y queda anotado', ev.some((e) => String(e.resultado || '').includes('404')));
    // El rastro de la clave débil, que antes solo se escribía en la salida que marcaba.
    cierto('diciendo que la clave no era exacta',
      ev.some((e) => String(e.resultado || '').includes('clave no exacta')));
  }

  // ── Una salida REVISAR también deja ese rastro ────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo, ID, new Date().toISOString());
    // Monto que no calza: `decidirDesdeOrden` contesta REVISAR.
    const soltar = conFetch(async () => ({
      ok: true, status: 200, json: async () => ORDEN(ID, { total_amount: '999' }),
    }));
    const r = await W.onRequestPost({ request: await peticion({ cuerpo: SIN_ID }),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
    soltar();
    eq('contesta 200', r.status, 200);
    const ev = crudo.prepare('SELECT * FROM eventos_mp').all();
    cierto('anota que hay que revisarlo', ev.some((e) => String(e.resultado || '').includes('revisar')));
    cierto('y que la clave no era exacta',
      ev.some((e) => String(e.resultado || '').includes('clave no exacta')));
    eq('el pedido no se tocó', crudo.prepare('SELECT * FROM pedidos WHERE id = ?').get(ID).estado, 'creado');
  }
}

console.log('=== 20. si otra entrega ya lo dejó donde esta quería, no es un error ===');
{
  // El segundo intento del rescate también puede no mover la fila, porque entre la relectura y
  // el UPDATE entró una TERCERA entrega. La primera versión contestaba 503 sin mirar, y eso
  // tiene dos costos: le avisa a Mercado Pago de un error que no existe, y suelta el evento,
  // que es el único rastro que queda de esta entrega.
  //
  // Se monta forzando exactamente eso: justo antes del segundo UPDATE, la fila se mueve por
  // fuera al estado que esta entrega quería.

  const { db: cruda, crudo } = baseNueva();
  const ID = 'vyc_' + '6'.repeat(32);
  crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'pendiente', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'c@clinicaejemplo.cl', ?)`,
  ).run(ID, new Date().toISOString(), ID_ORDEN);

  let updates = 0;
  const db = {
    prepare(sql) {
      const st = cruda.prepare(sql);
      if (/UPDATE pedidos SET/.test(sql)) {
        return { bind: (...a) => ({ run: async () => {
          updates++;
          // El PRIMER UPDATE lo hacemos fallar moviendo la fila por fuera a otro estado, para
          // que el rescate entre. El SEGUNDO también falla, pero porque alguien ya la dejó
          // justo en `pagado`, que es lo que esta entrega quería.
          if (updates === 1) crudo.prepare('UPDATE pedidos SET estado = ? WHERE id = ?').run('creado', ID);
          if (updates === 2) crudo.prepare("UPDATE pedidos SET estado = 'pagado', pagado_en = ? WHERE id = ?").run(new Date().toISOString(), ID);
          return st.bind(...a).run();
        } }) };
      }
      return st;
    },
  };

  const soltar = conFetch(respondeCon(ORDEN(ID)));
  const r = await W.onRequestPost({ request: await peticion({
    cuerpo: { type: 'order', action: 'order.processed', data: { id: ID_ORDEN } } }),
    env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
  soltar();

  eq('contesta 200, no 503', r.status, 200);
  eq('el pedido quedó pagado', crudo.prepare('SELECT * FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  const evs = crudo.prepare('SELECT * FROM eventos_mp').all();
  eq('y el evento NO se soltó: queda su rastro', evs.filter((e) => e.resultado !== null).length, 1);
  cierto('diciendo que lo alcanzó otra entrega',
    evs.some((e) => /lo alcanzó otra entrega/.test(String(e.resultado || ''))));
}

console.log('=== 21. una venta le llega a una persona, y el aviso no lleva de más ===');
{
  // Hasta el 24-oct entraba un pago, el pedido quedaba en `pagado`, y NADIE se enteraba. Ramón
  // lo descubrió probando a mano: pagó y no pasó nada. Con una campaña corriendo, eso es una
  // venta esperando sin que nadie la mire.

  const ID = 'vyc_' + '5'.repeat(32);
  const sembrar = (crudo) => crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'creado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'persona@clinicaejemplo.cl', ?)`,
  ).run(ID, new Date().toISOString(), ID_ORDEN);

  // Un fetch que separa las dos salidas: la lectura de la orden y el aviso.
  const conDos = ({ avisoCae = false, avisoEstado = 200 } = {}) => {
    const antes = globalThis.fetch;
    const visto = { avisos: 0, cuerpos: [] };
    globalThis.fetch = async (u, o = {}) => {
      if (String(u && u.url ? u.url : u).includes('web3forms')) {
        visto.avisos++;
        visto.cuerpos.push(o.body ? JSON.parse(o.body) : null);
        if (avisoCae) throw new Error('ECONNRESET');
        return { ok: avisoEstado < 300, status: avisoEstado, json: async () => ({ success: true }) };
      }
      return { ok: true, status: 200, json: async () => ORDEN(ID) };
    };
    return { visto, soltar: () => { globalThis.fetch = antes; } };
  };

  // ── Entra el pago: sale el aviso ──────────────────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const red = conDos();
    const r = await W.onRequestPost({ request: await peticion(),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
    red.soltar();

    eq('el pedido quedó pagado', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
    eq('y salió UN aviso', red.visto.avisos, 1);
    eq('sin romper la respuesta a Mercado Pago', r.status, 200);

    const texto = JSON.stringify(red.visto.cuerpos[0]);
    // ── LO QUE EL AVISO NO PUEDE LLEVAR ────────────────────────────────────────────────
    //
    // Web3Forms guarda una copia de lo que recibe. El correo del comprador no va porque la
    // política dice que la base de pedidos no la comparte nadie más; el id completo no va
    // porque esos 32 hex son la ÚNICA credencial de su pantalla privada, y dejarlos guardados
    // en un tercero es dejar una llave puesta.
    falso('NUNCA el correo del comprador', texto.includes('persona@clinicaejemplo.cl'));
    falso('NUNCA el id completo del pedido', texto.includes(ID));
    // Y lo que sí tiene que llevar, o el aviso no sirve para nada.
    cierto('dice de qué sitio es', texto.includes('clinicaejemplo.cl'));
    cierto('y por cuánto', texto.includes('177'));
    cierto('con un prefijo para poder encontrarlo', texto.includes(ID.slice(0, AV.LARGO_PREFIJO)));
  }

  // ── Las notificaciones repetidas no avisan de nuevo ───────────────────────────────────
  //
  // Mercado Pago entrega la misma orden más de una vez. Dos avisos por una venta se leen como
  // dos ventas.
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const red = conDos();
    const env = { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN };
    for (let k = 0; k < 4; k++) await W.onRequestPost({ request: await peticion(), env });
    red.soltar();
    eq('cuatro entregas, un solo aviso', red.visto.avisos, 1);
  }

  // ── Si el aviso falla, el cobro NO se cae ─────────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const red = conDos({ avisoCae: true });
    // Se captura a propósito: si el handler dejara escapar el error, esta prueba REVENTARÍA en
    // vez de ponerse roja, y en una batería de cientos de aserciones un archivo que se cae sin
    // línea de cierre se confunde con otra cosa. Acá el fallo se cuenta como fallo.
    let r = null, lanzo = false;
    try {
      r = await W.onRequestPost({ request: await peticion(),
        env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
    } catch { lanzo = true; }
    red.soltar();
    falso('el handler no deja escapar el fallo del aviso', lanzo);
    eq('la respuesta sigue siendo 200', r && r.status, 200);
    eq('y el pedido queda pagado igual', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  }

  // ── Y un estado que no es «pagado» no avisa ───────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const antes = globalThis.fetch;
    let avisos = 0;
    globalThis.fetch = async (u) => {
      if (String(u && u.url ? u.url : u).includes('web3forms')) { avisos++; return { ok: true, status: 200, json: async () => ({}) }; }
      return { ok: true, status: 200, json: async () => ORDEN(ID, { status: 'processing', status_detail: null, transactions: { payments: [] } }) };
    };
    await W.onRequestPost({ request: await peticion(),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
    globalThis.fetch = antes;
    eq('un pago pendiente no se anuncia como venta', avisos, 0);
    eq('el pedido queda pendiente', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pendiente');
  }

  // ── El cuerpo del aviso, como unidad ──────────────────────────────────────────────────
  {
    const c = AV.cuerpoDelAviso({ id: ID, dominio: 'otro.cl', monto_total: 177310,
      correo: 'secreto@otro.cl', pagado_en: '2026-10-24T16:17:21.765Z' });
    eq('lleva la clave pública del formulario', c.access_key, AV.CLAVE_WEB3FORMS);
    cierto('el asunto dice de qué sitio', c.subject.includes('otro.cl'));
    falso('y en ningún campo va el correo', JSON.stringify(c).includes('secreto@otro.cl'));
    eq('el prefijo tiene el largo declarado', c['Pedido (prefijo)'], ID.slice(0, AV.LARGO_PREFIJO) + '…');
    cierto('que es más corto que el id', AV.LARGO_PREFIJO < 36);

    // ── QUE NUNCA LANCE, AFIRMADO DIRECTAMENTE ────────────────────────────────────────
    //
    // Antes esto se «probaba» viendo que el webhook seguía contestando 200. Pero al romper el
    // catch a propósito, la prueba no se ponía roja: REVENTABA, sin línea de cierre. Una
    // prueba que se cae no está diciendo lo mismo que una que falla, y en una batería de
    // cientos la diferencia se pierde. Acá se afirma la propiedad donde vive.
    let lanzo = false, resultado = null;
    try {
      resultado = await AV.avisarVenta({ id: ID, dominio: 'otro.cl', monto_total: 177310 },
        async () => { throw new Error('la red se cayó'); });
    } catch { lanzo = true; }
    falso('avisarVenta NUNCA lanza, pase lo que pase', lanzo);
    eq('y dice que no pudo', resultado, false);

    // Lo mismo si Web3Forms contesta mal en vez de caerse.
    const conError = await AV.avisarVenta({ id: ID, dominio: 'otro.cl', monto_total: 1 },
      async () => ({ ok: false, status: 500, json: async () => ({}) }));
    eq('un error del servicio tampoco lanza', conError, false);
  }
}

console.log('=== 22. al comprador le llega su enlace, que es su única credencial ===');
{
  // El id del pedido son 32 hex en la URL y no hay cuenta ni contraseña. Hasta hoy ese enlace
  // existía SOLO en la pestaña a la que Mercado Pago devolvía a la persona: quien la cerrara
  // perdía el acceso a su propio pedido, y nosotros no teníamos cómo mandárselo.

  const ID = 'vyc_' + '4'.repeat(32);
  const CORREO = 'persona@clinicaejemplo.cl';
  const sembrar = (crudo) => crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'creado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, ?, ?)`,
  ).run(ID, new Date().toISOString(), CORREO, ID_ORDEN);

  const conTres = ({ correoCae = false, correoEstado = 200 } = {}) => {
    const antes = globalThis.fetch;
    const visto = { correos: 0, cuerpos: [], cabeceras: [], avisos: 0 };
    globalThis.fetch = async (u, o = {}) => {
      const url = String(u && u.url ? u.url : u);
      if (url.includes('web3forms')) { visto.avisos++; return { ok: true, status: 200, json: async () => ({}) }; }
      if (url.includes('api.resend.com')) {
        visto.correos++;
        visto.cuerpos.push(o.body ? JSON.parse(o.body) : null);
        visto.cabeceras.push(o.headers || {});
        if (correoCae) throw new Error('ECONNRESET');
        return { ok: correoEstado < 300, status: correoEstado, json: async () => ({ id: 'em_1' }) };
      }
      return { ok: true, status: 200, json: async () => ORDEN(ID) };
    };
    return { visto, soltar: () => { globalThis.fetch = antes; } };
  };

  // ── Entra el pago: sale el correo, con su enlace ──────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const red = conTres();
    await W.onRequestPost({ request: await peticion(),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN,
             RESEND_API_KEY: 're_clave_de_prueba' } });
    red.soltar();

    eq('salió UN correo', red.visto.correos, 1);
    const c = red.visto.cuerpos[0];
    eq('al comprador, no a otro lado', c.to, [CORREO]);
    eq('desde el subdominio de envíos', c.from, CO.REMITENTE);
    // Sin esto, una respuesta del cliente caería en una casilla que no existe.
    eq('con respuesta a la casilla de verdad', c.reply_to, CO.RESPONDER_A);

    // LO QUE EL CORREO TIENE QUE LLEVAR SÍ O SÍ: su enlace, en las dos versiones.
    const enlace = CO.enlaceDelPedido(ID);
    cierto('el texto lleva su enlace', c.text.includes(enlace));
    cierto('y el HTML también', c.html.includes(enlace));
    cierto('le dice que lo guarde', /guarda este correo/i.test(c.text));
    cierto('y hay versión de texto, no solo HTML', c.text.length > 200);

    // La clave va en la cabecera, nunca en el cuerpo.
    cierto('autentica con la clave', String(red.visto.cabeceras[0].Authorization || '').startsWith('Bearer '));
    falso('y la clave NO viaja en el cuerpo', JSON.stringify(c).includes('re_clave_de_prueba'));

    // Nada externo: un correo sobre datos personales no puede pedirle al cliente que cargue
    // recursos de terceros.
    falso('el HTML no carga imágenes de fuera', /<img/i.test(c.html));
    falso('ni scripts', /<script/i.test(c.html));
  }

  // ── Sin clave cargada, no se cae nada ─────────────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const red = conTres();
    const r = await W.onRequestPost({ request: await peticion(),
      env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN } });
    red.soltar();
    eq('no intenta mandar nada', red.visto.correos, 0);
    eq('el pago igual se marca', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
    eq('y se contesta 200', r.status, 200);
    // El aviso interno no depende de Resend, así que ese sí sale.
    eq('y el aviso interno igual sale', red.visto.avisos, 1);
  }

  // ── Si Resend falla, el cobro no se cae ───────────────────────────────────────────────
  {
    const { db, crudo } = baseNueva();
    sembrar(crudo);
    const red = conTres({ correoCae: true });
    let lanzo = false, r = null;
    try {
      r = await W.onRequestPost({ request: await peticion(),
        env: { VYC_PEDIDOS: db, MP_WEBHOOK_SECRET: SECRETO, MP_ACCESS_TOKEN: TOKEN,
               RESEND_API_KEY: 're_clave_de_prueba' } });
    } catch { lanzo = true; }
    red.soltar();
    falso('el handler no deja escapar el fallo', lanzo);
    eq('contesta 200', r && r.status, 200);
    eq('y el pedido queda pagado', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  }

  // ── Como unidad: nunca lanza ──────────────────────────────────────────────────────────
  {
    let lanzo = false, res = null;
    try {
      res = await CO.enviarCorreoDePago({ id: ID, correo: CORREO, dominio: 'x.cl', monto_total: 1 },
        're_x', async () => { throw new Error('la red se cayó'); });
    } catch { lanzo = true; }
    falso('enviarCorreoDePago NUNCA lanza', lanzo);
    eq('y dice que no pudo', res, false);
    eq('sin clave devuelve false sin tocar la red',
      await CO.enviarCorreoDePago({ id: ID, correo: CORREO }, '   ', async () => { throw new Error('no debería llamarse'); }), false);
    eq('sin correo del comprador tampoco manda nada',
      await CO.enviarCorreoDePago({ id: ID, dominio: 'x.cl' }, 're_x', async () => { throw new Error('no debería llamarse'); }), false);
  }

  // ── El remitente no puede estar en el dominio raíz ────────────────────────────────────
  //
  // El raíz tiene el SPF de Google Workspace. Mandar desde ahí por Resend habría exigido un
  // segundo SPF, y dos SPF es SPF inválido: el correo del negocio empezaría a ir a spam.
  {
    cierto('el remitente sale del subdominio de envíos', CO.REMITENTE.includes('@envios.spindlelab.cl>'));
    falso('y NO del dominio raíz', /@spindlelab\.cl>/.test(CO.REMITENTE));
    cierto('pero las respuestas sí llegan al raíz', CO.RESPONDER_A.endsWith('@spindlelab.cl'));
  }
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
