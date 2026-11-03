/**
 * En qué va el pedido, dicho para la persona que lo compró.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * LA DECISIÓN DE FONDO: SOLO SE MUESTRA LO QUE LA BASE SABE
 *
 * El brief proponía seis etapas: pago recibido, falta el acceso, revisión del alcance,
 * implementación en curso, verificación final y entrega lista. Son seis estados de ánimo, no
 * seis datos: el sistema no registra cuándo empieza la «revisión del alcance» ni cuándo pasa a
 * «verificación final», porque esos momentos ocurren en la cabeza de quien entrega.
 *
 * Mostrar una barra de seis pasos que en realidad solo sabe tres es teatro, y es exactamente
 * el tipo de cosa que este producto no hace en ninguna otra parte: el chequeo declina cuando no
 * puede medir en vez de inventar un puntaje. La pantalla del pedido se comporta igual.
 *
 * Acá cada etapa sale de un dato guardado, y ninguna existe sin él. Son once, y la cuenta subió
 * porque aparecieron datos nuevos que de verdad separan situaciones distintas —si hay orden en
 * la pasarela, si llegaron los datos de la empresa, y desde el 3-nov-2026 qué señales se
 * contrataron—, no porque se agregara un paso para que la barra se viera más larga. La prueba
 * fija el número a propósito: agregar una etapa obliga a pasar por ahí y a decir qué dato la
 * sostiene.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * CADA ETAPA DICE QUIÉN ACTÚA
 *
 * El hueco que marcó la revisión externa: una pantalla que dice «Falta el acceso temporal» en
 * voz pasiva no nombra a nadie, y entonces el pedido se queda ahí con la plata adentro mientras
 * cada lado espera al otro. Por eso cada etapa trae `quienActua`, y cuando es el cliente, trae
 * literal lo que tiene que hacer.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────────
 * CÓMO ENTRA LA PERSONA
 *
 * Con el enlace, y nada más. El id del pedido son 32 caracteres hexadecimales de azar
 * (`crypto.randomUUID`, 122 bits), así que la URL misma es la llave: no se puede recorrer ni
 * adivinar. Sin cuenta, sin contraseña, sin registro.
 *
 * Es a propósito y es coherente con el resto: el chequeo gratuito no pide correo, y sería raro
 * que justo después de pagar apareciera un formulario de registro. El costo es el de cualquier
 * enlace secreto: quien lo tenga, entra. Por eso la vista pública no lleva el informe completo
 * ni los datos de facturación.
 */

import { ESTADOS, tieneReferenciaDePago } from './pedidos.js';

export const ETAPAS = {
  SIN_ORDEN: 'sin-orden',
  CONFIRMANDO: 'confirmando',
  PAGO_PENDIENTE: 'pago-pendiente',
  FALTA_DATOS: 'falta-datos',
  FALTA_ACCESO: 'falta-acceso',
  REDACTANDO: 'redactando',
  EN_CURSO: 'en-curso',
  ENTREGADO: 'entregado',
  SIN_PAGO: 'sin-pago',
  DEVUELTO: 'devuelto',
  CONTRACARGADO: 'contracargado',
};

export const ACTUA = {
  CLIENTE: 'cliente',
  NOSOTROS: 'nosotros',
  NADIE: 'nadie',
};

/**
 * Las señales contratadas, vengan como lista o como el texto JSON de una lista.
 *
 * ⚠️ LAS DOS FORMAS LLEGAN DE VERDAD, Y CONFUNDIRLAS ROMPE JUSTO LA PANTALLA INTERNA.
 *
 * `leerPedido` hidrata la columna y entrega un arreglo; `listarPedidos` —la consulta que
 * alimenta `/api/cola`— devuelve la fila cruda, con el TEXTO JSON tal como está en la base, y
 * le pasa esa fila a `etapaDelPedido`. O sea que la misma función recibe el campo de dos
 * formas distintas según quién pregunte.
 *
 * Si acá se diera por hecho el arreglo, la cola de trabajo nuestra calcularía otra etapa que
 * la pantalla del cliente para el MISMO pedido, que es exactamente lo que `cola.js` dice que
 * vino a evitar («dos criterios de en qué va este pedido se contradicen en silencio»).
 */
