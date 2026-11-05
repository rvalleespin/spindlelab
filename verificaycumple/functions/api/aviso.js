/**
 * Avisarnos a NOSOTROS cuando entra una venta.
 *
 * POR QUÉ EXISTE. Hasta el 24-oct no había nada: entraba un pago, el pedido quedaba en
 * `pagado`, y nadie se enteraba. Ramón se habría enterado solo si consultaba la base a mano.
 * Con una campaña pagada corriendo, eso significa ventas esperando sin que nadie las mire —y
 * una venta de un kit de cumplimiento es, además, alguien con una fecha legal encima.
 *
 * ── POR QUÉ POR RESEND, Y NO POR DONDE ESTABA (3-nov-2026) ───────────────────────────────
 *
 * Estos tres avisos salían por Web3Forms, el mismo servicio que procesa el formulario del
 * sitio. El razonamiento era que reusarlo no agregaba un proveedor ni una cuenta ni un costo.
 * Y era cierto, pero le faltaba lo único que importaba: **tampoco funcionaba desde acá**. A
 * una petición igual a las que mandaba este archivo, su API contestó
 *
 *     HTTP 403  {"success": false, "message": "This method is not allowed. Use our API in
 *                client side or contact support with server IP address (Pro plan is required)"}
 *
 * Es una restricción de plan, no un detalle de cabeceras: contestó lo mismo agregándole
 * Origin, Referer y User-Agent. Eso explica la asimetría que mantuvo el problema sin síntoma
 * durante meses: el formulario del sitio SÍ llega —lo manda el NAVEGADOR del visitante, que es
 * justo el uso permitido— y estos tres avisos salían del SERVIDOR y no llegaba ninguno. En
 * hola@spindlelab.cl no había ni un correo con los asuntos que genera este archivo, y sí
 * estaban los del formulario, con la MISMA clave.
 *
 * O sea: cuando entrara la primera venta, nadie se iba a enterar.
 *
 * Ahora salen por Resend, que ya está pagado, está pensado para servidor y es por donde ya le
 * escribimos al comprador (`correo.js`). No se escribió un segundo cliente: la petición es la
 * de allá, `mandarPorResend`, con su remitente ya verificado. Un proveedor menos en el
 * proyecto, y el canal que de verdad entrega.
 *
 * ⚠️ QUÉ NO VA EN EL AVISO, Y ES LO IMPORTANTE:
 *
 *   - NO va el correo del comprador. La política dice que la base de pedidos «no la comparte
 *     nadie más», y mandarlo acá volvería esa frase falsa.
 *   - NO va el id completo del pedido. Esos 32 hex son la ÚNICA credencial de su pantalla
 *     privada: cualquiera que los tenga ve su pedido, sus datos y su formulario. Va un
 *     prefijo, que alcanza para encontrarlo en la base y no sirve para abrir nada. Cambiar de
 *     proveedor no relaja esta regla: el aviso sigue siendo un correo, que se reenvía, se
 *     queda en un buzón y lo indexa un cliente de correo.
 *
 * Lo que sí va: que hubo una venta, de qué sitio, por cuánto y cuándo. Con eso se sabe que hay
 * que ponerse a trabajar, que es para lo que sirve el aviso.
 *
 * NUNCA PUEDE ROMPER UN COBRO. Toda esta función es «si se puede, bien»: cualquier fallo se
 * traga. Un pago que entró no se puede perder porque un aviso no salió.
 */

import { REMITENTE, mandarPorResend, esPasajero } from './correo.js';
// De acá sale el nombre de la plataforma y la casilla a la que el cliente manda la invitación.
// No hay ciclo: `acceso.js` solo importa `etapas.js`, y ninguno de los dos importa este archivo.
import { POR_PLATAFORMA, CORREO_ACCESO } from './acceso.js';

// `esPasajero` se mudó a correo.js el 4-nov-2026, al lado del cliente de Resend, porque ahí
// es donde por fin HACE algo: decide si vale la pena reintentar. Acá se reexporta para no
// romper a quien ya la importaba de este módulo.
export { esPasajero };

