// LAS CUATRO INTERIORES DE LA TANDA 5 SOBRE A (obra E12, corrida 2): /v3/metodo/, /v3/diagnostico/, /v3/nosotros/ y
// /v3/contacto/. Diego, 19-oct-2026.
//
// Contrato: spec-visual.md §2.4 (la plantilla interior y la fila de cada ruta), §3.4 (interiores ≤ 5 % de campo; ninguna
// de las cuatro lleva franja) y §4.1 (los campos del formulario). Las cuatro están «queda con ajustes» (Clara,
// texto-obra.json): cambia lo que Clara lista, y lo demás queda tal cual, desde su dato. Su dato es el de hoy:
// paginas-v3.json (que esta obra no toca) y lo que las páginas de driftime escribían por su cuenta (los datos de cada fase
// del método, los tres bloques del chequeo, la bio de Ramón, los botones). Eso viene copiado aquí, letra por letra, con
// la página de la que sale; el build se cae si un texto de Clara no reemplaza al que dice que reemplaza.
//
// Las señales son de Simón (e12/senales-obra.md §2.6, §2.8, §2.10 y §2.11): title y description de Clara (que son los de
// Simón), el grafo de hoy y lo que él suma (el WebApplication del chequeo y el ContactPage).
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .astro, .ts y .js
// de src/, y una que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1).
import paginas from '../paginas-v3.json';
import { textoDe, igualQue } from './texto.mjs';
import { trozos, soloMontosDe, SITIO } from './servicios.mjs';
import comun from './texto/comun.json';
import tMetodo from './texto/metodo.json';
import tDiag from './texto/diagnostico.json';
import tNos from './texto/nosotros.json';
import tCont from './texto/contacto.json';

const NB = ' '; // número y unidad no se parten (la misma tipografía de las páginas de driftime)
const CONTACTO = '/v3/contacto/';
const CHEQUEO = '/v3/diagnostico/';

// ---- comunes
const dos = (e, donde) => {
  if (!e.tinta || !e.gris) throw new Error(`${donde}: el h1 de Clara no viene en dos tintas`);
  return { tinta: e.tinta, gris: e.gris };
};
// «Inicio · Método» → ['Inicio', 'Método'], comparada con la miga del grafo de hoy (paginas-v3.json breadcrumb)
const migaDe = (texto, grafo, donde) => {
  const miga = texto.split(' · ');
  if (grafo) igualQue(grafo.map((x) => x.name).join(' · '), miga.join(' · '), `${donde}, la miga contra su BreadcrumbList`);
  return miga;
};
// Un texto con <b>…</b> (las páginas de driftime marcaban así lo que pesa) en tramos: lo marcado va en blanco, sin
// negrita (spec §1.2: cero negrita).
const marcado = (s) => s.split(/(<b>[\s\S]*?<\/b>)/).filter(Boolean).map((x) =>
  x.startsWith('<b>') ? { texto: x.slice(3, -4), tinta: true } : { texto: x });
// Que el texto de Clara («cambia») reemplace al dato que dice que reemplaza: si su «antes» no es el dato de hoy, alguien
// cambió uno de los dos y el build se cae.
const reemplaza = (e, dato, donde) => {
  if (e.antes !== undefined) igualQue(dato, e.antes, `${donde}, el «antes» de Clara`);
  return e.texto;
};
const largos = (title, description, donde) => {
  if (title.length > 60 || description.length < 120 || description.length > 160) {
    throw new Error(`${donde}: title (${title.length}) o description (${description.length}) fuera de los largos de senales-obra.md §1.2`);
  }
};
const ogDe = (id, h1) => ({ src: `/assets/img/og-e12-${id}.jpg?v=1`, alt: `SpindleLab: ${h1.tinta}${h1.gris ? ` ${h1.gris}` : ''}` });

