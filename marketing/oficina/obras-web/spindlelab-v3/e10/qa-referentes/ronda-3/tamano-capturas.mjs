// QA ronda 3 · ancho real al que se ven las capturas en un teléfono (390, DPR 3) y recorte de la tarjeta 12
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const OUT = process.argv[2];
const crudo = fs.readFileSync(new URL('../../referentes/referentes.html', import.meta.url), 'utf8');
const esq = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + crudo + '</body></html>';
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
await p.route('http://127.0.0.1:8765/esqueleto.html', r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: esq }));
await p.goto('http://127.0.0.1:8765/esqueleto.html');
await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } });
await p.waitForTimeout(600);
const m = await p.evaluate(() => { const d = document.querySelector('#r12 .ref__d img').getBoundingClientRect(), mo = document.querySelector('#r12 .ref__m img').getBoundingClientRect(); return { escritorio: Math.round(d.width), telefono: Math.round(mo.width), escalaEscritorio: +(d.width / 1440).toFixed(3), escalaTelefono: +(mo.width / 390).toFixed(3), enlaces: document.querySelectorAll('.ref__vistas a').length, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }; });
console.log(JSON.stringify(m));
await p.locator("#r12 .ref__vistas").scrollIntoViewIfNeeded();
await p.locator("#r12 .ref__vistas").screenshot({ path: `${OUT}/tarjeta12-390-dpr3.png` });
await nav.close();
