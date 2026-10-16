// Capturas, desborde real, 404, red externa, fotos viejas, h1/main, imgs sin dimensiones. Javiera, ronda 2.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const OUT = process.argv[2];
const PAGINAS = [
  ['taller-home', 'http://127.0.0.1:8780/taller/home.html'],
  ['taller-acomp', 'http://127.0.0.1:8780/taller/acompanamiento-mensual.html'],
  ['taller-trabajo', 'http://127.0.0.1:8780/taller/trabajo.html'],
  ['pizarra-home', 'http://127.0.0.1:8780/pizarra/home.html'],
  ['pizarra-acomp', 'http://127.0.0.1:8780/pizarra/acompanamiento-mensual.html'],
  ['pizarra-trabajo', 'http://127.0.0.1:8780/pizarra/trabajo.html'],
  ['dist-home', 'http://127.0.0.1:8781/v3/'],
  ['dist-acomp', 'http://127.0.0.1:8781/v3/servicios/acompanamiento-mensual/'],
  ['dist-trabajo', 'http://127.0.0.1:8781/v3/trabajo/'],
];
const ANCHOS = (process.argv[3] || '360,390,768,1440').split(',').map(Number);
const CAPT = new Set((process.argv[4] || '390,1440').split(',').map(Number));
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-lcd-text'] });
const res = [];
for (const [nombre, url] of PAGINAS) for (const w of ANCHOS) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const externas = new Set(), malas = [];
  p.on('request', (r) => { const u = new URL(r.url()); if (!['127.0.0.1', 'localhost'].includes(u.hostname) && u.protocol.startsWith('http')) externas.add(u.host); });
  p.on('response', (r) => { if (r.status() >= 400) malas.push(`${r.status()} ${r.url()}`); });
  p.on('requestfailed', (r) => malas.push(`FALLÓ ${r.url()} ${r.failure()?.errorText}`));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { await document.fonts.ready; for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 300)); });
  const m = await p.evaluate(() => {
    const de = document.documentElement, cw = de.clientWidth;
    const anchos = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect(); if (!r.width) continue;
      const cs = getComputedStyle(el); if (cs.position === 'fixed') continue;
      if (r.right > cw + 0.5 || r.left < -0.5) anchos.push({ el: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0,2).join('.') : ''), l: Math.round(r.left), r: Math.round(r.right) });
    }
    const viejas = [];
    for (const img of document.images) if (/assets\/img\/d\//.test(img.currentSrc || img.src) || /assets\/img\/d\//.test(img.srcset || '')) viejas.push(img.currentSrc || img.src);
    for (const el of document.querySelectorAll('*')) { const bg = getComputedStyle(el).backgroundImage; if (/assets\/img\/d\//.test(bg)) viejas.push('bg ' + bg); }
    for (const s of document.querySelectorAll('source')) if (/assets\/img\/d\//.test(s.srcset)) viejas.push('source ' + s.srcset);
    const sinDim = [...document.images].filter(i => !i.getAttribute('width') || !i.getAttribute('height')).map(i => i.getAttribute('src'));
    const rotas = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src'));
    return { scrollW: de.scrollWidth, clientW: cw, bodyScrollW: document.body.scrollWidth, overflowX: getComputedStyle(document.body).overflowX + '/' + getComputedStyle(de).overflowX, alto: de.scrollHeight,
      h1: document.querySelectorAll('h1').length, main: document.querySelectorAll('main').length, fueraDeAncho: anchos.slice(0, 12), nFuera: anchos.length, viejas, sinDim, rotas };
  });
  if (CAPT.has(w)) await p.screenshot({ path: `${OUT}/${nombre}-${w}.jpg`, fullPage: true, type: 'jpeg', quality: 70 });
  res.push({ nombre, w, ...m, externas: [...externas], malas });
  console.log(nombre, w, `scroll ${m.scrollW}/${m.clientW} body ${m.bodyScrollW} (${m.overflowX}) h1 ${m.h1} main ${m.main} fuera ${m.nFuera} viejas ${m.viejas.length} sinDim ${m.sinDim.length} rotas ${m.rotas.length} ext [${[...externas]}] malas ${malas.length}`);
  await ctx.close();
}
writeFileSync(`${OUT}/cap.json`, JSON.stringify(res, null, 1));
await b.close();
