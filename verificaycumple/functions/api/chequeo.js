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
 */

const TIMEOUT_MS = 8000;
// Tope de lectura. Subió de 900 KB a 3 MB porque portadas de 1 MB son corrientes y con el
// tope viejo el chequeo se quedaba corto seguido. Con la lectura en streaming de abajo este
// número es además el techo real de memoria: nunca se materializa más que esto.
const MAX_BYTES = 3_000_000;

/* ------------------------------------------------------------------ *
 * Validación del destino. Sin esto, el endpoint es un proxy abierto.  *
 * ------------------------------------------------------------------ */

const HOST_PROHIBIDO =
  /^(localhost|.*\.local|.*\.internal|metadata\.google\.internal)$/i;

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
  // IP literal: bloqueamos rangos privados y de loopback.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    const o = host.split('.').map(Number);
    if (o.some((n) => n > 255)) return { error: 'Esa dirección no es válida.' };
    const privada =
      o[0] === 10 ||
      o[0] === 127 ||
      o[0] === 0 ||
      (o[0] === 192 && o[1] === 168) ||
      (o[0] === 172 && o[1] >= 16 && o[1] <= 31) ||
      (o[0] === 169 && o[1] === 254);
    if (privada) return { error: 'Ese destino no se puede revisar.' };
    return { error: 'Escribe un dominio, no una dirección IP.' };
  }
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(host)) {
    return { error: 'Eso no parece un dominio válido.' };
  }
  return { dominio: host };
}

/* ------------------------------------------------------------------ *
 * Descarga acotada: timeout y tope de bytes.                          *
 * ------------------------------------------------------------------ */

async function traer(url, fetchImpl) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetchImpl(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      cf: { cacheTtl: 0, cacheEverything: false },
      headers: {
        'User-Agent': 'VerificaYCumple/1.0 (+https://verificaycumple.pages.dev/)',
        Accept: 'text/html,text/plain;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
    });
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
      const trozos = [];
      let bytes = 0;
      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BYTES) {
          completo = false;
          trozos.length = 0; // suelta los MB ya acumulados
          // Cancelar es una cortesía hacia el origen, no algo de lo que dependa la
          // respuesta: el veredicto ya está decidido. Si se dejara await acá y el cancel
          // rechazara (la conexión se cae justo al cortarla), el catch de abajo devolvería
          // null y el visitante vería "no pudimos abrir el sitio", que es falso, en vez del
          // mensaje honesto. Y si el cancel no resuelve nunca, la petición queda colgada.
          try { lector.cancel().catch(() => {}); } catch {}
          break;
        }
        trozos.push(value);
      }
      if (completo) {
        const todo = new Uint8Array(bytes);
        let i = 0;
        for (const t of trozos) { todo.set(t, i); i += t.byteLength; }
        trozos.length = 0; // suelta una copia entera antes de decodificar
        texto = new TextDecoder('utf-8').decode(todo);
      }
      // Lectura corta: el origen declaró un tamaño y nos entregó menos, o sea que cerró la
      // conexión a medias. Eso es HTML incompleto aunque no hayamos topado nuestro límite.
      // Es seguro compararlo: con gzip el runtime entrega el cuerpo ya descomprimido, así
      // que `bytes` es mayor que lo declarado y nunca dispara de más; y si el proxy quita
      // la cabecera, `declarado` queda en 0 y el control se salta solo.
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

    return { status: r.status, url: r.url, texto, completo };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/* ------------------------------------------------------------------ *
 * Señales sobre el HTML crudo. Regex a propósito: sin DOM en este      *
 * runtime, solo necesitamos presencia/ausencia, no parsear el árbol.  *
 * ------------------------------------------------------------------ */

// Enlace a la política de privacidad / tratamiento de datos, en el texto o en el href.
const RE_ENLACE_POLITICA =
  /<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi;
const RE_TEXTO_POLITICA = /privacidad|tratamiento de datos|protecci[oó]n de datos|aviso legal/i;

