# E15 · Heroes internos: desvíos de construcción (Diego, 3-nov-2026)

1. **/trabajo/ queda sin hero.** Ahí la cabecera (miga, h1, conteo, entradilla) vive dentro del panel sticky de
   `TrabajoFijo` (slot `cabeza`). Si la imagen va en ese slot, a 1440 queda en una columna de ~470 px y alto fijo de una
   pantalla, y con ventanas bajas choca con la bajada de la pieza. Si va antes de `TrabajoFijo`, queda sobre el h1. Si va
   después, queda bajo el muro. Ponerla limpia exige sacar la cabecera de `TrabajoFijo` y cambiar el layout §2.2, que está
   fuera del encargo. Además, la primera pantalla ya tiene imágenes grandes (el trabajo). El alt `trabajo.hero.alt` queda escrito
   en el JSON para cuando se decida. Lo decide Ramón o Lucía.
2. **Desarrollo web: el id es `dw.hero.*`**, no `desarrollo-web.hero.*`, porque todos los ids de `desarrollo-web.json` usan
   el prefijo `dw.`. El hero va entre la cabecera y la franja de Combeau, así que **quedan dos imágenes seguidas**. No saqué la
   franja: es decisión de contenido. Que la mire QA.
3. **`primeraPantalla` sale del retrato de /nosotros/ y de la franja de /servicios/desarrollo-web/.** Bajaron de la primera
   pantalla, y dos `fetchpriority="high"` compiten por el LCP. Ahora cargan con `lazy` y el fundido normal del `.medio`.
4. **Blog: el hero va arriba de las filas, en la columna derecha (`enColumna`), no al ancho completo.** La cabecera del blog
   es la barra lateral sticky de 320 px. Bajo 1194 la barra queda arriba y el hero debajo, que es lo pedido.
5. **Con `<picture>`, el hero no tiene el fundido de carga del `.medio`** (`base.mjs` solo marca `.medio > img`). Se ve de
   entrada, que es lo que se busca en la imagen LCP. El radio 6 y la placa son los del `.medio`.
6. `heroDe(prefijo, ...copias)` en `src/data/archivo/texto.mjs` lee `<prefijo>.hero.alt` (obligatorio: si falta, el build
   falla) y `.hero.pie` (opcional). Los alt de Clara se agregaron al final de la sección `cabecera` (blog: `indice`) de
   cada JSON, con `rol`, `uso`, `origen` y `estado`, como el resto.

## 3-nov · E15b: la franja usa material 21:9 propio
- Desde 834 la franja bajo el h1 es `aspect-ratio: 21/9` con tope de 56svh y usa `<slug>-219.webp` / `-anim-219`; el
  blog sigue con la 16:9 (`enColumna`). Se quitó el `object-position` especial de Nosotros, porque la 21:9 ya trae el
  motivo centrado. Se conserva el fondo del encabezado desplegado que entró con el #66.
