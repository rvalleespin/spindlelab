# Spec visual · María Loreto Hernández · Módulo 369 · maqueta v3 · retícula 3·6·9 con Studio Iron dominante

> Contrato visual de la v3. Lo escribe Lucía (`/web-direccion-arte`, paso 5). **Versión 3.1, 7-oct-2026** (la 3.0 corregida contra la auditoría independiente de 17 defectos; qué cambió y por qué, defecto por defecto, en §16; la 3.0 queda en `scratch/v3/lucia/spec-visual-3.0-antes-de-corregir.md`). Reemplaza la 2.1, que se construyó, pasó el QA estructural (`acta-qa-si-ronda2.md`) y queda en git (`spec-visual.md` en el commit anterior a este). La reescritura responde a la **tercera corrección de Ramón** (brief §10, regla): «se ve muerta», «varios slots de IA», «lejana a la referencia». Diego construye contra esto; Javiera audita contra esto, ítem por ítem. Cada regla tiene número. Una decisión que no termine escrita acá vuelve en la pasada siguiente.
> **Qué se conserva de la 2.1** (construido y medido, sin cambio de concepto): retícula de 9 · 6 · 3 columnas con margen y calle de 12 (D13), grilla uniforme y costura de 1 px a 390, cabecera de tres zonas en el flujo, panel Artistas y menú de pantalla en el flujo, ficha de `/art` con cartela al costado, botón-fila claro con los cuatro estados del brief §4, bloques partidos, pie oscuro, marca enorme pegada debajo de la foto, «Lo editas tú», retícula, ES / EN, filtros por campo, router y modelo de datos. **Qué cambia:** color (§1.1), tipografía (§1.2), movimiento (§1.7), las imágenes (§3 y §4), las marcas de maqueta (§10) y la composición de 9 vistas (§2).
> **Jerarquía de documentos:** `brief-de-obra.md` (alcance y reglas) > esta spec (visual) > `copy-v3.md` (textos de la v3, de Clara; reemplaza a `copy-muestra.md` y `copy-secciones.md` en todo lo que se ve; lo que esta spec le pide cambiar está en §13) > `referencias.md` (lock) > `estudio-studio-iron.md` (primer estudio, medidas) > el estudio de esta ronda en `referencias/studio-iron-v3/`.

