/**
 * GET /api/cola — los pedidos que hay que atender, con el id completo.
 *
 * ── POR QUÉ EXISTE (2-nov-2026) ───────────────────────────────────────────────────────────
 *
 * Porque atender una venta empezaba OBLIGATORIAMENTE por abrir la base de producción.
 *
 * El aviso de venta manda 12 de los 36 caracteres del id, y lo hace a propósito: ese id es la
 * única credencial de la pantalla del cliente y el aviso viaja por un formulario de terceros
 * hasta una casilla de correo (ver `aviso.js`). Pero `/api/entregar` exige el id completo, y
 * los 24 que faltan son azar de `crypto.randomUUID()`: no se deducen. El correo del cliente
 * tampoco iba. Así que cerrar un pedido, escribirle a quien compró, o emitir su factura,
 * empezaba con un `wrangler d1 execute --remote` contra producción.
 *
 * Y no era solo incómodo: era el paso donde el camino se cortaba. La entrega se podía hacer
 * entera en el sitio del cliente y el pedido igual se quedaba en «Estamos trabajando en tu
 * sitio», porque nadie tenía a mano el id con el que cerrarlo.
 *
 * ── LA MISMA LLAVE QUE LA ENTREGA, Y FALLA CERRADO IGUAL ──────────────────────────────────
 *
 * Va con `CLAVE_ENTREGA`, la de `/api/entregar`, comparada con la misma función de tiempo
 * constante. Un secreto propio para esto sería un segundo secreto que vence por su cuenta y
 * que hay que acordarse de rotar aparte, para cuidar exactamente el mismo trabajo.
 *
 * Y si el secreto no está cargado, no se lista nada. Un endpoint que devuelve correos y RUT de
 * clientes no puede tener un modo «sin clave configurada, pasa»: eso es justo lo que este
 * producto le reprocha a los sitios que mide.
 *
 * ── NO LLEVA `Access-Control-Allow-Origin` ────────────────────────────────────────────────
 *
 * Los GET públicos de acá (`/api/chequeo`, `/api/doce-puntos`) mandan `*` y está bien:
 * devuelven lo que cualquiera puede medir de un sitio ajeno. Este devuelve datos de personas.
 * Sin ese encabezado, ninguna página puede leer la respuesta desde el navegador de un
 * visitante. Es defensa en profundidad, no la principal: la principal es la clave.
 *
 * ── CÓMO SE USA ───────────────────────────────────────────────────────────────────────────
 *
 *   curl -s https://verifica.spindlelab.cl/api/cola \
 *     -H "Authorization: Bearer $CLAVE_ENTREGA"
 *
 * Con `?estado=pagado` salen solo las ventas vivas, que es la cola de verdad. `?tope=N` cambia
 * cuántas (25 por omisión, 200 como máximo).
 *
 * Cada fila trae `etapa`, `titulo` y `quien_actua` calculados con el MISMO `etapaDelPedido`
 * que dibuja la pantalla del cliente. No se reimplementa acá: dos criterios de «en qué va
 * este pedido» se contradicen en silencio, y el cliente y nosotros veríamos cosas distintas.
 */

import { listarPedidos } from './almacen.js';
import { etapaDelPedido } from './etapas.js';
import { claveDeLaPeticion, mismoSecreto } from './entregar.js';
import { ESTADOS } from './pedidos.js';

const ESTADOS_VALIDOS = new Set(Object.values(ESTADOS));

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestGet(contexto) {
  const { request, env } = contexto;

  // El secreto se limpia por lo mismo que el de Flow y el de Resend: uno pegado con un espacio
  // al final se ve CARGADO en el panel y no calza con nada.
  const esperado = typeof env.CLAVE_ENTREGA === 'string' ? env.CLAVE_ENTREGA.trim() : '';
  if (!esperado) {
    return json({
      ok: false, motivo: 'sin-clave',
      detalle: 'Falta CLAVE_ENTREGA en los secretos del proyecto. Sin ella no se puede ' +
        'autenticar quién pide la lista, así que no se lista nada.',
    }, 409);
  }
  if (!mismoSecreto(claveDeLaPeticion(request), esperado)) {
    return json({ ok: false, motivo: 'sin-permiso' }, 401);
  }

  if (!env.VYC_PEDIDOS) return json({ ok: false, motivo: 'sin-base' }, 409);

  const url = new URL(request.url);
  const estado = (url.searchParams.get('estado') || '').trim();

  // Un estado que no existe se rechaza en vez de devolver una lista vacía: vacío se lee como
  // «no hay ventas que atender», y escribir `?estado=pagados` en plural no puede significar eso.
  if (estado && !ESTADOS_VALIDOS.has(estado)) {
    return json({
      ok: false, motivo: 'estado-invalido',
      detalle: `«${estado}» no es un estado. Son: ${[...ESTADOS_VALIDOS].join(', ')}.`,
    }, 400);
  }

  let filas;
  try {
    filas = await listarPedidos(env.VYC_PEDIDOS, { estado, tope: url.searchParams.get('tope') });
  } catch {
    return json({ ok: false, motivo: 'error-de-lectura' }, 409);
  }

  const pedidos = filas.map(function (fila) {
    const etapa = etapaDelPedido(fila) || {};
    // El informe final se leyó para calcular la etapa y no se devuelve: son kilobytes por fila
    // que nadie mira en una lista. Lo que sí se dice es si existe.
    const { informe_final_json: informeFinal, ...resto } = fila;
    return {
      ...resto,
      tiene_informe_final: Boolean(informeFinal),
      etapa: etapa.etapa || null,
      titulo: etapa.titulo || null,
      quien_actua: etapa.quienActua || null,
    };
  });

  return json({ ok: true, total: pedidos.length, estado: estado || null, pedidos });
}

export async function onRequest(contexto) {
  if (contexto.request.method === 'GET') return onRequestGet(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } });
}
