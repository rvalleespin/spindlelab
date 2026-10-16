#!/usr/bin/env node
// generar.mjs · E10 · fotos con IA para el sitio v3 (Bruno, 16-oct-2026)
//
// Lee pauta.json (al lado de este archivo) y genera las fotos con uno de dos proveedores:
//   · Gemini: modelo gemini-2.5-flash-image, clave en GEMINI_API_KEY
//   · OpenAI: modelo gpt-image-1, clave en OPENAI_API_KEY
// Node 22, sin dependencias: fetch, crypto y zlib nativos.
//
// Reglas que este script hace cumplir (pauta.md, «Uso»):
//   · Una sola numeración, la del tablero: cada ficha de pauta.json es un espacio de foto de
//     tableros/e10-direcciones/espacios-foto.json (número + dirección). Si la pauta y los espacios
//     no calzan (falta el archivo, un espacio sin ficha, una ficha sin espacio, otra página u otra
//     medida, la tabla de equivalencia con vacíos, una ficha sin sus dos recortes), NO genera:
//     termina con código 2 y la lista de lo que no calza. --verificar lo muestra sin generar.
//   · El encuadre de cada ficha es el de su dirección: no es un campo que se pueda equivocar.
//   · Sin --tope no genera nada: lista lo que pediría, cuántas llamadas y cuánto costaría, y no
//     toca la red. --tope es el número máximo de imágenes que la corrida puede pedir.
//   · La clave nunca se imprime ni se guarda: ni en el registro, ni en los errores (se tapa).
//   · Cada archivo que llega se valida como imagen (firma y dimensiones) antes de guardarlo, y
//     se le mide el oro con el criterio del manual §07b (el mismo cálculo HSV de PIL). Desde la v3
//     (16-oct) es solo un dato: el logo se rediseña después de elegir dirección y el oro no descarta.
//   · Cada imagen queda en salida/<F>-<dirección>-<n>.png (F8-taller-1.png), con su línea en
//     salida/registro.json.
//   · Lo que se manda es lo que se revisó: si pauta.json cambió y no se corrió --sincronizar
//     (prompt_completo_en y pauta.md), no genera.
//
// Uso rápido:
//   node generar.mjs                              lista toda la pauta y la comprobación (sin red)
//   node generar.mjs --verificar                  solo la comprobación contra el tablero (sin red)
//   node generar.mjs --tope=18                    genera las 9 fichas, 2 variantes c/u
//   node generar.mjs --solo=F1,F8 --variantes=3 --tope=9 --proveedor=openai
//   node generar.mjs --direccion=pizarra --tope=6 solo las de Pizarra limpia
//   node generar.mjs --ver --solo=F2              imprime el prompt completo (sin red)
//   node generar.mjs --medir=salida/F1-taller-1.png   mide oro en archivos PNG (sin red)
//   node generar.mjs --sincronizar                reescribe prompt_completo_en y pauta.md
//   node generar.mjs --ayuda

