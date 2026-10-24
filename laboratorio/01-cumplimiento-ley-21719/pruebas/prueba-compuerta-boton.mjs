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
  cierto('aparece el total con IVA', sinComentarios.includes('177.310'));

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

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
