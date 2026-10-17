// Sesenta · comprueba que los nombres de los dos abogados ficticios no son de un abogado habilitado.
// Consulta el buscador público del Poder Judicial (pjud.cl/transparencia/busqueda-de-abogados,
// «Búsqueda por Nombre») y guarda SOLO el conteo de coincidencias: ningún dato de nadie.
// Uso: node pjud-nombres.mjs  → escribe pjud-nombres.json al lado.
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const { chromium } = await import(pathToFileURL("/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs").href);
const aqui = path.dirname(new URL(import.meta.url).pathname);
// [nombre, primer apellido, segundo apellido]; las de control tienen que devolver algo, si no el cero no significa nada
const consultas = [
  { tipo: "control", q: ["Juan", "Pérez", ""] },
  { tipo: "control", q: ["", "Pérez", "Caris"] },
  { tipo: "ficticio", q: ["Rocío", "Velarde", "Quintral"] },
  { tipo: "ficticio", q: ["Rocio", "Velarde", "Quintral"] },
  { tipo: "ficticio", q: ["Rocío", "Velarde", ""] },
  { tipo: "ficticio", q: ["", "Velarde", "Quintral"] },
  { tipo: "ficticio", q: ["Fermín", "Achondo", "Lizana"] },
  { tipo: "ficticio", q: ["Fermin", "Achondo", "Lizana"] },
  { tipo: "ficticio", q: ["Fermín", "Achondo", ""] },
  { tipo: "ficticio", q: ["", "Achondo", "Lizana"] },
];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--disable-blink-features=AutomationControlled"] });
const resultados = [];
// Una sesión nueva por consulta y una pausa entre ellas: el sitio rechaza ráfagas
// («La URL solicitada ha sido rechazada») y eso no es un cero, es un «no se supo».
for (const { tipo, q } of consultas) {
  const [n, a1, a2] = q;
  const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36", locale: "es-CL" });
  const p = await ctx.newPage();
  await p.goto("https://www.pjud.cl/transparencia/busqueda-de-abogados", { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(3500);
  await p.getByText("Búsqueda por Nombre", { exact: true }).click();
  await p.waitForTimeout(600);
  await p.fill("#name_lawyer", n); await p.fill("#first_last_name", a1); await p.fill("#second_last_name", a2);
  const espera = p.waitForResponse((r) => /ajax\/Lawyers\/search/i.test(r.url()), { timeout: 20000 }).catch(() => null);
  await p.click("#laywer-search-button-by-name");
  const r = await espera;
  const cuerpo = r ? await r.text() : "";
  const valida = /Resultado de la búsqueda de abogados|No se encontraron registros/i.test(cuerpo);
  const filas = (cuerpo.split(/<tbody/i)[1] || "").split(/<tr/i).length - 1;
  resultados.push({ tipo, consulta: q.filter(Boolean).join(" "), coincidencias: valida ? filas : null, aviso: /No se encontraron registros/i.test(cuerpo) ? "No se encontraron registros" : valida ? null : "respuesta rechazada o vacía: repetir" });
  await ctx.close();
  await new Promise((ok) => setTimeout(ok, 4000));
}
await b.close();
const salida = { fuente: "https://www.pjud.cl/transparencia/busqueda-de-abogados (Búsqueda por Nombre)", consultado: new Date().toISOString(), nota: "Solo conteos; la primera página del buscador muestra hasta 5 filas, así que en los controles el número es un piso", resultados };
fs.writeFileSync(path.join(aqui, "pjud-nombres.json"), JSON.stringify(salida, null, 1));
for (const x of resultados) console.log(`${x.tipo.padEnd(8)} ${x.consulta.padEnd(26)} ${x.coincidencias} ${x.aviso || ""}`);
