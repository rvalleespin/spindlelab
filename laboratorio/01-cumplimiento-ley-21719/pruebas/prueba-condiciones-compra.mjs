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
const PROFUNDO_FUENTE = readFileSync(rutaEnElRepo('verificaycumple/functions/api/profundo.js', 'PROFUNDO_JS'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

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
// El mismo trozo SIN quitar las etiquetas. `trozo` devuelve texto plano, que es lo que sirve
// para comprobar lo que la persona lee; pero hay invariantes que viven en el marcado (un
// atributo, un `hidden`) y ahí el texto plano no puede ver nada.
const PANEL_HTML = (function () {
  const i = HTML.indexOf('<form id="compra"');
  return HTML.slice(i, HTML.indexOf('</form>', i));
})();
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
// ⚠️ POR CONCEPTO, NO POR LA FRASE EXACTA — igual que las de arriba, y por lo mismo.
// La primera versión de estas cuatro estaba pinchada a la redacción literal. Una reescritura
// que decía exactamente lo mismo —«si no puedes darnos EL acceso», con artículo— las puso
// rojas. Una prueba que falla porque alguien agregó una palabra no está cuidando la condición:
// está congelando el texto, y lo que termina pasando es que la afloja quien la encuentra.
cierto('el panel mantiene que la revisión legal corresponde al abogado',
  /(revisi[oó]n legal|borrador)[^.]{0,80}abogado/i.test(PANEL));
cierto('el acceso se declara temporal y de permisos mínimos',
  /acceso temporal[^.]{0,90}permisos m[ií]nimos/i.test(PANEL));
cierto('la devolución cubre que no se pueda dar acceso',
  /(devolvemos[^.]{0,130}acceso|acceso[^.]{0,130}devolvemos)/i.test(PANEL));
cierto('el HTTPS depende del hosting',
  /HTTPS no est[aá] inclu[^.]{0,70}hosting/i.test(PANEL));
cierto('el consentimiento del checkout habla de gestionar la compra', /gestionar mi compra/i.test(PANEL));
cierto('el consentimiento del checkout no habla de una pregunta', !/mi pregunta/i.test(PANEL));

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

/* ================================================================== */
console.log('=== el rescate cuando el pago no se puede abrir (28-oct) ===');
{
  // Quien llega hasta «Ir a pagar» es el visitante mas interesado: midio su sitio, leyo las
  // condiciones y decidio pagar. Hasta hoy, si el pago fallaba por algo NUESTRO, se iba con un
  // «vuelve a intentarlo» que volvia a fallar.
  cierto('el panel trae el bloque de rescate', /class="compra-rescate"/.test(PANEL_HTML));
  cierto('y nace oculto', /class="compra-rescate"[^>]*\shidden/.test(PANEL_HTML));

  // ⚠️ LA ASERCION QUE DE VERDAD CUIDA ALGO. El boton se apoya en el manejador delegado de
  // `data-pedir`, y ese manejador trata el valor «kit» distinto: reabre el panel de COMPRA en
  // vez de llevar al formulario. Si alguien «simplifica» este valor a «kit», el boton deja de
  // rescatar nada y vuelve a dejar a la persona donde ya fallo — sin error, sin sintoma.
  const btn = PANEL_HTML.match(/<button[^>]*class="boton-rescate"[^>]*>/);
  cierto('el boton existe', Boolean(btn));
  const valor = btn && (btn[0].match(/data-pedir="([^"]*)"/) || [])[1];
  cierto('lleva data-pedir', Boolean(valor));
  falso('y NO es «kit», que reabriria el panel de compra', valor === 'kit');

  // La lista de fallos que ofrecen el rescate. Se mira en la fuente porque es una decision de
  // producto escrita en una constante, no una forma de la pagina.
  const FUENTE = HTML;
  const lista = (FUENTE.match(/FALLO_NUESTRO = \[([^\]]*)\]/) || [])[1] || '';
  cierto('incluye que no se pudo abrir el pago', /no-se-pudo-abrir-el-pago/.test(lista));
  cierto('e incluye que no se pudo guardar', /no-se-pudo-guardar/.test(lista));
  // Y lo que NO tiene que estar: los 409 que la persona SI puede resolver sola tienen su
  // propia salida. Ofrecerle encima un formulario es ruido, y entrena a ignorar la pantalla.
  falso('no ofrece rescate cuando falta la medicion', /sin-medicion/.test(lista));
  falso('ni cuando el sitio no se pudo medir', /no-se-pudo-medir/.test(lista));
}

/* ================================================================== */
console.log('=== NINGUN TEXTO DEL PANEL NOMBRA UNA PASARELA (30-oct) ===');
{
  // Desde que cual cobra es un dato conmutable, un texto que dice «Mercado Pago» se vuelve
  // falso el dia que se cambia el dato, sin que nadie toque el archivo.
  //
  // ⚠️ Pasó de verdad, y en el peor lugar. El 30-oct, con Flow ya cobrando, el panel seguia
  // diciendo «Lo necesita Mercado Pago» justo encima del boton de pagar $177.310. Un dia antes
  // se habia corregido exactamente esto en los textos del SERVIDOR (etapas.js) y nadie miro la
  // pagina: el mismo punto ciego, dos veces en dos dias.
  //
  // Se mira el HTML entero y no solo el panel: la promesa vale para todo lo que lee la persona.
  // ⚠️ SE MIRA LO QUE LA PERSONA LEE, no el codigo. La primera version de esta guardia
  // revisaba el archivo entero y se puso roja por una expresion regular DENTRO de un script
  // (la lista blanca de destinos de pago, que tiene que nombrar los dominios). Una guardia
  // que no distingue el texto del codigo obliga a aflojarla, y aflojada no cuida nada.
  const visible = texto(HTML.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                           .replace(/<!--[\s\S]*?-->/g, ' '));
  for (const re of [/Mercado\s*Pago/i, /\bFlow\b/i, /Webpay/i, /Transbank/i]) {
    const m = visible.match(re);
    eq(`ningun texto visible dice ${re.source.slice(0, 18)}`, m && m[0], null);
  }
}

/* ================================================================== */
console.log('=== A DONDE PUEDE MANDARTE LA PAGINA (la lista blanca de destinos) ===');
{
  // ── POR QUE EXISTE (30-oct-2026) ───────────────────────────────────────────────────────
  //
  // Esta funcion rompio la compra ENTERA y no dejo ni un error que mirar. El servidor ya
  // cobraba por Flow, creaba el pago correctamente y devolvia su URL; la pagina la rechazaba
  // porque la lista solo nombraba a Mercado Pago. El pago quedaba creado del lado de Flow y la
  // persona veia «Reintentar» sin explicacion.
  //
  // Desde el servidor todo se veia bien. Es el peor tipo de error: el que no se queja.
  //
  // La funcion se extrae del HTML y se EJECUTA. Comprobar con una expresion regular que el
  // texto «flow.cl» aparece en el archivo no probaria que la funcion lo acepta.
  const m = HTML.match(/function destinoDePagoValido\(u\)\s*\{[\s\S]*?\n  \}/);
  cierto('la funcion existe y se puede extraer', Boolean(m));
  const destinoValido = m && eval('(' + m[0].replace('function destinoDePagoValido', 'function') + ')');

  const CASOS = [
    ['https://www.flow.cl/app/web/pay.php?token=X', true, 'Flow en produccion'],
    ['https://sandbox.flow.cl/app/web/pay.php?token=X', true, 'Flow en sandbox'],
    ['https://www.mercadopago.cl/checkout/v1/redirect?pref=1', true, 'Mercado Pago, que sigue conmutable'],
    ['https://www.mercadolibre.cl/x', true, 'y su dominio hermano'],
    // ⚠️ El `(^|\.)` del patron es lo que separa un dominio de uno que se le parece. Sin el,
    // cualquiera registra un dominio terminado en «flow.cl» y se lleva a los compradores.
    ['https://malvadoflow.cl/pay', false, 'un dominio que TERMINA en flow.cl'],
    ['https://flow.cl.evil.com/pay', false, 'uno que lo lleva al principio'],
    ['https://evil.com/pay', false, 'cualquier otro'],
    ['http://www.flow.cl/pay', false, 'y sin cifrar, aunque el dominio este bien'],
    ['no-es-una-url', false, 'basura'],
    ['', false, 'vacio'],
  ];
  for (const [u, esperado, porque] of CASOS) {
    eq(`${esperado ? 'acepta' : 'rechaza'} ${porque}`, Boolean(destinoValido && destinoValido(u)), esperado);
  }
}

/* ================================================================== */
console.log('=== LA BARRA DE LA ESPERA MIDE EL GUION REAL (30-oct) ===');
{
  // ── POR QUE ESTA PRUEBA EXISTE ────────────────────────────────────────────────────────
  //
  // La barra de la espera no puede leer avance: el chequeo profundo es UNA llamada que
  // vuelve cuando termino. Lo unico que se puede mostrar sin mentir es el TIEMPO contra
  // nuestro propio guion, cuyos tramos son constantes de `profundo.js`.
  //
  // Eso obliga a repetir esos numeros en la pagina, que no puede importar del servidor.
  // Son DOS CONSTANTES DEL MISMO HECHO: el dia que alguien cambie el guion en el servidor,
  // la barra mentiria —los pasos se encenderian en momentos que ya no ocurren— y nada se
  // quejaria. Esta prueba es lo que hace ruidosa esa divergencia.
  const delServidor = (nombre) => {
    const m = PROFUNDO_FUENTE.match(new RegExp('export const ' + nombre + '\\s*=\\s*(\\d+)'));
    return m ? Number(m[1]) : null;
  };
  const deLaPagina = (nombre) => {
    const m = HTML.match(new RegExp('const ' + nombre + '\\s*=\\s*(\\d+)'));
    return m ? Number(m[1]) : null;
  };

  for (const [servidor, pagina] of [
    ['TRAMO_PASIVO_MS', 'ESPERA_TRAMO_PASIVO_MS'],
    ['TRAMO_GESTO_MS', 'ESPERA_TRAMO_GESTO_MS'],
  ]) {
    const a = delServidor(servidor), b = deLaPagina(pagina);
    cierto(`${servidor} se lee en el servidor`, a !== null);
    cierto(`${pagina} se lee en la pagina`, b !== null);
    eq(`${pagina} calza con ${servidor}`, b, a);
  }

  // Y las piezas de la barra, que son lo que la persona ve.
  cierto('el panel de espera trae la barra', /class="espera-barra"/.test(HTML));
  cierto('y los pasos del guion', /class="espera-pasos"/.test(HTML));
  eq('son cuatro pasos, sin huecos de tiempo sin nadie encendido',
    (HTML.match(/<li data-paso="\d"/g) || []).length, 4);

  // ⚠️ LA ASERCION QUE CUIDA LA HONESTIDAD, que es el punto entero de este diseño.
  // Pasado el estimado la barra tiene que DEJAR de estimar. Una barra clavada cerca del
  // final insinuando que falta poco es la version-loader de una imagen falsa.
  // ⚠️ SE EXIGE EL MECANISMO, NO LA PALABRA. La primera version de esta asercion decia
  // `/sin-estimado/.test(HTML)` y pasaba con solo el CSS presente: al borrar la linea que
  // APLICA la clase, la barra se quedaba estimando para siempre y nada se puso rojo.
  // Comprobado de verdad en el navegador: a los 28 s la tarjeta lleva la clase.
  cierto('el codigo APLICA el estado de "ya no estimo"',
    /classList\.add\('sin-estimado'\)/.test(HTML));
  cierto('y el CSS lo dibuja distinto', /\.sin-estimado[\s\S]{0,200}repeating-linear-gradient/.test(HTML));
  cierto('y se dice en palabras, no solo con rayas', /Ya pasamos el medio minuto/.test(HTML));
  cierto('mientras estima, dice cuanto estima', /Toma alrededor de medio minuto/.test(HTML));

  // Que el tope del relleno no sea 100: el 100% lo pone la llegada del informe, no el reloj.
  const tope = HTML.match(/Math\.min\((\d+),\s*\(ido \/ ESPERA_ESTIMADO_MS\)/);
  cierto('el reloj no puede llegar al 100%', tope && Number(tope[1]) < 100);
}

/* ================================================================== */
console.log('=== LA ESPERA TIENE QUE VERSE, NO SOLO EXISTIR (30-oct) ===');
{
  // ── POR QUE EXISTE ────────────────────────────────────────────────────────────────────
  //
  // La barra se construyo, se probo y funcionaba perfecto... 3.252 px por debajo de la
  // ventana, que mide 768. Medido en produccion: durante los 25 s de espera la persona NO la
  // veia ni una vez. Estaba en el lugar correcto del documento y en ninguna parte de la
  // pantalla.
  //
  // No se arregla con scroll automatico: el codigo tiene una regla explicita de no mover lo
  // que la persona esta leyendo. Se arregla trayendo el aviso a donde ya mira.
  cierto('existe la franja fija', /function crearFlotante/.test(HTML));
  cierto('y se monta al arrancar la barra', /const flotante = crearFlotante\(\)/.test(HTML));

  // ⚠️ QUE ESTE EN LA VENTANA, no en el documento. Un `position: absolute` volveria a dejarla
  // donde nadie la ve, y leyendo el CSS se veria casi igual.
  const css = (HTML.match(/\.espera-flotante\s*\{[^}]*\}/) || [''])[0];
  cierto('va fija a la ventana', /position:\s*fixed/.test(css));
  cierto('y anclada abajo', /bottom:\s*0/.test(css));

  // ⚠️⚠️ LA QUE MAS CUIDA: que se BORRE al terminar. Una franja pegada para siempre tapando
  // el pie de la pagina es peor que no tenerla, y es el tipo de fallo que nadie reporta
  // porque parece parte del diseño.
  const parar = (HTML.match(/function pararBarraEspera\(\)\s*\{[\s\S]*?\n  \}/) || [''])[0];
  cierto('al parar, la franja se quita', /\.remove\(\)/.test(parar));
  cierto('y se busca por su clase', /querySelector\('\.espera-flotante'\)/.test(parar));

  // No duplica el anuncio hablado: la region viva ya lo da.
  cierto('no se anuncia dos veces', /setAttribute\('aria-hidden', 'true'\)/.test(HTML));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
