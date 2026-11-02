// LOS TRES RESORTES DE A (spec §1.6; lock-koto.md §9), con Motion 13.5.0 fijo (spec §5.1). ζ ≥ 1 en los tres: cero
// rebote. El color no lleva resorte: cambia en 167 ms lineal, en archivo.css (--a-color).
//
// Por qué los scripts de A son .mjs y no van dentro de los .astro: tailwind.config.mjs (que no se toca) lee las
// palabras de todo .astro, .js y .ts de src/, y una palabra que coincide con una clase de Tailwind («hidden»,
// «transform», «fixed»…) la agrega al CSS que comparten las páginas publicadas: su archivo cambia de nombre y su HTML
// deja de ser igual byte a byte. Los .mjs no los lee (desvios.md, tanda 1).
import { animate } from 'motion';

export const RESORTES = {
  // la posición del círculo del cursor: 90 % en 75 ms
  cursor: { type: 'spring', stiffness: 2700, damping: 104, mass: 1 },
  // la escala del círculo, la pieza del índice que se acorta 24 px, el punto activo del índice de secciones: 139 ms
  estado: { type: 'spring', stiffness: 800, damping: 57, mass: 1 },
  // un bloque que entra a la vista una vez, el encabezado que se pliega, «Siguiente»: 264 ms
  entrada: { type: 'spring', stiffness: 230, damping: 31, mass: 1 },
};

const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');

// Con movimiento reducido ningún resorte corre (§1.6): quien llame a mover() deja las cosas en su lugar sin animar.
export function mover() {
  return !reducir.matches;
}

export function resorte(el, valores, nombre) {
  return animate(el, valores, RESORTES[nombre]);
}

export { animate };
