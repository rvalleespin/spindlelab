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

/*
 * De `etapas.js` y no de una copia local: lo que se le pide y lo que queda de su lado tiene que
 * ser LO MISMO en la pantalla del pedido y en este correo. Eran dos copias del mismo texto, y la
 * primera vez que tuvieron que decir cosas distintas —un comprador que nunca dio un acceso— las
 * dos se equivocaron igual, porque nadie las leía juntas.
 */
import {
  hayQueEntrarAlSitio, listaDeSenales, recordatoriosDeCierre, senalesContratadas, TITULOS,
} from './etapas.js';
import { VERSION_TERMINOS } from './pedidos.js';

export const REMITENTE = 'Verifica y Cumple <hola@envios.spindlelab.cl>';
// Las respuestas van a la casilla de verdad, que es donde Ramón las lee. El subdominio de envío
// no recibe correo, así que sin esto una respuesta se perdería.
export const RESPONDER_A = 'hola@spindlelab.cl';
export const BASE_SITIO = 'https://verifica.spindlelab.cl';

const PESOS = (n) => '$' + Number(n || 0).toLocaleString('es-CL');

export function enlaceDelPedido(id) {
  return `${BASE_SITIO}/pedido/?id=${encodeURIComponent(id)}`;
}

export const ENLACE_TERMINOS = `${BASE_SITIO}/terminos/`;

