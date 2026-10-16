// Ronda 2 · jerarquía de encabezados, noindex, carga de las imágenes del hero, ancho útil del campo a 390.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html', 'DIST']) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await p.goto(u === 'DIST' ? 'http://127.0.0.1:8781/v3/' : 'http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]); let saltos = []; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) saltos.push(`h${hs[i - 1]}→h${hs[i]}`);
    const robots = document.querySelector('meta[name="robots"]')?.content;
    const heroImgs = [...document.images].filter(i => i.getBoundingClientRect().top < 1200).map(i => `${i.getAttribute('loading') || '-'}/${i.getAttribute('fetchpriority') || '-'}`);
    const inp = document.querySelector('#chq-dominio'); const cs = getComputedStyle(inp);
    const util = inp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const c = document.createElement('canvas').getContext('2d'); c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const largo = c.measureText('constructoraandesur.cl').width, medio = c.measureText('ferreteriaroma.cl').width;
    return { saltos, robots, heroImgs: heroImgs.slice(0, 6), campoUtil: Math.round(util), largo22: Math.round(largo), medio17: Math.round(medio) };
  }).catch(e => ({ err: e.message.slice(0, 80) }));
  console.log(u, JSON.stringify(r));
}
await b.close();