**Referencia dominante:** Studio Iron, todo el sitio (https://www.studio-iron.com/). Inventario completo de esta ronda: 232 URL, 20 tipos de página, 189 capturas en `referencias/studio-iron-v3/inventario/`; color en `…/color/`; tipografía en `…/tipografia/`; movimiento en `…/movimiento/`; auditoría de la v2 contra Studio Iron en `…/auditoria-v2/`. Todas las medidas citadas en esta spec salen de esos datos (`datos/*.json`, `escala-si-1440-390.txt`, `00-indice-medidas.json`).
**Rasgos que se preservan** (los trece del lock 2.1, más tres nuevos de esta ronda): (a) cromo de una línea en tres zonas; (b) marca serif con la primera palabra en itálica, enorme y de borde a borde en la portada de escritorio, con la foto que sube por encima de ella **más rápido que la página** (nuevo); (c) hero a sangre; (d) enunciado en serif mayúscula enorme y centrado; (e) tarjeta 4:5 llena con pie de una línea; (f) grilla uniforme; (g) página de autor con hero, nombre en itálica grande, grilla, mitades, obra sola, cita; (h) ficha de obra con imágenes apiladas y cartela al costado; (i) bandas a sangre y bloques partidos; (j) eventos y textos en columna centrada; (k) pie negro con titular serif con itálicas; (l) menú de 390 con ítems serif enormes; (m) densidad: bloques de imagen que se tocan; (n) **blanco y negro sin acento de interfaz** (nuevo; el único color fuerte lo pone una obra, D6); (o) **fotografía real, densa, con materia, luz y espacio, sin repetirse dentro de una vista** (nuevo; M26, M35, M36); (p) **vida: scroll con inercia, carga con brillo y revelado, hovers nítidos, tiras que se deslizan, texto sobre las bandas** (nuevo).
**Lo que no se toma nunca** (restricciones de María y del brief, por encima de la referencia): cabecera fija; panel de compra o barra «Add to bag» encima de la foto; cualquier texto **pegado** (`sticky` o `fixed`) sobre una foto al bajar; degradé oscuro sobre foto **salvo el velo medido de Studio Iron debajo de un texto que se va con su foto** (1.1.10, D15); cursor propio sobre la foto; carrito, bolsa, cuenta, búsqueda; newsletter funcionando; retratos de artista; caras reconocibles.
**Qué sacrifica esta dirección:** el hueso y su calidez (la v3 es blanco y negro, como la referencia; si María repite su rechazo al blanco intenso, la ronda de ajuste está escrita en 1.1.14); el cobalto (D6: el color que desentona pasa a una obra); el «control» total del relleno generado (las fotos de Unsplash no se eligen al píxel: se dirigen con reglas y se miden, §3 y §4); la mitad de los textos de muestra y todas sus marcas (§10); la tercera familia tipográfica (sale la monoespaciada); la pista con segmentos de la ficha a ≤ 1000 (las imágenes se apilan, como `/art` a 390, D24); el cursor «SCROLL» (P12).

---

## 0 · La vara y las decisiones

### 0.1 · Qué quiere decir «se acerca a la final» (regla de Ramón, brief §10, primera y tercera corrección)

La v3 es una primera entrega que **se lee como el sitio terminado**: puesta al lado de Studio Iron, a 390 y a 1440, una persona que no sabe que es maqueta no ve huecos, rótulos de relleno ni imágenes de código. Lo que quede después es opinión de María, nunca diseño pendiente. Un bloque está terminado cuando cumple las nueve:

| # | Criterio | Se mide en (§11) |
|---|---|---|
| T1 | **Texto:** cero corchetes, cero «muestra» / «sample», cero notas «Maqueta ·» en pantalla en reposo (salvo el aviso global y la línea de Activar, §10.3) | M16, M18 |
| T2 | **Imagen:** toda celda con una foto real del manifiesto (§4); ninguna imagen generada por código; ninguna celda vacía, gris o con marcador una vez cargada; ninguna foto repetida dentro de una vista; la imagen cubre del alto de cada vista lo que cubre su par de Studio Iron (± 5 puntos) | M17, M26, M34, M35, M36 |
| T3 | **Tipografía:** EB Garamond y Albert Sans cargadas, solo la escala de 1.2, sin monoespaciada | M7, M15, M27 |
| T4 | **Composición:** cada bloque como en §2 en los tres anchos; sin superposiciones salvo los textos de D15 con su velo y la lámina que tapa la marca; sin scroll horizontal | M1, M2 |
| T5 | **Interacción:** estados de §5, áreas táctiles ≥ 44 a ≤ 1000 y con puntero grueso | M11, M12, M25 |
| T6 | **Vida:** el catálogo de 1.7 funcionando con sus tiempos (inercia, hero acelerado, carga con brillo y revelado, hovers, tiras), y apagado con `prefers-reduced-motion` | M19, M20, M28, M29, M30 |
| T7 | **Carga:** cada imagen reserva su espacio y entra con 1.7.c o 1.7.d; nada salta | M10, M30 |
| T8 | **Créditos:** cada foto en pantalla tiene su línea en Créditos (§3.5) | M33 |
| T9 | **Lado a lado:** junto a su página de Studio Iron (M24), la vista se lee como el mismo sitio, en castellano, con otra obra | M24 |

### 0.2 · Decisiones (cada una con su porqué y su referencia)

**D1 · Studio Iron manda en todo.** Las secundarias quedan donde ya estaban (Kurimanzutto: obra, no cara; boceto de María: enlace vertical «Libro»; mapa de 369: propio). Escat y Perrotin son contra-referencias. Sin cambio respecto de la 2.1.

**D2 · Cabecera de tres zonas, en el flujo.** Como 2.1 (2.0.2), en blanco. Studio Iron la tiene fija (29 / 38 px) y pasa por encima de las fotos al bajar; eso es exactamente lo que María rechazó de Escat, así que se queda en el flujo. **No se toma** el logo chico que aparece en la cabecera de la portada al bajar: depende de una cabecera fija.

**D3 · Marca tipográfica:** «MÓDULO» en EB Garamond itálica + «369» en EB Garamond recta, mayúsculas (el gesto STUDIO itálica / IRON recta). No es un logo (brief §8-6).

**D4 · Portada = la secuencia de Studio Iron con el carrusel de María como hero.** Marca enorme pegada debajo (≥ 1001) → línea de pie y controles (arriba de la lámina a ≥ 621, porque la lámina 3:4 no cabe en la ventana; debajo a ≤ 620) → lámina 3:4 que sube **acelerada** y tapa la marca (1.7.b) → enunciado → tira TODAS LAS OBRAS → banda ENCUENTRO con su texto encima → «Libro» sola → fila de las tres artistas → banda EDICIONES con su texto encima, que toca el pie → pie.

**D5 · Las láminas son fotos reales de obra en su espacio, tres, una por artista, verticales 3:4.** Studio Iron abre con una sola foto vertical de 1440 × 1910 de un objeto en su lugar, con luz y espacio; la v2 abría con un muro generado que la auditoría midió seis veces más pobre en detalle que una foto (bordes 1,15 % frente a 6,92 %). La v3 abre con la foto de una obra de la serie de cada artista en su espacio (`A-S`, `B-S`, `C-S`, §4). **3:4 en todos los anchos** (1440 × 1920, 768 × 1024, 390 × 520; Studio Iron 1440 × 1910 y 390 × 517): es la proporción que hace funcionar el hero acelerado (1.7.b: la foto llena la pantalla durante ≥ 500 px de rueda; una lámina de 3:2 la llenaba 30 px) y un solo recorte sirve a todos los anchos. **Tres láminas en vez de cinco:** una por artista es un carrusel de «varias obras» (brief §3) y cada lámina es una foto distinta y buena. El contador es «01 / 03». **La lámina no es el hero de Artista** (ese es `{X}-S2`, M36).

**D6 · Sin cobalto. El color que desentona lo pone una obra, no un glifo.** Sale `--cobalto` (era el punto final del enunciado y la «/» del contador de Encuentro): `.punto-final` y `.contador .barra` pasan a `--tinta`, y no queda ningún color de acento en `styles.css`. **Por qué** (corrige la 3.0, defecto 9 de la auditoría): (1) un glifo del titular cambiado de color para dar gusto es el tell #4 de `anti-ai-slop.md`, y ya estaba en la v2 que Ramón leyó como «slots de IA»; (2) la regla (a) pide la paleta de Studio Iron, que es blanco y negro; usar el `--hightlight` que Studio Iron declara y no usa es mover el rol de un token (tell #8), no fidelidad; (3) el brief §7 se cumple con más fuerza desde la imagen: **la serie de Artista A es la única en color** (pintura gestual o matérica con una gama propia, §4), así que la lámina 01 del Inicio y 9 de las 27 tarjetas de Obras son color en una página en blanco y negro. Esa es la disrupción «color que desentona» de María en el Inicio (D22). Encuentro cumple con el cambio de escala y la palabra vertical. Va a Ramón como recomendación (16.1-1), no como opción neutra.

**D7 · Dos familias: EB Garamond + Albert Sans.** Sale Archivo, sale IBM Plex Mono, sale Instrument Serif (1.2). Studio Iron usa Bookish (comercial, y además su archivo es la versión TRIAL sin tildes ni ñ) y Albert Sans (Google Fonts, OFL). Albert Sans se usa tal cual. Para la serif se midieron 33 candidatas libres contra Bookish, letra por letra y en la página con el CSS de Studio Iron: EB Garamond es la que más se parece **en la página** (correlación 0,858 contra 0,706 de Newsreader; ancho entre 0,95 y 1,03 del de Bookish en los 8 roles, así que sirven los mismos cuerpos), con itálica de 16,5° (Bookish 17,9°). Instrument Serif salió última de las 33 (ocupa entre 0,66 y 0,75 del ancho de Bookish): es la causa medida de «lejana a la referencia».

**D8 · Menú a ≤ 1000 en el flujo,** como 2.1 (2.0.4), con la entrada desde la izquierda de Studio Iron (1.7.k). Studio Iron lo fija a pantalla completa; aquí se queda en el flujo porque P1 no tiene excepciones para piezas de navegación.

**D9 · Ficha: la ficha de obra de `/art` con una cartela más corta.** Imágenes apiladas a la izquierda, cartela al costado. La cartela baja de 9 elementos a 6 (2.5): Studio Iron muestra artista, título con año, técnica, medidas y la acción. Salen la navegación anterior / siguiente y los rótulos numerados de imagen.

**D10 · Lo pegado:** cuatro piezas, ninguna encima de una foto: las tres de la 2.1 (marca enorme debajo de la lámina; cartela al costado; columna de texto de un bloque partido al costado) y la foto de Acerca al costado de su texto, como el About de Studio Iron (2.12). Cambia solo la posición de la columna de texto, que ahora se pega **centrada en la ventana** como en los edits de Studio Iron (`top: 50vh; transform: translateY(-50%)`, medido en LDF), siempre que quepa (1.6.3).

**D11 · La obra nunca se recorta sin declararlo, y su proporción sale de la obra, no de la foto.** Cada foto de obra trae en el manifiesto su **`obra_bbox`** (la caja de la obra dentro de la foto, en fracciones, 3.4). De ese recuadro salen la proporción de la obra, sus medidas de muestra y `tamCat()` (14.0). **Obra plana** (A y C): la ficha y la Lista muestran el recorte del bbox con 1 a 2 % de aire, la obra al filo como en `/art` de Studio Iron (T08, T11), sin el muro; los detalles salen de dentro del bbox. **Obra en volumen** (B): la ficha y la Lista muestran la foto con su recorte del manifiesto, porque la silueta, la sombra y el plinto son parte de la imagen (como las fichas de producto de Studio Iron, T07). **Tarjetas 4:5:** el recorte se calcula desde el bbox con ≥ 3 % de aire por lado (planas) o desde el `foco` (volumen), y nunca corta la obra (M34). Todo recorte que corta la obra es un **detalle declarado**: lo dice su `alt` y, en la ficha, un rótulo «Detalle». Las fotos de espacio (`{X}-S`, `{X}-S2`, `{X}-V`) son fotos, no obras: se recortan con `cover` y `foco`, con la obra entera dentro (M34).

**D12 · Grilla uniforme** (sin cambio): 3 por fila a ≥ 621, 2 por fila a ≤ 620 con costura de 1 px. **Obras abre en MURO en todos los anchos** (cambia la 2.1, que abría en Lista a ≥ 1001): la auditoría midió que la v2 cubre con imagen el 50 al 64 % de sus páginas contra el 65 al 96 % de Studio Iron, y el muro de 27 fotos reales es la vista más densa y más «All Objects» del sitio. La Lista queda a un toque.

**D13 · Retícula 3·6·9** con margen y calle de 12 (sin cambio). Las tiras (carruseles) no se anclan a la retícula: usan las cuatro medidas de vista de Studio Iron (1.4.2).

**D14 · Pie en `--negro` #000** (Studio Iron: `footer.bg-black` en las 32 vistas medidas), texto blanco. Es la única superficie oscura.

**D15 · Texto sobre foto: en cuatro piezas, estáticas, como Studio Iron.** Studio Iron monta tipografía sobre la foto en las dos bandas de su portada (título, párrafo y DISCOVER), en sus edits y en sus colecciones; es su firma más visible, la v2 no lo hacía en ninguna y la auditoría lo midió como lejanía. Lo que María rechazó de Escat son **letras fijas que quedan pegadas al bajar y ensucian las fotos**; un texto que se va con su foto no es eso. Se permite en: (1) y (2) **las bandas ENCUENTRO y EDICIONES del Inicio** (2.0.8): rótulo, título, párrafo y enlace en `--blanco` sobre la foto, a la izquierda, sobre `.velo-lado`; (3) **el nombre de la artista sobre el hero de Artista** (2.3), como Andu Masebo; (4) **«Encuentro» sobre la foto de apertura de Encuentro** (2.8), como London Design Festival. En las cuatro, la foto es un **espacio** (sala, mesa, impresos sobre una mesa), nunca una obra plana; el texto no es `sticky` ni `fixed`; color `--tinta` o `--blanco` según la foto (campo `texto` del manifiesto); el velo (`--velo-texto`, 1.1.10) va **solo** debajo de esos textos, y se mide en píxeles (M32, con la vara de Studio Iron). **A ≤ 1000** se sigue la regla de Studio Iron en celular: las dos bandas y «Encuentro» siguen con el texto encima (Studio Iron a 390: bandas de la portada y LDF), el nombre de la artista va debajo (Andu Masebo a 390). Esa regla a 390 es una decisión de Ramón (16.1-2): se construye así y, si él elige la cautela, una clase (`.sobre-foto` → `.bajo-foto`) por pieza la pasa debajo. En todas las demás fotos el texto va debajo, arriba o al lado (como 2.1). **Es lo primero que se revierte** si María lo lee como Escat.

**D16 · Vida: lo que Studio Iron mueve, y nada más** (1.7). **A 390, que es el ancho principal, la vida no viene de la rueda** (Lenis, el hero acelerado y los hovers no existen en el iPhone): viene de lo que Studio Iron hace en celular y de la imagen: la lámina 3:4 que llena la pantalla (D5), el texto sobre las bandas (D15), fotos con materia y volumen que no se repiten (D23, D25, M26, M36), las disrupciones visibles en reposo (D22), las tiras que siguen al dedo y el revelado de cada foto. Se juzga con una grabación a 390 lado a lado con Studio Iron (M24). Seis cosas en el catálogo: (1) scroll con inercia (Lenis, lerp 0,1) con rueda; (2) el hero que sube 1,9 veces más rápido que la página y tapa la marca; (3) cada imagen llega con un marcador gris con brillo y se revela en 800 ms; (4) hovers nítidos: marco instantáneo, inversión instantánea, opacidad en 150 a 200 ms, subrayado que crece en 400 ms; (5) tiras que se deslizan una tarjeta en 300 ms y siguen al dedo; (6) galerías de encuentro con contador «01 / 06» y paso de 500 ms. **Lo que no hace Studio Iron y por eso no se hace:** aparición al bajar, parallax fuera del hero, marquesina, autoplay, fundido de página, contador animado. Agregar movimiento genérico es justamente el «slot de IA» (hallazgo 20 del estudio de movimiento).

**D17 · Marcas de maqueta: solo el aviso general y la página «Créditos y notas».** Salen las 49 marcas «muestra» por bloque, las 7 notas «Maqueta ·» en pantalla y los rótulos de muestra (§10). El aviso cubre la regla «nada inventado presentado como real» (brief §6) y la página de créditos nombra a cada fotógrafo.

**D18 · Gris de texto:** `#6B6B6B`, el `--muted-text` que Studio Iron declara (1.1). Cierra la propuesta pendiente de la 2.1 (`#5E5A53`), que deja de aplicar porque el hueso sale.

**D19 · Libro: primero la fotografía, después el mapa.** El destacado y los pares de `/events` arriba; el mapa de 369 más abajo y más liviano (2.10). La auditoría midió 437 «palabras» de casillas en el primer viewport del Libro contra 52 de `/events`.

**D20 · «Lo editas tú», Retícula y ES / EN:** se quedan (Ramón, brief §10). Cambia dónde viven las herramientas a ≤ 1000 (2.0.1).

**D21 · Obras: filtros con el vocabulario de Studio Iron** (sin cambio de concepto respecto de 2.1): artista por miniaturas, técnica, tamaño y disponibilidad por opciones de texto subrayadas; al filtrar, la grilla baja a 0,4 y se repinta (1.7.n, del código apagado de Studio Iron).

**D22 · Disrupciones de María** (brief §7; el acta dice cuál, a 1440 y a 390):

| Vista | Disrupción | ≥ 1001 | 390 (el ancho principal; todas se ven en reposo) |
|---|---|---|---|
| Inicio | Palabra enorme | MÓDULO 369 de borde a borde (1.2.1, ≈ 232 px) | No existe a ≤ 1000 (Studio Iron tampoco la tiene en celular) |
| Inicio | Color que desentona | La lámina 01 (`A-S`): una pintura en color en una página en blanco y negro, a la vista al cargar (D6) | Igual, la lámina 01 entera en el primer viewport (390 × 520) |
| Inicio | Palabra casi escondida | «Libro», 12 px gris, sola en una fila | Igual |
| Artista | Cambio de escala | Nombre en itálica de 5,6vw (≈ 81 px) sobre la foto contra pies de 12 | Nombre en itálica a **17vw (≈ 66 px)**, la escala de «Encuentro», contra pies de 12, en el primer viewport |
| Artista | Imagen desplazada | La 8.ª tarjeta de la grilla (centro de la última fila) bajada `--e-9` respecto de su fila | La 9.ª, sola en su fila, en la **columna derecha** y bajada `--e-9` |
| Ficha | Cambio de escala | Dos detalles 3:4 al mismo ancho que la obra entera (781 px) | Bajo la cartela, un detalle a sangre de 390 × 520: un 40 a 50 % de la obra al doble de escala, apilado (D24), sin deslizar nada |
| Encuentro | Cambio de escala + palabra vertical | «Encuentro» en itálica de 10vw sobre la foto; contador de 200 px; «Libro» vertical | «Encuentro» a 17vw; contador de 72 px; «Libro» vertical al borde derecho |
| Obras | Color que desentona (adicional) | 9 de 27 tarjetas en color (serie A) en un muro neutro | Igual |

**La imagen desplazada vuelve** (corrige la 3.0, defecto 8: es una de las cinco disrupciones que María escribió y no dependía del muro generado): es composición en reposo, una tarjeta corrida de su fila, nunca un fotomontaje ni una superposición (P10). El acta de Javiera dice, por vista y a 390, cuál de estas ve.

**D23 · Artista B trabaja en volumen.** B pasa del collage a **cerámica o escultura chica** (piezas de mesa o de pedestal). **Por qué:** Studio Iron es un sitio de objetos: sus tarjetas (T03, T04) muestran siluetas con volumen y sombra que ocupan casi todo el cuadro, y tres series planas fotografiadas de frente repiten en 27 tarjetas «un rectángulo dentro de otro» (auditoría, defecto 1). El brief admite «obras de relleno de cualquier persona, cualquier tipo de obra» (`BRIEF.md`), y la búsqueda en curso ya encontró piezas de volumen y collages inutilizables (texto legible y caras, `copy-v3.md` 9.4). Cambia: `TECNICAS` de B, el statement y la bio de B (§13-6 y 13-9), el filtro de Técnica.

**D24 · Ficha y Edición a ≤ 1000: imágenes apiladas, no pista.** Studio Iron apila la obra y sus detalles a 390 en su ficha de obra (T11: 390 × 480, 556 y 539), que es el par de esta vista; la pista con segmentos es de su ficha de producto (T07). Apiladas, el detalle se ve con el scroll, sin deslizar nada (defecto 8), y la ficha a 390 sube de 19 % de imagen (v2) a lo que pide M35. Orden a ≤ 1000: la general → la cartela (con el botón-fila) → los detalles y, si hay, la foto en su espacio. Sale el patrón 1.7.m.

**D25 · Ninguna foto se repite dentro de una vista, y la lista sube a 75.** La 3.0 armaba la página de Artista con recortes de sus propias 9 obras y repetía `{X}-07`, `E-AP`, `ED-J` y `R-007` en cadena; repetir es el slot que rellena celdas y mata el hallazgo que pide María («que no todo esté explicado ni mostrado de inmediato»). Studio Iron, en Kouros (T05), usa unas 14 fotos distintas y ninguna se repite. Cada artista trae 17 fotos (9 obras, lámina, hero, obra sola, taller y 4 de proceso), y Encuentro, Ediciones y los espacios traen las suyas (§4). Se mide en M36.

---

## 1 · Tokens (cada uno con su rol; un valor sin rol no es un token)

### 1.1 · Color: la paleta medida de Studio Iron (regla (a) de Ramón)

Medida por CDP en 16 rutas × 1440 y 390, más 7 capas (`referencias/studio-iron-v3/color/datos/`). Studio Iron es acromático: dos neutros, un negro de superficie y una escala chica de grises. El color de la página lo pone la fotografía.

| # | Token | Valor | Rol exacto | Dónde NO se usa | Studio Iron |
|---|---|---|---|---|---|
| 1.1.1 | `--blanco` | `#FFFFFF` | Lienzo: `html`, `body`, barra de aviso, cabecera, panel Artistas, menú de pantalla, fondo de botón-fila en reposo, fondo de botón contorno, texto sobre `--negro` (pie, botón lleno), texto sobre foto cuando el manifiesto dice `blanco` (D15); `theme-color` | Como borde de imagen visible; como texto sobre `--superficie` | `body`, cabecera, cajones; `theme-color #ffffff` |
| 1.1.2 | `--tinta` | `#0A0A0A` | Todo el texto sobre blanco; íconos dibujados (rayas del menú, flechas de texto); subrayado de navegación; filo de hover de tarjeta y miniatura; fondo del botón-fila en hover, foco y toque; foco sobre blanco; casilla activa del Libro a ≤ 1000; texto sobre foto cuando el manifiesto dice `tinta`; `::selection` (fondo) | Fondo de una sección o banda; texto sobre `--negro`; foco sobre el pie | `--foreground`, 61.258 caracteres, 19,8:1 |
| 1.1.3 | `--negro` | `#000000` | Fondo del pie (D14); fondo del botón lleno (solo enviar formularios); borde de 1 px del botón contorno | Texto (el texto es `--tinta`); fondos de sección | Pie, SEND ENQUIRY, borde de ENQUIRE |
| 1.1.4 | `--gris` | `#6B6B6B` | Texto secundario: conteos, rótulos de grupo de filtros, estados Vendida y Colección privada, vía de compra en Tienda, «Libro» escondida, rótulo «Detalle», «369» del contador, etiquetas de campo, texto del aviso de maqueta, «Actualizado» en Créditos, borde de casilla vacía del Libro, carácter de flecha deshabilitada | Cuerpo de texto largo; sobre `--negro` | `--muted-text`, declarado: 5,33:1 sobre blanco, 4,85:1 sobre `--superficie` |
| 1.1.5 | `--linea` | `#E4E4E7` | Separadores de 1 px: borde de flechas cuadradas, borde del botón-fila en reposo, borde inferior de la barra de aviso, borde superior de la barra del menú de pantalla, separadores de preguntas, segmento inactivo de la paginación de la ficha | Texto; cualquier gráfico que haga falta para entender (1,27:1) | zinc-200, 280 bordes |
| 1.1.6 | `--linea-campo` | `#D4D4D8` | Borde inferior de 1 px de los campos de formulario en reposo; chips de opción de filtro a ≤ 620 | Igual que `--linea` (1,48:1) | zinc-300 |
| 1.1.7 | `--superficie` | `#F4F4F5` | Fondo de los campos de formulario; fondo de la miniatura del chip de obra cargada; fondo de una caja de imagen **sin** marcador (la primera lámina, 1.7.c) | Fondo de sección, tarjeta o botón | zinc-100, 124 usos |
| 1.1.8a | `--carga-1` | `#F6F6F6` | Inicio del degradé del marcador de carga (1.7.c) | Cualquier otra cosa | shimmer |
| 1.1.8b | `--carga-2` | `#EBEBEB` | Fin del degradé del marcador y capa de revelado (1.7.c) | Cualquier otra cosa | shimmer |
| 1.1.8c | `--brillo` | `rgba(255,255,255,.7)` | La banda que recorre el marcador mientras carga (1.7.c) | Velos, fondos | barrido de carga |
| 1.1.9a | `--pie-texto-2` | `rgba(255,255,255,.7)` (= `#B2B2B2` sobre negro) | Texto secundario del pie (rótulos de columna, línea legal), hover de los enlaces del pie | Fuera del pie | 3.538 caracteres, 9,9:1 |
| 1.1.9b | `--pie-linea` | `rgba(255,255,255,.4)` | Línea inferior del enlace «Escribir una consulta» del pie | Fuera del pie | línea del campo del pie, 3,66:1 |
| 1.1.10 | `--velo-texto` | `rgb(0 0 0 / .75)` → `rgb(0 0 0 / 0)` | El velo **medido** de Studio Iron (`from-black/[.75] to-transparent`), solo debajo de un texto que va sobre una foto (D15), en dos formas: **`.velo-lado`** (≥ 1001): caja `position: absolute; inset-block: 0; left: 0; width: 55%`, `linear-gradient(to right, …)`, debajo del texto de las bandas del Inicio y, si M32 lo pide, del nombre de Artista; **`.velo-pie`** (≤ 1000): ancho completo, `linear-gradient(to top, …)`, debajo del texto de las bandas y de «Encuentro» a 390. `pointer-events: none` | Cualquier foto sin texto encima; una foto de obra; como fondo, marco o «ambiente»; pegado o fijo; detrás de texto que no esté sobre foto; con otro valor de opacidad o de ancho | `div.absolute.inset-y-0.left-0.lg:w-[55%].w-full.bg-linear-0.lg:bg-linear-to-r.from-black/[.75].to-transparent`, en las dos bandas de la portada |

**1.1.11 · Contrastes** (WCAG; los pares de texto en uso pasan AA todos): tinta/blanco 19,8:1 · gris/blanco 5,33:1 · gris/superficie 4,85:1 · blanco/negro 21:1 · pie-texto-2/negro 9,9:1 · tinta al 60 % sobre blanco (hover, `#6C6C6C`) 5,25:1. El texto sobre foto se mide en píxeles (M32), no con un par de tokens. Prohibidos para texto: `#71717B` sobre `--superficie` (4,39:1), zinc-400 `#9F9FA9` (2,62:1) y `#AAAAAA` (2,32:1), que Studio Iron sí usa.
**1.1.12 · Selección y toque:** `::selection { background: var(--tinta); color: var(--blanco) }` (Studio Iron no tiene regla; se agrega); `-webkit-tap-highlight-color: transparent`; `<meta name="theme-color" content="#FFFFFF">`.
**1.1.13 · `@media (prefers-contrast: more)`** (el bloque de Studio Iron, mapeado): `--gris` → `#3A3A3A`; `--linea` y `--linea-campo` → `--tinta`; foco de 3 px con desfase de 3 px.
**1.1.14 · Ronda de ajuste por blanco (no se aplica ahora):** si María repite el rechazo de Perrotin, se sube el fondo a `--superficie` **solo** en las vistas tipo lista (Artistas, Obras, Ficha), que son las que en Studio Iron pasan del 40 % de píxeles blancos (M31). No se vuelve al hueso.
**1.1.15 · Ningún color fuera de esta tabla** en `styles.css`, `app.js` e `index.html`. Sale todo hex de la v2 (`#EEEAE2`, `#E4DFD4`, `#1B1B19`, `#6B675F`, `#D3CCBE`) **y el cobalto `#1F3BD6`** (D6). El único color fuerte del sitio está dentro de las fotos de la serie A.

### 1.2 · Tipografía: EB Garamond + Albert Sans (regla (b) de Ramón)

**Carga** (un solo enlace, `display=swap`, con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`):
`https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;700&family=EB+Garamond:ital,wght@0,400..500;1,400..500&display=swap`
**Licencias:** las dos son **SIL Open Font License 1.1** (Google Fonts): uso web libre, sin atribución obligatoria. Se nombran igual en Créditos (§3.5).
**Pilas:** `--serif: "EB Garamond", Georgia, "Times New Roman", serif` · `--sans: "Albert Sans", "Helvetica Neue", Arial, sans-serif`. **`font-synthesis: none`** en `:root`.
**Por qué estos pesos:** EB Garamond es variable; a igual peso nominal se ve más liviana que Bookish en los cuerpos grandes y más oscura en los chicos (tinta medida a 2x contra capturas reales de Studio Iron). **Regla de peso de la serif:** recta 400 hasta 38 px; recta **450** desde 48 px; itálica **450** de 26 a 48 px; itálica **500** desde 60 px. Albert Sans **500** en todo (Studio Iron no usa 400); 700 solo en `<strong>` de páginas de texto.

**Escala** (valores de Studio Iron medidos en `datos/escala-si-1440-390.txt`; los cuerpos se toman tal cual porque EB Garamond mide entre 0,95 y 1,03 del ancho de Bookish):

| # | Token / clase | Familia, peso | ≥ 1001 · 621-1000 · ≤ 620 | Interlineado · tracking | Rol (se usa en) | No se usa en | Studio Iron |
|---|---|---|---|---|---|---|---|
| 1.2.1 | `--t-enorme` | EB, «MÓDULO» itálica 500 + «369» recta 450, mayúsculas | **`calc((100cqw - 2 * var(--margen)) / 6.11)`** (≈ 16,1vw: 231,75 px a 1440), con `.portada { container-type: inline-size }`; respaldo sin `cqw`: `16.1vw` · no existe · no existe | 0,8 · 0; `padding-top: .12em` (aire para la tilde de la Ó); **`padding-left: .048em`** (compensa la M itálica, que sobresale a la izquierda de su caja) | Marca enorme del Inicio (2.1) | Cualquier otra cosa | marca SVG de 1440 × 188, mayúscula 11,5vw |
| 1.2.2 | `--t-enunciado` | EB recta 450, mayúsculas, centrado, `text-wrap: balance` | **7vw · 9vw · 12vw** | **0,86** · −0,01em | H2 del enunciado del Inicio; titular de Acerca | | 7vw / 12vw, 0,75 / 0,8 |
| 1.2.3 | `--t-nombre` | EB itálica 500 | **5,6vw · 17vw · 17vw** (≈ 81 · 130 · 66 px) | 0,9 · **−0,0625em** | H1 nombre de la artista (2.3); a ≤ 1000 es la disrupción de escala de la vista (D22) | | 80,64 / 26; −5,04 px |
| 1.2.4 | `--t-evento` | EB itálica 500 | **10vw · 14vw · 17vw** | 0,8 · −0,05em | «Encuentro», H1 de 2.8 | | 144 / 89,7; 0,7; −0,05em |
| 1.2.5 | `--t-contador` | EB recta 450, `font-variant-numeric: tabular-nums` | **200 · 140 · 72 px** | 0,85 · −0,02em | Contador «007/369» de Encuentro, solo ahí | Conteos, paginación | (propio) |
| 1.2.6 | `--t-banda` | EB recta, **450 a 48, 400 a 36 y 26**, mayúsculas | **48 · 36 · 26** | 0,9 · −0,025em | Títulos de banda del Inicio (ENCUENTRO, EDICIONES) | | 48 / 26, 0,9 |
| 1.2.7 | `.t-mayuscula` | EB recta 400, mayúsculas | **36 · 36 · 26** | 0,9 · 0 | H1 de vista centrado (OBRAS, ARTISTAS, EDICIONES, TIENDA, LIBRO, ENCUENTRO 001); nombre en la Biografía | | 36 / 26, 0,9 |
| 1.2.8 | `.t-italica` | EB itálica 450 | **30 · 30 · 30** | 0,95 · −0,01em | Título de obra y de edición en la cartela y la Lista; títulos de bloque partido | | 30 / 30, 0,95 |
| 1.2.9 | `.t-cita` | EB itálica 450 | **38 · 38 · 28** | 1 · −0,01em | Statement de Artista | | 36-38 |
| 1.2.10 | `.t-recta` | EB recta 400, caja normal | **36 · 36 · 30** | 1,11 (1,2 a ≤ 620) · 0 | H1 de páginas de texto (Activar, Contacto, Créditos) | | 36/40 legal; 30/36 a 390 |
| 1.2.11 | `.t-404` | EB recta 400, mayúsculas, centrado | **7,6vw · 9vw · 12vw** | 0,86 · −0,01em | Titular del 404 | | 109,44 (7,6vw) / 46,8 |
| 1.2.12 | `.t-pie-titular` | EB recta 400, mayúsculas, con tres palabras en itálica 450 | **2,6vw · 2,6vw (mín. 24) · 24** | 1 · −1px | Titular del pie | | 37,44 (2,6vw) / 24 |
| 1.2.13 | `.t-menu` | EB recta 400, mayúsculas | **no existe · 38 · 38** | 1 · −0,4px | Ítems del menú de pantalla | | 38/38 |
| 1.2.14 | `.t-marca` | EB, «MÓDULO» itálica 450 + «369» recta 400, mayúsculas | **22 · 26 · 26** | 1 · 0 | Marca chica de la cabecera | | logo 130 × 25 |
| 1.2.15 | `.t-rotulo` | EB recta 400, mayúsculas | **20** | 1,4 · −0,015em | Título de tira (OBRAS, ARTISTAS); H2 de páginas de texto | | 20/28 |
| 1.2.16 | `.t-pie-evento` | EB recta 400, mayúsculas | **15** | 1,25 · 0 | Título de cada par del Libro («ENCUENTRO 006») | | 15 |
| 1.2.17 | `.t-artista` | EB recta 400, mayúsculas | **14** | 0,9 · −0,01em | ARTISTA en la cartela, la Lista y el chip de Contacto; «MÓDULO 369» en Edición | | 14, 0,9 |
| 1.2.18 | `.t-autor` | EB recta 400, mayúsculas | **12** | 1 · −0,1px | Autor en el pie de tarjeta; nombre bajo la tarjeta de Artistas y bajo las miniaturas del panel | | 12, 1 |
| 1.2.19 | `.t-boton-serif` | EB recta 400, mayúsculas | **10** | 1,5 · 0,18em | Texto del botón contorno (VER LA OBRA, ACTIVAR UN ENCUENTRO, VER LA EDICIÓN) | | ENQUIRE / SHOP NOW / VIEW, 10, 0,18em |
| 1.2.20 | `--t-bajada` | Albert 500 | **15 · 15 · 14** | 1,55 · 0 | Párrafo del enunciado; bajadas de H1 centrado; intro de Encuentro; párrafo de banda | Párrafos largos | 15/1,55 (14 a 390) |
| 1.2.21 | `--t-texto` | Albert 500 | **14** (Acerca y Biografía a ≤ 620: **16**) | 1,5 (páginas de texto: **1,625**) · 0 | Párrafos: Biografía, Acerca, Preguntas, Activar, Cómo se compra, Créditos, descripción de evento | Rótulos | 14/21, 14/22,75, 16/24 |
| 1.2.22 | `--t-dato` | Albert 500 | **13** | 1,5 · 0 | Cartela: técnica, medidas, disponibilidad, línea de precio, detalles de edición; descripción de bloque partido | Párrafos de más de 3 líneas | 13/19,5 |
| 1.2.23 | `--t-interfaz` | Albert 500 | **13** | 1 · 0 | Cabecera, enlaces del pie, opciones de filtro, ES / EN | Párrafos | 13/13 nav |
| 1.2.24 | `.t-tarjeta` | Albert 500 | **12** | 1,2 · 0 | Título en el pie de tarjeta; nombre bajo miniatura de filtro | | 12/14,4 |
| 1.2.25 | `.t-descripcion` | Albert 500 | **12** | 1,5 · 0 | Descripción corta de la obra en la cartela (2 líneas y «Leer más») | | 12/18, «Read more» |
| 1.2.26 | `.etiqueta` | Albert 500, mayúsculas | **12** | 1,5 · 0,12em | Rótulos de columna del pie, fila de datos de evento, rótulos de grupo, «MAQUETA», contador «01 / 03» y «01 / 06» (con `tabular-nums`) | Párrafos | 12/18, 0,12em |
| 1.2.27 | `.etiqueta-ancha` | Albert 500, mayúsculas | **11** | 1,5 · 0,18em | Enlaces de acción (DESCUBRIR, VER EL LIBRO, ← ENCUENTRO), «› CÓMO SE COMPRA», botón lleno, «FILTRAR», conmutador MURO · LISTA | | DISCOVER 11, 0,18em |
| 1.2.28 | `.t-detalle` | Albert 500 | **11** | 1,5 · 0 | Rótulo «Detalle» bajo una imagen recortada; números de casilla del Libro | | 11 |
| 1.2.29 | `--t-campo` | Albert 500 | **16** en todos los anchos | 1,4 · 0 | Campos y su texto escrito (iOS no hace zoom) | | 14 (hace zoom en iPhone; no se toma) |
| 1.2.30 | `.t-fila` | Albert 500 | **13 · 16 · 16** | 1 · 0,062em | Botón-fila: etiqueta a la izquierda, valor a la derecha, misma letra | | 13, 0,8 px |

**1.2.31 · Escala cerrada:** 10 · 11 · 12 · 13 · 14 · 15 · 16 · 20 · 22 · 24 · 26 · 28 · 30 · 36 · 38 · 48 · 72 · 140 · 200 px y los proporcionales 2,6 · 5,6 · 7 · 7,6 · 9 · 10 · 12 · 14 · 16 · 17vw. Cualquier otro `font-size` es un defecto, salvo el cálculo de la marca enorme (1.2.1). Sin `clamp()` salvo en `.t-pie-titular` a 621-1000 (mínimo 24).
**1.2.32 · Reglas de uso** (las de Studio Iron, medidas):
- La serif en mayúscula va con tracking **0 o negativo**; la sans en mayúscula, **solo positivo** (0,12 a 0,18em). Ninguna sans en mayúscula sin tracking.
- La serif nunca va en negrita. La itálica existe solo en EB Garamond y solo en: «MÓDULO» (marca chica y enorme), nombre de artista (1.2.3), «Encuentro» (1.2.4), títulos de obra y edición (1.2.8), statement (1.2.9) y las tres palabras del titular del pie (1.2.12). **Ninguna palabra suelta en itálica dentro de un titular en mayúscula** (sale MIRAR / *SELECCIONAR* / DECIDIR de Acerca: tell #4).
- **Tildes en mayúscula de display:** EB Garamond tiene tildes (Bookish no); a interlineado 0,75 la tilde de la segunda línea toca la primera (medido: la Í de GALERÍA contra la coma de MÓDULO). Todo titular de display en mayúscula de varias líneas va a **0,86 como mínimo** (1.2.2, 1.2.11). La marca enorme es de una línea y lleva `padding-top: .12em`.
- **Itálica de display de varias líneas** (1.2.3 y 1.2.4 a 390): ascendentes y descendentes de líneas vecinas pueden cruzarse, como en Studio Iron; Diego lo revisa con cada texto real y, si una «g» toca un número, sube el interlineado de esa vista a 0,9.
- **Cifras:** el contador y los contadores de carrusel con `tabular-nums` (EB Garamond lo trae; Albert Sans **no**: en Albert las cifras quedan proporcionales, y «01 / 03» se compone con ancho fijo por `min-width` del contenedor). Las medidas de la cartela van en Albert 13 con cifras proporcionales («120 × 90 cm»), como Studio Iron.
- `text-wrap: balance` en H1, H2 y títulos de tarjeta; `text-wrap: pretty` en párrafos; `hyphens: manual`.
- **Justificado** solo a ≥ 1001 y solo en Biografía y Acerca (Studio Iron), con `text-indent: 0`; a ≤ 1000 alineado a la izquierda.
- **Sin monoespaciada en ninguna parte** (Studio Iron no la usa; la v2 ponía el 26 % del texto de la portada en Plex Mono).

**1.2.33 · Marca enorme, medida en tinta** (no en avance; corrige la 3.0, defecto 15): a 16vw sin compensar, la M itálica sobresale 12 px a la izquierda de `c1` (tinta en x = 0 a 1440) y el 9 termina 19 px antes del borde de `c9`; a 1920, 34 px antes. Con **`calc((100cqw - 24px) / 6.11)` + `padding-left: .048em`**, la tinta va de `c1` a `c9` con 0 a 1 px de diferencia a 1001, 1280, 1440, 1920 y 2560, sin scroll horizontal (render por CDP con la misma carga de Google Fonts: `scratch/v3/lucia/marca.html`, `marca2.mjs`, `marca2-res.json`, `mc-*.png`). La caja: 231,75 × 0,92 = 213 px a 1440, más `--e-2`. `cqw` y no `vw` para que una barra de scroll clásica (Windows) no empuje la tinta afuera. **Criterio (M4):** con la Retícula encendida, tinta de la M a ≤ 2 px del borde izquierdo de `c1` y la del 9 a ≤ 2 px del borde derecho de `c9` a 1001, 1440 y 1920; sin scroll horizontal; la tilde de la Ó entera.
**1.2.34 · Contador, medido:** «007/369» en EB Garamond 450 `tabular-nums` mide **3,333em**: 667 px a 1440, 467 a 768, 240 a 390.
**1.2.35 · Ancho de texto por rol** (de la 2.1, 1.2.15 anterior, más uno): página de texto `c3-7` con tope 704; bajada y biografía 520; párrafo del enunciado 464; descripción de bloque partido 320; cartela 464; **texto de banda sobre foto 380** (Studio Iron: 378, medido en la banda LDF de la portada); a ≤ 620, `--margen-texto`.

### 1.3 · Espaciado y retícula (sin cambio de la 2.1)

Los tokens `--e-1` 6 · `--e-2` 12 · `--e-3` 18 · `--e-4` 24 · `--e-6` 36 · `--e-9` 54 · `--e-16` 96 · `--e-24` 144, `--margen` 12, `--calle` 12, `--margen-texto` 24 / 18, `--costura` 1 px, `--tactil` 44 y sus roles quedan como en la 2.1 (1.3.1 a 1.3.15, en git). Cambian dos alturas: **barra de aviso 28 px** a ≥ 621 y **26 px** a ≤ 620 (2.0.1); **cabecera 32 px** a ≥ 1001 y **44 px** a ≤ 1000. Meta medida a 390: la primera imagen del Inicio empieza en y ≤ 70 (Studio Iron 38; la v2 107).

### 1.4 · Grillas, tiras y proporciones

1.4.1 · **Grilla de tarjetas** (Obras en MURO, Tienda, Artista): sin cambio de la 2.1: 3 × 464 a 1440, 3 × 240 a 768, **2 × 194 con costura de 1 px** a ≤ 620; filas a `--e-3`. **Imagen desplazada** (D22): en la grilla de Artista, la 8.ª tarjeta lleva `margin-top: var(--e-9)` a ≥ 621 (la fila crece; nada se superpone) y, a ≤ 620, la 9.ª va en la columna 2 (`grid-column: 2`) con el mismo `margin-top`.
1.4.1b · **Grilla de Artistas** (2.2, el índice `/artists` de Studio Iron, T09): 3 columnas de 464 a ≥ 1001 (Studio Iron usa 4 de 318 con 18 artistas; con 3, preparado para 6 y 9 como pide el mapa de María, 3 columnas llenan la fila y siguen la retícula); 3 × 240 a 621-1000; a ≤ 620, **una columna a sangre (390 × 488) mientras haya 3 artistas**, y **2 columnas de 177 con calle de 12** (Studio Iron: 2 × 177) desde 6. Imagen 4:5; nombre a 2 px debajo en `.t-autor`, centrado. Con 3, dos columnas de 177 dejaban el índice en 45 % de imagen a 390 (v2: 30,6 %; Studio Iron 60,4 %, M35).
1.4.1c · **Fila de artistas del Inicio** (2.1 #9): las tres a la vez, sin flechas: 3 × 464 a ≥ 1001 (la grilla 1.4.1, una fila exacta), 3 × 240 a 621-1000, 3 × 129 con costura de 1 px a ≤ 620. Corrige la 3.0 (defecto 14): la tira de 346 dejaba la cuarta posición en blanco, que se leía como algo que no cargó.
1.4.2 · **Tira** (carrusel de tarjetas del Inicio, solo TODAS LAS OBRAS), las vistas de Studio Iron (Swiper medido): **4 por vista desde 1220 px** (346 × 432 a 1440, calle 8), **3 por vista de 920 a 1219**, **2,6 por vista de 521 a 919** (asoma la tercera), **3 por vista con costura de 1 px hasta 520** (129 × 162 a 390). Carril desde `--margen` a ≥ 521; de borde a borde a ≤ 520.
1.4.3 · **Mitades a sangre** (bloque partido, Acerca, Biografía, pares de Ediciones): solo a ≥ 1001, 50/50 sin calle; a ≤ 1000 todo se apila (Studio Iron: «768 se comporta como 390»), salvo los pares de Ediciones, que quedan lado a lado con costura de 1 px.
1.4.4 · **A sangre:** lámina, bandas, hero de Artista, obra sola, franjas, fotos de evento; a ≤ 1000, la general y los detalles de la ficha y de la Edición (D24).
1.4.5 · **Proporciones de caja** (la foto se recorta con `cover` y su `foco` del manifiesto, salvo donde dice otra cosa; «recorte del bbox» = la caja `obra_bbox` del manifiesto con 1 a 2 % de aire, D11):

| Slot | ≥ 1001 | 621-1000 | ≤ 620 |
|---|---|---|---|
| Lámina del Inicio (`{X}-S`) | **3:4** (1440 × 1920; Studio Iron: hero de 1440 × 1910) | 3:4 (768 × 1024) | **3:4** (390 × 520; Studio Iron 390 × 517) |
| Banda (Inicio) | 16:9 (1440 × 810) | 16:9 | 4:5 (390 × 488) |
| Hero de Artista (`{X}-S2`) | 21:9 (1440 × 617) | 5:4 | 5:4 (390 × 312) |
| Foto de apertura de Encuentro | 3:2 (1440 × 960) | 4:5 | 4:5 |
| Tarjeta de obra, de tienda, de artista | 4:5, recorte calculado desde el bbox (planas) o el `foco` (volumen) | 4:5 | 4:5 |
| Miniatura (panel, menú, filtro) | 5:4 | 5:4 | 5:4 |
| Ficha y Lista: la obra | **recorte del bbox** (planas) o recorte del manifiesto (volumen), a su proporción, 781 de ancho | igual, a sangre | igual, a sangre (390 de ancho) |
| Ficha: detalle declarado | **3:4**, ventana del 40 al 50 % tomada de dentro del bbox (Studio Iron T11: detalles de 762 × 1086 y 762 × 1052) | 3:4 a sangre | 3:4 a sangre (390 × 520) |
| Obra sola de Artista (`{X}-V`) | 3:2 a sangre (1440 × 960; Studio Iron Kouros) | 3:2 | 3:2 (390 × 260) |
| Fila de 4 de Artista (`{X}-P1` a `-P4`) | 3:4 (360 × 480) | 3:4 (192 × 256) | 2 × 2 de 195 × 260 |
| Edición: tapa, interior, tercera vista | la foto con su recorte del manifiesto, a su proporción (son objetos, no obras planas) | igual, a sangre | igual, a sangre |
| Pares de Ediciones (tapa · interior) | 3:4 (720 × 960 cada mitad) | 3:4 (384 × 512) | 3:4 (195 × 260, costura 1 px) |
| Franja de 3 (Encuentro, Ediciones) | 3:4 (480 × 640; Studio Iron LDF 480 × 640) | 3:4 | 1 a sangre 3:4 + 2 de 195 × 260 |
| Bloque partido de edit (Encuentro, Activar, visión de Artistas) | 1:1 (720 × 720) | apilado 1:1 | apilado 1:1 |
| Biografía (`{X}-T`), Statement (`{X}-S`) | 4:5 (720 × 900) | apilado 4:5 | apilado 4:5 |
| Acerca (`AC`), Cómo se compra (`TI`) | 2:3 (720 × 1080) | apilado 2:3 | apilado 2:3 (390 × 585) |
| Destacado y pares del Libro | 3:2 | 3:2 | 3:2 |
| Foto de encuentro activado | 3:2 | 5:4 | 5:4 |
| Carrusel «Otros encuentros» | alto fijo 500, ancho natural | 360 | caja de 280 × 210 |

1.4.6 · **`cover` sobre una foto que muestra una obra** solo en tarjetas (con el recorte calculado de D11), láminas, hero, obra sola, Statement, fila de 4 y miniaturas, y solo con un `foco` que deja la obra que se ve entera (M34). En la ficha y la Lista, nunca: ahí manda el bbox.

### 1.5 · Radios
1.5.1 · `border-radius: 0` en todo (Studio Iron).

### 1.6 · Profundidad y capas
1.6.1 · **Sin profundidad de interfaz:** cero `box-shadow`, `drop-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`; cero velos y degradés sobre foto **salvo `--velo-texto`** debajo de los textos de D15 (1.1.10), que es el de Studio Iron en sus bandas. Las sombras dentro de una foto son de la foto. (Studio Iron usa además velos blancos de .65 y .85 para cajones y menú fijo; aquí no hay cajones ni menú fijo, así que esos no se toman.)
1.6.2 · **Líneas:** `--tinta` 1 px = estado (filo de hover, subrayado); `--negro` 1 px = borde del botón contorno; `--linea` 1 px = estructura chica; `--gris` 1 px = casilla vacía del Libro.
1.6.3 · **Capas** (como 2.1, con el hero acelerado): `.reticula` (`fixed`, z 50, herramienta de maqueta); `.marca-enorme` (`sticky; top: 0; z-index: 0`, solo ≥ 1001) dentro de `.portada`; `.portada-sube` (la línea de pie, la lámina y todo lo que sigue dentro de `.portada`, `position: relative; z-index: 1`, fondo blanco o foto opaca, con el `margin-top` del hero acelerado, 1.7.b); `.velo-lado` / `.velo-pie` y el texto de banda dentro de la caja de su foto (`position: relative` en la caja, `absolute` en el velo y el texto, sin `z-index` fuera de esa caja); `.ficha-cartela` (`sticky; top: var(--e-4)`), `.mitad-texto` (`sticky; top: 50vh; transform: translateY(-50%)`) y `.acerca-foto` (`sticky; top: 0`, 2.12), las tres **solo a ≥ 1001 y solo con `.pega`**, que pone el JS si el elemento cabe en `innerHeight - 2 × --e-9` y su imagen vecina es más alta (se reevalúa al cambiar el tamaño, abrir un `<details>` o mostrar un aviso). Nada más tiene `z-index`, `sticky` ni `fixed`.
1.6.4 · `transform` en reposo solo en: `.mitad-texto.pega` (centrado), las rayas del menú abierto (X). El resto, solo en transiciones del catálogo 1.7.

### 1.7 · Movimiento: el sistema de «vida» (regla (e) de Ramón)

Medido en Studio Iron por CDP con rueda real, screencast con tiempo por cuadro y muestreo por `requestAnimationFrame` (`referencias/studio-iron-v3/movimiento/00-indice-medidas.json`). Se toman los valores tal cual.

**Tokens:**

| Token | Valor | Para qué (Studio Iron medido) |
|---|---|---|
| `--m-0` | `0ms` | Lo que cambia en seco: filo de tarjeta (15,7 ms, primer cuadro), inversión del botón-fila, panel Artistas, cambio de imagen del visor, contadores |
| `--m-150` | `150ms` | Opacidad a 0,7 / 0,6 en enlaces y botón contorno (146 a 160 ms) |
| `--m-200` | `200ms` | Opacidad del título de tira; borde de flecha (206 ms); grilla al filtrar; `<details>` |
| `--m-300` | `300ms` | Paso de la tira (300 ms); menú de pantalla (292 ms); rayas → X |
| `--m-400` | `400ms` | Subrayado que crece (409 ms) |
| `--m-500` | `500ms` | Revelado de imagen (500 ms); paso de la galería de encuentro (483 ms) |
| `--retraso-revelado` | `300ms` | Retraso de la capa gris del revelado |
| `--m-brillo` | `2100ms` | Vuelta de la banda de brillo del marcador |
| `--curva-mov` | `cubic-bezier(.4,0,.2,1)` | Opacidades, menú, flechas |
| `--curva-subrayado` | `cubic-bezier(.22,.61,.36,1)` | Subrayado |
| `--curva-paso` | `ease` | Paso de tira y de galería |
| `--curva-imagen` | `ease-in-out` | Revelado y fundido de imagen |
| `--curva-brillo` | `ease-in` | Banda de brillo |
| Lenis | `lerp: 0.1`, `smoothWheel: true`, `syncTouch: false`, `wheelMultiplier: 1` | Inercia de la rueda: una muesca de 100 px llega al 50 % en 123 ms, al 90 % en 390 ms y termina en 891 ms |

**Catálogo** (lo que no está acá, no se mueve):

| # | Patrón | Disparador | Propiedades · duración · curva | Con `prefers-reduced-motion: reduce` |
|---|---|---|---|---|
| 1.7.a | **Scroll con inercia** | Rueda o trackpad, solo con `(pointer: fine)` | Lenis 1.3.23 desde `https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js` (+ `lenis.css` del mismo paquete), `new Lenis({ autoRaf: true })` con los valores por defecto (tabla). Táctil: nativo (`syncTouch: false`). Al cambiar de vista: `lenis.scrollTo(0, { immediate: true })`; al volver: a la posición guardada, `immediate`. Las pistas horizontales se prueban con trackpad: si la rueda vertical las engancha, llevan `data-lenis-prevent-wheel` | **Lenis no se inicia**; scroll nativo |
| 1.7.b | **Hero acelerado** (Inicio, ≥ 1001) | Scroll de la página | `.portada-sube { margin-top: calc(var(--p) * -0.9 * 100vh) }` con `--p = clamp(0, scrollY / innerHeight, 1)`, escrito en un callback del evento `scroll` de Lenis (o de `window` si Lenis no corre) dentro de `requestAnimationFrame`. Efecto: durante el primer alto de ventana la lámina sube **1,9 veces** más rápido que la página y tapa la marca enorme, que queda pegada debajo (z 0). Studio Iron: 1,89 veces (la foto recorre 1.701 px mientras la página recorre 901). **Con la lámina 3:4** (D5) a 1440 × 900: la lámina empieza en y ≈ 329 y llena la pantalla de s ≈ 173 a s ≈ 710, **537 px de rueda** (Studio Iron ≈ 570); con 3:2 la llenaba 30 px. Tolerancia: 1,8 a 2,0 y ≥ 500 px de pantalla llena (M29). A ≤ 1000 no existe | `--p` queda en 0: la lámina sube a la velocidad de la página y tapa la marca igual |
| 1.7.c | **Carga de imagen con brillo y revelado** (toda imagen de tarjeta, miniatura, franja, fila de 4, pares de Ediciones, lámina 2 y 3, pares del Libro, grilla de Artistas) | Mientras el `img` no carga; al cargar (`img.decode()` resuelto) | Caja con `linear-gradient(90deg, var(--carga-1), var(--carga-2))`. **`::before`** = banda `linear-gradient(270deg, transparent, var(--brillo), transparent)` que recorre `translateX(-100%)` → `translateX(100%)` en `--m-brillo` `--curva-brillo`, en bucle, **solo mientras carga**. **`::after`** = capa `--carga-2`. Al cargar (clase `.lista`): `::before` `opacity` 1 → 0 en `--m-500` `--curva-imagen`; `::after` `opacity` 1 → 0 en `--m-500` `--curva-imagen` con `--retraso-revelado`. **Total 800 ms.** El `img` debajo está a opacidad 1 desde el inicio. Cada caja se revela cuando llega su foto: el escalonado lo pone la red, no un `delay` | Sin banda; el revelado es instantáneo |
| 1.7.d | **Fundido de imagen suelta** (lámina 1, hero de Artista, foto de apertura, bandas, Biografía, Statement, obra sola, bloques partidos, Acerca, fotos de ficha, de Edición y de evento) | Al cargar | `opacity` 0 → 1 en `--m-500` `--curva-imagen`, sobre `--superficie`. **Excepción: la primera lámina** (`fetchpriority="high"`, `eager`) entra sin fundido, como el hero de Studio Iron sobre su fondo zinc-100 | Sin fundido |
| 1.7.e | **Filo de tarjeta** | Hover (`hover:hover`) sobre tarjeta, miniatura o celda de filtro | `outline: 1px solid var(--tinta); outline-offset: -1px` sobre la imagen, en `--m-0`. Nada más cambia: sin zoom, sin segunda imagen | Igual |
| 1.7.f | **Subrayado** | Hover o foco en cabecera, pie, opción de filtro, ARTISTA de la cartela, enlaces de Créditos | `::after` de 1 px `currentColor` a -2 px de la base, `transform: scaleX(0)` → `scaleX(1)` desde la izquierda, `--m-400` `--curva-subrayado`; al salir vuelve desde donde iba. La sección actual y la opción activa lo tienen dibujado siempre | Aparece en seco |
| 1.7.g | **Opacidad de hover** | Hover | Botón contorno y enlaces de acción: `opacity` 1 → 0,7 en `--m-150` `--curva-mov`. Título de tira: 1 → 0,6 en `--m-200`. Flechas de texto («←», «→») de galerías: 1 → 0,6 en `--m-150`. **Reemplaza la regla de la 2.1** «la opacidad no es hover»: tinta al 60 % da `#6C6C6C`, 5,25:1, pasa AA | Igual (sin transición) |
| 1.7.h | **Inversión del botón-fila** | Hover, `:focus-visible`, `:active` | Fondo `--blanco` → `--tinta`, texto `--tinta` → `--blanco`, borde → `--tinta`, en `--m-0`. Botón lleno: `--negro` → `--blanco` con texto y borde `--negro`, en `--m-0` | Igual |
| 1.7.i | **Paso de tira** | Clic en flecha cuadrada; teclado ← → | Avanza una tarjeta animando `scrollLeft` con `requestAnimationFrame` en `--m-300` `--curva-paso` (función `pasar(pista, destino)`; durante la animación la pista lleva `scroll-snap-type: none` y lo recupera al terminar). Flecha: `border-color` `--linea` → `--tinta` en `--m-200`; deshabilitada a `opacity: .3`. **Con el dedo:** scroll nativo con `scroll-snap-type: x mandatory` (sigue al dedo 1:1 y se acomoda). Sin vuelta, sin autoplay | `pasar()` salta sin animar |
| 1.7.j | **Galería de encuentro** (encuentro activado, «Otros encuentros») | Flechas de texto, dedo | Paso en `--m-500` `--curva-paso`, con vuelta al principio (Studio Iron: loop); contador «01 / 06» cambia en seco al llegar | Salta |
| 1.7.k | **Menú de pantalla** (≤ 1000) | Botón de dos rayas | Abre: `transform: translateX(-100%)` → `translateX(0)` en `--m-300` `--curva-mov` (el contenedor lleva `overflow-x: clip` para no generar scroll horizontal); rayas → X en `--m-300`. Cierra: en seco. Subnivel Artistas: reemplazo en seco | En seco |
| 1.7.l | **Panel Artistas** (≥ 1001) | Clic en «Artistas» | Abre y cierra en `--m-0` (Studio Iron: un cuadro). Sus miniaturas entran con 1.7.c | Igual |
| 1.7.m | ~~Segmentos de la ficha~~ | Sale en la 3.1: la ficha y la Edición apilan sus imágenes a ≤ 1000 (D24) | | |
| 1.7.n | **Grilla al filtrar** (Obras, Tienda) | Cambio de opción | La grilla baja a `opacity: .4` en `--m-200`, se repinta, vuelve a 1 en `--m-200`; las fotos nuevas entran con 1.7.c. El conteo cambia en seco | En seco |
| 1.7.o | **Cambio de vista** | Navegación por hash | **En seco** (Studio Iron: reemplazo a los ≈ 75 ms, sin animación de salida): se reemplaza la vista, `lenis.scrollTo(0, {immediate:true})`, foco al `h1`; la vida del cambio la ponen las imágenes que entran (1.7.c, 1.7.d). Sale el `.repinta-sale` / `.repinta-entra` de la v2 | Igual |
| 1.7.p | **`<details>`** (Cómo se compra, Leer más, Preguntas) | Abrir | Contenido `opacity` 0 → 1 en `--m-200` `--curva-mov`; «+» → «−» | En seco |
| 1.7.q | **Avisos al tocar** (Comprar, Amazon, Enviar) | Clic | `opacity` 0 → 1 en `--m-200` | En seco |
| 1.7.r | **Capas de maqueta** («Lo editas tú», Retícula) | Botón | `opacity` en `--m-200` | En seco |
| 1.7.s | **Casilla activa del Libro** (≥ 1001, puntero fino) | Hover | Filo 1.7.e sobre la miniatura | Igual |

**1.7.1 · Reglas:** sin `transition: all`; duraciones y curvas solo de esta tabla; propiedades animables: `opacity`, `transform` (subrayado, menú, banda de brillo), `border-color`, `scrollLeft` (por JS), `margin-top` del hero (por JS); el foco aparece sin transición; sin `scroll-behavior: smooth` global (lo hace Lenis); sin Swiper (si `pasar()` parpadea al recuperar el snap, Swiper 11 desde `cdn.jsdelivr.net/npm/swiper@11` es la salida, anotada en `desvios.md`).
**1.7.2 · `prefers-reduced-motion: reduce`:** `*, ::before, ::after { transition-duration: 0s !important; animation-duration: 0s !important; animation-iteration-count: 1 !important }`; el JS no inicia Lenis, deja `--p` en 0, `pasar()` sin animar y no pinta la banda de brillo.
**1.7.3 · Lo que no se mueve nunca** (Studio Iron no lo hace, medido): aparición al bajar, parallax fuera del hero, marquesina, autoplay, contador animado (sale el 1.7.p de la 2.1), zoom en hover, cursor propio, fundido entre vistas, cabecera que se esconde.

---

## 2 · Composición por vista

Columnas: **1440** (9 col) · **768** (6 col) · **390** (3 col). 390 es el ancho principal (brief §10, §9-1). «Studio Iron» nombra el tipo de página del inventario contra el que se pone lado a lado (`referencias/studio-iron-v3/inventario/tNN-*/`). Los ids de foto (`A-01`, `A-S`, `E-AP`…) son los de §4. Lo que no se nombra en una vista queda como en la 2.1 (git).

### 2.0 · Piezas globales

**2.0.1 · Barra de aviso** (en el flujo, se va al bajar; la única marca de maqueta en cada vista, D17). Fondo `--blanco`, borde inferior 1 px `--linea`, `--margen` a los lados.
| | ≥ 621 | ≤ 620 |
|---|---|---|
| Alto | 28 px, una línea | 26 px, una línea |
| Izquierda | «MAQUETA» (`.etiqueta`, `--tinta`) + «Contenido de muestra; fotos de Unsplash.» (Albert 500 12, `--gris`; `copy-v3.md` §3) + «Créditos y notas» (Albert 500 12, `--tinta`, subrayado 1.7.f, enlace a `#/creditos`) | «MAQUETA» + «Contenido de muestra.» + «Créditos» (268 px de 366, medido por Clara) |
| Derecha | «Lo editas tú» · «Retícula» (Albert 500 12, `--gris`, `aria-pressed`; activo en `--tinta` con subrayado dibujado) | **No están:** pasan a la barra inferior del menú de pantalla (2.0.4) |
Criterio: a 390 la barra no pasa de una línea (M16b); si el texto de Clara no cabe en 366 px, se acorta.

**2.0.2 · Cabecera** (Studio Iron, cromo de todas las páginas; en el flujo, D2). Como 2.1 con estos cambios: fondo `--blanco`; enlaces en `--t-interfaz` `--tinta`; marca chica `.t-marca` (22 px a ≥ 1001, ≈ 134 px de ancho; Studio Iron 130); a ≤ 1000, alto 44, botón de dos rayas `--tinta` de 2 px a la izquierda, marca de 26 centrada y botón de idioma a la derecha. **En Inicio a ≥ 1001 la marca chica no se muestra** (la hace la enorme).

**2.0.3 · Panel Artistas a ≥ 1001** (Studio Iron: menú Design, `p-paneles/menu-design-1440.jpg`). Como 2.1, en el flujo, fondo `--blanco`, sin velo; abre y cierra en seco (1.7.l). Celdas: «Todos los artistas» (`copy-v3.md` 4.1; miniatura `AC`, el espacio de la galería) y Artista A, B, C (miniatura de su obra representativa `A-07`, `B-07`, `C-07`), 5:4, nombre en `.t-autor` centrado a `--e-1`. Hover 1.7.e. Es cromo cerrado en reposo: no cuenta en M36.

**2.0.4 · Menú de pantalla a ≤ 1000** (Studio Iron `p-paneles/menu-movil-390.jpg`). Como 2.1 con: fondo `--blanco`; ítems en `.t-menu` 38 px centrados; entrada 1.7.k. **Barra inferior** de 44 px con borde superior `--linea`: «ES · EN» a la izquierda y «Lo editas tú · Retícula» a la derecha (`.etiqueta-ancha`; cada uno con 44 de área). Subnivel ARTISTAS con miniaturas 5:4 (2 × 177).

**2.0.5 · Tarjeta de obra** (Studio Iron T03, All Objects). Toda la tarjeta enlaza a la ficha.
- **Imagen:** caja 4:5 del ancho de su celda, variante `-tarjeta` de la foto (recortada desde el bbox con ≥ 3 % de aire por lado en las planas, o desde el `foco` en las de volumen; D11, 3.4), marcador y revelado 1.7.c. El muro o fondo de la foto es gris claro o crudo (R6), así la tarjeta se lee contra la página blanca como las de Studio Iron.
- **Pie a ≥ 621:** a `--e-1` de la imagen, `padding-inline: var(--e-1)`, una línea: título propio con año entre paréntesis en `.t-tarjeta` a la izquierda («{título} ({año})», como «Chainmail Chair (2021)» de Studio Iron; los títulos los escribe Clara mirando cada foto, §13-9), autor en `.t-autor` a la derecha («ARTISTA A»).
- **Pie a ≤ 620:** centrado, título y autor en dos líneas a `--e-1`.
- **Estado:** VENDIDA y COLECCIÓN PRIVADA como `.etiqueta` `--gris` en una segunda línea; DISPONIBLE no se escribe. Nunca sobre la imagen.
- **Hover:** 1.7.e. **Foco:** contorno 2 px `--tinta` hacia adentro sobre imagen y pie (M25).

**2.0.6 · Tarjeta de artista** (fila del Inicio, 1.4.1c): igual que 2.0.5 con la foto representativa `{X}-07`; pie: «ARTISTA A» en `.t-autor` a la izquierda y «9 OBRAS» en `.etiqueta` `--gris` a la derecha.

**2.0.7 · Tira** (Studio Iron T01, tira ALL OBJECTS de la portada; en la v3 solo la usa TODAS LAS OBRAS del Inicio; `movimiento/02-carrusel-hover-portada-zoom.jpg`). Línea de título: título en `.t-rotulo` a `--margen` (enlace, hover 1.7.g a 0,6) y, **arriba a la derecha, junto al título** (nunca sobre una foto), dos flechas cuadradas de 28 × 28 (fondo `--blanco`, borde `--linea`, «←» / «→» en Albert 13 `--tinta`, área de 44), ocultas si todo cabe y a ≤ 520 (ahí la señal es la tercera tarjeta que entra al borde: con costura de 1 px se ve el filo). Carril a `--e-2` del título con las vistas de 1.4.2; paso 1.7.i; `padding-block: var(--e-1)` para el foco; pista con `tabindex="0"` y teclado.

**2.0.8 · Banda** (Studio Iron T01, destacados LDF y Black Metal, **con su texto encima**, D15; corrige la 3.0, defecto 6). Foto a sangre 16:9 (≥ 621) / 4:5 (≤ 620) con `cover` y `foco`; fundido 1.7.d. La foto es un espacio con la mitad izquierda tranquila (§4: `E-AP2`, `ED-J2`). **Texto, todo en `--blanco`:** rótulo opcional (`.etiqueta`) → `--e-2` título (`--t-banda`, mayúsculas) → `--e-3` párrafo (`--t-bajada`, máx. 380) → `--e-4` enlace de acción (`.etiqueta-ancha`, subrayado de 1 px `--blanco`). **A ≥ 1001:** bloque a `--margen` + `--e-4` (36 px; Studio Iron 40) del borde izquierdo, arrancando a `--e-24` (144) del borde superior de la banda (Studio Iron: 151 de 810), sobre `.velo-lado` (1.1.10). **A ≤ 1000** (regla de Studio Iron a 390, 16.1-2): bloque centrado en los dos ejes con `--margen-texto` y texto centrado, sobre `.velo-pie`; si Ramón elige la cautela, `.bajo-foto`: el mismo bloque en `--tinta` debajo de la foto, centrado, a `--e-4`. Ninguna parte es `sticky` ni `fixed` (P1). Contraste por M32. Las dos bandas (ENCUENTRO y EDICIONES) son iguales; EDICIONES toca el pie.

**2.0.9 · Bloque partido** (Studio Iron T15 LDF y T04 About). Como 2.1 (2.0.10) con estos cambios: la columna de texto se pega **centrada en la ventana** (D10, 1.6.3); el título en `.t-italica` 30; la descripción en `--t-dato` máx. 320; el botón contorno con texto `.t-boton-serif`; los bloques consecutivos se tocan y alternan el lado. A ≤ 1000: foto a sangre arriba, texto centrado debajo a `--e-4`.

**2.0.10 · Página de texto** (Studio Iron T19, plantilla legal de 5 URL). Columna `c3-7` con tope 704 (x ≈ 368 a 1440); H1 `.t-recta`; línea opcional «Actualizado: …» en Albert 14 `--gris`; secciones a `--e-6` con H2 `.t-rotulo` y texto `--t-texto` 14/1,625; listas con sangría de 20; enlaces subrayados; `<strong>` en Albert 700. A ≤ 620, `--margen-texto` y H1 en 30.

**2.0.11 · Fila de datos** (fecha · lugar): `.etiqueta`, datos separados por «·» con `--e-3` a cada lado; a ≤ 620 cada dato en su línea.

**2.0.12 · Acciones** (Studio Iron, medido):

| Pieza | Studio Iron | Reposo | Hover / foco / activo |
|---|---|---|---|
| **Botón-fila** | «Add To Bag £3,800.00» | Ancho completo de su columna, alto 48, padding `--e-2` × `--e-3`, `justify-content: space-between`; etiqueta y valor en `.t-fila`; fondo `--blanco`, texto `--tinta`, borde 1 px `--linea` | 1.7.h: fondo `--tinta`, texto `--blanco`, en seco. Deshabilitado: texto `--gris` |
| **Botón lleno** | SEND ENQUIRY | Solo enviar formularios (Contacto, Activar opción 1). Ancho completo, alto 48, fondo `--negro`, texto `--blanco` en `.etiqueta-ancha` con «→» | 1.7.h: se invierte |
| **Botón contorno** | ENQUIRE (99 × 37), SHOP NOW, VIEW | Texto `.t-boton-serif` `--tinta`, borde 1 px `--negro`, padding `--e-2` × `--e-4`, alto mín. 37 (44 de área a ≤ 1000) | 1.7.g: opacidad 0,7 |
| **Enlace de acción** | DISCOVER, ENQUIRE de la ficha de obra | `.etiqueta-ancha` `--tinta`, subrayado de 1 px dibujado a −2 px | 1.7.g: opacidad 0,7 |
| **Enlace de texto** | menú, pie | `--t-interfaz` sin subrayado | 1.7.f |

**2.0.13 · Pie del sitio** (Studio Iron, todas las páginas; `t20-404/…-full-pagina-completa.jpg`). Como 2.1 (2.0.14) con: fondo `--negro`; titular `.t-pie-titular` en `--blanco` con tres palabras en itálica (`copy-v3.md` 4.2); enlace «Escribir a Módulo 369 →» con línea `--pie-linea` que pasa a `--blanco` con hover; columnas GALERÍA · AYUDA · REDES (como STUDIO · SUPPORT · SOCIAL) con rótulo `.etiqueta` `--pie-texto-2` y enlaces `--t-interfaz` `--blanco` (hover a `--pie-texto-2`); fila 3: «Módulo 369 · Galería de arte en línea» a la izquierda y **«Créditos y notas de la maqueta»** a la derecha (enlace), Albert 12 `--pie-texto-2`. **Foco en el pie: contorno `--blanco`** (Studio Iron lo deja negro sobre negro, 1,06:1; no se copia). Sin newsletter, sin mascota.

**2.0.14 · Vacío final:** cada vista termina a `--e-16` del pie, salvo que su último bloque sea una foto a sangre (entonces la foto toca el pie).

### 2.1 · Inicio `/` · Studio Iron T01 (portada)

**Lo que la auditoría encontró muerto o lejano y cómo se corrige:** muro generado → foto real de obra en su espacio, vertical 3:4 como el hero de Studio Iron (D5); héroe 1:1 con el scroll → acelerado (1.7.b) sobre una foto que dura en pantalla; dos barras de cromo de 107 px a 390 → 70 px (1.3); barra de control en mono con flechas en caja → contador en sans y flechas de texto; tira de 3 tarjetas → 4 desde 1220 (1.4.2); bandas con el texto abajo → texto encima, como las dos bandas de Studio Iron (D15); punto cobalto → sale (D6); marcas «muestra» en el enunciado → fuera (§10).
**Ojo primero:** a 1440, MÓDULO 369 de borde a borde y una pintura en color que sube y lo tapa; a 390, la pintura en color en su espacio, entera, con su línea de pie y controles en el primer viewport.

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | H1 «Módulo 369» | Solo para lectores de pantalla | igual | igual |
| 2 | **Marca enorme** (`aria-hidden`) | Dentro de `.portada`, `sticky` top 0, z 0; `--t-enorme` (1.2.1) con `padding-top: .12em`, `padding-left: .048em` y `--e-2` abajo (caja ≈ 225 px) | No existe | No existe |
| 3 | **Línea de pie y controles** (dentro de `.portada-sube`) | **Arriba de la lámina**, alto 44 a `--margen`: a la izquierda el enlace a la ficha con «{título} ({año})» (`.t-tarjeta`) y a `--e-3` «ARTISTA A» (`.t-autor`); a la derecha «←» · «01 / 03» (`.etiqueta`, `tabular-nums` por ancho fijo) · «→», flechas de texto con 44 de área (hover 1.7.g). Arriba porque la lámina 3:4 mide 1920 y la línea quedaría a 2.200 px | igual, arriba | **Debajo de la lámina** (la foto empieza en y = 70, M3); el autor pasa a segunda línea si no cabe |
| 4 | **Lámina** (carrusel, `.portada-sube`, z 1) | A sangre **3:4 (1440 × 1920)**, fotos `A-S`, `B-S`, `C-S` en ese orden (la de A, en color, primero: D6, D22); cada lámina enlaza a la ficha de la obra que se ve en ella (R10) solo para puntero y dedo (`tabindex="-1"`); **sube acelerada** (1.7.b) y tapa la marca | 3:4 (768 × 1024), sin aceleración | **3:4 (390 × 520)**, el mismo recorte |
| 5 | **Enunciado** (H2 + párrafo) | Padding `--e-9`; H2 `--t-enunciado` 7vw centrado en `c2-8`, **todo en `--tinta`** (sin punto de color, D6); párrafo `--t-bajada` centrado, máx. 464, a `--e-4` | 9vw en `c1-6` | 12vw con `--margen-texto`; padding `--e-6` |
| 6 | **Tira TODAS LAS OBRAS** (2.0.7; título de `copy-v3.md` 6.1) | 9 tarjetas: `A-03`, `B-01`, `C-01`, `A-05`, `B-03`, `C-03`, `A-08`, `B-06`, `C-06` (si alguna es la `obra_en_foto` de una lámina, se cambia por otra de su serie que no esté en la fila de artistas: M36); 4 por vista (346 px), flechas | 2,6 por vista | 3 por vista de 129, costura 1 px |
| 7 | **Banda ENCUENTRO** (2.0.8, texto encima), a `--e-6` | Foto `E-AP2` 16:9 (1440 × 810); rótulo «007/369», título ENCUENTRO, párrafo y «QUÉ ES ENCUENTRO» sobre `.velo-lado` | igual | `E-AP2` 4:5; texto centrado encima sobre `.velo-pie` (16.1-2) |
| 8 | **«Libro»** (casi escondida) | Fila de 48 a `--e-6`, solo la palabra en Albert 12 `--gris`, al borde derecho de `c9`, enlace a `#/encuentro/libro` | borde de `c6` | borde de `c3` |
| 9 | **Fila ARTISTAS** (1.4.1c; título «Artistas» en `.t-rotulo` a `--margen`, enlace a Artistas) | 3 tarjetas de artista (2.0.6) de 464 con `A-07`, `B-07`, `C-07`, una fila exacta, sin flechas | 3 × 240 | 3 × 129, costura 1 px |
| 10 | **Banda EDICIONES** (2.0.8, texto encima), a `--e-6` | Foto `ED-J2` 16:9; título, párrafo (`copy-v3.md` 6.6) y «VER LAS EDICIONES» sobre `.velo-lado`; **toca el pie** | igual | `ED-J2` 4:5, texto centrado encima |
| 11 | Pie | A 0 de la banda | igual | igual |

2.1.1 · **Pliegue medido:** a 1440 × 900: aviso 28 + cabecera 32 + marca ≈ 225 + línea 44 → la lámina empieza en y ≈ 329 y se ven 571 de sus 1920 px; por eso la obra de cada lámina tiene su borde superior en el primer cuarto de la foto (§4, ítems 2, 8 y 14): al cargar ya se ve. Con la aceleración, la foto llena la pantalla durante ≈ 537 px de rueda (1.7.b; Studio Iron ≈ 570). A 390 × 664 (Safari con barras): aviso 26 + cabecera 44 + lámina 520 + línea 44 = **634 ≤ 664**: obra entera, pie y controles a la vista sin bajar (M3).
2.1.2 · **Al bajar a ≥ 1001:** la marca queda quieta arriba (z 0) y la línea y la lámina suben encima, a 1,9 veces la velocidad de la página, hasta taparla; al pasar un alto de ventana todo sigue a la velocidad de la página. Ninguna letra queda sobre la lámina en ningún paso (M23).
2.1.3 · Controles: «←» deshabilitada en la 01 y «→» en la 03 (sin vuelta); sin avance automático; `aria-roledescription="carrusel"`; el pie cambia al de la lámina activa (`aria-live="polite"`).
2.1.4 · **Terminado:** a 1440 se lee como la portada de Studio Iron: la marca enorme, una pintura en color en su sala que sube con inercia y la tapa, el enunciado en negro, una tira de cuatro obras reales con materia y volumen, una banda de un encuentro con su texto encima, «Libro» sola, tres artistas en una fila y la banda de las ediciones con su texto, apoyada en el pie negro. A 390, lo mismo sin la marca: la foto llena el primer viewport y las bandas llevan su texto encima.

### 2.2 · Artistas `/artistas/` · Studio Iron T09 (`/artists`)

| Bloque | 1440 | 768 | 390 |
|---|---|---|---|
| H1 «Artistas de Módulo 369» (`.t-mayuscula`, centrado; `copy-v3.md` 6.2; Studio Iron: «SELECTED STUDIO IRON ARTISTS») | a `--e-9` de la cabecera y `--e-9` hasta la grilla (caja ≈ 140) | igual | a `--e-6`, 26 px |
| Grilla de artistas (1.4.1b) | 3 × 464, foto 4:5 `A-07`, `B-07`, `C-07`; nombre a 2 px debajo, `.t-autor` centrado; enlace a la artista; hover 1.7.e; revelado 1.7.c | 3 × 240 | **una columna a sangre, 390 × 488** (mientras sean 3) |
| **Visión curatorial en un bloque partido** (2.0.9; la 3.0 la dejaba suelta bajo la grilla y la vista quedaba en ≈ 37 % de imagen, M35), a `--e-9` de la grilla, **toca el pie** | Foto `AR` 1:1 (720 × 720) a la izquierda; a la derecha la visión en `--t-bajada`, centrada, máx. 320, pegada centrada (1.6.3) | apilado: foto 768 × 768, texto debajo | apilado: foto 390 × 390, texto debajo con `--margen-texto` y `--e-4` |

2.2.1 · Sin retratos, sin «9 OBRAS» (Studio Iron pone solo el nombre). **Terminado:** primer viewport de 1440 = H1 centrado y tres fotos grandes de obra con su nombre debajo, como `/artists`; al bajar, una sala y una frase. A 390, tres obras grandes una debajo de la otra.

### 2.3 · Artista `/artistas/<a>/` · Studio Iron T04 (Andu Masebo, Apohli) y T05 (Kouros Maghsoudi)

**Lo que la auditoría encontró:** hero de bandas planas generadas; 372 palabras y 7,4 pantallas contra 158 y 3,7 de Studio Iron; «Historia y proceso» como página de texto con H2. **Corrección:** hero de foto real con el nombre encima (D15), grilla de las 9 con una tarjeta desplazada, una Biografía partida junto al taller con su bloque PROCESO, una obra en otra sala de borde a borde, la cita junto a la obra en su espacio y cuatro fotos de proceso apoyadas en el pie. **Las 17 posiciones de imagen son 17 fotos distintas** (D25, M36): ninguna es un recorte de otra. Meta: ≤ 200 palabras de muestra por artista.

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | **Hero** pegado a la cabecera: `{X}-S2` (segunda foto de una obra en su espacio, **no** la lámina del Inicio), a sangre, `cover` con `foco` | 21:9 (1440 × 617) | 5:4 (768 × 614) | 5:4 (390 × 312) |
| 2 | **H1 nombre** «Artista A» (`--t-nombre` itálica) | **Sobre la foto** (D15): a `--margen` + `--e-1` del borde izquierdo, con la línea base al 66 % del alto del hero (Studio Iron: y ≈ 410 de 617), color del campo `texto` del manifiesto, estático; `.velo-lado` solo si M32 lo pide | Debajo de la foto, **17vw (≈ 130 px)**, centrado, padding `--e-4` | Debajo de la foto, **17vw (≈ 66 px)**, centrado, padding `--e-4` (la disrupción de escala, D22) |
| 3 | **Obras:** las 9 (`{X}-01` a `-09`), tarjetas 2.0.5, a 0 del hero (Studio Iron: grilla a 13 px del hero) / a 0 del nombre a ≤ 1000 | 3 × 3 (464); **la 8.ª bajada `--e-9`** (imagen desplazada, 1.4.1) | 3 × 3 (240), la 8.ª bajada | 2 por fila de borde a borde (4 + 1); **la 9.ª en la columna derecha, bajada `--e-9`** |
| 4 | **Biografía** (bloque partido 2.0.9, foto a la izquierda), a `--e-9` de la grilla | Foto 4:5 (720 × 900) **`{X}-T`, el taller de cada artista** (las tres). Columna pegada centrada, máx. 520: «ACERCA DE» (`.etiqueta-ancha`; `copy-v3.md` 6.3) → `--e-2` «ARTISTA A» (`.t-mayuscula`, interlineado 0,8) → `--e-6` la bio, un párrafo (`--t-texto` 14/1,5, justificado) → `--e-6` **«PROCESO»** (`.etiqueta-ancha`, el segundo grupo, como el «ABOUT» de Studio Iron) → `--e-2` el párrafo de proceso, mismo estilo. Los dos grupos son campos separados en «Lo editas tú» (9.2) | Apilado: foto 768 × 960, texto debajo, máx. 520 centrado, a la izquierda | Foto 390 × 488, texto 16/1,5 |
| 5 | **Obra sola a sangre:** `{X}-V`, una obra de la serie en otra sala, vista amplia (Studio Iron Kouros: 1440 × 960), enlace a la ficha de la obra que se ve (`obra_en_foto`), pie 2.0.5 a `--e-1` | 3:2 (1440 × 960) | 3:2 | 3:2 (390 × 260) |
| 6 | **Statement** (bloque partido, foto a la derecha), toca la obra sola | Foto 4:5 `{X}-S` (la lámina, en otra proporción y en otra vista) con `cover` y `foco`. Columna: el statement en `.t-cita` 38, centrado, sin comillas, **≤ 30 palabras**, pegado centrado; a `--e-9` «ARTISTA B →» (enlace de acción) | Apilado, texto arriba y foto abajo | igual, cita en 28 |
| 7 | **Fila de 4** 3:4 sin calle, a sangre, toca el Statement y **toca el pie**: `{X}-P1` a `{X}-P4` (proceso, materiales, la obra en otro lugar, la superficie de cerca; §4). No son recortes ni rótulos: son fotos | 4 × 360 × 480 | 4 × 192 × 256 | 2 × 2 de 195 × 260 |

2.3.1 · **Contraste del nombre:** si `{X}-S2` no pasa M32 con el nombre en su color, se pone `.velo-lado`; si tampoco, el nombre de esa artista va debajo también a 1440 y se anota en `desvios.md`. **Terminado:** se recorre como Andu Masebo: foto con espacio, nombre en itálica grande encima, grilla de nueve obras reales con una que se corrió, una mitad de texto junto al taller con su proceso, una obra en otra sala de borde a borde, una frase en itálica junto a la obra en su espacio y cuatro fotos del trabajo apoyadas sobre el pie. Ninguna foto se ve dos veces.

### 2.4 · Obras `/obras/` · Studio Iron T03 (All Objects) y T08 (`/art`)

Como 2.1 (2.4) con estos cambios: H1 «Todas las obras» en `.t-mayuscula` centrado (`copy-v3.md` 6.4; Studio Iron: «ALL OBJECTS» 36/32,4 en una caja de 202); conteo «27 OBRAS» en `.etiqueta` `--gris`; opciones de filtro en `--t-interfaz` con subrayado (1.7.f), con las técnicas nuevas (D23, §13-9); celdas de artista con miniatura 5:4 de **`{X}-S2`** (no `{X}-07`, que está en la grilla de la misma vista: M36); conmutador **«MURO · LISTA» con MURO activo por defecto en todos los anchos** (D12); grilla 1.4.1 con revelado 1.7.c; al filtrar, 1.7.n. **Lista** (Studio Iron T08): **el recorte del bbox** de la obra (planas) o la foto con su recorte (volumen) en `c1-5`, cartela en `6 / 10` con «ARTISTA A» `.t-artista` → `--e-2` título propio `.t-italica` 30 con año → `--e-6` técnica y medidas en `--t-dato` → `--e-6` botón contorno «VER LA OBRA». Estado vacío: «No hay obras con estos filtros.» en Albert 14 `--gris` centrada (Studio Iron T10b: «No works currently listed.») + «QUITAR FILTROS».
**Terminado:** a 1440, primer viewport con H1, filtros en dos líneas y la primera fila de tres fotos reales; a 390, la primera tarjeta a ≤ 340 px del borde superior.

### 2.5 · Ficha de obra `/obras/<o>/` · Studio Iron T11 (Record Separator) + botón-fila de T07 y T07c

**Lo que la auditoría encontró:** 2 imágenes planas generadas y una cartela de 9 elementos (Studio Iron: 5); pestañas «01 VISTA GENERAL / 02 DETALLE» en mono; a 390, 19 % de la página en imagen contra 63 % de Studio Iron (la vista crítica de M35). **Corrección:** fotos reales mostradas por su bbox, tres imágenes por obra como Record Separator, cartela de 6, imágenes apiladas también a 390 (D24).

**Imágenes por obra** (Studio Iron T11: la obra y sus detalles, de 762 de ancho, apilados; el brief §7 exige general y detalle):
- **Todas:** 01 **general** (el recorte del bbox de la obra plana, o la foto con su recorte si es de volumen, D11), 02 **detalle declarado** y 03 **segundo detalle declarado**: dos ventanas 3:4 distintas, del 40 al 50 % del bbox, **tomadas de dentro del bbox** (variantes `-det1` y `-det2`, 3.4; ninguna con muro). Son recortes de la misma foto y lo declaran: rótulo «Detalle» y `alt` «Detalle de {título}».
- **Las obras que aparecen en una foto de espacio** (`obra_en_foto` de `{X}-S`, `{X}-S2` o `{X}-V`, R10): además, 04 esa foto entera a su proporción («En su espacio»). Si una obra está en dos fotos de espacio, entra la de la lámina.

**A ≥ 1001:**

| Bloque | Dónde | Detalle |
|---|---|---|
| Imágenes | `grid-column: 1 / 6` (781 px), a `--e-9` de la cabecera, apiladas a `--e-2` | Todas al mismo ancho, sin tope de alto, fundido 1.7.d. Bajo cada detalle, a `--e-1`, «Detalle» en `.t-detalle` `--gris` (la declaración, D11). **Sin rótulos numerados** |
| **Cartela** (`.ficha-cartela`, pegada si cabe) | `grid-column: 6 / 10; padding-left: var(--e-9)`, máx. 464 (x ≈ 860) | 1 «ARTISTA A» (`.t-artista`, enlace, 1.7.f) → `--e-2` 2 **H1** «{título}, {año}» (`.t-italica` 30) → `--e-4` 3 descripción (`.t-descripcion`, dos líneas con `line-clamp` y «Leer más» que la abre en su lugar, 1.7.p) → `--e-4` 4 datos en `--t-dato`, líneas sueltas sin rótulo: técnica · medidas (del bbox, 14.0) · disponibilidad · **línea de precio** («Precio en pesos chilenos» o «Precio a consultar», 5.15; nunca cifra) → `--e-6` 5 **botón-fila** del estado (5.15) → `--e-2` solo estado 1: «Consultar» (enlace de acción) → aviso al tocar → `--e-4` 6 «› Cómo se compra» (`<details>`, `.etiqueta-ancha`; Studio Iron: «› SHIPPING & RETURNS») |

**A ≤ 1000** (D24, como T11 a 390): 01 general a sangre (390 de ancho, a su proporción) pegada a la cabecera → cartela a `--e-4` con `--margen-texto`, en este orden: ARTISTA → H1 → datos → botón-fila a todo el ancho (16 px, borde en los cuatro lados) → «Consultar» (estado 1) → descripción con «Leer más» → «› Cómo se compra» (la descripción baja para que el botón-fila quede a un gesto) → a `--e-6`, los detalles a sangre en 3:4 (390 × 520) apilados a `--costura`, cada uno con «Detalle» a `--e-1` → si hay, «En su espacio» a sangre. Sin pista, sin segmentos, sin deslizar: el detalle aparece con el scroll (D22).

2.5.1 · **Obras de muestra por estado** (sin cambio): estado 1 `a-04` · estado 2 sin precio `a-06`, `c-05` · estado 2 con precio y sin link `b-04` · estado 3 `a-05` · estado 4 `a-03`. M35 se mide en la mediana de estas seis fichas.
2.5.2 · **Sale** la navegación «← ANTERIOR · TODAS LAS OBRAS · SIGUIENTE →» (Studio Iron no la tiene; se vuelve con la cabecera y con el navegador).
2.5.3 · **Terminado:** a 1440, la obra grande al filo a la izquierda y dos detalles debajo, con una cartela corta de Studio Iron pegada a la derecha; a 390, la obra a sangre, la cartela con su botón-fila al primer gesto, y debajo los detalles a sangre al doble de escala.

### 2.6 · Ediciones `/ediciones/` · Studio Iron T06 (colección curada Black Metal) + mitades de T04 + franja de T15

**Cambia de la 3.0:** la grilla de tres tapas de 464 deja la vista en ≈ 70 % de imagen contra 93 % de su par (M35) y repite `ED-J` en la banda; con tres ediciones, cada una gana una fila de dos mitades a sangre.

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | H1 «Ediciones» (`.t-mayuscula`, centrado), **solo** (Studio Iron T06: H1 sin descripción; la presentación de `copy-v3.md` 6.6 vive en la banda EDICIONES del Inicio) | a `--e-9` arriba y abajo | igual | a `--e-6` |
| 2 | **Una fila por edición** (tres), consecutivas, que se tocan: dos mitades a sangre 3:4, **tapa** (`ED-n`) a la izquierda e **interior** (`ED-ni`) a la derecha, toda la fila enlaza a la edición; pie a `--e-1`: título propio de la edición (`.t-tarjeta`, §13-9) a la izquierda y «CUADERNO» / «LIBRO» / el tipo (`.t-autor`) a la derecha, `padding-inline: var(--e-1)`; hover 1.7.e sobre las dos | 2 × 720 × 960 | 2 × 384 × 512 | 2 × 195 × 260, costura 1 px; pie centrado en dos líneas |
| 3 | **Franja de 3** 3:4 a sangre sin calle, a `--e-6` de la última fila: `ED-1j`, `ED-2j`, `ED-3j` (la tercera vista de cada una), cada una enlace a su edición | 3 × 480 × 640 | 3 × 256 × 341 | 1 a sangre (390 × 520) + 2 × 195 × 260 |
| 4 | **Banda** `ED-J` 16:9 a sangre (las tres juntas), toca la franja y **toca el pie**, sin texto | 1440 × 810 | 768 × 432 | 4:5 |

### 2.7 · Edición `/ediciones/<e>/` · Studio Iron T07 (ficha de producto)

Composición de la Ficha (2.5), con las imágenes a su proporción y su recorte del manifiesto (son objetos, D11). Imágenes: 01 la tapa `ED-n`, 02 el interior `ED-ni`, 03 **`ED-nj`, la tercera vista propia de esa edición** (en la 3.0 era `ED-J`, repetida en tres fichas). A ≤ 1000, apiladas como 2.5 (D24): tapa → cartela → interior → tercera vista. Cartela: «← EDICIONES» (enlace de acción) → `--e-4` el tipo (`.etiqueta`) → `--e-2` H1 con el título propio (`.t-italica` 30) → `--e-2` «MÓDULO 369» (`.t-artista`) → `--e-4` descripción (`.t-descripcion` con «Leer más») → `--e-4` detalles (páginas, formato; `--t-dato`) → `--e-6` botón-fila «Comprar · Amazon →» → `--e-2` «Edición en inglés →» → avisos al tocar.

### 2.8 · Encuentro `/encuentro/` · Studio Iron T15 (London Design Festival) + T13b

**Lo que la auditoría encontró:** abre con un contador en mono sobre hueso y una caja kraft generada; 8 imágenes iguales. **Corrección:** abre con una sala vista de lejos y la palabra enorme encima (D15), el contador en serif más abajo, 8 fotos distintas (7 de la 3.0 más la caja junto a las preguntas).

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | **Foto de apertura** `E-AP`, a sangre, pegada a la cabecera | 3:2 (1440 × 960), con el **H1 «Encuentro»** (`--t-evento` 10vw, itálica) **encima**, centrado en los dos ejes, color del manifiesto, estático, sin velo (como LDF); si no pasa M32, se alinea a `c1` con `.velo-lado`, y si tampoco, va debajo | 4:5; H1 encima, centrado, 14vw, sobre `.velo-pie` (16.1-2) | 4:5 (390 × 488); H1 encima, 17vw, sobre `.velo-pie` (Studio Iron LDF a 390: el título sobre la foto) |
| 2 | **Intro** (texto puro, `--e-9` arriba y abajo): párrafos de muestra en `--t-bajada` centrados, máx. 520 (Studio Iron LDF: 3 párrafos centrados de 920) | | | `--margen-texto` |
| 3 | **Contador** (un `p` con `aria-label` «7 de 369 encuentros activados»): «ENCUENTROS ACTIVADOS» (`.etiqueta` `--gris`) y a `--e-2` «007/369» (`--t-contador`; «007» y «/» `--tinta`, «369» `--gris`; sin cobalto, D6), centrados; padding `--e-9` | contador de 667 px (x 387 a 1053) | 467 px | 240 px (x 75 a 315) |
| 4 | **Enlace vertical «Libro →»** (`writing-mode: vertical-rl`, `.etiqueta`, 44 de ancho de área) | Al borde derecho de `c9`, alineado arriba con el contador | `c6` | `c3` (x ≈ 334 a 378) |
| 5 | **Franja de 3 registros** 3:4 a sangre sin calle (`R-001`, `R-002`, `R-003`), cada uno enlace a su encuentro; revelado 1.7.c | 3 × 480 × 640 | 3 × 256 × 341 | 1 + 2 |
| 6 | **Cómo funciona** (bloque partido de edit, foto `R-004` 1:1 a la izquierda), toca la franja: «ENCUENTRO» → título «Cómo funciona» (`.t-italica`) → texto de muestra (`--t-dato`) | 720 × 720 | apilado | apilado |
| 7 | **Formas de activación** (foto `R-005` 1:1 a la derecha), toca el anterior: título → texto → botón contorno «ACTIVAR UN ENCUENTRO» | 720 × 720 | apilado | apilado |
| 8 | **Preguntas frecuentes** (bloque partido, foto `E-CAJA` 1:1 a la izquierda; cambia de la 3.0, que las dejaba como página de texto suelta y la vista en ≈ 78 % de imagen), toca el anterior: H2 `.t-rotulo` → tres `<details>` con borde superior `--linea`, resumen Albert 14 de 48 mín., «+» / «−» → a `--e-6` el **botón-fila** «Activar un encuentro · →», todo en la columna pegada centrada, máx. 464 | 720 × 720 | apilado | apilado |
| 9 | **Cierre:** foto `R-007` a sangre, enlace a su encuentro, a 0 del bloque anterior; **toca el pie** | 16:9 | 16:9 | 4:5 |

2.8.1 · **Criterio:** la tinta del contador termina a la izquierda del enlace vertical en los tres anchos (M5); el H1 sobre la foto pasa M32. **Terminado:** se lee como London Design Festival: una sala vista de lejos con la palabra enorme en itálica encima, una intro centrada, el número grande, tres fotos verticales de lo que la gente armó, tres mitades alternadas (la última con la caja y las preguntas) y una foto apoyada sobre el pie.

### 2.9 · Activar `/encuentro/activar/` · Studio Iron T19 (página de texto) + bloques de T15

Como 2.1 (2.9) con: foto de la opción 1 `E-CAJA` 1:1 y de la opción 2 `R-006` 1:1; botón lleno `--negro`; en la opción 2 la línea de precio «Precio en pesos chilenos» (5.15, `copy-v3.md` 6.9). **La línea que dice que las dos opciones están por decidir se queda** (brief §3 y §9-4 lo exigen): «Por decidir: pedir la caja o comprarla.», en `--t-dato` `--gris` bajo el H1, sin «Maqueta ·» (§10.3).

### 2.10 · Libro `/encuentro/libro/` · Studio Iron T12 (`/events`)

| # | Bloque | 1440 | 768 | 390 |
|---|---|---|---|---|
| 1 | H1 «LIBRO» (`.t-mayuscula`, centrado) + bajada de muestra (`--t-bajada`, máx. 520) + fila «7 DE 369 ACTIVADOS» (`.etiqueta` `--gris`) + «← ENCUENTRO» | a `--e-9`; caja ≈ 235 como Studio Iron | igual | a `--e-6` |
| 2 | **Destacado: el encuentro 007**, a `--e-9`: `R-007` 3:2 a sangre, enlace; debajo a `--e-3` «ENCUENTRO 007» (`--t-banda`) y a `--e-2` la fila FECHA · LUGAR | 1440 × 960, texto a la izquierda desde `c1` (Studio Iron monta este texto sobre la foto; aquí va debajo: no es una de las cuatro piezas de D15, y su propio destacado no pasa la vara de M32, 83 %) | 768 × 512, centrado | 390 × 260, centrado |
| 3 | **Los otros seis** (006 a 001), a `--e-4` | 2 columnas 3:2, 2 × 684 × 456, margen y calle `--e-4`; pie a `--e-2`: «ENCUENTRO 006» (`.t-pie-evento`) y el lugar (`.etiqueta` `--gris`) | uno por fila a sangre | uno por fila, 390 × 260 |
| 4 | **Las 369 posiciones**, a `--e-16`: rótulo «LAS 369 POSICIONES» (`.etiqueta`, centrado) y a `--e-4` el mapa 41 × 9 en `c1-9` (`role="img"`, `aria-label` de copy) | Casillas ≈ 31 px, calle 3; vacía: borde 1 px `--gris`, número en `.t-detalle` `--gris` (solo si la casilla mide ≥ 28 px); **activa: la miniatura de su registro** (`cover`, enlace de puntero, hover 1.7.s) | calle 2, sin números; activa en `--tinta` | calle 1 (≈ 8 px), sin números; activa en `--tinta` |
| 5 | Pie | a `--e-16` | | |

2.10.1 · Sale «LOS 7 SON DE MUESTRA» y el aviso «Maqueta · En el sitio…» (§10; la nota pasa a Créditos). **Terminado:** primer viewport de 1440 = H1 y la foto del encuentro 007 a sangre, como `/events`.

### 2.11 · Encuentro activado `/encuentro/libro/<nnn>/` · Studio Iron T13 (In Plain Sight)

Como 2.1 (2.11) con: H1 «ENCUENTRO 001» `.t-mayuscula` centrado; fila «001/369 · FECHA · LUGAR» en `.etiqueta` (12,8 en Studio Iron; aquí 12) con el número en sans (sin mono, sin cobalto); bajada `--t-bajada` máx. 524; foto `R-nnn` a sangre 3:2 / 5:4 a `--e-16`; «Otros encuentros del Libro» con la galería 1.7.j (alto 500, fotos a su ancho natural, «← 01 / 06 →» en `.etiqueta` bajo la tira, flechas de texto con hover 1.7.g); «← LIBRO».

### 2.12 · Acerca `/acerca/` · Studio Iron T17 (About)

**Lo que la auditoría encontró:** H1, bajada, tricolon MIRAR / *SELECCIONAR* / DECIDIR con una palabra en itálica, una nota, 3 subtítulos y 4 párrafos (Studio Iron: 2 párrafos justificados, sin subtítulos). **Corrección:**

| Bloque | ≥ 1001 | ≤ 1000 |
|---|---|---|
| Mitades a sangre, pegadas a la cabecera | Izquierda: foto `AC` 2:3 (720 × 1080), espacio sin personas, pegada (`sticky; top: 0`) mientras pasa el texto si el texto es más alto, como Studio Iron. Derecha: columna `.mitad-texto` de 600 con `padding-inline: var(--e-9)`, centrada en la ventana | Apilado: foto 390 × 585, texto debajo a `--e-6` |
| Texto, en orden | **Titular visible**: el enunciado en `--t-enunciado` a escala de columna (**36 px**, mayúsculas, 0,86, alineado a la izquierda; Studio Iron no tiene titular visible: la auditoría lo pidió) → `--e-6` **tres párrafos** de muestra (`--t-texto` 14/1,5, justificados): qué es Módulo 369 y su criterio curatorial; la acción (mirar, seleccionar y decidir, dichas en prosa, sin tricolon tipográfico); la visión → `--e-9` «VER LOS ARTISTAS →» (enlace de acción) | Igual, alineado a la izquierda, 16/1,5 a ≤ 620 |

Ningún párrafo habla de María como persona (brief §7). La foto de Acerca es la cuarta pieza pegada (`.acerca-foto`, 1.6.3, D10): está al costado del texto, no encima, y solo a ≥ 1001.

### 2.13 · Tienda `/tienda/` · Studio Iron T03 + estados de T07

| Bloque | ≥ 1001 | ≤ 620 |
|---|---|---|
| H1 «Tienda» (`.t-mayuscula`, centrado) + opciones «Todo · Obras · Encuentro · Ediciones» con subrayado (1.7.f) + conteo | como Obras | como Obras |
| **Grilla de 7 tarjetas** (1.4.1): `A-01`, `B-02`, `C-02` (obras), `E-CAJA` (caja), `ED-1`, `ED-2`, `ED-3` (tapas); pie de tarjeta 2.0.5 más la vía en `.etiqueta` `--gris` en la segunda línea («MERCADO PAGO», «AMAZON», «POR DECIDIR»). **Toda la tarjeta enlaza a la página de la pieza; sin botón contorno** (las tarjetas de producto de Studio Iron no lo llevan; el botón agregaba ≈ 56 px de texto por fila, M35) | 3 × 464 | 2 × 194 |
| **Cómo se compra** (bloque partido 2.0.9; antes página de texto suelta), a `--e-9` de la grilla, **toca el pie** | Foto `TI` 2:3 (720 × 1080) a la izquierda; a la derecha, pegada centrada, máx. 464: rótulo «CÓMO SE COMPRA» (`.etiqueta-ancha`) y las cuatro secciones de `copy-v3.md` 6.13 (H2 `.t-rotulo` + `--t-texto`): Obras (con **«No hay carrito: se compra una obra a la vez.»**, el criterio del brief §7), Consultas, Encuentro, Ediciones | Apilado: foto 390 × 585, rótulo, la sección Obras abierta y las otras tres como `<details>` (1.7.p) |

2.13.1 · **«No hay carrito» se queda en la vista** (corrige la 3.0, defecto 12): describe cómo funciona el sitio en producción, no la maqueta, así que la regla (d) no lo toca; el brief §7 lo exige en Tienda. A Créditos pasa solo la nota de que la tienda completa se cotiza aparte (§10.2-10).

### 2.14 · Contacto `/contacto/` · Studio Iron: cajón Enquire (`p-paneles/cajon-enquire-1440.jpg`, `-390.jpg`) puesto en el flujo

Página de texto (2.0.10), **una sola sección, sin H2 ni texto de ayuda** (`copy-v3.md` 6.14; el cajón Enquire no lleva ayuda): H1 «Contacto» (`.t-recta`) → si viene de una ficha, **chip de obra cargada** (Studio Iron Enquire): miniatura 60 × 60 de la foto sobre `--superficie`, a su derecha «{título}, {año}» en EB itálica 16 y «ARTISTA A» en `.t-artista`, «Quitar» en Albert 12 subrayado → campos **Nombre, Correo, Mensaje** (5.7: fondo `--superficie`, línea inferior `--linea-campo`, etiqueta en Albert 12 `--gris` dentro de la caja, arriba; alto 54; texto 16) → **botón lleno** «ENVIAR CONSULTA →» a todo el ancho → a `--e-9` dos filas de datos, como la columna SUPPORT del pie: «CORREO» + dirección de muestra, «INSTAGRAM» + cuenta de muestra (sin enlace). **Sale la sección Newsletter** (no está cotizada, brief §8-2; la nota pasa a Créditos).

### 2.15 · 404 · Studio Iron T20

Bloque centrado en vertical en la ventana (mín. `--e-16` arriba): titular `.t-404` en mayúsculas («ESTA PÁGINA NO EXISTE.», `copy-v3.md` 6.15) en dos líneas, **máx. 680 de ancho** a ≥ 1001 (Clara midió «ESTA PÁGINA» en 665 px a 7,6vw; con 560 se partía en tres o cuatro líneas); a `--e-3` una línea en Albert 14 centrada; a `--e-6` «VOLVER AL INICIO» y «VER LAS OBRAS» (enlaces de acción, centrados; Studio Iron no tiene enlace de vuelta: se agrega). Toda ruta desconocida termina acá.

### 2.16 · Créditos y notas `/creditos/` (nueva, fuera del mapa de 14) · Studio Iron T19 (plantilla legal)

Página de texto (2.0.10) tal cual Studio Iron Privacy, con los textos de `copy-v3.md` 6.16: H1 «Créditos y notas de la maqueta» (`.t-recta`) → «Actualizado: 7 de octubre de 2026» (Albert 14 `--gris`) → secciones a `--e-6`, cada una con H2 `.t-rotulo`:
1. **Qué es esta maqueta.** Tiene que decir, además de lo que ya dice Clara, **la frase de 3.5**: que las obras que se ven son de sus autores y que «Artista A, B y C», títulos, años, técnicas, medidas, estados y precios son inventados para la maqueta (§13-22).
2. **Notas abiertas** (lista: las notas que salieron de las vistas, §10.2).
3. **Fotografías** (§3.5): agrupadas por serie y por sección, una línea por foto, con «Obra y foto» o «Foto» según el manifiesto.
4. **Tipografías:** EB Garamond (Georg Duffner y Octavio Pardo) y Albert Sans, con licencia SIL Open Font License 1.1 (el nombre del autor de Albert Sans se verifica antes de publicar, `copy-v3.md` §12-6).
Enlazada desde la barra de aviso (2.0.1) y desde el pie (2.0.13). No cuenta en el tope de páginas: es de la maqueta y no llega a producción (P22).

---

## 3 · Plan de imagen (regla (c) de Ramón: fotos reales de Unsplash)

### 3.1 · Por qué y qué se mide

La auditoría midió que el relleno generado de la v2 tiene, contra las fotos de Studio Iron (mediana por imagen a 1440): bordes 1,15 % contra 6,92 %; entropía 3,53 contra 4,31 bits; bloques planos 78 % contra 57 %; saturación 0,16 contra 0,07; la misma escena repetida; y 36,5 % de muro vacío en las tarjetas (`muro-vacio.json`). **La 3.0 pedía fotos que reproducían ese muro** (obra plana, frontal, centrada con 8 a 20 % de muro por lado = 29 a 64 % de la tarjeta vacía, y campos de color lisos que no llegan a 5 % de bordes): se corrige en 3.2 y §4. Lo que se mide: **por serie, en el tramo 0, como compuerta** (M26: una serie que no pasa no entra); **por tarjeta**, el muro (M34); **por vista**, la cobertura vertical de imagen contra el par de Studio Iron (M35) y que ninguna foto se repita (M36).

### 3.2 · Coherencia por artista (lo que hace que se lea como cuerpo de obra)

- **Una serie, un autor:** las 9 obras de cada artista salen **del mismo perfil de Unsplash** (alguien que fotografía su propia obra, o una serie de un mismo fotógrafo), con la misma luz, el mismo fondo y la misma técnica. Las tres artistas se distinguen por técnica, materia y temperatura, y ninguna es un campo liso:
  - **A pinta, en color:** pintura abstracta gestual o matérica (empaste, capas, marcas de espátula o de pincel cargado) sobre tela, con **una gama propia de 2 a 4 colores que se repite en las 9**. Es la única serie en color: el color que desentona de la página (D6, D22).
  - **B trabaja en volumen** (D23): cerámica o escultura chica (gres, terracota, esmalte mate, yeso, piedra, madera), piezas de mesa o de pedestal fotografiadas enteras, con su sombra, sobre el mismo fondo continuo o el mismo plinto. Neutra: el color del material.
  - **C dibuja con tinta:** tinta negra con pincel y aguada sobre papel blanco o crudo, abstracta o caligráfica (sin letras legibles), de trazo cargado.
  - **`TECNICAS`** (14.0) pasa a: A óleo · acrílico · técnica mixta sobre tela; B cerámica · gres · yeso (o lo que muestren las fotos); C tinta · tinta y aguada sobre papel. Clara fija los nombres contra las fotos (§13-9); los filtros siguen filtrando por su campo.
- **Las fotos de la artista que no son obra** (lámina `{X}-S`, hero `{X}-S2`, obra sola `{X}-V`, taller `{X}-T`, proceso `{X}-P1` a `-P4`) salen, idealmente, del mismo perfil que la serie; si no hay, de otro perfil con obra de técnica, materia y paleta indistinguibles. **Ninguna con personas** (P13). La obra que se ve en `{X}-S`, `{X}-S2` y `{X}-V` pasa a ser una de las 9 (R10).
- **Proporciones** (R11): la proporción que cuenta es la **de la obra** (su `obra_bbox`), no la de la foto (D11). Al menos 7 de las 9 entre 0,64 y 1,0 de ancho sobre alto (vertical o cuadrada): así la tarjeta 4:5 deja ≤ 30 % de muro (M34). Las horizontales anchas van en la obra sola (`{X}-V`).
- **Si un perfil no alcanza 9:** se completa con un segundo perfil indistinguible en técnica, luz y fondo; se anota en el manifiesto y en Créditos.

### 3.3 · Slots por vista (qué foto, ratio, cuántas)

Regla de la tabla (M36): **dentro de una vista, en reposo y con panel y menú cerrados, ningún id aparece dos veces**, salvo (1) las miniaturas de las casillas activas del mapa del Libro, que son los mismos registros de arriba, y (2) los detalles declarados de la ficha, que son recortes rotulados de su general (brief §7: general y detalle). La lámina del Inicio no es el hero de Artista.

| Vista | Slot | Foto (id de §4) | Caja | Recorte |
|---|---|---|---|---|
| Inicio | Láminas (3) | `A-S`, `B-S`, `C-S` | 3:4 | `cover` + `foco` |
| Inicio | Tira TODAS LAS OBRAS (9) | 9 obras (2.1 #6), ninguna `obra_en_foto` de una lámina | 4:5 | `-tarjeta` |
| Inicio | Banda ENCUENTRO | `E-AP2` | 16:9 · 4:5 | `cover` + `foco` |
| Inicio | Fila ARTISTAS (3) | `A-07`, `B-07`, `C-07` | 4:5 | `-tarjeta` |
| Inicio | Banda EDICIONES | `ED-J2` | 16:9 · 4:5 | `cover` + `foco` |
| Artistas | Grilla (3) | `A-07`, `B-07`, `C-07` | 4:5 | `-tarjeta` |
| Artistas | Visión | `AR` | 1:1 | `cover` |
| Panel / menú (cromo) | Miniaturas (4) | `AC` (Todos), `A-07`, `B-07`, `C-07` | 5:4 | `cover` |
| Artista | Hero | `{X}-S2` | 21:9 · 5:4 | `cover` + `foco` |
| Artista | Grilla (9) | `{X}-01` a `{X}-09` | 4:5 | `-tarjeta` |
| Artista | Biografía | `{X}-T` (las tres) | 4:5 | `cover` |
| Artista | Obra sola | `{X}-V` | 3:2 | `cover` + `foco` |
| Artista | Statement | `{X}-S` | 4:5 | `cover` + `foco` |
| Artista | Fila de 4 | `{X}-P1` a `{X}-P4` | 3:4 | `cover` |
| Obras | Muro (27) y Lista (27) | las 27 obras | 4:5 · bbox | `-tarjeta` · `-obra` |
| Obras | Filtro de artista (3) | `A-S2`, `B-S2`, `C-S2` | 5:4 | `cover` + `foco` |
| Ficha | General, 2 detalles (+ en su espacio) | la obra; `-det1`, `-det2`; `{X}-S` o `-S2` o `-V` | bbox · 3:4 · natural | `-obra` · declarado · ninguno |
| Ediciones | Filas (3 × 2) | `ED-1` + `ED-1i`, `ED-2` + `ED-2i`, `ED-3` + `ED-3i` | 3:4 | `cover` |
| Ediciones | Franja (3) | `ED-1j`, `ED-2j`, `ED-3j` | 3:4 | `cover` |
| Ediciones | Banda | `ED-J` | 16:9 · 4:5 | `cover` |
| Edición | Tapa, interior, tercera vista | `ED-n`, `ED-ni`, `ED-nj` | natural | recorte del manifiesto |
| Encuentro | Apertura | `E-AP` | 3:2 · 4:5 | `cover` + `foco` |
| Encuentro | Franja (3) | `R-001` a `R-003` | 3:4 | `cover` |
| Encuentro | Bloques (3) | `R-004`, `R-005`, `E-CAJA` | 1:1 | `cover` |
| Encuentro | Cierre | `R-007` | 16:9 · 4:5 | `cover` |
| Activar | Opciones (2) | `E-CAJA`, `R-006` | 1:1 | `cover` |
| Libro | Destacado + pares (7) | `R-007` a `R-001` | 3:2 | `cover` |
| Libro | Mapa (7 casillas) | `R-001` a `R-007` (excepción de M36) | 1:1 (≈ 31 px) | `cover` |
| Encuentro activado | Foto + galería | `R-nnn`; los otros 6 | 3:2 · 5:4 · natural | `cover` · ninguno |
| Acerca | Mitad | `AC` | 2:3 | `cover` |
| Tienda | Grilla (7) | `A-01`, `B-02`, `C-02`, `E-CAJA`, `ED-1`, `ED-2`, `ED-3` | 4:5 | `-tarjeta` / `cover` |
| Tienda | Cómo se compra | `TI` | 2:3 | `cover` |
| Contacto | Chip | la obra cargada | 1:1 (60 px) | `cover` |

### 3.4 · Cómo entran al sitio (para Diego)

- **Originales** en `GALERIA-MARIA-LORETO/fotos-unsplash/originales/` (fuera de `maqueta/`, no se despliegan; `.gitignore` por peso), con `fotos-unsplash/manifiesto.csv`. **Columnas:** `id`, `archivo`, `unsplash_url`, `autor`, `perfil_url`, `ancho`, `alto`, **`tipo`** (`plana` | `volumen` | `espacio` | `registro` | `impreso` | `sala`), **`obra_bbox`** («x0 y0 x1 y1» en fracciones: la caja de la obra dentro de la foto; obligatorio en `plana` y `volumen`, y en `espacio` para la obra que se ve), `foco` («x% y%» para `object-position`), `texto` (`tinta` | `blanco` | vacío), `velo` (`si` | vacío), `detalle1`, `detalle2` («x0 y0 x1 y1», ventanas 3:4 de dentro del bbox; vacías = automáticas), `recorte` («x0 y0 x1 y1» para `volumen` e `impreso` en la ficha; vacío = la foto entera), `obra_en_foto` (id de obra), **`autor_de_la_obra`** (`mismo` si el perfil es de quien hizo la obra | `desconocido`), `fecha_descarga`.
- **`preparar_fotos.py`** (junto a `generar_relleno_v2.py`, fuera de `maqueta/`): lee el manifiesto y escribe en `maqueta/img/f/`, con LANCZOS, `quality=82, optimize=True, progressive=True`, sRGB, sin EXIF:
  - `{id}-600.jpg`, `-1200.jpg`, `-1600.jpg` de la foto, y `-2400.jpg` para láminas, hero, obra sola, apertura y bandas;
  - **`{id}-tarjeta-600.jpg`, `-1200.jpg`**: el recorte 4:5 de la tarjeta. Planas: la ventana 4:5 más chica que contiene el bbox con **≥ 3 % de aire por lado**, centrada en el bbox y corrida hacia adentro si toca el borde de la foto (si no cabe, la foto no sirve para tarjeta: M34). Volumen: la ventana 4:5 centrada en `foco` en la que el objeto ocupa del 60 al 90 % del alto;
  - **`{id}-obra-600.jpg`, `-1200.jpg`, `-1600.jpg`**: planas, el bbox con 2 % de aire; volumen e impresos, el `recorte`;
  - **`{id}-det1-…` y `{id}-det2-…`** (600 / 1200): ventanas 3:4 de dentro del bbox; si las columnas están vacías, las dos ventanas del 45 % del ancho del bbox con mayor desviación estándar que se solapen ≤ 30 %;
  - **`maqueta/fotos.js`** con `window.FOTOS = { id: { w, h, tipo, bbox, foco, texto, velo, autor, perfil, url, obra, autorObra } }` para `app.js`.
- **Peso:** `-600` ≤ 100 KB, `-1200` ≤ 280 KB, `-1600` ≤ 480 KB, `-2400` ≤ 750 KB. Si una se pasa, `quality=78` para esa foto.
- **`sizes`:** los de la 2.1 (3.3) con los nuevos: tira `(max-width:520px) 34vw, (max-width:919px) 38vw, (max-width:1219px) 33vw, 25vw`; grilla de Artistas `(max-width:620px) 100vw, 33vw`; ficha `(max-width:1000px) 100vw, 54vw`; lámina `100vw`.
- **`alt`:** describe lo que se ve, en la voz del sitio, sin «de relleno»; **el de cada obra termina en «, obra de muestra»** (no se ve en pantalla, así que no choca con la regla (d), y cumple el brief §7: «`alt` de obra que dice relleno»; §13-10).
- **Sale de `maqueta/img/`** todo lo generado (`artistas/`, `ediciones/`, `encuentro/`, `muro/`, `obras/`, 23 MB) cuando las fotos nuevas estén en su lugar. El favicon se rehace: «369» en EB Garamond 500 `--tinta` sobre `--blanco`.

### 3.5 · Créditos de las fotos

- **Dónde:** en la página Créditos y notas (2.16), sección Fotografías. Además, la capa «Lo editas tú» muestra sobre cada foto su crédito corto en la etiqueta de la pieza (9.2).
- **Cómo:** una línea por foto. Si `autor_de_la_obra` = `mismo` (la obra que se ve es de quien subió la foto, R4): **«Obra y foto: Nombre Apellido / Unsplash»**; si no: **«Foto: Nombre Apellido / Unsplash»**. El nombre enlaza al perfil (`https://unsplash.com/@usuario?utm_source=modulo369_maqueta&utm_medium=referral`) y «Unsplash» a `https://unsplash.com/?utm_source=modulo369_maqueta&utm_medium=referral`, como pide la guía de atribución de Unsplash. Delante, en `--gris`, dónde se usa (el título de muestra de la obra, «Lámina 1 y página de Artista A», «Taller de Artista A», «Encuentro 004»). Agrupadas: Artista A · Artista B · Artista C · Encuentro y Libro · Ediciones · Espacios.
- **La frase que lo deja claro** (corrige la 3.0, defecto 17: la obra que se ve es de una persona real y en el sitio queda firmada «Artista A», con título, año, estado y botón Comprar inventados): Créditos dice, en la sección 1 y como entrada de la sección 3, que **las obras que se ven son de sus autores** y que **«Artista A, B y C», títulos, años, técnicas, medidas, estados y precios son inventados para la maqueta** (Clara la escribe, §13-22).
- **El nombre del autor no aparece en ninguna otra vista:** las obras siguen firmadas «Artista A / B / C» (brief §6: no se inventan nombres y no se atribuye a una persona real una galería que no la representa). Por la misma razón, **la bio de muestra describe solo la práctica que se ve** (técnica, materiales, cómo se hace), sin lugar ni año de nacimiento, formación, oficio anterior, premios ni exposiciones (§13-6): una persona real identificable desde Créditos no puede quedar descrita con datos inventados.
- **Criterio (M33):** cada foto que se muestra en cualquier vista tiene su línea en Créditos, con «Obra y foto» o «Foto» según el manifiesto; el conteo de ids en `FOTOS` es igual al de líneas.

---

## 4 · § Imágenes a conseguir (lista de compras para quien busca en Unsplash)

**Total: 75 fotos** (17 por artista = 51; Encuentro y Libro 10; Ediciones 11; espacios 3). Las consigue otra persona; esta lista dice qué buscar, cuántas, en qué orientación y con qué reglas. Cada foto lleva un **id** que es el que usa §3.3. Los términos de búsqueda van en inglés, que es como indexa Unsplash; se prueban en ese orden y se cambia de término si en dos páginas de resultados no aparece una serie que cumpla. **Lo que ya hay en `referentes/unsplash/`** (7-oct, 11:09; 58 fotos de la búsqueda en curso): `artista-a` va en la dirección nueva (gestual y matérica) pero mezcla 6 perfiles (R8); de `artista-b` sirven las 4 esculturas como punto de partida de B (D23), los collages no (texto y caras); de `artista-c`, fuera las de Europeana y The Cleveland Museum of Art (R4) y las figurativas con caras (R3).

### 4.1 · Reglas para todas (se cumplen todas o la foto no entra)

| # | Regla |
|---|---|
| R1 | **Licencia Unsplash gratuita.** Nada de **Unsplash+** (fotos con candado o marca «+»), nada con marca de agua. Se baja con «Download free», tamaño original. |
| R2 | **Resolución:** lado largo ≥ 2.400 px (obras: ≥ 3.000 si existe, porque de ahí salen dos detalles); láminas `{X}-S`: verticales de ≥ 3.000 px de alto; `{X}-S2`, `{X}-V`, `E-AP`, `E-AP2`, `ED-J` y `ED-J2`: ≥ 3.000 px de ancho. Nítida al 100 % en la obra. |
| R3 | **Sin caras reconocibles** en ninguna foto (artista sin retrato, brief §7; y ninguna persona real queda asociada a la galería). **Personas solo en `E-AP`, `E-AP2` y los registros**, de espaldas o cortadas sin rostro; **manos en primer plano en 2 de los 7 registros como máximo**; ninguna persona en las fotos de artista (taller y proceso incluidos). |
| R4 | **Obra de arte:** solo fotos subidas por quien hizo la obra (el perfil muestra su propio taller o su serie: `autor_de_la_obra` = `mismo`) o con obra sin autor identificable (`desconocido`). **Nunca** cuentas de museo o archivo (Europeana, museos), obras conocidas, de galería con artista nombrado en la descripción, ni con firma legible de otra persona. |
| R5 | **Sin texto legible, logos ni marcas** en la foto. Las tapas de las ediciones llevan imagen, pero ningún título legible. |
| R6 | **Obras de la serie (`{X}-01` a `-09`), poco muro y fondo con tono:** toma frontal (planas) o de frente o tres cuartos con su sombra (volumen); la obra **entera** con **al menos 3 % de muro o fondo por lado** en la foto (lo justo para que el recorte 4:5 no la corte; si la foto trae más, el recorte se calcula desde el bbox y el muro sobrante se va); muro o fondo **gris claro o crudo, L\* entre 88 y 95, nunca blanco puro** (la tarjeta se tiene que leer contra la página blanca, como las de Studio Iron); luz que muestre la materia (empaste, papel, superficie). Resultado medido en la tarjeta: ≤ 30 % de muro (M34). |
| R7 | **Paleta:** A en color, con una gama de 2 a 4 colores que se repite en las 9 (es el color que desentona, D6); B y C neutras (saturación mediana ≤ 0,12, M26); espacios, Encuentro y Ediciones con luz natural y sin un color saturado dominante. |
| R8 | **Una serie, un perfil** por artista (3.2): las 9 obras de A del mismo perfil; igual B y C. Mismo fondo y misma luz dentro de la serie. |
| R9 | **Cada encuentro, una escena distinta:** los 7 registros no repiten lugar, ángulo ni materiales. |
| R10 | **La obra que se ve en `{X}-S`, `{X}-S2` y `{X}-V` es una de las 9 de esa artista.** Mejor si es la misma pieza que tiene foto frontal en la serie; si no, esa obra entra como una de las 9 y su ficha usa la foto de espacio como general. Se anota en `obra_en_foto`. |
| R11 | **Proporción de la obra** (no de la foto): al menos 7 de las 9 entre 0,64 y 1,0 de ancho sobre alto; como máximo 2 más anchas (hasta 1,5). |
| R12 | **Densidad:** la superficie de cada obra con materia visible (empaste, capas, trazo cargado, textura del barro o del esmalte), **nunca un campo liso**; en C, tinta que cubre al menos un tercio del papel. Compuerta del tramo 0 por serie: bordes ≥ 5 % y entropía ≥ 4,0 (M26). |

**Se registra cada una** en `fotos-unsplash/manifiesto.csv` (3.4) en el momento de bajarla: id, URL de la foto, nombre del autor tal como aparece, URL del perfil, tamaño, `autor_de_la_obra`, fecha. Sin eso, la foto no entra (M33). El `obra_bbox`, el `foco` y los detalles los fija Diego en el tramo 0, mirando cada foto.

### 4.2 · La lista

**Artista A · pintura gestual o matérica, en color (17 fotos)**

1. **`A-01` a `A-09` · 9 pinturas de una misma serie**, mismo perfil: abstracción gestual o matérica sobre tela (empaste, capas, marcas de espátula o de pincel cargado) con una gama de 2 a 4 colores que se repite en las 9; de frente, sobre muro gris claro o crudo, con 3 a 8 % de aire (R6); 7 o más verticales o cuadradas (R11). Términos: `gestural abstract painting texture`, `impasto abstract painting`, `mixed media painting`, `abstract painting palette knife`, `textured abstract painting on wall`.
2. **`A-S` · lámina:** **vertical 3:4 o más alta**, ≥ 3.000 px de alto: una pintura de la serie colgada o apoyada en un muro, con piso y luz natural; **el borde superior de la obra en el primer cuarto del alto y la obra ocupando al menos la mitad del alto** (a 1440 se ve al cargar; a 390 entra entera). Lámina 1 del Inicio, Statement de A y «en su espacio» de su ficha. Términos: `painting leaning against wall`, `abstract painting interior room vertical`, `canvas on floor against wall`, `artwork on wall natural light room`.
3. **`A-S2` · hero:** horizontal, 2:1 o más ancha (o 3:2 con la obra en la mitad derecha), ≥ 3.000 px de ancho: otra pintura de la serie en un espacio, con una **zona tranquila de muro a la izquierda** para el nombre (D15). Hero de Artista A y miniatura del filtro de Obras. Términos: `painting in empty room`, `artwork gallery wall wide`, `art studio wall painting wide`.
4. **`A-V` · obra sola:** horizontal 3:2, ≥ 3.000 px de ancho: una pintura de la serie en otra sala u otro muro, vista amplia. Términos: `abstract painting living room`, `painting above bench interior`, `artwork in interior wide`.
5. **`A-T` · taller sin personas:** vertical 4:5 o 3:4: mesa o muro de trabajo con pinceles, tarros, telas, pruebas de color. Biografía de A. Términos: `artist studio paint brushes table`, `painter studio canvases`, `art studio workspace paint`.
6. **`A-P1` a `A-P4` · proceso, sin personas,** verticales 3:4: P1 una tela a medio pintar en el caballete o el muro; P2 materiales (tubos, paleta, espátulas); P3 una obra de la serie en otro lugar (un rincón, el piso, un pasillo); P4 la superficie de una obra de cerca (macro real del empaste). Fila de 4 de Artista A. Términos: `unfinished painting easel studio`, `paint palette knife oil paint`, `paint tubes table`, `impasto texture close up`, `oil paint texture macro`.

**Artista B · volumen: cerámica o escultura chica (17 fotos)**

7. **`B-01` a `B-09` · 9 piezas de una misma serie**, mismo perfil: cerámica (gres, terracota, esmalte mate) o escultura chica (yeso, piedra, madera), de mesa o de pedestal; cada pieza entera, de frente o tres cuartos, con su sombra, sobre el mismo fondo continuo o el mismo plinto gris claro o crudo (R6); la pieza ocupa del 60 al 90 % del alto del recorte 4:5; neutras (R7). Términos: `ceramic sculpture`, `stoneware vessel`, `handmade ceramic sculpture minimal`, `small sculpture on plinth`, `plaster sculpture`, `ceramic object studio photography`.
8. **`B-S` · lámina:** vertical 3:4, ≥ 3.000 px de alto: una pieza de la serie en su espacio (sobre un pedestal, una repisa o el piso de una sala), con las condiciones del ítem 2. Términos: `sculpture on pedestal room`, `ceramic sculpture interior`, `sculpture gallery space vertical`.
9. **`B-S2` · hero:** horizontal, como el ítem 3: piezas de la serie en una repisa, una mesa o una sala, con la mitad izquierda tranquila. Términos: `ceramics on shelf room`, `sculptures in empty room`, `ceramic vessels table wide`.
10. **`B-V` · obra sola:** horizontal 3:2: una pieza de la serie en otro lugar, vista amplia. Términos: `sculpture interior natural light`, `ceramic vessel on table window`.
11. **`B-T` · taller sin personas:** vertical: estanterías con piezas sin cocer, mesa de trabajo, horno. Términos: `ceramic studio`, `pottery studio shelves`, `sculptor workshop tools`.
12. **`B-P1` a `B-P4` · proceso, sin personas,** verticales 3:4: P1 una pieza en proceso (barro sin cocer, en la mesa o el torno); P2 herramientas (estecas, esponjas, alambre); P3 una pieza en otro lugar; P4 la superficie de cerca (esmalte, marcas de los dedos, textura). Términos: `unfired clay pottery`, `pottery tools`, `clay sculpture in progress`, `ceramic glaze texture close up`.

**Artista C · tinta (17 fotos)**

13. **`C-01` a `C-09` · 9 dibujos de una misma serie**, mismo perfil: tinta negra con pincel y aguada sobre papel blanco o crudo, abstracta o caligráfica (sin letras legibles), de trazo cargado que cubre al menos un tercio del papel (R12); de frente sobre muro o mesa gris claro o crudo (R6). **Nunca** cuentas de museo o archivo (R4). Términos: `sumi ink painting abstract`, `black ink brush painting paper`, `ink wash abstract art`, `abstract ink drawing on paper`, `calligraphic abstract ink`.
14. **`C-S` · lámina:** vertical 3:4, ≥ 3.000 px de alto, con las condiciones del ítem 2: un dibujo de la serie enmarcado en un muro o pinchado en el muro del taller. Términos: `framed ink drawing on wall`, `drawings pinned studio wall`, `black and white artwork interior vertical`.
15. **`C-S2` · hero:** horizontal, como el ítem 3. Términos: `drawings on studio wall wide`, `framed artworks wall black and white`.
16. **`C-V` · obra sola:** horizontal 3:2. Términos: `ink painting interior`, `black and white art living room`.
17. **`C-T` · taller sin personas:** vertical: mesa con pinceles, tinta, papeles secándose. Términos: `ink brushes desk`, `calligraphy studio table`, `artist desk paper ink`.
18. **`C-P1` a `C-P4` · proceso, sin personas,** verticales 3:4: P1 un dibujo en proceso sobre la mesa; P2 pinceles, tinta y piedra de tinta; P3 un dibujo de la serie en otro lugar; P4 el trazo de cerca (macro de tinta sobre papel). Términos: `sumi ink stone brush`, `ink brush strokes close up`, `paper drying studio`.

**Encuentro y Libro (10 fotos)**

19. **`E-AP` · apertura de Encuentro:** horizontal 3:2, ≥ 3.000 px: **una sala o una mesa grande vista de lejos**, con varias personas de espaldas o cortadas trabajando con papeles u objetos, y un centro tranquilo para la palabra «Encuentro» (D15). Términos: `workshop room people from behind`, `people around large table from distance`, `community workshop space wide`.
20. **`E-AP2` · banda ENCUENTRO del Inicio:** horizontal 16:9 o más ancha, ≥ 3.000 px: otra escena de encuentro vista amplia, distinta de `E-AP`, con **la mitad izquierda tranquila** (el texto va encima, D15). Términos: los del ítem 19 y `group making art table wide`.
21. **`E-CAJA` · la caja:** cuadrada o vertical: caja de cartón o kraft cerrada, sin impresión, sobre una mesa, luz natural. Tienda, Activar y Preguntas de Encuentro. Términos: `kraft box on table`, `plain cardboard box minimal`, `brown paper box`.
22. **`R-001` a `R-007` · 7 registros de encuentro**, uno por escena (R9): **tomas abiertas del resultado de una activación en su lugar**: objetos, papeles o tarjetas dispuestos en un piso, una mesa, una repisa o un muro, con luz y espacio, como pequeñas instalaciones. Los lugares de `copy-v3.md` 6.11 (una mesa de cocina, un taller compartido, un patio, un living con piso de madera, una oficina con su muro, junto a una ventana, la entrada de una biblioteca). Manos en primer plano en 2 de 7 como máximo (R3). Horizontales 3:2 o 4:3 con el motivo al centro (se recortan también a 3:4 y 1:1). Términos: `objects arranged on floor room`, `paper installation room natural light`, `still life objects table interior wide`, `small installation white room`, `paper cutouts on wall`, `arranged objects on windowsill`.

**Ediciones (11 fotos)**

23. **`ED-1`, `ED-2`, `ED-3` · 3 tapas:** tres impresos **con imagen en la tapa y ningún título legible**, en **tres formatos distintos** (un cuaderno o libreta con una obra en la tapa; un fanzine o libro de artista cosido; un libro de tapa dura), cerrados, de frente o cenital, sobre fondo gris claro o crudo; verticales 3:4 o 4:5 (sirven a la fila de Ediciones en 3:4 y a la tarjeta de Tienda en 4:5). Términos: `artist book`, `risograph zine`, `handmade book binding`, `notebook with art cover`, `hardcover art book minimal`.
24. **`ED-1i`, `ED-2i`, `ED-3i` · 3 interiores:** el mismo impreso abierto (o uno indistinguible), páginas con imagen o lámina, sin texto legible; verticales 3:4 o con el motivo al centro. Términos: `photobook open on table`, `artist book open pages`, `zine spread`, `open sketchbook drawing`.
25. **`ED-1j`, `ED-2j`, `ED-3j` · tercera vista de cada una:** el impreso en contexto (en una repisa, apilado con papeles, el lomo cosido de cerca), vertical 3:4. Términos: `book on shelf minimal`, `zine stack table`, `book binding stitch detail`.
26. **`ED-J` · las tres juntas:** horizontal 16:9, ≥ 3.000 px: los tres impresos sobre una mesa. Banda de Ediciones. Términos: `art books on table`, `zines spread on table`, `stack of artist books`.
27. **`ED-J2` · banda EDICIONES del Inicio:** horizontal 16:9, ≥ 3.000 px: otra toma de impresos sobre una mesa, distinta de `ED-J`, con la mitad izquierda tranquila (texto encima). Términos: los del ítem 26.

**Espacios (3 fotos)**

28. **`AC` · Acerca:** vertical 2:3: una sala vacía con luz de ventana, sin personas ni obra identificable de otros (puede verse una obra de la serie de A, B o C). También miniatura «Todos los artistas». Términos: `empty white room natural light`, `minimal interior light and shadow wall`, `empty gallery space`.
29. **`AR` · visión curatorial de Artistas:** cuadrada o vertical: una sala con obra colgada o apoyada (obra sin autor identificable o de las series), vista amplia, sin personas. Términos: `gallery room artworks natural light`, `art exhibition space empty`, `artworks leaning against wall room`.
30. **`TI` · Cómo se compra de Tienda:** vertical 2:3: una obra embalada para envío (papel kraft, cartón, cinta) sobre una mesa o apoyada en un muro. Términos: `artwork wrapped in paper`, `packed painting for shipping`, `parcel kraft paper table`.

### 4.3 · Cómo se revisa antes de entregarlas a Diego (tramo 0)

1. Hoja de contacto de las 75 por grupo (Diego la arma con Pillow), mirada al lado de `referencias/studio-iron-v3/inventario/t03-todos-los-objetos/…-1440-v0-primer-viewport.jpg` y `t09-artistas-indice/…-1440-v0-primer-viewport.jpg`: cada serie tiene que leerse como el trabajo de **una** persona y las tres series tienen que verse distintas entre sí (color, volumen, tinta).
2. **M26 por serie y por grupo** (bordes, entropía, saturación) con `analizar.py` de la auditoría sobre las variantes `-tarjeta-1200` y las de cada caja: **compuerta**: una serie o grupo que no pasa no entra y se vuelve a buscar.
3. Hoja de las 27 tarjetas 4:5 con su bbox dibujado: ninguna obra cortada y muro ≤ 30 % (M34).
4. M36 sobre la tabla de 3.3 con los ids reales (que ninguna `obra_en_foto` choque).
5. Créditos completos en el manifiesto, con `autor_de_la_obra` (M33).

---

## 5 · Estados e interacción

Como 2.1 (§4, ítems 4.1 a 4.28, en git) con estos cambios de color y movimiento:

| # | Pieza | Reposo | Hover (`hover:hover`) | Foco visible | Activo | Deshabilitado |
|---|---|---|---|---|---|---|
| 5.1 | Botón-fila | `--blanco` / `--tinta` / borde `--linea` | Invertido en seco (1.7.h) | Invertido + contorno 2 px `--tinta` a 2 px | Invertido | Texto `--gris`, sin hover |
| 5.2 | Botón lleno | `--negro` / `--blanco` | Invertido en seco | Contorno 2 px `--tinta` a 2 px | Invertido | `opacity: .4` (Studio Iron) |
| 5.3 | Botón contorno | Borde `--negro`, texto `--tinta` | `opacity: .7` en `--m-150` | Contorno 2 px | `opacity: .7` | `opacity: .4` |
| 5.4 | Enlace de acción | Subrayado dibujado | `opacity: .7` | Contorno 2 px | `opacity: .7` | n/a |
| 5.5 | Enlace de cabecera, pie, menú, filtro | Sin subrayado | Subrayado que crece (1.7.f) | Subrayado + contorno | n/a | Sección actual u opción activa: subrayado dibujado |
| 5.6 | Tarjeta | 2.0.5 | Filo 1 px `--tinta` en seco (1.7.e) | Contorno 2 px `--tinta` hacia adentro (M25) | n/a | n/a |
| 5.7 | Campo | Fondo `--superficie`, línea inferior 1 px `--linea-campo`, etiqueta Albert 12 `--gris` arriba dentro de la caja, alto 54, texto 16 `--tinta` | n/a | Línea inferior 2 px `--tinta` + contorno 2 px | n/a | n/a |
| 5.8 | Flecha cuadrada | 28 × 28, borde `--linea`, fondo `--blanco` | Borde `--tinta` en `--m-200` | Contorno | n/a | `opacity: .3` |
| 5.9 | Flecha de texto (galerías, carrusel del Inicio) | «←» «→» Albert 12 `--tinta` | `opacity: .6` en `--m-150` | Contorno | n/a | `opacity: .3` |
| 5.10 | ~~Segmento de la ficha~~ | Sale (D24) | | | | |
| 5.11 | Herramientas de maqueta | Albert 12 `--gris` | `--tinta` | Contorno | `--tinta` + subrayado dibujado | n/a |

5.12 · **Foco:** contorno `--tinta` de 2 px con desfase de 2 px en todo el sitio; **`--blanco` en el pie**; nunca recortado (M25); «Ir al contenido» con fondo `--tinta` y texto `--blanco`.
5.13 · **Carga:** cada imagen reserva su espacio (`width` / `height` y `aspect-ratio`) y muestra el marcador de 1.7.c o `--superficie` (1.7.d). **Cambia la 2.1 (4.19):** ahora sí hay brillo animado mientras carga (Studio Iron), solo mientras carga.
5.14 · **Al bajar:** nada aparece ni se anima, salvo el hero acelerado del Inicio a ≥ 1001 (1.7.b). Solo cuatro piezas pueden quedar pegadas, solo a ≥ 1001 y ninguna encima de una foto (1.6.3, D10, 2.12). Los textos sobre foto de D15 se van con su foto.
5.15 · **Botón-fila según el estado** (brief §4; una fila por ficha, clara en reposo en los cuatro estados):

| Estado | Botón-fila (izquierda · derecha) | En los datos |
|---|---|---|
| 1 · Disponible, con precio y link | «Comprar» · «Mercado Pago →» | «Precio en pesos chilenos»; debajo de la fila, «Consultar» (enlace de acción) |
| 2 · Disponible, sin precio (`a-06`, `c-05`) | «Consultar» · «→» | «Precio a consultar» |
| 2 · Disponible, con precio y sin link (`b-04`) | «Consultar» · «→» | «Precio en pesos chilenos» |
| 3 · Vendida | «Consultar» · «→» | «Vendida» en `--gris` |
| 4 · Colección privada | «Consultar» · «→» | «Colección privada» en `--gris` |

5.15.1 · **La línea de precio se lee como interfaz final** (corrige la 3.0, defecto 11, y se alinea con `copy-v3.md` 5.2): no nombra la maqueta ni una «versión final»; la cifra no se muestra y lo explican el aviso global y la nota 7 de Créditos. «Consultar», no «Consultar por esta obra»: la palabra del brief §4 y el «Enquire» de Studio Iron.

---

## 6 · Breakpoints

Como 2.1 (§5): **≥ 1001** (9 columnas), **621 a 1000** (6), **≤ 620** (3), con estos agregados: el hero acelerado, la marca enorme, `.velo-lado` y lo pegado existen solo a ≥ 1001; a ≤ 1000 el texto sobre foto sigue la regla de Studio Iron en celular (D15, 16.1-2), con `.velo-pie`; la línea de pie del carrusel va arriba de la lámina a ≥ 621 y debajo a ≤ 620 (2.1); la ficha y la Edición apilan sus imágenes a ≤ 1000 (D24); la grilla de Artistas es de una columna a ≤ 620 mientras haya 3 (1.4.1b); Lenis solo con `(pointer: fine)` en cualquier ancho; las tiras cambian de vistas en **1220, 920 y 520** (1.4.2, cortes de Studio Iron, independientes de la retícula); las herramientas de maqueta pasan al menú a ≤ 1000 (2.0.1). Sin ancho máximo.

## 7 · Capa de señales

Como 2.1 (§6) con: `<meta name="theme-color" content="#FFFFFF">`; `og:title` «Módulo 369 · maqueta v3»; `og:description` «Propuesta de diseño. Contenido de muestra; fotos de Unsplash.» (`copy-v3.md` 4.3); sin `og:image`; `noindex, nofollow` en `index.html` y `_headers`; `<title>` de Créditos: «Créditos y notas · Módulo 369 · maqueta».

---

## 8 · Lo que esta spec prohíbe explícitamente

Todo es **regla**. Entre paréntesis, de dónde sale.

- **P1 · Nada fijo; nada pegado encima de una foto.** Cero `position: fixed` salvo `.reticula`. `sticky` solo en `.marca-enorme`, `.ficha-cartela`, `.mitad-texto` y la foto de Acerca, solo a ≥ 1001, las tres últimas solo con `.pega`. Cero cabecera fija, barra de compra fija, texto pegado sobre una foto, cursor propio. (María contra Escat; brief §7)
- **P2 · Nada encima de una imagen**, salvo los cuatro textos estáticos de D15 (las dos bandas del Inicio, el nombre de Artista a ≥ 1001, «Encuentro») y su `--velo-texto`: ni pie, ni número, ni flechas, ni paginación, ni etiqueta, ni otro degradé o velo. (María; D15)
- **P3 · La obra nunca se recorta sin declararlo** ni se envuelve en interfaz: en ficha y Lista manda el bbox; `cover` sobre una foto que muestra una obra solo en los slots de 1.4.6 y sin cortarla; ningún marco, caja, borde ni sombra de interfaz alrededor de una obra en reposo. (D11)
- **P4 · Cero profundidad de interfaz:** sin `box-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`; sin velos ni degradés sobre foto **salvo `--velo-texto` bajo los textos de D15** (1.1.10). (Studio Iron: sin sombras ni filtros; su único velo sobre foto es el de .75 bajo el texto de sus bandas, y se toma tal cual. La 3.0 atribuía «sin degradés» a Perrotin: lo que María rechazó de Perrotin es el exceso de blanco intenso, brief §5)
- **P5 · Ningún color fuera de 1.1.** (regla (a) de Ramón)
- **P6 · Sin color de acento en la interfaz** (D6): ningún glifo, punto, barra, enlace, estado, foco ni fondo de color. El único color fuerte del sitio está dentro de las fotos de la serie A. (tell #4, tell #8; regla (a) de Ramón)
- **P7 · Dos familias, sin otras:** EB Garamond y Albert Sans. **Sin monoespaciada.** Itálica solo en EB Garamond y solo en los roles de 1.2.32; `font-synthesis: none`. (regla (b) de Ramón; D7)
- **P8 · Sin tamaños fuera de 1.2.31, espaciados fuera de 1.3, ni duraciones o curvas fuera de 1.7.**
- **P9 · Radio 0 en todo.**
- **P10 · Nada se superpone a nada en reposo,** salvo la retícula encendida, la lámina que tapa la marca al bajar y los textos de D15 con su velo. La imagen desplazada (D22) se hace con `margin-top` o columna, nunca con `transform` que pise otra tarjeta.
- **P11 · Sin autoplay ni vuelta en el carrusel del Inicio y las tiras;** la galería de encuentro sí vuelve (Studio Iron).
- **P12 · Sin animación al bajar, sin parallax fuera del hero del Inicio, sin zoom en hover, sin marquesina, sin cursor propio** (Studio Iron tiene un cursor «SCROLL» que flota sobre el hero: es una letra encima de la foto, y María rechazó eso), **sin contador animado, sin fundido entre vistas.** (1.7.3)
- **P13 · Artistas sin retrato y sin caras:** ninguna foto con una cara reconocible en ninguna vista; manos y personas sin rostro solo en Encuentro y Libro (en los registros, manos en primer plano en 2 de 7 como máximo); ninguna persona en las fotos de las artistas, taller y proceso incluidos. (brief §7; Kurimanzutto; R3)
- **P14 · Cero cifras de precio y cero signo «$».** (brief §6)
- **P15 · Sin rayas largas ni medias** en textos visibles ni en `content:`. (manual de marca)
- **P16 · Ninguna imagen generada por código:** ni muros, ni obras, ni cajas, ni tapas; ni fakes de CSS. Solo fotos del manifiesto. (regla (c) de Ramón; tell #9)
- **P17 · Sin información que solo aparezca con puntero.**
- **P18 · Sin franja lateral decorativa.** (tell #6)
- **P19 · Sin `transition: all`** y sin `outline: none` sin reemplazo.
- **P20 · Sin emoji, iconos de relleno ni mascota;** flechas «→ ← › ‹», menú de dos rayas.
- **P21 · Sin `maximum-scale` ni `user-scalable=no`.**
- **P22 · Nada de la maqueta llega a producción:** aviso, Créditos y notas, retícula, «Lo editas tú», textos de muestra y **las fotos de Unsplash** (se cambian por las de María). (brief §6, §8-4)
- **P23 · Sin panel dibujado.** (brief §8-3)
- **P24 · Ninguna marca de maqueta en pantalla en reposo** fuera del aviso global y la línea de Activar: cero «muestra» / «sample», cero «Maqueta ·», cero corchetes, cero «de muestra» en rótulos. (regla (d) de Ramón)
- **P25 · Ninguna posición de imagen vacía o gris** una vez cargada. (brief §7)
- **P26 · El texto de muestra nunca** trae cifras de precio, fechas reales, nombres reales, atribución a María ni su declaración textual. (brief §6)
- **P27 · Sin carrito, cuenta, búsqueda, bolsa ni newsletter.** (brief §8)
- **P28 · Sin texto justificado a ≤ 1000.**
- **P29 · Sin Unsplash+, sin fotos sin crédito en el manifiesto, sin obras de museo, archivo o artista nombrado.** (R1, R4, M33)
- **P32 · Ninguna foto repetida dentro de una vista** (excepciones de 3.3: casillas del Libro y detalles declarados), **ni recortes de las obras de la serie usados como otra foto** (Biografía, fila de 4, Statement). (D25, M36)
- **P33 · Ninguna obra mostrada como campo liso con muro alrededor:** las series cumplen R6, R11 y R12 o no entran. (auditoría, defecto 1; M26, M34)
- **P30 · Sin numeración decorativa,** tampoco dentro de los títulos: ningún «01 · VISTA GENERAL», «EDICIÓN 01» ni número en caja; **ninguna obra ni edición titulada con su número de serie** («Campo 04», «Edición 01»: los títulos son propios, §13-9; el número queda solo en los datos). Los únicos contadores son «01 / 03» del Inicio, «01 / 06» de la galería de encuentro y «007/369». (auditoría, hallazgo 3 y defecto 10)
- **P31 · Sin una palabra en itálica o en otro color dentro de un titular** salvo el titular del pie (sus tres palabras). (tell #4)

---

## 9 · Capas de la maqueta

### 9.1 · Aviso global
2.0.1 en todas las vistas, ES y EN. Es la **única** marca de relleno en pantalla (D17).

### 9.2 · «Lo editas tú» (aprobada por Ramón, brief §10)
Como 2.1 (8.2) con: contorno discontinuo `--tinta` y punteado `--gris`; etiqueta en Albert 500 12, texto `--blanco` sobre `--tinta`. **Nueva pieza marcada: toda foto** («Fotos: las cambias por las tuyas», `copy-v3.md` 7), y en la etiqueta de cada foto su crédito corto («Obra y foto: Nombre / Unsplash» o «Foto: Nombre / Unsplash», 3.5), así María ve en la capa qué es de muestra y de quién es. **El bloque PROCESO de Artista se marca como campo propio**, separado de la bio (2.3, brief §3). El atributo nunca va en el `<img>`: va en su caja. «Todo texto de muestra» sigue marcando la primera `.pendiente` de la vista (la clase se queda en el DOM; lo que sale es su `::after`). 8.2.6 de la 2.1 (enlaces a los cuatro estados de la ficha) se queda.

### 9.3 · Retícula
Como 2.1 (8.3) con líneas de 1 px `--tinta` + 1 px `--blanco`, números en Albert 11 `--tinta` sobre chip `--blanco`.

---

## 10 · Lo que se elimina por «slots de IA» (regla (d) de Ramón y auditoría de la v2)

Cada ítem tiene su prueba (M16, M18, M26, M27). Diego borra el código, no lo oculta.

### 10.1 · Marcas y rótulos de relleno
1. **Las 49 marcas «muestra» / «sample»** (`.pendiente::after` y el `data-muestra` que escribe el JS). La clase `.pendiente` se queda solo como gancho de «Lo editas tú».
2. **Los rótulos «ACTIVADOS DE MUESTRA», «LOS 7 SON DE MUESTRA», «007/369 · activados de muestra»** (pasan a «ENCUENTROS ACTIVADOS», «7 DE 369 ACTIVADOS» y «007/369»).
3. **«CLP ···» con su marca** en la cartela, en Activar y en Tienda: lo reemplaza «Precio en pesos chilenos» o «Precio a consultar», sin cifra ni glifo de hueco y sin nombrar la maqueta (5.15.1, §13-12).
4. **El aviso de 63 px en mono a 390** (tres líneas): pasa a una línea de 26 px en Albert (2.0.1).
5. **Los `alt` que dicen «de relleno»**: describen la foto; el de cada obra termina en «, obra de muestra» (3.4, §13-10).

### 10.2 · Notas «Maqueta ·» en pantalla (pasan a Créditos y notas, 2.16, sección 2)
6. Artista: «la foto de taller es opcional» / «si la artista no tiene foto de taller, aquí va una obra suya».
7. Encuentro: «por decidir quién sube cada registro».
8. Libro: «en el sitio, mientras no haya encuentros activados, el Libro muestra las 369 posiciones vacías».
9. Acerca: «las tres palabras…».
10. Tienda: la nota de que la tienda completa (carro, pago en el sitio, stock) se cotiza aparte. **«No hay carrito» no sale:** se queda en «Cómo se compra» como texto de interfaz (2.13.1; brief §7).
11. Contacto: las dos notas (correo y newsletter); la sección Newsletter entera sale (2.14).

### 10.3 · Lo que se queda a la vista, con su porqué
- **Aviso global** (2.0.1): la regla «nada inventado presentado como real» (brief §6) lo exige en cada vista.
- **Una línea en Activar** que dice que pedir o comprar la caja está por decidir, en `--t-dato` `--gris`, sin «Maqueta ·» (brief §3 y §9-4 exigen que las dos opciones se vean marcadas como opción a decidir).
- **«POR DECIDIR»** como vía de la caja en Tienda (mismo motivo).
- **Avisos al tocar** (Comprar, Amazon, Enviar): no están en pantalla en reposo; el brief §6 exige que avisen al usarlos.
- **«Artista A / B / C»:** el brief §6 prohíbe inventar nombres de artista, y usar el del fotógrafo atribuiría a una persona real una galería que no la representa. Se lee como seudónimo de catálogo, no como hueco: va en `.t-autor` como cualquier nombre.

### 10.4 · Relleno generado por código
12. Todas las imágenes de `maqueta/img/{artistas,ediciones,encuentro,muro,obras}/` (M01 a M08 de la 2.1): sale la vista en muro, las bandas planas de A, el collage de B, la tinta de C, la caja kraft y sus siete registros, las tapas y los interiores generados. Las reemplazan las 75 fotos (§4). `generar_relleno_v2.py` se queda en el repo (historia) pero no se ejecuta.

### 10.5 · Tells de estructura y tipografía que listó la auditoría
13. **IBM Plex Mono** en 28 reglas (rótulos, contador, medidas, numeración, aviso, marcas): sale entera (P7).
14. **Numeración por todas partes** (P30): «01 / 05» con flechas en caja, «01 VISTA GENERAL / 02 DETALLE», «01 · VISTA GENERAL», «EDICIÓN 01» como rótulo de imagen, «Detalle · Campo 01, 2025» bajo el hero.
15. **El tricolon tipográfico de Acerca** (MIRAR / *SELECCIONAR* / DECIDIR con una palabra en itálica: tell #4 y A3) y los tres subtítulos (CRITERIO CURATORIAL, VISIÓN…): Acerca queda en titular y tres párrafos (2.12).
16. **Copy de más** (auditoría, hallazgo 7): párrafo de 6 líneas bajo el H1 de Artistas (se mueve a un bloque partido abajo, 2.2); Historia y proceso como página de texto con H2 (pasa a un grupo «PROCESO» dentro de la Biografía, 2.3); cartela de 9 elementos (pasa a 6, 2.5); anterior / siguiente de la ficha (sale); descripción breve en cada bloque de Ediciones (sale; queda en la Edición).
17. **Lienzo hueso, tierras saturadas y serif alta angosta** (patrón «editorial calmo», tell #4): fondo blanco, B y C neutras y A con su propia gama, EB Garamond ancha (1.1, 1.2, R7).
21. **El punto cobalto del enunciado y la «/» cobalto del contador** (un glifo de titular cambiado de color: tell #4): salen (D6).
22. **Títulos numerados** («Campo 01 a 09», «Recorte», «Línea», «Edición 01 a 03»), todos de 2025: pasan a títulos propios con años de 2019 a 2025 (P30, §13-9).
23. **Obras planas centradas en un muro** en 27 tarjetas y en las láminas (el «rectángulo dentro de otro» que la auditoría midió como muerto): R6, R11, R12, D23.
18. **El fundido de vista** de la v2 (`.repinta-sale` 150 ms / `.repinta-entra` 300 ms): sale (1.7.o).
19. **La aparición de 300 ms del panel Artistas** y el `clip-path` del menú: pasan a en seco y a `translateX` (1.7.k, 1.7.l).
20. **El contador animado 000 → 007** (nivel 2 de la 2.1): sale (1.7.3).

---

## 11 · Verificación (Javiera)

### 11.1 · Cómo se mide
Como 2.1 (10.1): 1440 × 900 y 768 × 1024 en Chrome headless; **390 × 844 real por CDP** (`Emulation.setDeviceMetricsOverride`, 390, DPR 2, `mobile: true`, UA de iPhone, táctil); 390 × 664 para el pliegue de Safari. Para todo lo que se compara con Studio Iron se usan **los mismos scripts** del estudio de esta ronda sobre la v3 publicada: `/Users/ramon/m369-recovery/scratch/v3/auditoria-v2/` (`captura.mjs`, `medir-pagina.js`, `movimiento.mjs`, `tira.mjs`, `cromo.mjs`, `analizar.py`, `peso-tipo.py`, `repeticion.py`), `…/movimiento/` y `…/color/datos/scripts/`. Rueda real (Lenis interpola). Todo archivo en `scratch/v3/` o en `referencias/`, nunca en `/tmp`.

### 11.2 · Mediciones

Se conservan de la 2.1, con su texto: **M1** (sin scroll horizontal), **M2** (superposiciones; excepciones de P10), **M10** (cambia: la caja de la general en la ficha y la Lista tiene la proporción del recorte de 3.4 ± 1 %, y esa proporción es la del `obra_bbox` ± 3 % en las planas; las medidas de la cartela tienen la misma proporción que el bbox ± 3 %), **M11** (campos de 16 px y 44 de alto), **M12** (44 × 44 a ≤ 1000 y con puntero grueso, también a 1024 × 768 táctil), **M13** (retícula 9 / 6 / 3 sin teñir fotos), **M17** (todo `img` con `complete && naturalWidth > 0`, también las de tiras y carruseles tras deslizarlos), **M22** (mapa 41 × 9; números solo en casillas ≥ 28 px; borde de casilla vacía ≥ 3:1), **M25** (foco entero y sin recorte, en blanco sobre el pie). Cambian o se agregan:

| # | Qué | Pasa si |
|---|---|---|
| M3 | Pliegue del Inicio (2.1.1) | A 390 × 664 la lámina 3:4 entera y la línea de pie y controles terminan a ≤ 664; a 390 × 844 la primera foto empieza en y ≤ 70; a 1440 × 900 la obra de la lámina 01 se ve sin bajar |
| M4 | Marca enorme (1.2.33) | Tinta de la M a ≤ 2 px del borde izquierdo de `c1` y la del 9 a ≤ 2 px del borde derecho de `c9`, a 1001, 1440 y 1920 (medido en la propuesta: 0 a 1 px); sin scroll horizontal; tilde de la Ó entera; no existe a ≤ 1000 |
| M5 | Contador contra «Libro» vertical (2.8.1) | El contador termina antes, en los tres anchos |
| M6 | Sin color de acento (D6, P6) | 0 elementos con `color`, `background` o `border-color` fuera de 1.1 en las 15 vistas + Créditos; 0 `#1F3BD6` y 0 «cobalto» en `styles.css`, `app.js`, `index.html` |
| M7 | Búsqueda en `styles.css`, `app.js`, `index.html` | 0 `fixed` fuera de `.reticula`; `sticky` solo en las cuatro piezas de P1; 0 `box-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`; 0 hex fuera de 1.1; 0 `Archivo`, `IBM Plex Mono`, `Instrument Serif`, `monospace`; `italic` solo en reglas de EB Garamond; 0 `border-radius` ≠ 0; 0 `transition: all`; duraciones solo de 1.7 |
| M8 | Grillas y tiras | Grilla: 464 ± 1 a 1440 en x = 12, 488, 964; 194 ± 1 a 390 (x = 1 y 196). Artistas: 464 a 1440; 390 a 390 (una columna con 3 artistas). Fila ARTISTAS del Inicio: 464 a 1440, 129 ± 1 a 390. Tira: 346 ± 2 a 1440 (4 por vista), 129 ± 1 a 390. Imagen desplazada: la 8.ª tarjeta de Artista a 1440 con su borde superior `--e-9` bajo el de la 7.ª; a 390, la 9.ª en x = 196, `--e-9` más abajo que su fila |
| M15 | Fuentes | `document.fonts` con «EB Garamond» (normal e italic) y «Albert Sans», `loaded`; `getComputedStyle` de 20 elementos de cada rol de 1.2 con la familia, el peso y el tamaño de su fila |
| M16 | Marcas de maqueta (P24) | En las 15 vistas + Créditos, ES y EN, con «Lo editas tú» apagada: 0 «muestra», 0 «sample», 0 «Maqueta ·», 0 «Mock-up ·», 0 corchetes, 0 «de muestra» en rótulos, **0 «versión final», 0 «final version»**; texto visible de la barra de aviso = el de `copy-v3.md` §3 (las excepciones son ese aviso y la línea de Activar) |
| M16b | Barra de aviso | Una línea: alto ≤ 28 a 1440 y ≤ 26 a 390 |
| M18 | Palabras | Palabras visibles en el primer viewport a 1440, por vista, ≤ las de su par de Studio Iron + 30 %, con el método de `medidas-si-1440.json`; Artista completa ≤ 200 palabras de muestra |
| M19 | Movimiento reducido | Con `prefers-reduced-motion: reduce`: sin clase `lenis` en `<html>`; `--p` = 0; `transition-duration` 0 s; sin banda de brillo; `pasar()` instantáneo |
| M20 | Movimiento normal | Duraciones y curvas computadas = tokens de 1.7 |
| M21 | ~~Cobalto en fotos~~ | Sale con el cobalto (D6) |
| M23 | Nada pegado sobre una foto | Como 2.1 (rueda real en pasos de 120 px por Inicio, Artista, Ficha, Encuentro, Activar, Ediciones y Acerca a 1440 y 390), con las cuatro piezas de P1; **a 390, 0 `sticky` activos y letras sobre foto solo en las piezas de D15 que 16.1-2 deje encima** (las dos bandas y «Encuentro»), que se mueven con su foto en cada paso |
| M24 | **Lado a lado con Studio Iron** | Con `captura.mjs` y la composición de `lado-a-lado/`, v3 a la izquierda y Studio Iron a la derecha, a 1440 y 390, v0 y página completa: Inicio ↔ T01; Artistas ↔ T09; Artista ↔ T04 (Andu Masebo) y T05 (Kouros); Obras ↔ T03 (Muro) y T08 (Lista); Ficha ↔ T11 y T07; Ediciones ↔ T06; Edición ↔ T07; Encuentro ↔ T15; Activar ↔ T19; Libro ↔ T12; encuentro activado ↔ T13; Acerca ↔ T17; Tienda ↔ T03; Contacto ↔ cajón Enquire; 404 ↔ T20; Créditos ↔ T19. Javiera juzga **a distancia** (la captura reducida al 25 %: ¿se ve viva y se ve del mismo sitio?) y de cerca; por par, qué falta. **Además, a 390 × 844 con grabación de pantalla** (screencast por CDP con tiempo por cuadro, como `movimiento/08-390-scroll`): un recorrido con el dedo por Inicio, Artista, Ficha y Encuentro en la v3 y en sus pares de Studio Iron, mirado lado a lado: ¿se mueve y se llena como Studio Iron en celular? Disrupciones de D22 a 1440 y a 390, en reposo |
| M26 | **Fotos con vida** (auditoría, hallazgo 1 y defecto 1) | **(a) Compuerta del tramo 0, por serie y por grupo** (A, B, C, láminas y fotos de espacio, Encuentro, Ediciones): `analizar.py` sobre las variantes `-tarjeta-1200` (series) y las de cada caja (resto): mediana de píxeles de borde ≥ 5 % (Studio Iron: 6,92 % por imagen), entropía mediana ≥ 4,0 bits (Studio Iron 4,31); saturación mediana ≤ 0,12 en B, C, Encuentro, Ediciones y espacios (A exenta: es el color, D6). Una serie que no pasa no entra. **(b) Por vista, informado:** bordes por página a 1440 y 390 al lado de su par de `pixeles-imagenes-resumen.json` (`bordes_por_pagina`); se marca toda vista bajo la mitad de su par. `repeticion.py`: ningún par de registros con la misma escena |
| M27 | **Marca contra Studio Iron** | `peso-tipo.py`: cobertura de tinta y ancho por letra de «MÓDULO 369» a 1440 dentro de ± 10 % de los de STUDIO IRON (0,307 y 0,85 del alto de mayúscula) |
| M28 | **Inercia** | Rueda de 100 px a 1440 con puntero fino: 90 % del recorrido entre 300 y 500 ms, final entre 700 y 1.100 ms (Studio Iron 390 y 891). A 390, nativo |
| M29 | **Hero acelerado** | Rueda real a 1440 × 900, scrollY 0 → 900: la lámina recorre entre 1,8 y 2,0 veces lo que recorre la página; **la lámina cubre la ventana entera durante ≥ 500 px de scroll** (Studio Iron ≈ 570; la propuesta da ≈ 537); ninguna letra sobre la lámina en ningún paso |
| M30 | **Carga y revelado** | Con la red limitada a 5 Mbps en Obras: la banda de brillo se ve en las tarjetas que no cargaron; al cargar, la capa termina de irse a los 800 ± 80 ms; a 390 igual |
| M31 | **Blanco por vista** (María contra Perrotin) | Píxeles con los tres canales ≥ 250 en la página completa a 1440, por vista, informados al lado del de su par de Studio Iron (home 15 %, colección 16 a 29 %, ficha de obra 43 %, artista 47 %, Art 58 %); se marca toda vista que pase al par por más de 10 puntos. Es dato para la reunión, no bloquea |
| M32 | **Texto sobre foto** (D15), **con la vara de Studio Iron** | Método del estudio de color (`color/datos/overimg-*`: captura con el texto visible y con el texto transparente), a 1440 y a 390, en las cuatro piezas de D15: en texto de 36 px o más, **≥ 90 % de los píxeles de glifo con contraste ≥ 3:1** contra lo que tienen detrás (Studio Iron: «London Design Festival» 93,2 %; su destacado de `/events`, 83 %, no pasaría); en el párrafo de 15 px, el rótulo y el enlace, **mediana ≥ 4,5:1** (Studio Iron: párrafo de banda 6,9:1). Si no pasa: primero el velo (1.1.10), después otra foto, después debajo (2.3.1, 2.8) |
| M33 | **Créditos** | Cada id de foto usado en el DOM de las 15 vistas tiene una línea en `#/creditos` con autor y dos enlaces con `utm_source=modulo369_maqueta`; el conteo coincide con `FOTOS` |
| M34 | **Obras sin cortar y con poco muro** | Hoja de las 27 tarjetas 4:5 con su bbox dibujado: en ninguna la caja corta la obra; **muro (1 − área del bbox / área de la tarjeta) ≤ 30 % en cada tarjeta plana y mediana ≤ 22 % por serie** (la v2: 36,5 %); en las de volumen, el objeto ocupa del 60 al 90 % del alto. Además las 3 láminas 3:4, los 3 heros a 21:9 y 5:4, las 3 obras solas y los Statement con su `foco`: la obra que se ve, entera (revisión visual escrita por Javiera, una línea por foto que falle) |
| M35 | **Imagen por vista** (auditoría, `cobertura-vertical-imagen.json`; defecto 16) | Con `medir-pagina.js` y `scratch/v3/lucia/cobertura.py` (unión de los intervalos verticales de todo `img` visible de ≥ 40 px dentro de la ventana, sobre el alto total del documento, pie incluido): la cobertura de cada vista **≥ la de su par de Studio Iron − 5 puntos**, a 1440 y a 390, según la tabla 11.3. Excepciones escritas en 11.3 |
| M36 | **Ninguna foto repetida** (D25, P32) | En las 15 vistas en reposo, con panel y menú cerrados, a 1440 y 390: ningún id de `FOTOS` aparece dos veces en la misma vista, salvo las casillas del Libro y los detalles declarados (3.3); la lámina del Inicio de cada artista no es su hero de Artista; ninguna imagen de Biografía, fila de 4 o Statement es un recorte de una de las 9 obras |

### 11.3 · Metas de M35 (cobertura vertical de imagen, % del alto de la página)

«Estimado» = la composición de §2 sumada a mano (bloques, espacios y pie de 424 / 502 px), para que la meta no sea una que la spec no cumple. **Al límite** = menos de 2 puntos de margen: si la medición queda bajo la meta, se aplica la palanca de la columna final, en ese orden, y se anota en `desvios.md`. La v2 está en `cobertura-vertical-imagen.json`.

| Vista | Par | SI 1440 | **Meta 1440** | Estimado | SI 390 | **Meta 390** | Estimado | Palanca si no llega |
|---|---|---|---|---|---|---|---|---|
| Inicio | T01 | 76,3 | **71,3** | ≈ 76 | 59,7 | **54,7** | ≈ 58 con el texto sobre las bandas | Si Ramón elige la cautela a 390 (16.1-2), la meta a 390 pasa a **50** (≈ 50) y se anota |
| Artistas | T09 | 64,9 | **59,9** | ≈ 65 | 60,4 | **55,4** | ≈ 67 | El bloque de la visión pasa a 4:5 |
| Artista | T04 | 80,3 | **75,3** | ≈ 89 | 52,6 | **47,6** | ≈ 66 | |
| Obras (Muro) | T03 | 78,7 | **73,7** | ≈ 81 | 63,0 | **58,0** | ≈ 72 | |
| Ficha de obra | T11 | 82,2 | **77,2** | ≈ 81 (obra 4:5) | 63,1 | **58,1** | ≈ 58 a 60, **al límite** | (1) a ≤ 620 la descripción entra entera en «Leer más» (0 líneas visibles); (2) la `--e-16` final pasa a `--e-9` |
| Edición | T07 | 65,3 | **60,3** | ≈ 82 | 33,2 | **28,2** | ≈ 59 | |
| Ediciones | T06 | 92,9 | **85** (excepción) | ≈ 85, **al límite** | 63,3 | **58,3** | ≈ 72 | Excepción: su par es una colección de 13.307 px con 37 imágenes; con tres ediciones el pie es el 9 % de la página. La meta es la de la v2 (85,4), que no puede bajar. Palanca: la banda `ED-J` pasa a 2:1 |
| Encuentro | T15 | 96,3 | **80** (excepción) | ≈ 81 | 61,5 | **56,5** | ≈ 59 (61 con «Encuentro» encima) | Excepción: el brief §3 exige en esta vista la intro, la numeración y las preguntas, y su par es un edit de 24.150 px con 32 imágenes. La v2: 70,5 |
| Libro | T12 | 62,6 | **57,6** | ≈ 59, **al límite** | 40,8 | **35,8** | ≈ 54 | El mapa sube a `--e-9` de los pares y del pie |
| Encuentro activado | T13 | 37,4 | **32,4** | ≈ 57 | 21,5 | **16,5** | ≈ 29 | |
| Acerca | T17 | 67,4 | **62,4** | ≈ 69 | 29,6 | **24,6** | ≈ 34 | |
| Tienda | T03 | 78,8 | **73,8** | ≈ 75, **al límite** | 58,9 | **53,9** | ≈ 55, **al límite** | (1) la fila de opciones y el conteo en una línea; (2) a ≤ 620, también la sección Obras de «Cómo se compra» en `<details>` con la línea «No hay carrito» fuera, como bajada del rótulo |
| Activar | (sin par) | | informado | | | informado | | |
| Contacto, 404, Créditos | | 0 | excepción: sin imágenes por diseño | | 0 | excepción | | |

---

## 12 · Detector anti-slop corrido sobre esta spec (7-oct, 3.1)

- **Tell #1 (índigo):** sin cobalto ni ningún acento de interfaz (D6, P6). ✓ (en la 3.0 estaba abierto)
- **Tell #2 (tarjetas):** no hay cajas: la «tarjeta» es una foto llena y un pie de una línea, como Studio Iron; la obra llena la tarjeta con ≤ 30 % de muro (M34). ✓
- **Tell #3 (oscuro por defecto):** lienzo blanco; el negro es solo el pie (Studio Iron). El velo de .75 es de Studio Iron, mide 55 % del ancho y existe solo debajo de cuatro textos (1.1.10). ✓
- **Tell #4 (editorial calmo; glifo del titular cambiado de color):** sin punto de color (D6), sin palabra suelta en itálica (P31), B y C neutras y A con su propia gama, serif ancha con roles medidos de Studio Iron. ✓ (en la 3.0 el punto cobalto era este tell)
- **Tell #6 (franja lateral):** ninguna (P18). ✓
- **Tell #7 (promedio de referencias):** se toman tal cual paleta, tipografía equivalente, escala, tiempos, el hero vertical acelerado y el texto sobre las bandas de Studio Iron. Lo que no se toma está escrito con su motivo (cabecera fija, cursor, cajones) y sale de restricciones de María, no de suavizar la referencia. ✓
- **Tell #8 (rol de token):** cada token tiene rol y «dónde no» (1.1, 1.2, 1.7); el `--hightlight` que Studio Iron declara y no usa no se toma (D6). ✓
- **Tell #9 (media colapsada):** el relleno generado sale entero; toda celda es una foto real (P16), ninguna se repite en su vista (M36) y ninguna posición se llena con un recorte de otra (P32). ✓
- **Slot de relleno con fotos reales** (nuevo, de la auditoría): obra plana centrada en un muro en 27 tarjetas; repetir la misma foto en cadena; títulos «Serie 01 a 09»; manos plegando papel y cuadernos vistos desde arriba (los géneros más de banco de imágenes). Corregidos en R6, R11, R12, D23, D25, P30 y §4 ítems 22 a 25. ✓
- **B1 (tres iguales):** tres artistas del mismo tamaño porque así es la grilla de Studio Iron y así crece el mapa de María (3, 6, 9); las diferencia su obra (color, volumen, tinta). Las ediciones ya no van en una fila de tres iguales (2.6). **Abierto con justificación.**
- **B3 (FAQ inventado):** las preguntas de Encuentro son de muestra, escritas contra el brief; María las reemplaza. **Abierto con justificación.**
- **B6 (hero centrado de 100vh):** la portada abre con marca y foto, no con texto centrado. ✓
- **Movimiento por defecto:** sin aparición al bajar ni `ease .3s` genérico; cada tiempo es una medida de Studio Iron (1.7). ✓
- **Slots visibles:** cero marcas en reposo (P24, M16); la línea de precio se lee como interfaz final (5.15.1). ✓
- **Prueba del logo tapado:** con la marca tapada se ve una galería con obra real de tres técnicas, un número 007/369 y un mapa de 369 casillas. ✓
- **Prueba del rubro cambiado:** el contador, el Libro y la ficha de obra con sus cuatro estados no calzan en otro rubro. ✓

---

## 13 · Slots de copy nuevos o cambiados (para Clara)

ES y EN. «Fijo» = interfaz (Clara, traduce SpindleLab); «muestra» = texto de muestra (con `.pendiente`, **sin marca**). Las reglas de P26, el vocabulario vetado de `copy-v3.md` §2 y el registro de tú siguen. **Estado** contra `copy-v3.md` (7-oct, 11:08): «hecho» = ya está y esta spec lo adopta; **«cambia»** = lo que la 3.1 le pide de nuevo a Clara.

| # | Slot | Tipo | Qué tiene que hacer | Estado |
|---|---|---|---|---|
| 1 | Aviso global | Fijo | Larga y corta, una línea | Hecho (§3: «Contenido de muestra; fotos de Unsplash.» / «Contenido de muestra.») |
| 2 | Créditos y notas (2.16) | Fijo | H1, «Actualizado», cuatro H2, «Qué es esta maqueta», notas abiertas | Hecho (§6.16); **cambia** la nota 6 (solo la tienda completa que se cotiza aparte; «no hay carrito» ya está en Tienda) y la sección 1 suma la frase de #22 |
| 3 | Rótulos de Encuentro y Libro | Fijo | Sin «de muestra» | Hecho (§6.8, §6.10) |
| 4 | Línea de Activar | Fijo | Por decidir, sin «Maqueta ·» | Hecho (§6.9) |
| 5 | Acerca (2.12) | Muestra | Titular y tres párrafos | Hecho (§6.12) |
| 6 | **Artista (2.3)** | Muestra | Statement ≤ 30 palabras en primera persona; **bio de un párrafo + proceso de un párrafo** (los dos grupos de 2.3 #4), ≤ 200 palabras por artista contando statement. **Solo la práctica que se ve:** técnica, materiales y cómo se hace; **sin** lugar ni año de nacimiento, **formación, oficio anterior**, premios ni exposiciones (una persona real es identificable desde Créditos, 3.5) | **Cambia:** (a) el párrafo 1 de las tres bios dice formación u oficio anterior («estudió pintura», «viene del diseño gráfico», «estudió arquitectura», «trabajó años preparando telas»): se reescribe sin eso; (b) **B pasa a volumen** (D23): statement, bio y proceso de B nuevos, de cerámica o escultura chica; (c) A pasa de «campos de color» a pintura gestual o matérica en color: el statement de A («Pinto por capas…») ya calza |
| 7 | Rótulos de la Biografía | Fijo | «Acerca de» / «About» (hecho, §6.3) y **el segundo rótulo «Proceso» / «Process»** (`.etiqueta-ancha`), que vuelve a hacer visible el bloque historia / proceso del mapa de María (brief §3) | **Cambia:** agregar «Proceso» (Clara confirma la palabra); sale «Detalle» bajo la foto de la Biografía (ahora es el taller de las tres) |
| 8 | Descripciones de las 27 obras | Muestra | ≤ 25 palabras contra la foto real (segunda pasada) | Hecho como regla (§9.1); se escriben con las fotos |
| 9 | **Títulos, años y técnicas** | Muestra | **Cada obra con título propio**, escrito mirando su foto, como mucho 2 «Sin título» por serie, **años repartidos entre 2019 y 2025**; las tres ediciones con título propio (el número queda solo en los datos, P30); técnicas de las tres series según 3.2 (`TECNICAS` y opciones del filtro). «Artista A / B / C» se queda (brief §6) | **Cambia:** salen «Campo», «Recorte», «Línea» y «Edición 01 a 03» como títulos (`copy-v3.md` 5.1, 6.6, 6.7, 9.3); el nombre de serie deja de verse en pantalla |
| 10 | `alt` de las 75 fotos | Fijo | Lo que se ve, en una frase; **el de cada obra termina en «, obra de muestra»** (brief §7); registros: la escena abierta, no «dos manos pliegan papel» | **Cambia:** sumar «, obra de muestra» al patrón de obra de §8 y ajustar el ejemplo de registro |
| 11 | Registros 001 a 007 | Muestra | Lugar y bajada contra la foto | Hecho (§6.11); se confirman contra las tomas abiertas de §4 ítem 22 |
| 12 | Línea de precio | Fijo | Se lee como interfaz final, sin nombrar la maqueta | Hecho (§5.2: «Precio en pesos chilenos» / «Precio a consultar»). La spec 3.0 pedía decir «que se ve en la versión final»: era una nota de maqueta en la cartela y se retira (5.15.1) |
| 13 | «Leer más» / «Read more» | Fijo | | Hecho |
| 14 | Segmentos de la ficha y de la Edición | Fijo | | **Cambia:** salen (D24); queda «Detalle» / «Detail» bajo cada detalle y el `aria-label` de las imágenes |
| 15 | Rótulo «Detalle» | Fijo | | Hecho |
| 16 | Estado vacío de filtros | Fijo | | Hecho (§5.3) |
| 17 | Visión curatorial (Artistas) | Muestra | ≤ 50 palabras, ahora en un bloque partido junto a la foto `AR` (2.2) | Hecho (21 palabras) |
| 18 | Intro de Encuentro | Muestra | | Hecho (§6.8) |
| 19 | 404 | Fijo | | Hecho (§6.15); la spec adopta el tope de 680 |
| 20 | Pie | Fijo | | Hecho (§4.2); la spec adopta «Escribir a Módulo 369 →» y GALERÍA · AYUDA · REDES |
| 21 | Contacto | Fijo | | Hecho (§6.14) |
| 22 | **Frase de Créditos sobre las obras** (3.5) | Fijo | Que las obras que se ven son de sus autores y que «Artista A, B y C», títulos, años, técnicas, medidas, estados y precios son inventados para la maqueta; y las líneas «Obra y foto: …» / «Foto: …» según `autor_de_la_obra` | **Cambia** (nuevo): `copy-v3.md` §6.16 dice «Foto: {autor}» para todas |
| 23 | Tienda: tarjetas | Fijo | **Sin botón contorno**: toda la tarjeta enlaza (2.13) | **Cambia:** salen «Ver la obra», «Activar un encuentro», «Ver la edición» de las tarjetas (quedan como `aria-label` si Clara lo ve útil) |
| 24 | Tienda: Cómo se compra | Fijo | Las cuatro secciones con «No hay carrito» (brief §7) | Hecho (§6.13); a ≤ 620, tres de ellas en `<details>` (2.13) |
| 25 | Ediciones | Muestra | La presentación vive solo en la banda del Inicio (2.6); descripciones contra los impresos de §4 ítems 23 a 25 (cuaderno con tapa ilustrada, fanzine o libro de artista, tapa dura) | **Cambia:** sale de la vista Ediciones; en la segunda pasada, la descripción de cada edición contra su foto |
| 26 | Línea de pie del carrusel | Fijo | «{título} ({año}) · ARTISTA A» | **Cambia** con #9 |

**Lo que la spec adopta de `copy-v3.md` §11** (las once diferencias de Clara): 1 «Acerca de» ✓; 2 «Todas las obras» ✓ (H1 y tira); 3 «Artistas de Módulo 369» ✓; 4 «Consultar» ✓; 5 «Precio en pesos chilenos» ✓; 6 pie ✓; 7 404 a 680 ✓; 8 Contacto sin H2 ni ayuda ✓; 9 aviso corto ✓; 10 autor de Albert Sans: se verifica antes de publicar ✓; **11 bios contra la técnica y no contra las fotos: sí, con el agregado de #6** (sin formación ni oficio anterior). También «Todos los artistas» en el panel y el menú (`copy-v3.md` 4.1).

---

## 14 · Plan de construcción (para Diego): tramo 0 + 5 tramos

Sobre `GALERIA-MARIA-LORETO/maqueta/` en una rama nueva `claude/maqueta-v3` desde `claude/maqueta-v2` (`98591d8`). `?v=N` sube en cada archivo tocado (CSS, JS, `fotos.js`, imágenes). Cada tramo termina con capturas a 390 (CDP real), 768 y 1440 de lo que tocó, su verificación y sus desvíos en `desvios.md` (sección «v3»). Commit por tramo (el repo no tiene remoto y vive en iCloud: no se deja trabajo sin commit al cerrar un tramo).

### 14.0 · Qué del código actual se reutiliza

| Se reutiliza tal cual | Se adapta | Se borra |
|---|---|---|
| Router por hash, `pintar()`, `navegar()`, restauración de posición por vista; diccionario `T`, `t()`, `f()`, `esc()`; idioma con `localStorage`; `ESTADOS`, `SIN_PRECIO`, `SIN_LINK`, `ESTADO_MUESTRA`, `ORDEN_OBRAS`, `TECNICAS`, `tamCat()`; filtros por campo y su combinación; validación de formularios; avisos al tocar; «Lo editas tú» (`edita()`); retícula; `_headers` | **`OBRAS`:** cada obra toma `foto` (id de `FOTOS`), **título propio y año** (§13-9), y su proporción **del `obra_bbox`** (ancho del bbox × `w` sobre alto del bbox × `h`), no de la foto; sus medidas de muestra y `tamCat()` se recalculan con esa proporción (el lado mayor, del rango de tamaños de la serie); sale `PROP` como fuente de proporción. **`TECNICAS`:** las de 3.2. **`imagen()`:** lee `FOTOS` (variantes 600 / 1200 / 1600 / 2400, `-tarjeta`, `-obra`, `-det1`, `-det2`; `foco` como `object-position`; `w` / `h`) y arma el marcador 1.7.c. **`activarImagenes()`:** pone `.lista` tras `img.decode()`. **`montarPista()`:** usa `pasar()` con rAF en 300 ms (1.7.i) y 500 ms con vuelta (1.7.j). **`navegar()`:** `lenis.scrollTo(…, {immediate:true})`. Todas las `V.*` con la composición de §2. **`styles.css`:** se quedan la estructura de retícula, grillas, partidos, ficha, pie y cabecera; cambian tokens (1.1, 1.2, 1.7) y las reglas que los usan | Las 28 referencias a `--mono`; `.pendiente::after` y la escritura de `data-muestra`; `.nota-maqueta` en reposo y sus llamadas en vistas (10.2); `.repinta-sale` / `.repinta-entra`; la animación `aparece` del panel; el `clip-path` del menú; el contador animado; la navegación anterior / siguiente de la ficha; los rótulos numerados de imagen; la sección Newsletter; `img/{artistas,ediciones,encuentro,muro,obras}/` (cuando entren las fotos) |

### 14.1 · Tramo 0 · Fotos (precondición; no se construye una vista con relleno generado)
1. Recibir las 75 fotos en `fotos-unsplash/originales/` y el manifiesto (§4). Si llegan por partes, se avanza por grupo (A, B, C, Encuentro, Ediciones, espacios).
2. Fijar mirando cada foto: `obra_bbox`, `foco`, `texto`, `velo`, `detalle1`, `detalle2`, `recorte`, `obra_en_foto` (3.4).
3. `preparar_fotos.py` (3.4): variantes, tarjetas, recortes de obra, detalles, `fotos.js`. Hojas de contacto de 4.3.
4. **Compuerta:** M26 (a) por serie y por grupo; M34 (tarjetas sin cortar, muro ≤ 30 %); M36 sobre la tabla de 3.3 con los ids reales. Una serie que no pasa se vuelve a buscar antes de construir con ella.
5. **Verificar:** pesos de 3.4; M33 contra el manifiesto; Clara recibe la hoja para la segunda pasada (títulos, años, técnicas, descripciones, `alt`, §13).

### 14.2 · Tramo A · Base, cromo, vida e Inicio
1. **Base:** enlace de fuentes (1.2) y `font-synthesis: none`; tokens de 1.1, 1.2 y 1.7 en `:root` y sus cortes; `theme-color`; clases de rol tipográfico (1.2.1 a 1.2.30); foco (5.12); `prefers-contrast` (1.1.13); `prefers-reduced-motion` (1.7.2).
2. **Vida:** Lenis desde jsDelivr con su CSS (1.7.a), solo con puntero fino y sin movimiento reducido; marcador y revelado (1.7.c) en `imagen()`; fundido (1.7.d); filo, subrayado, opacidad, inversión (1.7.e a 1.7.h); `pasar()` (1.7.i, 1.7.j); cambio de vista en seco (1.7.o).
3. **Cromo:** barra de aviso de una línea con «Créditos y notas» (2.0.1); cabecera blanca (2.0.2); panel Artistas en seco (2.0.3); menú de pantalla con `translateX` y las herramientas en su barra inferior (2.0.4); pie negro con foco blanco (2.0.13).
4. **Piezas:** tarjeta de obra y de artista (2.0.5, 2.0.6), tira con las cuatro vistas de 1.4.2 (2.0.7), fila de artistas (1.4.1c), banda con su texto encima y `--velo-texto` (2.0.8, 1.1.10).
5. **Inicio** (2.1) con el hero acelerado (1.7.b), las tres láminas 3:4 y la línea de pie arriba a ≥ 621.
6. **Verificar:** M1, M3, M4, M6, M7, M8 (tiras y fila), M15, M16, M16b, M19, M20, M23, M25, M27, M28, M29, M32 (bandas), M35 e M36 del Inicio; M24 Inicio a 1440 y 390, con la grabación a 390.

### 14.3 · Tramo B · Obras, Ficha y Tienda
1. Obras (2.4) con MURO por defecto, filtros con 1.7.n y estado vacío; Lista.
2. Ficha (2.5): la general por su bbox y dos detalles 3:4 apilados con «Detalle», cartela de 6 con «Leer más» y «Precio en pesos chilenos», botón-fila por estado (5.15); a ≤ 1000, general → cartela → detalles apilados a sangre (D24); fichas de 4 imágenes para las obras de R10.
3. Tienda (2.13) con tarjetas sin botón y «Cómo se compra» partido junto a `TI`.
4. **Verificar:** M8, M10, M18, M23 (los tres casos de la cartela), M25, M30, M34, M35 (Obras, Ficha, Tienda; la Ficha a 390 está al límite: 11.3), M36; M24 Obras, Ficha y Tienda.

### 14.4 · Tramo C · Artistas y Artista
1. Artistas (2.2) con la grilla 1.4.1b (una columna a ≤ 620) y la visión en un bloque partido junto a `AR`.
2. Bloque partido con la columna pegada centrada (2.0.9, 1.6.3).
3. Artista (2.3): hero `{X}-S2` con el nombre encima a ≥ 1001 (D15) y a 17vw debajo a ≤ 1000, grilla de 9 con la tarjeta desplazada, Biografía junto al taller con ACERCA DE y PROCESO, obra sola `{X}-V`, Statement junto a `{X}-S`, fila de 4 de proceso.
4. **Verificar:** M2, M8 (imagen desplazada), M18, M23, M32 (nombres), M34, M35, M36; M24 Artistas y Artista a 1440, 768 y 390.

### 14.5 · Tramo D · Encuentro, Activar, Libro, encuentro activado, Ediciones, Edición, Acerca, Contacto, Créditos y «Lo editas tú»
1. Encuentro (2.8) con «Encuentro» sobre la foto y las preguntas en un bloque partido junto a `E-CAJA`; Activar (2.9); Libro (2.10) con el mapa abajo y miniaturas en las casillas activas; encuentro activado (2.11) con la galería de 500 ms.
2. Ediciones (2.6) con las tres filas de mitades y Edición (2.7) con su tercera vista propia, apilada a ≤ 1000.
3. Acerca (2.12) con la foto pegada; Contacto (2.14) con chip y campos sobre `--superficie`; **Créditos y notas** (2.16) generada desde `FOTOS`.
4. «Lo editas tú» (9.2) con la pieza «Fotografías» y el crédito corto en su etiqueta.
5. **Verificar:** M5, M6, M22, M23, M32 («Encuentro»), M33, M35, M36; M24 de cada vista.

### 14.6 · Tramo E · Cierre
1. 404 (2.15).
2. Borrar el relleno generado de `img/` y el código de 14.0 columna derecha que quede.
3. Pasada completa de §11.2 (con la tabla 11.3) en las 15 vistas + Créditos, ES y EN; M12 a 1024 × 768 táctil; M31 informado; capturas a 390 y 1440 de Inicio, Artista, Obras, Ficha, Encuentro y Libro en `capturas/maqueta-v3/`; lado a lado de M24 en `capturas/maqueta-v3/lado-a-lado/`.
4. `desvios.md` al día; commit; **despliegue en `modulo369-maqueta.pages.dev` solo con el OK de Ramón** (excluyendo `*.py` y `fotos-unsplash/`); después, Javiera en contexto limpio.

### 14.7 · Si no alcanza: qué se corta y en qué orden
Primero la galería «Otros encuentros» del encuentro activado (queda solo la foto); después la foto pegada de Acerca; después el pegado de `.mitad-texto`; después las miniaturas en las casillas del Libro (quedan en `--tinta`); después el panel Artistas a ≥ 1001 (pasa a enlace). **Nunca se corta:** las 75 fotos reales sin repetir dentro de una vista y sus créditos, el texto sobre las bandas, EB Garamond + Albert Sans con la escala de 1.2, la paleta de 1.1, Lenis, el hero acelerado, el marcador con revelado, los hovers de 1.7, el paso de 300 ms de las tiras, cero marcas de maqueta en pantalla, la composición de Inicio, Artista, Obras, Ficha, Encuentro y Libro, los cuatro estados de la ficha. Todo corte se anota en `desvios.md`.

---

## 15 · Límites de esta spec

- **Las fotos no están todavía** (la búsqueda va en 58 de 75, sin manifiesto). La composición de §2 asume fotos que cumplen §4; si una serie no cumple (muro de más, perfil con menos de 9 obras, campo liso, ninguna foto en su espacio), se resuelve en el tramo 0 con la regla escrita (R6, R11, R12, 3.2, R10) y se anota. Si falta `{X}-S`, la lámina de esa artista usa `{X}-V` recortada a 3:4 con su `foco`, y si falta `{X}-S2`, el hero usa `{X}-V` y el nombre va debajo; **nunca** una de las 9 obras recortada (P32). Si faltan fotos de proceso, la fila de 4 pasa a 3 de 480 × 640 antes que repetir.
- **Las metas de M35 son estimaciones de composición** (11.3): cuatro están al límite. Las palancas están escritas; si una vista no llega con ellas, se anota y se decide con Ramón, no se rellena con fotos sin función.
- **EB Garamond no es Bookish:** su altura x es 4 % más baja, su descendente más largo (0,285 contra 0,205) y sus versales menos parecidas (IoU 0,55). Es la más parecida en la página entre 33 libres; la alternativa medida es Newsreader (cuerpos de serif × 0,93) y la segunda, Gambetta 500 (licencia ITF, no OFL). Si Ramón la siente demasiado clásica en las versales, el cambio es una línea de carga, la pila `--serif` y el factor de cuerpos.
- **El hero acelerado** está medido en Studio Iron con framer-motion; aquí es una implementación propia con el mismo efecto (1.7.b). La tolerancia de M29 es la medida.
- **Lenis y la retícula `fixed`:** sin conflicto conocido (Lenis mueve el scroll nativo); se comprueba en M23.
- **El texto sobre foto** (D15) depende de la foto: si M32 falla con el velo, va debajo. Es lo primero que se revierte si María lo lee como Escat, y a 390 depende además del OK de Ramón (16.1-2).
- **Artista B en volumen** (D23) es una decisión de relleno: si María trabaja en otra técnica o lo lee como un cambio de rubro, B vuelve a una técnica plana con R6, R11 y R12 (nunca a campos lisos).
- **Blanco:** el lienzo es blanco por regla de Ramón; si María insiste en su rechazo, 1.1.14 dice qué se ajusta.
- **Sin los bocetos de María** (brief §9-2): Inicio, Artistas, Encuentro y Libro se comparan con sus originales en la reunión.

---

## 16 · Historial de correcciones

| Fecha | Qué se corrigió | Regla o preferencia | Quién lo pidió |
|---|---|---|---|
| 26-sep-2026 | Dirección retícula 3·6·9 con los tokens de la v1 | Regla (no se reabre por iniciativa interna; sus tokens de color y tipografía los reemplaza la corrección del 7-oct) | Ramón |
| 26-sep-2026 | Nada fijo que ensucie las fotos al bajar (P1, P2) | Regla | María (sobre Escat) |
| 26-sep-2026 | Sin tanto blanco intenso | Regla, **suspendida por la corrección del 7-oct** (a): blanco como la referencia; si María insiste, ronda de ajuste (1.1.14) | María (sobre Perrotin) |
| 26-sep-2026 | Artistas con obra, no con foto (P13) | Regla | María (sobre Kurimanzutto) |
| 5-oct-2026 | La retícula es herramienta de maqueta (9.3, P22) | Regla | Brief §8-4 (Ramón) |
| 5-oct-2026 | Capa «Lo editas tú» sí; panel simulado no (9.2, P23) | Regla | Ramón, brief §10 |
| 5-oct-2026 | **Terminación:** casi terminada, al nivel de los referentes; sin corchetes ni posiciones de imagen vacías | Regla | Ramón, brief §10 |
| 5-oct-2026, ~20:40 | **Studio Iron dominante en toda la maqueta** (spec 2.0 y 2.1, en git) | Regla | Ramón |
| 5-oct-2026, noche | Lo pegado al costado, nunca encima de una foto (D10, M23) | Regla de esta obra | Lucía, a partir del brief §7 |
| 5-oct-2026, noche | Revisión 2.1: 14 defectos de fidelidad y 11 de contrato corregidos (detalle en la 2.1, §15) | Regla | Auditorías independientes, corregidas por Lucía |
| **7-oct-2026** | **Ramón, tercera corrección: paleta y tipografía de Studio Iron, Unsplash, sin etiquetas «muestra», vida.** «Está buena como maqueta pero se ve muerta. Se ve con varios slots de IA y lejana a la referencia. Es una primera entrega, pero se debe acercar a la final.» Consecuencias: paleta blanco y negro medida de Studio Iron (1.1); EB Garamond + Albert Sans, sale la monoespaciada (1.2); sistema de movimiento con Lenis, hero acelerado, carga con brillo y revelado, hovers y tiras de Studio Iron (1.7); 48 fotos de Unsplash con créditos en lugar del relleno generado (§3, §4); solo el aviso global y la página de Créditos y notas como marcas (§10); composición ajustada en 9 vistas según la auditoría de la v2 (§2); spec 3.0 | **Regla** | Ramón |
| 7-oct-2026 | **(3.0; el cobalto y el texto sobre foto los reemplaza la fila «7-oct, tarde»)** **Decisiones de Lucía dentro de la regla, reversibles en una línea**: cobalto conservado en su lista de dos (D6); texto estático sobre foto en dos lugares solo a ≥ 1001 (D15); tres láminas en vez de cinco (D5); Obras en MURO por defecto (D12); Newsletter fuera de Contacto (2.14); grilla de Artistas en 3 columnas y no en 4 (1.4.1b) | Preferencia de dirección | Lucía |
| 7-oct-2026 | **Rechazos parciales de la auditoría, con su porqué:** (a) **cursor «SCROLL» sobre el hero**: no se toma; es una letra que flota sobre la foto y María rechazó eso (P12); (b) **cabecera fija de 29 px**: no se toma, por la misma regla (D2); (c) **Swiper**: no, un `pasar()` propio da los 300 ms medidos sin otra librería (1.7.i); (d) **grilla de Artistas en 4 columnas**: 3, por la retícula y por el 3 · 6 · 9 del mapa de María (1.4.1b); (e) **«ARTISTA A / B / C»**: se queda, porque el brief §6 prohíbe inventar nombres (10.3) | Preferencia de dirección, dentro de las reglas | Lucía |
| **7-oct-2026, tarde** | **Spec 3.1: auditoría independiente de la 3.0, 17 defectos, corregidos uno por uno** (revisor adversarial; veredicto «requiere corrección»). **Aceptados enteros:** **1** la lista pedía la composición que se midió muerta → R6 (3 a 8 % de muro, fondo L\* 88 a 95), R11, R12, A gestual o matérica, B en volumen (D23), M26 como compuerta por serie en el tramo 0; **2** la proporción salía de la foto → `obra_bbox` en el manifiesto y en `FOTOS`, ficha y Lista por el bbox, detalles de dentro del bbox, M10 contra el bbox (D11); **3** 48 fotos repetidas en cadena → 75 fotos, ninguna repetida en su vista, Artista con 17 fotos propias, `E-AP2`, `ED-J2`, `ED-nj`, M36 (D25, P32); **4** manos plegando papel y cuadernos lisos → tomas abiertas de resultados como pequeñas instalaciones (manos en 2 de 7 como máximo), `E-AP` de lejos, impresos con imagen en la tapa en tres formatos; **5** lámina 3:2 → 3:4 en todos los anchos, factor 0,9 del hero (1,9×), M29 con ≥ 500 px de pantalla llena (D5, 1.7.b); **6** bandas con el texto abajo → texto encima con `--velo-texto` medido de Studio Iron, P4 corregida (su atribución a Perrotin era falsa), M32 con la vara de Studio Iron, la regla de 390 a Ramón (D15, 1.1.10, 2.0.8, 16.1-2); **7** la vida existía solo con rueda → lo que la da a 390 escrito en D16 y M24 con grabación a 390; **9** punto cobalto = tell #4 → sale el cobalto, el color lo pone la serie A (D6); **10** títulos numerados → títulos propios, años 2019 a 2025 (P30, §13-9); **11** «versión final» en la cartela → «Precio en pesos chilenos», M16 lo busca (5.15.1); **12** «no hay carrito» se queda en Tienda (2.13.1); **13** bloque PROCESO con rótulo propio (2.3); **14** la cuarta posición vacía → fila de tres de 464 (1.4.1c); **15** marca medida en avance → `calc((100cqw - 24px) / 6.11)` + `.048em`, verificada en tinta de 1001 a 2560 con 0 a 1 px (1.2.33, M4); **16** M35 con metas por vista (11.3); **17** «Obra y foto», frase de Créditos, bios sin formación, `alt` con «, obra de muestra» (3.5, §13). **Aceptados con otra solución, con su porqué:** **8** (disrupciones a 390): se aceptan el nombre a 17vw y la imagen desplazada en reposo (8.ª tarjeta a ≥ 621, 9.ª en la columna derecha a ≤ 620); **para la Ficha no se toma la pista que deja asomar 24 px**: la ficha a ≤ 1000 apila sus imágenes como T11 de Studio Iron a 390 (D24), así el detalle aparece con el scroll, sin gesto, y la vista crítica de M35 sube de 19 a ≈ 58 %; con una pista quedaba en ≈ 33 %. **16** (M35): se acepta la medida y la meta «par − 5», **con dos excepciones más que Contacto, 404 y Créditos**: Ediciones a 1440 (meta 85, la de la v2; su par es una colección de 37 imágenes en 13.307 px) y Encuentro a 1440 (meta 80; el brief exige intro, numeración y preguntas, y su par es un edit de 32 imágenes en 24.150 px), más el Inicio a 390 si Ramón elige la cautela de 16.1-2; para llegar al resto se rehízo la composición de Artistas, Ediciones, Ficha, Encuentro y Tienda (2.2, 2.5, 2.6, 2.8, 2.13). **2** (bbox): se aplica a las obras planas; en las de volumen y en las ediciones la ficha muestra la foto con su recorte, porque la silueta, la sombra y el contexto son la imagen (como T07). **Ninguno rechazado.** **Alineado con `copy-v3.md`:** las once diferencias de Clara (§13, al pie) | **Regla** (los 17, como correcciones del contrato) | Auditoría independiente, corregida por Lucía |

### 16.1 · Para el OK de Ramón (decisiones de esta spec que conviene que confirme antes del tramo A)
1. **Sin cobalto (recomendación, D6).** El punto azul del enunciado era el tell #4 que ya estaba en la v2 que leíste como «slots de IA», y la paleta de Studio Iron es blanco y negro. El «color que desentona» que pidió María lo pone **la serie de Artista A, la única en color**: la primera lámina del Inicio y 9 de las 27 obras. Si lo quieres de vuelta, son dos reglas, pero lo desaconsejo.
2. **Texto sobre foto a 390** (D15). A ≥ 1001 va encima en las dos bandas del Inicio, el nombre de Artista y «Encuentro», como Studio Iron. **A 390 hay que elegir:** (a) **la regla de Studio Iron en celular**: las dos bandas y «Encuentro» con el texto encima, estático y con su velo, y el nombre de artista debajo (se construye así: es lo que da vida al iPhone de María y lo que pide M35 en el Inicio); o (b) **la cautela**: todo debajo de la foto a 390, para que en su iPhone no haya ni una letra sobre una foto (una clase por pieza; el Inicio a 390 baja a ≈ 50 % de imagen y su meta de M35 pasa a 50). El riesgo de (a) es que María lo lea como Escat; el texto se va con la foto, no queda pegado.
3. **Artista B trabaja en volumen** (D23): cerámica o escultura chica en vez de collage, para tener siluetas y sombras como el ALL OBJECTS de Studio Iron. Clara reescribe a B.
4. **Ficha a ≤ 1000 con las imágenes apiladas** (D24) en vez de la pista con segmentos de la v2.
5. **Tres láminas** en el carrusel del Inicio (D5), verticales 3:4.
6. **Newsletter fuera de Contacto** (2.14): la nota queda en Créditos y la conversación, en la reunión.
