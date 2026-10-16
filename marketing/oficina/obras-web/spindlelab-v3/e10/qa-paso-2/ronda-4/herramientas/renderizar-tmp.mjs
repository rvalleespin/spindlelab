// Ronda 4 (Javiera): copia de tableros/e10-direcciones/herramientas/renderizar.mjs con DOS líneas cambiadas, para no
// escribir en img/: REPO es la ruta absoluta del repo e IMG es la carpeta temporal de IMG_SALIDA. El resto, idéntico.
// renderizar.mjs — capturas del tablero E10 (Lucía, 16-oct-2026). Base: e9-interiores/herramientas/renderizar.mjs.
//
// Cada página de cada dirección a página completa, a 1440 (deviceScaleFactor 1) y a 390 (deviceScaleFactor 2),
// en JPEG calidad 82 partido en tramos de ≤ 4000 px. Se rinde con prefers-reduced-motion: reduce, que es el
// estado quieto que el lock pide (cinta detenida desde el margen, marcador completo): así la captura no
// depende del instante. Mide además: desborde a 390 (scrollWidth), letras cargadas, imágenes rotas, fotos
// viejas de assets/img/d/, el tamaño real de cada espacio de foto, cuántos marcadores hay y cuántos a la vista
// a la vez, y la densidad de texto (área de texto / área de la página, como en el lock §6 y §9).
//
// Sirve proto/ antes:  python3 -m http.server 8770 --directory proto
// Uso: node herramientas/renderizar.mjs [filtro]     (desde tableros/e10-direcciones/)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = '/home/user/spindlelab';
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const IMG = process.env.IMG_SALIDA; if (!IMG || IMG.includes('/tableros/')) throw new Error('IMG_SALIDA tiene que ser una carpeta temporal fuera de img/');
// Capturas intermedias FUERA del repo (en la ronda 1 terminaron 36 MB de PNG en .tmp/ dentro de un commit).
const TMP = process.env.TMP_E10 || path.join(os.tmpdir(), 'e10-tablero');
fs.mkdirSync(IMG, { recursive: true }); fs.mkdirSync(TMP, { recursive: true });
const filtro = process.argv[2] || '';

const PAGINAS = [];
for (const d of ['taller', 'pizarra']) for (const p of ['home', 'acompanamiento-mensual', 'trabajo']) PAGINAS.push([`${d}-${p}`, `/${d}/${p}.html`]);
// ANCHOS=768,1024 (ronda 2 de QA, defecto 2): los anchos de tableta, a deviceScaleFactor 1 y JPEG 72, como evidencia de
// la regla de escala en img/ (no van al tablero). Sin la variable: 1440 y 390, que son los del tablero.
const ANCHOS = process.env.ANCHOS ? process.env.ANCHOS.split(',').map((w) => [+w, w >= 1024 ? 768 : 1024, 1]) : [[1440, 900, 1], [390, 844, 2]];
const CALIDAD = process.env.ANCHOS ? 72 : 82;

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const medidas = {};

function aJpg(png, nombre, ancho) {
  const out = execFileSync('python3', ['-I', '-c', `
import sys, json, glob, os
from PIL import Image
png, base, img = sys.argv[1], sys.argv[2], sys.argv[3]
for viejo in glob.glob(os.path.join(img, base + '.jpg')) + glob.glob(os.path.join(img, base + '-t*.jpg')):
    os.remove(viejo)
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
    t.save(img + '/' + nom, 'JPEG', quality=int(sys.argv[4]), optimize=True, progressive=True)
    hechos.append([nom, t.size[0], t.size[1]])
print(json.dumps(hechos))
`, png, `${nombre}-${ancho}`, IMG, String(CALIDAD)], { encoding: 'utf8' });
  return JSON.parse(out);
}

