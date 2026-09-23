/**
 * Chequeo de visibilidad en IA — Cloudflare Pages Function.
 *
 * Lee UN sitio público y reporta señales verificables: si los bots de IA pueden
 * entrar, si la página se entiende como entidad, y si es citable. Todo lo que
 * devuelve sale de leer el sitio; nada se infiere ni se estima.
 *
 * GET /api/chequeo?dominio=ejemplo.cl
 *
 * El módulo también exporta `chequear()` puro para poder probarlo con Node.
 */

const TIMEOUT_MS = 8000;
// Tope de lectura por recurso. Subió de 900 KB a 3 MB porque portadas de más de 1 MB son
// corrientes y con el tope viejo el chequeo se quedaba corto seguido.
//
// NO es el techo de memoria, aunque una versión de este comentario lo afirmaba. El cuerpo se
// decodifica trozo a trozo y se acumula como texto, así que el pico por recurso es la cadena
// resultante (UTF-16, hasta el doble de los bytes) más el trozo en curso. Se quitó el paso
// intermedio que juntaba todos los trozos en un solo Uint8Array antes de decodificar, que
// agregaba una copia entera de más.
const MAX_BYTES = 3_000_000;

/* ------------------------------------------------------------------ *
 * Validación del destino. Sin esto, el endpoint es un proxy abierto.  *
 * ------------------------------------------------------------------ */

// Nombres que nunca son un sitio de cliente, más los servicios de DNS comodín que
// devuelven una dirección privada para cualquier nombre que les pidas (nip.io y compañía
// resuelven 127.0.0.1.nip.io a 127.0.0.1). Comprobado con dscacheutil: resuelven de verdad.
const HOST_PROHIBIDO =
  /^(localhost|.*\.localhost|.*\.local|.*\.internal|metadata\.google\.internal|(.*\.)?(nip\.io|sslip\.io|xip\.io|localtest\.me|lvh\.me|vcap\.me|traefik\.me))$/i;

const PUERTOS_OK = new Set(['', '80', '443']);
const MAX_SALTOS = 8;

// Un host puede ser una dirección IP escrita en muchas notaciones, no solo en el 127.0.0.1
// de manual. El parser de URL resuelve 127.1, 0177.0.0.1, 0x7f.0.0.1 y 2130706433 a la
// misma dirección, y la regla con la que lo decide es corta: si la última etiqueta del host
// es un número (decimal, octal o hexadecimal), el host entero se lee como IPv4. Eso es lo
// que comprobamos acá, y de paso cubre los literales IPv6 ([::1]).
//
// Rechazamos TODAS las IP, públicas y privadas. Es más estricto que mirar rangos y bastante
// más difícil de equivocar: la versión anterior miraba rangos sobre un regex de cuatro
// grupos, así que las otras notaciones se le colaban enteras (comprobado contra producción).
// Ningún sitio real se escribe con su IP, y ningún dominio real termina en una etiqueta
// numérica, porque ningún TLD lo es.
// Un host que lleva una IPv4 metida entre sus etiquetas: 127.0.0.1.nip.io, 10.0.0.1.loquesea.
// El portón validaba el NOMBRE y nunca la dirección, así que estos lo cruzaban enteros. No
// podemos resolver DNS desde un Worker, así que esto es lo que sí se puede hacer desde acá:
// rechazar la forma. En producción el borde de Cloudflare además los frena con un 403 (medido),
// o sea que no había puerta abierta; lo que había era un validador que no hacía su trabajo y
// un visitante recibiendo "tu sitio nos bloqueó la lectura" en vez de una respuesta clara.
function llevaIpDentro(host) {
  const p = host.split('.');
  for (let i = 0; i + 3 < p.length; i++) {
    if (p.slice(i, i + 4).every((x) => /^\d{1,3}$/.test(x) && Number(x) <= 255)) return true;
  }
  return false;
}

function esIpLiteral(host) {
  if (host.startsWith('[') || host.includes(':')) return true; // IPv6
  const partes = host.split('.');
  // Se quitan TODAS las etiquetas vacías del final, no una. Con un solo punto final
  // ("127.0.0.1.") la primera versión acertaba, pero con dos la última etiqueta quedaba
  // vacía, el regex no calzaba y el host cruzaba el portón: comprobado, "localhost.." y
  // "metadata.google.internal.." pasaban.
  while (partes.length > 1 && partes[partes.length - 1] === '') partes.pop();
  return /^(0[xX][0-9a-fA-F]*|[0-9]+)$/.test(partes[partes.length - 1]);
}

// La misma validación, pero sobre una URL completa. Es el único portón por donde sale un
// fetch, y existe porque antes solo se validaba lo que escribía el visitante: las
// redirecciones las seguía el runtime por su cuenta, así que el destino real nunca pasaba
// por acá.
export function destinoPermitido(u) {
  let url;
  try {
    url = new URL(u);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
  if (!PUERTOS_OK.has(url.port)) return false;
  const host = url.hostname.toLowerCase().replace(/\.+$/, '');
  // Un host con etiquetas vacías en medio no es un host: no existe razón legítima para
  // "algo..ejemplo.cl", y sí es una forma conocida de despistar a un filtro de nombres.
  if (!host || host.includes('..') || HOST_PROHIBIDO.test(host)) return false;
  return !esIpLiteral(host) && !llevaIpDentro(host);
}

export function normalizarDominio(entrada) {
  if (typeof entrada !== 'string') return { error: 'Escribe un dominio.' };
  let s = entrada.trim().toLowerCase();
  if (!s) return { error: 'Escribe un dominio.' };
  if (s.length > 253) return { error: 'Ese dominio es demasiado largo.' };

  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
  if (s.includes('@')) return { error: 'Escribe un dominio, no un correo.' };

  const [host, puerto] = s.split(':');
  if (puerto && puerto !== '80' && puerto !== '443') {
    return { error: 'No podemos revisar puertos personalizados.' };
  }
  if (!host || HOST_PROHIBIDO.test(host)) {
    return { error: 'Ese destino no se puede revisar.' };
  }
  if (esIpLiteral(host)) {
    return { error: 'Escribe un dominio, no una dirección IP.' };
  }
  if (llevaIpDentro(host)) {
    return { error: 'Ese destino no se puede revisar.' };
  }
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(host)) {
    return { error: 'Eso no parece un dominio válido.' };
  }
  return { dominio: host };
}

