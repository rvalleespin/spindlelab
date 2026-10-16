// Ronda 3 · peso de la letra display: el computado y si la variable lo dibuja (ancho de una palabra a 500 / 540 / 600).
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/home.html', 'pizarra/acompanamiento-mensual.html']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const h = document.querySelector('h1'); const cs = getComputedStyle(h);
    const medir = (w) => { const s = document.createElement('span'); s.style.cssText = `font-family:${cs.fontFamily};font-size:200px;font-weight:${w};letter-spacing:0;position:absolute;white-space:nowrap`; s.textContent = 'Acompañamiento'; document.body.append(s); const x = s.getBoundingClientRect().width; s.remove(); return Math.round(x * 10) / 10; };
    const caras = [...document.fonts].filter(f => /Instrument/i.test(f.family)).map(f => `${f.family} ${f.weight} ${f.status}`);
    return { h1: `${cs.fontFamily.split(',')[0]} ${cs.fontWeight}`, h2: [...new Set([...document.querySelectorAll('h2')].map(e => getComputedStyle(e).fontWeight))], anchos: { 500: medir(500), 540: medir(540), 600: medir(600) }, caras };
  });
  console.log(u, JSON.stringify(r));
}
await b.close();
