// Javiera, QA de obra E12, vuelta 2 (sin cambios de método desde la vuelta 1). Cotas de la spec medidas en el build (§1.3, §1.4, §2.1 a §2.4): el h1 de la
// portada, la cinta, la barra y el medio principal del caso, la barra del índice, el h2 pegajoso de una interior.
// Uso: node medidas-spec.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = {};
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const t = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const box = (s) => `(() => { const e = document.querySelector(${JSON.stringify(s)}); if (!e) return null; const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return { x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), fs: c.fontSize, lh: c.lineHeight, fw: c.fontWeight, stretch: c.fontStretch, radio: c.borderRadius, pos: c.position, top: c.top }; })()`;
  await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  R[`home ${w}`] = { h1: await p.evaluate(box('.portada-v h1')), portada: await p.evaluate(box('.portada-v')), cinta: await p.evaluate(box('main section:nth-of-type(2) .medio')), cab: await p.evaluate(box('.cab')) };
  await p.goto(srv.url + '/v3/trabajo/praxi/', { waitUntil: 'networkidle' });
  R[`praxi ${w}`] = { h1: await p.evaluate(box('main h1')), barra: await p.evaluate(box('.caso__lateral, .caso header')), medio: await p.evaluate(box('main .medio')), h2: await p.evaluate(box('main h2')), cuerpo: await p.evaluate(box('main .caso-sec p')) };
  await p.goto(srv.url + '/v3/trabajo/', { waitUntil: 'networkidle' });
  R[`trabajo ${w}`] = { lateral: await p.evaluate(box('.indice__lateral')), h1: await p.evaluate(box('main h1')) };
  await p.goto(srv.url + '/v3/servicios/desarrollo-web/', { waitUntil: 'networkidle' });
  R[`dw ${w}`] = { h1: await p.evaluate(box('main h1')), h2: await p.evaluate(box('main section h2')), franja: await p.evaluate(box('main .medio')) };
  await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'medidas-spec.json'), JSON.stringify(R, null, 1));
for (const [k, v] of Object.entries(R)) console.log(k, JSON.stringify(v));
