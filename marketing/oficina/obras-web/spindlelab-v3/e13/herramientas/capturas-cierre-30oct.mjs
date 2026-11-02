// E13 · cierre del 30-oct · Mauro.
// Uso: node capturas-cierre-30oct.mjs <dist> <carpeta de salida PNG>
// Sirve <dist> en un puerto libre y saca, de cada ruta del sitemap del build:
//   primera/<ruta>-1440.png (1440 × 900) y primera/<ruta>-390.png (390 × 844, contexto táctil),
// y la página entera de la home y de /contacto/ a 1440 y 390 en completa/.
// El aviso de cookies va contestado (rechazo guardado) para que se vea la página; el aviso abierto lo midió Javiera.
// La primera pantalla se toma a los 1,5 s de cargada, con el video corriendo; la página entera, después de recorrerla.
// Escribe registro.json con, por captura: h1, desborde horizontal, errores de consola y pedidos fallidos.
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [distArg, salidaArg] = process.argv.slice(2);
if (!distArg || !salidaArg) { console.error('uso: node capturas-cierre-30oct.mjs <dist> <salida>'); process.exit(2); }
const dist = resolve(distArg);
const salida = resolve(salidaArg);

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

const servidor = createServer(async (req, res) => {
  try {
    let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let archivo = join(dist, ruta);
    if (!archivo.startsWith(dist)) { res.writeHead(403); return res.end(); }
    let s = await stat(archivo).catch(() => null);
    if (s && s.isDirectory()) { archivo = join(archivo, 'index.html'); s = await stat(archivo).catch(() => null); }
    if (!s) { res.writeHead(404, { 'content-type': 'text/html' }); return res.end(await readFile(join(dist, '404.html')).catch(() => '')); }
    const cuerpo = await readFile(archivo);
    const tipo = TIPOS[extname(archivo).toLowerCase()] || 'application/octet-stream';
    const rango = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (rango) {
      const ini = rango[1] ? Number(rango[1]) : 0;
      const fin = rango[2] ? Number(rango[2]) : cuerpo.length - 1;
      res.writeHead(206, { 'content-type': tipo, 'content-range': `bytes ${ini}-${fin}/${cuerpo.length}`, 'accept-ranges': 'bytes', 'content-length': fin - ini + 1 });
      return res.end(cuerpo.subarray(ini, fin + 1));
    }
    res.writeHead(200, { 'content-type': tipo, 'accept-ranges': 'bytes', 'content-length': cuerpo.length });
    res.end(cuerpo);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${servidor.address().port}`;

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const rutas = [...sitemap.matchAll(/<loc>https:\/\/spindlelab\.cl([^<]*)<\/loc>/g)].map((m) => m[1]);
const nombre = (r) => (r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '_'));

await mkdir(join(salida, 'primera'), { recursive: true });
await mkdir(join(salida, 'completa'), { recursive: true });

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const TAMANOS = [
  { ancho: 1440, alto: 900, tactil: false },
  { ancho: 390, alto: 844, tactil: true },
];
const registro = [];

async function abrir(t) {
  const ctx = await navegador.newContext({ viewport: { width: t.ancho, height: t.alto }, deviceScaleFactor: 1, isMobile: t.tactil, hasTouch: t.tactil });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const errores = [];
  const fallidos = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  p.on('requestfailed', (q) => { if (q.url().startsWith(base)) fallidos.push(q.url().replace(base, '') + ' ' + (q.failure()?.errorText || '')); });
  p.on('response', (r) => { if (r.url().startsWith(base) && r.status() >= 400) fallidos.push(r.url().replace(base, '') + ' ' + r.status()); });
  return { ctx, p, errores, fallidos };
}

async function datos(p) {
  return p.evaluate(() => ({
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.replace(/\s+/g, ' ').trim()),
    desborde: document.documentElement.scrollWidth - innerWidth,
    alto: document.documentElement.scrollHeight,
    aviso: !!document.querySelector('#cookie-aviso:not([hidden]), .cookie-banner:not([hidden])') && getComputedStyle(document.querySelector('#cookie-aviso, .cookie-banner')).display !== 'none',
  }));
}

for (const t of TAMANOS) {
  for (const r of rutas) {
    const { ctx, p, errores, fallidos } = await abrir(t);
    await p.goto(base + r, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(1500);
    const archivo = join('primera', `${nombre(r)}-${t.ancho}.png`);
    await p.screenshot({ path: join(salida, archivo) });
    registro.push({ ruta: r, ancho: t.ancho, tipo: 'primera', archivo, ...(await datos(p)), errores, fallidos });
    await ctx.close();
  }
}

for (const t of TAMANOS) {
  for (const r of ['/', '/contacto/']) {
    const { ctx, p, errores, fallidos } = await abrir(t);
    await p.goto(base + r, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((z) => setTimeout(z, 60)); }
      window.scrollTo(0, 0);
    });
    await p.waitForTimeout(1200);
    const archivo = join('completa', `${nombre(r)}-${t.ancho}.png`);
    await p.screenshot({ path: join(salida, archivo), fullPage: true });
    registro.push({ ruta: r, ancho: t.ancho, tipo: 'completa', archivo, ...(await datos(p)), errores, fallidos });
    await ctx.close();
  }
}

await navegador.close();
servidor.close();
await writeFile(join(salida, 'registro.json'), JSON.stringify({ base: dist, rutas: rutas.length, capturas: registro }, null, 1));
const malas = registro.filter((x) => x.errores.length || x.fallidos.length || x.desborde > 0 || x.h1.length !== 1);
console.log(`${registro.length} capturas de ${rutas.length} rutas; con algo que mirar: ${malas.length}`);
for (const m of malas) console.log(' ', m.archivo, JSON.stringify({ h1: m.h1.length, desborde: m.desborde, errores: m.errores, fallidos: m.fallidos }));
process.exit(malas.length ? 1 : 0);
