// Javiera, QA de obra E12, vuelta 1. Lo que foco.mjs marcó como «tapado», medido de cerca: por cada par de controles
// vecinos, la caja de cada uno (su área de toque) y cuánto se pisan, y qué elemento recibe el toque en cada punto del
// área del primero (una grilla de 4 px). También la caja de los summary de las preguntas a 390 (foco.mjs: «fuera»).
// Uso: node solapes.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = [];
const CASOS = [
  ['/v3/', 390, '.pie-sitio a[aria-label="SpindleLab"], .pie-sitio a:has(svg)', '.pie-sitio__correo'],
  ['/v3/trabajo/combeau/', 390, 'a[href*="original"], figcaption a, .medio__pie a', null],
  ['/v3/contacto/', 390, 'input[type="checkbox"]:not([name="botcheck"])', 'a[href="/privacidad/"]'],
  ['/v3/contacto/', 390, 'a[href="/privacidad/"]', 'button[type="submit"]'],
  ['/v3/contacto/', 1440, 'input[type="checkbox"]:not([name="botcheck"])', 'a[href="/privacidad/"]'],
];
for (const [ruta, w, a, b] of CASOS) {
  const t = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: w < 834 ? 844 : 900 }, hasTouch: t, isMobile: t });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  const m = await p.evaluate(([a, b]) => {
    const A = document.querySelector(a); if (!A) return { error: 'no ' + a };
    A.scrollIntoView({ block: 'center' });
    const ra = A.getBoundingClientRect();
    const B = b ? document.querySelector(b) : null; const rb = B ? B.getBoundingClientRect() : null;
    const caja = (r) => r && { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
    let n = 0, propio = 0; const otros = {};
    for (let y = ra.top + 1; y < ra.bottom - 1; y += 4) for (let x = ra.left + 1; x < ra.right - 1; x += 4) {
      n++; const e = document.elementFromPoint(x, y);
      if (e && (e === A || A.contains(e) || (A.labels && [...A.labels].some((l) => l.contains(e))))) propio++;
      else { const k = e ? `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}`.slice(0, 40) : 'nada'; otros[k] = (otros[k] || 0) + 1; }
    }
    let solape = null;
    if (rb) { const ix = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)); const iy = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)); solape = `${Math.round(ix)}×${Math.round(iy)}`; }
    return { a: A.outerHTML.slice(0, 90), cajaA: caja(ra), cajaB: caja(rb), solape, propio: `${propio}/${n} (${Math.round(100 * propio / n)} %)`, otros };
  }, [a, b]);
  R.push({ ruta, w, a, b, ...m });
  await ctx.close();
}
// summary de las preguntas a 390
{
  const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  for (const ruta of ['/v3/blog/cuanto-cuesta-seo-tecnico-chile/', '/v3/blog/que-es-aeo-geo/', '/v3/servicios/desarrollo-web/']) {
    await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
    const s = await p.evaluate(() => [...document.querySelectorAll('summary')].slice(0, 3).map((e) => { const r = e.getBoundingClientRect(); const st = getComputedStyle(e); return { txt: e.textContent.trim().slice(0, 30), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), ml: st.marginLeft, outlineOffset: st.outlineOffset, vw: innerWidth }; }));
    R.push({ ruta, w: 390, summaries: s });
  }
  await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'solapes.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(JSON.stringify(r));
