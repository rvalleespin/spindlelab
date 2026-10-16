// QA E12 paso 1, vuelta 2 (Javiera) · auditoría independiente del tablero de la compuerta 1. Parte de la herramienta
// de la vuelta 1 y suma lo que hace falta para ver cerrado cada defecto del acta (3 a 10 y 14) sin leer el
// razonamiento de quien lo arregló: color de la cruz, rótulos de la tabla bajo 834 px, el reloj sin JS, notas
// repetidas, paréntesis sin cerrar, cifras viejas.
// (tableros/e12-laboratorio/tablero.html). No usa verificar.mjs de Lucía: lo vuelve a medir todo por su cuenta.
//
// 1. Contrato de página, leído del archivo tal cual: title de 2 a 4 palabras, meta viewport-fit-sides, gutter con
//    safe-area, tokens en :root, fondo en body, solo Google Fonts como hojas externas, scripts solo de
//    cdn.jsdelivr.net/npm con versión exacta, sin doctype/html/head/body.
// 2. Render a 360, 390, 768 y 1440 (envuelto como lo envuelve el publicador): desborde medido en la página, h1,
//    saltos de encabezado, img cargadas con su peso transferido y sus dimensiones, contraste de cada nodo de texto
//    compuesto sobre su fondo real, y las fichas de color (¿se ven?).
// 3. Demos: cursor con mouse, con teclado y con movimiento reducido; teléfono; resorte con mouse, teclado y reducido.
// Uso: node auditar-tablero.mjs <salida.json> <carpeta-capturas>
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [salida, capturas] = process.argv.slice(2);
const BASE = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-laboratorio';
const crudo = fs.readFileSync(path.join(BASE, 'tablero.html'), 'utf8');
const R = { fecha: new Date().toISOString(), contrato: {}, anchos: {}, demos: {}, imagenesEnDisco: {} };

