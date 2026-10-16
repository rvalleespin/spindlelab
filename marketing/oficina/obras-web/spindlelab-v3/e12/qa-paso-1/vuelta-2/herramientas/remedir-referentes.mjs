// QA E12 paso 1, vuelta 2 (Javiera) · vuelve a medir koto.com y acceptandproceed.com en el navegador,
// con herramienta propia (no corre las de Lucía), para compararlo con medicion.json y con lo que el lock y el
// tablero agregaron en su segunda vuelta (degradados, dibujos grandes, etiquetas de A&P).
// Uso: node remedir-referentes.mjs <salida.json> <carpeta-capturas>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [salida, capturas] = process.argv.slice(2);
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const res = { fecha: new Date().toISOString(), navegador: nav.version(), koto: {}, ap: {} };

async function abrir(url, comprobar, { ancho = 1440, alto = 900, movil = false } = {}, intentos = 6) {
  let ultimo;
  for (let i = 1; i <= intentos; i++) {
    const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil, timezoneId: 'America/Santiago', locale: 'es-CL' });
    await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(2500);
      const ok = await p.evaluate(comprobar);
      if (ok === true) return { ctx, p, intento: i };
      ultimo = ok;
    } catch (e) { ultimo = String(e).slice(0, 200); }
    await ctx.close();
    await new Promise(r => setTimeout(r, 1500 * i));
  }
  throw new Error('no cargó ' + url + ' ' + JSON.stringify(ultimo));
}

// Mide estilo de un selector (texto, letra, tamaño, color, caja, transición)
const ESTILO = `(sel) => {
  const e = typeof sel === 'string' ? document.querySelector(sel) : sel;
  if (!e) return null;
  const s = getComputedStyle(e); const r = e.getBoundingClientRect();
  return { texto: (e.innerText || '').trim().slice(0, 70), familia: s.fontFamily, tam: s.fontSize, peso: s.fontWeight,
    interlinea: s.lineHeight, interletra: s.letterSpacing, color: s.color, fondo: s.backgroundColor,
    x: Math.round(r.x * 10) / 10, y: Math.round(r.y * 10) / 10, w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10,
    transicion: s.transition, padIzq: s.paddingLeft, padDer: s.paddingRight, borde: s.border, radio: s.borderRadius };
}`;

// Degradados (todos los elementos y sus ::before/::after), con sus colores y si alguno tiene croma; dibujos grandes
const ATMOSFERA = `() => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { cx.clearRect(0,0,1,1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0,0,1,1); const d = cx.getImageData(0,0,1,1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const colores = (v) => (v.match(/(rgba?\\([^)]*\\)|color\\([^)]*\\)|#[0-9a-f]{3,8}\\b|oklch\\([^)]*\\)|oklab\\([^)]*\\))/gi) || []);
  const out = { degradados: 0, conColor: 0, purpura: 0, ejemplos: [], dibujosGrandes: [] };
  for (const el of document.querySelectorAll('*')) {
    for (const pseudo of [null, '::before', '::after']) {
      const s = getComputedStyle(el, pseudo);
      const v = s.backgroundImage;
      if (!v || !/gradient/i.test(v)) continue;
      out.degradados++;
      let croma = 0, purp = false;
      for (const c of colores(v)) {
        const [r, g, b, a] = rgba(c);
        if (a === 0) continue;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        croma = Math.max(croma, mx - mn);
        // púrpura/violeta: azul y rojo altos, verde bajo
        if (mx - mn > 30 && b >= g + 30 && r >= g + 20) purp = true;
      }
      if (croma > 12) out.conColor++;
      if (purp) out.purpura++;
      if (out.ejemplos.length < 4) out.ejemplos.push({ tag: el.tagName.toLowerCase() + (pseudo || ''), clase: String(el.className).slice(0, 60), valor: v.slice(0, 140), cromaMax: croma });
    }
  }
  for (const el of document.querySelectorAll('canvas, svg')) {
    const r = el.getBoundingClientRect();
    if (r.width > 200 && r.height > 200) out.dibujosGrandes.push({ tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height) });
  }
  return out;
}`;

const aceptarCookies = async (p) => { await p.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); }); await p.waitForTimeout(800); };

