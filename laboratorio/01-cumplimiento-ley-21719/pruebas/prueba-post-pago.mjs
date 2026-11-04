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
const AVISO = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));
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
  const todos = [];
  globalThis.fetch = async (u, o) => {
    todos.push({ host: new URL(String(u)).host, cuerpo: JSON.parse(String(o.body || '{}')) });
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  };
  /* ⚠️ SEPARADOS POR DESTINATARIO, Y NO ES COSMÉTICA (3-nov-2026).
   *
   * Hasta hoy por acá salía un solo correo, el aviso interno, y la prueba contaba peticiones.
   * Desde el aviso de inicio al cliente (art. 5 del Decreto 52 de 2024) salen dos por el mismo
   * proveedor, así que un conteo de peticiones ya no dice de qué habla: con `avisos.length`
   * valiendo 1 podía estar faltando el interno y sobrando el del cliente, o al revés.
   *
   * `internos` son los que van a la casilla del negocio y `alCliente` los que van a su correo.
   * Mirar el host no distingue nada desde que los avisos internos también salen por Resend.
   */
  /* ⚠️ EL DESTINO DE LOS AVISOS SE LEE DE `aviso.js`, NO SE ESCRIBE ACÁ (4-nov-2026).
   *
   * Estaba escrito a mano, la dirección literal, en SEIS archivos de prueba. El día que
   * cambió —Gmail estaba mandando esos avisos a spam porque iban del subdominio de envío al
   * propio dominio de Workspace— los seis se pusieron rojos a la vez, y ninguno estaba
   * midiendo un defecto: todos separaban «aviso interno» de «correo al cliente» por una
   * dirección copiada.
   *
   * Leerla de la constante hace que ese cambio no toque ninguna prueba, y que la prueba siga
   * hablando del HECHO —esto es el aviso interno— en vez de un valor que puede mudarse. */
  const paraHola = (a) => JSON.stringify((a.cuerpo && a.cuerpo.to) || []) === JSON.stringify([AVISO.DESTINO_AVISOS]);
  return {
    todos,
    get internos() { return todos.filter(paraHola); },
    get alCliente() { return todos.filter((a) => !paraHola(a)); },
    soltar() { globalThis.fetch = antes; },
  };
}
const postear = (cuerpo, db) => {
  const fondo = [];
  return { fondo, p: I.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/intake', { method: 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) }),
    env: { VYC_PEDIDOS: db, RESEND_API_KEY: 'clave-de-prueba' },
    waitUntil: (x) => fondo.push(x) }) };
};
/**
 * El valor de un rotulo del aviso interno.
 *
 * Desde el 3-nov-2026 los avisos salen por Resend y no por Web3Forms, asi que el cuerpo ya no
 * es un objeto de campos que el proveedor convertia en lineas: es el texto del correo, que
 * armamos nosotros. Se lee por rotulo igual que antes, para que la asercion siga hablando de
 * lo que el aviso DICE y no de la forma de la peticion.
 */
