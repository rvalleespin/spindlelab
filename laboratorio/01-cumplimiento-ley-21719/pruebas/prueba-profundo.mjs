/**
 * Pruebas del chequeo profundo (functions/api/profundo.js).
 *
 * El binding de Browser Rendering no se puede probar desde local, así que toda la lógica
 * que decide QUÉ se muestra está escrita como funciones puras y se prueba acá con
 * peticiones y cookies REALES de sitios medidos con Chrome por CDP el 23 y el 25-sep.
 * Nada de esto está inventado: cada número de abajo salió de una medición guardada.
 *
 *   node prueba-profundo.mjs
 *
 * Lo que estas pruebas cuidan, en orden de importancia:
 *
 *   1. Que los TRES VERBOS no se colapsen nunca. Cargar, dejar una cookie y enviar datos
 *      son tres cosas distintas. Los dos casos canónicos están acá con datos reales:
 *      awasi + Meta (carga y deja cookie SIN enviar) y hotelescumbres + GA (carga y envía
 *      SIN escribir ninguna cookie). Un cambio que los junte hace fallar estas pruebas.
 *
 *   2. Que un "no lo sabemos" no sume ni reste, y que nunca salga verde algo no
 *      confirmado.
 *
 *   3. Que ninguna falla nuestra se presente como buena noticia sobre el sitio.
 */

import fs from 'node:fs';
import path from 'node:path';
import { rutaEnElRepo, bancoDeMediciones } from './rutas.mjs';

// Las dos rutas se buscan DENTRO del repositorio (ver `rutas.mjs`), no en una carpeta de
// /tmp ni en el scratchpad de una sesión: las dos anteriores eran efímeras, una ya se había
// roto, y este archivo estuvo a un reinicio de no correr en ninguna parte. Se pueden forzar
// con PROFUNDO_JS (o VYC_SITIO) y PROFUNDO_DATOS, y las dos se imprimen al arrancar: una
// prueba que no dice qué cargó no deja ver que cargó la copia equivocada.
const RUTA_MODULO = rutaEnElRepo('verificaycumple/functions/api/profundo.js', 'PROFUNDO_JS');
const DATOS = bancoDeMediciones();

const m = await import(RUTA_MODULO);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, r) => eq(n, !!r, true);
const falso = (n, r) => eq(n, !!r, false);

/* ------------------------------------------------------------------ *
 * Adaptadores: los tres grupos de medición del 23-sep guardaron con   *
 * formatos distintos. Acá se normalizan a lo que produce el guion de  *
 * dos tramos, sin tocar un solo dato.                                 *
 * ------------------------------------------------------------------ */

const leer = (rel) => JSON.parse(fs.readFileSync(path.join(DATOS, rel), 'utf8'));
const hay = (rel) => fs.existsSync(path.join(DATOS, rel));

// ev0 y ev2/net-*: una sola instantánea, con marca de tiempo absoluta en segundos.
function unaInstantanea(rel) {
  const j = leer(rel);
  const base = j.requests?.[0]?.t ?? j.requests?.[0]?.ts ?? null;
  const peticiones = (j.requests || []).map((r) => ({
    url: r.url,
    metodo: r.method || 'GET',
    tipo: r.type || '',
    ms: base !== null && (r.t ?? r.ts) !== undefined ? Math.round(((r.t ?? r.ts) - base) * 1000) : null,
    conCuerpo: (r.method || 'GET') !== 'GET',
  }));
  const cookies = j.cookies || [];
  const tras = { ms: 18000, peticiones, cookies };
  return {
    urlFinal: j.urlFinal || j.finalUrl || null,
    titulo: j.titulo || j.title || '',
    letras: (j.bodyText || '').length || null,
    msTotal: 18000,
    parcial: false,
    tras1: tras,
    tras2: tras,
    aviso: null,
  };
}

// ev2/net2-*: cada petición trae su fase (A = pasivo, B = después del gesto) y hay dos
// juegos de cookies. Es exactamente la forma del guion de dos tramos.
function dosTramos(rel) {
  const j = leer(rel);
  const conv = (r) => ({ url: r.url, metodo: r.method || 'GET', tipo: r.type || '', ms: null,
    conCuerpo: (r.method || 'GET') !== 'GET' });
  const a = (j.requests || []).filter((r) => r.phase === 'A').map(conv);
  const b = (j.requests || []).map(conv);
  return {
    urlFinal: j.info?.finalUrl || null,
    titulo: j.info?.title || '',
    letras: null,
    msTotal: 18000,
    parcial: false,
    tras1: { ms: 11000, peticiones: a, cookies: j.cookiesA || [] },
    tras2: { ms: 18000, peticiones: b, cookies: j.cookiesB || [] },
    aviso: null,
  };
}

// ev1 guardó las peticiones en .txt y las cookies en .json, en DOS formas distintas:
//
//   (a) "Tipo<TAB>URL" por línea          (lastorres, opticasclvision, sgfertility)
//   (b) una URL pelada por línea, con los tramos separados por un encabezado
//       ("ANTES DEL GESTO" / "DESPUES DEL GESTO")   (patagoniacamp-interaccion)
//
// Esta función solo entendía la (a): partía por TAB, y en la (b) se quedaba con la línea
// entera como "tipo" y con la URL en undefined, así que el .filter de abajo la borraba y
// devolvía CERO peticiones. El banco del §20 le pasaba justo ese archivo a patagoniacamp,
// o sea que medía la nada, y como las aserciones del §20 son estructurales, pasaba en
// silencio. Ahora entiende las dos y separa los tramos cuando el archivo los trae.
function desdeTxt(relTxt, relJson) {
  const lineas = fs.readFileSync(path.join(DATOS, relTxt), 'utf8')
    .split('\n').map((l) => l.trim()).filter(Boolean);
  const antes = [], todas = [];
  let trasElGesto = false;
  for (const l of lineas) {
    if (/^ANTES DEL GESTO$/i.test(l)) { trasElGesto = false; continue; }
    if (/^DESPU[EÉ]S DEL GESTO$/i.test(l)) { trasElGesto = true; continue; }
    const tab = l.indexOf('\t');
    const tipo = tab === -1 ? '' : l.slice(0, tab).trim();
    const url = (tab === -1 ? l : l.slice(tab + 1)).trim();
    // Cualquier otra cosa que no sea una dirección es encabezado o ruido, y no se cuenta.
    if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) continue;
    const p = { url, metodo: 'GET', tipo, ms: null, conCuerpo: false };
    if (!trasElGesto) antes.push(p);
    todas.push(p);
  }
  const j = relJson && hay(relJson) ? leer(relJson) : {};
  // `bodyTextHead` viene cortado en 1500. Si llegó más corto, es el texto entero y sirve de
  // `letras`; si llegó justo en el tope, es un pedazo, y decir que el sitio tiene 1500 letras
  // sería inventarse un número. En ese caso va null, que es "no lo sabemos".
  const cabeza = j.bodyTextHead || '';
  const letras = cabeza.length && cabeza.length < 1500 ? cabeza.length : null;
  const cookies = j.cookies || [];
  return {
    urlFinal: j.urlFinal || null,
    titulo: j.title || '',
    texto: cabeza.slice(0, 600),
    letras,
    msTotal: 18000,
    parcial: false,
    // Sin tramos en el archivo, los dos son el mismo, que es lo que había antes.
    tras1: { ms: 11000, peticiones: antes, cookies: trasElGesto ? [] : cookies },
    tras2: { ms: 18000, peticiones: todas, cookies },
    aviso: null,
  };
}

const buscar = (h, clave) => h.find((x) => x.clave === clave) || null;

/* ------------------------------------------------------------------ *
 * Un navegador de mentira que habla CDP.                              *
 *                                                                     *
 * El binding de Browser Rendering no se puede abrir desde local, así   *
 * que para probar la vuelta ENTERA de `profundo()` (caché, topes,      *
 * medición, guardado) hace falta algo que conteste los diez métodos    *
 * que `medirConNavegador` usa. Es eso y nada más: no simula una        *
 * página, solo devuelve lo que un Chrome devolvería.                   *
 *                                                                     *
 * Las peticiones llegan por donde llegan de verdad, que es el oyente   *
 * de eventos, no por un valor de retorno. Si mañana `medirConNavegador`*
 * deja de escuchar `Network.requestWillBeSent`, esto se entera.        *
 * ------------------------------------------------------------------ */
//
// `avisoRevienta` reproduce lo que hace una pared con desafío de JavaScript: se recarga
// sola y destruye el contexto de ejecución, así que el `Runtime.evaluate` que mide la
// página tira. Importa que sea ESE evaluate y no un campo puesto a mano, porque de ahí
// salen los TRES detectores de texto a la vez (título, texto en pantalla y `letras`) y lo
// que hay que probar es justamente que se mueren juntos. El de `location.href` sí contesta:
// es otra llamada, y en el Chrome de verdad sobrevive.
function navegadorDeMentira({ url = 'https://ejemplo.cl/', peticiones = [], cookies = [], aviso = {}, cargo = true, hrefFinal = null, avisoRevienta = false } = {}) {
  const oyentes = [];
  const cliente = {
    llamadas: [],
    cerrado: false,
    al: (cb) => oyentes.push(cb),
    cerrar: () => { cliente.cerrado = true; },
    async enviar(metodo, params) {
      cliente.llamadas.push(metodo);
      switch (metodo) {
        case 'Target.createBrowserContext': return { browserContextId: 'ctx-1' };
        case 'Target.createTarget': return { targetId: 'tgt-1' };
        case 'Target.attachToTarget': return { sessionId: 'ses-1' };
        case 'Page.navigate': {
          for (const p of peticiones) {
            emitir({
              sessionId: 'ses-1',
              method: 'Network.requestWillBeSent',
              params: { request: { url: p.url, method: p.metodo || 'GET', postData: p.cuerpo || null }, type: p.tipo || '' },
            });
          }
          if (cargo) emitir({ sessionId: 'ses-1', method: 'Page.loadEventFired', params: {} });
          return {};
        }
        case 'Storage.getCookies': return { cookies };
        case 'Runtime.evaluate':
          if (/location\.href/.test(params.expression || '')) return { result: { value: hrefFinal || url } };
          if (avisoRevienta) throw new Error('Cannot find context with specified id');
          return { result: { value: JSON.stringify(aviso) } };
        default: return {};
      }
    },
  };
  const emitir = (m) => { for (const cb of oyentes) cb(m); };
  return cliente;
}

/* ================================================================== */
console.log('=== 1. dominio registrable y host, que es lo que separa propio de tercero ===');
{
  eq('cl plano', m.registrable('www.awasi.com'), 'awasi.com');
  eq('subdominio hondo', m.registrable('a.b.c.clinica.cl'), 'clinica.cl');
  eq('sufijo doble conocido', m.registrable('shop.tienda.com.ar'), 'tienda.com.ar');
  eq('gob.cl es sufijo doble', m.registrable('www.minsal.gob.cl'), 'minsal.gob.cl');
  eq('cookie con punto delante', m.registrable('.awasi.com'), 'awasi.com');
  eq('punto final de más', m.registrable('awasi.com.'), 'awasi.com');
  eq('dominio pelado', m.registrable('awasi.com'), 'awasi.com');
  eq('host de una url', m.hostDe('https://www.google-analytics.com/g/collect?v=2'), 'www.google-analytics.com');
  eq('url rota no revienta', m.hostDe('no-es-una-url'), '');
  eq('nada no revienta', m.hostDe(null), '');
}

/* ================================================================== */
console.log('=== 2. awasi.com: el sitio que hoy saca 100/100 (datos reales, 135 peticiones) ===');
const awasi = unaInstantanea('ev0/cdp-awasi.json');
{
  const h = m.clasificarRastreadores(awasi.tras2.peticiones, awasi.tras2.cookies);
  // Eran cinco hasta el 25-sep. El sexto, Segment, siempre estuvo ahí
  // (cdn.segment.com/analytics.js/v1/…): lo que faltaba era la entrada en el catálogo.
  eq('encuentra seis rastreadores', h.length, 6);
  eq('y son estos', h.map((x) => x.clave).sort(),
    ['ga4', 'gads', 'gtm', 'meta', 'reddit', 'segment']);

  const ga = buscar(h, 'ga4');
  cierto('Google Analytics cargó', ga.cargo);
  eq('con sus dos cookies', ga.cookie.nombres.sort(), ['_ga', '_ga_EBJ2B1XP3S']);
  cierto('y envió datos', ga.envio);

  const gads = buscar(h, 'gads');
  cierto('Google Ads cargó', gads.cargo);
  eq('dejó _gcl_au', gads.cookie.nombres, ['_gcl_au']);
  eq('y envió tres veces', gads.envio.cuantas, 3);

  const reddit = buscar(h, 'reddit');
  cierto('el Pixel de Reddit cargó', reddit.cargo);
  eq('dejó _rdt_uuid', reddit.cookie.nombres, ['_rdt_uuid']);
  cierto('y envió', reddit.envio);

  const gtm = buscar(h, 'gtm');
  cierto('Google Tag Manager cargó', gtm.cargo);
  eq('GTM no escribe cookies propias', gtm.cookie, null);
  eq('ni envía por su cuenta', gtm.envio, null);
}

console.log('=== 3. EL CASO CANÓNICO: Meta carga y deja cookie SIN llegar a enviar ===');
{
  const h = m.clasificarRastreadores(awasi.tras2.peticiones, awasi.tras2.cookies);
  const meta = buscar(h, 'meta');
  eq('cargó dos archivos', meta.cargo.cuantas, 2);
  eq('dejó escrita _fbp', meta.cookie.nombres, ['_fbp']);
  // Si alguien junta los tres verbos en un booleano, esta línea se cae.
  eq('y NO envió: el campo viaja en null, no en false ni ausente', meta.envio, null);

  const frase = m.frasePorRastreador(meta, 18);
  cierto('la frase dice que cargó', /cargó/.test(frase));
  cierto('la frase dice que dejó la cookie _fbp', /dejó escrita la cookie _fbp/.test(frase));
  // Lo que NO se puede decir: "no envió datos" a secas. Solo miramos 18 segundos, así que
  // la ausencia de envío es una observación nuestra, no un hecho sobre el sitio.
  cierto('dice cuánto miramos, en vez de afirmar que no envía',
    /En los 18 segundos que miramos no le vimos enviar datos\./.test(frase));
  falso('nunca afirma "no envía datos"', /\bno envía datos\b/.test(frase));
}

console.log('=== 4. EL OTRO CASO: hotelescumbres.cl, GA carga y ENVÍA sin escribir cookie ===');
const cumbres = unaInstantanea('ev0/cdp-cumbres.json');
{
  const h = m.clasificarRastreadores(cumbres.tras2.peticiones, cumbres.tras2.cookies);
  const ga = buscar(h, 'ga4');
  eq('cargó tres archivos', ga.cargo.cuantas, 3);
  eq('envió dos veces', ga.envio.cuantas, 2);
  // Consent Mode: manda señales y no escribe hasta que haya consentimiento. Un chequeo que
  // mire solo cookies da este sitio por limpio, y le está enviando datos a Google.
  eq('y NO escribió NINGUNA cookie', ga.cookie, null);
  eq('el sitio entero dejó una sola cookie', cumbres.tras2.cookies.length, 1);

  const frase = m.frasePorRastreador(ga, 18);
  cierto('la frase dice que envió datos', /envió datos de la visita/.test(frase));
  falso('y no menciona ninguna cookie', /cookie/.test(frase));
}

