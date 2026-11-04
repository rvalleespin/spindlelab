/**
 * El camino de la devolución, que no existía.
 *
 *   VYC_REPO=/Users/ramon/vyc-ley21719 node prueba-devolucion.mjs
 *
 * ── POR QUÉ EXISTE (4-nov-2026) ─────────────────────────────────────────────────────────
 *
 * `devuelto` era un estado al que, con Flow, NADA podía llegar. Lo escribía solo el mapa de
 * Mercado Pago (`cobro.js`: `refunded → DEVUELTO`) y la pasarela viva desde el 30-oct es Flow,
 * cuyo mapa tiene tres números: pendiente, pagado, rechazado. No había endpoint ni camino
 * manual.
 *
 * O sea que si alguien ejercía su derecho a retracto, se le devolvía la plata en el panel de
 * Flow y el pedido quedaba en `entregado` para siempre: su pantalla le seguía mostrando el kit
 * y de la devolución no quedaba rastro.
 *
 * Y la promesa estaba publicada: los términos del 3-nov declaran el retracto de 10 días,
 * prometen el 100% y ponen un tope de 45 días. Es el único hueco del sistema de compra con
 * consecuencia legal, y por eso se cerró primero.
 *
 * ── QUÉ VIGILA ESTA PRUEBA, EN ORDEN DE IMPORTANCIA ─────────────────────────────────────
 *
 *   1. Que no se pueda ANOTAR una devolución que no se hizo. El correo le dice al cliente que
 *      la plata ya salió; si se anotara sin haberla devuelto, sería una afirmación falsa.
 *   2. Que los tres motivos escriban textos DISTINTOS. Decirle «perdón, falló algo» a quien
 *      solo usó un derecho que la ley le da es tratarlo de problema; y escribirle como si
 *      hubiera sido su decisión cuando la falla fue nuestra es esconderlo.
 *   3. Que no prometa que el dinero ya está en su cuenta, porque eso lo decide su banco.
 *   4. Que devolver dos veces no mande dos correos.
 *   5. Que quede el REGISTRO: fecha y motivo, no solo el estado.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/correo.js', 'CORREO_JS'));
const D = await import(rutaEnElRepo('verificaycumple/functions/api/devolver.js', 'DEVOLVER_JS'));

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
const CLAVE = 'c'.repeat(64);

async function base(estado = 'pagado') {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);
  await A.crearPedido(db, {
    id: ID, dominio: 'ejemplo.cl', url_medida: 'https://ejemplo.cl/', correo: 'cliente@ejemplo.cl',
    senales_contratadas: ['cmp'], senales_fuera: [],
    informe_json: JSON.stringify({ rapido: { puntaje: 30 }, profundo: { puntaje: 41 } }),
    monto_neto: 149000, monto_total: 177310,
  });
  if (estado !== 'creado') {
    // `entregado` y `contracargado` no se alcanzan desde `creado` en un paso.
    const camino = estado === 'entregado' ? ['pagado', 'entregado']
      : estado === 'contracargado' ? ['pagado', 'contracargado']
      : [estado];
    let desde = 'creado';
    for (const paso of camino) {
      await A.marcarEstado(db, ID, desde, paso, { pagado_en: new Date().toISOString() });
      desde = paso;
    }
  }
  return db;
}

/** La red fingida. Guarda lo que se mandó; `falla` hace que Resend conteste mal. */
function conRed({ falla = false } = {}) {
  const antes = globalThis.fetch;
  const cuerpos = [];
  globalThis.fetch = async (u, o) => {
    try { cuerpos.push(JSON.parse(String((o && o.body) || '{}'))); } catch { cuerpos.push(null); }
    return falla
      ? { ok: false, status: 500, text: async () => 'reventó', json: async () => ({}) }
      : { ok: true, status: 200, text: async () => '{}', json: async () => ({ id: 'x' }) };
  };
  return { cuerpos, soltar() { globalThis.fetch = antes; } };
}

