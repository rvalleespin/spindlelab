// E12 · Las tres demos del paso 1 que faltaban en el tablero de la compuerta 2 (acta del paso 2, defecto 5).
// Lucía (dirección de arte), 18-oct-2026.
//
// Graba del navegador, sobre los prototipos de verdad (proto/a y proto/b, con su Motion 13.5.0 local), tres demos por
// dirección:
//   - teclado:  /trabajo/ a 1440 × 900. El mouse trae el círculo; con Tab el círculo se va, el foco se ve y recorre los
//               filtros y las piezas; al mover el mouse, el círculo vuelve.
//   - reducido: la home a 1440 × 900 con prefers-reduced-motion: reduce. Nada entra animado, ningún video corre solo y
//               el mouse sobre el trabajo no trae círculo.
//   - telefono: /trabajo/ a 390 × 844 (dpr 2, táctil, puntero grueso). Un toque filtra, se desliza con el dedo y otro
//               toque abre el caso: sin círculo ni velo.
// Mouse, teclado y toques son entrada real del navegador (CDP), no animaciones aparte. Para que se vea dónde está el
// mouse, la grabación dibuja una flecha (o la mano, o nada, según el `cursor` que computa la página en ese punto, como
// haría el sistema), una placa con la tecla que se aprieta y un anillo gris en cada toque. Esas tres marcas son de la
// grabación, no del sitio: tienen pointer-events: none y no cambian nada de lo que mide la página.
//
// Mientras graba, mide en la página lo que la demo dice (escala del círculo, elemento con foco y su contorno, la
// preferencia de movimiento, animaciones y videos corriendo, el tipo de puntero, la URL después del toque) y lo deja en
// `datos/demos.json`, de donde el tablero toma los pies. Si una medición no da lo que la demo promete, el script falla.
//
// Se graba con el screencast de Chromium (cada cuadro con su hora, como proto/b/herramientas/grabar.mjs) y se arma con
// ffmpeg en VP9: video/d-<a|b>-<demo>.webm. El H.264 para Safari y el póster los hace armar-tablero.py.
//
// Levanta los dos servidores de las direcciones en puertos libres de 127.0.0.1 y los apaga al terminar.
// Uso: node herramientas/grabar-demos.mjs          (desde cualquier carpeta; TMP_E12 = carpeta temporal opcional)
import fs from 'node:fs';
import os from 'node:os';
import net from 'node:net';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(BASE, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const VIDEO = path.join(BASE, 'video');
const DATOS = path.join(BASE, 'datos');
const TMP = path.join(process.env.TMP_E12 || os.tmpdir(), 'e12-demos');
fs.mkdirSync(TMP, { recursive: true });
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- servidores
const libre = () => new Promise((res) => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const pA = await libre();
const pB = await libre();
const servA = spawn('python3', ['-I', path.join(BASE, 'proto/a/herramientas/servir.py'), String(pA)], { stdio: 'ignore' });
const servB = spawn(process.execPath, [path.join(BASE, 'proto/b/herramientas/servir.mjs'), String(pB)], { stdio: 'ignore' });
const URL_A = `http://127.0.0.1:${pA}/`;
const URL_B = `http://127.0.0.1:${pB}/${path.relative(REPO, path.join(BASE, 'proto/b')).split(path.sep).join('/')}/`;
async function listo(url) {
  for (let i = 0; i < 80; i++) {
    try { const r = await fetch(url); if (r.ok) return; } catch (e) { /* todavía no */ }
    await esperar(250);
  }
  throw new Error('no responde ' + url);
}
let nav;
const apagar = () => { try { servA.kill(); } catch (e) {} try { servB.kill(); } catch (e) {} };
process.on('exit', apagar);

// ---------------------------------------------------------------- las marcas de la grabación (no son del sitio)
const MARCAS = `(() => {
  const ID = 'e12-marcas-de-grabacion';
  let x = -100, y = -100, raton = false;
  const flecha = '<svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true"><path d="M2 2v21l5.5-5.2 3.6 8.4 3.6-1.6-3.6-8.2H18z" fill="#FFFFFF" stroke="#060606" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const mano = '<svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true"><path d="M7 12V3.5a1.8 1.8 0 0 1 3.6 0V11l.2-2.2a1.8 1.8 0 0 1 3.5.3v2.2a1.8 1.8 0 0 1 3.5.2v2a1.8 1.8 0 0 1 3.4.4v4.6c0 4-2.6 6.8-6.8 6.8H12c-2.5 0-4-1-5.3-2.8L2.4 16a1.8 1.8 0 0 1 2.7-2.3z" fill="#FFFFFF" stroke="#060606" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  function montar() {
    if (document.getElementById(ID) || !document.documentElement) return;
    const capa = document.createElement('div');
    capa.id = ID;
    capa.setAttribute('aria-hidden', 'true');
    capa.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict;';
    capa.innerHTML = '<div data-m="puntero" style="position:absolute;left:0;top:0;display:none;will-change:transform"></div>' +
      '<div data-m="tecla" style="position:absolute;left:16px;bottom:16px;display:none;padding:7px 11px;border-radius:4px;background:#FFFFFF;color:#060606;font:500 14px/1 ui-monospace,Menlo,monospace;letter-spacing:.02em"></div>' +
      '<div data-m="toque" style="position:absolute;left:0;top:0;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;border:2px solid #9A9A9A;box-sizing:border-box;display:none"></div>';
    document.documentElement.appendChild(capa);
  }
  const $ = (k) => { montar(); return document.querySelector('#' + ID + ' [data-m="' + k + '"]'); };
  let icono = '';
  function pintar() {
    const p = $('puntero');
    if (!p) return;
    if (!raton) { if (p.style.display !== 'none') p.style.display = 'none'; return; }
    const el = document.elementFromPoint(x, y);
    const c = el ? getComputedStyle(el).cursor : 'auto';
    const quiere = c === 'none' ? '' : (c === 'pointer' ? 'mano' : 'flecha');
    if (quiere !== icono) { icono = quiere; p.innerHTML = quiere === 'mano' ? mano : (quiere === 'flecha' ? flecha : ''); }
    const t = 'translate(' + (x - (icono === 'mano' ? 6 : 2)) + 'px,' + (y - 2) + 'px)';
    if (p.style.transform !== t) p.style.transform = t;
    const d = icono ? 'block' : 'none';
    if (p.style.display !== d) p.style.display = d;
  }
  function bucle() { pintar(); requestAnimationFrame(bucle); }
  addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') { raton = true; x = e.clientX; y = e.clientY; } }, true);
  let tTecla = 0;
  addEventListener('keydown', (e) => {
    const t = $('tecla'); if (!t) return;
    t.textContent = e.key === 'Tab' ? (e.shiftKey ? 'Mayús + Tab' : 'Tab') : e.key;
    t.style.display = 'block';
    clearTimeout(tTecla); tTecla = setTimeout(() => { t.style.display = 'none'; }, 520);
  }, true);
  let tToque = 0;
  const toque = (e, fin) => {
    if (e.pointerType !== 'touch') return;
    const r = $('toque'); if (!r) return;
    r.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    r.style.display = 'block';
    clearTimeout(tToque);
    if (fin) tToque = setTimeout(() => { r.style.display = 'none'; }, 260);
  };
  addEventListener('pointerdown', (e) => toque(e, false), true);
  addEventListener('pointermove', (e) => { if (e.pointerType === 'touch' && e.buttons) toque(e, false); }, true);
  addEventListener('pointerup', (e) => toque(e, true), true);
  addEventListener('pointercancel', (e) => toque(e, true), true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { montar(); bucle(); }); else { montar(); bucle(); }
})();`;

// ---------------------------------------------------------------- lo que se mide en la página
const MEDIR = () => {
  const c = document.querySelector('.circulo, .cursor');
  let circulo = { existe: false, visible: false };
  if (c) {
    const cs = getComputedStyle(c);
    let s = 1;
    const m = cs.transform && cs.transform.match(/matrix\(([^)]+)\)/);
    if (m) { const p = m[1].split(',').map(Number); s = Math.hypot(p[0], p[1]); } else if (cs.transform === 'none') s = 1;
    const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && s > 0.05;
    circulo = { existe: true, display: cs.display, escala: Math.round(s * 100) / 100, visible, texto: visible ? c.textContent.trim() : '' };
  }
  const a = document.activeElement;
  let foco = null;
  if (a && a !== document.body && a !== document.documentElement) {
    const cs = getComputedStyle(a);
    foco = { el: a.tagName.toLowerCase() + (a.className && typeof a.className === 'string' ? '.' + a.className.trim().split(/\s+/).join('.') : ''),
      texto: (a.getAttribute('aria-label') || a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40), contorno: `${cs.outlineStyle} ${cs.outlineWidth}`,
      focoVisible: a.matches(':focus-visible') };
  }
  const activa = document.querySelector('tr.activa');
  return {
    url: location.pathname,
    circulo,
    foco,
    filaActiva: activa ? activa.getAttribute('data-nombre') : null,
    teclado: document.documentElement.classList.contains('teclado'),
    reducido: matchMedia('(prefers-reduced-motion: reduce)').matches,
    punteroFino: matchMedia('(pointer: fine)').matches,
    hover: matchMedia('(hover: hover)').matches,
    animaciones: document.getAnimations().filter((x) => x.playState === 'running').length,
    videosCorriendo: [...document.querySelectorAll('video')].filter((v) => !v.paused).length,
    // A: la pieza que se acorta con el mouse guarda su corte en data-corte (px); B no recorta
    recortadas: [...document.querySelectorAll('.medio[data-corte]')].filter((m) => parseFloat(m.dataset.corte) > 0.5).length,
    // los botones de pausa a la vista, con lo que dicen (Pausar… si el video corre; Seguir… o Reproducir… si espera)
    pausas: [...document.querySelectorAll('.pausa')].filter((b) => { const r = b.getBoundingClientRect(); return !b.hidden && r.width && r.bottom > 0 && r.top < innerHeight; }).map((b) => b.getAttribute('aria-label')),
    scrollY: Math.round(scrollY),
  };
};

// ---------------------------------------------------------------- grabador (screencast con la hora de cada cuadro)
async function grabar(nombre, url, contexto, guion) {
  const movil = !!contexto.isMobile;
  const ctx = await nav.newContext({ locale: 'es-CL', timezoneId: 'America/Santiago', ...contexto });
  await ctx.addInitScript(MARCAS);
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });
  await p.goto(url, { waitUntil: 'networkidle' });
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
  const empezar = () => cdp.send('Page.startScreencast', { format: 'jpeg', quality: 90, maxWidth: ancho, maxHeight: alto, everyNthFrame: 1 });
  await empezar();
  // al navegar, el screencast sigue en la misma sesión; se vuelve a pedir por si el renderer cambió
  p.on('framenavigated', async (fr) => { if (fr === p.mainFrame()) { try { await empezar(); } catch (e) {} } });
  const medidas = [];
  // t: el segundo del video en que se midió (la hora de la medición menos la del primer cuadro, las dos del reloj del sistema)
  const medir = async (momento) => { const abs = Date.now() / 1000; const m = await p.evaluate(MEDIR); medidas.push({ momento, abs, ...m }); return m; };
  const t0 = Date.now();
  await guion(p, medir, cdp);
  await esperar(500);
  const fin = Date.now() / 1000;
  await cdp.send('Page.stopScreencast');
  const seg = (Date.now() - t0) / 1000;
  await ctx.close();
  if (cuadros.length < 10) throw new Error(`${nombre}: ${cuadros.length} cuadros`);
  let lista = '';
  for (let i = 0; i < cuadros.length; i++) {
    // el último cuadro dura hasta que se detuvo la grabación: la página quieta del final también se ve
    const d = i + 1 < cuadros.length ? Math.max(0.001, cuadros[i + 1].t - cuadros[i].t) : Math.max(0.5, fin - cuadros[i].t);
    lista += `file '${cuadros[i].archivo}'\nduration ${d.toFixed(4)}\n`;
  }
  lista += `file '${cuadros[cuadros.length - 1].archivo}'\n`;
  const listaArchivo = path.join(dir, 'lista.txt');
  fs.writeFileSync(listaArchivo, lista);
  const salida = path.join(VIDEO, `${nombre}.webm`);
  // VP9 de calidad constante; el teléfono va a 780 × 1688 (390 × 844 a dpr 2), redondeado a par
  const escala = movil ? `scale=${ancho}:${alto}:flags=lanczos,` : '';
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listaArchivo, '-vf', `${escala}fps=30,format=yuv420p`,
    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', movil ? '36' : '35', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-an', '-map_metadata', '-1', salida]);
  const sonda = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'format=duration:stream=width,height,codec_name', '-of', 'json', salida]).toString());
  for (const m of medidas) { m.t = Math.round((m.abs - cuadros[0].t) * 10) / 10; delete m.abs; }
  const r = { archivo: `video/${nombre}.webm`, url: url.replace(/^http:\/\/127\.0\.0\.1:\d+/, ''), ventana: `${contexto.viewport.width} × ${contexto.viewport.height}`,
    dpr: contexto.deviceScaleFactor || 1, cuadros: cuadros.length, segundosGuion: Math.round(seg * 10) / 10, duracion: Math.round(Number(sonda.format.duration) * 100) / 100,
    ancho: sonda.streams[0].width, alto: sonda.streams[0].height, codec: sonda.streams[0].codec_name, bytes: fs.statSync(salida).size, errores, medidas };
  console.log(nombre, r.cuadros, 'cuadros', r.duracion, 's', r.bytes, 'bytes', errores.length ? 'ERRORES ' + errores.join(' | ') : '');
  fs.rmSync(dir, { recursive: true, force: true });
  return r;
}

