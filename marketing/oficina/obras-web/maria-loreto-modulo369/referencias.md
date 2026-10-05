# Lock de referencias · Módulo 369 · maqueta v2 (dirección retícula 3·6·9)

> Lo escribe Lucía (`/web-direccion-arte`, pasos 1 y 2) el 5-oct-2026. La dirección **retícula 3·6·9** ya está elegida (Ramón, 26-sep; encabezado de `brief-de-obra.md`). Este documento **no** propone direcciones ni tableros: fija qué referencia manda en la ejecución, qué trabajo acotado hace cada una de las otras y qué no se toma de ninguna. Es insumo de `spec-visual.md` (paso 5), no la spec. Lo que contradiga a `brief-de-obra.md`, pierde.

**Cómo se miró.** Los 8 sitios se abrieron en vivo el 5-oct-2026 con Chrome headless por CDP, a 1440 y a 500 px de ancho (500 es el mínimo que dibuja el headless; a 500 se emuló un iPhone: user agent móvil y toque). Por cada página hay primer viewport (`-v0.jpg`), dos posiciones al bajar (`-v1`, `-v2`, para ver qué queda fijo encima de las fotos), página completa (`-full.jpg`, cortada a 9.000 px) y estilos computados (`-info.json`: fuentes cargadas, tamaños, color de fondo, elementos `fixed`/`sticky`, posición de imágenes). Las medidas de este documento salen de esos archivos o de sondas puntuales con `getBoundingClientRect` y `getComputedStyle`. Los avisos de cookies se ocultaron con CSS para la captura, **sin aceptarlos**. 20 páginas, 192 archivos, en `referencias/`. La v1 se renderizó igual desde una copia (`scratchpad/lucia-v1-capturas/`, 10 vistas a 1440).

**Un dato que condiciona todo:** 7 de los 8 referentes tienen `body` en `#FFFFFF` (Quatrième Étage, `#0B0A0A`). El hueso `#EEEAE2` no sale de ninguna referencia: sale del rechazo explícito de María a «tanto blanco intenso» (Perrotin) y es token fijo de la dirección. Por eso **ninguna referencia aporta lienzo ni color**: aportan composición, tratamiento de la obra, tipografía y comportamiento.

---

## 0 · Resumen

| Referencia | Elegida por | Rol | Trabajo asignado | Vistas |
|---|---|---|---|---|
| **PRODn** (portafolio) | Ramón, cotización | **Dominante** | La regla de la retícula: cada fila suma el módulo y lo reparte distinto; obra plana a su proporción, pie de dos líneas, vacío entre filas | Obras, Artista, Inicio (bajo el carrusel), Tienda, Ediciones |
| Kurimanzutto | María | Secundaria | (1) La artista se muestra con su obra, nunca con su cara; Artista abre con el nombre chico y una obra a todo el ancho. (2) El único color saturado tiene un solo rol y nunca hace de estado de interfaz | Artistas, Artista, todo el sitio (cobalto) |
| Esther Schipper | María | Secundaria | (1) Estructura del índice de Artistas: 3 por fila, línea de 1 px, nombre debajo. (2) Indicador del carrusel en números chicos con una raya junto al activo | Artistas, Inicio |
| Escat Gallery | María (le gusta y lo rechaza) | Secundaria | (1) La «foto grande»: obra al ancho del contenido, leyenda debajo y partida en la retícula. (2) El hallazgo de la vista Índice: la imagen aparece al pasar por el nombre o al cruzar el centro de la pantalla | Inicio, Obras |
| Quatrième Étage | Ramón, cotización | Secundaria | (1) Cabecera anclada a columnas de la retícula. (2) Numeración mono de cada imagen, fuera de ella, y miniaturas a escala chica | Todas (cabecera), Ficha, Libro, Encuentro |
| Studio Iron | Ramón, cotización | Secundaria | (1) Secuencia de la página de autor (grilla de obras, texto angosto, una obra sola grande, cita). (2) La serif itálica solo para una cita textual, o fuera | Artista |
| Artem Taradash | Ramón, cotización | Secundaria | (1) Texto largo en columnas angostas que ocupan celdas de la retícula. (2) Dos tamaños de texto y nada en medio | Acerca, Encuentro, Activar, Tienda, Contacto |
| Perrotin | María (lo odia) | **Contra-referencia** | Fija lo prohibido: artistas como lista de nombres sin obra, blanco intenso sin obra, bio de persona, cabecera translúcida y desenfoque | Artistas, Acerca, Inicio |

