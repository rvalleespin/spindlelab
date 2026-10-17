/* Tonela · concepto de SpindleLab. Sin dependencias ni peticiones.
   1) las bandas de la portada entran de la más liviana a la más pesada
   2) la tabla de carga cambia de modo de amarre
   3) el dibujo del ángulo: los ramales se abren y la capacidad baja con el factor
   4) el formulario valida y no envía nada (es un concepto) */
(function () {
  'use strict';
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Factores de modo, EN 1492-1 (ver ficha.md, hecho 4) */
  var FACTOR = { directo: 1, ahorcado: 0.8, paralelo: 2, a45: 1.4, a60: 1 };
  var COLOR = { 1: '#6B3FA0', 2: '#237A33', 3: '#F2C200', 4: '#8C8F91', 5: '#D22B2B', 6: '#7A4A2A', 8: '#1F5FBF', 10: '#F07D00' };
  var NOMBRE = { 1: 'violeta', 2: 'verde', 3: 'amarilla', 4: 'gris', 5: 'roja', 6: 'café', 8: 'azul', 10: 'naranja' };
  var fmt = function (n) { return (Math.round(n * 10) / 10).toString().replace('.', ','); };

  /* 1 · bandas */
  var bandas = document.querySelector('.bandas');
  if (bandas) {
    if (reducido) bandas.classList.add('entra');
    else requestAnimationFrame(function () { requestAnimationFrame(function () { bandas.classList.add('entra'); }); });
  }

  /* 2 · tabla de carga */
  var tabla = document.getElementById('carga');
  var modos = document.getElementById('modos');
  function ponerModo(modo) {
    if (!tabla) return;
    tabla.querySelectorAll('[data-modo]').forEach(function (c) {
      c.classList.toggle('activo', c.getAttribute('data-modo') === modo);
    });
    var r = modos && modos.querySelector('input[value="' + modo + '"]');
    if (r && !r.checked) r.checked = true;
  }
  if (modos) modos.addEventListener('change', function (e) { if (e.target.name === 'modo') ponerModo(e.target.value); });

  /* 3 · el ángulo */
  var rango = document.getElementById('angulo-rango');
  var svg = document.getElementById('angulo-svg');
  var eslinga = 2;
  function factorPorAngulo(a) {
    if (a <= 7) return { f: 2, modo: 'paralelo' };
    if (a <= 45) return { f: 1.4, modo: 'a45' };
    if (a <= 60) return { f: 1, modo: 'a60' };
    return { f: 0, modo: null };
  }
  function dibujar(a, sinModo) {
    if (!svg) return;
    var cx = 360, hy = 58, L = 268, rad = a * Math.PI / 180;
    var dx = L * Math.sin(rad), y = hy + L * Math.cos(rad);
    var m = 22, alto = 72;
    var xl = cx - dx, xr = cx + dx;
    var ancho = Math.max(2 * dx + 2 * m, 64);
    var izq = cx - ancho / 2, der = cx + ancho / 2;
    // la eslinga en canasto: del gancho baja a un canto, pasa por debajo de la carga y sube al otro
    var d = 'M' + cx + ' ' + hy + ' L' + Math.min(xl, izq + 7) + ' ' + y +
            ' L' + (izq + 7) + ' ' + (y + alto + 7) + ' L' + (der - 7) + ' ' + (y + alto + 7) +
            ' L' + Math.max(xr, der - 7) + ' ' + y + ' Z';
    var ruta = svg.querySelector('#ang-eslinga');
    ruta.setAttribute('d', d);
    ruta.setAttribute('stroke', COLOR[eslinga]);
    var carga = svg.querySelector('#ang-carga');
    carga.setAttribute('x', izq); carga.setAttribute('y', y); carga.setAttribute('width', ancho);
    var ct = svg.querySelector('#ang-carga-texto');
    ct.setAttribute('y', y + alto / 2 + 6);
    // arco del ángulo, entre la vertical y el ramal derecho
    var r = 92, ax = cx + r * Math.sin(rad), ay = hy + r * Math.cos(rad);
    svg.querySelector('#ang-arco').setAttribute('d', a < 1 ? '' : 'M' + cx + ' ' + (hy + r) + ' A' + r + ' ' + r + ' 0 0 0 ' + ax + ' ' + ay);
    var t = svg.querySelector('#ang-texto');
    // la cifra va afuera del ramal derecho, a la altura donde lo corta el arco
    t.setAttribute('x', ax + 22); t.setAttribute('y', ay + 4); t.textContent = a + '°';
    var fa = factorPorAngulo(a);
    svg.querySelector('#ang-prohibido').setAttribute('opacity', fa.f ? 0 : 1);
    var cifra = document.getElementById('angulo-cifra');
    var estado = document.getElementById('angulo-estado');
    var quien = 'La ' + NOMBRE[eslinga] + ' de ' + eslinga + ' t';
    if (fa.f) {
      cifra.textContent = fmt(eslinga * fa.f) + ' t';
      estado.textContent = quien + ' en canasto a ' + a + '°: factor ' + fmt(fa.f) + '.';
    } else {
      cifra.textContent = 'No se iza';
      estado.textContent = 'Sobre 60° la tabla termina: ningún factor vale ahí.';
    }
    if (fa.modo && !sinModo) ponerModo(fa.modo);
  }
  if (rango) {
    rango.addEventListener('input', function () { dibujar(+rango.value); });
    dibujar(+rango.value, true);
  }
  var selector = document.getElementById('selector-color');
  function ponerEslinga(t) {
    eslinga = t;
    if (tabla) tabla.querySelectorAll('tbody tr').forEach(function (tr) {
      if (+tr.getAttribute('data-t') === t) tr.setAttribute('aria-selected', 'true'); else tr.removeAttribute('aria-selected');
    });
    var r = selector && selector.querySelector('input[value="' + t + '"]');
    if (r && !r.checked) r.checked = true;
    if (rango) dibujar(+rango.value, true);
  }
  if (selector) selector.addEventListener('change', function (e) { ponerEslinga(+e.target.value); });
  if (tabla) tabla.querySelectorAll('tbody tr').forEach(function (tr) {
    tr.addEventListener('click', function () { ponerEslinga(+tr.getAttribute('data-t')); });
  });
  // al tocar un modo, el dibujo se pone en el medio de su rango de ángulo
  var ANGULO_DE = { paralelo: 4, a45: 30, a60: 52 };
  if (modos) modos.addEventListener('change', function (e) {
    var a = ANGULO_DE[e.target.value];
    if (a !== undefined && rango) { rango.value = a; dibujar(a); }
  });

  /* Lo usa el script que graba el recorrido (movimiento/recorrido.mjs). */
  window.tonela = { modo: ponerModo, eslinga: ponerEslinga, angulo: function (a) { if (rango) { rango.value = a; dibujar(a); } } };

  /* 4 · formulario */
  var form = document.getElementById('form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var peso = form.querySelector('#f-peso');
    var resp = document.getElementById('form-respuesta');
    var viejo = form.querySelector('.error'); if (viejo) viejo.remove();
    peso.removeAttribute('aria-invalid');
    if (!peso.value || +peso.value <= 0) {
      peso.setAttribute('aria-invalid', 'true');
      var err = document.createElement('span');
      err.className = 'error'; err.id = 'f-peso-error';
      err.textContent = 'Escribe el peso en toneladas. Si no lo sabes, el de la placa o la guía sirve.';
      peso.parentNode.appendChild(err);
      peso.setAttribute('aria-describedby', 'f-peso-ayuda f-peso-error');
      peso.focus();
      resp.textContent = '';
      return;
    }
    resp.textContent = 'No se envió nada: Tonela es un concepto. En un sitio real, aquí te diríamos quién te responde y cuándo.';
  });
})();
