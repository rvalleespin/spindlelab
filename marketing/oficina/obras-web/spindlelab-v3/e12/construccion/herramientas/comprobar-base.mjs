#!/usr/bin/env node
// Lo que una captura no muestra, en una página de A sobre el build (obra E12, corrida 2). Diego, 19-oct-2026.
//
//   · Lenis inerte (spec §5.2.4): una muesca de rueda (100 px) llega al 90 % en menos de 100 ms; cero a[href^="#"].
//   · El enlace para saltar es lo primero con Tab, se ve, y lleva la ruta (§2, lo común, 3; §5.2.2).
//   · El encabezado se pliega en la placa al bajar, desde 834 (§2, lo común, 1).
//   · El cursor (§4.2): aparece sobre una pieza con data-ir y dice su texto; se esconde con Tab y no vuelve con un
//     desplazamiento bajo el mouse quieto, sí con un movimiento real.
//   · Los videos (§3.1, §3.5): corren a la vista, con las fuentes del ancho; la pausa los para y dice su estado.
//   · Con prefers-reduced-motion: reduce (§1.6): ningún video corre, la pausa dice «Seguir el video», no hay círculo,
//     los bloques de entrada están en su lugar.
// Uso: node comprobar-base.mjs --ruta /v3/x/ [--salida medidas.json]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const DIST = join(REPO, 'spindlelab-astro', 'dist');
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i < 0 ? d : process.argv[i + 1]; };
const RUTA = arg('ruta', '/v3/');
const SALIDA = arg('salida');

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.json': 'application/json' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  const d = readFileSync(f);
  const tipo = TIPOS[extname(f)] || 'application/octet-stream';
  const r = req.headers.range;
  if (r && /^bytes=\d*-\d*$/.test(r)) {
    const [a, b] = r.slice(6).split('-'); const i = a ? +a : 0; const e = b ? +b : d.length - 1;
    res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${i}-${e}/${d.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - i + 1 });
    res.end(d.subarray(i, e + 1)); return;
  }
  res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': d.length, 'Accept-Ranges': 'bytes' }); res.end(d);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const URL_ = `http://127.0.0.1:${servidor.address().port}${RUTA}`;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const R = { ruta: RUTA, cuando: new Date().toISOString() };