El método pide de 3 a 6 referencias; aquí son 8 porque el encargo las exige todas. Para que no se promedien, cada secundaria tiene uno o dos trabajos con borde y una lista de lo que no se toma.

---

## 1 · La dominante: PRODn, página de portafolio

**URL:** https://prodn.com/portfolio/ (más https://prodn.com/ y https://prodn.com/work/chanel-metiers-darts-2026/)
**Capturas:** `referencias/02-prodn-portfolio-1440-{v0,v1,full}.jpg`, `02-prodn-portfolio-500-*`, `02-prodn-proyecto-*`, `02-prodn-home-*`.

### Por qué manda ella
1. **Es la única de las 8 que convierte «orden con pequeñas disrupciones» en una regla de layout.** Medido a 1440: margen 40 px, calle 20 px, módulo de 5 columnas de 256 px (5 × 256 + 4 × 20 = 1.360). Las filas son 2+3 (532 y 808 px de ancho), 3+2, cinco de 1 (las tapas de Vogue, 256 × 320 cada una), 3+2 y una de 5 (1.360 × 765). El orden está en que la suma siempre cierra; la disrupción, en cómo se reparte. Se traduce directo a 9 columnas (1440), 6 (768) y 3 (390), que es la 3·6·9.
2. **La obra va plana, a su proporción, alineada arriba.** Sin caja, sin marco, sin sombra. La diferencia de alturas produce el desplazamiento sin que nada se monte sobre nada. Es lo que la v1 no hace (ver «v1 contradice»).
3. **Nada encima de la imagen.** El pie va debajo, en dos líneas pegadas (título / autor), mismo cuerpo y peso (Neue Haas Display 15 px, 700, a 10 px de la imagen).
4. **El vacío está medido.** El primer bloque empieza en y = 205, unos 128 px de nada bajo la cabecera, y entre filas hay ~92 px contra 20 px de calle: las filas se leen como renglones.

### Por qué no las otras
- **Kurimanzutto** es galería y es de María, pero su grilla es uniforme (4 iguales, todas recortadas a 4:3): daría orden sin una regla que se pueda romper con criterio. Entra como secundaria con lo que María nombró de ella.
- **Quatrième Étage** es la que más se parece a una retícula visible, pero su lienzo es negro: tomarla como dominante y ejecutarla sobre hueso es exactamente el promedio que `anti-ai-slop.md` llama tell #7 («dark canvases become cream»).
- **Esther Schipper** abre en negro a sangre con texto encima y representa a sus artistas con retratos (el brief §7 lo prohíbe).
- **Escat** tiene el menú fijo sobre las fotos, que es lo que María rechazó.
- **Studio Iron** es una tienda: el panel de compra va encima de la foto y en celular hay una barra «Add to bag» fija.
- **Taradash** es un portafolio de producto y UI; su aporte es tipográfico, no de rubro.

### Lock (formato `refero-design`)
```text
Dominante:        PRODn, portafolio (prodn.com/portfolio/)
Se preserva:      a. cada fila de obras suma el módulo: 9 a 1440, 6 a 768, 3 a 390,
                     con repartos distintos fila a fila (la spec escribe los permitidos)
                  b. obra plana a su proporción natural; sin caja, marco, sombra ni recorte
                     en Obras, Artista y Ficha
                  c. pie bajo la imagen, dos líneas; nada encima de la obra
                  d. calle angosta y separación entre filas de al menos 4 veces la calle
                  e. vacío arriba antes del primer bloque de obra
Se toma solo:     ver §2 (un trabajo o dos por secundaria)
Reglas de rol:    cobalto, un solo rol escrito y nunca estado de interfaz (Kurimanzutto)
                  serif itálica, solo cita textual en primera persona (Studio Iron) o se quita
                  hueso-2, solo espera de carga y marcador de imagen faltante; nunca fondo de obra
Media:            las 27 obras de relleno de img/obras/ (código, marcadas, brief §6); foto de la
                  caja y registros de Encuentro: marcador dirigido con ratio y texto, nunca un
                  fake de CSS
Se rechaza:       paspartú, sombra, desenfoque, translateY que pisa la fila, carrusel enmarcado,
                  muro uniforme en s3, cabecera fija, texto sobre la obra, lista de nombres sin obra
Tokens:           solo los de maqueta/styles.css (hueso, hueso-2, grafito, gris, línea, cobalto;
                  Archivo, IBM Plex Mono, Instrument Serif condicional), cada uno con rol
```

