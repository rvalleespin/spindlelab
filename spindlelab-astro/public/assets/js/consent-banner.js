/**
 * Banner de consentimiento de cookies — SpindleLab.
 *
 * El estado por defecto de Google Consent Mode (denegado) y si Meta Pixel se inicializa
 * ya se decidieron en el <head> de cada página, antes de que este script cargue (tiene
 * que ser así: gtag('consent','default',...) debe correr antes de gtag('config',...),
 * y este archivo se carga diferido). Acá solo se maneja la interfaz: mostrar el banner
 * si no hay una decisión guardada, y aplicar la decisión cuando la persona elige.
 */
(function () {
  var KEY = 'spindlelab_consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  var stored;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {
    stored = null;
  }
  if (!stored) banner.hidden = false;

  function setConsent(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
    banner.hidden = true;
    if (value === 'granted') {
      if (window.gtag) {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        });
      }
      if (window.__spindlelabInitMeta) window.__spindlelabInitMeta();
    }
  }

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { setConsent('granted'); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { setConsent('denied'); });
})();
