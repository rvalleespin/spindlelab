// Home actual de spindlelab.cl: secciones, palabras, medios y lo que se mueve al bajar.
import { abrir } from './comun.mjs';
import fs from 'node:fs';
const ancho = +process.argv[2];
const { nav, p } = await abrir(ancho);
await p.goto('https://spindlelab.cl/', { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
const secciones = await p.evaluate(() => {
  const main = document.querySelector('main') || document.body;
  const secs = [...main.children].filter(e => e.getBoundingClientRect().height > 40);
  return secs.map(s => { const b = s.getBoundingClientRect(); const txt = s.innerText.trim();
    const medios = [...s.querySelectorAll('img,video,picture,canvas,iframe')].filter(m => { const r = m.getBoundingClientRect(); return r.width * r.height > 120 * 120; }).map(m => { const r = m.getBoundingClientRect(); return { t: m.tagName, w: Math.round(r.width), h: Math.round(r.height), src: (m.currentSrc || m.src || '').split('/').slice(-2).join('/') }; });
    const fondos = [...s.querySelectorAll('*')].concat([s]).filter(e => getComputedStyle(e).backgroundImage.includes('url(')).length;
    const sticky = [...s.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').length;
    return { tag: s.tagName, id: s.id, cls: (s.className||'').toString().slice(0, 100), top: Math.round(b.top + scrollY), h: Math.round(b.height), palabras: txt ? txt.split(/\s+/).length : 0, inicio: txt.slice(0, 70).replace(/\n/g, ' | '), h2: (s.querySelector('h1,h2') || {}).textContent?.trim().slice(0, 80), medios, fondos, sticky, reveal: s.querySelectorAll('[data-reveal]').length };
  });
});
const total = await p.evaluate(() => ({ alto: document.documentElement.scrollHeight, palabras: (document.querySelector('main') || document.body).innerText.trim().split(/\s+/).length, reduce: [...document.styleSheets].map(s => { try { return [...s.cssRules].filter(r => r.cssText.includes('prefers-reduced-motion')).length; } catch (e) { return 0; } }).reduce((a, b) => a + b, 0), animaciones: document.getAnimations().length }));
// barrido: cambios de opacidad/transform/translate al bajar
await p.evaluate(() => { let i = 0; for (const e of document.querySelectorAll('main *')) e.dataset.mi = i++;
  window.__m = () => { const o = {}; for (const e of document.querySelectorAll('[data-mi]')) { const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); o[e.dataset.mi] = [ +(+cs.opacity).toFixed(2), cs.transform, cs.translate, cs.scale, cs.clipPath, Math.round(b.top + scrollY) ]; } return o; }; });
let prev = await p.evaluate(() => window.__m()); const cambian = {};
for (let y = 0; y <= total.alto; y += 60) {
  await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(110);
  const m = await p.evaluate(() => window.__m());
  for (const [k, v] of Object.entries(m)) { const a = prev[k]; if (!a) continue; const campos = []; ['op','tf','tr','sc','clip','top'].forEach((n, i) => { if (JSON.stringify(a[i]) !== JSON.stringify(v[i])) campos.push(n); }); if (campos.length) { cambian[k] = cambian[k] || { campos: new Set(), ys: [] }; campos.forEach(c => cambian[k].campos.add(c)); cambian[k].ys.push(y); } }
  prev = m;
}
const lista = []; for (const [k, v] of Object.entries(cambian)) { const i = await p.evaluate(k => { const e = document.querySelector(`[data-mi="${k}"]`); const s = e.closest('main > *'); return { t: e.tagName, c: (e.className||'').toString().slice(0, 100), txt: (e.innerText||'').trim().slice(0, 40), sec: s ? [...s.parentElement.children].indexOf(s) : -1, padreCambia: false }; }, k); lista.push({ k, ...i, campos: [...v.campos], desde: v.ys[0], hasta: v.ys.at(-1) }); }
fs.writeFileSync(`spindle-${ancho}.json`, JSON.stringify({ secciones, total, cambian: lista }, null, 1));
// capturas
fs.mkdirSync('capsl', { recursive: true });
await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(600);
for (const s of secciones) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), s.top); await p.waitForTimeout(700); const y = await p.evaluate(() => scrollY); await p.screenshot({ path: `capsl/spindlelab-${ancho}-y${String(y).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 70 }); }
await nav.close(); console.log('ok', ancho);
