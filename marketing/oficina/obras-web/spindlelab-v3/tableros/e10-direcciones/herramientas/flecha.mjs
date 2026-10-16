// flecha.mjs — la flecha del chequeo de Taller (home), ancho por ancho (Lucía, 16-oct-2026; ronda 3 de QA, defecto 1).
//
// La flecha es el ::after de .t-instr (una marca de revisión de fondo, base.css). Un ::after no tiene caja que se pueda
// pedir, así que se mide su TRAZO: se leen los caminos del SVG, se muestrean 300 puntos por camino y se llevan a la
// página con lo mismo que hace el navegador (caja del ::after, background contain centrado, rotate sobre el centro),
// más medio grosor de línea. Por cada ancho:
//   · el trazo entero dentro de la pantalla (0 → clientWidth);
//   · el documento con el clip apagado (html y body con overflow-x: visible): scrollWidth contra clientWidth;
//   · el trazo a 6 px o más de todo texto visible («nunca detrás de texto», lock §13): si no, falla;
//   · su distancia al campo, al botón y al módulo de navegación (cajas) y al filete de afuera del sello (su caja girada
//     como la gira el CSS, más el outline de 1 px a 3 px): un aviso si se tocan (< 1 px), no una falla;
//   · la regla que rige (derecha / bajo el chequeo / una columna).
// Dos modos: sin barra de desplazamiento (headless) y con una barra de 17 px (la de Windows): la media query mide la
// ventana CON la barra y clientWidth SIN ella, y ese es el caso que corta la flecha si el tramo termina en 1259.
//
// Sirve proto/ en 8770 antes. Uso: node herramientas/flecha.mjs [--json img/flecha.json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const SALIDA = arg('--json', null);
// De 1024 a 1280 cada 8 px; px a px cerca de los bordes del tramo (1016-1032, 1250-1310); y los de siempre.
const A = new Set([360, 390, 768, 1000, 1023, 1366, 1440, 1920]);
for (let w = 1024; w <= 1280; w += 8) A.add(w);
for (let w = 1016; w <= 1032; w++) A.add(w);
for (let w = 1250; w <= 1310; w++) A.add(w);
const ANCHOS = [...A].sort((a, b) => a - b);
const BARRA = 'html { overflow-y: scroll; } ::-webkit-scrollbar { width: 17px; } ::-webkit-scrollbar-thumb { background: #999; }';

