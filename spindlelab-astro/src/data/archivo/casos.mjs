// LAS SEIS PÁGINAS DE CASO DE A (obra E12, corrida 2, tanda 3). Diego, 19-oct-2026.
//
// Contrato: spec-visual.md §2.3 (la plantilla de Koto, lock §21.5: una sola para los seis), §3.3 (plan de media), §3.4
// (techos de campo), §3.5 (video) y §4; señales de Simón (e12/senales-obra.md §2.3 a §2.5). El texto es de Clara, tal
// cual (texto/caso-*.json, copias de texto-obra.json); los medios, de medios-casos.json (los hace
// e12/construccion/herramientas/medios-casos.py, sin generar nada). Aquí vive solo lo que la plantilla no puede leer de
// esos dos: el orden de las filas de medios en las cuatro formas de Koto, el medio principal, el siguiente caso y el
// JSON-LD. Lo que la spec no fijaba está en spindlelab-v3/desvios.md, tanda 3.
//
// Las filas (spec §2.3, lock §21.2): solo cuatro formas, más el hueco nombrado de Praxi.
//   uno('a')            una 16:9 a todo el ancho de la columna
//   par('a', 'b')       par 4:5 | 4:5
//   pila45('a', 'b', 'c')  4:5 | dos 1,62 apilados (b sobre c)
//   pila162('a', 'b', 'c') dos 1,62 apilados (a sobre b) | 4:5
//   hueco()             el marco punteado del tamaño de una 16:9, con el texto de Clara (spec §3.3)
// Cada nombre es un archivo de public/v3/trabajo/<caso>/. Su alt y su pie los pone Clara (texto-obra.json, «medios»);
// si Clara lista el medio con otro nombre, va como { m: 'archivo', clara: 'nombre de Clara' }.
// La sección abre con una 16:9 y una fila partida va después de una 16:9 (spec §2.3); en los conceptos, en el orden de
// su caso.md (Bruno), como pide la spec.
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .astro, .js y
// .ts de src/, y una que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1).

import { textoDe, medioDe, igualQue } from './texto.mjs';
import comun from './texto/comun.json';
import trabajo from './texto/trabajo.json';
import tPraxi from './texto/caso-praxi.json';
import tCombeau from './texto/caso-combeau.json';
import tSesenta from './texto/caso-sesenta.json';
import tOcelo from './texto/caso-ocelo.json';
import tDoceavo from './texto/caso-doceavo.json';
import tTonela from './texto/caso-tonela.json';
import manifiesto from './medios-casos.json';

const uno = (a) => ({ forma: '169', medios: [a] });
const par = (a, b) => ({ forma: 'par', medios: [a, b] });
const pila45 = (a, b, c) => ({ forma: '45-162', medios: [a, b, c] });
const pila162 = (a, b, c) => ({ forma: '162-45', medios: [a, b, c] });
const hueco = () => ({ forma: 'hueco', medios: [] });

// El orden de «Siguiente» sigue el muro de /trabajo/, saltando lo que no tiene página (spec §2.3).
export const ORDEN = ['combeau', 'praxi', 'sesenta', 'ocelo', 'doceavo', 'tonela'];

const urlDe = (caso) => `https://spindlelab.cl/trabajo/${caso}/`;

