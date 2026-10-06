# Lock de referencias · Módulo 369 · maqueta v2 (dirección retícula 3·6·9)

> Lo escribe Lucía (`/web-direccion-arte`, pasos 1 y 2). **Versión 2, 5-oct-2026 (noche): reemplaza entera la versión con PRODn dominante** (queda en git, commit `b7393c4`). La causa es la segunda corrección de Ramón (brief §10, ~20:40): «quiero que la maqueta sea más cercana a esta referencia. Ve todo el sitio, el hero, las internas, todo: https://www.studio-iron.com/». Es **regla**: Studio Iron es la referencia dominante de toda la maqueta.
> La dirección retícula 3·6·9 no se reabre (brief §8-5): este documento fija qué manda en la ejecución, qué trabajo acotado le queda a cada otra referencia y qué no se toma de ninguna. Lo que contradiga a `brief-de-obra.md` pierde. Insumo de `spec-visual.md`, no la spec.

**Cómo se miró.** Seis analistas recorrieron Studio Iron entero el 5-oct por CDP, a 1440 × 900 y a 390 × 844 reales (iPhone emulado, DPR 2), y también a 768 en tienda, diseñador y eventos: secuencias de scroll, páginas completas, hover, menús, carruseles, estilos computados y CSS publicado. Los avisos de cookies se ocultaron con CSS, sin aceptarlos; no se agregó nada al carrito, no se envió ningún formulario ni se inició sesión. Todo está en `referencias/studio-iron/{home,tienda,disenador,producto,eventos,global}/` (capturas `.jpg` y medidas `.json`; el consolidado de cada tipo de página es `medidas-*.json`). Yo miré con mis ojos las capturas clave de los seis tipos antes de escribir esto (lista en §7). Las medidas de este documento salen de esos archivos.

**Lo que condiciona todo (no cambia).** Studio Iron es blanco `#FFF`, casi negro `#0A0A0A` y un pie negro `#000`, con dos familias (una serif de libro con itálica, `bookish`, y Albert Sans 500). La maqueta tiene seis tokens fijos (hueso `#EEEAE2`, hueso-2, grafito, gris, línea, cobalto) y tres familias (Archivo, IBM Plex Mono, Instrument Serif). La traducción es directa y sin promedio: **blanco → hueso, negro → grafito, bookish → Instrument Serif (recta e itálica), Albert Sans → Archivo**. Plex Mono toma el papel de las mayúsculas chicas espaciadas de Studio Iron (DISCOVER, SUBSCRIBE, ACCOUNT, rótulos del pie, el contador `01 / 15`). Y las tres restricciones de María valen por encima de la referencia: **cero blanco intenso** (Perrotin), **nada fijo o pegado encima de una foto al bajar** (Escat) y **sin carrito** (brief §8).

---

## 0 · Resumen

| Referencia | Rol ahora | Trabajo que conserva | Antes (lock PRODn) |
|---|---|---|---|
| **Studio Iron** (studio-iron.com, entero) | **Dominante de toda la maqueta** | Cromo, escala tipográfica, secuencia de portada, tarjeta, grilla de colección, página de autor, ficha de obra (`/art`), páginas de evento y de edit, About, páginas de texto, pie, menú de 390, movimiento | Secundaria (página de autor y cita) |
| Kurimanzutto (de María) | Secundaria acotada | (1) La artista se muestra por su obra, nunca por su cara: **choca con Studio Iron**, que usa retratos en About y en el hero. (2) El único color saturado tiene un solo rol y nunca es estado de interfaz: **Studio Iron no tiene acento**, así que no tiene respuesta | Secundaria (lo mismo, más la apertura de Artista, que ahora resuelve Studio Iron) |
| Boceto de María «IDEA - ENCUENTRO» (descrito en `BRIEF.md`) | Insumo de la clienta, no referencia de sitio | Enlace vertical «Libro» a la derecha del contador de Encuentro | Igual |
| Mapa de 369 del Libro (diagnóstico C10, spec D19) | Decisión propia, sin referencia | Las 369 posiciones en 41 × 9. **Studio Iron no tiene respuesta** (su índice de eventos es una lista de fotos) | Igual |
| Esther Schipper (de María) | **Retirada** como fuente de forma | Solo se cita su inicio negro («a María no le molesta») como respaldo de que el pie vaya en grafito | Secundaria (índice de artistas, indicador del carrusel) |
| PRODn | **Retirada** | Nada. La regla de filas y la obra alineada arriba se reemplazan por la grilla uniforme y la celda 4:5 de Studio Iron | Dominante |
| Quatrième Étage | **Retirada** | Nada. La cabecera anclada a columnas y la numeración mono se reemplazan por la cabecera de tres zonas y el contador `01 / 15` de Studio Iron | Secundaria |
| Artem Taradash | **Retirada** | Nada. El texto en columnas angostas se reemplaza por la columna centrada de las páginas de evento y de texto de Studio Iron | Secundaria |
| Escat Gallery (de María) | **Contra-referencia** | Fija lo prohibido: letras fijas que se pegan sobre la foto al bajar. Su «foto grande» ya la resuelve el hero de Studio Iron; su hallazgo del Índice se retira | Secundaria (foto grande, hallazgo) |
| Perrotin (de María) | **Contra-referencia** | Fija lo prohibido: blanco intenso, artistas como lista de nombres sin obra, bio de persona, cabecera translúcida | Igual |

