/**
 * Cómo se entrega el acceso al sitio. Las dos cosas que la pantalla prometía y no existían.
 *
 * ── POR QUÉ EXISTE (30-oct-2026) ─────────────────────────────────────────────────────────
 *
 * La etapa «falta el acceso» le ofrecía a la persona, literal, tres salidas:
 *
 *   «Dinos quién administra tu sitio: si eres tú, te explicamos dónde crear la invitación;
 *    si es otra persona o una agencia, te damos el texto listo para reenviarle; y si no
 *    sabes, lo averiguamos nosotros.»
 *
 * Ninguna de las dos primeras existía. No había instrucciones por plataforma en ninguna parte
 * del repo, no había texto para reenviar, y el campo `plataforma` —que se recoge en el
 * formulario EXACTAMENTE para esto, y así lo dice el comentario de `intake.js`— no lo leía
 * ningún código de entrega. Se guardaba y se quedaba ahí.
 *
 * Es el peor lugar posible para una promesa vacía: es el único punto del camino donde el
 * pedido ya está pagado y lo que falta depende de que alguien de afuera haga algo. Si ahí no
 * hay ayuda concreta, el pedido se muere con la plata adentro.
 *
 * ── LA REGLA QUE ORDENA ESTE ARCHIVO: NO SE INVENTA UNA RUTA DE MENÚ ─────────────────────
 *
 * Es la misma regla que el chequeo aplica consigo mismo —declinar en vez de puntuar cuando no
 * se puede medir—, traída acá. Los paneles de estas plataformas cambian de nombre y de lugar
 * entre versiones: Webflow movió el acceso por sitio más de una vez, y Jimdo no ofrece
 * invitaciones en todos sus planes.
 *
 * Así que cada instrucción es una de dos cosas, nunca una mezcla:
 *
 *   - `pasos`: la ruta concreta, cuando es estable y se puede nombrar.
 *   - `buscar`: QUÉ hay que encontrar y QUÉ permiso tiene que dar, cuando el nombre del menú
 *     no se puede afirmar. Es menos cómodo y es cierto.
 *
 * Las dos terminan en la misma salida: si no aparece, nos escribe y lo vemos nosotros.
 *
 * ── Y EL PERMISO SE DICE SIN MAQUILLAR ───────────────────────────────────────────────────
 *
 * En WordPress, instalar un plugin exige rol de Administrador. No hay un rol menor que pueda:
 * Editor no instala. La pantalla dice «los permisos mínimos», y el mínimo real para este
 * trabajo es el rol más alto. Decir «mínimos» y pedir Administrador sin explicar por qué es la
 * clase de cosa que hace desconfiar justo cuando la persona está por entregar una llave de su
 * sitio. Por eso cada plataforma trae `porQue` y `alFinal`.
 */

import { ETAPAS } from './etapas.js';

/** A dónde se manda la invitación. La casilla del negocio, no el subdominio de envíos. */
export const CORREO_ACCESO = 'hola@spindlelab.cl';

/**
 * Qué se necesita poder hacer, en una frase, independiente de la plataforma.
 *
 * Sirve de dos maneras: es lo que va en el texto para reenviar, y es el criterio con el que
 * alguien que conoce su panel puede encontrar la opción aunque se llame distinto.
 */
export const LO_QUE_HACE_FALTA =
  'poder instalar y configurar el gestor de consentimiento, y editar lo que el sitio carga ' +
  'antes de que la persona acepte';

/**
 * Las plataformas. La llave es la misma que guarda el formulario (ver PLATAFORMAS en intake.js):
 * si acá falta una que allá existe, cae en el genérico y nadie se entera, así que las dos
 * listas se revisan juntas.
 */
