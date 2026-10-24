/**
 * Pruebas de `POST /api/pedido` — el endpoint que crea el pedido y abre el pago.
 *
 *   node prueba-crear-pedido.mjs
 *
 * Es la puerta de entrada del dinero. Si se equivoca hacia un lado, se le vende a quien no
 * tenemos cómo atender; si se equivoca hacia el otro, se le cobra dos veces a la misma persona.
 *
 * ⚠️ LAS RUTAS VAN FORZADAS A UN SOLO WORKTREE, A PROPÓSITO. `chequeo.js` existe en varias
 * carpetas del repo con contenidos distintos, y `rutas.mjs` se niega a adivinar —hace bien—.
 * Pero además hay una razón propia de esta prueba: mezclar módulos de worktrees distintos sería
 * su propio falso verde, porque probaría una combinación que no existe en ningún despliegue.
 * Acá se prueba UNA copia coherente, la de la rama que se despliega.
 */

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple/functions/api';
for (const [v, f] of [
  ['CHEQUEO_JS', 'chequeo.js'], ['PROFUNDO_JS', 'profundo.js'], ['PEDIDO_JS', 'pedido.js'],
  ['PEDIDOS_JS', 'pedidos.js'], ['ALMACEN_JS', 'almacen.js'], ['COBRO_JS', 'cobro.js'],
  ['ETAPAS_JS', 'etapas.js'], ['ELEGIBILIDAD_JS', 'elegibilidad.js'],
]) process.env[v] = `${RAIZ}/${f}`;

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const E = await import(rutaEnElRepo('verificaycumple/functions/api/pedido.js', 'PEDIDO_JS'));
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

/** Un KV de mentira, con lo poco que el endpoint le pide. */
function kvNuevo(entradas = {}) {
  const m = new Map(Object.entries(entradas));
  return {
    almacen: m,
    async get(k, o) { const v = m.get(k); if (v === undefined) return null; return (o && o.type === 'json') ? JSON.parse(v) : v; },
    async put(k, v) { m.set(k, String(v)); },
  };
}

/** Una portada que el chequeo rápido puede leer, con un rastreador y sin gestor de permiso. */
const PORTADA = `<!doctype html><html lang="es"><head><title>Clínica Ejemplo</title>
<meta name="description" content="Una clínica"></head><body><h1>Clínica Ejemplo</h1>
<p>Texto suficiente para que no parezca una portada vacía detrás de un portero.</p>
<p>Más texto todavía, porque el chequeo mira cuántas letras tiene antes de decidir que esto es
una portada de verdad y no un cascarón.</p>
<script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
<a href="/privacidad/">Política de privacidad</a></body></html>`;

/** Un informe profundo como el que queda en la caché de KV, con dos señales que el kit cierra. */
const PROFUNDO = (dominio = 'clinicaejemplo.cl') => ({
  ok: true, dominio, revisado: `https://www.${dominio}/`, revisadoEn: '2026-10-24T00:00:00.000Z',
  puntaje: 40, pesoConfirmado: 13, pesoTotal: 13, pendientes: 2, sinConfirmar: 0, noAplica: 0,
  parcial: false, bloqueado: null, segundosMirados: 7,
  items: [
    { bloque: 'consentimiento', id: 'carga', titulo: 'Rastreadores que parten solos', estado: 'pendiente', ok: false, peso: 3 },
    { bloque: 'consentimiento', id: 'cookies', titulo: 'Cookies escritas sin permiso', estado: 'pendiente', ok: false, peso: 3 },
    { bloque: 'consentimiento', id: 'envio', titulo: 'Datos que ya salieron de tu sitio', estado: 'ok', ok: true, peso: 4 },
    { bloque: 'consentimiento', id: 'aviso', titulo: 'Si aparece un aviso al entrar', estado: 'ok', ok: true, peso: 3 },
  ],
  rastreadores: [], terceros: [], cookies: { propias: [], terceras: [] }, aviso: null, gesto: null,
  informativos: [], bloques: [],
});

