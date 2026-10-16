/**
 * Los 12 puntos del Art. 14 ter — Cloudflare Pages Function.
 *
 * El chequeo de `chequeo.js` ya encuentra el enlace a la política del sitio y comprueba que la
 * página abre. Lo que no hace es leerla, y lo dice con esas palabras ("No leímos lo que dice
 * adentro"). Esto lee esa página y la contrasta con la lista del Art. 14 ter de la Ley 21.719,
 * que es lo único de la ley que se puede mirar desde afuera sin inventar nada: doce cosas que
 * el responsable de datos tiene que "facilitar y mantener permanentemente a disposición del
 * público, en su sitio web o en cualquier otro medio de información equivalente".
 *
 * GET /api/doce-puntos?dominio=ejemplo.cl
 *
 * Las tres reglas que mandan acá, por orden:
 *
 * 1. MODO CONSERVADOR. Nunca "no tienes X". Siempre "no encontramos mención de X en lo que
 *    leímos". La diferencia no es de cortesía: una política puede cubrir un punto con otras
 *    palabras y nosotros no reconocerlo, y acusar en falso a un prospecto de un incumplimiento
 *    legal es el peor error que este producto puede cometer. Ante la duda, 'sin-confirmar'.
 * 2. ESTO NO PUNTÚA. La sección viaja con `puntua: false` y el texto lo dice en voz alta. Es
 *    una lista para comparar, no una nota. El puntaje del chequeo rápido no se toca.
 * 3. SI NO PUDIMOS LEER, NO OPINAMOS. Una política que se arma en el navegador, una página de
 *    bloqueo o un texto demasiado corto devuelven los doce puntos en 'sin-confirmar' y un aviso
 *    que explica por qué. Doce "no encontramos" sobre una página que no alcanzamos a leer serían
 *    doce acusaciones falsas de una sola vez.
 *
 * Lo que este módulo mide es PRESENCIA DE TEXTO, no cumplimiento. Encontrar la palabra
 * "portabilidad" no dice que el derecho esté bien explicado ni que el trámite exista. El brief
 * (§4.A) ya lo dejaba escrito cuando esto era todavía una idea: "esto detecta presencia de
 * palabras, no que el contenido sea legalmente correcto o completo — hay que declararlo así en
 * el copy". Está declarado en `NOTA`, y aparece siempre, también cuando salen los doce.
 *
 * Fuente de los doce puntos: el texto del Diario Oficial (N° 44.023, 13-dic-2024, CVE 2583630),
 * artículo 14 ter, letras a) a l), copiadas literales en `PUNTOS[].pide`. La API de la BCN sirve
 * esta ley truncada y no vale para citar un artículo (brief §2, corrección 6).
 *
 * El núcleo (`revisarPolitica`) es una función pura: recibe el HTML de la política y devuelve la
 * sección entera. Así la puede llamar `chequeo.js` con el HTML que ya tiene en la mano, o
 * `profundo.js` con el HTML ya renderizado por el navegador, sin volver a pedir la página. El
 * endpoint de acá abajo existe para poder usarlo solo.
 */

import {
  destinoPermitido,
  normalizarDominio,
  buscarEnlacesPolitica,
  esPaginaDeBloqueo,
  chequear,
} from './chequeo.js';

// El tope por IP se IMPORTA, no se copia: es el mismo contador que /api/profundo ya tiene
// escrito y probado. Ver `pasaElTope`, más abajo, para por qué este endpoint lo necesita.
import { clavesDeTope, contar, TOPE_IP_DIA } from './profundo.js';

/* ------------------------------------------------------------------ *
 * Topes. Todo lo que sigue corre sobre texto que escribe un tercero.  *
 * ------------------------------------------------------------------ */

// Tope de HTML que se mira. El peor caso real medido el 25-sep entre las cinco políticas de
// prueba es wolfenson.cl con 758 KB (el sitio es Wix y arrastra todo su tema). 2 MB deja aire de
// sobra y corta mucho antes de que el costo importe. Por encima del tope NO se declina: se lee el
// prefijo y se marca `truncado`, que degrada todo 'no-encontrado' a 'sin-confirmar' (ver
// `revisarPolitica`). Declinar entero sería perder los puntos que sí alcanzamos a ver; afirmar
// una ausencia sobre un texto cortado sería mentir.
const MAX_HTML = 2_000_000;
// Tope del texto visible que se extrae. Una política larga de verdad (falabella, con sus 14
// secciones) no pasa de 40 KB de texto. 400 KB es el punto donde ya no estamos leyendo una
// política sino el volcado de un sitio entero.
const MAX_TEXTO = 400_000;
// Debajo de esto no hay una política que leer. La más corta de las cinco de prueba
// (abogadospyme.cl, cuatro párrafos) deja 6.939 caracteres de texto visible con todo y menú.
const MIN_TEXTO = 600;

/* ------------------------------------------------------------------ *
 * Sacar el texto visible del HTML, en tiempo lineal.                  *
 * ------------------------------------------------------------------ */

// Mismo recorrido que `tramosDeTexto` de chequeo.js (cada carácter se mira una vez, un <script>
// o un comentario sin cerrar terminan la lectura), con dos diferencias que esta tarea necesita:
// conserva la puntuación, porque un correo y un teléfono se reconocen por sus signos, y mete un
// salto de línea en las etiquetas de bloque, para que "Contacto" y el correo de abajo no queden
// pegados en una sola palabra. Vive acá y no allá porque `tramosDeTexto` no se exporta; el día
// que se exporte, esto se reduce a envolverla.
const CIERRES = { script: /<\/script\s*>/gi, style: /<\/style\s*>/gi };
const RE_BLOQUE = /^<\/?(?:p|div|br|li|h[1-6]|tr|td|section|article|header|footer|nav|ul|ol|dt|dd|table|blockquote|main|aside|details|summary|span)[\s>/]/i;

