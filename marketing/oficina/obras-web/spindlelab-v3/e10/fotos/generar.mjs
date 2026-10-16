#!/usr/bin/env node
// generar.mjs · E10 · fotos con IA para el sitio v3 (Bruno, 16-oct-2026)
//
// Lee pauta.json (al lado de este archivo) y genera las fotos con uno de dos proveedores:
//   · Gemini: modelo gemini-2.5-flash-image, clave en GEMINI_API_KEY
//   · OpenAI: modelo gpt-image-1, clave en OPENAI_API_KEY
// Node 22, sin dependencias: fetch, crypto y zlib nativos.
//
// Reglas que este script hace cumplir (pauta.md, «Uso»):
//   · Sin --tope no genera nada: lista lo que pediría, cuántas llamadas y cuánto costaría, y no
//     toca la red. --tope es el número máximo de imágenes que la corrida puede pedir.
//   · La clave nunca se imprime ni se guarda: ni en el registro, ni en los errores (se tapa).
//   · Cada archivo que llega se valida como imagen (firma y dimensiones) antes de guardarlo, y
//     se le mide el oro con el criterio del manual §07b (el mismo cálculo HSV de PIL).
//   · Cada imagen queda en salida/<F>-<n>.png, con su línea en salida/registro.json.
//
// Uso rápido:
//   node generar.mjs                              lista toda la pauta (sin red)
//   node generar.mjs --prioridad=1                lista solo las imprescindibles
//   node generar.mjs --prioridad=1 --tope=12      genera las imprescindibles, 2 variantes c/u
//   node generar.mjs --solo=F1,F3 --variantes=3 --tope=6 --proveedor=openai
//   node generar.mjs --ver --solo=F2              imprime el prompt completo (sin red)
//   node generar.mjs --medir=salida/F1-1.png      mide oro en archivos PNG (sin red)
//   node generar.mjs --ayuda