/* ------------------------------------------------------------------ *
 * Descarga acotada: timeout y tope de bytes en las dos direcciones.   *
 * ------------------------------------------------------------------ */

// Resuelve un Location relativo ("/es/", "otra.html") contra la URL que lo devolvió.
function resolverUrl(href, base) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

// Sigue las redirecciones a mano, validando cada salto. Con `redirect: 'follow'` el runtime
// las seguía solo y nosotros nunca veíamos a dónde: bastaba que el sitio revisado redirigiera
// a otra parte para que el destino real nunca pasara por el validador.
async function traer(url, fetchImpl, opts = {}) {
  // Un solo reloj para toda la cadena. Con un AbortController por salto, cinco saltos de
  // 8 s daban hasta 40 s de espera al visitante, que es justo lo que el timeout venía a
  // impedir. El presupuesto es de la petición completa, no de cada tramo.
  const ctrl = new AbortController();
  const reloj = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
  let actual = url;
  for (let salto = 0; salto <= MAX_SALTOS; salto++) {
    if (!destinoPermitido(actual)) return null;
    const r = await pedirUna(actual, fetchImpl, opts, ctrl.signal);
    if (!r) return null;
    if (!r.redireccion) return r;
    actual = r.redireccion;
  }
  // Se acabaron los saltos. Devolver null diría "no pudimos abrir el sitio, revisa el
  // dominio", y el dominio está bien: el problema es que el sitio manda de una dirección a
  // otra sin parar. Se devuelve 508 (Loop Detected) para que salga con su propio mensaje,
  // porque para el dueño esto es un hallazgo, no un error nuestro.
  return { status: 508, url: actual, texto: '', completo: true, servidor: '' };
  } finally {
    clearTimeout(reloj);
  }
}

