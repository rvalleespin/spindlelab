// QA E12 paso 2, vuelta 2 (Javiera; copia de la vuelta 1). Mide el tablero de la compuerta 2 sin usar el verificador de Lucía.
// Envuelve tablero.html como el publicador (doctype, head con lo que va antes del primer bloque, body), lo sirve desde
// el servidor local que ya corre (raíz del repo) y lo abre a 360, 390, 768 y 1440: desborde con y sin recorte en
// html/body, h1 y saltos de encabezado, texto bajo 11 px, contraste compuesto de cada nodo de texto (con todos los
// <details> abiertos), imágenes y videos que cargan, errores de consola y red, hosts de terceros, foco con Tab.
// Uso: node tablero.mjs <url-de-la-carpeta-del-tablero> <tablero.html> <salida.json> <dir-capturas>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, archivo, salida, dirCap] = process.argv.slice(2);
fs.mkdirSync(dirCap, { recursive: true });
const crudo = fs.readFileSync(archivo, 'utf8');
const corte = crudo.search(/<\/style>\s*/) + '</style>'.length;
// lo que va antes de cerrar el primer <style> es cabeza; el resto, cuerpo (el publicador decide igual: metas y estilos arriba)
const envuelto = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;
const URL_T = base.replace(/\/$/, '') + '/__tablero-qa.html';
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost' } : undefined });
const R = { fecha: new Date().toISOString(), anchos: {} };

function medirTexto() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (s) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(0,0,0,0)'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const sobre = (t, b) => [0, 1, 2].map((i) => t[i] * t[3] + b[i] * (1 - t[3]));
  const opac = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; };
  const out = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = tw.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue;
    const el = n.parentElement; if (!el || el.closest('script,style')) continue;
    const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') continue;
    const rg = document.createRange(); rg.selectNodeContents(n); const r = [...rg.getClientRects()].find((x) => x.width > 0.5 && x.height > 0.5); if (!r) continue;
    const op = opac(el); if (op < 0.02) continue;
    // fondo: subir por los ancestros (no por el punto) componiendo hasta un opaco; si hay imagen o medio, se marca
    let capas = [], medio = null;
    for (let e = el; e; e = e.parentElement) {
      const c = getComputedStyle(e);
      if (/^(IMG|VIDEO|CANVAS)$/.test(e.tagName)) { medio = e.tagName; break; }
      if (c.backgroundImage !== 'none') { medio = 'bg-image'; break; }
      const k = rgba(c.backgroundColor); if (k[3] > 0) { capas.push(k); if (k[3] >= 0.999) break; }
    }
    let fondo = [255, 255, 255];
    for (let i = capas.length - 1; i >= 0; i--) fondo = sobre(capas[i], fondo);
    const tc = rgba(s.color); const tx = sobre([tc[0], tc[1], tc[2], tc[3] * op], fondo);
    const fs = +parseFloat(s.fontSize).toFixed(2), fw = parseInt(s.fontWeight, 10);
    const min = fs >= 24 || (fs >= 18.66 && fw >= 700) ? 3 : 4.5;
    out.push({ t: t.slice(0, 60), fs, min, cr: medio ? null : +cr(tx, fondo).toFixed(2), medio, oculto: !!el.closest('[aria-hidden="true"]') });
  }
  return out;
}