/**
 * ⚠️ EL CENTINELA ES `null`, NO `undefined`, Y LA DIFERENCIA ROMPIÓ UNA ASERCIÓN.
 *
 * Pasar `clave: undefined` activa el VALOR POR DEFECTO del parámetro, así que la petición
 * salía con la clave buena: la aserción se llamaba «sin cabecera» y estaba probando el camino
 * autorizado. Daba 200 y el pedido se devolvía de verdad.
 *
 * Con `null` el defecto no se activa y la cabecera se omite, que es lo que la aserción dice
 * medir. El mismo cuidado que ya tuvo que tomar `peticion` en prueba-entrega.mjs con el
 * borrador: `undefined` se cae solo al serializar y no se distingue de un olvido.
 */
function peticion(cuerpo, clave = CLAVE) {
  const h = new Headers({ 'Content-Type': 'application/json' });
  if (clave !== null) h.set('Authorization', `Bearer ${clave}`);
  return new Request('https://verifica.spindlelab.cl/api/devolver', {
    method: 'POST', headers: h, body: JSON.stringify(cuerpo),
  });
}

const llamar = async (cuerpo, { db, clave = CLAVE, env = {}, falla = false } = {}) => {
  const red = conRed({ falla });
  const r = await D.onRequestPost({
    request: peticion(cuerpo, clave),
    env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k', ...env },
  });
  red.soltar();
  return { r, j: await r.json(), correos: red.cuerpos };
};

/* ================================================================== */
console.log('\n=== 0 · EL ESQUEMA DE VERDAD TIENE LAS DOS COLUMNAS ===\n');
{
  /* ⚠️ ESTA SECCIÓN EXISTE POR UN ERROR REAL DE HOY, Y ES LA MÁS BARATA DEL ARCHIVO.
   *
   * Al agregar las columnas quedó una coma de menos antes de `devuelto_en`. SQLite entonces
   * leyó `borrador_politica TEXT devuelto_en TEXT` como UNA sola columna con un tipo raro, la
   * tabla se creó **sin un solo error**, y `devuelto_en` simplemente no existía. 33 columnas
   * en vez de 34, en silencio.
   *
   * Lo que lo hace peligroso es que todo lo demás seguía pasando: el endpoint escribía, el
   * `UPDATE` no se quejaba de la columna que no estaba, y la prueba habría dado verde sobre un
   * registro incompleto. Un esquema que compila no es un esquema correcto.
   *
   * Así que se afirma la COLUMNA, no la ausencia de error. */
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const cols = sq.prepare('PRAGMA table_info(pedidos)').all();
  const porNombre = Object.fromEntries(cols.map((c) => [c.name, c.type]));
  eq('existe devuelto_en, y es TEXT', porNombre.devuelto_en, 'TEXT');
  eq('existe motivo_devolucion, y es TEXT', porNombre.motivo_devolucion, 'TEXT');
  // Y la vecina de arriba no se comió a nadie: su tipo tiene que seguir siendo TEXT pelado.
  eq('borrador_politica sigue siendo TEXT', porNombre.borrador_politica, 'TEXT');
}

/* ================================================================== */
console.log('\n=== 1 · FALLA CERRADO ===\n');
{
  const db = await base();
  eq('sin cabecera: 401', (await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db, clave: null })).r.status, 401);
  eq('clave equivocada: 401', (await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db, clave: 'x'.repeat(64) })).r.status, 401);
  // Sin CLAVE_ENTREGA en el entorno no hay modo «pasa igual»: es la misma regla que la cola.
  const sin = await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db, env: { CLAVE_ENTREGA: '' } });
  eq('sin clave en el entorno: 503', sin.r.status, 503);
  eq('y lo dice', sin.j.motivo, 'sin-clave');
  eq('un GET no anota nada', (await D.onRequest({ request: new Request('https://x/api/devolver'), env: {} })).status, 405);
  // Ninguno de los cuatro tocó el pedido.
  eq('el pedido sigue pagado', (await A.leerPedido(db, ID)).estado, 'pagado');
}

