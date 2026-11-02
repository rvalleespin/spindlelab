# E14 · Desvíos de la construcción (Diego, 2-nov-2026)

Construcción en `spindlelab-astro` (sistema A) del prototipo aprobado por Ramón (`prototipo/`), para la home, `/trabajo/`
y «Lo que construimos» de `/servicios/desarrollo-web/`. Aquí va **todo lo que no es como el prototipo o como dice
`texto-construccion.md`**, con su porqué. Lo que no aparece aquí es como el prototipo.

## Lo que se construyó

- `src/components/a/TrabajoFijo.astro` + `src/scripts/archivo/trabajo-fijo.mjs`: el trabajo fijo (panel pegajoso, tarjeta
  activa al 100 % y el resto al 20 %, nombre por máscara 133/333 ms, bajada con 333 ms de retardo; lista en 4:5 bajo 834).
  Lo usan las tres páginas.
- `src/scripts/archivo/home.mjs`: portada que se recoge (clip-path 120 → una pantalla, paralaje 0,43), la línea renglón
  a renglón, la entrada de las imágenes de las dos bandas, las filas del contacto y la foto de Ramón que escala.
- `src/pages/index.astro` reescrita; `src/styles/archivo.css`, bloque «HOME E14» (clases `k-`).
- `/trabajo/` y Desarrollo web pasan al componente; Desarrollo web con el recorte de Clara (incluye `1 2 3 4 7`,
  preguntas `sitio 1 2 5`); `/servicios/` con las preguntas `1 a 5` (texto-construccion.md §8). El FAQPage de cada una se
  arma de la misma lista que se ve. **La home ya no tiene FAQPage** (solo WebPage).
- `retiradas_e14` (home.json) y `retirados_e14` (desarrollo-web.json) borrados en `e13/texto/` y copiados con
  `extraer-texto.mjs`; `--comprobar` en verde.

## Desvíos

1. **El h1 ya no entra por renglones al cargar.** El prototipo lo animaba 600 ms al cargar (Lucía, nota 2; Javiera §5
   lo marca como «no es de Koto»). En Astro los scripts de módulo corren después de la primera pintura: el h1 se vería
   entero, desaparecería y volvería a entrar. Se dejó quieto. Todo lo demás del movimiento está.
2. **El texto de cada pieza vive bajo su tarjeta, no solo en el panel.** En el prototipo, desde 834 el texto existía solo
   en el panel (`aria-live`). Aquí cada pieza lleva su encabezado, ficha y bajada bajo la tarjeta: desde 834, con JS,
   quedan para el lector de pantalla, y lo que se ve es la copia del panel con `aria-hidden` y sus enlaces fuera del Tab
   (la tarjeta es el enlace, nombrada por el encabezado de la pieza). Sin JS, el panel no muestra bajada y cada pieza se
   lee bajo su tarjeta.
3. **El pie de Verifica y Cumple no se apaga con la tarjeta.** Va bajo la imagen (Clara, obligatorio) y se lee siempre:
   al 20 % sería texto de 2,2:1. Solo la tarjeta y la pausa bajan al 20 %.
4. **Tarjetas en 4:5 bajo 834 (el prototipo usaba 4:3, como Koto a 390).** El encargo pide 4:5 en teléfono: van las -45
   (book de Combeau, Verifica y Cumple) y, en el video de Combeau, el póster y el video de 390 (vertical, recortado al
   centro).
5. **Las dos bandas grandes quedan 16:9 también en teléfono.** El panel de Combeau y el chequeo son capturas de interfaz:
   en 4:5 se cortaría lo que muestran. La fila de tres sí va en 4:5 (las -45 de Bruno).
6. **La fila de tres lleva `h2`, no `h3`** (texto-construccion.md §6 dice h3). Sin un h2 que las agrupe, un h3 quedaría
   colgando del h2 de Búsqueda. Cada columna es un servicio, par de las bandas: h2, como en el prototipo.
7. **`/trabajo/`:** el panel lleva arriba la miga, el h1 en dos tintas, el conteo y la entradilla, y abajo el nombre de la
   pieza activa (blanco, por máscara) con su bajada. El h1 pasa de Título a Declaración (38 px, la medida de «Our work»).
   Las tres tarjetas son las de la home; el texto es el de cada entrada de `trabajo.json`, y el enlace de la bajada usa su
   «cursor» («Ver el caso», «Ver el sitio»). Sale el muro de dos columnas (`muro.mjs` queda sin uso).
