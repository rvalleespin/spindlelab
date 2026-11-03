/**
 * La cola de pedidos: GET /api/cola.
 *
 *   node prueba-cola.mjs
 *
 * ── POR QUÉ EXISTE (2-nov-2026) ─────────────────────────────────────────────────────────
 *
 * Porque atender una venta empezaba OBLIGATORIAMENTE por abrir la base de producción, y eso
 * no es una molestia: es donde el camino se cortaba.
 *
 * El aviso de venta manda 12 de los 36 caracteres del id (`LARGO_PREFIJO` en `aviso.js`), a
 * propósito, porque ese id es la única credencial de la pantalla del cliente y el aviso viaja
 * por un formulario de terceros hasta una casilla de correo. Pero `/api/entregar` exige el id
 * completo y los 24 que faltan son azar de `crypto.randomUUID()`. O sea que se podía hacer
 * todo el trabajo en el sitio del cliente y el pedido igual se quedaba en «Estamos trabajando
 * en tu sitio», porque nadie tenía a mano el id con el que cerrarlo.
 *
 * La aserción que define este archivo es la del final: el id que entrega la cola SÍ cierra un
 * pedido por `/api/entregar`, y el prefijo del aviso NO. Lo demás son los bordes.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple/functions/api';
for (const [v, f] of [['PEDIDOS_JS', 'pedidos.js'], ['ALMACEN_JS', 'almacen.js'],
  ['ETAPAS_JS', 'etapas.js'], ['AVISO_JS', 'aviso.js'], ['CORREO_JS', 'correo.js'],
  ['ENTREGAR_JS', 'entregar.js'], ['COLA_JS', 'cola.js']]) {
  if (!process.env[v]) process.env[v] = `${RAIZ}/${f}`;
}

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const AV = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));
const EN = await import(rutaEnElRepo('verificaycumple/functions/api/entregar.js', 'ENTREGAR_JS'));
const CO = await import(rutaEnElRepo('verificaycumple/functions/api/cola.js', 'COLA_JS'));

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

const CLAVE = 'c'.repeat(64);
/**
 * Un borrador de politica que pasa por uno.
 *
 * Desde el 3-nov-2026 `/api/entregar` no cierra un pedido sin el borrador: era el hueco mas
 * grande del tramo entre pagar y recibir. Sin esto, el cierre contesta 409 y las aserciones de
 * mas abajo medirian el rechazo en vez del cierre.
 */
const BORRADOR = [
  'POLITICA DE PRIVACIDAD DE EJEMPLO SPA',
  '',
  '1. Quien trata tus datos. Ejemplo SpA, con su RUT y su domicilio.',
  '2. Que datos tratamos y para que: los del formulario de contacto, para responderte, y los',
  '   de navegacion cuando aceptas las cookies de medicion.',
  '3. Por cuanto tiempo los guardamos y cuando los borramos.',
  '4. Tus derechos: acceso, rectificacion, supresion, oposicion y portabilidad, y el correo',
  '   por el que los ejerces.',
].join('\n');

const hex = (c) => 'vyc_' + c.repeat(32);

/** Una base con tres pedidos en tres situaciones distintas y fechas distintas. */
async function baseSembrada() {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);

  const sembrar = async (id, dominio, correo, creado_en) => {
    await A.crearPedido(db, {
      id, creado_en, dominio, url_medida: `https://${dominio}/`, correo,
      senales_contratadas: ['cmp', 'carga'], senales_fuera: ['https'],
      informe_json: JSON.stringify({ rapido: { puntaje: 30 }, profundo: { puntaje: 41 } }),
      monto_neto: 149000, monto_total: 177310,
    });
  };

  // El más viejo, nunca pagado.
  await sembrar(hex('a'), 'viejo.cl', 'viejo@ejemplo.cl', '2026-11-01T10:00:00.000Z');
  // Pagado y sin datos de facturación: la cola de verdad.
  await sembrar(hex('b'), 'pagado.cl', 'pagado@ejemplo.cl', '2026-11-02T10:00:00.000Z');
  await A.marcarEstado(db, hex('b'), 'creado', 'pagado', { pagado_en: '2026-11-02T10:05:00.000Z' });
  // Pagado y con todo adentro: listo para trabajar.
  await sembrar(hex('c'), 'listo.cl', 'listo@ejemplo.cl', '2026-11-02T12:00:00.000Z');
  await A.marcarEstado(db, hex('c'), 'creado', 'pagado', { pagado_en: '2026-11-02T12:05:00.000Z' });
  await A.guardarIntake(db, hex('c'), {
    razon_social: 'Clientes del Sur SpA', rut: '77.123.456-7', giro: 'Servicios',
    direccion: 'Av. Siempre Viva 742', plataforma: 'wordpress',
    acceso_recibido_en: '2026-11-02T13:00:00.000Z',
  });
  return { db, sq };
}