/* ================================================================== */
console.log('=== 2 · LO QUE NO SE PUEDE ANOTAR ===\n');
{
  const db = await base();
  eq('id inválido: 400', (await llamar({ id: 'no-soy-un-id', motivo: 'retracto', ya_devuelto_en_flow: true }, { db })).j.motivo, 'id-invalido');

  const inv = await llamar({ id: ID, motivo: 'porque-si', ya_devuelto_en_flow: true }, { db });
  eq('motivo inventado: 400', inv.r.status, 400);
  eq('y por el motivo correcto', inv.j.motivo, 'motivo-invalido');
  // ⚠️ El detalle nombra los motivos válidos LEYÉNDOLOS del código, no escritos a mano acá:
  // una lista copiada en el mensaje se desincroniza el día que se agregue un motivo.
  for (const m of Object.values(C.MOTIVOS_DEVOLUCION)) {
    cierto(`el detalle nombra «${m}»`, String(inv.j.detalle || '').includes(m));
  }

  /* ═══ LA ASERCIÓN MÁS IMPORTANTE DE ESTE ARCHIVO ═══
     El correo que sale de acá le dice al cliente que la devolución ya salió. Si se pudiera
     anotar sin haberla hecho en el panel de Flow, le estaríamos afirmando algo falso. */
  const sinBandera = await llamar({ id: ID, motivo: 'retracto' }, { db });
  eq('sin confirmar la devolución: 400', sinBandera.r.status, 400);
  eq('y por el motivo correcto', sinBandera.j.motivo, 'falta-confirmar-la-devolucion');
  eq('NO se mandó ningún correo', sinBandera.correos.length, 0);
  eq('y el pedido no se movió', (await A.leerPedido(db, ID)).estado, 'pagado');
  // Un valor que «parece» verdadero tampoco alcanza: es la misma vara que el consentimiento
  // del checkout, porque es la misma clase de declaración.
  for (const v of ['true', 1, 'si', {}]) {
    const x = await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: v }, { db });
    eq(`${JSON.stringify(v)} no cuenta como confirmación`, x.j.motivo, 'falta-confirmar-la-devolucion');
  }

  eq('un pedido que no existe: 404',
    (await llamar({ id: 'vyc_' + '0'.repeat(32), motivo: 'retracto', ya_devuelto_en_flow: true }, { db })).r.status, 404);
}

/* ================================================================== */
console.log('=== 3 · DESDE QUÉ ESTADOS SÍ, Y DESDE CUÁLES NO ===\n');
{
  for (const estado of ['pagado', 'entregado', 'contracargado']) {
    const db = await base(estado);
    const x = await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db });
    eq(`desde ${estado}: 200`, x.r.status, 200);
    eq(`  y queda devuelto`, (await A.leerPedido(db, ID)).estado, 'devuelto');
    eq(`  diciendo de dónde venía`, x.j.estado_anterior, estado);
  }

  /* ⚠️ `creado` y `pendiente` SÍ están en la tabla de transiciones, así que sin la compuerta
     de `SE_PUEDE_DEVOLVER` pasarían. Y devolverle plata a quien nunca pagó no es una
     devolución: es un error de quien llama, y el endpoint tiene que decirlo en vez de dejarlo
     pasar y mandarle un correo a alguien que no compró. */
  for (const estado of ['creado', 'pendiente']) {
    const db = await base(estado);
    const x = await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db });
    eq(`desde ${estado}: 409`, x.r.status, 409);
    eq(`  por el motivo correcto`, x.j.motivo, 'no-se-puede-devolver');
    eq(`  nombrando el estado real`, x.j.estado, estado);
    eq(`  sin mandar correo`, x.correos.length, 0);
    eq(`  y sin moverlo`, (await A.leerPedido(db, ID)).estado, estado);
  }
}

