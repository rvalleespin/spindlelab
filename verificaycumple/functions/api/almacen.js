/**
 * Guardar y leer pedidos. Es la única parte del cobro que habla con la base.
 *
 * Todo lo que recibe `db` espera la interfaz de D1:
 *   db.prepare(sql).bind(...).run()    → { meta: { changes } }
 *   db.prepare(sql).bind(...).first()  → la primera fila, o null
 *
 * Se escribió contra esa interfaz y se prueba contra SQLite de verdad (el `node:sqlite` que
 * trae Node 24, con un adaptador de cuatro líneas). No es un simulacro: es el mismo motor que
 * corre debajo de D1, con el mismo esquema, así que lo que pasa en la prueba pasa en producción.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * LAS DOS COSAS QUE ESTE ARCHIVO TIENE QUE GARANTIZAR
 *
 * 1. QUE UN EVENTO SE PROCESE UNA SOLA VEZ. Mercado Pago reintenta ocho veces y el panel tiene
 *    botón de reenviar, así que la misma notificación va a llegar varias veces, a veces a la
 *    vez. La defensa no es un `if` en el handler —entre leer y escribir cabe otro proceso—
 *    sino la clave primaria de `eventos_mp` y un `INSERT OR IGNORE`: la base decide quién
 *    llegó primero, y el segundo se entera porque no cambió ninguna fila.
 *
 * 2. QUE EL ESTADO NO SE PISE. `marcarEstado` lleva el estado que espera encontrar en el
 *    `WHERE`. Si otro proceso ya lo movió, el UPDATE no toca nada y devuelve `movido: false`
 *    en vez de sobrescribir. Comprobar antes con un SELECT y después escribir deja una ventana
 *    por la que se cuela el reintento; esto no la deja.
 */

import { ESTADOS, transicionValida } from './pedidos.js';
import { hayQueEntrarAlSitio } from './etapas.js';

/** Las columnas que se escriben al crear. En un solo lugar, para que el INSERT no se desfase. */
const COLUMNAS_CREAR = [
  'id', 'creado_en', 'estado', 'dominio', 'url_medida',
  'senales_contratadas', 'senales_fuera', 'informe_json', 'monto_neto', 'monto_total',
  'correo', 'consentido_en', 'politica_version', 'mp_order_id', 'flow_token',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
];

/**
 * Crea el pedido. El estado inicial siempre es `creado`: no se acepta desde afuera, porque
 * nacer pagado no es algo que el cliente pueda pedir.
 */
export async function crearPedido(db, datos) {
  const fila = {
    id: datos.id,
    creado_en: datos.creado_en || new Date().toISOString(),
    estado: ESTADOS.CREADO,
    dominio: datos.dominio,
    url_medida: datos.url_medida ?? null,
    senales_contratadas: JSON.stringify(datos.senales_contratadas || []),
    senales_fuera: JSON.stringify(datos.senales_fuera || []),
    informe_json: datos.informe_json,
    monto_neto: datos.monto_neto,
    monto_total: datos.monto_total,
    correo: datos.correo,
    // ⚠️ NO llevan valor por defecto A PROPÓSITO. Si `crearPedido` pusiera la fecha solo,
    // cualquier camino que llegara acá quedaría diciendo que hubo consentimiento, lo haya
    // comprobado o no. Una constancia que se escribe sola no es constancia: es decoración.
    // Quien valida el consentimiento es quien tiene que pasarlos, y hay una prueba de eso.
    consentido_en: datos.consentido_en ?? null,
    politica_version: datos.politica_version ?? null,
    mp_order_id: datos.mp_order_id ?? null,
    // Igual que arriba: ambas nacen en null y la que se llene dice con que pasarela se abrio.
    flow_token: datos.flow_token ?? null,
    utm_source: datos.utm_source ?? null,
    utm_medium: datos.utm_medium ?? null,
    utm_campaign: datos.utm_campaign ?? null,
    utm_content: datos.utm_content ?? null,
    utm_term: datos.utm_term ?? null,
  };
  const huecos = COLUMNAS_CREAR.map(() => '?').join(', ');
  // `OR IGNORE` por el índice parcial único (dominio, correo) sobre los pedidos en `creado`: si
  // otra petición simultánea ya abrió una compra para esa pareja, esta no inserta y lo dice, en
  // vez de reventar o de crear una segunda orden pagable. Quien llama tiene que mirar `creado`.
  const r = await db.prepare(
    `INSERT OR IGNORE INTO pedidos (${COLUMNAS_CREAR.join(', ')}) VALUES (${huecos})`,
  ).bind(...COLUMNAS_CREAR.map((c) => fila[c])).run();
  const cambios = (r && r.meta && r.meta.changes) || 0;
  return { ...fila, creado: cambios > 0 };
}

