// Ronda 2 · tablero como Artifact: envuelto como lo publica Artifact (doctype + viewport), a 390/768/1440:
// desborde en la página, imágenes rotas, hosts externos.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [360, 390, 768, 1024, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  const hosts = new Set(), malas = [];
  p.on('request', r => { const u = new URL(r.url()); if (u.hostname !== '127.0.0.1') hosts.add(u.hostname); });
  p.on('response', r => { if (r.status() >= 400) malas.push(r.status() + ' ' + r.url()); });
  await p.goto('http://127.0.0.1:8792/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } });
  await p.waitForLoadState('networkidle');
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, imgs: document.images.length, rotas: [...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src')), title: document.title, fondo: getComputedStyle(document.body).backgroundColor, fuente: getComputedStyle(document.querySelector('h1')).fontFamily, h1: document.querySelectorAll('h1').length, gutter: getComputedStyle(document.querySelector('.marco')).paddingLeft }));
  console.log(w, JSON.stringify(r), 'hosts', [...hosts], 'malas', malas);
  if ([390, 1440].includes(w)) await p.screenshot({ path: `${OUT}/tablero-${w}.jpg`, fullPage: true, type: 'jpeg', quality: 55 });
}
await b.close();