/* ================================================================== */
console.log('=== 4 · EL REGISTRO: FECHA Y MOTIVO, NO SOLO EL ESTADO ===\n');
{
  const db = await base();
  const x = await llamar({ id: ID, motivo: 'no-se-pudo-entregar', ya_devuelto_en_flow: true }, { db });
  const p = await A.leerPedido(db, ID);
  eq('queda el motivo en la base', p.motivo_devolucion, 'no-se-pudo-entregar');
  cierto('y la fecha', /^\d{4}-\d{2}-\d{2}T/.test(String(p.devuelto_en || '')));
  eq('la respuesta devuelve el mismo motivo', x.j.motivo_registrado, 'no-se-pudo-entregar');
  eq('y la misma fecha', x.j.devuelto_en, p.devuelto_en);

  /* ⚠️ Un pedido devuelto que en la cola se ve igual que uno vivo es un pedido que alguien va
     a volver a trabajar. La cola tiene que traer las dos columnas. */
  const filas = await A.listarPedidos(db, { estado: 'devuelto', tope: 10 });
  const fila = (Array.isArray(filas) ? filas : filas.pedidos || filas.filas || [])
    .find((f) => f.id === ID) || {};
  eq('la cola trae el motivo', fila.motivo_devolucion, 'no-se-pudo-entregar');
  cierto('y la fecha', Boolean(fila.devuelto_en));

  // La pantalla del cliente ya tenía la etapa; lo que faltaba era quién la alcanzaba.
  const e = E.etapaDelPedido(p);
  eq('la etapa que ve el cliente', e.etapa, 'devuelto');
  cierto('y queda terminada', e.terminado);
}

/* ================================================================== */
console.log('=== 5 · LOS TRES MOTIVOS NO COMPARTEN EL TEXTO ===\n');
{
  const textos = {};
  for (const m of Object.values(C.MOTIVOS_DEVOLUCION)) {
    const db = await base();
    const x = await llamar({ id: ID, motivo: m, ya_devuelto_en_flow: true }, { db });
    eq(`${m}: se mandó el correo`, x.correos.length, 1);
    cierto(`${m}: y la respuesta lo declara`, x.j.correo_enviado);
    textos[m] = String((x.correos[0] || {}).text || '');
    eq(`${m}: va al correo del comprador`, (x.correos[0] || {}).to, ['cliente@ejemplo.cl']);
    cierto(`${m}: dice el monto completo`, textos[m].includes('$177.310'));
    /* ⚠️ NO PROMETE QUE EL DINERO YA ESTÁ. Cuándo aparece lo decide el banco del comprador, y
       prometer la fecha es exactamente lo que hace que alguien escriba enojado tres días
       después. */
    falso(`${m}: no dice que ya está en su cuenta`, /ya est[áa] en tu cuenta|ya lo tienes/i.test(textos[m]));
    cierto(`${m}: y sí dice que puede tardar`, /puede tardar/i.test(textos[m]));
  }

  // ═══ LAS ASERCIONES QUE MIDEN LA DIFERENCIA, NO LA PRESENCIA ═══
  const t = Object.values(textos);
  eq('los tres textos son distintos entre sí', new Set(t).size, 3);

  const retracto = textos[C.MOTIVOS_DEVOLUCION.RETRACTO];
  const falla = textos[C.MOTIVOS_DEVOLUCION.NO_SE_PUDO_ENTREGAR];

  // A quien usó un derecho no se le pide perdón por una falla: es tratarlo de problema.
  cierto('al retracto le dice que está en su derecho', /en tu derecho/i.test(retracto));
  falso('y NO le dice que algo falló', /falla fue de nuestro lado|no pudimos entregar/i.test(retracto));
  falso('ni le pide explicaciones', /por qu[eé] (te )?retract/i.test(retracto));

  // Y cuando la falla fue nuestra, se dice. Escribirle como si hubiera sido su decisión es
  // esconderle de quién fue el problema.
  cierto('cuando no se pudo entregar, se admite la falla', /falla fue de nuestro lado/i.test(falla));
  cierto('y se dice que no pudimos entregar', /no pudimos entregarte/i.test(falla));

  // Ninguno de los dos usa voseo: la regla de marca es tuteo, siempre.
  for (const [m, x] of Object.entries(textos)) {
    falso(`${m}: sin voseo`, /\b(quer[ée]s|ten[ée]s|pod[ée]s|escribinos|mand[áa]nos)\b/i.test(x));
  }
  // Ni la raya larga, que es la huella de IA que este proyecto prohíbe.
  for (const [m, x] of Object.entries(textos)) {
    falso(`${m}: sin raya larga`, x.includes('—'));
  }
}

