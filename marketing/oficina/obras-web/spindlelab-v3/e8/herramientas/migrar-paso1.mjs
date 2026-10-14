/**
 * migrar-paso1.mjs · E8, paso 1 (Diego). Lleva al JSON el texto que las plantillas del v3
 * fijaban, tapaban o corregían, para que el JSON diga exactamente lo que se ve y los parches
 * de datos salgan de las plantillas. Sin cambio visible: la prueba es el diff vacío de
 * extraer.mjs + comparar.mjs contra la base.
 *
 * USO
 *   node migrar-paso1.mjs <dir-data> [--base 63f1e55]
 *     <dir-data>  la carpeta src/data de spindlelab-astro donde se escriben los cuatro JSON
 *     --base      commit del que se leen los JSON de partida (git show), por defecto 63f1e55
 *
 * Lee SIEMPRE de la base (no del archivo en disco), así que correrlo dos veces da lo mismo.
 * Escribe con JSON.stringify(x, null, 2) + "\n", que deja la base idéntica byte a byte (se
 * comprueba antes de escribir: si no, se detiene).
 *
 * Cada parche se copia TAL CUAL de la plantilla de la base (63f1e55), con su línea, y se
 * aplica en el mismo orden que la plantilla. Lo que el censo dice que calza se comprueba
 * (un par que no calza detiene el script); lo que el censo dice que es no-op, también.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = execFileSync('git', ['-C', AQUI, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();

const args = process.argv.slice(2);
const destino = args[0];
const iBase = args.indexOf('--base');
const BASE = iBase >= 0 ? args[iBase + 1] : '63f1e55';
if (!destino || !fs.existsSync(destino)) {
  console.error('uso: node migrar-paso1.mjs <dir-data> [--base 63f1e55]');
  process.exit(2);
}

const fallas = [];
const exige = (cond, msg) => { if (!cond) fallas.push(msg); };

const leerBase = (archivo) => {
  const t = execFileSync('git', ['-C', RAIZ, 'show', `${BASE}:spindlelab-astro/src/data/${archivo}`], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const x = JSON.parse(t);
  if (JSON.stringify(x, null, 2) + '\n' !== t) {
    console.error(`${archivo}: JSON.stringify(x, null, 2) + "\\n" no reproduce la base byte a byte; no se escribe nada.`);
    process.exit(1);
  }
  return x;
};
const clon = (x) => JSON.parse(JSON.stringify(x));
// Reconstruye un objeto con las claves en este orden; las que no se nombran van al final, en
// su orden original. Solo para que el JSON se lea en el orden de la página.
const ordenar = (o, orden) => {
  const r = {};
  for (const k of orden) if (k in o) r[k] = o[k];
  for (const k of Object.keys(o)) if (!(k in r)) r[k] = o[k];
  return r;
};

const servicios = leerBase('servicios-v3.json');
const paginas = leerBase('paginas-v3.json');
const oferta = leerBase('oferta-v3.json');
const obra = leerBase('obra-v3.json');

// =====================================================================================
// 1 · servicios-v3.json  ←  servicios/[slug].astro (63f1e55)
// =====================================================================================

// :72-78 CORRIGE_TODOS y :81-123 CORRIGE, verbatim. corrige() (:125-129) recorre TODO el
// objeto del servicio: cada par cambia a la vez lo visible, la FAQPage y las Offer.
const CORRIGE_TODOS = [
  [/(\d{1,3}(?:\.\d{3})+) CLP/g, (_m, n) => `$${n}`],
  [/(\$\d{1,3}(?:\.\d{3})+) \/mes/g, '$1/mes'],
  [/ Sin compromiso\./g, ''],
];
const CORRIGE = {
  'acompanamiento-mensual': [
    ['Equipo dedicado y varios frentes a la vez.', 'Varios frentes a la vez.'],
    ['Equipo dedicado y multi-servicio: todo lo del Pro', 'Multi-servicio: todo lo del Pro'],
  ],
  'auditoria-seo-tecnica': [
    ['Del chequeo gratis a la auditoría', 'Del mini-diagnóstico gratis a la auditoría'],
    [' Nada de un volcado de 200 hallazgos sin jerarquía.', ''],
    ['en móvil y escritorio', 'en celular y computador'],
    ['Sin costo ni compromiso', ''],
  ],
  'redes-sociales': [
    ['Sí. La gestión de la pauta social (social ads) es parte del servicio', 'Desde el plan Orgánico + Pauta. La gestión de la pauta social (social ads) es parte del servicio'],
    ['Más plataformas y volumen, integrado al resto del motor.', 'Más plataformas y más volumen.'],
    ['integrado con el resto del motor de adquisición', 'integrado con SEO, IA y Paid Media'],
    [', y en todos el creativo lo pones tú (o te conectamos con un partner).', '.'],
  ],
  'paid-media': [
    ['El precio es el fee de gestión: estrategia, manejo de la cuenta, optimización con IA y reportes. La inversión en pauta la pones tú y la respetamos al peso, nunca la subimos sin tu confirmación. Mínimo 3 meses.',
      'El fee cubre la estrategia, el manejo de la cuenta, la optimización con IA y los reportes. Mínimo 3 meses.'],
    ['Inversión publicitaria aparte, bajo tu control', 'Inversión publicitaria aparte'],
    [', no hacia todo el mundo', ''],
    ['Integración con el resto del motor: ', 'Integración con tu SEO, redes y sitio: '],
    ['integrada al motor.', 'integrada a tu SEO y tu sitio.'],
    ['integración con el resto del motor.', 'integración con SEO, redes y sitio.'],
    ['La pauta acelera un motor que ya gira con el orgánico: ', 'La pauta acelera lo que el orgánico ya mueve: '],
    ['Gestión de Redes Sociales', 'Gestión de redes sociales'],
  ],
};

// :149-152 LIMPIEZA. El censo dice que los dos son no-op: se comprueba sobre el texto que
// la plantilla les pasaba (después de corrige y de comillas).
const LIMPIEZA = [
  /con nuestro protocolo público, protocolo público\./,
  /con el protocolo público de medición, nuestro protocolo público y reproducible/,
];
const comillas = (t) => t.replace(/"([^"]+)"/g, '«$1»');

// :285-385 PROPIO, solo los campos de texto. Lo que no es texto (sangre, sangreClase,
// galería, secuencia, cierreChequeo) se queda en la plantilla.
const PROPIO = {
  'visibilidad-en-ia': {
    linea: 'Que ChatGPT, Gemini y Perplexity citen a tu empresa. Tres planes, desde $400.000 + IVA.',
    nota: ['Valores en pesos, + IVA.', 'Los acompañamientos son mensuales; el valor final se cierra tras el diagnóstico gratuito.'],
    marcas: ['Sí', 'Sí', 'No', 'No'],
    marcasSr: ['Prometemos:', 'Prometemos:', 'No prometemos:', 'No prometemos:'],
    leadSin: ['Cada día más decisiones de compra B2B empiezan en un chat, no en una lista de resultados. '],
  },
  'auditoria-seo-tecnica': {
    linea: 'En profundidad, con un informe priorizado por impacto. La auditoría, desde $490.000 + IVA; el mini-diagnóstico es gratis.',
    nota: ['Valores en pesos, + IVA.', 'El valor final se cierra tras el mini-diagnóstico gratuito, según el tamaño del sitio.'],
    marcas: ['A', 'B', 'C', 'D'],
  },
  'acompanamiento-mensual': {
    linea: 'Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA, desde $590.000/mes + IVA; las dos juntas, desde $790.000/mes + IVA. Mínimo 3 meses.',
    nota: ['Valores en pesos, + IVA.', 'Cumplidos los 3 meses, mes a mes con aviso de 30 días.'],
    marcas: ['S1', 'S2', 'S3', 'S4'],
    marcasSr: ['Semana 1:', 'Semana 2:', 'Semana 3:', 'Semana 4:'],
    incluyeH2: 'Lo que incluye',
    leadSin: [' Calidad de agencia, trato directo de consultor.'],
    cierreP: 'Envíanos tu URL y en 24 horas tienes el diagnóstico gratuito: es el punto de partida para dimensionar tu plan.',
  },
  'redes-sociales': {
    linea: 'LinkedIn o Meta, con estrategia, comunidad y reportes: desde $390.000/mes + IVA. Con pauta en Meta y las dos redes, desde $590.000/mes + IVA. El creativo lo pones tú.',
    nota: ['Valores en pesos, + IVA.', 'No incluyen la inversión en pauta: esa la defines tú.'],
    marcas: ['01', '02', '03', '04'],
    lead: 'Ponemos tu marca en redes con un calendario editorial pensado para tu cliente, y lo corregimos cada quincena con lo que muestran los reportes.',
  },
  'paid-media': {
    linea: 'Google Ads de alta intención, con el presupuesto bajo tu control. Gestión desde $350.000/mes + IVA.',
    nota: ['El precio es el fee de gestión, + IVA.', 'La inversión en pauta la pones tú y va a tu tarjeta.'],
    marcas: ['01', '02', '03', '04'],
    leadSin: [', con el presupuesto siempre bajo control: la pieza que acelera cuando el motor orgánico ya gira'],
    cierreH2: 'Vemos dónde conviene invertir',
    cierreP: 'Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito, antes de que pongas un peso en pauta.',
  },
};
// :401-406 CAJA (la entrada desarrollo-web es no-op: esa clave no existe en el JSON).
const CAJA = {
  'auditoria-seo-tecnica': 'Auditoría SEO técnica',
  'acompanamiento-mensual': 'Acompañamiento mensual',
  'redes-sociales': 'Gestión de redes sociales',
};
const sinPunto = (t) => t.replace(/\.\s*$/, '');

const informe = [];
const serviciosNuevo = {};
for (const [slug, base] of Object.entries(servicios)) {
  const pares = [...CORRIGE_TODOS, ...(CORRIGE[slug] ?? [])];
  const calza = new Map(pares.map((p) => [p, 0]));
  const corrige = (v, ruta) => {
    if (typeof v === 'string') {
      return pares.reduce((a, p) => {
        const [r, x] = p;
        const b = a.replace(r, x);
        if (b !== a) { calza.set(p, calza.get(p) + 1); informe.push(`servicios#/${slug}${ruta}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`); }
        return b;
      }, v);
    }
    if (Array.isArray(v)) return v.map((x, i) => corrige(x, `${ruta}/${i}`));
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, corrige(x, `${ruta}/${k}`)]));
    return v;
  };
  const s = corrige(clon(base), '');
  for (const [p, n] of calza) {
    // Los 3 de CORRIGE_TODOS no calzan en todos los servicios; los de CORRIGE, sí (censo §1.2).
    if (!CORRIGE_TODOS.includes(p)) exige(n > 0, `${slug}: el par ${String(p[0]).slice(0, 50)} no calza (el censo dice que sí)`);
  }
  exige(s.title === base.title, `${slug}: corrige cambió el title`);
  exige(s.serviceName === base.serviceName, `${slug}: corrige cambió serviceName`);

  // Un punto de plan que quedó en '' se sacaba al pintar (:512): se saca del arreglo.
  for (const sec of s.secciones) for (const pl of sec.planes ?? []) {
    if (Array.isArray(pl.puntos) && pl.puntos.some((x) => x === '')) {
      informe.push(`servicios#/${slug}: plan «${pl.nombre}», se saca un punto vacío`);
      pl.puntos = pl.puntos.filter(Boolean);
    }
  }

  const secs = s.secciones;
  const secIncluye = secs.find((x) => Array.isArray(x.lista) && x.lista.length);
  const secPlanes = secs.find((x) => Array.isArray(x.planes) && x.planes.length);
  const secBloques = secs.find((x) => Array.isArray(x.bloques) && x.bloques.length);
  const conParrafos = secs.filter((x) => Array.isArray(x.parrafos));
  const secCierre = conParrafos[conParrafos.length - 1];

  // LIMPIEZA: no-op comprobado sobre todo lo que limpia() recibía.
  const aLimpiar = [
    ...(secIncluye?.lista ?? []).map((t) => { const i = t.indexOf(': '); return i > 0 && i <= 90 ? t.slice(i + 2) : t; }),
    secPlanes?.nota ?? '',
    ...(secBloques?.bloques ?? []).map((b) => b.d),
  ].map(comillas);
  for (const t of aLimpiar) for (const r of LIMPIEZA) exige(!r.test(t), `${slug}: LIMPIEZA calza en «${t.slice(0, 60)}» (el censo dice no-op)`);

  const pr = PROPIO[slug];
  // leadSin (:389): cada trozo se saca una vez del lead ya corregido.
  if (pr.lead) {
    informe.push(`servicios#/${slug}/lead: se reemplaza entero por PROPIO.lead`);
    s.lead = pr.lead;
  } else if (pr.leadSin) {
    for (const x of pr.leadSin) {
      exige(s.lead.includes(x), `${slug}: leadSin «${x.slice(0, 40)}» no calza`);
      s.lead = s.lead.replace(x, '');
    }
    informe.push(`servicios#/${slug}/lead: sin ${pr.leadSin.length} trozo(s) de leadSin`);
  }
  // incluyeH2 (:484) tapa el h2 de la sección con lista.
  if (pr.incluyeH2) { informe.push(`servicios#/${slug}: h2 de lo que incluye ${JSON.stringify(secIncluye.h2)} → ${JSON.stringify(pr.incluyeH2)}`); secIncluye.h2 = pr.incluyeH2; }
  // cierreH2 y cierreP (:548, :550) tapan el h2 y el párrafo del cierre.
  if (pr.cierreH2) {
    exige(sinPunto(secCierre.h2) === pr.cierreH2, `${slug}: cierreH2 no era no-op`);
    informe.push(`servicios#/${slug}: cierreH2 no-op (el JSON ya decía ${JSON.stringify(secCierre.h2)}); se retira`);
  }
  if (pr.cierreP) { informe.push(`servicios#/${slug}: párrafo del cierre ${JSON.stringify(secCierre.parrafos[0])} → ${JSON.stringify(pr.cierreP)}`); secCierre.parrafos[0] = pr.cierreP; }
  // Marcas de los bloques, junto a los bloques.
  secBloques.marcas = pr.marcas;
  if (pr.marcasSr) secBloques.marcasSr = pr.marcasSr;
  // CAJA (:407, :409) y la miga del grafo (:440-441).
  if (CAJA[slug]) { informe.push(`servicios#/${slug}/h1 y /breadcrumb/2/name → ${JSON.stringify(CAJA[slug])}`); s.h1 = CAJA[slug]; }
  const nombre = CAJA[slug] ?? s.breadcrumb?.[2]?.name ?? s.h1;
  s.breadcrumb = s.breadcrumb.map((li) => (li.position === 2 ? { ...li, name: 'Servicios' } : li.position === 3 ? { ...li, name: nombre } : li));
  // linea y nota, campos nuevos.
  s.linea = pr.linea;
  s.nota = pr.nota;
  serviciosNuevo[slug] = ordenar(s, ['slug', 'title', 'description', 'h1', 'linea', 'nota', 'lead', 'secciones']);
}

// =====================================================================================
// 2 · paginas-v3.json
// =====================================================================================
const pag = clon(paginas);

// --- metodo.astro (63f1e55) ------------------------------------------------------------
{
  const m = pag.metodo;
  // :70 la línea salía de la primera frase de la meta.
  const linea = m.description.slice(0, m.description.indexOf('.') + 1);
  exige(linea === 'Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo.', 'metodo: la primera frase de la meta no es la esperada');
  m.linea = linea;
  // :74-78 lead.
  const lead = m.lead
    .replace(/^No improvisamos:\s*cada/, 'Cada')
    .replace(' de cuatro fases de auditoría', ' de auditoría')
    .replace(', refinado para sectores donde la confianza es crítica', '')
    .replace('sepas exactamente qué', 'sepas qué');
  exige(lead !== m.lead, 'metodo: el lead no cambió');
  m.lead = lead;
  // :88-101 textoFase. El espacio duro de «21 señales» NO va al JSON: es tipografía y se
  // queda en la plantilla (en el JSON sería un U+00A0 que no se ve en el editor).
  const [rec, , poco] = m.secciones;
  const d0 = rec.bloques[0].d
    .replace(/^Todo parte con tu URL\.\s*Auditamos el sitio en profundidad/, 'Todo parte con tu URL y el chequeo de 21 señales, el mismo que puedes correr tú en segundos. Después revisamos el sitio a mano')
    .replace('Luego conversamos', 'Y conversamos')
    .replace('tu negocio, tus clientes y las búsquedas', 'tu negocio y las búsquedas')
    .replace(/ que recibes gratis, en 24 horas\./, '.');
  exige(d0.startsWith('Todo parte con tu URL y el chequeo de 21 señales') && !d0.includes('Luego') && !d0.includes('tus clientes') && !d0.includes('recibes gratis'), 'metodo: fase 01, algún .replace no calzó');
  rec.bloques[0].d = d0;
  const d3 = rec.bloques[3].d.replace(/^Lo que no se mide, se estanca\.\s*/, '');
  exige(d3 !== rec.bloques[3].d, 'metodo: fase 04, el aforismo no calzó');
  rec.bloques[3].d = d3;
  // :154 la fila «20 minutos».
  const i20 = poco.lista.findIndex((t) => t.slice(0, t.indexOf(':')) === '20 minutos');
  const l20 = poco.lista[i20].replace(/^20 minutos: una conversación sobre tu negocio, tus clientes y qué/, '20 minutos: una conversación para entender qué');
  exige(l20 !== poco.lista[i20], 'metodo: la fila «20 minutos» no calzó');
  poco.lista[i20] = l20;
  // :319 el h2 fijo; el del JSON bajaba a bajada con un punto agregado.
  const bajada = `${poco.h2}.`;
  m.secciones[2] = ordenar({ ...poco, h2: 'Lo que necesitamos de ti', bajada }, ['h2', 'bajada']);
  pag.metodo = ordenar(m, ['slug', 'title', 'description', 'h1', 'linea', 'lead', 'secciones']);
}