**Nada se promedia.** Donde Studio Iron tiene respuesta, manda Studio Iron, traducida a los tokens. Una secundaria entra solo en dos casos: Studio Iron no tiene respuesta, o su respuesta choca con una restricción del brief. Cada caso está nombrado en §3 y §4.

---

## 1 · La dominante: Studio Iron

**URL:** https://www.studio-iron.com/ y sus internas: `/collections/all-objects`, `/art`, `/collections/<diseñador>` (andu-masebo, gast-studio, atelier-fomenta, kouros-maghsoudi), `/products/<objeto>` (tubular-chair, rubber-table-medium, sounding-lamp-2), `/artists/<artista>/<obra>` (phil-hale/record-separator, thomas-cardiff/recognition), `/events`, `/events/<evento>` (studio-iron-x-saatchi-yates, in-plain-sight, studio-iron-at-brompton-design-district), `/pages/london-design-festival`, `/pages/black-metal`, `/pages/about`, `/pages/shipping-returns`.

### Por qué manda (además de que lo pide Ramón)
1. **Es una galería de arte y objeto que se ve terminada con muy pocos recursos.** Dos familias, un solo tamaño de texto chico por rol, cero color de acento, cero sombras, cero radios. La terminación sale de la escala (una serif enorme contra pies de 12 px), de la densidad (bloques que se tocan, márgenes de 12 px) y de que **cada celda de imagen está llena**. Eso es exactamente lo que la vara de terminación de la v2 exige (brief §6, §7, §10).
2. **Tiene ya el «orden con pequeñas disrupciones» de María:** una grilla uniforme y quieta, y de pronto una palabra de borde a borde (la marca enorme), un enunciado de 100 px en mayúsculas, un nombre en itálica de 80 px, una cita en itálica grande, una banda de foto a sangre. Las disrupciones son de escala, no de desorden.
3. **Cubre todos los tipos de página del mapa de María** (§2): portada, colección con tarjetas, página de autor, ficha de obra con «Consultar», índice de eventos y página de evento, edit curado, about y página de texto.