// ================================================================= /v3/metodo/ (spec §2.4; Simón §2.8)
export function metodo() {
  const t = textoDe(tMetodo, comun);
  const s = paginas.metodo;
  const [recorrido, reglas, poco, cierre] = s.secciones;
  const miga = migaDe(t('metodo.miga').texto, s.breadcrumb, 'método');
  const h1 = dos(t('metodo.h1'), 'método');
  const linea = reemplaza(t('metodo.linea'), s.linea, 'método, la entradilla');
  const puerta = t('metodo.puerta');

  // Lo que la página de driftime escribía por su cuenta (src/pages/v3/metodo.astro, hasta la tanda 4), tal cual: la
  // nota de la entrada, los dos botones de la cabecera, la duración y lo que recibes en cada fase, cuánto cuesta y
  // adónde ver el detalle, el enlace del protocolo y los botones del cierre.
  const nota = { tinta: 'La fase 01 es gratis.', resto: 'Cada una de las demás dice cuánto cuesta.' };
  const botones = [
    { texto: 'Correr el chequeo', href: CHEQUEO, clase: 'claro' },
    { texto: 'Ver las cuatro fases', href: '/v3/metodo/#fases', clase: 'placa' },
  ];
  const datos = [
    [['Duración', `24${NB}h`], ['Recibes', 'Mini-diagnóstico de una página con los hallazgos priorizados']],
    [['Duración', `~2${NB}semanas`], ['Recibes', 'Línea base de presencia en IA + plan de citabilidad']],
    [['Duración', `2${NB}a${NB}6${NB}semanas, según el alcance`], ['Recibes', 'Cambios implementados y verificados']],
    [['Frecuencia', ['Informes quincenales', 'Reunión mensual']], ['Recibes', `Evolución medible contra la línea${NB}base`]],
  ];
  const precios = [
    { t: `Sin costo. La auditoría completa va aparte: 2${NB}a${NB}3${NB}semanas, desde${NB}$490.000${NB}+${NB}IVA.`, href: '/v3/servicios/auditoria-seo-tecnica/', enlace: 'Ver la auditoría', slug: 'auditoria-seo-tecnica' },
    { t: `Auditoría de Visibilidad: desde${NB}$400.000${NB}+${NB}IVA, una${NB}vez.`, href: '/v3/servicios/visibilidad-en-ia/', enlace: 'Ver Visibilidad en IA', slug: 'visibilidad-en-ia' },
    { t: `Si lo ejecutamos nosotros, Acompañamiento mensual: desde${NB}$590.000/mes${NB}+${NB}IVA, mínimo 3${NB}meses. Si lo ejecuta tu equipo, el plan viene en la auditoría completa.`, href: '/v3/servicios/acompanamiento-mensual/', enlace: 'Ver el acompañamiento', slug: 'acompanamiento-mensual' },
    { t: `Va dentro del mismo Acompañamiento mensual de la fase${NB}03.` },
  ];
  precios.forEach((p, i) => { if (p.slug) soloMontosDe(p.t, p.slug, `método, el precio de la fase 0${i + 1}`); });
  const PROTOCOLO = { 'nuestro protocolo público': '/v3/blog/como-aparecer-en-chatgpt/#como-medir-si-esta-funcionando' };
  const fases = recorrido.bloques.map((b, i) => {
    const d = b.d.replace(/\b21 señales\b/, `21${NB}señales`);
    return {
      numero: `${String(i + 1).padStart(2, '0')} · `,
      nombre: b.t,
      cuerpo: d.includes('nuestro protocolo público') ? trozos(d, PROTOCOLO) : [{ texto: d }],
      datos: datos[i].map(([k, v]) => ({ k, v: Array.isArray(v) ? v : [v] })),
      cuesta: precios[i],
    };
  });
  if (fases.length !== 4) throw new Error('método: el recorrido de paginas-v3.json no trae cuatro fases');

  const pedidos = poco.lista.map((x) => {
    const i = x.indexOf(':');
    const d = x.slice(i + 1).trim().replace(/"([^"]+)"/g, '«$1»');
    return { t: x.slice(0, i), d: d.charAt(0).toUpperCase() + d.slice(1) };
  });

  // HowTo de la página publicada, mismo @id y mismos pasos (Simón §2.8: «JSON-LD: queda»)
  const pasos = [
    'Revisamos el sitio a mano (rastreo, indexación, velocidad, datos estructurados y señales de confianza) y entregamos un mini-diagnóstico de una página, gratis, en 24 horas.',
    'Medimos tu presencia en ChatGPT, Gemini y Perplexity con un protocolo repetible, documentamos quién gana esas respuestas hoy y trazamos la hoja de ruta de citabilidad: claridad de entidad, contenido citable y autoridad.',
    'Ejecutamos los cambios técnicos y de contenido junto a tu equipo: indexación y velocidad, datos estructurados listos para pegar, y páginas reestructuradas para responder preguntas en formato citable.',
    'Cada quince días medimos menciones en IA, posiciones en Google y tráfico orgánico contra la línea base, y lo reportamos en lenguaje de negocio. El ciclo se repite: el monitoreo alimenta el siguiente diagnóstico.',
  ];
  const title = tMetodo.texto.title;
  const description = tMetodo.texto.description;
  largos(title, description, 'método');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://spindlelab.cl/metodo/#webpage',
        name: 'Nuestro método de SEO y visibilidad en IA',
        url: 'https://spindlelab.cl/metodo/',
        inLanguage: 'es-CL',
        about: { '@id': 'https://spindlelab.cl/#org' },
        publisher: { '@id': 'https://spindlelab.cl/#org' },
        mainEntity: { '@id': 'https://spindlelab.cl/metodo/#metodo-spindlelab' },
      },
      {
        '@type': 'HowTo',
        '@id': 'https://spindlelab.cl/metodo/#metodo-spindlelab',
        name: 'Método SpindleLab',
        description:
          'El Método SpindleLab es el proceso de cuatro fases de SpindleLab para llevar un sitio de la invisibilidad a ser citado en Google y en las respuestas de los motores de IA (AEO/GEO): diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Es un ciclo repetible y cada fase se mide.',
        inLanguage: 'es-CL',
        author: { '@id': 'https://spindlelab.cl/#autor-ramon' },
        publisher: { '@id': 'https://spindlelab.cl/#org' },
        step: recorrido.bloques.map((b, i) => ({ '@type': 'HowToStep', position: i + 1, name: b.t, text: pasos[i] })),
      },
      { '@type': 'BreadcrumbList', '@id': `${s.canonical}#breadcrumb`, itemListElement: s.breadcrumb },
    ],
  };
  return {
    title, description, jsonLd, og: ogDe('metodo', h1),
    miga, h1, linea, lead: s.lead, puerta: trozos(puerta.texto, puerta.enlaces), nota, botones,
    fases: { h2: recorrido.h2, lista: fases },
    reglas: { h2: reglas.h2, lista: reglas.bloques },
    poco: { h2: poco.h2, bajada: poco.bajada, lista: pedidos },
    cierre: {
      h2: cierre.h2,
      p: cierre.parrafos[0].replace('24 horas', `24${NB}horas`),
      botones: [
        { texto: 'Pedir el diagnóstico', href: CONTACTO, clase: 'claro' },
        { texto: 'Correr el chequeo', href: CHEQUEO, clase: 'placa' },
      ],
    },
  };
}

