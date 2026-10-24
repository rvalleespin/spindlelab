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
