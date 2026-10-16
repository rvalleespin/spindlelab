// Ronda 3 · el hero de cerca: la flecha del chequeo (::after de .t-instr) y el titular contra la entradilla.
// Uso: node hero3.mjs <carpeta-capturas>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [dir, w] of [['taller', 1024], ['taller', 1180], ['taller', 1280], ['taller', 1440], ['pizarra', 1024], ['pizarra', 1440]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(`http://127.0.0.1:8780/${dir}/home.html`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const ins = document.querySelector('.t-instr, .p-instr, .d-instr'); const ir = ins.getBoundingClientRect(); const a = getComputedStyle(ins, '::after');
    const h1 = document.querySelector('h1'); const rg = document.createRange(); rg.selectNodeContents(h1); const ls = [...rg.getClientRects()].map(r => [Math.round(r.top + scrollY), Math.round(r.bottom + scrollY)]);
    const ent = [...document.querySelectorAll('p')].find(e => /^Estás pagando/.test(e.textContent.trim())); const er = ent.getBoundingClientRect(); const rg2 = document.createRange(); rg2.selectNodeContents(ent); const el = [...rg2.getClientRects()][0];
    const hcs = getComputedStyle(h1);
    return { instr: [Math.round(ir.left), Math.round(ir.right)], flecha: a.content !== 'none' ? { left: a.left, width: a.width, derecha: Math.round(ir.right + parseFloat(a.left) - ir.width + parseFloat(a.width)) } : null,
      h1: { fs: hcs.fontSize, lh: hcs.lineHeight, caja: [Math.round(h1.getBoundingClientRect().top + scrollY), Math.round(h1.getBoundingClientRect().bottom + scrollY)], lineasRango: ls },
      entradilla: { tag: ent.tagName, texto: ent.textContent.trim().slice(0, 30), caja: [Math.round(er.top + scrollY), Math.round(er.bottom + scrollY)], primeraLinea: el && [Math.round(el.top + scrollY), Math.round(el.bottom + scrollY)], mt: getComputedStyle(ent).marginTop } };
  });
  console.log(dir, w, JSON.stringify(r));
  const h1 = await p.$('h1'); const bb = await h1.boundingBox();
  await p.screenshot({ path: `${OUT}/hero-${dir}-${w}.png`, clip: { x: 0, y: 0, width: w, height: Math.min(1400, bb.y + bb.height + 260) } });
}
await b.close();
