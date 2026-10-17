// Capturas de la dirección B para la compuerta 2. Lucía, 17-oct-2026.
// Cada vista a 1440 (dpr 1) y a 390 (dpr 2): primera pantalla (1440 × 900, 390 × 844) y página completa
// en tramos de 4000 px de imagen como máximo, JPEG calidad 82, en ../../../img/b-*.jpg.
// Antes de capturar se recorre la página entera para que cada bloque llegue a su estado final.
// Uso: node capturar.mjs <base>
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const IMG = path.resolve(AQUI, '../../../img');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.argv[2];
const VISTAS = [['home', ''], ['trabajo', 'trabajo/'], ['praxi', 'trabajo/praxi/'], ['sesenta', 'trabajo/sesenta/'], ['desarrollo-web', 'servicios/desarrollo-web/']];
fs.mkdirSync(IMG, { recursive: true });
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const hechas = [];

async function preparar(p, ruta) {
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 450) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)); }
    window.scrollTo(0, 0);
  });
  // Los videos quedan en su póster, quietos, para que la captura sea la misma cada vez.
  await p.evaluate(() => document.querySelectorAll('video').forEach((v) => { v.pause(); try { v.currentTime = 0; } catch (e) {} }));
  await p.waitForTimeout(900);
}

for (const [nombre, ruta] of VISTAS) {
  for (const [ancho, alto, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
    const p = await nav.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: dpr, isMobile: ancho < 834, hasTouch: ancho < 834 });
    await preparar(p, ruta);
    const primera = path.join(IMG, `b-${nombre}-${ancho}-primera.jpg`);
    await p.screenshot({ path: primera, type: 'jpeg', quality: 82 });
    hechas.push(path.basename(primera));
    const altoTotal = await p.evaluate(() => document.documentElement.scrollHeight);
    const tramo = Math.floor(4000 / dpr);
    const n = Math.ceil(altoTotal / tramo);
    for (let i = 0; i < n; i++) {
      const y = i * tramo;
      const h = Math.min(tramo, altoTotal - y);
      const archivo = path.join(IMG, `b-${nombre}-${ancho}-${i + 1}de${n}.jpg`);
      await p.screenshot({ path: archivo, type: 'jpeg', quality: 82, fullPage: true, clip: { x: 0, y, width: ancho, height: h } });
      hechas.push(path.basename(archivo));
    }
    await p.close();
  }
}

// Dos estados que la página completa no muestra: el índice con el mouse sobre un concepto, y el chequeo corrido.
{
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 } });
  await preparar(p, 'trabajo/');
  await p.evaluate(() => window.scrollTo(0, 360));
  await p.mouse.move(700, 120);
  const fila = p.locator('tr[data-nombre="Tonela"]');
  await fila.scrollIntoViewIfNeeded();
  const c = await fila.boundingBox();
  await p.mouse.move(c.x + 260, c.y + 40, { steps: 10 });
  await p.waitForTimeout(1600);
  await p.screenshot({ path: path.join(IMG, 'b-trabajo-1440-visor.jpg'), type: 'jpeg', quality: 82 });
  hechas.push('b-trabajo-1440-visor.jpg');
  await p.close();
}
{
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 } });
  await preparar(p, '');
  await p.fill('#chq-dominio', 'example.com');
  await p.click('#chq-btn');
  await p.waitForSelector('#chq-out:not([hidden]), #chq-error:not([hidden])', { timeout: 30000 });
  await p.mouse.move(200, 200);
  await p.waitForTimeout(800);
  await p.screenshot({ path: path.join(IMG, 'b-home-1440-chequeo.jpg'), type: 'jpeg', quality: 82 });
  hechas.push('b-home-1440-chequeo.jpg');
  await p.close();
}
await nav.close();
fs.writeFileSync(path.join(AQUI, '..', 'datos', 'capturas.json'), JSON.stringify({ fecha: new Date().toISOString(), base: BASE, archivos: hechas }, null, 1));
console.log(hechas.length, 'capturas');
