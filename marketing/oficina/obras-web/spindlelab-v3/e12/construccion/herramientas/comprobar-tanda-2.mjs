#!/usr/bin/env node
// Lo que una captura no muestra en la home y en /v3/trabajo/ de A, sobre el build (obra E12, tanda 2). Diego, 19-oct-2026.
//
//   /v3/trabajo/ (spec §2.2, §4.1, §4.2)
//     · el filtro filtra de verdad: cuántas piezas se ven con cada botón, aria-pressed, y que ninguna pise a otra;
//     · el orden del documento es el de Clara y el teclado lo recorre así;
//     · al pasar el mouse por una pieza: se acorta 24 px y las demás quedan bajo el velo; spindlelab.cl no es enlace;
//     · el nombre accesible de Verifica y Cumple dice que es un sitio aparte;
//     · desplazamiento del diseño al cargar (CLS), a 1440 y a 834.
//   /v3/ (spec §2.1, §3.1, §3.2)
//     · la ficha de la cinta cambia con el tramo (a los 2, 4… s) y el tramo de Verifica y Cumple sale con la flecha;
//     · el orden de tabulación de la portada: la pausa antes que el campo del chequeo;
//     · el chequeo dentro de la pantalla a 1440 × 900, 390 × 844 y 360 × 800, con el aviso de cookies cerrado y abierto;
//     · desplazamiento del diseño al cargar (CLS).
// Uso: node comprobar-tanda-2.mjs [--salida medidas.json]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const DIST = join(REPO, 'spindlelab-astro', 'dist');
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const i = process.argv.indexOf('--salida');
const SALIDA = i > 0 ? process.argv[i + 1] : null;

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.json': 'application/json', '.jpg': 'image/jpeg' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  const d = readFileSync(f);
  const tipo = TIPOS[extname(f)] || 'application/octet-stream';
  const r = req.headers.range;
  if (r && /^bytes=\d*-\d*$/.test(r)) {
    const [a, b] = r.slice(6).split('-'); const s = a ? +a : 0; const e = b ? +b : d.length - 1;
    res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${s}-${e}/${d.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - s + 1 });
    res.end(d.subarray(s, e + 1)); return;
  }
  res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': d.length, 'Accept-Ranges': 'bytes' }); res.end(d);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const R = { cuando: new Date().toISOString() };

const abrir = async (ruta, ancho, alto, { aviso = false, extra = {} } = {}) => {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, ...extra });
  if (!aviso) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  // CLS: los desplazamientos sin entrada del usuario, desde el principio de la carga
  await ctx.addInitScript(() => {
    window.__cls = 0; window.__desplazados = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => {
      if (e.hadRecentInput) return;
      window.__cls += e.value;
      window.__desplazados.push({ valor: +e.value.toFixed(4), nodos: (e.sources || []).map((s) => s.node && (s.node.className || s.node.nodeName)).slice(0, 3) });
    })).observe({ type: 'layout-shift', buffered: true });
  });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(600);
  return { ctx, p, errores };
};
const cls = (p) => p.evaluate(() => ({ cls: +window.__cls.toFixed(4), desplazados: window.__desplazados }));

