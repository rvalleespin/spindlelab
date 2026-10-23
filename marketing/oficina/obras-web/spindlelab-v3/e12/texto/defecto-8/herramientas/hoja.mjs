// Una hoja: por página, el title leído del DOM (lo que muestra la pestaña y la tarjeta al compartir) sobre su primera
// pantalla a los ocho anchos. Uso: node hoja.mjs <carpeta de capturas> <salida.jpg>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [DIR, SALIDA] = process.argv.slice(2);
const t = JSON.parse(fs.readFileSync(path.join(DIR, 'titulos.json'), 'utf8'));
const slugs = [...new Set(t.map((x) => x.slug))];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
let html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#f2f2f2;font:14px system-ui,sans-serif;color:#111;width:2352px}
h2{font-size:22px;margin:28px 0 4px;font-weight:600} .t{font:16px ui-monospace,monospace;margin:0 0 4px} .t b{background:#ffe;padding:1px 4px}
.fila{display:flex;gap:10px;align-items:flex-start} figure{margin:0} figure img{display:block;border:1px solid #bbb;height:250px} figcaption{font-size:12px;color:#555;margin-top:2px}</style>
<h1 style="font-size:26px;margin:0">E12 · defecto 8 · el title de tres servicios en el build de prueba (texto de Clara del 23-oct)</h1>`;
for (const s of slugs) {
  const filas = t.filter((x) => x.slug === s);
  html += `<h2>/v3/servicios/${s}/</h2><p class="t">&lt;title&gt; y og:title: <b>${esc(filas[0].title)}</b></p><p class="t">h1: ${esc(filas[0].h1)}</p><div class="fila">`;
  for (const f of filas) html += `<figure><img src="${s}-${f.ancho}.png"><figcaption>${f.ancho} × ${f.alto}</figcaption></figure>`;
  html += `</div>`;
}
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await nav.newPage({ viewport: { width: 2400, height: 800 } });
const archivo = path.join(DIR, 'hoja.html');
fs.writeFileSync(archivo, html);
await p.goto(pathToFileURL(archivo).href, { waitUntil: 'load' });
await p.screenshot({ path: SALIDA, fullPage: true, type: 'jpeg', quality: 72 });
await nav.close();
console.log('hoja:', SALIDA, fs.statSync(SALIDA).size, 'bytes');