import { readFile, writeFile, mkdir, rename, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { inflateSync, deflateSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { armarPautaMd } from './pauta-md.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PAUTA = path.join(DIR, 'pauta.json');
const PAUTA_MD = path.join(DIR, 'pauta.md');
// Los espacios de foto que Lucía numera en el tablero: la numeración que manda.
const ESPACIOS_LUCIA = path.resolve(DIR, '../../tableros/e10-direcciones/espacios-foto.json');
const ESPACIOS_REL = 'tableros/e10-direcciones/espacios-foto.json';

// Las dos direcciones: la clave corta de la pauta y el nombre que usa espacios-foto.json.
const DIRECCIONES = { taller: 'Taller', pizarra: 'Pizarra limpia' };
const DIRECCION_DE_NOMBRE = Object.fromEntries(Object.entries(DIRECCIONES).map(([k, v]) => [v, k]));
const TAMANOS_OPENAI = new Set(['1024x1024', '1536x1024', '1024x1536']);
// Cobertura que pide el tablero (nota de espacios-foto.json): 1× a 1440 y 2× a 390.
const COBERTURA_MIN = { 1440: 1, 390: 2 };

const PROVEEDORES = {
  gemini: {
    variable: 'GEMINI_API_KEY',
    modelo: 'gemini-2.5-flash-image',
    nombre: 'Gemini (Google)',
    consola: 'https://aistudio.google.com/apikey',
  },
  openai: {
    variable: 'OPENAI_API_KEY',
    modelo: 'gpt-image-1',
    nombre: 'OpenAI',
    consola: 'https://platform.openai.com/api-keys',
  },
};
const TIEMPO_MAX_MS = 240_000;
const REINTENTABLES = new Set([429, 500, 502, 503, 504]);
const ORO_ALERTA_PCT = 0.05; // el máximo del pool limpio (manual §07b); en pausa con el logo: solo se anota

// ---------------------------------------------------------------- la clave no sale nunca
const SECRETOS = [process.env.GEMINI_API_KEY, process.env.OPENAI_API_KEY]
  .map((s) => (s ?? '').trim())
  .filter((s) => s.length >= 6);

function ocultar(texto) {
  let t = String(texto ?? '');
  for (const s of SECRETOS) t = t.split(s).join('[clave oculta]');
  // Por si un proveedor devuelve la clave recortada o enmascarada en su mensaje de error.
  return t
    .replace(/sk-[A-Za-z0-9_\-*.]{6,}/g, '[clave oculta]')
    .replace(/AIza[0-9A-Za-z_\-]{10,}/g, '[clave oculta]');
}
const decir = (...a) => console.log(ocultar(a.join(' ')));
const avisar = (...a) => console.error(ocultar(a.join(' ')));

class ErrorUso extends Error {}          // argumentos o pauta: código 2
class ErrorClave extends Error {}        // falta la clave: código 2
class ErrorApi extends Error {           // el proveedor respondió con error
  constructor(estado, mensaje, fatal) {
    super(mensaje);
    this.estado = estado;
    this.fatal = fatal;
  }
}
class SinImagen extends Error {}         // respondió 200 pero sin imagen (bloqueo, filtro)
class NoEsImagen extends Error {}        // llegó algo que no es una imagen válida

// ---------------------------------------------------------------- argumentos
const OPCIONES = {
  solo: 'valor', prioridad: 'valor', direccion: 'valor', variantes: 'valor', tope: 'valor',
  proveedor: 'valor', modelo: 'valor', calidad: 'valor', tamano: 'valor', salida: 'valor',
  medir: 'valor', ver: 'bandera', sincronizar: 'bandera', verificar: 'bandera', ayuda: 'bandera',
};

function leerArgs(argv) {
  const a = {};
  for (const arg of argv) {
    if (arg === '-h' || arg === '--help') { a.ayuda = true; continue; }
    const m = /^--([a-z]+)(?:=(.*))?$/s.exec(arg);
    if (!m || !(m[1] in OPCIONES)) throw new ErrorUso(`Argumento desconocido: ${arg}. Usa --ayuda.`);
    const [, k, v] = m;
    if (OPCIONES[k] === 'bandera') {
      if (v !== undefined) throw new ErrorUso(`--${k} no lleva valor.`);
      a[k] = true;
    } else {
      if (v === undefined || v.trim() === '') throw new ErrorUso(`--${k} necesita un valor: --${k}=…`);
      a[k] = v.trim();
    }
  }
  return a;
}

function entero(valor, nombre, min, max) {
  if (!/^\d+$/.test(String(valor))) throw new ErrorUso(`--${nombre} tiene que ser un entero (llegó «${valor}»).`);
  const n = Number(valor);
  if (n < min || n > max) throw new ErrorUso(`--${nombre} tiene que estar entre ${min} y ${max} (llegó ${n}).`);
  return n;
}

function ayuda() {
  decir(`generar.mjs · fotos E10 con IA (pauta.json al lado de este archivo)

Sin --tope NO genera: lista lo que pediría y su costo, sin tocar la red.
Tampoco genera si la pauta no calza con los espacios del tablero (${ESPACIOS_REL}).

  --verificar         compara la pauta con los espacios del tablero y nada más (sin red)
  --solo=F1,F8        solo esos números del tablero (F8 trae sus dos fichas, una por
                      dirección); también se puede pedir una sola: --solo=F8-taller
  --prioridad=N       solo fotos con prioridad ≤ N (hoy las 9 fichas son prioridad 1)
  --direccion=D       solo fotos de la dirección «taller» o «pizarra»
  --variantes=N       variantes por foto (por defecto 2, máximo 8)
  --tope=N            OBLIGATORIO para generar: máximo de imágenes de la corrida (1 a 200).
                      Si el plan pide más, se corta en orden de prioridad, primero una
                      variante de cada foto y después las segundas.
  --proveedor=P       gemini u openai (por defecto: el que tenga clave; Gemini primero)
  --modelo=M          otro modelo del mismo proveedor (por defecto gemini-2.5-flash-image
                      o gpt-image-1)
  --calidad=Q         OpenAI: low, medium o high (por defecto high)
  --tamano=T          Gemini: imageSize 1K, 2K o 4K (solo modelos que lo acepten; el
                      2.5 Flash no lo necesita)
  --ver               imprime el prompt completo de cada foto elegida (sin red)
  --medir=a.png,b.png mide oro en PNG ya guardados (sin red; es un dato, el oro está
                      en pausa con el logo)
  --sincronizar       reescribe prompt_completo_en en pauta.json desde sus partes, y pauta.md
  --salida=DIR        carpeta de salida (por defecto salida/; para pruebas)

Salidas: salida/<F>-<dirección>-<n>.png, por ejemplo F8-taller-1.png.

Claves: GEMINI_API_KEY u OPENAI_API_KEY en el entorno. Nunca en el chat ni en el repo.`);
  return 0;
}

// ---------------------------------------------------------------- pauta y prompt
async function leerPauta() {
  let texto;
  try { texto = await readFile(PAUTA, 'utf8'); }
  catch { throw new ErrorUso(`No encuentro ${PAUTA}.`); }
  try { return JSON.parse(texto); }
  catch (e) { throw new ErrorUso(`pauta.json no es JSON válido: ${e.message}`); }
}

const clave = (f) => `${f.id}-${f.direccion}`;

// El encuadre sale de la dirección de la ficha: una ficha de Taller no puede llevar el de Pizarra.
function componer(pauta, foto) {
  const e = pauta.estilo;
  if (!(foto.direccion in DIRECCIONES)) throw new ErrorUso(`${foto.id}: dirección «${foto.direccion}» no es «taller» ni «pizarra».`);
  const encuadre = e.encuadre?.[foto.direccion]?.en;
  if (!encuadre) throw new ErrorUso(`${foto.id}: falta estilo.encuadre.${foto.direccion}.`);
  const negativos = [...(foto.negativo_en ?? []), ...(e.negativo_en ?? [])];
  return [
    foto.escena_en.trim(),
    encuadre,
    e.comun_en,
    e.texto_en,
    foto.personas > 0 ? e.personas_en : e.sin_personas_en,
    `Avoid: ${negativos.join('; ')}.`,
  ].join('\n\n');
}

function desincronizadas(pauta) {
  return pauta.fotos.filter((f) => componer(pauta, f) !== f.prompt_completo_en).map(clave);
}

async function leerMd() {
  try { return await readFile(PAUTA_MD, 'utf8'); } catch { return null; }
}

const mdAlDia = async (pauta) => (await leerMd()) === armarPautaMd(pauta, AYUDAS_MD);

async function sincronizar(pauta) {
  const antes = desincronizadas(pauta);
  for (const f of pauta.fotos) f.prompt_completo_en = componer(pauta, f);
  const tmp = `${PAUTA}.tmp`;
  await writeFile(tmp, `${JSON.stringify(pauta, null, 2)}\n`);
  await rename(tmp, PAUTA);
  const md = armarPautaMd(pauta, AYUDAS_MD);
  const mdCambio = (await leerMd()) !== md;
  if (mdCambio) await escribirAtomico(PAUTA_MD, md);
  decir(antes.length
    ? `pauta.json: prompt_completo_en reescrito en ${antes.join(', ')}. Revisa el diff antes de generar.`
    : 'pauta.json: prompt_completo_en ya estaba al día.');
  decir(mdCambio ? 'pauta.md: reescrito desde pauta.json.' : 'pauta.md: ya estaba al día.');
  const c = conciliar(pauta, await leerEspacios());
  decir('');
  imprimirConciliacion(c);
  return 0;
}

// ---------------------------------------------------------------- la pauta contra el tablero
// Lo que manda es espacios-foto.json de Lucía: el número y la dirección de cada espacio, su página
// y su medida en px CSS a 1440 y a 390. Cada ficha guarda una copia de eso (espacio) y la tabla de
// equivalencia registra de qué foto de la v1 viene. Si algo no calza, se bloquea la generación.
async function leerEspacios() {
  let texto;
  try { texto = await readFile(ESPACIOS_LUCIA, 'utf8'); }
  catch { return { error: `No encuentro ${ESPACIOS_REL}: sin los espacios del tablero no hay contra qué comprobar los F<n>.` }; }
  try {
    const lista = JSON.parse(texto);
    if (!Array.isArray(lista)) throw new Error('no es una lista');
    return { lista };
  } catch (e) { return { error: `${ESPACIOS_REL} no se puede leer como lista JSON (${e.message}).` }; }
}

const RAZONES = [[0.5625, '9:16'], [0.58, '0,58'], [0.8, '4:5'], [1, '1:1'], [1.25, '5:4'], [4 / 3, '4:3'], [1.5, '3:2'], [16 / 9, '16:9'], [7 / 3, '21:9']];

// La proporción de un espacio medido en px CSS (los px vienen redondeados: 390×488 es 4:5).
function proporcion([w, h]) {
  const r = w / h;
  const [cerca, nombre] = RAZONES.reduce((m, x) => (Math.abs(x[0] - r) < Math.abs(m[0] - r) ? x : m));
  return Math.abs(cerca - r) / cerca <= 0.01 ? { r: cerca, nombre } : { r, nombre: r.toFixed(2).replace('.', ',') };
}

const px = (s) => s.split(/[×x]/).map(Number);

// Lo que entrega cada proveedor para una ficha, el recorte desde el centro para cada ancho y
// cuántos px del archivo caen en cada px CSS del espacio (cobertura).
function formatos(pauta, f) {
  const fuentes = {
    gemini: px(pauta.modelos.gemini.salidas_px[f.gemini?.aspectRatio] ?? '0×0'),
    openai: px(f.openai?.size ?? '0x0'),
  };
  const out = {};
  for (const [prov, [w, h]] of Object.entries(fuentes)) {
    out[prov] = { fuente: [w, h], vistas: {} };
    for (const ancho of ['1440', '390']) {
      const css = f.espacio[`css_${ancho}`];
      const { r, nombre } = proporcion(css);
      const [cw, ch] = w / h > r ? [Math.round(h * r), h] : [w, Math.round(w / r)];
      const cobertura = cw / css[0];
      out[prov].vistas[ancho] = {
        proporcion: nombre, recorte: [cw, ch], cobertura,
        corta: Math.max(1 - cw / w, 1 - ch / h), alcanza: cobertura >= COBERTURA_MIN[ancho] - 0.005,
      };
    }
  }
  return out;
}

const iguales = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const veces = (n) => `${n.toFixed(2).replace('.', ',')}×`;

function conciliar(pauta, espacios) {
  const bloqueos = [];
  const avisos = [];
  const fotos = pauta.fotos ?? [];
  const tabla = pauta.equivalencia_lucia?.tabla ?? [];

  // La pauta por sí sola: direcciones válidas, sin duplicados, recortes escritos, formatos que existen.
  const vistas = new Map();
  for (const f of fotos) {
    const k = clave(f);
    if (!(f.direccion in DIRECCIONES)) bloqueos.push(`${f.id}: la dirección «${f.direccion}» no es «taller» ni «pizarra».`);
    if ('encuadre' in f && f.encuadre !== f.direccion) bloqueos.push(`${k}: trae encuadre «${f.encuadre}»; el encuadre de una ficha es el de su dirección.`);
    if (vistas.has(k)) bloqueos.push(`${k}: hay dos fichas con el mismo número y la misma dirección.`);
    vistas.set(k, f);
    if (!/^F\d+$/.test(String(f.id))) bloqueos.push(`${f.id}: no tiene forma de número del tablero (F<n>). Una foto sin espacio va en «reservas», no en «fotos».`);
    if (!f.espacio?.css_1440 || !f.espacio?.css_390) { bloqueos.push(`${k}: le falta espacio.css_1440 o espacio.css_390.`); continue; }
    if (!pauta.modelos.gemini.salidas_px[f.gemini?.aspectRatio]) bloqueos.push(`${k}: gemini.aspectRatio «${f.gemini?.aspectRatio}» no está en modelos.gemini.salidas_px.`);
    if (!TAMANOS_OPENAI.has(f.openai?.size)) bloqueos.push(`${k}: openai.size «${f.openai?.size}» no es 1024x1024, 1536x1024 ni 1024x1536.`);
    for (const ancho of ['1440', '390']) {
      if (!String(f.recorte?.[ancho] ?? '').trim()) bloqueos.push(`${k}: falta recorte.${ancho} (qué se recorta y qué tiene que quedar dentro a ${ancho}).`);
    }
  }

  // Contra el tablero.
  const filas = [];
  if (espacios.error) {
    bloqueos.push(espacios.error);
  } else {
    const vistosEsp = new Set();
    for (const e of espacios.lista) {
      const dir = DIRECCION_DE_NOMBRE[e.direccion];
      const k = `${e.id}-${dir ?? e.direccion}`;
      const fila = { clave: k, id: e.id, direccion: dir, pagina: e.pagina, css_1440: [e.ancho_px_1440, e.alto_px_1440], css_390: [e.ancho_px_390, e.alto_px_390], estado: 'calza' };
      filas.push(fila);
      if (!dir) { bloqueos.push(`Espacio ${e.id}: dirección «${e.direccion}» desconocida.`); fila.estado = 'dirección desconocida'; continue; }
      if (vistosEsp.has(k)) { bloqueos.push(`Espacio ${k}: aparece dos veces en ${ESPACIOS_REL}.`); fila.estado = 'repetido'; continue; }
      vistosEsp.add(k);
      const f = vistas.get(k);
      const t = tabla.filter((x) => x.tablero === e.id && x.direccion === dir);
      if (t.length !== 1 || !t[0].pauta_v1) {
        bloqueos.push(`Espacio ${k}: la tabla de equivalencia ${t.length === 0 ? 'no tiene su fila' : t.length > 1 ? 'lo tiene repetido' : 'tiene la celda pauta_v1 vacía'}.`);
        fila.estado = 'tabla con vacío';
      }
      if (!f) { bloqueos.push(`Espacio ${k} (${e.pagina}, ${e.ancho_px_1440}×${e.alto_px_1440}): no tiene ficha en la pauta. Escribe su ficha con ese número y esa dirección.`); fila.estado = 'sin ficha'; continue; }
      fila.foto = f;
      const dif = [];
      if (f.espacio?.pagina !== e.pagina) dif.push(`página «${f.espacio?.pagina}» → «${e.pagina}»`);
      if (!iguales(f.espacio?.css_1440, fila.css_1440)) dif.push(`a 1440 ${f.espacio?.css_1440?.join('×')} → ${fila.css_1440.join('×')}`);
      if (!iguales(f.espacio?.css_390, fila.css_390)) dif.push(`a 390 ${f.espacio?.css_390?.join('×')} → ${fila.css_390.join('×')}`);
      if (dif.length) { bloqueos.push(`${k}: el espacio cambió en el tablero (${dif.join('; ')}). Revisa la ficha (proporción, recortes) y copia los valores nuevos.`); fila.estado = 'el espacio cambió'; }
      if (e.rotulo && f.espacio?.rotulo_tablero && e.rotulo !== f.espacio.rotulo_tablero) {
        avisos.push(`${k}: el rótulo del tablero cambió («${f.espacio.rotulo_tablero}» → «${e.rotulo}»). Mira si la foto sigue siendo la que pide.`);
      }
    }
    for (const f of fotos) {
      if (!vistosEsp.has(clave(f))) bloqueos.push(`Ficha ${clave(f)}: no tiene espacio en ${ESPACIOS_REL}. Sale a «reservas» (no se genera) o se le pide el espacio a Lucía.`);
    }
    for (const t of tabla) {
      if (!vistosEsp.has(`${t.tablero}-${t.direccion}`)) bloqueos.push(`Tabla de equivalencia: la fila ${t.tablero}-${t.direccion} no es un espacio del tablero.`);
    }
  }

  // Cobertura: no bloquea (estos modelos no llegan a 2× en las bandas), pero se dice.
  for (const f of fotos) {
    if (!f.espacio?.css_1440 || !f.espacio?.css_390 || !pauta.modelos.gemini.salidas_px[f.gemini?.aspectRatio] || !TAMANOS_OPENAI.has(f.openai?.size)) continue;
    const fm = formatos(pauta, f);
    for (const prov of ['gemini', 'openai']) {
      for (const ancho of ['1440', '390']) {
        const v = fm[prov].vistas[ancho];
        if (!v.alcanza) avisos.push(`${clave(f)} con ${prov}: a ${ancho} el recorte da ${v.recorte.join('×')} para ${f.espacio[`css_${ancho}`].join('×')} css (${veces(v.cobertura)}; el tablero pide ${COBERTURA_MIN[ancho]}×).`);
      }
    }
  }
  return { bloqueos, avisos, filas, sinArchivo: Boolean(espacios.error) };
}

function imprimirConciliacion(c) {
  decir(`Pauta contra el tablero (${ESPACIOS_REL}):`);
  for (const fila of c.filas) {
    decir(`  ${fila.clave.padEnd(11)} ${fila.estado === 'calza' ? '✓' : '✗'} ${fila.estado.padEnd(18)} ${fila.pagina.split(' (')[0]} · ${fila.css_1440.join('×')} a 1440 · ${fila.css_390.join('×')} a 390${fila.foto ? ` · ${fila.foto.titulo_es}` : ''}`);
  }
  if (c.avisos.length) {
    decir('');
    decir(`Avisos (no bloquean): ${c.avisos.length}`);
    for (const a of c.avisos) decir(`  · ${a}`);
  }
  decir('');
  if (c.bloqueos.length) {
    decir(`NO SE PUEDE GENERAR: ${c.bloqueos.length} cosa(s) no calzan.`);
    for (const b of c.bloqueos) decir(`  ✗ ${b}`);
  } else {
    decir(`La pauta calza con el tablero: ${c.filas.length} espacios, ${c.filas.length} fichas, ningún vacío en la tabla.`);
  }
}

const numero = (id) => Number(String(id).replace(/\D/g, ''));
const ORDEN_DIR = { taller: 0, pizarra: 1 };

function seleccionar(pauta, args) {
  let fotos = [...pauta.fotos];
  if (args.solo) {
    const pedidas = args.solo.split(',').map((s) => s.trim()).filter(Boolean)
      .map((s) => s.replace(/^f/i, 'F').replace(/-(taller|pizarra)$/i, (m) => m.toLowerCase()));
    const disponibles = new Set([...fotos.map((f) => f.id), ...fotos.map(clave)]);
    const malas = pedidas.filter((p) => !disponibles.has(p));
    if (malas.length) {
      const reservas = (pauta.reservas ?? []).map((r) => r.id);
      const enReserva = malas.filter((m) => reservas.includes(m.toUpperCase()));
      throw new ErrorUso(`No existen en la pauta: ${malas.join(', ')}.${enReserva.length ? ` ${enReserva.join(', ')} es una reserva: no tiene espacio en el tablero y no se genera.` : ''} Hay: ${fotos.map(clave).join(', ')}.`);
    }
    fotos = fotos.filter((f) => pedidas.includes(f.id) || pedidas.includes(clave(f)));
  }
  if (args.prioridad) {
    const p = entero(args.prioridad, 'prioridad', 1, 9);
    fotos = fotos.filter((f) => f.prioridad <= p);
  }
  if (args.direccion) {
    const d = args.direccion.toLowerCase();
    if (!(d in DIRECCIONES)) throw new ErrorUso('--direccion es «taller» o «pizarra».');
    fotos = fotos.filter((f) => f.direccion === d);
  }
  if (!fotos.length) throw new ErrorUso('La selección quedó vacía: revisa --solo, --prioridad y --direccion.');
  return fotos.sort((a, b) => a.prioridad - b.prioridad || numero(a.id) - numero(b.id) || ORDEN_DIR[a.direccion] - ORDEN_DIR[b.direccion]);
}

// Primero una variante de cada foto (en orden de prioridad), después las segundas: si el tope
// corta, cada foto tiene al menos una antes de que alguna tenga dos.
function armarPlan(fotos, variantes) {
  const plan = [];
  for (let v = 1; v <= variantes; v++) for (const foto of fotos) plan.push({ foto, v });
  return plan;
}

// ---------------------------------------------------------------- proveedor y costo
function claveDe(proveedor) {
  const v = (process.env[PROVEEDORES[proveedor].variable] ?? '').trim();
  return v || null;
}

function proveedorPedido(args) {
  if (!args.proveedor) return null;
  const p = args.proveedor.toLowerCase();
  if (!(p in PROVEEDORES)) throw new ErrorUso('--proveedor es «gemini» u «openai».');
  return p;
}

function mensajeSinClave(pedido) {
  const cual = pedido
    ? `Falta la variable ${PROVEEDORES[pedido].variable} (${PROVEEDORES[pedido].nombre}, modelo ${PROVEEDORES[pedido].modelo}).`
    : 'Falta la variable GEMINI_API_KEY (Gemini, modelo gemini-2.5-flash-image) o OPENAI_API_KEY (OpenAI, modelo gpt-image-1). Basta una.';
  return `No hay clave para generar. ${cual}

Dónde se configura:
  · Sesión en la nube (Claude Code): menú del entorno en la barra de título de la sesión,
    «Editar», y ahí la variable de entorno (o el secreto) con ese nombre exacto. La toma solo
    una sesión NUEVA abierta después del cambio; la que ya estaba abierta no la ve.
  · Terminal local: export ${pedido ? PROVEEDORES[pedido].variable : 'GEMINI_API_KEY'}=… en esa terminal
    (o en ~/.zshrc) y correr el script desde ahí.
  · La clave se crea en ${pedido ? PROVEEDORES[pedido].consola : `${PROVEEDORES.gemini.consola} o ${PROVEEDORES.openai.consola}`}.
Nunca la pegues en el chat ni la escribas en un archivo del repo.`;
}

function resolverProveedor(args) {
  const pedido = proveedorPedido(args);
  if (pedido) {
    const clave = claveDe(pedido);
    if (!clave) throw new ErrorClave(mensajeSinClave(pedido));
    return { proveedor: pedido, clave };
  }
  for (const p of ['gemini', 'openai']) {
    const clave = claveDe(p);
    if (clave) return { proveedor: p, clave };
  }
  throw new ErrorClave(mensajeSinClave(null));
}

function calidadOpenAI(args) {
  const q = (args.calidad ?? 'high').toLowerCase();
  if (!['low', 'medium', 'high'].includes(q)) throw new ErrorUso('--calidad es low, medium o high.');
  return q;
}

function tamanoGemini(args) {
  if (!args.tamano) return null;
  const t = args.tamano.toUpperCase();
  if (!['1K', '2K', '4K'].includes(t)) throw new ErrorUso('--tamano es 1K, 2K o 4K.');
  return t;
}

function costoUSD(pauta, proveedor, foto, calidad) {
  if (proveedor === 'gemini') return pauta.modelos.gemini.precio_ref_usd_por_imagen;
  const tabla = pauta.modelos.openai.precio_ref_usd_por_imagen[calidad];
  return foto.openai.size === '1024x1024' ? tabla['1024x1024'] : tabla.otro;
}

const usd = (n) => `USD ${n.toFixed(2).replace('.', ',')}`;

// ---------------------------------------------------------------- llamadas
async function llamarGemini({ prompt, foto, modelo, tamano, clave }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelo)}:generateContent`;
  const imageConfig = { aspectRatio: foto.gemini.aspectRatio };
  if (tamano) imageConfig.imageSize = tamano;
  const cuerpo = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig },
  };
  // La clave va en una cabecera, no en la URL: así no aparece en ningún mensaje de error.
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': clave },
    body: JSON.stringify(cuerpo),
    signal: AbortSignal.timeout(TIEMPO_MAX_MS),
  });
  const j = await leerJson(r);
  if (!r.ok) throw errorDeApi(r, j);
  const cand = j?.candidates?.[0];
  const partes = cand?.content?.parts ?? [];
  const parte = partes.find((p) => p?.inlineData?.data || p?.inline_data?.data);
  if (!parte) {
    const motivo = j?.promptFeedback?.blockReason || cand?.finishReason || 'sin parte de imagen';
    const texto = partes.map((p) => p?.text).filter(Boolean).join(' ').slice(0, 240);
    throw new SinImagen(`Gemini respondió sin imagen (${motivo})${texto ? `: «${texto}»` : ''}`);
  }
  const d = parte.inlineData ?? parte.inline_data;
  return {
    bytes: Buffer.from(d.data, 'base64'),
    mimeDeclarado: d.mimeType ?? d.mime_type ?? null,
    parametros: { aspectRatio: imageConfig.aspectRatio, ...(tamano ? { imageSize: tamano } : {}), responseModalities: ['IMAGE'] },
    respuesta: { modelVersion: j.modelVersion ?? null, responseId: j.responseId ?? null, finishReason: cand?.finishReason ?? null, usage: j.usageMetadata ?? null },
  };
}

async function llamarOpenAI({ prompt, foto, modelo, calidad, clave }) {
  const cuerpo = { model: modelo, prompt, size: foto.openai.size, quality: calidad, n: 1, output_format: 'png' };
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${clave}` },
    body: JSON.stringify(cuerpo),
    signal: AbortSignal.timeout(TIEMPO_MAX_MS),
  });
  const j = await leerJson(r);
  if (!r.ok) throw errorDeApi(r, j);
  const b64 = j?.data?.[0]?.b64_json;
  if (!b64) throw new SinImagen('OpenAI respondió sin imagen (sin data[0].b64_json)');
  return {
    bytes: Buffer.from(b64, 'base64'),
    mimeDeclarado: 'image/png',
    parametros: { size: cuerpo.size, quality: calidad, n: 1, output_format: 'png' },
    respuesta: { created: j.created ?? null, usage: j.usage ?? null, revised_prompt: j.data[0].revised_prompt ?? null },
  };
}

