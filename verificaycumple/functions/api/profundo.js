/**
 * Chequeo profundo Ley 21.719 — Cloudflare Pages Function.
 *
 * El chequeo rápido (`chequeo.js`) lee el HTML y NO ejecuta JavaScript. Por eso ve
 * "Google Tag Manager" sin poder saber qué hay adentro, y por eso varios ítems se quedan
 * en "sin-confirmar". Este endpoint levanta ese límite: abre el sitio en un navegador de
 * verdad (Cloudflare Browser Rendering) y mira qué pasa solo, sin tocar nada.
 *
 * El caso que lo justifica: awasi.com saca 100/100 en el chequeo rápido. Abierto en un
 * navegador, a los 6,3 segundos ya cargó Google Analytics, Google Ads, el Pixel de Meta y
 * el de Reddit, dejó cinco cookies y no mostró ningún aviso.
 *
 * GET /api/profundo?dominio=ejemplo.cl
 *
 * -------------------------------------------------------------------------------------
 * LAS CUATRO REGLAS QUE MANDAN ACÁ (encargo del 23-sep, cuatro pasadas de revisión):
 *
 * 1. Un "no lo sabemos" NO suma ni resta, y nunca se muestra verde algo que no se pudo
 *    confirmar. Tres estados por ítem: 'ok' | 'pendiente' | 'sin-confirmar'. El puntaje
 *    solo cuenta lo confirmado, y si se confirmó menos de la mitad del peso no se muestra
 *    número. Este chequeo NUNCA dice que alguien cumple.
 *
 * 2. Cargar, dejar una cookie y enviar datos son TRES cosas distintas, y cada una se dice
 *    con sus palabras. El Pixel de Meta es el caso típico: carga y deja cookie sin llegar
 *    a enviar. Confundirlas fue el error que tres revisiones seguidas tuvieron que sacar
 *    de los correos, así que acá viajan en tres campos separados que nunca se colapsan.
 *
 * 3. Si el navegador falla, se dice. Una caída NUESTRA jamás se presenta como "tu sitio
 *    está limpio": ese sería el peor falso verde de todos. Todas las fallas de la tabla
 *    del encargo tienen su mensaje en `FALLAS`, y ninguno afirma nada sobre el sitio.
 *
 * 4. Tope de abuso. Es un endpoint público y gratis que abre un navegador remoto: sin
 *    tope, una tarde de golpes se come las horas de navegador del mes.
 *
 * -------------------------------------------------------------------------------------
 * POR QUÉ NO HAY BINDING NI WRANGLER.TOML
 *
 * Pages Functions soporta un subconjunto de bindings (KV, DO, R2, D1, Vectorize, Workers
 * AI, service bindings, colas, Hyperdrive, Analytics Engine, variables y secretos) y
 * Browser Rendering NO está en esa lista. Toda la doc del binding (`env.MYBROWSER`,
 * `@cloudflare/puppeteer`) está escrita para Workers.
 *
 * Pero no hace falta migrar a Workers: existe un endpoint CDP remoto que se conecta por
 * WebSocket autenticado, y una Pages Function sí puede ser cliente WebSocket. Todo lo que
 * queremos medir sale de CDP crudo (`Network.enable`, `Storage.getCookies`,
 * `Input.dispatchMouseEvent`, `Runtime.evaluate`), así que tampoco hace falta puppeteer ni
 * ningún paquete. La prueba de concepto del 25-sep midió tres sitios así, sin instalar nada.
 *
 * Configuración necesaria en Settings del proyecto de Pages:
 *   CF_ACCOUNT_ID      el ID de la cuenta
 *   CF_BROWSER_TOKEN   un API token con permiso Browser Rendering – Edit (secreto)
 *   VYC_TOPES          un namespace de KV, para el tope de abuso y la caché
 *
 * SIN esas tres cosas el endpoint DECLINA con un mensaje honesto. No se degrada a "no
 * encontramos rastreadores": eso sería la regla 3 al revés.
 *
 * EL SUPUESTO QUE HAY QUE PROBAR EN EL PRIMER DESPLIEGUE: la doc de Workers muestra el
 * upgrade de WebSocket con el header `Upgrade` solo, y no dice si deja pasar además un
 * `Authorization`. Si no lo deja, este camino se cae y hay que ir al de respaldo (un Worker
 * aparte con el binding de browser, llamado por service binding). `conectarNavegador`
 * distingue ese caso y lo registra, para que se vea en los logs en vez de parecer otra cosa.
 */

// El portón de destinos y la normalización de dominio se IMPORTAN, no se copian. Es el
// mismo código verificado que usa el chequeo rápido, con sus 1.206 comprobaciones detrás.
// Duplicarlo sería crear una segunda versión que se va a desincronizar, y la lógica que se
// desincronice va a ser justamente la de seguridad.
import { destinoPermitido, normalizarDominio } from './chequeo.js';

/* ================================================================== *
 * Tiempos del guion. Medidos, no intuidos.                            *
 * ================================================================== */

// 11 s y no 8: en awasi el primer tercero aparece a los 5,2 s y el grueso entre 4 y 8 s.
// Con 8 s se perdía la cola; con 11 s entra completa.
export const TRAMO_PASIVO_MS = 11000;
// 7 s de gesto. Varios sitios chilenos retrasan sus scripts hasta el primer movimiento del
// mouse (WP Rocket y compañía): quedarse en el pasivo hizo que 2 de 12 prospectos medidos
// el 23-sep parecieran limpios sin serlo.
export const TRAMO_GESTO_MS = 7000;
// Techo de toda la medición. El guion medido son 21,6 a 25,4 s; 30 s es el presupuesto que
// se promete (1.200 chequeos dentro de las 10 horas incluidas del plan pagado), y 45 s es
// el corte duro antes de dar la sesión por perdida.
export const PRESUPUESTO_MS = 45000;
// Cuánto esperamos una respuesta de CDP antes de darla por muerta.
const PLAZO_CDP_MS = 20000;

// Nada puede salir hacia el formulario de contacto del propio sitio. No es paranoia: el
// navegador ejecuta el JavaScript del sitio revisado, y un sitio podría tener un formulario
// que se envía solo. Doble tapa, red y JS, porque una sola falla en silencio.
const HOSTS_BLOQUEADOS = ['api.web3forms.com', 'web3forms.com'];

// Con quién habla el sitio revisado, por si su dueño mira sus registros. El mismo de
// chequeo.js, para que las dos líneas de su log digan lo mismo.
const USER_AGENT = 'VerificaYCumple/1.0 (+https://verifica.spindlelab.cl/)';

/* ================================================================== *
 * Dominio registrable: separar lo propio de lo de terceros.           *
 * ================================================================== */

// Sufijos de dos niveles que aparecen de verdad en la lista de prospectos. Chile usa .cl
// plano, pero hay sitios con .com.ar y .co.uk en la misma lista. No es la Public Suffix
// List entera (son miles de entradas y no caben acá); es la parte que toca este producto.
// Un sufijo que falte solo hace que un tercero se cuente como propio, nunca al revés, y
// esa es la dirección segura del error: subcontar terceros es conservador.
const SUFIJOS_DOBLES = new Set([
  'co.uk', 'com.ar', 'com.br', 'com.mx', 'com.au', 'co.jp', 'com.co',
  'com.pe', 'co.nz', 'com.uy', 'gob.cl', 'co.il', 'com.es', 'com.ec',
]);

export function registrable(host) {
  const p = String(host || '').toLowerCase().replace(/^\.+/, '').replace(/\.+$/, '').split('.');
  if (p.length <= 2) return p.join('.');
  const dos = p.slice(-2).join('.');
  return SUFIJOS_DOBLES.has(dos) ? p.slice(-3).join('.') : dos;
}

export function hostDe(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}

/* ================================================================== *
 * Catálogo de rastreadores. Tres verbos, a propósito.                 *
 *                                                                     *
 *   cargo  -> se descargó el archivo del rastreador                   *
 *   cookie -> quedó una cookie escrita en el navegador                *
 *   envio  -> salió una petición que lleva datos de la visita         *
 *                                                                     *
 * Las cuatro combinaciones existen de verdad, medidas el 25-sep:      *
 *   awasi + Meta     -> cargó y dejó cookie, SIN enviar               *
 *   cumbres + GA     -> cargó y envió, SIN escribir ninguna cookie    *
 *                       (Consent Mode: manda señales y no escribe)    *
 * Colapsarlos en "tiene Meta" / "tiene GA" cuenta mal los dos casos,  *
 * y en direcciones opuestas.                                          *
 *                                                                     *
 * Los nombres son los MISMOS que ya usa chequeo.js, con su artículo   *
 * incluido ("el Pixel de Meta"), para que las dos mitades del informe *
 * no llamen distinto a la misma cosa.                                 *
 * ================================================================== */

