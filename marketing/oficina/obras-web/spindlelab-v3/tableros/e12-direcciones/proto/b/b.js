/* E12 · Dirección B «Banco» · Lucía, 17-oct-2026.
   Movimiento con Motion 13.5.0 (vendor/motion-13.5.0.js, sin React) y los tres resortes del lock §9:
   cursor 2700·104·1, estado 800·57·1, entrada 230·31·1 (ζ ≥ 1: cero rebote). El color no lleva resorte.
   Con prefers-reduced-motion: reduce, ningún resorte corre, el círculo no existe, nada entra animado y
   ningún video corre solo. Todo lo que se ve con JS está también en el HTML sin JS. */
(function () {
  'use strict';
  var M = window.Motion || null;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var RES = {
    cursor: { type: 'spring', stiffness: 2700, damping: 104, mass: 1 },
    estado: { type: 'spring', stiffness: 800, damping: 57, mass: 1 },
    entrada: { type: 'spring', stiffness: 230, damping: 31, mass: 1 }
  };
  function anima(el, valores, resorte) {
    if (!M || reducido) {
      // Sin movimiento: el estado final, de una vez.
      var t = [];
      if ('x' in valores || 'y' in valores) t.push('translate(' + (valores.x || 0) + 'px,' + (valores.y || 0) + 'px)');
      if ('scale' in valores) t.push('scale(' + valores.scale + ')');
      if (t.length) el.style.transform = t.join(' ');
      if ('opacity' in valores) el.style.opacity = valores.opacity;
      return;
    }
    return M.animate(el, valores, resorte);
  }
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Telemetría verdadera (lock §11): la hora de Santiago con su huso, y lo que pesó esta visita ---------- */
  var fmtHora = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  function huso(d) {
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' }).formatToParts(d);
      for (var i = 0; i < p.length; i++) if (p[i].type === 'timeZoneName') return p[i].value.replace('GMT', 'UTC');
    } catch (e) {}
    return '';
  }
  function reloj() {
    var d = new Date();
    var txt = fmtHora.format(d) + ' ' + huso(d);
    $$('[data-reloj]').forEach(function (el) { el.textContent = txt; });
    setTimeout(reloj, (60 - d.getSeconds()) * 1000 + 50);
  }
  reloj();

  var bytes = 0;
  var vistos = {};
  function sumar(e) {
    if (vistos[e.name + e.startTime]) return;
    vistos[e.name + e.startTime] = 1;
    bytes += e.transferSize || e.encodedBodySize || 0;
  }
  function pintarVisita() {
    var kb = Math.round(bytes / 1000);
    var txt = kb.toLocaleString('es-CL') + ' kB';
    $$('[data-visita]').forEach(function (el) { el.textContent = txt; });
  }
  try {
    (performance.getEntriesByType('navigation') || []).forEach(sumar);
    (performance.getEntriesByType('resource') || []).forEach(sumar);
    pintarVisita();
    new PerformanceObserver(function (l) { l.getEntries().forEach(sumar); pintarVisita(); })
      .observe({ type: 'resource', buffered: true });
  } catch (e) {}

  /* ---------- Encabezado que se pliega en una placa ---------- */
  var placa = $('.cabecera__placa');
  var plegado = false;
  function revisarCabecera() {
    var debe = window.scrollY > 24;
    if (debe === plegado || !placa) return;
    plegado = debe;
    anima(placa, { opacity: debe ? 1 : 0 }, RES.entrada);
  }
  window.addEventListener('scroll', revisarCabecera, { passive: true });
  revisarCabecera();

  /* ---------- Menú a 390 ---------- */
  var botonMenu = $('.boton-menu');
  var menu = $('.menu');
  if (botonMenu && menu) {
    botonMenu.addEventListener('click', function () {
      var abierto = menu.getAttribute('data-abierto') === 'true';
      menu.setAttribute('data-abierto', abierto ? 'false' : 'true');
      botonMenu.setAttribute('aria-expanded', abierto ? 'false' : 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.getAttribute('data-abierto') === 'true') {
        menu.setAttribute('data-abierto', 'false'); botonMenu.setAttribute('aria-expanded', 'false'); botonMenu.focus();
      }
    });
  }

  /* ---------- Cursor: círculo blanco que dice adónde lleva, solo sobre el trabajo (lock §8) ---------- */
  var circulo = null;
  if (punteroFino && !reducido && M) {
    circulo = document.createElement('div');
    circulo.className = 'cursor';
    circulo.setAttribute('aria-hidden', 'true');
    document.body.appendChild(circulo);
    M.animate(circulo, { x: -200, y: -200, scale: 0 }, { duration: 0 });
    document.documentElement.classList.add('con-circulo');
    var porTeclado = false, dentro = null, ultX = null, ultY = null;
    var mostrar = function (txt) {
      if (circulo.textContent !== txt) circulo.textContent = txt;
      M.animate(circulo, { scale: 1 }, RES.estado);
    };
    var esconder = function () { M.animate(circulo, { scale: 0 }, RES.estado); };
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      // Solo un movimiento de verdad trae el círculo de vuelta después del teclado (lock §19, regla del 16-oct).
      var real = ultX === null || e.clientX !== ultX || e.clientY !== ultY;
      ultX = e.clientX; ultY = e.clientY;
      if (!real) return;
      porTeclado = false;
      M.animate(circulo, { x: e.clientX, y: e.clientY }, RES.cursor);
      var pieza = e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (pieza && e.target.closest('button, input, .pausa')) pieza = null; // nunca sobre un botón o un campo (lock §8)
      if (pieza !== dentro) {
        dentro = pieza;
        if (pieza) mostrar(pieza.getAttribute('data-cursor')); else esconder();
      } else if (pieza && !porTeclado) {
        mostrar(pieza.getAttribute('data-cursor'));
      }
    }, { passive: true });
    document.addEventListener('pointerleave', function () { dentro = null; esconder(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') { porTeclado = true; dentro = null; esconder(); }
    });
  }

  /* ---------- Entradas: una por sección, una vez, con el resorte «entrada» (lock §9) ---------- */
  if (M && !reducido) {
    $$('[data-entra]').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return; // lo que ya está a la vista no se esconde
      M.animate(el, { opacity: 0, y: 50 }, { duration: 0 });
      var parar = M.inView(el, function () {
        M.animate(el, { opacity: 1, y: 0 }, RES.entrada);
        if (parar) parar();
      }, { amount: 0.1 });
    });
  }

  /* ---------- Videos: con pausa siempre a mano (WCAG 2.2.2); con movimiento reducido no corren solos ---------- */
  function rotularPausa(boton, video) {
    var corre = !video.paused;
    boton.setAttribute('aria-label', corre ? boton.getAttribute('data-pausar') : boton.getAttribute('data-reproducir'));
    boton.setAttribute('aria-pressed', corre ? 'false' : 'true');
    boton.querySelector('.ico-pausa').style.display = corre ? '' : 'none';
    boton.querySelector('.ico-play').style.display = corre ? 'none' : '';
  }
  $$('[data-video-autonomo]').forEach(function (caja) {
    var video = $('video', caja), boton = $('.pausa', caja);
    if (!video || !boton) return;
    boton.addEventListener('click', function () {
      if (video.paused) { video.play().catch(function () {}); } else { video.pause(); }
    });
    video.addEventListener('play', function () { rotularPausa(boton, video); });
    video.addEventListener('pause', function () { rotularPausa(boton, video); });
    rotularPausa(boton, video);
    if (!reducido && M) {
      M.inView(caja, function () {
        video.play().catch(function () {});
        return function () { video.pause(); };
      }, { amount: 0.4 });
    }
  });

  /* ---------- Índice: el visor del banco, el filtro y la fila que abre su pieza ---------- */
  $$('[data-indice]').forEach(function (bloque) {
    var filas = $$('tbody tr', bloque);
    var visor = $('.visor', bloque);
    var img = visor ? $('img', visor) : null;
    var video = visor ? $('video', visor) : null;
    var nombre = visor ? $('.visor__nombre', visor) : null;
    var linea = visor ? $('.visor__linea', visor) : null;
    var botonPausa = visor ? $('.pausa', visor) : null;
    var pausadoAMano = false;
    var activa = null;
    function activar(tr) {
      if (!tr || tr === activa) return;
      if (activa) activa.classList.remove('activa');
      activa = tr; tr.classList.add('activa');
      if (!visor) return;
      if (img && img.getAttribute('src') !== tr.getAttribute('data-visor')) {
        img.src = tr.getAttribute('data-visor');
        img.alt = tr.getAttribute('data-alt') || '';
      }
      if (nombre) nombre.textContent = tr.getAttribute('data-nombre');
      if (linea) linea.textContent = tr.getAttribute('data-linea');
      if (video) {
        var src = tr.getAttribute('data-video');
        video.classList.remove('corre');
        video.pause();
        if (src && !reducido && punteroFino) {
          if (video.getAttribute('src') !== src) video.setAttribute('src', src);
          if (!pausadoAMano) {
            video.play().then(function () { video.classList.add('corre'); }).catch(function () {});
          }
          if (botonPausa) botonPausa.hidden = false;
        } else if (botonPausa) {
          botonPausa.hidden = true;
        }
      }
    }
    filas.forEach(function (tr) {
      tr.addEventListener('pointerenter', function () { activar(tr); });
      tr.addEventListener('focusin', function () { activar(tr); });
      tr.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var a = $('a', tr);
        if (a) a.click();
      });
    });
    if (botonPausa && video) {
      botonPausa.addEventListener('click', function () {
        if (video.paused) { pausadoAMano = false; video.play().then(function () { video.classList.add('corre'); }).catch(function () {}); }
        else { pausadoAMano = true; video.pause(); }
      });
      video.addEventListener('play', function () { rotularPausa(botonPausa, video); });
      video.addEventListener('pause', function () { rotularPausa(botonPausa, video); });
    }
    var botones = $$('[data-filtro]', bloque);
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        var tipo = b.getAttribute('data-filtro');
        botones.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        var primera = null;
        filas.forEach(function (tr) {
          var ve = tipo === 'todo' || tr.getAttribute('data-tipo') === tipo;
          tr.hidden = !ve;
          if (ve && !primera) primera = tr;
        });
        activa = null;
        filas.forEach(function (tr) { tr.classList.remove('activa'); });
        if (primera) activar(primera);
      });
    });
    if (filas.length) activar(filas[0]);
    // Las portadas del visor se piden en reposo, para que el cambio al pasar el mouse no espere a la red.
    var pedir = function () { filas.forEach(function (tr) { var i = new Image(); i.decoding = 'async'; i.src = tr.getAttribute('data-visor'); }); };
    if ('requestIdleCallback' in window) requestIdleCallback(pedir, { timeout: 2500 }); else setTimeout(pedir, 1200);
  });

  /* ---------- Caso: índice de secciones con su punto, y la barra de 390 ---------- */
  var secciones = $$('.caso__seccion[id]');
  var enlaces = $$('.secciones a');
  var punto = $('.secciones__punto');
  var barraActiva = $('.barra-caso__activa');
  function marcar(id) {
    enlaces.forEach(function (a) {
      var es = a.getAttribute('href') === '#' + id;
      if (es) {
        a.setAttribute('aria-current', 'true');
        if (punto) anima(punto, { y: a.offsetTop + a.offsetHeight / 2 - 1.5 }, RES.estado);
        if (barraActiva) barraActiva.textContent = a.textContent;
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }
  if (secciones.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) marcar(e.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    secciones.forEach(function (s) { io.observe(s); });
    marcar(secciones[0].id);
    // Arriba del todo (sobre el medio principal) manda la primera sección.
    window.addEventListener('scroll', function () {
      if (secciones[0].getBoundingClientRect().top > window.innerHeight * 0.4) marcar(secciones[0].id);
    }, { passive: true });
  }
  var masBarra = $('.barra-caso button');
  var menuBarra = $('.barra-caso__menu');
  if (masBarra && menuBarra) {
    masBarra.addEventListener('click', function () {
      var abierto = !menuBarra.hidden;
      menuBarra.hidden = abierto;
      masBarra.setAttribute('aria-expanded', abierto ? 'false' : 'true');
    });
    $$('a', menuBarra).forEach(function (a) { a.addEventListener('click', function () { menuBarra.hidden = true; masBarra.setAttribute('aria-expanded', 'false'); }); });
  }

  /* ---------- El chequeo, de verdad: /api/chequeo ---------- */
  // Los textos del resultado son los de producción (spindlelab-astro/public/assets/js/v3-chequeo.js),
  // sin cambiar una palabra. Cambia la forma: la cifra grande en el panel, la regla de 21 tramos y la tabla.
  var form = document.getElementById('chq-form');
  if (form) {
    var input = document.getElementById('chq-dominio');
    var btn = document.getElementById('chq-btn');
    var out = document.getElementById('chq-out');
    var err = document.getElementById('chq-error');
    var cifra = $('.chequeo__cifra');
    var CT = form.getAttribute('data-contacto') || '/contacto/';
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var aContacto = function (dominio) {
      dominio = String(dominio == null ? '' : dominio).trim();
      if (!dominio) return CT;
      return CT + (CT.indexOf('?') < 0 ? '?' : '&') + 'sitio=' + encodeURIComponent(dominio);
    };
    var veredicto = function (p) {
      if (p >= 90) return 'Tu sitio está listo por el lado técnico. Lo que te falta para que te citen ya no está dentro de tu sitio.';
      if (p >= 70) return 'Tienes lo esencial resuelto, pero hay huecos que te cuestan menciones.';
      if (p >= 45) return 'Los motores pueden llegar, pero les cuesta entenderte y no tienen mucho que citar.';
      return 'Hoy la IA tiene poco con qué trabajar cuando alguien pregunta por tu rubro.';
    };
    var fallar = function (msg, codigo, delSitio) {
      var etiqueta = delSitio === false
        ? 'Si nos escribes por <a href="' + esc(aContacto(input.value)) + '">el formulario de contacto</a>, menciona este código: '
        : 'Código de respuesta de tu sitio: ';
      err.innerHTML = '<p>' + esc(msg) + '</p>' + (codigo ? '<p class="codigo">' + etiqueta + esc(codigo) + '</p>' : '');
      err.hidden = false;
      out.hidden = true;
    };
    var tramos = $$('.chequeo .regla__tramo');
    var pintar = function (d) {
      var porId = {};
      d.items.forEach(function (i) { porId[i.id] = i; });
      tramos.forEach(function (t) {
        var i = porId[t.getAttribute('data-id')];
        t.setAttribute('data-estado', i ? (i.estado || (i.ok ? 'ok' : 'pendiente')) : '');
      });
      cifra.textContent = d.puntaje;
      cifra.classList.add('con-dato');
      if (M && !reducido) M.animate(cifra, { opacity: [0, 1], y: [12, 0] }, RES.estado);
      var sc = d.sinConfirmar || 0;
      var sinConfirmar = sc === 1
        ? 'Hay 1 señal que no alcanzamos a comprobar, así que no cuenta en este número. Está más abajo, con el motivo.'
        : 'Hay ' + sc + ' señales que no alcanzamos a comprobar, así que no cuentan en este número. Están más abajo, con el motivo.';
      var CTD = aContacto(d.dominio || input.value);
      var h = '<p class="lectura__dominio">' + esc(d.dominio) + '</p>' +
        '<p class="lectura__veredicto">' + esc(veredicto(d.puntaje)) +
        (d.aviso ? '<span class="lectura__aviso">' + esc(d.aviso) + '</span>' : '') +
        (sc ? '<span class="lectura__aviso">' + esc(sinConfirmar) + '</span>' : '') + '</p>' +
        '<div class="lectura__acciones"><a class="boton boton--lleno" href="' + esc(CTD) + '">Pedir el diagnóstico</a></div>';
      d.bloques.forEach(function (b) {
        var items = d.items.filter(function (i) { return i.bloque === b.id; });
        if (!items.length) return;
        h += '<div class="lectura__bloque"><h3>' + esc(b.titulo) + '</h3><p class="lectura__sub">' + esc(b.sub) + '</p><ul class="lectura__lista">';
        items.forEach(function (i) {
          var estado = i.estado || (i.ok ? 'ok' : 'pendiente');
          var duda = estado === 'sin-confirmar';
          var marca = estado === 'ok' ? '✓' : duda ? '?' : '×';
          var lee = estado === 'ok' ? 'Cumple: ' : duda ? 'No lo pudimos confirmar: ' : 'No cumple: ';
          h += '<li' + (estado === 'ok' ? ' class="ok"' : '') + '><span class="lectura__marca" aria-hidden="true">' + marca + '</span><div>' +
            '<span class="solo-lector">' + lee + '</span><div class="lectura__titulo">' + esc(i.titulo) + '</div>' +
            (estado === 'ok' ? '' : '<div class="lectura__detalle">' + esc(i.detalle) + '</div>' +
              (i.arreglo ? '<div class="lectura__arreglo">' + esc(i.arreglo) + '</div>' : '')) + '</div></li>';
        });
        h += '</ul></div>';
      });
      h += '<div class="lectura__remate"><h3>Esto es la mitad técnica.</h3>' +
        '<p>El chequeo revisa tu sitio. El diagnóstico te dice quién aparece hoy cuando alguien pregunta por tu rubro en ChatGPT, Gemini y Perplexity, ' +
        'y de qué fuentes lo están sacando. Te lo entregamos en una página, gratis, en 24 horas.</p>' +
        '<div class="lectura__acciones"><a class="boton boton--lleno" href="' + esc(CTD) + '">Pedir el diagnóstico</a>' +
        '<a class="boton boton--linea" href="' + esc(CTD) + '">Prefiero hablarlo contigo</a></div></div>';
      out.innerHTML = h;
      out.hidden = false;
      err.hidden = true;
      cifra.setAttribute('data-revisado', d.revisadoEn || '');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = (input.value || '').trim();
      if (!v) { fallar('Escribe tu dominio para empezar.'); input.focus(); return; }
      btn.disabled = true;
      var previo = btn.textContent;
      btn.textContent = 'Revisando…';
      err.hidden = true;
      fetch('/api/chequeo?dominio=' + encodeURIComponent(v))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d || !d.ok) fallar((d && d.error) || 'No pudimos completar el chequeo.', d && d.codigo, d && d.codigoDelSitio);
          else pintar(d);
        })
        .catch(function () { fallar('No pudimos completar el chequeo. Inténtalo de nuevo en un momento.'); })
        .finally(function () { btn.disabled = false; btn.textContent = previo; });
    });
  }
})();