function extraerTexto(html) {
  let out = '';
  let i = 0;
  let truncado = false;
  // Cada pedazo se recorta ANTES de pegarlo, no después. La primera versión miraba el largo al
  // empezar cada vuelta, y un documento sin una sola etiqueta se iba entero de una sola pegada:
  // 1,5 MB de texto que después había que normalizar y pasar por cuarenta patrones. Medido el
  // 25-sep, eso costaba 483 ms de CPU; con el corte en su sitio, 96.
  const pegar = (s) => {
    if (out.length + s.length <= MAX_TEXTO) { out += s; return false; }
    out += s.slice(0, MAX_TEXTO - out.length);
    truncado = true;
    return true;
  };
  while (i < html.length) {
    if (truncado) break;
    const lt = html.indexOf('<', i);
    if (lt === -1) { pegar(html.slice(i)); break; }
    if (lt > i && pegar(html.slice(i, lt))) break;
    if (html.startsWith('<!--', lt)) {
      const fin = html.indexOf('-->', lt + 4);
      if (fin === -1) break;
      i = fin + 3;
      continue;
    }
    // Se mira la letra que sigue al '<' antes de armar un pedazo y pasarle una regex: casi
    // ninguna etiqueta empieza con s, y una política de Wix trae decenas de miles.
    const crudo = (html.charCodeAt(lt + 1) | 32) === 115 && /^<(script|style)[\s>]/i.exec(html.slice(lt, lt + 8));
    if (crudo) {
      const re = CIERRES[crudo[1].toLowerCase()];
      re.lastIndex = lt;
      if (!re.exec(html)) break;
      i = re.lastIndex;
      continue;
    }
    const gt = html.indexOf('>', lt + 1);
    if (gt === -1) break;
    if (RE_BLOQUE.test(html.slice(lt, lt + 12)) && pegar('\n')) break;
    i = gt + 1;
  }
  return { texto: decodificar(out).replace(/[ \t]+/g, ' ').replace(/\n[ \t]*/g, '\n').trim(), truncado };
}

// Entidades. La tabla nombrada es corta a propósito: lo que no está se convierte en espacio, y
// un espacio de más nunca crea un hallazgo falso. Los numéricos sí se decodifican completos,
// porque hay temas de WordPress que escriben todo el texto así.
const ENTIDADES = {
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', uuml: 'ü', ntilde: 'ñ',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Ntilde: 'Ñ',
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: "'", lsquo: "'",
  ldquo: '"', rdquo: '"', laquo: '«', raquo: '»', hellip: '...', mdash: '-', ndash: '-',
  aring: 'a', ccedil: 'ç', middot: '.', bull: '.', deg: '°', ordm: 'º', ordf: 'ª',
};

function decodificar(s) {
  return s.replace(/&(?:#(\d{1,7})|#x([0-9a-f]{1,6})|([a-zA-Z]{2,8}));/g, (_, d, h, n) => {
    if (d || h) {
      const cp = parseInt(d || h, d ? 10 : 16);
      return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ' ';
    }
    return ENTIDADES[n] ?? ENTIDADES[n.toLowerCase()] ?? ' ';
  });
}

