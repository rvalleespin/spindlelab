# Texto de muestra · Módulo 369 · maqueta v2

> Lo escribe Clara (`/web-copy-interfaz`) el 5-oct-2026, por la corrección de Ramón escrita en `brief-de-obra.md` §10, §6 y §7: los huecos que en `copy-secciones.md` eran instrucciones entre corchetes ya no se muestran así en pantalla. Llevan **texto de muestra verosímil**, con `.pendiente` y la marca de «muestra» que define la spec, para que cada vista se lea terminada. **Para revisión humana:** lo aprueba Ramón antes de construir. Nada de este documento llega a producción; en el sitio, cada hueco lo llenan María o cada artista (el inventario de quién escribe qué sigue en `copy-secciones.md` §6 y sirve en la reunión). Si algo de acá choca con el brief, manda el brief; con la spec, manda la spec en lo visual.

**Insumos:** `brief-de-obra.md` (contrato), `copy-secciones.md` (registro, voz, slots), `spec-visual.md` (qué obra va dónde, estados de 2.5.1), `GALERIA-MARIA-LORETO/BRIEF.md` (vocabulario de María que **no** se usa), las 27 obras de relleno regeneradas con M01 (miradas una por una para describirlas: `scratchpad/clara-muestra/hoja-a.png`, `hoja-b.png`, `hoja-c.png`).

---

## 0 · Qué cambia en `copy-secciones.md` (y nada más)

| Dónde | Antes | Ahora |
|---|---|---|
| §0, capa «Corchete» | `[Lo escribe X · qué va ahí]` en pantalla | **Texto de muestra**: el texto de este documento + `.pendiente` + la marca. Quién lo escribe en el sitio queda en `copy-secciones.md` §6, no en pantalla |
| §3.1, aviso global | «Obras, artistas y datos de relleno: se cambian por los reales.» / «Placeholder works, artists and data, to be replaced with the real ones.» | «Obras, artistas, **textos** y datos de relleno: se cambian por los reales.» / «Placeholder works, artists, **texts** and data, to be replaced with the real ones.» Con texto verosímil, el aviso tiene que nombrar los textos. Suma 8 caracteres: debería seguir en 2 líneas a 390 (estimado ≈ 540 de 708 px a partir de la medida de la spec 2.0.1; lo mide Javiera en la página) |
| §8, capa «Lo editas tú» | pieza «Todo texto entre corchetes» | pieza «Todo texto de muestra». La etiqueta no cambia: «Texto: lo cargas tú en el panel, en español y en inglés.» |
| §5-8, «Presentación de las preguntas» | corchete antes de las tres preguntas | **Se borra.** Su trabajo era marcar el hueco; con preguntas de muestra, una frase que presenta las preguntas no hace nada |
| Datos cortos entre corchetes (`[precio]`, `[fecha]`, `[nº de páginas]`…) | corchete | valor de muestra (§9 de este documento) |
| Marcadores de imagen con texto (`[portada]`, `[Foto de la caja]`…) | texto en la caja | sin texto visible: la corrección pide que ninguna posición de imagen quede vacía o gris (brief §7). Acá van solo sus `alt` (§10) |

### 0.1 · La marca

| Slot | ES | EN |
|---|---|---|
| Marca visible (chica, la ubica la spec; una por bloque de texto) | muestra | sample |
| Nombre accesible del bloque (`aria-describedby` o texto oculto) | Texto de muestra | Sample text |
| En un dato corto (precio, fecha, lugar, Instagram) | muestra | sample |

- Una palabra, en minúscula, sin corchete ni dos puntos. Es la misma de «activados · de muestra» del contador, así que en todo el sitio hay un solo nombre para lo que es de muestra.
- **Para Lucía, en una línea:** si el texto de muestra va en gris (spec 8.3.4 lo pinta gris porque era un corchete), se lee como pendiente y la vista no se ve terminada. Recomiendo texto en grafito como el resto y que la marca sea lo único gris. Lo decide la spec.

### 0.2 · Respuestas a la spec §12

1. **Indicador del carrusel:** confirmo. Cada número lleva `aria-label` «1 de 5» … «5 de 5» / «1 of 5» … «5 of 5».
2. **«[portada]» / «[cover]»:** queda sin objeto. Con la corrección, la portada lleva imagen; su `alt` está en §10.

---

## 1 · Reglas que sigue este texto

- **Quién habla.** La galería, en tercera persona («Módulo 369», «la galería» o impersonal); al visitante, de tú. **Única excepción: el statement**, que va en primera persona porque es la artista hablando de su obra (eso es un statement; la bio y la historia van en tercera). Así María ve en la reunión la diferencia entre los tres textos que le va a pedir a cada artista.
- **Nada que suene a currículum real:** sin nombres, fechas, ciudades, premios, exposiciones, escuelas ni galerías. Las bios hablan de oficio y de cómo se trabaja, que es lo que se puede escribir sin inventar hechos.
- **Sin género para las artistas.** La tercera todavía no existe: «Artista A» es el sujeto, sin adjetivos con género. En inglés, se repite «Artist A» en vez de usar pronombre.
- **Vocabulario de María que no entra** (su declaración privada, `BRIEF.md`; diagnóstico C11): hallazgo, accidente, inesperado, estructura, acumulación, fragmento, repetición, vacío, gesto, disrupción, romper, escala, desplazado, fuera de lugar, orden, limpio, elegante, sorprender. Revisado con búsqueda en este archivo (§12). Con B y C era fácil caer: B se describe con «recorte», «cuadrado», «pegar», «mover»; C, con «línea», «trazo», «maraña».
- **Cero cifras de precio.** Las cifras que aparecen son de páginas, medidas de edición, capas de pintura y el rango 001 a 369.
- **Encuentro sin plazos comprometidos:** la entrega de la caja y la publicación en el Libro se dicen sin días ni semanas.
- Castellano de Chile, tuteo, sin rayas, sin Title Case, sin verbos de folleto, una serie de tres por página como máximo. Inglés británico de galería (colour, centre, grey, Enquire), como `copy-secciones.md`.

---

## 2 · Vista 2 · Artistas `/artistas/`

### `artistas.vision` · Visión curatorial (spec 2.2: `c5-8` a 1440, bajo el H1 a 390)

**ES**
Módulo 369 trabaja con pocos artistas y muestra de cada uno un conjunto de obras, no piezas sueltas. Vienen de medios distintos y comparten una forma de trabajar: en series y con tiempo. La galería espera a que cada serie esté terminada para publicarla, con todos sus datos.

**EN**
Módulo 369 works with a small number of artists and shows a body of work by each, rather than single pieces. They come from different media and share a way of working: in series, and over time. The gallery waits until each series is finished before publishing it, with full details.

---

## 3 · Vista 3 · Artista `/artistas/<a>/`

Tres slots por artista, en el orden de la spec 2.3: **statement** sin rótulo bajo el nombre (`c5-8`), **Biografía** y **Historia y proceso** (`c4-6`).

### Artista A · pintura, campos de color (serie Campo)

#### `artista.a.statement`
**ES**
Pinto dos colores por tela, a veces tres, y lo que más miro es la línea donde se tocan. Esa línea nunca sale igual, aunque use los mismos colores. Trabajo por capas muy delgadas, durante semanas, y paro cuando otra capa ya no cambia nada.

**EN**
I paint two colours on each canvas, sometimes three, and what I watch most is the line where they meet. That line never comes out the same, even with the same colours. I work in very thin layers, over weeks, and stop when another layer would change nothing.

#### `artista.a.bio` · Biografía
**ES**
Artista A estudió pintura y trabajó varios años como asistente en talleres de otros pintores, preparando telas y mezclando color por encargo. De ese oficio viene su manera de pintar: tensa y prepara cada tela a mano, y construye la superficie con capas delgadas de óleo o acrílico. Trabaja en series de nueve a doce cuadros que avanzan en paralelo, en formatos que van de lo mediano a telas de más de un metro. Pinta en un taller chico, con luz pareja todo el día, y guarda las telas terminadas de cara a la pared hasta cerrar la serie.

**EN**
Artist A studied painting and spent several years as an assistant in other painters' studios, preparing canvases and mixing colour on request. That trade shaped the way Artist A paints: each canvas is stretched and primed by hand, and the surface is built up in thin layers of oil or acrylic. The work comes in series of nine to twelve paintings, developed side by side, in formats from mid-size to canvases over a metre wide. Artist A paints in a small studio with even light all day, and keeps finished canvases turned to the wall until the series is complete.

#### `artista.a.proceso` · Historia y proceso
**ES**
Cada serie empieza con una paleta corta, que Artista A prueba en papel antes de pasar a la tela. La tela recibe varias manos de base, lijadas entre una y otra. Después vienen las capas de color, muy diluidas, que se dejan secar días enteros; el borde entre las dos franjas se trabaja al final, con pincel casi seco. Una obra puede llevar veinte capas. Cuando la serie está terminada, se cuelga completa en el taller y recién ahí cada cuadro recibe su título y su número.

