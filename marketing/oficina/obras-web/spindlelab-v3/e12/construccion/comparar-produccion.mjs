#!/usr/bin/env node
// Línea base de producción y su comparación (obra E12, corrida 2).
//
// Producción, para esta obra, es todo lo que `astro build` deja en `dist/` FUERA de `dist/v3/`:
// las dos páginas que construye Astro (`/` y `/nosotros/`), las que se copian de `public/`
// (blog, servicios, método, diagnóstico, contacto, privacidad, 404) y todos los archivos que
// esas páginas sirven. La regla de la obra (brief §6.7, spec §6.16 y la fila del 19-oct de su
// §7) es que salgan IGUALES BYTE A BYTE antes y después de cada tanda.
//
// Uso (desde cualquier carpeta):
//   node comparar-produccion.mjs --guardar   guarda la línea base del dist/ de hoy (solo la tanda 1)
//   node comparar-produccion.mjs             compara el dist/ de hoy contra la línea base
//   opciones: --dist <carpeta>   (por defecto spindlelab-astro/dist del repo)
//
// Qué compara, y por qué así:
//   1. Cada archivo de la línea base fuera de `v3/` y de `_astro/`: mismo md5. Si es un HTML y
//      cambió, muestra las primeras líneas distintas contra la copia guardada en `base-dist/html/`.
//   2. `_astro/` es compartido con las páginas de /v3/ (Vite pone ahí los paquetes de TODAS las
//      páginas, con un hash en el nombre). Lo que se exige es lo que las páginas de producción
//      CARGAN: los archivos de `_astro/` que su HTML referencia, y los que esos archivos importan,
//      con el mismo nombre y el mismo md5. Que aparezca o desaparezca un paquete que solo usa /v3/
//      no es un cambio de producción.
//   3. Un HTML nuevo fuera de `v3/` es una ruta nueva fuera del mapa del brief §3: falla.
//      Cualquier otro archivo nuevo fuera de `v3/` y `_astro/` (p. ej. una letra en `fonts/`) se
//      lista como nuevo, sin fallar: no cambia lo que sirve ninguna página publicada.
// Sale con código 1 si hay diferencias.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const BASE = join(AQUI, 'base-dist');

const args = process.argv.slice(2);
const guardar = args.includes('--guardar');
const iDist = args.indexOf('--dist');
const DIST = iDist >= 0 ? args[iDist + 1] : join(REPO, 'spindlelab-astro', 'dist');

if (!existsSync(DIST)) {
  console.error(`No existe ${DIST}: corre primero npm run build en spindlelab-astro/.`);
  process.exit(2);
}

const md5 = (ruta) => createHash('md5').update(readFileSync(ruta)).digest('hex');

function listar(dir, base = dir, fuera = []) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    const rel = relative(base, ruta).split('\\').join('/');
    if (rel === 'v3' || rel.startsWith('v3/')) continue;
    if (statSync(ruta).isDirectory()) listar(ruta, base, fuera);
    else fuera.push(rel);
  }
  return fuera.sort();
}