export function listaDeSenales(v) {
  if (Array.isArray(v)) return v;
  if (typeof v !== 'string') return [];
  try {
    const lista = JSON.parse(v);
    return Array.isArray(lista) ? lista : [];
  } catch { return []; }
}

export function senalesContratadas(pedido) {
  return listaDeSenales(pedido && pedido.senales_contratadas);
}

/**
 * Lo que el kit cierra SIN entrar al sitio del cliente.
 *
 * ── POR QUÉ EXISTE ESTA LISTA (3-nov-2026) ────────────────────────────────────────────────
 *
 * El 2-nov `politica` entró a `CIERRA_EL_KIT` (ver elegibilidad.js): el kit también se le
 * vende a quien solo le falta publicar su política de privacidad, que es cerca de la mitad de
 * los sitios reales. La decisión quedó instalada en la compuerta de la compra, en la oferta y
 * en la lista de «lo que incluye tu kit»… y NO en el camino de después del pago.
 *
 * Consecuencia, encontrada por una auditoría: todo pedido pagado se frenaba en «ahora
 * necesitamos entrar a tu sitio», con el detalle «para instalar el gestor de consentimiento».
 * A alguien que compró un borrador de política se le exigía una cuenta de administrador de su
 * propio sitio que su compra no requiere y que puede, con toda razón, no querer darnos. Es el
 * peor momento posible para pedir de más: ya pagó.
 *
 * El borrador se redacta con los datos que la persona escribe en su propia pantalla (razón
 * social, RUT, giro, dirección). No hay nada que instalar, así que no hay acceso que pedir.
 *
 * ⚠️ `casilla` NO está acá, y no es un olvido: arreglar una casilla de consentimiento es
 * editar el formulario del cliente, y para eso sí hay que entrar. Lo mismo cualquier señal del
 * gestor (`cmp`, `carga`, `cookies`, `envio`, `aviso`). Esta lista es «lo que se entrega sin
 * tocar su sitio», no «lo que es chico».
 *
 * ⚠️ Y hay una copia de esta regla en `public/pedido/index.html`, porque el formulario del
 * navegador decide con ella si pide la plataforma. Las dos se revisan juntas, y hay una prueba
 * que las compara para que no puedan separarse en silencio.
 */
export const SIN_ENTRAR_AL_SITIO = new Set(['politica']);

/**
 * ¿Hace falta que el cliente nos deje entrar a su sitio para entregar lo que compró?
 *
 * Se responde con el contrato CONGELADO, igual que todo lo demás que la pantalla afirma sobre
 * la compra: si mañana el kit cubre otra cosa, este pedido sigue valiendo por lo que se vendió
 * el día que se pagó.
 *
 * ⚠️ FALLA HACIA «SÍ HACE FALTA», a propósito. Un pedido cuyas señales no se puedan leer
 * —columna vacía, JSON roto, un objeto armado a mano en una prueba— sigue el camino de
 * siempre. Equivocarse hacia pedir el acceso es una molestia; equivocarse hacia NO pedirlo
 * dejaría un pedido diciendo «estamos trabajando» sin que nadie pueda trabajar, y el cliente
 * no tendría forma de saberlo. Por el camino real de compra esto no pasa: la compuerta exige
 * al menos una señal que el kit cierre, así que la lista nunca llega vacía.
 */
export function hayQueEntrarAlSitio(pedido) {
  const contratadas = senalesContratadas(pedido);
  if (!contratadas.length) return true;
  return contratadas.some((id) => !SIN_ENTRAR_AL_SITIO.has(id));
}

/**
 * Lo que queda del lado del cliente cuando el trabajo está cerrado.
 *
 * ⚠️ VIVE ACÁ, UNA SOLA VEZ, Y LO USAN LA PANTALLA Y EL CORREO DE CIERRE.
 *
 * Estaba escrito dos veces —en los `recordatorios` de la etapa `entregado` y en el «Dos cosas
 * por hacer de tu lado» de `correoDeEntrega`— con el mismo texto copiado. Dos copias del
 * mismo hecho se contradicen en silencio, y acá la contradicción ya tenía dónde aparecer: a
 * un comprador de solo-política las dos le decían que borrara un acceso que nunca dio.
 */
