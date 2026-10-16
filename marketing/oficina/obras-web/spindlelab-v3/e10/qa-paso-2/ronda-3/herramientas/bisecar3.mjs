// Ronda 3 · bisección: qué elemento (o su pseudo) agranda el documento sin el clip del body.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const [u, w] = [process.argv[2], Number(process.argv[3])];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
const r = await p.evaluate(() => {
  const de = document.documentElement, cw = de.clientWidth;
  de.style.setProperty('overflow-x', 'visible', 'important'); document.body.style.setProperty('overflow-x', 'visible', 'important');
  const sw0 = de.scrollWidth; const out = [];
  const bajar = (el, prof) => {
    for (const c of el.children) {
      const d = c.style.display; c.style.setProperty('display', 'none', 'important'); const sw = de.scrollWidth; c.style.display = d;
      if (sw < sw0) { out.push(`${'  '.repeat(prof)}${c.tagName.toLowerCase()}.${String(c.className).trim().replace(/\s+/g, '.')} → sin él ${sw}`); if (prof < 8) bajar(c, prof + 1); }
    }
  };
  bajar(document.body, 0);
  return { cw, sw0, out };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