### Lock (formato `refero-design`)
```text
Dominante:     Studio Iron (studio-iron.com, todo el sitio)
Se preserva:   a. Cromo de una línea, sin borde: menú a la izquierda, marca al centro, utilidades a
                  la derecha; 13 px; la sección actual subrayada (1 px a -2 px).
               b. Marca tipográfica serif: primera palabra en itálica, segunda en redonda. En la
                  portada de escritorio, la marca de borde a borde (97% del ancho), con la foto del
                  hero que sube POR ENCIMA de ella al bajar.
               c. Hero = una sola foto a sangre, sin texto encima; a 390 entra el enunciado en el
                  mismo primer viewport.
               d. Enunciado en serif mayúscula enorme (7vw a 1440, 12vw a 390), interlineado < 1,
                  centrado, con un párrafo corto debajo (máx. 438 px).
               e. Tarjeta: celda 4:5 LLENA (foto con su fondo de estudio), pie de una línea a
                  1440 (título sans 12 a la izquierda | AUTOR serif mayúscula a la derecha) y
                  apilado y centrado a 390. Sin precio. Hover: filo de 1 px negro, instantáneo.
               f. Grilla de colección uniforme de 3 por fila (464 px a 1440 con margen y calle de
                  12; 240 px a 768), 2 por fila a 390; última fila abierta a la izquierda.
               g. Página de autor: hero a sangre bajo la cabecera, nombre en serif ITÁLICA grande,
                  grilla de piezas, bloque About en mitades a sangre (imagen | texto centrado),
                  y en la variante larga: imagen sola a sangre, cita en itálica junto a una foto.
               h. Ficha de obra (/art): imágenes apiladas a la izquierda (vista general y
                  detalles al mismo ancho), cartela a la derecha: ARTISTA serif mayúscula chica,
                  título en serif ITÁLICA con el año tras coma, técnica y medidas en sans,
                  acción; la cartela queda al costado, nunca sobre la imagen.
               i. Bandas de foto a sangre (16:9 a 1440, 4:5 a 390) que separan las tiras de la
                  portada; bloques partidos 50/50 a sangre (imagen | texto) que alternan de lado.
               j. Páginas de evento y de texto: columna centrada angosta (≈ 520 px), H1 serif
                  mayúscula 36/26, fila de datos en mayúsculas espaciadas, foto a sangre,
                  carrusel con contador «← 01 / 15 →».
               k. Pie oscuro: titular serif mayúscula con tres palabras en itálica, tres columnas
                  de enlaces con rótulos espaciados, línea legal.
               l. Menú de 390: pantalla completa clara, ítems en serif mayúscula de 38 px
                  centrados, subnivel con miniaturas de obra en 2 columnas.
               m. Densidad: margen 12 en grillas, 18 en el cromo, 24 en el pie; bloques que se
                  tocan; la única pausa con aire es el enunciado.
Traducción:    #FFF -> hueso; #0A0A0A y #000 -> grafito; zinc y #E2E2E2 -> línea / gris;
               relleno de carga #F0F0F0 / zinc-100 -> hueso-2 plano; bookish -> Instrument Serif
               (recta e itálica); Albert Sans 500 -> Archivo 500 (400 en párrafos);
               mayúsculas chicas espaciadas -> IBM Plex Mono 12.
Reglas de rol: cobalto: un solo rol (trazo dentro de un elemento enorme, lista cerrada de tres),
               nunca estado de interfaz (Kurimanzutto; Studio Iron no tiene acento).
               grafito como fondo: solo el pie del sitio.
Media:         las 27 obras de relleno (M01) se muestran en tarjeta como «vista en muro» 4:5
               (la obra ENTERA colgada en un muro claro, M07): así la celda queda llena como en
               Studio Iron sin recortar la obra. Las fotos de objeto (caja, registros,
               interiores) sí se recortan en las bandas.
Se rechaza:    cabecera fija; panel de compra sobre la foto; barra «Add to bag» fija; texto
               pegado sobre una foto al bajar; texto blanco sobre foto; degradé negro sobre
               foto; flechas montadas sobre las imágenes; carrito, cuenta, búsqueda, tallas;
               newsletter como función; blanco; velos con desenfoque; Lenis y la aceleración
               del hero; cursor propio; mascota; retratos; object-fit cover sobre una obra.
```

### Rasgos medidos que la spec tiene que cumplir (con su fuente)

