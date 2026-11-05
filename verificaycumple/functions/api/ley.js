/**
 * LA LEY 21.719: SU FECHA, SU PROYECTO DE POSTERGACIÓN, Y TODO TEXTO QUE LOS NOMBRE.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════
 * POR QUÉ ESTE ARCHIVO EXISTE (5-nov-2026)
 *
 * Esta fecha se corrigió a mano varias veces, y cada vez había que acordarse de nueve lugares:
 * la portada (la insignia del encabezado, la sección 01, la pregunta frecuente visible y su
 * copia en el JSON-LD), el correo que recibe el cliente, y tres comentarios de código. Alguno
 * quedaba viejo siempre, y un sitio que vende rigor con una fecha vencida en una de sus
 * pantallas se desmiente solo.
 *
 * Desde hoy el hecho vive UNA vez, acá. Cambiarlo es editar las constantes de abajo y correr
 * `node herramientas/sincronizar-ley.mjs`, que reescribe los bloques marcados de la portada.
 * Nadie vuelve a editar ese HTML a mano, y si alguien lo hace, `prueba-ley.mjs` se pone roja.
 *
 * ── QUÉ MIRAR CUANDO EL PROYECTO AVANCE ─────────────────────────────────────────────────
 *
 * El boletín es el 18.623-07. La ficha oficial de tramitación:
 *
 *     curl -s "https://tramitacion.senado.cl/wspublico/tramitacion.php?boletin=18623"
 *     (el número va SIN el -07 y SIN puntos, o responde vacío)
 *
 * Y las noticias del Senado, que es de donde salió lo del 28-oct:
 *     https://www.senado.cl/comunicaciones/noticias/
 *
 * Lo que hay que mirar, en este orden:
 *
 *   1. ¿Votó la Cámara de Diputados? Es el segundo trámite, y mientras no vote, la fecha
 *      vigente NO cambia por mucho que el Senado haya aprobado.
 *   2. ¿Se publicó la modificación en el Diario Oficial? Recién ahí la fecha nueva ES la
 *      fecha, y entonces `VIGENCIA` cambia y `PROYECTO.estado` pasa a 'publicado'.
 *   3. ¿Cambió la fecha propuesta? El Ejecutivo pedía diciembre de 2027 y el Senado la
 *      movió al 15 de octubre; la Cámara la puede volver a mover.
 *
 * ⚠️ Y NO SE ADELANTA NADA. Mientras no esté publicada, rige el 1 de diciembre de 2026, y los
 * textos lo dicen así. Escribir la fecha nueva «porque se va a aprobar» es exactamente la
 * clase de afirmación que este sitio vende no hacer.
 * ══════════════════════════════════════════════════════════════════════════════════════════
 */

/** La fecha que rige HOY. No se toca hasta que la modificación esté publicada. */
export const VIGENCIA = {
  larga: '1 de diciembre de 2026',
  corta: '1 dic 2026',
  iso: '2026-12-01',
};

/** El proyecto que la quiere mover, con el estado verificado y su evidencia. */
export const PROYECTO = {
  boletin: '18.623-07',
  // 'en-tramite' | 'publicado'. Mientras sea 'en-tramite', VIGENCIA manda.
  estado: 'en-tramite',
  fechaPropuesta: '15 de octubre de 2027',
  // Lo último verificado, con su fuente. Si esto se actualiza, se actualiza REVISADO.
  ultimoPaso: 'El 28 de octubre de 2026 el Senado lo aprobó, con 33 votos a favor y 6 en ' +
    'contra, y fijó el 15 de octubre de 2027. Falta que lo apruebe la Cámara de Diputados',
  fuente: 'https://www.senado.cl/comunicaciones/noticias/segundo-tramite-proyecto-que-posterga-entrada-en-vigencia-de-ley-de',
};

/**
 * Cuándo se miró por última vez. Va en la pantalla, así que mentir acá es mentirle a quien lee.
 * Se actualiza SOLO cuando alguien de verdad fue a mirar la tramitación, no cuando se toca el
 * archivo por otra cosa.
 */
export const REVISADO = '5-nov-2026';

/* ── LOS TEXTOS, DERIVADOS DE LO DE ARRIBA ─────────────────────────────────────────────── */

