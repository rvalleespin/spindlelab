// Ronda 3 · qué empuja el documento cuando se apaga el overflow-x: clip del body (fuera de la cinta).
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [u, w] of [['taller/home.html', 1024], ['taller/home.html', 1180], ['taller/home.html', 1280], ['taller/home.html', 1440]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const de = document.documentElement, cw = de.clientWidth;
    de.style.setProperty('overflow-x', 'visible', 'important'); document.body.style.setProperty('overflow-x', 'visible', 'important');
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('.cinta')) continue;
      const r = el.getBoundingClientRect(); if (r.width && r.right > cw + 1) { const cs = getComputedStyle(el); out.push([Math.round(r.left), Math.round(r.right), Math.round(r.top + scrollY), el.tagName.toLowerCase() + '.' + String(el.className).trim().replace(/\s+/g, '.'), cs.position, cs.transform.slice(0, 40)]); }
      for (const ps of ['::before', '::after']) { const cs = getComputedStyle(el, ps); if (cs.content && cs.content !== 'none' && cs.content !== 'normal' && cs.position === 'absolute') { /* no rect for pseudo */ } }
    }
    const caja = document.querySelector('.cinta'); const cr = caja?.getBoundingClientRect();
    return { cw, sw: de.scrollWidth, out: out.slice(0, 8), cinta: cr && [Math.round(cr.left), Math.round(cr.right)], cintaOv: caja && getComputedStyle(caja).overflow, caja: [...document.querySelectorAll('[data-cinta-caja]')].map(c => { const r = c.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), getComputedStyle(c).overflow, getComputedStyle(c).transform]; }) };
  });
  console.log(u, w, JSON.stringify(r));
}
await b.close();