| Rasgo | Studio Iron, medido | Captura / JSON |
|---|---|---|
| Cabecera | 29 px a 1440 (Albert Sans 500 13/13, gap 24, primer enlace en x = 18), 38 px a 390; fija, fondo `#FFF`, sin borde | `home/1440-primer-viewport.jpg`, `global/medidas-cromo-studio-iron.json` |
| Sección actual | `::after` de 1 px a −2 px, `scaleX(1)`; hover crece de 0 a 1 desde la izquierda en 400 ms `cubic-bezier(.22,.61,.36,1)` | `global/about-1440-nav-hover-art.jpg` |
| Marca enorme | tinta de x = 22 a x = 1.418 (97%), mayúscula de 165 px (11,5vw), caja de 188 px; `sticky` bajo la foto, solo ≥ 1024 | `home/1440-primer-viewport.jpg`, `home/1440-seq-00421.jpg` |
| Hero | una foto 3:4 a sangre (1440 × 1910; 390 × 517); sin texto, sin controles | `home/1440-full.jpg`, `home/390-seq-00000.jpg` |
| Enunciado | serif mayúscula 7vw (100,8 px) / 12vw (46,8 px), interlineado 0,75 / 0,8, tracking −0,01em, centrado en el 70%; párrafo 15/1,55 máx. 438 px | `home/1440-seq-01320.jpg` |
| Tira de tarjetas | título serif 20 px mayúscula; 4 por vista (≥ 1220), 3 (920 a 1219), 2,6 (520 a 919), 3 a 390; avance de una tarjeta en 300 ms; flechas cuadradas de 28 px | `home/1440-i-cards-reposo.jpg` |
| Tarjeta | caja 4:5 llena, pie a 3 px: título Albert 12/14,4 a la izquierda, autor serif 12 mayúscula a la derecha; a 390 centrado y apilado | `tienda/si-tienda-1440-v0.jpg`, `tienda/si-tienda-390-v0.jpg` |
| Hover de tarjeta | borde de 1 px pasa de `#FFF` a `#0A0A0A`, sin transición; nada más cambia | `tienda/si-tienda-1440-hover-tarjeta-zoom.jpg` |
| Colección | H1 serif 36 (26 a 390) centrado, padding 90/80; grilla 3 × 464 con calle 12 y filas a 20; 2 × 193,5 a 390 | `tienda/medidas-tienda.json` |
| Banda a sangre | 1440 × 810 (16:9); 390 × 488 (4:5); título serif 48 / 26 | `home/1440-seq-01768.jpg`, `home/390-seq-00844.jpg` |
| Página de autor | hero 21:9 (1440 × 617), 5:4 a 390; nombre itálica 5,6vw (80,6 px) / 26 px; grilla 3 × 464; About 720 · 720, texto 520 justificado con sangría 30 | `disenador/andu-1440-full.jpg`, `disenador/andu-390-full.jpg` |
| Cita | serif itálica 38/38 centrada en la mitad de 720, junto a una foto de 720 | `disenador/kouros-1440-s06-y3825.jpg` |
| Ficha de obra | imagen en x 71,5 a 833 (762 px); columna vacía; cartela en x 904 a 1.368 (464 px), sticky top 40; ARTISTA serif 14 mayúscula; título serif itálica 30 con el año tras coma; datos 13/19,5; ENQUIRE | `producto/obra-record-separator-1440-s1100.jpg`, `tienda/si-art-1440-v0.jpg` |
| Botón-fila | ancho completo, acción a la izquierda y valor a la derecha, 44,5 de alto; invierte a negro en hover, sin transición | `producto/tubular-chair-390-v0.jpg` |
| Paginación | segmentos de 2 px, el activo negro, los demás al 20% | `producto/tubular-chair-390-v0.jpg` |
| Índice de eventos | H1 serif centrado; destacado 3:2 a sangre; pasados en 2 columnas 3:2 con pie de dos líneas | `eventos/indice-1440-full.jpg` |
| Página de evento | H1 serif 36, fila de datos 12,8 px tracking 0,08em con «·», bajada centrada máx. 524, foto a sangre 3:2, texto 520 con sangría 40, carrusel de alto fijo con «← 01 / 15 →» | `eventos/evento-saatchi-1440-full.jpg` |
| Bloque partido de edit | 720 · 720 a sangre; texto a 36 px del borde de la foto: categoría 11 tracking .15em, título itálica 30, autor serif 14, descripción 12/1,55, botón contorno serif 10 tracking .18em | `eventos/ldf-1440-s01620.jpg` |
| About | foto 2:3 a sangre a la izquierda (704 px), texto justificado en la mitad derecha, centrado en vertical | `global/about-1440-y00000.jpg` |
| Página de texto | columna de 704 centrada, H1 serif 36 en caja normal, H2 serif 20 mayúscula, párrafos 14/22,75 | `global/ship-1440-y00000.jpg` |
| Pie | negro, padding 24; titular serif 2,6vw (37,44 px) mayúscula con tres palabras en itálica; tres columnas con rótulos 12 tracking .12em; legal 12 | `producto/tubular-chair-1440-full.jpg`, `global/about-390-y01500.jpg` |
| Menú de 390 | pantalla completa, ítems serif 38/38 mayúscula, 12 px entre ítems, centrados; subnivel «‹ BACK» con 2 columnas de 177 px | `home/390-i-menu-abierto.jpg` |
| Movimiento | 150 ms (opacidades de hover), 200 a 300 ms (paneles, carrusel), 400 ms (subrayado), cambio de página instantáneo con fundido de imagen | `global/medidas-cromo-studio-iron.json` |

