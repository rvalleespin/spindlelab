// Sesenta · medios del caso en las formas de Koto (lock §21.2): 16:9 a 1440 × 810 y 4:5 a 390 × 488, al doble.
// Con el sello «Concepto» de la cabecera fija dentro de cada cuadro. «Hoy» fijado en el 17-oct-2026.
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
  { nombre: "home-1440", ruta: "/?hoy=2026-10-17", w: 1440, h: 810 },
  { nombre: "home-390", ruta: "/?hoy=2026-10-17", w: 390, h: 488 },
  { nombre: "interior-390", ruta: "/que-dice-tu-carta/?hoy=2026-10-17", w: 390, h: 488 },
  { nombre: "interior-1440", ruta: "/que-dice-tu-carta/?hoy=2026-10-17", w: 1440, h: 810, ancla: "#art-161", margen: 118 },
  { nombre: "lector-390", ruta: "/?hoy=2026-10-17", w: 390, h: 488, ancla: "#carta .selector", margen: 122 },
  { nombre: "lector-1440", ruta: "/?hoy=2026-10-17", w: 1440, h: 810, ancla: "#carta", margen: 92 },
  { nombre: "finiquito-1440", ruta: "/?hoy=2026-10-17", w: 1440, h: 810, ancla: ".finiquito", margen: 128 },
];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--lang=es-CL"], env: { ...process.env, LANG: "es_CL.UTF-8", LANGUAGE: "es_CL" } });
for (const t of tomas) {
  const ctx = await browser.newContext({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 2, reducedMotion: "reduce", locale: "es-CL" });
  const page = await ctx.newPage();
  await page.goto(base + t.ruta, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (t.contar) { await page.fill("#separacion", "2026-09-14"); await page.click("#contador-form button"); await page.waitForTimeout(200); }
  if (t.ancla) {
    await page.evaluate(([sel, m]) => { const el = document.querySelector(sel); scrollTo(0, el.getBoundingClientRect().top + scrollY - m); }, [t.ancla, t.margen]);
  }
  await page.waitForTimeout(300);
  const rot = await page.evaluate(() => { const b = document.querySelector(".rotulo p").getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight; });
  await page.screenshot({ path: path.join(salida, `${t.nombre}.png`) });
  console.log(`${t.nombre}.png · ${t.w * 2} × ${t.h * 2} · sello ${rot ? "visible" : "NO VISIBLE"}`);
  await ctx.close();
}
await browser.close();
