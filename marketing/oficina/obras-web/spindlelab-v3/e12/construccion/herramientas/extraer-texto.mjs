#!/usr/bin/env node
// El texto de Clara, tal cual, para las páginas de A (obra E12, corrida 2). Diego, 19-oct-2026 (tanda 2).
//
// El texto de la obra vive en e12/texto/texto-obra.json (Clara). El sitio no lo lee desde marketing/: el build de
// spindlelab-astro/ no puede depender de una carpeta de fuera del proyecto (Vite la bloquea en `astro dev`). Este
// script copia, SIN CAMBIAR UNA LETRA, el objeto de cada página pedida (y «comun») a
// spindlelab-astro/src/data/archivo/texto/<id>.json, con el sha256 del archivo de origen. Las páginas lo leen con
// src/data/archivo/texto.mjs, que falla el build si un id no existe. Los .json no los lee Tailwind
// (tailwind.config.mjs mira .astro, .html, .js, .ts…), así que el texto no puede cambiar el CSS publicado.
//
// Uso (desde cualquier carpeta):
//   node extraer-texto.mjs home trabajo         copia esas páginas y «comun»
//   node extraer-texto.mjs --comprobar          compara cada copia con texto-obra.json; sale con 1 si alguna difiere
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ORIGEN_REL = 'marketing/oficina/obras-web/spindlelab-v3/e12/texto/texto-obra.json';
const ORIGEN = join(REPO, ORIGEN_REL);
const DESTINO = join(REPO, 'spindlelab-astro/src/data/archivo/texto');

const crudo = readFileSync(ORIGEN);
const sha = createHash('sha256').update(crudo).digest('hex');
const obra = JSON.parse(crudo.toString('utf8'));
const pagina = (id) => {
  if (id === 'comun') return obra.comun;
  const p = obra.paginas.find((x) => x.id === id);
  if (!p) throw new Error(`texto-obra.json no tiene la página «${id}»`);
  return p;
};

const args = process.argv.slice(2);
if (args.includes('--comprobar')) {
  let mal = 0;
  for (const f of readdirSync(DESTINO).filter((f) => f.endsWith('.json'))) {
    const copia = JSON.parse(readFileSync(join(DESTINO, f), 'utf8'));
    const igual = JSON.stringify(copia.texto) === JSON.stringify(pagina(copia.id));
    console.log(`${igual ? 'igual   ' : 'DISTINTO'} ${f}${copia.sha256 === sha ? '' : ' (copiado de otra versión del archivo)'}`);
    if (!igual) mal++;
  }
  process.exit(mal ? 1 : 0);
}

mkdirSync(DESTINO, { recursive: true });
for (const id of ['comun', ...args.filter((a) => a !== 'comun')]) {
  const salida = { origen: ORIGEN_REL, sha256: sha, id, nota: 'Copia tal cual de Clara; no se edita a mano: se vuelve a sacar con construccion/herramientas/extraer-texto.mjs.', texto: pagina(id) };
  writeFileSync(join(DESTINO, `${id}.json`), JSON.stringify(salida, null, 1) + '\n');
  console.log(`copiado ${id}.json`);
}