// La forma sobre la que corren casi todos los patrones: minúsculas, sin tildes, solo letras y
// números, con UN espacio entre palabra y palabra. Esto hace dos cosas. Borra de una vez la
// variación de mayúsculas, tildes y puntuación, así que un patrón no tiene que preverla. Y
// vuelve inofensivo el `(?:[a-z0-9]+ ){0,4}` que usan los patrones con hueco: como el separador
// es un espacio obligatorio y la clase no lo incluye, cada tramo solo puede calzar una palabra
// entera y la regex no tiene por dónde volver atrás. Sin esto, ese mismo patrón sobre texto
// crudo es exactamente la clase de regex que en chequeo.js costó 763 ms de CPU en una portada
// preparada para eso.
function aPlano(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/* ------------------------------------------------------------------ *
 * Los doce puntos.                                                    *
 * ------------------------------------------------------------------ */

// Cada punto trae:
//   letra   la del Art. 14 ter, para que quien lo lea con la ley al lado los pueda parear
//   pide    el texto LITERAL de la ley (Diario Oficial N° 44.023). No se parafrasea: es la
//           única parte de todo esto que no es opinión nuestra
//   titulo  cómo lo decimos nosotros, en palabras de dueño de pyme
//   señales qué texto lo indica. `peso` 2 es una señal que basta sola; `peso` 1 es una pista que
//           no alcanza. Suma 2 o más -> 'encontrado'. Suma 1 -> 'sin-confirmar'. Cero ->
//           'no-encontrado'. El peso 1 existe justamente para que lo dudoso caiga en el estado
//           que no afirma nada, en vez de forzarlo a sí o no
//   donde   'plano' (por defecto), 'texto' (con puntuación: correos, teléfonos, fechas) o
//           'html' (el código; sirve para el correo que Cloudflare ofusca, que en el texto
//           visible aparece como "[email protected]" y no como un correo)
//   enumera cuando las señales son una lista cerrada que la ley enumera (los cinco derechos, las
//           cuatro cosas de la letra d), el detalle dice además de cuáles no vimos mención
//
// Sobre los patrones: corren sobre texto sin tildes, así que se escriben sin tildes. Ninguno
// lleva un cuantificador dentro de otro sin tope, y los huecos son `(?:[a-z0-9]+ ){0,N}` con N
// chico, que sobre `plano` es determinista (ver `aPlano`).

export const PUNTOS = [
  {
    letra: 'a',
    id: 'fecha-version',
    titulo: 'Tu política, con su fecha y su versión',
    pide: 'La política de tratamiento de datos personales que haya adoptado, la fecha y versión de la misma.',
    // Que la política exista no se comprueba acá: para llegar a este módulo ya la abrimos. Lo
    // que se busca es la otra mitad de la letra a), que es la que casi nadie pone y la que hace
    // que una política sirva de prueba: desde cuándo dice lo que dice.
    senales: [
      ['una fecha de actualización', /\b(?:ultima|ultimas) (?:actualizacion|revision|modificacion)\b|\bfecha de (?:la )?(?:ultima )?(?:actualizacion|revision|modificacion|version|entrada en vigencia|vigencia)\b|\bactualizad[oa]s? (?:el|en|por ultima vez)\b|\bvigente (?:desde|a partir del?)\b|\b(?:entro|entra) en (?:vigor|vigencia)\b|\blast updated\b|\beffective date\b/, 2],
      ['un número de versión', /\bversion(?:es)? (?:numero |actual |vigente )?\d/, 2],
      // Una fecha suelta NO cuenta, y esto costó un falso positivo: abogadospyme.cl tiene la
      // lista de su blog en la misma página, y uno de los titulares dice "desde abril de 2026".
      // Eso daba por vista la fecha de una política que no tiene ninguna. La fecha tiene que
      // venir cerca de una palabra que hable de la política, no en cualquier parte de la página.
      ['un mes y un año junto a la política', /\b(?:politica|actualizad|version|vigencia|vigente|revisad|modificad|publicad)[a-z]{0,10}(?: [a-z0-9]+){0,6} (?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre) (?:de )?(?:19|20)\d\d\b/, 1],
      ['una fecha escrita en números junto a la política', /\b(?:politica|actualizad|version|vigencia|vigente|revisad|modificad|publicad)[a-z]{0,10}(?: [a-z0-9]+){0,6} \d{1,2} \d{1,2} (?:19|20)\d\d\b/, 1],
    ],
  },
  {
    letra: 'b',
    id: 'responsable',
    titulo: 'Quién responde por los datos',
    pide: 'La individualización del responsable de datos y su representante legal y la identificación del encargado de prevención, si existiere.',
    senales: [
      ['el RUT', /\brut\b ?(?:n |numero )?\d|\brol unico tributario\b/, 2],
      ['quién es el responsable de los datos', /\bresponsable (?:de(?: los| el)? (?:datos|tratamiento)|del tratamiento|de la base de datos)\b|\bbajo la responsabilidad de\b|\bquien trata (?:los|tus|sus) datos\b/, 2],
      ['el representante legal', /\brepresentante legal\b|\brepresentad[oa] (?:legalmente )?por\b/, 2],
      ['un delegado de protección de datos o encargado de prevención', /\bdelegado de proteccion de datos\b|\bencargado de prevencion\b|\boficial de (?:cumplimiento|privacidad)\b/, 2],
      // Peso 1 los dos de abajo, y a propósito. Una razón social suelta o una dirección de
      // oficina dicen de quién es el sitio, pero no son la individualización que pide la letra
      // b). Con una sola de las dos el punto queda sin confirmar, que es lo honesto: vimos algo,
      // no vimos lo que la ley nombra.
      ['la razón social', /\b(?:spa|ltda|limitada|sociedad anonima|sociedad por acciones|eirl)\b/, 1],
      // "oficina 1310" y "piso 12" entran a propósito. En Chile media dirección se escribe sin
      // la palabra calle (abogadospyme.cl pone "Antonio Bellet 193, Oficina 1310, Providencia"),
      // y sin esto el punto salía como que no encontramos nada sobre quién está detrás del sitio,
      // en una página que sí dice dónde queda el estudio.
      ['una dirección o domicilio', /\bdomicilio(?: (?:postal|comercial|legal|social))?\b|\bnuestras? oficinas?\b|\b(?:av|avda|avenida|calle|pasaje|camino) (?:[a-z0-9]{1,25} ){1,4}\d{1,5}\b|\b(?:oficina|piso|depto|departamento|local) \d{1,5}\b/, 1],
    ],
  },
  {
    letra: 'c',
    id: 'contacto',
    titulo: 'Por dónde te escriben las personas',
    pide: 'El domicilio postal, la dirección de correo electrónico, el formulario de contacto o la identificación del medio tecnológico equivalente de uso común y fácil acceso mediante el cual se le notifican las solicitudes que realicen los titulares.',
    senales: [
      ['una dirección de correo', /[a-z0-9._%+-]{1,64}@(?:[a-z0-9-]{1,63}\.){1,4}[a-z]{2,12}/i, 2, 'texto'],
      // El correo que Cloudflare ofusca. En el texto visible aparece como "[email protected]",
      // que no es un correo y no calza con nada: sin esta señal, la propia política de
      // spindlelab.cl, que tiene el correo cuatro veces, salía sin medio de contacto.
      ['una dirección de correo', /cdn-cgi\/l\/email-protection|data-cfemail\s*=|\bmailto:[a-z0-9._%+-]{1,64}@/i, 2, 'html'],
      ['un formulario de contacto', /\bformulario de contacto\b|\bventana de contacto\b|\bseccion (?:de )?contacto\b|\bformulario disponible\b|\bcompleta(?:ndo)? el formulario\b/, 2],
      ['una dirección postal', /\b(?:av|avda|avenida|calle|pasaje|camino|ruta) (?:[a-z0-9]{1,25} ){1,4}\d{1,5}\b/, 2],
      ['a dónde escribir para pedir algo sobre tus datos', /\b(?:escribiendo|escribenos|escribirnos|contactanos|contactarnos|enviando un correo|envienos un correo|mediante un escrito|dirigiendo(?:se|te)?) (?:a|al|nos)\b|\bponerte en contacto con nosotros\b/, 2],
      ['un teléfono', /(?:\+ ?56|\(\+?56\))[\s.-]?\d[\d\s.-]{6,12}\d/, 1, 'texto'],
    ],
  },
  {
    letra: 'd',
    id: 'datos-finalidades',
    titulo: 'Qué datos tratas, para qué, con qué permiso y a quién se los entregas',
    pide: 'Las categorías, clases o tipos de datos que trata; la descripción genérica del universo de personas que comprenden sus bases de datos; los destinatarios a los que se prevé comunicar o ceder los datos; las finalidades de los tratamientos que realiza; la base de legitimidad del tratamiento; y en caso de tratamientos que se basan en la satisfacción de intereses legítimos, cuáles serían éstos.',
    // Es el punto más largo de la ley y el que más sitios cubren a medias. Se enumera para que el
    // detalle diga cuál de las cuatro partes no vimos, en vez de dar un sí o un no sobre el
    // conjunto: "encontramos para qué los usas" es información útil aunque falte el resto.
    enumera: true,
    senales: [
      // La lista de verbos del final salió de la política de spindlelab.cl, que dice para qué usa
      // cada cosa ("para entender cómo se usa el sitio") sin usar nunca la palabra "finalidad", y
      // salía como que no decía para qué. Una política bien escrita para que la entienda
      // cualquiera es justo la que no usa el vocabulario de la ley.
      ['para qué se usan los datos', /\bfinalidad(?:es)?\b|\bcon (?:el|la) (?:fin|finalidad|objeto|proposito) de\b|\bcon fines de\b|\bse (?:utilizan|usan|tratan|trataran|utilizaran) (?:unicamente |exclusivamente |principalmente |solo )?(?:para|con)\b|\bser[a]?n? (?:tratados|utilizados|usados|empleados) (?:unicamente |exclusivamente |principalmente |solo )?(?:para|con)\b|\bson utilizados (?:unicamente |exclusivamente |solo )?para\b|\bpara que (?:los|las) (?:usamos|utilizamos|tratamos)\b|\bpara (?:entender|poder|gestionar|responder|atender|contactar|enviar|mejorar|ofrecer|prestar|facilitar|procesar|cumplir)[a-z]{0,8}\b/, 2],
      ['qué datos se tratan', /\b(?:categorias|clases|tipos) de datos\b|\bdatos que (?:tratamos|recopilamos|recabamos|recogemos|procesamos|solicitamos|pedimos)\b|\blos siguientes datos\b|\bdatos personales (?:recabados|recopilados|solicitados)\b|\bse le solicitara (?:su|tu)\b|\bque (?:datos|informacion) (?:procesamos|tratamos|recopilamos|pedimos)\b|\bte pedimos\b/, 2],
      ['con qué permiso se tratan', /\bbase (?:de legitimidad|legal|juridica|de licitud)\b|\bfundamento (?:legal|juridico)\b|\bintereses? legitimos?\b|\btenemos el consentimiento\b|\bcon (?:tu|su) consentimiento\b|\bprevio consentimiento\b|\bautorizacion expresa\b|\bsin (?:tu|su) autorizacion\b|\bnecesario para (?:cumplir|la ejecucion|ejecutar)\b|\bobligacion(?:es)? (?:legal|contractual)/, 2],
      ['a quién se le entregan', /\bdestinatarios\b|\b(?:no )?(?:compartimos|cedemos|comunicamos|entregamos|transferimos|divulgamos) (?:tus|sus|los|estos) datos\b|\bcomunicar o ceder\b|\bse comparten con\b|\bcon quien(?:es)? (?:los|las) compartimos\b|\bterceros? (?:como|tales como) (?:proveedores|encargados)\b|\bno (?:seran|sera) (?:comunicad|cedid|compartid)/, 1],
    ],
  },
  {
    letra: 'e',
    id: 'seguridad',
    titulo: 'Cómo proteges los datos que guardas',
    pide: 'La política y las medidas de seguridad adoptadas para proteger las bases de datos personales que administra.',
    senales: [
      ['medidas de seguridad', /\bmedidas (?:tecnicas(?: y organizativas)?|de seguridad|de proteccion|de resguardo)\b|\bpolitica de seguridad\b|\bmedidas adoptadas para proteger\b|\bprotocolos? de seguridad\b/, 2],
      ['cómo se protegen', /\b(?:cifrad|encriptad)[ao]s?\b|\bcertificado (?:de seguridad )?ssl\b|\bconexion segura\b|\bacceso(?:s)? no autorizado(?:s)?\b|\bproteger (?:tus|sus|los) datos\b|\bse encuentran protegid[ao]s\b|\bcontrol(?:es)? de acceso\b/, 2],
      // Peso 1: "confidencialidad profesional" es el deber de un abogado con su cliente, no una
      // medida de seguridad sobre una base de datos. abogadospyme.cl lo dice y no dice nada más,
      // y por eso su punto e) queda sin confirmar en vez de en rojo o en verde.
      ['una mención de confidencialidad', /\bconfidencial(?:idad)?\b|\bsecreto profesional\b/, 1],
    ],
  },
  {
    letra: 'f',
    id: 'derechos',
    titulo: 'Los cinco derechos de cada persona sobre sus datos',
    pide: 'El derecho que le asiste al titular para solicitar ante el responsable, acceso, rectificación, supresión, oposición y portabilidad de sus datos personales, de conformidad a la ley.',
    // Los cinco, cada uno peso 1, y hacen falta dos para dar el punto por encontrado. Uno solo
    // suele ser una coincidencia: "acceso" aparece en cualquier "el acceso a este sitio implica
    // la aceptación de estos términos", que es lo que dicen jaukencosmetica.cl y abogadospyme.cl.
    // Por eso el patrón de acceso pide contexto de derecho y no la palabra suelta.
    //
    // "cancelación" cuenta como supresión: es el nombre mexicano del mismo derecho y aparece en
    // las políticas copiadas de plantillas españolas o mexicanas, que en Chile son la mayoría.
    // El brief (§2, corrección 3) advierte de no usar ese vocabulario en el copy nuestro; leerlo
    // en el ajeno y entenderlo es otra cosa, y negarlo sería un falso "no encontramos".
    enumera: true,
    senales: [
      ['acceso', /\bderechos? de acceso\b|\bacceder a (?:tus|sus|los) datos\b|\bacceso,? (?:y )?rectificacion\b|\bsolicitar (?:el )?acceso\b|\bobtener una copia de (?:sus|tus) datos\b/, 1],
      ['rectificación', /\brectificacion\b|\brectificar\b|\bcorregir (?:los |sus |tus )?datos\b|\bcorrijamos\b|\bactualizar (?:sus|tus) datos\b/, 1],
      ['supresión', /\bsupresion\b|\bsuprimir\b|\beliminacion de (?:sus|tus|los) datos\b|\beliminar (?:tus|sus|los) datos\b|\beliminemos\b|\bcancelacion\b|\bborrado\b|\bborrar (?:tus|sus|los) datos\b|\bderecho al olvido\b|\bsolicitar su eliminacion\b/, 1],
      ['oposición', /\boposicion\b|\boponerse\b|\boponerte\b|\bderecho a oponer/, 1],
      ['portabilidad', /\bportabilidad\b|\bportar (?:tus|sus) datos\b/, 1],
    ],
  },
  {
    letra: 'g',
    id: 'agencia',
    titulo: 'Que se puede reclamar ante la Agencia',
    pide: 'El derecho que le asiste al titular de recurrir ante la Agencia, en caso de que el responsable rechace o no responda oportunamente las solicitudes que le formule.',
    senales: [
      ['la Agencia de Protección de Datos', /\bagencia de proteccion de datos\b|\brecurrir ante la agencia\b|\breclamar ante la (?:agencia|autoridad)\b|\bautoridad de (?:control|proteccion de datos)\b|\bconsejo para la transparencia\b/, 2],
      ['que se puede reclamar ante alguien más', /\bpresentar un(?:a)? (?:reclamo|reclamacion|denuncia)\b|\breclamacion ante\b|\bderecho a reclamar\b/, 1],
    ],
  },
  {
    letra: 'h',
    id: 'transferencias',
    titulo: 'Si los datos salen de Chile',
    pide: 'En su caso, la transferencia de datos personales a un tercer país u organización internacional y si éstos ofrecen o no un nivel adecuado de protección. En caso de que no cuenten con un nivel adecuado de protección, se deberá informar si existen garantías que justifiquen tal transferencia.',
    senales: [
      ['que los datos salen del país', /\btransferencias? internacional(?:es)?\b|\btransferencia de datos a (?:un )?(?:tercer|otro) pais\b|\bfuera de chile\b|\bfuera del pais\b|\ben el extranjero\b|\botros? paises\b|\btercer(?:os)? paises\b|\borganizacion(?:es)? internacional(?:es)?\b|\bservidores (?:ubicados |alojados )?(?:en|fuera)\b|\balojad[oa]s? en (?:servidores|estados unidos|la union europea)\b/, 2],
      ['el nivel de protección del destino', /\bnivel adecuado de proteccion\b|\bgarantias? (?:adecuadas|suficientes|que justifiquen)\b|\bclausulas contractuales\b/, 2],
    ],
  },
  {
    letra: 'i',
    id: 'conservacion',
    titulo: 'Cuánto tiempo guardas los datos',
    pide: 'El periodo durante el que se conservarán los datos personales.',
    senales: [
      // Sin "durante el tiempo" suelto. jaukencosmetica.cl dice que sus condiciones de venta
      // "serán de obligado cumplimiento durante el tiempo en que se encuentren publicadas en la
      // web", que habla del plazo de sus TÉRMINOS y no de cuánto guarda los datos de nadie. Con
      // esa frase el sitio daba por cubierto un punto que no menciona en ninguna parte.
      ['cuánto tiempo se guardan', /\b(?:plazo|periodo|tiempo) de (?:conservacion|almacenamiento|retencion)\b|\bse conservar(?:a|an|emos)\b|\bse conservan\b|\bconservamos\b|\bconservaremos\b|\bse (?:guardan|almacenan|mantienen) (?:durante|por|mientras|hasta)\b|\bdurante (?:un plazo|el tiempo|el periodo) (?:[a-z0-9]+ ){0,3}necesari/, 2],
      ['hasta cuándo se guardan', /\bmientras (?:sean?|dure|exista|se mantenga|siga)\b|\bhasta que (?:pidas|solicites|solicite|nos pidas|se solicite)\b|\bretencion de (?:datos|los proveedores)\b|\bpor un plazo de\b|\b(?:eliminaremos|suprimiremos|borraremos) (?:tus|sus|los) datos\b/, 2],
      ['que los datos dejan de guardarse cuando ya no hacen falta', /\bya no (?:sean|son|resulten) necesari|\bdejen de ser necesari|\bno sean necesarios para el (?:proposito|fin)\b/, 1],
    ],
  },
  {
    letra: 'j',
    id: 'origen',
    titulo: 'De dónde salen los datos',
    pide: 'La fuente de la cual provienen los datos personales y, en su caso, si proceden de fuentes de acceso público.',
    senales: [
      ['de dónde salen los datos', /\bfuente(?:s)? (?:de (?:los|sus|tus) datos|de acceso publico|de la (?:que|cual)|de donde)\b|\borigen de (?:los|tus|sus) datos\b|\bdatos (?:que )?(?:nos )?(?:entregas|proporcionas|facilitas|nos facilita|nos proporciona|nos entrega)\b|\bdirectamente de (?:ti|usted|los titulares|nuestros clientes)\b|\brecibimos (?:directamente )?de\b|\b(?:recabados|recopilados|obtenidos|recogidos) (?:a traves de|mediante|desde|directamente de|en)\b|\bobtenemos (?:tus|sus|los) datos\b|\bde donde (?:salen|provienen)\b|\bprovienen de\b/, 2],
      ['datos que entra la propia persona', /\bdatos ingresados\b|\bque (?:escribes|ingresas|completas|nos dejas) en (?:el|nuestro|este)\b|\blos datos que nos entregas\b/, 1],
    ],
  },
  {
    letra: 'k',
    id: 'revocar',
    titulo: 'Que se puede retirar el permiso cuando uno quiera',
    pide: 'Cuando el tratamiento está basado en el consentimiento del titular, la existencia del derecho a retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.',
    // Solo se busca en español. Un banner de cookies en inglés trae "Reject All", "opt out" y
    // "consent preferences" en su propio script, y abogadospyme.cl los tiene los tres en la misma
    // página de su política: agregar patrones en inglés acá sería darle el punto por el texto de
    // un banner que no es su política.
    senales: [
      // "derecho a retirar", a secas, se fue: jaukencosmetica.cl "se reserva el derecho a retirar,
      // reponer o cambiar los productos que ofrece", que es una cláusula de tienda y no tiene
      // nada que ver con el consentimiento de nadie. Con ella, ese sitio salía cubriendo la letra
      // k) sin decir en ninguna parte que se pueda retirar un permiso. Lo que se busca ahora es
      // siempre retirar ALGO nombrado: el consentimiento, el permiso, la autorización.
      ['que puedes retirar el permiso', /\b(?:retirar|revocar|retirarlo|revocarlo|retire|revoque|retiro|revocacion)(?: (?:el|su|tu|la|dicho|este|esta))? (?:consentimiento|permiso|autorizacion)\b|\bretirarlo en cualquier momento\b|\bcambiar de opinion\b|\bdar(?:te|se|le)? de baja\b|\bcancelar (?:la|tu|su) suscripcion\b|\bcancelacion de (?:la )?suscripcion\b|\bdejar de recibir\b|\bdesuscribir/, 2],
      ['que se pide consentimiento', /\bconsentimiento\b|\bautorizacion expresa\b|\bacepta(?:s|r)? expresamente\b/, 1],
    ],
  },
  {
    letra: 'l',
    id: 'automatizadas',
    titulo: 'Si algo decide solo sobre las personas',
    pide: 'La existencia de decisiones automatizadas, incluida la elaboración de perfiles. En tales casos, información significativa sobre la lógica aplicada, así como las consecuencias previstas de dicho tratamiento para el titular.',
    // Pide "decisiones" o "perfiles", nunca la palabra "automatizado" sola. jaukencosmetica.cl
    // dice que los datos "serán introducidos en un fichero automatizado", que es una frase de
    // plantilla española de los noventa y no tiene nada que ver con decidir sobre una persona.
    // Con un patrón de raíz suelta, ese sitio salía cubriendo un punto que no menciona.
    //
    // Y decir "no hay ninguna" SÍ cubre la letra l): lo que la ley pide es informar si existen.
    senales: [
      ['decisiones automatizadas o elaboración de perfiles', /\bdecisiones? (?:automatizad|automatic)[ao]s?\b|\belaboracion de perfiles\b|\bcreacion de perfiles\b|\bperfilamiento\b|\bperfilado\b|\bsin intervencion humana\b|\btratamiento(?:s)? automatizado(?:s)? que (?:produzca|tenga|genere)\b/, 2],
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Cuándo NO se puede opinar.                                          *
 * ------------------------------------------------------------------ */

// Vocabulario que solo aparece en una política de verdad. Sirve para lo mismo que el detector de
// páginas de bloqueo: reconocer que lo que tenemos delante no es lo que creemos.
//
// Los términos son largos y específicos a propósito. Un gestor de consentimiento mete bastante
// castellano legal en su propio script, y con términos sueltos ("datos", "cookies") el detector
// se dispararía con cualquier sitio que tenga banner.
const TERMINOS_POLITICA = [
  'representante legal', 'base de legitimidad', 'interes legitimo', 'medidas de seguridad',
  'rectificacion', 'supresion', 'portabilidad', 'agencia de proteccion de datos',
  'transferencia internacional', 'plazo de conservacion', 'decisiones automatizadas',
  'elaboracion de perfiles', 'destinatarios', 'finalidad', 'domicilio', 'revocar',
  'encargado del tratamiento', 'derecho de acceso',
];

// El caso que obligó a escribir esto: www.falabella.com/falabella-cl/page/comprar-politica-privacidad.
// Tiene los doce puntos, bien escritos y numerados hasta el 14, y NINGUNO está en el texto que se
// puede leer: las catorce secciones son un acordeón que monta su contenido recién al abrirlo, y
// el texto viaja en un JSON dentro de un <script>. Medido el 25-sep, con la página bajada y
// también con la página abierta en Chrome y ya renderizada: 2.893 y 3.885 caracteres visibles,
// casi todos de menú y pie.
//
// Sin esta guardia, ese sitio recibía DOCE "no encontramos mención de" seguidos, sobre una
// política que los cubre todos. Es el peor resultado posible de este módulo y no es un caso raro:
// es lo que hace cualquier retail grande con un acordeón.
//
// La señal no es el largo del texto, que no separa nada (wolfenson.cl, que sí se lee entero, deja
// 8.251 caracteres sobre 758 KB de HTML, y falabella 2.893 sobre 592 KB). La señal es la BRECHA:
// cuántos términos de política están en el código y no en lo que se ve. Medido en las cinco
// políticas de prueba, bajadas y renderizadas: falabella 16 y 18; las otras cuatro, 0 o 1. El
// corte en 4 deja un margen que ningún sitio real de la muestra se acerca a tocar.
const BRECHA_MAXIMA = 4;

function brechaDeTexto(html, plano) {
  const codigo = aPlano(decodificar(html));
  let n = 0;
  const cuales = [];
  for (const t of TERMINOS_POLITICA) {
    if (codigo.includes(t) && !plano.includes(t)) { n++; cuales.push(t); }
  }
  return { n, cuales };
}

// Si nada de esto aparece, lo que abrimos no es una política. Pasa cuando el enlace del pie lleva
// de vuelta a la portada, o a una página de términos de compra sin una línea sobre datos.
const RE_ES_POLITICA = /\bdatos personales\b|\bprivacidad\b|\bproteccion de datos\b|\btratamiento de (?:los )?datos\b|\bdatos de caracter personal\b/;

const AVISOS = {
  bloqueo:
    'La página de tu política no nos dejó leerla, nos respondió con un aviso de bloqueo. No es un resultado sobre lo que dice tu política. Ábrela tú y compárala con la lista de abajo.',
  'armada-con-javascript':
    'Tu política está escrita en la página, pero se arma en el navegador y por secciones que se abren al tocarlas, así que no la pudimos leer entera. No decimos nada sobre sus puntos: lo que no leímos no lo podemos contar ni a favor ni en contra.',
  'muy-corta':
    'La página de tu política casi no trae texto. No sabemos si está vacía, si se arma en el navegador o si nos llegó a medias, así que no opinamos sobre su contenido.',
  'no-parece-politica':
    'La página que abrimos no habla de datos personales ni de privacidad, así que puede que el enlace no lleve a tu política. No revisamos los doce puntos sobre una página que no es la que corresponde.',
  'sin-enlace':
    'No llegamos a tu política de privacidad, así que no hay texto que comparar con los doce puntos. Arriba está lo que sí pudimos ver del enlace.',
  'no-abrio':
    'Encontramos el enlace a tu política, pero esa página no abrió, así que no la pudimos leer. No es un resultado sobre lo que dice.',
};

/* ------------------------------------------------------------------ *
 * El núcleo, puro.                                                    *
 * ------------------------------------------------------------------ */

const TITULO = 'Los 12 puntos que la ley pide tener publicados';

const INTRO =
  'El Art. 14 ter pide que tu sitio tenga a la vista doce cosas sobre qué haces con los datos ' +
  'de las personas. Abrimos tu política y buscamos cada una. Esta lista no entra en el puntaje ' +
  'de arriba, es para que la compares con la tuya.';

// La nota va SIEMPRE, también cuando salen los doce en verde. Es el descargo que separa este
// módulo de una certificación: buscamos palabras, no leemos como un abogado.
const NOTA =
  'Buscamos si cada punto aparece mencionado, no si lo que dice está bien dicho ni si alcanza. ' +
  'Una política puede cubrir un punto con otras palabras y nosotros no reconocerlo, así que ' +
  'cuando decimos que no encontramos algo estamos hablando de lo que leímos, no de lo que tú ' +
  'tienes. Esto describe, no certifica, y no reemplaza la revisión de un abogado.';

const SIN_CONFIRMAR_TODOS =
  'No lo pudimos revisar, porque no llegamos a leer tu política.';

function listaLegible(nombres) {
  if (nombres.length <= 1) return nombres.join('');
  return nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1];
}

function conMayuscula(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/**
 * Revisa el HTML de una política contra los doce puntos. Pura: no pide nada por la red.
 *
 * @param {string} html     el HTML de la página de la política, tal como llegó
 * @param {object} opciones { fuente } la dirección de esa página, solo para informarla
 * @returns la sección entera, lista para dibujar
 */
export function revisarPolitica(html, opciones = {}) {
  const fuente = opciones.fuente || null;
  if (typeof html !== 'string' || !html.trim()) return seccionSinLeer('sin-enlace', fuente);

  // El HTML se corta en MAX_HTML y el corte se arrastra hasta el final: con un texto cortado no
  // se puede afirmar que algo no está, solo que no lo vimos.
  const cortadoHtml = html.length > MAX_HTML;
  const recorte = cortadoHtml ? html.slice(0, MAX_HTML) : html;

  if (esPaginaDeBloqueo(recorte)) return seccionSinLeer('bloqueo', fuente);

  const { texto, truncado } = extraerTexto(recorte);
  const plano = aPlano(texto);

  if (plano.length < MIN_TEXTO) return seccionSinLeer('muy-corta', fuente);
  if (!RE_ES_POLITICA.test(plano)) return seccionSinLeer('no-parece-politica', fuente);

  const parcial = cortadoHtml || truncado;

  // La brecha solo se puede medir sobre un texto que leímos entero. Si nos quedamos con un
  // prefijo, todo lo que viniera después aparecería como "está en el código y no a la vista", y
  // una política larguísima y perfectamente legible se informaría como armada con JavaScript. Con
  // el texto cortado ya tenemos la salida correcta, que es `parcial`: lo que no vimos no cuenta.
  if (!parcial) {
    const brecha = brechaDeTexto(recorte, plano);
    if (brecha.n >= BRECHA_MAXIMA) return seccionSinLeer('armada-con-javascript', fuente, brecha.cuales);
  }

  const puntos = PUNTOS.map((p) => evaluar(p, { plano, texto, html: recorte, parcial }));

  return {
    ok: true,
    legible: true,
    // El contrato dice en voz alta que esto no toca el puntaje. Quien dibuje la sección no
    // tiene que acordarse de la regla: la lee en los datos.
    puntua: false,
    fuente,
    titulo: TITULO,
    intro: INTRO,
    nota: NOTA,
    // Cuando solo leímos un pedazo, ningún punto puede salir como ausente (lo hace `evaluar`), y
    // además se dice por qué.
    aviso: parcial
      ? 'Tu política es muy larga y no la leímos entera, así que de los puntos que no aparecen en ' +
        'lo que alcanzamos a leer no decimos nada.'
      : null,
    puntos,
    resumen: {
      encontrados: puntos.filter((p) => p.estado === 'encontrado').length,
      sinConfirmar: puntos.filter((p) => p.estado === 'sin-confirmar').length,
      noEncontrados: puntos.filter((p) => p.estado === 'no-encontrado').length,
      total: PUNTOS.length,
    },
  };
}

function evaluar(punto, ctx) {
  const vistas = [];
  let suma = 0;
  for (const [nombre, re, peso, donde] of punto.senales) {
    const donde_ = donde || 'plano';
    const sujeto = donde_ === 'texto' ? ctx.texto : donde_ === 'html' ? ctx.html : ctx.plano;
    if (!re.test(sujeto)) continue;
    suma += peso;
    // El mismo nombre puede venir de dos señales distintas (el correo a la vista y el correo que
    // Cloudflare ofusca). Se nombra una vez.
    if (!vistas.includes(nombre)) vistas.push(nombre);
  }

  const faltantes = punto.enumera ? punto.senales.map(([n]) => n).filter((n) => !vistas.includes(n)) : [];

  let estado;
  if (suma >= 2) estado = 'encontrado';
  else if (suma >= 1) estado = 'sin-confirmar';
  // Sobre un texto que no leímos entero, "no está" no es una afirmación que podamos hacer.
  else estado = ctx.parcial ? 'sin-confirmar' : 'no-encontrado';

  return {
    letra: punto.letra,
    id: punto.id,
    titulo: punto.titulo,
    pide: punto.pide,
    estado,
    vimos: vistas,
    // Lo que falta viaja como dato, no solo dentro de la prosa. La portada necesita SABER que
    // un punto quedó a medias para encenderle la etiqueta "lo encontramos en parte" y la marca
    // de sin-confirmar; hasta acá tenía que adivinarlo leyendo el detalle, y no lo adivinaba,
    // así que un punto que la política cubre a medias salía con un visto verde.
    //
    // Es la misma regla de siempre vista desde otro lado: "encontramos tres de las cuatro
    // partes" no es "lo tiene". La cuarta no la vimos, y lo que no se pudo confirmar no se
    // muestra en verde.
    //
    // Va siempre, también vacío, para que la portada no tenga que distinguir entre "no falta
    // nada" y "este punto no enumera". Solo los dos puntos que la ley enumera (d y f) lo traen
    // con contenido; en el resto las señales son formas distintas de decir lo mismo, y no
    // haber visto una de ellas no significa que falte nada.
    //
    // Ojo para quien lo lea después: esta lista SOLA no dice "lo encontramos en parte". Un
    // punto que no encontramos trae los suyos igual, y es verdad (de los cinco derechos no
    // vimos ninguno), pero eso es "no lo encontramos" y se muestra así. A medias son las dos
    // cosas juntas: estado 'encontrado' Y algo en esta lista.
    faltan: faltantes,
    detalle: redactar(punto, estado, vistas, faltantes, ctx.parcial),
  };
}

function redactar(punto, estado, vistas, faltantes, parcial) {
  if (estado === 'encontrado') {
    let t = `Encontramos ${listaLegible(vistas)} en el texto de tu política.`;
    // Solo en los puntos que la ley enumera, y solo como "no vimos mención", nunca como "te
    // falta": puede estar dicho con otras palabras dos párrafos más abajo.
    if (faltantes.length) t += ` De lo que nombra la letra ${punto.letra}, no vimos mención de ${listaLegible(faltantes)}.`;
    return t;
  }
  if (estado === 'sin-confirmar') {
    if (!vistas.length) {
      return parcial
        ? 'No apareció en la parte de tu política que alcanzamos a leer, y no leímos el resto. No lo contamos ni a favor ni en contra.'
        : SIN_CONFIRMAR_TODOS;
    }
    return `Vimos ${listaLegible(vistas)}, que va en esta dirección pero no alcanza para darlo por cubierto. ` +
      'Lo dejamos sin confirmar, así que no cuenta ni a favor ni en contra.';
  }
  return 'No encontramos mención de esto en lo que leímos. Puede estar dicho con otras palabras, ' +
    'o en otra página de tu sitio.';
}

function seccionSinLeer(motivo, fuente, terminosOcultos = []) {
  return {
    ok: true,
    legible: false,
    puntua: false,
    motivo,
    fuente,
    titulo: TITULO,
    intro: INTRO,
    nota: NOTA,
    aviso: AVISOS[motivo] || AVISOS['no-abrio'],
    // Los doce igual viajan, con su texto y en 'sin-confirmar'. Así la sección se dibuja siempre
    // igual y el dueño se lleva la lista para compararla a mano, que es de lo que sirve.
    puntos: PUNTOS.map((p) => ({
      letra: p.letra,
      id: p.id,
      titulo: p.titulo,
      pide: p.pide,
      estado: 'sin-confirmar',
      vimos: [],
      faltan: [],
      detalle: SIN_CONFIRMAR_TODOS,
    })),
    resumen: { encontrados: 0, sinConfirmar: PUNTOS.length, noEncontrados: 0, total: PUNTOS.length },
    // Para nuestros propios registros, no para la pantalla: qué términos de política estaban en
    // el código y no a la vista. Es lo que permite revisar después si el detector acertó.
    terminosOcultos,
  };
}

/* ------------------------------------------------------------------ *
 * El endpoint.                                                        *
 * ------------------------------------------------------------------ */

// Cómo se llega a la política SIN escribir un segundo descargador.
//
// `chequeo.js` ya tiene el que sirve: portón de destinos en cada salto, redirecciones a mano,
// reloj compartido, tope de bytes y cancelación de la descarga. No lo exporta (`traer` es
// interno), y este módulo no edita ese archivo. La salida no es copiarlo, que sería tener dos
// versiones de una lógica de seguridad y que una se quede atrás: es correr `chequear()` con un
// `fetch` envuelto que va anotando lo que pasa por él. Todas las peticiones las sigue haciendo
// chequeo.js, por su propio camino; nosotros solo nos quedamos con una copia de los cuerpos.
//
// El envoltorio vuelve a pasar cada dirección por `destinoPermitido` antes de dejarla salir. No
// es que dudemos del portón de al lado: es que así la garantía es local a este archivo y no
// depende de que nadie la mueva de sitio más adelante.
//
// Cuesta correr el chequeo rápido una segunda vez. Es el precio de no duplicar el descargador, y
// se paga completo el día que `chequeo.js` exporte `traer` o devuelva la dirección de la política
// que ya resolvió: ahí esto se queda en una sola petición. Mientras tanto, cada invocación de
// Pages trae su propio presupuesto de 50 subpeticiones, así que las dos caben.
const MAX_CUERPO = 3_000_000;

function grabador(fetchImpl) {
  const visto = [];
  async function envuelto(url, opciones) {
    if (!destinoPermitido(url)) throw new Error('destino no permitido');
    const r = await fetchImpl(url, opciones);
    // Una redirección no trae cuerpo que valga; se anota igual, porque es lo que encadena una
    // dirección candidata con la página donde termina.
    if (r.status >= 300 && r.status < 400) {
      visto.push({ url, status: r.status, texto: '' });
      return r;
    }
    let texto = '';
    try {
      const copia = r.clone();
      texto = await leerAcotado(copia);
    } catch {
      // Si no se pudo copiar el cuerpo, el chequeo de al lado sigue igual y nosotros nos
      // quedamos sin texto: el módulo lo informará como "no la pudimos leer", que es la verdad.
      texto = '';
    }
    visto.push({ url, status: r.status, texto });
    return r;
  }
  return { fetch: envuelto, visto };
}

async function leerAcotado(r) {
  if (!r.body || typeof r.body.getReader !== 'function') {
    return typeof r.text === 'function' ? (await r.text()).slice(0, MAX_CUERPO) : '';
  }
  const lector = r.body.getReader();
  const dec = new TextDecoder('utf-8');
  let texto = '';
  let bytes = 0;
  while (true) {
    const { done, value } = await lector.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_CUERPO) {
      try { lector.cancel().catch(() => {}); } catch {}
      break;
    }
    texto += dec.decode(value, { stream: true });
  }
  return texto + dec.decode();
}

// De todo lo que pasó por el envoltorio, cuál era la política. Se busca la portada por la
// dirección que `chequear` informa como revisada, se le sacan los mismos candidatos que usó el
// chequeo, y se sigue la cadena de cada candidato hasta la primera respuesta que no es una
// redirección. La portada devuelta otra vez (un enlace que lleva al inicio) no cuenta como
// política: es el mismo caso que chequeo.js ya distingue.
function sacarPolitica(visto, revisado) {
  const portada = visto.find((v) => v.url === revisado && v.status === 200 && v.texto);
  if (!portada) return { falla: 'sin-enlace' };
  const candidatos = buscarEnlacesPolitica(portada.texto, revisado);
  if (!candidatos.length) return { falla: 'sin-enlace' };
  for (const c of candidatos.slice(0, 2)) {
    const desde = visto.findIndex((v) => v.url === c.url);
    if (desde === -1) continue;
    for (let i = desde; i < visto.length; i++) {
      const v = visto[i];
      if (v.status >= 300 && v.status < 400) continue;
      if (v.status === 200 && v.texto && v.url !== revisado && v.texto !== portada.texto) {
        return { url: v.url, html: v.texto };
      }
      break;
    }
  }
  return { falla: 'no-abrio' };
}

const CABECERAS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
};

// 30 horas de vida para el contador: más que el día que cuenta, para que el cambio de fecha
// no lo borre antes de tiempo. Es el mismo número que usa /api/profundo.
const TTL_TOPE_S = 60 * 60 * 30;

/**
 * El tope por IP, el mismo que ya está escrito y probado en /api/profundo.
 *
 * Este endpoint corre `chequear()` ENTERO, así que cada llamada rastrea el sitio del
 * prospecto por segunda vez con nuestro User-Agent (la primera la hace /api/chequeo). Sin
 * tope, un visitante puede hacernos golpear sitios de terceros todo el día con nuestro
 * nombre puesto, y eso se paga en reputación, no en pesos.
 *
 * Se importa de profundo.js en vez de copiarse: una segunda versión del contador es una
 * versión que se va a desincronizar. El prefijo es distinto ('tope:doce') a propósito, para
 * que las dos revisiones no se coman el presupuesto la una a la otra.
 *
 * SIN KV no se declina. A diferencia de /api/profundo, esto no abre un navegador remoto: es
 * el mismo par de peticiones que ya hace el chequeo rápido, que tampoco tiene tope. Declinar
 * sin KV borraría los 12 puntos de la página en cualquier despliegue sin el namespace
 * configurado, y ese remedio es peor que la enfermedad.
 */
async function pasaElTope(request, env) {
  const kv = env && env.VYC_TOPES;
  if (!kv) return true;
  const ip = (request.headers && request.headers.get && request.headers.get('CF-Connecting-IP')) || '';
  const claves = clavesDeTope(ip, '', new Date(), 'tope:doce');
  try {
    const porIp = await contar(kv, claves.ip, TOPE_IP_DIA, TTL_TOPE_S);
    return porIp.pasa;
  } catch {
    // KV caído no puede dejar sin los 12 puntos a quien sí tiene derecho a verlos.
    return true;
  }
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const entrada = url.searchParams.get('dominio') || '';
  const v = normalizarDominio(entrada);
  if (v.error) {
    return new Response(JSON.stringify({ ok: false, tipo: 'entrada', error: v.error }), { status: 400, headers: CABECERAS });
  }
  // El tope va DESPUÉS de validar la entrada y ANTES de pedirle nada al sitio del prospecto:
  // una entrada mala no gasta cupo, y una buena no sale sin pasar por el contador.
  if (!await pasaElTope(request, env)) {
    return new Response(JSON.stringify({
      ok: false, tipo: 'nuestro',
      error: 'Ya revisaste todas las políticas que te tocan hoy. El contador se pone en cero mañana.',
    }), { status: 429, headers: CABECERAS });
  }
  try {
    const g = grabador(fetch);
    const r = await chequear(v.dominio, g.fetch);
    if (!r.ok) {
      // El sitio no abrió. El mensaje es el mismo que da el chequeo rápido, sin inventar otro.
      return new Response(JSON.stringify({ ok: false, tipo: r.tipo, error: r.error }), { status: 400, headers: CABECERAS });
    }
    const pol = sacarPolitica(g.visto, r.revisado);
    const seccion = pol.falla
      ? seccionSinLeer(pol.falla, null)
      : revisarPolitica(pol.html, { fuente: pol.url });
    return new Response(JSON.stringify({ ok: true, dominio: r.dominio, revisado: r.revisado, seccion }), { status: 200, headers: CABECERAS });
  } catch {
    return new Response(
      JSON.stringify({ ok: false, tipo: 'sitio', error: 'No pudimos revisar tu política. Inténtalo de nuevo.' }),
      { status: 500, headers: CABECERAS }
    );
  }
}
