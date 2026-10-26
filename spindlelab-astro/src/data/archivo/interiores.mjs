// LAS CUATRO INTERIORES SOBRE A (obra E12, corrida 2, tanda 5; reescritas en la obra E13, 26-oct-2026): /metodo/,
// /diagnostico/, /nosotros/ y /contacto/.
//
// Contrato: spec-visual.md §2.4 (la plantilla interior y la fila de cada ruta), §3.4 (interiores ≤ 5 % de campo; ninguna
// de las cuatro lleva franja) y §4.1 (los campos del formulario). En E13 el mensaje es «marketing y crecimiento con IA
// para empresas que ya venden» y el texto sale de e13/fuentes/v2-vigente/<ruta>.txt (publicado y aprobado el 24-oct).
//
// De dónde sale cada texto:
//   · Clara (texto/<ruta>.json, con huella): título, meta, h1, entradillas, rótulos, botones y todo lo que tiene un id.
//   · Datos de página (paginas-v3.json, claves metodo, diagnostico y contacto): los cuatro pasos del método, de los que
//     sale también el HowTo, y las preguntas frecuentes de contacto y de diagnóstico, de las que sale el FAQPage. Lo que
//     se ve y lo que dice el JSON-LD es lo mismo porque sale del mismo dato.
//   · Aquí: los tres bloques de «Los 21 chequeos» (describen lo que mide el chequeo y no cambian) y las cadenas del
//     JSON-LD que no se ven en la página.
// Los precios que aparecen en el método se comparan con servicios-v3.json y oferta-v3.json: si uno no coincide, el build
// se cae (brief de obra §6.3).
//
// Las señales son de Simón (e12/senales-obra.md §2.6, §2.8, §2.10 y §2.11), con los cambios de E13: title y description
// de Clara, el grafo de hoy y lo que él suma (el WebApplication del chequeo y el ContactPage).
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .astro, .ts y .js
// de src/, y una que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1).
import paginas from '../paginas-v3.json';
import { textoDe, igualQue } from './texto.mjs';
import { trozos, comprobarPrecio, SITIO } from './servicios.mjs';
import comun from './texto/comun.json';
import tMetodo from './texto/metodo.json';
import tDiag from './texto/diagnostico.json';
import tNos from './texto/nosotros.json';
import tCont from './texto/contacto.json';

const NB = ' '; // número y unidad no se parten (la misma tipografía de las páginas de driftime)
const CONTACTO = '/contacto/';
const CHEQUEO = '/diagnostico/';

// ---- comunes
const dos = (e, donde) => {
  if (!e.tinta || !e.gris) throw new Error(`${donde}: el h1 de Clara no viene en dos tintas`);
  return { tinta: e.tinta, gris: e.gris };
};
// «Inicio · Método» → ['Inicio', 'Método'], comparada con la miga del grafo (paginas-v3.json breadcrumb)
const migaDe = (texto, grafo, donde) => {
  const miga = texto.split(' · ');
  if (grafo) igualQue(grafo.map((x) => x.name).join(' · '), miga.join(' · '), `${donde}, la miga contra su BreadcrumbList`);
  return miga;
};
// Un texto con <b>…</b> (las páginas de driftime marcaban así lo que pesa) en tramos: lo marcado va en blanco, sin
// negrita (spec §1.2: cero negrita).
const marcado = (s) => s.split(/(<b>[\s\S]*?<\/b>)/).filter(Boolean).map((x) =>
  x.startsWith('<b>') ? { texto: x.slice(3, -4), tinta: true } : { texto: x });
// «desde $490.000 + IVA» y «20 minutos» no se parten al final de la línea
const unidos = (s) => s
  .replace(/desde \$/g, `desde${NB}$`)
  .replace(/ \+ IVA/g, `${NB}+${NB}IVA`)
  .replace(/(\d) (minutos|semanas|meses|días|horas)/g, `$1${NB}$2`);
