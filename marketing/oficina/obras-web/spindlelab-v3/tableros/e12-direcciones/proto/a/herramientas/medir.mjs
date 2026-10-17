// Dirección A · mediciones antes de entregar. Lucía, 17-oct-2026.
// Mide en el render (Chromium 141 + Playwright), sobre el servidor de servir.py:
//   1. desborde horizontal de 360 a 1920, tal cual y con overflow-x: clip inyectado (que no esconda nada)
//   2. contraste WCAG de cada nodo de texto, componiendo las capas de fondo y la opacidad heredada, en las cinco
//      vistas a 1440 y 390, y además con el resultado del chequeo pintado (home) y con el filtro en «Concepto»
//   3. un h1 por página, letras cargadas y usadas, imágenes sin romper, consola limpia
//   4. primera pantalla de la home: dónde quedan el campo y el botón del chequeo a 1440 × 900 y 390 × 844
//   5. base negra: píxeles del lienzo fuera de los medios (home y /trabajo/ a 1440) y área de medios y de campos en
//      los casos (lock §20.1 y §20.3)
//   6. cursor, teclado y movimiento reducido (lock §8, §9 y §15)
// Uso: node medir.mjs <base-url> <salida.json> <carpeta-png-temporal>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [base, salida, tmp] = process.argv.slice(2);
fs.mkdirSync(tmp, { recursive: true });
const VISTAS = [['home', ''], ['trabajo', 'trabajo/'], ['caso-praxi', 'trabajo/praxi/'], ['caso-sesenta', 'trabajo/sesenta/'], ['desarrollo-web', 'servicios/desarrollo-web/']];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), base, chromium: nav.version(), desborde: [], contraste: [], paginas: [], primera: [], negro: [], casos: [], interaccion: {} };

async function abrir(ruta, w, h, { dpr = 1, movil = false, reducir = false } = {}) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: movil, hasTouch: movil, locale: 'es-CL', timezoneId: 'America/Santiago', reducedMotion: reducir ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage();
  const errores = [];
  p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  p.on('pageerror', x => errores.push(String(x)));
  await p.goto(base + ruta, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  return { ctx, p, errores };
}
async function recorrer(p) {
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.6)) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
  });
}

// contraste: compone el color del texto sobre la pila de fondos hasta uno opaco; un nodo sobre imagen o video se
// informa aparte («sobre medio»), como hace npm run verificar
const CONTRASTE = () => {
  const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const cv = document.createElement('canvas').getContext('2d');
  const rgba = s => { cv.fillStyle = '#000'; cv.fillStyle = s; const v = cv.fillStyle; if (v.startsWith('#')) return [parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16), 1]; const m = v.match(/[\d.]+/g).map(Number); return [m[0], m[1], m[2], m[3] ?? 1]; };
  const sobre = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || vistos.has(el)) continue;
    vistos.add(el);
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || el.closest('[hidden], .solo-lector, [aria-hidden="true"]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (el.closest('svg')) continue;
    let opac = 1; let n = el;
    while (n && n !== document.documentElement) { opac *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; }
    if (opac < 0.05) continue; // invisible a propósito (un bloque que todavía no entra)
    // pila de fondos
    const capas = []; let sobreMedio = false; n = el;
    while (n) {
      const c = getComputedStyle(n);
      if (c.backgroundImage && c.backgroundImage !== 'none') { sobreMedio = true; break; }
      const bg = rgba(c.backgroundColor);
      if (bg[3] > 0) { capas.push(bg); if (bg[3] >= 1) break; }
      if (n.parentElement && n.parentElement.classList && n.parentElement.classList.contains('medio') && n !== el) { sobreMedio = true; }
      n = n.parentElement;
    }
    if (el.closest('.medio') && !capas.length) sobreMedio = true;
    let fondo = [6, 6, 6, 1];
    for (let i = capas.length - 1; i >= 0; i--) fondo = sobre(capas[i], fondo);
    const col = rgba(cs.color); col[3] *= opac;
    const texto = sobre(col, fondo);
    const tam = parseFloat(cs.fontSize); const peso = parseFloat(cs.fontWeight);
    const grande = tam >= 24 || (tam >= 18.66 && peso >= 700);
    const c = ratio(texto, fondo);
    out.push({ txt: t.textContent.trim().slice(0, 48), tam, peso, c: Math.round(c * 100) / 100, min: grande ? 3 : 4.5, sobreMedio, fondo: fondo.slice(0, 3).map(Math.round), color: texto.slice(0, 3).map(Math.round) });
  }
  return out;
};

