// E13 · logo opción 2 · la prueba del disco: las variantes de disco.py lado a lado, rasterizadas a los tamaños en que
// el logo vive, y medidas en el píxel (Bruno, 30-oct-2026).
// Uso: node prueba-disco.mjs <dir-logo>     (antes: python3 -I disco.py <dir-logo> <letra> variantes)
// Lee <dir-logo>/prueba-disco/variantes/ (SVG y variantes.json) y El huso de e12/logo/final/. Las variantes de opsz 24
// van en la caja del sitio (viewBox 3.34 −117.02 716.32 147.01): la letra mide lo mismo que hoy en el encabezado.
// Escribe en <dir-logo>/prueba-disco/:
//   · prueba-disco-1x.png: cada variante en el lienzo #060606 a 20, 24 y 39 px de alto (corte menú) y a 48 y 140
//     (corte grande), y sobre blanco a 24 y 140; las del corte pequeño a 12, 14 y 16 (y sobre blanco a 16 y 12);
//   · prueba-disco.json: por variante, tamaño y dpr, las filas de píxeles con tinta del disco, su cobertura (0 el
//     lienzo, 1 el blanco) y las filas limpias entre el disco y el asta, contadas en las columnas del disco (la x del
//     disco sale de variantes.json, no se adivina en el píxel).
// Chromium 141 de Playwright (el de spindlelab-astro), todo file://, sin red.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const LOGO = path.resolve(process.argv[2]);
const P = path.join(LOGO, 'prueba-disco');
const V = path.join(P, 'variantes');
const E12 = path.resolve(LOGO, '../../e12/logo/final');
const reg = JSON.parse(fs.readFileSync(path.join(V, 'variantes.json'), 'utf8'));
const e12 = JSON.parse(fs.readFileSync(path.join(E12, 'construccion-final.json'), 'utf8'));
const leer = (f) => { const t = fs.readFileSync(f, 'utf8'); return { d: t.match(/ d="([^"]+)"/)[1], vb: t.match(/viewBox="([^"]+)"/)[1] }; };

// [etiqueta, svg menú, svg grande, cx, medio ancho del disco (unidades)]
const fila24 = [['hoy · El huso', leer(path.join(E12, 'logo-menu-blanco.svg')), leer(path.join(E12, 'logo-grande-blanco.svg')), e12.cortes.menu.medidas.cx, e12.cortes.menu.medidas.tortera[0] / 2]];
for (const v of ['maqueta', 'punto-letra', 'elegido-menu', 'menu-mas-redondo', 'elegido-grande', 'grande-mas-bajo', 'grande-arriba-S', 'grande-mas-plano', 'grande-elipse']) {
  const m = reg[`menu--${v}`].medidas;
  const s = leer(path.join(V, `menu--${v}-blanco.svg`));
  fila24.push([v, s, s, m.cx, (m.disco ? m.disco[0] : m.punto_letra.x[1] - m.punto_letra.x[0]) / 2]);
}
const filaP = [['hoy · El huso', leer(path.join(E12, 'logo-pequeno-blanco.svg')), e12.cortes.pequeno.medidas.cx, e12.cortes.pequeno.medidas.tortera[0] / 2]];
for (const v of ['maqueta', 'punto-letra', 'elegido-pequeno', 'pequeno-ronda-1', 'pequeno-redondo', 'pequeno-160x105']) {
  const m = reg[`pequeno--${v}`].medidas;
  filaP.push([v, leer(path.join(V, `pequeno--${v}-blanco.svg`)), m.cx, (m.disco ? m.disco[0] : m.punto_letra.x[1] - m.punto_letra.x[0]) / 2]);
}