// Archivos de _astro/ que carga un HTML, y los que esos importan (JS: import "./x.js"; CSS: url()).
function astroCargados(dist, htmls) {
  const vistos = new Set();
  const pendientes = [];
  for (const h of htmls) {
    const txt = readFileSync(join(dist, h), 'utf8');
    for (const m of txt.matchAll(/\/_astro\/([A-Za-z0-9_.\-]+)/g)) pendientes.push(`_astro/${m[1]}`);
  }
  while (pendientes.length) {
    const rel = pendientes.pop();
    if (vistos.has(rel)) continue;
    vistos.add(rel);
    const ruta = join(dist, rel);
    if (!existsSync(ruta) || !/\.(js|css|mjs)$/.test(rel)) continue;
    const txt = readFileSync(ruta, 'utf8');
    for (const m of txt.matchAll(/(?:from\s*|import\s*\(?\s*)["']\.\/([A-Za-z0-9_.\-]+)["']/g)) pendientes.push(`_astro/${m[1]}`);
    for (const m of txt.matchAll(/\/_astro\/([A-Za-z0-9_.\-]+)/g)) pendientes.push(`_astro/${m[1]}`);
  }
  return [...vistos].sort();
}

function foto(dist) {
  const archivos = listar(dist);
  const htmls = archivos.filter((a) => a.endsWith('.html'));
  const md5s = {};
  for (const a of archivos) md5s[a] = md5(join(dist, a));
  return { archivos, htmls, md5s, astro: astroCargados(dist, htmls) };
}

const ahora = foto(DIST);

if (guardar) {
  if (existsSync(BASE)) rmSync(BASE, { recursive: true });
  mkdirSync(join(BASE, 'html'), { recursive: true });
  for (const h of ahora.htmls) {
    const destino = join(BASE, 'html', h);
    mkdirSync(dirname(destino), { recursive: true });
    writeFileSync(destino, readFileSync(join(DIST, h)));
  }
  for (const a of ahora.astro) {
    const destino = join(BASE, 'astro-cargado', posix.basename(a));
    mkdirSync(dirname(destino), { recursive: true });
    writeFileSync(destino, readFileSync(join(DIST, a)));
  }
  let commit = '';
  try { commit = execSync('git rev-parse --short HEAD', { cwd: REPO }).toString().trim(); } catch {}
  const manifiesto = {
    queEs: 'Línea base de producción: dist/ fuera de v3/, tras npm run build en spindlelab-astro/ antes de construir A (E12, corrida 2, tanda 1).',
    commit,
    guardado: new Date().toISOString(),
    totalArchivos: ahora.archivos.length,
    html: ahora.htmls,
    astroCargadoPorProduccion: Object.fromEntries(ahora.astro.map((a) => [a, ahora.md5s[a] ?? null])),
    md5: ahora.md5s,
  };
  writeFileSync(join(BASE, 'manifiesto.json'), JSON.stringify(manifiesto, null, 2) + '\n');
  console.log(`Línea base guardada en ${relative(REPO, BASE)}: ${ahora.archivos.length} archivos, ${ahora.htmls.length} HTML, ${ahora.astro.length} de _astro/ cargados por producción (commit ${commit}).`);
  process.exit(0);
}

if (!existsSync(join(BASE, 'manifiesto.json'))) {
  console.error('No hay línea base: corre con --guardar en el estado anterior a la obra.');
  process.exit(2);
}
const base = JSON.parse(readFileSync(join(BASE, 'manifiesto.json'), 'utf8'));
const fallas = [];
const nuevos = [];

// 1. Lo de la base fuera de _astro/
for (const [a, m] of Object.entries(base.md5)) {
  if (a.startsWith('_astro/')) continue;
  if (!(a in ahora.md5s)) { fallas.push(`FALTA     ${a}`); continue; }
  if (ahora.md5s[a] !== m) {
    fallas.push(`CAMBIÓ    ${a}`);
    if (a.endsWith('.html')) {
      const antes = readFileSync(join(BASE, 'html', a), 'utf8').split('\n');
      const despues = readFileSync(join(DIST, a), 'utf8').split('\n');
      let mostradas = 0;
      for (let i = 0; i < Math.max(antes.length, despues.length) && mostradas < 3; i++) {
        if (antes[i] !== despues[i]) {
          mostradas++;
          fallas.push(`          línea ${i + 1}\n          - ${(antes[i] ?? '').slice(0, 300)}\n          + ${(despues[i] ?? '').slice(0, 300)}`);
        }
      }
    }
  }
}

// 2. Lo de _astro/ que carga producción
const baseAstro = base.astroCargadoPorProduccion;
const nombresBase = Object.keys(baseAstro).sort();
if (JSON.stringify(nombresBase) !== JSON.stringify(ahora.astro)) {
  fallas.push(`_ASTRO    producción carga otros archivos:\n          antes: ${nombresBase.join(', ')}\n          ahora: ${ahora.astro.join(', ')}`);
}
for (const a of nombresBase) {
  if (a in ahora.md5s && ahora.md5s[a] !== baseAstro[a]) fallas.push(`CAMBIÓ    ${a}`);
}

// 3. Lo nuevo fuera de v3/ y _astro/
for (const a of ahora.archivos) {
  if (a.startsWith('_astro/') || a in base.md5) continue;
  if (a.endsWith('.html')) fallas.push(`RUTA NUEVA fuera de /v3/: ${a}`);
  else nuevos.push(a);
}

console.log(`Comparado ${relative(REPO, DIST) || DIST} contra la línea base del commit ${base.commit} (${base.guardado}).`);
console.log(`Producción: ${base.html.length} HTML, ${Object.keys(base.md5).filter((a) => !a.startsWith('_astro/')).length} archivos fuera de _astro/, ${nombresBase.length} de _astro/ que cargan sus páginas.`);
if (nuevos.length) console.log(`Nuevos fuera de v3/ (no cambian ninguna página publicada):\n  ${nuevos.join('\n  ')}`);
if (fallas.length) {
  console.log(`\nDIFERENCIAS (${fallas.length}):\n${fallas.join('\n')}`);
  process.exit(1);
}
console.log('\nIguales byte a byte: ninguna página publicada ni archivo que sirvan cambió.');