const largos = (title, description, donde) => {
  if (title.length > 60 || description.length < 120 || description.length > 160) {
    throw new Error(`${donde}: title (${title.length}) o description (${description.length}) fuera de los largos de senales-obra.md §1.2`);
  }
};
// La imagen al compartir de cada página es og-e12-<id>.jpg, con el h1 de la página escrito en la imagen (regeneradas en
// E13 con el h1 nuevo, en la plantilla de A: el negro, Google Sans Flex, tinta y gris). El alt dice el titular de la
// imagen. ?v=2: cada nombre se sobrescribe y los activos se cachean fuerte (CLAUDE.md, trampa de caché).
const ogDe = (id, h1) => ({ src: `/assets/img/og-e12-${id}.jpg?v=2`, alt: `SpindleLab: ${typeof h1 === 'string' ? h1 : `${h1.tinta} ${h1.gris}`}` });
const boton = (e, clase) => ({ texto: e.texto, href: e.destino, clase });

// ================================================================= /metodo/ (spec §2.4; Simón §2.8)
export function metodo() {
  const t = textoDe(tMetodo, comun);
  const s = paginas.metodo;
  const miga = migaDe(t('metodo.miga').texto, s.breadcrumb, 'método');
  const h1 = dos(t('metodo.h1'), 'método');
  const linea = t('metodo.linea').texto;
  const notaE = t('metodo.pasos.nota');
  const nota = { tinta: notaE.tinta, resto: notaE.gris };
  const botones = [boton(t('metodo.boton1'), 'claro'), boton(t('metodo.boton2'), 'placa')];

  if (s.pasos.length !== 4) throw new Error('método: paginas-v3.json no trae cuatro pasos');
  const fases = s.pasos.map((p, i) => {
    // Un precio que dice un paso es el de su servicio: lo comprueba contra los JSON, con «desde» y «+ IVA».
    if (p.cuesta.slug) comprobarPrecio(p.cuesta.t, p.cuesta.slug, `método, el precio del paso 0${i + 1}`);
    return {
      numero: `${String(i + 1).padStart(2, '0')} · `,
      nombre: p.t,
      cuerpo: [{ texto: unidos(p.d) }],
      datos: p.datos.map((d) => ({ k: d.k, v: d.v.map(unidos) })),
      cuesta: { t: unidos(p.cuesta.t), href: p.cuesta.href, enlace: p.cuesta.enlace },
    };
  });

  const reglas = [1, 2, 3].map((i) => ({ t: t(`metodo.reglas.${i}.t`).texto, d: t(`metodo.reglas.${i}.d`).texto }));
  const pedidos = [1, 2, 3, 4].map((i) => ({ t: t(`metodo.poco.${i}.t`).texto, d: t(`metodo.poco.${i}.d`).texto }));

  const title = tMetodo.texto.title;
  const description = tMetodo.texto.description;
  largos(title, description, 'método');
  // El HowTo de la página publicada: mismo @id, mismos cuatro pasos y el texto de cada paso es el que se ve.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://spindlelab.cl/metodo/#webpage',
        name: title,
        url: s.canonical,
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
          'El Método SpindleLab es el proceso de cuatro pasos de SpindleLab: revisión gratis, conversación y propuesta, implementación por fases y acompañamiento mensual.',
        inLanguage: 'es-CL',
        author: { '@id': 'https://spindlelab.cl/#autor-ramon' },
        publisher: { '@id': 'https://spindlelab.cl/#org' },
        step: s.pasos.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: p.t, text: p.d })),
      },
      { '@type': 'BreadcrumbList', '@id': `${s.canonical}#breadcrumb`, itemListElement: s.breadcrumb },
    ],
  };
  return {
    title, description, jsonLd, og: ogDe('metodo', h1),
    miga, h1, linea, nota, botones,
    fases: { h2: t('metodo.pasos.h2').texto, cuesta: t('metodo.pasos.cuesta').texto, lista: fases },
    reglas: { h2: t('metodo.reglas.h2').texto, lista: reglas },
    poco: { h2: t('metodo.poco.h2').texto, bajada: t('metodo.poco.bajada').texto, lista: pedidos },
    cierre: {
      h2: t('metodo.cierre.h2').texto,
      p: unidos(t('metodo.cierre.p').texto),
      botones: [boton(t('metodo.cierre.boton1'), 'claro'), boton(t('metodo.cierre.boton2'), 'placa')],
    },
  };
}

