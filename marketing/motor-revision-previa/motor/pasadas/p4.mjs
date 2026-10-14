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
  const [c1, c2] = runs.map(cookiesDe);
  const comunes = [...c1.keys()].filter((n) => c2.has(n));
  const solo1 = [...c1.keys()].filter((n) => !c2.has(n)), solo2 = [...c2.keys()].filter((n) => !c1.has(n));
  const verbos = runs.map((r) => {
    const carga = new Set(), envio = new Set(), gcs = new Set();
    for (const p of r.peticiones) if (p.clasif) {
      (p.clasif.tipo === 'carga' ? carga : envio).add(p.clasif.prov);
      if (p.clasif.gcs) gcs.add(p.clasif.gcs);
    }
    return { carga: [...carga].sort(), envio: [...envio].sort(), gcs: [...gcs].sort() };
  });
  const enAmbas = (k) => verbos[0][k].filter((x) => verbos[1][k].includes(x));
  const aviso = runs.map((r) => ({ A: !!r.A.dom?.aviso, B: !!r.B.dom?.aviso, implicito: !!(r.A.dom?.aviso?.implicito || r.B.dom?.aviso?.implicito) }));
  const info = {
    cookies: comunes.map((n) => ({ nombre: n, proveedor: c1.get(n).prov, primera_fase: c1.get(n).fase === c2.get(n).fase ? c1.get(n).fase : 'variable' })),
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

export function veredicto(ctx) {
  const { p0, p1, runs, edge, contacto, entidad, contenedores, gtmIds, htmlEjecutado } = ctx;
  const formulariosDOM = runs[0].B.dom?.formularios || [];
  const c1 = candidatoC1(runs), c2 = candidatoC2({ p1, contenedores, gtmIds, htmlEjecutado, peticiones: runs[0].peticiones });
  const c3 = candidatoC3(edge), c4 = candidatoC4(entidad), c5 = candidatoC5(contacto);
  const todos = { C1: c1.candidato, C2: c2.candidato, C3: c3.candidato, C4: c4.candidato, C5: c5.candidato };
  const lista = ORDEN.map((id) => todos[id]).filter(Boolean);
  const conProp = (c) => (c ? { ...c, propuesta: propuesta(c, { c1: c1.info }) } : c);
  const elegible = conProp(lista.find((c) => c.estado === 'estable'));  // R1 + R2 + R3
  const punteros = lista.filter((c) => c.id !== elegible?.id).map(conProp);  // la "ruta": no va en el correo
  const capa1 = hechosCapa1({ p1, runs, formulariosDOM });
  const notas = [c3.capa1, c3.noConcluyente, c2.noEvaluable].filter(Boolean);
  let resultado;
  if (elegible) resultado = 'hallazgo-capa-2';
  else if (punteros.length) resultado = 'sin-gancho-capa-2';
  else if (p0.html_no_alcanza && !runs[0].B.dom?.largo_texto) resultado = 'no-concluyente';
  else if (c3.noConcluyente) resultado = 'no-concluyente';
  else if (capa1.consecuencia.length) resultado = 'solo-capa-1';
  else resultado = 'sin-hallazgo';
  return { resultado, hallazgo: elegible || null, punteros, capa1, notas,
    soporte: { c1: c1.info, c2: c2.info ?? null, c3: c3.contexto ?? null } };
}