export const CASOS = {
  praxi: {
    texto: 'caso-praxi',
    prefijo: 'praxi',
    corto: 'Praxi',
    // El video del inicio de Praxi (spec §2.3): 568 × 320, el mismo a todo ancho; bajo 834 el marco 4:5 lo recorta al
    // centro, como el prototipo. Su pie dice que las personas son generadas.
    principal: { webm: 'praxi-hero.webm', mp4: 'praxi-hero.mp4', poster: 'praxi-hero-poster.webp' },
    // Lo que se ve de Praxi en el «Siguiente» de otro caso: sin personas generadas ni cifras de ejemplo (senales §1.3).
    siguienteMedio: 'praxi-reglas-169.webp',
    filas: {
      problema: [],
      // El par de las dos portadas va con la Hipótesis, que es la que cuenta el cambio de lema que muestran
      // (desvios.md, tanda 3, punto 2).
      hipotesis: [uno('praxi-reglas-169.webp'), par('praxi-portada-390-45.webp', 'praxi-login-390-45.webp')],
      solucion: [uno('praxi-numeros-169.webp'), par('praxi-frase-45.webp', 'praxi-numeros-45.webp')],
      pieza: [
        uno('praxi-amarillo-169.webp'),
        pila45(
          { m: 'praxi-reel-45.webm', mp4: 'praxi-reel-45.mp4', poster: 'praxi-reel-poster-45.webp' },
          'praxi-avatar-amarillo-162.webp',
          'praxi-avatar-oscuro-162.webp'
        ),
        uno('praxi-facebook-169.webp'),
        par('praxi-carrusel-1-45.webp', 'praxi-carrusel-3-45.webp'),
        hueco(),
      ],
      resultado: [uno('praxi-empezar-169.webp')],
    },
    jsonLd: (t) => {
      const u = urlDe('praxi');
      return [
        {
          '@type': 'CreativeWork',
          '@id': `${u}#caso`,
          name: 'Praxi',
          description: t.bajada,
          author: { '@id': 'https://spindlelab.cl/#autor-ramon' },
          publisher: { '@id': 'https://spindlelab.cl/#org' },
          dateCreated: '2026-07-21',
          temporalCoverage: '2026-07-21/2026-08-25',
          inLanguage: 'es-CL',
          image: 'https://spindlelab.cl/assets/img/og-e12-praxi.jpg?v=1',
          about: { '@id': `${u}#app` },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${u}#app`,
          name: 'Praxi',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Web',
          inLanguage: 'es-CL',
          author: { '@id': 'https://spindlelab.cl/#autor-ramon' },
          description: 'Coach de hipertrofia por chat: guarda lo que entrenas y calcula en código cuándo subir el peso.',
        },
      ];
    },
    og: { imagen: '/assets/img/og-e12-praxi.jpg?v=1', alt: 'Captura de la portada de Praxi: "Debajo del chat hay reglas, no una corazonada".' },
  },

  combeau: {
    texto: 'caso-combeau',
    prefijo: 'combeau',
    corto: 'Bernardo Combeau',
    // El recorrido de su sitio de fotografía (spec §2.3): desde 834 el de 1440; bajo 834, el del teléfono (780 × 1688)
    // en el marco 4:5, con su póster.
    principal: {
      fuentes: [
        { desde: 834, webm: 'combeau-fotografia-recorrido-1440.webm', mp4: 'combeau-fotografia-recorrido-1440.mp4' },
        { webm: 'combeau-fotografia-recorrido-390.webm', mp4: 'combeau-fotografia-recorrido-390.mp4' },
      ],
      poster: 'combeau-fotografia-recorrido-1440-poster.webp',
      posterAngosto: 'combeau-fotografia-recorrido-390-poster.webp',
    },
    siguienteMedio: 'combeau-fotografia-169.webp',
    filas: {
      problema: [],
      hipotesis: [uno('combeau-panel-entrada-169.webp')],
      // La foto servida (4:5 o 1:1, «a decidir por Lucía»; la spec no lo decide) va en un par 4:5 con la portada en un
      // celular, que pasa de «La pieza» a esta sección: desvios.md, tanda 3, punto 3.
      solucion: [
        uno('combeau-panel-encuadre-169.webp'),
        par('combeau-foto-servida-828.webp', 'combeau-fotografia-45.webp'),
        uno('combeau-panel-colecciones-169.webp'),
      ],
      pieza: [],
      partes: {
        fotografia: [uno('combeau-fotografia-169.webp')],
        // El book en un celular va en un par con el recorrido del book a 390 (el mismo recorrido de Clara, en el
        // teléfono): desvios.md, tanda 3, punto 3.
        modelo: [
          uno('combeau-modelo-169.webp'),
          par('combeau-modelo-45.webp', {
            m: 'combeau-modelo-recorrido-390.webm',
            mp4: 'combeau-modelo-recorrido-390.mp4',
            poster: 'combeau-modelo-recorrido-390-poster.webp',
            clara: 'combeau-modelo-recorrido-1440.webm',
          }),
          uno({ m: 'combeau-modelo-recorrido-1440.webm', mp4: 'combeau-modelo-recorrido-1440.mp4', poster: 'combeau-modelo-recorrido-1440-poster.webp' }),
        ],
      },
      resultado: [],
    },
    // El enlace a la original (Clara): sale del sitio, con la flecha ↗.
    enlaces: { 'combeau-foto-servida-828.webp': true },
    jsonLd: (t) => {
      const u = urlDe('combeau');
      return [
        {
          '@type': 'CreativeWork',
          '@id': `${u}#caso`,
          name: 'Bernardo Combeau: sitio de fotografía y book de modelo',
          description: t.bajada,
          creator: { '@id': 'https://spindlelab.cl/#org' },
          datePublished: '2026-07-24',
          inLanguage: 'es-CL',
          image: 'https://spindlelab.cl/assets/img/og-e12-combeau.jpg?v=1',
          about: { '@id': `${u}#sitio` },
          hasPart: [
            { '@type': 'CreativeWork', '@id': `${u}#fotografia`, name: 'Sitio de fotografía', url: 'https://bernardocombeau.cl/' },
            { '@type': 'CreativeWork', '@id': `${u}#modelo`, name: 'Book de modelo', url: 'https://bernardocombeau.cl/modelo/' },
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${u}#sitio`,
          name: 'Bernardo Combeau',
          url: 'https://bernardocombeau.cl/',
          publisher: { '@id': 'https://bernardocombeau.cl/#persona' },
        },
      ];
    },
    og: { imagen: '/assets/img/og-e12-combeau.jpg?v=1', alt: 'La portada del sitio de Bernardo Combeau, fotógrafo de retrato.' },
  },

  sesenta: concepto('sesenta', 'Sesenta', {
    hipotesis: [uno('sesenta-suma-169.webp')],
    solucion: [
      uno('sesenta-logo-169.webp'),
      par('sesenta-sello-45.webp', 'sesenta-paleta-45.webp'),
      uno('sesenta-contador-169.webp'),
      pila45('sesenta-letra-45.webp', 'sesenta-courier-162.webp', 'sesenta-otrosi-162.webp'),
    ],
    pieza: [
      uno('sesenta-home-169.webp'),
      par('sesenta-home-390-45.webp', 'sesenta-interior-390-45.webp'),
      uno('sesenta-finiquito-169.webp'),
      pila162('sesenta-hoja-162.webp', 'sesenta-tarjeta-162.webp', 'sesenta-lector-390-45.webp'),
      uno('sesenta-lector-169.webp'),
      uno('sesenta-interior-169.webp'),
    ],
    resultado: [uno('sesenta-pregunta-169.webp')],
  }, {
    disambiguatingDescription: 'Pieza de concepto de SpindleLab: Sesenta no existe, no atiende a nadie y no llevó ninguna causa.',
    about: 'Derecho laboral del lado del trabajador',
    dateCreated: '2026-10-16',
    og: 'Concepto de SpindleLab: Sesenta, un estudio laboral que no existe.',
  }),

  ocelo: concepto('ocelo', 'Ocelo', {
    hipotesis: [uno({ m: 'ocelo-carta-169.webp', clara: 'carta-tinta.png' })],
    solucion: [
      uno({ m: 'ocelo-logotipo-169.webp', clara: 'logotipo-tinta.png' }),
      par({ m: 'ocelo-landolt-45.webp', clara: 'landolt-tinta.png' }, { m: 'ocelo-letra-45.webp', clara: 'letra-tinta.png' }),
      uno({ m: 'ocelo-duocromo-169.webp', clara: 'duocromo-tinta.png' }),
      pila45(
        { m: 'ocelo-interruptor-45.webp', clara: 'interruptor-tinta.png' },
        { m: 'ocelo-mono-162.webp', clara: 'mono-tinta.png' },
        { m: 'ocelo-puerta-162.webp', clara: 'puerta-tinta.png' }
      ),
    ],
    pieza: [
      uno({ m: 'ocelo-home-luz-169.webp', clara: 'home-1440-luz.png' }),
      par({ m: 'ocelo-home-390-sala-45.webp', clara: 'home-390-sala.png' }, { m: 'ocelo-home-390-luz-45.webp', clara: 'home-390-luz.png' }),
      uno({ m: 'ocelo-evaluacion-pasos-169.webp', clara: 'evaluacion-1440-pasos.png' }),
      pila162(
        { m: 'ocelo-informe-tinta-162.webp', clara: 'informe-tinta.png' },
        { m: 'ocelo-informe-lienzo-162.webp', clara: 'informe-lienzo.png' },
        { m: 'ocelo-evaluacion-390-duocromo-45.webp', clara: 'evaluacion-390-duocromo.png' }
      ),
    ],
    resultado: [uno({ m: 'ocelo-prometer-169.webp', clara: 'prometer-1440.png' })],
  }, {
    disambiguatingDescription: 'Pieza de concepto de SpindleLab: esta clínica no existe y no atiende pacientes.',
    about: 'Cirugía refractiva y de cataratas',
    dateCreated: '2026-10-16',
    og: 'Concepto de SpindleLab: Ocelo, una clínica de ojos que no existe.',
  }),

  doceavo: concepto('doceavo', 'Doceavo', {
    hipotesis: [uno({ m: 'doceavo-anio-169.webp', clara: '16x9-anio-tinta.png' })],
    solucion: [
      par({ m: 'doceavo-logo-45.webp', clara: '4x5-logo-tinta.png' }, { m: 'doceavo-meses-45.webp', clara: '4x5-meses-tinta.png' }),
      pila45(
        { m: 'doceavo-letra-45.webp', clara: '4x5-letra-tinta.png' },
        { m: 'doceavo-eje-162.webp', clara: '1-62-eje-tinta.png' },
        { m: 'doceavo-cifras-162.webp', clara: '1-62-cifras-tinta.png' }
      ),
      uno({ m: 'doceavo-papel-169.webp', clara: '16x9-papel-tinta.png' }),
    ],
    pieza: [
      uno({ m: 'doceavo-home-169.webp', clara: 'home-1440.png' }),
      par({ m: 'doceavo-home-390-45.webp', clara: 'home-390.png' }, { m: 'doceavo-calendario-390-45.webp', clara: 'calendario-390.png' }),
      pila162(
        { m: 'doceavo-lomo-162.webp', clara: '1-62-lomo-lienzo.png' },
        { m: 'doceavo-hoja-162.webp', clara: '1-62-hoja-tinta.png' },
        { m: 'doceavo-informe-45.webp', clara: '4x5-informe-tinta.png' }
      ),
      uno({ m: 'doceavo-calendario-169.webp', clara: 'calendario-1440.png' }),
    ],
    resultado: [uno({ m: 'doceavo-f29-169.webp', clara: '16x9-f29-tinta.png' })],
  }, {
    disambiguatingDescription: 'Pieza de concepto de SpindleLab: Doceavo no existe y no tiene clientes; las fechas son las del calendario del SII de 2026.',
    about: 'Contabilidad y tributación de pymes',
    dateCreated: '2026-10-16',
    og: 'Concepto de SpindleLab: Doceavo, un estudio contable que no existe.',
  }),

  tonela: concepto('tonela', 'Tonela', {
    hipotesis: [uno({ m: 'tonela-codigo-169.webp', clara: '16x9-codigo-tinta.png' })],
    solucion: [
      uno({ m: 'tonela-logo-169.webp', clara: '16x9-logo-tinta.png' }),
      par({ m: 'tonela-eslinga-2-lienzo-45.webp', clara: '4x5-eslinga-2-lienzo.png' }, { m: 'tonela-eslinga-5-tinta-45.webp', clara: '4x5-eslinga-5-tinta.png' }),
      pila45(
        { m: 'tonela-letra-45.webp', clara: '4x5-letra-tinta.png' },
        { m: 'tonela-stencil-162.webp', clara: '1-62-stencil-lienzo.png' },
        { m: 'tonela-barlow-162.webp', clara: '1-62-barlow-lienzo.png' }
      ),
      uno({ m: 'tonela-tabla-169.webp', clara: '16x9-tabla-lienzo.png' }),
      uno({ m: 'tonela-pliego-169.webp', clara: 'pliego.png' }),
    ],
    pieza: [
      uno({ m: 'tonela-home-169.webp', clara: 'home-1440-primera.png' }),
      par({ m: 'tonela-home-390-45.webp', clara: 'medio-4x5-390.png' }, { m: 'tonela-inspeccion-390-45.webp', clara: 'inspeccion-4x5-390.png' }),
      pila162(
        { m: 'tonela-registro-162.webp', clara: '1-62-registro-tinta.png' },
        { m: 'tonela-rotulo-162.webp', clara: '1-62-rotulo-tinta.png' },
        { m: 'tonela-eslinga-2-tinta-45.webp', clara: '4x5-eslinga-2-tinta.png' }
      ),
      uno({ m: 'tonela-inspeccion-169.webp', clara: 'inspeccion-1440-primera.png' }),
    ],
    // La fila 11 del caso.md («Lo que lee un motor») no está compuesta: Clara, «Si la placa no se compone antes de
    // construir, la sección va sin fila».
    resultado: [],
  }, {
    disambiguatingDescription: 'Pieza de concepto de SpindleLab: Tonela no existe; no tiene clientes, faenas, dirección ni RUT.',
    about: 'Izaje: eslingas, cadenas y grilletes',
    dateCreated: '2026-10-16',
    og: 'Concepto de SpindleLab: Tonela, un proveedor de izaje que no existe.',
  }),
};

// Un concepto: el recorrido de su sitio desde 834; bajo 834, la imagen 4:5 que dice su caso.md (Bruno), quieta (spec
// §2.3: bajo 834 el medio principal es 4:5; el recorrido es 16:9). En el «Siguiente» de otro caso, el póster del
// recorrido. JSON-LD de Simón, senales-obra.md §2.5.
function concepto(caso, nombre, filas, s) {
  return {
    texto: `caso-${caso}`,
    prefijo: `concepto.${caso}`,
    corto: nombre,
    concepto: true,
    principal: {
      fuentes: [{ desde: 834, webm: `${caso}-recorrido.webm`, mp4: `${caso}-recorrido.mp4` }],
      poster: `${caso}-recorrido-poster.webp`,
      posterAngosto: `${caso}-movil-45.webp`,
    },
    siguienteMedio: `${caso}-recorrido-poster.webp`,
    filas: { problema: [], ...filas },
    jsonLd: (t) => {
      const u = urlDe(caso);
      return [
        {
          '@type': 'CreativeWork',
          '@id': `${u}#caso`,
          name: nombre,
          genre: 'Concepto',
          creator: { '@id': 'https://spindlelab.cl/#org' },
          dateCreated: s.dateCreated,
          inLanguage: 'es-CL',
          description: t.bajada,
          disambiguatingDescription: s.disambiguatingDescription,
          about: { '@type': 'Thing', name: s.about },
          image: `https://spindlelab.cl/assets/img/og-e12-${caso}.jpg?v=1`,
        },
      ];
    },
    og: { imagen: `/assets/img/og-e12-${caso}.jpg?v=1`, alt: s.og },
  };
}

// El grafo de la página (senales-obra.md §2.3 a §2.5): WebPage + los nodos del caso + BreadcrumbList igual a la miga.
// Los nodos #org, #website y #autor-ramon los emite el Layout y no se repiten.
export function grafo(caso, t) {
  const c = CASOS[caso];
  const u = urlDe(caso);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${u}#webpage`,
        url: u,
        name: t.title.replace(/ · SpindleLab$/, ''),
        description: t.description,
        inLanguage: 'es-CL',
        isPartOf: { '@id': 'https://spindlelab.cl/#website' },
        breadcrumb: { '@id': `${u}#breadcrumb` },
        mainEntity: { '@id': `${u}#caso` },
      },
      ...c.jsonLd(t),
      {
        '@type': 'BreadcrumbList',
        '@id': `${u}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.miga[0], item: 'https://spindlelab.cl/' },
          { '@type': 'ListItem', position: 2, name: t.miga[1], item: 'https://spindlelab.cl/trabajo/' },
          { '@type': 'ListItem', position: 3, name: t.miga[2] },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------- el modelo que pinta Caso.astro
// Lee el texto de Clara por su id (textoDe, que hace fallar el build si un id no existe) y cada medio por su nombre en
// medios-casos.json y en texto-obra.json (medioDe: su alt y su pie). Todo texto de la página sale de ahí; un elemento
// de Clara que la plantilla no sabe pintar hace fallar el build, para que nada se pierda en silencio.

const COPIAS = {
  'caso-praxi': tPraxi, 'caso-combeau': tCombeau, 'caso-sesenta': tSesenta, 'caso-ocelo': tOcelo,
  'caso-doceavo': tDoceavo, 'caso-tonela': tTonela,
};

// Las cinco secciones, en el orden de la spec §2.3, con el id de la página (al que lleva el índice).
const SECCIONES = [
  ['problema', 'problema'], ['hipotesis', 'hipotesis'], ['solucion', 'solucion'], ['pieza', 'la-pieza'], ['resultado', 'sin-metrica'],
];

const archivoDe = (ref) => (typeof ref === 'string' ? ref : ref.m);

// Un medio: el archivo (medios-casos.json) con el alt y el pie de Clara. Los videos llevan su H.264 y su póster.
function medio(caso, ref, copia) {
  const r = typeof ref === 'string' ? { m: ref } : ref;
  const reg = manifiesto.casos[caso];
  const f = reg[r.m];
  if (!f) throw new Error(`Caso ${caso}: falta el medio «${r.m}» en medios-casos.json (medios-casos.py)`);
  const deClara = medioDe(copia, r.clara || f.clara || r.m);
  const alt = deClara.alt || deClara.descripcion;
  if (!alt) throw new Error(`Caso ${caso}: Clara no le escribió alt a «${r.m}»`);
  const salida = { src: f.src, ancho: f.ancho, alto: f.alto, alt, pie: deClara.pie || '', enlace: deClara.enlace || null };
  if (/\.webm$/.test(r.m)) {
    const p = reg[r.poster];
    const m4 = reg[r.mp4];
    if (!p || !m4) throw new Error(`Caso ${caso}: el video «${r.m}» no tiene póster o H.264`);
    return { ...salida, src: p.src, ancho: p.ancho, alto: p.alto, video: { webm: f.src, mp4: m4.src } };
  }
  return salida;
}

// Una fila: sus medios y su pie (los pies distintos de sus medios, sin repetir).
function fila(caso, f, copia) {
  if (f.forma === 'hueco') return { forma: 'hueco', medios: [], pie: '' };
  const medios = f.medios.map((ref) => medio(caso, ref, copia));
  const pies = [...new Set(medios.map((m) => m.pie).filter(Boolean))];
  return { forma: f.forma, medios, pie: pies.join(' '), enlace: medios.map((m) => m.enlace).find(Boolean) || null };
}

// El cuerpo de una sección de Clara: lo que va a la derecha (párrafos, la lista «Con qué está hecho») y, en Combeau,
// las partes con su ancla (#fotografia, #modelo).
function cuerpoDe(sec, prefijo) {
  const s = { rotulo: '', h2: '', cuerpo: [], partes: [], hueco: '' };
  let destino = s.cuerpo;
  for (const e of sec.elementos) {
    const id = e.id;
    if (e.rol === 'rotulo' && /\.ingredientes\.rotulo$/.test(id)) destino.push({ tipo: 'rotulo', texto: e.texto });
    else if (e.rol === 'rotulo') s.rotulo = e.texto;
    else if (e.rol === 'h2' && e.ancla) {
      const parte = { ancla: e.ancla, h3: e.texto, cuerpo: [] };
      s.partes.push(parte);
      destino = parte.cuerpo;
    } else if (e.rol === 'h2') s.h2 = e.texto;
    else if (e.rol === 'parrafo') destino.push({ tipo: 'p', texto: e.texto });
    else if (e.rol === 'nota' && e.uso === 'lista') {
      destino.push({
        tipo: 'lista',
        items: e.items.map((it) => {
          const m = it.match(/^(.*?)\s*\(([^()]+)\)$/);
          return m ? { texto: m[1], dato: m[2] } : { texto: it, dato: '' };
        }),
      });
    } else if (e.rol === 'nota' && /\.ingredientes\.intro$/.test(id)) destino.push({ tipo: 'chico', texto: e.texto });
    else if (e.rol === 'nota' && e.uso === 'hueco') s.hueco = e.texto;
    else if (e.rol === 'nota' && e.uso === 'referencia') continue; // reglas de pie para Diego, no texto de la página
    else throw new Error(`${prefijo}: la plantilla no sabe pintar «${id}» (${e.rol})`);
  }
  return s;
}

export function modelo(caso) {
  const c = CASOS[caso];
  const copia = COPIAS[c.texto];
  const t = textoDe(copia, comun);
  const tx = copia.texto;
  const p = c.prefijo;
  const sec = (id) => {
    const s = tx.secciones.find((x) => x.id === id);
    if (!s) throw new Error(`${c.texto}: falta la sección «${id}»`);
    return s;
  };

  const h1 = t(`${p}.h1`);
  const miga = t(`${p}.miga`).texto.split(' · ');
  const ficha = t(`${p}.ficha`);
  const enLinea = ficha.linea.split(' · ');
  const indice = t(`${p}.indice`).opciones;

  // El medio principal: el póster y su alt (Clara: «póster del recorrido»); la descripción del video, para el lector de
  // pantalla, junto al pie (el video va con aria-hidden).
  const notas = sec('medio').elementos;
  const nota = (fin) => notas.find((e) => e.id.endsWith(fin));
  const descripcion = (nota('.medio.descripcion') || nota('.medio.alt')).texto;
  const posterAlt = nota('.medio.poster') ? nota('.medio.poster').texto : '';
  const reg = manifiesto.casos[caso];
  const pr = c.principal;
  const principal = {
    poster: reg[pr.poster],
    posterAngosto: pr.posterAngosto ? reg[pr.posterAngosto] : null,
    webm: pr.webm ? reg[pr.webm].src : undefined,
    mp4: pr.mp4 ? reg[pr.mp4].src : undefined,
    fuentes: pr.fuentes ? pr.fuentes.map((f) => ({ ...f, webm: reg[f.webm].src, mp4: reg[f.mp4].src })) : undefined,
    alt: posterAlt || descripcion,
    descripcionOculta: posterAlt ? descripcion : '',
    pie: nota('.medio.pie') ? nota('.medio.pie').texto : '',
  };

  const secciones = SECCIONES.map(([clave, ancla], i) => {
    const s = cuerpoDe(sec(clave), p);
    igualQue(s.rotulo, indice[i], `${c.texto}, el rótulo de la sección ${i + 1} contra el índice`);
    const filas = (c.filas[clave] || []).map((f) => fila(caso, f, copia));
    if (filas.some((f) => f.forma === 'hueco') && !s.hueco) throw new Error(`${c.texto}: hay un hueco sin su texto`);
    const partes = s.partes.map((parte) => {
      const filasParte = (c.filas.partes || {})[parte.ancla];
      if (!filasParte) throw new Error(`${c.texto}: la parte «${parte.ancla}» no tiene filas`);
      return { ...parte, filas: filasParte.map((f) => fila(caso, f, copia)) };
    });
    return { id: ancla, nombre: s.rotulo, h2: s.h2, cuerpo: s.cuerpo, filas, partes, hueco: s.hueco };
  });

  // «Siguiente»: el texto de Clara, comprobado contra el orden de la spec §2.3; el medio y la línea mono, del caso que
  // sigue. El conteo del corchete es el de /trabajo/ (tanda 2).
  const i = ORDEN.indexOf(caso);
  const sig = ORDEN[(i + 1) % ORDEN.length];
  const cs = CASOS[sig];
  const tsig = t(`${p}.siguiente.caso`);
  igualQue(tsig.destino, `/v3/trabajo/${sig}/`, `${c.texto}, el destino de «Siguiente»`);
  const copiaSig = COPIAS[cs.texto];
  const tS = textoDe(copiaSig, comun);
  const regSig = manifiesto.casos[sig][cs.siguienteMedio];
  const altSig = cs.siguienteMedio.endsWith('-recorrido-poster.webp')
    ? tS(`${cs.prefijo}.medio.poster`).texto
    : (() => { const m = medioDe(copiaSig, cs.siguienteMedio); return m.alt || m.descripcion; })();
  const todo = t(`${p}.siguiente.todo`);
  igualQue(todo.texto, `[ Todo el trabajo ] ${textoDe(trabajo)('trabajo.conteo').texto}`, `${c.texto}, el corchete`);
  const puente = tx.secciones.find((x) => x.id === 'siguiente').elementos.find((e) => e.id === `${p}.siguiente.puente`);
  const siguiente = {
    contacto: t(`${p}.siguiente.contacto`),
    puente: puente ? puente.texto : '',
    boton: t(`${p}.siguiente.boton`),
    rotulo: t(`${p}.siguiente.rotulo`).texto,
    caso: tsig,
    linea: tS(`${cs.prefijo}.ficha`).linea,
    cursor: t(cs.concepto ? 'comun.cursor.concepto' : 'comun.cursor.caso').texto,
    medio: { src: regSig.src, ancho: regSig.ancho, alto: regSig.alto, alt: altSig },
    todo,
  };

  return {
    caso,
    title: tx.title,
    description: tx.description,
    og: c.og,
    nombreCorto: c.corto,
    concepto: !!c.concepto,
    miga,
    h1,
    ficha: { linea: ficha.linea, datos: ficha.campos.filter((f) => !enLinea.includes(f.valor)) },
    creditos: { rotulo: t(`${p}.creditos.rotulo`).texto, texto: t(`${p}.creditos`).texto },
    principal,
    secciones,
    siguiente,
    nombreSecciones: t('comun.secciones').texto,
    nombreBarra: t('comun.secciones.barra').texto,
    jsonLd: grafo(caso, { title: tx.title, description: tx.description, bajada: h1.gris, miga }),
  };
}
