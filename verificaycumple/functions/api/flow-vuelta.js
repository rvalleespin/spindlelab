/**
 * La vuelta del comprador desde Flow.
 *
 * ── POR QUÉ EXISTE, Y NO ES UN DETALLE (29-oct-2026) ────────────────────────────────────
 *
 * Flow devuelve a la persona a `urlReturn` **con un POST**, no con un GET. Y
 * `/pedido/` es una página estática: Cloudflare Pages contesta un POST con **405 y cero
 * bytes**. Blanco absoluto.
 *
 * Medido, no supuesto:
 *
 *     GET  /pedido/  →  200 · 18.909 bytes · la página entera
 *     POST /pedido/  →  405 ·      0 bytes · nada
 *
 * Lo encontró Ramón insistiendo en que «el sitio sale en blanco» después de pagar en el
 * sandbox. Yo lo había verificado con GET y funcionaba, así que lo di por bueno — el GET no
 * prueba nada sobre el POST, y la pantalla en blanco pasa justo después de que alguien paga
 * $177.310. Es el peor lugar posible para una pantalla muda.
 *
 * ── POR QUÉ UN ENDPOINT APARTE Y NO ARREGLAR `/pedido/` ──────────────────────────────────
 *
 * Porque una Function en `functions/pedido/` **se antepone al archivo estático** y habría que
 * reservir el HTML a mano con `env.ASSETS`. Eso pone en riesgo el GET, que hoy funciona, para
 * arreglar un POST que podemos evitar: la dirección de vuelta la elegimos nosotros.
 *
 * Acá el 303 es el status correcto y no uno cualquiera: es el único que convierte un POST en
 * un GET al seguir la redirección. Un 302 deja al navegador libre de repetir el POST contra
 * `/pedido/`, que es exactamente el 405 del que venimos.
 *
 * ⚠️ Esto NO confirma nada del pago. La pantalla del pedido lee su estado de la base, y la
 * base la escribe `flow-confirmacion.js` preguntándole a Flow. Lo que traiga el navegador de
 * vuelta no decide nada, igual que con el proveedor anterior.
 */

import { ID_PEDIDO_NUESTRO } from './pedidos.js';

/** Todos los métodos, a propósito: Flow usa POST y no hay motivo para que un GET falle. */
export async function onRequest(contexto) {
  const url = new URL(contexto.request.url);
  const id = url.searchParams.get('id');

  // Si el id no tiene nuestra forma, se va a `/pedido/` sin él. Esa pantalla sabe decir «no
  // encontramos este pedido», que es una respuesta; mandarle basura en el query no mejora nada
  // y mete en la página un valor que no controlamos.
  const destino = ID_PEDIDO_NUESTRO.test(String(id || ''))
    ? `${url.origin}/pedido/?id=${encodeURIComponent(id)}`
    : `${url.origin}/pedido/`;

  return new Response(null, {
    status: 303,
    headers: { Location: destino, 'Cache-Control': 'no-store' },
  });
}
