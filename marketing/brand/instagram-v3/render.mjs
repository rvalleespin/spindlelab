// Rinde las láminas a 2x y deja sus medidas. Después: python3 reducir.py <láminas>.
// En la nube: CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node render.mjs post-titular …
// Sin argumentos rinde todas las .html de la carpeta.
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from '../../../spindlelab-astro/node_modules/playwright/index.mjs';
const dir = new URL('.', import.meta.url).pathname;
mkdirSync(dir + 'salida/_2x', { recursive: true });
mkdirSync(dir + 'salida/medidas', { recursive: true });
const piezas = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5));
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--allow-file-access-from-files'] });
for (const n of piezas) {
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await p.goto('file://' + dir + n + '.html');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const alto = await p.evaluate(() => document.body.getBoundingClientRect().height);
  await p.setViewportSize({ width: 1080, height: Math.round(alto) });
  await p.waitForTimeout(150);
  // Medidas: fuentes cargadas, letra más chica, cajas de texto (para la grilla y las zonas
  // seguras) y la caja del punto del wordmark (para medir el oro). En una guía (iframe), las
  // medidas se toman dentro del marco.
  const medidas = await p.evaluate(() => {
    const docs = [document, ...[...document.querySelectorAll('iframe')].map((f) => f.contentDocument)];
    const fuentes = new Set(); const textos = []; const puntos = [];
    for (const d of docs) {
      [...d.fonts].filter((f) => f.status === 'loaded').forEach((f) => fuentes.add(f.family + ' ' + f.weight));
      const off = d === document ? { x: 0, y: 0 } : d.defaultView.frameElement.getBoundingClientRect();
      for (const el of d.body.querySelectorAll('*')) {
        const propio = [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
        if (!propio) continue;
        const cs = d.defaultView.getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        // Caja de la TINTA del texto (Range), no del bloque: un <p> mide todo el ancho.
        const rg = d.createRange(); rg.selectNodeContents(el); const r = rg.getBoundingClientRect();
        textos.push({ t: (el.innerText || el.textContent).replace(/\s*\n\s*/g, ' ').trim().slice(0, 60), px: parseFloat(cs.fontSize), peso: cs.fontWeight, may: cs.textTransform === 'uppercase', guia: !!el.closest('.guia-capa'), x0: r.left + off.x, y0: r.top + off.y, x1: r.right + off.x, y1: r.bottom + off.y });
      }
      for (const i of d.querySelectorAll('.wm i')) { const r = i.getBoundingClientRect(); puntos.push({ x0: r.left + off.x, y0: r.top + off.y, x1: r.right + off.x, y1: r.bottom + off.y, oro: !i.classList.contains('sin-oro') }); }
    }
    // Desborde: el body es de alto fijo con overflow oculto, así que lo que se pasa no se ve.
    const desborde = document.body.scrollHeight > document.body.clientHeight + 1 || document.body.scrollWidth > document.body.clientWidth + 1;
    return { fuentes: [...fuentes], textos, puntos, desborde };
  });
  medidas.alto = Math.round(alto);
  writeFileSync(dir + 'salida/medidas/' + n + '.json', JSON.stringify(medidas, null, 1));
  await p.screenshot({ path: dir + 'salida/_2x/' + n + '@2x.png' });
  // Pieza sobre foto: una segunda captura sin texto, para medir el contraste contra lo que pisa.
  if (await p.evaluate(() => document.body.classList.contains('sobre-foto'))) {
    await p.addStyleTag({ content: '.capa { visibility: hidden !important; }' });
    await p.screenshot({ path: dir + 'salida/_2x/' + n + '-fondo@2x.png' });
  }
  console.log(n, `1080×${medidas.alto}`, medidas.desborde ? '⚠ DESBORDA' : 'sin desborde', '· fuentes:', medidas.fuentes.join(', '));
  await p.close();
}
await b.close();
