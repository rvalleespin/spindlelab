// Javiera, QA de obra E12, vuelta 2 (23-oct-2026; la de la vuelta 1, ampliada como pide la spec §2.3 del 23-oct).
// Spec §6.12 y brief «Compuerta 1», punto 5: en las cuatro piezas de concepto, el rótulo «CONCEPTO» a la vista sin
// scroll, en los ocho tamaños, con el aviso de cookies abierto (primera visita, sin elección guardada) y cerrado.
// Por cada concepto × tamaño × estado del aviso: cada nodo del DOM cuyo texto propio es «Concepto» o «Concepto · 2026»
// (la ficha lateral o el tipo de la barra flotante), si queda entero dentro de la ventana y sin nada encima
// (elementsFromPoint en su centro y sus dos extremos). Se pide al menos uno. También el borde de arriba del aviso y el
// de abajo de la barra, para ver los 8 px de §2.3. Guarda la captura de la primera pantalla de cada caso.
// Uso: node concepto-sin-scroll.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { QA, ANCHOS, servir, lanzar } from './comun.mjs';

const CAP = join(QA, 'capturas', 'concepto'); mkdirSync(CAP, { recursive: true });
const srv = await servir();
const nav = await lanzar();
const R = [];
for (const aviso of ['abierto', 'cerrado']) for (const c of ['tonela', 'ocelo', 'sesenta', 'doceavo']) for (const [w, h] of Object.entries(ANCHOS)) {
  const tactil = +w < 834;
  const ctx = await nav.newContext({ viewport: { width: +w, height: h }, hasTouch: tactil, isMobile: tactil, reducedMotion: 'reduce' });
  if (aviso === 'cerrado') await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(`${srv.url}/v3/trabajo/${c}/`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  const m = await p.evaluate(() => {
    const propio = (e) => [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    const cand = [...document.body.querySelectorAll('*')].filter((e) => /^Concepto(\s*·\s*2026)?$/i.test(propio(e)) || /^Concepto\s*·\s*2026$/i.test(e.textContent.trim()) && e.children.length <= 3);
    const res = cand.map((e) => {
      const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      const tapa = [];
      if (!r.width || !r.height || s.visibility === 'hidden' || s.display === 'none') tapa.push('no se pinta');
      else for (const [x, y] of [[r.left + 1, r.top + r.height / 2], [r.left + r.width / 2, r.top + r.height / 2], [r.right - 1, r.top + r.height / 2]]) {
        if (y > innerHeight || y < 0 || x < 0 || x > innerWidth) { tapa.push('fuera de la ventana'); continue; }
        const t = document.elementsFromPoint(x, y)[0];
        if (t && t !== e && !e.contains(t)) tapa.push(`${t.tagName.toLowerCase()}#${t.id}.${[...t.classList].join('.')}`.slice(0, 50));
      }
      const entero = r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
      return { texto: e.textContent.trim().replace(/\s+/g, ' '), clase: `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}`, top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), entero, tapa: [...new Set(tapa)], ok: entero && !tapa.length, transform: s.textTransform };
    });
    const av = document.getElementById('cookie-banner');
    const avTop = av && !av.hidden && getComputedStyle(av).display !== 'none' ? Math.round(av.getBoundingClientRect().top) : null;
    const barra = document.querySelector('.barra');
    const rb = barra && getComputedStyle(barra).display !== 'none' ? barra.getBoundingClientRect() : null;
    const sum = barra?.querySelector('summary');
    const lineas = sum ? Math.round(sum.getBoundingClientRect().height) : null;
    // lo que sobra en la fila de la barra (que nada se parta en dos)
    let sobra = null;
    if (sum) { const hijos = [...sum.children].filter((x) => x.getBoundingClientRect().width > 0); const ancho = hijos.reduce((a, x) => a + x.getBoundingClientRect().width, 0); sobra = Math.round(sum.clientWidth - ancho); }
    return { res, aviso: avTop, barra: rb ? { top: Math.round(rb.top), bottom: Math.round(rb.bottom) } : null, summaryAlto: lineas, sobra, ventana: innerHeight };
  });
  const ok = m.res.some((x) => x.ok);
  await p.screenshot({ path: join(CAP, `${c}-${w}-aviso-${aviso}.jpg`), type: 'jpeg', quality: 60 });
  R.push({ concepto: c, ancho: +w, alto: h, aviso, ok, ...m });
  await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'concepto-sin-scroll.json'), JSON.stringify(R, null, 1));
for (const r of R) {
  const bueno = r.res.filter((x) => x.ok).map((x) => `«${x.texto}» ${x.clase} ${x.top}–${x.bottom}`);
  const brecha = r.aviso !== null && r.barra ? r.aviso - r.barra.bottom : null;
  console.log(`${r.concepto} ${r.ancho}×${r.alto} aviso ${r.aviso}: ${r.ok ? 'SÍ' : 'NO'} ${bueno.join(' | ') || JSON.stringify(r.res)} · barra ${JSON.stringify(r.barra)}${brecha !== null ? ` (${brecha} px sobre el aviso)` : ''} · summary ${r.summaryAlto} px, sobra ${r.sobra ?? ''}`);
}
console.log(`\n${R.filter((r) => r.ok).length} de ${R.length} con «Concepto» del DOM entero a la vista y sin nada encima`);