---

## 2 · Mapeo: tipo de página de Studio Iron → vista de Módulo 369

| Vista de Módulo 369 (brief §3) | Página de Studio Iron que manda | Qué se toma (resumen; detalle en la spec) | Qué se aparta y por qué |
|---|---|---|---|
| **Cromo global** (aviso, cabecera, menús, pie) | Cabecera, menú Design, menú de 390, pie (todas las páginas) | Cabecera de tres zonas de una línea; sección actual subrayada; panel «Artistas» con miniaturas de obra (el menú Design); menú de 390 con ítems serif enormes y subnivel; pie oscuro con titular serif con itálicas y tres columnas | En el flujo, no fija (Escat). Pie en grafito, no negro. Sin Bag, Account ni Search. Sin newsletter (el titular invita a escribir). Paneles opacos en hueso, sin velo ni desenfoque. Barra de aviso de la maqueta encima (brief §6) |
| **Inicio** `/` | Portada | Secuencia completa: marca enorme pegada bajo la lámina (≥ 1001) → lámina a sangre → enunciado → tira OBRAS → banda ENCUENTRO → tira ARTISTAS → banda EDICIONES → pie | El hero es el carrusel de María (brief §3), con su pie y sus controles en una línea debajo, nunca encima. El texto de las bandas va debajo de la foto. Sin aceleración del hero ni Lenis |
| **Artistas** `/artistas/` | Panel «Design» (Studio Iron no tiene página índice) + cabecera de colección | H1 serif centrado + visión curatorial centrada; artistas como tarjetas 4:5 de obra, 3 por fila | Una vista propia en vez de un desplegable, porque es una ruta del mapa de María |
| **Artista** `/artistas/<a>/` | Página de diseñador (andu-masebo; kouros-maghsoudi como variante larga) | Hero a sangre (un detalle declarado de su obra), nombre en itálica enorme, grilla 3 × 464, Biografía en mitades a sangre, obra sola a sangre, statement en itálica junto a una obra | El nombre va **debajo** del hero, no encima ni pegado (Escat; en Fomenta el nombre negro se pierde sobre la obra negra). Sin retrato (Kurimanzutto, brief §7) |
| **Obras** `/obras/` | Colección `all-objects` | H1 centrado, grilla uniforme de tarjetas 3 por fila / 2 a 390 | Studio Iron no tiene filtros, conteo ni estado vacío; el brief §7 los exige: se arman con su vocabulario (miniaturas del menú Design para Artista, opciones de texto con el subrayado de la navegación para las otras). Sin scroll infinito |
| **Ficha** `/obras/<o>/` | Ficha de obra de `/art` (phil-hale/record-separator) + piezas de la ficha de producto | Imágenes apiladas (general y detalle al mismo ancho) a la izquierda, cartela a la derecha con ARTISTA, título en itálica con el año, datos, botón-fila, enlace CONSULTAR; a 390, pista con paginación por segmentos y cartela inmediatamente debajo | Nada sobre la foto (el panel de compra de producto no se toma). Los 4 estados del brief §4 en el botón-fila. Sin cajones: «Cómo se compra» en línea |
| **Ediciones** `/ediciones/` | Edit `/pages/black-metal` | Cabecera centrada + bloques partidos a sangre que alternan: tapa a un lado; al otro categoría, título en itálica, MÓDULO 369, descripción, botón contorno | Texto quieto (no sticky). Sin texto blanco sobre foto |
| **Edición** `/ediciones/<e>/` | Ficha de obra de `/art` | Tapa e interiores apilados a la izquierda; cartela con botón-fila «Comprar en Amazon» | Igual que la Ficha |
| **Encuentro** `/encuentro/` | Edit `/pages/london-design-festival` + banda de la portada | Cabecera de la palabra/número enorme; foto de la caja a sangre; intro centrada; franja de 4 registros sin calle; bloques partidos para Cómo funciona y Formas de activación; preguntas en columna centrada | La palabra enorme no va sobre la foto: el contador 007/369 va sobre hueso, encima de la foto. Enlace vertical «Libro» (boceto de María) |
| **Activar** `/encuentro/activar/` | Página de texto (shipping-returns) + bloques partidos de edit | H1 + secciones H2 serif en columna centrada (Proceso, Qué recibes, Tiempos, Registro); las dos opciones como bloques partidos | Las dos opciones siguen porque §9-4 está abierta |
| **Libro** `/encuentro/libro/` | Índice `/events` | H1 centrado + bajada; destacado (el último encuentro) a sangre 3:2 con su pie debajo; los otros en 2 columnas 3:2 | El mapa de 369 no tiene respuesta en Studio Iron: se conserva (D19), entre la cabecera y el destacado. El texto del destacado va debajo de la foto (Studio Iron lo pone encima a 1440 y debajo a 390) |
| **Encuentro NNN** | Página de evento (saatchi-yates) | H1 centrado (el contador 001/369), fila de datos FECHA · LUGAR, bajada centrada, foto a sangre, texto con sangría, carrusel «Otros encuentros» con «← 01 / 07 →» | Sin bloque FEATURING negro. Sin fotos de personas |
| **Acerca** `/acerca/` | About | Mitades a sangre: foto 2:3 a la izquierda, texto a la derecha centrado en vertical | La foto no es un retrato (brief §7): una obra de relleno en un muro. H1 visible (copy 12). Texto justificado solo ≥ 1001 |
| **Tienda** `/tienda/` | Colección `all-objects` | La misma grilla y tarjeta de Obras, con todo lo que se compra; opciones de texto «Todo · Obras · Encuentro · Ediciones» | Un botón por obra bajo su pie (brief §3), «Cómo se compra» con la plantilla de página de texto y el aviso de sin carrito |
| **Contacto** `/contacto/` | Página de texto (shipping-returns) + campo de línea del pie | Columna centrada, H1 en caja normal, secciones H2 serif mayúscula; campos como una línea; enviar como botón-fila | Studio Iron no tiene página de contacto. Newsletter marcado como no incluido |
| **404** | Cabecera de colección | H1 serif centrado + dos enlaces | |

