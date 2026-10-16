// anchos.mjs — la escala display en todos los anchos (Lucía, 16-oct-2026; ronda 2 de QA, defecto 2).
//
// Para cada página de cada dirección y cada ancho (360 a 1920), mide:
//   · desborde del documento: scrollWidth contra clientWidth (el body lleva overflow-x: clip, que lo esconde;
//     por eso se mide el documento y no lo que se ve);
//   · titulares fuera de su caja: cada h1-h4 y cada letra display (≥ 28 px) cuyo texto pasa el borde derecho de su
//     caja o de la pantalla, y cada PALABRA que no cabe en el ancho de su caja (eso es lo que corta «Acompañamier…»);
//   · titulares fuera de su columna: la caja de un ítem flex o de grilla crece hasta el ancho de su palabra y se sale
//     de la columna aunque el texto no salga de SU caja (el «Hablemos» de 138 px del pie);
//   · titulares encima de una foto o de otro texto: el rectángulo de cada línea de un titular que se cruza con una
//     foto, un espacio de foto, una pieza u otro texto (lo que pasaba con «Desarrollo» y «Continuidad» en Taller a 768 y 1024);
//   · el tamaño real de cada titular grande, para escribirlo en el lock §13.
// Sin capturas (las hace renderizar.mjs); con --capturas <carpeta> guarda la primera pantalla de cada vista con falla
// y, para los anchos de tableta, la vista del titular que más pesa.
//
// Sirve proto/ en 8770 antes. Uso: node herramientas/anchos.mjs [--anchos 360,768] [--json img/anchos.json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const ANCHOS = arg('--anchos', '360,390,430,600,700,768,820,900,1024,1180,1280,1366,1440,1920').split(',').map(Number);
const SALIDA = arg('--json', null);
const PAGS = [];
for (const d of ['taller', 'pizarra']) for (const p of ['home', 'acompanamiento-mensual', 'trabajo']) PAGS.push(`${d}/${p}`);

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const res = {};
let fallas = 0;
for (const w of ANCHOS) {
  const ctx = await nav.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  for (const u of PAGS) {
    const pg = await ctx.newPage();
    await pg.goto(`${BASE}/${u}.html`, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    const r = await pg.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const fuera = [], palabras = [], encima = [], tamanos = [];
      const fotos = [...document.querySelectorAll('figure, img, .foto-slot, .pieza-lectura')]
        .map((f) => [f, f.getBoundingClientRect()]).filter(([, b]) => b.width > 0 && b.height > 0);
      const tits = [...document.querySelectorAll('h1, h2, h3, h4, .d-display, .d-guia, .d-h1, .d-h2, p, a, span, li, b')]
        .filter((el) => !el.closest('.cinta, .d-sr') && el.checkVisibility());  // aria-hidden que se ve (S1, el wordmark gigante) también cuenta
      for (const el of tits) {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!propio) continue;
        const caja = el.getBoundingClientRect();
        const rg = document.createRange(); rg.selectNodeContents(el);
        // el texto que se VE: los nodos de texto del elemento fuera de .d-sr (texto solo para lectores de pantalla)
        let tx = { left: Infinity, right: -Infinity, width: 0 };
        const tw0 = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (tw0.nextNode()) {
          const n = tw0.currentNode; if (!n.data.trim() || n.parentElement.closest('.d-sr')) continue;
          const r1 = document.createRange(); r1.selectNodeContents(n);
          for (const q of r1.getClientRects()) { tx.left = Math.min(tx.left, q.left); tx.right = Math.max(tx.right, q.right); }
        }
        tx.width = tx.right > tx.left ? tx.right - tx.left : 0;
        const nombre = `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''} «${el.textContent.trim().replace(/\s+/g, ' ').slice(0, 34)}»`;
        if (tx.width && (tx.right > cw + 0.5 || tx.right > caja.right + 1.5)) fuera.push(`${nombre} ${fs.toFixed(1)}px texto→${Math.round(tx.right)} caja→${Math.round(caja.right)} pantalla ${cw}`);
        // todo texto: su caja contra la columna que la contiene (una palabra larga del cuerpo también ensancha una columna)
        if (fs < 28) {
          let c0 = el.parentElement;
          while (c0 && getComputedStyle(c0).display === 'contents') c0 = c0.parentElement;
          if (c0 && !el.closest('.foto-slot, button, .d-btn, .chq-form') && getComputedStyle(el).position !== 'absolute') {
            const cs0 = getComputedStyle(c0), cb0 = c0.getBoundingClientRect();
            const der0 = cb0.right - parseFloat(cs0.paddingRight) - parseFloat(cs0.borderRightWidth);
            if (tx.width && tx.right > der0 + 1.5 && getComputedStyle(c0).overflowX === 'visible') fuera.push(`${nombre} ${fs.toFixed(1)}px texto→${Math.round(tx.right)} columna→${Math.round(der0)} (${c0.tagName.toLowerCase()}.${String(c0.className).split(' ')[0]})`);
          }
        }
        if (fs >= 28) {
          // cada palabra del titular contra el ancho de su caja
          const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          while (tw.nextNode()) {
            const n = tw.currentNode;
            for (const m of n.data.matchAll(/\S+/g)) {
              const r2 = document.createRange(); r2.setStart(n, m.index); r2.setEnd(n, m.index + m[0].length);
              const b = r2.getBoundingClientRect();
              if (b.width > caja.width + 1) palabras.push(`«${m[0]}» ${fs.toFixed(1)}px mide ${Math.round(b.width)} en una caja de ${Math.round(caja.width)}`);
            }
          }
          if (el.matches('h1, h2, .d-display, .d-h1, .d-h2')) tamanos.push({ el: nombre, px: +fs.toFixed(1), caja: Math.round(caja.width) });
          // la caja del titular contra la columna que la contiene (el primer ancestro con caja): un ítem flex o de
          // grilla puede crecer hasta el ancho de su palabra y salirse de su columna sin que el texto salga de SU caja
          let col = el.parentElement;
          while (col && getComputedStyle(col).display === 'contents') col = col.parentElement;
          if (col) {
            const cs = getComputedStyle(col), cb = col.getBoundingClientRect();
            const der = cb.right - parseFloat(cs.paddingRight) - parseFloat(cs.borderRightWidth);
            if (tx.right > der + 1.5) fuera.push(`${nombre} ${fs.toFixed(1)}px texto→${Math.round(tx.right)} columna→${Math.round(der)} (${col.tagName.toLowerCase()}.${String(col.className).split(' ')[0]})`);
          }
          // cada línea del titular contra el texto de otros elementos (que no lo contienen ni están dentro de él)
          const otros = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          // cada línea recortada en alto a la caja de su bloque: con interlineado bajo (0,86 en el h1) el área de contenido
          // de la línea sube por encima de la caja sin que la letra lo haga, y eso no es un choque
          let bloque = el; while (bloque.parentElement && getComputedStyle(bloque).display.startsWith('inline')) bloque = bloque.parentElement;
          const bb = bloque.getBoundingClientRect();
          const lineas = [...rg.getClientRects()].map((q) => ({ left: q.left, right: q.right, top: Math.max(q.top, bb.top), bottom: Math.min(q.bottom, bb.bottom) }));
          let pisa = null;
          while (!pisa && otros.nextNode()) {
            const n = otros.currentNode; const pe = n.parentElement;
            if (!n.data.trim() || el.contains(pe) || pe.contains(el) || pe.closest('.cinta, .d-sr, [data-rotulo-foto]') || !pe.checkVisibility()) continue;
            const r3 = document.createRange(); r3.selectNodeContents(n);
            for (const b of r3.getClientRects()) for (const q of lineas) {
              const dx = Math.min(q.right, b.right) - Math.max(q.left, b.left), dy = Math.min(q.bottom, b.bottom) - Math.max(q.top, b.top);
              if (dx > 2 && dy > 4) { pisa = `${nombre} ${fs.toFixed(1)}px sobre el texto «${n.data.trim().slice(0, 24)}» (${Math.round(dx)}×${Math.round(dy)} px)`; break; }
            }
          }
          if (pisa) encima.push(pisa);
          // cada línea del titular contra cada foto que no lo contiene
          for (const q of rg.getClientRects()) {
            for (const [f, b] of fotos) {
              if (f.contains(el) || el.contains(f)) continue;
              const dx = Math.min(q.right, b.right) - Math.max(q.left, b.left), dy = Math.min(q.bottom, b.bottom) - Math.max(q.top, b.top);
              if (dx > 2 && dy > 2) { encima.push(`${nombre} ${fs.toFixed(1)}px sobre ${f.tagName.toLowerCase()}${f.dataset.foto ? ' ' + f.dataset.foto : ''} (${Math.round(dx)}×${Math.round(dy)} px)`); break; }
            }
          }
        }
      }
      return { sw: document.documentElement.scrollWidth, cw, fuera, palabras: [...new Set(palabras)], encima: [...new Set(encima)], tamanos };
    });
    const mal = r.sw > r.cw || r.fuera.length || r.palabras.length || r.encima.length;
    if (mal) fallas++;
    res[`${u}@${w}`] = r;
    console.log(`${mal ? '✗' : '✓'} ${w} ${u} sw ${r.sw}/${r.cw}` + (mal ? '\n    ' + [...r.palabras.map((x) => 'palabra ' + x), ...r.fuera.map((x) => 'fuera ' + x), ...r.encima.map((x) => 'encima ' + x)].slice(0, 8).join('\n    ') : ''));
    await pg.close();
  }
  await ctx.close();
}
await nav.close();
if (SALIDA) fs.writeFileSync(path.resolve(AQUI, SALIDA), JSON.stringify({ fecha: new Date().toISOString(), anchos: ANCHOS, vistas_con_falla: fallas, vistas: res }, null, 1));
console.log(fallas ? `${fallas} vistas con falla` : 'ninguna vista con falla');
process.exit(fallas ? 1 : 0);
