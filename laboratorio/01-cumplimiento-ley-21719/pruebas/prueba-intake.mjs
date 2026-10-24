/**
 * Pruebas de `POST /api/intake` — los datos que el cliente manda después de pagar.
 *
 *   node prueba-intake.mjs
 *
 * Es el endpoint que desatasca un pedido pagado. Hasta que existió, `guardarIntake` no tenía
 * ninguna ruta que la llamara y la única forma de avanzar era por correo, a mano.
 *
 * Lo que más cuida, en orden:
 *
 *   1. Que NO se pueda escribir sobre un pedido que todavía no pagó.
 *   2. Que un id mal formado y uno inexistente contesten exactamente lo mismo. La llave es el
 *      enlace, así que cualquier diferencia entre esas dos respuestas es media pista regalada.
 *   3. Que el RUT se compruebe con su dígito verificador y no con una expresión regular. Un RUT
 *      bien formado con el dígito equivocado pasa cualquier regex y el problema aparece recién
 *      al facturar, con el cliente esperando.
 *   4. Que no se pueda escribir nada fuera de la lista blanca, ni siquiera el monto.
 */

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple/functions/api';
for (const [v, f] of [
  ['CHEQUEO_JS', 'chequeo.js'], ['PROFUNDO_JS', 'profundo.js'], ['INTAKE_JS', 'intake.js'],
  ['PEDIDOS_JS', 'pedidos.js'], ['ALMACEN_JS', 'almacen.js'], ['ETAPAS_JS', 'etapas.js'],
]) process.env[v] = `${RAIZ}/${f}`;

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const I = await import(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

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

async function sembrar(db, estado = P.ESTADOS.PAGADO) {
  const id = P.nuevoIdPedido();
  await A.crearPedido(db, {
    id, dominio: 'ejemplo.cl', url_medida: 'https://www.ejemplo.cl/',
    senales_contratadas: ['carga', 'cookies'], senales_fuera: ['politica'],
    informe_json: '{"secreto":"el informe completo"}',
    monto_neto: 149000, monto_total: 177310, correo: 'cliente@ejemplo.cl',
  });
  if (estado !== P.ESTADOS.CREADO) {
    await A.marcarEstado(db, id, P.ESTADOS.CREADO, estado, { pagado_en: new Date().toISOString() });
  }
  return id;
}

const pedir = (cuerpo, cab = {}) => new Request('https://verifica.spindlelab.cl/api/intake', {
  method: 'POST', headers: { 'content-type': 'application/json', ...cab },
  body: JSON.stringify(cuerpo),
});
const fila = (crudo, id) => crudo.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);

const DATOS = {
  razon_social: 'Clínica Ejemplo SpA', rut: '76.086.428-5', giro: 'Servicios médicos',
  direccion: 'Av. Siempre Viva 742, Santiago', plataforma: 'wordpress',
};

/* ================================================================== */
console.log('=== 1. el camino feliz ===');
{
  const { db, crudo } = baseNueva();
  const id = await sembrar(db);
  const r = await I.onRequestPost({ request: pedir({ id, ...DATOS }), env: { VYC_PEDIDOS: db } });
  const j = await r.json();

  eq('contesta 200', r.status, 200);
  cierto('dice que guardó', j.guardado);
  const f = fila(crudo, id);
  eq('la razón social', f.razon_social, 'Clínica Ejemplo SpA');
  eq('el RUT, normalizado sin puntos', f.rut, '76086428-5');
  eq('el giro', f.giro, 'Servicios médicos');
  eq('la dirección', f.direccion, 'Av. Siempre Viva 742, Santiago');
  eq('la plataforma', f.plataforma, 'wordpress');

  // Devuelve el estado NUEVO, para que la pantalla no tenga que preguntar otra vez.
  eq('la etapa ya es la siguiente', j.etapa.etapa, 'falta-acceso');
  cierto('con las señales', j.señales && j.señales.incluidas.length === 2);
  // Y no filtra nada de lo que no debe.
  const txt = JSON.stringify(j);
  falso('no filtra el informe', txt.includes('el informe completo'));
  falso('no filtra el correo', txt.includes('cliente@ejemplo.cl'));
  falso('ni devuelve el RUT', txt.includes('76086428'));
  eq('y no deja guardar la respuesta', r.headers.get('cache-control'), 'no-store');
}

