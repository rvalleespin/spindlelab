// Javiera, QA de obra E12, vuelta 2 (sin cambios de método desde la vuelta 1). Spec §3.1 y brief criterio 14: la frase de la portada pasa AA medida sobre el video,
// en su cuadro más claro. Medición propia, sin las herramientas de Lucía ni de Diego: en el build servido, con
// movimiento reducido (el video no corre y la imagen quieta queda debajo del velo), se pone en la imagen quieta cada uno
// de los 121 cuadros de hilo-1920.webm, se vuelve transparente el texto de la portada (no el velo) y se captura la
// sección. Por cada línea de texto (Range.getClientRects de cada nodo de texto fuera del campo y del botón), el píxel
// más claro bajo su caja en su peor cuadro, contra el color del texto. La cuenta la hace portada-contraste.py.
// Uso: node portada-contraste.mjs <carpeta de cuadros fNNN.png> <carpeta de salida>
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { servir, lanzar } from './comun.mjs';

const [cuadros, salida] = process.argv.slice(2);
mkdirSync(salida, { recursive: true });
const lista = readdirSync(cuadros).filter((f) => /^f\d+\.png$/.test(f)).sort();
const TAMANOS = [[834, 1112], [1024, 768], [1194, 834], [1280, 800], [1440, 900], [1920, 1080]];
const srv = await servir();
const nav = await lanzar();
const meta = {};
for (const [w, h] of TAMANOS) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.route('**/qa-cuadro/*', (r) => r.fulfill({ body: readFileSync(join(cuadros, r.request().url().split('/').pop())), contentType: 'image/png' }));
  await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  const lineas = await p.evaluate(() => {
    const sec = document.querySelector('.portada-v');
    const pie = sec.querySelector('.portada-v__pie');
    const out = [];
    const tw = document.createTreeWalker(pie, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      if (el.closest('input,button,[hidden],.solo-lector')) continue;
      const s = getComputedStyle(el);
      const r = document.createRange(); r.selectNodeContents(n);
      for (const c of r.getClientRects()) if (c.width > 1 && c.height > 1) out.push({ txt: n.textContent.trim().slice(0, 40), color: s.color, size: parseFloat(s.fontSize), x: c.left, y: c.top, w: c.width, h: c.height });
    }
    const b = sec.getBoundingClientRect();
    const v = document.querySelector('.video__quieta').getBoundingClientRect();
    const btn = document.getElementById('chq-btn').getBoundingClientRect();
    return { out, sec: { x: b.left, y: b.top, w: b.width, h: b.height }, quieta: { y: v.top, h: v.height }, botonAlBorde: Math.round(innerHeight - btn.bottom) };
  });
  // Texto transparente (el velo queda) y video oculto.
  await p.addStyleTag({ content: '.portada-v__pie, .portada-v__pie * { color: transparent !important; -webkit-text-fill-color: transparent !important; caret-color: transparent !important; } .portada-v video { visibility: hidden !important; } .portada-v .pausa { visibility: hidden !important; }' });
  meta[`${w}x${h}`] = lineas;
  const dir = join(salida, `${w}x${h}`); mkdirSync(dir, { recursive: true });
  for (const f of lista) {
    await p.evaluate(async (u) => { const i = document.querySelector('.portada-v .video__quieta'); i.removeAttribute('srcset'); i.src = u; await i.decode(); }, `/qa-cuadro/${f}`);
    await p.screenshot({ path: join(dir, f), clip: { x: 0, y: lineas.sec.y, width: w, height: Math.min(lineas.sec.h, h - lineas.sec.y) } });
  }
  await ctx.close();
  process.stdout.write(`${w}x${h} `);
}
await nav.close(); await srv.cerrar();
writeFileSync(join(salida, 'lineas.json'), JSON.stringify(meta, null, 1));
console.log('listo');