**EN**
Each series begins with a short palette, which Artist A tests on paper before moving to canvas. The canvas takes several coats of ground, sanded between each one. Then come the layers of colour, heavily thinned and left to dry for days at a time; the edge between the two bands is worked last, with an almost dry brush. A single painting can carry twenty layers. When the series is finished, it is hung together in the studio, and only then does each painting get its title and number.

### Artista B · papel recortado y collage (serie Recorte)

#### `artista.b.statement`
**ES**
Corto papel en cuadrados del mismo tamaño y los pego sobre cartón, siguiendo una cuadrícula que dibujo a lápiz y después borro. Uso pocos tonos: negro, gris, el color del cartón y, de vez en cuando, un rojo. En cada obra levanto una parte ya pegada y la vuelvo a pegar más abajo. Es la última decisión, y la que más me cuesta.

**EN**
I cut paper into squares of the same size and glue them onto card, following a grid I draw in pencil and then erase. I use few tones: black, grey, the colour of the card and, now and then, a red. In each work I lift a section that is already glued and set it down again lower on the sheet. It is the last decision, and the hardest.

#### `artista.b.bio` · Biografía
**ES**
Artista B viene del diseño gráfico y trabajó años en imprentas, armando originales a mano cuando todavía se pegaban con cera. De ese tiempo le quedaron el cúter, la regla metálica y la costumbre de medir dos veces antes de cortar. Empezó con el collage como un trabajo paralelo y hace tiempo que se dedica solo a eso. Trabaja con papeles de color plano, cartón y pegamento de encuadernación, en formatos que rara vez pasan del metro. Su taller está en el segundo piso de una casa antigua, junto a una ventana grande.

**EN**
Artist B comes from graphic design and spent years in print shops, putting artwork together by hand back when layouts were still pasted down with wax. That time left the craft knife, the steel rule and the habit of measuring twice before cutting. Collage began as a side practice and has long since become the only one. Artist B works with flat-coloured papers, card and bookbinding glue, in formats that rarely go beyond a metre. The studio is on the upper floor of an old house, next to a large window.

#### `artista.b.proceso` · Historia y proceso
**ES**
Todo empieza con el corte. En una jornada, Artista B corta cientos de cuadrados y los separa por tono en cajas chicas. Sobre el cartón traza una cuadrícula a lápiz y pega de arriba hacia abajo, decidiendo en el momento qué casilla recibe un cuadrado, cuál una línea o un círculo y cuál queda sin nada. Al final recorta un sector de la obra ya pegada y lo mueve. Antes de firmarla, cada obra pasa una semana bajo peso para que el papel no se ondule.

**EN**
It all starts with cutting. In a single day, Artist B cuts hundreds of squares and sorts them by tone into small boxes. A pencil grid goes onto the card, and the gluing runs from top to bottom, deciding on the spot which cell gets a square, which a line or a circle, and which stays bare. Last of all, a section of the finished collage is cut out and moved. Before it is signed, each work spends a week under weights so the paper does not cockle.

### Artista C · dibujo de línea en tinta y grafito (serie Línea)

#### `artista.c.statement`
**ES**
Dibujo con la hoja apoyada en la mesa y casi sin levantar la mano. Empiezo cerca del centro y las líneas se van abriendo hacia los bordes; a veces se salen de la hoja. Uso tinta o grafito sobre papel gris, y tinta clara sobre papel negro. Termino cuando ya no sé dónde va la línea siguiente.

**EN**
I draw with the sheet flat on the table, hardly lifting my hand. I start near the centre and the lines open out towards the edges; sometimes they run off the sheet. I use ink or graphite on grey paper, and light ink on black paper. I stop when I no longer know where the next line goes.

#### `artista.c.bio` · Biografía
**ES**
Artista C estudió arquitectura y dibujó planos a mano durante años antes de dedicarse por completo al dibujo. De la oficina conserva las herramientas, plumas técnicas, minas de distinta dureza y papeles de buen gramaje, aunque ahora dibuja a mano alzada. Trabaja en formatos chicos y medianos, siempre en series que comparten papel y herramienta, y casi siempre de noche. Guarda los dibujos separados por serie en una cajonera plana, la misma que usaba para los planos. Del dibujo técnico le quedó también la costumbre de numerar cada hoja.

**EN**
Artist C studied architecture and spent years drawing plans by hand before turning to drawing full time. The tools came along from the office, technical pens, leads of different hardness and heavy papers, though the drawing is now freehand. Artist C works in small and mid-size formats, always in series that share a paper and a tool, and nearly always at night. The drawings are kept by series in a flat-file cabinet, the same one once used for plans. Technical drawing also left the habit of numbering every sheet.

#### `artista.c.proceso` · Historia y proceso
**ES**
Antes de empezar, Artista C humedece el papel, lo estira sobre una tabla y lo deja secar un día. Cada dibujo se hace en una sola sesión, con la misma pluma o la misma mina de principio a fin. Las líneas más oscuras son las primeras; las más tenues llegan al final, cuando la tinta se está acabando o la mina perdió la punta. En papel negro usa tinta blanca diluida. No corrige: si un dibujo no funciona, lo guarda y empieza otro.

**EN**
Before starting, Artist C dampens the paper, stretches it on a board and leaves it to dry for a day. Each drawing is made in a single session, with the same pen or the same lead from beginning to end. The darkest lines come first; the faintest arrive at the end, when the ink is running out or the lead has lost its point. On black paper, the ink is diluted white. Nothing is corrected: if a drawing does not work, it is put away and another one begins.

**Largos:** statements de 45 a 65 palabras, bios de 85 a 100 (dentro del rango que sugiere `copy-secciones.md` §5-3), historias de 83 a 90. Largos parecidos por slot en las tres artistas, para que ninguna página pese más que otra.

### `artista.<a>.foto` · Foto opcional (solo si la spec la deja con imagen)

| | ES | EN |
|---|---|---|
| Pie (opcional) | Taller de Artista A | Artist A's studio |
| `alt` | Foto de relleno: taller de Artista A | Placeholder photo: Artist A's studio |

Si la foto no tiene imagen, la spec la saca y queda el aviso «Maqueta · Si no hay foto, este espacio no aparece.», que ya dice lo que pasa.

---

## 4 · Vista 5 · Ficha de obra `/obras/<o>/` · `obra.<id>.descripcion`

Una o dos líneas de lo que se ve, en la voz de la galería. Van en la fila «Descripción» de la ficha (spec 2.5, `c7-9`). Las escribí mirando cada obra regenerada con M01 (papeles nuevos de B y C, a-08 sin azul, A menos borrosa, C sin el punto cobalto); si M01 no se aplica, cambian a-08 (hoy tiene fondo hueso y franja azul), c-03 y c-08 (hoy tienen un punto azul) y el «cartón» de B y el «papel gris» de C, que hoy son casi del color del hueso.

**Técnica que asume cada descripción.** El diagnóstico C23 da dos técnicas por artista y la spec no fija cuál lleva cada obra. Las de papel negro de C tienen que ser tinta, y la descripción de cada una no puede contradecir su fila «Técnica»: **Diego usa esta columna como dato de la obra.** Regla: A impar óleo, par acrílico; B impar collage, par papel recortado; C 01, 03, 04, 06, 07 y 09 tinta, 02, 05 y 08 grafito.

