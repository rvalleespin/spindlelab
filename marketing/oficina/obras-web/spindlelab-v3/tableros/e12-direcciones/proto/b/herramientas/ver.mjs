// Vista rápida mientras se construye: una ruta, un ancho, primera pantalla o página completa.
// node ver.mjs <url> <ancho> <alto> <salida.png> [completa] [scrollY]
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const [url, ancho, alto, salida, completa, scrollY] = process.argv.slice(2);
const n = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const movil = Number(ancho) < 834;
const p = await n.newPage({ viewport: { width: Number(ancho), height: Number(alto) }, deviceScaleFactor: movil ? 2 : 1, isMobile: movil, hasTouch: movil });
const errores = [];
p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
p.on('pageerror', (e) => errores.push(String(e)));
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
if (completa === 'completa') {
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(800);
}
if (scrollY) { await p.evaluate((y) => window.scrollTo(0, Number(y)), scrollY); await p.waitForTimeout(900); }
await p.waitForTimeout(500);
await p.screenshot({ path: salida, fullPage: completa === 'completa' });
const info = await p.evaluate(() => ({ alto: document.documentElement.scrollHeight, ancho: document.documentElement.scrollWidth,
  fuentes: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + ' ' + f.weight) }));
console.log(JSON.stringify(info), errores.length ? 'ERRORES: ' + errores.join(' | ') : '');
await n.close();
