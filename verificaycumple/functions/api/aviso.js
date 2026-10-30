/**
 * Avisarnos a NOSOTROS cuando entra una venta.
 *
 * POR QUÉ EXISTE. Hasta el 24-oct no había nada: entraba un pago, el pedido quedaba en
 * `pagado`, y nadie se enteraba. Ramón se habría enterado solo si consultaba la base a mano.
 * Con una campaña pagada corriendo, eso significa ventas esperando sin que nadie las mire —y
 * una venta de un kit de cumplimiento es, además, alguien con una fecha legal encima.
 *
 * POR QUÉ POR ACÁ. Web3Forms ya procesa el formulario del sitio y su clave de acceso ya es
 * pública (vive en el HTML de la página, que es como se usa este servicio). Reusarlo no agrega
 * un proveedor nuevo ni una cuenta ni un costo. La alternativa nativa de Cloudflare
 * (`send_email`) está en beta y su documentación cubre Workers, no Pages Functions, así que no
 * se usa hasta poder comprobarla.
 *
 * ⚠️ QUÉ NO VA EN EL AVISO, Y ES LO IMPORTANTE:
 *
 *   - NO va el correo del comprador. La política dice que la base de pedidos «no la comparte
 *     nadie más», y mandarlo acá volvería esa frase falsa.
 *   - NO va el id completo del pedido. Esos 32 hex son la ÚNICA credencial de su pantalla
 *     privada: cualquiera que los tenga ve su pedido, sus datos y su formulario. Web3Forms
 *     guarda una copia de lo que recibe, así que mandar el id entero sería dejar una llave
 *     guardada en un tercero. Va un prefijo, que alcanza para encontrarlo en la base y no sirve
 *     para abrir nada.
 *
 * Lo que sí va: que hubo una venta, de qué sitio, por cuánto y cuándo. Con eso se sabe que hay
 * que ponerse a trabajar, que es para lo que sirve el aviso.
 *
 * NUNCA PUEDE ROMPER UN COBRO. Toda esta función es «si se puede, bien»: cualquier fallo se
 * traga. Un pago que entró no se puede perder porque un aviso no salió.
 */

// La misma clave que el formulario del sitio expone en su HTML. En Web3Forms la clave de
// acceso es pública por diseño —va en un formulario del navegador— así que no es un secreto y
// no corresponde guardarla como tal.
export const CLAVE_WEB3FORMS = 'f3a309f5-cbe6-4cf1-b77f-cfd0ee92685f';

/** Cuántos caracteres del id se mandan. Suficiente para buscarlo, inútil para abrir nada. */
export const LARGO_PREFIJO = 12;

export function cuerpoDelAviso(pedido) {
  const prefijo = String(pedido.id || '').slice(0, LARGO_PREFIJO);
  return {
    access_key: CLAVE_WEB3FORMS,
    subject: `Venta de Verifica y Cumple · ${pedido.dominio || 'sitio sin nombre'}`,
    from_name: 'Verifica y Cumple',
    // Los nombres de campo son los que Web3Forms reenvía tal cual al correo.
    Sitio: pedido.dominio || '(sin dominio)',
    Monto: `$${Number(pedido.monto_total || 0).toLocaleString('es-CL')}`,
    'Pedido (prefijo)': `${prefijo}…`,
    'Pagado el': pedido.pagado_en || new Date().toISOString(),
    'Qué hacer': 'Abre la base de pedidos para ver el correo y el enlace. El cliente tiene que ' +
      'mandarnos los datos de su empresa y después un acceso temporal a su sitio.',
  };
}

/**
 * El aviso de que un pedido AVANZÓ: el cliente hizo lo suyo.
 *
 * ── POR QUÉ EXISTE (30-oct-2026) ─────────────────────────────────────────────────────────
 *
 * Hasta hoy el único aviso era el de la venta. Después de eso, el cliente podía mandar los
 * datos de su empresa y declarar que el acceso estaba listo, y **nadie se enteraba**: el
 * módulo del formulario ni siquiera importaba este archivo. La única transición del camino
 * que sí funcionaba terminaba en una fila de la base que había que ir a mirar.
 *
 * Con una fecha legal encima del cliente, un pedido avanzando en silencio es un pedido
 * detenido. El aviso es lo que convierte «está escrito en la base» en «alguien lo sabe».
 *
 * Las mismas reglas que el resto de este archivo: va el prefijo del id, nunca el id entero ni
 * el correo del comprador. Y nunca puede romper el guardado: si el aviso falla, los datos del
 * cliente ya quedaron escritos.
 *
 * @param {object} pedido  el pedido como quedó después de guardar
 * @param {'datos'|'acceso'} que  qué fue lo que el cliente completó
 */
