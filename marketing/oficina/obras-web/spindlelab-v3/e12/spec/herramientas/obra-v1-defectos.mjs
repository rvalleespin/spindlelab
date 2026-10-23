// E12 · spec sobre A · las decisiones de los defectos 2 y 4 del acta de la obra (vuelta 1), probadas sobre el build
// antes de escribirlas. Lucía, 23-oct-2026.
//
// Sirve el dist/ de spindlelab-astro (con el servidor de rangos de Javiera, qa-obra/vuelta-1/herramientas/comun.mjs)
// y mide cada página dos veces: «hoy» (el build tal cual) y «spec» (el build con lo que la spec decide, inyectado:
// PROPUESTA_CSS, la etiqueta de la barra y la barra sobre el aviso). No toca spindlelab-astro/: lo que Diego
// construya tiene que dar lo mismo.
//
//   defecto 4 · la home, primera visita (sin elección guardada, el aviso de cookies abierto): dónde empieza el aviso,
//               dónde están el campo y el botón del chequeo, y qué control de la página queda bajo el aviso;
//               lo mismo en /v3/diagnostico/ y /v3/contacto/ (la lista de aviso.mjs de Javiera).
//   defecto 2 · los cuatro conceptos en los ocho tamaños, con el aviso abierto y cerrado: qué rótulo «Concepto» del DOM
//               queda entero en la ventana y sin nada encima (elementsFromPoint en su centro y sus dos extremos).
//
// Uso: node obra-v1-defectos.mjs <salida.json> <carpeta de capturas>
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ANCHOS, servir, lanzar } from '../../qa-obra/vuelta-1/herramientas/comun.mjs';

const [salida, capturas] = process.argv.slice(2);
mkdirSync(capturas, { recursive: true });

// Lo que decide la spec (§4.3 y §2.1, fila 1, bajo 834; §2.3, la barra), escrito como CSS para probarlo.
export const PROPUESTA_CSS = `
/* §4.3 · desde 834, el aviso de cookies va en una fila: el texto (tope de 640 px, como hoy) se angosta lo que haga falta
   y los botones quedan a su derecha (entre 834 y ~890 bajaban a una segunda fila y el aviso medía 115 px: tapaba el
   chequeo a 834 × 1112) */
@media (min-width: 834px) {
  html body.a-body #cookie-banner .cb-inner.cb-inner { flex-wrap: nowrap; }
  html body.a-body #cookie-banner .cb-inner p { flex: 0 1 auto; min-width: 0; }
}
/* §2.1, fila 1 · bajo 834 la portada lee rótulo, h1, chequeo y entradilla (solo el orden a la vista; el DOM no cambia) */
@media (max-width: 833.98px) {
  .a-body .portada-v__decl { display: contents; }
  .a-body .portada-v__decl > * { grid-column: 1 / -1; }
  .a-body .portada-v__decl > h1 { margin-top: -8px; }
  .a-body .portada-v__chequeo { order: 1; }
  .a-body .portada-v__decl > .entradilla { order: 2; }
}
/* §2.3 · la etiqueta del tipo en la barra: mono, gris, en una línea */
.a-body .barra__tipo { white-space: nowrap; }
`;

const CONCEPTOS = ['tonela', 'ocelo', 'sesenta', 'doceavo'];
const TAMANOS = Object.entries(ANCHOS).map(([w, h]) => [+w, h]);
const EXTRA_HOME = [[375, 667], [414, 896]];