/** Devuelve el pedido con las listas ya deserializadas, o null. */
export async function leerPedido(db, id) {
  if (!id) return null;
  const f = await db.prepare('SELECT * FROM pedidos WHERE id = ?').bind(id).first();
  return f ? hidratar(f) : null;
}

/** Busca el pedido por el id de pago de Mercado Pago. Lo usa el webhook. */
export async function buscarPorPago(db, mpPaymentId) {
  if (!mpPaymentId) return null;
  const f = await db.prepare('SELECT * FROM pedidos WHERE mp_payment_id = ?')
    .bind(String(mpPaymentId)).first();
  return f ? hidratar(f) : null;
}

/** Las dos columnas que viajan como JSON vuelven como lista. El resto se deja tal cual. */
function hidratar(f) {
  const leer = (t) => { try { return JSON.parse(t || '[]'); } catch { return []; } };
  return {
    ...f,
    senales_contratadas: leer(f.senales_contratadas),
    senales_fuera: leer(f.senales_fuera),
  };
}

/**
 * Mueve el estado del pedido, comprobando la transición y sin pisar a nadie.
 *
 * El `WHERE ... AND estado = ?` es lo que hace esto seguro: si entre que leímos y escribimos
 * otro proceso ya movió el pedido, el UPDATE no encuentra la fila y no cambia nada. Devuelve
 * `{ movido: false, motivo: 'ya-se-movio' }` en vez de sobrescribir.
 *
 * `extra` solo acepta las columnas de la lista blanca. No se arma SQL con nombres que vengan
 * de afuera.
 */
const EXTRA_PERMITIDO = new Set([
  'mp_payment_id', 'mp_order_id', 'flow_token', 'pagado_en', 'entregado_en', 'informe_final_json',
  // El borrador de la política viaja por acá y no por `guardarIntake`, y la diferencia es
  // quién escribe: el intake lo escribe el cliente con su enlace, y esto lo escribimos
  // nosotros en la misma transacción que marca la entrega. Un borrador que el comprador
  // pudiera reemplazar no sería la constancia de lo que se le entregó.
  'borrador_politica',
]);

/**
 * Deja escrito que al cliente se le AVISÓ que su trabajo empezó, y cuándo.
 *
 * ── POR QUÉ ES UNA COLUMNA Y NO UNA DEDUCCIÓN (3-nov-2026) ───────────────────────────────
 *
 * El artículo 5 del Decreto 52 de 2024 del Ministerio de Economía dice que la prestación de
 * un servicio contratado a distancia se entiende iniciada «desde el momento en que el
 * proveedor notifique esta circunstancia al consumidor». No desde que empezamos a trabajar:
 * desde que se lo decimos. Mientras no se lo digamos, su derecho a retracto sigue abierto
 * aunque el trabajo esté hecho.
 *
 * O sea que la fecha que importa no se puede deducir de `acceso_recibido_en` ni de ninguna
 * otra columna existente: ninguna de ellas dice que la persona se enteró. Y es una fecha que
 * algún día puede haber que mostrarle a un tercero, así que tiene que estar escrita.
 *
 * ⚠️ EL `IS NULL` DEL WHERE ES LA REGLA, NO UNA OPTIMIZACIÓN. Si dos envíos simultáneos
 * mandan los dos el aviso, el primero que escriba se queda con la fecha y el segundo no la
 * pisa. Queremos la MÁS TEMPRANA de las dos, porque es la que cierra el plazo antes y es la
 * que de verdad ocurrió primero: quedarse con la última le recortaría días al comprador.
 *
 * ⚠️ Y SOLO SOBRE UN PEDIDO PAGADO. Avisar el inicio de una prestación que nadie compró no
 * significa nada, y dejar la fecha escrita en un pedido que después se paga arrancaría su
 * plazo antes de que existiera.
 */