export function recordatoriosDeCierre(pedido) {
  const abogado = 'El borrador de tu política lo tiene que revisar tu abogado antes de ' +
    'publicarlo como definitivo. Nosotros no damos asesoría legal y el texto final no es ' +
    'nuestro.';
  if (hayQueEntrarAlSitio(pedido)) {
    return [
      abogado,
      'Ya puedes borrar el acceso que nos diste a tu sitio. Si no sabes dónde, escríbenos ' +
        'con este enlace y te decimos.',
    ];
  }
  // Sin acceso no hay cuenta que borrar, y decirle que la borre lo mandaría a buscar en su
  // panel una invitación que nunca creó. Lo que sí queda pendiente es publicar el texto, y
  // conviene decir de una vez que hasta que no esté arriba el chequeo lo va a seguir marcando:
  // si no, el «después» se lee como un trabajo que no sirvió.
  return [
    abogado,
    'Publicar el texto en tu sitio te toca a ti. Hasta que esté publicado, el chequeo va a ' +
      'seguir marcando la política como pendiente: no es un error, es que todavía no está ' +
      'arriba.',
  ];
}

/**
 * Traduce el pedido a una etapa, con quién actúa y qué sigue.
 *
 * Devuelve siempre la misma forma. `queHacer` es `null` cuando no le toca al cliente: una
 * pantalla que siempre pide algo entrena a la persona a ignorarla.
 */
/**
 * ⚠️ NINGÚN TEXTO QUE LEE LA PERSONA NOMBRA UNA PASARELA.
 *
 * Desde que cuál cobra es un dato conmutable (`PASARELA`), un texto que dice «Mercado Pago»
 * se vuelve falso el día que se cambia el dato, sin que nadie toque este archivo y sin que
 * nada se ponga rojo. Y a la persona no le aporta: lo que necesita saber es en qué va SU
 * pedido, no el nombre del proveedor que usamos nosotros.
 *
 * Los comentarios sí pueden nombrarla, porque cuentan de dónde salió cada decisión.
 */
