// Recorridos grabados de la dirección B (home e índice, 1440 × 900). Lucía, 17-oct-2026.
// Se graba con el screencast de Chromium (CDP, JPEG calidad 92, cada cuadro con su hora) y se arma con
// ffmpeg respetando la duración real de cada cuadro: más nítido que recordVideo de Playwright, que graba
// VP8 a bitrate fijo. El chequeo corre de verdad contra /api/chequeo con example.com (dominio reservado
// de la IANA: no es un prospecto ni un cliente).
// Uso: node grabar.mjs <base> <carpeta temporal>   →  ../../../video/b-home-1440.webm y b-trabajo-1440.webm
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const VIDEO = path.resolve(AQUI, '../../../video');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.argv[2];
const TMP = process.argv[3];
fs.mkdirSync(VIDEO, { recursive: true });
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function rueda(p, total, pasos, pausa) {
  for (let i = 0; i < pasos; i++) { await p.mouse.wheel(0, total / pasos); await esperar(pausa); }
}

async function grabar(nombre, ruta, guion) {
  const p = await nav.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.mouse.move(720, 200);
  const dir = path.join(TMP, nombre);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const cdp = await p.context().newCDPSession(p);
  const cuadros = [];
  cdp.on('Page.screencastFrame', async (f) => {
    const archivo = path.join(dir, `c${String(cuadros.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(archivo, Buffer.from(f.data, 'base64'));
    cuadros.push({ archivo, t: f.metadata.timestamp });
    try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch (e) {}
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1440, maxHeight: 900, everyNthFrame: 1 });
  const t0 = Date.now();
  await guion(p);
  await esperar(400);
  await cdp.send('Page.stopScreencast');
  const dur = (Date.now() - t0) / 1000;
  // Lista de concat con la duración de cada cuadro (hasta el siguiente).
  let lista = '';
  for (let i = 0; i < cuadros.length; i++) {
    const d = i + 1 < cuadros.length ? Math.max(0.001, cuadros[i + 1].t - cuadros[i].t) : 0.4;
    lista += `file '${cuadros[i].archivo}'\nduration ${d.toFixed(4)}\n`;
  }
  lista += `file '${cuadros[cuadros.length - 1].archivo}'\n`;
  const listaArchivo = path.join(dir, 'lista.txt');
  fs.writeFileSync(listaArchivo, lista);
  const salida = path.join(VIDEO, `b-${nombre}-1440.webm`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listaArchivo, '-vf', 'fps=30,format=yuv420p',
    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', salida]);
  const sonda = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=width,height', '-of', 'json', salida]).toString();
  console.log(nombre, cuadros.length, 'cuadros', dur.toFixed(1), 's de guion →', path.basename(salida), JSON.parse(sonda).format.duration, 's', fs.statSync(salida).size, 'bytes');
  await p.close();
}

await grabar('home', '', async (p) => {
  await esperar(1300);
  const campo = await p.locator('#chq-dominio').boundingBox();
  await p.mouse.move(campo.x + 120, campo.y + campo.height / 2, { steps: 24 });
  await p.mouse.click(campo.x + 120, campo.y + campo.height / 2);
  await p.keyboard.type('example.com', { delay: 75 });
  const boton = await p.locator('#chq-btn').boundingBox();
  await p.mouse.move(boton.x + boton.width / 2, boton.y + boton.height / 2, { steps: 14 });
  await p.mouse.click(boton.x + boton.width / 2, boton.y + boton.height / 2);
  await p.waitForSelector('#chq-out:not([hidden]), #chq-error:not([hidden])', { timeout: 30000 });
  await esperar(1500);
  await p.mouse.move(900, 500, { steps: 10 });
  // al índice corto
  const obra = await p.evaluate(() => document.getElementById('titulo-obra').getBoundingClientRect().top + window.scrollY - 90);
  const ahora = await p.evaluate(() => window.scrollY);
  await rueda(p, obra - ahora, 16, 55);
  await esperar(500);
  const filas = p.locator('#titulo-obra').locator('xpath=ancestor::section').locator('tbody tr');
  for (let i = 0; i < 4; i++) {
    const c = await filas.nth(i).boundingBox();
    await p.mouse.move(c.x + 240 + i * 20, c.y + c.height / 2, { steps: 14 });
    await esperar(i === 3 ? 1100 : 650);
  }
  await p.mouse.move(1300, 400, { steps: 10 });
  const prueba = await p.evaluate(() => document.getElementById('titulo-prueba').getBoundingClientRect().top + window.scrollY - 80);
  const y2 = await p.evaluate(() => window.scrollY);
  await rueda(p, prueba - y2, 14, 55);
  await esperar(1300);
  await rueda(p, 640, 10, 55);
  await esperar(1300);
  await rueda(p, 620, 10, 55);
  await esperar(1200);
});

await grabar('trabajo', 'trabajo/', async (p) => {
  await esperar(1300);
  await rueda(p, 330, 8, 60);
  await esperar(400);
  const filas = p.locator('.indice tbody tr');
  for (const i of [0, 1, 2, 3]) {
    const c = await filas.nth(i).boundingBox();
    await p.mouse.move(c.x + 260, c.y + Math.min(60, c.height / 2), { steps: 14 });
    await esperar(i === 2 ? 1500 : 750);
  }
  const f = await p.locator('[data-filtro="concepto"]').boundingBox();
  await p.mouse.move(f.x + f.width / 2, f.y + f.height / 2, { steps: 16 });
  await p.mouse.click(f.x + f.width / 2, f.y + f.height / 2);
  await esperar(700);
  const visibles = p.locator('.indice tbody tr:not([hidden])');
  for (let i = 0; i < 4; i++) {
    const c = await visibles.nth(i).boundingBox();
    await p.mouse.move(c.x + 300, c.y + Math.min(60, c.height / 2), { steps: 14 });
    await esperar(1250);
  }
  const t = await p.locator('[data-filtro="todo"]').boundingBox();
  await p.mouse.move(t.x + t.width / 2, t.y + t.height / 2, { steps: 16 });
  await p.mouse.click(t.x + t.width / 2, t.y + t.height / 2);
  await esperar(900);
});

await nav.close();