for (const ancho of [360, 390, 768, 1440]) {
  const movil = ancho < 768;
  const ctx = await nav.newContext({ viewport: { width: ancho, height: movil ? 800 : 900 }, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil, locale: 'es-CL', timezoneId: 'America/Santiago' });
  await ctx.route(URL_T, (r) => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
  const p = await ctx.newPage();
  const errores = [], terceros = new Set();
  p.on('pageerror', (e) => errores.push('pageerror ' + String(e).slice(0, 160)));
  p.on('console', (m) => { if (m.type() === 'error') errores.push('consola ' + m.text().slice(0, 160)); });
  p.on('response', (r) => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); });
  p.on('requestfailed', (r) => { const f = (r.failure() || {}).errorText || ''; if (!/ERR_ABORTED/.test(f)) errores.push('falló ' + r.url() + ' ' + f); });
  p.on('request', (r) => { const u = new URL(r.url()); if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname)) terceros.add(u.hostname); });
  await p.goto(URL_T, { waitUntil: 'networkidle', timeout: 120000 });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(dirCap, `tablero-${ancho}-primera.jpg`), type: 'jpeg', quality: 70 });
  // foco con Tab: las primeras 25 paradas
  const foco = [];
  for (let i = 0; i < 25; i++) {
    await p.keyboard.press('Tab');
    foco.push(await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return { tag: e.tagName.toLowerCase(), t: (e.textContent || '').trim().slice(0, 30), outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor, fv: e.matches(':focus-visible') }; }));
  }
  // abrir todos los <details> y recorrer la página y cada marco interno con scroll
  const det = await p.evaluate(() => { const d = [...document.querySelectorAll('details')]; d.forEach((x) => { x.open = true; }); return d.length; });
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
  await p.evaluate(async () => { for (const el of document.querySelectorAll('*')) { const s = getComputedStyle(el); if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 4) { for (let y = 0; y < el.scrollHeight; y += 600) { el.scrollTop = y; await new Promise((r) => setTimeout(r, 30)); } } } });
  await p.waitForTimeout(1500);
  const m = await p.evaluate(async () => {
    const de = document.documentElement;
    const medir = () => ({ sw: de.scrollWidth, cw: de.clientWidth, fuera: [...document.querySelectorAll('body *')].filter((e) => { const b = e.getBoundingClientRect(); return (b.width || b.height) && (b.right > de.clientWidth + 1 || b.left < -1); }).filter((e) => { for (let q = e.parentElement; q && q !== document.body; q = q.parentElement) { const o = getComputedStyle(q).overflowX; if (/(hidden|clip|auto|scroll)/.test(o)) return false; } return true; }).map((e) => e.tagName + '.' + (typeof e.className === 'string' ? e.className.split(' ')[0] : '')).slice(0, 8) });
    const tal = medir();
    const st = document.createElement('style'); st.textContent = 'html,body{overflow:visible!important;overflow-x:visible!important}'; document.head.appendChild(st);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const sin = medir(); st.remove();
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    const saltos = []; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) saltos.push(`h${hs[i - 1]}→h${hs[i]}`);
    const imgs = [...document.images]; const vids = [...document.querySelectorAll('video')];
    const fuentes = []; document.fonts.forEach((f) => { if (f.status === 'loaded') fuentes.push(f.family.replace(/["']/g, '') + ' ' + f.weight); });
    return { tal, sin, h1: document.querySelectorAll('h1').length, saltos, imgs: imgs.length, imgsRotas: imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')), sinAlt: imgs.filter((i) => !i.hasAttribute('alt')).length, vids: vids.length, vidsSinMeta: vids.filter((v) => v.readyState < 1).map((v) => v.currentSrc || v.getAttribute('src')), vidsCorriendo: vids.filter((v) => !v.paused).length, vidsAutoplay: vids.filter((v) => v.autoplay).length, fuentes: [...new Set(fuentes)], alto: de.scrollHeight };
  });
  // espera de metadata de video (preload puede ser none): se fuerza load() y se espera
  m.vidsMetaTrasLoad = await p.evaluate(async () => { const vs = [...document.querySelectorAll('video')]; await Promise.all(vs.map((v) => new Promise((r) => { if (v.readyState >= 1) return r(); v.preload = 'metadata'; v.addEventListener('loadedmetadata', r, { once: true }); v.addEventListener('error', r, { once: true }); v.load(); setTimeout(r, 8000); }))); return vs.filter((v) => v.readyState < 1).map((v) => (v.currentSrc || '').split('/').pop() + ' err ' + (v.error && v.error.code)); });
  const textos = await p.evaluate(medirTexto);
  m.textos = textos.length;
  m.bajo = textos.filter((x) => x.cr !== null && x.cr < x.min);
  m.chicos = textos.filter((x) => x.fs < 11);
  m.sobreMedio = textos.filter((x) => x.medio).length;
  m.foco = { paradas: foco.filter(Boolean).length, sinContorno: foco.filter((f) => f && /none/.test(f.outline)) };
  m.errores = errores; m.terceros = [...terceros];
  R.anchos[ancho] = m;
  console.log(ancho, 'sw/cw', m.tal.sw, m.tal.cw, 'sin', m.sin.sw, 'fuera', m.sin.fuera.length, 'h1', m.h1, 'saltos', m.saltos.length, 'details', det, 'imgs', m.imgs, 'rotas', m.imgsRotas.length, 'vids', m.vids, 'sinMeta', m.vidsMetaTrasLoad.length, 'corriendo', m.vidsCorriendo, 'textos', m.textos, 'bajo', m.bajo.length, 'chicos', m.chicos.length, 'foco sin contorno', m.foco.sinContorno.length, 'errores', errores.length, 'terceros', [...terceros].join(','), 'fuentes', m.fuentes.join('|'));
  await ctx.close();
}
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
await nav.close();
