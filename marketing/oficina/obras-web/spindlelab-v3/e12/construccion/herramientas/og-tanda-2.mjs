#!/usr/bin/env node
// Las imágenes al compartir de la home y de /v3/trabajo/ (senales-obra.md §1.6; spec §3.3, fila «Imágenes al compartir»).
// Diego, 19-oct-2026 (tanda 2). HTML renderizado con Chromium en la letra y el negro de A, nada generado, sin el hilo de oro.
//   · og-e12-marca.jpg (/): el logo final de El huso (corte grande, desde 40 px), el rótulo «Estudio de diseño y
//     tecnología» y el h1 del hero 3, sobre #060606. El texto, de Clara (src/data/archivo/texto/home.json).
//   · og-e12-trabajo.jpg (/trabajo/): tres piezas reales: la portada del sitio de fotografía de Combeau, la captura de
//     Praxi con sus reglas y la portada 5:3 de Sesenta, la más grande, para que su «CONCEPTO» se lea en la tarjeta.
// 1200 × 630, JPEG, ≤ 200 kB (el Layout declara image/jpeg). Escribe en spindlelab-astro/public/assets/img/.
// Uso: node og-tanda-2.mjs
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const OBRA = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const f = (p) => pathToFileURL(p).href;
const home = JSON.parse(readFileSync(join(ASTRO, 'src/data/archivo/texto/home.json'), 'utf8')).texto;
const el = (id) => home.secciones.flatMap((s) => s.elementos).find((e) => e.id === id);
const logo = readFileSync(join(OBRA, 'e12/logo/final/logo-grande-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');

const base = `
@font-face { font-family: 'GSF'; src: url('${f(join(ASTRO, 'public/fonts/google-sans-flex-latin.woff2'))}') format('woff2'); font-weight: 100 1000; font-stretch: 25% 151%; }
@font-face { font-family: 'DMM'; src: url('${f(join(ASTRO, 'public/fonts/dm-mono-500-latin.woff2'))}') format('woff2'); font-weight: 500; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
body { font-family: 'GSF'; color: #989898; -webkit-font-smoothing: antialiased; }
.logo svg { display: block; width: auto; }
.logo svg path, .logo svg g { fill: #ffffff; }
.rotulo { font-family: 'DMM'; font-weight: 500; text-transform: uppercase; letter-spacing: 0.03em; line-height: 1.25; color: #989898; }
.tinta { color: #ffffff; }
img { display: block; border-radius: 6px; object-fit: cover; }
`;
const marca = `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${base}
.caja { position: absolute; inset: 64px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { height: 56px; }
.rotulo { font-size: 18px; margin-bottom: 24px; }
h1 { font-weight: 300; font-stretch: 76%; font-size: 64px; line-height: 1; letter-spacing: -0.01em; color: #989898; max-width: 1072px; text-wrap: balance; }
</style></head><body><div class="caja"><div class="logo">${logo}</div><div>
<p class="rotulo">${el('home.portada.rotulo').texto}</p>
<h1><span class="tinta">${el('home.portada.h1').tinta}</span> ${el('home.portada.h1').gris}</h1></div></div></body></html>`;

const M = join(ASTRO, 'public/v3/medios');
const P = join(OBRA, 'tableros/e12-direcciones/proto/a/medios');
const trabajo = `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${base}
.caja { position: absolute; inset: 48px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { height: 40px; }
.fila { display: flex; gap: 8px; align-items: flex-end; }
.col { display: flex; flex-direction: column; gap: 8px; }
.col img { width: 376px; height: 211px; }
.grande { width: 720px; height: 432px; }
</style></head><body><div class="caja"><div class="logo">${logo}</div>
<div class="fila"><div class="col"><img src="${f(join(M, 'combeau-fotografia-169.webp'))}"><img src="${f(join(P, 'praxi-reglas-169.webp'))}"></div>
<img class="grande" src="${f(join(P, 'sesenta-53.webp'))}"></div></div></body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
for (const [nombre, html] of [['og-e12-marca', marca], ['og-e12-trabajo', trabajo]]) {
  const h = join(dir, `${nombre}.html`);
  writeFileSync(h, html);
  const ctx = await nav.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(f(h), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const png = join(dir, `${nombre}.png`);
  await p.screenshot({ path: png });
  await ctx.close();
  const jpg = join(ASTRO, 'public/assets/img', `${nombre}.jpg`);
  execSync(`python3 -I -c "from PIL import Image; Image.open('${png}').convert('RGB').save('${jpg}', 'JPEG', quality=86, optimize=True, progressive=True)"`);
  console.log(nombre, statSync(jpg).size, 'bytes');
}
await nav.close();