**Las filas de obra se llenan; el vacío vive entre filas y en las filas de texto.** PRODn no deja celdas vacías dentro de una fila de imágenes; el vacío está arriba y entre renglones. Las celdas vacías de una fila son de Taradash y solo aplican a filas de texto (§2).

**Qué NO se toma de PRODn:** la portada (video a pantalla completa con la lista de proyectos encima: el activo a 27 px y los demás a 13 px, todo sobre la imagen), la cabecera fija (`NAV.header` en `position: fixed`, ver `02-prodn-*-info.json`), el menú en negrita mayúscula, la grilla uniforme 4 × 3 de la página de proyecto y el colapso a una columna en celular (a 500: una columna de 460 px con margen de 20; ver choque 2 en §4).

**v1 ya sigue:** la retícula de 9 con clases `s1`–`s9` y `c1`–`c9` (la herramienta para repartir filas existe); el pie de obra va debajo de la imagen; la cabecera no es fija.
**v1 contradice:**
- Obras pinta las 27 en `s3` (nueve filas de 3 iguales): la retícula de 9 no se percibe (`app.js` L201; diagnóstico, lente de dirección de arte).
- Cada obra va en una caja `hueso-2` con padding del 8% y sombra (`styles.css` L140-141), y la ficha repite caja y sombra en línea (`app.js` L211-212). PRODn: imagen plana.
- `.corrida` desplaza con `translateY` sin reservar espacio y pisa la fila siguiente: 30 px en `#/artistas/a` y 39 px en `#/obras` (`styles.css` L145; diagnóstico C01). En la captura `lucia-v1-capturas/artista-1440-full.jpg` el pie de «Campo 02» queda encima de la fila de «Campo 04». En PRODn el desplazamiento sale de alturas distintas alineadas arriba, nunca de una superposición.
- El estado (Disponible, Vendida, Colección privada) es un dato que PRODn no tiene y el brief sí exige (§4): se conserva como tercera línea en mono, no se suprime.

---

## 2 · Secundarias, cada una con su trabajo

### Kurimanzutto · de María
**URL:** https://www.kurimanzutto.com/es/artistas (más `/es/artistas/gabriel-orozco` y `/es/archivo`)
**Capturas:** `06-kurimanzutto-artistas-*`, `06-kurimanzutto-artista-*`, `06-kurimanzutto-archivo-*`.

**Observado.** Fondo `#FFFFFF`. Un solo color saturado, un rojo cercano a `#EC2829` (muestreado del logotipo en la captura JPEG, aproximado), y **solo en el logotipo**: el ítem actual del menú se apaga a gris `rgb(117,117,117)` en vez de colorearse; EN/ESP a 11 px en la esquina superior derecha, activo en negro e inactivo en gris. Artistas: 4 columnas de 325 px con calle de 23; cada artista es **una obra suya** (no su cara) recortada a 4:3 (el CDN pide `w_712,h_530,c_lfill`), y el nombre a 18 px en minúscula debajo. Página de artista: el nombre a 22 px y debajo una obra a todo el ancho de la ventana (1440 de 1440; a 500, a sangre): el nombre es chico y la obra es lo enorme. Más abajo la misma página sí usa un retrato en «biografía». Cabecera fija opaca de 98 px.

**Aporta.**
1. **Artistas y Artista:** la artista se representa con una obra suya, nunca con su cara (lo que María dijo que le gusta; brief §7 lo exige). Artista abre con el nombre chico y una obra al ancho completo del contenido: es la disrupción de escala de la vista Artista que pide §7.
2. **Regla de color, aplicada al cobalto:** el único color saturado vive en un rol y no hace de estado de interfaz (página actual, foco, hover, enlace). Esos estados van en grafito y gris.

**No se toma:** el recorte 4:3 de las obras (manda PRODn: proporción natural), la minúscula en nombres propios, la cabecera fija, la grilla uniforme de 4, el retrato de la biografía, el rojo.