| Obra | Técnica ES / EN | Descripción ES | Descripción EN |
|---|---|---|---|
| a-01 · Campo 01 / Field 01 | Óleo sobre tela / Oil on canvas | Dos franjas horizontales, naranja arriba y un vino casi negro abajo, sobre un fondo rojo óxido que las rodea como un marco. | Two horizontal bands, orange above and a near-black wine below, on a rust-red ground that runs around them like a frame. |
| a-02 · Campo 02 / Field 02 | Acrílico sobre tela / Acrylic on canvas | Un azul gris arriba y un arena pálido abajo, separados por una línea angosta del azul noche del fondo. | A grey-blue above and a pale sand below, divided by a narrow line of the night-blue ground. |
| a-03 · Campo 03 / Field 03 | Óleo sobre tela / Oil on canvas | Rojo arriba y crema abajo, sobre un fondo arena. El rojo ocupa casi la mitad de la tela. | Red above and cream below, on a sand ground. The red takes up almost half the canvas. |
| a-04 · Campo 04 / Field 04 | Acrílico sobre tela / Acrylic on canvas | Sobre un fondo casi negro, un café humo grande arriba y una franja más clara abajo. Es la más oscura de la serie. | On a near-black ground, a large smoky brown above and a lighter band below. The darkest work in the series. |
| a-05 · Campo 05 / Field 05 | Óleo sobre tela / Oil on canvas | Un verde oliva oscuro arriba y un crema abajo, dentro de un borde ocre. | A dark olive above and a cream below, inside an ochre border. |
| a-06 · Campo 06 / Field 06 | Acrílico sobre tela / Acrylic on canvas | Verde salvia arriba y un verde casi negro abajo, sobre un fondo verde gris. Toda la tela se queda en un mismo tono. | Sage green above and a near-black green below, on a grey-green ground. The whole canvas stays within one hue. |
| a-07 · Campo 07 / Field 07 | Óleo sobre tela / Oil on canvas | Una franja berenjena alta sobre un rosa pálido, con un borde frambuesa alrededor de las dos. | A tall aubergine band over a pale pink, with a raspberry border around both. |
| a-08 · Campo 08 / Field 08 | Acrílico sobre tela / Acrylic on canvas | Terracota arriba y un blanco hueso abajo, sobre un fondo gris piedra. | Terracotta above and a bone white below, on a stone-grey ground. |
| a-09 · Campo 09 / Field 09 | Óleo sobre tela / Oil on canvas | Casi negro arriba y ocre tostado abajo, rodeados de un rojo ladrillo oscuro. Cierra la serie. | Near-black above and a toasted ochre below, surrounded by a dark brick red. The last work in the series. |
| b-01 · Recorte 01 / Cut-out 01 | Collage sobre papel / Collage on paper | Cuadrados negros, grises y del color del cartón, repartidos con aire, entre líneas cortas y algunos círculos negros. | Black, grey and card-toned squares, loosely spread, among short lines and a few black circles. |
| b-02 · Recorte 02 / Cut-out 02 | Papel recortado / Cut paper | Pocas piezas, y grandes. A la derecha, un bloque de cuadrados negros; al centro, un sector recortado y vuelto a pegar que corta las formas por la mitad. | Few pieces, and large ones. On the right, a block of black squares; in the middle, a section cut out and stuck back down, slicing the shapes in half. |
| b-03 · Recorte 03 / Cut-out 03 | Collage sobre papel / Collage on paper | Arriba a la derecha, los negros se juntan en un damero. Hay tres cuadrados rojos, dos a la izquierda y uno abajo. | Top right, the blacks gather into a checkerboard. There are three red squares, two on the left and one at the bottom. |
| b-04 · Recorte 04 / Cut-out 04 | Papel recortado / Cut paper | Una columna de cuadrados negros baja por la derecha. Arriba, un solo círculo rojo. | A column of black squares runs down the right side. At the top, a single red circle. |
| b-05 · Recorte 05 / Cut-out 05 | Collage sobre papel / Collage on paper | Una de las más densas de la serie: piezas chicas, casi sin espacio entre ellas, y un cuadrado rojo abajo a la derecha. | One of the densest in the series: small pieces with little space between them, and a red square at the bottom right. |
| b-06 · Recorte 06 / Cut-out 06 | Papel recortado / Cut paper | Formato alto, con piezas chicas que llenan la hoja de arriba abajo. En la esquina inferior derecha, un cuadrado rojo. | A tall format, with small pieces filling the sheet from top to bottom. In the lower right corner, a red square. |
| b-07 · Recorte 07 / Cut-out 07 | Collage sobre papel / Collage on paper | La más despejada de la serie: piezas grandes en los bordes, el centro casi libre y un círculo rojo cerca del borde inferior. | The sparest work in the series: large pieces at the edges, the centre almost clear and a red circle near the bottom edge. |
| b-08 · Recorte 08 / Cut-out 08 | Papel recortado / Cut paper | Piezas chicas repartidas por toda la superficie, sin rojo. Solo negro, gris y cartón. | Small pieces spread across the whole surface, with no red. Only black, grey and card. |
| b-09 · Recorte 09 / Cut-out 09 | Collage sobre papel / Collage on paper | Horizontal y densa. Dos cuadrados rojos arriba a la izquierda y un par de líneas rojas cortas hacia el centro. | Horizontal and dense. Two red squares at the top left and a couple of short red lines towards the centre. |
| c-01 · Línea 01 / Line 01 | Tinta sobre papel / Ink on paper | Tinta clara sobre papel negro. Un nudo chico de líneas sobre el centro, y el resto de la hoja oscura. | Light ink on black paper. A small knot of lines above the centre, and the rest of the sheet left dark. |
| c-02 · Línea 02 / Line 02 | Grafito sobre papel / Graphite on paper | Una maraña amplia que se abre hacia abajo y sale por el borde inferior de la hoja. | A wide tangle that opens downwards and runs off the bottom edge of the sheet. |
| c-03 · Línea 03 / Line 03 | Tinta sobre papel / Ink on paper | Trazos apretados en una forma alta, con una línea suelta que cae hasta el borde de abajo. | Tightly packed strokes in a tall shape, with one loose line falling to the bottom edge. |
| c-04 · Línea 04 / Line 04 | Tinta sobre papel / Ink on paper | Tinta clara sobre papel negro. Las líneas se cargan a la izquierda y abajo, y salen por los bordes; la mitad derecha queda oscura. | Light ink on black paper. The lines gather to the lower left and run off the edges; the right half stays dark. |
| c-05 · Línea 05 / Line 05 | Grafito sobre papel / Graphite on paper | Formato alto. Las líneas se juntan en el centro y algunas se estiran hacia arriba y hacia abajo. | A tall format. The lines gather in the centre, and a few stretch up and down. |
| c-06 · Línea 06 / Line 06 | Tinta sobre papel / Ink on paper | Una maraña cargada a la izquierda, que toca el borde. Los trazos más oscuros están al medio. | A tangle weighted to the left, touching the edge. The darkest strokes sit in the middle. |
| c-07 · Línea 07 / Line 07 | Tinta sobre papel / Ink on paper | Tinta clara sobre papel negro, en una maraña amplia. Una línea baja sola casi hasta el borde inferior. | Light ink on black paper, in a wide tangle. One line drops on its own almost to the bottom edge. |
| c-08 · Línea 08 / Line 08 | Grafito sobre papel / Graphite on paper | Horizontal. Las líneas ocupan la mitad de arriba y un trazo fino baja hasta el borde. | Horizontal. The lines fill the upper half, and one fine stroke runs down to the edge. |
| c-09 · Línea 09 / Line 09 | Tinta sobre papel / Ink on paper | Las líneas se juntan abajo, hacia la izquierda. Arriba, el papel queda sin trazo. | The lines gather low on the sheet, towards the left. Above them, the paper is left bare. |

---

## 5 · Vistas 6 y 7 · Ediciones

### `ediciones.presentacion` · Presentación (spec 2.6: `c1-3`, en la fila de las portadas)

**ES**
Módulo 369 edita cuadernos y libros con obra de sus artistas. Se imprimen a pedido y se compran en Amazon, en español y en inglés.

**EN**
Módulo 369 publishes notebooks and books featuring work by its artists. They are printed on demand and sold on Amazon, in Spanish and English.

### `edicion.<n>` · Descripción, detalles e interiores (spec 2.7)

Las descripciones no dependen de lo que lleve la portada (la spec D16 todavía no la resuelve con la corrección): hablan del papel, del interior y de la tapa. Los formatos son tamaños reales de Amazon KDP; las páginas, de muestra.

**Edición 01 · Cuaderno / Edition 01 · Notebook**

| Slot | ES | EN |
|---|---|---|
| Descripción | Cuaderno de hojas lisas color crema, con cuatro láminas a color de la serie Campo, de Artista A, repartidas entre las páginas. Tapa blanda, del tamaño justo para llevar en un bolso. | A notebook of plain cream pages, with four colour plates from Artist A's Field series spread through it. Softcover, sized to carry in a bag. |
| Páginas | 120 | 120 |
| Formato | Tapa blanda · 14 × 21,6 cm | Paperback · 14 × 21.6 cm |
| Interior 1 (lo que muestra la imagen 3:2) | Doble página: a la izquierda, una hoja lisa; a la derecha, Campo 03 a página completa. | Spread: a plain page on the left; Field 03 full page on the right. |
| Interior 2 | Doble página de hojas lisas, con el número de página abajo, en el margen exterior. | Spread of plain pages, with the page number at the bottom outer margin. |

**Edición 02 · Cuaderno / Edition 02 · Notebook**

| Slot | ES | EN |
|---|---|---|
| Descripción | Cuaderno con una cuadrícula de puntos, apenas marcada, en todas las hojas: se puede escribir encima o usarla para dibujar a mano. Abre con Recorte 07, de Artista B, y sus datos. | A notebook with a faint dot grid on every page, to write over or to guide drawing by hand. It opens with Artist B's Cut-out 07 and its details. |
| Páginas | 160 | 160 |
| Formato | Tapa blanda · 15,2 × 22,9 cm | Paperback · 15.2 × 22.9 cm |
| Interior 1 | Primera doble página: a la izquierda, los datos de Recorte 07; a la derecha, la obra. | Opening spread: the details of Cut-out 07 on the left, the work on the right. |
| Interior 2 | Doble página con la cuadrícula de puntos. | Spread with the dot grid. |

