// E12 · Koto · medición de una página a un ancho.
// Uso: node medir.mjs <id: home|trabajo|caso|estudio> <ancho: 1440|390> <dir-crudo> <dir-capturas> [reducido]
// Deja <dir-crudo>/<id>-<ancho>[-reducido].json. (<dir-capturas> se crea, pero las capturas las hace capturar.mjs.)
// Todo sale de getComputedStyle, del DOM, de las hojas (document.styleSheets) y de getAnimations().
import fs from 'node:fs';
import path from 'node:path';
import { PAGINAS, abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from './comun.mjs';

const [id, anchoArg, dirCrudo, dirCapt, modo] = process.argv.slice(2);
const ancho = +anchoArg;
const reducido = modo === 'reducido';
const url = PAGINAS[id];
fs.mkdirSync(dirCrudo, { recursive: true });
fs.mkdirSync(dirCapt, { recursive: true });

const nav = await abrirNavegador();
const ctx = await contexto(nav, ancho, reducido ? { reducedMotion: 'reduce' } : { reducedMotion: 'no-preference' });
await ctx.addInitScript(SEL_FN);
const p = await ctx.newPage();
const carga = await cargar(p, url);

// Antes de aceptar cookies: ¿hay aviso y cómo es? (solo se anota)
const aviso = await p.evaluate(() => {
  const d = document.querySelector('#CybotCookiebotDialog');
  if (!d) return null;
  const r = d.getBoundingClientRect(); const s = getComputedStyle(d);
  return { visible: r.width > 0 && s.display !== 'none', rect: [r.x, r.y, r.width, r.height].map(Math.round), fondo: s.backgroundColor, texto: d.innerText.replace(/\s+/g, ' ').slice(0, 200) };
});
const cookies = await aceptarCookies(p);

// Inventario de lo que está oculto o desplazado antes de entrar en pantalla (lo que anima al entrar).
await p.evaluate(() => {
  window.__vig = [];
  window.__log = [];
  const t0 = performance.now();
  const cands = [...document.querySelectorAll('main *, footer *')].filter(e => {
    const r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 8) return false;
    const s = getComputedStyle(e);
    const inl = e.getAttribute('style') || '';
    return (parseFloat(s.opacity) < 0.05 || /transform|translate|opacity|clip-path/.test(inl)) && r.top > innerHeight * 0.9;
  }).slice(0, 80);
  cands.forEach((e, i) => {
    e.__vigId = i;
    const s = getComputedStyle(e);
    window.__vig.push({ i, sel: window.__sel(e), estiloInline: (e.getAttribute('style') || '').slice(0, 160), opacidad: s.opacity, transform: s.transform, clip: s.clipPath, top: Math.round(e.getBoundingClientRect().top + scrollY) });
  });
  const mo = new MutationObserver(ms => {
    const t = performance.now() - t0;
    for (const m of ms) {
      const e = m.target; if (e.__vigId === undefined) continue;
      const s = getComputedStyle(e);
      window.__log.push({ i: e.__vigId, t: Math.round(t), op: +parseFloat(s.opacity).toFixed(3), tf: s.transform === 'none' ? 'none' : s.transform, clip: s.clipPath, inl: (e.getAttribute('style') || '').slice(0, 120) });
    }
  });
  cands.forEach(e => mo.observe(e, { attributes: true, attributeFilter: ['style', 'class'] }));
  window.__mo = mo;
});

