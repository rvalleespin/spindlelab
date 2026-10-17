// Doceavo · medios del caso en las formas de Koto (16:9 a 1440 × 810; 4:5 a 390 × 488, al doble).
// Uso: node medios.mjs http://127.0.0.1:PUERTO
// Con ?hoy=2026-10-16 y movimiento reducido (estado final). Salen en medios/.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const salida = path.resolve(aqui, "../medios");
fs.mkdirSync(salida, { recursive: true });
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

// [archivo, ruta, ancho, alto, dpr, selector al que bajar (o null), desplazamiento sobre ese selector]
const medios = [
  ["home-1440.png", "/", 1440, 810, 1, null, 0],
  ["este-mes-1440.png", "/", 1440, 810, 1, "tr#hoy", -420],
  ["no-hacemos-1440.png", "/", 1440, 810, 1, "#no-hacemos", 0],
  ["calendario-1440.png", "/calendario/", 1440, 810, 1, null, 0],
  ["home-390.png", "/", 390, 488, 2, null, 0],
  ["anio-390.png", "/", 390, 488, 2, ".anio", -60],
  ["calendario-390.png", "/calendario/", 390, 488, 2, ".taco-g", -70],
];
for (const [archivo, ruta, w, h, dpr, sel, dy] of medios) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${base}${ruta}?hoy=2026-10-16`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (sel) await page.evaluate(([sel, dy]) => { const b = document.querySelector(sel).getBoundingClientRect(); window.scrollTo(0, b.top + scrollY + dy); }, [sel, dy]);
  await page.screenshot({ path: path.join(salida, archivo) });
  console.log("ok", archivo);
  await ctx.close();
}
await browser.close();