// ================================================================= /diagnostico/ (spec §2.4: el instrumento primero; Simón §2.6)
export function diagnostico() {
  const t = textoDe(tDiag, comun);
  const s = paginas.diagnostico;
  const miga = migaDe(t('diagnostico.miga').texto, s.breadcrumb, 'diagnóstico');
  const h1 = dos(t('diagnostico.h1'), 'diagnóstico');
  const linea = t('diagnostico.linea').texto;

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
  const l21 = t('diagnostico.veintiuno.linea');
  const linea21 = { tinta: l21.tinta, resto: l21.gris };
  if (bloques.reduce((a, b) => a + b.peso, 0) !== 100) throw new Error('diagnóstico: los pesos de los tres bloques no suman 100');
  if (!linea21.resto.includes(`leer ${bloques[0].peso}, entender ${bloques[1].peso}, citar ${bloques[2].peso}`)) {
    throw new Error('diagnóstico: la línea de la entrada no dice los pesos de los tres bloques');
  }

  // «Lo que este chequeo no mide»: dos límites del instrumento, escritos con lo que sí se puede afirmar
  const noMide = {
    h2: t('diagnostico.nomide.h2').texto,
    lista: [1, 2].map((i) => ({ t: t(`diagnostico.nomide.${i}.t`).texto, d: t(`diagnostico.nomide.${i}.d`).texto })),
  };

  // «Dos caminos, y ninguno te cobra.»: los dos caminos y, sobre ellos, la guía; el segundo botón vuelve al chequeo
  const dosCaminos = {
    h2: t('diagnostico.caminos.h2').texto,
    guia: t('diagnostico.caminos.guia').texto,
    lista: [1, 2].map((i) => ({ t: t(`diagnostico.caminos.${i}.t`).texto, d: t(`diagnostico.caminos.${i}.d`).texto })),
    botones: [boton(t('diagnostico.caminos.boton1'), 'claro'), boton(t('diagnostico.caminos.boton2'), 'placa')],
  };

  const laLey = {
    h2: t('diagnostico.ley.h2').texto,
    p: t('diagnostico.ley.p').texto,
    boton: { texto: t('diagnostico.ley.boton').texto, href: t('diagnostico.ley.boton').destino, aparte: t('comun.externo').texto },
  };

  // El cierre: el mismo paso de toda la obra, dicho desde el chequeo
  const cierre = { h2: t('diagnostico.cierre.h2').texto, p: t('diagnostico.cierre.p').texto, boton: boton(t('diagnostico.cierre.boton'), 'claro') };

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
        description: 'Escribes tu dominio y revisa en segundos si ChatGPT, Claude y Perplexity pueden entrar a tu sitio y entender qué haces: 21 señales, con su peso.',
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
    veintiuno: { h2: t('diagnostico.veintiuno.h2').texto, chico: t('diagnostico.veintiuno.chico').texto, linea: linea21, bloques },
    noMide, dosCaminos, laLey,
    preguntas: { h2: t('diagnostico.preguntas.h2').texto, lista: s.faq },
    cierre,
  };
}

