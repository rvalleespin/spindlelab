import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const x = (p, i) => p.evaluate((i) => { const pi = document.querySelectorAll('.cinta__pista')[i]; return new DOMMatrix(getComputedStyle(pi).transform).m41; }, i);
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'pizarra/home.html', 'taller/trabajo.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) for (const w of [1440, 390]) for (const rm of ['no-preference', 'reduce']) {
  const p = await (await b.newContext({ viewport: { width: w, height: 844 }, reducedMotion: rm })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const n = await p.evaluate(() => document.querySelectorAll('[data-cinta-caja]').length);
  if (!n) { if (rm === 'no-preference') console.log(u, w, 'sin cinta'); await p.context().close(); continue; }
  await p.evaluate(() => document.querySelector('[data-cinta-caja]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
  const a = await x(p, 0); await p.waitForTimeout(2000); const c = await x(p, 0);
  const vel = (a - c) / 2;
  const info = await p.evaluate(() => { const bt = document.querySelector('.cinta__pausa'); const r = bt.getBoundingClientRect(); return { pressed: bt.getAttribute('aria-pressed'), label: bt.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height), enHidden: !!bt.closest('[aria-hidden="true"]'), cintaHidden: document.querySelector('.cinta').getAttribute('aria-hidden'), enHeading: !!document.querySelector('.cinta').closest('h1,h2,h3') }; });
  // pausa con teclado: foco por Tab hasta el botón
  let llegó = false; await p.evaluate(() => document.activeElement.blur());
  await p.evaluate(() => { const bt = document.querySelector('.cinta__pausa'); const prev = [...document.querySelectorAll('a,button,input')].filter(e => e.compareDocumentPosition(bt) & Node.DOCUMENT_POSITION_FOLLOWING).pop(); prev?.focus(); });
  for (let i = 0; i < 6 && !llegó; i++) { await p.keyboard.press('Tab'); llegó = await p.evaluate(() => document.activeElement?.classList.contains('cinta__pausa')); }
  let tras = null, vel2 = null;
  if (llegó) {
    const foco = await p.evaluate(() => { const cs = getComputedStyle(document.activeElement); return `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`; });
    await p.keyboard.press('Enter'); await p.waitForTimeout(300);
    const a2 = await x(p, 0); await p.waitForTimeout(1500); const c2 = await x(p, 0); vel2 = (a2 - c2) / 1.5;
    tras = await p.evaluate(() => document.querySelector('.cinta__pausa').getAttribute('aria-pressed'));
    // fuera de pantalla
    await p.keyboard.press('Enter'); await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
    const fuera = await p.evaluate(() => { const c = document.querySelector('[data-cinta-caja]'); return { cls: c.classList.contains('cinta--fuera'), ps: getComputedStyle(c.querySelector('.cinta__pista')).animationPlayState }; });
    console.log(u, w, rm, `cintas ${n} · ${vel.toFixed(1)} px/s · botón ${info.w}×${info.h} ${info.label} pressed=${info.pressed} · tras Enter pressed=${tras} y ${vel2.toFixed(1)} px/s · foco ${foco} · fuera ${JSON.stringify(fuera)} · cinta aria-hidden=${info.cintaHidden} botón-en-hidden=${info.enHidden} en-encabezado=${info.enHeading}`);
  } else console.log(u, w, rm, `cintas ${n} · ${vel.toFixed(1)} px/s · NO llegó con Tab`, JSON.stringify(info));
  await p.context().close();
}
await b.close();