export const POR_PLATAFORMA = {
  wordpress: {
    nombre: 'WordPress',
    permiso: 'Administrador',
    porQue: 'El gestor de consentimiento es un plugin, y en WordPress solo el rol de ' +
      'Administrador puede instalar plugins. No existe un rol menor que pueda hacerlo: no es ' +
      'que pidamos de más, es que abajo de ese rol el trabajo no se puede hacer.',
    pasos: [
      'Entra a tu escritorio de WordPress (normalmente tusitio.cl/wp-admin).',
      'En el menú de la izquierda, abre Usuarios y después Añadir usuario.',
      `Pon el correo ${CORREO_ACCESO}, elige el rol Administrador y guarda.`,
      'WordPress nos manda la invitación. No tienes que darnos ninguna contraseña.',
    ],
    alFinal: 'Cuando terminemos te avisamos, y puedes borrar esa cuenta desde el mismo menú de ' +
      'Usuarios. Si prefieres borrarla tú el mismo día que entregamos, perfecto.',
  },

  shopify: {
    nombre: 'Shopify',
    permiso: 'un usuario con permiso de Temas y de Aplicaciones',
    porQue: 'En Shopify el consentimiento se maneja con una app y con el código del tema, así ' +
      'que hacen falta esos dos permisos. No hace falta que veamos tus pedidos ni tus clientes.',
    pasos: [
      'En el panel, abre Configuración y después Usuarios.',
      'Agrega un usuario con el correo ' + CORREO_ACCESO + '.',
      'Al elegir permisos, marca Temas y Aplicaciones. Puedes dejar sin marcar Pedidos, ' +
        'Clientes y Finanzas: no los necesitamos.',
    ],
    alFinal: 'Cuando terminemos puedes quitar ese usuario desde la misma pantalla.',
  },

  wix: {
    nombre: 'Wix',
    permiso: 'Administrador (o un rol que permita editar el código del sitio)',
    porQue: 'En Wix el consentimiento se instala desde el panel del sitio y toca el código que ' +
      'se carga en todas las páginas, así que el rol tiene que alcanzar para eso.',
    pasos: [
      'Abre el panel de tu sitio en Wix.',
      'Busca Configuración y dentro de ella Roles y permisos.',
      'Invita a ' + CORREO_ACCESO + ' con rol de Administrador.',
    ],
    alFinal: 'Cuando terminemos, se quita desde la misma pantalla de Roles y permisos.',
  },

  squarespace: {
    nombre: 'Squarespace',
    permiso: 'Administrador',
    porQue: 'Hace falta poder editar la inyección de código del sitio, que es donde se define ' +
      'qué se carga antes del consentimiento.',
    pasos: [
      'En el panel del sitio, busca la sección de permisos o de colaboradores.',
      'Invita a ' + CORREO_ACCESO + ' con permiso de Administrador.',
    ],
    alFinal: 'Cuando terminemos, la invitación se revoca desde la misma sección.',
  },

  webflow: {
    nombre: 'Webflow',
    permiso: 'un acceso que permita editar el código personalizado del sitio y publicarlo',
    // Acá NO se inventa la ruta: Webflow ha cambiado de lugar el acceso por sitio y el de
    // espacio de trabajo entre versiones, y una ruta equivocada manda a la persona a buscar
    // una opción que en su panel no se llama así. Se dice qué buscar.
    buscar: 'En Webflow el acceso vive en la configuración del sitio o del espacio de trabajo, ' +
      'y Webflow lo ha movido de lugar entre versiones, así que no te damos una ruta exacta ' +
      'para no mandarte a buscar un menú que capaz no se llame así en tu panel. Lo que importa ' +
      'es el permiso: que podamos editar el código personalizado del sitio y publicarlo.',
    porQue: 'En Webflow el consentimiento se define en el código personalizado del sitio, y hay ' +
      'que publicar para que el cambio quede vivo.',
    alFinal: 'Cuando terminemos, el acceso se quita desde donde lo diste.',
  },

  jimdo: {
    nombre: 'Jimdo',
    permiso: 'depende de tu plan',
    // Honesto: Jimdo no ofrece invitar colaboradores en todos sus planes, así que prometer una
    // invitación sería prometer algo que su cuenta puede no permitir.
    buscar: 'Jimdo no permite invitar a otra persona en todos sus planes. Antes de que ' +
      'busques una opción que puede no existir en tu cuenta: escríbenos y dinos qué plan ' +
      'tienes, y te decimos cómo lo hacemos en tu caso.',
    porQue: 'Según el plan, el acceso se comparte de otra forma o el cambio lo tenemos que ' +
      'coordinar contigo en una sesión corta.',
    alFinal: 'Lo acordamos contigo según lo que permita tu cuenta.',
  },

  'a-medida': {
    nombre: 'un sitio hecho a medida',
    permiso: 'lo que tenga quien lo programó',
    buscar: 'En un sitio hecho a medida no hay un panel estándar. Lo que hace falta es poder ' +
      'agregar un archivo al sitio y editar lo que va en el <head> de todas las páginas, y eso ' +
      'normalmente lo tiene quien te lo programó.',
    porQue: 'Sin tocar el <head> no se puede impedir que los rastreadores se carguen antes del ' +
      'consentimiento, que es el núcleo del trabajo.',
    alFinal: 'Coordinamos con quien lo administre y te contamos qué se cambió.',
  },
};