// ---------- 1 · contrato, del archivo
{
  const c = R.contrato;
  const t = (crudo.match(/<title>([^<]*)<\/title>/) || [])[1] || null;
  c.title = t; c.palabrasTitle = t ? t.trim().split(/\s+/).length : 0;
  c.viewportFitSides = /<meta name="claude:viewport-fit-sides" content="cover">/.test(crudo);
  c.gutterSafeArea = /padding-left:\s*max\(16px,\s*env\(safe-area-inset-left/.test(crudo) && /padding-right:\s*max\(16px,\s*env\(safe-area-inset-right/.test(crudo);
  const root = (crudo.match(/:root\s*\{([^}]*)\}/) || [])[1] || '';
  c.tokensEnRoot = (root.match(/--[a-z-]+\s*:/g) || []).map(s => s.replace(/\s*:/, ''));
  c.fondoEnBody = /body\s*\{[^}]*background:\s*var\(--papel\)/.test(crudo);
  c.temaOscuro = /prefers-color-scheme:\s*dark/.test(crudo) ? 'sí' : 'no (solo claro; color-scheme: light)';
  c.hojasExternas = [...crudo.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m => m[1]);
  c.scriptsExternos = [...crudo.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
  c.scriptsConVersionExacta = c.scriptsExternos.every(u => /^https:\/\/cdn\.jsdelivr\.net\/npm\/[^@/]+@\d+\.\d+\.\d+\//.test(u));
  c.esqueleto = { doctype: /<!doctype/i.test(crudo), html: /<html[\s>]/i.test(crudo), head: /<head[\s>]/i.test(crudo), body: /<body[\s>]/i.test(crudo) };
  c.atributosStyleDuplicados = [...crudo.matchAll(/<[^>]*style="[^"]*"[^>]*style="[^"]*"[^>]*>/g)].map(m => m[0].slice(0, 140));
  c.rayas = (crudo.match(/[—–]/g) || []).length;
}
// pesos en disco de cada imagen y del manifiesto
{
  const man = JSON.parse(fs.readFileSync(path.join(BASE, 'img/manifiesto.json'), 'utf8'));
  let total = 0, mayor = 0, difieren = [];
  for (const im of man.imagenes) {
    const b = fs.statSync(path.join(BASE, im.img)).size; total += b; mayor = Math.max(mayor, b);
    if (b !== im.bytes) difieren.push([im.img, im.bytes, b]);
  }
  const enCarpeta = fs.readdirSync(path.join(BASE, 'img')).filter(f => /\.(jpe?g|png|webp|svg)$/i.test(f));
  R.imagenesEnDisco = { archivos: enCarpeta.length, enManifiesto: man.imagenes.length, totalBytes: total, totalManifiesto: man.total, mayorBytes: mayor, difierenDelManifiesto: difieren };
}

// ---------- servidor local y envoltura del publicador
const corte = crudo.indexOf('<div class="marco">');
const envuelto = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;
const PUERTO = 8796;
const URL_T = `http://127.0.0.1:${PUERTO}/qa-envuelto.html`;
const servidor = spawn('python3', ['-I', '-m', 'http.server', String(PUERTO), '--bind', '127.0.0.1', '--directory', BASE], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 900));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1' } : undefined });
R.navegador = nav.version();

async function abrir(opciones, extra = {}) {
  const ctx = await nav.newContext({ timezoneId: 'America/Santiago', locale: 'es-CL', ...opciones });
  await ctx.route(URL_T, r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
  const p = await ctx.newPage();
  if (extra.reducido) await p.emulateMedia({ reducedMotion: 'reduce' });
  const errores = [], bytes = {};
  p.on('pageerror', e => errores.push('página: ' + String(e)));
  p.on('console', m => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });
  p.on('requestfailed', r => errores.push('falló ' + r.url() + ' ' + (r.failure() || {}).errorText));
  p.on('response', async r => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); if (r.url().includes('/img/')) { try { bytes[r.url().split('/img/')[1]] = (await r.body()).length; } catch (e) {} } });
  for (let i = 0; i < 4; i++) {
    await p.goto(URL_T, { waitUntil: 'load', timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    const ok = await p.evaluate(() => !!window.Motion && ['Mona Sans', 'DM Mono', 'Google Sans Flex'].every(f => [...document.fonts].some(x => x.family.replace(/"/g, '') === f && x.status === 'loaded')));
    if (ok) break;
    await p.waitForTimeout(1500);
  }
  return { ctx, p, errores, bytes };
}

const MEDIR = () => {
  const de = document.documentElement;
  const cw = de.clientWidth;
  const out = { clientWidth: cw, scrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth };
  out.salen = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > cw + 0.5 || r.left < -0.5); })
    .filter(e => !e.closest('.circulo') && getComputedStyle(e).position !== 'fixed')
    .slice(0, 10).map(e => e.tagName.toLowerCase() + '.' + (e.className || '').toString().split(' ')[0] + ' ' + Math.round(e.getBoundingClientRect().right));
  out.h1 = document.querySelectorAll('h1').length;
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
  out.saltos = []; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) { const h = document.querySelectorAll('h1,h2,h3,h4,h5,h6')[i]; out.saltos.push('h' + hs[i - 1] + ' → h' + hs[i] + ' «' + h.textContent.trim().slice(0, 40) + '»'); }
  out.landmarks = { header: document.querySelectorAll('header').length, nav: document.querySelectorAll('nav').length, main: document.querySelectorAll('main').length, footer: document.querySelectorAll('footer').length };
  out.imgs = [...document.images].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, natural: i.naturalWidth + 'x' + i.naturalHeight, atributos: i.getAttribute('width') + 'x' + i.getAttribute('height'), alt: !!i.getAttribute('alt') }));
  // contraste: cada nodo de texto visible, color compuesto sobre el primer fondo opaco hacia arriba
  const cv = document.createElement('canvas').getContext('2d');
  const rgba = (c) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; const m = c.match(/\/\s*([\d.]+)\)|,\s*([\d.]+)\)$/); const a = c.startsWith('rgba') || c.includes('/') ? parseFloat((m && (m[1] || m[2])) || '1') : 1; return [d[0], d[1], d[2], isNaN(a) ? 1 : a]; };
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const mezcla = (f, b) => [0, 1, 2].map(i => f[i] * f[3] + b[i] * (1 - f[3]));
  const fondoDe = (el) => {
    const capas = []; let e = el;
    while (e) { const s = getComputedStyle(e); if (s.backgroundImage !== 'none') return null; const c = rgba(s.backgroundColor); if (c[3] > 0) { capas.push(c); if (c[3] >= 1) break; } e = e.parentElement; }
    let base = [255, 255, 255]; for (let i = capas.length - 1; i >= 0; i--) base = mezcla(capas[i], base); return base;
  };
  const opac = (el) => { let o = 1, e = el; while (e) { o *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; } return o; };
  const nodos = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) { const n = w.currentNode; if (!n.textContent.trim()) continue; const el = n.parentElement; if (!el || el.closest('script,style,svg,.circulo')) continue; const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue; const s = getComputedStyle(el); if (s.visibility === 'hidden') continue; const o = opac(el); if (o < 0.05) continue; nodos.push({ el, n, s, o }); }
  out.textos = nodos.length; out.bajoAA = []; out.cobaltoComoTexto = []; out.tamanos = {};
  for (const { el, n, s, o } of nodos) {
    const f = fondoDe(el); if (!f) continue;
    const c = rgba(s.color); const efectivo = [c[0], c[1], c[2], c[3] * o];
    const comp = mezcla(efectivo, f);
    const la = L(comp), lb = L(f); const rat = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    const px = parseFloat(s.fontSize); out.tamanos[px] = (out.tamanos[px] || 0) + 1;
    const grande = px >= 24 || (px >= 18.66 && parseInt(s.fontWeight) >= 700);
    if (rat < (grande ? 3 : 4.5)) out.bajoAA.push({ texto: n.textContent.trim().slice(0, 50), ratio: Math.round(rat * 100) / 100, px, color: s.color });
    if (/rgb\(0, 41, 255\)/.test(s.color)) out.cobaltoComoTexto.push({ texto: n.textContent.trim().slice(0, 50), ratio: Math.round(rat * 100) / 100, px });
  }
  out.menorTamano = Math.min(...Object.keys(out.tamanos).map(Number));
  // fichas de color: ¿tienen contorno? (las tres claras van sobre el papel)
  out.fichas = [...document.querySelectorAll('.ficha__chip')].map(ch => { const s = getComputedStyle(ch); return { fondo: s.backgroundColor, contorno: s.outlineStyle + ' ' + s.outlineWidth, borde: s.borderStyle + ' ' + s.borderWidth, styleAttr: ch.getAttribute('style') }; });

  // vuelta 2 · la cruz de registro: color de sus dos trazos y del dibujo
  out.registro = [...document.querySelectorAll('.registro')].map(s => { const b = getComputedStyle(s, '::before'), a = getComputedStyle(s, '::after'); const r = s.getBoundingClientRect(); return { id: s.id, antes: b.content !== 'none' ? b.borderTopWidth + ' ' + b.borderTopColor + ' en x=' + Math.round(r.x + parseFloat(b.left)) + ' w=' + b.width : null, despues: a.content !== 'none' ? a.borderLeftWidth + ' ' + a.borderLeftColor + ' en x=' + Math.round(r.x + parseFloat(a.left)) + ' h=' + a.height : null, bordeSeccion: getComputedStyle(s).borderTopColor, ladoBorde: (() => { const l = s.querySelector('.seccion__lado'); if (!l) return null; const ls = getComputedStyle(l); return ls.borderRightWidth + ' ' + ls.borderRightStyle + ' · borde derecho del lado en x=' + Math.round(l.getBoundingClientRect().right); })() }; });
  out.registroSvg = [...document.querySelectorAll('svg.registro-dibujo [stroke]')].map(e => e.getAttribute('stroke')).filter((v, i, a) => a.indexOf(v) === i);
  // tabla de resortes: ¿se ve el thead? ¿cada celda trae su rótulo visible?
  out.tablaResortes = [...document.querySelectorAll('table')].map(t => { const th = t.querySelector('thead'); const cap = t.querySelector('caption'); const code = cap ? [...cap.querySelectorAll('code')].map(c => { const s = getComputedStyle(c); return c.textContent + ' ' + s.fontSize + ' ' + s.textTransform; }) : []; const tds = [...t.querySelectorAll('td')]; const conRotulo = tds.filter(td => { const b = getComputedStyle(td, '::before'); return b.content && b.content !== 'none' && b.content !== '""' && b.display !== 'none'; }).length; return { theadVisible: th ? getComputedStyle(th).display !== 'none' && th.getBoundingClientRect().height > 0 : null, celdas: tds.length, celdasConRotuloVisible: conRotulo, captionCode: code }; });
  // texto visible: lo que el acta pedía no ver
  const tv = document.body.innerText;
  out.texto = {
    palabras: (tv.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,%-]*/gu) || []).length,
    publicableNotas: (tv.match(/Publicable:/g) || []).length,
    notaLarga: (tv.match(/Los kB, sí, con fecha y método/g) || []).length,
    publicableMayusTrasDosPuntos: (tv.match(/publicable: [A-ZÁÉÍÓÚ]/gi) || []).length,
    parentesisAbiertoMedicionJs: /\(medicion\.js(?!on)/.test(tv),
    fechaDelBuild: (tv.match(/.{0,60}[Ff]echa del build.{0,80}/g) || []),
    cinco: (tv.match(/.{0,50}\bcinco\b.{0,50}/g) || []),
    seis: (tv.match(/.{0,40}\bseis\b.{0,40}/g) || []),
    unoTreintaYDos: (tv.match(/.{0,40}1,32.{0,40}/g) || []),
    unoCincoMB: (tv.match(/.{0,40}1,5 MB.{0,40}/g) || []),
    kbMayus: (tv.match(/.{0,30}\d KB.{0,20}/g) || []),
    formIntelligence: (tv.match(/Form & Intelligence/g) || []).length,
    rayas: (tv.match(/[—–]/g) || []).length,
    reloj: [...document.querySelectorAll('.reloj')].map(n => n.textContent),
  };
  // paréntesis desbalanceados por bloque de texto (li, td, p, figcaption, dd)
  out.parentesisDesbalanceados = [...document.querySelectorAll('li, td, p, figcaption, dd, th')].filter(e => !e.querySelector('li, td, p')).map(e => e.innerText).filter(t => (t.match(/\(/g) || []).length !== (t.match(/\)/g) || []).length).map(t => t.slice(0, 160));
  out.motion = !!window.Motion; out.claseHtml = de.className;
  out.alto = de.scrollHeight;
  return out;
};

