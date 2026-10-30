/**
 * Flow — el adaptador del medio de pago.
 *
 * ── POR QUÉ EXISTE (29-oct-2026) ────────────────────────────────────────────────────────
 *
 * Mercado Pago bloqueó la creación de órdenes en producción con un 403 del PolicyAgent y, al
 * pedirles un plazo, contestaron por escrito que **no tienen uno que sirva para tomar una
 * decisión operativa**. Eso es un «no nos esperen». Flow pasa a ser el medio de pago.
 *
 * Lo que NO cambia: la base de pedidos, los estados, el contrato congelado, la pantalla del
 * pedido, el correo al comprador, el aviso de venta y el rescate. Todo eso ya está probado y
 * no depende de quién cobre. Lo único que se reemplaza es abrir el pago y confirmarlo.
 *
 * ── EL MODELO DE SEGURIDAD, QUE ES EL MISMO QUE YA TENÍAMOS ──────────────────────────────
 *
 * Flow avisa el resultado haciendo POST a `urlConfirmation` con UN token y nada más. Con ese
 * token hay que llamar a `payment/getStatus` para saber qué pasó. O sea: **no se le cree al
 * cuerpo de la notificación, se vuelve a preguntar**. Es exactamente la disciplina que ya
 * aplicamos con Mercado Pago, y por eso el webhook se puede reusar casi entero.
 *
 * Fuente: https://www.flow.cl/docs/api.html — leída el 29-oct-2026 antes de escribir una línea.
 */

import { ESTADOS } from './pedidos.js';

/** Dónde vive la API. El sandbox no mueve plata; producción sí. */
export const BASE_SANDBOX = 'https://sandbox.flow.cl/api';
export const BASE_PRODUCCION = 'https://www.flow.cl/api';

/**
 * Las credenciales y el entorno, derivados del env UNA sola vez.
 *
 * ⚠️ **El valor por defecto es sandbox, y esa dirección está elegida.** Si el día de mañana se
 * despliega a producción y alguien olvida poner `FLOW_ENTORNO`, lo que pasa es que nadie puede
 * pagar: ruidoso, gratis y reversible. Al revés —producción por defecto— un error de
 * configuración en una prueba cobraría de verdad.
 *
 * Y se deriva en un solo lugar a propósito: el entorno y la base son el MISMO hecho, y dos
 * constantes del mismo hecho se contradicen en silencio.
 */
export function credencialesFlow(env) {
  const produccion = String((env && env.FLOW_ENTORNO) || '').trim().toLowerCase() === 'produccion';
  return {
    apiKey: env && env.FLOW_API_KEY,
    secretKey: env && env.FLOW_SECRET_KEY,
    base: produccion ? BASE_PRODUCCION : BASE_SANDBOX,
    produccion,
  };
}

/** `9` significa «todos los medios de pago» en el parámetro `paymentMethod`. */
export const TODOS_LOS_MEDIOS = 9;

/** Cuánto esperamos la respuesta de Flow. Mismo criterio que con el otro proveedor: una
 *  conexión colgada no rechaza sola, y hay una persona mirando la pantalla. */
const MS_ESPERA = 10000;

/**
 * Firma los parámetros con la secretKey.
 *
 * La receta de Flow, textual: se firman todos los parámetros MENOS `s`, ordenados de forma
 * alfabética ascendente por nombre, concatenados como `nombrevalornombrevalor` SIN separador
 * ninguno, y el resultado es un HMAC-SHA256 en hexadecimal.
 *
 * ⚠️ El `sort()` de JavaScript ordena por unidad de código UTF-16. Para los nombres de
 * parámetro que usa Flow —todos ASCII en minúsculas y camelCase— eso coincide con el orden
 * alfabético que espera su `sort()` de PHP. Si algún día aparece un parámetro con tilde o con
 * mayúscula inicial, este supuesto deja de ser cierto y la firma empieza a fallar sin que el
 * código cambie.
 */
