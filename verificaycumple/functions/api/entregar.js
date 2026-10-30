/**
 * POST /api/entregar — marcar un pedido como entregado y cerrarlo con el cliente.
 *
 * ── POR QUÉ EXISTE (30-oct-2026) ─────────────────────────────────────────────────────────
 *
 * Porque `entregado` era un estado INALCANZABLE. Estaba en `ESTADOS`, tenía su transición
 * válida en `TRANSICIONES` (`pagado → entregado`), tenía su etapa redactada en `etapas.js`,
 * tenía sus columnas en el esquema (`entregado_en`, `informe_final_json`) y la pantalla del
 * cliente sabía dibujarlo —hasta cambiaba el rótulo de la lista a «Lo que dejamos hecho»—.
 *
 * Y ningún código lo escribía. El grep de `ENTREGADO` daba solo lecturas. O sea que el camino
 * del producto terminaba en «Estamos trabajando en tu sitio», para siempre, y el único cierre
 * posible era un UPDATE a mano en la base de producción, que además no manda ningún correo.
 *
 * ── LA LLAVE NO ES EL ENLACE, ACÁ SÍ HAY SECRETO ─────────────────────────────────────────
 *
 * Todo el resto del producto se abre con el enlace del pedido, y eso es correcto para lo que
 * el cliente puede hacer: escribir su razón social, declarar que dio el acceso. Son cosas
 * suyas y reversibles.
 *
 * Esto es distinto. Este endpoint cierra un trabajo, le dice a alguien que su sitio está
 * listo, y deja constancia de una entrega que podría tener que defenderse. No lo puede
 * disparar quien tenga el enlace: lo disparamos nosotros. Así que va con un secreto en
 * `CLAVE_ENTREGA`, que vive solo en los secretos de Pages.
 *
 * **Y FALLA CERRADO.** Si el secreto no está cargado, no se entrega nada: se contesta que no
 * se puede autenticar. La alternativa —«sin clave configurada, pasa»— es la forma más rápida
 * de dejar un endpoint que marca entregas abierto a internet, y ya vimos en este mismo
 * producto lo que cuesta un secreto que se ve «presente» y no sirve.
 *
 * ── Y NO MIENTE SOBRE EL CORREO ──────────────────────────────────────────────────────────
 *
 * El correo de cierre puede no salir (Resend caído, clave vencida). El trabajo igual está
 * hecho y el pedido igual se marca: desmarcar una entrega real porque un correo falló sería
 * peor. Lo que NO se hace es callarlo — la respuesta trae `correo_enviado`, y la etapa del
 * cliente dice «te mandamos el detalle por correo; si no te llegó, escríbenos», que es cierto
 * en los dos casos.
 */

import { leerPedido, marcarEstado, vistaPublica } from './almacen.js';
import { etapaDelPedido, señalesDelPedido, TITULOS } from './etapas.js';
import { ESTADOS, ID_PEDIDO_NUESTRO } from './pedidos.js';
import { enviarCorreoDeEntrega } from './correo.js';

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/**
 * Compara dos secretos sin que el TIEMPO de la comparación diga cuántos caracteres acertó.
 *
 * Un `===` se corta en el primer byte distinto, así que medir el tiempo de muchos intentos
 * filtra el secreto letra por letra. Acá no es la defensa principal —son 64 hex de azar sobre
 * una red con latencia— pero cuesta ocho líneas y evita tener que argumentar por qué no.
 *
 * Compara SIEMPRE el largo completo del esperado, y el largo distinto se trata como un fallo
 * más (no como un atajo), para no filtrar el largo tampoco.
 */
export function mismoSecreto(dado, esperado) {
  if (typeof dado !== 'string' || typeof esperado !== 'string') return false;
  if (!esperado) return false;
  let distinto = dado.length === esperado.length ? 0 : 1;
  for (let i = 0; i < esperado.length; i++) {
    distinto |= esperado.charCodeAt(i) ^ (dado.charCodeAt(i % (dado.length || 1)) || 0);
  }
  return distinto === 0;
}

/** El secreto que llega en la cabecera, o cadena vacía. */
export function claveDeLaPeticion(request) {
  const h = (request && request.headers && request.headers.get('Authorization')) || '';
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m ? m[1].trim() : '';
}

