// Medición de una página de acceptandproceed.com a un ancho.
// Uso: node medir.mjs <clave> <url> <1440|390> <carpeta-salida-json> <carpeta-png-temporal>
// Carga la página, espera letras e imágenes, la baja entera en pasos de 0,6 pantallas (dispara los
// IntersectionObserver de .placeholder_wrap y las imágenes diferidas), vuelve arriba y lee del DOM y de
// getComputedStyle: cada nodo con texto propio, grillas, contenedores, filetes y bordes, medios, fondos,
// enlaces y botones, transiciones declaradas y animaciones vivas (getAnimations). Guarda un JSON por
// página y ancho, y una captura completa en PNG (se parte después en tramos con partir.py).
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [clave, url, anchoTxt, outJson, outPng] = process.argv.slice(2);
const ancho = Number(anchoTxt);
mkdirSync(outJson, { recursive: true });
mkdirSync(outPng, { recursive: true });

const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const ctxOpts = ancho === 390
  ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IPHONE_UA }
  : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext(ctxOpts);
const page = await ctx.newPage();
const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2500);

// Bajar la página entera para disparar apariciones e imágenes diferidas.
const vh = ctxOpts.viewport.height;
let alto = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < alto; y += Math.round(vh * 0.6)) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(350);
  alto = await page.evaluate(() => document.documentElement.scrollHeight);
}
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(1800);
// Esperar imágenes (las diferidas ya pidieron su archivo).
await page.evaluate(async () => {
  const imgs = [...document.images].filter((i) => !i.complete);
  await Promise.race([Promise.all(imgs.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))), new Promise((r) => setTimeout(r, 8000))]);
});
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(2200);

