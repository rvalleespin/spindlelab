// Javiera, QA de obra E12, vuelta 2. El botón «Cookies» del pie (#cookie-preferencias, lo cuelga consent-banner.js) bajo
// 834: su caja de toque, la del texto de la hora (p.cab__hora) y los puntos de su área que recibe la hora. Y lo mismo
// con el CSS de antes del arreglo del defecto 7 (margin-block -18 -12 y padding-top 6, archivo.css de 6739bab),
// inyectado, para saber si el cruce viene del arreglo o ya estaba.
// Uso: node pie-cookies.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = [];
const ANTES = 'html body.a-body .pie-sitio #cookie-preferencias { padding-top: 6px !important; padding-bottom: 0 !important; margin-block: -18px -12px !important; }';
for (const w of [360, 390, 414, 600, 768]) for (const variante of ['hoy', 'antes']) {
  const ctx = await nav.newContext({ viewport: { width: w, height: 844 }, hasTouch: true, isMobile: true });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  if (variante === 'antes') await p.addStyleTag({ content: ANTES });
  const m = await p.evaluate(() => {
    const b = document.getElementById('cookie-preferencias'); b.scrollIntoView({ block: 'center' });
    const rb = b.getBoundingClientRect();
    const horas = [...document.querySelectorAll('.pie-sitio .cab__hora, .pie-sitio p')].map((e) => { const r = e.getBoundingClientRect(); return { e: `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}`, txt: e.textContent.trim().slice(0, 30), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) }; });
    let n = 0, propio = 0; const otros = {};
    for (let y = rb.top + 0.5; y < rb.bottom; y += 1) for (let x = rb.left + 0.5; x < rb.right; x += 2) {
      n++; const e = document.elementFromPoint(x, y);
      if (e && (e === b || b.contains(e))) propio++; else { const k = e ? `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}` : 'nada'; otros[k] = (otros[k] || 0) + 1; }
    }
    const txt = document.createRange(); txt.selectNodeContents(b); const rt = txt.getBoundingClientRect();
    return { boton: { top: Math.round(rb.top), bottom: Math.round(rb.bottom), left: Math.round(rb.left), right: Math.round(rb.right) }, texto: { top: Math.round(rt.top), bottom: Math.round(rt.bottom) }, propio: `${Math.round(100 * propio / n)} %`, otros, vecinos: horas };
  });
  R.push({ w, variante, ...m }); await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'pie-cookies.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.w} ${r.variante}: botón ${JSON.stringify(r.boton)} texto ${JSON.stringify(r.texto)} propio ${r.propio} otros ${JSON.stringify(r.otros)} · ${r.vecinos.map((v) => `${v.e} «${v.txt}» ${v.top}–${v.bottom} x ${v.left}–${v.right}`).join(' | ')}`);