const abrir = async (ancho, alto, extra = {}) => {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, ...extra });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  await p.goto(URL_, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  return { ctx, p, errores };
};
const videos = (p) => p.$$eval('[data-video]', (cs) => cs.map((c) => {
  const v = c.querySelector('video'); const b = c.querySelector('.pausa');
  return { fuente: (v.currentSrc || '').split('/').pop(), pausado: v.paused, corriendo: v.classList.contains('corriendo'),
    pausaVisible: !b.hidden, ariaPressed: b.getAttribute('aria-pressed'), ariaLabel: b.getAttribute('aria-label') };
}));
try {
  // --- 1440: Lenis, saltar, encabezado, cursor, videos
  {
    const { ctx, p, errores } = await abrir(1440, 900);
    R.html = await p.evaluate(() => ({
      anclasSueltas: document.querySelectorAll('a[href^="#"]').length,
      bodyLenisPrevent: document.body.hasAttribute('data-lenis-prevent'),
      claseHtml: document.documentElement.className,
      sinJsQuitado: !document.body.classList.contains('a-sin-js'),
    }));
    // una muesca de rueda
    await p.mouse.move(700, 450);
    const y0 = await p.evaluate(() => scrollY);
    const t0 = Date.now();
    await p.mouse.wheel(0, 100);
    const muestras = [];
    for (let i = 0; i < 40; i++) { muestras.push([Date.now() - t0, (await p.evaluate(() => scrollY)) - y0]); await p.waitForTimeout(10); }
    const al90 = muestras.find(([, y]) => y >= 90);
    R.rueda = { al90ms: al90 ? al90[0] : null, final: muestras[muestras.length - 1][1] };
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    // saltar
    await p.keyboard.press('Tab');
    R.saltar = await p.evaluate(() => {
      const a = document.activeElement; const r = a.getBoundingClientRect();
      return { clase: a.className, texto: a.textContent.trim(), href: a.getAttribute('href'), visible: r.top >= 0 && r.bottom <= innerHeight && r.width > 0 };
    });
    await p.keyboard.press('Escape');
    // encabezado plegado
    await p.mouse.move(5, 300);
    await p.evaluate(() => scrollTo(0, 400)); await p.waitForTimeout(900);
    R.encabezado = await p.evaluate(() => {
      const c = document.querySelector('.cab'); const pl = c && c.querySelector('.cab__placa');
      return c ? { plegada: c.classList.contains('cab--plegada'), opacidadPlaca: pl ? +getComputedStyle(pl).opacity : null,
        top: Math.round(c.getBoundingClientRect().top), alto: Math.round(c.getBoundingClientRect().height),
        rellenoFila: getComputedStyle(c.querySelector('.cab__fila')).paddingLeft } : null;
    });
    await p.screenshot({ path: SALIDA ? SALIDA.replace(/\.json$/, '-plegado-1440.png') : '/dev/null' });
    // cursor
    const pieza = await p.$('.medio-enlace[data-ir]');
    if (pieza) {
      await pieza.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
      const b = await pieza.boundingBox();
      await p.mouse.move(b.x + b.width / 2 - 40, b.y + b.height / 2 - 20, { steps: 4 });
      await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 6 });
      await p.waitForTimeout(500);
      const circulo = () => p.evaluate(() => {
        const c = document.querySelector('.circulo'); const r = c.getBoundingClientRect();
        return { visible: getComputedStyle(c).display !== 'none' && r.width > 40, texto: c.textContent, ancho: Math.round(r.width),
          centro: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)], teclado: document.body.classList.contains('teclado'),
          cursorPieza: getComputedStyle(document.querySelector('.medio-enlace[data-ir]')).cursor };
      });
      R.cursor = { sobrePieza: await circulo(), puntero: [Math.round(b.x + b.width / 2), Math.round(b.y + b.height / 2)] };
      if (SALIDA) await p.screenshot({ path: SALIDA.replace(/\.json$/, '-cursor-1440.png') });
      await p.keyboard.press('Tab'); await p.waitForTimeout(300);
      R.cursor.conTab = await circulo();
      await p.mouse.wheel(0, 40); await p.waitForTimeout(400);
      R.cursor.desplazadoBajoMouseQuieto = await circulo();
      // la pieza se movió con la rueda: el movimiento real va a un punto que siga dentro de ella
      const b2 = await pieza.boundingBox();
      const destino = [b2.x + b2.width / 2 + 30, Math.min(Math.max(b2.y + 40, b2.y + b2.height / 2), 860)];
      await p.mouse.move(destino[0], destino[1], { steps: 3 }); await p.waitForTimeout(400);
      R.cursor.conMovimientoReal = await circulo();
    }
    // videos
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
    for (const c of await p.$$('[data-video]')) { await c.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); }
    R.videos1440 = await videos(p);
    const caja = await p.$('[data-video]');
    if (caja) {
      const b = await caja.$('.pausa');
      await b.click(); await p.waitForTimeout(300);
      R.pausaApretada = (await videos(p))[0];
      await b.click(); await p.waitForTimeout(600);
      R.pausaOtraVez = (await videos(p))[0];
    }
    R.errores1440 = errores;
    await ctx.close();
  }
  // --- 390: las fuentes del teléfono
  {
    const { ctx, p, errores } = await abrir(390, 844, { hasTouch: true, isMobile: true });
    for (const c of await p.$$('[data-video]')) { await c.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); }
    R.videos390 = await videos(p);
    R.circulo390 = await p.evaluate(() => document.body.classList.contains('con-circulo'));
    R.errores390 = errores;
    await ctx.close();
  }
  // --- movimiento reducido
  {
    const { ctx, p, errores } = await abrir(1440, 900, { reducedMotion: 'reduce' });
    for (const c of await p.$$('[data-video]')) { await c.scrollIntoViewIfNeeded(); await p.waitForTimeout(800); }
    R.reducido = {
      videos: await videos(p),
      circulo: await p.evaluate(() => getComputedStyle(document.querySelector('.circulo')).display),
      entradasConEstilo: await p.$$eval('[data-entrada]', (els) => els.filter((e) => e.style.opacity || e.style.transform).length),
      transiciones: await p.evaluate(() => getComputedStyle(document.querySelector('.boton') || document.body).transitionDuration),
    };
    const b = await p.$('[data-video] .pausa');
    if (b) { await b.click(); await p.waitForTimeout(800); R.reducido.trasApretarSeguir = (await videos(p))[0]; }
    R.erroresReducido = errores;
    await ctx.close();
  }
} finally {
  await nav.close();
  servidor.close();
}
console.log(JSON.stringify(R, null, 1));
if (SALIDA) writeFileSync(SALIDA, JSON.stringify(R, null, 1) + '\n');
