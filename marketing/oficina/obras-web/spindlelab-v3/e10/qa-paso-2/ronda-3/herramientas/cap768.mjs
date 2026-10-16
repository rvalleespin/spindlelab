import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [n, url, w, y] of [['pizarra-acomp-768', 'pizarra/acompanamiento-mensual.html', 768, 0], ['taller-acomp-768', 'taller/acompanamiento-mensual.html', 768, 0], ['taller-home-768', 'taller/home.html', 768, 0], ['pizarra-acomp-1024', 'pizarra/acompanamiento-mensual.html', 1024, 0], ['pizarra-acomp-1180', 'pizarra/acompanamiento-mensual.html', 1180, 0]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto('http://127.0.0.1:8780/' + url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const h = await p.evaluate(() => { const h1 = document.querySelector('h1'); const cs = getComputedStyle(h1); const range = document.createRange(); range.selectNodeContents(h1); const rr = range.getBoundingClientRect(); return { fs: cs.fontSize, box: Math.round(h1.getBoundingClientRect().right), texto: Math.round(rr.right), sw: document.documentElement.scrollWidth }; });
  console.log(n, JSON.stringify(h));
  await p.screenshot({ path: `${OUT}/${n}.png` });
}
await b.close();
