// Ronda 3 · filetes de 1 px (pseudo en bloque o absoluto) con ancho > 100 px cuya caja toca el borde izquierdo.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [1440, 390]) for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) for (const ps of ['::before', '::after']) {
      const cs = getComputedStyle(el, ps); if (cs.content === 'none' || cs.content === 'normal') continue;
      const h = parseFloat(cs.height), wd = parseFloat(cs.width); if (!(h > 0 && h <= 2 && wd > 100)) continue;
      const er = el.getBoundingClientRect(); const ml = parseFloat(cs.marginLeft) || 0; const l = cs.position === 'absolute' ? parseFloat(cs.left) : NaN;
      const x = cs.position === 'absolute' ? er.left + (isNaN(l) ? 0 : l) : er.left + parseFloat(getComputedStyle(el).paddingLeft) + ml;
      out.push(`${x <= 1 ? 'BORDE' : 'x' + Math.round(x)} ${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}${ps} ${Math.round(wd)}px «${el.textContent.trim().slice(0, 20)}»`);
    }
    return out;
  });
  const borde = r.filter(x => x.startsWith('BORDE'));
  console.log(w, u.padEnd(36), `desde el borde ${borde.length}:`, borde.join(' | '), r.length > borde.length ? `· otros ${r.length - borde.length}` : '');
  await p.context().close();
}
await b.close();
