#!/usr/bin/env node
// Añade la propuesta a fichas YA generadas (sin volver a abrir navegadores) y regenera su ficha.md.
// Uso: node reemitir.mjs <carpeta-de-corridas> [<carpeta> ...]
import fs from 'node:fs';
import path from 'node:path';
import { propuesta } from './lib/arreglo.mjs';
import { renderFicha } from './lib/render.mjs';

let n = 0;
for (const dir of process.argv.slice(2)) {
  for (const d of fs.readdirSync(dir).filter((x) => /^[A-Z]\d+$/.test(x))) {
    const p = path.join(dir, d, 'ficha.json'); if (!fs.existsSync(p)) continue;
    const f = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (f.hallazgo) f.hallazgo.propuesta = propuesta(f.hallazgo, f.soporte);
    for (const c of f.ruta_interna || []) c.propuesta = propuesta(c, f.soporte);
    f.propuesta_agregada = new Date().toISOString();
    fs.writeFileSync(p, JSON.stringify(f, null, 2)); fs.writeFileSync(path.join(dir, d, 'ficha.md'), renderFicha(f)); n++;
  }
}
console.log(`${n} fichas actualizadas`);
