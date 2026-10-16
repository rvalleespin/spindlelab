// E12 · Verificación del tablero de la compuerta 1 (Lucía, 16-oct-2026).
//
// Sirve la carpeta del tablero en 127.0.0.1, envuelve `tablero.html` como lo hace el publicador (doctype, head y
// body: el archivo no los trae) y lo abre en Chromium 141 con Playwright 1.63 del repo, por el proxy del entorno
// (las letras vienen de Google Fonts y Motion de jsDelivr). Mide:
//   - a 360, 390, 768 y 1440: desborde horizontal (scrollWidth y cada elemento que se sale), un solo h1, todas
//     las img cargadas (naturalWidth > 0), las tres letras cargadas, Motion cargado, errores de consola y de red,
//     y el contraste de cada nodo de texto contra su primer fondo opaco (piso 4,5:1);
//   - el cursor con mouse (1440, puntero fino): aparece sobre la pieza, sigue al puntero (cuándo llega al 90 % de
//     un salto, medido cuadro a cuadro en la página), esconde el puntero del sistema solo ahí y se va al salir;
//   - el cursor con teclado: al primer Tab se esconde, el foco se ve (2 px de tinta) y el rótulo quieto aparece;
//   - el cursor con movimiento reducido y en un teléfono: no existe, y el rótulo aparece al pasar o enfocar;
//   - el resorte con mouse, con teclado (flechas en los botones de opción, Enter en «Mover») y con movimiento
//     reducido (el bloque salta, sin resorte);
//   - el gráfico: la cruz y los valores al pasar el puntero.
//   Segunda vuelta (defectos del acta del paso 1): la jerarquía de encabezados sin saltos y el texto más chico (piso
//   de 11 px) a cada ancho; el contorno de las fichas claras; el color de la cruz de registro; los rótulos de la tabla de
//   resortes bajo 834 px; que el HTML no traiga una hora fija ni la nota de carga repetida. Capturas nuevas de las
//   fichas, la tabla a 390, el registro y la etiqueta medida de A&P.
// Escribe `verificacion/resultado.json` y unas pocas capturas de las demos en `verificacion/` (JPEG chicos). Las
// capturas de página completa van fuera del repo (carpeta temporal), solo para mirarlas.
//
// Uso: node herramientas/verificar.mjs          (desde cualquier carpeta)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(BASE, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const SALIDA = path.join(BASE, 'verificacion');
const TMP = process.env.TMP_E12 || path.join(os.tmpdir(), 'e12-tablero');
fs.mkdirSync(SALIDA, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const PUERTO = 8781;
const URL_T = `http://127.0.0.1:${PUERTO}/tablero-envuelto.html`;

// Envoltura del publicador: lo que va antes de <div class="marco"> es cabecera; el resto, cuerpo.
const crudo = fs.readFileSync(path.join(BASE, 'tablero.html'), 'utf8');
const corte = crudo.indexOf('<div class="marco">');
const envuelto = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;

const servidor = spawn('python3', ['-I', '-m', 'http.server', String(PUERTO), '--bind', '127.0.0.1', '--directory', BASE], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));

const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1' } : undefined,
});

const resultado = { fecha: new Date().toISOString(), medidoPor: 'Lucía (dirección de arte), herramientas/verificar.mjs', navegador: nav.version(), anchos: {}, demos: {}, fallas: [] };
const falla = (m) => { resultado.fallas.push(m); console.log('FALLA', m); };

