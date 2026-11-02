#!/usr/bin/env node
// ¿Alguna página de A dibuja algo en Inter o en Manrope? Antes de sacar del <head> las hojas /fonts/inter.css y
// /fonts/manrope.css (acta de QA del 30-oct, mayor 1, opción a) hay que saber que nadie las usa. Diego, 30-oct-2026.
// Recorre todas las páginas del dist (cada index.html, más 404.html), a 390 y a 1440, dos veces: con el aviso de cookies
// abierto y después de contestarlo (Rechazar, que además abre #cookie-aviso, el que consent-banner.js pinta en Inter), y
// recorriendo la página hasta el final. Cuenta los pedidos de inter*.woff2 / manrope*.woff2 y las caras de letra de esas
// familias que el navegador llegó a cargar (document.fonts, status «loaded»). /404.html y /privacidad/ son las páginas
// estáticas de main (public/): traen su propio <link> a inter.css y no pasan por Layout.astro, así que se informan aparte
// y no cuentan como hallazgo.
// Uso: node letras-sin-uso-30oct.mjs <url base> <carpeta dist>
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { join, dirname, relative } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const [base, dist] = process.argv.slice(2);
if (!base || !dist) { console.error('Uso: node letras-sin-uso-30oct.mjs <url base> <carpeta dist>'); process.exit(2); }

const rutas = [];
const recorrer = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) recorrer(p);
    else if (n === 'index.html') rutas.push('/' + relative(dist, d).split('\\').join('/') + (d === dist ? '' : '/'));
  }
};
recorrer(dist);
rutas.push('/404.html');
rutas.sort();

const ESTATICAS = new Set(['/404.html', '/privacidad/']);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let hallazgos = 0;
for (const ancho of [390, 1440]) {
  for (const ruta of rutas) {
    const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho < 500 ? 844 : 900 } });
    const pag = await ctx.newPage();
    const pedidos = [];
    pag.on('request', (r) => { if (/\/fonts\/(inter|manrope)[^/]*\.woff2/i.test(r.url())) pedidos.push(r.url().replace(base, '')); });
    await pag.goto(base + ruta.replace(/^\//, '/'), { waitUntil: 'networkidle' });
    const bajar = async () => {
      const h = await pag.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= h; y += 700) { await pag.evaluate((v) => window.scrollTo(0, v), y); await pag.waitForTimeout(60); }
    };
    await bajar();
    const abierto = await pag.locator('#cookie-banner').isVisible().catch(() => false);
    if (abierto) { await pag.locator('#cookie-reject').click(); await pag.waitForTimeout(300); }
    await bajar();
    await pag.waitForTimeout(300);
    const caras = await pag.evaluate(() => [...document.fonts].filter((f) => /inter|manrope/i.test(f.family) && f.status !== 'unloaded').map((f) => `${f.family} ${f.status}`));
    const usa = pedidos.length || caras.length;
    const estatica = ESTATICAS.has(ruta);
    if (usa && !estatica) hallazgos++;
    console.log(`${String(ancho).padStart(4)} ${ruta.padEnd(52)} aviso ${abierto ? 'abierto→contestado' : 'no salió'}  woff2 ${pedidos.length}  caras ${caras.length}${usa ? '  ← ' + [...pedidos, ...caras].join(', ') : ''}${estatica ? '  (estática de main, no pasa por Layout)' : ''}`);
    await ctx.close();
  }
}
await nav.close();
const deA = (rutas.length - ESTATICAS.size) * 2;
console.log(hallazgos ? `${hallazgos} de ${deA} pasadas de A usan Inter o Manrope` : `0 de ${deA} pasadas de A (${deA / 2} páginas × 390 y 1440) bajan o dibujan Inter o Manrope`);
process.exit(hallazgos ? 1 : 0);