const celda = (id, s, alto, color, cx, mw) => `<div class="c" id="${id}" data-cx="${cx}" data-mw="${mw}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.vb}" style="height:${alto}px;width:auto;display:block" fill="${color}"><path d="${s.d}"/></svg></div>`;
const k_ = (t) => t.replace(/[^a-z0-9]+/gi, '_');
let filas = '<div class="sep">opsz 24 · corte menú a 20, 24 y 39 px · corte grande a 48 y 140 px · sobre blanco a 24 y 140</div>';
for (const [v, sm, sg, cx, mw] of fila24) {
  const k = k_(v);
  filas += `<div class="f"><span class="n">${v}</span>${celda(`${k}-20`, sm, 20, '#fff', cx, mw)}${celda(`${k}-24`, sm, 24, '#fff', cx, mw)}${celda(`${k}-39`, sm, 39, '#fff', cx, mw)}${celda(`${k}-48`, sg, 48, '#fff', cx, mw)}${celda(`${k}-140`, sg, 140, '#fff', cx, mw)}<div class="b">${celda(`${k}-24b`, sm, 24, '#060606', cx, mw)}${celda(`${k}-140b`, sg, 140, '#060606', cx, mw)}</div></div>`;
}
filas += '<div class="sep">opsz 12 · corte pequeño a 12, 14 y 16 px · sobre blanco a 16 y 12</div>';
for (const [v, s, cx, mw] of filaP) {
  const k = 'p_' + k_(v);
  filas += `<div class="f"><span class="n">${v}</span>${celda(`${k}-12`, s, 12, '#fff', cx, mw)}${celda(`${k}-14`, s, 14, '#fff', cx, mw)}${celda(`${k}-16`, s, 16, '#fff', cx, mw)}<div class="b">${celda(`${k}-16b`, s, 16, '#060606', cx, mw)}${celda(`${k}-12b`, s, 12, '#060606', cx, mw)}</div></div>`;
}
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:"DM Mono";src:url("${pathToFileURL(path.resolve(LOGO, '../../e12/logo/fuentes/dm-mono-500-latin.woff2')).href}") format("woff2")}
body{margin:0;background:#060606;color:#a8a8a8;font:500 12px "DM Mono",monospace;padding:24px;width:max-content}
.f{display:flex;align-items:flex-end;gap:36px;padding:14px 0;border-top:1px solid #262626}
.n{width:170px;flex:none}.c{flex:none}
.b{display:flex;align-items:flex-end;gap:28px;background:#fff;padding:10px 16px}
.sep{padding:18px 0 6px;color:#fff}
</style>${filas}`;
fs.writeFileSync(path.join(P, '_prueba.html'), html);

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), nota: 'cobertura: 0 el lienzo, 1 el blanco; filas contadas de arriba abajo en las columnas del disco (cx ± medio ancho + 1 unidad)', medidas: {} };
for (const dpr of [1, 2]) {
  const p = await nav.newPage({ viewport: { width: 1800, height: 400 }, deviceScaleFactor: dpr });
  await p.goto(pathToFileURL(path.join(P, '_prueba.html')).href);
  await p.evaluate(() => document.fonts.ready);
  // la hoja solo a 1x (a 2x pesa más de 1 MB); las medidas a 1x y 2x salen de cada celda, no de la hoja
  if (dpr === 1) await p.screenshot({ path: path.join(P, 'prueba-disco-1x.png'), fullPage: true });
  for (const el of await p.$$('.f > .c')) {
    const id = await el.getAttribute('id');
    const cx = +(await el.getAttribute('data-cx')), mw = +(await el.getAttribute('data-mw')) + 1;
    const svgEl = await el.$('svg');
    const vb = (await svgEl.getAttribute('viewBox')).split(' ').map(Number);
    const caja = await svgEl.boundingBox();
    const s = caja.height / vb[3];
    const png = await svgEl.screenshot();
    const cob = await p.evaluate(async ({ b64, x0, x1 }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      const px = g.getImageData(0, 0, c.width, c.height).data;
      const out = [];
      for (let y = 0; y < c.height; y++) { let m = 0; for (let x = Math.max(0, x0); x < Math.min(c.width, x1); x++) m = Math.max(m, px[(y * c.width + x) * 4]); out.push(+((m - 6) / 249).toFixed(2)); }
      return out;
    }, { b64: png.toString('base64'), x0: Math.floor((cx - mw - vb[0]) * s * dpr), x1: Math.ceil((cx + mw - vb[0]) * s * dpr) });
    let y = 0; while (y < cob.length && cob[y] < 0.05) y++;
    const d0 = y; while (y < cob.length && cob[y] >= 0.05) y++;
    const d1 = y; while (y < cob.length && cob[y] < 0.05) y++;
    const disco = cob.slice(d0, d1);
    R.medidas[`${id}@${dpr}x`] = { filasDisco: disco.length, coberturaDisco: disco, coberturaMax: Math.max(...disco), filasLimpiasHastaElAsta: y - d1, noToca: y - d1 >= 1 };
  }
  await p.close();
}
await nav.close();
fs.unlinkSync(path.join(P, '_prueba.html'));
fs.writeFileSync(path.join(P, 'prueba-disco.json'), JSON.stringify(R, null, 1));
for (const [k, v] of Object.entries(R.medidas)) if (/-(20|24|12|16)@/.test(k)) console.log(k.padEnd(30), 'disco', String(v.filasDisco).padStart(2), 'filas', JSON.stringify(v.coberturaDisco).padEnd(28), 'limpias', v.filasLimpiasHastaElAsta);