async function leerJson(r) {
  const texto = await r.text();
  try { return JSON.parse(texto); } catch { return { _texto: texto.slice(0, 300) }; }
}

function errorDeApi(r, j) {
  const msg = j?.error?.message ?? j?._texto ?? r.statusText ?? 'sin detalle';
  const estado = r.status;
  let pista = '';
  if (estado === 401 || (estado === 400 && /api key/i.test(msg))) pista = ' · La clave no es válida o está revocada: revisa la variable en el entorno.';
  else if (estado === 403) pista = ' · Acceso negado. En OpenAI, gpt-image-1 pide la organización verificada; en Gemini, revisa que la API esté habilitada para esa clave.';
  else if (estado === 404) pista = ' · El modelo no existe con ese nombre para esta clave (--modelo).';
  else if (estado === 429) pista = ' · Límite de uso o de cuota.';
  const fatal = [400, 401, 403, 404].includes(estado);
  return new ErrorApi(estado, `${estado} ${msg}${pista}`, fatal);
}

const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

// Reintenta solo cuando el proveedor dice que no procesó (429, 5xx): esas respuestas no generan
// imagen ni cobran. Un error de red NO se reintenta: la imagen pudo haberse generado y cobrado.
async function conReintentos(fn) {
  const pausas = [4000, 12000];
  for (let i = 0; ; i++) {
    try { return await fn(); }
    catch (e) {
      if (!(e instanceof ErrorApi) || !REINTENTABLES.has(e.estado) || i >= pausas.length) throw e;
      decir(`    ${e.estado}: reintento en ${pausas[i] / 1000} s (no cuenta para el tope)`);
      await esperar(pausas[i]);
    }
  }
}

