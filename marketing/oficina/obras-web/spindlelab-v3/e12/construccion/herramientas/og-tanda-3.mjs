#!/usr/bin/env node
// Las imágenes al compartir de las seis páginas de caso (senales-obra.md §1.3 y §1.6; spec §3.3, «Imágenes al
// compartir»). Diego, 19-oct-2026 (tanda 3). HTML renderizado con Chromium en el negro de A, con el logo final de El
// huso (corte grande), nada generado y sin el hilo de oro. La misma composición que og-tanda-2.mjs: el logo arriba y la
// pieza abajo, plana en su marco con radio 6.
//   · og-e12-praxi.jpg: praxi-reglas-169 (de praxi/capturas/landing-1440-sec09.jpg): sin personas generadas ni cifras
//     de ejemplo (§1.3, regla 3).
//   · og-e12-combeau.jpg: combeau-fotografia-169, de casos/combeau/medios/ (§1.3, regla 2: sin sus medidas).
//   · og-e12-<concepto>.jpg: la portada 5:3 de cada pieza (marketing/portafolio/0N-*/identidad/portadas/), entera: su
//     «CONCEPTO» queda a la vista dentro de la imagen (§1.3, regla 1).
// 1200 × 630, JPEG, ≤ 200 kB. Escribe en spindlelab-astro/public/assets/img/. Uso: node og-tanda-3.mjs
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const OBRA = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3');
const PORT = join(REPO, 'marketing/portafolio');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const f = (p) => pathToFileURL(p).href;
const logo = readFileSync(join(OBRA, 'e12/logo/final/logo-grande-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');
const T = join(ASTRO, 'public/v3/trabajo');

const PIEZAS = [
  ['og-e12-praxi', join(T, 'praxi/praxi-reglas-169.webp'), 16 / 9],
  ['og-e12-combeau', join(T, 'combeau/combeau-fotografia-169.webp'), 16 / 9],
  ['og-e12-tonela', join(PORT, '04-tonela/identidad/portadas/portada-5x3.png'), 5 / 3],
  ['og-e12-ocelo', join(PORT, '05-ocelo/identidad/portadas/ocelo-53.png'), 5 / 3],
  ['og-e12-sesenta', join(PORT, '06-sesenta/identidad/portadas/sesenta-5x3.png'), 5 / 3],
  ['og-e12-doceavo', join(PORT, '07-doceavo/identidad/portadas/portada-53.png'), 5 / 3],
];

const html = (img, prop) => `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
.caja { position: absolute; inset: 48px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { display: block; height: 40px; width: auto; }
.logo svg path, .logo svg g { fill: #ffffff; }
img { display: block; height: 446px; width: ${Math.round(446 * prop)}px; border-radius: 6px; object-fit: cover; }
</style></head><body><div class="caja"><div class="logo">${logo}</div><img src="${f(img)}"></div></body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
for (const [nombre, img, prop] of PIEZAS) {
  const h = join(dir, `${nombre}.html`);
  writeFileSync(h, html(img, prop));
  const ctx = await nav.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(f(h), { waitUntil: 'load' });
  await p.waitForTimeout(300);
  const png = join(dir, `${nombre}.png`);
  await p.screenshot({ path: png });
  await ctx.close();
  const jpg = join(ASTRO, 'public/assets/img', `${nombre}.jpg`);
  execSync(`python3 -I -c "from PIL import Image; Image.open('${png}').convert('RGB').save('${jpg}', 'JPEG', quality=86, optimize=True, progressive=True)"`);
  console.log(nombre, statSync(jpg).size, 'bytes');
}
await nav.close();