/**
 * `clave === false` significa «sin cabecera Authorization».
 *
 * ⚠️ Antes era `undefined` para eso y NO funcionaba: un parámetro con valor por omisión se
 * rellena justamente cuando le pasas `undefined`, así que la cabecera iba igual con la clave
 * buena y la prueba daba 200 donde esperaba 401. La prueba acusó bien; el error era suyo.
 */
function peticion(busqueda = '', clave = CLAVE, metodo = 'GET') {
  const h = new Headers();
  if (clave !== false) h.set('Authorization', `Bearer ${clave}`);
  return new Request(`https://verifica.spindlelab.cl/api/cola${busqueda}`, { method: metodo, headers: h });
}

const pedir = async (busqueda, env, clave) => {
  const r = await CO.onRequestGet({ request: peticion(busqueda, clave), env });
  return { r, cuerpo: await r.json() };
};

/* ================================================================== */
console.log('=== 1. la llave, y que falle cerrado ===');
{
  const { db } = await baseSembrada();

  // Sin el secreto cargado NO se lista nada. El modo «sin clave configurada, pasa» sobre un
  // endpoint que devuelve correos y RUT es exactamente lo que este producto le reprocha a los
  // sitios que mide.
  const sin = await pedir('', { VYC_PEDIDOS: db });
  eq('sin CLAVE_ENTREGA cargada: 409', sin.r.status, 409);
  eq('y lo dice', sin.cuerpo.motivo, 'sin-clave');
  falso('y no se filtra ni un pedido', 'pedidos' in sin.cuerpo);

  const mala = await pedir('', { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE }, 'x'.repeat(64));
  eq('con la clave equivocada: 401', mala.r.status, 401);
  falso('y tampoco se filtra nada', 'pedidos' in mala.cuerpo);

  const vacia = await pedir('', { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE }, false);
  eq('sin cabecera Authorization: 401', vacia.r.status, 401);
  const soloBearer = await pedir('', { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE }, '');
  eq('con «Bearer» y nada detrás: 401', soloBearer.r.status, 401);

  // El espacio pegado: un secreto así se ve CARGADO en el panel y no calza con nada.
  const conEspacio = await pedir('', { VYC_PEDIDOS: db, CLAVE_ENTREGA: `  ${CLAVE}\n` });
  eq('un secreto con espacios alrededor igual sirve', conEspacio.r.status, 200);

  const buena = await pedir('', { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE });
  eq('con la clave correcta: 200', buena.r.status, 200);

  // Es la MISMA clave de la entrega, no una segunda que vence por su cuenta.
  cierto('comparte la comparación de tiempo constante con /api/entregar',
    EN.mismoSecreto(CLAVE, CLAVE) && !EN.mismoSecreto('x', CLAVE));

  const sinBase = await pedir('', { CLAVE_ENTREGA: CLAVE });
  eq('sin la base: 409 y lo dice', sinBase.cuerpo.motivo, 'sin-base');
}