// ---------- Koto, home a 1440
{
  const { ctx, p, intento } = await abrir('https://koto.com/', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.includes('gtKotoheimCondensed') && document.querySelector('[data-ref-showreel-title-title]')) ? true : { fuentes: [...new Set(f)] };
  });
  res.koto.intentoHome = intento;
  // degradados antes de aceptar (incluye el aviso de cookies, como lo contó el lock)
  res.koto.atmosferaHomeConAviso = await p.evaluate(`(${ATMOSFERA})()`);
  await aceptarCookies(p);
  res.koto.home = await p.evaluate(`(() => { const estilo = ${ESTILO};
    const out = {};
    out.display = estilo('[data-ref-showreel-title-title]');
    out.fondoHtml = getComputedStyle(document.documentElement).backgroundColor;
    out.contenedorTitulo = estilo('[data-ref-showreel-title-container] > div');
    const work = [...document.querySelectorAll('[data-ref-header-bar-expanded] a p')].find(n => /work/i.test(n.textContent));
    if (work) { const s = getComputedStyle(work); out.navWork = { texto: work.textContent.trim(), propiedad: s.transitionProperty, duracion: s.transitionDuration, curva: s.transitionTimingFunction, color: s.color }; }
    // fuentes de la página, cargadas
    out.fuentesCargadas = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))];
    out.reducidoReglas = [...document.styleSheets].reduce((n, sh) => { try { return n + [...sh.cssRules].filter(r => r.media && /prefers-reduced-motion/.test(r.media.mediaText)).length; } catch { return n; } }, 0);
    return out; })()`);
  // cursor sobre el showreel
  await p.mouse.move(500, 400); await p.waitForTimeout(300);
  await p.mouse.move(720, 430, { steps: 4 }); await p.waitForTimeout(600);
  res.koto.cursor = await p.evaluate(() => {
    const c = document.querySelector('[data-ref-cursor]');
    let cand = c ? [c, ...c.querySelectorAll('*')] : [...document.querySelectorAll('body *')];
    const etiqueta = cand.find(e => e.children.length === 0 && /^\s*play\s*$/i.test(e.textContent || ''));
    const out = { existeDataRefCursor: !!c };
    if (etiqueta) {
      const s = getComputedStyle(etiqueta); const r = etiqueta.getBoundingClientRect();
      out.etiqueta = { texto: etiqueta.textContent.trim(), familia: s.fontFamily, tam: s.fontSize, mayus: s.textTransform, color: s.color, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] };
      let k = etiqueta; for (let i = 0; i < 6 && k; i++, k = k.parentElement) {
        const ks = getComputedStyle(k);
        if (ks.backdropFilter !== 'none') { out.caja = { fondo: ks.backgroundColor, desenfoque: ks.backdropFilter, radio: ks.borderRadius, padding: ks.padding }; break; }
      }
    }
    const sobre = document.elementFromPoint(720, 430);
    out.cursorSistema = sobre ? getComputedStyle(sobre).cursor : null;
    return out;
  });
  await p.screenshot({ path: capturas + '/koto-cursor-showreel-1440.jpg', type: 'jpeg', quality: 70, clip: { x: 560, y: 330, width: 360, height: 200 } });
  await p.mouse.move(-10, -10);
  await p.screenshot({ path: capturas + '/koto-home-1440.jpg', type: 'jpeg', quality: 70 });
  await ctx.close();
}

// ---------- Koto, /work a 1440: barra, muro, degradados y dibujos
{
  const w = await abrir('https://koto.com/work', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.includes('gtKotoheimCondensed') && document.querySelector('[data-ref-sidebar-title]')) ? true : { fuentes: [...new Set(f)] };
  });
  res.koto.atmosferaTrabajoConAviso = await w.p.evaluate(`(${ATMOSFERA})()`);
  await aceptarCookies(w.p);
  res.koto.trabajo = await w.p.evaluate(`(() => { const estilo = ${ESTILO};
    const h1 = estilo('[data-ref-sidebar-title] > h1');
    const lado = document.querySelector('[data-ref-sidebar-title]');
    let barra = null;
    if (lado) { let c = lado; for (let i = 0; i < 6 && c; i++, c = c.parentElement) { const r = c.getBoundingClientRect(); if (r.width > 250 && r.width < 400) { barra = { ancho: Math.round(r.width * 10) / 10, x: Math.round(r.x) }; break; } } }
    // conteos entre paréntesis visibles
    const conteos = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && /^\\(?\\d{1,3}\\)?$/.test((e.textContent||'').trim()) && e.getBoundingClientRect().width > 0).slice(0, 12).map(e => e.textContent.trim());
    return { h1, barra, fondoHtml: getComputedStyle(document.documentElement).backgroundColor, conteos };
  })()`);
  await w.p.screenshot({ path: capturas + '/koto-trabajo-1440.jpg', type: 'jpeg', quality: 70 });
  await w.ctx.close();
}

// ---------- Koto, home a 390 (display móvil)
{
  const m = await abrir('https://koto.com/', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.includes('gtKotoheimCondensed') && document.querySelector('[data-ref-showreel-title-title]')) ? true : { fuentes: [...new Set(f)] };
  }, { ancho: 390, alto: 844, movil: true });
  await aceptarCookies(m.p);
  res.koto.home390 = await m.p.evaluate(`(() => { const estilo = ${ESTILO}; return { display: estilo('[data-ref-showreel-title-title]'), contenedor: estilo('[data-ref-showreel-title-container] > div') }; })()`);
  await m.p.screenshot({ path: capturas + '/koto-home-390.jpg', type: 'jpeg', quality: 70 });
  await m.ctx.close();
}

