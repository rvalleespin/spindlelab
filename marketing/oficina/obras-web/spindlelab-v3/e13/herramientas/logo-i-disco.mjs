// E13 · 30-oct · el logo opción 2, «la i con su disco», medido a los tamaños del sitio. Lucía, 30-oct-2026.
//
// Ramón eligió el 30-oct la opción 2 («logo 2 por ahora»): el wordmark El huso con la i limpia (asta recta) y el punto
// convertido en un disco aplanado, separado, sin nada que la cruce. El `d` sale del de src/components/a/Logo.astro: se
// quita el subtrazo de la i dibujada (de «M175.12 0H193.62V-74.13» a «175.12 -74.13Z») y se suman el asta
// «M175.12 0H193.62V-71.69H175.12Z» y la elipse centrada en (184,37; −91,5) con rx 17 y ry 6,5, como en
// e13/copy/maquetas-30oct/maquetas.mjs y logo-i-disco.svg.
//
// Mide, a 20 y 24 px de alto (pie y encabezado bajo 834; encabezado desde 834) y a 1x y 2x:
//   · el disco y el hueco entre el disco y el asta, en píxeles de pantalla, contados sobre el render (filas con tinta en
//     la columna de la i);
//   · que el disco no toque el asta (al menos una fila sin tinta entre los dos) y que se vea (al menos una fila con
//     cobertura ≥ 50 %).
// Guarda una lámina PNG con los dos logos (hoy y opción 2) a esos tamaños y el `d` nuevo en logo-i-disco.json.
//
// Uso: node logo-i-disco.mjs <carpeta-salida>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [dir] = process.argv.slice(2);
fs.mkdirSync(dir, { recursive: true });
const logo = fs.readFileSync('/home/user/spindlelab/spindlelab-astro/src/components/a/Logo.astro', 'utf8');
const VB = logo.match(/viewBox="([^"]+)"/)[1];
const d = logo.match(/ d="([^"]+)"/)[1];
const elipse = (cx, cy, rx, ry) => `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
const ASTA = 'M175.12 0H193.62V-71.69H175.12Z';
const DISCO = elipse(184.37, -91.5, 17, 6.5);
const i0 = d.indexOf('M175.12 0H193.62V-74.13');
const i1 = d.indexOf('175.12 -74.13Z', i0);
let nuevo;
if (i0 >= 0 && i1 >= 0) {
  nuevo = d.slice(0, i0) + d.slice(i1 + '175.12 -74.13Z'.length) + ASTA + DISCO; // antes de construir: se arma desde el de hoy
} else if (d.includes(ASTA) && d.includes(DISCO)) {
  nuevo = d; // ya construido: se mide el de Logo.astro tal cual (y «hoy» es el mismo)
  console.log('Logo.astro ya trae la opción 2: se mide tal cual');
} else {
  throw new Error('El `d` de Logo.astro no trae ni la i dibujada ni la opción 2 (asta + disco) tal como la escribe la spec');
}
const [vx, vy, vw, vh] = VB.split(' ').map(Number);

const svg = (dd, alto) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB}" style="height:${alto}px;width:auto;display:block" fill="#fff"><path d="${dd}"/></svg>`;
const html = `<!doctype html><html><body style="margin:0;background:#060606;padding:16px;font:11px monospace;color:#989898">
${[24, 20].map((a) => `<div style="display:flex;gap:40px;align-items:center;margin-bottom:16px"><span style="width:60px">${a} px</span><div id="hoy-${a}">${svg(d, a)}</div><div id="nuevo-${a}">${svg(nuevo, a)}</div></div>`).join('')}
</body></html>`;

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), viewBox: VB, d: nuevo, medidas: [] };
for (const dpr of [1, 2]) {
  const ctx = await nav.newContext({ viewport: { width: 520, height: 120 }, deviceScaleFactor: dpr });
  const p = await ctx.newPage();
  await p.setContent(html);
  await p.screenshot({ path: `${dir}/logo-i-disco-${dpr}x.png` });
  for (const alto of [24, 20]) {
    const el = await p.$(`#nuevo-${alto} svg`);
    const caja = await el.boundingBox();
    const png = await el.screenshot({ omitBackground: false });
    // columnas de la i en la unidad del viewBox: el disco va de 167,37 a 201,37; el asta, de 175,12 a 193,62
    const s = alto / vh;
    const x0 = Math.floor((175.12 - vx) * s * dpr), x1 = Math.ceil((193.62 - vx) * s * dpr);
    const filas = await p.evaluate(async ({ b64, x0, x1 }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      const px = g.getImageData(0, 0, c.width, c.height).data;
      const out = [];
      for (let y = 0; y < c.height; y++) {
        let m = 0;
        for (let x = x0; x < x1; x++) { const i = (y * c.width + x) * 4; m = Math.max(m, px[i]); }
        out.push(+((m - 6) / 249).toFixed(2)); // cobertura: 0 el lienzo, 1 el blanco
      }
      return out;
    }, { b64: png.toString('base64'), x0, x1 });
    // de arriba abajo: filas del disco (con tinta), hueco (sin tinta), y el asta
    let y = 0; while (y < filas.length && filas[y] < 0.05) y++;
    const discoDesde = y; while (y < filas.length && filas[y] >= 0.05) y++;
    const discoHasta = y; while (y < filas.length && filas[y] < 0.05) y++;
    const astaDesde = y;
    const disco = filas.slice(discoDesde, discoHasta);
    R.medidas.push({
      dpr, alto, ancho: +caja.width.toFixed(1),
      teorico: { discoAncho: +(34 * s).toFixed(2), discoAlto: +(13 * s).toFixed(2), hueco: +(13.31 * s).toFixed(2), asta: +(18.5 * s).toFixed(2) },
      render: { filasDisco: disco.length, coberturaMaxDisco: Math.max(...disco), filasHueco: astaDesde - discoHasta, coberturaFilas: filas },
      seVe: Math.max(...disco) >= 0.5, noToca: astaDesde - discoHasta >= 1,
    });
    console.log(`${dpr}x ${alto} px: disco ${(34 * s).toFixed(2)} × ${(13 * s).toFixed(2)} px (teórico), hueco ${(13.31 * s).toFixed(2)} px; render: ${disco.length} filas de disco (cobertura máx ${Math.max(...disco)}), ${astaDesde - discoHasta} filas de hueco → se ve ${Math.max(...disco) >= 0.5}, no toca ${astaDesde - discoHasta >= 1}`);
  }
  await ctx.close();
}
await nav.close();
fs.writeFileSync(`${dir}/logo-i-disco.json`, JSON.stringify(R, null, 1));
