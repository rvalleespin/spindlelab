#!/usr/bin/env node
// Qué corte del logo de Bruno (e13/logo/) va en las imágenes al compartir. Diego, 30-oct-2026.
// Pinta el logo en cuatro tarjetas de 1200 × 630 vistas a la mitad (600 × 315, más o menos lo que muestra un feed como
// LinkedIn): el corte grande a 50,4 px, el menú en el viewBox de Logo.astro a 56 y a 39 (lo que decía la spec §5.4) y el
// menú en su caja justa a 50,4 (lo elegido en og-30oct.mjs). Se mira, no se mide: el grande, a la mitad, se lee «Spīndle».
// Uso: node og-logo-corte.mjs <carpeta de salida>   → <salida>/comparar.html y comparar.png
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const salida = process.argv[2];
if (!salida) { console.error('Uso: node og-logo-corte.mjs <carpeta de salida>'); process.exit(2); }
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const L = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e13/logo');
const leer = (n) => readFileSync(join(L, n), 'utf8');
const filas = [
  ['grande a 50,4 (caja justa)', leer('logo-grande-blanco.svg'), 50.4],
  ['menú (viewBox Logo.astro) a 56', leer('logo-menu-linea.svg'), 56],
  ['menú (viewBox Logo.astro) a 39', leer('logo-menu-linea.svg'), 39],
  ['menú caja justa a 50,4', leer('logo-menu-blanco.svg'), 50.4],
];
const html = `<!doctype html><html><head><style>body{margin:0;background:#060606;color:#989898;font:14px monospace}
.f{display:flex;gap:40px;align-items:flex-start;padding:16px}
.c{width:600px;height:315px;position:relative;background:#060606;outline:1px solid #333}
.c .l{position:absolute;left:32px;top:32px;color:#fff}
.c svg{display:block;width:auto}
.c svg path,.c svg ellipse{fill:#fff}
</style></head><body>${filas.map(([n, s, h]) => `<div class="f"><div class="c"><div class="l">${s.replace('<svg', `<svg style="height:${h / 2}px"`)}</div></div><div>${n}<br>(a la mitad, como se ve en LinkedIn)</div></div>`).join('')}</body></html>`;
writeFileSync(join(salida, 'comparar.html'), html);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: 1 });
await p.goto(pathToFileURL(join(salida, 'comparar.html')).href);
await p.screenshot({ path: join(salida, 'comparar.png'), fullPage: true });
await b.close();
console.log(join(salida, 'comparar.png'));
