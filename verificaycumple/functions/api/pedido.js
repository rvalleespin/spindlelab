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
import { ayudaDeAcceso } from './acceso.js';
import { chequear, normalizarDominio } from './chequeo.js';
import { clavesDeTope, contar, CACHE_HORAS } from './profundo.js';
import { elegibilidad } from './elegibilidad.js';
import {
  ESTADOS, nuevoIdPedido, congelarContrato, armarOrdenMP, limpiarUtms, VIGENCIA_ORDEN_HORAS,
  tieneReferenciaDePago,
  VERSION_POLITICA,
} from './pedidos.js';
import {
  crearOrdenMP, leerOrdenMP, decidirDesdeOrden, pagoDeLaOrden, ACCIONES, tacharCorreos,
} from './cobro.js';
import {
  crearPagoFlow, leerPagoFlow, decidirDesdeFlow, credencialesFlow, FALLOS_ANTES_DE_LA_RED,
} from './flow.js';
import { avisarVenta, avisarRevisar } from './aviso.js';
import { enviarCorreoDePago } from './correo.js';


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
/**
 * Qué pasarela abre los pagos NUEVOS.
 *
 * ── POR QUÉ ES CONMUTABLE Y NO UNA DECISIÓN ESCRITA EN EL CÓDIGO (29-oct-2026) ──────────
 *
 * Porque hoy ninguna de las dos puede cobrar, y por motivos distintos que se resuelven en
 * momentos distintos. Mercado Pago rechaza crear órdenes con un 403 de cuenta y contestó por
 * escrito que no tiene plazo. Flow funciona de punta a punta en el sandbox, pero cobrar de
 * verdad necesita una cuenta de producción que ellos tienen que aprobar.
 *
 * Con un `if` escrito en el código, el día que CUALQUIERA de las dos se destrabe habría que
 * programar, probar y desplegar para aprovecharlo. Con un dato, se cambia el dato.
 *
 * ⚠️ Esto NO es «dos constantes del mismo hecho»: el hecho es uno —quién cobra— y vive en un
 * solo lugar. Lo que hay son dos implementaciones de un mismo contrato.
 *
 * El valor por defecto es `flow` porque es la decisión que está tomada. Y un valor que no se
 * reconozca cae en Flow también, no en Mercado Pago: un `PASARELA` mal escrito no debería
 * mandar los cobros a la pasarela que sabemos bloqueada.
 */
export function pasarelaDe(env) {
  return String((env && env.PASARELA) || '').trim().toLowerCase() === 'mp' ? 'mp' : 'flow';
}

/**
 * Relee un pago contra la pasarela CON LA QUE SE ABRIÓ ESE PEDIDO, no contra la configurada hoy.
 *
 * ⚠️ La diferencia importa el día del cambio. Si se mira `PASARELA` en vez de la fila, todos
 * los pedidos abiertos con el proveedor anterior se preguntarían al nuevo, que no los conoce:
 * pagos reales quedando sin marcar justo durante la migración, que es cuando menos se mira.
 *
 * Por eso lo decide la referencia que el pedido tiene escrita, y por eso no hay una columna
 * con el nombre de la pasarela: la referencia ya lo dice.
 */
async function releerPago(env, pedido) {
  if (pedido.flow_token) {
    const credenciales = credencialesFlow(env);
    if (!credenciales.apiKey || !credenciales.secretKey) return null;
    const lectura = await leerPagoFlow(pedido.flow_token, credenciales);
    if (!lectura.ok) return { ok: false, error: lectura.error, estadoHttp: lectura.estadoHttp };
    // `redecidir` deja volver a preguntar con la MISMA vista del pago contra una fila que
    // cambió debajo. Va acá, y no en el llamador, porque es lo único que sabe qué proveedor
    // contestó: sin esto el llamador tendría que mirar la pasarela otra vez, que es el
    // acoplamiento que esta función existe para quitar.
    return {
      ok: true, extra: {},
      decision: decidirDesdeFlow({ pedido, pago: lectura.pago }),
      redecidir: (otro) => decidirDesdeFlow({ pedido: otro, pago: lectura.pago }),
    };
  }
  if (pedido.mp_order_id && env.MP_ACCESS_TOKEN) {
    const lectura = await leerOrdenMP(pedido.mp_order_id, env.MP_ACCESS_TOKEN);
    if (!lectura.ok) return { ok: false, error: lectura.error, estadoHttp: lectura.estadoHttp };
    const extra = { mp_order_id: lectura.orden.id || pedido.mp_order_id };
    const pago = pagoDeLaOrden(lectura.orden);
    if (pago && pago.id) extra.mp_payment_id = String(pago.id);
    return {
      ok: true, extra,
      decision: decidirDesdeOrden({ pedido, orden: lectura.orden }),
      redecidir: (otro) => decidirDesdeOrden({ pedido: otro, orden: lectura.orden }),
    };
  }
  return null;
}