for (const [nombre, url] of PAGINAS) {
  if (filtro && !nombre.includes(filtro)) continue;
  for (const [w, h, dsf] of ANCHOS) {
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf, reducedMotion: 'reduce' });
    const pg = await ctx.newPage();
    const errores = [];
    pg.on('pageerror', (e) => errores.push(String(e)));
    pg.on('requestfailed', (r) => errores.push('falló ' + r.url()));
    pg.on('response', (r) => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); });
    await pg.goto(BASE + url, { waitUntil: 'networkidle' });
    await pg.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
      await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      scrollTo(0, 0);
      await Promise.all([...document.images].map((i) => i.decode().catch(() => 0)));
    });
    await pg.waitForTimeout(250);
    const m = await pg.evaluate(() => {
      const W = innerWidth, H = document.documentElement.scrollHeight;
      // densidad de texto: suma del área de las cajas de línea de cada nodo de texto visible / área de la página
      // densidad de lectura: lo mismo sin la letra display (≥ 40 px), que ocupa área pero no carga de lectura (ronda 1)
      let area = 0, areaLectura = 0;
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const n = tw.currentNode; if (!n.data.trim()) continue;
        const el = n.parentElement; if (!el || !el.checkVisibility({ visibilityProperty: true }) || el.closest('.d-sr,[aria-hidden="true"]')) continue;
        const r = document.createRange(); r.selectNodeContents(n);
        const display = parseFloat(getComputedStyle(el).fontSize) >= 40;
        for (const q of r.getClientRects()) { area += q.width * q.height; if (!display) areaLectura += q.width * q.height; }
      }
      const marcadores = [...document.querySelectorAll('.mk')].map((e) => { const r = e.getBoundingClientRect(); return { y: r.top + scrollY, alto: r.height, texto: e.textContent }; });
      // a la vista a la vez: máximo de marcadores que caben en una ventana de innerHeight
      let aLaVez = 0;
      for (const a of marcadores) aLaVez = Math.max(aLaVez, marcadores.filter((b) => b.y >= a.y && b.y + b.alto <= a.y + innerHeight).length);
      const cintas = [...document.querySelectorAll('[data-cinta]')].map((c) => ({ clave: c.dataset.cinta, alto: Math.round(c.getBoundingClientRect().height) }));
      return {
        scrollWidth: document.documentElement.scrollWidth, ancho: W, alto: H,
        fuentes: Object.fromEntries([["'Instrument Sans'", 500], ["'IBM Plex Sans'", 400], ["'IBM Plex Mono'", 500], ['Gabarito', 600]]
          .map(([f, p]) => [f.replace(/'/g, ''), document.fonts.check(`${p} 24px ${f}`)])),
        rotas: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src),
        fotosD: [...document.images].filter((i) => /assets\/img\/d\//.test(i.currentSrc || i.src)).length,
        imagenes: [...new Set([...document.images].map((i) => (i.currentSrc || i.src).replace(location.origin, '')))],
        espacios: [...document.querySelectorAll('[data-foto]')].map((f) => { const r = f.getBoundingClientRect(); return { id: f.dataset.foto, ancho: Math.round(r.width), alto: Math.round(r.height), x: Math.round(r.left), y: Math.round(r.top + scrollY) }; }),
        marcadores: marcadores.length, marcadores_a_la_vez: aLaVez, cintas,
        ovalos: document.querySelectorAll('.ovalo, .d-pie .d-btn').length,
        ovalos_a_la_vez: (() => { const ys = [...document.querySelectorAll('.ovalo, .d-pie .d-btn')].map((e) => { const r = e.getBoundingClientRect(); return [r.top + scrollY, r.bottom + scrollY]; });
          return Math.max(0, ...ys.map(([a]) => ys.filter(([c, d]) => c >= a && d <= a + innerHeight).length)); })(),
        densidad_texto: +(100 * area / (W * H)).toFixed(1),
        densidad_lectura: +(100 * areaLectura / (W * H)).toFixed(1),
        h1: document.querySelectorAll('h1').length,
      };
    });
    const png = path.join(TMP, `${nombre}-${w}.png`);
    await pg.screenshot({ path: png, fullPage: true });
    medidas[`${nombre}-${w}`] = { ...m, errores, tramos: aJpg(png, nombre, w) };
    const f = Object.entries(m.fuentes).filter(([, ok]) => !ok).map(([k]) => k);
    console.log(nombre, w, 'alto', m.alto, 'scrollWidth', m.scrollWidth, f.length ? 'SIN ' + f.join(',') : 'letras ok', m.rotas.length ? 'ROTAS ' + m.rotas : '',
      'd/', m.fotosD, 'texto', m.densidad_texto + '%', 'lectura', m.densidad_lectura + '%', 'mk', m.marcadores, '(a la vez', m.marcadores_a_la_vez + ')', errores.length ? 'ERRORES ' + errores.join(' | ') : '');
    await ctx.close();
  }
}
await nav.close();
const previo = fs.existsSync(path.join(IMG, 'medidas.json')) ? JSON.parse(fs.readFileSync(path.join(IMG, 'medidas.json'), 'utf8')) : {};
fs.writeFileSync(path.join(IMG, 'medidas.json'), JSON.stringify({ ...previo, ...medidas }, null, 1));
