// Ronda 2 · techos del lock §13 y espacios de foto contra espacios-foto.json.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const esp = JSON.parse(readFileSync('/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e10-direcciones/espacios-foto.json', 'utf8'));
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const PAGS = { 'taller/home.html': 'Home', 'taller/acompanamiento-mensual.html': 'Acompañamiento', 'taller/trabajo.html': 'Trabajo', 'pizarra/home.html': 'Home', 'pizarra/acompanamiento-mensual.html': 'Acompañamiento', 'pizarra/trabajo.html': 'Trabajo' };
for (const w of [1440, 390]) for (const [u, pag] of Object.entries(PAGS)) {
  const dir = u.startsWith('taller') ? 'Taller' : 'Pizarra limpia';
  const H = w === 390 ? 844 : 900;
  const p = await (await b.newContext({ viewport: { width: w, height: H }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate((H) => {
    const top = (e) => e.getBoundingClientRect().top + scrollY;
    const mk = [...document.querySelectorAll('.mk')].map(e => ({ y: top(e), b: e.getBoundingClientRect().bottom + scrollY, t: e.textContent.trim(), fondo: getComputedStyle(e).backgroundImage.match(/marcador[^")]*/)?.[0], en: e.closest('a,button') ? 'CONTROL' : '' }));
    // máximo de marcadores enteros visibles en una ventana deslizante
    let max = 0; const alto = document.documentElement.scrollHeight;
    for (let y = 0; y < alto; y += 20) { const n = mk.filter(m => m.y >= y && m.b <= y + H).length; if (n > max) max = n; }
    const slots = [...document.querySelectorAll('[data-rotulo-foto]')].map(f => { const fig = f.closest('figure') || f.parentElement; const r = fig.getBoundingClientRect(); const img = fig.querySelector('img,.foto-slot__caja,div'); return { rot: f.textContent.trim().slice(0, 22), w: Math.round(r.width), h: Math.round(r.height - (f.closest('figure') ? 0 : 0)) }; });
    const slotBox = [...document.querySelectorAll('.foto-slot')].map(s => { const r = s.getBoundingClientRect(); return { rot: s.querySelector('[data-rotulo-foto]')?.textContent.trim().match(/F\d+/)?.[0], w: Math.round(r.width), h: Math.round(r.height), bordeDer: Math.round(r.right) >= document.documentElement.clientWidth - 1, bordeIzq: Math.round(r.left) <= 0 }; });
    const bandas = [...document.querySelectorAll('section, .banda, [class*="banda"]')].filter(s => { const c = getComputedStyle(s).backgroundColor; return c === 'rgb(238, 242, 110)'; }).length;
    const marcas = document.querySelectorAll('[class*="marca-"], img[src*="marca-"]').length;
    const sellos = document.querySelectorAll('.sello').length;
    const filetes = [...document.querySelectorAll('body *')].filter(e => { const cs = getComputedStyle(e, '::before'); const r = e.getBoundingClientRect(); return false; }).length;
    return { mk: mk.map(m => `${m.t.slice(0, 26)}${m.en}`), maxVista: max, slotBox, bandas, marcas, sellos };
  }, H);
  console.log(w, u, `marcador ${r.mk.length} (máx ${r.maxVista} a la vista) ${JSON.stringify(r.mk)} · bandas amarillas ${r.bandas} · marcas ${r.marcas} · sellos ${r.sellos}`);
  for (const s of r.slotBox) {
    const e = esp.find(x => x.id === s.rot && x.direccion === dir);
    const ok = e && e[`ancho_px_${w}`] === s.w && e[`alto_px_${w}`] === s.h;
    console.log(`     ${s.rot} ${s.w}×${s.h}${s.bordeDer ? ' a sangre der' : ''}${s.bordeIzq ? ' a sangre izq' : ''} · espacios-foto ${e ? e[`ancho_px_${w}`] + '×' + e[`alto_px_${w}`] : 'NO ESTÁ'} ${ok ? '✓' : '✗'}`);
  }
}
await b.close();
