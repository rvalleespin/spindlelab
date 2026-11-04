/**
 * Las cuatro promesas que la pantalla hacía y el código no cumplía.
 *
 *   node prueba-entrega.mjs
 *
 * ── POR QUÉ EXISTE (30-oct-2026) ────────────────────────────────────────────────────────
 *
 * Un recorrido del camino post-pago sobre un pedido sembrado encontró cuatro frases que el
 * producto le dice a alguien que ya pagó $177.310, y que no correspondían a nada:
 *
 *   1. «te damos el texto listo para reenviarle» — ese texto no existía en ninguna parte.
 *   2. «te explicamos dónde crear la invitación» — no había instrucciones por plataforma, y
 *      el campo `plataforma`, recogido en el formulario EXACTAMENTE para esto, no lo leía
 *      ningún código de entrega.
 *   3. «Te mandamos el antes y el después por correo» — ese correo no existía: `correo.js`
 *      solo definía el de pago. Y `entregado`, la etapa que lo promete, era un estado
 *      INALCANZABLE: ningún código lo escribía.
 *   4. «Esta página se actualiza sola» — cierto durante dos minutos. Después el bucle se
 *      cortaba y la frase se quedaba en pantalla siendo falsa, sin avisar.
 *
 * Las cuatro son del mismo tipo: no rompen el cobro, y caen justo donde la persona ya pagó y
 * necesita ayuda. Esta prueba las ata.
 */

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

