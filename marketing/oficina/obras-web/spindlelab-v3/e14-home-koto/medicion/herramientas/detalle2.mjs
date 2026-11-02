import { abrir, cargarKoto, cookies } from './comun.mjs';
import fs from 'node:fs';
const { nav, p } = await abrir(1440);
await cargarKoto(p); await cookies(p);
const leer = () => p.evaluate(() => {
  const as = [...document.querySelectorAll('a')].filter(a => (a.className||'').includes('md:cursor-none') && a.className.includes('md:opacity'));
  const etq = [...document.querySelectorAll('h3')].filter(h => (h.parentElement.className||'').includes('duration-[133ms]')).map(h => ({ t: h.textContent, tr: getComputedStyle(h.parentElement).translate, cls: h.parentElement.className.replace(/.*ease-\[cubic-bezier\(0.75,0,0.85,1\)\] /,'') }));
  return { t: performance.now(), y: scrollY, ops: as.map(a => +(+getComputedStyle(a).opacity).toFixed(3)), vy: as.map(a => Math.round(a.getBoundingClientRect().top)), etq };
});
const ida = [], vuelta = [];
for (let y = 1700; y <= 2000; y += 8) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(350); ida.push(await leer()); }
for (let y = 2000; y >= 1700; y -= 8) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(350); vuelta.push(await leer()); }
// la etiqueta que entra, en el tiempo
await p.evaluate(() => scrollTo({ top: 2300, behavior: 'instant' })); await p.waitForTimeout(1200);
await p.evaluate(() => scrollTo({ top: 2440, behavior: 'instant' }));
const tiempo = []; const t0 = Date.now(); while (Date.now() - t0 < 900) { tiempo.push(await leer()); await p.waitForTimeout(15); }
// noticias y el bloque «say hello» al final
const final = [];
await p.evaluate(() => scrollTo({ top: 4300, behavior: 'instant' })); await p.waitForTimeout(800);
const noticias = await p.evaluate(() => {
  const h = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /^STUDIO NEWS$/i.test(e.textContent.trim()));
  let s = h; while (s && s.querySelectorAll('img').length < 3) s = s.parentElement;
  const b = s.getBoundingClientRect();
  return { top: Math.round(b.top + scrollY), h: Math.round(b.height), w: Math.round(b.width), cls: s.className.slice(0, 200), html: s.outerHTML.length,
    imgs: [...s.querySelectorAll('img')].map(i => { const r = i.getBoundingClientRect(); const pa = i.parentElement; return { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), x: Math.round(r.left), cls: i.className.slice(0, 160), padre: pa.className.slice(0, 160), abuelo: pa.parentElement.className.slice(0, 160), radio: getComputedStyle(pa).borderRadius, tr: getComputedStyle(i).transition.slice(0, 100) }; }),
    txt: s.innerText.slice(0, 600) };
});
await p.evaluate(() => scrollTo({ top: 4900, behavior: 'instant' })); await p.waitForTimeout(800);
await p.evaluate(() => scrollTo({ top: 99999, behavior: 'instant' }));
const t1 = Date.now();
while (Date.now() - t1 < 1600) {
  final.push(await p.evaluate(() => { const e = [...document.querySelectorAll('div')].find(d => (d.className||'').startsWith('pointer-events-none scale') && d.textContent.includes('SAY HELLO'));
    if (!e) return { t: performance.now(), y: scrollY, nada: true }; const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); const et = e.querySelector('span.translate-y-\\[10px\\], span[class*="translate-y"]');
    return { t: performance.now(), y: scrollY, sc: cs.scale, tf: cs.transform, origen: cs.transformOrigin, tr: cs.transition.slice(0,140), cls: e.className, x: Math.round(b.left), vy: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height), pos: getComputedStyle(e.parentElement).position, padre: e.parentElement.className.slice(0,160) }; }));
  await p.waitForTimeout(20);
}
await p.evaluate(() => scrollTo({ top: 4800, behavior: 'instant' })); await p.waitForTimeout(100);
const salida = await p.evaluate(() => { const e = [...document.querySelectorAll('div')].find(d => (d.className||'').startsWith('pointer-events-none scale') && d.textContent.includes('SAY HELLO')); return e ? { y: scrollY, sc: getComputedStyle(e).scale, tf: getComputedStyle(e).transform, cls: e.className } : null; });
await p.waitForTimeout(800);
const salida2 = await p.evaluate(() => { const e = [...document.querySelectorAll('div')].find(d => (d.className||'').startsWith('pointer-events-none scale') && d.textContent.includes('SAY HELLO')); return e ? { y: scrollY, tf: getComputedStyle(e).transform, cls: e.className } : null; });
fs.writeFileSync('detalle2-1440.json', JSON.stringify({ ida, vuelta, tiempo, noticias, final, salida, salida2 }, null, 1));
await nav.close();