---

## 3 · Secundarias que quedan, con su borde

### Kurimanzutto · de María (secundaria acotada, dos trabajos)
**Capturas:** `referencias/06-kurimanzutto-*` (lock anterior, siguen válidas).
1. **La artista se representa por su obra, nunca por su cara.** Choca con Studio Iron: retrato en el bloque About de cada diseñador (Andu, Fomenta), modelo en el hero de la portada y en About, miniaturas con personas en el menú. **Gana Kurimanzutto** porque es lo que María pidió y el brief §7 lo exige. Donde Studio Iron pone un retrato, Módulo 369 pone la foto de taller (Artista A), una obra en un muro o un detalle declarado.
2. **El único color saturado tiene un rol y nunca es estado de interfaz.** Studio Iron no tiene color de acento (declara `--hightlight: #fc1701` y no lo usa en ninguna regla medida): no tiene respuesta para el cobalto, que es token fijo y disrupción pedida por María. Se aplica la regla de Kurimanzutto: el cobalto vive en una lista cerrada de tres trazos dentro de elementos enormes; foco, hover, página actual y enlaces van en grafito.
**No se toma:** el recorte 4:3, la minúscula en nombres, la cabecera fija, la grilla de 4, el rojo, la apertura de Artista (ahora la resuelve Studio Iron).

### Boceto de María (insumo de la clienta)
El enlace vertical «Libro» a la derecha de la numeración de Encuentro sale de la descripción de su boceto (`BRIEF.md`). Studio Iron no tiene nada equivalente y no choca con nada: se conserva.

### Mapa de 369 (decisión propia)
Studio Iron no tiene respuesta para un registro numerado de 369 posiciones. Se conserva el mapa de 41 × 9 (spec D19), dibujado con los recursos de Studio Iron (línea de 1 px, números en mono como su contador).

---

## 4 · Contra-referencias y choques con Studio Iron, resueltos

