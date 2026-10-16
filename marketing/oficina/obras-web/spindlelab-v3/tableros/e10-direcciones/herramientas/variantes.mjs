// variantes.mjs — las capturas de las decisiones y de las pruebas del tablero E10 (Lucía, 16-oct-2026).
// Ronda 1 de QA (acta-paso-2.md):
//   · logo tapado (defectos 5 y 6): la 2.ª y la 3.ª pantalla de cada página de Pizarra limpia, y la 1.ª y la 2.ª de
//     la home de Taller, a 1440 × 900, con el wordmark del módulo y el del pie tapados (visibility: hidden: el lugar
//     queda, la marca no). Una «pantalla» es una ventana de 900 px desde y = 900 × (n − 1).
//   · colores (defecto 6): la primera pantalla de Taller (home y Trabajo) con la paleta propia y con la exacta de
//     The Ready (?paleta=the-ready), para que Ramón decida sabiendo cuál es cuál.
//   · el punto dorado (defecto 3, lock §12): el módulo y el pie con la opción A (oro en el pie) y la B (?oro=arriba).
// Todo con prefers-reduced-motion: reduce (cinta quieta desde el margen, resaltador completo), como renderizar.mjs.
// Sirve proto/ en 8770 antes. Uso: node herramientas/variantes.mjs → img/var-*.jpg e img/variantes.json
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const IMG = path.join(AQUI, 'img');
const TMP = process.env.TMP_E10 || path.join(AQUI, '.tmp');
fs.mkdirSync(TMP, { recursive: true });
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const salida = { fecha: new Date().toISOString(), logo_tapado: [], colores: [], oro: [] };

async function abrir(ruta, { ancho = 1440, alto = 900, dsf = 1, tapar = false } = {}) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: dsf, reducedMotion: 'reduce' });
  const pg = await ctx.newPage();
  await pg.goto(BASE + ruta, { waitUntil: 'networkidle' });
  await pg.evaluate(async (tapar) => {
    await document.fonts.ready;
    if (tapar) for (const e of document.querySelectorAll('header[data-modulo-nav] a.font-wordmark, .d-gigante')) e.style.visibility = 'hidden';
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => i.decode().catch(() => 0)));
  }, tapar);
  await pg.waitForTimeout(200);
  return { ctx, pg };
}
function jpg(png, nombre, ancho) {
  execFileSync('python3', ['-I', '-c', `
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB')
w = int(sys.argv[3])
if im.size[0] > w: im = im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
im.save(sys.argv[2], 'JPEG', quality=82, optimize=True, progressive=True)
`, png, path.join(IMG, nombre), String(ancho)]);
  return nombre;
}
async function ventana(pg, y, alto, nombre, anchoJpg, anchoClip) {
  const png = path.join(TMP, nombre.replace('.jpg', '.png'));
  const H = await pg.evaluate(() => document.documentElement.scrollHeight);
  const W = anchoClip || await pg.evaluate(() => innerWidth);
  await pg.screenshot({ path: png, fullPage: true, clip: { x: 0, y, width: W, height: Math.min(alto, H - y) } });
  return jpg(png, nombre, anchoJpg);
}

// 1 · Logo tapado
const TAPADO = [
  ['pizarra', 'home', [2, 3]], ['pizarra', 'acompanamiento-mensual', [2, 3]], ['pizarra', 'trabajo', [2, 3]],
  ['taller', 'home', [1, 2]],
];
for (const [d, p, pantallas] of TAPADO) {
  const { ctx, pg } = await abrir(`/${d}/${p}.html`, { tapar: true });
  for (const n of pantallas) {
    const nombre = `var-tapado-${d}-${p}-p${n}.jpg`;
    await ventana(pg, 900 * (n - 1), 900, nombre, 1440);
    salida.logo_tapado.push({ direccion: d, pagina: p, pantalla: n, desde_y: 900 * (n - 1), archivo: `img/${nombre}` });
    console.log('tapado', d, p, n);
  }
  await ctx.close();
}

// 2 · Colores: propios contra los exactos de The Ready (primera pantalla de Taller)
for (const p of ['home', 'trabajo']) {
  for (const [cual, q] of [['propia', ''], ['the-ready', '?paleta=the-ready']]) {
    const { ctx, pg } = await abrir(`/taller/${p}.html${q}`);
    const nombre = `var-paleta-${cual}-taller-${p}.jpg`;
    await ventana(pg, 0, 900, nombre, 1440);
    salida.colores.push({ paleta: cual, pagina: p, archivo: `img/${nombre}` });
    console.log('paleta', cual, p);
    await ctx.close();
  }
}

// 3 · El punto dorado: A (en el pie) y B (en el módulo), módulo y pie, a 1440 y a 390
for (const [op, q] of [['a', ''], ['b', '?oro=arriba']]) {
  for (const [ancho, alto, dsf] of [[1440, 900, 1], [390, 844, 2]]) {
    const { ctx, pg } = await abrir(`/taller/home.html${q}`, { ancho, alto, dsf });
    const cab = `var-oro-${op}-modulo-${ancho}.jpg`;
    // a 1440 el módulo ocupa los primeros ~400 px: se recorta a 640 de ancho para que se vea a su tamaño
    await ventana(pg, 0, ancho > 500 ? 110 : 90, cab, ancho > 500 ? 640 : 780, ancho > 500 ? 640 : undefined);
    const y = await pg.evaluate(() => Math.floor(document.querySelector('.d-gigante').getBoundingClientRect().top + scrollY) - 24);
    const H = await pg.evaluate(() => document.querySelector('.d-gigante').getBoundingClientRect().height);
    const pie = `var-oro-${op}-pie-${ancho}.jpg`;
    await ventana(pg, y, Math.ceil(H) + 48, pie, ancho > 500 ? 1440 : 780);
    salida.oro.push({ opcion: op.toUpperCase(), ancho, modulo: `img/${cab}`, pie: `img/${pie}` });
    console.log('oro', op, ancho);
    await ctx.close();
  }
}
await nav.close();
fs.writeFileSync(path.join(IMG, 'variantes.json'), JSON.stringify(salida, null, 1));
