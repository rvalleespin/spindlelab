// Ronda 3 · las marcas de revisión (::after de .con-marca): su caja contra la pantalla en 14 anchos (por los dos lados).
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [360, 390, 430, 600, 700, 768, 820, 900, 1024, 1100, 1180, 1258, 1280, 1366, 1440, 1920]) for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => [...document.querySelectorAll('.con-marca')].map(el => {
    const er = el.getBoundingClientRect(), a = getComputedStyle(el, '::after'), cw = document.documentElement.clientWidth;
    const wd = parseFloat(a.width), l = parseFloat(a.left), rt = parseFloat(a.right);
    const x0 = !isNaN(l) ? er.left + l : er.right - rt - wd; const x1 = x0 + wd;
    const visible = Math.max(0, Math.min(x1, cw) - Math.max(x0, 0)) / wd;
    return { m: a.backgroundImage.match(/marca-(\w+)/)?.[1], x0: Math.round(x0), x1: Math.round(x1), cw, visible: Math.round(visible * 100) };
  }));
  const malas = r.filter(x => x.visible < 100);
  if (malas.length) console.log(w, u, JSON.stringify(malas));
  await p.context().close();
}
console.log('fin');
await b.close();