8. **Desarrollo web:** el h2 «Lo que construimos.» con su gris va arriba del panel y el nombre de la pieza abajo, en blanco.
   **Combeau va con su book de modelo** y no con la portada de fotografía: esa ya es la franja de la misma página.
9. **Peso (tope 1.400 kB, primera carga a 1440): 1.396,1 kB.** Sin cambios daba 1.450,6. Lo que se hizo, sin subir el
   techo:
   - la imagen quieta de la portada tiene una versión de 1440 (`hilo-1440-poster.webp`, 21 kB contra 34 kB), con
     `srcset` en `Video.astro` (props nuevas `posterSrcset`/`posterSizes`, opcionales) y en el preload;
   - las tarjetas del trabajo en la home se piden a media pantalla de distancia (`data-diferida`, `trabajo-fijo.mjs`, con
     `<noscript>`): la carga diferida del navegador las bajaba en la primera carga (están a ~1.250 px). Solo en la home;
     `/trabajo/` y Desarrollo web usan `loading` nativo;
   - versiones de 960 px del póster del recorrido de Combeau y del book (`*-960*.webp`, ~19 kB) en el `srcset`;
   - CSS sin lector borrado de `archivo.css`: los bloques de la home E13 (`.servicio*`, `.servicios__cab`,
     `.contacto__txt`, `.int-par*`), las tres portadas de Desarrollo web (`.obra3*`) y el muro y la pieza de `/trabajo/`
     (`.muro*`, `.pieza*`). `Pieza.astro` y `muro.mjs` quedan en el repo sin uso.
   A 390: 816,6 kB. **Queda a 3,9 kB del tope**: cualquier cosa nueva en la primera pantalla de la home lo pasa.
10. **`sizes`**: cada imagen lleva `srcset` con su ancho (`w`) y `sizes` por retícula (10/16 columnas desde 1194, 7/12 de
    834 a 1193, entera bajo 834); la fila de tres, 44 vw la grande y 28 vw las chicas.

## Para Clara (texto, no lo toqué)

- **Alt de las tres imágenes de Bruno, provisorios.** Los nombres de archivo de `home.json → secciones[fila].medios` no
  son los reales (`06-anuncios-16x9.webp`…; los reales: `e14-banda-anuncios-169.webp` y `-45`, `e14-banda-acompanamiento-*`,
  `e14-banda-como-partimos-*`, en `public/v3/medios/`). La página los busca por `columna`. El de anuncios dice «hilos que
  entran desde varios bordes»: en la imagen entran por la izquierda (Bruno, plan-imagenes.md §7). Las capturas están en
  `construccion/`.
- La captura del chequeo se copió a `public/v3/medios/chequeo-spindlelab-169.webp`; su `archivo` en home.json sigue
  apuntando al prototipo (se encuentra por el nombre).
- `home.json → estructura` y varias notas `antes` siguen diciendo «ahora en retiradas_e14»: ya no existe.
- La descripción del video de Combeau entra solo para el lector de pantalla, en el texto de la pieza (el póster lleva alt
  vacío, como pide la nota de Clara).
- El alt de Verifica y Cumple es el de la -53 también cuando el teléfono muestra la -45 (un `<img>` tiene un solo alt);
  el de la -45 agrega «en un celular».

## Verificación

- `npx astro build`: 22 páginas, guardianes en verde (precios, nombres y destinos comparados con Clara).
- `node scripts/verificar.mjs --excluir /privacidad/` a 390, 768 y 1440: **Sin hallazgos**.
- Desborde: ninguno en las tres páginas a 360, 390, 430, 768, 834, 1024, 1194, 1280, 1440 y 1920, bajando la página
  entera (`construccion/desborde.mjs`).
- Movimiento reducido (1440): sin `html.a-mov`, tarjetas, panel y filas al 100 %, sin recorte, videos en pausa.
- Capturas: `construccion/home-1440.jpg`, `home-390.jpg`, `trabajo-1440.jpg`, `trabajo-390.jpg`,
  `desarrollo-web-1440.jpg`, `desarrollo-web-390.jpg` (una pantalla por cuadro, bajando con la rueda) y
  `tira-trabajo-1440.jpg` (8 posiciones del trabajo fijo; el estado de cada una en `datos-capturas.json`).
- No me apruebo: el veredicto es de Javiera en contexto limpio.
