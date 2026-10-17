// QA E12 paso 2, vuelta 1 (Javiera, 17-oct-2026). Mide las diez vistas prototipo de A y B.
// Uso: node medir.mjs <base-url-de-e12-direcciones> <salida.json> <dir-capturas> [anchos=360,390,768,1024,1440]
// No reutiliza las herramientas de Lucía: compone el fondo de cada nodo de texto con elementsFromPoint
// (todo con pointer-events forzado), resuelve colores por canvas, multiplica la opacidad heredada y marca
// como «sobre medio» lo que cae sobre img/video/canvas/fondo con imagen (esos se estiman por píxel).
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const PW = '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const { chromium } = await import(pathToFileURL(PW).href);
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const [base, salida, dirCap, anchosArg] = process.argv.slice(2);
const ANCHOS = (anchosArg || '360,390,768,1024,1440').split(',').map(Number);
const ALTO = { 360: 800, 390: 844, 768: 1024, 1024: 768, 1440: 900 };
const PAGINAS = [
  ['a', 'home', 'proto/a/'], ['a', 'trabajo', 'proto/a/trabajo/'], ['a', 'praxi', 'proto/a/trabajo/praxi/'],
  ['a', 'sesenta', 'proto/a/trabajo/sesenta/'], ['a', 'desarrollo-web', 'proto/a/servicios/desarrollo-web/'],
  ['b', 'home', 'proto/b/'], ['b', 'trabajo', 'proto/b/trabajo/'], ['b', 'praxi', 'proto/b/trabajo/praxi/'],
  ['b', 'sesenta', 'proto/b/trabajo/sesenta/'], ['b', 'desarrollo-web', 'proto/b/servicios/desarrollo-web/'],
];
if (process.env.PAGINAS) { PAGINAS.length = 0; JSON.parse(fs.readFileSync(process.env.PAGINAS, 'utf8')).forEach((x) => PAGINAS.push(x)); }
const solo = process.env.SOLO ? process.env.SOLO.split(',') : null;
fs.mkdirSync(dirCap, { recursive: true });

const navegador = await chromium.launch({ executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required'] });

// ---------- funciones que corren en la página ----------
function utilColor() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  window.__rgba = (s) => {
    if (!s || s === 'transparent') return [0, 0, 0, 0];
    const m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/.exec(s);
    if (m) { let a = m[4] === undefined ? 1 : (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])); return [+m[1], +m[2], +m[3], a]; }
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(0,0,0,0)'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255];
  };
  window.__lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  window.__cr = (a, b) => { const x = __lum(a), y = __lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  window.__opac = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity); return o; };
  window.__sobre = (top, bot) => [top[0] * top[3] + bot[0] * (1 - top[3]), top[1] * top[3] + bot[1] * (1 - top[3]), top[2] * top[3] + bot[2] * (1 - top[3])];
}