const ORDEN_MP = (ref) => ({
  id: 'ORD01PRUEBA0000000000000001',
  external_reference: ref,
  status: 'created',
  total_amount: '177310',
  checkout_url: 'https://www.mercadopago.cl/checkout/v1/redirect?order_id=ORD01PRUEBA0000000000000001',
});

/**
 * Reemplaza el fetch global, que es lo que usan POR DENTRO tanto `chequear` como `crearOrdenMP`.
 * Enruta por destino: lo de Mercado Pago va a la orden, lo demás al sitio.
 */
function conRed({ sitio = PORTADA, mp = null, mpEstado = 201, caeMP = false } = {}) {
  const antes = globalThis.fetch;
  const llamadas = { sitio: 0, mp: 0, cuerposMP: [], cabecerasMP: [] };
  globalThis.fetch = async (u, o = {}) => {
    const url = String(u && u.url ? u.url : u);
    if (url.includes('api.mercadopago.com')) {
      llamadas.mp++;
      llamadas.cuerposMP.push(o.body ? JSON.parse(o.body) : null);
      llamadas.cabecerasMP.push(o.headers || {});
      if (caeMP) throw new Error('ECONNRESET');
      const cuerpo = mp === null ? ORDEN_MP(JSON.parse(o.body).external_reference) : mp;
      return { ok: mpEstado >= 200 && mpEstado < 300, status: mpEstado, json: async () => cuerpo };
    }
    llamadas.sitio++;
    if (sitio === null) throw new Error('no-abre');
    return { ok: true, status: 200, url, headers: { get: () => null }, text: async () => sitio };
  };
  return { llamadas, soltar: () => { globalThis.fetch = antes; } };
}

const pedir = (cuerpo, { host = 'verifica.spindlelab.cl', origen = null } = {}) => {
  const h = { 'content-type': 'application/json' };
  if (origen) h.Origin = origen;
  return new Request(`https://${host}/api/pedido`, {
    method: 'POST', headers: h, body: JSON.stringify(cuerpo),
  });
};

const BIEN = { dominio: 'clinicaejemplo.cl', correo: 'contacto@clinicaejemplo.cl', consiento: true };
const filas = (crudo) => crudo.prepare('SELECT * FROM pedidos').all();

/* ================================================================== */
console.log('=== 1. el camino feliz ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed();
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' } });
  const j = await r.json();
  red.soltar();

  eq('contesta 200', r.status, 200);
  cierto('devuelve el id del pedido', /^vyc_[0-9a-f]{32}$/.test(j.id));
  cierto('y la URL de Mercado Pago', String(j.checkout_url).includes('mercadopago'));
  eq('queda UN pedido', filas(crudo).length, 1);

  const f = filas(crudo)[0];
  eq('en estado creado', f.estado, 'creado');
  eq('con el monto del servidor', f.monto_total, 177310);
  eq('y el neto', f.monto_neto, 149000);
  eq('con el id de la orden guardado', f.mp_order_id, 'ORD01PRUEBA0000000000000001');
  eq('la URL medida sale del informe', f.url_medida, 'https://www.clinicaejemplo.cl/');
  eq('el cache-control no deja guardar', r.headers.get('cache-control'), 'no-store');
  falso('y NO manda el comodín de CORS', r.headers.get('access-control-allow-origin'));

  // Las señales contratadas salen de los DOS informes, no de uno.
  const contratadas = JSON.parse(f.senales_contratadas).sort();
  eq('contrata lo que el kit cierra, de los dos informes', contratadas, ['carga', 'cmp', 'cookies']);
  eq('y deja fuera lo que no cierra', JSON.parse(f.senales_fuera), ['politica']);

  // El contrato congela LOS DOS informes.
  const informe = JSON.parse(f.informe_json);
  // Se comprueba la FORMA antes de entrar: si el contrato congelara un solo informe, bajar a
  // `informe.rapido.dominio` reventaría y la prueba MORIRÍA en vez de ponerse roja, que en la
  // batería se lee como una línea de cierre que falta.
  cierto('el contrato guarda el informe rápido', informe && typeof informe.rapido === 'object' && informe.rapido !== null);
  cierto('y el profundo', informe && typeof informe.profundo === 'object' && informe.profundo !== null);
  eq('el rápido guardado es el que se midió recién',
    informe.rapido ? informe.rapido.dominio : null, 'clinicaejemplo.cl');
}

