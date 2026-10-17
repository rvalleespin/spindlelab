// Doceavo · deja el HTML estático con la fecha de las capturas (datos.js, HOY_FIJO).
// Uso: node construir.mjs
// Rellena lo que va entre <!--d:nombre--> y <!--/d:nombre--> en sitio/index.html y
// sitio/calendario/index.html con las mismas funciones que usa el navegador. Así la página se lee
// completa sin JavaScript (y un motor que no corre JS ve las fechas), y el JS solo vuelve a pintar si
// el día real es otro.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const aqui = path.dirname(new URL(import.meta.url).pathname);
const sitio = path.resolve(aqui, "../sitio");
const D = await import(pathToFileURL(path.join(sitio, "datos.js")).href);
const hoy = { ...D.HOY_FIJO };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const comunes = {
  simbolo: D.simbolo(hoy.m),
  canto: D.canto(hoy.m),
};
const paginas = {
  "index.html": {
    ...comunes,
    h1: D.h1(hoy),
    bajada: D.bajada(hoy),
    cta: `Ver ${D.MES[hoy.m - 1]} día por día`,
    hoja: D.hojaVence(hoy.m, hoy),
    anio: D.anioEnDoce(hoy),
    "mes-rotulo": `${cap(D.MES[hoy.m - 1])} ${D.ANIO}`,
    "mes-nombre": cap(D.MES[hoy.m - 1]),
    "mes-hoy": `Hoy es ${D.DIA[D.dow(hoy.m, hoy.d)]} ${hoy.d}.`,
    tabla: D.tablaMes(hoy.m, hoy),
  },
  "calendario/index.html": {
    ...comunes,
    hoja: D.hojaGrande(hoy.m, hoy),
    selector: D.selector(hoy),
    "vence-lista": D.hojaVence(hoy.m, hoy),
    "tabla-anio": D.tablaAnio(hoy),
    corre: D.corre(),
  },
};

for (const [archivo, bloques] of Object.entries(paginas)) {
  const ruta = path.join(sitio, archivo);
  let html = fs.readFileSync(ruta, "utf8");
  for (const [k, v] of Object.entries(bloques)) {
    const re = new RegExp(`(<!--d:${k}-->)[\\s\\S]*?(<!--/d:${k}-->)`, "g");
    const n = (html.match(re) || []).length;
    if (!n) { console.log(`OJO ${archivo}: no está el bloque ${k}`); continue; }
    html = html.replace(re, (_, a, b) => a + v + b);
  }
  fs.writeFileSync(ruta, html);
  console.log(`ok ${archivo} · ${Object.keys(bloques).length} bloques · ${hoy.d}-${hoy.m}-${D.ANIO}`);
}
