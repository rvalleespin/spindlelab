// Doceavo · lo que se mueve en el navegador. Sin dependencias.
// - El sitio sabe en qué mes estás: si hoy no es el día con que se construyó el HTML, vuelve a pintar
//   el símbolo, el titular, el año en doce, la hoja del taco y la tabla del mes (con datos.js).
// - El año en doce y el selector del calendario arrancan la hoja del taco y muestran otro mes.
// - La fila de hoy se marca cuando entra en pantalla.
// - El formulario no envía nada: es un concepto.
import * as D from "./datos.js";

const raiz = document.documentElement;
const conMovimiento = raiz.classList.contains("anima");
const hoy = D.obtenerHoy(location.search);
const esInterior = document.body.dataset.pagina === "calendario";
const igualAlHTML = hoy.m === D.HOY_FIJO.m && hoy.d === D.HOY_FIJO.d;

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function pintarFecha() {
  const set = (k, html) => { for (const el of $$(`[data-d="${k}"]`)) el.innerHTML = html; };
  set("simbolo", D.simbolo(hoy.m));
  set("h1", D.h1(hoy));
  set("bajada", D.bajada(hoy));
  set("cta", `Ver ${D.MES[hoy.m - 1]} día por día`);
  set("anio", D.anioEnDoce(hoy));
  set("mes-rotulo", `${cap(D.MES[hoy.m - 1])} ${D.ANIO}`);
  set("mes-nombre", cap(D.MES[hoy.m - 1]));
  set("mes-hoy", `Hoy es ${D.DIA[D.dow(hoy.m, hoy.d)]} ${hoy.d}.`);
  set("tabla", D.tablaMes(hoy.m, hoy));
  set("selector", D.selector(hoy));
  set("tabla-anio", D.tablaAnio(hoy));
}

// ---------------------------------------------------------------- el taco
let mostrado = hoy.m;
function mostrarHoja(m, { animar = true } = {}) {
  const hoja = $("#hoja");
  if (!hoja) return;
  if (animar && conMovimiento && m !== mostrado) {
    const vieja = hoja.cloneNode(true);
    vieja.removeAttribute("id");
    vieja.removeAttribute("data-d");
    vieja.removeAttribute("aria-live");
    vieja.setAttribute("aria-hidden", "true");
    vieja.classList.add("arrancada");
    for (const el of $$("[id]", vieja)) el.removeAttribute("id");
    hoja.parentNode.appendChild(vieja);
    vieja.addEventListener("animationend", () => vieja.remove(), { once: true });
  }
  mostrado = m;
  hoja.innerHTML = esInterior ? D.hojaGrande(m, hoy) : D.hojaVence(m, hoy);
  for (const el of $$('[data-d="canto"]')) el.innerHTML = D.canto(m);
  for (const el of $$('[data-d="vence-lista"]')) el.innerHTML = D.hojaVence(m, hoy);
  for (const b of $$("[data-mes]")) if (b.tagName === "BUTTON") b.setAttribute("aria-pressed", String(Number(b.dataset.mes) === m));
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-mes]");
  if (!b) return;
  mostrarHoja(Number(b.dataset.mes));
});

// ---------------------------------------------------------------- la fila de hoy
function vigilarHoy() {
  const fila = $("tr#hoy");
  if (!fila || !conMovimiento || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entradas) => {
    for (const en of entradas) if (en.isIntersecting) { fila.classList.add("marcada"); io.disconnect(); }
  }, { threshold: 1, rootMargin: "0px 0px -18% 0px" });
  io.observe(fila);
}

// ---------------------------------------------------------------- formulario
function formulario() {
  const f = $("#formulario");
  if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const que = f.elements.que, correo = f.elements.correo;
    const malQue = !que.value.trim();
    const malCorreo = !/^[^@\s]+@[^@\s]+$/.test(correo.value.trim());
    $("#f-que-error").hidden = !malQue;
    $("#f-correo-error").hidden = !malCorreo;
    que.setAttribute("aria-invalid", String(malQue));
    correo.setAttribute("aria-invalid", String(malCorreo));
    if (malQue) { que.focus(); return; }
    if (malCorreo) { correo.focus(); return; }
    $("#confirmacion").hidden = false;
  });
}

// el ícono de la pestaña también cambia con el mes
function icono() {
  const svg = D.simbolo(hoy.m, { celda: 8, hueco: 2, chico: true })
    .replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')
    .replace(/class="lleno"/g, 'fill="#141414"').replace(/class="vacio"/g, 'fill="#A9C0A0"');
  const l = $('link[rel="icon"]');
  if (l) l.href = "data:image/svg+xml," + encodeURIComponent(svg);
}

if (!igualAlHTML) pintarFecha();
icono();
mostrarHoja(hoy.m, { animar: false });
vigilarHoy();
formulario();

// para el recorrido grabado (movimiento/recorrido.mjs)
window.__doceavo = { mostrarHoja, hoy };
