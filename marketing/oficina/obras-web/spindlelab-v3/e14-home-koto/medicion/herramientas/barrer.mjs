// Barre la home de Koto en pasos de N px y guarda, por elemento, solo los cambios de
// (top de documento, left, w, h, opacidad, transform, clip-path, filter).
import { abrir, cargarKoto, cookies } from './comun.mjs';
import fs from 'node:fs';
const [ancho, paso, espera, tag, reducido] = [ +process.argv[2], +process.argv[3], +process.argv[4], process.argv[5], process.argv[6]==='reducido' ];
const { nav, p } = await abrir(ancho, { reducedMotion: reducido ? 'reduce' : 'no-preference' });
const carga = await cargarKoto(p); await cookies(p);
await p.evaluate(() => {
  let i = 0; for (const e of document.querySelectorAll('body *')) { if (['SCRIPT','STYLE','LINK','META','svg','path','NOSCRIPT'].includes(e.tagName)) continue; e.dataset.mi = i++; }
  window.__muestra = () => { const o = {}; for (const e of document.querySelectorAll('[data-mi]')) { const b = e.getBoundingClientRect(); if (!b.width && !b.height) { o[e.dataset.mi] = null; continue; } const cs = getComputedStyle(e);
    o[e.dataset.mi] = [Math.round(b.top + scrollY), Math.round(b.left), Math.round(b.width), Math.round(b.height), +(+cs.opacity).toFixed(3), cs.transform, cs.clipPath, cs.filter, cs.visibility, cs.translate, cs.scale, (e.className.baseVal===undefined?e.className:'').toString()]; } return o; };
  window.__info = (i) => { const e = document.querySelector(`[data-mi="${i}"]`); return e ? { t: e.tagName, c: (e.className.baseVal===undefined ? e.className : '').toString().slice(0,200), txt: (e.innerText||'').trim().slice(0,50).replace(/\n/g,' | '), src: (e.currentSrc||e.src||'').slice(-60) } : null; };
});
const alto = await p.evaluate(() => document.documentElement.scrollHeight);
const muestras = []; let prev = {};
for (let y = 0; y <= alto; y += paso) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await p.waitForTimeout(espera);
  const sy = await p.evaluate(() => scrollY);
  const m = await p.evaluate(() => window.__muestra());
  const cambios = {};
  for (const [k, v] of Object.entries(m)) if (JSON.stringify(v) !== JSON.stringify(prev[k])) cambios[k] = v;
  muestras.push({ y: sy, cambios }); prev = m;
}
const ids = new Set(); muestras.slice(1).forEach(s => Object.keys(s.cambios).forEach(k => ids.add(k)));
const info = {}; for (const k of ids) info[k] = await p.evaluate(k => window.__info(k), k);
fs.writeFileSync(`barrido-${tag}.json`, JSON.stringify({ ancho, paso, espera, reducido, carga, alto, info, muestras }));
console.log('ok', tag, alto, ids.size);
await nav.close();
