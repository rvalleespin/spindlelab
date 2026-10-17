// E12 · logo · rasteriza lo que arma armar-laminas.py y comprueba lo que se puede medir.
// Uso: node render.mjs <dir-logo>
// 1. Favicon de cada camino a PNG de 16 y 32 px (como los pinta el navegador), junto a su SVG.
// 2. Las tres láminas a 1920 × 1080 (dpr 1) → laminas/<camino>.png.
// 3. El menú a ancho real: 3 caminos × A y B × 1440 (dpr 1) y 390 (dpr 2) × negro y blanco → laminas/menu/.
// 4. render.json: imágenes cargadas, letra cargada, desborde, errores de consola y el alto del logo en el menú.
// Chromium 141 (/opt/pw-browsers/chromium-1194) con Playwright de spindlelab-astro. Todo es file://: sin red.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const LOGO = path.resolve(process.argv[2] || path.join(path.dirname(new URL(import.meta.url).pathname), '..'));
const LAM = path.join(LOGO, 'laminas');
const MENU = path.join(LAM, 'menu');
fs.mkdirSync(MENU, { recursive: true });
const CAMINOS = JSON.parse(fs.readFileSync(path.join(LAM, 'caminos.json'), 'utf8')).map(c => c.clave);

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const salida = { fecha: new Date().toISOString(), favicons: [], laminas: [], menu: [] };
const errores = [];
const vigilar = (p, donde) => {
  p.on('console', m => { if (m.type() === 'error') errores.push(`${donde}: ${m.text()}`); });
  p.on('pageerror', e => errores.push(`${donde}: ${e.message}`));
  p.on('requestfailed', r => errores.push(`${donde}: no cargó ${r.url()}`));
};

// 1 · favicon
for (const clave of CAMINOS) {
  const dir = path.join(LOGO, clave);
  for (const f of fs.readdirSync(dir).filter(n => /^favicon.*\.svg$/.test(n))) {
    for (const lado of [16, 32]) {
      // se abre el SVG solo, con la ventana del tamaño del favicon: el SVG (sin ancho ni alto) la llena
      const ctx = await nav.newContext({ viewport: { width: lado, height: lado }, deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      vigilar(p, f);
      await p.goto(pathToFileURL(path.join(dir, f)).href);
      const destino = path.join(dir, f.replace(/\.svg$/, `-${lado}.png`));
      await p.screenshot({ path: destino });
      salida.favicons.push({ camino: clave, archivo: path.relative(LOGO, destino), lado });
      await ctx.close();
    }
  }
}

// 2 · láminas
for (const clave of CAMINOS) {
  const ctx = await nav.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, timezoneId: 'America/Santiago', locale: 'es-CL' });
  const p = await ctx.newPage();
  vigilar(p, clave);
  await p.goto(pathToFileURL(path.join(LAM, `${clave}.html`)).href);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => [...document.images].every(i => i.complete));
  const med = await p.evaluate(() => {
    const imgs = [...document.images].map(i => ({ src: i.getAttribute('src'), ok: i.naturalWidth > 0 }));
    const logos = [...document.querySelectorAll('.nav .logo')].map(i => { const r = i.getBoundingClientRect(); return +r.height.toFixed(2); });
    const desborde = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > 1920.5 || r.bottom > 1080.5); }).map(e => e.tagName + '.' + e.className).slice(0, 10);
    const letras = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight);
    const chico = [...document.querySelectorAll('body *')].filter(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()))
      .map(e => parseFloat(getComputedStyle(e).fontSize)).filter(s => s < 11);
    // los bloques de la lámina no se pisan (el desborde no lo ve: todo cabe en 1920 × 1080 y aun así se tapaba)
    const bloques = ['header.top', '.heroe', 'aside', '.favs', '.navs', 'footer.pie'].map(s => [s, document.querySelector(s)]).filter(([, e]) => e).map(([s, e]) => {
      // la caja real del contenido (los hijos), no la del contenedor absoluto
      const rs = [...e.querySelectorAll('*')].map(x => x.getBoundingClientRect()).filter(r => r.width && r.height);
      return { s, x0: Math.min(...rs.map(r => r.left)), y0: Math.min(...rs.map(r => r.top)), x1: Math.max(...rs.map(r => r.right)), y1: Math.max(...rs.map(r => r.bottom)) };
    });
    const choques = [];
    for (let i = 0; i < bloques.length; i++) for (let j = i + 1; j < bloques.length; j++) {
      const a = bloques[i], b = bloques[j];
      if (a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1) choques.push(a.s + ' × ' + b.s);
    }
    return { choques, bloques: bloques.map(b => ({ ...b, x0: Math.round(b.x0), y0: Math.round(b.y0), x1: Math.round(b.x1), y1: Math.round(b.y1) })), imagenes: imgs.length, imagenesSinCargar: imgs.filter(i => !i.ok).map(i => i.src), altoLogoMenu: [...new Set(logos)], desborde, letras: [...new Set(letras)], textoBajo11px: chico.length };
  });
  const destino = path.join(LAM, `${clave}.png`);
  await p.screenshot({ path: destino });
  salida.laminas.push({ camino: clave, archivo: path.relative(LOGO, destino), ...med });
  await ctx.close();
}

