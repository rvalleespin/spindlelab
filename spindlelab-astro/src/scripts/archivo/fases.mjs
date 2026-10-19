// LA FASE A LA VISTA (spec §2.4, Desarrollo web, «Cinco fases»; §1.6; lock §20.1): el único cambio de tinta atado a la
// vista que tiene Koto, en /services. La fase que cruza la franja del medio de la ventana pasa del gris al blanco y la
// anterior vuelve al gris, en 167 ms lineales (el color no lleva resorte: archivo.css). La misma franja que el prototipo
// (proto/a/a.js: del 40 % al 55 % de la ventana). Tanda 4.
//   · La lista se marca con data-vista solo si se puede observar: sin JS (o sin IntersectionObserver) los títulos quedan
//     en blanco y el cuerpo en gris, y no se pierde nada.
//   · Con movimiento reducido no se marca: todas en blanco (archivo.css).
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.fases--vista').forEach((lista) => {
  if (!('IntersectionObserver' in window) || reducir.matches) return;
  const fases = lista.querySelectorAll('.fase');
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => e.target.classList.toggle('a-la-vista', e.isIntersecting));
  }, { rootMargin: '-40% 0px -45% 0px' });
  fases.forEach((f) => io.observe(f));
  lista.setAttribute('data-vista', '');
});