// ================================================================= /nosotros/ (spec §2.4; Simón §2.10)
export function nosotros() {
  const t = textoDe(tNos, comun);
  const miga = migaDe(t('nosotros.miga').texto, null, 'nosotros');
  const h1 = t('nosotros.h1').texto; // en una sola tinta (Clara): es un texto de Ramón
  // La trayectoria: las líneas de Clara; en la de los estudios, «E-commerce» no se parte
  const juntar = (x) => x.split(/(E-commerce)/).filter(Boolean).map((p) => (p === 'E-commerce' ? { texto: p, junto: true } : { texto: p }));
  const trayectoria = {
    h2: t('nosotros.trayectoria.h2').texto,
    lista: [1, 2, 3, 4].map((i) => juntar(t(`nosotros.trayectoria.${i}`).texto)),
  };
  const rol = t('nosotros.rol').texto; // «Ramón Vallejos · Consultor de marketing y crecimiento con IA · Chile»
  const iNombre = rol.indexOf(' · ');
  const firma = { nombre: rol.slice(0, iNombre), resto: rol.slice(iNombre) };
  igualQue(firma.nombre, 'Ramón Vallejos', 'nosotros, la firma');

  // «Cómo trabajo»: las tres reglas de Ramón
  const como = {
    h2: t('nosotros.como.h2').texto,
    lista: [1, 2, 3].map((i) => ({ t: t(`nosotros.como.${i}.t`).texto, d: t(`nosotros.como.${i}.d`).texto })),
  };
  const sig = t('nosotros.siguiente');
  const cierre = {
    h2: t('nosotros.cierre.h2').texto,
    p: t('nosotros.cierre.p').texto,
    botones: [boton(t('nosotros.cierre.boton'), 'claro')],
    siguiente: { rotulo: sig.rotulo, texto: sig.texto, href: sig.destino },
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
        description,
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
    title, description, jsonLd, og: ogDe('nosotros', h1),
    miga, h1, linea: t('nosotros.linea').texto, alt: t('nosotros.retrato').texto,
    botones: [boton(t('nosotros.boton1'), 'claro')],
    bio: t('nosotros.bio').texto, firma, trayectoria, como, cierre,
  };
}

// ================================================================= /contacto/ (spec §2.4 y §4.1; Simón §2.11)
export function contacto() {
  const t = textoDe(tCont, comun);
  const s = paginas.contacto;
  const miga = migaDe(t('contacto.miga').texto, s.breadcrumb, 'contacto');
  const h1 = dos(t('contacto.h1'), 'contacto');
  const linea = t('contacto.linea').texto;

  const directo = t('contacto.form.directo').texto; // «O escríbenos directo a hola@spindlelab.cl»
  const EMAIL = 'hola@spindlelab.cl';
  if (!directo.endsWith(EMAIL)) throw new Error('contacto: «directo» no termina en el correo');
  const form = {
    h2: t('contacto.form.h2').texto,
    nombre: t('contacto.form.nombre').texto,
    correo: t('contacto.form.correo').texto,
    sitio: t('contacto.form.sitio').texto,
    sitioEjemplo: t('contacto.form.sitio.placeholder').texto,
    sitioAyuda: t('contacto.form.sitio.ayuda').texto,
    mensaje: t('contacto.form.mensaje').texto,
    mensajeEjemplo: t('contacto.form.mensaje.placeholder').texto,
    consiento: t('contacto.form.consiento').texto,
    boton: t('contacto.form.boton').texto, // la flecha es el SVG de la plantilla (spec §1.2: ninguna de las dos letras trae «→»)
    listo: { h3: t('contacto.form.listo.t').texto, p: t('contacto.form.listo.d').texto },
    directo: { texto: directo.slice(0, -EMAIL.length).trim(), correo: EMAIL },
    // el mailto de la página: asunto y arranque del cuerpo ya escritos
    mailto: `mailto:${EMAIL}?subject=Revisi%C3%B3n%20de%20mi%20sitio&body=Hola%2C%20mi%20sitio%20es%3A%20`,
  };
  // «política de privacidad» es el enlace del consentimiento, a /privacidad/ (la página publicada, que esta obra no toca)
  const consiento = trozos(form.consiento, { 'política de privacidad': '/privacidad/' });

  const despues = {
    h2: t('contacto.despues.h2').texto,
    lista: [1, 2, 3].map((i) => ({ t: t(`contacto.despues.${i}.t`).texto, d: t(`contacto.despues.${i}.d`).texto })),
  };

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
    preguntas: { h2: t('contacto.antes.h2').texto, lista: s.faq },
  };
}