export function etapaDelPedido(pedido) {
  if (!pedido) return null;

  // Lo que se le vendió a ESTE pedido decide el camino de después del pago y lo que se le dice
  // al cerrarlo. Ver `hayQueEntrarAlSitio`: sale del contrato congelado, no del catálogo de hoy.
  const entrarAlSitio = hayQueEntrarAlSitio(pedido);

  if (pedido.estado === ESTADOS.CREADO) {
    // `creado` son dos situaciones muy distintas, y el dato que las separa es si la orden
    // alcanzó a existir en Mercado Pago. Sin esta rama, a quien nunca llegó a la pasarela
    // —porque la llamada a Mercado Pago falló— le decíamos «estamos confirmando tu pago»,
    // que es mentira: no hay ningún pago que confirmar, y la página se quedaba actualizándose
    // sola para siempre esperando un aviso que nadie va a mandar.
    if (!tieneReferenciaDePago(pedido)) {
      return {
        etapa: ETAPAS.SIN_ORDEN,
        titulo: 'No alcanzamos a llevarte a pagar',
        // Sin nombrar la pasarela: cuál cobra es un dato que cambia, y un texto que la nombra
        // se vuelve falso el día del cambio sin que nadie lo toque.
        detalle: 'Guardamos tu pedido, pero algo falló al abrir el pago. No se te cobró nada.',
        quienActua: ACTUA.CLIENTE,
        queHacer: 'Vuelve a intentarlo desde tu chequeo. Si te pasa de nuevo, escríbenos con ' +
          'este enlace y lo resolvemos nosotros.',
        loQueSigue: 'Cuando lo vuelvas a pedir, te llevamos al pago y esta misma página te va a ' +
          'mostrar en qué va.',
        recordatorios: null,
        terminado: false,
      };
    }
    return {
      etapa: ETAPAS.CONFIRMANDO,
      titulo: 'Estamos confirmando tu pago',
      detalle: 'El medio de pago nos tiene que avisar que el pago se completó. Suele tardar unos ' +
        'segundos. Esta página se actualiza sola.',
      quienActua: ACTUA.NADIE,
      queHacer: null,
      // ⚠️ Lo que viene DESPUÉS del pago no es el mismo paso para todos. Anunciarle un acceso
      // temporal a quien compró solo el borrador de su política es prometer de más antes de
      // cobrar, y después contradecirse en la pantalla siguiente.
      loQueSigue: entrarAlSitio
        ? 'Cuando el pago esté confirmado, te vamos a pedir un acceso temporal a tu sitio.'
        : 'Cuando el pago esté confirmado, te vamos a pedir los datos de tu empresa para armar ' +
          'el borrador de tu política.',
      recordatorios: null,
      terminado: false,
    };
  }

  if (pedido.estado === ESTADOS.PENDIENTE) {
    return {
      etapa: ETAPAS.PAGO_PENDIENTE,
      titulo: 'Tu pago está en camino',
      // Sin esta etapa, un pago que no acredita al instante se veía igual que uno que nunca
      // salió. La diferencia importa: acá la plata ya se movió.
      detalle: 'El medio de pago que elegiste no acredita al instante. Nos van a ' +
        'avisar cuando se complete, y esta página se actualiza sola.',
      quienActua: ACTUA.NADIE,
      queHacer: null,
      // Mismo motivo que arriba: el paso siguiente depende de lo que se compró.
      loQueSigue: entrarAlSitio
        ? 'Cuando el pago esté acreditado, te vamos a pedir un acceso temporal a tu sitio.'
        : 'Cuando el pago esté acreditado, te vamos a pedir los datos de tu empresa para armar ' +
          'el borrador de tu política.',
      recordatorios: null,
      terminado: false,
    };
  }

  if (pedido.estado === ESTADOS.RECHAZADO) {
    return {
      etapa: ETAPAS.SIN_PAGO,
      titulo: 'El pago no se completó',
      detalle: 'El pago no fue aprobado. No te cobramos nada y no empezamos ningún trabajo.',
      quienActua: ACTUA.CLIENTE,
      queHacer: 'Si quieres, puedes intentarlo de nuevo. Si te vuelve a pasar, escríbenos y lo vemos.',
      loQueSigue: null,
      recordatorios: null,
      terminado: true,
    };
  }

  if (pedido.estado === ESTADOS.CONTRACARGADO) {
    return {
      etapa: ETAPAS.CONTRACARGADO,
      titulo: 'Tu banco revirtió el pago',
      // No se dice «te devolvimos»: no fuimos nosotros, y el dinero vuelve por el camino del
      // emisor, no por el nuestro. Decirlo al revés es atribuirse una acción que no se hizo.
      detalle: 'Nos avisan que el emisor de tu tarjeta revirtió este pago. Nosotros ' +
        'no emitimos esa devolución, así que si no la pediste tú, conviene que hables con tu banco.',
      quienActua: ACTUA.CLIENTE,
      queHacer: 'Si fue un error o no reconoces el movimiento, escríbenos con este enlace y lo ' +
        'revisamos contigo.',
      loQueSigue: null,
      recordatorios: null,
      terminado: true,
    };
  }

  if (pedido.estado === ESTADOS.DEVUELTO) {
    return {
      etapa: ETAPAS.DEVUELTO,
      titulo: 'Te devolvimos el dinero',
      detalle: 'Este pedido quedó cerrado y el pago volvió a tu medio de pago. Puede tardar unos ' +
        'días en aparecer, según tu banco.',
      quienActua: ACTUA.NADIE,
      queHacer: null,
      loQueSigue: null,
      recordatorios: null,
      terminado: true,
    };
  }

  if (pedido.estado === ESTADOS.ENTREGADO) {
    return {
      etapa: ETAPAS.ENTREGADO,
      // ⚠️ «Tu sitio quedó listo» es falso para quien compró solo el borrador: su sitio sigue
      // igual, y lo que cambia cuando él publique el texto. Lo que quedó listo es el borrador.
      titulo: entrarAlSitio ? 'Tu sitio quedó listo' : 'Tu borrador quedó listo',
      // Esta frase decía «Abajo está el antes y el después», y la pantalla no lo dibujaba.
      // Después dijo «Te mandamos el antes y el después por correo», y ese correo no existía en
      // ninguna línea del repo: `correo.js` solo definía el de pago. Dos versiones de la misma
      // falta, prometiendo cosas distintas que no estaban.
      //
      // Ahora el correo existe (`correoDeEntrega`) y lo manda el endpoint que marca la entrega.
      // Pero un correo puede no salir —Resend caído, clave vencida— y el trabajo igual está
      // hecho, así que la pantalla NO afirma que llegó: dice que se mandó y da la salida si no
      // apareció. Es cierto en los dos casos, que es la única forma de que siga siendo cierto
      // el día que falle.
      // ⚠️ Y ESTA FRASE TAMPOCO AFIRMA EL RE-CHEQUEO SIN SABER SI PASÓ.
      //
      // Decía «volvimos a correr el chequeo» sin condición ninguna, igual que el correo. Un
      // pedido se puede entregar sin rehacer la medición —el endpoint lo acepta y lo deja
      // escrito en `informe_final_json: null`— y entonces la pantalla afirmaba un trabajo que
      // la misma fila desmiente, dos columnas más allá.
      //
      // El dato que lo decide ya estaba en el pedido. No distinguirlo no era una limitación.
      //
      // ⚠️ Y «Hicimos los cambios» tampoco vale para todos. A quien compró solo el borrador no
      // le tocamos el sitio: le redactamos un texto. Afirmar un cambio que no hicimos es la
      // misma clase de falsedad que las dos que este bloque ya venía a corregir.
      detalle: entrarAlSitio
        ? (pedido.informe_final_json
          ? 'Hicimos los cambios y volvimos a correr el chequeo sobre la misma página que ' +
            'medimos al principio. Te mandamos el detalle por correo; si no te llegó, ' +
            'escríbenos con este enlace y te lo reenviamos.'
          : 'Hicimos los cambios. Todavía no volvimos a correr el chequeo sobre tu página, así ' +
            'que esta vez no va un antes y un después. Te mandamos el detalle por correo; si lo ' +
            'quieres con el número, escríbenos con este enlace y lo corremos.')
        : (pedido.informe_final_json
          ? 'Te mandamos por correo el borrador de tu política, armado con los datos de tu ' +
            'empresa, y volvimos a correr el chequeo sobre la misma página que medimos al ' +
            'principio. Si no te llegó el correo, escríbenos con este enlace y te lo reenviamos.'
          : 'Te mandamos por correo el borrador de tu política, armado con los datos de tu ' +
            'empresa. Todavía no volvimos a correr el chequeo sobre tu página, así que esta vez ' +
            'no va un antes y un después. Si no te llegó el correo, o lo quieres con el número, ' +
            'escríbenos con este enlace.'),
      quienActua: ACTUA.NADIE,
      // ⚠️ NI `queHacer` NI `loQueSigue`, Y LAS DOS COSAS QUE EL CLIENTE TIENE QUE HACER VAN
      // EN `recordatorios`. Vale la pena explicar por qué son campos distintos.
      //
      // La primera versión de este arreglo puso las dos obligaciones en `queHacer`, que es
      // lo que la pantalla dibuja en la caja ámbar «TE TOCA A TI» con un botón de escribirnos.
      // Una prueba que ya existía se puso roja y tenía razón: ese recuadro significa «tu
      // pedido está detenido esperándote», y un pedido entregado no está detenido. El
      // principio estaba escrito desde antes —«una pantalla que siempre pide algo entrena a la
      // persona a ignorarla»— y ponerle una alerta a un trabajo terminado es justo cómo se
      // gasta esa atención.
      //
      // Pero las dos obligaciones son reales y no se pueden callar: le dejamos una cuenta de
      // administrador viva en su sitio, y un borrador de política que todavía no revisó ningún
      // abogado. Si publica el borrador como definitivo porque nadie se lo dijo, el daño es
      // suyo y la culpa nuestra.
      //
      // Así que son dos conceptos, no uno: lo que BLOQUEA (urgente, con alerta) y lo que QUEDA
      // de su lado (calmado, permanente, sin botón). `recordatorios` es el segundo.
      queHacer: null,
      loQueSigue: null,
      // ⚠️ Y NO SON SIEMPRE LAS MISMAS DOS. La lista salía escrita acá, fija, con «ya puedes
      // borrar el acceso que nos diste»: a quien nunca dio un acceso eso lo manda a buscar en
      // su panel una invitación que no existe, y además le afirma que se la pedimos. Ahora la
      // arma `recordatoriosDeCierre`, que es la misma que usa el correo de cierre.
      recordatorios: recordatoriosDeCierre(pedido),
      terminado: true,
    };
  }

  // Pagado. Son TRES sub-etapas, no dos, y cada una sale de un dato distinto.
  //
  // Antes eran dos y las dos primeras estaban colapsadas: se miraba solo `acceso_recibido_en`,
  // así que a quien ya había mandado los datos de su empresa se le seguía pidiendo todo de
  // nuevo. Pedirle a alguien algo que ya entregó es la forma más rápida de que deje de
  // contestar.
  if (!pedido.razon_social) {
    return {
      etapa: ETAPAS.FALTA_DATOS,
      titulo: 'Tu pago está confirmado. Cuéntanos de tu empresa',
      // ⚠️ Esta frase tiene que nombrar EXACTAMENTE los campos que el formulario pide. La
      // primera versión prometía «a qué correo quieres que te escriban por temas de datos» y el
      // formulario no lo pedía: una pantalla que anuncia cinco datos y muestra cuatro campos
      // hace dudar de si falta algo. Para ese correo usamos el del pedido, y se dice.
      detalle: 'Para armar el borrador de tu política necesitamos los datos que la ley pide ' +
        'publicar: razón social, RUT, giro y dirección. Para el correo de contacto por temas de ' +
        'datos usamos el mismo de tu pedido, salvo que nos digas otro.',
      quienActua: ACTUA.CLIENTE,
      // ⚠️ LA PLATAFORMA SE PIDE SOLO SI SIRVE PARA ALGO. El campo existe para poder decirle
      // dónde crear la invitación (así lo dice el comentario de `intake.js`), así que a quien
      // no le vamos a pedir ninguna invitación no hay por qué preguntársela. Y la regla de
      // arriba sigue en pie: esta frase nombra exactamente los campos que el formulario pide,
      // así que el formulario del navegador oculta ese campo en el mismo caso.
      queHacer: entrarAlSitio
        ? 'Completa los datos de tu empresa y dinos en qué plataforma está tu sitio. ' +
          'No te vamos a pedir ninguna contraseña.'
        : 'Completa los datos de tu empresa. No te vamos a pedir ninguna contraseña ni acceso ' +
          'a tu sitio: con esos datos armamos el borrador.',
      loQueSigue: entrarAlSitio
        ? 'Después te pedimos un acceso temporal a tu sitio, y ahí empezamos.'
        : 'Con eso empezamos a redactar. No hay nada que instalar en tu sitio, así que no te ' +
          'vamos a pedir entrar.',
      recordatorios: null,
      terminado: false,
    };
  }

  /* ⚠️ ACÁ SE PARTE EL CAMINO, Y ES EL ARREGLO DEL 3-NOV-2026.
   *
   * Lo que seguía era, para TODO pedido pagado, «ahora necesitamos entrar a tu sitio». Desde
   * que el kit también se le vende a quien solo le falta publicar su política (2-nov, ver
   * `SIN_ENTRAR_AL_SITIO`), eso le exige a una parte de los compradores —cerca de la mitad de
   * los sitios reales, según la medición que movió la decisión— una cuenta de administrador de
   * su sitio que su compra no necesita. Un pedido pagado trabado pidiendo algo que no
   * corresponde es la forma más rápida de que alguien pida su plata de vuelta.
   *
   * Con los datos de su empresa ya tenemos todo lo que hace falta para redactar, así que el
   * pedido pasa directo a estar en curso. No se le pide nada más.
   */
  if (!entrarAlSitio) {
    return {
      etapa: ETAPAS.REDACTANDO,
      titulo: 'Estamos redactando tu borrador',
      detalle: 'Con los datos de tu empresa estamos armando el borrador de tu política de ' +
        'privacidad, con los puntos que la ley pide publicar. No hace falta que nos des ' +
        'acceso a tu sitio: lo que compraste se redacta, no se instala.',
      quienActua: ACTUA.NOSOTROS,
      queHacer: null,
      loQueSigue: 'Cuando esté, te lo mandamos por correo para que lo revise tu abogado y lo ' +
        'publiques tú.',
      recordatorios: null,
      terminado: false,
    };
  }

  if (!pedido.acceso_recibido_en) {
    return {
      etapa: ETAPAS.FALTA_ACCESO,
      titulo: 'Tu pago está confirmado. Ahora necesitamos entrar a tu sitio',
      detalle: 'Para instalar el gestor de consentimiento necesitamos un acceso temporal, con los ' +
        'permisos mínimos. Nunca te vamos a pedir tu contraseña.',
      quienActua: ACTUA.CLIENTE,
      // Es el punto donde se muere el pedido si no se dice qué hacer. Las tres situaciones
      // reales de una pyme chilena, nombradas.
      queHacer: 'Dinos quién administra tu sitio: si eres tú, te explicamos dónde crear la ' +
        'invitación; si es otra persona o una agencia, te damos el texto listo para reenviarle; ' +
        'y si no sabes, lo averiguamos nosotros.',
      loQueSigue: 'Apenas tengamos el acceso, empezamos. No tocamos nada antes.',
      recordatorios: null,
      terminado: false,
    };
  }

  return {
    etapa: ETAPAS.EN_CURSO,
    titulo: 'Estamos trabajando en tu sitio',
    // ⚠️ Esta frase decía «Recibimos el acceso. Estamos instalando…», y afirmaba de más: el
    // dato que la dispara es que el CLIENTE dijo que el acceso está, no que el acceso entre. Si
    // no entra, la pantalla aseguraba que el trabajo iba en marcha cuando no, que es justo el
    // tipo de afirmación que este producto le marca en rojo a otros sitios.
    detalle: 'Nos dijiste que el acceso ya está. Lo estamos probando y partimos con la ' +
      'instalación: que nada se cargue antes de que la persona acepte. Si algo no nos deja ' +
      'entrar, te escribimos.',
    quienActua: ACTUA.NOSOTROS,
    queHacer: null,
    loQueSigue: 'Cuando terminemos, volvemos a correr el chequeo y te mandamos el antes y el después.',
    recordatorios: null,
    terminado: false,
  };
}

