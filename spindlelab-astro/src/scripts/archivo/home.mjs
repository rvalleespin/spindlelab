// LA HOME E14 · el movimiento medido en Koto (e14-home-koto/medicion-koto-scroll.md), sin librerías, como el prototipo
// aprobado por Ramón el 2-nov (e14-home-koto/prototipo/mov.js). Lo carga src/pages/index.astro; el trabajo fijo va aparte
// (trabajo-fijo.mjs). Todo atado al scroll, recalculado en cada cuadro y sin suavizado (Koto §1 y §2), salvo la foto:
//   · la portada se recoge con clip-path entre el scroll 120 y una pantalla (al final, inset(8px 8px 76.56% round 4px)) y
//     el video sube a 0,43 × el scroll (paralaje contra el recorte). Solo desde 834;
//   · las líneas de «la línea» suben en su máscara, 160 px de scroll por línea, desde que asoman al 82 % de la pantalla;
//   · las imágenes de las dos bandas grandes se abren desde abajo y desde el centro mientras el marco pasa del borde de
//     abajo a media pantalla (pedido de Ramón; Koto no lo hace en sus noticias);
//   · las filas del contacto aparecen en 240 px de scroll, escalonadas 40 (Koto §5);
//   · la foto de Ramón escala de 0 a 1 desde su esquina de abajo a la izquierda, en 300 ms, al llegar (Koto §5: disparada).
// Con prefers-reduced-motion: reduce no hay html.a-mov (lo pone el script en línea de la página): nada se esconde y nada
// de esto corre.
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
const ancho = window.matchMedia('(min-width: 834px)');
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const mov = !reducido.matches;

const recorte = document.querySelector('.portada-v--recoge .portada-v__medio');
const paralaje = recorte ? [...recorte.querySelectorAll(':scope > video, :scope > .video__quieta')] : [];
const entradas = [...document.querySelectorAll('[data-entra]')];
const filas = [...document.querySelectorAll('[data-fila]')];
const foto = document.querySelector('[data-foto]');

// ---- Líneas en máscara: el texto se parte en palabras, se agrupan por renglón y cada renglón va en .k-l > .k-l__in,
// conservando la tinta de cada palabra. Se vuelve a partir si cambia el ancho.
function partir(el) {
  if (el._original === undefined) el._original = el.innerHTML;
  else el.innerHTML = el._original;
  const palabras = [];
  [...el.childNodes].forEach((n) => {
    const clase = n.nodeType === 1 ? n.className : '';
    const frag = document.createDocumentFragment();
    n.textContent.split(/(\s+)/).forEach((t) => {
      if (!t) return;
      if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
      const s = document.createElement('span');
      s.className = clase;
      s.textContent = t;
      frag.appendChild(s);
      palabras.push(s);
    });
    el.replaceChild(frag, n);
  });
  const renglones = [];
  let top = null;
  palabras.forEach((w) => {
    if (w.offsetTop !== top) { renglones.push([]); top = w.offsetTop; }
    renglones[renglones.length - 1].push(w);
  });
  el.textContent = '';
  return renglones.map((r) => {
    const l = document.createElement('span');
    l.className = 'k-l';
    const i = document.createElement('span');
    i.className = 'k-l__in';
    r.forEach((w, k) => { i.appendChild(w); if (k < r.length - 1) i.appendChild(document.createTextNode(' ')); });
    l.appendChild(i);
    el.appendChild(l);
    return { m: l, i };
  });
}
let lineas = [];
function prepararLineas() {
  if (!mov) return;
  lineas = [];
  document.querySelectorAll('[data-lineas-scroll]').forEach((el) => { lineas = lineas.concat(partir(el)); });
}

// ---- La foto de Ramón: una vez, al verse en un 60 %
if (foto) {
  if (mov && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { foto.classList.add('vista'); io.disconnect(); } });
    }, { threshold: 0.6 });
    io.observe(foto);
  } else foto.classList.add('vista');
}

function cuadro() {
  if (!mov) return;
  const y = window.scrollY;
  const vh = window.innerHeight;
  if (recorte) {
    if (ancho.matches) {
      const p = clamp((y - 120) / (vh - 120), 0, 1);
      const l = (8 * p).toFixed(2);
      recorte.style.clipPath = `inset(${l}px ${l}px ${(76.56 * p).toFixed(3)}% ${l}px round ${(4 * p).toFixed(2)}px)`;
      const d = `translateY(${(-0.43 * clamp(y - 120, 0, vh - 120)).toFixed(1)}px)`;
      paralaje.forEach((e) => { e.style.transform = d; });
    } else if (recorte.style.clipPath) {
      recorte.style.clipPath = '';
      paralaje.forEach((e) => { e.style.transform = ''; });
    }
  }
  lineas.forEach((o) => {
    const t = clamp((vh * 0.82 - o.m.getBoundingClientRect().top) / 160, 0, 1);
    o.i.style.transform = `translateY(${((1 - t) * 105).toFixed(2)}%)`;
  });
  entradas.forEach((f) => {
    const r = f.getBoundingClientRect();
    const e = 1 - clamp((vh - r.top) / (vh * 0.55), 0, 1);
    f.firstElementChild.style.setProperty('--e', e.toFixed(3));
  });
  // cada fila empieza cuando asoma abajo (40 px después que la anterior); si la página se acaba antes, el tramo se corre
  // para que termine justo al final del scroll: nada queda a medias en el pie
  const maxY = document.documentElement.scrollHeight - vh;
  filas.forEach((f, i) => {
    let ini = f.getBoundingClientRect().top + y - vh * 0.98 + i * 40;
    const fin = Math.min(ini + 240, maxY);
    ini = Math.min(ini, fin - 120);
    f.style.setProperty('--f', clamp((y - ini) / (fin - ini), 0, 1).toFixed(3));
  });
}

let pedido = false;
const pedir = () => {
  if (pedido) return;
  pedido = true;
  requestAnimationFrame(() => { pedido = false; cuadro(); });
};
window.addEventListener('scroll', pedir, { passive: true });
let anchoAntes = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth !== anchoAntes) { anchoAntes = window.innerWidth; prepararLineas(); }
  pedir();
});
function arrancar() { prepararLineas(); cuadro(); }
arrancar();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(arrancar);
