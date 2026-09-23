/**
 * Chequeo Ley 21.719 — Cloudflare Pages Function.
 *
 * Lee UN sitio público y reporta señales técnicas ligadas a la Ley 21.719 (protección de
 * datos personales, vigencia plena 1-dic-2026). Solo evalúa lo que un fetch de HTML crudo
 * puede ver — sin navegador, sin ejecutar JavaScript — según la factibilidad técnica
 * registrada en laboratorio/01-cumplimiento-ley-21719/brief.md (§4, "lanzamiento liviano").
 *
 * Por eso este chequeo DESCRIBE, no CERTIFICA (brief §5): reporta señales presentes o
 * ausentes, nunca "cumples" o "no cumples". No es asesoría legal.
 *
 * GET /api/chequeo?dominio=ejemplo.cl
 *
 * El módulo también exporta `chequear()` puro para poder probarlo con Node. La validación
 * de dominio y la descarga acotada son el mismo código verificado que usa el chequeo de
 * visibilidad en IA de SpindleLab (spindlelab-astro/functions/api/chequeo.js) — no hay
 * motivo para reescribir una lógica de seguridad ya probada.
 *
 * Contrato de la respuesta (la portada lo dibuja de forma genérica, sin copiar textos):
 * cada ítem trae `estado` ('ok' | 'pendiente' | 'sin-confirmar') y el puntaje se calcula
 * solo sobre los ítems que SÍ pudimos confirmar. 'sin-confirmar' es para lo que desde afuera
 * no se puede saber (rastreadores que cargan con JavaScript, una política que no nos dejó
 * entrar, un menú que se arma en el navegador): no suma ni resta, porque restar sería
 * castigar al sitio por un límite nuestro. `ok` sigue viajando (=== estado 'ok')
 * porque hay páginas viejas en caché que solo miran ese campo. Una falla trae `tipo`:
 * 'entrada' si lo que se escribió no es un dominio revisable, 'sitio' si no pudimos leerlo.
 */

const TIMEOUT_MS = 8000;
// Presupuestos de espera. El reloj de 8 s es por cadena de redirecciones (ver `traer`), pero
// ahora una revisión puede hacer más de una cadena: la portada tal como la escribió la
// persona, su variante con o sin www, http:// y hasta dos enlaces de política. Sin un techo
// común eso sumaba 40 s en el peor caso. Con estos dos, el peor caso medido es de ~24 s:
// 16 para dar con la portada (el primer intento más una segunda ronda en paralelo) y 8
// para la política.
const PRESUPUESTO_PORTADA_MS = 2 * TIMEOUT_MS;
const PRESUPUESTO_POLITICA_MS = TIMEOUT_MS;
// Un intento con menos tiempo que esto casi seguro se corta a medias, y un corte a medias se
// informa como "no respondió a tiempo", que sería culpa nuestra y no del sitio.
const MIN_INTENTO_MS = 1500;
// Tope de lectura por recurso. Subió de 900 KB a 3 MB porque portadas de más de 1 MB son
// corrientes y con el tope viejo el chequeo se quedaba corto seguido.
//
// NO es el techo de memoria, aunque una versión de este comentario lo afirmaba. El cuerpo se
// decodifica trozo a trozo y se acumula como texto, así que el pico por recurso es la cadena
// resultante (UTF-16, hasta el doble de los bytes) más el trozo en curso. Se quitó el paso
// intermedio que juntaba todos los trozos en un solo Uint8Array antes de decodificar, que
// agregaba una copia entera de más.
const MAX_BYTES = 3_000_000;

// Con quién habla el sitio revisado, por si su dueño mira sus registros. Apunta al dominio
// definitivo: verificaycumple.pages.dev ahora redirige ahí (functions/_middleware.js).
const USER_AGENT = 'VerificaYCumple/1.0 (+https://verifica.spindlelab.cl/)';

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
// La portada que solo redirige con una etiqueta (ver `destinoDeMetaRefresh`) tiene su propio
// tope, más corto. No es estética: Cloudflare corta la invocación a las 50 subpeticiones, y el
// peor caso medido de una revisión completa ya suma 45 (la dirección escrita, su www, http://
// y dos políticas, todas con la cadena de saltos llena). Con 2 saltos, este paso agrega 3 como
// mucho y el total se queda en 48. Un meta refresh que además redirige más de dos veces es un
// sitio roto, no un caso que valga gastar el presupuesto de todos.
const MAX_SALTOS_REFRESCO = 2;

// Un host puede ser una dirección IP escrita en muchas notaciones, no solo en el 127.0.0.1
// de manual. El parser de URL resuelve 127.1, 0177.0.0.1, 0x7f.0.0.1 y 2130706433 a la
// misma dirección, y la regla con la que lo decide es corta: si la última etiqueta del host
// es un número (decimal, octal o hexadecimal), el host entero se lee como IPv4. Eso es lo
// que comprobamos acá, y de paso cubre los literales IPv6 ([::1]).
//
// Rechazamos TODAS las IP, públicas y privadas. Es más estricto que mirar rangos y bastante
// más difícil de equivocar — la versión anterior miraba rangos sobre un regex de cuatro
// grupos, así que las otras notaciones se le colaban enteras. Ningún sitio real se escribe
// con su IP, y ningún dominio real termina en una etiqueta numérica, porque ningún TLD lo es.
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
// fetch, y existe porque antes solo se validaba lo que escribía el visitante: el chequeo
// hacía después otras peticiones que nadie miraba — la de la política de privacidad, cuya
// URL la pone el sitio revisado y no nosotros, y la de cada redirección. Cualquier sitio
// podía apuntarnos a donde quisiera y usar el chequeo como sonda, con nuestro nombre en la
// petición.
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

  // El www YA NO se borra. Antes se quitaba siempre, y los sitios que solo viven en www (el
  // dominio pelado no tiene DNS, no conecta o se redirige a sí mismo sin fin) recibían "no
  // existe" o "bucle" aunque la persona hubiera escrito la dirección correcta. Ahora se
  // revisa lo que se escribió, y si esa variante no abre, `abrirPortada` prueba la otra.
  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').replace(/\/.*$/, '');
  if (s.includes('@')) return { error: 'Escribe un dominio, no un correo.' };

  const [host, puerto] = s.split(':');
  if (puerto && puerto !== '80' && puerto !== '443') {
    return { error: 'Escribe solo el dominio, sin el número que va después de los dos puntos.' };
  }
  if (!host || HOST_PROHIBIDO.test(host)) {
    return { error: 'Esa dirección apunta a una red interna, no a un sitio público, así que no hay nada que revisar.' };
  }
  if (esIpLiteral(host)) {
    return { error: 'Escribe un dominio, no una dirección IP.' };
  }
  if (llevaIpDentro(host)) {
    return { error: 'Esa dirección apunta a una red interna, no a un sitio público, así que no hay nada que revisar.' };
  }
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(host)) {
    return { error: 'Eso no parece un dominio. Escríbelo como tuempresa.cl, sin https:// ni barras.' };
  }
  return { dominio: host };
}

/* ------------------------------------------------------------------ *
 * Descarga acotada: timeout y tope de bytes.                          *
 * ------------------------------------------------------------------ */

// Sigue las redirecciones a mano, validando cada salto. Con `redirect: 'follow'` el runtime
// las seguía solo y nosotros nunca veíamos a dónde: bastaba que el sitio revisado redirigiera
// a otra parte para que el destino real nunca pasara por el validador. Acá cada salto vuelve
// a pasar por el mismo portón que la entrada del visitante.
//
// Siempre devuelve un objeto: una respuesta ({ status, url, texto, completo }) o una falla
// ({ falla }). Antes toda falla era un null, y el mensaje no podía distinguir "tu sitio no
// respondió a tiempo" de "no existe" ni de "nos mandó a una dirección que no seguimos".
//   falla 'tiempo'   se acabó el reloj (o el presupuesto) antes de tener respuesta
//   falla 'conexion' el fetch lanzó: DNS, conexión rechazada, TLS en Node
//   falla 'destino'  el portón rechazó un salto, o hubo un 3xx sin un Location usable
//   falla 'bucle'    se acabaron los saltos
//
// `plazo` es un instante absoluto (ms) que ningún intento puede pasar, y `abortoExterno`
// deja que `abrirPortada` corte un intento que ya no necesita.
async function traer(url, fetchImpl, plazo = Infinity, abortoExterno = null, maxSaltos = MAX_SALTOS) {
  // Un solo reloj para toda la cadena. Con un AbortController por salto, cinco saltos de
  // 8 s daban hasta 40 s de espera al visitante, que es justo lo que el timeout venía a
  // impedir. El presupuesto es de la petición completa, no de cada tramo.
  const ms = Math.min(TIMEOUT_MS, plazo - Date.now());
  if (!(ms >= MIN_INTENTO_MS)) return { falla: 'tiempo' };
  const ctrl = new AbortController();
  const reloj = setTimeout(() => ctrl.abort(), ms);
  const cortar = () => ctrl.abort();
  if (abortoExterno) abortoExterno.addEventListener('abort', cortar, { once: true });
  try {
  let actual = url;
  for (let salto = 0; salto <= maxSaltos; salto++) {
    if (!destinoPermitido(actual)) return { falla: 'destino' };
    const r = await pedirUna(actual, fetchImpl, ctrl.signal);
    if (!r) return { falla: ctrl.signal.aborted ? 'tiempo' : 'conexion' };
    if (r.sinDestino) return { falla: 'destino' };
    if (!r.redireccion) return r;
    actual = r.redireccion;
  }
  // Se acabaron los saltos. Antes esto salía como un status 508 inventado, y la portada lo
  // mostraba como "código de respuesta de tu sitio": un número que el sitio nunca mandó. Es
  // un veredicto nuestro, así que viaja como falla y el mensaje explica el bucle sin número.
  return { falla: 'bucle', url: actual };
  } finally {
    clearTimeout(reloj);
    if (abortoExterno) abortoExterno.removeEventListener('abort', cortar);
  }
}

