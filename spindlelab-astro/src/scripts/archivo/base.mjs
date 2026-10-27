// LO COMÚN DE TODA PÁGINA DE A (spec §2 «Lo común», §4.2, §5.5, §1.6). Lo carga PaginaA.astro.
//   · la hora de Santiago con su huso, que escribe el navegador (§5.5);
//   · cada medio aparece en 167 ms cuando carga (§3.3);
//   · el cursor: un círculo solo sobre las piezas enlazadas, con puntero fino y sin movimiento reducido (§4.2);
//   · el encabezado que se pliega en la placa al bajar, desde 834 (§2, lo común, 1);
//   · la entrada: un bloque por sección, una vez, sube 50 px con el resorte «entrada» (§1.6).
import { inView } from 'motion';
import { animate, RESORTES, mover } from './resortes.mjs';

const cuerpo = document.body;
cuerpo.classList.remove('a-sin-js');
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');
const fino = window.matchMedia('(hover: hover) and (pointer: fine)');
const ancho = window.matchMedia('(min-width: 834px)');

// ---- La hora de Santiago, con su huso: la calcula el navegador de quien mira, y cambia el minuto (§5.5)
function hora() {
  const ahora = new Date();
  const hm = new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(ahora);
  let huso = '';
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' })
      .formatToParts(ahora)
      .forEach((p) => { if (p.type === 'timeZoneName') huso = p.value.replace('GMT', 'UTC'); });
  } catch (e) { huso = ''; }
  document.querySelectorAll('[data-hora]').forEach((n) => { n.textContent = hm + (huso ? ' ' + huso : ''); });
}
hora();
window.setInterval(hora, 15000);

// ---- Cada imagen espera en su placa y aparece al cargar (la carga como diseño, A&P; §3.3)
const marcar = (el) => el.classList.add('cargado');
document.querySelectorAll('.medio > img').forEach((img) => {
  if (img.complete && img.naturalWidth) marcar(img);
  else {
    img.addEventListener('load', () => marcar(img), { once: true });
    img.addEventListener('error', () => marcar(img), { once: true });
  }
});

// ---- El cursor (§4.2). Se esconde con el primer Tab y vuelve con el primer movimiento REAL del mouse: el aviso que da
// el navegador cuando la página se desplaza bajo un mouse quieto llega con la misma posición, y no cuenta (lock §19,
// 16-oct).
const circulo = document.querySelector('.circulo');
let dentro = false;
let ultimo = null;
function modo() {
  cuerpo.classList.toggle('con-circulo', !!circulo && fino.matches && !reducir.matches);
}
modo();
[reducir, fino].forEach((q) => q.addEventListener && q.addEventListener('change', modo));
function esconder(seco) {
  dentro = false;
  if (!circulo) return;
  if (seco || !mover()) animate(circulo, { scale: 0 }, { duration: 0 });
  else animate(circulo, { scale: 0 }, RESORTES.estado);
}
function entrar(ev, pieza) {
  if (!circulo) return;
  dentro = true;
  circulo.textContent = pieza.getAttribute('data-ir') || '';
  animate(circulo, { x: ev.clientX, y: ev.clientY }, { duration: 0 });
  animate(circulo, { scale: 1 }, RESORTES.estado);
}
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Tab') { cuerpo.classList.add('teclado'); esconder(true); }
});
document.addEventListener('pointermove', (ev) => {
  if (ev.pointerType !== 'mouse') return;
  const real = ultimo && (ev.clientX !== ultimo.x || ev.clientY !== ultimo.y);
  ultimo = { x: ev.clientX, y: ev.clientY };
  if (real) cuerpo.classList.remove('teclado');
}, { passive: true });
if (circulo) animate(circulo, { scale: 0 }, { duration: 0 });

document.querySelectorAll('.medio-enlace[data-ir]').forEach((enlace) => {
  const medio = enlace.querySelector('.medio');
  const acortar = enlace.hasAttribute('data-acortar');
  let corte = null;
  // La pieza del índice se acorta 24 px con el resorte «estado» (Koto; §2.2)
  function recortar(a) {
    if (!acortar || !medio || !mover()) return;
    if (corte) corte.stop();
    const desde = parseFloat(medio.dataset.corte || '0');
    corte = animate(desde, a, {
      ...RESORTES.estado,
      onUpdate: (v) => {
        medio.dataset.corte = String(v);
        medio.style.clipPath = 'inset(0 0 ' + v.toFixed(2) + 'px 0 round 6px)';
      },
    });
  }
  const conCirculo = () => cuerpo.classList.contains('con-circulo') && !cuerpo.classList.contains('teclado');
  enlace.addEventListener('pointerenter', (ev) => {
    if (ev.pointerType !== 'mouse') return;
    recortar(24);
    if (conCirculo()) entrar(ev, enlace);
  });
  enlace.addEventListener('pointermove', (ev) => {
    if (ev.pointerType !== 'mouse' || !conCirculo()) return;
    if (!dentro) { entrar(ev, enlace); return; }
    animate(circulo, { x: ev.clientX, y: ev.clientY }, RESORTES.cursor);
  });
  enlace.addEventListener('pointerleave', () => {
    recortar(0);
    if (dentro) esconder(false);
  });
});

// ---- El encabezado se pliega en la placa al bajar, desde 834, con el resorte «entrada» (§2, lo común, 1)
const cab = document.querySelector('.cab');
const placa = cab && cab.querySelector('.cab__placa');
const fila = cab && cab.querySelector('.cab__fila');
let plegada = false;
function revisarCab() {
  if (!cab) return;
  const p = window.scrollY > 24;
  if (p === plegada) return;
  plegada = p;
  cab.classList.toggle('cab--plegada', p);
  if (!placa || !fila || !mover() || !ancho.matches) return;
  animate(placa, { opacity: p ? [0, 1] : [1, 0] }, RESORTES.entrada);
  // El relleno lo deja puesto la clase; el resorte solo lo lleva hasta ahí y se retira.
  const m = 16;
  const a = p ? [m, m + 12] : [m + 12, m];
  animate(fila, { paddingLeft: a, paddingRight: a }, RESORTES.entrada).then(() => {
    fila.style.removeProperty('padding-left');
    fila.style.removeProperty('padding-right');
  });
}
window.addEventListener('scroll', revisarCab, { passive: true });
revisarCab();

// ---- La entrada: un bloque por sección, una vez, sube 50 px con opacidad 0 → 1. Nunca texto de lectura (§1.6).
// Lo que ya se ve al cargar no se esconde; con movimiento reducido no corre y todo está en su lugar.
if (mover() && 'IntersectionObserver' in window) {
  document.querySelectorAll('[data-entrada]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [50, 0] }, RESORTES.entrada);
    }, { amount: 0.15 });
  });
}