**v1 ya sigue:** Artistas sin retratos (cada fila muestra 3 obras); ES/EN chico en la barra de aviso, activo subrayado; en reposo el cobalto aparece una sola vez (la «ll» de HALLAZGO).
**v1 contradice:** el cobalto hace de estado de interfaz en `:focus-visible` (`styles.css` L37) y en `.vertical:hover` (L198), y la capa Retícula lo usa al 7% y al 22% (L76-77; es herramienta de maqueta, pero tiñe las obras). El menú marca la página actual con subrayado y grafito (L90-91) donde Kurimanzutto la apaga. Artista abre con un `h1` de hasta 58 px y sin obra al ancho completo (`app.js` V.artista).

### Esther Schipper · de María
**URL:** https://www.estherschipper.com/ (más `/artists/` y `/exhibitions/1601-repose-david-claerbout/`)
**Capturas:** `05-schipper-artistas-*`, `05-schipper-home-*`, `05-schipper-exposicion-*`.

**Observado.** Artistas: grilla de 3 cuadrados de 358 px con calle de 88 px; 17 px bajo cada imagen, una línea de 1 px, y bajo la línea el nombre a 22 px (Acumin, peso liviano); unos 100 px entre filas. A 500 mantiene **2 columnas** (213 px) con la misma línea y nombre. Cada imagen es un retrato en blanco y negro. Inicio: foto de sala a sangre al alto de la ventana con el texto encima (fecha 13 px, título 40 px peso 300, artista 22 px) sobre una línea de 1 px, y abajo a la derecha el indicador del carrusel: números chicos «1 2 3» con una raya horizontal junto al activo. Las secciones abren con una línea de 1 px a todo el ancho y una etiqueta de 13 px («Films», «Press», «Explore»). Hay contenido que aparece con animación al bajar: en las capturas completas quedan bloques en blanco (`05-schipper-home-1440-full.jpg`, `05-schipper-exposicion-1440-full.jpg`). Sus imágenes solo cargaron con un user agent de escritorio.

**Aporta.**
1. **Artistas:** la estructura del índice, que es la 3·6·9 literal: 3 por fila (3 artistas = 1 fila, 6 = 2, 9 = 3), línea de 1 px entre obra y nombre, nombre a un solo tamaño, mucho aire entre filas.
2. **Inicio:** el indicador del carrusel en números chicos (01 a 05) con una raya junto al activo, en lugar de «← Anterior · 01 / 05 · Siguiente →».

**No se toma:** los retratos (se reemplazan por una obra, que es el trabajo de Kurimanzutto), el recorte cuadrado (proporción natural: las obras se paran sobre la línea alineadas abajo), el inicio negro a sangre con texto sobre la foto, la firma caligráfica, las animaciones de aparición, el conmutador List / Grid.

**v1 ya sigue:** línea de 1 px grafito sobre cada artista (`.artista-fila`, `border-top`); obras alineadas abajo (`align-items: end`, `styles.css` L158).
**v1 contradice:** el índice es un zigzag: una fila de 6 columnas por artista, con 3 obras en cajas (unos 1.700 px para 3 artistas; diagnóstico C22); los controles del carrusel son texto (`app.js` L104-107).

### Escat Gallery · de María, con su rechazo
**URL:** https://escatgallery.com/ (más `/artists/` y `/exhibition/solaz-de-aurora`)
**Capturas:** `07-escat-home-*`, `07-escat-exposicion-*`, `07-escat-artistas-*`.

**Observado.** Inicio: foto de sala a sangre que al cargar mide 1440 × 900 (el alto completo de la ventana) con la leyenda justo bajo el pliegue (y = 910); después de recorrer la página y volver arriba la foto queda en 1440 × 706 con la leyenda a la vista (`07-escat-home-1440-v0.jpg`), así que su alto depende del scroll. La leyenda va **debajo**, en una fila partida: título en grotesca negrita mayúscula de 16 px en el margen izquierdo (x = 16), nombre y fechas en serif de 16 px desde la mitad (x = 728), sede en itálica. A 500, la misma foto a sangre y la leyenda sigue partida en dos. Menú de 8 ítems de 11 px en mayúscula repartidos a todo el ancho, **fijo y transparente**: al bajar queda encima de las fotos (`07-escat-exposicion-1440-v1.jpg`: el menú cruza dos fotos de sala; `07-escat-home-500-v1.jpg`: «ESCAT GALLERY / MENU» sobre la foto). Además hay etiquetas de sección `sticky`. Artistas: lista centrada de nombres en serif de 30 px. Su código tiene un hallazgo: con cursor, aparece en grande la obra del artista bajo el puntero; al bajar, se activa el artista cuyo centro cruza el centro de la pantalla (`main.js`, `initCenteredArtistActive`; `artists.css`, `.hovering .artist.active .artist-image`). El headless no disparó ese estado: está verificado en el código, no en una captura.

