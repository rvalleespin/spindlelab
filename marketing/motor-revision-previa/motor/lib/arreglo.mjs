// De hallazgo a algo que se vende. "Se regala el hallazgo, se vende el arreglo" (encargo §6).
// REGLA: aqui solo hay precios, plazos y alcances que estan DOCUMENTADOS en el repo. Lo que no lo esta va como `por_definir`.
//   - C1: texto y precio tomados de los correos aprobados del lanzamiento de Verifica y Cumple (23-sep) y estrategia §1.
//   - El resto: no hay producto suelto ni precio publicado. La frase es BORRADOR y requiere decision de Ramon.
//   - Plazo: ningun correo aprobado ofrece plazo ("Ninguno pide reunion, llamada, respuesta ni pone plazo"). No se inventa.
//   - Registro: SINGULAR, porque el correo sale firmado por Ramon (estrategia §7). La version plural queda para sitio y redes.

export const ARREGLO = {
  C1: {
    linea: 'Verifica y Cumple', producto: 'Kit de implementación', precio: 'Desde $149.000 + IVA, una vez', plazo: null,
    alcance: 'Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.',
    frase: 'Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.',
    frase_plural: 'Eso lo arreglamos nosotros, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.',
    cierre: 'Gratis y sin registro: https://verifica.spindlelab.cl', origen: 'Texto aprobado: marketing/lanzamiento-vyc-23sep/correos-hoteles-clinicas/ y estrategia §1.', borrador: false,
  },
  C2: {
    linea: 'Acompañamiento', producto: 'Medición de conversiones', precio: null, plazo: null,
    alcance: 'Dejar medido lo que importa: consultas por formulario, llamadas y WhatsApp.',
    frase: 'Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes y qué no.',
    por_definir: ['No hay un producto ni un precio publicado para instalar medición suelta. El Acompañamiento Mensual existe, pero es una mensualidad.'], borrador: true,
  },
  C3: {
    linea: 'Visibilidad en IA', producto: 'Acceso de agentes de IA (servidor o CDN)', precio: null, plazo: null,
    alcance: 'Cambiar la regla del servidor, CDN o plugin de seguridad que rechaza a los agentes.',
    frase: 'Eso se arregla en el servidor, no en tu sitio. Lo hago yo, con quien lo administra.',
    por_definir: ['La regla vive en infraestructura del prospecto: sin acceso no se puede hacer solo (marketing/capacidad-servicios.md marca esa brecha).', 'Sin producto ni precio publicado.'], borrador: true,
  },
  C4: {
    linea: 'Visibilidad en IA', producto: 'Claridad de entidad', precio: null, plazo: null,
    alcance: 'Un solo nombre del negocio, igual en el sitio y en los datos estructurados.',
    frase: 'Eso lo arreglo yo: dejo el nombre igual en el sitio y en los datos que leen Google y la IA.',
    por_definir: ['Sin producto ni precio publicado.', 'Falta cruzar con la ficha de Google y LinkedIn, que se hace a mano.'], borrador: true,
  },
  C5: {
    linea: 'Desarrollo Web', producto: 'Reparar la ruta de contacto', precio: null, plazo: null,
    alcance: 'Corregir el destino del formulario o del correo y probarlo de punta a punta.',
    frase: 'Eso lo arreglo yo y lo pruebo de punta a punta, para que cada consulta llegue.',
    por_definir: ['Sin producto ni precio publicado para una reparación puntual.'], borrador: true,
  },
};

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
// Solo se redacta lo que el motor puede respaldar con datos (C1, C2). Para C3 a C5 no hay redaccion todavia: son sospechas.
const MARCA = { 'Google Analytics': 'Google', 'Google Ads': 'Google', 'Meta': 'Meta', 'Microsoft Clarity': 'Microsoft', 'Microsoft Ads': 'Microsoft',
  'Hotjar': 'Hotjar', 'Reddit': 'Reddit', 'HubSpot': 'HubSpot', 'TikTok': 'TikTok', 'Pinterest': 'Pinterest', 'LinkedIn': 'LinkedIn' };
const lista = (xs) => { const u = [...new Set(xs)]; return u.length < 2 ? u.join('') : u.slice(0, -1).join(', ') + ' y ' + u[u.length - 1]; };
export function enCastellano(c, soporte) {
  if (c.id === 'C1') {
    const cs = (soporte?.c1?.cookies || []).filter((x) => MARCA[x.proveedor]);
    if (!cs.length) return null;
    if (cs.some((x) => x.primera_fase === 'variable')) return `Abrí tu sitio sin aceptar nada ni hacer un solo clic, y quedaron en mi navegador cookies de ${lista(cs.map((x) => MARCA[x.proveedor]))}.`;   // la fase cambia entre corridas: no se dice cuándo
    const enA = cs.filter((x) => x.primera_fase === 'A').map((x) => MARCA[x.proveedor]), tras = cs.filter((x) => x.primera_fase !== 'A').map((x) => MARCA[x.proveedor]);
    if (!tras.length) return `Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de ${lista(enA)}.`;
    if (!enA.length) return `Abrí tu sitio sin aceptar nada ni hacer un solo clic. Bastó mover el mouse para que quedaran en mi navegador cookies de ${lista(tras)}.`;
    return `Abrí tu sitio sin tocar nada ni aceptar nada, y ya había cookies de ${lista(enA)} en mi navegador. Al mover el mouse, sin un solo clic, se sumaron las de ${lista(tras)}.`;
  }
  if (c.id === 'C2') return 'Tu sitio tiene Google Analytics y, desde afuera, no veo que mida otra cosa que visitas: ni consultas, ni llamadas, ni clics a WhatsApp. Si ya lo tienes medido desde tu panel, entonces no aplica.';
  return null;
}

export function propuesta(candidato, soporte) {
  const a = ARREGLO[candidato.id]; if (!a) return null;
  const cast = enCastellano(candidato, soporte);
  const problemas = [...revisarFrase(a.frase), ...(cast ? revisarFrase(cast).map((x) => 'en castellano: ' + x) : [])];
  return {
    en_castellano: cast ?? 'SIN REDACTAR: todavía es una sospecha, no se usa en un correo.', problema_tecnico: candidato.afirmable, donde_mirar: candidato.donde_mirar,
    se_vende: { linea: a.linea, producto: a.producto, alcance: a.alcance, precio: a.precio ?? 'POR DEFINIR (no hay precio documentado)', plazo: a.plazo ?? 'no se ofrece plazo (ningún correo aprobado lo hace)' },
    frase_de_arreglo: a.frase, cierre_sugerido: a.cierre || null,
    estado_del_texto: a.borrador ? 'BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón.' : 'APROBADO: tomado de correos ya revisados.',
    por_definir: a.por_definir || [], revision_de_tono: problemas.length ? { problemas } : 'limpia',
    registro: 'singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.',
  };
}
