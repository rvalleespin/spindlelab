# Spec visual · María Loreto Hernández · Módulo 369 · maqueta v2 · dirección: retícula 3·6·9

> El contrato visual de la v2. Lo escribe Lucía (`/web-direccion-arte`, paso 5) el 5-oct-2026 y **reemplaza entera** la versión parcial escrita antes de la corrección de Ramón (brief §10: «la maqueta se debe acercar al trabajo final, no debería mostrar algo tan básico»). Diego construye contra esto; Javiera audita contra esto, ítem por ítem: cada regla tiene número. Una corrección que no termine escrita acá vuelve en la pasada siguiente.
> **Jerarquía de documentos:** `brief-de-obra.md` (alcance) > esta spec (visual) > `copy-muestra.md` (texto de muestra de los huecos, lo escribe Clara) > `copy-secciones.md` (texto fijo, avisos, capa «Lo editas tú», y qué va en cada hueco y quién lo escribe) > `referencias.md` (lock) > `diagnostico-maqueta-v1.md` (insumo). Los corchetes `[Lo escribe…]` de `copy-secciones.md` **ya no van en pantalla** (brief §6 corregido): en su lugar va el texto de `copy-muestra.md` con la marca de 8.1.

**Referencia dominante:** PRODn, página de portafolio (https://prodn.com/portfolio/).
**Rasgos que se preservan:** (a) cada fila de obras suma el módulo (9, 6 o 3 columnas) y lo reparte distinto fila a fila; (b) la obra va plana, a su proporción, alineada arriba, sin caja, marco, sombra ni recorte; (c) el pie va debajo de la imagen, pegado a su borde izquierdo, y nada va encima; (d) la separación entre filas es al menos 4 veces la calle; (e) hay vacío antes del primer bloque; (f) **la imagen manda la terminación**: en PRODn el sitio se ve terminado porque cada imagen es buena, no por adornos. Por eso esta spec gasta su esfuerzo en el relleno (§3) antes que en la interfaz.
**Qué sacrifica esta dirección:** la foto de sala a sangre de Escat (no hay activo y fingir una sala se vería falso); el lienzo negro de Schipper y Quatrième (el hueso es token fijo); la serif como voz (sale del sitio); la animación de aparición al bajar (Schipper); el catálogo uniforme que muestra todo el inventario de un golpe (el muro se recorre por filas); la escala real de las obras en el muro.
**Medido para esta spec (5-oct):** anchos de la palabra enorme y del contador con Archivo y Plex Mono reales en Chrome headless (`scratchpad/lucia-spec/medir*.html`); contrastes de los tokens; distancia de color entre el borde de cada imagen y el hueso; tiempos y curvas de movimiento leídos del CSS publicado de PRODn, Escat, Quatrième, Schipper, Studio Iron y Kurimanzutto (`scratchpad/lucia-spec/motion/`); y **las recetas de relleno de §3 probadas en Pillow** (`scratchpad/lucia-spec/proto_media.py` y `proto_media2.py`, hoja de contacto `hoja-proto-2.png`): se generan en menos de 2 s y se leen como pintura, collage, tinta y foto cenital a tamaño web.

---

## 0 · La vara de terminación y las decisiones de criterio

### 0.1 · Qué quiere decir «casi terminada» (regla de Ramón, brief §10, §6, §7)

La v2 es una propuesta de diseño al nivel de los referentes de la cotización, no un esqueleto. Lo que quede después de la reunión es ajuste por opinión de María (qué palabra va enorme, dónde va el cobalto, qué textos escribe ella, qué fotos llegan), **nunca diseño pendiente**. Un bloque está terminado, a 390 y a 1440, cuando cumple las ocho:

| # | Criterio | Cómo se mide (detalle en 10.2) |
|---|---|---|
| T1 | **Texto:** ninguna instrucción entre corchetes ni «Lo escribe…» en pantalla; cada hueco lleva texto de muestra de `copy-muestra.md` con su marca (8.1) | M16, M18 |
| T2 | **Imagen:** ningún slot vacío, gris ni marcador; cada slot con su imagen de relleno (§3), su proporción, sus variantes y su `alt` de relleno | M17 |
| T3 | **Tipografía:** solo la escala de 1.2, las dos familias cargadas, interlineado y tracking de la tabla, `text-wrap` donde lo pide | M7, M15 |
| T4 | **Composición:** cada bloque en las columnas de §2 en los tres anchos, sin superposiciones ni scroll horizontal | M1, M2, M8 |
| T5 | **Interacción:** cada pieza con sus estados de §4 y área táctil ≥ 44 × 44 px | M11, M12 |
| T6 | **Movimiento:** el catálogo de 1.7 funcionando con sus tiempos, y apagado con `prefers-reduced-motion` | M19, M20 |
| T7 | **Carga:** cada imagen reserva su espacio y aparece con 1.7.a; nada salta | M10 |
| T8 | **Lado a lado:** puesta junto a su referencia (10.3), la vista se lee como sitio en producción | M24 (juicio de Javiera, escrito) |

### 0.2 · Decisiones de criterio (resueltas, con su porqué y su referencia)

Las preguntas de «Decisiones de criterio» del diagnóstico que son de dirección de arte, más las que trae la vara nueva. Las de negocio (staging, cifra de la tienda, proveedor de formularios) no son de esta spec.

**D1 · Portada: carrusel de cinco láminas que se desliza con el dedo; en cada lámina, una obra nítida, entera, corrida a un borde de la retícula, con su pie debajo. Sin foto de sala, sin desenfoque, sin sombra, sin caja.**
- La pista ocupa el ancho del contenido (`c1-9` · `c1-6` · `c1-3`). En cada lámina la obra se pinta entera a su proporción, **alineada abajo**, pegada al borde izquierdo, al derecho o centrada según la lámina (2.1.1). El hueso que queda al costado es vacío, no marco: es la «imagen desplazada» de María.
- **Cada lámina lleva su propio pie** (enlace a la ficha, la única acción del inicio), alineado al borde izquierdo de la obra y a `--e-2` de ella, como cada imagen de PRODn. Así el pie viaja con la obra al deslizar.
- Controles en una fila aparte bajo la pista. **Sin vuelta al principio:** en la lámina 1 «← Anterior» está deshabilitado y en la 5 «Siguiente →» también (con el scroll nativo, saltar de la 5 a la 1 cruzaría todas las láminas). Sin avance automático.
- **Respaldo:** Escat («la foto grande» que María nombró: ancho del contenido, 78 a 100% del alto, leyenda debajo, nada encima; `referencias/07-escat-home-1440-v0.jpg`); PRODn (obra plana, pie de dos líneas pegado al borde izquierdo de la imagen; `02-prodn-portfolio-1440-v0.jpg`); Schipper (indicador en números chicos con una raya junto al activo).
- **Por qué no foto de sala:** no hay activo; bajar fotos con licencia requiere el OK de Ramón; una sala hecha con Pillow se vería falsa (diagnóstico, «Descartado»). Queda para después (C41).

**D2 · Palabra enorme: «ARTISTAS» / «ARTISTS», título de la sección de artistas del inicio, cortada por el borde derecho de la ventana en la última S, con la I en cobalto.** Es la opción A de Clara (copy §2.3): rotula algo, se traduce sin dejar español colado y no nombra el concepto. La I es la cuarta letra en los dos idiomas, así que el color cae en el mismo lugar en ES y EN, y es el glifo más angosto: la menor cantidad de cobalto posible dentro del elemento más grande de la vista. **Respaldo:** María («una palabra enorme», «un color inesperado o desentonando»); Taradash (dos tamaños de texto y uno enorme, una sola vez por página).

**D3 · Palabra casi escondida: «Libro», enlace en mono de 12 px, gris, sin flecha, solo, en una fila vacía del inicio, que lleva a `#/encuentro/libro`.** Se esconde por tamaño y lugar, no por contraste (5,71:1, pasa AA). Es palabra de María (su boceto) y quien la encuentra, encuentra algo (copy §2.4, opción A).

**D4 · Índice de Artistas: grilla de 3 por fila; cada artista, una obra suya parada sobre una línea de 1 px y el nombre debajo. Se descarta el zigzag de la v1. Sin selector 3·6·9.** Tres artistas del mismo ancho porque tienen el mismo peso curatorial y María es una de ellas; la variación la ponen las proporciones distintas paradas sobre la línea. El selector (C22) inventaría seis artistas más de relleno, y la grilla ya muestra cómo crece: cada tres, una fila. **Respaldo:** Esther Schipper (3 por fila, línea, nombre debajo: la 3·6·9 literal); Kurimanzutto (obra, no cara).

**D5 · Muro de Obras: filas que suman 9 (6, 3) con un ciclo fijo de repartos (1.4).** Ni grilla uniforme (27 obras en `s3` no dejan ver la retícula de 9) ni escala real (C21: deja filas abiertas que se leen como una obra que falta, y las medidas del relleno son inventadas). **Respaldo:** PRODn (2+3, 3+2, cinco de 1, 3+2: la suma siempre cierra y el reparto cambia).

**D6 · Cobalto: tres apariciones en todo el sitio, en una lista cerrada, siempre como un trazo dentro de un elemento enorme. Nunca estado de interfaz.** Inicio: la I de ARTISTAS / ARTISTS. Encuentro: la «/» del contador. Encuentro activado: la «/» del contador. Las otras once vistas: cero. **Respaldo:** Kurimanzutto (un color saturado, un rol, y el ítem actual del menú se apaga a gris en vez de colorearse). Disponible, próximo encuentro o número de artista en cobalto (C27) lo volverían código de color y dejaría de desentonar. **Riesgo anotado:** `#1F3BD6` tiene un tono de unos 231°, cerca del índigo por defecto de los modelos; lo separan su oscuridad y esta escasez, por eso la lista es cerrada.

**D7 · Tipografía: sale Instrument Serif. Archivo + IBM Plex Mono, en cinco tamaños (1.2). Los H2 son rótulos en mono sobre una línea de 1 px (D20), no titulares.** En la v2 no hay ninguna cita publicable (la frase de María es de un correo privado, brief §5), así que la serif no tiene trabajo; sus 13 usos de la v1 eran la palabra en serif itálica de adorno (tell #4 de `anti-ai-slop.md`). María no vio la v1: no hay nada que «desver». **Respaldo:** Studio Iron (la serif solo para una cita en primera persona); Taradash (dos tamaños de texto, nada en medio).

**D8 · Menú en celular: plegable, que se abre en el flujo de la página y empuja el contenido, animado (1.7.i). Sin capa fija.** Una capa a pantalla completa (C26) sería el único `position: fixed` del sitio; en el flujo, la regla «nada fijo sobre una obra» (P1) queda sin excepciones. Presupuesto a 390: barra de aviso ≤ 64 px y cabecera ≤ 64 px, para que la lámina, su pie y los controles quepan en los 664 px visibles de Safari (2.1.3).

**D9 · Ficha: botones exactamente como la tabla del brief §4, y lo que está en negrita en esa tabla es el botón lleno. Dos imágenes (vista general y detalle) en una pista que se desliza, con miniaturas chicas como controles.** Estado 1: «Comprar con Mercado Pago» lleno + «Consultar por esta obra» contorno. Estado 2: «Consultar» lleno. Estados 3 y 4: «Consultar» contorno. Botones y no enlaces de texto (C37): el brief marca Comprar como principal y la jerarquía tiene que verse. Un solo botón lleno por ficha. **Respaldo:** Quatrième Étage (miniaturas a escala muy chica junto a la imagen grande, numeración mono fuera de la imagen); PRODn (imagen plana a su alto).

**D10 · Avisos de maqueta: visibles donde el brief los pide, sin botón «Notas».** Mono de 12 px, gris, el prefijo «Maqueta ·» / «Mock-up ·» va en el texto (copy §7). Sin franja lateral (el `border-left` de C12 es el tell #6).

**D11 · Aviso global:** el texto completo de Clara en todos los anchos (dos líneas a 390), en una barra que no es fija y se va al bajar. Las herramientas (Lo editas tú, Retícula, ES, EN) se ven también a 390.

**D12 · Obras planas y relleno regenerado entero, con recetas de obra fotografiada (§3, M01).** La vara nueva no se cumple con el relleno de la v1: A son campos borrosos a la manera de Rothko (C33), B es una grilla de cuadros que se lee como código y C son marañas de líneas de 1 px; además 15 de las 27 tienen el borde a 1,00-1,04:1 del hueso y sin paspartú desaparecen. Las recetas de §3 dan pintura de borde duro con tela, collage de papeles con espesor y tinta con pincel seco, todas con bordes a distancia ≥ 20 del hueso. Probado (`hoja-proto-2.png`).

**D13 · Gris:** `#6B675F` pasa a `#5E5A53` (lo permite el brief §7). El gris viejo daba 4,24:1 sobre hueso-2; el nuevo da 5,71:1 sobre hueso y 5,16:1 sobre hueso-2.

**D14 · Retícula:** líneas finas grafito y hueso, columnas numeradas, sin relleno de color y sin cobalto (8.3).

**D15 · «Lo editas tú»:** contorno discontinuo grafito y etiqueta grafito con texto hueso, insertada en el flujo antes de la pieza, nunca encima de una obra; sin cobalto (8.2).

**D16 · Ediciones con tapas e interiores de relleno generados (§3, M03), no marcadores ni tapas de CSS.** Cuadernos de tapa lisa con un rótulo en mono y un libro con una lámina en la tapa; interiores como dobles páginas abiertas con su pliegue. Reemplaza la tapa de CSS de la v1 (fake, tell #9) y el marcador gris de la spec parcial (prohibido por la vara: «ninguna posición de imagen vacía o gris»).

**D17 · Marca de muestra del texto de relleno: el texto se lee en grafito, como terminado, y al final de cada bloque lleva la palabra «muestra» / «sample» en mono de 12 px, gris, levantada como una llamada de nota (8.1).** Discreta (un rótulo chico por bloque, en la familia de los datos), consistente (siempre la misma, siempre al final) y medible (una por cada `.pendiente`). Texto gris o en itálica diría «borrador» y rompería la vara; un recuadro por párrafo sería ruido.

**D18 · Movimiento: un sistema corto, con los tiempos de las referencias, que acompaña sin decorar (1.7).** Tres duraciones (150, 300 y 400 ms) y dos curvas, leídas del CSS publicado: PRODn hace aparecer sus imágenes con `opacity .2s ease-out`, sus láminas con `opacity .3s` y sus controles en `.4s`; Escat, `.3s ease`; Quatrième usa `cubic-bezier(.4,0,.2,1)`; Studio Iron, 100 a 200 ms en colores. Se mueve lo que el visitante toca y lo que llega (imágenes, vistas). **No** se anima nada al bajar (las animaciones de aparición de Schipper dejan bloques en blanco en sus propias capturas) y nada se repite solo.

**D19 · Libro: las 369 posiciones como un mapa de 41 × 9 en todos los anchos, y debajo la galería de los encuentros activados con su foto.** 369 = 9 × 41: el mapa tiene siempre 9 filas (a 1440, casillas de unos 30 px con su número; a 390, casillas de unos 8 px sin número, una franja de 77 px de alto que se lee entera). La galería (fotos de registro, regla de filas) es el contenido que pide el mapa de María («galería de encuentros activados: foto, número, fecha, lugar aprox.») y es donde están los enlaces. Reemplaza el 9 × 41 de la spec parcial, que a 390 medía unos 1.640 px de casillas vacías.

**D20 · Fila de sección: una línea de 1 px grafito a todo el ancho del contenido, el rótulo (H2) en mono de 12 px mayúscula grafito en `c1-3` y el contenido desde `c4`.** Es el dispositivo que ordena todas las vistas de texto y da el acabado editorial. **Respaldo:** Esther Schipper (sus secciones abren con una línea de 1 px a todo el ancho y una etiqueta de 13 px); Taradash (texto en columnas angostas que ocupan celdas de la retícula).

**D21 · Foto opcional de artista: solo la tiene Artista A (foto cenital de su mesa de taller, generada, §3 M05).** Así la maqueta muestra los dos casos de «foto opcional» sin una caja vacía: A con foto, B y C sin el espacio.

---

## 1 · Tokens (cada uno con su rol; un valor sin rol no es un token)

### 1.1 · Color (los seis de la v1; ninguno nuevo)

| # | Token | Valor | Rol exacto | Dónde NO se usa |
|---|---|---|---|---|
| 1.1.1 | `--hueso` | `#EEEAE2` | El único lienzo: `html`, `body`, barra de aviso, cabecera, menú abierto, fondo del botón contorno, texto del botón lleno, chip de los números de la retícula; `<meta name="theme-color">` | Nunca alrededor de una obra como caja. No hay segunda superficie de sección |
| 1.1.2 | `--hueso-2` | `#E4DFD4` | Solo el fondo de un `<img>` mientras carga (estado transitorio de 1.7.a, en `img` cuya caja coincide con la imagen pintada) | Paspartú, tarjeta, sección, campo, botón, hover, lámina, casilla del Libro, marcador de imagen faltante (no hay marcadores) |
| 1.1.3 | `--grafito` | `#1B1B19` | Texto principal y texto de muestra; líneas de estructura de 1 px (fila de sección, borde superior del Índice, de los filtros y del pie, línea de artista); fondo del botón lleno; foco (contorno 2 px); casilla activa del Libro; contorno y etiqueta de «Lo editas tú»; líneas de la retícula; fondo de `::selection` | Fondo de sección o de bloque grande |
| 1.1.4 | `--gris` | `#5E5A53` (antes `#6B675F`, D13) | Texto secundario: marca «muestra», avisos de maqueta, estados Vendida y Colección privada, ítem del menú de la página actual, herramientas no presionadas, «/369» del contador del inicio y «369» de los otros contadores, «Libro» escondida, números del indicador no activos, números de casillas vacías, descriptor del pie, botones deshabilitados | Cuerpo de texto principal (incluido el texto de muestra); bordes de campo; sobre fondo grafito |
| 1.1.5 | `--linea` | `#D3CCBE` | Separadores de 1 px dentro de una lista: filas del Índice, del menú abierto y de las preguntas frecuentes, borde de las casillas vacías del Libro, borde inferior de la barra de aviso, borde superior de la navegación de la ficha | Texto (1,33:1); borde de campo; contorno de botón |
| 1.1.6 | `--cobalto` | `#1F3BD6` | Lista cerrada (D6): la I de ARTISTAS / ARTISTS; la «/» del contador en Encuentro; la «/» del contador en cada encuentro activado | Todo lo demás: foco, hover, página actual, enlaces, botones, bordes, fondos, estados, retícula, «Lo editas tú», marca de muestra y **cualquier imagen de relleno** (M01 a M05) |

1.1.7 · Contrastes medidos (WCAG): grafito/hueso 14,38:1 · gris/hueso 5,71:1 · gris/hueso-2 5,16:1 · grafito/hueso-2 12,98:1 · hueso/grafito 14,38:1 · cobalto/hueso 6,59:1. Ningún texto usa `--linea`.
1.1.8 · No existe blanco en la interfaz: ningún `#fff`, `white` ni `rgb(255,255,255)` en CSS ni en estilos en línea. El papel claro de algunas imágenes de relleno (tinta de C, interiores) es contenido, no interfaz, y está a distancia ≥ 20 del hueso para que su borde se lea (M9).
1.1.9 · `::selection { background: var(--grafito); color: var(--hueso) }`; `-webkit-tap-highlight-color: transparent` en enlaces y botones, porque el estado activo de §4 lo reemplaza; `<meta name="theme-color" content="#EEEAE2">`, para que Safari tiña su barra con el hueso.

### 1.2 · Tipografía

Familias: **Archivo** (variable: `wdth` 100 a 125, `wght` 400 a 800) e **IBM Plex Mono** (400 y 500), de Google Fonts con `display=swap`. Enlace único: `family=Archivo:wdth,wght@100..125,400..800&family=IBM+Plex+Mono:wght@400;500&display=swap`, con `preconnect` a los dos dominios. **Instrument Serif sale** (D7). Pilas: `"Archivo", "Helvetica Neue", Arial, sans-serif` y `"IBM Plex Mono", ui-monospace, Menlo, monospace`.

| # | Token | Familia / peso / ancho / tamaño a 1440 · a 390 / interlineado / tracking | Se usa en | No se usa en |
|---|---|---|---|---|
| 1.2.1 | `--t-enorme` | Archivo 800, `font-stretch: 125%`, **17vw en ES, 19,5vw en EN** (≈ 245 y 281 px a 1440; ≈ 66 y 76 px a 390), interlineado 0,78, tracking −0,045em, mayúsculas | Solo la palabra enorme del inicio (D2) | Cualquier otro texto |
| 1.2.2 | `--t-contador` | Plex Mono 400, **200 px (≥ 1001) · 140 px (621-1000) · 72 px (≤ 620)**, interlineado 0,85, tracking −0,06em, `font-variant-numeric: tabular-nums` | Los contadores de Encuentro: bloque del inicio, Encuentro, encuentro activado | Conteos de filtros, indicador del carrusel, Libro |
| 1.2.3 | `--t-titulo` | Archivo 500, ancho 100%, **36 px (≥ 621) · 26 px (≤ 620)**, interlineado 1,08 (1,1 a 390), tracking −0,02em, `text-wrap: balance` | H1 de cada vista; título de la obra en la ficha; filas del Índice; ítems del menú abierto a 390; las tres palabras de Acerca | Botones, rótulos, cuerpo, pies |
| 1.2.4 | `--t-texto` | Archivo 400, ancho 100%, **16 px en todos los anchos**, interlineado 1,5 (1,3 en pies de obra y leyendas); 500 en botones, nombre de artista del pie, H3 y resúmenes de preguntas; 600 en la palabra «Módulo» de la marca | Cuerpo, texto de muestra, pies, campos de formulario y `select`, botones, menú a 1440 y 768, marca | Rótulos y datos en mono |
| 1.2.5 | `--t-chico` | Plex Mono 500, **12 px en todos los anchos**, interlineado 1,4, tracking 0,04em; en `.etiqueta` además mayúsculas y tracking 0,08em | Rótulos (H2 de fila de sección, labels, `dt`, «MAQUETA», «ENCUENTRO»), estados de obra, marca «muestra», avisos de maqueta, herramientas, indicador del carrusel, conteos, números de casillas, «Libro» escondida, enlace vertical | Párrafos de más de una frase (salvo los avisos) |

1.2.6 · **Por qué estos valores.** Texto de 16 px en todos los anchos: es el mínimo que evita el zoom de Safari al tocar un campo (C02), y así cuerpo y campos son el mismo tamaño. Título de 36 px (26 a 390): por encima del nombre de 22 px de Kurimanzutto y por debajo de los 39 a 43 px de Taradash; el H1 rotula, no anuncia, y la escala dramática queda para la palabra enorme y el contador. Chico de 12 px y no 10 u 11 (Quatrième usa 10): a 390 la v1 tenía 125 textos de 11 px (C39).
1.2.7 · **Escala completa, sin intermedios:** 12 · 16 · 36 (26) · contador · enorme. Cualquier otro `font-size` en `styles.css` o en `app.js` es un defecto. Sin `clamp()` en tipografía: los valores cambian solo en los cortes de §5 (excepción: `--t-enorme`, proporcional al ancho por diseño, 1.2.9).
1.2.8 · **Detalle tipográfico de producción:** mayúsculas solo en `.etiqueta` y en la palabra enorme, siempre con tracking; sin `font-style: italic` en ningún lado y `font-synthesis: none` (sin itálica ni negrita sintética); `text-wrap: balance` en H1, pies de obra y leyendas; `text-wrap: pretty` en párrafos; `hyphens: manual`; `font-kerning: normal`; números de datos (años, medidas, conteos, contadores, indicador) en Plex Mono con `tabular-nums`; **ancho de párrafo máximo: 3 columnas a ≥ 621** (440 px a 1440, unos 55 caracteres; Taradash), el ancho de `c1-3` a 390.
1.2.9 · **Palabra enorme, medida:** con esos valores la palabra se corta entre el 40% y el 56% de la última S a 375, 390, 768 y 1440 (ES: 609,5 px de ancho por cada 100 px de cuerpo, «ARTISTA» 527,2; EN: 534,5 y «ARTIST» 452,2). La tinta de la primera A empieza 0,015em a la derecha del origen: `margin-left: -0.015em` la deja sobre el borde izquierdo de `c1`. **Criterio:** con la Retícula encendida, la tinta de la A empieza a ≤ 4 px del borde izquierdo de `c1` y el borde derecho de la ventana corta la última S.
1.2.10 · **Contador, medido:** «007/369» mide 3,78em: 756 px a 1440 (termina en x ≈ 798, antes de `c6`, que empieza en 805), 529 px a 768, 272 px a 390.

### 1.3 · Espaciado (un módulo de 6, el de 3·6·9)

| # | Token | Valor | Rol |
|---|---|---|---|
| 1.3.1 | `--e-1` | 6 px | Etiqueta → valor; label → campo; padding vertical de la barra de aviso |
| 1.3.2 | `--e-2` | 12 px | Imagen → su pie (PRODn: 10 px); calle a ≤ 1000; entre botones; entre párrafos; línea de fila de sección → su rótulo |
| 1.3.3 | `--e-3` | 18 px | Calle a ≥ 1001; entre campos de un formulario |
| 1.3.4 | `--e-4` | 24 px | Rótulo → contenido cuando se apilan (≤ 620); padding vertical de la cabecera a ≥ 621 |
| 1.3.5 | `--e-6` | 36 px | Entre bloques de una misma sección; vacío arriba a ≤ 620 |
| 1.3.6 | `--e-9` | 54 px | Entre filas de obra a ≤ 1000; vacío arriba a 621-1000; entre filas de sección a ≤ 620 |
| 1.3.7 | `--e-16` | 96 px | Entre filas de obra a ≥ 1001 (PRODn: ~92 px = 4,6 calles); entre filas de sección a ≥ 621; entre secciones del inicio a ≤ 1000; vacío arriba a ≥ 1001 |
| 1.3.8 | `--e-24` | 144 px | Entre secciones del inicio a ≥ 1001 |

1.3.9 · **Retícula:** `--margen` 42 px (≥ 1001) · 30 px (621-1000) · 18 px (≤ 620); `--calle` 18 · 12 · 12 px; columnas 9 · 6 · 3. Anchos de columna: 134,7 px a 1440, 85,9 px a 1001, 108 px a 768, 110 px a 390, 105 px a 375. Anchos útiles a 1440: `c1-3` 440 · `c1-4` 611 · `c1-5` 745 · `c1-6` 898 · `c1-9` 1.356. (PRODn: margen 40, calle 20; se redondea al módulo de 6.)
1.3.10 · **Vacío arriba** (de la cabecera al primer bloque, en todas las vistas menos Inicio): `--e-16` · `--e-9` · `--e-6`. En Inicio la pista empieza a `--e-2` de la cabecera.
1.3.11 · Todo espaciado en `styles.css` y en `style=""` de `app.js` sale de estos tokens o de `--margen`/`--calle`. Los `row-gap` en línea de la v1 (11 valores) se reemplazan por clases o por `var(--e-*)`.

### 1.4 · La regla de filas (el rasgo de la dominante)

1.4.1 · Toda lista de imágenes de contenido (Muro, obras de Artista, obras de Tienda, galería del Libro) se pinta en filas cuya suma de columnas es exactamente el número de columnas del ancho, tomando los repartos de este ciclo en orden y volviendo a empezar:

| Ancho | Ciclo | Última fila con k imágenes sueltas |
|---|---|---|
| 9 col (≥ 1001) | `[4,5]` → `[2,4,3]` → `[2,2,2,3]` | k=1: `[5]` y el resto vacío (única fila abierta permitida, al final) · k=2: `[4,5]` · k=3: `[2,4,3]` |
| 6 col (621-1000) | `[3,3]` → `[2,4]` → `[2,2,2]` → `[4,2]` | k=1: `[3]` · k=2: `[3,3]` · k=3: `[2,2,2]` |
| 3 col (≤ 620) | `[3]` → `[1,2]` → `[3]` → `[2,1]` → `[1,1,1]` | k=1: `[3]` · k=2: `[1,2]` · k=3: `[1,1,1]` |

1.4.2 · **Cómo se arma cada fila** (determinista, para que Javiera lo pueda recalcular). Sea k el número de imágenes que quedan y p el próximo reparto del ciclo. (A) Si k ≤ 3, la fila es la de cierre de k y la lista termina. (B) Si no, y tomar p dejaría exactamente 1 suelta, se salta p y se prueba el siguiente. (C) Si no, la fila es p. Verificado con listas de 1 a 27: toda fila suma las columnas salvo la de una sola imagen.

```js
var CICLO = { 9: [[4,5],[2,4,3],[2,2,2,3]], 6: [[3,3],[2,4],[2,2,2],[4,2]], 3: [[3],[1,2],[3],[2,1],[1,1,1]] };
var CIERRE = { 9: {1:[5],2:[4,5],3:[2,4,3]}, 6: {1:[3],2:[3,3],3:[2,2,2]}, 3: {1:[3],2:[1,2],3:[1,1,1]} };
function filas(n, cols) {           // n imágenes -> lista de repartos
  var c = CICLO[cols], i = 0, k = n, out = [];
  while (k > 0) {
    if (k <= 3) { out.push(CIERRE[cols][k]); break; }
    var p; for (var t = 0; t < c.length; t++) { p = c[i++ % c.length]; if (k - p.length !== 1) break; }
    out.push(p); k -= p.length;
  }
  return out;
}
```
1.4.3 · **Resultados esperados** (sirven de prueba): 27 obras a 1440 = 9 filas, `[4,5]` `[2,4,3]` `[2,2,2,3]` tres veces. Las 8 obras de Artista: `[4,5]` `[2,4,3]` `[2,4,3]` (9) · `[3,3]` `[2,4]` `[4,2]` `[3,3]` (6) · `[3]` `[1,2]` `[3]` `[2,1]` `[1,2]` (3). Las 3 de Tienda: `[2,4,3]` · `[2,2,2]` · `[1,1,1]`. Los 7 registros del Libro: `[4,5]` `[2,4,3]` `[4,5]` (9) · `[3,3]` `[2,4]` `[2,2,2]` (6) · `[3]` `[1,2]` `[3]` `[1,1,1]` (3). (Recalculados con el código de 1.4.2 el 5-oct.) Con filtros, el ciclo arranca de nuevo con la lista filtrada; una sola obra filtrada va en `[5]` (9 col).
1.4.4 · Dentro de la fila, cada imagen ocupa el ancho de sus columnas a su proporción natural, **alineada arriba** (`align-items: start`), con `max-height: 80svh`; si topa ese alto, queda más angosta que su celda y alineada a la izquierda, y su pie se alinea con ella. Nunca `object-fit: cover` en una obra.
1.4.5 · La «obra corrida» de la v1 (`translateY`) desaparece: el desplazamiento sale del reparto y de las alturas distintas, y nada se monta sobre nada (C01).
1.4.6 · Separación entre filas: `--e-16` a ≥ 1001, `--e-9` a ≤ 1000.
1.4.7 · El reparto se recalcula al cruzar un corte de §5 (con `matchMedia`, no en cada `resize`), sin animación.

### 1.5 · Radios

1.5.1 · `border-radius: 0` en todo, sin excepción: imágenes, botones, campos (`-webkit-appearance: none` para que iOS no los redondee), casillas, etiquetas. Los puntos de estado de la v1 (círculos) se eliminan: el estado es texto. **Respaldo:** PRODn y Kurimanzutto, esquinas rectas en todo.

### 1.6 · Profundidad

1.6.1 · **Obras planas** (C06): sin paspartú, marco, caja, sombra ni fondo visible. Cero `box-shadow`, `drop-shadow`, `filter`, `backdrop-filter` y `mix-blend-mode` en la interfaz. La jerarquía la dan la escala, la posición en la retícula y las líneas de 1 px. Las sombras que se ven **dentro** de una imagen de relleno (el espesor de un papel en un collage, la caja sobre la mesa) son parte de la foto, no de la interfaz.
1.6.2 · Líneas: grafito 1 px = empieza una estructura (fila de sección, filtros, Índice, pie del sitio, línea de artista). `--linea` 1 px = separa ítems dentro de una lista. No hay otros bordes, salvo el de los botones (1 px grafito) y el de los campos (1 px grafito abajo).
1.6.3 · Capas: solo `.reticula` tiene `z-index` (50). La imagen del hallazgo del Índice usa `position: absolute` dentro de su lista. Las capas de View Transitions existen solo durante 1.7.b. Nada más se superpone a nada.
1.6.4 · `transform` **solo en estados transitorios** del catálogo 1.7 (desplazamientos de 4 a 8 px que terminan en `none`). Ningún elemento **visible** en reposo tiene `transform` computado distinto de `none` (M7). Los elementos ocultos (ítems del menú cerrado, avisos al tocar todavía ocultos, contenido de un `<details>` cerrado) pueden tener su desplazamiento de partida.

### 1.7 · Movimiento (qué lo dispara)

**Tokens** (D18; respaldo entre paréntesis):

| Token | Valor | Para qué |
|---|---|---|
| `--m-1` | 150 ms | Colores, inversión de botones, salida de lo que se va (PRODn `border-color .15s`; Quatrième `.15s`; Studio Iron 100 a 200 ms) |
| `--m-2` | 300 ms | Apariciones: imágenes, avisos, contenido que entra (Escat `opacity .3s`; PRODn láminas `opacity .3s`) |
| `--m-3` | 400 ms | Cambios de tamaño o de lugar: menú, obra compartida (PRODn controles del carrusel `.4s`, grilla cargada `.4s ease-in-out`) |
| `--curva-salida` | `cubic-bezier(0, 0, .2, 1)` | Lo que aparece o llega (PRODn, imágenes `ease-out`) |
| `--curva-mov` | `cubic-bezier(.4, 0, .2, 1)` | Lo que cambia de tamaño o de lugar (Quatrième, curva por defecto) |

**Catálogo** (todo lo que se mueve; lo que no está acá, no se mueve):

| # | Qué | Disparador | Propiedad · duración · curva | Con `prefers-reduced-motion: reduce` |
|---|---|---|---|---|
| 1.7.a | Aparición de imagen | Termina de cargar un `img` que no estaba completo al pintar la vista | `opacity` 0 → 1 · `--m-2` · salida, sobre `--hueso-2` | Sin transición |
| 1.7.b | Cambio de vista | Navegación por hash (enlace, atrás, adelante) | View Transitions API: la vista vieja `opacity` → 0 en `--m-1`; la nueva 0 → 1 en `--m-2`, salida. Aviso, cabecera y pie con `view-transition-name` propio (no se animan). Sin la API: cambio instantáneo | Instantáneo |
| 1.7.c | Obra compartida (nivel 2) | Abrir una obra desde el muro, Artista, Tienda o el carrusel, y volver | `view-transition-name: obra` puesto al momento del clic solo en la imagen tocada (el nombre tiene que ser único en la página) y en la vista general de la ficha · `--m-3` · mov | Instantáneo |
| 1.7.d | Carrusel | Dedo (scroll nativo con `scroll-snap`), botones, flechas del teclado, números del indicador | Botones: `scrollTo({behavior:'smooth'})` nativo. Indicador: la raya del activo crece `width` 0 → 24 px en `--m-2` salida; la anterior se encoge en `--m-1` | `behavior: 'auto'`; raya sin transición |
| 1.7.e | Pista general / detalle de la ficha | Igual que 1.7.d | Igual; la línea bajo el rótulo de la miniatura activa aparece en `--m-1` | Igual que 1.7.d |
| 1.7.f | Subrayado | Puntero sobre enlace de texto o título de tarjeta (`hover:hover`), o foco | Línea de 1 px que se dibuja de izquierda a derecha (`background-size` 0 → 100%) · `--m-2` · salida | Aparece sin transición |
| 1.7.g | Flecha | Puntero sobre «Ver todo →», «Siguiente →», «← Anterior», botones con flecha | `transform: translateX(4px)` (o −4 px) en la flecha sola · `--m-1` · mov | No se mueve |
| 1.7.h | Botón | Puntero, toque (`:active`) | Fondo y texto se invierten · `--m-1` · mov | Igual (es color, no movimiento) |
| 1.7.i | Menú a 390 | Botón «Menú» / «Cerrar» | Abre: `grid-template-rows` 0fr → 1fr en `--m-3` mov; cada ítem `opacity` 0 → 1 y `translateY` 8 px → 0 en `--m-2` salida, escalonados 40 ms. Cierra: `--m-2`, sin escalonado | Abre y cierra sin animación |
| 1.7.j | Hallazgo del Índice | Puntero o foco sobre una fila (`hover:hover`); la fila cruza la línea media de la pantalla (sin `hover`) | Entra `opacity` 0 → 1 en `--m-2` salida; la anterior sale en `--m-1` | Sin transición |
| 1.7.k | Aviso al tocar (`role="status"`) | Comprar, Comprar la caja, Amazon, enlace del otro idioma, Enviar, Suscribirme | `opacity` 0 → 1 y `translateY` 4 px → 0 · `--m-2` · salida | Sin transición |
| 1.7.l | Muro al filtrar o cambiar de vista | Cambio de un `select` o de Muro / Índice | Sale `opacity` → 0 en `--m-1`, se repinta, entra en `--m-2` salida | Instantáneo |
| 1.7.m | `<details>` (preguntas frecuentes, «Filtrar» a 390) | Abrir | El contenido entra `opacity` 0 → 1 y `translateY` 4 px → 0 en `--m-2` salida; el signo pasa de «+» a «−» (texto, sin rotación) | Sin transición |
| 1.7.n | Capas de maqueta | Botones «Lo editas tú» y «Retícula» | «Lo editas tú»: contornos y etiquetas `opacity` en `--m-2`; Retícula: `opacity` en `--m-1`, lineal | Sin transición |
| 1.7.o | Contador de Encuentro (nivel 2) | El contador entra en pantalla por primera vez en la sesión | Cuenta 000 → 007 en pasos de 70 ms (490 ms), sin curva: es mecánico. El DOM y el `aria-label` dicen 007 desde el principio; la cuenta es solo visual | Muestra 007 quieto |
| 1.7.p | Casilla activa del Libro (≥ 1001, puntero) | Puntero | Fondo y número se invierten · `--m-1` · mov | Igual |
| 1.7.q | Hover de obra en el muro (nivel 2) | Puntero sobre una obra a ≥ 1001 | La imagen cruza a su detalle (misma proporción, M02) en `--m-1`; al salir vuelve. **Respaldo:** Studio Iron, capa de imagen con `transition-opacity duration-150` sobre cada producto (clases de su HTML del 5-oct; no verificado en pantalla). En el iPhone el detalle está en la ficha (P17) | Sin cruce |

1.7.1 · **Reglas:** sin `transition: all` (cada transición nombra su propiedad); duraciones y curvas solo de estos tokens; propiedades animables solo `opacity`, `transform` (traslados de ≤ 8 px), `background-size`, `background-color`, `color`, `border-color`, `width` (raya del indicador) y `grid-template-rows` (menú); el foco aparece sin transición; nada se anima al cargar la página salvo 1.7.a; nada se anima al bajar; nada se repite; sin `scroll-behavior: smooth` global (el cambio de vista vuelve arriba al instante dentro de 1.7.b).
1.7.2 · `@media (prefers-reduced-motion: reduce) { *, ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { transition-duration: 0s !important; animation-duration: 0s !important } }` y el JS no llama a `startViewTransition` ni usa `behavior: 'smooth'`.

---

## 2 · Composición por vista

Notación: `c4-6` = de la columna 4 a la 6. Las columnas de cada tabla son 9 col (1440) · 6 col (768) · 3 col (390). **390 es el ancho principal.** «Ojo primero» es lo que manda la mirada; «Disrupción» nombra cuál de las de María sostiene la vista (brief §7: Inicio, Artista, Ficha y Encuentro llevan al menos una); «Terminado» es lo que Javiera mira para T8. Los textos son de `copy-secciones.md` (fijos) y `copy-muestra.md` (muestra, siempre con la marca de 8.1).

### 2.0 · Piezas globales

**2.0.1 · Barra de aviso** (no fija; se va al bajar). Fondo hueso, borde inferior 1 px `--linea`, padding vertical `--e-1`. 1440: una línea; «MAQUETA» (etiqueta grafito) + texto de Clara en chico gris a la izquierda; a la derecha las herramientas Lo editas tú · Retícula · ES · EN, en chico. 390: línea 1, «MAQUETA» a la izquierda y las cuatro herramientas a la derecha (≈ 290 px de 354); líneas 2 y 3, el texto completo. **Alto ≤ 64 px a 390.** Las herramientas tienen 44 px de área táctil con margen negativo, para no agrandar la línea.

**2.0.2 · Cabecera anclada a la retícula** (Quatrième; no fija). Padding vertical `--e-4` (≥ 621) · `--e-2` (≤ 620). 1440: marca en `c1-2`; los siete enlaces del menú, **uno por columna, de la 3 a la 9**, cada uno desde el borde izquierdo de su columna (medido: «Encuentro», 75 px, cabe en la columna de 85,9 px a 1001). 768: marca `c1-2`; menú en `c3-6` en dos filas (4 + 3), cada enlace anclado a una columna. 390: marca `c1-2`; botón «Menú» alineado a la derecha de `c3`, 44 × 44 px; **alto ≤ 64 px**.

**2.0.3 · Menú abierto a 390** (D8): en el flujo, bajo la cabecera; borde superior 1 px grafito; siete filas en `--t-titulo` (26 px), alto mínimo 52 px, separadas por 1 px `--linea`; la página actual en gris; el botón dice «Cerrar». Movimiento 1.7.i. Se cierra con el mismo botón, con Escape y al navegar; el foco queda en el botón.

**2.0.4 · Marca:** «Módulo» en Archivo 600 de 16 px + «369» en Plex Mono 500 de 16 px, separados por `--e-1`. Mismo tamaño: el contraste es de familia, no de escala. No es un logo (brief §8-6).

**2.0.5 · Menú:** texto grafito 16 px; el ítem de la página actual va en **gris** con `aria-current="page"` (se apaga, Kurimanzutto); hover con puntero: subrayado 1.7.f.

**2.0.6 · Fila de sección** (D20): borde superior 1 px grafito de `c1` a la última columna; a `--e-2` debajo, el H2 como `.etiqueta` **grafito** en `c1-3`; el contenido empieza en `c4`, alineado arriba con el rótulo. Variante de imágenes: el rótulo va solo en su línea y la fila de imágenes empieza en `c1` a `--e-6`. A ≤ 620: el rótulo arriba y el contenido debajo a `--e-4`. Entre filas de sección: `--e-16` (≥ 621) · `--e-9` (≤ 620).

**2.0.7 · Pie de obra** (bajo la imagen a `--e-2`, alineado a su borde izquierdo; toda la tarjeta es un enlace): línea 1, artista (texto 500; se omite en la página de la artista); línea 2, «Campo 04, 2025» (texto 400, interlineado 1,3, `text-wrap: balance`; en celdas de 1 columna a 390 puede ir en dos líneas); línea 3, estado en `.etiqueta`: Disponible en grafito, Vendida y Colección privada en gris.

**2.0.8 · Pie del sitio:** borde superior 1 px grafito; padding `--e-6` arriba y `--e-9` abajo; separado del contenido por `--e-16` (≥ 1001) · `--e-9`. 1440: `c1-3` «Módulo 369» y debajo el descriptor en gris; `c4-5` Artistas, Obras, Ediciones, Encuentro; `c6-7` Acerca de, Tienda, Contacto; «modulo369.com» en chico gris alineado a la derecha de `c9`. 390: nombre y descriptor en `c1-3`; enlaces en dos columnas (`c1` y `c2-3`); dominio abajo. Cada enlace con 44 px de alto táctil.

### 2.1 · Inicio `/`

**Ojo primero:** la obra de la lámina 1, pegada al borde derecho, contra el vacío hueso de su izquierda. **Disrupción:** imagen desplazada (la obra corrida a un borde de la lámina) · palabra enorme (ARTISTAS cortada) · color que desentona (la I en cobalto) · palabra casi escondida («Libro»). Dos gestos se ven, uno se encuentra.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Módulo 369» | solo lectores de pantalla (copy §2.2, A) | igual | igual |
| Pista del carrusel | `c1-9`, a `--e-2` de la cabecera | `c1-6` | `c1-3` |
| Alto del área de obra de cada lámina | `clamp(420px, calc(100svh - 202px), 880px)` | `min(calc(100svh - 220px), 100vw)` | `min(calc(100svh - 232px), 125vw)` |
| Obra en la lámina | entera, a su proporción, **alineada abajo**, borde según 2.1.1 | igual | igual (a 390 casi todas llenan el ancho) |
| Pie de la lámina, enlace a la ficha: «Artista A · Campo 04, 2025» | bajo la obra a `--e-2`, desde su borde izquierdo | igual | igual |
| Controles: «← Anterior» · indicador 01 a 05 · «Siguiente →» | una línea en `c6-9`, alineada a la derecha, a `--e-2` bajo el pie | `c4-6` | `c1-3`, repartidos a lo ancho |
| ARTISTAS (H2 con estilo `--t-enorme`) | desde el borde izquierdo de `c1` hasta el borde derecho de la **ventana**, cortada | igual | igual |
| «Ver todo →» | bajo la palabra, a la derecha de `c9` | `c6` | `c3` |
| Tres obras, una por artista, paradas sobre una línea grafito de 1 px; nombre debajo de la línea | `[3,3,3]`, alineadas **abajo** | `[2,2,2]` | `[1,1,1]` (obras chicas bajo una palabra enorme: cambio de escala) |
| «Libro» (casi escondida) | sola en `c8`, en una fila de 48 px entre artistas y Encuentro | `c5` | `c3`, a la derecha |
| Encuentro (fila de sección): «ENCUENTRO», contador 007/369, «activados · de muestra», botón contorno «Qué es Encuentro →» | contador `c1-5`; botón en `c7-9` alineado a la base del contador | contador `c1-5`; botón debajo en `c1-3` | contador `c1-3`; botón debajo, a lo ancho |
| Ediciones (fila de sección): «EDICIONES» + «Ver todo →» y tres tapas 5:7 | rótulo y enlace en `c1-3`, alineados abajo; tapas en `c4-5`, `c6-7`, `c8-9` (la fila suma 9) | rótulo arriba; tapas `[2,2,2]` | rótulo arriba; tapas `[1,1,1]` |

2.1.1 · **Láminas** (la obra se pinta entera; la caja del `img` es la imagen pintada, sin franjas):

| Lámina | Obra | Proporción | Posición en la lámina |
|---|---|---|---|
| 1 | c-04 (tinta sobre papel negro) | 5:4 | derecha |
| 2 | a-07 | 2:3 | izquierda |
| 3 | b-05 | 5:4 | derecha |
| 4 | a-02 | 4:5 | izquierda |
| 5 | c-02 | 1:1 | centro |

2.1.2 · **Indicador (Schipper):** cinco botones «01» a «05» en chico, separados por `--e-2`; el activo en grafito con una raya horizontal de 24 × 1 px grafito a su izquierda (1.7.d); los demás en gris; `aria-label` «1 de 5»; cada uno con 44 × 44 px de área. «← Anterior» y «Siguiente →» como texto visible con sus `aria-label` (copy §5-1); deshabilitados en los extremos (gris, `aria-disabled="true"`, sin hover). Cabe en una línea a 390 (≈ 300 px de 354).
2.1.3 · **Pliegue:** a 390 × 664 (Safari con barras), el borde inferior de los controles queda ≤ 664 px; a 1440 × 900, obra, pie y controles visibles enteros sin bajar.
2.1.4 · Obras del bloque de artistas: a-05 (3:4), b-02 (4:5), c-05 (2:3): alturas distintas sobre la línea, ninguna repetida del carrusel.
2.1.5 · Contador del inicio: «007» grafito, «/369» gris. Sin cobalto: el cobalto del inicio es la I (D6).
2.1.6 · Entre secciones: `--e-24` (≥ 1001) · `--e-16` (≤ 1000).
2.1.7 · **Terminado:** a 1440 × 900, el primer viewport es aviso, cabecera anclada, la obra 1 nítida contra el borde derecho, su pie y los controles; al deslizar, el pie viaja con su obra y la raya del indicador crece bajo el número nuevo. Al bajar, ARTISTAS cortada con su I cobalto, tres obras chicas sobre la línea, «Libro» sola, el contador enorme, tres tapas. A 390, lo mismo con la obra llenando el ancho y los controles a la vista.

### 2.2 · Artistas `/artistas/`

**Ojo primero:** las tres obras paradas sobre la línea, de alturas distintas. **Disrupción:** no exigida; la vista es orden (Schipper).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Artistas» | `c1-3` | `c1-3` | `c1-3` |
| Visión curatorial (muestra) | `c4-6`, en la fila del H1, alineada arriba | `c4-6` | `c1-3`, bajo el H1 a `--e-4` |
| Tres artistas: obra (alto máximo 60svh) parada sobre línea grafito de 1 px; a `--e-2` debajo, nombre (texto 500, enlace) a la izquierda y «01 / 03» (chico gris) a la derecha de la misma celda | `[3,3,3]`, obras alineadas **abajo**, a `--e-16` del H1 | `[2,2,2]` | una por fila: obra en `c1-2` y nombre + número en `c3`, alineados abajo; la fila siguiente invertida (obra `c2-3`, nombre `c1`); la línea cruza las 3 columnas; filas separadas por `--e-9` |

2.2.1 · Obras que representan a cada artista: a-07 (2:3), b-07 (4:5), c-07 (1:1). Sin recorte; nunca retrato.
2.2.2 · Toda la celda es enlace; con puntero, el nombre se subraya (1.7.f) y la obra no cambia.
2.2.3 · **Terminado:** tres obras de proporciones distintas paradas sobre una misma línea, con aire arriba; a 390, un zigzag de obra y nombre que se lee como índice de galería, no como lista.

### 2.3 · Artista `/artistas/<a>/`

**Ojo primero:** la obra a todo el ancho; después, por contraste, el nombre chico. **Disrupción:** cambio de escala: nombre de 36 px (26 a 390) contra una obra de 1.356 px de ancho; a 390 esa obra sale de la retícula a sangre (la única imagen del sitio que deja el margen). **Respaldo:** Kurimanzutto (nombre de 22 px y obra al ancho completo); Studio Iron (secuencia: grilla de obras, texto angosto, una imagen sola).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Artistas» (chico) | `c1` | `c1` | `c1` |
| H1 nombre | `c1-3` | `c1-3` | `c1-3` |
| Statement (muestra, sin rótulo) | `c5-8`, en la fila del H1 | `c4-6` | `c1-3`, bajo el H1 |
| Obra a todo el ancho (la 3:2 de cada artista: a-01, b-09, c-08) | `c1-9` (1.356 × 904), a `--e-6` del statement, sin tope de alto, `eager` | `c1-6` | **a sangre**: 100% de la ventana, margen negativo a cada lado |
| Su pie | bajo la obra, desde `c1` | igual | desde el margen (18 px), no desde el borde de la ventana |
| Fila de sección «Obras» + las otras 8 obras, regla de filas, pie sin nombre de artista | 1.4.3 | 1.4.3 | 1.4.3 |
| Fila de sección «Biografía» + texto (muestra) | texto `c4-6` | texto `c4-6` | apilado |
| Foto opcional (solo Artista A, D21): mesa de taller 4:5 con su pie «Taller · Artista A» y marca de muestra, más el aviso de maqueta de 12-3 | `c7-9` de la fila Biografía, alineada arriba con el texto (la fila crece al alto de la foto) | `c1-3`, debajo de Biografía | `c1-2`, debajo de Biografía |
| Fila de sección «Historia y proceso» + texto (muestra) | texto `c4-6` | texto `c4-6` | apilado |
| En B y C, en lugar de la foto: el aviso de maqueta de 12-3 | `c7-9` de la fila Biografía | debajo | debajo |
| «Artista B →» | a la derecha de `c9` | `c6` | `c3` |

2.3.1 · **Terminado:** la página se recorre como la de un autor en Studio Iron: nombre, una obra que llena la pantalla, la grilla de obras con su ritmo, texto en columna angosta con la foto de taller al costado (A). Nada de corchetes, ningún hueco.

### 2.4 · Obras `/obras/`

**Ojo primero:** la primera fila `[4,5]`. **Disrupción:** no exigida; el reparto que cambia fila a fila es el cambio de escala de la vista.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Obras» | `c1-3` | `c1-3` | `c1-2` |
| Conteo «27 obras» (`aria-live="polite"`) + «Quitar filtros» (solo con alguno activo) | `c7-9`, a la derecha, en la línea base del H1 | `c4-6` | `c3`, a la derecha |
| Fila de filtros, borde superior 1 px grafito, a `--e-6` del H1 | Artista `c1-2` · Técnica `c3-4` · Tamaño `c5-6` · Disponibilidad `c7-8` · Vista (Muro · Índice) `c9` | dos filas: `c1-3` y `c4-6` | `<details>` «Filtrar» en `c1-2` (resumen de 44 px) + Vista en `c3`; abierto, los cuatro `select` apilados en `c1-3` (1.7.m) |
| Muro | regla de filas, a `--e-9` de los filtros | 1.4 | 1.4 |
| Estado vacío | «No hay obras con estos filtros.» + botón contorno «Quitar filtros», en `c1-4` | `c1-4` | `c1-3` |

**2.4.1 · Vista Índice (el hallazgo, Escat).**
- 1440: lista en `c1-5`, borde superior 1 px grafito, filas separadas por 1 px `--linea`, alto mínimo 64 px. Cada fila: título (`--t-titulo`) en `c1-3`, artista (texto) en `c4`, año (chico) en `c5`. Las columnas `c6-9` quedan vacías. La fila activa muestra su obra en `c6-9`, alto máximo 60svh, con su borde superior a la altura del de la fila (sin pasarse del final de la lista), en `position: absolute` dentro de la lista. Nunca tapa texto.
- ≤ 1000: cada fila reserva su última columna (`c6` / `c3`) para una caja 4:5 vacía; la obra de la fila activa aparece dentro, contenida, arriba a la izquierda. Título en `c1-2` (26 px) y debajo «Artista A · 2025» en chico. La caja existe siempre: nada salta.
- Qué activa: con `hover:hover`, el puntero o el foco; sin `hover`, la fila que cruza la línea media de la pantalla al bajar (`IntersectionObserver` con `rootMargin: "-50% 0px -50% 0px"`). Una sola activa a la vez (1.7.j). La imagen es `alt=""` + `aria-hidden` (la fila ya nombra la obra).

2.4.2 · **Terminado:** a 390, la primera obra empieza a ≤ 300 px del borde superior (en la v1, 499); el muro alterna obras de 3, 2 y 1 columna; filtrar cambia el conteo y el muro entra con 1.7.l. En Índice, bajar con el dedo hace aparecer cada obra en su caja.

### 2.5 · Ficha de obra `/obras/<o>/`

**Ojo primero:** la obra. **Disrupción:** cambio de escala: miniaturas de 56 px de alto (48 a 390) junto a una obra de hasta 78svh. **Respaldo:** Quatrième (miniaturas a escala muy chica, número mono fuera de la imagen), PRODn (plana, alineada arriba).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| Pista general / detalle (scroll-snap) | `c1-6`; la obra entera, alto máximo 78svh, **arriba a la izquierda** | `c1-6` | `c1-3`; alto = ancho ÷ proporción (sin franjas) |
| Miniaturas (dos botones) con «01 Vista general» / «02 Detalle» en chico, y «1 / 2» | bajo la pista a `--e-2`, desde `c1` | igual | igual |
| Artista (enlace, chico) + H1 título (`--t-titulo`) | `c7-9`, arriba | bajo las miniaturas, `c1-4` | bajo las miniaturas |
| Datos (`dl`, dos columnas `dt` / `dd`): Año · Técnica · Medidas (alto × ancho) · Precio (solo estados 1 y 2) · Disponibilidad | `c7-9`, a `--e-6` del H1 | `c1-4` | `c1-3` |
| Descripción (muestra) | `c7-9` | `c1-4` | `c1-3` |
| Acciones según el estado (D9) | `c7-9`; un botón bajo el otro, cada uno a lo ancho de `c7-9` | en línea | apilados, cada uno a lo ancho de `c1-3`, 48 px de alto |
| Aviso al tocar Comprar | bajo las acciones (1.7.k) | igual | igual |
| Línea de estados de muestra (solo con «Lo editas tú») | bajo el aviso | igual | igual |
| «← Anterior · Todas las obras · Siguiente →» (chico), borde superior 1 px `--linea` | `c7-9` | `c1-6` | `c1-3` |
| Más de la artista (nivel 2): fila de sección «Artista A» con 3 obras suyas, regla de filas (cierre k=3) | `c1-9` | `c1-6` | `c1-3` |

2.5.1 · **Obras de muestra de cada estado** (las cuatro de Artista A, para verlas juntas en `#/artistas/a`): estado 1 **a-04** · estado 2 **a-06** («Precio a consultar») · estado 3 **a-05** (vendida) · estado 4 **a-03** (colección privada). También son estado 2 **b-04** y **c-05**; el resto de las disponibles es estado 1, con precio de muestra y link de muestra.
2.5.2 · El detalle tiene la misma proporción que la vista general (M02): cambiar de imagen no mueve nada debajo.
2.5.3 · Miniatura activa: línea de 1 px grafito bajo su rótulo (1.7.e); la otra, nada. Estado de interfaz en grafito, nunca cobalto.
2.5.4 · **Terminado:** a 1440, obra grande a la izquierda y columna de ficha a la derecha con H1, datos tabulados en mono y un botón lleno; al deslizar o tocar «02 Detalle», se ve la textura (tela, papel, pincel seco). A 390, la obra llena el ancho y el botón principal queda a un pulgar de distancia.

### 2.6 · Ediciones `/ediciones/`

**Ojo primero:** las tres tapas. **Disrupción:** no exigida.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Ediciones» + presentación (muestra) | H1 `c1-3`, texto `c4-6` | igual | apilado |
| Tres tapas 5:7 con su pie («CUADERNO» etiqueta + «Edición 01» texto 500) | `[3,3,3]`, alineadas arriba, a `--e-16` | `[2,2,2]` | una por fila: tapa en `c1-2` y pie en `c3`, alineado abajo; la siguiente invertida (como Artistas) |

2.6.1 · **Terminado:** tres objetos editoriales distintos (cuaderno grafito, cuaderno de cartón, libro con lámina) a tamaño de lectura.

### 2.7 · Edición `/ediciones/<e>/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Ediciones» | `c1` | `c1` | `c1` |
| Tapa 5:7 | `c1-3` | `c1-3` | `c1-3` |
| Tipo (etiqueta), H1, descripción (muestra), «DETALLES» + `dl` (páginas y formato, de muestra), botón lleno «Comprar en Amazon», enlace «Edición en inglés →», avisos al tocar | `c5-8`, alineado arriba con la tapa | `c4-6` | `c1-3`, debajo |
| Fila de sección «Páginas interiores» (variante imágenes) + dos dobles páginas 10:7, alineadas arriba | `c1-4` y `c5-9` | `c1-3` y `c4-6` | una por fila, `c1-3` (excepción a 1.4: una doble página no baja de 2 columnas) |

### 2.8 · Encuentro `/encuentro/`

**Ojo primero:** el contador 007/369. **Disrupción:** cambio de escala (contador de 200 px) · color que desentona (la «/» en cobalto) · el enlace vertical «Libro» de su boceto.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 = etiqueta «ENCUENTRO» + contador (un solo `h1` con `aria-label` «Encuentro, 7 de 369 activados») | etiqueta `c1`; contador `c1-5` | `c1-5` | `c1-3` (272 px) |
| «activados · de muestra» (chico) | bajo el contador a `--e-2` | igual | igual |
| Enlace vertical «Libro →» (`writing-mode: vertical-rl`, etiqueta, línea 1 px grafito a su izquierda, 44 px de ancho táctil) | borde derecho de `c9`, arriba alineado con el contador | borde derecho de `c6` | borde derecho de `c3` (el contador termina en x ≈ 290 y el enlace empieza en x ≈ 328) |
| Foto de la caja (M04, 4:3) + su pie «Caja Encuentro» con marca de muestra | `c4-9` (898 × 673), a `--e-9` del contador: desplazada, no empieza en `c1` | `c2-6` | `c1-3` |
| Fila «Qué es» | texto `c4-6` | `c4-6` | apilado |
| Fila «Cómo funciona» + aviso «Maqueta · Por decidir…» | texto `c4-6`, aviso `c7-9` | texto `c4-6`, aviso debajo | apilado |
| Fila «Formas de activación» | texto `c4-6` | igual | apilado |
| Fila «Preguntas frecuentes»: presentación + 3 `<details>` (borde superior 1 px `--linea`, resumen en texto 500, alto mínimo 48 px, «+» / «−» en chico a la derecha) | `c4-6` | `c4-6` | apilado |
| Botón lleno «Activar un encuentro →» | desde `c4` | desde `c4` | `c1-3`, a lo ancho |

2.8.1 · Contador: «007» grafito, «/» **cobalto**, «369» gris. **Criterio:** el borde derecho de la tinta del contador queda a la izquierda del enlace vertical a 390, 768 y 1440.
2.8.2 · **Terminado:** un número enorme, una foto de la caja corrida a la derecha y texto en columna angosta; parece la página de un proyecto, no un formulario.

### 2.9 · Activar un encuentro `/encuentro/activar/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Encuentro» + H1 | `c1-4` | `c1-4` | `c1-3` |
| Proceso · Qué recibes · Tiempos · Registro fotográfico (etiqueta + texto de muestra cada uno, una idea por columna, Taradash) | `c1-2`, `c3-4`, `c5-6`, `c7-8`, en una fila con borde superior 1 px grafito | `c1-3`, `c4-6` (dos filas) | apilados |
| Aviso «Maqueta · Por decidir: si la caja se pide…» | `c1-4` | `c1-4` | `c1-3` |
| Opción 1: H3 «Pedir la caja» + formulario (Nombre, Correo + ayuda, pregunta de muestra, botón lleno «Enviar solicitud») | `c1-4` | `c1-4` | `c1-3` |
| Opción 2: foto de la caja (la de Encuentro, variante de 600), H3 «Comprar la caja», precio de muestra, botón lleno «Comprar con Mercado Pago» | `c6-8` | `c1-4`, debajo | apilado |

Cada opción tiene un solo botón lleno; la vista tiene dos porque la decisión §9-4 está abierta.

### 2.10 · Libro `/encuentro/libro/`

**Ojo primero:** el mapa de 369 con siete casillas oscuras al principio. **Disrupción:** no exigida; es el orden más estricto del sitio.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Encuentro» + H1 «Libro» | `c1-3` | `c1-3` | `c1-3` |
| Bajada + «Activados: 7 de 369 · los 7 son de muestra» (chico) | `c4-6` | `c4-6` | `c1-3` |
| Mapa de 369 (D19): `role="img"` + `aria-label` «369 posiciones, 7 activadas, de muestra» | `c1-9`, **41 casillas por fila, 9 filas**, calle de 3 px (≈ 30 px por casilla), número en chico gris dentro de cada casilla | 41 × 9, calle de 2 px (≈ 15 px), sin números | 41 × 9, calle de 1 px (≈ 7,6 px; franja de ≈ 77 px de alto), sin números |
| Aviso «Maqueta · En el sitio, mientras no haya…» | bajo el mapa, `c1-4` | `c1-4` | `c1-3` |
| Fila de sección «Activados» (variante imágenes) + los 7 registros (M04, 4:3), regla de filas; pie: «Encuentro 001» (texto 500) y lugar de muestra con su marca; cada registro es enlace a su vista | 1.4.3 | 1.4.3 | 1.4.3 |

2.10.1 · Casilla vacía: borde 1 px `--linea`. Casilla activa (001 a 007): fondo grafito, número en hueso (≥ 1001). Sin imágenes en las casillas, sin cobalto, sin marca de «próximo».
2.10.2 · A ≥ 1001 las casillas activas son enlaces de puntero (`tabindex="-1"`; 1.7.p); el camino accesible y táctil a cada encuentro es la galería.
2.10.3 · **Terminado:** un mapa de 369 que se lee entero de un vistazo en los tres anchos y, debajo, siete fotos de registro distintas entre sí (superficies y disposiciones distintas).

### 2.11 · Encuentro activado `/encuentro/libro/<nnn>/`

**Ojo primero:** el contador 001/369.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| Contador «001/369» (`h1`, `aria-label` «Encuentro 001 de 369»; «/» en **cobalto**) | `c1-5` | `c1-5` | `c1-3` |
| «DE MUESTRA» (etiqueta) + `dl` Fecha / Lugar (muestra) + descripción (muestra) + «← Libro» | `c7-9`, alineado abajo con el contador | debajo, `c1-4` | debajo |
| Registro fotográfico (M04, 4:3) + pie «Registro · encuentro 001» con marca | `c1-6` (898 × 673), a `--e-9` | `c1-6` | `c1-3` |

2.11.1 · **Criterio (C10):** a 1440 y 1280, el borde derecho de la tinta del contador queda a la izquierda de la ficha (756 px de contador terminan en x ≈ 798; `c7` empieza en x ≈ 958).

### 2.12 · Acerca `/acerca/`

**Ojo primero:** las tres palabras escalonadas. Sin obra y sin persona (brief §7: «no es una bio personal»). La prohibición de Perrotin («vista sin obra») es sobre blanco intenso con texto negro: sobre hueso, Acerca, Activar y Contacto pueden ser de texto.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 + enunciado (muestra) | H1 `c1-3`, enunciado `c4-6` | igual | apilado |
| «mirar · seleccionar · decidir» (`--t-titulo`, sin rótulo), a `--e-16` | una fila: «mirar» en `c1`, «seleccionar» en `c4`, «decidir» en `c7` | `c1`, `c3`, `c5` | escalera: tres filas, la primera palabra en `c1`, la segunda en `c2`, la tercera en `c3` |
| Desarrollo (muestra) + aviso «Maqueta · Las tres palabras…» | texto `c4-6`, aviso `c7-9` | texto `c4-6` | apilado |
| Filas «Criterio curatorial» y «Visión» (muestra) | texto `c4-6` | igual | apilado |
| «Ver los artistas →» | desde `c4` | desde `c4` | `c1` |

### 2.13 · Tienda `/tienda/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Tienda» | `c1-3` | `c1-3` | `c1-3` |
| Fila «Obras disponibles» (variante imágenes) + «Ver todas en Obras →» a la derecha + tres obras, la primera de estado 1 de cada artista (a-01, b-02, c-02) | `[2,4,3]` | `[2,2,2]` | `[1,1,1]` |
| Fila «Encuentro»: texto (muestra) + botón contorno «Comprar la caja» + «Activar un encuentro →»; foto de la caja | texto y acciones `c4-6`, foto `c7-9` | texto `c4-6`, foto debajo `c1-3` | apilado |
| Fila «Ediciones»: tres tapas | `c4-5`, `c6-7`, `c8-9` | `[2,2,2]` | `[1,1,1]` |
| Fila «Cómo se compra»: cuatro párrafos (Obras, Consultas, Encuentro, Ediciones), una idea por columna | `c4-6` y `c7-9`, dos filas | `c1-3` y `c4-6` | apilados |
| Aviso del carrito | `c4-7` | `c1-4` | `c1-3` |

### 2.14 · Contacto `/contacto/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Contacto» | `c1-3` | `c1-3` | `c1-3` |
| Formulario (Nombre, Correo + ayuda, Consulta, chip de obra cargada si viene de una ficha, botón lleno «Enviar consulta») | `c4-6` | `c1-4` | `c1-3` |
| Correo + aviso · Instagram (muestra) · Newsletter (campo + botón contorno «Suscribirme») + aviso | `c7-9`, cada uno en su fila con borde superior 1 px `--linea` | debajo, `c1-4` | debajo |

### 2.15 · 404

H1 «Esta página no existe.» en `c1-6`; debajo, botón contorno «Ver las obras →» y enlace «Ir al inicio». Mismo vacío arriba que las demás vistas. Toda ruta desconocida termina acá.

---

## 3 · Plan de media

### 3.1 · Slots (ningún slot vacío, gris ni marcador: T2)

| # | Slot | Qué va | Origen | Ratio | Tratamiento |
|---|---|---|---|---|---|
| 3.1.1 | Láminas del carrusel (5) | c-04, a-07, b-05, a-02, c-02 | M01 | El de cada obra | Plana, entera, alineada abajo y al borde de 2.1.1; la 1 con `loading="eager" fetchpriority="high"`, las otras `lazy` |
| 3.1.2 | Obras del bloque de artistas del inicio (3) | a-05, b-02, c-05 | M01 | Natural | Paradas sobre la línea, alineadas abajo |
| 3.1.3 | Índice de Artistas (3) | a-07, b-07, c-07 | M01 | Natural | Igual |
| 3.1.4 | Obra a todo el ancho de Artista (1 por artista) | a-01, b-09, c-08 | M01 | 3:2 | `c1-9` o a sangre a 390; `eager` |
| 3.1.5 | Muro, obras de Artista, Tienda | las 27 | M01 | Natural | Regla de filas, alineadas arriba, `max-height: 80svh` |
| 3.1.6 | Hallazgo del Índice | la obra de la fila activa | M01 | Natural, contenida | 2.4.1; `alt=""` + `aria-hidden` |
| 3.1.7 | Ficha · vista general | la obra | M01 | Natural | `eager` |
| 3.1.8 | Ficha · detalle | recorte de la misma obra | M02 | **El mismo de la obra** | Igual que la general |
| 3.1.9 | Miniaturas de la ficha (2) | general y detalle | M02, variante de 600 | Natural | 56 px de alto (48 a 390), dentro de un botón de 44 × 48 px mínimo |
| 3.1.10 | Tapas de ediciones (3) | e-01, e-02, e-03 | M03 | 5:7 | Planas, como escaneo |
| 3.1.11 | Páginas interiores (2 por edición) | dobles páginas abiertas | M03 | 10:7 | Planas, con el pliegue en la imagen |
| 3.1.12 | Foto de la caja Encuentro (Encuentro, Activar, Tienda) | caja abierta con sus materiales, cenital | M04 | 4:3 | Plana |
| 3.1.13 | Registros de los encuentros 001 a 007 (Libro y vista de cada uno) | siete fotos cenitales distintas | M04 | 4:3 | Plana; en el Libro con regla de filas |
| 3.1.14 | Foto opcional de Artista A | mesa de taller, cenital | M05 | 4:5 | Plana; nunca un retrato |
| 3.1.15 | Favicon y `apple-touch-icon` | «369» en Plex Mono 500 grafito sobre hueso | M06 | 1:1 | SVG + PNG 180 × 180 |

3.1.16 · **`alt`:** obras, los de copy §4.1 y §4.3 («Obra de relleno: Campo 04, de Artista A», más «. Vista general» / «. Detalle»); las imágenes nuevas, los de §12-4 (todos dicen «de relleno» o «de muestra»).
3.1.17 · **Todo `<img>`** con `width` y `height` (los de su variante de 1200), `decoding="async"` y fondo `--hueso-2` solo mientras carga (1.7.a).

### 3.2 · M01 · Regenerar las 27 obras (precondición de C06; incluye C33)

Nuevo `maqueta/generar_relleno_v2.py` (no se publica). Las recetas están probadas en `scratchpad/lucia-spec/proto_media.py` (funciones base: ruido, papel, luz, grano, pegado con sombra) y `proto_media2.py` (versiones aprobadas: `obra_a2`, `obra_c2`, `superficie2`, `registro2`); Diego las copia, no las reinventa. Requisito: `scratchpad/venv/bin/python` con numpy (instalado hoy: numpy 2.0.2, Pillow 11.3).

- **Se conserva** el mapa de proporciones de la v1 (`PROPORCIONES[(i + ord(letra)) % 9]`), así cada id mantiene su ratio y la spec no cambia de obra.
- **Lado largo del original: 2.400 px** (de ahí salen el detalle y las variantes; el de 2.400 no se publica).
- **Artista A · «Campo» · pintura de borde duro sobre tela** (`obra_a2`): fondo + campos rectangulares con borde que respira 2 a 5 px, arrastre de pincel anisótropo (vertical u horizontal por campo, amplitud 2,8%), trama de tela, caída de luz de foto del 6%, grano 2,5. **Sin desenfoque de campos y sin dos bandas apiladas en todas** (C33). Composiciones y paletas (fondo → campos):

| id | prop | Fondo | Campos (x0, y0, x1, y1 en fracciones · color · dirección del pincel) |
|---|---|---|---|
| a-01 | 3:2 | (214,196,160) | (0,0,1,.58) (178,92,58) V · (0,.58,1,.64) (40,36,32) H |
| a-02 | 4:5 | (62,44,36) | (.12,.18,.62,.82) (196,160,96) V |
| a-03 | 4:5 | (226,214,186) | (0,0,.62,1) (196,172,120) V · (.66,.12,.92,.88) (86,98,70) H |
| a-04 | 1:1 | (40,36,32) | (0,0,1,.33) (150,60,44) H · (0,.66,1,1) (196,172,120) H |
| a-05 | 3:4 | (196,172,120) | (.2,0,.34,1) (40,36,32) V |
| a-06 | 5:4 | (164,70,44) | (.55,.1,.9,.9) (226,214,186) V |
| a-07 | 2:3 | (86,98,70) | (0,.72,1,1) (214,196,160) H |
| a-08 | 4:5 | (178,170,150) | (.1,.1,.5,.9) (150,96,60) V · (.55,.1,.9,.9) (62,44,36) V |
| a-09 | 1:1 | (94,40,30) | (.25,.25,.75,.75) (186,150,72) H |

- **Artista B · «Recorte» · collage de papeles sobre cartón** (`obra_b` de `proto_media.py`): base de cartón (176,166,146), (150,140,122) o (196,188,170) según la obra; papeles negro, gris, kraft, hueso oscuro, gris medio y óxido (146,58,40) con peso 0,6 (uno o dos por obra); giros gaussianos de 2,2°; sombra de espesor dentro de la imagen (luz arriba a la izquierda). Piezas por obra, de b-01 a b-09: 14, 22, 34, 18, 40, 26, 12, 30, 20. El 70% de las piezas con el centro ajustado a una retícula de 6 × 6 (orden) y el 30% libre.
- **Artista C · «Línea» · tinta con pincel seco** (`obra_c2`): cerdas que siguen el trazo y se secan hacia el final; 3 a 7 trazos. Papel claro **(249,248,245)** en c-02, 03, 05, 06, 08 y 09 (el (247,246,242) del prototipo daba 18,8 de distancia al hueso: no alcanza); papel negro (26,25,24) con tinta (226,220,206) en c-01, 04 y 07. **Sin el punto azul** de la v1.
- **Criterios:** (1) las 27 con distancia RGB media ≥ 20 entre su franja de borde de 12 px y el hueso (M9); (2) ningún píxel a distancia ≤ 12 de `#1F3BD6` en ninguna imagen (M21); (3) mirar la hoja de contacto de las 27 sobre hueso (`hoja.py` de `scratchpad/lucia-spec/`) antes de seguir: si una se lee como patrón de código y no como obra, se cambia su semilla.

### 3.3 · M02 · Variantes, detalle y peso (C19)

- Del original de 2.400: `{id}.jpg` de **1.600** px de ancho, `{id}-1200.jpg`, `{id}-600.jpg` (LANCZOS, `quality=82, optimize=True, progressive=True`).
- **Detalle:** ventana del 50% del ancho y del alto del original (misma proporción) en la posición de mayor contraste: se prueban 9 × 9 posiciones sobre la luminancia reducida a 1/8 y gana la de mayor desviación estándar (en la tinta de C, el centro puede ser papel vacío). Se guarda `{id}-detalle.jpg` a 1.200 px de ancho (sin agrandar) y `{id}-detalle-600.jpg`.
- `srcset` con `600w`, `1200w`, `1600w` (el detalle, con `600w` y `1200w`); `src` = la de 1200. `sizes` por slot, con los anchos de 1.3.9: lámina `(max-width:1000px) 92vw, 64vw`; obra a todo el ancho de Artista `(max-width:620px) 100vw, 94vw`; obras en filas `columnas ÷ total × 94vw` en cada corte; ficha `(max-width:1000px) 92vw, 62vw`; Índice `(max-width:1000px) 30vw, 41vw`; miniaturas, solo la de 600.
- **Peso:** `-600` ≤ 100 KB, `-1200` ≤ 300 KB, `1600` ≤ 550 KB (las recetas probadas pesan unos 200 KB a 1.600 con `quality=86`). Si una se pasa, se baja el grano de esa obra, no la calidad.

### 3.4 · M03 · Ediciones (3 tapas, 6 interiores)

Funciones `tapa` y `doble_pagina` de `proto_media.py` (fuente: `scratchpad/lucia-spec/fuentes/PlexMono-500.ttf`, la misma familia del sitio, bajada de Google Fonts).
- **e-01 · Cuaderno:** tapa lisa de cartón grafito (36,35,33), rótulo «EDICIÓN 01» arriba a la izquierda y «369» abajo, en Plex Mono hueso a 4,5% del ancho. Interiores: dos dobles páginas de puntos.
- **e-02 · Cuaderno:** tapa de cartón (168,150,120), rótulos en grafito. Interiores: una doble página de puntos y una rayada.
- **e-03 · Libro:** tapa de papel (220,212,196) con la lámina de c-02 centrada al 56% del ancho y el rótulo «EDICIÓN 03». Interiores: dos dobles páginas con una lámina cada una (c-05 y c-09) en la página derecha y su número de lámina en mono chico en la izquierda.
- Papel de los interiores **(250,249,244)** (el (244,241,233) del prototipo queda a 11,6 del hueso: su borde se perdería). Pliegue central como sombra dentro de la imagen.
- Sin «Módulo 369» como logotipo en ninguna tapa (brief §8-6: no se diseña logo). Tapas a 1.000 × 1.400 con `-600`; interiores a 1.600 × 1.120 con `-600` y `-1200`.

### 3.5 · M04 · Encuentro (la caja y siete registros)

Funciones `superficie2` y `registro2` de `proto_media2.py` (foto cenital: superficie con grano, caja de cartón con su borde, tarjeta numerada en Plex Mono, papeles de colores con sombra de espesor, viñeta de luz del 16%).
- **Caja** (`img/encuentro/caja.jpg`, 4:3): sobre lino; la tarjeta dice solo «/369», sin número de encuentro.
- **Registros 001 a 007** (`img/encuentro/r-001.jpg` …): la tarjeta lleva su número; superficie y semilla por registro: 001 hormigón · 002 madera · 003 lino · 004 hormigón (otra semilla) · 005 madera · 006 lino · 007 hormigón. Cada disposición distinta (la semilla cambia posiciones, giros y colores de los papeles).
- Ninguna obra de artista dentro de un registro (C10). 1.600 × 1.200 con `-600` y `-1200`.

### 3.6 · M05 · Taller de Artista A (`img/artistas/a-taller.jpg`, 4:5)

Mismo motor cenital: superficie de madera; dos o tres hojas con pruebas de color en la paleta de A (recortes de `obra_a2`), tiras de cinta de papel, dos pinceles (mango, virola gris, cerdas oscuras) y un lápiz, con sombra de espesor. Sin personas, sin manos.

### 3.7 · M06 · Favicon

`favicon.svg` (cuadrado hueso con «369» en Plex Mono 500 grafito, sin borde) y `apple-touch-icon.png` de 180 × 180 generado con Pillow y la TTF de 3.4. `<link rel="icon">` y `<link rel="apple-touch-icon">` en `index.html` (C34).

---

## 4 · Estados e interacción

| # | Pieza | Reposo | Hover (solo `@media (hover:hover)`) | Foco visible | Activo / presionado | Deshabilitado |
|---|---|---|---|---|---|---|
| 4.1 | Botón lleno | fondo grafito, texto hueso 16 px 500, borde 1 px grafito, padding `--e-2` × `--e-3`, alto mínimo 44 px (48 a 390 en la ficha) | se invierte: fondo hueso, texto grafito (1.7.h); flecha 1.7.g | contorno 2 px grafito a 3 px | como hover, también en toque | texto gris, borde `--linea`, fondo hueso, sin hover |
| 4.2 | Botón contorno | fondo hueso, texto grafito, borde 1 px grafito | fondo grafito, texto hueso | igual | como hover | igual |
| 4.3 | Enlace de acción («Ver todo →», «← Artistas», «Siguiente →») | chico o texto, grafito, sin subrayado; 44 px de alto táctil | subrayado 1.7.f + flecha 1.7.g | igual | color gris mientras se presiona | n/a |
| 4.4 | Ítem del menú y del pie | grafito | subrayado 1.7.f | igual | gris mientras se presiona | página actual: gris, sin subrayado, `aria-current` |
| 4.5 | Tarjeta de obra (enlace) | imagen + pie | subrayado 1.7.f en la línea del título; la imagen no cambia (salvo 1.7.q, nivel 2) | contorno 2 px alrededor de imagen y pie | n/a | n/a |
| 4.6 | Herramientas (Lo editas tú, Retícula, ES, EN; Muro / Índice) | chico gris, `aria-pressed="false"` | grafito | igual | `aria-pressed="true"`: grafito + línea de 1 px debajo | n/a |
| 4.7 | Campo de texto y `select` | texto 16 px grafito, fondo hueso, borde inferior 1 px grafito, padding `--e-2` 0, alto mínimo 44 px, radio 0; `select` con flecha «↓» en chico gris a la derecha | n/a | contorno 2 px grafito, además del borde | n/a | n/a |
| 4.8 | Label | etiqueta (chico mayúscula gris) sobre el campo, a `--e-1` | | | | |
| 4.9 | Indicador del carrusel | número gris | grafito | contorno | activo: grafito + raya (2.1.2) | n/a |
| 4.10 | Miniatura de la ficha | imagen chica + rótulo | rótulo grafito | contorno | `aria-pressed="true"`: línea 1 px bajo el rótulo | n/a |
| 4.11 | `<summary>` de pregunta | texto 500 + «+» | subrayado | contorno | abierto: «−» | n/a |
| 4.12 | Chip de obra cargada (Contacto) | texto 16 px + botón «Quitar» en chico, borde 1 px grafito | «Quitar» subrayado | contorno | n/a | n/a |

4.13 · **Foco:** nunca `outline: none` sin reemplazo; contorno grafito en todo el sitio (el cobalto de la v1 en `:focus-visible` sale, D6). Sobre un botón lleno o una casilla activa el contorno queda afuera, sobre hueso.
4.14 · **Validación propia** (`novalidate`), para que los mensajes salgan en el idioma de la página (copy §4.5): al enviar, cada campo con error recibe `aria-invalid="true"`, borde inferior de 2 px grafito (con `margin-bottom: -1px`, sin salto) y su mensaje debajo en chico grafito, enlazado con `aria-describedby`; el foco va al primer campo con error. Sin color de error: no hay token rojo y el mensaje no depende del color. Si todo está bien, aparece el aviso «Maqueta · No se envió nada…» con `role="status"` (1.7.k) y el formulario se vacía.
4.15 · **Avisos al tocar** (Comprar, Comprar la caja, Amazon, enlace del otro idioma, Suscribirme): `preventDefault` y el aviso aparece debajo (1.7.k). Nunca un `alert()`.
4.16 · **Estados vacíos:** Obras (2.4). Tienda sin disponibles: texto de Clara + «Ver todas las obras →» (no se alcanza con el relleno, pero se construye).
4.17 · **Carga:** cada `<img>` reserva su espacio con `width`/`height` y muestra `--hueso-2` hasta que aparece (1.7.a). En láminas y ficha la caja del `img` es la imagen pintada: ese fondo nunca queda como franja. Sin pantalla de carga.
4.18 · **Navegación:** cambio de vista con 1.7.b; tras un clic, el foco va al `h1` de la vista nueva (`tabindex="-1"`, `preventScroll`); `document.title` por vista (6.3); «Ir al contenido» visible solo con foco, primer elemento del `body`. **Volver** (atrás) restaura la posición y los filtros de Obras (C24): `history.scrollRestoration = 'manual'`, una posición por hash, y los filtros guardados en una variable de módulo.
4.19 · **Al bajar:** nada aparece ni se pega. La cabecera y el aviso se van con la página.
4.20 · **Menú a 390** (D8, 2.0.3): botón con `aria-expanded` y `aria-controls`.
4.21 · **Carrusel:** pista con `overflow-x: auto`, `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, sin barra visible; cada lámina `scroll-snap-align: start`; `tabindex="0"` y flechas izquierda / derecha; indicador y estado de los botones se actualizan con el scroll (listener pasivo, `requestAnimationFrame`). Sin avance automático. `aria-roledescription="carrusel"` y etiquetas de copy §5-1.
4.22 · **Ficha, general / detalle:** misma mecánica que el carrusel; las miniaturas son botones con `aria-pressed`.
4.23 · **Filtros:** cada `select` filtra por su propio campo (técnica por la técnica de la obra, no por la artista: el error de la v1, `app.js` L190), se combinan, el conteo se actualiza con `aria-live="polite"` y aparece «Quitar filtros» con alguno activo.
4.24 · **Idioma:** ES / EN con `aria-pressed` y `aria-label` «Español» / «English»; cambia `document.documentElement.lang` a `es-CL` o `en`; se guarda (con `try/catch`) y se mantiene al navegar. Cambia también la marca de muestra (8.1) y el tamaño de la palabra enorme (1.2.1).
4.25 · **Áreas táctiles:** todo lo interactivo mide ≥ 44 × 44 px en su caja (padding y, en la barra de aviso, margen negativo). Las casillas del Libro a ≤ 1000 no son interactivas (2.10.2).
4.26 · **iOS:** `-webkit-text-size-adjust: 100%`; viewport sin `viewport-fit=cover` y sin `maximum-scale` (C39, C02); `-webkit-tap-highlight-color: transparent` con el estado activo de esta tabla en su lugar.

---

## 5 · Breakpoints

| # | Corte | Columnas | Por qué ahí | Qué se reordena |
|---|---|---|---|---|
| 5.1 | ≥ 1001 px | 9 | iPad horizontal (1024, 1180) y escritorio; a 1001 la columna mide 85,9 px y el ítem más largo del menú, 75 px | Cabecera de un ítem por columna; ficha en dos columnas; Índice con imagen en `c6-9`; números en el mapa del Libro |
| 5.2 | 621 a 1000 px | 6 | iPad vertical (768, 820, 834) y celular horizontal (844 × 390) | Menú en dos filas; ficha apilada; Índice con caja reservada; contador de 140 px |
| 5.3 | ≤ 620 px | 3 | Todos los celulares en vertical (375 a 430) | Menú plegable en el flujo; filtros plegados; Artista a sangre; artistas y ediciones de a una por fila en zigzag; contador de 72 px; barra de aviso en tres líneas |

5.4 · Son los cortes de la v1 (1000 y 620). No hay ancho máximo de contenido: sobre 1440 la retícula sigue estirándose, como en las referencias.
5.5 · Además: `@media (hover:hover)` para todo hover (C02) y `@media (prefers-reduced-motion: reduce)` (1.7.2).

---

## 6 · Capa de señales (de Simón, `senales.md` §12)

6.1 · `<meta name="robots" content="noindex, nofollow">` en `index.html` y `_headers` con `/*` → `X-Robots-Tag: noindex, nofollow`. Nada de `robots.txt` con `Disallow`.
6.2 · Sin JSON-LD, canonical, hreflang, sitemap ni enlaces a modulo369.com.
6.3 · `<title>` por vista con el formato de copy §3.5: `{vista} · Módulo 369 · maqueta` / `{view} · Módulo 369 · mock-up`; inicio `Módulo 369 · maqueta`.
6.4 · `lang` del documento cambia con ES / EN (4.24).
6.5 · `og:title` «Módulo 369 · maqueta v2» y `og:description` «Maqueta para la reunión del 6 de octubre. Obras y artistas de relleno.», **sin `og:image`**.
6.6 · `theme-color` hueso (1.1.9) y favicon (M06).

---

## 7 · Lo que esta spec prohíbe explícitamente

Cada ítem es **regla**: no vuelve en ninguna pasada. Entre paréntesis, de dónde sale.

- **P1 · Nada fijo ni pegado:** cero `position: fixed` y cero `position: sticky`. Excepciones: `.reticula` (herramienta de maqueta, `aria-hidden`, `pointer-events: none`, apagada por defecto) y las capas temporales de View Transitions mientras dura 1.7.b. (María contra Escat; brief §7; D8)
- **P2 · Nada encima de una obra:** ni texto, ni pie, ni número, ni etiqueta de «Lo editas tú», ni controles, ni marca de muestra. (PRODn; María)
- **P3 · Obra sin envoltorio:** sin paspartú, marco, caja, fondo visible, borde, contorno ni sombra de interfaz; sin `object-fit: cover` en obras. (PRODn; C06)
- **P4 · Cero profundidad de interfaz:** sin `box-shadow`, `drop-shadow`, `filter` (incluido `blur`), `backdrop-filter` ni `mix-blend-mode`; `transform` solo en los estados transitorios de 1.7 (1.6.4). (1.6; Perrotin)
- **P5 · Cero blanco en la interfaz:** ningún `#fff`, `white` ni `rgb(255,255,255)`; ningún color fuera de los seis tokens. (María contra Perrotin; brief §7)
- **P6 · Cobalto solo en su lista de tres** (D6). Nunca en foco, hover, página actual, enlace, botón, borde, fondo, estado, retícula, «Lo editas tú», marca de muestra ni dentro de una imagen de relleno.
- **P7 · Dos familias:** sin Instrument Serif ni ninguna otra; sin itálica ni síntesis. (D7)
- **P8 · Sin tamaños de letra fuera de la escala** (1.2.7), **espaciados fuera de la escala** (1.3.11) **ni duraciones o curvas fuera de los tokens** (1.7).
- **P9 · Radio 0 en todo**; sin círculos de estado. (1.5)
- **P10 · Sin desplazamientos que pisen:** ningún elemento se superpone a otro en reposo (salvo la retícula y la imagen del hallazgo sobre columnas vacías). (C01)
- **P11 · Sin carrusel enmarcado:** la lámina no tiene fondo, borde ni sombra; sin copia desenfocada detrás; sin avance automático; sin vuelta al principio. (C04; D1)
- **P12 · Sin animación al bajar, sin parallax, sin `scale` en hover, sin pantalla de carga, sin cursor propio, sin librerías de scroll suave ni de carrusel** (todo con scroll nativo). (D18; Schipper excluido)
- **P13 · Artistas:** ninguna representada por un retrato; nunca una lista de nombres sin obra. (Kurimanzutto; Perrotin; brief §7)
- **P14 · Cero cifras de precio** y cero signo «$» en la maqueta. (brief §6)
- **P15 · Sin rayas largas ni medias** en textos visibles ni en `content:` de CSS. (manual de marca; copy §0)
- **P16 · Sin fakes de CSS para imágenes:** ni tapas compuestas con CSS, ni lomos con degradé, ni salas dibujadas. (tell #9; D16)
- **P17 · Sin información que solo aparezca con puntero:** el hallazgo del Índice se activa al bajar en el iPhone; el detalle de 1.7.q está en la ficha. (2.4.1)
- **P18 · Sin franja lateral decorativa** (`border-left` de color en avisos o bloques). (tell #6; D10)
- **P19 · Sin `transition: all`** y sin `outline: none` sin reemplazo. (antislop C2, C6)
- **P20 · Sin emoji** ni iconos de relleno; las flechas son los caracteres «→», «←» y «↓».
- **P21 · Sin `maximum-scale` ni `user-scalable=no`.** (C02)
- **P22 · Nada de la maqueta llega a producción:** retícula, «Lo editas tú», avisos, marca de muestra, texto de muestra y todo `img/`. (brief §6, §8-4)
- **P23 · Sin panel dibujado ni páginas de reunión** (`#/panel`, `#/idea`, `#/incluido`, `#/decisiones`) ni enlace «Reunión →». (brief §3, §8-3)
- **P24 · Ninguna instrucción en pantalla:** cero corchetes `[…]` y cero «Lo escribe…» visibles, en ES y en EN; eso vive en `copy-secciones.md`. (brief §6 corregido)
- **P25 · Ninguna posición de imagen vacía o gris:** cero `.marcador-img`, cero cajas con solo `--hueso-2`, cero `img` rotos. (brief §7, terminación)
- **P26 · El texto de muestra nunca** trae cifras de precio, fechas reales, nombres reales, atribución a María ni la declaración textual de su correo, y nunca va sin su marca. (brief §6)

---

## 8 · Capas de la maqueta

### 8.1 · La marca de muestra (D17)

- **8.1.1 · Qué marca:** todo texto de `copy-muestra.md` (statement, biografía, historia y proceso, visión curatorial, enunciado, desarrollo, criterio, visión, presentación y descripción de ediciones, páginas y formato, descripción de cada obra, precio de muestra, textos de Encuentro y Activar, preguntas y respuestas, fecha, lugar y descripción de cada encuentro, Instagram, la pregunta del formulario de Activar, los pies de las fotos nuevas). Los datos de obra generados (título, año, técnica, medidas) y «Artista A, B, C» **no** llevan marca: los cubre el aviso global (brief §6).
- **8.1.2 · Cómo se ve:** el texto de muestra va en **grafito**, a su tamaño normal, sin itálica: se lee terminado. Al final de su última línea lleva la palabra **«muestra»** / **«sample»** en Plex Mono 500 de 12 px, gris, minúscula, tracking 0,04em, separada `0.4em`, levantada `0.5em` con `position: relative; top: -0.5em` (no altera el interlineado) y `white-space: nowrap`.
- **8.1.3 · Cómo se construye:** clase `.pendiente` en el elemento que contiene el texto (si son varios párrafos, en el último `p`); `.pendiente::after { content: attr(data-muestra) }`; el JS escribe `data-muestra` con «muestra» o «sample» según el idioma, en cada cambio de idioma.
- **8.1.4 · Regla de conteo:** una marca por cada `.pendiente`, siempre al final, nunca dentro de una frase ni sobre una imagen. En un `dl`, el `dd` de muestra lleva su marca (la ficha de un encuentro tiene dos o tres).
- **8.1.5 · Por qué así:** es la convención de una llamada de nota (Quatrième numera en mono fuera de la imagen); en la familia de los datos, se distingue del texto sin ensuciarlo. Respeta P2 (nada encima de una obra) y P6 (sin cobalto).

### 8.2 · «Lo editas tú» (aprobada por Ramón, brief §10)

- **8.2.1 · Cómo se activa:** botón «Lo editas tú» / «What you edit» en la barra de aviso, visible en los tres anchos, con `aria-pressed`. Alterna `body.ver-edita` y se mantiene al navegar.
- **8.2.2 · Cómo se ve:** cada pieza marcada recibe un contorno de 1 px **discontinuo grafito** a 4 px; las piezas de texto fijo, contorno de 1 px **punteado gris**. La etiqueta es un bloque insertado **antes** de la pieza, dentro del flujo (`::before`, `display: block`; `grid-column: 1 / -1` si el contenedor es una grilla, así no rompe la suma de las filas): chico en minúscula normal, texto hueso sobre fondo grafito, padding `--e-1` × `--e-2`, a `--e-1` de la pieza. Aparece con 1.7.n. Al encender la capa el contenido baja: es esperado.
- **8.2.3 · Lo que no hace:** no tapa ni tiñe obras (el atributo nunca va en un `<img>`); no usa cobalto ni blanco.
- **8.2.4 · Una etiqueta por tipo de pieza por vista:** la primera pieza de cada tipo lleva etiqueta y contorno; las demás, solo contorno.
- **8.2.5 · Qué piezas marca** (textos de copy §8, ES y EN; donde copy dice «Todo texto entre corchetes», ahora es «Todo texto de muestra»):

| Pieza | Dónde va el atributo |
|---|---|
| Carrusel de portada | la sección del carrusel (no la pista) |
| Tarjeta de obra | la tarjeta (primera del muro, de Artista y de Tienda) |
| Datos de la ficha: Disponibilidad y Precio | el `dd` de cada una |
| Índice de Artistas | la sección de la grilla |
| Cabecera de la página de artista (incluye la foto de taller) | el bloque H1 + statement |
| Tapa de edición | la primera tapa |
| Encuentro del Libro y su ficha | la galería de activados; el bloque de datos del encuentro |
| Contador del Libro y de Encuentro | el bloque del contador |
| Todo texto de muestra | el primer `.pendiente` de la vista |
| Correo e Instagram de Contacto | su bloque |
| Texto fijo (menú, pie, el botón principal de cada vista, «Cómo se compra») | contorno punteado gris y la etiqueta de texto fijo |

- **8.2.6 · Ficha:** con la capa encendida aparecen además «Estado X de 4 · …» y «Ver estado 1 · 2 · 3 · 4» (copy §5-5), en chico grafito, que enlazan a a-04, a-06, a-05 y a-03.

### 8.3 · Retícula (herramienta de maqueta, no va a producción)

- **8.3.1 · Activación:** botón «Retícula» / «Grid» con `aria-pressed`; `body.ver-reticula`. Apagada al cargar. 1.7.n.
- **8.3.2 · Cómo se ve:** capa `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 50`, `aria-hidden`, con el margen y la calle del ancho (9 · 6 · 3 columnas). Cada columna **sin relleno**: solo sus dos bordes, una línea de 1 px grafito con 1 px hueso al lado (se ve sobre hueso y sobre obras oscuras sin teñirlas). Arriba de cada columna, su número en chico grafito sobre un chip hueso.
- **8.3.3 · Por qué así (C03):** el cobalto es la disrupción del diseño; si la herramienta lo usa, María lo lee como parte del sitio. El relleno de color de la v1 teñía las obras (brief §8-4).
- **8.3.4 · Criterio:** a 1440, 768 y 390 se ven 9, 6 y 3 columnas numeradas, y ninguna obra cambia de color (muestreo de píxeles lejos de las líneas, con y sin capa).

### 8.4 · Aviso global y avisos de maqueta

- 8.4.1 · Aviso global: 2.0.1 (texto de copy §3.1, completo en todos los anchos).
- 8.4.2 · Avisos de maqueta (`.nota-maqueta`): chico gris, minúscula normal, empiezan con «Maqueta ·» / «Mock-up ·» en el texto, ancho máximo 4 columnas a 1440; sin franja, sin fondo, sin icono. Los «en línea» de copy §7, siempre visibles; los «al tocar», ocultos hasta el toque (1.7.k).
- 8.4.3 · Sin botón «Notas» (D10).

---

## 9 · Cambios C01 a C41 del diagnóstico: qué entra en la v2

**Nivel 1** = imprescindible para mañana, en el orden de 10.1. **Nivel 2** = si alcanza. **No** = no entra.

| C | Nivel | En la v2 | Por qué |
|---|---|---|---|
| C01 | 1 | Reformulado: sin `.corrida` ni `translateY`; el desplazamiento sale de la regla de filas (1.4) y de la lámina corrida (D1); enlace vertical en la última columna en los tres anchos | La superposición medida (30 y 39 px) se lee como error |
| C02 | 1 | Campos de 16 px, 44 px táctiles, `text-size-adjust` | María prueba en su iPhone |
| C03 | 1 | Parcial: texto de Clara; Lo editas tú / Retícula / ES / EN; retícula grafito numerada sin relleno. **Sin** «Reunión →» ni «Notas» | Brief §3 y §8-3; D10 |
| C04 | 1 | Con D1: pie dentro de cada lámina, obra alineada abajo y corrida, indicador de Schipper, sin vuelta | Primera pantalla |
| C05 | 1 | Parcial: fuera las explicaciones del concepto; palabra enorme cortada pero «ARTISTAS» (D2); escondida «Libro» (D3); H1 solo para lectores | Copy §2 |
| C06 | 1 | Sí, junto con M01 | D12 |
| C07 | 1 | Reformulado: imagen en su columna, `absolute`; también al bajar en el iPhone (2.4.1) | Único hallazgo del recorrido |
| C08 | 1 | «Libro», rutas `#/encuentro/libro` (alias `archivo`), ediciones «Edición 01…» | Su palabra |
| C09 | 1 | En la versión de Clara: texto de muestra y aviso de decisión, **sin** procesos A y B; foto de la caja (M04) | No se le escribe el proceso a María |
| C10 | 1 | Reformulado (D19): mapa 41 × 9 en todos los anchos, sin imágenes en casillas, galería de registros debajo, contador que no pisa la ficha; **sin** cobalto en el próximo | D6, D19 |
| C11 | 1 | Vía copy; los corchetes pasan a texto de muestra con marca (8.1) | Autoría y terminación |
| C12 | 1 | Parcial: estilo de aviso (8.4.2), sin franja ni interruptor | D10 |
| C13 | 1 | Vía copy (2.13) | Criterio §7 de Tienda |
| C14 | 1 | Sí (4.15) | Un botón mudo parece roto |
| C15 | 1 | Rediseñada (8.2): grafito, en el flujo, sin cobalto ni blanco | Aprobada por Ramón |
| C16 | No | | Brief §8-3 y §10 |
| C17 | No | | Fuera del mapa (§3) |
| C18 | No | | Fuera del mapa (§3) |
| C19 | 1 | Sí, con original de 2.400, detalle por contraste y topes de peso (M02) | Peso en datos móviles; detalle nítido |
| C20 | 1 (Diego con Ramón) | `_headers` noindex y despliegue a `modulo369-maqueta.pages.dev` | OK de Ramón, brief §10 |
| C21 | No | Reemplazado por la regla de filas | D5 |
| C22 | 1 parcial | Grilla de 3 (D4); **sin** selector | D4 |
| C23 | 1 | Sí (4.23) | Criterio del brief §7 |
| C24 | 1 | Volver conserva posición y filtros (4.18) | Terminación: en el iPhone, perder el lugar en 27 obras se siente roto |
| C25 | 1 parcial | Filtros plegados a 390; **sin** el zigzag (manda 1.4) | Primera obra más arriba |
| C26 | 1 | En el flujo, animado (D8, 1.7.i) | Sin capa fija |
| C27 | No | Reemplazado por D6 | Estados en cobalto lo vuelven código |
| C28 | 1 | Vía copy | |
| C29 | No | | Fuera del mapa |
| C30 | No | | Sin panel simulado |
| C31 | 1 reformulado | Tapas e interiores como imágenes generadas (M03), no CSS | P16, D16 |
| C32 | No | | Pregunta §9-3 abierta; fuera del mapa |
| C33 | 1 | Dentro de M01 (recetas nuevas para A, B y C) | Rothko borroso, azul que compite |
| C34 | 1 | Favicon y `apple-touch-icon` (M06) | La pestaña del iPhone es parte de lo terminado |
| C35 | 1 | D7 y 1.2 | La serif no tiene trabajo |
| C36 | 1 | Escala de 6 (1.3); **sin** `.vacio{36vh}` | El vacío es el de arriba y el de entre filas |
| C37 | 1 parcial | Dos imágenes y miniaturas (2.5); botones (D9); **sin** vista de sala ni reverso | Brief §4 y §7 |
| C38 | 1 | Title por vista, `lang`, `aria-live`, `h1` de Encuentro, foco al `h1`, «Ir al contenido» (4.18) | VoiceOver en el iPhone; terminación |
| C39 | 1 | Gris `#5E5A53`, sin `viewport-fit=cover`, nada bajo 12 px | D13 |
| C40 | 1 | Foto de taller de A (M05) y «Proceso» en Activar vía copy | Viñetas de su mapa |
| C41 | No | | Necesita fotos con licencia y OK; el inicio negro reabre la dirección |

---

## 10 · Orden de construcción, cortes y cómo se verifica

### 10.1 · Orden (sobre `styles.css`, `app.js`, `index.html` en `claude/maqueta-v2`; `?v=N` sube en cada archivo tocado)

1. **Media primero** (es lo que más pesa en la terminación y corre solo): M01 (27 obras), M02 (variantes y detalles), M03, M04, M05, M06. Mirar la hoja de contacto antes de seguir.
2. **Base:** tokens (§1), fuentes sin la serif, escala, retícula, `filas()`, tokens de movimiento y 1.7.2, `@media (hover:hover)`. Sacar los estilos en línea con valores sueltos.
3. **Global:** barra de aviso, cabecera anclada, menú en el flujo (1.7.i), pie, ES / EN con `lang`, titles, favicon, marca de muestra (8.1), 1.7.a y 1.7.b.
4. **Inicio** (2.1) y **Ficha** (2.5, estados y avisos): lo primero que María va a tocar.
5. **Obras** (muro, filtros, Índice sin hallazgo), **Artista**, **Artistas**, **Tienda**.
6. **Encuentro, Libro, encuentro activado, Activar.**
7. **Acerca, Ediciones, Edición, Contacto, 404**, formularios con validación propia.
8. **«Lo editas tú»** y **Retícula** (§8). **Hallazgo del Índice** (2.4.1). C24.
9. Nivel 2: 1.7.c (obra compartida), 1.7.o (contador), 1.7.q (detalle en hover), «Más de la artista» en la ficha.
10. Despliegue con Ramón (C20). Después, Javiera.

### 10.2 · Si no alcanza: qué se corta y en qué orden

Primero el nivel 2 entero; después 1.7.b (el cambio de vista queda instantáneo); después la activación del hallazgo al bajar (queda solo con puntero, y P17 obliga a que la caja de la fila muestre su obra fija a ≤ 1000). **Nunca se corta:** M01 a M05, la marca de muestra, cero corchetes, imagen en todos los slots, la composición de Inicio, Artista, Ficha, Encuentro y Libro, los cuatro estados de la ficha, los filtros que filtran. Todo corte se anota en `desvios.md`.

### 10.3 · Mediciones para el acta (Javiera)

Capturas a 1440 y a 500 (el mínimo que dibuja el headless); **390 se mide en la página** emulando 390 × 664 por CDP (`Emulation.setDeviceMetricsOverride`), nunca desde la captura. Esperar a que carguen las imágenes (red en reposo) antes de capturar.

| # | Qué | Pasa si |
|---|---|---|
| M1 | Scroll horizontal en las 14 vistas a 390, 768 y 1440 | `scrollWidth === clientWidth` |
| M2 | Superposiciones en reposo (P10) en Inicio, Artista, Obras, Ediciones, Encuentro, Libro y encuentro activado | Ningún par de rectángulos de imagen, pie o texto se cruza |
| M3 | Pliegue del inicio (2.1.3) | Controles ≤ 664 px a 390 × 664; obra, pie y controles visibles a 1440 × 900 |
| M4 | Palabra enorme (1.2.9) en ES y EN | Tinta de la A a ≤ 4 px de `c1`; la ventana corta la última S |
| M5 | Contador contra enlace vertical y contra ficha (2.8.1, 2.11.1) | El contador termina antes |
| M6 | Cobalto en la interfaz (D6, P6): elementos con `color`, `background-color` o `border-color` cobalto computado, por vista | 1 en Inicio, Encuentro y encuentro activado; 0 en las demás |
| M7 | Búsqueda en `styles.css` y en `style=""` de `app.js` e `index.html` (propiedades CSS, no métodos de JS) | 0 `position: fixed` fuera de `.reticula`; 0 `sticky`; 0 `box-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`; `transform` solo en reglas de `:hover`, `:active`, estados ocultos o abiertos y `@keyframes`, y en la página ningún elemento visible en reposo con `transform` computado distinto de `none` (1.6.4); 0 `#fff`, `white`, `rgb(255,255,255)`; 0 hex fuera de los seis tokens; 0 `Instrument`; 0 `italic`; 0 `border-radius` ≠ 0; 0 `transition: all`; tamaños de letra solo de la escala; duraciones solo 150, 300, 400 ms (y 40 / 70 ms de 1.7.i y 1.7.o) |
| M8 | Filas (1.4): sumar columnas de cada fila del muro sin filtros | 9 filas que suman 9 a 1440; ciclo de 1.4.1 a 768 y 390 |
| M9 | Bordes de las imágenes de relleno (M01, M03, M04) | Distancia RGB ≥ 20 al hueso en todas |
| M10 | Caja del `img` en láminas y ficha (4.17) | Su proporción coincide con la natural (± 1%) |
| M11 | Campos y `select` a 390 | `font-size` computado 16 px; alto ≥ 44 px |
| M12 | Áreas táctiles (4.25) | Todo lo interactivo ≥ 44 × 44 px a 390 |
| M13 | Retícula (8.3.4) | 9/6/3 columnas numeradas; obras sin cambio de color |
| M14 | Peso (M02) | Sin JPG de 1.600 en `#/obras` a 390 DPR 3; topes de M02 |
| M15 | Fuentes | Solo Archivo e IBM Plex Mono en `document.fonts`, estado `loaded` |
| M16 | Corchetes visibles (T1, P24) | `/\[[^\]]*\]/` sobre `document.body.innerText` = 0 en las 14 vistas, en ES y en EN, con «Lo editas tú» apagada y encendida; 0 «Lo escribe» / «Written by» |
| M17 | Imágenes (T2, P25) | Todo `img` con `complete && naturalWidth > 0`; 0 `.marcador-img`; 0 elementos con fondo `--hueso-2` sin `img` dentro |
| M18 | Marca de muestra (8.1) | Por vista, cantidad de `.pendiente` = cantidad de marcas visibles; su texto es «muestra» en ES y «sample» en EN |
| M19 | Movimiento reducido (1.7.2) | Con `prefers-reduced-motion: reduce` emulado: `transition-duration` computado 0 s en los elementos del catálogo, sin View Transitions, `scrollTo` sin `smooth` |
| M20 | Movimiento normal (1.7) | En una muestra por fila del catálogo, `transition-duration` y `transition-timing-function` computados coinciden con su token |
| M21 | Cobalto en imágenes | 0 píxeles a distancia ≤ 12 de `#1F3BD6` en `img/` |
| M22 | Mapa del Libro | 41 columnas × 9 filas a 390, 768 y 1440; números visibles solo a ≥ 1001 |
| M23 | Nada pegado al bajar (brief §7) | Bajando por Inicio, Obras y Artista, 0 elementos `fixed` o `sticky` con la retícula apagada |
| M24 | Lado a lado (T8) | Inicio ↔ `07-escat-home-1440-v0` y `02-prodn-portfolio-1440-v0`; Artistas ↔ `05-schipper-artistas-1440-v0`; Artista ↔ `06-kurimanzutto-artista-1440-v0` y `01-studio-iron-coleccion-1440-v1`; Obras ↔ `02-prodn-portfolio-1440-v1`; Ficha ↔ `03-quatrieme-proyecto-1440-v0`; Encuentro ↔ `04-taradash-home-1440-v0`; Libro ↔ `03-quatrieme-home-1440-v0`; y las mismas a 500. Javiera escribe, por par, si la v2 se lee como sitio en producción y qué le falta |

---

## 11 · Detector anti-slop corrido sobre esta spec (5-oct)

**`anti-ai-slop.md`, checklist completo:**
- Acento no índigo: el cobalto está cerca en tono (231° contra 239°); se separa por oscuridad y escasez, y por eso su lista es cerrada (D6). **Abierto con justificación.**
- Tarjetas: no hay tarjetas; las obras son imágenes planas con pie. No queda ninguna caja de marcador. ✓
- Franja lateral: fuera (P18). ✓
- Emoji: ninguno (P20). ✓
- Modo claro: por el brief. ✓
- Lienzo crema (patrón #4): **el hueso es crema.** Justificación: es restricción de la clienta (rechazo escrito al blanco intenso de Perrotin) y el producto es una galería, el caso cultural que el propio detector exceptúa. Lo que sí delataba el #4 se quitó: la serif itálica de adorno (D7) y los acentos tierra en la interfaz (el único acento es un azul saturado). Los tonos tierra viven solo dentro de las obras de relleno. **Abierto con justificación.**
- Palabra destacada con otro color: la I en cobalto **es** una letra en color. Justificación: disrupción pedida por escrito por la clienta, con rol escrito, tres veces en todo el sitio y nunca en un titular para «dar gusto». **Abierto con justificación.**
- Rasgos filosos preservados (tell #7): los seis de PRODn están en el encabezado, 1.4 y P3; su blanco pasa a hueso por la clienta, no por promedio. ✓
- Roles de token (tell #8): cada token con «dónde no» (1.1); el cobalto ya no hace de foco ni de hover. ✓
- Media (tell #9): todo slot con imagen generada y marcada; la tapa de CSS y el marcador gris se sacaron (D16, P16, P25). ✓
- Movimiento por defecto (`transition: all .3s ease`, aparición al bajar): fuera; tres duraciones con fuente en el CSS de las referencias (D18). ✓
- Mayúsculas con tracking (1.2.8). ✓
- Prueba de captura y «puedo explicar cada decisión»: §0.2 y §2 dicen el porqué de cada una. ✓

**`antislop-web.md`:**
- A · Copy: esta spec no escribe copy; lo que necesita va a §12 para Clara. Prosa de la spec revisada: sin verbos de folleto, sin rayas, sin Title Case. ✓
- B1 · Tres iguales: las tres artistas van del mismo ancho **a propósito** (D4) y sin caja; las diferencian sus proporciones. Las tres tapas son objetos distintos (D16). **Abierto con justificación** (artistas).
- B6 · Hero de una pantalla: el primer viewport del inicio es casi todo obra, como pidió María («que lo primero que se vea sea obra a gran tamaño»), y no está centrado: la obra va corrida a un borde. La continuación la invitan el indicador y la lámina siguiente que se puede deslizar. **Abierto con justificación.**
- B7 · Orden de secciones: el del mapa de María. ✓
- C2 · Valores por defecto: radio 0, sin sombra, sin `transition: all`, espaciado con módulo propio, tiempos con fuente. ✓
- C3 · Degradé-mancha y vidrio: prohibidos (P4). El subrayado que se dibuja usa `background-size` de una línea de 1 px, no un degradé decorativo. ✓
- C5 · `alt`: todos dicen qué se ve y que es relleno (3.1.16). ✓
- C6 · Foco, contraste, labels: 4.13, 1.1.7, 4.8. ✓
- C7 · Peso: dos familias, variantes con topes, `width` / `height`, primera lámina `eager`. ✓
- D · Logo tapado: tapando la marca, el primer viewport es una obra corrida al borde de una retícula que se ve en la cabecera anclada; no es la plantilla de una tienda. Rubro cambiado: la regla de filas, el contador 001/369 y el mapa de 369 no calzan con una inmobiliaria. ✓

---

## 12 · Lo que esta spec le pide a Clara (para `copy-muestra.md`)

1. **Controles del carrusel:** el «01 / 05» de copy §5-1 se dibuja como indicador de cinco números con raya (2.1.2). Cada número necesita `aria-label` («1 de 5» / «1 of 5»).
2. **Marca de muestra:** «muestra» / «sample», en minúscula (8.1). Si prefiere otra palabra, que sea una sola y corta.
3. **Aviso de la foto opcional, en dos versiones:** para Artista A (tiene foto): que diga que es opcional y que si no hay, el espacio no aparece; para B y C (no tienen): que diga que esa artista no tiene foto y por eso el espacio no aparece. Reemplaza el aviso único de copy vista 3.
4. **`alt` y pies de las imágenes nuevas**, todos con «de relleno» o «de muestra»: tapas («Portada de relleno: Edición 01»), interiores («Páginas interiores de relleno: Edición 01, 1 de 2»), caja («Foto de muestra de la caja Encuentro»), registros («Registro de muestra: encuentro 001»), taller («Foto de muestra del taller de Artista A»); y los pies visibles «Caja Encuentro», «Registro · encuentro 001», «Taller · Artista A».
5. **Rótulos de las miniaturas de la ficha:** «01 Vista general» / «02 Detalle» (copy dice «Vista general · Detalle»; la numeración mono es de Quatrième).
6. **Precio de muestra (estado 1) y precio de la caja:** sin cifras (P14, P26). Una frase de muestra que se lea como dato terminado.
7. **Pregunta del formulario de Activar** de muestra (reemplaza el corchete de copy §4.5), sin proponer un uso de la caja que María no describió.
8. **Fila «Activados» del Libro:** rótulo «Activados» / «Activated» y el lugar de muestra de cada uno de los siete (sin lugares reales identificables, P26).

---

## 13 · Límites de esta spec

- **Sin los bocetos de María** (brief §10, §9-2): Inicio, Artistas, Encuentro y Libro se compusieron contra la descripción de `BRIEF.md` y los referentes; se comparan con sus originales en la reunión.
- **390 no se puede dibujar** en el headless: las medidas a 390 son cálculos con los anchos reales de fuente (1.2.9, 1.2.10) y la retícula de 1.3.9; Javiera las mide en la página (10.3).
- **El hallazgo de Escat** está verificado en su código, no en una captura (referencias §8).
- **Las recetas de §3 son pruebas**, no las 27 obras finales ni las 18 imágenes nuevas: Diego las corre con los parámetros de la tabla y la hoja de contacto decide.
- **Los tiempos de movimiento** salen del CSS publicado de las referencias el 5-oct; no se midió su comportamiento en pantalla.
- **View Transitions** en Safari de iPhone requiere iOS 18; con uno anterior el cambio de vista es instantáneo, y está bien.

---

## 14 · Historial de correcciones

| Fecha | Qué se corrigió | Regla o preferencia | Quién lo pidió |
|---|---|---|---|
| 26-sep-2026 | Dirección retícula 3·6·9 con los tokens de la v1 | Regla (no se reabre por iniciativa interna, brief §8-5) | Ramón |
| 26-sep-2026 | Nada fijo que ensucie las fotos al bajar (P1, P2) | Regla | María (sobre Escat) |
| 26-sep-2026 | Sin tanto blanco intenso (P5) | Regla | María (sobre Perrotin) |
| 26-sep-2026 | Artistas con obra, no con foto (P13) | Regla | María (sobre Kurimanzutto) |
| 5-oct-2026 | La retícula es herramienta de maqueta, no tiñe ni va a producción (8.3, P22) | Regla | Brief §8-4 (Ramón) |
| 5-oct-2026 | Capa «Lo editas tú» sí; panel simulado y páginas de reunión no (8.2, P23) | Regla | Ramón, brief §10 |
| 5-oct-2026 | **Terminación:** la v2 es una propuesta casi terminada al nivel de los referentes de la cotización; el trabajo grueso de diseño es de SpindleLab (§0.1, T1 a T8); sin corchetes en pantalla y sin posiciones de imagen vacías o grises (P24, P25, P26); relleno regenerado (M01 a M05); sistema de movimiento (1.7) | Regla | Ramón, brief §10 |
| 5-oct-2026 | Spec reescrita desde cero con la vara nueva: D1 a D21 | Las de §7 son regla; el resto, preferencia de esta obra hasta que María opine | Lucía |