// ---------------------------------------------------------------- validar la imagen
function validarImagen(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 64) throw new NoEsImagen(`llegaron ${buf?.length ?? 0} bytes: no es una imagen`);
  let info = null;
  const firmaPNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.subarray(0, 8).equals(firmaPNG)) {
    if (buf.toString('latin1', 12, 16) !== 'IHDR') throw new NoEsImagen('PNG sin cabecera IHDR');
    info = { mime: 'image/png', ext: 'png', ancho: buf.readUInt32BE(16), alto: buf.readUInt32BE(20) };
  } else if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    info = { mime: 'image/jpeg', ext: 'jpg', ...dimensionesJPEG(buf) };
  } else if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') {
    info = { mime: 'image/webp', ext: 'webp', ...dimensionesWEBP(buf) };
  }
  if (!info) throw new NoEsImagen(`firma desconocida (${buf.subarray(0, 8).toString('hex')}): no es PNG, JPEG ni WebP`);
  if (!(info.ancho >= 256 && info.alto >= 256)) throw new NoEsImagen(`dimensiones imposibles para una foto: ${info.ancho}×${info.alto}`);
  return info;
}

function dimensionesJPEG(buf) {
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m === 0xff) { i++; continue; }
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    const largo = buf.readUInt16BE(i + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(m)) {
      return { alto: buf.readUInt16BE(i + 5), ancho: buf.readUInt16BE(i + 7) };
    }
    i += 2 + largo;
  }
  throw new NoEsImagen('JPEG sin marcador de dimensiones');
}

