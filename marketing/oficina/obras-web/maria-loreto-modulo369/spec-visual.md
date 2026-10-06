# Spec visual · María Loreto Hernández · Módulo 369 · maqueta v2 · dirección: retícula 3·6·9

> El contrato visual de la v2. Lo escribe Lucía (`/web-direccion-arte`, paso 5). **Versión 2, 5-oct-2026 (noche): reemplaza entera la versión con PRODn dominante** (queda en git, commit `b7393c4`), porque Ramón cambió la referencia dominante a Studio Iron para toda la maqueta (brief §10, segunda corrección, **regla**). Diego construye contra esto; Javiera audita contra esto, ítem por ítem: cada regla tiene número. Una corrección que no termine escrita acá vuelve en la pasada siguiente.
> **Revisión 2.1, 5-oct (noche):** corrige los 14 defectos de fidelidad a Studio Iron y los 11 de contrato de las dos auditorías independientes. Qué cambió, qué se ajustó y por qué está en §15. Donde fidelidad y contrato chocaron, ganó el contrato.
> **Jerarquía de documentos:** `brief-de-obra.md` (alcance) > esta spec (visual) > `copy-muestra.md` (texto de muestra) > `copy-secciones.md` (texto fijo, avisos, capa «Lo editas tú») > `referencias.md` (lock, versión 2) > `diagnostico-maqueta-v1.md`. Los textos que esta composición necesita y todavía no existen están en §12 («Slots de copy nuevos o cambiados»). El orden de obra para Diego está en §13.

