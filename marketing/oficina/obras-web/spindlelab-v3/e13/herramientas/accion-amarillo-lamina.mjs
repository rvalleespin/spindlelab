// E13 · 30-oct · lámina del botón de acción en sus estados, para mirarlo antes de fijarlo. Lucía, 30-oct-2026.
// Lee los candidatos de accion-amarillo.json (accion-amarillo.py) y pinta, en las letras de A y a tamaño real, el botón
// «HABLEMOS DE TU SITIO →» con cada paso de L (reposo, −0,02 … −0,20) y con cada aclarado, sobre el lienzo, sobre la
// placa y sobre el póster del hilo bajo el velo de 0,88; y el elegido en sus tres estados más el foco (contorno blanco
// de 2 px a 3 px). Es para el ojo, no para medir: los números están en el JSON.
// Uso: node accion-amarillo-lamina.mjs <accion-amarillo.json> <poster.webp> <salida.png>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [json, poster, salida] = process.argv.slice(2);
const R = JSON.parse(fs.readFileSync(json, 'utf8'));
const fuentes = '/home/user/spindlelab/spindlelab-astro/public/fonts';
const b64 = (f) => fs.readFileSync(f).toString('base64');
const flecha = '<svg viewBox="0 0 12 12" width="12" height="12" style="stroke:currentColor;stroke-width:1.5;fill:none"><path d="M1 6h9.5M6.5 2l4 4-4 4"/></svg>';
const boton = (fondo, extra = '') => `<span class="b" style="background:${fondo};${extra}">Hablemos de tu sitio ${flecha}</span>`;
const fila = (titulo, c) => `<div class="fila"><span class="t">${titulo}</span>${['#060606', '#141414', 'video'].map((f) => `<div class="fondo ${f === 'video' ? 'video' : ''}" style="${f === 'video' ? '' : 'background:' + f}">${boton(c.hex)}</div>`).join('')}<span class="n">${c.hex} · texto ${c.textoSobre}:1 · vs reposo ${c.contraReposo}:1 · ΔE ${c.deOkContraReposo}</span></div>`;
const html = `<!doctype html><html><head><style>
@font-face { font-family: 'DM Mono'; src: url(data:font/woff2;base64,${b64(fuentes + '/dm-mono-500-latin.woff2')}) format('woff2'); font-weight: 500; }
body { margin: 0; padding: 24px; background: #060606; color: #989898; font: 500 11px 'DM Mono', monospace; letter-spacing: .03em; }
.fila { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.t { width: 120px; text-transform: uppercase; }
.n { width: 360px; }
.fondo { padding: 12px 16px; width: 260px; }
.video { background: linear-gradient(rgba(6,6,6,.88), rgba(6,6,6,.88)), url(data:image/webp;base64,${b64(poster)}) 20% 75% / 900px auto; }
.b { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 16px; border-radius: 4px; color: #060606; text-transform: uppercase; }
.foco { outline: 2px solid #fff; outline-offset: 3px; }
h2 { font: 500 11px 'DM Mono'; text-transform: uppercase; color: #fff; margin: 24px 0 12px; }
</style></head><body>
<h2>Oscurecer en OKLCH (mismo tono)</h2>
${fila('reposo', { hex: R.accion.hex, textoSobre: 16.2, contraReposo: 1, deOkContraReposo: 0 })}
${R.candidatos.filter((c) => c.modo === 'oscurecer').map((c) => fila('L ' + c.paso, c)).join('')}
<h2>Aclarar hacia el blanco</h2>
${R.candidatos.filter((c) => c.modo === 'aclarar').map((c) => fila('blanco ' + c.paso * 100 + ' %', c)).join('')}
<h2>Elegido: reposo · al pasar · apretado · foco</h2>
<div class="fila">${['reposo', 'pasar', 'apretado'].map((k) => `<div class="fondo video">${boton(R.elegido[k])}</div>`).join('')}<div class="fondo video">${boton(R.elegido.reposo, '')}</div></div>
<div class="fila">${['reposo', 'pasar', 'apretado'].map((k) => `<div class="fondo" style="background:#060606">${boton(R.elegido[k])}</div>`).join('')}<div class="fondo" style="background:#060606"><span class="b foco" style="background:${R.elegido.reposo}">Hablemos de tu sitio ${flecha}</span></div></div>
</body></html>`;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await nav.newPage({ viewport: { width: 1420, height: 900 }, deviceScaleFactor: 1 });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: salida, fullPage: true });
await nav.close();
console.log('lámina en', salida);
