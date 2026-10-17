// Tonela · exporta el pliego, las placas y las portadas al doble, con Playwright (viewport exacto).
// Uso: node identidad.mjs http://127.0.0.1:PUERTO   (el servidor sirve la carpeta 04-tonela/)
// Después: ffmpeg baja el pliego a 1920 × 1080 (lo hace este mismo script).
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const base = process.argv[2];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const raiz = path.resolve(aqui, '..', 'identidad');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const terceros = new Set();

async function foto(ruta, w, h, salida) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) terceros.add(r.url()); });
  page.on('pageerror', (e) => console.log('error:', ruta, e.message));
  await page.goto(base + ruta, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const faltan = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family));
  if (faltan.length) console.log('fuentes con error en', ruta, faltan);
  await page.waitForTimeout(250);
  await page.screenshot({ path: salida });
  await ctx.close();
  console.log('ok', path.relative(raiz, salida));
}

await foto('/identidad/pliego.html', 1057, 595, path.join(raiz, 'pliego.png'));

const placas = [
  ['codigo', 1057, 595], ['logo', 1057, 595], ['tabla', 1057, 595],
  ['eslinga-2', 525, 656], ['eslinga-5', 525, 656], ['letra', 525, 656],
  ['stencil', 525, 324], ['barlow', 525, 324], ['registro', 525, 324], ['rotulo', 525, 324],
];
const forma = (w, h) => (w === 1057 ? '16x9' : h === 656 ? '4x5' : '1-62');
for (const [id, w, h] of placas) {
  for (const f of ['lienzo', 'tinta']) {
    await foto(`/identidad/placas/placas.html?p=${id}&f=${f}`, w, h, path.join(raiz, 'placas', `${forma(w, h)}-${id}-${f}.png`));
  }
}

for (const [id, h] of [['4x5', 656], ['4x3', 394], ['5x3', 315]]) {
  await foto(`/identidad/portadas/portadas.html?p=${id}`, 525, h, path.join(raiz, 'portadas', `portada-${id}.png`));
}
await browser.close();

execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(raiz, 'pliego.png'), '-vf', 'scale=1920:1080:flags=lanczos', path.join(raiz, 'pliego-1920.png')]);
console.log('ok pliego-1920.png');
console.log(terceros.size ? 'PETICIONES A TERCEROS: ' + [...terceros].join(', ') : 'Cero peticiones a terceros.');