function dimensionesWEBP(buf) {
  const trozo = buf.toString('latin1', 12, 16);
  if (trozo === 'VP8 ') return { ancho: buf.readUInt16LE(26) & 0x3fff, alto: buf.readUInt16LE(28) & 0x3fff };
  if (trozo === 'VP8L') { const b = buf.readUInt32LE(21); return { ancho: (b & 0x3fff) + 1, alto: ((b >>> 14) & 0x3fff) + 1 }; }
  if (trozo === 'VP8X') return { ancho: 1 + buf.readUIntLE(24, 3), alto: 1 + buf.readUIntLE(27, 3) };
  throw new NoEsImagen('WebP con un formato interno desconocido');
}

// ---------------------------------------------------------------- PNG: leer y escribir (sin dependencias)
function decodificarPNG(buf) {
  let p = 8;
  let ihdr = null;
  let plte = null;
  const idat = [];
  while (p + 12 <= buf.length) {
    const largo = buf.readUInt32BE(p);
    const tipo = buf.toString('latin1', p + 4, p + 8);
    if (p + 12 + largo > buf.length) throw new NoEsImagen('PNG truncado');
    const datos = buf.subarray(p + 8, p + 8 + largo);
    if (tipo === 'IHDR') ihdr = { w: datos.readUInt32BE(0), h: datos.readUInt32BE(4), prof: datos[8], color: datos[9], entrelazado: datos[12] };
    else if (tipo === 'PLTE') plte = datos;
    else if (tipo === 'IDAT') idat.push(datos);
    else if (tipo === 'IEND') break;
    p += 12 + largo;
  }
  if (!ihdr || !idat.length) throw new NoEsImagen('PNG sin IHDR o sin datos');
  const { w, h, prof, color, entrelazado } = ihdr;
  const canales = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[color];
  // Lo que no se lee aquí (entrelazado, 1-4 bits) se mide aparte: la imagen igual es válida.
  if (entrelazado || !canales || !(prof === 8 || (prof === 16 && color !== 3))) return null;
  const bpp = canales * (prof / 8);
  const fila = w * bpp;
  let crudo;
  try { crudo = inflateSync(Buffer.concat(idat)); } catch { throw new NoEsImagen('PNG con datos comprimidos rotos'); }
  if (crudo.length < h * (fila + 1)) throw new NoEsImagen('PNG incompleto');
  const px = Buffer.alloc(h * fila);
  let prev = Buffer.alloc(fila);
  for (let y = 0; y < h; y++) {
    const filtro = crudo[y * (fila + 1)];
    const src = crudo.subarray(y * (fila + 1) + 1, (y + 1) * (fila + 1));
    const cur = px.subarray(y * fila, (y + 1) * fila);
    for (let x = 0; x < fila; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v = src[x];
      if (filtro === 1) v += a;
      else if (filtro === 2) v += b;
      else if (filtro === 3) v += (a + b) >> 1;
      else if (filtro === 4) {
        const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      } else if (filtro !== 0) throw new NoEsImagen(`PNG con filtro desconocido (${filtro})`);
      cur[x] = v & 255;
    }
    prev = cur;
  }
  // A RGB de 8 bits, sin componer el alfa (igual que PIL con convert('RGB')).
  const paso = prof / 8;
  const rgb = Buffer.alloc(w * h * 3);
  for (let i = 0; i < w * h; i++) {
    const o = i * bpp;
    let r, g, b;
    if (color === 2 || color === 6) { r = px[o]; g = px[o + paso]; b = px[o + 2 * paso]; }
    else if (color === 0 || color === 4) { r = g = b = px[o]; }
    else { const k = px[o] * 3; r = plte[k]; g = plte[k + 1]; b = plte[k + 2]; }
    rgb[i * 3] = r; rgb[i * 3 + 1] = g; rgb[i * 3 + 2] = b;
  }
  return { w, h, rgb };
}