// ================================================================= /v3/diagnostico/ (spec §2.4: el instrumento primero; Simón §2.6)
export function diagnostico() {
  const t = textoDe(tDiag, comun);
  const s = paginas.diagnostico;
  const [chequeos, caminos, ley, responde, cierreSec] = s.secciones;
  const miga = migaDe(t('diagnostico.miga').texto, s.breadcrumb, 'diagnóstico');
  const h1 = dos(t('diagnostico.h1'), 'diagnóstico');
  const linea = reemplaza(t('diagnostico.linea'), s.linea, 'diagnóstico, la entradilla');
  if (s.h1 !== t('diagnostico.h1').antes) throw new Error('diagnóstico: el «antes» del h1 de Clara no es el h1 de hoy');

  const chequeo = {
    etiqueta: t('diagnostico.label').texto,
    ejemplo: t('diagnostico.placeholder').texto,
    boton: t('diagnostico.boton').texto,
    ayuda: t('diagnostico.ayuda').texto,
  };

  // «Los 21 chequeos, publicados.»: sus tres bloques con su peso, tal cual de la página de driftime (copiados allá de
  // public/diagnostico/index.html; llevan <b>), y la línea de la entrada («21 chequeos, 100 puntos…»)
  const bloques = [
    { h3: '¿Te pueden leer?', peso: 30, texto: marcado('No todos los robots de IA hacen lo mismo: unos <b>buscan en vivo</b> cuando alguien pregunta (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) y otros <b>recogen texto para entrenar modelos futuros</b> (GPTBot, ClaudeBot, Google-Extended, CCBot). Bloquear a los primeros te borra de las respuestas de hoy en ChatGPT, Claude y Perplexity; bloquear a los segundos no te quita ahí ni una cita y es una decisión legítima. Verificamos ambos por separado, probamos si tu servidor expulsa a los robots por su nombre, y que el sitio responda 200 por HTTPS. Si los bots en vivo no entran, nada de lo demás importa.') },
    { h3: '¿Te entienden?', peso: 40, texto: marcado('Revisamos tus datos estructurados: si declaras tu negocio como entidad, si esa entidad tiene dirección y contacto, si te conectas con al menos tres perfiles externos, y si hay una persona con credenciales detrás del contenido. Más el título, la meta description y el H1.') },
    { h3: '¿Te pueden citar?', peso: 30, texto: marcado('Comprobamos llms.txt, preguntas frecuentes marcadas con FAQPage, sitemap.xml, URL canónica, idioma declarado, títulos escritos como pregunta, fechas en el schema y cantidad de texto visible en tu portada.') },
  ];
  const linea21 = { tinta: '21 chequeos, 100 puntos.', resto: 'Tres bloques: leerte 30, entenderte 40, citarte 30.' };
  if (bloques.reduce((a, b) => a + b.peso, 0) !== 100) throw new Error('diagnóstico: los pesos de los tres bloques no suman 100');
  if (!linea21.resto.includes(`leerte ${bloques[0].peso}, entenderte ${bloques[1].peso}, citarte ${bloques[2].peso}`)) {
    throw new Error('diagnóstico: la línea de la entrada no dice los pesos de los tres bloques');
  }

  // «Lo que este chequeo no mide»: el segundo bloque, con el párrafo de Clara (detector A4)
  const noMide = {
    h2: s.noMide.h2,
    lista: s.noMide.bloques.map((b, i) => (i === 1 ? { t: b.t, d: reemplaza(t('diagnostico.nomide.p2'), b.d, 'diagnóstico, no mide') } : b)),
  };

  // «Dos caminos, y ninguno te cobra.»: los dos caminos y, sobre ellos, la guía de la entrada de driftime; los botones
  // de hoy («Volver al chequeo» va con su ruta: spec §5.2.2)
  const dosCaminos = {
    h2: caminos.h2,
    guia: 'El chequeo de esta página lee tu sitio; el mini-diagnóstico le pregunta a los motores. Los dos son gratis.',
    lista: caminos.bloques,
    botones: [
      { texto: 'Pedir el diagnóstico', href: CONTACTO, clase: 'claro' },
      { texto: 'Volver al chequeo', href: '/v3/diagnostico/#chequeo', clase: 'placa' },
    ],
  };

  const laLey = {
    h2: ley.h2,
    p: ley.parrafos[0],
    boton: { texto: 'Revisar mi sitio para la Ley 21.719', href: 'https://verifica.spindlelab.cl/', aparte: t('comun.externo').texto },
  };

  // El cierre «¿Quién aparece en tu lugar?» (Clara y spec §2.4): su h2, y la línea y el botón que la página muestra hoy
  // (`siguiente`; el párrafo viejo de la sección, con «sin compromiso», la QA del 5-oct lo sacó y no vuelve)
  const cierre = { h2: cierreSec.h2, p: s.siguiente.chico, boton: { texto: s.siguiente.enlace, href: CONTACTO } };

  const title = tDiag.texto.title;
  const description = tDiag.texto.description;
  largos(title, description, 'diagnóstico');
  const url = s.canonical;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es-CL',
        isPartOf: { '@id': `${SITIO}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': `${url}#chequeo` },
      },
      {
        '@type': 'WebApplication',
        '@id': `${url}#chequeo`,
        name: 'Chequeo de 21 señales',
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        isAccessibleForFree: true,
        creator: { '@id': `${SITIO}/#org` },
        inLanguage: 'es-CL',
        description: 'Escribes tu dominio y revisa al instante si ChatGPT, Claude y Perplexity pueden leer, entender y citar tu sitio: 21 señales, con su peso.',
      },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: s.breadcrumb },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
      },
    ],
  };
  return {
    title, description, jsonLd, og: ogDe('diagnostico', h1),
    miga, h1, linea, chequeo,
    veintiuno: { h2: chequeos.h2, chico: chequeos.parrafos[0], linea: linea21, bloques },
    noMide, dosCaminos, laLey,
    preguntas: { h2: responde.h2, lista: s.faq },
    cierre,
  };
}

