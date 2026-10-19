// LA FASE A LA VISTA (spec §2.4, Desarrollo web, «Cinco fases»; §1.6; lock §20.1): el único cambio de tinta atado a la
// vista que tiene Koto, en /services. La fase que cruza el medio de la ventana pasa del gris al blanco y la anterior vuelve
// al gris, en 167 ms lineales (el color no lleva resorte: archivo.css). Tanda 4.
//   · Una sola a la vez: la que está bajo la línea del 47,5 % de la ventana (el centro de la franja del 40 al 55 % que
//     usaba el prototipo, proto/a/a.js). Con la franja entera, dos fases cortas quedaban en blanco a la vez (medido con
//     comprobar-tanda-4.mjs). Las filas van pegadas una a otra, así que mientras la lista cruza esa línea hay siempre una.
//   · La lista se marca con data-vista solo si el script corre: sin JS los títulos quedan en blanco y el cuerpo en gris, y
//     no se pierde nada. Con movimiento reducido no se marca: todas en blanco (archivo.css).
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');
const listas = [...document.querySelectorAll('.fases--vista')];

function marcar() {
  const y = window.innerHeight * 0.475;
  for (const lista of listas) {
    for (const f of lista.querySelectorAll('.fase')) {
      const r = f.getBoundingClientRect();
      const vista = r.top <= y && r.bottom > y;
      if (f.classList.contains('a-la-vista') !== vista) f.classList.toggle('a-la-vista', vista);
    }
  }
}

if (listas.length && !reducir.matches) {
  let pedido = false;
  const pedir = () => {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(() => { pedido = false; marcar(); });
  };
  listas.forEach((l) => l.setAttribute('data-vista', ''));
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir, { passive: true });
  marcar();
}
