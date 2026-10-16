// Ronda 2 · ¿distintas o «una con menos cosas»? Por página a 1440: fondos de sección, piezas a sangre,
// columnas de texto (x de inicio de párrafos y titulares), alto, y lo que solo tiene una dirección.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const pag of ['home', 'acompanamiento-mensual', 'trabajo']) for (const d of ['taller', 'pizarra']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pag}.html`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const cw = document.documentElement.clientWidth;
    const fondos = new Set([...document.querySelectorAll('main section, main > *, footer')].map(s => getComputedStyle(s).backgroundColor).filter(c => c !== 'rgba(0, 0, 0, 0)'));
    const media = [...document.querySelectorAll('main img, main .foto-slot')].filter(e => e.getBoundingClientRect().width > 200);
    const sangre = media.filter(e => { const r = e.getBoundingClientRect(); return r.left <= 1 || r.right >= cw - 1; }).length;
    const xs = [...document.querySelectorAll('main h2, main p, main h3')].filter(e => e.getBoundingClientRect().width > 0).map(e => Math.round(e.getBoundingClientRect().left / 25) * 25);
    const cuenta = {}; xs.forEach(x => cuenta[x] = (cuenta[x] || 0) + 1);
    const top = Object.entries(cuenta).sort((a, b) => b[1] - a[1]); const totalx = xs.length;
    return { alto: document.documentElement.scrollHeight, fondos: [...fondos].length, media: media.length, sangre, columnas: top.slice(0, 4).map(([x, n]) => `${x}:${Math.round(100 * n / totalx)}%`).join(' '), nColumnas: top.filter(([x, n]) => n / totalx >= 0.05).length };
  });
  console.log(pag.padEnd(24), d.padEnd(8), JSON.stringify(r));
}
await b.close();
