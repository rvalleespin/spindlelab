/**
 * POST /api/intake — los datos que el cliente manda después de pagar.
 *
 * Sin esto, un pedido pagado se queda para siempre en «te toca a ti»: `guardarIntake` existía
 * desde el principio pero no tenía ninguna ruta que la llamara, así que la única forma de
 * avanzar era por correo, a mano, con el cliente esperando.
 *
 * Son las dos cosas que el alcance del kit declara que hacen falta para empezar:
 *
 *   1. los datos de la empresa para el borrador de la política —razón social, RUT, giro,
 *      dirección—, que son los que la ley pide publicar;
 *   2. en qué plataforma está el sitio, para poder decirle dónde crear la invitación.
 *
 * ── LA LLAVE ES EL ENLACE ────────────────────────────────────────────────────────────────
 *
 * Igual que `GET /api/pedido`: el id son 32 caracteres hexadecimales de azar (122 bits), así
 * que no se puede recorrer ni adivinar. No hay cuenta ni contraseña, y eso es una decisión, no
 * una omisión: pedirle crear una contraseña a alguien que ya pagó, para escribir cuatro datos,
 * es poner una puerta donde no hace falta.
 *
 * El costo se dice en voz alta: **quien tenga el enlace puede escribir estos datos.** Lo que
 * acota el daño es lo que el intake puede hacer, que es poco y es visible: seis columnas de una
 * lista blanca sobre un pedido YA PAGADO. No mueve el estado, no cambia el monto, no lee el
 * informe congelado y no devuelve el correo. Lo peor que permite un enlace filtrado es una
 * razón social vandalizada, que se ve y se arregla.
 *
 * ── LO QUE NO ESCRIBE EL CLIENTE ─────────────────────────────────────────────────────────
 *
 * `acceso_recibido_en` significa «el cliente dice que mandó el acceso», no «el acceso
 * funciona». Nadie puede mandar un acceso por un formulario: crea una invitación en su
 * plataforma y nosotros comprobamos que entra. Por eso la etapa siguiente dice que lo estamos
 * probando, y no que ya estamos instalando.
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

import { leerPedido, guardarIntake, vistaPublica } from './almacen.js';
import { etapaDelPedido, señalesDelPedido, convieneRefrescar, TITULOS } from './etapas.js';
import { ID_PEDIDO_NUESTRO } from './pedidos.js';
import { clavesDeTope, contar } from './profundo.js';
import { avisarAvance } from './aviso.js';

/** Cuántos envíos admite una IP por día. Generoso: alguien corrigiendo su dirección no es un abuso. */
export const TOPE_INTAKE_IP_DIA = 20;
const TTL_TOPE_S = 60 * 60 * 30;

/**
 * Las plataformas, en una lista CERRADA.
 *
 * Por la misma razón que `origenDeLaVisita` cierra la suya: este valor lo escribe quien visita y
 * termina guardado y mostrado. Lo que no está en la lista es `otro`, y en `otro` cabe todo lo
 * que no reconocemos sin que nadie pueda meternos un texto cualquiera.
 */
export const PLATAFORMAS = new Set([
  'wordpress', 'webflow', 'wix', 'squarespace', 'shopify', 'jimdo', 'a-medida', 'no-se', 'otro',
]);

/** Los campos de texto, con su tope. Todo lo que no esté acá no se guarda. */
const TEXTOS = { razon_social: 200, giro: 200, direccion: 200 };

