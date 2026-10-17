// Primera pantalla de la home (criterio 10) y la ficha lateral pegajosa a media página del caso (criterio 6).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.argv[2];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const r = {};
for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
  const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: w < 834 });
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  r['home@' + w] = await p.evaluate(() => {
    const caja = (s) => { const b = document.querySelector(s).getBoundingClientRect(); return { arriba: Math.round(b.top), abajo: Math.round(b.bottom) }; };
    return { alto: innerHeight, h1: caja('h1'), campo: caja('#chq-dominio'), boton: caja('#chq-btn'), h1px: getComputedStyle(document.querySelector('h1')).fontSize };
  });
  await p.close();
}
for (const ruta of ['trabajo/praxi/', 'trabajo/sesenta/']) {
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.evaluate((y) => window.scrollTo(0, y), Math.round(total / 2));
  await p.waitForTimeout(600);
  r[ruta + '@1440-mitad'] = await p.evaluate(() => {
    const b = document.querySelector('.caso__lateral').getBoundingClientRect();
    return { scrollY: Math.round(scrollY), lateralArriba: Math.round(b.top), lateralAbajo: Math.round(b.bottom), activa: (document.querySelector('.secciones a[aria-current]') || {}).textContent || null,
      secciones: [...document.querySelectorAll('.caso__rotulo')].map((e) => e.textContent) };
  });
  await p.close();
}
await nav.close();
fs.writeFileSync(path.join(AQUI, '..', 'datos', 'primera-y-ficha.json'), JSON.stringify(r, null, 1));
console.log(JSON.stringify(r, null, 1));
