// Captura cada pantalla (ventana) de cada página, sin suavizado LCD y con movimiento reducido (marcador completo)
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2]; const extra = process.argv[3] || '';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-lcd-text', '--force-color-profile=srgb'] });
const PAGS = ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html'];
for (const [w, h] of [[1440, 900], [390, 844]]) for (const u of PAGS) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u + extra, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  let k = 0;
  // ventanas cada media pantalla, para no partir un elemento entre dos capturas
  for (let y = 0; y < alto; y += Math.floor(h / 2)) {
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(120);
    const real = await p.evaluate(() => scrollY);
    await p.screenshot({ path: `${OUT}/${u.replace('/', '-').replace('.html', '')}-${w}-${String(k).padStart(2, '0')}-y${real}.png` });
    k++; if (real + h >= alto) break;
  }
  await p.context().close();
}
await b.close();
