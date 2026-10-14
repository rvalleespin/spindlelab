/**
 * comparar.mjs · E8, paso 0. Compara dos extracciones de extraer.mjs y dice qué texto
 * cambió, ruta por ruta.
 *
 * USO
 *   node comparar.mjs <antes.json> <despues.json> [--md salida.md] [--json salida.json]
 *   Sin --md ni --json, el informe en Markdown sale por la salida estándar. Con alguno de
 *   los dos, por la salida estándar sale solo el resumen.
 *
 *   Código de salida: 0 si no hay ninguna diferencia, 1 si las hay, 2 si los argumentos o
 *   los archivos no sirven.
 *
 * CÓMO EMPAREJA. Cada ranura (y cada atributo, y cada hoja del JSON-LD) se busca primero
 * por su clave con el mismo texto; si no, por el mismo texto en otra clave («movida»: un
 * párrafo nuevo arriba corre la numeración de los de abajo); si no, por parecido dentro del
 * mismo grupo (ancla y etiqueta), y por último por la clave sola («cambiada» aunque se haya
 * reescrito entera). Lo que queda sin pareja es «agregada» o «quitada».
 *
 * QUÉ REPORTA, por ruta y por separado: texto visible, head, atributos, JSON-LD (textos y,
 * aparte, números y booleanos: los precios de las Offer), errores de JSON-LD, hashes de las
 * zonas cerradas que cambiaron y las invariantes (name de los formularios, ids chq-*,
 * precios del texto). Una misma diferencia en dos o más rutas (el menú, el pie, los nodos
 * del Layout) se escribe una vez, con la lista de rutas. El cambio va palabra por palabra:
 * [-lo que sale-]{+lo que entra+}, y el espacio duro se ve como ⍽.
 */

import fs from 'node:fs';
import path from 'node:path';

// --- argumentos -------------------------------------------------------------
const args = process.argv.slice(2);
const pos = [];
const op = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith('--')) {
    const v = args[i + 1];
    if (v !== undefined && !v.startsWith('--')) { op[a.slice(2)] = v; i++; } else op[a.slice(2)] = true;
  } else pos.push(a);
}
if (pos.length !== 2 || op.md === true || op.json === true) {
  console.error('Uso: node comparar.mjs <antes.json> <despues.json> [--md salida.md] [--json salida.json]');
  process.exit(2);
}
let A, B;
try {
  A = JSON.parse(fs.readFileSync(pos[0], 'utf8'));
  B = JSON.parse(fs.readFileSync(pos[1], 'utf8'));
} catch (e) {
  console.error(`No se pudo leer una de las extracciones: ${e.message}`);
  process.exit(2);
}
if (!A.rutas || !B.rutas) {
  console.error('Alguno de los dos archivos no es una extracción de extraer.mjs (falta «rutas»).');
  process.exit(2);
}

