#!/usr/bin/env node
// Las imágenes al compartir de /servicios/ y sus seis (senales-obra.md §1.6: «la misma plantilla: el logo arriba y el h1
// real de la página, en la letra de A; el precio de entrada cuando la página lo dice (los servicios)»). Diego, 19-oct-2026
// (tanda 4). HTML renderizado con Chromium en la letra y el negro de A, nada generado, sin el hilo de oro.
//   · El h1, en sus dos tintas, de la copia de Clara de cada página (src/data/archivo/texto/<id>.json).
//   · El precio de entrada, tal cual de los JSON: el primer plan con monto (Desarrollo web, de oferta-v3.json; los otros
//     cinco, de servicios-v3.json). /servicios/ no lleva precio: es el índice de seis, y ninguno es «el» de entrada.
// 1200 × 630, JPEG, ≤ 200 kB. Escribe en spindlelab-astro/public/assets/img/og-e12-<id>.jpg.
// Uso: node og-tanda-4.mjs
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const OBRA = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const f = (p) => pathToFileURL(p).href;
const leer = (p) => JSON.parse(readFileSync(p, 'utf8'));
const logo = readFileSync(join(OBRA, 'e12/logo/final/logo-grande-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');
const oferta = leer(join(ASTRO, 'src/data/oferta-v3.json'));
const servicios = leer(join(ASTRO, 'src/data/servicios-v3.json'));
const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const h1De = (id, clave) => {
  const copia = leer(join(ASTRO, `src/data/archivo/texto/${id}.json`)).texto;
  const e = copia.secciones.flatMap((s) => s.elementos).find((x) => x.id === clave);
  if (!e || !e.tinta) throw new Error(`og-tanda-4: falta el h1 «${clave}» en ${id}.json`);
  return e;
};
const entrada = (slug) => {
  if (slug === 'desarrollo-web') return oferta.momentos[0].planes[0].p;
  const planes = servicios[slug].secciones.find((x) => Array.isArray(x.planes)).planes;
  return planes.find((p) => p.precio.includes('$')).precio;
};
const paginas = [
  { id: 'servicios', h1: h1De('servicios', 'servicios.h1'), precio: '' },
  { id: 'desarrollo-web', h1: h1De('desarrollo-web', 'dw.h1'), precio: entrada('desarrollo-web') },
  ...['visibilidad-en-ia', 'auditoria-seo-tecnica', 'acompanamiento-mensual', 'redes-sociales', 'paid-media'].map((s) => ({
    id: s, h1: h1De(s, `${s}.h1`), precio: entrada(s),
  })),
];

const base = `
@font-face { font-family: 'GSF'; src: url('${f(join(ASTRO, 'public/fonts/google-sans-flex-latin.woff2'))}') format('woff2'); font-weight: 100 1000; font-stretch: 25% 151%; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
body { font-family: 'GSF'; color: #989898; -webkit-font-smoothing: antialiased; }
.caja { position: absolute; inset: 64px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { display: block; width: auto; height: 56px; }
.logo svg path, .logo svg g { fill: #ffffff; }
h1 { font-weight: 300; font-stretch: 76%; font-size: 64px; line-height: 1.05; letter-spacing: -0.01em; color: #989898; max-width: 1072px; text-wrap: balance; }
.tinta { color: #ffffff; }
.precio { margin-top: 24px; font-weight: 370; font-size: 28px; line-height: 1.35; color: #ffffff; }
`;
const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
for (const p of paginas) {
  const html = `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${base}</style></head><body><div class="caja">
<div class="logo">${logo}</div><div><h1><span class="tinta">${esc(p.h1.tinta)}</span> ${esc(p.h1.gris)}</h1>
${p.precio ? `<p class="precio">${esc(p.precio)}</p>` : ''}</div></div></body></html>`;
  const nombre = `og-e12-${p.id}`;
  const h = join(dir, `${nombre}.html`);
  writeFileSync(h, html);
  const ctx = await nav.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const pag = await ctx.newPage();
  await pag.goto(f(h), { waitUntil: 'load' });
  await pag.evaluate(() => document.fonts.ready);
  await pag.waitForTimeout(300);
  // Que el texto quepa: el bloque de abajo termina dentro de la caja y empieza a 40 px o más del logo
  const desborda = await pag.evaluate(() => {
    const c = document.querySelector('.caja').getBoundingClientRect();
    const logo = document.querySelector('.logo').getBoundingClientRect();
    const abajo = document.querySelector('.caja > div:last-child').getBoundingClientRect();
    return abajo.bottom > c.bottom + 0.5 || abajo.top < logo.bottom + 40;
  });
  if (desborda) throw new Error(`${nombre}: el texto no cabe en la tarjeta`);
  const png = join(dir, `${nombre}.png`);
  await pag.screenshot({ path: png });
  await ctx.close();
  const jpg = join(ASTRO, 'public/assets/img', `${nombre}.jpg`);
  execSync(`python3 -I -c "from PIL import Image; Image.open('${png}').convert('RGB').save('${jpg}', 'JPEG', quality=86, optimize=True, progressive=True)"`);
  console.log(nombre, statSync(jpg).size, 'bytes', p.precio || '(sin precio)');
}
await nav.close();
