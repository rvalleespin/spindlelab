// E12 · Koto · paso 2 · ¿dónde juega Koto con blanco u otros colores? Recorre una página entera, de media
// pantalla en media pantalla, y en cada parada anota:
//   - el fondo de html, body y main (computado);
//   - una malla de 4 × 6 puntos: qué hay debajo de cada uno (un medio —img, video, canvas, iframe,
//     fondo con imagen— o un fondo pintado por CSS, compuesto capa por capa hasta el primero opaco),
//     leída a los 120 ms y a los 900 ms de parar (si cambia, hay una transición en curso);
//   - cada medio visible: caja en coordenadas de página, radio, si llega a los bordes;
//   - cada texto visible: color, tamaño y lo que tiene debajo (fondo de CSS o «sobre medio»);
//   - una captura de la ventana (después pixeles.py separa lo que es medio de lo que es interfaz).
// Además, un MutationObserver anota todo cambio de `style` o `class` que mueva un color de fondo o de
// texto mientras se baja (así se ve si un color entra por scroll y qué lo dispara), y se leen las hojas
// para listar toda regla que pinte un fondo claro o con color.
// Uso: node recorrido.mjs <id> <url> <ancho> <dir-crudo> <dir-cuadros>
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from '../../herramientas/comun.mjs';

const [id, url, anchoArg, dirCrudo, dirCuadros] = process.argv.slice(2);
const ancho = +anchoArg;
fs.mkdirSync(dirCrudo, { recursive: true });
fs.mkdirSync(dirCuadros, { recursive: true });
const nav = await abrirNavegador();
const ctx = await contexto(nav, ancho);
const p = await ctx.newPage();
const carga = await cargar(p, url);
await aceptarCookies(p);
await p.evaluate(SEL_FN);

// Observador de cambios de color (antes de bajar).
await p.evaluate(() => {
  window.__cambios = [];
  const t0 = performance.now();
  const leer = (el) => { const s = getComputedStyle(el); return s.backgroundColor + ' | ' + s.color; };
  const previos = new WeakMap();
  const obs = new MutationObserver((ms) => {
    for (const m of ms) {
      const el = m.target;
      if (!(el instanceof Element)) continue;
      const r = el.getBoundingClientRect();
      if (r.width * r.height < 20000) continue; // solo cajas grandes
      const ahora = leer(el);
      const antes = previos.get(el);
      previos.set(el, ahora);
      if (antes && antes !== ahora && window.__cambios.length < 400) {
        window.__cambios.push({ t: Math.round(performance.now() - t0), scrollY: Math.round(scrollY), sel: window.__sel(el), atributo: m.attributeName, antes, ahora, w: Math.round(r.width), h: Math.round(r.height) });
      }
    }
  });
  // registrar el estado inicial de las cajas grandes para poder comparar
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width * r.height >= 20000) previos.set(el, leer(el));
  }
  obs.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], subtree: true });
});

await recorrer(p, { paso: 0.5, espera: 160 }); // primera pasada: carga diferida
await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