/**
 * Cuando no sabemos en qué está el sitio.
 *
 * Es la tercera salida que la pantalla ofrecía —«si no sabes, lo averiguamos nosotros»— y
 * tiene que ser una salida de verdad, no un «escríbenos» con otras palabras. Así que dice QUÉ
 * nos sirve para averiguarlo, que es lo que convierte un correo vago en uno accionable.
 */
export const SIN_PLATAFORMA = {
  nombre: 'tu sitio',
  permiso: 'lo averiguamos nosotros',
  buscar: 'No hace falta que lo sepas. Nosotros podemos reconocer en qué está hecho tu sitio ' +
    'mirándolo desde afuera, y de ahí te decimos exactamente dónde crear la invitación. Si ' +
    'tienes a mano el nombre de quien te hizo el sitio, o el correo donde te mandaron las ' +
    'claves, mándanoslo y vamos más rápido.',
  porQue: 'Pedirte que identifiques tu plataforma para poder ayudarte sería devolverte el ' +
    'problema.',
  alFinal: 'Te decimos qué hay que quitar cuando terminemos.',
};

/**
 * La tercera salida: no sabe quién administra su sitio.
 *
 * Es un caso real y frecuente en una pyme: el sitio lo hizo un sobrino hace cuatro años, o una
 * agencia con la que ya no hablan, y nadie sabe en qué cuenta vive. Si acá dijéramos solo
 * «escríbenos», le estaríamos devolviendo el problema con otras palabras, que es justo lo que
 * la etapa prometió no hacer.
 *
 * Vive junto a las otras dos a propósito: las tres salidas que la pantalla ofrece se escriben
 * en el mismo archivo, así que no se puede agregar una en el texto de la etapa y olvidarla acá.
 */
export const SI_NO_SABES = {
  titulo: 'No sé quién lo administra',
  texto: 'Pasa seguido, y no es un problema. Desde afuera podemos ver en qué está hecho tu ' +
    'sitio y quién tiene el dominio, y con eso te decimos a quién hay que pedírselo. Lo que ' +
    'nos ayuda: el nombre de quien te hizo el sitio, o el correo donde te llegaron las claves, ' +
    'aunque sea viejo.',
  comoSigue: 'Escríbenos con el botón de abajo, que ya lleva tu número de pedido, y lo ' +
    'averiguamos nosotros. Si no hay forma de recuperar el acceso, te lo decimos y vemos qué ' +
    'parte del kit se puede hacer igual y qué parte no. No te vamos a cobrar por algo que no ' +
    'podemos entregar.',
};

/** La ficha de una plataforma, con la salida honesta para lo que no está en la lista. */
export function fichaDePlataforma(plataforma) {
  const p = typeof plataforma === 'string' ? plataforma.toLowerCase().trim() : '';
  return POR_PLATAFORMA[p] || SIN_PLATAFORMA;
}

/**
 * El texto que la persona le reenvía a quien administra su sitio.
 *
 * ⚠️ NO LLEVA EL ENLACE DEL PEDIDO, Y ES LO MÁS IMPORTANTE DE ESTA FUNCIÓN.
 *
 * Esos 32 hex son la ÚNICA credencial de su pantalla privada: quien los tenga ve su pedido,
 * sus datos de facturación y su formulario. Un texto pensado para REENVIARSE a un tercero —una
 * agencia, un primo, un proveedor con el que capaz ya no habla— es el último lugar donde ese
 * enlace debería terminar. Lo mismo que el aviso interno manda solo un prefijo, acá no va nada.
 *
 * Quien administra el sitio no necesita ver el pedido: necesita saber qué invitación crear y a
 * dónde mandarla. Eso es todo lo que lleva.
 *
 * Está escrito en primera persona del CLIENTE, no nuestra: es un mensaje que él manda. Un
 * texto que dijera «nosotros, Verifica y Cumple, necesitamos…» no se puede reenviar sin
 * editarlo, y un texto que hay que editar no es un texto listo.
 */
