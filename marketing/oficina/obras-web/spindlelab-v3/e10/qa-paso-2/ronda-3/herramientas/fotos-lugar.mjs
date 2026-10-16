// Ronda 3 · dónde está cada espacio de foto (para contrastar con la «sección» de la pauta): fondo de su banda,
// titular de su sección, texto vecino a la izquierda (misma altura) y botones de la sección.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => [...document.querySelectorAll('.foto-slot')].map(s => {
    const id = s.querySelector('[data-rotulo-foto]')?.textContent.match(/F\d+/)?.[0];
    let fondo = 'transparent', e = s; while (e && (fondo = getComputedStyle(e).backgroundColor) === 'rgba(0, 0, 0, 0)') e = e.parentElement;
    if (e === s) { let q = s.parentElement; while (q && (fondo = getComputedStyle(q).backgroundColor) === 'rgba(0, 0, 0, 0)') q = q.parentElement; }
    const sec = s.closest('section, header, article, [class*="campo"]');
    const tit = sec?.querySelector('h1,h2,h3')?.textContent.replace(/\s+/g, ' ').trim().slice(0, 50);
    const sr = s.getBoundingClientRect();
    const vecino = [...document.querySelectorAll('p,h2,h3')].filter(x => !s.contains(x) && !x.closest('.cinta')).map(x => [x, x.getBoundingClientRect()]).filter(([, r]) => r.right <= sr.left + 2 && r.bottom > sr.top && r.top < sr.bottom).map(([x]) => x.textContent.replace(/\s+/g, ' ').trim().slice(0, 45));
    const btns = sec ? [...sec.querySelectorAll('a.d-btn, button')].map(x => x.textContent.trim()).filter(Boolean) : [];
    return { id, fondo, tit, vecino: vecino.slice(0, 3), btns };
  }));
  for (const x of r) console.log(u.padEnd(36), x.id, `fondo ${x.fondo} · sección «${x.tit}» · a la izquierda ${JSON.stringify(x.vecino)} · botones ${JSON.stringify(x.btns)}`);
  await p.context().close();
}
await b.close();
