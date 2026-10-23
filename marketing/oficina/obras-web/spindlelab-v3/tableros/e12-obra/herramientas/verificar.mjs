// E12 · Verificación del tablero de la obra construida (Lucía, 23-oct-2026). Es la del tablero de la compuerta 2
// (tableros/e12-direcciones/herramientas/verificar.mjs, 17-oct), con las letras de A, sin scripts externos, el tope de
// 250 archivos y los enlaces a las rutas que abren su plegable.
//
// Sirve la carpeta del tablero en 127.0.0.1 (un puerto libre que elige el sistema), envuelve `tablero.html` como lo
// hace el publicador (doctype, head y body: el archivo no los trae) y lo abre en el Chromium del entorno con el
// Playwright de spindlelab-astro, por el proxy del entorno (las letras vienen de Google Fonts). A 360, 390, 768 y 1440:
//   - desborde horizontal (scrollWidth y cada elemento que se sale del ancho de la ventana);
//   - un solo h1, la jerarquía de encabezados sin saltos y el texto más chico (piso de 11 px);
//   - los <details>: cuántos hay, que se abren con un clic y con el teclado (Enter sobre su summary), y que lo que traen
//     se ve una vez abiertos;
//   - todas las imágenes cargadas (naturalWidth > 0), con los <details> abiertos y cada marco de página recorrido;
//   - todos los videos: su póster carga, su metadata carga (duración y ancho) desde la fuente que elige el navegador, y
//     ninguno corre solo (las fuentes H.264 se comprueban con ffprobe en armar-tablero.py: este Chromium no las lee);
//   - las dos letras de A cargadas (Google Sans Flex y DM Mono) y nada más de terceros que Google Fonts;
//   - los enlaces «La página entera de…» y una dirección con #r-<ruta> abren el plegable de esa ruta;
//   - el contraste de cada nodo de texto contra su primer fondo opaco (piso 4,5:1, o 3:1 desde 24 px);
//   - errores de consola, de página y de red;
//   - el tema (acta del paso 2, defecto 18): los selectores de tema del publicador están declarados, y con el visor en
//     claro o en oscuro, y con data-theme="light" o "dark" en la raíz, el fondo, el texto y los tokens son los mismos.
// Además, fuera del navegador: que `archivos.json` liste exactamente lo que el HTML referencia, que cada imagen pese
// 450 kB o menos, cada video 8 MB o menos, la página 16 MB o menos, el total 60 MB o menos y 250 archivos o menos, que
// no haya scripts externos, y que el HTML cumpla el contrato del publicador.
// Escribe `verificacion/resultado.json` y unas capturas chicas en `verificacion/`; las de página completa van a una
// carpeta temporal (TMP_E12), solo para mirarlas.
//
// Uso: node herramientas/verificar.mjs          (desde cualquier carpeta)
import fs from 'node:fs';
import os from 'node:os';
import net from 'node:net';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(BASE, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const SALIDA = path.join(BASE, 'verificacion');
const TMP = path.join(process.env.TMP_E12 || os.tmpdir(), 'e12-tablero-obra');
fs.mkdirSync(SALIDA, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const resultado = { fecha: new Date().toISOString(), medidoPor: 'Lucía (dirección de arte), herramientas/verificar.mjs', anchos: {}, contrato: {}, fallas: [] };
const falla = (m) => { resultado.fallas.push(m); console.log('FALLA', m); };

// ---------------------------------------------------------------- 0 · contrato y archivos, sin navegador
const crudo = fs.readFileSync(path.join(BASE, 'tablero.html'), 'utf8');
const archivos = JSON.parse(fs.readFileSync(path.join(BASE, 'archivos.json'), 'utf8'));
{
  const c = resultado.contrato;
  const visible = crudo.replace(/<style>[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, '');
  c.title = (crudo.match(/<title>([^<]+)<\/title>/) || [])[1];
  c.palabrasTitle = c.title ? c.title.trim().split(/\s+/).length : 0;
  c.sinEsqueleto = !/<!doctype|<(html|head|body)[\s>]/i.test(crudo);
  c.metaLados = crudo.includes('<meta name="claude:viewport-fit-sides" content="cover">');
  c.comentariosHtml = (crudo.match(/<!--/g) || []).length;
  c.rayas = (visible.match(/—/g) || []).length;
  c.hojasExternas = [...crudo.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]);
  c.scriptsExternos = [...crudo.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  c.tokensEnRoot = /:root\s*\{[^}]*--lienzo/.test(crudo);
  c.fondoBody = /body\s*\{[^}]*background:/.test(crudo);
  c.gutter = /padding-left: max\(16px, env\(safe-area-inset-left/.test(crudo) && /padding-right: max\(16px, env\(safe-area-inset-right/.test(crudo);
  c.temaOscuro = /@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{[^}]*--lienzo/.test(crudo);
  c.temaDataDark = /:root\[data-theme="dark"\][^{]*\{[^}]*--lienzo/.test(crudo);
  c.temaDataLight = /:root\[data-theme="light"\][^{]*\{[^}]*--lienzo/.test(crudo);
  const refs = [...new Set([...crudo.matchAll(/(?:src|poster)="((?:img|video)\/[^"]+)"/g)].map((m) => m[1]))].sort();
  c.referencias = refs.length;
  c.faltanEnArchivosJson = refs.filter((r) => !archivos.rutas.includes(r));
  c.sobranEnArchivosJson = archivos.rutas.filter((r) => !refs.includes(r));
  let total = Buffer.byteLength(crudo);
  c.imagenesSobre450kB = [];
  c.videosSobre8MB = [];
  c.noExisten = [];
  for (const r of refs) {
    const p = path.join(BASE, r);
    if (!fs.existsSync(p)) { c.noExisten.push(r); continue; }
    const t = fs.statSync(p).size;
    total += t;
    if (r.startsWith('img/') && (t > 450000 || !r.endsWith('.jpg'))) c.imagenesSobre450kB.push(`${r} ${t}`);
    if (r.startsWith('video/') && t > 8000000) c.videosSobre8MB.push(`${r} ${t}`);
  }
  // toda imagen de img/, la use o no el tablero, en 450 kB o menos
  c.enImgSobre450kB = fs.readdirSync(path.join(BASE, 'img')).filter((f) => fs.statSync(path.join(BASE, 'img', f)).size > 450000);
  c.bytesTotal = total;
  c.bytesPagina = Buffer.byteLength(crudo);
  if (!c.title || c.palabrasTitle < 2 || c.palabrasTitle > 4) falla(`title de ${c.palabrasTitle} palabras: ${c.title}`);
  if (!c.sinEsqueleto) falla('el HTML trae doctype, html, head o body');
  if (!c.metaLados) falla('falta claude:viewport-fit-sides');
  if (c.comentariosHtml) falla(`${c.comentariosHtml} comentarios HTML`);
  if (c.rayas) falla(`${c.rayas} rayas en el texto`);
  if (c.hojasExternas.some((h) => !h.startsWith('https://fonts.googleapis.com/'))) falla('hoja externa fuera de Google Fonts');
  if (c.scriptsExternos.length) falla(`scripts externos: ${c.scriptsExternos}`);
  c.archivos = refs.length + 1;
  if (c.archivos > 250 || archivos.archivos !== c.archivos) falla(`archivos: ${c.archivos} (archivos.json dice ${archivos.archivos})`);
  if (archivos.bytesTotal !== total) falla(`archivos.json dice ${archivos.bytesTotal} bytes y suman ${total}`);
  if (!c.tokensEnRoot || !c.fondoBody || !c.gutter) falla('tokens en :root, fondo de body o gutter');
  if (!c.temaOscuro || !c.temaDataDark || !c.temaDataLight) falla('faltan los selectores de tema (prefers-color-scheme y data-theme)');
  if (c.faltanEnArchivosJson.length || c.sobranEnArchivosJson.length) falla(`archivos.json no calza: faltan ${c.faltanEnArchivosJson} · sobran ${c.sobranEnArchivosJson}`);
  if (c.noExisten.length) falla(`no existen: ${c.noExisten}`);
  if (c.imagenesSobre450kB.length || c.enImgSobre450kB.length) falla(`imágenes sobre 450 kB: ${c.imagenesSobre450kB} ${c.enImgSobre450kB}`);
  if (c.videosSobre8MB.length) falla(`videos sobre 8 MB: ${c.videosSobre8MB}`);
  if (total > 60000000) falla(`total ${total} bytes, pasa de 60 MB`);
  if (c.bytesPagina > 16000000) falla('la página pasa de 16 MB');
  console.log('contrato', JSON.stringify({ ...c, hojasExternas: c.hojasExternas.length, scriptsExternos: c.scriptsExternos.length }));
}

// ---------------------------------------------------------------- servidor y navegador
const puerto = await new Promise((res) => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const URL_T = `http://127.0.0.1:${puerto}/tablero-envuelto.html`;
const corte = crudo.indexOf('<div class="marco">');
const envuelto = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;
const servidor = spawn('python3', ['-I', '-m', 'http.server', String(puerto), '--bind', '127.0.0.1', '--directory', BASE], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 900));
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1' } : undefined,
});
resultado.navegador = nav.version();
resultado.puerto = puerto;

async function abrir(opciones) {
  const ctx = await nav.newContext({ timezoneId: 'America/Santiago', locale: 'es-CL', ...opciones });
  await ctx.route(URL_T, (r) => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
  const pg = await ctx.newPage();
  const errores = [];
  const terceros = new Set();
  pg.on('pageerror', (e) => errores.push('error de página: ' + String(e)));
  pg.on('console', (m) => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });
  pg.on('requestfailed', (r) => { const f = (r.failure() || {}).errorText || ''; if (!/ERR_ABORTED/.test(f)) errores.push('falló ' + r.url() + ' ' + f); });
  pg.on('response', (r) => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); });
  pg.on('request', (r) => { const u = new URL(r.url()); if (u.hostname !== '127.0.0.1') terceros.add(u.hostname); });
  await pg.goto(URL_T, { waitUntil: 'networkidle', timeout: 120000 });
  await pg.evaluate(() => document.fonts.ready);
  return { ctx, pg, errores, terceros };
}

function aJpg(png, destino, ancho, calidad = 76) {
  execFileSync('python3', ['-I', '-c', `
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB')
w = int(sys.argv[3])
if im.width > w:
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
im.save(sys.argv[2], 'JPEG', quality=int(sys.argv[4]), optimize=True, progressive=True)
`, png, destino, String(ancho), String(calidad)]);
}

// ---------------------------------------------------------------- 1 · anchos
for (const ancho of [360, 390, 768, 1440]) {
  const movil = ancho < 768;
  const { ctx, pg, errores, terceros } = await abrir({ viewport: { width: ancho, height: movil ? 800 : 900 }, deviceScaleFactor: movil ? 2 : 1, isMobile: movil, hasTouch: movil });
  const m = {};
  // a) cerrado, como llega: desborde, captura de la primera pantalla
  m.cerrado = await pg.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, ancho: document.documentElement.clientWidth, alto: document.documentElement.scrollHeight }));
  const png0 = path.join(TMP, `primera-${ancho}.png`);
  await pg.screenshot({ path: png0 });
  if (ancho === 1440 || ancho === 390) aJpg(png0, path.join(SALIDA, `primera-${ancho}.jpg`), ancho === 1440 ? 1440 : 780);
  // a2) «La página entera de…» abre el plegable de su ruta; después se cierran todos otra vez
  m.enlacesRuta = await pg.evaluate(async () => {
    const out = [];
    for (const a of document.querySelectorAll('a.ir')) {
      const d = document.getElementById(a.getAttribute('href').slice(1));
      a.click();
      await new Promise((r) => setTimeout(r, 30));
      out.push({ href: a.getAttribute('href'), abre: !!(d && d.tagName === 'DETAILS' && d.open) });
    }
    document.querySelectorAll('details').forEach((d) => { d.open = false; });
    history.replaceState(null, '', location.pathname);
    scrollTo(0, 0);
    return out;
  });
  if (m.enlacesRuta.length !== 6 || m.enlacesRuta.some((x) => !x.abre)) falla(`${ancho}: enlaces a las rutas ${JSON.stringify(m.enlacesRuta)}`);
  // b) los details: cuántos, cerrados al llegar, se abren con un clic (el primero con teclado) y muestran lo que traen
  const det = await pg.evaluate(() => [...document.querySelectorAll('details')].map((d) => ({ id: d.id || d.querySelector('summary').textContent.trim().slice(0, 40), abierto: d.open })));
  m.details = { total: det.length, abiertosAlLlegar: det.filter((d) => d.abierto).length, abrenConClic: 0, abrenConTeclado: 0, contenidoVisible: 0 };
  const sums = pg.locator('details > summary');
  const n = await sums.count();
  for (let i = 0; i < n; i++) {
    const s = sums.nth(i);
    await s.scrollIntoViewIfNeeded();
    if (i === 0) {
      await s.focus();
      await pg.keyboard.press('Enter');
      if (await s.evaluate((el) => el.parentElement.open)) m.details.abrenConTeclado++;
      await pg.keyboard.press('Enter');
      if (await s.evaluate((el) => el.parentElement.open)) falla(`${ancho}: el primer details no se cierra con Enter`);
    }
    await s.click();
    const ok = await s.evaluate((el) => {
      const d = el.parentElement;
      const hijos = [...d.children].filter((c) => c.tagName !== 'SUMMARY');
      return { open: d.open, visible: hijos.length > 0 && hijos.every((c) => c.getBoundingClientRect().height > 0) };
    });
    if (ok.open) m.details.abrenConClic++;
    if (ok.visible) m.details.contenidoVisible++;
  }
  if (m.details.abiertosAlLlegar) falla(`${ancho}: ${m.details.abiertosAlLlegar} details abiertos al llegar`);
  if (m.details.abrenConClic !== n || m.details.contenidoVisible !== n || m.details.abrenConTeclado !== 1) falla(`${ancho}: details ${JSON.stringify(m.details)}`);
  // c) con todo abierto: cada imagen se pide, cada marco se recorre por dentro, la página se recorre entera
  await pg.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    for (const v of document.querySelectorAll('.visor')) { for (let y = 0; y < v.scrollHeight; y += v.clientHeight) { v.scrollTop = y; await new Promise((r) => setTimeout(r, 10)); } v.scrollTop = 0; }
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 15)); }
    scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 30000); }))));
  });
  // d) los videos: ninguno corre solo; la metadata de cada uno carga desde la fuente que elige este navegador
  m.videos = await pg.evaluate(async () => {
    const vs = [...document.querySelectorAll('video')];
    const out = [];
    for (const v of vs) {
      const antes = { pausado: v.paused, autoplay: v.autoplay, preload: v.getAttribute('preload'), controles: v.controls, poster: !!v.poster };
      v.preload = 'metadata';
      v.load();
      const r = await new Promise((res) => {
        const fin = (estado) => res({ estado, src: (v.currentSrc || '').split('/').slice(-2).join('/'), dur: v.duration, w: v.videoWidth, h: v.videoHeight });
        v.addEventListener('loadedmetadata', () => fin('ok'), { once: true });
        v.addEventListener('error', () => fin('error'), { once: true });
        setTimeout(() => fin('tiempo'), 20000);
      });
      const poster = await new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth > 0); i.onerror = () => res(false); i.src = v.poster; setTimeout(() => res(false), 20000); });
      out.push({ ...antes, ...r, posterCarga: poster, mp4Soportado: v.canPlayType((v.querySelector('source[src$=".mp4"]') || {}).type || 'video/mp4') });
    }
    return out;
  });
  const vMal = m.videos.filter((v) => v.estado !== 'ok' || !(v.dur > 1) || !(v.w > 0) || !v.pausado || v.autoplay || v.preload !== 'none' || !v.controles || !v.poster || !v.posterCarga);
  if (vMal.length) falla(`${ancho}: videos con problemas ${JSON.stringify(vMal)}`);
  // e) medidas del documento abierto
  Object.assign(m, await pg.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const salen = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > vw + 0.5) salen.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} → ${Math.round(r.right)}`);
    });
    const imgs = [...document.images].map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, alt: i.alt.length }));
    const rgba = (s) => { const v = s.match(/[\d.]+/g).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
    const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const sobre = (a, b) => [0, 1, 2].map((k) => a[k] * a[3] + b[k] * (1 - a[3])).concat(1);
    function fondo(el) {
      const capas = [];
      for (let n = el; n; n = n.parentElement) {
        const c = rgba(getComputedStyle(n).backgroundColor);
        if (c[3] > 0) { capas.push(c); if (c[3] >= 1) break; }
      }
      let f = [255, 255, 255, 1];
      for (let k = capas.length - 1; k >= 0; k--) f = sobre(capas[k], f);
      return f;
    }
    const bajos = [];
    let medidos = 0, peor = 99;
    let min = 99, donde = '';
    document.querySelectorAll('body *').forEach((el) => {
      if (el.closest('svg, script, style')) return;
      const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!propio) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
      let op = 1; for (let n = el; n; n = n.parentElement) op *= +getComputedStyle(n).opacity;
      if (op === 0) return;
      const t = parseFloat(cs.fontSize);
      if (t < min) { min = t; donde = el.tagName.toLowerCase() + ' «' + el.textContent.trim().slice(0, 30) + '»'; }
      const f = fondo(el);
      let c = rgba(cs.color); c[3] *= op; c = sobre(c, f);
      const L1 = lum(c), L2 = lum(f);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const grande = t >= 24 || (t >= 18.66 && +cs.fontWeight >= 700);
      medidos++;
      peor = Math.min(peor, ratio);
      if (ratio < (grande ? 3 : 4.5)) bajos.push({ texto: el.textContent.trim().slice(0, 50), ratio: Math.round(ratio * 100) / 100, tam: cs.fontSize });
    });
    const hs = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => [+h.tagName[1], h.textContent.trim().slice(0, 40)]);
    const saltos = [];
    for (let k = 1; k < hs.length; k++) if (hs[k][0] > hs[k - 1][0] + 1) saltos.push(`h${hs[k - 1][0]} → h${hs[k][0]} «${hs[k][1]}»`);
    const fam = (sel) => { const el = document.querySelector(sel); return el ? getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '') : null; };
    return {
      anchoVentana: vw,
      scrollWidth: document.documentElement.scrollWidth,
      salen: salen.slice(0, 20),
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      imgs,
      letras: {
        dmMono: document.fonts.check('500 11px "DM Mono"'),
        googleSansFlex: document.fonts.check('300 48px "Google Sans Flex"') && document.fonts.check('400 16px "Google Sans Flex"'),
        cargadas: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.stretch}`).filter((v, i, a) => a.indexOf(v) === i),
        computadas: { rotulo: fam('.rotulo'), cuerpo: fam('body'), h1: fam('h1'), code: fam('code') },
      },
      contraste: { nodos: medidos, peor: Math.round(peor * 100) / 100, bajos },
      alto: document.documentElement.scrollHeight,
      saltos,
      letraMasChica: { px: min, donde },
      reloj: document.querySelector('.reloj').textContent,
    };
  }));
  m.errores = errores;
  m.terceros = [...terceros];
  const rotas = m.imgs.filter((i) => !i.ok).map((i) => i.src);
  const sinAlt = m.imgs.filter((i) => !i.alt).map((i) => i.src);
  resultado.anchos[ancho] = { ...m, imgs: { total: m.imgs.length, cargadas: m.imgs.length - rotas.length, rotas, sinAlt }, videos: { total: m.videos.length, ok: m.videos.length - vMal.length, fuentes: [...new Set(m.videos.map((v) => v.src.split('.').pop()))], mp4Soportado: [...new Set(m.videos.map((v) => v.mp4Soportado))], detalle: m.videos } };
  if (m.cerrado.scrollWidth > m.cerrado.ancho) falla(`${ancho}: desborde con todo cerrado, scrollWidth ${m.cerrado.scrollWidth} > ${m.cerrado.ancho}`);
  if (m.scrollWidth > m.anchoVentana) falla(`${ancho}: desborde con todo abierto, scrollWidth ${m.scrollWidth} > ${m.anchoVentana}`);
  if (m.salen.length) falla(`${ancho}: elementos que se salen: ${m.salen.join(' | ')}`);
  if (m.h1 !== 1) falla(`${ancho}: ${m.h1} h1`);
  if (m.saltos.length) falla(`${ancho}: saltos de encabezado ${m.saltos.join(' | ')}`);
  if (m.letraMasChica.px < 11) falla(`${ancho}: texto de ${m.letraMasChica.px} px en ${m.letraMasChica.donde}`);
  if (rotas.length) falla(`${ancho}: ${rotas.length} imágenes rotas: ${rotas.slice(0, 5).join(', ')}`);
  if (sinAlt.length) falla(`${ancho}: imágenes sin alt`);
  if (!m.letras.dmMono || !m.letras.googleSansFlex) falla(`${ancho}: letras sin cargar ${JSON.stringify(m.letras)}`);
  const lc = m.letras.computadas;
  if (lc.rotulo !== 'DM Mono' || lc.cuerpo !== 'Google Sans Flex' || lc.h1 !== 'Google Sans Flex' || lc.code !== 'DM Mono') falla(`${ancho}: letras computadas ${JSON.stringify(lc)}`);
  if (m.contraste.bajos.length) falla(`${ancho}: contraste bajo el mínimo en ${m.contraste.bajos.length} nodos ${JSON.stringify(m.contraste.bajos.slice(0, 5))}`);
  if (m.terceros.some((h) => !/^fonts\.(googleapis|gstatic)\.com$/.test(h))) falla(`${ancho}: peticiones a terceros ${m.terceros}`);
  if (!/^\d\d:\d\d$/.test(m.reloj)) falla(`${ancho}: la hora no se calculó (${m.reloj})`);
  if (errores.length) falla(`${ancho}: errores ${errores.join(' | ')}`);
  console.log(ancho, 'desborde', m.cerrado.scrollWidth, m.scrollWidth, 'h1', m.h1, 'saltos', m.saltos.length, 'letra', m.letraMasChica.px,
    'details', JSON.stringify(m.details), 'imgs', `${m.imgs.length - rotas.length}/${m.imgs.length}`, 'videos', `${m.videos.length - vMal.length}/${m.videos.length}`,
    resultado.anchos[ancho].videos.fuentes.join(','), 'contraste', m.contraste.nodos, 'peor', m.contraste.peor, 'bajos', m.contraste.bajos.length, 'alto', m.alto, 'errores', errores.length);
  // capturas para mirar: cada sección abierta, recortes de alto acotado, con cada imagen ya decodificada
  await pg.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => 0))));
  const secciones = await pg.evaluate(() => [...document.querySelectorAll('header.cab, main > section')].map((s) => { const r = s.getBoundingClientRect(); return { id: s.id || 'cab', y: Math.round(r.top + scrollY), h: Math.round(r.height) }; }));
  for (const s of secciones) {
    const png = path.join(TMP, `${ancho}-${s.id}.png`);
    const h = Math.min(s.h, 14000);
    await pg.screenshot({ path: png, fullPage: true, clip: { x: 0, y: s.y, width: ancho, height: h } });
  }
  await ctx.close();
}