/* ================================================================== */
console.log('=== 2. no se escribe sobre un pedido que no pagó ===');
{
  const { db, crudo } = baseNueva();
  const id = await sembrar(db, P.ESTADOS.CREADO);
  const r = await I.onRequestPost({ request: pedir({ id, ...DATOS }), env: { VYC_PEDIDOS: db } });
  const j = await r.json();

  // 409 y no 404: el id era válido y el pedido existe. Fingir que no existe sería mentirle a
  // alguien que está mirando su propio enlace.
  eq('contesta 409', r.status, 409);
  eq('con el motivo', j.motivo, 'todavia-no-pagado');
  eq('y no escribió nada', fila(crudo, id).razon_social, null);
}

/* ================================================================== */
console.log('=== 3. un id malo y uno inexistente son indistinguibles ===');
{
  const { db } = baseNueva();
  const env = { VYC_PEDIDOS: db };
  const inexistente = await I.onRequestPost({ request: pedir({ id: 'vyc_' + '0'.repeat(32), ...DATOS }), env });
  const malo = await I.onRequestPost({ request: pedir({ id: 'no-es-un-id', ...DATOS }), env });
  const vacio = await I.onRequestPost({ request: pedir({ ...DATOS }), env });
  // Mayúsculas: nuestro id es hexadecimal en minúscula, así que esto NO es nuestro.
  const mayus = await I.onRequestPost({ request: pedir({ id: 'vyc_' + 'A'.repeat(32), ...DATOS }), env });

  const cuerpos = await Promise.all([inexistente, malo, vacio, mayus].map((x) => x.json()));
  eq('los cuatro dan 404', [inexistente.status, malo.status, vacio.status, mayus.status], [404, 404, 404, 404]);
  eq('con la MISMA respuesta, byte a byte', new Set(cuerpos.map((c) => JSON.stringify(c))).size, 1);

  // ⚠️ QUÉ APORTA DE VERDAD LA COMPROBACIÓN DE FORMA DEL ID, que no es lo que parece.
  //
  // Al mutarla —cambiándola por un simple `if (!id)`— la prueba de arriba siguió verde, y con
  // razón: la compuerta real es la consulta a la base, que devuelve null para cualquier cosa
  // que no exista. La comprobación de forma NO es lo que impide entrar.
  //
  // Lo que sí aporta es no ir a la base por algo que evidentemente no es nuestro. Eso es
  // medible, así que se mide: con un id mal formado no se prepara ni una sola consulta.
  let consultas = 0;
  const dbEspia = { prepare(sql) { consultas++; return db.prepare(sql); } };
  await I.onRequestPost({ request: pedir({ id: 'no-es-un-id', ...DATOS }), env: { VYC_PEDIDOS: dbEspia } });
  eq('un id mal formado no toca la base', consultas, 0);
  await I.onRequestPost({ request: pedir({ id: 'vyc_' + '0'.repeat(32), ...DATOS }), env: { VYC_PEDIDOS: dbEspia } });
  cierto('y uno con nuestra forma sí la consulta', consultas > 0);
}

