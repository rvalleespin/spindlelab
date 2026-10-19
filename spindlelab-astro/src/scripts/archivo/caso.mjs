// LA PÁGINA DE CASO DE A (spec §2.3 y §4.1; lock §21.1 y §21.3). Lo carga Caso.astro. Tanda 3.
//   · La sección a la vista se marca en el índice de la barra lateral (desde 1194: blanco y el punto de 3 px, que se
//     mueve con el resorte «estado») y en la barra flotante de bajo 1194 (su nombre, en blanco sobre la placa activa).
//     Activa: la última cuyo borde de arriba ya pasó el 40 % de la ventana; arriba de la primera, la primera (como el
//     prototipo de A).
//   · Al elegir una sección en la barra flotante, la lista se cierra.
//   · Con movimiento reducido el punto salta, sin resorte (§1.6). Sin JS: la primera sección queda marcada y los enlaces
//     llevan igual a cada una (van con su ruta, nunca «#x» suelto: §5.2).
import { animate, RESORTES, mover } from './resortes.mjs';

const secciones = Array.from(document.querySelectorAll('.caso-bloque[id]'));
const enlaces = Array.from(document.querySelectorAll('[data-secciones] a'));
const activa = document.querySelector('[data-barra-activa]');
const punto = document.querySelector('.lateral__punto');
const filas = Array.from(document.querySelectorAll('.lateral__indice a'));
let actual = null;
let movimiento = null;

function llevarPunto(i, seco) {
  if (!punto || !filas[i]) return;
  const y = filas[i].offsetTop;
  if (movimiento) movimiento.stop();
  movimiento = animate(punto, { y }, seco || !mover() ? { duration: 0 } : RESORTES.estado);
}

function marcar(seco) {
  if (!secciones.length) return;
  const linea = window.innerHeight * 0.4;
  let i = 0;
  secciones.forEach((s, j) => { if (s.getBoundingClientRect().top <= linea) i = j; });
  const id = secciones[i].id;
  if (id === actual) return;
  actual = id;
  enlaces.forEach((a) => {
    if (a.hash === '#' + id) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
  if (activa) activa.textContent = secciones[i].getAttribute('data-nombre') || '';
  llevarPunto(i, seco);
}

if (secciones.length) {
  window.addEventListener('scroll', () => marcar(false), { passive: true });
  window.addEventListener('resize', () => { actual = null; marcar(true); });
  marcar(true);
  document.querySelectorAll('.barra a').forEach((a) => {
    a.addEventListener('click', () => {
      const d = a.closest('details');
      if (d) d.open = false;
    });
  });
}