/**
 * ¿Este pedido ya está en manos nuestras, o sea empezó la prestación del servicio?
 *
 * ── POR QUÉ HACE FALTA PREGUNTARLO, Y POR QUÉ SE PREGUNTA ACÁ (3-nov-2026) ───────────────
 *
 * El artículo 5 del Decreto 52 de 2024 del Ministerio de Economía dice que un servicio
 * contratado a distancia se entiende iniciado «desde el momento en que el proveedor
 * notifique esta circunstancia al consumidor». Hasta que ese aviso sale, el plazo de retracto
 * sigue corriendo aunque el trabajo esté hecho. Así que hay que saber EN QUÉ INSTANTE empieza
 * para poder avisarlo en ese instante.
 *
 * Y el instante no es el mismo para todos, que es justo por lo que esto no puede ser un `if`
 * suelto en `intake.js`:
 *
 *   - al que hay que entrarle al sitio, el trabajo le empieza cuando declara el acceso
 *     (`acceso_recibido_en`), que es cuando pasa a `en-curso`;
 *   - al que compró solo el borrador no se le pide ningún acceso, así que le empieza cuando
 *     manda los datos de su empresa y pasa a `redactando`.
 *
 * Las dos condiciones ya están resueltas, con sus bordes, dentro de `etapaDelPedido`.
 * Escribirlas otra vez en el módulo que manda el aviso sería la tercera copia de una regla
 * que este archivo ya tuvo que unificar dos veces (ver `hayQueEntrarAlSitio` y
 * `recordatoriosDeCierre`), y la copia nueva se equivocaría sola el día que aparezca un
 * camino más.
 *
 * ⚠️ `entregado` NO cuenta. No porque el trabajo no haya empezado —claro que empezó— sino
 * porque esto se usa para decidir si MANDAR el aviso de inicio, y mandarlo junto con el
 * cierre no avisa nada: le llegarían el «empezamos» y el «terminamos» en el mismo minuto.
 * Un pedido que llegó a entregado sin aviso de inicio es un pedido al que se le trabajó con
 * el plazo abierto, y eso se mira en la cola, no se tapa con un correo tardío.
 */
