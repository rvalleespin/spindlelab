// E13 · 30-oct · el logo opción 2, «la i con su disco», medido a los tamaños del sitio.
// Lucía, 30-oct-2026; rehecha el mismo día (acta de QA del 30-oct, menor 4) para medir lo CONSTRUIDO.
//
// La primera versión armaba el `d` de la maqueta (e13/copy/maquetas-30oct/logo-i-disco.svg: elipse centrada en
// (184,37; −91,5), rx 17, ry 6,5) y se caía en cuanto Logo.astro dejó de traer la i de El huso. Lo que se construyó no es la
// maqueta sino el corte menú de Bruno (e13/logo/logo-menu-linea.svg, README «Qué archivo va dónde»): el disco de Bruno mide
// 29,97 × 16,65 unidades (1,8 : 1), centrado en (184,37; −92,28), con 12,26 de hueco hasta el asta (construccion.json,
// cortes.menu.medidas). A 24 px la maqueta se leía «Spīndle» (lectura fría de Bruno); el de Bruno se lee «i».
//
// Ahora:
//   1. comprueba que el `d` y el viewBox de src/components/a/Logo.astro son los de e13/logo/logo-menu-linea.svg, tal cual
//      (si no, se cae diciendo cuál difiere);
//   2. mide, a 20 y 24 px de alto (pie y encabezado bajo 834; encabezado desde 834) y a 1x y 2x, la columna de la i en el
//      render: filas del disco y su cobertura máxima, filas limpias entre el disco y el asta;
//   3. da los números teóricos de Bruno a ese alto, en el viewBox del sitio (147,01 unidades de alto);
//   4. deja una lámina con El huso (e12/logo/final/logo-menu-blanco.svg, el de antes) y el construido, a los dos tamaños.
// Criterio (spec-visual §5.4): el disco se ve (cobertura ≥ 0,5 en alguna fila) y no toca el asta (≥ 1 fila limpia) a 1x.
//
// Uso: node logo-i-disco.mjs <carpeta-salida>      (sale con 1 si el `d` no es el de Bruno o si falla el criterio)
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import fs from 'node:fs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const OBRA = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3');
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);

const [dir] = process.argv.slice(2);
if (!dir) { console.error('Uso: node logo-i-disco.mjs <carpeta-salida>'); process.exit(2); }
fs.mkdirSync(dir, { recursive: true });
const logo = fs.readFileSync(join(REPO, 'spindlelab-astro/src/components/a/Logo.astro'), 'utf8');
const bruno = fs.readFileSync(join(OBRA, 'e13/logo/logo-menu-linea.svg'), 'utf8');
const huso = fs.readFileSync(join(OBRA, 'e12/logo/final/logo-menu-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');
const de = (s) => ({ vb: s.match(/viewBox="([^"]+)"/)[1], d: s.match(/ d="([^"]+)"/)[1] });
const sitio = de(logo);
const ref = de(bruno);
if (sitio.vb !== ref.vb) { console.error(`El viewBox de Logo.astro (${sitio.vb}) no es el de logo-menu-linea.svg (${ref.vb})`); process.exit(1); }
if (sitio.d !== ref.d) { console.error('El `d` de Logo.astro no es el de e13/logo/logo-menu-linea.svg (el corte menú de Bruno)'); process.exit(1); }
console.log('Logo.astro trae el corte menú de Bruno tal cual (mismo `d` y viewBox)');

const menu = JSON.parse(fs.readFileSync(join(OBRA, 'e13/logo/construccion.json'), 'utf8')).cortes.menu.medidas;
const [vx, , , vh] = sitio.vb.split(' ').map(Number);
const [x0u, x1u] = menu.asta_x; // la columna de la i: el asta, 175,12 a 193,62

const svg = (s, alto) => s.replace('<svg ', `<svg style="height:${alto}px;width:auto;display:block" `).replace(/fill="[^"]*"/g, 'fill="#fff"');
const html = `<!doctype html><html><body style="margin:0;background:#060606;padding:16px;font:11px monospace;color:#989898">
<div style="display:flex;gap:40px;margin-bottom:8px"><span style="width:60px"></span><span style="width:140px">El huso (antes)</span><span>construido (Bruno)</span></div>
${[24, 20].map((a) => `<div style="display:flex;gap:40px;align-items:center;margin-bottom:16px"><span style="width:60px">${a} px</span><div style="width:140px">${svg(huso, a)}</div><div id="hoy-${a}">${svg(logo.slice(logo.indexOf('<svg'), logo.indexOf('</svg>') + 6), a)}</div></div>`).join('')}
</body></html>`;

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), viewBox: sitio.vb, d: 'el de e13/logo/logo-menu-linea.svg', brunoUnidades: { disco: menu.disco, hueco: menu.hueco, asta: menu.asta, centro: [menu.cx, -menu.disco_centro] }, medidas: [] };
let falla = 0;
for (const dpr of [1, 2]) {
  const ctx = await nav.newContext({ viewport: { width: 520, height: 150 }, deviceScaleFactor: dpr });
  const p = await ctx.newPage();
  await p.setContent(html);
  await p.screenshot({ path: `${dir}/logo-i-disco-${dpr}x.png` });
  for (const alto of [24, 20]) {
    const el = await p.$(`#hoy-${alto} svg`);
    const caja = await el.boundingBox();
    const png = await el.screenshot({ omitBackground: false });
    const s = alto / vh;
    const x0 = Math.floor((x0u - vx) * s * dpr), x1 = Math.ceil((x1u - vx) * s * dpr);
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
    let y = 0; while (y < filas.length && filas[y] < 0.05) y++;
    const discoDesde = y; while (y < filas.length && filas[y] >= 0.05) y++;
    const discoHasta = y; while (y < filas.length && filas[y] < 0.05) y++;
    const astaDesde = y;
    const disco = filas.slice(discoDesde, discoHasta);
    const seVe = Math.max(...disco) >= 0.5;
    const noToca = astaDesde - discoHasta >= 1;
    if (dpr === 1 && !(seVe && noToca)) falla++;
    const teorico = { discoAncho: +(menu.disco[0] * s).toFixed(2), discoAlto: +(menu.disco[1] * s).toFixed(2), hueco: +(menu.hueco * s).toFixed(2), asta: +(menu.asta * s).toFixed(2) };
    R.medidas.push({ dpr, alto, ancho: +caja.width.toFixed(1), teorico, render: { filasDisco: disco.length, coberturaDisco: disco, filasHueco: astaDesde - discoHasta }, seVe, noToca });
    console.log(`${dpr}x ${alto} px (logo ${caja.width.toFixed(1)} × ${caja.height.toFixed(1)}): teórico disco ${teorico.discoAncho} × ${teorico.discoAlto} px, hueco ${teorico.hueco}, asta ${teorico.asta}; render: disco en ${disco.length} filas (${disco.join(' · ')}), ${astaDesde - discoHasta} filas limpias hasta el asta → se ve ${seVe}, no toca ${noToca}`);
  }
  await ctx.close();
}
await nav.close();
fs.writeFileSync(`${dir}/logo-i-disco.json`, JSON.stringify(R, null, 1) + '\n');
process.exit(falla ? 1 : 0);