const rueda = async (p, total, pasos = 12, pausa = 45) => { for (let i = 0; i < pasos; i++) { await p.mouse.wheel(0, total / pasos); await esperar(pausa); } };
const centro = (b) => [b.x + b.width / 2, b.y + Math.min(b.height, 420) / 2];
async function deslizar(cdp, x, y, distancia) {
  // deslizamientos con el dedo: toques de verdad por CDP (touchStart, touchMove cada 16 ms, touchEnd), de 440 px como
  // mucho para que el dedo no salga de la pantalla, con el dedo quieto 120 ms antes de soltar para que no haya inercia.
  // distancia > 0 baja la página. (Input.synthesizeScrollGesture no desplaza estas páginas en este Chromium: medido.)
  // `y` se ignora: el dedo parte abajo para bajar y arriba para subir.
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
    await esperar(200);
  }
}
const ESCRITORIO = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const TELEFONO = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

// ---------------------------------------------------------------- las demos
async function teclado(p, medir, filtros, piezas, nPiezas) {
  await p.mouse.move(260, 120);
  await esperar(600);
  const todo = await p.locator(filtros).first().boundingBox();
  await p.mouse.move(todo.x + todo.width / 2, todo.y + todo.height / 2, { steps: 14 });
  await p.mouse.click(todo.x + todo.width / 2, todo.y + todo.height / 2);   // el foco queda en el filtro, sin contorno (fue el mouse)
  await esperar(250);
  const b0 = await p.locator(piezas).first().boundingBox();
  const [x0, y0] = centro(b0);
  await p.mouse.move(x0 - 40, y0 - 30, { steps: 18 });
  await p.mouse.move(x0, y0, { steps: 10 });
  await esperar(700);
  const conMouse = await medir('mouse sobre la primera pieza');
  if (!conMouse.circulo.visible) throw new Error('el círculo no aparece con el mouse');
  const pasos = [];
  for (let i = 0; i < 3 + nPiezas; i++) {
    await p.keyboard.press('Tab');
    await esperar(i < 3 ? 520 : 820);
    pasos.push(await medir(`Tab ${i + 1}`));
  }
  const tras = pasos[0];
  if (tras.circulo.visible) throw new Error('el círculo sigue a la vista después de Tab');
  if (pasos.some((m) => !m.foco || !m.foco.focoVisible || !/solid 2px/.test(m.foco.contorno))) throw new Error('foco sin contorno: ' + JSON.stringify(pasos.map((m) => m.foco)));
  const b = await p.locator(piezas).nth(nPiezas - 1).boundingBox();
  const [x1, y1] = centro(b);
  await p.mouse.move(x1 + 30, y1 + 20, { steps: 16 });                     // un movimiento de verdad: el círculo vuelve
  await esperar(900);
  const vuelve = await medir('el mouse se mueve otra vez');
  if (!vuelve.circulo.visible) throw new Error('el círculo no vuelve con el mouse');
  await p.mouse.move(x1 + 90, y1 - 40, { steps: 12 });
  await esperar(600);
}