export const ETAPAS_DE_TRABAJO = new Set([ETAPAS.REDACTANDO, ETAPAS.EN_CURSO]);

export function yaEmpezoElTrabajo(pedido) {
  const e = etapaDelPedido(pedido);
  return Boolean(e && ETAPAS_DE_TRABAJO.has(e.etapa));
}

/**
 * Los nombres de las señales
 *
 * Vivían en `pedido.js` sin exportar. Desde que el intake también devuelve las señales, viven
 * acá, al lado de `señalesDelPedido`, que es la función que los consume, con las mismas palabras que la persona vio en su chequeo.
 *
 * Están acá y no se leen del chequeo a propósito: el pedido guarda ids congelados, y si mañana
 * el catálogo cambia, lo que la persona ve sigue siendo lo que compró. Un id que no esté en
 * esta tabla se muestra tal cual en vez de inventarle un nombre.
 */
export const TITULOS = {
  cmp: 'Permiso antes de cargar rastreadores',
  carga: 'Rastreadores que parten solos',
  cookies: 'Cookies escritas sin permiso',
  envio: 'Datos que ya salieron de tu sitio',
  aviso: 'Si aparece un aviso al entrar',
  politica: 'Enlace a tu política de privacidad',
  https: 'Conexión cifrada (HTTPS)',
  // Faltaba, y es una señal real del chequeo rápido: un pedido cuyo `senales_fuera` la incluyera
  // habría mostrado el id crudo «casilla» en la pantalla del cliente.
  casilla: 'Casilla de consentimiento en tu formulario',
};

