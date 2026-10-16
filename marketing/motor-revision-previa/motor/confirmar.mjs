#!/usr/bin/env node
// Tercera corrida INDEPENDIENTE de los candidatos C1 de una carpeta de corridas, con zona horaria e idioma de Chile.
// No reemplaza a una persona abriendo el sitio: confirma que la sospecha se repite una vez mas y deja capturas para mirarlas.
// Uso: NODE_USE_ENV_PROXY=1 node confirmar.mjs <carpeta-corridas> <muestra.json> <carpeta-salida> S01 S02 ...
import fs from 'node:fs';
import path from 'node:path';
import { sondear, proveedorDeCookie } from './lib/navegador.mjs';

const [dir, muestraPath, salida, ...ids] = process.argv.slice(2);
const muestra = JSON.parse(fs.readFileSync(muestraPath, 'utf8')).muestra;
const lee = (id) => { for (const d of [dir, dir + '-reintento']) { const p = path.join(d, id, 'ficha.json'); if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')); } };
const out = [];
for (const id of ids) {
  const ficha = lee(id), m = muestra.find((x) => x.id === id);
  const esperadas = (ficha.hallazgo?.id === 'C1' ? ficha.soporte.c1.cookies : []).map((c) => c.nombre);
  const r = await sondear(ficha.url, { outDir: path.join(salida, id), etiqueta: 'r3-chile', chile: true });
  const vistas = new Map();
  for (const [fase, lista] of [['A', r.A.cookies], ['B', r.B.cookies]]) for (const c of lista) if (proveedorDeCookie(c.nombre) && !vistas.has(c.nombre)) vistas.set(c.nombre, fase);
  const repiten = esperadas.filter((n) => vistas.has(n)), faltan = esperadas.filter((n) => !vistas.has(n)), nuevas = [...vistas.keys()].filter((n) => !esperadas.includes(n));
  const fila = { id, esperadas: esperadas.length, repiten, faltan, nuevas, fase_primera_aparicion: Object.fromEntries(repiten.map((n) => [n, vistas.get(n)])),
    aviso_en_dom: { A: !!r.A.dom?.aviso, B: !!r.B.dom?.aviso, texto: r.B.dom?.aviso?.texto || r.A.dom?.aviso?.texto || null }, capturas: [r.A.captura, r.B.captura] };
  out.push(fila); console.error(id, JSON.stringify({ repiten: repiten.length + '/' + esperadas.length, faltan, aviso: fila.aviso_en_dom.A || fila.aviso_en_dom.B }));
}
fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, 'confirmacion.json'), JSON.stringify({ cuando: new Date().toISOString(), metodo: 'tercera corrida con zona horaria e idioma de Chile; IP de datacenter', resultados: out }, null, 2));
console.log('FIN');
