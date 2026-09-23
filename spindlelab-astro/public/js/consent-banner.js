/**
 * Consentimiento de cookies, SpindleLab.
 *
 * Ni Google Analytics ni Meta Pixel se cargan hasta que la persona acepta. El <head> de
 * cada página define __spindlelabInitGA y __spindlelabInitMeta y solo las llama si el
 * permiso ya estaba guardado al abrir la página; si no, las llama este archivo al pulsar
 * Aceptar. Hasta el 22-sep, gtag.js se cargaba siempre con Consent Mode en denegado, y así
 * le mandaba a Google un aviso sin cookies de cada página vista a quien había rechazado.
 * Acá va toda la interfaz.
 *
 * OJO al cambiar este archivo junto con el <head>: el HTML se sirve sin caché, pero este
 * script puede quedar hasta 4 h en el navegador (Browser Cache TTL de la zona). Si los dos
 * cambian juntos, hay que subir el ?v= en las 21 referencias, o un visitante que vuelve
 * recibe la cabecera nueva con el script viejo. Pasó el 22-sep: la cabecera ya no cargaba
 * gtag.js sola, y el script viejo no sabía cargarlo al aceptar.
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
  // _gcl_*: las del vinculador de conversiones del tag de Google (_gcl_au dura 90 días, y
  // _gcl_aw guarda el clic de un anuncio). No aparecen en todas las visitas, pero cuando
  // aparecen son del mismo tag y la política dice que se borran; faltaban en la lista.
  var PREFIJOS = ['_ga_', '_gat_', '_gcl_'];

  // La decisión vive en memoria además de en localStorage. Con el almacenamiento bloqueado
  // (la opción de bloquear todas las cookies de los navegadores; una ventana privada NO
  // cuenta, ahí se guarda hasta cerrarla) localStorage.getItem devuelve
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

  function borrarAlmacenamientoDelTag() {
    // Versiones nuevas del tag de Google guardan también en localStorage (_gcl_ls).
    try {
      Object.keys(localStorage).forEach(function (k) {
        if (k.indexOf('_gcl_') === 0) localStorage.removeItem(k);
      });
    } catch (e) {}
  }

  function borrarCookies() {
    borrarAlmacenamientoDelTag();
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
    // Si había un aviso encima (el de la otra pestaña queda fijo), se cierra: está en la misma
    // franja de abajo y taparía los botones del banner.
    cerrarAviso();
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

  function cerrarAviso() {
    clearTimeout(avisoTimer);
    if (aviso) aviso.hidden = true;
  }

  function botonAviso(texto, principal, alPulsar) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = texto;
    b.style.cssText = principal
      ? 'background:#F4F6F3;color:#12201A;border:0;border-radius:999px;padding:6px 14px;' +
        'font:inherit;font-weight:700;cursor:pointer'
      : 'background:transparent;color:#F2EFE8;border:1px solid rgba(247,245,240,.35);' +
        'border-radius:999px;padding:5px 13px;font:inherit;cursor:pointer';
    b.addEventListener('click', alPulsar);
    return b;
  }

  function avisar(texto, conAcciones) {
    if (!aviso) {
      aviso = document.createElement('div');
      // Con id propio: la página de contacto ya tiene lo suyo con role="status", y sin un
      // identificador los dos se confunden al buscarlos.
      aviso.id = 'cookie-aviso';
      aviso.setAttribute('role', 'status');
      // Centrado con left y right a 16 px y ancho según el contenido, no con left:50% más un
      // translate: así el navegador le limitaba el ancho a media pantalla, y en un teléfono
      // quedaba una píldora alta y angosta encima del pie (medido: 160 x 264 px a 320 de
      // ancho). Radio de tarjeta y no de píldora, porque puede ocupar varias líneas.
      aviso.style.cssText =
        'position:fixed;left:16px;right:16px;bottom:24px;margin:0 auto;width:fit-content;' +
        'max-width:560px;z-index:1000;background:#161D26;color:#F2EFE8;' +
        'border:1px solid rgba(247,245,240,.18);border-radius:16px;padding:12px 18px;' +
        'font-size:13px;line-height:1.45;text-align:center;' +
        "font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
        'box-shadow:0 8px 28px -12px rgba(0,0,0,.6)';
      document.body.appendChild(aviso);
    }
    aviso.textContent = texto;
    aviso.hidden = false;
    clearTimeout(avisoTimer);
    // Un aviso que pide hacer algo no se borra solo: el de la otra pestaña se mostraba 5 s en
    // una pestaña en segundo plano, o sea que casi nadie lo veía. Queda puesto, con un botón
    // para hacer lo que pide y otro para cerrarlo, porque en un teléfono tapa el pie y el
    // formulario, y quien está escribiendo algo tiene que poder terminar primero.
    if (conAcciones) {
      var fila = document.createElement('span');
      fila.style.cssText =
        'display:inline-flex;gap:8px;margin-left:10px;vertical-align:middle;flex-wrap:wrap';
      fila.appendChild(botonAviso('Recargar ahora', true, function () { location.reload(); }));
      fila.appendChild(botonAviso('Cerrar', false, cerrarAviso));
      aviso.appendChild(fila);
      return;
    }
    avisoTimer = setTimeout(cerrarAviso, 5000);
  }

  var PERMITIDO = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' };
  var DENEGADO = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };

  // Si en esta página se le retiró el permiso al Pixel. Importa porque nunca se le devuelve
  // en caliente (ver encenderMedicion): una página con el Pixel revocado que vuelve a
  // "aceptadas" tiene que recargarse para medir de nuevo.
  var pixelRevocado = false;

  // Carga lo que haga falta. Si gtag.js todavía no se había pedido (lo normal: el <head> no
  // lo carga sin permiso), __spindlelabInitGA lo pide ahora. Si ya estaba cargado y se había
  // apagado dentro de esta misma página, se vuelve a encender.
  function encenderMedicion() {
    if (window.__spindlelabInitGA) window.__spindlelabInitGA();
    if (window.__spindlelabGAInited) gtag('consent', 'update', PERMITIDO);
    if (window.__spindlelabInitMeta) window.__spindlelabInitMeta();
    // Al Pixel NO se le devuelve el permiso en caliente. Medido en el navegador: 'revoke' no
    // descarta lo que se le pide, lo RETIENE, y 'grant' lo manda todo de golpe. Devolverle el
    // permiso le mandaría a Meta lo que pasó mientras estaba retirado. Por eso, volver a
    // aceptar en una página con el Pixel revocado recarga la página (ver aplicar y
    // sincronizar), y la carga nueva lo arranca limpio.
  }

  // Si Analytics nunca se cargó no hay nada que apagar: gtag() es solo una cola que nadie
  // lee. Si se cargó, el update lo deja sin cookies, pero SIGUE mandando avisos anónimos
  // hasta que la página se recargue sin él; por eso quien llama a esto decide recargar.
  function apagarMedicion() {
    if (window.__spindlelabGAInited) gtag('consent', 'update', DENEGADO);
    // El Pixel no se puede descargar, pero sí se le puede retirar el permiso: con 'revoke'
    // retiene lo que se le pida en vez de mandarlo. Importa en la pestaña que no se recarga
    // sola; sin esto, un Lead enviado desde ahí salía a Meta después de rechazar.
    if (window.fbq) {
      fbq('consent', 'revoke');
      pixelRevocado = true;
    }
    borrarCookies();
  }

  // Qué está corriendo en esta página y no se puede descargar sin recargar. Se nombra con
  // precisión en el aviso: decir "la medición" en abstracto no le dice nada a nadie.
  function loQueCorre() {
    var n = [];
    if (window.__spindlelabGAInited) n.push('Analytics');
    if (window.__spindlelabMetaInited) n.push('el Pixel de Meta');
    return n.length ? { texto: n.join(' y '), verbo: n.length > 1 ? 'dejen' : 'deje' } : null;
  }

  // El código de las páginas (la conversión del formulario, el evento del chequeo) pregunta
  // acá si hay permiso, en vez de mirar si gtag o fbq existen. Que existan no significa nada:
  // gtag() existe siempre, y fbq sigue existiendo en una pestaña donde se rechazó en otra.
  window.__spindlelabHayPermiso = function () {
    return estado === 'granted';
  };

  var recargaPendiente = null;

  function recargarAvisando(texto) {
    avisar(texto);
    recargaPendiente = setTimeout(function () {
      location.reload();
    }, 1800);
  }

  function aplicar(valor) {
    var recordado = guardar(valor);
    banner.hidden = true;
    // Si había una recarga en camino y la persona vuelve a decidir dentro de esos 1,8 s, esa
    // recarga ya no corresponde a lo que eligió. Se cancela y se decide de nuevo abajo.
    if (recargaPendiente) {
      clearTimeout(recargaPendiente);
      recargaPendiente = null;
    }

    if (valor === 'granted') encenderMedicion();
    else apagarMedicion();

    pintarControl();

    // Ni gtag.js ni el Pixel de Meta se pueden descargar una vez que arrancaron. Si alguno
    // está corriendo y la persona acaba de rechazar, la única manera honesta de que deje de
    // correr es recargar la página, que ya no los carga, y se avisa antes en vez de hacerlo
    // de sorpresa. La condición mira solo qué está vivo, no de dónde venía la decisión.
    var corre = loQueCorre();
    if (valor === 'denied' && corre) {
      recargarAvisando(
        recordado
          ? 'Listo, quedaron rechazadas. Recargamos la página para que ' + corre.texto + ' ' + corre.verbo + ' de correr.'
          : 'Aplicado, pero tu navegador no nos deja guardar la decisión. Recargamos la página para que ' + corre.texto + ' ' + corre.verbo + ' de correr, y en la siguiente te la vamos a preguntar de nuevo.'
      );
      return;
    }

    // Volver a aceptar en una página donde el Pixel quedó revocado: como no se le devuelve el
    // permiso en caliente, se recarga para que arranque de cero. Solo si la decisión quedó
    // guardada; sin eso la página nueva no sabría que se aceptó, y el Pixel mudo es el lado
    // seguro del error.
    if (valor === 'granted' && pixelRevocado && recordado) {
      recargarAvisando('Listo, quedaron aceptadas. Recargamos la página para que la medición arranque de cero.');
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

  // Ponerse al día con lo guardado, sea porque decidieron en otra pestaña (evento storage) o
  // porque esta página vuelve congelada desde el bfcache con el botón Atrás (pageshow).
  //
  // Se mira el valor guardado AHORA, no el que trae cada evento. Al restaurar desde el
  // bfcache llegan en cola los eventos de todo lo que pasó mientras la página estaba
  // congelada, en cualquier orden respecto de pageshow. La versión anterior actuaba sobre
  // cada uno: reprocesaba un "rechazar" ya superado, le retiraba el permiso al Pixel de
  // alguien que había vuelto a aceptar, y dejaba en pantalla un aviso falso. Con el valor
  // actual, los intermedios se colapsan solos. Y si la decisión existe, el banner se
  // esconde: antes volvía a preguntar algo ya respondido en otra página.
  //
  // 'bfcache' es la misma persona en la misma pestaña, así que si hace falta se recarga.
  // 'otra-pestana' no se recarga sola (puede tener un formulario a medio escribir): se
  // avisa, con un botón, y lo decide la persona.
  function sincronizar(origen) {
    var guardado;
    try {
      guardado = localStorage.getItem(KEY);
    } catch (e) {
      return;
    }
    var cambio = guardado !== estado;
    estado = guardado;
    pintarControl();
    if (guardado) banner.hidden = true;
    else if (cambio) abrirBanner(false);
    if (!cambio && origen === 'otra-pestana') return;

    if (guardado === 'granted') {
      cerrarAviso();
      encenderMedicion();
      if (origen === 'bfcache' && pixelRevocado) location.reload();
      return;
    }

    // "Rechazadas", o la decisión borrada en otra parte: nada de medición.
    var corre = loQueCorre();
    if (!corre) {
      borrarCookies();
      return;
    }
    apagarMedicion();
    if (origen === 'bfcache') {
      location.reload();
      return;
    }
    avisar(
      (guardado === 'denied'
        ? 'Rechazaste las cookies en otra pestaña. '
        : 'Tu decisión sobre las cookies se borró en otra pestaña. ') +
        'Acá ya borramos las cookies de medición; recarga esta página para que ' + corre.texto + ' ' + corre.verbo + ' de correr.',
      true
    );
  }

  // El evento `storage` solo llega a las OTRAS pestañas, así que no hay eco ni recargas en
  // cadena. key null es un localStorage.clear() hecho en otra parte.
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY && e.key !== null) return;
    sincronizar('otra-pestana');
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) sincronizar('bfcache');
  });

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { aplicar('granted'); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { aplicar('denied'); });

  // Sin permiso dado, cada carga de página barre las cookies de medición. Dos razones reales:
  //
  // 1) Entre el 2 de agosto y el 21 de septiembre de 2026 el sitio cargaba Analytics y el
  //    Pixel SIN preguntar. Quien lo visitó en esas fechas tiene _ga (dura 2 años) y _fbp, y
  //    ninguna decisión guardada. Si vuelve y no elige nada, la política le dice que no se
  //    guarda ninguna cookie de medición; y si después acepta, gtag.js reusaría ese _ga viejo
  //    y uniría en GA4 lo medido sin permiso con lo nuevo. Barriendo al cargar, arranca de 0.
  // 2) Una carrera: si alguien acepta y rechaza antes de que gtag.js termine de bajar, el
  //    archivo llega después y vuelve a escribir _ga cuando ya lo habíamos borrado.
  if (leer() !== 'granted') borrarCookies();

  montarControl();
  if (!leer()) abrirBanner(false);
})();