const TABLA_CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = TABLA_CRC[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function codificarPNG(w, h, rgb) {
  const fila = w * 3;
  const crudo = Buffer.alloc(h * (fila + 1));
  for (let y = 0; y < h; y++) rgb.copy(crudo, y * (fila + 1) + 1, y * fila, (y + 1) * fila);
  const trozo = (tipo, datos) => {
    const td = Buffer.concat([Buffer.from(tipo, 'latin1'), datos]);
    const largo = Buffer.alloc(4); largo.writeUInt32BE(datos.length);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
    return Buffer.concat([largo, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    trozo('IHDR', ihdr), trozo('IDAT', deflateSync(crudo, { level: 9 })), trozo('IEND', Buffer.alloc(0)),
  ]);
}

// ---------------------------------------------------------------- oro (manual §07b)
// Tono 38–54°, saturación ≥ 0,5, brillo ≥ 0,5, calculado EXACTAMENTE como PIL convert('HSV')
// (rgb2hsv_row de Pillow, en float de 32 bits) y con los mismos umbrales que mascara_tono() de
// marketing/brand/instagram-v3/medir.py: tono 27..38 en la escala 0-255, saturación y brillo ≥ 128.
function esOro(r, g, b) {
  const maxc = Math.max(r, g, b);
  const minc = Math.min(r, g, b);
  if (maxc < 128 || maxc === minc) return false;
  const cr = maxc - minc;
  const s = Math.fround(cr / maxc);
  if (Math.trunc(s * 255.0) < 128) return false;
  const rc = Math.fround((maxc - r) / cr);
  const gc = Math.fround((maxc - g) / cr);
  const bc = Math.fround((maxc - b) / cr);
  let h;
  if (r === maxc) h = Math.fround(bc - gc);
  else if (g === maxc) h = Math.fround(2.0 + rc - bc);
  else h = Math.fround(4.0 + gc - rc);
  h = Math.fround((h / 6.0 + 1.0) % 1.0);
  const uh = Math.trunc(h * 255.0);
  return uh >= 27 && uh <= 38;
}

function medirOro(img) {
  const { w, h, rgb } = img;
  let n = 0, x0 = w, y0 = h, x1 = -1, y1 = -1;
  const mascara = Buffer.alloc(w * h);
  for (let i = 0, y = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i++) {
      if (esOro(rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2])) {
        mascara[i] = 1; n++;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  }
  const pct = (100 * n) / (w * h);
  return {
    criterio: 'manual §07b: tono 38–54°, saturación ≥ 0,5, brillo ≥ 0,5 (HSV de PIL)',
    pixeles: n,
    pct: Number(pct.toFixed(3)),
    caja: n ? { x0, y0, x1, y1 } : null,
    alerta: pct > ORO_ALERTA_PCT ? `más de ${String(ORO_ALERTA_PCT).replace('.', ',')} %: queda anotado; el oro está en pausa con el logo y no descarta la foto` : null,
    _mascara: mascara,
  };
}

// La foto en gris claro y el oro en magenta: para ver de un vistazo DÓNDE cae.
function imagenMascara(img, mascara) {
  const { w, h, rgb } = img;
  const out = Buffer.alloc(w * h * 3);
  for (let i = 0; i < w * h; i++) {
    if (mascara[i]) { out[i * 3] = 255; out[i * 3 + 1] = 0; out[i * 3 + 2] = 255; continue; }
    const gris = Math.round(0.299 * rgb[i * 3] + 0.587 * rgb[i * 3 + 1] + 0.114 * rgb[i * 3 + 2]);
    const v = Math.round(110 + gris * 0.55);
    out[i * 3] = out[i * 3 + 1] = out[i * 3 + 2] = v;
  }
  return codificarPNG(w, h, out);
}

async function medirArchivos(lista) {
  let peor = 0;
  for (const a of lista.map((s) => s.trim()).filter(Boolean)) {
    const ruta = path.resolve(a);
    let buf;
    try { buf = await readFile(ruta); } catch { avisar(`✗ ${a}: no existe`); peor = 2; continue; }
    try {
      const info = validarImagen(buf);
      if (info.mime !== 'image/png') { decir(`· ${a}: ${info.mime} ${info.ancho}×${info.alto}; el oro se mide solo en PNG (exporta un PNG del final para medirlo).`); continue; }
      const img = decodificarPNG(buf);
      if (!img) { decir(`· ${a}: PNG entrelazado o de menos de 8 bits; medir con medir.py.`); continue; }
      const oro = medirOro(img);
      decir(`· ${a}: ${img.w}×${img.h} · oro ${oro.pct.toString().replace('.', ',')} % (${oro.pixeles} px)${oro.caja ? ` en x ${oro.caja.x0}-${oro.caja.x1}, y ${oro.caja.y0}-${oro.caja.y1}` : ''}${oro.alerta ? ` · ${oro.alerta}` : ''}`);
      // Desde la v3 el oro no cambia el código de salida: es un dato mientras el logo esté abierto.
    } catch (e) { avisar(`✗ ${a}: ${e.message}`); peor = 2; }
  }
  return peor;
}

// ---------------------------------------------------------------- salida y registro
function fechas(d = new Date()) {
  const utc = d.toISOString().replace(/\.\d{3}Z$/, 'Z');
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZoneName: 'shortOffset',
  }).formatToParts(d).map((x) => [x.type, x.value]));
  return { utc, chile: `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second} ${p.timeZoneName} (America/Santiago)` };
}

async function escribirAtomico(ruta, datos) {
  const tmp = `${ruta}.tmp-${process.pid}`;
  await writeFile(tmp, datos);
  await rename(tmp, ruta);
}