**Referencia dominante:** Studio Iron, todo el sitio (https://www.studio-iron.com/; mapeo página por página en `referencias.md` §2; medidas en `referencias/studio-iron/`).
**Rasgos que se preservan** (lock en `referencias.md` §1): (a) cromo de una línea en tres zonas, sección actual subrayada; (b) marca tipográfica serif, primera palabra en itálica, y en la portada de escritorio la marca de borde a borde con la foto que sube por encima de ella; (c) hero de una sola imagen a sangre, sin nada encima; (d) enunciado en serif mayúscula enorme y centrado; (e) tarjeta con la celda 4:5 llena, pie de una línea (título sans | AUTOR serif) y apilado a 390; (f) grilla de colección uniforme de 3 por fila, 2 a 390; (g) página de autor con hero, nombre en itálica grande, grilla, mitades a sangre, obra sola y cita; (h) ficha de obra con imágenes apiladas y cartela al costado; (i) bandas de foto a sangre y bloques partidos 50/50; (j) páginas de evento y de texto en columna centrada; (k) pie oscuro con titular serif con itálicas; (l) menú de 390 con ítems serif enormes; (m) densidad: margen de 12 px, bloques que se tocan, una sola pausa con aire.
**Traducción fija** (sin promedio): blanco → `--hueso`; negro → `--grafito`; grises de borde (`#E2E2E2`, zinc) → `--linea` / `--gris`; relleno de carga → `--hueso-2` plano; `bookish` → **Instrument Serif** (recta e itálica); Albert Sans 500 → **Archivo** 500 (400 solo en párrafos de más de cuatro líneas); mayúsculas chicas espaciadas → **IBM Plex Mono** 12; la costura de 1 px entre tarjetas a 390 → `--costura`.
**Lo que no se toma nunca** (restricciones de María y del brief, por encima de la referencia): cabecera fija; panel de compra sobre la foto; barra «Add to bag» fija; texto pegado o montado sobre una foto; blanco; carrito, cuenta, búsqueda; newsletter como función; retratos.
**Qué sacrifica esta dirección:** la foto real de sala y de producto que hace a Studio Iron (no hay activos: la reemplaza una «vista en muro» generada, M07, que es más plana que una foto de estudio); el pie y las bandas en negro puro (pasan a grafito y a hueso); el texto blanco sobre la foto de los destacados (va debajo); la marca enorme en celular (Studio Iron tampoco la tiene); el ritmo con aceleración y scroll suave del hero; la regla de filas de la versión anterior y su «obra corrida» (ahora la disrupción de la imagen es la obra colgada fuera del centro del muro); el hallazgo del Índice de Escat.
**Medido para esta spec (5-oct, noche):** las capturas de los seis analistas (lista en `referencias.md` §7), miradas una por una; anchos de Instrument Serif, Archivo y Plex Mono en Chrome headless (`scratchpad/lucia-si/medir.html`: «MÓDULO 369» con MÓDULO en itálica mide 4,535em; mayúscula H = 0,72em; los cinco ítems del menú izquierdo a 13 px suman 260 px más 4 × 24 de calle); la receta de vista en muro probada en Pillow (`scratchpad/lucia-si/muro.py`, hoja `proto-muro.jpg`, seis obras M01 en tarjeta 4:5 y una lámina 3:2 con suelo).

---

## 0 · La vara de terminación y las decisiones de criterio

### 0.1 · Qué quiere decir «casi terminada» (regla de Ramón, brief §10, §6, §7)

La v2 es una propuesta de diseño al nivel de Studio Iron, no un esqueleto. Lo que quede después de la reunión es ajuste por opinión de María, **nunca diseño pendiente**. Un bloque está terminado, a 390 y a 1440, cuando cumple las ocho:

| # | Criterio | Cómo se mide (10.2) |
|---|---|---|
| T1 | **Texto:** ninguna instrucción entre corchetes ni «Lo escribe…» en pantalla; cada hueco con texto de muestra y su marca (8.1) | M16, M18 |
| T2 | **Imagen:** ningún slot vacío, gris ni marcador; cada celda de imagen llena (M07 en tarjetas) | M17 |
| T3 | **Tipografía:** solo la escala de 1.2, las tres familias cargadas, interlineados y tracking de la tabla | M7, M15 |
| T4 | **Composición:** cada bloque como en §2 en los tres anchos, sin superposiciones ni scroll horizontal | M1, M2 |
| T5 | **Interacción:** cada pieza con sus estados de §4 y área táctil ≥ 44 × 44 px a ≤ 1000 y, en cualquier ancho, con puntero grueso (`pointer: coarse`, 4.26) | M11, M12, M25 |
| T6 | **Movimiento:** el catálogo de 1.7 con sus tiempos, y apagado con `prefers-reduced-motion` | M19, M20 |
| T7 | **Carga:** cada imagen reserva su espacio y aparece con 1.7.a; nada salta | M10 |
| T8 | **Lado a lado:** junto a su página de Studio Iron (10.3), la vista se lee como el mismo sitio traducido a hueso y grafito | M24 (juicio escrito de Javiera) |

### 0.2 · Decisiones de criterio (con su porqué y su referencia)

**D1 · Studio Iron manda en todo; las secundarias solo donde no tiene respuesta o choca.** Quedan Kurimanzutto (obra, no cara; rol del color), el boceto de María (enlace vertical «Libro») y el mapa de 369 (propio). PRODn, Quatrième Étage, Taradash y Schipper se retiran; Escat y Perrotin quedan como contra-referencias (`referencias.md` §0 y §4).

**D2 · La cabecera de Studio Iron, en el flujo.** Una línea de tres zonas (menú a la izquierda, marca al centro, Tienda · Contacto · idioma a la derecha), 32 px a ≥ 1001 y 44 px a ≤ 1000, fondo hueso, sin borde, **que se va con la página** (María contra Escat). Reemplaza la cabecera anclada a columnas (Quatrième).

**D3 · Marca tipográfica: «MÓDULO» en Instrument Serif itálica + «369» en Instrument Serif recta, en mayúsculas.** Es el gesto de STUDIO (itálica) / IRON (recta). Sigue sin ser un logo (brief §8-6). Reemplaza la marca en Archivo + Plex Mono.

**D4 · Portada = la secuencia de Studio Iron con el carrusel de María como hero.** Marca enorme pegada **debajo** de la lámina (≥ 1001) → lámina a sangre → línea de pie y controles → enunciado → tira OBRAS → banda ENCUENTRO → «Libro» sola → tira ARTISTAS → texto de EDICIONES y su banda, que es lo último y toca el pie (como la banda Black Metal de la portada de Studio Iron) → pie. La única acción del inicio (abrir la obra del carrusel, brief §3) se mantiene; artistas, Encuentro y ediciones asoman.

**D5 · La lámina es una «vista en muro»: la obra entera colgada en un muro, a sangre, desplazada del centro.** Studio Iron abre con una foto a sangre de un objeto en su espacio, densa de borde a borde; la maqueta no tiene fotos, así que cada lámina se genera (M07) con la obra entera, grande, sobre un muro con luz de foto y un suelo, corrida a la izquierda o a la derecha según 2.1.1. La disrupción «imagen desplazada» de María vive ahí, y se ve también a 390 (cx 0,30 / 0,70). Nada se monta sobre la lámina: el pie y los controles van en una línea debajo.

**D6 · Cobalto: dos apariciones en todo el sitio, lista cerrada, siempre un trazo dentro de un elemento enorme, nunca estado de interfaz** (Kurimanzutto; Studio Iron no tiene acento). Inicio: **el punto final del enunciado**. Encuentro: la «/» del contador. Las otras doce vistas, incluido cada encuentro activado (que abre como la página de evento de Studio Iron, 2.11): cero. Sale la I de ARTISTAS (esa palabra enorme ya no existe).

**D7 · Tres familias: vuelve Instrument Serif, con itálica, en los roles de la serif de Studio Iron.** Marca, H1 de vista, títulos de tira y de banda, nombre de artista, título de obra (itálica), statement (itálica), menú de 390, titular del pie, autor en el pie de tarjeta. Archivo hace la interfaz y el cuerpo; Plex Mono, los rótulos espaciados y los números. Reemplaza D7 y P7 de la versión anterior («sale la serif»). La itálica solo existe en Instrument Serif y solo en los roles de 1.2.

**D8 · Menú a ≤ 1000: el panel de Studio Iron, en el flujo.** Al tocar el botón de dos rayas, bajo la cabecera se abre un panel hueso del alto de la pantalla con los siete ítems en Instrument Serif mayúscula de 36 px, centrados; «ARTISTAS ›» abre un subnivel con miniaturas de obra. No es `fixed`: como la cabecera solo está arriba de la página, el panel ocupa la pantalla igual que en Studio Iron sin quedar pegado sobre nada al bajar.

**D9 · Ficha: la ficha de obra de `/art` de Studio Iron.** Imágenes apiladas a la izquierda, todas al mismo ancho y sin tope de alto (vista general y detalle: el cambio de escala), cartela a la derecha a ≈ 67 px de la imagen con ARTISTA, título en itálica con el año tras la coma, técnica y medidas en líneas sueltas sin rótulo, y la acción en un **botón-fila** (la fila de compra de la ficha de producto: acción a la izquierda, valor a la derecha, **clara en reposo** y grafito solo con hover o foco). Los cuatro estados del brief §4 caben en el mismo botón-fila; **una sola fila de acción por ficha**.

**D10 · Tres cosas pegadas permitidas, ninguna encima de una foto.** (1) La marca enorme del inicio queda pegada **debajo** de la lámina y la lámina la tapa al bajar. (2) La cartela de la ficha queda pegada **al costado** de las imágenes, en su propia columna. (3) La columna de texto de un bloque partido (y de Acerca) queda pegada **al costado** de su imagen, en su propia mitad, como en los edits y el About de Studio Iron. Las tres solo a ≥ 1001, (2) y (3) solo si caben enteras en la ventana (1.6.3), y con criterio de QA (M23). El brief §7 prohíbe lo fijo o pegado **encima** de una imagen de obra; lo que María rechazó de Escat son letras que ensucian la foto, y aquí ninguna letra pasa sobre una foto. En el iPhone de María no hay nada pegado. Es la única relajación de la P1 anterior y es lo primero que se corta si María lo lee como Escat (13.6).

**D11 · La celda de imagen siempre llena; la obra nunca recortada.** En toda tarjeta (Inicio, Obras en muro, Tienda, Artistas, Artista) la imagen es la vista en muro 4:5 de la obra (M07): la obra grande (caja de 0,80 × 0,74 de la celda) y lo que queda fuera es muro, no obra. En la ficha, en la Lista de Obras y en la «obra sola» de Artista la obra va plana, entera, sin muro. Las fotos de objeto (caja, registros, interiores) sí se recortan en bandas y franjas. Un detalle de obra solo se recorta si está declarado como detalle (rótulo y `alt`).

**D12 · Grilla uniforme en vez de regla de filas.** Las grillas de tarjetas van de 3 por fila a ≥ 621 y de 2 por fila a ≤ 620, pegadas de borde a borde con la costura de 1 px, como la colección de Studio Iron; la última fila queda abierta a la izquierda. Sale la regla de filas de PRODn (1.4 anterior) y su código `filas()`. Obras a ≥ 1001 abre en **Lista** (una obra por fila, la sección Art de Studio Iron, 2.4.1); la grilla es su vista MURO.

**D13 · Retícula 3·6·9 con el margen y la calle de Studio Iron: 12 px a ≥ 621; a ≤ 620, 12 para el texto y el cromo y 1 px para las imágenes.** Con 9 columnas a 1440, `c1-3` mide 464 px, exactamente la celda de Studio Iron; con 6 a 768, `c1-2` mide 240, también exacta. A 390 las 3 columnas se usan para el texto y el cromo; las grillas de tarjetas van de a 2 de borde a borde con `--costura` (2 × 194, Studio Iron 2 × 193,5) y la tira de a 3 (129 px, sin asomo). La media de 177 px queda solo para el subnivel del menú (2.0.4), que es donde Studio Iron la usa. Las mitades a sangre (bloques partidos) se anclan al centro de la ventana, que cae en el eje de `c5` a 9 columnas. Así el 3·6·9 sigue siendo la retícula y las medidas son las de la referencia (1.3).

**D14 · Pie del sitio en grafito.** Es el rasgo oscuro de Studio Iron traducido al token; es la única superficie oscura del sitio (cambia la regla anterior «grafito no es fondo»). No es blanco y no está fijo; a María «no le molesta» el inicio negro de Schipper. Sin newsletter: el titular invita a escribir y lleva a Contacto.

**D15 · Bandas y bloques partidos sin texto encima.** Studio Iron monta título y párrafo en blanco sobre sus destacados, con degradé y pegados al centro de la pantalla. En Módulo 369 el texto va **debajo** de la banda (ENCUENTRO en el Inicio), **arriba** de ella cuando la banda cierra la página (EDICIONES en el Inicio) o **al lado** en la otra mitad (bloques partidos), siempre sobre hueso; a ≥ 1001 la columna del bloque partido puede quedar pegada a su costado (D10-3), nunca encima.

**D16 · Movimiento de Studio Iron: casi nada, rápido y seco.** Cambio de vista instantáneo con fundido de cada imagen (sale View Transitions); hover de tarjeta con filo de 1 px instantáneo; subrayado que crece en 400 ms; paneles en 300 ms; carruseles con scroll nativo. Nada se anima al bajar.

**D17 · Marca de muestra** (sin cambio): el texto de muestra se lee en su color normal y lleva «muestra» / «sample» en Plex Mono 12 gris, levantada, al final del bloque (8.1).

**D18 · Gris** `#6B675F`, **el token de la v1** (`git show main:maqueta/styles.css`): 4,69:1 sobre hueso, pasa AA en todos sus usos (nunca va texto gris sobre `--hueso-2`). La versión anterior de esta spec lo daba como «#5E5A53 (sin cambio)», que era un cambio de token sin aprobación registrada (brief §6 y §7: solo los tokens de la v1). `#5E5A53` (5,71:1) queda como **propuesta pendiente del OK de Ramón** (§15); si lo aprueba, es un cambio de una línea en `styles.css` y de las cifras de contraste.

**D19 · Libro: el mapa de 369 en 41 × 9** (sin respuesta en Studio Iron; se conserva), y debajo el índice de eventos de Studio Iron: el último encuentro destacado a sangre y los demás en dos columnas.

**D20 · «Lo editas tú», Retícula y aviso global** (sin cambio de concepto, §8). ES / EN pasa de la barra de aviso a la cabecera, porque es del sitio y no de la maqueta.

**D21 · Obras: filtros con el vocabulario de Studio Iron.** Studio Iron no filtra; el brief §7 exige cuatro filtros combinables con conteo y estado vacío. Artista se filtra con celdas de miniatura de obra (el menú Design); técnica, tamaño y disponibilidad con opciones de texto que se subrayan como la navegación. La vista Índice con hallazgo (Escat) sale; la vista **Lista** de `/art` entra en el nivel 1 como vista por defecto de Obras a ≥ 1001 (2.4.1).

**D22 · Disrupciones de María, vista por vista** (brief §7; el acta de QA dice cuál, **a 1440 y a 390**, porque 390 es el ancho en que María la juzga):

| Vista | Disrupción | ≥ 1001 | 390 (medida propia) |
|---|---|---|---|
| Inicio | Palabra enorme | MÓDULO 369 de borde a borde, 21,2vw (≈ 305 px) | **No se declara a 390.** No existe a ≤ 1000 (Studio Iron tampoco la tiene en celular); meterla en el flujo rompería el pliegue de 2.1.2. A 390 el Inicio cumple el mínimo con las otras tres |
| Inicio | Imagen desplazada | La obra fuera del centro del muro de la lámina 16:9, cx 0,30 / 0,68 (2.1.1) | La obra en cx 0,30 / 0,70 de la lámina 4:5, ancho ≤ 0,56 (≈ 218 px): su centro queda a ≈ 78 px del eje de la pantalla |
| Inicio | Color que desentona | El punto final del enunciado en cobalto (enunciado de 7vw ≈ 101 px) | Igual, en el enunciado de 12vw (≈ 47 px), en el segundo viewport |
| Inicio | Palabra casi escondida | «Libro», 12 px gris, sola en una fila de 48 px | Igual, al borde derecho de `c3` |
| Artista | Cambio de escala | Nombre en itálica de 5,6vw (≈ 80 px) contra pies de 12; detalle de su obra a sangre en 21:9 | Nombre en itálica de **48 px** contra pies de 12 (4 veces); detalle a sangre 5:4 |
| Ficha | Cambio de escala | El detalle al mismo ancho que la obra entera (781 px) | El detalle a sangre (390), en la misma caja que la vista general (M02) |
| Encuentro | Cambio de escala + color | Contador de 200 px (756 de ancho) con la «/» en cobalto; enlace vertical «Libro» | Contador de 72 px (272 de ancho, el 70% de la pantalla) con la «/» en cobalto; «Libro» vertical al borde derecho |

---

## 1 · Tokens (cada uno con su rol; un valor sin rol no es un token)

### 1.1 · Color (los seis de la v1; ninguno nuevo)

| # | Token | Valor | Rol exacto | Dónde NO se usa |
|---|---|---|---|---|
| 1.1.1 | `--hueso` | `#EEEAE2` | Lienzo: `html`, `body`, barra de aviso, cabecera, paneles de menú, fondo del botón contorno, texto del botón lleno, **texto del pie del sitio**, chip de la retícula; `theme-color` | Nunca alrededor de una obra como caja |
| 1.1.2 | `--hueso-2` | `#E4DFD4` | Solo el fondo de una imagen mientras carga (1.7.a) | Paspartú, tarjeta, sección, campo, botón, hover, casilla del Libro, marcador |
| 1.1.3 | `--grafito` | `#1B1B19` | Texto principal y de muestra; **fondo del pie del sitio (única superficie oscura, D14)**; fondo del botón lleno (solo enviar formularios) y del botón-fila **en hover, foco y toque**; filo de hover de tarjeta y miniatura; segmento activo de paginación; subrayado de sección actual; foco; casilla activa del Libro; «Lo editas tú»; líneas de la retícula; `::selection` | Fondo de cualquier otra sección, banda o bloque; fondo del botón-fila en reposo |
| 1.1.4 | `--gris` | `#6B675F` (token de la v1, D18) | Texto secundario: marca «muestra», avisos de maqueta, estados Vendida y Colección privada, vía de compra en Tienda, rótulos de grupo de filtros, conteos, «Libro» escondida, rótulos de imagen de la ficha, flecha deshabilitada, hover del título de tira, borde inferior de campo en reposo, **borde de la casilla vacía del Libro** | Cuerpo de texto; sobre grafito; sobre `--hueso-2` (4,24:1) |
| 1.1.5 | `--linea` | `#D3CCBE` | Separadores de 1 px: borde de las flechas cuadradas, de las preguntas, **del botón-fila en reposo** (no es lo que identifica el control: lo identifican su etiqueta y su flecha, como en Studio Iron), borde inferior de la barra de aviso, segmento inactivo de paginación; **sobre grafito:** texto secundario del pie, línea del enlace del pie y hover de sus enlaces (10,8:1) | Texto sobre hueso (1,33:1); contorno de botón contorno; borde de un gráfico que hace falta para entender el contenido (casillas del Libro) |
| 1.1.6 | `--cobalto` | `#1F3BD6` | Lista cerrada (D6): el punto final del enunciado del inicio; la «/» del contador en Encuentro | Todo lo demás, incluidos el encuentro activado y las imágenes de relleno (M21) |

1.1.7 · Contrastes medidos (WCAG, 5-oct): grafito/hueso 14,38:1 · gris/hueso 4,69:1 · gris/hueso-2 4,24:1 (por eso nunca hay texto gris sobre hueso-2) · hueso/grafito 14,38:1 · línea/grafito 10,8:1 · línea/hueso 1,33:1 · cobalto/hueso 6,59:1.
1.1.8 · Cero blanco en la interfaz: ningún `#fff`, `white` ni `rgb(255,255,255)`. El papel y el muro dentro de una imagen de relleno son contenido, pero **siempre más oscuros que el hueso** y a distancia ≥ 20 de él (M9); ninguna imagen a sangre lleva más del 25% de píxeles de luminancia ≥ 245 (M9c). Así el blanco que María rechazó no entra por las imágenes.
1.1.9 · `::selection { background: var(--grafito); color: var(--hueso) }`; `-webkit-tap-highlight-color: transparent`; `<meta name="theme-color" content="#EEEAE2">`.

### 1.2 · Tipografía

Familias (Google Fonts, `display=swap`, con `preconnect`): **Archivo** (variable, se usa a ancho 100%, pesos 400 y 500), **IBM Plex Mono** (400 y 500) e **Instrument Serif** (400 recta e itálica). Enlace único: `family=Archivo:wdth,wght@100..125,400..800&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap`. Pilas: `"Instrument Serif", "Times New Roman", serif` · `"Archivo", "Helvetica Neue", Arial, sans-serif` · `"IBM Plex Mono", ui-monospace, Menlo, monospace`.

**Cómo se tradujo la escala.** Instrument Serif es una serif condensada: a igual cuerpo su mayúscula es algo más alta que la de `bookish` (0,72em contra 0,664em; medido: H de 25,9 contra 23,9 a 36 px) y su palabra, 1,4 veces más angosta. En los tamaños grandes se iguala la altura de mayúscula **o se queda apenas por debajo** (la itálica de 30 de Studio Iron pasa a 26: mayúscula de 18,7 contra 19,9); en los chicos se sube un punto para que se lea (12 → 13). Archivo y Albert Sans miden casi lo mismo (12/500: 124 contra 128 px), así que el texto sans va **al mismo cuerpo que Studio Iron**: 12 a 15 px, peso 500 en todo texto corto. La terminación de Studio Iron sale de la serif enorme contra pies de 12 a 15; agrandar lo mediano la borra.

| # | Token | Familia y valores a ≥ 1001 · 621-1000 · ≤ 620 | Studio Iron | Se usa en | No se usa en |
|---|---|---|---|---|---|
| 1.2.1 | `--t-enorme` | Instrument Serif 400, **21,2vw** (≈ 305 px a 1440, 212 a 1001), interlineado 0,8, tracking 0, mayúsculas; MÓDULO en itálica. Solo ≥ 1001 | marca de 11,5vw de mayúscula, 97% del ancho | La marca enorme del inicio (2.1) | Cualquier otra cosa |
| 1.2.2 | `--t-enunciado` | Instrument Serif 400, **7vw · 9vw · 12vw**, interlineado 0,8, tracking −0,01em, mayúsculas, centrado, `text-wrap: balance` | 7vw / 12vw, 0,75 / 0,8 | El H2 del enunciado del inicio | |
| 1.2.3 | `--t-nombre` | Instrument Serif **itálica**, **5,6vw** (≈ 80 px a 1440) · **48 px** · **48 px**, interlineado 0,9, tracking −0,01em, caja normal | 5,6vw / 26 (a 390 se queda en 48 para que el cambio de escala exista en el iPhone, D22; contrato sobre fidelidad) | Nombre de la artista en Artista (H1) | |
| 1.2.4 | `--t-contador` | Plex Mono 400, **200 · 140 · 72 px**, interlineado 0,85, tracking −0,06em, `tabular-nums` | (propio) | Contador de Encuentro, **solo ahí** | Encuentro activado (2.11), conteos, paginación |
| 1.2.5 | `--t-banda` | Instrument Serif 400, **48 · 36 · 26 px**, interlineado 0,9, tracking −0,01em, mayúsculas | 48 / 26 | Títulos de banda del inicio (ENCUENTRO, EDICIONES); «Encuentro 007» destacado del Libro | |
| 1.2.6 | `--t-titulo` | Instrument Serif 400. Cuatro variantes: **mayúscula** **36 · 36 · 26**, interlineado 0,9, tracking −0,01em (H1 de vista, H1 «ENCUENTRO 001» del encuentro activado, titular del pie, nombre en Biografía, ítems del menú a ≤ 1000, siempre 36 en el menú); **itálica de título** **26 en todos los anchos**, caja normal, interlineado 0,95, tracking −0,01em (título de obra y de edición en la cartela y en la Lista, títulos de bloque partido); **itálica de cita** **36 · 36 · 26**, interlineado 0,95 (solo el statement de Artista); **recta** **36 · 36 · 26**, caja normal, interlineado 1,1 (H1 de páginas de texto: Activar, Acerca, Contacto, 404) | 36 / 26 caps; 30 itálica en ficha y bloques de edit; 38 itálica en la cita | Ver columna anterior | Botones, cuerpo |
| 1.2.7 | `--t-rotulo` | Instrument Serif 400, **20 px** en todos los anchos, interlineado 1,2, tracking 0, mayúsculas | 20 / 28 | Título de tira (OBRAS, ARTISTAS), H2 de las páginas de texto, nombre en la tarjeta de Artistas | |
| 1.2.7b | `--t-pie-evento` | Instrument Serif 400, **16 px**, interlineado 1,25, tracking 0, mayúsculas | bookish 15 | Título de cada par de encuentros del Libro («ENCUENTRO 006») | |
| 1.2.8 | `--t-texto` | Archivo **400**, **14 px**, interlineado **1,6**, en todos los anchos; **a ≤ 620, 16/1,5 solo en Acerca y Biografía** | 14/1,6 (About, Shipping, evento, Biografía); 16 en About a 390 | Párrafos de más de cuatro líneas: páginas de texto (Activar, Contacto, Cómo se compra, Historia y proceso, Preguntas), Biografía, Acerca, cuerpo de evento, respuestas de preguntas | Texto corto, rótulos, campos |
| 1.2.8b | `--t-bajada` | Archivo **500**, **15 px**, interlineado 1,55 (≥ 621) · **14 px** / 1,55 (≤ 620) | 15 (14 a 390) | Párrafo del enunciado, bajadas de un H1 centrado (visión curatorial, presentación de Ediciones, bajada del Libro, descripción del encuentro activado), párrafo de banda, presentación de Preguntas | Párrafos largos |
| 1.2.8c | `--t-dato` | Archivo **500**, **13 px**, interlineado 1,5 (cartela) o 1,55 (descripción) | 13 datos; 12 descripción de bloque | Cartela: técnica, medidas (esa línea entera en Plex Mono 12 `tabular-nums`, 1.2.12), disponibilidad, precio, descripción de la obra o edición; descripción del bloque partido; resumen de preguntas a **14** | Párrafos de más de cuatro líneas |
| 1.2.8d | `--t-campo` | Archivo 400, **16 px** en todos los anchos (iOS no hace zoom) | 16 | Campos de formulario y su texto escrito; chip de obra cargada a 14 | Todo lo demás |
| 1.2.8e | Botón-fila | Archivo **500**, **13 px** (≥ 1001) · **16 px** (≤ 1000), interlineado 1, tracking 0,06em; etiqueta y valor en la **misma** letra | 13 / 500 / tracking 0,8 px | Botón-fila (2.0.13) | |
| 1.2.9 | `--t-interfaz` | **13 px**. Archivo 500, interlineado 1 (cabecera, enlaces del pie, opciones de filtro); **Instrument Serif 400 mayúscula, tracking 0,02em** (autor en el pie de tarjeta, ARTISTA en la cartela, «MÓDULO 369» en ediciones) | 13 nav; serif 12-14 | Ver columna anterior | Párrafos |
| 1.2.10 | `--t-chico` | **12 px**. Plex Mono 500, interlineado 1,4, tracking 0,04em (marca muestra, avisos, conteos, rótulos de imagen); `.etiqueta`: mayúsculas y tracking 0,08em (rótulos, estado y vía en el pie de tarjeta, fila de datos); `.etiqueta-ancha`: mayúsculas y tracking 0,15em (enlaces de acción, «FILTRAR», «‹ VOLVER», botón contorno, botón lleno, contador del carrusel). **Archivo 500 12 px, interlineado 1,2**: título en el pie de tarjeta y nombre bajo una miniatura | 8-12 | Ver columna anterior | Párrafos de más de una frase (salvo avisos) |

1.2.11 · **Escala completa, sin intermedios:** 12 · 13 · 14 · 15 · 16 · 20 · 26 · 36 · 48 · contador · y los tres proporcionales al ancho (enorme, enunciado, nombre a ≥ 1001). Cualquier otro `font-size` en `styles.css` o en `app.js` es un defecto. Sin `clamp()`: los valores cambian en los cortes de §5 o son vw por diseño (1.2.1 a 1.2.3).
1.2.12 · **Detalle tipográfico:** la itálica existe solo en Instrument Serif y solo en 1.2.1 (MÓDULO), 1.2.3, las dos itálicas de 1.2.6, la marca chica (MÓDULO) y las tres palabras en itálica del titular del pie; `font-synthesis: none`. Mayúsculas solo en Instrument Serif mayúscula (tracking 0 o negativo) y en `.etiqueta` / `.etiqueta-ancha` (tracking positivo), como Studio Iron. `text-wrap: balance` en H1, H2, títulos de tarjeta; `text-wrap: pretty` en párrafos; `hyphens: manual`. Números de datos (medidas, conteos, contadores, paginación) en Plex Mono `tabular-nums`. **Archivo 500 en todo texto corto** (cartela, pies, bajadas, descripciones); 400 solo en `--t-texto`. **Ancho de cada texto según su rol** (1.2.15), no un tope único. Justificado solo a ≥ 1001 y solo donde 2.x lo dice, con `text-indent: 2.25em`; a ≤ 1000 alineado a la izquierda (Studio Iron abre ríos a 390).
1.2.13 · **Marca enorme, medida:** «MÓDULO 369» con MÓDULO en itálica mide 4,535em (Chrome, 5-oct). A 21,2vw la tinta va de ≈ 1,5% a ≈ 98,5% del ancho (Studio Iron: 1,5% a 98,5%). Caja: interlineado 0,8 → unos 244 px a 1440. **Criterio:** con la Retícula encendida, la tinta de la M empieza a ≤ 6 px del borde izquierdo de `c1` y la del 9 termina a ≤ 6 px del borde derecho de `c9`; sin scroll horizontal.
1.2.14 · **Contador, medido** (sin cambio): «007/369» mide 3,78em: 756 px a 1440, 529 a 768, 272 a 390.
1.2.15 · **Ancho de texto por rol** (reemplaza el tope único de 464; Studio Iron usa un ancho por tipo de bloque):

| Rol | ≥ 1001 | 621-1000 | ≤ 620 | Studio Iron |
|---|---|---|---|---|
| Página de texto (Activar, Contacto, Cómo se compra, Historia y proceso, Preguntas, 404) | `c3-7` con `max-width: 704px`, centrada (x ≈ 368 a 1.072 a 1440) | `c1-6` con `--margen-texto` | `--margen-texto` | 704 (Shipping & Returns) |
| Texto de Acerca | Mitad derecha con `padding-inline: var(--e-9)` (≈ 612) | Debajo de la imagen, `--margen-texto` | `--margen-texto` | 600, a 72 px de la foto |
| Biografía, cuerpo y bajada de evento, bajada del Libro, visión curatorial, presentación de Ediciones | `max-width: 520px`, centrado (en su mitad, si es bloque partido) | igual | `--margen-texto` | 520 / 524 |
| Párrafo del enunciado | `max-width: 464px`, centrado | igual | `--margen-texto` | 438 |
| Descripción del bloque partido | `max-width: 320px` | igual | `--margen-texto` | 320 |
| Statement | La mitad menos `--e-4` a cada lado (≈ 672) | Debajo de la imagen, `--margen-texto` | `--margen-texto` | ≈ 710 |
| Cartela de la ficha y de la Lista | 464 (1.6.3 y 2.5) | `c1-4` | `--margen-texto` | 464 |
| Texto bajo una banda | `c1-3` (464) | `c1-3` (366) | `--margen-texto` | 540 |

### 1.3 · Espaciado y retícula (módulo de 6, el de 3·6·9)

| # | Token | Valor | Rol |
|---|---|---|---|
| 1.3.1 | `--e-1` | 6 px | Imagen → su pie; título → autor en el pie apilado; etiqueta → valor; padding lateral del pie de tarjeta (Studio Iron 6); padding vertical del carril de la tira |
| 1.3.2 | `--e-2` | 12 px | Margen y calle de la retícula (1.3.9); entre imágenes apiladas de la ficha; entre párrafos; título de tira → carril; pie de los pares del Libro |
| 1.3.3 | `--e-3` | 18 px | Padding de la cabecera y del panel Artistas a ≥ 1001; entre filas de la grilla de tarjetas; margen de texto a ≤ 620 |
| 1.3.4 | `--e-4` | 24 px | Padding del pie del sitio; entre ítems del menú izquierdo; enunciado: H2 → párrafo; margen de texto a ≥ 621; margen y calle de los pares del Libro y separación destacado → pares (Studio Iron 24); margen lateral del statement |
| 1.3.5 | `--e-6` | 36 px | Texto de un bloque partido → borde de su imagen; entre secciones de una página de texto; vacío arriba a ≤ 620; tira → banda |
| 1.3.6 | `--e-9` | 54 px | Vacío arriba a ≥ 621; padding del enunciado a ≥ 621; texto de banda → tira siguiente; `padding-left` de la cartela a ≥ 1001; padding superior y `top` pegado de la columna de texto de un bloque partido; `padding-inline` del texto de Acerca; **antes y después de un bloque de texto puro** (nunca entre dos bloques de imagen, C36) |
| 1.3.7 | `--e-16` | 96 px | Bajo el bloque de H1 centrado hasta la primera imagen (≥ 621; Studio Iron 92); última sección → pie |
| 1.3.8 | `--e-24` | 144 px | Pie del sitio: titular → columnas (≥ 621; Studio Iron 200) |

1.3.9 · **Retícula:** columnas 9 (≥ 1001) · 6 (621-1000) · 3 (≤ 620); **`--margen` 12 px y `--calle` 12 px en todos los anchos** (D13). Anchos de columna: 146,7 px a 1440 (cN empieza en `12 + (N−1) × 158,7`), 97,9 a 1001, 114 a 768, 114 a 390, 109 a 375. Anchos útiles a 1440: `c1-3` = `c4-6` = `c7-9` = **464** · `c1-5` 781 · `c2-8` 1.099 · `c1-9` 1.416. A 768: `c1-2` **240** · `c1-3` 366. A 390: `c1-3` 366 (texto y cromo); **media** = (366 − 12) / 2 = **177**, solo para el subnivel del menú (2.0.4); las grillas de tarjetas a ≤ 620 no usan la retícula de 12 sino la costura (1.3.15, 1.4.1): **2 × 194**, y la tira **3 × 129**.
1.3.10 · **Márgenes de texto:** `--margen-texto` 24 px (≥ 621) · 18 px (≤ 620). Lo usan los bloques de texto que no se anclan a columnas (texto bajo una banda a ≤ 620, menú, columna de la ficha a ≤ 620).
1.3.11 · **Vacío arriba** (de la cabecera al primer bloque): `--e-9` (≥ 621) · `--e-6` (≤ 620). **Excepciones:** Inicio, Artista, Acerca y la ficha a ≤ 1000 empiezan con su imagen pegada a la cabecera (Studio Iron).
1.3.12 · **Columnas de texto centradas:** las define el rol (1.2.15). Página de texto: `c3-7` con tope de 704 a ≥ 1001, `c1-6` con `--margen-texto` a 621-1000. Bajada: 520 centrada a ≥ 621. Las dos con `--margen-texto` a ≤ 620.
1.3.13 · Todo espaciado sale de estos tokens o de `--margen` / `--calle` / `--margen-texto`. Ningún valor suelto en `style=""`.
1.3.14 · Área táctil: `--tactil` 44 px (tamaño, no espaciado).
1.3.15 · **`--costura`: 1 px** (medida de Studio Iron a 390). Separación entre tarjetas de una grilla o tira a ≤ 620 y padding lateral de la grilla a ≤ 620. No es una línea: entre tarjeta y tarjeta se ve el hueso.

### 1.4 · Grillas y tamaños de imagen (reemplaza la regla de filas)

1.4.1 · **Grilla de tarjetas** (Obras en MURO, Tienda, Artista, Artistas): ≥ 1001, 3 por fila en `c1-3` · `c4-6` · `c7-9` (464 px a 1440); 621-1000, 3 por fila de 2 columnas (240 px a 768); **≤ 620, `grid-template-columns: 1fr 1fr; column-gap: var(--costura); padding-inline: var(--costura)`: tarjetas de ≈ 194 px en x = 1 y 196, de borde a borde** (Studio Iron: 2 × 193,5, calle de 1 px, `padding: 0 1px`). Fila a fila `--e-3`. La última fila queda abierta a la izquierda, sin regla de cierre (Studio Iron: 148 = 49 × 3 + 1).
1.4.2 · **Tira** (carrusel de tarjetas del inicio): a ≥ 621 el carril empieza en `--margen`, con calle 12; tarjetas de 464 (3 por vista) a ≥ 1001 y de `(100% − 2 × 12) / 2,5` a 621-1000 (asoma la tercera). **A ≤ 620: `grid-auto-columns: calc((100% - 2px) / 3); gap: var(--costura); padding-inline: 0; scroll-padding-inline: 0`: 129 px, 3 por vista, sin asomo** (Studio Iron: «< 520: 3 por vista sin asomo»), así la tira ARTISTAS muestra las tres artistas de una vez. Como a 390 ya no asoma nada, la señal de que se desliza son las flechas cuadradas de la línea de título, que existen en todos los anchos y se ocultan si todo cabe (2.0.8).
1.4.3 · **Mitades a sangre** (bloque partido, Acerca, Biografía): **solo a ≥ 1001**, 50/50 de la ventana, sin margen exterior y sin calle; el eje cae en el centro de `c5`. **A ≤ 1000 todo lo partido se apila** (Studio Iron apila bajo 1.024: «768 se comporta como 390»): imagen a sangre a su proporción y texto debajo con `--margen-texto`. Los pares del Libro van en dos columnas con `--e-4` de margen y calle solo a ≥ 1001; a ≤ 1000, uno por fila a sangre.
1.4.4 · **A sangre**: lámina, bandas, hero de Artista, obra sola, franjas de fotos, fotos de evento: ancho de la ventana, sin margen.
1.4.5 · **Proporciones fijas:** tarjeta 4:5 · miniatura 5:4 · lámina 16:9 (≥ 621) y 4:5 (≤ 620) · banda 16:9 (≥ 621) y 4:5 (≤ 620) · hero de Artista 21:9 (≥ 1001) y 5:4 (≤ 1000) · obra sola, ficha, Lista y edición: la de la imagen · **franjas de fotos 3:4** (Encuentro y Ediciones; Studio Iron: 3:4 en los dos edits) · **imagen de bloque partido de edit 1:1** (Encuentro y Activar; Studio Iron: 720 × 720 en la mayoría de los bloques) · Biografía y statement 4:5 · tapa 5:7 · Acerca 2:3 · destacado y pares del Libro 3:2 · foto de encuentro activado 3:2 (≥ 1001) y 5:4 (≤ 1000).
1.4.6 · **Nunca `object-fit: cover` sobre una obra.** `cover` solo en: vistas en muro (generadas a su proporción exacta), fotos de caja y registros, interiores de edición en banda y detalles declarados.

### 1.5 · Radios
1.5.1 · `border-radius: 0` en todo (Studio Iron: esquinas rectas en todo).

### 1.6 · Profundidad y capas
1.6.1 · **Sin profundidad de interfaz:** cero `box-shadow`, `drop-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`. Las sombras dentro de una imagen de relleno (la obra sobre el muro, la caja sobre la mesa) son parte de la foto.
1.6.2 · Líneas: grafito 1 px = estado (filo de hover, subrayado de sección actual, borde del botón, segmento activo); `--linea` 1 px = estructura chica (flechas, preguntas, borde del botón-fila en reposo, barra de aviso); `--gris` 1 px = borde de la casilla vacía del Libro (2.10.1). No hay líneas de sección (sale la fila de sección de la versión anterior).
1.6.3 · **Capas:** `.reticula` (`z-index: 50`, `fixed`, herramienta de maqueta); `.marca-enorme` (`position: sticky; top: 0; z-index: 0`, solo ≥ 1001) dentro de `.portada`, y la lámina, su línea de pie y todo lo que sigue a ella dentro de `.portada` con `position: relative; z-index: 1` y fondo hueso o imagen opaca; `.ficha-cartela` (`position: sticky; top: var(--e-4)`) y `.mitad-texto` (la columna de texto de un bloque partido y de Acerca: `position: sticky; top: var(--e-9); align-self: start`), las dos **solo a ≥ 1001 y solo con la clase `.pega`**, que pone el JS cuando el alto del elemento es ≤ `innerHeight − 2 × --e-9` (cartela: `innerHeight − --e-4`) y el de su imagen vecina es mayor que el suyo; el JS la vuelve a evaluar al cambiar el tamaño de la ventana, al abrir o cerrar un `<details>` y al mostrar un aviso al tocar dentro del elemento. Sin `.pega`, el elemento queda quieto, alineado arriba. Nada más tiene `z-index`, `sticky` ni `fixed`.
1.6.4 · `transform` solo en estados transitorios del catálogo 1.7. Ningún elemento visible en reposo con `transform` distinto de `none` (M7), **salvo las dos rayas del botón de menú abierto**, que forman la X.

### 1.7 · Movimiento

**Tokens** (sin cambio de valor; ahora con respaldo en Studio Iron):

| Token | Valor | Para qué (Studio Iron) |
|---|---|---|
| `--m-1` | 150 ms | Colores y opacidades de hover (ENQUIRE, título de tira, flechas: 150-200 ms) |
| `--m-2` | 300 ms | Paneles y apariciones (menú de 390 300 ms; carrusel 300 ms; fundido de imagen 500 ms) |
| `--m-3` | 400 ms | Subrayado que crece (400 ms) |
| `--curva-salida` | `cubic-bezier(0, 0, .2, 1)` | Lo que aparece (Studio Iron usa `(.22,.61,.36,1)` en el subrayado: misma familia de salida) |
| `--curva-mov` | `cubic-bezier(.4, 0, .2, 1)` | Lo que se mueve (Studio Iron: menú, flechas, botones; es su curva exacta) |

**Catálogo** (lo que no está acá, no se mueve):

| # | Qué | Disparador | Propiedad · duración · curva | Con `prefers-reduced-motion` |
|---|---|---|---|---|
| 1.7.a | Aparición de imagen | Termina de cargar un `img` | `opacity` 0 → 1 · `--m-2` · salida, sobre `--hueso-2` | Sin transición |
| 1.7.b | Cambio de vista | Navegación por hash | **Instantáneo** (Studio Iron): la vista se reemplaza, vuelve arriba, el foco va al `h1`; cada imagen entra con 1.7.a. Sin View Transitions | Igual |
| 1.7.c | Carrusel de la portada | Dedo (scroll nativo, `scroll-snap`), flechas, teclado | `scrollTo({behavior:'smooth'})`; el contador cambia al llegar; flecha: `border-color` línea → grafito en hover `--m-1` mov | `behavior: 'auto'` |
| 1.7.d | Tira | Dedo, flechas (todos los anchos) | Avanza una tarjeta con `scrollBy` smooth; título de tira: `color` grafito → `--gris` en hover `--m-1` mov (4,69:1; la opacidad 0,6 de Studio Iron daría 4,26:1 y no pasa AA en 20 px) | `auto` |
| 1.7.e | Pista de la ficha (≤ 1000) y de la edición | Dedo, segmentos | Igual que 1.7.c; segmento: `background-color` línea → grafito `--m-2` salida | Sin transición |
| 1.7.f | Subrayado | Hover (`hover:hover`) o foco en enlace de cabecera, pie, opción de filtro, ARTISTA de la cartela | Línea de 1 px a −2 px de la base que crece de izquierda a derecha (`background-size` 0 → 100%) · `--m-3` · salida. La sección actual y la opción activa la tienen dibujada siempre | Aparece sin transición |
| 1.7.g | Filo de hover | Hover sobre tarjeta, miniatura del panel o celda de filtro | `outline: 1px solid var(--grafito); outline-offset: -1px` sobre la imagen, **instantáneo** (Studio Iron, medido) | Igual |
| 1.7.h | Botón-fila y botón lleno | Hover, `:focus-visible`, toque (`:active`) | Botón-fila: de fondo hueso y texto grafito a fondo grafito y texto hueso; botón lleno: al revés. **Instantáneo**, sin transición (Studio Iron) | Igual |
| 1.7.i | Botón contorno y enlace de acción | Hover | Botón contorno: `opacity` 1 → 0,7 · `--m-1` · mov (ENQUIRE); enlace de acción: `color` grafito → gris `--m-1` | Igual |
| 1.7.j | Panel Artistas (≥ 1001) | Clic en «Artistas» | Abre: `opacity` 0 → 1 · `--m-2` · salida (el alto aparece de golpe y empuja la página); cierra: `--m-1` | Sin transición |
| 1.7.k | Menú a ≤ 1000 | Botón de dos rayas | Panel: `clip-path: inset(0 100% 0 0)` → `inset(0)` · `--m-2` · mov (entra desde la izquierda, como Studio Iron, sin desbordar); rayas → X: `transform` · `--m-2` · mov; subnivel Artistas: reemplazo instantáneo | Sin transición |
| 1.7.l | Aviso al tocar | Comprar, Amazon, Enviar, Suscribirme | `opacity` 0 → 1 · `--m-2` · salida | Sin transición |
| 1.7.m | Grilla al filtrar | Cambio de opción | Sale `opacity` → 0 en `--m-1`, se repinta, entra en `--m-2` salida | Instantáneo |
| 1.7.n | `<details>` | Abrir | Contenido `opacity` 0 → 1 · `--m-2` · salida; signo «+» → «−» (texto) | Sin transición |
| 1.7.o | Capas de maqueta | «Lo editas tú», «Retícula» | `opacity` `--m-2` / `--m-1` | Sin transición |
| 1.7.p | Contador de Encuentro (nivel 2) | Entra en pantalla por primera vez | 000 → 007 en pasos de 70 ms | Quieto |
| 1.7.q | Casilla activa del Libro (≥ 1001) | Hover | Inversión · `--m-1` · mov | Igual |

1.7.1 · **Reglas:** sin `transition: all`; duraciones y curvas solo de estos tokens (más 70 ms de 1.7.p); propiedades animables: `opacity`, `background-size`, `background-color`, `color`, `border-color`, `clip-path` (menú) y `transform` (rayas del menú); el foco aparece sin transición; nada se anima al bajar; nada se repite solo; sin `scroll-behavior: smooth` global; sin librería de scroll (Lenis) ni de carrusel (Swiper).
1.7.2 · `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { transition-duration: 0s !important; animation-duration: 0s !important } }` y el JS no usa `behavior: 'smooth'`.

---

## 2 · Composición por vista

Columnas de cada tabla: **1440** (9 col) · **768** (6 col) · **390** (3 col). 390 es el ancho principal. «Studio Iron» nombra la página contra la que se pone lado a lado (M24). Textos fijos de `copy-secciones.md`, de muestra de `copy-muestra.md`, y los nuevos de §12.

### 2.0 · Piezas globales

**2.0.1 · Barra de aviso** (en el flujo, se va al bajar). Fondo hueso, borde inferior 1 px `--linea`, padding vertical `--e-1`, `--margen` a los lados. 1440: una línea, «MAQUETA» (`.etiqueta` grafito) + texto de Clara (`--t-chico` gris) a la izquierda; a la derecha «Lo editas tú · Retícula» (herramientas, `--t-chico`). **Alto ≤ 32 px a 1440 y ≤ 64 px a 390** (390: «MAQUETA» y las dos herramientas en la línea 1; el texto en las líneas 2 y 3). ES / EN ya no va aquí (D20). Studio Iron no tiene barra de anuncios: esta es de la maqueta (brief §6).

**2.0.2 · Cabecera** (D2; Studio Iron `home/1440-primer-viewport.jpg`, `home/390-seq-00000.jpg`).

| | ≥ 1001 | ≤ 1000 |
|---|---|---|
| Alto | 32 px | 44 px |
| Padding lateral | `--e-3` (18) | 0; los botones de 44 llegan al borde con su área |
| Composición | `grid-template-columns: 1fr auto 1fr` | `44px 1fr 44px` |
| Izquierda | Menú en línea, `--t-interfaz` Archivo 500 grafito, separados `--e-4`: **Artistas** (botón, abre el panel 2.0.3) · Obras · Ediciones · Encuentro · Acerca de (medido: 356 px) | Botón de menú 44 × 44: dos rayas grafito de 2 px de alto, 20 y 16 px de largo, separadas 5 px, alineadas a 12 px del borde |
| Centro | Marca chica (2.0.5). **En Inicio a ≥ 1001 no se muestra** (`visibility: hidden`; la marca enorme hace su papel y es el enlace al inicio) | Marca chica centrada |
| Derecha | Tienda · Contacto · ES · EN, separados `--e-4` (ES y EN a `--e-2` entre sí; el idioma activo subrayado) | Botón de idioma 44 × 44 con el otro idioma («EN» o «ES») en `.etiqueta` |

Sección actual: subrayado de 1 px dibujado (1.7.f), `aria-current="page"`. No es `fixed` ni `sticky`. **Con puntero grueso a ≥ 1001** (un iPad horizontal, `@media (pointer: coarse)`): alto 44 y cada enlace con 44 de alto de área (4.26); el diseño no cambia.

**2.0.3 · Panel Artistas a ≥ 1001** (el menú Design; Studio Iron `home/1440-i-menu-design-abierto.jpg`). «Artistas» es un `button` con `aria-expanded` y `aria-controls`. Al hacer clic se abre **en el flujo**, entre la cabecera y la vista, un panel hueso con padding `--e-3` arriba y abajo, que empuja la página (sin velo ni desenfoque). Celdas de una columna cada una (146,7 px a 1440), desde `c1`: «Todas las artistas» (miniatura `muro/todas-h`), Artista A, B y C (miniatura `muro/{a}-07-h`); miniatura 5:4; nombre en Archivo 500 12 centrado a `--e-1`. Preparado para 6 y 9 (llena hasta `c9` y pasa a otra fila a `--e-2`). Hover: filo 1.7.g. «Artistas» queda subrayado mientras está abierto. Se cierra con el mismo botón, con Escape, con un clic fuera del panel o al navegar; el foco vuelve al botón. Movimiento 1.7.j.

**2.0.4 · Menú a ≤ 1000** (D8; Studio Iron `home/390-i-menu-abierto.jpg`, `home/390-i-menu-design.jpg`). Botón con `aria-expanded`, `aria-controls` y `aria-label` (§12). Abierto: panel hueso **en el flujo** bajo la cabecera, alto `calc(100svh − alto de la barra de aviso − 44px)`, mínimo 420 px; las rayas forman una X. Siete ítems en `--t-titulo` mayúscula **36 px**, centrados en el panel en los dos ejes, separados `--e-2` (medido: 7 × 36 + 6 × 12 = 324 px); la página actual subrayada; «ARTISTAS ›» lleva el carácter «›» (Archivo 16) y abre el subnivel: el bloque se reemplaza por «‹ VOLVER» (`.etiqueta-ancha`, fila de 44, a `--margen-texto`) y una grilla de 2 medias con las cuatro celdas del panel (miniatura 5:4, nombre Archivo 500 12 centrado a `--e-1`; filas a `--e-3`). Abajo, una barra de 44 px con borde superior 1 px `--linea` y «ES · EN» en `.etiqueta-ancha`, centrado. Se cierra con el botón, Escape y al navegar; el foco vuelve al botón. Movimiento 1.7.k.

**2.0.5 · Marca chica:** «MÓDULO» en Instrument Serif itálica + espacio + «369» en recta, mayúsculas, **26 px**, interlineado 1, tracking 0 (≈ 118 px de ancho; Studio Iron 130 × 25). Enlace al inicio con `aria-label` (copy 3.3).

**2.0.6 · Tarjeta de obra** (Studio Iron `tienda/si-tienda-1440-v0.jpg`, `tienda/si-tienda-390-v0.jpg`). Toda la tarjeta es un enlace a la ficha.
- **Imagen:** caja 4:5 del ancho de su celda; `img` de la vista en muro `muro/{id}` (M07), que ya es 4:5. Fondo `--hueso-2` solo mientras carga.
- **Pie a ≥ 621:** a `--e-1` de la imagen, con `padding-inline: var(--e-1)` (el título y el autor quedan a 6 px de los bordes de la imagen, como Studio Iron), una línea con `justify-content: space-between`: a la izquierda el título con el año entre paréntesis, «Campo 04 (2025)», en Archivo 500 12/1,2 grafito; a la derecha el autor, «ARTISTA A», en Instrument Serif 13 mayúscula (1.2.9), alineado a la derecha.
- **Pie a ≤ 620:** columna centrada con `padding-inline: var(--e-1)`: título (`text-wrap: balance`) y autor a `--e-1`.
- **Estado:** **sin chip y sin borde** (la grilla de Studio Iron no lleva etiqueta de estado). DISPONIBLE no se escribe: es el estado por defecto. VENDIDA y COLECCIÓN PRIVADA van como texto `.etiqueta` gris, sin borde, en una segunda línea del pie a `--e-1` (a la izquierda a ≥ 621, centrada a ≤ 620). Nunca sobre la imagen.
- **Hover** (`hover:hover`): filo 1.7.g sobre la imagen; nada más cambia (Studio Iron, medido). **Foco** (`:focus-visible`): contorno de 2 px grafito **hacia adentro** (`outline-offset: -2px`) sobre toda la tarjeta, imagen y pie; así no lo recorta ningún carril con scroll ni lo tapa la tarjeta vecina, que a ≤ 620 está a 1 px (M25).
- Cero precios. En la página de una artista el autor se repite (Studio Iron también lo hace).

**2.0.7 · Tarjeta de artista** (Inicio, Artistas): igual que 2.0.6 con la vista en muro de su obra representativa (`muro/a-07`, `b-07`, `c-07`); pie: a la izquierda «ARTISTA A» (Instrument Serif 13 mayúscula en la tira del inicio; **`--t-rotulo` 20** en la vista Artistas), a la derecha «9 OBRAS» (`.etiqueta` gris); a ≤ 620, los dos centrados en columna. Enlace a la página de la artista.

**2.0.8 · Tira** (carrusel de tarjetas; Studio Iron `home/1440-i-cards-reposo.jpg`, `home/390-seq-00422.jpg`). Línea de título: título de tira en `--t-rotulo` (enlace, hover 1.7.d) a `--margen`, y a la derecha, **en todos los anchos**, dos **flechas cuadradas** de 28 × 28 px (borde 1 px `--linea`, carácter «←» / «→» en `--t-chico` grafito, área táctil de 44 con margen negativo, separadas `--e-1`), que se ocultan si todo cabe (la tira ARTISTAS no las muestra en ningún ancho). A ≤ 620 son la única señal de que la tira se desliza, porque ya no asoma una tarjeta (1.4.2); van en la línea de título, nunca sobre una imagen. Flecha deshabilitada: carácter en gris, `aria-disabled="true"`. Carril a `--e-2` bajo el título: `display: grid; grid-auto-flow: column`, anchos de 1.4.2, `overflow-x: auto`, `scroll-snap-type: x mandatory`, **`padding-block: var(--e-1)`** (deja ver entero el foco; M25); a ≥ 621 `scroll-padding-inline: var(--margen)` y `padding-inline: var(--margen)`, calle 12; a ≤ 620 de borde a borde, sin padding lateral y con `gap: var(--costura)`; sin barra visible, sin vuelta al principio. Tarjetas 2.0.6 o 2.0.7. Pista con `tabindex="0"`, flechas del teclado y `aria-label` (§12).

**2.0.9 · Banda** (los destacados de la portada de Studio Iron sin el texto encima, D15; Studio Iron `home/1440-seq-01768.jpg`). Imagen a sangre, 16:9 (≥ 621) / 4:5 (≤ 620), `cover`, solo fotos de objeto (M08), con el tope de blanco de M9c. Bloque de texto: a ≥ 621 alineado a la izquierda desde `c1` con ancho máximo `c1-3`; a ≤ 620 centrado, con `--margen-texto`. Orden: rótulo de datos (`.etiqueta` gris, opcional) → a `--e-2` el título (`--t-banda`) → a `--e-3` el párrafo de muestra (`--t-bajada`) → a `--e-4` el **enlace de acción ancho** (2.0.13). **Dos variantes:** *texto debajo* (el bloque de texto a `--e-6` bajo la imagen: ENCUENTRO en el Inicio) y *texto arriba* (el bloque de texto a `--e-6` sobre la imagen, y la imagen es lo último de la vista y toca el pie: EDICIONES en el Inicio, como la banda Black Metal que cierra la portada de Studio Iron).

**2.0.10 · Bloque partido** (los bloques de los edits y el About de diseñador; Studio Iron `eventos/ldf-1440-s01620.jpg`, `disenador/andu-1440-full.jpg`). **A ≥ 1001:** dos mitades a sangre (1.4.3), sin calle. Una mitad es la imagen, a la proporción de 1.4.5 (**1:1 por defecto en los edits**: Encuentro y Activar; 4:5 en Biografía y Statement; 5:7 en las tapas), `cover` solo si es foto de objeto. La otra mitad es la columna de texto `.mitad-texto`, **alineada arriba** con `padding-top: var(--e-9)` y pegada a su costado cuando cabe (1.6.3, D10-3); nunca centrada en vertical. Dentro de la mitad, el texto va en una de dos disposiciones, una sola regla por bloque:
- **Bloque de edit** (Encuentro, Activar, Ediciones): columna de ancho del rol (descripción 320; formularios y precios 464) a `--e-6` del borde de la imagen, alineada **hacia la imagen** (a la izquierda si la imagen está a la izquierda, a la derecha si está a la derecha), como Studio Iron.
- **Bloque de texto centrado** (Biografía, Statement): columna centrada en su mitad (Biografía 520, con texto alineado a la izquierda o justificado según 2.3; Statement la mitad menos `--e-4` a cada lado, con texto centrado).
Los bloques consecutivos se tocan (0 entre ellos) y alternan el lado. Orden del texto de edit: categoría (`.etiqueta`) → `--e-2` título (`--t-titulo` itálica de título, 26) → `--e-2` emisor (Instrument Serif 13 mayúscula, opcional) → `--e-6` descripción (`--t-dato`, 13/1,55, máx. 320) → `--e-6` acción (botón contorno o botón-fila). **A ≤ 1000:** imagen a sangre arriba, a su proporción, y el texto centrado debajo a `--e-4`, con `--margen-texto`, sin `sticky`; los bloques apilados se tocan imagen con imagen y dejan `--e-9` solo bajo el texto.

**2.0.11 · Página de texto** (Studio Iron `global/ship-1440-y00000.jpg`). Columna de página de texto (1.2.15: `c3-7`, tope 704, centrada). H1 en `--t-titulo` recta (caja normal) alineado a la izquierda de la columna; secciones a `--e-6`, cada una con H2 en `--t-rotulo` y su contenido a `--e-2`; párrafos `--t-texto` (14/1,6) a `--e-2`; listas con viñeta y 20 px de sangría; correos subrayados. Como bloque dentro de otra vista (Historia y proceso, Preguntas, Cómo se compra), lleva `--e-9` arriba y abajo.

**2.0.12 · Fila de datos** (fecha · lugar de un evento): `.etiqueta`, los datos separados por «·» en gris con `--e-3` a cada lado. A ≤ 620 cada dato en su línea, sin «·» (Studio Iron deja un «·» huérfano; no se toma).

**2.0.13 · Acciones** (lo que Studio Iron tiene, traducido):

| Pieza | Studio Iron | Reposo | Hover / foco / activo |
|---|---|---|---|
| **Botón-fila** | «Add To Bag £3,800.00» (fila blanca, borde `#E2E2E2`) | Ancho completo de su columna, alto 48, padding `--e-2` × `--e-3`, `display: flex; justify-content: space-between`; etiqueta a la izquierda y valor a la derecha **en la misma letra** (1.2.8e: Archivo 500, 13 px a ≥ 1001 y 16 px a ≤ 1000, tracking 0,06em); **fondo hueso, texto grafito, borde 1 px `--linea`** arriba a ≥ 1001 y en los cuatro lados a ≤ 1000 | `:hover`, `:focus-visible` y `:active`: fondo grafito, texto hueso, borde grafito, **instantáneo** (1.7.h). Deshabilitado: texto gris, sin hover |
| **Botón lleno** | SEND ENQUIRY (negro, 440 × 46) | **Solo para enviar formularios** (Contacto, Activar opción 1). Ancho completo de la columna del formulario, alto 48, fondo grafito, texto hueso, `.etiqueta-ancha`, etiqueta con «→» | Se invierte: fondo hueso, texto y borde grafito, instantáneo |
| **Botón contorno** | ENQUIRE, SHOP NOW, VIEW | `.etiqueta-ancha` grafito, borde 1 px grafito, padding `--e-2` × `--e-4`, alto mínimo 44, `inline-flex` | `opacity` 0,7 (1.7.i) |
| **Enlace de acción ancho** | DISCOVER, SUBSCRIBE → | `.etiqueta-ancha` grafito, borde inferior 1 px, `padding-bottom: 2px`, área táctil de 44 | `color` gris (1.7.i) |
| **Enlace de texto** | menú, pie | `--t-interfaz` o `--t-texto` sin subrayado | Subrayado 1.7.f |

**Una sola fila de acción por ficha** (obra o edición) y un solo botón lleno por formulario. La regla anterior «un solo botón lleno por vista» sale: el relleno grafito en reposo ya no marca la acción principal (Studio Iron no lo hace), lo hace la fila.

**2.0.14 · Pie del sitio** (D14; Studio Iron `producto/tubular-chair-1440-full.jpg`, `global/about-390-y01500.jpg`). Fondo grafito, texto hueso, a `--e-16` del último bloque (a 0 si el último bloque es una imagen a sangre).

| | ≥ 621 | ≤ 620 |
|---|---|---|
| Padding | `--e-4` (24) | `--e-6` arriba, `--e-2` a los lados y abajo |
| Fila 1 | Titular (§12) en `--t-titulo` mayúscula, interlineado 1, con **tres palabras en itálica**, en `c1-5`; a la derecha, en `c7-9`, el enlace «Escribir una consulta →» en `.etiqueta-ancha` hueso sobre una línea inferior de 1 px `--linea` a todo el ancho de `c7-9` (la línea pasa a hueso con hover y foco), que lleva a Contacto | Titular centrado (26); el enlace debajo a `--e-6`, a todo el ancho |
| Separación | `--e-24` | `--e-9` |
| Fila 2 | Tres columnas: GALERÍA en `c1-2` (Artistas, Obras, Ediciones, Encuentro) · MÓDULO 369 en `c3-4` (Acerca de, Tienda, Contacto) · REDES en `c6-7` (Instagram de muestra, con su marca en `--linea`). Rótulo `.etiqueta` hueso a `--e-1` del primer enlace; enlaces `--t-interfaz` hueso, interlineado 28 px a ≥ 1001 con puntero fino; **a 621-1000 y con puntero grueso en cualquier ancho, cada enlace con 44 de alto** (4.26) | Las tres columnas lado a lado en `c1`, `c2`, `c3`, alineadas izquierda, centro y derecha; enlaces de 44 de alto |
| Fila 3 | A `--e-6`: «Módulo 369 · Galería de arte en línea» a la izquierda y «modulo369.com» a la derecha, Archivo 12 `--linea` | Centrado, en dos líneas |
| Hover | Enlace → `--linea` (1.7.i) | |

Sin newsletter, sin mascota, sin emblema.

**2.0.15 · Vacío final:** cada vista termina a `--e-16` del pie, salvo que su último bloque sea una imagen a sangre (entonces el pie se toca con ella, como en Studio Iron).

### 2.1 · Inicio `/` · Studio Iron: portada

**Ojo primero:** a 1440, MÓDULO 369 de borde a borde y la obra colgada fuera del centro del muro; a 390, la obra en su muro y, en el mismo viewport, la línea de pie y controles. **Disrupciones (D22):** a 1440, palabra enorme, imagen desplazada, color, palabra casi escondida; a 390, imagen desplazada, color, palabra casi escondida.

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | H1 «Módulo 369» | Solo para lectores de pantalla | igual | igual |
| 2 | **Marca enorme** (`<p aria-hidden="true">`, enlace al inicio no hace falta) | Dentro de `.portada`, `sticky` top 0, z 0 (1.6.3); padding `--e-1` arriba y `--e-2` abajo; tinta de borde a borde (1.2.13). Caja ≈ 244 px | No existe | No existe |
| 3 | **Lámina** (pista del carrusel, `.portada`, z 1) | A sangre, 16:9 (1440 × 810), `muro/lamina-n-h` (M07); cada lámina es un enlace a la ficha de su obra **solo para el puntero y el dedo** (`tabindex="-1"`): el foco de teclado va al enlace del título en la línea 4, que está fuera de la pista y no se recorta (M25); nada encima | A sangre 16:9 (768 × 432) | A sangre 4:5 (390 × 488), `muro/lamina-n-v` |
| 4 | **Línea de pie y controles** (dentro de `.portada`, fondo hueso) | Alto 44, a `--margen`: a la izquierda, enlace a la ficha con «Campo 04 (2025)» (Archivo 500 12) y a `--e-3` «ARTISTA C» (Instrument Serif 13); a la derecha, flecha cuadrada «←» · «01 / 05» (`.etiqueta-ancha` `tabular-nums`) · flecha cuadrada «→», separados `--e-2` | igual | igual; si el título es largo, el autor pasa a una segunda línea y la fila crece |
| 5 | **Enunciado** (H2 + párrafo, muestra, §12) | Padding `--e-9` arriba y abajo; H2 `--t-enunciado` 7vw centrado en `c2-8`; **el punto final en cobalto** (D6); párrafo `--t-bajada` (15/1,55) centrado, máx. 464, a `--e-4` | H2 9vw centrado en `c1-6` | H2 12vw (≈ 47 px) centrado con `--margen-texto`; padding `--e-6` |
| 6 | **Tira OBRAS** (2.0.8) | 9 tarjetas: a-03, b-01, c-01, a-05, b-03, c-03, a-08, b-06, c-06 (ninguna de las láminas ni de las representativas); 3 por vista, flechas | 2,5 por vista, flechas | **3 por vista de 129 px, de borde a borde con costura de 1 px, sin asomo**; flechas en la línea de título |
| 7 | **Banda ENCUENTRO** (2.0.9), a `--e-6` | `encuentro/caja-banda-h` 16:9; rótulo «007/369 · activados de muestra» (gris, sin cobalto); título ENCUENTRO; párrafo (§12); «QUÉ ES ENCUENTRO» | igual | `caja-banda-v` 4:5; texto centrado |
| 8 | **«Libro»** (casi escondida) | Fila de 48 px a `--e-6` de lo anterior, solo la palabra en `--t-chico` gris, alineada al borde derecho de `c9`, enlace a `#/encuentro/libro`, sin flecha | borde derecho de `c6` | borde derecho de `c3` |
| 9 | **Tira ARTISTAS** (2.0.8) | 3 tarjetas de artista (2.0.7), sin flechas (caben) | 2,5 por vista, flechas | **Las tres a la vez, 3 × 129 px**, sin flechas |
| 10 | **EDICIONES, banda con texto arriba** (2.0.9), a `--e-6` de la tira | Primero el bloque de texto: título EDICIONES; párrafo (§12); «VER LAS EDICIONES»; a `--e-6` la imagen `ediciones/banda-h` 16:9 (M08 b: las tres ediciones cerradas sobre lino, nunca una doble página blanca) | igual | Texto centrado; imagen `ediciones/banda-v` 4:5 |
| 11 | Pie del sitio | **a 0: la banda toca el pie** (2.0.15; Studio Iron: «destacado → pie 0») | igual | igual |

2.1.1 · **Láminas** (M07: la obra entera en el muro; la columna «cx» es el centro horizontal de la obra en la imagen, la disrupción):

| Lámina | Obra | Proporción de la obra | 16:9 (≥ 621): cx · cy | 4:5 (≤ 620): cx · cy |
|---|---|---|---|---|
| 1 | c-04 (tinta sobre papel negro) | 5:4 | 0,68 · 0,38 | 0,70 · 0,40 |
| 2 | a-07 | 2:3 | 0,30 · 0,38 | 0,30 · 0,40 |
| 3 | b-05 | 5:4 | 0,68 · 0,38 | 0,70 · 0,40 |
| 4 | a-02 | 4:5 | 0,32 · 0,38 | 0,30 · 0,40 |
| 5 | c-02 (papel claro: muro alternativo, M07) | 1:1 | 0,68 · 0,38 | 0,70 · 0,40 |

Las cinco van corridas del centro, alternando de lado, en los dos formatos (la 5 ya no queda centrada). En 16:9 la obra mide 0,64 del alto de la lámina; en 4:5 cabe en una caja de **0,56 del ancho × 0,70 del alto** (toca el lado que alcance primero), angosta a propósito para que el corrimiento se vea a 390: con cx 0,30 la obra va de x ≈ 8 a ≈ 226 y su centro queda a 78 px del eje (contrato sobre fidelidad: la caja de 0,82 × 0,70 que pedía la auditoría de Studio Iron dejaría la obra casi centrada).

2.1.2 · **Pliegue, medido con la regla de 1.2.13:** a 1440 × 900: barra ≤ 32 + cabecera 32 + marca ≈ 262 → la lámina empieza en y ≈ 326 y la obra (alto 0,64 de 810 = 518, centro en 0,38) va de y ≈ 375 a ≈ 893: **entera en el primer viewport**; la línea de pie queda bajo el pliegue (Studio Iron también corta su hero). A 390 × 664 (Safari con barras): barra ≤ 64 + cabecera 44 + lámina 488 + línea 44 = **640 ≤ 664**: obra, pie y controles a la vista sin bajar.
2.1.3 · **Al bajar a ≥ 1001:** la marca enorme queda quieta arriba y la lámina sube por encima de ella hasta taparla; cuando `.portada` termina, la marca se va con ella. Ninguna letra queda sobre la lámina en ningún paso (M23).
2.1.4 · Controles: «←» deshabilitada en la 01 y «→» en la 05 (sin vuelta); sin avance automático; `aria-roledescription="carrusel"`, etiquetas de copy 5-1. Al deslizar, el pie de la línea 4 cambia al de la lámina activa (`aria-live="polite"`).
2.1.5 · **Terminado:** a 1440, la marca enorme y la obra grande contra su muro se leen como la portada de Studio Iron en hueso; al bajar, la marca queda debajo de la foto; enunciado con su punto azul; tira de 3 tarjetas llenas; banda de la caja; «Libro» sola; tres artistas; el texto de ediciones y su banda, que toca el pie grafito. A 390, la obra corrida en su muro, el pie y los controles en el primer viewport, el enunciado justo debajo, y las tiras de borde a borde como el mosaico de Studio Iron.

### 2.2 · Artistas `/artistas/` · Studio Iron: menú Design + cabecera de colección

| Bloque | 1440 | 768 | 390 |
|---|---|---|---|
| H1 «ARTISTAS» (`--t-titulo` mayúscula, centrado) | a `--e-9` de la cabecera | igual | a `--e-6` |
| Visión curatorial (muestra) | `--t-bajada` centrada, máx. 520, a `--e-4` del H1 | igual | con `--margen-texto` |
| Tres tarjetas de artista (2.0.7, nombre en 20) | grilla 1.4.1, a `--e-16` | 3 de 240 | 2 por fila de borde a borde (2 × 194, costura); la tercera sola a la izquierda |

2.2.1 · Sin retratos (Kurimanzutto); la imagen es la obra representativa en su muro. **Terminado:** se ve como una colección de Studio Iron con tres piezas grandes, y crece de a 3.

### 2.3 · Artista `/artistas/<a>/` · Studio Iron: página de diseñador (andu-masebo; kouros-maghsoudi)

**Ojo primero:** el detalle de su obra a sangre y, debajo, su nombre en itálica enorme. **Disrupción:** cambio de escala (80 px a 1440, 48 a 390, contra pies de 12). **Densidad de Studio Iron:** entre bloques de imagen, 0; `--e-9` solo antes y después de un bloque de texto puro (C36); la última imagen toca el pie (Studio Iron: separación medida entre hero, grilla, About y pie = 0).

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | **Hero:** detalle declarado de su obra ancha (a-01, b-09, c-08), a sangre, pegado a la cabecera, `artistas/{a}-hero-h` (M08) | 21:9 (1440 × 617) | 5:4 (768 × 614), `-hero-v` | 5:4 (390 × 312) |
| 2 | Rótulo del hero «Detalle · Campo 01, 2025» (§12) | `--t-chico` gris a `--e-1` bajo la imagen, alineado a la derecha a `--margen` | igual | igual |
| 3 | **H1 nombre** «Artista A» (`--t-nombre` itálica) | Alineado a la izquierda a `--margen`, padding `--e-4` arriba y abajo | **48 px** centrado, padding `--e-4` / `--e-2` | igual que 768 |
| 4 | **Obras:** las otras 8, tarjetas 2.0.6 | grilla 1.4.1 (3 + 3 + 2) | 3 por fila | 2 por fila de borde a borde (costura) |
| 5 | **Historia y proceso** (página de texto 2.0.11, sin H1), a `--e-9` de la grilla y con `--e-9` debajo | Columna de página de texto (704): H2 «HISTORIA Y PROCESO» (`--t-rotulo`) + texto de muestra (`--t-texto`) | `c1-6` con `--margen-texto` | `--margen-texto` |
| 6 | **Biografía** (bloque partido, imagen a la izquierda, 2.0.10 «texto centrado») | Imagen 4:5 a sangre (720 × 900): A, foto de taller `artistas/a-taller` (M05); B y C, `muro/b-07` y `muro/c-07`. Columna de **520 centrada en su mitad** (100 px a cada lado), alineada arriba con `padding-top: var(--e-9)`, pegada si cabe (D10-3): «BIOGRAFÍA» (`.etiqueta`) → `--e-2` «ARTISTA A» (`--t-titulo` mayúscula, interlineado 0,8) → `--e-6` biografía de muestra (`--t-texto` 14/1,6), justificada con sangría (1.2.12) → `--e-2` aviso de la foto (§12) | Apilado (1.4.3): imagen a sangre 768 × 960, texto debajo con `--margen-texto`, máx. 520 centrado | Imagen a sangre 390 × 488, texto debajo (16/1,5) |
| 7 | **Obra sola a sangre:** la obra ancha (3:2) entera, `obras/{ancha}` (M01), enlace a su ficha; toca la Biografía | 1440 × 960, sin recorte; pie 2.0.6 a `--e-1`, dentro del bloque, con `--e-1` debajo | 768 × 512 | 390 × 260 |
| 8 | **Statement** (bloque partido, imagen a la derecha, 2.0.10 «texto centrado»), toca la obra sola | Imagen `muro/{a}-04` 4:5. Texto: statement de muestra en `--t-titulo` **itálica de cita** (36), centrado, sin comillas, con su marca, en el ancho de la mitad menos `--e-4` a cada lado (≈ 672), alineado arriba a `--e-9` y pegado si cabe; a `--e-9` debajo, centrado, **«ARTISTA B →»** (enlace de acción ancho) | Apilado, **texto arriba e imagen abajo** (la imagen toca el bloque siguiente o el pie): statement 36 centrado y «ARTISTA B →» | Igual que 768, statement en 26 |
| 9 | Nivel 2 · **Fila de 4 detalles** 3:4 sin calle, a sangre (`artistas/{a}-det-1…4`, M08), toca el Statement y **toca el pie** | 4 × 360 × 480 | 4 × 192 × 256 | 2 × 2 de 195 × 260 |
| 10 | Pie del sitio | a 0 de la última imagen (la fila de 4, o la imagen del Statement si el nivel 2 no se construye) | igual | igual |

2.3.1 · El nombre **nunca** va sobre el hero (Escat; en Studio Iron el nombre negro desaparece sobre la obra negra de Fomenta, `disenador/fomenta-1440-s00-y0.jpg`). Sin retrato: el lugar del retrato de Studio Iron lo ocupa el taller (A) o una obra (B, C).
2.3.2 · **Terminado:** se recorre como Andu Masebo y Kouros Maghsoudi: textura a sangre, nombre enorme en itálica, grilla llena, una sola pausa de texto, y después mitades, una obra que llena la pantalla y una frase en itálica junto a una obra, todo pegado, hasta una imagen apoyada sobre el pie.

### 2.4 · Obras `/obras/` · Studio Iron: `/art` (Lista) y `/collections/all-objects` (Muro)

| Bloque | 1440 | 768 | 390 |
|---|---|---|---|
| H1 «OBRAS» (`--t-titulo` mayúscula, centrado) | a `--e-9` | igual | a `--e-6` |
| Conteo «27 OBRAS» (`.etiqueta` gris, `aria-live="polite"`) + «Quitar filtros» (enlace de acción ancho, solo con alguno activo) | centrado a `--e-2` del H1 | igual | bajo «FILTRAR» |
| **Artista** (D21): celdas «Todas · Artista A · B · C», una columna cada una, miniatura 5:4 + nombre Archivo 500 12 a `--e-1`; activa: filo grafito fijo; hover 1.7.g; `aria-pressed` | Fila centrada a `--e-4` del conteo, calle 12 | igual (114 px) | Dentro de «FILTRAR», 2 × 2 medias |
| **Técnica · Tamaño · Disponibilidad:** por grupo, rótulo `.etiqueta` gris y opciones en `--t-interfaz` (Todas · Óleo · Acrílico · Collage · Recortado · Tinta · Grafito; Todos · Chico · Mediano · Grande; Todas · Disponible · Vendida · Colección privada), botones con `aria-pressed`; la activa con el subrayado dibujado (1.7.f) | Tres líneas centradas a `--e-4`, opciones a `--e-3`, líneas a `--e-2` | igual | Dentro de «FILTRAR», cada grupo en su bloque, opciones con `flex-wrap`, 44 de alto |
| «FILTRAR» (`<details>`, resumen `.etiqueta-ancha` de 44, centrado) | No existe | No existe | Bajo el H1 a `--e-4`; abierto empuja la grilla (1.7.n) |
| **Vista «LISTA · MURO»** (dos botones `.etiqueta-ancha` con `aria-pressed`, el activo subrayado; nivel 1) | En la línea del conteo, a la derecha de `c9`; **LISTA activa por defecto** | `c6`; **MURO activa por defecto** | junto a «FILTRAR»; **MURO por defecto** |
| **LISTA** (2.4.1), orden intercalado a-01, b-01, c-01, a-02… | a `--e-16` de los filtros | igual que 390 | obra a sangre, cartela centrada debajo |
| **MURO:** grilla de tarjetas 2.0.6, mismo orden | 1.4.1, a `--e-16` de los filtros | igual | 2 por fila de borde a borde (2 × 194, costura), a `--e-9` |
| Estado vacío: texto de Clara centrado + «QUITAR FILTROS» | centrado, máx. 520 | igual | igual |

2.4.1 · **Lista (la sección Art de Studio Iron, `tienda/si-art-1440-v0.jpg`, `tienda/si-art-390-v0.jpg`; nivel 1):** una obra por fila; es la composición de la ficha (2.5) repetida. **A ≥ 1001:** la obra plana, entera, a su proporción, a todo el ancho de `c1-5` y **sin tope de alto** (Studio Iron: 762 px de ancho, alturas de 756 a 1.083), `obras/{id}` (M01), enlace a la ficha; la cartela en `grid-column: 6 / 10` con `padding-left: var(--e-9)` y máx. 464 (igual que 2.5), **quieta y alineada arriba** (no pegada: D10 no la incluye): «ARTISTA A» (Instrument Serif 13 mayúscula) → `--e-2` el título «Campo 04, 2025» (`--t-titulo` itálica de título, 26) → `--e-6` técnica, medidas y disponibilidad en `--t-dato`, líneas sueltas sin rótulo a `--e-1` (Vendida y Colección privada en gris) → `--e-6` botón contorno «VER LA OBRA» (la única acción de Obras, brief §3). Entre obras, 2 × `--e-16` (192; Studio Iron 200). Sin miniaturas. **A ≤ 1000** (si se elige LISTA): la obra a sangre a su proporción, la cartela centrada debajo a `--e-2` con `--margen-texto` y el botón centrado; `--e-16` entre obras (Studio Iron 80).
2.4.2 · **Por qué MURO por defecto a ≤ 1000** (decisión escrita, pedida por la auditoría): a 390, la Lista de 27 obras a sangre pasa de 15.000 px (cada obra con su cartela y su aire mide entre 500 y 750) y Obras existe para «encontrar una obra y ver qué está disponible» (brief §3); la grilla de 2 × 194 muestra ocho obras por pantalla. La Lista queda a un toque, igual que en Studio Iron la sección Art está a un toque de la colección. La vista elegida se mantiene al navegar y al volver (4.20).
2.4.3 · Los filtros filtran cada uno por su campo, se combinan (4.23) y valen igual en las dos vistas. La lista o la grilla entra con 1.7.m.
2.4.4 · **Terminado:** a 1440, se ve como la sección Art de Studio Iron: una obra grande por fila y su cartela al costado; a 390, la primera tarjeta empieza a ≤ 340 px del borde superior y la grilla se ve como la colección de Studio Iron, de borde a borde, con celdas llenas.

### 2.5 · Ficha de obra `/obras/<o>/` · Studio Iron: `/artists/phil-hale/record-separator` + botón-fila de producto

**Ojo primero:** la obra. **Disrupción:** cambio de escala (el detalle al mismo ancho que la obra entera).

**A ≥ 1001** (`producto/obra-record-separator-1440-v0.jpg`, `-full.jpg`; Studio Iron: imágenes en x 71,5 de 761,5 de ancho, 71,5 px hasta la cartela, cartela de 464):

| Bloque | Dónde | Detalle |
|---|---|---|
| Imágenes | `grid-column: 1 / 6` (781 px; Studio Iron 761,5), a `--e-9` de la cabecera | **01 · Vista general:** la obra plana, entera, **a todo el ancho de `c1-5` y sin tope de alto** (una obra vertical sigue bajo el pliegue, como Recognition en Studio Iron). Rótulo «01 · VISTA GENERAL» (`--t-chico` gris) a `--e-1` debajo. **02 · Detalle** a `--e-2`: mismo ancho; rótulo «02 · DETALLE» a `--e-1`. Los bordes de las dos imágenes quedan alineados |
| **Cartela** (`.ficha-cartela`, pegada si cabe, 1.6.3) | `grid-column: 6 / 10; padding-left: var(--e-9); max-width: calc(464px + var(--e-9))`: empieza en x ≈ 860, mide 464 y termina en ≈ 1.324; el hueco con la imagen queda en ≈ 67 px (Studio Iron 71,5). Alineada arriba con la imagen | «ARTISTA A» (Instrument Serif 13 mayúscula, enlace a la artista, hover 1.7.f) → `--e-2` **H1** «Campo 04, 2025» (`--t-titulo` itálica de título, **26**) → `--e-6` **datos**, líneas sueltas **sin rótulo** en `--t-dato` (13/1,5), a `--e-1` entre sí: técnica · medidas (Plex Mono 12 `tabular-nums`, «96 × 120 cm») · precio (estado 1 y estado 2 con precio: «CLP ···» con su marca de muestra; estado 2 sin precio: «Precio a consultar»; estados 3 y 4: no hay línea) · disponibilidad («Disponible»; «Vendida» y «Colección privada» en gris) → `--e-6` **botón-fila** del estado (4.27) → `--e-2` enlace «CONSULTAR POR ESTA OBRA» (solo estado 1; enlace de acción ancho) → aviso al tocar (1.7.l) → `--e-4` «› CÓMO SE COMPRA» (`<details>`, resumen `.etiqueta-ancha`; contenido: los textos de Tienda de copy, en `--t-dato`) → `--e-6` **descripción de muestra** (`--t-dato` 13/1,55, con `.pendiente` y su marca; **obligatoria en las 27 fichas**, slot 27) → `--e-9` «← ANTERIOR · TODAS LAS OBRAS · SIGUIENTE →» (`.etiqueta-ancha`, hover 1.7.i) |

**A ≤ 1000** (`producto/tubular-chair-390-v0.jpg` para el orden):

| Bloque | 768 | 390 |
|---|---|---|
| Pista general / detalle (scroll-snap), pegada a la cabecera | `c1-6`, cada imagen contenida en una caja de alto `min(ancho ÷ proporción, 70svh)`, centrada | **A sangre** (390 de ancho), alto = 390 ÷ proporción, máx. 80svh; el detalle tiene la misma proporción (M02): cambiar de imagen no mueve nada debajo |
| **Paginación por segmentos** (Studio Iron), a `--e-2` bajo la pista | Dos botones de media pista cada uno (calle `--e-1`), 44 de alto: arriba una barra de 2 px (activo grafito, inactivo `--linea`, 1.7.e) y debajo «01 VISTA GENERAL» / «02 DETALLE» en `--t-chico`; `aria-pressed` | igual, a `--margen` |
| Cartela | `c1-4`, a `--e-4` | Con `--margen-texto`, a `--e-4`; mismo orden que a ≥ 1001; H1 en 26; botón-fila a todo el ancho del texto, en 16 px y con borde en los cuatro lados. Nada pegado |

2.5.1 · **Obras de muestra de cada estado:** estado 1 **a-04** · estado 2 sin precio **a-06** y **c-05** · **estado 2 con precio y sin link b-04** (nuevo: la línea de precio dice «CLP ···» y el botón-fila dice «Consultar por esta obra · →»; en el modelo de datos, b-04 sale de `SIN_PRECIO` y entra en una lista `SIN_LINK`) · estado 3 **a-05** · estado 4 **a-03**. Así María ve los dos casos del estado 2 del brief §4.
2.5.2 · Sale «Más de la artista» (Studio Iron termina la ficha en la cartela y el pie). Queda la navegación anterior / siguiente.
2.5.3 · **Terminado:** a 1440, la obra grande a la izquierda a todo su ancho y la cartela de Studio Iron a la derecha, clara, con su fila de acción, quieta al bajar mientras pasa el detalle; a 390, la obra a sangre con sus dos segmentos y la cartela inmediatamente debajo; el botón-fila a una pantalla de distancia como máximo.

### 2.6 · Ediciones `/ediciones/` · Studio Iron: `/pages/black-metal`

Studio Iron abre Black Metal con cabecera y una franja de cuatro fotos 3:4 a sangre, y después alterna bloques partidos con franjas y bandas 16:9; todo se toca. Ediciones toma ese ritmo de edit, no el de una lista alternada.

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | H1 «EDICIONES» centrado + presentación de muestra (`--t-bajada`, máx. 520, centrada) | a `--e-9`; texto a `--e-4` | igual | a `--e-6`; texto con `--margen-texto` |
| 2 | **Franja de 4 interiores** 3:4 sin calle, a sangre, a `--e-16` del texto (Studio Iron 80): e-01-i1, e-02-i1, e-02-i2, e-03-i2 (M03) con `cover`, recorte **declarado como interior** (`alt` «Interior de relleno de la Edición 02»); cada una, enlace a su edición | 4 × 360 × 480 | 4 × 192 × 256 | 2 × 2 de 195 × 260 |
| 3 | **e-01** (bloque partido de edit, 2.0.10, tapa a la izquierda), toca la franja | Tapa 5:7 plana llenando su mitad (720 × 1.008), `ediciones/e-01`; texto hacia la tapa: «CUADERNO» → «Edición 01» (itálica de título, 26) → «MÓDULO 369» (Instrument Serif 13) → descripción breve de muestra (`--t-dato` 13/1,55, máx. 320, §12) → botón contorno «VER LA EDICIÓN» | Apilado: tapa a sangre 768 × 1.075, texto centrado debajo | Tapa a sangre 390 × 546, texto centrado debajo |
| 4 | **e-02** (tapa a la derecha), toca e-01 | igual | igual | igual |
| 5 | **Banda** `ediciones/banda-h` 16:9 a sangre (M08 b: las tres ediciones cerradas sobre lino), toca e-02 | 1440 × 810 | 768 × 432 | `banda-v` 4:5, 390 × 488 |
| 6 | **e-03** (tapa a la izquierda), toca la banda y **toca el pie** | igual | Apilado con **texto arriba y tapa abajo** (la tapa toca el pie) | igual que 768 |

2.6.1 · Entre bloques de imagen, 0 (Black Metal). **Terminado:** se lee como un edit de Studio Iron: franja de interiores, tres objetos editoriales a gran tamaño, una banda de los tres juntos y la última tapa apoyada sobre el pie.

### 2.7 · Edición `/ediciones/<e>/` · Studio Iron: ficha de `/art`

Misma composición que la Ficha (2.5), con su cartela en la misma posición y las mismas reglas. Imágenes, apiladas a `--e-2`, todas a todo el ancho de `c1-5` y sin tope de alto: «01 · PORTADA» (tapa 5:7), «02 · INTERIOR» y «03 · INTERIOR» (dobles páginas 10:7). Cartela: «← EDICIONES» (enlace de acción ancho) → `--e-4` «CUADERNO» (`.etiqueta`) → `--e-2` H1 «Edición 01» (itálica de título, 26) → `--e-2` «MÓDULO 369» (Instrument Serif 13) → `--e-6` descripción de muestra (`--t-dato` 13/1,55, con su marca; obligatoria en las tres) → `--e-6` detalles en líneas sueltas sin rótulo (páginas y formato de muestra, `--t-dato`) → `--e-6` **botón-fila** «Comprar» · «Amazon →» (copy 12.4-29) → `--e-2` enlace «EDICIÓN EN INGLÉS →» → avisos al tocar. A ≤ 1000: pista de tres imágenes con tres segmentos.

### 2.8 · Encuentro `/encuentro/` · Studio Iron: `/pages/london-design-festival` + banda de la portada

**Ojo primero:** el contador 007/369. **Disrupciones:** escala (contador) y color (la «/»), con el enlace vertical «Libro». **Densidad:** foto de la caja, intro, franja, Cómo funciona y Formas de activación seguidos; las preguntas y el botón al final; cierra una foto a sangre que toca el pie.

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | **Cabecera** (un `h1` con `aria-label` «Encuentro, 7 de 369 activados»): «ENCUENTRO» (`.etiqueta`) y a `--e-2` el contador «007/369» (`--t-contador`; «007» grafito, «/» **cobalto**, «369» gris), centrados; a `--e-2` «ACTIVADOS DE MUESTRA» (`--t-chico` gris) | a `--e-9`; contador de 756 px centrado (x 342 a 1.098) | 529 px | 272 px (x 59 a 331) |
| 2 | **Enlace vertical «Libro →»** (`writing-mode: vertical-rl`, `.etiqueta`, 44 de ancho táctil) | En el borde derecho de `c9`, arriba alineado con el contador | borde derecho de `c6` | borde derecho de `c3` (x ≈ 334 a 378; el contador termina en 331) |
| 3 | **Foto de la caja a sangre** (`caja-banda`), a `--e-9` | 16:9 | 16:9 | 4:5 |
| 4 | **Qué es** (texto puro, `--e-9` arriba y abajo): párrafos de muestra en `--t-texto` (14/1,6) centrados, máx. 520 (Studio Iron: intro de 520 centrada); a `--e-4` debajo, centrado, «VER EL LIBRO» (enlace de acción ancho) | | | `--margen-texto` |
| 5 | **Franja de 4 registros 3:4** sin calle, a sangre (r-001 a r-004, `cover` sobre la variante de 1.200), cada uno enlace a su encuentro | 4 × 360 × 480 | 4 × 192 × 256 | 2 × 2 de 195 × 260 |
| 6 | **Cómo funciona** (bloque partido de edit, imagen a la izquierda: r-005 **1:1** `cover`), **toca la franja**: «ENCUENTRO» → «Cómo funciona» (itálica de título) → texto de muestra (`--t-dato`) → aviso «Maqueta · Por decidir…» | 720 × 720 | apilado | apilado |
| 7 | **Formas de activación** (imagen a la derecha: r-006 1:1), **toca Cómo funciona**: «ENCUENTRO» → «Formas de activación» → texto de muestra → botón contorno «ACTIVAR UN ENCUENTRO» | 720 × 720 | apilado | apilado |
| 8 | **Preguntas frecuentes** (página de texto 2.0.11 sin H1, columna de 704), a `--e-9`: H2 «PREGUNTAS FRECUENTES», presentación (`--t-bajada`), tres `<details>` con borde superior 1 px `--linea`, resumen Archivo 500 14 de 48 px mínimo, «+» / «−» en `--t-chico` a la derecha; respuestas en `--t-texto` | | | |
| 9 | **Botón-fila** «Activar un encuentro» · «→», en la columna de las preguntas, a `--e-6` | | | |
| 10 | **Cierre:** foto de registro r-007 a sangre (`cover`), enlace a su encuentro, a `--e-9` del botón-fila; **toca el pie** | 16:9 (1440 × 810) | 16:9 | 4:5 (390 × 488) |

2.8.1 · **Criterio:** la tinta del contador termina a la izquierda del enlace vertical en los tres anchos (M5). Entre bloques de imagen (3 → texto → 5, 6, 7), 0; `--e-9` solo alrededor del texto de 4 y de 8-9 (C36). **Terminado:** se lee como un edit de Studio Iron: número enorme, foto a sangre, intro centrada, franja vertical de fotos pegada a mitades alternadas, y una foto apoyada sobre el pie.

### 2.9 · Activar `/encuentro/activar/` · Studio Iron: página de texto + bloques partidos

| Bloque | Composición |
|---|---|
| Página de texto (2.0.11, columna de 704) | «← ENCUENTRO» (enlace de acción ancho) → `--e-4` H1 «Activar un encuentro» (`--t-titulo` recta) → `--e-2` aviso «Maqueta · Por decidir: si la caja se pide…» → secciones a `--e-6`: PROCESO · QUÉ RECIBES · TIEMPOS · REGISTRO FOTOGRÁFICO (H2 `--t-rotulo` + texto de muestra en `--t-texto`) |
| Opción 1, a `--e-9` del texto (bloque partido de edit, imagen a la izquierda: `caja` **1:1** `cover`) | Columna de 464 hacia la imagen: «OPCIÓN 1» → «Pedir la caja» (itálica de título) → formulario (Nombre, Correo + ayuda, pregunta de muestra; campos 4.7) → **botón lleno** «ENVIAR SOLICITUD →» (el único relleno grafito en reposo de la vista: es un envío de formulario) |
| Opción 2 (imagen a la derecha: r-003 **1:1**), toca la opción 1 y **toca el pie** | «OPCIÓN 2» → «Comprar la caja» (itálica de título) → «MÓDULO 369» (Instrument Serif 13) → precio de muestra «CLP ···» (`--t-dato`, con su marca) → **botón-fila** «Comprar» · «Mercado Pago →» (el mismo par que la obra, copy 12.4-32b) → aviso al tocar. A ≤ 1000, texto arriba e imagen abajo, tocando el pie |

Cada opción tiene una sola acción; la vista tiene dos porque §9-4 está abierta, y las dos están marcadas como opción a decidir (aviso en línea de la página de texto).

### 2.10 · Libro `/encuentro/libro/` · Studio Iron: `/events`

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | H1 «LIBRO» (`--t-titulo` mayúscula, centrado) + bajada de muestra (`--t-bajada`, máx. 520, centrada) + fila de datos «ACTIVADOS: 7 DE 369 · LOS 7 SON DE MUESTRA» centrada a `--e-3` + «← ENCUENTRO» a `--e-4` | a `--e-9` | igual | a `--e-6` |
| 2 | **Mapa de 369** (D19), a `--e-9`: `role="img"`, `aria-label` de copy; 41 casillas por fila, 9 filas, en `c1-9` | calle 3 px (≈ 31 px por casilla) con número en `--t-chico` gris dentro **solo si la casilla mide ≥ 28 px** (≥ 1.300 de ventana; resuelve el pendiente de `desvios.md`) | calle 2 px, sin números | calle 1 px (≈ 8 px; franja de ≈ 80 px), sin números |
| 3 | Aviso «Maqueta · En el sitio, mientras no haya…», centrado a `--e-2` | | | |
| 4 | **Destacado: el encuentro 007**, a `--e-16`: `encuentro/r-007` 3:2 a sangre (`cover`), enlace; debajo a `--e-3`: «ENCUENTRO 007» (`--t-banda`) y a `--e-2` la fila de datos FECHA · LUGAR (muestra) | Texto a la izquierda desde `c1` | 768 × 512, texto centrado | 390 × 260, texto centrado |
| 5 | **Los otros seis** (006 a 001), a `--e-4` del destacado (Studio Iron 24) | **Dos columnas 3:2 con `padding-inline: var(--e-4); column-gap: var(--e-4)`: 2 × 684 × 456** (Studio Iron exacto); pie a `--e-2`: «ENCUENTRO 006» (`--t-pie-evento`, Instrument Serif mayúscula 16) y a `--e-1` el lugar de muestra (`.etiqueta` gris, con marca), alineados a la izquierda; filas a `--e-4` | **Uno por fila, a sangre** (768 × 512), pie centrado a `--e-2`; siguiente a `--e-4` (1.4.3) | Uno por fila, a sangre 390 × 260, pie centrado a `--e-2`; siguiente a `--e-4` |

2.10.1 · Casilla vacía: **borde 1 px `--gris`** (4,69:1 sobre hueso; pasa el 3:1 que WCAG 1.4.11 pide a un gráfico que hace falta para entender el contenido, M22). Activa (001 a 007): fondo grafito, número en hueso; a ≥ 1001 y con puntero fino es enlace de puntero (`tabindex="-1"`, 1.7.q); con puntero grueso o a ≤ 1000 no es interactiva; el camino accesible es la galería. Sin cobalto.

### 2.11 · Encuentro activado `/encuentro/libro/<nnn>/` · Studio Iron: página de evento (saatchi-yates, `eventos/evento-saatchi-1440-s00000.jpg`)

Abre como la página de evento de Studio Iron: título en serif mayúscula centrado, fila de datos, bajada y foto. El contador grande queda solo en `/encuentro/` (D6).

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | **H1** «ENCUENTRO 001» (`--t-titulo` mayúscula, 36 · 36 · 26), centrado, máx. 500 | a `--e-9` | | a `--e-6` |
| 2 | Fila de datos «001/369 · FECHA · LUGAR» (2.0.12; el número en Plex Mono 12 `tabular-nums`, grafito, sin cobalto; fecha y lugar de muestra con su marca) centrada a `--e-3` del H1; descripción de muestra (`--t-bajada`, máx. 520) centrada a `--e-3` | | | Cada dato en su línea |
| 3 | **Foto del registro a sangre** (r-nnn, `cover`), a `--e-16` de la descripción (Studio Iron 80) | 3:2 (1440 × 960) | 5:4 (768 × 614) | 5:4 (390 × 312) |
| 4 | **Otros encuentros del Libro**, a `--e-9`: rótulo centrado (`--t-bajada`, §12); a `--e-4` una fila de alto fijo con los otros seis registros a su proporción 4:3, sin recorte, calle 12, la activa centrada (`scroll-snap-align: center`), sin vuelta; a `--e-2` «← 01 / 06 →» (`.etiqueta-ancha`, `tabular-nums`, flechas de texto con 44 de área) centrado | alto 500 | alto 360 | caja de 280 de ancho (280 × 210), asoman las vecinas |
| 5 | «← LIBRO» (enlace de acción ancho), centrado a `--e-9` | | | |

2.11.1 · Sin bloque FEATURING ni fotos con personas. Sin cobalto (M6 = 0).

### 2.12 · Acerca `/acerca/` · Studio Iron: `/pages/about` (`global/about-1440-y00000.jpg`: texto de 600 a 72 px de la foto, pegado)

| Bloque | ≥ 1001 | ≤ 1000 |
|---|---|---|
| Mitades a sangre (1.4.3), pegadas a la cabecera | Izquierda: `muro/acerca` 2:3 (720 × 1.080 a 1440), sin persona (brief §7). Derecha: columna `.mitad-texto` con `padding-inline: var(--e-9)` (≈ 612 de texto) y `padding-top: var(--e-9)`, alineada arriba y pegada si cabe (1.6.3, D10-3) | Apilado (1.4.3): imagen a sangre a su proporción (768 × 1.152; 390 × 585), texto debajo a `--e-6` con `--margen-texto` |
| Texto, en orden | H1 «Acerca de Módulo 369» (`--t-titulo` recta) → `--e-4` enunciado de muestra (`--t-bajada`) → `--e-9` «MIRAR / *SELECCIONAR* / DECIDIR», una palabra por línea, `--t-titulo` mayúscula, «seleccionar» en itálica (de su mapa) → `--e-2` aviso «Maqueta · Las tres palabras…» → `--e-6` desarrollo de muestra (`--t-texto` 14/1,6) → `--e-6` H2 «CRITERIO CURATORIAL» (`--t-rotulo`) + texto → `--e-6` H2 «VISIÓN» + texto → `--e-9` «VER LOS ARTISTAS →» (enlace de acción ancho). Justificado | Igual, alineado a la izquierda; párrafos en 16/1,5 a ≤ 620 |

2.12.1 · Si el texto mide más que la imagen, la columna no se pega (1.6.3), la imagen queda arriba (`align-self: start`) y el texto define el alto.

### 2.13 · Tienda `/tienda/` · Studio Iron: `/collections/all-objects`

| Bloque | 1440 | 768 | 390 |
|---|---|---|---|
| H1 «TIENDA» centrado | a `--e-9` | | a `--e-6` |
| Opciones «Todo · Obras · Encuentro · Ediciones» (`--t-interfaz`, `aria-pressed`, activa subrayada) centradas a `--e-4`; conteo «7 PIEZAS» (`.etiqueta` gris) centrado a `--e-2` | | | opciones con `flex-wrap` |
| **Grilla** (1.4.1) de 7 tarjetas de tienda, a `--e-16` | 3 + 3 + 1 | 3 + 3 + 1 | 2 + 2 + 2 + 1, de borde a borde (2 × 194, costura) |
| **Cómo se compra** (página de texto 2.0.11, sin H1, columna de 704), a `--e-16`: H2 OBRAS · CONSULTAS · ENCUENTRO · EDICIONES + textos de copy; el aviso del carrito como último párrafo | | | |

2.13.1 · **Tarjeta de tienda** = 2.0.6 con: imagen `muro/{id}` (obras a-01, b-02, c-02), `encuentro/caja` 4:5 `cover` (caja) y `muro/e-0n` (tapas); autor a la derecha = quién lo hace («ARTISTA A» o «MÓDULO 369»); **en la segunda línea del pie, la vía como texto `.etiqueta` gris, sin borde** («MERCADO PAGO» o «AMAZON»); a `--e-2` debajo, un botón contorno «COMPRAR» (obras) o «VER EN AMAZON» (ediciones), con aviso al tocar (1.7.l). El botón queda fuera del enlace de la tarjeta (dos elementos hermanos).
2.13.2 · **La caja no se muestra como venta decidida** (brief §3 Activar y §9-4: se vende o se reparte está abierto). Su vía dice **«POR DECIDIR»** y su botón contorno es **«VER CÓMO SE ACTIVA»**, que lleva a Activar, donde están las dos opciones con su aviso en línea. Sin aviso al tocar en Tienda: no hay nada que simular.

### 2.14 · Contacto `/contacto/` · Studio Iron: página de texto + campo del pie

Página de texto (2.0.11, columna de 704): H1 «Contacto» (`--t-titulo` recta) → secciones a `--e-6`: **FORMULARIO** (chip de obra cargada si viene de una ficha, 4.12; campos 4.7; **botón lleno** «ENVIAR CONSULTA →», el SEND ENQUIRY de Studio Iron) · **CORREO** (dirección + aviso) · **INSTAGRAM** (muestra) · **NEWSLETTER** (aviso de no incluido siempre visible + campo de línea con «SUSCRIBIRME →» en `.etiqueta-ancha` dentro de la misma línea, a la derecha, como el pie de Studio Iron).

### 2.15 · 404

A `--e-16` de la cabecera: H1 «Esta página no existe.» (`--t-titulo` recta) centrado; a `--e-6` «VER LAS OBRAS →» y a `--e-4` «IR AL INICIO» (enlaces de acción anchos), centrados. Toda ruta desconocida termina acá.

---

## 3 · Plan de media

### 3.1 · Slots (ningún slot vacío, gris ni marcador: T2)

| # | Slot | Qué va | Origen | Proporción | Tratamiento |
|---|---|---|---|---|---|
| 3.1.1 | Láminas del carrusel (5) | c-04, a-07, b-05, a-02, c-02 en su muro con suelo | M07 d | 16:9 (≥ 621) · 4:5 (≤ 620), con `<picture>` | A sangre; la 1 `eager` + `fetchpriority="high"`, las otras `lazy` y pasan a `eager` al cargar la 1 (desvío 23) |
| 3.1.2 | Tarjetas de obra (Inicio, Obras en MURO, Artista, Tienda) | las 27 en su muro | M07 a | 4:5 | `cover` permitido (generada a 4:5 exacto) |
| 3.1.2b | Obras en LISTA | las 27, planas y enteras | M01 | la de la obra | `contain` implícito (caja a su proporción); `lazy` |
| 3.1.3 | Tarjetas de artista (Inicio, Artistas) y Biografía de B y C | a-07, b-07, c-07 en su muro | M07 a | 4:5 | |
| 3.1.4 | Miniaturas del panel Artistas, del submenú y del filtro | `todas-h` + a-07, b-07, c-07 en su muro | M07 b, c | 5:4 | |
| 3.1.5 | Hero de Artista | detalle de a-01, b-09, c-08 | M08 c | 21:9 · 5:4 | `eager`; rótulo «Detalle» |
| 3.1.6 | Obra sola de Artista | a-01, b-09, c-08 enteras | M01 | 3:2 | Plana, a sangre |
| 3.1.7 | Statement de Artista | a-04, b-04, c-04 en su muro | M07 a | 4:5 | |
| 3.1.8 | Ficha · vista general y detalle | la obra / su recorte | M01, M02 | la de la obra | Plana; general `eager` |
| 3.1.9 | Tapas (Ediciones, Edición) | e-01, e-02, e-03 | M03 | 5:7 | Planas |
| 3.1.10 | Tapas en Tienda | e-01 a e-03 en su muro | M07 f | 4:5 | |
| 3.1.11 | Interiores (Edición) | dobles páginas | M03 | 10:7 | Planas |
| 3.1.12 | Banda EDICIONES del inicio y banda de Ediciones | toma cenital de las tres ediciones cerradas sobre lino (nunca una doble página blanca) | M08 b | 16:9 · 4:5 | `cover`; M9c |
| 3.1.12b | Franja de Ediciones | e-01-i1, e-02-i1, e-02-i2, e-03-i2 | M03 | 3:4 por CSS | `cover`, declarado como interior en el `alt` |
| 3.1.13 | Banda ENCUENTRO del inicio y foto de Encuentro | recorte de la caja | M08 a | 16:9 · 4:5 | `cover` |
| 3.1.14 | Caja en Activar y Tienda | `encuentro/caja` | M04 | 1:1 en Activar · 4:5 en Tienda, por CSS | `cover` |
| 3.1.15 | Registros (Encuentro, Libro, encuentro activado, Activar) | r-001 a r-007 | M04 | 3:4 (franja) · 1:1 (bloques de edit) · 16:9 y 4:5 (cierre de Encuentro, r-007) · 3:2 · 5:4 por CSS; 4:3 natural en el carrusel | `cover` permitido (foto de objeto); M9c en los que van a sangre |
| 3.1.16 | Biografía de Artista A | taller | M05 | 4:5 | |
| 3.1.17 | Acerca | a-09 en su muro con suelo | M07 e | 2:3 | |
| 3.1.18 | Nivel 2 · fila de 4 detalles | 4 recortes por artista | M08 e | 3:4 | `cover` (detalle declarado) |
| 3.1.19 | Favicon | «369» | M06 | 1:1 | Sin cambio |

3.1.20 · **`alt`:** los de copy §4.1 y §4.3 y copy-muestra §10, más los nuevos de §12 (vistas en muro: «Obra de relleno: Campo 04, de Artista A, colgada en un muro»; heros: «Detalle de relleno…»; bandas: los de la caja y del interior). Todos dicen «de relleno» o «de muestra».
3.1.21 · Todo `<img>` con `width` y `height`, `decoding="async"` y fondo `--hueso-2` solo mientras carga (1.7.a, con el `span.lienzo` del desvío 17).


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
- **Artista C · «Línea» · tinta con pincel seco** (`obra_c2`): cerdas que siguen el trazo y se secan hacia el final; 3 a 7 trazos. Papel crema **(224,219,208)** en c-02, 03, 05, 06, 08 y 09: **más oscuro que el hueso**, a 27,3 de él (la versión anterior lo había movido hacia el blanco, (249,248,245), para pasar M9, y así la ficha de seis obras de C a 390 era un bloque casi blanco a sangre: contrato, cero blanco intenso). Estas seis van en el muro alternativo de M07 (a 32,4 de su papel). Papel negro (26,25,24) con tinta (226,220,206) en c-01, 04 y 07. **Sin el punto azul** de la v1.
- **Criterios:** (1) las 27 con distancia RGB media ≥ 20 entre su franja de borde de 12 px y el hueso, **y más oscuras que él** (M9); (1b) ninguna con más del 25% de píxeles de luminancia ≥ 245 (M9c: la ficha a 390 las lleva a sangre); (2) ningún píxel a distancia ≤ 12 de `#1F3BD6` en ninguna imagen (M21); (3) mirar la hoja de contacto de las 27 sobre hueso (`hoja.py` de `scratchpad/lucia-spec/`) antes de seguir: si una se lee como patrón de código y no como obra, se cambia su semilla.

### 3.3 · M02 · Variantes, detalle y peso (C19)

- Del original de 2.400: `{id}.jpg` de **1.600** px de ancho, `{id}-1200.jpg`, `{id}-600.jpg` (LANCZOS, `quality=82, optimize=True, progressive=True`).
- **Detalle:** ventana del 50% del ancho y del alto del original (misma proporción) en la posición de mayor contraste: se prueban 9 × 9 posiciones sobre la luminancia reducida a 1/8 y gana la de mayor desviación estándar (en la tinta de C, el centro puede ser papel vacío). Se guarda `{id}-detalle.jpg` a 1.200 px de ancho (sin agrandar) y `{id}-detalle-600.jpg`.
- `srcset` con `600w`, `1200w`, `1600w` (el detalle, con `600w` y `1200w`); `src` = la de 1200. `sizes` por slot (**actualizado para la revisión 2.1**, anchos de 1.3.9 y 1.4): tarjeta y vista en muro `(max-width:620px) 50vw, (max-width:1000px) 32vw, 33vw`; tira del inicio `(max-width:620px) 34vw, (max-width:1000px) 38vw, 33vw`; lámina, banda, hero, obra sola, franjas y fotos de evento `100vw` (franjas: `(max-width:620px) 50vw, 25vw`); mitad de bloque partido `(max-width:1000px) 100vw, 50vw`; ficha, edición y Lista `(max-width:1000px) 100vw, 55vw`; miniaturas, solo la de 600.
- **Peso:** `-600` ≤ 100 KB, `-1200` ≤ 300 KB, `1600` ≤ 550 KB (las recetas probadas pesan unos 200 KB a 1.600 con `quality=86`). Si una se pasa, se baja el grano de esa obra, no la calidad.

### 3.4 · M03 · Ediciones (3 tapas, 6 interiores)

Funciones `tapa` y `doble_pagina` de `proto_media.py` (fuente: `scratchpad/lucia-spec/fuentes/PlexMono-500.ttf`, la misma familia del sitio, bajada de Google Fonts).
- **e-01 · Cuaderno:** tapa lisa de cartón grafito (36,35,33), rótulo «EDICIÓN 01» arriba a la izquierda y «369» abajo, en Plex Mono hueso a 4,5% del ancho. Interiores: dos dobles páginas de puntos.
- **e-02 · Cuaderno:** tapa de cartón (168,150,120), rótulos en grafito. Interiores: una doble página de puntos y una rayada.
- **e-03 · Libro:** tapa de papel (220,212,196) con la lámina de c-02 centrada al 56% del ancho y el rótulo «EDICIÓN 03». Interiores: dos dobles páginas con una lámina cada una (c-05 y c-09) en la página derecha y su número de lámina en mono chico en la izquierda.
- Papel de los interiores **(218,213,201)**, más oscuro que el hueso (a 38 de él) y algo más que el papel de C, así las láminas de c-05 y c-09 impresas en e-03 se leen como láminas pegadas. La versión anterior lo había llevado a (250,249,244), casi blanco, y eso entraba a sangre en la banda del Inicio y en la pista de la Edición a 390 (contrato). Pliegue central como sombra dentro de la imagen. Criterio M9c.
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

### 3.8 · M07 · Vista en muro (precondición de D5 y D11; **receta corregida en la revisión 2.1**)

La función que llena las celdas como en Studio Iron sin recortar la obra: la obra **entera** (el original de M01, o la tapa de M03), **grande**, colgada en un muro con luz de foto y su sombra, generada a la proporción exacta del slot. Base probada el 5-oct en `scratchpad/lucia-si/muro.py`; la hoja `proto-muro.jpg` mostró el defecto que corrige esta versión: obras chicas (22% del área) sobre baldosas grises planas, que se leían como paspartú y como montaje. En Studio Iron la celda se ve llena porque el objeto ocupa casi todo el alto o el ancho, sobre un fondo de foto apenas más oscuro que la página (degradé de 246 a 235 sobre `#FFF`). Diego copia la receta dentro de `generar_relleno_v2.py` como `vista_muro()`, con su propio subcomando `muro`, y la escala por K como las demás (desvío 3).

- **Muro:** color base **(224, 220, 211)**, que varía ± 3 por canal con la semilla de cada imagen; a 24,8 del hueso y **siempre más oscuro que él** (nunca blanco, P5). **Luz de foto:** degradé horizontal del 4,5% (más claro a la izquierda, como la celda de Studio Iron) y caída de luz del 15% hacia los bordes (más clara arriba a la izquierda); ningún píxel del muro supera el base + 3; grano gaussiano σ 2,2. **Muro alternativo** (204, 200, 191), con la misma luz, para las obras cuyo borde no se separa del muro base (M9b): las seis de C con papel crema, e-03 (tapa (220,212,196), a 17,5 del muro base) y cualquier otra que no pase.
- **Suelo** (solo láminas y Acerca): banda inferior del 10 al 13% del alto a 0,86 × muro, con degradé hasta 0,80 en el borde inferior y una línea de unión de 2 px a 0,93.
- **Obra:** escalada para **tocar el primero que alcance de los dos lados de su caja** (ancho de caja × alto de caja, en fracciones de la imagen), centrada en (`cx`, `cy`). **Sombra dentro de la imagen:** el rectángulo de la obra desplazado (0,6% del ancho, 1,2% del ancho) hacia abajo y a la derecha, desenfoque gaussiano del 1,2% del ancho, a opacidad 0,38.
- **Salidas** (en `maqueta/img/muro/`, con `-1200` / `-600` según el uso, `quality=82`):

| # | Archivo | Proporción y tamaño | Obra | Caja de la obra (ancho × alto) y posición |
|---|---|---|---|---|
| a | `{id}.jpg` (las 27) | 4:5, 1.200 × 1.500 y `-600` | la obra | **0,80 × 0,74**, `cy` 0,46, sin suelo. Una 3:2 queda en 371 × 247 dentro de una celda de 464 × 580 (antes 297 × 198); una 4:5, en 343 × 429 |
| b | `{a-07,b-07,c-07}-h.jpg` | 5:4, 600 × 480 | la obra | 0,72 × 0,80 · `cy` 0,50 |
| c | `todas-h.jpg` | 5:4, 600 × 480 | a-07, b-07 y c-07 en fila | 0,26 × 0,70 cada una, centradas a 0,20 · 0,50 · 0,80, `cy` 0,48 |
| d | `lamina-{1..5}-h.jpg` y `lamina-{1..5}-v.jpg` | 16:9, 2.400 × 1.350 (y `-1600`, `-1200`) · 4:5, 1.200 × 1.500 (y `-600`) | las de 2.1.1 | 16:9: **alto de la obra 0,64**, suelo 0,12, `cx` de 2.1.1, `cy` 0,38 · 4:5: **0,56 × 0,70**, suelo 0,10, `cx` 0,30 / 0,70, `cy` 0,40 (angosta a propósito: la disrupción se tiene que ver a 390, D22; contrato sobre la caja de 0,82 × 0,70 que pedía la auditoría de fidelidad) |
| e | `acerca.jpg` | 2:3, 1.200 × 1.800 y `-600` | a-09 | 0,78 × 0,56 · `cy` 0,40 · suelo 0,12 |
| f | `e-0{1,2,3}.jpg` | 4:5, 1.200 × 1.500 y `-600` | la tapa | 0,64 × 0,74 · `cy` 0,48 (e-03 en el muro alternativo) |

- **Criterios:** (1) M9: muro contra hueso ≥ 20 y más oscuro; (2) **M9b:** franja de 12 px del borde de la obra contra el muro que la rodea ≥ 20; volver a medirla en las 27 con la receta nueva, **en particular a-03** (fondo (226,214,186): queda a 25,8 del muro base, justo) y las de C; la que no llegue usa el muro alternativo; (3) M21: ningún píxel cerca del cobalto; (4) **antes de seguir, mirar la hoja de contacto nueva de las 27 tarjetas, las 10 láminas y Acerca sobre hueso (`hoja.py`), puesta al lado de `referencias/studio-iron/tienda/si-tienda-1440-v0.jpg` y `home/1440-primer-viewport.jpg`**: la celda tiene que leerse llena, como una foto de estudio, no como una obra chica en una baldosa. Si una vista en muro se lee falsa (sombra dura, obra flotando, suelo que parece una franja), se baja la opacidad de la sombra o se quita el suelo de esa imagen, y se anota en `desvios.md`.
- **Por qué no es un paspartú** (P3): el muro no es interfaz; es una foto (generada) de la obra en un lugar, como las de Studio Iron, y la obra ocupa la mayor parte de la celda. La interfaz no agrega caja, borde ni fondo alrededor de la imagen.

### 3.9 · M08 · Recortes declarados (bandas y heros; nuevos)

| # | Archivo | De dónde sale | Tamaño | Regla |
|---|---|---|---|---|
| a | `encuentro/caja-banda-h.jpg` · `-v.jpg` | la caja (M04) | 16:9, 1.600 × 900 · 4:5, 960 × 1.200 | Recorte centrado; es foto de objeto |
| b | `ediciones/banda-h.jpg` · `-v.jpg` (reemplaza `e-03-banda`) | **toma cenital nueva**: las tres tapas de M03 cerradas, con giros de 2° a 6°, sombra de espesor y algo de solape, sobre lino (`superficie2`, la misma de los registros); nada de doble página abierta | 16:9, 1.600 × 900 · 4:5, 960 × 1.200 | Generada a cada proporción (sin recorte). Es la banda que cierra el Inicio y la de Ediciones; con la doble página blanca de e-03-i1, el 48% de sus píxeles pasaba de luminancia 245 y la última banda del Inicio era una losa blanca a sangre (contrato). Criterio M9c |
| c | `artistas/{a}-hero-h.jpg` · `-v.jpg` | la obra ancha de cada artista (a-01, b-09, c-08), **renderizada a 3.200 px de lado largo** solo para esto | 21:9, 1.920 × 823 · 5:4, 1.200 × 960 | Ventana del 60% del ancho (21:9) y del 40% (5:4) en la posición de mayor contraste con la regla de borde del desvío 6; es un **detalle declarado** (rótulo y `alt` dicen «Detalle») |
| d | registros | `encuentro/r-00n` (M04) | sin archivo nuevo | Proporciones por CSS (`aspect-ratio` + `cover` sobre la variante de 1.200) |
| e | nivel 2 · `artistas/{a}-det-{1..4}.jpg` | cuatro obras de la artista | 3:4, 720 × 960 | Ventana del 40% de mayor contraste; detalle declarado |

Peso: los topes de M02 (`-600` ≤ 100 KB, `-1200` ≤ 300 KB, 1.600 ≤ 550 KB); las láminas de 2.400 ≤ 700 KB.
**Tope de claridad de todo lo que va a sangre** (láminas, bandas, heros, obra sola, franjas, fotos de evento, la ficha a 390): M9c. Si un registro de hormigón o una superficie pasa el tope, se oscurece esa superficie, no se recorta distinto.

---

## 4 · Estados e interacción

| # | Pieza | Reposo | Hover (solo `hover:hover`) | Foco visible | Activo / presionado | Deshabilitado |
|---|---|---|---|---|---|---|
| 4.1 | Botón-fila | 2.0.13: fondo hueso, texto grafito, borde `--linea` | Fondo grafito, texto hueso, instantáneo (1.7.h) | El mismo cambio que el hover + contorno 2 px grafito a 3 px | Como hover, también al tocar | Texto gris, borde `--linea`, fondo hueso, sin hover |
| 4.2 | Botón lleno (solo enviar formularios) | 2.0.13: fondo grafito, texto hueso | Se invierte: fondo hueso, texto y borde grafito | Contorno 2 px grafito a 3 px | Como hover | Texto gris, borde `--linea`, fondo hueso |
| 4.3 | Botón contorno | 2.0.13 | `opacity` 0,7 (1.7.i) | igual | `opacity` 0,7 | Texto y borde gris |
| 4.4 | Enlace de acción ancho | 2.0.13 | Gris (1.7.i) | igual | Gris | n/a |
| 4.5 | Enlace de cabecera, pie, menú, opción de filtro | Sin subrayado | Subrayado que crece (1.7.f) | Subrayado + contorno | Gris mientras se presiona | Sección actual u opción activa: subrayado dibujado, `aria-current` / `aria-pressed` |
| 4.6 | Tarjeta (enlace) | 2.0.6 | Filo 1 px grafito sobre la imagen, instantáneo (1.7.g); nada más cambia | Contorno 2 px grafito **hacia adentro** (`outline-offset: -2px`) sobre imagen y pie; no lo recorta el carril ni lo tapa la tarjeta vecina (M25) | n/a | n/a |
| 4.7 | Campo de texto | Línea: texto 16 px, sin caja ni fondo, borde inferior 1 px **gris** (4,69:1; la línea de Studio Iron pasa de 40% a 100% con foco), padding `--e-2` 0, alto mínimo 44, radio 0, `-webkit-appearance: none` | n/a | Borde inferior grafito de 2 px (con `margin-bottom: -1px`) + contorno 2 px | n/a | n/a |
| 4.8 | Label | `.etiqueta` gris sobre el campo, a `--e-1` | | | | |
| 4.9 | Flecha cuadrada (carrusel, tira) | 28 × 28, borde `--linea`, carácter grafito; área de 44 | Borde grafito (1.7.c) | Contorno | n/a | Carácter gris, sin hover, `aria-disabled` |
| 4.10 | Segmento de paginación | Barra `--linea` + rótulo gris | Rótulo grafito | Contorno | `aria-pressed="true"`: barra y rótulo grafito | n/a |
| 4.11 | Miniatura (panel, submenú, filtro) | Imagen + nombre | Filo 1.7.g | Contorno | Filtro activo: filo fijo, `aria-pressed` | n/a |
| 4.12 | Chip de obra cargada (Contacto) | Texto Archivo 500 14 px + «Quitar» en `--t-chico`, borde 1 px grafito | «Quitar» subrayado | Contorno | n/a | n/a |
| 4.13 | `<summary>` | Texto 500 + «+» | Subrayado | Contorno | Abierto: «−» | n/a |
| 4.14 | Herramientas de la barra de aviso | `--t-chico` gris, `aria-pressed="false"` | Grafito | Contorno | `aria-pressed="true"`: grafito + línea de 1 px debajo | n/a |

4.15 · **Foco:** nunca `outline: none` sin reemplazo; contorno grafito de 2 px en todo el sitio, radio 0; en el pie, contorno hueso. **Nunca recortado:** dentro de un contenedor con `overflow` (pistas y carriles), el contorno va hacia adentro (`outline-offset: -2px`) o el contenedor tiene padding suficiente (el carril de la tira, `--e-1` arriba y abajo); la lámina de la portada no recibe foco (`tabindex="-1"`) y el foco va al enlace de su título, fuera de la pista (2.1). Se mide (M25). «Ir al contenido» (Studio Iron): caja grafito con texto hueso en `.etiqueta-ancha`, padding `--e-2` × `--e-3`, `position: absolute` arriba a la izquierda a `--e-2`, visible solo con foco.
4.16 · **Validación propia** (sin cambio): `novalidate`, `aria-invalid`, borde inferior grafito de 2 px, mensaje en `--t-chico` grafito con `aria-describedby`, foco al primer error; si todo está bien, aviso «Maqueta · No se envió nada…» (1.7.l) y el formulario se vacía.
4.17 · **Avisos al tocar** (Comprar, Comprar la caja, Amazon, Ver en Amazon, Enviar, Suscribirme): `preventDefault` y el aviso aparece debajo. Nunca `alert()`.
4.18 · **Estados vacíos:** Obras (2.4); Tienda filtrada sin piezas: texto de Clara + «VER TODAS».
4.19 · **Carga:** cada imagen reserva su espacio (`width` / `height` o `aspect-ratio`) y muestra `--hueso-2` hasta 1.7.a. Sin pantalla de carga, sin brillo animado (Studio Iron lo tiene; no se toma).
4.20 · **Navegación:** cambio de vista instantáneo (1.7.b); foco al `h1` de la vista nueva (`tabindex="-1"`, `preventScroll`); `document.title` por vista (6.3). **Volver** restaura la posición, los filtros de Obras y la lámina del inicio (C24, desvío 24).
4.21 · **Al bajar:** nada aparece ni se anima. Solo tres cosas pueden quedar pegadas, solo a ≥ 1001 y ninguna encima de una foto (D10). La cabecera y la barra de aviso se van con la página.
4.22 · **Menús** (2.0.3, 2.0.4): botones con `aria-expanded` y `aria-controls`; Escape cierra; el foco vuelve al botón; un menú abierto se cierra al navegar.
4.23 · **Filtros:** cada grupo filtra por su propio campo (técnica por la técnica de la obra, el error de la v1 en `app.js` L190), los grupos se combinan, el conteo se actualiza con `aria-live="polite"` y aparece «Quitar filtros» con alguno activo.
4.24 · **Carruseles** (portada, tira, pista de ficha y edición, otros encuentros): `overflow-x: auto`, `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, sin barra visible, `tabindex="0"` con flechas izquierda / derecha, controles actualizados con el scroll (listener pasivo + `requestAnimationFrame`), sin avance automático, sin vuelta. Reusa `montarPista()`.
4.25 · **Idioma:** botones ES / EN con `aria-pressed` (≥ 1001) o un botón con el otro idioma (≤ 1000), `aria-label` «Español» / «English»; cambia `lang` a `es-CL` o `en`; se guarda con `try/catch` y se mantiene al navegar; cambia la marca de muestra (8.1).
4.26 · **Áreas táctiles:** a ≤ 1000 **y con `@media (pointer: coarse)` en cualquier ancho** (un iPad horizontal entra en ≥ 1001), todo lo interactivo mide ≥ 44 × 44 (padding o margen negativo): enlaces de la cabecera (que pasa a 44 de alto), opciones de filtro, enlaces del pie (44 de alto también entre 621 y 1000, 2.0.14), flechas, segmentos, herramientas de la barra de aviso. Las casillas del Libro a ≤ 1000 y con puntero grueso no son interactivas.
4.27 · **Botón-fila de la ficha según el estado** (brief §4; una sola fila de acción por ficha, **clara en reposo en los cuatro estados**, misma posición; el estado 1 se distingue por su etiqueta y su valor, no por el relleno):

| Estado | Botón-fila (izquierda · derecha) | Debajo |
|---|---|---|
| 1 · Disponible, con precio y link | «Comprar» · «Mercado Pago →» | Línea de precio «CLP ···» (con marca) en los datos. Enlace de acción ancho «CONSULTAR POR ESTA OBRA» → Contacto con la obra cargada; aviso al tocar Comprar |
| 2 · Disponible, sin precio (a-06, c-05) | «Consultar por esta obra» · «→» | Línea «Precio a consultar» en los datos, **una sola vez** (no se repite en el botón) |
| 2 · Disponible, con precio y sin link (b-04) | «Consultar por esta obra» · «→» | Línea de precio «CLP ···» (con marca) en los datos; el botón no contradice el precio |
| 3 · Vendida | «Consultar por esta obra» · «→» | «Vendida» en gris en los datos |
| 4 · Colección privada | «Consultar por esta obra» · «→» | «Colección privada» en gris en los datos |

4.28 · **iOS:** `-webkit-text-size-adjust: 100%`; viewport sin `viewport-fit=cover` ni `maximum-scale`.

---

## 5 · Breakpoints

| # | Corte | Columnas | Por qué ahí | Qué cambia |
|---|---|---|---|---|
| 5.1 | ≥ 1001 | 9 | iPad horizontal y escritorio. Studio Iron cambia a cabecera de escritorio a 921 y apila lo partido bajo 1.024; la maqueta mantiene 1001 porque a 9 columnas el menú de la izquierda (356 px), la marca (118) y la derecha (≈ 200) caben con aire | Cabecera de texto y panel Artistas; marca enorme; ficha y Lista en dos columnas con cartela; mitades a sangre con su columna de texto pegada si cabe; pares del Libro en dos columnas; justificado; números en el mapa del Libro desde 1.300. **Con puntero grueso** (iPad): áreas de 44 y cabecera de 44 (4.26) |
| 5.2 | 621 a 1000 | 6 | iPad vertical y celular horizontal | Cabecera de botones y menú de pantalla; sin marca enorme; enunciado a 9vw; tiras de 2,5 con flechas; grillas de 3 × 240; ficha con pista y segmentos; **todo lo partido se apila como a 390** (bloques partidos, Acerca, Biografía, Statement, pares del Libro: imagen a sangre a su proporción y texto debajo; Studio Iron: «768 se comporta como 390»); Obras en MURO por defecto |
| 5.3 | ≤ 620 | 3 | Celulares en vertical (375 a 430) | Lámina y bandas 4:5; grillas de a 2 y tira de a 3 de borde a borde con costura de 1 px; bloques partidos apilados; títulos de 26 (nombre de artista 48); «FILTRAR» plegado; Acerca y Biografía en 16/1,5 |

5.4 · Sin ancho máximo: sobre 1440 la retícula sigue estirándose (Studio Iron también). 5.5 · `@media (hover:hover)` para todo hover; `@media (prefers-reduced-motion: reduce)` (1.7.2).

---

## 6 · Capa de señales (de Simón, `senales.md` §12)

6.1 · `<meta name="robots" content="noindex, nofollow">` en `index.html` y `_headers` con `/*` → `X-Robots-Tag: noindex, nofollow`. Nada de `robots.txt` con `Disallow`.
6.2 · Sin JSON-LD, canonical, hreflang, sitemap ni enlaces a modulo369.com.
6.3 · `<title>` por vista con el formato de copy §3.5: `{vista} · Módulo 369 · maqueta` / `{view} · Módulo 369 · mock-up`; inicio `Módulo 369 · maqueta`.
6.4 · `lang` del documento cambia con ES / EN (4.25).
6.5 · `og:title` «Módulo 369 · maqueta v2» y `og:description` «Maqueta para la reunión del 6 de octubre. Obras y artistas de relleno.», **sin `og:image`**.
6.6 · `theme-color` hueso (1.1.9) y favicon (M06).

---

## 7 · Lo que esta spec prohíbe explícitamente

Cada ítem es **regla**. Entre paréntesis, de dónde sale.

- **P1 · Nada fijo; nada pegado encima de una foto.** Cero `position: fixed` salvo `.reticula` (herramienta de maqueta, apagada por defecto, `pointer-events: none`). `position: sticky` solo en `.marca-enorme`, `.ficha-cartela` y `.mitad-texto`, solo a ≥ 1001, las dos últimas solo con `.pega` (si caben en la ventana), con las capas de 1.6.3, y con M23 en verde. Cero cabecera fija, barra de compra fija, texto pegado sobre una foto, flechas o pies montados sobre una imagen. (María contra Escat; brief §7; D10)
- **P2 · Nada encima de una imagen:** ni texto, ni pie, ni número, ni flechas, ni paginación, ni etiqueta de «Lo editas tú», ni marca de muestra, ni degradé. (María; D15)
- **P3 · La obra nunca se recorta ni se envuelve en interfaz:** cero `object-fit: cover` sobre una obra (sí sobre la vista en muro generada a su proporción, fotos de objeto y detalles declarados, 1.4.6); cero paspartú, marco, caja, borde o sombra de interfaz alrededor de una obra en reposo (el filo de 1.7.g existe solo durante el hover). (D11)
- **P4 · Cero profundidad de interfaz:** sin `box-shadow`, `drop-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`, velos ni desenfoque; `transform` solo según 1.6.4. (Perrotin; spec)
- **P5 · Cero blanco en la interfaz ni en las imágenes de relleno:** ningún color fuera de los seis tokens; papel y muro de las imágenes siempre más oscuros que el hueso; ninguna imagen a sangre con más del 25% de píxeles de luminancia ≥ 245 (M9c). (María contra Perrotin)
- **P6 · Cobalto solo en su lista de dos** (D6: el punto del enunciado y la «/» del contador de Encuentro). Nunca en foco, hover, página actual, enlace, botón, borde, fondo, estado, retícula, «Lo editas tú», marca de muestra ni imagen de relleno.
- **P7 · Tres familias, sin otras:** Archivo, IBM Plex Mono, Instrument Serif. La itálica solo en Instrument Serif y solo en los roles de 1.2.12; `font-synthesis: none`. (D7)
- **P8 · Sin tamaños fuera de la escala** (1.2.11), **espaciados fuera de los tokens** (1.3.13) **ni duraciones o curvas fuera de 1.7.**
- **P9 · Radio 0 en todo.**
- **P10 · Nada se superpone a nada en reposo,** salvo la retícula encendida y la lámina que tapa la marca enorme al bajar (que es el efecto pedido).
- **P11 · Sin carrusel enmarcado ni automático:** sin fondo, borde ni sombra de lámina; sin avance automático; sin vuelta al principio; sin Swiper.
- **P12 · Sin animación al bajar, sin parallax, sin aceleración del hero, sin `scale` en hover, sin pantalla de carga, sin brillo animado, sin cursor propio, sin Lenis ni librerías de carrusel.** (Studio Iron excluido en esos puntos)
- **P13 · Artistas:** ninguna representada por un retrato, ninguna foto con personas; nunca una lista de nombres sin obra. (Kurimanzutto; Perrotin; brief §7)
- **P14 · Cero cifras de precio y cero signo «$».** (brief §6)
- **P15 · Sin rayas largas ni medias** en textos visibles ni en `content:`. (manual de marca)
- **P16 · Sin fakes de CSS para imágenes:** ni tapas, ni salas, ni muros dibujados con CSS; el muro es una imagen generada (M07). (tell #9)
- **P17 · Sin información que solo aparezca con puntero** (Studio Iron esconde el pie de tarjeta en el carrusel de Black Metal; no se toma).
- **P18 · Sin franja lateral decorativa.** (tell #6)
- **P19 · Sin `transition: all`** y sin `outline: none` sin reemplazo.
- **P20 · Sin emoji, iconos de relleno, mascota ni emblema;** las flechas son «→», «←», «›», «‹» y «↓»; el menú se dibuja con dos rayas.
- **P21 · Sin `maximum-scale` ni `user-scalable=no`.**
- **P22 · Nada de la maqueta llega a producción:** retícula, «Lo editas tú», avisos, marca de muestra, texto de muestra, `img/`. (brief §6, §8-4)
- **P23 · Sin panel dibujado ni páginas de reunión.** (brief §8-3)
- **P24 · Ninguna instrucción en pantalla:** cero corchetes y cero «Lo escribe…», en ES y EN. (brief §6)
- **P25 · Ninguna posición de imagen vacía o gris.** (brief §7)
- **P26 · El texto de muestra nunca** trae cifras de precio, fechas reales, nombres reales, atribución a María ni la declaración textual de su correo, y nunca va sin su marca. (brief §6)
- **P27 · Sin carrito, cuenta, búsqueda, bolsa, tallas ni newsletter funcionando.** «Tienda» es un enlace; el newsletter vive solo en Contacto, marcado como no incluido. (brief §8)
- **P28 · Sin texto justificado a ≤ 1000** ni «·» huérfano al inicio de una línea. (ríos de Studio Iron a 390)

---

## 8 · Capas de la maqueta

### 8.1 · La marca de muestra (D17)

- **8.1.1 · Qué marca:** todo texto de `copy-muestra.md` (statement, biografía, historia y proceso, visión curatorial, enunciado, desarrollo, criterio, visión, presentación y descripción de ediciones, páginas y formato, descripción de cada obra, precio de muestra, textos de Encuentro y Activar, preguntas y respuestas, fecha, lugar y descripción de cada encuentro, Instagram, la pregunta del formulario de Activar, los pies de las fotos nuevas). Los datos de obra generados (título, año, técnica, medidas) y «Artista A, B, C» **no** llevan marca: los cubre el aviso global (brief §6).
- **8.1.2 · Cómo se ve:** el texto de muestra va en el color, el tamaño y el estilo de su rol (grafito; el statement en la itálica de 1.2.6; en el pie, hueso): se lee terminado. Al final de su última línea lleva la palabra **«muestra»** / **«sample»** en Plex Mono 500 de 12 px, gris, minúscula, tracking 0,04em, separada `0.4em`, levantada `0.5em` con `position: relative; top: -0.5em` (no altera el interlineado) y `white-space: nowrap`.
- **8.1.3 · Cómo se construye:** clase `.pendiente` en el elemento que contiene el texto (si son varios párrafos, en el último `p`); `.pendiente::after { content: attr(data-muestra) }`; el JS escribe `data-muestra` con «muestra» o «sample» según el idioma, en cada cambio de idioma.
- **8.1.4 · Regla de conteo:** una marca por cada `.pendiente`, siempre al final, nunca dentro de una frase ni sobre una imagen. En una línea o fila de datos, cada dato de muestra lleva su marca (la línea de precio de la cartela tiene una; la fila de datos de un encuentro activado, dos).
- **8.1.5 · Por qué así:** es la convención de una llamada de nota; en Plex Mono, la familia de los datos y de las mayúsculas espaciadas de Studio Iron, se distingue del texto sin ensuciarlo. Respeta P2 (nada encima de una obra) y P6 (sin cobalto).

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
| Datos de la ficha: Disponibilidad y Precio | la línea de cada una en la cartela |
| Índice de Artistas y panel Artistas | la grilla de Artistas; el panel |
| Página de artista: nombre, statement e imagen de Biografía (foto de taller o obra) | el H1, el statement y la imagen de Biografía |
| Tapa de edición | la primera tapa |
| Encuentro del Libro y su ficha | la galería de activados; el bloque de datos del encuentro |
| Contador del Libro y de Encuentro | el bloque del contador |
| Láminas del inicio (la vista en muro) | la sección de la portada, no la lámina |
| Todo texto de muestra | el primer `.pendiente` de la vista |
| Correo e Instagram de Contacto | su bloque |
| Texto fijo (menú, pie, el botón principal de cada vista, «Cómo se compra») | contorno punteado gris y la etiqueta de texto fijo |

- **8.2.6 · Ficha:** con la capa encendida aparecen además «Estado X de 4 · …» y «Ver estado 1 · 2 · 3 · 4» (copy §5-5), en chico grafito, que enlazan a a-04, a-06, a-05 y a-03, más «· 2 con precio» (slot 25d), que enlaza a b-04, el estado 2 con precio y sin link (2.5.1).

### 8.3 · Retícula (herramienta de maqueta, no va a producción)

- **8.3.1 · Activación:** botón «Retícula» / «Grid» con `aria-pressed`; `body.ver-reticula`. Apagada al cargar. 1.7.n.
- **8.3.2 · Cómo se ve:** capa `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 50`, `aria-hidden`, con el margen y la calle del ancho (9 · 6 · 3 columnas). Cada columna **sin relleno**: solo sus dos bordes, una línea de 1 px grafito con 1 px hueso al lado (se ve sobre hueso y sobre obras oscuras sin teñirlas). Arriba de cada columna, su número en chico grafito sobre un chip hueso.
- **8.3.3 · Por qué así (C03):** el cobalto es la disrupción del diseño; si la herramienta lo usa, María lo lee como parte del sitio. El relleno de color de la v1 teñía las obras (brief §8-4).
- **8.3.4 · Criterio:** a 1440, 768 y 390 se ven 9, 6 y 3 columnas numeradas, y ninguna obra cambia de color (muestreo de píxeles lejos de las líneas, con y sin capa).

### 8.4 · Aviso global y avisos de maqueta

- 8.4.1 · Aviso global: 2.0.1 (texto de copy §3.1, completo en todos los anchos).
- 8.4.2 · Avisos de maqueta (`.nota-maqueta`): chico gris, minúscula normal, empiezan con «Maqueta ·» / «Mock-up ·» en el texto, ancho máximo 4 columnas a 1440; sin franja, sin fondo, sin icono. Los «en línea» de copy §7, siempre visibles; los «al tocar», ocultos hasta el toque (1.7.k).
- 8.4.3 · Sin botón «Notas» (copy 3.2).

---

## 9 · Cambios del diagnóstico (C01 a C41): qué se mueve con Studio Iron

Lo no listado sigue como en la versión anterior (git `b7393c4`, §9).

| C | Antes (PRODn) | Ahora (Studio Iron) |
|---|---|---|
| C01 | Desplazamiento por la regla de filas | Desplazamiento por la obra fuera del centro del muro (2.1.1); grilla uniforme (D12) |
| C04 | Indicador de Schipper con números y raya | «← 01 / 05 →» con flechas cuadradas, en una línea bajo la lámina |
| C05 | Palabra enorme ARTISTAS con la I cobalto | Marca enorme (≥ 1001; no existe a ≤ 1000, D22); cobalto en el punto del enunciado |
| C07 | Índice con hallazgo | Sale; entra la vista Lista en el nivel 1, por defecto a ≥ 1001 (2.4.1) |
| C21, C22, C25 | Regla de filas; grilla de 3 artistas sobre una línea; zigzag a 390 | Grilla uniforme 3 / 2; tarjetas de artista |
| C26 | Menú en el flujo con ítems de 26 | Menú en el flujo con ítems serif de 36, centrados, y subnivel |
| C35 | Sale la serif | Vuelve Instrument Serif con roles (D7) |
| C36 | Vacíos de 96 a 144 entre secciones | Densidad de Studio Iron: **0 entre bloques de imagen; `--e-9` solo antes y después de un bloque de texto puro**; la última imagen a sangre de una vista toca el pie |
| C37 | Pista con miniaturas de 56 px | Imágenes apiladas a ≥ 1001; pista con segmentos a ≤ 1000 |
| C38 | View Transitions | Cambio de vista instantáneo (D16) |
| C41 | Inicio negro: no | Pie en grafito: sí (D14) |

---

## 10 · Verificación (Javiera)

### 10.1 · Cómo se mide
Capturas a 1440 × 900 y a 768 × 1024 con Chrome headless; **390 × 844 real por CDP** (`Emulation.setDeviceMetricsOverride` con `width: 390`, `deviceScaleFactor: 2`, `mobile: true`, user agent de iPhone; las herramientas de `referencias/studio-iron/disenador/tools/` sirven), y 390 × 664 para el pliegue de Safari. Esperar la red en reposo. El overflow se mide en la página.

### 10.2 · Mediciones

| # | Qué | Pasa si |
|---|---|---|
| M1 | Scroll horizontal en las 14 vistas + 404, a 390, 768 y 1440 | `scrollWidth === clientWidth` |
| M2 | Superposiciones en reposo (P10) | Ningún par de rectángulos de imagen y texto se cruza (salvo retícula) |
| M3 | Pliegue del inicio (2.1.2) | A 390 × 664 el borde inferior de la línea de pie y controles ≤ 664; a 1440 × 900 la obra de la lámina 1 entera dentro del viewport |
| M4 | Marca enorme (1.2.13) | Tinta a ≤ 6 px de los bordes de `c1` y `c9`; no existe a ≤ 1000 |
| M5 | Contador contra enlace vertical (2.8.1) | El contador termina antes, en los tres anchos |
| M6 | Cobalto en la interfaz | 1 elemento en Inicio y en Encuentro; **0 en el encuentro activado** y en las demás |
| M7 | Búsqueda en `styles.css`, `app.js` e `index.html` | 0 `fixed` fuera de `.reticula`; `sticky` solo en `.marca-enorme`, `.ficha-cartela` y `.mitad-texto` (las dos últimas solo bajo `.pega`); 0 `box-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`; `transform` según 1.6.4; 0 `#fff`, `white`; 0 hex fuera de los seis; `italic` solo en reglas de Instrument Serif; 0 `border-radius` ≠ 0; 0 `transition: all`; tamaños solo de 1.2.11; duraciones solo 150 / 300 / 400 ms (y 70 ms) |
| M8 | Grillas y tiras (1.4.1, 1.4.2) | A 1440, tarjetas de 464 ± 1 en x = 12, 488, 964; a 768, de 240 ± 1; **a 390, de 194 ± 1 en x = 1 y 196 (calle de 1 px)**; tira a 390 de **129 ± 1**, 3 por vista, sin asomo, primera en x = 0 |
| M9 | Bordes de imagen de relleno contra el hueso | ≥ 20 en todas (M01, M03, M04, M07) **y más oscuros que el hueso** (luminancia media de la franja < la del hueso) |
| M9c | **Tope de blanco a sangre** (contrato: cero blanco intenso) | En toda imagen que va a sangre (láminas, bandas, heros, obra sola, franjas, fotos de evento, la ficha y la Lista a ≤ 1000, la pista de la Edición), **≤ 25% de píxeles con luminancia ≥ 245**; medido con Pillow sobre la variante servida |
| M9b | Borde de la obra contra su muro (M07) | ≥ 20 en las 27 |
| M10 | Caja del `img` en ficha, Lista y obra sola | Su proporción coincide con la natural (± 1%); a ≥ 1001, vista general y detalle de la ficha con el mismo ancho (± 1 px) |
| M11 | Campos a 390 | `font-size` 16 px; alto ≥ 44 |
| M12 | Áreas táctiles a ≤ 1000 y con puntero grueso | ≥ 44 × 44 a 390 y 768, y **también a 1024 × 768 con emulación táctil** (CDP `Emulation.setTouchEmulationEnabled`, comprobando `matchMedia('(pointer: coarse)').matches`): cabecera, filtros, pie, flechas |
| M13 | Retícula | 9 / 6 / 3 columnas con margen y calle de 12; obras sin cambio de color |
| M14 | Peso | Topes de M02 y M08; sin variante de 1.600 o más en `#/obras` a 390 |
| M15 | Fuentes | Archivo, IBM Plex Mono e Instrument Serif (normal e italic) en `document.fonts`, `loaded` |
| M16 | Corchetes (P24) | 0 en las 14 vistas, ES y EN, con «Lo editas tú» apagada y encendida |
| M17 | Imágenes (T2, P25) | Todo `img` con `complete && naturalWidth > 0` (también las láminas y tiras fuera de la vista, tras deslizarlas) |
| M18 | Marca de muestra | Por vista, `.pendiente` = marcas visibles; «muestra» / «sample»; **una descripción marcada en cada una de las 27 fichas y de las 3 ediciones** (conteo en ES y EN) |
| M19 | Movimiento reducido | `transition-duration` 0 s en el catálogo; `scrollTo` sin `smooth` |
| M20 | Movimiento normal | Duraciones y curvas computadas = tokens |
| M21 | Cobalto en imágenes | 0 píxeles a ≤ 12 de `#1F3BD6` en `img/` |
| M22 | Mapa del Libro | 41 × 9 en los tres anchos; números solo si la casilla mide ≥ 28 px; **contraste del borde de la casilla vacía contra el hueso ≥ 3:1** (WCAG 1.4.11) |
| M23 | **Nada pegado sobre una foto** (D10, P1) | Bajando con rueda real en pasos de 120 px por Inicio, Artista, Ficha, Encuentro, Activar, Ediciones y Acerca a 1440, y por las mismas a 390: en cada paso, ningún elemento `fixed` o `sticky` (salvo la retícula apagada) tiene un rectángulo visible que intersecte un `img` que esté **por encima** de él en el apilamiento. La marca enorme puede intersectar la lámina solo cuando la lámina está encima (`elementFromPoint` en la zona común devuelve la lámina). **Casos de la cartela y de `.mitad-texto`:** (a) a 1440 × 900 la cartela de a-04 con «Cómo se compra» abierto y el aviso de Comprar visible no queda pegada si no cabe (sin `.pega`) y todo su contenido se alcanza bajando; (b) una columna de texto más alta que su imagen no se pega; (c) a 390 no hay ningún `sticky` activo |
| M24 | **Lado a lado con Studio Iron** (T8) | Inicio ↔ `home/1440-primer-viewport.jpg`, `home/1440-seq-01320.jpg`, `home/390-seq-00000.jpg`; Artistas ↔ `home/1440-i-menu-design-abierto.jpg`; Artista ↔ `disenador/andu-1440-full.jpg`, `disenador/andu-390-full.jpg`; **Obras en Lista ↔ `tienda/si-art-1440-v0.jpg`, `tienda/si-art-390-v0.jpg`**; Obras en Muro y Tienda ↔ `tienda/si-tienda-1440-v0.jpg`, `tienda/si-tienda-390-v0.jpg`; Ficha ↔ `producto/obra-record-separator-1440-v0.jpg`, `producto/obra-record-separator-1440-full.jpg`, `producto/tubular-chair-1440-v0.jpg` (la fila de compra), `producto/tubular-chair-390-v0.jpg`; Ediciones ↔ `eventos/blackmetal-1440-full.jpg`, `eventos/ldf-1440-s01620.jpg`; Encuentro ↔ `eventos/ldf-1440-full.jpg`, `eventos/blackmetal-1440-s00000.jpg`; Libro ↔ `eventos/indice-1440-full.jpg`, `eventos/indice-768-full.jpg`; encuentro activado ↔ `eventos/evento-saatchi-1440-s00000.jpg`, `eventos/evento-saatchi-1440-full.jpg`; Artista a 768 ↔ `disenador/andu-768-full.jpg`; Artista (densidad) ↔ `disenador/kouros-1440-full.jpg`; Inicio (cierre) ↔ `home/1440-full.jpg`; tiras a 390 ↔ `home/390-seq-00422.jpg`; Acerca ↔ `global/about-1440-y00000.jpg`; Contacto y Activar ↔ `global/ship-1440-y00000.jpg`; pie ↔ `global/about-390-y01500.jpg`; menú 390 ↔ `home/390-i-menu-abierto.jpg`. Por par, Javiera escribe si la v2 se lee como el mismo sitio traducido a hueso y grafito, y qué le falta. **Las disrupciones de D22 se juzgan a 1440 y a 390**, cada una contra su columna |
| M25 | **Foco visible y sin recorte** (WCAG 2.4.7; contrato) | Con Tab a 1440 y a 390, en cada enlace de la portada (incluido el título de la línea de pie, que reemplaza a la lámina como parada) y de las dos tiras, y en las tarjetas de una grilla de 390: el anillo de 2 px se ve **entero** (sus cuatro lados dentro de la caja visible de todo contenedor con `overflow`, y sin quedar tapado por la tarjeta vecina); la lámina no recibe foco |

---

## 11 · Detector anti-slop corrido sobre esta spec (5-oct, noche)

- **Rasgos filosos preservados (tell #7):** los trece del lock (`referencias.md` §1) están en D2 a D15 y §2; el blanco y el negro pasan a hueso y grafito por restricción de la clienta y por tokens, no por promedio. El pie grafito y la marca enorme pegada debajo de la foto se toman; la serif vuelve con itálica. ✓
- **Lienzo crema (patrón #4):** el hueso es restricción de la clienta (Perrotin) y el caso cultural que el detector exceptúa. La serif itálica vuelve, pero **con rol** (nombre, título de obra, statement, marca), no como adorno de una palabra suelta. **Abierto con justificación.**
- **Acento cercano al índigo:** el cobalto, en su lista cerrada de dos trazos (D6). **Abierto con justificación.**
- **Palabra destacada con otro color:** el punto del enunciado. Disrupción pedida por María, con rol, una vez por vista con cobalto. **Abierto con justificación.**
- **Tres iguales (B1):** las tres artistas y las tres ediciones van del mismo tamaño porque así es la grilla de Studio Iron; las diferencia su obra. Las ediciones alternan el lado. **Abierto con justificación.**
- **Hero de una pantalla (B6):** la portada abre con marca y foto como Studio Iron; a 390 el enunciado entra en el primer viewport. ✓
- **Tarjetas:** no hay tarjetas con caja ni chips: la «tarjeta» es una imagen llena y un pie, como Studio Iron; a 390, mosaico de borde a borde. ✓
- **Botón pesado (revisión 2.1):** la fila de acción es clara en reposo, como Studio Iron; el relleno grafito existe solo para enviar un formulario. ✓
- **Escala de texto inflada (revisión 2.1):** el texto sans va a 12-15 px como Studio Iron; 16 solo en campos y en dos textos a 390. ✓
- **Media (tell #9):** todo slot con imagen generada y marcada; la vista en muro es imagen, no CSS (P16). ✓
- **Movimiento por defecto:** sin `transition: all .3s ease`, sin aparición al bajar; tiempos de Studio Iron. ✓
- **Roles de token (tell #8):** cada token con «dónde no»; grafito como fondo solo en el pie. ✓
- **Logo tapado / rubro cambiado (D):** con la marca tapada, se ve una galería de arte con obra colgada, contador 001/369 y mapa de 369; no es una tienda de objetos genérica. ✓
- **Copy (A):** esta spec no escribe copy; lo que necesita está en §12.

---

## 12 · Slots de copy nuevos o cambiados (para Clara)

Todo en ES y EN. «Fijo» = texto de interfaz (lo escribe Clara y lo traduce SpindleLab); «muestra» = texto de muestra con `.pendiente` y su marca (brief §6, P26). Donde se reusa un texto existente, Clara confirma que funciona en su nuevo lugar.

### 12.1 · Cromo
| # | Slot | Tipo | Qué tiene que hacer |
|---|---|---|---|
| 1 | Botón de menú (≤ 1000), `aria-label` | Fijo | Abrir y cerrar («Abrir menú» / «Cerrar menú»); ya no lleva texto visible |
| 2 | Panel y submenú Artistas: primera celda | Fijo | «Todas las artistas» / «All artists» |
| 3 | Submenú: volver | Fijo | «‹ Volver» / «‹ Back» |
| 4 | **Titular del pie** | Fijo | Una frase en mayúsculas, ≤ 10 palabras, que invite a escribir por lo que la galería ofrece, con **tres palabras** que irán en itálica (por ejemplo, obra, edición y encuentro). Sin newsletter. Sin cifras |
| 5 | Enlace del pie | Fijo | «Escribir una consulta →» o equivalente corto |
| 6 | Rótulos de columnas del pie | Fijo | Tres rótulos de una palabra (propuesta: Galería · Módulo 369 · Redes) |
| 7 | Línea legal del pie | Fijo | Reusa el descriptor de copy 3.4 («Galería de arte en línea») + dominio |

### 12.2 · Inicio
| # | Slot | Tipo | Qué tiene que hacer |
|---|---|---|---|
| 8 | **Enunciado: H2** (`inicio.enunciado`) | Muestra | ≤ 7 palabras, en la voz de la galería, termina en punto (el punto va en cobalto); no usa la frase privada de María ni «orden con pequeñas disrupciones». **Revierte copy 2.2**, que sacó el enunciado del inicio: Studio Iron lo tiene y es la palabra enorme a 390 |
| 9 | Enunciado: párrafo | Muestra | Reusa `acerca.enunciado` (copy-muestra §11) tal cual o recortado a ≤ 40 palabras; María escribe un solo texto, como Studio Iron, que repite su enunciado en About |
| 10 | Línea de pie del carrusel | Fijo | El título con el año entre paréntesis, «Campo 04 (2025)», y el autor; reemplaza «Artista A · Campo 04, 2025» |
| 11 | Banda Encuentro: rótulo | Fijo | «007/369 · activados de muestra» (reordena el «activados · de muestra» de copy) |
| 12 | Banda Encuentro: párrafo (`inicio.encuentro`) | Muestra | ≤ 30 palabras, qué es Encuentro en dos frases; puede salir de `encuentro.que-es` |
| 13 | Banda Ediciones: párrafo (`inicio.ediciones`) | Muestra | ≤ 30 palabras; puede salir de `ediciones.presentacion` |
| 14 | Enlaces de banda | Fijo | «Qué es Encuentro» (sin flecha) · «Ver las ediciones» |
| 15 | Tiras: `aria-label` de pista y flechas | Fijo | «Obras» / «Artistas»; «Anterior» / «Siguiente» |
| 16 | Tarjeta de artista: conteo | Fijo | «{n} obras» / «{n} works» |

### 12.3 · Artista, Obras, Ficha
| # | Slot | Tipo | Qué tiene que hacer |
|---|---|---|---|
| 17 | Rótulo del hero | Fijo | «Detalle · Campo 01, 2025» / «Detail · Field 01, 2025» + su `alt` («Detalle de relleno de…») |
| 18 | Rótulo de Biografía | Fijo | «Biografía» / «Biography» |
| 19 | Aviso de la imagen de Biografía | Fijo | A: la foto de taller es opcional. B y C: «si la artista no tiene foto de taller, aquí va una obra suya». Reemplaza el aviso único del desvío 14 |
| 20 | Statement | Muestra | El de copy-muestra §3 ahora se lee en itálica de 36 px junto a una obra, en una columna de ≈ 672 px: **≤ 35 palabras**; si es más largo, una versión corta. Sin comillas. **Corregir los de B y C** (desvío 2: describen el relleno de la v1; el de C, también contra el papel crema de 3.2) |
| 21 | Filtros de Obras | Fijo | Rótulos «Técnica», «Tamaño», «Disponibilidad»; «Todas las artistas» en la celda; opciones de copy 4.4; vista «Muro · Lista» (Lista reemplaza a Índice) |
| 22 | Pie de tarjeta | Fijo | Título con el año entre paréntesis («Campo 04 (2025)») |
| 23 | **H1 de la ficha** | Fijo | Título y año tras coma, «Campo 04, 2025»; la fila «Año» sale del `dl` (cambia copy 4.3) |
| 24 | Rótulos de imagen | Fijo | «01 · Vista general» / «02 · Detalle» (y «01 · Portada», «02 · Interior» en Edición) |
| 25 | **Botón-fila por estado** (4.27) | Fijo | Estado 1: «Comprar» + «Mercado Pago →». **Estados 2, 3 y 4: «Consultar por esta obra» + «→»** (contrato: el estado 2 ya no dice «Precio a consultar» en el botón, y la 25b de copy 12.3, «Consultar el precio · →», se reemplaza por este par: con «→» solo cabe a 390). Y el enlace «Consultar por esta obra» del estado 1 |
| 25c | Línea de precio de la cartela | Fijo + muestra | Sin rótulo (2.5): con precio, «CLP ···» con su marca (copy-muestra §9, fila «Precio de obra»); sin precio, **«Precio a consultar» / «Price on request»** (vuelve el texto de copy 4.2: la abreviación «A consultar» de 12.0 solo se leía bien con el rótulo «Precio», que ya no existe) |
| 25d | «Lo editas tú», enlace al estado 2 con precio | Fijo | «2 con precio» / «2 with price», junto a «Ver estado 1 · 2 · 3 · 4» (8.2.6) |
| 25e | Disponibilidad en la cartela | Fijo | «Disponible» / «Available», «Vendida» / «Sold», «Colección privada» / «Private collection» (existen en copy 4.2) |
| 26 | «› Cómo se compra» | Fijo | El resumen; el contenido reusa compraObras y compraConsultas de Tienda |
| 27 | **Descripciones de las 27 obras** | Muestra | **Bloqueante antes del QA** (contrato: el brief §7 exige la descripción de cada obra y edición con su marca; desvío 30). Las 27, reescritas contra las hojas de M01 (`capturas/maqueta-v2/relleno-hoja-*.png`) **y contra la paleta corregida de C** (papel crema, 3.2), con `.pendiente` y su marca, en ES y EN, ≤ 45 palabras cada una (van en `--t-dato`, en la cartela de 464). Se cuentan en M18 |

### 12.4 · Ediciones, Encuentro, Libro, Acerca, Tienda, Contacto
| # | Slot | Tipo | Qué tiene que hacer |
|---|---|---|---|
| 28 | Descripción breve de cada edición (bloque partido) | Muestra | ≤ 35 palabras, de `edicion.<n>` |
| 29 | Botón de edición | Fijo | «Ver la edición»; en la Edición, botón-fila «Comprar» + «Amazon →» (copy 12.4-29) |
| 29b | `alt` de la franja de Ediciones y de la banda nueva | Fijo | «Interior de relleno de la Edición 0n» (franja); «Vista de relleno: las tres ediciones cerradas sobre una mesa» (banda M08 b) |
| 30 | Encuentro: categoría de bloques | Fijo | «Encuentro»; títulos «Cómo funciona», «Formas de activación» (existen como H2) |
| 31 | Encuentro: enlace bajo la franja | Fijo | «Ver el Libro» |
| 32 | Activar: categorías | Fijo | «Opción 1» / «Opción 2» |
| 33 | Encuentro activado: rótulo del carrusel | Fijo | «Otros encuentros del Libro» / «Other encounters in the Libro» |
| 33b | **Encuentro activado: H1 y fila de datos** | Fijo | H1 «Encuentro {nnn}» / «Encounter {nnn}» (en mayúsculas por CSS); fila «{nnn}/369 · fecha · lugar» (fecha y lugar de muestra, con marca); el `aria-label` «Encuentro 001 de 369» pasa a la fila de datos |
| 34 | Libro: «Encuentro 007» | Fijo | Patrón «Encuentro {nnn}» (existe) |
| 35 | Tienda: opciones y conteo | Fijo | «Todo · Obras · Encuentro · Ediciones»; «{n} piezas» |
| 36 | Tienda: vía (texto gris, sin chip) y botones | Fijo | «Mercado Pago», «Amazon»; «Comprar», «Ver en Amazon», con su aviso al tocar. **Caja: vía «Por decidir» / «To be decided» y botón «Ver cómo se activa» / «See how to activate»** (lleva a Activar; contrato, brief §9-4) |
| 37 | Contacto: H2 y botones | Fijo | «Formulario», «Correo», «Instagram», «Newsletter»; botón «Suscribirme →». El envío del formulario pasa de botón-fila a **botón lleno** «Enviar consulta →» / «Send enquiry →» (y en Activar «Enviar solicitud →»), en mayúsculas por CSS: cambia la forma de 37b y 32b de copy 12.4, no el texto |
| 38 | `alt` de las imágenes nuevas | Fijo | Vistas en muro («Obra de relleno: Campo 04, de Artista A, colgada en un muro»), láminas, bandas, Acerca («Vista de relleno: una obra en un muro»), tapas en muro; todos con «de relleno» o «de muestra» |

---

## 13 · Plan de construcción (para Diego): 5 tramos

Sobre `GALERIA-MARIA-LORETO/maqueta/` en `claude/maqueta-v2`, a partir del commit WIP `1270189`. `?v=N` sube en cada archivo tocado. Cada tramo termina con capturas a 390 (CDP), 768 y 1440 de lo que tocó, y con sus desvíos en `desvios.md`.

### 13.0 · Qué del WIP se reutiliza y qué se rehace

| Se reutiliza tal cual | Se adapta | Se rehace o se borra |
|---|---|---|
| `img/` de M01 a M06 y `generar_relleno_v2.py` (se le agregan M07 y M08), **salvo lo de la columna derecha** | `styles.css` §1 tokens: espaciado y movimiento se quedan; **`--gris` vuelve a `#6B675F`** (D18); se agregan Instrument Serif, `--t-interfaz`, `--t-rotulo`, `--t-pie-evento`, `--t-banda`, `--t-nombre`, `--t-enunciado`, `--t-bajada`, `--t-dato`, `--t-campo`, el nuevo `--t-enorme`, `--margen-texto`, `--costura`, y `--margen` / `--calle` pasan a 12; `--t-texto` pasa a 14/1,6 | Cabecera anclada (2.0.2 anterior), barra con ES / EN, pie con línea, fila de sección (`D20` anterior). **Media que se regenera (P5, M9c):** las seis obras de C con papel claro (c-02, 03, 05, 06, 08, 09, con sus variantes y detalles), la tapa e-03 (lleva la lámina de c-02) y los seis interiores (papel nuevo, 3.4); `ediciones/e-03-banda-*` se borra y la reemplaza M08 b |
| Modelo de datos de `app.js` (`ARTISTAS`, `OBRAS`, `ESTADOS`, `EDICIONES`, `ACTIVADOS`), diccionario `T`, `t()`, `f()`, `esc()`, router por hash, idioma con `localStorage` | `SIN_PRECIO` queda en a-06 y c-05; **nueva lista `SIN_LINK` con b-04** (`conPrecio` sí, `conLink` no, estado 2; 2.5.1). `tarjeta()` → tarjeta 2.0.6 (imagen `muro/`, pie de una línea con padding de 6, estado en texto, sin chip) | `CICLO`, `CIERRE`, `filas()`, `pintarFilas()` → una grilla CSS (1.4.1) |
| `imagen()` y `srcset`, `activarImagenes()` con `span.lienzo` (1.7.a, desvío 17) | `montarPista()` → motor de los cinco carruseles (portada, tira, pista de ficha y edición, otros encuentros), con flechas cuadradas y contador «01 / 05» | Indicador de Schipper (números con raya) |
| `muestra()`, `nota()`, `notaAlTocar()`, `edita()`, retícula, validación de formularios, `contar()` | Filtros: la lógica por campo se queda; los `select` pasan a celdas y opciones con `aria-pressed`; valen para LISTA y MURO | Vista Índice y hallazgo (`V.obras` L940 a L980, `indiceIO`) |
| Ficha: estados de muestra (`ESTADO_MUESTRA`), datos, navegación anterior / siguiente, aviso al tocar | `V.obra` → 2.5 (imágenes apiladas sin tope, cartela en 6 / 10 con `.pega`, datos sin rótulo, botón-fila claro, segmentos a ≤ 1000) | «Más de la artista» (desvío 31); View Transitions en `navegar()` (1.7.b y 1.7.c anteriores, desvío 36); el `dl` de dos columnas de la ficha |
| `_headers`, favicon, `index.html` (salvo el enlace de fuentes) | Todas las `V.*` cambian su composición | Todas las reglas de `styles.css` de §2.1 a §2.15 anteriores |

### 13.1 · Tramo A · Cromo global + Inicio
1. **Media:** regenerar lo de 13.0 (C, e-03, interiores); M07 a, b, c, d con la receta corregida (27 tarjetas, miniaturas, «todas», 10 láminas) y M08 a, b; hoja de contacto mirada al lado de Studio Iron (M9, M9b, M9c, M21).
2. **Base:** enlace de fuentes con Instrument Serif; tokens de 1.2 y 1.3 (con la escala 12 · 13 · 14 · 15 · 16 y `--costura`); retícula con 12 / 12; clases de rol tipográfico y anchos por rol (1.2.15); acciones de 2.0.13 (botón-fila claro, botón lleno solo para formularios); 1.7 sin View Transitions; `@media (pointer: coarse)` de 4.26; foco de 4.15.
3. **Cromo:** barra de aviso sin idioma (2.0.1); cabecera de tres zonas (2.0.2); panel Artistas (2.0.3); menú de pantalla con subnivel (2.0.4); marca chica (2.0.5); pie grafito (2.0.14); «Ir al contenido» (4.15).
4. **Piezas:** tarjeta de obra y de artista (2.0.6, 2.0.7), tira con costura a 390 y flechas en todos los anchos (2.0.8), banda en sus dos variantes (2.0.9).
5. **Inicio completo** (2.1): `.portada` con la marca enorme pegada debajo y la lámina encima (la lámina sin foco; el foco en el título de la línea 4), línea de pie y controles, enunciado con el punto cobalto, tiras, banda ENCUENTRO, «Libro», texto de EDICIONES y su banda tocando el pie.
6. **Verificar:** M1, M3, M4, M6, M7, M8 (tiras), M9c, M23, M25 en el Inicio; M24 Inicio a 1440 y 390 (con D22 a 390) y menú 390.

### 13.2 · Tramo B · Obras (Lista y Muro), Tienda y Ficha
1. Grilla de tarjetas (1.4.1, costura a ≤ 620) y Obras (2.4): H1 centrado, conteo, filtros por celdas y opciones, «FILTRAR» a 390, conmutador LISTA · MURO con su valor por defecto por ancho, **Lista (2.4.1, nivel 1)**, estado vacío.
2. Tienda (2.13): opciones, tarjeta de tienda con la vía en texto gris y el botón; la caja con «POR DECIDIR» y «VER CÓMO SE ACTIVA»; «Cómo se compra» con la plantilla de página de texto (2.0.11, se construye aquí). M07 f.
3. Ficha (2.5): imágenes apiladas a todo el ancho de `c1-5` sin tope, con rótulos; `.ficha-cartela` en `6 / 10` con `padding-left: var(--e-9)` y la clase `.pega` del JS (1.6.3); datos sin rótulo; botón-fila por estado (4.27), con b-04 en `SIN_LINK`; «› Cómo se compra»; descripción de muestra; navegación; a ≤ 1000, pista con segmentos.
4. **Verificar:** M8, M9c (fichas de C a 390), M10, M18 (descripciones), M23 en la Ficha (los tres casos), M25, filtros (4.23), M24 Obras (Lista y Muro), Tienda y Ficha.

### 13.3 · Tramo C · Artistas y Artista
1. M08 c (heros 21:9 y 5:4).
2. Bloque partido (2.0.10), se construye aquí, con `.mitad-texto` y `.pega`, y su apilado a ≤ 1000 (incluida la variante «texto arriba» del último bloque).
3. Artistas (2.2) y Artista (2.3) completa en el orden nuevo, con 0 entre bloques de imagen, sin la fila de 4 detalles (nivel 2).
4. **Verificar:** M1, M2, M23, M24 Artista a 1440, 768 y 390 (nombre de 48 a 390).

### 13.4 · Tramo D · Encuentro, Activar, Libro, encuentro activado, Ediciones, Edición, Acerca, Contacto y «Lo editas tú»
1. M07 e (Acerca).
2. Encuentro (2.8, con la franja 3:4 y la foto de cierre), Activar (2.9, bloques 1:1 y botón lleno en el formulario), Libro (2.10, con los números solo desde 28 px, casillas con borde gris y pares de 2 × 684), encuentro activado (2.11, con su H1 de texto y su carrusel), Ediciones (2.6, con franja y banda), Edición (2.7), Acerca (2.12), Contacto (2.14, con el chip de obra cargada y el botón lleno).
3. «Lo editas tú» (8.2) marcado en todas las piezas nuevas, incluidos menú, panel Artistas y pie, y el enlace «2 con precio» (8.2.6).
4. **Verificar:** M5, M6, M9c, M22, M23, M24 de cada una.

### 13.5 · Tramo E · Cierre
1. 404 (2.15).
2. Nivel 2 si alcanza, en este orden: contador animado en Encuentro (1.7.p), fila de 4 detalles en Artista (M08 e).
3. Pasada completa de §10.2 (M1 a M25) en las 14 vistas, ES y EN; M12 también a 1024 × 768 táctil; capturas a 390 y 1440 de Inicio, Artista, Obras, Ficha, Encuentro y Libro en `capturas/maqueta-v2/`.
4. `desvios.md` al día; commit en `claude/maqueta-v2`; despliegue en `modulo369-maqueta.pages.dev` con Ramón (excluyendo `*.py`); después, Javiera en contexto limpio.

### 13.6 · Si no alcanza: qué se corta y en qué orden
Primero el nivel 2 entero; después el pegado de `.mitad-texto` (las columnas de texto quedan quietas, alineadas arriba); después el panel Artistas a ≥ 1001 («Artistas» pasa a ser un enlace a `/artistas/`); después el subnivel del menú de 390 (ARTISTAS sin chevron); después el pegado de la cartela (queda quieta). **Nunca se corta:** M07 con la receta corregida (la celda llena es la mitad del parecido con Studio Iron), la costura de 390, Instrument Serif, la cabecera y el pie, la marca enorme, la composición de Inicio, Artista, Obras (con su Lista), Ficha, Encuentro y Libro, los cuatro estados de la ficha con su fila clara, las 27 descripciones, los filtros que filtran, la marca de muestra, cero corchetes, M9c. Todo corte se anota en `desvios.md`.

---

## 14 · Límites de esta spec

- **La vista en muro es generada.** La base está probada en seis obras y una lámina; la receta corregida de la revisión 2.1 (obra grande, muro con luz de foto) **no está probada todavía**: se juzga en la hoja de contacto nueva, al lado de Studio Iron, antes de seguir (M07, criterio 4). Si una lámina con suelo se lee falsa, va sin suelo.
- **Instrument Serif no es `bookish`:** es más condensada. La escala iguala alturas de mayúscula o queda apenas por debajo (la itálica de 26 contra 30); el parecido tipográfico lo juzga Javiera en M24.
- **Sin los bocetos de María** (brief §9-2): Inicio, Artistas, Encuentro y Libro se compararán con sus originales en la reunión.
- **Lo pegado** (marca enorme, cartela y columnas de texto de los bloques partidos) solo existe a ≥ 1001 y, salvo la marca, solo si cabe; en el iPhone de María no hay nada pegado.
- **A 390 el Inicio no tiene palabra enorme** (D22): las disrupciones que María juzga en su iPhone son la imagen desplazada, el punto cobalto y «Libro».
- **`--gris`** vuelve al valor de la v1 hasta que Ramón apruebe o no `#5E5A53` (D18).
- **View Transitions sale:** si Diego ya lo tenía andando, se borra igual (D16).

---

## 15 · Historial de correcciones

| Fecha | Qué se corrigió | Regla o preferencia | Quién lo pidió |
|---|---|---|---|
| 26-sep-2026 | Dirección retícula 3·6·9 con los tokens de la v1 | Regla (no se reabre por iniciativa interna) | Ramón |
| 26-sep-2026 | Nada fijo que ensucie las fotos al bajar (P1, P2) | Regla | María (sobre Escat) |
| 26-sep-2026 | Sin tanto blanco intenso (P5) | Regla | María (sobre Perrotin) |
| 26-sep-2026 | Artistas con obra, no con foto (P13) | Regla | María (sobre Kurimanzutto) |
| 5-oct-2026 | La retícula es herramienta de maqueta (8.3, P22) | Regla | Brief §8-4 (Ramón) |
| 5-oct-2026 | Capa «Lo editas tú» sí; panel simulado no (8.2, P23) | Regla | Ramón, brief §10 |
| 5-oct-2026 | **Terminación:** la v2 casi terminada, al nivel de los referentes; sin corchetes ni posiciones de imagen vacías (§0.1, P24 a P26) | Regla | Ramón, brief §10 |
| 5-oct-2026 | Spec escrita con PRODn dominante (D1 a D21 anteriores; git `b7393c4`) | Superada por la fila siguiente | Lucía |
| **5-oct-2026, ~20:40** | **Dominante PRODn → Studio Iron, para toda la maqueta** («quiero que la maqueta sea más cercana a esta referencia. Ve todo el sitio, el hero, las internas, todo»). Spec reescrita entera: D1 a D22, tokens tipográficos (vuelve Instrument Serif con itálica), retícula de 12 / 12, grilla uniforme, cabecera de tres zonas, pie grafito, vista en muro (M07), marca enorme y cartela pegadas sin quedar sobre una foto (D10), cambio de vista instantáneo | **Regla** (brief §10, segunda corrección). Lo que no cambia: tokens, cero blanco, nada fijo sobre las fotos, sin carrito | Ramón |
| 5-oct-2026, noche | Relajación medida de P1: `sticky` permitido en dos piezas que nunca quedan encima de una foto (D10, M23); **tres desde la revisión 2.1** (columnas de texto de los bloques partidos, D10-3), las dos últimas solo si caben | Regla de esta obra; si María lo lee como lo de Escat en la reunión, se quita (§13.6 ya lo contempla) | Lucía, a partir de la letra del brief §7 |
| **5-oct-2026, noche (revisión 2.1)** | **Auditoría de fidelidad a Studio Iron, 14 defectos, todos corregidos:** (1) costura de 1 px a ≤ 620: grillas 2 × 194 y tira 3 × 129 sin asomo (D13, 1.3.15, 1.4.1, 1.4.2, M8); (2) botón-fila claro en reposo y grafito solo con hover o foco; relleno grafito solo para enviar formularios (2.0.13, 4.1, 4.27); (3) ficha sin tope de alto, cartela en `6 / 10` a ≈ 67 px de la imagen, datos sin rótulo en 13, título en itálica de 26 (2.5, 2.7); (4) Lista de `/art` en el nivel 1, por defecto a ≥ 1001 (2.4.1, M24); (5) vista en muro con la obra grande (caja 0,80 × 0,74) y muro con luz de foto, láminas 16:9 con la obra a 0,64 del alto (M07); (6) escala de texto de Studio Iron: 14 y 15 entran, cuerpo a 14/1,6, Archivo 500 en texto corto, itálica de 26 en títulos (1.2); (7) ancho de texto por rol (1.2.15); (8) bloques partidos 1:1 en los edits, statement ancho y arriba, una regla para la Biografía, columna de texto pegada si cabe (2.0.10, D10-3); (9) densidad: 0 entre bloques de imagen y la última imagen toca el pie en Inicio, Artista y Encuentro (C36); (10) franjas 3:4 y Ediciones con ritmo de edit (2.6, 2.8); (11) todo lo partido se apila a ≤ 1000 (1.4.3, 5.2); (12) pares del Libro 2 × 684 con pie de 16 (2.10); (13) encuentro activado abre con H1 de texto, sin contador ni cobalto (2.11, D6, M6); (14) tarjeta sin chip y con pie de 6 px de padding (2.0.6) | **Regla** (la de Ramón del 5-oct ~20:40: Studio Iron dominante en todo); medidas de `referencias/studio-iron/` | Auditoría independiente, corregida por Lucía |
| 5-oct-2026, noche (revisión 2.1) | **Auditoría de contrato, 11 defectos, todos corregidos:** (1) cero blanco por las imágenes: papel de C (224,219,208) e interiores (218,213,201) más oscuros que el hueso, banda de Ediciones nueva (cenital de las tres ediciones, M08 b), tope M9c; (2) D22 con columna 390: nombre de 48 a ≤ 1000, láminas 4:5 con cx 0,30 / 0,70, la 5 también corrida; (3) descripción de obra obligatoria, slot 27 bloqueante, M18 la cuenta; (4) estado 2: «Consultar por esta obra · →» y «Precio a consultar» una sola vez, b-04 como estado 2 con precio y sin link; (5) foco nunca recortado: lámina sin foco, anillo hacia adentro, carril con padding (4.15, M25); (6) casilla vacía del Libro con borde gris (M22); (7) 44 px también con `pointer: coarse` y en el pie a 621-1000 (4.26, M12); (8) `--gris` vuelve a `#6B675F` y se corrige 10,1 → 10,8 (D18, 1.1.7); (9) hover del título de tira a gris, no a opacidad 0,6 (1.7.d); (10) la cartela y las columnas de texto se pegan solo si caben, con reevaluación (1.6.3, M23); (11) la caja en Tienda dice «POR DECIDIR» y lleva a Activar (2.13.2) | **Regla** (brief §3, §4, §6, §7, §9-4 y WCAG AA) | Auditoría independiente, corregida por Lucía |
| 5-oct-2026, noche (revisión 2.1) | **Ajustes donde no tomé la corrección tal cual (rechazos parciales), con su porqué:** (a) **Láminas 4:5:** no tomo la caja de 0,82 × 0,70 que pedía la fidelidad (defecto 5); uso 0,56 × 0,70, porque el contrato (defecto 2) exige que la imagen desplazada se vea a 390, y con 0,82 la obra queda casi centrada. Manda el contrato. (b) **Banda de Ediciones:** no uso `ediciones/e-03-banda-h` (fidelidad, defecto 10) porque es la doble página casi blanca que el contrato rechaza (defecto 1); la reemplaza la toma cenital de M08 b. (c) **Precio en el botón-fila:** la fidelidad (defectos 2 y 3c) proponía poner el precio de muestra como valor de la fila, como Studio Iron; queda como línea de datos, porque el contrato (defecto 4) pide que el botón del estado 2 no hable de precio y porque el precio de muestra lleva su marca «muestra», que no puede ir dentro de un botón. El estado 1 se distingue por «Comprar · Mercado Pago →». (d) **Palabra enorme a 390:** el contrato la condicionaba («si tiene que existir en celular»); no la agrego: Studio Iron no la tiene en celular, meterla en el flujo rompe el pliegue de 2.1.2 y el Inicio a 390 ya cumple el mínimo del brief §7 con tres disrupciones visibles. D22 lo declara así, sin prometer lo que no se ve. (e) **`--gris`:** de las dos salidas del contrato (registrar el cambio con el OK de Ramón o volver), vuelvo al token de la v1 porque no tengo ese OK; `#5E5A53` queda como propuesta. (f) **Lo que agregué yo, sin que lo pidieran:** flechas de la tira en todos los anchos (a 390 ya no asoma una tarjeta y no quedaba ninguna señal de que se desliza); Obras en MURO por defecto a ≤ 1000 (decisión que la auditoría pidió dejar escrita, 2.4.2); la Lista sin cartela pegada (para no sumar otra pieza pegada a la P1) | Preferencia de dirección, dentro de las reglas | Lucía |
| 5-oct-2026, noche (revisión 2.1) | **Para el OK de Ramón:** `--gris` `#5E5A53` (5,71:1) en lugar de `#6B675F` (4,69:1). Motivo: más margen de AA en el texto gris de 12 px. Los dos pasan AA en todos sus usos sobre hueso | Pendiente | Lucía (propuesta) |
