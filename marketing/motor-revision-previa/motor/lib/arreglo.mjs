// De hallazgo a oferta ESPECIFICA. "Se regala el hallazgo, se vende el arreglo" (encargo §6) y, desde el 15-oct (decision de Ramon):
//   - Verifica y Cumple se ofrece solo cuando corresponde (cookies previas al aviso, o formulario sin politica).
//   - Si el sitio tiene OTRA complicacion, siempre se ofrece una solucion para ESA, no para la ley.
//   - El correo abre la puerta a una reunion (llamada de 20 minutos, el paso que ya describe el sitio y el proceso de ventas).
//
// REGLA: precios y textos salen solo de fuentes documentadas.
//   - Kit de Verifica y Cumple: correos aprobados del lanzamiento (23-sep) y estrategia §1.
//   - Servicios y "desde": el sitio publicado, spindlelab.cl, leido el 15-oct-2026. OJO: NO coinciden con las cifras borrador de
//     marketing/capacidad-servicios.md §0 (julio). Manda el sitio, que es lo que ve el prospecto.
//   - No existe un precio publicado para un ARREGLO PUNTUAL (salvo el kit). Cada servicio del sitio dice que "el valor final se cierra tras el
//     diagnostico gratuito y una conversacion de 20 minutos". Por eso, fuera del kit, el precio del arreglo se cierra en la llamada.
//   - Plazo: ningun correo aprobado ofrece plazo. No se inventa.
//   - Registro: SINGULAR (el correo sale firmado por Ramon, estrategia §7).

const FUENTE_SITIO = 'spindlelab.cl, leído el 15-oct-2026';
export const VEHICULOS = {
  VYC: { nombre: 'Kit de implementación de Verifica y Cumple', desde: 'Desde $149.000 + IVA, una vez', fuente: 'correos aprobados 23-sep y estrategia §1', en_correo: true },
  WEB: { nombre: 'Desarrollo Web a medida', desde: 'Página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA', fuente: FUENTE_SITIO, en_correo: false },
  MEDICION: { nombre: 'Acompañamiento Mensual, plan Esencial (foco en una capa)', desde: 'Desde $590.000 + IVA al mes', fuente: FUENTE_SITIO, en_correo: false },
  IA: { nombre: 'Auditoría de Visibilidad en IA', desde: 'Desde $400.000 + IVA, una vez', fuente: FUENTE_SITIO, en_correo: false },
  SEO: { nombre: 'Auditoría SEO Técnica, Completa', desde: 'Desde $490.000 + IVA, una vez', fuente: FUENTE_SITIO, en_correo: false },
};

const SIN_PUNTUAL = 'No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.';

