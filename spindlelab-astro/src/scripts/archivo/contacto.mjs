// /v3/contacto/ SOBRE A (obra E12, tanda 5). Lo carga contacto.astro. Lo que la página de driftime hacía por su cuenta
// (src/pages/v3/contacto.astro hasta la tanda 4, QA del 5 y 6-oct), sin tocar v3-contacto.js, .contact-form, los name,
// los #f-utm-* ni generate_lead (spec §6.16):
//   1. El dominio que viene del chequeo: v3-chequeo.js manda ?sitio=<dominio> en los enlaces del resultado; si el campo
//      del sitio está vacío, se rellena con él. No pisa lo que el navegador o la persona ya pusieron.
//   2. «Escríbenos» (menú y botones) apunta a esta misma página: recargaba y podía borrar lo escrito. Aquí lleva al
//      formulario, con su ruta (spec §5.2.2: nunca «#x» suelto).
//   3. v3-contacto.js cambia el texto del botón al enviar y, si el envío falla, le pone «Enviar →» (una flecha de texto
//      que ninguna de las dos letras trae). Cuando el botón vuelve a estar habilitado, se le devuelve el suyo, con su
//      flecha SVG.
//   4. Envío correcto: el script oculta el formulario y la página se acorta; la caja «Listo.» toma el foco (así además se
//      anuncia) y, si no queda entera entre el encabezado y el aviso de cookies, se centra. Sin animación con
//      movimiento reducido.

try {
  const v = (new URLSearchParams(location.search).get('sitio') || '').trim().slice(0, 200);
  const campo = document.getElementById('f-sitio');
  if (v && campo && !campo.value) campo.value = v;
} catch (e) { /* sin parámetro, nada que hacer */ }

const AQUI = '/v3/contacto/';
document.querySelectorAll(`a[href="${AQUI}"]`).forEach((a) => a.setAttribute('href', `${AQUI}#contacto-form`));

const boton = document.querySelector('.contact-form button[type="submit"]');
if (boton && 'MutationObserver' in window) {
  const suyo = boton.innerHTML;
  const texto = boton.textContent;
  new MutationObserver(() => {
    if (!boton.disabled && boton.textContent !== texto) boton.innerHTML = suyo;
  }).observe(boton, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });
}

const listo = document.querySelector('.form-success');
if (listo && 'MutationObserver' in window) {
  const mo = new MutationObserver(() => {
    if (listo.hidden) return;
    mo.disconnect();
    listo.tabIndex = -1;
    listo.focus({ preventScroll: true });
    const cab = document.querySelector('.cab');
    const rc = cab ? cab.getBoundingClientRect() : null;
    const arriba = rc && rc.bottom > 0 && getComputedStyle(cab).position === 'sticky' ? rc.bottom : 0;
    let abajo = window.innerHeight;
    const aviso = document.getElementById('cookie-banner');
    if (aviso && aviso.getClientRects().length) {
      const ra = aviso.getBoundingClientRect();
      if (ra.height && ra.top < abajo) abajo = ra.top;
    }
    const r = listo.getBoundingClientRect();
    if (r.top < arriba + 8 || r.bottom > abajo - 8) {
      const quieto = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      listo.scrollIntoView({ block: 'center', behavior: quieto ? 'auto' : 'smooth' });
    }
  });
  mo.observe(listo, { attributes: true, attributeFilter: ['hidden'] });
}
