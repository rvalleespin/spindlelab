// E13 · logo opción 2 · capturas para la lectura fría, a dpr 1 y 2 (Bruno, 30-oct-2026). Sigue a prueba-capturas.mjs
// de E12, con cada pieza en el corte que le toca a cada tamaño (el que se va a ver de verdad).
// Uso: node lectura-capturas.mjs <dir-logo> <dir-salida>
// Deja en <dir-salida>/nuevo/ (lo entregado) y <dir-salida>/maqueta/ (la del 30-oct, solo el logo):
//   signo-dpr1.png, signo-dpr2.png   el signo a 240 px (signo-blanco.svg) y el favicon a 48, 32 y 16 px
//   signo-pixeles.png                favicon-16.png ×8 y favicon-32.png ×4, sin suavizar
//   palabra-dpr1.png, palabra-dpr2.png   el corte grande a 120 px, el menú a 24 y el pequeño a 16 y 12, sobre #060606
//   palabra-blanco-dpr1.png          el menú a 24 y el pequeño a 16 y 12, en #060606 sobre blanco
// Chromium 141 de Playwright (el de spindlelab-astro), todo file://.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const L = path.resolve(process.argv[2]);
const OUT = path.resolve(process.argv[3]);
const V = path.join(L, 'prueba-disco', 'variantes');
const u = (f) => pathToFileURL(f).href;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const errores = [];
async function captura(html, destino, w, h, dpr) {
  const tmp = path.join(path.dirname(destino), '_tmp.html');
  fs.writeFileSync(tmp, html);
  const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  p.on('requestfailed', r => errores.push('no cargó ' + r.url()));
  await p.goto(u(tmp));
  await p.waitForTimeout(150);
  await p.screenshot({ path: destino });
  await p.close();
  fs.unlinkSync(tmp);
}
const css = (fondo) => `<style>html,body{margin:0;background:${fondo}}body{display:flex;align-items:flex-end;gap:40px;padding:40px;box-sizing:border-box;height:100vh}img{display:block}.col{display:flex;flex-direction:column;gap:18px;align-items:flex-start}.px{image-rendering:pixelated}</style>`;

const juegos = {
  // lo entregado, en la misma caja que la maqueta (el mismo `d` que logo-*-blanco.svg: comprobado), así la letra mide igual
  nuevo: { grande: path.join(V, 'grande--elegido-grande-blanco.svg'), menu: path.join(V, 'menu--elegido-menu-blanco.svg'), pequeno: path.join(V, 'pequeno--elegido-pequeno-blanco.svg'),
    gN: path.join(V, 'grande--elegido-grande-negro.svg'), mN: path.join(V, 'menu--elegido-menu-negro.svg'), pN: path.join(V, 'pequeno--elegido-pequeno-negro.svg'), signo: true },
  // la maqueta: la misma «i» (rx 17, ry 6,5) en los tres cortes, cada uno en su letra; en la caja del sitio
  maqueta: { grande: path.join(V, 'grande--maqueta-blanco.svg'), menu: path.join(V, 'menu--maqueta-blanco.svg'), pequeno: path.join(V, 'pequeno--maqueta-blanco.svg'),
    gN: path.join(V, 'grande--maqueta-negro.svg'), mN: path.join(V, 'menu--maqueta-negro.svg'), pN: path.join(V, 'pequeno--maqueta-negro.svg'), signo: false },
};
for (const [k, J] of Object.entries(juegos)) {
  const d = path.join(OUT, k); fs.mkdirSync(d, { recursive: true });
  if (J.signo) {
    const s = u(path.join(L, 'signo-blanco.svg'));
    const f = (n) => u(path.join(L, n));
    // a dpr 1, los PNG del favicon a su tamaño; a dpr 2, favicon.svg (el navegador lo pinta al doble)
    await captura(`<!doctype html>${css('#060606')}<img src="${s}" style="height:240px"><img src="${f('favicon-48.png')}" style="width:48px"><img src="${f('favicon-32.png')}" style="width:32px"><img src="${f('favicon-16.png')}" style="width:16px">`, path.join(d, 'signo-dpr1.png'), 560, 320, 1);
    await captura(`<!doctype html>${css('#060606')}<img src="${s}" style="height:240px"><img src="${f('favicon.svg')}" style="width:48px"><img src="${f('favicon.svg')}" style="width:32px"><img src="${f('favicon.svg')}" style="width:16px">`, path.join(d, 'signo-dpr2.png'), 560, 320, 2);
    await captura(`<!doctype html>${css('#060606')}<img class="px" src="${f('favicon-16.png')}" style="width:128px"><img class="px" src="${f('favicon-32.png')}" style="width:128px">`, path.join(d, 'signo-pixeles.png'), 420, 220, 1);
  }
  const img = (f, alto) => `<img src="${u(f)}" style="height:${alto}px">`;
  const pal = `<!doctype html>${css('#060606')}${img(J.grande, 120)}<div class="col">${img(J.menu, 24)}${img(J.pequeno, 16)}${img(J.pequeno, 12)}</div>`;
  for (const dpr of [1, 2]) await captura(pal, path.join(d, `palabra-dpr${dpr}.png`), 1080, 220, dpr);
  await captura(`<!doctype html>${css('#fff')}<div class="col">${img(J.mN, 24)}${img(J.pN, 16)}${img(J.pN, 12)}</div>`, path.join(d, 'palabra-blanco-dpr1.png'), 320, 150, 1);
}
await nav.close();
if (errores.length) { console.error(errores); process.exit(1); }
console.log('capturas en', OUT);