**Aporta.**
1. **Inicio, la «foto grande» que María nombró:** la obra del carrusel ocupa el ancho del contenido y entre 78% y 100% del alto de la ventana (lo medido en Escat), y su leyenda va debajo, partida en la retícula. Nada encima de la imagen. En el iPhone de María el alto se descuenta para que leyenda e indicador queden a la vista sin bajar (el diagnóstico C04 ya lo pide).
2. **Obras, vista Índice, el hallazgo:** la imagen aparece al pasar por el nombre (con cursor) o cuando la fila cruza el centro de la pantalla al bajar (en el iPhone de María), en columnas reservadas y sin tapar texto. Con esto la v2 tiene un hallazgo que también funciona en su teléfono; el C07 del diagnóstico lo apagaba en pantallas táctiles.

**No se toma (este es el rechazo de María):** el menú fijo transparente sobre las fotos y las etiquetas `sticky`. Tampoco la serif Times por defecto, la lista centrada ni la imagen fija que aparece detrás del texto (en la v2 aparece en su columna).

**v1 ya sigue:** la cabecera no es fija, a propósito (`styles.css` L83: «nada tapa las imágenes al bajar»); la leyenda del carrusel va debajo de la imagen; el Índice ya escribe `data-img` en cada fila (`app.js` L198), aunque nada lo usa.
**v1 contradice:** la portada es una caja 16/8,2 con la obra al 88% sobre una copia desenfocada y con sombra (`styles.css` L125-131; captura `lucia-v1-capturas/inicio-1440-full.jpg`): se lee como deslizador de tienda, no como la foto grande. La capa Retícula es una capa fija que tiñe las obras (brief §8-4: es solo de la maqueta).

### Quatrième Étage · cotización
**URL:** https://quatriemeetage.studio/ (más `/w/soma`)
**Capturas:** `03-quatrieme-home-*`, `03-quatrieme-proyecto-*`.

**Observado.** Lienzo `#0B0A0A`. La cabecera está partida en celdas alineadas a una retícula de 6 columnas de 16,66vw: la marca en la 1, «WORK / STUDIO» en la 4, correo e Instagram en la 5; cada celda es una barra negra fija. Pies en monumentMono de 10 px mayúscula, con tres tonos en una sola línea (nombre entre corchetes en blanco, descripción en gris, disciplinas entre paréntesis en blanco). Página de proyecto: el número de la imagen («001») en mono de 10 px al lado de la imagen, y una tira de miniaturas de todo el proyecto a escala muy chica junto a la imagen grande. Dos columnas de imágenes de 600 px (x = 60 y x = 780) con alturas distintas, de modo que las filas nunca coinciden. Al bajar, las barras fijas quedan sobre las imágenes (`03-quatrieme-home-1440-v1.jpg`, `03-quatrieme-home-500-v0.jpg`).

**Aporta.**
1. **Cabecera de todas las vistas:** cada ítem empieza en una columna de la retícula (la marca en la 1 y el resto anclado a columnas), así la retícula se ve sin encender la capa.
2. **Ficha, Libro y Encuentro:** la numeración mono de cada imagen va fuera de ella («01» general, «02» detalle; «001» en cada registro del Libro) y las miniaturas van a escala chica junto a la imagen grande. Es la disrupción de escala disponible para la Ficha.

**No se toma:** el lienzo negro (sobre hueso sería promediar), las barras fijas sobre las imágenes, la mayúscula en todo y los corchetes como delimitador del pie (en la maqueta los corchetes significan «texto pendiente», brief §6, y no se usan con otro sentido).

**v1 ya sigue:** IBM Plex Mono para números y etiquetas (`.etiqueta` de 11 px en mayúscula con `.08em`, `.num`); el contador 001/369 en mono, que el diagnóstico señala como lo mejor ejecutado; el «01 / 03» de las filas de artistas.
**v1 contradice:** la cabecera es la marca en `span 3` más un menú en flex alineado a la derecha (`styles.css` L85-88), así que los ítems no caen en columnas; la ficha tiene una sola imagen y sin número (el brief §7 pide general y detalle).