export function textoParaReenviar(pedido) {
  const sitio = (pedido && pedido.dominio) || 'mi sitio';
  const ficha = fichaDePlataforma(pedido && pedido.plataforma);
  const quePedir = ficha.pasos
    ? `En ${ficha.nombre} se hace desde Usuarios: crear un acceso con permiso de ${ficha.permiso}.`
    : `Lo que necesitan es ${LO_QUE_HACE_FALTA}.`;

  // ⚠️ SIN CORTES DE LÍNEA DENTRO DE UN PÁRRAFO, al revés que el correo de pago.
  //
  // Ese correo lo componemos nosotros y sabemos a qué ancho se lee. Este se va a PEGAR en
  // cualquier parte: un WhatsApp, un correo desde el teléfono, un chat de la agencia. Un
  // párrafo cortado a mano a 95 caracteres se ve ordenado en un monitor y se ve roto en un
  // teléfono, con cada línea partida a la mitad. Los saltos van solo entre párrafos, y el
  // ancho lo decide donde se pegue.
  return [
    `Asunto: Acceso temporal a ${sitio}`,
    '',
    'Hola,',
    '',
    `Contraté un trabajo de cumplimiento de la Ley 21.719 para ${sitio}. Es la ley de datos ` +
      'personales que entra en vigencia el 1 de diciembre. La empresa que lo hace necesita un ' +
      'acceso temporal al sitio para instalar el gestor de consentimiento.',
    '',
    quePedir,
    '',
    `La invitación va a este correo: ${CORREO_ACCESO}`,
    '',
    'Dos cosas que me dejaron claras y te paso igual:',
    '',
    '- No piden ninguna contraseña. Es una invitación desde el panel, no una clave compartida.',
    '- El acceso es temporal: cuando terminen avisan, y se puede borrar la cuenta.',
    '',
    'Si algo de esto no se puede hacer como está escrito, escríbeles directo a ese correo y lo ' +
      'resuelven contigo. Quedo al tanto.',
    '',
    'Gracias.',
  ].join('\n');
}

/**
 * La ayuda completa de la etapa del acceso, o `null` si la etapa no es esa.
 *
 * ⚠️ LA CONDICIÓN VIVE ACÁ, UNA SOLA VEZ, Y NO EN CADA LLAMADOR.
 *
 * Es la lección de `tieneReferenciaDePago`, que estuvo escrita como un `if` repetido en tres
 * lugares: el día del cambio se actualizó uno y los otros dos quedaron devolviendo `false` sin
 * que nada se pusiera rojo. Acá hay dos llamadores —el GET del pedido y el POST del
 * formulario— y los dos tienen que decidir idéntico. Si la condición estuviera en los dos, la
 * pantalla del cliente mostraría la ayuda al cargar y la perdería justo después de enviar sus
 * datos, que es el momento en que la necesita.
 */
export function ayudaDeAcceso(pedido, etapa) {
  if (!pedido || !etapa || etapa.etapa !== ETAPAS.FALTA_ACCESO) return null;
  const ficha = fichaDePlataforma(pedido.plataforma);
  return {
    plataforma: pedido.plataforma || null,
    nombre: ficha.nombre,
    permiso: ficha.permiso,
    porQue: ficha.porQue,
    // Una de las dos, nunca las dos: `pasos` cuando la ruta se puede nombrar, `buscar` cuando
    // no. Un objeto con las dos dejaría que la pantalla eligiera, y entonces la decisión de
    // qué se puede afirmar quedaría en el front.
    pasos: ficha.pasos || null,
    buscar: ficha.buscar || null,
    alFinal: ficha.alFinal,
    correo: CORREO_ACCESO,
    textoParaReenviar: textoParaReenviar(pedido),
    siNoSabes: SI_NO_SABES,
  };
}