**Edición 03 · Libro / Edition 03 · Book**

| Slot | ES | EN |
|---|---|---|
| Descripción | Libro con las obras de los tres artistas con que parte Módulo 369: nueve de cada uno, una por página, con título, año, técnica y medidas. Cierra con el statement de cada artista, en el idioma de la edición. | A book of work by the three artists Módulo 369 starts with: nine by each, one per page, with title, year, medium and dimensions. It closes with each artist's statement, in the language of the edition. |
| Páginas | 96 | 96 |
| Formato | Tapa dura · 21 × 28 cm | Hardcover · 21 × 28 cm |
| Interior 1 | Doble página: a la izquierda, los datos de Línea 02; a la derecha, la obra. | Spread: the details of Line 02 on the left, the work on the right. |
| Interior 2 | Doble página con Campo 05 y Campo 06, de Artista A, una en cada página. | Spread with Artist A's Field 05 and Field 06, one on each page. |

- Las filas «Interior» son el encargo de la imagen (lo que tiene que mostrar) y la base de su `alt` (§10). No llevan pie visible.
- La edición 03 describe exactamente el relleno que hay (27 obras, nueve por artista), así que no promete nada que la maqueta no muestre.

---

## 6 · Vista 8 · Encuentro `/encuentro/`

Todo lo de Encuentro es lo más expuesto de este documento: describe un proyecto de María que todavía no está definido (brief §9-4). El texto se queda en lo que ya se sabe (caja, numeración 001/369, materiales para armar algo, registro en el Libro con foto, número, fecha y lugar aproximado) y en lo que está incluido en el plan (el registro lo sube María). Lo que agrega está en §13-1.

### `encuentro.que-es` · Qué es (spec 2.8: texto `c4-6`, junto a la foto de la caja)

**ES**
Encuentro es una caja. Hay 369, numeradas del 001 al 369, y cada una se activa una sola vez. Adentro vienen materiales para armar algo, en el lugar y con las personas que tú elijas. Cuando una caja se activa, ese encuentro queda en el Libro con su número.

**EN**
Encuentro is a box. There are 369 of them, numbered 001 to 369, and each one is activated only once. Inside are materials to make something, wherever and with whoever you choose. When a box is activated, that Encuentro goes into the Libro under its number.

### `encuentro.como-funciona` · Cómo funciona (junto al aviso «Maqueta · Por decidir: quién sube cada registro…»)

**ES**
Pides o compras la caja en Activar un encuentro y te llega con su número. La abres cuando quieras, donde quieras. Lo que armes con lo que trae, y con quienes la abras, es el encuentro. Al terminar, envías una foto y unas líneas, y el encuentro aparece en el Libro con su número, la fecha y un lugar aproximado.

**EN**
You request or buy the box on Activate an Encuentro, and it arrives with its number. Open it whenever and wherever you like. What you make with what is inside, and with whoever opens it with you, is the Encuentro. Afterwards, you send a photo and a few lines, and the Encuentro appears in the Libro with its number, the date and an approximate location.

«Envías una foto» describe la opción incluida (la sube María desde el panel). El aviso de al lado deja abierta la otra.

### `encuentro.formas` · Formas de activación

**ES**
Una caja se puede activar a solas o entre varias personas, en una casa, en un taller o al aire libre. También se puede pedir para regalarla: llega a nombre de quien la va a abrir.

**EN**
A box can be activated alone or by several people together, at home, in a studio or outdoors. It can also be requested as a gift: it arrives in the name of the person who will open it.

### `encuentro.faq` · Preguntas frecuentes (tres `<details>`, cerrados)

| # | Pregunta ES | Respuesta ES | Question EN | Answer EN |
|---|---|---|---|---|
| 1 | ¿Hace falta saber de arte? | No. La caja trae los materiales y unas indicaciones breves; lo demás lo pone quien la abre. | Do I need to know about art? | No. The box holds the materials and a few short instructions; the rest is up to whoever opens it. |
| 2 | ¿Cuánto dura un encuentro? | Lo decides tú. Puede ser una tarde o varios días, y la caja no tiene fecha de vencimiento. | How long does an Encuentro last? | That is up to you. It can be an afternoon or several days, and the box has no expiry date. |
| 3 | ¿Puede haber dos cajas con el mismo número? | No. Cada número existe una sola vez, del 001 al 369. | Can two boxes have the same number? | No. Each number exists only once, from 001 to 369. |

- Las tres llevan la marca «muestra» (una vez, sobre el grupo). Son plausibles, no reales (detector B3): en el sitio las reemplazan las que de verdad le hagan a María. Ninguna respuesta abre un alcance nuevo ni promete un plazo.
- «¿…?» va solo en las preguntas, que son contenido; ningún texto fijo pregunta (`copy-secciones.md` §0).

---

## 7 · Vista 9 · Activar un encuentro `/encuentro/activar/`

Cuatro columnas angostas a 1440 (spec 2.9: `c1-2`, `c3-4`, `c5-6`, `c7-8`; unos 290 px cada una), así que cada texto cabe en 30 a 45 palabras.

| Slot | ES | EN |
|---|---|---|
| `activar.proceso` · Proceso | Envías la solicitud o pagas la caja. Módulo 369 te escribe al correo que dejaste para coordinar la entrega. Después del encuentro, respondes ese mismo correo con una foto y unas líneas. | You send the request or pay for the box. Módulo 369 writes to the email you left to arrange delivery. After the Encuentro, you reply to that same email with a photo and a few lines. |
| `activar.que-recibes` · Qué recibes | La caja con su número, entre 001 y 369. Adentro, los materiales para el encuentro y una hoja con indicaciones breves. | The box with its number, between 001 and 369. Inside, the materials for the Encuentro and a sheet of short instructions. |
| `activar.tiempos` · Tiempos | La caja sale cuando se confirma la solicitud o el pago; el plazo de entrega depende de dónde estés y se confirma por correo. Para abrirla no hay plazo. El registro aparece en el Libro después de que Módulo 369 lo revise. | The box is sent once the request or payment is confirmed; delivery time depends on where you are and is confirmed by email. There is no deadline for opening it. The record appears in the Libro once Módulo 369 has reviewed it. |
| `activar.registro` · Registro fotográfico | Una foto horizontal del encuentro y dos o tres líneas sobre lo que pasó. En el Libro se publican con el número de la caja, la fecha y un lugar aproximado, nunca una dirección. Si en la foto aparecen personas, tienen que estar de acuerdo. | A landscape photo of the Encuentro and two or three lines about what happened. In the Libro they are published with the box number, the date and an approximate location, never an address. If people appear in the photo, they need to agree to it. |
| `activar.pregunta` · Etiqueta del campo de texto (reemplaza «[Pregunta del formulario · la define María]») | Sobre tu encuentro (opcional) | About your Encuentro (optional) |
| `activar.pregunta.ayuda` · Ayuda bajo el campo | Dónde piensas abrir la caja, con quién, o lo que quieras contar. | Where you plan to open the box, who with, or anything else you would like to say. |
| `activar.precio` · Precio de la caja (opción 2) | ver §9 | ver §9 |

- El campo es opcional, así que no lleva mensaje de error.
- «Una foto horizontal» calza con el registro 4:3 de la spec (3.1.13). «Nunca una dirección» y «tienen que estar de acuerdo» son lo mínimo para publicar fotos de terceros; si María decide otra cosa, se cambian dos frases.

---

## 8 · Vista 11 · Encuentro activado `/encuentro/libro/<nnn>/` · los siete de muestra

Van en el `dl` Fecha / Lugar y en la descripción (spec 2.11, `c7-9`). Fechas sin día ni año (el brief prohíbe fechas reales) y lugares sin ciudad. Ninguna descripción dice qué trae la caja, para no escribirle a María el contenido; solo quién la abrió, dónde quedó y cuánto duró.

| Nº | Fecha ES / EN | Lugar ES / EN | Descripción ES | Descripción EN |
|---|---|---|---|---|
| 001 | Un sábado por la tarde / A Saturday afternoon | Una mesa de cocina / A kitchen table | Tres personas abrieron la caja después de almorzar. Lo que armaron se quedó en la mesa hasta la noche; la foto es de ese momento. | Three people opened the box after lunch. What they made stayed on the table until night; the photo is from then. |
| 002 | Un domingo de invierno / A winter Sunday | Un taller compartido / A shared studio | La caja pasó de mano en mano durante el día. Cada persona trabajó un rato y se la dejó a la siguiente. | The box passed from hand to hand through the day. Each person worked on it for a while and left it for the next. |
| 003 | Una mañana de primavera / A spring morning | Un patio / A courtyard | Una sola persona, al sol, toda la mañana. Pidió que la foto no mostrara su cara. | One person, in the sun, all morning. They asked for the photo not to show their face. |
| 004 | Una noche de verano / A summer night | Una terraza / A terrace | Dos personas la abrieron antes de una comida con amigos. Cuando llegaron los demás, el encuentro ya estaba armado en la baranda. | Two people opened it before dinner with friends. By the time the others arrived, the Encuentro was already set out along the railing. |
| 005 | Un viernes, después del trabajo / A Friday, after work | Una oficina, fuera de horario / An office, after hours | Cinco personas de una misma oficina la abrieron en la sala de reuniones. Lo que armaron estuvo en la pared hasta el lunes. | Five people from the same office opened it in the meeting room. What they made stayed on the wall until Monday. |
| 006 | Una tarde de lluvia / A rainy afternoon | Una casa / A house | Dos hermanos que no se veían hace tiempo la abrieron juntos. Les tomó la tarde entera. | Two siblings who had not seen each other for a while opened it together. It took them the whole afternoon. |
| 007 | Un día feriado / A public holiday | Una biblioteca de barrio / A neighbourhood library | Un grupo de lectura dedicó su sesión a la caja. Lo que armaron quedó una semana en la entrada de la biblioteca. | A reading group gave its session over to the box. What they made stayed at the library entrance for a week. |

