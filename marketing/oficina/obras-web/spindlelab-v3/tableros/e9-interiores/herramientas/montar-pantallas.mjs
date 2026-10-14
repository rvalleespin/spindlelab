// montar-pantallas.mjs — pantallas del tablero E9 (Lucía, 14-oct-2026)
//
// Solo para el tablero de la compuerta: dos lecturas reales de spindlelab.cl abiertas en el
// navegador y montadas en notebook y teléfono con la escena de Bruno (e9/piezas/plantillas/
// escena.html), sobre el color del campo como fondo de estudio (Dirección 1 «Pantallas»).
//
//   N1 · robots.txt de spindlelab.cl tal como lo pinta Chromium (texto plano), crudo del 14-oct
//   N2 · el primer bloque JSON-LD de la portada de spindlelab.cl, con sangría de 2 espacios
//        (mismo JSON, solo formateado), crudo del 14-oct
//
// No captura nada de la red: abre los archivos crudos que Bruno guardó hoy
// (e9/piezas/crudo/2026-10-14/spindlelab.cl/) y anota su sha256. Si la Dirección 1 se elige,
// Bruno las rehace con su generador en la Tanda B; estas no van al sitio.
//
// Uso: node herramientas/montar-pantallas.mjs   (desde tableros/e9-interiores/)

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const PIEZAS = path.join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e9/piezas');
const CRUDO = path.join(PIEZAS, 'crudo/2026-10-14/spindlelab.cl');
const ESCENA = path.join(PIEZAS, 'plantillas/escena.html');
const SAL = path.join(AQUI, 'piezas-tablero');
const TMP = path.join(SAL, 'pantallas');
fs.mkdirSync(TMP, { recursive: true });
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const py = (...a) => JSON.parse(execFileSync('python3', ['-I', path.join(PIEZAS, 'medir.py'), ...a], { encoding: 'utf8' }));

// Campos leídos de driftime.css, como hace el generador de Bruno.
const CSS = fs.readFileSync(path.join(REPO, 'spindlelab-astro/src/styles/driftime.css'), 'utf8');
const campo = (c) => CSS.match(new RegExp(`--d-${c}:\\s*(#[0-9a-fA-F]{6})`))[1].toLowerCase();

// La fuente de N2: el primer bloque ld+json de la portada, formateado (mismo contenido).
const jl = JSON.parse(fs.readFileSync(path.join(CRUDO, 'jsonld.json'), 'utf8'));
const bloque = JSON.parse(jl.bloques[0]);
const jsonFmt = path.join(TMP, 'jsonld-portada-bloque-1.json');
fs.writeFileSync(jsonFmt, JSON.stringify(bloque, null, 2) + '\n');

const nav = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });

// 1 · las pantallas: el archivo abierto en el navegador, con zoom de lectura
async function pantalla(src, salida, { w, h, dsf, zoom }) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
  const pg = await ctx.newPage();
  await pg.goto(pathToFileURL(src).href);
  await pg.addStyleTag({ content: `body{zoom:${zoom};margin:14px 16px}` });
  await pg.waitForTimeout(150);
  await pg.screenshot({ path: salida });
  await ctx.close();
}
const P = {
  'robots-esc': [path.join(CRUDO, 'robots.txt'), { w: 1440, h: 900, dsf: 2, zoom: 1.9 }],
  'robots-cel': [path.join(CRUDO, 'robots.txt'), { w: 390, h: 844, dsf: 3, zoom: 1.25 }],
  'jsonld-esc': [jsonFmt, { w: 1440, h: 900, dsf: 2, zoom: 1.55 }],
  'jsonld-cel': [jsonFmt, { w: 390, h: 844, dsf: 3, zoom: 1.1 }],
};
for (const [id, [src, o]] of Object.entries(P)) await pantalla(src, path.join(TMP, `${id}.png`), o);