const LECTURA = () => {
  const vw = innerWidth, vh = innerHeight;
  const esMedio = (e) => {
    const t = e.tagName;
    if (t === 'IMG' || t === 'VIDEO' || t === 'CANVAS' || t === 'IFRAME' || t === 'PICTURE') return true;
    if (t === 'svg' || t === 'SVG') { const r = e.getBoundingClientRect(); return r.width > 200 && r.height > 200; }
    const bi = getComputedStyle(e).backgroundImage;
    return bi && bi.includes('url(');
  };
  const rgba = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m) { const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; }
    // oklab(L a b / A): convertir a sRGB
    const o = c.match(/oklab\(([^)]+)\)/);
    if (o) {
      const v = o[1].split(/[ /]+/).filter(Boolean).map(Number);
      const [L, A, B] = v; const al = v.length > 3 ? v[3] : 1;
      const l_ = L + 0.3963377774 * A + 0.2158037573 * B, m_ = L - 0.1055613458 * A - 0.0638541728 * B, s_ = L - 0.0894841775 * A - 1.2914855480 * B;
      const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
      const lin = [4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * mm + 1.7076147010 * s];
      const g = (x) => { x = Math.max(0, Math.min(1, x)); return Math.round(255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)); };
      return [g(lin[0]), g(lin[1]), g(lin[2]), al];
    }
    return [0, 0, 0, 0];
  };
  const opac = (e) => { let o = 1; for (let x = e; x && x.nodeType === 1; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; };
  // Lo que hay debajo de un punto: compone las capas de fondo de arriba abajo hasta una opaca o un medio.
  const debajo = (x, y, saltar) => {
    const pila = document.elementsFromPoint(x, y);
    const capas = [];
    for (const e of pila) {
      if (saltar && (e === saltar || saltar.contains(e))) continue;
      const s = getComputedStyle(e);
      if (s.visibility === 'hidden') continue;
      const o = opac(e);
      if (o < 0.02) continue;
      if (esMedio(e)) { capas.push({ medio: true, sel: window.__sel(e) }); return { tipo: 'medio', sel: window.__sel(e), capas }; }
      const c = rgba(s.backgroundColor);
      const a = c[3] * o;
      if (a > 0.004) { capas.push({ bg: s.backgroundColor, a: +a.toFixed(3), sel: window.__sel(e) }); if (a >= 0.99) break; }
    }
    // componer desde la última (más abajo) hacia arriba sobre el fondo de html
    let base = rgba(getComputedStyle(document.documentElement).backgroundColor).slice(0, 3);
    for (let i = capas.length - 1; i >= 0; i--) {
      if (capas[i].medio) continue;
      const c = rgba(capas[i].bg); const a = capas[i].a;
      base = [0, 1, 2].map(k => Math.round(c[k] * a + base[k] * (1 - a)));
    }
    return { tipo: 'css', rgb: base, capas };
  };
  const puntos = [];
  for (let fi = 0; fi < 4; fi++) for (let co = 0; co < 6; co++) {
    const x = Math.round((co + 0.5) * vw / 6), y = Math.round((fi + 0.5) * vh / 4);
    const d = debajo(x, y);
    puntos.push({ x, y, tipo: d.tipo, rgb: d.rgb || null, sel: d.sel || (d.capas.length ? d.capas[d.capas.length - 1].sel : 'html') });
  }
  const medios = [];
  for (const e of document.querySelectorAll('img, video, canvas, iframe, picture, svg, [style*="background-image"], div, section, figure')) {
    if (!esMedio(e)) continue;
    if (e.tagName === 'PICTURE') continue; // cuenta su img
    const r = e.getBoundingClientRect();
    if (r.width < 40 || r.height < 40) continue;
    if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
    if (opac(e) < 0.05) continue;
    const s = getComputedStyle(e);
    // radio: el del elemento o el del primer ancestro que recorta
    let radio = s.borderRadius, x = e;
    for (let n = 0; n < 6 && x && radio === '0px'; n++) { x = x.parentElement; if (!x) break; const sx = getComputedStyle(x); if (sx.overflow !== 'visible' && sx.borderRadius !== '0px') radio = sx.borderRadius; }
    medios.push({ tag: e.tagName.toLowerCase(), sel: window.__sel(e), x: Math.round(r.left), y: Math.round(r.top + scrollY), yv: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), radio, fit: s.objectFit,
      src: (e.currentSrc || e.src || e.poster || '').slice(-90), nat: e.naturalWidth ? [e.naturalWidth, e.naturalHeight] : null });
  }
  const textos = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || vistos.has(el)) continue;
    vistos.add(el);
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden') continue;
    const o = opac(el);
    if (o < 0.05) continue;
    const cx = Math.min(vw - 1, Math.max(0, r.left + Math.min(r.width, 40) / 2)), cy = Math.min(vh - 1, Math.max(0, r.top + r.height / 2));
    const d = debajo(cx, cy, el);
    textos.push({ t: n.textContent.trim().replace(/\s+/g, ' ').slice(0, 50), color: s.color, opacidad: +o.toFixed(3), fs: s.fontSize, ff: s.fontFamily.split(',')[0], fondo: d.tipo === 'medio' ? 'medio' : d.rgb, y: Math.round(r.top + scrollY) });
  }
  const m = document.querySelector('main') || document.querySelector('#main');
  return { scrollY: Math.round(scrollY), html: getComputedStyle(document.documentElement).backgroundColor, body: getComputedStyle(document.body).backgroundColor, main: m ? getComputedStyle(m).backgroundColor : null, puntos, medios, textos };
};

