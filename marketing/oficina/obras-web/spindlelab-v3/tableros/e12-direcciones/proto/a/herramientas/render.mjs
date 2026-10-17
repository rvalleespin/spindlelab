// Dirección A · capturas de las cinco vistas: primera pantalla y página completa en tramos de ≤ 4000 px (JPEG 82),
// a 1440 (dpr 1) y a 390 (dpr 2, teléfono). Lucía, 17-oct-2026.
// Uso: node render.mjs <base-url> <carpeta-img> [vista,vista]   (base: la de servir.py)
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [base, salida, solo] = process.argv.slice(2);
fs.mkdirSync(salida, { recursive: true });
export const VISTAS = [
  ['home', ''],
  ['trabajo', 'trabajo/'],
  ['caso-praxi', 'trabajo/praxi/'],
  ['caso-sesenta', 'trabajo/sesenta/'],
  ['desarrollo-web', 'servicios/desarrollo-web/'],
];
const ANCHOS = [[1440, 900, 1, false], [390, 844, 2, true]];
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const hechas = [];
for (const [id, ruta] of VISTAS.filter(([i]) => !solo || solo.split(',').includes(i))) {
  for (const [w, h, dpr, movil] of ANCHOS) {
    const ctx = await navegador.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: movil, hasTouch: movil, locale: 'es-CL', timezoneId: 'America/Santiago' });
    const p = await ctx.newPage();
    const errores = [];
    p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
    p.on('pageerror', x => errores.push(String(x)));
    await p.goto(base + ruta, { waitUntil: 'load' });
    await p.waitForTimeout(400);
    await p.evaluate(() => document.fonts.ready);
    // primera pantalla: tal como llega, con la cinta en su primer tramo
    await p.waitForTimeout(700);
    await p.screenshot({ path: path.join(salida, `a-${id}-${w}-primera.jpg`), type: 'jpeg', quality: 82 });
    // página completa: se recorre para que entren los bloques con resorte y carguen las imágenes diferidas
    await p.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.6)) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 140));
      }
      window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 700));
    });
    await p.evaluate(() => Promise.race([new Promise(r => setTimeout(r, 8000)), Promise.all(Array.from(document.images).filter(i => i.offsetParent !== null).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })))]));
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    const tramo = Math.floor(4000 / dpr);
    let n = 1;
    for (let y = 0; y < alto; y += tramo, n++) {
      const f = path.join(salida, `a-${id}-${w}-${String(n).padStart(2, '0')}.jpg`);
      await p.screenshot({ path: f, type: 'jpeg', quality: 82, fullPage: true, clip: { x: 0, y, width: w, height: Math.min(tramo, alto - y) } });
    }
    hechas.push({ id, ancho: w, dpr, alto, tramos: n - 1, errores });
    await ctx.close();
  }
}
await navegador.close();
console.log(JSON.stringify(hechas, null, 1));
