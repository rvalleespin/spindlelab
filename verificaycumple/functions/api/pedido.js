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

// ⚠️ NINGUNA RESPUESTA DE CARA AL NAVEGADOR USA UN CÓDIGO 5xx.
//
// Cloudflare INTERCEPTA las respuestas 5xx que salen de una Function y las reemplaza por su
// propia página de error en texto plano. Comprobado en producción el 24-oct-2026: este mismo
// endpoint devuelve su JSON con 400 y con 409, y con 502 devuelve `error code: 502`.
//
// La cadena de consecuencias es peor que el síntoma: el navegador no puede parsear esa página,
// cae en el catch del fetch, y le dice a la persona «revisa tu conexión» cuando la conexión
// estaba bien y el problema era nuestro. Tres capas de mensaje equivocado por un código.
//
// Por eso lo que la persona ve sale siempre con 4xx y el motivo real va en el cuerpo. El
// webhook es la excepción y ahí 503 es correcto: quien lo lee es Mercado Pago, que necesita un
// 5xx para reintentar, y no hay ninguna persona mirando.

import {
  leerPedido, vistaPublica, crearPedido, buscarPedidoReciente, buscarCompraAbierta,
  marcarEstado,
} from './almacen.js';
import { etapaDelPedido, señalesDelPedido, convieneRefrescar, TITULOS } from './etapas.js';
import { chequear, normalizarDominio } from './chequeo.js';
import { clavesDeTope, contar, CACHE_HORAS } from './profundo.js';
import { elegibilidad } from './elegibilidad.js';
import {
  ESTADOS, nuevoIdPedido, congelarContrato, armarOrdenMP, limpiarUtms, VIGENCIA_ORDEN_HORAS,
} from './pedidos.js';
import {
  crearOrdenMP, leerOrdenMP, decidirDesdeOrden, pagoDeLaOrden, ACCIONES,
} from './cobro.js';


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

/**
 * Cada cuánto, como mucho, se le vuelve a preguntar a Mercado Pago por una orden.
 *
 * NO es un número elegido: 60 segundos es el mínimo que admite `expirationTtl` en KV. Si se
 * pudiera menos, tampoco haría falta.
 *
 * La pantalla del pedido se repregunta sola cada 5 segundos y se rinde a las 24 veces, o sea a
 * los 2 minutos (public/pedido/index.html). Con este piso, una sesión completa de esa pantalla
 * cuesta 2 llamadas a Mercado Pago en vez de 24, y una pestaña olvidada abierta una hora cuesta
 * 60 en vez de 720. Hay una prueba que compara las dos cosas, porque viven en archivos
 * distintos y es justo el tipo de pareja que se separa sin que nadie lo note.
 */
export const ESPERA_RECONCILIAR_S = 60;

/**
 * Los estados de una orden de Mercado Pago que significan «esta orden ya no se puede pagar».
 *
 * Solo con uno de estos se cierra una compra abierta vieja. Cualquier otro —incluido uno que
 * no conozcamos— se trata como viva, que es el lado seguro: matar el enlace de pago de alguien
 * que está por pagar es peor que dejar una fila de más.
 */
const ORDEN_MUERTA = new Set(['expired', 'canceled', 'failed']);

/**
 * Preguntarle a Mercado Pago por una orden que nuestra base todavía no da por resuelta.
 *
 * POR QUÉ EXISTE. Hasta hoy el estado de un pedido dependía POR COMPLETO de que llegara y
 * validara la notificación: `leerOrdenMP` tenía un solo llamador, el webhook. Si esa
 * notificación se perdía o se rechazaba, la persona pagaba, Mercado Pago le decía «listo», y su
 * pantalla se quedaba en «estamos confirmando tu pago» para siempre — y peor, dejaba de
 * refrescar a los dos minutos, así que la frase «esta página se actualiza sola» se volvía
 * falsa. Pasó de verdad el 24-oct con un pago real: lo salvó un reintento de Mercado Pago una
 * hora después, pero los reintentos se acaban.
 *
 * NO REIMPLEMENTA NADA. Usa el mismo `leerOrdenMP`, el mismo `decidirDesdeOrden` y el mismo
 * `marcarEstado` que el webhook, que ya están probados. De ahí salen gratis las dos defensas
 * que importan: `decidirDesdeOrden` rechaza una orden cuya `external_reference` no calce con
 * este pedido, y rechaza una cuyo monto no sea el que se vendió.
 *
 * SI ALGO FALLA, NO PASA NADA. Toda salida devuelve el pedido tal como estaba: esto es una red
 * de seguridad sobre la lectura de una pantalla, no puede romperla. El webhook sigue siendo el
 * camino principal.
 */