- La marca «muestra» va en el bloque, junto al «De muestra» que ya tiene la vista (`copy-secciones.md` §5-11). No hace falta repetirla en Fecha y en Lugar.
- Sin menores de edad en ninguna descripción: la foto de cada registro la va a generar alguien, y una persona chica inventada en un registro «real» es lo último que conviene mostrar.

---

## 9 · Datos cortos (lo que antes era `[precio]`, `[fecha]`…)

| Dato | Dónde | ES | EN | Nota |
|---|---|---|---|---|
| Precio de obra (estados 1 y 2 con precio) | Ficha, fila Precio | $ ··· | CLP ··· | Tres puntos medios (U+00B7), sin cifra. `aria-label` «Precio de muestra» / «Sample price». Cuenta como precio para la lógica de estados (brief §4). Es el mismo valor en todas las obras, para que no sugiera un precio distinto por obra |
| Precio de la caja | Activar, opción 2 | $ ··· | CLP ··· | Igual |
| Caja en Tienda | Tienda, bloque Encuentro (reemplaza «[Lo escribe María · qué trae la caja y su precio]») | Una caja numerada de Encuentro, con los materiales para activarla y su lugar en el Libro. · $ ··· | A numbered Encuentro box, with the materials to activate it and its place in the Libro. · CLP ··· | |
| Instagram | Contacto | @modulo369 | @modulo369 | **Sin enlace** (§13-2) |
| Páginas y formato de cada edición | Edición | §5 | §5 | |
| Fecha y lugar de cada encuentro | Encuentro activado | §8 | §8 | |

«Precio a consultar» / «Price on request» (estado 2 sin precio) es texto fijo y no cambia.

---

## 10 · `alt` de las imágenes que antes eran marcadores

La corrección pide imagen en cada posición; la spec decide de dónde sale. El `alt` dice siempre que es relleno (brief §7).

| Imagen | `alt` ES | `alt` EN |
|---|---|---|
| Portada de edición | Portada de relleno: Edición 01 | Placeholder cover: Edition 01 |
| Interior de edición | Interior de relleno, Edición 01: doble página con Campo 03 a la derecha (el texto de la fila «Interior» de §5) | Placeholder inside page, Edition 01: spread with Field 03 on the right |
| Foto de la caja | Foto de relleno: la caja de Encuentro | Placeholder photo: the Encuentro box |
| Registro de un encuentro | Registro de relleno: encuentro 001 | Placeholder record: Encuentro 001 |
| Foto opcional de artista | Foto de relleno: taller de Artista A | Placeholder photo: Artist A's studio |

---

## 11 · Vista 12 · Acerca `/acerca/`

### `acerca.enunciado` · Enunciado (spec 2.12: `c4-6`, junto al H1)

**ES**
Módulo 369 es una galería de arte en línea, en español y en inglés. Muestra obra hecha en taller, en series largas, de artistas que la galería sigue de cerca.

**EN**
Módulo 369 is an online art gallery, in Spanish and English. It shows studio work, made in long series, by artists the gallery follows closely.

### `acerca.desarrollo` · Desarrollo de «mirar · seleccionar · decidir» (bajo las tres palabras, junto al aviso que dice de dónde salen)

**ES**
Antes de publicar una obra, Módulo 369 la mira en el taller, junto al resto de su serie. De lo visto se eligen pocas piezas, las que se sostienen juntas. La decisión final se toma con cada artista y queda a la vista en el sitio: qué está disponible, qué se vendió y qué pertenece a una colección privada.

**EN**
Before a work is published, Módulo 369 looks at it in the studio, alongside the rest of its series. From what has been seen, a few pieces are chosen: the ones that hold together. The final decision is made with each artist and stays visible on the site: what is available, what has sold and what belongs to a private collection.

Las tres palabras se leen como la acción de la galería, no como la práctica de María (su mapa las pone en Acerca, que «no es una bio personal»). Las desarrolla una frase cada una sin repetir la forma «X es Y», que sonaría a definición de folleto.

### `acerca.criterio` · Criterio curatorial

**ES**
Un artista entra a Módulo 369 cuando tiene un trabajo en curso que se puede seguir en el tiempo. La galería se fija en la constancia más que en el medio o la trayectoria, y lo que se publica de cada serie se conversa antes con quien la hizo.

**EN**
An artist joins Módulo 369 with work in progress that can be followed over time. The gallery looks for consistency more than medium or track record, and what is published from each series is discussed first with the person who made it.

### `acerca.vision` · Visión

**ES**
Módulo 369 parte con tres artistas y va a crecer de a poco, sin perder el espacio para mostrar a cada uno con detalle. Junto a las obras, edita cuadernos y libros, y lleva adelante Encuentro, una caja numerada que sale de la galería y vuelve como registro.

**EN**
Módulo 369 starts with three artists and will grow slowly, keeping room to show each one in depth. Alongside the works, it publishes notebooks and books, and runs Encuentro, a numbered box that leaves the gallery and comes back as a record.

«Parte con tres artistas» es un hecho de `BRIEF.md`. No escribe «después seis, después nueve»: `copy-secciones.md` §2.1 ya descartó explicar el crecimiento.

---

## 12 · Pasada de borrado y pasada de voz

**Borrado (lo que salió de los borradores y por qué)**

| Se borró | Por qué |
|---|---|
| «Me interesa lo que pasa en…» (A) | Muletilla de statement; quedó «lo que más miro es…» |
| «…hasta que la superficie deja de pedir más» (A) | Cliché de taller. Quedó «paro cuando otra capa ya no cambia nada», que dice lo mismo con un criterio |
| «con luz del sur» (bio A) | Detalle bonito que en Chile hay que explicar; quedó «luz pareja todo el día» |
| «…pero no las reglas» (bio C) | Juego de palabras de remate (reglas de dibujo y reglas de oficina) |
| «Esa es la elección: obra hecha con tiempo…» (visión curatorial) | Remate con dos puntos; la idea ya estaba dicha |
| «en series, en taller y sin apuro» | Segunda serie de tres en el mismo párrafo (A3); quedó «en series y con tiempo» |
| «pintura, papel y dibujo» en la visión curatorial | Lo dice la página: se ve en las tres obras de abajo |
| «Dibujo sin plan» (C) | Muy cerca de «accidente», vocabulario de María (C11) |
| «se repiten» en la pregunta 3 | Variante de «repetición»; quedó «¿Puede haber dos cajas con el mismo número?» |
| «ordenados por serie» (bio C) | Variante de «orden»; quedó «separados por serie» |
| «pensado para quien dibuja» (Edición 02) | Giro de folleto |
| La presentación de las preguntas frecuentes | Sin trabajo (ver §0) |
| «Cuéntanos…» en la etiqueta de Activar | Primera persona plural de la galería; quedó «Sobre tu encuentro» |
| La madre que sacaba la foto en el encuentro 006 | Sugería menores |

**Búsqueda hecha sobre este archivo**, antes de entregarlo: cero rayas (U+2014 y U+2013); ningún texto de muestra, en ES ni en EN, usa el vocabulario vetado de §1 ni su equivalente inglés (finding, accident, fragment, repetition, void, gesture, order…), que aparece solo en las notas para el equipo; cero «impulsa», «potencia», «descubre», «explora», «experiencia única», «diálogo», «invita»; cero «nosotros» o «nuestro»; cero «usted».

**Voz (leído en voz alta).** Los textos de la galería suenan a lo que diría quien la atiende si alguien pregunta en una feria: frases cortas, sin adjetivos de venta, con un hecho por frase. Los statements son lo único en primera persona y suenan a artista hablando de su taller, no a texto de catálogo. Las bios pasan el test de intercambio de oficio: la de A no sirve para B ni para C, porque cada una nombra herramientas y rutinas de trabajo propias. En inglés se revisaron los calcos: «card» y no «cardboard» para el soporte del collage, «cockle» para el papel que se ondula, «flat-file cabinet» para la cajonera de planos, «landscape» para la foto horizontal.
**Borrar 30% más:** lo probé en las bios, que son lo más largo. Sin la última frase (el taller), cada bio pierde lo único que la hace leerse como una persona y no como una ficha; sin la primera (el oficio de origen), la historia y proceso no tiene de dónde partir. Se quedan.

