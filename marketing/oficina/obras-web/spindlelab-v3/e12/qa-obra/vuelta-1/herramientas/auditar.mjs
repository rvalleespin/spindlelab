// Javiera, QA de obra E12, vuelta 1. Las 27 rutas × los 8 anchos de la spec §1.4 / §4.4, sobre el build servido en
// local. Por cada par: desborde con y sin el overflow-x: clip de global.css, h1, landmarks, letras cargadas, nodos en
// negrita, texto bajo 11 px, mayúsculas fuera de la mono, letras fuera de las dos, párrafos más anchos que 493, alto del
// encabezado, errores de consola y pedidos fallidos, y la captura de la primera pantalla. Bajo 834 corre en un contexto
// táctil (hasTouch + isMobile) y mide el área de toque con la herramienta del paso 2 (spec §4.3).
// Uso: node auditar.mjs [--rutas /v3/,/v3/trabajo/] [--anchos 390,1440] [--completa 390,1440]
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, RUTAS, ANCHOS, nombre, servir, lanzar, recorrer } from './comun.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i < 0 ? d : process.argv[i + 1]; };
const rutas = arg('rutas') ? arg('rutas').split(',') : RUTAS;
const anchos = (arg('anchos') ? arg('anchos').split(',') : Object.keys(ANCHOS)).map(Number);
const completa = new Set((arg('completa', '390,1440')).split(',').map(Number));
const CAP = join(QA, 'capturas'); mkdirSync(join(CAP, 'primera'), { recursive: true }); mkdirSync(join(CAP, 'completa'), { recursive: true });
const AREA = readFileSync(join(QA, '../../qa-paso-2/vuelta-1/herramientas/area-toque-390.js'), 'utf8');

const srv = await servir();
const nav = await lanzar();
const R = [];

async function medir(ruta, ancho) {
  const alto = ANCHOS[ancho];
  const tactil = ancho < 834;
  const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, hasTouch: tactil, isMobile: tactil, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const consola = [], fallidos = [];
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consola.push(`${m.type()}: ${m.text()}`); });
  p.on('pageerror', (e) => consola.push(`pageerror: ${e}`));
  p.on('requestfailed', (q) => { const f = q.failure()?.errorText || ''; if (!/ERR_ABORTED/.test(f)) fallidos.push(`${q.url()} ${f}`); });
  p.on('response', (r) => { if (r.status() >= 400) fallidos.push(`${r.status()} ${r.url()}`); });
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(CAP, 'primera', `${nombre(ruta)}-${ancho}.jpg`), type: 'jpeg', quality: 70 });
  await recorrer(p);
  if (completa.has(ancho)) await p.screenshot({ path: join(CAP, 'completa', `${nombre(ruta)}-${ancho}.jpg`), type: 'jpeg', quality: 55, fullPage: true });
  const m = await p.evaluate(() => {
    const de = document.documentElement;
    const desborde = de.scrollWidth - de.clientWidth;
    const visible = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0; };
    const textoPropio = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const nodos = [...document.body.querySelectorAll('*')].filter((e) => textoPropio(e) && visible(e) && !e.closest('[aria-hidden="true"]') && !e.closest('.solo-lector,.sr-only'));
    const muestra = (e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}: «${e.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)}»`;
    const negrita = nodos.filter((e) => +getComputedStyle(e).fontWeight >= 600).map(muestra);
    const chico = nodos.filter((e) => parseFloat(getComputedStyle(e).fontSize) < 11).map((e) => `${getComputedStyle(e).fontSize} ${muestra(e)}`);
    const familias = new Set(nodos.map((e) => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim()));
    const ajenas = nodos.filter((e) => !/Google Sans Flex|DM Mono/.test(getComputedStyle(e).fontFamily.split(',')[0])).map((e) => `${getComputedStyle(e).fontFamily.split(',')[0]} ${muestra(e)}`);
    const mayus = nodos.filter((e) => getComputedStyle(e).textTransform === 'uppercase' && !/DM Mono/.test(getComputedStyle(e).fontFamily)).map(muestra);
    const anchos = [...document.querySelectorAll('main p')].filter(visible).filter((e) => !/DM Mono/.test(getComputedStyle(e).fontFamily) && e.textContent.trim().length > 60).filter((e) => { const r = document.createRange(); r.selectNodeContents(e); return r.getBoundingClientRect().width > 494; }).map((e) => `${Math.round(e.getBoundingClientRect().width)} ${muestra(e)}`);
    const cab = document.querySelector('.cab, header.cab, [data-cab]');
    const letras = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`);
    const recursosLetra = performance.getEntriesByType('resource').filter((r) => /\.(woff2?|ttf|otf)(\?|$)/.test(r.name)).map((r) => r.name.replace(location.origin, ''));
    const h1 = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().replace(/\s+/g, ' ').slice(0, 80));
    const navs = [...document.querySelectorAll('nav')].map((n) => n.getAttribute('aria-label') || (n.getAttribute('aria-labelledby') ? document.getElementById(n.getAttribute('aria-labelledby'))?.textContent.trim() : '') || '(sin nombre)');
    // encabezados: saltos de nivel
    const niveles = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    const saltos = []; niveles.forEach((n, i) => { if (i && n > niveles[i - 1] + 1) saltos.push(`h${niveles[i - 1]}→h${n}`); });
    const imgsSinDim = [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).map((i) => i.getAttribute('src'));
    const imgsSinAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src'));
    const dentroPantalla = [...document.querySelectorAll('img[loading="lazy"]')].filter((i) => { const r = i.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && r.width > 0; }).map((i) => i.getAttribute('src'));
    return { desborde, h1, main: document.querySelectorAll('main').length, lang: de.lang, navs, saltos, negrita, chico, familias: [...familias], ajenas, mayus, anchos, cabAlto: cab ? Math.round(cab.getBoundingClientRect().height) : null, letras, recursosLetra, imgsSinDim, imgsSinAlt, lazyEnPrimera: dentroPantalla };
  });
  // Sin el clip: se quita overflow-x de html y body (global.css lo pone) y se mide de nuevo.
  m.desbordeSinClip = await p.evaluate(() => {
    for (const e of [document.documentElement, document.body]) e.style.setProperty('overflow-x', 'visible', 'important');
    const d = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const fuera = d > 0 ? [...document.body.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 6).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')} → ${Math.round(e.getBoundingClientRect().right)}`) : [];
    return { d, fuera };
  });
  if (tactil) m.toque = await p.evaluate(`(() => { ${AREA} })()`);
  m.consola = consola; m.fallidos = fallidos;
  await ctx.close();
  return m;
}

