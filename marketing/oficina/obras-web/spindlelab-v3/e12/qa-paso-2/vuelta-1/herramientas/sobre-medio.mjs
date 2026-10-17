// QA E12 paso 2 (Javiera): estima por píxel el contraste del texto que cae sobre una imagen, un SVG o un fondo con
// imagen (lo que medir.mjs marca «sobre-medio»), y lista el texto de menos de 11 px.
// Uso: node sobre-medio.mjs <base> <ruta> <ancho> <alto> <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, ruta, ancho, alto, salida] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await b.newContext({ viewport: { width: +ancho, height: +alto }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const p = await ctx.newPage();
await p.goto(`${base}/${ruta}`, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
const alt = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < alt; y += 500) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(120); }
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
const nodos = await p.evaluate(() => {
  const out = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d');
  const rgba = (s) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(0,0,0,0)'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  while ((n = tw.nextNode())) {
    const t = n.textContent.trim(); if (!t) continue; const el = n.parentElement; if (!el || el.closest('script,style')) continue;
    const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') continue;
    let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity; if (op < 0.05) continue;

    const rg = document.createRange(); rg.selectNodeContents(n); const r = [...rg.getClientRects()].find((x) => x.width > 1 && x.height > 1); if (!r) continue;
    out.push({ t: t.slice(0, 60), fs: +s.fontSize, fw: +s.fontWeight, x: r.left, y: r.top + scrollY, w: r.width, h: r.height, color: rgba(s.color), op, oculto: !!el.closest('[aria-hidden="true"]') });
  }
  return out;
});
const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const cr = (a, b2) => { const x = lum(a), y = lum(b2); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const res = { chicos: nodos.filter((n) => n.fs < 11).map((n) => ({ t: n.t, fs: n.fs, oculto: n.oculto })), estimados: [] };
const todos = process.env.TODOS === '1';
// estimación por píxel de todos los nodos (los de CSS también: sirve de control)
for (const n of nodos) {
  if (n.w < 2 || n.h < 2) continue;
  await p.evaluate((yy) => scrollTo(0, Math.max(0, yy - 200)), n.y);
  await p.waitForTimeout(30);
  const sy = await p.evaluate(() => scrollY);
  const clip = { x: Math.max(0, n.x - 2), y: Math.max(0, n.y - sy - 2), width: Math.min(n.w + 4, +ancho - Math.max(0, n.x - 2)), height: n.h + 4 };
  if (clip.y + clip.height > +alto || clip.width < 2) continue;
  const buf = await p.screenshot({ clip, type: 'png' });
  const data = await p.evaluate(async (b64) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return [...x.getImageData(0, 0, im.width, im.height).data]; }, buf.toString('base64'));
  const tc = n.color.slice(0, 3); const px = [];
  for (let i = 0; i < data.length; i += 4) px.push([data[i], data[i + 1], data[i + 2]]);
  const fondo = px.filter((c) => Math.hypot(c[0] - tc[0], c[1] - tc[1], c[2] - tc[2]) > 90);
  if (fondo.length < 10) continue;
  const crs = fondo.map((c) => cr(tc, c)).sort((a, b2) => a - b2);
  const med = crs[Math.floor(crs.length / 2)], p10 = crs[Math.floor(crs.length * 0.1)];
  const min = n.fs >= 24 || (n.fs >= 18.66 && n.fw >= 700) ? 3 : 4.5;
  res.estimados.push({ t: n.t, fs: n.fs, med: +med.toFixed(2), p10: +p10.toFixed(2), min, y: Math.round(n.y) });
}
res.bajoMediana = res.estimados.filter((e) => e.med < e.min);
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
console.log(ruta, ancho, 'chicos', res.chicos.length, JSON.stringify(res.chicos.slice(0, 6)), 'estimados', res.estimados.length, 'bajo (mediana)', res.bajoMediana.length, JSON.stringify(res.bajoMediana.slice(0, 8)));
await b.close();