// ⚠️ ACÁ HABÍA UNA RUTA DE MÁQUINA ESCRITA A MANO (quitada el 3-nov-2026).
//
// Este archivo rellenaba las siete variables de entorno desde un `/Users/ramon/vyc-ley21719/…`
// literal, y con eso `rutaEnElRepo` nunca llegaba a ejecutar su guarda: siempre encontraba la
// variable puesta. El efecto es que esta prueba elegía un repositorio sin preguntar, y hoy
// acertaba por casualidad.
//
// Importa porque existe un worktree hermano, `/Users/ramon/vyc-pixel-consentimiento`, con
// copias DISTINTAS de estos archivos. La guarda de `rutas.mjs` se planta a propósito cuando hay
// más de uno, porque elegir el primero significaría probar el repositorio equivocado y
// reportarlo en verde. Saltársela convertía esa protección en nada justo para este archivo.
//
// Ahora se corre como los demás: `VYC_REPO=/Users/ramon/vyc-ley21719 node prueba-entrega.mjs`.

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const AC = await import(rutaEnElRepo('verificaycumple/functions/api/acceso.js', 'ACCESO_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/correo.js', 'CORREO_JS'));
const EN = await import(rutaEnElRepo('verificaycumple/functions/api/entregar.js', 'ENTREGAR_JS'));
const I = await import(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'));
const HTML = fs.readFileSync(
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

const ID = 'vyc_' + 'e'.repeat(32);
const INFORME_ANTES = { rapido: { puntaje: 30 }, profundo: { puntaje: 41 } };

async function baseConPedido(estado = 'pagado', extra = {}) {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);
  await A.crearPedido(db, {
    id: ID, dominio: 'ejemplo.cl', url_medida: 'https://ejemplo.cl/', correo: 'cliente@ejemplo.cl',
    senales_contratadas: ['cmp', 'carga'], senales_fuera: ['aviso'],
    informe_json: JSON.stringify(INFORME_ANTES), monto_neto: 149000, monto_total: 177310,
  });
  if (estado !== 'creado') {
    await A.marcarEstado(db, ID, 'creado', estado, { pagado_en: new Date().toISOString() });
  }
  if (Object.keys(extra).length) await A.guardarIntake(db, ID, extra);
  return { db, sq };
}

/**
 * Un borrador de política que pasa por uno.
 *
 * Desde el 3-nov-2026 `/api/entregar` no cierra un pedido sin el borrador: era el hueco más
 * grande del tramo entre pagar y recibir, y el endpoint podía marcar «entregado» sobre un
 * pedido cuyo correo de cierre promete que un abogado revise un texto que nunca salió.
 */
const BORRADOR = [
  'POLÍTICA DE PRIVACIDAD DE EJEMPLO SPA',
  '',
  '1. Quién trata tus datos. Ejemplo SpA, RUT 76.086.428-5, con domicilio en Calle 1.',
  '2. Qué datos tratamos y para qué. Los que escribes en el formulario de contacto, para',
  '   responderte, y los de navegación cuando aceptas las cookies de medición.',
  '3. Por cuánto tiempo los guardamos y cuándo los borramos.',
  '4. Tus derechos: acceso, rectificación, supresión, oposición y portabilidad, y el correo',
  '   por el que los ejerces.',
].join('\n');

/**
 * Un `request` como el que recibe una Pages Function.
 *
 * ⚠️ LLEVA EL BORRADOR POR DEFECTO, porque sin él el cierre se rechaza y ninguna de las
 * aserciones de más abajo hablaría de lo que dice hablar. Para probar el rechazo en sí se
 * pasa `borrador_politica: null`, que es lo que lo saca del cuerpo: un `undefined` se cae
 * solo al serializar y no se distinguiría de un olvido.
 */
function peticion(cuerpo, clave) {
  const h = new Headers({ 'Content-Type': 'application/json' });
  if (clave !== undefined) h.set('Authorization', `Bearer ${clave}`);
  const body = { borrador_politica: BORRADOR, ...cuerpo };
  if (body.borrador_politica === null) delete body.borrador_politica;
  return new Request('https://verifica.spindlelab.cl/api/entregar', {
    method: 'POST', headers: h, body: JSON.stringify(body),
  });
}

/** La red fingida: guarda a dónde se llamó y con qué, y contesta lo que se le diga. */
function conRed(contesta = () => ({ ok: true, status: 200 })) {
  const antes = globalThis.fetch;
  const llamadas = [];
  globalThis.fetch = async (u, o) => {
    let cuerpo = null;
    try { cuerpo = JSON.parse(String((o && o.body) || '{}')); } catch { cuerpo = String(o && o.body); }
    llamadas.push({ host: new URL(String(u)).host, cuerpo });
    const r = contesta(llamadas.length);
    // ⚠️ `lanza` existe porque sin él solo se probaba la falla AMABLE. El modo de falla real
    // de Resend en producción no es un http-500: es la excepción —el AbortSignal.timeout de
    // los 8 segundos, un DNS caído, la conexión cortada— y ese camino no lo corría ninguna
    // aserción. Una entrega ya escrita en la base no se puede caer por ahí.
    if (r.lanza) throw new Error(r.lanza === true ? 'conexión cortada' : String(r.lanza));
    return { ok: r.ok, status: r.status, json: async () => ({}) };
  };
  return { llamadas, soltar() { globalThis.fetch = antes; } };
}

console.log('\n=== 1 · EL TEXTO PARA REENVIAR (promesa 1) ===\n');
{
  const base = { id: ID, dominio: 'ejemplo.cl', plataforma: 'wordpress' };
  const t = AC.textoParaReenviar(base);

  cierto('nombra el sitio', t.includes('ejemplo.cl'));
  cierto('dice a qué correo va la invitación', t.includes(AC.CORREO_ACCESO));
  cierto('nombra el permiso de la plataforma', /Administrador/.test(t));
  cierto('dice que no se pide contraseña', /No piden ninguna contraseña/.test(t));
  cierto('dice que el acceso es temporal', /temporal/.test(t));

  // ⚠️ LA ASERCIÓN QUE MÁS IMPORTA DE TODO EL ARCHIVO.
  //
  // Es un texto pensado para REENVIARSE a un tercero. El id del pedido son los 32 hex que
  // abren la pantalla privada del comprador: sus datos de facturación, su formulario, su
  // pedido. Si se colara acá, cada cliente que pidiera ayuda a su agencia le estaría
  // entregando esa llave sin saberlo.
  falso('NO lleva el id del pedido', t.includes(ID));
  falso('NO lleva un enlace al pedido', /\/pedido\//.test(t));

  // Y sin cortes dentro de un párrafo: este texto se PEGA en un WhatsApp o en un correo desde
  // el teléfono, y un párrafo cortado a mano a 95 caracteres se ve roto en una pantalla
  // angosta, con cada línea partida a la mitad. Los saltos van solo entre párrafos.
  // La firma de un corte a mano es concreta: dos líneas seguidas donde la SEGUNDA empieza en
  // minúscula, o sea la continuación de la frase anterior. Un primer intento midió el largo y
  // si la línea terminaba en punto, y acusó «La invitación va a este correo: hola@...», que es
  // una línea corta y completa. La heurística medía otra cosa.
  const lineas = t.split('\n');
  const cortes = lineas.filter((l, i) => l.trim() && lineas[i + 1] && /^[a-záéíóúñ]/.test(lineas[i + 1]));
  eq('ningún párrafo viene cortado a mano', cortes.map((l) => l.slice(-35)), []);

  // Está escrito en primera persona del CLIENTE: es un mensaje que él manda. Si estuviera en
  // la nuestra, habría que editarlo antes de reenviarlo, y un texto que hay que editar no es
  // un texto listo — que es literal lo que la pantalla promete.
  cierto('habla en primera persona del cliente', /Contraté/.test(t));
  falso('no habla en primera persona nuestra', /Necesitamos un acceso/.test(t));

  // Una plataforma sin ruta de menú nombrable cae en el permiso genérico.
  const w = AC.textoParaReenviar({ id: ID, dominio: 'ejemplo.cl', plataforma: 'webflow' });
  cierto('sin ruta nombrable, describe el permiso', w.includes(AC.LO_QUE_HACE_FALTA));

  // ⚠️ LAS DOS ASERCIONES DE ARRIBA NO ALCANZABAN, Y UNA ERA VACUA.
  //
  // `textoParaReenviar` tiene DOS ramas: con `pasos` y sin `pasos`. Todo lo de arriba corre
  // sobre wordpress (rama con pasos) y el guardia del menú corría sobre webflow (rama SIN
  // pasos), que por construcción no puede producir ese string: pasaba porque la rama no se
  // toma, no porque el código no invente rutas.
  //
  // Mientras tanto la rama que SÍ nombraba una ruta la nombraba MAL: decía «En X se hace
  // desde Usuarios» con «Usuarios» fijo, y los pasos de Wix mandan a «Roles y permisos» y los
  // de Squarespace a la sección de permisos. El texto que el cliente le reenviaba a su
  // agencia contradecía las instrucciones que él mismo estaba leyendo en pantalla.
  //
  // Lo encontró una revisión adversaria generando los nueve textos y leyéndolos. Esto es lo
  // que debería haberlo encontrado antes.
  const RUTAS = /se hace desde|Usuarios|Configuración|Roles y permisos|wp-admin|escritorio|men[úu]/i;
  const TODAS = [...I.PLATAFORMAS, undefined, '', 'inventada'];
  for (const plataforma of TODAS) {
    const nombre = plataforma || '(sin declarar)';
    const t = AC.textoParaReenviar({ id: ID, dominio: 'ejemplo.cl', plataforma });

    // El id del pedido en CUALQUIER rama, no solo en la de wordpress.
    falso(`${nombre}: sin el id del pedido`, t.includes(ID));
    falso(`${nombre}: sin enlace al pedido`, /\/pedido\//.test(t));
    // Ninguna rama nombra un menú. Si ninguna lo nombra, ninguna puede contradecir su ficha.
    falso(`${nombre}: sin ruta de menú`, RUTAS.test(t));

    // Y la rama con pasos tiene que decir el permiso REAL de su ficha, no uno de plantilla.
    const ficha = AC.fichaDePlataforma(plataforma);
    if (ficha.pasos) {
      cierto(`${nombre}: nombra el permiso de su ficha`,
        t.includes(`permiso de ${ficha.permiso}`));
    }
  }

  // El permiso se enchufa después de «permiso de», así que tiene que leerse como frase
  // nominal. Shopify salía «permiso de un usuario con permiso de Temas y de Aplicaciones».
  for (const [nombre, f] of Object.entries(AC.POR_PLATAFORMA)) {
    if (!f.pasos) continue;
    falso(`${nombre}: el permiso no repite la palabra permiso`, /permiso/i.test(f.permiso));
    falso(`${nombre}: el permiso no empieza con un artículo`, /^(un|una|el|la)\s/i.test(f.permiso));
  }
}

console.log('\n=== 2 · LAS INSTRUCCIONES POR PLATAFORMA (promesa 2) ===\n');
{
  // El campo `plataforma` se recoge para esto. Antes se guardaba y no lo leía nadie.
  const wp = AC.fichaDePlataforma('wordpress');
  cierto('WordPress trae pasos concretos', Array.isArray(wp.pasos) && wp.pasos.length >= 3);
  cierto('y explica POR QUÉ pide Administrador', /solo el rol de Administrador puede instalar/.test(wp.porQue));
  cierto('y dice cómo se quita al final', /borrar esa cuenta/.test(wp.alFinal));

  // La regla del archivo: pasos O buscar, nunca las dos. Si una plataforma trajera las dos,
  // la decisión de qué se puede afirmar quedaría en la pantalla.
  for (const [nombre, f] of Object.entries(AC.POR_PLATAFORMA)) {
    falso(`${nombre}: no trae pasos Y buscar a la vez`, Boolean(f.pasos) && Boolean(f.buscar));
    cierto(`${nombre}: trae una de las dos`, Boolean(f.pasos) || Boolean(f.buscar));
    cierto(`${nombre}: dice cómo se quita`, Boolean(f.alFinal));
  }

  // Webflow y Jimdo NO inventan una ruta: Webflow ha movido el acceso entre versiones y
  // Jimdo no ofrece invitaciones en todos sus planes.
  falso('Webflow no da una ruta de menú', Boolean(AC.POR_PLATAFORMA.webflow.pasos));
  falso('Jimdo no da una ruta de menú', Boolean(AC.POR_PLATAFORMA.jimdo.pasos));
  cierto('Jimdo dice que puede no existir en su plan',
    /no permite invitar a otra persona en todos sus planes/.test(AC.POR_PLATAFORMA.jimdo.buscar));

  // Lo que el formulario acepta y lo que este módulo conoce tienen que calzar: una plataforma
  // que el formulario guarda y este archivo no conoce cae al genérico en silencio, y el
  // cliente recibe «lo averiguamos nosotros» cuando nos dijo exactamente en qué está.
  const sinFicha = [...I.PLATAFORMAS].filter(
    (p) => !['no-se', 'otro'].includes(p) && !AC.POR_PLATAFORMA[p]);
  eq('toda plataforma del formulario tiene ficha', sinFicha, []);

  // Y al revés: una ficha que el formulario no puede guardar es código muerto.
  const sinOpcion = Object.keys(AC.POR_PLATAFORMA).filter((p) => !I.PLATAFORMAS.has(p));
  eq('toda ficha es una opción del formulario', sinOpcion, []);

  // «No sé» es una salida de verdad, no un «escríbenos» con otras palabras.
  cierto('sin plataforma, no le devuelve el problema',
    /No hace falta que lo sepas/.test(AC.SIN_PLATAFORMA.buscar));
  cierto('y la tercera salida dice qué pasa si no hay acceso',
    /[Nn]o te vamos a cobrar por algo que no podemos entregar/.test(AC.SI_NO_SABES.comoSigue));
}

console.log('\n=== 2 bis · NI UNA RAYA LARGA EN LO QUE LEE EL CLIENTE ===\n');
{
  // La raya larga usada como golpe de efecto es el tell de escritura automática que la marca
  // prohíbe por escrito, y acá pesa el doble: el texto para reenviar se lo manda el cliente a
  // su agencia, así que una raya ahí delata de dónde salió el mensaje que firma él.
  //
  // Se colaron dos en la primera versión de este módulo, y una era exactamente el uso
  // prohibido («qué parte no — no te vamos a cobrar»). Un grep del archivo no sirve de
  // guardia: los comentarios de este repo están llenos de rayas, y con razón. Se mira el
  // texto que SALE.
  const textos = [];
  for (const f of [...Object.values(AC.POR_PLATAFORMA), AC.SIN_PLATAFORMA]) {
    textos.push(f.porQue, f.alFinal, f.buscar, ...(f.pasos || []));
  }
  textos.push(AC.SI_NO_SABES.texto, AC.SI_NO_SABES.comoSigue, AC.LO_QUE_HACE_FALTA);
  for (const plataforma of [...I.PLATAFORMAS]) {
    textos.push(AC.textoParaReenviar({ id: ID, dominio: 'ejemplo.cl', plataforma }));
  }
  const cierre = C.correoDeEntrega({
    id: ID, dominio: 'ejemplo.cl', correo: 'c@e.cl', senales_contratadas: ['cmp'],
    senales_fuera: ['aviso'], informe_json: JSON.stringify(INFORME_ANTES),
  }, { profundo: { puntaje: 95 } }, E.TITULOS);
  textos.push(cierre.text, cierre.html, cierre.subject);

  const conRaya = textos.filter(Boolean).filter((t) => t.includes('\u2014'));
  eq('ni una raya larga en el texto del cliente', conRaya.map((t) => t.slice(0, 60)), []);
}

console.log('\n=== 3 · LA AYUDA SOLO EN SU ETAPA, Y DESDE UN SOLO LUGAR ===\n');
{
  const pagadoSinDatos = { id: ID, dominio: 'ejemplo.cl', estado: 'pagado' };
  const pagadoSinAcceso = { ...pagadoSinDatos, razon_social: 'Ejemplo SpA', plataforma: 'wix' };
  const enCurso = { ...pagadoSinAcceso, acceso_recibido_en: '2026-10-30T12:00:00.000Z' };

  eq('en falta-datos no hay ayuda de acceso',
    AC.ayudaDeAcceso(pagadoSinDatos, E.etapaDelPedido(pagadoSinDatos)), null);
  eq('en en-curso tampoco', AC.ayudaDeAcceso(enCurso, E.etapaDelPedido(enCurso)), null);

  const a = AC.ayudaDeAcceso(pagadoSinAcceso, E.etapaDelPedido(pagadoSinAcceso));
  cierto('en falta-acceso sí la hay', Boolean(a));
  eq('y es la de SU plataforma', a.nombre, 'Wix');
  cierto('trae el texto para reenviar', a.textoParaReenviar.length > 100);
  cierto('trae la tercera salida', Boolean(a.siNoSabes));

  // La condición vive en `ayudaDeAcceso`, no en los llamadores. Es la lección de
  // `tieneReferenciaDePago`, que estuvo repetida en tres `if` y el día del cambio se actualizó
  // uno solo: dos de las tres comparaciones quedaron devolviendo false sin que nada se pusiera
  // rojo. Acá los llamadores son el GET del pedido y el POST del formulario.
  const fuentes = {
    'pedido.js': fs.readFileSync(rutaEnElRepo('verificaycumple/functions/api/pedido.js', 'PEDIDO_JS'), 'utf8'),
    'intake.js': fs.readFileSync(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'), 'utf8'),
  };
  for (const [nombre, texto] of Object.entries(fuentes)) {
    cierto(`${nombre} devuelve la ayuda`, /acceso:\s*ayudaDeAcceso\(/.test(texto));
    falso(`${nombre} no repite la condición de la etapa`,
      /etapa\s*===\s*['"]falta-acceso['"]|ETAPAS\.FALTA_ACCESO/.test(texto));
  }
}

console.log('\n=== 4 · EL PUNTAJE NO SE COMPARA CONTRA OTRA VARA ===\n');
{
  // Comparar el rápido de antes contra el profundo de después da una mejora inventada: el
  // número sube porque cambió la vara, no porque el sitio mejorara. Es la clase de afirmación
  // que el chequeo le marca en rojo a otros sitios, firmada por nosotros.
  const c = C.puntajeComparable({ rapido: { puntaje: 30 }, profundo: { puntaje: 41 } },
    { rapido: { puntaje: 88 }, profundo: { puntaje: 95 } });
  eq('compara la misma medición', c, { clave: 'profundo', antes: 41, despues: 95 });

  eq('solo rápido en los dos lados',
    C.puntajeComparable({ rapido: { puntaje: 30 } }, { rapido: { puntaje: 90 } }),
    { clave: 'rapido', antes: 30, despues: 90 });

  eq('rápido contra profundo: NO se compara',
    C.puntajeComparable({ rapido: { puntaje: 30 } }, { profundo: { puntaje: 95 } }), null);

  eq('sin informe final no hay comparación', C.puntajeComparable(INFORME_ANTES, null), null);

  // El chequeo deja el puntaje en null cuando confirmó menos de la mitad del peso. Un sitio
  // difícil de medir llega acá sin número por el camino honesto, y eso no es un error.
  eq('un puntaje nulo no se compara',
    C.puntajeComparable({ profundo: { puntaje: null } }, { profundo: { puntaje: 95 } }), null);
  eq('un puntaje que no es número tampoco',
    C.puntajeComparable({ profundo: { puntaje: '41' } }, { profundo: { puntaje: 95 } }), null);
}

console.log('\n=== 5 · EL CORREO DE CIERRE (promesa 3) ===\n');
{
  const pedido = {
    id: ID, dominio: 'ejemplo.cl', correo: 'cliente@ejemplo.cl', url_medida: 'https://ejemplo.cl/',
    senales_contratadas: ['cmp', 'carga'], senales_fuera: ['aviso'],
    informe_json: JSON.stringify(INFORME_ANTES),
  };
  const m = C.correoDeEntrega(pedido, { profundo: { puntaje: 95 } }, E.TITULOS);

  eq('va al correo del comprador', m.to, ['cliente@ejemplo.cl']);
  cierto('el asunto habla del sitio', m.subject.includes('ejemplo.cl'));
  cierto('las respuestas van a la casilla real', m.reply_to === C.RESPONDER_A);
  cierto('lleva el enlace del pedido', m.text.includes(C.enlaceDelPedido(ID)));

  // Las señales salen del CONTRATO CONGELADO, con su nombre, no con su id crudo.
  cierto('nombra lo cerrado con su título', m.text.includes(E.TITULOS.cmp));
  cierto('y lo que quedó fuera', m.text.includes(E.TITULOS.aviso));
  falso('no muestra ids crudos', /· cmp\b/.test(m.text));

  // El número, con su vara. «De 41 a 95» sin decir sobre qué es media afirmación.
  cierto('dice el antes', m.text.includes('41'));
  cierto('dice el después', m.text.includes('95'));
  cierto('y sobre qué página', m.text.includes('https://ejemplo.cl/'));

  // Las dos cosas que quedan del lado del cliente y que nadie puede hacer por él.
  cierto('manda el borrador al abogado', /revisar tu abogado|revisar\s+tu abogado/.test(m.text));
  cierto('dice que no damos asesoría legal', /no damos asesoría legal/.test(m.text));
  cierto('recuerda borrar el acceso', /borrar el acceso/.test(m.text));

  // ── LOS TRES CASOS SIN NÚMERO, QUE ANTES ERAN UNO SOLO ──────────────────────────────
  //
  // El texto viejo narraba los hechos de UNA situación y se mandaba en las tres. En la peor
  // —entregar sin `informe_final`, que el endpoint acepta y documenta— le decía al cliente
  // «Volvimos a correr el chequeo sobre la misma página» cuando la misma transacción acababa
  // de escribir `informe_final_json: null`, o sea el dato de que NO se rehizo nada. Una
  // afirmación falsa sobre trabajo ejecutado, en la última frase que lee quien pagó $177.310.
  //
  // Y esta prueba lo bendecía: comprobaba que el texto APARECIERA, no que fuera cierto.
  eq('sin informe final: no se rehizo',
    C.situacionDeLaMedicion(INFORME_ANTES, null).caso, 'sin-rehacer');
  eq('con informe sin nota: el chequeo declinó',
    C.situacionDeLaMedicion(INFORME_ANTES, { profundo: { puntaje: null } }).caso, 'declinado');
  eq('con nota de otra vara: no comparable',
    C.situacionDeLaMedicion({ rapido: { puntaje: 30 } }, { profundo: { puntaje: 95 } }).caso,
    'otra-vara');
  eq('con nota de la misma vara: comparable',
    C.situacionDeLaMedicion(INFORME_ANTES, { profundo: { puntaje: 95 } }).caso, 'comparable');

  const sinNumero = C.correoDeEntrega(pedido, null, E.TITULOS);
  falso('sin medición nueva, ningún puntaje de después', /ahora da \d/.test(sinNumero.text));
  // ⚠️ LA ASERCIÓN QUE FALTABA: no se puede afirmar un trabajo que no se hizo.
  falso('sin medición nueva, NO se afirma haber vuelto a correr el chequeo',
    /[Vv]olvimos a correr el chequeo/.test(sinNumero.text));
  cierto('se dice que no se alcanzó a rehacer',
    /no alcanzamos a volver a correr el chequeo/.test(sinNumero.text));
  cierto('y se da la salida', /respóndenos este correo y lo corremos/.test(sinNumero.text));
  // Y tampoco se le echa la culpa al instrumento por algo que no hizo.
  falso('sin medición nueva, no se culpa al chequeo',
    /confirmar más de la mitad/.test(sinNumero.text));

  const declinado = C.correoDeEntrega(pedido, { profundo: { puntaje: null } }, E.TITULOS);
  cierto('declinado: sí se rehizo y se dice', /[Vv]olvimos a correr el chequeo/.test(declinado.text));
  cierto('declinado: y acá SÍ corresponde explicar el instrumento',
    /no puso nota.*confirmar más de la mitad/s.test(declinado.text));

  const otraVara = C.correoDeEntrega(
    { ...pedido, informe_json: JSON.stringify({ rapido: { puntaje: 30 } }) },
    { profundo: { puntaje: 95 } }, E.TITULOS);
  cierto('otra vara: sí se rehizo y se dice', /[Vv]olvimos a correr el chequeo/.test(otraVara.text));
  cierto('otra vara: la razón es la escala, no el instrumento',
    /no están en la misma escala/.test(otraVara.text));
  falso('otra vara: no se culpa al chequeo', /confirmar más de la mitad/.test(otraVara.text));
  falso('otra vara: no se muestra el 95 como si fuera comparable', /ahora da 95/.test(otraVara.text));

  // Los tres textos viven juntos y ninguno se repite: si dos fueran iguales, volvería el
  // defecto con otra forma.
  eq('los tres textos son distintos', new Set(Object.values(C.SIN_NUMERO)).size, 3);

  // El HTML no puede quedar atrás del texto: hay clientes de correo que solo muestran uno.
  cierto('el HTML también lleva el enlace', m.html.includes(C.enlaceDelPedido(ID)));
  cierto('el HTML también manda al abogado', /tu abogado/.test(m.html));
  // El HTML sale del MISMO texto que la versión plana: si se separaran, uno de los dos se
  // quedaría atrás el día del cambio y la mitad de los clientes leería la versión vieja.
  cierto('el HTML sin número dice lo mismo que el texto',
    sinNumero.html.replace(/\s+/g, ' ').includes(C.SIN_NUMERO['sin-rehacer']));
  falso('y tampoco afirma el re-chequeo en el HTML',
    /[Vv]olvimos a correr el chequeo/.test(sinNumero.html));
  // Nada externo: ni imágenes, ni fuentes, ni scripts. En un producto sobre datos personales,
  // pedirle al navegador de alguien que llame a un tercero es lo que marcamos en rojo.
  falso('el HTML no carga nada de fuera', /<img|<script|@font-face|url\(http/i.test(m.html));
}

console.log('\n=== 6 · EL ENDPOINT DE ENTREGA: FALLA CERRADO ===\n');
{
  const { db } = await baseConPedido('pagado', { razon_social: 'Ejemplo SpA', plataforma: 'wordpress' });

  // Sin el secreto cargado NO se entrega nada. La alternativa —«sin clave, pasa»— deja un
  // endpoint que marca entregas y manda correos abierto a internet.
  const r1 = await EN.onRequestPost({ request: peticion({ id: ID }, 'x'), env: { VYC_PEDIDOS: db } });
  eq('sin CLAVE_ENTREGA: 409', r1.status, 409);
  eq('y lo dice', (await r1.json()).motivo, 'sin-clave');

  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' };

  const r2 = await EN.onRequestPost({ request: peticion({ id: ID }, 'd'.repeat(64)), env });
  eq('clave equivocada: 401', r2.status, 401);

  const r3 = await EN.onRequestPost({ request: peticion({ id: ID }), env });
  eq('sin cabecera: 401', r3.status, 401);

  // Un espacio pegado al final se ve CARGADO en el panel y no calza con nada. Mismo trato que
  // el token de Resend y el secreto de la firma.
  // ⚠️ Esta llamada SÍ entrega, y entregar manda el correo. Sin la red fingida la prueba
  // salía a api.resend.com de verdad: contestaba 401 y la aserción pasaba igual, así que el
  // verde tapaba una petición a un tercero desde una prueba.
  const red6 = conRed();
  // Base propia: si compartiera la de arriba, el resultado dependería de si una llamada
  // anterior de esta misma sección alcanzó a mover el pedido, y entonces la aserción mediría
  // el orden de la prueba en vez del recorte del secreto.
  const { db: db6 } = await baseConPedido('pagado');
  const r4 = await EN.onRequestPost({
    request: peticion({ id: ID }, 'c'.repeat(64)),
    env: { VYC_PEDIDOS: db6, CLAVE_ENTREGA: ' ' + 'c'.repeat(64) + '\n', RESEND_API_KEY: 'k' },
  });
  red6.soltar();
  cierto('un secreto con espacios igual funciona', r4.status === 200);
  // Sin el `|| {}`, una mutación que deje la lista vacía revienta acá con un TypeError y
  // aborta el archivo entero: las aserciones de más abajo, que son las que nombran el
  // problema, no llegan a correr.
  eq('y esa entrega no salió a la red de verdad', (red6.llamadas[0] || {}).host, 'api.resend.com');

  // Y la comparación no se corta en el primer byte distinto.
  falso('mismoSecreto: largo distinto', EN.mismoSecreto('abc', 'abcd'));
  falso('mismoSecreto: prefijo correcto no alcanza', EN.mismoSecreto('abc', 'abcdef'));
  falso('mismoSecreto: vacío contra vacío no pasa', EN.mismoSecreto('', ''));
  cierto('mismoSecreto: iguales', EN.mismoSecreto('abcdef', 'abcdef'));
}

console.log('\n=== 7 · EL ENDPOINT DE ENTREGA: LO QUE SÍ HACE (promesa 3) ===\n');
{
  const { db, sq } = await baseConPedido('pagado', { razon_social: 'Ejemplo SpA', plataforma: 'wordpress', acceso_recibido_en: '2026-10-30T10:00:00.000Z' });
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' };
  const red = conRed();

  const r = await EN.onRequestPost({
    request: peticion({ id: ID, informe_final: { profundo: { puntaje: 95 } } }, 'c'.repeat(64)),
    env,
  });
  const j = await r.json();
  red.soltar();

  eq('entrega: 200', r.status, 200);
  cierto('dice que entregó', j.entregado);
  eq('la etapa pasa a entregado', j.etapa.etapa, 'entregado');

  const fila = sq.prepare('SELECT estado, entregado_en, informe_final_json FROM pedidos WHERE id = ?').get(ID);
  eq('el estado quedó escrito', fila.estado, 'entregado');
  cierto('con su fecha', Boolean(fila.entregado_en));
  cierto('y el informe final guardado', String(fila.informe_final_json).includes('95'));

  // El correo SALE, y es la promesa que no existía.
  eq('se llamó a Resend una vez', red.llamadas.length, 1);
  eq('y es Resend', red.llamadas[0].host, 'api.resend.com');
  eq('al comprador', red.llamadas[0].cuerpo.to, ['cliente@ejemplo.cl']);
  cierto('con el antes y el después', /41/.test(red.llamadas[0].cuerpo.text)
    && /95/.test(red.llamadas[0].cuerpo.text));
  cierto('y la respuesta lo confirma', j.correo_enviado);

  // ⚠️ La etapa ya NO afirma que el correo llegó. Un correo puede no salir y el trabajo igual
  // está hecho: una pantalla que asegura un correo que no se mandó es la misma falta que esto
  // vino a arreglar, con otro texto.
  falso('la etapa no afirma que el correo llegó',
    /Te mandamos el antes y el después por correo\./.test(j.etapa.detalle));
  cierto('dice que se mandó y da la salida', /si no te llegó, escríbenos/i.test(j.etapa.detalle));
  cierto('y afirma el re-chequeo porque SÍ hubo informe final',
    /y volvimos a correr el chequeo/i.test(j.etapa.detalle));
  falso('sin el «todavía no»', /todavía no volvimos/i.test(j.etapa.detalle));
  // Un pedido terminado no promete un paso más: es la otra regla que ya estaba escrita.
  eq('y no promete un paso siguiente', j.etapa.loQueSigue, null);

  // ⚠️ LAS DOS OBLIGACIONES DEL CLIENTE VAN EN `recordatorios`, NO EN `queHacer`.
  //
  // `queHacer` es lo que la pantalla dibuja en la caja ámbar «TE TOCA A TI», que significa
  // «tu pedido está detenido esperándote». Un pedido entregado no está detenido, y una
  // prueba que ya existía lo decía desde antes: «una pantalla que siempre pide algo entrena
  // a la persona a ignorarla». Poner ahí las obligaciones gastaba esa alerta.
  //
  // Pero callarlas sería peor: una es borrar una cuenta de administrador NUESTRA que quedó
  // viva en su sitio, y la otra es no publicar como definitivo un borrador que no revisó
  // ningún abogado. Son dos conceptos distintos y por eso son dos campos distintos.
  eq('la caja ámbar no aparece en un pedido cerrado', j.etapa.queHacer, null);
  falso('y no se le echa la culpa', j.etapa.quienActua === 'cliente');
  cierto('pero los recordatorios están', Array.isArray(j.etapa.recordatorios));
  const rec = j.etapa.recordatorios || [];
  cierto('el abogado', rec.some((r) => /tu abogado/.test(r)));
  cierto('y borrar el acceso', rec.some((r) => /borrar el acceso/.test(r)));
  cierto('el pedido está terminado', j.etapa.terminado);

  // La misma FORMA en todas las etapas: la función declara que devuelve siempre lo mismo, y
  // un campo que existe en una sola rama obliga a la pantalla a preguntar si la llave está
  // en vez de si tiene contenido.
  const todas = [{ estado: 'creado' }, { estado: 'creado', flow_token: 't' },
    { estado: 'pendiente' }, { estado: 'pagado' }, { estado: 'pagado', razon_social: 'x' },
    { estado: 'pagado', razon_social: 'x', acceso_recibido_en: 'x' }, { estado: 'entregado' },
    { estado: 'rechazado' }, { estado: 'devuelto' }, { estado: 'contracargado' }]
    .map((x) => E.etapaDelPedido(x));
  eq('todas las etapas traen la llave',
    todas.filter((e) => !('recordatorios' in e)).map((e) => e.etapa), []);
  eq('y solo la entregada trae contenido',
    todas.filter((e) => e.recordatorios).map((e) => e.etapa), ['entregado']);
}

console.log('\n=== 8 · LA ENTREGA NO SE PUEDE FORZAR NI REPETIR ===\n');
{
  // Un pedido sin pagar no se entrega.
  {
    const { db } = await baseConPedido('creado');
    const red = conRed();
    const r = await EN.onRequestPost({
      request: peticion({ id: ID }, 'c'.repeat(64)),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' },
    });
    red.soltar();
    const j = await r.json();
    eq('un pedido en creado: 409', r.status, 409);
    // ⚠️ El CÓDIGO no alcanza: `marcarEstado` lleva el estado esperado en su WHERE, así que
    // sin la compuerta igual sale 409, pero con motivo `ya-se-movio` — un mensaje que le dice
    // a quien entrega que alguien se le adelantó cuando lo que pasa es que nadie pagó.
    eq('y con el motivo correcto', j.motivo, 'no-se-puede-entregar');
    eq('nombrando el estado real', j.estado, 'creado');
    eq('y no se mandó ningún correo', red.llamadas.length, 0);
  }

  // Un pedido devuelto tampoco: entregarle a alguien a quien se le devolvió la plata es
  // regalar el trabajo y además decirle que compró algo que ya no tiene.
  {
    const { db } = await baseConPedido('devuelto');
    const r = await EN.onRequestPost({
      request: peticion({ id: ID }, 'c'.repeat(64)),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64) },
    });
    eq('un pedido devuelto: 409', r.status, 409);
    eq('y por el motivo correcto', (await r.json()).motivo, 'no-se-puede-entregar');
  }

  // Entregar dos veces no revienta, pero NO manda el correo otra vez: el cliente ya lo
  // recibió, y repetirlo le haría creer que hubo un trabajo nuevo.
  {
    const { db } = await baseConPedido('pagado');
    const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' };
    const red = conRed();
    await EN.onRequestPost({ request: peticion({ id: ID }, 'c'.repeat(64)), env });
    const r2 = await EN.onRequestPost({ request: peticion({ id: ID }, 'c'.repeat(64)), env });
    const j2 = await r2.json();
    red.soltar();
    eq('la segunda vez: 200', r2.status, 200);
    cierto('dice que ya estaba', j2.ya_estaba);
    eq('y solo salió UN correo', red.llamadas.length, 1);
  }

  // Un id que no es nuestro no toca la base.
  {
    const { db } = await baseConPedido('pagado');
    const r = await EN.onRequestPost({
      request: peticion({ id: 'vyc_nope' }, 'c'.repeat(64)),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64) },
    });
    eq('id mal formado: 400', r.status, 400);
  }

  // Un GET no entrega nada.
  {
    const r = await EN.onRequest({
      request: new Request('https://verifica.spindlelab.cl/api/entregar'),
      env: { CLAVE_ENTREGA: 'c'.repeat(64) },
    });
    eq('GET: 405', r.status, 405);
  }
}

console.log('\n=== 9 · UN CORREO QUE NO SALE NO DESHACE LA ENTREGA, PERO SE DICE ===\n');
{
  const { db, sq } = await baseConPedido('pagado');
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' };
  const red = conRed(() => ({ ok: false, status: 500 }));

  const r = await EN.onRequestPost({ request: peticion({ id: ID }, 'c'.repeat(64)), env });
  const j = await r.json();
  red.soltar();

  eq('la entrega vale igual', r.status, 200);
  eq('y el estado quedó escrito',
    sq.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'entregado');
  falso('pero la respuesta NO dice que el correo salió', j.correo_enviado);
}

console.log('\n=== 9 bis · LA RED QUE REVIENTA, Y LA ENTREGA SIN MEDICIÓN ===\n');
{
  // El modo de falla real de Resend no es un http-500: es la EXCEPCIÓN. El corte de tiempo de
  // los 8 segundos, un DNS caído, la conexión cortada. Ese camino —el catch de
  // `enviarCorreoDeEntrega`— no lo corría ninguna aserción, y `entregar.js` hace `await` sobre
  // esa llamada DESPUÉS de haber escrito el estado: si se propagara, la entrega quedaría
  // escrita y la respuesta sería un error.
  const { db, sq } = await baseConPedido('pagado');
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' };
  const red = conRed(() => ({ lanza: true }));
  // Se atrapa la excepción ACÁ para poder acusarla. Sin esto, una excepción que escapara del
  // endpoint abortaría el archivo y las aserciones de abajo —las que nombran el problema— no
  // correrían nunca: el síntoma sería «la prueba reventó», no «el endpoint deja escapar una
  // excepción después de haber escrito el estado».
  let r = null, escapo = null;
  try { r = await EN.onRequestPost({ request: peticion({ id: ID }, 'c'.repeat(64)), env }); }
  catch (e) { escapo = (e && e.message) || String(e); }
  const j = r ? await r.json() : {};
  red.soltar();

  eq('ninguna excepción se escapa del endpoint', escapo, null);
  eq('la red que revienta no rompe la entrega', r && r.status, 200);
  cierto('la entrega vale', j.entregado);
  falso('y la respuesta no miente sobre el correo', j.correo_enviado);
  eq('el estado quedó escrito igual',
    (sq.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID) || {}).estado, 'entregado');

  // Y la pantalla NO puede afirmar un re-chequeo que no pasó. Acá se entregó sin
  // `informe_final`, o sea `informe_final_json: null`, que es el dato de que no se rehizo.
  // La subcadena NO distingue la afirmación de su negación: «Todavía no volvimos a correr el
  // chequeo» contiene «volvimos a correr el chequeo», así que una aserción ingenua se pone
  // roja sobre el texto correcto. (Me pasó acá mismo.) Se ancla a la conjunción, que es lo
  // único que separa las dos frases.
  //
  // Y `|| ''`: si la llamada de arriba falla, `j` viene vacío y leer `.detalle` revienta el
  // archivo entero, así que las tres aserciones de arriba acusan y estas tres no llegan a
  // correr. Es la quinta vez hoy con la misma forma. La regla, sin excepciones: dentro de un
  // bloque de aserciones, ningún campo de una respuesta se lee sin red.
  const det = (j.etapa || {}).detalle || '';
  falso('sin informe final, la etapa no afirma el re-chequeo', /y volvimos a correr el chequeo/i.test(det));
  cierto('y lo dice', /todavía no volvimos a correr el chequeo/i.test(det));
  cierto('con la salida', /escríbenos con este enlace y lo corremos/i.test(det));
}

console.log('\n=== 9 ter · EL INFORME FINAL EN TEXTO NO SE PIERDE ===\n');
{
  // Mandarlo como el texto JSON es la forma natural desde un script que acaba de leer la
  // salida del chequeo de un archivo, y antes se descartaba EN SILENCIO: 200, y la medición
  // que alguien sí corrió se perdía. `correoDeEntrega` ya toleraba las dos formas para el
  // informe congelado, así que era una incoherencia, no un criterio.
  eq('objeto', EN.interpretarInforme({ profundo: { puntaje: 95 } }), { profundo: { puntaje: 95 } });
  eq('texto JSON', EN.interpretarInforme('{"profundo":{"puntaje":95}}'), { profundo: { puntaje: 95 } });
  eq('un array no es un informe', EN.interpretarInforme([1, 2]), null);
  eq('un texto roto tampoco', EN.interpretarInforme('{nope'), null);
  eq('ni un número', EN.interpretarInforme(7), null);
  eq('ni la ausencia', EN.interpretarInforme(undefined), null);

  const { db, sq } = await baseConPedido('pagado');
  const env = { VYC_PEDIDOS: db, CLAVE_ENTREGA: 'c'.repeat(64), RESEND_API_KEY: 'k' };
  const red = conRed();
  const r = await EN.onRequestPost({
    request: peticion({ id: ID, informe_final: '{"profundo":{"puntaje":95}}' }, 'c'.repeat(64)),
    env,
  });
  const j = await r.json();
  red.soltar();

  cierto('el endpoint lo reconoce', j.hubo_informe_final);
  cierto('lo guarda',
    String(sq.prepare('SELECT informe_final_json FROM pedidos WHERE id = ?').get(ID).informe_final_json).includes('95'));
  cierto('y el correo sale con el antes y el después',
    /41/.test(red.llamadas[0].cuerpo.text) && /95/.test(red.llamadas[0].cuerpo.text));
}

console.log('\n=== 10 · LA PANTALLA: LA AYUDA Y EL FIN DEL REFRESCO (promesas 1, 2 y 4) ===\n');
{
  // La ayuda se dibuja con lo que manda el servidor, y antes del botón que declara el acceso.
  cierto('la pantalla dibuja la ayuda', /function bloqueDeAcceso\(/.test(HTML));
  cierto('la pinta en la etapa del acceso', /bloqueDeAcceso\(data\.acceso\)/.test(HTML));
  const iAyuda = HTML.indexOf('bloqueDeAcceso(data.acceso)');
  const iBoton = HTML.indexOf('data-boton-acceso></p>');
  cierto('y va ANTES del botón de declarar', iAyuda > 0 && iBoton > iAyuda);

  cierto('muestra el texto para reenviar', /data-texto-reenviar/.test(HTML));
  cierto('con un botón de copiar', /data-copiar/.test(HTML));
  // El botón se engancha en los TRES caminos que repintan: la carga, el envío de datos y la
  // declaración del acceso. `dibujar` reemplaza todo el HTML, así que uno que falte deja un
  // botón muerto justo en ese camino. Es el mismo error que tuvo `montarBotonAcceso`, que
  // solo se enganchaba después de enviar el formulario.
  // ⚠️ CONTAR LLAMADAS NO VE EL ÁMBITO, Y ESTA ASERCIÓN ERA UN CONTEO.
  //
  // Una revisión adversaria encontró dos mutaciones que la dejaban en verde: mover la llamada
  // del camino de la carga inicial a un duplicado en el del formulario mantiene el conteo en
  // 3 y deja el botón «Copiar el texto» muerto para todo el que simplemente abre el enlace de
  // su pedido, que es el camino normal. El total cuadra y el producto está roto.
  //
  // Son tres caminos DISTINTOS porque `dibujar` reemplaza todo el HTML: cada repintado tiene
  // que volver a enganchar. Se comprueba uno por uno, anclado a su contexto.
  //
  // (El comportamiento real está verificado aparte, en el navegador: con el servidor local
  // corriendo, abrir el enlace del pedido y apretar el botón selecciona el texto. Un grep ve
  // el nombre, no la ejecución; esto es el guardia de regresión, no la prueba.)
  const CAMINOS = [
    ['la carga inicial del enlace',
      /fetch\('\/api\/pedido\?id=[\s\S]{0,2600}?montarCopiar\(\);/],
    ['el envío de los datos de empresa',
      /f\.addEventListener\('submit'[\s\S]{0,2600}?montarCopiar\(\);/],
    ['la declaración del acceso',
      /b\.addEventListener\('click'[\s\S]{0,1600}?montarCopiar\(\);/],
  ];
  for (const [nombre, patron] of CAMINOS) {
    cierto(`montarCopiar engancha en ${nombre}`, patron.test(HTML));
  }
  // Y sigue siendo exactamente una por camino: dos enganches al mismo botón lo disparan dos
  // veces.
  eq('ni una llamada de más', (HTML.match(/montarCopiar\(\);/g) || []).length, CAMINOS.length);
  // Si el portapapeles no está disponible no se finge: se selecciona y se dice qué apretar.
  cierto('tiene salida sin portapapeles', /Ctrl\+C/.test(HTML));
  cierto('y avisa que el texto no lleva el enlace del pedido',
    /no lleva el enlace de tu pedido/.test(HTML));

  cierto('la pantalla dibuja los recordatorios', /e\.recordatorios && e\.recordatorios\.length/.test(HTML));
  cierto('en su propio recuadro', /class="recordatorios"/.test(HTML));
  // Sin el número en el rótulo: sería el largo de la lista escrito a mano en otro archivo.
  falso('y sin el número escrito a mano', /Dos cosas que quedan de tu lado/.test(HTML));

  // Promesa 4: el tope del refresco tiene nombre y el aviso existe.
  cierto('el tope tiene nombre', /var TOPE_REINTENTOS = 24;/.test(HTML));
  falso('y no queda un 24 suelto en el if', /reintentos < 24/.test(HTML));
  cierto('existe el aviso', /function dejamosDeRefrescar\(/.test(HTML));
  // ⚠️ Esta aserción exigía `dejamosDeRefrescar()` con los paréntesis VACÍOS, y eso la volvió
  // una aserción copiada del código en vez de una regla: cuando la función pasó a recibir la
  // etapa, cayó sola aunque el comportamiento había mejorado. Lo que importa es que se la
  // llame al agotar el tope, con lo que sea que necesite.
  cierto('se llama al agotar el tope',
    /reintentos < TOPE_REINTENTOS[\s\S]{0,1200}dejamosDeRefrescar\(/.test(HTML));
  cierto('y da un botón para revisar a mano', /Revisar de nuevo/.test(HTML));
  cierto('que reinicia el contador', /reintentos = 0;[\s\S]{0,300}pedir\(\)/.test(HTML));
}

console.log('\n=== 10 bis · EL AVISO DE «DEJAMOS DE REVISAR», EN UN NAVEGADOR ===\n');
{
  /* ── POR QUÉ ACÁ NO ALCANZA EL GREP ──────────────────────────────────────────────────────
   *
   * Lo de arriba son regex sobre el archivo, y un grep ve el nombre y no el ámbito. El riesgo
   * real de este cambio es exactamente de ámbito: el aviso elige su texto según
   * `res.j.etapa.etapa`, y si la respuesta del servidor tuviera otra forma —la etapa como
   * cadena en vez de objeto— esa lectura daría `undefined`, la rama de la espera larga no
   * correría NUNCA, y el archivo seguiría teniendo todas las palabras en su sitio.
   *
   * Así que el juez es el navegador, con la respuesta que de verdad arma el servidor.
   *
   * ⚠️ EL TOPE SE PARCHA A 0 EN LA COPIA SERVIDA, no en el repo. Con los 24 de producción esta
   * sección tardaría dos minutos. Lo que se parcha es el reloj, no la lógica que se mide.
   */
  const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const http = await import('node:http');
  const os = await import('node:os');
  const path = await import('node:path');
  const { spawn } = await import('node:child_process');

  const CONDUCTOR = `<script>
(function () {
  var intentos = 0;
  var esperar = setInterval(function () {
    var caja = document.querySelector('.sin-refresco');
    if (!caja) { if (++intentos > 100) { clearInterval(esperar); volcar({ fatal: 'nunca apareció el aviso' }); } return; }
    clearInterval(esperar);
    volcar({ texto: caja.innerText, hayBoton: Boolean(caja.querySelector('button')) });
  }, 50);
  function volcar(x) {
    var d = document.createElement('div');
    d.id = 'resultado';
    d.textContent = 'RESULTADO:' + btoa(unescape(encodeURIComponent(JSON.stringify(x))));
    document.body.appendChild(d);
  }
})();
<\/script>`;

  async function avisoEnPantalla(estadoDelPedido) {
    const { db } = await baseConPedido('creado');
    /* ⚠️ EL `mp_order_id` NO ES DECORADO. `convieneRefrescar` se niega a refrescar un pedido en
       `creado` sin él, y con razón: sin orden en la pasarela no hay ningún aviso en camino, así
       que refrescar sería esperar para siempre algo que nadie va a mandar. Sin esta línea la
       sección entera se quedaba sin aviso que mirar, y la culpa era del fixture. */
    await A.marcarEstado(db, ID, 'creado', 'creado', { mp_order_id: 'ORD-DE-PRUEBA' });
    if (estadoDelPedido !== 'creado') {
      await A.marcarEstado(db, ID, 'creado', estadoDelPedido, {});
    }
    const crudo = await A.leerPedido(db, ID);
    const cuerpo = {
      ok: true, pedido: A.vistaPublica(crudo), etapa: E.etapaDelPedido(crudo),
      señales: E.señalesDelPedido(crudo, E.TITULOS), acceso: null,
      // Lo que de verdad decide el servidor para este estado. Si acá se escribiera `true` a
      // mano, la prueba estaría afirmando algo que el servidor no dice.
      refrescar: E.convieneRefrescar(crudo),
    };
    if (!cuerpo.refrescar) return { fatal: `el servidor no refresca en "${estadoDelPedido}"` };
    const pagina = fs.readFileSync(
      rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8')
      .replace('var TOPE_REINTENTOS = 24;', 'var TOPE_REINTENTOS = 0;');
    const s = http.createServer((req, res) => {
      const u = new URL(req.url, 'http://127.0.0.1');
      if (u.pathname === '/api/pedido') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(cuerpo));
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(pagina.replace('</body>', CONDUCTOR + '</body>'));
    });
    await new Promise((r) => s.listen(0, '127.0.0.1', r));
    const puerto = s.address().port;
    const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'vyc-chrome-'));
    try {
      const dom = await new Promise((listo) => {
        const ch = spawn(CHROME, [
          '--headless', '--disable-gpu', '--no-sandbox', '--no-first-run',
          '--disable-extensions', '--user-data-dir=' + perfil,
          '--virtual-time-budget=20000', '--dump-dom',
          `http://127.0.0.1:${puerto}/pedido/?id=${ID}`,
        ], { stdio: ['ignore', 'pipe', 'ignore'], detached: true });
        let salida = '', cerrado = false, muerte = null;
        const matar = () => { try { process.kill(-ch.pid, 'SIGKILL'); } catch { try { ch.kill('SIGKILL'); } catch { /* ya murió */ } } };
        const fin = () => { if (cerrado) return; cerrado = true; clearTimeout(muerte); matar(); listo(salida); };
        muerte = setTimeout(fin, 60000);
        ch.stdout.on('data', (d) => { salida += d; if (salida.includes('</html>')) fin(); });
        ch.on('close', fin);
        ch.on('error', fin);
      });
      const m = /RESULTADO:([A-Za-z0-9+/=]+)/.exec(dom);
      if (!m) return { fatal: 'la página no llegó a reportar' };
      return JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));
    } finally {
      s.close();
      fs.rmSync(perfil, { recursive: true, force: true });
    }
  }

  if (!fs.existsSync(CHROME)) {
    malo++;
    console.log(`  FALLA no está Chrome en ${CHROME}: esta sección no se puede saltar en silencio`);
  } else {
    // ── «confirmando»: el aviso del medio de pago tarda segundos, dos minutos sí es raro ──
    const conf = await avisoEnPantalla('creado');
    falso('en «confirmando» el aviso aparece', conf.fatal);
    cierto('con su botón', conf.hayBoton);
    cierto('y dice que el pago todavía no se confirma',
      /todav[ií]a no se confirma/i.test(String(conf.texto || '')));

    /* ── «pago pendiente»: una transferencia puede tardar hasta el día hábil siguiente ─────
     *
     * Acá estaba el defecto. Es el momento exacto en que alguien que YA transfirió su plata
     * lee la pantalla, y el texto que leía describía el funcionamiento normal como si algo
     * hubiera salido mal. */
    const pend = await avisoEnPantalla('pendiente');
    falso('en «pago pendiente» el aviso aparece', pend.fatal);
    const tp = String(pend.texto || '');
    cierto('y dice que la demora es lo normal con ese medio de pago', /es lo normal/i.test(tp));
    cierto('nombrando cuánto puede tardar', /horas|d[ií]a h[áa]bil/i.test(tp));
    cierto('y que no hace falta esperar ahí', /no hace falta que te quedes/i.test(tp));
    cierto('que seguimos nosotros', /seguimos nosotros|te escribimos/i.test(tp));
    // ═══ LA ASERCIÓN QUE MIDE LA DIFERENCIA, NO LA PRESENCIA ═══
    // Sin ella, las dos etapas podrían compartir el texto de siempre y todo lo de arriba
    // pasaría igual: «dice que es lo normal» no prueba que la OTRA no lo diga también.
    falso('y NO le dice que el pago todavía no se confirma', /todav[ií]a no se confirma/i.test(tp));
    cierto('los dos textos son distintos', String(conf.texto || '') !== tp);
  }
}

console.log('\n=== 11 · EL FORMULARIO SIGUE DEVOLVIENDO LA AYUDA AL REPINTAR ===\n');
{
  // Es el momento exacto en que la persona pasa a la etapa del acceso: acaba de enviar sus
  // datos de empresa y la pantalla se repinta con ESTA respuesta. Si acá faltara la ayuda, la
  // vería al cargar el enlace y la perdería justo cuando la necesita.
  const { db } = await baseConPedido('pagado');
  const red = conRed();
  const r = await I.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/intake', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ID, razon_social: 'Ejemplo SpA', rut: '76.086.428-5',
        giro: 'Servicios', direccion: 'Calle 1', plataforma: 'wordpress' }),
    }),
    env: { VYC_PEDIDOS: db },
  });
  const j = await r.json();
  red.soltar();

  eq('el formulario guarda', r.status, 200);
  eq('y la etapa pasa al acceso', j.etapa.etapa, 'falta-acceso');
  cierto('la respuesta trae la ayuda', Boolean(j.acceso));
  // Mismo cuidado: si `acceso` viene vacío, leer `.nombre` revienta y las cuatro aserciones
  // siguientes no corren. Una prueba que aborta acusa una vez y se calla.
  const a11 = j.acceso || {};
  eq('de la plataforma que declaró', a11.nombre, 'WordPress');
  cierto('con sus pasos', Array.isArray(a11.pasos) && a11.pasos.length >= 3);
  cierto('y el texto para reenviar', String(a11.textoParaReenviar || '').includes('ejemplo.cl'));
  falso('que no lleva el id', String(a11.textoParaReenviar || '').includes(ID));
}