### Studio Iron · cotización
**URL:** https://www.studio-iron.com/ (más `/collections/kouros-maghsoudi` y `/products/cut-divider`)
**Capturas:** `01-studio-iron-home-*`, `01-studio-iron-coleccion-*`, `01-studio-iron-ficha-*`.

**Observado.** Tienda de objetos de diseño y arte. La página de un autor (Kouros Maghsoudi) es una secuencia: foto a sangre con el nombre en serif itálica, grilla de obras de a 3, bloque «About» (retrato a la izquierda y texto en columna angosta a la derecha), una obra sola a sangre, una cita del autor en serif itálica grande junto a una foto, cuatro imágenes en fila, otra cita, foto final. La serif (`bookish`) va en el logotipo, en titulares de colección y en las citas; el cuerpo, en Albert Sans de 13 a 14 px. Ficha: imagen a sangre con un panel blanco **encima** (título, autor, `dl` de dos columnas con Materials, Dimensions, Made in, y precio con «Add To Bag»; `01-studio-iron-ficha-1440-v0.jpg`); en celular, barra «Add To Bag» fija abajo (`01-studio-iron-ficha-500-full.jpg`).

**Aporta.**
1. **Artista:** el orden de la página de autor, que alterna grilla de obras, texto en columna angosta, una obra sola grande y una cita. Es el molde para los 6 bloques del mapa de María (nombre, statement, unas 9 obras, bio, historia o proceso, foto opcional).
2. **Rol de la serif itálica:** solo una cita textual en primera persona (el statement de la artista, entre comillas). Si no hay cita real que mostrar, la familia no tiene trabajo y el brief §7 permite quitarla.

**No se toma:** el panel de compra encima de la foto, la barra fija, el carrito, el precio en cifras (brief §6), el logotipo serif enorme y el retrato del autor en «About» (en Módulo 369 la foto de la artista es opcional y nunca la representa en un índice).

**v1 ya sigue:** Artista pone primero las obras y después bio e historia o proceso.
**v1 contradice:** Instrument Serif itálica aparece 13 veces como «susurro» (`app.js`: lenguaje de cada artista, «hallazgo, accidente», «la acción», el pie del sitio, notas de maqueta). Es la palabra en serif itálica de adorno que `anti-ai-slop.md` marca como tell #4. Artista no tiene el momento «una obra sola grande y una cita».

### Artem Taradash · cotización
**URL:** https://taradash.me/
**Capturas:** `04-taradash-home-*`.

**Observado.** Fondo blanco y retícula de 6 columnas de 240 px: las columnas de texto empiezan en x = 497, 737, 977 y 1217 y miden unos 205 px. **Solo dos tamaños de texto** en la página: 12,4 px (todo el cuerpo, en columnas angostas) y 38,9 a 43,2 px (titulares), más uno de 86 px una sola vez. Etiqueta «Obj.» de 12 px sobre el nombre del proyecto de 39 px. Imágenes de escalas muy distintas lado a lado (un objeto de 925 px que sale del viewport junto a una foto de 445 px) con mucha retícula vacía. Arriba a la izquierda, botones-etiqueta negros fijos que al bajar quedan sobre las imágenes (`04-taradash-home-1440-v1.jpg`). A 500 mantiene 2 columnas.

**Aporta.**
1. **Acerca, Encuentro, Activar, Tienda (cómo se compra) y Contacto:** el texto largo va en columnas angostas que ocupan celdas de la retícula, una idea por columna, y el resto de la fila queda vacío. No se centra ni se estira a 62 caracteres.
2. **Escala tipográfica:** dos tamaños de texto y nada en medio; la palabra enorme y el contador quedan fuera de la escala porque son la disrupción.

**No se toma:** los botones fijos sobre las imágenes, la foto circular con firma encima, las imágenes de producto y de interfaz, las esquinas redondeadas de algunas capturas y las 2 columnas de texto a 390 (darían unos 170 px por columna, ilegible).

**v1 ya sigue:** Acerca y Encuentro separan el título a la izquierda y el texto a la derecha en columnas de la retícula, con aire entre bloques.
**v1 contradice:** `styles.css` y `app.js` declaran 9, 11, 12, 13, 13,5, 14, 15, 17, 19 y 20 px, más 9 `clamp()` distintos; «Qué es Encuentro» y «Criterio curatorial» van en un solo bloque ancho.

---

## 3 · Contra-referencia: Perrotin (lo que María odia)