const datos = await page.evaluate(() => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const sel = (el) => {
    const parts = [];
    let e = el;
    for (let i = 0; i < 3 && e && e !== document.body; i++) {
      const c = typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 3).join('.') : '';
      parts.unshift(e.tagName.toLowerCase() + c);
      e = e.parentElement;
    }
    return parts.join(' > ');
  };
  const rect = (el) => { const b = el.getBoundingClientRect(); return { x: r1(b.left), y: r1(b.top + scrollY), w: r1(b.width), h: r1(b.height) }; };
  const visible = (el) => {
    const b = el.getBoundingClientRect();
    if (b.width < 1 || b.height < 1) return false;
    let e = el;
    while (e && e !== document.documentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      e = e.parentElement;
    }
    return true;
  };
  const opacidad = (el) => { let o = 1, e = el; while (e && e !== document.documentElement) { o *= Number(getComputedStyle(e).opacity); e = e.parentElement; } return r1(o * 100) / 100; };
  const parseRGBA = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const hex = (s) => { const c = parseRGBA(s); if (!c) return s; const h = '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join(''); return c.a < 1 ? `${h} a${r1(c.a * 100) / 100}` : h; };
  const fondo = (el) => { let e = el; while (e) { const c = parseRGBA(getComputedStyle(e).backgroundColor); if (c && c.a > 0.5) return { color: hex(getComputedStyle(e).backgroundColor), de: sel(e) }; e = e.parentElement; } return { color: hex(getComputedStyle(document.body).backgroundColor), de: 'body' }; };

  // 1 · Nodos con texto propio
  const textos = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'svg', 'SVG'].includes(el.tagName)) continue;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
    if (!own && !(el.tagName === 'INPUT' && el.value)) continue;
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    textos.push({
      sel: sel(el), tag: el.tagName.toLowerCase(), texto: (own || el.value).slice(0, 140), ...rect(el),
      familia: cs.fontFamily, tam: cs.fontSize, interlinea: cs.lineHeight, tracking: cs.letterSpacing, peso: cs.fontWeight,
      caja: cs.textTransform, estilo: cs.fontStyle, variacion: cs.fontVariationSettings, color: hex(cs.color), fondo: fondo(el), opacidad: opacidad(el),
      decoracion: cs.textDecorationLine !== 'none' ? `${cs.textDecorationLine} ${cs.textDecorationThickness} ${cs.textUnderlineOffset}` : '',
    });
  }

  // 2 · Grillas y contenedores
  const grillas = [], contenedores = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'grid' || cs.display === 'inline-grid') {
      const cols = cs.gridTemplateColumns.split(' ').filter(Boolean);
      if (cols.length >= 2 || el.children.length >= 2) grillas.push({ sel: sel(el), ...rect(el), columnas: cs.gridTemplateColumns, nCol: cols.length, gapCol: cs.columnGap, gapFila: cs.rowGap, padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`, hijos: el.children.length });
    }
    if (cs.maxWidth !== 'none' && el.getBoundingClientRect().width > 300) contenedores.push({ sel: sel(el), ...rect(el), maxWidth: cs.maxWidth, padding: `${cs.paddingLeft} / ${cs.paddingRight}`, margen: `${cs.marginLeft} / ${cs.marginRight}` });
  }

  // 3 · Bordes y filetes de 1 px (y cualquier borde)
  const bordes = [], filetes = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    const lados = ['Top', 'Right', 'Bottom', 'Left'].filter((s) => cs[`border${s}Style`] !== 'none' && parseFloat(cs[`border${s}Width`]) > 0);
    if (lados.length) bordes.push({ sel: sel(el), ...rect(el), lados: lados.map((s) => `${s.toLowerCase()} ${cs[`border${s}Width`]} ${cs[`border${s}Style`]} ${hex(cs[`border${s}Color`])}`), radio: cs.borderRadius, texto: el.innerText?.trim().replace(/\s+/g, ' ').slice(0, 60) });
    const b = el.getBoundingClientRect();
    const bg = parseRGBA(cs.backgroundColor);
    if (bg && bg.a > 0 && ((b.height <= 2 && b.width > 20) || (b.width <= 2 && b.height > 20))) filetes.push({ sel: sel(el), ...rect(el), color: hex(cs.backgroundColor) });
  }

  // 4 · Medios
  const medios = [];
  for (const el of document.body.querySelectorAll('img, video, iframe, picture, [style*="background-image"]')) {
    if (!visible(el) || el.tagName === 'PICTURE') continue;
    const cs = getComputedStyle(el);
    const b = el.getBoundingClientRect();
    let radio = cs.borderRadius, e = el.parentElement, de = 'propio';
    while (e && (radio === '0px' || !radio)) { const c = getComputedStyle(e); if (c.borderRadius !== '0px' && (c.overflow !== 'visible' || c.overflowX !== 'visible')) { radio = c.borderRadius; de = sel(e); } e = e.parentElement; if (e === document.body) break; }
    // caja recortadora: primer ancestro con overflow hidden
    let clip = el.parentElement, clipR = null; while (clip && clip !== document.body) { const c = getComputedStyle(clip); if (c.overflow === 'hidden' || c.overflowX === 'clip' || c.overflow === 'clip') { clipR = rect(clip); break; } clip = clip.parentElement; }
    medios.push({ tipo: el.tagName.toLowerCase(), sel: sel(el), ...rect(el), proporcion: r1((b.width / b.height) * 100) / 100, caja: clipR, proporcionCaja: clipR ? r1((clipR.w / clipR.h) * 100) / 100 : null, radio, radioDe: de, objectFit: cs.objectFit, natural: el.naturalWidth ? `${el.naturalWidth}x${el.naturalHeight}` : (el.videoWidth ? `${el.videoWidth}x${el.videoHeight}` : ''), src: (el.currentSrc || el.src || '').slice(0, 160), alt: el.getAttribute('alt'), transform: cs.transform, filtro: cs.filter, mezcla: cs.mixBlendMode });
  }

  // 5 · Fondos opacos (bloques de color)
  const fondos = [];
  for (const el of document.body.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    const c = parseRGBA(cs.backgroundColor);
    if (!c || c.a === 0) continue;
    if (!visible(el)) continue;
    const b = el.getBoundingClientRect();
    if (b.width * b.height < 2000) continue;
    fondos.push({ sel: sel(el), color: hex(cs.backgroundColor), ...rect(el), area: Math.round(b.width * b.height), radio: cs.borderRadius, backdrop: cs.backdropFilter });
  }

  // 6 · Enlaces y botones
  const enlaces = [...document.querySelectorAll('a, button, input[type=submit]')].filter(visible).map((el) => {
    const cs = getComputedStyle(el);
    return { sel: sel(el), texto: (el.innerText || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 60), href: el.getAttribute('href'), ...rect(el), color: hex(cs.color), fondo: hex(cs.backgroundColor), borde: `${cs.borderTopWidth} ${cs.borderTopStyle} ${hex(cs.borderTopColor)}`, radio: cs.borderRadius, padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`, familia: cs.fontFamily, tam: cs.fontSize, cursor: cs.cursor, cc: el.getAttribute('cc'), ccTipo: el.getAttribute('cc-type'), ccTexto: el.getAttribute('cc-text'), transicion: `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}` };
  });

  // 7 · Transiciones declaradas (valores únicos en el render) y animaciones vivas
  const trans = {};
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    if (cs.transitionDuration.split(',').every((d) => parseFloat(d) === 0)) continue;
    const k = `${cs.transitionProperty} | ${cs.transitionDuration} | ${cs.transitionTimingFunction} | ${cs.transitionDelay}`;
    (trans[k] ||= { n: 0, ejemplos: [] }).n++;
    if (trans[k].ejemplos.length < 4) trans[k].ejemplos.push(sel(el));
  }
  const animaciones = document.getAnimations().map((a) => {
    const t = a.effect?.getTiming?.() || {};
    return { tipo: a.constructor.name, nombre: a.animationName || a.transitionProperty || a.id || '', objetivo: a.effect?.target ? sel(a.effect.target) : '', duracion: t.duration, curva: t.easing, retardo: t.delay, iteraciones: t.iterations, estado: a.playState };
  });

  // 8 · Variables de :root
  const rootCs = getComputedStyle(document.documentElement);
  const vars = {};
  for (const ss of document.styleSheets) { try { for (const r of ss.cssRules) if (r.selectorText === ':root') for (const p of r.style) if (p.startsWith('--')) vars[p] = rootCs.getPropertyValue(p).trim(); } catch {} }

  const h = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((e) => ({ tag: e.tagName, sel: sel(e), texto: e.innerText.trim().replace(/\s+/g, ' ').slice(0, 200), tam: getComputedStyle(e).fontSize, ...rect(e) }));
  const secciones = [...document.querySelectorAll('main > *, footer, header')].filter(visible).map((e) => ({ sel: sel(e), ...rect(e), fondo: hex(getComputedStyle(e).backgroundColor), texto: e.innerText?.trim().replace(/\s+/g, ' ').slice(0, 200) }));
  const palabras = (document.querySelector('main')?.innerText || '').split(/\s+/).filter(Boolean).length;

  return {
    titulo: document.title, alto: document.documentElement.scrollHeight, anchoDoc: document.documentElement.scrollWidth,
    claseHtml: document.documentElement.className, claseBody: document.body.className,
    fondoBody: hex(getComputedStyle(document.body).backgroundColor), colorBody: hex(getComputedStyle(document.body).color),
    palabrasMain: palabras, vars, h, secciones, textos, grillas, contenedores, bordes, filetes, medios, fondos, enlaces, transiciones: trans, animaciones,
    fuentesCargadas: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`),
  };
});
datos.clave = clave; datos.url = url; datos.ancho = ancho; datos.dpr = ctxOpts.deviceScaleFactor; datos.cargaMs = Date.now() - t0;
datos.medidoEn = new Date().toISOString();
writeFileSync(`${outJson}/${clave}-${ancho}.json`, JSON.stringify(datos, null, 1));

// Los videos son iframes de Vimeo en modo fondo (H.264). El Chromium de Playwright no trae H.264 y el
// reproductor muestra «Player error». Para la captura se ocultan esos iframes y queda a la vista el póster
// que el propio sitio pone debajo (la miniatura del mismo video). Se deja constancia en el JSON.
datos.nota_video = 'iframes de player.vimeo.com ocultos en las capturas: sin H.264 en este Chromium; se ve el póster del sitio';
writeFileSync(`${outJson}/${clave}-${ancho}.json`, JSON.stringify(datos, null, 1));
await page.addStyleTag({ content: 'iframe[src*="player.vimeo.com"]{visibility:hidden !important}' });
await page.waitForTimeout(300);
// Captura completa (PNG; se parte después en tramos JPEG de ≤ 4000 px).
await page.screenshot({ path: `${outPng}/${clave}-${ancho}-completa.png`, fullPage: true });
// Primera pantalla.
await page.screenshot({ path: `${outPng}/${clave}-${ancho}-pantalla1.png` });
console.log(clave, ancho, 'alto', datos.alto, 'textos', datos.textos.length, 'medios', datos.medios.length, 'ms', datos.cargaMs);
await browser.close();
