#!/usr/bin/env node
// Añade la propuesta a fichas YA generadas (sin volver a abrir navegadores) y regenera su ficha.md.
// Uso: node reemitir.mjs <carpeta-de-corridas> [<carpeta> ...]
import fs from 'node:fs';
import path from 'node:path';
import { propuesta, c1ConAviso } from './lib/arreglo.mjs';
import { renderFicha } from './lib/render.mjs';

let n = 0;
for (const dir of process.argv.slice(2)) {
  for (const d of fs.readdirSync(dir).filter((x) => /^[A-Z]+\d+$/.test(x))) {
    const p = path.join(dir, d, 'ficha.json'); if (!fs.existsSync(p)) continue;
    const f = JSON.parse(fs.readFileSync(p, 'utf8'));
    const h = f.hallazgo;
    if (h?.id === 'C1' && c1ConAviso(f.soporte) && h.variante !== 'con-aviso') {   // fichas medidas antes de separar C1 con aviso
      const comunes = (f.soporte.c1.cookies || []).map((c) => c.nombre);
      h.variante = 'con-aviso';
      h.afirmable = `El sitio muestra un aviso de cookies, pero antes de elegir nada en él ya había guardado: ${comunes.join(', ')}.`;
      h.donde_mirar = 'Abrir el sitio en una ventana nueva, NO responder el aviso, y mirar las cookies (candado > Cookies, o F12 > Application > Cookies): ya hay de medición o publicidad.';
      h.no_afirmable = [...(h.no_afirmable || []).filter((x) => !/no tiene aviso/.test(x)), 'que el sitio "no tiene aviso" (sí lo tiene)', 'que el aviso sea ilegal o insuficiente', 'que las cookies se escriban aun después de pulsar Rechazar (no se probó)'];
    }
    if (f.hallazgo) f.hallazgo.propuesta = propuesta(f.hallazgo, f.soporte, (f.ofertas_adicionales || []).length);
    for (const c of f.ruta_interna || []) c.propuesta = propuesta(c, f.soporte);
    f.propuesta_agregada = new Date().toISOString();
    fs.writeFileSync(p, JSON.stringify(f, null, 2)); fs.writeFileSync(path.join(dir, d, 'ficha.md'), renderFicha(f)); n++;
  }
}
console.log(`${n} fichas actualizadas`);
