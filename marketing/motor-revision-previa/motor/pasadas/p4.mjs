// Pasada 4: veredicto. Cuatro condiciones CON su razon (no un puntaje), estado de evidencia, orden R2.
//   estado: 'sospecha' | 'estable'.  'verificado' NO existe aqui: lo escribe un humano.
//   TOPES por candidato (ver jerarquia §3): C2, C4 y la rotura de formulario de C5 nunca pasan de 'sospecha'.
import { proveedorDeCookie } from '../lib/navegador.mjs';
import { propuesta } from '../lib/arreglo.mjs';

const ORDEN = ['C5', 'C3', 'C1', 'C2', 'C4'];
const LINEA = { C1: 'Verifica y Cumple', C2: 'Acompañamiento', C3: 'Visibilidad en IA', C4: 'Visibilidad en IA', C5: 'Desarrollo Web' };
const NOMBRE = {
  C1: 'Rastreadores que escriben antes de cualquier consentimiento', C2: 'Medición instalada sin ningún evento de conversión',
  C3: 'Agentes de IA rechazados por el servidor aunque robots.txt los permite', C4: 'El nombre del negocio no es el mismo dentro del sitio',
  C5: 'La ruta de contacto apunta a algo que no responde',
};
const cond = (v, razon) => ({ v, razon });

function cookiesDe(run) {
  const m = new Map();
  for (const [fase, lista] of [['A', run.A.cookies], ['B', run.B.cookies]])
    for (const c of lista) { const prov = proveedorDeCookie(c.nombre); if (prov && !m.has(c.nombre)) m.set(c.nombre, { prov, fase, dominio: c.dominio }); }
  return m;
}

export function candidatoC1(runs) {
  const mapas = runs.map(cookiesDe);   // dos corridas, o tres si el lote incluye la de confirmacion con zona horaria de Chile
  const comunes = [...mapas[0].keys()].filter((n) => mapas.every((m) => m.has(n)));   // solo lo que aparece en TODAS
  const solo1 = [...new Set(mapas.flatMap((m) => [...m.keys()]))].filter((n) => !comunes.includes(n)), solo2 = [];
  const verbos = runs.map((r) => {
    const carga = new Set(), envio = new Set(), gcs = new Set();
    for (const p of r.peticiones) if (p.clasif) {
      (p.clasif.tipo === 'carga' ? carga : envio).add(p.clasif.prov);
      if (p.clasif.gcs) gcs.add(p.clasif.gcs);
    }
    return { carga: [...carga].sort(), envio: [...envio].sort(), gcs: [...gcs].sort() };
  });
  const enAmbas = (k) => verbos[0][k].filter((x) => verbos.every((v) => v[k].includes(x)));
  const aviso = runs.map((r) => ({ A: !!r.A.dom?.aviso, B: !!r.B.dom?.aviso, implicito: !!(r.A.dom?.aviso?.implicito || r.B.dom?.aviso?.implicito) }));
  const info = {
    cookies: comunes.map((n) => ({ nombre: n, proveedor: mapas[0].get(n).prov, primera_fase: mapas.every((m) => m.get(n).fase === mapas[0].get(n).fase) ? mapas[0].get(n).fase : 'variable' })),
    solo_en_una_corrida: [...solo1, ...solo2],
    carga_en_ambas: enAmbas('carga'), envio_en_ambas: enAmbas('envio'), google_gcs: verbos.map((v) => v.gcs),
    aviso_en_dom: aviso, capturas: runs.map((r) => [r.A.captura, r.B.captura]),
  };
  if (!comunes.length) return { info, candidato: null };
  const soloTrasGesto = info.cookies.some((c) => c.primera_fase !== 'A');
  return { info, candidato: {
    id: 'C1', nombre: NOMBRE.C1, linea: LINEA.C1, estado: 'estable', quien_comprueba: 'el dueño, en 30 segundos',
    donde_mirar: soloTrasGesto
      ? 'Abrir el sitio en una ventana nueva, mirar las cookies (candado > Cookies, o F12 > Application > Cookies) sin tocar nada ~10 s, y de nuevo tras mover el mouse y bajar por la página. Algunas aparecen solo tras el primer gesto.'
      : 'Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).',
    condiciones: {
      1: cond('si', 'Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.'),
      2: cond('si', `Cookies de medición o publicidad escritas sin que nadie haya aceptado: ${comunes.join(', ')}. Se describe la señal, no la obligación.`),
      3: cond(soloTrasGesto ? 'medias' : 'si', soloTrasGesto ? 'Comprobable, pero hay que explicar que aparecen tras mover el mouse.' : 'Se ve en el panel de cookies del navegador.'),
      4: cond('si', 'Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.'),
    },
    afirmable: `Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: ${comunes.join(', ')}.`,
    no_afirmable: ['que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: ' + (info.envio_en_ambas.join(', ') || 'ninguno') + ')',
      'que el sitio "no tiene aviso" sin ver la captura del tramo B', 'lo que la ley "exige"', 'cualquier cosa que no aparezca en las dos corridas'],
    advertencias: [
      ...(info.google_gcs.flat().includes('G100') ? ['Hay peticiones a Google con gcs=G100 (Consent Mode, consentimiento denegado): no afirmar "Analytics recibe la visita" sin mirar las cookies.'] : []),
      ...(aviso.some((a) => a.implicito) ? ['El aviso dice aceptar "al continuar navegando": puede contar como consentimiento implícito. Revisar a mano.'] : []),
      ...(solo1.length + solo2.length ? [`Cambiaron entre corridas y por eso quedan fuera: ${[...new Set([...solo1, ...solo2])].join(', ')}.`] : []),
    ],
  } };
}

