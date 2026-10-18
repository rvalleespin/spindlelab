// Mide los defectos 1, 2, 9 y 12 del acta del paso 2 con las herramientas de Javiera, sin cambiarlas
// (e12/qa-paso-2/vuelta-1/herramientas/: h1-caso-b.js, pies-praxi.js, mono.js, area-toque-390.js), más dos
// comprobaciones propias: que ningún objetivo agrandado quede tapado (elementFromPoint en sus cuatro bordes) y que
// la página no cambie de alto por el área de toque. Lucía (B), 18-oct-2026.
// Uso: node cierre-acta.mjs <base de proto/b/> → ../datos/cierre-acta-paso-2.json
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const QA = path.join(RAIZ, 'marketing/oficina/obras-web/spindlelab-v3/e12/qa-paso-2/vuelta-1/herramientas');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.argv[2];
const js = (n) => new Function(fs.readFileSync(path.join(QA, n), 'utf8'));
const VISTAS = { home: '', trabajo: 'trabajo/', praxi: 'trabajo/praxi/', sesenta: 'trabajo/sesenta/', 'desarrollo-web': 'servicios/desarrollo-web/' };

// Objetivos de toque y si alguno queda tapado en sus bordes (lock §15: «mirando que ningún otro objetivo la tape»).
function tapados() {
  const sel = 'a[href],button,input,select,summary,[role=button],video[controls]';
  const fuera = [];
  for (const e of document.querySelectorAll(sel)) {
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height || getComputedStyle(e).visibility === 'hidden') continue;
    // Solo lo que está entero en pantalla y fuera del encabezado pegajoso y de la barra flotante del caso: lo que pasa
    // por debajo de ellos al bajar no está tapado por otro objetivo, está detrás de la interfaz fija.
    const cab = (document.querySelector('.cabecera') || { getBoundingClientRect: () => ({ bottom: 0 }) }).getBoundingClientRect().bottom;
    const barra = document.querySelector('.barra-caso');
    const pie = barra && getComputedStyle(barra).display !== 'none' ? barra.getBoundingClientRect().top - 8 : innerHeight;
    if (r.top < cab || r.bottom > pie) continue;
    const puntos = [[r.left + r.width / 2, r.top + 1], [r.left + r.width / 2, r.bottom - 1], [r.left + 1, r.top + r.height / 2], [r.right - 1, r.top + r.height / 2]];
    for (const [x, y] of puntos) {
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      const t = document.elementFromPoint(x, y);
      if (t && t !== e && !e.contains(t) && t.closest(sel) && t.closest(sel) !== e) {
        fuera.push([e.textContent.trim().slice(0, 30), Math.round(x), Math.round(y), t.closest(sel).textContent.trim().slice(0, 30)]);
      }
    }
  }
  return fuera;
}

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const r = { fecha: new Date().toISOString(), base: BASE, h1: {}, pies: null, mono: {}, toque: {}, tapados: {}, alto: {} };
async function abrir(ruta, ancho, alto) {
  // Como Javiera: sin emulación táctil (puntero fino), así que a 390 manda el ancho y no el puntero.
  const p = await (await nav.newContext({ viewport: { width: ancho, height: alto } })).newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  await p.goto(BASE + ruta, { waitUntil: 'load' });
  await p.waitForTimeout(1200);
  p.errores = errores;
  return p;
}
for (const caso of ['praxi', 'sesenta']) {
  for (const ancho of [360, 390, 768, 1024, 1440]) {
    const p = await abrir(VISTAS[caso], ancho, 900);
    const h = await p.evaluate(js('h1-caso-b.js'));
    r.h1[`${caso}@${ancho}`] = { h1: h.out.length, visibles: h.out.filter((x) => x.rects > 0 && x.anc.length === 0).length, ocultosAlLector: h.dup.filter((x) => /aria-hidden=true/.test(x)), detalle: h.out, errores: p.errores };
    await p.close();
  }
}
{
  const p = await abrir(VISTAS.praxi, 1440, 900);
  r.pies = (await p.evaluate(js('pies-praxi.js'))).split('\n');
  await p.close();
}
for (const [nombre, ruta] of Object.entries(VISTAS)) {
  for (const ancho of [390, 1440]) {
    const p = await abrir(ruta, ancho, 844);
    r.mono[`${nombre}@${ancho}`] = await p.evaluate(js('mono.js'));
    if (ancho === 390) {
      r.toque[nombre] = await p.evaluate(js('area-toque-390.js'));
      // recorre la página en pantallas y junta lo tapado de cada una
      const altoDoc = await p.evaluate(() => document.documentElement.scrollHeight);
      r.alto[nombre] = altoDoc;
      const tap = [];
      for (let y = 0; y < altoDoc; y += 700) {
        await p.evaluate((yy) => window.scrollTo(0, yy), y);
        await p.waitForTimeout(80);
        tap.push(...(await p.evaluate(tapados)));
      }
      r.tapados[nombre] = tap;
    }
    await p.close();
  }
}
await nav.close();
fs.writeFileSync(path.join(AQUI, '..', 'datos', 'cierre-acta-paso-2.json'), JSON.stringify(r, null, 1));
const resumen = {
  h1: Object.fromEntries(Object.entries(r.h1).map(([k, v]) => [k, `${v.h1} h1, ${v.visibles} visible, ${v.ocultosAlLector.length} título aria-hidden, ${v.errores.length} errores`])),
  mono: Object.fromEntries(Object.entries(r.mono).map(([k, v]) => [k, v.length])),
  toque: Object.fromEntries(Object.entries(r.toque).map(([k, v]) => [k, v.n])),
  tapados: Object.fromEntries(Object.entries(r.tapados).map(([k, v]) => [k, v.length])),
  alto390: r.alto,
};
console.log(JSON.stringify(resumen, null, 1));
console.log(r.pies.join('\n'));