/* ================================================================== */
console.log('=== 2. trae lo que obligaba a abrir la base, y nada más ===');
{
  const { db } = await baseSembrada();
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE };
  const { cuerpo } = await pedir('', env);

  eq('salen los tres pedidos', cuerpo.total, 3);
  eq('el más nuevo primero', cuerpo.pedidos.map((p) => p.dominio), ['listo.cl', 'pagado.cl', 'viejo.cl']);

  const uno = cuerpo.pedidos[0];
  eq('el id viene ENTERO, no el prefijo', uno.id, hex('c'));
  cierto('y tiene la forma que exige /api/entregar', P.ID_PEDIDO_NUESTRO.test(uno.id));
  eq('viene el correo del cliente', uno.correo, 'listo@ejemplo.cl');

  // Los cuatro campos de la factura: es la otra razón por la que había que abrir D1.
  eq('la razón social', uno.razon_social, 'Clientes del Sur SpA');
  eq('el RUT', uno.rut, '77.123.456-7');
  eq('el giro', uno.giro, 'Servicios');
  eq('la dirección', uno.direccion, 'Av. Siempre Viva 742');

  // Y lo que la vista del cliente esconde a propósito sigue escondido ALLÁ, no acá: son dos
  // vistas distintas para dos lectores distintos, y la diferencia es deliberada.
  const publica = A.vistaPublica({ ...uno, estado: 'pagado' });
  falso('la vista pública NO lleva el correo', 'correo' in publica);
  falso('ni el RUT', 'rut' in publica);

  // El informe entero no viaja: son kilobytes por fila que nadie mira en una lista.
  falso('el informe congelado no viene', 'informe_json' in uno);
  falso('el informe final tampoco', 'informe_final_json' in uno);
  eq('pero se dice si existe', uno.tiene_informe_final, false);

  // Las UTM sí, porque son la única forma de saber si una venta vino de la campaña.
  cierto('vienen las utm', 'utm_source' in uno && 'utm_campaign' in uno);
}

/* ================================================================== */
console.log('=== 3. la etapa la calcula el MISMO código que ve el cliente ===');
{
  const { db } = await baseSembrada();
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE };
  const { cuerpo } = await pedir('', env);

  const enLaCola = cuerpo.pedidos.find((p) => p.dominio === 'pagado.cl');
  const fila = await A.leerPedido(db, hex('b'));
  const propia = E.etapaDelPedido(fila);

  // Si acá se reimplementara el criterio, el cliente y nosotros veríamos cosas distintas del
  // mismo pedido, y ninguno de los dos sabría cuál está mal.
  eq('la etapa calza con etapaDelPedido', enLaCola.etapa, propia.etapa);
  eq('y el título también', enLaCola.titulo, propia.titulo);
  cierto('dice quién tiene que actuar', Boolean(enLaCola.quien_actua));

  const trabajable = cuerpo.pedidos.find((p) => p.dominio === 'listo.cl');
  const filaC = await A.leerPedido(db, hex('c'));
  eq('y distingue al que ya dio datos y acceso', trabajable.etapa, E.etapaDelPedido(filaC).etapa);
  cierto('que no es la misma etapa que el que no dio nada', trabajable.etapa !== enLaCola.etapa);
}

/* ================================================================== */
console.log('=== 4. los bordes de los parámetros ===');
{
  const { db } = await baseSembrada();
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE };

  const pagados = await pedir('?estado=pagado', env);
  eq('se puede pedir solo lo pagado', pagados.cuerpo.total, 2);
  eq('y dice por cuál filtró', pagados.cuerpo.estado, 'pagado');

  // Un estado que no existe se RECHAZA en vez de devolver una lista vacía: vacío se lee como
  // «no hay ventas que atender», y escribirlo en plural no puede significar eso.
  const plural = await pedir('?estado=pagados', env);
  eq('un estado inventado: 400, no una lista vacía', plural.r.status, 400);
  eq('y lo nombra', plural.cuerpo.motivo, 'estado-invalido');

  const basura = await pedir('?tope=hola', env);
  eq('un tope que no es número no rompe', basura.r.status, 200);
  const uno = await pedir('?tope=1', env);
  eq('un tope chico se respeta', uno.cuerpo.total, 1);
}

/* ==================================================================
 *
 * EL TECHO DE LA CONSULTA, MEDIDO CON SUFICIENTES FILAS PARA QUE SE NOTE.
 *
 * ⚠️ La primera versión de estas aserciones no servía: con tres pedidos sembrados, `?tope=999999`
 * devolvía 3 con techo y 3 sin techo, así que la aserción `total <= 200` pasaba siempre. Se vio
 * sacando el `Math.min(...)` del código: las 55 aserciones siguieron verdes. Un verde que no
 * cambia cuando rompes lo que dice cuidar no está midiendo nada.
 *
 * Con 250 filas sí se separan. Y `?tope=-1` separa todavía mejor, porque en SQLite un LIMIT
 * negativo significa SIN LÍMITE: sin el techo, pedir «menos uno» devuelve la tabla entera.
 */
