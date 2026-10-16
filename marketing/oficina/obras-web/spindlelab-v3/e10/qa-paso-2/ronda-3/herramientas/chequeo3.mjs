// Ronda 3 · el chequeo usable a 360, 390 y 768: campo y botón (¿apilados?), ancho útil, un dominio largo
// escrito de verdad (¿se corre dentro del campo?), foco visible en campo y botón, y captura con el dominio escrito.
// Uso: node chequeo3.mjs <carpeta-capturas>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of [360, 390, 768, 1024]) for (const [n, url] of [['build', 'http://127.0.0.1:8781/v3/'], ['taller', 'http://127.0.0.1:8780/taller/home.html'], ['pizarra', 'http://127.0.0.1:8780/pizarra/home.html']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 844 }, hasTouch: w < 800, isMobile: w < 800, deviceScaleFactor: 2 })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.click('#chq-dominio'); await p.keyboard.type('constructoraandesur.cl');
  const r = await p.evaluate(() => {
    const i = document.querySelector('#chq-dominio'), bt = document.querySelector('#chq-btn'); const ir = i.getBoundingClientRect(), br = bt.getBoundingClientRect(); const cs = getComputedStyle(i);
    const util = i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const f = document.querySelector('#chq-form'); const fcs = getComputedStyle(f);
    return { campo: [Math.round(ir.left), Math.round(ir.right), Math.round(ir.height)], boton: [Math.round(br.left), Math.round(br.right), Math.round(br.height)], apilado: br.top >= ir.bottom - 1, util: Math.round(util), seCorre: i.scrollWidth > i.clientWidth, scrollLeft: i.scrollLeft, fontSize: cs.fontSize, foco: `${fcs.outlineStyle} ${fcs.outlineWidth} / campo ${cs.outlineStyle} ${cs.outlineWidth}`, cw: document.documentElement.clientWidth, sw: document.documentElement.scrollWidth };
  });
  await p.keyboard.press('Tab');
  const fb = await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return `${a.id} ${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`; });
  console.log(w, n.padEnd(8), JSON.stringify(r), '· Tab →', fb);
  if (w <= 390 && n !== 'build') { await p.focus('#chq-dominio'); const f = await p.$('#chq-form'); const bb = await f.boundingBox(); await p.screenshot({ path: `${OUT}/chequeo-${n}-${w}.png`, clip: { x: 0, y: Math.max(0, bb.y - 90), width: w, height: bb.height + 200 } }); }
  await p.context().close();
}
await b.close();