// --- diagnostico.astro (63f1e55) -------------------------------------------------------
{
  const d = pag.diagnostico;
  // :66 meta description fijada (veto de Simón: no cambia, solo cambia de lugar).
  d.description = 'Pon tu dominio y revisamos al instante si ChatGPT, Claude y Perplexity pueden leerte, entenderte y citarte. Gratis, con los 21 chequeos y su puntaje publicados.';
  // :72, :82, :108 la miga.
  d.breadcrumb = d.breadcrumb.map((li) => (li.position === 2 ? { ...li, name: 'Chequeo gratis' } : li));
  // :113 la línea bajo el h1 (el lead del JSON no se leía: queda sin lector).
  d.linea = 'Pon tu dominio y revisamos al instante si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio, y si la IA puede entender qué haces y citarte.';
  // :149 el rótulo de «Los 21 chequeos» tapaba secciones/0/parrafos/0.
  d.secciones[0].parrafos[0] = 'La metodología completa, con el peso de cada bloque, para que puedas repetir el chequeo a mano si quieres.';
  // :176-182 la sección «Lo que este chequeo no mide», fija (tapaba secciones/0/bloques/0).
  d.noMide = {
    h2: 'Lo que este chequeo no mide',
    bloques: [
      { t: 'Y cómo medimos si la IA te nombra', d: 'No mide si hoy te citan: para eso hay que preguntarle a los motores. En los planes con acompañamiento lo hacemos cada mes con las mismas preguntas y en los mismos motores, con fecha y con la fuente de cada respuesta registrada. Cambiar las preguntas rompería la comparación entre meses.' },
      { t: 'Lo que muestran las corridas', d: 'Quienes aparecen recomendados casi nunca lo consiguen desde su propio sitio: los motores los citan desde rankings, directorios y artículos de terceros. Sin saber de dónde sale la recomendación, no hay nada que trabajar.' },
    ],
  };
  // :220 el «Siguiente» de la página (la sección 5 del JSON no se leía: queda sin lector).
  d.siguiente = { chico: 'Una página, gratis, en 24 horas.', enlace: 'Pedir el diagnóstico' };
  pag.diagnostico = ordenar(d, ['slug', 'title', 'description', 'h1', 'linea', 'lead', 'secciones', 'noMide', 'siguiente']);
}

