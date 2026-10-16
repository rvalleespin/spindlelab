// Ronda 2 · anchos de tableta y notebook chico: titulares de 138/91 px que salen de su caja.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [u, w, sel, n] of [['taller/home.html', 768, 'h2', 'taller-home-768-desarrollo'], ['taller/home.html', 1024, 'h2', 'taller-home-1024-desarrollo'], ['taller/acompanamiento-mensual.html', 1024, 'h1', 'taller-acomp-1024-h1'], ['pizarra/acompanamiento-mensual.html', 768, 'h1', 'pizarra-acomp-768-h1']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => /Desarrollo|Acompañamiento/.test(e.textContent)); el.scrollIntoView({ block: 'center' }); const rg = document.createRange(); rg.selectNodeContents(el); return { fs: getComputedStyle(el).fontSize, caja: Math.round(el.getBoundingClientRect().right), texto: Math.round(rg.getBoundingClientRect().right), sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }; }, sel);
  await p.waitForTimeout(300); await p.screenshot({ path: `${OUT}/${n}.png` });
  console.log(n, JSON.stringify(r));
}
await b.close();