function textosEnVista(soloVisibles) {
  // Devuelve los nodos de texto cuyo centro cae dentro del viewport, con su contraste compuesto
  const W = innerWidth, H = innerHeight, out = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const MEDIO = new Set(['IMG', 'VIDEO', 'CANVAS', 'IFRAME', 'PICTURE', 'OBJECT', 'EMBED']);
  let n;
  while ((n = tw.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const el = n.parentElement;
    if (!el || el.closest('script,style,noscript,template,title')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    const rects = [...rg.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
    if (!rects.length) continue;
    const r = rects[0];
    const cxp = r.left + Math.min(r.width, 12) / 2 + 1, cyp = r.top + r.height / 2;
    if (cxp < 0 || cyp < 0 || cxp >= W || cyp >= H) continue;
    // sr-only y recortes de 1 px
    const er = el.getBoundingClientRect();
    if (er.width <= 2 && er.height <= 2) continue;
    if (cs.clip && cs.clip !== 'auto' && /rect\(0px,? 0px,? 0px,? 0px\)/.test(cs.clip)) continue;
    const op = __opac(el);
    if (op < 0.02) continue;
    const pila = document.elementsFromPoint(cxp, cyp);
    let i = pila.indexOf(el);
    if (i < 0) i = pila.findIndex((e) => el.contains(e) || e.contains(el));
    if (i < 0) { out.push({ t: t.slice(0, 80), estado: 'tapado', x: Math.round(r.left), y: Math.round(r.top + scrollY) }); continue; }
    const capas = []; let medio = null, fondoImg = null;
    for (let k = i; k < pila.length; k++) {
      const e = pila[k];
      if (MEDIO.has(e.tagName) || (e.tagName === 'svg' && e !== el && !e.contains(el) && e.getBoundingClientRect().width > 40)) { medio = e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : ''); break; }
      const s = getComputedStyle(e);
      if (s.backgroundImage && s.backgroundImage !== 'none') { fondoImg = s.backgroundImage.slice(0, 60); break; }
      const c = __rgba(s.backgroundColor);
      if (c[3] > 0) {
        const a = c[3] * __opac(e);
        capas.push([c[0], c[1], c[2], a]);
        if (a >= 0.999) break;
      }
    }
    let fondo = [255, 255, 255];
    const ultima = capas[capas.length - 1];
    if (!(ultima && ultima[3] >= 0.999)) {
      const hc = __rgba(getComputedStyle(document.documentElement).backgroundColor);
      const bc = __rgba(getComputedStyle(document.body).backgroundColor);
      fondo = hc[3] > 0 ? __sobre(hc, [255, 255, 255]) : (bc[3] > 0 ? __sobre(bc, [255, 255, 255]) : [255, 255, 255]);
    }
    for (let k = capas.length - 1; k >= 0; k--) fondo = __sobre(capas[k], fondo);
    const ct = __rgba(cs.webkitTextFillColor && cs.webkitTextFillColor !== cs.color && cs.webkitTextFillColor !== 'currentcolor' ? cs.webkitTextFillColor : cs.color);
    const texto = __sobre([ct[0], ct[1], ct[2], ct[3] * op], fondo);
    const fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight, 10);
    const grande = fs >= 24 || (fs >= 18.66 && fw >= 700);
    const reg = {
      t: t.slice(0, 80), fs, fw, fam: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
      x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height),
      vy: Math.round(r.top), tag: el.tagName.toLowerCase(), cls: (typeof el.className === 'string' ? el.className : '').slice(0, 40),
      min: grande ? 3 : 4.5,
    };
    if (medio || fondoImg) { reg.estado = 'sobre-medio'; reg.medio = medio || fondoImg; reg.color = texto.map(Math.round); }
    else { reg.estado = 'ok'; reg.cr = +__cr(texto, fondo).toFixed(2); reg.color = texto.map(Math.round); reg.fondo = fondo.map(Math.round); }
    out.push(reg);
  }
  return out;
}

async function recorrer(page, paso) {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += paso) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(110); }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(500);
}

const resultado = { fecha: new Date().toISOString(), base, chrome: null, vistas: [] };

