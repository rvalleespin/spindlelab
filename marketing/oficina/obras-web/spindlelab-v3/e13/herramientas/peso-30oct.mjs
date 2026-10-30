#!/usr/bin/env node
// El peso de una página tal como lo mide el criterio 10 de spec-home.md §6 (y el acta de QA del 30-oct, mayor 1): la suma
// de los bytes de cuerpo de cada respuesta (CDP, `Network.dataReceived.dataLength`), con la caché apagada, el movimiento
// permitido, el aviso de cookies contestado («Rechazar», con clic real) y 4 s de espera tras `networkidle`.
//   · «primera carga»: sin recorrer la página;
//   · «recorrida» (--recorrer): bajando hasta el final de a 600 px, con 250 ms entre pasos, y otra vez 4 s quieta.
// Diego, 30-oct-2026. Calibrada contra lo que midió Javiera con su peso.mjs (scratchpad, ya no existe): sobre el build de
// 9039b521 tiene que dar 1.399,0 kB a 1440 en primera carga, y sobre a84a1381, 1.402,1. kB = 1.000 bytes.
// Uso: node peso-30oct.mjs <url> [--ancho 1440] [--alto 900] [--recorrer] [--detalle] [--chrome <ruta>]
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:/.test(a));
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
if (!url) { console.error('Uso: node peso-30oct.mjs <url> [--ancho 1440] [--alto 900] [--recorrer] [--detalle]'); process.exit(2); }
const ancho = Number(opt('--ancho', 1440));
const alto = Number(opt('--alto', ancho <= 500 ? 844 : 900));
const recorrer = args.includes('--recorrer');
const detalle = args.includes('--detalle');
const CHROME = opt('--chrome', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');

const nav = await chromium.launch({ executablePath: CHROME });
const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
const pag = await ctx.newPage();
const cdp = await ctx.newCDPSession(pag);
await cdp.send('Network.enable');
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
const porPedido = new Map();
cdp.on('Network.responseReceived', (e) => { porPedido.set(e.requestId, { url: e.response.url, tipo: e.type, bytes: (porPedido.get(e.requestId)?.bytes) || 0 }); });
cdp.on('Network.dataReceived', (e) => {
  const r = porPedido.get(e.requestId) || { url: '?', tipo: '?', bytes: 0 };
  r.bytes += e.dataLength;
  porPedido.set(e.requestId, r);
});

await pag.goto(url, { waitUntil: 'networkidle' });
const boton = pag.locator('#cookie-reject');
if (await boton.isVisible().catch(() => false)) await boton.click();
await pag.waitForLoadState('networkidle');
await pag.waitForTimeout(4000);
if (recorrer) {
  const total = await pag.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= total; y += 600) { await pag.evaluate((v) => window.scrollTo(0, v), y); await pag.waitForTimeout(250); }
  await pag.waitForLoadState('networkidle');
  await pag.waitForTimeout(4000);
}
const filas = [...porPedido.values()].filter((r) => r.bytes > 0);
const suma = filas.reduce((s, r) => s + r.bytes, 0);
await nav.close();

const kB = (b) => (b / 1000).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
if (detalle) {
  for (const r of filas.sort((a, b) => b.bytes - a.bytes)) console.log(kB(r.bytes).padStart(9), 'kB', r.tipo.padEnd(10), r.url.replace(/^https?:\/\/[^/]+/, ''));
}
console.log(JSON.stringify({ url, ancho, alto, recorrida: recorrer, respuestas: filas.length, bytes: suma, kB: Math.round(suma / 100) / 10 }));
