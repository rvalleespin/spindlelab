// Ronda 4 · «pisa» del barrido (titular del hero contra el ojillo «Estás pagando…», a partir de 1024 en las dos
// direcciones; el mismo valor que en la ronda 3). ¿Se tocan las letras o solo las cajas de línea? Mide la TINTA:
// captura de la franja con solo el ojillo visible y con solo el h1 visible, y busca píxeles de tinta en común.
// Uso: node ojillo4.mjs <carpeta-capturas>   (proto/ en 8770)
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const CAPS = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const util = await (await b.newContext()).newPage();
for (const d of ['taller', 'pizarra']) for (const w of [1024, 1280, 1440, 1920]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 1000 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(`http://127.0.0.1:8770/${d}/home.html`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const g = await p.evaluate(() => { const o = document.querySelector('.d-titular .d-ojillo').getBoundingClientRect(), h = document.querySelector('#h1').getBoundingClientRect(); return { y0: Math.floor(Math.min(o.top, h.top)) - 10, y1: Math.ceil(Math.max(o.bottom, h.bottom)) + 10, ob: o.bottom, ht: h.top, cw: document.documentElement.clientWidth }; });
  const clip = { x: 0, y: Math.max(0, g.y0), width: g.cw, height: g.y1 - g.y0 };
  const tomar = async (css) => { const s = await p.addStyleTag({ content: css }); const png = await p.screenshot({ clip }); await s.evaluate((n) => n.remove()); return png.toString('base64'); };
  const ambos = await p.screenshot({ clip });
  const soloOj = await tomar('#h1, #h1 * { visibility: hidden !important } #h1::before, #h1::after { visibility: hidden !important }');
  const soloH1 = await tomar('.d-titular .d-ojillo { visibility: hidden !important }');
  const nada = await tomar('#h1, #h1 *, .d-titular .d-ojillo { visibility: hidden !important } #h1::before, #h1::after { visibility: hidden !important }');
  if (CAPS && (w === 1024 || w === 1440)) writeFileSync(`${CAPS}/ojillo-${d}-${w}.png`, ambos);
  const r = await util.evaluate(async ([A, B, N]) => {
    const carga = async (s) => { const im = new Image(); im.src = 'data:image/png;base64,' + s; await im.decode(); const c = new OffscreenCanvas(im.width, im.height); const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height).data; };
    const a = await carga(A), bb = await carga(B), n = await carga(N);
    const tinta = (q, i) => Math.abs(q[i] - n[i]) + Math.abs(q[i + 1] - n[i + 1]) + Math.abs(q[i + 2] - n[i + 2]) > 60;
    let comun = 0, oj = 0, h1 = 0, ojY1 = -1, h1Y0 = 1e9; const W = 0;
    for (let i = 0; i < a.length; i += 4) { const ta = tinta(a, i), tb = tinta(bb, i); if (ta) oj++; if (tb) h1++; if (ta && tb) comun++; }
    return { comun, oj, h1 };
  }, [soloOj, soloH1, nada]);
  // separación vertical de la tinta: última fila con tinta del ojillo y primera del h1
  const filas = await util.evaluate(async ([A, B, N, W]) => {
    const carga = async (s) => { const im = new Image(); im.src = 'data:image/png;base64,' + s; await im.decode(); const c = new OffscreenCanvas(im.width, im.height); const x = c.getContext('2d'); x.drawImage(im, 0, 0); return [x.getImageData(0, 0, im.width, im.height).data, im.width, im.height]; };
    const [a, w, h] = await carga(A), [bb] = await carga(B), [n] = await carga(N);
    const t = (q, i) => Math.abs(q[i] - n[i]) + Math.abs(q[i + 1] - n[i + 1]) + Math.abs(q[i + 2] - n[i + 2]) > 60;
    let ojY1 = -1, h1Y0 = 1e9;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; if (t(a, i)) ojY1 = Math.max(ojY1, y); if (t(bb, i)) h1Y0 = Math.min(h1Y0, y); }
    return { ojY1, h1Y0 };
  }, [soloOj, soloH1, nada, g.cw]);
  console.log(`${d} ${w}: cajas ojillo hasta y ${g.ob.toFixed(1)}, h1 desde ${g.ht.toFixed(1)} · tinta: ojillo ${r.oj} px, h1 ${r.h1} px, en común ${r.comun} px · última fila de tinta del ojillo ${filas.ojY1}, primera del h1 ${filas.h1Y0} → aire ${filas.h1Y0 - filas.ojY1 - 1} px`);
  await p.context().close();
}
await b.close();