**URL:** https://www.perrotin.com/en (más `/en/artists`)
**Capturas:** `08-perrotin-artistas-*`, `08-perrotin-home-*`.

**Observado.** Fondo `#FFFFFF` en todo. Artistas es un directorio de texto: 81 nombres en 4 columnas de 13 px en mayúscula, **sin una sola imagen**, bajo un título «ARTISTS» de 48 px (`08-perrotin-artistas-1440-v0.jpg`; a 500, una columna de nombres). Más abajo, el retrato del fundador con una cita suya (una bio de persona) y una tira de retratos de artistas. Inicio: cabecera blanca translúcida (`rgba(255,255,255,.4)`) fija sobre la foto, titular blanco en mayúscula sobre la foto y un panel de medios con fondo desenfocado (`08-perrotin-home-1440-full.jpg`).

**Lo que fija como prohibido en la v2:**
1. Artistas nunca como lista de nombres sin obra.
2. Ninguna vista que sea solo blanco y texto negro, sin una obra.
3. Acerca sin retrato ni bio de persona (su mapa lo dice: «no es una bio personal»).
4. Ni cabecera translúcida, ni desenfoque detrás de nada, ni titular sobre la foto.

**v1 ya evita:** hueso en vez de blanco; Artistas con obras; ningún retrato; Acerca sin persona.
**v1 todavía tiene de Perrotin:** el desenfoque (una copia de la obra con `blur(40px)` detrás del carrusel, `styles.css` L128-129) y la vista Índice de Obras, que hoy es una lista de nombres sin imagen: es el directorio de Perrotin hasta que el hallazgo de Escat la active.

---

## 4 · Por vista

| Vista | Manda | Trabajo de las secundarias | Disrupción de María que la sostiene (§7) | Prohibido aquí |
|---|---|---|---|---|
| Inicio | PRODn, en las filas bajo el carrusel (artistas, Encuentro, ediciones) | Escat: foto grande y leyenda debajo. Schipper: indicador 01 a 05 | Palabra enorme (su correo); cobalto en su único rol | Texto sobre la obra, desenfoque, caja con sombra |
| Artistas | Schipper (estructura: 3 por fila, línea, nombre) | Kurimanzutto: obra, no cara; obras a proporción natural paradas sobre la línea (regla de PRODn) | No exigida por §7 | Lista de nombres (Perrotin), retratos, recorte |
| Artista | Kurimanzutto (apertura) y PRODn (las unas 9 obras en filas que suman 9) | Studio Iron: secuencia y cita | Cambio de escala: nombre chico y una obra al ancho completo | Retrato como representación |
| Obras | PRODn (muro) | Escat: Índice con hallazgo | Escala real dentro de filas que suman 9 (diagnóstico C21) | Paspartú, todo en `s3`, Índice sin imagen |
| Ficha | PRODn (imagen plana a su alto natural) | Quatrième: «01 general / 02 detalle» en mono y miniaturas chicas | Cambio de escala: miniatura junto a la imagen grande | Panel sobre la foto, barra fija (Studio Iron) |
| Ediciones | PRODn (precedente de la fila de tapas chicas; el reparto exacto lo fija la spec) | | | Tapas con sombra |
| Encuentro | La retícula (dirección) | Taradash: texto en columnas angostas. Quatrième: número mono | Contador 001/369 (escala); enlace vertical «Libro» de su boceto | Proceso escrito como hecho (diagnóstico C09) |
| Activar | | Taradash: columnas angostas | | |
| Libro | La retícula de 369 (9 × 41, diagnóstico C10) | Quatrième: número mono de cada registro | | Obra de artista usada como registro |
| Acerca | | Taradash: columnas angostas, dos tamaños | | Retrato o bio de persona (Perrotin) |
| Tienda | PRODn (obras disponibles en una fila que suma 9) | Taradash: «cómo se compra» en columnas | | Carrito, cifras |
| Contacto | | Taradash: columnas | | |

---

## 5 · Choques entre referencias y cómo se resolvieron

