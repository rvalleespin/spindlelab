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
// `sePuedeVender` delega en `seAlcanzoAMedir` desde el 2-nov, así que se extraen las dos. Si
// faltara, la prueba reventaría con un ReferenceError en vez de fallar: se aborta a propósito
// con un mensaje, que es la diferencia entre acusar y morirse.
const mMedir = HTML.match(/function seAlcanzoAMedir\(data\) \{[\s\S]*?\n  \}/);
if (!mLista || !mFn || !mMedir) {
  console.log('  FALLA no encontré CIERRA_EL_KIT, sePuedeVender o seAlcanzoAMedir en index.html');
  console.log('\n0 bien, 1 mal');
  process.exit(1);
}
const listaHtml = JSON.parse(mLista[1].replace(/'/g, '"'));
// `estadoDe` también vive en la página; acá se usa la versión mínima equivalente, porque lo que
// se está probando es la compuerta, no el normalizador de estados.
const sePuedeVender = new Function('CIERRA_EL_KIT', 'estadoDe',
  `${mMedir[0]}; ${mFn[0]}; return sePuedeVender;`)(listaHtml, (i) => i.estado);

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
    // `politica` SALIÓ de esta lista el 2-nov-2026: por decisión de Ramón el kit también se le
    // ofrece a quien solo tiene eso pendiente, porque medido sobre 40 sitios reales ese era el
    // caso dominante entre los que llegaban al resultado sin nada que comprar. Pasó a la
    // sección 3. Lo que sigue acá son los que de verdad no se venden.
    ['solo la casilla pendiente', informe([item('casilla'), item('https', 'ok')])],
    ['solo el HTTPS pendiente, que es del hosting', informe([item('https'), item('politica', 'ok')])],
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
    // El caso nuevo, y el que más importa de los cinco: sitio sin un solo rastreador al que
    // solo le falta publicar la política. Era el que se iba sin oferta.
    ['solo la política pendiente', informe([item('politica'), item('https', 'ok')])],
  ];
  for (const [nombre, inf] of casos) {
    cierto(`${nombre}: la página ofrece el kit`, sePuedeVender(inf));
    cierto(`${nombre}: y el servidor lo vendería`, EL.elegibilidad({ rapido: inf }).puede);
  }
}

