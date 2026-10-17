// Ocelo · rasteriza el pliego, las placas y las portadas (HTML → PNG) con Playwright.
// Uso: node identidad.mjs [placa]
// - pliego.html → identidad/pliego.png a 1920 × 1080 (dpr 1)
// - placas.html?p=X&f=tinta|lienzo → identidad/placas/X-tinta.png y X-lienzo.png, al doble
// - placas.html?p=portada-NN → identidad/portadas/ocelo-NN.png, al doble, con la luz encendida
// De paso comprueba que las dos fuentes cargaron y que no hubo peticiones fuera de la carpeta.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const aqui = path.dirname(new URL(import.meta.url).pathname);
const dir = path.resolve(aqui, "../identidad");
const solo = process.argv[2];
fs.mkdirSync(path.join(dir, "placas"), { recursive: true });
fs.mkdirSync(path.join(dir, "portadas"), { recursive: true });

const tam = { r169: [1057, 595], r45: [525, 656], r162: [525, 324], r43: [525, 394], r53: [525, 315] };
const placas = [
  ["carta", "r169"], ["logotipo", "r169"], ["landolt", "r45"], ["letra", "r45"], ["mono", "r162"],
  ["duocromo", "r169"], ["informe", "r162"], ["puerta", "r162"], ["prometer", "r169"], ["interruptor", "r45"],
];
const portadas = [["portada-45", "r45"], ["portada-43", "r43"], ["portada-53", "r53"]];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const informe = [];

async function rasterizar(url, w, h, dpr, salida) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  const fuera = [];
  const errores = [];
  page.on("request", (r) => { if (!r.url().startsWith("file://") && !r.url().startsWith("data:")) fuera.push(r.url()); });
  page.on("pageerror", (e) => errores.push(String(e)));
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const fuentes = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
  const desborde = await page.evaluate(() => {
    const p = document.querySelector(".placa, .pliego");
    return p ? [p.scrollWidth - p.clientWidth, p.scrollHeight - p.clientHeight] : [0, 0];
  });
  await page.screenshot({ path: salida });
  informe.push({ salida: path.relative(dir, salida), fuentes: [...new Set(fuentes)], fuera, errores, desborde });
  await ctx.close();
}

const base = pathToFileURL(dir).href;
if (!solo || solo === "pliego") await rasterizar(`${base}/pliego.html`, 1920, 1080, 1, path.join(dir, "pliego.png"));
for (const [p, r] of placas) {
  if (solo && solo !== p) continue;
  const [w, h] = tam[r];
  for (const f of ["tinta", "lienzo"]) await rasterizar(`${base}/placas.html?p=${p}&f=${f}`, w, h, 2, path.join(dir, "placas", `${p}-${f}.png`));
}
for (const [p, r] of portadas) {
  if (solo && solo !== p) continue;
  const [w, h] = tam[r];
  await rasterizar(`${base}/placas.html?p=${p}&f=lienzo`, w, h, 2, path.join(dir, "portadas", `ocelo-${p.replace("portada-", "")}.png`));
}
await browser.close();
for (const i of informe) {
  // El informe sangra a propósito por abajo (la hoja sigue fuera del cuadro); landolt y mono solo usan la mono.
  const mal = i.fuera.length || i.errores.length || i.fuentes.length < 1 || (!i.salida.includes("informe") && i.desborde.some((d) => d > 0));
  console.log(`${mal ? "OJO" : "ok "} ${i.salida} · fuentes ${i.fuentes.join("+")} · fuera ${i.fuera.length} · errores ${i.errores.length} · desborde ${i.desborde.join("/")}`);
}
