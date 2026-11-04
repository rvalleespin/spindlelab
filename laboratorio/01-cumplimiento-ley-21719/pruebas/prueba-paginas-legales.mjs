/**
 * Las dos páginas legales del sitio: que se alcancen y que no mientan.
 *
 *   VYC_REPO=/Users/ramon/vyc-ley21719 node prueba-paginas-legales.mjs
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ─────────────────────────────────────────────────────────
 *
 * Dos defectos del mismo día, y los dos son del tipo que no se cae solo.
 *
 * 1. `public/terminos/index.html` se escribió por la mañana y un `grep` de «/terminos» en
 *    `public/` y en `functions/` devolvía CERO. La página existía, respondía 200 y no la
 *    alcanzaba nadie: ni desde el paso de compra, ni desde el pie, ni desde el sitemap. Una
 *    condición de venta que no se puede leer antes de contratar no cumple su función.
 *
 * 2. La política de privacidad publicada (1.8) nombraba a Mercado Pago cinco veces como quien
 *    procesa el pago, y a Flow ninguna. La pasarela había cambiado el 30 de octubre. En un
 *    producto que le revisa a otros sitios si dicen la verdad sobre sus datos, tener mal la
 *    lista de quién los procesa es el peor defecto posible.
 *
 * ── QUÉ CUIDA, Y POR QUÉ ASÍ ────────────────────────────────────────────────────────────
 *
 * - Que el enlace a las condiciones esté DENTRO del panel de compra y ANTES del botón de
 *   pagar, no solo en el pie. El pie lo lee quien ya decidió; lo que cambia una decisión va
 *   donde está el botón. Esto además sostiene una frase de la propia página de condiciones:
 *   que marcar la casilla es aceptarlas.
 *
 * - Que la pasarela que nombran las páginas sea la que de verdad cobra. No se compara contra
 *   una cadena escrita acá: se lee el valor POR OMISIÓN de `pasarelaDe()` en
 *   `functions/api/pedido.js`. Si alguien cambia el camino por omisión y no toca los textos,
 *   esta prueba se pone roja. Dos constantes del mismo hecho que se vigilan entre ellas.
 *
 * - Que el número de versión de la política coincida consigo mismo. Está escrito en dos
 *   partes (la línea de arriba y el punto 01) y se han desincronizado antes.
 *
 * - Que el registro de versiones conserve las entradas viejas. Corregir el presente borrando
 *   el pasado deja a quien compró bajo otra versión sin forma de saber qué le aplicaba.
 *
 * Se busca por CONCEPTO donde se puede. Reescribir un párrafo con otras palabras no tiene que
 * poner roja la prueba; borrar el enlace, cambiar la pasarela o volver al presente con Mercado
 * Pago, sí.
 */