async function pedirUna(url, fetchImpl, signal) {
  try {
    const r = await fetchImpl(url, {
      signal,
      redirect: 'manual',
      cf: { cacheTtl: 0, cacheEverything: false },
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,text/plain;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
    });

    // Una redirección no se puntúa: se devuelve el destino para que `traer` lo valide y la
    // siga. Si viene un 3xx sin un Location que podamos resolver, preferimos fallar a
    // inventar: se corta acá y el visitante recibe un aviso de que no pudimos seguir al
    // sitio, que es verdad, en vez de un informe armado sobre una página que nunca leímos.
    if (r.status >= 300 && r.status < 400) {
      const destino = r.headers.get('location');
      const siguiente = destino ? resolverUrl(destino, url) : null;
      return siguiente ? { redireccion: siguiente } : { sinDestino: true };
    }

    // Se lee por trozos y se corta la conexión al pasar el tope, en vez de `r.text()`, que
    // materializa el cuerpo entero antes de recortarlo: contra un servidor que responde
    // cientos de MB eso tumbaba el aislado.
    //
    // Y sobre todo: se devuelve `completo`, que dice si el HTML llegó entero. Antes esto no
    // se sabía, y un HTML cortado se puntuaba igual que uno completo. Una portada pesada
    // salía con señales en rojo que sí estaban puestas, solo que más abajo del corte.
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
      if (new TextEncoder().encode(crudo).length > MAX_BYTES) completo = false;
      else texto = crudo;
    }

    // La URL que devolvemos es la que pedimos nosotros, no `r.url`: ahora que seguimos las
    // redirecciones a mano, `actual` es la única que sabemos validada.
    return { status: r.status, url, texto, completo };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Dar con la portada: la dirección escrita, su variante con o sin www  *
 * y, al final, http://.                                               *
 * ------------------------------------------------------------------ */

// Fallas que justifican probar la otra variante del dominio. Son las que dicen "en esta
// dirección no hay un sitio que conteste", no "el sitio contestó y dijo algo": 530 es el
// Cloudflare del runtime avisando que el nombre no resuelve, 525/526 es TLS roto, y el bucle
// es el caso de centroodontologicomaipu.cl (el dominio pelado se redirige a sí mismo y el
// www responde bien). Un 403 o un 404, en cambio, es el sitio respondiendo: probar otra
// dirección daría un informe de algo que la persona no pidió.
const STATUS_SIN_SITIO = new Set([525, 526, 530]);
function sinSitioAca(r) {
  if (r.falla) return r.falla !== 'destino';
  return STATUS_SIN_SITIO.has(r.status);
}

// http:// solo se prueba cuando https no conectó o tiene el TLS roto, igual que antes: el
// sitio que MÁS necesita este chequeo, el que todavía anda en http o tiene el certificado
// vencido, era el único que nunca veía un informe. Comprobado contra expired.badssl.com y
// self-signed.badssl.com, que en el runtime devuelven 526 en vez de lanzar. Con cualquier
// otro status el sitio SÍ sirve por https, y reintentar por http daría un informe que dice
// lo contrario. Tampoco tras un bucle ni un 530: http:// no arregla ninguno de los dos.
function valeHttp(r) {
  return r.falla === 'tiempo' || r.falla === 'conexion' || r.status === 525 || r.status === 526;
}

async function abrirPortada(dominio, fetchImpl, plazo) {
  const primero = await traer(`https://${dominio}/`, fetchImpl, plazo);
  if (!sinSitioAca(primero)) return { home: primero, via: null };

  // La otra variante: con www si la persona no lo escribió, sin www si lo escribió. Pasa por
  // normalizarDominio para no inventar un host inválido ("www.cl" daría "cl"), y la petición
  // sale por `traer`, o sea por el mismo portón que todo lo demás: no hay atajo.
  const otro = dominio.startsWith('www.') ? dominio.slice(4) : `www.${dominio}`;
  const otroValido = normalizarDominio(otro).dominio === otro;

  // La variante y http:// van en paralelo, no en fila. En fila, un dominio que no contesta
  // sumaba 8 s por intento (24 s solo para rendirse); en paralelo la segunda ronda cuesta lo
  // mismo que un intento. La preferencia se mantiene al elegir: primero la variante por
  // https, después http://. Si la variante resuelve, http:// se corta en el acto.
  const corte = new AbortController();
  const pOtro = otroValido ? traer(`https://${otro}/`, fetchImpl, plazo, corte.signal) : null;
  const pHttp = valeHttp(primero) ? traer(`http://${dominio}/`, fetchImpl, plazo, corte.signal) : null;
  try {
    if (pOtro) {
      const r = await pOtro;
      if (!sinSitioAca(r)) return { home: r, via: { tipo: 'variante', otro, motivo: primero } };
    }
    if (pHttp) {
      const r = await pHttp;
      // Cualquier respuesta real de http:// sirve, igual que antes: si redirige a un https
      // roto, el 526 que vuelve es el que corresponde contar.
      if (!r.falla) return { home: r, via: { tipo: 'http', motivo: primero } };
    }
  } finally {
    corte.abort();
  }
  return { home: primero, via: null };
}

/* ------------------------------------------------------------------ *
 * Señales sobre el HTML crudo. Sin DOM en este runtime, solo          *
 * necesitamos presencia/ausencia, no parsear el árbol.                 *
 *                                                                    *
 * Todo lo que recorre etiquetas lo hace en tiempo lineal, con indexOf  *
 * y regex sin cuantificadores anidados. Este endpoint es público y sin *
 * autenticar, y el HTML lo escribe el sitio revisado: medido el 23-sep, *
 * la regex vieja del enlace a la política tardaba 24 s de CPU con      *
 * 24 KB de '<a href="x" ' repetido, y la del lang y la de la casilla   *
 * crecían al cuadrado (240 y 380 ms con 50 KB, minutos con 3 MB).      *
 * ------------------------------------------------------------------ */

// Recorre las etiquetas de apertura `<nombre ...>` en orden. Devuelve [inicio, fin] con `fin`
// en el '>' de cierre. La búsqueda siguiente arranca DESPUÉS de ese '>', así que un
// '<a <a <a ...>' sin cerrar se lee una sola vez y no una vez por cada '<a' de adentro. Si
// no queda ningún '>', se termina: ninguna etiqueta posterior podría cerrar.
//
// Con un tramo (`desde`, `hasta`) se recorre una copia de ese tramo y no el documento: una
// regex global que busca el próximo '<input' sigue de largo más allá del formulario, y con
// mil formularios vacíos y un solo '<input' al final cada formulario recorría el resto del
// documento. Los tramos de formularios distintos no se pisan, así que las copias suman lo
// mismo que el documento.
function* etiquetas(html, nombre, desde = 0, hasta = html.length) {
  const texto = desde === 0 && hasta === html.length ? html : html.slice(desde, hasta);
  const re = new RegExp(`<${nombre}[\\s>/]`, 'gi');
  let m;
  while ((m = re.exec(texto))) {
    const fin = texto.indexOf('>', m.index + 1);
    if (fin === -1) return;
    yield [desde + m.index, desde + fin];
    re.lastIndex = fin + 1;
  }
}

// Texto de un atributo de una etiqueta, o null. La etiqueta ya viene acotada. Las regex se
// arman una vez por nombre: una portada puede traer decenas de miles de enlaces.
const RE_ATRIBUTO = {};
function atributo(tag, nombre) {
  const re = (RE_ATRIBUTO[nombre] ||= new RegExp(`\\s${nombre}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  const m = re.exec(tag);
  return m ? (m[1] ?? m[2] ?? m[3]) : null;
}

const MAX_ETIQUETA = 4000;
const MAX_INTERIOR = 4000;
// Una portada real tiene uno o dos enlaces a su política, a veces repetidos en tres menús. Más
// de 50 candidatos solo aparecen en un HTML armado para gastarnos CPU (cada uno cuesta armar
// una URL), así que ahí se deja de juntar.
const MAX_CANDIDATOS = 50;

// Lo que se lee de verdad en un enlace: minúsculas, sin tildes, sin etiquetas, con las
// entidades más comunes decodificadas y los espacios juntos. "Pol&iacute;tica de
// Privacidad" y "POLÍTICA DE PRIVACIDAD" quedan iguales.
const ENTIDADES = { aacute: 'a', eacute: 'e', iacute: 'i', oacute: 'o', uacute: 'u', ntilde: 'n', nbsp: ' ', amp: '&' };
function textoPlano(s) {
  return s
    .replace(/<[^<>]*>/g, ' ')
    .replace(/&(?:#(\d{1,6})|#x([0-9a-f]{1,6})|([a-z]{2,8}));/gi, (_, d, h, n) => {
      if (d || h) {
        const cp = parseInt(d || h, d ? 10 : 16);
        return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ' ';
      }
      return ENTIDADES[n.toLowerCase()] ?? ' ';
    })
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Qué dice un texto (el del enlace, o la ruta de su href ya pasada a palabras):
//   2 = habla de privacidad ("Política de privacidad", /privacy-policy/)
//   1 = otro nombre de política ("Aviso legal", "Política de tratamiento de datos")
//   0 = nada
// "Protección de datos" SOLO no cuenta: es el nombre del área de práctica de cualquier
// estudio de abogados y el título de cualquier post sobre la ley. Así salía araya.cl en
// verde por /areas-de-practica/proteccion-de-datos-personales-2/, una página donde venden
// la asesoría. Y un texto largo sin un rótulo de política tampoco cuenta: "Nueva ley de
// privacidad en Chile" es un post, no la política del sitio.
const RE_PRIVACIDAD = /privac(?:idad|y)/;
const RE_ROTULO = /\b(?:politicas?|policy|aviso|notice|declaracion|directiva|terminos|legal|statement)\b/;
const RE_OTRA_POLITICA = /\baviso legal\b|\btratamiento de (?:los )?datos\b|\bpoliticas?(?: [a-z]+){0,4} datos\b/;
const RE_TIENE_POLITICA = /\b(?:politicas?|aviso)\b/;
function clasificar(texto, maxPalabras) {
  if (!texto) return 0;
  const corto = texto.split(' ').length <= maxPalabras;
  if (RE_PRIVACIDAD.test(texto) && (corto || RE_ROTULO.test(texto))) return 2;
  if (RE_OTRA_POLITICA.test(texto) && (corto || RE_TIENE_POLITICA.test(texto))) return 1;
  return 0;
}

// Rutas donde vive contenido que HABLA de privacidad sin ser la política: áreas de práctica,
// servicios, blog, noticias, archivos por etiqueta o categoría, productos (una "lámina de
// privacidad" para el celular es un producto, no una política) y todo lo fechado (/2024/...).
// Lo fechado bajo /uploads/ se salva: es donde WordPress guarda un PDF de política.
const RE_RUTA_CONTENIDO =
  /\/(?:areas?(?:-de-practicas?)?|practice-areas?|servicios?|services?|blogs?|noticias?|news|novedades|prensa|articulos?|articles?|posts?|tags?|etiquetas?|category|categories|categorias?|productos?|products?|tienda|shop)(?:\/|$)/;
const RE_RUTA_FECHADA = /\/(?:19|20)\d{2}\//;

// Políticas de plataformas ajenas que aparecen en cualquier portada: el aviso de reCAPTCHA
// enlaza la política de Google, los botones sociales la de Meta. Son políticas de privacidad
// reales, pero no la del sitio revisado.
//
// Se mira etiqueta por etiqueta y no con una regex. La versión anterior era
// `(?:^|\.)(?:google|…)\.[a-z.]+$`, y ese `[a-z.]+$` vuelve atrás: con un host de 3.889
// caracteres ('google.' repetido y una última etiqueta que termina en guion) cada punto
// recorría el resto del host. Medido el 23-sep: 763 ms de CPU en una portada de 2,7 MB con
// 707 enlaces así, contra 6 ms de una portada normal del mismo tamaño. El host sale de un
// href que escribe el sitio revisado, así que es entrada hostil como cualquier otra.
const PLATAFORMAS = new Set(['google', 'youtube', 'facebook', 'instagram', 'whatsapp', 'meta',
  'twitter', 'x', 'linkedin', 'tiktok', 'apple', 'microsoft', 'wix', 'wordpress', 'shopify',
  'hubspot', 'cloudflare']);
const RE_SOLO_LETRAS = /^[a-z]*$/;

function esDePlataforma(host) {
  const p = host.split('.');
  // Desde la derecha, hasta dónde el host es solo letras: es el equivalente del `[a-z.]+$`
  // de antes, en una sola pasada. La marca tiene que quedar dentro de ese tramo y tener al
  // menos una etiqueta después (policies.google.com sí, google sola no).
  let desde = p.length;
  while (desde > 0 && RE_SOLO_LETRAS.test(p[desde - 1])) desde--;
  for (let i = desde; i < p.length - 1; i++) if (PLATAFORMAS.has(p[i])) return true;
  return false;
}

function mismoSitio(a, b) {
  const x = a.replace(/^www\./, '');
  const y = b.replace(/^www\./, '');
  return x === y || x.endsWith('.' + y) || y.endsWith('.' + x);
}

// Todos los enlaces que parecen la política, del más fuerte al más débil y sin repetidos (el
// menú de escritorio y el de celular suelen repetir el mismo). Se lee cada <a> entero, sin el
// tope de 120 caracteres de la versión anterior: en abogadospyme.cl el HTML de adentro del
// enlace medía 232 y 591 caracteres (los spans del tema), la regex lo descartaba entero y el
// sitio salía sin política teniendo una en el menú.
//
// El interior de un enlace termina en su </a>, en el siguiente <a (dos enlaces no se anidan,
// el navegador cierra el primero) o a los MAX_INTERIOR caracteres. Con eso los tramos leídos
// nunca se pisan y el costo total es lineal. El próximo </a> se busca una vez y se guarda
// mientras siga por delante, para no volver a recorrer lo mismo con cada enlace.
export function buscarEnlacesPolitica(html, base) {
  let baseUrl;
  try { baseUrl = new URL(base); } catch { return []; }
  const candidatos = new Map();
  const reCierre = /<\/a\s*>/gi;
  let cierre = -2;
  let orden = 0;
  const iter = etiquetas(html, 'a');
  let actual = iter.next();
  while (!actual.done) {
    const [inicio, finTag] = actual.value;
    const siguiente = iter.next();
    const limite = siguiente.done ? html.length : siguiente.value[0];
    if (cierre !== -1 && cierre <= finTag) {
      reCierre.lastIndex = finTag + 1;
      const c = reCierre.exec(html);
      cierre = c ? c.index : -1;
    }
    let finInterior = Math.min(limite, finTag + 1 + MAX_INTERIOR);
    if (cierre !== -1 && cierre < finInterior) finInterior = cierre;

    const tag = html.slice(inicio, Math.min(finTag + 1, inicio + MAX_ETIQUETA));
    const candidato = evaluarEnlace(tag, html.slice(finTag + 1, finInterior), baseUrl, orden++);
    if (candidato && !candidatos.has(candidato.url)) {
      candidatos.set(candidato.url, candidato);
      if (candidatos.size >= MAX_CANDIDATOS) break;
    }
    actual = siguiente;
  }
  return [...candidatos.values()].sort(
    (a, b) => b.mismo - a.mismo || b.fuerza - a.fuerza || a.orden - b.orden
  );
}

// Filtro barato antes de lo caro (armar la URL, pasar el texto a palabras): un enlace que no
// menciona nada parecido a una política en su etiqueta ni en su interior no puede calzar con
// ninguna de las reglas de `clasificar`. Deja pasar tildes escritas como entidad (pol&iacute;)
// o en la dirección (pol%C3%ADtica).
const RE_QUIZAS_POLITICA = /priva|aviso|datos|legal|polic|pol(?:i|í|&|%)/i;

function evaluarEnlace(tag, interior, baseUrl, orden) {
  if (!RE_QUIZAS_POLITICA.test(tag) && !RE_QUIZAS_POLITICA.test(interior)) return null;
  let href = atributo(tag, 'href');
  if (!href) return null;
  href = href.replace(/&amp;/gi, '&').split('#')[0].trim();
  if (!href || /^(?:mailto|tel|javascript|data):/i.test(href)) return null;
  let u;
  try { u = new URL(href, baseUrl); } catch { return null; }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  u.hash = '';
  const url = u.toString();
  if (url === baseUrl.toString()) return null;

  let ruta;
  try { ruta = decodeURIComponent(u.pathname); } catch { ruta = u.pathname; }
  ruta = ruta.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (RE_RUTA_CONTENIDO.test(ruta)) return null;
  if (RE_RUTA_FECHADA.test(ruta) && !ruta.includes('/uploads/')) return null;

  const host = u.hostname.toLowerCase();
  const mismo = mismoSitio(host, baseUrl.hostname.toLowerCase()) ? 1 : 0;
  if (!mismo && esDePlataforma(host)) return null;

  // La ruta se juzga por su último tramo: /legal/privacidad/ es "privacidad", y un slug de
  // post largo no se vuelve política porque cuelgue de /nosotros/.
  const tramos = ruta.split('/').filter(Boolean);
  const claseHref = clasificar(textoPlano(tramos[tramos.length - 1] || ''), 5);
  const visible = [interior, atributo(tag, 'aria-label') || '', atributo(tag, 'title') || ''].join(' ');
  const claseTexto = clasificar(textoPlano(visible), 8);
  if (!claseHref && !claseTexto) return null;
  // El href pesa más que el texto: "privacidad" en la dirección es la señal más difícil de
  // conseguir por accidente.
  return { url, mismo, fuerza: claseHref * 3 + claseTexto, orden };
}

function resolverUrl(href, base) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Lo que responde 200 sin ser una portada que podamos leer: páginas   *
 * de bloqueo y sitios que se arman con JavaScript. Mismo cuidado de   *
 * tiempo lineal que todo lo de arriba.                                *
 * ------------------------------------------------------------------ */

// Los tramos de texto de un HTML: lo que queda entre etiquetas, sin el interior de <script>,
// <style> ni de los comentarios. Siempre avanza: cada búsqueda (indexOf, o la regex del cierre
// que corresponde) arranca donde terminó la anterior, así que cada carácter se mira una vez.
// Un <script> o un comentario sin cerrar termina la lectura, porque todo lo que sigue es parte
// de él, y reintentar desde el próximo '<' volvería a recorrer lo mismo.
function* tramosDeTexto(html) {
  const cierres = { script: /<\/script\s*>/gi, style: /<\/style\s*>/gi };
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { yield [i, html.length]; return; }
    if (lt > i) yield [i, lt];
    if (html.startsWith('<!--', lt)) {
      const fin = html.indexOf('-->', lt + 4);
      if (fin === -1) return;
      i = fin + 3;
      continue;
    }
    // Antes de armar un pedazo y pasarle una regex, se mira la letra que sigue al '<': casi
    // ninguna etiqueta empieza con s, y una portada puede traer cientos de miles.
    const crudo = (html.charCodeAt(lt + 1) | 32) === 115 && /^<(script|style)[\s>]/i.exec(html.slice(lt, lt + 8));
    if (crudo) {
      const re = cierres[crudo[1].toLowerCase()];
      re.lastIndex = lt;
      if (!re.exec(html)) return;
      i = re.lastIndex;
      continue;
    }
    const gt = html.indexOf('>', lt + 1);
    if (gt === -1) return;
    i = gt + 1;
  }
}

// Cuántos caracteres visibles (sin contar espacios) trae el HTML, contando solo hasta `tope`:
// para saber si una página "casi no tiene texto" no hace falta recorrerla entera.
function letrasVisibles(html, tope) {
  let n = 0;
  for (const [a, b] of tramosDeTexto(html)) {
    for (let k = a; k < b; k++) if (html.charCodeAt(k) > 32 && ++n >= tope) return n;
  }
  return n;
}

// Una página de bloqueo que llega con 200. Medido el 23-sep: a nuestro lector, www.bancoestado.cl
// le responde 650 bytes sin <html>, <head>, <body> ni <title>, que dicen "se ha restringido este
// acceso". El chequeo lo puntuaba con 60/100, con "no encontramos tu política" y el botón del
// kit: el mismo informe inventado que la guardia del HTML vacío viene a evitar, solo que con
// texto adentro. Dos formas de reconocerla, las dos estrechas a propósito, para no tragarse una
// portada chica de verdad:
//   - pesa menos de 3 KB y no trae ninguna pieza del esqueleto de una página. Una portada real,
//     por mínima que sea, trae al menos su <title>.
//   - su texto visible es corto, habla de bloqueo o de acceso denegado, y casi no tiene
//     enlaces. Una portada que menciona su reCAPTCHA tiene además menú, pie y bastante más
//     texto. Por eso el patrón solo se busca en páginas livianas y sobre el texto visible: en
//     los scripts, "captcha" aparece en cualquier formulario.
//
// Las palabras sueltas 'captcha', 'not a robot' y 'no eres un robot' salieron de la lista el
// 23-sep. El pie estándar "Este sitio está protegido por reCAPTCHA y se aplican la Política de
// privacidad y las Condiciones del servicio de Google" trae exactamente dos enlaces, así que
// una landing chica de una sola página (formulario, un h1 y ese pie) calzaba entera con la
// regla 2 y recibía "tu sitio no nos entregó HTML", que además de falso le niega el informe
// justo al cliente que buscamos. Quedan solo frases de aviso, que nadie escribe sin querer:
// una página de desafío dice "verify you are human" o "we need to verify that you're not a
// robot", no "protegido por reCAPTCHA". No se exige además "sin <form>" porque la página de
// desafío de Cloudflare sí trae uno, y dejaríamos de reconocerla.
const MAX_BLOQUEO_SIN_ESQUELETO = 3000;
// Los dos topes de la regla 2 son los MISMOS en los dos chequeos, y desde el 23-sep son el más
// estricto de cada lado: 16.000 caracteres de HTML (acá había 50.000) y 2 enlaces o menos (el
// gemelo tenía 3). Mientras más ancha la puerta, más fácil es que una landing chica y real
// reciba el mensaje del firewall, que además de falso le niega el informe justo al cliente que
// buscamos. Un aviso de bloqueo de verdad es una página mínima: el de www.bancoestado.cl pesa
// 650 bytes y los de Cloudflare, Akamai e Imperva no llegan a 4 KB.
const MAX_BLOQUEO_CON_TEXTO = 16_000;
const MAX_ENLACES_BLOQUEO = 2;
const MAX_TEXTO_BLOQUEO = 1500;
const RE_ESQUELETO = /<(?:html|head|body|title)[\s>]/i;
// Sobre el texto ya pasado por `textoPlano`: minúsculas, sin tildes, solo letras y números.
//
// GEMELA de la lista de spindlelab-astro/functions/api/chequeo.js (RE_TEXTO_BLOQUEO). Las dos
// son la MISMA lista literal, alternativa por alternativa, y así tienen que quedar: si una
// cambia, la otra va detrás en el mismo cambio. Se alinearon el 23-sep, después de medir que
// discrepaban en 6 de 11 avisos (repro-bloqueo-gemelos.mjs).
//
// Todas son frases enteras. Las raíces sueltas que vivían acá (`restringid`, `bloquead`,
// `forbidden`) y el patrón flojo `verify (?:that )?you` se fueron el 23-sep porque se comían
// landings reales: "Verifica que eres mayor de 18 años para entrar" (puerta de edad de una
// viña), "Please verify you are of legal drinking age", "El acceso a la sala está restringido
// a socios" y "Zona restringida solo para residentes" caían las cuatro, y a esos negocios
// chicos se les negaba el informe con un mensaje falso sobre un firewall que no existe.
// Nadie escribe "verifica que eres humano" ni "pardon our interruption" en la portada de su
// negocio sin querer; "restringido", solo, lo escribe cualquiera.
const RE_TEXTO_BLOQUEO = new RegExp([
  'se ha restringido', 'acceso (restringido|denegado|bloqueado)', 'ha sido bloquead',
  'no cumple con nuestra politica de seguridad',
  'access (denied|blocked|restricted)', 'has been (denied|blocked)', 'you have been blocked',
  'request (was )?(rejected|blocked|unsuccessful)', 'requested url was rejected',
  'incapsula incident', 'pardon our interruption',
  'checking (your browser|if the site connection is secure)', 'enable javascript and cookies to continue',
  'verify (that )?you.{0,9}re (not )?(a )?(human|robot)', 'verifica(r)? que eres (un )?humano', '403 forbidden',
  'attention required', 'unusual traffic', 'trafico inusual', 'are you a (human|robot)',
  'demuestra que (no )?eres', 'comprobacion de seguridad', 'security check',
].join('|'));

export function esPaginaDeBloqueo(html) {
  if (html.length <= MAX_BLOQUEO_SIN_ESQUELETO && !RE_ESQUELETO.test(html)) return true;
  if (html.length > MAX_BLOQUEO_CON_TEXTO) return false;
  const partes = [];
  for (const [a, b] of tramosDeTexto(html)) partes.push(html.slice(a, b));
  const texto = textoPlano(partes.join(' '));
  if (texto.length > MAX_TEXTO_BLOQUEO || !RE_TEXTO_BLOQUEO.test(texto)) return false;
  let enlaces = 0;
  for (const [inicio, fin] of etiquetas(html, 'a')) {
    const tag = html.slice(inicio, Math.min(fin + 1, inicio + MAX_ETIQUETA));
    if (/\shref\s*=/i.test(tag) && ++enlaces > MAX_ENLACES_BLOQUEO) return false;
  }
  return true;
}

// Una portada que no es una portada: solo manda a otra dirección con
// <meta http-equiv="refresh" content="0; url=…">. Es corriente en hosting compartido (un
// index.html que lleva a /es/ o a /wordpress/). Antes se puntuaba como si fuera la página,
// con un informe falso; después pasó a caer en la guardia del HTML ilegible y el mensaje
// culpaba a un firewall que no existe. Ahora se sigue una vez, por `traer`, o sea por el
// mismo portón y con el mismo presupuesto que la portada.
//
// Solo con `url=` y con una espera corta: un `content="600"` sin dirección es una página que
// se recarga sola, no una redirección, y seguirlo sería inventarse un destino.
const MAX_REFRESCO_S = 10;
export function destinoDeMetaRefresh(html, base) {
  for (const [inicio, fin] of etiquetas(html, 'meta')) {
    const tag = html.slice(inicio, Math.min(fin + 1, inicio + MAX_ETIQUETA));
    if (!/\shttp-equiv\s*=\s*["']?refresh[\s"'>]/i.test(tag)) continue;
    const contenido = atributo(tag, 'content');
    if (!contenido) continue;
    const m = /^\s*(\d{1,4})\s*[;,]\s*url\s*=\s*["']?([^"'\s]{1,2000})/i.exec(contenido);
    if (!m || Number(m[1]) > MAX_REFRESCO_S) continue;
    const u = resolverUrl(m[2], base);
    if (u && u !== base) return u;
  }
  return null;
}

// Un sitio que se arma con JavaScript: Next.js, Angular, Nuxt, o una raíz vacía (id="root" o
// id="app") con casi nada de texto, que es lo que deja una app de React o Vue sin prerender. En
// esos sitios el menú y el pie se dibujan en el navegador, así que "no vimos el enlace a tu
// política" no dice nada: el enlace puede estar y este chequeo, que no ejecuta JavaScript, no
// alcanzarlo.
//
// La marca del framework NO basta por sí sola. Next, Nuxt y Angular Universal ponen
// __NEXT_DATA__, __nuxt y ng-version también cuando la página viene renderizada en el
// servidor, y ahí el menú y el pie SÍ están en el HTML: decir "no lo pudimos ver" sería
// falso, taparía una política que de verdad falta y, peor, abriría la búsqueda en los datos
// del menú, que puede terminar en verde sin que ningún enlace exista. Por eso la marca pasa
// por la misma guarda que ya tenía la raíz vacía: casi nada de texto, o casi ningún enlace
// que lleve a otra página.
//
// Y al revés: una portada SIN marca pero sin ningún enlace navegable (entel.cl tiene cuatro
// <a>, los cuatro con href="#") tampoco se puede leer desde afuera. Ahí solo decimos que no
// pudimos ver el menú; la dirección que pueda venir en los datos no se usa, porque sin marca
// de framework un JSON suelto no es un menú.
const RE_MARCA_SPA = /__NEXT_DATA__|self\.__next_f|\sng-version\s*=|<app-root[\s>]|__nuxt/i;
const RE_RAIZ_JS = /\sid\s*=\s*["']?(?:root|app)["'\s>]/i;
const MIN_LETRAS_PORTADA = 200;
// Tres o menos enlaces navegables es un menú que no está: una portada de verdad, por chica que
// sea, enlaza al menos su inicio, su contacto y algo más.
const MAX_ENLACES_SPA = 3;

// Enlaces que llevan a otra página. Un href="#", un javascript:, un mailto: o un tel: no
// navegan: son justo los que deja un menú que se arma después en el navegador. Se cuenta
// hasta `tope` y se corta, así que una portada normal se resuelve en las primeras etiquetas.
function enlacesNavegables(html, tope) {
  let n = 0;
  for (const [inicio, fin] of etiquetas(html, 'a')) {
    const tag = html.slice(inicio, Math.min(fin + 1, inicio + MAX_ETIQUETA));
    const href = (atributo(tag, 'href') || '').trim();
    if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript):/i.test(href)) continue;
    if (++n >= tope) return n;
  }
  return n;
}

// null, 'marca' (trae la marca de un framework y el HTML no muestra el menú) o 'sin-enlaces'
// (ningún enlace que lleve a otra página). Solo 'marca' habilita buscar la política en los
// datos del menú.
export function comoSeArma(html) {
  const enlaces = enlacesNavegables(html, MAX_ENLACES_SPA + 1);
  if (RE_MARCA_SPA.test(html) || RE_RAIZ_JS.test(html)) {
    const sinTexto = letrasVisibles(html, MIN_LETRAS_PORTADA) < MIN_LETRAS_PORTADA;
    return sinTexto || enlaces <= MAX_ENLACES_SPA ? 'marca' : null;
  }
  return enlaces === 0 ? 'sin-enlaces' : null;
}

export function armadoConJavaScript(html) {
  return comoSeArma(html) !== null;
}

// En esos mismos sitios el menú viaja como datos: en el estado de Angular o en los props de
// Next aparece "title":"Política de Privacidad","url":"/…/politica-de-privacidad" sin ningún
// <a> hacia ella. Solo se mira cuando la portada trae marca de framework Y el menú no está en
// el HTML (ver `comoSeArma`): en www.clinicasantamaria.cl, que renderiza en el servidor, sus
// 42 enlaces sí están y ninguno es la política, así que ahí el dato no vale como enlace y el
// ítem queda pendiente, que es lo que se ve en el navegador. Si no hay ningún enlace, se leen los pares
// "url"/"href"/"link"/"path" de esos datos. La comilla puede venir escapada (\" dentro de un
// string de JavaScript, &quot; dentro de un atributo, &q; en el estado de Angular viejo) y la
// barra también (\/ en el JSON de PHP, \u002F en el de Nuxt).
//
// Solo se juzga la dirección, con las mismas reglas que el href de un enlace (último tramo,
// rutas de contenido y fechadas fuera), y solo del mismo sitio: en esos datos hay de todo,
// incluidas las políticas de Google o Meta. Después cada candidato pasa por `traer`, o sea por
// el mismo portón que todo lo demás.
//
// Tiempo lineal: la regex solo arranca en una comilla, el valor se corta a los 300 caracteres o
// en la primera comilla, y ninguna parte del patrón puede volver atrás. Se deja de juntar a los
// MAX_CANDIDATOS, igual que con los enlaces.
const RE_URL_EN_DATOS =
  /(?:\\?"|&quot;|&q;)(?:url|href|link|path)(?:\\?"|&quot;|&q;)\s*:\s*(?:\\?"|&quot;|&q;)((?:[^"\\&<>\s]|\\\/|\\u002[fF]){1,300})/gi;

export function buscarPoliticaEnDatos(html, base) {
  let baseUrl;
  try { baseUrl = new URL(base); } catch { return []; }
  const candidatos = new Map();
  const re = new RegExp(RE_URL_EN_DATOS.source, RE_URL_EN_DATOS.flags);
  let orden = 0;
  let m;
  while ((m = re.exec(html))) {
    const valor = m[1].replace(/\\\/|\\u002[fF]/g, '/');
    // Solo rutas absolutas o URLs: un "politica-de-privacidad" suelto es un slug, y no sabemos
    // de qué carpeta cuelga.
    if (!/^(?:\/|https?:)/i.test(valor)) continue;
    // `valor` no puede traer comillas (el patrón las excluye), así que armar la etiqueta es seguro.
    const c = evaluarEnlace(` href="${valor}"`, '', baseUrl, orden++);
    if (!c || !c.mismo || candidatos.has(c.url)) continue;
    candidatos.set(c.url, c);
    if (candidatos.size >= MAX_CANDIDATOS) break;
  }
  return [...candidatos.values()].sort((a, b) => b.fuerza - a.fuerza || a.orden - b.orden);
}

// Gestores de consentimiento (CMP) conocidos, reconocidos por lo que los hace funcionar: el
// script que carga el banner, o el contenedor del banner en el HTML. Nunca por una mención
// suelta ni por un resto.
//
// Las rutas de plugin llevan `[^"'\s]{0,160}` y no `[^"'\s]*`: esa clase incluye la barra, así
// que con `*` una portada de '/plugins/cookie-law-info/' repetido hacía que cada inicio
// recorriera todo lo que quedaba. Medido el 23-sep con la portada entera: 56 ms a 50 KB,
// 213 a 100 KB, 847 a 200 KB y 4,6 minutos con 2,8 MB, que en Pages muere por límite de CPU.
// El endpoint es público y el HTML lo escribe el sitio revisado, así que el tope no es un
// detalle de estilo. 160 caracteres sobran para la ruta más larga que usa un plugin de verdad
// (…/plugins/cookie-law-info/lite/frontend/js/script.min.js mide 45).
//
// El caso que motivó la lista: ceoclinicadental.cl salía con "Detectamos
// Complianz" por una hoja de estilo que dejó el plugin (cmplz-general-css), sin banner, y
// con Analytics y Google Ads cargando al entrar. Por eso Cookiebot ya no se detecta por la
// palabra, OneTrust no por el nombre de su cookie (OptanonConsent aparece en cualquier
// texto que hable de ella) e iubenda no por su CDN (cdn.iubenda.com/iubenda.js es el botón
// que muestra la política, no el banner).
const CMPS = [
  [/consent\.cookiebot\.(?:com|eu)\/|\sdata-cbid\s*=/i, 'Cookiebot'],
  [/cdn\.cookielaw\.org\/(?:scripttemplates|consent)\/|optanon\.blob\.core\.windows\.net\/|cookie-cdn\.cookiepro\.com\//i, 'OneTrust'],
  [/cmp\.osano\.com\//i, 'Osano'],
  [/cdn\.iubenda\.com\/cs\/|cs\.iubenda\.com\/autoblocking\/|embeds\.iubenda\.com\/widgets\//i, 'iubenda'],
  [/cdn-cookieyes\.com\/client_data\/|\/plugins\/cookie-law-info\/[^"'\s]{0,160}\.js/i, 'CookieYes'],
  [/static\.axept\.io\/sdk/i, 'Axeptio'],
  [/cmplz-cookiebanner|cmplz_banner|\/complianz[\w.-]*\.js/i, 'Complianz'],
  [/\bklaro(?:-no-css|-no-translations)?(?:\.min)?\.js|cdn\.kiprotect\.com\/klaro\//i, 'Klaro'],
  [/tarteaucitron(?:\.min)?\.js|tarteaucitron\.init\s*\(/i, 'tarteaucitron'],
  [/consent\.cookiefirst\.com\//i, 'CookieFirst'],
  [/cdn\.cookie-script\.com\/s\//i, 'CookieScript'],
  [/(?:app|web\.cmp)\.usercentrics\.eu\//i, 'Usercentrics'],
  [/sdk\.privacy-center\.org\//i, 'Didomi'],
  [/cookiehub\.(?:eu|net)\/c2\//i, 'CookieHub'],
  [/app\.termly\.io\/(?:resource-blocker|embed)/i, 'Termly'],
  // Los plugins de WordPress, por el script que encolan: un plugin solo instalado deja su
  // CSS, pero el JS del banner aparece cuando el banner está activo.
  [/\/plugins\/cookieadmin(?:-pro)?\/[^"'\s]{0,160}\.js/i, 'CookieAdmin'],
  [/\/plugins\/real-cookie-banner(?:-pro)?\/[^"'\s]{0,160}\.js/i, 'Real Cookie Banner'],
  [/\/plugins\/borlabs-cookie\/[^"'\s]{0,160}\.js/i, 'Borlabs Cookie'],
  [/\/plugins\/gdpr-cookie-compliance\/[^"'\s]{0,160}\.js/i, 'GDPR Cookie Compliance'],
  [/\/plugins\/cookie-notice\/[^"'\s]{0,160}\.js/i, 'Cookie Notice'],
];

export function detectarCmp(html) {
  for (const [re, nombre] of CMPS) if (re.test(html)) return nombre;
  return null;
}

// gtag/js sirve a tres productos distintos de Google y el parámetro `id` dice a cuál: G- es
// Analytics 4, AW- es Google Ads y DC- es Campaign Manager. Informar todo como "Google
// Analytics (GA4)" era decirle a abogadospyme.cl que tiene Analytics cuando lo que carga es
// el remarketing de Google Ads (id=AW-733918915), o sea nombrarle mal la herramienta que
// tiene que revisar. Lo que no reconocemos se describe, sin inventar cuál es: "Google (gtag)"
// no le dice nada a nadie que no programe, y era lo que leía el dueño de la clínica. El
// reemplazo tampoco servía: "un servicio de Google sin identificar", en una lista de nombres
// propios, se lee como si el chequeo se hubiera roto. Ahora nombra lo que es y admite el
// límite en la misma frase.
//
// Un nombre por proveedor, el mismo en todo el informe y en la portada: "Google Analytics"
// (sin el "(GA4)", que no le dice nada a este lector), "el Pixel de Meta" y "Clarity".
const NOMBRE_GTAG_SIN_ID = 'una etiqueta de Google que no alcanzamos a identificar cuál es';
function nombreDeGtag(texto) {
  const m = /[?&]id=([a-z0-9_-]{1,30})/i.exec(texto);
  if (!m) return NOMBRE_GTAG_SIN_ID;
  if (/^(?:aw|dc)-/i.test(m[1])) return 'Google Ads';
  if (/^g-/i.test(m[1])) return 'Google Analytics';
  return NOMBRE_GTAG_SIN_ID;
}

// Proveedores externos que procesan datos personales — solo se informa que están, no si
// disparan antes o después del consentimiento (eso requiere navegador real, brief §4-C).
// El segundo elemento es el nombre, o una función que lo saca del texto que calzó.
// `connect.facebook.net/…/fbevents.js` lleva el mismo tope de corrida que las rutas de plugin,
// y por el mismo motivo: sin él, 200 KB de 'connect.facebook.net/' repetido costaban 962 ms
// (esta venía así desde antes; medida el 23-sep junto con las de CMPS).
const PROVEEDORES = [
  [/googletagmanager\.com\/gtag\/js[^"'\s]{0,200}/i, nombreDeGtag],
  [/googletagmanager\.com\/gtm\.js/i, 'Google Tag Manager'],
  [/connect\.facebook\.net\/[^"'\s]{0,160}\/fbevents\.js|fbq\(\s*['"]init['"]/i, 'el Pixel de Meta'],
  [/static\.hotjar\.com/i, 'Hotjar'],
  [/clarity\.ms\/tag/i, 'Clarity'],
];

// Cuántas apariciones de un mismo proveedor se miran. Con una basta para saber que está; las
// demás solo sirven para ver si ALGUNA viene fuera de un script retenido, y 40 son de sobra.
const MAX_MARCAS = 40;
function marcasDe(re, html) {
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  const marcas = [];
  let m;
  while (marcas.length < MAX_MARCAS && (m = g.exec(html))) {
    marcas.push([m.index, m[0]]);
    if (g.lastIndex === m.index) g.lastIndex++;
  }
  return marcas;
}

// Qué proveedores hay, y cuáles vienen como script normal. La diferencia importa: un
// rastreador escrito dentro de un <script type="text/plain"> retenido NO se carga hasta que
// alguien acepta, y uno escrito como script normal parte solo. Sin distinguirlos, "hay un
// gestor conocido" tapaba rastreadores que ya estaban corriendo (I2-1, abogadospyme.cl).
function detectarProveedores(html, rangosRetenidos) {
  const dentroDeRetenido = (i) => rangosRetenidos.some(([a, b]) => i >= a && i < b);
  const vistos = new Map(); // nombre -> true si al menos una aparición es script normal
  for (const [re, nombre] of PROVEEDORES) {
    for (const [i, texto] of marcasDe(re, html)) {
      const n = typeof nombre === 'function' ? nombre(texto) : nombre;
      vistos.set(n, (vistos.get(n) || false) || !dentroDeRetenido(i));
    }
  }
  return {
    todos: [...vistos.keys()],
    normales: [...vistos].filter(([, normal]) => normal).map(([nombre]) => nombre),
  };
}

const RE_CONSENT_MODE = /gtag\(\s*['"]consent['"]\s*,\s*['"]default['"]/i;

// La otra señal firme de un control de permiso hecho a mano: scripts con type="text/plain"
// y un atributo de categoría de consentimiento. Un script así no se ejecuta hasta que algo
// le cambia el tipo, que es exactamente lo que hace un banner al aceptar.
//
// Se devuelven los TRAMOS que ocupan, no un sí/no, para poder preguntar después si un
// rastreador cae dentro de uno. El </script> se busca con una sola regex cuyo lastIndex solo
// avanza, así que el recorrido sigue siendo lineal aunque la portada traiga miles de scripts.
const MAX_RETENIDOS = 200;
// Dos familias de marca, porque los gestores no se pusieron de acuerdo:
//   - el atributo DESCRIBE la categoría del permiso: data-cookieconsent (Cookiebot),
//     data-category (Complianz), data-categories (Termly), data-cs-category (CookieScript),
//     data-osano-consent, data-consent-category, data-service.
//   - el atributo lleva el NOMBRE del gestor: data-cookieyes (CookieYes),
//     data-borlabs-script-blocker-id (Borlabs), data-cookiescript, data-cmplz-*, data-cky-*.
// La segunda familia se sumó el 23-sep: hasta entonces el sitio que SÍ retenía sus rastreadores
// con CookieYes o Borlabs no se le reconocía, y su Pixel retenido se contaba como script normal.
// El incentivo quedaba al revés, porque bloquear bien no sumaba. CookieYes es de los más
// comunes en WordPress chileno (beckerabogados.cl lo usa).
//
// Se prueba solo contra `tag`, que viene acotado a MAX_ETIQUETA, así que el `[a-z-]*` de la
// primera familia no puede costar más que ese tope; las de la segunda arrancan con una palabra
// literal y fallan en el primer carácter.
const RE_ATRIBUTO_RETENIDO =
  /\sdata-(?:[a-z-]*(?:consent|categor|service)[a-z-]*|cookieyes|borlabs[a-z-]*|cookiescript|cmplz[a-z-]*|cky[a-z-]*)\s*=/i;
// Los comentarios HTML del documento, en orden. Se recorren con indexOf, así que el costo es
// lineal sobre el largo y no depende de cuántos haya.
function* comentarios(html) {
  let i = 0;
  while ((i = html.indexOf('<!--', i)) !== -1) {
    const fin = html.indexOf('-->', i + 4);
    if (fin === -1) return yield [i, html.length];
    yield [i, fin + 3];
    i = fin + 3;
  }
}

function tramosRetenidos(html) {
  const tramos = [];
  const reCierre = /<\/script\s*>/gi;
  // Las dos listas van en orden, así que un solo cursor sobre los comentarios alcanza y el
  // recorrido total sigue siendo lineal.
  const coments = comentarios(html);
  let com = coments.next();
  // Se recorre a mano para poder mirar la apertura SIGUIENTE sin volver a buscarla: el
  // generador ya la calculó, así que peek cuesta cero y el recorrido sigue siendo lineal.
  const aperturas = etiquetas(html, 'script');
  let act = aperturas.next();
  while (!act.done) {
    const [inicio, fin] = act.value;
    act = aperturas.next();
    const siguienteApertura = act.done ? -1 : act.value[0];
    while (!com.done && com.value[1] <= inicio) com = coments.next();
    // Una etiqueta dentro de un comentario no retiene nada: el navegador nunca la ve. Sin
    // esto, un <script type="text/plain" data-cookieyes=...> comentado abría un tramo que se
    // tragaba el resto del documento, y un Google Analytics vivo más abajo se contaba como
    // retenido: verde, con el informe afirmando que lo vimos marcado para no cargar.
    if (!com.done && com.value[0] <= inicio) continue;
    const tag = html.slice(inicio, Math.min(fin + 1, inicio + MAX_ETIQUETA));
    if (!/\stype\s*=\s*["']?text\/plain/i.test(tag)) continue;
    if (!RE_ATRIBUTO_RETENIDO.test(tag)) continue;
    if (reCierre.lastIndex <= fin) reCierre.lastIndex = fin + 1;
    const c = reCierre.exec(html);
    // Sin </script> no hay tramo. Antes se empujaba hasta el final del documento, o sea que
    // una sola etiqueta rota declaraba retenido TODO lo que viniera después. Es la misma
    // clase de falso verde, por la puerta de al lado.
    if (!c) break;
    const cierre = c.index + c[0].length;
    // Y si antes de ese cierre ya empieza otro <script>, el retenido quedó sin cerrar y el
    // </script> que encontramos es el del OTRO. El tramo termina donde empieza el siguiente,
    // para no declarar retenido un rastreador que carga sin nada que lo frene.
    const corte = siguienteApertura !== -1 && siguienteApertura < cierre ? siguienteApertura : cierre;
    tramos.push([inicio, corte]);
    if (tramos.length >= MAX_RETENIDOS) break;
  }
  return tramos;
}

// El idioma declarado en <html lang>. Ya no puntúa (no es un punto de la ley), pero se sigue
// informando porque ayuda a lectores de pantalla y buscadores. Se devuelve solo si tiene
// forma de código de idioma, así que lo que viaja a la portada nunca es texto del sitio.
function idiomaDeclarado(html) {
  const primera = etiquetas(html, 'html').next();
  if (primera.done) return null;
  const [inicio, fin] = primera.value;
  const tag = html.slice(inicio, Math.min(fin + 1, inicio + MAX_ETIQUETA));
  const m = /\slang\s*=\s*["']?([a-z]{2,3}(?:[-_][a-z0-9]{1,8})*)/i.exec(tag);
  return m ? m[1] : null;
}

// Casilla de consentimiento en un formulario HTML plano (no detecta iframes de terceros ni
// formularios renderizados por JS — ver brief §4-A, límite declarado, no inferido).
// Se recorren las etiquetas <input> de cada formulario con `etiquetas`, en tiempo lineal. La
// versión anterior (una regex con dos [^>]* seguidos) crecía al cuadrado con un formulario
// lleno de '<input ' sin cerrar: 380 ms con 56 KB. Antes de eso, otra versión hacía
// `form.indexOf(input)` dos veces por casilla: 272 ms de CPU con 1 MB y 1.671 ms con 2,5 MB.
//
// "checked" se busca como atributo suelto: `aria-checked="false"` no es una casilla marcada.
function buscarCasillaPremarcada(html) {
  let encontroCasilla = false;
  const reForm = /<form[\s>]/gi;
  const reFin = /<\/form\s*>/gi;
  let f;
  while ((f = reForm.exec(html))) {
    reFin.lastIndex = f.index;
    const cierre = reFin.exec(html);
    if (!cierre) break;
    for (const [inicio, fin] of etiquetas(html, 'input', f.index, cierre.index)) {
      const tag = html.slice(inicio, Math.min(fin + 1, inicio + MAX_ETIQUETA));
      if (!/\stype\s*=\s*["']?checkbox/i.test(tag)) continue;
      const contexto = html.slice(Math.max(f.index, inicio - 150), Math.min(cierre.index, inicio + 150));
      if (!/acept|consient|autoriz|consentimiento/i.test(contexto)) continue;
      encontroCasilla = true;
      if (/\schecked(?:[\s=/>]|$)/i.test(tag)) return { encontroCasilla, premarcada: true };
    }
    reForm.lastIndex = reFin.lastIndex;
  }
  return { encontroCasilla, premarcada: false };
}

/* ------------------------------------------------------------------ *
 * Qué decirle a alguien cuyo sitio no se dejó leer                     *
 * ------------------------------------------------------------------ */

// Antes esto era una sola línea con el número adentro: "El sitio respondió 526. Revisa el
// dominio." Para quien escribe su dominio, ese número no significa nada y el consejo estaba
// equivocado además: el dominio estaba bien. El código sigue viajando aparte, en `codigo`,
// porque a nosotros nos sirve cuando alguien nos escribe; lo que cambia es que ya no es el
// mensaje.
//
// Ningún mensaje lleva el correo: la portada pone debajo el botón "Pídenos revisarlo a mano"
// y el enlace para escribirnos, que se pueden tocar. Y ninguno culpa a la persona cuando el
// problema es un tiempo de espera: "revisa el dominio" a alguien que lo escribió bien es
// justo lo que hacía que se fuera.
//
// Recibe el status real del sitio o el nombre de una falla nuestra ('tiempo', 'conexion',
// 'destino', 'bucle', 'pesada', 'vacia').
export function mensajeDeFallo(status) {
  if (status === 'tiempo') {
    return 'Tu sitio no respondió a tiempo. A veces es algo pasajero: vuelve a intentarlo en un rato.';
  }
  if (status === 'conexion') {
    return 'No logramos conectarnos con tu sitio. Si el dominio está bien escrito, puede que ' +
      'esté caído en este momento, o que esté bloqueando a los programas que leen páginas sin ' +
      'abrir un navegador, como el nuestro.';
  }
  if (status === 'destino') {
    return 'Tu sitio nos mandó a una dirección que este chequeo no sigue, así que no alcanzamos ' +
      'a leer tu página de inicio.';
  }
  if (status === 'bucle') {
    return 'Tu sitio nos mandó de una dirección a otra tantas veces seguidas que dejamos de ' +
      'seguirlo. Suele ser una redirección mal configurada, y le pasa igual a quien entra desde ' +
      'Google, que se queda dando vueltas sin llegar nunca.';
  }
  if (status === 'pesada') {
    return 'Tu página de inicio pesa más de lo que este chequeo alcanza a leer entera. ' +
      'Preferimos no darte un resultado a medias, sacado de la mitad del código.';
  }
  if (status === 'vacia') {
    return 'Tu sitio respondió, pero nos mandó una página en blanco en vez del código que íbamos ' +
      'a revisar. Suele pasar cuando un firewall bloquea a los programas que leen páginas sin ' +
      'abrir un navegador.';
  }
  if (status === 'refresco') {
    return 'Tu página de inicio no tiene contenido propio y manda a quien entra hacia otra ' +
      'dirección. Esa otra dirección tampoco nos entregó una página que podamos revisar.';
  }
  if (status === 401 || status === 403) {
    return 'Tu sitio respondió que no tenemos permiso para leer su página de inicio. Suele ser ' +
      'un firewall, o una regla que bloquea a los programas que leen páginas sin abrir un navegador.';
  }
  if (status === 404 || status === 410) {
    return 'El dominio responde, pero su página de inicio no existe. Revisa que sea la dirección ' +
      'con la que la gente entra a tu sitio. A veces el sitio vive en otra, como tienda.tuempresa.cl.';
  }
  if (status === 429) {
    return 'Tu sitio nos pidió bajar el ritmo porque recibió varias peticiones seguidas. ' +
      'Espera un minuto y vuelve a intentarlo.';
  }
  if (status === 525 || status === 526) {
    return 'El certificado de seguridad de tu sitio está vencido, mal instalado o es de otro ' +
      'dominio, y por http:// tampoco entrega una página que podamos leer, así que no hay ' +
      'informe. Piensa lo que significa. Hoy cualquiera que entre a tu sitio ve primero una ' +
      'advertencia de seguridad del navegador.';
  }
  if (status === 530) {
    return 'No encontramos un sitio publicado en esa dirección. Revisa que el dominio esté bien ' +
      'escrito. Si lo está, puede que ya no tenga un sitio conectado.';
  }
  if (status >= 500) {
    return 'Tu sitio respondió con un error de su propio servidor. Suele ser pasajero, así que ' +
      'inténtalo en un rato. Si sigue igual, el problema está donde tienes alojado el sitio y no ' +
      'en este chequeo.';
  }
  return 'Tu sitio respondió, pero no nos entregó su página de inicio. Vuelve a intentarlo en un rato.';
}

// `codigo` solo cuando es un status que mandó el servidor del sitio. 525, 526 y 530 los
// genera el Cloudflare de nuestro runtime (TLS roto, nombre que no resuelve): mostrarlos como
// "código de respuesta de tu sitio" es atribuirle al sitio algo que nunca dijo.
const STATUS_NUESTROS = new Set([525, 526, 530]);
function falloDelSitio(r) {
  if (r.falla) return { ok: false, tipo: 'sitio', error: mensajeDeFallo(r.falla) };
  const fallo = { ok: false, tipo: 'sitio', error: mensajeDeFallo(r.status) };
  if (!STATUS_NUESTROS.has(r.status)) fallo.codigo = r.status;
  return fallo;
}

// Qué pasó con la dirección que no abrió, como frase completa, para el informativo que
// explica por qué revisamos otra.
function motivoCorto(r) {
  if (r.falla === 'tiempo') return 'tu sitio no respondió a tiempo';
  if (r.falla === 'conexion') return 'no logramos conectarnos con tu sitio';
  if (r.falla === 'bucle') return 'tu sitio nos mandó de una dirección a otra sin parar';
  if (r.status === 530) return 'no encontramos un sitio publicado';
  if (r.status === 525 || r.status === 526) return 'el certificado de seguridad de tu sitio no sirve';
  return 'tu sitio no abrió';
}

/* ------------------------------------------------------------------ *
 * El chequeo                                                          *
 * ------------------------------------------------------------------ */

export async function chequear(entrada, fetchImpl = fetch) {
  const v = normalizarDominio(entrada);
  if (v.error) return { ok: false, tipo: 'entrada', error: v.error };
  const { dominio } = v;

  const plazoPortada = Date.now() + PRESUPUESTO_PORTADA_MS;
  let { home, via } = await abrirPortada(dominio, fetchImpl, plazoPortada);

  if (home.falla || home.status >= 400) return falloDelSitio(home);

  // Si la portada no llegó entera, NO se puntúa. Un HTML cortado produce un informe que
  // parece bueno y está mal: las señales que viven más abajo del corte salen en rojo aunque
  // el sitio las tenga. Para un chequeo cuya única defensa es "cuando no podemos verificar
  // algo, lo decimos", entregar ese número sería exactamente lo contrario. Preferimos no dar
  // resultado antes que dar uno inventado.
  // Decisión tomada a sabiendas, no un descuido: por encima del tope preferimos NO dar
  // informe, aunque tengamos la cabeza del archivo en la mano. La versión vieja, cuando el
  // origen no declaraba tamaño, leía todo y se quedaba con el prefijo, así que por encima de
  // 3 MB este chequeo pasa de contestar a declinar. Lo sabemos y lo elegimos: puntuar sobre
  // el prefijo y presentarlo como informe completo es exactamente "un resultado a medias",
  // que es lo que este producto promete no hacer. Las señales que viven abajo saldrían
  // ausentes sin estarlo. Portadas de más de 3 MB de HTML son raras; un informe equivocado
  // cuesta más que uno que no se entrega.
  if (!home.completo) return { ok: false, tipo: 'sitio', error: mensajeDeFallo('pesada') };

  // Una portada que solo redirige con <meta http-equiv="refresh">: se sigue UNA vez, y el
  // destino pasa por el mismo portón y el mismo presupuesto (ver `destinoDeMetaRefresh`). Si
  // el destino no sirve, nos quedamos con lo que había y el mensaje lo dice sin culpar a un
  // firewall. Una sola vez, no en cadena: dos etiquetas seguidas ya son un sitio roto.
  const refresco = destinoDeMetaRefresh(home.texto, home.url);
  let refrescoSinSeguir = false;
  if (refresco) {
    const destino = await traer(refresco, fetchImpl, plazoPortada, null, MAX_SALTOS_REFRESCO);
    if (!destino.falla && destino.status === 200 && destino.completo && destino.texto.trim()) {
      home = destino;
      via = { tipo: 'refresco', destino: refresco, antes: via };
    } else {
      refrescoSinSeguir = true;
    }
  }

  // El otro extremo del mismo problema, y el más probable de los dos: un 2xx que no trae
  // nada de HTML. Pasa cuando un firewall le devuelve la página en blanco a un lector
  // automático como el nuestro. Puntuarlo es inventar igual que truncar: las señales salen
  // ausentes porque no leímos nada, no porque el sitio no las tenga. Sin esta guardia daba
  // 27/100 con tres señales en rojo, que es exactamente el informe falso que perseguimos.
  // La misma guardia cubre la página de bloqueo que llega con 200 (ver `esPaginaDeBloqueo`):
  // sin ella, www.bancoestado.cl salía con 60/100 sobre un aviso de "acceso restringido".
  //
  // `refrescoSinSeguir` declina SIEMPRE, no solo cuando además el stub pasa por la guardia de
  // abajo. Hasta el 23-sep dependía de ella, y un stub con esqueleto (`<html><head><meta
  // refresh></head><body></body></html>`, o con un <title>Redirigiendo</title>) no la pasaba:
  // se puntuaba el stub y se le explicaba al dueño una página que no es la suya, con la
  // política "sin confirmar porque tu menú se arma en el navegador", que es falso, y sin el
  // informativo del refresco. El hallazgo de verdad es que el destino de la redirección no
  // abre, y ese es el que tiene que llegar.
  if (refrescoSinSeguir || !home.texto.trim() || esPaginaDeBloqueo(home.texto)) {
    return { ok: false, tipo: 'sitio', error: mensajeDeFallo(refrescoSinSeguir ? 'refresco' : 'vacia') };
  }

  const html = home.texto;

  // --- La política: hasta dos enlaces candidatos, con su propio presupuesto de espera. ---
  // Si la portada no trae ningún enlace y el sitio se arma con JavaScript, se buscan en los
  // datos del menú (ver `buscarPoliticaEnDatos`). En un sitio de HTML normal eso no se hace: ahí
  // lo que no está en un <a> no está en la página, y una dirección suelta en un JSON no es un
  // enlace que alguien pueda tocar.
  let candidatos = buscarEnlacesPolitica(html, home.url);
  let conJs = null;
  let desdeDatos = false;
  // Si la portada casi no trae texto visible, no hay menú en el HTML que mirar: ahí los datos
  // son la única pista que queda. Si SÍ trae texto, el menú está en el HTML, y una dirección
  // suelta en un JSON no es un enlace que alguien pueda tocar.
  const sinTextoPortada = letrasVisibles(html, MIN_LETRAS_PORTADA) < MIN_LETRAS_PORTADA;
  if (!candidatos.length) {
    conJs = comoSeArma(html);
    // Los datos del menú solo se miran cuando hay marca de framework Y la portada no trae
    // texto. En una portada sin marca, un JSON suelto no es un menú. Y con texto de sobra
    // tampoco vale: hasta el 23-sep bastaba con marca de framework y 3 enlaces navegables
    // (`comoSeArma` devuelve 'marca' con un O, no con un Y), así que un one-pager hecho con
    // Next que trae su menú en el HTML, 240 caracteres de texto y una ruta de política en el
    // __NEXT_DATA__ que ningún <a> enlaza salía en VERDE y 100/100. Un verde sobre una
    // dirección que puede no estar enlazada en ninguna parte es exactamente lo que este
    // chequeo promete no hacer.
    if (conJs === 'marca' && sinTextoPortada) {
      candidatos = buscarPoliticaEnDatos(html, home.url);
      desdeDatos = candidatos.length > 0;
    }
  }
  // `falla` guarda la primera respuesta del sitio que dice que el enlace está roto; `duda`, la
  // primera vez que no pudimos saberlo por un límite nuestro (ver `sinPoderLeer`). Si hay duda,
  // gana la duda: con un enlace roto y otro que no nos dejó entrar, puede que el segundo sea
  // justo la política, y marcarlo pendiente sería castigar al sitio por lo que no vimos.
  let abre = false;
  let falla = null;
  let duda = null;
  const plazoPolitica = Date.now() + PRESUPUESTO_POLITICA_MS;
  for (const c of candidatos.slice(0, 2)) {
    const pagina = await traer(c.url, fetchImpl, plazoPolitica);
    // Una página que abre pero es la portada otra vez no es una política: pasa cuando el
    // enlace redirige al inicio, o en sitios que devuelven la portada con 200 para cualquier
    // ruta que no existe (Cloudflare Pages sin 404.html hace exactamente eso).
    const esPortada = pagina.status === 200 && (pagina.url === home.url || pagina.texto === html);
    if (pagina.status === 200 && !esPortada) { abre = true; break; }
    const f = esPortada ? { portada: true } : pagina;
    if (sinPoderLeer(f)) duda ||= f;
    else falla ||= f;
  }

  // Lo que este ítem mide es por dónde entramos, no con qué número contestó. Pedía además
  // `status === 200`, y con eso cualquier otro 2xx (un 202 de un desafío de firewall, un 203)
  // dejaba el ítem en rojo con el texto "Tu sitio respondió por http://, no por https://", que
  // es falso: entramos por https. Encima le ofrecía instalar un certificado a quien ya tiene
  // uno bueno. Para llegar hasta acá el sitio ya pasó por `status >= 400` y por la guardia del
  // HTML vacío, así que si estamos leyendo su página, la leímos por donde dice `home.url`.
  const httpsOk = home.url.startsWith('https://');
  const lang = idiomaDeclarado(html);
  const cmp = detectarCmp(html);
  const tramos = tramosRetenidos(html);
  const { todos: proveedores, normales } = detectarProveedores(html, tramos);
  const consentModeInline = RE_CONSENT_MODE.test(html);
  const retenidos = tramos.length > 0;
  const { encontroCasilla, premarcada } = buscarCasillaPremarcada(html);

  const items = [];
  const add = (bloque, id, titulo, estado, peso, detalle, arreglo) =>
    items.push({ bloque, id, titulo, estado, ok: estado === 'ok', peso, detalle, arreglo: estado === 'ok' ? null : arreglo });

  // --- Bloque 1: la política (Art. 14 ter, brief §2.6) ---
  // En verde solo dice que el enlace existe y la página abre. No leemos su contenido, y el
  // detalle lo dice con esas palabras: antes quedaba en verde con el mismo "la página
  // responde", y se leía como si hubiéramos revisado la política.
  //
  // "Política de privacidad o aviso legal": `clasificar` también acepta un "Aviso legal" o una
  // "Política de tratamiento de datos", y un aviso legal puede no ser una política de
  // privacidad. El texto no afirma más de lo que vimos.
  //
  // Queda sin confirmar (no suma ni resta) en los tres casos donde lo que falta es nuestro:
  // la página no respondió a tiempo o no nos dejó entrar, el sitio arma el menú con JavaScript
  // y no vimos ningún enlace, o la dirección salió de los datos del menú y no de un enlace (ahí
  // no sabemos si el enlace se muestra, así que un 404 no prueba que el sitio tenga uno roto).
  const hallazgo = desdeDatos
    ? 'Tu página de inicio arma sus enlaces con JavaScript, así que no vimos el enlace en sí. En ' +
      'el código aparece la dirección de tu política de privacidad o aviso legal'
    : 'Encontramos en tu página de inicio un enlace a tu política de privacidad o aviso legal';
  let estadoPol, detallePol, arregloPol;
  if (abre) {
    estadoPol = 'ok';
    detallePol = (desdeDatos ? hallazgo : 'Encontramos en tu página de inicio un enlace a tu política de privacidad o aviso legal') +
      ', y la página abre. No leímos lo que dice adentro. Más abajo en esta página está la lista ' +
      'completa de lo que la ley pide tener publicado, para que la compares con la tuya.';
  } else if (duda) {
    estadoPol = 'sin-confirmar';
    if (duda.falla === 'tiempo') {
      detallePol = `${hallazgo}, pero esa página no respondió a tiempo y no la pudimos abrir. ` +
        'No lo contamos ni a favor ni en contra.';
      arregloPol = 'Ábrela tú en el navegador. Si abre bien, no hay nada que corregir acá.';
    } else {
      detallePol = `${hallazgo}, pero ` +
        (duda.falla === 'conexion'
          ? 'no logramos conectarnos con esa página. '
          : 'esa página no nos dejó entrar. ') +
        'No lo contamos ni a favor ni en contra.';
      arregloPol = 'Ábrela tú en el navegador. Si abre bien, no hay nada que corregir acá.';
    }
  } else if (desdeDatos) {
    estadoPol = 'sin-confirmar';
    detallePol = `${hallazgo}, pero ${motivoPolitica(falla)}. Como no sabemos si ese enlace ` +
      'aparece de verdad en tu sitio, no lo contamos ni a favor ni en contra.';
    arregloPol = 'Abre tu sitio en el navegador y busca el enlace a tu política, en el pie de página. ' +
      'Tiene que llevar a una página que abra.';
  } else if (candidatos.length) {
    estadoPol = 'pendiente';
    detallePol = `${hallazgo}, pero ${motivoPolitica(falla)}.`;
    arregloPol = 'Arregla el enlace, para que lleve a una página que abra. La ley pide que tu política ' +
      'esté publicada y a la vista en tu sitio (Art. 14 ter).';
  } else if (conJs) {
    estadoPol = 'sin-confirmar';
    // entel.cl: cuatro <a>, los cuatro con href="#", y el pie con "Privacidad" aparece solo
    // en el navegador. Decirle "no encontramos un enlace a tu política" era acusarlo de algo
    // que sí tiene, así que se dice lo que de verdad vimos. Y se dice "puede que", no "tu menú
    // se arma en el navegador": lo segundo es una inferencia nuestra, no algo que vimos.
    //
    // El tercer caso se separó el 23-sep: marca de framework, pero con texto y enlaces en el
    // HTML. Ahí decirle "tu sitio arma el menú con JavaScript" es falso, porque el menú está a
    // la vista en el código que recibimos. Lo único cierto es que vimos enlaces y ninguno
    // lleva a una política, y que una herramienta así puede agregar más después.
    detallePol = conJs === 'sin-enlaces'
      ? 'En tu página de inicio no vimos ningún enlace que lleve a otra página. Puede que tu menú ' +
        'se arme en el navegador, y este chequeo no ejecuta JavaScript, así que si tienes una ' +
        'política enlazada, no la alcanzamos. No lo contamos ni a favor ni en contra.'
      : sinTextoPortada
        ? 'Tu sitio arma el menú con JavaScript y este chequeo no lo ejecuta, así que si tu página de ' +
          'inicio enlaza tu política de privacidad, no la pudimos ver. No lo contamos ni a favor ni en contra.'
        : 'En los enlaces de tu página de inicio no vimos ninguno a una política de privacidad. Tu ' +
          'sitio está hecho con una herramienta que arma parte de la página en el navegador, y este ' +
          'chequeo no ejecuta JavaScript, así que puede que el enlace esté y no lo alcancemos. No lo ' +
          'contamos ni a favor ni en contra.';
    arregloPol = 'Abre tu sitio en el navegador y busca el enlace a tu política, en el pie de página. ' +
      'Si no está, hay que publicarla y enlazarla desde ahí.';
  } else {
    estadoPol = 'pendiente';
    detallePol = 'En tu página de inicio no vimos ningún enlace a una política de privacidad ni a un ' +
      'aviso de tratamiento de datos.';
    // Brief §2.6: los 12 puntos del Art. 14 ter tienen que estar disponibles al público en el
    // sitio, y la política con su fecha y versión es UNO de ellos, no el lugar donde van los 12.
    arregloPol = 'Si ya la tienes publicada, enlázala desde el pie de página, que es donde la gente ' +
      'la busca. Si no la tienes, hay que escribirla y publicarla. Es una de las 12 cosas que tu ' +
      'sitio tiene que mostrar. Entre las otras están quién responde por los datos que tratas, para ' +
      'qué los usas, y qué puede pedirte cada persona sobre los suyos (Art. 14 ter).';
  }
  add('politica', 'politica', 'Enlace a tu política de privacidad', estadoPol, 8, detallePol, arregloPol);

  // --- Bloque 2: seguridad básica. No es un punto del Art. 14 ter, y ya no se presenta así. ---
  add(
    'seguridad', 'https', 'Conexión cifrada (HTTPS)', httpsOk ? 'ok' : 'pendiente', 6,
    httpsOk
      ? 'Tu sitio abre por https://, así que lo que alguien escribe en él viaja cifrado.'
      : 'Tu sitio respondió por http://, no por https://. Lo que alguien escriba en tu ' +
        'formulario viaja sin cifrar, así que cualquiera en la misma red puede leerlo.',
    'Pídele a quien te aloja el sitio que instale un certificado y que mande todo el tráfico de ' +
      'http:// a https://. Casi todos lo activan con un clic y sin costo, con Let\'s Encrypt.'
  );

  // --- Bloque 3: el permiso antes de cargar rastreadores ---
  // Antes este ítem se puntuaba solo con "¿hay un gestor de una marca conocida?". Un sitio sin
  // ningún rastreador nunca pasaba de 73 y la portada le ofrecía un kit que "corrige
  // exactamente eso": instalarle un banner que no necesita. Esto le pasaba a este mismo sitio
  // y a spindlelab.cl. Ahora son cuatro casos, y dos no se puntúan porque desde afuera no se
  // puede saber (brief §4-B): que el banner bloquee de verdad solo se ve en un navegador.
  //
  // "No vimos rastreadores" tampoco es verde. Lo fue por unas horas el 23-sep y salieron en
  // verde www.clinicasantamaria.cl, falabella.com y grupodentalblue.cl: en su HTML no hay
  // ninguno de los patrones, pero abiertos en Chrome sin tocar nada cargan GA4, el Pixel de Meta
  // o Clarity y dejan _ga y _fbp sin ningún aviso. Los cargan después, con JavaScript. Justo el
  // cliente que este chequeo busca recibía "no hay nada que bloquear".
  //
  // Y un gestor conocido TAMPOCO es verde por sí solo. Lo fue hasta el 23-sep, y los dos
  // únicos sitios del set que traían uno cargaban rastreadores antes de que nadie aceptara:
  // abogadospyme.cl (CookieAdmin, con gtag/js?id=AW- como script normal, y googleads,
  // rmkt/collect y 1p-user-list disparando con el banner a la vista) y entel.cl (OneTrust,
  // con _ga, _gcl_au y doubleclick sin tocar nada). El propio detalle decía "desde afuera no
  // vemos cómo está configurado" y aun así sumaba 6 puntos: la misma contradicción que la
  // portada promete no cometer. Que un gestor esté instalado no dice que bloquee; eso solo se
  // ve en un navegador. Queda verde únicamente cuando no hay nada partiendo por su cuenta:
  // ningún rastreador a la vista, o todos retenidos.
  //
  // Consent Mode declarado NO abre el verde, y el 23-sep dejó de hacerlo. La condición era
  // `cmp && (!normales.length || consentModeInline)`, o sea que una sola línea de Google
  // Consent Mode daba 100/100 con Google Analytics, el Pixel de Meta y Clarity cargando como
  // rastreadores normales. Consent Mode solo le habla a las etiquetas de Google: no frena al
  // Pixel de Meta, ni a Clarity, ni a Hotjar. Y la línea que de verdad circula en los sitios
  // chilenos (contadoreshc.cl, clinicaeverest.cl) trae `"region":[...]` con países europeos,
  // donde Chile no está, así que para quien entra desde Chile el valor por defecto es
  // "granted". El propio archivo lo dice dos ramas más abajo ("suele ir con") y en el
  // informativo. Lo más que puede hacer esa señal es sacar al ítem de 'pendiente' y dejarlo en
  // 'sin-confirmar', que es lo que hace la rama de `consentModeInline || retenidos`.
  const lista = listaLegible(proveedores);
  const viaGtm = proveedores.includes('Google Tag Manager');
  let estadoCmp, detalleCmp, arregloCmp;
  if (cmp && !normales.length) {
    estadoCmp = 'ok';
    // El verde nunca puede decir "no vimos rastreadores" cuando el informativo de la misma
    // respuesta los lista. Si están y quedaron todos retenidos, se dice eso.
    detalleCmp = `Detectamos ${cmp}, que es el programa que muestra el aviso de cookies y guarda lo que ` +
      `la persona responde. ` +
      (proveedores.length
        ? `Encontramos ${lista} en tu página de inicio, ${proveedores.length === 1 ? 'y lo vimos marcado' : 'y los vimos marcados'} para no cargar hasta que haya permiso. `
        : 'En tu página de inicio no vimos ningún rastreador partiendo por su cuenta. ') +
      `Cómo quedó configurado por dentro no lo alcanzamos a ver, así que si quieres estar seguro, ` +
      `ábrelo en una ventana de incógnito y fíjate si el aviso aparece antes de que puedas navegar.`;
  } else if (cmp) {
    estadoCmp = 'sin-confirmar';
    detalleCmp = `Detectamos ${cmp}, que es el programa que muestra el aviso de cookies, y también ` +
      `${listaLegible(normales)} cargando sin nada que lo frene. Desde afuera no vemos si tu aviso ` +
      'los detiene hasta que la persona acepta. No lo contamos ni a favor ni en contra.';
    arregloCmp = `${conMayuscula(PRUEBA_INCOGNITO)} Y si aparece, falta saber si de verdad los frena. ` +
      `${REVISION_A_MANO}`;
  } else if (!proveedores.length) {
    estadoCmp = 'sin-confirmar';
    detalleCmp = 'En tu página de inicio no vimos ninguno de los rastreadores más comunes. Muchos ' +
      'sitios los cargan después con JavaScript, y eso no aparece en el código que recibimos. No lo ' +
      'contamos ni a favor ni en contra.';
    arregloCmp = `${conMayuscula(PRUEBA_INCOGNITO)} Lo que no sabemos es si igual hay rastreadores ` +
      `cargando. ${REVISION_A_MANO}`;
  } else if (consentModeInline || retenidos) {
    estadoCmp = 'sin-confirmar';
    // Consent Mode declarado no prueba que haya un aviso: spindlelab.cl lo declara en "granted"
    // dentro del cargador que corre después de aceptar. Por eso dice "suele ir con", no "es".
    detalleCmp = `Encontramos ${lista} en tu página de inicio, y también ` +
      (consentModeInline
        ? 'la declaración de Google Consent Mode, que suele ir con un aviso de permiso hecho a medida. '
        : `${normales.length ? 'algunos' : 'todos'} marcados para no cargar hasta que haya permiso. `) +
      'Que eso los detenga hasta que la persona acepta no se puede comprobar leyendo el código. No lo ' +
      'contamos ni a favor ni en contra.';
    arregloCmp = `${conMayuscula(PRUEBA_INCOGNITO)} Y si aparece, falta saber si de verdad los frena. ` +
      `${REVISION_A_MANO}`;
  } else if (viaGtm && proveedores.length === 1) {
    // Tag Manager solo, sin ningún otro proveedor a la vista: no sabemos qué carga adentro.
    // jaukencosmetica.cl salía pendiente y con el kit ofrecido, y abierto en Chrome sin tocar
    // nada no dispara ni un rastreador ni deja una cookie: el contenedor está vacío. Es la
    // misma regla que el resto del ítem, "un no lo sabemos no puede restar". Con GTM y algún
    // proveedor más (xmslatam.com: GA4, GTM y Clarity) sí hay algo concreto que pedir permiso
    // para cargar, y ahí sigue pendiente.
    estadoCmp = 'sin-confirmar';
    detalleCmp = 'Encontramos Google Tag Manager en tu página de inicio y ningún aviso de cookies de ' +
      'los que reconocemos. Qué carga Tag Manager por dentro no aparece en el código de tu página. ' +
      'Ahí adentro puede estar tu aviso, o rastreadores que parten sin pedir permiso. No lo contamos ' +
      'ni a favor ni en contra.';
    arregloCmp = `${conMayuscula(PRUEBA_INCOGNITO)} Lo que sigue sin verse es qué carga Tag Manager ` +
      `por dentro. ${REVISION_A_MANO}`;
  } else {
    estadoCmp = 'pendiente';
    detalleCmp = `Encontramos ${lista} en tu página de inicio, y ningún aviso de cookies de los que reconocemos. ` +
      (viaGtm
        ? 'Si el tuyo se carga desde Google Tag Manager, no lo alcanzamos a ver en el código.'
        : 'Puede que uses uno que no está en nuestra lista, o que los rastreadores estén cargando sin pedir permiso.');
    // Con Tag Manager, lo primero es comprobar: Cookiebot y CookieYes se instalan seguido con su
    // plantilla de GTM, y decirle "instala un banner" a quien ya tiene uno es mandarlo a
    // comprar lo que ya tiene.
    arregloCmp = viaGtm
      ? `Si ya tienes un aviso cargado desde Tag Manager, compruébalo primero. ` +
        `${conMayuscula(PRUEBA_INCOGNITO)} Y si nadie lo está pidiendo, hay que poner uno que los ` +
        `frene hasta que la persona acepte, porque ${LEY_CONSENTIMIENTO}.`
      : `Lo habitual es poner un aviso que frene los rastreadores hasta que la persona acepta. Sin ` +
        `eso, los datos de quien entra a tu sitio ya salieron antes de que nadie diga que sí, y ` +
        `${LEY_CONSENTIMIENTO}.`;
  }
  add('consentimiento', 'cmp', 'Permiso antes de cargar rastreadores', estadoCmp, 6, detalleCmp, arregloCmp);

  // La casilla del formulario puntúa solo cuando la vimos. Antes era solo informativa, y una
  // casilla premarcada terminaba en "Ninguna señal pendiente" con el mismo informe diciendo, más
  // abajo, que eso no es un acto afirmativo. Si no hay un formulario HTML plano a la vista (lo
  // más común: formularios de terceros o armados con JavaScript), no hay ítem: no se puntúa lo
  // que no vemos.
  if (encontroCasilla) {
    add(
      'consentimiento', 'casilla', 'Casilla de consentimiento en tu formulario',
      premarcada ? 'pendiente' : 'ok', 4,
      premarcada
        // La lectura primero, la cita después. La frase que de verdad se entiende ("no la marcó la
        // persona") venía tercera, detrás del Art. 12, y era la única parte que alguien sin abogado
        // podía usar. La cita queda igual de separada: la ley no dice "casilla", eso lo decimos
        // nosotros, y por eso va en su propia frase (brief §2.4).
        ? 'Encontramos en un formulario de tu página de inicio una casilla de consentimiento que ya ' +
          'viene marcada. Si ya viene marcada, no la marcó la persona, y nadie hizo nada para dar ' +
          `ese permiso. ${conMayuscula(LEY_CONSENTIMIENTO)}.`
        : 'Encontramos en un formulario de tu página de inicio una casilla de consentimiento, y no ' +
          'viene marcada de antemano. La marca la persona.',
      'Deja la casilla sin marcar, para que la persona la marque ella misma.'
    );
  }

  // El puntaje sale solo de lo que pudimos confirmar. Un "no lo sabemos" no puede restar,
  // porque sería castigar al sitio por un límite nuestro; y tampoco sumar.
  //
  // Y por debajo de la mitad del peso no hay número. www.clinicasantamaria.cl salía con un 100
  // grande habiendo confirmado solo el HTTPS (6 de 20), que según el propio informe "no es uno
  // de los 12 puntos del Art. 14 ter", mientras el sitio carga gtm, gtag, fbevents y clarity
  // sin ningún aviso. El texto de abajo era honesto, pero lo primero que se ve, y lo que se
  // captura de pantalla, es el número. Un porcentaje sacado de una sola señal se lee como si
  // fuera de todas. `pesoConfirmado` y `pesoTotal` viajan para que la portada pueda explicar
  // por qué no hay número sin tener que recalcularlo.
  const puntuables = items.filter((i) => i.estado !== 'sin-confirmar');
  const pesoTotal = items.reduce((a, i) => a + i.peso, 0);
  const pesoConfirmado = puntuables.reduce((a, i) => a + i.peso, 0);
  const obtenido = puntuables.reduce((a, i) => a + (i.estado === 'ok' ? i.peso : 0), 0);
  const puntaje = pesoConfirmado && pesoConfirmado * 2 >= pesoTotal
    ? Math.round((obtenido / pesoConfirmado) * 100)
    : null;

  const prioridades = items
    .filter((i) => i.estado === 'pendiente')
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 3)
    .map((i) => ({ titulo: i.titulo, arreglo: i.arreglo }));

  // --- Informativo: no se puntúa, porque no es verificable con este chequeo (brief §4). ---
  const informativos = [];
  // El meta refresh se informa aparte y no pisa el aviso de www o de http://: las dos cosas
  // pueden haber pasado en la misma revisión (el dominio pelado no abrió y el www redirige
  // con la etiqueta).
  const viaDireccion = via && via.tipo === 'refresco' ? via.antes : via;
  if (viaDireccion) {
    const conWww = viaDireccion.tipo === 'variante' && viaDireccion.otro.startsWith('www.');
    informativos.push({
      id: 'direccion',
      titulo: 'La dirección que revisamos',
      detalle: viaDireccion.tipo === 'http'
        ? `Por https://, ${motivoCorto(viaDireccion.motivo)}, así que lo revisamos por http://.`
        : `${conWww ? 'Sin' : 'Con'} www, ${motivoCorto(viaDireccion.motivo)}, así que revisamos la versión ` +
          `${conWww ? 'con' : 'sin'} www. Si alguien escribe tu dominio ${conWww ? 'sin' : 'con'} www, puede que tampoco llegue.`,
    });
  }
  if (via && via.tipo === 'refresco') {
    informativos.push({
      id: 'refresco',
      titulo: 'Tu inicio manda a otra dirección',
      detalle: 'Tu página de inicio no tiene contenido propio y manda a quien entra hacia otra dirección ' +
        'con una etiqueta dentro de la página, lo que en el código se llama meta refresh, así que ' +
        'revisamos esa otra. Funciona, pero es más lenta que una redirección hecha en el servidor y ' +
        'los buscadores la leen peor.',
    });
  }
  // Qué es "algo de Google": Analytics, Ads, Tag Manager o la etiqueta que no alcanzamos a
  // identificar. Los cuatro nombres llevan la palabra, y por eso se pregunta así.
  const hayGoogle = proveedores.some((nombre) => /google/i.test(nombre));
  informativos.push(
    {
      id: 'proveedores',
      titulo: 'Quién más recibe datos de tus visitantes',
      // Art. 27-28 son sobre transferencias internacionales (brief §2.6): piden cláusulas
      // contractuales o un nivel adecuado de protección. No dicen que cada proveedor necesite
      // "su propio acuerdo de tratamiento", que era lo que afirmaba la versión anterior. Y el
      // brief no habla del "país de destino": se dice con sus mismas palabras.
      //
      // Ya no repite "no sabemos si cargan antes o después del permiso": eso lo dice el ítem de
      // rastreadores dos párrafos más arriba, en la misma pantalla de teléfono.
      detalle: proveedores.length
        ? (normales.length
            ? `Los datos de quien entra a tu sitio también llegan ${aLista(proveedores)}, y casi siempre a servidores fuera de Chile.`
            // Todos quedaron retenidos: decir "también llegan" acá sería afirmar que ya salieron.
            : `Cuando esos rastreadores se carguen, los datos de quien entra a tu sitio van a llegar ${aLista(proveedores)}, y casi siempre a servidores fuera de Chile.`) +
          ' Cuando los datos salen del país, la ley pide un contrato con cláusulas de protección, o que el país donde van tenga un nivel de protección adecuado (Art. 27-28).'
        // No repite la frase del ítem de arriba ("no vimos ninguno de los rastreadores más
        // comunes"), que cae en la misma pantalla de teléfono: acá se nombra cuál es esa lista,
        // que es el dato que el ítem no da.
        : 'La lista que miramos es Google Analytics, Google Tag Manager, el Pixel de Meta, Hotjar y Clarity. Ninguno aparece en el código que recibimos. Si los tienes y se cargan con JavaScript, ahí no se ven.',
    },
  );
  // Este bloque solo aparece cuando hay algo de Google cargando. Antes salía siempre, también
  // en sitios que no tienen nada de Google, donde no tiene ninguna consecuencia y solo agrega
  // ruido. Y ahora dice qué pasa y qué hacer: señalar una ausencia sin decir para qué sirve
  // deja al dueño preocupado sin saber por qué.
  if (hayGoogle) {
    informativos.push({
      id: 'consent-mode',
      titulo: 'Cómo le avisas a Google del permiso',
      detalle: consentModeInline
        ? 'En tu código encontramos la declaración de Google Consent Mode, que es como Google se entera de si la persona aceptó o no. Que esté declarada no prueba que tus rastreadores esperen ese permiso, y además puede venir limitada a una lista de países: si Chile no está en esa lista, acá no cambia nada. Pídele a quien mantiene tu sitio que la abra y te diga a qué países alcanza.'
        : 'Tu sitio carga etiquetas de Google y en el código no encontramos la declaración de Google Consent Mode, que es como Google se entera de si la persona aceptó o no. Sin ella, tus etiquetas de Google no saben qué respondió la persona en tu aviso de cookies. Puede estar dentro de un contenedor de Google Tag Manager, que este chequeo no alcanza a abrir: quien mantiene tu sitio lo comprueba en un minuto.',
    });
  }
  // Cuando vimos la casilla, su resultado ya va arriba como ítem con puntaje; repetirlo acá
  // sería decir lo mismo dos veces. Este informativo queda solo para explicar por qué no hay
  // ítem.
  if (!encontroCasilla) {
    informativos.push({
      id: 'casilla',
      titulo: 'La casilla de tu formulario',
      detalle: 'En tu página de inicio no vimos un formulario con casilla de consentimiento. Si el tuyo viene de otro servicio (HubSpot, Typeform, Google Forms) o se arma con JavaScript, este chequeo no alcanza a verlo, así que no lo puntuamos.',
    });
  }
  informativos.push(
    {
      id: 'lang',
      titulo: 'El idioma de tu sitio',
      detalle: lang
        ? `Tu sitio declara en qué idioma está (${lang}). No es un requisito de la Ley 21.719. Lo miramos porque los lectores de pantalla y los buscadores lo usan.`
        // Sin el fragmento de código: era lo último que se leía del informe, lo menos importante
        // de todo, y la única vez que aparecía código crudo delante de alguien que no programa.
        : 'Tu sitio no declara en qué idioma está. No es un requisito de la Ley 21.719, pero los lectores de pantalla y los buscadores lo usan, y quien mantiene tu sitio lo deja listo en un minuto.',
    }
  );

  return {
    ok: true,
    dominio,
    revisado: home.url,
    puntaje,
    revisadoEn: new Date().toISOString(),
    bloques: [
      // Brief §2.6: lo que tiene que estar disponible al público son los 12 puntos, y la
      // política con su fecha y versión es uno de ellos, no el lugar donde van los 12.
      // El título ya no dice "Tu política de privacidad": en 8 de cada 22 sitios el cuerpo de
      // abajo dice que no la encontramos, y el dueño leía un título que afirmaba tenerla sobre
      // un párrafo que decía lo contrario. El bloque se llama por el tema, no por la posesión.
      { id: 'politica', titulo: 'La política de privacidad', sub: 'La ley pide que tu sitio publique, a la vista de cualquiera, 12 cosas sobre qué haces con los datos de las personas. Una de ellas es tu política, con su fecha y versión (Art. 14 ter).' },
      { id: 'seguridad', titulo: 'Seguridad básica del sitio', sub: 'No es uno de los 12 puntos del Art. 14 ter. Lo revisamos igual, porque de esto depende que lo que alguien escribe en tu sitio no lo pueda leer un tercero por el camino.' },
      // Con la casilla del formulario adentro, "Permiso para los rastreadores" ya no describe
      // el bloque entero. Y "rastreador" se explica acá, la primera vez que aparece: es la
      // palabra que más asusta del informe y nadie la traducía.
      encontroCasilla
        ? { id: 'consentimiento', titulo: 'Cómo pides permiso', sub: 'Un rastreador le manda a Google o a Meta lo que hace cada visitante en tu sitio. Acá miramos si pides permiso antes de cargarlos, y también la casilla del formulario donde alguien te deja sus datos.' }
        : { id: 'consentimiento', titulo: 'Permiso para los rastreadores', sub: 'Un rastreador le manda a Google o a Meta lo que hace cada visitante en tu sitio. Acá miramos si tu sitio pide permiso antes de cargarlos.' },
    ],
    items,
    // Cuánto peso pudimos confirmar y cuánto había en total. Con menos de la mitad, `puntaje`
    // viaja en null y estos dos números son la explicación.
    pesoConfirmado,
    pesoTotal,
    pendientes: items.filter((i) => i.estado === 'pendiente').length,
    sinConfirmar: items.filter((i) => i.estado === 'sin-confirmar').length,
    prioridades,
    informativos,
  };
}

// Por qué no abrió, cuando la respuesta es del sitio. El tiempo, la conexión y los 401/403/429
// ya no pasan por acá: son un límite nuestro y el ítem queda sin confirmar (ver `sinPoderLeer`).
// Sin "al abrirlo": la frase sigue tanto a "un enlace" como a "la dirección".
function motivoPolitica(falla) {
  if (!falla) return 'no la pudimos abrir';
  if (falla.portada) return 'lleva de vuelta a tu página de inicio';
  if (falla.falla === 'bucle') return 'esa página redirige de una dirección a otra sin parar';
  if (falla.falla === 'destino') return 'apunta a una dirección que este chequeo no sigue';
  if (falla.status === 404 || falla.status === 410) return 'lleva a una página que ya no está';
  return 'esa página devolvió un error';
}

// Lo que dice el Art. 12 sobre el consentimiento, con las palabras del brief §2.4. Sirve para
// el permiso de los rastreadores y para la casilla del formulario, y así las dos citas no se
// separan con el tiempo. La ley no dice "casilla" ni "banner": eso lo decimos nosotros, como
// forma habitual de cumplirla, y el texto lo presenta así.
const LEY_CONSENTIMIENTO = 'la ley pide que el consentimiento sea previo e inequívoco, y que se ' +
  'manifieste mediante un acto afirmativo (Art. 12)';

// La prueba casera para lo que no se ve desde afuera. Antes mandaba a abrir las herramientas de
// desarrollador de Chrome y a buscar la cookie _ga: eso es una instrucción para quien programa, no
// para la dueña de una clínica, y era la única acción que el informe le pedía. Ahora se le pide lo
// único que cualquiera puede ver con sus propios ojos — si aparece o no un aviso —, y lo que
// necesita un navegador queda dicho como lo que es, en REVISION_A_MANO.
const PRUEBA_INCOGNITO = 'abre tu sitio en una ventana de incógnito y no toques nada. Si alcanzas a ' +
  'navegar sin que aparezca ningún aviso de cookies, nadie está pidiendo permiso.';

// La revisión a mano no se ofrece como si viniera incluida: la hace una sola persona y cuesta
// horas. Y el precio se nombra antes de que alguien lo pida, no después: todo esto aparece en una
// página que regala el chequeo, así que sin esa línea se lee como parte de lo mismo. No se pone un
// número porque depende del sitio; se dice que se conversa primero.
const REVISION_A_MANO = 'Eso lo miramos a mano, aparte de este chequeo. Escríbenos y te decimos cuánto cuesta antes de hacer nada.';

function conMayuscula(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// Fallas de la página de la política que hablan de nuestro límite y no del sitio: se acabó el
// tiempo, no logramos conectar, o el sitio no deja entrar a un lector automático. Todas las
// demás (404, 410, bucle, 5xx, "vuelve a la portada") son el sitio respondiendo, y esas sí son
// un enlace que no lleva a ninguna parte.
function sinPoderLeer(f) {
  return f.falla === 'tiempo' || f.falla === 'conexion' || f.status === 401 || f.status === 403 || f.status === 429;
}

function listaLegible(nombres) {
  if (nombres.length <= 1) return nombres.join('');
  return nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1];
}

// "el Pixel de Meta" es el nombre acordado del producto, y detrás de la preposición "a" pide la
// contracción: sin esto el informe decía "los datos también llegan a el Pixel de Meta". Solo
// aplica al primer nombre de la lista, que es el único que va pegado a la preposición.
function aLista(nombres) {
  const lista = listaLegible(nombres);
  return lista.startsWith('el ') ? `al ${lista.slice(3)}` : `a ${lista}`;
}

/* ------------------------------------------------------------------ */

// no-store en TODAS las respuestas, también en los 400 y 500. Con el max-age=300 de antes, el
// navegador guardaba cinco minutos hasta el error: quien recibía "tu sitio no respondió a
// tiempo" y reintentaba, recibía el mismo error guardado sin que la petición saliera.
const CABECERAS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
};

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const dominio = url.searchParams.get('dominio') || '';
  try {
    const r = await chequear(dominio);
    return new Response(JSON.stringify(r), { status: r.ok ? 200 : 400, headers: CABECERAS });
  } catch {
    return new Response(
      JSON.stringify({ ok: false, tipo: 'sitio', error: 'No pudimos completar el chequeo. Inténtalo de nuevo.' }),
      { status: 500, headers: CABECERAS }
    );
  }
}
