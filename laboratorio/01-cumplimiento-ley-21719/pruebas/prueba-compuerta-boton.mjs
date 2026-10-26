/**
 * La compuerta del botón de compra, en la página.
 *
 *   node prueba-compuerta-boton.mjs
 *
 * Hasta el 24-oct el botón «Quiero el kit» se dibujaba con `pendientes > 0`, que NO es lo que
 * el servidor exige. La diferencia no era teórica: cuatro situaciones reales mostraban el
 * botón, la persona escribía su correo, marcaba la casilla, apretaba pagar y recibía un
 * rechazo. Ofrecer algo que uno va a negar es peor que no ofrecerlo.
 *
 * Esta prueba cuida dos cosas distintas:
 *
 *   1. Que `sePuedeVender` decida lo mismo que `elegibilidad()` para los informes que importan.
 *      No se comparan las implementaciones, se comparan sus RESPUESTAS.
 *   2. Que la lista `CIERRA_EL_KIT` duplicada en el HTML sea igual al conjunto que exporta
 *      `elegibilidad.js`. La duplicación es deliberada —el navegador no puede preguntarle al
 *      servidor antes de dibujar— y el precedente está en el archivo: la lista de orígenes
 *      también vive en dos lados con una prueba que las compara.
 */

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple';
process.env.ELEGIBILIDAD_JS = `${RAIZ}/functions/api/elegibilidad.js`;