/**
 * Las señales del pedido, con su nombre y de quién es cada una.
 *
 * Se arma del contrato congelado, no del chequeo de hoy. Si el catálogo cambió desde que la
 * persona compró, lo que ve es lo que compró.
 */
export function señalesDelPedido(pedido, titulos = {}) {
  if (!pedido) return { incluidas: [], fuera: [] };
  const nombrar = (id) => ({ id, titulo: titulos[id] || id });
  // Por `listaDeSenales` y no `|| []`: la fila cruda de `listarPedidos` trae estas dos columnas como
  // texto JSON, y `.map` sobre un string revienta con un TypeError. Hoy ningún llamador le pasa
  // una fila cruda, pero `etapaDelPedido` —que está al lado y recibe lo mismo— sí, y dejar dos
  // formas de leer el mismo campo en el mismo archivo es dejar puesta la próxima diferencia.
  return {
    incluidas: senalesContratadas(pedido).map(nombrar),
    fuera: listaDeSenales(pedido.senales_fuera).map(nombrar),
  };
}

/**
 * ¿Hace falta volver a preguntar por el estado?
 *
 * Solo mientras el pedido se pueda mover solo, que es cuando esperamos que Mercado Pago avise.
 * En «falta el acceso» el que mueve es el cliente, y refrescar cada cinco segundos una pantalla
 * que no va a cambiar es gastar batería y dar la impresión de que algo está pasando cuando no.
 *
 * Son dos estados, no uno: `creado` (le mandamos a pagar y esperamos el aviso) y `pendiente`
 * (está pagando con un medio que no acredita al instante). Los dos se mueven sin que nadie
 * toque nada.
 *
 * ⚠️ Y hay una excepción dentro de `creado`: si no hay `mp_order_id`, la orden nunca llegó a
 * existir en Mercado Pago, así que **no hay ningún aviso en camino**. Refrescar ahí es esperar
 * para siempre algo que nadie va a mandar, con la pantalla fingiendo que progresa.
 */
export function convieneRefrescar(pedido) {
  if (!pedido) return false;
  if (pedido.estado === ESTADOS.PENDIENTE) return true;
  return pedido.estado === ESTADOS.CREADO && tieneReferenciaDePago(pedido);
}
