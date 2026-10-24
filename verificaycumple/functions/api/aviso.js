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