export async function avisarAvance(pedido, que, fetchImpl = fetch) {
  if (!pedido || !pedido.id) return false;
  const prefijo = String(pedido.id).slice(0, LARGO_PREFIJO);
  const esAcceso = que === 'acceso';
  try {
    const r = await fetchImpl('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: CLAVE_WEB3FORMS,
        subject: esAcceso
          ? `Acceso declarado · ${pedido.dominio || 'sitio sin nombre'}`
          : `Datos de empresa recibidos · ${pedido.dominio || 'sitio sin nombre'}`,
        from_name: 'Verifica y Cumple',
        Sitio: pedido.dominio || '(sin dominio)',
        'Pedido (prefijo)': `${prefijo}…`,
        Empresa: pedido.razon_social || '(todavía sin datos)',
        Plataforma: pedido.plataforma || '(sin declarar)',
        'Qué hacer': esAcceso
          ? 'El cliente dice que el acceso ya está. PRUÉBALO antes de dar por bueno que entra: ' +
            'su pantalla ya le dice que lo estamos probando, así que si no entra hay que escribirle.'
          : 'Ya tienes razón social, RUT, giro y dirección para armar el borrador. El cliente ' +
            'todavía tiene que darte el acceso a su sitio.',
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.log(`[aviso] Web3Forms contestó http-${r.status} al avisar el avance`);
      return false;
    }
    console.log(`[aviso] avance avisado (${que}): ${prefijo}… · ${pedido.dominio}`);
    return true;
  } catch (e) {
    console.log(`[aviso] no se pudo avisar el avance: ${e && e.message}`);
    return false;
  }
}

/**
 * El cuerpo del aviso cuando una notificación necesita que la mire una persona.
 *
 * ── POR QUÉ EXISTE (27-oct-2026) ─────────────────────────────────────────────────────────
 *
 * El webhook ya sabía distinguir «esto no calza, que lo vea alguien» de «esto se marca solo».
 * Lo que no tenía era a quién avisarle: la decisión terminaba en un `console.log` y en una
 * columna de la base. Una revisión independiente lo dijo sin rodeos — el aviso queda
 * enterrado y el cliente no tiene ruta de salida. Un estado que solo existe en un registro
 * que nadie consulta es, en la práctica, un estado que no existe.
 *
 * Mismo canal que el aviso de venta, y las mismas reglas de privacidad: va el PREFIJO del
 * pedido, nunca el id entero (es la única credencial del comprador) y nunca su correo.
 */
export function cuerpoDeRevisar(pedido, decision) {
  const prefijo = String((pedido && pedido.id) || '').slice(0, LARGO_PREFIJO);
  const d = decision || {};
  return {
    access_key: CLAVE_WEB3FORMS,
    subject: `REVISAR · ${d.motivo || 'sin motivo'} · ${(pedido && pedido.dominio) || 'sitio sin nombre'}`,
    from_name: 'Verifica y Cumple',
    Sitio: (pedido && pedido.dominio) || '(sin dominio)',
    Motivo: d.motivo || '(sin motivo)',
    Detalle: d.detalle || '(sin detalle)',
    'Pedido (prefijo)': `${prefijo}…`,
    Estado: (pedido && pedido.estado) || '(sin estado)',
    'Qué hacer': 'Mercado Pago avisó algo que NO calza con lo que vendimos, así que el pedido ' +
      'no se movió solo. Abre la base de pedidos y la orden en el panel de Mercado Pago, y ' +
      'compara antes de tocar nada. Mientras tanto el cliente ve su pedido sin avanzar.',
  };
}

/** El aviso de que algo necesita una persona. Nunca lanza, igual que el de venta. */
export async function avisarRevisar(pedido, decision, fetchImpl = fetch) {
  if (!pedido || !pedido.id) return false;
  try {
    const r = await fetchImpl('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(cuerpoDeRevisar(pedido, decision)),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.log(`[aviso] REVISAR: Web3Forms contestó http-${r.status}`);
      return false;
    }
    console.log(`[aviso] revisar avisado: ${String(pedido.id).slice(0, LARGO_PREFIJO)}… · ${(decision || {}).motivo}`);
    return true;
  } catch (e) {
    console.log(`[aviso] no se pudo avisar el REVISAR: ${e && e.message}`);
    return false;
  }
}

/**
 * Manda el aviso. Devuelve true solo si Web3Forms lo aceptó, y nunca lanza.
 *
 * @param {object} pedido  el pedido ya marcado como pagado
 * @param {function} fetchImpl  inyectable para las pruebas
 */
export async function avisarVenta(pedido, fetchImpl = fetch) {
  if (!pedido || !pedido.id) return false;
  try {
    const r = await fetchImpl('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(cuerpoDelAviso(pedido)),
      // Sin corte de tiempo, una conexión colgada deja la invocación esperando por un aviso.
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.log(`[aviso] Web3Forms contestó http-${r.status}`);
      return false;
    }
    console.log(`[aviso] venta avisada: ${String(pedido.id).slice(0, LARGO_PREFIJO)}… · ${pedido.dominio}`);
    return true;
  } catch (e) {
    console.log(`[aviso] no se pudo avisar la venta: ${e && e.message}`);
    return false;
  }
}