/**
 * A dónde llegan los avisos internos.
 *
 * ── POR QUÉ NO ES `hola@spindlelab.cl` (4-nov-2026) ──────────────────────────────────────
 *
 * Lo era, y Gmail los mandaba a spam. No es una sospecha: está en el registro de correo de
 * Workspace, con la traza entera del aviso de la primera venta real.
 *
 *     Asunto:       Venta de Verifica y Cumple · sitio-de-prueba-vyc.pages.dev
 *     Remitente:    …@rsend.envios.spindlelab.cl
 *     Destinatario: hola@spindlelab.cl
 *     10:35:07      Recibido desde un servidor SMTP · 250 2.0.0 OK
 *     10:35:08      Insertado en la canalización de entrega de Gmail
 *     10:35:08      Marcado como spam
 *     Estado:       0/1 entregados
 *
 * La causa es la dirección, no el contenido ni el envío: un `From` de un SUBDOMINIO del
 * propio dominio de Workspace, entrando desde una IP de afuera, es la señal clásica de
 * suplantación, y Gmail la filtra aunque SPF y DKIM pasen —que pasan, los dos están bien
 * configurados en `send.envios.spindlelab.cl`—. De eso se trata justamente esa protección.
 *
 * El recibo al comprador, mandado en el MISMO `Promise.all`, con la misma clave y en el mismo
 * segundo, llegó sin problema: va a un Gmail de consumidor, que no tiene esa regla. O sea que
 * el único correo nuestro que cruza hacia nuestro propio dominio era este.
 *
 * ⚠️ Y el reintento de `mandarPorResend` no servía de nada acá: Resend contestó 250 OK. No
 * hubo ningún fallo que reintentar. El sistema registraba «[aviso] salió» para un correo que
 * nunca llegó a una bandeja, y por eso estuvo un día entero dándose por enviado.
 *
 * Se eligió mover el destino en vez de permitir el remitente en la consola de Workspace
 * porque esta casilla ya está PROBADA —recibe el recibo del comprador y el resumen diario del
 * copiloto— y porque una lista blanca en la consola es una configuración que alguien puede
 * cambiar sin acordarse de por qué estaba.
 *
 * Esto es solo a dónde le avisamos a Ramón. Nada de lo que ve un cliente cambia: sus correos
 * siguen saliendo desde el mismo remitente y con `reply_to` a la casilla del negocio.
 */
export const DESTINO_AVISOS = 'manuvalleespin@gmail.com';

/**
 * La casilla del negocio, que sigue siendo donde se contesta una duda de un cliente.
 *
 * Vive acá para que el día que los avisos vuelvan a `hola@` —si la regla de Workspace se
 * resuelve— se vea que son dos hechos distintos y no un solo valor que alguien duplicó.
 */
export const CASILLA_DEL_NEGOCIO = 'hola@spindlelab.cl';

/** Cuántos caracteres del id se mandan. Suficiente para buscarlo, inútil para abrir nada. */
export const LARGO_PREFIJO = 12;