import { readFileSync } from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const EL = await import(rutaEnElRepo('verificaycumple/functions/api/elegibilidad.js', 'ELEGIBILIDAD_JS'));
const HTML = readFileSync(`${RAIZ}/public/index.html`, 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/* ── Se saca `sePuedeVender` del propio HTML y se ejecuta ────────────────────────────────
 *
 * Se extrae en vez de reescribirse acá: una copia de la función en la prueba probaría la copia,
 * no la que corre en la página, y ese es el falso verde clásico de este tipo de prueba.
 */
const mLista = HTML.match(/var CIERRA_EL_KIT = (\[[^\]]*\]);/);
const mFn = HTML.match(/function sePuedeVender\(data\) \{[\s\S]*?\n  \}/);
if (!mLista || !mFn) {
  console.log('  FALLA no encontré CIERRA_EL_KIT o sePuedeVender en index.html');
  console.log('\n0 bien, 1 mal');
  process.exit(1);
}
const listaHtml = JSON.parse(mLista[1].replace(/'/g, '"'));
// `estadoDe` también vive en la página; acá se usa la versión mínima equivalente, porque lo que
// se está probando es la compuerta, no el normalizador de estados.
const sePuedeVender = new Function('CIERRA_EL_KIT', 'estadoDe', `${mFn[0]}; return sePuedeVender;`)(
  listaHtml, (i) => i.estado,
);

const item = (id, estado = 'pendiente') => ({ id, estado, ok: estado === 'ok', titulo: id, peso: 3 });
const informe = (items, extra = {}) => ({
  ok: true, dominio: 'ejemplo.cl', revisado: 'https://ejemplo.cl/',
  puntaje: 50, parcial: false, bloqueado: null, items, ...extra,
});

/* ================================================================== */
console.log('=== 1. la lista duplicada no se separó ===');
{
  eq('la del HTML es igual a la del servidor',
    [...listaHtml].sort(), [...EL.CIERRA_EL_KIT].sort());
  // Y ninguna señal puede estar en los dos conjuntos a la vez: eso sería una contradicción
  // sobre si el kit la cierra o no.
  const enAmbos = [...EL.CIERRA_EL_KIT].filter((id) => id in EL.NO_LO_CIERRA_EL_KIT);
  eq('ninguna señal está en los dos conjuntos', enAmbos, []);
}

/* ================================================================== */
console.log('=== 2. los cuatro casos que el servidor rechaza ya no muestran el botón ===');
{
  // Cada caso se comprueba DOS veces: que la página no lo ofrezca, y que el servidor en efecto
  // lo habría rechazado. Si solo se mirara lo primero, la prueba fijaría la compuerta sin
  // comprobar que coincide con la verdad.
  const casos = [
    ['solo la política pendiente', informe([item('politica'), item('https', 'ok')])],
    ['solo la casilla pendiente', informe([item('casilla'), item('https', 'ok')])],
    ['sin puntaje, con pendientes', informe([item('cmp')], { puntaje: null })],
    ['informe parcial, con pendientes', informe([item('carga')], { parcial: true })],
    ['informe bloqueado, con pendientes', informe([item('carga')], { bloqueado: 'portero' })],
  ];
  for (const [nombre, inf] of casos) {
    falso(`${nombre}: la página NO ofrece el kit`, sePuedeVender(inf));
    falso(`${nombre}: y el servidor tampoco lo habría vendido`,
      EL.elegibilidad({ rapido: inf }).puede);
  }
}

/* ================================================================== */
console.log('=== 3. y donde sí se puede vender, se ofrece ===');
{
  const casos = [
    ['falta el permiso antes de cargar', informe([item('cmp'), item('politica')])],
    ['rastreadores que parten solos', informe([item('carga')])],
    ['cookies sin permiso', informe([item('cookies'), item('https', 'ok')])],
    ['datos que ya salieron', informe([item('envio')])],
    ['sin aviso al entrar', informe([item('aviso')])],
  ];
  for (const [nombre, inf] of casos) {
    cierto(`${nombre}: la página ofrece el kit`, sePuedeVender(inf));
    cierto(`${nombre}: y el servidor lo vendería`, EL.elegibilidad({ rapido: inf }).puede);
  }
}

/* ================================================================== */
console.log('=== 4. el paso de compra existe y no manda de más ===');
{
  cierto('el formulario está en el HTML', /<form id="compra"/.test(HTML));
  cierto('nace oculto', /<form id="compra" class="compra" hidden>/.test(HTML));
  cierto('pide el correo', /name="correo"/.test(HTML));
  cierto('y el consentimiento', /name="consiento"/.test(HTML));

  // Lo que NO puede mandar: el monto ni las señales. Si el navegador mandara el precio, el
  // comprador elegiría cuánto paga.
  const envio = HTML.match(/body: JSON\.stringify\(\{[\s\S]*?\}\),/);
  cierto('el fetch arma su cuerpo', Boolean(envio));
  const cuerpo = envio ? envio[0] : '';
  cierto('manda el dominio', /dominio:/.test(cuerpo));
  cierto('el correo', /correo:/.test(cuerpo));
  cierto('y el consentimiento', /consiento:/.test(cuerpo));
  falso('NO manda el monto', /monto|precio|177310|149000/.test(cuerpo));
  falso('ni las señales', /senales|cierra/.test(cuerpo));

  // El consentimiento viaja como booleano estricto, que es lo que el servidor exige.
  cierto('el consentimiento va como === true', /\.checked === true/.test(cuerpo));
}

/* ================================================================== */
console.log('=== 5. no se navega a cualquier parte ===');
{
  // `location.assign` sobre una cadena sin mirar es el único punto de este flujo donde un valor
  // malo se vuelve una redirección a cualquier parte. La URL viene de nuestro servidor, pero
  // nuestro servidor la recibió de un tercero.
  const mV = HTML.match(/function destinoDePagoValido\(u\) \{[\s\S]*?\n  \}/);
  cierto('existe la comprobación del destino', Boolean(mV));
  if (mV) {
    const valido = new Function(`${mV[0]}; return destinoDePagoValido;`)();
    cierto('acepta el dominio de Mercado Pago',
      valido('https://www.mercadopago.cl/checkout/v1/redirect?order_id=ORD1'));
    cierto('y el de Mercado Libre', valido('https://www.mercadolibre.cl/x'));
    falso('rechaza http', valido('http://www.mercadopago.cl/x'));
    falso('rechaza otro dominio', valido('https://sitio-cualquiera.cl/x'));
    // El que más importa: un dominio que TERMINA pareciéndose.
    falso('rechaza un dominio que solo se le parece', valido('https://mercadopago.cl.malo.cl/x'));
    falso('y uno que lo lleva de prefijo', valido('https://mercadopago.cl-falso.cl/x'));
    falso('una cadena cualquiera', valido('no-es-una-url'));
  }
}

/* ================================================================== */
console.log('=== 6. el precio quedó cerrado en toda la página ===');
{
  // Se miran los COMENTARIOS APARTE. Un comentario de CSS explica por qué existe una regla de
  // salto de línea y cita el texto viejo para justificar su medida: eso es historia legítima y
  // no se renderiza. Lo que no puede quedar es un «Desde $149.000» que la gente lea.
  const sinComentarios = HTML
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  falso('no queda ningún «Desde $149.000» a la vista', /Desde \$149\.000/.test(sinComentarios));
  // ⚠️ `includes('177.310')` pasaba también con «$1.177.310», que es un precio distinto. Lo
  // señaló una revisión externa. Ahora se mira el nodo del precio de la tarjeta del kit y se
  // exige que el número que lo rodea sea exactamente ese.
  cierto('aparece el total con IVA', sinComentarios.includes('177.310'));
  const tarjeta = sinComentarios.match(/<p class="kit-monto">([\s\S]*?)<\/p>/);
  cierto('la tarjeta del kit tiene su monto', Boolean(tarjeta));
  if (tarjeta) {
    const numeros = (tarjeta[1].match(/\$[\d.]+/g) || []).map((x) => x.replace(/[^\d]/g, ''));
    eq('y sus cifras son exactamente el neto y el total', numeros.sort(), ['149000', '177310']);
  }

  // El FAQ del schema y el visible tienen que decir lo mismo: el propio archivo lo pide con un
  // ⚠️, y hasta ahora nada lo hacía cumplir.
  const frase = 'El kit de implementación cuesta $149.000 más IVA, o sea $177.310 en total, una vez.';
  eq('la frase del precio aparece dos veces: en el schema y a la vista',
    HTML.split(frase).length - 1, 2);

  // Y el dato estructurado no puede contradecir a la página.
  const ld = [...HTML.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1]));
  const nodos = ld.flatMap((d) => d['@graph'] || [d]);
  const kit = nodos.find((n) => n['@id'] && String(n['@id']).endsWith('#kit'));
  cierto('hay un nodo del kit en el JSON-LD', Boolean(kit));
  if (kit) {
    eq('con el precio total', kit.offers.price, '177310');
    eq('en pesos', kit.offers.priceCurrency, 'CLP');
    // `price` no tiene variante «más impuestos»: publicar 149000 sería publicar un precio que
    // nadie paga.
    eq('y declarando que el IVA va incluido', kit.offers.valueAddedTaxIncluded, true);
  }
}