import { readFile, writeFile, mkdir, rename, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { inflateSync, deflateSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PAUTA = path.join(DIR, 'pauta.json');

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
const ORO_ALERTA_PCT = 0.05; // el máximo del pool limpio (manual §07b)

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
  medir: 'valor', ver: 'bandera', sincronizar: 'bandera', ayuda: 'bandera',
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

  --solo=F1,F3        solo esas fotos
  --prioridad=N       solo fotos con prioridad ≤ N (1 = imprescindible para el tablero)
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
  --medir=a.png,b.png mide oro en PNG ya guardados (sin red)
  --sincronizar       reescribe prompt_completo_en en pauta.json desde sus partes
  --salida=DIR        carpeta de salida (por defecto salida/; para pruebas)

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

function componer(pauta, foto) {
  const e = pauta.estilo;
  const encuadre = e.encuadre?.[foto.encuadre]?.en;
  if (!encuadre) throw new ErrorUso(`${foto.id}: encuadre «${foto.encuadre}» no existe en estilo.encuadre.`);
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
  return pauta.fotos.filter((f) => componer(pauta, f) !== f.prompt_completo_en).map((f) => f.id);
}

async function sincronizar(pauta) {
  const antes = desincronizadas(pauta);
  for (const f of pauta.fotos) f.prompt_completo_en = componer(pauta, f);
  const tmp = `${PAUTA}.tmp`;
  await writeFile(tmp, `${JSON.stringify(pauta, null, 2)}\n`);
  await rename(tmp, PAUTA);
  decir(antes.length
    ? `pauta.json: prompt_completo_en reescrito en ${antes.join(', ')}. Revisa el diff antes de generar.`
    : 'pauta.json ya estaba al día; no cambió nada de fondo.');
  return 0;
}

const numero = (id) => Number(String(id).replace(/\D/g, ''));

function seleccionar(pauta, args) {
  let fotos = [...pauta.fotos];
  if (args.solo) {
    const pedidas = args.solo.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
    const ids = new Set(fotos.map((f) => f.id));
    const malas = pedidas.filter((p) => !ids.has(p));
    if (malas.length) throw new ErrorUso(`No existen en la pauta: ${malas.join(', ')}. Hay: ${[...ids].join(', ')}.`);
    fotos = fotos.filter((f) => pedidas.includes(f.id));
  }
  if (args.prioridad) {
    const p = entero(args.prioridad, 'prioridad', 1, 9);
    fotos = fotos.filter((f) => f.prioridad <= p);
  }
  if (args.direccion) {
    const d = args.direccion.toLowerCase();
    if (!['taller', 'pizarra'].includes(d)) throw new ErrorUso('--direccion es «taller» o «pizarra».');
    fotos = fotos.filter((f) => f.direcciones.includes(d));
  }
  if (!fotos.length) throw new ErrorUso('La selección quedó vacía: revisa --solo, --prioridad y --direccion.');
  return fotos.sort((a, b) => a.prioridad - b.prioridad || numero(a.id) - numero(b.id));
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
    alerta: pct > ORO_ALERTA_PCT ? `más de ${ORO_ALERTA_PCT} %: mirar la máscara; si la zona se ve, cuenta como oro` : null,
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
      if (oro.alerta) peor = Math.max(peor, 1);
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

async function numerosUsados(dir) {
  const usados = new Map();
  let nombres = [];
  try { nombres = await readdir(dir); } catch { /* aún no existe */ }
  for (const n of nombres) {
    const m = /^(F\d+)-(\d+)\.(png|jpg|webp)$/i.exec(n);
    if (m) usados.set(m[1].toUpperCase(), Math.max(usados.get(m[1].toUpperCase()) ?? 0, Number(m[2])));
  }
  return usados;
}

// ---------------------------------------------------------------- listar (sin red)
function listar(pauta, plan, args, usados) {
  const pedido = proveedorPedido(args);
  const conClave = ['gemini', 'openai'].filter((p) => claveDe(p));
  const proveedor = pedido ?? conClave[0] ?? 'gemini';
  const calidad = calidadOpenAI(args);
  const modelo = args.modelo ?? PROVEEDORES[proveedor].modelo;
  const fotos = [...new Map(plan.map((x) => [x.foto.id, x.foto])).values()];
  const variantes = Math.max(...plan.map((x) => x.v));

  decir(`Pauta E10 · ${pauta.fotos.length} fotos en la pauta · elegidas ${fotos.length} · ${variantes} variante(s) por foto`);
  decir(`Claves en el entorno: GEMINI_API_KEY ${claveDe('gemini') ? 'está' : 'no está'} · OPENAI_API_KEY ${claveDe('openai') ? 'está' : 'no está'}`);
  decir(`Proveedor que se usaría: ${proveedor} (${modelo})${!pedido && !conClave.length ? ' · sin clave: se muestra Gemini, el primero que se usaría' : ''}`);
  decir('');
  for (const f of fotos) {
    const formato = proveedor === 'gemini' ? `${f.gemini.aspectRatio} → ${f.gemini.salida}` : `${f.openai.size}`;
    const base = usados.get(f.id) ?? 0;
    const nombres = plan.filter((x) => x.foto.id === f.id).map((x) => `${f.id}-${base + x.v}.png`).join(', ');
    decir(`  ${f.id.padEnd(4)} P${f.prioridad}  ${f.direcciones.join('+').padEnd(15)} ${f.proporcion.padEnd(22)} ${formato.padEnd(18)} ${f.pagina} · ${f.seccion.split('. ')[0].replace(/\.$/, '')}`);
    decir(`        ${f.muestra_es}`);
    decir(`        → salida/${nombres}`);
  }
  const total = plan.length;
  const costo = plan.reduce((t, x) => t + costoUSD(pauta, proveedor, x.foto, calidad), 0);
  const otro = proveedor === 'gemini' ? 'openai' : 'gemini';
  const costoOtro = plan.reduce((t, x) => t + costoUSD(pauta, otro, x.foto, calidad), 0);
  decir('');
  decir(`Pediría ${total} imagen(es), ${total} llamada(s). Costo estimado: ${usd(costo)} con ${proveedor}${proveedor === 'openai' ? ` (calidad ${calidad})` : ''}; con ${otro}${otro === 'openai' ? ` (calidad ${calidad})` : ''}: ${usd(costoOtro)}.`);
  decir(`Precios de lista conocidos${args.modelo ? ' del modelo por defecto' : ''}; verificar en la consola del proveedor antes de una corrida grande.`);
  const malas = desincronizadas(pauta);
  if (malas.length) decir(`Ojo: prompt_completo_en está desactualizado en ${malas.join(', ')}. Corre --sincronizar antes de generar.`);
  decir('');
  decir(`Modo lista: no se llamó a la red y no se generó nada. Para generar, repite con --tope=${total} (o menos: el tope corta por prioridad).`);
  return 0;
}

// ---------------------------------------------------------------- generar
async function generar(pauta, plan, args, tope) {
  const malas = desincronizadas(pauta);
  if (malas.length) {
    throw new ErrorUso(`pauta.json cambió y prompt_completo_en no está al día en ${malas.join(', ')}. Corre «node generar.mjs --sincronizar», revisa el diff y vuelve a correr: lo que se manda tiene que ser lo que se revisó.`);
  }
  const { proveedor, clave } = resolverProveedor(args);
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
  decir(`Corrida: ${corrida.length} imagen(es) de ${plan.length} pedidas (tope ${tope}) · costo estimado ${usd(costo)} · salida en ${salida}`);
  if (fuera.length) decir(`Quedan fuera por el tope: ${fuera.map((x) => `${x.foto.id} v${x.v}`).join(', ')}`);
  decir('');

  let hechas = 0, fallidas = 0;
  for (const [k, item] of corrida.entries()) {
    const { foto } = item;
    const prompt = componer(pauta, foto);
    const n = (usados.get(foto.id) ?? 0) + 1;
    const etiqueta = `${foto.id}-${n}`;
    decir(`[${k + 1}/${corrida.length}] ${etiqueta} · ${foto.titulo_es}`);
    const t0 = Date.now();
    try {
      const llamar = proveedor === 'gemini' ? llamarGemini : llamarOpenAI;
      const r = await conReintentos(() => llamar({ prompt, foto, modelo, calidad, tamano, clave }));
      const info = validarImagen(r.bytes);
      if (r.mimeDeclarado && r.mimeDeclarado !== info.mime) decir(`    aviso: el proveedor dijo ${r.mimeDeclarado} y llegó ${info.mime}; se guarda como ${info.ext}`);
      let oro = null;
      let img = null;
      if (info.mime === 'image/png') img = decodificarPNG(r.bytes);
      if (img) oro = medirOro(img);
      const archivo = `${etiqueta}.${info.ext}`;
      await escribirAtomico(path.join(salida, archivo), r.bytes);
      usados.set(foto.id, n);
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
        titulo: foto.titulo_es,
        direcciones: foto.direcciones,
        pagina: foto.pagina,
        seccion: foto.seccion,
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
      const textoOro = oro ? `oro ${String(oro.pct).replace('.', ',')} %${oro.alerta ? ' · MIRAR ' + archivoOro : ''}` : 'oro sin medir';
      decir(`    ✓ ${archivo} · ${info.ancho}×${info.alto} · ${(r.bytes.length / 1024).toFixed(0)} KB · ${textoOro}`);
    } catch (e) {
      fallidas++;
      const f = fechas();
      const tipo = e instanceof ErrorApi ? `api ${e.estado}` : e instanceof SinImagen ? 'sin imagen' : e instanceof NoEsImagen ? 'no es imagen' : e?.name === 'TimeoutError' ? 'tiempo agotado' : 'red u otro';
      registro.fallos.push({ foto: foto.id, proveedor, modelo, fecha_utc: f.utc, fecha_chile: f.chile, tipo, error: ocultar(e?.message ?? String(e)), prompt });
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
  const fotos = seleccionar(pauta, args);
  if (args.ver) {
    for (const f of fotos) {
      decir(`==== ${f.id} · ${f.titulo_es} · ${f.pagina} · ${f.proporcion}`);
      decir(componer(pauta, f));
      decir('');
    }
    return 0;
  }
  const variantes = entero(args.variantes ?? '2', 'variantes', 1, 8);
  const plan = armarPlan(fotos, variantes);
  const usados = await numerosUsados(path.resolve(args.salida ?? path.join(DIR, 'salida')));
  if (args.tope === undefined) return listar(pauta, plan, args, usados);
  const tope = entero(args.tope, 'tope', 1, 200);
  return generar(pauta, plan, args, tope);
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
