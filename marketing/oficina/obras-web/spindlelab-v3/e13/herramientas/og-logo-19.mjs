#!/usr/bin/env node
// Las otras 19 imágenes al compartir, con el logo de la i con su disco (acta de QA del 30-oct, mayor 2: seguían con El
// huso, la i cruzada que Ramón descartó, mientras el encabezado, el favicon y las tres tarjetas del 30-oct ya llevaban la
// opción 2; spec-visual.md §5.4: un logo distinto en el encabezado y en la tarjeta es un defecto). Diego, 30-oct-2026.
//
// No cambia ninguna plantilla: es la de cada tanda de E12, rehecha en E13, con un solo cambio, el logo.
//   · Las 17 de texto (método, diagnóstico, blog y sus siete artículos, servicios y sus seis): og-tanda-4.mjs (servicios,
//     con el precio de entrada) y og-tanda-5.mjs (el resto). El h1 en sus dos tintas sale de las copias de Clara
//     (src/data/archivo/texto/<id>.json); el de cada artículo, del HTML publicado (src/data/blog-v3/<slug>.html, el que
//     lee blog.mjs). El precio, de oferta-v3.json y servicios-v3.json, como en og-tanda-4.mjs.
//   · Las 2 de imagen: /trabajo/ (og-trabajo.mjs de E13: Combeau y Verifica y Cumple) y Combeau (og-tanda-3.mjs).
// El logo: el corte MENÚ de Bruno (e13/logo/logo-menu-blanco.svg), el mismo de og-30oct.mjs, a la altura que deja las
// letras del mismo tamaño que tenían con El huso (su caja, 147,01 unidades, reservaba la tortera; la del corte menú mide
// 132,32): 56 px de El huso → 50,4 px en las de texto (como las tres del 30-oct) y 40 px → 36,0 px en las de imagen.
// 1200 × 630, JPEG ≤ 200 kB (el Layout declara image/jpeg). Escribe en spindlelab-astro/public/assets/img/.
// Después hay que subir el ?v= de cada una (interiores.mjs, blog.mjs, casos.mjs, servicios/*.astro, trabajo/index.astro).
// Uso: node og-logo-19.mjs [ruta del chrome]   (por defecto, el Chromium de Playwright de /opt/pw-browsers)
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
const plano = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const logo = readFileSync(join(OBRA, 'e13/logo/logo-menu-blanco.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');
const CAJA_HUSO = 147.01;
const CAJA_MENU = 132.32;
const alto = (huso) => Math.round((huso * CAJA_MENU) / CAJA_HUSO * 10) / 10; // 56 → 50,4 · 40 → 36,0

const h1De = (id, clave) => {
  const copia = leer(join(ASTRO, `src/data/archivo/texto/${id}.json`)).texto;
  const e = copia.secciones.flatMap((s) => s.elementos).find((x) => x.id === clave);
  if (!e || !e.tinta) throw new Error(`og-logo-19: falta el h1 «${clave}» en ${id}.json`);
  return { tinta: e.tinta, gris: e.gris || '' };
};
const oferta = leer(join(ASTRO, 'src/data/oferta-v3.json'));
const servicios = leer(join(ASTRO, 'src/data/servicios-v3.json'));
const entrada = (slug) => {
  if (slug === 'desarrollo-web') return oferta.momentos[0].planes[0].p;
  const planes = servicios[slug].secciones.find((x) => Array.isArray(x.planes)).planes;
  return planes.find((p) => p.precio.includes('$')).precio;
};
const indice = leer(join(ASTRO, 'src/data/blog-v3/_indice.json'));
const h1Articulo = (slug) => plano(readFileSync(join(ASTRO, `src/data/blog-v3/${slug}.html`), 'utf8').match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);

const texto = [
  { nombre: 'og-e12-metodo', h1: h1De('metodo', 'metodo.h1') },
  { nombre: 'og-e12-diagnostico', h1: h1De('diagnostico', 'diagnostico.h1') },
  { nombre: 'og-e12-blog', h1: h1De('blog', 'blog.h1') },
  ...indice.map((p) => ({ nombre: `og-e12-blog-${p.slug}`, h1: { tinta: h1Articulo(p.slug), gris: '' } })),
  { nombre: 'og-e12-servicios', h1: h1De('servicios', 'servicios.h1') },
  { nombre: 'og-e12-desarrollo-web', h1: h1De('desarrollo-web', 'dw.h1'), precio: entrada('desarrollo-web') },
  ...['visibilidad-en-ia', 'auditoria-seo-tecnica', 'acompanamiento-mensual', 'redes-sociales', 'paid-media'].map((s) => ({
    nombre: `og-e12-${s}`, h1: h1De(s, `${s}.h1`), precio: entrada(s),
  })),
];

const letras = `
@font-face { font-family: 'GSF'; src: url('${f(join(ASTRO, 'public/fonts/google-sans-flex-latin.woff2'))}') format('woff2'); font-weight: 100 1000; font-stretch: 25% 151%; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
body { font-family: 'GSF'; color: #989898; -webkit-font-smoothing: antialiased; }
.logo svg { display: block; width: auto; }
.logo svg path, .logo svg g, .logo svg ellipse { fill: #ffffff; }
`;
const deTexto = (p) => `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${letras}
.caja { position: absolute; inset: 64px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { height: ${alto(56)}px; }
h1 { font-weight: 300; font-stretch: 76%; font-size: 64px; line-height: 1.05; letter-spacing: -0.01em; color: #989898; max-width: 1072px; text-wrap: balance; }
.tinta { color: #ffffff; }
.precio { margin-top: 24px; font-weight: 370; font-size: 28px; line-height: 1.35; color: #ffffff; }
</style></head><body><div class="caja"><div class="logo">${logo}</div><div><h1><span class="tinta">${esc(p.h1.tinta)}</span>${p.h1.gris ? ` ${esc(p.h1.gris)}` : ''}</h1>
${p.precio ? `<p class="precio">${esc(p.precio)}</p>` : ''}</div></div></body></html>`;

const M = join(ASTRO, 'public/v3/medios');
const deImagen = (imagenes) => `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${letras}
.caja { position: absolute; inset: 48px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { height: ${alto(40)}px; }
.fila { display: flex; gap: 8px; align-items: flex-end; }
img { display: block; border-radius: 6px; object-fit: cover; }
</style></head><body><div class="caja"><div class="logo">${logo}</div><div class="fila">${imagenes}</div></div></body></html>`;
const imagen = [
  // og-trabajo.mjs (E13): las dos entradas del índice, recortadas a los lados al marco de 548 × 446
  { nombre: 'og-e12-trabajo', html: deImagen(`<img style="width:548px;height:446px" src="${f(join(M, 'combeau-fotografia-169.webp'))}"><img style="width:548px;height:446px" src="${f(join(M, 'verifica-y-cumple-12-169.webp'))}">`) },
  // og-tanda-3.mjs (E12): la portada del sitio de fotografía de Combeau, 16:9, 446 de alto
  { nombre: 'og-e12-combeau', html: deImagen(`<img style="height:446px;width:${Math.round((446 * 16) / 9)}px" src="${f(join(ASTRO, 'public/v3/trabajo/combeau/combeau-fotografia-169.webp'))}">`) },
];

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
const hacer = async (nombre, html, conTexto) => {
  const h = join(dir, `${nombre}.html`);
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
    const imgs = [...document.images].map((i) => i.complete && i.naturalWidth > 0);
    const fuentes = [...document.fonts].filter((x) => x.status === 'loaded').map((x) => x.family);
    return { desborda: abajo.bottom > c.bottom + 0.5 || abajo.top < logo.bottom + 40, logoAlto: logo.height, logoAncho: logo.width, imgs, fuentes };
  });
  if (m.desborda) throw new Error(`${nombre}: el contenido no cabe en la tarjeta`);
  if (conTexto && !m.fuentes.includes('GSF')) throw new Error(`${nombre}: no cargó la letra`);
  if (m.imgs.some((x) => !x)) throw new Error(`${nombre}: una imagen no cargó`);
  const png = join(dir, `${nombre}.png`);
  await pag.screenshot({ path: png });
  await ctx.close();
  const jpg = join(ASTRO, 'public/assets/img', `${nombre}.jpg`);
  execSync(`python3 -I -c "from PIL import Image; Image.open('${png}').convert('RGB').save('${jpg}', 'JPEG', quality=86, optimize=True, progressive=True)"`);
  const peso = statSync(jpg).size;
  if (peso > 200 * 1024) throw new Error(`${nombre}: pesa ${peso} bytes, sobre 200 kB`);
  console.log(nombre.padEnd(56), String(peso).padStart(6), 'bytes', `logo ${m.logoAncho.toFixed(1)} × ${m.logoAlto.toFixed(1)} px`);
};
for (const p of texto) await hacer(p.nombre, deTexto(p), true);
for (const p of imagen) await hacer(p.nombre, p.html, false);
await nav.close();
console.log(`${texto.length + imagen.length} tarjetas`);
