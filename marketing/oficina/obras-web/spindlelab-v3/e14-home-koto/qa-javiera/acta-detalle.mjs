// QA E14 (Javiera, 2-nov-2026): lo que la serie de acta-mov.mjs no ve. (1) el cambio de pieza contra el reloj, (2) la
// opacidad real de cada tarjeta en las posiciones del trabajo, (3) el recorrido con Tab de la home a 1440.
// Uso: node acta-detalle.mjs <url>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const URL = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(URL, { waitUntil: 'networkidle' });
await p.evaluate(() => document.getElementById('cookie-banner')?.remove());
const out = {};
// (2) opacidades
const tops = await p.evaluate(() => [...document.querySelectorAll('[data-tarjeta]')].map((t) => t.getBoundingClientRect().top + scrollY));
out.tarjetas = [];
for (const y of [tops[0] - 600, tops[0] - 300, tops[1] - 500, tops[1] - 400, tops[2] - 500, tops[2] - 400, tops[2] + 300]) {
  await p.evaluate((y) => scrollTo(0, y), Math.round(y)); await p.waitForTimeout(250);
  await p.evaluate((y) => scrollTo(0, y + 1), Math.round(y)); await p.waitForTimeout(700);
  out.tarjetas.push(await p.evaluate(() => ({ y: scrollY, nombre: document.querySelector('.k-tf__panel [data-nombre]')?.textContent,
    op: [...document.querySelectorAll('[data-tarjeta]')].map((t) => { const a = t.querySelector('.k-tf__tarjeta'); return +getComputedStyle(a).opacity; }),
    pie: (() => { const f = [...document.querySelectorAll('.k-tf__pieza p, .k-tf__pieza figcaption')].find((e) => /caballo/.test(e.textContent)); return f ? +getComputedStyle(f).opacity : null; })(),
    bajada: document.querySelector('[data-bajada]')?.innerText.slice(0, 50) })));
}
// (1) reloj (bajando): de antes del umbral de la 3.ª tarjeta a después
await p.evaluate((y) => scrollTo(0, y), Math.round(tops[2] - 700)); await p.waitForTimeout(800);
await p.evaluate((y) => scrollTo(0, y), Math.round(tops[2] - 460)); await p.waitForTimeout(800); // bajando: sin la histéresis de subida
await p.evaluate((y) => scrollTo(0, y), Math.round(tops[2] - 440));
const t0 = Date.now(); out.reloj = [];
for (let i = 0; i < 40; i++) {
  out.reloj.push(await p.evaluate(() => { const n = document.querySelector('.k-tf__panel [data-nombre]'); const b = document.querySelector('[data-bajada]');
    return [n.textContent.trim().slice(0, 10), getComputedStyle(n).transform, +getComputedStyle(b).opacity]; }).then((v) => [Date.now() - t0, ...v]));
  await p.waitForTimeout(15);
}
// (3) Tab
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
out.tab = [];
for (let i = 0; i < 40; i++) {
  await p.keyboard.press('Tab'); await p.waitForTimeout(60);
  out.tab.push(await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); const r = a.getBoundingClientRect();
    return [a.tagName, (a.getAttribute('aria-label') || a.innerText || a.getAttribute('href') || '').trim().slice(0, 40), a.getAttribute('href'), cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, Math.round(r.top), Math.round(r.width) + 'x' + Math.round(r.height)]; }));
}
console.log(JSON.stringify(out, null, 0).replace(/\],\[/g, '],\n['));
await b.close();
