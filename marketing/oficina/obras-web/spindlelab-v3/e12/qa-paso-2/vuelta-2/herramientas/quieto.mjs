import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto('http://127.0.0.1:8841/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/b/servicios/desarrollo-web/', { waitUntil: 'load' });
await p.waitForTimeout(1500);
const s1 = await p.screenshot(); const t1 = await p.evaluate(() => document.querySelector('header')?.innerText);
await p.waitForTimeout(2000);
const s2 = await p.screenshot(); const t2 = await p.evaluate(() => document.querySelector('header')?.innerText);
// diferencia por píxel: caja que encierra lo que cambió
const r = await p.evaluate(async ([a, c]) => {
  const load = async (b64) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const cv = document.createElement('canvas'); cv.width = im.width; cv.height = im.height; const x = cv.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height).data; };
  const A = await load(a), C = await load(c); let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1, n = 0;
  for (let i = 0; i < A.length; i += 4) if (A[i] !== C[i] || A[i + 1] !== C[i + 1] || A[i + 2] !== C[i + 2]) { const px = (i / 4) % 1440, py = Math.floor(i / 4 / 1440); n++; x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py); }
  return { n, caja: [x0, y0, x1, y1] };
}, [s1.toString('base64'), s2.toString('base64')]);
console.log(JSON.stringify(r), JSON.stringify(t1), JSON.stringify(t2));
await b.close();