function buscarEnlacePolitica(html) {
  let m;
  RE_ENLACE_POLITICA.lastIndex = 0;
  while ((m = RE_ENLACE_POLITICA.exec(html))) {
    const [, href, textoInterno] = m;
    const textoPlano = textoInterno.replace(/<[^>]+>/g, ' ');
    if (RE_TEXTO_POLITICA.test(href) || RE_TEXTO_POLITICA.test(textoPlano)) return href;
  }
  return null;
}

function resolverUrl(href, base) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

// Proveedores de gestión de consentimiento (CMP) conocidos — su sola presencia es una señal
// fuerte y verificable (a diferencia de si un tracker dispara antes o después, ver brief §4).
const CMPS = [
  [/cookiebot\.com|Cookiebot\.js/i, 'Cookiebot'],
  [/cdn\.cookielaw\.org|OptanonConsent/i, 'OneTrust'],
  [/cmp\.osano\.com/i, 'Osano'],
  [/cdn\.iubenda\.com/i, 'iubenda'],
  [/cdn-cookieyes\.com/i, 'CookieYes'],
  [/static\.axept\.io/i, 'Axeptio'],
  [/complianz|cmplz-/i, 'Complianz'],
  [/klaro-config|klaro\.js/i, 'Klaro'],
  [/tarteaucitron\.js/i, 'tarteaucitron'],
  [/consent\.cookiefirst\.com/i, 'CookieFirst'],
  [/cookie-script\.com/i, 'CookieScript'],
];

function detectarCmp(html) {
  for (const [re, nombre] of CMPS) if (re.test(html)) return nombre;
  return null;
}

