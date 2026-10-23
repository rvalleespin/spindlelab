// E12 · Tablero de la obra construida: la portada y la cinta de la home, grabadas en movimiento desde el build.
// Lucía (dirección de arte), 23-oct-2026.
//
// Tres grabaciones del sitio construido (spindlelab-astro/dist, servido en local con el servidor de Javiera,
// e12/qa-obra/vuelta-2/herramientas/comun.mjs, sin cambiarlo; puerto libre, apagado al terminar):
//   - portada-1440:   la primera pantalla de /v3/ a 1440 × 900, quieta, dos vueltas del hilo de oro (5,04 s cada una).
//   - cinta-1440:     la cinta de la home a 1440 × 900, centrada en la ventana, sus 16 s enteros (ocho tramos de 2 s).
//   - telefono-390:   /v3/ a 390 × 844 (dpr 2, táctil): la portada, un deslizamiento con el dedo hasta la cinta y la
//                     cinta entera.
// Como las capturas de cierre de Mauro (e12/cierre/herramientas/capturas.mjs): el aviso de cookies ya contestado
// (rechazado) y bajo 834 en un contexto táctil. El mouse no se mueve en las de 1440: no hay círculo.
//
// Se graba con el screencast de Chromium (cada cuadro con su hora; la técnica de
// tableros/e12-direcciones/herramientas/grabar-demos.mjs) y se arma con ffmpeg en VP9: video/<nombre>.webm. El H.264 para
// Safari y el póster los hace armar-tablero.py. Mientras graba mide en la página lo que el tablero dice de cada video
// (qué archivo eligió el video, si corre, su segundo, qué pieza nombra la ficha de la cinta) y lo deja en
// datos/movimiento.json, de donde el tablero toma los pies. Si una medición no da lo que el pie va a decir, falla.
//
// Uso: node herramientas/grabar-movimiento.mjs     (después de `npm run build` en spindlelab-astro; TMP_E12 opcional)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { servir, lanzar } from '../../../e12/qa-obra/vuelta-2/herramientas/comun.mjs';

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VIDEO = path.join(BASE, 'video');
const DATOS = path.join(BASE, 'datos');
const TMP = path.join(process.env.TMP_E12 || os.tmpdir(), 'e12-obra-movimiento');
fs.mkdirSync(VIDEO, { recursive: true });
fs.mkdirSync(DATOS, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

const srv = await servir();
const nav = await lanzar();

// Lo que se mide en la página en cada momento (todo en el navegador, sin tocar nada)
const MEDIR = () => {
  const v = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { src: (el.currentSrc || '').replace(location.origin, ''), corre: !el.paused && !el.ended && el.readyState > 2,
      t: Math.round(el.currentTime * 100) / 100, arriba: Math.round(r.top), abajo: Math.round(r.bottom), alto: Math.round(r.height), ancho: Math.round(r.width) };
  };
  const ficha = document.querySelector('[data-cinta] [data-ficha-nombre]') || document.querySelector('[data-cinta] [data-cinta-rotulo]');
  const rotulo = document.querySelector('[data-cinta-rotulo]');
  const aviso = document.getElementById('cookie-banner');
  return {
    portada: v('.portada-v video'),
    cinta: v('[data-cinta] video'),
    fichaCinta: ficha ? ficha.textContent.trim().replace(/\s+/g, ' ') : null,
    rotuloCinta: rotulo ? rotulo.textContent.trim().replace(/\s+/g, ' ') : null,
    pausas: [...document.querySelectorAll('button')].filter((b) => /video/i.test(b.getAttribute('aria-label') || '')).map((b) => {
      const r = b.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < innerHeight ? b.getAttribute('aria-label') : null; }).filter(Boolean),
    aviso: aviso ? getComputedStyle(aviso).display !== 'none' && aviso.getBoundingClientRect().height > 0 : false,
    reducido: matchMedia('(prefers-reduced-motion: reduce)').matches,
    punteroFino: matchMedia('(pointer: fine)').matches,
    scrollY: Math.round(scrollY),
  };
};

