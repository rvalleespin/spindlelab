#!/usr/bin/env node
// Fija la muestra ANTES de correr nada (jerarquia §6): primeros N dominios, por orden de los CSV de Dereck,
// que no esten excluidos ni ya contactados. Sin elegir por como se ven. Los reemplazos quedan anotados.
// Uso: node muestra.mjs [N=10] [--prefijo S] [--fuentes ruta1,ruta2] > ../corridas/muestra-preregistrada.json
// Si el CSV no trae columna 'dominio', se saca del correo (se saltan los correos gratuitos). Se saltan las filas que Dereck ya marco descartadas.
import path from 'node:path';
import { leerCsv } from './lib/csv.mjs';
import { enExclusion, yaContactado, limpiarDominio } from './pasadas/p0.mjs';

const N = +(process.argv[2] || 10);
const arg = (n, d) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : d; };
const PREFIJO = arg('--prefijo', 'S');
const GRATIS = /^(gmail|hotmail|outlook|yahoo|live|icloud|msn|vtr|123mail|protonmail)\./i;
const RAIZ = path.resolve(new URL('../../../', import.meta.url).pathname);
const FUENTES = arg('--fuentes', 'ventas/contactos-google-maps-contadores.csv,ventas/contactos-google-maps-inmobiliarias.csv').split(',');
const elegidos = [], omitidos = [], vistos = new Set();
for (const f of FUENTES) {
  for (const fila of leerCsv(path.join(RAIZ, f))) {
    if (elegidos.length >= N) break;
    if (/^(descartad|exclui|no escribir)/i.test(fila.estado || '')) { omitidos.push({ dominio: fila.dominio || fila.email, motivo: 'ya descartado en el CSV: ' + (fila.estado || '').slice(0, 50) }); continue; }
    const deCorreo = (fila.email || '').split('@')[1] || '';
    const dominio = limpiarDominio(fila.dominio || (GRATIS.test(deCorreo) ? '' : deCorreo)); if (!dominio || vistos.has(dominio)) continue; vistos.add(dominio);
    const ex = enExclusion(dominio, fila.email); const cont = ex ? [] : yaContactado(dominio);
    if (ex || cont.length) { omitidos.push({ dominio, motivo: ex ? `excluido (${ex.tipo})` : `ya contactado (${cont[0]})` }); continue; }
    elegidos.push({ id: PREFIJO + String(elegidos.length + 1).padStart(2, '0'), dominio, correo: fila.email, rubro: fila.rubro, fuente: f });
  }
}
console.log(JSON.stringify({ fijada: new Date().toISOString(), regla: 'primeros N de los CSV en orden, no excluidos ni ya contactados; sin elegir por apariencia', muestra: elegidos, omitidos_antes_de_completar: omitidos }, null, 2));
