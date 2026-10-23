// Mauro, cierre de la obra E12 (23-oct-2026). Las capturas finales de las 27 rutas de /v3/ a 390, 768 y 1440, desde el
// build servido en local: la primera pantalla y la página entera de cada una. Usa el servidor, el navegador y la lista de
// rutas de Javiera (qa-obra/vuelta-2/herramientas/comun.mjs), sin cambiarlos, para que las capturas salgan del mismo
// build y de la misma manera que las de su acta.
//
// Cómo se toma cada una:
// - El aviso de cookies ya contestado (rechazado: `spindlelab_consent = denied`, como en las herramientas de Javiera):
//   la captura muestra la página. El aviso abierto lo midió Javiera en los ocho tamaños (`aviso.mjs`, vuelta 2).
// - Bajo 834 en un contexto táctil (sin cursor propio), como lo vería un teléfono o una tableta.
// - La primera pantalla, a los 1,2 s de cargada (los videos de la portada y de los casos ya corren); la página entera,
//   después de recorrerla de arriba abajo para que cada entrada llegue a su estado final, y de vuelta arriba.
// Alto de cada ancho: 390 × 844, 768 × 1024 y 1440 × 900 (spec §4.4).
//
// Salida (en bruto, al scratchpad o a donde diga --salida): <salida>/primera/<ruta>-<ancho>.png y
// <salida>/completa/<ruta>-<ancho>.png, más capturas.json con el alto de cada página y lo que hubo en la consola.
// Las que van al repo las achica y comprime reducir.py.
// Uso: node capturas.mjs --salida /ruta/a/crudas [--rutas /v3/,/v3/trabajo/] [--anchos 390,768,1440]
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { RUTAS, nombre, servir, lanzar, recorrer } from '../../qa-obra/vuelta-2/herramientas/comun.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i < 0 ? d : process.argv[i + 1]; };
const SALIDA = arg('salida');
if (!SALIDA) { console.error('falta --salida'); process.exit(2); }
const rutas = arg('rutas') ? arg('rutas').split(',') : RUTAS;
const ALTOS = { 390: 844, 768: 1024, 1440: 900 };
const anchos = (arg('anchos') ? arg('anchos').split(',') : Object.keys(ALTOS)).map(Number);
mkdirSync(join(SALIDA, 'primera'), { recursive: true });
mkdirSync(join(SALIDA, 'completa'), { recursive: true });

const srv = await servir();
const nav = await lanzar();
const R = [];

async function capturar(ruta, ancho) {
  const tactil = ancho < 834;
  const ctx = await nav.newContext({ viewport: { width: ancho, height: ALTOS[ancho] }, hasTouch: tactil, isMobile: tactil, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const consola = [], fallidos = [];
  p.on('console', (m) => { if (m.type() === 'error') consola.push(m.text()); });
  p.on('pageerror', (e) => consola.push(`pageerror: ${e}`));
  p.on('response', (r) => { if (r.status() >= 400) fallidos.push(`${r.status()} ${r.url()}`); });
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const n = `${nombre(ruta)}-${ancho}`;
  await p.screenshot({ path: join(SALIDA, 'primera', `${n}.png`) });
  await recorrer(p);
  await p.waitForTimeout(400);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  const aviso = await p.evaluate(() => { const b = document.getElementById('cookie-banner'); return b ? getComputedStyle(b).display !== 'none' && b.getBoundingClientRect().height > 0 : false; });
  await p.screenshot({ path: join(SALIDA, 'completa', `${n}.png`), fullPage: true });
  await ctx.close();
  return { alto, aviso, consola, fallidos };
}

const tareas = [];
for (const r of rutas) for (const a of anchos) tareas.push([r, a]);
let i = 0;
async function obrero() {
  while (i < tareas.length) {
    const [r, a] = tareas[i++];
    try { R.push({ ruta: r, ancho: a, ...(await capturar(r, a)) }); }
    catch (e) { R.push({ ruta: r, ancho: a, error: String(e) }); }
    process.stdout.write('.');
  }
}
await Promise.all([obrero(), obrero(), obrero()]);
await nav.close(); await srv.cerrar();
R.sort((x, y) => RUTAS.indexOf(x.ruta) - RUTAS.indexOf(y.ruta) || x.ancho - y.ancho);
writeFileSync(join(SALIDA, 'capturas.json'), JSON.stringify({ cuando: new Date().toISOString(), servidor404: srv.pedidos, R }, null, 1));
console.log(`\n${R.length} pares; errores: ${R.filter((x) => x.error).length}; con aviso a la vista: ${R.filter((x) => x.aviso).length}; ` +
  `consola: ${R.filter((x) => x.consola?.length).length}; pedidos ≥ 400: ${R.filter((x) => x.fallidos?.length).length}; 404 del servidor: ${srv.pedidos.length}`);
