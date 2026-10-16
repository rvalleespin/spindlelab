// Ronda 3 · cada marcador (.mk): ¿cierra su oración? Texto que sigue al marcador dentro de su bloque hasta el
// próximo punto; si queda algo más que puntuación, no cierra. Largo en palabras y dónde vive (titular o lectura).
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const u of ['taller/home.html', 'taller/acompanamiento-mensual.html', 'taller/trabajo.html', 'pizarra/home.html', 'pizarra/acompanamiento-mensual.html', 'pizarra/trabajo.html']) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://127.0.0.1:8780/' + u, { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => [...document.querySelectorAll('.mk')].map(m => {
    const bloque = m.closest('h1,h2,h3,p,li,blockquote,dd') || m.parentElement;
    const rg = document.createRange(); rg.setStartAfter(m); rg.setEnd(bloque, bloque.childNodes.length);
    const despues = rg.toString().replace(/\s+/g, ' ');
    const hastaPunto = despues.split(/(?<=[.!?])\s/)[0];
    const cierra = /[.!?]\s*$/.test(m.textContent) || /^[\s.,;:!?»”)]*$/.test(hastaPunto);
    return { t: m.textContent.replace(/\s+/g, ' ').trim(), palabras: m.textContent.trim().split(/\s+/).length, en: bloque.tagName.toLowerCase(), cierra, despues: hastaPunto.slice(0, 40), control: !!m.closest('a,button') };
  }));
  console.log(u, r.length, 'marcadores');
  for (const m of r) console.log(`   ${m.cierra ? '✓' : '✗'} [${m.en}, ${m.palabras} pal.] «${m.t}»${m.cierra ? '' : ' → sigue «' + m.despues + '»'}${m.control ? ' EN CONTROL' : ''}`);
  await p.context().close();
}
await b.close();
