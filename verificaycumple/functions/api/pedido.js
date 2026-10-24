/**
 * GET /api/pedido?id=vyc_...
 *
 * Lo que la pantalla del pedido necesita para dibujarse, y nada más.
 *
 * LA LLAVE ES EL ENLACE. El id son 32 caracteres hexadecimales de azar (122 bits), así que no
 * se puede recorrer ni adivinar: con mil millones de intentos por segundo durante la edad del
 * universo no se acierta uno. Por eso no hay cuenta ni contraseña, y por eso el chequeo
 * gratuito sigue sin pedir correo incluso después de que alguien compra.
 *
 * El costo de esa decisión es el de cualquier enlace secreto: quien lo tenga, entra. Por eso
 * la respuesta NO lleva el informe completo, ni el correo, ni los datos de facturación. Lo que
 * no se manda no se puede filtrar.
 *
 * Un id que no existe y uno mal formado responden lo mismo. No hay nada que ganar diciéndole a
 * alguien «ese id tiene la forma correcta pero no existe».
 */

import {
  leerPedido, vistaPublica, crearPedido, buscarPedidoReciente, marcarEstado,
} from './almacen.js';
import { etapaDelPedido, señalesDelPedido, convieneRefrescar } from './etapas.js';
import { chequear, normalizarDominio } from './chequeo.js';
import { clavesDeTope, contar } from './profundo.js';
import { elegibilidad } from './elegibilidad.js';
import { ESTADOS, nuevoIdPedido, congelarContrato, armarOrdenMP, utmsDe } from './pedidos.js';
import { crearOrdenMP } from './cobro.js';

/**
 * Los nombres de las señales, con las mismas palabras que la persona vio en su chequeo.
 *
 * Están acá y no se leen del chequeo a propósito: el pedido guarda ids congelados, y si mañana
 * el catálogo cambia, lo que la persona ve sigue siendo lo que compró. Un id que no esté en
 * esta tabla se muestra tal cual en vez de inventarle un nombre.
 */
const TITULOS = {
  cmp: 'Permiso antes de cargar rastreadores',
  carga: 'Rastreadores que parten solos',
  cookies: 'Cookies escritas sin permiso',
  envio: 'Datos que ya salieron de tu sitio',
  aviso: 'Si aparece un aviso al entrar',
  politica: 'Enlace a tu política de privacidad',
  https: 'Conexión cifrada (HTTPS)',
  // Faltaba, y es una señal real del chequeo rápido: un pedido cuyo `senales_fuera` la incluyera
  // habría mostrado el id crudo «casilla» en la pantalla del cliente.
  casilla: 'Casilla de consentimiento en tu formulario',
};

const NO_EXISTE = { ok: false, motivo: 'no-existe' };

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Un pedido cambia de estado y nunca debe servirse de una caché intermedia.
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequestGet(contexto) {
  const { request, env } = contexto;
  const id = new URL(request.url).searchParams.get('id');

  if (!env.VYC_PEDIDOS) {
    // Sin base no se inventa un estado. Es un fallo nuestro y se dice como tal.
    return json({ ok: false, motivo: 'sin-base' }, 503);
  }
  if (!id) return json(NO_EXISTE, 404);

  let pedido;
  try {
    pedido = await leerPedido(env.VYC_PEDIDOS, id);
  } catch {
    return json({ ok: false, motivo: 'error-de-lectura' }, 503);
  }
  if (!pedido) return json(NO_EXISTE, 404);

  return json({
    ok: true,
    pedido: vistaPublica(pedido),
    etapa: etapaDelPedido(pedido),
    señales: señalesDelPedido(pedido, TITULOS),
    refrescar: convieneRefrescar(pedido),
  });
}

/* ================================================================== *
 * POST /api/pedido — crear el pedido y abrir el pago                  *
 * ================================================================== */

/**
 * El precio, en un solo lugar.
 *
 * ⚠️ Va acá y NO en lo que manda el navegador. Parece obvio escrito así, pero es el error más
 * fácil de cometer en un checkout: la página ya conoce el precio porque lo muestra, y mandarlo
 * en el cuerpo de la petición «para no repetirlo» significa dejar que el comprador elija cuánto
 * paga. Lo que el navegador manda son tres datos y ninguno es un número.
 */
