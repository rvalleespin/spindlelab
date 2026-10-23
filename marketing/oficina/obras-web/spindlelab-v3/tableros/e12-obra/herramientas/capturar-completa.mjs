// E12 · Tablero de la obra construida: la página entera de cada ruta a 1440, para cortarla en tramos (tramos.py), y la
// prueba de las de 390 de Mauro (con --ancho 390: se capturan igual y se comparan con las suyas, sin reemplazarlas).
// Lucía (dirección de arte), 23-oct-2026.
//
// Es el método de las capturas de cierre de Mauro (e12/cierre/herramientas/capturas.mjs), con su servidor, su navegador y
// la lista de rutas de Javiera (e12/qa-obra/vuelta-2/herramientas/comun.mjs, sin cambios), y una cosa más: antes de la
// captura espera a que **cada imagen de la página esté cargada y decodificada**. Con su script tal cual, en tres obreros
// en paralelo, la primera corrida a 1440 dejó las placas de Ocelo vacías (las imágenes no habían llegado); la captura de
// Mauro a 720 sí las tiene. Por eso esta va de a una ruta, y anota cuántas imágenes quedaron sin cargar: tiene que ser 0.
//
// Como las de Mauro: el aviso de cookies ya contestado (rechazado); 1440 × 900 o 390 × 844 (táctil), dpr 1; la página
// recorrida de arriba abajo para que cada bloque llegue a su estado final, y de vuelta arriba.
// Salida: <salida>/completa/<ruta>-<ancho>.png y <salida>/capturas.json (con el formato de Mauro, más `sinCargar`).
// Uso: node capturar-completa.mjs --salida /ruta/a/crudas [--ancho 1440|390] [--rutas /v3/,/v3/trabajo/]
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { RUTAS, nombre, servir, lanzar, recorrer } from '../../../e12/qa-obra/vuelta-2/herramientas/comun.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i < 0 ? d : process.argv[i + 1]; };
const SALIDA = arg('salida');
if (!SALIDA) { console.error('falta --salida'); process.exit(2); }
const rutas = arg('rutas') ? arg('rutas').split(',') : RUTAS;
const ANCHO = Number(arg('ancho', '1440'));
const ALTO = { 390: 844, 1440: 900 }[ANCHO];
if (!ALTO) { console.error('--ancho 1440 o 390'); process.exit(2); }
const TACTIL = ANCHO < 834;
mkdirSync(join(SALIDA, 'completa'), { recursive: true });

const srv = await servir();
const nav = await lanzar();
const R = [];

async function capturar(ruta) {
  const ctx = await nav.newContext({ viewport: { width: ANCHO, height: ALTO }, deviceScaleFactor: 1, hasTouch: TACTIL, isMobile: TACTIL });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const consola = [], fallidos = [];
  p.on('console', (m) => { if (m.type() === 'error') consola.push(m.text()); });
  p.on('pageerror', (e) => consola.push(`pageerror: ${e}`));
  p.on('response', (r) => { if (r.status() >= 400) fallidos.push(`${r.status()} ${r.url()}`); });
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await recorrer(p);
  await p.waitForLoadState('networkidle');
  // cada <img> cargada y decodificada (las lazy ya se pidieron al recorrer); hasta 20 s
  const sinCargar = await p.evaluate(async () => {
    const imgs = [...document.images];
    const t0 = Date.now();
    while (Date.now() - t0 < 20000 && imgs.some((i) => !i.complete)) await new Promise((r) => setTimeout(r, 100));
    await Promise.all(imgs.filter((i) => i.complete && i.naturalWidth).map((i) => i.decode().catch(() => {})));
    return imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.currentSrc || i.src);
  });
  await p.waitForTimeout(600);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  const aviso = await p.evaluate(() => { const b = document.getElementById('cookie-banner'); return b ? getComputedStyle(b).display !== 'none' && b.getBoundingClientRect().height > 0 : false; });
  await p.screenshot({ path: join(SALIDA, 'completa', `${nombre(ruta)}-${ANCHO}.png`), fullPage: true });
  await ctx.close();
  return { alto, aviso, consola, fallidos, sinCargar };
}

for (const r of rutas) {
  try { R.push({ ruta: r, ancho: ANCHO, ...(await capturar(r)) }); }
  catch (e) { R.push({ ruta: r, ancho: ANCHO, error: String(e) }); }
  process.stdout.write('.');
}
await nav.close(); await srv.cerrar();
writeFileSync(join(SALIDA, 'capturas.json'), JSON.stringify({ cuando: new Date().toISOString(), servidor404: srv.pedidos, R }, null, 1));
console.log(`\n${R.length} rutas; errores: ${R.filter((x) => x.error).length}; con aviso a la vista: ${R.filter((x) => x.aviso).length}; ` +
  `consola: ${R.filter((x) => x.consola?.length).length}; pedidos ≥ 400: ${R.filter((x) => x.fallidos?.length).length}; ` +
  `imágenes sin cargar: ${R.reduce((s, x) => s + (x.sinCargar?.length || 0), 0)}; 404 del servidor: ${srv.pedidos.length}`);
