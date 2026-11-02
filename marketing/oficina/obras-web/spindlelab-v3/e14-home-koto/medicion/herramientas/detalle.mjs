// Tiempo contra scroll: se salta a una posición y se muestrea cada ~33 ms durante 1,2 s.
import { abrir, cargarKoto, cookies } from './comun.mjs';
import fs from 'node:fs';
const { nav, p } = await abrir(1440);
await cargarKoto(p); await cookies(p);
await p.evaluate(() => { let i = 0; for (const e of document.querySelectorAll('body *')) e.dataset.mi = i++; });
// ids del barrido no coinciden necesariamente; se ubican por texto/clase
const sel = await p.evaluate(() => {
  const q = (f) => { const e = [...document.querySelectorAll('[data-mi]')].find(f); return e ? e.dataset.mi : null; };
  return {
    linea1: q(e => e.className === 'translate-y-full' && e.textContent.startsWith('We make')),
    linea4: q(e => e.className === 'translate-y-full' && e.textContent.startsWith('New York')),
    bloqueIntro: q(e => (e.className||'').toString().startsWith('md:pointer-events-none md:pl-3')),
    clip: q(e => (e.className||'').toString().includes('bg-black will-chan')),
    etqInstagram: q(e => e.tagName==='DIV' && (e.className||'').toString().includes('duration-[133ms]') && e.textContent==='Instagram'),
    etqAmazon: q(e => e.tagName==='DIV' && (e.className||'').toString().includes('duration-[133ms]') && e.textContent==='Amazon'),
    tarjeta1: q(e => e.tagName==='A' && (e.className||'').toString().includes('md:cursor-none') && e.textContent.includes('Instagram')),
    tarjeta2: q(e => e.tagName==='A' && (e.className||'').toString().includes('md:cursor-none') && e.textContent.includes('Amazon')),
    textoAmazon: q(e => e.tagName==='DIV' && (e.className||'').toString().includes('transition-opacity') && e.textContent.startsWith('An 18-month')),
    panel: q(e => e.tagName==='DIV' && (e.className||'').toString()==='md:opacity-0' && e.textContent==='Our work'),
    filaPrensa: q(e => (e.className||'').toString()==='pt-3 pb-9 md:pb-12' && e.textContent.startsWith('Press')),
    hola: q(e => (e.className||'').toString().startsWith('pointer-events-none scale-') && e.textContent.includes('SAY HELLO')),
  };
});
console.log(sel);
const leer = (ids) => p.evaluate((ids) => { const o = { t: performance.now(), y: scrollY }; for (const [k, i] of Object.entries(ids)) { const e = document.querySelector(`[data-mi="${i}"]`); if (!e) continue; const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); o[k] = { op: +(+cs.opacity).toFixed(3), tf: cs.transform, tr: cs.translate, sc: cs.scale, clip: cs.clipPath, vy: Math.round(b.top), h: Math.round(b.height) }; } return o; }, ids);
async function prueba(nombre, desde, hasta, ids) {
  await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), desde); await p.waitForTimeout(1500);
  const out = [await leer(ids)];
  await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), hasta);
  const t0 = Date.now(); while (Date.now() - t0 < 1300) { out.push(await leer(ids)); await p.waitForTimeout(25); }
  return { nombre, desde, hasta, out };
}
const pick = (...k) => Object.fromEntries(k.map(x => [x, sel[x]]));
const R = [];
R.push(await prueba('intro-lineas', 500, 700, pick('linea1', 'linea4', 'bloqueIntro', 'clip')));
R.push(await prueba('intro-lineas-b', 700, 820, pick('linea1', 'linea4', 'bloqueIntro', 'clip')));
R.push(await prueba('panel-entra', 600, 1000, pick('panel')));
R.push(await prueba('cambio-de-caso', 1840, 1960, pick('etqInstagram', 'etqAmazon', 'tarjeta1', 'tarjeta2', 'textoAmazon')));
R.push(await prueba('cambio-de-caso-vuelta', 1960, 1840, pick('etqInstagram', 'etqAmazon', 'tarjeta1', 'tarjeta2', 'textoAmazon')));
R.push(await prueba('contacto-filas', 4900, 5000, pick('filaPrensa')));
R.push(await prueba('hola', 5000, 6000, pick('hola', 'filaPrensa')));
R.push(await prueba('hola-vuelta', 6000, 5000, pick('hola')));
// umbral fino del cambio de caso, paso 8 px con 400 ms de espera
const umbral = [];
for (let y = 1840; y <= 1960; y += 8) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(400); umbral.push(await leer(pick('tarjeta1', 'tarjeta2', 'etqAmazon'))); }
const umbralVuelta = [];
for (let y = 1960; y >= 1840; y -= 8) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(400); umbralVuelta.push(await leer(pick('tarjeta1', 'tarjeta2', 'etqAmazon'))); }
// noticias: clases y transiciones de las imágenes
const noticias = await p.evaluate(() => {
  const h = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /STUDIO NEWS/i.test(e.textContent));
  let s = h; for (let i = 0; i < 4 && s; i++) s = s.parentElement;
  const b = s.getBoundingClientRect();
  return { top: Math.round(b.top + scrollY), h: Math.round(b.height), imgs: [...s.querySelectorAll('img')].map(i => { const r = i.getBoundingClientRect(); const cs = getComputedStyle(i); const pa = i.closest('a'); return { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), x: Math.round(r.left), cls: i.className.slice(0, 120), trans: cs.transition.slice(0, 120), pcls: pa ? pa.className.slice(0, 160) : '', radio: getComputedStyle(i.parentElement).borderRadius }; }), txt: s.innerText.slice(0, 400) };
});
fs.writeFileSync('detalle-1440.json', JSON.stringify({ sel, R, umbral, umbralVuelta, noticias }, null, 1));
await nav.close();
