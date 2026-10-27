/**
 * ¿Se le puede vender el kit a este sitio?
 *
 * POR QUÉ EXISTE ESTO EN EL SERVIDOR (23-oct-2026)
 *
 * La regla «sin pendientes no se vende nada» ya existía, pero vivía SOLO en el navegador:
 * `pendientes > 0 ? botón del kit : botón de preguntar`. Para mostrar un botón alcanza. Para
 * cobrar, no: el precio y el pedido se fijan del lado del servidor, así que la decisión de si
 * este sitio puede comprar también tiene que tomarse acá. Una compuerta que vive en el
 * JavaScript de la página es una compuerta que cualquiera salta.
 *
 * LO QUE APARECIÓ AL ESCRIBIRLO, Y QUE LA REGLA VIEJA NO VEÍA
 *
 * `pendientes > 0` cuenta TODAS las señales pendientes, y el kit no cierra todas. De las siete
 * que mide el chequeo, el kit cierra cinco: las del gestor de consentimiento. Las otras dos no
 * son suyas y no puede prometerlas:
 *
 *   - `politica` — el kit entrega un BORRADOR para que lo revise el abogado del cliente, y es
 *     el cliente quien publica. Hasta que eso pase la señal sigue pendiente, y está bien que
 *     siga pendiente: todavía no hay política publicada.
 *   - `https` — es del hosting del cliente.
 *
 * El caso real que lo destapó: tuane.cl, medido el 23-oct. Chequeo rápido 43, con UN pendiente:
 * `politica`. Chequeo profundo 100: ni un rastreador, ni una cookie, nada que retener. Con la
 * regla vieja ese sitio veía «Quiero el kit», y el kit le habría instalado un gestor de
 * consentimiento que no necesita para entregarle una plantilla. El puntaje no se habría movido.
 *
 * Por eso acá no se pregunta «¿hay pendientes?» sino «¿hay pendientes QUE EL KIT CIERRE?».
 */

/**
 * Las señales que el kit cierra, por id. Es la lista del alcance publicado, no una heurística.
 *
 * Están las cinco del gestor de consentimiento: la del chequeo rápido (`cmp`, que mira el HTML)
 * y las cuatro del profundo (que miran el comportamiento). Son el mismo trabajo visto de dos
 * maneras, y por eso se cierran juntas.
 *
 * ⚠️ Si algún día el kit pasa a incluir otra cosa, se agrega acá Y se agrega al texto del
 * alcance. Las dos listas tienen que decir lo mismo o el informe final va a prometer algo que
 * la entrega no hizo.
 */
export const CIERRA_EL_KIT = new Set(['cmp', 'carga', 'cookies', 'envio', 'aviso']);

/** Lo que el kit NO cierra, y de quién es cada uno. Se usa para explicarlo, no para decidir. */
export const NO_LO_CIERRA_EL_KIT = {
  politica: 'la publica el cliente, después de que su abogado revise el borrador que entregamos',
  https: 'es del hosting del cliente',
  // `casilla` es la cuarta señal del chequeo rápido y aparece solo cuando el sitio tiene un
  // formulario. Faltaba acá, así que caía en el texto de reserva «no es parte del kit», que es
  // cierto pero no dice por qué. El kit instala el gestor de rastreadores; los formularios del
  // cliente no los tocamos.
};

/**
 * Lo que el kit ARREGLA pero que, por sí solo, NO justifica venderlo. (Decisión de Ramón, 27-oct-2026)
 *
 * ── POR QUÉ ES UN TERCER CONJUNTO Y NO SE METE EN `CIERRA_EL_KIT` ───────────────────────
 *
 * Son dos preguntas distintas que estaban mezcladas en una sola lista:
 *
 *   1. ¿Hay algo pendiente que justifique cobrar $177.310?  →  `CIERRA_EL_KIT`
 *   2. ¿Qué entra en el trabajo una vez vendido?            →  `CIERRA_EL_KIT` + esto
 *
 * La casilla de consentimiento de un formulario es un arreglo chico y está en el espíritu de
 * lo que se vende, así que entra en el trabajo. Pero si fuera a `CIERRA_EL_KIT`, un sitio al
 * que solo le falta una casilla podría comprar un kit de $177.310 para arreglar un checkbox.
 * Eso no es vender, es cobrar de más.
 */
export const TAMBIEN_ARREGLA = new Set(['casilla']);

export const MOTIVOS = {
  PUEDE: 'puede',
  SIN_INFORME: 'sin-informe',
  NO_SE_PUDO_MEDIR: 'no-se-pudo-medir',
  NADA_PENDIENTE: 'nada-pendiente',
  NADA_QUE_EL_KIT_CIERRE: 'nada-que-el-kit-cierre',
};

/**
 * Un informe que no se pudo medir no sirve para cotizar.
 *
 * Son dos casos distintos y los dos terminan igual: `bloqueado` es que el sitio nos cerró la
 * puerta (muro de bots, o una página sin texto suficiente), y `parcial` es que no terminó de
 * cargar. En los dos sabemos menos de lo que creemos, y el chequeo ya lo declara: el puntaje
 * sale `null` cuando no se confirmó ni la mitad del peso.
 *
 * Cobrar un precio fijo por un sitio que no se pudo abrir es cobrar a ciegas.
 */