// --- contacto.astro (63f1e55) ----------------------------------------------------------
{
  const c = pag.contacto;
  // :119 la línea bajo el h1 (el lead del JSON no se leía: queda sin lector).
  c.linea = 'Escríbenos con la dirección de tu sitio y recibes el mini-diagnóstico, gratis.';
  // :54-55 h2Form y h2Pasos tapaban secciones/0/h2 y secciones/1/h2. :59 el botón.
  c.secciones[0] = ordenar({ ...c.secciones[0], h2: 'Pide tu mini-diagnóstico', boton: 'Pedir mi mini-diagnóstico' }, ['h2', 'boton']);
  c.secciones[1].h2 = 'Qué pasa después';
  // :68-70 NDA_P / NDA_R (exacto condicional por la pregunta).
  const nda = c.faq.find((f) => f.p === '¿Firman acuerdos de confidencialidad?');
  exige(!!nda, 'contacto: la pregunta del NDA no está');
  nda.r = 'Sí, sin problema. En sectores financieros es práctica habitual y trabajamos bajo NDA cuando el cliente lo requiere.';
  pag.contacto = ordenar(c, ['slug', 'title', 'description', 'h1', 'linea', 'lead', 'secciones']);
}

// --- servicios/index.astro (63f1e55): los dos nombres del grafo -----------------------
{
  const s = pag.servicios;
  s.breadcrumb = s.breadcrumb.map((li) => (li.position === 2 ? { ...li, name: 'Servicios' } : li));
  s.itemList.name = 'Servicios de SpindleLab';
  s._nota = 'Lo lee src/pages/v3/servicios/index.astro, y solo dos campos: breadcrumb (el BreadcrumbList; la posición 2 dice «Servicios», como la miga visible) e itemList (el ItemList del JSON-LD, con su nombre, reordenado por la página como las bandas de oferta-v3.json; si le falta un servicio, el build cae). Son los nodos de la página publicada (public/servicios/index.html), con los dos nombres que la v3 corrigió (E8, paso 1): no borrar esta clave. El texto de la página vive en servicios/index.astro y en oferta-v3.json; title, description, h1, lead y secciones se quitaron el 13-oct-2026 porque nada los leía. slug y canonical tampoco se leen.';
}

