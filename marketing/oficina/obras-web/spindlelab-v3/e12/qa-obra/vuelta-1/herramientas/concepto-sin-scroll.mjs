// Javiera, QA de obra E12, vuelta 1. Spec §6.12 y brief «Compuerta 1», punto 5: en las cuatro piezas de concepto, el
// rótulo «CONCEPTO» a la vista sin scroll. Por cada concepto y cada ancho de la obra (con el alto de comun.mjs): si la
// línea mono de la ficha («Concepto · 2026») queda entera dentro de la ventana y sin nada encima (elementsFromPoint en
// su centro y sus dos extremos), y qué cubre el medio principal en la primera pantalla. El rótulo horneado en la imagen
// o el video se mira en las capturas (no se puede leer del DOM).
// Uso: node concepto-sin-scroll.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, ANCHOS, servir, lanzar } from './comun.mjs';

const srv = await servir();
const nav = await lanzar();
const R = [];
for (const c of ['tonela', 'ocelo', 'sesenta', 'doceavo']) for (const [w, h] of Object.entries(ANCHOS)) {
  const tactil = +w < 834;
  const ctx = await nav.newContext({ viewport: { width: +w, height: h }, hasTouch: tactil, isMobile: tactil, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(`${srv.url}/v3/trabajo/${c}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  const m = await p.evaluate(() => {
    const cand = [...document.querySelectorAll('main *')].filter((e) => /^\s*Concepto\s*·\s*2026\s*$/i.test(e.textContent) && e.children.length <= 3);
    const e = cand.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top).find((x) => x.getBoundingClientRect().width > 0);
    if (!e) return { ficha: null };
    const r = e.getBoundingClientRect();
    const tapa = [];
    for (const [x, y] of [[r.left + 2, r.top + r.height / 2], [r.left + r.width / 2, r.top + r.height / 2], [r.right - 2, r.top + r.height / 2]]) {
      if (y > innerHeight || y < 0) { tapa.push('fuera de la ventana'); continue; }
      const t = document.elementsFromPoint(x, y)[0];
      if (t && t !== e && !e.contains(t)) tapa.push(`${t.tagName.toLowerCase()}.${[...t.classList].join('.')}`.slice(0, 40));
    }
    const medio = document.querySelector('main .medio, main [data-video]');
    const mr = medio ? medio.getBoundingClientRect() : null;
    return { ficha: { top: Math.round(r.top), bottom: Math.round(r.bottom), alto: innerHeight, tapa: [...new Set(tapa)] }, medio: mr ? { top: Math.round(mr.top), bottom: Math.round(mr.bottom) } : null };
  });
  const visible = m.ficha && m.ficha.bottom <= m.ficha.alto && m.ficha.top >= 0 && !m.ficha.tapa.length;
  R.push({ concepto: c, ancho: +w, alto: h, fichaVisible: visible, ...m });
  await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'concepto-sin-scroll.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.concepto} ${r.ancho}×${r.alto}: ficha «Concepto · 2026» ${r.fichaVisible ? 'a la vista' : 'NO'} ${JSON.stringify(r.ficha)} · medio ${JSON.stringify(r.medio)}`);