async function reconciliar(env, pedido) {
  // Solo donde Mercado Pago puede saber algo que nosotros no. `convieneRefrescar` ya define
  // exactamente eso —`pendiente`, o `creado` con orden abierta— y es la misma regla que decide
  // si la pantalla se repregunta. Que sean la misma no es casualidad: preguntar cuando la
  // pantalla ya no espera nada sería gastar llamadas sin que nadie las mire.
  if (!convieneRefrescar(pedido) || !pedido.mp_order_id || !env.MP_ACCESS_TOKEN) return pedido;

  // Sin KV no hay freno, y sin freno cada repregunta de la pantalla sería una llamada saliente
  // —y el enlace del pedido lo abren también los clientes de correo, que precargan—. Acá se
  // falla CERRADO a propósito: lo que se pierde es la red de seguridad, no la pantalla.
  const kv = env.VYC_TOPES;
  if (!kv) return pedido;
  const clave = `mp:visto:${pedido.id}`;
  try {
    if (await kv.get(clave)) return pedido;
    await kv.put(clave, '1', { expirationTtl: ESPERA_RECONCILIAR_S });
  } catch {
    return pedido;
  }

  const lectura = await leerOrdenMP(pedido.mp_order_id, env.MP_ACCESS_TOKEN);
  if (!lectura.ok) {
    console.log(`[pedido] no se pudo releer la orden de ${pedido.id}: ${lectura.error}`);
    return pedido;
  }

  const decision = decidirDesdeOrden({ pedido, orden: lectura.orden });
  if (decision.accion !== ACCIONES.MARCAR) {
    // REVISAR es el caso que hay que poder ver: significa que la orden dice algo que no calza
    // con lo que vendimos, y eso lo tiene que mirar una persona.
    if (decision.accion === ACCIONES.REVISAR) {
      console.log(`[pedido] ${pedido.id} necesita revisión: ${decision.motivo}`);
    }
    return pedido;
  }

  const extra = { mp_order_id: lectura.orden.id || pedido.mp_order_id };
  const pago = pagoDeLaOrden(lectura.orden);
  if (pago && pago.id) extra.mp_payment_id = String(pago.id);
  if (decision.estado === ESTADOS.PAGADO) extra.pagado_en = new Date().toISOString();

  let estadoFinal = decision.estado;
  let movido;
  try {
    movido = await marcarEstado(env.VYC_PEDIDOS, pedido.id, pedido.estado, estadoFinal, extra);
  } catch {
    return pedido;
  }

  // ── EL MISMO RESCATE QUE TIENE EL WEBHOOK, Y QUE ESTO NACIÓ SIN ÉL ─────────────────────
  //
  // Entre que se leyó el pedido y que volvió Mercado Pago pasan hasta diez segundos, y en esa
  // ventana la notificación puede llegar y mover la fila. Entonces este UPDATE no encuentra el
  // pedido en el estado que esperaba y, con el `return` que había acá, se abandonaba en
  // silencio: la orden decía pagada y la base quedaba atrás.
  //
  // El caso malo no es el que primero viene a la cabeza. Si el webhook la dejó en `pendiente`,
  // esto se recupera solo en el siguiente GET. Pero si la dejó en `rechazado` —que es el camino
  // NORMAL de quien reintenta con otra tarjeta— entonces `convieneRefrescar` deja de ser cierto
  // para ese pedido y la red de seguridad NO VUELVE A CORRER NUNCA. A quien pagó se le muestra
  // que su pago fue rechazado, para siempre.
  //
  // Se resuelve como allá: releer, volver a preguntar con el pedido como quedó, y si sigue
  // diciendo MARCAR, alcanzarlo. Una vista vieja de la orden nunca vuelve a dar MARCAR, así
  // que no se puede quedar en un bucle.
  if (!movido.movido) {
    let actual = null;
    try { actual = await leerPedido(env.VYC_PEDIDOS, pedido.id); } catch { actual = null; }
    if (!actual) return pedido;

    const reintento = decidirDesdeOrden({ pedido: actual, orden: lectura.orden });
    if (reintento.accion !== ACCIONES.MARCAR) {
      // No hay nada que alcanzar: o el pedido ya está donde corresponde, o esta vista de la
      // orden es más vieja que lo guardado. Las dos son correctas y se devuelve lo que hay.
      if (reintento.accion === ACCIONES.REVISAR) {
        console.log(`[pedido] ${pedido.id} necesita revisión tras la carrera: ${reintento.motivo}`);
      }
      return actual;
    }

    const extra2 = { ...extra };
    if (reintento.estado === ESTADOS.PAGADO) extra2.pagado_en = new Date().toISOString();
    else delete extra2.pagado_en;
    try {
      movido = await marcarEstado(env.VYC_PEDIDOS, actual.id, actual.estado, reintento.estado, extra2);
    } catch {
      return actual;
    }
    if (!movido.movido) return actual;
    estadoFinal = reintento.estado;
    console.log(`[pedido] ${pedido.id}: perdió la carrera contra ${actual.estado}, alcanzado a ${estadoFinal}`);
  }

  console.log(`[pedido] reconciliado ${pedido.id}: ${pedido.estado} → ${estadoFinal}`);
  // Se relee para que la pantalla dibuje el pedido entero y no una mezcla del viejo con el
  // estado nuevo. Si la relectura falla, el de antes sigue siendo cierto.
  try { return (await leerPedido(env.VYC_PEDIDOS, pedido.id)) || pedido; } catch { return pedido; }
}

