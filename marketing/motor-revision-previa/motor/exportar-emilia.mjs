#!/usr/bin/env node
// Entrega para Emilia (agente-outbound). El motor NO escribe el correo ni lo envia: entrega el hallazgo en el formato que ella consume.
//   1) para-emilia.csv          -> EXACTAMENTE `empresa,dominio,email,hallazgo_medido,estado` (ella valida "header correcto")
//   2) para-emilia-detalle.csv  -> lo demas, por dominio: como decirlo en castellano, el arreglo, el precio, como comprobarlo, que NO afirmar.
// Uso: node exportar-emilia.mjs <carpeta-salida> <carpeta-corridas>:<carpeta-confirmacion> [...]
import fs from 'node:fs';
import path from 'node:path';
import { leerCsv } from './lib/csv.mjs';

const RAIZ = path.resolve(new URL('../../../', import.meta.url).pathname);
const [salida, ...pares] = process.argv.slice(2);
const FUENTES = ['ventas/clinicas-sin-contactar-5oct.csv', 'ventas/contactos-clinicas-dentales-chile.csv', 'ventas/contactos-clinicas-medicas-chile.csv',
  'ventas/contactos-google-maps-contadores.csv', 'ventas/contactos-google-maps-inmobiliarias.csv'];
const indice = new Map();   // dominio -> { empresa, email }
for (const f of FUENTES) for (const r of leerCsv(path.join(RAIZ, f))) {
  const dom = (r.dominio || (r.email || '').split('@')[1] || '').toLowerCase().replace(/^www\./, '');
  if (dom && !indice.has(dom)) indice.set(dom, { empresa: r.empresa || r.nombre || '', email: r.email || '' });
}
const esc = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const fila = (a) => a.map(esc).join(',');
const lee = (dir, id) => { for (const d of [dir + '-reintento', dir]) { const p = path.join(d, id, 'ficha.json'); if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')); } return null; };

function hallazgoMedido(f, confirmado) {
  const h = f.hallazgo, c1 = f.soporte?.c1; if (!h || h.id !== 'C1' || !c1) return null;
  const n = c1.cookies.length, provs = [...new Set(c1.cookies.map((c) => c.proveedor))].join(', ');
  const fases = c1.cookies.map((c) => c.primera_fase);
  const fase = fases.every((x) => x === 'A') ? 'ya estaban a los 11 s sin mover el mouse' : fases.some((x) => x === 'variable') ? null : 'aparecen solo tras mover el mouse, sin clics';
  const sinAviso = c1.aviso_en_dom.every((a) => !a.A && !a.B);
  const aviso = sinAviso ? (confirmado ? 'sin aviso de cookies a la vista en las capturas de los dos tramos' : 'sin aviso detectado en el DOM (confirmar en la captura del tramo B)') : 'CON aviso en alguna corrida: no usar sin revisar a mano';
  const envio = c1.envio_en_ambas.length ? `peticiones con datos a ${c1.envio_en_ambas.join(', ')}` : 'los scripts cargan y dejan cookie, sin envio observado';
  return `${n} cookies de rastreo (${provs}) sin tocar nada ni aceptar nada${fase ? '; ' + fase : ''}; igual en las dos corridas${confirmado ? ' y en una tercera con zona horaria e idioma de Chile' : ''}. ${aviso}. ${envio}. Fuente: motor de revision previa, 14-oct`;
}

const principal = [], detalle = [];
for (const par of pares) {
  const [dir, dirConf] = par.split(':');
  const confs = new Map((fs.existsSync(path.join(dirConf || '/nada', 'confirmacion.json')) ? JSON.parse(fs.readFileSync(path.join(dirConf, 'confirmacion.json'), 'utf8')).resultados : []).map((r) => [r.id, r]));
  for (const id of fs.readdirSync(dir).filter((x) => /^[A-Z]\d+$/.test(x)).sort()) {
    const f = lee(dir, id); if (!f) continue;
    const meta = indice.get(f.dominio) || { empresa: '', email: '' };
    const conf = confs.get(id); const confirmado = !!(conf && conf.repiten?.length && !conf.faltan?.length);
    let medido = '', estado = '';
    if (f.resultado.startsWith('descartado')) { medido = `Descartado por el motor: ${f.resultado.replace('descartado:', '')}`; estado = 'No enviar: ' + (f.detalle?.status ? `el sitio respondio HTTP ${f.detalle.status} (puede ser su firewall, no un sitio caido)` : 'descartado por el motor'); }
    else if (f.resultado === 'hallazgo-capa-2') { medido = hallazgoMedido(f, confirmado); estado = confirmado ? 'medido 14-oct por el motor, confirmado en 3a corrida. FALTA abrir el sitio a mano antes de enviar' : 'medido 14-oct por el motor, sin 3a corrida. FALTA verificar a mano antes de enviar'; }
    else if (f.resultado === 'sin-hallazgo') { medido = 'Sitio en orden segun el motor (aviso de cookies que respeta el consentimiento)'; estado = 'No enviar: no hay nada verdadero que decir'; }
    else { medido = `Sin hallazgo de capa 2. Hechos de capa 1 sin confirmar: ${(f.capa1?.consecuencia || []).join('; ') || 'ninguno'}`; estado = 'Sin gancho estable: no escribir hasta verificar a mano (estrategia 14-oct: se escribe solo lo verdadero y comprobable en 30 s)'; }
    principal.push(fila([meta.empresa, f.dominio, meta.email, medido, estado]));
    const h = f.hallazgo, p = h?.propuesta;
    detalle.push(fila([id, f.dominio, f.resultado, h?.id || '', h?.estado || '', confirmado ? 'si (asistente, no persona)' : 'no',
      p?.en_castellano || '', p?.frase_de_arreglo || '', p ? `${p.se_vende.producto}: ${p.se_vende.precio}` : '', p?.estado_del_texto || '',
      h?.donde_mirar || '', h ? h.no_afirmable.join(' | ') : '', (f.ruta_interna || []).map((x) => `${x.id} (${x.estado})`).join('; '), (f.capa1?.consecuencia || []).join('; '), `${path.relative(RAIZ, path.join(dir, id))}/ficha.md`]));
  }
}
fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, 'para-emilia.csv'), ['empresa,dominio,email,hallazgo_medido,estado', ...principal].join('\n') + '\n');
fs.writeFileSync(path.join(salida, 'para-emilia-detalle.csv'), ['id,dominio,resultado,hallazgo,estado_evidencia,confirmado,como_decirlo_en_castellano,frase_de_arreglo,se_vende_y_precio,estado_del_texto,como_comprobarlo,que_no_afirmar,punteros_no_van_en_el_correo,capa1_sin_confirmar,ficha', ...detalle].join('\n') + '\n');
console.log(`${principal.length} filas -> ${salida}`);