// ================================================================= /v3/nosotros/ (spec §2.4; Simón §2.10; la bio es R4)
export function nosotros() {
  const t = textoDe(tNos, comun);
  const miga = migaDe(t('nosotros.miga').texto, null, 'nosotros');
  const h1 = t('nosotros.h1').texto; // R4: en una sola tinta (Clara)
  // La bio y lo que la página de driftime escribía (src/pages/v3/nosotros.astro hasta la tanda 4), tal cual: la
  // trayectoria (R4), los textos de «Cómo trabajo» que quedan, el párrafo y la bajada del cierre. «24 horas» no se parte.
  const trayectoria = {
    h2: 'Antes pasé más de cinco años en agencias',
    lista: [
      'Empecé en Universal McCann, coordinando la producción de piezas para ocho marcas nacionales.',
      'En Graphene IPG trabajé la cuenta de LATAM Airlines, con campañas en Chile, Perú, Ecuador y Colombia.',
      'Después vino la pauta de retail y B2B en Incrementa, y el contenido y el SEO de una cartera B2B en Maggiore.',
      'Estudié Comunicación Publicitaria en la Universidad Andrés Bello y un máster en Marketing Digital y E-commerce en la Universidad de Barcelona.',
    ].map((x) => x.split(/(E-commerce)/).filter(Boolean).map((p) => (p === 'E-commerce' ? { texto: p, junto: true } : { texto: p }))),
  };
  const rol = t('nosotros.rol').texto; // «Ramón Vallejos · Fundador de SpindleLab: … · Chile»
  const iNombre = rol.indexOf(' · ');
  const firma = { nombre: rol.slice(0, iNombre), resto: rol.slice(iNombre) };
  igualQue(firma.nombre, 'Ramón Vallejos', 'nosotros, la firma');

  const sistema = {
    h2: t('nosotros.sistema.h2').texto,
    parrafos: [
      t('nosotros.sistema.p1').texto,
      reemplaza(t('nosotros.sistema.p2'), 'Te lo cuento porque con esa experiencia puedo hacerme cargo del eje de tu operación y poner el motor a funcionar entero, no por partes. Conectamos las piezas en un solo sistema y las medimos juntas, con el orgánico como eje, porque es lo que no se apaga cuando cortas el presupuesto.', 'nosotros, sistema'),
      reemplaza(t('nosotros.sistema.p3'), 'El objetivo no es solo que vendas. Es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí.', 'nosotros, sistema'),
    ],
  };
  const como = {
    h2: t('nosotros.como.h2').texto,
    lista: [
      { t: t('nosotros.como.0.t').texto, d: t('nosotros.como.0.d').texto },
      { t: 'Diagnóstico antes que contrato', d: `Antes de cobrarte nada, reviso tu sitio y tu presencia en IA y te muestro los hallazgos en una página. Gratis, en 24${NB}horas.` },
      { t: t('nosotros.como.2.t').texto, d: reemplaza(t('nosotros.como.2.d'), 'SEO técnico, datos estructurados y contenido que la IA pueda citar. No hay que rehacer tu sitio. Hay que hacerlo legible.', 'nosotros, cómo trabajo') },
      { t: 'Mido si te recomiendan', d: 'Registro si ChatGPT, Gemini y Perplexity te nombran ante las preguntas de tus clientes. Con fecha, no de memoria. Nada de métricas de vanidad.' },
      { t: 'Sin humo', d: 'No prometo primeros lugares. Nadie puede garantizarlos. Te digo qué se puede mover y qué no, y me hago cargo de lo que sí.' },
    ],
  };
  const b1 = t('nosotros.boton1');
  const b2 = t('nosotros.boton2');
  const cierre = {
    h2: '¿Apareces cuando tus clientes preguntan?',
    bajada: 'Te lo muestro antes de que pagues nada.',
    p: `Lo primero es un diagnóstico. Reviso tu sitio, tu contenido y si la IA te nombra, y te entrego en una página qué te frena y qué mueve la aguja. Gratis, en 24${NB}horas. Con eso decides con información, no a ciegas.`,
    botones: [
      { texto: 'Pedir el diagnóstico', href: CONTACTO, clase: 'claro' },
      { texto: b1.texto, href: b1.destino, clase: 'placa' }, // Clara: «El segundo botón dice «Revisar mi sitio gratis», como arriba»
    ],
    siguiente: { rotulo: 'Siguiente', texto: 'Método', href: '/v3/metodo/' },
  };

  const title = tNos.texto.title;
  const description = tNos.texto.description;
  largos(title, description, 'nosotros');
  const url = 'https://spindlelab.cl/nosotros/';
  // El grafo de hoy (Simón §2.10: «queda»): AboutPage + BreadcrumbList, mismos @id. La Person la emite el Layout.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#aboutpage`,
        url,
        name: 'Nosotros · SpindleLab',
        mainEntity: { '@id': 'https://spindlelab.cl/#autor-ramon' },
        about: { '@id': 'https://spindlelab.cl/#autor-ramon' },
        isPartOf: { '@id': 'https://spindlelab.cl/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: miga[0], item: 'https://spindlelab.cl/' },
          { '@type': 'ListItem', position: 2, name: miga[1] },
        ],
      },
    ],
  };
  return {
    title, description, jsonLd,
    og: { src: '/assets/img/og-e12-nosotros.jpg?v=1', alt: 'Ramón Vallejos, fundador de SpindleLab.' },
    miga, h1, linea: t('nosotros.linea').texto, alt: t('nosotros.retrato').texto,
    botones: [
      { texto: b1.texto, href: b1.destino, clase: 'claro' },
      { texto: b2.texto, href: b2.destino, clase: 'placa' },
    ],
    bio: t('nosotros.bio').texto, firma, trayectoria, sistema, como, cierre,
  };
}