/* ================================================================== */
console.log('=== 2. sin la revisión con navegador en caché no se vende ===');
{
  // El informe profundo vence a las 24 h. Sin él no se puede saber qué señales cierra el kit,
  // y vender a ciegas es prometer lo que no se midió.
  const { db, crudo } = baseNueva();
  const red = conRed();
  // Envuelto a propósito: sin la guarda del informe profundo, el endpoint sigue adelante y
  // revienta al bajar a `profundo.revisado`. Un 500 es un defecto distinto de «vendió sin
  // medir», y los dos tienen que salir rojos en vez de matar la prueba.
  let r, j = null, lanzo = false;
  try {
    r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kvNuevo(), MP_ACCESS_TOKEN: 'TEST-tok' } });
    j = await r.json();
  } catch (e) { lanzo = true; r = { status: 0 }; }
  red.soltar();
  falso('el endpoint no lanza', lanzo);
  eq('contesta 409', r.status, 409);
  eq('con el motivo', j && j.motivo, 'sin-medicion');
  cierto('y una frase que dice qué hacer', String(j && j.detalle).length > 40);
  eq('NO crea pedido', filas(crudo).length, 0);
  eq('y no llama a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 3. si el sitio no abre AHORA, no se cotiza ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed({ sitio: null });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' } });
  red.soltar();
  const j = await r.json();
  eq('contesta 409', r.status, 409);
  eq('con el motivo', j.motivo, 'no-se-pudo-medir');
  eq('sin pedido', filas(crudo).length, 0);
  eq('sin llamar a Mercado Pago', red.llamadas.mp, 0);

  // ⚠️ ACÁ HAY DOS DEFENSAS, Y CONVIENE SABER CUÁL CONTESTÓ.
  //
  // Si se quita la guarda de `!rapido.ok`, el endpoint igual devuelve 409: `elegibilidad()`
  // tiene su propia defensa y ve que al informe le falta el puntaje. O sea que la guarda NO es
  // lo que impide la venta — es redundante para eso, y está bien que lo sea.
  //
  // Lo que la guarda sí aporta es el MENSAJE: dice por qué no se pudo abrir ESE sitio, en vez
  // del texto genérico de la compuerta. Si se mira solo el código de estado, una mutación que
  // la borra pasa desapercibida; por eso se mira de qué capa salió la respuesta.
  falso('la explicación viene del chequeo, no del texto genérico de la compuerta',
    String(j.detalle).includes('No alcanzamos a medir este sitio en'));
}

