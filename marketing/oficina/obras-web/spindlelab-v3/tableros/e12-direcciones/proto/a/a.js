/* Dirección A · Archivo — el movimiento y lo que se recalcula. Lucía, 17-oct-2026.
   Resortes de lock-koto.md §9 con Motion 13.5.0 (vendor/motion-13.5.0.js). Con prefers-reduced-motion: reduce,
   ningún resorte corre, el círculo no existe y la cinta no arranca sola (§9, §15). */
(function () {
  'use strict';
  var html = document.documentElement;
  html.classList.remove('sin-js');
  html.classList.add('js');
  var M = window.Motion || null;
  // La señal del círculo: blanca (lock §20.4 a) salvo que se pida la opción (b) para compararla: ?senal=cobalto
  try { if (new URLSearchParams(location.search).get('senal') === 'cobalto') html.setAttribute('data-senal', 'cobalto'); } catch (e) {}
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fino = window.matchMedia('(hover: hover) and (pointer: fine)');
  var RES = {
    cursor: { type: 'spring', stiffness: 2700, damping: 104, mass: 1 },  // 90 % en 75 ms
    estado: { type: 'spring', stiffness: 800, damping: 57, mass: 1 },    // 90 % en 139 ms
    entrada: { type: 'spring', stiffness: 230, damping: 31, mass: 1 }    // 90 % en 264 ms
  };
  function mover() { return !!M && !reducir.matches; }

  // ---- La hora de Santiago, con su huso: la calcula tu navegador (§11), en gris porque no responde a ti
  function hora() {
    var ahora = new Date();
    var h = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false }).format(ahora);
    var huso = '';
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' }).formatToParts(ahora)
        .forEach(function (x) { if (x.type === 'timeZoneName') huso = x.value.replace('GMT', 'UTC'); });
    } catch (e) { huso = ''; }
    document.querySelectorAll('[data-hora]').forEach(function (n) { n.textContent = h + (huso ? ' ' + huso : ''); });
  }
  hora();
  setInterval(hora, 15000);

  // ---- Cada medio espera en su placa y aparece al cargar (A&P: la carga como diseño)
  function marcar(el) { el.classList.add('cargado'); }
  document.querySelectorAll('.medio > img').forEach(function (img) {
    if (img.complete && img.naturalWidth) marcar(img);
    else { img.addEventListener('load', function () { marcar(img); }); img.addEventListener('error', function () { marcar(img); }); }
  });
  document.querySelectorAll('.medio > video').forEach(function (v) {
    if (v.readyState >= 2) marcar(v);
    else { v.addEventListener('loadeddata', function () { marcar(v); }); v.addEventListener('error', function () { marcar(v); }, true); }
    // con póster, el marco ya tiene algo que mostrar
    if (v.getAttribute('poster')) marcar(v);
  });

  // ---- Teclado: el círculo se esconde con el primer Tab y vuelve con un movimiento real del mouse (§8, §19)
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Tab') { html.classList.add('teclado'); esconderCirculo(true); }
  });
  document.addEventListener('pointermove', function (ev) { if (ev.pointerType === 'mouse') html.classList.remove('teclado'); });

  // ---- Cursor: un círculo solo sobre el trabajo, con puntero fino y sin movimiento reducido (§8)
  var circulo = document.querySelector('.circulo');
  function modo() {
    var con = !!M && !!circulo && fino.matches && !reducir.matches;
    html.classList.toggle('con-circulo', con);
    html.classList.toggle('sin-circulo', !con);
  }
  modo();
  [reducir, fino].forEach(function (q) { if (q.addEventListener) q.addEventListener('change', modo); });
  var dentro = false;
  function esconderCirculo(seco) {
    dentro = false;
    if (!M || !circulo) return;
    if (seco) M.animate(circulo, { scale: 0 }, { duration: 0 });
    else M.animate(circulo, { scale: 0 }, RES.estado);
  }
  function entrar(ev, pieza) {
    dentro = true;
    circulo.textContent = pieza.getAttribute('data-ir') || '';
    M.animate(circulo, { x: ev.clientX, y: ev.clientY }, { duration: 0 });
    M.animate(circulo, { scale: 1 }, RES.estado);
  }
  document.querySelectorAll('.medio-enlace[data-ir]').forEach(function (enlace) {
    var medio = enlace.querySelector('.medio');
    var acortar = enlace.hasAttribute('data-acortar');
    var corte = null;
    function recortar(a) {
      if (!acortar || !medio || !mover()) return;
      if (corte) corte.stop();
      var desde = parseFloat(medio.dataset.corte || '0');
      corte = M.animate(desde, a, Object.assign({}, RES.estado, {
        onUpdate: function (v) { medio.dataset.corte = v; medio.style.clipPath = 'inset(0 0 ' + v.toFixed(2) + 'px 0 round 6px)'; }
      }));
    }
    enlace.addEventListener('pointerenter', function (ev) {
      if (ev.pointerType !== 'mouse') return;
      recortar(24); // la pieza se acorta 24 px (Koto), con el resorte «estado»
      if (!html.classList.contains('con-circulo') || html.classList.contains('teclado')) return;
      entrar(ev, enlace);
    });
    enlace.addEventListener('pointermove', function (ev) {
      if (!html.classList.contains('con-circulo') || ev.pointerType !== 'mouse') return;
      html.classList.remove('teclado');
      if (!dentro) { entrar(ev, enlace); return; }
      M.animate(circulo, { x: ev.clientX, y: ev.clientY }, RES.cursor);
    });
    enlace.addEventListener('pointerleave', function () {
      recortar(0);
      if (dentro) esconderCirculo(false);
    });
  });
  if (M && circulo) M.animate(circulo, { scale: 0 }, { duration: 0 });

  // ---- El encabezado se pliega en la placa al bajar (Koto), con el resorte «entrada»
  var cab = document.querySelector('.cab');
  var placa = cab && cab.querySelector('.cab__placa');
  var plegada = false;
  function revisarCab() {
    if (!cab) return;
    var p = window.scrollY > 24;
    if (p === plegada) return;
    plegada = p;
    cab.classList.toggle('cab--plegada', p);
    if (placa && mover()) M.animate(placa, { opacity: p ? [0, 1] : [1, 0] }, RES.entrada);
  }
  window.addEventListener('scroll', revisarCab, { passive: true });
  revisarCab();

  // ---- Entrada: un bloque por sección, una vez, sube 50 px con el resorte «entrada» (§9). Nunca texto de lectura.
  if (mover() && 'IntersectionObserver' in window) {
    document.querySelectorAll('[data-entrada]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return; // lo que ya se ve no se esconde
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      M.inView(el, function () {
        M.animate(el, { opacity: [0, 1], y: [50, 0] }, RES.entrada);
      }, { amount: 0.15 });
    });
  }

  // ---- La cinta de la home: ocho tramos, el rótulo dice qué pieza es y de qué tipo
  var cinta = document.querySelector('[data-cinta]');
  if (cinta) {
    var video = cinta.querySelector('video');
    var boton = cinta.querySelector('.pausa');
    var rot = cinta.querySelector('[data-cinta-rotulo]');
    var nota = cinta.querySelector('[data-cinta-nota]');
    var ficha = document.querySelector('[data-cinta-ficha]');
    var tramos = [];
    try { tramos = JSON.parse(document.getElementById('cinta-tramos').textContent); } catch (e) { tramos = []; }
    var actual = -1;
    function rotular() {
      var t = video.currentTime;
      for (var i = 0; i < tramos.length; i++) {
        if (t >= tramos[i].desde && t < tramos[i].hasta) {
          if (i !== actual) {
            actual = i;
            rot.innerHTML = '<span class="tinta">' + tramos[i].nombre + '</span> <span class="gris">· ' + tramos[i].tipo + '</span>';
            nota.textContent = tramos[i].nota || '';
            nota.hidden = !tramos[i].nota;
            if (ficha) {
              ficha.querySelector('[data-ficha-linea]').textContent = tramos[i].linea;
              var fn = ficha.querySelector('[data-ficha-nombre]');
              fn.textContent = tramos[i].nombre; fn.setAttribute('href', tramos[i].href);
              ficha.querySelector('[data-ficha-bajada]').textContent = tramos[i].bajada;
              var fno = ficha.querySelector('[data-ficha-nota]');
              fno.textContent = tramos[i].nota || ''; fno.hidden = !tramos[i].nota;
            }
          }
          return;
        }
      }
    }
    video.addEventListener('timeupdate', rotular);
    function estado(pausado) {
      boton.setAttribute('aria-pressed', pausado ? 'true' : 'false');
      boton.setAttribute('aria-label', pausado ? boton.dataset.seguir : boton.dataset.pausar);
    }
    boton.addEventListener('click', function () {
      if (video.paused) { video.play(); estado(false); } else { video.pause(); estado(true); }
    });
    if (reducir.matches) { video.removeAttribute('autoplay'); video.pause(); estado(true); }
    else {
      var p = video.play();
      if (p && p.catch) p.catch(function () { estado(true); });
      estado(false);
    }
    rotular();
  }

  // ---- Los videos del trabajo: corren solos solo si se ven y sin movimiento reducido; cada uno con su pausa (WCAG 2.2.2)
  document.querySelectorAll('.medio[data-video]').forEach(function (caja) {
    var v = caja.querySelector('video');
    var b = caja.querySelector('.pausa');
    var quieto = function (pausado) {
      b.setAttribute('aria-pressed', pausado ? 'true' : 'false');
      b.setAttribute('aria-label', pausado ? b.dataset.seguir : b.dataset.pausar);
    };
    b.addEventListener('click', function () {
      if (v.paused) { v.play(); quieto(false); caja.dataset.elegido = 'si'; }
      else { v.pause(); quieto(true); caja.dataset.elegido = 'si'; }
    });
    if (reducir.matches || !('IntersectionObserver' in window)) { quieto(true); return; }
    quieto(false);
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (b.getAttribute('aria-pressed') === 'true' && caja.dataset.elegido) return; // si lo pausaste, se queda así
        if (en.isIntersecting && caja.offsetParent !== null) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () { quieto(true); }); quieto(false); }
        else v.pause();
      });
    }, { threshold: 0.25 }).observe(caja);
  });

  // ---- El chequeo: corre contra /api/chequeo (el servidor local lo reenvía a spindlelab.cl; sin él, dice el error)
  var form = document.getElementById('chq-form');
  if (form) {
    var input = document.getElementById('chq-dominio');
    var btn = document.getElementById('chq-btn');
    var out = document.getElementById('chq-out');
    var err = document.getElementById('chq-error');
    var CT = form.getAttribute('data-contacto') || '/v3/contacto/';
    var esc = function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
    };
    var aContacto = function (d) { d = String(d || '').trim(); return d ? CT + '?sitio=' + encodeURIComponent(d) : CT; };
    // Los textos del resultado son los de producción (spindlelab-astro/public/assets/js/v3-chequeo.js, pase de Clara E8)
    var veredicto = function (p) {
      if (p >= 90) return 'Tu sitio está listo por el lado técnico. Lo que te falta para que te citen ya no está dentro de tu sitio.';
      if (p >= 70) return 'Tienes lo esencial resuelto, pero hay huecos que te cuestan menciones.';
      if (p >= 45) return 'Los motores pueden llegar, pero les cuesta entenderte y no tienen mucho que citar.';
      return 'Hoy la IA tiene poco con qué trabajar cuando alguien pregunta por tu rubro.';
    };
    var fallar = function (msg, codigo) {
      err.innerHTML = '<p>' + esc(msg) + '</p>' + (codigo ? '<p class="dato">Código de respuesta de tu sitio: ' + esc(codigo) + '</p>' : '');
      err.hidden = false;
      out.classList.remove('visible');
    };
    var pintar = function (d) {
      var hora = '';
      try { hora = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(d.revisadoEn)); } catch (e) { hora = ''; }
      var h = '<div class="res__cabeza"><span class="res__puntaje">' + esc(d.puntaje) + '/100</span><span class="dato tinta">' + esc(d.dominio) + '</span>' +
        (hora ? '<span class="dato">' + esc(hora) + '</span>' : '') + '</div>' +
        '<p class="chico" style="margin-top:10px">' + esc(veredicto(d.puntaje)) + '</p>' +
        (d.aviso ? '<p class="chico" style="margin-top:6px">' + esc(d.aviso) + '</p>' : '');
      (d.bloques || []).forEach(function (b) {
        var items = (d.items || []).filter(function (i) { return i.bloque === b.id; });
        if (!items.length) return;
        h += '<p class="rotulo" style="margin-top:18px">' + esc(b.titulo) + '</p><ul class="res__lista">';
        items.forEach(function (i) {
          var est = i.estado || (i.ok ? 'ok' : 'pendiente');
          var lee = est === 'ok' ? 'Cumple: ' : est === 'sin-confirmar' ? 'No lo pudimos confirmar: ' : 'No cumple: ';
          var marca = '<span class="res__marca' + (est === 'ok' ? ' ok' : '') + '" aria-hidden="true"></span>';
          var cuerpo = est === 'ok' ? '<span class="ok">' + esc(i.titulo) + '</span>'
            : '<details><summary>' + esc(i.titulo) + '</summary><p>' + esc(i.detalle) + '</p>' + (i.arreglo ? '<p class="tinta">' + esc(i.arreglo) + '</p>' : '') + '</details>';
          h += '<li>' + marca + '<div><span class="solo-lector">' + lee + '</span>' + cuerpo + '</div></li>';
        });
        h += '</ul>';
      });
      h += '<p style="margin-top:16px"><a class="boton boton--placa" href="' + esc(aContacto(d.dominio || input.value)) + '">Pedir el diagnóstico</a></p>';
      out.innerHTML = h;
      out.classList.add('visible');
      err.hidden = true;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = (input.value || '').trim();
      if (!v) { fallar('Escribe tu dominio para empezar.'); input.focus(); return; }
      btn.disabled = true;
      var previo = btn.textContent;
      btn.textContent = 'Revisando…';
      err.hidden = true;
      out.classList.remove('visible');
      fetch('/api/chequeo?dominio=' + encodeURIComponent(v))
        .then(function (r) { return r.json(); })
        .then(function (d) { if (!d || !d.ok) fallar((d && d.error) || 'No pudimos completar el chequeo.', d && d.codigo); else pintar(d); })
        .catch(function () { fallar('No pudimos completar el chequeo. Inténtalo de nuevo en un momento.'); })
        .finally(function () { btn.disabled = false; btn.textContent = previo; });
    });
  }

  // ---- El caso: la sección a la vista se marca en el índice (punto blanco) y en la barra de 390.
  // Activa = la última cuyo borde superior ya pasó el 40 % de la ventana; arriba de la primera, la primera.
  var secciones = Array.prototype.slice.call(document.querySelectorAll('.caso-bloque[id]'));
  if (secciones.length) {
    var enlaces = document.querySelectorAll('[data-indice] a');
    var activa = document.querySelector('[data-barra-activa]');
    var actualSec = null;
    var marcarSec = function () {
      var linea = window.innerHeight * 0.4;
      var id = secciones[0].id;
      secciones.forEach(function (s) { if (s.getBoundingClientRect().top <= linea) id = s.id; });
      if (id === actualSec) return;
      actualSec = id;
      enlaces.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false'); });
      var s = document.getElementById(id);
      if (activa && s) activa.textContent = s.getAttribute('data-nombre');
    };
    window.addEventListener('scroll', marcarSec, { passive: true });
    window.addEventListener('resize', marcarSec);
    marcarSec();
    document.querySelectorAll('.barra a').forEach(function (a) {
      a.addEventListener('click', function () { var d = a.closest('details'); if (d) d.open = false; });
    });
  }

  // ---- Desarrollo web: la fase a la vista pasa del gris al blanco, como el texto de /services de Koto (167 ms)
  var fases = document.querySelectorAll('.fase');
  if (fases.length && 'IntersectionObserver' in window) {
    var ioF = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('a-la-vista', e.isIntersecting); });
    }, { rootMargin: '-40% 0px -45% 0px' });
    fases.forEach(function (f) { ioF.observe(f); });
  }

  // ---- El índice: el filtro filtra de verdad y vuelve a repartir el muro en dos columnas
  var filtro = document.querySelector('[data-filtro]');
  if (filtro) {
    var cols = Array.prototype.slice.call(document.querySelectorAll('.muro__col'));
    var piezas = Array.prototype.slice.call(document.querySelectorAll('.muro .pieza'))
      .sort(function (a, b) { return +a.dataset.orden - +b.dataset.orden; });
    var repartir = function () {
      var altos = cols.map(function () { return 0; });
      piezas.forEach(function (p) {
        if (p.hidden) return;
        var i = altos[0] <= altos[1] ? 0 : 1;
        cols[i].appendChild(p);
        altos[i] += parseFloat(p.dataset.alto) + 110;
      });
    };
    filtro.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var tipo = b.dataset.tipo;
        filtro.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        piezas.forEach(function (p) { p.hidden = !(tipo === 'todo' || p.dataset.tipo === tipo); });
        repartir();
      });
    });
  }
})();