async function grabar(nombre, contexto, guion, crf) {
  const movil = !!contexto.isMobile;
  const ctx = await nav.newContext({ locale: 'es-CL', timezoneId: 'America/Santiago', ...contexto });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });
  p.on('response', (r) => { if (r.status() >= 400) errores.push(`${r.status()} ${r.url()}`); });
  await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const dir = path.join(TMP, nombre);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const cdp = await ctx.newCDPSession(p);
  const cuadros = [];
  cdp.on('Page.screencastFrame', async (f) => {
    const archivo = path.join(dir, `c${String(cuadros.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(archivo, Buffer.from(f.data, 'base64'));
    cuadros.push({ archivo, t: f.metadata.timestamp });
    try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch (e) { /* la página cambió */ }
  });
  const ancho = contexto.viewport.width * (contexto.deviceScaleFactor || 1);
  const alto = contexto.viewport.height * (contexto.deviceScaleFactor || 1);
  const medidas = [];
  const medir = async (momento) => { const abs = Date.now() / 1000; const m = await p.evaluate(MEDIR); medidas.push({ momento, abs, ...m }); return m; };
  const empezar = () => cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: ancho, maxHeight: alto, everyNthFrame: 1 });
  await guion(p, medir, cdp, empezar);
  const fin = Date.now() / 1000;
  await cdp.send('Page.stopScreencast');
  await ctx.close();
  if (cuadros.length < 30) throw new Error(`${nombre}: ${cuadros.length} cuadros`);
  let lista = '';
  for (let i = 0; i < cuadros.length; i++) {
    const d = i + 1 < cuadros.length ? Math.max(0.001, cuadros[i + 1].t - cuadros[i].t) : Math.max(0.2, fin - cuadros[i].t);
    lista += `file '${cuadros[i].archivo}'\nduration ${d.toFixed(4)}\n`;
  }
  lista += `file '${cuadros[cuadros.length - 1].archivo}'\n`;
  const listaArchivo = path.join(dir, 'lista.txt');
  fs.writeFileSync(listaArchivo, lista);
  const salida = path.join(VIDEO, `${nombre}.webm`);
  const escala = movil ? `scale=${ancho}:${alto}:flags=lanczos,` : '';
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listaArchivo, '-vf', `${escala}fps=30,format=yuv420p`,
    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(crf), '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-an', '-map_metadata', '-1', salida]);
  const sonda = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'format=duration:stream=width,height,codec_name', '-of', 'json', salida]).toString());
  for (const m of medidas) { m.t = Math.round((m.abs - cuadros[0].t) * 10) / 10; delete m.abs; }
  const r = { archivo: `video/${nombre}.webm`, ruta: '/v3/', ventana: `${contexto.viewport.width} × ${contexto.viewport.height}`,
    dpr: contexto.deviceScaleFactor || 1, tactil: movil, cuadros: cuadros.length, duracion: Math.round(Number(sonda.format.duration) * 100) / 100,
    ancho: sonda.streams[0].width, alto: sonda.streams[0].height, codec: sonda.streams[0].codec_name, crf, bytes: fs.statSync(salida).size, errores, medidas };
  console.log(nombre, r.cuadros, 'cuadros', r.duracion, 's', r.bytes, 'bytes', errores.length ? 'ERRORES ' + errores.join(' | ') : '');
  fs.rmSync(dir, { recursive: true, force: true });
  return r;
}

// Muestrea la ficha de la cinta cada 250 ms durante `ms` y devuelve los nombres que pasaron, en orden y sin repetir seguidos
async function seguirCinta(p, medir, ms) {
  const nombres = [];
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const f = await p.evaluate(() => {
      const n = document.querySelector('[data-cinta] [data-ficha-texto]') || document.querySelector('[data-cinta-rotulo] > :first-child');
      return n ? n.textContent.trim() : null;
    });
    if (f && nombres[nombres.length - 1] !== f) nombres.push(f);
    await esperar(250);
  }
  await medir('al terminar');
  return nombres;
}

// Deslizar con el dedo: toques de verdad por CDP (de grabar-demos.mjs), distancia > 0 baja la página
async function deslizar(cdp, x, distancia) {
  let falta = distancia;
  while (Math.abs(falta) > 4) {
    const tramo = Math.max(-440, Math.min(440, falta));
    const y0 = tramo > 0 ? 740 : 180;
    const pasos = Math.max(6, Math.round(Math.abs(tramo) / 18));
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: y0 }] });
    for (let i = 1; i <= pasos; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y0 - (tramo * i) / pasos }] });
      await esperar(16);
    }
    await esperar(120);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    falta -= tramo;
    await esperar(220);
  }
}

const ESCRITORIO = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const TELEFONO = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const R = {};
let cintaNombres = {};
try {
  R['portada-1440'] = await grabar('portada-1440', ESCRITORIO, async (p, medir, cdp, empezar) => {
    await esperar(600);
    await empezar();
    await medir('al empezar');
    await esperar(5200);
    await medir('a media grabación');
    await esperar(5300);
    await medir('al terminar');
  }, 30);

  R['cinta-1440'] = await grabar('cinta-1440', ESCRITORIO, async (p, medir, cdp, empezar) => {
    // la cinta al centro de lo que queda bajo el encabezado plegado (64 px)
    await p.evaluate(() => {
      const m = document.querySelector('[data-cinta] video').getBoundingClientRect();
      scrollTo(0, Math.max(0, scrollY + m.top - 64 - (innerHeight - 64 - m.height) / 2));
    });
    await esperar(700);
    await empezar();
    await medir('al empezar');
    cintaNombres['cinta-1440'] = await seguirCinta(p, medir, 16600);
  }, 30);

  R['telefono-390'] = await grabar('telefono-390', TELEFONO, async (p, medir, cdp, empezar) => {
    await esperar(600);
    await empezar();
    await medir('al empezar');
    await esperar(5200);
    await medir('antes de deslizar');
    const d = await p.evaluate(() => {
      const m = document.querySelector('[data-cinta] video').getBoundingClientRect();
      return Math.round(m.top - 90 - Math.max(16, (innerHeight - 90 - m.height) / 3));
    });
    await deslizar(cdp, 195, d);
    await esperar(400);
    await medir('en la cinta');
    cintaNombres['telefono-390'] = await seguirCinta(p, medir, 16600);
  }, 34);
} finally {
  await nav.close();
  await srv.cerrar();
}

// Lo que el tablero va a decir, comprobado aquí
const NOMBRES = ['Combeau, fotografía', 'Combeau, modelo', 'Praxi', 'Verifica y Cumple', 'Sesenta', 'Tonela', 'Ocelo', 'Doceavo'];
for (const [k, r] of Object.entries(R)) {
  if (r.errores.length) throw new Error(`${k}: ${r.errores.join(' | ')}`);
  if (r.medidas.some((m) => m.aviso)) throw new Error(`${k}: el aviso de cookies a la vista`);
  if (r.medidas.some((m) => m.reducido)) throw new Error(`${k}: movimiento reducido`);
}
const pi = R['portada-1440'].medidas;
if (!pi.every((m) => m.portada && m.portada.corre && m.portada.src.endsWith('hilo-1920.webm'))) throw new Error('portada-1440: el hilo no corre en VP9 de 1920');
if (!R['portada-1440'].medidas.every((m) => m.punteroFino)) throw new Error('portada-1440: puntero');
for (const k of ['cinta-1440', 'telefono-390']) {
  const vistos = new Set(cintaNombres[k].map((n) => n.replace(/\s*·.*$/, '')));
  const faltan = NOMBRES.filter((n) => !vistos.has(n));
  if (faltan.length) throw new Error(`${k}: la ficha no nombró ${faltan.join(', ')} (vio ${cintaNombres[k].join(' / ')})`);
  const ultima = R[k].medidas[R[k].medidas.length - 1];
  if (!ultima.cinta || !ultima.cinta.corre || !ultima.cinta.src.endsWith('cinta.webm')) throw new Error(`${k}: la cinta no corre en VP9`);
  if (ultima.cinta.arriba < 0 || ultima.cinta.abajo > (k === 'cinta-1440' ? 900 : 844)) throw new Error(`${k}: la cinta no entra entera en la ventana`);
  R[k].fichas = cintaNombres[k];
}
const tp = R['telefono-390'].medidas;
if (!tp[0].portada.corre || !tp[0].portada.src.endsWith('hilo-960.webm') || tp.some((m) => m.punteroFino)) throw new Error('telefono-390: portada o puntero');
fs.writeFileSync(path.join(DATOS, 'movimiento.json'), JSON.stringify({ cuando: new Date().toISOString(), grabaciones: R }, null, 1) + '\n');
console.log('datos/movimiento.json');
