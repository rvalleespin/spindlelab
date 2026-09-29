/**
 * LARGO DE UN TITULAR.
 *
 * Los titulares del v3 van en MAYÚSCULAS. Eso lo decidió Ramón el 27-sep y sigue en pie:
 * el 29-sep lo confirmó explícitamente — «no estoy en contra de que los títulos vayan en
 * mayúscula».
 *
 * Pero las mayúsculas a tamaño de cartel no perdonan el largo. Un titular de once
 * palabras en caja alta y peso 800 deja de leerse como titular y se lee como un bloque.
 * Medido: la mediana de los titulares del v3 es de 25 caracteres, y los que se veían mal
 * eran los 27 que pasaban de 34 y caían en tres líneas.
 *
 * ASÍ QUE LA REGLA NO CAMBIA LA CAJA, MARCA EL TEXTO QUE HAY QUE REESCRIBIR. Un titular
 * que da `esLargo` verdadero no se arregla bajándole la caja: se arregla escribiendo una
 * frase más corta y con mejor gancho. La caja no es el problema.
 *
 * Yo me equivoqué acá el 29-sep: al ver el titular pesado le bajé la caja, que es tratar
 * el síntoma. Queda escrito para que no se repita.
 */

/** ¿Este titular pasa del largo que las mayúsculas aguantan? Si da true, hay que
 *  reescribir el texto, no cambiarle el estilo. */
export function esLargo(t: unknown): boolean {
  if (typeof t !== 'string') return false;
  const s = t.trim();
  if (!s) return false;
  return s.split(/\s+/).length > 6 || s.length > 34;
}

/** La caja de un titular del v3. Siempre mayúsculas: es el sistema. */
export function caja(_t?: unknown): string {
  return 'uppercase';
}