/* ================================================================== */
console.log('=== 6 · DEVOLVER DOS VECES NO MANDA DOS CORREOS ===\n');
{
  const db = await base();
  const primera = await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db });
  eq('la primera manda el correo', primera.correos.length, 1);
  const antes = await A.leerPedido(db, ID);

  // Con OTRO motivo, para que si la segunda escribiera se note en la base.
  const segunda = await llamar({ id: ID, motivo: 'otro', ya_devuelto_en_flow: true }, { db });
  eq('la segunda: 200 y ya_estaba', segunda.r.status, 200);
  cierto('lo dice', segunda.j.ya_estaba);
  /* ⚠️ El cliente ya recibió su correo; otro le haría creer que hubo una segunda devolución,
     que es justo lo que no hay. */
  eq('y NO manda otro correo', segunda.correos.length, 0);
  eq('la respuesta lo declara', segunda.j.correo_enviado, false);
  const despues = await A.leerPedido(db, ID);
  eq('el motivo original no se pisa', despues.motivo_devolucion, 'retracto');
  eq('ni la fecha', despues.devuelto_en, antes.devuelto_en);
}

/* ================================================================== */
console.log('=== 7 · UN CORREO QUE NO SALE NO DESHACE LA DEVOLUCIÓN ===\n');
{
  /* La plata ya volvió. Si el correo falla, revertir el estado dejaría el pedido diciendo
     «pagado» sobre un pago que no existe, y la cola lo mandaría a trabajar de nuevo. Se
     informa y no se revierte: es el mismo criterio que la entrega. */
  const db = await base();
  const x = await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db, falla: true });
  eq('la devolución queda hecha', x.r.status, 200);
  eq('el pedido quedó devuelto', (await A.leerPedido(db, ID)).estado, 'devuelto');
  eq('y se dice que el correo no salió', x.j.correo_enviado, false);
  eq('con el motivo igual registrado', (await A.leerPedido(db, ID)).motivo_devolucion, 'retracto');
}

/* ================================================================== */
console.log('=== 8 · DEVUELTO ES TERMINAL: NADA PUEDE DES-DEVOLVER UN PEDIDO ===\n');
{
  /* ── POR QUÉ ESTA SECCIÓN, Y CÓMO APARECIÓ ───────────────────────────────────────────────
   *
   * Se intentó romper el endpoint a propósito haciéndolo REVERTIR la devolución cuando el
   * correo falla, para comprobar que la sección 7 lo cazaba. La prueba siguió en verde — y no
   * porque la aserción fuera floja, sino porque la mutación no podía funcionar: `devuelto` no
   * tiene ninguna transición de salida, así que el revert fallaba solo.
   *
   * O sea que la garantía no vive en `devolver.js`: vive en la tabla de transiciones. Y una
   * garantía que nadie afirma es una garantía que alguien puede sacar sin enterarse, porque
   * agregar `devuelto → pagado` a esa tabla se ve inofensivo leyéndolo.
   *
   * Lo que protege, concretamente: un pedido al que se le devolvió la plata no puede volver a
   * figurar como pagado. Si pudiera, la cola lo mandaría a trabajar de nuevo y le estaríamos
   * entregando un kit a alguien a quien ya le devolvimos su dinero. */
  for (const destino of ['pagado', 'entregado', 'creado', 'pendiente', 'rechazado', 'contracargado']) {
    falso(`devuelto NO puede volver a ${destino}`, P.transicionValida('devuelto', destino));
  }
  cierto('y solo se admite a sí mismo', P.transicionValida('devuelto', 'devuelto'));

  // Y comprobado contra la base, no solo contra la tabla: el UPDATE lleva el estado esperado
  // en su WHERE, así que un intento de revertir no cambia ninguna fila.
  const db = await base();
  await llamar({ id: ID, motivo: 'retracto', ya_devuelto_en_flow: true }, { db });
  const r = await A.marcarEstado(db, ID, 'devuelto', 'pagado', {});
  falso('y el almacén se niega en la práctica', r.movido);
  eq('diciendo por qué', r.motivo, 'transicion-invalida');
  eq('el pedido sigue devuelto', (await A.leerPedido(db, ID)).estado, 'devuelto');
}

