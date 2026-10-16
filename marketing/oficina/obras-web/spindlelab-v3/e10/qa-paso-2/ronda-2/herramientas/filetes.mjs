import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' });
  const n = await p.evaluate(() => { let c = 0; for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e, '::before'); if (cs.content !== 'none' && cs.content !== 'normal') { const w = parseFloat(cs.width), h = parseFloat(cs.height); if (h <= 2 && w > 100) c++; } } return c; });
  console.log(u, 'filetes ::before de ≤2 px', n);
}
await b.close();
