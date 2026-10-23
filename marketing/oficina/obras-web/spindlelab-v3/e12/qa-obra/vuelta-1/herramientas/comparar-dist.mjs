// Javiera, QA de obra E12, vuelta 1. Compara dos dist/ fuera de v3/ (y fuera de las maquetas), archivo por
// archivo, por md5. Independiente de comparar-produccion.mjs de Diego: la base se reconstruye aquí desde el commit
// anterior a la tanda 1 (03d1bb3) en un worktree aparte.
// Uso: node comparar-dist.mjs <dist-base> <dist-obra> <salida.json>
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const [base, obra, salida] = process.argv.slice(2);
function lista(raiz) {
  const out = new Map();
  (function rec(d) {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) rec(p);
      else out.set(relative(raiz, p), createHash('md5').update(readFileSync(p)).digest('hex'));
    }
  })(raiz);
  return out;
}
const B = lista(base), O = lista(obra);
const fueraV3 = (k) => !k.startsWith('v3/');
const res = { iguales: 0, distintos: [], faltan: [], nuevos: [], htmlBase: 0, astroBase: [] };
for (const [k, h] of B) {
  if (!fueraV3(k)) continue;
  if (k.startsWith('_astro/')) {
    // Los de _astro/ que carga alguna página publicada: se comparan por nombre (lleva hash) y contenido.
    res.astroBase.push(k);
  }
  if (k.endsWith('.html')) res.htmlBase++;
  if (!O.has(k)) res.faltan.push(k);
  else if (O.get(k) !== h) res.distintos.push(k);
  else res.iguales++;
}
for (const k of O.keys()) if (fueraV3(k) && !B.has(k)) res.nuevos.push(k);
// Qué _astro/ cargan las páginas publicadas de la obra, y si existen iguales en la base.
const cargados = new Set();
for (const k of O.keys()) {
  if (!fueraV3(k) || !k.endsWith('.html')) continue;
  const html = readFileSync(join(obra, k), 'utf8');
  for (const m of html.matchAll(/(?:src|href)="\/(_astro\/[^"?#]+)"/g)) cargados.add(m[1]);
}
res.astroCargadoPorProduccion = [...cargados].map((k) => ({ k, enBase: B.has(k), igual: B.get(k) === O.get(k) }));
res.astroBase = undefined;
writeFileSync(salida, JSON.stringify(res, null, 2));
console.log(`fuera de v3/: ${res.iguales} iguales, ${res.distintos.length} distintos, ${res.faltan.length} faltan, ${res.nuevos.length} nuevos; HTML en la base: ${res.htmlBase}`);
console.log('distintos:', res.distintos);
console.log('faltan:', res.faltan.filter((k) => !k.startsWith('_astro/')), '(_astro/ que faltan:', res.faltan.filter((k) => k.startsWith('_astro/')).length, ')');
console.log('nuevos (no _astro):', res.nuevos.filter((k) => !k.startsWith('_astro/')));
console.log('_astro/ cargados por producción:', res.astroCargadoPorProduccion);