async function pedirUna(url, fetchImpl, opts = {}, signal) {
  try {
    // cache:'no-store' + cacheTtl 0: sin esto, el edge puede servir una copia vieja
    // del recurso (visto en vivo: un robots.txt cacheado SIN los bloqueos de bots de IA
    // que el archivo real ya tenia, y el chequeo daba un falso "todo pasa").
    const r = await fetchImpl(url, {
      signal,
      redirect: 'manual',
      cf: { cacheTtl: 0, cacheEverything: false },
      headers: {
        'User-Agent': opts.ua || 'SpindleLabChequeo/1.0 (+https://spindlelab.cl/diagnostico/)',
        Accept: 'text/html,text/plain,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
    });

    // Una redirección no se lee: se devuelve el destino para que `traer` lo valide y la siga.
    // Si viene un 3xx sin un Location que podamos resolver, preferimos fallar a inventar.
    if (r.status >= 300 && r.status < 400) {
      const destino = r.headers.get('location');
      const siguiente = destino ? resolverUrl(destino, url) : null;
      return siguiente ? { redireccion: siguiente } : null;
    }

    const servidor = (r.headers.get('server') || '').toLowerCase();
    // Las sondas de suplantación solo miran el status, así que ni tocamos el cuerpo.
    if (opts.soloStatus) return { status: r.status, url, texto: '', completo: true, servidor };

    // Se lee por trozos y se corta al pasar el tope, en vez de `r.text()`, que materializa el
    // cuerpo entero antes de recortarlo.
    //
    // Y sobre todo: se devuelve `completo`. Antes, una portada declarada por encima del tope
    // devolvía texto VACÍO y el chequeo la puntuaba igual, así que el informe decía que el
    // sitio no tenía title, ni descripción, ni JSON-LD, ni entidad. Todo presente, todo
    // reportado como ausente. Medido con la misma página: 56 si pesa 50 KB, 30 si pesa 1,2 MB.
    let texto = '';
    let completo = true;

    if (r.body && typeof r.body.getReader === 'function') {
      const lector = r.body.getReader();
      const dec = new TextDecoder('utf-8');
      let acumulado = '';
      let cabeza = '';
      let bytes = 0;
      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BYTES) {
          completo = false;
          // Cancelar es cortesía hacia el origen, no algo de lo que dependa la respuesta: si
          // se esperara acá y el cancel rechazara, el catch devolvería null y el visitante
          // vería "no pudimos abrir el sitio", que es falso.
          try { lector.cancel().catch(() => {}); } catch {}
          break;
        }
        const trozo = dec.decode(value, { stream: true });
        if (!cabeza) cabeza = trozo;
        acumulado += trozo;
      }
      if (completo) {
        texto = acumulado + dec.decode();
      } else {
        // Del archivo que reventó el tope nos quedamos con la cabeza. Son unos pocos KB y
        // bastan para saber qué es: un sitemap.xml declara <urlset en la primera línea. Sin
        // esto, un sitemap grande de verdad (la norma permite hasta 50 MB) salía informado
        // como inexistente, que es falso y castiga justo a los sitios más serios. Para el
        // robots.txt no cambia nada: no poder leerlo entero sigue significando que no
        // podemos afirmar que no bloquea.
        texto = cabeza;
      }
      acumulado = '';
      // Lectura corta: el origen declaró un tamaño y entregó menos, o sea que cerró la
      // conexión a medias. Es seguro compararlo: con gzip el runtime entrega el cuerpo ya
      // descomprimido, así que `bytes` es mayor que lo declarado y nunca dispara de más; y si
      // el proxy quita la cabecera, `declarado` queda en 0 y el control se salta solo.
      const declarado = Number(r.headers.get('content-length') || 0);
      if (completo && declarado > 0 && bytes < declarado) completo = false;
    } else {
      // Sin cuerpo en streaming (Node con un fetch simulado, o una respuesta sin body).
      const crudo = typeof r.text === 'function' ? await r.text() : '';
      // Se miden BYTES, no caracteres: `.length` cuenta unidades UTF-16 y con acentos deja
      // pasar bastante más de lo que dice el tope.
      const bytes = new TextEncoder().encode(crudo).length;
      if (bytes > MAX_BYTES) completo = false;
      else texto = crudo;
      // Las dos ramas tienen que juzgar igual: también acá una lectura corta (el origen
      // declaró un tamaño y entregó menos) es HTML incompleto.
      const declarado = Number(r.headers.get('content-length') || 0);
      if (completo && declarado > 0 && bytes < declarado) completo = false;
    }

    return { status: r.status, url, texto, completo, servidor };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * robots.txt: ¿el grupo que aplica a este bot lo bloquea en la raíz?  *
 * ------------------------------------------------------------------ */

// El robots.txt también lo escribe el sitio revisado, y se lee entero (hasta 3 MB), así que
// todo lo de acá corre en tiempo lineal. Medido el 23-sep con la versión anterior:
// - cada Disallow guardaba su propia copia de la lista de User-agent, y la búsqueda del bot
//   recorría esa copia regla por regla. Con miles de User-agent seguidos de miles de Disallow
//   eran 4,7 s de CPU con 200 KB, y al cuadrado de ahí para arriba. Ahora las reglas de un
//   grupo comparten la lista (no cambia después de la primera regla: el User-agent siguiente
//   abre un grupo nuevo) y la búsqueda mira cada lista una vez;
// - `/#.*$/` y `/^([a-z-]+)\s*:\s*(.*)$/i` retrocedían al cuadrado con un "\r" suelto en la
//   línea (el fin de línea de los Mac viejos, que `split` no corta): 5,9 y 5,1 s con 100 KB.
//   `sinComentario` y `campoYValor` hacen lo mismo con indexOf.
// Y el chequeo lee el archivo una sola vez (`gruposRobots`) para los diez robots, no diez.
export function bloqueaBot(robotsTxt, bot) {
  return bloqueaEnGrupos(gruposRobots(robotsTxt), bot);
}

// Lo mismo que `l.replace(/#.*$/, '')`: corta en el primer '#' que no tenga después un fin de
// línea que `.` no cruce (\r, \u2028, \u2029; los \n ya los cortó el split).
function sinComentario(l) {
  const corte = Math.max(l.lastIndexOf('\r'), l.lastIndexOf('\u2028'), l.lastIndexOf('\u2029'));
  const i = l.indexOf('#', corte + 1);
  return i === -1 ? l : l.slice(0, i);
}

// Lo mismo que `l.match(/^([a-z-]+)\s*:\s*(.*)$/i)`, devuelto como [campo, valor] o null. El
// campo va hasta el primer ':' (ni [a-z-] ni \s lo incluyen), y el valor es lo que sigue sin los
// espacios del comienzo, siempre que no quede adentro un fin de línea que `.` no cruce.
function campoYValor(l) {
  const dosPuntos = l.indexOf(':');
  if (dosPuntos === -1) return null;
  const campo = l.slice(0, dosPuntos);
  if (!/^[a-z-]+\s*$/i.test(campo)) return null;
  const valor = l.slice(dosPuntos + 1).trimStart();
  if (/[\n\r\u2028\u2029]/.test(valor)) return null;
  return [campo.trimEnd(), valor];
}

// Los grupos del robots.txt, cada uno con su lista de User-agent y sus reglas, en orden.
function gruposRobots(robotsTxt) {
  const grupos = [];
  if (!robotsTxt) return grupos; // sin robots.txt no hay bloqueo

  let agentes = [];
  let enGrupo = false;
  let previaEraAgente = false;
  let actual = null;

  for (const linea of robotsTxt.split(/\r?\n/)) {
    const l = sinComentario(linea).trim();
    if (!l) continue;
    const par = campoYValor(l);
    if (!par) continue;
    const campo = par[0].toLowerCase();
    const valor = par[1].trim();

    if (campo === 'user-agent') {
      if (enGrupo && !previaEraAgente) {
        agentes = [];
        enGrupo = false;
      }
      agentes.push(valor.toLowerCase());
      previaEraAgente = true;
      continue;
    }
    if (campo === 'disallow' || campo === 'allow') {
      previaEraAgente = false;
      enGrupo = true;
      if (!actual || actual.agentes !== agentes) {
        actual = { agentes, reglas: [] };
        grupos.push(actual);
      }
      actual.reglas.push({ campo, valor });
    }
  }
  return grupos;
}

function bloqueaEnGrupos(grupos, bot) {
  const objetivo = bot.toLowerCase();
  let usar = grupos.filter((g) => g.agentes.includes(objetivo));
  if (!usar.length) usar = grupos.filter((g) => g.agentes.includes('*'));
  if (!usar.length) return false;

  // La regla más específica que matchea la raíz gana; empate lo gana Allow.
  let mejor = null;
  for (const r of usar.flatMap((g) => g.reglas)) {
    const patron = r.valor;
    if (r.campo === 'disallow' && patron === '') continue; // "Disallow:" vacío = permite todo
    const matchea = patron === '/' || patron === '*' || patron === '/*';
    if (!matchea) continue;
    const largo = patron.length;
    if (!mejor || largo > mejor.largo || (largo === mejor.largo && r.campo === 'allow')) {
      mejor = { campo: r.campo, largo };
    }
  }
  return !!mejor && mejor.campo === 'disallow';
}

/* ------------------------------------------------------------------ *
 * Lectura del HTML. Sin DOM en el runtime: solo necesitamos          *
 * presencia/ausencia de señales, no parsear el árbol.                 *
 *                                                                    *
 * Todo lo que recorre el HTML lo hace en tiempo lineal, con indexOf   *
 * y regex de literales. Este endpoint es público y sin autenticar, y  *
 * el HTML lo escribe el sitio revisado. Medido el 23-sep con Node, las *
 * regex anteriores (con [^>]+ o [\s\S]*? delante de lo que buscaban):  *
 * la de la meta description tardaba 5,3 s de CPU con 25 KB de          *
 * '<meta name="description" ' repetido y más de 20 s con 50 KB; la de  *
 * los títulos con pregunta, 7,3 s con 100 KB de '?'; la del texto      *
 * visible, 7 s con 100 KB de '<'; las del canonical, el lang, el       *
 * JSON-LD y el title, entre 0,3 y 1 s con 100 KB. Todas crecían al     *
 * cuadrado o peor, y la portada se lee hasta 3 MB: minutos por visita. *
 *                                                                    *
 * Cada función de acá devuelve EXACTAMENTE lo que devolvía su regex    *
 * (comparadas con millones de cadenas al azar y con portadas reales    *
 * antes del cambio): el arreglo es de costo, no de criterio.           *
 * ------------------------------------------------------------------ */

// Las etiquetas que empiezan con `re` (una regex /gi de un literal, como /<meta/gi), como
// [cuerpo, fin): `cuerpo` justo después del nombre y `fin` en el primer '>' que sigue, o en el
// final del documento si no hay ninguno.
//
// La búsqueda siguiente arranca DESPUÉS de `fin`, y eso es lo que la hace lineal: una
// etiqueta que empieza dentro de otra sin cerrar ('<link <link <link ...') comparte el mismo
// `fin`, así que su tramo es un pedazo del tramo de la primera, y lo que no apareció en el
// tramo entero tampoco aparece en un pedazo. Las regex viejas volvían a recorrer ese tramo
// una vez por cada '<link' de adentro.
function* aperturas(html, re) {
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(html))) {
    const cuerpo = m.index + m[0].length;
    let fin = html.indexOf('>', cuerpo);
    if (fin === -1) fin = html.length;
    yield [cuerpo, fin];
    re.lastIndex = fin + 1;
  }
}

