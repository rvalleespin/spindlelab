// Sesenta · rasteriza el pliego, las placas y las portadas (HTML → PNG) con Playwright.
// Uso: node identidad.mjs [placa]
// - identidad/pliego.html → identidad/pliego.png a 1920 × 1080 (dpr 1)
// - identidad/placas.html?p=X&f=lienzo|tinta → identidad/placas/<forma>-X-<fondo>.png, al doble
// - identidad/placas.html?p=portada-NN → identidad/portadas/sesenta-NN.png, al doble
// Las formas son las de las filas de Koto (lock §21.2): 16:9 a 1057 × 595, 4:5 a 525 × 656, 1,62 a 525 × 324;
// las portadas, las tres alturas del muro (lock §2.4): 4:5, 4:3 (525 × 394) y 5:3 (525 × 315).
// De paso comprueba que las letras cargaron, que no hubo peticiones fuera de la carpeta y que nada desborda.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const aqui = path.dirname(new URL(import.meta.url).pathname);
const dir = path.resolve(aqui, "../identidad");
const solo = process.argv[2];
fs.mkdirSync(path.join(dir, "placas"), { recursive: true });
fs.mkdirSync(path.join(dir, "portadas"), { recursive: true });

const tam = { "16x9": [1057, 595], "4x5": [525, 656], "1-62": [525, 324], "4x3": [525, 394], "5x3": [525, 315] };
const placas = [
  ["suma", "16x9"], ["logo", "16x9"], ["sello", "4x5"], ["paleta", "4x5"], ["letra", "4x5"],
  ["courier", "1-62"], ["otrosi", "1-62"], ["contador", "16x9"], ["hoja", "1-62"], ["tarjeta", "1-62"],
  ["finiquito", "16x9"], ["pregunta", "16x9"],
];
const portadas = [["portada-45", "4x5"], ["portada-43", "4x3"], ["portada-53", "5x3"]];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const informe = [];
async function rasterizar(url, w, h, dpr, salida) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  const fuera = [], errores = [];
  page.on("request", (r) => { if (!r.url().startsWith("file://") && !r.url().startsWith("data:")) fuera.push(r.url()); });
  page.on("pageerror", (e) => errores.push(String(e)));
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const fuentes = await page.evaluate(() => [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + " " + f.weight))]);
  const esquina = await page.evaluate(() => { const e = document.querySelector(".esquina"); if (!e) return "sin rótulo"; const b = e.getBoundingClientRect(); return b.top >= 0 && b.right <= innerWidth && b.width > 0 ? "rótulo ok" : "RÓTULO FUERA"; });
  await page.screenshot({ path: salida });
  informe.push({ salida: path.relative(dir, salida), fuentes, fuera, errores, esquina });
  await ctx.close();
}
const base = pathToFileURL(dir).href;
if (!solo || solo === "pliego") await rasterizar(`${base}/pliego.html`, 1920, 1080, 1, path.join(dir, "pliego.png"));
for (const [p, r] of placas) {
  if (solo && solo !== p) continue;
  const [w, h] = tam[r];
  for (const f of ["lienzo", "tinta"]) await rasterizar(`${base}/placas.html?p=${p}&f=${f}`, w, h, 2, path.join(dir, "placas", `${r}-${p}-${f}.png`));
}
for (const [p, r] of portadas) {
  if (solo && solo !== p) continue;
  const [w, h] = tam[r];
  await rasterizar(`${base}/placas.html?p=${p}&f=lienzo`, w, h, 2, path.join(dir, "portadas", `sesenta-${r}.png`));
}
await browser.close();
for (const i of informe) {
  const mal = i.fuera.length || i.errores.length || !i.fuentes.length || i.esquina === "RÓTULO FUERA";
  console.log(`${mal ? "OJO" : "ok "} ${i.salida} · ${i.fuentes.join(" + ")} · ${i.esquina} · fuera ${i.fuera.length} · errores ${i.errores.length}`);
}
