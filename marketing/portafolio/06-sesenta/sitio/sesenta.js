/* Sesenta · concepto de SpindleLab. Contador de días hábiles, lector de la carta, hoja imprimible y formulario
   que no envía nada. Sin dependencias. Los hechos (plazos y feriados) están en ../ficha.md §4. */
(function () {
  "use strict";
  document.documentElement.classList.remove("sin-js");
  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───── Calendario ─────
     Hábil = lunes a sábado, salvo feriados (Dirección del Trabajo). Feriados nacionales que caen de lunes a
     sábado, 2026 a abril de 2028 (feriados.cl, con la ley de cada uno; consultado el 16-oct-2026). */
  var FERIADOS = new Set([
    "2026-01-01", "2026-04-03", "2026-04-04", "2026-05-01", "2026-05-21", "2026-06-29", "2026-07-16",
    "2026-08-15", "2026-09-18", "2026-09-19", "2026-10-12", "2026-10-31", "2026-12-08", "2026-12-25",
    "2027-01-01", "2027-03-26", "2027-03-27", "2027-05-01", "2027-05-21", "2027-06-21", "2027-06-28",
    "2027-07-16", "2027-09-17", "2027-09-18", "2027-10-11", "2027-11-01", "2027-12-08", "2027-12-25",
    "2028-01-01", "2028-04-14", "2028-04-15", "2028-05-01"
  ]);
  var DESDE = "2026-01-01", HASTA = "2027-12-31";
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function desdeIso(s) { var p = s.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function mas(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; }
  function habil(d) { return d.getDay() !== 0 && !FERIADOS.has(iso(d)); }
  function larga(d) { return DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear(); }
  function corta(d) { return d.getDate() + " " + MESES[d.getMonth()].slice(0, 3); }

  // Hoy. ?hoy=AAAA-MM-DD fija el día para las capturas y la grabación (que salgan iguales cada vez).
  var hoy = (function () {
    try {
      var q = new URLSearchParams(location.search).get("hoy");
      if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return desdeIso(q);
    } catch (e) {}
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  })();

  /* El día n-ésimo hábil después de la separación (el día de la separación no cuenta: Código Civil, art. 48). */
  function diaHabil(sep, n) {
    var d = sep, k = 0;
    while (k < n) { d = mas(d, 1); if (habil(d)) k++; }
    return d;
  }
  /* Hábiles ya transcurridos completos: del día siguiente a la separación hasta ayer. */
  function transcurridos(sep) {
    var k = 0;
    for (var d = mas(sep, 1); d < hoy; d = mas(d, 1)) if (habil(d)) k++;
    return k;
  }

  /* ───── El 60 que baja ───── */
  var cifra = document.getElementById("cifra");
  var cifraPie = document.getElementById("cifra-pie");
  var actual = 60;
  var corriendo = null;

  function pintar(n, animar) {
    var txt = String(Math.max(0, n));
    var viejos = cifra.textContent;
    cifra.innerHTML = "";
    for (var i = 0; i < txt.length; i++) {
      var s = document.createElement("span");
      s.textContent = txt[i];
      cifra.appendChild(s);
      // cada cifra que cambia entra desde arriba: el número baja
      if (animar && !reducido && (viejos.length !== txt.length || viejos[i] !== txt[i]) && s.animate) {
        s.animate([{ transform: "translateY(-0.16em)", opacity: 0.35 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: 120, easing: "cubic-bezier(0.2, 0.7, 0.1, 1)" });
      }
    }
  }

  function bajarA(objetivo, alTerminar) {
    if (corriendo) { clearTimeout(corriendo); corriendo = null; }
    if (reducido || objetivo === actual) { actual = objetivo; pintar(actual, false); if (alTerminar) alTerminar(); return; }
    var pasos = Math.abs(actual - objetivo);
    var total = Math.min(1600, 220 + pasos * 48);
    var cada = total / pasos;
    var dir = objetivo < actual ? -1 : 1;
    (function paso() {
      actual += dir;
      pintar(actual, true);
      if (actual !== objetivo) corriendo = setTimeout(paso, cada);
      else { corriendo = null; if (alTerminar) alTerminar(); }
    })();
  }

  var form = document.getElementById("contador-form");
  var campo = document.getElementById("separacion");
  var error = document.getElementById("separacion-error");
  var resultado = document.getElementById("resultado");
  var ltGastado = document.getElementById("lt-gastado");
  var ltQueda = document.getElementById("lt-queda");
  var ltHoy = document.getElementById("lt-hoy");

  if (campo) campo.max = iso(hoy) < HASTA ? iso(hoy) : HASTA;

  function reiniciar() {
    // un error deja el contador como al principio: no queda a la vista la cuenta de otra fecha
    if (corriendo) { clearTimeout(corriendo); corriendo = null; }
    actual = 60; pintar(60, false);
    cifraPie.textContent = "días hábiles: el plazo completo";
    cifra.removeAttribute("aria-label");
    ltHoy.hidden = true;
    linea(null, 0);
    document.getElementById("lt-f0").textContent = "día 0";
    document.getElementById("lt-f60").textContent = "el plazo";
    document.getElementById("lt-f90").textContent = "con reclamo";
    resultado.innerHTML = "<p>Todavía no pones una fecha. El 60 es el plazo completo.</p>";
  }
  function mostrarError(t) { reiniciar(); error.textContent = t; error.hidden = false; campo.setAttribute("aria-invalid", "true"); }
  function limpiarError() { error.hidden = true; error.textContent = ""; campo.removeAttribute("aria-invalid"); }
  function linea(pct, gastadoPct) {
    ltGastado.style.width = gastadoPct + "%";
    ltQueda.style.left = gastadoPct + "%";
    ltQueda.style.width = Math.max(0, 66.667 - gastadoPct) + "%";
  }

  function contar() {
    var v = campo.value;
    if (!v) { mostrarError("Pon el día en que dejaste de trabajar."); return; }
    if (v > iso(hoy)) { mostrarError("Esa fecha todavía no llega. Pon el día en que dejaste de trabajar."); return; }
    if (v < DESDE || v > HASTA) { mostrarError("Este contador trae los feriados de 2026 y 2027. Para una fecha anterior, pregúntale a un abogado."); return; }
    limpiarError();
    var sep = desdeIso(v);
    var t = transcurridos(sep);
    var quedan = 60 - t;
    var d60 = diaHabil(sep, 60), d90 = diaHabil(sep, 90);
    document.getElementById("lt-f0").textContent = corta(sep);
    document.getElementById("lt-f60").textContent = corta(d60);
    document.getElementById("lt-f90").textContent = corta(d90) + ", con reclamo";
    var gastadoPct = Math.min(100, (t / 90) * 100);
    ltHoy.hidden = false;
    ltHoy.style.left = gastadoPct + "%";
    ltHoy.classList.toggle("derecha", gastadoPct > 80);
    document.getElementById("lt-fh").textContent = corta(hoy);
    linea(null, gastadoPct);

    var html;
    if (quedan > 0) {
      html = "<p>Tu día 60 es el <b>" + larga(d60) + "</b>.</p>" +
        "<p class=\"secundario\">Si reclamas en la Inspección del Trabajo, el plazo se suspende mientras dura el reclamo, pero nunca pasa del día 90: el " + larga(d90) + ".</p>";
    } else if (t < 90) {
      html = "<p>Según esta cuenta, tu día 60 fue el <b>" + larga(d60) + "</b>.</p>" +
        "<p class=\"secundario\">Si reclamaste en la Inspección del Trabajo antes, el plazo quedó suspendido mientras duró el reclamo; el tope es el día 90: el " + larga(d90) + ".</p>";
    } else {
      html = "<p>Según esta cuenta, ya pasaron más de 90 días hábiles.</p>" +
        "<p class=\"secundario\">Puede haber otras acciones con otro plazo, como la nulidad por cotizaciones impagas, que tiene seis meses. Pregúntale a un abogado.</p>";
    }
    var n = Math.max(0, quedan);
    resultado.innerHTML = "";
    if (quedan > 0) cifraPie.textContent = n === 1 ? "día hábil te queda" : "días hábiles te quedan";
    bajarA(n, function () {
      cifraPie.textContent = n === 1 ? "día hábil te queda" : quedan > 0 ? "días hábiles te quedan" : "días hábiles, según esta cuenta";
      cifra.setAttribute("aria-label", n + (n === 1 ? " día hábil" : " días hábiles"));
      var resumen = quedan > 0 ? "Te quedan " + n + (n === 1 ? " día hábil." : " días hábiles.") : "Según esta cuenta, el plazo de 60 días hábiles ya pasó.";
      resultado.innerHTML = "<p class=\"sr\">" + resumen + "</p>" + html;
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); contar(); });
  }

  /* ───── El lector de la carta ───── */
  var pestanas = Array.prototype.slice.call(document.querySelectorAll('.pestanas [role="tab"]'));
  var causal = document.getElementById("causal");
  var montos = document.getElementById("carta-montos");
  var NS = "http://www.w3.org/2000/svg";
  var observador = null;

  function circular(span, animar) {
    // un óvalo a mano, en tinta azul, alrededor del artículo; se dibuja en píxeles del propio span
    var viejo = span.querySelector(".tinta-circulo");
    if (viejo) viejo.remove();
    var w = span.offsetWidth, h = span.offsetHeight;
    if (!w || !h) return;
    var px = 12, py = 7;
    var W = w + px * 2, H = h + py * 2;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "tinta-circulo");
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("aria-hidden", "true");
    svg.style.left = -px + "px"; svg.style.top = -py + "px";
    var cx = W / 2, cy = H / 2, rx = W / 2 - 3, ry = H / 2 - 3;
    // empieza arriba a la derecha y da una vuelta y un poco más, con el radio que respira y la vuelta
    // que no cierra en el mismo lugar: así se ve un trazo de lápiz y no un óvalo de dibujo técnico
    var pts = [], n = 72;
    for (var k = 0; k <= n; k++) {
      var t = k / n;
      var a = (-62 + t * 392) * Math.PI / 180;
      var r = 1 + 0.035 * Math.sin(2 * a + 0.7) - 0.05 * t;
      var x = cx + rx * r * Math.cos(a) + (t - 0.5) * 6;
      var y = cy + ry * r * Math.sin(a) - t * 3;
      pts.push(x.toFixed(1) + " " + y.toFixed(1));
    }
    var d = "M " + pts.join(" L ");
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    p.setAttribute("pathLength", "1");
    p.style.strokeDasharray = "1";
    p.style.strokeDashoffset = "0";
    svg.appendChild(p);
    span.appendChild(svg);
    if (animar && !reducido && p.animate) {
      p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 520, delay: 120, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "backwards" });
    }
  }

  function ponerCausal(panel, animar) {
    var partes = (panel.getAttribute("data-causal") || "").split("|");
    causal.innerHTML = "";
    causal.appendChild(document.createTextNode(partes[0] || ""));
    var art = document.createElement("span");
    art.className = "articulo";
    art.textContent = partes[1] || "";
    causal.appendChild(art);
    causal.appendChild(document.createTextNode(partes[2] || ""));
    montos.hidden = panel.getAttribute("data-montos") !== "1";
    if (animar && !reducido && causal.animate) {
      causal.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    }
    // el óvalo se dibuja con la Courier ya cargada, y se rehace si el artículo cambia de tamaño
    var dibujar = function () { circular(art, animar); animar = false; };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('700 16px "Courier Prime"'), document.fonts.load('16px "Courier Prime"')]).then(dibujar, dibujar);
    } else dibujar();
    if ("ResizeObserver" in window) {
      if (observador) observador.disconnect();
      var ancho = art.offsetWidth;
      observador = new ResizeObserver(function () {
        if (art.offsetWidth && Math.abs(art.offsetWidth - ancho) > 1) { ancho = art.offsetWidth; if (art.querySelector(".tinta-circulo")) circular(art, false); }
      });
      observador.observe(art);
    }
  }

  function elegir(tab, foco, animar) {
    pestanas.forEach(function (t) {
      var sel = t === tab;
      t.setAttribute("aria-selected", sel ? "true" : "false");
      t.tabIndex = sel ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !sel;
      if (sel && panel) ponerCausal(panel, animar);
    });
    if (foco) tab.focus();
  }

  pestanas.forEach(function (t, i) {
    t.addEventListener("click", function () { elegir(t, false, true); });
    t.addEventListener("keydown", function (e) {
      var j = null;
      if (e.key === "ArrowRight") j = (i + 1) % pestanas.length;
      if (e.key === "ArrowLeft") j = (i - 1 + pestanas.length) % pestanas.length;
      if (e.key === "Home") j = 0;
      if (e.key === "End") j = pestanas.length - 1;
      if (j !== null) { e.preventDefault(); elegir(pestanas[j], true, true); }
    });
  });
  if (pestanas.length) {
    var inicial = pestanas.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || pestanas[0];
    elegir(inicial, false, false);
    window.addEventListener("resize", function () {
      var a = causal.querySelector(".articulo");
      if (a) circular(a, false);
    });
  }

  /* ───── Hoja imprimible ───── */
  var imprimir = document.getElementById("imprimir");
  if (imprimir) imprimir.addEventListener("click", function () { window.print(); });

  /* ───── Formulario: es un concepto, no envía nada ───── */
  var f = document.getElementById("formulario");
  if (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      [["f-nombre", "f-nombre-error"], ["f-contacto", "f-contacto-error"]].forEach(function (par) {
        var c = document.getElementById(par[0]), m = document.getElementById(par[1]);
        var vacio = !c.value.trim();
        m.hidden = !vacio;
        if (vacio) { c.setAttribute("aria-invalid", "true"); if (ok) c.focus(); ok = false; }
        else c.removeAttribute("aria-invalid");
      });
      document.getElementById("confirmacion").hidden = !ok;
    });
  }

  /* ───── Interior: la suma lateral marca la sección que se lee ───── */
  var indice = document.querySelectorAll(".int-indice a[href^='#']");
  if (indice.length && "IntersectionObserver" in window) {
    var mapa = {};
    indice.forEach(function (a) { mapa[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (ent) {
      ent.forEach(function (x) {
        if (x.isIntersecting) {
          indice.forEach(function (a) { a.removeAttribute("aria-current"); });
          var a = mapa[x.target.id];
          if (a) a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(mapa).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
  }
})();
