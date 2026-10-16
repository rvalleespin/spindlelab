// Ronda 4 · cada marcador (.mk) de los 6 prototipos: ¿cierra su oración? (mismo criterio que ronda-3/marcador3.mjs:
// el texto que sigue al marcador dentro de su bloque, hasta el próximo punto; si queda algo más que puntuación, no
// cierra). Y cuántos caben a la vista a la vez (ventana de innerHeight, como renderizar.mjs) en 6 anchos.
// Uso: node marcador4.mjs   (proto/ en 8770)
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const PAGS = ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html'];
const tot = {};
for (const u of PAGS) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(`${BASE}/${u}`, { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => [...document.querySelectorAll('.mk')].map(m => {
    const bloque = m.closest('h1,h2,h3,p,li,blockquote,dd') || m.parentElement;
    const rg = document.createRange(); rg.setStartAfter(m); rg.setEnd(bloque, bloque.childNodes.length);
    const despues = rg.toString().replace(/\s+/g, ' ');
    const hastaPunto = despues.split(/(?<=[.!?])\s/)[0];
    const cierra = /[.!?]\s*$/.test(m.textContent) || /^[\s.,;:!?»”)]*$/.test(hastaPunto);
    return { t: m.textContent.replace(/\s+/g, ' ').trim(), en: bloque.tagName.toLowerCase(), cierra, despues: hastaPunto.slice(0, 40) };
  }));
  await p.context().close();
  const vista = [];
  for (const [w, h] of [[360, 780], [390, 844], [768, 1024], [1024, 768], [1180, 820], [1440, 900]]) {
    const q = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
    await q.goto(`${BASE}/${u}`, { waitUntil: 'networkidle' }); await q.evaluate(() => document.fonts.ready);
    const n = await q.evaluate(() => { const ms = [...document.querySelectorAll('.mk')].map(e => { const r = e.getBoundingClientRect(); return { y: r.top + scrollY, alto: r.height }; }); let m = 0; for (const a of ms) m = Math.max(m, ms.filter(c => c.y >= a.y && c.y + c.alto <= a.y + innerHeight).length); return m; });
    vista.push(`${w}:${n}`);
    await q.context().close();
  }
  const d = u.split('/')[0]; tot[d] = tot[d] || { n: 0, cierran: 0, porPagina: [] };
  tot[d].n += r.length; tot[d].cierran += r.filter(x => x.cierra).length; tot[d].porPagina.push(r.length);
  console.log(`${u}: ${r.length} marcadores, ${r.filter(x => x.cierra).length} cierran · a la vista a la vez ${vista.join(' ')}`);
  for (const m of r) console.log(`   ${m.cierra ? '✓' : '✗'} [${m.en}] «${m.t}»${m.cierra ? '' : ' → sigue «' + m.despues + '»'}`);
}
for (const [d, t] of Object.entries(tot)) console.log(`${d}: ${t.n} marcadores (${t.porPagina.join(' / ')}), ${t.cierran} cierran su oración`);
await b.close();
