// E12 · «Atmósfera» del brief contra lo medido (Lucía, 16-oct-2026, segunda vuelta: defecto 2 del acta del paso 1).
//
// El brief pide «cero clichés de IA genérica (sin redes neuronales dibujadas ni gradientes púrpura)». La medición
// del 16-oct registró el color de la interfaz de Koto y de A&P, pero no contó degradados. Esto los cuenta: abre la
// home y el índice de trabajo de los dos sitios a 1440 (Chromium 141, Playwright 1.63, por el proxy del entorno),
// baja la página entera para que carguen los bloques diferidos y recorre todos los elementos y pseudoelementos:
//   - `background-image` con `gradient` (cuántos, dónde, sus colores y su tono OKLCH);
//   - `<canvas>` y `<svg>` visibles de más de 200 × 200 px (donde se dibujaría una «red neuronal»);
//   - `filter`/`backdrop-filter` con `blur` (el vidrio).
// Escribe `datos/atmosfera.json`. Uso: node herramientas/atmosfera.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(BASE, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);

const PAGINAS = [
  ['koto', 'home', 'https://koto.com/'],
  ['koto', 'trabajo', 'https://koto.com/work'],
  ['acceptAndProceed', 'home', 'https://www.acceptandproceed.com/'],
  ['acceptAndProceed', 'trabajo', 'https://www.acceptandproceed.com/work'],
];

const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const salida = { fecha: new Date().toISOString(), medidoPor: 'Lucía (dirección de arte), herramientas/atmosfera.mjs', navegador: nav.version(), ancho: 1440, paginas: {} };