/* ── EL BOTÓN NO PUEDE INVITAR A COMPRAR ANTES DE QUE SE PUEDA VENDER ──────────────────
 *
 * El 26-oct Ramón apretó «Quiero el kit» y recibió un 409. Los tiempos del servidor:
 *
 *     0,0s  /api/chequeo     2,7s   200
 *     1,6s  /api/profundo   33,6s   200   ← todavía corriendo
 *    23,0s  /api/pedido      0,2s   409   ← apretó acá
 *
 * El botón se dibuja con el chequeo RÁPIDO, que vuelve en un segundo; el servidor exige la
 * revisión con NAVEGADOR, que tarda medio minuto. En esa ventana la página invita a comprar
 * algo que todavía no se puede vender, y el que aprieta rápido es el que se lleva el error.
 *
 * ⚠️ EL PRIMER ARREGLO NO FUNCIONÓ, Y ESTA PRUEBA LO DIO POR BUENO. Usaba un `let` compartido
 * entre el chequeo y el panel, pero los dos viven en IIFE DISTINTAS: `abrirCompra` reventaba
 * con «profundoListo is not defined» justo en esa línea, en silencio —el panel ya se había
 * movido y enfocado antes— y el botón quedaba habilitado igual. La versión anterior de estas
 * aserciones buscaba la variable con una expresión regular, la encontraba escrita, y daba todo
 * por correcto: un `grep` ve el nombre y NO VE EL ÁMBITO. Lo cazó el navegador.
 *
 * Por eso ahora el estado viaja por el DOM: un atributo en `<html>` más un evento. Eso cruza la
 * frontera de las IIFE por construcción, así que el fallo de ámbito deja de ser posible, y
 * además se puede mirar desde fuera. Lo que de verdad prueba el arreglo sigue siendo abrir la
 * página en un navegador Y MIRAR LA CONSOLA; esto es el centinela del mecanismo.
 */
console.log('=== el panel de compra espera a la revisión con navegador ===');
{
  // El chequeo anuncia por el DOM, no por una variable.
  cierto('anuncia el estado en un atributo del documento',
    /setAttribute\('data-profundo', estado\)/.test(HTML));
  cierto('y además lo avisa con un evento', /new CustomEvent\('vyc:profundo'/.test(HTML));
  cierto('sin romperse en un navegador sin CustomEvent', /catch \(e\) \{[^}]*\}/.test(HTML));

  // Los tres momentos, cada uno con su anuncio.
  eq('hay un anuncio por cada desenlace', (HTML.match(/anunciarProfundo\('/g) || []).length, 4);
  cierto('al empezar una corrida: en vuelo', /anunciarProfundo\('en-vuelo'\)/.test(HTML));
  cierto('cuando la revisión vuelve bien: listo',
    /data\.ok === true\)\s*\{[\s\S]{0,160}anunciarProfundo\('listo'\)/.test(HTML));
  eq('y dos caminos de fallo lo dicen', (HTML.match(/anunciarProfundo\('fallo'\)/g) || []).length, 2);

  // El panel LEE EL DOM. Si volviera a leer una variable, el fallo de ámbito podría repetirse.
  cierto('el panel lee el estado del documento',
    /getAttribute\('data-profundo'\)/.test(HTML));
  cierto('y se vuelve a pintar cuando el chequeo avisa',
    /addEventListener\('vyc:profundo', pintarEspera\)/.test(HTML));
  cierto('al abrir el panel se pinta la espera', /pintarEspera\(\);\s*\n\s*\}/.test(HTML));

  const i = HTML.indexOf('function pintarEspera');
  const bloque = i > 0 ? HTML.slice(i, i + 1300) : '';
  cierto('con la medición lista, el botón se suelta', /estado === 'listo'[\s\S]{0,120}soltarBotonCompra\(\)/.test(bloque));
  cierto('y si no, queda deshabilitado', /b\.disabled = true;/.test(bloque));
  cierto('diciendo que está revisando', /Revisando tu sitio/.test(bloque));
  cierto('y que se activa solo', /se activa solo/.test(bloque));
  cierto('un fallo lo dice en vez de esperar para siempre', /No se pudo revisar/.test(bloque));

  // El respaldo del servidor: su mensaje ya no manda a repetir lo que la persona acaba de hacer.
  const SRV = readFileSync(`${RAIZ}/functions/api/pedido.js`, 'utf8');
  const j = SRV.indexOf("motivo: 'sin-medicion'");
  const msg = j > 0 ? SRV.slice(j, SRV.indexOf('}, 409)', j)) : '';
  cierto('el 409 nombra la segunda parte del chequeo', /segunda parte/.test(msg));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
