#!/usr/bin/env node
// El barrido final de toda la obra E12 sobre A (corrida 2, tanda 5), sobre el build. Diego, 19-oct-2026.
//
//   · Las rutas de A: las 27 del mapa (brief §3; senales-obra.md §2), cada una con su index.html en dist/v3/.
//   · Cero a[href^="#"] en el HTML de A (spec §5.2.4) y cero «<!--» servidos (regla del 13-oct).
//   · Ningún enlace interno roto entre las rutas de A: cada href que empieza con «/» lleva a un archivo del build, y si
//     trae fragmento, ese id existe en la página de destino.
//   · Cada página de A: un h1, noindex, un JSON-LD que parsea y sin @id repetidos, y ninguna carga el CSS de driftime
//     (spec §5.3.5: las páginas que A reemplaza dejan de importar driftime.css).
//   · Una muesca de rueda (100 px) llega al 90 % en menos de 100 ms en tres páginas, una de cada plantilla grande
//     (la home, un caso, un artículo), con el mismo método de comprobar-base.mjs (spec §5.2.4).
//   · Las maquetas a, b, c y maqueta-inicial siguen fuera (ninguna página de A las enlaza, no están en el sitemap) y con
//     noindex (brief §3).
// Lo que no repite (lo corren aparte, y su resultado va a desvios.md): npm run verificar, comparar-produccion.mjs.
// Uso: node barrido-final.mjs [--salida medidas.json]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const DIST = join(ASTRO, 'dist');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const i = process.argv.indexOf('--salida');
const SALIDA = i > 0 ? process.argv[i + 1] : null;

const MAQUETAS = ['/v3/a/', '/v3/b/', '/v3/c/', '/v3/maqueta-inicial/'];
const ARTICULOS = JSON.parse(readFileSync(join(ASTRO, 'src/data/blog-v3/_indice.json'), 'utf8')).map((p) => p.slug);
const RUTAS = [
  '/v3/', '/v3/trabajo/',
  ...['praxi', 'combeau', 'sesenta', 'ocelo', 'doceavo', 'tonela'].map((c) => `/v3/trabajo/${c}/`),
  '/v3/servicios/',
  ...['desarrollo-web', 'visibilidad-en-ia', 'auditoria-seo-tecnica', 'acompanamiento-mensual', 'redes-sociales', 'paid-media'].map((s) => `/v3/servicios/${s}/`),
  '/v3/metodo/', '/v3/diagnostico/', '/v3/nosotros/', '/v3/contacto/', '/v3/blog/',
  ...ARTICULOS.map((s) => `/v3/blog/${s}/`),
];
const archivoDe = (ruta) => join(DIST, ruta.replace(/^\//, ''), ruta.endsWith('/') ? 'index.html' : '');
const R = { rutas: RUTAS.length, paginas: {}, rueda: {}, maquetas: {}, fallas: [] };
const falla = (m) => R.fallas.push(m);

// ---- todas las páginas v3 del build: las de A y las maquetas, y nada más
const enDist = [];
const recorrer = (d, base) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) recorrer(p, `${base}${f}/`);
    else if (f === 'index.html') enDist.push(base);
  }
};
recorrer(join(DIST, 'v3'), '/v3/');
const sobran = enDist.filter((r) => !RUTAS.includes(r) && !MAQUETAS.includes(r));
const faltan = RUTAS.filter((r) => !enDist.includes(r));
R.enDist = enDist.length;
if (sobran.length) falla(`páginas v3 fuera del mapa: ${sobran}`);
if (faltan.length) falla(`rutas del mapa sin página: ${faltan}`);

// ---- el CSS de driftime: lo reconoce su clase de cuerpo y sus tokens
const cssDe = (html) => [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]).filter((h) => h.startsWith('/_astro/'));
const esDriftime = (css) => /\.d-body\b|--d-papel/.test(readFileSync(join(DIST, css), 'utf8'));

