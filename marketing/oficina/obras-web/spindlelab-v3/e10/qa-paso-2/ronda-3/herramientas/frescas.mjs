// Ronda 3 · ¿las capturas del tablero son el render de hoy? Página completa a 1440 (dpr 1) y 390 (dpr 2), con
// movimiento reducido (como renderizar.mjs), contra los tramos img/<dir>-<pag>-<ancho>-t<n>.jpg unidos.
// Uso: node frescas.mjs <carpeta-temporal>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { execFileSync } from 'node:child_process';
const TMP = process.argv[2];
const IMG = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e10-direcciones/img';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const d of ['taller', 'pizarra']) for (const pg of ['home', 'acompanamiento-mensual', 'trabajo']) for (const [w, h, dsf] of [[1440, 900, 1], [390, 844, 2]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf, reducedMotion: 'reduce' })).newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { await document.fonts.ready; document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; }); await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 8000); }))); for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); await Promise.all([...document.images].map(i => i.decode().catch(() => 0))); });
  const f = `${TMP}/${d}-${pg}-${w}.png`; await p.screenshot({ path: f, fullPage: true });
  const r = execFileSync('python3', ['-I', '-c', `
import sys, glob
from PIL import Image, ImageChops
f, base = sys.argv[1], sys.argv[2]
a = Image.open(f).convert('RGB')
if a.size[0] > 1440: a = a.resize((1440, round(a.size[1] * 1440 / a.size[0])), Image.LANCZOS)
ts = sorted(glob.glob(base + '-t*.jpg'), key=lambda x: int(x.rsplit('-t', 1)[1][:-4])) or glob.glob(base + '.jpg')
tiles = [Image.open(t).convert('RGB') for t in ts]
H = sum(t.size[1] for t in tiles); W = tiles[0].size[0]
c = Image.new('RGB', (W, H)); y = 0
for t in tiles: c.paste(t, (0, y)); y += t.size[1]
if (W, H) != a.size: print(f'TAMAÑO DISTINTO render {a.size} tablero {(W, H)} ({len(ts)} tramos)'); sys.exit()
d = ImageChops.difference(a, c).convert('L').point(lambda v: 255 if v > 48 else 0)
bb = d.getbbox(); filas = sum(1 for yy in range(0, H, 4) if d.crop((0, yy, W, yy + 1)).getbbox())
print(f'{W}×{H} ({len(ts)} tramos) · filas con diferencia > 48: {filas * 4} de {H} px · caja {bb}')
`, f, `${IMG}/${d}-${pg}-${w}`], { encoding: 'utf8' }).trim();
  console.log(`${d}-${pg}-${w}: ${r}`);
  await p.context().close();
}
await b.close();
