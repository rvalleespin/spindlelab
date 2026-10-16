// E12 · Koto · paso 2 · la anatomía de un caso, para armar los nuestros igual.
// Lee del DOM, ya recorrida la página (carga diferida hecha):
//   - la barra lateral: ancho, si es pegajosa, título, bajada, ficha mono, índice de secciones y el
//     marcador de la activa (lo que cambia de color o el punto), leído arriba y a media página;
//   - la columna del caso, en orden: cada marco de medio (caja con radio que recorta un img, video o
//     iframe) con su caja, proporción, radio y la fila a la que pertenece (uno solo, par, uno + dos
//     apilados…), y si va al ancho de la columna, a media columna o a sangre (ancho de ventana);
//   - cada bloque de texto: rótulo mono, titular, párrafos (palabras, caracteres, líneas), borde superior;
//     y cualquier otro texto de la columna (cita, créditos) con su letra y su tamaño;
//   - el cierre: «Next up», el título del siguiente caso, su imagen, el bloque de contacto y el enlace al
//     índice, con su caja; y cómo aparece (posición fija, opacidad) al llegar al final.
// Uso: node caso.mjs <id> <url> <ancho> <dir-crudo>
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from '../../herramientas/comun.mjs';

const [id, url, anchoArg, dirCrudo] = process.argv.slice(2);
const ancho = +anchoArg;
const nav = await abrirNavegador();
const ctx = await contexto(nav, ancho);
const p = await ctx.newPage();
const carga = await cargar(p, url);
await aceptarCookies(p);
await p.evaluate(SEL_FN);
await recorrer(p, { paso: 0.5, espera: 160 });
await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

const LATERAL = () => {
  const main = document.querySelector('#project-main');
  if (!main) return null;
  // la barra lateral es el hijo de #project-main que no es la columna y se ve (a 390, el encabezado del caso)
  const lat = [...main.children].find(c => c.id !== 'project-content' && getComputedStyle(c).display !== 'none' && c.getBoundingClientRect().width > 0) || main.firstElementChild;
  const r = lat.getBoundingClientRect();
  const s = getComputedStyle(lat);
  const visible = s.display !== 'none' && r.width > 0;
  const hojas = [...lat.querySelectorAll('*')].filter(e => e.children.length === 0 && (e.innerText || '').trim());
  const textos = hojas.map(e => { const q = getComputedStyle(e); const rr = e.getBoundingClientRect(); return { t: e.innerText.trim(), tag: e.tagName.toLowerCase(), ff: q.fontFamily.split(',')[0], fs: q.fontSize, peso: q.fontWeight, color: q.color, tt: q.textTransform, x: Math.round(rr.left), y: Math.round(rr.top), w: Math.round(rr.width), h: Math.round(rr.height) }; });
  // marcadores chicos (puntos) y su color
  const puntos = [...lat.querySelectorAll('*')].filter(e => { const rr = e.getBoundingClientRect(); return rr.width > 0 && rr.width <= 12 && rr.height <= 12 && rr.height > 0; }).map(e => { const q = getComputedStyle(e); const rr = e.getBoundingClientRect(); return { sel: window.__sel(e), w: Math.round(rr.width), h: Math.round(rr.height), x: Math.round(rr.left), y: Math.round(rr.top), bg: q.backgroundColor, radio: q.borderRadius, opacidad: q.opacity, transform: q.transform }; }).filter(z => z.bg !== 'rgba(0, 0, 0, 0)');
  return { visible, x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), position: s.position, top: s.top, textos, puntos, scrollY: Math.round(scrollY) };
};
const lateralArriba = await p.evaluate(LATERAL);
const mitad = await p.evaluate(() => Math.round(document.documentElement.scrollHeight * 0.45));
await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), mitad);
await p.waitForTimeout(900);
const lateralMitad = await p.evaluate(LATERAL);
await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await p.waitForTimeout(900);