// ---------- Accept & Proceed, /work a 1440
{
  const { ctx, p, intento } = await abrir('https://acceptandproceed.com/work', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.some(x => /messina/i.test(x)) && document.querySelector('h1')) ? true : { fuentes: [...new Set(f)] };
  });
  res.ap.intento = intento;
  await p.waitForTimeout(2500);
  res.ap.atmosferaTrabajo = await p.evaluate(`(${ATMOSFERA})()`);
  res.ap.trabajo = await p.evaluate(`(() => { const estilo = ${ESTILO};
    const out = {};
    out.h1 = estilo('h1');
    out.fondoBody = getComputedStyle(document.body).backgroundColor;
    out.contenedor = estilo('div.container.main-grid') || estilo('.container');
    const cc = document.querySelector('.custom-cursor');
    if (cc) { const s = getComputedStyle(cc); const r = cc.getBoundingClientRect(); out.cursorReposo = { tam: Math.round(r.width) + 'x' + Math.round(r.height), fondo: s.backgroundColor, desenfoque: s.backdropFilter, radio: s.borderRadius, transicion: s.transition }; }
    out.cursorSistemaBody = getComputedStyle(document.body).cursor;
    out.lenis = document.documentElement.classList.contains('lenis') || !!window.lenis || !!document.querySelector('.lenis');
    // etiquetas de pilar bajo cada pieza
    const tags = [...document.querySelectorAll('div.tag.project-tag')];
    out.etiquetas = { total: tags.length };
    if (tags[0]) {
      const t = tags[0]; const s = getComputedStyle(t); const r = t.getBoundingClientRect();
      const img = t.querySelector('img'); const ir = img ? img.getBoundingClientRect() : null;
      const sep = t.querySelector('.tag-separator'); const ss = sep ? getComputedStyle(sep) : null; const sr = sep ? sep.getBoundingClientRect() : null;
      const txt = [...t.querySelectorAll('*')].filter(n => n.children.length === 0 && n.textContent.trim()).map(n => ({ texto: n.textContent.trim(), color: getComputedStyle(n).color, tam: getComputedStyle(n).fontSize }))[0];
      out.etiquetas.primera = { texto: t.innerText.trim(), alto: Math.round(r.height * 10) / 10, ancho: Math.round(r.width * 10) / 10, borde: s.borderTopWidth + ' ' + s.borderTopStyle + ' ' + s.borderTopColor, radio: s.borderRadius, icono: ir ? Math.round(ir.width) + 'x' + Math.round(ir.height) : null, separador: sr ? { ancho: sr.width, fondo: ss.backgroundColor, borde: ss.borderLeft } : null, textoEstilo: txt };
    }
    // etiquetas por pieza: cada enlace a /work/<algo> con su conteo de etiquetas dentro de su contenedor
    const piezas = [...document.querySelectorAll('a[href*="/work/"]')].filter(a => a.getBoundingClientRect().width > 150);
    const vistos = new Set(); const porPieza = [];
    for (const a of piezas) {
      const href = a.getAttribute('href'); if (vistos.has(href)) continue; vistos.add(href);
      let c = a; let n = 0;
      for (let i = 0; i < 5 && c; i++, c = c.parentElement) { n = c.querySelectorAll('div.tag.project-tag').length; if (n) break; }
      porPieza.push({ href, etiquetas: n });
    }
    out.etiquetas.porPieza = porPieza;
    return out; })()`);
  // pasar sobre la primera tarjeta
  const t = await p.evaluate(() => {
    const a = [...document.querySelectorAll('a[href*="/work/"]')].map(a => ({ a, r: a.getBoundingClientRect() })).find(o => o.r.width > 200 && o.r.height > 150);
    if (!a) return null; a.a.scrollIntoView({ block: 'center' }); return a.a.getAttribute('href');
  });
  await p.waitForTimeout(1200);
  if (t) {
    const c = await p.evaluate((href) => { const r = document.querySelector('a[href="' + href + '"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 3 }; }, t);
    await p.mouse.move(c.x - 200, c.y - 100); await p.waitForTimeout(300);
    await p.mouse.move(c.x, c.y, { steps: 5 }); await p.waitForTimeout(900);
    res.ap.cursorSobreProyecto = await p.evaluate(() => {
      const cc = document.querySelector('.custom-cursor'); if (!cc) return null;
      const s = getComputedStyle(cc); const r = cc.getBoundingClientRect();
      return { href: null, clases: cc.className, tam: (Math.round(r.width * 10) / 10) + 'x' + Math.round(r.height), fondo: s.backgroundColor, texto: cc.innerText.trim() };
    });
    res.ap.cursorSobreProyecto.href = t;
    await p.screenshot({ path: capturas + '/ap-cursor-proyecto-1440.jpg', type: 'jpeg', quality: 70 });
  }
  await ctx.close();
}

// ---------- Accept & Proceed, home a 1440 (degradados)
{
  const h = await abrir('https://www.acceptandproceed.com/', () => !!document.body && document.readyState !== 'loading');
  await h.p.waitForTimeout(2000);
  res.ap.atmosferaHome = await h.p.evaluate(`(${ATMOSFERA})()`);
  await h.p.screenshot({ path: capturas + '/ap-home-1440.jpg', type: 'jpeg', quality: 70 });
  await h.ctx.close();
}

await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
