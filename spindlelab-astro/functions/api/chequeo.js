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

// Presupuesto de subpeticiones para TODA la invocación. Cloudflare corta en 50 por invocación
// en el plan gratis: la que pasa la raya lanza, y con ella se cae el chequeo entero.
//
// Leyendo la portada sola primero (ver `leerPortada`), las dos formas del dominio gastan a lo
// más 18, así que el presupuesto nunca se acaba antes de saber si hay informe que dar. Lo que
// sí puede pasarse son las seis lecturas restantes: si las seis quedaran en un bucle que no
// repite dirección, querrían 6 × 9 = 54. Con este tope, el peor caso medido queda en 45.
//
// Cuando se agota, el chequeo declina con el mismo veredicto del bucle en vez de seguir con lo
// que alcanzó a leer. Es deliberado: una lectura que no hicimos no puede aparecer en el informe
// como una señal ausente ("no encontramos tu sitemap.xml"), porque eso es inventar.
const TOPE_SUBPETICIONES = 45;

function nuevoPresupuesto(tope = TOPE_SUBPETICIONES) {
  return {
    quedan: tope,
    agotado: false,
    gastar() {
      if (this.quedan <= 0) {
        this.agotado = true;
        return false;
      }
      this.quedan--;
      return true;
    },
  };
}

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

  // El www ya no se borra: se revisa el host tal como lo escribió la persona. Borrarlo dejaba
  // afuera a los sitios que solo contestan con www (clinicasantamaria.cl sin www no conecta,
  // bancoestado.cl sin www no tiene DNS, centroodontologicomaipu.cl sin www se redirige a sí
  // mismo), y ni escribiendo el www a propósito había forma de revisarlos. Si la forma escrita
  // no abre, `chequear` prueba la otra.
  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').replace(/\/.*$/, '');
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
  // Las direcciones ya pedidas en esta cadena. Si una redirección vuelve a una de ellas, el
  // bucle es seguro: pedimos sin cookies y siempre con las mismas cabeceras, así que la misma
  // URL nos va a contestar lo mismo. Cortar ahí da el mismo 508 que agotar los saltos, sin
  // gastar nueve peticiones por recurso. Y el gasto importaba: con los siete recursos en
  // paralelo eran 63 peticiones, y en vivo centroodontologicomaipu.cl (portada que se redirige
  // a sí misma) salía "No pudimos abrir el sitio" en 0,5 s, mientras que Node, con el mismo
  // código, llegaba al 508. Lo más probable es el tope de 50 subpeticiones por invocación de
  // Cloudflare en el plan gratis: la que pasa la raya falla y la cadena devuelve null. Sin
  // este corte, además, no quedaría margen para probar con www.
  const vistas = new Set();
  for (let salto = 0; salto <= MAX_SALTOS; salto++) {
    // El portón también avisa que fue él quien cortó (en `opts.rechazo`, si viene), porque
    // para `chequear` no es lo mismo "no conectó" que "nos mandó a un destino prohibido".
    if (!destinoPermitido(actual)) {
      if (opts.rechazo) opts.rechazo.destino = true;
      return null;
    }
    vistas.add(actual);
    // El presupuesto se gasta ANTES de pedir, no después: lo que cuenta para Cloudflare es la
    // petición que sale. Si no queda, esta lectura se corta como si no hubiera conectado, y
    // `chequear` mira `presupuesto.agotado` para decir qué pasó en vez de inventar un motivo.
    if (opts.presupuesto && !opts.presupuesto.gastar()) return null;
    const r = await pedirUna(actual, fetchImpl, opts, ctrl.signal);
    if (!r) return null;
    if (!r.redireccion) return r;
    actual = r.redireccion;
    if (vistas.has(actual)) break;
  }
  // Se acabaron los saltos, o la cadena volvió a una dirección ya pedida. Devolver null diría
  // "no pudimos abrir el sitio, revisa el dominio", y el dominio está bien: el problema es que
  // el sitio manda de una dirección a otra sin parar. Se devuelve 508 (Loop Detected) para que
  // salga con su propio mensaje, porque para el dueño esto es un hallazgo, no un error
  // nuestro. Ojo: el 508 lo ponemos nosotros, el sitio nunca lo respondió.
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

