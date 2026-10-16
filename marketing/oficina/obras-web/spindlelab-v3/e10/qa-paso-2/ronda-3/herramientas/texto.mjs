// Ronda 2 · texto visible: prototipo contra dist/v3, con JavaScript ENCENDIDO en los dos (método distinto al de
// texto-igual.mjs, que lo apaga). innerText del body después de recorrer la página; del prototipo se quitan solo
// los rótulos [data-rotulo-foto] y la cinta [data-cinta]/.cinta-caja; del build, el aviso de cookies.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const OUT = process.argv[2];
const PAG = { home: '/v3/', acomp: '/v3/servicios/acompanamiento-mensual/', trabajo: '/v3/trabajo/' };
const PROTO = { home: 'home.html', acomp: 'acompanamiento-mensual.html', trabajo: 'trabajo.html' };
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
async function leer(url, quitar, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage(); await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); } });
  const t = await p.evaluate((q) => { document.querySelectorAll(q).forEach(e => e.remove()); return document.body.innerText; }, quitar);
  const extra = await p.evaluate(() => ({ rotulos: [...document.querySelectorAll('[data-rotulo-foto]')].map(e => e.textContent.trim()), cinta: [...document.querySelectorAll('[data-cinta]')].map(e => e.innerText.trim().slice(0,80)) }));
  await ctx.close(); return t;
}
const res = [];
for (const dir of ['taller', 'pizarra']) for (const [k, ruta] of Object.entries(PAG)) for (const w of [1440, 390]) {
  const build = await leer('http://127.0.0.1:8781' + ruta, '#cookie-banner,[data-cookie],.cookie-banner', w);
  const proto = await leer(`http://127.0.0.1:8780/${dir}/${PROTO[k]}`, '[data-rotulo-foto],[data-cinta],.cinta-caja', w);
  res.push({ dir, pag: k, w, build, proto });
}
writeFileSync(`${OUT}/texto.json`, JSON.stringify(res));
await b.close();
