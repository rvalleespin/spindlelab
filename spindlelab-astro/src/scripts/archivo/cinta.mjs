// LA CINTA DE LA HOME (spec §2.1, fila 2, y §3.2): ocho tramos de 2 s en un video; la ficha dice qué pieza está pasando.
// Lo carga src/pages/v3/index.astro. El video (arrancar a la vista, pausa, movimiento reducido) lo maneja video.mjs; aquí
// solo se sigue su tiempo. Los tramos (tiempos de cinta.json y texto de Clara) van en <script id="cinta-tramos">.
//   · desde 1194: la ficha al lado de la cinta (tipo · año, el nombre enlazado, la bajada, la nota si la hay);
//   · bajo 1194: el rótulo de placa sobre la cinta (nombre · tipo · año) y la nota en otra placa, abajo.
// Sin JS, la ficha y el rótulo del primer tramo, que es el cuadro del póster.
const seccion = document.querySelector('[data-cinta]');
const datos = document.getElementById('cinta-tramos');
const video = seccion && seccion.querySelector('video');
if (seccion && datos && video) {
  let tramos = [];
  try { tramos = JSON.parse(datos.textContent || '[]'); } catch (e) { tramos = []; }
  const q = (s) => seccion.querySelector(s);
  const rotulo = q('[data-cinta-rotulo]');
  const nota = q('[data-cinta-nota]');
  const linea = q('[data-ficha-linea]');
  const nombre = q('[data-ficha-nombre]');
  const texto = q('[data-ficha-texto]');
  const fuera = q('[data-ficha-fuera]');
  const bajada = q('[data-ficha-bajada]');
  const notaFicha = q('[data-ficha-nota]');
  let actual = 0;

  function poner(i) {
    const t = tramos[i];
    if (!t) return;
    actual = i;
    if (rotulo) {
      rotulo.children[0].textContent = t.nombre;
      rotulo.children[1].textContent = '· ' + t.linea;
    }
    [nota, notaFicha].forEach((n) => {
      if (!n) return;
      n.textContent = t.nota || '';
      n.hidden = !t.nota;
    });
    if (linea) linea.textContent = t.linea;
    if (nombre) nombre.setAttribute('href', t.destino);
    if (texto) texto.textContent = t.nombre;
    if (fuera) fuera.hidden = !t.fuera;
    if (bajada) bajada.textContent = t.bajada;
  }

  video.addEventListener('timeupdate', () => {
    const s = video.currentTime;
    const i = tramos.findIndex((t) => s >= t.desde && s < t.hasta);
    if (i >= 0 && i !== actual) poner(i);
  });
}