// ================================================================= /v3/contacto/ (spec §2.4 y §4.1; Simón §2.11)
export function contacto() {
  const t = textoDe(tCont, comun);
  const s = paginas.contacto;
  const [formulario, pasos, antes] = s.secciones;
  const miga = migaDe(t('contacto.miga').texto, s.breadcrumb, 'contacto');
  const h1 = dos(t('contacto.h1'), 'contacto');
  if (s.h1 !== t('contacto.h1').antes) throw new Error('contacto: el «antes» del h1 de Clara no es el h1 de hoy');
  const linea = reemplaza(t('contacto.linea'), s.linea, 'contacto, la entradilla');

  // El botón: el texto de Clara sin la flecha de texto, que ninguna de las dos letras trae (spec §1.2): va la flecha SVG
  const boton = t('contacto.form.boton');
  if (!boton.texto.endsWith(' →')) throw new Error('contacto: el botón de Clara no termina en « →»');
  const directo = t('contacto.form.directo').texto; // «O escríbenos directo a hola@spindlelab.cl»
  const EMAIL = 'hola@spindlelab.cl';
  if (!directo.endsWith(EMAIL)) throw new Error('contacto: «directo» no termina en el correo');
  const form = {
    h2: reemplaza(t('contacto.form.h2'), formulario.h2, 'contacto, el h2 del formulario'),
    nombre: t('contacto.form.nombre').texto,
    correo: t('contacto.form.correo').texto,
    sitio: t('contacto.form.sitio').texto,
    sitioEjemplo: t('contacto.form.sitio.placeholder').texto,
    sitioAyuda: t('contacto.form.sitio.ayuda').texto,
    mensaje: t('contacto.form.mensaje').texto,
    mensajeEjemplo: t('contacto.form.mensaje.placeholder').texto,
    consiento: t('contacto.form.consiento').texto,
    boton: boton.texto.slice(0, -2),
    listo: { h3: t('contacto.form.listo.t').texto, p: t('contacto.form.listo.d').texto },
    directo: { texto: directo.slice(0, -EMAIL.length).trim(), correo: EMAIL },
    // el mismo mailto de la página publicada: asunto y arranque del cuerpo ya escritos
    mailto: `mailto:${EMAIL}?subject=Diagn%C3%B3stico%20gratis&body=Hola%2C%20mi%20sitio%20es%3A%20`,
  };
  igualQue(form.listo.h3, formulario.bloques[0].t, 'contacto, «Listo.»');
  igualQue(form.listo.p, formulario.bloques[0].d, 'contacto, el texto de «Listo.»');
  // «política de privacidad» es el enlace del consentimiento, a /privacidad/ (la página publicada, que esta obra no toca)
  const consiento = trozos(form.consiento, { 'política de privacidad': '/privacidad/' });

  const despues = {
    h2: t('contacto.despues.h2').texto,
    lista: [
      { t: t('contacto.despues.1.t').texto, d: reemplaza(t('contacto.despues.1.d'), pasos.bloques[0].d, 'contacto, paso 1') },
      { t: reemplaza(t('contacto.despues.2.t'), pasos.bloques[1].t, 'contacto, paso 2'), d: reemplaza(t('contacto.despues.2.d'), pasos.bloques[1].d, 'contacto, paso 2') },
      pasos.bloques[2],
    ],
  };
  igualQue(despues.h2, pasos.h2, 'contacto, «Qué pasa después»');
  igualQue(despues.lista[0].t, pasos.bloques[0].t, 'contacto, «Nos escribes»');

  const title = tCont.texto.title;
  const description = tCont.texto.description;
  largos(title, description, 'contacto');
  const url = s.canonical;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es-CL',
        about: { '@id': `${SITIO}/#org` },
        isPartOf: { '@id': `${SITIO}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: s.breadcrumb },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
      },
    ],
  };
  return {
    title, description, jsonLd, og: ogDe('contacto', h1),
    miga, h1, linea, form, consiento, despues,
    preguntas: { h2: antes.h2, lista: s.faq },
  };
}
