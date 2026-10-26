// Extraído VERBATIM de /diagnostico/ para la maqueta V2. No modificar la lógica:
// captura UTM, honeypot y eventos de conversión ya están resueltos ahí.
// Cambios de la v3 (6-oct, revisión cruzada): el destino de contacto se lee del formulario
// (data-contacto) y tres textos (veredicto ≥ 90 sin «acá», remate sin «completo» y el botón
// que pide la revisión). La lógica no cambia.
// QA final (6-oct): los enlaces a contacto llevan ?sitio=<dominio> y el botón que pide la
// revisión se repite dentro de .chq-score. Cambio de enlaces y de marcado, no de lógica.
// E8 (14-oct): el botón mientras corre dice «Revisando…», con el carácter de puntos
// suspensivos (pase de voz de Clara, fila 1444).
// E13 (26-oct): solo cadenas. El botón pasa a «Pedir la revisión a mano», los cuatro
// veredictos dejan de hablar de citas y menciones (el chequeo mide si el sitio está
// preparado, no si hoy aparece en las respuestas), el remate habla de la revisión a mano y
// el error de campo vacío dice «la dirección de tu sitio». Va con ?v=4.
(function(){
  var form = document.getElementById('chq-form');
  var input = document.getElementById('chq-dominio');
  var btn = document.getElementById('chq-btn');
  var out = document.getElementById('chq-out');
  var err = document.getElementById('chq-error');
  if(!form) return;
  // A dónde llevan los botones del resultado y el aviso de error. La maqueta pone
  // data-contacto="/contacto/" en el formulario: con /contacto/ fijo, la única salida de
  // conversión del chequeo sacaba al visitante de la v3 y el puente de UTM de /contacto/
  // no corría (revisión cruzada, 6-oct). Sin el atributo sigue yendo a /contacto/.
  var CT = form.getAttribute('data-contacto') || '/contacto/';
  // El dominio viaja a contacto (QA final, 6-oct): quien acaba de escribirlo en el chequeo y
  // pide la revisión llegaba a un formulario con «Sitio web» vacío y tenía que
  // escribirlo otra vez, justo en el paso que se mide. Contacto lo pone en #f-sitio si está
  // vacío. Solo agrega ?sitio=: los utm_* siguen en sessionStorage, no en la URL.
  function aContacto(dominio){
    dominio = String(dominio == null ? '' : dominio).trim();
    if(!dominio) return CT;
    return CT + (CT.indexOf('?') < 0 ? '?' : '&') + 'sitio=' + encodeURIComponent(dominio);
  }

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function fallar(msg, codigo, delSitio){
    // El codigo de respuesta baja de categoria: deja de ser el mensaje y pasa a ser el dato
    // que sirve cuando alguien nos escribe para que lo revisemos a mano.
    // Y solo se presenta como respuesta del sitio cuando lo es: el 508 del bucle lo ponemos
    // nosotros, y el 530 y el 525/526 son de Cloudflare, así que ahí la API manda
    // codigoDelSitio: false.
    // "Si nos escribes" no decía dónde. Va al formulario de /contacto/ y no a un mailto, porque
    // generate_lead solo se dispara al enviar ese formulario.
    var etiqueta = delSitio === false
      ? 'Si nos escribes por <a href="' + esc(aContacto(input.value)) + '">el formulario de contacto</a>, menciona este código: '
      : 'Código de respuesta de tu sitio: ';
    err.innerHTML = '<p style="margin:0">' + esc(msg) + '</p>' +
      (codigo ? '<p class="chq-error-codigo">' + etiqueta + esc(codigo) + '</p>' : '');
    err.style.display = 'block';
    out.style.display = 'none';
  }

  function veredicto(p){
    if(p >= 90) return 'Tu sitio está listo por el lado técnico. Este chequeo no mide lo que otros sitios publican sobre ti.';
    if(p >= 70) return 'Tienes lo esencial resuelto, pero quedan huecos técnicos por cerrar. Los ves más abajo.';
    if(p >= 45) return 'Los motores pueden llegar a tu sitio, pero les cuesta entender qué haces.';
    return 'Hoy a la IA le cuesta leer tu sitio o entender qué haces. Abajo ves qué falta.';
  }

  function pintar(d){
    // Señales que no alcanzamos a medir. Quedan fuera del número, y eso se dice: si no, el
    // puntaje parece cubrir el sitio entero y no lo cubre.
    var sc = d.sinConfirmar || 0;
    var sinConfirmar = sc === 1
      ? 'Hay 1 señal que no alcanzamos a comprobar, así que no cuenta en este número. Está más abajo, con el motivo.'
      : 'Hay ' + sc + ' señales que no alcanzamos a comprobar, así que no cuentan en este número. Están más abajo, con el motivo.';
    var CTD = aContacto(d.dominio || input.value);
    var h = '<div class="chq-score"><div class="chq-num">' + d.puntaje + '<span>/100</span></div>' +
            '<div class="chq-veredicto"><b>' + esc(d.dominio) + '</b><br>' + esc(veredicto(d.puntaje)) +
            // Cuando el dominio escrito no abrió y revisamos su otra forma (con o sin www), la
            // API lo explica en `aviso`; sin esto, la persona ve otra dirección y no sabe por qué.
            (d.aviso ? '<span class="chq-aviso">' + esc(d.aviso) + '</span>' : '') +
            (sc ? '<span class="chq-aviso">' + esc(sinConfirmar) + '</span>' : '') + '</div>' +
            // El paso siguiente junto al puntaje (QA final, 6-oct): antes quedaba recién
            // después de los 21 ítems. El remate completo sigue al final.
            '<div class="chq-ramas"><a class="chq-r1" href="' + esc(CTD) + '">Pedir la revisión a mano</a></div></div>';

    d.bloques.forEach(function(b){
      var items = d.items.filter(function(i){ return i.bloque === b.id; });
      if(!items.length) return;
      h += '<div class="chq-bloque"><h3>' + esc(b.titulo) + '</h3><p class="sub">' + esc(b.sub) + '</p><ul class="chq-list">';
      items.forEach(function(i){
        // Tres estados, no dos. "Cumple" y "No cumple" afirman los dos algo sobre el sitio, y
        // hay se\u00f1ales que no alcanzamos a medir (un robots.txt que no nos dejaron leer, una
        // prueba que no contest\u00f3). Esas van con su propio signo y con su propio texto: el
        // lector de pantalla lee lo mismo que se ve, y el detalle queda a la vista, que es
        // donde se explica por qu\u00e9 no lo sabemos.
        // `i.estado` lo manda la API; el respaldo cubre una respuesta anterior a ese campo.
        var estado = i.estado || (i.ok ? 'ok' : 'pendiente');
        var duda = estado === 'sin-confirmar';
        var marca = estado === 'ok' ? '\u2713' : duda ? '?' : '\u2715';
        var clase = estado === 'ok' ? 'chq-si' : duda ? 'chq-duda' : 'chq-no';
        var lee = estado === 'ok' ? 'Cumple: ' : duda ? 'No lo pudimos confirmar: ' : 'No cumple: ';
        h += '<li' + (estado === 'ok' ? ' class="ok"' : '') + '><span class="chq-mark ' + clase + '" aria-hidden="true">' +
             marca + '</span><div>' +
             '<span class="sr-only">' + lee + '</span>' +
             '<div class="chq-t">' + esc(i.titulo) + '</div>' +
             (estado === 'ok' ? '' :
               '<div class="chq-d">' + esc(i.detalle) + '</div>' +
               (i.arreglo ? '<div class="chq-fix">' + esc(i.arreglo) + '</div>' : '')) +
             '</div></li>';
      });
      h += '</ul></div>';
    });

    h += '<div class="chq-remate"><h3>Lo revisamos a mano, gratis.</h3>' +
         '<p>El chequeo es automático y lee tu sitio. En la revisión lo miramos a mano y te devolvemos una página ' +
         'con lo más importante que encontramos y por dónde partiríamos. Llega en un día hábil.</p>' +
         // El mismo nombre del paso en todo el sitio: la revisión. Revisión cruzada, 6-oct; E13, 26-oct.
         '<div class="chq-ramas"><a class="chq-r1" href="' + esc(CTD) + '">Pedir la revisión a mano</a>' +
         '<a class="chq-r2" href="' + esc(CTD) + '">Prefiero hablarlo contigo</a></div></div>';

    out.innerHTML = h;
    out.style.display = 'block';
    err.style.display = 'none';
    // Se pregunta por el permiso, no por si gtag existe: gtag() existe siempre, y con eso
    // solo el evento salía a Google aunque se hubiera rechazado desde otra pestaña.
    if (window.__spindlelabHayPermiso && window.__spindlelabHayPermiso()) {
      try { gtag('event', 'chequeo_completado', { puntaje: d.puntaje }); } catch (e) {}
    }
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = (input.value || '').trim();
    if(!v){ fallar('Escribe la dirección de tu sitio para empezar.'); input.focus(); return; }
    btn.disabled = true;
    var textoPrevio = btn.textContent;
    btn.textContent = 'Revisando…';
    err.style.display = 'none';
    out.style.display = 'none';

    fetch('/api/chequeo?dominio=' + encodeURIComponent(v))
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(!d || !d.ok) fallar((d && d.error) || 'No pudimos completar el chequeo.', d && d.codigo, d && d.codigoDelSitio);
        else pintar(d);
      })
      .catch(function(){ fallar('No pudimos completar el chequeo. Inténtalo de nuevo en un momento.'); })
      .finally(function(){ btn.disabled = false; btn.textContent = textoPrevio; });
  });
})();