/* ================================================================== */
console.log('=== 4. EL RUT: dígito verificador, no una expresión regular ===');
{
  // Los válidos salen de calcular el módulo 11, no de copiarlos de una lista: así la prueba
  // comprueba el algoritmo y no un puñado de ejemplos.
  const dv = (cuerpo) => {
    let suma = 0, factor = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number(cuerpo[i]) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    const resto = 11 - (suma % 11);
    return resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  };
  for (const cuerpo of ['76086428', '12345678', '9876543', '78474925', '20000000']) {
    const bueno = `${cuerpo}-${dv(cuerpo)}`;
    eq(`${bueno} se acepta`, I.normalizarRut(bueno), bueno);
    // El mismo RUT con CUALQUIER otro dígito tiene que caer. Es lo que separa el módulo 11 de
    // una regex: la forma es idéntica.
    const otros = '0123456789K'.split('').filter((d) => d !== dv(cuerpo));
    const colados = otros.filter((d) => I.normalizarRut(`${cuerpo}-${d}`) !== null);
    eq(`${cuerpo} con otro dígito: ninguno se cuela`, colados, []);
  }

  // Normalización: puntos, espacios, k minúscula.
  eq('con puntos y guion', I.normalizarRut('76.086.428-5'), '76086428-5');
  eq('sin nada', I.normalizarRut('760864285'), '76086428-5');
  eq('con espacios', I.normalizarRut(' 76 086 428 5 '), '76086428-5');
  const conK = '20347762';
  eq('la K se guarda en mayúscula', I.normalizarRut(`${conK}-${dv(conK).toLowerCase()}`),
    `${conK}-${dv(conK)}`);

  for (const malo of ['', 'abc', '123', '1234567890123', null, undefined, 42, '76086428-X']) {
    eq(`${JSON.stringify(malo)} se rechaza`, I.normalizarRut(malo), null);
  }

  // Y en el endpoint, un RUT malo no escribe NADA, ni siquiera los otros campos que sí venían
  // bien: guardar la mitad dejaría el pedido en un estado a medias y sin aviso.
  const { db, crudo } = baseNueva();
  const id = await sembrar(db);
  const r = await I.onRequestPost({
    request: pedir({ id, ...DATOS, rut: '76086428-9' }), env: { VYC_PEDIDOS: db },
  });
  eq('contesta 400', r.status, 400);
  eq('con el motivo', (await r.json()).motivo, 'rut-invalido');
  eq('y no guardó la razón social tampoco', fila(crudo, id).razon_social, null);
}

/* ================================================================== */
console.log('=== 5. la plataforma es una lista cerrada ===');
{
  const { db, crudo } = baseNueva();
  const id = await sembrar(db);
  const env = { VYC_PEDIDOS: db };

  for (const p of ['wordpress', 'wix', 'a-medida', 'no-se']) {
    await I.onRequestPost({ request: pedir({ id, plataforma: p }), env });
    eq(`${p} se guarda tal cual`, fila(crudo, id).plataforma, p);
  }
  // Cualquier otra cosa cae en `otro`. El valor lo escribe quien visita y termina guardado y
  // mostrado, así que no puede ser texto libre.
  for (const p of ['../../etc/passwd', '<script>', 'drupal', 'x'.repeat(500)]) {
    await I.onRequestPost({ request: pedir({ id, plataforma: p }), env });
    eq(`${JSON.stringify(p.slice(0, 20))} cae en otro`, fila(crudo, id).plataforma, 'otro');
  }
  // Y la caja no crea plataformas nuevas.
  await I.onRequestPost({ request: pedir({ id, plataforma: 'WordPress' }), env });
  eq('la caja no cuenta', fila(crudo, id).plataforma, 'wordpress');
}

/* ================================================================== */
console.log('=== 6. no se escribe nada fuera de la lista blanca ===');
{
  const { db, crudo } = baseNueva();
  const id = await sembrar(db);
  const antes = fila(crudo, id);

  let lanzo = false, r;
  try {
    r = await I.onRequestPost({
      request: pedir({
        id, razon_social: 'Legítima SpA',
        // Todo esto tiene que ignorarse en silencio.
        monto_total: 1, monto_neto: 1, estado: 'entregado', correo: 'otro@sitio.cl',
        informe_json: '{}', mp_order_id: 'ORD_FALSA', pagado_en: null, id_otro: 'x',
      }),
      env: { VYC_PEDIDOS: db },
    });
  } catch { lanzo = true; }

  falso('no lanza', lanzo);
  eq('contesta 200', r && r.status, 200);
  const despues = fila(crudo, id);
  eq('la razón social sí entró', despues.razon_social, 'Legítima SpA');
  eq('el monto no se movió', despues.monto_total, antes.monto_total);
  eq('el estado tampoco', despues.estado, antes.estado);
  eq('ni el correo', despues.correo, antes.correo);
  eq('ni el informe', despues.informe_json, antes.informe_json);
  eq('ni el id de la orden', despues.mp_order_id, antes.mp_order_id);
}

