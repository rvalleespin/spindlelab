// E12 · spec sobre A · qué hace Koto entre sus cortes (834 y 1194), para resolver el corte de 1024 que A dejó
// abierto (direccion-a.md §9.4; lock §2.3 y §7: «lo que pasa entre 834 y 1193 se mide en la spec»). Lucía, 19-oct-2026.
// Usa las piezas comunes de la medición de Koto (e12/medicion/koto/herramientas/comun.mjs): Chromium 141, carga con
// reintentos, cookies aceptadas, recorrido para que carguen las imágenes. Solo lee: GET y scroll.
// Mide en el caso Lyft y en /work, a 834, 900, 1024, 1100, 1193, 1194 y 1440 (alto 900, dpr 1, con mouse):
//   - la barra lateral del caso: si se ve, ancho, posición (sticky o no) y dónde queda el índice de secciones;
//   - la columna: ancho, el medio principal (ancho × alto), la caja del primer párrafo y cuántos caracteres entran
//     por línea (Range, carácter por carácter), y si el rótulo va al lado o encima del texto;
//   - /work: si hay barra lateral, cuántas columnas tiene el muro y su ancho.
// Uso: node koto-entre-cortes.mjs <salida.json> <carpeta-de-capturas>
import fs from 'node:fs';
import { abrirNavegador, cargar, aceptarCookies, recorrer, SEL_FN } from '../../medicion/koto/herramientas/comun.mjs';

const [salida, capturas = '.'] = process.argv.slice(2);
fs.mkdirSync(capturas, { recursive: true });
const ANCHOS = [834, 900, 1024, 1100, 1193, 1194, 1440];
const nav = await abrirNavegador();
const R = { cuando: new Date().toISOString(), chromium: nav.version(), caso: [], trabajo: [] };

const CASO = () => {
  const main = document.querySelector('#project-main');
  const col = document.querySelector('#project-content');
  const caja = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const lat = main ? [...main.children].find(c => c !== col && getComputedStyle(c).display !== 'none' && c.getBoundingClientRect().width > 0) : null;
  // primer párrafo largo de la columna
  const ps = col ? [...col.querySelectorAll('p')].filter(p => (p.innerText || '').trim().split(/\s+/).length > 25) : [];
  const p = ps[0];
  let cpl = null, lineas = null, fs = null;
  if (p) {
    fs = getComputedStyle(p).fontSize;
    const w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT); const nodos = []; while (w.nextNode()) nodos.push(w.currentNode);
    const rg = document.createRange(); let y0 = null, n = 0, max = 0, l = 1;
    for (const t of nodos) for (let i = 0; i < t.length; i++) { rg.setStart(t, i); rg.setEnd(t, i + 1); const r = rg.getBoundingClientRect(); if (!r.width && !r.height) continue; if (y0 === null) y0 = r.top; if (Math.abs(r.top - y0) > 3) { max = Math.max(max, n); n = 0; y0 = r.top; l++; } n++; }
    cpl = Math.max(max, n); lineas = l;
  }
  // rótulo mono más cercano antes del párrafo: ¿al lado (x distinto, y parecido) o encima?
  let rotulo = null;
  if (p) {
    const sec = p.closest('section, div');
    const mono = [...(col ? col.querySelectorAll('*') : [])].filter(e => e.children.length === 0 && /mono/i.test(getComputedStyle(e).fontFamily) && (e.innerText || '').trim()).map(e => ({ t: e.innerText.trim().slice(0, 30), ...caja(e) })).filter(m => m.y <= caja(p).y + 4).slice(-1)[0];
    rotulo = mono || null;
  }
  const medios = col ? [...col.querySelectorAll('img, video')].map(m => m.closest('div')).filter(Boolean).slice(0, 3).map(caja) : [];
  return {
    ancho: innerWidth,
    lateral: lat ? { ...caja(lat), position: getComputedStyle(lat).position, indice: !!lat.querySelector('a[href^="#"], button') } : null,
    columna: caja(col), parrafo: p ? { ...caja(p), fs, cpl, lineas } : null, rotulo, medios,
  };
};
const TRABAJO = () => {
  const caja = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.left), w: Math.round(r.width) }; };
  // piezas del muro: enlaces a /projects/ con imagen
  const piezas = [...document.querySelectorAll('a[href*="/projects/"]')].filter(a => a.querySelector('img, video')).map(a => caja(a.querySelector('img, video').closest('div') || a)).filter(c => c && c.w > 100);
  const xs = [...new Set(piezas.map(c => c.x))].sort((a, b) => a - b);
  const aside = [...document.querySelectorAll('aside, [class*="sidebar"], [class*="Sidebar"]')].map(caja).filter(c => c && c.w > 0)[0] || null;
  return { ancho: innerWidth, columnasMuro: xs.length, xs: xs.slice(0, 4), anchoPieza: piezas[0] ? piezas[0].w : null, aside };
};

for (const w of ANCHOS) {
  for (const [nombre, url, fn] of [['caso', 'https://koto.com/projects/lyft', CASO], ['trabajo', 'https://koto.com/work', TRABAJO]]) {
    const ctx = await nav.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, timezoneId: 'America/Santiago', locale: 'es-CL' });
    await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
    const p = await ctx.newPage();
    try {
      await cargar(p, url);
      await aceptarCookies(p);
      await p.evaluate(SEL_FN);
      await recorrer(p, { paso: 0.6, espera: 120 });
      R[nombre].push(await p.evaluate(fn));
      await p.screenshot({ path: `${capturas}/koto-${nombre}-${w}.jpg`, type: 'jpeg', quality: 70 });
    } catch (e) { R[nombre].push({ ancho: w, error: String(e).slice(0, 300) }); }
    await ctx.close();
  }
}
await nav.close();
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1).slice(0, 6000));
