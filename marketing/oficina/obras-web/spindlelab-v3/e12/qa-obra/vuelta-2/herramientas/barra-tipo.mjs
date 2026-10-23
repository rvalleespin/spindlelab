// Javiera, QA de obra E12, vuelta 2. Spec §2.3 (23-oct): en los conceptos, después del nombre, «·» (mono gris,
// aria-hidden) y el «Tipo» de la ficha de Clara tal cual, en un span con la clase de rótulo (mono 11, MAYÚSCULAS, gris),
// en una línea. Estilo computado, contraste contra la placa de la barra y el nombre accesible del summary.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = [];
for (const c of ['tonela', 'ocelo', 'sesenta', 'doceavo', 'praxi', 'combeau']) {
  const ctx = await nav.newContext({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(`${srv.url}/v3/trabajo/${c}/`, { waitUntil: 'networkidle' });
  const m = await p.evaluate(() => {
    const s = document.querySelector('.barra summary'); const t = s.querySelector('.barra__tipo');
    const fondo = (e) => { while (e) { const b = getComputedStyle(e).backgroundColor; if (b && b !== 'rgba(0, 0, 0, 0)') return b; e = e.parentElement; } return null; };
    const st = t ? getComputedStyle(t) : null;
    const punto = t ? t.previousElementSibling : null;
    return { tipo: t ? { texto: t.textContent, fuente: st.fontFamily.split(',')[0], tam: st.fontSize, transform: st.textTransform, color: st.color, fondo: fondo(t), ws: st.whiteSpace } : null,
      punto: punto ? { texto: punto.textContent, ariaHidden: punto.getAttribute('aria-hidden') } : null,
      hijos: [...s.children].map((x) => `${x.className}:${x.textContent.trim()}${x.getAttribute('aria-hidden') ? '(oculto)' : ''}`) };
  });
  // nombre accesible del summary, desde el árbol de accesibilidad
  const snap = await p.locator('.barra summary').ariaSnapshot().catch((e) => String(e));
  R.push({ c, ...m, aria: snap }); await ctx.close();
}
await nav.close(); await srv.cerrar();
const lum = (s) => { const [r, g, b] = s.match(/\d+/g).slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
for (const r of R) { if (r.tipo) { const a = lum(r.tipo.color), b = lum(r.tipo.fondo); r.tipo.contraste = +((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2); } }
writeFileSync(join(QA, 'crudos', 'barra-tipo.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(r.c, JSON.stringify(r.tipo), JSON.stringify(r.punto), '·', r.hijos.join(' | '), '· aria:', r.aria.replace(/\n/g, ' '));
