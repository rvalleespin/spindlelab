/**
 * Los dos endpoints de Flow: la vuelta del comprador y la notificacion de pago.
 *
 *   node prueba-flow-endpoints.mjs
 *
 * ── POR QUE EXISTE (29-oct-2026) ────────────────────────────────────────────────────────
 *
 * La vuelta nacio de un error real encontrado pagando en el sandbox: Flow devuelve al
 * comprador con un POST, y `/pedido/` es estatico, asi que Cloudflare contesta 405 con CERO
 * bytes. Pantalla en blanco justo despues de pagar $177.310.
 *
 *     GET  /pedido/  ->  200 · 18.909 bytes
 *     POST /pedido/  ->  405 ·      0 bytes
 *
 * Se habia verificado con GET y se dio por bueno. Un GET no prueba nada sobre un POST.
 *
 * La notificacion es la que mueve el pedido a `pagado`, o sea la que decide si alguien recibe
 * el kit. Todo lo que se comprueba aca es dinero.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const V = await import(rutaEnElRepo('verificaycumple/functions/api/flow-vuelta.js', 'FLOW_VUELTA_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/flow-confirmacion.js', 'FLOW_CONFIRMACION_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/* ── El andamio ───────────────────────────────────────────────────────────────────────── */

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

const ID = 'vyc_' + 'a'.repeat(32);

async function pedidoNuevo(db, estado) {
  await A.crearPedido(db, {
    id: ID, dominio: 'ejemplo.cl', correo: 'alguien@ejemplo.cl',
    senales_contratadas: ['cmp'], senales_fuera: [], informe_json: '{}',
    monto_neto: 149000, monto_total: 177310,
  });
  if (estado && estado !== 'creado') await A.marcarEstado(db, ID, 'creado', estado, {});
  return db;
}

/** Un pago como los que devuelve Flow de verdad: `amount` es TEXTO, y lo acreditado trae decimales. */
const PAGO = (x = {}) => ({
  flowOrder: 11368296, commerceOrder: ID, requestDate: '2026-10-29 22:34:04',
  status: 2, subject: 'Kit', currency: 'CLP', amount: '177310',
  payer: 'alguien@ejemplo.cl',
  paymentData: { date: '2026-10-29 22:38:02', media: 'Webpay', amount: '177310.00', fee: '32.00', balance: 962 },
  ...x,
});

/**
 * Reemplaza `fetch` y reparte por destino.
 *
 * ⚠️ NO se finge `leerPagoFlow`: se finge la RED. Asi la prueba pasa por la firma real, por el
 * armado real de la peticion y por el parseo real de la respuesta. Fingir la funcion habria
 * dejado sin probar justo la parte que ya fallo una vez.
 */
