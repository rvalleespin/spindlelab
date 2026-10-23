/**
 * Verificar que una notificación viene de verdad de Mercado Pago.
 *
 * Es la pieza más delicada de todo el cobro: si esto se verifica mal, cualquiera puede mandar
 * una petición a nuestro webhook y marcar un pedido como pagado. Por eso está escrita como
 * funciones puras y probada contra un vector conocido, y por eso lleva tantos comentarios.
 *
 * TODO LO DE ACÁ SALE DE LA DOCUMENTACIÓN OFICIAL, LEÍDA EL 23-OCT-2026, no de memoria:
 *   developers de Mercado Pago, «Notificaciones / Webhooks» (mercadopago.cl, es)
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * LO QUE HAY QUE SABER ANTES DE TOCAR ESTO
 *
 * 1. LA FIRMA NO CUBRE EL CUERPO. El manifiesto solo incluye tres cosas: `data.id` (que llega
 *    en los query params), la cabecera `x-request-id` y el `ts` de la propia firma. El JSON
 *    del body NO entra en el cálculo.
 *
 *    Consecuencia directa, y es la que importa: una firma válida prueba el ORIGEN y el ID del
 *    recurso, pero NO prueba su contenido. El `status` que viene en el body no está
 *    autenticado. Para dar un pedido por pagado hay que RELEER el pago contra la API de
 *    Mercado Pago con ese id y nuestro access token. Nunca confiar en lo que dice el body.
 *
 *    ⚠️ Esto es una derivación del template, no una frase de la doc. La doc no lo advierte.
 *
 * 2. EL EJEMPLO OFICIAL EN JAVASCRIPT TIENE UN FALLO QUE NO HAY QUE COPIAR. Hace
 *    `crypto.timingSafeEqual(Buffer.from(calculado), Buffer.from(hash))`, y esa llamada LANZA
 *    si los dos tienen distinto largo; `Buffer.from(undefined)` también lanza. O sea que una
 *    notificación sin `v1`, o con un `v1` truncado, no devuelve 401 sino un error 500 sin
 *    capturar. Acá se valida la FORMA antes de comparar.
 *
 * 3. LA UNIDAD DEL `ts` ESTÁ SIN RESOLVER EN LA PROPIA DOC. El texto dice «en milisegundos»,
 *    pero su ejemplo del tópico `payment` trae diez dígitos (segundos) y el de `orders` trae
 *    trece (milisegundos). No se reconoce la diferencia en ninguna parte. Por eso acá la
 *    unidad se detecta por el largo y NUNCA se asume.
 *
 * 4. NO VALIDAMOS ANTIGÜEDAD POR DEFECTO, Y ES A PROPÓSITO. La doc dice que «puedes» comparar
 *    el ts para «establecer una tolerancia», sin publicar ningún número, y ninguno de sus seis
 *    ejemplos de código lo implementa. Además Mercado Pago reintenta cada 15 minutos cuando no
 *    recibe un 200, y no está documentado si el reintento trae el ts original o uno nuevo: una
 *    ventana corta rechazaría reintentos legítimos.
 *
 *    La protección contra repetición la da la IDEMPOTENCIA —procesar cada evento una sola vez
 *    por su id— que es más confiable que una ventana de tiempo cuya semántica no conocemos.
 *    La tolerancia queda disponible, apagada, para el día que se sepa.
 */

/** Las tres cabeceras y el query param, con el nombre exacto con que llegan. */
export const CABECERA_FIRMA = 'x-signature';
export const CABECERA_REQUEST_ID = 'x-request-id';
export const PARAM_DATA_ID = 'data.id';

export const MOTIVOS = {
  VALIDA: 'valida',
  SIN_CABECERA: 'sin-cabecera',
  CABECERA_MALFORMADA: 'cabecera-malformada',
  V1_MALFORMADO: 'v1-malformado',
  SIN_SECRETO: 'sin-secreto',
  NO_COINCIDE: 'no-coincide',
  VENCIDA: 'vencida',
};

/**
 * Parte la cabecera `x-signature`, que viene así: `ts=1742505638683,v1=ced36a...`
 *
 * Se separa por comas, y cada pedazo por el PRIMER `=`, no por todos: un valor podría
 * contener un `=` y partirlo entero lo rompería. Clave y valor van con `.trim()`, igual que
 * el código oficial.
 */
export function partirFirma(cabecera) {
  if (typeof cabecera !== 'string' || !cabecera.trim()) return null;
  const partes = {};
  for (const trozo of cabecera.split(',')) {
    const i = trozo.indexOf('=');
    if (i < 0) continue;
    const clave = trozo.slice(0, i).trim();
    const valor = trozo.slice(i + 1).trim();
    if (clave) partes[clave] = valor;
  }
  return partes;
}

