// Ronda 4 · el tablero envuelto como lo publica Artifact (servir-tablero.py en 8792), con los pliegues abiertos, a 360,
// 390, 768, 1024 y 1440: desborde EN la página (también con el clip apagado, si lo hubiera), cantidad de h1, imágenes
// rotas, hosts externos, rayas (— y –) en el texto visible, y el ítem de «Lo comprobado» que cambió, recortado a 390 y
// 1440. Uso: node tablero4.mjs <carpeta-capturas>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [360, 390, 768, 1024, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  const hosts = new Set(), malas = [];
  p.on('request', (r) => { const u = new URL(r.url()); if (u.hostname !== '127.0.0.1') hosts.add(u.hostname); });
  p.on('response', (r) => { if (r.status() >= 400) malas.push(r.status() + ' ' + r.url()); });
  await p.goto('http://127.0.0.1:8792/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
  await p.waitForLoadState('networkidle');
  const r = await p.evaluate(() => {
    const de = document.documentElement;
    const prev = [de.style.overflowX, document.body.style.overflowX];
    de.style.setProperty('overflow-x', 'visible', 'important'); document.body.style.setProperty('overflow-x', 'visible', 'important');
    const swSinClip = de.scrollWidth; de.style.overflowX = prev[0]; document.body.style.overflowX = prev[1];
    const visible = document.body.innerText;
    const li = [...document.querySelectorAll('ul.chequeos li')].find((l) => l.textContent.includes('La escala en todos los anchos'));
    return { sw: de.scrollWidth, cw: de.clientWidth, swSinClip, h1: document.querySelectorAll('h1').length, imgs: document.images.length,
      rotas: [...document.images].filter((i) => !i.naturalWidth).length, rayas: (visible.match(/[—–]/g) || []).length,
      li: li ? li.textContent.replace(/\s+/g, ' ').trim() : null };
  });
  console.log(w, JSON.stringify({ ...r, li: undefined }), 'hosts', [...hosts], 'malas', malas);
  if (w === 390) console.log('   ítem «La escala…»:', r.li);
  if ([390, 1440].includes(w)) {
    const el = p.locator('ul.chequeos li', { hasText: 'La escala en todos los anchos' });
    await el.scrollIntoViewIfNeeded(); await el.screenshot({ path: `${OUT}/tablero-lo-comprobado-${w}.png` });
  }
  await p.context().close();
}
await b.close();
