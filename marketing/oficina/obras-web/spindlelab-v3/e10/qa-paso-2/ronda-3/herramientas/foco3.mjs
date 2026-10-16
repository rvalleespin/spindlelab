// Ronda 3 · recorrido de Tab: orden de los enfocables (texto) en el prototipo contra el build, y dónde retrocede.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const rec = async (url) => { const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); await p.goto(url, { waitUntil: 'networkidle' }); const out = [];
  for (let i = 0; i < 90; i++) { await p.keyboard.press('Tab'); const r = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const r = e.getBoundingClientRect(); return { t: (e.getAttribute('aria-label') || e.textContent || e.placeholder || e.tagName).replace(/\s+/g, ' ').trim().slice(0, 26), y: Math.round(r.top + scrollY), id: e.id || e.className.split?.(' ')[0] }; }); if (!r) break; out.push(r); }
  await p.context().close(); return out; };
for (const [pg, ruta] of [['home', '/v3/'], ['acompanamiento-mensual', '/v3/servicios/acompanamiento-mensual/'], ['trabajo', '/v3/trabajo/']]) {
  const d = await rec('http://127.0.0.1:8781' + ruta);
  for (const dir of ['taller', 'pizarra']) {
    const x = await rec(`http://127.0.0.1:8780/${dir}/${pg}.html`);
    const sinCinta = x.filter(e => e.id !== 'cinta__pausa' && !/cinta/i.test(e.t));
    const igual = JSON.stringify(sinCinta.map(e => e.t)) === JSON.stringify(d.map(e => e.t));
    const ret = []; for (let i = 1; i < x.length; i++) if (x[i].y < x[i - 1].y - 300) ret.push(`${x[i - 1].t}(${x[i - 1].y}) → ${x[i].t}(${x[i].y})`);
    console.log(dir, pg, `enfocables ${x.length} (build ${d.length}) · mismo orden que el build sin la pausa de la cinta: ${igual} · retrocesos: ${JSON.stringify(ret)}`);
    if (!igual) { const A = d.map(e => e.t), B = sinCinta.map(e => e.t); for (let i = 0; i < Math.max(A.length, B.length); i++) if (A[i] !== B[i]) { console.log('   primera diferencia en', i, JSON.stringify(A.slice(i, i + 3)), 'vs', JSON.stringify(B.slice(i, i + 3))); break; } }
  }
}
await b.close();