function noSePudoMedir(informe) {
  if (!informe) return false;
  return Boolean(informe.bloqueado) || Boolean(informe.parcial) ||
    informe.puntaje === null || informe.puntaje === undefined;
}

/** Los ítems pendientes de un informe, o lista vacía si no hay informe. */
function pendientesDe(informe) {
  if (!informe || !Array.isArray(informe.items)) return [];
  return informe.items.filter((i) => i && i.estado === 'pendiente');
}

/**
 * Decide si este sitio puede comprar el kit, y si no, por qué.
 *
 * Recibe los informes tal como los devuelven /api/chequeo y /api/profundo. Los dos son
 * opcionales por separado, pero hace falta al menos uno: sin ningún informe no sabemos qué
 * habría que arreglar, y eso no es un «no» del sitio, es un «todavía no miramos».
 *
 * Devuelve siempre la misma forma, para que quien llame no tenga que adivinar:
 *   { puede, motivo, cierra, noCierra, detalle }
 *
 * `cierra` y `noCierra` llevan los ítems, no solo sus ids, para que el informe de la oferta
 * pueda nombrarlos con las mismas palabras que la persona ya vio en su resultado. Nombrar una
 * señal distinto en la oferta que en el chequeo es la forma más fácil de que el comprador crea
 * que compró otra cosa.
 */
export function elegibilidad({ rapido = null, profundo = null } = {}) {
  if (!rapido && !profundo) {
    return {
      puede: false,
      motivo: MOTIVOS.SIN_INFORME,
      cierra: [],
      noCierra: [],
      detalle: 'Todavía no hemos mirado este sitio.',
    };
  }

  // Si CUALQUIERA de los dos informes no se pudo medir, no se cotiza. No se promedia ni se
  // compensa con el otro: el que falta es justamente el que no sabemos.
  const cuales = [];
  if (noSePudoMedir(rapido)) cuales.push('el chequeo rápido');
  if (noSePudoMedir(profundo)) cuales.push('la revisión con navegador');
  if (cuales.length) {
    return {
      puede: false,
      motivo: MOTIVOS.NO_SE_PUDO_MEDIR,
      cierra: [],
      noCierra: [],
      detalle: `No alcanzamos a medir este sitio en ${cuales.join(' ni en ')}. ` +
        'No es un resultado a favor ni en contra: es que no vimos, y no se puede cotizar lo que no se vio.',
    };
  }

  const pendientes = [...pendientesDe(rapido), ...pendientesDe(profundo)];

  if (!pendientes.length) {
    return {
      puede: false,
      motivo: MOTIVOS.NADA_PENDIENTE,
      cierra: [],
      noCierra: [],
      detalle: 'En lo que miramos no quedó ninguna señal pendiente. No hay nada que el kit tenga que arreglar.',
    };
  }

  const cierra = pendientes.filter((i) => CIERRA_EL_KIT.has(i.id));
  // Lo que entra en el trabajo sin justificar la venta. Ver `TAMBIEN_ARREGLA`.
  const tambien = pendientes.filter((i) => TAMBIEN_ARREGLA.has(i.id));
  const noCierra = pendientes.filter((i) => !CIERRA_EL_KIT.has(i.id) && !TAMBIEN_ARREGLA.has(i.id));

  // EL CASO QUE LA REGLA VIEJA NO VEÍA. Hay pendientes, pero ninguno es del kit: típicamente un
  // sitio limpio de rastreadores al que solo le falta publicar su política. Instalarle un gestor
  // de consentimiento no le mueve nada, porque no tiene nada que retener.
  if (!cierra.length) {
    const de = [...tambien, ...noCierra]
      .map((i) => `«${i.titulo}», que ${TAMBIEN_ARREGLA.has(i.id)
        ? 'lo arreglamos igual, pero por sí solo no justifica comprar el kit'
        : (NO_LO_CIERRA_EL_KIT[i.id] || 'no es parte del kit')}`)
      .join('; ');
    return {
      puede: false,
      motivo: MOTIVOS.NADA_QUE_EL_KIT_CIERRE,
      cierra: [],
      tambien,
      noCierra,
      detalle: `Lo que quedó pendiente en este sitio no lo cierra el kit: ${de}.`,
    };
  }

  return {
    puede: true,
    motivo: MOTIVOS.PUEDE,
    cierra,
    tambien,
    noCierra,
    detalle: noCierra.length
      ? `El kit cierra ${cierra.length === 1 ? 'la señal pendiente' : `${cierra.length} de las señales pendientes`}. ` +
        `${noCierra.length === 1 ? 'La otra queda' : 'Las otras quedan'} fuera del kit y se dice cuál en la oferta.`
      : `El kit cierra ${cierra.length === 1 ? 'la señal pendiente' : `las ${cierra.length} señales pendientes`}.`,
  };
}