for (const [sitio, nombre, url] of PAGINAS) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const pg = await ctx.newPage();
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await pg.waitForTimeout(2500);
    // bajar la página entera, de a una pantalla, para que entren los bloques diferidos
    await pg.evaluate(async () => {
      const paso = innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += paso) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
      scrollTo(0, 0);
    });
    await pg.waitForTimeout(800);
    const r = await pg.evaluate(() => {
      const lienzo = document.createElement('canvas').getContext('2d');
      const aRgb = (c) => { lienzo.fillStyle = '#000'; lienzo.fillStyle = c; const v = lienzo.fillStyle; return v; };
      function oklch(hex) {
        const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
        if (!m) return null;
        const lin = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
        const [R, G, B] = [m[1], m[2], m[3]].map((h) => lin(parseInt(h, 16)));
        const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
        const mm = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
        const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
        const L = 0.2104542553 * l + 0.793617785 * mm - 0.0040720468 * s;
        const a = 1.9779984951 * l - 2.428592205 * mm + 0.4505937099 * s;
        const b = 0.0259040371 * l + 0.7827717662 * mm - 0.808675766 * s;
        const C = Math.hypot(a, b);
        let H = (Math.atan2(b, a) * 180) / Math.PI; if (H < 0) H += 360;
        return { L: +L.toFixed(3), C: +C.toFixed(3), H: +H.toFixed(1) };
      }
      const sel = (el) => {
        const partes = [];
        for (let n = el; n && n.nodeType === 1 && partes.length < 3; n = n.parentElement) {
          partes.unshift(n.tagName.toLowerCase() + (n.classList.length ? '.' + [...n.classList].slice(0, 2).join('.') : ''));
        }
        return partes.join(' > ');
      };
      const degradados = [];
      const vidrio = [];
      let elementos = 0;
      for (const el of document.querySelectorAll('*')) {
        elementos++;
        for (const pseudo of [null, '::before', '::after']) {
          const cs = getComputedStyle(el, pseudo);
          if (pseudo && (cs.content === 'none' || cs.content === 'normal')) continue;
          const bi = cs.backgroundImage;
          if (bi && bi.includes('gradient')) {
            const rect = el.getBoundingClientRect();
            const colores = (bi.match(/(rgba?\([^)]*\)|#[0-9a-f]{3,8}|oklch\([^)]*\)|oklab\([^)]*\)|color\([^)]*\))/gi) || []);
            const tonos = colores.map((c) => {
              // oklab(L a b / α) se lee directo (croma = √(a² + b²)); color(srgb r g b / α) y rgb() pasan a hex
              const ok = /^oklab\(\s*([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*\/\s*([\d.]+))?\)/i.exec(c);
              if (ok) {
                const [L, a, b] = [+ok[1], +ok[2], +ok[3]];
                let H = (Math.atan2(b, a) * 180) / Math.PI; if (H < 0) H += 360;
                return { color: c, hex: null, alfa: ok[4] !== undefined ? +ok[4] : 1, oklch: { L: +L.toFixed(3), C: +Math.hypot(a, b).toFixed(3), H: +H.toFixed(1) } };
              }
              const srgb = /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/i.exec(c);
              const v = srgb ? '#' + [1, 2, 3].map((i) => Math.round(+srgb[i] * 255).toString(16).padStart(2, '0')).join('') : aRgb(c);
              const alfa = srgb ? (srgb[4] !== undefined ? +srgb[4] : 1) : (/rgba\([^)]*,\s*([\d.]+)\)/.exec(c) || [0, 1])[1];
              return { color: c, hex: v.startsWith('#') ? v : null, alfa: +alfa, oklch: v.startsWith('#') ? oklch(v) : null };
            });
            degradados.push({ sel: sel(el) + (pseudo || ''), w: Math.round(rect.width), h: Math.round(rect.height), visible: rect.width > 0 && rect.height > 0, valor: bi.slice(0, 220), colores: tonos });
          }
          const f = cs.filter + ' ' + cs.backdropFilter;
          if (/blur/.test(f) && !pseudo) {
            const rect = el.getBoundingClientRect();
            vidrio.push({ sel: sel(el), filter: cs.filter, backdropFilter: cs.backdropFilter, w: Math.round(rect.width), h: Math.round(rect.height) });
          }
        }
      }
      const grandes = [...document.querySelectorAll('canvas, svg')].map((n) => ({ n, r: n.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 200 && r.height > 200)
        .map(({ n, r }) => ({ tag: n.tagName.toLowerCase(), sel: sel(n), w: Math.round(r.width), h: Math.round(r.height) }));
      // un degradado es «púrpura» si alguno de sus colores opacos tiene croma > 0,05 y tono OKLCH entre 280° y 330°
      const purpura = degradados.filter((d) => d.colores.some((c) => c.oklch && c.alfa > 0 && c.oklch.C > 0.05 && c.oklch.H >= 280 && c.oklch.H <= 330));
      const conColor = degradados.filter((d) => d.colores.some((c) => c.oklch && c.alfa > 0 && c.oklch.C > 0.05));
      const sinLeer = degradados.filter((d) => d.colores.some((c) => !c.oklch)).length;
      return { elementos, degradadosSinLeerColor: sinLeer, degradados: degradados.length, degradadosVisibles: degradados.filter((d) => d.visible).length, degradadosConColor: conColor.length, degradadosPurpura: purpura.length, detalle: degradados.slice(0, 40), vidrio: vidrio.slice(0, 20), vidrioTotal: vidrio.length, canvasYSvgGrandes: grandes };
    });
    salida.paginas[`${sitio}/${nombre}`] = { url, ...r };
    console.log(sitio, nombre, 'elementos', r.elementos, 'degradados', r.degradados, 'visibles', r.degradadosVisibles, 'con color', r.degradadosConColor, 'púrpura', r.degradadosPurpura, 'vidrio', r.vidrioTotal, 'canvas/svg grandes', r.canvasYSvgGrandes.length);
  } catch (err) {
    salida.paginas[`${sitio}/${nombre}`] = { url, error: String(err) };
    console.log(sitio, nombre, 'ERROR', String(err));
  }
  await ctx.close();
}
await nav.close();
fs.writeFileSync(path.join(BASE, 'datos', 'atmosfera.json'), JSON.stringify(salida, null, 1));
console.log('escrito datos/atmosfera.json');