export async function onRequestGet(contexto) {
  const { request, env } = contexto;
  const id = new URL(request.url).searchParams.get('id');

  if (!env.VYC_PEDIDOS) {
    // Sin base no se inventa un estado. Es un fallo nuestro y se dice como tal.
    return json({ ok: false, motivo: 'sin-base' }, 409);
  }
  if (!id) return json(NO_EXISTE, 404);

  let pedido;
  try {
    pedido = await leerPedido(env.VYC_PEDIDOS, id);
  } catch {
    return json({ ok: false, motivo: 'error-de-lectura' }, 409);
  }
  if (!pedido) return json(NO_EXISTE, 404);

  // La red de seguridad: si la notificación no llegó, acá se le pregunta a Mercado Pago. Nunca
  // falla hacia afuera — si no se puede, devuelve el pedido tal como estaba.
  pedido = await reconciliar(env, pedido);

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

/**
 * Cuántas órdenes puede abrir una misma IP en un día.
 *
 * ── POR QUÉ ESTE NÚMERO SUBIÓ, Y POR QUÉ SE CUENTA DISTINTO (24-oct-2026) ────────────────
 *
 * Estaba en 5 y contaba CADA intento, incluidos los que rechazábamos nosotros. La primera vez
 * que alguien probó el checkout de verdad, Mercado Pago devolvió un error en cada llamada, y a
 * los cinco reintentos el tope lo dejó fuera del sitio por el resto del día. O sea que un fallo
 * NUESTRO se convertía en un castigo para quien estaba intentando pagarnos.
 *
 * Dos cambios, y el segundo importa más que el primero:
 *
 *   1. Quince en vez de cinco. Cinco es menos que lo que gasta una persona legítima que se
 *      topa con un problema y reintenta, y mucho menos que dos compras desde una oficina con
 *      IP compartida.
 *   2. **El contador sube justo antes de llamar a Mercado Pago, no al entrar.** Un cuerpo mal
 *      formado, un correo con errata, un sitio que ya no es elegible: nada de eso gasta cupo,
 *      porque nada de eso cuesta. Lo que el tope protege son las llamadas salientes a Mercado
 *      Pago, así que es lo único que cuenta.
 */
export const TOPE_PEDIDOS_IP_DIA = 15;
const TTL_TOPE_S = 60 * 60 * 30;

/**
 * La ventana en que un segundo intento reusa el pedido que ya existe.
 *
 * ⚠️ SALE DE LA VIGENCIA DE LA ORDEN Y NO SE ESCRIBE A MANO. La nota larga está en
 * `VIGENCIA_ORDEN_HORAS`, en pedidos.js; el resumen es que cuando este número era más corto que
 * la vigencia —30 minutos contra un día— quedaban dos órdenes pagables a la vez para el mismo
 * sitio, y pagar las dos significaba cobrar dos veces.
 *
 * El invariante: la ventana dura por lo menos lo que dura la orden. Mientras la anterior siga
 * pagable, no se abre otra.
 */
export const VENTANA_DOBLE_CLIC_MS = VIGENCIA_ORDEN_HORAS * 60 * 60 * 1000;

/**
 * Cuánto puede haber envejecido la revisión con navegador para seguir sirviendo de base.
 *
 * Es la MISMA validez que tiene en KV, y se importa de allá en vez de escribirse acá.
 *
 * La primera versión de esto, del 24-oct por la mañana, inventó media hora con este argumento:
 * «en KV dura un día porque para MOSTRAR está bien, pero para VENDER hay que congelar las dos
 * mediciones juntas». Suena razonable y es falso, porque le falta mirar lo que la página ya
 * dice. Cuando el informe sale de la caché, el resultado trae escrito «esto no lo medimos
 * recién: es la medición de tal hora, la guardamos por un día», y debajo le ofrecemos el kit.
 * O sea que esa medición ya es, declaradamente, el resultado de esa persona.
 *
 * Negarse a venderle sobre el mismo dato que acabamos de mostrarle como suyo no protege nada:
 * solo parte en dos una creencia que tiene que ser una. Si un día entero es demasiado para
 * cotizar, entonces también es demasiado para mostrarlo como su resultado, y lo que hay que
 * bajar es la vida en KV —un número, en un lugar—, no agregar un segundo número acá.
 *
 * Y el costo fue real, no teórico: con media hora, cualquiera que midiera su sitio, leyera los
 * doce puntos y volviera a comprar un rato después chocaba con un 409, y el mensaje lo mandaba
 * a «volver a correr el chequeo», que NO rehace la revisión con navegador —la vuelve a servir
 * de la caché—, así que el consejo no podía funcionar. Callejón sin salida por 24 horas, con
 * la campaña pagada encima. Lo encontró Ramón probando a mano, no las pruebas: la mía daba por
 * cierto lo mismo que el código.
 *
 * Lo que sí sigue protegiendo, y por eso la guarda no desaparece: un informe que no se puede
 * FECHAR no se vende. Congelar en el contrato «lo que medimos» exige saber cuándo se midió.
 */
export const VENTANA_MEDICION_MS = CACHE_HORAS * 60 * 60 * 1000;

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
  if (!env.VYC_PEDIDOS) return jsonPost({ ok: false, motivo: 'sin-base',
      detalle: 'Tuvimos un problema de nuestro lado. Vuelve a intentarlo en un momento.' }, 409);

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
  // Acá solo se MIRA el contador. Subirlo acá cobraba el intento antes de saber si íbamos a
  // poder vender, así que un rechazo nuestro gastaba el cupo del comprador. Sube más abajo,
  // justo antes de llamar a Mercado Pago, que es lo único que este tope protege.
  const claveTope = kv
    ? clavesDeTope(request.headers.get('CF-Connecting-IP') || '', '', new Date(), 'tope:pedido').ip
    : null;
  if (kv && claveTope) {
    try {
      const usados = Number((await kv.get(claveTope)) || 0);
      if (usados >= TOPE_PEDIDOS_IP_DIA) {
        return jsonPost({
          ok: false,
          motivo: 'tope',
          detalle: 'Abriste varios pagos hoy desde esta conexión. Escríbenos y lo resolvemos ' +
            'por correo, que es más rápido que esperar.',
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

  // ── LAS DOS MEDICIONES TIENEN QUE SER DEL MISMO MOMENTO ───────────────────────────────
  //
  // El informe profundo vive 24 horas en KV y el rápido se rehace acá, recién. Si el de KV es de
  // ayer, el contrato congelaría dos fotos tomadas con horas de diferencia y vendería un alcance
  // que quizá ya no corresponde al sitio: «lo que medimos» dejaría de ser una sola cosa.
  //
  // Media hora es el margen: cubre a quien corrió el chequeo, lo pensó y volvió a comprar, y
  // deja fuera a quien vuelve al día siguiente con un enlace viejo. A ese no se le niega la
  // venta, se le pide volver a medir, que es lo que de verdad necesita.
  const medidoEn = Date.parse(profundo.revisadoEn || '');
  if (!Number.isFinite(medidoEn) || Date.now() - medidoEn > VENTANA_MEDICION_MS) {
    return jsonPost({
      ok: false, motivo: 'medicion-vieja',
      // El botón se llama «Volver a medirlo» y está en el resultado, junto al aviso de que la
      // medición no es de recién. Nombrarlo importa: la versión anterior decía «vuelve a correr
      // el chequeo», y eso sirve el informe de la caché otra vez, así que no arreglaba nada.
      detalle: 'No podemos fechar la revisión con navegador que tenemos de este sitio. Apreta ' +
        '«Volver a medirlo» en el resultado y compra desde ahí: lo que contrates tiene que ser ' +
        'lo que medimos.',
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

    // El INSERT va ANTES de llamar a Mercado Pago. El webhook tiene una rama que contesta 503
    // y pide reintento cuando la referencia tiene nuestra forma pero el pedido todavía no
    // está, justo para esta carrera, pero apoyarse en ella cuesta un reintento de 15 minutos
    // del lado de Mercado Pago. Insertando primero, la carrera no existe.
    //
    // Va en una función porque se usa DOS veces: la segunda después de cerrar una compra
    // abierta vencida que bloqueaba el índice (más abajo). El cuerpo tiene que ser idéntico en
    // las dos, y copiarlo era la forma segura de que se separaran.
    const insertar = () => crearPedido(env.VYC_PEDIDOS, {
      id: idPedido,
      dominio,
      correo,
      ...contrato,
      // ⚠️ De `cuerpo.utms`, NO de `request.url`. La URL de esta petición es `/api/pedido` y
      // nunca lleva parámetros de campaña: con `utmsDe(request.url)` todas las ventas se
      // guardaban sin atribución. Los parámetros viven en la URL de la página, así que los
      // manda el navegador, y acá creerle es inofensivo (ver la nota de `limpiarUtms`).
      ...limpiarUtms(cuerpo.utms),
    });

    let puesto;
    try {
      puesto = await insertar();
    } catch {
      return jsonPost({ ok: false, motivo: 'no-se-pudo-guardar',
        detalle: 'Tuvimos un problema al guardar tu pedido. No se te cobró nada. Vuelve a intentarlo.' }, 409);
    }

    // ── LA CARRERA QUE LA BÚSQUEDA DE ARRIBA NO PUEDE CERRAR ────────────────────────────
    //
    // `buscarPedidoReciente` y este INSERT son dos operaciones, y entre ellas cabe otra
    // petición: dos clics simultáneos terminan los dos su búsqueda sin encontrar nada, los dos
    // se creen el primero, y cada uno abriría su propia orden con su propia clave de
    // idempotencia. Ahí la idempotencia de Mercado Pago no sirve de nada, porque las claves son
    // distintas.
    //
    // Quien decide es la base: el índice parcial único deja pasar UNA sola compra abierta por
    // (dominio, correo). El que pierde la carrera no inserta, relee, y se va con el id del que
    // ganó. Las dos peticiones terminan mandando la MISMA clave, que es la condición para que
    // Mercado Pago devuelva una sola orden.
    if (!puesto.creado) {
      let ganador = null;
      try {
        ganador = await buscarPedidoReciente(env.VYC_PEDIDOS, { dominio, correo, desdeIso });
      } catch { ganador = null; }

      if (ganador) {
        idPedido = ganador.id;
      } else {
        // ── LA COMPRA ABIERTA QUE YA VENCIÓ ──────────────────────────────────────────────
        //
        // Si no insertó y tampoco hay nadie reciente, lo que bloquea el índice es una compra
        // abierta MÁS VIEJA que la ventana. El índice no mira la edad y la búsqueda sí, y en
        // ese hueco esta pareja (dominio, correo) quedaba encerrada PARA SIEMPRE: cada intento
        // volvía a chocar, cada intento volvía a no encontrar nada, y cada intento recibía
        // «no se te cobró nada, vuelve a intentarlo» — un consejo que no podía funcionar nunca.
        // No es una carrera: pasa siempre, y es determinista.
        //
        // ⚠️ NO SE DEDUCE QUE LA ORDEN VENCIÓ. La primera versión de esto razonaba así: la
        // ventana de la búsqueda sale de VIGENCIA_ORDEN_HORAS, que es el mismo
        // `expiration_time` con que se abrió la orden, así que una fila fuera de la ventana
        // tiene su orden vencida. El razonamiento es elegante y es FALSO, porque `creado_en` es
        // cuándo nació la FILA y no cuándo nació la ORDEN, y las dos cosas se pueden separar:
        // si el primer intento no logró abrir el pago, la fila queda sin orden; si la persona
        // vuelve dentro de la ventana, se reusa esa fila vieja y se le abre una orden NUEVA,
        // que vive 24 horas desde ESE momento. Cerrarla por la fecha de la fila sería matar un
        // enlace de pago vivo.
        //
        // Por eso se pide evidencia en vez de deducir. Y hay dos casos:
        //   - la fila nunca llegó a tener orden → no hay nada que matar, se cierra y se rehace;
        //   - la fila tiene orden → se le pregunta a Mercado Pago. Si sigue viva, lo correcto
        //     NO es cerrarla sino REUSARLA, que es mandar a la persona al pago que ya tiene
        //     abierto; si está vencida, cancelada o fallida, ahí sí se cierra.
        const hastaIso = desdeIso;
        let vencida = null;
        try {
          vencida = await buscarCompraAbierta(env.VYC_PEDIDOS, { dominio, correo, hastaIso });
        } catch { vencida = null; }

        let cerrada = { movido: false };
        if (vencida && vencida.mp_order_id && env.MP_ACCESS_TOKEN) {
          const lectura = await leerOrdenMP(vencida.mp_order_id, env.MP_ACCESS_TOKEN);
          const estadoOrden = lectura.ok && lectura.orden ? lectura.orden.status : null;
          if (lectura.ok && !ORDEN_MUERTA.has(String(estadoOrden))) {
            // Sigue viva: se reusa. El `crearOrdenMP` de más abajo manda su id como clave de
            // idempotencia y Mercado Pago devuelve esa misma orden con su enlace.
            console.log(`[pedido] compra abierta ${vencida.id} sigue viva (${estadoOrden}): se reusa`);
            idPedido = vencida.id;
            puesto = { creado: false, reusado: true };
          } else if (!lectura.ok && lectura.estadoHttp !== 404) {
            // No se pudo preguntar. Antes que matar una orden que quizá está viva, se dice que
            // no se pudo y la persona reintenta. Es el lado seguro.
            console.log(`[pedido] no se pudo consultar la orden de ${vencida.id}: ${lectura.error}`);
            return jsonPost({ ok: false, motivo: 'no-se-pudo-consultar',
              detalle: 'No pudimos comprobar el estado de tu compra anterior. No se te cobró nada. Inténtalo de nuevo en un momento.' }, 409);
          }
        }

        if (vencida && !puesto.reusado) {
          try {
            cerrada = await marcarEstado(env.VYC_PEDIDOS, vencida.id, ESTADOS.CREADO, ESTADOS.RECHAZADO);
          } catch { cerrada = { movido: false }; }
          // Sin token ni datos de la persona: solo nuestro id, que es lo que permite seguirle
          // el rastro en la base. El correo no entra en los registros.
          console.log(`[pedido] compra abierta vencida ${vencida.id}: ${cerrada.movido ? 'cerrada' : 'no se pudo cerrar'}`);
        }

        if (cerrada.movido) {
          try { puesto = await insertar(); } catch { puesto = { creado: false }; }
        }

        if (!puesto.creado && !puesto.reusado) {
          // Ni insertó, ni hay reciente, ni se pudo liberar: acá sí no se puede saber qué pasó,
          // y seguir abriría una orden contra un pedido que no existe.
          return jsonPost({ ok: false, motivo: 'no-se-pudo-guardar',
          detalle: 'Tuvimos un problema al guardar tu pedido. No se te cobró nada. Vuelve a intentarlo.' }, 409);
        }
      }
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

  // Acá sí se cobra el intento: es la llamada saliente que el tope existe para proteger.
  if (kv && claveTope) {
    try { await contar(kv, claveTope, TOPE_PEDIDOS_IP_DIA, TTL_TOPE_S); } catch {}
  }

  const creada = await crearOrdenMP(orden, idPedido, env.MP_ACCESS_TOKEN);
  if (!creada.ok) {
    // El pedido se queda en `creado` SIN `mp_order_id`, y se devuelve 502. No se borra: la fila
    // es el único registro de que alguien intentó comprar, y `etapaDelPedido` ya distingue ese
    // caso para no decirle «estamos confirmando tu pago» a quien nunca llegó a la pasarela.
    //
    // ── POR QUÉ ESTO SE REGISTRA, Y POR QUÉ COSTÓ UN DÍA NO HABERLO HECHO ───────────────
    //
    // `crearOrdenMP` ya capturaba lo que Mercado Pago contesta, y acá se descartaba. El primer
    // pago de prueba real falló con este 502 en todos los intentos y NADIE pudo saber por qué:
    // ni en la respuesta, ni en los logs, ni desde el panel. Un error que no se puede
    // diagnosticar desde afuera obliga a adivinar, y adivinar sobre el camino del dinero es
    // exactamente lo que no se puede hacer.
    //
    // Se registra el código HTTP y el código/mensaje que devuelve Mercado Pago. **Nunca el
    // token ni el cuerpo entero**: el token es un secreto y el cuerpo lleva el correo del
    // comprador, y los registros de Cloudflare los puede leer cualquiera con acceso a la cuenta.
    const mp = creada.detalleMP || {};
    const resumenMP = [
      mp.error || mp.code || mp.type || null,
      mp.message || (Array.isArray(mp.errors) && mp.errors[0] && (mp.errors[0].message || mp.errors[0].code)) || null,
    ].filter(Boolean).join(' · ').slice(0, 300) || '(sin cuerpo)';
    console.log(`[pedido] Mercado Pago rechazó la orden ${idPedido}: ${creada.error} · ${resumenMP}`);

    return jsonPost({
      ok: false, motivo: 'no-se-pudo-abrir-el-pago', id: idPedido,
      // El código va en la respuesta a propósito. No le sirve a nadie para atacarnos —no se
      // puede llamar a Mercado Pago en nuestro nombre— y convierte un callejón sin salida en un
      // diagnóstico: `http-401` es un problema de credenciales y `http-400` es el cuerpo.
      codigo: creada.error || null,
      // ⚠️ EL TEXTO DEPENDE DE SI SABEMOS O NO. Decir «no se te cobró nada» es una afirmación
      // sobre la plata de alguien, y hay un caso en que no la podemos sostener: si la petición a
      // Mercado Pago se cortó por tiempo o por red, la orden PUEDE haberse creado del otro lado
      // y nosotros no llegamos a leer la respuesta. Ahí lo honesto es decir que no alcanzamos a
      // confirmarlo, no tranquilizar a alguien con algo que no sabemos.
      //
      // Cuando Mercado Pago sí contestó con un error (un 4xx), la orden no se creó y la frase
      // tranquilizadora es cierta.
      detalle: creada.estadoHttp > 0
        ? 'No pudimos abrir el pago en Mercado Pago. No se te cobró nada. Vuelve a intentarlo ' +
          'en un momento, y si te pasa de nuevo escríbenos con este enlace.'
        : 'No alcanzamos a confirmar el pago con Mercado Pago. Si ves un cargo, escríbenos con ' +
          'este enlace y lo revisamos de inmediato; si no ves nada, puedes volver a intentarlo.',
    // ⚠️ 409 Y NO 502, Y NO ES UN CAPRICHO.
    //
    // Cloudflare INTERCEPTA las respuestas 5xx que salen de una Function y las reemplaza por su
    // propia página de error, un `error code: 502` en texto plano. Comprobado en producción el
    // 24-oct: el mismo endpoint devuelve mi JSON con 400 y con 409, y con 502 devuelve la página
    // de Cloudflare. Consecuencia en cadena: el navegador no puede parsear eso, cae en el catch
    // del fetch, y le dice a la persona «revisa tu conexión» cuando la conexión estaba bien y el
    // problema era nuestro. Tres capas de mensaje equivocado por un código de estado.
    //
    // Que no se pueda abrir el pago es un conflicto con el estado de las cosas, no un error de
    // sintaxis de la petición, así que 409 tampoco es una mentira. El motivo y el código van en
    // el cuerpo, que es donde el navegador los lee.
    }, 409);
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