// --- blog/index.astro (63f1e55): constantes de texto ---------------------------------
pag.blog = {
  _nota: 'Lo lee src/pages/v3/blog/index.astro (todo) y src/pages/v3/blog/[slug].astro (solo cierre: es el mismo de los 7 artículos). Titulares, bajadas y fechas de los artículos NO van aquí: salen de data/blog-v3/_indice.json, que está cerrado.',
  title: 'Blog: SEO técnico y visibilidad en IA · SpindleLab',
  description: 'Cómo funcionan el SEO técnico y la visibilidad en motores de IA en Chile, explicado con la metodología a la vista y sin promesas de primeros lugares.',
  h1: 'Lo que escribimos sobre búsqueda e IA',
  linea: 'Cómo funciona esto por dentro, desde qué mira el chequeo hasta qué preguntar antes de contratar a alguien. La metodología está publicada a propósito.',
  cierre: {
    h2: 'Leer ayuda; medir, más.',
    guia: 'Pon tu dominio y ves en segundos si una IA te puede leer, si te entiende y si te puede citar.',
    cuerpo: 'Es el mismo chequeo con el que partimos cada proyecto.',
  },
};

// =====================================================================================
// 3 · oferta-v3.json  ←  servicios/index.astro (63f1e55)
// =====================================================================================
const ofe = clon(oferta);
{
  // :106-108 descPagina tapaba momentos/0/items/0/d SOLO en el índice. Esa hoja es la línea
  // CERRADA del campo Desarrollo de la home: no se toca, y el índice lee la suya, dIndice.
  const dw = ofe.momentos[0].items[0];
  exige(dw.href === '/v3/servicios/desarrollo-web/', 'oferta: momentos/0/items/0 no es Desarrollo web');
  ofe.momentos[0].items[0] = ordenar({ ...dw, dIndice: 'El sitio nace legible para las máquinas que hoy recomiendan tu negocio. Lo compruebas con el chequeo gratis, sobre tu dominio, antes y después.' }, ['n', 'p', 'href', 'd', 'dIndice']);
  // :98-101 notaPagina. `nota` solo la lee el índice (la home no la pinta): se escribe ahí
  // lo que se ve. Desarrollo va sin nota (''), Visibilidad con la suya; Continuidad no
  // tiene y Alcance (tambienPanel) ya decía lo que se ve.
  exige(ofe.momentos[0].campo === 'brasa' && ofe.momentos[1].campo === 'navy', 'oferta: el orden de los campos no es el esperado');
  ofe.momentos[0].nota = '';
  ofe.momentos[1].nota = 'No hace falta reconstruir para que una IA pueda citarte.';
  // :116-118 fueraPagina (exacto condicional). `fuera` solo la lee el índice.
  const i = ofe.fuera.indexOf('Creación de contenido: redacción y guiones de piezas.');
  exige(i === 0, 'oferta: fuera/0 no es el esperado');
  ofe.fuera[i] = 'Contenido creativo: redacción y guiones de piezas.';
}

