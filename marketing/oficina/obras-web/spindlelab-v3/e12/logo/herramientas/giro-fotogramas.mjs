// E12 · logo final · fotogramas del giro de la tortera y comprobación del movimiento reducido (Bruno, 19-oct-2026).
// Uso: node giro-fotogramas.mjs <dir-logo>
// Detiene la animación de final/movimiento/giro.html en 12 instantes y recorta la tortera del logo de 160 px (dpr 2);
// arma final/movimiento/fotogramas.png. Después abre la página con prefers-reduced-motion: reduce, pasa el mouse por
// el logo y cuenta las animaciones (tienen que ser 0). Escribe final/movimiento/giro.json.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const LOGO = path.resolve(process.argv[2]);
const M = path.join(LOGO, 'final', 'movimiento');
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const res = { fecha: new Date().toISOString() };
const errores = [];
const p = await nav.newPage({ viewport: { width: 900, height: 420 }, deviceScaleFactor: 2 });
p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
await p.goto(pathToFileURL(path.join(M, 'giro.html')).href);
await p.waitForTimeout(200);
res.animacionesAlCargar = await p.evaluate(() => document.getAnimations().length);
const tiempos = [0, 60, 120, 180, 240, 300, 360, 420, 480, 560, 640, 760, 900, 1100, 1350, 1600];
const g = await p.locator('a.g svg').boundingBox();
// la tortera: cx ± 1,25 rx en x (rx = 1,6 astas de 18,5) y la mitad de arriba en y, leídas del propio SVG
const svgTxt = fs.readFileSync(path.join(M, 'logo-grande-giro.svg'), 'utf8');
const [vx, vy, vw, vh] = svgTxt.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
const mu = svgTxt.match(/class="muesca" x="([^"]+)" y="[^"]+" width="([^"]+)"/);
const cxu = Number(mu[1]) + Number(mu[2]) / 2, rxu = 29.6 * 1.25;
const zona = { x: g.x + g.width * (cxu - rxu - vx) / vw, y: g.y, width: g.width * (2 * rxu) / vw, height: g.height * 0.55 };
const cuadros = [];
for (const t of tiempos) {
  await p.evaluate((t) => document.getAnimations().forEach(a => { a.pause(); a.currentTime = 300 + t; }), t);
  await p.waitForTimeout(30);
  const f = path.join(M, `_f${t}.png`);
  await p.screenshot({ path: f, clip: zona });
  cuadros.push({ t, f });
}
const imgs = cuadros.map(c => `<figure><img src="${pathToFileURL(c.f).href}"><figcaption>${c.t} ms</figcaption></figure>`).join('');
const hoja = path.join(M, '_hoja.html');
fs.writeFileSync(hoja, `<!doctype html><style>body{margin:0;background:#060606;color:#999;font:11px monospace;display:flex;gap:6px;padding:10px}figure{margin:0}img{display:block;height:130px}</style>${imgs}`);
const h = await nav.newPage({ viewport: { width: 1900, height: 190 }, deviceScaleFactor: 1 });
await h.goto(pathToFileURL(hoja).href); await h.waitForTimeout(200);
await h.screenshot({ path: path.join(M, 'fotogramas.png') });
await h.close();
for (const c of cuadros) fs.unlinkSync(c.f);
fs.unlinkSync(hoja);
const r = await nav.newPage({ viewport: { width: 900, height: 420 }, reducedMotion: 'reduce' });
await r.goto(pathToFileURL(path.join(M, 'giro.html')).href);
await r.waitForTimeout(200);
await r.hover('a.g');
await r.waitForTimeout(100);
res.movimientoReducido = await r.evaluate(() => ({ animaciones: document.getAnimations().length,
  muesca: getComputedStyle(document.querySelector('.muesca')).transform }));
await nav.close();
res.errores = errores;
fs.writeFileSync(path.join(M, 'giro.json'), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
