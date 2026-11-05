#!/usr/bin/env node
// Entrega para Emilia (agente-outbound). El motor NO escribe el correo ni lo envia: entrega el hallazgo y la oferta en el formato que ella consume.
//   1) para-emilia.csv          -> EXACTAMENTE `empresa,dominio,email,hallazgo_medido,estado` (ella valida "header correcto")
//   2) para-emilia-detalle.csv  -> lo demas, por dominio: castellano, oferta, puerta a la reunion, precio, como comprobarlo, que NO afirmar.
// Uso: node exportar-emilia.mjs <carpeta-salida> <carpeta-corridas> [...]   (acepta tambien "<corridas>:<confirmacion>" por compatibilidad)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leerCsv } from './lib/csv.mjs';
import { descartadoAntes } from './pasadas/p0.mjs';

const RAIZ = path.resolve(fileURLToPath(new URL('../../../', import.meta.url)));   // fileURLToPath: .pathname deja %20 y %7E en rutas con espacios o ~ (iCloud)
const argv = process.argv.slice(2);
const vi = argv.indexOf('--verificados');   // CSV que baja verificar.mjs (id,dominio,veredicto,nota): solo lo que Ramon marco "coincide" queda como verificado
// Acepta el CSV que baja verificar.mjs (id,dominio,veredicto,nota) o el JSON de la verificacion independiente (final: confirmado | confirmado_con_aviso | refutado | no_concluyente | retener_identidad).
const MAPA_FINAL = { confirmado: 'coincide', confirmado_con_aviso: 'coincide', refutado: 'no_coincide', no_concluyente: 'dudoso', retener_identidad: 'dudoso' };
const cargaVerif = (f) => /\.json$/i.test(f) ? JSON.parse(fs.readFileSync(f, 'utf8')).map((o) => ({ dominio: o.dominio, veredicto: MAPA_FINAL[o.final] || 'dudoso', nota: o.nota, por: o.por, con_aviso: o.final === 'confirmado_con_aviso', hechos: (o.hechos || []).join(' || '), advertencias: (o.advertencias || []).join(' || ') })) : leerCsv(f);
const verificados = new Map(vi >= 0 ? cargaVerif(path.resolve(argv[vi + 1])).map((r) => [r.dominio, r]) : []);
if (vi >= 0) argv.splice(vi, 2);
const [salida, ...pares] = argv;
const FUENTES = fs.readdirSync(path.join(RAIZ, 'ventas')).filter((f) => /^(contactos|clinicas|abogados|nuevos|lote).*\.csv$/.test(f)).map((f) => 'ventas/' + f);
const indice = new Map();   // dominio -> { empresa, email }
for (const f of FUENTES) { try { for (const r of leerCsv(path.join(RAIZ, f))) {
  const dom = (r.dominio || (r.email || '').split('@')[1] || '').toLowerCase().replace(/^www\./, '');
  if (dom && !indice.has(dom)) indice.set(dom, { empresa: r.empresa || r.nombre || '', email: r.email || '' });
} } catch {} }
const esc = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const fila = (a) => a.map(esc).join(',');
const lee = (dir, id) => { for (const d of [dir + '-reintento', dir]) { const p = path.join(d, id, 'ficha.json'); if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')); } return null; };

function hallazgoMedido(f) {
  const h = f.hallazgo; if (!h) return '';
  const n = f.corridas_de_navegador || 2, fuente = `Fuente: motor de revision previa, ${(f.cuando || '').slice(0, 10)}`;
  if (h.id === 'C1' && f.soporte?.c1) {
    const c1 = f.soporte.c1, fases = c1.cookies.map((c) => c.primera_fase);
    const fase = fases.every((x) => x === 'A') ? 'ya estaban a los 11 s sin mover el mouse' : fases.some((x) => x === 'variable') ? null : 'aparecen solo tras mover el mouse, sin clics';
    const conAviso = c1.aviso_en_dom.some((a) => a.A || a.B);
    if (conAviso) return `El sitio TIENE aviso de cookies, y aun así ${c1.cookies.length} cookies de rastreo (${[...new Set(c1.cookies.map((c) => c.proveedor))].join(', ')}) quedaron escritas antes de elegir nada; igual en las ${n} corridas. NO decir que no tiene aviso. ${fuente}`;
    const aviso = `sin aviso de cookies detectado en ninguna de las ${n} corridas (capturas guardadas)`;
    return `${c1.cookies.length} cookies de rastreo (${[...new Set(c1.cookies.map((c) => c.proveedor))].join(', ')}) sin tocar nada ni aceptar nada${fase ? '; ' + fase : ''}; igual en las ${n} corridas. ${aviso}. ${c1.envio_en_ambas.length ? 'peticiones con datos a ' + c1.envio_en_ambas.join(', ') : 'los scripts cargan y dejan cookie, sin envio observado'}. ${fuente}`;
  }
  return `${h.afirmable} Capa ${h.capa || 2}, estado ${h.estado}. ${fuente}`;
}

// ya-contactados-gmail.csv (dominio,correo,ultimo_envio,fuente) en cada carpeta de corridas: el cruce con Gmail hecho por dominio del SITIO se salta a quien recibio correo en otro dominio (p. ej. el .com o un gmail).
const yaContactados = new Map(pares.flatMap((par) => { const f = path.join(par.split(':')[0], 'ya-contactados-gmail.csv'); return fs.existsSync(f) ? leerCsv(f).map((r) => [r.dominio, r]) : []; }));
const principal = [], detalle = [];
for (const par of pares) {
  const dir = par.split(':')[0];
  for (const id of fs.readdirSync(dir).filter((x) => /^[A-Z]+\d+$/.test(x)).sort()) {
    const f = lee(dir, id); if (!f) continue;
    const meta = indice.get(f.dominio) || { empresa: '', email: '' };
    const lista = fs.existsSync(path.join(dir, 'lista.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'lista.json'), 'utf8')).leads.find((l) => l.id === id) : null;
    const empresa = lista?.empresa || meta.empresa, email = lista?.correo || meta.email;
    let r = f.resultado || ''; const h = f.hallazgo, p = h?.propuesta;
    const previo = !r.startsWith('descartado') && descartadoAntes(f.dominio);   // fichas medidas antes de que el motor cortara por descartes previos
    if (previo) r = 'descartado:descartado-antes';
    let medido, estado;
    const yaC = yaContactados.get(f.dominio);
    if (yaC) { medido = `Ya recibió correo de SpindleLab (${yaC.ultimo_envio}, a ${yaC.correo}).`; estado = `No enviar: ya contactado (${yaC.fuente})`; }
    else if (previo) { medido = `Descartado antes en ${previo.en}: ${previo.motivo}`; estado = 'No enviar: ya estaba marcado como no escribir'; }
    else if (r.startsWith('descartado')) { medido = `Descartado por el motor: ${r.replace('descartado:', '')}${f.detalle?.status ? ' (HTTP ' + f.detalle.status + ')' : ''}`; estado = 'No enviar: ' + (f.detalle?.status ? `el sitio respondio HTTP ${f.detalle.status} (puede ser su firewall bloqueando la IP del motor, no un sitio caido)` : 'descartado antes de medir'); }
    else if (r === 'fallo') { medido = 'El motor no termino con este sitio'; estado = 'No enviar: sin medicion (fallo del motor)'; }
    else if (h && p?.fuerza === 'débil') { medido = hallazgoMedido(f); estado = `OFERTA DÉBIL: verdadera, pero sin una consecuencia que el dueño sienta (estrategia §14.3). Decidir si se escribe sola o se guarda para la llamada. Medido por el motor, ${f.corridas_de_navegador || 2} corridas; ${h.linea}. Sin verificacion humana`; }
    else if (h) { medido = hallazgoMedido(f); estado = `medido por el motor, ${f.corridas_de_navegador || 2} corridas; oferta: ${h.linea}. Sin verificacion humana (la estrategia §3 pide abrir el sitio antes de enviar; Ramon aprueba cada envio)`; }
    else if (r === 'sin-hallazgo') { medido = 'Sin complicaciones relevantes segun el motor'; estado = 'No enviar: no hay nada verdadero que decir'; }
    else { medido = `Sin oferta estable. Solo sospechas: ${(f.ruta_interna || []).map((x) => x.id).join(', ') || 'ninguna'}`; estado = 'Sin gancho estable: no escribir hasta verificar a mano'; }
    if (vi >= 0 && h && !yaC && !r.startsWith('descartado')) {
      const v = verificados.get(f.dominio)?.veredicto, nota = verificados.get(f.dominio)?.nota;
      if (v === 'coincide') estado = `VERIFICADO por ${verificados.get(f.dominio).por || 'Ramón a mano'}${verificados.get(f.dominio).con_aviso ? '; OJO: el sitio SÍ tiene aviso de cookies, decir "tiene aviso, pero las cookies ya estaban antes de elegir"' : ''}${nota ? '; ' + nota : ''}. Oferta: ${h.linea}`;
      else if (v === 'no_coincide') estado = `NO ENVIAR: la verificación (${verificados.get(f.dominio).por || 'Ramón'}) no lo sostuvo` + (nota ? ` (${nota})` : '');
      else if (v === 'dudoso') estado = `NO ENVIAR hasta revisar: la verificación (${verificados.get(f.dominio).por || 'Ramón'}) lo dejó dudoso` + (nota ? ` (${nota})` : '');
      else estado = 'NO ENVIAR: falta verificación a mano. ' + estado;
    }
    principal.push(fila([empresa, f.dominio, email, medido, estado]));
    detalle.push(fila([id, f.dominio, r, h?.id || '', h ? (h.capa || 2) : '', p?.fuerza || '', h?.estado || '', p?.en_castellano || '', p?.frase_de_arreglo || '', p?.apertura_a_reunion || '',
      p ? `${p.se_vende.producto} | ${p.se_vende.vehiculo_publicado}` : '', p?.se_vende.precio_en_el_correo || '', p?.se_vende.linea_de_precio || '', p?.estado_del_texto || '', h?.donde_mirar || '', h ? h.no_afirmable.join(' | ') : '',
      (f.ofertas_adicionales || []).join('; '), (f.ruta_interna || []).map((x) => `${x.id} (${x.estado})`).join('; '), (f.capa1?.higiene || []).join('; '), `${path.relative(RAIZ, path.join(dir, id))}/ficha.md`, verificados.get(f.dominio)?.hechos || '', verificados.get(f.dominio)?.advertencias || '']));
  }
}
const hayFichas = pares.some((par) => { const d = par.split(':')[0]; return fs.existsSync(d) && fs.readdirSync(d).some((x) => /^[A-Z]+\d+$/.test(x) && (fs.existsSync(path.join(d, x, 'ficha.json')) || fs.existsSync(path.join(d + '-reintento', x, 'ficha.json')))); });
if (hayFichas && !principal.length) { console.error('ERROR: hay fichas en las carpetas indicadas pero no se genero ninguna fila. Revisar los identificadores de las carpetas (esperados: letras + numeros, p. ej. AB01).'); process.exit(1); }
fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, 'para-emilia.csv'), ['empresa,dominio,email,hallazgo_medido,estado', ...principal].join('\n') + '\n');
fs.writeFileSync(path.join(salida, 'para-emilia-detalle.csv'), ['id,dominio,resultado,oferta,capa,fuerza,estado_evidencia,como_decirlo_en_castellano,frase_de_arreglo,puerta_a_la_reunion,servicio_y_desde_publicado,precio_en_el_correo,linea_de_precio_de_referencia,estado_del_texto,como_comprobarlo,que_no_afirmar,otras_ofertas_para_la_llamada,sospechas_no_van_en_el_correo,higiene,ficha,hechos_verificados,advertencias_de_la_verificacion', ...detalle].join('\n') + '\n');
console.log(`${principal.length} filas -> ${salida}`);