try {
  // ---------------------------------------------------------------- /v3/trabajo/
  R.trabajo = {};
  for (const [ancho, alto] of [[1440, 900], [834, 1112]]) {
    const { ctx, p, errores } = await abrir('/v3/trabajo/', ancho, alto);
    R.trabajo[`cls${ancho}`] = await cls(p);
    if (ancho === 1440) {
      R.trabajo.orden = await p.$$eval('.muro .pieza', (ps) => ps.map((x) => x.querySelector('.pieza__nombre .tinta').textContent.trim()));
      const estado = () => p.evaluate(() => {
        const vis = [...document.querySelectorAll('.muro .pieza')].filter((x) => !x.hidden);
        const cajas = vis.map((x) => x.getBoundingClientRect());
        let pisadas = 0;
        for (let a = 0; a < cajas.length; a++) for (let b = a + 1; b < cajas.length; b++) {
          const A = cajas[a], B = cajas[b];
          if (A.left < B.right - 1 && B.left < A.right - 1 && A.top < B.bottom - 1 && B.top < A.bottom - 1) pisadas++;
        }
        const cols = vis.map((x) => Math.round(x.getBoundingClientRect().left));
        return {
          visibles: vis.length, nombres: vis.map((x) => x.querySelector('.pieza__nombre .tinta').textContent.trim()), pisadas,
          columnas: [...new Set(cols)].length,
          // separación vertical entre piezas seguidas de una misma columna
          separaciones: (() => {
            const porCol = {};
            vis.forEach((x) => { const r = x.getBoundingClientRect(); (porCol[Math.round(r.left)] ||= []).push(r); });
            return Object.values(porCol).flatMap((rs) => rs.sort((a, b) => a.top - b.top).slice(1).map((r, k) => Math.round(r.top - rs[k].bottom)));
          })(),
          pulsado: [...document.querySelectorAll('[data-filtro] button')].filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.getAttribute('aria-label')),
        };
      });
      R.trabajo.filtro = { inicio: await estado() };
      for (const tipo of ['cliente', 'propio', 'concepto', 'todo']) {
        await p.click(`[data-filtro] button[data-tipo="${tipo}"]`);
        await p.waitForTimeout(250);
        R.trabajo.filtro[tipo] = await estado();
      }
      // el teclado: el orden de las piezas con Tab
      await p.evaluate(() => { scrollTo(0, 0); document.activeElement && document.activeElement.blur(); });
      const tab = [];
      for (let k = 0; k < 40 && tab.length < 9; k++) {
        await p.keyboard.press('Tab');
        const n = await p.evaluate(() => { const a = document.activeElement; return a && a.matches('.medio-enlace') ? a.closest('.pieza').querySelector('.pieza__nombre .tinta').textContent.trim() : null; });
        if (n) tab.push(n);
      }
      R.trabajo.ordenTab = tab;
      R.trabajo.verifica = await p.evaluate(() => {
        const a = document.querySelector('a[href="https://verifica.spindlelab.cl/"]');
        const ids = a.getAttribute('aria-labelledby').split(' ');
        return { href: a.href, nombre: ids.map((id) => document.getElementById(id).textContent.trim()).join(' '), circulo: a.dataset.ir, flecha: !!a.closest('.pieza').querySelector('.icono-flecha--fuera') };
      });
      R.trabajo.spindlelab = await p.evaluate(() => {
        const x = [...document.querySelectorAll('.muro .pieza')].find((y) => y.querySelector('.pieza__nombre .tinta').textContent.trim() === 'spindlelab.cl');
        return { enlace: !!x.querySelector('a'), velo: !!x.querySelector('.pieza__velo'), ir: !!x.querySelector('[data-ir]') };
      });
      // al pasar el mouse
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
      await p.mouse.move(5, 5);
      const enlace = await p.$('.muro .medio-enlace');
      const b = await enlace.boundingBox();
      await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 5 });
      await p.waitForTimeout(600);
      R.trabajo.hover = await p.evaluate(() => {
        const ps = [...document.querySelectorAll('.muro .pieza')];
        return ps.map((x) => {
          const v = x.querySelector('.pieza__velo'); const m = x.querySelector('.medio');
          return { nombre: x.querySelector('.pieza__nombre .tinta').textContent.trim(), velo: v ? +getComputedStyle(v).opacity : null, recorte: m.style.clipPath || '' };
        });
      });
      if (SALIDA) await p.screenshot({ path: SALIDA.replace(/\.json$/, '-trabajo-hover-1440.png') });
    }
    R.trabajo[`errores${ancho}`] = errores;
    await ctx.close();
  }

  // ---------------------------------------------------------------- /v3/
  R.home = {};
  {
    const { ctx, p, errores } = await abrir('/v3/', 1440, 900);
    R.home.cls1440 = await cls(p);
    // tabulación: los controles de la portada, en orden
    await p.evaluate(() => document.activeElement && document.activeElement.blur());
    const orden = [];
    for (let k = 0; k < 14; k++) {
      await p.keyboard.press('Tab');
      orden.push(await p.evaluate(() => { const a = document.activeElement; return a.id || a.getAttribute('aria-label') || a.textContent.trim().slice(0, 24); }));
    }
    R.home.tab = orden;
    // la cinta: la ficha a lo largo de los tramos
    const cinta = await p.$('[data-cinta]');
    await cinta.scrollIntoViewIfNeeded();
    const fichas = [];
    for (let k = 0; k < 9; k++) {
      await p.waitForTimeout(2000);
      fichas.push(await p.evaluate(() => {
        const v = document.querySelector('[data-cinta] video');
        const f = document.querySelector('[data-cinta-ficha]');
        return { t: +v.currentTime.toFixed(1), linea: f.querySelector('[data-ficha-linea]').textContent, nombre: f.querySelector('[data-ficha-texto]').textContent,
          href: f.querySelector('[data-ficha-nombre]').getAttribute('href'), fuera: !f.querySelector('[data-ficha-fuera]').hidden,
          nota: f.querySelector('[data-ficha-nota]').hidden ? '' : f.querySelector('[data-ficha-nota]').textContent };
      }));
    }
    R.home.cinta = fichas;
    R.home.errores1440 = errores;
    await ctx.close();
  }
  // el chequeo en la primera pantalla, con el aviso cerrado y abierto
  R.home.chequeo = {};
  for (const [ancho, alto] of [[1440, 900], [390, 844], [360, 800]]) {
    for (const aviso of [false, true]) {
      const movil = ancho < 834;
      const { ctx, p } = await abrir('/v3/', ancho, alto, { aviso, extra: { isMobile: movil, hasTouch: movil } });
      R.home.chequeo[`${ancho}x${alto}${aviso ? ' con aviso' : ''}`] = await p.evaluate(() => {
        const c = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return r.height ? { arriba: Math.round(r.top), abajo: Math.round(r.bottom) } : null; };
        const av = document.getElementById('cookie-banner');
        const aviso = av && !av.hidden && getComputedStyle(av).display !== 'none' ? c('#cookie-banner') : null;
        const campo = c('#chq-dominio'); const boton = c('#chq-btn');
        return { campo, boton, aviso, margenBoton: innerHeight - boton.abajo, tapado: aviso ? boton.abajo > aviso.arriba || campo.abajo > aviso.arriba : false };
      });
      if (movil && aviso) R.home[`cls${ancho}ConAviso`] = await cls(p);
      await ctx.close();
    }
  }
} finally {
  await nav.close();
  servidor.close();
}
console.log(JSON.stringify(R, null, 1));
if (SALIDA) writeFileSync(SALIDA, JSON.stringify(R, null, 1) + '\n');
