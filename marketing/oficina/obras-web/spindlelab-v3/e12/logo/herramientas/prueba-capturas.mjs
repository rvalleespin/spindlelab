// E12 · logo final · capturas de la prueba de la tortera, a dpr 1 y 2 (Bruno, 19-oct-2026).
// Uso: node prueba-capturas.mjs <dir-con-svg> <dir-salida> <variante> [<variante>...]
// Por variante (lee <variante>-signo.svg y <variante>-palabra.svg, blancos) deja en <dir-salida>/<variante>/:
//   signo-dpr1.png, signo-dpr2.png   el signo solo a 240, 48, 32 y 16 px de alto sobre #060606
//   signo-pixeles.png                el de 16 px (dpr 1 y 2) y el de 32 (dpr 1), ampliados con vecino más cercano
//   palabra-dpr1.png, palabra-dpr2.png   el logo a 120 px y a 24, 16 y 12 px sobre #060606
//   palabra-blanco-dpr1.png          el logo a 24, 16 y 12 px en #060606 sobre blanco
// Chromium 141 de Playwright (el de spindlelab-astro), todo file://.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [dirSvg, dirOut, ...variantes] = process.argv.slice(2);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const errores = [];
async function captura(html, destino, w, h, dpr) {
  const tmp = path.join(dirOut, '_tmp.html');
  fs.writeFileSync(tmp, html);
  const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  p.on('requestfailed', r => errores.push('no cargó ' + r.url()));
  await p.goto(pathToFileURL(tmp).href);
  await p.waitForTimeout(150);
  await p.screenshot({ path: destino });
  await p.close();
  fs.unlinkSync(tmp);
}
const css = (fondo) => `<style>html,body{margin:0;background:${fondo}}body{display:flex;align-items:flex-end;gap:40px;padding:40px;box-sizing:border-box;height:100vh}img{display:block}.col{display:flex;flex-direction:column;gap:18px;align-items:flex-start}</style>`;
for (const v of variantes) {
  const d = path.join(dirOut, v); fs.mkdirSync(d, { recursive: true });
  const s = pathToFileURL(path.join(dirSvg, `${v}-signo.svg`)).href;
  const p = pathToFileURL(path.join(dirSvg, `${v}-palabra.svg`)).href;
  const signo = `<!doctype html>${css('#060606')}<img src="${s}" style="height:240px"><img src="${s}" style="height:48px"><img src="${s}" style="height:32px"><img src="${s}" style="height:16px">`;
  for (const dpr of [1, 2]) await captura(signo, path.join(d, `signo-dpr${dpr}.png`), 560, 320, dpr);
  // los píxeles: cada tamaño en su ventana justa, y después ampliado sin suavizar
  for (const [alto, dpr] of [[16, 1], [16, 2], [32, 1]]) {
    await captura(`<!doctype html><style>html,body{margin:0;background:#060606}img{display:block;height:${alto}px;margin:4px auto}</style><img src="${s}">`, path.join(d, `_s${alto}x${dpr}.png`), 24 + alto, alto + 8, dpr);
  }
  const ampl = `<!doctype html><style>html,body{margin:0;background:#060606}body{display:flex;gap:40px;padding:30px;align-items:flex-end}img{image-rendering:pixelated;display:block}</style>`
    + `<img src="_s16x1.png" style="width:${40 * 8}px"><img src="_s16x2.png" style="width:${80 * 4}px"><img src="_s32x1.png" style="width:${56 * 6}px">`;
  fs.writeFileSync(path.join(d, '_ampl.html'), ampl);
  const pg = await nav.newPage({ viewport: { width: 1140, height: 380 }, deviceScaleFactor: 1 });
  await pg.goto(pathToFileURL(path.join(d, '_ampl.html')).href); await pg.waitForTimeout(150);
  await pg.screenshot({ path: path.join(d, 'signo-pixeles.png') }); await pg.close();
  for (const f of ['_ampl.html', '_s16x1.png', '_s16x2.png', '_s32x1.png']) fs.unlinkSync(path.join(d, f));
  const pal = (fondo, grande) => `<!doctype html>${css(fondo)}${grande ? `<img src="${p}" style="height:120px">` : ''}<div class="col"><img src="${p}" style="height:24px;${fondo === '#fff' ? 'filter:invert(1)' : ''}"><img src="${p}" style="height:16px;${fondo === '#fff' ? 'filter:invert(1)' : ''}"><img src="${p}" style="height:12px;${fondo === '#fff' ? 'filter:invert(1)' : ''}"></div>`;
  for (const dpr of [1, 2]) await captura(pal('#060606', true), path.join(d, `palabra-dpr${dpr}.png`), 1080, 220, dpr);
  await captura(pal('#fff', false), path.join(d, 'palabra-blanco-dpr1.png'), 320, 150, 1);
}
await nav.close();
if (errores.length) { console.error(errores); process.exit(1); }
console.log('capturas:', variantes.join(', '));
