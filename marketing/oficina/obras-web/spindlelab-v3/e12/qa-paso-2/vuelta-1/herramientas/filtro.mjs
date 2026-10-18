import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const d of ['a','b']) for (const w of [1440, 390]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(`http://127.0.0.1:47311/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/${d}/trabajo/`);
  await p.waitForTimeout(700);
  const contar = () => p.evaluate(() => {
    const nombres = ['Combeau, fotografía','Praxi','Sesenta','Verifica y Cumple','Ocelo','Combeau, modelo','Doceavo','El chequeo de 21 señales','Tonela','spindlelab.cl'];
    const vis = new Set();
    for (const el of document.querySelectorAll('main a, main li, main tr, main article')) {
      if (!el.getClientRects().length) continue; const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') continue;
      for (const n of nombres) if (el.textContent.includes(n)) vis.add(n);
    }
    return [...vis];
  });
  const antes = await contar();
  const botones = await p.locator('main button, main [role="tab"], main [data-filtro]').allTextContents();
  const conc = p.locator('main button').filter({ hasText: /^\s*Concepto/ }).last();
  let despues = null, pressed = null;
  if (await conc.count()) { await conc.click(); await p.waitForTimeout(800); despues = await contar(); pressed = await conc.getAttribute('aria-pressed'); }
  console.log(d, w, 'antes', antes.length, 'botones', JSON.stringify(botones.map(x=>x.trim().replace(/\s+/g,' ')).slice(0,6)), 'concepto→', despues && despues.length, JSON.stringify(despues), 'aria-pressed', pressed);
}
await b.close();