export async function marcarInicioAvisado(db, id, cuando) {
  if (!id || !cuando) return { anotado: false, motivo: 'sin-datos' };
  const r = await db.prepare(
    `UPDATE pedidos SET inicio_avisado_en = ?
      WHERE id = ? AND inicio_avisado_en IS NULL AND estado = ?`,
  ).bind(String(cuando), id, ESTADOS.PAGADO).run();
  const cambios = (r && r.meta && r.meta.changes) || 0;
  return cambios > 0
    ? { anotado: true, motivo: 'ok', cuando: String(cuando) }
    : { anotado: false, motivo: 'ya-estaba-o-no-corresponde' };
}

/**
 * Corrige el borrador de un pedido YA ENTREGADO, y nada más que eso.
 *
 * ── POR QUÉ EXISTE (4-nov-2026) ───────────────────────────────────────────────────────────
 *
 * En la primera entrega real salió un borrador con formato equivocado, y no había forma de
 * arreglarlo: `/api/entregar` corta en seco cuando el pedido ya está `entregado` y contesta
 * `ya_estaba: true` sin tocar ninguna columna. La copia del cliente quedaba congelada con el
 * error, en su pantalla, para siempre. Lo único que se podía hacer era mandarle otro texto por
 * correo mientras su pantalla seguía mostrando el malo.
 *
 * Para un producto cuyo entregable central es un documento, eso no se sostiene: una errata, un
 * RUT mal copiado o un dato cambiado por el abogado son casos normales, no excepciones.
 *
 * **Solo toca esta columna.** No mueve el estado, no escribe `entregado_en`, no toca el informe
 * final y no manda ningún correo. Corregir un texto no es volver a entregar, y hacerle creer al
 * cliente que hubo trabajo nuevo sería peor que el error que se está arreglando.
 *
 * El `WHERE ... estado = 'entregado'` no es decorativo: en `pagado` el camino normal ya guarda
 * el borrador, y dejar dos puertas a la misma columna es cómo se separan.
 */
export async function corregirBorrador(db, id, texto) {
  if (!id || !texto) return { corregido: false, motivo: 'sin-datos' };
  const r = await db.prepare(
    'UPDATE pedidos SET borrador_politica = ? WHERE id = ? AND estado = ?',
  ).bind(String(texto), id, ESTADOS.ENTREGADO).run();
  const cambios = (r && r.meta && r.meta.changes) || 0;
  return cambios > 0
    ? { corregido: true, motivo: 'ok', largo: String(texto).length }
    : { corregido: false, motivo: 'no-esta-entregado' };
}

/**
 * El pedido en `creado` más nuevo de una pareja (dominio, correo), dentro de una ventana.
 *
 * ── POR QUÉ HACE FALTA ───────────────────────────────────────────────────────────────────
 *
 * Es la defensa contra el doble clic, y hace falta porque la clave de idempotencia de Mercado
 * Pago **no alcanza sola**. Esa clave protege contra que repitamos la MISMA petición; un doble
 * clic manda DOS, y si cada una generara su propio id de pedido, cada una traería su propia
 * clave y Mercado Pago crearía dos órdenes. Dos cobros posibles por el mismo kit.
 *
 * Deshabilitar el botón en el navegador no sirve como defensa: el navegador puede mentir, o
 * simplemente la segunda petición ya salió. La defensa tiene que estar de este lado.
 *
 * Con esto, la segunda petición encuentra el pedido de la primera y **reusa su id** como clave,
 * y ahí sí la idempotencia hace su trabajo: Mercado Pago devuelve la orden que ya existía.
 *
 * `desdeIso` acota la ventana. No se busca «cualquier pedido en creado de esta persona» porque
 * entonces alguien que lo intentó la semana pasada y abandonó nunca podría volver a comprar:
 * quedaría reusando para siempre una orden vencida.
 *
 * El filtro va sobre `estado` y `creado_en`, que es justo el índice que ya existe
 * (`idx_pedidos_estado`). El `dominio` y el `correo` se comparan sobre el resultado.
 */
export async function buscarPedidoReciente(db, { dominio, correo, desdeIso } = {}) {
  if (!dominio || !correo || !desdeIso) return null;
  const f = await db.prepare(
    `SELECT * FROM pedidos
      WHERE estado = ? AND creado_en >= ? AND dominio = ? AND correo = ?
      ORDER BY creado_en DESC LIMIT 1`,
  ).bind(ESTADOS.CREADO, desdeIso, String(dominio), String(correo)).first();
  return f ? hidratar(f) : null;
}