async function abrir(opciones) {
  const ctx = await nav.newContext({ timezoneId: 'America/Santiago', locale: 'es-CL', ...opciones });
  await ctx.route(URL_T, (r) => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: envuelto }));
  const pg = await ctx.newPage();
  const errores = [];
  pg.on('pageerror', (e) => errores.push('error de página: ' + String(e)));
  pg.on('console', (m) => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });
  pg.on('requestfailed', (r) => errores.push('falló ' + r.url() + ' ' + (r.failure() || {}).errorText));
  pg.on('response', (r) => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); });
  await pg.goto(URL_T, { waitUntil: 'networkidle', timeout: 90000 });
  await pg.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 15000); }))));
  });
  return { ctx, pg, errores };
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
  const { ctx, pg, errores } = await abrir({ viewport: { width: ancho, height: movil ? 800 : 900 }, deviceScaleFactor: movil ? 2 : 1, isMobile: movil, hasTouch: movil });
  const m = await pg.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const salen = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > vw + 0.5 && !el.closest('.tabla-envuelta')) salen.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} → ${Math.round(r.right)}`);
    });
    const imgs = [...document.images].map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, alt: i.alt.length }));
    // contraste: cada elemento con texto propio contra su primer fondo opaco (se mezclan los translúcidos)
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
    let medidos = 0;
    document.querySelectorAll('body *').forEach((el) => {
      if (el.closest('svg, script, style, .circulo')) return;
      const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!propio) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
      let op = 1; for (let n = el; n; n = n.parentElement) op *= +getComputedStyle(n).opacity;
      if (op === 0) return;
      const f = fondo(el);
      let c = rgba(cs.color); c[3] *= op; c = sobre(c, f);
      const L1 = lum(c), L2 = lum(f);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      medidos++;
      if (ratio < 4.5) bajos.push({ texto: el.textContent.trim().slice(0, 50), ratio: Math.round(ratio * 100) / 100, tam: cs.fontSize });
    });
    return {
      anchoVentana: vw,
      scrollWidth: document.documentElement.scrollWidth,
      salen: salen.slice(0, 20),
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      imgs,
      letras: {
        mona: document.fonts.check('340 48px "Mona Sans"'),
        googleSansFlex: document.fonts.check('300 48px "Google Sans Flex"'),
        dmMono: document.fonts.check('500 11px "DM Mono"'),
        cargadas: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.stretch}`).filter((v, i, a) => a.indexOf(v) === i),
      },
      motion: typeof window.Motion === 'object' && typeof window.Motion.animate === 'function',
      modoCursor: document.documentElement.className,
      contraste: { nodos: medidos, bajoDe45: bajos },
      alto: document.documentElement.scrollHeight,
      saltos: (() => {
        const hs = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => [+h.tagName[1], h.textContent.trim().slice(0, 40)]);
        const out = [];
        for (let k = 1; k < hs.length; k++) if (hs[k][0] > hs[k - 1][0] + 1) out.push(`h${hs[k - 1][0]} → h${hs[k][0]} «${hs[k][1]}»`);
        return out;
      })(),
      letraMasChica: (() => {
        let min = 99, donde = '';
        document.querySelectorAll('body *').forEach((el) => {
          if (el.closest('svg, script, style')) return;
          if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          const t = parseFloat(cs.fontSize);
          if (t < min) { min = t; donde = el.tagName.toLowerCase() + ' «' + el.textContent.trim().slice(0, 30) + '»'; }
        });
        return { px: min, donde };
      })(),
    };
  });
  m.errores = errores;
  resultado.anchos[ancho] = { ...m, imgs: { total: m.imgs.length, cargadas: m.imgs.filter((i) => i.ok).length, rotas: m.imgs.filter((i) => !i.ok).map((i) => i.src), sinAlt: m.imgs.filter((i) => !i.alt).map((i) => i.src) } };
  if (m.scrollWidth > m.anchoVentana) falla(`${ancho}: desborde, scrollWidth ${m.scrollWidth} > ${m.anchoVentana}`);
  if (m.salen.length) falla(`${ancho}: elementos que se salen: ${m.salen.join(' | ')}`);
  if (m.h1 !== 1) falla(`${ancho}: ${m.h1} h1`);
  if (m.saltos.length) falla(`${ancho}: saltos de encabezado ${m.saltos.join(' | ')}`);
  if (m.letraMasChica.px < 11) falla(`${ancho}: texto de ${m.letraMasChica.px} px en ${m.letraMasChica.donde}`);
  if (m.imgs.some((i) => !i.ok)) falla(`${ancho}: imágenes rotas`);
  if (!m.letras.mona || !m.letras.googleSansFlex || !m.letras.dmMono) falla(`${ancho}: letras sin cargar ${JSON.stringify(m.letras)}`);
  if (!m.motion) falla(`${ancho}: Motion no cargó`);
  if (m.contraste.bajoDe45.length) falla(`${ancho}: contraste bajo 4,5 en ${m.contraste.bajoDe45.length} nodos`);
  if (errores.length) falla(`${ancho}: errores ${errores.join(' | ')}`);
  const png = path.join(TMP, `tablero-${ancho}.png`);
  await pg.screenshot({ path: png, fullPage: true });
  console.log(ancho, 'saltos', m.saltos.length, 'letra más chica', m.letraMasChica.px, 'scrollWidth', m.scrollWidth, 'h1', m.h1, 'imgs', resultado.anchos[ancho].imgs.cargadas + '/' + m.imgs.length, 'contraste', m.contraste.nodos, 'bajos', m.contraste.bajoDe45.length, 'alto', m.alto, '→', png);
  await ctx.close();
}