const anatomia = await p.evaluate(() => {
  const main = document.querySelector('#project-main');
  const col = document.querySelector('#project-content');
  const colR = col.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const Y = (r) => Math.round(r.top + scrollY);
  const visible = (e) => { const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; for (let x = e; x && x !== document.body; x = x.parentElement) { const s = getComputedStyle(x); if (s.display === 'none' || s.visibility === 'hidden') return false; } return true; };
  // marcos de medio
  const marcos = [];
  for (const e of main.querySelectorAll('*')) {
    const s = getComputedStyle(e);
    if (s.borderRadius === '0px' || s.overflow === 'visible') continue;
    if (!e.querySelector('img, video, iframe')) continue;
    if (!visible(e)) continue;
    if (marcos.some(m => m.el.contains(e))) continue;
    marcos.push({ el: e });
  }
  const filasMap = new Map();
  // medios sin marco (sin radio que los recorte): también cuentan, marcados
  for (const e of main.querySelectorAll('img, video, iframe')) {
    if (marcos.some(m => m.el.contains(e))) continue;
    const r = e.getBoundingClientRect();
    if (r.width < 100 || r.height < 60 || !visible(e)) continue;
    marcos.push({ el: e, sinMarco: true });
  }
  const lateralEl = [...main.children].find(c => c.id !== 'project-content' && getComputedStyle(c).display !== 'none' && c.getBoundingClientRect().width > 0) || main.firstElementChild;
  const medios = marcos.map(({ el, sinMarco }) => {
    const r = el.getBoundingClientRect();
    let fila = el;
    while (fila.parentElement && fila.parentElement !== main && fila.getBoundingClientRect().width < colR.width * 0.98) fila = fila.parentElement;
    if (!filasMap.has(fila)) filasMap.set(fila, filasMap.size);
    const tipo = el.querySelector('video') ? 'video' : el.querySelector('iframe') ? 'video (iframe de Vimeo, póster en img)' : 'imagen';
    const img = el.querySelector('img');
    const enLateral = lateralEl.contains(el);
    return { fila: filasMap.get(fila), tipo, enLateral, sinMarco: !!sinMarco, x: Math.round(r.left), xEnColumna: Math.round(r.left - colR.left), y: Y(r), w: Math.round(r.width), h: Math.round(r.height), proporcion: +(r.width / r.height).toFixed(3), radio: getComputedStyle(el).borderRadius,
      deColumna: +(r.width / colR.width).toFixed(3), deVentana: +(r.width / vw).toFixed(3), aSangre: r.left <= 1 && r.right >= vw - 1, src: img ? (img.currentSrc || img.src).slice(-70) : null, natural: img && img.naturalWidth ? [img.naturalWidth, img.naturalHeight] : null };
  });
  // textos: hojas con texto visibles dentro de #project-main, fuera de los marcos
  const textos = [];
  for (const e of main.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,li,blockquote,figcaption,div')) {
    const propio = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    if (!propio) continue;
    if (!visible(e)) continue;
    if (marcos.some(m => m.el.contains(e))) continue;
    const s = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    const t = (e.innerText || '').trim().replace(/\s+/g, ' ');
    // borde superior en algún ancestro cercano (la sección)
    let borde = null;
    for (let x = e, n = 0; x && x !== main && n < 8; x = x.parentElement, n++) { const q = getComputedStyle(x); if (q.borderTopWidth !== '0px' && q.borderTopStyle !== 'none') { borde = { ancho: q.borderTopWidth, color: q.borderTopColor, y: Y(x.getBoundingClientRect()) }; break; } }
    const seccion = e.closest('[id]') && e.closest('[id]') !== main && main.contains(e.closest('[id]')) ? e.closest('[id]').id : null;
    const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2;
    textos.push({ t: t.slice(0, 400), palabras: t.split(/\s+/).filter(Boolean).length, caracteres: t.length, lineas: Math.round(r.height / lh), tag: e.tagName.toLowerCase(), ff: s.fontFamily.split(',')[0], fs: s.fontSize, lh: s.lineHeight, peso: s.fontWeight, color: s.color, tt: s.textTransform,
      x: Math.round(r.left), xEnColumna: Math.round(r.left - colR.left), y: Y(r), w: Math.round(r.width), h: Math.round(r.height), seccion, borde, enLateral: lateralEl.contains(e), enColumna: col.contains(e) });
  }
  // separación vertical entre bloques consecutivos de la columna (medios y secciones)
  const secciones = [...col.querySelectorAll('[id]')].filter(visible).map(e => { const r = e.getBoundingClientRect(); return { id: e.id, y: Y(r), h: Math.round(r.height), w: Math.round(r.width) }; });
  return { columna: { x: Math.round(colR.left), w: Math.round(colR.width), y: Y(colR), h: Math.round(colR.height), gapFilas: getComputedStyle(col).rowGap, padding: getComputedStyle(col).padding }, ventana: vw, alto: document.documentElement.scrollHeight, medios, textos, secciones };
});

// El cierre: el bloque «Next up» (en Koto, fijo abajo y revelado al final con el scroll).
const cierre = [];
const alto = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (const k of [0.9, 0.95, 0.98, 1]) {
  const y = Math.round(alto * k);
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await p.waitForTimeout(900);
  cierre.push(await p.evaluate(() => {
    const nx = [...document.querySelectorAll('div')].find(d => /^NEXT UP/i.test((d.innerText || '').trim()) && d.getBoundingClientRect().width > 300 && getComputedStyle(d).position === 'fixed') ||
               [...document.querySelectorAll('div')].filter(d => /NEXT UP/i.test((d.innerText || '').trim()) && d.getBoundingClientRect().height > 100).pop();
    if (!nx) return { scrollY: Math.round(scrollY), hallado: false };
    const r = nx.getBoundingClientRect();
    const hojas = [...nx.querySelectorAll('*')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => { const s = getComputedStyle(e); const rr = e.getBoundingClientRect(); let o = 1; for (let x = e; x && x !== document.body; x = x.parentElement) o *= +getComputedStyle(x).opacity; return { t: (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 80), ff: s.fontFamily.split(',')[0], fs: s.fontSize, color: s.color, opacidad: +o.toFixed(3), x: Math.round(rr.left), y: Math.round(rr.top), w: Math.round(rr.width), h: Math.round(rr.height) }; });
    const imgs = [...nx.querySelectorAll('img, video')].map(e => { const rr = e.getBoundingClientRect(); let o = 1; for (let x = e; x && x !== document.body; x = x.parentElement) o *= +getComputedStyle(x).opacity; return { x: Math.round(rr.left), y: Math.round(rr.top), w: Math.round(rr.width), h: Math.round(rr.height), opacidad: +o.toFixed(3) }; });
    const s = getComputedStyle(nx);
    return { scrollY: Math.round(scrollY), hallado: true, position: s.position, bg: s.backgroundColor, x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), hojas, imgs };
  }));
}
fs.writeFileSync(path.join(dirCrudo, `caso-${id}-${ancho}.json`), JSON.stringify({ id, url, ancho, fecha: new Date().toISOString(), carga, lateralArriba, lateralMitad, ...anatomia, cierre }, null, 1));
await nav.close();
console.log('ok', id, ancho, anatomia.medios.length, 'medios', anatomia.textos.length, 'textos');