/**
 * La compra abierta de esta pareja (dominio, correo) que es MÁS VIEJA que `hastaIso`.
 *
 * Existe porque el índice `idx_pedidos_compra_abierta` y `buscarPedidoReciente` no cubren lo
 * mismo, y esa asimetría dejaba gente fuera para siempre: el índice garantiza UNA compra
 * abierta por pareja sin mirar su edad, pero la búsqueda que la recupera solo mira las últimas
 * `VIGENCIA_ORDEN_HORAS`. En el hueco entre las dos, un pedido viejo atascado en `creado`
 * bloqueaba el INSERT y nadie podía encontrarlo para resolverlo: la persona recibía
 * «no se te cobró nada. Vuelve a intentarlo» en cada intento, por el resto de los tiempos.
 *
 * ⚠️ El piso `hastaIso` tampoco es cosmético. Sin él, dos peticiones simultáneas de la misma
 * pareja podían terminar con la segunda CERRANDO la fila que la primera acababa de crear: la
 * segunda choca contra el índice, no encuentra nadie «reciente» por una diferencia de
 * milisegundos, y entonces esta consulta le devolvía esa misma fila nueva como si fuera vieja.
 * Con el piso, solo puede devolver lo que de verdad quedó fuera de la ventana.
 *
 * ⚠️ El filtro `estado = 'creado'` NO es un detalle de rendimiento, es seguridad: sin él esta
 * consulta podría devolver el pedido PAGADO de otra persona que comparte dominio y correo, y
 * con él su enlace privado. Es el mismo motivo por el que lo lleva `buscarPedidoReciente`.
 */
export async function buscarCompraAbierta(db, { dominio, correo, hastaIso } = {}) {
  if (!dominio || !correo || !hastaIso) return null;
  const f = await db.prepare(
    `SELECT * FROM pedidos
      WHERE estado = ? AND creado_en < ? AND dominio = ? AND correo = ?
      ORDER BY creado_en DESC LIMIT 1`,
  ).bind(ESTADOS.CREADO, String(hastaIso), String(dominio), String(correo)).first();
  return f ? hidratar(f) : null;
}

export async function marcarEstado(db, id, desde, hasta, extra = {}) {
  if (!transicionValida(desde, hasta)) {
    return { movido: false, motivo: 'transicion-invalida' };
  }
  const cols = Object.keys(extra).filter((c) => EXTRA_PERMITIDO.has(c));
  const sets = ['estado = ?', ...cols.map((c) => `${c} = ?`)];
  const vals = [hasta, ...cols.map((c) => extra[c]), id, desde];

  const r = await db.prepare(
    `UPDATE pedidos SET ${sets.join(', ')} WHERE id = ? AND estado = ?`,
  ).bind(...vals).run();

  const cambios = (r && r.meta && r.meta.changes) || 0;
  return cambios > 0
    ? { movido: true, motivo: 'ok' }
    : { movido: false, motivo: 'ya-se-movio' };
}

/**
 * Cuánto puede quedar un reclamo sin terminar antes de que otro intento se lo pueda llevar.
 *
 * El calendario de reintentos de Mercado Pago es 0, 15 min, 30 min, 6 h, 48 h, 96 h, 96 h,
 * 96 h. Con diez minutos, el reintento de los 15 ya puede rescatar un reclamo abandonado, que
 * es el primero que llega y el que más importa.
 *
 * El riesgo de una ventana corta sería que dos intentos procesaran a la vez, y está cubierto
 * aparte: `marcarEstado` lleva el estado esperado en el WHERE, así que el segundo encuentra el
 * pedido ya movido y reporta `ya-se-movio` sin tocar nada. Y nuestro propio handler tarda
 * segundos, no minutos: el tope que Mercado Pago anuncia en `x-socket-timeout` son 22.000 ms.
 */
export const VENTANA_RECLAMO_MS = 10 * 60 * 1000;

