#!/usr/bin/env node
// La portada de la home construida, medida como la midió Lucía (obra E12, tanda 2). Diego, 19-oct-2026.
//
// Es e12/spec/herramientas/portada.mjs con un solo cambio: en vez del estudio con «?fondo=blanco», abre la home del
// build (spindlelab-astro/dist, servida en un puerto libre) y le pone el blanco puro en la imagen quieta del video desde
// el navegador (el video no corre: movimiento reducido). Lo demás, igual: el velo pintado por el navegador sobre blanco
// y la caja, el color y el tamaño de cada línea de texto, en los 11 tamaños de la spec §3.1; el aviso de cookies,
// cerrado (rechazado guardado), para que no tape la portada. Su salida la lee e12/spec/herramientas/contraste-portada.py
// contra los 121 cuadros de hilo-1920.webm.
// Uso: node portada-home.mjs <carpeta-salida> [--ruta /v3/]
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const REPO = execSync('git rev-parse --show-toplevel', { cwd: dirname(fileURLToPath(import.meta.url)) }).toString().trim();
const DIST = join(REPO, 'spindlelab-astro', 'dist');
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);

const dir = process.argv[2];
const iR = process.argv.indexOf('--ruta');
const RUTA = iR > 0 ? process.argv[iR + 1] : '/v3/';
fs.mkdirSync(dir, { recursive: true });
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f));
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${servidor.address().port}${RUTA}`;
const VISTAS = [[360, 800], [375, 667], [390, 844], [414, 896], [768, 1024], [834, 1112], [1024, 768], [1194, 834], [1280, 800], [1440, 900], [1920, 1080]];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), url: RUTA + ' (build)', chromium: nav.version(), vistas: [] };
const BLANCO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"><rect width="16" height="9" fill="#fff"/></svg>');

const LEER = () => {
  const out = { lineas: [] };
  const caja = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
  const portada = document.querySelector('.portada-v');
  out.portada = caja(portada);
  out.medio = caja(document.querySelector('.portada-v__medio'));
  out.posicion = getComputedStyle(document.querySelector('.portada-v__medio > img')).objectPosition;
  out.pie = caja(document.querySelector('.portada-v__pie'));
  out.cab = caja(document.querySelector('.cab'));
  const w = document.createTreeWalker(portada, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const t = w.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (el.closest('button, [aria-hidden="true"], .solo-lector')) continue; // la pausa y el botón van sobre placa o blanco propio
    const cs = getComputedStyle(el);
    const rg = document.createRange(); rg.selectNodeContents(t);
    for (const r of rg.getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      out.lineas.push({ texto: t.textContent.trim().slice(0, 40), sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').join('.') : '') + (el.id ? '#' + el.id : ''), x: r.x, y: r.y, w: r.width, h: r.height, color: cs.color, tam: parseFloat(cs.fontSize), peso: +cs.fontWeight, familia: cs.fontFamily.split(',')[0].replace(/["']/g, '') });
    }
  }
  const input = document.querySelector('#chq-dominio');
  const ci = getComputedStyle(input);
  out.campo = { ...caja(input), borde: ci.borderTopColor, fondo: ci.backgroundColor, placeholder: getComputedStyle(input, '::placeholder').color };
  out.boton = caja(document.querySelector('#chq-btn'));
  out.pausa = caja(document.querySelector('.portada-v .pausa'));
  out.ayuda = caja(document.querySelector('#chq-ayuda'));
  out.h1 = caja(document.querySelector('h1'));
  out.vh = innerHeight; out.vw = innerWidth;
  return out;
};

for (const [w, h] of VISTAS) {
  const movil = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  // el blanco puro en lugar del cuadro del video (lo que hacía «?fondo=blanco» en el estudio)
  await p.evaluate(async (src) => {
    const img = document.querySelector('.portada-v__medio > img');
    const v = document.querySelector('.portada-v__medio > video');
    if (v) v.style.visibility = 'hidden';
    img.src = src;
    await img.decode().catch(() => {});
  }, BLANCO);
  await p.waitForTimeout(250);
  const datos = await p.evaluate(LEER);
  await p.addStyleTag({ content: '.portada-v__pie *, .portada-v .pausa { visibility: hidden !important; }' });
  await p.waitForTimeout(100);
  const png = `${dir}/velo-${w}x${h}.png`;
  await p.screenshot({ path: png, fullPage: true, clip: { x: 0, y: datos.portada.y, width: w, height: Math.min(datos.portada.h, 4000) } });
  datos.velo = png.split('/').pop();
  datos.ancho = w; datos.alto = h;
  datos.archivo = 'hilo-1920';
  R.vistas.push(datos);
  await ctx.close();
}
await nav.close();
servidor.close();
fs.writeFileSync(`${dir}/portada-render.json`, JSON.stringify(R, null, 1));
for (const v of R.vistas) console.log(v.ancho + 'x' + v.alto, 'portada', Math.round(v.portada.y), Math.round(v.portada.h), 'campo', Math.round(v.campo.y), Math.round(v.campo.y + v.campo.h), 'boton', Math.round(v.boton.y + v.boton.h), 'margen', Math.round(v.alto - (v.boton.y + v.boton.h)), 'h1', Math.round(v.h1.y), Math.round(v.h1.h), 'pie', Math.round(v.pie.y), 'lineas', v.lineas.length);
