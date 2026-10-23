// LA PÁGINA DE CASO DE A (spec §2.3 y §4.1; lock §21.1 y §21.3). Lo carga Caso.astro. Tanda 3.
//   · La sección a la vista se marca en el índice de la barra lateral (desde 1194: blanco y el punto de 3 px, que se
//     mueve con el resorte «estado») y en la barra flotante de bajo 1194 (su nombre, en blanco sobre la placa activa).
//     Activa: la última cuyo borde de arriba ya pasó el 40 % de la ventana; arriba de la primera, la primera (como el
//     prototipo de A).
//   · Al elegir una sección en la barra flotante, la lista se cierra.
//   · Con movimiento reducido el punto salta, sin resorte (§1.6). Sin JS: la primera sección queda marcada y los enlaces
//     llevan igual a cada una (van con su ruta, nunca «#x» suelto: §5.2).
//   · Los artículos del blog (tanda 5) usan la misma plantilla con secciones cortas: con la línea al 40 %, al elegir una
//     sección de tres párrafos quedaba marcada la siguiente. Su página pone `data-linea` (en px): la activa es la última
//     que pasó esa línea, la de arriba de la pantalla; y al final de la página, si la elegida ya no puede subir, la que
//     dice la dirección (#…). Sin `data-linea` (los casos), todo como antes.
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

const conLinea = document.querySelector('[data-linea]');
function marcar(seco) {
  if (!secciones.length) return;
  const linea = conLinea ? Number(conLinea.getAttribute('data-linea')) : window.innerHeight * 0.4;
  let i = 0;
  secciones.forEach((s, j) => { if (s.getBoundingClientRect().top <= linea) i = j; });
  if (conLinea && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    const k = secciones.findIndex((s) => '#' + s.id === location.hash);
    if (k > i && secciones[k].getBoundingClientRect().top < window.innerHeight) i = k;
  }
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
  if (conLinea) window.addEventListener('hashchange', () => marcar(false));
  marcar(true);
  document.querySelectorAll('.barra a').forEach((a) => {
    a.addEventListener('click', () => {
      const d = a.closest('details');
      if (d) d.open = false;
    });
  });
}

// Con el aviso de cookies abierto, la barra flotante va 8 px sobre él (spec §2.3 y §4.3, 23-oct; acta de la obra,
// vuelta 1, defectos 2 y 4). Mientras el aviso está a la vista, su alto queda en html como --a-alto-aviso: archivo.css
// sube la barra a ese alto más 8 y lo suma al relleno de abajo de la página. Al elegir, consent-banner.js le pone
// `hidden` y la variable se va: la barra vuelve a su lugar, sin animación. Del aviso no se toca nada (ni su HTML, ni
// sus ids, ni su lugar). Sin JS no hay aviso, así que no hay nada que mover.
const aviso = document.getElementById('cookie-banner');
if (aviso && document.querySelector('.barra')) {
  const raiz = document.documentElement;
  const ajustar = () => {
    const alto = aviso.hidden ? 0 : Math.ceil(aviso.getBoundingClientRect().height);
    if (alto) raiz.style.setProperty('--a-alto-aviso', `${alto}px`);
    else raiz.style.removeProperty('--a-alto-aviso');
  };
  new MutationObserver(ajustar).observe(aviso, { attributes: true, attributeFilter: ['hidden'] });
  if ('ResizeObserver' in window) new ResizeObserver(ajustar).observe(aviso);
  ajustar();
}