const idsDe = new Map();
const idsEn = (ruta) => {
  if (!idsDe.has(ruta)) {
    const f = archivoDe(ruta);
    idsDe.set(ruta, existsSync(f) ? new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])) : null);
  }
  return idsDe.get(ruta);
};
for (const ruta of RUTAS) {
  const html = readFileSync(archivoDe(ruta), 'utf8');
  const P = (R.paginas[ruta] = {});
  P.almohadilla = (html.match(/<a\b[^>]*\shref="#/g) || []).length;
  if (P.almohadilla) falla(`${ruta}: ${P.almohadilla} a[href^="#"]`);
  if (html.includes('<!--')) falla(`${ruta}: un comentario <!-- --> servido`);
  P.h1 = (html.match(/<h1\b/g) || []).length;
  if (P.h1 !== 1) falla(`${ruta}: ${P.h1} h1`);
  if (!html.includes('<meta name="robots" content="noindex, nofollow"')) falla(`${ruta}: sin noindex`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const ids = ld.flatMap((b) => b['@graph'] || [b]).map((n) => n['@id']).filter(Boolean);
  const rep = ids.filter((x, k) => ids.indexOf(x) !== k);
  if (rep.length) falla(`${ruta}: @id repetidos ${rep}`);
  P.driftime = cssDe(html).filter(esDriftime);
  if (P.driftime.length) falla(`${ruta}: carga el CSS de driftime (${P.driftime})`);
  // los enlaces internos
  const hrefs = [...new Set([...html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, '&')))];
  P.enlaces = hrefs.length;
  for (const href of hrefs) {
    const [conQuery, frag] = href.split('#');
    const camino = conQuery.split('?')[0];
    const f = camino.endsWith('/') ? join(DIST, camino, 'index.html') : join(DIST, camino);
    if (!existsSync(f)) { falla(`${ruta}: ${href} no existe en el build`); continue; }
    if (MAQUETAS.includes(camino)) falla(`${ruta}: enlaza una maqueta (${href})`);
    if (frag && camino.endsWith('/')) {
      const ids2 = idsEn(camino);
      if (!ids2 || !ids2.has(decodeURIComponent(frag))) falla(`${ruta}: ${href}: #${frag} no existe`);
    }
  }
}

// ---- las maquetas: con noindex, fuera del sitemap y sin enlaces desde A
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
for (const m of MAQUETAS) {
  const f = archivoDe(m);
  const html = existsSync(f) ? readFileSync(f, 'utf8') : '';
  R.maquetas[m] = { existe: !!html, noindex: html.includes('<meta name="robots" content="noindex, nofollow"'), enSitemap: sitemap.includes(m) };
  if (!R.maquetas[m].noindex || R.maquetas[m].enSitemap) falla(`${m}: ${JSON.stringify(R.maquetas[m])}`);
}
if (/\/v3\//.test(sitemap)) falla('el sitemap.xml nombra rutas /v3/');

// ---- la rueda, en tres páginas (el método de comprobar-base.mjs: una muesca de 100 px, el tiempo hasta el 90 %)
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.json': 'application/json', '.jpg': 'image/jpeg' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  const d = readFileSync(f);
  res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream', 'Content-Length': d.length }); res.end(d);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
try {
  for (const ruta of ['/v3/', '/v3/trabajo/praxi/', `/v3/blog/${ARTICULOS[0]}/`]) {
    const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto(`http://127.0.0.1:${servidor.address().port}${ruta}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.mouse.move(700, 450);
    const y0 = await p.evaluate(() => scrollY);
    const t0 = Date.now();
    await p.mouse.wheel(0, 100);
    const muestras = [];
    for (let k = 0; k < 40; k++) { muestras.push([Date.now() - t0, (await p.evaluate(() => scrollY)) - y0]); await p.waitForTimeout(10); }
    const al90 = muestras.find(([, y]) => y >= 90);
    const r = { al90ms: al90 ? al90[0] : null, final: muestras[muestras.length - 1][1] };
    if (!r.al90ms || r.al90ms >= 100) falla(`${ruta}: la rueda llega al 90 % en ${r.al90ms} ms`);
    R.rueda[ruta] = r;
    await ctx.close();
  }
} finally {
  await nav.close();
  servidor.close();
}
console.log(JSON.stringify(R, null, 1));
if (SALIDA) writeFileSync(SALIDA, JSON.stringify(R, null, 1) + '\n');
console.error(R.fallas.length ? `\n${R.fallas.length} falla(s):\n  ${R.fallas.join('\n  ')}` : '\nSin fallas.');
process.exit(R.fallas.length ? 1 : 0);
