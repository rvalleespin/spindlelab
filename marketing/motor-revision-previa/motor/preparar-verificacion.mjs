#!/usr/bin/env node
// Prepara la verificacion independiente: lista los hallazgos fuertes y estables de un lote (sin los ya descartados antes) para que
// los revise verificacion-independiente/workflow-verificacion.js. NO mide nada ni envia nada.
//   node preparar-verificacion.mjs <carpeta-del-lote> <salida-hallazgos.json> [--fuerza fuerte,media]
import fs from 'node:fs';
import path from 'node:path';
import { descartadoAntes } from './pasadas/p0.mjs';

const args = process.argv.slice(2), dir = path.resolve(args[0] || ''), salida = path.resolve(args[1] || '');
const fi = args.indexOf('--fuerza'); const fuerzas = new Set((fi >= 0 ? args[fi + 1] : 'fuerte').split(','));
if (!args[0] || !args[1] || !fs.existsSync(dir)) { console.error('Uso: node preparar-verificacion.mjs <carpeta-del-lote> <salida.json> [--fuerza fuerte,media]'); process.exit(2); }
const lista = fs.existsSync(path.join(dir, 'lista.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'lista.json'), 'utf8')).leads : [];
const out = [];
for (const id of fs.readdirSync(dir).filter((x) => /^[A-Z]+\d+$/.test(x)).sort()) {
  const p = path.join(dir, id, 'ficha.json'); if (!fs.existsSync(p)) continue;
  const f = JSON.parse(fs.readFileSync(p, 'utf8')), h = f.hallazgo;
  if (!h || !fuerzas.has(h.propuesta?.fuerza) || h.estado !== 'estable' || descartadoAntes(f.dominio)) continue;
  const l = lista.find((x) => x.id === id) || {};
  out.push({ id, dominio: f.dominio, empresa: l.empresa || '', oferta: h.id, afirmable: h.afirmable, no_afirmable: h.no_afirmable, cookies: f.soporte?.c1?.cookies?.map((c) => c.nombre) || null, dir: path.join(dir, id) });
}
fs.mkdirSync(path.dirname(salida), { recursive: true }); fs.writeFileSync(salida, JSON.stringify(out, null, 1));
console.log(`${out.length} hallazgos -> ${salida}\nids: ${JSON.stringify(out.map((o) => o.id))}`);