---

## 13 · Lo que hay que mirar antes de mostrar (y quién)

| # | Qué | Por qué | Quién |
|---|---|---|---|
| 1 | **Todo Encuentro y Activar** (§6, §7, §8) | Es un ejemplo de largo y tono, no una propuesta de cómo funciona la caja. Agrega cosas que María no dijo: que cada caja se activa una vez, una hoja con indicaciones, que se puede regalar, que el registro se revisa antes de publicarse, «nunca una dirección», el permiso de las personas en la foto, los siete usos de los encuentros. Recomiendo que Ramón lo diga en voz alta al llegar a Encuentro, igual que el aviso de relleno al abrir la reunión | Ramón, en la reunión |
| 2 | **@modulo369 sin enlace** | No está verificado que la cuenta sea de María ni que esté libre. Si existe y es de otra persona, un enlace la presentaría como la cuenta de la galería | Ramón: confirmar con María; la spec no lo enlaza |
| 3 | **Bios de A, B y C** | Inventan oficios de origen (asistente de pintores, diseño e imprenta, arquitectura). Si alguno coincide con la trayectoria real de María o de su amiga, aparece el «¿esa soy yo?» de C11 por otro lado | Ramón, que conoce la trayectoria de María: un vistazo antes de publicar el link |
| 4 | **Técnica por obra** (§4) | Si Diego asigna las técnicas con otra regla, una descripción puede decir «tinta clara» en una obra rotulada «Grafito» | Diego: usar la columna de §4 como dato |
| 5 | **Descripciones según M01** | Escritas sobre las obras regeneradas. Sin M01 cambian a-08, c-03, c-08 y las menciones al cartón de B y al papel gris de C (también en sus statements) | Diego |
| 6 | **Formatos de edición** | 14 × 21,6, 15,2 × 22,9 (tapa blanda) y 21 × 28 cm (tapa dura) son tamaños de KDP; las páginas son de muestra. «Se imprimen a pedido» es cierto para KDP | Ninguno en la maqueta |
| 7 | **Texto de muestra en gris o en grafito** (§0.1) | En gris se lee pendiente, que es lo que la corrección pide evitar | Lucía |
| 8 | **Nada de esto va a producción** | En el sitio, cada hueco lo escriben María o cada artista en los dos idiomas (compromiso 5 del 24-sep). La lista de qué escribe cada una sigue en `copy-secciones.md` §6 | Regla del brief §6 |

---

## 14 · Studio Iron: texto de muestra nuevo o corregido (spec v2 §12)

> Lo escribe Clara el 5-oct (noche) para los slots de muestra de `spec-visual.md` v2 §12 (8, 9, 12, 13, 20, 27 y 28). El texto fijo de los mismos slots está en `copy-secciones.md` §12. **Donde esta sección cambia algo anterior de este documento, gana esta.** Todo lleva `.pendiente` y su marca «muestra» / «sample» (spec 8.1); nada va a producción. Para revisión humana: lo aprueba Ramón antes de construir.
> **Las obras, miradas de nuevo:** las 27 de M01 que están hoy en `GALERIA-MARIA-LORETO/maqueta/img/obras/` (hojas ampliadas en `scratchpad/clara-si/a-1.png` … `c-7.png`), las tapas e interiores de `img/ediciones/` (`scratchpad/clara-si/ediciones.png`) y la receta de la spec 3.2. Lo que escribí el 5-oct en la mañana describía el relleno de la v1 (desvíos 1, 2 y 30): A ya no son dos franjas borrosas, B ya no son cuadrados iguales con círculos, C ya no son marañas de líneas finas. Ahora A son campos de borde duro, B papeles de distintos largos sobre cartón y C trazos de pincel seco.

### 14.0 · Qué reemplaza

| Dónde | Antes | Ahora |
|---|---|---|
| §3 · statements de A, B y C | 45 a 65 palabras; B y C describían la v1 | §14.2, ≤ 35 palabras |
| §3 · historia y proceso de A y B; bio e historia y proceso de C | Mencionaban dos franjas (A), cuadrados y círculos (B), plumas técnicas y minas (C) | §14.2. **No estaban en la lista de §12**: es el mismo defecto del desvío 2, en la misma página, junto a las mismas obras |
| §4 · descripciones de las 27 obras | Describían la v1 | §14.3 |
| §5 · descripción de cada edición | e-01 decía «hojas color crema» (el papel es casi blanco); e-03 pasaba de 35 palabras y decía «una por página» (el interior 1 pone los datos a la izquierda y la obra a la derecha) | §14.4, un solo texto por edición, ≤ 35 palabras, el mismo en Ediciones y en Edición |
| §10 · `alt` del registro | «Registro de relleno: encuentro 001» | «Registro de relleno: Encuentro 001» (`copy-secciones.md` 12.4) |

### 14.1 · Inicio

#### Slot 8 · `inicio.enunciado` · H2 (`--t-enunciado`, punto final en cobalto)

| ES | EN |
|---|---|
| De cada artista, la serie entera. | From each artist, the whole series. |

6 palabras. Medido con Instrument Serif: dos líneas a 390 (46,8 px en 354) y dos a 1440 (100,8 px en `c2-8`).

| | Candidato | Por qué |
|---|---|---|
| **A · elegido** | De cada artista, la serie entera. | Dice la decisión curatorial concreta que ya está en la visión curatorial de muestra (un conjunto de obras por artista, no piezas sueltas) y es exactamente lo que María va a ver en la maqueta: las nueve obras de cada serie. Pasa el test de intercambio: una galería de piezas sueltas no lo puede decir. Fragmento corto, como el de Studio Iron («Dedicated to a new era of design.») |
| B | Pocos artistas, seguidos de cerca. | Repite el párrafo de abajo («artistas que la galería sigue de cerca») |
| C | Una galería de obra en serie. | «En serie», en castellano, es producción en serie: la peor lectura posible para una galería de arte |
| D | Series completas, de pocos artistas. | «Series completas» se lee primero como televisión |

No usa la frase del correo de María ni «orden con pequeñas disrupciones», ni el vocabulario vetado de §1.

#### Slot 9 · Enunciado, párrafo

`acerca.enunciado` (§11) **tal cual**, 30 palabras: «Módulo 369 es una galería de arte en línea, en español y en inglés. Muestra obra hecha en taller, en series largas, de artistas que la galería sigue de cerca.» Funciona bajo el H2: dice qué es la galería, que el H2 no dice, y desarrolla «la serie entera» sin repetirlo. María escribe un solo texto, como Studio Iron, que repite el suyo en About.

#### Slot 12 · `inicio.encuentro` · Banda Encuentro, párrafo

| ES | EN |
|---|---|
| Una caja numerada del 001 al 369, con materiales para armar algo donde y con quien quieras. Cada una se activa una vez y queda registrada en el Libro. | A box numbered 001 to 369, with materials to make something wherever and with whoever you like. Each one is activated once and recorded in the Libro. |

29 / 27 palabras, dos frases. Sale de `encuentro.que-es` (§6) y no agrega nada que ese texto no diga. Empieza sin repetir «Encuentro», que está justo arriba como título de la banda.

#### Slot 13 · `inicio.ediciones` · Banda Ediciones, párrafo

`ediciones.presentacion` (§5) **tal cual**, 25 palabras: «Módulo 369 edita cuadernos y libros con obra de sus artistas. Se imprimen a pedido y se compran en Amazon, en español y en inglés.» Un texto de María, dos lugares.

### 14.2 · Artista: statements (slot 20) y lo que cambió por M01

#### Statements (≤ 35 palabras, en itálica de 36 junto a una obra, sin comillas)

| Artista | ES | EN | Palabras |
|---|---|---|---|
| A · Campo | Pinto dos colores por tela, a veces tres, y lo que más miro es el borde donde se tocan. Trabajo en capas delgadas, durante semanas, y paro cuando otra capa ya no cambia nada. | I paint two colours on each canvas, sometimes three, and what I watch most is the edge where they meet. I work in thin layers, over weeks, and stop when another layer would change nothing. | 34 · 35 |
| B · Recorte | Corto papel en tiras y rectángulos de distintos largos y los pego sobre cartón, casi todos ajustados a una cuadrícula que después no se ve. Pocos tonos: negro, gris, kraft, blanco y algún rojo. | I cut paper into strips and rectangles of different lengths and glue them onto card, most fitted to a grid that no longer shows. Few tones: black, grey, kraft, white and the odd red. | 34 · 34 |
| C · Línea | Dibujo con un pincel casi seco: tinta o grafito sobre papel claro, tinta clara sobre papel negro. Hago pocos trazos, de una sola pasada, y los dejo terminar donde el pincel se seca. | I draw with an almost dry brush: ink or graphite on pale paper, light ink on black paper. I make a few single-pass strokes and let them end where the brush runs dry. | 33 · 33 |

