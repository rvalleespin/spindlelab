/**
 * Consentimiento de cookies — SpindleLab.
 *
 * El estado por defecto de Google Consent Mode (denegado) y si Meta Pixel se inicializa
 * ya se decidieron en el <head> de cada página, antes de que este script cargue (tiene
 * que ser así: gtag('consent','default',...) debe correr antes de gtag('config',...),
 * y este archivo se carga diferido). Acá va toda la interfaz.
 *
 * Por qué todo vive en este archivo y no en el markup: el banner está repetido en 21
 * páginas (el layout de Astro más 20 HTML estáticos), y ese markup ya se desincronizó
 * una vez, quedando el mismo aviso en tres redacciones distintas. El comportamiento, en
 * cambio, siempre estuvo en un solo lugar. El control para cambiar de opinión se inyecta
 * desde acá por la misma razón: una copia, no veintiuna.
 */
(function () {
  var KEY = 'spindlelab_consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Cookies que dejan Analytics y el Pixel. Al revocar se borran: decir "ya no te
  // seguimos" y dejar el identificador puesto en el navegador sería una media verdad.
  var COOKIES = ['_ga', '_gid', '_gat', '_fbp', '_fbc'];
  var PREFIJOS = ['_ga_', '_gat_'];

  // La decisión vive en memoria además de en localStorage. Con el almacenamiento bloqueado
  // (modo privado, o cookies de terceros cortadas del todo) localStorage.getItem devuelve
  // null para siempre, y la versión anterior de esto releía localStorage en cada paso: el
  // control se quedaba diciendo "Cookies" aunque acabaras de elegir, y peor, al rechazar no
  // detectaba que antes habías aceptado, así que no recargaba y el Pixel de Meta seguía
  // corriendo. Elegir tiene que valer para esta visita aunque no se pueda recordar.
  var estado = null;
  try {
    estado = localStorage.getItem(KEY);
  } catch (e) {
    estado = null;
  }

  function leer() {
    return estado;
  }

  function guardar(valor) {
    estado = valor;
    try {
      localStorage.setItem(KEY, valor);
      return true;
    } catch (e) {
      // Vale para esta visita, pero no la podemos recordar, y eso se dice en vez de fingir
      // que quedó guardada.
      return false;
    }
  }

  function borrarCookies() {
    var nombres = document.cookie.split(';').map(function (c) {
      return c.split('=')[0].trim();
    });
    var host = location.hostname;
    var dominios = ['', host, '.' + host];
    var partes = host.split('.');
    if (partes.length > 2) dominios.push('.' + partes.slice(-2).join('.'));
    nombres.forEach(function (nombre) {
      var nuestra = COOKIES.indexOf(nombre) !== -1 || PREFIJOS.some(function (p) {
        return nombre.indexOf(p) === 0;
      });
      if (!nuestra) return;
      dominios.forEach(function (d) {
        document.cookie =
          nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' +
          (d ? '; domain=' + d : '');
      });
    });
  }

  /* ---------------------------------------------------------------- *
   * El control: un enlace en el pie que dice qué elegiste y lo cambia *
   * ---------------------------------------------------------------- */

  var control = null;

  function textoEstado(valor) {
    if (valor === 'granted') return 'Cookies: aceptadas';
    if (valor === 'denied') return 'Cookies: rechazadas';
    return 'Cookies';
  }

  function pintarControl() {
    if (!control) return;
    var valor = leer();
    control.textContent = textoEstado(valor);
    control.setAttribute(
      'aria-label',
      valor
        ? textoEstado(valor) + '. Cambiar esta decisión'
        : 'Elegir si aceptas las cookies de medición'
    );
  }

  // Se cuelga del enlace a la política que ya existe en el pie de las 21 páginas, así que
  // hereda su tipografía y su color sin CSS nuevo. Si esa ancla no está (el 404 no la
  // tiene), se añade al final del pie; si no hay pie, no se inyecta nada y el banner de
  // primera visita sigue funcionando igual.
  function montarControl() {
    var pie = document.querySelector('footer');
    if (!pie) return;
    // Primera opción: el enlace a la política, que está en 20 de las 21 páginas y es el
    // vecino natural. Si no está (el 404), cualquier otro enlace del pie sirve igual de
    // bien: lo que importa es colgarse de algo que ya tenga el margen y el color del pie.
    // Añadir una caja suelta al <footer> dejaba el control pegado al borde izquierdo, fuera
    // del ancho de contenido, y más apagado que todo lo que tenía al lado.
    var enlaces = pie.querySelectorAll('a[href="/privacidad/"]');
    if (!enlaces.length) enlaces = pie.querySelectorAll('a');
    var ancla = enlaces.length ? enlaces[enlaces.length - 1] : null;

    control = document.createElement('button');
    control.type = 'button';
    control.id = 'cookie-preferencias';
    control.style.cssText =
      'background:none;border:0;padding:0;margin:0;font:inherit;color:inherit;' +
      'cursor:pointer;text-decoration:underline;text-underline-offset:2px';

    // El anillo de foco va en una regla propia porque `:focus-visible` no se puede escribir
    // en un style inline. Sin esto el botón no marcaba el foco: medido, outline-style
    // quedaba en none, así que quien navega con teclado no veía dónde estaba parado.
    if (!document.getElementById('cookie-preferencias-css')) {
      var css = document.createElement('style');
      css.id = 'cookie-preferencias-css';
      css.textContent =
        '#cookie-preferencias:focus-visible{outline:2px solid currentColor;' +
        'outline-offset:3px;border-radius:3px}';
      document.head.appendChild(css);
    }

    // Se copia la tipografía y el color del enlace vecino en vez de heredar los del
    // contenedor: el pie del layout de Astro y el de las páginas estáticas no los definen
    // igual, y heredando salía más chico y más apagado que su vecino (4,79:1 contra 8,89:1).
    if (ancla) {
      var suyo = getComputedStyle(ancla);
      ['color', 'fontSize', 'fontWeight', 'fontFamily', 'letterSpacing', 'lineHeight'].forEach(
        function (prop) {
          control.style[prop] = suyo[prop];
        }
      );
    }

    if (ancla) {
      // El ancla y el control se meten juntos en una envoltura, en vez de colgar el control
      // como hermano. La fila del pie de la home es un flex con space-between: dos items
      // nuevos le cambiaban el reparto del espacio a toda la fila. Con la envoltura, el
      // contenedor sigue teniendo exactamente los hijos que tenía.
      var envoltura = document.createElement('span');
      ancla.parentNode.insertBefore(envoltura, ancla);
      envoltura.appendChild(ancla);
      envoltura.appendChild(document.createTextNode(' · '));
      envoltura.appendChild(control);
    } else {
      // Un pie sin un solo enlace: no debería pasar, pero si pasa el control igual aparece.
      var caja = document.createElement('div');
      caja.style.cssText = 'margin-top:12px;font-size:13px;text-align:center';
      caja.appendChild(control);
      pie.appendChild(caja);
    }

    control.addEventListener('click', function () {
      abrirBanner(true);
    });
    pintarControl();
  }

  /* ---------------------------------------------------------------- *
   * El banner                                                         *
   * ---------------------------------------------------------------- */

  var textoOriginal = null;
  var parrafo = banner.querySelector('p');

  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Preferencias de cookies');

  function abrirBanner(desdeElControl) {
    if (parrafo && textoOriginal === null) textoOriginal = parrafo.innerHTML;
    if (parrafo && desdeElControl) {
      var valor = leer();
      parrafo.innerHTML =
        (valor === 'granted'
          ? 'Hoy tienes <strong>aceptadas</strong> las cookies de medición. '
          : valor === 'denied'
            ? 'Hoy tienes <strong>rechazadas</strong> las cookies de medición. '
            : '') + textoOriginal;
    }
    banner.hidden = false;
    // El foco entra al banner, porque quien llegó acá con el teclado venía del pie y el
    // banner está abajo del todo: sin esto, tabular seguiría por donde estaba.
    var primero = banner.querySelector('button');
    if (primero && desdeElControl) primero.focus();
  }

  // Confirmación de la acción: sin esto el banner desaparece y no queda señal de que la
  // elección se registró. Se anuncia también a lectores de pantalla.
  var aviso = null;
  var avisoTimer = null;
  function avisar(texto) {
    if (!aviso) {
      aviso = document.createElement('div');
      // Con id propio: la página de contacto ya tiene lo suyo con role="status", y sin un
      // identificador los dos se confunden al buscarlos.
      aviso.id = 'cookie-aviso';
      aviso.setAttribute('role', 'status');
      aviso.style.cssText =
        'position:fixed;left:50%;transform:translateX(-50%);bottom:24px;z-index:1000;' +
        'max-width:min(560px,calc(100vw - 32px));background:#161D26;color:#F2EFE8;' +
        'border:1px solid rgba(247,245,240,.18);border-radius:999px;padding:12px 22px;' +
        'font-size:13px;line-height:1.45;text-align:center;' +
        "font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
        'box-shadow:0 8px 28px -12px rgba(0,0,0,.6)';
      document.body.appendChild(aviso);
    }
    aviso.textContent = texto;
    aviso.hidden = false;
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () {
      if (aviso) aviso.hidden = true;
    }, 5000);
  }

  var recargaPendiente = null;

  function aplicar(valor) {
    var recordado = guardar(valor);
    banner.hidden = true;
    // Si había una recarga en camino y la persona vuelve a decidir dentro de esos 1,8 s, esa
    // recarga ya no corresponde a lo que eligió. Se cancela y se decide de nuevo abajo.
    if (recargaPendiente) {
      clearTimeout(recargaPendiente);
      recargaPendiente = null;
    }

    if (valor === 'granted') {
      if (window.gtag) {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        });
      }
      if (window.__spindlelabInitMeta) window.__spindlelabInitMeta();
    } else {
      // Esta rama no existía: antes "rechazar" solo guardaba la decisión, porque en la
      // primera visita el estado ya venía denegado de fábrica. Ahora que se puede cambiar
      // de opinión, rechazar tiene que apagar de verdad lo que estaba encendido.
      if (window.gtag) {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
        });
      }
      borrarCookies();
    }

    pintarControl();

    // Google Consent Mode se apaga en caliente, pero el Pixel de Meta no tiene forma de
    // desinicializarse una vez que arrancó. Si está corriendo y la persona acaba de
    // rechazar, la única manera honesta de que deje de correr es recargar la página, y se
    // avisa antes en vez de hacerlo de sorpresa.
    //
    // La condición mira SOLO si el Pixel está vivo, no de dónde venía la decisión. Una
    // versión anterior exigía además que el estado previo fuera 'granted', y eso sobra: si
    // fbq arrancó, arrancó, sea porque se aceptó en esta pestaña, en otra, o porque la
    // página cargó con el permiso ya dado. Preguntar por el estado previo era una forma de
    // razonar sobre la causa cuando lo único que importa es el hecho.
    if (valor === 'denied' && window.__spindlelabMetaInited) {
      avisar('Listo, quedaron rechazadas. Recargamos la página para que el Pixel de Meta deje de correr.');
      recargaPendiente = setTimeout(function () {
        location.reload();
      }, 1800);
      return;
    }

    avisar(
      recordado
        ? valor === 'granted'
          ? 'Listo, quedaron aceptadas. Puedes cambiarlo cuando quieras desde el pie de página.'
          : 'Listo, quedaron rechazadas. Puedes cambiarlo cuando quieras desde el pie de página.'
        : 'Aplicado en esta página. Tu navegador no nos deja guardar la decisión, así que en la página siguiente te la vamos a preguntar de nuevo.'
    );
  }

  // Otra pestaña del mismo sitio abierta: sin esto se quedaba con la decisión vieja, o sea
  // midiendo después de que la persona ya había rechazado, y con el control del pie diciendo
  // lo contrario de lo que eligió. El evento `storage` solo llega a las OTRAS pestañas, así
  // que no hay eco ni recargas en cadena.
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY || e.newValue === estado) return;
    estado = e.newValue;
    banner.hidden = true;
    pintarControl();

    if (estado === 'granted') {
      if (window.gtag) {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        });
      }
      if (window.__spindlelabInitMeta) window.__spindlelabInitMeta();
      return;
    }

    if (window.gtag) {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }
    borrarCookies();
    // Acá NO se recarga sola. Esta pestaña puede tener un formulario a medio escribir, y
    // recargarla por una decisión tomada en otra ventana borraría ese texto sin avisar. Si
    // el Pixel estaba corriendo en esta pestaña, se dice lo que falta y lo decide la persona.
    if (window.__spindlelabMetaInited) {
      avisar('Rechazaste las cookies en otra pestaña. Acá ya dejamos de medir con Analytics; recarga esta página para que el Pixel de Meta también deje de correr.');
    }
  });

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { aplicar('granted'); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { aplicar('denied'); });

  montarControl();
  if (!leer()) abrirBanner(false);
})();