// Playwright lanza Chromium con --hide-scrollbars; para el modo con barra se lanza sin esa bandera.
const navs = {
  'sin barra': await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }),
  'barra 17 px': await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', ignoreDefaultArgs: ['--hide-scrollbars'] }),
};
const vistas = [];
let fallas = 0;
for (const [modo, nav] of Object.entries(navs)) {
  for (const w of ANCHOS) {
    const ctx = await nav.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const pg = await ctx.newPage();
    await pg.goto(`${BASE}/taller/home.html`, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    if (modo !== 'sin barra') await pg.addStyleTag({ content: BARRA });
    const r = await pg.evaluate(async () => {
      const de = document.documentElement, cw = de.clientWidth;
      const el = document.querySelector('.t-instr'), R = el.getBoundingClientRect(), a = getComputedStyle(el, '::after');
      const url = a.backgroundImage.match(/url\("?([^")]+)"?\)/)[1];
      const doc = new DOMParser().parseFromString(await (await fetch(url)).text(), 'image/svg+xml');
      const vb = doc.documentElement.getAttribute('viewBox').split(/\s+/).map(Number);
      const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); host.style.cssText = 'position:absolute;width:0;height:0'; document.body.append(host);
      const L = parseFloat(a.left), T = parseFloat(a.top), W = parseFloat(a.width), H = parseFloat(a.height);
      const th = a.rotate === 'none' ? 0 : parseFloat(a.rotate) * Math.PI / 180;
      const s = Math.min(W / vb[2], H / vb[3]), media = 4.5 * s / 2;
      const pts = [];
      for (const camino of doc.querySelectorAll('path')) {
        const q = document.createElementNS('http://www.w3.org/2000/svg', 'path'); q.setAttribute('d', camino.getAttribute('d')); host.append(q);
        const n = q.getTotalLength();
        for (let i = 0; i <= 300; i++) {
          const p = q.getPointAtLength(n * i / 300);
          const dx = (W - vb[2] * s) / 2 + (p.x - vb[0]) * s - W / 2, dy = (H - vb[3] * s) / 2 + (p.y - vb[1]) * s - H / 2;
          pts.push([R.left + L + W / 2 + dx * Math.cos(th) - dy * Math.sin(th), R.top + scrollY + T + H / 2 + dx * Math.sin(th) + dy * Math.cos(th)]);
        }
      }
      host.remove();
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      const trazo = [Math.min(...xs) - media, Math.min(...ys) - media, Math.max(...xs) + media, Math.max(...ys) + media];
      // el texto, que el trazo no puede tocar (6 px)
      const cajas = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const nd = tw.currentNode; const pe = nd.parentElement;
        if (!nd.data.trim() || pe.closest('.d-sr, .cinta') || !pe.checkVisibility()) continue;
        const rg = document.createRange(); rg.selectNodeContents(nd);
        for (const q of rg.getClientRects()) cajas.push([`texto «${nd.data.trim().slice(0, 24)}»`, q.left, q.top + scrollY, q.right, q.bottom + scrollY]);
      }
      const H6 = 6 + media, toca = [];
      for (const [nom, x0, y0, x1, y1] of cajas) if (pts.some(([x, y]) => x > x0 - H6 && x < x1 + H6 && y > y0 - H6 && y < y1 + H6)) toca.push(nom);
      // distancia del trazo (con su grosor) a cada caja: rectángulo girado (centro, medio ancho, medio alto, giro)
      const dist = (cx, cy, hw, hh, ph) => Math.min(...pts.map(([x, y]) => { const dx = x - cx, dy = y - cy;
        const lx = dx * Math.cos(-ph) - dy * Math.sin(-ph), ly = dx * Math.sin(-ph) + dy * Math.cos(-ph);
        return Math.hypot(Math.max(0, Math.abs(lx) - hw), Math.max(0, Math.abs(ly) - hh)) - media; }));
      const distancias = {};
      for (const [nom, sel] of [['campo', '.t-instr .chq-form'], ['botón', '#chq-btn'], ['navegación', 'header[data-modulo-nav]']]) {
        const q = document.querySelector(sel).getBoundingClientRect();
        distancias[nom] = dist(q.left + q.width / 2, q.top + scrollY + q.height / 2, q.width / 2, q.height / 2, 0);
      }
      const se = document.querySelector('.t-instr > .sello'), sb = se.getBoundingClientRect(), sc = getComputedStyle(se);
      const fuera = parseFloat(sc.outlineOffset) + parseFloat(sc.outlineWidth);
      distancias.sello = dist(sb.left + sb.width / 2, sb.top + scrollY + sb.height / 2, se.offsetWidth / 2 + fuera, se.offsetHeight / 2 + fuera, sc.rotate === 'none' ? 0 : parseFloat(sc.rotate) * Math.PI / 180);
      for (const k in distancias) distancias[k] = Math.round(distancias[k] * 10) / 10;
      const avisos = Object.entries(distancias).filter(([, d]) => d < 1).map(([k, d]) => `toca ${k} (${d} px)`);
      // el documento con el clip apagado
      const prev = [de.style.overflowX, document.body.style.overflowX];
      de.style.setProperty('overflow-x', 'visible', 'important'); document.body.style.setProperty('overflow-x', 'visible', 'important');
      const swSinClip = de.scrollWidth;
      de.style.overflowX = prev[0]; document.body.style.overflowX = prev[1];
      const btn = document.querySelector('#chq-btn').getBoundingClientRect();
      const regla = matchMedia('(max-width: 1023px)').matches ? 'una columna (sobre el campo, baja al botón)'
        : matchMedia('(max-width: 1299px)').matches ? 'bajo el chequeo (sube al botón)' : 'a la derecha del chequeo';
      return { cw, sw: de.scrollWidth, swSinClip, regla, trazo: trazo.map((v) => Math.round(v)), aBorde: Math.round(cw - trazo[2]),
        aBoton: Math.round(trazo[1] - btn.bottom - scrollY), toca: [...new Set(toca)], distancias, avisos,
        caja: { left: a.left, top: a.top, width: a.width, height: a.height, rotate: a.rotate } };
    });
    const dentro = r.trazo[0] >= 0 && r.trazo[2] <= r.cw;
    const mal = !dentro || r.swSinClip > r.cw || r.sw > r.cw || r.toca.length;
    if (mal) fallas++;
    vistas.push({ modo, ancho: w, dentro, ...r });
    console.log(`${mal ? '✗' : '✓'} ${modo.padEnd(11)} ${w} cw ${r.cw} · ${r.regla} · trazo x ${r.trazo[0]}→${r.trazo[2]} (a ${r.aBorde} px del borde) · sin clip ${r.swSinClip}${r.toca.length ? ' · TOCA TEXTO ' + r.toca.join(', ') : ''}${r.avisos.length ? ' · aviso: ' + r.avisos.join(', ') : ''}`);
    await ctx.close();
  }
}
for (const nav of Object.values(navs)) await nav.close();
const avisos = vistas.filter((v) => v.avisos.length).map((v) => `${v.modo} ${v.ancho}: ${v.avisos.join(', ')}`);
if (SALIDA) fs.writeFileSync(path.resolve(AQUI, SALIDA), JSON.stringify({ fecha: new Date().toISOString(), anchos: ANCHOS, vistas: vistas.length, vistas_con_falla: fallas, avisos, vistas_detalle: vistas }, null, 1));
console.log(fallas ? `${fallas} vistas con falla` : `ninguna vista con falla (${vistas.length} vistas)`);
if (avisos.length) console.log(`avisos (no fallas): ${avisos.join(' | ')}`);
process.exit(fallas ? 1 : 0);