| # | Choque | Studio Iron hace | Resolución | Fuente de la restricción |
|---|---|---|---|---|
| 1 | Elementos fijos sobre fotos | Cabecera blanca fija (29 / 38 px) que tapa las fotos al bajar; hoja «Add to bag» fija en el DOM de celular (medido: no se abre nunca; la «barra fija» del lock anterior era un artefacto de captura) | Cabecera **en el flujo**, se va con la página. Sin hoja ni barra | María contra Escat; brief §7 |
| 2 | Texto pegado sobre foto | Texto del destacado `sticky` al 50% encima de la foto, con degradé negro; nombre del autor `sticky` sobre el hero | Todo texto va **debajo o al costado** de la foto, sobre hueso, y quieto | María contra Escat |
| 3 | Algo pegado que no queda sobre una foto | La marca enorme queda pegada **debajo** de la foto del hero (la foto la tapa); la cartela de `/art` queda pegada **al costado** de las imágenes, en su columna | **Se toman las dos**, solo a ≥ 1001 y con un criterio de QA medible: en ningún paso de scroll un elemento pegado queda encima de un `img`. El brief §7 prohíbe lo fijo o pegado **encima** de una obra; lo que María rechazó de Escat son letras que ensucian la foto | Brief §7 (letra del criterio) |
| 4 | Blanco | `#FFF` en fondo, cabecera, paneles, cajones, velos | Hueso. Cero blanco en la interfaz | María contra Perrotin |
| 5 | Retratos y personas | Hero, About, menú, eventos con gente | Obra, taller, caja o registro sin personas | María sobre Kurimanzutto; brief §7 |
| 6 | Recorte de la obra | `object-fit: cover` 4:5 en tarjetas | La celda 4:5 se llena con una **vista en muro** de la obra entera (M07): lo que se recorta es muro, nunca obra. En la ficha, la obra va plana y entera | Spec P3 |
| 7 | Carrito y cuentas | Bag, Account, Search, tallas, Add to bag, cajón de bolsa | Fuera. «Tienda» ocupa el lugar de «Bag» como enlace; el botón-fila lleva a Mercado Pago o a Consultar | Brief §8 |
| 8 | Newsletter | Formulario en el pie con casilla de consentimiento | El titular del pie invita a escribir y lleva a Contacto; el newsletter vive solo en Contacto, marcado como no incluido | Brief §8-2 |
| 9 | Velos y desenfoque | Velo blanco al 65% con `blur(1px)` bajo el menú Design; al 85% en el menú de 390 | Paneles opacos en hueso, **en el flujo**, que empujan la página | Spec P4 |
| 10 | Scroll secuestrado | Lenis en escritorio; el hero sube 1,9 veces más rápido que el scroll | Scroll nativo; de ese efecto se toma solo la marca pegada debajo (CSS) | Spec P12; iPhone de María |
| 11 | Cursor propio, mascota, logo dibujado | Grifo con SCROLL en `mix-blend-mode`; grifo en el pie; wordmark en SVG | Marca tipográfica en Instrument Serif; sin mascota ni cursor | Brief §8-6 |
| 12 | Tamaños bajo 12 px | 8 (tallas), 9 (SCROLL), 10 (ENQUIRE), 11 (DISCOVER, rótulos) | Esos roles pasan a Plex Mono 12 | Spec 1.2 (C39) |
| 13 | Botón de 37 px | ENQUIRE de 99 × 37 | 44 px de alto mínimo; botón-fila de 48 | Spec 4.25 |
| 14 | Texto justificado a 390 | About y eventos justificados con ríos visibles | Justificado solo ≥ 1001; alineado a la izquierda abajo | Legibilidad (capturas `disenador/andu-390-s03-y1434.jpg`, `global/about-390-y00500.jpg`) |
| 15 | Cuatro tarjetas por vista a 1440 | 4 × 348 desde 1.220 px | 3 por vista (c1-3 · c4-6 · c7-9 = 464 px), el corte que Studio Iron usa entre 920 y 1.219 | Retícula de 9 |
| 16 | Pie negro | `#000` con texto blanco | `--grafito` con texto `--hueso` (14,38:1). Es la única superficie oscura | Tokens; a María «no le molesta» el inicio negro de Schipper |