async function reducido(p, medir, ancla, piezas, segundaAncla) {
  await esperar(900);
  await p.mouse.move(700, 420, { steps: 16 });
  await esperar(700);
  const llega = await medir('al llegar');
  if (!llega.reducido || llega.videosCorriendo || llega.animaciones || (llega.circulo.existe && llega.circulo.display !== 'none')) throw new Error('reducido: ' + JSON.stringify(llega));
  const y = await p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY - 110, ancla);
  await rueda(p, y - (await p.evaluate(() => scrollY)), 14, 55);
  await esperar(500);
  const en = await medir('en el índice corto, recién llegado');
  for (let i = 0; i < 3; i++) {
    const b = await p.locator(piezas).nth(i).boundingBox();
    if (!b) continue;
    const [x, yy] = centro(b);
    await p.mouse.move(x, Math.min(yy, 860), { steps: 14 });
    await esperar(750);
    const m = await medir(`mouse sobre la pieza ${i + 1}`);
    if (m.circulo.visible || m.animaciones || m.videosCorriendo) throw new Error('reducido, sobre una pieza: ' + JSON.stringify(m));
  }
  if (en.animaciones || en.videosCorriendo) throw new Error('reducido, al bajar: ' + JSON.stringify(en));
  await p.mouse.move(1340, 300, { steps: 10 });
  const y2 = await p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY - 110, segundaAncla);
  await rueda(p, y2 - (await p.evaluate(() => scrollY)), 14, 55);
  await esperar(1100);
  const fin = await medir('más abajo');
  if (fin.animaciones || fin.videosCorriendo) throw new Error('reducido, más abajo: ' + JSON.stringify(fin));
}