// Recorrido, anotando las animaciones CSS y transiciones que corren en cada paso.
const anims = new Map();
const recorrido = await recorrer(p, {
  alMedio: async () => {
    const lista = await p.evaluate(() => document.getAnimations().map(a => {
      const ef = a.effect; const tim = ef && ef.getTiming ? ef.getTiming() : {};
      const kf = ef && ef.getKeyframes ? ef.getKeyframes() : [];
      return {
        tipo: a.constructor.name, nombre: a.animationName || a.transitionProperty || null,
        duracion: tim.duration, retardo: tim.delay, curva: tim.easing, iter: tim.iterations,
        curvaKf: [...new Set(kf.map(k => k.easing))].join(' | '),
        props: [...new Set(kf.flatMap(k => Object.keys(k).filter(x => !['offset', 'computedOffset', 'easing', 'composite'].includes(x))))].join(','),
        sel: ef && ef.target ? window.__sel(ef.target) : null,
        clase: ef && ef.target && typeof ef.target.className === 'string' ? ef.target.className.slice(0, 140) : null,
      };
    }));
    for (const a of lista) { const k = [a.tipo, a.nombre, a.duracion, a.retardo, a.curva, a.curvaKf, a.props].join('|'); if (!anims.has(k)) anims.set(k, { ...a, veces: 0 }); anims.get(k).veces++; }
  },
});
const entradas = await p.evaluate(() => { window.__mo.disconnect(); return { vigilados: window.__vig, log: window.__log }; });