/**
 * Registra que llegó un evento, y dice si es la PRIMERA vez.
 *
 * Acá está la idempotencia de verdad. `INSERT OR IGNORE` sobre una clave primaria es atómico:
 * si dos reintentos llegan al mismo tiempo, uno inserta y el otro no cambia nada. El que no
 * cambió nada recibe `primeraVez: false` y no hace el trabajo de nuevo.
 *
 * Lo que NO se hace: leer primero y escribir después. Entre las dos operaciones cabe el otro
 * reintento, y los dos se creerían el primero.
 *
 * ── EL RECLAMO ABANDONADO (24-oct-2026) ──────────────────────────────────────────────────
 *
 * Reclamar y no terminar deja el evento muerto. El handler suelta el reclamo cuando el
 * trabajo falla de forma recuperable, pero soltarlo es un DELETE contra la misma base cuyo
 * fallo disparó la liberación: en el caso típico —D1 con un hipo— el DELETE falla también, y
 * entonces el reintento ve el evento registrado, contesta «repetido» y se va. El cliente pagó
 * y el pedido se queda en `creado` para siempre, sin rastro en ninguna parte.
 *
 * Por eso el reclamo ahora VENCE, y no se confía en que la liberación haya salido bien.
 *
 * El invariante que lo hace posible ya existía: **toda salida terminada del handler pasa por
 * `anotarResultado`**, así que una fila con `resultado IS NULL` es, por construcción, un
 * reclamo que nadie terminó. Si además está vieja, se puede volver a reclamar.
 *
 * El re-reclamo es un UPDATE con la condición adentro (`WHERE id = ? AND resultado IS NULL AND
 * recibido_en < ?`) y se mira `changes`, así que sigue siendo atómico: de dos reintentos
 * simultáneos, uno se lleva la fila y el otro ve `changes = 0`.
 *
 * ⚠️ La comparación de fechas se hace **entre cadenas ISO de JavaScript**, no con las funciones
 * de fecha de SQLite. No es un capricho: `recibido_en` se guarda con `toISOString()`
 * (`2026-10-24T01:40:17.697Z`) y `datetime('now','-10 minutes')` devuelve
 * `2026-10-24 01:40:17`, con un espacio donde el otro tiene una `T`. Como `'T'` (0x54) es mayor
 * que `' '` (0x20), **toda fila del mismo día compararía mayor** y el vencimiento no se
 * activaría nunca. Con las dos puntas en el mismo formato de ancho fijo, el orden
 * lexicográfico de ISO-8601 en UTC es el orden cronológico y la comparación es exacta.
 */
export async function registrarEvento(
  db, clave, { tipo = null, pedidoId = null, resultado = null, ahoraMs = null } = {},
) {
  if (!clave) return { primeraVez: false, motivo: 'sin-clave' };
  const ahora = ahoraMs === null ? Date.now() : ahoraMs;
  const r = await db.prepare(
    'INSERT OR IGNORE INTO eventos_mp (id, recibido_en, tipo, pedido_id, resultado) VALUES (?, ?, ?, ?, ?)',
  ).bind(clave, new Date(ahora).toISOString(), tipo, pedidoId, resultado).run();
  if (((r && r.meta && r.meta.changes) || 0) > 0) {
    return { primeraVez: true, motivo: 'nuevo' };
  }

  // No entró: la fila ya estaba. ¿Es un reclamo que alguien abandonó?
  const corte = new Date(ahora - VENTANA_RECLAMO_MS).toISOString();
  const re = await db.prepare(
    'UPDATE eventos_mp SET recibido_en = ? WHERE id = ? AND resultado IS NULL AND recibido_en < ?',
  ).bind(new Date(ahora).toISOString(), clave, corte).run();
  if (((re && re.meta && re.meta.changes) || 0) > 0) {
    return { primeraVez: true, motivo: 'reclamo-vencido' };
  }

  return { primeraVez: false, motivo: 'repetido' };
}

/**
 * Suelta un evento que se había reclamado pero no se pudo procesar.
 *
 * POR QUÉ HACE FALTA. `registrarEvento` es un reclamo: el primero que llega se queda con el
 * evento y los reintentos se van. Eso está bien mientras el trabajo salga. Pero si entre el
 * reclamo y el trabajo algo falla de forma recuperable —la API de Mercado Pago no contesta,
 * por ejemplo— el evento queda reclamado y NUNCA procesado: el reintento llega, ve que ya
 * está registrado, y se va sin hacer nada.
 *
 * Es la forma más silenciosa de perder un pago. Por eso, cuando el fallo es de los que un
 * reintento podría arreglar, se suelta la fila y se contesta un error para que Mercado Pago
 * vuelva a intentar.
 */
