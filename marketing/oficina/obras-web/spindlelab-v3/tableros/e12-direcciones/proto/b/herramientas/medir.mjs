// Mediciones de la dirección B (E12, paso 2). Lucía, 17-oct-2026.
// Lo que `npm run verificar` no cubre o cubre a un solo ancho:
//   1. desborde horizontal de 360 a 1920, tal como se sirve (con overflow-x: clip) y sin el clip;
//   2. un h1 por vista, imágenes cargadas, letras cargadas y cuál computa cada rol, ningún texto bajo 11 px;
//   3. el chequeo de verdad contra /api/chequeo (example.com, dominio reservado de la IANA: no es un
//      prospecto ni un cliente), el filtro del índice, el visor, el teclado y el círculo;
//   4. movimiento reducido: sin círculo, sin entradas escondidas, sin videos corriendo;
//   5. errores de consola.
// Uso: node medir.mjs <base>   →  ../datos/mediciones.json
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.argv[2];
const RUTAS = ['', 'trabajo/', 'trabajo/praxi/', 'trabajo/sesenta/', 'servicios/desarrollo-web/'];
const ANCHOS = [360, 375, 390, 414, 600, 768, 833, 834, 1024, 1193, 1194, 1280, 1440, 1680, 1920];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const salida = { fecha: new Date().toISOString(), base: BASE, vistas: {}, desborde: {}, interaccion: {}, reducido: {} };

async function recorrer(p) {
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(500);
}

// ---------- 1 · desborde, con y sin clip ----------
for (const ruta of RUTAS) {
  salida.desborde[ruta || '/'] = {};
  for (const ancho of ANCHOS) {
    const p = await nav.newPage({ viewport: { width: ancho, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(BASE + ruta, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    const conClip = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await p.addStyleTag({ content: 'html,body{overflow-x:visible!important}' });
    await p.waitForTimeout(50);
    const sinClip = await p.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const fuera = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > w + 0.5 && getComputedStyle(el).position !== 'fixed') {
          fuera.push((el.className && String(el.className).slice(0, 40)) || el.tagName);
        }
      }
      return { exceso: document.documentElement.scrollWidth - w, fuera: fuera.slice(0, 5) };
    });
    salida.desborde[ruta || '/'][ancho] = { conClip, sinClip: sinClip.exceso, elementos: sinClip.fuera };
    await p.close();
  }
}

// ---------- 2 · vista por vista, a 1440 y 390 ----------
for (const ruta of RUTAS) {
  for (const [ancho, alto, dpr] of [[1440, 900, 1], [390, 844, 2]]) {
    const p = await nav.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: dpr, isMobile: ancho < 834, hasTouch: ancho < 834 });
    const errores = [];
    p.on('console', (m) => { if (m.type() === 'error' && !/status of 404/.test(m.text())) errores.push(m.text()); });
    p.on('pageerror', (e) => errores.push(String(e)));
    const fallidos = [];
    p.on('response', (r) => { if (r.status() >= 400) fallidos.push(r.status() + ' ' + r.url().replace(BASE, '')); });
    await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await recorrer(p);
    const d = await p.evaluate(() => {
      const textos = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const n = tw.currentNode;
        if (!n.textContent.trim()) continue;
        const el = n.parentElement;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[hidden],[aria-hidden="true"] .solo-lector,.solo-lector')) continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        textos.push(parseFloat(cs.fontSize));
      }
      // Las que no se muestran a este ancho (display: none) no se piden: no cuentan como rotas.
      const imgs = [...document.images].filter((i) => i.offsetParent !== null || getComputedStyle(i).position === 'fixed').map((i) => ({ src: (i.currentSrc || i.src).split('/').pop(), ok: i.complete && i.naturalWidth > 0, alt: i.alt }));
      const familia = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '') : null; };
      const h1 = document.querySelector('h1');
      return {
        h1: document.querySelectorAll('h1').length,
        h1texto: h1 ? h1.textContent.trim().slice(0, 80) : null,
        main: document.querySelectorAll('main').length,
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return 'ok'; } catch { return 'malo'; } }),
        imagenes: imgs.length, imagenesRotas: imgs.filter((i) => !i.ok).map((i) => i.src), sinAlt: imgs.filter((i) => !i.alt).map((i) => i.src),
        textoMin: Math.min(...textos), nodos: textos.length,
        letras: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family),
        familia: { h1: familia('h1'), cuerpo: familia('.t-cuerpo, .entradilla'), rotulo: familia('.rotulo'), dato: familia('.dato') },
        alto: document.documentElement.scrollHeight,
        videos: [...document.querySelectorAll('video')].map((v) => ({ src: (v.currentSrc || v.getAttribute('src') || '').split('/').pop(), estado: v.readyState })),
      };
    });
    salida.vistas[(ruta || '/') + '@' + ancho] = { ...d, errores, fallidos: fallidos.filter((f) => !f.includes('/v3/')) };
    await p.close();
  }
}