const tareas = [];
for (const r of rutas) for (const a of anchos) tareas.push([r, a]);
let i = 0;
async function obrero() {
  while (i < tareas.length) {
    const [r, a] = tareas[i++];
    try { const m = await medir(r, a); R.push({ ruta: r, ancho: a, ...m }); }
    catch (e) { R.push({ ruta: r, ancho: a, error: String(e) }); }
    process.stdout.write('.');
  }
}
await Promise.all([obrero(), obrero(), obrero()]);
await nav.close(); await srv.cerrar();
R.sort((x, y) => RUTAS.indexOf(x.ruta) - RUTAS.indexOf(y.ruta) || x.ancho - y.ancho);
const salida = join(QA, 'crudos', arg('salida', 'auditar.json'));
writeFileSync(salida, JSON.stringify({ cuando: new Date().toISOString(), servidor404: srv.pedidos, R }, null, 1));
// Resumen
const malos = (f) => R.filter(f).map((x) => `${x.ruta}@${x.ancho}`);
console.log('\nerrores de medición:', malos((x) => x.error));
console.log('desborde con clip > 0:', malos((x) => x.desborde > 0));
console.log('desborde sin clip > 0:', R.filter((x) => x.desbordeSinClip?.d > 0).map((x) => `${x.ruta}@${x.ancho} ${x.desbordeSinClip.d} ${x.desbordeSinClip.fuera.join(' | ')}`));
console.log('h1 ≠ 1:', malos((x) => x.h1 && x.h1.length !== 1), ' main ≠ 1:', malos((x) => x.main !== 1), ' lang:', [...new Set(R.map((x) => x.lang))]);
console.log('saltos de encabezado:', [...new Set(R.filter((x) => x.saltos?.length).map((x) => `${x.ruta} ${x.saltos.join(',')}`))]);
console.log('nodos en negrita:', R.filter((x) => x.negrita?.length).map((x) => `${x.ruta}@${x.ancho}: ${x.negrita.slice(0, 3).join(' | ')}`));
console.log('texto < 11 px:', R.filter((x) => x.chico?.length).map((x) => `${x.ruta}@${x.ancho}: ${x.chico.slice(0, 3).join(' | ')}`));
console.log('familias a la vista:', [...new Set(R.flatMap((x) => x.familias || []))]);
console.log('letras ajenas:', [...new Set(R.flatMap((x) => (x.ajenas || []).map((a) => `${x.ruta}: ${a}`)))].slice(0, 20));
console.log('mayúsculas fuera de la mono:', [...new Set(R.flatMap((x) => (x.mayus || []).map((a) => `${x.ruta}: ${a}`)))].slice(0, 20));
console.log('letras cargadas:', [...new Set(R.flatMap((x) => x.letras || []))], [...new Set(R.flatMap((x) => x.recursosLetra || []))]);
console.log('alto del encabezado por ancho:', Object.fromEntries(anchos.map((a) => [a, [...new Set(R.filter((x) => x.ancho === a).map((x) => x.cabAlto))]])));
console.log('párrafos de main > 494 px:', [...new Set(R.filter((x) => x.anchos?.length).map((x) => `${x.ruta}@${x.ancho}: ${x.anchos.slice(0, 2).join(' | ')}`))].slice(0, 30));
console.log('img sin width/height:', [...new Set(R.flatMap((x) => x.imgsSinDim || []))], ' sin alt:', [...new Set(R.flatMap((x) => x.imgsSinAlt || []))]);
console.log('lazy en la primera pantalla:', R.filter((x) => x.lazyEnPrimera?.length).map((x) => `${x.ruta}@${x.ancho}: ${x.lazyEnPrimera.join(', ')}`));
console.log('toque < 44 (táctil):', R.filter((x) => x.toque?.n).map((x) => `${x.ruta}@${x.ancho}: ${JSON.stringify(x.toque.muestra)}`));
console.log('consola:', R.filter((x) => x.consola?.length).map((x) => `${x.ruta}@${x.ancho}: ${x.consola.slice(0, 3).join(' | ')}`));
console.log('pedidos fallidos:', R.filter((x) => x.fallidos?.length).map((x) => `${x.ruta}@${x.ancho}: ${x.fallidos.slice(0, 3).join(' | ')}`));
console.log('404 del servidor:', [...new Set(srv.pedidos.map((x) => x[1]))]);