export const MONTO_NETO = 149000;
export const MONTO_TOTAL = 177310;  // 149.000 + 19% de IVA
export const TITULO_KIT = 'Kit de implementación · Verifica y Cumple';

/** Cuántos pedidos puede crear una misma IP en un día. */
export const TOPE_PEDIDOS_IP_DIA = 5;
const TTL_TOPE_S = 60 * 60 * 30;

/**
 * La ventana del antidoble clic.
 *
 * Dentro de ella, un segundo intento de la misma pareja (dominio, correo) reusa el pedido que ya
 * existe en vez de crear otro. Media hora es bastante más que un doble clic, y mucho menos que
 * «para siempre»: pasada la ventana, quien lo intentó y abandonó puede volver a comprar con una
 * orden nueva en vez de quedar atado a una vencida.
 */
export const VENTANA_DOBLE_CLIC_MS = 30 * 60 * 1000;

/** La forma de un correo. La expresión es la misma de `doce-puntos.js`, pero ANCLADA: allá sirve
 *  para encontrar un correo dentro de un texto, y acá para validar que esto es un correo entero. */
const CORREO_VALIDO = /^[a-z0-9._%+-]{1,64}@(?:[a-z0-9-]{1,63}\.){1,4}[a-z]{2,12}$/i;

function jsonPost(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // A diferencia de los GET del chequeo, este endpoint NO lleva
      // `Access-Control-Allow-Origin: *`. Escribe en la base y dispara una petición saliente a
      // Mercado Pago: no tiene por qué ser llamable desde otro origen.
      'Cache-Control': 'no-store',
    },
  });
}

/**
 * ¿La petición viene de nuestra propia página?
 *
 * Es defensa en profundidad, no la defensa principal —esa es el tope de abuso y la compuerta de
 * elegibilidad— pero cuesta cuatro líneas. Un `Origin` ausente se acepta: las peticiones del
 * mismo origen pueden no mandarlo, y rechazarlas rompería la página.
 */
function origenPropio(request, url) {
  const origen = request.headers.get('Origin');
  if (!origen) return true;
  try { return new URL(origen).host === url.host; } catch { return false; }
}

/**
 * Crea el pedido y devuelve a dónde mandar al comprador.
 *
 * ── LO QUE RECIBE, Y LO QUE NO ───────────────────────────────────────────────────────────
 *
 * Recibe tres campos: `dominio`, `correo` y `consiento`. No recibe el informe, ni el monto, ni
 * qué señales se contratan. **Todo eso lo rearma el servidor**, y no es desconfianza decorativa:
 * el informe decide si alguien puede comprar y qué se le promete, así que si viniera del
 * navegador, cualquiera podría comprar un kit para un sitio que nunca medimos, o fabricarse una
 * lista de señales que no vamos a poder cerrar.
 *
 * Que la página no guarde el informe —lo usa para dibujar y lo descarta— deja de ser una
 * limitación y pasa a ser la garantía: no hay nada que mandar.
 *
 * ── CÓMO SE REARMA LA ELEGIBILIDAD ───────────────────────────────────────────────────────
 *
 * `elegibilidad()` necesita los dos informes, porque las señales que el kit cierra están
 * repartidas: `cmp` sale del chequeo rápido y `carga`, `cookies`, `envio` y `aviso` del profundo.
 * Y los dos se consiguen de forma distinta:
 *
 *   - el PROFUNDO está en KV bajo `cache:<dominio>`, completo, 24 horas. No se vuelve a correr:
 *     abre un navegador remoto y cuesta minutos de un presupuesto mensual;
 *   - el RÁPIDO no se guarda en ninguna parte, así que se vuelve a correr acá. Es una petición
 *     HTTP, sin navegador.
 *
 * Rehacer el rápido puede dar distinto de lo que la persona vio hace un rato. **Está bien, y es
 * a propósito:** se cobra por lo que se puede verificar ahora. Si el sitio cambió y ya no hay
 * nada que el kit cierre, se dice en vez de vender.
 */