// ---------- Medición estática (arriba, con todo ya disparado) ----------
const m = await p.evaluate(() => {
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.02; };
  const opAcum = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity); return +o.toFixed(3); };
  const fondoDe = (el) => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return { color: c, sel: window.__sel(e) }; } return { color: getComputedStyle(document.documentElement).backgroundColor, sel: 'html' }; };
  const R = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const out = {};
  out.titulo = document.title;
  out.alto = document.documentElement.scrollHeight;
  out.anchoDoc = document.documentElement.scrollWidth;
  out.html = { fondo: getComputedStyle(document.documentElement).backgroundColor, clase: document.documentElement.className.slice(0, 200), scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, overscroll: getComputedStyle(document.documentElement).overscrollBehavior };
  out.body = { fondo: getComputedStyle(document.body).backgroundColor, color: getComputedStyle(document.body).color, familia: getComputedStyle(document.body).fontFamily, tamano: getComputedStyle(document.body).fontSize, cursor: getComputedStyle(document.body).cursor, scrollBehavior: getComputedStyle(document.body).scrollBehavior };

  // Textos: cada elemento con texto propio, visible.
  const textos = [];
  for (const el of document.querySelectorAll('body *')) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'svg', 'path'].includes(el.tagName)) continue;
    if (el.closest('#CybotCookiebotDialog, #CookiebotWidget')) continue;
    const propio = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').replace(/\s+/g, ' ').trim();
    if (propio.length < 1 || !vis(el)) continue;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const lh = s.lineHeight === 'normal' ? 'normal' : +(parseFloat(s.lineHeight) / parseFloat(s.fontSize)).toFixed(3);
    const ls = s.letterSpacing === 'normal' ? 0 : +(parseFloat(s.letterSpacing) / parseFloat(s.fontSize)).toFixed(4);
    const f = fondoDe(el);
    textos.push({
      sel: window.__sel(el), tag: el.tagName.toLowerCase(), texto: propio.slice(0, 120), largo: propio.length,
      familia: s.fontFamily.split(',')[0].replace(/"/g, '').trim(), tamano: +parseFloat(s.fontSize).toFixed(2), interlinea: lh, interletraEm: ls, interletraPx: s.letterSpacing,
      peso: s.fontWeight, ajustes: s.fontVariationSettings, estiloLetra: s.fontStyle, caja: s.textTransform, color: s.color, opacidadAcumulada: opAcum(el), fondo: f.color, fondoSel: f.sel,
      x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), enHeader: !!el.closest('[data-ref-header-bar],[data-ref-header-controls],header'), enPie: !!el.closest('footer,[data-ref-footer-section]'),
      clase: typeof el.className === 'string' ? el.className.slice(0, 220) : '',
    });
  }
  out.textos = textos;

  // Bordes y filetes de ~1 px.
  const lineas = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('#CybotCookiebotDialog')) continue;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1 || !vis(el)) continue;
    const s = getComputedStyle(el);
    for (const lado of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(s['border' + lado + 'Width']); const c = s['border' + lado + 'Color']; const st = s['border' + lado + 'Style'];
      if (w > 0 && w <= 2 && st !== 'none' && !/rgba\(.*, 0\)$/.test(c)) lineas.push({ tipo: 'borde-' + lado.toLowerCase(), grosor: w, color: c, sel: window.__sel(el), largo: Math.round(lado === 'Top' || lado === 'Bottom' ? r.width : r.height), ...R(el) });
    }
    const bg = s.backgroundColor;
    if ((r.height <= 2 && r.width >= 24) || (r.width <= 2 && r.height >= 24)) {
      if (bg !== 'rgba(0, 0, 0, 0)') lineas.push({ tipo: r.height <= 2 ? 'filete-h' : 'filete-v', grosor: +Math.min(r.width, r.height).toFixed(2), color: bg, sel: window.__sel(el), largo: Math.round(Math.max(r.width, r.height)), ...R(el), clase: typeof el.className === 'string' ? el.className.slice(0, 120) : '' });
    }
  }
  out.lineas = lineas;

  // Fondos con área (elemento por elemento; los anidados se cuentan aparte, ver el JSON de píxeles).
  const fondos = {};
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('#CybotCookiebotDialog')) continue;
    const s = getComputedStyle(el); const c = s.backgroundColor;
    if (c === 'rgba(0, 0, 0, 0)' || !vis(el)) continue;
    const r = el.getBoundingClientRect(); const a = r.width * r.height; if (a < 100) continue;
    const k = c + (s.backdropFilter && s.backdropFilter !== 'none' ? ' + ' + s.backdropFilter : '');
    fondos[k] = fondos[k] || { area: 0, n: 0, ejemplos: [] };
    fondos[k].area += a; fondos[k].n++; if (fondos[k].ejemplos.length < 4) fondos[k].ejemplos.push({ sel: window.__sel(el), ...R(el), radio: s.borderRadius });
  }
  out.fondos = fondos;

  // Retícula: contenedores grid y flex con hueco, y rellenos laterales de los envoltorios anchos.
  const grillas = [];
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el); if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    if (s.display.includes('grid') && r.width > 200) grillas.push({ sel: window.__sel(el), display: s.display, columnas: s.gridTemplateColumns, nCols: s.gridTemplateColumns.split(' ').length, filas: s.gridTemplateRows.slice(0, 120), gapCol: s.columnGap, gapFila: s.rowGap, hijos: el.children.length, ...R(el), clase: typeof el.className === 'string' ? el.className.slice(0, 160) : '' });
    else if (s.display.includes('flex') && r.width > 300 && (s.columnGap !== 'normal' || s.rowGap !== 'normal') && el.children.length > 1) grillas.push({ sel: window.__sel(el), display: s.display, direccion: s.flexDirection, envolver: s.flexWrap, gapCol: s.columnGap, gapFila: s.rowGap, hijos: el.children.length, ...R(el), clase: typeof el.className === 'string' ? el.className.slice(0, 160) : '' });
  }
  out.grillas = grillas.slice(0, 120);
  const envoltorios = [];
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (r.width < innerWidth * 0.6 || !vis(el)) continue;
    const pl = parseFloat(s.paddingLeft), pr = parseFloat(s.paddingRight);
    if (pl > 0 || pr > 0 || s.maxWidth !== 'none') envoltorios.push({ sel: window.__sel(el), x: Math.round(r.left), w: Math.round(r.width), pl, pr, maxWidth: s.maxWidth, ml: s.marginLeft, mr: s.marginRight });
  }
  out.envoltorios = envoltorios.slice(0, 80);

  // Medios.
  const medios = [];
  for (const el of document.querySelectorAll('img, video, iframe, canvas, picture > img, svg')) {
    if (el.closest('#CybotCookiebotDialog')) continue;
    const r = el.getBoundingClientRect(); if (r.width < 40 || r.height < 40 || !vis(el)) continue;
    const s = getComputedStyle(el);
    let radio = s.borderRadius; let recorte = null;
    for (let e = el.parentElement, n = 0; e && n < 4; e = e.parentElement, n++) { const sp = getComputedStyle(e); if (sp.borderRadius !== '0px' && sp.overflow !== 'visible') { recorte = { sel: window.__sel(e), radio: sp.borderRadius }; break; } }
    medios.push({ tag: el.tagName.toLowerCase(), sel: window.__sel(el), ...R(el), proporcion: +(r.width / r.height).toFixed(3), objectFit: s.objectFit, radio, recortePor: recorte, natural: el.naturalWidth ? [el.naturalWidth, el.naturalHeight] : null, src: (el.currentSrc || el.src || el.getAttribute('data-src') || '').slice(0, 140), poster: el.poster ? el.poster.slice(0, 120) : null, alt: el.alt === undefined ? null : el.alt, videoEstado: el.tagName === 'VIDEO' ? { readyState: el.readyState, error: el.error && el.error.code, paused: el.paused, autoplay: el.autoplay, loop: el.loop, muted: el.muted } : null });
  }
  out.medios = medios;

  // Radios usados (en cajas con fondo, borde o recorte).
  const radios = {};
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el); if (s.borderRadius === '0px' || !vis(el)) continue;
    if (s.backgroundColor === 'rgba(0, 0, 0, 0)' && s.borderTopWidth === '0px' && s.overflow === 'visible' && s.backdropFilter === 'none') continue;
    radios[s.borderRadius] = radios[s.borderRadius] || { n: 0, ejemplos: [] }; radios[s.borderRadius].n++;
    if (radios[s.borderRadius].ejemplos.length < 4) radios[s.borderRadius].ejemplos.push(window.__sel(el));
  }
  out.radios = radios;

  // Cursor del sistema por zona, y el cursor propio.
  const cursores = {};
  for (const el of document.querySelectorAll('body *')) { const c = getComputedStyle(el).cursor; if (c !== 'auto' && vis(el)) { cursores[c] = cursores[c] || { n: 0, ejemplos: [] }; cursores[c].n++; if (cursores[c].ejemplos.length < 4) cursores[c].ejemplos.push(window.__sel(el)); } }
  out.cursores = cursores;
  out.cursorPropio = [...document.querySelectorAll('[data-ref-cursor]')].map(e => { const s = getComputedStyle(e); return { sel: window.__sel(e), display: s.display, posicion: s.position, z: s.zIndex, texto: e.innerText.trim(), clase: e.className.slice(0, 200) }; });

  // Encabezado y controles.
  const hb = document.querySelector('[data-ref-header-bar]'); const hc = document.querySelector('[data-ref-header-controls]');
  out.encabezado = {
    barra: hb ? { ...R(hb), posicion: getComputedStyle(hb).position, texto: hb.innerText.replace(/\s+/g, ' ').trim().slice(0, 200) } : null,
    controles: hc ? { ...R(hc), mezcla: getComputedStyle(hc).mixBlendMode, texto: hc.innerText.replace(/\s+/g, ' ').trim().slice(0, 120) } : null,
    nav: [...document.querySelectorAll('header a, [data-ref-header-bar] a, nav a')].filter(vis).map(a => ({ texto: a.innerText.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href') })).slice(0, 20),
  };

  // Encabezados del documento.
  out.encabezados = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map(h => { const s = getComputedStyle(h); return { tag: h.tagName.toLowerCase(), texto: h.innerText.replace(/\s+/g, ' ').trim().slice(0, 160), tamano: s.fontSize, familia: s.fontFamily.split(',')[0], color: s.color, y: Math.round(h.getBoundingClientRect().top + scrollY) }; });
  out.h1 = [...document.querySelectorAll('h1')].map(h => ({ texto: h.innerText.replace(/\s+/g, ' ').trim().slice(0, 120), visible: vis(h) }));

  // Densidad (como en E10): área de texto y de imagen sobre el área de la página.
  const areaPag = document.documentElement.scrollWidth * document.documentElement.scrollHeight;
  let aTexto = 0; for (const t of textos) aTexto += t.w * t.h;
  let aMedio = 0; for (const md of medios) aMedio += md.w * md.h;
  out.densidad = { textoPct: +(100 * aTexto / areaPag).toFixed(1), medioPct: +(100 * aMedio / areaPag).toFixed(1), nota: 'suma de cajas: los anidados y superpuestos cuentan dos veces; es orden de magnitud' };

  // Secciones de primer nivel.
  const main = document.querySelector('main') || document.body;
  out.secciones = [...main.querySelectorAll(':scope > div > div > div, :scope > div > div, :scope section, [id^=section]')].filter(e => { const r = e.getBoundingClientRect(); return r.height > 150 && r.width > innerWidth * 0.5; }).slice(0, 40).map(e => ({ sel: window.__sel(e), id: e.id || null, ...R(e), fondo: getComputedStyle(e).backgroundColor, primerTexto: (e.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 90) }));
  return out;
});

// ---------- Hojas: transiciones, animaciones, movimiento reducido, hover ----------
const hojas = await p.evaluate(() => {
  const out = { duraciones: {}, curvas: {}, keyframes: {}, reducido: [], hover: 0, hoverEjemplos: [], mediaQueries: {}, cursor: [] };
  const walk = (rules, media) => {
    for (const r of rules) {
      if (r.type === CSSRule.KEYFRAMES_RULE) { out.keyframes[r.name] = [...r.cssRules].map(k => k.keyText + ' { ' + k.style.cssText + ' }').join(' '); continue; }
      if (r.type === CSSRule.MEDIA_RULE) { out.mediaQueries[r.conditionText] = (out.mediaQueries[r.conditionText] || 0) + r.cssRules.length; if (/reduced-motion/.test(r.conditionText)) out.reducido.push(r.cssText.slice(0, 400)); walk(r.cssRules, r.conditionText); continue; }
      if (r.cssRules && !r.selectorText) { walk(r.cssRules, media); }
      if (!r.style) continue;
      const sel = r.selectorText || '';
      if (/reduced-motion/.test(media || '')) continue;
      const d = r.style.getPropertyValue('transition-duration') || r.style.getPropertyValue('--tw-duration') || r.style.getPropertyValue('animation-duration');
      const c = r.style.getPropertyValue('transition-timing-function') || r.style.getPropertyValue('--tw-ease') || r.style.getPropertyValue('animation-timing-function');
      if (d) { out.duraciones[d] = (out.duraciones[d] || 0) + 1; }
      if (c) { out.curvas[c] = (out.curvas[c] || 0) + 1; }
      if (/:hover/.test(sel)) { out.hover++; if (out.hoverEjemplos.length < 60) out.hoverEjemplos.push((media ? '@media ' + media + ' ' : '') + sel.slice(0, 120) + ' { ' + r.style.cssText.slice(0, 160) + ' }'); }
      if (r.style.getPropertyValue('cursor')) out.cursor.push(sel.slice(0, 100) + ' → ' + r.style.getPropertyValue('cursor'));
    }
  };
  for (const sh of document.styleSheets) { try { walk(sh.cssRules, null); } catch (e) {} }
  return out;
});

const salida = { pagina: id, url, ancho, dpr: ancho === 390 ? 2 : 1, reducido, fecha: new Date().toISOString(), carga, aviso, cookies, recorrido, animacionesVistas: [...anims.values()], entradas, ...m, hojas };
const nombre = `${id}-${ancho}${reducido ? '-reducido' : ''}`;
fs.writeFileSync(path.join(dirCrudo, nombre + '.json'), JSON.stringify(salida, null, 1));

// Las capturas por tramos las hace capturar.mjs (pantallas cosidas, con lo que aparece al entrar ya disparado).
await nav.close();
console.log('ok', nombre, 'alto', m.alto, 'textos', m.textos.length, 'anims', anims.size, 'vigilados', entradas.vigilados.length, 'log', entradas.log.length);
