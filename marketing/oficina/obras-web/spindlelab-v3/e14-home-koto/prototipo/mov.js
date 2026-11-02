/* Home E14 · el movimiento medido en Koto (../medicion-koto-scroll.md), sin librerías.
   Atado al scroll (se recalcula en cada cuadro, sin suavizado, como Koto §1 y §2):
     · la portada se recoge con clip-path entre el scroll 120 y una pantalla, y el video sube a 0,43 × el scroll;
     · las líneas de «la línea» suben en su máscara, ~160 px de scroll por línea;
     · el panel de Trabajo aparece mientras la primera tarjeta sube de 51 % a 22 % de la pantalla;
     · las imágenes de las dos bandas grandes se abren al entrar;
     · las filas del contacto aparecen en 240 px, escalonadas 40.
   Disparado por posición (con tiempo, Koto §3.3 y §5):
     · la tarjeta cuyo borde cruza la mitad de la pantalla se enciende; el nombre sale en 133 ms y entra en 333 ms;
       la bajada entra con 333 ms de retardo en 167 ms;
     · la foto de Ramón escala de 0 a 1 desde su esquina inferior izquierda en 300 ms.
   Con prefers-reduced-motion: reduce no se pone html.mov: nada se esconde, nada se mueve, el nombre cambia sin
   desplazamiento y los videos no arrancan solos (la pausa queda como «seguir»). */
