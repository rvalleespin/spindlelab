/**
 * Las condiciones que alguien tiene que leer ANTES de pagar $177.310.
 *
 *   node prueba-condiciones-compra.mjs
 *
 * ── POR QUÉ EXISTE (27-oct-2026) ────────────────────────────────────────────────────────
 *
 * El sitio cobraba $177.310 sin decir en ninguna parte qué pasa si el cliente no entrega el
 * acceso a su sitio, si se arrepiente, o si lo que se promete no se puede hacer. Cero
 * menciones de devolución, reembolso, garantía o condiciones. Y el acceso —sin el cual la
 * entrega es imposible— aparecía una sola vez, de pasada, como explicación de por qué se pedía
 * el correo.
 *
 * No era un problema legal abstracto: era quedarse con la plata de alguien sin haberle dicho
 * antes qué se necesitaba de él.
 *
 * ── QUÉ CUIDA, Y POR QUÉ ASÍ ────────────────────────────────────────────────────────────
 *
 * 1. Que las tres condiciones estén EN EL PANEL DE COMPRA, no en una página aparte ni detrás
 *    de un enlace. Lo que cambia la decisión de alguien que está por pagar tiene que estar
 *    donde está el botón.
 *
 * 2. Que el bloque de precios diga LO MISMO. Son dos copias de la misma promesa en la misma
 *    página; si se separan, una de las dos miente y ninguna se queja. Es el mismo problema de
 *    las dos constantes del mismo hecho, con texto en vez de números.
 *
 * Se busca por CONCEPTO (varias formas de decir lo mismo), no por la frase exacta: reescribir
 * una condición con otras palabras no tiene que poner roja la prueba, pero borrarla sí.
 */

import { readFileSync } from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const HTML = readFileSync(rutaEnElRepo('verificaycumple/public/index.html', 'VYC_INDEX_HTML'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);

/** El texto visible de un trozo del HTML, sin etiquetas y con los espacios normalizados. */
const texto = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/** Recorta el HTML entre dos marcas. Falla ruidosamente si alguna no está. */
function trozo(desde, hasta, nombre) {
  const i = HTML.indexOf(desde);
  if (i < 0) throw new Error(`no se encontró el inicio de ${nombre}: ${desde}`);
  const j = HTML.indexOf(hasta, i);
  if (j < 0) throw new Error(`no se encontró el final de ${nombre}: ${hasta}`);
  return texto(HTML.slice(i, j));
}

const PANEL = trozo('<form id="compra"', '</form>', 'el panel de compra');
// ⚠️ DOS TRAMPAS EN ESTE RECORTE, y las dos daban un rojo que no era culpa del sitio:
//
//   1. El final NO puede ser el primer `</div>`: ese cierra el <svg> del sello, así que el
//      trozo se quedaba sin la lista ni la nota.
//   2. El inicio no puede ser `kit-principal` a secas: esa cadena aparece ANTES en el CSS
//      (`.kit-precio.kit-principal { ... }`), así que el recorte leía una regla de estilo y
//      buscaba condiciones de venta dentro de un color de fondo.
//
// Por eso el ancla lleva el espacio del atributo (`kit-precio kit-principal`), que solo
// existe en el HTML, y el final es el bloque siguiente.
const PRECIOS = trozo('kit-precio kit-principal', 'kit-secundario', 'el bloque de precios');
// Y una red por si el ancla vuelve a caer en el CSS: un bloque de precios de verdad nombra el
// kit. Si esto salta, el recorte está mal, no la página.
if (!/Kit de implementaci[oó]n/i.test(PRECIOS)) {
  throw new Error('el recorte del bloque de precios no trajo el bloque: revisa las anclas');
}

/** Las tres condiciones, cada una con varias formas válidas de decirla. */
const CONDICIONES = [
  // ⚠️ No basta con que la palabra «acceso» aparezca: el panel ya decía «te escribimos para
  // pedirte el acceso», que es avisar, no condicionar. Lo que esto cuida es que se declare
  // como REQUISITO del trabajo, que es lo que protege de cobrar y no poder entregar.
  ['el acceso al sitio como requisito', [/necesitamos acceso/i, /requiere acceso/i, /sin acceso/i]],
  ['la devolución', [/te devolvemos/i, /devoluci[oó]n/i, /reembolso/i]],
  ['que el HTTPS no va incluido', [/https\b[^.]{0,60}(no va|no (?:est[aá]|se) inclu)/i, /no incluye el https/i]],
];

/* ================================================================== */
console.log('=== 1. las condiciones están donde está el botón ===');
for (const [nombre, formas] of CONDICIONES) {
  cierto(`el panel de compra declara ${nombre}`, formas.some((re) => re.test(PANEL)));
}
// Y la que ya estaba, que no se puede perder al reescribir el resto.
cierto('el panel sigue diciendo que la revisión legal es de abogado', /abogado/i.test(PANEL));

/* ================================================================== */
console.log('=== 2. el bloque de precios dice lo mismo ===');
//
// No se compara el texto palabra por palabra: se comprueba que las mismas tres condiciones
// estén declaradas en los dos lugares. Si una se agrega en uno y se olvida en el otro, la
// página se contradice sola y esto se pone rojo.
for (const [nombre, formas] of CONDICIONES) {
  cierto(`el bloque de precios declara ${nombre}`, formas.some((re) => re.test(PRECIOS)));
}

/* ================================================================== */
console.log('=== 3. lo que el kit arregla también está dicho en los dos ===');
cierto('el panel nombra la casilla de los formularios', /casilla/i.test(PANEL));
cierto('y el bloque de precios también', /casilla/i.test(PRECIOS));

/* ================================================================== */
console.log('=== 4. la promesa de «una vez» sigue siendo cierta ===');
//
// Si algún día el gestor de consentimiento que se instala pasara a tener mensualidad, esta
// frase se volvería falsa y habría que declararlo. La prueba no puede saber qué se instala,
// pero sí puede dejar la frase amarrada para que nadie la cambie sin pensarlo.
cierto('el panel dice que es un pago único', /una vez/i.test(PANEL));

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
