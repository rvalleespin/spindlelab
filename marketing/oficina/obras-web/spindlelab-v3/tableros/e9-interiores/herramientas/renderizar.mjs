// renderizar.mjs — capturas del tablero E9 (Lucía, 14-oct-2026)
//
// Prototipos a página completa a 1440 (deviceScaleFactor 1) y a 390 (deviceScaleFactor 2), y
// recortes de prueba. Sirve proto/ antes:  python3 -m http.server 8765 --directory proto
// Salida: img/<nombre>-<ancho>[-tN].jpg (JPEG calidad 82, ancho máx. 1440, tramos de ≤ 4000 px).
//
// Uso: node herramientas/renderizar.mjs [filtro]     (desde tableros/e9-interiores/)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://localhost:8765';
const IMG = path.join(AQUI, 'img');
const TMP = process.env.TMP_E9 || path.join(AQUI, '.tmp');
fs.mkdirSync(IMG, { recursive: true }); fs.mkdirSync(TMP, { recursive: true });
const filtro = process.argv[2] || '';

const PAGINAS = [
  ['d1-acompanamiento', '/d1-pantallas/acompanamiento-mensual.html'],
  ['d1-desarrollo-web', '/d1-pantallas/desarrollo-web.html'],
  ['d2-acompanamiento', '/d2-lectura/acompanamiento-mensual.html'],
  ['d2-desarrollo-web', '/d2-lectura/desarrollo-web.html'],
];
// [nombre, url, selector de inicio, selector de fin, aire arriba, aire abajo]
const RECORTES = [
  ['prueba-compromiso-d1', '/d1-pantallas/acompanamiento-mensual.html', '#planes .d-plan:last-of-type', '.e9-comp', 40, 80],
  ['prueba-compromiso-d2', '/d2-lectura/acompanamiento-mensual.html', '#planes .d-plan:last-of-type', '.e9-comp', 40, 0],
  ['prueba-puntaje-d2', '/d2-lectura/desarrollo-web.html', 'section[aria-labelledby="s-inc"]', '.e9-en-lista + p', -150, 40],
  ['prueba-trabajo-antes', '/recortes/trabajo-antes.html', '.d-obra-trab--alta', '.d-obra-trab--media', 30, 60],
  ['prueba-trabajo-despues', '/recortes/trabajo-despues.html', '.d-obra-trab--alta', '.d-obra-trab--media', 30, 60],
  ['prueba-diagnostico-antes', '/recortes/diagnostico-antes.html', '.d-sangre', '.d-entrada', 30, 60],
  ['prueba-diagnostico-despues', '/recortes/diagnostico-despues.html', '.e9-metodo', '.d-entrada', 30, 60],
  ['ok-k1-diagnostico', '/recortes/ok-k1-diagnostico.html', '.e9-metodo', '.e9-ok', 30, 60],
  ['ok-k2-desarrollo-web', '/recortes/ok-k2-desarrollo-web.html', 'section[aria-labelledby="s-inc"]', '.e9-ok + p', -150, 40],
  ['ok-k3-desarrollo-web', '/recortes/ok-k3-desarrollo-web.html', 'section[aria-labelledby="s-inc"]', '.e9-ok + p', -150, 40],
];
const ANCHOS = [[1440, 900, 1], [390, 844, 2]];

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const medidas = {};

async function abrir(url, w, h, dsf) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
  const pg = await ctx.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle' });
  await pg.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
    // Chromium no decodifica las imágenes fuera de la ventana: en la captura de página completa
    // quedaban como cajas vacías. Se recorre la página y se decodifica cada una.
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => i.decode().catch(() => 0)));
  });
  await pg.waitForTimeout(200);
  const m = await pg.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth, alto: document.documentElement.scrollHeight,
    fuente: document.fonts.check('500 24px Manrope'),
    rotas: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src),
    fotosD: [...document.images].filter((i) => /assets\/img\/d\//.test(i.currentSrc || i.src)).length,
    imagenes: [...new Set([...document.images].map((i) => (i.currentSrc || i.src).replace(location.origin, '')))],
  }));
  return { ctx, pg, m };
}

function aJpg(png, nombre, ancho) {
  // tramos de ≤ 4000 px, JPEG 82, ancho máx. 1440 (python/PIL)
  const out = execFileSync('python3', ['-I', '-c', `
import sys, json
from PIL import Image
png, base, img = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(png).convert('RGB')
w, h = im.size
if w > 1440:
    im = im.resize((1440, round(h * 1440 / w)), Image.LANCZOS); w, h = im.size
TOPE = 4000
n = -(-h // TOPE)
paso = -(-h // n)
hechos = []
for k in range(n):
    t = im.crop((0, k * paso, w, min(h, (k + 1) * paso)))
    nom = base + ('-t%d' % (k + 1) if n > 1 else '') + '.jpg'
    t.save(img + '/' + nom, 'JPEG', quality=82, optimize=True, progressive=True)
    hechos.append([nom, t.size[0], t.size[1]])
print(json.dumps(hechos))
`, png, `${nombre}-${ancho}`, IMG], { encoding: 'utf8' });
  return JSON.parse(out);
}

for (const [nombre, url] of PAGINAS) {
  if (filtro && !nombre.includes(filtro)) continue;
  for (const [w, h, dsf] of ANCHOS) {
    const { ctx, pg, m } = await abrir(url, w, h, dsf);
    const png = path.join(TMP, `${nombre}-${w}.png`);
    await pg.screenshot({ path: png, fullPage: true });
    medidas[`${nombre}-${w}`] = { ...m, tramos: aJpg(png, nombre, w) };
    console.log(nombre, w, 'alto', m.alto, 'scrollWidth', m.scrollWidth, m.fuente ? 'Manrope ok' : 'SIN MANROPE', m.rotas.length ? 'ROTAS ' + m.rotas : '', 'fotos d/', m.fotosD);
    await ctx.close();
  }
}
for (const [nombre, url, sa, sb, arriba, abajo] of RECORTES) {
  if (filtro && !nombre.includes(filtro)) continue;
  for (const [w, h, dsf] of ANCHOS) {
    const { ctx, pg, m } = await abrir(url, w, h, dsf);
    const caja = await pg.evaluate(([a, b]) => {
      const A = document.querySelector(a), B = document.querySelector(b);
      if (!A || !B) return null;
      const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
      return { y0: ra.top + scrollY, y1: rb.bottom + scrollY };
    }, [sa, sb]);
    if (!caja) { console.log('NO ENCONTRÉ', nombre, sa, sb); await ctx.close(); continue; }
    const y = Math.max(0, Math.floor(caja.y0 - arriba));
    const alto = Math.ceil(caja.y1 + abajo - y);
    const png = path.join(TMP, `${nombre}-${w}.png`);
    await pg.screenshot({ path: png, fullPage: true, clip: { x: 0, y, width: w, height: alto } });
    medidas[`${nombre}-${w}`] = { ...m, recorte: { y, alto }, tramos: aJpg(png, nombre, w) };
    console.log(nombre, w, 'recorte', y, alto, 'scrollWidth', m.scrollWidth, m.rotas.length ? 'ROTAS ' + m.rotas : '');
    await ctx.close();
  }
}
await nav.close();
const previo = fs.existsSync(path.join(AQUI, 'img/medidas.json')) ? JSON.parse(fs.readFileSync(path.join(AQUI, 'img/medidas.json'), 'utf8')) : {};
fs.writeFileSync(path.join(AQUI, 'img/medidas.json'), JSON.stringify({ ...previo, ...medidas }, null, 1));
