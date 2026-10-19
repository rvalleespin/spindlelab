// E12 · logo final · rasteriza las piezas a partir de los SVG de final.py (Bruno, 19-oct-2026).
// Uso: node final-render.mjs <dir-logo>
// Deja en <dir-logo>/final/: favicon-32.png y favicon-48.png (el 16 lo dibuja final.py a mano), apple-touch-icon.png
// (180), icon-192.png e icon-512.png (seguros para máscara redonda), avatar/ (cuadrado y redondo, 1080), documentos/
// (PNG de 2400 px de ancho con fondo transparente), pequeno/ (PNG a 12, 14 y 16 px de alto, a 1x y 2x, fondo
// transparente) y render.json con lo comprobado: tamaño de cada PNG, canal alfa donde va transparente, errores de
// consola. La lámina la arma lamina-final.mjs.
// Chromium 141 de Playwright (el de spindlelab-astro), todo file://, sin red.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const LOGO = path.resolve(process.argv[2] || path.join(path.dirname(new URL(import.meta.url).pathname), '..'));
const F = path.join(LOGO, 'final');
for (const d of ['avatar', 'documentos', 'pequeno']) fs.mkdirSync(path.join(F, d), { recursive: true });
const url = (f) => pathToFileURL(path.join(F, f)).href;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const errores = [];
const salida = { fecha: new Date().toISOString(), piezas: [] };

// Lee del PNG el tipo de color (6 = RGBA) y el tamaño, sin librerías.
function png(ruta) {
  const b = fs.readFileSync(ruta);
  return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20), tipoColor: b[25], bytes: b.length };
}

async function pieza(html, destino, w, h, { dpr = 1, transparente = false } = {}) {
  const tmp = path.join(F, '_tmp.html');
  fs.writeFileSync(tmp, `<!doctype html><meta charset="utf-8">${html}`);
  const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  p.on('console', m => { if (m.type() === 'error') errores.push(`${destino}: ${m.text()}`); });
  p.on('requestfailed', r => errores.push(`${destino}: no cargó ${r.url()}`));
  await p.goto(pathToFileURL(tmp).href);
  await p.waitForTimeout(120);
  await p.screenshot({ path: path.join(F, destino), omitBackground: transparente });
  await p.close();
  fs.unlinkSync(tmp);
  const m = png(path.join(F, destino));
  salida.piezas.push({ archivo: destino, ...m, transparente, alfaOk: transparente ? m.tipoColor === 6 : true });
}

const base = (fondo) => `<style>html,body{margin:0;width:100%;height:100%;background:${fondo}}body{display:grid;place-items:center}img{display:block}</style>`;

// 1 · favicon de 32 y 48, desde favicon.svg (el SVG llena la ventana)
for (const lado of [32, 48]) await pieza(`${base('#060606')}<img src="${url('favicon.svg')}" style="width:${lado}px;height:${lado}px">`, `favicon-${lado}.png`, lado, lado);

// 2 · iconos de pantalla de inicio: el signo grande (con su filete), centrado en #060606
//     apple-touch: el signo a 66 % del alto (iOS redondea las esquinas, no recorta más)
//     192 y 512 (Android, «maskable»): el signo a 60 % del alto, dentro del círculo seguro del 80 %
const icono = (lado, frac) => `${base('#060606')}<img src="${url('signo-blanco.svg')}" style="height:${Math.round(lado * frac)}px">`;
await pieza(icono(180, 0.66), 'apple-touch-icon.png', 180, 180);
await pieza(icono(192, 0.6), 'icon-192.png', 192, 192);
await pieza(icono(512, 0.6), 'icon-512.png', 512, 512);

// 3 · avatar de redes: cuadrado para subir (la red lo recorta en círculo) y redondo para usar donde se vea el borde
await pieza(icono(1080, 0.56), 'avatar/avatar-cuadrado-1080.png', 1080, 1080);
await pieza(`<style>html,body{margin:0;width:100%;height:100%;background:transparent}body{display:grid;place-items:center}div{width:1080px;height:1080px;border-radius:50%;background:#060606;display:grid;place-items:center}img{display:block}</style><div><img src="${url('signo-blanco.svg')}" style="height:${Math.round(1080 * 0.56)}px"></div>`,
  'avatar/avatar-redondo-1080.png', 1080, 1080, { transparente: true });

// 4 · documentos: el corte grande a 2400 px de ancho, fondo transparente, en negro (para papel) y en blanco
const ancho = (svg) => { const vb = fs.readFileSync(path.join(F, svg), 'utf8').match(/viewBox="([^"]+)"/)[1].split(' ').map(Number); return vb[2] / vb[3]; };
const prop = ancho('logo-grande-negro.svg');
for (const color of ['negro', 'blanco']) {
  fs.copyFileSync(path.join(F, `logo-grande-${color}.svg`), path.join(F, 'documentos', `spindlelab-${color}.svg`));
  await pieza(`<style>html,body{margin:0;background:transparent}img{display:block;width:2400px}</style><img src="${url(`logo-grande-${color}.svg`)}">`,
    `documentos/spindlelab-${color}-2400.png`, 2400, Math.round(2400 / prop), { transparente: true });
}

// 5 · el corte pequeño a 12, 14 y 16 px de alto, a 1x y 2x, fondo transparente (para firmas de correo y pies)
const propP = ancho('logo-pequeno-negro.svg');
for (const alto of [12, 14, 16]) for (const dpr of [1, 2]) for (const color of ['blanco', 'negro']) {
  const w = Math.ceil(alto * propP);
  await pieza(`<style>html,body{margin:0;background:transparent}img{display:block;height:${alto}px}</style><img src="${url(`logo-pequeno-${color}.svg`)}">`,
    `pequeno/spindlelab-pequeno-${color}-${alto}${dpr === 2 ? '@2x' : ''}.png`, w, alto, { dpr, transparente: true });
}

await nav.close();
salida.errores = errores;
salida.alfaMal = salida.piezas.filter(p => !p.alfaOk).map(p => p.archivo);
fs.writeFileSync(path.join(F, 'render.json'), JSON.stringify(salida, null, 1));
console.log(`${salida.piezas.length} PNG; errores: ${errores.length}; alfa mal: ${salida.alfaMal.length}`);
if (errores.length || salida.alfaMal.length) process.exit(1);
