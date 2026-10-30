// E13 · 30-oct · Diego. Uso: node capturas-30oct.mjs <url del dist servido> <carpeta>. Escribe home, contacto y nosotros a 390 y 1440
// (página completa, PNG) y por consola el alto, el desborde, los h1 y qué botones llevan el amarillo de acción.
// Capturas de página completa de home, contacto y nosotros a 390 y 1440, con el aviso de cookies cerrado (consentimiento
// guardado como rechazo) y la página recorrida para que los [data-entrada] queden asentados. Y el logo del encabezado.
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, dir] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const ancho of [390, 1440]) {
  for (const ruta of ['/', '/contacto/', '/nosotros/']) {
    const ctx = await b.newContext({ viewport: { width: ancho, height: ancho === 390 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage();
    const errores = [];
    p.on('pageerror', (e) => errores.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
    await p.goto(base + ruta, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(500);
    const nombre = `${dir}/${ruta === '/' ? 'home' : ruta.replace(/\//g, '')}-${ancho}.png`;
    await p.screenshot({ path: nombre, fullPage: true });
    const info = await p.evaluate(() => ({
      alto: document.documentElement.scrollHeight,
      desborde: document.documentElement.scrollWidth - innerWidth,
      h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
      amarillos: [...document.querySelectorAll('a,button')].filter((e) => getComputedStyle(e).backgroundColor === 'rgb(255, 232, 0)').map((e) => (e.id || e.className) + ': ' + e.textContent.trim()),
    }));
    console.log(ancho, ruta, JSON.stringify(info), errores.length ? 'ERRORES ' + errores.join(' | ') : 'sin errores de consola');
    await ctx.close();
  }
}
await b.close();