export const ARREGLO = {
  C1: { linea: 'Verifica y Cumple', veh: 'VYC', frase: 'Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.', borrador: false,
    alcance: 'Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.',
    cierre: 'Gratis y sin registro: https://verifica.spindlelab.cl' },
  F1: { linea: 'Verifica y Cumple', veh: 'VYC', frase: 'Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.', borrador: false,
    alcance: 'Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.',
    cierre: 'Gratis y sin registro: https://verifica.spindlelab.cl' },
  C5: { linea: 'Desarrollo Web', veh: 'WEB', frase: 'Eso lo arreglo yo y lo pruebo de punta a punta, para que cada consulta llegue.', borrador: true, alcance: 'Corregir el destino del formulario o del correo y probarlo de punta a punta.', por_definir: [SIN_PUNTUAL] },
  F2: { linea: 'Desarrollo Web', veh: 'WEB', frase: 'Eso se arregla: dejo a la vista por dónde te escriben y lo pruebo de punta a punta.', borrador: true, alcance: 'Poner a la vista un formulario, teléfono o WhatsApp y probarlo.', por_definir: [SIN_PUNTUAL] },
  F3: { linea: 'Desarrollo Web', veh: 'WEB', frase: 'Eso se arregla en un minuto: dejo el número con el formato que WhatsApp pide y lo pruebo desde el celular.', borrador: true, alcance: 'Corregir el enlace de WhatsApp y probarlo desde un celular.', por_definir: [SIN_PUNTUAL] },
  F7: { linea: 'Auditoría SEO Técnica', veh: 'SEO', frase: 'Eso se arregla: dejo cada enlace llevando a una página que existe y reviso que no queden más rotos.', borrador: true, alcance: 'Corregir los enlaces rotos de la portada y revisar el resto del sitio.', por_definir: [SIN_PUNTUAL] },
  C3: { linea: 'Visibilidad en IA', veh: 'IA', frase: 'Eso se arregla en el servidor, no en tu sitio. Lo hago yo, con quien lo administra.', borrador: true, alcance: 'Cambiar la regla del servidor, CDN o plugin de seguridad que rechaza a los agentes.',
    por_definir: ['La regla vive en infraestructura del prospecto: sin acceso no se puede hacer solo (marketing/capacidad-servicios.md marca esa brecha).', SIN_PUNTUAL] },
  F5: { linea: 'Visibilidad en IA', veh: 'IA', frase: 'Eso se arregla cambiando una línea de tu robots.txt. Lo hago yo y reviso que los agentes entren.', borrador: true, alcance: 'Corregir el robots.txt y comprobar el acceso de los agentes de IA.', por_definir: [SIN_PUNTUAL] },
  F8: { linea: 'Visibilidad en IA', veh: 'IA', frase: 'Eso lo arreglo yo: dejo declarado qué negocio eres, con tu dirección y tu contacto, en el formato que leen Google y la IA.', borrador: true, alcance: 'Declarar el negocio como entidad en datos estructurados.', por_definir: [SIN_PUNTUAL] },
  F4: { linea: 'Acompañamiento', veh: 'MEDICION', frase: 'Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes.', borrador: true, alcance: 'Instalar analítica y medir consultas, llamadas y WhatsApp.', por_definir: [SIN_PUNTUAL] },
  C2: { linea: 'Acompañamiento', veh: 'MEDICION', frase: 'Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes y qué no.', borrador: true, alcance: 'Dejar medido lo que importa: consultas por formulario, llamadas y WhatsApp.', por_definir: [SIN_PUNTUAL] },
  C4: { linea: 'Visibilidad en IA', veh: 'IA', frase: 'Eso lo arreglo yo: dejo el nombre igual en el sitio y en los datos que leen Google y la IA.', borrador: true, alcance: 'Un solo nombre del negocio, igual en el sitio y en los datos estructurados.', por_definir: [SIN_PUNTUAL] },
  F6: { linea: 'Visibilidad en IA', veh: 'IA', frase: 'Eso se arregla en el servidor, no en tu sitio. Lo hago yo, con quien lo administra.', borrador: true, alcance: 'Revisar la regla del servidor que rechaza a los agentes de IA.', por_definir: [SIN_PUNTUAL] },
};

// La puerta a la reunion (decision de Ramon, 15-oct). OJO: estrategia §7 dice "cierre bajo, sin pedir reunion" y agente-outbound dice
// "no agendemos 30 min en el primer toque". Esta linea NO pide un horario ni una respuesta: ofrece. Aun asi, es una desviacion que el troncal
// debe reflejar en la estrategia (el motor no la toca).
export function aperturaReunion(extras) {
  const llamada = 'una llamada de 20 minutos';
  if (extras > 0) return `Vi ${extras === 1 ? 'otra cosa' : extras + ' cosas más'} que no te anoto acá. Si quieres, lo vemos en ${llamada}.`;
  return `Si quieres, lo vemos en ${llamada} y te muestro cómo lo dejaría.`;
}

// Lo que Ramon rechazo por escrito o la marca prohibe. Devuelve la lista de problemas (vacia = limpia).
export function revisarFrase(t) {
  const malas = [];
  if (/—/.test(t)) malas.push('raya larga');
  if (/soluci[oó]n(es)?\b/i.test(t)) malas.push('"solución" (castellano de folleto)');
  if (/impulsa|potencia|a tu medida|lleva tu negocio|transforma/i.test(t)) malas.push('verbo de folleto');
  if (/(!|¡)/.test(t)) malas.push('exclamación');
  if (/\b(en \d+ (d[ií]as|horas|semanas?)|una semana|esta semana|hoy mismo|ahora mismo)\b/i.test(t)) malas.push('plazo no documentado');
  if (/\b(garantiz|100%|perfect)/i.test(t)) malas.push('promesa de perfección');
  return malas;
}

// El correo hereda la exactitud, no el vocabulario (estrategia §7): consecuencia primero, en castellano, sin nombres de cookies ni jerga.
// Solo se redacta lo que el motor puede respaldar con datos. Lo que sea sospecha no se redacta.
const MARCA = { 'Google Analytics': 'Google', 'Google Ads': 'Google', 'Meta': 'Meta', 'Microsoft Clarity': 'Microsoft', 'Microsoft Ads': 'Microsoft',
  'Hotjar': 'Hotjar', 'Reddit': 'Reddit', 'HubSpot': 'HubSpot', 'TikTok': 'TikTok', 'Pinterest': 'Pinterest', 'LinkedIn': 'LinkedIn' };