export function bloqueaBot(robotsTxt, bot) {
  if (!robotsTxt) return false; // sin robots.txt no hay bloqueo
  const lineas = robotsTxt.split(/\r?\n/).map((l) => l.replace(/#.*$/, '').trim());
  const objetivo = bot.toLowerCase();

  let agentes = [];
  let enGrupo = false;
  let previaEraAgente = false;
  const grupos = [];

  for (const l of lineas) {
    if (!l) continue;
    const m = l.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const campo = m[1].toLowerCase();
    const valor = m[2].trim();

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
      grupos.push({ agentes: [...agentes], campo, valor });
    }
  }

  const aplica = (lista) => lista.includes(objetivo);
  const reglas = grupos.filter((g) => aplica(g.agentes));
  const usar = reglas.length ? reglas : grupos.filter((g) => g.agentes.includes('*'));
  if (!usar.length) return false;

  // La regla más específica que matchea la raíz gana; empate lo gana Allow.
  let mejor = null;
  for (const r of usar) {
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
 * Lectura del HTML. Regex a propósito: no hay DOM en el runtime y     *
 * solo necesitamos presencia/ausencia de señales, no parsear el árbol.*
 * ------------------------------------------------------------------ */

function bloquesJsonLd(html) {
  const out = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      out.push(JSON.parse(m[1].trim()));
    } catch {
      /* bloque inválido: se ignora, y eso ya cuenta como que no aporta */
    }
  }
  return out;
}

function aplanar(nodo, acc = []) {
  if (Array.isArray(nodo)) {
    nodo.forEach((n) => aplanar(n, acc));
  } else if (nodo && typeof nodo === 'object') {
    acc.push(nodo);
    if (nodo['@graph']) aplanar(nodo['@graph'], acc);
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
  // "Tantas veces seguidas" dejó de ser cierto cuando `traer` empezó a cortar al volver a una
  // dirección ya pedida: una portada que se redirige a sí misma se corta en el primer salto.
  if (status === 508) {
    return 'Tu sitio nos mandó de una dirección a otra sin llegar nunca a una página, así que ' +
      'dejamos de seguirlo. Suele ser un bucle de redirecciones mal configurado, y no es solo un ' +
      'problema para este chequeo: alguien que entre a tu sitio puede quedarse dando vueltas.';
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

// Códigos que viajan en `codigo` pero que el servidor del sitio nunca respondió: el 508 lo
// ponemos nosotros cuando cortamos un bucle, el 530 es de Cloudflare cuando el nombre no lleva
// a ningún servidor, y el 525/526 es el runtime diciendo que el certificado no sirvió. La
// página mostraba todos como "Código de respuesta de tu sitio", y en estos cuatro eso es falso.
const CODIGOS_AJENOS = new Set([508, 525, 526, 530]);

// Cuándo la forma escrita del dominio "no abrió", en el sentido de que vale la pena probar la
// otra (con o sin www): no conectó, no tiene DNS, el certificado no sirve o redirige en
// círculo. Cualquier otra respuesta, aunque sea un 403 o un 404, es el sitio contestando, y
// ahí probar otra dirección sería revisar algo distinto de lo que la persona escribió.
//
// Una redirección que el portón rechazó tampoco cuenta, aunque `traer` devuelva null igual
// que cuando no conecta: ahí el sitio sí contestó, y lo que dijo fue "anda a otra parte", a
// un destino que no pedimos. Es la misma regla que Verifica y Cumple.
function noAbrio(lectura) {
  if (!lectura.home) return !lectura.portadaRechazada;
  return CODIGOS_AJENOS.has(lectura.home.status);
}

// Lo que se dice en el resultado cuando revisamos la otra forma del dominio.
const POR_QUE_NO_ABRIO = {
  508: 'nos mandó de una dirección a otra sin llegar nunca a una página',
  525: 'tiene un certificado de seguridad que no sirve',
  526: 'tiene un certificado de seguridad que no sirve',
  530: 'no apunta a ningún sitio publicado',
};

// La otra forma del dominio: sin www si se escribió con www, y con www si no. Pasa por el
// mismo validador que lo que escribe la persona, así que "www.cl" no se convierte en "cl" y
// un nombre que ya es muy largo no crece más allá del límite.
function otraForma(host) {
  const otra = host.startsWith('www.') ? host.slice(4) : `www.${host}`;
  const v = normalizarDominio(otra);
  return v.error || v.dominio !== otra ? null : otra;
}

/* ------------------------------------------------------------------ *
 * Un 200 que en realidad es una página de bloqueo                      *
 * ------------------------------------------------------------------ */

// www.bancoestado.cl le contesta a nuestro lector un 200 de 650 bytes, sin <html>, <head> ni
// <title>, que dice "se ha restringido este acceso". El chequeo lo puntuaba como si fuera la
// portada: 60/100, con señales en rojo que el sitio real a lo mejor sí tiene. Es el mismo
// informe inventado que la guardia del HTML vacío quiere evitar, solo que acá el firewall
// entrega un aviso en vez de una página en blanco.
//
// Condiciones que se tienen que cumplir todas, para no atrapar una portada chica de verdad
// (la cuarta, el largo del texto, está junto a su tope más abajo):
// 1. Pesa poco. Los avisos de bloqueo que vimos van de 250 bytes a unos pocos KB; una portada
//    real con su menú, su pie y su <head> casi nunca baja de esto.
// 2. Casi no tiene enlaces. Un aviso trae a lo más uno ("volver", el logo); un sitio chico
//    igual tiene su menú.
// 3. Su texto visible dice que es un bloqueo, con frases de los avisos de firewall en español
//    y en inglés. No basta "captcha" ni "robot" sueltos: una landing de una sola página, con su
//    formulario y el pie "protegido por reCAPTCHA" (que trae dos enlaces, a la política y a las
//    condiciones de Google), cumpliría las otras tres condiciones y se quedaría sin informe,
//    justo el tipo de sitio para el que existe este chequeo. Medido el 23-sep (R3): con la
//    palabra suelta, esa landing recibía "tu sitio no nos entregó HTML", que encima es falso.
//    Un desafío de navegador de verdad no necesita la palabra: trae la frase entera ("verifica
//    que eres humano"), y la frase entera no aparece en el pie de un formulario. Las dos
//    páginas están en la sección 12 de prueba-gemelo-completa.mjs. Verifica y Cumple tiene el
//    mismo detector y la misma regla: si uno de los dos cambia, el otro va detrás.
//    Por lo mismo quedaron fuera "just a moment" (una página de "volvemos pronto" lo puede
//    decir) y "nuestros sistemas de seguridad" (un banco chico lo puede decir en su portada).
// Lo que no calza con todas se puntúa como siempre: preferimos dejar pasar un bloqueo raro
// antes que negarle el informe a un sitio chico que sí se dejó leer. Los desafíos de
// Cloudflare y compañía casi siempre vienen con 403 o 503, y esos ya tienen su propio mensaje.
// Los dos topes son GEMELOS de los de verificaycumple/functions/api/chequeo.js: una página de
// hasta 16.000 caracteres y con dos enlaces o menos. El 23-sep cada archivo llevaba números
// propios (acá 16.000 y 3 enlaces, allá 50.000 y 2), así que la misma página recibía un
// veredicto distinto en cada chequeo, y los dos sitios se enlazan entre sí. Quedó el par más
// estrecho de los dos lados: el aviso de firewall más grande que medimos no llega a 16.000
// caracteres y el que más enlaces trae tiene uno, así que ninguno de los avisos reales se
// escapa. Bajar el tope de enlaces de 3 a 2 solo puede devolverle el informe a una página que
// antes se quedaba sin él, nunca quitárselo.
//
// Los dos conteos de enlaces no son idénticos, y la diferencia va a favor del sitio: acá se
// cuenta toda etiqueta <a>, allá solo las que llevan href. Una página con anclas sin href
// llega antes al tope acá, o sea que la damos por página normal y le entregamos su informe.
const TOPE_PAGINA_BLOQUEO = 16_000;
const MAX_ENLACES_BLOQUEO = 2;
// GEMELA de verificaycumple/functions/api/chequeo.js (su RE_TEXTO_BLOQUEO). Las dos listas
// son la misma, alternativa por alternativa y en el mismo orden, y los dos topes de arriba
// también: si una cambia, la otra va detrás en el mismo cambio. El 23-sep se comprobó byte a
// byte (md5 3f61d331c8c8d16d8b20f8129f7b2ec2 sobre el bloque completo en los dos archivos).
//
// Una versión anterior de este comentario daba la alineación por hecha cuando todavía no lo
// era: el 23-sep los dos archivos decían estar alineados y un reproductor encontró 6
// discrepancias sobre 11 páginas. Esta vez se comparó el texto literal de las dos listas,
// alternativa por alternativa, y se volvió a medir con las 11 páginas.
//
// Lo que quedó fuera a propósito, porque se comía portadas reales de pyme: las raíces sueltas
// `restringid` ("Zona restringida solo para residentes"), `bloquead` ("¿Acceso bloqueado a tu
// casa?", de una cerrajería) y `forbidden` (ya cubierta por "403 forbidden"), y el patrón
// flojo `verify (that )?you` ("We will verify your email before booking"). Ninguna alternativa
// es una palabra suelta: todas son frases que nadie escribe sin querer en la portada de su
// negocio.
const RE_TEXTO_BLOQUEO = new RegExp([
  'se ha restringido', 'acceso (restringido|denegado|bloqueado)', 'ha sido bloquead',
  'no cumple con nuestra politica de seguridad',
  'access (denied|blocked|restricted)', 'has been (denied|blocked)', 'you have been blocked',
  'request (was )?(rejected|blocked|unsuccessful)', 'requested url was rejected',
  'incapsula incident', 'pardon our interruption',
  'checking (your browser|if the site connection is secure)', 'enable javascript and cookies to continue',
  'verify (that )?you are (a )?human', 'verifica(r)? que eres (un )?humano', '403 forbidden',
  'attention required', 'unusual traffic', 'trafico inusual', 'are you a (human|robot)',
  'demuestra que (no )?eres', 'comprobacion de seguridad', 'security check',
].join('|'));

// El texto visible de una página chica, en minúsculas y sin tildes, para compararlo con las
// frases de arriba. A mano y no con un regex de etiquetas: `<[^>]*>` sobre un texto lleno de
// "<" sin cerrar se vuelve cuadrático, y esto tiene que ser lineal aunque el sitio sea hostil.
// El contenido de <script> y <style> se salta: no es lo que ve una persona, y un sitio de una
// sola página puede traer en su código un mensaje de error cualquiera.
function textoVisibleChico(html) {
  const bajo = html.toLowerCase();
  let out = '';
  let i = 0;
  while (i < bajo.length) {
    const lt = bajo.indexOf('<', i);
    if (lt === -1) { out += bajo.slice(i); break; }
    out += bajo.slice(i, lt) + ' ';
    let fin;
    const esScript = bajo.startsWith('<script', lt);
    if (esScript || bajo.startsWith('<style', lt)) {
      const cierre = bajo.indexOf(esScript ? '</script' : '</style', lt);
      fin = cierre === -1 ? -1 : bajo.indexOf('>', cierre);
    } else {
      fin = bajo.indexOf('>', lt);
    }
    // Una etiqueta que nunca cierra: lo que queda no es texto que alguien vea.
    if (fin === -1) break;
    i = fin + 1;
  }
  return out
    // bancoestado escribe "pol&iacute;tica": las tildes llegan como entidad o como carácter.
    .replace(/&([a-z])(acute|grave|tilde|uml|circ);/g, '$1')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

// Y un aviso es corto: el de bancoestado tiene unos 330 caracteres de texto. Una página chica
// que menciona un "acceso restringido" entre varios párrafos es una página, no un aviso. Es el
// mismo tope de texto que usa la guardia de Verifica y Cumple.
const MAX_TEXTO_BLOQUEO = 1500;

export function esPaginaDeBloqueo(html) {
  if (html.length > TOPE_PAGINA_BLOQUEO) return false;
  // "<a " o "<a>": un conteo lineal, sin mirar qué hay dentro de la etiqueta.
  const enlaces = (html.match(/<a[\s>]/gi) || []).length;
  if (enlaces > MAX_ENLACES_BLOQUEO) return false;
  const texto = textoVisibleChico(html);
  if (texto.length > MAX_TEXTO_BLOQUEO) return false;
  return RE_TEXTO_BLOQUEO.test(texto);
}

// La portada, sola y primero. Antes las siete lecturas del host salían juntas, y eso costaba
// caro con un sitio que redirige en círculo sin repetir dirección (el corte por `vistas` no lo
// atrapa): cada lectura gastaba MAX_SALTOS + 1 peticiones, o sea 63 por host y 126 probando las
// dos formas del dominio, contra las 50 que permite una invocación en el plan gratis. El
// precio no era solo el gasto: la lectura de la otra forma se caía entera, así que a un dominio
// con el www sano le decíamos "no pudimos abrir tu sitio, ni con www ni sin www" sin haberlo
// llegado a pedir. Medido con un fetch que lanza desde la subpetición 51: 126 antes, 18 ahora.
// Con la portada aparte, un host que no abre cuesta a lo más 9 peticiones, y las otras seis
// salen recién cuando sabemos en qué host hay informe que dar.
async function leerPortada(host, fetchImpl, presupuesto) {
  const rechazo = {};
  const home = await traer(`https://${host}/`, fetchImpl, { rechazo, presupuesto });
  return { host, home, portadaRechazada: !!rechazo.destino };
}

// Las otras seis lecturas, en paralelo como siempre y en el host cuya portada sí contestó: el
// robots.txt y el sitemap que valen son los del sitio que se está informando. Todas salen por
// `traer`, o sea por el portón de destinos y las redirecciones a mano.
async function leerResto(host, fetchImpl, presupuesto) {
  const [robots, llms, sitemap, sondaOAI, sondaChatGPT, sondaPerplexity] = await Promise.all([
    traer(`https://${host}/robots.txt`, fetchImpl, { presupuesto }),
    traer(`https://${host}/llms.txt`, fetchImpl, { presupuesto }),
    traer(`https://${host}/sitemap.xml`, fetchImpl, { presupuesto }),
    // Sondas de suplantación: pedimos la portada presentándonos como robots de IA en vivo,
    // para detectar servidores/CDN que expulsan por nombre de agente (el robots.txt puede
    // estar impecable y el sitio seguir cerrado).
    traer(`https://${host}/`, fetchImpl, { soloStatus: true, presupuesto, ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot' }),
    traer(`https://${host}/`, fetchImpl, { soloStatus: true, presupuesto, ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot' }),
    traer(`https://${host}/`, fetchImpl, { soloStatus: true, presupuesto, ua: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)' }),
  ]);
  return { robots, llms, sitemap, sondaOAI, sondaChatGPT, sondaPerplexity };
}

// El 508 lo ponemos nosotros, no el sitio: es lo que devolvemos cuando cortamos una cadena de
// redirecciones, sea porque volvió a una dirección ya pedida, porque se acabaron los saltos o
// porque se acabó el presupuesto de subpeticiones de toda la invocación.
const veredictoBucle = () => ({
  ok: false,
  error: mensajeDeFallo(508),
  codigo: 508,
  codigoDelSitio: false,
});

export async function chequear(entrada, fetchImpl = fetch) {
  const v = normalizarDominio(entrada);
  if (v.error) return { ok: false, error: v.error };

  const presupuesto = nuevoPresupuesto();

  // Primero la portada del host tal como se escribió. Si no abre, la portada de la otra forma
  // (con o sin www). Las otras seis lecturas salen después, una sola vez y en el host que
  // contestó, porque el robots.txt y el sitemap que valen son los del sitio que sí contesta y
  // porque un host que no abre no puede gastarse el presupuesto de subpeticiones de los dos
  // (ver `leerPortada`). Cada intento tiene su propio reloj de TIMEOUT_MS, así que la
  // peor espera es de dos relojes y no de uno por cada lectura: medido con un fetch que nunca
  // contesta, 16 s cuando ni el host escrito ni su otra forma conectan, y 8 s cuando el
  // escrito se cuelga y el otro contesta al tiro (antes eran 8 s y un "revisa el dominio").
  //
  // No se prueba http:// por nuestra cuenta, a diferencia de Verifica y Cumple. Este chequeo
  // nunca lo hizo (sí sigue una redirección que lleve ahí) y hacerlo cambiaría lo que el
  // informe le dice a un sitio con el certificado roto, que hoy recibe su propio mensaje en
  // vez de un puntaje. Esa es una decisión de producto aparte, no parte de arreglar el www.
  let lectura = await leerPortada(v.dominio, fetchImpl, presupuesto);
  let aviso = null;
  // Si al final no hay portada, el mensaje depende de qué alcanzamos a probar: no se puede
  // decir "ni con www ni sin www" si la otra forma nunca se pidió.
  let probamosLasDos = false;
  if (noAbrio(lectura)) {
    const otra = otraForma(v.dominio);
    if (otra) {
      probamosLasDos = true;
      const segunda = await leerPortada(otra, fetchImpl, presupuesto);
      // Si la otra forma tampoco abre, se informa lo del host escrito: es lo que la persona
      // preguntó, y decirle "no encontramos www.x.cl" cuando escribió x.cl confunde. Lo mismo si
      // la otra forma solo nos mandó a un destino prohibido: no hay portada que mostrar.
      if (segunda.home && !noAbrio(segunda)) {
        const porQue = (lectura.home && POR_QUE_NO_ABRIO[lectura.home.status]) || 'no respondió';
        aviso = `Revisamos ${otra} porque ${v.dominio} ${porQue}. Conviene corregirlo: hay quien ` +
          `escribe tu dirección ${otra.startsWith('www.') ? 'sin' : 'con'} www.`;
        lectura = segunda;
      }
    }
  }
  const { host: dominio, home } = lectura;

  if (!home || home.status >= 400) {
    // Antes era siempre "No pudimos abrir el sitio. Revisa el dominio o inténtalo de nuevo.",
    // también después de probar con y sin www, y también cuando las dos formas se colgaron.
    // A quien escribió bien su dominio le pedíamos revisarlo por un límite nuestro (un tiempo
    // de espera). `traer` no distingue un tiempo de espera de una conexión rechazada, así que
    // el mensaje nombra las dos cosas en vez de culpar a lo escrito.
    if (!home && lectura.portadaRechazada) {
      // El sitio sí contestó: nos mandó a una dirección que el portón no deja seguir.
      return {
        ok: false,
        error: 'Tu sitio nos mandó a una dirección que este chequeo no puede seguir, así que no ' +
          'alcanzamos a leer la portada.',
      };
    }
    if (!home) {
      // Si lo que se acabó fue el presupuesto de subpeticiones, el sitio no está caído ni lento:
      // nos mandó de una dirección a otra hasta agotarlo. Decir "no pudimos abrir tu sitio, ni
      // con www ni sin www" sería falso, y encima culparía al dueño de algo que no pasó.
      if (presupuesto.agotado) return veredictoBucle();
      return {
        ok: false,
        error: probamosLasDos
          ? 'No pudimos abrir tu sitio, ni con www ni sin www. Si el dominio está bien escrito, ' +
            'puede que esté caído o lento en este momento: vuelve a intentarlo en un rato.'
          : 'No pudimos abrir tu sitio. Si el dominio está bien escrito, puede que esté caído o ' +
            'lento en este momento: vuelve a intentarlo en un rato.',
      };
    }
    // `codigoDelSitio` le dice a la página si puede presentar el número como respuesta del
    // sitio o solo como referencia para cuando alguien nos escribe.
    return {
      ok: false,
      error: mensajeDeFallo(home.status),
      codigo: home.status,
      codigoDelSitio: !CODIGOS_AJENOS.has(home.status),
    };
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

  // El mismo problema con otra cara: un 2xx que trae HTML, pero es el aviso de un firewall y
  // no la portada (ver esPaginaDeBloqueo). No hay `codigo`: el 200 no dice nada útil, y la
  // página lo mostraría como "código de respuesta de tu sitio" al lado de un bloqueo.
  if (esPaginaDeBloqueo(home.texto)) {
    return {
      ok: false,
      error:
        'Tu sitio no deja entrar a lectores automáticos como el nuestro: en vez de la portada, ' +
        'nos mostró un aviso de bloqueo, así que no hay informe. Suele ser un firewall o una ' +
        'regla de seguridad, y vale la pena mirarlo, porque lo mismo le puede estar pasando a ' +
        'los robots de IA. Escríbenos a hola@spindlelab.cl y lo revisamos a mano.',
    };
  }

  // Recién acá, cuando ya sabemos que hay informe que dar y en qué host, salen las otras seis
  // lecturas. Un sitio que no abre, que nos entrega un aviso de firewall o que pesa más de lo
  // que alcanzamos a leer ya no cuesta siete peticiones por host: cuesta una.
  const { robots, llms, sitemap, sondaOAI, sondaChatGPT, sondaPerplexity } =
    await leerResto(dominio, fetchImpl, presupuesto);

  // Si el presupuesto se agotó, alguna de esas lecturas se cortó sin llegar a pedirse, y lo que
  // no se pidió no se puede informar: un `llms` en null se lee más abajo como "no encontramos
  // /llms.txt", que sería una señal ausente inventada. Preferimos no dar informe y decir lo que
  // de verdad pasó, que es el mismo bucle de redirecciones de siempre.
  if (presupuesto.agotado) return veredictoBucle();

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
  //
  // Qué cuenta como "no pudimos leerlo": todo lo que no sea un 200 que llegó entero, o una
  // respuesta que diga que el archivo no existe (404 y 410). La versión anterior solo miraba
  // el "no respondió" y el 200 cortado, así que un 403, un 401, un 429, un 5xx o el 508 que
  // ponemos nosotros al cortar un bucle dejaban `robotsTxt` en vacío, y el vacío se lee más
  // abajo como "no tienes robots.txt, así que nada está bloqueado": tres señales en verde y
  // 16 puntos de regalo por un archivo que nunca leímos. Un firewall que deja pasar la
  // portada y bloquea /robots.txt es corriente. Medido el 23-sep con una portada sana: 403,
  // 401, 429 y 500 daban exactamente el mismo informe que un 404.
  const robotsTxt = robots && robots.status === 200 ? robots.texto : '';
  const robotsIlegible =
    !robots ||
    (robots.status !== 200 && robots.status !== 404 && robots.status !== 410) ||
    (robots.status === 200 && !robots.completo);
  const nodos = aplanar(bloquesJsonLd(html));

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]
    .replace(/\s+/g, ' ')
    .trim();
  const desc = (html.match(
    /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i
  ) || [, ''])[1].trim();
  const h1s = html.match(/<h1[\s>]/gi) || [];
  const entidad = nodos.find((n) => tieneTipo(n, TIPOS_ENTIDAD));
  const sameAsN = Math.max(
    0,
    ...nodos.map((n) => {
      const s = n.sameAs;
      return Array.isArray(s) ? s.length : typeof s === 'string' && s ? 1 : 0;
    })
  );
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
  const preguntas = (html.match(/<h[23][^>]*>[^<]*\?[^<]*<\/h[23]>/gi) || []).length;
  const texto = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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
  // Cada ítem tiene un estado, no un sí/no:
  //   'ok'            lo miramos y está bien
  //   'pendiente'     lo miramos y hay algo que corregir
  //   'sin-confirmar' no lo pudimos medir, así que no suma ni resta
  // El tercero existe porque un "no lo sabemos" no puede aparecer como un verde (sería
  // inventar) ni como un rojo (sería castigar al sitio por un límite nuestro). Es el mismo
  // contrato que usa Verifica y Cumple.
  //
  // El tercer argumento acepta también un booleano, que significa lo de siempre ('ok' o
  // 'pendiente'): los 15 ítems que solo pueden estar bien o mal se siguen escribiendo con la
  // condición pelada, y solo los seis que pueden quedar sin medir nombran su estado.
  // `ok` sigue viajando en la respuesta (=== estado 'ok') porque la página lo usa.
  const estadoDe = (x) => (typeof x === 'string' ? x : x ? 'ok' : 'pendiente');
  const add = (bloque, id, titulo, estadoOBool, peso, detalle, arregloSiFalla) => {
    const estado = estadoDe(estadoOBool);
    items.push({
      bloque, id, titulo, estado, ok: estado === 'ok', peso, detalle,
      arreglo: estado === 'ok' ? null : arregloSiFalla,
    });
  };

  // --- Bloque 1: ¿te pueden leer? (v2: en-vivo pesa, entrenamiento informa) ---
  const caveatCf = trasCloudflare
    ? ' Tu sitio usa Cloudflare: si activaste sus reglas de bots de IA en el borde, este chequeo no las ve; confírmalo abriendo tu propio /robots.txt.'
    : '';
  const sinRobots = robotsIlegible || robotsTxt
    ? null
    : robots && robots.status === 200
      // Un 200 con el archivo vacío sí lo leímos: existe y no bloquea a nadie. Decir "no
      // tienes robots.txt" ahí sería afirmar algo que acabamos de ver que no es así.
      ? 'Tu robots.txt está vacío, así que no bloquea a nadie.'
      : 'No tienes robots.txt, así que nada está bloqueado.';
  // Por qué no lo pudimos leer. El motivo importa y se dice: no es lo mismo que el archivo no
  // haya contestado a que tu sitio nos haya respondido que no tenemos permiso para leerlo.
  const porQueIlegible = () => {
    if (!robots) return 'Tu robots.txt no respondió';
    if (robots.status === 508) {
      return 'Tu robots.txt nos mandó de una dirección a otra sin llegar nunca al archivo';
    }
    if (robots.status === 401 || robots.status === 403) {
      return 'Tu sitio no nos dejó leer tu robots.txt: respondió que no tenemos permiso';
    }
    if (robots.status === 429) return 'Tu sitio nos pidió bajar el ritmo y no nos entregó el robots.txt';
    if (robots.status >= 500) return 'Tu robots.txt respondió con un error de tu propio servidor';
    if (robots.status === 200) {
      return 'Tu robots.txt no nos llegó entero, y la regla que bloquea podría estar justo en la parte que no alcanzamos a leer';
    }
    return 'Tu robots.txt respondió algo que no pudimos leer';
  };
  const noSabemos = !robotsIlegible
    ? null
    : `${porQueIlegible()}, así que no sabemos si bloquea a estos robots. Esta señal no suma ni ` +
      'resta en tu puntaje: preferimos decírtelo antes que darte un verde que no medimos.';
  // El dominio va escrito, no como marcador de posición: el informe nombra el sitio real más
  // arriba, así que un "tu-dominio.cl" al lado se lee como una plantilla que no se alcanzó a
  // rellenar, y cae justo en el ítem cuyo trabajo es ganar confianza diciendo que no sabemos.
  const arregloIlegible = `Ábrelo tú en ${dominio}/robots.txt y revisa si hay una línea Disallow para estos robots. Si quieres, escríbenos a hola@spindlelab.cl y lo miramos contigo.`;
  // Un bloqueo que SÍ leímos es un bloqueo real y se informa, aunque el archivo haya llegado
  // cortado. Lo que no se puede es lo contrario: sin el archivo completo no hay verde.
  const estadoRobots = (bloqueados) =>
    bloqueados.length ? 'pendiente' : robotsIlegible ? 'sin-confirmar' : 'ok';

  const bloqIdx = botsIndices.filter((b) => bloqueaBot(robotsTxt, b));
  add(
    'acceso', 'bots-indices', 'Los índices de búsqueda de IA pueden entrar', estadoRobots(bloqIdx), 7,
    bloqIdx.length
      ? `Tu robots.txt bloquea a ${bloqIdx.join(', ')}. Estos robots construyen los índices con los que ChatGPT, Claude y Perplexity buscan en la web: con ellos cerrados, no puedes aparecer como fuente en sus respuestas de hoy.`
      : (noSabemos || sinRobots || `OAI-SearchBot, Claude-SearchBot y PerplexityBot no están bloqueados en tu robots.txt.${caveatCf}`),
    bloqIdx.length
      ? `Quita la regla que bloquea a ${bloqIdx.join(', ')} en tu robots.txt. Es un cambio de una línea y el efecto es inmediato.`
      : arregloIlegible
  );

  const bloqAsis = botsAsistentes.filter((b) => bloqueaBot(robotsTxt, b));
  add(
    'acceso', 'bots-asistentes', 'Los asistentes de IA pueden visitarte en vivo', estadoRobots(bloqAsis), 7,
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
  // Una prueba que no contestó no dice nada, ni a favor ni en contra. Antes bastaba con que
  // NADIE hubiera recibido un 4xx para salir en verde, y eso incluía el caso en que las tres
  // pruebas se cayeron: 8 puntos por algo que no llegamos a medir, con el detalle escondido
  // (la página solo muestra el detalle de lo que no cumple, así que el "no pudimos" no se
  // leía en ninguna parte). Es la misma clase de falso verde que el Consent Mode en Verifica
  // y Cumple. Ahora, si falta aunque sea una respuesta, la señal queda sin confirmar y fuera
  // del puntaje. Un 4xx que SÍ vimos sigue contando en contra: eso lo medimos.
  const respondieron = sondas.filter(([, r]) => !!r);
  const expulsados = respondieron.filter(([, r]) => home.status === 200 && r.status >= 400);
  const faltan = sondas.filter(([, r]) => !r).map(([n]) => n);
  const estadoSondas = expulsados.length ? 'pendiente' : faltan.length ? 'sin-confirmar' : 'ok';
  const noContesto = faltan.length === 1 ? 'no alcanzó a responder' : 'no alcanzaron a responder';
  add(
    'acceso', 'servidor-ua', 'El servidor no expulsa a los robots de IA', estadoSondas, 8,
    expulsados.length
      ? `Pedimos tu portada presentándonos como cada robot: ${expulsados.map(([n, r]) => `${n} recibió un ${r.status}`).join('; ')}. Un navegador normal recibe la página. Esto no está en el robots.txt: lo hace el servidor o el CDN, normalmente una regla de seguridad que alguien activó sin saber qué apagaba.`
      : faltan.length === sondas.length
        ? 'Pedimos tu portada presentándonos como cada robot de IA y tu sitio no alcanzó a responder a ninguna de las tres, así que no sabemos si los deja entrar. Esta señal no suma ni resta en tu puntaje.'
        : faltan.length
          ? `Pedimos tu portada presentándonos como cada robot de IA: ${respondieron.map(([n]) => n).join(' y ')} recibieron la página, y ${faltan.join(' y ')} ${noContesto}. Con una prueba a medias no podemos afirmar que tu servidor los deje entrar a todos, así que esta señal no suma ni resta en tu puntaje.`
          : `Pedimos tu portada presentándonos como OAI-SearchBot, ChatGPT-User y PerplexityBot, y todas recibieron la página. Ojo: nuestras peticiones salen de nuestro servidor, no de los de OpenAI o Perplexity, así que un filtro por dirección de origen no lo veríamos.${trasCloudflare ? ' Y tu sitio usa Cloudflare: una regla del borde podría tratar distinto al robot real.' : ''}`,
    estadoSondas === 'sin-confirmar'
      ? 'Vuelve a correr el chequeo en un rato. Si tu sitio responde a las tres pruebas, te decimos si deja entrar a los robots de IA.'
      : 'Pídele a quien administre el hosting o el CDN que permita el paso a estos agentes. En Cloudflare suele estar en la regla de bots o en el modo "Bloquear rastreadores de IA".'
  );

  const bloqEnt = botsEntrenamiento.filter((b) => bloqueaBot(robotsTxt, b));
  add(
    'acceso', 'bots-entrenamiento', 'Robots de entrenamiento: decisión consciente', estadoRobots(bloqEnt), 2,
    bloqEnt.length
      ? `Bloqueas a ${bloqEnt.join(', ')}. Esto NO te quita citas hoy: estos robots recogen texto para entrenar modelos futuros, y es una decisión legítima sobre tu propiedad intelectual. Solo conviene que sea una decisión tomada, no una casilla que alguien marcó pensando que protegía la visibilidad.`
      : (noSabemos || sinRobots || `GPTBot, ClaudeBot, Google-Extended y CCBot pueden recoger tu texto para modelos futuros.${caveatCf}`),
    bloqEnt.length
      ? 'Si fue a propósito, déjalo así. Si no sabías que estaba, decide: a cambio de nada hoy, renuncias a que los modelos de dentro de dos años sepan de ti sin buscarte.'
      : arregloIlegible
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
  // Los dos archivos sueltos (llms.txt y sitemap.xml) se leen con el mismo criterio que el
  // robots.txt: manda lo que llegó, no el código de respuesta.
  //
  // El ítem del llms.txt no lo hacía, y ahí estaba el mismo falso verde que el Consent Mode en
  // Verifica y Cumple: verde porque algo venía declarado (un 200) mientras lo que sí miramos
  // (el cuerpo) decía lo contrario. Medido en vivo el 23-sep: www.clinicasantamaria.cl
  // responde a /llms.txt con un 302 a "/", así que recibíamos 1,7 MB del HTML de su propia
  // portada y le decíamos al dueño "Encontramos /llms.txt", con 4 puntos en verde, por un
  // archivo que no existe. Lo mismo pasa sin redirección en los hostings que contestan la
  // portada a cualquier ruta. El ítem del sitemap ya usaba el criterio bueno para esto: pide
  // ver un <urlset, no un 200.
  //
  // Y al otro lado faltaba el tercer estado. Un 403, un 429, un 5xx o un archivo que no
  // respondió salían como "No encontramos /llms.txt", que es una afirmación que no medimos, y
  // encima restaban 4 puntos por un límite de lectura nuestro. Es el mismo caso del robots.txt
  // que se cerró más arriba. Ahora hay tres desenlaces:
  //   está el archivo                                      -> verde
  //   el sitio nos dijo que no está, o nos dio su portada   -> rojo, y eso lo medimos
  //   no nos dejó leerlo                                    -> no lo sabemos: ni suma ni resta
  //
  // Cómo se lee uno de esos archivos. Mismo criterio y mismo tono que el del robots.txt, más
  // arriba. Devuelve null cuando SÍ llegó algo legible en la dirección que pedimos, y cada
  // ítem decide ahí si eso que llegó le sirve.
  const archivoNoLlego = (r, ruta, nombre) => {
    const noSabemos = (motivo) => ({
      estado: 'sin-confirmar',
      detalle:
        `Pedimos tu ${ruta} y ${motivo}, así que no sabemos si lo tienes. Esta señal no suma ` +
        'ni resta en tu puntaje: preferimos decírtelo antes que darte un verde que no medimos.',
    });
    const noEsta = (detalle) => ({ estado: 'pendiente', detalle });
    if (!r) return noSabemos('no hubo respuesta');
    if (r.status === 508) return noSabemos('nos mandó de una dirección a otra sin llegar nunca al archivo');
    if (r.status === 401 || r.status === 403) return noSabemos('tu sitio respondió que no tenemos permiso para leerlo');
    if (r.status === 429) return noSabemos('tu sitio nos pidió bajar el ritmo en vez de entregárnoslo');
    if (r.status >= 500) return noSabemos('respondió con un error de tu propio servidor');
    // Un 404 y un 410 son el sitio diciéndonos que el archivo no está. Eso sí lo medimos.
    if (r.status === 404 || r.status === 410) return noEsta(`No encontramos ${ruta}.`);
    if (r.status !== 200) return noSabemos('respondió algo que no pudimos leer');
    // Con un 200 manda el cuerpo, no el código.
    const dir = (r.url || '').split('?')[0].split('#')[0].toLowerCase();
    if (dir.slice(-ruta.length) !== ruta) {
      return noEsta(`Pedimos ${ruta} y tu sitio nos llevó a otra dirección, así que ahí no está ${nombre}.`);
    }
    // La cabeza basta y deja el trabajo acotado: un archivo de texto no empieza con <html.
    if (/<!doctype\s+html|<html[\s>]/i.test(r.texto.slice(0, 500))) {
      return noEsta(
        `Pedimos ${ruta} y lo que llegó es una página web, no el archivo. Es lo que hace un ` +
        `servidor que responde la portada en cualquier dirección que no existe, así que ${nombre} no está.`
      );
    }
    if (!r.texto.trim()) {
      // Vacío de verdad es un hallazgo; vacío porque no alcanzamos a leer nada, no. La regla
      // vieja ("un 200 que no leímos entero igual prueba que el archivo está") daba verde sin
      // haber visto un solo byte, que es el mismo verde sin medir que vinimos a sacar.
      return r.completo
        ? noEsta(`Tu ${ruta} está, pero vacío, así que no le dice nada a nadie.`)
        : noSabemos('no nos llegó entero y no alcanzamos a ver qué era');
    }
    return null;
  };
  const abreloTu = (ruta) =>
    `Ábrelo tú en ${dominio}${ruta} y revisa si está. Si quieres, escríbenos a hola@spindlelab.cl y lo miramos contigo.`;

  // Un 200 que no alcanzamos a leer entero igual prueba que el archivo está ahí, siempre que
  // lo que alcanzamos a leer se parezca al archivo y no a una página web.
  const llmsFalla = archivoNoLlego(llms, '/llms.txt', 'tu llms.txt');
  add(
    'citabilidad', 'llms', 'Tienes llms.txt',
    llmsFalla ? llmsFalla.estado : 'ok', 4,
    llmsFalla ? llmsFalla.detalle : 'Encontramos /llms.txt.',
    llmsFalla && llmsFalla.estado === 'sin-confirmar'
      ? abreloTu('/llms.txt')
      : 'Publica un llms.txt: le dice a los motores qué eres y qué páginas importan.'
  );
  add(
    'citabilidad', 'faq', 'Tienes preguntas frecuentes marcadas', conFaq, 6,
    conFaq ? 'Encontramos FAQPage en tu schema.' : 'No hay FAQPage en tu schema.',
    'Marca tus preguntas frecuentes con FAQPage. Es el formato que la IA cita textual.'
  );
  // Acá manda el contenido por encima de la dirección: un sitemap que redirige a su índice
  // (/sitemap_index.xml, lo que hace Yoast y medio WordPress chileno) es un sitemap que
  // encontramos, y la redirección no lo puede convertir en ausencia.
  const sitemapValido = !!sitemap && sitemap.status === 200 && /<urlset|<sitemapindex/i.test(sitemap.texto);
  const sitemapFalla = sitemapValido
    ? null
    : archivoNoLlego(sitemap, '/sitemap.xml', 'tu sitemap') || {
        estado: 'pendiente',
        detalle: 'Pedimos /sitemap.xml y lo que llegó no trae la lista de direcciones que declara un sitemap, así que no le sirve a un buscador.',
      };
  add(
    'citabilidad', 'sitemap', 'Tienes sitemap.xml',
    sitemapFalla ? sitemapFalla.estado : 'ok', 4,
    sitemapFalla ? sitemapFalla.detalle : 'Encontramos un sitemap válido.',
    sitemapFalla && sitemapFalla.estado === 'sin-confirmar'
      ? abreloTu('/sitemap.xml')
      : 'Publica un sitemap.xml y decláralo en robots.txt.'
  );
  const canonicalOk = /<link[^>]+rel=["']canonical["']/i.test(html);
  add(
    'citabilidad', 'canonical', 'Declaras la URL canónica', canonicalOk, 2,
    canonicalOk ? 'La home declara canonical.' : 'No hay canonical.',
    'Agrega <link rel="canonical"> en cada página.'
  );
  const langOk = /<html[^>]+lang=["'][a-z]{2}/i.test(html);
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

  // El puntaje se calcula SOLO sobre lo que pudimos confirmar. Un ítem en 'sin-confirmar' sale
  // del numerador y del denominador: no suma (sería un verde que no medimos) y tampoco resta
  // (sería castigar al sitio por un límite de lectura nuestro). Es la misma cuenta que hace
  // Verifica y Cumple con pesoConfirmado/pesoTotal.
  //
  // Hoy solo seis ítems pueden quedar sin confirmar (los tres del robots.txt, el de las
  // pruebas por nombre de robot, el llms.txt y el sitemap.xml), o sea 32 de los 100 puntos,
  // así que el denominador nunca queda vacío ni baja de la mitad. Si algún día pudieran quedar
  // más, hay que decidir qué mostrar cuando no quede casi nada que puntuar: el gemelo deja el
  // puntaje en null bajo la mitad del peso, y acá habría que hacer lo mismo antes de dividir.
  const puntuables = items.filter((i) => i.estado !== 'sin-confirmar');
  const pesoTotal = items.reduce((a, i) => a + i.peso, 0);
  const pesoConfirmado = puntuables.reduce((a, i) => a + i.peso, 0);
  const obtenido = puntuables.reduce((a, i) => a + (i.estado === 'ok' ? i.peso : 0), 0);
  const puntaje = Math.round((obtenido / pesoConfirmado) * 100);

  // Lo que no medimos no es una prioridad a corregir: no sabemos si hay algo que corregir.
  const prioridades = items
    .filter((i) => i.estado === 'pendiente')
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 3)
    .map((i) => ({ titulo: i.titulo, arreglo: i.arreglo }));

  return {
    ok: true,
    // El host que de verdad se revisó. Si fue la otra forma del dominio, `aviso` dice por qué.
    dominio,
    ...(aviso ? { aviso } : {}),
    puntaje,
    // Con qué se calculó el número, para que la página pueda decirlo en vez de que el lector
    // tenga que suponerlo: `sinConfirmar` son las señales que quedaron fuera de la cuenta.
    pesoConfirmado,
    pesoTotal,
    sinConfirmar: items.filter((i) => i.estado === 'sin-confirmar').length,
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

// no-store en TODAS las respuestas, también en los errores. Con 'public, max-age=300' el
// navegador guardaba la respuesta cinco minutos, y un reintento dentro de ese plazo ni
// llegaba al servidor: quien veía "No pudimos abrir el sitio... inténtalo de nuevo" y lo
// intentaba de nuevo recibía el mismo error guardado (comprobado con Chrome en Verifica y
// Cumple, que tenía el mismo encabezado). Un chequeo es una lectura en vivo; no hay nada que
// valga la pena guardar.
const CORS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
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
