// Tonela · recorrido grabado del sitio, 10 s a 1440 × 810.
// Uso: node recorrido.mjs http://127.0.0.1:PUERTO   (el servidor sirve la carpeta 04-tonela/)
//
// El mismo guion corre dos veces:
//   A) con recordVideo de Playwright → recorrido.webm (VP8 de Playwright, recortado al guion).
//   B) con el screencast de Chrome por CDP, cuadro a cuadro en JPEG al 92 % → recorrido.mp4 (H.264).
// Por qué dos tomas: recordVideo codifica a ~1 Mbit/s y a 1440 × 810 el texto de la tabla queda blando; la toma B
// guarda cada cuadro que pinta el compositor con su marca de tiempo y ffmpeg lo arma a 30 cps sin perder nitidez.
// El guion es el mismo, así que las dos tomas cuentan lo mismo.
//
// Guion: 0-2,2 s las ocho bandas entran de la más liviana a la más pesada y el cursor se posa en el botón (hover);
// 2,5-3,5 s baja a la tabla; 3,95 s elige «Canasto paralelo» y cada fila cambia su capacidad; 4,5 s pasa sobre la
// fila verde (hover); 5,7 s elige «Canasto 7° a 45°»; 6,2-7,1 s baja al dibujo del ángulo; 7,4-9,3 s arrastra el
// control y los ramales se abren: 2,8 t, 2 t y, pasados los 60°, «No se iza».
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const base = process.argv[2];
const aqui = path.dirname(new URL(import.meta.url).pathname);
const tmp = path.join(aqui, '.tmp');
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(path.join(tmp, 'cuadros'), { recursive: true });
const W = 1440, H = 810, DURACION = 10;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

// Un cursor dibujado: el headless no pinta el del sistema. Solo existe durante la grabación.
const CURSOR = `(() => {
  const c = document.createElement('div');
  c.id = 'cursor-grabacion';
  c.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:30px;z-index:2147483647;pointer-events:none;transform:translate(-100px,-100px);transition:transform 0s';
  c.innerHTML = '<svg viewBox="0 0 22 30" width="22" height="30"><path d="M2 2v22l6-5.5 4.2 9 3.6-1.7-4.1-8.8H20Z" fill="#121314" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  addEventListener('mousemove', (e) => { c.style.transform = 'translate(' + (e.clientX - 2) + 'px,' + (e.clientY - 2) + 'px)'; }, true);
  window.__scroll = (y, ms) => new Promise((ok) => {
    const y0 = scrollY, t0 = performance.now();
    const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    (function paso(now) {
      const t = Math.min(1, (now - t0) / ms);
      scrollTo({ top: y0 + (y - y0) * ease(t), behavior: 'instant' });
      if (t < 1) requestAnimationFrame(paso); else ok();
    })(t0);
  });
})()`;

// Movimiento del cursor guiado por el reloj (no por cantidad de pasos): llega a tiempo aunque cada evento tarde.
async function mover(page, desde, hasta, ms) {
  const t0 = Date.now();
  for (;;) {
    const t = Math.min(1, (Date.now() - t0) / ms), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.mouse.move(desde[0] + (hasta[0] - desde[0]) * e, desde[1] + (hasta[1] - desde[1]) * e);
    if (t >= 1) return hasta;
    await esperar(14);
  }
}
const centro = async (loc) => { const b = await loc.boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };

async function guion(page, alEmpezar) {
  await page.goto(base + '/sitio/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(CURSOR);
  // las bandas vuelven a su estado inicial (escondidas) para que la entrada quede dentro de la toma
  await page.evaluate(() => { const b = document.querySelector('.bandas'); b.classList.remove('entra'); void b.offsetWidth; });
  let m = [900, 600];
  await page.mouse.move(...m);
  await esperar(400);
  const t0 = Date.now();
  const hasta = (ms) => esperar(Math.max(0, t0 + ms - Date.now()));
  const marca = (q) => console.log('   ', String(Date.now() - t0).padStart(5), 'ms', q);
  alEmpezar && alEmpezar(t0);
  await page.evaluate(() => document.querySelector('.bandas').classList.add('entra'));
  marca('entran las bandas');
  // hover sobre el botón mientras terminan de entrar
  await hasta(200);
  const bb = await page.locator('.portada .boton').boundingBox();
  m = await mover(page, m, [bb.x + bb.width - 26, bb.y + bb.height / 2 + 6], 1000); // sobre la flecha, sin tapar el texto
  marca('hover en el botón');
  // baja a la tabla
  await hasta(2500);
  const yTabla = await page.evaluate(() => document.getElementById('modos').getBoundingClientRect().top + scrollY - 76 - 70);
  const bajar = page.evaluate((y) => window.__scroll(y, 1000), yTabla);
  m = await mover(page, m, [760, 330], 1000);
  await bajar;
  marca('en la tabla');
  // elige «Canasto paralelo»
  m = await mover(page, m, await centro(page.locator('.modo:has(input[value="paralelo"])')), 400);
  await hasta(3950);
  await page.locator('input[value="paralelo"]').check({ force: true });
  marca('canasto paralelo');
  // pasa sobre la fila verde
  await hasta(4500);
  m = await mover(page, m, await centro(page.locator('#carga tbody tr[data-t="2"] td[data-modo="paralelo"]')), 350);
  marca('hover en la fila verde');
  // elige «Canasto 7° a 45°»
  await hasta(5300);
  m = await mover(page, m, await centro(page.locator('.modo:has(input[value="a45"])')), 350);
  await hasta(5700);
  await page.locator('input[value="a45"]').check({ force: true });
  marca('canasto 7 a 45');
  // baja al ángulo
  await hasta(6200);
  const yAng = await page.evaluate(() => document.getElementById('angulo').getBoundingClientRect().top + scrollY - 76 - 40);
  await page.evaluate((y) => window.__scroll(y, 900), yAng);
  marca('en el ángulo');
  const caja = await page.locator('#angulo-rango').boundingBox();
  const xDe = (v) => caja.x + 11 + (caja.width - 22) * (v / 75);
  const yR = caja.y + caja.height / 2;
  m = await mover(page, m, [xDe(30), yR], 250);
  await hasta(7400);
  await page.mouse.down();
  // arrastra de 30° a 66°: la capacidad baja con el factor y, pasados los 60°, no se iza
  const d0 = Date.now();
  for (;;) {
    const t = Math.min(1, (Date.now() - d0) / 1900), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.mouse.move(xDe(30 + 36 * e), yR);
    if (t >= 1) break;
    await esperar(14);
  }
  await page.mouse.up();
  marca('66°, no se iza');
  await hasta(DURACION * 1000 + 300);
  return t0;
}

// ---------- toma A: recordVideo ----------
{
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: tmp, size: { width: W, height: H } } });
  const inicio = Date.now();
  const page = await ctx.newPage();
  let t0 = 0;
  await guion(page, (t) => { t0 = t; });
  const video = page.video();
  await ctx.close();
  const crudo = await video.path();
  const desfase = ((t0 - inicio) / 1000).toFixed(3);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', desfase, '-i', crudo, '-t', String(DURACION), '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30', '-row-mt', '1', '-an', path.join(aqui, 'recorrido.webm')]);
  console.log('ok recorrido.webm (recordVideo, desde', desfase, 's)');
}

// ---------- toma B: screencast cuadro a cuadro ----------
{
  const ctx = await browser.newContext({ viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const cuadros = [];
  cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    cuadros.push({ data, t: metadata.timestamp });
    try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch (e) {}
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  let t0 = 0;
  await guion(page, (t) => { t0 = t / 1000; });
  await cdp.send('Page.stopScreencast');
  await ctx.close();
  // del cuadro vigente en t0 hasta t0 + DURACION
  let i0 = cuadros.findIndex((c) => c.t >= t0) - 1; if (i0 < 0) i0 = 0;
  const sel = cuadros.slice(i0).filter((c) => c.t <= t0 + DURACION);
  const lista = [];
  sel.forEach((c, i) => {
    const nombre = `c${String(i).padStart(5, '0')}.jpg`;
    fs.writeFileSync(path.join(tmp, 'cuadros', nombre), Buffer.from(c.data, 'base64'));
    const ini = Math.max(c.t, t0);
    const fin = i + 1 < sel.length ? Math.max(sel[i + 1].t, t0) : t0 + DURACION;
    lista.push(`file 'cuadros/${nombre}'`, `duration ${Math.max(0.001, fin - ini).toFixed(4)}`);
  });
  lista.push(`file 'cuadros/c${String(sel.length - 1).padStart(5, '0')}.jpg'`);
  fs.writeFileSync(path.join(tmp, 'lista.txt'), lista.join('\n'));
  const intervalos = sel.slice(1).map((c, i) => c.t - sel[i].t);
  console.log('cuadros', sel.length, 'en', DURACION, 's · intervalo medio', (intervalos.reduce((a, b) => a + b, 0) / intervalos.length * 1000).toFixed(1), 'ms · máximo', (Math.max(...intervalos) * 1000).toFixed(0), 'ms');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'lista.txt'), '-vf', `fps=30,scale=${W}:${H}:flags=lanczos,format=yuv420p`, '-t', String(DURACION), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-movflags', '+faststart', '-an', path.join(aqui, 'recorrido.mp4')]);
  console.log('ok recorrido.mp4 (H.264)');
  // póster: las ocho bandas ya colgadas, con el rótulo «Concepto» en la cabecera
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '2.3', '-i', path.join(aqui, 'recorrido.mp4'), '-frames:v', '1', '-q:v', '2', path.join(aqui, 'poster.jpg')]);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '2.3', '-i', path.join(aqui, 'recorrido.mp4'), '-frames:v', '1', path.join(aqui, 'poster.png')]);
  console.log('ok poster.jpg y poster.png');
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