console.log('=== 4 bis. ninguna consulta sin techo ===');
{
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);
  for (let i = 0; i < 250; i++) {
    await A.crearPedido(db, {
      id: `vyc_${String(i).padStart(32, '0')}`,
      creado_en: new Date(Date.UTC(2026, 9, 1, 0, 0, i)).toISOString(),
      dominio: `sitio${i}.cl`, url_medida: `https://sitio${i}.cl/`, correo: `c${i}@ejemplo.cl`,
      senales_contratadas: ['cmp'], informe_json: '{}', monto_neto: 149000, monto_total: 177310,
    });
  }
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE };

  eq('hay 250 pedidos sembrados', sq.prepare('SELECT COUNT(*) n FROM pedidos').get().n, 250);

  const porOmision = await pedir('', env);
  eq('sin pedir nada, 25', porOmision.cuerpo.total, 25);

  const enorme = await pedir('?tope=999999', env);
  eq('un tope enorme se corta en 200', enorme.cuerpo.total, 200);

  const negativo = await pedir('?tope=-1', env);
  eq('un tope negativo NO devuelve la tabla entera', negativo.cuerpo.total, 1);

  const cero = await pedir('?tope=0', env);
  eq('un tope cero cae en el valor por omisión', cero.cuerpo.total, 25);
}

/* ================================================================== */
console.log('=== 5. no se abre a otros orígenes ni se cachea ===');
{
  const { db } = await baseSembrada();
  const { r } = await pedir('', { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE });

  // Los GET públicos del producto mandan `*` y está bien: devuelven lo que cualquiera puede
  // medir de un sitio ajeno. Este devuelve datos de personas.
  eq('no lleva Access-Control-Allow-Origin', r.headers.get('Access-Control-Allow-Origin'), null);
  eq('y no se cachea', r.headers.get('Cache-Control'), 'no-store');

  const post = await CO.onRequest({ request: peticion('', CLAVE, 'POST'), env: {} });
  eq('un POST no entra', post.status, 405);
  eq('y dice qué método sí', post.headers.get('Allow'), 'GET');
}

/* ==================================================================
 *
 * LA ASERCIÓN QUE DEFINE ESTE ARCHIVO.
 *
 * El id que entrega la cola cierra un pedido de verdad. El prefijo que manda el aviso, no.
 * Si algún día alguien «simplifica» la cola devolviendo el prefijo, esto se pone rojo.
 */
console.log('=== 6. con el id de la cola SÍ se puede entregar; con el del aviso NO ===');
{
  const { db, sq } = await baseSembrada();
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE };
  const { cuerpo } = await pedir('?estado=pagado', env);
  const elQueVoyAEntregar = cuerpo.pedidos.find((p) => p.dominio === 'listo.cl');

  // Primero, el camino viejo: lo único que Ramón recibía era el prefijo del aviso.
  const prefijo = String(elQueVoyAEntregar.id).slice(0, AV.LARGO_PREFIJO);
  eq('el aviso manda 12 caracteres', prefijo.length, 12);
  falso('y con esos 12 /api/entregar no acepta nada', P.ID_PEDIDO_NUESTRO.test(prefijo));

  const conPrefijo = await EN.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/entregar', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${CLAVE}` }),
      body: JSON.stringify({ id: prefijo }),
    }),
    env,
  });
  eq('entregar con el prefijo del aviso: 400', conPrefijo.status, 400);
  eq('y el motivo es el id', (await conPrefijo.json()).motivo, 'id-invalido');

  // Y ahora el camino nuevo, con el id que entrega la cola.
  const conEntero = await EN.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/entregar', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${CLAVE}` }),
      body: JSON.stringify({ id: elQueVoyAEntregar.id, borrador_politica: BORRADOR }),
    }),
    env,
  });
  const final = await conEntero.json();
  eq('entregar con el id de la cola: 200', conEntero.status, 200);
  cierto('y queda entregado', final.ok);
  eq('en la base también', sq.prepare('SELECT estado FROM pedidos WHERE id = ?').get(hex('c')).estado, 'entregado');

  // Y la cola lo refleja: deja de estar en lo que hay que atender.
  const despues = await pedir('?estado=pagado', env);
  eq('y sale de la cola de lo pagado', despues.cuerpo.total, 1);
  const entregados = await pedir('?estado=entregado', env);
  eq('y aparece en lo entregado', entregados.cuerpo.total, 1);
  eq('y sin informe final, porque esta entrega no mandó medición nueva',
    entregados.cuerpo.pedidos[0].tiene_informe_final, false);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
