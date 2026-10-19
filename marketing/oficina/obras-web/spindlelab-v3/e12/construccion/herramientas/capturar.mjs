#!/usr/bin/env node
// Capturas de las páginas de A sobre el build (obra E12, corrida 2). Diego, 19-oct-2026.
//
// Sirve spindlelab-astro/dist en un puerto libre, abre cada ruta con el Chromium de Playwright a cada ancho, baja la
// página entera (para que carguen las imágenes diferidas y corran las entradas), vuelve arriba y guarda la captura de
// página completa y la de la primera pantalla. Además mide lo que el ojo no ve en una captura: desborde horizontal
// (también sin el overflow-x: clip de global.css), cuántos <h1>, y el alto del encabezado.
//
// Uso (desde cualquier carpeta):
//   node capturar.mjs --rutas /v3/x/,/v3/y/ --anchos 390,1440 --salida <carpeta>
//   opciones: --alto 900 (alto de la ventana; por defecto 900, y 844 bajo 834 de ancho)
//             --con-aviso        deja abierto el aviso de cookies (por defecto se cierra con «rechazar» guardado)
//             --sin-movimiento   emula prefers-reduced-motion: reduce
//             --chequeo <json>   responde /api/chequeo con ese archivo (el resultado se pinta sin salir a la red)
//             --dominio <txt>    escribe ese dominio en el chequeo y lo envía antes de capturar
// Escribe <salida>/medidas.json con lo medido por ruta y ancho.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const DIST = join(ASTRO, 'dist');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const arg = (n, d = null) => {
  const i = process.argv.indexOf(`--${n}`);
  if (i < 0) return d;
  const v = process.argv[i + 1];
  return v !== undefined && !v.startsWith('--') ? v : true;
};
const RUTAS = String(arg('rutas', '/v3/')).split(',');
const ANCHOS = String(arg('anchos', '390,1440')).split(',').map(Number);
const SALIDA = arg('salida', join(AQUI, '..', 'capturas', 'sin-nombre'));
const ALTO = arg('alto') ? Number(arg('alto')) : null;
const CON_AVISO = arg('con-aviso', false) === true;
const SIN_MOV = arg('sin-movimiento', false) === true;
const CHEQUEO = typeof arg('chequeo') === 'string' ? readFileSync(arg('chequeo'), 'utf8') : null;
const DOMINIO = typeof arg('dominio') === 'string' ? arg('dominio') : null;
mkdirSync(SALIDA, { recursive: true });

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain' };
const servidor = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(DIST, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end('404'); return; }
  const datos = readFileSync(f);
  const tipo = TIPOS[extname(f)] || 'application/octet-stream';
  // Rangos: el <video> los pide
  const rango = req.headers.range;
  if (rango && /^bytes=\d*-\d*$/.test(rango)) {
    const [a, b] = rango.slice(6).split('-');
    const ini = a ? Number(a) : 0;
    const fin = b ? Number(b) : datos.length - 1;
    res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${ini}-${fin}/${datos.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': fin - ini + 1 });
    res.end(datos.subarray(ini, fin + 1));
    return;
  }
  res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': datos.length, 'Accept-Ranges': 'bytes' });
  res.end(datos);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;

const navegador = await chromium.launch({ executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required'] });
const medidas = {};
try {
  for (const ruta of RUTAS) {
    for (const ancho of ANCHOS) {
      const alto = ALTO || (ancho < 834 ? 844 : 900);
      const ctx = await navegador.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1,
        reducedMotion: SIN_MOV ? 'reduce' : 'no-preference' });
      if (!CON_AVISO) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
      const pag = await ctx.newPage();
      const errores = [];
      pag.on('pageerror', (e) => errores.push(String(e)));
      pag.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
      if (CHEQUEO) await pag.route('**/api/chequeo**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: CHEQUEO }));
      await pag.goto(BASE + ruta, { waitUntil: 'networkidle' });
      await pag.evaluate(() => document.fonts.ready);
      // bajar la página entera, despacio, y volver arriba
      await pag.evaluate(async () => {
        const paso = Math.round(window.innerHeight * 0.6);
        for (let y = 0; y < document.documentElement.scrollHeight; y += paso) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await pag.waitForTimeout(700);
      if (DOMINIO) {
        await pag.fill('#chq-dominio', DOMINIO);
        await pag.click('#chq-btn');
        await pag.waitForTimeout(800);
        await pag.evaluate(() => window.scrollTo(0, 0));
        await pag.waitForTimeout(400);
      }
      const nombre = `${ruta.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'raiz'}-${ancho}`;
      await pag.screenshot({ path: join(SALIDA, `${nombre}-primera.png`) });
      await pag.screenshot({ path: join(SALIDA, `${nombre}.png`), fullPage: true });
      const m = await pag.evaluate(() => {
        const d = document.documentElement;
        const conClip = d.scrollWidth - d.clientWidth;
        d.style.overflowX = 'visible'; document.body.style.overflowX = 'visible';
        const sinClip = Math.max(d.scrollWidth, document.body.scrollWidth) - d.clientWidth;
        const cab = document.querySelector('.cab');
        return {
          desborde: conClip, desbordeSinClip: sinClip, h1: document.querySelectorAll('h1').length,
          altoCab: cab ? Math.round(cab.getBoundingClientRect().height) : null, alto: d.scrollHeight,
          letras: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`),
        };
      });
      m.errores = errores;
      medidas[`${ruta} @ ${ancho}`] = m;
      console.log(ruta, ancho, JSON.stringify(m));
      await ctx.close();
    }
  }
} finally {
  await navegador.close();
  servidor.close();
}
writeFileSync(join(SALIDA, 'medidas.json'), JSON.stringify(medidas, null, 1) + '\n');
