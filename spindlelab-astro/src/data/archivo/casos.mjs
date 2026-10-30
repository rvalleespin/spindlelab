// LA PÁGINA DE CASO DE A (obra E12, tanda 3; recortada en la obra E13). Diego.
//
// Contrato: spec-visual.md §2.3 (la plantilla de Koto, lock §21.5), §3.3 (plan de media), §3.4 (techos de campo), §3.5
// (video) y §4; señales de Simón (e12/senales-obra.md §2.3 y §2.4). El texto es de Clara, tal cual (texto/caso-combeau.json,
// copia de e13/texto/caso-combeau.json); los medios, de medios-casos.json. Aquí vive solo lo que la plantilla no puede
// leer de esos dos: el orden de las filas de medios, el medio principal y el JSON-LD.
//
// E13 (brief §1, decisión 3): el único caso con página es Bernardo Combeau. Praxi y los cuatro conceptos (Sesenta, Ocelo,
// Doceavo, Tonela) salieron del build, y con ellos el «Siguiente», el rótulo «Concepto», el hueco nombrado y las filas
// apiladas, que ninguna página usa; quedan en el historial de git. La página cierra con el pedido de la revisión y el
// enlace al índice (Clara retiró combeau.siguiente.rotulo y .caso).
//
// Las filas (spec §2.3, lock §21.2):
//   uno('a')       una 16:9 a todo el ancho de la columna
//   par('a', 'b')  par 4:5 | 4:5
// Cada nombre es un archivo de public/v3/trabajo/combeau/. Su alt y su pie los pone Clara (caso-combeau.json, «medios»);
// si Clara lista el medio con otro nombre, va como { m: 'archivo', clara: 'nombre de Clara' }.
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .astro, .js y
// .ts de src/, y una que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1).

import { textoDe, medioDe, igualQue } from './texto.mjs';
import comun from './texto/comun.json';
import trabajo from './texto/trabajo.json';
import tCombeau from './texto/caso-combeau.json';
import manifiesto from './medios-casos.json';

const uno = (a) => ({ forma: '169', medios: [a] });
const par = (a, b) => ({ forma: 'par', medios: [a, b] });

// Los casos que tienen página, en el orden del índice (/trabajo/). [caso].astro genera una ruta por cada uno.
export const ORDEN = ['combeau'];

const urlDe = (caso) => `https://spindlelab.cl/trabajo/${caso}/`;

export const CASOS = {
  combeau: {
    copia: tCombeau,
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
          image: 'https://spindlelab.cl/assets/img/og-e12-combeau.jpg?v=2',
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
    og: { imagen: '/assets/img/og-e12-combeau.jpg?v=2', alt: 'La portada del sitio de Bernardo Combeau, fotógrafo de retrato.' },
  },
};

// El grafo de la página (senales-obra.md §2.3 y §2.4): WebPage + los nodos del caso + BreadcrumbList igual a la miga.
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
// medios-casos.json y en caso-combeau.json (medioDe: su alt y su pie). Todo texto de la página sale de ahí; un elemento
// de Clara que la plantilla no sabe pintar hace fallar el build, para que nada se pierda en silencio.

// Las cinco secciones, en el orden de la spec §2.3, con el id de la página (al que lleva el índice).
const SECCIONES = [
  ['problema', 'problema'], ['hipotesis', 'hipotesis'], ['solucion', 'solucion'], ['pieza', 'la-pieza'], ['resultado', 'sin-metrica'],
];

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
  const medios = f.medios.map((ref) => medio(caso, ref, copia));
  const pies = [...new Set(medios.map((m) => m.pie).filter(Boolean))];
  return { forma: f.forma, medios, pie: pies.join(' '), enlace: medios.map((m) => m.enlace).find(Boolean) || null };
}

// El cuerpo de una sección de Clara: lo que va a la derecha (párrafos, la lista «Con qué está hecho») y, en Combeau,
// las partes con su ancla (#fotografia, #modelo).
function cuerpoDe(sec, prefijo) {
  const s = { rotulo: '', h2: '', cuerpo: [], partes: [] };
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
    else if (e.rol === 'nota' && e.uso === 'referencia') continue; // reglas de pie para Diego, no texto de la página
    else throw new Error(`${prefijo}: la plantilla no sabe pintar «${id}» (${e.rol})`);
  }
  return s;
}

export function modelo(caso) {
  const c = CASOS[caso];
  const copia = c.copia;
  const t = textoDe(copia, comun);
  const tx = copia.texto;
  const p = c.prefijo;
  const sec = (id) => {
    const s = tx.secciones.find((x) => x.id === id);
    if (!s) throw new Error(`${copia.id}: falta la sección «${id}»`);
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
    fuentes: pr.fuentes.map((f) => ({ ...f, webm: reg[f.webm].src, mp4: reg[f.mp4].src })),
    alt: posterAlt || descripcion,
    descripcionOculta: posterAlt ? descripcion : '',
    pie: nota('.medio.pie') ? nota('.medio.pie').texto : '',
  };

  const secciones = SECCIONES.map(([clave, ancla], i) => {
    const s = cuerpoDe(sec(clave), p);
    igualQue(s.rotulo, indice[i], `${copia.id}, el rótulo de la sección ${i + 1} contra el índice`);
    const filas = (c.filas[clave] || []).map((f) => fila(caso, f, copia));
    const partes = s.partes.map((parte) => {
      const filasParte = (c.filas.partes || {})[parte.ancla];
      if (!filasParte) throw new Error(`${copia.id}: la parte «${parte.ancla}» no tiene filas`);
      return { ...parte, filas: filasParte.map((f) => fila(caso, f, copia)) };
    });
    return { id: ancla, nombre: s.rotulo, h2: s.h2, cuerpo: s.cuerpo, filas, partes };
  });

  // El cierre: pedir la revisión (texto de Clara) y el corchete al índice, cuyo conteo es el de /trabajo/ (tanda 2). Con
  // un solo caso no hay «Siguiente»: Clara retiró combeau.siguiente.rotulo y .caso.
  const todo = t(`${p}.siguiente.todo`);
  igualQue(todo.texto, `[ Todo el trabajo ] ${textoDe(trabajo)('trabajo.conteo').texto}`, `${copia.id}, el corchete`);
  const cierre = { contacto: t(`${p}.siguiente.contacto`), boton: t(`${p}.siguiente.boton`), todo };

  return {
    caso,
    title: tx.title,
    description: tx.description,
    og: c.og,
    nombreCorto: c.corto,
    miga,
    h1,
    ficha: { linea: ficha.linea, datos: ficha.campos.filter((f) => !enLinea.includes(f.valor)) },
    creditos: { rotulo: t(`${p}.creditos.rotulo`).texto, texto: t(`${p}.creditos`).texto },
    principal,
    secciones,
    cierre,
    nombreSecciones: t('comun.secciones').texto,
    nombreBarra: t('comun.secciones.barra').texto,
    jsonLd: grafo(caso, { title: tx.title, description: tx.description, bajada: h1.gris, miga }),
  };
}
