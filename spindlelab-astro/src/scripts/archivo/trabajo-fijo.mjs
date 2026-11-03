// EL TRABAJO FIJO (obra E14): lo carga TrabajoFijo.astro. El mecanismo medido en Koto (e14-home-koto/medicion-koto-scroll.md
// §3.2 y §3.3), sin librerías, como el prototipo aprobado (e14-home-koto/prototipo/mov.js):
//   · desde 834, la tarjeta cuyo borde de arriba cruzó la mitad de la pantalla se enciende (.activa) y las demás quedan al
//     20 % (archivo.css); subiendo, el umbral baja 20 px (448 bajando / 468 subiendo en Koto);
//   · cuando cambia la pieza, el nombre sale hacia arriba en 133 ms (acelera) y entra desde abajo en 333 ms (frena); la
//     bajada vieja se apaga en 100 ms y la nueva entra en 167 ms con 333 ms de retardo;
//   · en la home (.k-tf--aparece) el panel aparece mientras la primera tarjeta sube de 51 % a 22 % de la pantalla, atado
//     al scroll.
// Con movimiento reducido (sin html.a-mov) todas quedan al 100 % y el nombre y la bajada cambian sin desplazamiento.
// Bajo 834 no hace nada: es una lista.
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
const ancho = window.matchMedia('(min-width: 834px)');
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// Las imágenes diferidas (la home): se piden a media pantalla de distancia
const diferidas = [...document.querySelectorAll('img[data-diferida]')];
const pedirImagen = (img) => {
  img.removeAttribute('data-diferida');
  const src = img.parentElement.querySelector('source[data-srcset]');
  if (src) { src.srcset = src.dataset.srcset; src.removeAttribute('data-srcset'); }
  img.srcset = img.dataset.srcset;
  img.src = img.dataset.src;
};
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); pedirImagen(e.target); } });
  }, { rootMargin: '50% 0px' });
  diferidas.forEach((img) => io.observe(img));
} else diferidas.forEach(pedirImagen);

document.querySelectorAll('[data-trabajo-fijo]').forEach((sec) => {
  const mov = !reducido.matches;
  const panel = sec.querySelector('[data-panel]');
  const nombre = sec.querySelector('[data-nombre]');
  const bajada = sec.querySelector('[data-bajada]');
  const tarjetas = [...sec.querySelectorAll('[data-tarjeta]')];
  const aparece = sec.classList.contains('k-tf--aparece');
  if (!panel || !nombre || !bajada || !tarjetas.length) return;
  let activa = -1;
  let pieza = -1;
  let ultimoY = window.scrollY;

  const piezaDe = (t) => t.closest('[data-pieza]');
  function ponerBajada(p, conRetardo) {
    const plantilla = sec.querySelector(`[data-pieza="${p}"] > template[data-plantilla]`);
    bajada.replaceChildren(plantilla.content.cloneNode(true));
    if (conRetardo && bajada.animate) {
      bajada.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 167, delay: 333, easing: 'linear', fill: 'backwards' });
    }
  }
  function cambiar(p) {
    const texto = sec.querySelector(`[data-pieza="${p}"]`).dataset.nombre;
    const antes = pieza;
    pieza = p;
    if (antes === -1 || !mov || !nombre.animate) {
      nombre.textContent = texto;
      ponerBajada(p, false);
      return;
    }
    nombre.getAnimations().forEach((a) => a.cancel());
    bajada.getAnimations().forEach((a) => a.cancel());
    bajada.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: 'linear', fill: 'forwards' });
    const sale = nombre.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-110%)' }], { duration: 133, easing: 'cubic-bezier(.75,0,.85,1)', fill: 'forwards' });
    sale.onfinish = () => {
      nombre.textContent = texto;
      nombre.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }], { duration: 333, easing: 'cubic-bezier(0,0,0,1)', fill: 'forwards' });
      bajada.getAnimations().forEach((a) => a.cancel());
      ponerBajada(p, true);
    };
  }

  function cuadro() {
    const y = window.scrollY;
    const bajando = y >= ultimoY;
    ultimoY = y;
    if (!ancho.matches) {
      if (activa >= 0) { tarjetas[activa].classList.remove('activa'); activa = -1; }
      return;
    }
    const vh = window.innerHeight;
    const umbral = vh / 2 + (bajando ? 0 : 20);
    let nueva = 0;
    tarjetas.forEach((t, i) => { if (t.getBoundingClientRect().top < umbral) nueva = i; });
    if (nueva !== activa) {
      if (activa >= 0) tarjetas[activa].classList.remove('activa');
      tarjetas[nueva].classList.add('activa');
      activa = nueva;
      const p = Number(piezaDe(tarjetas[nueva]).dataset.pieza);
      if (p !== pieza) cambiar(p);
    }
    if (aparece && mov) {
      const top0 = tarjetas[0].getBoundingClientRect().top;
      panel.style.setProperty('--panel', clamp((vh * 0.51 - top0) / (vh * 0.29), 0, 1).toFixed(3));
    }
  }

  cambiar(0);
  let pedido = false;
  const pedir = () => {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(() => { pedido = false; cuadro(); });
  };
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir, { passive: true });
  cuadro();
});
