// medir-oro.mjs — el oro de cada prototipo E10 con el criterio del manual §07b (Lucía, 16-oct-2026).
// Captura cada página a 1440 con antialias de texto en gris (--disable-lcd-text): con antialias subpíxel,
// el texto ciruela sobre la banda amarilla deja bordes de color (244,221,96), (230,185,71)… que la máscara
// de §07b cuenta como oro aunque no se vean (0,04-0,07 % de la página). En gris quedan solo los píxeles de
// verdad. Mide con e9/piezas/medir.py (la misma máscara) y dice dónde cae el oro: tiene que ser el punto del
// pie, sobre ciruela. Sirve proto/ en 8770 antes. Uso: node herramientas/medir-oro.mjs → img/oro.json
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const MEDIR = path.join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e9/piezas/medir.py');
// Capturas intermedias FUERA del repo (en la ronda 1 terminaron 36 MB de PNG en .tmp/ dentro de un commit).
const TMP = process.env.TMP_E10 || path.join(os.tmpdir(), 'e10-tablero');
fs.mkdirSync(TMP, { recursive: true });
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-lcd-text'] });
const out = [];
for (const d of ['taller', 'pizarra']) for (const p of ['home', 'acompanamiento-mensual', 'trabajo']) {
  const pg = await nav.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await pg.goto(`http://127.0.0.1:8770/${d}/${p}.html`, { waitUntil: 'networkidle' });
  await pg.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 900) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); await Promise.all([...document.images].map((i) => i.decode().catch(() => 0))); });
  const punto = await pg.evaluate(() => { const r = document.querySelector('.d-gigante .oro').getBoundingClientRect(); return [Math.floor(r.left), Math.floor(r.top + scrollY), Math.ceil(r.right), Math.ceil(r.bottom + scrollY)]; });
  const png = path.join(TMP, `oro-${d}-${p}.png`);
  await pg.screenshot({ path: png, fullPage: true }); await pg.close();
  const todo = JSON.parse(execFileSync('python3', ['-I', MEDIR, 'oro', png], { encoding: 'utf8' }));
  // lo mismo sin la caja del punto del pie (pintada del ciruela del manual, #341F34): lo que queda es oro fuera del punto
  const sin = JSON.parse(execFileSync('python3', ['-I', '-c', `
import sys, json
from PIL import Image, ImageDraw
im = Image.open(sys.argv[1]).convert('RGB'); x0, y0, x1, y1 = json.loads(sys.argv[2])
ImageDraw.Draw(im).rectangle([x0, y0, x1, y1], fill=(52, 31, 52)); im.save(sys.argv[3])
print(json.dumps(1))`, png, JSON.stringify(punto), png.replace('.png', '-sin-punto.png')], { encoding: 'utf8' })) && JSON.parse(execFileSync('python3', ['-I', MEDIR, 'oro', png.replace('.png', '-sin-punto.png')], { encoding: 'utf8' }));
  const r = { direccion: d, pagina: p, caja_del_punto: punto, toda_la_pagina: todo, fuera_del_punto: sin, veredicto: sin.limpio ? 'un solo oro: el punto del pie, sobre ciruela' : 'HAY ORO FUERA DEL PUNTO' };
  out.push(r); console.log(d, p, 'página', todo.pct + '%', 'fuera del punto', sin.pct + '%', sin.pixeles + ' px', r.veredicto);
}
await nav.close();
fs.writeFileSync(path.join(AQUI, 'img/oro.json'), JSON.stringify({ fecha: new Date().toISOString(), criterio: 'manual §07b: tono 38-54°, saturación ≥ 0,5, brillo ≥ 0,5; < 0,05 % es limpio (e9/piezas/medir.py)', captura: '1440, página completa, antialias de texto en gris', paginas: out }, null, 1));
