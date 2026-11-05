/**
 * Escribe en la portada los textos de la ley, leyéndolos de `functions/api/ley.js`.
 *
 *   node herramientas/sincronizar-ley.mjs            · reescribe
 *   node herramientas/sincronizar-ley.mjs --revisar  · solo dice si está al día (código 1 si no)
 *
 * ── PARA QUÉ (5-nov-2026) ───────────────────────────────────────────────────────────────
 *
 * La fecha de la ley vivía escrita a mano en nueve lugares y siempre quedaba alguno viejo.
 * Ahora vive en `ley.js` y este script la baja a la portada. Cambiar la fecha es editar esa
 * constante y correr esto; el HTML no se vuelve a tocar a mano.
 *
 * ⚠️ NO es un paso de build. La portada se sirve tal como está en el repositorio, así que el
 * texto tiene que quedar ESCRITO en el archivo: generarlo con JavaScript en el navegador
 * dejaría la pregunta frecuente fuera del JSON-LD que leen los buscadores y los modelos, que
 * es justo lo que este sitio vende. Por eso se reescribe el archivo y se commitea.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const PORTADA = path.join(RAIZ, 'public', 'index.html');

const L = await import(path.join(RAIZ, 'functions', 'api', 'ley.js'));

/** Escapa lo que va dentro de una cadena JSON del bloque JSON-LD. */
const paraJson = (s) => JSON.stringify(String(s)).slice(1, -1);

/** Los bloques, con el texto que le corresponde a cada uno. */
const BLOQUES = [
  {
    marca: 'ley:la-fecha',
    cuerpo: () => `          <p>${L.PARRAFO_LA_FECHA}</p>\n` +
      `          <p class="paso-revisado">${L.SELLO_REVISADO}</p>`,
  },
  { marca: 'ley:faq', cuerpo: () => `          <p>${L.FAQ_DESDE_CUANDO}</p>` },
  { marca: 'ley:insignia', cuerpo: () => `      <div class="fecha-limite">${L.INSIGNIA_HEADER}</div>` },
];

/** Reemplaza el contenido entre `<!-- marca ... -->` y `<!-- /marca -->`, dejando los dos. */
function escribirBloque(texto, marca, cuerpo) {
  const abre = texto.indexOf(`<!-- ${marca}`);
  if (abre < 0) throw new Error(`falta el bloque ${marca} en la portada`);
  const finAbre = texto.indexOf('-->', abre) + 3;
  const cierra = texto.indexOf(`<!-- /${marca} -->`, finAbre);
  if (cierra < 0) throw new Error(`falta el cierre de ${marca} en la portada`);
  return texto.slice(0, finAbre) + '\n' + cuerpo + '\n          ' + texto.slice(cierra);
}

let html = fs.readFileSync(PORTADA, 'utf8');
const antes = html;
for (const b of BLOQUES) html = escribirBloque(html, b.marca, b.cuerpo());

// El JSON-LD no es un bloque de HTML: es una cadena dentro de un script, así que se reemplaza
// el valor de su campo `text`, que está marcado con su `_comentario` al lado.
const re = /("_comentario": "ley:faq-jsonld[^"]*",\s*\n\s*"text": ")([^"]*)(")/;
if (!re.test(html)) throw new Error('falta el campo marcado ley:faq-jsonld en el JSON-LD');
html = html.replace(re, `$1${paraJson(L.FAQ_DESDE_CUANDO)}$3`);

const alDia = html === antes;
if (process.argv.includes('--revisar')) {
  console.log(alDia ? 'la portada está al día con ley.js' : 'LA PORTADA NO ESTÁ AL DÍA: corre el script sin --revisar');
  process.exit(alDia ? 0 : 1);
}
fs.writeFileSync(PORTADA, html);
console.log(alDia ? 'ya estaba al día' : 'portada actualizada desde ley.js');