const NO_EXISTE = { ok: false, motivo: 'no-existe' };

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/** Quita los caracteres de control y recorta, sin tocar tildes ni eñes. */
export function limpiarTexto(v, tope) {
  if (typeof v !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  const s = v.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  return s ? s.slice(0, tope) : null;
}

/**
 * El RUT, comprobando su dígito verificador.
 *
 * No es una expresión regular suelta, y la diferencia importa: un RUT con la forma correcta y el
 * dígito equivocado pasa cualquier regex, se guarda, y aparece recién al facturar, cuando el
 * cliente ya está esperando. El módulo 11 lo atrapa acá y cuesta diez líneas.
 *
 * Devuelve el RUT normalizado —sin puntos, con guion, la K en mayúscula— o `null` si no cuadra.
 */
export function normalizarRut(v) {
  if (typeof v !== 'string') return null;
  const limpio = v.replace(/[.\s]/g, '').replace(/-/g, '').toUpperCase();
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return null;
  const cuerpo = limpio.slice(0, -1);
  const dado = limpio.slice(-1);

  let suma = 0, factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

  return dado === esperado ? `${cuerpo}-${esperado}` : null;
}

export async function onRequestPost(contexto) {
  const { request, env } = contexto;

  if (!env.VYC_PEDIDOS) return json({ ok: false, motivo: 'sin-base',
    detalle: 'Tuvimos un problema de nuestro lado. Vuelve a intentarlo en un momento.' }, 409);

  let cuerpo = null;
  try { cuerpo = await request.json(); } catch { cuerpo = null; }
  if (!cuerpo || typeof cuerpo !== 'object') {
    return json({ ok: false, motivo: 'cuerpo-invalido' }, 400);
  }

  // Un id mal formado y uno que no existe contestan EXACTAMENTE lo mismo. No hay nada que ganar
  // diciéndole a alguien «ese id tiene la forma correcta pero no existe»: es la mitad de la
  // respuesta que necesitaría para buscar el resto.
  const id = typeof cuerpo.id === 'string' ? cuerpo.id : '';
  if (!ID_PEDIDO_NUESTRO.test(id)) return json(NO_EXISTE, 404);

  // El tope va después de reconocer el id y antes de tocar la base, igual que en el checkout:
  // un cuerpo mal formado se rechaza gratis y no gasta cupo de nadie.
  //
  // Sin KV NO se declina, al revés que el checkout. Acá declinar le quitaría a un cliente que ya
  // pagó su única forma de desatascar su pedido, y la puerta de verdad es el id inadivinable.
  if (env.VYC_TOPES) {
    const ip = request.headers.get('CF-Connecting-IP') || '';
    try {
      const claves = clavesDeTope(ip, '', new Date(), 'tope:intake');
      const porIp = await contar(env.VYC_TOPES, claves.ip, TOPE_INTAKE_IP_DIA, TTL_TOPE_S);
      if (!porIp.pasa) {
        return json({
          ok: false, motivo: 'tope',
          detalle: 'Mandaste estos datos varias veces hoy. Si algo no te está funcionando, ' +
            'escríbenos con este enlace y lo resolvemos contigo.',
        }, 429);
      }
    } catch { /* KV caído no puede dejar atascado a quien ya pagó. */ }
  }

  let pedido;
  try { pedido = await leerPedido(env.VYC_PEDIDOS, id); } catch {
    return json({ ok: false, motivo: 'error-de-lectura',
      detalle: 'No pudimos leer tu pedido ahora. Vuelve a intentarlo en un momento.' }, 409);
  }
  if (!pedido) return json(NO_EXISTE, 404);

  // ── Los campos ────────────────────────────────────────────────────────────────────────
  const datos = {};
  for (const [campo, tope] of Object.entries(TEXTOS)) {
    const v = limpiarTexto(cuerpo[campo], tope);
    if (v) datos[campo] = v;
  }

  if (cuerpo.rut !== undefined && cuerpo.rut !== null && String(cuerpo.rut).trim() !== '') {
    const rut = normalizarRut(cuerpo.rut);
    if (!rut) {
      return json({
        ok: false, motivo: 'rut-invalido',
        detalle: 'Ese RUT no cuadra con su dígito verificador. Revísalo: si lo guardamos mal, ' +
          'el problema aparece recién al facturar.',
      }, 400);
    }
    datos.rut = rut;
  }

  if (cuerpo.plataforma !== undefined && cuerpo.plataforma !== null) {
    const p = String(cuerpo.plataforma).toLowerCase().trim();
    datos.plataforma = PLATAFORMAS.has(p) ? p : 'otro';
  }

  // `acceso_listo` tiene que ser EXACTAMENTE true, con el mismo rigor que el consentimiento del
  // checkout: es el campo que mueve la etapa, así que no puede moverse por un valor que
  // simplemente parezca verdadero.
  if (cuerpo.acceso_listo === true) {
    datos.acceso_recibido_en = new Date().toISOString();
  }

  if (!Object.keys(datos).length) {
    return json({ ok: false, motivo: 'sin-campos', detalle: 'No llegó ningún dato que guardar.' }, 400);
  }

  let guardado;
  try { guardado = await guardarIntake(env.VYC_PEDIDOS, id, datos); } catch {
    return json({ ok: false, motivo: 'no-se-pudo-guardar',
      detalle: 'No pudimos guardar tus datos ahora. Vuelve a intentarlo en un momento.' }, 409);
  }

  if (!guardado.guardado) {
    // El id era válido y el pedido existe —lo leímos arriba—, así que esto no es un 404: es que
    // todavía no está pagado. Decirlo es mejor que fingir que no existe.
    return json({
      ok: false, motivo: 'todavia-no-pagado',
      detalle: 'Este pedido todavía no está pagado, así que no guardamos tus datos.',
    }, 409);
  }

  // Se devuelve el estado NUEVO, con la misma forma que `GET /api/pedido`. Así la pantalla no
  // tiene que pedir otra vez para saber en qué quedó, y no hay forma de que pinte el estado
  // viejo después de haber escrito.
  const fresco = await leerPedido(env.VYC_PEDIDOS, id);

  // ── Y ALGUIEN TIENE QUE ENTERARSE ───────────────────────────────────────────────────────
  //
  // Hasta el 30-oct esto terminaba acá: el cliente completaba sus datos, la fila quedaba
  // escrita, y nadie lo sabía. Este módulo ni siquiera importaba `aviso.js`. Un pedido
  // avanzando en silencio es un pedido detenido, y del otro lado hay alguien con una fecha
  // legal encima.
  //
  // Va al fondo y nunca se espera: los datos del cliente YA están guardados, y un aviso que
  // no sale no puede deshacer eso ni demorarle la pantalla.
  const aviso = avisarAvance(fresco, guardado.campos.includes('acceso_recibido_en') ? 'acceso' : 'datos')
    .catch(() => false);
  if (contexto && contexto.waitUntil) contexto.waitUntil(aviso);

  return json({
    ok: true,
    guardado: true,
    campos: guardado.campos,
    pedido: vistaPublica(fresco),
    etapa: etapaDelPedido(fresco),
    señales: señalesDelPedido(fresco, TITULOS),
    refrescar: convieneRefrescar(fresco),
  });
}

export async function onRequest(contexto) {
  if (contexto.request.method === 'POST') return onRequestPost(contexto);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