**Escat (contra-referencia):** se conserva solo su prohibición. Su «foto grande» la resuelve el hero de Studio Iron y su hallazgo del Índice se retira (Studio Iron no lo tiene; la vista Lista de `/art` ocupa su lugar en Obras, nivel 2).
**Perrotin (contra-referencia):** blanco intenso, artistas como lista de nombres sin obra, bio de persona, cabecera translúcida, titular sobre la foto.

---

## 5 · Qué cambia respecto del lock anterior (para Diego y Javiera)

- **Sale la regla de filas de PRODn** (spec anterior 1.4): las listas de obra pasan a grilla uniforme de 3 por fila (2 a 390), como Studio Iron.
- **Vuelve Instrument Serif, con itálica** (el lock anterior la quitaba, D7): marca, H1, títulos de banda y de tira, nombre de artista, título de obra, cita, menú de 390, titular del pie.
- **La celda de imagen se llena**: nueva media «vista en muro» (M07). La obra deja de flotar sobre hueso en tarjetas.
- **Margen y calle de 12 px** (antes 42/18, 30/12, 18/12): con 9 columnas a 1440, `c1-3` mide exactamente los 464 px de Studio Iron.
- **Cabecera de tres zonas** en vez de anclada a columnas (Quatrième, retirada).
- **Indicador del carrusel:** «← 01 / 05 →» con flechas cuadradas (Studio Iron) en vez de los números con raya (Schipper, retirada).
- **Cambio de vista instantáneo**, como Studio Iron (sale View Transitions); se mantiene el fundido de cada imagen.
- **Índice con hallazgo (Escat) sale;** entra la vista Lista de `/art` como nivel 2.
- **La palabra enorme del inicio** pasa a ser la marca MÓDULO 369 de borde a borde (≥ 1001) y el enunciado (≤ 1000); el cobalto del inicio pasa de la I de ARTISTAS al punto final del enunciado.

---

## 6 · Límites de esta investigación

- **Sitio en vivo al 5-oct-2026.** La portada cambia con cada campaña; lo que se toma son estructuras, medidas y comportamientos, no contenidos ni fotos.
- **La serif de Studio Iron (`bookish`) es más ancha que Instrument Serif** (1,39 a 1,48 veces a igual cuerpo, medido por un analista; Instrument Serif es una serif condensada de display). La traducción iguala alto de mayúscula en los tamaños grandes (Instrument Serif: H = 0,72em, medido hoy en Chrome) y sube un punto el cuerpo en los chicos (12 → 13). Lo mide Javiera contra las capturas lado a lado.
- **El hover de tarjeta** de Studio Iron se midió en pantalla (borde de 1 px, sin transición); el «cruce a detalle» que citaba la spec anterior (1.7.q) **no existe** en la referencia: era el cambio de variante de color.
- **390 real por CDP** en todos los tipos de página (las capturas del lock anterior eran a 500).

## 7 · Capturas que miré para escribir esto

`home/1440-primer-viewport.jpg`, `home/1440-full.jpg`, `home/1440-seq-01320.jpg`, `home/390-full.jpg`, `home/390-seq-00000.jpg`, `home/390-i-menu-abierto.jpg`, `home/1440-i-menu-design-abierto.jpg`, `tienda/si-tienda-1440-v0.jpg`, `tienda/si-tienda-390-v0.jpg`, `tienda/si-art-1440-v0.jpg`, `tienda/si-art-390-v0.jpg`, `disenador/andu-1440-full.jpg`, `disenador/andu-1440-s00-y0.jpg`, `disenador/andu-1440-s03-y1530.jpg`, `disenador/andu-390-full.jpg`, `disenador/kouros-1440-s06-y3825.jpg`, `producto/tubular-chair-1440-v0.jpg`, `producto/tubular-chair-1440-full.jpg`, `producto/tubular-chair-390-v0.jpg`, `producto/obra-record-separator-1440-s1100.jpg`, `eventos/indice-1440-full.jpg`, `eventos/evento-saatchi-1440-full.jpg`, `eventos/evento-saatchi-390-i-carrusel-01.jpg`, `eventos/ldf-1440-s01620.jpg`, `eventos/blackmetal-1440-full.jpg`, `global/about-1440-y00000.jpg`, `global/about-390-y01500.jpg`, `global/ship-1440-y00000.jpg`.
