// peso.mjs — ¿qué peso de Instrument Sans tiene el color de Saans Medium? (Lucía, 16-oct-2026; ronda 2 de QA, defectos 7 y 10)
//
// El lock §11 eligió Instrument Sans (OFL, variable de 400 a 700) para reemplazar a Saans Medium (comercial) y dijo
// que el peso «se ajusta si el 500 se ve más liviano». Javiera lo vio más liviano en tipos-comparados.png y pidió
// probar y anotar. Esto mide, en vez de mirar:
//   · el asta: el ancho de la columna vertical de «l» (asta de ascendente) y de la primera de «n», a 400 px, en el
//     punto medio de la altura de la x (la parte recta, sin remates);
//   · el color: la tinta (suma de 1 − luminancia) por píxel de ancho de línea, en tres frases reales del sitio a
//     138 px, que es lo que el ojo compara en un titular.
// Cada valor se da como proporción del de Saans 500 (1 = igual). Y arma una lámina para mirar: Saans 500 arriba y
// Instrument Sans debajo en 500, 530, 560 y 600, mismo texto y tamaño.
//
// El archivo de Saans NO está en el repo (licencia comercial, lock §11): se pasa su ruta, la de la descarga que se
// usó para tipos-comparados.png. La lámina es un render, como tipos-comparados.png; la letra no se publica.
// Uso: node herramientas/peso.mjs <ruta a saans-500.woff2> [salida.png]   (desde tableros/e10-direcciones/)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const SAANS = process.argv[2];
if (!SAANS || !fs.existsSync(SAANS)) { console.error('Falta la ruta del archivo de Saans 500 (no está en el repo: licencia comercial).'); process.exit(2); }
const SALIDA = path.resolve(process.argv[3] || path.join(AQUI, '../../e10/lock/peso-instrument-saans.png'));
const INSTR = path.join(AQUI, 'proto/fuentes/instrument-sans-latin.woff2');
const PESOS = [500, 520, 540, 560, 580, 600];
const FRASES = ['Ahí se corta el circuito', 'Acompañamiento mensual', 'No te prometo. Te muestro.'];
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'e10-peso-'));
fs.copyFileSync(SAANS, path.join(TMP, 'saans.woff2'));
fs.copyFileSync(INSTR, path.join(TMP, 'instr.woff2'));

const css = `@font-face{font-family:S;src:url(saans.woff2) format('woff2');font-weight:500}
@font-face{font-family:I;src:url(instr.woff2) format('woff2');font-weight:400 700}
html,body{margin:0;background:#fff;color:#000}
.m{position:absolute;left:40px;top:40px;white-space:nowrap;letter-spacing:-.02em;line-height:1}`;
fs.writeFileSync(path.join(TMP, 'm.html'), `<!doctype html><meta charset="utf-8"><style>${css}</style><div class="m" id="m"></div>`);

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-lcd-text', '--font-render-hinting=none'] });
const pg = await (await nav.newContext({ viewport: { width: 2400, height: 700 }, deviceScaleFactor: 1 })).newPage();
await pg.goto('file://' + path.join(TMP, 'm.html'));