- **A** se acortó y cambió «la línea donde se tocan» por «el borde»: los campos de M01 tienen borde duro y en a-02, a-05, a-06, a-07 y a-09 hay solo dos colores; en a-01, a-03, a-04 y a-08, tres. «Dos colores, a veces tres» es verdad en las nueve.
- **B** ya no dice «cuadrados del mismo tamaño» (M01: tiras y rectángulos de largos distintos, el 70% a una cuadrícula de 6 × 6) ni promete un rojo en cada obra (b-06 no tiene).
- **C** ya no dice «papel gris» (M01: papel casi blanco) ni describe líneas de pluma: son trazos de pincel seco que se abren hacia el final.
- Medido: el de A ocupa 5 líneas a 26 px en 354 y 6 líneas a 36 px en 464.

#### Historia y proceso de A (cambia una frase)

| ES | EN |
|---|---|
| Cada serie empieza con una paleta corta, que Artista A prueba en papel antes de pasar a la tela. La tela recibe varias manos de base, lijadas entre una y otra. Después vienen las capas de color, muy diluidas, que se dejan secar días enteros; los bordes entre un campo y otro se trabajan al final, con un pincel chico. Una obra puede llevar veinte capas. Cuando la serie está terminada, se cuelga completa en el taller y recién ahí cada cuadro recibe su título y su número. | Each series begins with a short palette, which Artist A tests on paper before moving to canvas. The canvas takes several coats of ground, sanded between each one. Then come the layers of colour, heavily thinned and left to dry for days at a time; the edges between one field and the next are worked last, with a small brush. A single painting can carry twenty layers. When the series is finished, it is hung together in the studio, and only then does each painting get its title and number. |

La bio de A no cambia.

#### Historia y proceso de B (cambian el corte y la cuadrícula; sale el círculo)

| ES | EN |
|---|---|
| Todo empieza con el corte. En una jornada, Artista B corta decenas de tiras y rectángulos de distintos largos y los separa por tono en cajas chicas. Sobre el cartón traza a lápiz una cuadrícula, que después borra, y pega de arriba hacia abajo: casi todas las piezas van ajustadas a la cuadrícula y algunas quedan sueltas, apenas giradas. Al final recorta un sector de la obra ya pegada y lo mueve. Antes de firmarla, cada obra pasa una semana bajo peso para que el papel no se ondule. | It all starts with cutting. In a single day, Artist B cuts dozens of strips and rectangles of different lengths and sorts them by tone into small boxes. A pencil grid goes onto the card, to be erased later, and the gluing runs from top to bottom: most pieces are fitted to the grid, and a few are left loose, slightly turned. Last of all, a section of the finished collage is cut out and moved. Before it is signed, each work spends a week under weights so the paper does not cockle. |

La bio de B no cambia (cúter, regla, papeles de color plano y cartón siguen siendo verdad).

#### Biografía de C (cambian las herramientas)

| ES | EN |
|---|---|
| Artista C estudió arquitectura y dibujó planos a mano durante años antes de dedicarse por completo al dibujo. De la oficina conserva la mesa grande y el gusto por el papel de buen gramaje; las plumas técnicas las cambió por pinceles anchos y gastados. Trabaja en formatos chicos y medianos, siempre en series que comparten papel y pincel, y casi siempre de noche. Guarda los dibujos separados por serie en una cajonera plana, la misma que usaba para los planos. Del dibujo técnico le quedó también la costumbre de numerar cada hoja. | Artist C studied architecture and spent years drawing plans by hand before turning to drawing full time. From the office came the large table and a liking for heavy paper; the technical pens gave way to wide, worn brushes. Artist C works in small and mid-size formats, always in series that share a paper and a brush, and nearly always at night. The drawings are kept by series in a flat-file cabinet, the same one once used for plans. Technical drawing also left the habit of numbering every sheet. |

#### Historia y proceso de C (pincel en vez de pluma y mina)

| ES | EN |
|---|---|
| Antes de empezar, Artista C humedece el papel, lo estira sobre una tabla y lo deja secar un día. Cada dibujo se hace en una sola sesión, con el mismo pincel de principio a fin. El pincel se carga poco y se descarga en un trapo antes de tocar la hoja: por eso el trazo deja ver el papel entre las cerdas y se va secando hacia el final. En papel negro usa tinta blanca diluida. No corrige: si un dibujo no funciona, lo guarda y empieza otro. | Before starting, Artist C dampens the paper, stretches it on a board and leaves it to dry for a day. Each drawing is made in a single session, with the same brush from beginning to end. The brush takes very little ink and is wiped on a rag before it touches the sheet, so the paper shows between the bristle marks and each stroke dries out towards its end. On black paper, the ink is diluted white. Nothing is corrected: if a drawing does not work, it is put away and another one begins. |

### 14.3 · Ficha: las 27 descripciones (slot 27; `obra.<id>.descripcion`)

Una o dos frases de lo que se ve, en la voz de la galería. La técnica es la de `app.js` (A impar óleo, par acrílico; B impar collage, par papel recortado; C 02, 05 y 08 grafito, el resto tinta), con los nombres nuevos de B (`copy-secciones.md` 12.0). Ninguna descripción contradice su fila «Técnica»: C 01, 04 y 07, en papel negro, son tinta.

