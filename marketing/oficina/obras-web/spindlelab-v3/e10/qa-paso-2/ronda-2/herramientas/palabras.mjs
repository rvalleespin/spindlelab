// Barrido: titulares cuyo texto sale de su caja o de la pantalla, a anchos intermedios
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const PAGS = ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html'];
for (const w of [360, 390, 430, 600, 768, 900, 1024, 1180, 1280, 1366, 1440, 1920]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  for (const u of PAGS) {
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(() => {
      const cw = document.documentElement.clientWidth, out = [];
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,li,span,dt,dd,strong,b,button,label')) {
        if (el.closest('.cinta') || el.closest('[aria-hidden="true"]')) continue;
        const t = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()); if (!t.length) continue;
        const rg = document.createRange(); rg.selectNodeContents(el); const rr = rg.getBoundingClientRect(); const br = el.getBoundingClientRect();
        if (!rr.width) continue;
        if (rr.right > cw + 1 || rr.right > br.right + 2) out.push(`${el.tagName.toLowerCase()} «${el.textContent.trim().slice(0, 30)}» ${getComputedStyle(el).fontSize} texto→${Math.round(rr.right)} caja→${Math.round(br.right)} pantalla ${cw}`);
      }
      return { sw: document.documentElement.scrollWidth, out };
    });
    if (r.out.length || r.sw > w) console.log(w, u, 'sw', r.sw, '\n   ' + r.out.slice(0, 6).join('\n   '));
    await p.close();
  }
  await ctx.close();
}
await b.close();