// ---------------------------------------------------------------- 2 · cursor con mouse (1440)
{
  const { ctx, pg } = await abrir({ viewport: { width: 1440, height: 900 } });
  const d = {};
  d.modo = await pg.evaluate(() => document.documentElement.className);
  const medio = pg.locator('.demo-cursor .pieza__medio');
  await medio.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(300);
  const caja = await medio.boundingBox();
  const cx = caja.x + caja.width * 0.3, cy = caja.y + caja.height * 0.5;
  await pg.mouse.move(cx - caja.width, cy); // fuera
  await pg.mouse.move(cx, cy, { steps: 4 });
  await pg.waitForTimeout(450);
  const circ = () => pg.evaluate(() => {
    const c = document.querySelector('.circulo');
    const r = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, ancho: r.width, display: cs.display, visibility: cs.visibility, texto: c.textContent, fondo: cs.backgroundColor };
  });
  d.dentro = await circ();
  d.dentro.puntero = { x: cx, y: cy };
  d.punteroSistemaSobrePieza = await medio.evaluate((el) => getComputedStyle(el).cursor);
  d.punteroSistemaFuera = await pg.evaluate(() => getComputedStyle(document.querySelector('.demo-cursor .pieza__pie')).cursor);
  if (!(d.dentro.display !== 'none' && Math.abs(d.dentro.ancho - 88) < 2 && Math.abs(d.dentro.x - cx) < 2 && Math.abs(d.dentro.y - cy) < 2)) falla('cursor: el círculo no está sobre el puntero a escala 1 ' + JSON.stringify(d.dentro));
  if (d.punteroSistemaSobrePieza !== 'none') falla('cursor: el puntero del sistema sigue visible sobre la pieza');
  if (d.punteroSistemaFuera === 'none') falla('cursor: el puntero del sistema se esconde fuera de la pieza');
  // un salto de 300 px dentro de la pieza, medido cuadro a cuadro en la página
  await pg.evaluate(() => {
    window.__m = []; const c = document.querySelector('.circulo'); const t0 = performance.now();
    (function f() { const r = c.getBoundingClientRect(); window.__m.push([performance.now() - t0, r.left + r.width / 2]); if (performance.now() - t0 < 500) requestAnimationFrame(f); })();
  });
  const x0 = cx, x1 = cx + 300;
  await pg.mouse.move(x1, cy);
  await pg.waitForTimeout(600);
  const muestras = await pg.evaluate(() => window.__m);
  const tMov = (muestras.find((m) => Math.abs(m[1] - x0) > 1) || [null])[0];
  const t90 = (muestras.find((m) => (m[1] - x0) / (x1 - x0) >= 0.9) || [null])[0];
  const final = muestras[muestras.length - 1][1];
  const maximo = Math.max(...muestras.map((m) => m[1]));
  d.salto = { px: 300, empiezaAMoverseMs: tMov && Math.round(tMov), llegaAl90Ms: t90 && tMov !== null ? Math.round(t90 - tMov) : null, cuadros: muestras.length, final: Math.round(final), sobrepasoPx: Math.round((maximo - x1) * 10) / 10 };
  if (!(Math.abs(final - x1) < 1.5)) falla('cursor: el círculo no llegó al puntero tras el salto ' + JSON.stringify(d.salto));
  if (d.salto.sobrepasoPx > 0.5) falla('cursor: el resorte se pasa de largo ' + d.salto.sobrepasoPx);
  const png = path.join(TMP, 'cursor-mouse.png');
  await pg.screenshot({ path: png, clip: { x: caja.x - 8, y: caja.y - 8, width: Math.min(caja.width + 16, 760), height: caja.height + 90 } });
  aJpg(png, path.join(SALIDA, 'cursor-mouse.jpg'), 760);
  // salir
  await pg.mouse.move(caja.x + caja.width + 200, cy);
  await pg.waitForTimeout(500);
  d.fuera = await circ();
  if (d.fuera.ancho > 1) falla('cursor: el círculo no se va al salir ' + d.fuera.ancho);
  resultado.demos.cursorMouse = d;
  console.log('cursor mouse', JSON.stringify(d.salto), d.punteroSistemaSobrePieza, d.fuera.ancho);

  // gráfico: la cruz y los valores
  const zona = pg.locator('.g-panel[data-clave="entrada"] .g-zona');
  await zona.scrollIntoViewIfNeeded();
  const zc = await zona.boundingBox();
  await pg.mouse.move(zc.x + zc.width * 0.44, zc.y + zc.height / 2);
  await pg.waitForTimeout(150);
  resultado.demos.grafico = await pg.evaluate(() => {
    const f = document.querySelector('.g-panel[data-clave="entrada"]');
    return { cruz: f.querySelector('.g-cruz').getAttribute('visibility'), valores: f.querySelector('.g-tip').hidden ? null : f.querySelector('.g-tip').textContent };
  });
  if (!resultado.demos.grafico.valores) falla('gráfico: no muestra valores al pasar el puntero');

  // resorte con mouse
  const boton = pg.locator('#mover');
  await boton.scrollIntoViewIfNeeded();
  const r = {};
  for (const tipo of ['entrada', 'estado', 'cursor']) {
    await pg.locator(`input[name="resorte"][value="${tipo}"]`).click();
    await boton.click();
    await pg.waitForTimeout(900);
    r[tipo] = await pg.evaluate(() => ({ lectura: document.querySelector('.lectura').textContent, x: getComputedStyle(document.querySelector('.bloque')).transform }));
    if (!/llegó al 90 %/.test(r[tipo].lectura)) falla(`resorte ${tipo} con mouse: ${r[tipo].lectura}`);
  }
  resultado.demos.resorteMouse = r;
  console.log('resorte mouse', Object.values(r).map((v) => v.lectura).join(' | '));
  await ctx.close();
}

