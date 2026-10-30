/**
 * El correo que recibe quien compra el kit.
 *
 * POR QUÉ EXISTE. El enlace del pedido —32 hex en la URL— es la ÚNICA credencial de su pantalla
 * privada: no hay cuenta ni contraseña. Hasta ahora ese enlace solo existía en la pestaña a la
 * que Mercado Pago lo devolvía. Quien la cerrara perdía el acceso a su propio pedido, y nosotros
 * no teníamos forma de mandárselo. El sitio, además, prometía un correo que nunca salía.
 *
 * Sale por Resend, desde `envios.spindlelab.cl`. El subdominio es a propósito: el dominio raíz
 * tiene el SPF de Google Workspace, y un segundo SPF ahí habría roto la entrega del correo del
 * negocio, que es el que se usa para todo el outbound.
 *
 * NUNCA PUEDE ROMPER UN COBRO. Igual que el aviso interno: cualquier fallo se traga y se
 * registra. Un pago que entró no se pierde porque un correo no salió.
 */

export const REMITENTE = 'Verifica y Cumple <hola@envios.spindlelab.cl>';
// Las respuestas van a la casilla de verdad, que es donde Ramón las lee. El subdominio de envío
// no recibe correo, así que sin esto una respuesta se perdería.
export const RESPONDER_A = 'hola@spindlelab.cl';
export const BASE_SITIO = 'https://verifica.spindlelab.cl';

const PESOS = (n) => '$' + Number(n || 0).toLocaleString('es-CL');

export function enlaceDelPedido(id) {
  return `${BASE_SITIO}/pedido/?id=${encodeURIComponent(id)}`;
}

/**
 * El mensaje. Se arma aparte de enviarlo para poder leerlo en una prueba sin tocar la red.
 *
 * Va en texto y en HTML. El texto no es un relleno: hay gente que lee en clientes que no
 * muestran HTML, y este correo lleva el único enlace que le permite volver a su pedido.
 */