console.log('\n=== 8 bis · EL BORRADOR DE UN PEDIDO ENTREGADO SE PUEDE CORREGIR ===\n');
{
  /* ── POR QUÉ ESTA SECCIÓN ────────────────────────────────────────────────────────────────
   *
   * Hallazgo del ensayo real del 4-nov-2026: el primer borrador salió en Markdown y el canal
   * es texto plano. Se reescribió, y entonces se descubrió que no había por dónde meterlo: la
   * rama de `entregado` cortaba en seco y la copia del cliente quedaba congelada con el error.
   * Una errata, un RUT mal copiado o el texto que devuelve su abogado tienen que poder entrar.
   *
   * Lo que se prueba acá no es solo que la corrección funcione, sino sus dos bordes, que son
   * donde esto se vuelve peligroso: que REPETIR el cierre no pise el borrador bueno, y que
   * corregir NO mande otro correo.
   */
  const CLAVE = 'c'.repeat(64);
  const CORREGIDO = BORRADOR.replace('Calle 1', 'Avenida Siempre Viva 742');
  const OTRO_LARGO = BORRADOR.replace('EJEMPLO SPA', 'OTRA EMPRESA QUE NO ES') + '\nTexto que nadie pidió guardar.';

  /** Un pedido ya entregado, con su borrador puesto. */
  async function yaEntregado() {
    const { db } = await baseConPedido('pagado', { razon_social: 'Ejemplo SpA', rut: '76.086.428-5' });
    const red = conRed();
    const r = await EN.onRequestPost({
      request: peticion({ id: ID }, CLAVE),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
    });
    red.soltar();
    if (r.status !== 200) throw new Error('la base de esta sección no quedó entregada: ' + r.status);
    return { db, correosDelCierre: red.llamadas.length };
  }

  // ── El caso que faltaba: entra el texto nuevo ──────────────────────────────────────────
  {
    const { db } = await yaEntregado();
    const red = conRed();
    const r = await EN.onRequestPost({
      request: peticion({ id: ID, corregir_borrador: true, borrador_politica: CORREGIDO }, CLAVE),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
    });
    red.soltar();
    const j = await r.json();
    eq('corregir un pedido entregado: 200', r.status, 200);
    eq('y dice cuánto quedó escrito', j.borrador_corregido, CORREGIDO.length);
    const puesto = await A.leerPedido(db, ID);
    eq('el borrador de la base es el nuevo', puesto.borrador_politica, CORREGIDO);
    eq('y el pedido sigue entregado', puesto.estado, 'entregado');
    // ⚠️ ESTA ES LA ASERCIÓN QUE PROTEGE AL CLIENTE. Ya recibió su correo de cierre; otro le
    // haría creer que hubo trabajo nuevo. Que lo corregimos se lo dice una persona.
    eq('y NO se le manda otro correo', red.llamadas.length, 0);
    eq('la respuesta lo declara', j.correo_enviado, false);
  }

  // ── El borde peligroso: repetir el cierre no pisa el borrador bueno ────────────────────
  {
    const { db } = await yaEntregado();
    const red = conRed();
    const r = await EN.onRequestPost({
      /* Sin la bandera, y con OTRO texto en el cuerpo: es el caso normal de llamar dos veces.
         ⚠️ El texto es LARGO a propósito. Con uno corto, quitar la bandera del código igual
         daba 400 —lo frenaba la vara del largo— y la mutación se delataba por un camino que
         no es el que esta prueba dice vigilar. Con un texto que pasa todas las puertas, lo
         único que puede frenar la sobrescritura es la bandera, que es lo que se mide. */
      request: peticion({ id: ID, borrador_politica: OTRO_LARGO }, CLAVE),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
    });
    red.soltar();
    const j = await r.json();
    eq('repetir el cierre: 200 y ya_estaba', r.status, 200);
    cierto('lo dice', j.ya_estaba);
    const puesto = await A.leerPedido(db, ID);
    // Corregir se PIDE; repetir no corrige. Sin la bandera, un reintento del cierre pisaría
    // el borrador bueno con lo que trajera el cuerpo, sin que nadie lo hubiera pedido.
    eq('y el borrador NO se tocó', puesto.borrador_politica, BORRADOR);
    falso('ni se declaró una corrección', 'borrador_corregido' in j);
  }

  // ── Pedir corregir sin texto no borra lo que había ─────────────────────────────────────
  {
    const { db } = await yaEntregado();
    /* ⚠️ ENVUELTO A PROPÓSITO. Sin el try, quitar del código el rechazo por falta de texto no
       hace caer estas aserciones: hace REVENTAR el archivo entero —`largoFueraDeRango(null)`
       lanza un TypeError— y una prueba que revienta no acusa, porque las aserciones que
       nombran el problema nunca llegan a correr. Acá la excepción se convierte en una falla
       con nombre, que es lo que un informe tiene que poder leer. */
    let r = null, j = {}, reventó = null;
    try {
      r = await EN.onRequestPost({
        request: peticion({ id: ID, corregir_borrador: true, borrador_politica: null }, CLAVE),
        env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE },
      });
      j = await r.json();
    } catch (e) { reventó = String((e && e.message) || e); }
    eq('corregir sin texto no revienta', reventó, null);
    eq('corregir sin texto: 400', r ? r.status : 0, 400);
    eq('por el motivo correcto', j.motivo, 'falta-borrador');
    eq('y lo de antes sigue en pie', (await A.leerPedido(db, ID)).borrador_politica, BORRADOR);
  }

  // ── La misma vara de largo que el cierre, y desde un solo lugar ────────────────────────
  {
    const { db } = await yaEntregado();
    const r = await EN.onRequestPost({
      request: peticion({ id: ID, corregir_borrador: true, borrador_politica: 'muy corto' }, CLAVE),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE },
    });
    eq('un borrador demasiado corto: 400', r.status, 400);
    // ⚠️ Mide la REGLA COMPARTIDA, no una copia de ella: `largoFueraDeRango` es la misma
    // función que usa el cierre. Si alguien relaja una de las dos puertas, esta cae.
    cierto('con el motivo del largo', /largo|corto/i.test((await r.json()).motivo || ''));
    eq('y sin tocar el borrador bueno', (await A.leerPedido(db, ID)).borrador_politica, BORRADOR);
  }

  // ── Corregir no es una puerta sin llave ────────────────────────────────────────────────
  {
    const { db } = await yaEntregado();
    const r = await EN.onRequestPost({
      request: peticion({ id: ID, corregir_borrador: true, borrador_politica: CORREGIDO }, 'x'.repeat(64)),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE },
    });
    cierto('con la clave equivocada no entra', r.status === 401 || r.status === 403);
    eq('y el borrador no cambió', (await A.leerPedido(db, ID)).borrador_politica, BORRADOR);
  }

  // ── Y en un pedido que todavía no está entregado, la bandera no inventa un camino ──────
  {
    const { db } = await baseConPedido('pagado');
    // ⚠️ La red fingida ANTES de la llamada. Al revés, este bloque sale a la red de verdad
    // —se vio: Resend contestó http-401 a la clave de juguete— y una prueba que llama a un
    // tercero depende de que ese tercero esté arriba.
    const red = conRed();
    const r = await EN.onRequestPost({
      // Un pedido pagado con la bandera puesta tiene que seguir el camino del CIERRE, no el
      // de la corrección: si no, se marcaría «entregado» sin mandarle el correo a nadie.
      request: peticion({ id: ID, corregir_borrador: true }, CLAVE),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
    });
    red.soltar();
    const j = await r.json();
    eq('un pedido pagado se cierra igual', r.status, 200);
    eq('y a ese sí se le manda el correo de cierre', red.llamadas.length, 1);
    falso('y no se declara una corrección', 'borrador_corregido' in j);
    eq('queda entregado', (await A.leerPedido(db, ID)).estado, 'entregado');
  }

  // ── La función del almacén, por su cuenta: no toca lo que no está entregado ────────────
  {
    const { db } = await baseConPedido('pagado');
    const r = await A.corregirBorrador(db, ID, CORREGIDO);
    falso('corregirBorrador se niega sobre un pedido pagado', r.corregido);
    eq('y dice por qué', r.motivo, 'no-esta-entregado');
    eq('sin escribir nada', (await A.leerPedido(db, ID)).borrador_politica, null);
  }
}

console.log(`\n${malo ? 'HAY FALLAS' : 'TODO EN VERDE'} — ${ok} aserciones, ${malo} fallas\n`);
process.exit(malo ? 1 : 0);