/* ================================================================== */
console.log('=== 3 bis. vender la política obliga a decir qué se entrega ===');
{
  /* El kit NO publica la política: entrega el borrador, lo revisa el abogado del cliente y lo
   * publica él. Mientras `politica` estuvo fuera de lo que el kit cierra, eso lo decía la nota
   * de «lo que queda fuera». Al moverla adentro, esa nota deja de salir para quien no tiene
   * señales fuera — que es justo este comprador. Sin estas aserciones, el cambio del 2-nov
   * convierte una venta honesta en una promesa que no cumplimos. */
  const soloPolitica = EL.elegibilidad({ rapido: informe([item('politica'), item('https', 'ok')]) });
  cierto('se vende', soloPolitica.puede);
  // El ayudante `item` de este archivo pone el id como título, así que lo que se comprueba es
  // el invariante: que el detalle nombre la señal con SU título, sea cual sea. Con los títulos
  // de verdad lo cubre prueba-elegibilidad.
  cierto('el contrato nombra la señal con su título', /«politica»/.test(soloPolitica.detalle));
  cierto('y dice que es el BORRADOR', /borrador/i.test(soloPolitica.detalle));
  cierto('y que lo revisa su abogado', /abogado/i.test(soloPolitica.detalle));
  cierto('y que lo publica él', /lo publicas tú/i.test(soloPolitica.detalle));

  // Y cuando la política NO entra, no se cuela esa coletilla.
  const sinPolitica = EL.elegibilidad({ rapido: informe([item('cmp'), item('politica', 'ok')]) });
  falso('sin política contratada no se habla del borrador', /borrador/i.test(sinPolitica.detalle));

  // El panel de compra no puede prometer en firme el gestor: a este sitio no se le instala.
  falso('el panel no promete el gestor en seco',
    /Dejamos instalado el gestor de consentimiento,/.test(HTML));
  cierto('lo dice condicionado a que haya rastreadores',
    /gestor de consentimiento si tu sitio carga rastreadores/.test(HTML));

  // Y la pantalla del pedido explica qué llega, porque es donde se mira después de pagar.
  // ⚠️ `readFileSync`, no `fs.readFileSync`: arriba se importa el nombre suelto, no el módulo.
  // Decía `fs.` y reventaba con `ReferenceError: fs is not defined` justo en esta línea, así
  // que el archivo moría acá y las 61 aserciones que vienen después NUNCA SE CORRÍAN —entre
  // ellas las que cuidan el panel de compra—. Nadie lo notó porque una prueba que revienta no
  // acusa: no reporta fallas, no reporta nada. Arreglado el 2-nov-2026.
  const PEDIDO = readFileSync(
    rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');
  cierto('la pantalla del pedido lo aclara cuando la política viene contratada',
    /i\.id === 'politica'[\s\S]{0,400}borrador/.test(PEDIDO));
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

  // Los momentos, cada uno con su anuncio.
  cierto('al empezar una corrida: en vuelo', /anunciarProfundo\('en-vuelo'\)/.test(HTML));
  eq('y dos caminos de fallo lo dicen', (HTML.match(/anunciarProfundo\('fallo'\)/g) || []).length, 2);

  /* ⚠️ LA ASERCIÓN QUE ESTABA ACÁ FIJABA EL DEFECTO COMO SI FUERA LO CORRECTO.
   *
   * Exigía literalmente que `data.ok === true` llevara a `anunciarProfundo('listo')`, y eso es
   * justo lo que había que cambiar: `/api/profundo` devuelve SIEMPRE `ok: true` y pone
   * `parcial` y `bloqueado` como banderas aparte, así que un sitio que no se pudo medir
   * entraba por ahí, se anunciaba «listo», y el panel soltaba «Ir a pagar» para después
   * comerse un 409 del servidor. La aserción no solo no lo cazaba: lo defendía.
   *
   * Y ni siquiera llegaba a correr, porque el archivo moría antes (ver la línea del `fs`).
   * Las dos cosas juntas son la lección: una prueba que revienta no acusa, y una prueba que
   * copia el código en vez de describir la intención aprueba el error.
   */
  cierto('cuando la revisión vuelve, el anuncio depende de si se alcanzó a MEDIR',
    /data\.ok === true\)[\s\S]{0,1400}anunciarProfundo\(seAlcanzoAMedir\(data\) \? 'listo' : 'sin-medir'\)/.test(HTML));
  cierto('«sin-medir» es un estado de verdad, no una cadena suelta',
    /anunciarProfundo\(estado\)\s*\{[\s\S]{0,40}'sin-medir'/.test(HTML) ||
    /'en-vuelo' · 'listo' · 'sin-medir' · 'fallo'/.test(HTML));

  // El panel LEE EL DOM. Si volviera a leer una variable, el fallo de ámbito podría repetirse.
  cierto('el panel lee el estado del documento',
    /getAttribute\('data-profundo'\)/.test(HTML));
  cierto('y se vuelve a pintar cuando el chequeo avisa',
    /addEventListener\('vyc:profundo', pintarEspera\)/.test(HTML));
  cierto('al abrir el panel se pinta la espera', /pintarEspera\(\);\s*\n\s*\}/.test(HTML));

  // 2200 y no 1300: la rama de «sin-medir» alargó la función, y con la ventana corta las dos
  // aserciones del final daban falso sin que nada estuviera roto.
  const i = HTML.indexOf('function pintarEspera');
  const bloque = i > 0 ? HTML.slice(i, i + 2200) : '';
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

/* ==================================================================================
 *
 * EL CALLEJÓN SIN SALIDA DEL INFORME QUE NO MIDIÓ (2-nov-2026)
 *
 * Reproducido en el navegador antes de arreglarlo, sirviendo la página contra un servidor
 * que devolvía un informe profundo real marcado `parcial`:
 *
 *   versión anterior → data-profundo="listo", botón «Ir a pagar» HABILITADO,
 *                      y un POST de verdad a /api/pedido (el 409 en producción)
 *   versión nueva    → data-profundo="sin-medir", botón «No alcanzamos a medirlo»
 *                      deshabilitado, y CERO POST (ni con Enter ni con requestSubmit)
 *
 * Lo de abajo es el centinela de ese arreglo. Lo que lo probó fue el navegador.
 */
console.log('=== el informe que no midió no suelta el botón ===');
{
  const i = HTML.indexOf('function pintarEspera');
  const bloque = i > 0 ? HTML.slice(i, i + 2200) : '';

  cierto('hay una rama propia para «no se pudo medir»', /estado === 'sin-medir'/.test(bloque));
  cierto('y el botón lo dice en vez de invitar a pagar', /No alcanzamos a medirlo/.test(bloque));
  // Ojo: el texto está partido por una concatenación en el fuente, así que la frase completa
  // no existe como una sola cadena. Se busca el trozo que no se parte.
  cierto('el mensaje explica que no se cotiza lo que no se vio',
    /cotizar lo que no vimos/.test(bloque));
  cierto('y ofrece la salida, que es volver a medir', /Vuelve a medirlo/.test(bloque));

  // La rama tiene que estar ANTES del `else` genérico, o «sin-medir» cae en «Revisando tu
  // sitio…» y la persona espera para siempre una medición que ya volvió.
  const iSinMedir = bloque.indexOf("estado === 'sin-medir'");
  const iRevisando = bloque.indexOf('Revisando tu sitio');
  cierto('y va antes del mensaje de espera, no después', iSinMedir > 0 && iSinMedir < iRevisando);

  // El envío no confía en el botón deshabilitado.
  cierto('el envío se corta si la medición no está lista',
    /estadoDelProfundo\(\) !== 'listo'\) \{ pintarEspera\(\); return; \}/.test(HTML));
  const iGuarda = HTML.indexOf("estadoDelProfundo() !== 'listo'");
  const iFetch = HTML.indexOf("fetch('/api/pedido'");
  cierto('y la guarda está antes del fetch, no después', iGuarda > 0 && iGuarda < iFetch);

  // El criterio es UNO y se usa en los dos lados: el botón del resultado y el del panel.
  cierto('existe `seAlcanzoAMedir` como criterio único', /function seAlcanzoAMedir\(data\)/.test(HTML));
  cierto('y `sePuedeVender` se apoya en él en vez de repetirlo',
    /function sePuedeVender\(data\) \{\s*\n\s*if \(!seAlcanzoAMedir\(data\)\) return false;/.test(HTML));

  // El gemelo del servidor. Si uno de los dos cambia de criterio, el botón vuelve a prometer
  // lo que el servidor niega: es la misma razón por la que se compara `CIERRA_EL_KIT`.
  const ELEG = readFileSync(`${RAIZ}/functions/api/elegibilidad.js`, 'utf8');
  cierto('el servidor sigue declinando por `parcial`', /informe\.parcial/.test(ELEG));
  cierto('y por `bloqueado`', /informe\.bloqueado/.test(ELEG));
  cierto('y por un puntaje nulo', /informe\.puntaje === null/.test(ELEG));
}

/* ==================================================================================
 *
 * LAS DOS IIFE NO SE VEN ENTRE SÍ (y ya costó caro tres veces)
 *
 * El <script> grande tiene dos funciones anónimas que se ejecutan solas. Un nombre declarado
 * dentro de una y usado dentro de la otra parsea perfecto, pasa `node --check`, y revienta en
 * el navegador con `ReferenceError`.
 *
 * Pasó con `paramOrigen` (el chequeo entero dejó de funcionar) y estaba pasando con
 * `CONTACTO`: declarado en la primera IIFE y usado en TRES líneas de la segunda, todas en el
 * camino del error de la compra. O sea que cuando el pago no se podía abrir, en vez del
 * mensaje saltaba un ReferenceError y la persona se quedaba sin mensaje y sin rescate.
 *
 * Esto no es una lista de nombres a mano: busca TODO lo declarado en la primera IIFE y usado
 * en la segunda. Una prueba con una lista curada solo encuentra lo que ya sabíamos.
 */
console.log('=== nada declarado en una IIFE se usa desde la otra ===');
{
  // Las fronteras: las dos IIFE empiezan en una línea que es exactamente `(function () {`.
  const lineas = HTML.split('\n');
  const aperturas = [];
  const cierres = [];
  lineas.forEach((l, n) => {
    if (l === '(function () {') aperturas.push(n);
    if (l === '})();') cierres.push(n);
  });
  eq('hay exactamente dos IIFE en el bloque grande', aperturas.length, 2);

  const trozo = (desde, hasta) => lineas.slice(desde, hasta).join('\n');
  const A = trozo(aperturas[0], cierres.find((c) => c > aperturas[0]));
  const B = trozo(aperturas[1], cierres.find((c) => c > aperturas[1]));
  cierto('la primera IIFE tiene cuerpo', A.length > 1000);
  cierto('la segunda también', B.length > 1000);

  // Lo declarado arriba de todo (fuera de las dos) es el terreno compartido y está permitido.
  const COMPARTIDO = trozo(0, aperturas[0]);

  /* Los comentarios y las cadenas NO son código, y confundirlos da falsos rojos ruidosos: la
   * primera versión de esto acusó `anunciarProfundo` porque el nombre aparece dentro de un
   * comentario de la segunda IIFE que dice «ver `anunciarProfundo`». Se vacían antes de mirar. */
  const sinRuido = (t) => t
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');

  /* Lo que un trozo DECLARA: no solo `const/let/var/function`, también los parámetros de las
   * funciones y las flechas, el `catch (e)` y el `for (const x ...)`. Sin los parámetros, cada
   * función de la segunda IIFE que recibe un `data` o un `input` se contaba como uso de la
   * variable homónima de la primera, y el detector era inservible de puro ruidoso. */
  const declarados = (t) => {
    const s = new Set();
    let m;
    const re = /(?:^|[\n;{(,])\s*(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g;
    while ((m = re.exec(t))) s.add(m[1]);
    const rp = /function\s*[A-Za-z_$\w]*\s*\(([^)]*)\)|\(([^)]*)\)\s*=>|(?:^|[^\w$])([A-Za-z_$][\w$]*)\s*=>/g;
    while ((m = rp.exec(t))) {
      (m[1] || m[2] || m[3] || '').split(',').forEach((p) => {
        const n = p.trim().replace(/[=:].*$/, '').replace(/^\.\.\./, '').trim();
        if (/^[A-Za-z_$][\w$]*$/.test(n)) s.add(n);
      });
    }
    const rc = /catch\s*\(\s*([A-Za-z_$][\w$]*)/g;
    while ((m = rc.exec(t))) s.add(m[1]);
    const rf = /for\s*\(\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g;
    while ((m = rf.exec(t))) s.add(m[1]);
    return s;
  };

  const Bc = sinRuido(B);
  const enA = declarados(sinRuido(A));
  const enB = declarados(Bc);
  const compartidos = declarados(sinRuido(COMPARTIDO));

  // Un nombre es sospechoso si lo declara A, NO lo declara B, y aparece como palabra suelta en
  // el código de B. Se quitan los del terreno compartido —ahí sí los ve todo el mundo— y los
  // de uno o dos caracteres, que son contadores y parámetros y solo generan ruido.
  const fugados = [...enA].filter((n) => {
    if (n.length < 3) return false;
    if (enB.has(n) || compartidos.has(n)) return false;
    return new RegExp(`(?:^|[^\\w$.])${n}(?:[^\\w$]|$)`).test(Bc);
  });

  /* ⚠️ VALIDADO ROMPIÉNDOLO, que es lo único que distingue un detector de un adorno: corrido
   * contra la versión anterior de la página (la que estaba desplegada el 2-nov), esta misma
   * aserción se pone roja y nombra `CONTACTO`. Contra la arreglada, da lista vacía. */
  eq('ningún nombre de la primera IIFE se usa en la segunda', fugados, []);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
