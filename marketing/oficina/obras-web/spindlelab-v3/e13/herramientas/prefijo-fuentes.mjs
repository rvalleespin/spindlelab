#!/usr/bin/env node
// Aplica a las FUENTES de texto (e13/texto/*.json) la misma regla de prefijo que convertir-a-raiz.mjs aplicó al sitio:
// /v3/<ruta de página>/ pasa a /<ruta>/ y los archivos de medios (/v3/medios/, /v3/portada/, /v3/marca/, /v3/trabajo/<caso>/x.webp) se quedan.
// Existe porque la conversión a raíz reescribe las copias de spindlelab-astro/src/data/archivo/texto/ y, si las fuentes no se
// reescriben igual, `extraer-texto.mjs --comprobar` dice DISTINTO en todas y volver a extraer reintroduce enlaces /v3/ que no existen
// (defecto 2 de la QA de la ronda 1, 26-oct).
//   node prefijo-fuentes.mjs <carpeta de fuentes>     (por defecto, e13/texto/)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const RUTAS = new Set(['servicios', 'metodo', 'nosotros', 'contacto', 'diagnostico', 'blog', 'trabajo']);
const MEDIOS = new Set(['cinta', 'marca', 'medios', 'portada']);
const aviso = [];
const clasificar = (ficha) => {
  if (ficha === '/v3' || ficha === '/v3/') return '/';
  const partes = ficha.split('/'); const primero = partes[2];
  if (MEDIOS.has(primero)) return null;
  if (!RUTAS.has(primero)) { aviso.push(ficha); return null; }
  const ultimo = partes.filter(Boolean).pop();
  if (/\.[A-Za-z0-9]{2,5}$/.test(ultimo)) return null;
  return ficha.slice(3);
};
const dir = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), '../texto');
let n = 0;
for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const p = join(dir, f);
  const txt = readFileSync(p, 'utf8');
  const nuevo = txt.replace(/\/v3(?:\/[A-Za-z0-9_\-.]*)*\/?(?=[^A-Za-z0-9_\-.\/]|$)/g, (ficha, ...r) => {
    const off = r[r.length - 2]; const prev = txt[off - 1];
    if (prev && /[A-Za-z0-9_\-]/.test(prev)) return ficha;
    const x = clasificar(ficha); return x === null ? ficha : x;
  });
  if (nuevo !== txt) { writeFileSync(p, nuevo); n++; console.log('reescrito ' + f); }
}
console.log(`${n} archivos`); if (aviso.length) console.log('sin clasificar:', [...new Set(aviso)].join(' '));
