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
 * Acá hay cinco etapas y las cinco salen de un dato guardado.
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
      loQueSigue: 'Cuando el pago esté confirmado, te vamos a pedir un acceso temporal a tu sitio.',
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
      loQueSigue: 'Cuando el pago esté acreditado, te vamos a pedir un acceso temporal a tu sitio.',
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
      terminado: true,
    };
  }

  if (pedido.estado === ESTADOS.ENTREGADO) {
    return {
      etapa: ETAPAS.ENTREGADO,
      titulo: 'Tu sitio quedó listo',
      // Esta frase decía «Abajo está el antes y el después», y la pantalla todavía no lo
      // dibuja: el informe final está guardado pero no se muestra. Prometer en pantalla algo
      // que la pantalla no entrega es exactamente lo que este producto no hace. Cuando el
      // antes/después se dibuje, esta frase vuelve.
      detalle: 'Hicimos los cambios y volvimos a correr el chequeo sobre la misma página que ' +
        'medimos al principio. Te mandamos el antes y el después por correo.',
      quienActua: ACTUA.NADIE,
      queHacer: null,
      loQueSigue: null,
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
      queHacer: 'Completa los datos de tu empresa y dinos en qué plataforma está tu sitio. ' +
        'No te vamos a pedir ninguna contraseña.',
      loQueSigue: 'Después te pedimos un acceso temporal a tu sitio, y ahí empezamos.',
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
    terminado: false,
  };
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
  return {
    incluidas: (pedido.senales_contratadas || []).map(nombrar),
    fuera: (pedido.senales_fuera || []).map(nombrar),
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