for (const ancho of [360, 390, 768, 1440]) {
  const movil = ancho < 768;
  const { ctx, p, errores, bytes } = await abrir({ viewport: { width: ancho, height: movil ? 800 : 900 }, deviceScaleFactor: movil ? 2 : 1, isMobile: movil, hasTouch: movil });
  // bajar por toda la página para que carguen las img perezosas
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.waitForLoadState('networkidle').catch(() => {});
  await p.waitForTimeout(800);
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
  const m = await p.evaluate(MEDIR);
  m.errores = errores; m.bytesImg = bytes;
  if (ancho === 1440) fs.writeFileSync(path.join(path.dirname(salida), 'tablero-texto-1440.txt'), await p.evaluate(() => document.body.innerText));
  R.anchos[ancho] = m;
  await p.screenshot({ path: path.join(capturas, `tablero-${ancho}-primera.jpg`), type: 'jpeg', quality: 72 });
  if (ancho === 1440) {
    // la cruz de registro de la sección 2, ampliada
    await p.evaluate(() => { const s = document.querySelector('#medido'); window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - 300, behavior: 'instant' }); });
    await p.waitForTimeout(400);
    const c = await p.evaluate(() => { const r = document.querySelector('#medido').getBoundingClientRect(); return { x: r.x + 300, y: r.y - 20, width: 60, height: 40 }; });
    await p.screenshot({ path: path.join(capturas, 'registro-cruz-1440.png'), clip: c, scale: 'device' });
    await p.evaluate(() => scrollTo(0, 0));
  }
  if (ancho === 390) {
    await p.evaluate(() => { const t = [...document.querySelectorAll('table')].pop(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 10, behavior: 'instant' }); });
    await p.waitForTimeout(400);
    const c = await p.evaluate(() => { const r = [...document.querySelectorAll('table')].pop().getBoundingClientRect(); return { x: 0, y: Math.max(0, r.y), width: 390, height: Math.min(780, r.height) }; });
    await p.screenshot({ path: path.join(capturas, 'tabla-resortes-390.jpg'), type: 'jpeg', quality: 75, clip: c });
    await p.evaluate(() => scrollTo(0, 0));
  }
  // página completa en tramos de 4000 px (el tope de una captura de Chromium es ~16 000 px)
  if (ancho === 390 || ancho === 1440) {
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0, k = 1; y < total; y += 4000, k++) {
      await p.screenshot({ path: path.join(capturas, `tablero-${ancho}-completa-${String(k).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 45, fullPage: true, clip: { x: 0, y, width: ancho, height: Math.min(4000, total - y) } });
    }
  }
  await ctx.close();
}


// ---------- sin JS: ¿qué hora muestra el reloj? (vista previa, miniatura)
{
  const ctx = await nav.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  await ctx.route(URL_T, r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
  const p = await ctx.newPage();
  await p.goto(URL_T, { waitUntil: 'load' });
  R.sinJs = await p.evaluate(() => ({ reloj: [...document.querySelectorAll('.reloj')].map(n => n.textContent), muestraMono: [...document.querySelectorAll('body *')].filter(e => /build/i.test(e.textContent) && e.children.length < 3).slice(0, 3).map(e => e.textContent.trim().slice(0, 160)) }));
  await ctx.close();
}

// ---------- 3 · demos a 1440 con mouse fino
{
  const { ctx, p } = await abrir({ viewport: { width: 1440, height: 900 } });
  const d = R.demos;
  await p.evaluate(() => document.querySelector('.pieza').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(400);
  const caja = await p.evaluate(() => { const r = document.querySelector('.pieza__medio').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  await p.mouse.move(caja.x - 60, caja.y + 40); await p.waitForTimeout(200);
  await p.mouse.move(caja.x + caja.w / 2, caja.y + caja.h / 2, { steps: 6 }); await p.waitForTimeout(500);
  const leer = () => { const c = document.querySelector('.circulo'); const r = c.getBoundingClientRect(); const s = getComputedStyle(c); return { clase: document.documentElement.className, centro: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)], ancho: Math.round(r.width), visibilidad: s.visibility, display: s.display, fondo: s.backgroundColor, texto: c.textContent }; };
  d.mouseDentro = await p.evaluate(leer); d.mouseDentro.puntero = [Math.round(caja.x + caja.w / 2), Math.round(caja.y + caja.h / 2)];
  d.cursorSistemaSobreMedio = await p.evaluate(([x, y]) => getComputedStyle(document.elementFromPoint(x, y)).cursor, d.mouseDentro.puntero);
  await p.screenshot({ path: path.join(capturas, 'demo-cursor-mouse-1440.jpg'), type: 'jpeg', quality: 72, clip: { x: Math.max(0, caja.x - 20), y: Math.max(0, caja.y - 20), width: Math.min(760, caja.w + 40), height: caja.h + 120 } });
  // salto de 240 px dentro de la pieza: cuadro a cuadro
  await p.evaluate(() => { window.__q = []; const c = document.querySelector('.circulo'); const t0 = performance.now(); const f = () => { const r = c.getBoundingClientRect(); window.__q.push([Math.round(performance.now() - t0), Math.round(r.x + r.width / 2)]); if (performance.now() - t0 < 400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  const x0 = caja.x + caja.w / 2 - 120, x1 = caja.x + caja.w / 2 + 120;
  await p.mouse.move(x0, caja.y + caja.h / 2); await p.waitForTimeout(350);
  await p.evaluate(() => { window.__q = []; const c = document.querySelector('.circulo'); const t0 = performance.now(); const f = () => { const r = c.getBoundingClientRect(); window.__q.push([Math.round(performance.now() - t0), Math.round(r.x + r.width / 2)]); if (performance.now() - t0 < 400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.mouse.move(x1, caja.y + caja.h / 2); await p.waitForTimeout(500);
  const q = await p.evaluate(() => window.__q);
  const desde = q[0][1]; const t90 = (q.find(([t, x]) => (x - desde) / (x1 - desde) >= 0.9) || [null])[0];
  d.salto = { px: Math.round(x1 - x0), llegaAl90msDesdeElEvento: t90, maxX: Math.max(...q.map(s => s[1])), destino: Math.round(x1), sobrepasoPx: Math.max(0, Math.max(...q.map(s => s[1])) - Math.round(x1)) };
  // salir
  await p.mouse.move(caja.x + caja.w / 2, caja.y - 80, { steps: 4 }); await p.waitForTimeout(500);
  d.mouseFuera = await p.evaluate(leer);
  d.cursorSistemaFuera = await p.evaluate(() => getComputedStyle(document.querySelector('.pieza__pie')).cursor);
  // teclado: Tab hasta la pieza
  await p.mouse.move(caja.x + caja.w / 2, caja.y + caja.h / 2, { steps: 3 }); await p.waitForTimeout(400);
  await p.evaluate(() => { document.activeElement && document.activeElement.blur(); const a = document.querySelector('.pieza'); const prev = [...document.querySelectorAll('a,button,input')]; const i = prev.indexOf(a); (prev[i - 1] || document.body).focus(); });
  await p.keyboard.press('Tab'); await p.waitForTimeout(400);
  d.teclado = await p.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a); const c = document.querySelector('.circulo'); return { enfocado: a.className, contorno: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor + ' a ' + s.outlineOffset, rotuloQuieto: getComputedStyle(document.querySelector('.pieza__ir')).opacity, clase: document.documentElement.className, circuloVisible: getComputedStyle(c).visibility, circuloAncho: Math.round(c.getBoundingClientRect().width) }; });
  await p.screenshot({ path: path.join(capturas, 'demo-cursor-teclado-1440.jpg'), type: 'jpeg', quality: 72, clip: { x: Math.max(0, caja.x - 20), y: Math.max(0, caja.y - 20), width: Math.min(760, caja.w + 40), height: caja.h + 120 } });
  await p.mouse.move(caja.x + caja.w / 2 + 30, caja.y + caja.h / 2 + 10, { steps: 3 }); await p.waitForTimeout(500);
  d.vuelveConMouse = await p.evaluate(leer);
  // recorrido de Tab completo: cada parada con foco visible
  await p.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0, 0); });
  const paradas = [];
  for (let i = 0; i < 60; i++) {
    await p.keyboard.press('Tab');
    const s = await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return null; const st = getComputedStyle(a); const r = a.getBoundingClientRect(); return { el: a.tagName.toLowerCase() + (a.id ? '#' + a.id : '') + (a.getAttribute('href') ? '[' + a.getAttribute('href').slice(0, 40) + ']' : '') + (a.value && a.type === 'radio' ? '=' + a.value : ''), contorno: st.outlineStyle !== 'none' && parseFloat(st.outlineWidth) >= 1, alto: Math.round(r.height), ancho: Math.round(r.width) }; });
    if (!s) break; if (paradas.length && paradas[0].el === s.el) break; paradas.push(s);
  }
  d.tab = { paradas: paradas.length, sinContorno: paradas.filter(x => !x.contorno).map(x => x.el), lista: paradas.map(x => x.el + ' ' + x.ancho + 'x' + x.alto) };
  // resorte con teclado: flechas en los radios y Enter en Mover
  await p.focus('input[name="resorte"][value="entrada"]');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(100);
  const elegido = await p.evaluate(() => document.querySelector('input[name="resorte"]:checked').value);
  await p.focus('#mover'); await p.keyboard.press('Enter'); await p.waitForTimeout(900);
  d.resorteTeclado = { elegidoConFlecha: elegido, lectura: await p.evaluate(() => document.querySelector('.lectura').textContent), vivo: await p.evaluate(() => { const v = document.querySelector('.lectura .vivo'); if (!v) return null; const s = getComputedStyle(v); return { color: s.color, tam: s.fontSize, fondo: getComputedStyle(document.querySelector('.demo-resorte')).backgroundColor }; }) };
  await p.keyboard.press(' '); await p.waitForTimeout(900);
  d.resorteEspacio = await p.evaluate(() => document.querySelector('.lectura').textContent);
  // resorte con mouse, los tres
  d.resorteMouse = {};
  for (const r of ['cursor', 'estado', 'entrada']) { await p.click(`input[value="${r}"]`); await p.click('#mover'); await p.waitForTimeout(900); d.resorteMouse[r] = await p.evaluate(() => document.querySelector('.lectura').textContent); }
  await p.evaluate(() => document.querySelector('.demo-resorte').scrollIntoView({ block: 'center' }));
  await p.screenshot({ path: path.join(capturas, 'demo-resorte-1440.jpg'), type: 'jpeg', quality: 72, clip: await p.evaluate(() => { const r = document.querySelector('.demo-resorte').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }) });
  // gráfico: la cruz con el puntero
  const g = await p.evaluate(() => { const z = document.querySelector('.g-panel[data-clave="entrada"] .g-zona'); z.scrollIntoView({ block: 'center' }); const r = z.getBoundingClientRect(); return { x: r.x + r.width * 0.43, y: r.y + r.height / 2 }; });
  await p.mouse.move(g.x, g.y, { steps: 3 }); await p.waitForTimeout(200);
  d.grafico = await p.evaluate(() => { const f = document.querySelector('.g-panel[data-clave="entrada"]'); return { cruz: f.querySelector('.g-cruz').getAttribute('visibility'), tip: f.querySelector('.g-tip').textContent }; });
  // fichas de color: recorte para ver si las claras se distinguen del papel
  await p.evaluate(() => document.querySelector('.fichas').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(200);
  await p.screenshot({ path: path.join(capturas, 'fichas-de-color-1440.jpg'), type: 'jpeg', quality: 80, clip: await p.evaluate(() => { const r = document.querySelector('.fichas').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }) });
  await ctx.close();
}
// movimiento reducido a 1440
{
  const { ctx, p } = await abrir({ viewport: { width: 1440, height: 900 } }, { reducido: true });
  const d = R.demos.reducido = {};
  await p.evaluate(() => document.querySelector('.pieza').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  const caja = await p.evaluate(() => { const r = document.querySelector('.pieza__medio').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await p.mouse.move(caja.x, caja.y, { steps: 4 }); await p.waitForTimeout(400);
  d.clase = await p.evaluate(() => document.documentElement.className);
  d.circulo = await p.evaluate(() => getComputedStyle(document.querySelector('.circulo')).display);
  d.cursorSistema = await p.evaluate(([x, y]) => getComputedStyle(document.elementFromPoint(x, y)).cursor, [caja.x, caja.y]);
  d.rotuloAlPasar = await p.evaluate(() => getComputedStyle(document.querySelector('.pieza__ir')).opacity);
  await p.click('#mover');
  d.animacionesTrasMover = await p.evaluate(() => document.getAnimations().length);
  d.transformInmediato = await p.evaluate(() => getComputedStyle(document.querySelector('.bloque')).transform);
  d.lectura = await p.evaluate(() => document.querySelector('.lectura').textContent);
  await ctx.close();
}
// teléfono a 390
{
  const { ctx, p } = await abrir({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const d = R.demos.telefono = {};
  d.clase = await p.evaluate(() => document.documentElement.className);
  d.circulo = await p.evaluate(() => getComputedStyle(document.querySelector('.circulo')).display);
  await p.evaluate(() => document.querySelector('.pieza').scrollIntoView({ block: 'center' }));
  await p.tap('.pieza__pie').catch(() => {});
  d.trasToque = await p.evaluate(() => location.hash);
  // áreas táctiles de los controles
  d.areas = await p.evaluate(() => [...document.querySelectorAll('.indice a, .resorte__tipo label, #mover')].map(e => { const r = e.getBoundingClientRect(); return (e.textContent || '').trim().slice(0, 18) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height); }));
  await ctx.close();
}

await nav.close();
servidor.kill();
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
console.log(JSON.stringify({ contrato: R.contrato, imagenes: R.imagenesEnDisco, sinJs: R.sinJs }, null, 1));
for (const [a, m] of Object.entries(R.anchos)) console.log(a, 'sw', m.scrollWidth, 'cw', m.clientWidth, 'salen', m.salen.length, 'h1', m.h1, 'saltos', JSON.stringify(m.saltos), 'imgs', m.imgs.filter(i => i.ok).length + '/' + m.imgs.length, 'textos', m.textos, 'bajoAA', m.bajoAA.length, 'min', m.menorTamano, 'err', m.errores.length, 'motion', m.motion, m.claseHtml);
console.log(JSON.stringify(R.demos, null, 1));
