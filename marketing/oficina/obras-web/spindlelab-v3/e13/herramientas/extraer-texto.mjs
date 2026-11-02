#!/usr/bin/env node
// El texto de Clara, tal cual, para las páginas del v3 (obra E13). Misma idea que e12/construccion/herramientas/extraer-texto.mjs,
// con una diferencia: la fuente ya no es un solo texto-obra.json de 289 kB sino una carpeta con un .json por página
// (e13/texto/<id>.json y comun.json), para que varias personas editen páginas distintas sin pisarse.
//
// Copia, SIN CAMBIAR UNA LETRA, el objeto de cada página pedida (y «comun») a
// spindlelab-astro/src/data/archivo/texto/<id>.json, con el sha256 del archivo de origen. Las páginas lo leen con
// src/data/archivo/texto.mjs, que falla el build si un id no existe.
//
// Uso (desde cualquier carpeta):
//   node extraer-texto.mjs home trabajo     copia esas páginas y «comun»
//   node extraer-texto.mjs --todo           copia todas las páginas que tienen fuente
//   node extraer-texto.mjs --comprobar      compara cada copia con su fuente; sale con 1 si alguna difiere
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const FUENTE_REL = 'marketing/oficina/obras-web/spindlelab-v3/e13/texto';
const FUENTE = join(REPO, FUENTE_REL);
const DESTINO = join(REPO, 'spindlelab-astro/src/data/archivo/texto');

const leer = (id) => {
  const ruta = join(FUENTE, `${id}.json`);
  if (!existsSync(ruta)) throw new Error(`No hay fuente de texto para «${id}» (${FUENTE_REL}/${id}.json)`);
  const crudo = readFileSync(ruta);
  return { rel: `${FUENTE_REL}/${id}.json`, sha: createHash('sha256').update(crudo).digest('hex'), obj: JSON.parse(crudo.toString('utf8')) };
};
const ids = () => readdirSync(FUENTE).filter((f) => f.endsWith('.json') && !f.startsWith('convenciones')).map((f) => f.replace(/\.json$/, ''));

const args = process.argv.slice(2);
if (args.includes('--comprobar')) {
  let mal = 0;
  const fuentes = new Set(ids());
  for (const f of readdirSync(DESTINO).filter((f) => f.endsWith('.json'))) {
    const copia = JSON.parse(readFileSync(join(DESTINO, f), 'utf8'));
    if (!fuentes.has(copia.id)) { console.log(`SIN FUENTE ${f}`); mal++; continue; }
    const o = leer(copia.id);
    const igual = JSON.stringify(copia.texto) === JSON.stringify(o.obj) && copia.sha256 === o.sha;
    console.log(`${igual ? 'igual   ' : 'DISTINTO'} ${f}`);
    if (!igual) mal++;
  }
  for (const id of fuentes) if (!existsSync(join(DESTINO, `${id}.json`))) { console.log(`FALTA COPIA ${id}.json`); mal++; }
  process.exit(mal ? 1 : 0);
}

mkdirSync(DESTINO, { recursive: true });
const pedidas = args.includes('--todo') ? ids() : ['comun', ...args.filter((a) => a !== 'comun')];
for (const id of new Set(pedidas)) {
  const o = leer(id);
  const salida = { origen: o.rel, sha256: o.sha, id, nota: 'Copia tal cual de Clara; no se edita a mano: se vuelve a sacar con e13/herramientas/extraer-texto.mjs.', texto: o.obj };
  writeFileSync(join(DESTINO, `${id}.json`), JSON.stringify(salida, null, 1) + '\n');
  console.log(`copiado ${id}.json`);
}
// Las copias de páginas que esta obra retiró (Praxi y los cuatro conceptos) se borran para que nada las lea por error.
if (args.includes('--todo')) {
  const fuentes = new Set(ids());
  for (const f of readdirSync(DESTINO).filter((f) => f.endsWith('.json'))) {
    if (!fuentes.has(f.replace(/\.json$/, ''))) { rmSync(join(DESTINO, f)); console.log(`retirado ${f}`); }
  }
}