/** Una fecha ISO dicha como la diría una persona. Sin hora: en el cuerpo del correo estorba. */
function enCastellano(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (isNaN(d.getTime())) return '';
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${d.getUTCDate()} de ${meses[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ *
 * LA COPIA DEL CONTRATO QUE VIAJA EN EL CORREO
 *
 * ── POR QUÉ ESTO NO ES UN ADORNO LEGAL (3-nov-2026) ──────────────────────────────────────
 *
 * El artículo 12 A de la Ley 19.496 obliga a mandar, una vez perfeccionado el contrato, una
 * «confirmación escrita» que contenga «una copia íntegra, clara y legible del contrato». Y el
 * artículo 3° bis dice que cuando esa confirmación no se manda, el plazo para retractarse no
 * es de 10 días sino de 90.
 *
 * El correo que salía al confirmarse el pago decía el monto, daba el enlace del pedido y
 * explicaba los pasos siguientes. No decía qué se había comprado ni bajo qué condiciones. O
 * sea que TODA venta quedaba con una ventana de retracto nueve veces más larga de la que
 * corresponde, por una omisión de tres párrafos.
 *
 * ── Y POR QUÉ VA EN EL CUERPO Y NO SOLO COMO ENLACE ──────────────────────────────────────
 *
 * Un enlace apunta a la página de hoy, y la página de hoy puede no ser la que esa persona
 * aceptó: las condiciones mismas dicen que lo que le aplica es la versión vigente el día que
 * compró. «Copia íntegra» no se cumple con un puntero a algo que nosotros podemos editar
 * después. Lo que no puede cambiar es lo que ya está en su bandeja de entrada.
 *
 * El enlace va IGUAL, porque el resumen es un resumen: lo que está acá son las cláusulas de
 * las que depende lo que puede hacer (retractarse, pedir la devolución, reclamar), y el texto
 * completo está a un clic con su número de versión al lado.
 *
 * ⚠️ CADA CIFRA DE ESTA LISTA ESTÁ TAMBIÉN EN `public/terminos/index.html`, Y SON DOS COPIAS
 * DEL MISMO HECHO. Hay una prueba que busca en la página publicada cada número y cada nombre
 * que este resumen afirma: si alguien cambia el plazo de devolución en la página y no acá, se
 * pone roja. Es el mismo guardia que ya existe entre `VERSION_POLITICA` y la página de
 * privacidad.
 * ══════════════════════════════════════════════════════════════════════════════════════════ */

export const CONDICIONES_ESENCIALES = [
  ['Quién te vende',
    'SpindleLab SpA, RUT 78.474.925-8. «Verifica y Cumple» es el nombre del servicio, no de ' +
    'otra empresa.'],
  ['El precio',
    'Es un pago único y es el total: no hay cobros adicionales, ni mensualidades, ni ' +
    'recargos. La revisión trimestral es otro servicio y no va incluida.'],
  ['Puedes arrepentirte',
    'Tienes derecho a retracto: puedes poner término a este contrato sin explicar por qué, ' +
    'dentro de 10 días corridos desde que compraste y antes de que empiece la prestación del ' +
    'servicio. No lo excluimos, aunque la ley nos dejaría. Para ejercerlo basta con ' +
    'decírnoslo, y responder este correo sirve.'],
  ['Cuándo empieza el trabajo',
    'Empieza cuando te avisamos que empezó, no cuando nos ponemos a trabajar. Te lo avisamos ' +
    'por correo y queda anotado en la pantalla de tu pedido con su fecha. Mientras no te ' +
    'hayamos avisado, tu derecho a retracto sigue abierto.'],
  ['Si hay que devolver',
    'Te devolvemos el 100% si no puedes darnos el acceso a tu sitio, o si desistes antes de ' +
    'que lo hayamos tocado. Va a la misma tarjeta o cuenta con la que pagaste, dentro de los ' +
    '45 días siguientes a que nos avises.'],
  ['Lo que no incluye',
    'La revisión legal de tu caso, el HTTPS de tu hosting, y publicar tu política: el ' +
    'borrador te lo entregamos nosotros y lo publicas tú después de que lo revise tu abogado.'],
  ['Por cuánto respondemos',
    'Nos hacemos responsables del kit por 90 días corridos desde que te avisamos que quedó ' +
    'entregado. Eso es además de lo que te da la ley.'],
  ['Si algo sale mal',
    'Escríbenos primero, que es lo más rápido. No te obligamos a reclamar solo por ahí: ' +
    'puedes usar cualquier vía, incluido el SERNAC. Los derechos que te da la Ley 19.496 son ' +
    'irrenunciables.'],
];

/**
 * La frase que no se puede romper, escrita una sola vez.
 *
 * Aparece en el correo de pago, en el de cierre y en la pantalla del pedido. Es la decisión
 * del 2-nov y es lo que separa entregar un borrador de ejercer el derecho sin ser abogado.
 */
export const EL_BORRADOR_ES_BORRADOR =
  'Es un BORRADOR para que lo revise tu abogado. No está publicado, no lo publicamos ' +
  'nosotros y no es asesoría legal.';

/**
 * Qué se compró, dicho en castellano y sacado del contrato congelado del pedido.
 *
 * ⚠️ Por `senalesContratadas` y `listaDeSenales` y no por `pedido.senales_contratadas` a
 * secas: esas dos columnas llegan como arreglo cuando el pedido viene hidratado y como TEXTO
 * JSON cuando viene de la consulta de la cola, y un `.map` sobre un string revienta. Es la
 * misma trampa que ya costó un correo de cierre, y la forma de no volver a pisarla es no
 * tener un segundo lector.
 */
export function loQueSeCompro(pedido, titulos = TITULOS) {
  const nombrar = (id) => titulos[id] || id;
  return {
    incluidas: senalesContratadas(pedido).map(nombrar),
    fuera: listaDeSenales(pedido && pedido.senales_fuera).map(nombrar),
  };
}

/**
 * El mensaje. Se arma aparte de enviarlo para poder leerlo en una prueba sin tocar la red.
 *
 * Va en texto y en HTML. El texto no es un relleno: hay gente que lee en clientes que no
 * muestran HTML, y este correo lleva el único enlace que le permite volver a su pedido.
 */
export function correoDePago(pedido, titulos = TITULOS) {
  const enlace = enlaceDelPedido(pedido.id);
  const sitio = pedido.dominio || 'tu sitio';

  /* ── LOS PASOS QUE SIGUEN NO SON LOS MISMOS PARA TODOS (3-nov-2026) ──────────────────────
   *
   * Este correo anunciaba «dos pasos» y el segundo era un acceso temporal al sitio. Desde que
   * el kit también se le vende a quien solo le falta publicar su política, a ese comprador el
   * primer correo que recibe después de pagar le anuncia un trámite que no le corresponde, y
   * su pantalla —ya corregida— no se lo pide nunca. Dos versiones del mismo producto en el
   * mismo minuto.
   *
   * Y el rótulo ya no lleva el número escrito a mano. «Dos pasos» con una lista de uno es la
   * misma falla, más chica, esperando a que alguien agregue o saque un paso.
   */
  const pasos = [
    'Los datos de tu empresa (razón social, RUT, giro y dirección). Los necesitamos ' +
      'para armar el borrador de tu política, porque son los que la ley pide publicar.',
  ];
  if (hayQueEntrarAlSitio(pedido)) {
    pasos.push(
      'Un acceso temporal a tu sitio, con los permisos mínimos. Nunca te vamos a pedir ' +
        'tu contraseña. Si tu sitio lo administra otra persona, te damos el texto listo ' +
        'para reenviarle.',
    );
  }
  // Se dice en voz alta, y solo cuando es cierto: a quien compró el borrador le ahorra la
  // pregunta de cuándo le vamos a pedir la llave de su sitio.
  const sinAcceso = !hayQueEntrarAlSitio(pedido)
    ? 'No te vamos a pedir acceso a tu sitio: lo que compraste se redacta con esos datos.'
    : null;

  /* ── LA CONFIRMACIÓN ESCRITA (3-nov-2026) ─────────────────────────────────────────────
   *
   * Ver el bloque de `CONDICIONES_ESENCIALES`: sin esto, este correo no era la confirmación
   * que el artículo 12 A obliga a mandar, y cada venta quedaba con 90 días de retracto en
   * vez de 10. Lo que sigue es la copia del contrato: qué se compró, por cuánto, cuándo, y
   * bajo qué condiciones.
   *
   * La fecha es la del PAGO cuando la hay. Si el correo saliera por un camino donde todavía
   * no está escrita, se usa la de creación del pedido antes que inventar «hoy»: la fecha del
   * contrato es un dato del pedido, no del momento en que se arma el mensaje.
   */
  const comprado = loQueSeCompro(pedido, titulos);
  const fechaContrato = enCastellano(pedido.pagado_en || pedido.creado_en);

  const contratoTexto = [
    'LO QUE COMPRASTE',
    '',
    `  Sitio: ${sitio}`,
    ...(pedido.url_medida ? [`  Página que medimos: ${pedido.url_medida}`] : []),
    `  Total pagado: ${PESOS(pedido.monto_total)} (IVA incluido)`,
    ...(fechaContrato ? [`  Fecha: ${fechaContrato}`] : []),
    '',
    ...(comprado.incluidas.length
      ? ['  El kit cierra en tu sitio:', ...comprado.incluidas.map((t) => `    · ${t}`), '']
      : []),
    `  Y el borrador de tu política de privacidad, escrito con los datos de tu empresa. ${EL_BORRADOR_ES_BORRADOR}`,
    '',
    ...(comprado.fuera.length
      ? ['  Queda fuera del kit, y no está incluido en el precio:',
        ...comprado.fuera.map((t) => `    · ${t}`), '']
      : []),
    `LAS CONDICIONES DE ESTA VENTA (versión ${VERSION_TERMINOS})`,
    '',
    ...CONDICIONES_ESENCIALES.flatMap(([titulo, cuerpo]) => [`  ${titulo}. ${cuerpo}`, '']),
    'El texto completo, con su número de versión y su fecha, está acá:',
    ENLACE_TERMINOS,
    '',
    'Lo que te aplica a ti es la versión que estaba vigente el día que compraste, y es la que',
    'va resumida en este correo. Guárdalo: es la confirmación escrita que la ley nos obliga a',
    'mandarte.',
  ];

  const texto = [
    `Recibimos tu pago de ${PESOS(pedido.monto_total)} por el kit de ${sitio}.`,
    '',
    'Acá está tu pedido:',
    enlace,
    '',
    'Guarda este correo. Ese enlace es la forma de volver a tu pedido, y no hace falta',
    'ninguna cuenta ni contraseña.',
    '',
    `Lo que sigue, en esa misma página:`,
    '',
    ...pasos.flatMap((p, i) => [`${i + 1}. ${p}`, '']),
    ...(sinAcceso ? [sinAcceso, ''] : []),
    'Si algo no calza o tienes una duda, responde este correo y te contestamos.',
    '',
    '----------------------------------------------------------------------',
    '',
    ...contratoTexto,
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
<p style="margin:0 0 12px"><strong>Lo que sigue</strong>, en esa misma página:</p>
<ol style="margin:0 0 24px;padding-left:20px">
${pasos.map((p) => `<li style="margin-bottom:10px">${resaltar(p)}</li>`).join('')}
</ol>
${sinAcceso ? `<p style="margin:0 0 24px">${escapar(sinAcceso)}</p>` : ''}
<p style="margin:0 0 24px">Si algo no calza o tienes una duda, responde este correo y te contestamos.</p>

<hr style="border:0;border-top:1px solid #e4e4e7;margin:0 0 24px">

<p style="margin:0 0 12px"><strong>Lo que compraste</strong></p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;margin:0 0 16px">
<tr><td style="padding:5px 0;color:#71717a">Sitio</td><td style="padding:5px 0;text-align:right;font-weight:600">${escapar(sitio)}</td></tr>
${pedido.url_medida ? `<tr><td style="padding:5px 0;color:#71717a">Página que medimos</td><td style="padding:5px 0;text-align:right;font-weight:600">${escapar(pedido.url_medida)}</td></tr>` : ''}
<tr><td style="padding:5px 0;color:#71717a">Total pagado</td><td style="padding:5px 0;text-align:right;font-weight:600">${PESOS(pedido.monto_total)} (IVA incluido)</td></tr>
${fechaContrato ? `<tr><td style="padding:5px 0;color:#71717a">Fecha</td><td style="padding:5px 0;text-align:right;font-weight:600">${escapar(fechaContrato)}</td></tr>` : ''}
</table>
${comprado.incluidas.length ? `<p style="margin:0 0 6px;font-size:15px">El kit cierra en tu sitio:</p>
<ul style="margin:0 0 16px;padding-left:20px;font-size:15px">${comprado.incluidas.map((t) => `<li style="margin-bottom:5px">${escapar(t)}</li>`).join('')}</ul>` : ''}
<p style="margin:0 0 16px;font-size:15px">Y el borrador de tu política de privacidad, escrito con los datos de tu empresa. <strong>${escapar(EL_BORRADOR_ES_BORRADOR)}</strong></p>
${comprado.fuera.length ? `<p style="margin:0 0 6px;font-size:15px">Queda fuera del kit, y no está incluido en el precio:</p>
<ul style="margin:0 0 16px;padding-left:20px;font-size:15px;color:#52525b">${comprado.fuera.map((t) => `<li style="margin-bottom:5px">${escapar(t)}</li>`).join('')}</ul>` : ''}

<p style="margin:0 0 12px"><strong>Las condiciones de esta venta</strong> (versión ${escapar(VERSION_TERMINOS)})</p>
<dl style="margin:0 0 16px;font-size:15px">
${CONDICIONES_ESENCIALES.map(([titulo, cuerpo]) => `<dt style="margin:0 0 2px;font-weight:600">${escapar(titulo)}</dt><dd style="margin:0 0 12px">${escapar(cuerpo)}</dd>`).join('')}
</dl>
<p style="margin:0 0 8px;font-size:15px">El texto completo, con su número de versión y su fecha:</p>
<p style="margin:0 0 16px"><a href="${ENLACE_TERMINOS}" style="color:#be185d;font-weight:600;word-break:break-all">${ENLACE_TERMINOS}</a></p>
<p style="margin:0 0 24px;font-size:14.5px;color:#52525b">Lo que te aplica a ti es la versión que estaba vigente el día que compraste, y es la que va resumida en este correo. Guárdalo: es la confirmación escrita que la ley nos obliga a mandarte.</p>

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
 * La única frase de este correo que iba en negrita dentro de un paso.
 *
 * Los pasos ahora se arman en una lista (dejó de haber dos fijos), así que la negrita no puede
 * seguir escrita a mano en el HTML. Se aplica DESPUÉS de escapar, sobre el texto ya seguro: la
 * frase no tiene ningún carácter que el escape cambie, así que calza igual, y el `<strong>` es
 * nuestro, no de un dato de afuera.
 */
function resaltar(texto) {
  const frase = 'Nunca te vamos a pedir tu contraseña.';
  return escapar(texto).replace(frase, `<strong>${frase}</strong>`);
}

/**
 * EL ÚNICO LUGAR QUE LE HABLA A RESEND.
 *
 * ── POR QUÉ SE EXTRAJO (3-nov-2026) ───────────────────────────────────────────────────────
 *
 * Hoy los avisos internos se mudaron de Web3Forms a Resend, y con eso pasaron a ser el TERCER
 * usuario de esta misma petición. Escribir un segundo cliente habría dejado dos sitios con la
 * misma clave, el mismo tope de tiempo y dos ideas distintas de qué hacer cuando falla, que es
 * exactamente la divergencia que `aviso.js` acababa de desarmar entre sus tres copias.
 *
 * Devuelve el resultado en vez de registrarlo: cada quien dice lo suyo con su propia etiqueta
 * —el comprador no es lo mismo que una venta perdida— y el aviso interno necesita el CUERPO de
 * la respuesta para dejar un rastro que sirva. Leerlo acá, en el único lugar que tiene la
 * respuesta en la mano, es lo que hace que los tres lo tengan.
 *
 * NUNCA LANZA. Un pago que entró no se puede perder porque un correo no salió.
 *
 * @returns {{ok: boolean, codigo: string, cuerpo: string}}
 *   `codigo` es `http-<n>`, `sin-clave` o `sin-respuesta`.
 */
export async function mandarPorResend(mensaje, token, fetchImpl = fetch) {
  // El token se limpia, por lo mismo que el de Mercado Pago y el secreto de la firma: uno
  // pegado con un espacio al final se ve CARGADO en el panel y no sirve.
  token = typeof token === 'string' ? token.trim() : token;
  if (!token) return { ok: false, codigo: 'sin-clave', cuerpo: '' };
  try {
    const r = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(mensaje),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      // Leer el cuerpo es lo que convierte un código en un diagnóstico. Y no puede ser lo que
      // rompa el rastro: si no se puede leer, se deja dicho eso y el resultado sale igual.
      let cuerpo = '';
      try { cuerpo = await r.text(); }
      catch (e) { cuerpo = `(no se pudo leer la respuesta: ${e && e.message})`; }
      return { ok: false, codigo: `http-${r.status}`, cuerpo };
    }
    return { ok: true, codigo: `http-${r.status}`, cuerpo: '' };
  } catch (e) {
    // Sin respuesta no hay código HTTP: por acá entran el corte de tiempo y la conexión caída.
    return { ok: false, codigo: 'sin-respuesta', cuerpo: (e && e.message) || String(e) };
  }
}

/**
 * Manda el correo. Devuelve true solo si Resend lo aceptó, y nunca lanza.
 */
export async function enviarCorreoDePago(pedido, token, fetchImpl = fetch) {
  if (!pedido || !pedido.id || !pedido.correo) return false;
  const r = await mandarPorResend(correoDePago(pedido), token, fetchImpl);
  if (!r.ok) {
    if (r.codigo === 'sin-clave') console.log('[correo] sin RESEND_API_KEY: no se manda nada');
    else console.log(`[correo] Resend contestó ${r.codigo}: ${r.cuerpo || '(respuesta vacía)'}`);
    return false;
  }
  console.log(`[correo] enviado el pedido ${String(pedido.id).slice(0, 12)}…`);
  return true;
}

/* ══════════════════════════════════════════════════════════════════════════════════════════ *
 * EL CORREO QUE AVISA QUE EL TRABAJO EMPEZÓ
 *
 * ── POR QUÉ FALTABA, Y QUÉ COSTABA (3-nov-2026) ──────────────────────────────────────────
 *
 * El artículo 5 del Decreto 52 de 2024 del Ministerio de Economía, vigente desde feb-2025,
 * dice que en los servicios contratados a distancia «se entenderá que la prestación del
 * servicio se inició desde el momento en que el proveedor notifique esta circunstancia al
 * consumidor, mediante la comunicación a distancia a través de la cual se produjo la
 * contratación o bien, a través del medio que el consumidor designe».
 *
 * O sea: la ventana de retracto sigue abierta mientras no se avise, por mucho que el trabajo
 * esté hecho. Nadie avisaba nunca. El producto se enteraba del acceso, lo anotaba, mandaba un
 * aviso interno a la casilla del negocio, y al comprador no le decía nada: para él su pedido
 * cambiaba de frase en una pantalla que puede no volver a abrir.
 *
 * ── EL MOMENTO EXACTO NO ES EL MISMO PARA TODOS ──────────────────────────────────────────
 *
 * Lo decide `yaEmpezoElTrabajo` en `etapas.js`, que es el único lugar donde está escrito en
 * qué instante un pedido pasa a estar en nuestras manos: cuando el cliente declara el acceso,
 * o cuando el que compró solo el borrador manda los datos de su empresa. Acá no se vuelve a
 * preguntar: este archivo escribe el mensaje, no decide cuándo sale.
 *
 * ── Y SE MANDA ANTES DE ANOTARLO ─────────────────────────────────────────────────────────
 *
 * El orden importa y es a propósito: primero sale el correo, y la fecha se escribe solo si
 * Resend lo aceptó. Al revés —anotar y después mandar— un correo que falla deja escrito que
 * avisamos cuando no avisamos, y eso le recorta el plazo de retracto a alguien que nunca se
 * enteró. Es exactamente lo que el Decreto viene a impedir.
 *
 * El costo de este orden, dicho: si dos envíos simultáneos entran por acá, los dos mandan el
 * correo y la persona recibe el aviso dos veces. Molesta y no le quita nada; la fecha que
 * queda es la primera que se escribe (ver el `IS NULL` de `marcarInicioAvisado`), que es la
 * más temprana de las dos y la que le conviene a ella.
 * ══════════════════════════════════════════════════════════════════════════════════════════ */

/**
 * El aviso de inicio. Puro, como los otros dos, para poder leerlo sin tocar la red.
 *
 * @param {object} pedido  el pedido ya en curso o redactando
 * @param {string} cuando  la fecha ISO del aviso, que es la que se va a anotar
 */
export function correoDeInicio(pedido, cuando = null) {
  const enlace = enlaceDelPedido(pedido.id);
  const sitio = pedido.dominio || 'tu sitio';
  const enSuSitio = hayQueEntrarAlSitio(pedido);
  const fecha = enCastellano(cuando);

  // ⚠️ No dice «empezamos a trabajar en tu sitio» cuando no vamos a tocar su sitio. Al que
  // compró solo el borrador se le redacta un texto, y afirmarle un trabajo sobre su sitio es
  // la misma clase de falsedad que el correo de cierre ya tuvo que corregir dos veces.
  const queEmpezo = enSuSitio
    ? `Empezamos a trabajar en ${sitio}.`
    : `Empezamos a redactar el borrador de tu política de privacidad para ${sitio}.`;

  // Lo que este correo le CAMBIA a la persona, dicho sin adornos. Un aviso legal que no
  // explica qué consecuencia tiene es un trámite; lo que la ley protege es que se entere.
  const porQue = 'Te lo avisamos porque es el aviso del que depende tu derecho a ' +
    'retractarte: la ley entiende que el servicio empieza cuando te lo decimos, no cuando ' +
    'nos ponemos a trabajar. Hasta este correo podías poner término al contrato sin ' +
    'explicar por qué.';
  const siQuiereParar = 'Si de todas formas quieres parar, escríbenos: te decimos por ' +
    'escrito qué parte se devuelve y qué parte no, y por qué, antes de hacer nada.';

  const lineas = [
    queEmpezo,
    '',
    ...(fecha ? [`Queda anotado con esta fecha: ${fecha}.`, ''] : []),
    porQue,
    '',
    siQuiereParar,
    '',
    enSuSitio
      ? 'Cuando terminemos te mandamos el cierre, con el detalle de lo que quedó hecho y el ' +
        'borrador de tu política.'
      : 'Cuando esté listo te mandamos el borrador por correo, y además queda en la pantalla ' +
        'de tu pedido para que lo copies.',
    '',
    'Tu pedido, con el detalle de lo que incluía:',
    enlace,
    '',
    'Las condiciones de venta, por si quieres releerlas:',
    ENLACE_TERMINOS,
    '',
    'Verifica y Cumple',
    BASE_SITIO,
  ];

  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;line-height:1.6">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
<p style="margin:0 0 20px;font-size:17px"><strong>${escapar(queEmpezo)}</strong></p>
${fecha ? `<p style="margin:0 0 20px;padding:14px 16px;background:#fdf2f8;border-radius:8px;font-size:15px">Queda anotado con esta fecha: <strong>${escapar(fecha)}</strong>.</p>` : ''}
<p style="margin:0 0 16px">${escapar(porQue)}</p>
<p style="margin:0 0 20px">${escapar(siQuiereParar)}</p>
<p style="margin:0 0 20px">${escapar(enSuSitio
    ? 'Cuando terminemos te mandamos el cierre, con el detalle de lo que quedó hecho y el borrador de tu política.'
    : 'Cuando esté listo te mandamos el borrador por correo, y además queda en la pantalla de tu pedido para que lo copies.')}</p>
<p style="margin:0 0 8px">Tu pedido, con el detalle de lo que incluía:</p>
<p style="margin:0 0 20px"><a href="${enlace}" style="color:#be185d;font-weight:600;word-break:break-all">${enlace}</a></p>
<p style="margin:0 0 24px;font-size:14.5px;color:#52525b">Las condiciones de venta, por si quieres releerlas: <a href="${ENLACE_TERMINOS}" style="color:#52525b">verifica.spindlelab.cl/terminos/</a></p>
<p style="margin:0;font-size:14px;color:#71717a">Verifica y Cumple · <a href="${BASE_SITIO}" style="color:#71717a">verifica.spindlelab.cl</a></p>
</div></body></html>`;

  return {
    from: REMITENTE,
    to: [pedido.correo],
    reply_to: RESPONDER_A,
    subject: `Empezamos tu pedido · ${sitio}`,
    text: lineas.join('\n'),
    html,
  };
}

/**
 * Manda el aviso de inicio. Igual que los otros: true solo si Resend lo aceptó, y nunca lanza.
 *
 * Quien llama NO puede anotar la fecha si esto devuelve false: ver el bloque de arriba. Una
 * fecha sin correo detrás es una constancia falsa en contra del comprador.
 */
export async function enviarCorreoDeInicio(pedido, cuando, token, fetchImpl = fetch) {
  if (!pedido || !pedido.id || !pedido.correo) return false;
  const r = await mandarPorResend(correoDeInicio(pedido, cuando), token, fetchImpl);
  if (!r.ok) {
    if (r.codigo === 'sin-clave') console.log('[correo] sin RESEND_API_KEY: no sale el aviso de inicio');
    else console.log(`[correo] Resend contestó ${r.codigo} al avisar el inicio: ${r.cuerpo || '(respuesta vacía)'}`);
    return false;
  }
  console.log(`[correo] inicio avisado: ${String(pedido.id).slice(0, 12)}…`);
  return true;
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
  // ⚠️ Por el lector compartido y no por `|| []`: estas dos columnas viajan como texto JSON en
  // la fila cruda de la base, y `.map` sobre un string revienta con un TypeError. Hoy quien
  // llama siempre hidrata, así que no había defecto a la vista; lo encontró una prueba que
  // compuso este correo desde la fila cruda, y el síntoma no es un correo feo: es que el
  // `await` del endpoint de entrega lanza DESPUÉS de haber marcado el pedido como entregado.
  const cerradas = senalesContratadas(pedido).map(nombrar);
  const fuera = listaDeSenales(pedido.senales_fuera).map(nombrar);

  const lineas = [
    `Terminamos el trabajo en ${sitio}.`,
    '',
  ];

  /* ⚠️ QUÉ SIGNIFICA «cerrado» CUANDO LO CERRADO ES LA POLÍTICA (3-nov-2026).
   *
   * El título de la señal es «Enlace a tu política de privacidad», y debajo de «esto es lo que
   * quedó cerrado» se lee como si nosotros la hubiéramos publicado. No la publicamos, y dos
   * párrafos más abajo el mismo correo muestra un puntaje que la sigue marcando pendiente: el
   * cliente se encuentra con la contradicción antes que con la explicación.
   *
   * La pantalla del pedido ya tenía esta nota desde que `politica` entró al kit (2-nov). El
   * correo no, y es el mismo hecho dicho a la misma persona: se dice igual en los dos lados.
   */
  const incluyePolitica = senalesContratadas(pedido).includes('politica');
  const NOTA_POLITICA = 'De la política te entregamos el borrador, armado con los datos de tu ' +
    'empresa y con lo que la ley pide publicar: la revisa tu abogado y la publicas tú.';

  if (cerradas.length) {
    lineas.push('Esto es lo que quedó cerrado:', '');
    cerradas.forEach((t) => lineas.push(`  · ${t}`));
    lineas.push('');
    if (incluyePolitica) lineas.push(NOTA_POLITICA, '');
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

  /* ── LO QUE QUEDA DE SU LADO SALE DE `etapas.js`, NO DE ACÁ (3-nov-2026) ─────────────────
   *
   * Estaban escritas dos veces, con el mismo texto copiado: acá y en los `recordatorios` de la
   * etapa `entregado`. Mientras las dos decían lo mismo, la duplicación no molestaba. Dejó de
   * decirlo el día que el kit pasó a venderse a quien solo le falta publicar su política: a ese
   * comprador nunca le pedimos un acceso, y las dos copias le decían que borrara uno.
   *
   * Y el rótulo dejó de llevar el número. «Dos cosas» es el largo de una lista escrito a mano
   * en otro lugar; la pantalla ya había aprendido lo mismo con este mismo recuadro.
   */
  /* ── EL BORRADOR, QUE NO TENÍA NINGÚN CAMINO HASTA EL CLIENTE (3-nov-2026) ───────────────
   *
   * Era el hueco más grande del tramo: el documento central del kit. Este correo decía qué
   * quedó cerrado y el antes y el después, la pantalla afirmaba que el trabajo estaba
   * entregado, y el texto por el que la persona pagó no salía por ninguna parte. No había
   * adjunto, no había columna, no había nada.
   *
   * Va como TEXTO, en el cuerpo, porque una política de privacidad es prosa: no hace falta un
   * adjunto ni un almacenamiento de archivos, y un adjunto además se pierde al reenviar el
   * correo o lo come un filtro. Lo mismo viaja a la pantalla del pedido, que es el camino que
   * no depende de que este correo salga.
   *
   * ⚠️ LA ADVERTENCIA VA ANTES Y DESPUÉS. No es insistencia: el que copie el texto va a
   * seleccionar desde donde empieza, y si la única advertencia estuviera arriba se quedaría
   * fuera de lo que pega en su sitio. Es la decisión del 2-nov y es lo que separa entregar un
   * borrador de ejercer el derecho sin ser abogado.
   */
  const borrador = typeof pedido.borrador_politica === 'string'
    ? pedido.borrador_politica.trim() : '';
  const SIN_BORRADOR = 'El borrador de tu política no va en este correo. Escríbenos con el ' +
    'enlace de tu pedido y te lo mandamos: está incluido en lo que compraste.';

  if (borrador) {
    lineas.push(
      'EL BORRADOR DE TU POLÍTICA DE PRIVACIDAD',
      '',
      EL_BORRADOR_ES_BORRADOR,
      '',
      'También lo tienes en la pantalla de tu pedido, con un botón para copiarlo.',
      '',
      '--- empieza el borrador ---',
      '',
      borrador,
      '',
      '--- termina el borrador ---',
      '',
      EL_BORRADOR_ES_BORRADOR,
      '',
    );
  } else {
    lineas.push(SIN_BORRADOR, '');
  }

  const quedaDeTuLado = recordatoriosDeCierre(pedido);
  lineas.push(
    'Lo que queda de tu lado:',
    '',
    ...quedaDeTuLado.flatMap((t, i) => [`${i + 1}. ${t}`, '']),
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
<ul style="margin:0 0 ${incluyePolitica ? '10px' : '24px'};padding-left:20px">${cerradas.map(li).join('')}</ul>
${incluyePolitica ? `<p style="margin:0 0 24px;font-size:14.5px;color:#52525b">${escapar(NOTA_POLITICA)}</p>` : ''}` : ''}
${comparable
    ? `<p style="margin:0 0 24px;padding:14px 16px;background:#f0fdf4;border-radius:8px;font-size:15px">
El chequeo que corrimos al principio sobre ${escapar(pedido.url_medida || sitio)} daba
<strong>${comparable.antes} de 100</strong>. Lo volvimos a correr sobre la misma página y ahora da
<strong>${comparable.despues}</strong>.</p>`
    : `<p style="margin:0 0 24px;padding:14px 16px;background:#f4f4f5;border-radius:8px;font-size:15px">
${escapar(SIN_NUMERO[situacion.caso])}</p>`}
${fuera.length ? `<p style="margin:0 0 8px"><strong>Esto queda fuera del kit</strong>, como estaba dicho desde antes de que pagaras:</p>
<ul style="margin:0 0 24px;padding-left:20px">${fuera.map(li).join('')}</ul>` : ''}
${borrador ? `<p style="margin:0 0 8px"><strong>El borrador de tu política de privacidad</strong></p>
<p style="margin:0 0 12px;padding:14px 16px;background:#fef3c7;border-radius:8px;font-size:15px"><strong>${escapar(EL_BORRADOR_ES_BORRADOR)}</strong></p>
<p style="margin:0 0 12px;font-size:14.5px;color:#52525b">También lo tienes en la pantalla de tu pedido, con un botón para copiarlo.</p>
<pre style="margin:0 0 12px;padding:16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;white-space:pre-wrap;word-wrap:break-word;font-family:inherit;font-size:14.5px">${escapar(borrador)}</pre>
<p style="margin:0 0 24px;padding:14px 16px;background:#fef3c7;border-radius:8px;font-size:15px"><strong>${escapar(EL_BORRADOR_ES_BORRADOR)}</strong></p>`
    : `<p style="margin:0 0 24px;padding:14px 16px;background:#f4f4f5;border-radius:8px;font-size:15px">${escapar(SIN_BORRADOR)}</p>`}
<p style="margin:0 0 12px"><strong>Lo que queda de tu lado:</strong></p>
<ol style="margin:0 0 24px;padding-left:20px">${quedaDeTuLado.map(li).join('')}</ol>
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
  const r = await mandarPorResend(correoDeEntrega(pedido, informeFinal, titulos), token, fetchImpl);
  if (!r.ok) {
    if (r.codigo === 'sin-clave') console.log('[correo] sin RESEND_API_KEY: no sale el correo de entrega');
    else console.log(`[correo] Resend contestó ${r.codigo} al cerrar: ${r.cuerpo || '(respuesta vacía)'}`);
    return false;
  }
  console.log(`[correo] entrega avisada: ${String(pedido.id).slice(0, 12)}…`);
  return true;
}
