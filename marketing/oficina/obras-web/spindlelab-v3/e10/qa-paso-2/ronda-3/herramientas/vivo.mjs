// Tres valores del lock sorteados (semilla 'javiera-r2-20261016'), contra theready.com en vivo
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
async function abrir(w, h, url) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  const r = await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  const titulo = await p.title();
  for (let y = 0; y < 9000; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
  return { p, estado: r.status(), titulo };
}
// 1) margen lateral a 1440: borde izquierdo de los bloques de contenido (no a sangre) de la home
{ const { p, estado, titulo } = await abrir(1440, 900, 'https://www.theready.com/');
  const r = await p.evaluate(() => {
    const xs = {};
    for (const el of document.querySelectorAll('h1,h2,h3,h4,p')) { const rr = el.getBoundingClientRect(); if (!rr.width || !el.textContent.trim()) continue; const x = Math.round(rr.left); xs[x] = (xs[x] || 0) + 1; }
    const der = {}; for (const el of document.querySelectorAll('h1,h2,h3,h4,p')) { const rr = el.getBoundingClientRect(); if (!rr.width || !el.textContent.trim()) continue; const x = Math.round(1440 - rr.right); der[x] = (der[x] || 0) + 1; }
    const grid = [...document.querySelectorAll('.fluid-engine')].slice(0, 3).map(g => { const cs = getComputedStyle(g); return { cols: cs.gridTemplateColumns.split(' ').length, primera: cs.gridTemplateColumns.split(' ')[0], left: Math.round(g.getBoundingClientRect().left) }; });
    return { izquierda: Object.entries(xs).sort((a, b) => b[1] - a[1]).slice(0, 5), derecha: Object.entries(der).sort((a, b) => b[1] - a[1]).slice(0, 5), grid };
  });
  console.log('1) margen 1440', estado, titulo, JSON.stringify(r));
  await p.screenshot({ path: `${OUT}/home-1440.jpg`, type: 'jpeg', quality: 60 }); await p.context().close(); }
// 2) entradilla a 1440: IBM Plex Sans 22,2 px, 400, −0,008em, interlínea 1,2 (home, «Every operational environment…»)
{ const { p, estado } = await abrir(1440, 900, 'https://www.theready.com/');
  const r = await p.evaluate(() => [...document.querySelectorAll('p')].filter(e => /Every operational environment|Resisting this reality/.test(e.textContent)).map(e => { const cs = getComputedStyle(e); return { t: e.textContent.trim().slice(0, 40), ff: cs.fontFamily.slice(0, 30), fs: cs.fontSize, fw: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing }; }));
  console.log('2) entradilla 1440', estado, JSON.stringify(r)); await p.context().close(); }
// 3) h1 a 390: Saans 500 a 86,9 px (home, «We are / The Ready.»)
{ const { p, estado } = await abrir(390, 844, 'https://www.theready.com/');
  const r = await p.evaluate(() => [...document.querySelectorAll('h1')].map(e => { const cs = getComputedStyle(e); return { t: e.textContent.trim().replace(/\s+/g, ' ').slice(0, 30), ff: cs.fontFamily.slice(0, 22), fs: cs.fontSize, fw: cs.fontWeight, ls: cs.letterSpacing, lh: cs.lineHeight }; }));
  console.log('3) h1 390', estado, JSON.stringify(r));
  await p.screenshot({ path: `${OUT}/home-390.jpg`, type: 'jpeg', quality: 60 }); await p.context().close(); }
await b.close();
