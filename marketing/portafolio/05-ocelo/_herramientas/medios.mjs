// Ocelo · medios del caso en las formas de Koto (lock §21.2): 16:9 a 1440 × 810 y 4:5 a 390 × 488,
// al doble. Con el rótulo «Concepto» de la cabecera fija dentro de cada cuadro.
// Uso: node medios.mjs http://127.0.0.1:PUERTO
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const salida = path.resolve(aqui, "../medios");
fs.mkdirSync(salida, { recursive: true });

const tomas = [
  { nombre: "home-1440-luz", ruta: "/?luz=1", w: 1440, h: 810 },
  { nombre: "home-390-sala", ruta: "/?luz=0", w: 390, h: 488 },
  { nombre: "home-390-luz", ruta: "/?luz=1", w: 390, h: 488 },
  { nombre: "evaluacion-1440-pasos", ruta: "/la-evaluacion/?luz=0", w: 1440, h: 810, ancla: "#paso-3", margen: 118 },
  { nombre: "evaluacion-390-duocromo", ruta: "/la-evaluacion/?luz=0", w: 390, h: 488, ancla: "#paso-2 .decide", margen: 112 },
  { nombre: "prometer-1440", ruta: "/?luz=0", w: 1440, h: 810, ancla: "#prometer .riel", margen: 124 },
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const t of tomas) {
  const ctx = await browser.newContext({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + t.ruta, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (t.ancla) {
    await page.evaluate(([sel, m]) => { const el = document.querySelector(sel); scrollTo(0, el.getBoundingClientRect().top + scrollY - m); }, [t.ancla, t.margen]);
    await page.waitForTimeout(150);
  }
  const rot = await page.evaluate(() => { const b = document.querySelector(".rotulo").getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight; });
  await page.screenshot({ path: path.join(salida, `${t.nombre}.png`) });
  console.log(`${t.nombre}.png · ${t.w * 2} × ${t.h * 2} · rótulo ${rot ? "visible" : "NO VISIBLE"}`);
  await ctx.close();
}
await browser.close();