export function candidatoC3(edge) {
  if (!edge.bloqueados_en_ambas.length && !edge.discrepancia_entre_rondas) return { candidato: null };
  const contexto = { bloqueados: edge.bloqueados_en_ambas, causa: edge.causa_nombrada, discrepancia: edge.discrepancia_entre_rondas, normal_ok: edge.normal_ok_en_ambas };
  if (!edge.normal_ok_en_ambas || edge.discrepancia_entre_rondas) return { contexto, candidato: null, noConcluyente: 'La respuesta con agente normal no fue estable o los agentes discreparon entre rondas.' };
  if (!edge.causa_nombrada) return { contexto, candidato: null, capa1: 'Hay rechazo por nombre de agente pero no se pudo nombrar la capa que lo causa: se queda en capa 1 (decisión D1).' };
  return { contexto, candidato: {
    id: 'C3', nombre: NOMBRE.C3, linea: LINEA.C3, estado: 'estable', quien_comprueba: 'quien administra el sitio (con una línea de comandos)',
    donde_mirar: `Pedir la portada presentándose con el nombre de cada agente (por ejemplo: curl -sI -A "${edge.bloqueados_en_ambas[0]}" <portada>) y comparar con la respuesta de un navegador normal.`,
    condiciones: {
      1: cond('si', 'robots.txt los permite y la portada se ve normal; el rechazo ocurre en el servidor.'),
      2: cond('medias', 'Si el rechazo es real, esos agentes no pueden leer el sitio; el efecto en consultas no se mide aquí.'),
      3: cond('medias', 'El dueño no lo comprueba solo; su desarrollador sí, con un comando.'),
      4: cond('si', `Se nombró la capa causante: ${edge.causa_nombrada}. Detectar el rechazo es capa 1; nombrar la capa exige oficio.`),
    },
    afirmable: `Al presentarse con el nombre ${edge.bloqueados_en_ambas.join(', ')}, el servidor respondió con un rechazo (${edge.causa_nombrada}) mientras que con un navegador normal responde bien, en dos rondas.`,
    no_afirmable: ['que "bloquea al bot real" (la prueba se hace desde una IP que no es la oficial del agente)', 'que "ChatGPT/Claude no te cita por esto"', 'que se arregla "en una semana" sin acceso al CDN o al hosting'],
    advertencias: [edge.limite],
  } };
}

export function candidatoC5(contacto) {
  const f = contacto.formularios_rotos_en_ambas, m = contacto.correos_sin_mx_en_ambas;
  if (!f.length && !m.length) return { candidato: null };
  const solidoCorreo = m.length > 0;
  return { candidato: {
    id: 'C5', nombre: NOMBRE.C5, linea: LINEA.C5, estado: solidoCorreo ? 'estable' : 'sospecha', quien_comprueba: 'el dueño o quien administra el sitio',
    donde_mirar: [
      ...f.map((x) => `El formulario envía a ${x.action}, que al pedirlo responde ${x.estado === 'roto-404' ? 'HTTP ' + x.status : 'sin dominio'}. Probar el envío con un dato de prueba propio.`),
      ...m.map((x) => `El correo de contacto usa el dominio ${x.dominio}, que no tiene servidor de correo (MX) ni dirección.`),
    ].join(' '),
    condiciones: {
      1: cond('si', 'El dueño ve un formulario o un correo que parecen normales.'),
      2: cond('si', 'Cada consulta enviada por ahí se pierde.'),
      3: cond('medias', solidoCorreo ? 'El dominio sin MX se comprueba con una consulta DNS o enviándose un correo.' : 'Hay que enviar el formulario para probarlo; el motor nunca lo hace.'),
      4: cond('medias', 'La detección estructural es barata; distinguir rotura real de un destino que solo acepta POST exige criterio.'),
    },
    afirmable: [...f.map((x) => `El destino del formulario (${x.action}) responde ${x.status || x.estado} al pedirlo.`), ...m.map((x) => `El dominio ${x.dominio} del correo de contacto no tiene registro MX.`)].join(' '),
    no_afirmable: ['que "el formulario no funciona" (un GET no es un envío; el motor nunca envía)', 'cuántas consultas se perdieron'],
    advertencias: [...(solidoCorreo ? [] : ['Tope: la rotura de formulario nunca pasa de sospecha sin probar el envío.'])],
  } };
}