export async function liberarEvento(db, clave) {
  if (!clave) return { soltado: false, motivo: 'sin-clave' };
  try {
    await db.prepare('DELETE FROM eventos_mp WHERE id = ?').bind(clave).run();
    return { soltado: true, motivo: 'ok' };
  } catch (e) {
    // El error se traga —no hay nada mejor que hacer con él acá— pero NO se oculta al que
    // llama. Antes esta función no devolvía nada, así que el handler contestaba 503 creyendo
    // que había soltado el reclamo cuando no. Y el caso en que el DELETE falla es justamente
    // el típico: se llama porque la base falló, así que la base ya está caída.
    //
    // Que el reclamo se recupere igual lo resuelve el vencimiento de `registrarEvento`; esto
    // es para que la respuesta no mienta y el motivo se pueda leer en el registro de entregas
    // de Mercado Pago y en `wrangler pages deployment tail`, que es toda la observabilidad que
    // hay.
    return { soltado: false, motivo: `no-se-pudo-soltar:${(e && e.message) || 'error'}` };
  }
}

/** Deja escrito cómo terminó un evento, para poder depurar después. */
export async function anotarResultado(db, clave, resultado) {
  if (!clave) return { anotado: false, motivo: 'sin-clave' };
  // Es una nota de auditoría: no puede tumbar la respuesta del handler ni cambiar lo que se le
  // contesta a Mercado Pago. Antes iba a pelo, y sus cuatro llamadas en el handler están fuera
  // de todo try, así que un hipo de D1 en el camino feliz —con el pedido YA marcado como
  // pagado— se convertía en un 500 y Mercado Pago lo reintentaba ocho veces sobre un trabajo
  // que ya estaba hecho.
  try {
    await db.prepare('UPDATE eventos_mp SET resultado = ? WHERE id = ?')
      .bind(String(resultado).slice(0, 200), clave).run();
    return { anotado: true, motivo: 'ok' };
  } catch (e) {
    return { anotado: false, motivo: `no-se-pudo-anotar:${(e && e.message) || 'error'}` };
  }
}

/**
 * Los datos que se piden DESPUÉS del pago: facturación, plataforma y el aviso de que llegó el
 * acceso.
 *
 * Solo se aceptan sobre un pedido ya pagado. Antes del pago no hay por qué tenerlos, y
 * aceptarlos sería guardar datos de alguien que todavía no compró.
 */
const INTAKE_PERMITIDO = new Set([
  'razon_social', 'rut', 'giro', 'direccion', 'plataforma', 'acceso_recibido_en',
]);

export async function guardarIntake(db, id, datos) {
  const cols = Object.keys(datos || {}).filter((c) => INTAKE_PERMITIDO.has(c));
  if (!cols.length) return { guardado: false, motivo: 'sin-campos' };

  const sets = cols.map((c) => `${c} = ?`).join(', ');
  const vals = [...cols.map((c) => datos[c]), id];

  // El `IN` del WHERE es la regla: solo sobre un pedido que ya pagó.
  const r = await db.prepare(
    `UPDATE pedidos SET ${sets} WHERE id = ? AND estado IN ('${ESTADOS.PAGADO}', '${ESTADOS.ENTREGADO}')`,
  ).bind(...vals).run();

  const cambios = (r && r.meta && r.meta.changes) || 0;
  return cambios > 0
    ? { guardado: true, motivo: 'ok', campos: cols }
    : { guardado: false, motivo: 'no-pagado-o-no-existe' };
}

/**
 * Lo que se le puede mostrar a quien abre su pedido.
 *
 * Deja fuera el informe completo y los datos de facturación: para la pantalla de estado no
 * hacen falta, y lo que no se manda no se puede filtrar.
 */
