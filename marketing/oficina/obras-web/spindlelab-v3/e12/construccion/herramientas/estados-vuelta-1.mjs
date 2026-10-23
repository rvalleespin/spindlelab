// QA de obra, vuelta 1 (23-oct-2026, Diego). Las capturas de los estados que cambiaron en esta vuelta, sobre el build
// servido en local con el servidor de rangos de Javiera: la barra flotante 8 px sobre el aviso de cookies abierto (y
// a 16 al rechazarlo) en conceptos, casos y artículos; el «Concepto» en la barra; el chequeo de la home sobre el aviso
// bajo 834; y, de cerca, las áreas de toque del pie y de la original de Combeau a 390 (pintadas con un contorno).
// Uso: node estados-vuelta-1.mjs <carpeta de salida>
import { servir, lanzar } from '../../qa-obra/vuelta-1/herramientas/comun.mjs';
const OUT = process.argv[2];
const srv = await servir(); const nav = await lanzar();
const casos = [
  ['/v3/trabajo/tonela/', 768, 1024, true, 'tonela-768-aviso'],
  ['/v3/trabajo/doceavo/', 1024, 768, true, 'doceavo-1024-aviso'],
  ['/v3/trabajo/sesenta/', 360, 800, false, 'sesenta-360'],
  ['/v3/trabajo/sesenta/', 360, 800, true, 'sesenta-360-aviso'],
  ['/v3/trabajo/praxi/', 390, 844, true, 'praxi-390-aviso'],
  ['/v3/blog/que-es-aeo-geo/', 390, 844, true, 'articulo-390-aviso'],
  ['/v3/', 834, 1112, true, 'home-834-aviso'],
  ['/v3/', 360, 800, true, 'home-360-aviso'],
];
for (const [ruta, w, h, aviso, nom] of casos) {
  const t = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t, reducedMotion: 'reduce' });
  if (!aviso) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
  const m = await p.evaluate(() => { const b = document.querySelector('.barra'); const a = document.getElementById('cookie-banner'); return { barra: b && getComputedStyle(b).display !== 'none' ? Math.round(b.getBoundingClientRect().bottom) : null, aviso: a && !a.hidden ? Math.round(a.getBoundingClientRect().top) : null, var: getComputedStyle(document.documentElement).getPropertyValue('--a-alto-aviso') }; });
  console.log(nom, JSON.stringify(m));
  await p.screenshot({ path: `${OUT}/${nom}.png` });
  if (aviso && m.barra) { await p.click('#cookie-reject'); await p.waitForTimeout(300); const n = await p.evaluate(() => ({ barra: Math.round(innerHeight - document.querySelector('.barra').getBoundingClientRect().bottom), var: getComputedStyle(document.documentElement).getPropertyValue('--a-alto-aviso') })); console.log('  al rechazar:', JSON.stringify(n)); }
  await ctx.close();
}
// el pie a 390 y la original de Combeau a 390, de cerca, con las áreas pintadas
for (const [ruta, sel, nom] of [['/v3/', '.pie-sitio', 'pie-390'], ['/v3/trabajo/combeau/', '.fila .pie a', 'combeau-original-390']]) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  const caja = await p.evaluate((sel) => { const e = document.querySelector(sel); e.scrollIntoView({ block: 'center' });
    for (const a of (sel === '.pie-sitio' ? e.querySelectorAll('a, button') : [e])) a.style.outline = '1px solid rgba(255,80,80,.9)';
    const r = (sel === '.pie-sitio' ? e : e.closest('figure')).getBoundingClientRect(); return { x: 0, y: Math.max(0, r.top - (sel === '.pie-sitio' ? 30 : -r.height + 120)), width: 390, height: sel === '.pie-sitio' ? r.height + 60 : 180 }; }, sel);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `${OUT}/${nom}.png`, clip: caja });
  await ctx.close();
}
await nav.close(); await srv.cerrar();