async function abrir(nav, ruta, w, h, { variante, aviso }) {
  const t = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t, reducedMotion: 'reduce' });
  if (!aviso) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  if (variante === 'spec') {
    await p.addStyleTag({ content: PROPUESTA_CSS });
    // §2.3 · en los conceptos, la barra lleva el «Tipo» de la ficha de Clara («Concepto») junto al nombre
    await p.evaluate(() => {
      const nombre = document.querySelector('.barra summary > .rotulo');
      const tipo = [...document.querySelectorAll('.lateral__ficha .rotulo')].map((e) => e.textContent.trim().split(' · ')[0])[0];
      if (nombre && tipo === 'Concepto') {
        const sep = document.createElement('span'); sep.className = 'rotulo'; sep.setAttribute('aria-hidden', 'true'); sep.textContent = '·';
        const s = document.createElement('span'); s.className = 'rotulo barra__tipo'; s.textContent = tipo;
        nombre.after(sep, s);
      }
      // §2.3 y §4.3 · con el aviso abierto, la barra va 8 px sobre él (su alto lo lee caso.mjs; al cerrarlo, vuelve a 16)
      const barra = document.querySelector('.a-body .barra');
      const aviso = document.getElementById('cookie-banner');
      if (barra && aviso) {
        const ajustar = () => { const abierto = getComputedStyle(aviso).display !== 'none'; barra.style.bottom = abierto ? `${aviso.getBoundingClientRect().height + 8}px` : ''; };
        new ResizeObserver(ajustar).observe(aviso); new MutationObserver(ajustar).observe(aviso, { attributes: true }); ajustar();
      }
    });
  }
  await p.waitForTimeout(500);
  return { ctx, p };
}

// ¿qué controles quedan bajo el aviso? (enfocables visibles cuya caja cruza la del aviso)
const bajoAviso = () => {
  const a = document.getElementById('cookie-banner');
  if (!a || getComputedStyle(a).display === 'none') return { aviso: null, tapados: [] };
  const ra = a.getBoundingClientRect();
  const tapados = [];
  for (const e of document.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])')) {
    if (a.contains(e) || e.closest('[aria-hidden="true"]') || e.closest('details:not([open]) > :not(summary)')) continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height || getComputedStyle(e).visibility === 'hidden') continue;
    if (r.bottom > ra.top && r.top < ra.bottom && r.right > ra.left && r.left < ra.right && r.top < innerHeight)
      tapados.push(`${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''} «${(e.textContent || e.placeholder || '').trim().slice(0, 30)}» ${Math.round(r.top)}–${Math.round(r.bottom)}`);
  }
  return { aviso: { top: Math.round(ra.top), bottom: Math.round(ra.bottom), left: Math.round(ra.left), right: Math.round(ra.right), alto: Math.round(ra.height) }, tapados };
};

const cajas = (sel) => sel.map((s) => { const e = document.querySelector(s); if (!e) return { s, falta: true }; const r = e.getBoundingClientRect(); return { s, top: Math.round(r.top), bottom: Math.round(r.bottom) }; });

// ¿qué rótulo «Concepto» del DOM se ve entero y destapado?
const rotuloConcepto = () => {
  const cand = [...document.querySelectorAll('main *, .barra *')].filter((e) => /^\s*Concepto(\s*·\s*2026)?\s*$/i.test(e.textContent) && e.children.length === 0);
  const out = [];
  for (const e of cand) {
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const tapa = [];
    for (const [x, y] of [[r.left + 2, r.top + r.height / 2], [r.left + r.width / 2, r.top + r.height / 2], [r.right - 2, r.top + r.height / 2]]) {
      if (y > innerHeight || y < 0 || x < 0 || x > innerWidth) { tapa.push('fuera de la ventana'); continue; }
      const t = document.elementsFromPoint(x, y)[0];
      if (t && t !== e && !e.contains(t)) tapa.push(`${t.tagName.toLowerCase()}${t.id ? '#' + t.id : ''}.${[...t.classList].join('.')}`.slice(0, 40));
    }
    out.push({ donde: e.closest('.barra') ? 'barra' : e.closest('.lateral') ? 'ficha' : 'otro', texto: e.textContent.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), aLaVista: !tapa.length, tapa: [...new Set(tapa)] });
  }
  return out;
};

const srv = await servir();
const nav = await lanzar();
const R = { fecha: '2026-10-23', propuestaCss: PROPUESTA_CSS.trim(), aviso: [], conceptos: [] };