/* ================================================================== */
console.log('=== 4. la compuerta de elegibilidad manda, no el cliente ===');
{
  // Un sitio sin nada pendiente que el kit cierre: el profundo en orden y el rápido también.
  const { db, crudo } = baseNueva();
  const limpio = PROFUNDO();
  limpio.items = limpio.items.map((i) => ({ ...i, estado: 'ok', ok: true }));
  limpio.pendientes = 0;
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(limpio) });
  // Una portada SIN rastreadores y con gestor: el rápido tampoco deja pendiente nada del kit.
  const sinNada = PORTADA.replace(/<script[^>]*><\/script>/, '');
  const red = conRed({ sitio: sinNada });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' } });
  const j = await r.json();
  red.soltar();
  eq('contesta 409', r.status, 409);
  cierto('con un motivo de la compuerta', ['nada-pendiente', 'nada-que-el-kit-cierre'].includes(j.motivo));
  cierto('y su explicación en castellano', String(j.detalle).length > 30);
  eq('sin pedido', filas(crudo).length, 0);
  eq('sin llamar a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 5. EL DOBLE CLIC: una sola orden y un solo pedido ===');
{
  // La clave de idempotencia no cubre esto sola: dos clics son dos peticiones, y si cada una
  // generara su id, habría dos órdenes y dos cobros posibles por el mismo kit.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' };
  const red = conRed();

  const a = await E.onRequestPost({ request: pedir(BIEN), env });
  const b = await E.onRequestPost({ request: pedir(BIEN), env });
  const ja = await a.json(), jb = await b.json();
  red.soltar();

  eq('las dos contestan 200', [a.status, b.status], [200, 200]);
  eq('con el MISMO id de pedido', ja.id, jb.id);
  eq('y la misma URL de pago', ja.checkout_url, jb.checkout_url);
  eq('queda UN solo pedido', filas(crudo).length, 1);

  // Las dos llamadas a Mercado Pago llevan la MISMA clave de idempotencia, que es lo que hace
  // que Mercado Pago devuelva la orden que ya existía en vez de crear otra.
  const claves = red.llamadas.cabecerasMP.map((h) => h['X-Idempotency-Key']);
  eq('las dos llamadas llevan la misma clave', new Set(claves).size, 1);
  eq('y esa clave es el id del pedido', claves[0], ja.id);
}

/* ================================================================== */
console.log('=== 6. si Mercado Pago falla, el pedido NO se borra ===');
{
  // La fila es el único registro de que alguien intentó comprar. Borrarla deja a la persona sin
  // nada que mostrar y a nosotros sin saber que pasó.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed({ caeMP: true });
  const r = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' } });
  const j = await r.json();
  red.soltar();

  eq('contesta 502', r.status, 502);
  cierto('y dice que no se cobró nada', String(j.detalle).includes('No se te cobró'));
  eq('el pedido QUEDA', filas(crudo).length, 1);
  eq('en estado creado', filas(crudo)[0].estado, 'creado');
  eq('pero SIN id de orden, que es lo que lo distingue', filas(crudo)[0].mp_order_id, null);
  eq('y devuelve el id para poder escribirnos', j.id, filas(crudo)[0].id);
}