export function vistaPublica(pedido) {
  if (!pedido) return null;
  return {
    id: pedido.id,
    estado: pedido.estado,
    creado_en: pedido.creado_en,
    dominio: pedido.dominio,
    url_medida: pedido.url_medida,
    senales_contratadas: pedido.senales_contratadas,
    senales_fuera: pedido.senales_fuera,
    monto_total: pedido.monto_total,
    pagado_en: pedido.pagado_en,
    // Cuándo se le avisó que el trabajo empezaba. Va a la pantalla porque las condiciones de
    // venta dicen, literal, que queda anotado ahí con su fecha: es el dato del que depende su
    // plazo para retractarse, así que no puede vivir solo en nuestra base.
    inicio_avisado_en: pedido.inicio_avisado_en,
    entregado_en: pedido.entregado_en,
    // ── EL BORRADOR VIAJA, Y ES LA ÚNICA FORMA EN QUE LLEGA SIN DEPENDER DE UN CORREO ─────
    //
    // El resto de esta vista es deliberadamente flaca: deja fuera el informe congelado y los
    // datos de facturación porque la pide quien tenga el enlace y lo que no se manda no se
    // puede filtrar. El borrador es el caso contrario: es LO QUE SE COMPRÓ, escrito para esa
    // persona, y hasta hoy no tenía ningún camino hasta ella. Si un correo no sale, el texto
    // tiene que seguir estando en su pantalla.
    borrador_politica: pedido.borrador_politica,
    // ── LA SEGUNDA VERDAD QUE DECÍA QUE SÍ (3-nov-2026) ───────────────────────────────
    //
    // Esto calculaba su propio criterio —«pagado y sin acceso»— sin mirar QUÉ se contrató, y
    // desde que `politica` entra sola al kit (decisión del 2-nov) eso es falso: a quien solo
    // compró el borrador de su política no hay que entrar a su sitio, así que su pedido pasa
    // por `redactando` y nunca por `falta-acceso`. Medido: con el contrato `["politica"]`,
    // `etapaDelPedido` decía `redactando` y este campo decía `falta_acceso: true` a la vez.
    //
    // Y no era un dato interno: `vistaPublica` es lo que devuelven `/api/pedido`,
    // `/api/intake` y `/api/entregar`, o sea que el campo falso VIAJABA AL NAVEGADOR del
    // cliente en cada respuesta. Hoy no lo lee nadie; mañana alguien lo lee y le pide a un
    // comprador un acceso que su compra no necesita.
    //
    // Se arregla consultando la MISMA función que decide la etapa, no copiando su regla acá.
    // Dos listas del mismo hecho se contradicen en silencio, que es justo lo que pasó.
    falta_acceso: pedido.estado === ESTADOS.PAGADO
      && hayQueEntrarAlSitio(pedido)
      && !pedido.acceso_recibido_en,
  };
}

/**
 * La cola de trabajo: los pedidos más nuevos primero, con lo que hace falta para atenderlos.
 *
 * ⚠️ ESTA NO ES `vistaPublica`, Y LA DIFERENCIA ES EL PUNTO. Esa deja fuera el correo del
 * cliente y sus datos de facturación porque la pide quien tenga el enlace del pedido. Esta la
 * pide quien tiene `CLAVE_ENTREGA`, o sea nosotros, y son justamente esos campos los que
 * obligaban a abrir la base de producción a mano: el id completo para poder cerrar el pedido,
 * el correo para escribirle, y la razón social con su RUT para emitir la factura.
 *
 * Lo que sí queda fuera es `informe_json`, el informe entero congelado: pesa más que todo el
 * resto junto y para decidir a quién atender no aporta nada. `informe_final_json` sí se lee,
 * porque `etapaDelPedido` lo necesita para saber si la entrega llevó medición nueva; quien
 * llama decide si lo devuelve o no.
 *
 * Columnas explícitas y no `*`: lo que no se pide no se puede filtrar después por olvido.
 */
export async function listarPedidos(db, { estado, tope } = {}) {
  // Ninguna consulta sin techo. El tope se acota en los dos extremos en vez de confiar en
  // quien llama, porque `?tope=999999` es un parámetro de la URL y lo escribe cualquiera.
  const limite = Math.min(Math.max(Math.floor(Number(tope)) || 25, 1), 200);

  const cols = [
    'id', 'estado', 'creado_en', 'dominio', 'url_medida', 'correo',
    'senales_contratadas', 'senales_fuera', 'monto_total',
    'mp_order_id', 'flow_token', 'pagado_en',
    'razon_social', 'rut', 'giro', 'direccion', 'plataforma', 'acceso_recibido_en',
    // Se lee para poder ver de un vistazo a quién le falta el aviso de inicio: un pedido en
    // curso sin esta fecha es uno al que todavía le corre el plazo de retracto entero.
    'inicio_avisado_en',
    'entregado_en', 'informe_final_json',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  ].join(', ');

  // El índice `idx_pedidos_estado (estado, creado_en)` cubre las dos formas de la consulta.
  const sql = estado
    ? `SELECT ${cols} FROM pedidos WHERE estado = ? ORDER BY creado_en DESC LIMIT ?`
    : `SELECT ${cols} FROM pedidos ORDER BY creado_en DESC LIMIT ?`;

  const r = await db.prepare(sql).bind(...(estado ? [estado, limite] : [limite])).all();
  return (r && r.results) || [];
}