// 2 · el montaje: escena de Bruno (mockups/README.md), fondo de estudio = color del campo
const ANCHO = { w: 1600, h: 669, lx: '300px', ly: '62px', lw: '760px', tx: '1110px', ty: '120px', tw: '220px', suelo: '1' };   // 2,39, la cabecera a sangre
const CUATRO_TERCIOS = { w: 1600, h: 1200, lx: '150px', ly: '215px', lw: '1120px', tx: '1120px', ty: '420px', tw: '310px', suelo: '1' }; // = p1 de Bruno
const MONTAJES = [
  { id: 'n1-robots-petroleo-ancho', pant: 'robots', campo: 'petroleo', ...ANCHO },
  { id: 'n1-robots-petroleo', pant: 'robots', campo: 'petroleo', ...CUATRO_TERCIOS },
  { id: 'n2-jsonld-petroleo', pant: 'jsonld', campo: 'petroleo', ...CUATRO_TERCIOS },
  { id: 'n2-jsonld-brasa', pant: 'jsonld', campo: 'brasa', ...CUATRO_TERCIOS },
];
const hechas = [];
for (const m of MONTAJES) {
  const q = new URLSearchParams({ ...Object.fromEntries(Object.entries(m).filter(([k]) => !['id', 'pant', 'campo'].includes(k)).map(([k, v]) => [k, typeof v === 'number' ? v + 'px' : String(v)])),
    fondo: campo(m.campo), esc: pathToFileURL(path.join(TMP, `${m.pant}-esc.png`)).href, cel: pathToFileURL(path.join(TMP, `${m.pant}-cel.png`)).href,
    barra: '#ffffff', tinta: '#000000', hora: '' });
  const ctx = await nav.newContext({ viewport: { width: m.w, height: m.h }, deviceScaleFactor: 2 });
  const pg = await ctx.newPage();
  await pg.goto(pathToFileURL(ESCENA).href + '?' + q.toString());
  await pg.waitForLoadState('networkidle');
  await pg.evaluate(() => document.fonts.ready);
  const png = path.join(TMP, `${m.id}.png`);
  await pg.screenshot({ path: png });
  await ctx.close();
  const jpg = path.join(SAL, `${m.id}.jpg`);   // el PNG 2x queda en pantallas/ solo mientras se mide; no se versiona
  const dim = py('jpg', png, jpg, '1600');
  hechas.push({ id: m.id, archivo: path.relative(AQUI, jpg), ...dim, campo: m.campo, fondo: campo(m.campo), oro_png: py('oro', png), oro_jpg: py('oro', jpg) });
  console.log(m.id, dim, 'oro', hechas.at(-1).oro_jpg.pct + '%');
}
await nav.close();

const ahora = new Date();
fs.writeFileSync(path.join(SAL, 'manifiesto-tablero.json'), JSON.stringify({
  obra: 'E9 · tablero de la compuerta (Lucía)', hecho_utc: ahora.toISOString(),
  regla: 'Solo para el tablero. No van al sitio: si se elige la Dirección 1, Bruno las rehace con su generador (Tanda B).',
  fuentes: {
    robots: { url: 'https://spindlelab.cl/robots.txt', crudo: 'e9/piezas/crudo/2026-10-14/spindlelab.cl/robots.txt', sha256: sha(path.join(CRUDO, 'robots.txt')), capturado_chile: '2026-10-14T19:29:42-03:00' },
    jsonld: { url: 'https://spindlelab.cl/', crudo: 'e9/piezas/crudo/2026-10-14/spindlelab.cl/jsonld.json (bloques[0], formateado con sangría de 2)', sha256: sha(path.join(CRUDO, 'jsonld.json')), capturado_chile: '2026-10-14T19:29:43-03:00' },
  },
  escena: 'e9/piezas/plantillas/escena.html (Bruno), sin hora en la barra del teléfono: la pantalla es el crudo abierto, no una captura con hora',
  variantes_de_bruno: [
    { id: 'l1-robots-spindlelab--petroleo', como: 'node generar.mjs --sin-captura --solo=l1,l4 --campo=l1:petroleo,l4:brasa, corrido en una copia del generador en el scratchpad (no se tocó e9/piezas/)', oro_jpg_pct: 0, contraste_min: 5.03 },
    { id: 'l4-21-chequeos--brasa', como: 'ídem', oro_png_pct: 0.044, oro_jpg_pct: 0.0051, contraste_min: 4.7 },
  ],
  montajes: hechas,
}, null, 1));
