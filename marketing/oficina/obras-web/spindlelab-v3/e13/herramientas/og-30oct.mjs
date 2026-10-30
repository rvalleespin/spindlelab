#!/usr/bin/env node
// Las imágenes al compartir de las tres páginas que cambian de titular el 30-oct (Ramón): la home (og-e12-marca.jpg),
// /nosotros/ y /contacto/. Diego, 30-oct-2026. Sube a ?v=3 en index.astro y en interiores.mjs (OG_V).
// La plantilla es la de E13 (og-tanda-2.mjs y og-tanda-5.mjs de E12, rehechas el 26-oct con el h1 nuevo): el negro de A,
// Google Sans Flex y DM Mono locales, el logo arriba y abajo el titular real de la página en sus tintas; la home lleva
// además su rótulo en mono. Nada generado, sin el hilo de oro.
// Lo que cambia el 30-oct:
//   · el texto, que se lee de las copias de Clara (src/data/archivo/texto/<id>.json), nunca escrito aquí;
//   · el logo: la opción 2 de Ramón, «la i con su disco», en el corte MENÚ de Bruno (e13/logo/logo-menu-blanco.svg, su
//     caja justa), como pide la spec §5.4 (el mismo dibujo del encabezado). Va a 50,4 px de alto: las letras miden lo
//     mismo que en las otras tarjetas del sitio (mayúscula de 38 px; la caja justa, 132,32 unidades, es más baja que la
//     de El huso, 147,01), y no a los 39 px de la spec. Una tarjeta se ve a la mitad en los feeds (LinkedIn, ~600 px de
//     ancho): el logo queda a unos 25 px, dentro del corte menú (18 a 39). El corte grande a ese tamaño se lee «Spīndle»
//     (lo miré: e13/medicion-30oct/og-logo-corte.jpg). Desvío declarado en e13/desvios/construccion-30oct.md.
// 1200 × 630, JPEG ≤ 200 kB (el Layout declara image/jpeg). Escribe en spindlelab-astro/public/assets/img/.
// Uso: node og-30oct.mjs [ruta del chrome]   (por defecto, el Chromium de Playwright de /opt/pw-browsers)
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const OBRA = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3');
const CHROME = process.argv[2] || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const f = (p) => pathToFileURL(p).href;
const leer = (p) => JSON.parse(readFileSync(p, 'utf8'));
const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const logo = readFileSync(join(OBRA, 'e13/logo/logo-menu-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');

const el = (id, clave) => {
  const copia = leer(join(ASTRO, `src/data/archivo/texto/${id}.json`)).texto;
  const e = copia.secciones.flatMap((s) => s.elementos).find((x) => x.id === clave);
  if (!e) throw new Error(`og-30oct: falta «${clave}» en ${id}.json`);
  return e;
};
const h1De = (id, clave) => {
  const e = el(id, clave);
  return e.tinta ? { tinta: e.tinta, gris: e.gris || '' } : { tinta: e.texto, gris: '' };
};
const paginas = [
  { nombre: 'og-e12-marca', rotulo: el('home', 'home.portada.rotulo').texto, h1: h1De('home', 'home.portada.h1') },
  { nombre: 'og-e12-nosotros', h1: h1De('nosotros', 'nosotros.h1') },
  { nombre: 'og-e12-contacto', h1: h1De('contacto', 'contacto.h1') },
];

const base = `
@font-face { font-family: 'GSF'; src: url('${f(join(ASTRO, 'public/fonts/google-sans-flex-latin.woff2'))}') format('woff2'); font-weight: 100 1000; font-stretch: 25% 151%; }
@font-face { font-family: 'DMM'; src: url('${f(join(ASTRO, 'public/fonts/dm-mono-500-latin.woff2'))}') format('woff2'); font-weight: 500; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
body { font-family: 'GSF'; color: #989898; -webkit-font-smoothing: antialiased; }
.caja { position: absolute; inset: 64px; display: flex; flex-direction: column; justify-content: space-between; }
/* 50,4 px: la caja justa del corte menú de Bruno (132,32 unidades) es más baja que la de El huso (147,01, que reservaba la
   tortera); a 56 × 132,32 / 147,01 las letras miden lo mismo que en las otras tarjetas del sitio (mayúscula de 38 px) */
.logo svg { display: block; width: auto; height: 50.4px; }
.logo svg path, .logo svg g, .logo svg ellipse { fill: #ffffff; }
.rotulo { font-family: 'DMM'; font-weight: 500; font-size: 18px; line-height: 1.25; letter-spacing: 0.03em; text-transform: uppercase; color: #989898; margin-bottom: 24px; }
h1 { font-weight: 300; font-stretch: 76%; font-size: 64px; line-height: 1.05; letter-spacing: -0.01em; color: #989898; max-width: 1072px; text-wrap: balance; }
.tinta { color: #ffffff; }
`;
const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
for (const p of paginas) {
  const html = `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${base}</style></head><body><div class="caja">
<div class="logo">${logo}</div><div>${p.rotulo ? `<p class="rotulo">${esc(p.rotulo)}</p>` : ''}<h1><span class="tinta">${esc(p.h1.tinta)}</span>${p.h1.gris ? ` ${esc(p.h1.gris)}` : ''}</h1></div></div></body></html>`;
  const h = join(dir, `${p.nombre}.html`);
  writeFileSync(h, html);
  const ctx = await nav.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const pag = await ctx.newPage();
  await pag.goto(f(h), { waitUntil: 'load' });
  await pag.evaluate(() => document.fonts.ready);
  await pag.waitForTimeout(300);
  const m = await pag.evaluate(() => {
    const c = document.querySelector('.caja').getBoundingClientRect();
    const logo = document.querySelector('.logo svg').getBoundingClientRect();
    const abajo = document.querySelector('.caja > div:last-child').getBoundingClientRect();
    const fuentes = [...document.fonts].filter((x) => x.status === 'loaded').map((x) => x.family);
    return { desborda: abajo.bottom > c.bottom + 0.5 || abajo.top < logo.bottom + 40, logoAlto: logo.height, logoAncho: logo.width, fuentes };
  });
  if (m.desborda) throw new Error(`${p.nombre}: el texto no cabe en la tarjeta`);
  if (!m.fuentes.includes('GSF') || (p.rotulo && !m.fuentes.includes('DMM'))) throw new Error(`${p.nombre}: no cargó la letra (${m.fuentes})`);
  const png = join(dir, `${p.nombre}.png`);
  await pag.screenshot({ path: png });
  await ctx.close();
  const jpg = join(ASTRO, 'public/assets/img', `${p.nombre}.jpg`);
  execSync(`python3 -I -c "from PIL import Image; Image.open('${png}').convert('RGB').save('${jpg}', 'JPEG', quality=86, optimize=True, progressive=True)"`);
  const peso = statSync(jpg).size;
  if (peso > 200 * 1024) throw new Error(`${p.nombre}: pesa ${peso} bytes, sobre 200 kB`);
  console.log(p.nombre, peso, 'bytes', `logo ${m.logoAncho.toFixed(1)} × ${m.logoAlto.toFixed(1)} px`);
}
await nav.close();
