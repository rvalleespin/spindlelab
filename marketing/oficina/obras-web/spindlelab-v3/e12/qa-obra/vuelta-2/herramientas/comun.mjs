// Javiera, QA de obra E12, vuelta 2 (23-oct-2026; copiada de la vuelta 1). Lo común a las herramientas: un servidor del dist/ con rangos
// (los videos los piden), Chromium de /opt/pw-browsers y la lista de las 27 rutas del mapa (brief §3).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const AQUI = dirname(fileURLToPath(import.meta.url));
export const REPO = join(AQUI, '../../../../../../../..');
export const ASTRO = join(REPO, 'spindlelab-astro');
export const QA = join(AQUI, '..');
export const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
export const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);

export const RUTAS = [
  '/v3/', '/v3/trabajo/', '/v3/trabajo/praxi/', '/v3/trabajo/combeau/', '/v3/trabajo/sesenta/', '/v3/trabajo/ocelo/',
  '/v3/trabajo/doceavo/', '/v3/trabajo/tonela/', '/v3/diagnostico/', '/v3/servicios/', '/v3/servicios/desarrollo-web/',
  '/v3/servicios/visibilidad-en-ia/', '/v3/servicios/auditoria-seo-tecnica/', '/v3/servicios/acompanamiento-mensual/',
  '/v3/servicios/redes-sociales/', '/v3/servicios/paid-media/', '/v3/metodo/', '/v3/nosotros/', '/v3/contacto/',
  '/v3/blog/', '/v3/blog/21-chequeos-visibilidad-ia/', '/v3/blog/como-aparecer-en-chatgpt/',
  '/v3/blog/como-elegir-verificar-agencia-aeo-geo-chile/', '/v3/blog/cuanto-cuesta-seo-tecnico-chile/',
  '/v3/blog/que-es-aeo-geo/', '/v3/blog/que-es-un-mini-diagnostico-seo/', '/v3/blog/seo-tecnico-fintechs-chile/',
];
// Alto de cada ancho: el de la spec §3.1 / §4.4 donde lo nombra.
export const ANCHOS = { 360: 800, 390: 844, 768: 1024, 834: 1112, 1024: 768, 1194: 834, 1440: 900, 1920: 1080 };
export const nombre = (r) => (r === '/v3/' ? 'home' : r.replace(/^\/v3\//, '').replace(/\/$/, '').replace(/\//g, '_'));

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.json': 'application/json', '.txt': 'text/plain',
  '.xml': 'application/xml' };

export async function servir(dist = join(ASTRO, 'dist'), { api } = {}) {
  const pedidos = [];
  const s = createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    if (api && u.pathname.startsWith('/api/')) return api(req, res, u);
    let f = join(dist, decodeURIComponent(u.pathname));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) { pedidos.push([404, u.pathname]); res.writeHead(404); res.end(); return; }
    const d = readFileSync(f);
    const tipo = TIPOS[extname(f)] || 'application/octet-stream';
    const r = req.headers.range;
    if (r && /^bytes=\d*-\d*$/.test(r)) {
      const [a, b] = r.slice(6).split('-'); const i = a ? +a : 0; const e = b ? Math.min(+b, d.length - 1) : d.length - 1;
      res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${i}-${e}/${d.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - i + 1 });
      res.end(d.subarray(i, e + 1)); return;
    }
    res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': d.length, 'Accept-Ranges': 'bytes' }); res.end(d);
  });
  await new Promise((r) => s.listen(0, '127.0.0.1', r));
  return { url: `http://127.0.0.1:${s.address().port}`, cerrar: () => new Promise((r) => s.close(r)), pedidos };
}

export const lanzar = (args = []) => chromium.launch({ executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required', ...args] });

// Recorre la página hasta abajo para que las entradas (inView) lleguen a su estado final, y vuelve arriba.
export async function recorrer(p) {
  await p.evaluate(async () => {
    const paso = Math.max(200, innerHeight * 0.6);
    for (let y = 0; y < document.documentElement.scrollHeight; y += paso) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 300));
    scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400));
  });
}
