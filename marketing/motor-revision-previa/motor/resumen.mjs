#!/usr/bin/env node
// Agrega las fichas de una carpeta de corridas en una tabla con IDs (sin dominios). Uso: node resumen.mjs <carpeta>
import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve(process.argv[2] || '../corridas/2026-10-14');
// Si una corrida se cayo sin ficha, se usa la de la carpeta hermana '<dir>-reintento' (el reintento queda declarado en el informe).
const leer = (d) => { for (const base of [dir + '-reintento', dir]) { const p = path.join(base, d, 'ficha.json'); if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')); } return null; };
const fichas = fs.readdirSync(dir).filter((d) => /^[A-Z]+\d+$/.test(d)).sort().map(leer).filter(Boolean);
const filas = fichas.map((f) => {
  const cand = [f.hallazgo, ...(f.ruta_interna || [])].filter(Boolean);
  return { id: f.id, resultado: f.resultado, hallazgo: f.hallazgo ? `${f.hallazgo.id} (${f.hallazgo.estado})` : '-', punteros: (f.ruta_interna || []).map((p) => `${p.id} (${p.estado})`).join(', ') || '-',
    capa1: (f.capa1?.consecuencia || []).join('; ') || '-', cand };
});
const cuenta = (pred) => filas.filter(pred).length;
const estables = cuenta((f) => f.cand.some((c) => c.estado === 'estable'));
const sospechosas = cuenta((f) => f.cand.length > 0);
const porCand = {}; for (const f of filas) for (const c of f.cand) { porCand[c.id] ??= { estable: 0, sospecha: 0 }; porCand[c.id][c.estado]++; }
console.log(`| ID | resultado | hallazgo | punteros | capa 1 con consecuencia |\n|---|---|---|---|---|`);
for (const f of filas) console.log(`| ${f.id} | ${f.resultado} | ${f.hallazgo} | ${f.punteros} | ${f.capa1} |`);
console.log(`\ncorridas: ${filas.length}\ncon al menos un candidato de capa 2 (cualquier estado): ${sospechosas}\ncon al menos un candidato ESTABLE: ${estables}\npor candidato: ${JSON.stringify(porCand)}\nresultados: ${JSON.stringify(filas.reduce((a, f) => ({ ...a, [f.resultado]: (a[f.resultado] || 0) + 1 }), {}))}`);
