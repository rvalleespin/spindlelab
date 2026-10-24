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
  CONFIRMANDO: 'confirmando',
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

  // Pagado. Las dos sub-etapas salen de un dato: si llegó el acceso o no.
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
 * Solo mientras el pedido se pueda mover solo, que es únicamente cuando esperamos la
 * confirmación del pago. En «falta el acceso» el que mueve es el cliente, y refrescar cada
 * cinco segundos una pantalla que no va a cambiar es gastar batería y dar la impresión de que
 * algo está pasando cuando no.
 */
export function convieneRefrescar(pedido) {
  return Boolean(pedido && pedido.estado === ESTADOS.CREADO);
}