for (const [dir, vista, ruta] of PAGINAS) {
  if (solo && !solo.includes(`${dir}-${vista}`)) continue;
  const url = base.replace(/\/$/, '') + '/' + ruta;
  for (const ancho of ANCHOS) {
    const ctx = await navegador.newContext({ viewport: { width: ancho, height: ALTO[ancho] }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    const consola = [], fallas = [], respuestas = [];
    page.on('console', (m) => { if (m.type() === 'error') consola.push(m.text().slice(0, 200)); });
    page.on('pageerror', (e) => consola.push('pageerror: ' + String(e).slice(0, 200)));
    page.on('requestfailed', (r) => fallas.push({ url: r.url(), err: r.failure()?.errorText }));
    page.on('response', (r) => { if (r.status() >= 400) respuestas.push({ url: r.url(), st: r.status() }); });
    const externos = [];
    page.on('request', (r) => { const u = new URL(r.url()); if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname) && !/^(data|blob):/.test(r.url())) externos.push(r.url().slice(0, 120)); });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1600);
    resultado.chrome = resultado.chrome || navegador.version();
    const tag = `${dir}-${vista}-${ancho}`;
    // primera pantalla tal como llega
    await page.screenshot({ path: path.join(dirCap, `${tag}-primera.jpg`), type: 'jpeg', quality: 70 });
    const primera = await page.evaluate(() => {
      const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right) }; };
      const h1 = document.querySelector('h1');
      const campo = document.querySelector('main input[type="text"], main input[type="url"], main input:not([type]), main input[type="search"]');
      const boton = campo ? (campo.form ? campo.form.querySelector('button') : null) : null;
      // «Concepto» visible en la primera pantalla
      const conc = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = tw.nextNode())) {
        if (!/concepto/i.test(n.textContent)) continue;
        const el = n.parentElement; const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        const rg = document.createRange(); rg.selectNodeContents(n); const b = rg.getBoundingClientRect();
        if (b.width < 1 || b.bottom <= 0 || b.top >= innerHeight || b.right <= 0 || b.left >= innerWidth) continue;
        conc.push({ t: n.textContent.trim().slice(0, 80), fs: parseFloat(cs.fontSize), top: Math.round(b.top) });
      }
      return { h1: r(h1), h1t: h1 ? h1.textContent.trim().slice(0, 140) : null, campo: r(campo), boton: r(boton), alto: innerHeight, concepto: conc };
    });
    // recorrer para que todo llegue a su estado final
    await recorrer(page, Math.round(ALTO[ancho] * 0.6));
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(700);
    const estructura = await page.evaluate(() => {
      const de = document.documentElement;
      const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => h.getClientRects().length).map((h) => +h.tagName[1]);
      let saltos = []; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) saltos.push(`h${hs[i - 1]}→h${hs[i]}`);
      const imgs = [...document.images].map((im) => ({ src: (im.currentSrc || im.src).split('/').slice(-2).join('/'), ok: im.complete && im.naturalWidth > 0, alt: im.getAttribute('alt'), w: im.getAttribute('width'), h: im.getAttribute('height'), loading: im.loading, vis: im.getClientRects().length > 0 }));
      const vids = [...document.querySelectorAll('video')].map((v) => ({ src: (v.currentSrc || (v.querySelector('source') || {}).src || v.src || '').split('/').slice(-2).join('/'), full: v.currentSrc || (v.querySelector('source') || {}).src || v.src, poster: v.getAttribute('poster'), rs: v.readyState, err: v.error ? v.error.code : null, autoplay: v.autoplay, loop: v.loop, paused: v.paused, muted: v.muted, dur: isFinite(v.duration) ? +v.duration.toFixed(1) : null, preload: v.preload, vis: v.getClientRects().length > 0 }));
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); const raw = s.textContent;  const tipos = []; const rec = (o) => { if (Array.isArray(o)) o.forEach(rec); else if (o && typeof o === 'object') { if (o['@type']) tipos.push([].concat(o['@type']).join('+')); Object.values(o).forEach(rec); } }; rec(j); return { ok: true, tipos, ficcion: /disambiguatingDescription/.test(raw), resena: /"(Review|AggregateRating)"/.test(raw) }; } catch (e) { return { ok: false, err: String(e) }; } });
      const meta = (n) => (document.querySelector(`meta[name="${n}"]`) || {}).content || null;
      const fuentes = []; document.fonts.forEach((f) => fuentes.push({ fam: f.family.replace(/["']/g, ''), w: f.weight, st: f.stretch, status: f.status }));
      const fam = (sel) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return { fam: s.fontFamily, w: s.fontWeight, st: s.fontStretch, fvs: s.fontVariationSettings, fs: s.fontSize, lh: s.lineHeight }; };
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
      return {
        titulo: document.title, desc: meta('description'), robots: meta('robots'), lang: de.lang,
        canonical: (document.querySelector('link[rel="canonical"]') || {}).href || null,
        h1: document.querySelectorAll('h1').length, h1vis: [...document.querySelectorAll('h1')].filter((h) => h.getClientRects().length).length,
        saltos, main: document.querySelectorAll('main').length, header: document.querySelectorAll('header').length, nav: document.querySelectorAll('nav').length, footer: document.querySelectorAll('footer').length,
        imgs, vids, ld, fuentes, famH1: fam('h1'), famP: fam('main p'), links,
        scrollH: de.scrollHeight,
      };
    });
    // desborde, tal cual y sin recorte en html/body
    const desborde = await page.evaluate(async () => {
      const de = document.documentElement;
      const medir = () => {
        const cw = de.clientWidth; const fuera = [];
        for (const el of document.querySelectorAll('body *')) {
          const b = el.getBoundingClientRect(); if (b.width === 0 && b.height === 0) continue;
          if (b.right > cw + 1 || b.left < -1) {
            let recortado = false;
            for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p); if (/(hidden|clip|auto|scroll)/.test(o.overflowX) || /(hidden|clip)/.test(o.overflow)) { recortado = true; break; } }
            const s = getComputedStyle(el);
            if (s.position === 'fixed' && (s.visibility === 'hidden' || +s.opacity === 0)) continue;
            fuera.push({ el: el.tagName.toLowerCase() + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : ''), l: Math.round(b.left), r: Math.round(b.right), recortado });
          }
        }
        window.scrollTo(99999, window.scrollY); const sx = window.scrollX; window.scrollTo(0, window.scrollY);
        return { sw: de.scrollWidth, cw, bsw: document.body.scrollWidth, sx, fuera: fuera.filter((f) => !f.recortado).slice(0, 12), fueraRecortados: fuera.filter((f) => f.recortado).length };
      };
      const html = getComputedStyle(de).overflowX, body = getComputedStyle(document.body).overflowX;
      const tal = medir();
      const st = document.createElement('style'); st.id = '__sinclip';
      st.textContent = 'html,body{overflow:visible!important;overflow-x:visible!important}'; document.head.appendChild(st);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const sin = medir(); st.remove();
      return { overflowHtml: html, overflowBody: body, tal, sin };
    });
    // contraste: por tramos de viewport
    await page.evaluate(utilColor);
    await page.addStyleTag({ content: '*{pointer-events:auto!important}' });
    const H = ALTO[ancho];
    const nodos = []; const vistos = new Set();
    for (let y = 0; y < estructura.scrollH; y += Math.round(H * 0.8)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(650);
      const lote = await page.evaluate(textosEnVista);
      for (const n of lote) { const k = `${n.t}|${n.x}|${n.y}`; if (!vistos.has(k)) { vistos.add(k); nodos.push(n); } }
    }
    const bajo = nodos.filter((n) => n.estado === 'ok' && n.cr < n.min);
    const sobreMedio = nodos.filter((n) => n.estado === 'sobre-medio');
    const tamMin = Math.min(...nodos.filter((n) => n.fs).map((n) => n.fs));
    const fams = {}; nodos.forEach((n) => { if (n.fam) fams[n.fam] = (fams[n.fam] || 0) + 1; });
    const masJusto = nodos.filter((n) => n.estado === 'ok').sort((a, b) => a.cr / a.min - b.cr / b.min).slice(0, 3);
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
    // página completa (al scratchpad, no al repo)
    let completa = null;
    if (process.env.COMPLETA) {
      completa = path.join(process.env.COMPLETA, `${tag}-completa.png`);
      fs.mkdirSync(process.env.COMPLETA, { recursive: true });
      await page.screenshot({ path: completa, fullPage: true, type: 'png' });
    }
    const v = { dir, vista, ancho, url, primera, estructura, desborde, contraste: { nodos: nodos.length, bajo, sobreMedio, masJusto, tamMin, fams }, consola, fallas, respuestas: respuestas.filter((r) => !/\/v3\//.test(r.url)), externos, r404v3: respuestas.filter((r) => /\/v3\//.test(r.url)).length, completa };
    resultado.vistas.push(v);
    console.log(tag, 'h1', estructura.h1vis, 'sw/cw', desborde.tal.sw, desborde.tal.cw, 'sin', desborde.sin.sw, 'nodos', nodos.length, 'bajo', bajo.length, 'sobreMedio', sobreMedio.length, 'min', tamMin, 'consola', consola.length, 'fallas', fallas.length + respuestas.length);
    await ctx.close();
  }
}
fs.writeFileSync(salida, JSON.stringify(resultado, null, 1));
await navegador.close();