/* ================================================================== */
console.log('=== 7. el acceso: solo `true` mueve la etapa ===');
{
  const { db, crudo } = baseNueva();
  const id = await sembrar(db);
  const env = { VYC_PEDIDOS: db };
  await I.onRequestPost({ request: pedir({ id, ...DATOS }), env });

  for (const v of ['si', 'true', 1, {}, 'on']) {
    await I.onRequestPost({ request: pedir({ id, acceso_listo: v }), env });
    eq(`acceso_listo = ${JSON.stringify(v)} no alcanza`, fila(crudo, id).acceso_recibido_en, null);
  }

  const r = await I.onRequestPost({ request: pedir({ id, acceso_listo: true }), env });
  const j = await r.json();
  cierto('con true sí se marca', Boolean(fila(crudo, id).acceso_recibido_en));
  eq('y la etapa pasa a en curso', j.etapa.etapa, 'en-curso');
  // El texto no puede afirmar que el acceso FUNCIONA: el dato solo dice que el cliente lo mandó.
  falso('y no afirma que ya recibimos el acceso', /Recibimos el acceso/i.test(j.etapa.detalle));
  cierto('dice que lo estamos probando', /probando/i.test(j.etapa.detalle));
}

/* ================================================================== */
console.log('=== 8. los bordes ===');
{
  const { db } = baseNueva();
  const id = await sembrar(db);
  const env = { VYC_PEDIDOS: db };

  const sinCampos = await I.onRequestPost({ request: pedir({ id }), env });
  eq('sin ningún campo, 400', sinCampos.status, 400);
  eq('con su motivo', (await sinCampos.json()).motivo, 'sin-campos');

  const noJson = await I.onRequestPost({
    request: new Request('https://v.cl/api/intake', { method: 'POST', body: 'no es json' }), env,
  });
  eq('un cuerpo que no es JSON, 400', noJson.status, 400);

  const sinBase = await I.onRequestPost({ request: pedir({ id, ...DATOS }), env: {} });
  eq('sin base, 409', sinBase.status, 409);

  const get = await I.onRequest({
    request: new Request('https://v.cl/api/intake', { method: 'GET' }), env,
  });
  eq('un GET da 405', get.status, 405);
  eq('y dice qué se permite', get.headers.get('Allow'), 'POST');

  // Los textos se recortan y se limpian, sin perder tildes ni eñes.
  eq('limpia los caracteres de control', I.limpiarTexto('Ñandú\u0000 S.A.\u001f', 200), 'Ñandú S.A.');
  eq('junta los espacios', I.limpiarTexto('  Dos    espacios  ', 200), 'Dos espacios');
  eq('recorta al tope', I.limpiarTexto('x'.repeat(500), 200).length, 200);
  eq('un texto vacío es null', I.limpiarTexto('   ', 200), null);
  eq('y lo que no es texto también', I.limpiarTexto(42, 200), null);
}

/* ================================================================== */
console.log('=== 9. el tope de abuso ===');
{
  const { db, crudo } = baseNueva();
  const id = await sembrar(db);
  const m = new Map();
  const kv = {
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async put(k, v) { m.set(k, String(v)); },
  };
  const dia = new Date().toISOString().slice(0, 10);
  m.set(`tope:intake:ip:${dia}:9.9.9.9`, String(I.TOPE_INTAKE_IP_DIA));

  const r = await I.onRequestPost({
    request: pedir({ id, ...DATOS }, { 'CF-Connecting-IP': '9.9.9.9' }),
    env: { VYC_PEDIDOS: db, VYC_TOPES: kv },
  });
  eq('contesta 429', r.status, 429);
  eq('con su motivo', (await r.json()).motivo, 'tope');
  eq('y no escribió', fila(crudo, id).razon_social, null);

  // Sin KV NO se declina: declinar le quitaría a quien ya pagó su única forma de desatascar su
  // pedido, y la puerta de verdad es que el id no se puede adivinar.
  const sinKv = await I.onRequestPost({ request: pedir({ id, ...DATOS }), env: { VYC_PEDIDOS: db } });
  eq('sin KV, pasa igual', sinKv.status, 200);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