async function aLaVista(p, cdp, sel, arriba = 260) {
  // si no está entre la cabecera y el borde de abajo, se desliza con el dedo hasta dejarlo a `arriba` px del borde
  const b = await p.locator(sel).first().boundingBox();
  if (b.y >= 90 && b.y + Math.min(b.height, 120) <= 800) return;
  const baja = Math.round(b.y - arriba);
  await deslizar(cdp, 195, baja > 0 ? 640 : 300, baja);
  await esperar(500);
}

async function telefono(p, medir, cdp, concepto, destino) {
  await esperar(900);
  const llega = await medir('al llegar');
  if (llega.punteroFino || llega.hover || llega.circulo.visible) throw new Error('teléfono: ' + JSON.stringify(llega));
  await aLaVista(p, cdp, concepto, 200);
  const f = await p.locator(concepto).boundingBox();
  await p.touchscreen.tap(f.x + f.width / 2, f.y + f.height / 2);
  await esperar(900);
  await medir('tocó «Concepto»');
  for (let intento = 0; intento < 3; intento++) {                        // el dedo deja la pieza a la vista
    const d = await p.locator(destino).boundingBox();
    if (d.y >= 120 && d.y + 40 <= 780) break;
    await deslizar(cdp, 195, 640, Math.round(d.y - 300));
    await esperar(400);
  }
  await esperar(500);
  const antes = await medir('la pieza a la vista');
  if (antes.circulo.visible) throw new Error('teléfono: círculo a la vista');
  const d2 = await p.locator(destino).boundingBox();
  const nav0 = p.waitForURL((u) => /\/trabajo\/sesenta\/$/.test(new URL(u).pathname), { timeout: 15000 });
  await p.touchscreen.tap(d2.x + d2.width / 2, d2.y + Math.min(d2.height, 160) / 2);
  await nav0;
  await p.waitForLoadState('networkidle');
  await esperar(1300);
  const caso = await medir('se abrió el caso');
  if (!/\/trabajo\/sesenta\/$/.test(caso.url) || caso.circulo.visible) throw new Error('teléfono, el caso: ' + JSON.stringify(caso));
  await deslizar(cdp, 195, 660, 520);
  await esperar(1000);
  await medir('baja por el caso');
}

