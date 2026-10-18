import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [ruta, ancho, srcs, pref] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: +ancho, height: 900 } })).newPage();
await p.goto('http://127.0.0.1:8841/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/' + ruta, { waitUntil: 'load' });
const alto = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < alto; y += 600) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
for (const s of srcs.split(',')) {
  const ok = await p.evaluate((s) => { const im = [...document.querySelectorAll('img')].find((i) => (i.currentSrc || i.src).includes(s)); if (!im) return false; im.scrollIntoView({ block: 'center' }); return true; }, s);
  if (!ok) { console.log('no', s); continue; }
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${pref}-${s.replace(/\W/g, '')}.jpg`, type: 'jpeg', quality: 60 });
}
await b.close();