function conRed({ pago = PAGO(), flowCae = false } = {}) {
  const viejo = globalThis.fetch;
  const avisos = [];
  globalThis.fetch = async (url, opciones) => {
    const u = String(url);
    if (u.includes('/payment/getStatus')) {
      if (flowCae) return new Response('nope', { status: 500 });
      return new Response(JSON.stringify(pago), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    // Todo lo demas son avisos: el correo al comprador y el aviso de venta.
    avisos.push({ host: new URL(u).host, cuerpo: (opciones && opciones.body) ? String(opciones.body).slice(0, 400) : '' });
    return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  return { avisos, soltar() { globalThis.fetch = viejo; } };
}

const CRED = { FLOW_API_KEY: 'clave-de-prueba', FLOW_SECRET_KEY: 'secreto-de-prueba' };
const notificar = (token = 'TOK123') =>
  new Request('https://verifica.spindlelab.cl/api/flow-confirmacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ token }).toString(),
  });

/** Espera a los avisos que el endpoint manda con `waitUntil`. */
function contexto(request, env) {
  const fondo = [];
  return { ctx: { request, env, waitUntil: (p) => fondo.push(p) }, async listo() { await Promise.all(fondo); } };
}

/* ================================================================== */
console.log('=== 1. LA VUELTA: un POST no puede terminar en blanco ===');
{
  const vuelta = (metodo, qs) => V.onRequest({
    request: new Request(`https://verifica.spindlelab.cl/api/flow-vuelta${qs}`, { method: metodo }),
  });

  const r = await vuelta('POST', `?id=${ID}`);
  // ⚠️ LA ASERCION QUE CUIDA EL ERROR QUE ESTO ARREGLA. Un 302 deja al navegador libre de
  // repetir el POST contra `/pedido/`, que es el 405 vacio del que venimos. Solo el 303
  // obliga a convertirlo en GET. Un cambio de 303 a 302 se lee como inofensivo y devuelve
  // la pantalla en blanco intacta.
  eq('un POST con id contesta 303 (no 302, no 200)', r.status, 303);
  eq('y manda a la pantalla del pedido con su id',
    r.headers.get('Location'), `https://verifica.spindlelab.cl/pedido/?id=${ID}`);
  eq('sin cachear', r.headers.get('Cache-Control'), 'no-store');

  const g = await vuelta('GET', `?id=${ID}`);
  eq('un GET hace lo mismo', g.status, 303);
  eq('y al mismo lugar', g.headers.get('Location'), `https://verifica.spindlelab.cl/pedido/?id=${ID}`);

  // Un id que no es nuestro no entra a la pagina: esa pantalla sabe decir «no encontramos este
  // pedido», que es una respuesta, y meterle un valor ajeno en el query no mejora nada.
  for (const malo2 of ['../../etc', 'vyc_NOPE', '<script>', '', 'vyc_' + 'a'.repeat(31)]) {
    const m = await vuelta('POST', `?id=${encodeURIComponent(malo2)}`);
    eq(`un id invalido (${JSON.stringify(malo2).slice(0, 18)}) va a /pedido/ pelado`,
      m.headers.get('Location'), 'https://verifica.spindlelab.cl/pedido/');
  }
  const sin = await vuelta('POST', '');
  eq('sin id tambien', sin.headers.get('Location'), 'https://verifica.spindlelab.cl/pedido/');
  eq('y sigue siendo 303', sin.status, 303);
}

/* ================================================================== */
console.log('=== 2. LA NOTIFICACION: cuando NO hay que reintentar (200) ===');
{
  const { db } = baseNueva();
  const red = conRed();
  // Sin token no hay nada que preguntar, y reintentar no lo va a inventar.
  const sinToken = await C.onRequestPost({
    request: new Request('https://x/api/flow-confirmacion', { method: 'POST', body: new URLSearchParams().toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }),
    env: { VYC_PEDIDOS: db, ...CRED },
  });
  eq('sin token contesta 200', sinToken.status, 200);
  eq('y lo dice', (await sinToken.json()).motivo, 'sin-token');
  red.soltar();
}
{
  // ⚠️ LA ASIMETRIA DE ESTE BLOQUE ES EL PUNTO, y la primera version de esta prueba la tenia
  // al reves: puso `vyc_bbb…`, que TIENE nuestro formato (la `b` es hexadecimal), y exigio un
  // 200. El codigo contesto 503 y tenia razon.
  //
  // Son dos casos distintos y terminan distinto a proposito:
  //
  //   - Un `commerceOrder` que NO tiene nuestra forma nunca fue un pedido nuestro. Reintentar
  //     no lo va a convertir en uno: 200, se cierra.
  //   - Uno que SI tiene nuestra forma y no esta en la base es otra cosa. El pedido se inserta
  //     ANTES de abrir el pago, asi que si falta, lo probable es una carrera o una lectura que
  //     fallo. Ahi 200 significaria un pago cobrado que nadie marca nunca; 503 significa unos
  //     reintentos y unas lineas de registro. La diferencia de costo entre equivocarse para un
  //     lado y para el otro es una venta perdida contra un poco de ruido.
  for (const ajeno of ['otra-tienda-999', 'ORD-123', '', 'vyc_zzz', 'vyc_' + 'a'.repeat(31)]) {
    const { db } = baseNueva();
    await pedidoNuevo(db, 'creado');
    const red = conRed({ pago: PAGO({ commerceOrder: ajeno }) });
    const r = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: db, ...CRED } });
    red.soltar();
    eq(`un commerceOrder que no es nuestro (${JSON.stringify(ajeno).slice(0, 18)}) contesta 200`, r.status, 200);
    eq('y no se reintenta', (await r.json()).motivo, 'referencia-ajena');
  }

  // Y la otra cara: formato nuestro, pero no esta. Ese SI se reintenta.
  const { db } = baseNueva();
  const red = conRed({ pago: PAGO({ commerceOrder: 'vyc_' + 'b'.repeat(32) }) });
  const r = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: db, ...CRED } });
  red.soltar();
  eq('con formato nuestro pero ausente, 503', r.status, 503);
  eq('para que Flow vuelva a intentar', (await r.json()).motivo, 'pedido-todavia-no-esta');
}

