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
const MAX_BYTES = 900_000;

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
 * Descarga acotada: timeout y tope de bytes en las dos direcciones.   *
 * ------------------------------------------------------------------ */

async function traer(url, fetchImpl) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // cache:'no-store' + cacheTtl 0: sin esto, el edge puede servir una copia vieja
    // del recurso (visto en vivo: un robots.txt cacheado SIN los bloqueos de bots de IA
    // que el archivo real ya tenia, y el chequeo daba un falso "todo pasa").
    const r = await fetchImpl(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      cf: { cacheTtl: 0, cacheEverything: false },
      headers: {
        'User-Agent': 'SpindleLabChequeo/1.0 (+https://spindlelab.cl/diagnostico/)',
        Accept: 'text/html,text/plain,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
    });
    const largo = Number(r.headers.get('content-length') || 0);
    if (largo > MAX_BYTES) return { status: r.status, url: r.url, texto: '', truncado: true };
    const texto = (await r.text()).slice(0, MAX_BYTES);
    return { status: r.status, url: r.url, texto };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
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

export async function chequear(entrada, fetchImpl = fetch) {
  const v = normalizarDominio(entrada);
  if (v.error) return { ok: false, error: v.error };
  const { dominio } = v;

  const [home, robots, llms, sitemap] = await Promise.all([
    traer(`https://${dominio}/`, fetchImpl),
    traer(`https://${dominio}/robots.txt`, fetchImpl),
    traer(`https://${dominio}/llms.txt`, fetchImpl),
    traer(`https://${dominio}/sitemap.xml`, fetchImpl),
  ]);

  if (!home || home.status >= 400) {
    return {
      ok: false,
      error: home
        ? `El sitio respondió ${home.status}. Revisa el dominio.`
        : 'No pudimos abrir el sitio. Revisa el dominio o inténtalo de nuevo.',
    };
  }

  const html = home.texto;
  const robotsTxt = robots && robots.status === 200 ? robots.texto : '';
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

  const bots = [
    ['GPTBot', 'ChatGPT'],
    ['ClaudeBot', 'Claude'],
    ['PerplexityBot', 'Perplexity'],
    ['Google-Extended', 'Gemini'],
  ];

  const items = [];
  const add = (bloque, id, titulo, ok, peso, detalle, arregloSiFalla) =>
    items.push({ bloque, id, titulo, ok, peso, detalle, arreglo: ok ? null : arregloSiFalla });

  // --- Bloque 1: ¿te pueden leer? ---
  for (const [ua, motor] of bots) {
    const bloqueado = bloqueaBot(robotsTxt, ua);
    add(
      'acceso', `bot-${ua}`, `${motor} puede leer tu sitio`, !bloqueado, 6,
      bloqueado
        ? `Tu robots.txt bloquea a ${ua}.`
        : robotsTxt
          ? `${ua} no está bloqueado en tu robots.txt.`
          : 'No tienes robots.txt, así que nada está bloqueado.',
      `Quita la regla que bloquea a ${ua} en tu robots.txt.`
    );
  }
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
  const llmsOk = !!llms && llms.status === 200 && llms.texto.trim().length > 0;
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
