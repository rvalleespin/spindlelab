import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' });
  console.log(u, JSON.stringify(await p.evaluate(() => { const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]); const s = []; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) s.push(`h${hs[i - 1]}→h${hs[i]}`); return { saltos: s, robots: document.querySelector('meta[name="robots"]')?.content, sinDim: [...document.images].filter(i => !i.getAttribute('width')).length }; })));
}
await b.close();
