#!/usr/bin/env node
// La imagen al compartir de /v3/trabajo/ para la obra E13 (og-e12-trabajo.jpg, ?v=2). Diego.
// Mismo método que e12/construccion/herramientas/og-tanda-2.mjs (HTML renderizado con Chrome, el logo final de El huso en
// el negro de A, nada generado, sin el hilo de oro), con las dos entradas que quedan en el índice:
//   · la portada del sitio de fotografía de Combeau (public/v3/medios/combeau-fotografia-169.webp), sin sus medidas, y
//   · la sección «Las 12 cosas que tu sitio tiene que dejar publicadas» de Verifica y Cumple
//     (public/v3/medios/verifica-y-cumple-12-169.webp), que no lleva la persona generada de su portada: una tarjeta viaja
//     sola, sin el aviso que la acompaña en la página (senales-obra.md §1.3, regla 3, por analogía con Praxi).
// Las dos capturas son 16:9 y se recortan a los lados al marco de 548 × 446 (el alto entero, como en og-tanda-3.mjs); lo que
// dice cada una queda en el centro. 1200 × 630, JPEG ≤ 200 kB (el Layout declara image/jpeg). Escribe en spindlelab-astro/public/assets/img/.
// Chrome y PIL salen del Mac: el Chrome instalado y python3 con Pillow (sin -I, que desactiva el site-packages del usuario).
// Uso: node og-trabajo.mjs <ruta a un node_modules con playwright>/playwright/index.mjs
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const OBRA = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3');
const playwright = process.argv[2];
if (!playwright) { console.error('Uso: node og-trabajo.mjs <ruta a playwright/index.mjs>'); process.exit(2); }
const { chromium } = await import(pathToFileURL(playwright).href);
const f = (p) => pathToFileURL(p).href;
const logo = readFileSync(join(OBRA, 'e12/logo/final/logo-grande-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');
const M = join(ASTRO, 'public/v3/medios');

const html = `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
.caja { position: absolute; inset: 48px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { display: block; height: 40px; width: auto; }
.logo svg path, .logo svg g { fill: #ffffff; }
.fila { display: flex; gap: 8px; align-items: flex-end; }
img { display: block; width: 548px; height: 446px; border-radius: 6px; object-fit: cover; }
</style></head><body><div class="caja"><div class="logo">${logo}</div>
<div class="fila"><img src="${f(join(M, 'combeau-fotografia-169.webp'))}"><img src="${f(join(M, 'verifica-y-cumple-12-169.webp'))}"></div></div></body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--allow-file-access-from-files'] });
const h = join(dir, 'og-e12-trabajo.html');
writeFileSync(h, html);
const ctx = await nav.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(f(h), { waitUntil: 'load' });
await p.waitForTimeout(400);
const png = join(dir, 'og-e12-trabajo.png');
await p.screenshot({ path: png });
await ctx.close();
await nav.close();
const jpg = join(ASTRO, 'public/assets/img/og-e12-trabajo.jpg');
execSync(`python3 -c "from PIL import Image; Image.open('${png}').convert('RGB').save('${jpg}', 'JPEG', quality=86, optimize=True, progressive=True)"`);
console.log('og-e12-trabajo', statSync(jpg).size, 'bytes');
