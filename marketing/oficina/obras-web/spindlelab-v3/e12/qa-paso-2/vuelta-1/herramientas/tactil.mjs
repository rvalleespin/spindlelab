import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const fn = new Function(fs.readFileSync('circ.js', 'utf8'));
for (const d of ['a', 'b']) for (const v of ['', 'trabajo/praxi/', 'trabajo/']) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:47311/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/${d}/${v}`); await p.waitForTimeout(900);
  await p.touchscreen.tap(200, 400); await p.waitForTimeout(500);
  try { console.log(d, v || 'home', JSON.stringify(await p.evaluate(fn))); } catch (e) { console.log(d, v, 'navegó', p.url()); }
  await ctx.close();
}
await b.close();
