// Ronda 4 · F1, F5 y F7: el tamaño real de su espacio (getBoundingClientRect del [data-foto]) en cada ancho, en px css,
// y lo que pide a dpr 2 (×2, sin redondear el css). Para contrastar con el lock §7 («Tamaño de archivo por tramo»),
// con espacios-foto.json (1440 y 390) y con pauta.json (css_1440, css_390, css_1023). proto/ en 8770.
// Uso: node fotos4.mjs <salida.json>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
const T = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e10-direcciones';
const ESP = JSON.parse(readFileSync(`${T}/espacios-foto.json`, 'utf8'));
const PAUTA = JSON.parse(readFileSync('/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/e10/fotos/pauta.json', 'utf8'));
const DONDE = { F1: 'taller/home.html', F5: 'pizarra/home.html', F7: 'pizarra/acompanamiento-mensual.html' };
const ANCHOS = [360, 390, 599, 600, 768, 1000, 1023, 1024, 1280, 1440, 1920];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const res = {};
for (const [id, u] of Object.entries(DONDE)) {
  res[id] = {};
  for (const w of ANCHOS) {
    const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
    await p.goto(`http://127.0.0.1:8770/${u}`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate((id) => { const e = document.querySelector(`[data-foto="${id}"]`); const q = e.getBoundingClientRect(); return { w: q.width, h: q.height, cw: document.documentElement.clientWidth }; }, id);
    res[id][w] = { css: [+r.w.toFixed(2), +r.h.toFixed(2)], dpr2: [Math.round(r.w * 2), Math.round(r.h * 2)], proporcion: +(r.w / r.h).toFixed(4), aSangre: Math.round(r.w) === r.cw };
    await p.context().close();
  }
  const e = ESP.find((x) => x.id === id), f = PAUTA.fotos.find((x) => x.id === id);
  console.log(`${id} (${u})`);
  for (const w of ANCHOS) console.log(`   ${String(w).padStart(4)}: css ${res[id][w].css.join('×')} (${res[id][w].proporcion}${res[id][w].aSangre ? ', a todo el ancho' : ''}) → dpr 2: ${res[id][w].dpr2.join('×')}`);
  const m = (w) => res[id][w].css.map(Math.round).join('×');
  console.log(`   espacios-foto.json: 1440 ${e.ancho_px_1440}×${e.alto_px_1440} (medido ${m(1440)}) · 390 ${e.ancho_px_390}×${e.alto_px_390} (medido ${m(390)}) · tableta: ${'ancho_px_1023' in e ? e.ancho_px_1023 + '×' + e.alto_px_1023 : 'no la trae'}`);
  console.log(`   pauta.json: css_1440 ${f.espacio.css_1440.join('×')} · css_390 ${f.espacio.css_390.join('×')} · css_1023 ${f.espacio.css_1023 ? f.espacio.css_1023.join('×') : '—'} (medido a 1023: ${m(1023)})`);
}
writeFileSync(process.argv[2], JSON.stringify(res, null, 1));
await b.close();
