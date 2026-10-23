// Javiera, QA de obra E12, vuelta 2. El botón «Cookies» del pie a 360 y 390 con el foco del teclado: captura del pie
// ampliada (×3) para ver si la hora pisa el contorno; y lo mismo con el CSS de antes del arreglo del defecto 7.
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar();
const ANTES = 'html body.a-body .pie-sitio #cookie-preferencias { padding-top: 6px !important; padding-bottom: 0 !important; margin-block: -18px -12px !important; }';
for (const w of [360, 390]) for (const v of ['hoy', 'antes']) {
  const ctx = await nav.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 3 });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + '/v3/metodo/', { waitUntil: 'networkidle' });
  if (v === 'antes') await p.addStyleTag({ content: ANTES });
  await p.evaluate(() => document.getElementById('cookie-preferencias').scrollIntoView({ block: 'center' }));
  await p.focus('#cookie-preferencias'); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab');
  const r = await p.evaluate(() => { const b = document.getElementById('cookie-preferencias').getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height, activo: document.activeElement.id }; });
  await p.screenshot({ path: join(QA, 'capturas', `d9-cookies-foco-${w}-${v}.png`), clip: { x: 0, y: r.y - 70, width: w, height: 140 } });
  console.log(w, v, JSON.stringify(r));
  await ctx.close();
}
await nav.close(); await srv.cerrar();