async function leerRegistro(ruta) {
  try {
    const r = JSON.parse(await readFile(ruta, 'utf8'));
    r.imagenes ??= []; r.fallos ??= [];
    return r;
  } catch (e) {
    if (e.code === 'ENOENT') return { nota: 'Una línea por imagen generada y por intento fallido. La clave nunca se guarda.', imagenes: [], fallos: [] };
    throw new ErrorUso(`registro.json existe pero no se puede leer (${e.message}); no lo piso: revísalo a mano.`);
  }
}

// Salidas <F>-<dirección>-<n>.<ext>: el número del tablero y la dirección, para que F8 de Taller y
// F8 de Pizarra limpia no se pisen.
async function numerosUsados(dir) {
  const usados = new Map();
  let nombres = [];
  try { nombres = await readdir(dir); } catch { /* aún no existe */ }
  for (const n of nombres) {
    const m = /^(F\d+)-(taller|pizarra)-(\d+)\.(png|jpg|webp)$/i.exec(n);
    if (!m) continue;
    const k = `${m[1].toUpperCase()}-${m[2].toLowerCase()}`;
    usados.set(k, Math.max(usados.get(k) ?? 0, Number(m[3])));
  }
  return usados;
}

const AYUDAS_MD = { clave, formatos, usd, veces, costoUSD, DIRECCIONES, COBERTURA_MIN, ESPACIOS_REL };

// Todo lo que impide generar: la pauta contra el tablero, y la pauta contra sí misma (prompt y pauta.md).
async function comprobar(pauta) {
  const c = conciliar(pauta, await leerEspacios());
  try {
    const malas = desincronizadas(pauta);
    if (malas.length) c.bloqueos.push(`prompt_completo_en está desactualizado en ${malas.join(', ')}: corre «node generar.mjs --sincronizar» y revisa el diff. Lo que se manda tiene que ser lo que se revisó.`);
  } catch (e) { c.bloqueos.push(`No se pudo componer un prompt: ${e.message}`); }
  try {
    if (!(await mdAlDia(pauta))) c.bloqueos.push('pauta.md no es el que sale de pauta.json: corre «node generar.mjs --sincronizar». pauta.md es lo que se revisa.');
  } catch (e) { c.bloqueos.push(`No se pudo armar pauta.md: ${e.message}`); }
  return c;
}

// ---------------------------------------------------------------- listar (sin red)
function listar(pauta, plan, args, usados, c) {
  // Una ficha sin dirección o sin espacio no se puede ni listar: se muestra la comprobación y nada más.
  if (plan.some((x) => !(x.foto.direccion in DIRECCIONES) || !x.foto.espacio?.css_1440 || !x.foto.espacio?.css_390)) {
    imprimirConciliacion(c);
    return 2;
  }
  const pedido = proveedorPedido(args);
  const conClave = ['gemini', 'openai'].filter((p) => claveDe(p));
  const proveedor = pedido ?? conClave[0] ?? 'gemini';
  const calidad = calidadOpenAI(args);
  const modelo = args.modelo ?? PROVEEDORES[proveedor].modelo;
  const fotos = [...new Map(plan.map((x) => [clave(x.foto), x.foto])).values()];
  const variantes = Math.max(...plan.map((x) => x.v));

  decir(`Pauta E10 v${pauta.version} · ${pauta.fotos.length} fichas para ${new Set(pauta.fotos.map((f) => f.id)).size} números del tablero · elegidas ${fotos.length} · ${variantes} variante(s) por ficha`);
  decir(`Claves en el entorno: GEMINI_API_KEY ${claveDe('gemini') ? 'está' : 'no está'} · OPENAI_API_KEY ${claveDe('openai') ? 'está' : 'no está'}`);
  decir(`Proveedor que se usaría: ${proveedor} (${modelo})${!pedido && !conClave.length ? ' · sin clave: se muestra Gemini, el primero que se usaría' : ''}`);
  decir('');
  for (const f of fotos) {
    const fm = formatos(pauta, f)[proveedor];
    const formato = proveedor === 'gemini' ? `${f.gemini.aspectRatio} → ${fm.fuente.join('×')}` : f.openai.size;
    const base = usados.get(clave(f)) ?? 0;
    const nombres = plan.filter((x) => x.foto === f).map((x) => `${clave(f)}-${base + x.v}.png`).join(', ');
    const vista = (a) => {
      const v = fm.vistas[a];
      return `${a}: ${f.espacio[`css_${a}`].join('×')} css (${v.proporcion}) ← ${v.recorte.join('×')} (${veces(v.cobertura)}${v.alcanza ? '' : ' ⚠'})`;
    };
    decir(`  ${clave(f).padEnd(11)} P${f.prioridad}  ${f.espacio.pagina.split(' (')[0]} · ${f.espacio.seccion.split(/[.:](?:\s|$)/)[0]}`);
    decir(`        ${f.titulo_es} · ${formato}`);
    decir(`        ${vista('1440')} · ${vista('390')}`);
    decir(`        → salida/${nombres}`);
  }
  const total = plan.length;
  const costo = plan.reduce((t, x) => t + costoUSD(pauta, proveedor, x.foto, calidad), 0);
  const otro = proveedor === 'gemini' ? 'openai' : 'gemini';
  const costoOtro = plan.reduce((t, x) => t + costoUSD(pauta, otro, x.foto, calidad), 0);
  decir('');
  decir(`Pediría ${total} imagen(es), ${total} llamada(s). Costo estimado: ${usd(costo)} con ${proveedor}${proveedor === 'openai' ? ` (calidad ${calidad})` : ''}; con ${otro}${otro === 'openai' ? ` (calidad ${calidad})` : ''}: ${usd(costoOtro)}.`);
  decir(`Precios de lista conocidos${args.modelo ? ' del modelo por defecto' : ''}; verificar en la consola del proveedor antes de una corrida grande.`);
  decir('');
  imprimirConciliacion(c);
  decir('');
  if (c.bloqueos.length) {
    decir('Modo lista: no se llamó a la red y no se generó nada. Con --tope tampoco se generaría hasta que lo de arriba calce.');
    return 2;
  }
  decir(`Modo lista: no se llamó a la red y no se generó nada. Para generar, repite con --tope=${total} (o menos: el tope deja primero una variante de cada ficha).`);
  return 0;
}