export async function onRequestPost(contexto) {
  const { request, env } = contexto;

  // El secreto se limpia por lo mismo que el de Flow y el de Resend: uno pegado con un espacio
  // al final se ve CARGADO en el panel y no calza con nada.
  const esperado = typeof env.CLAVE_ENTREGA === 'string' ? env.CLAVE_ENTREGA.trim() : '';
  if (!esperado) {
    return json({
      ok: false, motivo: 'sin-clave',
      detalle: 'Falta CLAVE_ENTREGA en los secretos del proyecto. Sin ella no se puede ' +
        'autenticar una entrega, así que no se entrega nada.',
    }, 409);
  }
  if (!mismoSecreto(claveDeLaPeticion(request), esperado)) {
    return json({ ok: false, motivo: 'sin-permiso' }, 401);
  }

  if (!env.VYC_PEDIDOS) return json({ ok: false, motivo: 'sin-base' }, 409);

  let cuerpo = null;
  try { cuerpo = await request.json(); } catch { cuerpo = null; }
  if (!cuerpo || typeof cuerpo !== 'object') {
    return json({ ok: false, motivo: 'cuerpo-invalido' }, 400);
  }

  const id = typeof cuerpo.id === 'string' ? cuerpo.id : '';
  if (!ID_PEDIDO_NUESTRO.test(id)) return json({ ok: false, motivo: 'id-invalido' }, 400);

  let pedido;
  try { pedido = await leerPedido(env.VYC_PEDIDOS, id); } catch {
    return json({ ok: false, motivo: 'error-de-lectura' }, 409);
  }
  if (!pedido) return json({ ok: false, motivo: 'no-existe' }, 404);

  if (pedido.estado === ESTADOS.ENTREGADO) {
    // Entregar dos veces no es un error que haya que gritar, pero tampoco se vuelve a mandar el
    // correo: el cliente ya lo recibió, y repetirlo le haría creer que hubo un trabajo nuevo.
    return json({
      ok: true, ya_estaba: true, correo_enviado: false,
      pedido: vistaPublica(pedido),
      etapa: etapaDelPedido(pedido),
      señales: señalesDelPedido(pedido, TITULOS),
    });
  }
  if (pedido.estado !== ESTADOS.PAGADO) {
    return json({
      ok: false, motivo: 'no-se-puede-entregar',
      detalle: `Este pedido está en "${pedido.estado}". Solo se entrega uno pagado.`,
      estado: pedido.estado,
    }, 409);
  }

  const informeFinal = (cuerpo.informe_final && typeof cuerpo.informe_final === 'object')
    ? cuerpo.informe_final
    : null;

  const movido = await marcarEstado(env.VYC_PEDIDOS, id, ESTADOS.PAGADO, ESTADOS.ENTREGADO, {
    entregado_en: new Date().toISOString(),
    // Se guarda incluso cuando no vino: `null` es el dato de que no se pudo rehacer la
    // medición, y es distinto de una columna que nadie escribió nunca.
    informe_final_json: informeFinal ? JSON.stringify(informeFinal) : null,
  });
  if (!movido.movido) {
    return json({ ok: false, motivo: movido.motivo }, 409);
  }

  const fresco = (await leerPedido(env.VYC_PEDIDOS, id)) || pedido;

  // El correo se ESPERA, al revés que los avisos internos. Acá quien está del otro lado no es
  // un cliente con una pantalla cargando: somos nosotros entregando, y lo único que queremos
  // saber es si el cierre le llegó. Esperarlo es el punto.
  const correoEnviado = await enviarCorreoDeEntrega(
    fresco, informeFinal, TITULOS, env.RESEND_API_KEY,
  );

  return json({
    ok: true,
    entregado: true,
    correo_enviado: correoEnviado,
    // Dos cosas que quien entrega necesita ver sin ir a la base.
    hubo_informe_final: Boolean(informeFinal),
    sin_acceso_declarado: !fresco.acceso_recibido_en,
    pedido: vistaPublica(fresco),
    etapa: etapaDelPedido(fresco),
    señales: señalesDelPedido(fresco, TITULOS),
  });
}

export async function onRequest(contexto) {
  if (contexto.request.method === 'POST') return onRequestPost(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
