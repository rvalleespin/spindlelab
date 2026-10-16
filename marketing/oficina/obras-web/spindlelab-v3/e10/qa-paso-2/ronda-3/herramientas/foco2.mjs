import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const d of ['taller', 'pizarra']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/home.html`, { waitUntil: 'networkidle' });
  const seq = [];
  for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); const r = await p.evaluate(() => { const e = document.activeElement; const r = e.getBoundingClientRect(); return `${(e.textContent || e.placeholder || '').trim().slice(0, 22)}@${Math.round(r.top + scrollY)}`; }); seq.push(r); if (r.includes('tuempresa')) { const f = await p.evaluate(() => { const form = document.querySelector('#chq-form'); const cs = getComputedStyle(form); const bar = form.querySelector('.d-dom__barra, .d-dom') || form; return { formOutline: cs.outlineStyle + ' ' + cs.outlineWidth, formShadow: cs.boxShadow, within: form.matches(':focus-within') }; }); console.log(d, 'campo enfocado:', JSON.stringify(f)); await p.screenshot({ path: `${OUT}/foco-campo-${d}.png`, clip: { x: 0, y: 80, width: 1440, height: 200 } }); } }
  console.log(d, seq.join(' → '));
}
await b.close();
