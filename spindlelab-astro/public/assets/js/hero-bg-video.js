/* Hero de página full-bleed: reproduce el video de fondo SOLO en desktop no-ahorro.
   En móvil (<=680px), Modo de Bajo Consumo (prefers-reduced-motion) o Ahorro de
   Datos (saveData), no se descarga ni reproduce: queda el poster estático (0 bytes
   de video). Los <video class="ph-bg"> van con preload="none" y sin autoplay. */
(function () {
  var vids = document.querySelectorAll('video.ph-bg');
  if (!vids.length) return;
  var small = window.matchMedia('(max-width: 680px)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData === true;
  if (small || reduce || saveData) return; // solo poster, sin descargar el mp4
  vids.forEach(function (v) {
    v.play().catch(function () {});
  });
})();
