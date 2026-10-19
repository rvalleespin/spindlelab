#!/usr/bin/env node
// Los techos de campo de la spec §3.4, sobre el build: /v3/servicios/ y sus seis (obra E12, tanda 4). Diego, 19-oct-2026.
// Es campos-tanda-3.mjs con las rutas de los servicios (spec §3.4: «Interiores», ≤ 5 % y la franja nunca un campo).
//
// Saca, como la herramienta del prototipo (proto/a/herramientas/render.mjs), la captura de página completa a 1440 y
// las cajas de cada medio (.medio) de la home y de /v3/trabajo/, con movimiento reducido (los videos quietos en su
// póster). Después: python3 -I proto/a/herramientas/campos.py <carpeta> <salida.json> cuenta los campos con la regla
// del lock §20.1. La cinta cambia de pieza cada 2 s: campos-cinta.py mide además cada tramo (el más claro manda).
// Las capturas de página completa no van al repo (pesan y se rehacen en un minuto); sí sus .json y lo que miden.
// Uso: node campos-tanda-4.mjs <carpeta-salida>
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const DIST = join(REPO, 'spindlelab-astro', 'dist');
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const SALIDA = process.argv[2];
mkdirSync(SALIDA, { recursive: true });
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f));
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [vista, ruta] of [['servicios', '/v3/servicios/'], ...['desarrollo-web', 'visibilidad-en-ia', 'auditoria-seo-tecnica', 'acompanamiento-mensual', 'redes-sociales', 'paid-media'].map((c) => [c, `/v3/servicios/${c}/`])]) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:${servidor.address().port}${ruta}`, { waitUntil: 'networkidle' });
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(600);
  const medios = await p.$$eval('.medio', (ms) => ms.map((m) => {
    const r = m.getBoundingClientRect();
    return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)];
  }).filter((c) => c[2] > 0 && c[3] > 0));
  const cinta = await p.$$eval('.cinta-s .medio', (ms) => ms.map((m) => { const r = m.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; }));
  await p.screenshot({ path: join(SALIDA, `a-${vista}-1440-completa.png`), fullPage: true });
  writeFileSync(join(SALIDA, `a-${vista}-1440-completa.json`), JSON.stringify({ ruta, medios, cinta }, null, 1));
  console.log(vista, medios.length, 'medios');
  await ctx.close();
}
await nav.close();
servidor.close();
