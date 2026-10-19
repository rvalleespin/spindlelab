// EL MURO DE /v3/trabajo/ (spec §2.2). Lo carga src/pages/v3/trabajo/index.astro.
//   · Desde 834, dos columnas de igual ancho con 8 px entre ellas: cada pieza, en el orden de Clara, va a la columna
//     más corta, y ocupa en la retícula tantas filas de 1 px como mide (más los 32 px que la separan de la siguiente).
//     Así el documento queda en el orden de Clara (el teclado y el lector de pantalla lo recorren así) y las columnas
//     se ven como el muro de Koto. Sin JS, cada pieza en la columna que le tocó en el build (data-col) y las filas
//     alineadas. Bajo 834, una columna.
//   · El filtro filtra de verdad: esconde las piezas de otro tipo, dice cuál está activo (aria-pressed) y vuelve a
//     repartir el muro.
const muro = document.querySelector('[data-muro]');
const filtro = document.querySelector('[data-filtro]');
if (muro) {
  const piezas = [...muro.querySelectorAll('.pieza')];
  const dos = window.matchMedia('(min-width: 834px)');
  const SEPARACION = 32;

  function armar() {
    piezas.forEach((p) => { p.style.gridRowEnd = ''; });
    if (!dos.matches) {
      muro.classList.remove('muro--armado');
      piezas.forEach((p) => { p.style.gridColumn = ''; });
      return;
    }
    const visibles = piezas.filter((p) => !p.hidden);
    const altos = visibles.map((p) => p.getBoundingClientRect().height);
    const cols = [0, 0];
    visibles.forEach((p, i) => {
      const c = cols[0] <= cols[1] ? 0 : 1;
      const filas = Math.ceil(altos[i]) + SEPARACION;
      p.style.gridColumn = String(c + 1);
      p.style.gridRowEnd = 'span ' + filas;
      cols[c] += filas;
    });
    muro.classList.add('muro--armado');
  }

  armar();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(armar);
  let pendiente = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(pendiente);
    pendiente = requestAnimationFrame(armar);
  });
  if (dos.addEventListener) dos.addEventListener('change', armar);

  if (filtro) {
    const botones = [...filtro.querySelectorAll('button[data-tipo]')];
    botones.forEach((b) => b.addEventListener('click', () => {
      const tipo = b.dataset.tipo;
      botones.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      piezas.forEach((p) => { p.hidden = !(tipo === 'todo' || p.dataset.tipo === tipo); });
      armar();
    }));
  }
}
