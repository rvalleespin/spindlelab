// E13 · 30-oct · Diego. Uso: node foco-30oct.mjs <url del dist servido> <carpeta>. Recorre la home con Tab hasta #portada-cta a 1440
// y a 390, imprime el contorno de foco de cada parada y recorta el botón enfocado (foco-portada-<ancho>.png).
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, dir] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  const orden = [];
  for (let i = 0; i < 20; i++) {
    await p.keyboard.press('Tab');
    const a = await p.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return { id: e.id, cls: e.className, txt: e.textContent.trim().slice(0, 30), outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} off ${s.outlineOffset}`, vis: e.matches(':focus-visible') }; });
    orden.push(a);
    if (a.id === 'portada-cta') {
      const r = await p.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return { x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 16 }; });
      await p.screenshot({ path: `${dir}/foco-portada-${w}.png`, clip: r });
      break;
    }
  }
  console.log(w, orden.map((o) => `${o.id || o.cls.split(' ').pop()}«${o.txt}» ${o.vis ? o.outline : 'sin foco visible'}`).join('\n   '));
  await ctx.close();
}
await b.close();