// ---- 1 · desborde, de 360 a 1920, tal cual y con overflow-x: clip
const ANCHOS = [360, 375, 390, 414, 600, 768, 834, 1024, 1194, 1280, 1440, 1680, 1920];
for (const [id, ruta] of VISTAS) {
  for (const w of ANCHOS) {
    const { ctx, p } = await abrir(ruta, w, 900, { movil: w < 834, dpr: w < 834 ? 2 : 1 });
    await recorrer(p);
    const med = async () => p.evaluate(() => {
      const W = document.documentElement.clientWidth;
      let peor = null;
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (el.closest('.circulo')) continue;
        if (r.right > W + 1 && (!peor || r.right > peor.right)) peor = { tag: el.tagName.toLowerCase(), cls: el.className && el.className.baseVal === undefined ? String(el.className).slice(0, 40) : '', right: Math.round(r.right) };
      }
      return { scroll: document.documentElement.scrollWidth, ancho: W, desborda: document.documentElement.scrollWidth > W + 1, peor };
    });
    const tal = await med();
    await p.addStyleTag({ content: 'html, body { overflow-x: clip !important; }' });
    const clip = await med();
    R.desborde.push({ id, w, tal, clip });
    await ctx.close();
  }
}

// ---- 2 y 3 · contraste, h1, letras, imágenes y consola en las cinco vistas, a 1440 y 390
for (const [id, ruta] of VISTAS) {
  for (const [w, h, dpr, movil] of [[1440, 900, 1, false], [390, 844, 2, true]]) {
    const { ctx, p, errores } = await abrir(ruta, w, h, { dpr, movil });
    await recorrer(p);
    await p.waitForTimeout(400);
    const nodos = await p.evaluate(CONTRASTE);
    const pag = await p.evaluate(() => {
      const fam = s => getComputedStyle(document.querySelector(s) || document.body).fontFamily.split(',')[0].replace(/["']/g, '');
      const imgs = Array.from(document.images);
      return {
        h1: document.querySelectorAll('h1').length,
        lang: document.documentElement.lang,
        main: document.querySelectorAll('main').length,
        letras: Array.from(document.fonts).filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight}`),
        familia: { h1: fam('h1'), cuerpo: fam('.cuerpo, .chico'), rotulo: fam('.rotulo') },
        estiloH1: (() => { const c = getComputedStyle(document.querySelector('h1')); return { tam: c.fontSize, peso: c.fontWeight, ancho: c.fontStretch }; })(),
        imagenes: imgs.length,
        rotas: imgs.filter(i => i.offsetParent !== null && (!i.complete || i.naturalWidth === 0)).map(i => i.getAttribute('src')),
        sinAlt: imgs.filter(i => !i.hasAttribute('alt')).length,
        textoMin: Math.min(...Array.from(document.querySelectorAll('body *')).filter(e => e.childNodes.length && Array.from(e.childNodes).some(n => n.nodeType === 3 && n.textContent.trim()) && e.offsetParent !== null).map(e => parseFloat(getComputedStyle(e).fontSize))),
        negrita: Array.from(document.querySelectorAll('body *')).filter(e => e.offsetParent !== null && parseFloat(getComputedStyle(e).fontWeight) >= 600 && Array.from(e.childNodes).some(n => n.nodeType === 3 && n.textContent.trim())).length,
        alto: document.documentElement.scrollHeight,
      };
    });
    const bajos = nodos.filter(n => !n.sobreMedio && n.c < n.min);
    R.contraste.push({ id, w, nodos: nodos.length, sobreMedio: nodos.filter(n => n.sobreMedio).length, bajo: bajos, minimo: Math.min(...nodos.filter(n => !n.sobreMedio).map(n => n.c)) });
    R.paginas.push({ id, w, ...pag, errores });
    await ctx.close();
  }
}

// estados que no salen en el primer render: el resultado del chequeo (home) y el filtro en «Concepto» (índice)
{
  const { ctx, p, errores } = await abrir('', 1440, 900);
  await p.fill('#chq-dominio', 'verifica.spindlelab.cl');
  await p.click('#chq-btn');
  await p.waitForSelector('#chq-out.visible, #chq-error:not([hidden])', { timeout: 60000 });
  const res = await p.evaluate(() => ({ visible: document.querySelector('#chq-out').classList.contains('visible'), puntaje: (document.querySelector('.res__puntaje') || {}).textContent || null, items: document.querySelectorAll('.res__lista li').length, error: document.querySelector('#chq-error').hidden ? null : document.querySelector('#chq-error').textContent }));
  await p.locator('#chq-out').screenshot({ path: path.join(tmp, 'a-chequeo-resultado-1440.png') }).catch(() => {});
  const nodos = await p.evaluate(CONTRASTE);
  R.contraste.push({ id: 'home · con el resultado del chequeo', w: 1440, nodos: nodos.length, bajo: nodos.filter(n => !n.sobreMedio && n.c < n.min), minimo: Math.min(...nodos.filter(n => !n.sobreMedio).map(n => n.c)) });
  R.interaccion.chequeo = { ...res, errores };
  await ctx.close();
}
{
  const { ctx, p } = await abrir('trabajo/', 1440, 900);
  await p.click('[data-filtro] button[data-tipo="concepto"]');
  await p.waitForTimeout(300);
  const f = await p.evaluate(() => ({ visibles: Array.from(document.querySelectorAll('.muro .pieza')).filter(x => !x.hidden).map(x => x.querySelector('h2').textContent.split(' ')[0]), conteo: document.querySelector('[data-filtro] [aria-pressed="true"]').textContent }));
  const nodos = await p.evaluate(CONTRASTE);
  R.contraste.push({ id: 'trabajo · filtro en Concepto', w: 1440, nodos: nodos.length, bajo: nodos.filter(n => !n.sobreMedio && n.c < n.min), minimo: Math.min(...nodos.filter(n => !n.sobreMedio).map(n => n.c)) });
  R.interaccion.filtro = f;
  await ctx.close();
}

// ---- 4 · primera pantalla de la home
for (const [w, h, dpr, movil] of [[1440, 900, 1, false], [390, 844, 2, true]]) {
  const { ctx, p } = await abrir('', w, h, { dpr, movil });
  const box = await p.evaluate(() => {
    const b = s => { const r = document.querySelector(s).getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom) }; };
    return { h1: b('h1'), campo: b('#chq-dominio'), boton: b('#chq-btn'), alto: innerHeight };
  });
  R.primera.push({ w, h, ...box, campoDentro: box.campo.bottom <= h, botonDentro: box.boton.bottom <= h });
  await ctx.close();
}

// ---- 5 · el negro y los campos: captura de página completa a 1440, cajas de los medios desde el DOM
for (const [id, ruta] of VISTAS) {
  const { ctx, p } = await abrir(ruta, 1440, 900);
  await recorrer(p);
  await p.waitForTimeout(500);
  // los videos se detienen en su póster para que la captura sea estable
  await p.evaluate(() => document.querySelectorAll('video').forEach(v => { v.pause(); }));
  const png = path.join(tmp, `a-${id}-1440-completa.png`);
  await p.screenshot({ path: png, fullPage: true });
  const cajas = await p.evaluate(() => ({
    alto: document.documentElement.scrollHeight, ancho: document.documentElement.clientWidth,
    medios: Array.from(document.querySelectorAll('.medio')).filter(m => m.offsetParent !== null).map(m => { const r = m.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)]; }),
    lienzo: getComputedStyle(document.body).backgroundColor,
  }));
  fs.writeFileSync(png.replace('.png', '.json'), JSON.stringify(cajas));
  R.negro.push({ id, png, ...cajas, medios: cajas.medios.length });
  await ctx.close();
}

// ---- 6 · cursor, teclado y movimiento reducido
{
  const { ctx, p } = await abrir('trabajo/', 1440, 900);
  const pieza = p.locator('.muro .medio-enlace').first();
  const b = await pieza.boundingBox();
  await p.mouse.move(b.x + 40, b.y + 40);
  await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 8 });
  await p.waitForTimeout(450);
  const sobre = await p.evaluate(() => {
    const c = document.querySelector('.circulo'); const cs = getComputedStyle(c); const r = c.getBoundingClientRect();
    const otro = document.querySelectorAll('.muro .pieza__velo')[1];
    return { clase: document.documentElement.className, texto: c.textContent, fondo: cs.backgroundColor, color: cs.color, ancho: Math.round(r.width), cursorPieza: getComputedStyle(document.querySelector('.muro .medio-enlace')).cursor, veloOtra: getComputedStyle(otro).opacity, recorte: document.querySelector('.muro .medio').style.clipPath };
  });
  await p.screenshot({ path: path.join(tmp, 'a-cursor-1440.png'), clip: { x: Math.max(0, b.x - 20), y: Math.max(0, b.y - 20), width: 1000, height: 700 } });
  await p.keyboard.press('Tab');
  await p.waitForTimeout(200);
  const teclado = await p.evaluate(() => { const c = document.querySelector('.circulo'); return { escala: getComputedStyle(c).transform, claseTeclado: document.documentElement.classList.contains('teclado'), foco: document.activeElement.tagName + ' ' + (document.activeElement.textContent || '').trim().slice(0, 30), contorno: getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineWidth + ' ' + getComputedStyle(document.activeElement).outlineColor }; });
  // tabula hasta la primera pieza del muro y mira el texto quieto
  for (let i = 0; i < 12; i++) { const en = await p.evaluate(() => document.activeElement.classList.contains('medio-enlace')); if (en) break; await p.keyboard.press('Tab'); }
  const quieto = await p.evaluate(() => { const a = document.activeElement; const q = a.querySelector('.quieto'); return { enPieza: a.classList.contains('medio-enlace'), quieto: q ? getComputedStyle(q).display + ' · ' + q.textContent : null, contorno: getComputedStyle(a).outlineStyle + ' ' + getComputedStyle(a).outlineWidth }; });
  await p.screenshot({ path: path.join(tmp, 'a-teclado-1440.png') });
  R.interaccion.cursor = { sobre, teclado, quieto };
  await ctx.close();
}
{
  // la opción (b) de §20.4, solo para mirarla: el mismo círculo en cobalto
  const { ctx, p } = await abrir('trabajo/?senal=cobalto', 1440, 900);
  const b = await p.locator('.muro__col').nth(1).locator('.medio-enlace').first().boundingBox();
  await p.mouse.move(b.x + 30, b.y + 30);
  await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 8 });
  await p.waitForTimeout(450);
  R.interaccion.cursorCobalto = await p.evaluate(() => { const c = getComputedStyle(document.querySelector('.circulo')); return { fondo: c.backgroundColor, color: c.color, senal: document.documentElement.dataset.senal || null }; });
  await p.screenshot({ path: path.join(tmp, 'a-cursor-1440-cobalto.png'), clip: { x: Math.max(0, b.x - 20), y: Math.max(0, b.y - 20), width: 760, height: 520 } });
  await ctx.close();
}
for (const [id, ruta] of [['home', ''], ['caso-praxi', 'trabajo/praxi/']]) {
  const { ctx, p } = await abrir(ruta, 1440, 900, { reducir: true });
  await p.mouse.move(700, 400);
  await p.waitForTimeout(300);
  const r = await p.evaluate(() => ({
    clase: document.documentElement.className,
    circulo: getComputedStyle(document.querySelector('.circulo')).display,
    videos: Array.from(document.querySelectorAll('video')).map(v => ({ pausado: v.paused, autoplay: v.autoplay })),
    pausaApretada: Array.from(document.querySelectorAll('.pausa')).map(b => b.getAttribute('aria-pressed')),
    escondidos: Array.from(document.querySelectorAll('[data-entrada]')).filter(e => getComputedStyle(e).opacity !== '1').length,
    transiciones: Array.from(document.querySelectorAll('.cab__nav a, .boton, .medio > img')).filter(e => getComputedStyle(e).transitionDuration.split(',').some(d => parseFloat(d) > 0)).length,
  }));
  R.interaccion['reducido-' + id] = r;
  await ctx.close();
}
{
  const { ctx, p } = await abrir('trabajo/', 390, 844, { dpr: 2, movil: true });
  R.interaccion.telefono = await p.evaluate(() => ({ clase: document.documentElement.className, circulo: getComputedStyle(document.querySelector('.circulo')).display, bajadaVisible: getComputedStyle(document.querySelector('.pieza__nombre .gris')).display !== 'none' }));
  await ctx.close();
}

await nav.close();
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
const res = {
  desborde: R.desborde.filter(d => d.tal.desborda || d.clip.desborda || d.tal.peor || d.clip.peor).map(d => `${d.id} ${d.w}: ${JSON.stringify(d.tal.peor || d.clip.peor)}`),
  contraste: R.contraste.map(c => `${c.id} ${c.w}: ${c.nodos} nodos, ${c.bajo.length} bajo, mínimo ${c.minimo}`),
  paginas: R.paginas.map(x => `${x.id} ${x.w}: h1 ${x.h1}, rotas ${x.rotas.length}, sin alt ${x.sinAlt}, texto mín ${x.textoMin}, negrita ${x.negrita}, errores ${x.errores.length}, familias ${JSON.stringify(x.familia)}`),
  primera: R.primera,
  interaccion: R.interaccion,
};
console.log(JSON.stringify(res, null, 1));