export function cuerpoDelAviso(pedido) {
  const prefijo = String(pedido.id || '').slice(0, LARGO_PREFIJO);
  return {
    subject: `Venta de Verifica y Cumple · ${pedido.dominio || 'sitio sin nombre'}`,
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
 * Hasta ese día el único aviso era el de la venta. Después de eso, el cliente podía mandar los
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
 * @param {object} env  de donde sale `RESEND_API_KEY`
 */
/**
 * Quién manda la invitación del acceso, dicho para un aviso INTERNO.
 *
 * ⚠️ NO SIRVE `fichaDePlataforma().nombre`, y por poco se usó. Ese nombre tiene otro papel:
 * cuando la plataforma no está en la lista devuelve «tu sitio», que está escrito para la
 * pantalla DEL CLIENTE y se lee bien ahí. Metido en un aviso interno sale «la invitación la
 * mandó tu sitio», que no es ni cierto ni útil. Un texto se mueve de lugar y se vuelve falso
 * aunque la palabra sea la misma.
 */
export function deQuienLlega(plataforma) {
  const p = typeof plataforma === 'string' ? plataforma.toLowerCase().trim() : '';
  const ficha = POR_PLATAFORMA[p];
  if (ficha) return ficha.nombre;
  // Las dos que caen fuera de POR_PLATAFORMA no son huecos de la lista: son las salidas que el
  // formulario ofrece a propósito, y cada una pide algo distinto de quien lee este aviso.
  if (p === 'no-se') {
    return 'la plataforma de su sitio — OJO: el cliente dijo que no sabe quién lo administra, ' +
      'así que puede que no llegue ninguna invitación y haya que averiguar nosotros en qué está ' +
      'hecho y a quién pedírselo';
  }
  if (p === 'otro') {
    return 'la plataforma de su sitio — el cliente eligió «otra», así que hasta mirarlo no ' +
      'sabemos de qué remitente va a venir';
  }
  return 'la plataforma de su sitio (no declaró cuál es)';
}

export async function avisarAvance(pedido, que, env, fetchImpl = fetch) {
  if (!pedido || !pedido.id) return false;
  const prefijo = String(pedido.id).slice(0, LARGO_PREFIJO);
  const esAcceso = que === 'acceso';
  return mandarAviso(
    {
      subject: esAcceso
        ? `Acceso declarado · ${pedido.dominio || 'sitio sin nombre'}`
        : `Datos de empresa recibidos · ${pedido.dominio || 'sitio sin nombre'}`,
      Sitio: pedido.dominio || '(sin dominio)',
      'Pedido (prefijo)': `${prefijo}…`,
      Empresa: pedido.razon_social || '(todavía sin datos)',
      Plataforma: pedido.plataforma || '(sin declarar)',
      'Qué hacer': esAcceso
        ? 'El cliente dice que el acceso ya está. PRUÉBALO antes de dar por bueno que entra: ' +
          'su pantalla ya le dice que lo estamos probando, así que si no entra hay que escribirle.'
        : 'Ya tienes razón social, RUT, giro y dirección para armar el borrador. El cliente ' +
          'todavía tiene que darte el acceso a su sitio.',
      /* ── POR QUÉ ESTE CAMPO (4-nov-2026) ──────────────────────────────────────────────
       *
       * Hallazgo del ensayo real: este aviso llegó con el asunto «Acceso declarado» y NO
       * decía ningún dato de acceso. Es correcto que no los lleve —la invitación no pasa por
       * acá, y meterle credenciales a un correo de aviso sería lo contrario de lo que hace
       * el resto de este archivo— pero el aviso igual tiene que decir DÓNDE están, porque si
       * no, parece que se perdieron.
       *
       * El spam se nombra a propósito: una invitación de panel es justo la clase de correo
       * que se filtra, y hoy mismo hubo un aviso que no apareció en la bandeja y nadie miró
       * la carpeta de no deseado antes de empezar a buscar la causa en el código. */
      ...(esAcceso ? {
        'Dónde está el acceso': `No viene en este correo. La invitación llega aparte, a ` +
          `${CORREO_ACCESO}, mandada por ${deQuienLlega(pedido.plataforma)} en el ` +
          `momento en que el cliente la crea. Búscala en esa casilla por el nombre del sitio. ` +
          `Si no está, MIRA EL SPAM antes de escribirle: las invitaciones de panel se filtran ` +
          `seguido, y una carpeta sin revisar manda a buscar la causa en el lugar equivocado.`,
      } : {}),
    },
    `avance (${que}) ${prefijo}… · ${pedido.dominio || '(sin dominio)'}`,
    env,
    fetchImpl,
  );
}

/**
 * Recorta cualquier id de pedido COMPLETO que venga dentro de un texto libre.
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ───────────────────────────────────────────────────────────
 *
 * La regla del prefijo se cumplía en el campo dedicado y se escapaba por el campo libre.
 * `decidirDesdeFlow` arma detalles como «El pago dice ser del pedido X y se buscó Y» con los
 * dos ids ENTEROS (flow.js:274, y lo mismo en cobro.js:112 y :366), y `cuerpoDeRevisar`
 * reenviaba ese texto tal cual. Esos 32 hex son la única credencial de la pantalla del
 * cliente —no hay cuenta ni contraseña— y el aviso viaja hasta una casilla de correo, donde
 * queda guardado, se reenvía y se indexa.
 *
 * Se limpia ACÁ, en la frontera por donde los datos salen, en vez de en cada `detalle`: así
 * cubre también los detalles que alguien escriba mañana sin saber de esta regla. Arreglar los
 * tres textos de origen habría dejado el cuarto esperando.
 *
 * Y vuelve cierta una frase que la política de privacidad ya promete en el punto 01: «en el
 * aviso no va tu correo ni el enlace de tu pedido: solo el sitio, el monto y un trozo del
 * número de pedido». Antes de esto era falsa en el camino `id-no-calza`.
 */
export function recortarIds(texto) {
  return String(texto == null ? '' : texto)
    .replace(/vyc_[0-9a-f]{32}/gi, (m) => `${m.slice(0, LARGO_PREFIJO)}…`);
}

/**
 * El mensaje tal como lo recibe Resend.
 *
 * ── POR QUÉ UNA LISTA DE «RÓTULO: VALOR» (3-nov-2026) ────────────────────────────────────
 *
 * Con el proveedor anterior, cada campo del cuerpo se convertía en una línea del correo: era
 * él el que armaba el mensaje. Resend recibe el texto ya escrito, así que esa conversión pasó
 * a ser nuestra. Se mantiene la MISMA forma —un rótulo por línea— porque es la que se lee de
 * un vistazo en el teléfono, que es dónde se lee un aviso de venta.
 *
 * `subject` es la única llave reservada: es el asunto, no un campo del cuerpo. Todo lo demás
 * se imprime en el orden en que lo escribió el `cuerpoDe…` que corresponda.
 *
 * ⚠️ `recortarIds` se aplica acá, sobre el texto ENTERO y ya armado. Es la última línea antes
 * de que esto salga del Worker: lo que pase de acá ya no se puede recortar. Los `cuerpoDe…`
 * limpian además su propio campo libre, y eso no es duplicado inútil — es que la función que
 * arma un aviso tiene que devolverlo ya seguro, se mande por donde se mande.
 */
export function mensajeDeAviso(cuerpo) {
  const { subject, ...campos } = cuerpo;
  const texto = Object.entries(campos).map(([rotulo, valor]) => `${rotulo}: ${valor}`).join('\n');
  return {
    from: REMITENTE,
    to: [DESTINO_AVISOS],
    subject: recortarIds(subject),
    text: recortarIds(texto),
  };
}

/**
 * Cuánto del cuerpo de la respuesta entra en el registro. Una página de error de Cloudflare
 * son 8 KB de HTML con un desafío de JavaScript dentro: sin tope, el dato útil queda sepultado
 * en su propio volcado y la línea se vuelve ilegible justo cuando hay que leerla.
 */
export const LARGO_RASTRO = 400;


/**
 * La línea que queda cuando un aviso NO salió.
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ───────────────────────────────────────────────────────────
 *
 * Antes, un aviso que fallaba dejaba `[aviso] Web3Forms contestó http-403` y nada más.
 * Faltaban las dos cosas que uno necesita justo cuando va a leer esa línea:
 *
 *   - QUÉ dijo el proveedor. Con el código solo, ese 403 se leía como una clave mala o un
 *     bloqueo pasajero. El cuerpo de la respuesta traía la causa entera escrita —«use our API
 *     in client side»— y se descartaba sin leerlo. Todo el diagnóstico que terminó en esta
 *     mudanza salió de ese cuerpo, que el código llevaba meses tirando a la basura.
 *   - CUÁL pedido. La línea de éxito nombraba el pedido y el dominio; la de fallo no nombraba
 *     ninguno. O sea que la línea que importa era la que menos decía: se podía saber que se
 *     perdió un aviso, no de qué venta.
 *
 * Y va por `console.error`, no por `console.log`: en los registros de Cloudflare el nivel es
 * filtrable, así que el fallo se busca por nivel en vez de leyendo todas las invocaciones. No
 * hay cola de reintentos ni servicio de errores acá y no se inventa ninguno: esto es lo más
 * simple que vuelve el fallo encontrable después de que pasó.
 *
 * El cuerpo pasa por `recortarIds` igual que el aviso. Un registro de Cloudflare lo lee
 * cualquiera con acceso a la cuenta, y el proveedor puede devolver eco de lo que le mandamos:
 * el id entero no tiene por qué quedar guardado ahí tampoco.
 */
export function rastroDelFallo(etiqueta, codigo, respuesta) {
  const cuerpo = recortarIds(respuesta).replace(/\s+/g, ' ').trim().slice(0, LARGO_RASTRO);
  const deRaiz = esPasajero(codigo)
    ? ''
    : ' · NO ES PASAJERO: Resend rechazó el envío (clave, remitente, destinatario o cuerpo),'
      + ' así que reintentar va a fallar igual: hay que arreglarlo';
  return `[aviso] FALLÓ ${etiqueta} · ${codigo} · ${cuerpo || '(respuesta vacía)'}${deRaiz}`;
}

/**
 * El único lugar de este archivo que manda un aviso.
 *
 * Antes del 3-nov-2026 los tres avisos tenían cada uno su copia del bloque de envío, y las
 * tres trataban el fallo distinto: ninguna leía el cuerpo de la respuesta y ninguna decía de
 * qué pedido se trataba. Tres copias divergentes de «qué hacer cuando falla» son tres veces la
 * posibilidad de que una se quede atrás; acá hay una sola. Y la petición en sí tampoco vive
 * acá: es la de `correo.js`, que es el único lugar del proyecto que le habla a Resend.
 *
 * Sigue valiendo la regla de la cabecera: NUNCA LANZA. Un pago que entró no se puede perder
 * porque un aviso no salió.
 *
 * @param {object} cuerpo    el cuerpo ya armado por el `cuerpoDe…` que corresponda
 * @param {string} etiqueta  qué aviso es y de qué pedido, para que la línea del registro lo diga
 * @param {object} env       de donde sale `RESEND_API_KEY`
 */
async function mandarAviso(cuerpo, etiqueta, env, fetchImpl) {
  const r = await mandarPorResend(mensajeDeAviso(cuerpo), env && env.RESEND_API_KEY, fetchImpl);
  if (!r.ok) {
    // La clave que falta es un aviso perdido igual que un 403, y por el mismo motivo hay que
    // enterarse: sin ella NINGÚN aviso va a salir nunca. Va al nivel de error con el resto.
    const cuerpoDicho = r.codigo === 'sin-clave'
      ? 'no hay RESEND_API_KEY cargada en el entorno'
      : r.cuerpo;
    console.error(rastroDelFallo(etiqueta, r.codigo, cuerpoDicho));
    return false;
  }
  console.log(`[aviso] salió ${etiqueta}`);
  return true;
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
 *
 * ⚠️ El «qué hacer» no nombra una pasarela. Lo usan los dos manejadores —Mercado Pago y Flow—
 * y desde hoy también la compuerta del contracargo; decir «abre la orden en Mercado Pago» en
 * un aviso de un pago de Flow mandaría a mirar el panel equivocado. El motivo ya dice de qué
 * se trata.
 */
export function cuerpoDeRevisar(pedido, decision) {
  const prefijo = String((pedido && pedido.id) || '').slice(0, LARGO_PREFIJO);
  const d = decision || {};
  return {
    subject: `REVISAR · ${d.motivo || 'sin motivo'} · ${(pedido && pedido.dominio) || 'sitio sin nombre'}`,
    Sitio: (pedido && pedido.dominio) || '(sin dominio)',
    Motivo: d.motivo || '(sin motivo)',
    Detalle: recortarIds(d.detalle) || '(sin detalle)',
    'Pedido (prefijo)': `${prefijo}…`,
    Estado: (pedido && pedido.estado) || '(sin estado)',
    'Qué hacer': 'La pasarela avisó algo que NO calza con lo que vendimos, así que el pedido ' +
      'no se movió solo. Abre la base de pedidos y la orden en el panel de la pasarela, y ' +
      'compara antes de tocar nada. Mientras tanto el cliente ve su pedido sin avanzar.',
  };
}

/** El aviso de que algo necesita una persona. Nunca lanza, igual que el de venta. */
export async function avisarRevisar(pedido, decision, env, fetchImpl = fetch) {
  if (!pedido || !pedido.id) return false;
  const prefijo = String(pedido.id).slice(0, LARGO_PREFIJO);
  return mandarAviso(
    cuerpoDeRevisar(pedido, decision),
    `REVISAR (${(decision || {}).motivo || 'sin motivo'}) ${prefijo}… · ${pedido.dominio || '(sin dominio)'}`,
    env,
    fetchImpl,
  );
}

/**
 * Manda el aviso. Devuelve true solo si Resend lo aceptó, y nunca lanza.
 *
 * @param {object} pedido  el pedido ya marcado como pagado
 * @param {object} env  de donde sale `RESEND_API_KEY`
 * @param {function} fetchImpl  inyectable para las pruebas
 */
export async function avisarVenta(pedido, env, fetchImpl = fetch) {
  if (!pedido || !pedido.id) return false;
  const prefijo = String(pedido.id).slice(0, LARGO_PREFIJO);
  return mandarAviso(
    cuerpoDelAviso(pedido),
    `VENTA ${prefijo}… · ${pedido.dominio || '(sin dominio)'}`,
    env,
    fetchImpl,
  );
}