/* ================================================================== */
console.log('=== 3. CUANDO SI HAY QUE REINTENTAR (503) ===');
{
  // ⚠️ ESTAS TRES SON LAS QUE EVITAN UN PAGO QUE NADIE MARCA NUNCA. Flow reintenta hasta
  // recibir un 200; contestar 200 ante un fallo NUESTRO quema el unico aviso que iba a llegar.
  const { db } = baseNueva();
  await pedidoNuevo(db, 'creado');

  const red = conRed({ flowCae: true });
  const r1 = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: db, ...CRED } });
  red.soltar();
  eq('si Flow no contesta, 503 para que reintente', r1.status, 503);
  eq('y se dice por que', (await r1.json()).motivo, 'no-se-pudo-releer');

  const red2 = conRed();
  const r2 = await C.onRequestPost({ request: notificar(), env: { ...CRED } });
  red2.soltar();
  eq('sin base, 503', r2.status, 503);

  const { db: vacia } = baseNueva();
  const red3 = conRed();
  const r3 = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: vacia, ...CRED } });
  red3.soltar();
  eq('si el pedido todavia no esta, 503 (puede ser una carrera)', r3.status, 503);
  eq('y no se cierra en falso', (await r3.json()).motivo, 'pedido-todavia-no-esta');
}

/* ================================================================== */
console.log('=== 4. EL PAGO BUENO: marca, fecha y avisa ===');
{
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'creado');
  const red = conRed();
  const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, RESEND_API_KEY: 'k', ...CRED });
  const r = await C.onRequestPost(ctx);
  await listo();
  red.soltar();

  eq('contesta 200', r.status, 200);
  eq('y dice que marco', (await r.json()).accion, 'marcar');
  const f = crudo.prepare('SELECT estado, pagado_en FROM pedidos WHERE id = ?').get(ID);
  eq('el pedido queda pagado', f.estado, 'pagado');
  cierto('con fecha de pago escrita', Boolean(f.pagado_en));
  // ⚠️ Que el pedido quede marcado y nadie se entere es media funcion. La venta tiene que
  // llegarle a una persona, y eso solo se ve mirando el efecto, no que la funcion exista.
  //
  // ⚠️⚠️ Y SE MIRAN POR SEPARADO, que es la correccion de un hueco real de esta misma prueba.
  // La primera version decia `avisos.length >= 1`. Al mutar el codigo para quitar el aviso de
  // venta, la prueba siguio VERDE: el correo al comprador tapaba la ausencia del otro, porque
  // contar no es identificar. Son dos destinos distintos y se exigen los dos.
  const hosts = red.avisos.map((a) => a.host);
  cierto('sale el aviso de venta (a quien vende)', hosts.includes('api.web3forms.com'));
  cierto('y el correo al comprador (a quien compro)', hosts.includes('api.resend.com'));
}

