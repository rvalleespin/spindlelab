// QA E12 paso 2 (Javiera): rinde los tres caminos a 24 y 16 px, blanco sobre negro y negro sobre blanco, y los favicon a 16/24/32, a dpr 1.
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [url, salida] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: 1100, height: 400 }, deviceScaleFactor: 1 })).newPage();
await p.goto(url); await p.waitForTimeout(500);
await p.locator('table').screenshot({ path: salida });
const tam = await p.evaluate(() => [...document.images].map((i) => [i.src.split('/').slice(-1)[0], Math.round(i.getBoundingClientRect().width), Math.round(i.getBoundingClientRect().height), i.naturalWidth > 0]));
console.log(JSON.stringify(tam));
await b.close();