import { readFileSync } from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const INDEX = readFileSync(rutaEnElRepo('verificaycumple/public/index.html', 'VYC_INDEX_HTML'), 'utf8');
const TERMINOS = readFileSync(rutaEnElRepo('verificaycumple/public/terminos/index.html', 'VYC_TERMINOS_HTML'), 'utf8');
const PRIVACIDAD = readFileSync(rutaEnElRepo('verificaycumple/public/privacidad/index.html', 'VYC_PRIVACIDAD_HTML'), 'utf8');
const SITEMAP = readFileSync(rutaEnElRepo('verificaycumple/public/sitemap.xml', 'VYC_SITEMAP'), 'utf8');
const LLMS = readFileSync(rutaEnElRepo('verificaycumple/public/llms.txt', 'VYC_LLMS'), 'utf8');
const PEDIDO_JS = readFileSync(rutaEnElRepo('verificaycumple/functions/api/pedido.js', 'VYC_PEDIDO_JS'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/** El texto visible de un trozo de HTML, sin etiquetas y sin comentarios. */
const texto = (html) => html
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

/** El HTML entre dos marcas. Revienta ruidosamente si alguna no está. */
function trozo(html, desde, hasta, nombre) {
  const i = html.indexOf(desde);
  if (i < 0) throw new Error(`no se encontró el inicio de ${nombre}: ${desde}`);
  const j = html.indexOf(hasta, i);
  if (j < 0) throw new Error(`no se encontró el final de ${nombre}: ${hasta}`);
  return html.slice(i, j);
}

// ── 1 · SE PUEDE LLEGAR A LAS CONDICIONES ANTES DE PAGAR ────────────────────────────────
{
  console.log('\n1 · la página de condiciones se alcanza');

  // Sin comentarios: el comentario que explica por qué el enlace va acá NOMBRA la ruta, así
  // que buscar «/terminos/» a secas lo encontraba a él y la aserción de posición pasaba con
  // el enlace borrado. Se busca el href, y sobre el marcado ya limpio.
  const PANEL = trozo(INDEX, '<form id="compra"', '</form>', 'el panel de compra')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  cierto('el panel de compra enlaza las condiciones', /href="\/terminos\/"/.test(PANEL));

  // Antes del botón, no después: lo que se lee después de pagar no sirve para decidir.
  const posEnlace = PANEL.indexOf('href="/terminos/"');
  const posBoton = PANEL.search(/<button[^>]*type="submit"/);
  cierto('el botón de pagar existe en el panel', posBoton > 0);
  cierto('y el enlace va antes del botón', posEnlace > 0 && posEnlace < posBoton);

  // Pegado a la casilla de consentimiento, que es lo que la página de condiciones dice que
  // es la aceptación. Si el enlace se va a otra parte del panel, la frase vuelve a ser falsa.
  const CASILLA = trozo(PANEL, 'name="consiento"', '</label>', 'la casilla de consentimiento');
  cierto('el enlace está en la casilla de consentimiento', /href="\/terminos\/"/.test(CASILLA));
  cierto('y la casilla sigue siendo obligatoria', /required/.test(CASILLA));
  // La casilla viene sin marcar: un consentimiento premarcado no es consentimiento.
  falso('y no viene premarcada', /checked/.test(CASILLA));

  cierto('el pie de la portada también las enlaza',
    /href="\/terminos\/"/.test(trozo(INDEX, '<footer', '</footer>', 'el pie de la portada')));

  cierto('el sitemap la lista', /<loc>https:\/\/verifica\.spindlelab\.cl\/terminos\/<\/loc>/.test(SITEMAP));
  cierto('llms.txt la lista', /https:\/\/verifica\.spindlelab\.cl\/terminos\//.test(LLMS));

  // Cruzadas: desde cada una se llega a la otra.
  cierto('la política enlaza las condiciones', /href="\/terminos\/"/.test(PRIVACIDAD));
  cierto('las condiciones enlazan la política', /href="\/privacidad\/"/.test(TERMINOS));
}

// ── 2 · LAS PÁGINAS NOMBRAN A QUIEN DE VERDAD COBRA ─────────────────────────────────────
{
  console.log('\n2 · la pasarela que nombran es la que cobra');

  // De dónde sale la verdad: el camino por omisión de `pasarelaDe()`. Hoy cualquier valor
  // que no sea 'mp' cae en Flow. No se escribe 'flow' a mano acá; se lee de ahí.
  const FN = trozo(PEDIDO_JS, 'function pasarelaDe', '}', 'pasarelaDe()');
  const porOmision = (FN.match(/\?\s*'([a-z]+)'\s*:\s*'([a-z]+)'/) || [])[2];
  eq('el camino por omisión del cobro es Flow', porOmision, 'flow');

  const nombre = { flow: 'Flow', mp: 'Mercado Pago' }[porOmision];
  cierto('las condiciones nombran esa pasarela', TERMINOS.includes(nombre));
  cierto('la política también', PRIVACIDAD.includes(nombre));

  // El punto 08 es el que la ley obliga: quién más procesa tus datos.
  const P08_HTML = trozo(PRIVACIDAD, '08 · Transferencias internacionales', '09 · Plazo de conservación', 'el punto 08');
  const P08 = texto(P08_HTML);
  cierto('el punto 08 nombra a quien procesa el pago hoy', P08.includes(nombre));
  // Y dice qué le manda. Lo que viaja no es solo "una referencia": va el correo del comprador
  // y el número completo del pedido.
  cierto('y dice que le manda el correo del comprador', /correo/.test(P08));
  cierto('y el número del pedido', /n[úu]mero de tu pedido/.test(P08));
  // El enlace a la política del proveedor, en el host que responde: www.flow.cl/es-cl/legal/
  // da 404 (comprobado el 3-nov-2026).
  // Sobre el HTML, no sobre el texto: `texto()` borra las etiquetas y con ellas el href.
  cierto('y enlaza la política del proveedor', /href="https:\/\/web\.flow\.cl\/es-cl\/legal\//.test(P08_HTML));
  // Solo los enlaces de verdad: un comentario puede nombrar el host malo para explicar por
  // qué no se usa, y eso no es un enlace roto.
  const hrefs = PRIVACIDAD.replace(/<!--[\s\S]*?-->/g, ' ').match(/href="[^"]*"/g) || [];
  falso('sin apuntar al host que da 404', hrefs.some((h) => h.includes('www.flow.cl/es-cl/legal')));

  // ⚠️ ESTA ASERCIÓN DECÍA LO CONTRARIO HASTA EL 4-NOV, Y SE PUSO ROJA ANTE UN CAMBIO BUENO.
  //
  // Escrita el 3-nov, exigía que NO apareciera ninguna razón social para Flow, porque ese día
  // no estaba verificada y las fuentes de terceros no coincidían entre sí. Al día siguiente el
  // dato se sacó de la propia página legal de Flow y se escribió en la política: la aserción
  // se puso roja ante exactamente el cambio que había que hacer.
  //
  // El defecto no era el dato, era la aserción: fijaba EL ESTADO DE ESE DÍA («no hay razón
  // social») en vez de LA REGLA («no se publica una razón social sin verificar»). Una prueba
  // escrita así se vuelve un candado contra su propio arreglo.
  //
  // Reescrita para decir la regla: si aparece una razón social de Flow, tiene que ser una de
  // las dos de su página legal, con su RUT al lado. Cualquier otra es inventada y cae.
  {
    const VERIFICADAS = [
      ['Flow S.A.', '76.830.014-3'],
      ['Flow Pagos Chile SpA', '76.644.017-7'],
    ];
    const mencionadas = PRIVACIDAD.match(/Flow[^.,;()]{0,24}?(?:S\.A\.|SpA)/g) || [];
    for (const m of mencionadas) {
      const limpia = m.replace(/\s+/g, ' ').trim();
      const conocida = VERIFICADAS.find(([nombre]) => limpia.endsWith(nombre) || nombre.endsWith(limpia));
      cierto(`«${limpia}» es una razón social verificada de Flow`, Boolean(conocida));
      if (conocida) {
        cierto(`y va con su RUT ${conocida[1]}`, PRIVACIDAD.includes(conocida[1]));
      }
    }
  }
  cierto('pero queda anotado que falta', /raz[óo]n social de Flow/i.test(PRIVACIDAD));

  // Ninguna frase en PRESENTE puede seguir diciendo que cobra Mercado Pago. En pasado sí:
  // es cierto de las versiones viejas y borrarlo sería reescribir la historia.
  const presenteMP = [
    /ocurre en Mercado Pago/,
    /lo procesa Mercado Pago/,
    /Mercado Pago[^.]{0,60}\bprocesa\b/,
    /Mercado Pago[^.]{0,60}\bcobra\b/,
  ];
  falso('ninguna frase dice en presente que cobra Mercado Pago',
    presenteMP.some((re) => re.test(PRIVACIDAD)));
  cierto('pero el pasado se conserva', /Mercado Pago[^.]{0,80}proces[óa]ba?\b/.test(PRIVACIDAD));
}

// ── 3 · LA VERSIÓN DE LA POLÍTICA NO SE CONTRADICE A SÍ MISMA ───────────────────────────
{
  console.log('\n3 · el número de versión y el registro');

  // El punto final de la frase no es parte del número: `[\d.]+` se lo tragaba y dejaba
  // «1.9.» contra «1.9», o sea un rojo que no era del sitio.
  const arriba = (PRIVACIDAD.match(/class="version">Versi[óo]n\s+(\d+\.\d+)/) || [])[1];
  const dentro = (PRIVACIDAD.match(/Esta es la versi[óo]n\s+(\d+\.\d+)/) || [])[1];
  cierto('la línea de arriba trae un número', Boolean(arriba));
  eq('y el punto 01 dice el mismo', dentro, arriba);
  // Subió respecto de la publicada, que es la 1.8 del 24-oct.
  cierto('y es posterior a la 1.8 publicada', parseFloat(arriba) > 1.8);
  cierto('la fecha de arriba es la de este cambio', /3 de noviembre de 2026/.test(
    (PRIVACIDAD.match(/class="version">[^<]*/) || [''])[0]));

  const P01 = texto(trozo(PRIVACIDAD, '01 · Política de tratamiento', '02 · El responsable', 'el punto 01'));
  // La entrada nueva cuenta el cambio de pasarela, que es el motivo de esta versión.
  cierto('el registro cuenta el cambio de pasarela', /Flow/.test(P01) && /Mercado Pago/.test(P01));
  // Y las entradas viejas siguen ahí. Quien compró bajo la 1.6 tiene que poder leer qué decía.
  // Por su ENTRADA («La 1.6, …»), no por la cadena «1.6» suelta: ese número aparece también
  // dentro del relato de otra entrada, así que el `includes` seguía verde con la entrada
  // borrada. Es exactamente la aserción decorativa que hay que rehacer.
  for (const v of ['1.8', '1.7', '1.6', '1.4', '1.3', '1.2', '1.1', '1.0']) {
    cierto(`el registro conserva la ${v}`,
      new RegExp(`La ${v.replace('.', '\\.')}[,\\s]`).test(P01));
  }
  // La entrada de la 1.8 dejó de encabezar el registro: si sigue diciendo «En esta versión»,
  // le está atribuyendo a la nueva lo que hizo aquella.
  const i19 = P01.indexOf('En esta versión');
  const i18 = P01.indexOf('La 1.8');
  cierto('la entrada nueva encabeza el registro', i19 > 0 && i18 > i19);
  cierto('y la 1.8 quedó reencabezada con su número', /La 1\.8, del 24 de octubre/.test(P01));
}

// ── 4 · EL MARCO DE LA PÁGINA DE CONDICIONES ────────────────────────────────────────────
{
  console.log('\n4 · el marco de la página de condiciones');

  // Las dos páginas legales comparten hoja de estilos escrita a mano. Un parche puesto solo en
  // una las separa, y el parche que había (un h1 más chico «para que quepa en 390») arreglaba
  // un corte que no existe: era la captura headless, que en este Mac maqueta a 500 px y recorta
  // a 390. Medido a 390 de verdad, ninguna de las dos se sale.
  const estiloT = trozo(TERMINOS, '<style>', '</style>', 'la hoja de estilos de condiciones');
  const estiloP = trozo(PRIVACIDAD, '<style>', '</style>', 'la hoja de estilos de privacidad');
  const reglasH1 = (s) => (s.replace(/\/\*[\s\S]*?\*\//g, '').match(/(^|[\s}])h1\s*\{/g) || []).length;
  eq('la hoja de condiciones declara el h1 una sola vez', reglasH1(estiloT), 1);
  eq('igual que la de privacidad', reglasH1(estiloT), reglasH1(estiloP));

  // Tapar el desborde no es arreglarlo, y acá además no había desborde que tapar.
  falso('no se tapa nada con overflow-x', /overflow-x\s*:\s*hidden/.test(TERMINOS));

  // La tarjeta para compartir es de ESTA página. Se armó copiando la de privacidad y las tres
  // etiquetas se habían quedado con el título, la bajada y la URL de aquella.
  const og = (prop) => (TERMINOS.match(new RegExp(`property="og:${prop}" content="([^"]*)"`)) || [])[1] || '';
  eq('og:url apunta a las condiciones', og('url'), 'https://verifica.spindlelab.cl/terminos/');
  cierto('og:title habla de las condiciones', /[Cc]ondiciones de venta/.test(og('title')));
  falso('y no de la política', /[Pp]ol[íi]tica de privacidad/.test(og('title')));
  cierto('og:description también', /retracto|condiciones de venta/i.test(og('description')));
  cierto('el canonical ya apuntaba acá',
    /rel="canonical" href="https:\/\/verifica\.spindlelab\.cl\/terminos\/"/.test(TERMINOS));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