/* ================================================================== */
console.log('=== 7. el cuerpo que se le manda a Mercado Pago ===');
{
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed();
  await E.onRequestPost({ request: pedir(BIEN), env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' } });
  const c = red.llamadas.cuerposMP[0];
  const h = red.llamadas.cabecerasMP[0];
  red.soltar();

  eq('lleva la clave de idempotencia, que es OBLIGATORIA', typeof h['X-Idempotency-Key'], 'string');
  eq('va autenticado', h.Authorization, 'Bearer TEST-tok');
  eq('el monto es el del servidor', c.total_amount, '177310');
  eq('en modo manual, que es el de Checkout Pro', c.processing_mode, 'manual');
  eq('con la vuelta automática al sitio', c.config.online.auto_return, 'approved');
  eq('y vencimiento, para no dejar pedidos colgados', c.expiration_time, 'P1D');
  cierto('las URLs de vuelta apuntan a la pantalla del pedido',
    String(c.config.online.success_url).includes('/pedido/?id=vyc_'));
  eq('la referencia externa es el id del pedido', c.external_reference, c.external_reference);
  cierto('y cumple la regla de Mercado Pago', P.ID_VALIDO_MP.test(c.external_reference));
}

/* ================================================================== */
console.log('=== 8. el monto NO viene del cliente ===');
{
  // Es el error más fácil de cometer en un checkout: la página ya conoce el precio porque lo
  // muestra, y mandarlo «para no repetirlo» es dejar que el comprador elija cuánto paga.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const red = conRed();
  await E.onRequestPost({
    request: pedir({ ...BIEN, monto_total: 1, montoTotal: 1, monto_neto: 1, precio: 1 }),
    env: { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' },
  });
  red.soltar();
  eq('el pedido se guarda con el precio real', filas(crudo)[0].monto_total, 177310);
  eq('y a Mercado Pago se le pide el precio real', red.llamadas.cuerposMP[0].total_amount, '177310');
}

/* ================================================================== */
console.log('=== 9. los tres campos se validan ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' };
  const red = conRed();

  const sinConsentir = await E.onRequestPost({ request: pedir({ ...BIEN, consiento: false }), env });
  eq('sin consentimiento, 400', sinConsentir.status, 400);
  eq('con su motivo', (await sinConsentir.json()).motivo, 'sin-consentimiento');

  // Y "consiento" tiene que ser exactamente true, no cualquier cosa que parezca verdadera.
  for (const v of ['si', 'true', 1, {}]) {
    const r = await E.onRequestPost({ request: pedir({ ...BIEN, consiento: v }), env });
    eq(`consiento = ${JSON.stringify(v)} no alcanza`, r.status, 400);
  }

  for (const c of ['', 'no-es-correo', 'a@b', 'sin@arroba', 'dos@@arrobas.cl']) {
    const r = await E.onRequestPost({ request: pedir({ ...BIEN, correo: c }), env });
    eq(`correo ${JSON.stringify(c)} → 400`, r.status, 400);
  }

  const malDominio = await E.onRequestPost({ request: pedir({ ...BIEN, dominio: 'no es un dominio' }), env });
  eq('un dominio inválido, 400', malDominio.status, 400);
  eq('con el mensaje del normalizador', (await malDominio.json()).motivo, 'dominio');

  const sinCuerpo = await E.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/pedido', { method: 'POST', body: 'no es json' }), env,
  });
  eq('un cuerpo que no es JSON, 400', sinCuerpo.status, 400);

  red.soltar();
  eq('ninguna de las anteriores creó un pedido', filas(crudo).length, 0);
  eq('ni llamó a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 10. el tope de abuso ===');
{
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' };
  const red = conRed();

  // Se llena el contador del día a mano, como si ya hubiera gastado sus intentos.
  const dia = new Date().toISOString().slice(0, 10);
  await kv.put(`tope:pedido:ip:${dia}:1.2.3.4`, String(E.TOPE_PEDIDOS_IP_DIA));

  const req = new Request('https://verifica.spindlelab.cl/api/pedido', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'CF-Connecting-IP': '1.2.3.4' },
    body: JSON.stringify(BIEN),
  });
  const r = await E.onRequestPost({ request: req, env });
  red.soltar();

  eq('contesta 429', r.status, 429);
  eq('con su motivo', (await r.json()).motivo, 'tope');
  eq('sin crear pedido', filas(crudo).length, 0);
  eq('y sin llamar a Mercado Pago', red.llamadas.mp, 0);
}

/* ================================================================== */
console.log('=== 11. el origen ===');
{
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' };
  const red = conRed();

  const ajeno = await E.onRequestPost({ request: pedir(BIEN, { origen: 'https://otro-sitio.cl' }), env });
  eq('desde otro origen, 403', ajeno.status, 403);

  const propio = await E.onRequestPost({ request: pedir(BIEN, { origen: 'https://verifica.spindlelab.cl' }), env });
  eq('desde el propio, pasa', propio.status, 200);

  // Sin cabecera Origin se acepta: las peticiones del mismo origen pueden no mandarla, y
  // rechazarlas rompería la página.
  const sinOrigen = await E.onRequestPost({ request: pedir({ ...BIEN, correo: 'otro@ejemplo.cl' }), env });
  eq('sin Origin, pasa', sinOrigen.status, 200);
  red.soltar();
}

