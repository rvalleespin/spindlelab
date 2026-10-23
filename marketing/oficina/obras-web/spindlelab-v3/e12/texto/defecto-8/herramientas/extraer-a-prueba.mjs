// Lo mismo que construccion/herramientas/extraer-texto.mjs (Diego), pero escribe en la copia de prueba del proyecto,
// no en el repo: así el src/ de Diego no se toca.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const [ORIGEN, DESTINO, ...ids] = process.argv.slice(2);
const ORIGEN_REL = 'marketing/oficina/obras-web/spindlelab-v3/e12/texto/texto-obra.json';
const crudo = readFileSync(ORIGEN);
const sha = createHash('sha256').update(crudo).digest('hex');
const obra = JSON.parse(crudo.toString('utf8'));
for (const id of ids) {
  const p = obra.paginas.find((x) => x.id === id);
  const salida = { origen: ORIGEN_REL, sha256: sha, id, nota: 'Copia tal cual de Clara; no se edita a mano: se vuelve a sacar con construccion/herramientas/extraer-texto.mjs.', texto: p };
  writeFileSync(join(DESTINO, `${id}.json`), JSON.stringify(salida, null, 1) + '\n');
  console.log(`copiado ${id}.json`);
}