console.log('=== 5. terrado.cl y time.cl: las otras dos combinaciones, también reales ===');
{
  const terrado = unaInstantanea('ev0/cdp-terrado.json');
  const h = m.clasificarRastreadores(terrado.tras2.peticiones, terrado.tras2.cookies);
  const clarity = buscar(h, 'clarity');
  cierto('Clarity cargó', clarity.cargo);
  eq('con sus dos cookies', clarity.cookie.nombres.sort(), ['_clck', '_clsk']);
  cierto('y envió', clarity.envio);
  const meta = buscar(h, 'meta');
  eq('Meta otra vez: carga y cookie, sin envío', [!!meta.cargo, !!meta.cookie, meta.envio], [true, true, null]);
  eq('Google Ads envió diez veces', buscar(h, 'gads').envio.cuantas, 10);

  const time = unaInstantanea('ev0/cdp-time-25s.json');
  const h2 = m.clasificarRastreadores(time.tras2.peticiones, time.tras2.cookies);
  const meta2 = buscar(h2, 'meta');
  cierto('en time.cl el Pixel de Meta cargó', meta2.cargo);
  eq('sin cookie', meta2.cookie, null);
  eq('y sin envío: cargar solo también es una de las cuatro combinaciones', meta2.envio, null);
  const f = m.frasePorRastreador(meta2, 18);
  falso('su frase no habla de cookies', /cookie/.test(f));
  cierto('y sigue diciendo cuánto miramos', /18 segundos que miramos/.test(f));
}

/* ================================================================== */
console.log('=== 6. el informe de awasi: lo que hoy sale 100/100 tiene que salir en rojo ===');
{
  const r = m.armarInforme({ ...awasi, aviso: { avisos: [], marcosIlegibles: [] } }, 'awasi.com');
  cierto('es un informe, no una falla', r.ok);
  const porId = Object.fromEntries(r.items.map((i) => [i.id, i]));
  eq('rastreadores que parten solos: pendiente', porId.carga.estado, 'pendiente');
  eq('cookies sin permiso: pendiente', porId.cookies.estado, 'pendiente');
  eq('datos que ya salieron: pendiente', porId.envio.estado, 'pendiente');
  eq('sin aviso: pendiente', porId.aviso.estado, 'pendiente');
  eq('nada en verde', r.items.filter((i) => i.estado === 'ok').length, 0);
  eq('nada sin confirmar: lo vimos todo', r.sinConfirmar, 0);
  eq('se confirmó el peso entero', [r.pesoConfirmado, r.pesoTotal], [13, 13]);
  eq('y el puntaje es 0', r.puntaje, 0);

  cierto('el detalle nombra a Meta', /Pixel de Meta/.test(porId.carga.detalle));
  cierto('el detalle de cookies nombra _fbp', /_fbp/.test(porId.cookies.detalle));
  cierto('el de envío nombra a Google Ads', /Google Ads/.test(porId.envio.detalle));
  // Los tres verbos siguen separados en el texto: Meta no aparece en la lista de los que
  // enviaron datos, porque no envió.
  falso('Meta NO aparece como que envió datos',
    /le mandó datos de la visita a[^.]*Pixel de Meta/.test(porId.envio.detalle));
  cierto('y sí aparece en la de los que cargaron', /Pixel de Meta/.test(porId.carga.detalle));

  cierto('el informativo de terceros los cuenta', r.informativos.some((i) => i.id === 'terceros'));
  cierto('y siempre se explica cómo miramos', r.informativos.some((i) => i.id === 'como-miramos'));
  const comoMiramos = r.informativos.find((i) => i.id === 'como-miramos').detalle;
  cierto('diciendo que no se hizo ningún clic', /No hicimos ningún clic/.test(comoMiramos));
  cierto('y que esto no dice si cumples', /no dice si cumples/.test(comoMiramos));
}

console.log('=== 7. un sitio limpio sí puede salir en verde (spindlelab, medición del 25-sep) ===');
{
  // 22 peticiones, un solo tercero (cloudflareinsights), cero cookies, banner con Rechazar
  // y Aceptar. Los números son los de la prueba de concepto.
  const limpio = {
    urlFinal: 'https://spindlelab.cl/', titulo: 'SpindleLab', letras: 4200, msTotal: 21600, parcial: false,
    tras1: { ms: 11000, peticiones: [
      { url: 'https://spindlelab.cl/', metodo: 'GET', tipo: 'Document', ms: 120, conCuerpo: false },
      { url: 'https://static.cloudflareinsights.com/beacon.min.js', metodo: 'GET', tipo: 'Script', ms: 1400, conCuerpo: false },
    ], cookies: [] },
    tras2: { ms: 21600, peticiones: [
      { url: 'https://spindlelab.cl/', metodo: 'GET', tipo: 'Document', ms: 120, conCuerpo: false },
      { url: 'https://static.cloudflareinsights.com/beacon.min.js', metodo: 'GET', tipo: 'Script', ms: 1400, conCuerpo: false },
    ], cookies: [] },
    aviso: { avisos: [{ fuente: 'elemento', texto: 'Usamos cookies', botones: ['Rechazar', 'Aceptar'], tieneBotonDeConsentimiento: true }], marcosIlegibles: [] },
  };
  const r = m.armarInforme(limpio, 'spindlelab.cl');
  const porId = Object.fromEntries(r.items.map((i) => [i.id, i]));
  eq('nada cargó', porId.carga.estado, 'ok');
  eq('ninguna cookie', porId.cookies.estado, 'ok');
  eq('nada se envió', porId.envio.estado, 'ok');
  eq('y el aviso aparece', porId.aviso.estado, 'ok');
  eq('100', r.puntaje, 100);
  cierto('el aviso nombra sus botones', /"Rechazar"/.test(porId.aviso.detalle));
  // Ni siquiera en verde se afirma más de lo que se miró.
  cierto('y dice que no se probó qué pasa al aceptar',
    /No revisamos qué pasa cuando alguien acepta o rechaza/.test(porId.aviso.detalle));
  falso('en ninguna parte dice que cumple', /\bcumples?\b(?! o no)/.test(JSON.stringify(r.items)));
}

console.log('=== 8. el falso verde más fácil: hay banner y los rastreadores ya partieron ===');
{
  const conBanner = {
    ...awasi,
    aviso: { avisos: [{ fuente: 'elemento', texto: 'Usamos cookies para mejorar tu experiencia',
      botones: ['Aceptar'], tieneBotonDeConsentimiento: true }], marcosIlegibles: [] },
  };
  const r = m.armarInforme(conBanner, 'awasi.com');
  const aviso = r.items.find((i) => i.id === 'aviso');
  // Apareció el aviso, sí. Y no retuvo nada. En verde sería mentira.
  eq('el aviso NO va en verde si los rastreadores ya corrieron', aviso.estado, 'pendiente');
  cierto('y el detalle lo explica', /no está reteniendo nada/.test(aviso.detalle));
  cierto('el arreglo apunta al modo "solo informar"', /solo informar/.test(aviso.arreglo));
}