/* ================================================================== */
console.log('=== 12. sin base y otros métodos ===');
{
  const sinBase = await E.onRequestPost({ request: pedir(BIEN), env: { VYC_TOPES: kvNuevo() } });
  eq('sin base, 503', sinBase.status, 503);

  const { db } = baseNueva();
  const put = new Request('https://verifica.spindlelab.cl/api/pedido', { method: 'PUT' });
  const r = await E.onRequest({ request: put, env: { VYC_PEDIDOS: db } });
  eq('un PUT da 405', r.status, 405);
  eq('y dice qué se permite', r.headers.get('Allow'), 'GET, POST');
}

/* ================================================================== */
console.log('=== 13. el pedido recién creado se puede leer y no filtra nada ===');
{
  // El endpoint nuevo y el que ya existía tienen que calzar: lo que se crea se puede mirar.
  const { db } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' };
  const red = conRed();
  const creado = await (await E.onRequestPost({ request: pedir(BIEN), env })).json();
  red.soltar();

  const leido = await E.onRequestGet({
    request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${creado.id}`), env,
  });
  eq('se lee con 200', leido.status, 200);
  const j = await leido.json();
  const txt = JSON.stringify(j);
  falso('no filtra el correo', txt.includes('contacto@clinicaejemplo.cl'));
  falso('no filtra el informe', txt.includes('googletagmanager'));
  eq('y la etapa dice que estamos confirmando', j.etapa.etapa, 'confirmando');
  cierto('con la pantalla actualizándose sola', j.refrescar);
}

console.log('=== 14. el antidoble clic NO puede entregar el pedido de alguien que ya pagó ===');
{
  // `buscarPedidoReciente` filtra por estado `creado`, y ese filtro es una defensa, no una
  // optimización. El id del pedido es la ÚNICA credencial del espacio privado: si la búsqueda
  // incluyera pedidos `pagado`, cualquiera que adivine la pareja (dominio, correo) —que no es
  // secreta, el dominio está a la vista y el correo se puede intentar— recibiría de vuelta el
  // id de 32 hex de alguien que ya compró, y con él su pantalla, sus señales y su formulario de
  // datos.
  //
  // Por eso un pedido ya pagado tiene que ser invisible para este camino: lo correcto es crear
  // uno nuevo, no devolver el ajeno.
  const { db, crudo } = baseNueva();
  const kv = kvNuevo({ 'cache:clinicaejemplo.cl': JSON.stringify(PROFUNDO()) });
  const env = { VYC_PEDIDOS: db, VYC_TOPES: kv, MP_ACCESS_TOKEN: 'TEST-tok' };

  // Alguien ya compró, con el mismo dominio y el mismo correo.
  const idPagado = 'vyc_' + 'a'.repeat(32);
  crudo.prepare(
    `INSERT INTO pedidos (id, creado_en, estado, dominio, url_medida, senales_contratadas,
      senales_fuera, informe_json, monto_neto, monto_total, correo, mp_order_id)
     VALUES (?, ?, 'pagado', 'clinicaejemplo.cl', 'https://www.clinicaejemplo.cl/', '[]', '[]',
      '{}', 149000, 177310, 'contacto@clinicaejemplo.cl', 'ORD_DE_OTRO')`,
  ).run(idPagado, new Date().toISOString());

  const red = conRed();
  const r = await E.onRequestPost({ request: pedir(BIEN), env });
  const j = await r.json();
  red.soltar();

  eq('contesta 200', r.status, 200);
  falso('NO devuelve el id del pedido ya pagado', j.id === idPagado);
  cierto('devuelve uno nuevo', /^vyc_[0-9a-f]{32}$/.test(j.id));
  eq('y ahora hay dos pedidos, no uno reusado', filas(crudo).length, 2);

  const pagado = filas(crudo).find((f) => f.id === idPagado);
  eq('el pedido pagado no se tocó', pagado.estado, 'pagado');
  eq('ni se le cambió la orden', pagado.mp_order_id, 'ORD_DE_OTRO');
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