// =====================================================================================
// 4 · obra-v3.json  ←  trabajo.astro (63f1e55)
// =====================================================================================
const obr = clon(obra);
{
  // :79-84 LINEA_CORREGIDA y :88-90 RUBRO_CORREGIDO (exactos condicionales). `linea` y
  // `rubro` de los casos solo los lee /v3/trabajo/.
  const rai = obr.casos.find((c) => c.slug === 'raigal');
  exige(rai.linea === 'Clínica de implantología y rehabilitación oral. Sitio completo, del argumento clínico a la ficha de tratamiento.', 'obra: la línea de Raigal no es la esperada');
  rai.linea = 'Clínica de implantología. Por ahora, solo la portada: costo y plazos, etapas, la especialista, lo que no se promete y preguntas frecuentes.';
  const vyc = obr.casos.find((c) => c.slug === 'verifica-y-cumple');
  exige(vyc.rubro === 'Herramienta propia', 'obra: el rubro de Verifica no es el esperado');
  vyc.rubro = 'Herramienta';
  // :104-108 ROTULO: el nombre de cada tipo de pieza.
  obr.tipos = { cliente: 'Cliente', propio: 'Producto propio', concepto: 'Pieza de concepto' };
}
const obraNuevo = ordenar(obr, ['titulo', 'bajada', 'tipos', 'casos']);

// =====================================================================================
if (fallas.length) {
  console.error('NO SE ESCRIBE NADA. Fallas:\n- ' + fallas.join('\n- '));
  process.exit(1);
}
const escribir = (archivo, x) => fs.writeFileSync(path.join(destino, archivo), JSON.stringify(x, null, 2) + '\n');
escribir('servicios-v3.json', serviciosNuevo);
escribir('paginas-v3.json', pag);
escribir('oferta-v3.json', ofe);
escribir('obra-v3.json', obraNuevo);
console.log(informe.join('\n'));
console.log(`\nEscritos los cuatro JSON en ${destino} (base ${BASE}).`);
