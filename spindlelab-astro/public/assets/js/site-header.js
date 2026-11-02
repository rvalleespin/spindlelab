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

  /* Cajón del menú móvil (burger). El clic que abre y cierra lo maneja el script de cada
     página (alterna .open y aria-expanded); acá solo se completa lo que le faltaba, igual
     que el cajón del home: el rótulo del botón, cerrar con Escape devolviendo el foco al
     botón, cerrar al elegir un enlace (el de «Pedir la revisión» en /contacto/ es un ancla
     de la misma página) y cerrar si la ventana se ensancha hasta la barra de escritorio. */
  var btn = hdr.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  var sync = function () {
    var open = links.classList.contains('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  var close = function () {
    links.classList.remove('open');
    sync();
  };
  btn.addEventListener('click', sync);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      close();
      btn.focus();
    }
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a')) close();
  });
  if (window.matchMedia) {
    var wide = window.matchMedia('(min-width: 1024px)');
    var onWide = function (m) {
      if (m.matches) close();
    };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }
})();