// ---------- 3 · interacción ----------
{
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE, { waitUntil: 'networkidle' });
  const t0 = Date.now();
  await p.fill('#chq-dominio', 'example.com');
  await p.click('#chq-btn');
  await p.waitForSelector('#chq-out:not([hidden]), #chq-error:not([hidden])', { timeout: 30000 });
  const r = await p.evaluate(() => ({
    cifra: document.querySelector('.chequeo__cifra').textContent,
    dominio: (document.querySelector('.lectura__dominio') || {}).textContent || null,
    tramos: [...document.querySelectorAll('.chequeo .regla__tramo')].map((t) => t.getAttribute('data-estado')),
    items: document.querySelectorAll('.lectura__lista li').length,
    revisadoEn: document.querySelector('.chequeo__cifra').getAttribute('data-revisado'),
    error: document.querySelector('#chq-error:not([hidden])') ? document.querySelector('#chq-error').textContent : null,
  }));
  salida.interaccion.chequeo = { ...r, ms: Date.now() - t0 };
  await p.locator('.chequeo').screenshot({ path: path.join(AQUI, '..', 'datos', 'chequeo-resultado-1440.jpg'), type: 'jpeg', quality: 82 });
  await p.close();
}
{
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + 'trabajo/', { waitUntil: 'networkidle' });
  await p.mouse.move(700, 300);
  const fila = p.locator('tr[data-tipo="concepto"]').first();
  await fila.scrollIntoViewIfNeeded();
  const caja = await fila.boundingBox();
  await p.mouse.move(caja.x + 200, caja.y + 30, { steps: 8 });
  await p.waitForTimeout(700);
  const hover = await p.evaluate(() => {
    const c = document.querySelector('.cursor');
    const v = document.querySelector('.visor video');
    return {
      circulo: c ? { texto: c.textContent, transform: getComputedStyle(c).transform, fondo: getComputedStyle(c).backgroundColor, color: getComputedStyle(c).color } : null,
      visor: document.querySelector('.visor img').getAttribute('src').split('/').pop(),
      video: v ? { src: (v.getAttribute('src') || '').split('/').pop(), corre: !v.paused } : null,
      filaFondo: getComputedStyle(document.querySelector('tr.activa')).backgroundColor,
      cursorSistema: getComputedStyle(document.querySelector('tr.activa')).cursor,
    };
  });
  await p.screenshot({ path: path.join(AQUI, '..', 'datos', 'trabajo-hover-1440.jpg'), type: 'jpeg', quality: 82 });
  // filtro
  await p.click('[data-filtro="concepto"]');
  const filtro = await p.evaluate(() => ({
    visibles: [...document.querySelectorAll('.indice tbody tr')].filter((t) => !t.hidden).map((t) => t.getAttribute('data-nombre')),
    pulsado: document.querySelector('[aria-pressed="true"]').textContent,
  }));
  // teclado: el círculo se esconde con el primer Tab y el foco se ve
  await p.click('[data-filtro="todo"]');
  await p.keyboard.press('Tab');
  await p.keyboard.press('Tab');
  await p.waitForTimeout(400);
  const teclado = await p.evaluate(() => {
    const a = document.activeElement;
    const cs = getComputedStyle(a);
    const c = document.querySelector('.cursor');
    return { foco: a.textContent.trim().slice(0, 40), outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, offset: cs.outlineOffset,
      circulo: c ? getComputedStyle(c).transform : null };
  });
  salida.interaccion.indice = { hover, filtro, teclado };
  await p.close();
}

// ---------- 4 · movimiento reducido ----------
for (const ruta of RUTAS) {
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
  await p.mouse.move(400, 400);
  await p.waitForTimeout(300);
  await recorrer(p);
  salida.reducido[ruta || '/'] = await p.evaluate(() => ({
    circulo: !!document.querySelector('.cursor'),
    escondidos: [...document.querySelectorAll('[data-entra]')].filter((e) => getComputedStyle(e).opacity !== '1').length,
    videosCorriendo: [...document.querySelectorAll('video')].filter((v) => !v.paused).length,
  }));
  await p.close();
}

await nav.close();
fs.writeFileSync(path.join(AQUI, '..', 'datos', 'mediciones.json'), JSON.stringify(salida, null, 1));

// Resumen
const peores = Object.entries(salida.desborde).map(([r, a]) => [r, Math.max(...Object.values(a).map((x) => Math.max(x.conClip, x.sinClip)))]);
console.log('desborde máximo (px) por vista, 360-1920, con y sin clip:', JSON.stringify(peores));
for (const [k, v] of Object.entries(salida.vistas)) {
  console.log(k, 'h1', v.h1, 'img', v.imagenes, 'rotas', v.imagenesRotas.length, 'sinAlt', v.sinAlt.length, 'min', v.textoMin, 'px', 'familias', JSON.stringify(v.familia), 'errores', v.errores.length, 'fallidos', v.fallidos.length, v.fallidos.slice(0, 3));
}
console.log('chequeo', JSON.stringify(salida.interaccion.chequeo).slice(0, 300));
console.log('indice', JSON.stringify(salida.interaccion.indice));
console.log('reducido', JSON.stringify(salida.reducido));
