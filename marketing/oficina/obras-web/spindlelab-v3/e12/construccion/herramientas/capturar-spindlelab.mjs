#!/usr/bin/env node
// La portada 5:3 de la entrada «spindlelab.cl» del índice (obra E12, tanda 2). Diego, 19-oct-2026.
//
// POR QUÉ. La spec §2.2 pone en el muro la captura del prototipo (proto/a/medios/spindlelab-53.webp: la portada de
// spindlelab.cl a 1440 del 17-oct). Esa portada es el video del hilo de oro, y la spec §6.8 (y la regla de la obra:
// «el hilo de oro solo en la portada de la home») no lo deja en un marco de trabajo ni en el índice. Las demás páginas
// del sitio publicado llevan el hilo (blog, contacto) o videos e imágenes de banco (método, servicios); /diagnostico/
// ya es la portada de «El chequeo de 21 señales». Queda /privacidad/: la página que dice qué hace el sitio con las
// cookies, que es lo que cuenta la bajada de la entrada. desvios.md, tanda 2.
//
// Cómo, igual que capturar-fuentes.mjs del prototipo: el sitio vivo, a 1440, primera pantalla, recortada a 5:3
// (1440 × 864) y pasada a WebP de 1050 × 630. Sin aceptar ni rechazar las cookies: el aviso queda abierto, como lo ve
// quien entra por primera vez.
// Uso: node capturar-spindlelab.mjs <salida.webp> [--url https://spindlelab.cl/privacidad/]
import { pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const REPO = execSync('git rev-parse --show-toplevel', { cwd: dirname(new URL(import.meta.url).pathname) }).toString().trim();
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const salida = process.argv[2];
const i = process.argv.indexOf('--url');
const URL_ = i > 0 ? process.argv[i + 1] : 'https://spindlelab.cl/privacidad/';
const png = salida.replace(/\.webp$/, '.png');

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await nav.newContext({ viewport: { width: 1440, height: 864 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const r = await p.goto(URL_, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(800);
await p.screenshot({ path: png });
await nav.close();
execSync(`python3 -I -c "from PIL import Image; Image.open('${png}').convert('RGB').resize((1050, 630), Image.LANCZOS).save('${salida}', 'WEBP', quality=82, method=6)"`);
const info = { de: [`captura de ${URL_} a 1440 × 864, sitio vivo, ${new Date().toISOString()} (capturar-spindlelab.mjs)`], http: r.status(), px: [1050, 630], bytes: statSync(salida).size };
writeFileSync(salida.replace(/\.webp$/, '.json'), JSON.stringify(info, null, 1) + '\n');
console.log(JSON.stringify(info));
