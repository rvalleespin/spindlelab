// Área de medios y de campos claros o de color en las páginas de caso y el índice, a 1440 (lock §20.1 y §20.3).
// Saca la captura de página completa y la caja de cada medio; campos.py cuenta los píxeles.
// Uso: node medir-campos.mjs <base> <carpeta temporal>
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const [BASE, TMP] = process.argv.slice(2);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const out = {};
for (const [n, r] of [['home', ''], ['trabajo', 'trabajo/'], ['praxi', 'trabajo/praxi/'], ['sesenta', 'trabajo/sesenta/'], ['desarrollo-web', 'servicios/desarrollo-web/']]) {
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto(BASE + r, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 450) { window.scrollTo(0, y); await new Promise((q) => setTimeout(q, 60)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(800);
  const datos = await p.evaluate(() => ({
    alto: document.documentElement.scrollHeight, ancho: document.documentElement.clientWidth,
    medios: [...document.querySelectorAll('.medio, .placa-datos, .instrumento, .hoja')].filter((e) => e.offsetParent !== null && !e.closest('.visor-celda') || e.closest('.visor-celda'))
      .map((e) => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y + window.scrollY, w: b.width, h: b.height, clase: e.className.split(' ')[0] }; })
      .filter((b) => b.w > 0 && b.h > 0),
  }));
  const png = path.join(TMP, `campos-${n}.png`);
  await p.screenshot({ path: png, fullPage: true });
  out[n] = { ...datos, png };
  await p.close();
}
await nav.close();
fs.writeFileSync(path.join(TMP, 'campos.json'), JSON.stringify(out));
console.log('listo');