async function muestra(fam, peso, texto, px, archivo) {
  await pg.evaluate(async ([f, w, t, s]) => {
    const m = document.getElementById('m'); m.style.fontFamily = f; m.style.fontWeight = w; m.style.fontSize = s + 'px'; m.textContent = t;
    await document.fonts.load(`${w} ${s}px ${f}`); await document.fonts.ready;
  }, [fam, peso, texto, px]);
  const caja = await pg.evaluate(() => { const r = document.getElementById('m').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  await pg.screenshot({ path: archivo, clip: { x: Math.floor(caja.x) - 10, y: Math.floor(caja.y) - 10, width: Math.ceil(caja.w) + 20, height: Math.ceil(caja.h) + 20 } });
  return caja;
}

const filas = [];
const casos = [['S', 500, 'Saans 500'], ...PESOS.map((p) => ['I', p, `Instrument Sans ${p}`])];
for (const [fam, peso, nombre] of casos) {
  const f = { nombre, fam, peso, astas: {}, tinta: [] };
  for (const letra of ['l', 'n']) {
    const a = path.join(TMP, `${fam}${peso}-${letra}.png`);
    await muestra(fam, peso, letra, 400, a);
    f.astas[letra] = a;
  }
  for (const [i, t] of FRASES.entries()) {
    const a = path.join(TMP, `${fam}${peso}-f${i}.png`);
    const c = await muestra(fam, peso, t, 138, a);
    f.tinta.push({ archivo: a, ancho: c.w });
  }
  filas.push(f);
}
await nav.close();

// Medición con PIL: asta = racha más larga de píxeles oscuros en la fila del medio de la x; tinta por ancho.
const py = `
import sys, json
from PIL import Image
filas = json.loads(sys.argv[1])
def asta(p, letra):
    im = Image.open(p).convert('L'); w, h = im.size; px = im.load()
    filas_tinta = [y for y in range(h) if any(px[x, y] < 128 for x in range(w))]
    top, bot = filas_tinta[0], filas_tinta[-1]
    # la «l» es toda asta: se mide al medio; la «n»: a 2/3 de su altura (el asta izquierda, bajo el arco)
    y = (top + bot) // 2 if letra == 'l' else top + (bot - top) * 2 // 3
    mejor = cur = 0
    for x in range(w):
        cur = cur + 1 if px[x, y] < 128 else 0
        mejor = max(mejor, cur)
    return mejor
def tinta(p, ancho):
    im = Image.open(p).convert('L')
    return sum(255 - v for v in im.getdata()) / 255 / ancho
out = []
for f in filas:
    out.append({'nombre': f['nombre'], 'peso': f['peso'], 'asta_l': asta(f['astas']['l'], 'l'), 'asta_n': asta(f['astas']['n'], 'n'),
                'tinta_por_px': [round(tinta(t['archivo'], t['ancho']), 3) for t in f['tinta']]})
print(json.dumps(out))
`;
const med = JSON.parse(execFileSync('python3', ['-I', '-c', py, JSON.stringify(filas)], { encoding: 'utf8' }));
const ref = med[0];
const tabla = med.map((m) => ({
  ...m,
  asta_l_rel: +(m.asta_l / ref.asta_l).toFixed(3), asta_n_rel: +(m.asta_n / ref.asta_n).toFixed(3),
  tinta_rel: +(m.tinta_por_px.reduce((a, v, i) => a + v / ref.tinta_por_px[i], 0) / m.tinta_por_px.length).toFixed(3),
}));
for (const t of tabla) console.log(`${t.nombre.padEnd(20)} asta l ${String(t.asta_l).padStart(3)} px (${t.asta_l_rel})  asta n ${String(t.asta_n).padStart(3)} px (${t.asta_n_rel})  tinta ${t.tinta_rel}`);

// Lámina: Saans 500 y debajo Instrument Sans en 500, 530, 560 y 600, la primera frase a 138 px, con su rótulo.
const lamina = `
import sys, json
from PIL import Image, ImageDraw, ImageFont
filas, salida = json.loads(sys.argv[1]), sys.argv[2]
elegidas = [f for f in filas if f['peso'] in (500, 540, 560, 600) or f['fam'] == 'S']
ims = [Image.open(f['tinta'][0]['archivo']).convert('RGB') for f in elegidas]
W = max(i.size[0] for i in ims) + 300; H = sum(i.size[1] + 16 for i in ims) + 20
hoja = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(hoja)
try:
    fnt = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 22)
except Exception:
    fnt = ImageFont.load_default()
y = 10
for f, im in zip(elegidas, ims):
    d.text((14, y + im.size[1] // 2 - 12), f['nombre'], fill=(80, 80, 80), font=fnt)
    hoja.paste(im, (290, y)); y += im.size[1] + 16
    d.line([(0, y - 8), (W, y - 8)], fill=(220, 220, 220), width=1)
hoja.save(salida, optimize=True)
`;
execFileSync('python3', ['-I', '-c', lamina, JSON.stringify(filas), SALIDA]);
fs.writeFileSync(path.join(AQUI, 'img/peso.json'), JSON.stringify({
  nota: 'Saans 500 contra Instrument Sans (variable) de 500 a 600. Asta: ancho en px de la columna vertical de «l» y de «n» a 400 px. Tinta: 1 − luminancia por px de ancho de línea, en tres frases a 138 px, como proporción de Saans (1 = igual). Render de Chromium sin suavizado subpíxel ni hinting. herramientas/peso.mjs.',
  frases: FRASES, medidas: tabla, lamina: path.relative(AQUI, SALIDA),
}, null, 1));
fs.rmSync(TMP, { recursive: true, force: true });
console.log('lámina', SALIDA);