async function reconciliar(env, pedido, esperar) {
  // Solo donde Mercado Pago puede saber algo que nosotros no. `convieneRefrescar` ya define
  // exactamente eso —`pendiente`, o `creado` con orden abierta— y es la misma regla que decide
  // si la pantalla se repregunta. Que sean la misma no es casualidad: preguntar cuando la
  // pantalla ya no espera nada sería gastar llamadas sin que nadie las mire.
  // Sirve para cualquier pasarela: lo que hace falta es que el pedido tenga una referencia con
  // la que preguntar, y `releerPago` elige el proveedor a partir de cuál tiene.
  if (!convieneRefrescar(pedido) || !tieneReferenciaDePago(pedido)) return pedido;

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

  const lectura = await releerPago(env, pedido);
  if (!lectura) return pedido;
  if (!lectura.ok) {
    console.log(`[pedido] no se pudo releer el pago de ${pedido.id}: ${lectura.error}`);
    return pedido;
  }

  const decision = lectura.decision;
  if (decision.accion !== ACCIONES.MARCAR) {
    // REVISAR es el caso que hay que poder ver: significa que la orden dice algo que no calza
    // con lo que vendimos, y eso lo tiene que mirar una persona.
    if (decision.accion === ACCIONES.REVISAR) {
      console.log(`[pedido] ${pedido.id} necesita revisión: ${decision.motivo}`);
    }
    return pedido;
  }

  const extra = { ...lectura.extra };
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

    const reintento = lectura.redecidir(actual);
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

  // La reconciliación también puede ser la que descubre una venta: si la notificación nunca
  // llegó, este es el único momento en que alguien se entera.
  if (estadoFinal === ESTADOS.PAGADO) {
    const pagado = { ...pedido, estado: estadoFinal, pagado_en: new Date().toISOString() };
    const envios = Promise.all([
      avisarVenta(pagado),
      enviarCorreoDePago(pagado, env.RESEND_API_KEY),
    ]);
    if (esperar) esperar(envios); else await envios;
  }
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
  pedido = await reconciliar(env, pedido,
    contexto.waitUntil ? (p) => contexto.waitUntil(p) : null);

  // La etapa se calcula UNA vez y se pasa: `ayudaDeAcceso` decide por sí misma si corresponde
  // devolver algo, y para eso necesita la etapa, no el pedido crudo. Ver el comentario de esa
  // función: la condición vive ahí y no acá, porque hay dos llamadores que tienen que decidir
  // idéntico y uno de los dos es el que atiende el momento en que la ayuda más se necesita.
  const etapa = etapaDelPedido(pedido);

  return json({
    ok: true,
    pedido: vistaPublica(pedido),
    etapa,
    señales: señalesDelPedido(pedido, TITULOS),
    acceso: ayudaDeAcceso(pedido, etapa),
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
      // ⚠️ El mensaje anterior decía «vuelve a correr el chequeo y compra desde ahí», y a
      // Ramón le salió JUSTO DESPUÉS de correr el chequeo: la página ofrece el botón con el
      // resultado rápido, que tarda un segundo, mientras la revisión con navegador tarda
      // veinte. Apretó rápido y recibió un consejo que describía lo que acababa de hacer.
      //
      // La causa se arregló en la página —el panel ahora espera a que la medición llegue— y
      // acá queda el respaldo, para quien llegue con un enlace viejo o con la medición ya
      // vencida. Por eso el texto nombra LAS DOS PARTES del chequeo: lo que falta no es
      // correrlo, es esperar la segunda.
      detalle: 'Todavía no tenemos la revisión con navegador de este sitio, y sin ella no ' +
        'podemos cotizar lo que no vimos. Corre el chequeo de nuevo y espera a que termine la ' +
        'segunda parte, la que abre tu sitio en un navegador. Desde ahí puedes comprar.',
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
      // La constancia del consentimiento se escribe ACÁ, que es el único punto donde se
      // comprobó que `consiento` venía en true. Ver `VERSION_POLITICA`.
      consentido_en: new Date().toISOString(),
      politica_version: VERSION_POLITICA,
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

        // ── LA MISMA PREGUNTA PARA FLOW, Y UN CASO QUE NO SE PUEDE COPIAR A CIEGAS ──────
        //
        // Reusar: el pago anterior sigue pendiente (Flow lo da por `1`), o sea que su enlace
        // todavía sirve y mandar a la persona ahí es mejor que abrirle un segundo cobro.
        //
        // Cerrar: el pago anterior fue rechazado. Ahí la fila no sirve para nada.
        //
        // ⚠️ **Y UN TERCER CASO QUE NO EXISTÍA CON EL OTRO PROVEEDOR: que el pago anterior
        // esté PAGADO.** Un pedido en `creado` cuyo pago Flow da por cobrado significa que la
        // confirmación no llegó o falló. Cerrarlo sería marcar como rechazada una venta que
        // entró, y la plata ya está del otro lado. Así que no se cierra: se deja la fila viva
        // para que la reconciliación de la pantalla o el aviso de revisión la recojan, y se le
        // abre un pago nuevo a la persona. Perder un cobro por no cerrar una fila es
        // recuperable; cerrar una venta cobrada no lo es.
        if (vencida && vencida.flow_token) {
          const lectura = await releerPago(env, vencida);
          if (lectura && lectura.ok) {
            const d = lectura.decision;
            if (d.accion === ACCIONES.NADA) {
              console.log(`[pedido] compra abierta ${vencida.id} sigue pendiente en Flow: se reusa`);
              idPedido = vencida.id;
              puesto = { creado: false, reusado: true };
            } else if (d.estado === ESTADOS.PAGADO) {
              // ── SU COMPRA ANTERIOR SÍ SE PAGÓ ─────────────────────────────────────────
              //
              // No se cierra, no se le abre un segundo cobro, y sobre todo NO se cae en el
              // 409 genérico de más abajo, que le diría «no se te cobró nada» a alguien a
              // quien la pasarela le cobró $177.310. Se le devuelve SU pedido.
              //
              // ⚠️ La versión anterior ponía `vencida = null` acá y dejaba seguir. El efecto
              // era el peor posible y no se veía leyéndolo: la venta seguía sin marcar, la
              // persona leía que no se le había cobrado, y CADA reintento repetía el mismo
              // 409 — quedaba bloqueada para comprar, indefinidamente. El comentario de este
              // bloque justificaba no cerrar la fila diciendo que «la reconciliación o el
              // aviso de revisión la recogen», y ninguna de las dos la recogía.
              console.log(`[pedido] compra abierta ${vencida.id} ya está pagada: no se abre otra`);
              const avisoPagada = avisarRevisar(vencida, d);
              if (contexto && contexto.waitUntil) contexto.waitUntil(avisoPagada); else await avisoPagada;
              return jsonPost({
                ok: false, motivo: 'ya-pagaste', id: vencida.id,
                detalle: 'Tu compra anterior sí se pagó, así que no te vamos a cobrar de nuevo. ' +
                  // ⚠️ `base` se declara MUCHO más abajo (es un `const` del mismo ámbito), así
                  // que acá reventaría en ejecución sin que `node --check` dijera nada.
                  `Puedes ver su estado acá: ${new URL(request.url).origin}/pedido/?id=${encodeURIComponent(vencida.id)} ` +
                  '— ya avisamos para que la revisemos.',
              }, 409);
            } else if (d.estado !== ESTADOS.RECHAZADO) {
              // Ni pendiente, ni pagada, ni rechazada: algo no calza (monto, estado sin
              // confirmar). No se toca la fila Y se avisa a una persona, que es la mitad que
              // faltaba: dejarla viva sin que nadie se entere es dejarla perdida.
              console.log(`[pedido] compra abierta ${vencida.id} NO se cierra: ${d.motivo}`);
              const avisoRaro = avisarRevisar(vencida, d);
              if (contexto && contexto.waitUntil) contexto.waitUntil(avisoRaro); else await avisoRaro;
              vencida = null;
            }
          } else if (lectura && !lectura.ok) {
            console.log(`[pedido] no se pudo consultar el pago de ${vencida.id}: ${lectura.error}`);
            return jsonPost({ ok: false, motivo: 'no-se-pudo-consultar',
              detalle: 'No pudimos comprobar el estado de tu compra anterior. No se te cobró nada. Inténtalo de nuevo en un momento.' }, 409);
          }
        } else if (vencida && vencida.mp_order_id && env.MP_ACCESS_TOKEN) {
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
  const pasarela = pasarelaDe(env);

  // ── FLOW ──────────────────────────────────────────────────────────────────────────────
  //
  // Va primero y sale por su cuenta, para no tocar una línea del camino de Mercado Pago, que
  // está probado y puede volver a ser el que cobre.
  if (pasarela === 'flow') {
    // El mismo cobro del tope que hace el otro camino, y en el mismo momento: justo antes de
    // la llamada saliente, que es lo que el tope existe para proteger.
    if (kv && claveTope) {
      try { await contar(kv, claveTope, TOPE_PEDIDOS_IP_DIA, TTL_TOPE_S); } catch {}
    }

    const creada = await crearPagoFlow({
      idPedido,
      correo,
      monto: MONTO_TOTAL,
      titulo: TITULO_KIT,
      urls: {
        // Server a server: acá Flow avisa el resultado, y es lo único que mueve el pedido.
        confirmacion: `${base}/api/flow-confirmacion`,
        // Y acá vuelve la PERSONA. No decide nada; solo la lleva a su pantalla.
        // ⚠️ No apunta a `/pedido/` directo porque Flow vuelve con un POST y esa página es
        // estática: Cloudflare contesta 405 con cero bytes. Ver `flow-vuelta.js`.
        vuelta: `${base}/api/flow-vuelta?id=${encodeURIComponent(idPedido)}`,
      },
      // La misma vigencia que la orden del otro proveedor, derivada de la misma constante: dos
      // pasarelas que caducan distinto serían dos reglas para el mismo trato.
      timeoutSegundos: VIGENCIA_ORDEN_HORAS * 3600,
    }, credencialesFlow(env));

    if (!creada.ok) {
      // El pedido se queda en `creado` SIN token. No se borra: la fila es el único registro de
      // que alguien intentó comprar, y `etapaDelPedido` ya distingue ese caso.
      //
      // Se registra el detalle que devuelve Flow —su `code` y su `message`— porque un error que
      // no se puede diagnosticar desde afuera obliga a adivinar. Nunca las credenciales, y los
      // correos tachados: el cuerpo es de ellos, pero una API que valida puede devolver el
      // campo que no le gustó, y el correo del comprador es uno de los que mandamos.
      let detalleFlow = '(sin cuerpo)';
      try { detalleFlow = tacharCorreos(JSON.stringify(creada.detalleFlow)).slice(0, 400); } catch {}
      console.log(`[pedido] Flow rechazó el pago ${idPedido}: ${creada.error} · ${detalleFlow}`);

      return jsonPost({
        ok: false, motivo: 'no-se-pudo-abrir-el-pago', id: idPedido,
        codigo: creada.error || null,
        // ⚠️ EL TEXTO DEPENDE DE SI SABEMOS O NO. «No se te cobró nada» es una afirmación sobre
        // la plata de alguien. Si la petición se cortó por tiempo o por red, el pago PUEDE
        // haberse creado del otro lado y no alcanzamos a leer la respuesta: ahí lo honesto es
        // decir que no lo pudimos confirmar, no tranquilizar con algo que no sabemos.
        // Se dice «no se te cobró nada» solo cuando es verdad: o la pasarela contestó con un
        // error (no creó nada), o el fallo fue nuestro y anterior a cualquier llamada. Un
        // `monto-invalido:…` también cuenta, por eso se compara el prefijo.
        detalle: (creada.estadoHttp > 0
          || FALLOS_ANTES_DE_LA_RED.has(creada.error)
          || String(creada.error || '').startsWith('monto-invalido'))
          ? 'No pudimos abrir el pago. No se te cobró nada. Vuelve a intentarlo en un momento, ' +
            'y si te pasa de nuevo escríbenos con este enlace.'
          : 'No alcanzamos a confirmar el pago. Si ves un cargo, escríbenos con este enlace y lo ' +
            'revisamos de inmediato; si no ves nada, puedes volver a intentarlo.',
      // 409 y no 502: Cloudflare reemplaza los 5xx de una Function por su propia página de
      // texto plano, el navegador no la puede parsear y la persona termina leyendo «revisa tu
      // conexión» cuando el problema era nuestro.
      }, 409);
    }

    try {
      // `creado → creado` es una transición válida a propósito, y existe exactamente para esto.
      await marcarEstado(env.VYC_PEDIDOS, idPedido, ESTADOS.CREADO, ESTADOS.CREADO, {
        flow_token: String(creada.token),
      });
    } catch {
      // El pago ya existe y la persona puede pagar; no guardar el token es molesto, no grave:
      // la confirmación encuentra el pedido por `commerceOrder`, no por esta columna.
    }

    // ⚠️ La clave se sigue llamando `checkout_url` a propósito: es el contrato con la página,
    // que ya la lee con ese nombre. Renombrarla acá obligaría a tocar el navegador para no
    // ganar nada, y es el tipo de cambio que rompe el checkout sin que ninguna prueba lo vea.
    return jsonPost({ ok: true, id: idPedido, checkout_url: creada.destino });
  }

  // ── MERCADO PAGO ──────────────────────────────────────────────────────────────────────
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
    // 409 y no 500, por una razón de pantalla y no de semántica: Cloudflare reemplaza los 5xx
    // de una Function por su propia página de texto plano, así que el navegador recibiría eso
    // en vez del JSON que espera, y la persona vería un error en inglés sin nada que hacer.
    // El 500 era además el único punto del checkout que contradecía la promesa de no devolver
    // 5xx nunca. Se registra para que no quede invisible: esto es un fallo nuestro, no suyo.
    console.log(`[pedido] no se pudo armar la orden ${idPedido}: ${(e && e.message) || e}`);
    return jsonPost({ ok: false, motivo: 'orden-invalida',
      detalle: 'Tuvimos un problema al preparar tu pago. No se te cobró nada. Vuelve a intentarlo.' }, 409);
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

    // ── Y EL SOBRE, QUE ES LO QUE SOPORTE PIDE (27-oct-2026) ──────────────────────────
    //
    // El resumen de arriba sirve para leer de un vistazo qué pasó. Esto sirve para OTRA cosa:
    // que Mercado Pago pueda encontrar su propio registro de esa llamada. Su soporte lo pidió
    // textualmente —«compartan el x-request-id y el body/HTTP conservados de ese intento»— y
    // no lo teníamos, así que hubo que desplegar para poder contestar una pregunta.
    //
    // ⚠️ Los correos se tachan. Este es el cuerpo que devuelve MERCADO PAGO, no el nuestro,
    // así que normalmente no lleva datos del comprador; pero una API que valida puede
    // devolver el campo que no le gustó, y `payer.email` es uno de los que mandamos. Tachar
    // cuesta nada y el diagnóstico no se pierde: lo que importa es el código, no quién compró.
    let sobre = '(sin cuerpo)';
    try { sobre = tacharCorreos(JSON.stringify(creada.detalleMP)).slice(0, 900); } catch {}
    console.log(`[pedido] x-request-id de Mercado Pago: ${creada.requestIdMP || '(no vino)'} · cuerpo: ${sobre}`);

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