const lista = (xs) => { const u = [...new Set(xs)]; return u.length < 2 ? u.join('') : u.slice(0, -1).join(', ') + ' y ' + u[u.length - 1]; };

export function enCastellano(c, soporte) {
  const d = c.datos || {};
  switch (c.id) {
    case 'C1': {
      const cs = (soporte?.c1?.cookies || []).filter((x) => MARCA[x.proveedor]); if (!cs.length) return null;
      if (cs.some((x) => x.primera_fase === 'variable')) return `Abrí tu sitio sin aceptar nada ni hacer un solo clic, y quedaron en mi navegador cookies de ${lista(cs.map((x) => MARCA[x.proveedor]))}.`;   // la fase cambia entre corridas: no se dice cuando
      const enA = cs.filter((x) => x.primera_fase === 'A').map((x) => MARCA[x.proveedor]), tras = cs.filter((x) => x.primera_fase !== 'A').map((x) => MARCA[x.proveedor]);
      if (!tras.length) return `Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de ${lista(enA)}.`;
      if (!enA.length) return `Abrí tu sitio sin aceptar nada ni hacer un solo clic. Bastó mover el mouse para que quedaran en mi navegador cookies de ${lista(tras)}.`;
      return `Abrí tu sitio sin tocar nada ni aceptar nada, y ya había cookies de ${lista(enA)} en mi navegador. Al mover el mouse, sin un solo clic, se sumaron las de ${lista(tras)}.`;
    }
    case 'F1': return 'Tu formulario pide correo o teléfono y, en tu portada, no encontré ningún enlace a una política de privacidad.';
    case 'F2': return 'En la portada de tu sitio no encontré cómo contactarte: ni formulario, ni teléfono, ni correo, ni WhatsApp.';
    case 'F3': return `El botón de WhatsApp de tu sitio apunta a un número sin código de país (${d.ejemplo || '9XXXXXXXX'}), y WhatsApp pide el formato internacional (56 9 ...).`;
    case 'F4': return 'No veo ninguna herramienta de medición instalada en tu sitio, ni Google Analytics ni Tag Manager.';
    case 'F5': return `Tu archivo robots.txt le prohíbe la entrada a ${lista(d.agentes || [])}, que son los que usan ChatGPT y Perplexity para leer sitios.`;
    case 'F7': return `En tu portada hay ${d.cantidad === 1 ? 'un enlace que lleva' : (d.cantidad || 'varios') + ' enlaces que llevan'} a páginas que no existen (error 404)${d.ejemplo ? `, por ejemplo ${d.ejemplo}` : ''}.`;
    case 'F8': return 'Tu sitio no le dice a Google ni a la IA qué negocio eres en el formato que ellos leen (datos estructurados).';
    case 'C2': return 'Tu sitio tiene Google Analytics y, desde afuera, no veo que mida otra cosa que visitas: ni consultas, ni llamadas, ni clics a WhatsApp. Si ya lo tienes medido desde tu panel, entonces no aplica.';
    default: return null;
  }
}

export function propuesta(candidato, soporte, extras = 0) {
  const a = ARREGLO[candidato.id]; if (!a) return null;
  const v = VEHICULOS[a.veh], cast = enCastellano(candidato, soporte), apertura = aperturaReunion(extras);
  const problemas = [...revisarFrase(a.frase), ...(cast ? revisarFrase(cast).map((x) => 'en castellano: ' + x) : []), ...revisarFrase(apertura).map((x) => 'apertura: ' + x)];
  return {
    en_castellano: cast ?? 'SIN REDACTAR: todavía es una sospecha, no se usa en un correo.', problema_tecnico: candidato.afirmable, donde_mirar: candidato.donde_mirar,
    se_vende: { linea: a.linea, producto: v.nombre, alcance: a.alcance, vehiculo_publicado: `${v.desde} (${v.fuente})`,
      precio_en_el_correo: v.en_correo ? v.desde : 'NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)', plazo: 'no se ofrece plazo (ningún correo aprobado lo hace)' },
    frase_de_arreglo: a.frase, apertura_a_reunion: apertura, cierre_sugerido: a.cierre || null,
    estado_del_texto: a.borrador ? 'BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón.' : 'APROBADO: tomado de correos ya revisados.',
    por_definir: a.por_definir || [], revision_de_tono: problemas.length ? { problemas } : 'limpia',
    registro: 'singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.',
  };
}
