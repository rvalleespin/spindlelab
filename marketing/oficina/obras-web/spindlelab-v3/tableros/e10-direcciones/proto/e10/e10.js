// e10.js — la cinta y el marcador de los prototipos E10 (Lucía, 16-oct-2026). Sin dependencias.
// Cinta (lock §4 y §14): 30 px/s medidos por tiempo, no por cuadro; se pausa con su botón; con
// prefers-reduced-motion parte quieta (y solo se mueve si la persona lo pide); se detiene fuera de
// pantalla. Marcador (§5): se dibuja de izquierda a derecha en ~470 ms al entrar en pantalla; con
// movimiento reducido está completo desde el principio.
(() => {
  // Solo para las comparaciones del tablero (compuerta 2): ?paleta=the-ready muestra los colores exactos de The
  // Ready y ?oro=arriba la opción B del punto dorado (lock §12). Sin parámetros, el prototipo es la dirección propia.
  const q = new URLSearchParams(location.search);
  if (q.get('paleta') === 'the-ready') document.documentElement.dataset.paleta = 'the-ready';
  if (q.get('oro') === 'arriba') document.documentElement.dataset.oro = 'arriba';

  const VELOCIDAD = 30; // px por segundo
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

  for (const caja of document.querySelectorAll('[data-cinta-caja]')) {
    const cinta = caja.querySelector('.cinta');
    const pista = caja.querySelector('.cinta__pista');
    const grupo = pista.querySelector('.cinta__grupo');
    const boton = caja.querySelector('.cinta__pausa');
    let pausada = reducido;
    const pintar = () => { caja.classList.toggle('cinta--pausada', pausada); boton.setAttribute('aria-pressed', String(pausada)); };
    const medir = () => {
      const ancho = grupo.getBoundingClientRect().width;
      if (!ancho) return;
      // copias suficientes para cubrir el ancho más una vuelta, sin hueco al reiniciar
      while (pista.children.length < Math.ceil(cinta.clientWidth / ancho) + 2) pista.appendChild(grupo.cloneNode(true));
      pista.style.setProperty('--ancho', `${ancho}px`);
      pista.style.setProperty('--dur', `${ancho / VELOCIDAD}s`);
    };
    pintar();
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(medir);
    addEventListener('resize', medir);
    boton.addEventListener('click', () => { pausada = !pausada; caja.classList.add('cinta--elegida'); pintar(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((e) => caja.classList.toggle('cinta--fuera', !e[0].isIntersecting)).observe(caja);
    }
  }

  if (!reducido && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.remove('mk--espera'); io.unobserve(e.target); }
    }), { threshold: 0.6 });
    document.querySelectorAll('.mk').forEach((m) => { m.classList.add('mk--espera'); io.observe(m); });
  }
})();
