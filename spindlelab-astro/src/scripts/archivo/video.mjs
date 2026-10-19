// LOS VIDEOS DE A (spec §3.1 y §3.5): la portada, la cinta y los de los casos. Lo carga Video.astro.
//   · Mudos, en bucle, sin controles nativos; arrancan solo a la vista (25 %) y sin movimiento reducido ni ahorro de
//     datos; se pausan fuera de la vista y, al volver, siguen si la persona no los pausó.
//   · Cada uno con su pausa (WCAG 2.2.2), que dice su estado. Con movimiento reducido o ahorro de datos el video no
//     arranca y el botón dice «Seguir el video»: si la persona lo aprieta, corre (lo pidió).
//   · Aparece sobre su imagen quieta en 167 ms cuando da su primer cuadro.
//   · Sin JS: la imagen quieta y nada más (sin JS no hay pausa, así que no hay video).
//   · data-fuentes (la portada): las fuentes se eligen por el ancho al cargar (§3.1.2).
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ahorro = !!(navigator.connection && navigator.connection.saveData === true);

document.querySelectorAll('[data-video]').forEach((caja) => {
  const v = caja.querySelector('video');
  const b = caja.querySelector('.pausa');
  if (!v || !b) return;
  b.hidden = false;
  let quierePausa = reducir || ahorro;
  let aLaVista = false;
  let fuentesPuestas = !caja.hasAttribute('data-fuentes');

  function ponerFuentes() {
    if (fuentesPuestas) return;
    fuentesPuestas = true;
    let lista = [];
    try { lista = JSON.parse(caja.getAttribute('data-fuentes') || '[]'); } catch (e) { lista = []; }
    const elegida = lista.find((f) => !f.desde || window.matchMedia('(min-width: ' + f.desde + 'px)').matches);
    if (!elegida) return;
    [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(([k, tipo]) => {
      if (!elegida[k]) return;
      const s = document.createElement('source');
      s.src = elegida[k];
      s.type = tipo;
      v.appendChild(s);
    });
    v.load();
  }
  function estado(pausado) {
    b.setAttribute('aria-pressed', pausado ? 'true' : 'false');
    b.setAttribute('aria-label', pausado ? b.dataset.seguir : b.dataset.pausar);
  }
  function correr() {
    ponerFuentes();
    const p = v.play();
    if (p && p.catch) p.catch(() => { quierePausa = true; estado(true); });
  }
  v.addEventListener('playing', () => v.classList.add('corriendo'));

  // El botón dice lo que eligió la persona (aria-pressed), no si el video está parado en este instante: fuera de la vista
  // se pausa solo, y apretar «Pausar» en ese momento tiene que seguir pausando.
  b.addEventListener('click', () => {
    quierePausa = !quierePausa;
    estado(quierePausa);
    if (quierePausa) v.pause();
    else correr();
  });
  estado(quierePausa);

  if (!('IntersectionObserver' in window)) {
    if (!quierePausa) correr();
    return;
  }
  new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      aLaVista = e.isIntersecting && caja.offsetParent !== null;
      if (aLaVista && !quierePausa) correr();
      else if (!aLaVista && !v.paused) v.pause();
    });
  }, { threshold: 0.25 }).observe(caja);
});
