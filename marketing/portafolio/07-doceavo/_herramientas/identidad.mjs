// Doceavo · rasteriza el pliego, las placas y las portadas (HTML → PNG) con Playwright.
// Uso: node identidad.mjs http://127.0.0.1:PUERTO [pliego | placas | portadas | <nombre de una placa>]
// El servidor sirve la carpeta 07-doceavo (las placas importan ../sitio/datos.js como módulo, y un
// módulo no carga desde file://).
// - identidad/pliego.html → identidad/pliego.png a 1920 × 1080 (dpr 1)
// - identidad/placas.html?p=X&f=lienzo|tinta → identidad/placas/<forma>-X-<f>.png, al doble
// - identidad/placas.html?p=portada-NN → identidad/portadas/portada-NN.png, al doble
// De paso comprueba que la letra cargó, que no hubo peticiones fuera del servidor ni errores, y que
// nada se sale de la placa.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const base = process.argv[2];
const solo = process.argv[3];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const dir = path.resolve(aqui, "../identidad");
fs.mkdirSync(path.join(dir, "placas"), { recursive: true });
fs.mkdirSync(path.join(dir, "portadas"), { recursive: true });

const tam = { r169: [1057, 595, "16x9"], r45: [525, 656, "4x5"], r162: [525, 324, "1-62"], r43: [525, 394, "4x3"], r53: [525, 315, "5x3"] };
const placas = [
  ["anio", "r169"], ["papel", "r169"], ["f29", "r169"],
  ["logo", "r45"], ["meses", "r45"], ["letra", "r45"], ["informe", "r45"],
  ["cifras", "r162"], ["eje", "r162"], ["hoja", "r162"], ["lomo", "r162"],
];
const portadas = [["portada-45", "r45"], ["portada-43", "r43"], ["portada-53", "r53"]];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const informe = [];
async function rasterizar(url, w, h, dpr, salida) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  const fuera = [], errores = [];
  page.on("request", (r) => { if (!r.url().startsWith(base) && !r.url().startsWith("data:")) fuera.push(r.url()); });
  page.on("pageerror", (e) => errores.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errores.push(m.text()); });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.body.dataset.listo === "1", null, { timeout: 5000 }).catch(() => errores.push("no terminó de pintar"));
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(() => {
    const p = document.querySelector(".placa, .pliego");
    const caja = p.getBoundingClientRect();
    // hijos que se salen de la placa (salvo los que sangran a propósito: .hojita, .doc, .frac)
    const sale = [...p.querySelectorAll("*")].filter((el) => {
      if (el.closest(".hojita, .doc, .sangra")) return false;
      const b = el.getBoundingClientRect();
      return b.width > 0 && (b.right > caja.right + 1 || b.bottom > caja.bottom + 1 || b.left < caja.left - 1 || b.top < caja.top - 1);
    }).map((el) => el.tagName + "." + el.className).slice(0, 4);
    return { fuentes: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family), sale };
  });
  await page.screenshot({ path: salida });
  informe.push({ salida: path.relative(dir, salida), ...r, fuera, errores });
  await ctx.close();
}

if (!solo || solo === "pliego") await rasterizar(`${base}/identidad/pliego.html`, 1920, 1080, 1, path.join(dir, "pliego.png"));
for (const [p, r] of placas) {
  if (solo && solo !== p && solo !== "placas") continue;
  const [w, h, forma] = tam[r];
  for (const f of ["lienzo", "tinta"]) await rasterizar(`${base}/identidad/placas.html?p=${p}&f=${f}`, w, h, 2, path.join(dir, "placas", `${forma}-${p}-${f}.png`));
}
for (const [p, r] of portadas) {
  if (solo && solo !== p && solo !== "portadas") continue;
  const [w, h] = tam[r];
  await rasterizar(`${base}/identidad/placas.html?p=${p}&f=lienzo`, w, h, 2, path.join(dir, "portadas", `${p}.png`));
}
await browser.close();
let mal = 0;
for (const i of informe) {
  const m = i.fuera.length || i.errores.length || !i.fuentes.includes("Recursive") || i.sale.length;
  if (m) mal++;
  console.log(`${m ? "OJO" : "ok "} ${i.salida} · fuentes ${[...new Set(i.fuentes)].join("+")} · fuera ${i.fuera.length} · errores ${i.errores.join("; ")} · se sale ${i.sale.join(", ")}`);
}
console.log(mal ? `${mal} con algo que mirar` : "todo en orden");
