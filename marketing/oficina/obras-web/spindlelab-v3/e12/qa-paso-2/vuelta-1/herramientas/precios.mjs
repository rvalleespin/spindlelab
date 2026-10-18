// QA E12 paso 2 (Javiera). Criterio 11: precios y nombres de servicio de A y B contra oferta-v3.json y servicios-v3.json,
// como texto. Lee el innerText de cada vista a 1440 y a 390 y busca cada cifra con «$» y cada «Se cotiza».
// Uso: node precios.mjs <base-url-e12-direcciones> <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, salida] = process.argv.slice(2);
const D = '/home/user/spindlelab/spindlelab-astro/src/data/';
const oferta = JSON.parse(fs.readFileSync(D + 'oferta-v3.json', 'utf8'));
const servicios = JSON.parse(fs.readFileSync(D + 'servicios-v3.json', 'utf8'));
const norm = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
const fuente = norm(JSON.stringify(oferta) + ' ' + JSON.stringify(servicios)).replace(/\\"/g, '"');
const planes = oferta.momentos[0].planes;
const items = oferta.momentos.flatMap((m) => m.items || []);
const RUTA = { home: '', 'desarrollo-web': 'servicios/desarrollo-web/', trabajo: 'trabajo/', praxi: 'trabajo/praxi/', sesenta: 'trabajo/sesenta/' };
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { fecha: new Date().toISOString(), vistas: {} };
for (const d of ['a', 'b']) for (const [v, r] of Object.entries(RUTA)) for (const w of [1440, 390]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(`${base}/proto/${d}/${r}`, { waitUntil: 'load' }); await p.waitForTimeout(600);
  const t = norm(await p.evaluate(() => document.body.innerText));
  const cifras = [...new Set(t.match(/(?:Desde )?\$[\d.]+(?:\/mes)?(?: \+ IVA)?(?: · una vez)?|Se cotiza/g) || [])];
  const fuera = cifras.filter((c) => !fuente.includes(c));
  const o = { cifras, fuera };
  if (v === 'desarrollo-web') {
    o.planes = planes.map((pl) => ({ n: pl.n, nombre: t.includes(norm(pl.n)), precio: t.includes(norm(pl.p)), d: t.includes(norm(pl.d)), puntos: pl.puntos.filter((x) => !t.toLowerCase().includes(norm(x).toLowerCase())) }));
  }
  if (v === 'home') o.servicios = items.map((it) => ({ n: it.n, nombre: t.includes(norm(it.n)) }));
  R.vistas[`${d}-${v}-${w}`] = o;
  console.log(d, v, w, 'cifras', JSON.stringify(cifras), 'fuera', JSON.stringify(fuera), o.planes ? JSON.stringify(o.planes.map((x) => [x.n, x.nombre, x.precio, x.d, x.puntos.length])) : '', o.servicios ? JSON.stringify(o.servicios.map((x) => x.n + ':' + x.nombre)) : '');
  await p.context().close();
}
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
await b.close();
