// Rinde las piezas OG a 2x. Después: python3 reducir.py <piezas> (1200×630, JPEG 4:4:4).
// En la nube: CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node render.mjs a-titular b-obra
import { chromium } from '../../../spindlelab-astro/node_modules/playwright/index.mjs';
const dir = new URL('.', import.meta.url).pathname;
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--allow-file-access-from-files'] });
for (const n of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await p.goto('file://' + dir + n + '.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const fuentes = await p.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + ' ' + f.weight));
  await p.screenshot({ path: dir + n + '@2x.png' });
  console.log(n, 'fuentes cargadas:', [...new Set(fuentes)].join(', '));
  await p.close();
}
await b.close();
