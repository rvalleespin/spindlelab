// Ronda 3 · desborde en 14 anchos × 6 páginas. Tres medidas por vista, evaluadas EN la página:
//  1) scrollWidth contra clientWidth tal como está (con el overflow-x: clip del body);
//  2) scrollWidth con el clip apagado (html y body overflow-x visible): el desborde que el clip escondería;
//  3) texto que sale de su caja o de la pantalla (rango del nodo de texto contra la caja del elemento),
//     y titulares cuyas líneas pisan una foto, un espacio de foto u otro bloque de texto.
// Uso: node desborde3.mjs <salida.json>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const OUT = process.argv[2];
const PAGS = ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html'];
const ANCHOS = (process.env.ANCHOS || '360,390,430,600,700,768,820,900,1024,1180,1280,1366,1440,1920').split(',').map(Number);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const res = [];
for (const w of ANCHOS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  for (const u of PAGS) {
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 15)); } scrollTo(0, 0); });
    const r = await p.evaluate(() => {
      const de = document.documentElement, cw = de.clientWidth, sw = de.scrollWidth;
      // 3) texto fuera de su caja
      const texto = [];
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,li,span,dt,dd,strong,b,em,button,label,figcaption,blockquote,div,small,time')) {
        if (el.closest('.cinta') || el.closest('.d-sr')) continue;
        const t = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()); if (!t.length) continue;
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        const br = el.getBoundingClientRect(); if (!br.width) continue;
        for (const n of t) {
          const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getBoundingClientRect(); if (!rr.width) continue;
          const inline = cs.display.startsWith('inline');
          if (rr.right > cw + 0.5 || rr.left < -0.5 || (!inline && (rr.right > br.right + 1.5 || rr.left < br.left - 1.5)))
            texto.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} «${n.textContent.trim().slice(0, 28)}» ${cs.fontSize} texto ${Math.round(rr.left)}→${Math.round(rr.right)} caja ${Math.round(br.left)}→${Math.round(br.right)} pantalla ${cw}`);
        }
      }
      // titulares que pisan fotos u otro texto
      const pisa = [];
      const fotos = [...document.querySelectorAll('img, .foto-slot, picture, video')].map(e => [e, e.getBoundingClientRect()]).filter(([, r]) => r.width > 4 && r.height > 4);
      const bloques = [...document.querySelectorAll('p, li, h1, h2, h3, h4, dd, dt, figcaption, label, blockquote')].filter(e => !e.closest('.cinta, .d-sr'));
      const lineas = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()].filter(r => r.width > 2 && r.height > 2); };
      const cruza = (a, c) => Math.max(0, Math.min(a.right, c.right) - Math.max(a.left, c.left)) * Math.max(0, Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top));
      for (const h of document.querySelectorAll('h1, h2, h3, .d-display')) {
        if (h.closest('.cinta, .d-sr')) continue;
        const ls = lineas(h);
        for (const [f, fr] of fotos) { if (f.contains(h) || h.contains(f)) continue; const a = ls.reduce((s, l) => s + cruza(l, fr), 0); if (a > 30) pisa.push(`«${h.textContent.trim().slice(0, 24)}» pisa ${f.tagName.toLowerCase()}.${String(f.className).split(' ')[0]} (${Math.round(a)} px²)`); }
        for (const o of bloques) { if (o === h || o.contains(h) || h.contains(o)) continue; const ol = lineas(o); let a = 0; for (const l of ls) for (const m of ol) a += cruza(l, m); if (a > 30) pisa.push(`«${h.textContent.trim().slice(0, 24)}» pisa el texto «${o.textContent.trim().slice(0, 24)}» (${Math.round(a)} px²)`); }
      }
      // 2) sin el clip
      const prev = [de.style.overflowX, document.body.style.overflowX];
      de.style.setProperty('overflow-x', 'visible', 'important'); document.body.style.setProperty('overflow-x', 'visible', 'important');
      const swSinClip = de.scrollWidth;
      const fuera = [];
      if (swSinClip > cw) for (const el of document.querySelectorAll('body *')) { const rr = el.getBoundingClientRect(); if (rr.width && rr.right > cw + 1) fuera.push([Math.round(rr.right), el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]]); }
      de.style.overflowX = prev[0]; document.body.style.overflowX = prev[1];
      fuera.sort((a, b) => b[0] - a[0]);
      const tam = (s) => { const e = document.querySelector(s); return e ? parseFloat(getComputedStyle(e).fontSize) : null; };
      return { cw, sw, swSinClip, texto, pisa, fuera: fuera.slice(0, 5), h1px: tam('h1') };
    });
    res.push({ w, u, ...r });
    const mal = r.sw > r.cw || r.swSinClip > r.cw || r.texto.length || r.pisa.length;
    console.log(`${w} ${u.padEnd(36)} cw ${r.cw} sw ${r.sw} sinClip ${r.swSinClip} h1 ${r.h1px}px ${mal ? '✗' : '✓'}${r.texto.length ? '\n   texto: ' + r.texto.slice(0, 6).join('\n          ') : ''}${r.pisa.length ? '\n   pisa: ' + r.pisa.slice(0, 6).join('\n         ') : ''}${r.fuera.length ? '\n   fuera: ' + JSON.stringify(r.fuera) : ''}`);
    await p.close();
  }
  await ctx.close();
}
writeFileSync(OUT, JSON.stringify(res, null, 1));
await b.close();
