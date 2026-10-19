#!/usr/bin/env node
// Las imágenes al compartir de la tanda 5 (senales-obra.md §1.6). Diego, 19-oct-2026. HTML renderizado con Chromium en
// la letra y el negro de A, nada generado, sin el hilo de oro.
//   · /metodo/, /diagnostico/, /contacto/ y /blog/: «la misma plantilla: el logo arriba y el h1 real de la página»
//     (og-tanda-4.mjs, sin precio), con el h1 en sus dos tintas de la copia de Clara.
//   · Los siete artículos: la misma plantilla con su headline (Simón §2.9: «cada uno, su tarjeta de la plantilla con su
//     headline»), en una tinta, como su h1.
//   · /nosotros/: «su retrato real (proto/a/medios/ramon-vallejos-34.webp, el de nosotros.astro) y su nombre».
// 1200 × 630, JPEG, ≤ 200 kB. Escribe en spindlelab-astro/public/assets/img/og-e12-<id>.jpg.
// Uso: node og-tanda-5.mjs
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
const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const plano = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

const h1De = (id, clave) => {
  const copia = leer(join(ASTRO, `src/data/archivo/texto/${id}.json`)).texto;
  const e = copia.secciones.flatMap((s) => s.elementos).find((x) => x.id === clave);
  if (!e || !e.tinta) throw new Error(`og-tanda-5: falta el h1 «${clave}» en ${id}.json`);
  return e;
};
// el h1 de cada artículo, del HTML publicado (el mismo que lee blog.mjs)
const indice = leer(join(ASTRO, 'src/data/blog-v3/_indice.json'));
const h1Articulo = (slug) => {
  const html = readFileSync(join(ASTRO, `src/data/blog-v3/${slug}.html`), 'utf8');
  return plano(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);
};
const paginas = [
  { id: 'metodo', h1: h1De('metodo', 'metodo.h1') },
  { id: 'diagnostico', h1: h1De('diagnostico', 'diagnostico.h1') },
  { id: 'contacto', h1: h1De('contacto', 'contacto.h1') },
  { id: 'blog', h1: h1De('blog', 'blog.h1') },
  ...indice.map((p) => ({ id: `blog-${p.slug}`, h1: { tinta: h1Articulo(p.slug), gris: '' } })),
];

const base = `
@font-face { font-family: 'GSF'; src: url('${f(join(ASTRO, 'public/fonts/google-sans-flex-latin.woff2'))}') format('woff2'); font-weight: 100 1000; font-stretch: 25% 151%; }
@font-face { font-family: 'DMM'; src: url('${f(join(ASTRO, 'public/fonts/dm-mono-500-latin.woff2'))}') format('woff2'); font-weight: 500; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; background: #060606; overflow: hidden; }
body { font-family: 'GSF'; color: #989898; -webkit-font-smoothing: antialiased; }
.caja { position: absolute; inset: 64px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { display: block; width: auto; height: 56px; }
.logo svg path, .logo svg g { fill: #ffffff; }
h1 { font-weight: 300; font-stretch: 76%; font-size: 64px; line-height: 1.05; letter-spacing: -0.01em; color: #989898; max-width: 1072px; text-wrap: balance; }
.tinta { color: #ffffff; }
.retrato { position: absolute; top: 64px; right: 64px; bottom: 64px; aspect-ratio: 3 / 4; border-radius: 6px; overflow: hidden; background: #141414; }
.retrato img { width: 100%; height: 100%; object-fit: cover; display: block; }
.con-retrato .caja { right: calc(64px + 377px + 48px); }
.rotulo { margin-top: 16px; font-family: 'DMM'; font-weight: 500; font-size: 20px; letter-spacing: 0.03em; text-transform: uppercase; color: #989898; }
`;
const dir = mkdtempSync(join(tmpdir(), 'og-'));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const hacer = async (nombre, html) => {
  const h = join(dir, `${nombre}.html`);
  writeFileSync(h, html);
  const ctx = await nav.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const pag = await ctx.newPage();
  await pag.goto(f(h), { waitUntil: 'load' });
  await pag.evaluate(() => document.fonts.ready);
  await pag.waitForTimeout(300);
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
  const peso = statSync(jpg).size;
  if (peso > 200 * 1024) throw new Error(`${nombre}: pesa ${peso} bytes, sobre 200 kB`);
  console.log(nombre, peso, 'bytes');
};
for (const p of paginas) {
  await hacer(`og-e12-${p.id}`, `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${base}</style></head><body><div class="caja">
<div class="logo">${logo}</div><div><h1><span class="tinta">${esc(p.h1.tinta)}</span>${p.h1.gris ? ` ${esc(p.h1.gris)}` : ''}</h1></div></div></body></html>`);
}
// /nosotros/: el retrato a la derecha, 3:4, y el nombre con su rol corto de Clara (texto/blog.json, «articulo.autor»:
// «Ramón Vallejos · Fundador de SpindleLab», el mismo que dice el alt de Simón)
const autor = leer(join(ASTRO, 'src/data/archivo/texto/blog.json')).texto.secciones.flatMap((s) => s.elementos).find((e) => e.id === 'articulo.autor').texto;
const [nombre, cargo] = autor.split(' · ');
const retrato = join(ASTRO, 'public/v3/medios/ramon-vallejos-34.webp');
await hacer('og-e12-nosotros', `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><style>${base}</style></head><body class="con-retrato">
<div class="retrato"><img src="${f(retrato)}" alt=""></div><div class="caja"><div class="logo">${logo}</div><div><h1><span class="tinta">${esc(nombre)}</span></h1><p class="rotulo">${esc(cargo)}</p></div></div></body></html>`);
await nav.close();
