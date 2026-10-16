import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [url, w] of [['pizarra/acompanamiento-mensual.html', 768], ['taller/home.html', 768], ['pizarra/acompanamiento-mensual.html', 360]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto('http://127.0.0.1:8780/' + url, { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const de = document.documentElement; const base = de.scrollWidth; const out = [];
    // baja por el árbol: el hijo que, oculto, devuelve el scrollWidth al ancho
    let nodo = document.body;
    for (let d = 0; d < 25; d++) {
      let culpable = null;
      for (const h of nodo.children) { const prev = h.style.display; h.style.display = 'none'; const sw = de.scrollWidth; h.style.display = prev; if (sw < base) { culpable = h; out.push(`${'  '.repeat(d)}${h.tagName.toLowerCase()}.${String(h.className).trim().replace(/\s+/g, '.')} → ${sw}`); break; } }
      if (!culpable) break; nodo = culpable;
    }
    // pseudo-elementos y transform del último
    const cs = getComputedStyle(nodo), a = getComputedStyle(nodo, '::after'), bf = getComputedStyle(nodo, '::before');
    const r = nodo.getBoundingClientRect();
    return { base, cw: de.clientWidth, ruta: out, ultimo: { rect: [Math.round(r.left), Math.round(r.right), Math.round(r.width)], transform: cs.transform, after: [a.content, a.width, a.left, a.right, a.position, a.transform], before: [bf.content, bf.width, bf.left, bf.right, bf.position, bf.transform], html: nodo.outerHTML.slice(0, 300) } };
  });
  console.log(url, w, JSON.stringify(r, null, 1));
}
await b.close();
