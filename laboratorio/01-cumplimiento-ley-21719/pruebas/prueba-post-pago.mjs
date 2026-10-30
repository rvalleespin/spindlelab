/**
 * El camino DESPUÉS del pago: datos de empresa, acceso, y que alguien se entere.
 *
 *   node prueba-post-pago.mjs
 *
 * ── POR QUE EXISTE (30-oct-2026) ────────────────────────────────────────────────────────
 *
 * Una auditoria encontro que un pedido pagado llegaba, como maximo y por si solo, hasta
 * «ahora necesitamos entrar a tu sitio», y ahi se quedaba para siempre:
 *
 *   - la etapa `falta-acceso` pedia el acceso y NO ofrecia con que darlo. Ni boton, ni
 *     casilla: solo un «Escribenos». El endpoint aceptaba `acceso_listo` y el grep daba
 *     CERO llamadores en todo el proyecto.
 *   - y cuando el cliente SI completaba sus datos, nadie se enteraba: `intake.js` ni
 *     siquiera importaba el modulo de avisos. La unica transicion que funcionaba terminaba
 *     en una fila de la base que habia que ir a mirar.
 *
 * Del otro lado hay alguien con una fecha legal encima. Un pedido avanzando en silencio es
 * un pedido detenido.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple/functions/api';
for (const [v, f] of [['PEDIDOS_JS', 'pedidos.js'], ['ALMACEN_JS', 'almacen.js'],
  ['ETAPAS_JS', 'etapas.js'], ['INTAKE_JS', 'intake.js']]) process.env[v] = `${RAIZ}/${f}`;

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const I = await import(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'));
const HTML_PEDIDO = (await import('node:fs')).readFileSync(
  rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

function comoD1(sq) {
  return { prepare(sql) { const st = sq.prepare(sql); let a = []; const o = {
    bind(...x) { a = x; return o; },
    async run() { const r = st.run(...a); return { meta: { changes: Number(r.changes) } }; },
    async first() { return st.get(...a) ?? null; },
    async all() { return { results: st.all(...a) }; } }; return o; } };
}
const ID = 'vyc_' + 'd'.repeat(32);
async function basePagada() {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);
  await A.crearPedido(db, { id: ID, dominio: 'ejemplo.cl', correo: 'a@b.cl',
    senales_contratadas: ['cmp'], senales_fuera: [], informe_json: '{}',
    monto_neto: 149000, monto_total: 177310 });
  await A.marcarEstado(db, ID, 'creado', 'pagado', { pagado_en: new Date().toISOString() });
  return { db, sq };
}
function conRed() {
  const antes = globalThis.fetch;
  const avisos = [];
  globalThis.fetch = async (u, o) => {
    avisos.push({ host: new URL(String(u)).host, cuerpo: JSON.parse(String(o.body || '{}')) });
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  };
  return { avisos, soltar() { globalThis.fetch = antes; } };
}
const postear = (cuerpo, db) => {
  const fondo = [];
  return { fondo, p: I.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/intake', { method: 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) }),
    env: { VYC_PEDIDOS: db }, waitUntil: (x) => fondo.push(x) }) };
};
const DATOS = { razon_social: 'Clinica Ejemplo SpA', rut: '76.086.428-5',
  giro: 'Servicios medicos', direccion: 'Av. Siempre Viva 742', plataforma: 'wordpress' };

/* ================================================================== */
console.log('=== 1. recien pagado, le toca mandar sus datos ===');
{
  const { db, sq } = await basePagada();
  const p = sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(ID);
  eq('la etapa es falta-datos', E.etapaDelPedido(p).etapa, 'falta-datos');
  eq('y le toca a el', E.etapaDelPedido(p).quienActua, 'cliente');
}