/* ================================================================== */
console.log('=== 9. un "no lo sabemos" no suma NI resta ===');
{
  // Sitio que nos bloqueó: cuatro peticiones, ninguna cookie, casi nada de texto.
  const bloqueado = {
    urlFinal: 'https://ejemplo.cl/', titulo: 'Just a moment...', letras: 90, msTotal: 18000, parcial: false,
    tras1: { ms: 11000, peticiones: [{ url: 'https://ejemplo.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false }], cookies: [] },
    tras2: { ms: 18000, peticiones: [{ url: 'https://ejemplo.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false }], cookies: [] },
    aviso: { avisos: [], marcosIlegibles: [] },
  };
  const r = m.armarInforme(bloqueado, 'ejemplo.cl');
  cierto('se reconoce el bloqueo', r.bloqueado);
  eq('los cuatro ítems quedan sin confirmar', r.items.filter((i) => i.estado === 'sin-confirmar').length, 4);
  eq('ninguno en verde', r.items.filter((i) => i.estado === 'ok').length, 0);
  eq('ninguno en rojo tampoco: no resta', r.items.filter((i) => i.estado === 'pendiente').length, 0);
  eq('no se confirmó nada de peso', r.pesoConfirmado, 0);
  // Con menos de la mitad del peso confirmado no se muestra número. Acá es cero.
  eq('y NO se muestra puntaje', r.puntaje, null);
  cierto('el texto dice que no lo sabemos',
    r.items.every((i) => /no lo sabemos|no pudimos leer/.test(i.detalle)));
  cierto('y que no se cuenta ni a favor ni en contra',
    r.items.some((i) => /ni a favor ni en contra/.test(i.detalle)));
  falso('en ninguna parte se dice que el sitio está limpio',
    /limpio|no tiene rastreadores|todo en orden/i.test(JSON.stringify(r.items)));
}

console.log('=== 10. el puntaje se calla cuando se confirmó menos de la mitad del peso ===');
{
  // Mismo sitio limpio, pero el detector de aviso no pudo correr: 3 de 13 sin confirmar.
  const pide = [
    { url: 'https://x.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false },
    { url: 'https://x.cl/estilo.css', metodo: 'GET', tipo: 'Stylesheet', ms: 240, conCuerpo: false },
    { url: 'https://x.cl/logo.svg', metodo: 'GET', tipo: 'Image', ms: 310, conCuerpo: false },
  ];
  const limpioSinAviso = {
    urlFinal: 'https://x.cl/', titulo: 'X', letras: 4000, msTotal: 18000, parcial: false,
    tras1: { ms: 11000, peticiones: pide, cookies: [] },
    tras2: { ms: 18000, peticiones: pide, cookies: [] },
    aviso: { fallo: true },
  };
  const r = m.armarInforme(limpioSinAviso, 'x.cl');
  eq('solo el aviso queda sin confirmar', r.sinConfirmar, 1);
  eq('se confirmaron 10 de 13', [r.pesoConfirmado, r.pesoTotal], [10, 13]);
  // 10 de 13 es más de la mitad, así que el número sí sale.
  eq('y el puntaje sale', r.puntaje, 100);
}

/* ================================================================== */
console.log('=== 11. el aviso: el iframe que engañó a dos versiones del detector ===');
{
  // El fallo real: el banner de hotelescumbres.cl vive en un <iframe> que es fixed, pero
  // su contenido, dentro del iframe, no lo es. La v1 y la v2 decían "sin aviso" sobre un
  // sitio que sí lo muestra.
  const desdeIframe = m.leerAviso({
    avisos: [{ fuente: 'iframe', texto: 'This site uses cookies', botones: ['Customize', 'Accept', 'Decline'], tieneBotonDeConsentimiento: true }],
    marcosIlegibles: [],
  });
  eq('un banner dentro de un iframe SÍ cuenta como visible', desdeIframe.estado, 'visible');
  eq('y sus botones se leen', desdeIframe.botones, ['Customize', 'Accept', 'Decline']);

  // Un marco que no se puede leer va a sin-confirmar, NUNCA a "no tiene aviso". Es
  // exactamente el sitio donde un falso negativo nuestro le diría a un prospecto que no
  // tiene algo que sí tiene.
  const opaco = m.leerAviso({ avisos: [], marcosIlegibles: [{ src: 'https://cmp.ajeno.com/banner' }] });
  eq('un marco ilegible no es "no tiene aviso"', opaco.estado, 'no-se-pudo');
  eq('y se dice por qué', opaco.motivo, 'marco');

  eq('sin avisos y sin marcos, sí es "ninguno"', m.leerAviso({ avisos: [], marcosIlegibles: [] }).estado, 'ninguno');
  eq('el detector que no corrió es no-se-pudo', m.leerAviso({ fallo: true }).estado, 'no-se-pudo');
  eq('nada tampoco es no-se-pudo', m.leerAviso(null).estado, 'no-se-pudo');
}

console.log('=== 12. y el marco ilegible llega hasta el informe como sin-confirmar ===');
{
  const r = m.armarInforme({
    ...cumbres,
    aviso: { avisos: [], marcosIlegibles: [{ src: 'https://app.secureprivacy.ai/banner' }] },
  }, 'hotelescumbres.cl');
  const aviso = r.items.find((i) => i.id === 'aviso');
  eq('el ítem del aviso queda sin confirmar', aviso.estado, 'sin-confirmar');
  falso('no va en verde', aviso.ok);
  cierto('y dice que hay un aviso que no pudimos leer',
    /aviso en tu sitio que no pudimos leer/.test(aviso.detalle));
  falso('nunca dice que no tiene aviso', /no apareció ningún aviso/.test(aviso.detalle));
  // El resto del informe sí se puntúa: lo que sí vimos, lo vimos. Son 7 y no 10 desde el
  // 25-sep: la única cookie de hotelescumbres es el cf_clearance de asksuite.com, un dominio
  // que no reconocemos, y esa duda dejó de restar (§26). Quedan carga (3) y envío (4).
  eq('los ítems de carga y envío siguen contando', r.pesoConfirmado, 7);
  eq('y la cookie que no entendemos no resta', r.items.find((i) => i.id === 'cookies').estado, 'sin-confirmar');
}

/* ================================================================== */
console.log('=== 13. reconocer que nos bloquearon, sin confundirlo con un sitio chico ===');
{
  cierto('título de desafío de Cloudflare', m.pareceBloqueo({ peticiones: [], cookies: [], letras: 2000, titulo: 'Just a moment...' }));
  cierto('acceso denegado', m.pareceBloqueo({ peticiones: [], cookies: [], letras: 5000, titulo: 'Access Denied' }));
  cierto('cuatro peticiones y nada de texto', m.pareceBloqueo({ peticiones: [1, 2, 3, 4].map((i) => ({ url: 'x' + i })), cookies: [], letras: 80 }));
  // El falso positivo que hay que evitar: un one-pager honesto, sin rastreadores, con texto.
  falso('un one-pager con texto NO es un bloqueo',
    m.pareceBloqueo({ peticiones: [1, 2, 3].map((i) => ({ url: 'x' + i })), cookies: [], letras: 3500, titulo: 'Clínica X' }));
  falso('un sitio grande sin cookies tampoco',
    m.pareceBloqueo({ peticiones: new Array(40).fill({ url: 'x' }), cookies: [], letras: 200 }));
  // Sin dato de texto (el detector de aviso tampoco corrió) una sola petición sí levanta la
  // sospecha: no vimos nada de nada, y un sitio real pide al menos su hoja de estilos. Sin
  // esta regla, un sitio que nos tapó la vista entera salía con los tres ítems en verde.
  eq('una sola petición y sin texto: no vimos el sitio',
    m.pareceBloqueo({ peticiones: [{ url: 'x' }], cookies: [], letras: null }), 'flaco');
  // Esta afirmaba lo contrario hasta el 26-sep ("tres peticiones sin dato de texto ya no se
  // asumen bloqueo") y era el último falso verde: bendecía como CORRECTO que una pared de
  // tres peticiones saliera limpia por el solo hecho de que no pudimos contar su texto.
  // Falta de dato no es dato a favor. El §34 lo mide de punta a punta sobre la pared real.
  eq('tres peticiones y sin dato de texto: tampoco vimos el sitio',
    m.pareceBloqueo({ peticiones: [{ url: 'a' }, { url: 'b' }, { url: 'c' }], cookies: [], letras: null }), 'flaco');
  // Y el límite del otro lado, que es lo que impide que esto le quite el informe a nadie:
  // el corte de peticiones no se movió. Con texto desconocido pero con la red entera medida,
  // no hay sospecha que levantar.
  falso('un sitio con muchas peticiones y sin dato de texto NO es sospechoso',
    m.pareceBloqueo({ peticiones: new Array(40).fill({ url: 'x' }), cookies: [], letras: null }));

  // Los dos motivos se dicen con palabras distintas, y solo uno acusa al sitio. example.com
  // es el caso real que lo obligó: 1 petición y 127 caracteres, y es una página de verdad,
  // no un bloqueo. Decirle a su dueño "tu sitio nos bloqueó" sería falso.
  eq('un título de desafío es un bloqueo de verdad',
    m.pareceBloqueo({ peticiones: [], cookies: [], letras: 100, titulo: 'Just a moment...' }), 'bloqueo');
  eq('una página casi vacía es "flaco", no un bloqueo',
    m.pareceBloqueo({ peticiones: [{ url: 'https://example.com/' }], cookies: [], letras: 127, titulo: 'Example Domain' }), 'flaco');

  const armar = (titulo, letras) => m.armarInforme({
    urlFinal: 'https://ejemplo.cl/', titulo, letras, msTotal: 18000, parcial: false,
    tras1: { ms: 11000, peticiones: [{ url: 'https://ejemplo.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false }], cookies: [] },
    tras2: { ms: 18000, peticiones: [{ url: 'https://ejemplo.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false }], cookies: [] },
    aviso: { avisos: [], marcosIlegibles: [] },
  }, 'ejemplo.cl');

  const rBloqueo = armar('Just a moment...', 100);
  cierto('con desafío sí se dice que nos bloqueó',
    /nos bloqueó la lectura/.test(rBloqueo.items[0].detalle));
  const rFlaco = armar('Example Domain', 127);
  cierto('con página vacía se describe lo que vimos',
    /casi no trae contenido/.test(rFlaco.items[0].detalle));
  falso('y NO se le acusa de bloquearnos',
    /nos bloqueó/.test(JSON.stringify(rFlaco.items)));
  cierto('pero se deja dicho que podría serlo',
    /Puede ser que tu sitio no nos dejara entrar/.test(rFlaco.items[0].detalle));
  // Y el mismo motivo cuando el texto NO se midió. Se llega igual a 'flaco' (una sola
  // petición y ninguna cookie vale por sí sola), pero ahí "casi no trae contenido" es una
  // afirmación sobre algo que nadie contó: `letras` viene en null porque el detector de
  // aviso tampoco pudo correr. El estado no cambia; lo que no puede es decir de más.
  const rSinLetras = m.armarInforme({
    urlFinal: 'https://ejemplo.cl/', titulo: '', letras: null, msTotal: 18000, parcial: false,
    tras1: { ms: 11000, peticiones: [{ url: 'https://ejemplo.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false }], cookies: [] },
    tras2: { ms: 18000, peticiones: [{ url: 'https://ejemplo.cl/', metodo: 'GET', tipo: 'Document', ms: 100, conCuerpo: false }], cookies: [] },
    aviso: { fallo: 'timeout' },
  }, 'ejemplo.cl');
  eq('sin dato de texto también es flaco', rSinLetras.bloqueado, 'flaco');
  falso('y no se afirma cuánto contenido traía',
    /casi no trae contenido/.test(JSON.stringify(rSinLetras.items)));
  cierto('se dice que el texto no se pudo leer',
    /el texto de la página tampoco lo pudimos leer/.test(rSinLetras.items[0].detalle));
  cierto('y se sigue dejando dicho que podría ser un bloqueo',
    /Puede ser que tu sitio no nos dejara entrar/.test(rSinLetras.items[0].detalle));
  eq('sin puntaje, igual que el otro', rSinLetras.puntaje, null);

  // Los dos van igual a sin-confirmar: ninguno suma ni resta.
  eq('los dos dejan todo sin confirmar', [rBloqueo.sinConfirmar, rFlaco.sinConfirmar], [4, 4]);
  eq('y sin puntaje', [rBloqueo.puntaje, rFlaco.puntaje], [null, null]);
}

/* ================================================================== */
console.log('=== 14. lo que aparece al mover el mouse (datos reales de ev2, fases A y B) ===');
{
  const archivos = ['ev2/net2-aureamed.json', 'ev2/net2-kydoft.json', 'ev2/net2-revitalaser2.json'];
  for (const rel of archivos) {
    if (!hay(rel)) { console.log(`  (salto ${rel}: no está)`); continue; }
    const med = dosTramos(rel);
    const d = m.diferenciaPorElGesto(med.tras1, med.tras2);
    cierto(`${rel}: la diferencia se calcula sin reventar`, Array.isArray(d.cookiesNuevas));
    cierto(`${rel}: el tramo B tiene al menos tanto como el A`,
      med.tras2.peticiones.length >= med.tras1.peticiones.length);
    // Lo que no puede pasar: que una cookie que ya estaba en A se reporte como nueva.
    const nombresA = new Set(med.tras1.cookies.map((c) => c.name));
    falso(`${rel}: ninguna cookie del tramo A se cuenta como nueva`,
      d.cookiesNuevas.some((n) => nombresA.has(n)));
  }
  // Y el caso construido: un rastreador que solo aparece después del gesto. Es el que hizo
  // que 2 de 12 prospectos parecieran limpios el 23-sep.
  const t1 = { peticiones: [{ url: 'https://sitio.cl/', ms: 100 }], cookies: [] };
  const t2 = { peticiones: [{ url: 'https://sitio.cl/', ms: 100 },
    { url: 'https://connect.facebook.net/es_LA/fbevents.js', ms: 12000 }],
    cookies: [{ name: '_fbp', domain: '.sitio.cl' }] };
  const d = m.diferenciaPorElGesto(t1, t2);
  eq('el Pixel de Meta aparece recién con el gesto', d.rastreadoresNuevos, ['el Pixel de Meta']);
  eq('y su cookie también', d.cookiesNuevas, ['_fbp']);
  const r = m.armarInforme({ urlFinal: 'https://sitio.cl/', titulo: 'Sitio', letras: 3000, msTotal: 18000,
    parcial: false, tras1: t1, tras2: t2, aviso: { avisos: [], marcosIlegibles: [] } }, 'sitio.cl');
  cierto('y el informe lo cuenta como hallazgo del gesto',
    r.informativos.some((i) => i.id === 'gesto' && /Pixel de Meta/.test(i.detalle)));
  eq('quedando el ítem de carga en pendiente', r.items.find((i) => i.id === 'carga').estado, 'pendiente');
}

/* ================================================================== */
console.log('=== 15. las fallas: ninguna se presenta como buena noticia sobre el sitio ===');
{
  const claves = Object.keys(m.FALLAS);
  eq('están las de la tabla del encargo', claves.sort(),
    ['cuota', 'destino', 'navegador', 'no-carga', 'no-resuelve', 'presupuesto', 'sin-configurar', 'sin-permiso', 'tope-ip']);
  // Si el tiempo que se acaba es el NUESTRO, no se le echa la culpa al sitio del prospecto.
  // Antes las dos cosas compartían la clave 'no-carga', que es del sitio.
  eq('el presupuesto agotado es un problema nuestro', m.FALLAS['presupuesto'].tipo, 'nuestro');
  cierto('y lo dice con todas sus letras',
    /No es un resultado sobre tu sitio/.test(m.FALLAS['presupuesto'].mensaje));
  falso('sin decir que el sitio no cargó', /tu sitio no terminó de cargar/i.test(m.FALLAS['presupuesto'].mensaje));
  eq('y el del sitio sigue siendo del sitio', m.FALLAS['no-carga'].tipo, 'sitio');
  // El tope por IP dura hasta mañana, no "un momento": son 20 al día, contadas por fecha.
  cierto('el tope por IP dice hasta cuándo dura', /mañana/.test(m.FALLAS['tope-ip'].mensaje));
  falso('y ya no promete una espera corta', /espera un momento/i.test(m.FALLAS['tope-ip'].mensaje));
  // Y deja una salida. Quien revisa veinte sitios en un día es, casi siempre, alguien que
  // trabaja con sitios: mandarlo a esperar hasta mañana sin decirle nada más es cerrarle la
  // puerta al único visitante que ya demostró que esto le sirve.
  cierto('y dice qué hacer si necesita más hoy', /escríbenos/.test(m.FALLAS['tope-ip'].mensaje));
  for (const c of claves) {
    const r = m.falloDeLaRevision(c, 'ejemplo.cl');
    falso(`${c}: no viaja como informe`, r.ok);
    cierto(`${c}: trae mensaje`, typeof r.error === 'string' && r.error.length > 10);
    falso(`${c}: no dice que el sitio está limpio`,
      /limpio|sin rastreadores|todo bien|cumple/i.test(r.error));
    // El detalle técnico nunca sale: un 401 nuestro no es asunto del visitante.
    falso(`${c}: no filtra configuración nuestra`,
      /token|401|403|429|CF_|binding|KV/i.test(r.error));
  }
  // El plan sin activar y el token malo dicen lo mismo, a propósito.
  eq('plan y token comparten mensaje',
    m.FALLAS['sin-configurar'].mensaje, m.FALLAS['sin-permiso'].mensaje);
  cierto('y ese mensaje remite al chequeo rápido que ya está en pantalla',
    /lectura del código de tu sitio/.test(m.FALLAS['sin-configurar'].mensaje));
  cierto('la del navegador dice que el problema es nuestro',
    /es un problema nuestro/.test(m.FALLAS['navegador'].mensaje));
  eq('un dominio que no existe es falla de entrada', m.FALLAS['no-resuelve'].tipo, 'entrada');
  eq('y la cuota agotada es nuestra', m.FALLAS['cuota'].tipo, 'nuestro');

  // Y desde armarInforme, que es por donde llegan de verdad.
  const r = m.armarInforme({ fallo: 'no-resuelve' }, 'noexiste.cl');
  falso('una medición fallida no produce informe', r.ok);
  eq('sale con su clave', r.clave, 'no-resuelve');
}

console.log('=== 16. los errores de red de Chrome, traducidos ===');
{
  eq('nombre que no resuelve', m.claveDeErrorDeRed('net::ERR_NAME_NOT_RESOLVED'), 'no-resuelve');
  eq('conexión rechazada', m.claveDeErrorDeRed('net::ERR_CONNECTION_REFUSED'), 'no-resuelve');
  eq('se acabó el tiempo', m.claveDeErrorDeRed('net::ERR_TIMED_OUT'), 'no-carga');
  eq('lo cortó el portón', m.claveDeErrorDeRed('net::ERR_BLOCKED_BY_CLIENT'), 'destino');
  eq('cualquier otra cosa es problema nuestro', m.claveDeErrorDeRed('net::ERR_CERT_DATE_INVALID'), 'navegador');
  eq('nada tampoco revienta', m.claveDeErrorDeRed(null), 'navegador');
}

console.log('=== 17. carga parcial: se muestra lo que sí se vio, marcado ===');
{
  const r = m.armarInforme({ ...awasi, parcial: true, aviso: { avisos: [], marcosIlegibles: [] } }, 'awasi.com');
  cierto('sigue habiendo informe', r.ok);
  cierto('marcado como parcial', r.parcial);
  cierto('y con su informativo', r.informativos.some((i) => i.id === 'parcial'));
  const texto = r.informativos.find((i) => i.id === 'parcial').detalle;
  cierto('que dice que puede quedar corto', /puede quedar corto/.test(texto));
  cierto('y que lo no visto no cuenta en contra', /no está contado en contra tuya/.test(texto));
  eq('los hallazgos que sí se vieron siguen contando', r.items.find((i) => i.id === 'carga').estado, 'pendiente');
}

/* ================================================================== */
console.log('=== 18. el tope de abuso ===');
{
  const claves = m.clavesDeTope('1.2.3.4', 'ejemplo.cl', new Date('2026-09-25T18:00:00Z'));
  eq('la clave por IP lleva el día', claves.ip, 'tope:ip:2026-09-25:1.2.3.4');
  eq('la global también', claves.global, 'tope:global:2026-09-25');
  eq('la caché es por dominio', claves.cache, 'cache:ejemplo.cl');
  eq('sin IP no revienta', m.clavesDeTope('', 'x.cl', new Date('2026-09-25T00:00:00Z')).ip, 'tope:ip:2026-09-25:sin-ip');
  eq('20 al día por IP', m.TOPE_IP_DIA, 20);
  // 80 al día son unos 40 minutos de navegador: bien por debajo de las 10 horas del mes.
  eq('80 al día en total', m.TOPE_GLOBAL_DIA, 80);
  cierto('el global cabe de sobra en la cuota del mes', m.TOPE_GLOBAL_DIA * 30 * 30 < 10 * 3600 * 30);
}

// Ojo con la salida de acá abajo: esta sección provoca fallas a propósito, y el endpoint
// las registra en consola con su detalle técnico. Esas líneas son la prueba de que el
// detalle va al log y NO al visitante; no son fallas de la prueba.
console.log('=== 19. el endpoint: portón, tope y caché, sin abrir ningún navegador ===');
{
  const kvFalso = (inicial = {}) => {
    const d = new Map(Object.entries(inicial));
    return { d, async get(k, o) { const v = d.get(k); return v === undefined ? null : (o?.type === 'json' ? JSON.parse(v) : v); },
      async put(k, v) { d.set(k, v); } };
  };
  const nunca = () => { throw new Error('no se debió abrir el navegador'); };

  eq('entrada vacía', (await m.profundo('', { VYC_TOPES: kvFalso() }, { abrirCliente: nunca })).tipo, 'entrada');
  eq('una IP no es un dominio', (await m.profundo('127.0.0.1', { VYC_TOPES: kvFalso() }, { abrirCliente: nunca })).tipo, 'entrada');
  // El portón importado de chequeo.js, sin relajar nada.
  const interna = await m.profundo('127.0.0.1.nip.io', { VYC_TOPES: kvFalso() }, { abrirCliente: nunca });
  falso('una red interna no pasa', interna.ok);
  eq('localhost tampoco', (await m.profundo('localhost', { VYC_TOPES: kvFalso() }, { abrirCliente: nunca })).tipo, 'entrada');

  // Sin KV no hay tope, y sin tope este endpoint no puede estar abierto.
  const sinKv = await m.profundo('ejemplo.cl', {}, { abrirCliente: nunca });
  eq('sin KV se declina', sinKv.clave, 'sin-configurar');
  falso('y no se degrada a un informe', sinKv.ok);

  // El tope por IP, ya alcanzado.
  const kv1 = kvFalso({ [`tope:ip:${new Date().toISOString().slice(0, 10)}:9.9.9.9`]: '20' });
  const topeado = await m.profundo('ejemplo.cl', { VYC_TOPES: kv1 }, { ip: '9.9.9.9', abrirCliente: nunca });
  eq('el tope por IP corta antes del navegador', topeado.clave, 'tope-ip');

  // El tope global.
  const kv2 = kvFalso({ [`tope:global:${new Date().toISOString().slice(0, 10)}`]: '80' });
  eq('el tope global también', (await m.profundo('ejemplo.cl', { VYC_TOPES: kv2 }, { ip: '1.1.1.1', abrirCliente: nunca })).clave, 'cuota');

  // La caché: el mismo dominio dos veces el mismo día no abre un segundo navegador.
  const guardado = { ok: true, dominio: 'ejemplo.cl', puntaje: 0, items: [] };
  const kv3 = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(guardado) });
  const deCache = await m.profundo('ejemplo.cl', { VYC_TOPES: kv3 }, { ip: '2.2.2.2', abrirCliente: nunca });
  cierto('sale de la caché', deCache.deCache);
  eq('con el mismo contenido', deCache.puntaje, 0);
  eq('y sin gastar el tope', kv3.d.get(`tope:ip:${new Date().toISOString().slice(0, 10)}:2.2.2.2`), undefined);

  // Una falla al conectar sale con su clave y sin filtrar el detalle.
  const kv4 = kvFalso();
  const cae = await m.profundo('ejemplo.cl', { VYC_TOPES: kv4 }, {
    ip: '3.3.3.3',
    abrirCliente: () => { throw new m.FallaDeRevision('sin-permiso', 'la API contestó 401'); },
  });
  eq('el 401 llega como "todavía no está disponible"', cae.clave, 'sin-permiso');
  falso('sin el detalle', /401/.test(cae.error));
  // El intento se contó igual: una ráfaga que hace fallar el navegador no sale gratis.
  eq('y el intento se contó', kv4.d.get(`tope:ip:${new Date().toISOString().slice(0, 10)}:3.3.3.3`), '1');

  // Un error cualquiera cae en "problema nuestro", no en un informe.
  const kv5 = kvFalso();
  const raro = await m.profundo('ejemplo.cl', { VYC_TOPES: kv5 }, { ip: '4.4.4.4', abrirCliente: () => { throw new Error('lo que sea'); } });
  eq('cualquier otro error es del navegador', raro.clave, 'navegador');
  falso('y nunca es un informe', raro.ok);
}

/* ================================================================== */
console.log('=== 20. los 11 sitios del banco, con su fila esperada cada uno ===');
{
  // Cada fila es [dominio, cargar, puntaje, estados, rastreadores]. Las aserciones de abajo
  // son ESTRUCTURALES y pasan con casi cualquier dato, que es como patagoniacamp entró con
  // cero peticiones y nadie se dio cuenta. La fila esperada es lo que hace que un cambio
  // silencioso en el resultado de un sitio real haga fallar la prueba.
  //
  //   estados = [carga, cookies, envio, aviso]
  const banco = [
    ['awasi.com', () => unaInstantanea('ev0/cdp-awasi.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['ga4', 'gads', 'gtm', 'meta', 'reddit', 'segment']],
    ['hotelescumbres.cl', () => unaInstantanea('ev0/cdp-cumbres.json'),
      0, ['pendiente', 'sin-confirmar', 'pendiente', 'pendiente'], ['ga4', 'gads', 'gtm']],
    ['terrado.cl', () => unaInstantanea('ev0/cdp-terrado.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['clarity', 'ga4', 'gads', 'gtm', 'meta']],
    ['time.cl', () => unaInstantanea('ev0/cdp-time-25s.json'),
      54, ['pendiente', 'ok', 'ok', 'pendiente'], ['meta']],
    ['lastorres.com', () => desdeTxt('ev1/requests-lastorres.txt', 'ev1/cdp-lastorres.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['clarity', 'ga4', 'gads', 'gtm', 'meta']],
    ['opticasclvision.cl', () => desdeTxt('ev1/requests-opticasclvision.txt', 'ev1/cdp-opticasclvision.json'),
      77, ['ok', 'ok', 'ok', 'pendiente'], []],
    // Su caso propio: el .txt de la interacción trae los dos tramos y el .json de la misma
    // pasada trae las 20 cookies que quedaron. Antes se cruzaba el .txt de la interacción con
    // el .json de la pasada PASIVA, que no tiene ninguna cookie.
    ['patagoniacamp.com', () => desdeTxt('ev1/requests-patagoniacamp-interaccion.txt', 'ev1/cdp-patagoniacamp-interaccion.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['ga4', 'gads', 'gtm', 'hubspot', 'matomo', 'meta']],
    // sgfertility.com NO está acá: no es un sitio medido, es una medición fallida
    // (ERR_SSL_PROTOCOL_ERROR, urlFinal chrome-error://chromewebdata/). Tiene su propia
    // sección más abajo, donde se comprueba lo que de verdad importa de él.
    ['skinology.cl', () => unaInstantanea('ev2/net-skinology.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['clarity', 'ga4', 'gads', 'gtm', 'meta', 'pinterest', 'tiktok']],
    ['revitalaser.cl', () => dosTramos('ev2/net2-revitalaser2.json'),
      31, ['pendiente', 'pendiente', 'ok', 'pendiente'], ['gads', 'gtm', 'meta']],
    ['aureamed.cl', () => dosTramos('ev2/net2-aureamed.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['ga4', 'gads', 'gtm', 'meta']],
    ['kydoft.cl', () => dosTramos('ev2/net2-kydoft.json'),
      0, ['pendiente', 'pendiente', 'pendiente', 'pendiente'], ['clarity', 'ga4', 'gads']],
  ];
  let mirados = 0;
  for (const [dominio, cargar, puntajeEsperado, estadosEsperados, rastreadoresEsperados] of banco) {
    let med;
    try { med = cargar(); } catch (e) { console.log(`  (salto ${dominio}: ${e.message})`); continue; }
    mirados++;
    const r = m.armarInforme({ ...med, aviso: { avisos: [], marcosIlegibles: [] } }, dominio);
    cierto(`${dominio}: produce informe`, r.ok);
    // LA FILA ESPERADA. Lo de abajo comprueba la FORMA del informe; esto comprueba el
    // RESULTADO, que es lo único que nota si un sitio real cambió de veredicto en silencio.
    eq(`${dominio}: el puntaje esperado`, r.puntaje, puntajeEsperado);
    eq(`${dominio}: los cuatro estados esperados`,
      [r.items.find((i) => i.id === 'carga').estado,
       r.items.find((i) => i.id === 'cookies').estado,
       r.items.find((i) => i.id === 'envio').estado,
       r.items.find((i) => i.id === 'aviso').estado], estadosEsperados);
    eq(`${dominio}: los rastreadores esperados`, r.rastreadores.map((h) => h.clave).sort(), rastreadoresEsperados);
    eq(`${dominio}: cuatro ítems`, r.items.length, 4);
    cierto(`${dominio}: todos los estados son de los tres permitidos`,
      r.items.every((i) => ['ok', 'pendiente', 'sin-confirmar'].includes(i.estado)));
    cierto(`${dominio}: el campo ok siempre calza con el estado`,
      r.items.every((i) => i.ok === (i.estado === 'ok')));
    cierto(`${dominio}: un ítem que no está en verde trae su arreglo`,
      r.items.every((i) => (i.estado === 'ok') === (i.arreglo === null)));
    cierto(`${dominio}: el peso confirmado nunca pasa al total`, r.pesoConfirmado <= r.pesoTotal);
    cierto(`${dominio}: sin la mitad del peso, no hay número`,
      r.pesoConfirmado * 2 >= r.pesoTotal || r.puntaje === null);
    cierto(`${dominio}: el puntaje está entre 0 y 100, o no está`,
      r.puntaje === null || (r.puntaje >= 0 && r.puntaje <= 100));
    // Los tres verbos, en el dato crudo: cada uno es un objeto o null, nunca un booleano.
    cierto(`${dominio}: los tres verbos siguen separados`,
      r.rastreadores.every((h) => [h.cargo, h.cookie, h.envio].every((v) => v === null || typeof v === 'object')));
    cierto(`${dominio}: un rastreador listado hizo al menos una de las tres cosas`,
      r.rastreadores.every((h) => h.cargo || h.cookie || h.envio));
    // Y la regla que manda: nunca se AFIRMA que cumple. El descargo de `como-miramos` sí
    // usa la palabra ("no dice si cumples o no la ley"), y esa es justamente la frase que
    // queremos que esté, así que la afirmación se busca sin ella.
    const texto = JSON.stringify(r.items) + JSON.stringify(r.informativos);
    falso(`${dominio}: nunca afirma que cumple`,
      /\bcumples\b(?! o no)|\bcumple con la ley\b|\bestás al día\b|\bestá en regla\b/i.test(texto));
    cierto(`${dominio}: y sí lleva el descargo`, /no dice si cumples o no la ley/.test(texto));
    // Ningún rastreador detectado puede salir con el informe en verde entero.
    if (r.rastreadores.some((h) => h.cargo || h.cookie || h.envio)) {
      falso(`${dominio}: con rastreadores encontrados, el informe no sale 100`, r.puntaje === 100);
    }
  }
  cierto(`se miraron los 11 sitios del banco (fueron ${mirados})`, mirados === 11);
  console.log(`  (${mirados} sitios del banco de datos reales)`);

  // patagoniacamp.com es el sitio por el que existe el segundo tramo, y hasta el 25-sep el
  // banco le pasaba un archivo que esta prueba no sabía leer, así que medía CERO peticiones.
  // Con los dos tramos de verdad: nada antes del gesto, seis rastreadores después, sin un
  // solo clic. Es el caso que justifica los 7 segundos de mousemove y rueda.
  const pc = desdeTxt('ev1/requests-patagoniacamp-interaccion.txt', 'ev1/cdp-patagoniacamp-interaccion.json');
  eq('patagoniacamp: 96 peticiones antes del gesto', pc.tras1.peticiones.length, 96);
  eq('y 199 en total después', pc.tras2.peticiones.length, 199);
  eq('antes del gesto, CERO rastreadores', m.clasificarRastreadores(pc.tras1.peticiones, pc.tras1.cookies).length, 0);
  eq('después del gesto, seis', m.clasificarRastreadores(pc.tras2.peticiones, pc.tras2.cookies).length, 6);
  const rPc = m.armarInforme({ ...pc, aviso: { avisos: [], marcosIlegibles: [] } }, 'patagoniacamp.com');
  eq('y el envío queda en pendiente', rPc.items.find((i) => i.id === 'envio').estado, 'pendiente');
  cierto('con el hallazgo del gesto en el canal informativo',
    rPc.informativos.some((i) => i.id === 'gesto'));
}

/* ================================================================== *
 * 21. EL BLOQUEANTE: www.santander.cl salía 77/100 con tres verdes.   *
 *                                                                     *
 * Medido con Chrome por CDP el 25-sep, contexto nuevo y sin un solo   *
 * clic, con el MISMO `medirConNavegador` que corre en producción. Los *
 * seis archivos de `medidas-25sep/` son esa medición tal cual salió,  *
 * y viven junto a esta prueba a propósito: el banco de ev0/ev1/ev2    *
 * es de una carpeta de sesión que se borra, y este caso no se puede   *
 * perder.                                                             *
 * ================================================================== */
console.log('=== 21. santander: la pared de Akamai que salía en verde (medido el 25-sep) ===');
const MEDIDAS = new URL('./medidas-25sep/', import.meta.url);
const medida = (nombre) => JSON.parse(fs.readFileSync(new URL(nombre + '.json', MEDIDAS), 'utf8'));
// El banco del 26-sep: 34 portadas medidas con el mismo medidor, por las que se rehizo el
// §23. Ver medidas-26sep/LEEME.md.
const MEDIDAS26 = new URL('./medidas-26sep/', import.meta.url);
const medida26 = (nombre) => JSON.parse(fs.readFileSync(new URL(nombre + '.json', MEDIDAS26), 'utf8'));
{
  const med = medida('santander');

  // Primero, el retrato del sitio tal como lo vimos. Si esto cambia, cambió la medición, no
  // el código, y entonces la prueba de abajo ya no está probando lo que dice probar.
  eq('terminó en la pared de banco.santander.cl', med.urlFinal, 'https://banco.santander.cl/');
  eq('con dos cookies, y son las del bot manager de Akamai',
    med.tras2.cookies.map((c) => c.name).sort(), ['_abck', 'bm_sz']);
  cierto('las dos del dominio del propio sitio', med.tras2.cookies.every((c) => /santander\.cl$/.test(c.domain)));

  // POR QUÉ NO LO ATRAPABA NADA DE LO QUE HABÍA. Las tres puertas viejas, una por una.
  eq('el título no es ninguno de los de desafío', med.titulo, 'Internet Connection Error');
  cierto('trae MÁS de 6 peticiones, así que el "flaco" no aplica', med.tras2.peticiones.length > 6);
  cierto('y deja cookies, así que el "flaco" tampoco por ahí', med.tras2.cookies.length > 0);
  // Y el texto de la pared no dice ninguna frase de firewall: habla de la conexión a internet.
  // Por eso el chequeo del texto visible, que sí se agregó, no basta para este caso.
  falso('su texto tampoco delata un firewall', /denegad|blocked|forbidden|robot/i.test(med.texto));

  // LO QUE SÍ LO ATRAPA.
  eq('las dos cookies son de portero', med.tras2.cookies.filter((c) => m.esCookieDePortero(c.name)).length, 2);
  eq('y el motivo es "portero"', m.pareceBloqueo({
    peticiones: med.tras2.peticiones, cookies: med.tras2.cookies,
    letras: med.letras, titulo: med.titulo, texto: med.texto,
    urlFinal: med.urlFinal, dominio: 'www.santander.cl',
  }), 'portero');

  // Y EL INFORME, que es lo que ve el prospecto.
  const r = m.armarInforme(med, 'www.santander.cl');
  eq('el informe no lleva puntaje', r.puntaje, null);
  eq('y el motivo viaja', r.bloqueado, 'portero');
  eq('los cuatro ítems quedan sin confirmar', r.items.filter((i) => i.estado === 'sin-confirmar').length, 4);
  falso('ninguno sale en verde', r.items.some((i) => i.ok));
  eq('nada se puntúa', r.pesoConfirmado, 0);
  // La frase exacta que salía sobre las dos cookies del guardia.
  falso('ya no dice que no dejó ninguna cookie de rastreo',
    /no dejó ninguna cookie/.test(JSON.stringify(r.items)));
  cierto('dice que lo que se abrió no fue su sitio',
    /Lo que se abrió no fue tu sitio/.test(r.items.find((i) => i.id === 'cookies').detalle));
  // Y no acusa: no le decimos que nos bloqueó, porque eso no lo sabemos.
  falso('no acusa al sitio de bloquearnos', /nos bloqueó la lectura/.test(JSON.stringify(r.items)));
}

/* ================================================================== */
console.log('=== 22. los cinco prospectos reales siguen recibiendo informe ===');
{
  // Los mismos cinco que el revisor comprobó, medidos acá de nuevo el 25-sep. Si el arreglo
  // del bloqueante se pasara de estricto, se caerían por acá: son sitios reales de estudios
  // de abogados a los que se les prometió una revisión.
  for (const nombre of ['tuane', 'uhc', 'hjmc', 'pdnd', 'zarhi']) {
    const med = medida(nombre);
    const dominio = nombre + '.cl';
    eq(`${dominio}: ninguna de sus cookies es de portero`,
      med.tras2.cookies.filter((c) => m.esCookieDePortero(c.name)).length, 0);
    const r = m.armarInforme(med, dominio);
    cierto(`${dominio}: produce informe`, r.ok);
    eq(`${dominio}: sin motivo de bloqueo`, r.bloqueado, null);
    cierto(`${dominio}: con puntaje`, typeof r.puntaje === 'number');
    falso(`${dominio}: no queda todo sin confirmar`, r.items.every((i) => i.estado === 'sin-confirmar'));
  }
  // El que obligaba a NO cortar por "poco texto" a secas: tuane.cl es una portada de verdad,
  // con 261 letras. Un corte por letras < 500 la habría declinado sin motivo.
  const tuane = medida('tuane');
  cierto('tuane.cl tiene menos de 500 letras', tuane.letras < 500);
  eq('y aun así recibe su informe', m.armarInforme(tuane, 'tuane.cl').bloqueado, null);
}

/* ================================================================== */
console.log('=== 23. la pared se reconoce por la forma de la página, no por la lista de cookies ===');
{
  // ESTA SECCIÓN SE REHIZO EL 26-SEP, Y POR QUÉ IMPORTA.
  //
  // Lo que había acá afirmaba que una página con 20 peticiones y 4.000 letras cuyas ÚNICAS
  // cookies fueran _abck y bm_sz era una pared de Akamai. Nadie lo había medido: era la
  // regla del código escrita otra vez en forma de prueba, y por eso pasaba siempre. Cuando
  // se midió resultó ser al revés — itau.cl y scotiabank.cl son portadas enteras, vistas
  // completas, con esas mismas cookies de primera parte.
  //
  // La regla vieja tenía además el agujero por el que el revisor volvió a entrar: exigía que
  // TODAS las cookies fueran de la lista, así que una sola cookie corriente al lado la
  // desarmaba. Las dos fallas son la misma — reconocer la pared por la AUSENCIA de todo lo
  // demás — y por eso la regla nueva mira lo que la pared ES.
  //
  // Todo lo de abajo se apoya en medidas-26sep/, no en lo que el código devuelve hoy.

  const censo = medida26('censo');
  const fila = (dominio) => censo.sitios.find((s) => s.dominio === dominio);

  /* --- 1. el hueco que justifica el número ------------------------ */
  // Las tres paredes del censo, comprobadas a mano una por una: banco.santander.cl muestra
  // "Revisa tu conexión a internet", www.bancoestado.cl "se ha restringido este acceso" y
  // www.latamairlines.com "Access Denied". Las otras 31 son portadas de verdad.
  const PAREDES = ['santander.cl', 'bancoestado.cl', 'latamairlines.com'];
  eq('el censo trae las 34 portadas medidas', censo.sitios.length, 34);
  const paredes = censo.sitios.filter((s) => PAREDES.includes(s.dominio));
  const reales = censo.sitios.filter((s) => !PAREDES.includes(s.dominio));
  eq('tres de ellas son paredes', paredes.length, 3);
  eq('y treinta y una son páginas de verdad', reales.length, 31);

  const masGorda = Math.max(...paredes.map((s) => s.peticiones));
  const masFlaca = Math.min(...reales.map((s) => s.peticiones));
  eq('la pared más cargada trae 8 peticiones', masGorda, 8);
  eq('la portada real más flaca trae 23', masFlaca, 23);
  // EL INVARIANTE. Si alguien mueve el corte fuera del hueco, esto falla, y falla contra una
  // medición, no contra una opinión.
  cierto('el corte deja las tres paredes de un lado', masGorda <= m.MAX_PETICIONES_PARED);
  cierto('y las treinta y una portadas reales del otro', masFlaca > m.MAX_PETICIONES_PARED);
  cierto('ninguna portada real medida cabe bajo el corte',
    reales.every((s) => s.peticiones > m.MAX_PETICIONES_PARED));

  /* --- 2. lo que rompe la regla vieja: el banco que SÍ vimos ------- */
  for (const [nombre, dominio, peticiones] of [['itau', 'itau.cl', 119], ['scotiabank', 'scotiabank.cl', 212]]) {
    const med = medida26(nombre);
    eq(`${dominio}: ${peticiones} peticiones, o sea la portada entera`, med.tras2.peticiones.length, peticiones);
    cierto(`${dominio}: con al menos una cookie de gestor de bots en su propio dominio`,
      med.tras2.cookies.some((c) => m.esCookieDePortero(c.name) && /(^|\.)(itau|scotiabank)\.cl$/.test(String(c.domain).replace(/^\./, ''))));
    // Y el veredicto: no es una pared. Es el sitio.
    eq(`${dominio}: no se declina`, m.pareceBloqueo({
      peticiones: med.tras2.peticiones, cookies: med.tras2.cookies, letras: med.letras,
      titulo: med.titulo, texto: med.texto, urlFinal: med.urlFinal, dominio,
    }), null);
    const r = m.armarInforme(med, dominio);
    eq(`${dominio}: y recibe informe`, r.bloqueado, null);
    cierto(`${dominio}: con puntaje`, typeof r.puntaje === 'number');
  }

  /* --- 3. la cookie corriente al lado ya no desarma la pared ------- */
  // El agujero que el revisor dejó anotado. La base es la medición de la pared; lo único que
  // se agrega es UNA cookie de las más comunes que hay, con un nombre que no se inventó: es
  // la que escribe uhc.cl, uno de los cinco prospectos del §22.
  const pared = medida26('santander');
  const comoEstaba = {
    peticiones: pared.tras2.peticiones, cookies: pared.tras2.cookies, letras: pared.letras,
    titulo: pared.titulo, texto: pared.texto, urlFinal: pared.urlFinal, dominio: 'www.santander.cl',
  };
  eq('la pared medida el 26-sep sigue siendo la misma', pared.tras2.peticiones.length, 8);
  eq('y se reconoce', m.pareceBloqueo(comoEstaba), 'portero');
  const corriente = medida('uhc').tras2.cookies[0].name;
  eq('la cookie corriente que se le pone al lado es una real', corriente, 'pll_language');
  eq('con una cookie corriente al lado, la pared sigue siendo una pared', m.pareceBloqueo({
    ...comoEstaba, cookies: [...pared.tras2.cookies, { name: corriente, domain: '.santander.cl' }],
  }), 'portero');
  // Y con cinco más, tampoco: el "todas" ya no manda.
  eq('ni con cinco al lado', m.pareceBloqueo({
    ...comoEstaba,
    cookies: [...pared.tras2.cookies, ...['_ga', '_gid', 'PHPSESSID', 'modalVisto', 'carrito']
      .map((n) => ({ name: n, domain: '.santander.cl' }))],
  }), 'portero');

  /* --- 4. y el gestor que no está en la lista tampoco se escapa ---- */
  // La prueba de que el catálogo dejó de ser lo que decide. Misma pared medida, con las dos
  // cookies renombradas a algo que no reconocemos: ya no se puede nombrar al guardia, así
  // que el motivo cambia de palabras — pero el informe sigue sin poder salir en verde.
  const desconocido = m.pareceBloqueo({
    ...comoEstaba,
    cookies: pared.tras2.cookies.map((c) => ({ ...c, name: 'guardia_que_no_conocemos_' + c.name.length })),
  });
  falso('un gestor que no está en la lista ya no se llama portero', desconocido === 'portero');
  eq('pero la pared se reconoce igual, por la forma de la página', desconocido, 'flaco');
  const rDesc = m.armarInforme({
    ...pared,
    tras1: { ...pared.tras1, cookies: pared.tras1.cookies.map((c) => ({ ...c, name: 'xx_' + c.name })) },
    tras2: { ...pared.tras2, cookies: pared.tras2.cookies.map((c) => ({ ...c, name: 'xx_' + c.name })) },
  }, 'www.santander.cl');
  falso('y ningún ítem sale en verde', rDesc.items.some((i) => i.ok));
  eq('ni hay puntaje', rDesc.puntaje, null);

  /* --- 5. lo que ya cuidaba esta sección y sigue valiendo ---------- */
  const unas = (nombres, dominio) => nombres.map((n) => ({ name: n, domain: dominio }));
  const muchas = new Array(20).fill(0).map((_, i) => ({ url: 'https://ejemplo.cl/x' + i }));

  // hotelescumbres.cl deja UNA sola cookie y es el cf_clearance de asksuite.com, el chat que
  // tiene incrustado. Es un sitio que vimos entero, con 82 peticiones y Google Analytics
  // cargando y enviando. Sin el requisito del dominio propio se declinaba solo.
  eq('el cf_clearance de un tercero NO es el portero de este sitio', m.pareceBloqueo({
    peticiones: muchas, cookies: unas(['cf_clearance'], '.asksuite.com'), letras: 300, dominio: 'hotelescumbres.cl',
  }), null);
  eq('y el caso real del banco tampoco se declina',
    m.armarInforme({ ...cumbres, aviso: { avisos: [], marcosIlegibles: [] } }, 'hotelescumbres.cl').bloqueado, null);

  // Sin cookies no hay portero: eso es otro caso, y lo resuelven las otras puertas.
  falso('cero cookies no es portero', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 300, dominio: 'ejemplo.cl',
  }) === 'portero');
  // Y una página entera con cookies de gestor NO es una pared, que es justo lo que esta
  // sección afirmaba al revés hasta hoy.
  eq('una página entera con cookies de Akamai no es una pared', m.pareceBloqueo({
    peticiones: muchas, cookies: unas(['_abck', 'bm_sz'], '.ejemplo.cl'), letras: 4000, dominio: 'ejemplo.cl',
  }), null);
}

/* ================================================================== */
console.log('=== 24. las otras dos puertas nuevas: el texto en pantalla y la ruta final ===');
{
  const muchas = new Array(20).fill(0).map((_, i) => ({ url: 'https://ejemplo.cl/x' + i }));
  eq('el texto de una pared de Imperva', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 300, dominio: 'ejemplo.cl',
    texto: 'Request unsuccessful. Incapsula incident ID: 123-456',
  }), 'bloqueo');
  eq('la de Cloudflare, con tilde y todo', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 300, dominio: 'ejemplo.cl',
    texto: 'Verificando que eres un humano. Esto puede tardar unos segundos.',
  }), 'bloqueo');
  // El tope de 1500 es lo que impide que la frase suelta en una portada larga cuente.
  eq('en un texto largo, la misma frase no cuenta', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 9000, dominio: 'ejemplo.cl',
    texto: 'Hacemos comprobación de seguridad para empresas. ' + 'Texto real de la portada. '.repeat(80),
  }), null);
  eq('la ruta de fuera de línea', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 4000, dominio: 'ejemplo.cl',
    urlFinal: 'https://ejemplo.cl/fueradelinea/',
  }), 'bloqueo');
  eq('y la de mantenimiento', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 4000, dominio: 'ejemplo.cl',
    urlFinal: 'https://ejemplo.cl/maintenance',
  }), 'bloqueo');
  // Y el falso positivo obvio: una ruta que solo CONTIENE la palabra.
  eq('una ruta que solo la contiene, no', m.pareceBloqueo({
    peticiones: muchas, cookies: [], letras: 4000, dominio: 'ejemplo.cl',
    urlFinal: 'https://ejemplo.cl/blog/mantenimiento-de-piscinas/',
  }), null);
}

/* ================================================================== */
console.log('=== 25. el sitio que no terminó de cargar no puede salir en verde ===');
{
  // Decisión del coordinador (25-sep). Antes, un sitio que nunca disparó el evento de carga
  // salía con "no vimos cargar ningún rastreador" en VERDE, que es una afirmación sobre el
  // sitio hecha con lo poco que alcanzamos a mirar.
  const vacio = { ms: 18000, peticiones: [{ url: 'https://sitio.cl/' }, { url: 'https://sitio.cl/a.css' }], cookies: [] };
  const base = { urlFinal: 'https://sitio.cl/', titulo: 'Sitio', texto: 'Hola', letras: 4000,
    msTotal: 18000, tras1: vacio, tras2: vacio, aviso: { avisos: [], marcosIlegibles: [] } };

  const entero = m.armarInforme({ ...base, parcial: false }, 'sitio.cl');
  eq('con la carga completa, carga va en verde', entero.items.find((i) => i.id === 'carga').estado, 'ok');
  eq('y envío también', entero.items.find((i) => i.id === 'envio').estado, 'ok');

  const corto = m.armarInforme({ ...base, parcial: true }, 'sitio.cl');
  eq('sin evento de carga, carga baja a sin-confirmar', corto.items.find((i) => i.id === 'carga').estado, 'sin-confirmar');
  eq('y envío también', corto.items.find((i) => i.id === 'envio').estado, 'sin-confirmar');
  falso('ninguno de los dos va en verde',
    corto.items.filter((i) => ['carga', 'envio'].includes(i.id)).some((i) => i.ok));
  cierto('y dicen por qué, sin culpar a nadie',
    /no terminó de cargar/.test(corto.items.find((i) => i.id === 'carga').detalle));
  cierto('sin contarlo en contra',
    /ni a favor ni en contra/.test(corto.items.find((i) => i.id === 'envio').detalle));
  // 26-sep: faltaba el tercero. La decisión era sobre lo que no sabemos, y de un sitio que
  // nunca disparó el evento de carga tampoco sabemos qué cookies MÁS iba a escribir: "no
  // dejó ninguna cookie" es la misma afirmación hecha con lo poco que alcanzamos a mirar, y
  // salía en VERDE. Lo que sí se sigue leyendo es el aviso, que se mira con los ojos y no
  // con el reloj: o apareció mientras estuvimos ahí, o no apareció.
  eq('el ítem de cookies tampoco puede ir en verde',
    corto.items.find((i) => i.id === 'cookies').estado, 'sin-confirmar');
  falso('ninguno de los tres verbos va en verde',
    corto.items.filter((i) => ['carga', 'cookies', 'envio'].includes(i.id)).some((i) => i.ok));
  eq('los 10 de los tres verbos salen del denominador', corto.pesoConfirmado, 3);
  eq('y queda contando solo el aviso',
    corto.items.filter((i) => i.estado !== 'sin-confirmar').map((i) => i.id), ['aviso']);
  // Y con 3 de 13 confirmados ya no se muestra número: es menos de la mitad del peso. Un
  // sitio que no terminó de cargar deja de tener nota, que es justo lo que corresponde.
  eq('y sin la mitad del peso, no hay número', corto.puntaje, null);
  cierto('pero sí se explica en el canal informativo',
    corto.informativos.some((i) => i.id === 'parcial'));

  // Y si algo SÍ cargó, se informa igual: lo parcial nunca borra lo que se vio.
  const conRastreador = {
    ms: 18000,
    peticiones: [{ url: 'https://www.googletagmanager.com/gtag/js?id=G-ABC', ms: 900 }],
    cookies: [{ name: '_ga', domain: '.sitio.cl' }],
  };
  const visto = m.armarInforme({ ...base, parcial: true, tras1: conRastreador, tras2: conRastreador }, 'sitio.cl');
  eq('lo que cargó se sigue informando', visto.items.find((i) => i.id === 'carga').estado, 'pendiente');
  eq('y la cookie que dejó también', visto.items.find((i) => i.id === 'cookies').estado, 'pendiente');
}

/* ================================================================== */
console.log('=== 26. la cookie que no entendemos no suma NI resta ===');
{
  // Decisión del coordinador (25-sep). Costaba 3 de peso y encendía el botón del kit mientras
  // el texto decía "No sabemos para qué sirve cada una". El hecho confirmado se queda en el
  // ítem; la duda se va al arreglo; el puntaje no la toca.
  const con = (cookies) => {
    const t = { ms: 18000, peticiones: [{ url: 'https://sitio.cl/' }, { url: 'https://sitio.cl/a.css' }], cookies };
    return m.armarInforme({ urlFinal: 'https://sitio.cl/', titulo: 'Sitio', texto: 'Hola', letras: 4000,
      msTotal: 18000, parcial: false, tras1: t, tras2: t, aviso: { avisos: [], marcosIlegibles: [] } }, 'sitio.cl');
  };

  const una = con([{ name: 'visitorId', domain: '.otracosa.com' }]);
  const it = una.items.find((i) => i.id === 'cookies');
  eq('el ítem queda sin confirmar', it.estado, 'sin-confirmar');
  falso('no va en verde', it.ok);
  eq('y sale del denominador', una.pesoConfirmado, 10);
  // El hecho, entero y en el ítem.
  cierto('el hecho confirmado está escrito', /antes de que nadie diera permiso/.test(it.detalle));
  cierto('con el nombre y el dominio', /visitorId \(otracosa\.com\)/.test(it.detalle));
  // La duda, fuera del ítem.
  falso('la duda ya no está en el ítem', /No sabemos para qué sirve/.test(it.detalle));
  cierto('la duda está en el arreglo', /No sabemos para qué sirve/.test(it.arreglo));

  // 3. Concordancia. Decía "pero sí quedaron 1 de otros dominios", sin sustantivo.
  cierto('una cookie, en singular y con su sustantivo', /Sí quedó 1 cookie de otro dominio/.test(it.detalle));
  falso('y ya no dice "quedaron 1 de otros dominios"', /quedaron 1 /.test(it.detalle));
  cierto('el arreglo también concuerda', /No sabemos para qué sirve: /.test(it.arreglo));
  const dos = con([{ name: 'a', domain: '.uno.com' }, { name: 'b', domain: '.dos.com' }]);
  const it2 = dos.items.find((i) => i.id === 'cookies');
  cierto('dos cookies, en plural', /Sí quedaron 2 cookies de otros dominios/.test(it2.detalle));
  cierto('y el arreglo en plural', /No sabemos para qué sirve cada una/.test(it2.arreglo));
}

/* ================================================================== */
console.log('=== 27. sgfertility.com no es un sitio medido: es una medición fallida ===');
{
  // Estaba en el banco del §20 como si fuera un sitio más. No lo es: la navegación murió con
  // ERR_SSL_PROTOCOL_ERROR y lo que quedó guardado es la página de error de Chrome
  // (4 peticiones, tres de ellas data: URIs del propio Chrome, y urlFinal chrome-error://).
  const j = leer('ev1/cdp-sgfertility.json');
  eq('la medición terminó en la página de error de Chrome', j.urlFinal, 'chrome-error://chromewebdata/');
  cierto('y el texto lo dice', /ERR_SSL_PROTOCOL_ERROR/.test(j.bodyTextHead));

  // EN PRODUCCIÓN no llega nunca a armarInforme: el portón rechaza chrome-error:// y el guion
  // devuelve una falla. Eso es lo que hay que comprobar, no un informe sobre la nada.
  const { destinoPermitido } = await import(RUTA_MODULO.replace(/profundo\.js$/, 'chequeo.js'));
  falso('chrome-error:// no pasa el portón de destinos', destinoPermitido(j.urlFinal));
  const fallo = m.armarInforme({ fallo: 'navegador' }, 'sgfertility.com');
  falso('y viaja como falla, no como informe', fallo.ok);
  eq('con la clave de la falla', fallo.clave, 'navegador');
  falso('sin afirmar nada sobre el sitio', /limpio|sin rastreadores|no dejó/.test(fallo.error));

  // Y la afirmación que faltaba: con los restos de esa medición, esto NO puede salir 100.
  const restos = desdeTxt('ev1/requests-sgfertility.txt', 'ev1/cdp-sgfertility.json');
  const r = m.armarInforme({ ...restos, aviso: { avisos: [], marcosIlegibles: [] } }, 'sgfertility.com');
  falso('los restos no dan 100', r.puntaje === 100);
  eq('ni dan ningún puntaje', r.puntaje, null);
  eq('porque se reconocen como página flaca', r.bloqueado, 'flaco');
}

/* ================================================================== */
console.log('=== 28. el catálogo creció, y lo que queda fuera sigue sin poder salir en verde ===');
{
  // El catálogo eran 10 entradas y eso es un techo: un sitio con HubSpot o Matomo y nada más
  // salía 100/100. Los seis que entraron el 25-sep están comprobados con URLs reales.
  eq('el catálogo tiene 16 entradas', m.RASTREADORES.length, 16);
  eq('sin claves repetidas', new Set(m.RASTREADORES.map((r) => r.clave)).size, 16);
  cierto('todas con nombre', m.RASTREADORES.every((r) => typeof r.nombre === 'string' && r.nombre.length > 1));

  const pide = (url) => m.clasificarRastreadores([{ url, ms: 100 }], []).map((h) => h.clave);
  eq('HubSpot, de patagoniacamp.com', pide('https://js.hs-scripts.com/50412325.js?integration=WordPress'), ['hubspot']);
  eq('Matomo, del mismo sitio', pide('https://www.patagoniacamp.com/wp-content/plugins/matomo/app/matomo.js'), ['matomo']);
  eq('Segment, de awasi.com', pide('https://cdn.segment.com/analytics.js/v1/c77UfR3/analytics.min.js'), ['segment']);
  eq('Pinterest, de skinology.cl', pide('https://ct.pinterest.com/v3/?cb=1790201914571'), ['pinterest']);
  eq('Criteo', pide('https://static.criteo.net/js/ld/ld.js'), ['criteo']);
  eq('Intercom', pide('https://widget.intercom.io/widget/abc123'), ['intercom']);

  // Y el guardia estructural, que es lo que hace que el catálogo no tenga que ser completo:
  // un tercero que no reconocemos y que escribió su cookie deja el ítem FUERA del verde.
  const t = {
    ms: 18000,
    peticiones: [{ url: 'https://sitio.cl/' }, { url: 'https://rastreador-que-no-conocemos.io/t.js', ms: 400 }],
    cookies: [{ name: 'rqnc_uid', domain: '.rastreador-que-no-conocemos.io' }],
  };
  const r = m.armarInforme({ urlFinal: 'https://sitio.cl/', titulo: 'Sitio', texto: 'Hola', letras: 4000,
    msTotal: 18000, parcial: false, tras1: t, tras2: t, aviso: { avisos: [], marcosIlegibles: [] } }, 'sitio.cl');
  eq('no lo reconocemos como rastreador', r.rastreadores.length, 0);
  eq('pero el ítem de cookies no sale en verde', r.items.find((i) => i.id === 'cookies').estado, 'sin-confirmar');
  falso('y el informe no puede dar 100', r.puntaje === 100);
  // Y sí se dice con quién habló, que es el dato que el dueño puede usar.
  cierto('el canal informativo lo nombra',
    r.informativos.some((i) => i.id === 'terceros' && /rastreador-que-no-conocemos\.io/.test(i.detalle)));
}

/* ================================================================== */
console.log('=== 29. "Volver a medirlo": rehacer=1 se salta la caché y NADA más ===');
{
  // La portada tiene el botón desde que la caché se declara en pantalla, y manda `rehacer=1`.
  // La función lo ignoraba: devolvía la misma medición guardada y la portada tenía que
  // explicar que no, que seguía siendo la de antes. Quien arreglaba su sitio a las 9 y volvía
  // a las 10 apretaba el botón y seguía viendo el informe de ayer.
  //
  // Lo que se salta es la LECTURA de la caché. Los dos contadores siguen en pie, y eso es lo
  // que impide que `rehacer=1` sea la puerta por la que se pide navegador sin límite.
  const hoy = new Date().toISOString().slice(0, 10);
  const kvFalso = (inicial = {}) => {
    const d = new Map(Object.entries(inicial));
    return { d, async get(k, o) { const v = d.get(k); return v === undefined ? null : (o?.type === 'json' ? JSON.parse(v) : v); },
      async put(k, v) { d.set(k, v); } };
  };
  const nunca = () => { throw new Error('no se debió abrir el navegador'); };
  const viejo = { ok: true, dominio: 'ejemplo.cl', puntaje: 7, items: [], revisadoEn: '2026-09-24T12:00:00.000Z' };

  // Sin rehacer, la caché manda: es el 90% de las consultas y el ahorro más grande de los tres.
  const kvA = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(viejo) });
  const sin = await m.profundo('ejemplo.cl', { VYC_TOPES: kvA }, { ip: '5.5.5.5', abrirCliente: nunca });
  cierto('sin rehacer sale de la caché', sin.deCache);
  eq('con el informe guardado', sin.puntaje, 7);

  // Con rehacer, la caché NO se lee: se abre el navegador. Acá el navegador falla a propósito,
  // que es la forma barata de comprobar que se intentó abrirlo.
  const kvB = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(viejo) });
  const conFallo = await m.profundo('ejemplo.cl', { VYC_TOPES: kvB }, {
    ip: '6.6.6.6',
    rehacer: true,
    abrirCliente: () => { throw new m.FallaDeRevision('sin-permiso', 'la API contestó 401'); },
  });
  falso('con rehacer no sale de la caché', conFallo.deCache);
  eq('se intentó abrir el navegador de verdad', conFallo.clave, 'sin-permiso');
  eq('y el intento gastó cupo, como cualquier otra revisión', kvB.d.get(`tope:ip:${hoy}:6.6.6.6`), '1');
  // Una medición que falló no pisa la que había: el visitante se queda sin informe nuevo, no
  // con uno peor.
  eq('la medición guardada sigue intacta', JSON.parse(kvB.d.get('cache:ejemplo.cl')).puntaje, 7);

  // Los topes van ANTES del navegador, con rehacer y sin rehacer. Si esto se invierte alguna
  // vez, `rehacer=1` pasa a ser un navegador remoto abierto al mundo.
  const kvC = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(viejo), [`tope:ip:${hoy}:7.7.7.7`]: '20' });
  const topeado = await m.profundo('ejemplo.cl', { VYC_TOPES: kvC }, { ip: '7.7.7.7', rehacer: true, abrirCliente: nunca });
  eq('el tope por IP corta igual', topeado.clave, 'tope-ip');
  falso('y no se cae de vuelta a la caché para disimular', topeado.ok);
  const kvD = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(viejo), [`tope:global:${hoy}`]: '80' });
  eq('el global también',
    (await m.profundo('ejemplo.cl', { VYC_TOPES: kvD }, { ip: '8.8.8.8', rehacer: true, abrirCliente: nunca })).clave, 'cuota');

  // Y la vuelta entera, con un navegador de mentira que habla CDP: la medición nueva llega,
  // reemplaza a la guardada, y el siguiente visitante ve la fresca.
  const cliente = navegadorDeMentira({
    url: 'https://ejemplo.cl/',
    peticiones: [
      { url: 'https://ejemplo.cl/' },
      { url: 'https://www.googletagmanager.com/gtag/js?id=G-XYZ' },
      { url: 'https://www.google-analytics.com/g/collect?v=2&tid=G-XYZ', metodo: 'POST' },
    ],
    cookies: [{ name: '_ga', domain: '.ejemplo.cl' }],
    aviso: { avisos: [], marcosIlegibles: [], titulo: 'Ejemplo', texto: 'Una portada de verdad, con su texto.', letras: 4200 },
  });
  const kvE = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(viejo) });
  const fresco = await m.profundo('ejemplo.cl', { VYC_TOPES: kvE }, {
    ip: '9.1.1.1', rehacer: true, pasivoMs: 5, gestoMs: 5, abrirCliente: async () => cliente,
  });
  cierto('la medición nueva llega como informe', fresco.ok);
  falso('y no viene marcada como de caché', fresco.deCache);
  cierto('es una medición de verdad, no los restos de la vieja', fresco.items.length > 0);
  cierto('con Google Analytics encontrado', fresco.rastreadores.some((r) => /analytics/i.test(r.nombre)));
  falso('y no es el puntaje que estaba guardado', fresco.puntaje === 7);
  eq('la caché quedó pisada con la nueva', JSON.parse(kvE.d.get('cache:ejemplo.cl')).puntaje, fresco.puntaje);
  cierto('el navegador se cerró al terminar', cliente.cerrado);
  cierto('y se abrió un contexto nuevo, sin las cookies de la revisión anterior',
    cliente.llamadas.includes('Target.createBrowserContext'));

  // El endpoint: 'rehacer=1' exacto, no "hay algo escrito ahí". Es el parámetro que decide si
  // se abre un navegador, así que se lee como una llave. Sin binding de navegador la revisión
  // nueva muere en 'sin-configurar', y esa diferencia con `deCache` es justo lo que se mira.
  const pedir = async (query) => {
    const kv = kvFalso({ 'cache:ejemplo.cl': JSON.stringify(viejo) });
    const r = await m.onRequestGet({
      request: { url: 'https://verifica.spindlelab.cl/api/profundo?dominio=ejemplo.cl' + query, headers: { get: () => null } },
      env: { VYC_TOPES: kv },
    });
    return JSON.parse(await r.text());
  };
  cierto('sin el parámetro, caché', (await pedir('')).deCache);
  falso('con rehacer=1, no', (await pedir('&rehacer=1')).deCache);
  eq('y se fue a abrir el navegador', (await pedir('&rehacer=1')).clave, 'sin-configurar');
  cierto('rehacer=0 no cuenta', (await pedir('&rehacer=0')).deCache);
  cierto('rehacer=si tampoco', (await pedir('&rehacer=si')).deCache);
  cierto('ni rehacer a secas', (await pedir('&rehacer')).deCache);
}

/* ================================================================== */
console.log('=== 30. concordancia: el ítem de cookies se lee como lo escribiría una persona ===');
{
  // Las dos frases salían mal en prospectos REALES, de la lista a la que le escribimos:
  // garciaparot.cl, con una sola cookie propia, leía "Las 1 que escribió son de tu propio
  // dominio"; revitalaser.cl, con el _fbp que el Pixel de Meta deja al mover el mouse
  // (medido el 23-sep, el mismo caso del §14), leía "Quedaron escritas la cookie _fbp".
  //
  // Lo que se afirma acá es CASTELLANO, no lo que el código devuelve hoy: ninguna de estas
  // frases puede aparecer en un informe, la escriba quien la escriba y cambie como cambie
  // la redacción. Por eso la lista es de frases prohibidas y se pasa por informes enteros.
  const PROHIBIDO = [
    [/\bLas 1 /, 'un plural con el número 1 ("Las 1 …")'],
    [/\bLos 1 /, 'un plural con el número 1 ("Los 1 …")'],
    [/Quedaron escritas la cookie\b/, 'plural con sustantivo en singular'],
    [/Quedó escrita las cookies\b/, 'singular con sustantivo en plural'],
    [/\bquedaron 1 /, '"quedaron 1 …"'],
    [/\bquedó 1 cookies\b/, '"quedó 1 cookies"'],
  ];
  const revisar = (que, r) => {
    const texto = JSON.stringify(r.items) + JSON.stringify(r.informativos);
    for (const [re, nombre] of PROHIBIDO) falso(`${que}: sin ${nombre}`, re.test(texto));
  };

  // Primero, los cinco prospectos reales del §22, tal como fueron medidos.
  for (const nombre of ['tuane', 'uhc', 'hjmc', 'pdnd', 'zarhi']) {
    revisar(nombre + '.cl', m.armarInforme(medida(nombre), nombre + '.cl'));
  }
  // uhc.cl escribió dos cookies propias, así que ahí el plural es el correcto.
  cierto('uhc.cl, con dos cookies propias, va en plural',
    /Las 2 que escribió son de tu propio dominio/.test(
      m.armarInforme(medida('uhc'), 'uhc.cl').items.find((i) => i.id === 'cookies').detalle));

  const conCookies = (cookies, peticiones) => m.armarInforme({
    urlFinal: 'https://sitio.cl/', titulo: 'Sitio', texto: 'Hola', letras: 4000, msTotal: 18000,
    parcial: false,
    tras1: { ms: 18000, peticiones, cookies }, tras2: { ms: 18000, peticiones, cookies },
    aviso: { avisos: [], marcosIlegibles: [] },
  }, 'sitio.cl');
  const itemCookies = (r) => r.items.find((i) => i.id === 'cookies');

  // Una sola cookie propia: el caso de garciaparot.cl. El nombre es uno real, de uhc.cl.
  const unaPropia = conCookies([{ name: 'pll_language', domain: 'sitio.cl' }],
    [{ url: 'https://sitio.cl/' }, { url: 'https://sitio.cl/a.css' }]);
  eq('una cookie propia: el ítem sigue en verde', itemCookies(unaPropia).estado, 'ok');
  cierto('y se dice en singular',
    /La única que escribió es de tu propio dominio/.test(itemCookies(unaPropia).detalle));
  revisar('una cookie propia', unaPropia);

  // Una sola cookie de rastreo: el _fbp de revitalaser.cl.
  const pixel = [{ url: 'https://sitio.cl/' },
    { url: 'https://connect.facebook.net/es_LA/fbevents.js', ms: 900 }];
  const unRastreador = conCookies([{ name: '_fbp', domain: '.sitio.cl' }], pixel);
  eq('una cookie de rastreo: el ítem queda pendiente', itemCookies(unRastreador).estado, 'pendiente');
  cierto('y se dice en singular',
    /Quedó escrita la cookie _fbp sin que nadie diera permiso/.test(itemCookies(unRastreador).detalle));
  revisar('una cookie de rastreo', unRastreador);

  // Dos, para que el singular no se haya arreglado rompiendo el plural.
  const dosRastreadores = conCookies(
    [{ name: '_fbp', domain: '.sitio.cl' }, { name: '_ga', domain: '.sitio.cl' }],
    pixel.concat([{ url: 'https://www.googletagmanager.com/gtag/js?id=G-ABC', ms: 950 }]));
  cierto('dos cookies de rastreo: plural',
    /Quedaron escritas las cookies /.test(itemCookies(dosRastreadores).detalle));
  revisar('dos cookies de rastreo', dosRastreadores);
}

/* ================================================================== */
console.log('=== 31. los cinco prospectos reales, con la carga a medias, no salen en verde ===');
{
  // Los mismos cinco del §22 con `parcial: true`, que es lo que devuelve el medidor cuando
  // el evento de carga nunca llega. Hasta el 26-sep los cinco mostraban el ítem de cookies
  // en verde, incluidos uhc.cl y hjmc.cl, que sí alcanzaron a escribir cookies propias.
  for (const nombre of ['tuane', 'uhc', 'hjmc', 'pdnd', 'zarhi']) {
    const r = m.armarInforme({ ...medida(nombre), parcial: true }, nombre + '.cl');
    const it = r.items.find((i) => i.id === 'cookies');
    eq(`${nombre}.cl: el ítem de cookies queda sin confirmar`, it.estado, 'sin-confirmar');
    falso(`${nombre}.cl: y no en verde`, it.ok);
    falso(`${nombre}.cl: ya no afirma que no dejó ninguna cookie`,
      /no dejó ninguna cookie/.test(it.detalle));
    cierto(`${nombre}.cl: dice qué es lo que no sabemos`,
      /no sabemos qué otras cookies iba a escribir/.test(it.detalle));
    cierto(`${nombre}.cl: y que no se cuenta`, /ni a favor ni en contra/.test(it.detalle));
    eq(`${nombre}.cl: fuera del puntaje`, r.pesoConfirmado, 3);
    eq(`${nombre}.cl: y sin número`, r.puntaje, null);
  }
  // Lo que sí alcanzamos a ver se sigue diciendo: no es lo mismo "no vimos nada" que "vimos
  // dos cookies tuyas y no sabemos si venían más".
  cierto('uhc.cl: se nombra lo que sí se alcanzó a ver',
    /Alcanzamos a ver 2 cookies, y todas son de tu propio dominio/.test(
      m.armarInforme({ ...medida('uhc'), parcial: true }, 'uhc.cl').items.find((i) => i.id === 'cookies').detalle));
  cierto('pdnd.cl: y cuando no se vio ninguna, se dice así',
    /Hasta donde alcanzamos a mirar, no quedó ninguna cookie/.test(
      m.armarInforme({ ...medida('pdnd'), parcial: true }, 'pdnd.cl').items.find((i) => i.id === 'cookies').detalle));
}

/* ================================================================== */
console.log('=== 32. el verde de cookies dice lo que sabe, y no más ===');
{
  // EL HALLAZGO, abierto desde el 25-sep. De los tres ítems que pueden salir en verde, este
  // era el único que afirmaba en absoluto: "tu sitio no dejó ninguna cookie de rastreo ni de
  // terceros". Los otros dos se acotan solos ("ningún rastreador conocido DE LOS QUE
  // BUSCAMOS"), que es lo único que de verdad sabemos: lo que hay en nuestro catálogo.
  //
  // Y la puerta de escape para el rastreador que no está en el catálogo (§26 y §28) solo
  // existe para cookies de OTRO dominio. Una cookie de rastreo de PRIMERA PARTE que no
  // reconocemos entra por acá y sale en verde.
  //
  // LO QUE SE ARREGLÓ ES LA FRASE, NO EL ESTADO. Un sitio genuinamente limpio tiene que
  // poder salir en verde o el producto no dice nada. Lo que no puede es afirmar sobre todas
  // las cookies del mundo lo que solo sabe de las suyas.
  //
  // Los nombres con los que se comprueba NO se inventaron acá ni se copiaron de un informe:
  // se LEEN del censo del 26-sep, y solo se toman los que quedaron escritos en el dominio
  // del propio sitio que los escribió, que es lo que hace al caso.
  const censo = medida26('censo');
  const FAMILIAS = [
    ['Yandex Metrica', /^_ym_/],
    ['RTB House', /^__rtbh\./],
    ['VWO', /^_vwo_|^_vis_opt_/],
    ['Convert', /^_conv_[vs]$/],
    ['Dynatrace', /^dtCookie/],
  ];
  // Cookie del censo que es de PRIMERA PARTE: su dominio es el registrable del sitio.
  const propiasDelCenso = censo.sitios.flatMap((s) => s.nombresDeCookies.map((x) => {
    const i = x.lastIndexOf('@');
    return { sitio: s.dominio, nombre: x.slice(0, i), dominio: x.slice(i + 1).replace(/^\./, '') };
  }).filter((c) => c.dominio === s.dominio || c.dominio.endsWith('.' + s.dominio)));

  const rastreoNoReconocido = [];
  for (const [quien, re] of FAMILIAS) {
    const hallazgos = propiasDelCenso.filter((c) => re.test(c.nombre));
    cierto(`${quien}: medido como cookie de primera parte en el censo del 26-sep`, hallazgos.length > 0);
    // Y la mitad que hace el falso verde: no está en nuestro catálogo.
    eq(`${quien}: y no lo reconocemos como rastreador`,
      m.clasificarRastreadores([], hallazgos.map((c) => ({ name: c.nombre, domain: '.' + c.sitio }))).length, 0);
    rastreoNoReconocido.push(...new Set(hallazgos.map((c) => c.nombre)));
  }
  cierto('son varias, de cinco productos distintos', rastreoNoReconocido.length >= 8);
  // Las de wom.cl están entre ellas, que es el caso que el hallazgo nombraba.
  cierto('con las de RTB House y Convert de www.wom.cl adentro',
    ['__rtbh.lid', '__rtbh.uid', '_conv_v', '_conv_s'].every((n) => rastreoNoReconocido.includes(n)));

  // La base es un prospecto REAL cuyo ítem de cookies sale en verde hoy: uhc.cl, del §22.
  const limpio = medida('uhc');
  const itemCookies = (r) => r.items.find((i) => i.id === 'cookies');
  const rLimpio = m.armarInforme(limpio, 'uhc.cl');
  eq('uhc.cl: el ítem de cookies sale en verde', itemCookies(rLimpio).estado, 'ok');

  /* --- 1. la frase, en el informe que de verdad se le manda -------- */
  falso('y ya no afirma que no dejó ninguna cookie de rastreo',
    /no dejó ninguna cookie de rastreo/.test(itemCookies(rLimpio).detalle));
  cierto('se acota al catálogo, como los otros dos',
    /rastreadores que buscamos/.test(itemCookies(rLimpio).detalle));
  // Lo de terceros SÍ está confirmado y se sigue diciendo entero: si hubiera quedado una
  // cookie de otro dominio, el informe habría salido por la rama del §26.
  cierto('lo de los terceros sí se afirma, porque eso sí lo sabemos',
    /no dejó ninguna cookie de otro dominio/.test(itemCookies(rLimpio).detalle));

  /* --- 2. la misma regla en los CUATRO verdes ---------------------- */
  // El invariante que impide que vuelva a pasar: un ítem en verde que hable de rastreadores
  // tiene que decir de cuáles habla.
  //
  // Hasta el 26-sep este bucle recorría un solo informe, el de uhc.cl, donde los verdes son
  // tres: carga, cookies y envío. El cuarto ítem que puede salir en verde es el del aviso, y
  // en uhc.cl no sale (no tiene banner), así que el bucle nunca lo miraba y el invariante
  // pasaba SIN COMPROBARLO. Y ese verde decía "no corrió ningún rastreador", en absoluto,
  // que es exactamente la frase que este §32 existe para prohibir.
  //
  // Un invariante que no dice sobre cuántos casos corrió no es un invariante: es una
  // casualidad. Por eso ahora se recorren varios informes Y se exige que entre todos hayan
  // salido los cuatro verdes; si mañana aparece un quinto ítem verde y nadie lo agrega acá,
  // la cuenta no calza y esto falla.
  //
  // El informe con el aviso en verde se compone de dos mediciones reales: el sitio es uhc.cl
  // tal como se midió el 25-sep (limpio, sin nada de nuestro catálogo) y el aviso es el que
  // terrado.cl tiene de verdad, con sus botones "RECHAZAR" y "ACEPTAR", anotados en el
  // banco del 23-sep. Ninguno de los dos se inventó acá.
  const avisoDeTerrado = {
    avisos: [{ fuente: 'elemento', texto: 'Uso de cookies', botones: ['RECHAZAR', 'ACEPTAR'],
      tieneBotonDeConsentimiento: true }],
    marcosIlegibles: [],
  };
  const rConAviso = m.armarInforme({ ...limpio, aviso: avisoDeTerrado }, 'uhc.cl');
  eq('con un banner real encima, uhc.cl saca el aviso en verde',
    rConAviso.items.find((i) => i.id === 'aviso').estado, 'ok');

  const verdesVistos = new Set();
  for (const r of [rLimpio, rConAviso]) {
    for (const it of r.items) {
      if (!it.ok) continue;
      verdesVistos.add(it.id);
      if (!/rastreador/i.test(it.detalle)) continue;
      cierto(`el verde de "${it.id}" dice de qué rastreadores habla`,
        /que buscamos/.test(it.detalle));
    }
  }
  eq('y se miraron los cuatro verdes, no tres', [...verdesVistos].sort().join(','),
    'aviso,carga,cookies,envio');

  // Y la misma contradicción medida del §32, ahora sobre el verde del aviso: con las cookies
  // de rastreo de primera parte del censo puestas encima, el ítem sigue en verde (bien: no
  // vimos ningún rastreador de los nuestros) pero ya no puede decirlo en absoluto, porque
  // ahí mismo, en la medición de la que salió, hay ocho cookies de rastreo.
  const conAvisoYRastreo = m.armarInforme({
    ...limpio,
    aviso: avisoDeTerrado,
    tras1: { ...limpio.tras1, cookies: [...limpio.tras1.cookies, ...rastreoNoReconocido.map((n) => ({ name: n, domain: '.uhc.cl' }))] },
    tras2: { ...limpio.tras2, cookies: [...limpio.tras2.cookies, ...rastreoNoReconocido.map((n) => ({ name: n, domain: '.uhc.cl' }))] },
  }, 'uhc.cl');
  const elAviso = conAvisoYRastreo.items.find((i) => i.id === 'aviso');
  eq('el aviso sigue en verde', elAviso.estado, 'ok');
  falso('pero ya no afirma que no corrió ningún rastreador',
    /no corrió ningún rastreador\./.test(elAviso.detalle));
  cierto('sino ninguno de los que buscamos', /que buscamos/.test(elAviso.detalle));

  /* --- 3. el falso verde medido: rastreo de primera parte ---------- */
  const conRastreoPropio = (dominioCookie) => {
    const extra = rastreoNoReconocido.map((n) => ({ name: n, domain: dominioCookie }));
    const t1 = { ...limpio.tras1, cookies: [...limpio.tras1.cookies, ...extra] };
    const t2 = { ...limpio.tras2, cookies: [...limpio.tras2.cookies, ...extra] };
    return m.armarInforme({ ...limpio, tras1: t1, tras2: t2 }, 'uhc.cl');
  };

  // Primero el hecho que hace falso el verde: ninguna de todas ellas la reconocemos.
  eq('no reconocemos ninguna de las del censo como rastreador',
    m.clasificarRastreadores([], rastreoNoReconocido.map((n) => ({ name: n, domain: '.uhc.cl' }))).length, 0);

  const propias = conRastreoPropio('.uhc.cl');
  // El ESTADO no cambia, y eso es deliberado: bajarlo todo a sin-confirmar dejaría al sitio
  // limpio sin poder salir nunca en verde.
  eq('con rastreo de primera parte, el ítem sigue en verde', itemCookies(propias).estado, 'ok');
  eq('y el puntaje es el mismo que sin ellas', propias.puntaje, rLimpio.puntaje);
  // Lo que cambia es que la frase ya no miente sobre ellas.
  falso('pero ya no se afirma que no hay cookies de rastreo',
    /no dejó ninguna cookie de rastreo/.test(itemCookies(propias).detalle));
  cierto('sino que no hay ninguna de las que buscamos',
    /ninguna de los rastreadores que buscamos/.test(itemCookies(propias).detalle));
  cierto('y se dice cuántas propias escribió',
    /son de tu propio dominio/.test(itemCookies(propias).detalle));

  /* --- 4. la puerta que SÍ funciona sigue funcionando -------------- */
  // Las MISMAS cuatro cookies en otro dominio caen a sin-confirmar, que es la diferencia que
  // el hallazgo señalaba. No se toca.
  const ajenas = conRastreoPropio('.creativecdn.com');
  eq('las mismas cuatro en otro dominio no salen en verde', itemCookies(ajenas).estado, 'sin-confirmar');
  falso('y no son verde', itemCookies(ajenas).ok);
  cierto('con los nombres a la vista', /__rtbh/.test(itemCookies(ajenas).detalle));
}

/* ================================================================== */
console.log('=== 33. el motivo "portero" no puede afirmar lo que su regla dejó de comprobar ===');
{
  // La contraparte del §23. Ahí se arregló la REGLA: la pared se reconoce por la forma de la
  // página y ya no por el "todas las cookies son de un gestor de bots". Lo que se quedó
  // atrás fue la FRASE que la persona lee, que seguía diciendo "las ÚNICAS cookies que
  // quedaron son las del sistema que filtra robots". Mientras la regla exigía el "todas",
  // era verdad por construcción. Desde que no lo exige, el motivo dispara igual con cookies
  // corrientes al lado, y ahí la frase pasa a ser una afirmación falsa sobre la medición de
  // la que salió. El propio §23 construye ese caso y lo da por bueno: comprueba el motivo,
  // no lo que se dice.
  //
  // Esto NO se comprueba contra la redacción de hoy, que es lo que haría que la prueba y el
  // arreglo salieran del mismo supuesto. Se comprueba TEXTO contra DATOS: si el informe
  // afirma que las únicas cookies son las del gestor, la medición tiene que mostrar eso.
  // Cambie como cambie la redacción, la regla sigue valiendo.
  const afirmaUnicas = (r) =>
    /únicas cookies que quedaron son las del sistema que filtra robots/.test(JSON.stringify(r.items));
  const todasDePortero = (cookies) =>
    cookies.length > 0 && cookies.every((c) => m.esCookieDePortero(c.name));

  const pared = medida26('santander');
  // Tal como se midió, la afirmación sería verdad: la pared dejó _abck y bm_sz y nada más.
  eq('la pared medida dejó dos cookies', pared.tras2.cookies.length, 2);
  cierto('y las dos son del gestor de bots', todasDePortero(pared.tras2.cookies));
  eq('se reconoce como portero', m.armarInforme(pared, 'www.santander.cl').bloqueado, 'portero');

  // Y ahora el caso que la vuelve falsa, con datos reales en las DOS mitades:
  //   - la pared es la medición del 26-sep de banco.santander.cl;
  //   - las cookies que se le ponen al lado son las que scotiabank.cl escribió de verdad ese
  //     mismo día y que NO son de gestor de bots: su BIGipServerPool_ de balanceador F5, su
  //     ARRAffinity, su cookie de idioma. Un sitio detrás de un F5 y de Akamai a la vez es
  //     exactamente esto, y está medido; si ese sitio nos muestra su pared, el motivo
  //     dispara con las cookies corrientes ahí mismo.
  const scotia = medida26('scotiabank');
  const corrientes = [...new Set(scotia.tras2.cookies
    .filter((c) => !m.esCookieDePortero(c.name)).map((c) => c.name))].slice(0, 5);
  cierto('scotiabank.cl escribió cookies corrientes junto a las de Akamai', corrientes.length >= 3);
  cierto('y entre ellas está la del balanceador F5, que a propósito no es de portero',
    corrientes.some((n) => /^BIGipServerPool_/.test(n)));

  const vecinas = corrientes.map((name) => ({ name, domain: '.santander.cl' }));
  const conVecinas = {
    ...pared,
    tras1: { ...pared.tras1, cookies: [...pared.tras1.cookies, ...vecinas] },
    tras2: { ...pared.tras2, cookies: [...pared.tras2.cookies, ...vecinas] },
  };
  const rVecinas = m.armarInforme(conVecinas, 'www.santander.cl');
  eq('con las cookies corrientes al lado la pared sigue declinando', rVecinas.bloqueado, 'portero');
  eq('y sigue sin puntaje', rVecinas.puntaje, null);
  falso('pero ya NO todas sus cookies son del gestor', todasDePortero(conVecinas.tras2.cookies));

  // EL INVARIANTE, en su forma general: ningún informe puede afirmar que las únicas cookies
  // son las del gestor si su propia medición muestra otras. Se pasa por los dos casos.
  for (const [que, med] of [['la pared tal como se midió', pared], ['con cookies corrientes al lado', conVecinas]]) {
    const r = m.armarInforme(med, 'www.santander.cl');
    cierto(`${que}: lo que afirma y lo que se midió coinciden`,
      !afirmaUnicas(r) || todasDePortero(med.tras2.cookies));
  }
  // Y el corte más duro, que es el que de verdad cierra el hallazgo: la frase NO puede
  // usarse ni siquiera en el caso donde sería verdad. Las dos mediciones salen por la misma
  // rama y por la misma línea de código, así que una afirmación que solo se sostiene en una
  // de las dos es una afirmación que esa rama no puede hacer. Si alguien la devuelve "solo
  // para el caso limpio", el de al lado se la lleva puesta y nadie se entera.
  falso('con cookies corrientes al lado no afirma que sean las únicas', afirmaUnicas(rVecinas));
  falso('y tampoco en la pared tal como se midió, porque es la misma línea',
    afirmaUnicas(m.armarInforme(pared, 'www.santander.cl')));

  // Lo que sí se comprobó, y es lo único que el motivo puede decir: que lo que se abrió trae
  // demasiado poco para ser una portada, y que el guardia firmó en el dominio del sitio.
  const detalle = rVecinas.items.find((i) => i.id === 'carga').detalle;
  cierto('dice que la página trajo muy poco', /puñado de archivos/.test(detalle));
  cierto('y que la cookie del gestor quedó en el dominio propio',
    /en tu propio dominio la cookie del sistema que filtra robots/.test(detalle));
  cierto('y sigue diciendo que no lo contamos ni a favor ni en contra',
    /ni a favor ni en contra/.test(detalle));
  // Las dos mitades son ciertas en la medición: 8 peticiones (bajo el corte) y una cookie de
  // gestor en .santander.cl.
  cierto('las 8 peticiones medidas caben bajo el corte',
    pared.tras2.peticiones.length <= m.MAX_PETICIONES_PARED);
  cierto('y hay una cookie de gestor en el dominio del propio sitio',
    conVecinas.tras2.cookies.some((c) => m.esCookieDePortero(c.name) && /santander\.cl$/.test(c.domain.replace(/^\./, ''))));

  // Y el motivo no habla del texto, que es lo que en la otra rama no se sabe: `letras` en
  // null (el detector de aviso tampoco pudo correr) también da 'portero'.
  const sinLetras = m.armarInforme({ ...conVecinas, letras: null, aviso: { fallo: 'timeout' } }, 'www.santander.cl');
  eq('sin saber cuánto texto había, sigue siendo portero', sinLetras.bloqueado, 'portero');
  falso('y la frase no afirma nada sobre el texto',
    /texto|contenido|letras/i.test(sinLetras.items.find((i) => i.id === 'carga').detalle));
}

/* ================================================================== */
console.log('=== 34. la pared que nos deja CIEGOS no puede salir mejor que la que sí medimos ===');
{
  // El último falso verde de esta familia, y el más incómodo: se abría justo cuando más
  // falta hacía cerrarlo.
  //
  // En `medirConNavegador` el título, el texto en pantalla y `letras` salen del MISMO
  // `Runtime.evaluate`. Una pared con desafío de JavaScript se recarga sola y destruye el
  // contexto de ejecución, así que ese evaluate tira y los tres detectores de texto se
  // mueren de una vez. Con ellos se mueren las tres primeras puertas de `pareceBloqueo`
  // (título, texto y ruta final), y la única que quedaba en pie era la lista de nombres de
  // cookies, que es exactamente de lo que este código lleva dos rondas intentando no
  // depender.
  //
  // Esta sección no le pone `letras: null` a una medición a mano. Hace reventar el evaluate
  // en el navegador de mentira y deja que `medirConNavegador` —el de producción— produzca
  // la medición ciega. Así la prueba no sale del mismo supuesto que el arreglo: si mañana
  // alguien mide el texto por otra vía, la medición ciega dejará de serlo y esto lo dirá.

  // La pared es una medición REAL: la fila de bancoestado.cl del censo del 26-sep, leída del
  // archivo, no escrita acá. `pareceBloqueo` solo mira cuántas peticiones hubo, así que las
  // URLs se rellenan con la del propio sitio; los números —3 peticiones, 0 cookies, 353
  // letras— son los medidos.
  const censo = JSON.parse(fs.readFileSync(new URL('censo.json', MEDIDAS26), 'utf8'));
  const fila = censo.sitios.find((s) => s.dominio === 'bancoestado.cl');
  cierto('la fila de la pared de 3 peticiones está en el censo', !!fila);
  eq('y son 3 peticiones, 0 cookies', [fila.peticiones, fila.cookies], [3, 0]);
  cierto('con texto medido, y poco', fila.letras > 0 && fila.letras < m.MIN_LETRAS_PAGINA);
  // El título medido viene vacío: ni siquiera la primera puerta la atrapaba con los ojos
  // abiertos. Lo que la atrapaba era el tamaño.
  eq('y sin título que la delate', fila.titulo, '');

  const DOM = fila.dominio;
  const peticionesDeLaPared = new Array(fila.peticiones).fill(0)
    .map((_, i) => ({ url: `${fila.urlFinal}${i ? 'a' + i + '.css' : ''}` }));

  const abrirPared = (avisoRevienta) => navegadorDeMentira({
    url: fila.urlFinal,
    peticiones: peticionesDeLaPared,
    cookies: [],
    avisoRevienta,
    aviso: { avisos: [], marcosIlegibles: [], titulo: fila.titulo, texto: 'x'.repeat(fila.letras), letras: fila.letras },
  });

  // --- (a) la pared con el detector de texto vivo: ya declinaba ------
  const vista = await m.medirConNavegador(abrirPared(false), fila.urlFinal, DOM, { pasivoMs: 5, gestoMs: 5 });
  eq('con el detector vivo, el texto se midió', vista.letras, fila.letras);
  const rVista = m.armarInforme(vista, DOM);
  eq('y la pared declina', rVista.bloqueado, 'flaco');
  eq('sin puntaje', rVista.puntaje, null);
  eq('con los cuatro ítems sin confirmar', rVista.sinConfirmar, 4);
  eq('y ninguno en verde', rVista.items.filter((i) => i.ok).length, 0);

  // --- (b) la MISMA pared, con el evaluate reventado ------------------
  const ciega = await m.medirConNavegador(abrirPared(true), fila.urlFinal, DOM, { pasivoMs: 5, gestoMs: 5 });
  // El mecanismo, antes que el veredicto: los tres detectores cayeron juntos. Si alguno
  // sobreviviera, este caso no sería el que se quiere probar.
  eq('el texto no se pudo contar', ciega.letras, null);
  eq('el título tampoco', ciega.titulo, '');
  eq('ni el texto en pantalla', ciega.texto, '');
  cierto('y el detector de aviso quedó marcado como fallado', !!ciega.aviso.fallo);
  // Y la red sí se midió: lo que se perdió es el texto, no la medición entera. Por eso el
  // caso es peligroso: se ve igual que un sitio limpio.
  eq('las peticiones sí se registraron', ciega.tras2.peticiones.length, fila.peticiones);

  const rCiega = m.armarInforme(ciega, DOM);
  // LA AFIRMACIÓN QUE FALTABA. Hasta el 26-sep esto daba 100/100 con tres verdes y la
  // portada lo cerraba con "Nada pendiente".
  falso('la pared ciega NO da 100', rCiega.puntaje === 100);
  eq('no da ningún puntaje', rCiega.puntaje, null);
  eq('ningún ítem en verde', rCiega.items.filter((i) => i.ok).length, 0);
  eq('los cuatro quedan sin confirmar', rCiega.sinConfirmar, 4);
  // `confirmados === 0` es lo que hace que la portada muestre "No pudimos ver tu sitio" en
  // vez de "Nada pendiente". Se calcula igual en index.html (renderProfundo).
  eq('y la portada no tiene nada que declarar como visto',
    rCiega.items.filter((i) => i.estado !== 'sin-confirmar').length, 0);

  // EL INVARIANTE, en su forma general: medir MENOS no puede puntuar MEJOR. Vale para los
  // dos informes de arriba y es lo que quedaría en pie si mañana cambian los números.
  cierto('ver menos no puntúa mejor', (rCiega.puntaje ?? -1) <= (rVista.puntaje ?? -1));
  cierto('ni deja más ítems en verde',
    rCiega.items.filter((i) => i.ok).length <= rVista.items.filter((i) => i.ok).length);

  // Y lo que se le dice al dueño: no se afirma cuánto texto traía, porque nadie lo contó.
  const detalleCiego = rCiega.items.find((i) => i.id === 'carga').detalle;
  cierto('se dice que el texto tampoco se pudo leer',
    /el texto de la página tampoco lo pudimos leer/.test(detalleCiego));
  falso('y no se afirma cuánto contenido traía',
    /casi no trae contenido/.test(JSON.stringify(rCiega.items)));
  falso('ni se acusa al sitio de bloquearnos', /nos bloqueó/.test(JSON.stringify(rCiega.items)));

  /* --- El otro lado: que esto no le quite el informe a nadie -------- */
  //
  // El riesgo de un corte así es el falso positivo: dejar sin informe a un prospecto chico.
  // Se comprueba contra el censo entero, cegando las 34 portadas medidas. Las tres paredes
  // que el LEEME de `medidas-26sep/` identifica a mano (bancoestado.cl y latamairlines.com
  // por el texto, santander.cl por la cookie del gestor) tienen que declinar; las otras 31,
  // que son portadas reales y doce de ellas prospectos de las listas de outbound, tienen que
  // seguir recibiendo informe aunque el texto no se haya podido contar.
  const PAREDES = ['bancoestado.cl', 'latamairlines.com', 'santander.cl'];
  eq('el censo trae las 34', censo.sitios.length, 34);
  let paredesQueDeclinan = 0, realesQueSiguen = 0;
  for (const s of censo.sitios) {
    const cegado = m.pareceBloqueo({
      peticiones: new Array(s.peticiones).fill({ url: s.urlFinal }),
      cookies: (s.nombresDeCookies || []).map((n) => {
        const i = n.lastIndexOf('@');
        return { name: n.slice(0, i), domain: n.slice(i + 1) };
      }),
      letras: null, titulo: '', texto: '', urlFinal: s.urlFinal, dominio: s.dominio,
    });
    if (PAREDES.includes(s.dominio)) {
      if (cegado) paredesQueDeclinan++;
      else { malo++; console.log(`  FALLA la pared ${s.dominio}, cegada, sale limpia`); }
    } else if (!cegado) realesQueSiguen++;
    else { malo++; console.log(`  FALLA la portada real ${s.dominio} (${s.peticiones} peticiones) se queda sin informe`); }
  }
  eq('las tres paredes del censo declinan aunque no se pueda contar el texto', paredesQueDeclinan, 3);
  eq('y las 31 portadas reales siguen recibiendo informe', realesQueSiguen, 31);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