export function correoDePago(pedido) {
  const enlace = enlaceDelPedido(pedido.id);
  const sitio = pedido.dominio || 'tu sitio';

  const texto = [
    `Recibimos tu pago de ${PESOS(pedido.monto_total)} por el kit de ${sitio}.`,
    '',
    'Acá está tu pedido:',
    enlace,
    '',
    'Guarda este correo. Ese enlace es la forma de volver a tu pedido, y no hace falta',
    'ninguna cuenta ni contraseña.',
    '',
    'Lo que sigue son dos pasos, los dos en esa misma página:',
    '',
    '1. Los datos de tu empresa (razón social, RUT, giro y dirección). Los necesitamos',
    '   para armar el borrador de tu política, porque son los que la ley pide publicar.',
    '',
    '2. Un acceso temporal a tu sitio, con los permisos mínimos. Nunca te vamos a pedir',
    '   tu contraseña. Si tu sitio lo administra otra persona, te damos el texto listo',
    '   para reenviarle.',
    '',
    'Si algo no calza o tienes una duda, responde este correo y te contestamos.',
    '',
    'Verifica y Cumple',
    BASE_SITIO,
  ].join('\n');

  // HTML sobrio y sin nada externo: ni imágenes, ni fuentes, ni scripts. Un correo que carga
  // cosas de fuera se ve peor en la mitad de los clientes y, en un producto sobre datos
  // personales, pedirle al navegador de alguien que llame a un tercero es justo lo que
  // marcamos en rojo en el chequeo.
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;line-height:1.6">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
<p style="margin:0 0 20px;font-size:17px"><strong>Recibimos tu pago de ${PESOS(pedido.monto_total)}</strong> por el kit de ${escapar(sitio)}.</p>
<p style="margin:0 0 8px">Acá está tu pedido:</p>
<p style="margin:0 0 24px"><a href="${enlace}" style="color:#be185d;font-weight:600;word-break:break-all">${enlace}</a></p>
<p style="margin:0 0 24px;padding:14px 16px;background:#fdf2f8;border-radius:8px;font-size:15px">
<strong>Guarda este correo.</strong> Ese enlace es la forma de volver a tu pedido, y no hace falta ninguna cuenta ni contraseña.</p>
<p style="margin:0 0 12px"><strong>Lo que sigue son dos pasos</strong>, los dos en esa misma página:</p>
<ol style="margin:0 0 24px;padding-left:20px">
<li style="margin-bottom:10px">Los datos de tu empresa: razón social, RUT, giro y dirección. Los necesitamos para armar el borrador de tu política, porque son los que la ley pide publicar.</li>
<li>Un acceso temporal a tu sitio, con los permisos mínimos. <strong>Nunca te vamos a pedir tu contraseña.</strong> Si tu sitio lo administra otra persona, te damos el texto listo para reenviarle.</li>
</ol>
<p style="margin:0 0 24px">Si algo no calza o tienes una duda, responde este correo y te contestamos.</p>
<p style="margin:0;font-size:14px;color:#71717a">Verifica y Cumple · <a href="${BASE_SITIO}" style="color:#71717a">verifica.spindlelab.cl</a></p>
</div></body></html>`;

  return {
    from: REMITENTE,
    to: [pedido.correo],
    reply_to: RESPONDER_A,
    subject: `Recibimos tu pago · ${sitio}`,
    text: texto,
    html,
  };
}

function escapar(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/**
 * Manda el correo. Devuelve true solo si Resend lo aceptó, y nunca lanza.
 */
export async function enviarCorreoDePago(pedido, token, fetchImpl = fetch) {
  if (!pedido || !pedido.id || !pedido.correo) return false;
  // El token se limpia, por lo mismo que el de Mercado Pago y el secreto de la firma: uno
  // pegado con un espacio al final se ve CARGADO en el panel y no sirve.
  token = typeof token === 'string' ? token.trim() : token;
  if (!token) {
    console.log('[correo] sin RESEND_API_KEY: no se manda nada');
    return false;
  }
  try {
    const r = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(correoDePago(pedido)),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.log(`[correo] Resend contestó http-${r.status}`);
      return false;
    }
    console.log(`[correo] enviado el pedido ${String(pedido.id).slice(0, 12)}…`);
    return true;
  } catch (e) {
    console.log(`[correo] no se pudo enviar: ${e && e.message}`);
    return false;
  }
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ *
 * EL CORREO DE CIERRE
 *
 * ── POR QUÉ FALTABA (30-oct-2026) ─────────────────────────────────────────────────────────
 *
 * La etapa `entregado` le decía a la persona, en pantalla: «Te mandamos el antes y el después
 * por correo». Este archivo solo definía `correoDePago`. O sea que la última frase del
 * producto —la que cierra la venta y es lo único que queda cuando el trabajo ya está hecho—
 * prometía un correo que no existía en ninguna línea del repo.
 *
 * ── LA REGLA DEL NÚMERO: NO SE COMPARAN DOS PUNTAJES DISTINTOS ───────────────────────────
 *
 * El informe congelado guarda DOS mediciones, `rapido` y `profundo`, y cada una tiene su
 * propio `puntaje` con su propia escala. Comparar el rápido de antes contra el profundo de
 * después daría una mejora inventada: un número que sube porque cambió la vara, no porque el
 * sitio mejorara. Sería exactamente el tipo de afirmación que el chequeo le marca en rojo a
 * otros sitios, firmada por nosotros, en el correo que cierra el trabajo.
 *
 * Por eso `puntajeComparable` exige que la misma llave exista en los dos lados, y si no
 * existe, el correo NO lleva números. Lleva lo que sí es cierto: qué se cerró.
 * ══════════════════════════════════════════════════════════════════════════════════════════ */

/** El puntaje de una medición, buscando en orden y devolviendo también DE DÓNDE salió. */
function puntajesDe(informe) {
  const salida = {};
  if (!informe || typeof informe !== 'object') return salida;
  for (const clave of ['profundo', 'rapido']) {
    const m = informe[clave];
    if (m && typeof m.puntaje === 'number' && isFinite(m.puntaje)) salida[clave] = m.puntaje;
  }
  // Un informe suelto, sin envolver. Se acepta por comodidad de quien entrega, y viaja con su
  // propia llave para que no se pueda comparar contra una de las otras dos.
  if (typeof informe.puntaje === 'number' && isFinite(informe.puntaje)) salida.suelto = informe.puntaje;
  return salida;
}

/**
 * El antes y el después, solo cuando los dos números son de la MISMA medición.
 *
 * Devuelve `null` cuando no hay nada comparable, y eso no es un fallo: es la respuesta
 * correcta. El chequeo deja el puntaje en `null` cuando confirmó menos de la mitad del peso,
 * así que un sitio difícil de medir puede llegar acá sin número por el camino honesto.
 */
export function puntajeComparable(informeAntes, informeDespues) {
  const antes = puntajesDe(informeAntes);
  const despues = puntajesDe(informeDespues);
  for (const clave of ['profundo', 'rapido', 'suelto']) {
    if (clave in antes && clave in despues) {
      return { clave, antes: antes[clave], despues: despues[clave] };
    }
  }
  return null;
}

/**
 * Qué se le dice al cliente cuando el correo no lleva número, según POR QUÉ no lo lleva.
 *
 * Los tres salen del mismo molde —qué pasó, y qué puede hacer— y ninguno culpa al instrumento
 * de algo que no hizo. Viven juntos para que se lean uno al lado del otro: era imposible
 * notar que el texto viejo servía para uno solo mientras estaba escrito dentro del `else`.
 */
export const SIN_NUMERO = {
  // No se rehizo la medición. Lo primero que se dice es eso, porque es lo que pasó.
  'sin-rehacer':
    'Esta vez no te mandamos un antes y un después: no alcanzamos a volver a correr el ' +
    'chequeo sobre tu página. Si quieres el número, respóndenos este correo y lo corremos.',

  // Se rehizo y el chequeo declinó. Acá sí corresponde explicar el comportamiento del
  // instrumento, porque acá sí es la razón.
  declinado:
    'Volvimos a correr el chequeo sobre la misma página que medimos al principio, y esta vez ' +
    'no puso nota. Solo la pone cuando alcanza a confirmar más de la mitad de lo que mide, y ' +
    'en tu página no alcanzó. Si quieres, respóndenos y lo miramos contigo.',

  // Se rehizo, hay número, y no se puede restar contra el de antes.
  'otra-vara':
    'Volvimos a correr el chequeo sobre la misma página que medimos al principio. La medición ' +
    'nueva no se puede restar contra la del principio porque no están en la misma escala, así ' +
    'que preferimos no darte dos números que parecen comparables y no lo son.',
};

/**
 * En qué quedó la medición final. SON TRES SITUACIONES DISTINTAS Y SE DECÍAN IGUAL.
 *
 * ── EL DEFECTO (encontrado el 30-oct por una revisión adversaria) ────────────────────────
 *
 * La primera versión de este correo tenía dos ramas: hay número comparable, o no lo hay. Y
 * cuando no lo había, decía siempre lo mismo:
 *
 *   «Volvimos a correr el chequeo sobre la misma página que medimos al principio. Esta vez
 *    no te damos un puntaje comparable: el chequeo solo pone nota cuando alcanza a confirmar
 *    más de la mitad de lo que mide…»
 *
 * Esa frase narra los hechos de UNA de las tres situaciones y se mandaba en las tres. En la
 * peor —entregar sin mandar `informe_final`, que el endpoint acepta y documenta— le decía al
 * cliente que volvimos a correr el chequeo sobre su página cuando la misma transacción acababa
 * de escribir `informe_final_json: null`, que es el dato de que NO se rehizo la medición.
 *
 * O sea: una afirmación falsa sobre trabajo ejecutado, firmada por nosotros, en la última
 * frase que lee alguien que pagó $177.310. Es exactamente la clase de cosa que este producto
 * le marca en rojo a otros sitios, y exactamente la clase de cosa que este commit vino a
 * arreglar. La prueba la bendecía porque comprobaba que el texto apareciera, no que fuera
 * cierto.
 *
 * Los tres casos se distinguen con datos que la función YA tiene en la mano, así que no
 * distinguirlos no era una limitación: era una rama de menos.
 */
export function situacionDeLaMedicion(informeAntes, informeDespues) {
  // No se rehizo nada. Lo dice la ausencia del informe, que es un dato, no un hueco.
  if (!informeDespues) return { caso: 'sin-rehacer' };

  const comparable = puntajeComparable(informeAntes, informeDespues);
  if (comparable) return { caso: 'comparable', comparable };

  // Se rehizo y el chequeo DECLINÓ: ninguna medición trajo un número. Es el comportamiento
  // documentado —solo pone nota cuando confirma más de la mitad del peso— y acá sí
  // corresponde explicarlo, porque acá sí es lo que pasó.
  if (!Object.keys(puntajesDe(informeDespues)).length) return { caso: 'declinado' };

  // Se rehizo, hay número, y no se puede restar contra el del principio porque son varas
  // distintas. Decir que el chequeo declinó acá sería culpar al instrumento de una decisión
  // nuestra de no comparar peras con manzanas.
  return { caso: 'otra-vara' };
}

/**
 * El mensaje de cierre. Puro, como el de pago, para poder leerlo en una prueba sin red.
 *
 * @param {object} pedido  el pedido ya en `entregado`, con su informe congelado
 * @param {object} informeFinal  la medición nueva, o null si no se pudo rehacer
 * @param {object} titulos  el catálogo de nombres de señales (TITULOS de etapas.js)
 */
export function correoDeEntrega(pedido, informeFinal = null, titulos = {}) {
  const enlace = enlaceDelPedido(pedido.id);
  const sitio = pedido.dominio || 'tu sitio';
  const nombrar = (id) => titulos[id] || id;

  let congelado = null;
  try {
    congelado = typeof pedido.informe_json === 'string'
      ? JSON.parse(pedido.informe_json)
      : pedido.informe_json;
  } catch { congelado = null; }

  const situacion = situacionDeLaMedicion(congelado, informeFinal);
  const comparable = situacion.comparable || null;
  const cerradas = (pedido.senales_contratadas || []).map(nombrar);
  const fuera = (pedido.senales_fuera || []).map(nombrar);

  const lineas = [
    `Terminamos el trabajo en ${sitio}.`,
    '',
  ];

  if (cerradas.length) {
    lineas.push('Esto es lo que quedó cerrado:', '');
    cerradas.forEach((t) => lineas.push(`  · ${t}`));
    lineas.push('');
  }

  if (comparable) {
    // El número se dice con su vara. «De 30 a 77» sin decir sobre qué es media afirmación.
    lineas.push(
      `El chequeo que corrimos al principio sobre ${pedido.url_medida || sitio} daba ` +
        `${comparable.antes} de 100. Lo volvimos a correr sobre la misma página y ahora da ` +
        `${comparable.despues}.`,
      '',
    );
  } else {
    lineas.push(SIN_NUMERO[situacion.caso], '');
  }

  if (fuera.length) {
    lineas.push('Esto queda fuera del kit, como estaba dicho desde antes de que pagaras:', '');
    fuera.forEach((t) => lineas.push(`  · ${t}`));
    lineas.push('');
  }

  lineas.push(
    'Dos cosas por hacer de tu lado:',
    '',
    '1. El borrador de tu política lo tiene que revisar tu abogado antes de publicarlo como ' +
      'definitivo. Nosotros no damos asesoría legal y el texto final no es nuestro.',
    '',
    '2. Ya puedes borrar el acceso que nos diste a tu sitio. Si no sabes dónde, escríbenos y ' +
      'te decimos.',
    '',
    'Tu pedido, con el detalle de lo que incluía:',
    enlace,
    '',
    'Si algo no te calza o quieres que revisemos una página distinta, responde este correo.',
    '',
    'Verifica y Cumple',
    BASE_SITIO,
  );

  const li = (t) => `<li style="margin-bottom:6px">${escapar(t)}</li>`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;line-height:1.6">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
<p style="margin:0 0 20px;font-size:17px"><strong>Terminamos el trabajo en ${escapar(sitio)}.</strong></p>
${cerradas.length ? `<p style="margin:0 0 8px"><strong>Esto es lo que quedó cerrado:</strong></p>
<ul style="margin:0 0 24px;padding-left:20px">${cerradas.map(li).join('')}</ul>` : ''}
${comparable
    ? `<p style="margin:0 0 24px;padding:14px 16px;background:#f0fdf4;border-radius:8px;font-size:15px">
El chequeo que corrimos al principio sobre ${escapar(pedido.url_medida || sitio)} daba
<strong>${comparable.antes} de 100</strong>. Lo volvimos a correr sobre la misma página y ahora da
<strong>${comparable.despues}</strong>.</p>`
    : `<p style="margin:0 0 24px;padding:14px 16px;background:#f4f4f5;border-radius:8px;font-size:15px">
${escapar(SIN_NUMERO[situacion.caso])}</p>`}
${fuera.length ? `<p style="margin:0 0 8px"><strong>Esto queda fuera del kit</strong>, como estaba dicho desde antes de que pagaras:</p>
<ul style="margin:0 0 24px;padding-left:20px">${fuera.map(li).join('')}</ul>` : ''}
<p style="margin:0 0 12px"><strong>Dos cosas por hacer de tu lado:</strong></p>
<ol style="margin:0 0 24px;padding-left:20px">
<li style="margin-bottom:10px">El borrador de tu política lo tiene que revisar <strong>tu abogado</strong> antes de publicarlo como definitivo. Nosotros no damos asesoría legal y el texto final no es nuestro.</li>
<li>Ya puedes borrar el acceso que nos diste a tu sitio. Si no sabes dónde, escríbenos y te decimos.</li>
</ol>
<p style="margin:0 0 8px">Tu pedido, con el detalle de lo que incluía:</p>
<p style="margin:0 0 24px"><a href="${enlace}" style="color:#be185d;font-weight:600;word-break:break-all">${enlace}</a></p>
<p style="margin:0 0 24px">Si algo no te calza o quieres que revisemos una página distinta, responde este correo.</p>
<p style="margin:0;font-size:14px;color:#71717a">Verifica y Cumple · <a href="${BASE_SITIO}" style="color:#71717a">verifica.spindlelab.cl</a></p>
</div></body></html>`;

  return {
    from: REMITENTE,
    to: [pedido.correo],
    reply_to: RESPONDER_A,
    subject: `Tu sitio quedó listo · ${sitio}`,
    text: lineas.join('\n'),
    html,
  };
}

/**
 * Manda el correo de cierre. Igual que el de pago: devuelve true solo si Resend lo aceptó, y
 * nunca lanza. Un trabajo entregado no se deshace porque un correo no salió — pero quien
 * entrega TIENE que saberlo, así que el endpoint devuelve este resultado en su respuesta.
 */
export async function enviarCorreoDeEntrega(pedido, informeFinal, titulos, token, fetchImpl = fetch) {
  if (!pedido || !pedido.id || !pedido.correo) return false;
  token = typeof token === 'string' ? token.trim() : token;
  if (!token) {
    console.log('[correo] sin RESEND_API_KEY: no sale el correo de entrega');
    return false;
  }
  try {
    const r = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(correoDeEntrega(pedido, informeFinal, titulos)),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.log(`[correo] Resend contestó http-${r.status} al cerrar`);
      return false;
    }
    console.log(`[correo] entrega avisada: ${String(pedido.id).slice(0, 12)}…`);
    return true;
  } catch (e) {
    console.log(`[correo] no se pudo avisar la entrega: ${e && e.message}`);
    return false;
  }
}