// Proveedores externos que procesan datos personales — solo se informa que están, no si
// disparan antes o después del consentimiento (eso requiere navegador real, brief §4-C).
const PROVEEDORES = [
  [/googletagmanager\.com\/gtag\/js/i, 'Google Analytics (GA4)'],
  [/googletagmanager\.com\/gtm\.js/i, 'Google Tag Manager'],
  [/connect\.facebook\.net\/[^"'\s]*\/fbevents\.js|fbq\(\s*['"]init['"]/i, 'Meta Pixel'],
  [/static\.hotjar\.com/i, 'Hotjar'],
  [/clarity\.ms\/tag/i, 'Microsoft Clarity'],
];

function detectarProveedores(html) {
  return PROVEEDORES.filter(([re]) => re.test(html)).map(([, nombre]) => nombre);
}

const RE_CONSENT_MODE = /gtag\(\s*['"]consent['"]\s*,\s*['"]default['"]/i;

// Casilla de consentimiento en un formulario HTML plano (no detecta iframes de terceros ni
// formularios renderizados por JS — ver brief §4-A, límite declarado, no inferido).
// Se recorre con indexOf y se toma la posición de cada casilla del propio regex. La versión
// anterior hacía `form.indexOf(input)` DOS veces por casilla, y cada llamada recorría el
// formulario entero: con un formulario largo de casillas distintas (lo que arma cualquier
// constructor de formularios) el costo crecía al cuadrado. Medido: 272 ms de CPU con 1 MB y
// 1.671 ms con 2,5 MB. Mientras el tope de lectura fueron 900 KB quedaba contenido; al
// subirlo a 3 MB se volvió un problema real en un endpoint público y sin autenticar.
const RE_CASILLA = /<input\b[^>]*type=["']checkbox["'][^>]*>/gi;
function buscarCasillaPremarcada(html) {
  const bajo = html.toLowerCase();
  let encontroCasilla = false;
  let i = 0;
  while ((i = bajo.indexOf('<form', i)) !== -1) {
    const fin = bajo.indexOf('</form>', i);
    if (fin === -1) break;
    const form = html.slice(i, fin + 7);
    i = fin + 7;
    RE_CASILLA.lastIndex = 0;
    let c;
    while ((c = RE_CASILLA.exec(form)) !== null) {
      const contexto = form.slice(Math.max(0, c.index - 150), c.index + 150);
      if (!/acept|consient|autoriz|consentimiento/i.test(contexto)) continue;
      encontroCasilla = true;
      if (/\bchecked\b/i.test(c[0])) return { encontroCasilla, premarcada: true };
    }
  }
  return { encontroCasilla, premarcada: false };
}

/* ------------------------------------------------------------------ *
 * El chequeo                                                          *
 * ------------------------------------------------------------------ */

export async function chequear(entrada, fetchImpl = fetch) {
  const v = normalizarDominio(entrada);
  if (v.error) return { ok: false, error: v.error };
  const { dominio } = v;

  let home = await traer(`https://${dominio}/`, fetchImpl);

  // Si no se pudo ni conectar por https, se reintenta por http. Antes no se hacía, y el
  // resultado era el peor posible para este producto: el sitio que MÁS lo necesita, el que
  // todavía anda en http o tiene el certificado vencido, era el único que nunca veía un
  // informe. Leía "no pudimos abrir el sitio, revisa el dominio" y su dominio estaba bien.
  //
  // Solo se reintenta cuando https no conectó (`null`: certificado inválido, puerto cerrado,
  // DNS). Si https respondió aunque sea con error, el sitio SÍ sirve por https y reintentar
  // por http daría un informe que dice lo contrario.
  if (!home) home = await traer(`http://${dominio}/`, fetchImpl);

  if (!home || home.status >= 400) {
    return {
      ok: false,
      error: home
        ? `El sitio respondió ${home.status}. Revisa el dominio.`
        : 'No pudimos abrir el sitio. Revisa el dominio o inténtalo de nuevo.',
    };
  }

  // Si la portada no llegó entera, NO se puntúa. Un HTML cortado produce un informe que
  // parece bueno y está mal: las señales que viven más abajo del corte salen en rojo aunque
  // el sitio las tenga. Para un chequeo cuya única defensa es "cuando no podemos verificar
  // algo, lo decimos", entregar ese número sería exactamente lo contrario. Preferimos no dar
  // resultado antes que dar uno inventado.
  if (!home.completo) {
    return {
      ok: false,
      error:
        'Tu portada pesa más de lo que este chequeo automático alcanza a leer completo. ' +
        'Preferimos no darte un resultado a medias: escríbenos a hola@spindlelab.cl y la revisamos a mano.',
    };
  }

  // El otro extremo del mismo problema, y el más probable de los dos: un 2xx que no trae
  // nada de HTML. Pasa cuando un firewall le devuelve la página en blanco a un lector
  // automático como el nuestro. Puntuarlo es inventar igual que truncar: las señales salen
  // ausentes porque no leímos nada, no porque el sitio no las tenga. Sin esta guardia daba
  // 27/100 con tres señales en rojo, que es exactamente el informe falso que perseguimos.
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

  const hrefPolitica = buscarEnlacePolitica(html);
  let politicaAlcanzable = false;
  if (hrefPolitica) {
    const urlPolitica = resolverUrl(hrefPolitica, home.url);
    if (urlPolitica) {
      const pagina = await traer(urlPolitica, fetchImpl);
      politicaAlcanzable = !!pagina && pagina.status === 200;
    }
  }

  const httpsOk = home.url.startsWith('https://') && home.status === 200;
  const langOk = /<html[^>]+lang=["'][a-z]{2}/i.test(html);
  const cmp = detectarCmp(html);
  const proveedores = detectarProveedores(html);
  const consentModeInline = RE_CONSENT_MODE.test(html);
  const { encontroCasilla, premarcada } = buscarCasillaPremarcada(html);

  const items = [];
  const add = (bloque, id, titulo, ok, peso, detalle, arregloSiFalla) =>
    items.push({ bloque, id, titulo, ok, peso, detalle, arreglo: ok ? null : arregloSiFalla });

  // --- Bloque 1: lo básico publicado (Art. 14 ter exige tenerlo disponible en el sitio) ---
  add(
    'basico', 'politica', 'Tienes una política de privacidad enlazada y accesible',
    !!hrefPolitica && politicaAlcanzable, 8,
    hrefPolitica
      ? politicaAlcanzable
        ? 'Encontramos el enlace y la página responde.'
        : 'Encontramos un enlace, pero la página no respondió 200.'
      : 'No encontramos un enlace a política de privacidad ni de tratamiento de datos.',
    'Publica una política de privacidad enlazada desde tu portada. El Art. 14 ter de la Ley 21.719 exige tenerla públicamente disponible, con contenido mínimo (derechos, plazos, transferencias internacionales).'
  );
  add(
    'basico', 'https', 'El sitio responde por HTTPS', httpsOk, 6,
    httpsOk
      ? `Respondió ${home.status} sobre HTTPS.`
      : 'Tu sitio respondió por http://, no por https://. Lo que alguien escriba en tu ' +
        'formulario viaja sin cifrar, así que cualquiera en la misma red puede leerlo.',
    'Instala un certificado (Let\'s Encrypt es gratis y casi todos los hosting lo activan ' +
      'con un clic) y redirige todo el tráfico de http:// a https://.'
  );
  add(
    'basico', 'lang', 'Declaras el idioma del sitio', langOk, 2,
    langOk ? 'El <html> declara lang.' : 'El <html> no declara lang.',
    'Agrega lang="es-CL" al <html>.'
  );

  // --- Bloque 2: gestión de consentimiento ---
  add(
    'consentimiento', 'cmp', 'Usas un gestor de consentimiento reconocible', !!cmp, 6,
    cmp
      ? `Detectamos ${cmp}.`
      : 'No detectamos un gestor de consentimiento de los proveedores conocidos (puede que uses uno propio no listado, o ninguno).',
    'El Art. 12 exige que el consentimiento se otorgue mediante un acto afirmativo previo, no por silencio ni por una casilla premarcada. Un banner de consentimiento es la forma habitual de resolverlo para cookies y rastreadores.'
  );

  const total = items.reduce((a, i) => a + i.peso, 0);
  const obtenido = items.reduce((a, i) => a + (i.ok ? i.peso : 0), 0);
  const puntaje = Math.round((obtenido / total) * 100);

  const prioridades = items
    .filter((i) => !i.ok)
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 3)
    .map((i) => ({ titulo: i.titulo, arreglo: i.arreglo }));

  // --- Informativo: no se puntúa, porque no es verificable con este chequeo (brief §4). ---
  const informativos = [
    {
      id: 'proveedores',
      titulo: 'Proveedores externos que detectamos en tu sitio',
      detalle: proveedores.length
        ? `Encontramos: ${proveedores.join(', ')}. No podemos saber si disparan antes o después del consentimiento del visitante. Eso requiere revisar el comportamiento en un navegador real, no solo el HTML. Sí es una lista útil: cada uno de estos proveedores necesita su propio acuerdo de tratamiento de datos (Art. 27-28).`
        : 'No detectamos scripts de los proveedores externos más comunes (GA4, GTM, Meta Pixel, Hotjar, Clarity) en el HTML que recibimos.',
    },
    {
      id: 'consent-mode',
      titulo: 'Google Consent Mode declarado en el HTML',
      detalle: consentModeInline
        ? 'Encontramos una llamada a gtag(\'consent\', \'default\', …) directamente en el HTML.'
        : 'No encontramos Consent Mode declarado inline. Puede estar configurado dentro de un contenedor de Google Tag Manager, que no podemos leer desde afuera.',
    },
    {
      id: 'casilla',
      titulo: 'Casilla de consentimiento en formularios propios',
      detalle: encontroCasilla
        ? premarcada
          ? 'Encontramos una casilla de consentimiento premarcada en un formulario de tu sitio. El Art. 12 exige un acto afirmativo. Una casilla ya marcada no cumple ese estándar.'
          : 'Encontramos una casilla de consentimiento y no viene premarcada.'
        : 'No encontramos un formulario HTML con casilla de consentimiento en la página principal. Si usas un formulario embebido de un tercero (HubSpot, Typeform, Google Forms) o renderizado por JavaScript, este chequeo no lo puede ver.',
    },
  ];

  return {
    ok: true,
    dominio,
    puntaje,
    revisadoEn: new Date().toISOString(),
    bloques: [
      { id: 'basico', titulo: 'Lo básico publicado', sub: 'Lo que el Art. 14 ter exige tener disponible en tu sitio.' },
      { id: 'consentimiento', titulo: 'Gestión de consentimiento', sub: 'Cómo pides permiso para tratar datos.' },
    ],
    items,
    prioridades,
    informativos,
  };
}

/* ------------------------------------------------------------------ */

const CORS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=300',
  'Access-Control-Allow-Origin': '*',
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
