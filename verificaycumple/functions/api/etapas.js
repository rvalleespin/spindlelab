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

import { ESTADOS } from './pedidos.js';

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
export function etapaDelPedido(pedido) {
  if (!pedido) return null;

  if (pedido.estado === ESTADOS.CREADO) {
    // `creado` son dos situaciones muy distintas, y el dato que las separa es si la orden
    // alcanzó a existir en Mercado Pago. Sin esta rama, a quien nunca llegó a la pasarela
    // —porque la llamada a Mercado Pago falló— le decíamos «estamos confirmando tu pago»,
    // que es mentira: no hay ningún pago que confirmar, y la página se quedaba actualizándose
    // sola para siempre esperando un aviso que nadie va a mandar.
    if (!pedido.mp_order_id) {
      return {
        etapa: ETAPAS.SIN_ORDEN,
        titulo: 'No alcanzamos a llevarte a pagar',
        detalle: 'Guardamos tu pedido, pero algo falló al abrir el pago en Mercado Pago. No se ' +
          'te cobró nada.',
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
      detalle: 'Mercado Pago nos tiene que avisar que el pago se completó. Suele tardar unos ' +
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
      detalle: 'El medio de pago que elegiste no acredita al instante. Mercado Pago nos va a ' +
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
      detalle: 'Mercado Pago no aprobó el pago. No te cobramos nada y no empezamos ningún trabajo.',
      quienActua: ACTUA.CLIENTE,
      queHacer: 'Si quieres, puedes intentarlo de nuevo. Si te vuelve a pasar, escríbenos y lo vemos.',
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
      detalle: 'Para armar el borrador de tu política necesitamos los datos que la ley pide ' +
        'publicar: razón social, RUT, dirección y a qué correo quieres que te escriban por ' +
        'temas de datos.',
      quienActua: ACTUA.CLIENTE,
      queHacer: 'Completa el formulario de esta página. Son cuatro datos y no te vamos a pedir ' +
        'ninguna contraseña.',
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
    detalle: 'Recibimos el acceso. Estamos instalando el gestor de consentimiento y dejando que ' +
      'nada se cargue antes de que la persona acepte.',
    quienActua: ACTUA.NOSOTROS,
    queHacer: null,
    loQueSigue: 'Cuando terminemos, volvemos a correr el chequeo y te mandamos el antes y el después.',
    terminado: false,
  };
}

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
  return pedido.estado === ESTADOS.CREADO && Boolean(pedido.mp_order_id);
}