/* ================================================================== */
console.log('=== 9 · EL PAGO RECHAZADO YA NO ES UN CALLEJÓN ===\n');
{
  /* ── POR QUÉ ESTÁ EN ESTE ARCHIVO ────────────────────────────────────────────────────────
   *
   * Es el otro camino por el que una venta se cae sin que nadie la devuelva: la tarjeta se
   * rechaza. La etapa decía «puedes intentarlo de nuevo» y la pantalla dibujaba UN botón,
   * «Escríbenos». O sea que a la persona que quería comprar y cuya tarjeta falló —el camino
   * no-feliz más frecuente que hay— se le ofrecía mandar un correo en vez de reintentar.
   *
   * Se mira el HTML servido y no solo el texto de la etapa, porque el botón lo dibuja el
   * front: la etapa puede decir «apreta el botón de abajo» y el botón no existir, que es
   * exactamente lo que pasaba. */
  const fs = await import('node:fs');
  const PANTALLA = fs.readFileSync(
    rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');
  const PORTADA = fs.readFileSync(
    rutaEnElRepo('verificaycumple/public/index.html', 'VYC_PORTADA_HTML'), 'utf8');

  const e = E.etapaDelPedido({
    id: ID, estado: 'rechazado', dominio: 'ejemplo.cl',
    senales_contratadas: '["cmp"]', senales_fuera: '[]',
  });
  eq('la etapa del rechazo', e.etapa, 'sin-pago');
  cierto('dice que no se cobró nada', /no te cobramos nada/i.test(e.detalle || ''));
  // ⚠️ El texto ya no promete un reintento sin decir por dónde: nombra el botón.
  cierto('y manda al botón, no al correo', /bot[oó]n de abajo/i.test(e.queHacer || ''));

  // ═══ EL BOTÓN EXISTE, Y ES EL PRIMARIO ═══
  cierto('la pantalla dibuja el botón de reintento en sin-pago',
    /e\.etapa === 'sin-pago' && p\.dominio[\s\S]{0,400}Intentar el pago de nuevo/.test(PANTALLA));
  cierto('lleva el dominio en la URL para no volver a escribirlo',
    /href="\/\?dominio=' \+ encodeURIComponent\(p\.dominio\)/.test(PANTALLA));
  /* ⚠️ Y el «Escríbenos» pasa a secundario. Dos botones con el mismo peso no dicen cuál es el
     que la persona vino a apretar, y el que vino a apretar es el del pago. */
  cierto('y el «Escríbenos» queda secundario al lado',
    /falta-datos' \|\| e\.etapa === 'sin-pago' \? ' secundario'/.test(PANTALLA));

  // ═══ Y LA PORTADA RECIBE ESE DOMINIO Y CORRE EL CHEQUEO SOLA ═══
  cierto('la portada lee ?dominio=', /URLSearchParams\(location\.search\)\.get\('dominio'\)/.test(PORTADA));
  cierto('y lo pone en el campo', /input\.value = pedido;/.test(PORTADA));
  /* ⚠️ `requestSubmit` y NO `submit()`: `submit()` se salta el manejador del formulario, así
     que el campo quedaría lleno y el chequeo no correría nunca. Es un cambio de una palabra
     que convierte el arreglo en nada, y por eso se afirma la palabra. */
  cierto('y dispara el chequeo con requestSubmit', /form\.requestSubmit\(\)/.test(PORTADA));
  falso('y NO con submit(), que se saltea el manejador', /form\.submit\(\)/.test(PORTADA));
  // El dominio viene de la URL, así que se acota: un valor largo en ese campo es basura.
  cierto('el dominio de la URL se acota', /\.slice\(0, 253\)/.test(PORTADA));
}

console.log(`\n${malo ? 'HAY FALLAS' : 'TODO EN VERDE'} — ${ok} aserciones, ${malo} fallas\n`);
process.exit(malo ? 1 : 0);