export const RASTREADORES = [
  {
    clave: 'ga4', nombre: 'Google Analytics',
    // gtag.js con id G- es GA4; con AW-/DC- es Google Ads y lo toma la entrada de abajo.
    cargo: [/googletagmanager\.com\/gtag\/js\?[^ ]*id=G-/i, /google-analytics\.com\/analytics\.js/i],
    envio: [/google-analytics\.com\/(g\/)?collect/i, /analytics\.google\.com\/g\/collect/i,
            /googletagmanager\.com\/(g|a)\/collect/i],
    cookies: [/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/],
  },
  {
    clave: 'gtm', nombre: 'Google Tag Manager',
    cargo: [/googletagmanager\.com\/gtm\.js/i, /googletagmanager\.com\/ns\.html/i],
    // GTM es el contenedor, no el rastreador: no envía por su cuenta ni escribe cookies
    // propias. Lo listamos porque su presencia explica de dónde salen los demás.
    envio: [], cookies: [],
  },
  {
    clave: 'gads', nombre: 'Google Ads',
    cargo: [/googleadservices\.com\/pagead\/conversion/i,
            /googletagmanager\.com\/gtag\/js\?[^ ]*id=(AW|DC)-/i],
    envio: [/googleads\.g\.doubleclick\.net/i, /google\.(com|cl)\/pagead/i,
            /googleadservices\.com\/pagead\/conversion\//i],
    cookies: [/^_gcl_/, /^_gac_/],
  },
  {
    clave: 'meta', nombre: 'el Pixel de Meta',
    cargo: [/connect\.facebook\.net\/[^ ]*\/fbevents\.js/i, /connect\.facebook\.net\/signals/i],
    envio: [/facebook\.com\/tr/i],
    cookies: [/^_fbp$/, /^_fbc$/],
  },
  {
    clave: 'reddit', nombre: 'el Pixel de Reddit',
    cargo: [/redditstatic\.com\/ads\/(pixel|conversions)/i],
    envio: [/alb\.reddit\.com/i, /events\.redditmedia\.com/i, /pixel\.reddit\.com/i],
    cookies: [/^_rdt_uuid$/],
  },
  {
    clave: 'tiktok', nombre: 'el Pixel de TikTok',
    cargo: [/analytics\.tiktok\.com\/i18n\/pixel/i],
    envio: [/analytics\.tiktok\.com\/api\//i],
    cookies: [/^_ttp$/, /^_tt_enable_cookie$/],
  },
  {
    clave: 'clarity', nombre: 'Clarity',
    cargo: [/clarity\.ms\/tag/i],
    envio: [/clarity\.ms\/collect/i],
    cookies: [/^_clck$/, /^_clsk$/],
  },
  {
    clave: 'bing', nombre: 'Microsoft Ads',
    cargo: [/bat\.bing\.com\/bat\.js/i],
    envio: [/bat\.bing\.com\/action/i],
    cookies: [/^_uetsid$/, /^_uetvid$/],
  },
  {
    clave: 'hotjar', nombre: 'Hotjar',
    cargo: [/static\.hotjar\.com/i],
    envio: [/\.hotjar\.(com|io)\/api/i],
    cookies: [/^_hj/],
  },
  {
    clave: 'linkedin', nombre: 'LinkedIn Insight',
    cargo: [/snap\.licdn\.com/i],
    envio: [/px\.ads\.linkedin\.com/i],
    cookies: [/^li_fat_id$/, /^li_sugr$/, /^bcookie$/, /^lidc$/],
  },
  // --- Los seis que entraron el 25-sep -------------------------------------------------
  // El catálogo tenía diez entradas y eso es un techo, no una lista completa: un sitio con
  // HubSpot o Matomo y nada más salía 100/100, que es el mismo falso verde de awasi con
  // otro nombre. patagoniacamp.com es el caso medido: escribe __hstc, hubspotutk y _pk_id
  // antes de que nadie acepte nada, y las tres son de su propio dominio, así que el ítem de
  // cookies las daba por técnicas.
  //
  // Los patrones son de dominios y nombres establecidos, no inventados. Lo que NO se hace es
  // agrandar el catálogo a ciegas y dar por cerrada la lista: el que no esté acá sigue
  // saliendo por la puerta de al lado, que es la cookie de otro dominio que no reconocemos y
  // que deja el ítem en sin-confirmar en vez de en verde.
  {
    clave: 'hubspot', nombre: 'HubSpot',
    cargo: [/js\.hs-scripts\.com/i, /js\.hsforms\.net/i, /js\.hs-analytics\.net/i, /js\.hs-banner\.com/i],
    envio: [/track\.hubspot\.com/i, /forms\.hscollectedforms\.net/i],
    cookies: [/^__hstc$/, /^hubspotutk$/, /^__hssc$/, /^__hssrc$/],
  },
  {
    clave: 'matomo', nombre: 'Matomo',
    cargo: [/\/(matomo|piwik)\.js/i],
    envio: [/\/(matomo|piwik)\.php/i],
    cookies: [/^_pk_id/, /^_pk_ses/, /^_pk_ref/],
  },
  {
    clave: 'segment', nombre: 'Segment',
    cargo: [/cdn\.segment\.(com|io)\/analytics\.js/i],
    envio: [/api\.segment\.io\/v1\//i],
    cookies: [/^ajs_anonymous_id$/, /^ajs_user_id$/],
  },
  {
    clave: 'criteo', nombre: 'Criteo',
    cargo: [/static\.criteo\.net/i],
    envio: [/(sslwidget|widget|dis)\.criteo\.com/i],
    cookies: [/^cto_bundle$/, /^cto_bidid$/, /^cto_dna_bundle$/],
  },
  {
    clave: 'pinterest', nombre: 'el Pixel de Pinterest',
    cargo: [/s\.pinimg\.com\/ct\//i],
    envio: [/ct\.pinterest\.com/i],
    cookies: [/^_pinterest_/, /^_pin_unauth$/],
  },
  {
    clave: 'intercom', nombre: 'Intercom',
    cargo: [/widget\.intercom\.io/i, /js\.intercomcdn\.com/i],
    envio: [/api-iam\.intercom\.io/i],
    cookies: [/^intercom-/],
  },
];

function calza(url, expresiones) {
  return expresiones.some((r) => r.test(url));
}

/* ================================================================== *
 * Lectura de lo medido. Todo lo de esta sección es PURO.              *
 *                                                                     *
 * Está escrito así a propósito: el binding de Cloudflare no se puede  *
 * probar desde local, pero esto sí, y se prueba con peticiones y      *
 * cookies reales de 12 sitios medidos el 23-sep                       *
 * (pruebas/prueba-profundo.mjs).                                      *
 * ================================================================== */

/**
 * Qué rastreadores aparecieron, y con cuál de los tres verbos cada uno.
 *
 * `peticiones` son objetos { url, metodo, tipo, ms, conCuerpo }; `cookies`, lo que devuelve
 * `Storage.getCookies` ({ name, domain, ... }).
 */
export function clasificarRastreadores(peticiones = [], cookies = []) {
  const hallados = [];
  for (const r of RASTREADORES) {
    const cargo = peticiones.filter((p) => calza(p.url, r.cargo));
    const envio = peticiones.filter((p) => calza(p.url, r.envio));
    const gal = cookies.filter((c) => r.cookies.some((re) => re.test(c.name)));
    if (!cargo.length && !envio.length && !gal.length) continue;
    hallados.push({
      clave: r.clave,
      nombre: r.nombre,
      // Los tres campos viajan SIEMPRE, y en null cuando no pasó. Un consumidor que quiera
      // saber si Meta envió datos no puede confundirse con que cargó.
      cargo: cargo.length ? { cuantas: cargo.length, primeraMs: minMs(cargo) } : null,
      cookie: gal.length ? { nombres: [...new Set(gal.map((c) => c.name))] } : null,
      envio: envio.length ? { cuantas: envio.length, primeraMs: minMs(envio) } : null,
    });
  }
  return hallados;
}

function minMs(lista) {
  const ms = lista.map((p) => p.ms).filter((n) => typeof n === 'number' && isFinite(n));
  return ms.length ? Math.min(...ms) : null;
}

/** Con quién habló el sitio además de consigo mismo. */
export function resumirTerceros(peticiones = [], dominio = '') {
  const propio = registrable(dominio);
  const mapa = new Map();
  for (const p of peticiones) {
    const h = hostDe(p.url);
    if (!h) continue;
    const reg = registrable(h);
    if (!reg || reg === propio) continue;
    const a = mapa.get(reg) || { dominio: reg, peticiones: 0, primeraMs: null, conCuerpo: 0 };
    a.peticiones++;
    if (p.conCuerpo) a.conCuerpo++;
    if (typeof p.ms === 'number' && (a.primeraMs === null || p.ms < a.primeraMs)) a.primeraMs = p.ms;
    mapa.set(reg, a);
  }
  return [...mapa.values()].sort((a, b) => b.peticiones - a.peticiones);
}

/** Qué cookies quedaron, separadas en propias y de terceros. */
export function separarCookies(cookies = [], dominio = '') {
  const propio = registrable(dominio);
  const propias = [], terceras = [];
  for (const c of cookies) {
    (registrable(c.domain) === propio ? propias : terceras).push(c);
  }
  return {
    propias: propias.map((c) => c.name),
    terceras: terceras.map((c) => ({ nombre: c.name, dominio: String(c.domain || '').replace(/^\./, '') })),
  };
}

/**
 * Qué cambió entre el tramo pasivo y el del gesto.
 *
 * En los tres sitios medidos el 25-sep el gesto no cambió el veredicto (0 cookies nuevas en
 * los tres), pero sí cambió en 2 de los 12 prospectos del 23-sep. Su valor está en esa
 * minoría que esconde los scripts detrás del primer movimiento, y cuesta 7 segundos.
 */
export function diferenciaPorElGesto(tras1, tras2) {
  const antes = new Set((tras1.cookies || []).map((c) => c.domain + '|' + c.name));
  const cookiesNuevas = (tras2.cookies || [])
    .filter((c) => !antes.has(c.domain + '|' + c.name))
    .map((c) => c.name);
  const urlsAntes = new Set((tras1.peticiones || []).map((p) => p.url));
  const peticionesNuevas = (tras2.peticiones || []).filter((p) => !urlsAntes.has(p.url));
  const clavesAntes = new Set(clasificarRastreadores(tras1.peticiones, tras1.cookies).map((h) => h.clave));
  const rastreadoresNuevos = clasificarRastreadores(tras2.peticiones, tras2.cookies)
    .filter((h) => !clavesAntes.has(h.clave))
    .map((h) => h.nombre);
  return { cookiesNuevas, peticionesNuevas: peticionesNuevas.length, rastreadoresNuevos };
}

/**
 * Lee lo que devolvió el detector de aviso.
 *
 * Tres resultados posibles, y el tercero es el que importa:
 *   'visible'     apareció un aviso que flota y habla de cookies o consentimiento
 *   'ninguno'     miramos y no había
 *   'no-se-pudo'  el detector no corrió, o había un marco que no pudimos leer
 *
 * Un marco cross-origin va SIEMPRE a 'no-se-pudo', nunca a 'ninguno'. Es exactamente el
 * sitio donde un falso negativo nuestro le diría a un prospecto que no tiene algo que sí
 * tiene: hotelescumbres.cl mete su banner en un <iframe> y dos versiones seguidas del
 * detector dijeron "sin aviso" sobre un sitio que lo muestra.
 */
export function leerAviso(crudo) {
  if (!crudo || crudo.fallo) return { estado: 'no-se-pudo', motivo: 'detector', avisos: [], marcosIlegibles: [] };
  const avisos = Array.isArray(crudo.avisos) ? crudo.avisos : [];
  const marcos = Array.isArray(crudo.marcosIlegibles) ? crudo.marcosIlegibles : [];
  if (avisos.length) {
    return {
      estado: 'visible',
      avisos,
      marcosIlegibles: marcos,
      conBotones: avisos.some((a) => a.tieneBotonDeConsentimiento),
      botones: [...new Set(avisos.flatMap((a) => a.botones || []))].slice(0, 6),
    };
  }
  if (marcos.length) return { estado: 'no-se-pudo', motivo: 'marco', avisos: [], marcosIlegibles: marcos };
  return { estado: 'ninguno', avisos: [], marcosIlegibles: [] };
}

/* ================================================================== *
 * Señales de que lo que miramos no era la página del cliente.         *
 * ================================================================== */

/** Minúsculas, sin tildes y solo letras y números, igual que `textoPlano` de chequeo.js. */
export function llano(s) {
  return String(s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Frases enteras de paredes de firewall, nunca raíces sueltas: "restringido" solo lo escribe
// cualquiera en su portada ("El acceso a la sala está restringido a socios"), y negarle el
// informe a ese negocio con un mensaje sobre un firewall que no existe es peor que no mirar.
// Es una hermana MÁS CORTA de RE_TEXTO_BLOQUEO de chequeo.js, y a propósito: allá el input es
// el HTML crudo del chequeo rápido, acá es el texto ya renderizado. No se importa porque
// chequeo.js no la exporta; si algún día la exporta, esta se borra y se usa aquella.
const RE_PARED = new RegExp([
  'just a moment', 'attention required', 'verificando', 'checking your browser',
  'checking if the site connection is secure', 'enable javascript and cookies to continue',
  'acceso (denegado|bloqueado|restringido)', 'access (denied|blocked|restricted)',
  'se ha restringido', 'ha sido bloquead', 'has been (denied|blocked)', 'you have been blocked',
  'request (was )?(rejected|blocked|unsuccessful)', 'requested url was rejected',
  'incapsula incident', 'pardon our interruption', '403 forbidden',
  'unusual traffic', 'trafico inusual', 'are you a (human|robot)',
  'verify (that )?you.{0,9}re (not )?(a )?(human|robot)', 'verifica(r)? que eres (un )?humano',
  'comprobacion de seguridad', 'security check',
].join('|'));
const MAX_TEXTO_PARED = 1500;

// Dónde nos dejó el último salto. Un sitio que manda a su página de fuera de línea o de
// mantenimiento no nos mostró la suya, y eso se sabe por la ruta.
const RE_RUTA_PARED = /^\/(fueradelinea|offline|maintenance|mantenimiento)(\/|$|\.)/i;

function rutaDe(u) {
  try { return new URL(u).pathname; } catch { return ''; }
}

/*
 * Cookies de portero: las escribe el guardia, no el sitio.
 *
 * Akamai (_abck, bm_sz, bm_sv, ak_bmsc), DataDome, Imperva/Incapsula (incap_ses_, visid_incap_,
 * reese84), Cloudflare (__cf_bm, cf_clearance) y PerimeterX (_px*). Cuando un bot manager nos
 * detecta, lo primero que hace es escribir la suya.
 *
 * Esta lista existe por un falso verde REAL, medido el 25-sep: www.santander.cl manda a una
 * pared de Akamai en banco.santander.cl y el chequeo profundo le ponía 77/100 con TRES ítems
 * en verde, incluido "tu sitio no dejó ninguna cookie de rastreo" — sobre las dos cookies del
 * propio bot manager que acababa de pillarnos. Ni el título ("Internet Connection Error") ni
 * el 'flaco' de <=6 peticiones y 0 cookies lo atrapaban: una pared de verdad trae más
 * peticiones que eso y SIEMPRE deja sus cookies.
 *
 * ESTA LISTA YA NO DECIDE NADA, y ese es el arreglo del 26-sep. Hasta entonces la regla era
 * "si las ÚNICAS cookies que quedaron son de esta lista, no vimos la página", y tenía dos
 * agujeros por los que se volvía a colar el 77/100 de www.santander.cl:
 *
 *   1. bastaba UNA cookie corriente al lado para que el "únicas" fallara;
 *   2. bastaba que el gestor de turno no estuviera escrito acá.
 *
 * Los dos agujeros son el mismo: se reconocía la pared por la AUSENCIA de todo lo demás, y
 * cualquier cosa que apareciera la desarmaba. Ampliar la lista no arregla eso — mañana sale
 * otro gestor. Lo que decide ahora es si lo que se abrió tiene FORMA de página (ver
 * `MAX_PETICIONES_PARED` más abajo); esta lista solo elige con qué palabras se dice, porque
 * cuando el guardia firmó con su cookie podemos nombrarlo y cuando no, no.
 *
 * Nombres medidos el 26-sep-2026 en sitios chilenos, con el mismo `medirConNavegador` de
 * producción: nlbi_, visid_incap_, incap_ses_ y reese84 (Imperva, en itau.cl, bancochile.cl
 * y aguasandinas.cl); _abck, bm_sz y ALTDCAKAMAI (Akamai, en scotiabank.cl y santander.cl).
 * bm_sv, bm_mi, bm_so, bm_lso y ak_bmsc son el resto de la familia de Akamai; no se midieron
 * acá y están por completitud, no como prueba de nada.
 *
 * Lo que NO entra, aunque apareció al lado de las anteriores: BIGipServerPool_ (scotiabank.cl)
 * y TS01ad81bb (wom.cl) son cookies de balanceador F5, no de un gestor de bots, y decir "el
 * sistema que filtra robots nos detectó" sobre una cookie de balanceo sería inventar. Que no
 * estén ya no abre ningún agujero: un sitio protegido por un F5 que nos muestre una pared
 * cae igual por la forma de la página, solo que con las palabras de 'flaco'.
 *
 * Lo que NO se hace es cortar por letras<500 a secas: tuane.cl es una portada real con 261
 * letras y se quedaría sin informe sin motivo.
 */
export const COOKIES_DE_PORTERO = [
  /^_abck$/i, /^bm_(sz|sv|mi|so|lso)$/i, /^ak_bmsc$/i, /^ALTDCAKAMAI$/i,
  /^datadome$/i, /^incap_ses_/i, /^visid_incap_/i, /^nlbi_/i, /^reese84$/i,
  /^__cf_bm$/i, /^cf_clearance$/i, /^_px/i,
];

/*
 * Cuánto es "poca página". Los dos números salen de medir, no de una intuición.
 *
 * El 26-sep-2026 se abrieron con el MISMO `medirConNavegador` que corre en producción 34
 * portadas: 12 prospectos chicos sacados de las listas de outbound (clínicas y estudios de
 * abogados) y 22 sitios chilenos grandes, bancos y retail incluidos. Tres resultaron ser
 * paredes y 31 páginas de verdad. La tabla entera está en `medidas-26sep/censo.json`, junto
 * a las pruebas; esto es el resumen:
 *
 *   la pared de banco.santander.cl ..........  8 peticiones,   435 letras
 *   las otras dos paredes ...................  3 peticiones (bancoestado.cl, latamairlines)
 *   la portada real más flaca de las 31 ..... 23 peticiones,   261 letras (tuane.cl)
 *   la siguiente ............................ 75 peticiones
 *   la más flaca de TODO el banco ........... 18 peticiones (time.cl, medido el 23-sep)
 *
 * Entre la pared y la portada real más pobre que se ha medido hay un hueco, y el corte va
 * dentro del hueco. No hay ninguna portada real medida con 12 peticiones o menos: una página
 * de verdad, por pobre que sea, pide sus hojas de estilo, sus tipografías y sus imágenes.
 * Si algún día aparece una que no, este número se mueve con esa medición en la mano.
 */
export const MAX_PETICIONES_PARED = 12;
export const MIN_LETRAS_PAGINA = 500;

export function esCookieDePortero(nombre) {
  return COOKIES_DE_PORTERO.some((re) => re.test(String(nombre || '')));
}

/**
 * ¿El sitio nos dejó mirar de verdad?
 *
 * Un sitio que nos bloquea se ve casi igual que un sitio limpio: pocos terceros, pocas
 * cookies, nada que acusar. La diferencia la hace el TAMAÑO de lo que se abrió: una página
 * real carga sus cosas y tiene contenido; una pantalla de bloqueo trae cuatro archivos y
 * cuatro líneas. Sin esta guardia, "nos bloquearon" se informa como "está limpio", que es el
 * falso verde de la regla 3.
 *
 * Devuelve el MOTIVO, no un sí/no, y los dos motivos se dicen con palabras distintas:
 *
 *   'bloqueo'  el título es el de un desafío o un acceso denegado. Ahí sí se puede decir
 *              que el sitio no nos dejó entrar.
 *   'portero'  lo que se abrió no tiene forma de página (poquísimas peticiones y poquísimo
 *              texto) Y encima quedó la cookie de un gestor de bots escrita en el dominio
 *              del propio sitio. El guardia firmó la pantalla que miramos. No acusa al
 *              sitio: dice que no vimos lo que veníamos a ver. Es el motivo por el que
 *              www.santander.cl salía 77/100 con tres ítems en verde (25-sep).
 *
 *   'flaco'    poquísimas peticiones, y o poquísimo texto o NINGÚN dato de texto. Puede
 *              ser un bloqueo y puede ser una página de verdad que casi no tiene nada
 *              (example.com trae 127 caracteres y una sola petición, y es una página
 *              real). No sabemos cuál de las dos, así que NO se le dice al dueño que su
 *              sitio nos bloqueó: se dice lo que sí vimos, que es que no había con qué
 *              trabajar. Que el texto no se haya podido contar cuenta como no saber, no
 *              como saber que estaba bien.
 *
 * Los tres van a 'sin-confirmar' igual. Lo que cambia es que uno acusa al sitio y los otros
 * dos describen lo que pasó, y solo esos dos son siempre verdad.
 */
export function pareceBloqueo({ peticiones = [], cookies = [], letras = null, titulo = '', texto = '', urlFinal = '', dominio = '' }) {
  if (RE_PARED.test(llano(titulo))) return 'bloqueo';

  // El texto que quedó en pantalla, no el HTML crudo. Solo si es CORTO: una pared es corta
  // (la de www.bancoestado.cl pesa 650 bytes), y sin ese tope la frase "comprobación de
  // seguridad" en la portada de una empresa de seguridad saldría como bloqueo.
  const llanoTexto = llano(texto);
  if (llanoTexto.length <= MAX_TEXTO_PARED && RE_PARED.test(llanoTexto)) return 'bloqueo';

  // Dónde terminamos. Un sitio que manda a su página de fuera de línea no nos mostró el suyo.
  if (RE_RUTA_PARED.test(rutaDe(urlFinal))) return 'bloqueo';

  // ¿Lo que se abrió tiene FORMA de página?
  //
  // Esta es la pregunta que reemplazó a "¿son TODAS las cookies de un gestor de bots?". Una
  // pared no carga el sitio: trae su HTML, un par de hojas de estilo, tres imágenes y se
  // acaba. La de banco.santander.cl son 8 peticiones y 435 letras, sin un solo script. Una
  // portada de verdad, por pobre que sea, pide bastante más: la más flaca de las 31 del
  // 26-sep trae 23, y la más flaca de todo el banco, 18. Ver `MAX_PETICIONES_PARED`.
  const pocasPeticiones = peticiones.length <= MAX_PETICIONES_PARED;
  // "No sabemos cuánto texto había" NO es "había texto". `letras` viene en null cuando el
  // Runtime.evaluate que mide la página no pudo correr, y eso no es un accidente
  // independiente: en `medirConNavegador` el título, el texto en pantalla y `letras` salen
  // del MISMO evaluate. Cuando ese evaluate revienta, los tres detectores de texto mueren
  // juntos, y con ellos las tres primeras puertas de esta función.
  //
  // Lo que revienta un Runtime.evaluate es, entre otras cosas, un desafío de JavaScript que
  // se recarga solo y destruye el contexto de ejecución. O sea: el caso en que más falta
  // hace reconocer la pared es exactamente el caso en el que nos quedamos ciegos. Tratar el
  // "no sabemos" como si fuera texto suficiente devolvía la pared a verde por la puerta de
  // atrás, con la lista de nombres de cookies como única defensa, que es justo de lo que
  // este código lleva dos rondas tratando de dejar de depender.
  const sinDatoDeTexto = typeof letras !== 'number';
  const pocoTexto = !sinDatoDeTexto && letras < MIN_LETRAS_PAGINA;

  // Y si además quedó la cookie de un gestor de bots en el dominio del PROPIO sitio, sabemos
  // de quién era la pantalla y se puede decir con esas palabras. Va al mismo balde que
  // 'flaco' (sin-confirmar, fuera del puntaje) y no a 'bloqueo', porque 'bloqueo' acusa al
  // sitio de habernos cerrado la puerta y acá lo único que sabemos de cierto es que no vimos
  // lo que veníamos a ver.
  //
  // El "del propio dominio" NO es un adorno. Lo pidió un dato del banco: hotelescumbres.cl
  // deja UNA sola cookie, cf_clearance, y es de asksuite.com (el chat que tiene incrustado).
  // Un guardia que protege ESTE sitio escribe en ESTE dominio; el cf_clearance de un tercero
  // no dice nada sobre si vimos la página o no.
  //
  // El texto desconocido cuenta como poca página, igual que en la puerta genérica de abajo:
  // con la firma del guardia y una docena escasa de peticiones, lo que falta por saber no
  // cambia el diagnóstico.
  const propio = registrable(dominio);
  if (pocasPeticiones && (pocoTexto || sinDatoDeTexto) && propio
    && cookies.some((c) => esCookieDePortero(c.name) && registrable(c.domain) === propio)) {
    return 'portero';
  }

  // La misma pared, vista sin el nombre del guardia. Ya no exige que no haya cookies: una
  // pared SIEMPRE deja las suyas, y exigir cero cookies era justo lo que dejaba escapar a
  // banco.santander.cl, que deja dos.
  // Una sola petición y ninguna cookie: eso no es un sitio, es una respuesta. Un sitio real
  // pide al menos su hoja de estilos.
  if (peticiones.length <= 1 && cookies.length === 0) return 'flaco';

  // Y la puerta genérica, que hasta el 26-sep exigía `letras` numérico y por eso dejaba
  // pasar en VERDE a la pared que nos había dejado ciegos. Medido: la misma pared de 3
  // peticiones declina con `letras` medidas y sacaba 100/100 con tres verdes y "Nada
  // pendiente" con `letras` en null, que es el estado en el que la deja un desafío de
  // JavaScript.
  //
  // El "no sabemos" no suma ni resta, y acá eso significa 'flaco' (sin-confirmar, fuera del
  // puntaje), no `null`. Devolver `null` no es neutral: es declarar que lo que se abrió
  // tenía forma de página, que es precisamente lo que no pudimos comprobar.
  //
  // El corte no se abre: sigue pidiendo <=12 peticiones. Una portada real no cae acá aunque
  // el detector de texto se muera, porque ninguna de las 31 medidas el 26-sep baja de 18
  // (ver `MAX_PETICIONES_PARED`). Lo único que cambia es que dejar de poder mirar ya no se
  // premia.
  return pocasPeticiones && (pocoTexto || sinDatoDeTexto) ? 'flaco' : null;
}

/* ================================================================== *
 * De lo medido al informe. También puro.                              *
 * ================================================================== */

function conMayuscula(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

function enSegundos(ms) {
  if (typeof ms !== 'number' || !isFinite(ms)) return null;
  return (ms / 1000).toFixed(1).replace('.', ',');
}

function listaLegible(nombres) {
  if (!nombres || !nombres.length) return '';
  if (nombres.length === 1) return nombres[0];
  return nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1];
}

/**
 * Una línea por rastreador, con los tres verbos separados.
 *
 * Lo que NO se dice: "no envió datos". Solo miramos 18 segundos, así que la ausencia de
 * envío es una observación nuestra, no un hecho sobre el sitio. Se dice "en los segundos
 * que miramos no le vimos enviar datos", que es lo que de verdad sabemos.
 */
export function frasePorRastreador(h, segundosMirados) {
  const partes = [];
  const s = h.cargo && enSegundos(h.cargo.primeraMs);
  if (h.cargo) partes.push(s ? `cargó a los ${s} segundos` : 'cargó');
  if (h.cookie) {
    partes.push(h.cookie.nombres.length === 1
      ? `dejó escrita la cookie ${h.cookie.nombres[0]}`
      : `dejó escritas las cookies ${listaLegible(h.cookie.nombres)}`);
  }
  if (h.envio) {
    const se = enSegundos(h.envio.primeraMs);
    partes.push(se ? `envió datos de la visita a los ${se} segundos` : 'envió datos de la visita');
  }
  let frase = `${conMayuscula(h.nombre)} ${listaLegible(partes)}.`;
  // La distinción que el encargo pide no perder: cargar y dejar cookie sin llegar a enviar.
  if ((h.cargo || h.cookie) && !h.envio && RASTREADORES.find((r) => r.clave === h.clave)?.envio.length) {
    frase += ` En los ${segundosMirados} segundos que miramos no le vimos enviar datos.`;
  }
  return frase;
}

const BLOQUES = [
  {
    id: 'rastreadores',
    titulo: 'Qué corre antes de que alguien diga que sí',
    sub: 'Abrimos tu sitio en un navegador y no tocamos nada: ni un clic, ni un botón de aceptar. Todo lo que aparece acá pasó sin que nadie diera permiso.',
  },
  {
    id: 'aviso',
    titulo: 'El aviso de cookies',
    sub: 'La ley pide que el consentimiento sea previo e inequívoco, y que se manifieste mediante un acto afirmativo (Art. 12). Acá miramos si aparece algo en pantalla donde la persona pueda decir que sí o que no.',
  },
];

/**
 * El informe completo, a partir de una medición.
 *
 * `medicion` es lo que devuelve `medirConNavegador`, y también lo que la prueba arma con
 * datos reales:
 *   { urlFinal, titulo, msTotal, tras1, tras2, aviso, letras, fallo }
 * donde tras1 y tras2 son { ms, peticiones, cookies }.
 */
export function armarInforme(medicion, dominio) {
  if (medicion && medicion.fallo) {
    return falloDeLaRevision(medicion.fallo, dominio);
  }

  const tras1 = medicion.tras1 || { peticiones: [], cookies: [] };
  const tras2 = medicion.tras2 || tras1;
  const peticiones = tras2.peticiones || [];
  const cookies = tras2.cookies || [];
  const segundosMirados = Math.round((medicion.msTotal || 0) / 1000) || 18;

  // ¿Vimos el sitio, o nos taparon la vista? Si nos taparon, TODO queda sin confirmar. Es la
  // regla 3: preferimos no decir nada antes que decir "limpio" sobre una página que no era
  // la del cliente.
  // Motivo, no booleano: 'bloqueo' | 'flaco' | null. Ver `pareceBloqueo`.
  const bloqueado = pareceBloqueo({
    peticiones, cookies, dominio,
    letras: medicion.letras, titulo: medicion.titulo,
    texto: medicion.texto, urlFinal: medicion.urlFinal,
  });
  // Una carga incompleta (sin evento de carga, o cortada por el presupuesto) se informa como
  // parcial: se muestra lo que sí alcanzamos a registrar, y lo demás queda sin confirmar.
  const parcial = !!medicion.parcial;

  const hallados = clasificarRastreadores(peticiones, cookies);
  const terceros = resumirTerceros(peticiones, dominio);
  const gal = separarCookies(cookies, dominio);
  const aviso = leerAviso(medicion.aviso);
  const gesto = diferenciaPorElGesto(tras1, tras2);

  const cargaron = hallados.filter((h) => h.cargo);
  const conCookie = hallados.filter((h) => h.cookie);
  const enviaron = hallados.filter((h) => h.envio);

  const items = [];
  const add = (bloque, id, titulo, estado, peso, detalle, arreglo) =>
    items.push({ bloque, id, titulo, estado, ok: estado === 'ok', peso, detalle, arreglo: estado === 'ok' ? null : arreglo });

  const noPudimosMirar = bloqueado === 'bloqueo'
    ? 'Tu sitio nos bloqueó la lectura con un navegador, así que esto no lo sabemos. No lo contamos ni a favor ni en contra.'
    : bloqueado === 'portero'
      // Esta frase quedó atrasada respecto de su propia regla y decía algo que ya no se
      // comprueba (26-sep). Afirmaba "las ÚNICAS cookies que quedaron son las del sistema
      // que filtra robots", que era verdad mientras el motivo exigía el "todas". Desde que
      // lo que decide es la FORMA de la página, el motivo dispara igual con cookies
      // corrientes al lado, y ahí la frase pasa a ser falsa. El §23 de la prueba ya
      // construía ese caso exacto (la pared medida de banco.santander.cl con cinco cookies
      // comunes encima) y lo daba por bueno, porque comprueba el MOTIVO y no lo que se
      // dice; el §33 es el que mira la frase. Y no es un caso de laboratorio: un sitio
      // detrás de un F5 y de Akamai a la vez deja su BIGipServerPool_ junto al _abck, que
      // es scotiabank.cl tal como se midió el 26-sep.
      //
      // Ahora dice las dos cosas que sí se comprobaron: que lo que se abrió es demasiado
      // poco para ser una portada, y que el guardia firmó en el dominio del propio sitio.
      // No habla de cuánto texto había, porque en la rama de `letras` en null no lo
      // sabemos.
      ? 'Lo que se abrió no fue tu sitio: trajo un puñado de archivos, muchos menos de los que pide una portada, y quedó escrita en tu propio dominio la cookie del sistema que filtra robots que nos detectó. Lo que miramos fue su pantalla. Esto no lo sabemos, y no lo contamos ni a favor ni en contra.'
      : bloqueado === 'flaco'
        // Y la tercera de la misma familia (26-sep). "Casi no trae contenido" es una
        // afirmación sobre el TEXTO, y a 'flaco' se puede llegar sin haberlo medido: la
        // puerta de "una sola petición y ninguna cookie" vale incluso con `letras` en null,
        // que es lo que pasa cuando el detector de aviso tampoco pudo correr. Ahí la frase
        // afirmaba algo que nadie contó. (Desde el 26-sep la puerta genérica también deja
        // pasar el `letras` en null, así que llegar acá sin número ya no significa una sola
        // petición; puede ser cualquier cosa con <=12. La frase de abajo sirve para las
        // dos: no afirma cuánto texto había.) No cambia ningún estado ni ningún puntaje:
        // los casos que entran por acá ya iban a
        // sin-confirmar. Cambia lo que se le dice al dueño de un sitio sobre su sitio.
        ? (typeof medicion.letras === 'number'
          ? 'La página que abrimos casi no trae contenido, así que no podemos afirmar nada sobre ella. Puede ser que tu sitio no nos dejara entrar. No lo contamos ni a favor ni en contra.'
          : 'Lo que abrimos casi no trajo nada, y el texto de la página tampoco lo pudimos leer, así que no podemos afirmar nada sobre ella. Puede ser que tu sitio no nos dejara entrar. No lo contamos ni a favor ni en contra.')
        : 'No alcanzamos a verlo entero, así que esto no lo sabemos. No lo contamos ni a favor ni en contra.';

  // Decisión del coordinador (25-sep). Un sitio que nunca disparó el evento de carga es justo
  // uno del que no sabemos qué MÁS iba a cargar, así que los ítems de carga y de envío no
  // pueden salir en verde: bajan a sin-confirmar, fuera del puntaje. Lo que sí alcanzamos a
  // ver se informa igual (si algo cargó, sale como pendiente); lo que no puede quedar es un
  // "no vimos ninguno" presentado como una afirmación sobre el sitio cuando es una afirmación
  // sobre lo poco que alcanzamos a mirar. Es la misma regla que ya se aplica a 'flaco'.
  const noTerminoDeCargar = `Tu sitio no terminó de cargar en los ${segundosMirados} segundos que esperamos, ` +
    'así que no sabemos qué más iba a cargar. No lo contamos ni a favor ni en contra.';
  // La misma frase para el ítem de cookies, donde lo que no sabemos no es qué más iba a
  // cargar sino qué más iba a escribir.
  const noSabemosQueMasEscribia = `Tu sitio no terminó de cargar en los ${segundosMirados} segundos que esperamos, ` +
    'así que no sabemos qué otras cookies iba a escribir. No lo contamos ni a favor ni en contra.';

  /* --- 1. Rastreadores que cargan solos ---------------------------- */
  if (bloqueado) {
    add('rastreadores', 'carga', 'Rastreadores que parten solos', 'sin-confirmar', 3,
      noPudimosMirar,
      'Ábrelo tú en una ventana de incógnito y mira, en las herramientas del navegador, qué se descarga antes de que toques nada.');
  } else if (cargaron.length) {
    add('rastreadores', 'carga', 'Rastreadores que parten solos', 'pendiente', 3,
      `Sin que nadie aceptara nada, tu sitio cargó ${listaLegible(cargaron.map((h) => h.nombre))}. ` +
      cargaron.map((h) => frasePorRastreador(h, segundosMirados)).join(' '),
      'Un rastreador se carga después del permiso, no antes. Lo hace un gestor de consentimiento: retiene esos scripts hasta que la persona acepta.');
  } else if (parcial) {
    add('rastreadores', 'carga', 'Rastreadores que parten solos', 'sin-confirmar', 3, noTerminoDeCargar,
      'Ábrelo tú en una ventana de incógnito y mira, en las herramientas del navegador, qué se descarga antes de que toques nada.');
  } else {
    add('rastreadores', 'carga', 'Rastreadores que parten solos', 'ok', 3,
      `Miramos ${segundosMirados} segundos sin tocar nada y no vimos cargar ningún rastreador conocido de los que buscamos.`);
  }

  /* --- 2. Cookies escritas sin permiso ----------------------------- */
  if (bloqueado) {
    add('rastreadores', 'cookies', 'Cookies escritas sin permiso', 'sin-confirmar', 3, noPudimosMirar,
      'Ábrelo en incógnito, no toques nada, y revisa en las herramientas del navegador qué cookies quedaron.');
  } else if (conCookie.length) {
    const nombres = conCookie.flatMap((h) => h.cookie.nombres);
    add('rastreadores', 'cookies', 'Cookies escritas sin permiso', 'pendiente', 3,
      `${nombres.length === 1 ? 'Quedó escrita la cookie' : 'Quedaron escritas las cookies'} ${listaLegible(nombres)} ` +
      `sin que nadie diera permiso. ${conMayuscula(listaLegible(conCookie.map((h) => h.nombre)))} ` +
      `${conCookie.length === 1 ? 'la escribió' : 'las escribieron'} solo${conCookie.length === 1 ? '' : 's'}.`,
      'Estas cookies no son técnicas: identifican a la persona para medirla o para publicidad. Tienen que esperar al permiso.');
  } else if (gal.terceras.length) {
    // Decisión del coordinador (25-sep). El HECHO está confirmado y se dice entero: quedó una
    // cookie de otro dominio antes de que nadie diera permiso. Lo que NO sabemos es para qué
    // sirve, y ese "no sabemos" no puede costarle 3 de peso a nadie ni encender el botón del
    // kit. Por eso el ítem queda en sin-confirmar (fuera del puntaje, ni a favor ni en contra)
    // y la duda viaja en el arreglo, que es donde sirve: es una pregunta para quien mantiene
    // el sitio, no un cargo contra el dueño.
    //
    // Esta es además la puerta por la que sale el rastreador que no está en el catálogo. Diez
    // entradas, o dieciséis, nunca van a ser todos: el que no reconocemos deja su cookie acá y
    // el ítem no se va a verde, que era el otro camino al 100/100 falso.
    const cuantas = gal.terceras.length;
    add('rastreadores', 'cookies', 'Cookies escritas sin permiso', 'sin-confirmar', 3,
      'No vimos cookies de los rastreadores que buscamos. Sí ' +
      (cuantas === 1 ? 'quedó 1 cookie de otro dominio' : `quedaron ${cuantas} cookies de otros dominios`) +
      ` antes de que nadie diera permiso: ${listaLegible(gal.terceras.slice(0, 5).map((c) => `${c.nombre} (${c.dominio})`))}` +
      `${cuantas > 5 ? ', entre otras' : ''}.`,
      (cuantas === 1
        ? 'No sabemos para qué sirve: puede ser algo técnico o puede estar identificando a la persona. ' +
          'Pregúntale a quien mantiene tu sitio qué escribe y si puede esperar al permiso.'
        : 'No sabemos para qué sirve cada una: pueden ser algo técnico o pueden estar identificando a la persona. ' +
          'Pregúntale a quien mantiene tu sitio qué escribe cada una y si pueden esperar al permiso.'));
  } else if (parcial) {
    // La misma decisión del coordinador que ya rige en carga y en envío (25-sep), aplicada
    // donde faltaba: de un sitio que nunca disparó el evento de carga tampoco sabemos qué
    // cookies MÁS iba a escribir. "No dejó ninguna cookie" es una afirmación sobre el sitio
    // hecha con lo poco que alcanzamos a mirar, y encima en verde. Lo que sí vimos se dice
    // igual (si hubo cookies de rastreo o de terceros, el informe salió por una de las dos
    // ramas de arriba y este caso no se alcanza); lo que falta queda fuera del puntaje.
    add('rastreadores', 'cookies', 'Cookies escritas sin permiso', 'sin-confirmar', 3,
      (gal.propias.length
        ? `Alcanzamos a ver ${gal.propias.length === 1 ? '1 cookie, y es de tu propio dominio' : `${gal.propias.length} cookies, y todas son de tu propio dominio`}. `
        : 'Hasta donde alcanzamos a mirar, no quedó ninguna cookie. ') +
      noSabemosQueMasEscribia,
      'Ábrelo en incógnito, no toques nada, y revisa en las herramientas del navegador qué cookies quedaron.');
  } else {
    // El verde acotado, como los otros dos (26-sep). Decía "no dejó ninguna cookie de rastreo
    // ni de terceros", y la mitad de esa frase era una afirmación que no podemos hacer.
    //
    // Lo de terceros SÍ está confirmado: si hubiera quedado una cookie de otro dominio, el
    // informe habría salido por la rama de arriba. Lo de "de rastreo" no: la puerta de
    // escape para el rastreador que no está en el catálogo es la de las cookies de OTRO
    // dominio, así que una cookie de rastreo de PRIMERA PARTE que no reconocemos llega
    // hasta acá.
    //
    // No es hipotético. Estas cinco familias quedaron escritas COMO PROPIAS en el censo del
    // 26-sep (`medidas-26sep/censo.json`), y ninguna está en nuestro catálogo:
    //
    //   _ym_uid, _ym_d ................ Yandex Metrica   en sodimac.cl
    //   __rtbh.lid, __rtbh.uid ........ RTB House        en wom.cl, jumbo.cl, bci.cl
    //   _vwo_uuid_v2, _vis_opt_s ...... VWO              en entel.cl, skyairline.com
    //   _conv_v, _conv_s .............. Convert          en wom.cl
    //   dtCookie ...................... Dynatrace        en aguasandinas.cl
    //
    // Puestas sobre un prospecto limpio de verdad (uhc.cl, del banco del 25-sep) el informe
    // sale 77/100 con este ítem en verde, igual que sin ellas.
    //
    // Lo que se arregla es la FRASE, no el estado: un sitio genuinamente limpio tiene que
    // poder salir en verde o el producto no dice nada. Lo que no puede es afirmar en
    // absoluto lo que solo sabe de su propio catálogo, que es exactamente lo que los otros
    // dos ítems ya dicen con "de los que buscamos".
    add('rastreadores', 'cookies', 'Cookies escritas sin permiso', 'ok', 3,
      gal.propias.length
        ? 'Sin tocar nada, tu sitio no dejó ninguna cookie de otro dominio ni ninguna de los ' +
          'rastreadores que buscamos. ' +
          (gal.propias.length === 1
            ? 'La única que escribió es de tu propio dominio.'
            : `Las ${gal.propias.length} que escribió son de tu propio dominio.`)
        : 'Sin tocar nada, tu sitio no dejó ninguna cookie.');
  }

  /* --- 3. Datos enviados a terceros -------------------------------- */
  // Peso 4: es la más grave de las tres. Cargar un archivo y dejar una cookie son pasos
  // previos; enviar es el momento en que los datos de la visita salen de tu sitio.
  if (bloqueado) {
    add('rastreadores', 'envio', 'Datos que ya salieron de tu sitio', 'sin-confirmar', 4, noPudimosMirar,
      'Ábrelo en incógnito y mira, en la pestaña de red del navegador, a qué direcciones sale información antes de que aceptes.');
  } else if (enviaron.length) {
    add('rastreadores', 'envio', 'Datos que ya salieron de tu sitio', 'pendiente', 4,
      `Sin que nadie aceptara nada, tu sitio ya le mandó datos de la visita a ${listaLegible(enviaron.map((h) => h.nombre))}. ` +
      enviaron.map((h) => frasePorRastreador(h, segundosMirados)).join(' '),
      'Esto es lo primero que hay que detener: una vez que los datos salieron, ya salieron. Un gestor de consentimiento los retiene hasta que la persona acepte.');
  } else if (parcial) {
    add('rastreadores', 'envio', 'Datos que ya salieron de tu sitio', 'sin-confirmar', 4, noTerminoDeCargar,
      'Ábrelo en incógnito y mira, en la pestaña de red del navegador, a qué direcciones sale información antes de que aceptes.');
  } else if (cargaron.length || conCookie.length) {
    add('rastreadores', 'envio', 'Datos que ya salieron de tu sitio', 'ok', 4,
      `En los ${segundosMirados} segundos que miramos, ninguno de los rastreadores que cargaron alcanzó a enviar datos de la visita. ` +
      'Estaban listos para hacerlo.');
  } else {
    add('rastreadores', 'envio', 'Datos que ya salieron de tu sitio', 'ok', 4,
      `En los ${segundosMirados} segundos que miramos, no salió ninguna petición con datos de la visita hacia los rastreadores que buscamos.`);
  }

  /* --- 4. El aviso de cookies -------------------------------------- */
  const algoCorrio = cargaron.length > 0 || conCookie.length > 0 || enviaron.length > 0;
  if (bloqueado || aviso.estado === 'no-se-pudo') {
    add('aviso', 'aviso', 'Si aparece un aviso al entrar', 'sin-confirmar', 3,
      aviso.motivo === 'marco'
        ? 'Hay un aviso en tu sitio que no pudimos leer, porque vive dentro de un marco de otro dominio. No podemos decir si es un aviso de cookies ni qué ofrece.'
        : noPudimosMirar,
      'Ábrelo tú en una ventana de incógnito y mira si aparece algo donde puedas aceptar o rechazar.');
  } else if (aviso.estado === 'visible' && algoCorrio) {
    // El falso verde más fácil de dar: un banner que se muestra mientras los rastreadores
    // ya corrieron. Apareció el aviso, sí, y no retuvo nada. No va en verde.
    add('aviso', 'aviso', 'Si aparece un aviso al entrar', 'pendiente', 3,
      `Sí aparece un aviso${aviso.botones.length ? ` (sus botones dicen ${listaLegible(aviso.botones.map((b) => `"${b}"`))})` : ''}, ` +
      'pero los rastreadores ya habían partido antes de que nadie lo tocara. El aviso está, y no está reteniendo nada.',
      'El aviso tiene que retener los scripts, no solo anunciarlos. Revisa con quien lo instaló si está en modo "solo informar".');
  } else if (aviso.estado === 'visible') {
    // El CUARTO verde, y le faltaba el mismo acotamiento que se les arregló a los otros tres
    // (26-sep). Decía "no corrió ningún rastreador", en absoluto, cuando `algoCorrio` se
    // calcula sobre `hallados`, o sea solo sobre nuestro catálogo. Es la misma frase falsa
    // que el ítem de cookies acaba de dejar de decir, y acá importa más todavía: este es el
    // informe que sale DESPUÉS de instalar el kit, cuando el gestor ya está puesto, y es el
    // momento en que menos se puede prometer de más.
    //
    // El invariante que lo cuida está en el §32 de la prueba: un ítem en verde que hable de
    // rastreadores tiene que decir de cuáles habla. Hasta hoy ese bucle recorría un solo
    // informe, el de uhc.cl, donde este ítem no sale en verde, así que pasaba sin tocarlo.
    // EL CUARTO FALSO VERDE (27-sep). La decisión del §25, dejar este ítem en verde aunque la
    // carga quedara a medias, es correcta PARA LA PRIMERA MITAD de la frase: que aparece un
    // aviso se ve con los ojos y no depende de que el evento de carga llegara.
    //
    // Lo que no se sostiene es la segunda mitad. "Mientras no lo tocamos no corrió ninguno"
    // es una afirmación sobre LA CARGA, y la carga es justo lo que se acaba de declarar
    // desconocido. Medido: con `parcial` este era el ÚNICO verde de la pantalla, o sea lo
    // único positivo que la persona se llevaba, y contradecía a los otros tres ítems que
    // tres líneas más arriba dicen "no sabemos qué más iba a cargar".
    //
    // Se arregla la frase y no el estado: el aviso está y eso es cierto.
    add('aviso', 'aviso', 'Si aparece un aviso al entrar', 'ok', 3,
      `Aparece un aviso al entrar${aviso.botones.length ? `, con botones que dicen ${listaLegible(aviso.botones.map((b) => `"${b}"`))}` : ''}. ` +
      (parcial
        ? 'Tu sitio no terminó de cargar, así que no alcanzamos a ver si retiene los rastreadores hasta que alguien responde: eso queda sin confirmar. '
        : 'Y mientras no lo tocamos no corrió ninguno de los rastreadores que buscamos. ') +
      'No revisamos qué pasa cuando alguien acepta o rechaza.');
  } else {
    add('aviso', 'aviso', 'Si aparece un aviso al entrar', 'pendiente', 3,
      `Estuvimos ${segundosMirados} segundos en tu sitio, movimos el mouse y bajamos la página, y no apareció ningún aviso de cookies.` +
      (algoCorrio ? ' Los rastreadores partieron igual.' : ''),
      'Instala un gestor de consentimiento que muestre el aviso al entrar y retenga los rastreadores hasta que la persona responda.');
  }

  /* --- Puntaje: solo sobre lo confirmado --------------------------- */
  // Misma fórmula que el chequeo rápido, para que los dos números signifiquen lo mismo.
  const puntuables = items.filter((i) => i.estado !== 'sin-confirmar');
  const pesoTotal = items.reduce((a, i) => a + i.peso, 0);
  const pesoConfirmado = puntuables.reduce((a, i) => a + i.peso, 0);
  const obtenido = puntuables.reduce((a, i) => a + (i.estado === 'ok' ? i.peso : 0), 0);
  const puntaje = pesoConfirmado && pesoConfirmado * 2 >= pesoTotal
    ? Math.round((obtenido / pesoConfirmado) * 100)
    : null;

  /* --- Informativos: contexto, sin puntaje ------------------------- */
  const informativos = [];
  if (terceros.length) {
    informativos.push({
      id: 'terceros',
      titulo: 'Con quién habló tu sitio',
      detalle: `Sin que nadie tocara nada, tu sitio le pidió algo a ${terceros.length} ` +
        `${terceros.length === 1 ? 'dominio que no es tuyo' : 'dominios que no son tuyos'}: ` +
        `${listaLegible(terceros.slice(0, 8).map((t) => t.dominio))}` +
        `${terceros.length > 8 ? ', entre otros' : ''}. Cada petición lleva al menos la dirección IP de quien visita y desde qué página venía.`,
    });
  }
  if (gesto.rastreadoresNuevos.length || gesto.cookiesNuevas.length) {
    informativos.push({
      id: 'gesto',
      titulo: 'Lo que apareció al mover el mouse',
      detalle: 'Después de mover el mouse y bajar la página, sin hacer un solo clic, apareció ' +
        [gesto.rastreadoresNuevos.length ? listaLegible(gesto.rastreadoresNuevos) : null,
         gesto.cookiesNuevas.length ? `${gesto.cookiesNuevas.length === 1 ? 'la cookie' : 'las cookies'} ${listaLegible(gesto.cookiesNuevas)}` : null]
          .filter(Boolean).join(', y ') +
        '. Varios sitios retrasan sus scripts hasta el primer gesto, y una revisión que solo mira la carga los da por limpios.',
    });
  }
  if (parcial) {
    informativos.push({
      id: 'parcial',
      titulo: 'Tu sitio no terminó de cargar',
      detalle: `Tu sitio no terminó de cargar en los ${segundosMirados} segundos que esperamos. ` +
        'Lo de arriba es lo que sí alcanzamos a registrar, y puede quedar corto. Lo que no vimos no está contado en contra tuya.',
    });
  }
  informativos.push({
    id: 'como-miramos',
    titulo: 'Cómo miramos',
    detalle: `Abrimos tu sitio en un navegador limpio, sin cookies ni historial, y lo dejamos ` +
      `${segundosMirados} segundos. Movimos el mouse y bajamos la página. No hicimos ningún clic, ` +
      'para no aceptar sin querer un aviso y terminar midiendo un sitio con el permiso ya dado. ' +
      'Esto describe lo que vimos; no dice si cumples o no la ley, y no es asesoría legal.',
  });

  return {
    ok: true,
    dominio,
    revisado: medicion.urlFinal || `https://${dominio}/`,
    revisadoEn: new Date().toISOString(),
    puntaje,
    pesoConfirmado,
    pesoTotal,
    pendientes: items.filter((i) => i.estado === 'pendiente').length,
    sinConfirmar: items.filter((i) => i.estado === 'sin-confirmar').length,
    segundosMirados,
    parcial,
    bloqueado,
    bloques: BLOQUES,
    items,
    informativos,
    // Los datos crudos legibles, por si la portada quiere dibujar la tabla de los tres
    // verbos en vez del párrafo. Los tres campos siguen separados hasta el final.
    rastreadores: hallados,
    terceros,
    cookies: gal,
    aviso,
    gesto,
  };
}

/* ================================================================== *
 * Las fallas. Cada una con su mensaje, y ninguno afirma nada          *
 * sobre el sitio del prospecto.                                       *
 * ================================================================== */

// El detalle del error NUNCA viaja al visitante: un 401 nuestro no es asunto suyo, y decir
// "token inválido" filtra cómo está configurado esto. Va al log del servidor y basta.
export const FALLAS = {
  'sin-configurar': {
    tipo: 'nuestro',
    mensaje: 'La revisión con navegador todavía no está disponible. Lo que ves arriba es la lectura del código de tu sitio.',
  },
  'sin-permiso': {
    tipo: 'nuestro',
    mensaje: 'La revisión con navegador todavía no está disponible. Lo que ves arriba es la lectura del código de tu sitio.',
  },
  'cuota': {
    tipo: 'nuestro',
    mensaje: 'Hoy ya hicimos todas las revisiones profundas que podemos. Vuelve mañana y la hacemos.',
  },
  'tope-ip': {
    tipo: 'nuestro',
    // Decía "espera un momento" y el tope NO es de un momento: son 20 al día por IP, contadas
    // por fecha, así que el contador se pone en cero mañana y no en un rato. Quien lo leyera
    // se quedaba recargando para siempre.
    //
    // Y termina con una puerta abierta. Quien revisa veinte sitios en un día es casi siempre
    // alguien que trabaja con sitios, que es justo con quien queremos hablar: mandarlo a
    // esperar hasta mañana y nada más es despedir al único visitante que ya demostró que
    // esto le sirve.
    //
    // Y no dice "ya hiciste": el contador es por IP, y una IP es una oficina, un edificio o
    // un operador móvil entero. Decirle "ya hiciste veinte" a quien hizo una es acusarlo de
    // algo que no hicimos cómo saber. Se dice de dónde sale la cuenta y se deja la puerta
    // abierta; la dirección a la que escribir la pone la portada, como enlace.
    mensaje: 'Desde tu conexión ya se hicieron todas las revisiones profundas que damos por día. ' +
      'El contador se pone en cero mañana; si necesitas más ahora, escríbenos.',
  },
  'navegador': {
    tipo: 'nuestro',
    mensaje: 'No pudimos abrir tu sitio en un navegador. No es un resultado sobre tu sitio, es un problema nuestro.',
  },
  'no-resuelve': {
    tipo: 'entrada',
    mensaje: 'Ese dominio no responde. Revisa que esté bien escrito.',
  },
  'destino': {
    tipo: 'entrada',
    mensaje: 'Esa dirección lleva a un destino que este chequeo no sigue, así que no hay nada que revisar.',
  },
  'no-carga': {
    tipo: 'sitio',
    mensaje: 'Tu sitio no terminó de cargar en el tiempo que esperamos.',
  },
  // Clave aparte de 'no-carga' a propósito. 'no-carga' es del sitio (se agotó SU tiempo de
  // respuesta); esto es nuestro: se acabaron los 45 segundos de presupuesto que nos damos por
  // revisión. Estaban juntos y el mensaje le echaba la culpa al sitio del prospecto por un
  // límite que nos pusimos nosotros.
  'presupuesto': {
    tipo: 'nuestro',
    mensaje: 'Se nos acabó el tiempo antes de terminar de mirar tu sitio. No es un resultado sobre tu sitio.',
  },
};

export function falloDeLaRevision(clave, dominio) {
  const f = FALLAS[clave] || FALLAS['navegador'];
  return { ok: false, tipo: f.tipo, clave, dominio, error: f.mensaje };
}

/* ================================================================== *
 * El guion que corre dentro de la página.                             *
 * ================================================================== */

/**
 * Detector de aviso de cookies, versión 3.
 *
 * La v1 y la v2 decían "sin aviso" en hotelescumbres.cl, que SÍ tiene banner. El fallo:
 * el banner vive en un <iframe> que es position:fixed, pero su contenido, dentro del
 * iframe, no lo es. El detector se metía al documento del iframe y ahí aplicaba el filtro
 * de posición, que no calza nunca.
 *
 * La regla correcta, y la que está escrita acá: el candidato es el ELEMENTO QUE FLOTA, sea
 * div o iframe; si es iframe, el texto se lee de su contentDocument. Con esto los tres
 * sitios de la prueba salen bien: hotelescumbres encuentra su banner con Customize /
 * Accept / Decline, spindlelab el suyo con Rechazar / Aceptar, y awasi sigue sin aviso,
 * que es la verdad.
 *
 * Recorre además shadow DOM. Un marco que no se pueda leer (cross-origin) va a
 * `marcosIlegibles`, que fuerza 'sin-confirmar' y NUNCA "no tiene aviso".
 */
const JS_AVISO = `(() => {
  const RE = /(cookie|consentimiento|acept|rechaz|rgpd|gdpr|privacidad|consent)/i;
  const RE_BOTON = /(acept|acepto|entendido|de acuerdo|permitir|rechaz|configurar|personaliz|accept|decline|reject|customize|got it)/i;
  const avisos = []; const opacos = []; const nodos = [];

  function recolectar(raiz) {
    let els; try { els = raiz.querySelectorAll('*') } catch (e) { return }
    for (const el of els) { nodos.push(el); if (el.shadowRoot) recolectar(el.shadowRoot); }
  }
  recolectar(document);

  for (const el of nodos) {
    if (avisos.length >= 4) break;
    let cs; try { cs = getComputedStyle(el) } catch (e) { continue }
    const flota = cs.position === 'fixed' || cs.position === 'sticky' || el.matches('dialog[open]');
    if (!flota) continue;
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.1) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 150 || r.height < 30) continue;
    if (r.bottom < 0 || r.top > innerHeight) continue;

    let texto = '', botones = [], fuente = 'elemento', ilegible = false;
    if (el.tagName === 'IFRAME') {
      fuente = 'iframe';
      let d = null; try { d = el.contentDocument } catch (e) {}
      if (d && d.body) {
        texto = (d.body.innerText || '').replace(/\\s+/g, ' ').trim();
        botones = [...d.querySelectorAll('button,a,[role=button],input[type=button],input[type=submit]')]
          .map((b) => (b.innerText || b.value || '').trim()).filter((s) => s && s.length < 40);
      } else { ilegible = true; }
    } else {
      texto = (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim();
      botones = [...el.querySelectorAll('button,a,[role=button],input[type=button],input[type=submit]')]
        .map((b) => (b.innerText || b.value || '').trim()).filter((s) => s && s.length < 40);
    }

    if (ilegible) { opacos.push({ src: String(el.src || '(sin src)').slice(0, 90) }); continue; }
    if (!RE.test(texto)) continue;
    if (avisos.some((a) => a.el !== el && a.el.contains(el))) continue;
    avisos.push({ el, fuente, texto: texto.slice(0, 220), botones: botones.slice(0, 6),
      tieneBotonDeConsentimiento: botones.some((b) => RE_BOTON.test(b)) });
  }
  return JSON.stringify({
    avisos: avisos.map(({ fuente, texto, botones, tieneBotonDeConsentimiento }) =>
      ({ fuente, texto, botones, tieneBotonDeConsentimiento })),
    marcosIlegibles: opacos,
    letras: (document.body && document.body.innerText || '').replace(/\\s+/g, ' ').trim().length,
    // Los primeros 600 caracteres de lo que quedó EN PANTALLA. Una pared de firewall dice lo
    // suyo arriba y en pocas líneas, así que con esto alcanza y no se arrastra la portada
    // entera por el WebSocket.
    texto: (document.body && document.body.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 600),
    titulo: document.title || '',
  });
})()`;

/**
 * Tapa de seguridad, instalada ANTES de que corra un solo script de la página.
 *
 * Va junto con `Network.setBlockedURLs`, no en vez de. El bloqueo de red frena la petición;
 * la tapa frena el intento en el propio JavaScript, por si el sitio usa un camino que el
 * patrón de red no cubre. En la prueba del 25-sep: 11 peticiones bloqueadas en awasi, 4 en
 * hotelescumbres, 0 fugas.
 */
const JS_TAPA = `(() => {
  const MALOS = ${JSON.stringify(HOSTS_BLOQUEADOS)};
  const malo = (u) => { try { return MALOS.includes(new URL(u, location.href).hostname) } catch (e) { return false } };
  const f = window.fetch;
  window.fetch = function (i, ...r) {
    const u = typeof i === 'string' ? i : (i && i.url) || '';
    if (malo(u)) return Promise.reject(new TypeError('bloqueado'));
    return f.call(this, i, ...r);
  };
  const o = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u, ...r) {
    if (malo(u)) throw new Error('bloqueado');
    return o.call(this, m, u, ...r);
  };
  const b = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);
  if (b) navigator.sendBeacon = (u, d) => (malo(u) ? false : b(u, d));
})()`;

/* ================================================================== *
 * Cliente CDP sobre el WebSocket de Workers.                          *
 * ================================================================== */

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Abre el navegador remoto de Cloudflare y devuelve un cliente CDP mínimo.
 *
 * Distingue las tres fallas de la tabla del encargo por el código con que responde la API:
 *   401  token mal o vencido
 *   403  plan no activado (o el token sin el permiso Browser Rendering)
 *   429  cuota del mes agotada
 * Las tres le dicen al visitante lo mismo y genérico; el detalle va al log.
 */
async function conectarNavegador(env) {
  const cuenta = env.CF_ACCOUNT_ID;
  const token = env.CF_BROWSER_TOKEN;
  if (!cuenta || !token) throw new FallaDeRevision('sin-configurar', 'faltan CF_ACCOUNT_ID o CF_BROWSER_TOKEN');

  // keep_alive al mínimo: es cuánto sobrevive el navegador después de que nos
  // desconectamos, y cada segundo de más es cuota gastada. El guion dura 25 s, así que
  // 10 s de gracia sobran y un fallo nuestro no deja una sesión ardiendo diez minutos.
  const url = `wss://api.cloudflare.com/client/v4/accounts/${cuenta}/browser-rendering/devtools/browser?keep_alive=10000`;

  let resp;
  try {
    resp = await fetch(url, {
      headers: { Upgrade: 'websocket', Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    throw new FallaDeRevision('navegador', 'fetch del upgrade: ' + e.message);
  }

  if (resp.status === 401) throw new FallaDeRevision('sin-permiso', 'la API contestó 401');
  if (resp.status === 403) throw new FallaDeRevision('sin-configurar', 'la API contestó 403');
  if (resp.status === 429) throw new FallaDeRevision('cuota', 'la API contestó 429');

  const ws = resp.webSocket;
  if (!ws) {
    // El supuesto que la doc no confirma: si el upgrade no salió, lo más probable es que el
    // `Authorization` no haya viajado con el `Upgrade`. Se registra con esas palabras para
    // que el próximo que lo lea sepa que toca el camino de respaldo, y no se ponga a buscar
    // el token.
    throw new FallaDeRevision('navegador',
      `sin webSocket en la respuesta (status ${resp.status}). Puede ser que el fetch de Workers no ` +
      'deje pasar el header Authorization junto con Upgrade: si es eso, toca el camino de respaldo ' +
      '(Worker aparte con el binding de browser + service binding).');
  }
  ws.accept();

  const pendientes = new Map();
  const oyentes = [];
  let id = 0;
  let cerrado = false;

  ws.addEventListener('message', (ev) => {
    let m;
    try { m = JSON.parse(typeof ev.data === 'string' ? ev.data : ''); } catch { return; }
    if (!m) return;
    if (m.id !== undefined) {
      const p = pendientes.get(m.id);
      if (!p) return;
      pendientes.delete(m.id);
      m.error ? p.mal(new Error(m.error.message || 'error CDP')) : p.ok(m.result);
    } else {
      for (const f of oyentes) { try { f(m); } catch {} }
    }
  });
  const morir = () => {
    cerrado = true;
    for (const [, p] of pendientes) p.mal(new Error('la sesión del navegador se cerró'));
    pendientes.clear();
  };
  ws.addEventListener('close', morir);
  ws.addEventListener('error', morir);

  return {
    enviar(method, params = {}, sessionId) {
      if (cerrado) return Promise.reject(new Error('la sesión del navegador se cerró'));
      const msg = { id: ++id, method, params };
      if (sessionId) msg.sessionId = sessionId;
      return new Promise((ok, mal) => {
        pendientes.set(msg.id, { ok, mal });
        try { ws.send(JSON.stringify(msg)); } catch (e) { pendientes.delete(msg.id); return mal(e); }
        setTimeout(() => {
          if (pendientes.has(msg.id)) { pendientes.delete(msg.id); mal(new Error('sin respuesta de CDP: ' + method)); }
        }, PLAZO_CDP_MS);
      });
    },
    al(f) { oyentes.push(f); },
    cerrar() { try { ws.close(); } catch {} },
  };
}

/** Una falla con clave, para que el mensaje del visitante salga de la tabla y no del error. */
export class FallaDeRevision extends Error {
  constructor(clave, detalle) {
    super(detalle || clave);
    this.clave = clave;
    this.detalle = detalle;
  }
}

/* ================================================================== *
 * El guion de dos tramos.                                             *
 * ================================================================== */

/**
 * Mide un sitio: tramo pasivo, después gesto sin un solo clic.
 *
 * NUNCA se hace clic. Un clic podría aceptar el banner de cookies, y entonces mediríamos
 * un sitio con el consentimiento ya dado, que es exactamente lo contrario de lo que
 * queremos saber.
 */
// Se exporta para poder correrla contra un Chrome local por CDP, que es la única forma de
// probar el guion (el portón de navegación, la tapa de web3forms y el detector de aviso) sin
// el binding de Cloudflare. El cliente que recibe solo tiene que ofrecer { enviar, al }.
export async function medirConNavegador(cliente, url, dominio, opciones = {}) {
  const pasivoMs = opciones.pasivoMs ?? TRAMO_PASIVO_MS;
  const gestoMs = opciones.gestoMs ?? TRAMO_GESTO_MS;
  const t0 = Date.now();
  const marca = () => Date.now() - t0;

  // Contexto nuevo por chequeo: sin cookies ni caché de la medición anterior. Sin esto, el
  // segundo sitio del día heredaría las cookies del primero y las contaríamos como suyas.
  const { browserContextId } = await cliente.enviar('Target.createBrowserContext', { disposeOnDetach: true });
  let targetId = null;
  try {
    ({ targetId } = await cliente.enviar('Target.createTarget', { url: 'about:blank', browserContextId }));
    const { sessionId: s } = await cliente.enviar('Target.attachToTarget', { targetId, flatten: true });

    const peticiones = [];
    let cargoDeVerdad = false;
    let errorDeRed = null;
    let destinoRechazado = false;

    cliente.al((m) => {
      if (m.sessionId !== s) return;
      if (m.method === 'Network.requestWillBeSent') {
        const p = m.params;
        peticiones.push({
          url: p.request.url,
          metodo: p.request.method,
          tipo: p.type || '',
          ms: marca(),
          // Una petición con cuerpo casi siempre lleva datos, no solo pide un archivo.
          conCuerpo: !!p.request.postData || p.request.method !== 'GET',
        });
      }
      if (m.method === 'Page.loadEventFired') cargoDeVerdad = true;
      if (m.method === 'Network.loadingFailed' && m.params.type === 'Document' && !errorDeRed) {
        errorDeRed = m.params.errorText || '';
      }
      // EL PORTÓN, en cada salto. Cada navegación (la primera y cada redirección) llega acá
      // como un Document pausado, y pasa por `destinoPermitido` — la MISMA función que usa
      // el chequeo rápido, importada, no copiada. Un sitio que nos redirige a una red
      // interna o a un puerto raro se corta acá y la revisión se descarta entera.
      //
      // Solo Document: interceptar TODO obligaría a un continueRequest por cada una de las
      // 150 peticiones de una portada, y además frenaría a los terceros que justamente
      // venimos a medir. Lo que el portón protege es a dónde apuntamos nosotros, y eso son
      // las navegaciones.
      if (m.method === 'Fetch.requestPaused') {
        const { requestId, request } = m.params;
        if (destinoPermitido(request.url)) {
          cliente.enviar('Fetch.continueRequest', { requestId }, s).catch(() => {});
        } else {
          destinoRechazado = true;
          cliente.enviar('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' }, s).catch(() => {});
        }
      }
    });

    await cliente.enviar('Network.enable', {}, s);
    await cliente.enviar('Page.enable', {}, s);
    await cliente.enviar('Runtime.enable', {}, s);
    await cliente.enviar('Fetch.enable', {
      patterns: [{ urlPattern: '*', resourceType: 'Document', requestStage: 'Request' }],
    }, s);
    // Portón de red para el formulario de contacto, a nivel de navegador.
    await cliente.enviar('Network.setBlockedURLs', { urls: HOSTS_BLOQUEADOS.map((h) => `*${h}*`) }, s);
    await cliente.enviar('Network.setUserAgentOverride', { userAgent: USER_AGENT }, s).catch(() => {});
    // Y la tapa en JS, antes de que corra nada de la página.
    await cliente.enviar('Page.addScriptToEvaluateOnNewDocument', { source: JS_TAPA }, s);
    await cliente.enviar('Emulation.setDeviceMetricsOverride',
      { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false }, s);

    /* --- tramo 1: pasivo, sin tocar nada -------------------------- */
    let nav;
    try {
      nav = await cliente.enviar('Page.navigate', { url }, s);
    } catch (e) {
      return { fallo: 'navegador', detalle: e.message };
    }
    if (nav && nav.errorText) {
      return { fallo: claveDeErrorDeRed(nav.errorText), detalle: nav.errorText };
    }

    await dormir(pasivoMs);
    const tras1 = await instantanea(cliente, s, browserContextId, peticiones, marca());

    /* --- tramo 2: gesto. Mouse y rueda, CERO clics ---------------- */
    for (const [x, y] of [[300, 300], [700, 420], [900, 600], [500, 700]]) {
      await cliente.enviar('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, buttons: 0 }, s).catch(() => {});
      await dormir(120);
    }
    for (let i = 0; i < 4; i++) {
      await cliente.enviar('Input.dispatchMouseEvent',
        { type: 'mouseWheel', x: 683, y: 450, deltaX: 0, deltaY: 600, buttons: 0 }, s).catch(() => {});
      await dormir(400);
    }
    await cliente.enviar('Runtime.evaluate',
      { expression: 'window.scrollTo(0, document.body.scrollHeight / 2)' }, s).catch(() => {});

    await dormir(gestoMs);
    const tras2 = await instantanea(cliente, s, browserContextId, peticiones, marca());

    /* --- aviso de cookies, título y cantidad de texto -------------- */
    let aviso = { fallo: true };
    try {
      const r = await cliente.enviar('Runtime.evaluate',
        { expression: JS_AVISO, returnByValue: true, timeout: 5000 }, s);
      aviso = JSON.parse(r.result?.value || 'null') || { fallo: true };
    } catch (e) {
      aviso = { fallo: true, detalle: e.message };
    }

    let urlFinal = url;
    try {
      const r = await cliente.enviar('Runtime.evaluate', { expression: 'location.href', returnByValue: true }, s);
      if (r.result?.value) urlFinal = r.result.value;
    } catch {}

    // Último control del portón sobre dónde terminamos. El intercept de arriba ya corta cada
    // navegación, y esto es el cinturón encima del tirante: si por cualquier camino la
    // página terminó en un destino que el portón no acepta, no se informa sobre él.
    if (destinoRechazado || !destinoPermitido(urlFinal)) {
      return { fallo: 'destino', detalle: urlFinal };
    }

    // Un Document que falló Y ningún evento de carga: la página no llegó a existir, así que
    // se informa el error de red en vez de un informe parcial sobre la nada. Si el evento de
    // carga sí llegó, un Document fallado de más abajo (un iframe) no invalida lo medido.
    if (errorDeRed && !cargoDeVerdad) {
      return { fallo: claveDeErrorDeRed(errorDeRed), detalle: errorDeRed };
    }

    return {
      urlFinal,
      titulo: aviso.titulo || '',
      texto: typeof aviso.texto === 'string' ? aviso.texto : '',
      letras: typeof aviso.letras === 'number' ? aviso.letras : null,
      msTotal: marca(),
      // Sin evento de carga, lo medido es parcial: se muestra lo que sí se registró y el
      // resto queda sin confirmar. Nunca se descarta entero, porque lo que vimos lo vimos.
      parcial: !cargoDeVerdad,
      tras1,
      tras2,
      aviso,
    };
  } finally {
    if (targetId) await cliente.enviar('Target.closeTarget', { targetId }).catch(() => {});
    await cliente.enviar('Target.disposeBrowserContext', { browserContextId }).catch(() => {});
  }
}

async function instantanea(cliente, s, browserContextId, peticiones, ms) {
  let cookies = [];
  try {
    const r = await cliente.enviar('Storage.getCookies', { browserContextId });
    cookies = r.cookies || [];
  } catch {
    try {
      const r = await cliente.enviar('Network.getAllCookies', {}, s);
      cookies = r.cookies || [];
    } catch {}
  }
  return { ms, peticiones: peticiones.slice(), cookies };
}

/** Traduce el error de red de Chrome a una de las claves de `FALLAS`. */
export function claveDeErrorDeRed(texto) {
  const t = String(texto || '');
  if (/ERR_NAME_NOT_RESOLVED|ERR_NAME_RESOLUTION_FAILED/i.test(t)) return 'no-resuelve';
  if (/ERR_CONNECTION_REFUSED|ERR_CONNECTION_CLOSED|ERR_CONNECTION_RESET|ERR_ADDRESS_UNREACHABLE/i.test(t)) return 'no-resuelve';
  if (/ERR_BLOCKED_BY_CLIENT/i.test(t)) return 'destino';
  if (/ERR_TIMED_OUT|ERR_CONNECTION_TIMED_OUT/i.test(t)) return 'no-carga';
  return 'navegador';
}

/* ================================================================== *
 * Tope de abuso.                                                      *
 *                                                                     *
 * Tres capas, de la más barata a la más cara. Esta es la segunda y la *
 * tercera; la primera no es código.                                   *
 *                                                                     *
 * CAPA 1 (panel, sin código): una regla de Rate Limiting del WAF sobre *
 *   /api/profundo, 5 peticiones por IP cada 60 s, acción block. Frena  *
 *   el golpeteo antes de que llegue a costar nada. Va por panel porque *
 *   el binding `ratelimit` de Workers NO está entre los que soporta    *
 *   Pages Functions.                                                   *
 *                                                                     *
 * CAPA 2 (acá): contadores en KV. Por IP, 20 al día. Y uno global, 80  *
 *   al día, que son unos 40 minutos de navegador: bien por debajo de   *
 *   las 10 horas del mes. El global es el que de verdad protege la     *
 *   cuenta, porque es el único que un ataque repartido entre muchas IP *
 *   no puede esquivar.                                                 *
 *                                                                     *
 * CAPA 3 (acá): caché del resultado por dominio, 24 h. El mismo        *
 *   prospecto revisado dos veces el mismo día no abre un segundo       *
 *   navegador. Es el ahorro más grande de los tres y además hace que   *
 *   la segunda consulta salga instantánea.                             *
 *   Con `rehacer=1` esta capa se salta, y SOLO esta: quien arregló su  *
 *   sitio pide una medición nueva y la obtiene, pero gastando cupo de  *
 *   las capas 2 como cualquier otra. Un atajo que se saltara los       *
 *   contadores dejaría el navegador abierto al mundo otra vez.         *
 *                                                                     *
 * Los contadores de KV no son atómicos: KV es de consistencia          *
 * eventual, así que dos peticiones a la vez pueden leer el mismo       *
 * número y pasar las dos. Es un presupuesto, no un candado, y para     *
 * cuidar una cuota mensual de 10 horas eso alcanza. Lo que frena una   *
 * ráfaga de verdad es la capa 1.                                       *
 * ================================================================== */

export const TOPE_IP_DIA = 20;
export const TOPE_GLOBAL_DIA = 80;
const CACHE_HORAS = 24;

/**
 * Las claves del día, separadas para poder probarlas sin KV.
 *
 * El `prefijo` existe para que /api/doce-puntos pueda usar ESTE tope sin compartir
 * presupuesto con este endpoint: los dos cuidan cosas distintas (acá, minutos de navegador;
 * allá, cuántas veces rastreamos el sitio de un tercero con nuestro User-Agent). Por defecto
 * es 'tope', que son exactamente las claves que este endpoint ya usaba.
 */
export function clavesDeTope(ip, dominio, ahora = new Date(), prefijo = 'tope') {
  const dia = ahora.toISOString().slice(0, 10);
  return {
    dia,
    ip: `${prefijo}:ip:${dia}:${ip || 'sin-ip'}`,
    global: `${prefijo}:global:${dia}`,
    cache: `cache:${dominio}`,
  };
}

export async function contar(kv, clave, tope, ttl) {
  const actual = Number((await kv.get(clave)) || 0);
  if (actual >= tope) return { pasa: false, actual };
  await kv.put(clave, String(actual + 1), { expirationTtl: ttl });
  return { pasa: true, actual: actual + 1 };
}

/* ================================================================== *
 * El endpoint.                                                        *
 * ================================================================== */

/**
 * Corre el chequeo profundo completo.
 *
 * `abrirCliente` se puede inyectar: en producción es `conectarNavegador`, y en una prueba
 * puede ser un cliente falso. Todo lo que decide qué se muestra vive en `armarInforme`,
 * que es puro y se prueba con datos reales.
 */
export async function profundo(entrada, env = {}, opciones = {}) {
  const v = normalizarDominio(entrada);
  if (v.error) return { ok: false, tipo: 'entrada', error: v.error };
  const { dominio } = v;

  const url = `https://${dominio}/`;
  // El portón ANTES de abrir el navegador. Sin esto, el endpoint es un navegador remoto
  // abierto al mundo apuntando a donde quiera el visitante, que es bastante peor que un
  // proxy abierto. `normalizarDominio` ya rechaza lo grueso; esto es la misma puerta que
  // cruzan después las navegaciones, aplicada a la entrada.
  if (!destinoPermitido(url)) return falloDeLaRevision('destino', dominio);

  const kv = env.VYC_TOPES;
  // Sin KV no hay tope, y sin tope este endpoint no puede estar abierto. Se declina con el
  // mismo mensaje honesto que cuando falta el plan: el visitante no necesita saber cómo
  // está configurado esto, y el chequeo rápido que ya está en pantalla no se toca.
  if (!kv) return falloDeLaRevision('sin-configurar', dominio);

  const claves = clavesDeTope(opciones.ip, dominio);

  // Capa 3 primero: si ya lo revisamos hoy, no se abre un segundo navegador.
  //
  // Salvo que nos pidan volver a medirlo. La portada ya tiene el botón "Volver a medirlo" y
  // manda `rehacer=1`; hasta acá esta función lo ignoraba y devolvía la misma medición
  // guardada, así que el botón prometía algo que no pasaba. Quien arregla su sitio a las 9 y
  // vuelve a las 10 apretaba el botón y seguía viendo el informe de antes.
  //
  // Lo que se salta es la LECTURA de la caché, nada más. Los dos contadores siguen abajo y
  // sin tocar: rehacer abre un navegador de verdad, así que gasta cupo como cualquier otra
  // revisión. Sin eso, `rehacer=1` sería la puerta por la que se entra a pedir navegador sin
  // límite, que es justo lo que la caché estaba tapando.
  //
  // La medición nueva SÍ se guarda (más abajo), así que pisa a la anterior y el siguiente
  // visitante ve la fresca.
  if (!opciones.rehacer) {
    try {
      const guardado = await kv.get(claves.cache, { type: 'json' });
      if (guardado) return { ...guardado, deCache: true };
    } catch {}
  }

  // Los contadores suben ANTES de abrir el navegador, no después. Contando intentos y no
  // éxitos, una ráfaga que hace fallar el navegador no sale gratis.
  const porIp = await contar(kv, claves.ip, TOPE_IP_DIA, 60 * 60 * 30);
  if (!porIp.pasa) return falloDeLaRevision('tope-ip', dominio);
  const global = await contar(kv, claves.global, TOPE_GLOBAL_DIA, 60 * 60 * 30);
  if (!global.pasa) return falloDeLaRevision('cuota', dominio);

  const abrirCliente = opciones.abrirCliente || conectarNavegador;
  let cliente = null;
  try {
    cliente = await abrirCliente(env);
    const medicion = await Promise.race([
      medirConNavegador(cliente, url, dominio, opciones),
      dormir(PRESUPUESTO_MS).then(() => ({ fallo: 'presupuesto', detalle: 'se acabó nuestro presupuesto de ' + PRESUPUESTO_MS + ' ms' })),
    ]);
    const informe = armarInforme(medicion, dominio);
    if (informe.ok) {
      try { await kv.put(claves.cache, JSON.stringify(informe), { expirationTtl: CACHE_HORAS * 3600 }); } catch {}
    }
    return informe;
  } catch (e) {
    // El detalle va al log, nunca al visitante: un 401 nuestro no es asunto suyo, y el texto
    // del error filtra cómo está configurado esto.
    console.log('profundo: ' + (e instanceof FallaDeRevision ? `${e.clave} — ${e.detalle}` : e.stack || e.message));
    return falloDeLaRevision(e instanceof FallaDeRevision ? e.clave : 'navegador', dominio);
  } finally {
    if (cliente) cliente.cerrar();
  }
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);

  // --- Diagnóstico temporal (28-sep-2026) -------------------------------------
  // El endpoint contestaba 'sin-configurar' y no había forma de saber POR QUÉ: si el
  // nombre de la variable no calzaba, si no llegaba al entorno, o si el enlace del KV
  // faltaba. Estábamos adivinando contra un panel que yo no puedo abrir.
  //
  // Esto lo convierte en un hecho. Devuelve SOLO NOMBRES de las llaves que empiezan con
  // CF_ o VYC_, que son las nuestras, y el TIPO de cada una (string = variable de texto,
  // object = enlace a un recurso como el KV). NUNCA un valor, ni un fragmento, ni el
  // largo: un token se filtra igual por pedazos.
  //
  // Se saca apenas quede resuelto.
  // Diagnóstico de CONEXIÓN. Las tres variables ya llegan, pero el endpoint sigue declinando
  // con 'sin-configurar', que el código usa para tres causas distintas: falta config, la API
  // contestó 403, o no hay KV. Esto separa cuál es, devolviendo el status crudo de la API.
  // No expone el token ni ningún valor: solo el código de respuesta y si vino WebSocket.
  if (url.searchParams.get('diagnostico') === 'conexion') {
    const cuenta = env.CF_ACCOUNT_ID;
    const token = env.CF_BROWSER_TOKEN;
    if (!cuenta || !token) {
      return new Response(JSON.stringify({ paso: 'faltan variables', cuenta: !!cuenta, token: !!token }), {
        status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }
    const destino = `wss://api.cloudflare.com/client/v4/accounts/${cuenta}/browser-rendering/devtools/browser?keep_alive=10000`;
    try {
      const r = await fetch(destino, { headers: { Upgrade: 'websocket', Authorization: `Bearer ${token}` } });
      let cuerpo = '';
      try { cuerpo = (await r.clone().text()).slice(0, 300); } catch (e) { cuerpo = '(sin cuerpo legible)'; }
      return new Response(JSON.stringify({
        paso: 'la API contestó',
        status: r.status,
        hayWebSocket: !!r.webSocket,
        cuerpo,
      }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    } catch (e) {
      return new Response(JSON.stringify({ paso: 'el fetch reventó', error: String(e && e.message || e) }), {
        status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }
  }

  if (url.searchParams.get('diagnostico') === '1') {
    const nuestras = Object.keys(env || {})
      .filter((k) => k.startsWith('CF_') || k.startsWith('VYC_'))
      .sort()
      .map((k) => ({ nombre: k, tipo: typeof env[k] }));
    return new Response(JSON.stringify({
      diagnostico: true,
      llavesNuestras: nuestras,
      totalLlavesEnEntorno: Object.keys(env || {}).length,
      // Los CF_PAGES_* los pone Cloudflare y NO son secretos: son la rama, el commit y la
      // URL del despliegue. Sus valores dicen qué proyecto y qué rama están sirviendo esto,
      // que es justo lo que hay que saber para encontrar dónde van las variables.
      quienSirveEsto: {
        rama: env.CF_PAGES_BRANCH,
        commit: env.CF_PAGES_COMMIT_SHA,
        url: env.CF_PAGES_URL,
      },
      esperadas: {
        CF_ACCOUNT_ID: typeof env.CF_ACCOUNT_ID,
        CF_BROWSER_TOKEN: typeof env.CF_BROWSER_TOKEN,
        VYC_TOPES: typeof env.VYC_TOPES,
      },
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  // ---------------------------------------------------------------------------

  const entrada = url.searchParams.get('dominio') || '';
  // La IP del visitante la pone el borde de Cloudflare, no el cliente: CF-Connecting-IP no
  // es falsificable desde fuera. Es lo que hace que el tope por IP valga algo.
  const ip = request.headers.get('CF-Connecting-IP') || '';
  // Solo el '1' exacto, no cualquier cosa que venga escrita ahí. Es un parámetro que decide si
  // se abre un navegador, así que se lee como una llave y no como un "hay algo".
  const rehacer = url.searchParams.get('rehacer') === '1';

  const r = await profundo(entrada, env, { ip, rehacer });

  return new Response(JSON.stringify(r), {
    status: r.ok ? 200 : (r.tipo === 'entrada' ? 400 : 200),
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // La caché de verdad es la de KV, que es por dominio y la comparten todos. Esta
      // cabecera solo evita que el navegador de una persona repita la misma consulta.
      'cache-control': 'private, max-age=60',
    },
  });
}
