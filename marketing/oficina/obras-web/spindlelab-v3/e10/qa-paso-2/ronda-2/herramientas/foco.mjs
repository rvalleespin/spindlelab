import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' });
  let sin = [], n = 0, ys = [];
  for (let i = 0; i < 80; i++) {
    await p.keyboard.press('Tab');
    const r = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const cs = getComputedStyle(e); const vis = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 1) || (cs.boxShadow && cs.boxShadow !== 'none'); const r = e.getBoundingClientRect(); return { t: (e.textContent || e.getAttribute('aria-label') || e.placeholder || e.tagName).trim().slice(0, 30), vis, ow: cs.outlineWidth, oc: cs.outlineColor, y: Math.round(r.top + scrollY) }; });
    if (!r) break; n++; if (!r.vis) sin.push(r.t); ys.push(r.y);
  }
  let saltos = 0; for (let i = 1; i < ys.length; i++) if (ys[i] < ys[i - 1] - 300) saltos++;
  console.log(u, 'enfocables recorridos', n, '· sin foco visible', sin.length, JSON.stringify(sin.slice(0, 5)), '· retrocesos > 300 px', saltos);
}
await b.close();