try {
  await Promise.all([listo(URL_A), listo(URL_B)]);
  nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const demos = {};
  demos['d-a-teclado'] = await grabar('d-a-teclado', URL_A + 'trabajo/', ESCRITORIO,
    (p, medir) => teclado(p, medir, '[data-filtro] button', '.muro .medio-enlace', 4));
  demos['d-b-teclado'] = await grabar('d-b-teclado', URL_B + 'trabajo/', ESCRITORIO,
    (p, medir) => teclado(p, medir, 'button[data-filtro]', '.indice tbody tr', 4));
  demos['d-a-reducido'] = await grabar('d-a-reducido', URL_A, { ...ESCRITORIO, reducedMotion: 'reduce' },
    (p, medir) => reducido(p, medir, '#h-obra', '.destacados .medio-enlace', '.destacados__pie'));
  demos['d-b-reducido'] = await grabar('d-b-reducido', URL_B, { ...ESCRITORIO, reducedMotion: 'reduce' },
    (p, medir) => reducido(p, medir, '#titulo-obra', '[data-indice] tbody tr', '#titulo-prueba'));
  demos['d-a-telefono'] = await grabar('d-a-telefono', URL_A + 'trabajo/', TELEFONO,
    (p, medir, cdp) => telefono(p, medir, cdp, '[data-filtro] button[data-tipo="concepto"]', '.muro .medio-enlace[href$="sesenta/"]'));
  demos['d-b-telefono'] = await grabar('d-b-telefono', URL_B + 'trabajo/', TELEFONO,
    (p, medir, cdp) => telefono(p, medir, cdp, 'button[data-filtro="concepto"]', '.indice tbody tr[data-nombre="Sesenta"] .indice__nombre'));
  const conErrores = Object.entries(demos).filter(([, d]) => d.errores.length);
  if (conErrores.length) throw new Error('errores de página: ' + JSON.stringify(conErrores.map(([k, d]) => [k, d.errores])));
  const salida = {
    fecha: new Date().toISOString(),
    medidoPor: 'Lucía (dirección de arte), herramientas/grabar-demos.mjs',
    navegador: nav.version(),
    nota: 'Mouse, teclado y toques por CDP. La flecha o la mano del mouse, la placa de la tecla y el anillo del toque los dibuja la grabación (pointer-events: none); el resto es la página.',
    demos,
  };
  fs.writeFileSync(path.join(DATOS, 'demos.json'), JSON.stringify(salida, null, 1) + '\n');
  console.log('→', path.join(DATOS, 'demos.json'));
} finally {
  if (nav) await nav.close();
  apagar();
}
