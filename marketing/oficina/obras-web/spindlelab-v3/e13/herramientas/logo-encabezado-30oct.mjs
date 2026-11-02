// E13 · 30-oct · Diego. Uso: node logo-encabezado-30oct.mjs <url del dist servido> <carpeta>. Recorta el logo del encabezado
// de /nosotros/ a 1440 (24 px) y 390 (20 px), a 1x y 2x, para contar en el píxel las filas del disco y las limpias hasta el asta.
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, dir] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const out = [];
for (const [ancho, dpr] of [[1440, 1], [1440, 2], [390, 1], [390, 2]]) {
  const ctx = await b.newContext({ viewport: { width: ancho, height: 800 }, deviceScaleFactor: dpr });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(base + '/nosotros/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => { const s = document.querySelector('.cab__logo svg').getBoundingClientRect(); return { x: s.x, y: s.y, w: s.width, h: s.height }; });
  const f = `${dir}/logo-${ancho}-${dpr}x.png`;
  await p.screenshot({ path: f, clip: { x: r.x, y: r.y, width: r.w, height: r.h } });
  out.push({ ancho, dpr, ...r, f });
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out));