export function candidatoC2({ p1, contenedores, gtmIds, htmlEjecutado, peticiones }) {
  const a = p1.html.analitica;
  const tieneMedicion = gtmIds.length || a.ga4.length || a.ua.length;
  if (!tieneMedicion) return { candidato: null, hecho: 'sin-analitica' };
  const leidos = contenedores.filter((c) => c.leido);
  if (gtmIds.length && !leidos.length) return { candidato: null, noEvaluable: 'Hay Tag Manager pero no se pudo leer el contenedor.' };
  // Si la analitica nunca se disparo en la sesion (p. ej. la frena el aviso de consentimiento), no se pueden ver sus eventos.
  const disparo = peticiones.some((p) => ['Google Tag', 'Google Analytics', 'Google Ads'].includes(p.clasif?.prov));
  if (!disparo) return { candidato: null, noEvaluable: 'La analitica esta instalada pero no se disparo en la sesion (probable consentimiento previo): sus eventos no se pueden ver sin clics.' };
  const evInline = a.gtag_eventos_inline.filter((e) => !['page_view', 'config'].includes(e));
  const evObservados = [...new Set(peticiones.map((p) => p.clasif?.evento).filter(Boolean))];
  const hayEvento = leidos.some((c) => c.tags_de_evento.length || c.html_con_conversion || c.menciona_conversion || c.etiquetas_ads_con_label)
    || evInline.length || /generate_lead|gtag_report_conversion|fbq\(\s*['"]track['"]\s*,\s*['"](Lead|Contact|Schedule)/i.test(htmlEjecutado) || /AW-\d+\/[\w-]{6,}/.test(htmlEjecutado);
  const info = { gtm: gtmIds, contenedores: contenedores.map((c) => ({ id: c.id, leido: c.leido, funciones: c.funciones, tags_de_evento: c.tags_de_evento, html_personalizado: c.html_personalizado })), eventos_inline: evInline, eventos_observados_en_sesion: evObservados, ads_instalado: a.ads.length > 0 };
  if (hayEvento) return { info, candidato: null };
  return { info, candidato: {
    id: 'C2', nombre: NOMBRE.C2, linea: LINEA.C2, estado: 'sospecha', tope: 'Las conversiones marcadas dentro de la propiedad de GA4 son invisibles desde afuera: nunca pasa de sospecha.',
    quien_comprueba: 'el dueño, con acceso a su Google Analytics',
    donde_mirar: 'En Google Analytics: Administrar > Eventos (y cuáles están marcados como clave). Del lado del sitio: Tag Assistant o el contenedor de Tag Manager, buscando alguna etiqueta de evento.',
    condiciones: {
      1: cond('si', 'El dueño ve cifras de visitas y cree que mide.'),
      2: cond(a.ads.length ? 'si' : 'medias', a.ads.length ? 'Hay etiqueta de Google Ads instalada y ninguna conversión visible.' : 'Cuesta plata solo si se decide algo con esas cifras.'),
      3: cond('medias', 'Requiere acceso a su propiedad de Analytics.'),
      4: cond('si', 'Se lee el contenedor de Tag Manager y el código de la página; no lo entrega una API.'),
    },
    afirmable: 'El sitio no envía ningún evento de conversión que se vea desde afuera (ni etiqueta de evento en el contenedor, ni evento en el código).',
    no_afirmable: ['"no mides" o "no tienes conversiones" (una regla del panel de Analytics puede estar convirtiendo visitas sin etiqueta en el sitio)', 'que "tus cifras están mal"'],
    advertencias: ['Sin clics (§3) el motor no ve qué se dispara al enviar un formulario.'],
  } };
}

export function candidatoC4(entidad) {
  if (!entidad.nombres_en_conflicto.length) return { candidato: null };
  return { candidato: {
    id: 'C4', nombre: NOMBRE.C4, linea: LINEA.C4, estado: 'sospecha', tope: 'El cruce con la ficha de Google y LinkedIn es manual: nunca pasa de sospecha.',
    quien_comprueba: 'el dueño, buscando su propio nombre',
    donde_mirar: `Buscar el nombre del negocio y comparar con: ${entidad.nombres_en_conflicto[0].join(' / ')}. Después, la ficha de Google y LinkedIn (a mano).`,
    condiciones: {
      1: cond('si', 'Cada pieza se ve bien por separado.'), 2: cond('medias', 'El costo (que ningún modelo consolide quién es) es blando.'),
      3: cond('si', 'Se compara a simple vista.'), 4: cond('medias', 'Comparar texto es automático; interpretarlo y cruzarlo con otras fuentes es oficio.'),
    },
    afirmable: `Dentro del sitio el nombre aparece como: ${entidad.nombres_en_conflicto[0].join(' y ')}.`,
    no_afirmable: ['que ocurre lo mismo en Google o LinkedIn (no revisado)'], advertencias: [],
  } };
}

export function hechosCapa1({ p1, runs, formulariosDOM }) {
  const c = p1.html.contacto, a = p1.html.analitica, tieneForm = formulariosDOM.some((f) => f.visible);
  // El HTML sin ejecutar no ve los botones que inyecta JavaScript (p. ej. el de WhatsApp): se suman los enlaces del DOM ya ejecutado.
  const enlacesDOM = runs.flatMap((r) => r.B.dom?.enlaces || []).map((e) => e.h || '');
  const dom = { tel: enlacesDOM.some((h) => /^tel:/i.test(h)), mail: enlacesDOM.some((h) => /^mailto:/i.test(h)), wa: enlacesDOM.some((h) => /wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(h)) };
  const sinContacto = !tieneForm && !c.tel && !c.mailto.length && !c.whatsapp.length && !dom.tel && !dom.mail && !dom.wa;
  const pideDatos = formulariosDOM.some((f) => f.visible && f.pide_correo_o_tel);
  const politica = (runs[0].B.dom?.politica || []).length || p1.html.politica_en_html.length;
  const bots = p1.robots.agentes ? Object.entries(p1.robots.agentes).filter(([n, v]) => v.bloquea_en_robots && !/Google-Extended|CCBot|GPTBot|ClaudeBot/.test(n)).map(([n]) => n) : [];
  const consecuencia = [], higiene = [];
  if (sinContacto) consecuencia.push('sin_ruta_de_contacto_visible');
  if (pideDatos && !politica) consecuencia.push('formulario_que_pide_datos_sin_enlace_a_politica');
  if (bots.length) consecuencia.push(`robots_txt_bloquea: ${bots.join(', ')}`);
  const visto = runs.some((r) => r.peticiones.some((p) => p.clasif?.prov === 'Google Tag' || p.clasif?.prov === 'Google Analytics'));
  if (!a.gtm.length && !a.ga4.length && !a.ua.length && !visto) consecuencia.push('sin_analitica');   // visto en la red cuenta: hay scripts que inyectan la analitica
  if (!p1.llms_txt) higiene.push('sin_llms_txt'); if (!p1.sitemap) higiene.push('sin_sitemap');
  if (!p1.html.jsonld.org.length) higiene.push('sin_entidad_en_jsonld'); if (!p1.html.descripcion) higiene.push('sin_meta_description');
  return { consecuencia, higiene };
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Capa 1: complicaciones del sitio que el dueno puede comprobar y que tienen una oferta. Entran desde el 15-oct (decision de Ramon):
// "si el sitio tiene otra complicacion, siempre ofrecer una solucion". Ya no pasan la vara de capa 2 (cond. 4 casi siempre ✘): se declara asi.
// Siguen sin 'verificado'. 'estable' = se repite en todas las corridas / rondas.
const NOMBRE_F = {
  F1: 'Un formulario que pide datos y no enlaza a ninguna política de privacidad', F2: 'No hay a la vista cómo contactar al negocio',
  F3: 'El enlace de WhatsApp apunta a un número sin código de país', F4: 'No hay ninguna herramienta de medición instalada',
  F5: 'robots.txt le prohíbe la entrada a agentes de IA de búsqueda', F6: 'El servidor rechaza a agentes de IA por su nombre (causa sin nombrar)',
  F7: 'Enlaces de la portada que llevan a páginas que no existen', F8: 'El negocio no está declarado como entidad en datos estructurados',
  F9: 'El enlace a la política de privacidad o al aviso legal lleva a una página que no existe', F10: 'En la primera pantalla no hay cómo contactar, cotizar o comprar',
  F11: 'El sitio no está preparado para el celular', F12: 'La portada descarga demasiado peso', F13: 'La información de la portada está mal estructurada',
  F14: 'El formulario de contacto pide demasiados datos',
};
const LINEA_F = { F1: 'Verifica y Cumple', F2: 'Desarrollo Web', F3: 'Desarrollo Web', F4: 'Acompañamiento', F5: 'Visibilidad en IA', F6: 'Visibilidad en IA', F7: 'Auditoría SEO Técnica', F8: 'Visibilidad en IA',
  F9: 'Verifica y Cumple', F10: 'Desarrollo Web', F11: 'Desarrollo Web', F12: 'Auditoría SEO Técnica', F13: 'Auditoría SEO Técnica', F14: 'Desarrollo Web' };
const BOTS_BUSQUEDA = ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot', 'Claude-User', 'Perplexity-User'];
const RE_CONTACTO = /contact|escr[ií]benos|cotiz|agenda|reserv|solicit|hablemos|conversemos/i;

function F(id, estado, quien, donde, condiciones, afirmable, noAfirmable, datos, extra = {}) {
  return { id, nombre: NOMBRE_F[id], linea: LINEA_F[id], capa: 1, estado, quien_comprueba: quien, donde_mirar: donde, condiciones, afirmable, no_afirmable: noAfirmable, advertencias: [], datos, ...extra };
}

export function candidatosCapa1({ p1, p0, runs, edge, enlaces, htmlEjecutado, movil = [] }) {
  const out = {}, todas = (fn) => runs.every(fn);
  const domLinks = (r) => (r.B.dom?.enlaces || []).map((e) => ({ h: e.h || '', t: e.t || '' }));
  const forms = (r) => r.B.dom?.formularios || [];
  const c = p1.html.contacto;

  // F1: formulario que pide correo o telefono y ningun enlace a politica (ni en el HTML ni en el DOM ya ejecutado).
  if (todas((r) => forms(r).some((f) => f.pide_correo_o_tel)) && p1.html.politica_en_html.length === 0 && todas((r) => (r.B.dom?.politica || []).length === 0))
    out.F1 = F('F1', 'estable', 'el dueño, en 30 segundos', 'Mirar el formulario de la portada y el pie de página: buscar un enlace a "política de privacidad".',
      { 1: cond('medias', 'La ausencia de un enlace se nota poco.'), 2: cond('si', 'El formulario ya trata datos personales hoy.'), 3: cond('si', 'Se ve mirando el formulario y el pie.'), 4: cond('no', 'Cualquier chequeo gratis (incluido el de Verifica y Cumple) lo muestra: es capa 1.') },
      'La portada tiene un formulario que pide correo o teléfono y no hay ningún enlace a una política de privacidad (ni en el HTML ni tras ejecutar la página).',
      ['que "no tiene política" en todo el sitio (solo se revisó la portada)', 'lo que la ley "exige"'], {});

  // F2: sin ruta de contacto: ni formulario, ni telefono, ni correo, ni WhatsApp, ni un enlace de contacto.
  if (todas((r) => !forms(r).length && !domLinks(r).some((l) => /^(tel:|mailto:)|wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(l.h) || RE_CONTACTO.test(l.h + ' ' + l.t))) && !c.tel && !c.mailto.length && !c.whatsapp.length)
    out.F2 = F('F2', 'estable', 'el dueño, en 30 segundos', 'Abrir la portada y buscar por dónde un cliente puede escribir o llamar.',
      { 1: cond('no', 'Se ve mirando el sitio.'), 2: cond('si', 'Sin ruta de contacto, cada visita que quiere comprar se va.'), 3: cond('si', 'Se ve a simple vista.'), 4: cond('no', 'Cualquier herramienta lo ve: es capa 1.') },
      'En la portada no hay formulario, ni teléfono, ni correo, ni WhatsApp, ni un enlace de contacto.', ['que el negocio no tenga contacto en otras páginas del sitio (solo se revisó la portada)'], {});

  // F3: WhatsApp con un numero chileno de 9 digitos sin el 56.
  const hrefs = [...c.whatsapp, ...runs.flatMap((r) => domLinks(r).map((l) => l.h))].filter((h) => /wa\.me|api\.whatsapp\.com/i.test(h));
  const malos = [...new Set(hrefs.map((h) => (h.match(/wa\.me\/\+?(\d+)/i) || h.match(/[?&]phone=\+?(\d+)/i) || [])[1]).filter((n) => n && /^9\d{8}$/.test(n)))];
  if (malos.length) out.F3 = F('F3', 'estable', 'el dueño, tocando el botón desde un celular', 'Tocar el botón de WhatsApp del sitio desde un celular y ver si abre el chat o un error.',
    { 1: cond('medias', 'Solo se nota al tocarlo.'), 2: cond('si', 'Cada cliente que intenta escribir por ahí no llega.'), 3: cond('si', 'Se prueba tocándolo.'), 4: cond('no', 'Es capa 1.') },
    `El enlace de WhatsApp usa un número de 9 dígitos sin código de país (${malos[0].slice(0, 2)}XXXXXXX).`, ['que "no abre": el motor no probó el enlace en WhatsApp (solo lee el formato del número)'],
    { ejemplo: `wa.me/${malos[0].slice(0, 2)}XXXXXXX` }, { advertencias: ['[Probable] WhatsApp pide el formato internacional; el motor no tocó el enlace. Comprobarlo desde un celular antes de usarlo.'] });

  // F4: ninguna medicion instalada (ni en el HTML, ni en la red, ni otras herramientas).
  const a = p1.html.analitica;
  const redMedicion = runs.some((r) => r.peticiones.some((p) => ['Google Tag', 'Google Analytics', 'Microsoft Clarity', 'Hotjar'].includes(p.clasif?.prov)));
  if (!a.gtm.length && !a.ga4.length && !a.ua.length && !redMedicion && !/matomo|plausible\.io|fathom|mixpanel|posthog|amplitude|umami|heap-analytics/i.test(htmlEjecutado))
    out.F4 = F('F4', 'estable', 'el dueño, con acceso a su panel', 'Preguntar a quien administra el sitio si hay Google Analytics u otra herramienta; o abrir el sitio con Tag Assistant.',
      { 1: cond('no', 'No se ve, pero lo confirma cualquier extensión gratuita.'), 2: cond('medias', 'Sin medición no se sabe qué trae clientes.'), 3: cond('si', 'Se comprueba con Tag Assistant.'), 4: cond('no', 'Es capa 1.') },
      'No hay Google Analytics, Tag Manager ni otra herramienta de medición visible en el sitio.', ['que "no mides nada" (puede haber medición del lado del servidor o la propia de la plataforma)'], { plataforma: p1.html.plataforma?.nombre || null },
      { advertencias: p1.html.plataforma?.analitica_propia ? [`El sitio usa ${p1.html.plataforma.nombre}, que trae analítica propia: lo único afirmable es que no hay Google Analytics ni Tag Manager.`] : [] });

  // F5: robots.txt cierra la puerta a los agentes de IA de busqueda / de usuario.
  const bots = p1.robots.agentes ? BOTS_BUSQUEDA.filter((n) => p1.robots.agentes[n]?.bloquea_en_robots) : [];
  if (bots.length) out.F5 = F('F5', 'estable', 'el dueño, abriendo tu-sitio/robots.txt', 'Abrir tu-sitio.cl/robots.txt en el navegador y buscar las líneas "Disallow: /" bajo esos agentes (o bajo "User-agent: *").',
    { 1: cond('si', 'robots.txt no se mira nunca.'), 2: cond('medias', 'Esos agentes no pueden leer el sitio; el efecto en consultas no se mide aquí.'), 3: cond('si', 'Se abre en el navegador.'), 4: cond('no', 'Todos los chequeos de IA lo muestran: es capa 1.') },
    `robots.txt prohíbe la entrada de ${bots.join(', ')}.`, ['que "por eso no te cita ChatGPT"'], { agentes: bots });

  // F6: rechazo por nombre sin causa nombrada. Tope: sospecha (UA presentado desde una IP que no es la oficial).
  if (edge.bloqueados_en_ambas.length && !edge.causa_nombrada && edge.normal_ok_en_ambas && !edge.discrepancia_entre_rondas)
    out.F6 = F('F6', 'sospecha', 'quien administra el sitio (con una línea de comandos)', `curl -sI -A "${edge.bloqueados_en_ambas[0]}" <portada>, comparado con un navegador normal.`,
      { 1: cond('si', 'El rechazo ocurre en el servidor.'), 2: cond('medias', 'Efecto no medido.'), 3: cond('medias', 'Solo quien administra el sitio.'), 4: cond('no', 'Sin causa nombrada es capa 1.') },
      `Al presentarse con el nombre ${edge.bloqueados_en_ambas.join(', ')}, el servidor respondió con un rechazo, y con un navegador normal responde bien.`, ['que "bloquea al bot real"'], {},
      { tope: 'Tope sospecha: el nombre del agente se presenta desde una IP que no es la oficial.' });

  // F7: enlaces rotos en la portada.
  const RE_POL = /privacy|privacidad|politica|pol%C3%ADtica|legal|terminos|t%C3%A9rminos|cookies|aviso/i;
  const rotosPolitica = (enlaces?.rotos_en_ambas || []).filter((u) => RE_POL.test(u)), rotosOtros = (enlaces?.rotos_en_ambas || []).filter((u) => !RE_POL.test(u));
  if (rotosPolitica.length) out.F9 = F('F9', 'estable', 'el dueño, haciendo clic', 'Hacer clic en el enlace de "política de privacidad" o "aviso legal" del pie de página.',
    { 1: cond('si', 'Casi nadie hace clic en el pie de página.'), 2: cond('si', 'Es peor que no tener política: el sitio dice que existe y no abre.'), 3: cond('si', 'Se prueba con un clic.'), 4: cond('no', 'Cualquier verificador de enlaces lo ve: es capa 1.') },
    `El enlace a ${new URL(rotosPolitica[0]).pathname} (política o aviso legal) responde 404, en dos rondas.`, ['lo que la ley "exige"', 'que el sitio no tenga política en otra dirección'], { ejemplo: new URL(rotosPolitica[0]).pathname });
  if (rotosOtros.length) out.F7 = F('F7', 'estable', 'el dueño, haciendo clic', 'Hacer clic en los enlaces de la portada y el menú.',
    { 1: cond('medias', 'Solo se nota al hacer clic en ese enlace.'), 2: cond('medias', 'Cada clic roto es una visita perdida.'), 3: cond('si', 'Se prueba con un clic.'), 4: cond('no', 'Cualquier verificador de enlaces lo ve: es capa 1.') },
    `${rotosOtros.length} enlace(s) internos de la portada responden 404 (revisados ${enlaces.revisados}), en dos rondas.`, ['que sean todos los rotos del sitio (solo se revisó la portada)'],
    { cantidad: rotosOtros.length, ejemplo: new URL(rotosOtros[0]).pathname });

  // F8: ninguna entidad declarada en JSON-LD.
  if (!p1.html.jsonld.org.length) out.F8 = F('F8', 'estable', 'el dueño, con una herramienta gratuita', 'Pegar la dirección en el probador de resultados enriquecidos de Google, o buscar "application/ld+json" en el código de la página.',
    { 1: cond('si', 'Los datos estructurados no se ven.'), 2: cond('medias', 'Sin entidad declarada, la IA y Google adivinan quién eres.'), 3: cond('si', 'Se comprueba con una herramienta gratuita.'), 4: cond('no', 'Los chequeos gratis lo muestran: es capa 1.') },
    'El sitio no declara el negocio (Organization o LocalBusiness) en datos estructurados.', ['que "Google no te entiende"'], {});

  // ---- Cuellos de botella de captacion y construccion de la informacion (15-oct) ----
  // F10: en la primera pantalla de escritorio no hay NINGUNA accion para contactar, cotizar o comprar.
  if (todas((r) => r.A.dom && !(r.A.dom.cta_en_pantalla || []).length && !r.A.dom.formulario_en_pantalla))
    out.F10 = F('F10', 'estable', 'el dueño, mirando la primera pantalla', 'Abrir el sitio y, sin bajar, buscar un botón o enlace para contactar, cotizar, escribir por WhatsApp o comprar.',
      { 1: cond('medias', 'El dueño ve su sitio todos los días y no ve lo que falta.'), 2: cond('si', 'Quien llega y no ve cómo seguir, se va.'), 3: cond('si', 'Se ve a simple vista.'), 4: cond('no', 'Es capa 1.') },
      'En la primera pantalla de la portada no hay ningún botón o enlace para contactar, cotizar, escribir por WhatsApp o comprar.', ['que no exista contacto más abajo en la página'], {},
      { advertencias: ['Mirar la captura del tramo A (escritorio) antes de usarlo: la heurística busca palabras de acción, y un botón con otro texto no cuenta.'] });

  // F11: celular. Sin meta viewport el telefono muestra la version de escritorio en miniatura; con desborde horizontal obliga a deslizar.
  const mov = movil.filter(Boolean);
  if (mov.length && mov.every((m) => !m.meta_viewport || m.desborde_px > 20)) {
    const sinMeta = mov.every((m) => !m.meta_viewport);
    out.F11 = F('F11', 'estable', 'el dueño, abriendo el sitio en su celular', 'Abrir el sitio en un celular: ver si se muestra en miniatura o si hay que deslizar de lado.',
      { 1: cond('medias', 'El dueño suele mirarlo desde el computador.'), 2: cond('si', 'Una parte grande de las visitas llega desde un celular.'), 3: cond('si', 'Se comprueba con su propio teléfono.'), 4: cond('no', 'Es capa 1.') },
      sinMeta ? 'El sitio no declara cómo mostrarse en celular (falta la etiqueta viewport), en dos corridas móviles.' : `En una pantalla de celular el contenido se desborda ${Math.min(...mov.map((m) => m.desborde_px))} px o más hacia el lado, en dos corridas.`,
      ['qué porcentaje de las visitas llega desde celular'], { tipo: sinMeta ? 'sin-viewport' : 'desborde', px: Math.min(...mov.map((m) => m.desborde_px)) });
  }

  // F12: portada pesada (bytes transferidos: no depende de desde donde se mida).
  if (todas((r) => (r.peso?.al_abrir_bytes || 0) >= 5e6)) {   // lo descargado en la carga inicial, sin haber bajado la pagina
    const mb = Math.round(Math.min(...runs.map((r) => r.peso.al_abrir_bytes)) / 1e5) / 10;
    out.F12 = F('F12', 'estable', 'quien administra el sitio, con las herramientas del navegador', 'En el navegador: F12, pestaña Network, recargar y mirar el total transferido abajo.',
      { 1: cond('si', 'Nadie mira cuánto pesa su portada.'), 2: cond('medias', 'En un celular con datos, una portada pesada tarda en abrir.'), 3: cond('si', 'Se ve en la pestaña Network.'), 4: cond('no', 'Cualquier medidor de velocidad lo ve: es capa 1.') },
      `La portada descarga ${mb} MB solo al abrirse, sin bajar la página (mínimo de las ${runs.length} corridas).`, ['cuánto tarda en abrir para un visitante real (se mide desde un datacenter)'], { mb, mas_pesado: runs[0].peso.mas_pesados?.[0] || null });
  }

  // F13: informacion mal construida en la portada: sin H1, varios H1 o muy poco texto.
  // 'varios H1' NO se ofrece: Google dice que varios H1 esta bien (auditado 15-oct). 'sin H1' exige acuerdo entre el DOM ejecutado y el HTML crudo (L14 tenia H1 en el crudo y 0 en el DOM).
  const h1Crudo = ((p0?.html || '').match(/<h1[\s>]/gi) || []).length;
  const tiposEstr = (r) => { const e = r.A.dom?.estructura; if (!e) return []; const t = []; if (e.h1 === 0 && h1Crudo === 0) t.push('sin-h1'); if (e.palabras < 150) t.push('poco-texto'); return t; };
  const comunes = tiposEstr(runs[0]).filter((t) => runs.every((r) => tiposEstr(r).includes(t)));
  if (comunes.length) {
    const e = runs[0].A.dom.estructura;
    const frase = { 'sin-h1': 'no tiene un título principal (H1)', 'varios-h1': `tiene ${e.h1} títulos principales (H1) en vez de uno`, 'poco-texto': `tiene solo ${e.palabras} palabras de texto` };
    out.F13 = F('F13', 'estable', 'el dueño, con el código de la página', 'Ver el código fuente (clic derecho > ver código) y buscar "<h1"; o contar las palabras de la portada.',
      { 1: cond('si', 'La estructura del código no se ve.'), 2: cond('medias', 'Google y la IA usan esa estructura para entender de qué trata la página.'), 3: cond('si', 'Se ve en el código fuente.'), 4: cond('no', 'Cualquier auditor SEO gratuito lo ve: es capa 1.') },
      `La portada ${comunes.map((t) => frase[t]).join(' y ')}.`, ['que el resto del sitio tenga el mismo problema'], { tipos: comunes, h1: e.h1, palabras: e.palabras });
  }

  // F14: formulario de contacto largo.
  const campos = runs.map((r) => Math.max(0, ...(r.B.dom?.formularios || []).filter((f) => f.pide_correo_o_tel).map((f) => f.campos)));
  if (campos.every((n) => n >= 7)) out.F14 = F('F14', 'estable', 'el dueño, mirando su formulario', 'Abrir el formulario de contacto y contar los campos que hay que llenar.',
    { 1: cond('medias', 'El dueño no lo mira como lo mira un cliente.'), 2: cond('medias', 'Cada campo de más es una razón para no terminarlo.'), 3: cond('si', 'Se cuenta a simple vista.'), 4: cond('no', 'Es capa 1.') },
    `El formulario de contacto pide ${Math.min(...campos)} datos o más.`, ['cuántos de esos campos son obligatorios', 'cuánta gente lo abandona'], { campos: Math.min(...campos) });
  return out;
}

// Prioridad de la oferta PRINCIPAL (solo compiten los 'estable'). Contacto primero (regla de la casa), luego acceso, luego Verifica y Cumple
// (solo si corresponde), luego lo demas. C2, C4 y F6 son sospechas: nunca principal. Decision de orden registrada en jerarquia v1.
// Primero lo que frena la captacion (contacto, primera pantalla, celular), luego acceso, luego Verifica y Cumple (solo si corresponde), luego fricción, estructura, peso, medición y entidad.
const ORDEN_OFERTA = ['C5', 'F2', 'F3', 'F10', 'F11', 'C3', 'F5', 'C1', 'F1', 'F9', 'F14', 'F7', 'F13', 'F12', 'F4', 'F8'];
const ORDEN_SOSPECHA = ['C2', 'C4', 'F6'];

export function veredicto(ctx) {
  const { p0, p1, runs, edge, contacto, entidad, contenedores, gtmIds, htmlEjecutado, enlaces, movil } = ctx;
  const formulariosDOM = runs[0].B.dom?.formularios || [];
  const c1 = candidatoC1(runs), c2 = candidatoC2({ p1, contenedores, gtmIds, htmlEjecutado, peticiones: runs[0].peticiones });
  const c3 = candidatoC3(edge), c4 = candidatoC4(entidad), c5 = candidatoC5(contacto);
  const f = candidatosCapa1({ p1, p0, runs, edge, enlaces, htmlEjecutado, movil });
  const todos = { C1: c1.candidato, C2: c2.candidato, C3: c3.candidato, C4: c4.candidato, C5: c5.candidato, ...f };
  const estables = ORDEN_OFERTA.map((id) => todos[id]).filter((c) => c && c.estado === 'estable');
  const principal = estables[0] || null;
  // C1 y F1 piden el mismo arreglo (Verifica y Cumple): cuentan como UNA sola cosa, sea cual sea la principal.
  const vyc = (c) => ['C1', 'F1', 'F9'].includes(c.id);
  let extras = estables.slice(1).filter((c) => !(principal && vyc(principal) && vyc(c)));
  if (extras.filter(vyc).length > 1) { const primero = extras.find(vyc); extras = extras.filter((c) => !vyc(c) || c === primero); }
  const noEstables = Object.values(todos).filter((c) => c && c.estado !== 'estable');   // sospechas: nunca principal, nunca van al correo
  const soporte = { c1: c1.info };
  const conProp = (c, n = 0) => (c ? { ...c, propuesta: propuesta(c, soporte, n) } : c);
  const hallazgo = conProp(principal, extras.length);
  const ruta = [...extras, ...noEstables].map((c) => conProp(c));
  const capa1 = hechosCapa1({ p1, runs, formulariosDOM });
  const notas = [c3.capa1, c3.noConcluyente, c2.noEvaluable].filter(Boolean);
  let resultado;
  if (hallazgo) resultado = hallazgo.capa === 1 ? 'oferta-capa-1' : 'hallazgo-capa-2';
  else if (ruta.length) resultado = 'sin-gancho';
  else if (p0.html_no_alcanza && !runs[0].B.dom?.largo_texto) resultado = 'no-concluyente';
  else if (c3.noConcluyente) resultado = 'no-concluyente';
  else resultado = 'sin-hallazgo';
  return { resultado, hallazgo, punteros: ruta, extras: extras.map((c) => c.id), capa1, notas,
    soporte: { c1: c1.info, c2: c2.info ?? null, c3: c3.contexto ?? null } };
}
