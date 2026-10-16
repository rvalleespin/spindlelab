// Ronda 3 · espacios de foto: render (1440 a dpr 1 y 390 a dpr 2, como dice espacios-foto.json) contra
// espacios-foto.json y contra e10/fotos/pauta.json (css_1440/css_390 y rótulo). Además, a 360, 768 y 1024, que
// el espacio no se deforma (proporción del render = proporción declarada a 390 o a 1440).
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const B = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3';
const esp = JSON.parse(readFileSync(`${B}/tableros/e10-direcciones/espacios-foto.json`, 'utf8'));
const pauta = JSON.parse(readFileSync(`${B}/e10/fotos/pauta.json`, 'utf8')).fotos;
const DIR = { taller: 'Taller', pizarra: 'Pizarra limpia' };
const PAGS = ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let ok = 0, mal = 0; const vistos = new Set();
for (const w of [1440, 390, 360, 768, 1024]) for (const u of PAGS) {
  const dir = u.split('/')[0];
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: w === 390 ? 2 : 1, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const slots = await p.evaluate(() => [...document.querySelectorAll('.foto-slot')].map(s => { const r = s.getBoundingClientRect(); const rot = s.querySelector('[data-rotulo-foto]'); return { id: rot?.textContent.match(/F\d+/)?.[0], rot: rot?.textContent.trim(), w: r.width, h: r.height, r: getComputedStyle(s).aspectRatio, izq: Math.round(r.left), der: Math.round(r.right), cw: document.documentElement.clientWidth }; }));
  for (const s of slots) {
    const e = esp.find(x => x.id === s.id && x.direccion === DIR[dir]); const f = pauta.find(x => x.id === s.id && x.direccion === dir);
    if (w === 1440 || w === 390) {
      const W = Math.round(s.w), H = Math.round(s.h);
      const cE = e && e[`ancho_px_${w}`] === W && e[`alto_px_${w}`] === H;
      const cP = f && f.espacio[`css_${w}`][0] === W && f.espacio[`css_${w}`][1] === H;
      const rotOk = e && f && s.rot === e.rotulo && e.rotulo === f.espacio.rotulo_tablero;
      (cE && cP && rotOk) ? ok++ : mal++; vistos.add(`${s.id}-${dir}`);
      console.log(`${w} ${u.padEnd(36)} ${s.id} render ${s.w.toFixed(2)}×${s.h.toFixed(2)} · espacios ${e ? e[`ancho_px_${w}`] + '×' + e[`alto_px_${w}`] : '—'} ${cE ? '✓' : '✗'} · pauta ${f ? f.espacio[`css_${w}`].join('×') : '—'} ${cP ? '✓' : '✗'} · rótulo igual en los tres ${rotOk ? '✓' : '✗ ' + JSON.stringify([s.rot, e?.rotulo, f?.espacio.rotulo_tablero])} · ${s.izq <= 0 ? 'sangre izq ' : ''}${s.der >= s.cw - 1 ? 'sangre der' : ''}`);
    } else {
      console.log(`${w} ${u.padEnd(36)} ${s.id} render ${s.w.toFixed(1)}×${s.h.toFixed(1)} = ${(s.w / s.h).toFixed(3)} (aspect-ratio ${s.r}) · dentro de la pantalla ${s.izq >= 0 && s.der <= s.cw ? '✓' : '✗ ' + s.izq + '→' + s.der}`);
    }
  }
  await p.context().close();
}
const faltan = [...esp.map(e => `${e.id}-${e.direccion === 'Taller' ? 'taller' : 'pizarra'}`), ...pauta.map(f => `${f.id}-${f.direccion}`)].filter(k => !vistos.has(k));
console.log(`\n1440 y 390: ${ok} calzan en los tres, ${mal} no · fichas sin espacio en el render: ${JSON.stringify([...new Set(faltan)])} · espacios-foto ${esp.length} · pauta ${pauta.length}`);
await b.close();
