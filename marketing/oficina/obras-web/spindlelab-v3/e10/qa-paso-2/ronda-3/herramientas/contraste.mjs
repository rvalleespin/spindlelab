// Ronda 2 · contraste de cada nodo de texto visible: color propio con opacidad heredada, fondo compuesto
// bajando por los ancestros (rgba), y los fondos de imagen conocidos (el marcador = resaltador o papel).
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let total = 0, fallas = [], min = 99, minDe = '';
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) for (const w of [1440, 390]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v[3] ?? 1]; };
    const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), 1];
    const mezcla = (arriba, abajo) => { const a = arriba[3]; return [0, 1, 2].map(i => arriba[i] * a + abajo[i] * (1 - a)).concat(1); };
    const lum = (c) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
    const fondoDe = (el) => {
      const capas = []; let sinDeterminar = null;
      for (let e = el; e; e = e.parentElement) {
        const cs = getComputedStyle(e); const bi = cs.backgroundImage;
        if (bi && bi !== 'none') {
          if (/marcador-papel/.test(bi)) { capas.push(hex('#F7F5F0')); break; }
          if (/marcador/.test(bi)) { capas.push(hex('#EEF26E')); break; }
          if (!/gradient/.test(bi)) { sinDeterminar = bi.slice(0, 60); }
        }
        const c = parse(cs.backgroundColor); if (c && c[3] > 0) { capas.push(c); if (c[3] >= 1) break; }
      }
      let base = [255, 255, 255, 1]; for (let i = capas.length - 1; i >= 0; i--) base = mezcla(capas[i], base);
      return { bg: base, sinDeterminar };
    };
    const out = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) {
      const n = tw.currentNode; if (!n.data.trim()) continue; const el = n.parentElement;
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getBoundingClientRect(); if (rr.width < 1 || rr.height < 1) continue;
      const cs = getComputedStyle(el); let op = 1; for (let e = el; e; e = e.parentElement) op *= Number(getComputedStyle(e).opacity);
      const { bg, sinDeterminar } = fondoDe(el); let fg = parse(cs.color); fg = mezcla([fg[0], fg[1], fg[2], fg[3] * op], bg);
      const fs = parseFloat(cs.fontSize), fw = Number(cs.fontWeight); const grande = fs >= 24 || (fs >= 18.66 && fw >= 700);
      const c = ratio(fg, bg);
      out.push({ t: n.data.trim().slice(0, 40), c: Math.round(c * 100) / 100, grande, fs, sinDeterminar, cinta: !!el.closest('.cinta') });
    }
    return out;
  });
  for (const x of r) { total++; const umbral = x.grande ? 3 : 4.5; if (x.c < min && !x.sinDeterminar) { min = x.c; minDe = `${u} ${w} «${x.t}»`; } if (x.c < umbral && !x.sinDeterminar) fallas.push(`${u} ${w} «${x.t}» ${x.c}:1 (${x.fs}px)`); }
  const sd = r.filter(x => x.sinDeterminar); if (sd.length) console.log(u, w, 'sin determinar (fondo de imagen):', sd.length, sd.slice(0, 3).map(x => x.t + ' ' + x.sinDeterminar));
}
console.log('nodos', total, '· mínimo', min, minDe, '· fallas', fallas.length); fallas.slice(0, 20).forEach(f => console.log('  ', f));
await b.close();