/* ================================================================== */
console.log('=== 2. manda sus datos: avanza Y SE AVISA ===');
{
  const { db, sq } = await basePagada();
  const red = conRed();
  const { fondo, p } = postear({ id: ID, ...DATOS }, db);
  const r = await p; await Promise.all(fondo);
  red.soltar();
  const j = await r.json();

  eq('contesta 200', r.status, 200);
  eq('y la pantalla pasa a pedir el acceso', j.etapa.etapa, 'falta-acceso');
  eq('la razon social quedo escrita', sq.prepare('SELECT razon_social r FROM pedidos WHERE id=?').get(ID).r, DATOS.razon_social);

  // ⚠️ LA ASERCION QUE CIERRA EL HUECO. Antes la fila quedaba escrita y nadie lo sabia.
  eq('sale un aviso, y a un solo destino', red.avisos.map((a) => a.host), ['api.web3forms.com']);
  // Misma guarda, mismo motivo: sin aviso, lo que sigue reventaria en vez de acusar.
  const av = (red.avisos[0] || { cuerpo: {} }).cuerpo;
  cierto('el asunto dice que llegaron los datos', /Datos de empresa/.test(av.subject));
  eq('trae la empresa, para no tener que abrir la base', av.Empresa, DATOS.razon_social);
  eq('y la plataforma', av.Plataforma, 'wordpress');

  // Las mismas reglas de privacidad que el resto de los avisos.
  falso('NO va el correo del comprador', JSON.stringify(av).includes('a@b.cl'));
  falso('NI el id completo del pedido', JSON.stringify(av).includes(ID));
  cierto('va el prefijo, que sirve para buscarlo y no para abrir nada',
    String(av['Pedido (prefijo)']).startsWith(ID.slice(0, 12)));
}

/* ================================================================== */
console.log('=== 3. declara el acceso: el pedido SE DESTRABA ===');
{
  const { db, sq } = await basePagada();
  let red = conRed();
  let x = postear({ id: ID, ...DATOS }, db); await x.p; await Promise.all(x.fondo);
  red.soltar();

  // ⚠️ ESTE ES EL CAMINO QUE NO EXISTIA. `acceso_listo` tenia CERO llamadores: el endpoint
  // lo aceptaba y ninguna pantalla se lo mandaba nunca.
  red = conRed();
  x = postear({ id: ID, acceso_listo: true }, db);
  const r = await x.p; await Promise.all(x.fondo);
  red.soltar();
  const j = await r.json();

  eq('contesta 200', r.status, 200);
  // ⚠️ CON GUARDA. Al mutar el codigo para que el acceso no se guarde, la primera asercion
  // acusaba bien y la siguiente REVENTABA con un TypeError sobre un cuerpo de error: el
  // archivo se cortaba ahi y las aserciones que nombran el resto del problema no corrian.
  // Una prueba que revienta acusa una sola vez; una con guarda acusa todo lo que rompio.
  const et = (j && j.etapa) || {};
  eq('y el pedido pasa a en-curso', et.etapa, 'en-curso');
  eq('ahora actuamos nosotros', et.quienActua, 'nosotros');
  cierto('con fecha de acceso escrita',
    Boolean(sq.prepare('SELECT acceso_recibido_en a FROM pedidos WHERE id=?').get(ID).a));

  eq('y se avisa', red.avisos.map((a) => a.host), ['api.web3forms.com']);
  const av2 = (red.avisos[0] || { cuerpo: {} }).cuerpo;
  cierto('el asunto habla del acceso', /Acceso declarado/.test(av2.subject || ''));
  // ⚠️ El aviso tiene que decir que es una DECLARACION, no una comprobacion: quien lo reciba
  // tiene que probar el acceso antes de darlo por bueno.
  cierto('y pide probarlo antes de darlo por bueno',
    /PRU[EÉ]BALO|prueba/i.test(av2['Qué hacer'] || ''));
}

/* ================================================================== */
console.log('=== 4. la pantalla OFRECE con que hacer cada cosa ===');
{
  // El hueco original no era del endpoint: era que la pantalla pedia algo sin dar el control.
  cierto('en falta-datos monta el formulario', /falta-datos'\) html \+= '<p class="te-toca-form" data-form-intake/.test(HTML_PEDIDO));
  cierto('en falta-acceso monta el boton', /falta-acceso'\) html \+= '<p class="te-toca-form" data-boton-acceso/.test(HTML_PEDIDO));
  cierto('existe la funcion que lo dibuja', /function montarBotonAcceso/.test(HTML_PEDIDO));
  cierto('y manda acceso_listo', /acceso_listo: true/.test(HTML_PEDIDO));

  // ⚠️ LA QUE MAS CUIDA: se llama en la CARGA INICIAL, que es el caso normal de alguien que
  // abre el enlace de su pedido. Si solo se llamara despues de enviar el formulario, el boton
  // apareceria justo cuando ya no hace falta.
  const cargaInicial = HTML_PEDIDO.slice(HTML_PEDIDO.indexOf('No pudimos cargar tu pedido'));
  cierto('el boton se monta al cargar la pantalla', /montarBotonAcceso\(res\.j\)/.test(cargaInicial));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