const { vh, alto, maxY } = await p.evaluate(() => ({ vh: innerHeight, alto: document.documentElement.scrollHeight, maxY: document.documentElement.scrollHeight - innerHeight }));
const paradas = [];
const paso = Math.round(vh / 2);
for (let y = 0, n = 0; ; n++) {
  const yy = Math.min(y, maxY);
  await p.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), yy);
  await p.waitForTimeout(120);
  const a = await p.evaluate(LECTURA);
  await p.waitForTimeout(780);
  const b = await p.evaluate(LECTURA);
  const f = path.join(dirCuadros, `${id}-${ancho}-cuadro-${String(n).padStart(3, '0')}.png`);
  await p.screenshot({ path: f });
  // ¿cambió algo entre 120 y 900 ms?
  const cambiosPuntos = b.puntos.map((q, i) => ({ i, a: a.puntos[i], b: q })).filter(z => z.a.tipo !== z.b.tipo || JSON.stringify(z.a.rgb) !== JSON.stringify(z.b.rgb)).map(z => ({ x: z.b.x, y: z.b.y, a: z.a.tipo === 'medio' ? 'medio' : z.a.rgb, b: z.b.tipo === 'medio' ? 'medio' : z.b.rgb }));
  paradas.push({ n, y: b.scrollY, archivo: path.basename(f), html: b.html, body: b.body, main: b.main, htmlA120: a.html, bodyA120: a.body, puntos: b.puntos, cambiosEntre120y900: cambiosPuntos, medios: b.medios, textos: b.textos });
  if (yy >= maxY) break;
  y += paso;
}

const cambios = await p.evaluate(() => window.__cambios);
// Reglas de las hojas que pintan un fondo que no es casi negro (claro, gris medio o con color).
const reglas = await p.evaluate(() => {
  const out = [];
  const parse = (v) => { const m = v.match(/#([0-9a-f]{3,8})\b|rgba?\(([^)]+)\)/i); return m ? m[0] : null; };
  for (const s of document.styleSheets) {
    let rs; try { rs = s.cssRules; } catch (e) { continue; }
    const andar = (lista, media) => {
      for (const r of lista) {
        if (r.cssRules && !r.selectorText) { andar(r.cssRules, (r.conditionText || r.media && r.media.mediaText || '')); continue; }
        if (!r.style) continue;
        const bg = r.style.getPropertyValue('background-color') || r.style.getPropertyValue('background');
        if (!bg) continue;
        out.push({ sel: (r.selectorText || '').slice(0, 140), bg: bg.slice(0, 120), media: media || '' });
      }
    };
    andar(rs, '');
  }
  return out;
});
const vars = await p.evaluate(() => {
  const s = getComputedStyle(document.documentElement);
  const out = {};
  for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; }
    for (const r of rs) { if (r.style) for (const k of r.style) if (k.startsWith('--color')) out[k] = s.getPropertyValue(k).trim(); }
    for (const r of rs) if (r.cssRules) for (const q of r.cssRules) if (q.style) for (const k of q.style) if (k.startsWith('--color')) out[k] = s.getPropertyValue(k).trim(); }
  return out;
});
const titulo = await p.title();
fs.writeFileSync(path.join(dirCrudo, `recorrido-${id}-${ancho}.json`), JSON.stringify({ id, url, ancho, dpr: ancho === 390 ? 2 : 1, fecha: new Date().toISOString(), titulo, carga, vh, alto, paso, paradas, cambiosDeColorConScroll: cambios, reglasDeFondo: reglas, variablesDeColor: vars }, null, 1));
await nav.close();
console.log('ok', id, ancho, paradas.length, 'paradas', alto, 'px', cambios.length, 'cambios');