// Lo mismo que `/<nombre[^>]+atributo/i.test(html)`: alguna etiqueta que empiece con
// `reApertura` lleva `reAtributo` antes de su primer '>'. El tramo arranca un carácter después
// del nombre porque `[^>]+` pide al menos uno. `reAtributo` no puede contener '>'.
function hayEtiquetaCon(html, reApertura, reAtributo) {
  for (const [cuerpo, fin] of aperturas(html, reApertura)) {
    if (reAtributo.test(html.slice(cuerpo + 1, fin))) return true;
  }
  return false;
}

// Lo mismo que el primer grupo de `/<title[^>]*>([\s\S]*?)<\/title>/i`, o ''. Basta con mirar
// el primer <title: si a él le falta el '>' o el </title> que viene después, a todos los que
// siguen también.
function tituloDe(html) {
  const abre = /<title/i.exec(html);
  if (!abre) return '';
  const fin = html.indexOf('>', abre.index + abre[0].length);
  if (fin === -1) return '';
  const reCierre = /<\/title>/gi;
  reCierre.lastIndex = fin + 1;
  const cierre = reCierre.exec(html);
  return cierre ? html.slice(fin + 1, cierre.index) : '';
}

// Lo mismo que el primer grupo de
// `/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i`, o ''.
// La regex, con su retroceso, se queda con el ÚLTIMO content= de la etiqueta que venga
// después de algún name="description", y el valor llega hasta la comilla siguiente, aunque
// esté pasado el '>'. Si después de ese último content= no queda ninguna comilla en todo el
// documento, retrocede al penúltimo, cuyo valor termina en la comilla del último.
const RE_COMILLA = /["']/g;
function metaDescripcionDe(html) {
  const reContenido = /content=["']/gi;
  for (const [cuerpo, fin] of aperturas(html, /<meta/gi)) {
    const desde = cuerpo + 1;
    const tag = html.slice(desde, fin);
    const nombre = /name=["']description["']/i.exec(tag);
    if (!nombre) continue;
    let ultimo = -1;
    let penultimo = -1;
    reContenido.lastIndex = nombre.index + nombre[0].length;
    let c;
    while ((c = reContenido.exec(tag))) {
      penultimo = ultimo;
      ultimo = desde + c.index + c[0].length;
    }
    if (ultimo === -1) continue;
    let valor = ultimo;
    RE_COMILLA.lastIndex = valor;
    let comilla = RE_COMILLA.exec(html);
    if (!comilla) {
      if (penultimo === -1) continue;
      valor = penultimo;
      RE_COMILLA.lastIndex = valor;
      comilla = RE_COMILLA.exec(html);
    }
    return html.slice(valor, comilla.index);
  }
  return '';
}

// Lo mismo que contar `/<h[23][^>]*>[^<]*\?[^<]*<\/h[23]>/gi`: un <h2 o <h3 cuyo texto, del
// '>' al primer '<', tiene un '?', y ese '<' abre un </h2> o </h3>. Si no calza, ningún <h2
// de adentro de la misma etiqueta calza tampoco, y la búsqueda sigue en ese '<'.
function preguntasEnTitulos(html) {
  const reTitulo = /<h[23]/gi;
  const reCierre = /<\/h[23]>/iy;
  let n = 0;
  let m;
  while ((m = reTitulo.exec(html))) {
    const fin = html.indexOf('>', m.index + m[0].length);
    if (fin === -1) break;
    const menor = html.indexOf('<', fin + 1);
    if (menor === -1) break;
    reCierre.lastIndex = menor;
    if (reCierre.test(html) && html.slice(fin + 1, menor).includes('?')) {
      n++;
      reTitulo.lastIndex = menor + 5;
    } else {
      reTitulo.lastIndex = menor;
    }
  }
  return n;
}

// Lo mismo que `s.replace(/<nombre[\s\S]*?<\/nombre>/gi, ' ')`. Si un <nombre no tiene su
// cierre, los que vienen después tampoco, y ahí se termina: la regex recorría el resto del
// documento una vez por cada uno.
function sinBloques(s, nombre) {
  const reAbre = new RegExp(`<${nombre}`, 'gi');
  const reCierra = new RegExp(`</${nombre}>`, 'gi');
  const partes = [];
  let desde = 0;
  let m;
  while ((m = reAbre.exec(s))) {
    reCierra.lastIndex = m.index + m[0].length;
    const cierre = reCierra.exec(s);
    if (!cierre) break;
    partes.push(s.slice(desde, m.index), ' ');
    desde = reAbre.lastIndex = cierre.index + cierre[0].length;
  }
  partes.push(s.slice(desde));
  return partes.join('');
}

// Lo mismo que `s.replace(/<[^>]+>/g, ' ')`: de cada '<' al primer '>' (con al menos un
// carácter entre medio). Si un '<' no tiene '>' después, ninguno de los siguientes tampoco.
function sinEtiquetas(s) {
  const partes = [];
  let desde = 0;
  let i = s.indexOf('<');
  while (i !== -1) {
    if (i + 1 >= s.length || s[i + 1] === '>') {
      i = s.indexOf('<', i + 1);
      continue;
    }
    const fin = s.indexOf('>', i + 1);
    if (fin === -1) break;
    partes.push(s.slice(desde, i), ' ');
    desde = fin + 1;
    i = s.indexOf('<', desde);
  }
  partes.push(s.slice(desde));
  return partes.join('');
}

function textoVisible(html) {
  return sinEtiquetas(sinBloques(sinBloques(html, 'script'), 'style'))
    .replace(/\s+/g, ' ')
    .trim();
}

// Los bloques de `/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi`.
// Un <script sin '>' o un bloque sin </script> termina la búsqueda, igual que en la regex:
// ninguno de los que siguen podría cerrar.
function bloquesJsonLd(html) {
  const out = [];
  const reScript = /<script/gi;
  const reTipo = /type=["']application\/ld\+json["']/i;
  const reFin = /<\/script>/gi;
  let m;
  while ((m = reScript.exec(html))) {
    const cuerpo = m.index + m[0].length;
    const fin = html.indexOf('>', cuerpo);
    if (fin === -1) break;
    if (!reTipo.test(html.slice(cuerpo + 1, fin))) {
      reScript.lastIndex = fin + 1;
      continue;
    }
    reFin.lastIndex = fin + 1;
    const cierre = reFin.exec(html);
    if (!cierre) break;
    try {
      out.push(JSON.parse(html.slice(fin + 1, cierre.index).trim()));
    } catch {
      /* bloque inválido: se ignora, y eso ya cuenta como que no aporta */
    }
    reScript.lastIndex = cierre.index + cierre[0].length;
  }
  return out;
}

// Los nodos del JSON-LD en el mismo orden que la versión recursiva (primero el nodo, después
// su @graph, después sus hermanos), pero con una pila propia. La recursiva reventaba con un
// RangeError, y el visitante recibía un error en vez de un informe, con arreglos anidados unos
// cientos de miles de niveles: '[[[[...]]]]' de 1 MB bastaba.
function aplanar(raiz) {
  const acc = [];
  const pila = [raiz];
  while (pila.length) {
    const nodo = pila.pop();
    if (Array.isArray(nodo)) {
      for (let i = nodo.length - 1; i >= 0; i--) pila.push(nodo[i]);
    } else if (nodo && typeof nodo === 'object') {
      acc.push(nodo);
      if (nodo['@graph']) pila.push(nodo['@graph']);
    }
  }
  return acc;
}

const TIPOS_ENTIDAD = [
  'organization', 'localbusiness', 'professionalservice', 'corporation',
  'medicalorganization', 'dentist', 'legalservice', 'store', 'person',
];

function tieneTipo(nodo, lista) {
  const t = nodo['@type'];
  const tipos = (Array.isArray(t) ? t : [t]).filter(Boolean).map((x) => String(x).toLowerCase());
  return tipos.some((x) => lista.includes(x));
}

/* ------------------------------------------------------------------ *
 * El chequeo                                                          *
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Qué decirle a alguien cuyo sitio no se dejó leer                     *
 * ------------------------------------------------------------------ */

// Antes esto era una sola línea con el número adentro: "El sitio respondió 526. Revisa el
// dominio." Para quien escribe su dominio ese número no significa nada, y el consejo estaba
// equivocado además, porque el dominio estaba bien. El código sigue viajando aparte, en
// `codigo`, porque a nosotros nos sirve cuando alguien nos escribe.
export function mensajeDeFallo(status) {
  if (status === 401 || status === 403) {
    return 'Tu sitio nos bloqueó la lectura: respondió que no tenemos permiso para ver la ' +
      'portada. Suele ser un firewall o una regla contra lectores automáticos, y vale la pena ' +
      'mirarlo, porque lo mismo le puede estar pasando a los robots de IA. Escríbenos a ' +
      'hola@spindlelab.cl y lo revisamos a mano.';
  }
  if (status === 404) {
    return 'El dominio responde, pero su portada no existe. Revisa que sea la dirección que ' +
      'usa tu sitio: a veces vive en un subdominio y no en el dominio pelado.';
  }
  if (status === 429) {
    return 'Tu sitio nos pidió bajar el ritmo porque recibió varias peticiones seguidas. ' +
      'Espera un minuto y vuelve a intentarlo.';
  }
  if (status === 525 || status === 526) {
    return 'El certificado de tu sitio no sirve: está vencido, mal instalado o es de otro ' +
      'dominio. No pudimos leer ninguna página, así que no hay informe. Eso ya es un hallazgo ' +
      'en sí: hoy tus visitantes ven una advertencia de seguridad antes de poder entrar.';
  }
  if (status === 508) {
    return 'Tu sitio nos mandó de una dirección a otra tantas veces seguidas que dejamos de ' +
      'seguirlo. Suele ser un bucle de redirecciones mal configurado, y no es solo un problema ' +
      'para este chequeo: alguien que entre a tu sitio puede quedarse dando vueltas sin llegar nunca.';
  }
  if (status === 530) {
    return 'No encontramos un sitio publicado en ese dominio. Revisa que esté bien escrito y ' +
      'que esté apuntando a un hosting.';
  }
  if (status >= 500) {
    return 'Tu sitio respondió con un error de su propio servidor. Suele ser pasajero: ' +
      'inténtalo en un rato. Si sigue igual, el problema está en tu hosting y no en este chequeo.';
  }
  return 'Tu sitio respondió, pero no nos entregó la portada. Revisa el dominio o inténtalo de nuevo.';
}

export async function chequear(entrada, fetchImpl = fetch) {
  const v = normalizarDominio(entrada);
  if (v.error) return { ok: false, error: v.error };
  const { dominio } = v;

  const [home, robots, llms, sitemap, sondaOAI, sondaChatGPT, sondaPerplexity] = await Promise.all([
    traer(`https://${dominio}/`, fetchImpl),
    traer(`https://${dominio}/robots.txt`, fetchImpl),
    traer(`https://${dominio}/llms.txt`, fetchImpl),
    traer(`https://${dominio}/sitemap.xml`, fetchImpl),
    // Sondas de suplantación: pedimos la portada presentándonos como robots de IA en vivo,
    // para detectar servidores/CDN que expulsan por nombre de agente (el robots.txt puede
    // estar impecable y el sitio seguir cerrado).
    traer(`https://${dominio}/`, fetchImpl, { soloStatus: true, ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot' }),
    traer(`https://${dominio}/`, fetchImpl, { soloStatus: true, ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot' }),
    traer(`https://${dominio}/`, fetchImpl, { soloStatus: true, ua: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)' }),
  ]);

  if (!home || home.status >= 400) {
    if (!home) {
      return { ok: false, error: 'No pudimos abrir el sitio. Revisa el dominio o inténtalo de nuevo.' };
    }
    return { ok: false, error: mensajeDeFallo(home.status), codigo: home.status };
  }

  // Si la portada no llegó entera, NO se puntúa. Esto es lo que antes producía el informe
  // más equivocado posible: una portada por encima del tope devolvía texto vacío y el
  // chequeo la puntuaba igual, así que decía que el sitio no tenía title, ni descripción, ni
  // JSON-LD, ni entidad, con todo eso presente. Medido con la misma página: 56 si pesa 50 KB,
  // 30 si pesa 1,2 MB. Preferimos no dar resultado antes que dar uno inventado.
  // Decisión tomada a sabiendas, no un descuido: por encima del tope preferimos NO dar
  // informe, aunque tengamos la cabeza del archivo en la mano. La versión vieja, cuando el
  // origen no declaraba tamaño, leía todo y se quedaba con el prefijo, así que por encima de
  // 3 MB este chequeo pasa de contestar a declinar. Lo sabemos y lo elegimos: puntuar sobre
  // el prefijo y presentarlo como informe completo es exactamente "un resultado a medias",
  // que es lo que este producto promete no hacer. Las señales que viven abajo saldrían
  // ausentes sin estarlo. Portadas de más de 3 MB de HTML son raras; un informe equivocado
  // cuesta más que uno que no se entrega.
  if (!home.completo) {
    return {
      ok: false,
      error:
        'Tu portada pesa más de lo que este chequeo automático alcanza a leer completo. ' +
        'Preferimos no darte un resultado a medias: escríbenos a hola@spindlelab.cl y la revisamos a mano.',
    };
  }

  // El otro extremo del mismo problema: un 2xx que no trae nada de HTML. Pasa cuando un
  // firewall le devuelve la página en blanco a un lector automático como el nuestro.
  // Puntuarlo es inventar igual que truncar.
  if (!home.texto.trim()) {
    return {
      ok: false,
      error:
        'Tu sitio respondió, pero no nos entregó HTML que podamos revisar. Suele pasar ' +
        'cuando un firewall bloquea a los lectores automáticos. Escríbenos a ' +
        'hola@spindlelab.cl y lo revisamos a mano.',
    };
  }

  const html = home.texto;
  // Del robots.txt usamos lo que SÍ llegó: un bloqueo que leímos es un bloqueo real, y vale
  // reportarlo. Lo que no se puede es lo contrario. Si no llegó entero, la regla que bloquea
  // puede estar justo en el pedazo que no alcanzamos a leer, así que no podemos afirmar que
  // estos robots están libres. Y si ni siquiera respondió, menos.
  //
  // La primera versión de esta guardia hacía justo lo que el cambio venía a matar: cuando el
  // archivo no se podía leer lo sustituía por vacío, que el resto del código lee como "no
  // tienes robots.txt, así que nada está bloqueado". Un sitio con los índices de IA cerrados
  // recibía tres señales en verde y 16 puntos de regalo, afirmando que el archivo no existe.
  // Un robots.txt que no pudimos leer no es un robots.txt que no existe.
  const robotsTxt = robots && robots.status === 200 ? robots.texto : '';
  const robotsIlegible = !robots || (robots.status === 200 && !robots.completo);
  // Se lee una vez y se pregunta por cada uno de los diez robots.
  const gruposDelRobots = gruposRobots(robotsTxt);
  const bloquea = (bot) => bloqueaEnGrupos(gruposDelRobots, bot);
  const nodos = aplanar(bloquesJsonLd(html));

  const title = tituloDe(html).replace(/\s+/g, ' ').trim();
  const desc = metaDescripcionDe(html).trim();
  const h1s = html.match(/<h1[\s>]/gi) || [];
  const entidad = nodos.find((n) => tieneTipo(n, TIPOS_ENTIDAD));
  // Con un for y no con Math.max(0, ...nodos.map(...)): pasar cientos de miles de nodos como
  // argumentos revienta la pila, y un @graph de 2 MB con 700.000 nodos vacíos lo lograba.
  let sameAsN = 0;
  for (const n of nodos) {
    const s = n.sameAs;
    const cuantos = Array.isArray(s) ? s.length : typeof s === 'string' && s ? 1 : 0;
    if (cuantos > sameAsN) sameAsN = cuantos;
  }
  const conFaq = nodos.some((n) => tieneTipo(n, ['faqpage', 'qapage']));

  // Señales que separan un sitio citable de uno meramente correcto.
  const entidadCompleta =
    !!entidad &&
    !!(entidad.address || entidad.location) &&
    !!(entidad.telephone || entidad.email || entidad.contactPoint);
  const conAutor = nodos.some(
    (n) => tieneTipo(n, ['person']) && (n.jobTitle || n.knowsAbout || n.alumniOf || n.worksFor)
  );
  const conFecha = nodos.some((n) => n.dateModified || n.datePublished);
  const preguntas = preguntasEnTitulos(html);
  const texto = textoVisible(html);
  const palabras = texto ? texto.split(' ').length : 0;

  // v2 (8-sep-2026): los robots se separan por lo que DECIDEN.
  // En vivo = deciden si te citan hoy. Entrenamiento = deciden si los modelos futuros
  // te conocen; bloquearlos NO borra citas hoy (decisión legítima de PI).
  const botsIndices = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'];
  const botsAsistentes = ['ChatGPT-User', 'Claude-User', 'Perplexity-User'];
  const botsEntrenamiento = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot'];

  // Limitación real, verificada en vivo: si el sitio está tras Cloudflare, las reglas de
  // bots que Cloudflare inyecta en el borde (robots.txt gestionado / content signals)
  // pueden no llegar a este chequeo (el fetch Worker→Cloudflare rutea interno y recibe
  // el robots.txt del origen). Se declara, no se adivina.
  const trasCloudflare = (home.servidor || '').includes('cloudflare');

  const items = [];
  const add = (bloque, id, titulo, ok, peso, detalle, arregloSiFalla) =>
    items.push({ bloque, id, titulo, ok, peso, detalle, arreglo: ok ? null : arregloSiFalla });

  // --- Bloque 1: ¿te pueden leer? (v2: en-vivo pesa, entrenamiento informa) ---
  const caveatCf = trasCloudflare
    ? ' Tu sitio usa Cloudflare: si activaste sus reglas de bots de IA en el borde, este chequeo no las ve; confírmalo abriendo tu propio /robots.txt.'
    : '';
  const sinRobots = robotsIlegible || robotsTxt ? null : 'No tienes robots.txt, así que nada está bloqueado.';
  const noSabemos = !robotsIlegible
    ? null
    : !robots
      ? 'Tu robots.txt no respondió, así que no pudimos comprobar si bloquea a estos robots. Preferimos decírtelo antes que darte un verde que no medimos.'
      : 'Tu robots.txt no nos llegó entero, así que no podemos afirmar que estos robots estén libres: la regla que los bloquea podría estar en la parte que no alcanzamos a leer.';
  const arregloIlegible = 'Ábrelo tú en tu-dominio.cl/robots.txt y revisa si hay una línea Disallow para estos robots. Si quieres, escríbenos a hola@spindlelab.cl y lo miramos contigo.';

  const bloqIdx = botsIndices.filter(bloquea);
  add(
    'acceso', 'bots-indices', 'Los índices de búsqueda de IA pueden entrar', bloqIdx.length === 0 && !robotsIlegible, 7,
    bloqIdx.length
      ? `Tu robots.txt bloquea a ${bloqIdx.join(', ')}. Estos robots construyen los índices con los que ChatGPT, Claude y Perplexity buscan en la web: con ellos cerrados, no puedes aparecer como fuente en sus respuestas de hoy.`
      : (noSabemos || sinRobots || `OAI-SearchBot, Claude-SearchBot y PerplexityBot no están bloqueados en tu robots.txt.${caveatCf}`),
    bloqIdx.length
      ? `Quita la regla que bloquea a ${bloqIdx.join(', ')} en tu robots.txt. Es un cambio de una línea y el efecto es inmediato.`
      : arregloIlegible
  );

  const bloqAsis = botsAsistentes.filter(bloquea);
  add(
    'acceso', 'bots-asistentes', 'Los asistentes de IA pueden visitarte en vivo', bloqAsis.length === 0 && !robotsIlegible, 7,
    bloqAsis.length
      ? `Tu robots.txt bloquea a ${bloqAsis.join(', ')}. Estos agentes entran a tu sitio en el momento en que alguien le hace una pregunta a la IA: con ellos cerrados, el asistente no puede leerte aunque quiera citarte.`
      : (noSabemos || sinRobots || `ChatGPT-User, Claude-User y Perplexity-User no están bloqueados en tu robots.txt.${caveatCf}`),
    bloqAsis.length
      ? `Quita la regla que bloquea a ${bloqAsis.join(', ')} en tu robots.txt.`
      : arregloIlegible
  );

  const sondas = [
    ['OAI-SearchBot', sondaOAI],
    ['ChatGPT-User', sondaChatGPT],
    ['PerplexityBot', sondaPerplexity],
  ];
  const expulsados = sondas.filter(([, r]) => r && home.status === 200 && r.status >= 400);
  const sinDato = sondas.every(([, r]) => !r);
  add(
    'acceso', 'servidor-ua', 'El servidor no expulsa a los robots de IA', expulsados.length === 0, 8,
    expulsados.length
      ? `Pedimos tu portada presentándonos como cada robot: ${expulsados.map(([n, r]) => `${n} recibió un ${r.status}`).join('; ')}. Un navegador normal recibe la página. Esto no está en el robots.txt: lo hace el servidor o el CDN, normalmente una regla de seguridad que alguien activó sin saber qué apagaba.`
      : sinDato
        ? 'No pudimos completar las sondas de agente (el sitio no respondió a tiempo); este chequeo no descuenta puntaje en ese caso.'
        : `Pedimos tu portada presentándonos como OAI-SearchBot, ChatGPT-User y PerplexityBot, y todas recibieron la página. Ojo: nuestras peticiones salen de nuestro servidor, no de los de OpenAI o Perplexity, así que un filtro por dirección de origen no lo veríamos.${trasCloudflare ? ' Y tu sitio usa Cloudflare: una regla del borde podría tratar distinto al robot real.' : ''}`,
    'Pídele a quien administre el hosting o el CDN que permita el paso a estos agentes. En Cloudflare suele estar en la regla de bots o en el modo "Bloquear rastreadores de IA".'
  );

  const bloqEnt = botsEntrenamiento.filter(bloquea);
  add(
    'acceso', 'bots-entrenamiento', 'Robots de entrenamiento: decisión consciente', bloqEnt.length === 0 && !robotsIlegible, 2,
    bloqEnt.length
      ? `Bloqueas a ${bloqEnt.join(', ')}. Esto NO te quita citas hoy: estos robots recogen texto para entrenar modelos futuros, y es una decisión legítima sobre tu propiedad intelectual. Solo conviene que sea una decisión tomada, no una casilla que alguien marcó pensando que protegía la visibilidad.`
      : (noSabemos || sinRobots || `GPTBot, ClaudeBot, Google-Extended y CCBot pueden recoger tu texto para modelos futuros.${caveatCf}`),
    'Si fue a propósito, déjalo así. Si no sabías que estaba, decide: a cambio de nada hoy, renuncias a que los modelos de dentro de dos años sepan de ti sin buscarte.'
  );

  const httpsOk = home.url.startsWith('https://') && home.status === 200;
  add(
    'acceso', 'https', 'El sitio responde por HTTPS', httpsOk, 6,
    httpsOk ? `Respondió ${home.status} sobre HTTPS.` : `Respondió ${home.status}.`,
    'Asegura que el dominio sirva por HTTPS y devuelva 200.'
  );

  // --- Bloque 2: ¿te entienden? ---
  add(
    'entidad', 'jsonld', 'Tienes datos estructurados', nodos.length > 0, 6,
    nodos.length ? `Encontramos ${nodos.length} nodo(s) de JSON-LD.` : 'No encontramos JSON-LD válido.',
    'Agrega JSON-LD. Es la forma en que le explicas a la IA qué es tu negocio.'
  );
  add(
    'entidad', 'entidad', 'Tu negocio está declarado como entidad', !!entidad, 8,
    entidad ? `Declarado como ${[].concat(entidad['@type']).join(', ')}.` : 'No hay un nodo Organization ni equivalente.',
    'Declara un nodo Organization (o LocalBusiness) con nombre, dirección y contacto.'
  );
  add(
    'entidad', 'entidad-completa', 'Tu entidad tiene dirección y contacto', entidadCompleta, 5,
    entidadCompleta
      ? 'Tu schema declara dirección y forma de contacto.'
      : 'Tu entidad existe pero le falta dirección o contacto.',
    'Suma address y telephone/email al nodo de tu negocio. La IA los usa para confiar en que existes.'
  );
  add(
    'entidad', 'sameas', 'Te conectas con al menos 3 perfiles externos', sameAsN >= 3, 6,
    sameAsN ? `Tu schema declara ${sameAsN} perfil(es) en sameAs.` : 'Tu schema no tiene sameAs.',
    'Suma sameAs con tus perfiles reales (LinkedIn, Instagram, Google Business). Uno solo no basta.'
  );
  add(
    'entidad', 'autor', 'Hay una persona con credenciales detrás', conAutor, 5,
    conAutor
      ? 'Tu schema declara una persona con cargo o especialidad.'
      : 'No hay un Person con cargo, especialidad o formación.',
    'Declara quién firma el contenido, con cargo y especialidad. En salud, finanzas y legal, esto decide si te citan.'
  );
  const titleOk = title.length >= 15 && title.length <= 65;
  add(
    'entidad', 'title', 'El título dice qué haces y dónde', titleOk, 4,
    title ? `${title.length} caracteres.` : 'La página no tiene título.',
    'Deja el título entre 15 y 65 caracteres, con el servicio y el país.'
  );
  const descOk = desc.length >= 50 && desc.length <= 165;
  add(
    'entidad', 'desc', 'Tienes meta description útil', descOk, 4,
    desc ? `${desc.length} caracteres.` : 'No hay meta description.',
    'Escribe una meta description de 50 a 165 caracteres.'
  );
  add(
    'entidad', 'h1', 'Hay un solo H1', h1s.length === 1, 2,
    `Encontramos ${h1s.length} H1.`,
    'Deja exactamente un H1 por página.'
  );

  // --- Bloque 3: ¿te pueden citar? ---
  // Un 200 que no alcanzamos a leer entero igual prueba que el archivo está ahí.
  const llmsOk = !!llms && llms.status === 200 && (llms.texto.trim().length > 0 || !llms.completo);
  add(
    'citabilidad', 'llms', 'Tienes llms.txt', llmsOk, 4,
    llmsOk ? 'Encontramos /llms.txt.' : 'No encontramos /llms.txt.',
    'Publica un llms.txt: le dice a los motores qué eres y qué páginas importan.'
  );
  add(
    'citabilidad', 'faq', 'Tienes preguntas frecuentes marcadas', conFaq, 6,
    conFaq ? 'Encontramos FAQPage en tu schema.' : 'No hay FAQPage en tu schema.',
    'Marca tus preguntas frecuentes con FAQPage. Es el formato que la IA cita textual.'
  );
  const sitemapOk = !!sitemap && sitemap.status === 200 && /<urlset|<sitemapindex/i.test(sitemap.texto);
  add(
    'citabilidad', 'sitemap', 'Tienes sitemap.xml', sitemapOk, 4,
    sitemapOk ? 'Encontramos un sitemap válido.' : 'No encontramos /sitemap.xml.',
    'Publica un sitemap.xml y decláralo en robots.txt.'
  );
  const canonicalOk = hayEtiquetaCon(html, /<link/gi, /rel=["']canonical["']/i);
  add(
    'citabilidad', 'canonical', 'Declaras la URL canónica', canonicalOk, 2,
    canonicalOk ? 'La home declara canonical.' : 'No hay canonical.',
    'Agrega <link rel="canonical"> en cada página.'
  );
  const langOk = hayEtiquetaCon(html, /<html/gi, /lang=["'][a-z]{2}/i);
  add(
    'citabilidad', 'lang', 'Declaras el idioma', langOk, 2,
    langOk ? 'El <html> declara lang.' : 'El <html> no declara lang.',
    'Agrega lang="es-CL" al <html>.'
  );
  add(
    'citabilidad', 'preguntas', 'Respondes preguntas en tus títulos', preguntas >= 2, 5,
    preguntas
      ? `Encontramos ${preguntas} título(s) con forma de pregunta.`
      : 'Ningún H2 o H3 está escrito como pregunta.',
    'Escribe subtítulos con la pregunta que hace tu cliente. La IA cita el párrafo que responde una pregunta.'
  );
  add(
    'citabilidad', 'fecha', 'Tu contenido tiene fecha', conFecha, 4,
    conFecha ? 'Tu schema declara fecha de publicación o actualización.' : 'No hay fechas en tu schema.',
    'Declara datePublished y dateModified. Sin fecha, la IA no sabe si tu información sigue vigente.'
  );
  add(
    'citabilidad', 'sustancia', 'Tu portada tiene contenido suficiente', palabras >= 300, 3,
    `Contamos alrededor de ${palabras} palabras de texto visible.`,
    'Una portada con poco texto no le da a la IA nada que citar. Explica qué haces, para quién y dónde.'
  );

  const total = items.reduce((a, i) => a + i.peso, 0);
  const obtenido = items.reduce((a, i) => a + (i.ok ? i.peso : 0), 0);
  const puntaje = Math.round((obtenido / total) * 100);

  const prioridades = items
    .filter((i) => !i.ok)
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 3)
    .map((i) => ({ titulo: i.titulo, arreglo: i.arreglo }));

  return {
    ok: true,
    dominio,
    puntaje,
    revisadoEn: new Date().toISOString(),
    bloques: [
      { id: 'acceso', titulo: '¿Te pueden leer?', sub: 'Si los bots de IA no entran, nada más importa.' },
      { id: 'entidad', titulo: '¿Te entienden?', sub: 'Qué eres, a qué te dedicas y dónde operas.' },
      { id: 'citabilidad', titulo: '¿Te pueden citar?', sub: 'El formato en que la IA copia y atribuye.' },
    ],
    items,
    prioridades,
  };
}

/* ------------------------------------------------------------------ */

const CORS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=300',
};

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const dominio = url.searchParams.get('dominio') || '';
  try {
    const r = await chequear(dominio);
    return new Response(JSON.stringify(r), { status: r.ok ? 200 : 400, headers: CORS });
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'No pudimos completar el chequeo. Inténtalo de nuevo.' }),
      { status: 500, headers: CORS }
    );
  }
}
