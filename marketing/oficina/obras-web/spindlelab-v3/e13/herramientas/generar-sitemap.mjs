#!/usr/bin/env node
// Genera spindlelab-astro/public/sitemap.xml desde un dist/ construido con el sitio en la raíz (obra E13).
// Una <url> por cada index.html del build, menos /privacidad/ (como hoy: no figura en el sitemap) y la 404. Cada página del
// sitemap tiene que responder 200, no llevar noindex y declarar su propio canonical: si alguna falla, el script se detiene.
//
//   node generar-sitemap.mjs <dist> <AAAA-MM-DD> [--escribir <public/sitemap.xml>]
//
// El lastmod es el de la publicación (todas las páginas cambian de contenido). Los artículos del blog traen su propio
// dateModified en el JSON-LD (blog-v3/*.json): el sitemap y el JSON-LD tienen que decir lo mismo, así que aquí se lee el de cada
// artículo y se usa ese (el lastmod de las demás es el argumento).
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const [dist, fecha] = process.argv.slice(2);
const esc = process.argv.indexOf('--escribir');
if (!dist || !/^\d{4}-\d{2}-\d{2}$/.test(fecha ?? '')) { console.error('Uso: generar-sitemap.mjs <dist> <AAAA-MM-DD> [--escribir <archivo>]'); process.exit(2); }

const rutas = [];
(function rec(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (!['_astro', 'fonts', 'assets', 'v3', 'js'].includes(e.name)) rec(p); }
    else if (e.name === 'index.html') rutas.push('/' + relative(dist, d).replace(/\\/g, '/') + (relative(dist, d) ? '/' : ''));
  }
})(dist);
rutas.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const filas = [];
const problemas = [];
for (const r of rutas) {
  if (r === '/privacidad/') continue;
  const html = readFileSync(join(dist, r, 'index.html'), 'utf8');
  if (/name="robots"[^>]*noindex/i.test(html)) problemas.push(`${r}: tiene noindex`);
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canon !== `https://spindlelab.cl${r}`) problemas.push(`${r}: canonical «${canon}»`);
  // dateModified del artículo (JSON-LD Article) si existe
  let lastmod = fecha;
  if (r.startsWith('/blog/') && r !== '/blog/') {
    const m = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/);
    if (m) lastmod = m[1];
  }
  filas.push(`  <url><loc>https://spindlelab.cl${r}</loc><lastmod>${lastmod}</lastmod></url>`);
}
if (problemas.length) { console.error('NO SE GENERA:\n  ' + problemas.join('\n  ')); process.exit(1); }
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${filas.join('\n')}\n</urlset>\n`;
if (esc > -1) { writeFileSync(process.argv[esc + 1], xml); console.log(`escrito ${process.argv[esc + 1]}: ${filas.length} URL`); }
else process.stdout.write(xml);