// ---------------------------------------------------------------- generar
async function generar(pauta, plan, args, tope, c) {
  if (c.bloqueos.length) {
    imprimirConciliacion(c);
    throw new ErrorUso(`No se genera nada: la pauta no calza con el tablero o no está sincronizada (${c.bloqueos.length} cosa(s), arriba). Corrígelas y corre «node generar.mjs --verificar» hasta que diga que calza.`);
  }
  const { proveedor, clave: claveApi } = resolverProveedor(args);
  const calidad = calidadOpenAI(args);
  const tamano = tamanoGemini(args);
  if (tamano && proveedor !== 'gemini') throw new ErrorUso('--tamano es solo para Gemini.');
  const modelo = args.modelo ?? PROVEEDORES[proveedor].modelo;
  const salida = path.resolve(args.salida ?? path.join(DIR, 'salida'));
  const dirOro = path.join(salida, 'oro');
  const rutaRegistro = path.join(salida, 'registro.json');
  await mkdir(dirOro, { recursive: true });
  const registro = await leerRegistro(rutaRegistro);
  const usados = await numerosUsados(salida);

  const corrida = plan.slice(0, tope);
  const fuera = plan.slice(tope);
  const costo = corrida.reduce((t, x) => t + costoUSD(pauta, proveedor, x.foto, calidad), 0);
  decir(`Proveedor ${proveedor} · modelo ${modelo}${proveedor === 'openai' ? ` · calidad ${calidad}` : ''}${tamano ? ` · imageSize ${tamano}` : ''}`);
  decir(`La pauta calza con el tablero (${c.filas.length} espacios).`);
  const otroProveedor = proveedor === 'gemini' ? 'openai' : 'gemini';
  for (const a of c.avisos.filter((x) => !x.includes(` con ${otroProveedor}:`))) decir(`  · aviso: ${a}`);
  decir(`Corrida: ${corrida.length} imagen(es) de ${plan.length} pedidas (tope ${tope}) · costo estimado ${usd(costo)} · salida en ${salida}`);
  if (fuera.length) decir(`Quedan fuera por el tope: ${fuera.map((x) => `${clave(x.foto)} v${x.v}`).join(', ')}`);
  decir('');

  let hechas = 0, fallidas = 0;
  for (const [k, item] of corrida.entries()) {
    const { foto } = item;
    const prompt = componer(pauta, foto);
    const n = (usados.get(clave(foto)) ?? 0) + 1;
    const etiqueta = `${clave(foto)}-${n}`;
    decir(`[${k + 1}/${corrida.length}] ${etiqueta} · ${foto.titulo_es}`);
    const t0 = Date.now();
    try {
      const llamar = proveedor === 'gemini' ? llamarGemini : llamarOpenAI;
      const r = await conReintentos(() => llamar({ prompt, foto, modelo, calidad, tamano, clave: claveApi }));
      const info = validarImagen(r.bytes);
      if (r.mimeDeclarado && r.mimeDeclarado !== info.mime) decir(`    aviso: el proveedor dijo ${r.mimeDeclarado} y llegó ${info.mime}; se guarda como ${info.ext}`);
      let oro = null;
      let img = null;
      if (info.mime === 'image/png') img = decodificarPNG(r.bytes);
      if (img) oro = medirOro(img);
      const archivo = `${etiqueta}.${info.ext}`;
      await escribirAtomico(path.join(salida, archivo), r.bytes);
      usados.set(clave(foto), n);
      let archivoOro = null;
      if (oro?.pixeles) {
        archivoOro = `oro/${etiqueta}-oro.png`;
        await escribirAtomico(path.join(salida, archivoOro), imagenMascara(img, oro._mascara));
      }
      if (oro) delete oro._mascara;
      const f = fechas();
      registro.imagenes.push({
        archivo,
        foto: foto.id,
        direccion: foto.direccion,
        titulo: foto.titulo_es,
        pagina: foto.espacio.pagina,
        seccion: foto.espacio.seccion,
        espacio_css: { 1440: foto.espacio.css_1440, 390: foto.espacio.css_390 },
        proveedor,
        modelo,
        parametros: r.parametros,
        prompt,
        fecha_utc: f.utc,
        fecha_chile: f.chile,
        sha256: createHash('sha256').update(r.bytes).digest('hex'),
        bytes: r.bytes.length,
        ancho: info.ancho,
        alto: info.alto,
        mime: info.mime,
        oro: oro ?? { nota: `no medido (${info.mime}); medir el PNG final con --medir` },
        mascara_oro: archivoOro,
        segundos: Math.round((Date.now() - t0) / 1000),
        respuesta: r.respuesta,
        estado: 'por revisar',
      });
      await escribirAtomico(rutaRegistro, `${JSON.stringify(registro, null, 2)}\n`);
      hechas++;
      const textoOro = oro ? `oro ${String(oro.pct).replace('.', ',')} % (dato)${oro.alerta ? ' · máscara en ' + archivoOro : ''}` : 'oro sin medir';
      decir(`    ✓ ${archivo} · ${info.ancho}×${info.alto} · ${(r.bytes.length / 1024).toFixed(0)} KB · ${textoOro}`);
    } catch (e) {
      fallidas++;
      const f = fechas();
      const tipo = e instanceof ErrorApi ? `api ${e.estado}` : e instanceof SinImagen ? 'sin imagen' : e instanceof NoEsImagen ? 'no es imagen' : e?.name === 'TimeoutError' ? 'tiempo agotado' : 'red u otro';
      registro.fallos.push({ foto: foto.id, direccion: foto.direccion, proveedor, modelo, fecha_utc: f.utc, fecha_chile: f.chile, tipo, error: ocultar(e?.message ?? String(e)), prompt });
      await escribirAtomico(rutaRegistro, `${JSON.stringify(registro, null, 2)}\n`);
      avisar(`    ✗ ${tipo}: ${e?.message ?? e}`);
      if (tipo === 'red u otro' && (process.env.HTTPS_PROXY || process.env.https_proxy) && process.env.NODE_USE_ENV_PROXY !== '1') {
        avisar('      Si este entorno sale a internet por un proxy, prueba: NODE_USE_ENV_PROXY=1 node generar.mjs …');
      }
      if (e instanceof ErrorApi && e.fatal) {
        avisar('    Error que se repetiría en todas: se corta la corrida.');
        break;
      }
    }
  }
  decir('');
  decir(`Listo: ${hechas} imagen(es) guardada(s), ${fallidas} fallida(s). Registro: ${rutaRegistro}`);
  decir('Siguiente paso: revisar cada una con la lista de pauta.md («Revisión») antes de ponerla en el tablero.');
  if (!hechas && fallidas) return 3;
  return fallidas ? 1 : 0;
}

// ---------------------------------------------------------------- principal
async function main() {
  const args = leerArgs(process.argv.slice(2));
  if (args.ayuda) return ayuda();
  if (args.medir) return medirArchivos(args.medir.split(','));
  const pauta = await leerPauta();
  if (args.sincronizar) return sincronizar(pauta);
  if (args.verificar) {
    const c = await comprobar(pauta);
    imprimirConciliacion(c);
    return c.bloqueos.length ? 2 : 0;
  }
  const fotos = seleccionar(pauta, args);
  if (args.ver) {
    for (const f of fotos) {
      decir(`==== ${clave(f)} · ${f.titulo_es} · ${f.espacio.pagina} · ${f.espacio.css_1440.join('×')} a 1440`);
      decir(componer(pauta, f));
      decir('');
    }
    return 0;
  }
  const variantes = entero(args.variantes ?? '2', 'variantes', 1, 8);
  const plan = armarPlan(fotos, variantes);
  const usados = await numerosUsados(path.resolve(args.salida ?? path.join(DIR, 'salida')));
  const c = await comprobar(pauta);
  if (args.tope === undefined) return listar(pauta, plan, args, usados, c);
  const tope = entero(args.tope, 'tope', 1, 200);
  return generar(pauta, plan, args, tope, c);
}

process.on('uncaughtException', (e) => { avisar(`Error inesperado: ${e?.message ?? e}`); process.exit(1); });
main().then(
  (codigo) => { process.exitCode = codigo ?? 0; },
  (e) => {
    if (e instanceof ErrorClave) { avisar(e.message); process.exitCode = 2; return; }
    if (e instanceof ErrorUso) { avisar(`Error: ${e.message}`); process.exitCode = 2; return; }
    avisar(`Error inesperado: ${e?.message ?? e}`);
    process.exitCode = 1;
  },
);
