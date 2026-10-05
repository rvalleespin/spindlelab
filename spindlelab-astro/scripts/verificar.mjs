/**
 * verificar.mjs — barrido de verificación del sitio construido.
 *
 * POR QUÉ EXISTE. La regla de la casa es que nada se da por listo sin verlo renderizado.
 * Mirarlo es necesario y no alcanza: el ojo no detecta que un gris sobre negro está en
 * 2,48:1 en vez de 4,5:1. Este barrido encontró fallas de contraste que llevaban meses en
 * el pie del sitio, presentes en TODAS las páginas, y que ni la vista ni una revisión de
 * código habían cazado, porque el color culpable estaba escrito como `text-white/30` y
 * ese número no se parece a un contraste.
 *
 * QUÉ REVISA, página por página:
 *   · CONTRASTE REAL de cada nodo de texto. No lee la hoja de estilos: pinta el color y el
 *     fondo en un canvas tal como los resuelve el navegador, resuelve la opacidad heredada
 *     y compone sobre el fondo que de verdad quedó detrás. Así atrapa lo que ninguna
 *     revisión estática ve: opacidades que se acumulan, colores en oklch(), y un mismo
 *     token que aprueba sobre un fondo y reprueba sobre el de al lado.
 *   · Desborde horizontal al ancho que se le pida (por defecto 390px, un teléfono chico).
 *   · Un solo <h1> por página.
 *   · JSON-LD presente (sin datos estructurados, la IA no sabe leer la página).
 *   · alt en todas las imágenes.
 *   · Enlaces internos que responden 404.
 *   · Opcional: píldoras (border-radius de 999px), que el sistema v3 no usa.
 *
 * USO
 *   npm run verificar                        # construye si falta, sirve dist y barre todo
 *   npm run verificar -- --prefijo /v3/      # solo las rutas bajo /v3/
 *   npm run verificar -- --ancho 1440        # barre a otro ancho
 *   npm run verificar -- --sin-pildoras      # además reporta radios de píldora
 *   npm run verificar -- --base https://spindlelab.cl --rutas /,/servicios/
 *   npm run verificar -- --excluir ''       # incluye también las maquetas archivadas
 *
 * Sale con código 1 si encuentra algo, así que sirve para frenar un deploy.
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

// --- argumentos -------------------------------------------------------------
const arg = (nombre, porDefecto = null) => {
  const i = process.argv.indexOf(`--${nombre}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
    ? process.argv[i + 1]
    : i !== -1
      ? true
      : porDefecto;
};
const PREFIJO = arg('prefijo', '');
const ANCHO = Number(arg('ancho', 390));
const SIN_PILDORAS = arg('sin-pildoras', false) === true;
const BASE_EXTERNA = typeof arg('base') === 'string' ? arg('base') : null;
const RUTAS_ARG = typeof arg('rutas') === 'string' ? arg('rutas').split(',') : null;
// Rutas a dejar fuera. Por defecto las maquetas archivadas de exploración: son el
// registro de las direcciones que ya se compararon y no se corrigen.
const EXCLUIR = (typeof arg('excluir') === 'string'
  ? arg('excluir')
  : '/v3/a/,/v3/b/,/v3/c/,/v3/maqueta-inicial/'
).split(',').filter(Boolean);
const DIST = path.resolve('dist');

// --- el binario de Chromium -------------------------------------------------
// Playwright a veces pide una versión de Chromium que no está descargada en el entorno.
// En vez de fallar con «run npx playwright install», se usa la que sí está instalada.
function buscarChromium() {
  const raices = [process.env.PLAYWRIGHT_BROWSERS_PATH, '/opt/pw-browsers'].filter(Boolean);
  for (const raiz of raices) {
    if (!fs.existsSync(raiz)) continue;
    for (const dir of fs.readdirSync(raiz)) {
      if (!dir.startsWith('chromium-')) continue;
      for (const rel of ['chrome-linux/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const p = path.join(raiz, dir, rel);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  // En un Mac con Chrome instalado, sirve igual.
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(chrome)) return chrome;
  return null; // que Playwright use el suyo
}

// --- servidor estático sobre dist/ -----------------------------------------
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};
function servir(raiz) {
  return new Promise((resolve) => {
    const s = http.createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = path.join(raiz, p);
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!fs.existsSync(f) || !fs.statSync(f).isFile()) {
        res.writeHead(404).end('no');
        return;
      }
      res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] ?? 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    });
    s.listen(0, '127.0.0.1', () => resolve({ servidor: s, puerto: s.address().port }));
  });
}

// --- rutas a barrer ---------------------------------------------------------
function rutasDeDist() {
  const salida = [];
  const recorrer = (dir, base = '') => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) recorrer(path.join(dir, e.name), `${base}/${e.name}`);
      else if (e.name === 'index.html') salida.push(`${base}/`);
    }
  };
  recorrer(DIST);
  return salida
    .filter((r) => r.startsWith(PREFIJO))
    .filter((r) => !EXCLUIR.some((x) => r === x || r.startsWith(x)))
    .sort();
}

// --- la revisión, dentro de la página --------------------------------------
// Va como una función que se serializa al navegador: no puede usar nada de arriba.
function revisar(pedirPildoras) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });

  // Resuelve CUALQUIER color css a sRGB, oklch() incluido, pintándolo de verdad.
  const rgba = (css) => {
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = '#000';
    try {
      cx.fillStyle = css;
    } catch {
      return [0, 0, 0, 255];
    }
    cx.fillRect(0, 0, 1, 1);
    return [...cx.getImageData(0, 0, 1, 1).data];
  };
  const lineal = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminancia = ([r, g, b]) => 0.2126 * lineal(r) + 0.7152 * lineal(g) + 0.0722 * lineal(b);
  const componer = (frente, fondo) => {
    const a = frente[3] / 255;
    return [0, 1, 2].map((i) => frente[i] * a + fondo[i] * (1 - a));
  };
  const razon = (f, b) => {
    const l1 = luminancia(f), l2 = luminancia(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  // El fondo REAL detrás del texto.
  //
  // No basta con subir hasta el primer ancestro que pinte algo: una tarjeta con un fondo
  // al 7% NO es el fondo, es una capa translúcida sobre lo que haya debajo. Tomarla como
  // opaca daba contrastes de 1,01:1 en tarjetas cuyo tinte es del mismo color que el
  // texto — falsas alarmas espectaculares sobre páginas que están bien. Así que se
  // juntan TODAS las capas hasta dar con una opaca y se componen de abajo hacia arriba.
  //
  // Devuelve null si en el camino hay una imagen o un degradado: ahí el color efectivo
  // no se deduce del CSS, y afirmar un contraste sería inventarlo. Esos nodos se cuentan
  // aparte como «no evaluables», nunca como fallas.
  const fondoDe = (el) => {
    const capas = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null;
      const c = rgba(s.backgroundColor);
      if (c[3] > 0) {
        capas.push(c);
        if (c[3] >= 255) break; // opaca: lo de más abajo ya no se ve
      }
      n = n.parentElement;
    }
    if (!capas.length || capas[capas.length - 1][3] < 255) {
      const cuerpo = rgba(getComputedStyle(document.body).backgroundColor);
      capas.push(cuerpo[3] > 0 ? cuerpo : [255, 255, 255, 255]);
    }
    // De la capa más profunda hacia la más superficial.
    let fondo = capas[capas.length - 1].slice(0, 3);
    for (let i = capas.length - 2; i >= 0; i--) fondo = componer(capas[i], fondo);
    return fondo;
  };
  // La opacidad se hereda multiplicándose: un padre al 28% deja a su hijo al 28%,
  // aunque el hijo declare opacity:1. Sin esto el cálculo miente.
  const opacidadHeredada = (el) => {
    let o = 1, n = el;
    while (n && n !== document.documentElement) {
      o *= parseFloat(getComputedStyle(n).opacity);
      n = n.parentElement;
    }
    return o;
  };

  const SELECTOR = 'p,span,a,li,dd,dt,h1,h2,h3,h4,h5,h6,label,td,th,time,summary,figcaption,button';
  const fallos = [];
  let noEvaluables = 0;
  for (const el of document.querySelectorAll(SELECTOR)) {
    if (el.children.length) continue; // solo hojas: si no, se cuenta el texto dos veces
    const t = (el.innerText || '').trim();
    if (!t) continue;
    const caja = el.getBoundingClientRect();
    if (caja.width < 4 || caja.height < 4) continue;
    const st = getComputedStyle(el);
    if (st.visibility === 'hidden' || st.display === 'none') continue;
    const px = parseFloat(st.fontSize);
    const negrita = parseInt(st.fontWeight, 10) >= 700;
    // WCAG: «texto grande» es 24px, o 18,66px si va en negrita.
    const grande = px >= 24 || (px >= 18.66 && negrita);
    const minimo = grande ? 3 : 4.5;
    const o = opacidadHeredada(el);
    // Un nodo en opacidad ~0 no es texto de bajo contraste: es un `reveal` que todavía no
    // se disparó, o algo deliberadamente oculto. Medirlo daba razones de 1,01:1 que
    // parecían fallas gravísimas del sitio vivo y no lo eran.
    if (o < 0.06) continue;
    const fondo = fondoDe(el);
    if (!fondo) { noEvaluables++; continue; }
    const color = rgba(st.color);
    const frente = [color[0], color[1], color[2], color[3] * o];
    const c = razon(componer(frente, fondo), fondo);
    if (c < minimo - 0.01) {
      fallos.push({ texto: t.slice(0, 44), px: Math.round(px), razon: +c.toFixed(2), minimo });
    }
  }

  const pildoras = pedirPildoras
    ? [...document.querySelectorAll('body *')].filter((e) => {
        const r = getComputedStyle(e).borderRadius;
        return /9{3,}px/.test(r) && e.getBoundingClientRect().width > 20;
      }).length
    : 0;

  return {
    fallos: fallos.slice(0, 8),
    nFallos: fallos.length,
    noEvaluables,
    desborde: document.documentElement.scrollWidth > window.innerWidth + 1,
    ancho: document.documentElement.scrollWidth,
    h1: document.querySelectorAll('h1').length,
    jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
    sinAlt: document.querySelectorAll('img:not([alt])').length,
    pildoras,
    enlaces: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
  };
}

// --- barrido ----------------------------------------------------------------
let servidor = null;
let base = BASE_EXTERNA;

if (!base) {
  if (!fs.existsSync(DIST)) {
    console.error('No existe dist/. Corre `npm run build` primero.');
    process.exit(2);
  }
  const s = await servir(DIST);
  servidor = s.servidor;
  base = `http://127.0.0.1:${s.puerto}`;
}

const rutas = RUTAS_ARG ?? (BASE_EXTERNA ? ['/'] : rutasDeDist());
const ejecutable = buscarChromium();
const navegador = await chromium.launch({
  ...(ejecutable ? { executablePath: ejecutable } : {}),
  args: ['--no-sandbox', '--disable-gpu'],
});

const problemas = [];
const enlaces = new Set();
let sinEvaluar = 0;

for (const ruta of rutas) {
  const pagina = await navegador.newPage({ viewport: { width: ANCHO, height: 844 } });
  await pagina.emulateMedia({ reducedMotion: 'reduce' }); // deja los reveals en su estado final
  const res = await pagina.goto(base + ruta, { waitUntil: 'load' }).catch(() => null);
  if (!res || res.status() >= 400) {
    problemas.push({ ruta, lista: [`HTTP ${res ? res.status() : 'sin respuesta'}`] });
    await pagina.close();
    continue;
  }
  // Se recorre la página entera antes de medir: los bloques con `reveal` arrancan en
  // opacidad 0 y solo llegan a su estado final cuando el observador los ve pasar. Medir
  // sin bajar primero es medir la animación, no la página.
  await pagina.waitForTimeout(400);
  const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 600) {
    await pagina.evaluate((v) => window.scrollTo(0, v), y);
    await pagina.waitForTimeout(60);
  }
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(500);
  const d = await pagina.evaluate(revisar, SIN_PILDORAS);
  d.enlaces.forEach((l) => enlaces.add(l));

  const lista = [];
  if (d.desborde) lista.push(`desborde horizontal: ${d.ancho}px en una ventana de ${ANCHO}px`);
  if (d.h1 !== 1) lista.push(`${d.h1} elementos h1 (debe haber exactamente 1)`);
  if (!d.jsonLd) lista.push('sin JSON-LD');
  if (d.sinAlt) lista.push(`${d.sinAlt} imagen(es) sin alt`);
  if (d.pildoras) lista.push(`${d.pildoras} elemento(s) con radio de píldora`);
  if (d.nFallos) {
    lista.push(
      `contraste: ${d.nFallos} nodo(s) bajo el mínimo\n` +
        d.fallos
          .map((f) => `        «${f.texto}» ${f.px}px → ${f.razon}:1 (mínimo ${f.minimo})`)
          .join('\n')
    );
  }
  if (d.noEvaluables) sinEvaluar += d.noEvaluables;
  if (lista.length) problemas.push({ ruta, lista });
  await pagina.close();
}

// --- enlaces internos rotos -------------------------------------------------
const rotos = [];
for (const l of enlaces) {
  if (PREFIJO && !l.startsWith(PREFIJO)) continue;
  if (/^\/\//.test(l)) continue;
  const res = await fetch(base + l).catch(() => null);
  if (!res || res.status >= 400) rotos.push(`${l} → ${res ? res.status : 'sin respuesta'}`);
}

await navegador.close();
servidor?.close();

// --- informe ----------------------------------------------------------------
console.log(`\n${rutas.length} página(s) revisadas a ${ANCHO}px de ancho.`);
if (sinEvaluar) {
  console.log(
    `${sinEvaluar} nodo(s) sobre imagen o degradado: el contraste ahí se revisa a ojo.`
  );
}
console.log('');
if (!problemas.length && !rotos.length) {
  console.log('Sin hallazgos.\n');
  process.exit(0);
}
for (const p of problemas) {
  console.log(`  ${p.ruta}`);
  for (const l of p.lista) console.log(`      ${l}`);
}
if (rotos.length) {
  console.log('\n  Enlaces internos rotos:');
  for (const r of rotos) console.log(`      ${r}`);
}
console.log(
  `\n${problemas.length} página(s) con hallazgos, ${rotos.length} enlace(s) roto(s).\n`
);
process.exit(1);