for (const variante of ['hoy', 'spec']) {
  // defecto 4: la home, y diagnóstico y contacto
  for (const [ruta, sel] of [['/v3/', ['#chq-dominio', '#chq-btn']], ['/v3/diagnostico/', ['#chq-dominio', '#chq-btn']], ['/v3/contacto/', ['.contact-form button[type="submit"]']]]) {
    for (const [w, h] of [...TAMANOS, ...(ruta === '/v3/' ? EXTRA_HOME : [])]) {
      const { ctx, p } = await abrir(nav, ruta, w, h, { variante, aviso: true });
      const m = await p.evaluate(bajoAviso);
      m.controles = await p.evaluate(cajas, sel);
      m.chequeoTapado = m.aviso ? m.controles.filter((c) => !c.falta && c.bottom > m.aviso.top && c.top < h).map((c) => c.s) : [];
      m.chequeoEnPantalla = m.controles.every((c) => !c.falta && c.bottom <= h);
      if (ruta === '/v3/' && [360, 390].includes(w)) await p.screenshot({ path: join(capturas, `obra-v1-aviso-home-${w}-${variante}.jpg`), type: 'jpeg', quality: 80 });
      R.aviso.push({ variante, ruta, w, h, ...m });
      console.log(`${variante} ${ruta} ${w}×${h}: aviso ${m.aviso ? `${m.aviso.top}–${m.aviso.bottom} (${m.aviso.alto})` : '—'} · ${m.controles.map((c) => `${c.s} ${c.top}–${c.bottom}`).join(' · ')} · tapado: ${m.chequeoTapado.join(', ') || 'no'} · bajo el aviso: ${m.tapados.join(' | ') || 'nada'}`);
      await ctx.close();
    }
  }
  // defecto 2: los cuatro conceptos, con y sin aviso
  for (const c of CONCEPTOS) for (const [w, h] of TAMANOS) for (const aviso of [false, true]) {
    const { ctx, p } = await abrir(nav, `/v3/trabajo/${c}/`, w, h, { variante, aviso });
    const rot = await p.evaluate(rotuloConcepto);
    const av = await p.evaluate(bajoAviso);
    const holgura = await p.evaluate(() => {
      const t = document.querySelector('.barra__tipo') || document.querySelector('.barra summary > .rotulo'); const act = document.querySelector('[data-barra-activa]');
      if (!t || !act || !t.getBoundingClientRect().width) return null;
      const orig = act.textContent; let min = Infinity;
      for (const n of ['Problema', 'Hipótesis', 'Solución', 'La pieza', 'Sin métrica']) { act.textContent = n; min = Math.min(min, act.getBoundingClientRect().left - t.getBoundingClientRect().right); }
      act.textContent = orig; return Math.round(min);
    });
    const visto = rot.filter((x) => x.aLaVista).map((x) => x.donde);
    if (variante === 'spec' && ((c === 'tonela' && w === 768) || (c === 'doceavo' && w === 1024) || (c === 'sesenta' && w === 360)))
      await p.screenshot({ path: join(capturas, `obra-v1-concepto-${c}-${w}-${aviso ? 'aviso' : 'sin-aviso'}.jpg`), type: 'jpeg', quality: 80 });
    R.conceptos.push({ variante, concepto: c, w, h, aviso, aLaVista: visto, holguraBarra: holgura, rotulos: rot, avisoCaja: av.aviso, bajoAviso: av.tapados });
    console.log(`${variante} ${c} ${w}×${h} ${aviso ? 'con aviso' : 'sin aviso'}: «Concepto» a la vista en ${visto.join(', ') || 'NINGUNO'}${holgura !== null ? ` · holgura en la barra ${holgura} px` : ''}${av.tapados.length ? ` · bajo el aviso: ${av.tapados.join(' | ')}` : ''}`);
    await ctx.close();
  }
}
await nav.close(); await srv.cerrar();
writeFileSync(salida, JSON.stringify(R, null, 1));