1. **Proporción.** Kurimanzutto recorta a 4:3 y Schipper a cuadrado; PRODn respeta la proporción. **Manda PRODn:** es obra de artista, y recortarla en un índice es decidir por la artista. En Artistas las obras se paran sobre la línea de Schipper, alineadas abajo (la v1 ya alinea abajo).
2. **390 px.** PRODn colapsa a una columna; Schipper y Taradash mantienen dos iguales. En una retícula de 3, dos columnas iguales no existen. **Manda la retícula:** a 390 cada fila suma 3 (2+1, 1+2, 3 o 1+1+1). Propuesta para la spec en Artistas: obra en 2 columnas y línea con nombre en la tercera, alternando el lado.
3. **Serif.** Escat usa serif para nombres y fechas; Studio Iron solo para citas. **Se queda el rol de Studio Iron** (un rol, con contenido real) o la familia se quita. Escat no aporta tipografía.
4. **Inicio negro.** A María «no le molesta» el de Schipper, pero el hueso es token fijo y la dirección no se reabre por iniciativa interna (brief §8-5). No se toma.
5. **Corchetes.** Quatrième los usa en sus pies y el brief §6 los reserva para marcar texto pendiente. **Gana el brief.**
6. **Celdas vacías.** PRODn llena cada fila de imágenes; Taradash deja celdas vacías. **Las filas de obra se llenan y el vacío vive entre filas y en las filas de texto.**

---

## 6 · Lo que esto le pasa a la spec (paso 5; todavía no es la spec)

- **Regla de filas:** cada fila de obras suma 9, 6 o 3 según el ancho, con una lista escrita de repartos permitidos y el orden en que se alternan. La «obra corrida» deja de ser un `transform` y pasa a ser una fila con otro reparto o una obra alineada distinto.
- **Superficies:** un solo lienzo hueso. `hueso-2` solo como espera de carga y marcador de imagen faltante. Cero sombras.
- **Cobalto:** un rol escrito y uno solo; foco, hover, página actual y enlaces en grafito y gris. Nota de riesgo: `#1F3BD6` tiene tono de unos 231°, cerca del índigo por defecto de los modelos (`#6366F1`, unos 239°); lo separan su oscuridad (luminosidad de 48% contra 67%) y su escasez, y por eso la regla de rol no es opcional.
- **Tipografía:** dos tamaños de texto, más la palabra enorme y el contador como disrupción. Plex Mono para números, estados y etiquetas. Instrument Serif solo para una cita textual real; si en la v2 no hay ninguna publicable (la frase de María viene de un correo privado y publicarla textual no está consultado, brief §5), la familia sale.
- **Cabecera:** anclada a columnas y no fija.
- **Nada fijo ni pegado encima de una obra** (brief §7). La imagen del hallazgo aparece en su columna, sin nada encima. La capa Retícula queda como herramienta de maqueta.
- **Media faltante** (caja de Encuentro, registros del Libro, interiores de ediciones): marcador dirigido con ratio fijo y texto que dice qué foto va, en `hueso-2`.

---

## 7 · Refero (complemento consultado)

Búsqueda de estilos «contemporary art gallery website strict modular grid monospace captions off-white canvas single accent color»: 10 resultados. Revisé completo V–A–C (v-a-c.org) porque usa etiquetas laterales rotadas, cercanas al enlace vertical «Libro» del boceto de María. **No entra al lock:** su navegación vertical es fija (choca con §7) y el enlace vertical ya tiene fuente propia, el boceto de María. Los demás resultados (Spacelab, Platform, Katherine Pihl y otros) son galerías en blanco puro, el territorio de Perrotin. Con 8 referencias ya por sobre el máximo de 6 del método, una novena diluiría.

---

## 8 · Límites de esta investigación

- **500 px, no 390.** El headless no dibuja menos de unos 500 px. Lo que aquí se dice de celular se miró a 500; el overflow a 390 se mide en la v2 con `scrollWidth` contra `clientWidth`, no con estas capturas.
- **Hallazgo de Escat:** no se pudo disparar en el headless. Su mecánica está verificada en `main.js` y `artists.css`, no en una captura.
- **Schipper y Kurimanzutto** solo cargaron sus imágenes con un user agent de escritorio; con el del headless salían cajas grises. Las secciones de Schipper que aparecen con animación quedan en blanco en las capturas completas.
- **El rojo de Kurimanzutto** está muestreado de un JPEG y es aproximado. Para el lock solo importa su rol.
- **Sitios en vivo al 5-oct-2026:** las portadas cambian con cada exposición; lo que se toma son estructuras y medidas, no contenidos.
- **Peso:** la carpeta `referencias/` pesa unos 33 MB (las capturas completas llegan a 1,7 MB cada una). Antes de versionarla conviene decidir si se commitea entera o solo los `-v0` y los `-info.json`.