(function () {
  'use strict';
  var raiz = document.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ancho = window.matchMedia('(min-width: 834px)');
  var mov = !reducido.matches;
  if (mov) raiz.classList.add('mov');

  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var vh = window.innerHeight;

  /* ---------------------------------------------------------------- hora de Santiago */
  function hora() {
    try {
      var f = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
      var o = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' }).formatToParts(new Date())
        .filter(function (p) { return p.type === 'timeZoneName'; })[0].value.replace('GMT', 'UTC');
      document.querySelectorAll('[data-hora]').forEach(function (e) { e.textContent = f + ' ' + o; });
    } catch (e) { /* sin Intl: queda «Santiago» */ }
  }
  hora(); setInterval(hora, 30000);

  /* ---------------------------------------------------------------- encabezado plegado */
  var cab = document.getElementById('cab');

  /* ---------------------------------------------------------------- videos: solo a la vista, con su pausa */
  var videos = [].slice.call(document.querySelectorAll('video[data-video]'));
  videos.forEach(function (v) {
    var base = (!ancho.matches && v.dataset.srcAngosto) || v.dataset.srcAncho;
    ['webm', 'mp4'].forEach(function (ext) {
      var s = document.createElement('source'); s.src = base + '.' + ext; s.type = 'video/' + ext; v.appendChild(s);
    });
    v.addEventListener('playing', function () { v.classList.add('corriendo'); });
    v._pausado = !mov;  // con movimiento reducido no arranca solo
    var boton = v.closest('.portada, .pieza-k').querySelector('[data-pausa]');
    if (boton) {
      boton.setAttribute('aria-pressed', String(v._pausado));
      boton.addEventListener('click', function () {
        v._pausado = !v._pausado; boton.setAttribute('aria-pressed', String(v._pausado));
        if (v._pausado) v.pause(); else { v.preload = 'auto'; v.play().catch(function () {}); }
      });
    }
  });
  if ('IntersectionObserver' in window) {
    var ioV = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !v._pausado) { v.preload = 'auto'; v.play().catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.15 });
    videos.forEach(function (v) { ioV.observe(v); });
  }

  /* ---------------------------------------------------------------- líneas en máscara */
  // Parte el texto en palabras, las agrupa por renglón y envuelve cada renglón en .l > .l__in, conservando la tinta.
  function partir(el) {
    if (!el._original) el._original = el.innerHTML; else el.innerHTML = el._original;
    var palabras = [];
    [].slice.call(el.childNodes).forEach(function (n) {
      var clase = n.nodeType === 1 ? n.className : '';
      var texto = n.textContent;
      var frag = document.createDocumentFragment();
      texto.split(/(\s+)/).forEach(function (t) {
        if (!t) return;
        if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
        var s = document.createElement('span'); s.className = 'w ' + clase; s.textContent = t; frag.appendChild(s); palabras.push(s);
      });
      el.replaceChild(frag, n);
    });
    var renglones = [], top = null;
    palabras.forEach(function (w) {
      if (w.offsetTop !== top) { renglones.push([]); top = w.offsetTop; }
      renglones[renglones.length - 1].push(w);
    });
    el.innerHTML = '';
    return renglones.map(function (r) {
      var l = document.createElement('span'); l.className = 'l';
      var i = document.createElement('span'); i.className = 'l__in';
      r.forEach(function (w, k) { i.appendChild(w); if (k < r.length - 1) i.appendChild(document.createTextNode(' ')); });
      l.appendChild(i); el.appendChild(l); return l;
    });
  }

  var lineasScroll = [];
  var h1 = document.querySelector('[data-lineas-carga]');
  function prepararLineas() {
    lineasScroll = [];
    if (!mov) return;
    document.querySelectorAll('[data-lineas-scroll]').forEach(function (el) {
      partir(el).forEach(function (l) { lineasScroll.push({ m: l, i: l.firstChild }); });
    });
  }
  // el h1 entra al cargar, renglón por renglón (333 ms, frena al llegar), una sola vez
  if (mov && h1 && h1.animate) {
    partir(h1).forEach(function (l, k) {
      l.firstChild.animate([{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }],
        { duration: 600, delay: 120 + k * 90, easing: 'cubic-bezier(0,0,0,1)', fill: 'backwards' });
    });
  }

  /* ---------------------------------------------------------------- trabajo */
  var trabajo = document.querySelector('[data-trabajo]');
  var panel = trabajo.querySelector('[data-panel]');
  var tarjetas = [].slice.call(trabajo.querySelectorAll('[data-tarjeta]'));
  var nombre = trabajo.querySelector('[data-nombre]');
  var bajada = trabajo.querySelector('[data-bajada]');
  var activa = -1, piezaActiva = -1, ultimoY = window.scrollY;

  function ponerBajada(p, conRetardo) {
    var t = document.getElementById('bajada-' + p);
    bajada.innerHTML = ''; bajada.appendChild(t.content.cloneNode(true));
    if (conRetardo && bajada.animate) bajada.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 167, delay: 333, easing: 'linear', fill: 'backwards' });
  }
  function cambiarPieza(p) {
    var texto = trabajo.querySelector('[data-pieza="' + p + '"]').dataset.nombre;
    var anterior = piezaActiva; piezaActiva = p;
    if (anterior === -1 || !mov || !nombre.animate) { nombre.textContent = texto; ponerBajada(p, false); return; }
    nombre.getAnimations().forEach(function (a) { a.cancel(); });
    var sale = nombre.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-110%)' }], { duration: 133, easing: 'cubic-bezier(.75,0,.85,1)', fill: 'forwards' });
    if (bajada.animate) bajada.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: 'linear', fill: 'forwards' });
    sale.onfinish = function () {
      nombre.textContent = texto;
      nombre.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }], { duration: 333, easing: 'cubic-bezier(0,0,0,1)', fill: 'forwards' });
      bajada.getAnimations().forEach(function (a) { a.cancel(); });
      ponerBajada(p, true);
    };
  }
  function actualizarTrabajo(bajando) {
    if (!ancho.matches) return;
    // umbral en la mitad de la pantalla; subiendo, 20 px más abajo (448 bajando / 468 subiendo, §3.3)
    var umbral = vh / 2 + (bajando ? 0 : 20);
    var nueva = 0;
    tarjetas.forEach(function (t, i) { if (t.getBoundingClientRect().top < umbral) nueva = i; });
    if (nueva !== activa) {
      if (activa >= 0) tarjetas[activa].classList.remove('activa');
      tarjetas[nueva].classList.add('activa'); activa = nueva;
      var p = Number(tarjetas[nueva].closest('[data-pieza]').dataset.pieza);
      if (p !== piezaActiva) cambiarPieza(p);
    }
    if (mov) {
      var top0 = tarjetas[0].getBoundingClientRect().top;
      panel.style.setProperty('--panel', clamp((vh * 0.51 - top0) / (vh * 0.29), 0, 1).toFixed(3));
    }
  }
  cambiarPieza(0);

  /* ---------------------------------------------------------------- entradas y contacto */
  var entradas = [].slice.call(document.querySelectorAll('[data-entra]'));
  var filas = [].slice.call(document.querySelectorAll('[data-fila]'));
  var foto = document.querySelector('[data-foto]');
  if (mov && foto && 'IntersectionObserver' in window) {
    var ioF = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { foto.classList.add('vista'); ioF.disconnect(); } });
    }, { threshold: 0.6 });
    ioF.observe(foto);
  } else if (foto) foto.classList.add('vista');

  /* ---------------------------------------------------------------- portada */
  var recorte = document.querySelector('[data-recorte]');
  var paralaje = document.querySelector('[data-paralaje]');
  var quieta = document.querySelector('.portada__quieta');

  function cuadro() {
    var y = window.scrollY;
    var bajando = y >= ultimoY; ultimoY = y;
    if (cab) cab.classList.toggle('cab--plegada', y > 8);

    if (mov && ancho.matches) {
      // §1: lineal entre 120 y una pantalla; al final inset(8px 8px 76.56% round 4px); el video sube 0,43 × (y − 120)
      var p = clamp((y - 120) / (vh - 120), 0, 1);
      recorte.style.clipPath = 'inset(' + (8 * p).toFixed(2) + 'px ' + (8 * p).toFixed(2) + 'px ' + (76.56 * p).toFixed(3) + '% ' + (8 * p).toFixed(2) + 'px round ' + (4 * p).toFixed(2) + 'px)';
      var d = 'translateY(' + (-0.43 * clamp(y - 120, 0, vh - 120)).toFixed(1) + 'px)';
      paralaje.style.transform = d; quieta.style.transform = d;
    }
    if (mov) {
      // §2: cada renglón sube de 100 % a 0 en 160 px de scroll, empezando cuando su máscara llega al 82 % de la pantalla
      lineasScroll.forEach(function (o) {
        var t = clamp((vh * 0.82 - o.m.getBoundingClientRect().top) / 160, 0, 1);
        o.i.style.transform = 'translateY(' + ((1 - t) * 105).toFixed(2) + '%)';
      });
      entradas.forEach(function (f) {
        var r = f.getBoundingClientRect();
        var e = 1 - clamp((vh - r.top) / (vh * 0.55), 0, 1);
        f.firstElementChild.style.setProperty('--e', e.toFixed(3));
      });
      // cada fila empieza cuando asoma abajo (40 px más tarde que la anterior); si la página se acaba antes de que
      // termine, el tramo se corre para que termine justo al final del scroll (nada queda a medias en el pie)
      var maxY = document.documentElement.scrollHeight - vh;
      filas.forEach(function (f, i) {
        var ini = f.getBoundingClientRect().top + y - vh * 0.98 + i * 40;
        var fin = Math.min(ini + 240, maxY); ini = Math.min(ini, fin - 120);
        var t = clamp((y - ini) / (fin - ini), 0, 1);
        f.style.setProperty('--f', t.toFixed(3));
      });
    }
    actualizarTrabajo(bajando);
  }

  var pedido = false;
  function pedir() { if (!pedido) { pedido = true; requestAnimationFrame(function () { pedido = false; cuadro(); }); } }
  window.addEventListener('scroll', pedir, { passive: true });
  var tAncho = window.innerWidth;
  window.addEventListener('resize', function () {
    vh = window.innerHeight;
    if (window.innerWidth !== tAncho) { tAncho = window.innerWidth; prepararLineas(); }
    if (!ancho.matches) { recorte.style.clipPath = ''; paralaje.style.transform = ''; quieta.style.transform = ''; tarjetas.forEach(function (t) { t.classList.remove('activa'); }); activa = -1; }
    pedir();
  });

  function arrancar() { prepararLineas(); cuadro(); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(arrancar); else arrancar();
  arrancar();
})();