/**
 * ⚠️ LOS TEXTOS SE RAMIFICAN POR `PROYECTO.estado`, Y ESO NO ES ADORNO.
 *
 * La primera versión de este archivo escribía siempre la variante «hay un proyecto». Al
 * ensayar el cambio futuro —poner `publicado` y la fecha nueva— la pregunta frecuente quedaba
 * diciendo «entra en vigencia el 15 de octubre de 2027. El Senado ya aprobó moverla al 15 de
 * octubre de 2027», que no significa nada. O sea que el día que de verdad pase habría que
 * reescribir los textos a mano, que es exactamente lo que este archivo existe para evitar.
 *
 * Con la rama, cambiar la ley el día que se publique es editar `estado`, `VIGENCIA` y
 * `REVISADO` —tres cosas, una línea cada una— y correr el sincronizador. Nada más.
 */
const enTramite = PROYECTO.estado === 'en-tramite';

/** La sección 01 de la portada, «La fecha». Un párrafo. */
export const PARRAFO_LA_FECHA = enTramite
  ? `La Ley 21.719 entra en plena vigencia el ${VIGENCIA.larga}. Desde ese día fiscaliza la ` +
    'Agencia de Protección de Datos Personales, que puede partir por su cuenta o porque ' +
    `alguien reclama. Hay un proyecto para mover esa fecha (boletín ${PROYECTO.boletin}). ` +
    `${PROYECTO.ultimoPaso}, así que hoy rige el ${VIGENCIA.larga}.`
  : `La Ley 21.719 entra en plena vigencia el ${VIGENCIA.larga}. Desde ese día fiscaliza la ` +
    'Agencia de Protección de Datos Personales, que puede partir por su cuenta o porque ' +
    'alguien reclama. Esta fecha es la definitiva: la postergación ya se publicó.';

/** La respuesta de la pregunta frecuente. La MISMA en la pantalla y en el JSON-LD. */
export const FAQ_DESDE_CUANDO = enTramite
  ? `Entra en plena vigencia el ${VIGENCIA.larga}. El Senado ya aprobó moverla al ` +
    `${PROYECTO.fechaPropuesta}, pero falta el resto de la tramitación y la fecha puede ` +
    'cambiar. Lo que no cambia con esa votación es lo que tu sitio tiene o no tiene ' +
    'publicado hoy.'
  : `Entra en plena vigencia el ${VIGENCIA.larga}, y esa fecha ya es definitiva. Lo que no ` +
    'depende de ninguna fecha es lo que tu sitio tiene o no tiene publicado hoy.';

/** La insignia del encabezado. Es un hecho que no depende del proyecto, y por eso no lo nombra. */
export const INSIGNIA_HEADER =
  `Si pides datos, te aplica desde el <strong>${VIGENCIA.corta}</strong>`;

/** El sello de la sección 01. */
export const SELLO_REVISADO = `Revisado el ${REVISADO}.`;

/** La frase del correo al cliente, que explica para qué es el acceso que se le pide. */
export const FRASE_CORREO =
  `personales que entra en vigencia el ${VIGENCIA.larga}`;

/* ══════════════════════════════════════════════════════════════════════════════════════════
 * CÓMO SE CAMBIA ESTO, EL DÍA QUE EL PROYECTO AVANCE
 *
 *   1. Mirar la tramitación (los dos enlaces están arriba) y ver qué pasó de verdad.
 *   2. Editar acá, y solo acá:
 *        · si la Cámara votó pero NO se publicó  → `PROYECTO.ultimoPaso` y `REVISADO`
 *        · si la modificación YA se publicó      → `PROYECTO.estado = 'publicado'`,
 *                                                   `VIGENCIA` (larga, corta, iso) y `REVISADO`
 *   3. `node herramientas/sincronizar-ley.mjs`
 *   4. `node prueba-ley.mjs` (en vyc-ideas) tiene que quedar en verde.
 *
 * El HTML de la portada NO se toca a mano. Lo escribe el sincronizador, y la prueba se pone
 * roja si alguien lo edita, si se cambia la constante sin sincronizar, o si la pregunta
 * visible y la del JSON-LD dejan de decir lo mismo.
 * ══════════════════════════════════════════════════════════════════════════════════════════ */