/* ================================================================== */
console.log('=== 5. LOS OTROS ESTADOS ===');
{
  const casos = [
    ['rechazado (3)', PAGO({ status: 3, paymentData: { amount: null } }), 'rechazado', 200, 'marcar'],
    ['sin pagar (1)', PAGO({ status: 1, paymentData: { amount: null } }), 'creado', 200, 'nada'],
    ['sin observar (4)', PAGO({ status: 4 }), 'creado', 200, 'revisar'],
    ['pagado PARCIAL', PAGO({ paymentData: { amount: '90000.00' } }), 'creado', 200, 'revisar'],
    ['monto que no calza', PAGO({ amount: '1000' }), 'creado', 200, 'revisar'],
  ];
  for (const [nombre, pago, estadoEsperado, http, accion] of casos) {
    const { db, crudo } = baseNueva();
    await pedidoNuevo(db, 'creado');
    const red = conRed({ pago });
    const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
    const r = await C.onRequestPost(ctx);
    await listo();
    red.soltar();
    eq(`${nombre}: http`, r.status, http);
    eq(`${nombre}: accion`, (await r.json()).accion, accion);
    eq(`${nombre}: el pedido queda en`, crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, estadoEsperado);
    if (accion === 'revisar') cierto(`${nombre}: y se avisa a una persona`, red.avisos.length >= 1);
  }
}

/* ================================================================== */
console.log('=== 6. LA SEGUNDA ENTREGA DEL MISMO AVISO NO HACE NADA ===');
{
  // Flow reintenta hasta recibir un 200, asi que la misma notificacion llega mas de una vez.
  // Si la segunda volviera a avisar, cada venta mandaria el correo al comprador dos veces.
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'creado');

  const red = conRed();
  const a = contexto(notificar(), { VYC_PEDIDOS: db, RESEND_API_KEY: 'k', ...CRED });
  await C.onRequestPost(a.ctx); await a.listo();
  const avisosPrimera = red.avisos.length;

  const b = contexto(notificar(), { VYC_PEDIDOS: db, RESEND_API_KEY: 'k', ...CRED });
  const r2 = await C.onRequestPost(b.ctx); await b.listo();
  red.soltar();

  eq('la segunda entrega contesta 200', r2.status, 200);
  const j = await r2.json();
  eq('sin tocar nada', j.accion, 'nada');
  eq('y dice que ya estaba resuelto', j.motivo, 'ya-resuelto');
  eq('el pedido sigue pagado', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  // Mismo criterio que arriba: por destino, no por cantidad. Si la segunda entrega repitiera
  // el correo, el comprador recibiria dos veces el mismo mensaje de que su pago entro.
  const porDestino = (d) => red.avisos.filter((a) => a.host === d).length;
  eq('no se repite el aviso de venta', porDestino('api.web3forms.com'), 1);
  eq('ni el correo al comprador', porDestino('api.resend.com'), 1);
  eq('y no salio nada mas', red.avisos.length, avisosPrimera);
}

/* ================================================================== */
console.log('=== 7. UN PEDIDO RESUELTO QUE RECIBE OTRA COSA SE MIRA A MANO ===');
{
  // Un pedido ya pagado que de pronto recibe un rechazo no se decide solo: puede ser un
  // reembolso, una anulacion o un error, y las tres terminan distinto.
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'pagado');
  const red = conRed({ pago: PAGO({ status: 3, paymentData: { amount: null } }) });
  const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  const r = await C.onRequestPost(ctx);
  await listo();
  red.soltar();
  eq('contesta 200', r.status, 200);
  eq('pero manda a revisar', (await r.json()).accion, 'revisar');
  eq('y NO cambia el pedido', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  cierto('avisando a una persona', red.avisos.length >= 1);
}

/* ================================================================== */
console.log('=== 8. un GET no es una notificacion ===');
{
  const r = await C.onRequest({ request: new Request('https://x/api/flow-confirmacion', { method: 'GET' }), env: {} });
  eq('contesta 405', r.status, 405);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
