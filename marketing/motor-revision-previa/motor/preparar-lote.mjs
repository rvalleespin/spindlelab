#!/usr/bin/env node
// Etapa 3 del embudo de leads (descartes baratos): junta la lista de dominios con el correo publicado de cada sitio
// (salida de contactos.mjs) y deja solo lo que se puede medir y escribir. NO mide, NO envia.
//   node preparar-lote.mjs --dominios <lista.csv> --contactos <contactos.csv> --conocidos <dominios-conocidos.txt> --out <entrada.csv> [--fuente "Vibe 2026-10-19"]
// --dominios   CSV con columnas dominio y empresa (p. ej. la exportacion de Vibe: business_domain, business_name)
// --contactos  salida de contactos.mjs
// --conocidos  un dominio por linea: todo lo ya analizado, contactado o usado
// Salida: entrada.csv (empresa,dominio,email,tipo,fuente) + entrada.descartes.csv (dominio,motivo)
import fs from 'node:fs';
import path from 'node:path';
import { leerCsv } from './lib/csv.mjs';
import { limpiarDominio, enExclusion, descartadoAntes } from './pasadas/p0.mjs';

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
for (const k of ['--dominios', '--contactos', '--conocidos', '--out']) if (!arg(k)) { console.error('Falta ' + k); process.exit(2); }
const fuente = arg('--fuente', '');
const conocidos = new Set(fs.readFileSync(path.resolve(arg('--conocidos')), 'utf8').split(/\r?\n/).map((l) => l.trim().toLowerCase().replace(/^www\./, '')).filter(Boolean));
const empresas = new Map();
for (const r of leerCsv(path.resolve(arg('--dominios')))) {
  const d = limpiarDominio(r.dominio || r.business_domain || r.business_website || '');
  if (d) empresas.set(d, r.empresa || r.business_name || r.nombre || '');
}
const contactos = new Map(leerCsv(path.resolve(arg('--contactos'))).map((r) => [limpiarDominio(r.dominio), r]));

const entrada = [], descartes = [], vistos = new Set();
for (const [dominio, empresa] of empresas) {
  const dn = dominio.replace(/^www\./, '');
  const motivo = (m) => descartes.push({ dominio, motivo: m });
  if (vistos.has(dn)) { motivo('duplicado en la lista'); continue; }
  vistos.add(dn);
  if (conocidos.has(dn)) { motivo('ya analizado, contactado o usado'); continue; }
  const c = contactos.get(dominio);
  if (!c) { motivo('sin lectura de contacto'); continue; }
  if (c.estado !== 'correo-publicado') { motivo(c.estado + (c.nota ? ' (' + c.nota + ')' : '')); continue; }
  if (c.mx_ok !== 'si') { motivo('el dominio del correo no recibe correo (MX: ' + c.mx_ok + ')'); continue; }
  if (enExclusion(dn, c.correo_principal)) { motivo('en la lista de exclusion'); continue; }
  const prev = descartadoAntes(dn); if (prev) { motivo('marcado antes como no escribir'); continue; }
  entrada.push({ empresa: empresa || c.empresa || '', dominio, email: c.correo_principal, tipo: c.tipo, fuente });
}
const csv = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const out = path.resolve(arg('--out'));
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, ['empresa,dominio,email,tipo,fuente', ...entrada.map((r) => ['empresa', 'dominio', 'email', 'tipo', 'fuente'].map((k) => csv(r[k])).join(','))].join('\n') + '\n');
fs.writeFileSync(out.replace(/\.csv$/, '.descartes.csv'), ['dominio,motivo', ...descartes.map((d) => csv(d.dominio) + ',' + csv(d.motivo))].join('\n') + '\n');
const por = descartes.reduce((a, d) => { const k = d.motivo.split(' (')[0]; a[k] = (a[k] || 0) + 1; return a; }, {});
console.error(`[preparar-lote] ${empresas.size} dominios -> ${entrada.length} para medir; descartes:`, JSON.stringify(por));
console.error(`  de los que quedan: ${entrada.filter((r) => r.tipo === 'generico').length} con buzon de rol, ${entrada.filter((r) => r.tipo === 'personal').length} con correo de persona`);
