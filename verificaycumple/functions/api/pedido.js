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

import { leerPedido, vistaPublica } from './almacen.js';
import { etapaDelPedido, señalesDelPedido, convieneRefrescar } from './etapas.js';

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