// ---------------------------------------------------------------- 2 · movimiento reducido: nada corre solo
{
  const { ctx, pg } = await abrir({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  resultado.reducido = await pg.evaluate(() => ({ videosCorriendo: [...document.querySelectorAll('video')].filter((v) => !v.paused).length, autoplay: [...document.querySelectorAll('video[autoplay]')].length, animaciones: document.getAnimations().length }));
  if (resultado.reducido.videosCorriendo || resultado.reducido.autoplay || resultado.reducido.animaciones) falla('movimiento reducido: algo se mueve solo ' + JSON.stringify(resultado.reducido));
  // foco visible: el primer enlace del índice, con teclado
  await pg.keyboard.press('Tab');
  resultado.foco = await pg.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { el: a.tagName + ' ' + a.textContent.trim().slice(0, 30), contorno: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}` }; });
  if (!/solid 2px/.test(resultado.foco.contorno)) falla('foco sin contorno visible ' + JSON.stringify(resultado.foco));
  await ctx.close();
}

// ---------------------------------------------------------------- 2b · una dirección con #r-<ruta> abre su plegable
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route(URL_T, (r) => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
  const pg = await ctx.newPage();
  await pg.goto(URL_T + '#r-trabajo_tonela', { waitUntil: 'domcontentloaded' });
  resultado.hash = await pg.evaluate(() => ({ abierto: document.getElementById('r-trabajo_tonela').open, otros: [...document.querySelectorAll('details[open]')].length }));
  if (!resultado.hash.abierto || resultado.hash.otros !== 1) falla('la dirección con #r-trabajo_tonela no abre su plegable ' + JSON.stringify(resultado.hash));
  await ctx.close();
}

// ---------------------------------------------------------------- 3 · el tema: el mismo negro con cualquier visor
{
  resultado.tema = [];
  const leer = () => {
    const r = getComputedStyle(document.documentElement), b = getComputedStyle(document.body);
    const t2 = document.querySelector('.t2');
    return { fondo: b.backgroundColor, texto: b.color, gris: t2 ? getComputedStyle(t2).color : null, esquema: r.colorScheme,
      tokens: ['--lienzo', '--placa', '--blanco', '--gris', '--linea-seccion'].map((v) => r.getPropertyValue(v).trim()).join(' ') };
  };
  let base = null;
  for (const esquema of ['light', 'dark']) {
    const { ctx, pg } = await abrir({ viewport: { width: 390, height: 800 }, colorScheme: esquema });
    for (const tema of [null, 'light', 'dark']) {
      await pg.evaluate((x) => { if (x) document.documentElement.setAttribute('data-theme', x); else document.documentElement.removeAttribute('data-theme'); }, tema);
      const m = { visor: esquema, dataTheme: tema, ...(await pg.evaluate(leer)) };
      resultado.tema.push(m);
      if (!base) base = m;
      if (m.fondo !== 'rgb(6, 6, 6)' || m.texto !== 'rgb(255, 255, 255)' || m.gris !== 'rgb(152, 152, 152)' || m.tokens !== base.tokens || m.esquema !== 'dark')
        falla('tema: cambia con el visor ' + JSON.stringify(m));
    }
    await ctx.close();
  }
  console.log('tema', resultado.tema.length, 'combinaciones, fondo', base.fondo, 'texto', base.texto, 'gris', base.gris);
}

await nav.close();
servidor.kill();
resultado.ok = resultado.fallas.length === 0;
fs.writeFileSync(path.join(SALIDA, 'resultado.json'), JSON.stringify(resultado, null, 1) + '\n');
console.log(resultado.ok ? 'OK: sin fallas' : `${resultado.fallas.length} fallas`, '→', path.join(SALIDA, 'resultado.json'), '· capturas en', TMP);
process.exit(resultado.ok ? 0 : 1);