export async function firmarFlow(params, secretKey) {
  const limpio = typeof secretKey === 'string' ? secretKey.trim() : secretKey;
  if (!limpio) throw new Error('No se puede firmar sin la secretKey de Flow');
  const cadena = Object.keys(params)
    .filter((k) => k !== 's' && params[k] !== undefined && params[k] !== null)
    .sort()
    .map((k) => k + params[k])
    .join('');
  const clave = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(limpio),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const firma = await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(cadena));
  return [...new Uint8Array(firma)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Crea el pago y devuelve a dónde hay que mandar a la persona.
 *
 * Flow responde con `url` y `token`, y la dirección final se arma concatenando:
 * `url + "?token=" + token`. Eso lo dice su documentación y no es intuitivo — no viene una
 * URL lista para usar.
 *
 * `timeout` es en SEGUNDOS y reemplaza exactamente la vigencia de 24 horas que ya teníamos:
 * sin él, una orden impaga queda pagable para siempre, y dos órdenes vivas por el mismo kit
 * es cobrar dos veces.
 */
export async function crearPagoFlow({ idPedido, correo, monto, titulo, urls, timeoutSegundos },
  { apiKey, secretKey, base }, fetchImpl = fetch) {
  if (!apiKey || !secretKey) return { ok: false, error: 'sin-credenciales' };
  if (!idPedido) return { ok: false, error: 'sin-id' };
  if (!correo) return { ok: false, error: 'sin-correo' };
  if (!Number.isInteger(monto) || monto <= 0) return { ok: false, error: `monto-invalido:${monto}` };

  const params = {
    apiKey: String(apiKey).trim(),
    // NUESTRO id de pedido. Es el equivalente de `external_reference`: lo que nos permite
    // reconocer de quién es el pago cuando Flow avise.
    commerceOrder: idPedido,
    subject: String(titulo).slice(0, 255),
    currency: 'CLP',
    amount: monto,
    email: correo,
    paymentMethod: TODOS_LOS_MEDIOS,
    urlConfirmation: urls.confirmacion,
    urlReturn: urls.vuelta,
  };
  if (timeoutSegundos) params.timeout = timeoutSegundos;

  let r;
  try {
    params.s = await firmarFlow(params, secretKey);
    r = await fetchImpl(`${base}/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params).toString(),
      signal: AbortSignal.timeout(MS_ESPERA),
    });
  } catch (e) {
    return { ok: false, error: `red: ${e && e.message}` };
  }

  let cuerpo = null;
  try { cuerpo = await r.json(); } catch {}
  if (!r.ok) {
    return {
      ok: false, estadoHttp: r.status, error: `http-${r.status}`, detalleFlow: cuerpo,
      // El mismo motivo que con el otro proveedor: cuando una API ajena rechaza algo, su
      // identificador de petición es lo único que les permite encontrar su propio registro.
      requestId: (r.headers && typeof r.headers.get === 'function'
        && (r.headers.get('x-request-id') || r.headers.get('X-Request-Id'))) || null,
    };
  }
  if (!cuerpo || !cuerpo.url || !cuerpo.token) {
    // Sin estos dos no hay a dónde mandar a la persona. El pago PUEDE haber quedado creado del
    // otro lado, así que esto no es «no pasó nada» y se informa aparte.
    return { ok: false, error: 'sin-url-ni-token', detalleFlow: cuerpo };
  }
  return {
    ok: true,
    token: cuerpo.token,
    flowOrder: cuerpo.flowOrder || null,
    destino: `${cuerpo.url}?token=${encodeURIComponent(cuerpo.token)}`,
  };
}

/**
 * Pregunta por el estado de un pago. Es lo que se llama al recibir la notificación.
 *
 * Es un GET con los parámetros en la URL, firmados igual que los del POST.
 */
export async function leerPagoFlow(token, { apiKey, secretKey, base }, fetchImpl = fetch) {
  if (!apiKey || !secretKey) return { ok: false, error: 'sin-credenciales' };
  if (!token) return { ok: false, error: 'sin-token' };
  const params = { apiKey: String(apiKey).trim(), token };
  let r;
  try {
    params.s = await firmarFlow(params, secretKey);
    r = await fetchImpl(`${base}/payment/getStatus?${new URLSearchParams(params).toString()}`, {
      method: 'GET',
      signal: AbortSignal.timeout(MS_ESPERA),
    });
  } catch (e) {
    return { ok: false, error: `red: ${e && e.message}` };
  }
  let pago = null;
  try { pago = await r.json(); } catch {}
  if (!r.ok) return { ok: false, estadoHttp: r.status, error: `http-${r.status}`, detalleFlow: pago };
  if (!pago || typeof pago !== 'object') return { ok: false, error: 'json-invalido' };
  return { ok: true, pago };
}

/**
 * EL MAPA DE ESTADOS, LLENADO CON PAGOS REALES (29-oct-2026, sandbox).
 *
 * `payment/getStatus` devuelve un campo `status` con un número y **Flow no documenta qué
 * significa cada uno** en su referencia pública. Adivinarlo falla en las dos direcciones: dar
 * por pagado un rechazo regala el kit, y no reconocer un pago deja al comprador mirando una
 * pantalla que no avanza.
 *
 * Así que no se adivinó. Cada número de acá abajo tiene un pago detrás, hecho en el sandbox y
 * leído con la sonda (`herramientas/sonda-flow.mjs`):
 *
 *   1 · `sonda_bf5b5af5…` recién creado, sin tocar → `paymentData` entero en `null`.
 *       Es «existe y nadie pagó».
 *   2 · el mismo pago, después de pagarlo → `paymentData.date "2026-10-29 22:38:02"`,
 *       `media "Webpay"`, `amount "1000.00"`, `fee "32.00"`, `balance 962`.
 *       **Observado dos veces**, en dos pagos distintos.
 *   3 · `sonda_…` rechazado a propósito en el simulador → `paymentData` entero en `null`.
 *
 * ⚠️ **El 4 NO está, y es a propósito.** Flow tiene al menos un estado más que no se observó
 * acá. Escribirlo «porque seguro significa anulada» sería exactamente la suposición que este
 * mapa existe para evitar. Mientras no esté, un 4 cae en «revisar» y alguien lo mira: molesto,
 * pero nunca entrega un kit que no se pagó ni cierra una venta que sí.
 *
 * Para agregar uno: provocarlo en el sandbox, leerlo con la sonda, y escribirlo con su
 * evidencia. Un número por vez.
 *
 * El valor es el estado DESTINO del pedido, o `null` cuando no hay que moverlo — misma forma
 * que `MAPA_ORDEN` en `cobro.js`, para que el webhook no tenga que aprender dos contratos.
 */
export const ESTADOS_FLOW = {
  1: null,                   // pendiente: el pedido se queda como está
  2: ESTADOS.PAGADO,
  3: ESTADOS.RECHAZADO,
};

/** Qué decirle a quien lea el registro, por número. */
const TEXTO_FLOW = {
  1: 'Flow todavía no recibe el pago.',
  2: 'Flow confirma el pago.',
  3: 'Flow rechazó el pago.',
};

/** Las acciones, con los mismos nombres que ya usa el webhook. */
export const ACCIONES_FLOW = { MARCAR: 'marcar', REVISAR: 'revisar', NADA: 'nada', IGNORAR: 'ignorar' };

/** Un monto de Flow puede venir como número o como string. Se compara en enteros o no se compara. */
function montoDe(v) {
  if (typeof v === 'number' && Number.isFinite(v)) return Math.round(v);
  if (typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v))) return Math.round(Number(v));
  return null;
}

/**
 * Decide qué hacer con un pedido a partir de lo que Flow dice del pago.
 *
 * Las comprobaciones son las mismas que ya aprendimos a hacer con el otro proveedor, y cada
 * una está acá porque allá hizo falta:
 *   1. Que el pago sea de ESTE pedido (`commerceOrder`), no de otro.
 *   2. Que el monto calce EXACTO con lo que se vendió.
 *   3. Que el estado sea uno que conocemos. Lo que no reconocemos, se mira a mano.
 */
export function decidirDesdeFlow({ pedido, pago }) {
  if (!pedido) {
    return {
      accion: ACCIONES_FLOW.IGNORAR, estado: null, motivo: 'pedido-desconocido',
      detalle: 'La notificación no corresponde a ningún pedido nuestro.',
    };
  }
  if (!pago || typeof pago !== 'object') {
    return {
      accion: ACCIONES_FLOW.REVISAR, estado: null, motivo: 'sin-pago',
      detalle: 'No se pudo releer el pago contra la API de Flow. No se toca el pedido.',
    };
  }
  if (pago.commerceOrder !== pedido.id) {
    return {
      accion: ACCIONES_FLOW.REVISAR, estado: null, motivo: 'referencia-no-calza',
      detalle: `El pago dice ser del pedido ${pago.commerceOrder} y se buscó ${pedido.id}.`,
    };
  }
  const monto = montoDe(pago.amount);
  if (monto === null || monto !== Math.round(Number(pedido.monto_total))) {
    return {
      accion: ACCIONES_FLOW.REVISAR, estado: null, motivo: 'monto-no-calza',
      detalle: `Se vendió en ${pedido.monto_total} y el pago dice ${pago.amount}.`,
    };
  }

  const n = pago.status;
  if (!(n in ESTADOS_FLOW)) {
    return {
      accion: ACCIONES_FLOW.REVISAR, estado: null, motivo: 'estado-sin-confirmar',
      detalle: `Flow devolvió el estado ${n}, que no hemos observado en un pago real. El pedido ` +
        `NO se mueve hasta que alguien lo mire. Ver ESTADOS_FLOW en flow.js.`,
    };
  }

  const destino = ESTADOS_FLOW[n];
  if (destino === null) {
    // Existe y nadie pagó. No es un fallo ni hay nada que hacer: es el estado normal entre que
    // se abre el pago y la persona vuelve. Se devuelve el estado ACTUAL del pedido para que
    // quien llame no tenga que decidir si eso significa «no lo muevas».
    return {
      accion: ACCIONES_FLOW.NADA, estado: pedido.estado, motivo: `flow-${n}`, detalle: TEXTO_FLOW[n],
    };
  }

  // ── EL PAGO PARCIAL, QUE ES EL QUE CUESTA PLATA ────────────────────────────────────────
  //
  // Un estado «pagado» dice QUE se pagó, no CUÁNTO entró. Con el otro proveedor eso ya fue un
  // hallazgo real: un reembolso parcial dejaba el pedido en `pagado` y el kit se entregaba
  // igual, con parte de la plata devuelta.
  //
  // La condición es MENOR, no DISTINTO, y la diferencia no es cosmética: en cuotas lo
  // acreditado puede superar el precio, y comparar por igualdad frenaría la mayoría de las
  // ventas chilenas, que es la forma más cara de equivocarse en este archivo.
  //
  // Si el campo no viene, se sigue. Misma decisión que `DETALLES_PAGO_LIMPIO` en `cobro.js`:
  // lo ausente no acusa, lo legible y malo sí. Solo vimos `paymentData.amount` en UN pago
  // observado, y exigirlo siempre convertiría cualquier variación del proveedor en ventas
  // cobradas y sin marcar.
  if (destino === ESTADOS.PAGADO) {
    const acreditado = montoDe(pago.paymentData && pago.paymentData.amount);
    if (acreditado !== null && acreditado < monto) {
      return {
        accion: ACCIONES_FLOW.REVISAR, estado: null, motivo: 'pagado-no-alcanza',
        detalle: `Flow dice pagado, pero lo acreditado (${pago.paymentData.amount}) es menor que ` +
          `los ${monto} que se vendieron. No se entrega sin mirarlo.`,
      };
    }
  }

  return { accion: ACCIONES_FLOW.MARCAR, estado: destino, motivo: `flow-${n}`, detalle: TEXTO_FLOW[n] };
}
