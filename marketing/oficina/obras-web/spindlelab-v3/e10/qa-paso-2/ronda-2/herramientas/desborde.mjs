import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [url, w] of [['taller/home.html', 768], ['taller/acompanamiento-mensual.html', 768], ['pizarra/acompanamiento-mensual.html', 768], ['pizarra/acompanamiento-mensual.html', 360], ['taller/acompanamiento-mensual.html', 360], ['taller/home.html', 820], ['taller/home.html', 1024], ['pizarra/home.html', 1024]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8780/' + url, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } scrollTo(0, 0); });
  const r = await p.evaluate(() => {
    const de = document.documentElement, cw = de.clientWidth;
    scrollTo(500, 0); const sx = scrollX; scrollTo(0, 0);
    // el que más sobresale, sin hijos que sobresalgan más
    let peor = []; 
    for (const el of document.querySelectorAll('body *')) { const r = el.getBoundingClientRect(); if (r.width && r.right > cw + 1) peor.push([Math.round(r.right), el.tagName.toLowerCase() + '.' + String(el.className).trim().replace(/\s+/g, '.'), Math.round(r.left), Math.round(r.top + scrollY), getComputedStyle(el).position]); }
    peor.sort((a, b) => b[0] - a[0]);
    return { sw: de.scrollWidth, cw, sx, ov: [getComputedStyle(de).overflowX, getComputedStyle(document.body).overflowX], peor: peor.slice(0, 6) };
  });
  // intento de scroll horizontal con la rueda
  await p.mouse.move(w / 2, 400); await p.mouse.wheel(400, 0); await p.waitForTimeout(300);
  const sx2 = await p.evaluate(() => scrollX);
  console.log(url, w, JSON.stringify(r), 'rueda→scrollX', sx2);
  await ctx.close();
}
await b.close();