// --- palabra por palabra ------------------------------------------------------
// Fichas: el espacio duro solo, los espacios, las palabras (con sus números y guiones
// internos: «590.000», «mini-diagnóstico») y cada signo suelto.
const FICHA = / |[ \t\n\r]+|[\p{L}\p{N}]+(?:[.,\-'’/][\p{L}\p{N}]+)*|[^\s\p{L}\p{N}]/gu;
const fichas = (t) => t.match(FICHA) ?? [];
const ver = (t) => t.replace(/ /g, '⍽').replace(/</g, '&lt;');

function diffPalabras(a, b) {
  const x = fichas(a);
  const y = fichas(b);
  const n = x.length;
  const m = y.length;
  if (n * m > 4_000_000) return `[-${ver(a)}-]{+${ver(b)}+}`;
  // LCS clásico, de atrás hacia adelante.
  const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ops = [];
  let i = 0;
  let j = 0;
  const pon = (tipo, t) => {
    const u = ops[ops.length - 1];
    if (u && u.tipo === tipo) u.t += t; else ops.push({ tipo, t });
  };
  while (i < n && j < m) {
    if (x[i] === y[j]) { pon('=', x[i]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) { pon('-', x[i]); i++; } else { pon('+', y[j]); j++; }
  }
  while (i < n) pon('-', x[i++]);
  while (j < m) pon('+', y[j++]);
  return ops.map((o) => (o.tipo === '=' ? ver(o.t) : o.tipo === '-' ? `[-${ver(o.t)}-]` : `{+${ver(o.t)}+}`)).join('');
}

const palabras = (t) => new Set((t.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []));
function parecido(a, b) {
  const x = palabras(a);
  const y = palabras(b);
  if (!x.size && !y.size) return 1;
  let comun = 0;
  for (const w of x) if (y.has(w)) comun++;
  return comun / (x.size + y.size - comun);
}

// --- emparejar ------------------------------------------------------------------
// it: { clave, grupo, texto, ... }. Devuelve pares y sobrantes.
function emparejar(as, bs) {
  const usadoB = new Set();
  const parA = new Map();
  const porClaveB = new Map(bs.map((b, k) => [b.clave, k]));
  // 1 · misma clave, mismo texto
  as.forEach((a, k) => {
    const j = porClaveB.get(a.clave);
    if (j !== undefined && !usadoB.has(j) && bs[j].texto === a.texto) { parA.set(k, { j, tipo: 'igual' }); usadoB.add(j); }
  });
  // 2 · mismo texto, otra clave (de preferencia en el mismo grupo)
  const porTextoB = new Map();
  bs.forEach((b, j) => { if (!usadoB.has(j)) { if (!porTextoB.has(b.texto)) porTextoB.set(b.texto, []); porTextoB.get(b.texto).push(j); } });
  as.forEach((a, k) => {
    if (parA.has(k)) return;
    const cand = (porTextoB.get(a.texto) ?? []).filter((j) => !usadoB.has(j));
    if (!cand.length) return;
    const j = cand.find((c) => bs[c].grupo === a.grupo) ?? cand[0];
    parA.set(k, { j, tipo: 'movida' });
    usadoB.add(j);
  });
  // 3 · parecido dentro del mismo grupo (la misma clave suma)
  as.forEach((a, k) => {
    if (parA.has(k)) return;
    let mejor = null;
    bs.forEach((b, j) => {
      if (usadoB.has(j) || b.grupo !== a.grupo) return;
      const p = parecido(a.texto, b.texto) + (b.clave === a.clave ? 0.15 : 0);
      if (p >= 0.35 && (!mejor || p > mejor.p)) mejor = { j, p };
    });
    if (mejor) { parA.set(k, { j: mejor.j, tipo: 'cambiada' }); usadoB.add(mejor.j); }
  });
  // 4 · la misma clave, aunque el texto sea otro entero
  as.forEach((a, k) => {
    if (parA.has(k)) return;
    const j = porClaveB.get(a.clave);
    if (j !== undefined && !usadoB.has(j)) { parA.set(k, { j, tipo: 'cambiada' }); usadoB.add(j); }
  });
  const difs = [];
  as.forEach((a, k) => {
    const p = parA.get(k);
    if (!p) { difs.push({ tipo: 'quitada', a }); return; }
    if (p.tipo === 'igual') return;
    difs.push({ tipo: p.tipo, a, b: bs[p.j] });
  });
  bs.forEach((b, j) => { if (!usadoB.has(j)) difs.push({ tipo: 'agregada', b }); });
  return difs;
}

const sinRuta = (clave, ruta) => (clave.startsWith(ruta + '#') ? clave.slice(ruta.length + 1) : clave);

// --- comparar ruta por ruta ---------------------------------------------------------
const rutas = [...new Set([...Object.keys(A.rutas), ...Object.keys(B.rutas)])].sort();
const items = []; // { ruta, cat, tipo, clave, antes, despues, nota, zonas }
const avisos = [];

const cat = {
  ruta: 'Rutas',
  texto: 'Texto visible',
  head: 'Head',
  atributo: 'Atributos',
  jsonld: 'JSON-LD (textos)',
  jsonldOtro: 'JSON-LD (números y booleanos)',
  jsonldError: 'JSON-LD que no parsea',
  zona: 'Zonas cerradas',
  invariante: 'Invariantes',
};

for (const ruta of rutas) {
  const ra = A.rutas[ruta];
  const rb = B.rutas[ruta];
  if (!ra || !rb) {
    items.push({ ruta, cat: 'ruta', tipo: ra ? 'quitada' : 'agregada', clave: ruta, antes: ra ? `HTTP ${ra.estado}` : '', despues: rb ? `HTTP ${rb.estado}` : '' });
    continue;
  }
  if (ra.estado !== rb.estado) items.push({ ruta, cat: 'ruta', tipo: 'cambiada', clave: ruta, antes: `HTTP ${ra.estado}`, despues: `HTTP ${rb.estado}` });
  if (rb.erroresJs?.length && JSON.stringify(rb.erroresJs) !== JSON.stringify(ra.erroresJs ?? [])) avisos.push(`${ruta}: errores de JavaScript nuevos: ${rb.erroresJs.join(' | ')}`);

  // Texto visible
  const prep = (x) => ({ ...x, grupo: sinRuta(x.clave, ruta).replace(/:\d+$/, '') });
  for (const d of emparejar((ra.ranuras ?? []).map(prep), (rb.ranuras ?? []).map(prep))) {
    items.push({
      ruta, cat: 'texto', tipo: d.tipo,
      clave: sinRuta((d.b ?? d.a).clave, ruta),
      claveAntes: d.a && d.b && d.a.clave !== d.b.clave ? sinRuta(d.a.clave, ruta) : undefined,
      antes: d.a?.texto, despues: d.b?.texto,
      zonas: [...new Set([...(d.a?.zonas ?? []), ...(d.b?.zonas ?? [])])],
      oculto: !!(d.b ?? d.a).oculto,
    });
  }

  // Head
  const ha = new Map((ra.head ?? []).map((h) => [h.clave, h.valor]));
  const hb = new Map((rb.head ?? []).map((h) => [h.clave, h.valor]));
  for (const k of new Set([...ha.keys(), ...hb.keys()])) {
    if (ha.get(k) === hb.get(k)) continue;
    items.push({ ruta, cat: 'head', tipo: !ha.has(k) ? 'agregada' : !hb.has(k) ? 'quitada' : 'cambiada', clave: k, antes: ha.get(k), despues: hb.get(k) });
  }

  // Atributos
  const prepA = (x) => ({ ...x, texto: x.valor, grupo: sinRuta(x.clave, ruta).replace(/:\d+$/, '') });
  for (const d of emparejar((ra.atributos ?? []).map(prepA), (rb.atributos ?? []).map(prepA))) {
    items.push({
      ruta, cat: 'atributo', tipo: d.tipo,
      clave: sinRuta((d.b ?? d.a).clave, ruta),
      claveAntes: d.a && d.b && d.a.clave !== d.b.clave ? sinRuta(d.a.clave, ruta) : undefined,
      antes: d.a?.valor, despues: d.b?.valor,
      zonas: [...new Set([...(d.a?.zonas ?? []), ...(d.b?.zonas ?? [])])],
    });
  }

  // JSON-LD
  const prepJ = (x) => ({ clave: x.ruta, texto: x.valor, grupo: x.ruta.replace(/\[\d+\]/g, '[]') });
  for (const [campo, c] of [['jsonld', 'jsonld'], ['jsonldOtros', 'jsonldOtro']]) {
    for (const d of emparejar((ra[campo] ?? []).map(prepJ), (rb[campo] ?? []).map(prepJ))) {
      items.push({
        ruta, cat: c, tipo: d.tipo,
        clave: (d.b ?? d.a).clave,
        claveAntes: d.a && d.b && d.a.clave !== d.b.clave ? d.a.clave : undefined,
        antes: d.a?.texto, despues: d.b?.texto,
      });
    }
  }
  const ea = JSON.stringify(ra.jsonldErrores ?? []);
  const eb = JSON.stringify(rb.jsonldErrores ?? []);
  if (ea !== eb) items.push({ ruta, cat: 'jsonldError', tipo: 'cambiada', clave: 'jsonldErrores', antes: ea, despues: eb });

  // Zonas cerradas
  const za = ra.zonasCerradas ?? {};
  const zb = rb.zonasCerradas ?? {};
  for (const z of new Set([...Object.keys(za), ...Object.keys(zb)])) {
    const x = za[z];
    const y = zb[z];
    if (x && y && x.hash === y.hash && x.n === y.n) continue;
    items.push({
      ruta, cat: 'zona', tipo: !x ? 'agregada' : !y ? 'quitada' : 'cambiada', clave: z,
      antes: x ? `hash ${x.hash} · texto ${x.hashTexto} · ${x.n} elemento(s) · ${x.largo} car.` : undefined,
      despues: y ? `hash ${y.hash} · texto ${y.hashTexto} · ${y.n} elemento(s) · ${y.largo} car.` : undefined,
      nota: x && y ? (x.hashTexto === y.hashTexto ? 'mismo texto, cambió el marcado' : 'cambió el texto') : undefined,
    });
  }

  // Invariantes
  const ia = ra.invariantes ?? {};
  const ib = rb.invariantes ?? {};
  const fa = new Map((ia.formularios ?? []).map((f) => [f.form, f.names.join(' | ')]));
  const fb = new Map((ib.formularios ?? []).map((f) => [f.form, f.names.join(' | ')]));
  for (const k of new Set([...fa.keys(), ...fb.keys()])) {
    if (fa.get(k) !== fb.get(k)) items.push({ ruta, cat: 'invariante', tipo: 'cambiada', clave: `name del formulario ${k}`, antes: fa.get(k), despues: fb.get(k) });
  }
  if ((ia.idsChq ?? []).join(' ') !== (ib.idsChq ?? []).join(' ')) items.push({ ruta, cat: 'invariante', tipo: 'cambiada', clave: 'ids chq-*', antes: (ia.idsChq ?? []).join(' '), despues: (ib.idsChq ?? []).join(' ') });
  const pa = JSON.stringify(ia.precios ?? {});
  const pb = JSON.stringify(ib.precios ?? {});
  if (pa !== pb) {
    const fmt = (p) => Object.entries(p).map(([k, v]) => `${k}×${v}`).join(' ');
    items.push({ ruta, cat: 'invariante', tipo: 'cambiada', clave: 'precios del texto visible', antes: fmt(ia.precios ?? {}), despues: fmt(ib.precios ?? {}) });
  }
}

// --- lo común: la misma diferencia en dos o más rutas --------------------------------
const firma = (it) => JSON.stringify([it.cat, it.tipo, it.clave, it.claveAntes ?? '', it.antes ?? null, it.despues ?? null]);
const grupos = new Map();
for (const it of items) {
  if (it.cat === 'ruta') continue;
  const f = firma(it);
  if (!grupos.has(f)) grupos.set(f, []);
  grupos.get(f).push(it);
}
const comunes = [...grupos.values()].filter((g) => g.length >= 2);
const enComun = new Set(comunes.flat());

// --- totales ----------------------------------------------------------------------
const totales = {};
for (const it of items) {
  const k = `${cat[it.cat]} · ${it.tipo}`;
  totales[k] = (totales[k] ?? 0) + 1;
}
const total = items.length;

// --- informe -------------------------------------------------------------------------
const linea = (it, conRuta = false) => {
  const marcas = [it.oculto ? 'oculto' : '', ...(it.zonas ?? []).filter((z) => !['menu', 'pie'].includes(z))].filter(Boolean);
  const etq = marcas.length ? ` _(${marcas.join(', ')})_` : '';
  const donde = conRuta ? `\`${it.ruta}\` ` : '';
  if (it.tipo === 'cambiada') {
    const mov = it.claveAntes ? ` (antes \`${it.claveAntes}\`)` : '';
    const cuerpo = it.cat === 'zona' || it.cat === 'invariante' || it.cat === 'jsonldError' || it.cat === 'ruta'
      ? `antes: ${ver(String(it.antes ?? '∅'))} → después: ${ver(String(it.despues ?? '∅'))}${it.nota ? ` · **${it.nota}**` : ''}`
      : diffPalabras(String(it.antes ?? ''), String(it.despues ?? ''));
    return `- ${donde}**cambiada** \`${it.clave}\`${mov}${etq}: ${cuerpo}`;
  }
  if (it.tipo === 'movida') return `- ${donde}**movida** \`${it.claveAntes}\` → \`${it.clave}\`${etq}: «${ver(String(it.despues))}»`;
  if (it.tipo === 'agregada') return `- ${donde}**agregada** \`${it.clave}\`${etq}: {+${ver(String(it.despues ?? ''))}+}`;
  return `- ${donde}**quitada** \`${it.clave}\`${etq}: [-${ver(String(it.antes ?? ''))}-]`;
};

const md = [];
md.push('# Comparación de copy (E8)');
md.push('');
md.push(`- Antes: \`${path.basename(pos[0])}\` (${A.totales?.rutas ?? Object.keys(A.rutas).length} rutas, ${A.totales?.ranuras ?? '?'} ranuras, base ${A.base ?? '?'}, ${A.ancho ?? '?'}×${A.alto ?? '?'})`);
md.push(`- Después: \`${path.basename(pos[1])}\` (${B.totales?.rutas ?? Object.keys(B.rutas).length} rutas, ${B.totales?.ranuras ?? '?'} ranuras, base ${B.base ?? '?'}, ${B.ancho ?? '?'}×${B.alto ?? '?'})`);
md.push('- Notación: `[-sale-]{+entra+}`; ⍽ es un espacio duro. Las marcas en cursiva son zonas (hero, bio, chq…) u «oculto».');
md.push('');
md.push(`**${total ? `${total} diferencia${total === 1 ? '' : 's'}` : 'Sin diferencias'}** en ${rutas.length} rutas.`);
md.push('');
if (total) {
  md.push('| Categoría · tipo | n |');
  md.push('|---|---:|');
  for (const [k, v] of Object.entries(totales).sort()) md.push(`| ${k} | ${v} |`);
  md.push('');
}
if (avisos.length) {
  md.push('## Avisos (no cuentan como diferencia)');
  md.push('');
  for (const a of avisos) md.push(`- ${a}`);
  md.push('');
}
if (comunes.length) {
  md.push('## Común a varias rutas');
  md.push('');
  for (const g of comunes) {
    const r = g.map((x) => x.ruta);
    md.push(`${linea(g[0])} · en ${r.length} rutas: ${r.length > 6 ? `${r.slice(0, 3).join(', ')} … ${r.slice(-2).join(', ')}` : r.join(', ')}`);
  }
  md.push('');
}
const porRuta = new Map();
for (const it of items) {
  if (enComun.has(it)) continue;
  if (!porRuta.has(it.ruta)) porRuta.set(it.ruta, []);
  porRuta.get(it.ruta).push(it);
}
if (porRuta.size) {
  md.push('## Por ruta');
  md.push('');
  for (const ruta of rutas) {
    const lista = porRuta.get(ruta);
    if (!lista) continue;
    md.push(`### ${ruta}`);
    md.push('');
    for (const c of Object.keys(cat)) {
      const de = lista.filter((x) => x.cat === c);
      if (!de.length) continue;
      md.push(`#### ${cat[c]}`);
      md.push('');
      for (const it of de) md.push(linea(it));
      md.push('');
    }
  }
}
const textoMd = md.join('\n') + '\n';

if (typeof op.md === 'string') fs.writeFileSync(op.md, textoMd);
if (typeof op.json === 'string') {
  fs.writeFileSync(op.json, JSON.stringify({
    antes: pos[0], despues: pos[1], total, totales, avisos,
    comunes: comunes.map((g) => ({ ...g[0], ruta: undefined, rutas: g.map((x) => x.ruta) })),
    items,
  }, null, 2) + '\n');
}
if (typeof op.md === 'string' || typeof op.json === 'string') {
  console.log(total ? `${total} diferencia${total === 1 ? '' : 's'} en ${rutas.length} rutas.` : `Sin diferencias en ${rutas.length} rutas.`);
  for (const [k, v] of Object.entries(totales).sort()) console.log(`  ${k}: ${v}`);
  for (const a of avisos) console.log(`  aviso: ${a}`);
} else {
  process.stdout.write(textoMd);
}
// exitCode y no exit(): con la salida en una tubería, exit() puede cortar el informe a medias.
process.exitCode = total ? 1 : 0;
