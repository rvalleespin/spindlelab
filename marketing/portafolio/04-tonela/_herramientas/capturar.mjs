// Tonela · capturas del sitio y comprobaciones que se miden (no se opinan).
// Uso: node capturar.mjs http://127.0.0.1:PUERTO   (el servidor sirve la carpeta 04-tonela/)
// Captura home e interior a 1440 (dpr 1) y 390 (dpr 2): primera pantalla y página completa, con movimiento reducido
// para fotografiar el estado final. Y los dos encuadres del medio principal del caso: 16:9 a 1440 × 810 y 4:5 a
// 390 × 488. Mide: desborde horizontal a 360, 390, 768 y 1440; número de h1; peticiones a terceros; errores de
// consola; fuentes con error; el rótulo «Concepto» (visible sin scroll, tamaño y contraste); y el contraste real de
// cada nodo de texto contra su fondo compuesto (AA: 4,5:1, o 3:1 desde 24 px o 18,66 px en negrita).
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const base = process.argv[2];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const salida = path.resolve(aqui, '..', 'capturas');
fs.mkdirSync(salida, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const paginas = [{ nombre: 'home', ruta: '/sitio/' }, { nombre: 'inspeccion', ruta: '/sitio/inspeccion/' }];
const informe = { fecha: new Date().toISOString(), paginas: {} };

async function abrir(ruta, w, h, dpr) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errores = [], terceros = [];
  page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  page.on('pageerror', (e) => errores.push(String(e)));
  page.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) terceros.push(r.url()); });
  await page.goto(base + ruta, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  return { ctx, page, errores, terceros };
}

const medir = () => {
  const lum = (c) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const rgba = (s) => { const v = s.match(/[\d.]+/g).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
  const sobre = (a, b) => [0, 1, 2].map((i) => a[i] * a[3] + b[i] * (1 - a[3])).concat(1);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  function fondo(el) {
    const capas = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      const b = rgba(cs.backgroundColor);
      if (b[3] > 0) { capas.push(b); if (b[3] > 0.99) break; }
      n = n.parentElement;
    }
    let base = [255, 255, 255, 1];
    if (capas.length && capas[capas.length - 1][3] > 0.99) base = capas.pop();
    else base = rgba(getComputedStyle(document.body).backgroundColor);
    for (let i = capas.length - 1; i >= 0; i--) base = sobre(capas[i], base);
    return base;
  }
  function opacidad(el) { let o = 1; for (let n = el; n && n.nodeType === 1; n = n.parentElement) o *= Number(getComputedStyle(n).opacity); return o; }
  const fallas = [];
  let revisados = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || vistos.has(el) || el.closest('svg, script, style')) continue;
    vistos.add(el);
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width < 2 || r.height < 2 || cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (el.closest('.oculto')) continue;
    const c = rgba(cs.color); c[3] *= opacidad(el);
    const bg = fondo(el);
    const k = ratio(sobre(c, bg), bg);
    const px = parseFloat(cs.fontSize), peso = parseInt(cs.fontWeight, 10);
    const grande = px >= 24 || (px >= 18.66 && peso >= 700);
    const min = grande ? 3 : 4.5;
    revisados++;
    if (k < min) fallas.push({ texto: t.textContent.trim().slice(0, 50), px, peso, ratio: Math.round(k * 100) / 100, min });
  }
  const doc = document.documentElement;
  const rot = document.querySelector('.concepto');
  let rotulo = null;
  if (rot) {
    const r = rot.getBoundingClientRect();
    const tx = rot.querySelector('.concepto-texto');
    const cs = getComputedStyle(tx);
    rotulo = {
      visibleSinScroll: r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth,
      caja: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
      textoPx: parseFloat(cs.fontSize),
      contraste: Math.round(ratio(rgba(cs.color), fondo(tx)) * 100) / 100,
      texto: rot.textContent.replace(/\s+/g, ' ').trim(),
    };
  }
  return {
    desborde: doc.scrollWidth - doc.clientWidth,
    h1: document.querySelectorAll('h1').length,
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return (j['@graph'] || [j]).map((n) => n['@type']).join(' + '); } catch (e) { return 'JSON inválido'; } }),
    robots: document.querySelector('meta[name="robots"]')?.content,
    fuentesConError: [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family),
    imagenesSinAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
    nodosRevisados: revisados, fallasContraste: fallas, rotulo,
  };
};

for (const p of paginas) {
  informe.paginas[p.nombre] = {};
  for (const [w, h, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
    const { ctx, page, errores, terceros } = await abrir(p.ruta, w, h, dpr);
    await page.screenshot({ path: path.join(salida, `${p.nombre}-${w}-primera.png`) });
    const m = await page.evaluate(medir);
    // la página completa sin el rótulo fijo repetido encima: el rótulo ya está en la primera pantalla
    await page.screenshot({ path: path.join(salida, `${p.nombre}-${w}-completa.png`), fullPage: true });
    informe.paginas[p.nombre][w] = { ...m, errores, terceros };
    await ctx.close();
    console.log(p.nombre, w, 'desborde', m.desborde, 'h1', m.h1, 'contraste: fallas', m.fallasContraste.length, 'de', m.nodosRevisados, 'rótulo', JSON.stringify(m.rotulo));
  }
  for (const w of [360, 768]) {
    const { ctx, page } = await abrir(p.ruta, w, 800, 1);
    const d = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    informe.paginas[p.nombre][w] = { desborde: d };
    console.log(p.nombre, w, 'desborde', d);
    await ctx.close();
  }
}

// medio principal del caso: 16:9 a 1440 × 810 y 4:5 a 390 × 488 (dpr 2)
for (const [w, h, dpr, nombre, ruta] of [[1440, 810, 1, 'medio-16x9-1440.png', '/sitio/'], [390, 488, 2, 'medio-4x5-390.png', '/sitio/'], [390, 488, 2, 'inspeccion-4x5-390.png', '/sitio/inspeccion/']]) {
  const { ctx, page } = await abrir(ruta, w, h, dpr);
  await page.screenshot({ path: path.join(salida, nombre) });
  await ctx.close();
  console.log('ok', nombre);
}
await browser.close();
fs.writeFileSync(path.join(salida, 'comprobacion.json'), JSON.stringify(informe, null, 2));
console.log('informe en capturas/comprobacion.json');