// ---------------------------------------------------------------- 3 · teclado (1440)
{
  const { ctx, pg } = await abrir({ viewport: { width: 1440, height: 900 } });
  const d = {};
  // el mouse pasa primero por la pieza (el círculo aparece) y después se usa el teclado
  const medio = pg.locator('.demo-cursor .pieza__medio');
  await medio.scrollIntoViewIfNeeded();
  const caja = await medio.boundingBox();
  await pg.mouse.move(caja.x + 40, caja.y + 40, { steps: 3 });
  await pg.waitForTimeout(400);
  d.circuloAntes = await pg.evaluate(() => document.querySelector('.circulo').getBoundingClientRect().width);
  let llego = false;
  for (let k = 0; k < 200 && !llego; k++) {
    await pg.keyboard.press('Tab');
    llego = await pg.evaluate(() => document.activeElement && document.activeElement.matches('.demo-cursor .pieza'));
  }
  d.tabsHastaLaPieza = llego;
  await pg.waitForTimeout(200);
  Object.assign(d, await pg.evaluate(() => {
    const a = document.activeElement; const cs = getComputedStyle(a);
    const c = document.querySelector('.circulo');
    return {
      claseHtml: document.documentElement.className,
      foco: { estilo: cs.outlineStyle, ancho: cs.outlineWidth, color: cs.outlineColor, separacion: cs.outlineOffset },
      rotuloQuieto: getComputedStyle(a.querySelector('.pieza__ir')).opacity,
      circulo: { visibility: getComputedStyle(c).visibility, ancho: c.getBoundingClientRect().width },
    };
  }));
  if (!llego) falla('teclado: el Tab no llega a la pieza');
  if (!(d.foco.estilo === 'solid' && d.foco.ancho === '2px' && d.foco.color === 'rgb(17, 17, 17)')) falla('teclado: foco no visible ' + JSON.stringify(d.foco));
  if (d.rotuloQuieto !== '1') falla('teclado: el rótulo quieto no aparece');
  if (d.circulo.visibility !== 'hidden' && d.circulo.ancho > 1) falla('teclado: el círculo sigue a la vista');
  const r = await pg.locator('.demo-cursor .pieza').boundingBox();
  const png = path.join(TMP, 'cursor-teclado.png');
  await pg.screenshot({ path: png, clip: { x: r.x - 12, y: r.y - 12, width: Math.min(r.width + 24, 760), height: Math.min(r.height + 24, 520) } });
  aJpg(png, path.join(SALIDA, 'cursor-teclado.jpg'), 760);
  // el mouse se vuelve a mover dentro de la pieza: el círculo vuelve y sigue al puntero
  const caja3 = await medio.boundingBox();
  await pg.mouse.move(caja3.x + 120, caja3.y + 100, { steps: 3 });
  await pg.waitForTimeout(450);
  d.vuelveConElMouse = await pg.evaluate(() => {
    const c = document.querySelector('.circulo'); const r = c.getBoundingClientRect();
    return { clase: document.documentElement.className, visibility: getComputedStyle(c).visibility, ancho: Math.round(r.width), x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  d.vuelveConElMouse.puntero = { x: Math.round(caja3.x + 120), y: Math.round(caja3.y + 100) };
  if (!(d.vuelveConElMouse.visibility === 'visible' && d.vuelveConElMouse.ancho === 88 && Math.abs(d.vuelveConElMouse.x - d.vuelveConElMouse.puntero.x) <= 1 && Math.abs(d.vuelveConElMouse.y - d.vuelveConElMouse.puntero.y) <= 1)) falla('teclado: el círculo no vuelve al mover el mouse ' + JSON.stringify(d.vuelveConElMouse));
  // resorte con teclado: Tab hasta los botones de opción, flechas, Tab a «Mover», Enter
  let enRadio = false;
  for (let k = 0; k < 40 && !enRadio; k++) {
    await pg.keyboard.press('Tab');
    enRadio = await pg.evaluate(() => document.activeElement && document.activeElement.name === 'resorte');
  }
  await pg.keyboard.press('ArrowLeft'); // de «entrada» a «estado»
  d.resorteElegido = await pg.evaluate(() => document.querySelector('input[name="resorte"]:checked').value);
  await pg.keyboard.press('Tab');
  d.focoEnMover = await pg.evaluate(() => document.activeElement.id);
  const focoBoton = await pg.evaluate(() => { const cs = getComputedStyle(document.activeElement); return cs.outlineStyle + ' ' + cs.outlineWidth; });
  d.focoBoton = focoBoton;
  await pg.keyboard.press('Enter');
  await pg.waitForTimeout(900);
  d.lecturaTrasEnter = await pg.evaluate(() => document.querySelector('.lectura').textContent);
  await pg.keyboard.press('Space');
  await pg.waitForTimeout(900);
  d.lecturaTrasEspacio = await pg.evaluate(() => document.querySelector('.lectura').textContent);
  if (!enRadio || d.resorteElegido !== 'estado') falla('teclado: las flechas no eligen el resorte ' + d.resorteElegido);
  if (d.focoEnMover !== 'mover' || !/solid 2px/.test(focoBoton)) falla('teclado: el foco no llega visible a «Mover» ' + focoBoton);
  if (!/llegó al 90 %/.test(d.lecturaTrasEnter) || !/llegó al 90 %/.test(d.lecturaTrasEspacio)) falla('teclado: «Mover» no corre con Enter o Espacio');
  const caja2 = await pg.locator('.demo-resorte').boundingBox();
  const png2 = path.join(TMP, 'resorte-teclado.png');
  await pg.screenshot({ path: png2, clip: { x: caja2.x - 8, y: caja2.y - 8, width: caja2.width + 16, height: caja2.height + 16 } });
  aJpg(png2, path.join(SALIDA, 'resorte-teclado.jpg'), 1100);
  resultado.demos.teclado = d;
  console.log('teclado', JSON.stringify(d));
  await ctx.close();
}

// ---------------------------------------------------------------- 4 · movimiento reducido (1440) y teléfono (390)
for (const [nombre, opciones] of [
  ['reducido', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }],
  ['telefono', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
]) {
  const { ctx, pg } = await abrir(opciones);
  const d = {};
  d.claseHtml = await pg.evaluate(() => document.documentElement.className);
  const medio = pg.locator('.demo-cursor .pieza__medio');
  await medio.scrollIntoViewIfNeeded();
  const caja = await medio.boundingBox();
  if (nombre === 'reducido') {
    await pg.mouse.move(caja.x + caja.width / 2, caja.y + caja.height / 2, { steps: 3 });
    await pg.waitForTimeout(300);
  } else {
    await pg.locator('.demo-cursor .pieza').focus();
  }
  Object.assign(d, await pg.evaluate(() => ({
    circulo: getComputedStyle(document.querySelector('.circulo')).display,
    rotulo: getComputedStyle(document.querySelector('.demo-cursor .pieza__ir')).opacity,
    punteroSistema: getComputedStyle(document.querySelector('.demo-cursor .pieza__medio')).cursor,
  })));
  if (d.circulo !== 'none') falla(`${nombre}: el círculo existe`);
  if (d.rotulo !== '1') falla(`${nombre}: el rótulo no aparece al ${nombre === 'reducido' ? 'pasar el mouse' : 'enfocar'}`);
  if (nombre === 'reducido') {
    const png = path.join(TMP, 'cursor-reducido.png');
    await pg.screenshot({ path: png, clip: { x: caja.x - 8, y: caja.y - 8, width: Math.min(caja.width + 16, 760), height: caja.height + 90 } });
    aJpg(png, path.join(SALIDA, 'cursor-reducido.jpg'), 760);
    await pg.locator('#mover').scrollIntoViewIfNeeded();
    const antes = await pg.evaluate(() => document.querySelector('.bloque').getBoundingClientRect().left);
    await pg.locator('#mover').click();
    const despues = await pg.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(document.querySelector('.bloque').getBoundingClientRect().left))));
    d.resorte = { saltoPx: Math.round(despues - antes), enElPrimerCuadro: despues - antes > 100, lectura: await pg.evaluate(() => document.querySelector('.lectura').textContent), animaciones: await pg.evaluate(() => document.querySelector('.bloque').getAnimations().length) };
    if (!d.resorte.enElPrimerCuadro || !/Movimiento reducido/.test(d.resorte.lectura)) falla('reducido: el bloque no salta sin resorte ' + JSON.stringify(d.resorte));
  }
  resultado.demos[nombre] = d;
  console.log(nombre, JSON.stringify(d));
  await ctx.close();
}