/**
 * Arma la cadena que se firma. El template literal de la doc es:
 *
 *     id:[data.id_url];request-id:[x-request-id_header];ts:[ts_header];
 *
 * Los detalles que se equivocan siempre, y que acá están a propósito:
 *   - separador `:` entre nombre y valor, `;` entre campos, SIN espacios en ninguna parte;
 *   - UN PUNTO Y COMA FINAL después del ts;
 *   - la etiqueta del segundo campo es `request-id`, con guion, NO `x-request-id`;
 *   - `data.id` va SIEMPRE en minúsculas (en `orders` llega en mayúsculas, en `payment` es
 *     numérico y el lowercase es inocuo);
 *   - si falta `data.id` o `x-request-id`, se quita EL TROZO ENTERO, no se deja `id:;`. El `ts`
 *     no es condicional.
 *
 * Verificado contra el vector del ejemplo oficial de Orders:
 *   id:ord01m28p44g5fg8rjpm579eh56fv;request-id:2066ca19-c6f1-498a-be75-1923005edd06;ts:1742505638683;
 */
export function armarManifiesto({ dataId, requestId, ts }) {
  const partes = [];
  if (dataId !== undefined && dataId !== null && String(dataId) !== '') {
    partes.push(`id:${String(dataId).toLowerCase()}`);
  }
  if (requestId !== undefined && requestId !== null && String(requestId) !== '') {
    partes.push(`request-id:${requestId}`);
  }
  partes.push(`ts:${ts}`);
  return partes.join(';') + ';';
}

/** HMAC-SHA256 en hexadecimal minúscula, con Web Crypto (lo que hay en Workers). */
export async function hmacHex(secreto, mensaje) {
  const cod = new TextEncoder();
  const clave = await crypto.subtle.importKey(
    'raw', cod.encode(secreto), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const firma = await crypto.subtle.sign('HMAC', clave, cod.encode(mensaje));
  return [...new Uint8Array(firma)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Comparación en tiempo constante.
 *
 * Workers no trae `timingSafeEqual`, y tampoco queremos el de Node por lo del punto 2 de
 * arriba. Esta recorre siempre el largo completo y acumula las diferencias con XOR, así que
 * tarda lo mismo coincida o no. Los largos se comparan antes, pero eso ya se validó con la
 * forma del `v1`, así que no filtra nada que el atacante no supiera.
 */
export function igualesEnTiempoConstante(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

/** Un `v1` tiene que ser 64 caracteres hexadecimales. Se valida ANTES de comparar. */
const V1_VALIDO = /^[0-9a-f]{64}$/i;

/**
 * Normaliza el `ts` a milisegundos sin asumir su unidad.
 *
 * Trece dígitos o más son milisegundos; menos, segundos. Se detecta por largo porque la doc
 * se contradice (ver punto 3 de arriba). Devuelve `null` si no es un número.
 */
export function tsEnMilisegundos(ts) {
  const n = Number(ts);
  if (!Number.isFinite(n) || n <= 0) return null;
  return String(Math.trunc(n)).length >= 12 ? n : n * 1000;
}

/**
 * ¿Esta notificación viene de Mercado Pago?
 *
 * Devuelve `{ valida, motivo }` y no un booleano, para que quien llame pueda registrar POR QUÉ
 * se rechazó. Un webhook que responde 401 sin decir cuál de las seis razones fue es un webhook
 * imposible de depurar cuando falla en producción.
 *
 * `toleranciaMs` viene apagada por defecto (ver punto 4). Si se enciende, también hay que
 * pasar `ahoraMs`.
 */
export async function verificarFirma({
  dataId,
  requestId,
  cabeceraFirma,
  secreto,
  toleranciaMs = 0,
  ahoraMs = null,
}) {
  if (!secreto) return { valida: false, motivo: MOTIVOS.SIN_SECRETO };
  if (!cabeceraFirma) return { valida: false, motivo: MOTIVOS.SIN_CABECERA };

  const partes = partirFirma(cabeceraFirma);
  if (!partes || !partes.ts || !partes.v1) {
    return { valida: false, motivo: MOTIVOS.CABECERA_MALFORMADA };
  }
  // La forma se valida ANTES de comparar. Sin esto, un `v1` corto o ausente reventaría la
  // comparación en vez de rechazarla, que es el fallo del ejemplo oficial.
  if (!V1_VALIDO.test(partes.v1)) {
    return { valida: false, motivo: MOTIVOS.V1_MALFORMADO };
  }

  if (toleranciaMs > 0 && ahoraMs !== null) {
    const ms = tsEnMilisegundos(partes.ts);
    if (ms === null || Math.abs(ahoraMs - ms) > toleranciaMs) {
      return { valida: false, motivo: MOTIVOS.VENCIDA };
    }
  }

  const manifiesto = armarManifiesto({ dataId, requestId, ts: partes.ts });
  const calculada = await hmacHex(secreto, manifiesto);

  return igualesEnTiempoConstante(calculada, partes.v1.toLowerCase())
    ? { valida: true, motivo: MOTIVOS.VALIDA }
    : { valida: false, motivo: MOTIVOS.NO_COINCIDE };
}
