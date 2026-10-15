// Completa de Selendy Gay pantalla por pantalla: scroll a cada altura, espera 1,8 s y une.
// Se queda con la mitad superior de cada pantalla (paso 450 px): lo que entra ahí ya estuvo
// en vista en la pantalla anterior, así que su aparición terminó.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import sharp from '/home/user/spindlelab/spindlelab-astro/node_modules/sharp/lib/index.js';
import fs from 'node:fs';
const OUT = process.argv[2];
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: { server: process.env.HTTPS_PROXY } });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: UA, locale: 'es-CL' });
const p = await ctx.newPage();
const r = await p.goto('https://www.selendygay.com', { waitUntil: 'domcontentloaded', timeout: 45000 });
await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
await p.waitForTimeout(2500);
// cookies: botón visible «Ok»
const ok = p.locator('#cn-accept-cookie');
let cookies = 'sin botón';
if (await ok.count()) {
  await ok.click({ timeout: 3000 }).catch(() => {});
  await p.waitForTimeout(1200);
  cookies = (await ok.isVisible().catch(() => false)) ? 'clic sin efecto, sigue visible' : 'cerrada con «Ok»';
}
const H = await p.evaluate(() => document.documentElement.scrollHeight);
const STEP = 450, VH = 900;
const tiles = [];
let i = 0, prevY = -1;
while (true) {
  const want = i * STEP;
  await p.evaluate(v => scrollTo(0, v), want);
  await p.waitForTimeout(1800);
  const y = await p.evaluate(() => scrollY);
  if (i >= 1) {
    // desde la segunda pantalla se ocultan solo los fijos de la ventana (encabezado, barra de cookies y botón de accesibilidad) para que no se repitan en la costura
    if (i === 1) await p.addStyleTag({ content: 'header.fixed-top, #cookie-notice, .userway_buttons_wrapper, .uw-sl { opacity: 0 !important; transition: none !important; }' });
    await p.waitForTimeout(300);
  }
  const buf = await p.screenshot({ type: 'png' });
  const last = y + VH >= H - 2 || y === prevY;
  if (last) {
    // última: toda la pantalla desde donde termina lo ya cubierto
    const cubierto = tiles.length ? tiles[tiles.length - 1].top + tiles[tiles.length - 1].h : 0;
    const off = Math.max(0, cubierto - y);
    const piece = await sharp(buf).extract({ left: 0, top: off, width: 1440, height: VH - off }).png().toBuffer();
    tiles.push({ input: piece, top: y + off, h: VH - off });
    break;
  }
  const piece = await sharp(buf).extract({ left: 0, top: 0, width: 1440, height: STEP }).png().toBuffer();
  tiles.push({ input: piece, top: y, h: STEP });
  prevY = y; i++;
}
const total = tiles[tiles.length - 1].top + tiles[tiles.length - 1].h;
const full = `${OUT}/selendy-full-1440.png`;
await sharp({ create: { width: 1440, height: total, channels: 3, background: '#fff' } }).composite(tiles.map(t => ({ input: t.input, top: t.top, left: 0 }))).png().toFile(full);
// comprobación: los titulares de las secciones existen con opacidad 1
const tit = await p.evaluate(() => ['Find Your Lawyer', 'Practice made perfect', 'Our instilled values', 'Work with us', 'Write Us', 'Call Us', 'Visit Us'].map(t => {
  const el = [...document.querySelectorAll('h1,h2,h3,h4,p,a,span,div')].find(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.includes(t)));
  if (!el) return [t, 'no está'];
  let o = 1, x = el; while (x) { o *= parseFloat(getComputedStyle(x).opacity); x = x.parentElement; }
  return [t, Math.round((el.getBoundingClientRect().top + scrollY)), 'opacidad', o];
}));
console.log(JSON.stringify({ status: r.status(), alto: H, total, pantallas: tiles.length, cookies, tit }));
await b.close();