export async function onRequestPost(contexto) {
  const { request, env } = contexto;
  const url = new URL(request.url);

  if (!origenPropio(request, url)) return jsonPost({ ok: false, motivo: 'origen' }, 403);
  if (!env.VYC_PEDIDOS) return jsonPost({ ok: false, motivo: 'sin-base' }, 503);

  let cuerpo = null;
  try { cuerpo = await request.json(); } catch { cuerpo = null; }
  if (!cuerpo || typeof cuerpo !== 'object') {
    return jsonPost({ ok: false, motivo: 'cuerpo-invalido' }, 400);
  }

  const kv = env.VYC_TOPES;

  // ── Los tres campos ───────────────────────────────────────────────────────────────────
  const v = normalizarDominio(cuerpo.dominio);
  if (v.error) return jsonPost({ ok: false, motivo: 'dominio', detalle: v.error }, 400);
  const { dominio } = v;

  const correo = typeof cuerpo.correo === 'string' ? cuerpo.correo.trim() : '';
  if (!CORREO_VALIDO.test(correo)) {
    return jsonPost({
      ok: false, motivo: 'correo',
      detalle: 'Revisa el correo: es a donde te llega el comprobante y el enlace de tu pedido.',
    }, 400);
  }

  // El consentimiento es la base de legitimidad que declara la política, así que no es un
  // adorno del formulario: sin él no hay sobre qué tratar los datos.
  if (cuerpo.consiento !== true) {
    return jsonPost({
      ok: false, motivo: 'sin-consentimiento',
      detalle: 'Necesitamos que aceptes el tratamiento de tus datos para poder emitir el pedido.',
    }, 400);
  }

  // ── El tope de abuso ──────────────────────────────────────────────────────────────────
  //
  // VA DESPUÉS DE VALIDAR, Y ESO IMPORTA. La primera versión contaba antes, y la prueba mostró
  // la consecuencia: cinco erratas en el correo y la persona quedaba bloqueada el día entero,
  // en la pantalla donde está intentando pagarnos. Un error de tipeo no es un abuso.
  //
  // Rechazar un cuerpo mal formado es barato —no sale ninguna petición ni se escribe nada—, así
  // que no tiene por qué gastar cuota. Lo que el tope protege es lo de abajo: correr el chequeo
  // (una petición saliente), leer KV, escribir en D1 y llamar a Mercado Pago. Cinco por IP al
  // día; crear una orden es mucho más raro que chequear.
  //
  // Si KV no está, se deja pasar, igual que `doce-puntos.js`. Acá además es inofensivo por una
  // razón que conviene dejar escrita: el informe profundo TAMBIÉN sale de KV, así que sin KV la
  // venta se detiene sola en el paso siguiente. La puerta de arriba ya está cerrada.
  if (kv) {
    const ip = request.headers.get('CF-Connecting-IP') || '';
    try {
      const claves = clavesDeTope(ip, '', new Date(), 'tope:pedido');
      const porIp = await contar(kv, claves.ip, TOPE_PEDIDOS_IP_DIA, TTL_TOPE_S);
      if (!porIp.pasa) {
        return jsonPost({
          ok: false,
          motivo: 'tope',
          detalle: 'Hiciste varios intentos de compra hoy. Escríbenos y lo resolvemos por correo.',
        }, 429);
      }
    } catch { /* KV caído no bloquea una venta: ver la nota de arriba. */ }
  }

  // ── Rearmar los dos informes ──────────────────────────────────────────────────────────
  let profundo = null;
  if (kv) {
    try { profundo = await kv.get(`cache:${dominio}`, { type: 'json' }); } catch { profundo = null; }
  }
  if (!profundo) {
    return jsonPost({
      ok: false, motivo: 'sin-medicion',
      detalle: 'No tenemos una revisión con navegador reciente de este sitio. Vuelve a correr el ' +
        'chequeo y compra desde ahí, para que lo que contrates sea lo que medimos.',
    }, 409);
  }

  let rapido;
  try { rapido = await chequear(dominio); } catch { rapido = null; }
  if (!rapido || !rapido.ok) {
    return jsonPost({
      ok: false, motivo: 'no-se-pudo-medir',
      detalle: (rapido && rapido.error) ||
        'No pudimos abrir tu sitio recién. No se puede cotizar lo que no vimos.',
    }, 409);
  }

  const puede = elegibilidad({ rapido, profundo });
  if (!puede.puede) {
    // El módulo ya redacta una frase en castellano para cada motivo. Se manda esa, no el código.
    return jsonPost({ ok: false, motivo: puede.motivo, detalle: puede.detalle }, 409);
  }

  // ── El antidoble clic, ANTES de crear nada ────────────────────────────────────────────
  //
  // La clave de idempotencia de Mercado Pago no alcanza sola: protege contra que repitamos la
  // misma petición, no contra que el navegador mande dos. Si cada una generara su propio id,
  // cada una traería su propia clave y habría DOS órdenes, o sea dos cobros por el mismo kit.
  //
  // Reusando el id del pedido anterior, las dos peticiones traen la misma clave y Mercado Pago
  // devuelve la orden que ya existía.
  const desdeIso = new Date(Date.now() - VENTANA_DOBLE_CLIC_MS).toISOString();
  let anterior = null;
  try {
    anterior = await buscarPedidoReciente(env.VYC_PEDIDOS, { dominio, correo, desdeIso });
  } catch { anterior = null; }

  let idPedido = anterior ? anterior.id : nuevoIdPedido();

  // ── Congelar y crear ──────────────────────────────────────────────────────────────────
  if (!anterior) {
    // Se congelan LOS DOS informes. `cierra` mezcla ids de ambos, así que guardar solo el
    // profundo dejaría el contrato sin la mitad de su evidencia, y el día que haya que
    // justificar qué se vendió no estaría completa.
    const contrato = congelarContrato({
      informe: { rapido, profundo },
      elegibilidad: puede,
      montoNeto: MONTO_NETO,
      montoTotal: MONTO_TOTAL,
      urlMedida: profundo.revisado || rapido.revisado || null,
    });

    try {
      // El INSERT va ANTES de llamar a Mercado Pago. El webhook tiene una rama que contesta 503
      // y pide reintento cuando la referencia tiene nuestra forma pero el pedido todavía no
      // está, justo para esta carrera, pero apoyarse en ella cuesta un reintento de 15 minutos
      // del lado de Mercado Pago. Insertando primero, la carrera no existe.
      await crearPedido(env.VYC_PEDIDOS, {
        id: idPedido,
        dominio,
        correo,
        ...contrato,
        ...utmsDe(request.url),
      });
    } catch {
      return jsonPost({ ok: false, motivo: 'no-se-pudo-guardar' }, 503);
    }
  }

  // ── Abrir el pago ─────────────────────────────────────────────────────────────────────
  const base = `${url.protocol}//${url.host}`;
  const destino = `${base}/pedido/?id=${encodeURIComponent(idPedido)}`;
  let orden;
  try {
    orden = armarOrdenMP({
      idPedido,
      correo,
      montoTotal: MONTO_TOTAL,
      titulo: TITULO_KIT,
      // Las tres vuelven a la misma pantalla: es la que sabe en qué está el pedido, y lo sabe
      // leyendo la base, no el parámetro con el que Mercado Pago la llamó. Lo que el navegador
      // traiga de vuelta no decide nada.
      urls: { exito: destino, pendiente: destino, rechazo: destino },
    });
  } catch (e) {
    return jsonPost({ ok: false, motivo: 'orden-invalida', detalle: (e && e.message) || null }, 500);
  }

  const creada = await crearOrdenMP(orden, idPedido, env.MP_ACCESS_TOKEN);
  if (!creada.ok) {
    // El pedido se queda en `creado` SIN `mp_order_id`, y se devuelve 502. No se borra: la fila
    // es el único registro de que alguien intentó comprar, y `etapaDelPedido` ya distingue ese
    // caso para no decirle «estamos confirmando tu pago» a quien nunca llegó a la pasarela.
    return jsonPost({
      ok: false, motivo: 'no-se-pudo-abrir-el-pago', id: idPedido,
      detalle: 'No pudimos abrir el pago en Mercado Pago. No se te cobró nada. Vuelve a ' +
        'intentarlo en un momento.',
    }, 502);
  }

  try {
    // `creado → creado` es una transición válida a propósito, y existe exactamente para esto.
    await marcarEstado(env.VYC_PEDIDOS, idPedido, ESTADOS.CREADO, ESTADOS.CREADO, {
      mp_order_id: String(creada.orden.id),
    });
  } catch {
    // La orden ya existe y la persona puede pagar; no guardar su id es molesto, no grave: el
    // webhook encuentra el pedido por `external_reference`, no por esta columna.
  }

  return jsonPost({ ok: true, id: idPedido, checkout_url: creada.orden.checkout_url });
}

/** Cualquier otro método. */
export async function onRequest(contexto) {
  const m = contexto.request.method;
  if (m === 'GET') return onRequestGet(contexto);
  if (m === 'POST') return onRequestPost(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, POST' } });
}
