// Render de una página o de un elemento con Playwright (viewport exacto, sin el recorte de ~85 px de Chrome --screenshot).
// Uso: node render.mjs <url> <salida.png|jpg> <ancho> <alto> [dpr=1] [selector|full|-] [reducido]
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [url, salida, w, h, dpr = '1', sel = '-', reducido] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr, reducedMotion: reducido ? 'reduce' : 'no-preference' });
const page = await ctx.newPage();
const externas = [];
page.on('request', r => { if (!r.url().startsWith('http://127.0.0.1')) externas.push(r.url()); });
page.on('console', m => { if (m.type() === 'error') console.log('consola:', m.text()); });
page.on('pageerror', e => console.log('error:', e.message));
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(+(process.env.ESPERA || 2600));
const tipo = salida.endsWith('.jpg') ? { type: 'jpeg', quality: 92 } : {};
if (sel === 'full') await page.screenshot({ path: salida, fullPage: true, ...tipo });
else if (sel !== '-') await page.locator(sel).first().screenshot({ path: salida, ...tipo });
else await page.screenshot({ path: salida, ...tipo });
if (externas.length) console.log('PETICIONES EXTERNAS:', externas);
await browser.close();
console.log('ok', salida);