const campo = (cuerpo, rotulo) => {
  const esc = rotulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = new RegExp(`^${esc}: (.*)$`, 'm').exec(String((cuerpo && cuerpo.text) || ''));
  return m ? m[1] : undefined;
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
  eq('sale un aviso interno, y uno solo', red.internos.length, 1);
  // Y al cliente NO se le avisa nada todavia: a este le hay que entrar al sitio, asi que
  // mandarle sus datos no arranca la prestacion. El aviso de inicio es de la seccion 3.
  eq('y al cliente todavia no se le avisa ningun inicio', red.alCliente.length, 0);
  // Misma guarda, mismo motivo: sin aviso, lo que sigue reventaria en vez de acusar.
  const av = (red.internos[0] || { cuerpo: {} }).cuerpo;
  cierto('el asunto dice que llegaron los datos', /Datos de empresa/.test(av.subject));
  eq('trae la empresa, para no tener que abrir la base', campo(av, 'Empresa'), DATOS.razon_social);
  eq('y la plataforma', campo(av, 'Plataforma'), 'wordpress');

  // Las mismas reglas de privacidad que el resto de los avisos.
  falso('NO va el correo del comprador', JSON.stringify(av).includes('a@b.cl'));
  falso('NI el id completo del pedido', JSON.stringify(av).includes(ID));
  cierto('va el prefijo, que sirve para buscarlo y no para abrir nada',
    String(campo(av, 'Pedido (prefijo)')).startsWith(ID.slice(0, 12)));
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

  eq('y se avisa adentro', red.internos.length, 1);
  const av2 = (red.internos[0] || { cuerpo: {} }).cuerpo;
  cierto('el asunto habla del acceso', /Acceso declarado/.test(av2.subject || ''));
  // ⚠️ El aviso tiene que decir que es una DECLARACION, no una comprobacion: quien lo reciba
  // tiene que probar el acceso antes de darlo por bueno.
  cierto('y pide probarlo antes de darlo por bueno',
    /PRU[EÉ]BALO|prueba/i.test(campo(av2, 'Qué hacer') || ''));

  /* ═══ Y AL CLIENTE SE LE AVISA QUE EMPEZAMOS (3-nov-2026) ═══════════════════════════════
   *
   * Es el momento exacto en que el pedido pasa a nuestras manos, y el articulo 5 del Decreto
   * 52 de 2024 dice que la prestacion se entiende iniciada «desde el momento en que el
   * proveedor notifique esta circunstancia al consumidor». Hasta hoy eso no pasaba nunca: el
   * cliente declaraba el acceso, el aviso interno salia, y a el no se le decia nada. Su plazo
   * de retracto quedaba abierto mientras le trabajabamos el sitio.
   */
  eq('al cliente le llega un aviso de inicio, y uno solo', red.alCliente.length, 1);
  const alCl = (red.alCliente[0] || { cuerpo: {} }).cuerpo;
  eq('a su propio correo', alCl.to, ['a@b.cl']);
  cierto('el asunto dice que empezamos', /Empezamos/i.test(alCl.subject || ''));
  // ⚠️ LA FECHA SE ESCRIBE, PORQUE ES LA QUE HABRIA QUE PROBAR DESPUES.
  const anotado = sq.prepare('SELECT inicio_avisado_en i FROM pedidos WHERE id=?').get(ID).i;
  cierto('y queda anotada con su fecha', Boolean(anotado));
  eq('que es la que viaja a la pantalla', (j.pedido || {}).inicio_avisado_en, anotado);
  // Lo que el aviso le CAMBIA, dicho en el correo: sin esto es un tramite que no se entiende.
  cierto('el correo explica que de ahi corre su derecho a retractarse',
    /retract/i.test(alCl.text || ''));
  // Y no se le manda dos veces: un segundo envio del formulario no reabre el aviso.
  const red2 = conRed();
  const otra = postear({ id: ID, acceso_listo: true }, db);
  await otra.p; await Promise.all(otra.fondo);
  red2.soltar();
  eq('un segundo envio no vuelve a avisarle el inicio', red2.alCliente.length, 0);
  eq('y la fecha anotada sigue siendo la primera',
    sq.prepare('SELECT inicio_avisado_en i FROM pedidos WHERE id=?').get(ID).i, anotado);
}

/* ================================================================== */
console.log('=== 4. la pantalla OFRECE con que hacer cada cosa ===');
{
  // El hueco original no era del endpoint: era que la pantalla pedia algo sin dar el control.
  cierto('en falta-datos monta el formulario', /falta-datos'\) html \+= '<p class="te-toca-form" data-form-intake/.test(HTML_PEDIDO));
  // El 30-oct dejó de ser una línea: antes del botón se dibuja la ayuda para DAR el acceso
  // (instrucciones por plataforma y texto para reenviar), que es lo que la etapa prometía y no
  // existía. Lo que esta prueba cuida sigue siendo lo mismo: que la etapa monte su control.
  cierto('en falta-acceso monta el boton',
    /falta-acceso'\)\s*\{[\s\S]{0,600}data-boton-acceso/.test(HTML_PEDIDO));
  cierto('y antes la ayuda para darlo', /bloqueDeAcceso\(data\.acceso\)/.test(HTML_PEDIDO));
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
