// Render + medición con viewport real (no el clamping de --window-size del headless CLI).
// Uso: node render.mjs <url-o-file> <salida-sin-extension>
import { chromium } from 'playwright';

const [target, out] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

const vistas = [
  { n: '1440', width: 1440, height: 900, movil: false },
  { n: '768',  width: 768,  height: 1024, movil: false },
  { n: '390',  width: 390,  height: 844, movil: true },
];

const medidas = [];
for (const v of vistas) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 2,
    isMobile: v.movil,
    hasTouch: v.movil,
    userAgent: v.movil
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  await page.goto(target, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const m = await page.evaluate(() => {
    const d = document.documentElement;
    const btn = document.querySelector('#chq-btn, button[type=submit], .cta-principal');
    const r = btn ? btn.getBoundingClientRect() : null;
    const dorados = [...document.querySelectorAll('*')].filter((el) => {
      const s = getComputedStyle(el);
      return [s.color, s.backgroundColor, s.borderColor].some((c) => /201,\s*162,\s*39/.test(c));
    }).length;
    return {
      clientWidth: d.clientWidth,
      scrollWidth: d.scrollWidth,
      overflowHorizontal: d.scrollWidth > d.clientWidth,
      botonTexto: btn ? btn.textContent.trim() : null,
      botonBottom: r ? Math.round(r.bottom) : null,
      botonSobreElPliegue: r ? r.bottom <= window.innerHeight : null,
      alturaVentana: window.innerHeight,
      usosDeOro: dorados,
      h1: (document.querySelector('h1') || {}).textContent?.trim() || null,
    };
  });
  medidas.push({ vista: v.n, ...m });
  await page.screenshot({ path: `${out}-${v.n}.png` });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(medidas, null, 2));
