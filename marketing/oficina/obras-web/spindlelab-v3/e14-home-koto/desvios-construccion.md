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

## Ronda de reparos (Clara y Diego, 2-nov-2026, sobre acta-qa-e14.md)

Todo en `e13/texto/home.json` y copiado con `extraer-texto.mjs home`; no se escribió texto a mano en `.astro` (solo
cambió un comentario de `index.astro`). Sin imágenes nuevas: las tres de Bruno quedan como están.

1. **Alt de anuncios (defecto 1), cerrado.** Escrito mirando la -169 y la -45: «Cuatro hilos plateados que entran por la
   izquierda, pasan juntos por el ojo de una aguja y salen por la derecha como uno solo, sobre fondo casi negro.» En las
   dos son cuatro hilos y todos entran por la izquierda.
2. **Alt de cómo partimos (defecto 2), cerrado.** «Un hilo plateado tendido recto sobre papel oscuro, con tres nudos
   repartidos a lo largo.» No dice tramos: en la -169 son cuatro y desiguales (las puntas, más largas y deshilachadas), y
   en la -45 las puntas quedan fuera del cuadro. Un `<img>` lleva un solo alt, así que tiene que valer para las dos.
   El de acompañamiento se revisó igual y calza; queda.
3. **Rótulo «Proyectos» (defecto 3), cambiado a «Si tienes un proyecto».** Dicho como frase se lee como a quién le habla
   la fila y no como un campo, en el mismo registro que «Quién responde». Medido: una línea a 390 (358 × 18 px) y a 1440,
   sin desborde. Falta que lo confirme la próxima lectura en frío; no la volví a correr para no gastar.
4. **Nombres y notas de `home.json` (defecto 5), cerrado.** La fila de tres apunta a `public/v3/medios/e14-banda-*-169.webp`
   y a su `-45` (`archivo_45`), con estado «generada»; la captura del chequeo, a `public/v3/medios/`; las ocho notas
   «ahora en retiradas_e14» dicen «E13; salió de la home en E14», y `estructura` dice que ese bloque se borró.
5. **h2 de Búsqueda (defecto 4): no se cambió.** Es texto aprobado; va como pregunta abajo y anotado en
   `home.json → home.busqueda.h2.pendiente`.

Verificación: `extraer-texto.mjs --comprobar` sale 0; `npx astro build`, 22 páginas; `verificar.mjs --excluir
/privacidad/` a 390 y 1440, **sin hallazgos**; los tres alt y el rótulo, leídos en `dist/index.html`. El peso no cambia
(solo texto).

## Preguntas para Ramón

1. **h2 de la banda de Búsqueda.** Hoy: «**Búsqueda y visibilidad en IA** que Google y ChatGPT entiendan a qué te
   dedicas.» Los 3 lectores en frío tropezaron ahí («la frase está rara», «pura jerga»): leído de corrido, el «que» se
   pega a «IA» y la frase queda sin verbo que la una. Propuesta de Clara, una sola palabra más y en el mismo molde que las
   otras bandas («con un panel para que edites tú», «para sostener lo que ya hiciste»):
   «**Búsqueda y visibilidad en IA** para que Google y ChatGPT entiendan a qué te dedicas.»
   ¿La cambiamos o la dejas como está? Cualquiera de las dos respuestas queda escrita aquí y en `home.json`.
2. **Rótulo «Si tienes un proyecto».** Lo cambié por el defecto 3 (antes «Proyectos», que tú habías visto en el
   prototipo). Si prefieres otro, se cambia en `home.json` en un minuto.

## Desvíos del cierre (2-nov-2026, noche), decididos por Ramón
1. **Fila de tres sin imagen.** La spec pedía «una grande y dos chicas», con imagen. Ramón rechazó las del hilo plateado,
   las ilustraciones, la pizarra y una prueba de fotos editoriales (`imagenes-v2/LEEME.md`). Se publica con tres columnas
   iguales, cada una bajo su filete (`.k-tres--texto` en `archivo.css`). Las imágenes vuelven cuando se definan con
   referencias.
2. **Spot de Verifica y Cumple.** Es idea de Ramón: el caballo de la portada se dibuja solo sobre papel en blanco, toma
   color y sale galopando. Va como primera tarjeta de esa pieza en la home y en /trabajo/, con un pie de IA y su
   descripción para el lector de pantalla.
   - Al final del video hay un fundido al color del papel, para que el bucle no salte seco.
   - La mancha de abajo a la izquierda está tapada con `delogo` desde los 3,8 s.
   - El póster es el cuadro de 3,9 s, la acuarela a medio abrir.
3. **Fichas sin año** («Cliente · Sitio web», «Propio · Herramienta»), en la home y en /trabajo/.
