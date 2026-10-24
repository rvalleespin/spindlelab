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

/** Las columnas que se escriben al crear. En un solo lugar, para que el INSERT no se desfase. */
const COLUMNAS_CREAR = [
  'id', 'creado_en', 'estado', 'dominio', 'url_medida',
  'senales_contratadas', 'senales_fuera', 'informe_json', 'monto_neto', 'monto_total',
  'correo', 'mp_order_id',
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
    mp_order_id: datos.mp_order_id ?? null,
    utm_source: datos.utm_source ?? null,
    utm_medium: datos.utm_medium ?? null,
    utm_campaign: datos.utm_campaign ?? null,
    utm_content: datos.utm_content ?? null,
    utm_term: datos.utm_term ?? null,
  };
  const huecos = COLUMNAS_CREAR.map(() => '?').join(', ');
  await db.prepare(
    `INSERT INTO pedidos (${COLUMNAS_CREAR.join(', ')}) VALUES (${huecos})`,
  ).bind(...COLUMNAS_CREAR.map((c) => fila[c])).run();
  return fila;
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
  'mp_payment_id', 'mp_order_id', 'pagado_en', 'entregado_en', 'informe_final_json',
]);

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
 * Registra que llegó un evento, y dice si es la PRIMERA vez.
 *
 * Acá está la idempotencia de verdad. `INSERT OR IGNORE` sobre una clave primaria es atómico:
 * si dos reintentos llegan al mismo tiempo, uno inserta y el otro no cambia nada. El que no
 * cambió nada recibe `primeraVez: false` y no hace el trabajo de nuevo.
 *
 * Lo que NO se hace: leer primero y escribir después. Entre las dos operaciones cabe el otro
 * reintento, y los dos se creerían el primero.
 */
export async function registrarEvento(db, clave, { tipo = null, pedidoId = null, resultado = null } = {}) {
  if (!clave) return { primeraVez: false, motivo: 'sin-clave' };
  const r = await db.prepare(
    'INSERT OR IGNORE INTO eventos_mp (id, recibido_en, tipo, pedido_id, resultado) VALUES (?, ?, ?, ?, ?)',
  ).bind(clave, new Date().toISOString(), tipo, pedidoId, resultado).run();
  const cambios = (r && r.meta && r.meta.changes) || 0;
  return cambios > 0
    ? { primeraVez: true, motivo: 'nuevo' }
    : { primeraVez: false, motivo: 'repetido' };
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
  if (!clave) return;
  try { await db.prepare('DELETE FROM eventos_mp WHERE id = ?').bind(clave).run(); } catch {}
}

/** Deja escrito cómo terminó un evento, para poder depurar después. */
export async function anotarResultado(db, clave, resultado) {
  if (!clave) return;
  await db.prepare('UPDATE eventos_mp SET resultado = ? WHERE id = ?')
    .bind(String(resultado).slice(0, 200), clave).run();
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
    entregado_en: pedido.entregado_en,
    falta_acceso: pedido.estado === ESTADOS.PAGADO && !pedido.acceso_recibido_en,
  };
}
