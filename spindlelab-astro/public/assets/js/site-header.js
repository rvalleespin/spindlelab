/* Header de las páginas estáticas: gana una barra translúcida al hacer scroll,
   igual que el nav del home (Nav.astro -> #nav.scrolled). Transparente arriba. */
(function () {
  var hdr = document.querySelector('.site-header');
  if (!hdr) return;
  var onScroll = function () {
    hdr.classList.toggle('scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
