/**
 * ¿ETIQUETA o FRASE?
 *
 * Las mayúsculas del v3 son para etiquetas: la palabra única de un campo de color
 * (DESARROLLO, VISIBILIDAD) y los rótulos chicos. Cuando un titular es una frase, las
 * mayúsculas de peso 800 lo convierten en un bloque macizo en vez de un titular.
 *
 * No es criterio mío. Medido en la página de caso de la referencia: de sus diez
 * encabezados de 28px o más, CERO llevan mayúsculas forzadas y todos van en peso 500.
 * Y medido en el propio v3 antes de este cambio: la mediana de los titulares en
 * mayúsculas era 25 caracteres, pero 27 de 105 pasaban de 34, y esos son justo los que
 * caían en tres líneas y se leían como párrafo gritado.
 *
 * LA REGLA, para que no haya que discutirla titular por titular:
 *   es FRASE si pasa de seis palabras,
 *   o si termina en punto/interrogación/exclamación Y pasa de 34 caracteres.
 * Todo lo demás es ETIQUETA y se queda en mayúsculas.
 *
 * El largo va junto con la puntuación por un caso concreto: «¿Por dónde te toca
 * partir?» es una pregunta, pero mide 26 caracteres, entra en una línea y en caja alta
 * se lee como etiqueta, que es lo que es. Sin el umbral de largo, la regla la mandaba a
 * caja baja y desafinaba una página que estaba bien.
 */
export function esFrase(t: unknown): boolean {
  if (typeof t !== 'string') return false;
  const s = t.trim();
  if (!s) return false;
  if (s.split(/\s+/).length > 6) return true;
  return /[.?!]$/.test(s) && s.length > 34;
}

/** Devuelve la clase de caja que le toca al titular. */
export function caja(t: unknown): string {
  return esFrase(t) ? 'titular-frase' : 'uppercase';
}
