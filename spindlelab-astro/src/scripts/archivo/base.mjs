// LO COMÚN DE TODA PÁGINA DE A (spec §2 «Lo común», §4.2, §5.5, §1.6). Lo carga PaginaA.astro.
//   · la hora de Santiago con su huso, que escribe el navegador (§5.5);
//   · cada medio aparece en 167 ms cuando carga (§3.3);
//   · las piezas enlazadas responden al mouse (§4.2; sin el círculo desde el 2-nov);
//   · el encabezado que se pliega en la placa chica al bajar, como Koto (§2, lo común, 1; corrección del 3-nov);
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

// ---- El cursor (§4.2): el círculo que seguía al mouse se sacó el 2-nov (Ramón: «no está bien logrado»). Queda la
// flecha normal; la pieza responde con el acercamiento de la imagen (archivo.css) y el recorte del índice.
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
  enlace.addEventListener('pointerenter', (ev) => {
    if (ev.pointerType !== 'mouse') return;
    recortar(24);
  });
  enlace.addEventListener('pointerleave', () => {
    recortar(0);
  });
});

// ---- El encabezado se pliega como en Koto (medido el 3-nov, medicion/herramientas/cab-koto.mjs y cab-umbral.mjs):
// no al primer movimiento, sino pasado un tercio de pantalla (Koto: entre 300 y 340 px a 900 de alto). Al plegarse, los
// ítems del menú se apagan uno tras otro, la placa crece desde el logo hacia la derecha y entra «Soluciones» deslizándose
// (~0,7 s en total). Al volver arriba se deshace al revés: la placa se recoge hacia el logo y los ítems vuelven de a uno.
// Interrumpible: si el visitante cambia de dirección a medio camino, se cancela lo que corre y parte la secuencia nueva.
// Con movimiento reducido, el cambio es inmediato (solo la clase).
const cab = document.querySelector('.cab');
const placa = cab && cab.querySelector('.cab__placa');
const items = cab ? [...cab.querySelectorAll('.cab__nav li')] : [];
const queda = cab && cab.querySelector('.cab__nav-queda');
const hora1 = cab && cab.querySelector('.cab__der .cab__hora');
const SALE = 'cubic-bezier(0.4, 0, 1, 1)';
const LLEGA = 'cubic-bezier(0.22, 1, 0.36, 1)';
let plegada = false;
let turno = 0;
const fin = (an) => an.finished.catch(() => {});
const visibles = () => items.filter((li) => li.offsetParent !== null);
function cortar() {
  if (!cab) return;
  cab.getAnimations({ subtree: true }).forEach((an) => an.cancel());
}
async function plegar(t) {
  const sal = visibles().map((li, i) => li.animate(
    [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(-12px)' }],
    { duration: 150, delay: i * 22, easing: SALE, fill: 'forwards' }));
  if (hora1 && hora1.offsetParent) sal.push(hora1.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' }));
  await Promise.all(sal.map(fin));
  if (t !== turno) return;
  cab.classList.add('cab--plegada');
  sal.forEach((an) => an.cancel());
  if (placa) placa.animate([{ clipPath: 'inset(0 100% 0 0 round 4px)' }, { clipPath: 'inset(0 0% 0 0 round 4px)' }], { duration: 520, easing: LLEGA });
  if (queda) queda.animate([{ opacity: 0, transform: 'translateX(28px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 90, easing: LLEGA, fill: 'backwards' });
}
async function desplegar(t) {
  const sal = [];
  if (queda) sal.push(queda.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: SALE, fill: 'forwards' }));
  if (placa) sal.push(placa.animate([{ clipPath: 'inset(0 0% 0 0 round 4px)' }, { clipPath: 'inset(0 100% 0 0 round 4px)' }], { duration: 480, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' }));
  await Promise.all(sal.map(fin));
  if (t !== turno) return;
  cab.classList.remove('cab--plegada');
  sal.forEach((an) => an.cancel());
  visibles().forEach((li, i) => li.animate(
    [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }],
    { duration: 520, delay: i * 55, easing: LLEGA, fill: 'backwards' }));
  if (hora1 && hora1.offsetParent) hora1.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 200, fill: 'backwards' });
}
function revisarCab() {
  if (!cab) return;
  const umbral = window.innerHeight * (plegada ? 0.3 : 0.36);
  const p = window.scrollY > umbral;
  if (p === plegada) return;
  plegada = p;
  const t = ++turno;
  cortar();
  if (!mover() || typeof cab.animate !== 'function') { cab.classList.toggle('cab--plegada', p); return; }
  (p ? plegar : desplegar)(t);
}
window.addEventListener('scroll', revisarCab, { passive: true });
window.addEventListener('resize', revisarCab, { passive: true });
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
