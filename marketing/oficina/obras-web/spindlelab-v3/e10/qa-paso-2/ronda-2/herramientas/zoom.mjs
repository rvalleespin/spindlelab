import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })).newPage();
for (const [u, txt, n] of [['taller/home.html', 'puedan citarte', 'mk-papel-sobre-banda'], ['taller/acompanamiento-mensual.html', 'lo hace y lo sostiene', 'mk-inline'], ['taller/trabajo.html', 'cuál es cuál', 'mk-cual'], ['taller/trabajo.html', 'Correr el chequeo', 'anillo']]) {
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const box = await p.evaluate((t) => { const el = [...document.querySelectorAll('.mk, a, button')].find(e => e.textContent.includes(t)); el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, txt);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/${n}.png`, clip: { x: Math.max(0, box.x - 120), y: Math.max(0, box.y - 60), width: Math.min(1440 - Math.max(0, box.x - 120), box.w + 260), height: box.h + 120 } });
}
// filetes que nacen del borde: elementos o pseudo con left 0 y alto ≤ 2 px
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) {
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' });
  const n = await p.evaluate(() => { let c = 0; for (const e of document.querySelectorAll('body *')) for (const ps of ['::before', '::after']) { const cs = getComputedStyle(e, ps); if (cs.content === 'none' || cs.position !== 'absolute') continue; const h = parseFloat(cs.height), bt = parseFloat(cs.borderTopWidth); if ((h <= 2 && h > 0 && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') || (bt > 0 && bt <= 2 && (h === 0 || isNaN(h)))) { const r = e.getBoundingClientRect(); const left = r.left + parseFloat(cs.left || 0); if (left <= 1) c++; } } return c; });
  console.log(u, 'filetes desde el borde (pseudo)', n);
}
await b.close();
