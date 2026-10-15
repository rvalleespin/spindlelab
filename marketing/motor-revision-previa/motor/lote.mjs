#!/usr/bin/env node
// Examina automaticamente TODOS los sitios de una lista de leads. Sin aporte humano en el analisis.
//   node lote.mjs <leads.csv> --out <carpeta> [--concurrencia 3] [--max N] [--prefijo L]
// Entrada: CSV de Dereck (columnas `dominio` o `email`; opcionales `empresa`/`nombre`).
// Salida:  <carpeta>/<ID>/ficha.{json,md} por sitio, y <carpeta>/entrega/para-emilia.csv + para-emilia-detalle.csv.
// Reanudable: si se corta, vuelve a correr el mismo comando y salta lo ya hecho.
// NO envia nada. NO toca ventas/, pipeline ni lista de exclusion (solo la lee, en la pasada 0).
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { leerCsv } from './lib/csv.mjs';
import { limpiarDominio } from './pasadas/p0.mjs';

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const csvPath = args.find((a) => !a.startsWith('--') && !['--out', '--concurrencia', '--max', '--prefijo'].includes(args[args.indexOf(a) - 1]));
if (!csvPath || !arg('--out')) { console.error('Uso: node lote.mjs <leads.csv> --out <carpeta> [--concurrencia 3] [--max N] [--prefijo L]'); process.exit(2); }
const out = path.resolve(arg('--out')), conc = +arg('--concurrencia', 3), max = +arg('--max', 0), pref = arg('--prefijo', 'L');
const aqui = path.dirname(new URL(import.meta.url).pathname);
fs.mkdirSync(out, { recursive: true });

const vistos = new Set(), leads = [];
for (const r of leerCsv(path.resolve(csvPath))) {
  const dominio = limpiarDominio(r.dominio || (r.email || '').split('@')[1] || '');
  if (!dominio || vistos.has(dominio) || /^(gmail|hotmail|outlook|yahoo|live|icloud|msn)\./i.test(dominio)) continue;
  vistos.add(dominio); leads.push({ dominio, correo: r.email || '', empresa: r.empresa || r.nombre || '' });
}
const lista = (max ? leads.slice(0, max) : leads).map((l, i) => ({ ...l, id: pref + String(i + 1).padStart(2, '0') }));
fs.writeFileSync(path.join(out, 'lista.json'), JSON.stringify({ fijada: new Date().toISOString(), regla: 'dominios del CSV en orden, sin duplicados ni correos gratuitos', leads: lista }, null, 2));
console.error(`[lote] ${lista.length} sitios, concurrencia ${conc}`);

const corre = (l) => new Promise((resolve) => {
  if (fs.existsSync(path.join(out, l.id, 'ficha.json'))) { console.error(`[${l.id}] ya estaba hecho`); return resolve('saltado'); }
  const hijo = spawn(process.execPath, ['--no-warnings', path.join(aqui, 'revisar.mjs'), l.dominio, '--id', l.id, '--out', out, ...(l.correo ? ['--correo', l.correo] : [])],
    { env: { ...process.env, NODE_USE_ENV_PROXY: '1' }, stdio: ['ignore', 'pipe', 'pipe'] });
  let linea = ''; hijo.stdout.on('data', (d) => { linea += d; }); hijo.stderr.on('data', () => {});
  const t = setTimeout(() => hijo.kill('SIGKILL'), 900000);
  hijo.on('close', (code) => {
    clearTimeout(t);
    if (!fs.existsSync(path.join(out, l.id, 'ficha.json'))) {   // un sitio que rompe al motor no detiene el lote
      fs.mkdirSync(path.join(out, l.id), { recursive: true });
      fs.writeFileSync(path.join(out, l.id, 'ficha.json'), JSON.stringify({ id: l.id, dominio: l.dominio, resultado: 'fallo', detalle: { codigo: code, nota: 'el motor no terminó con este sitio; se registra y se sigue' }, cuando: new Date().toISOString() }, null, 2));
    }
    let msg = linea.trim();
    if (!msg) { try { const f = JSON.parse(fs.readFileSync(path.join(out, l.id, 'ficha.json'), 'utf8')); msg = `${l.id} :: ${f.resultado}`; } catch { msg = 'fallo (codigo ' + code + ')'; } }   // un descartado no escribe en stdout
    console.error(`[${l.id}] ${msg}`); resolve(code);
  });
});
let i = 0;
await Promise.all(Array.from({ length: conc }, async () => { while (i < lista.length) await corre(lista[i++]); }));

await new Promise((res) => spawn(process.execPath, [path.join(aqui, 'exportar-emilia.mjs'), path.join(out, 'entrega'), out], { stdio: 'inherit' }).on('close', res));
console.error(`[lote] listo. Entrega en ${path.join(out, 'entrega')}`);