// 3 · el menú a ancho real
for (const clave of CAMINOS) for (const dir of ['A', 'B']) for (const ancho of [1440, 390]) for (const fondo of ['negro', 'blanco']) {
  const vp = ancho === 1440 ? { width: 1440, height: 80 } : { width: 390, height: 72 };
  const ctx = await nav.newContext({ viewport: vp, deviceScaleFactor: ancho === 1440 ? 1 : 2, timezoneId: 'America/Santiago', locale: 'es-CL', ...(ancho === 390 ? { isMobile: true, hasTouch: true } : {}) });
  const p = await ctx.newPage();
  vigilar(p, `menú ${clave} ${dir} ${ancho} ${fondo}`);
  await p.goto(pathToFileURL(path.join(LAM, 'menu.html')).href + `?camino=${clave}&dir=${dir}&fondo=${fondo}`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => [...document.images].every(i => i.complete));
  const med = await p.evaluate(() => {
    const l = document.querySelector('.nav .logo').getBoundingClientRect();
    const items = [...document.querySelectorAll('.nav li, .nav .hora, .nav .menu')].map(e => { const r = e.getBoundingClientRect(); return { t: e.textContent, x: +r.x.toFixed(1), derecha: +r.right.toFixed(1) }; });
    return { logo: { x: +l.x.toFixed(1), y: +l.y.toFixed(1), ancho: +l.width.toFixed(1), alto: +l.height.toFixed(1) }, items, desborde: document.documentElement.scrollWidth > window.innerWidth, letraMenu: getComputedStyle(document.querySelector('.nav li, .nav .menu')).fontFamily };
  });
  const destino = path.join(MENU, `${clave}-${dir}-${ancho}-${fondo}.png`);
  await p.screenshot({ path: destino });
  salida.menu.push({ camino: clave, dir, ancho, fondo, archivo: path.relative(LOGO, destino), ...med });
  await ctx.close();
}

await nav.close();
salida.errores = errores;
fs.writeFileSync(path.join(LAM, 'render.json'), JSON.stringify(salida, null, 2));
console.log(JSON.stringify({ laminas: salida.laminas.map(l => [l.camino, 'sin cargar ' + l.imagenesSinCargar.length, 'logo ' + l.altoLogoMenu, 'desborde ' + l.desborde.length, 'bajo 11px ' + l.textoBajo11px, 'choques ' + l.choques.join(',')]), menu: salida.menu.length, errores: errores.length }, null, 1));
if (errores.length) console.log(errores.slice(0, 20).join('\n'));