| Obra | Técnica ES / EN | ES | EN |
|---|---|---|---|
| a-01 · Campo 01 | Óleo sobre tela / Oil on canvas | Terracota en algo más de la mitad de arriba y arena abajo, separados por una franja angosta casi negra. | Terracotta across a little over the top half and sand below, divided by a narrow, near-black band. |
| a-02 · Campo 02 | Acrílico sobre tela / Acrylic on canvas | Un solo campo ocre sobre un fondo café oscuro, corrido hacia la izquierda. | A single ochre field on a dark brown ground, set towards the left. |
| a-03 · Campo 03 | Óleo sobre tela / Oil on canvas | Un campo arena ocupa la izquierda, hasta pasada la mitad. A la derecha, sobre crema, una franja verde vertical que no toca los bordes. | A sand field takes up the left, past the middle. On the right, against cream, an upright green band that stops short of the edges. |
| a-04 · Campo 04 | Acrílico sobre tela / Acrylic on canvas | Tres franjas horizontales del mismo alto: rojo arriba, casi negro al medio y arena abajo. | Three horizontal bands of equal height: red above, near-black in the middle and sand below. |
| a-05 · Campo 05 | Óleo sobre tela / Oil on canvas | Fondo arena, cruzado de arriba abajo por una franja casi negra cerca del borde izquierdo. | A sand ground, crossed from top to bottom by a near-black band close to the left edge. |
| a-06 · Campo 06 | Acrílico sobre tela / Acrylic on canvas | Un rectángulo crema, vertical, sobre un rojo óxido, corrido hacia la derecha. | An upright cream rectangle on a rust red, set towards the right. |
| a-07 · Campo 07 | Óleo sobre tela / Oil on canvas | Verde oliva en casi toda la tela y una franja arena abajo. | Olive green over most of the canvas, with a band of sand along the bottom. |
| a-08 · Campo 08 | Acrílico sobre tela / Acrylic on canvas | Dos campos verticales sobre gris piedra: terracota a la izquierda y café oscuro a la derecha, con una franja angosta del fondo entre los dos. | Two vertical fields on stone grey: terracotta on the left and dark brown on the right, with a narrow strip of ground between them. |
| a-09 · Campo 09 | Óleo sobre tela / Oil on canvas | Un cuadrado ocre al centro, sobre un rojo ladrillo oscuro. Cierra la serie. | An ochre square in the centre, on a dark brick red. The last work in the series. |
| b-01 · Recorte 01 | Collage sobre cartón / Collage on card | Pocas piezas, sueltas sobre el cartón. Arriba a la derecha, una tira negra larga; más abajo, un rojo que se sale por el borde derecho. | A few pieces, loose on the card. Top right, a long black strip; further down, a red that runs off the right edge. |
| b-02 · Recorte 02 | Papel recortado sobre cartón / Cut paper on card | Sobre un cartón más oscuro, dos rojos: un cuadrado arriba a la izquierda y una tira que entra por el borde izquierdo. | On a darker card, two reds: a square at the upper left and a strip coming in from the left edge. |
| b-03 · Recorte 03 | Collage sobre cartón / Collage on card | En la mitad de abajo, las piezas se montan unas sobre otras y asoma un rojo bajo un negro. Arriba, tiras grises entran por los dos bordes. | In the lower half the pieces overlap, and a red shows beneath a black. Above, grey strips come in from both edges. |
| b-04 · Recorte 04 | Papel recortado sobre cartón / Cut paper on card | Las piezas se juntan arriba y abajo, y el centro queda casi libre. Abajo, una tira negra larga y un rojo contra el borde derecho. | The pieces gather at the top and bottom, leaving the centre almost clear. At the bottom, a long black strip and a red against the right edge. |
| b-05 · Recorte 05 | Collage sobre cartón / Collage on card | La más cargada de la serie: piezas grandes, negras y blancas, que casi tapan el cartón. Un rojo alto arriba, al centro. | The fullest work in the series: large black and white pieces that almost cover the card. A tall red at the top, in the middle. |
| b-06 · Recorte 06 | Papel recortado sobre cartón / Cut paper on card | Formato alto y sin rojo. Las piezas se reparten arriba y en un grupo bajo la mitad, donde un negro grande se monta sobre un kraft. | A tall format, with no red. The pieces spread across the top and into a group below the middle, where a large black overlaps a kraft. |
| b-07 · Recorte 07 | Collage sobre cartón / Collage on card | De las más despejadas: pocas piezas, casi todas tiras. Un rojo corto entra por el borde derecho, arriba. | One of the sparest in the series: few pieces, most of them strips. A short red comes in from the right edge, at the top. |
| b-08 · Recorte 08 | Papel recortado sobre cartón / Cut paper on card | Densa, con dos tiras rojas en la mitad de abajo. A la derecha, un blanco dentro de un marco negro; abajo a la izquierda, un blanco grande que se sale por el borde. | Dense, with two red strips in the lower half. On the right, a white inside a black frame; bottom left, a large white that runs off the edge. |
| b-09 · Recorte 09 | Collage sobre cartón / Collage on card | Horizontal, con mucho cartón a la vista. Arriba, una fila de piezas casi alineada; abajo, un negro y un rojo suben desde el borde. | Horizontal, with plenty of card showing. Along the top, a near-straight row of pieces; below, a black and a red rise from the bottom edge. |
| c-01 · Línea 01 | Tinta sobre papel / Ink on paper | Tinta clara sobre papel negro. Trazos de pincel seco en la mitad de abajo, dos de ellos cruzados; la mitad de arriba queda oscura. | Light ink on black paper. Dry-brush strokes across the lower half, two of them crossing; the upper half stays dark. |
| c-02 · Línea 02 | Grafito sobre papel / Graphite on paper | Dos trazos se cruzan al centro. A la derecha, uno corto y casi vertical; abajo, otro solo que llega al borde derecho. | Two strokes cross in the middle. To the right, a short, near-vertical one; below, another on its own that reaches the right edge. |
| c-03 · Línea 03 | Tinta sobre papel / Ink on paper | Un ángulo a la izquierda y, a la derecha, dos trazos que se cruzan en aspa. El tercio de abajo queda sin trazo. | An angle on the left and, on the right, two strokes crossing in an X. The bottom third is left bare. |
| c-04 · Línea 04 | Tinta sobre papel / Ink on paper | Tinta clara sobre papel negro. Los trazos se cruzan a la derecha del centro; uno entra por el borde izquierdo y otro sube desde abajo. | Light ink on black paper. The strokes cross just right of centre; one comes in from the left edge and another rises from the bottom. |
| c-05 · Línea 05 | Grafito sobre papel / Graphite on paper | Formato alto y pocos trazos, separados entre sí. Uno baja desde el borde de arriba; los demás quedan sueltos, con mucho papel alrededor. | A tall format with a few strokes, set apart. One drops from the top edge; the rest sit loose, with plenty of paper around them. |
| c-06 · Línea 06 | Tinta sobre papel / Ink on paper | Varios trazos que se cruzan abajo, al centro, y dos verticales arriba. Uno corto y ancho cierra abajo a la izquierda. | Several strokes crossing low in the middle, and two upright ones above. A short, wide stroke sits at the lower left. |
| c-07 · Línea 07 | Tinta sobre papel / Ink on paper | Tinta clara sobre papel negro. Un trazo largo baja en diagonal hacia la derecha; abajo, dos trazos anchos llegan hasta el borde. | Light ink on black paper. A long stroke runs diagonally down to the right; below, two wide strokes reach the bottom edge. |
| c-08 · Línea 08 | Grafito sobre papel / Graphite on paper | Horizontal. Dos trazos se cruzan sobre el centro, con un ángulo a la izquierda y uno suelto a la derecha; la mitad de abajo queda sin trazo. | Horizontal. Two strokes cross above the centre, with an angle on the left and a loose one on the right; the lower half is left bare. |
| c-09 · Línea 09 | Tinta sobre papel / Ink on paper | Trazos cargados hacia la izquierda, que se cruzan en una forma alta. La derecha y la parte de abajo quedan libres. | Strokes weighted to the left, crossing in a tall shape. The right side and the bottom are left clear. |

- Comprobadas contra los dos lugares donde una obra aparece con su descripción al lado o cerca: la ficha (obra plana) y la Edición (e-02 abre con Recorte 07; e-03 con Línea 02 y Campo 05 y 06).
- Si M01 se vuelve a generar con otras semillas, cambian las de B y C (posiciones de piezas y trazos); las de A dependen solo de la tabla de la spec 3.2, que no cambia.

### 14.4 · Ediciones: un texto por edición (slot 28)

Es la descripción breve del bloque partido de Ediciones **y** la descripción de la página de cada Edición: María escribe uno.

| Edición | ES | EN | Palabras |
|---|---|---|---|
| 01 · Cuaderno | Cuaderno de hojas lisas, con cuatro láminas a color de la serie Campo, de Artista A, repartidas entre las páginas. Tapa blanda negra, del tamaño justo para llevar en un bolso. | A notebook of plain pages, with four colour plates from Artist A's Field series spread through it. Black softcover, sized to carry in a bag. | 31 · 25 |
| 02 · Cuaderno | Cuaderno de tapa kraft, con una cuadrícula de puntos apenas marcada en las hojas: sirve para escribir o para dibujar a mano. Abre con Recorte 07, de Artista B, y sus datos. | A notebook with a kraft cover and a faint dot grid on its pages, for writing or drawing by hand. It opens with Artist B's Cut-out 07 and its details. | 32 · 30 |
| 03 · Libro | Libro de tapa dura con las obras de los tres artistas con que parte Módulo 369: nueve de cada uno, con sus datos. Cierra con el statement de cada artista. | A hardcover book of work by the three artists Módulo 369 starts with: nine by each, with their details. It closes with each artist's statement. | 30 · 25 |

- Comprobadas contra las tapas e interiores de M03: e-01 tapa grafito, hojas lisas y Campo 03 a página completa; e-02 tapa kraft, Recorte 07 con sus datos y la doble página de puntos; e-03 datos de Línea 02 a la izquierda y la obra a la derecha, y Campo 05 con Campo 06.
- Páginas y formato (§5) no cambian.

### 14.5 · Pasada de borrado y búsqueda

| Se borró | Por qué |
|---|---|
| «la línea donde se tocan» (A) | Los bordes de M01 son de campo, no una línea entre dos franjas |
| «Esa línea nunca sale igual, aunque use los mismos colores» (A) | No cabía en 35 palabras y era la frase que menos hacía |
| «En cada obra levanto una parte ya pegada…» (statement de B) | No se ve en las obras; queda en historia y proceso, que es donde se cuenta cómo se trabaja |
| «Termino cuando ya no sé dónde va la línea siguiente» (C) | Describía dibujo de línea continua; quedó el criterio del pincel que se seca |
| «hojas color crema» (e-01) | El papel de M03 es casi blanco |
| «una por página» (e-03) | El interior 1 pone los datos en una página y la obra en la otra |
| «casi vacío» (primer borrador de b-04) | «Vacío» es vocabulario de María (§1); quedó «casi libre» |
| «Hago pocos trazos, sin volver a cargar el pincel» (primer borrador de C) | Contradecía la historia y proceso (el pincel se carga en cada trazo) |

**Búsqueda hecha sobre esta sección**, antes de entregarla: cero rayas (U+2014 y U+2013); ningún texto de muestra usa el vocabulario vetado de §1 (hallazgo, accidente, inesperado, estructura, acumulación, fragmento, repetición, vacío, gesto, disrupción, romper, escala, desplazado, orden, limpio, elegante, sorprender) ni su equivalente inglés; cero «nosotros», «nuestro» y «usted»; cero cifras de precio. Los conteos de palabras de 14.1, 14.2 y 14.4 están contados con script, no a ojo.
**Voz:** los statements son lo único en primera persona y suenan a alguien hablando de su taller; las descripciones, a quien atiende la galería diciendo lo que hay en la pared, una cosa por frase. Las tres bios siguen pasando el test de intercambio de oficio.
**Lo que hay que mirar antes de mostrar:** sigue valiendo §13. Se suma que la bio de C ahora habla de pinceles: si la amiga de María pinta o dibuja con pincel, el «¿esa soy yo?» de §13-3 se mira con más cuidado.