// ---------------------------------------------------------------- 5 · defectos de la vuelta 1, medidos (1440 y 390)
{
  const d = {};
  d.html = {
    horaFija: /\b\d{1,2}:\d{2}\b(?![^<]*<\/script>)/.test(crudo.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/\d{1,2}:\d{2} (ms|UTC)/g, '')),
    respaldoReloj: (crudo.match(/class="reloj">([^<]*)</g) || []).map((x) => x.split('>')[1].replace('<', '')),
    notaCargaVeces: (crudo.match(/kB, con fecha y método/g) || []).length + (crudo.match(/Los kB, sí/g) || []).length,
    styleDobles: (crudo.match(/<[^>]*\sstyle="[^"]*"[^>]*\sstyle="/g) || []).length,
  };
  if (d.html.respaldoReloj.some((v) => v !== '--:--')) falla('reloj: el HTML trae una hora fija de respaldo ' + d.html.respaldoReloj.join(', '));
  if (d.html.notaCargaVeces !== 1) falla('la nota de las mediciones de carga va ' + d.html.notaCargaVeces + ' veces');
  if (d.html.styleDobles) falla(d.html.styleDobles + ' elementos con dos atributos style');
  const { ctx, pg } = await abrir({ viewport: { width: 1440, height: 900 } });
  d.fichas = await pg.evaluate(() => [...document.querySelectorAll('.ficha')].map((f) => {
    const c = f.querySelector('.ficha__chip'); const cs = getComputedStyle(c);
    return { nombre: f.querySelector('.ficha__nombre code').textContent, fondo: cs.backgroundColor, contorno: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}` };
  }));
  for (const f of d.fichas) if (['--papel', '--placa', '--hoja'].includes(f.nombre) && !/^solid 1px/.test(f.contorno)) falla(`ficha ${f.nombre}: sin contorno (${f.contorno})`);
  d.registro = await pg.evaluate(() => {
    const s = document.querySelector('section.registro');
    const a = getComputedStyle(s, '::before'), b = getComputedStyle(s, '::after');
    return { horizontal: a.borderTopColor + ' ' + a.borderTopWidth, vertical: b.borderLeftColor + ' ' + b.borderLeftWidth, x: s.getBoundingClientRect().left + parseFloat(b.left), lineaSeccion: getComputedStyle(document.documentElement).getPropertyValue('--linea-seccion').trim(), secciones: document.querySelectorAll('section.registro').length };
  });
  if (!/rgba\(17, 17, 17, 0\.18\)/.test(d.registro.horizontal) || !/rgba\(17, 17, 17, 0\.18\)/.test(d.registro.vertical)) falla('registro: la cruz no va en --linea-seccion ' + JSON.stringify(d.registro));
  const capturar = async (sel, nombre, ancho, pad = 8, altoMax = 1400) => {
    const el = pg.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await pg.waitForTimeout(200);
    const r = await el.boundingBox();
    const png = path.join(TMP, nombre + '.png');
    await pg.screenshot({ path: png, clip: { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: r.width + pad * 2, height: Math.min(r.height + pad * 2, altoMax) } });
    aJpg(png, path.join(SALIDA, nombre + '.jpg'), ancho);
  };
  await capturar('.fichas', 'fichas-de-color-1440', 1100);
  await capturar('.registro-caja', 'registro-1440', 1100);
  // la cruz en una sección de verdad: el borde superior de «Casos», donde cruza el límite de la barra
  {
    const s = pg.locator('section#casos');
    await pg.evaluate(() => { const n = document.querySelector('section#casos'); scrollTo(0, n.getBoundingClientRect().top + scrollY - 200); });
    await pg.waitForTimeout(200);
    const r = await s.boundingBox();
    const png = path.join(TMP, 'cruz-casos-1440.png');
    await pg.screenshot({ path: png, clip: { x: r.x + 336 - 16 - 60, y: r.y - 40, width: 120, height: 80 } });
    aJpg(png, path.join(SALIDA, 'cruz-casos-1440.jpg'), 480, 90);
  }
  const punto = pg.locator('.puntos li', { hasText: 'Etiquetas de ingredientes' });
  d.puntos = await pg.evaluate(() => [...document.querySelectorAll('.puntos li .puntos__pedido')].map((p) => p.textContent.replace(/^Pediste/, '').trim().slice(0, 60)));
  for (const t of ['Form & Intelligence', 'Atmósfera', 'Etiquetas de ingredientes']) if (!d.puntos.some((p) => p.includes(t))) falla('tablero §3: falta el punto «' + t + '»');
  await punto.scrollIntoViewIfNeeded();
  {
    const r = await punto.boundingBox();
    const png = path.join(TMP, 'punto-etiquetas-1440.png');
    await pg.screenshot({ path: png, clip: { x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 16 } });
    aJpg(png, path.join(SALIDA, 'punto-etiquetas-1440.jpg'), 1100);
  }
  d.captionTabla = await pg.evaluate(() => { const c = document.querySelector('.tabla caption code'); const cs = getComputedStyle(c); return { tam: cs.fontSize, mayusculas: cs.textTransform, texto: document.querySelector('.tabla caption').innerText }; });
  if (d.captionTabla.tam !== '11px' || d.captionTabla.mayusculas !== 'none') falla('tabla: el código del rótulo ' + JSON.stringify(d.captionTabla));
  d.fuentesTabla = await pg.evaluate(() => [...document.querySelectorAll('.tabla td[colspan]')].map((td) => td.textContent));
  if (d.fuentesTabla.some((t) => (t.match(/\(/g) || []).length !== (t.match(/\)/g) || []).length)) falla('tabla: una fuente con el paréntesis sin cerrar');
  await ctx.close();
  const t = await abrir({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  d.tabla390 = await t.pg.evaluate(() => {
    const vacias = [...document.querySelectorAll('.tabla td')].filter((td) => { const b = getComputedStyle(td, '::before'); return b.display === 'none' || !b.content || b.content === 'none' || b.content === '""'; }).length;
    const thead = getComputedStyle(document.querySelector('.tabla thead')).display;
    return { celdas: document.querySelectorAll('.tabla td').length, sinRotulo: vacias, thead, ejemplo: getComputedStyle(document.querySelector('.tabla td'), '::before').content };
  });
  if (d.tabla390.sinRotulo) falla(`tabla a 390: ${d.tabla390.sinRotulo} celdas sin rótulo`);
  {
    const el = t.pg.locator('.tabla-envuelta');
    await el.scrollIntoViewIfNeeded();
    await t.pg.waitForTimeout(200);
    const r = await el.boundingBox();
    const png = path.join(TMP, 'tabla-resortes-390.png');
    await t.pg.screenshot({ path: png, clip: { x: 0, y: r.y - 8, width: 390, height: Math.min(r.height + 16, 1400) } });
    aJpg(png, path.join(SALIDA, 'tabla-resortes-390.jpg'), 780);
  }
  await t.ctx.close();
  resultado.demos.vuelta2 = d;
  console.log('vuelta 2', JSON.stringify({ html: d.html, registro: d.registro, fichas: d.fichas.map((f) => f.nombre + ' ' + f.contorno), caption: d.captionTabla, tabla390: d.tabla390 }));
}

await nav.close();
servidor.kill();
resultado.aprobado = resultado.fallas.length === 0;
fs.writeFileSync(path.join(SALIDA, 'resultado.json'), JSON.stringify(resultado, null, 1));
console.log(resultado.aprobado ? 'APROBADO' : `${resultado.fallas.length} FALLAS`, '→', path.join(SALIDA, 'resultado.json'));
process.exit(resultado.aprobado ? 0 : 1);
