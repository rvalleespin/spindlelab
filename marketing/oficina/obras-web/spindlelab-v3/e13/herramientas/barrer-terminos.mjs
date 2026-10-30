#!/usr/bin/env node
// Barrido de términos de la obra E13 sobre un dist/ construido (brief §7, criterio 5; guía para roles, sección 3).
// Mira el HTML CRUDO de cada página (texto visible, atributos alt/title/aria-label, metas y JSON-LD), los .js propios de
// public/assets/js y los archivos de texto (llms.txt, robots.txt, sitemap.xml). No resuelve falsos positivos: lista cada
// hallazgo con contexto y la persona decide (p. ej. «motor» en «motor de IA» es legítimo, y los cuerpos del blog citan términos
// cuando los explican).
//
//   node barrer-terminos.mjs <dist> [--solo <regex de ruta>] [--resumen]
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2];
if (!dist || !existsSync(dist)) { console.error('Uso: barrer-terminos.mjs <dist> [--solo <regex>] [--resumen]'); process.exit(2); }
const soloArg = process.argv.indexOf('--solo');
const SOLO = soloArg > -1 ? new RegExp(process.argv[soloArg + 1]) : null;
const RESUMEN = process.argv.includes('--resumen');

const TERMINOS = [
  ['mini-diagnóstico', /mini-?diagn[oó]stico/gi],
  ['diagnóstico gratis/gratuito', /diagn[oó]stico\s+(gratis|gratuito)|(gratis|gratuito)[^.<]{0,20}diagn[oó]stico/gi],
  ['24 horas / 24 h', /\b24\s*(horas|hrs?|h)\b/gi],
  ['partners', /\bpartners?\b|te conectamos con|otros profesionales/gi],
  ['motor', /\bmotor(es)?\b/gi],
  ['Más elegido / insignias', /m[aá]s elegido|m[aá]s popular|muchos clientes nos usan|equipo dedicado/gi],
  ['SGE', /\bSGE\b/g],
  ['agentes de IA / revisión diaria', /agentes?\s+de\s+IA|revisi[oó]n diaria|agente de desarrollo/gi],
  ['monitoreo doble / quincenal', /monitoreo doble|quincenal|cada quince d[ií]as|doble quincenal/gi],
  ['share of voice / AI Overviews', /share[- ]of[- ]voice|AI Overviews?/gi],
  ['compromiso de resultado', /nos comprometemos|compromiso de puntaje|a los 3 meses[^.<]{0,60}(puntos|puntaje)|probabilidad de cita|aumentar tu probabilidad/gi],
  ['promesa de citación', /te empiecen a citar|para que te (citen|recomienden|cite)|tu nombre ya est[eé] ah[ií]|mueve la aguja|mueve resultados/gi],
  ['NDA habitual', /\bNDA\b/g],
  ['rubros / especialización', /sectores donde la confianza|nos especializamos|finanzas, salud|rubros que atendemos/gi],
  ['más de cinco años', /m[aá]s de cinco a[ñn]os/gi],
  ['sin compromiso', /sin compromiso/gi],
  // Al día con el 30-oct (acta de QA del 30-oct, menor 12): Ramón volvió a poner el sitio a medida en el centro («Sitios web a
  // medida y marketing con IA»), así que «diseñamos y programamos sitios a medida» deja de ser posicionamiento anterior (era
  // falso positivo en la description nueva). Lo anterior ahora es la línea del 23-oct («Marketing y crecimiento con IA para
  // empresas que ya venden») y su titular («Te llegan consultas…»), además de las de E12.
  ['posicionamiento anterior', /estudio de dise[ñn]o y tecnolog[ií]a|no es una agencia de marketing|marketing y crecimiento con IA|te llegan consultas/gi],
  ['¿Listo para…?', /¿\s*listo para/gi],
  ['mismo chequeo que a cada sitio', /mismo chequeo (que|con el que)[^.<]{0,80}(construimos|proyecto)|le pasamos este chequeo antes/gi],
  ['rayas largas o medias', /[—–]/g],
];

const archivos = [];
(function rec(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (e.name === '_astro' || e.name === 'fonts') continue; rec(p); }
    else if (/\.(html|txt|xml)$/.test(e.name) || (/\.js$/.test(e.name) && p.includes(`${join('assets', 'js')}`))) archivos.push(p);
  }
})(dist);

// Se quita lo que no es contenido: comentarios HTML y los <style>. Se conservan <script> (JSON-LD y cadenas del chequeo).
const limpiar = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/gi, '');

const filas = new Map(); // término -> { total, porArchivo: Map }
let total = 0;
for (const f of archivos.sort()) {
  const rel = relative(dist, f);
  if (SOLO && !SOLO.test(rel)) continue;
  const txt = limpiar(readFileSync(f, 'utf8'));
  for (const [nombre, re] of TERMINOS) {
    for (const m of txt.matchAll(re)) {
      const ini = Math.max(0, m.index - 50);
      const ctx = txt.slice(ini, m.index + m[0].length + 50).replace(/\s+/g, ' ');
      if (!filas.has(nombre)) filas.set(nombre, { total: 0, por: new Map() });
      const fila = filas.get(nombre);
      fila.total++; total++;
      if (!fila.por.has(rel)) fila.por.set(rel, []);
      fila.por.get(rel).push(ctx);
    }
  }
}
for (const [nombre] of TERMINOS) {
  const fila = filas.get(nombre);
  console.log(`\n== ${nombre}: ${fila ? fila.total : 0}${fila ? ` en ${fila.por.size} archivos` : ''}`);
  if (!fila) continue;
  for (const [rel, ctxs] of fila.por) {
    console.log(`  ${rel} (${ctxs.length})`);
    if (!RESUMEN) ctxs.slice(0, 3).forEach((c) => console.log(`     …${c}…`));
  }
}
console.log(`\nTotal: ${total} hallazgos en ${archivos.length} archivos revisados.`);
