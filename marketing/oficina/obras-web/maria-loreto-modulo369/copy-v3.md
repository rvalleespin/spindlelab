# Copy de la v3 · Módulo 369 · maqueta v3

> Lo escribe Clara (`/web-copy-interfaz`) el 7-oct-2026, por la **tercera corrección de Ramón** (brief §10): «se ve muerta», «varios slots de IA», «lejana a la referencia». Contrato: `brief-de-obra.md` (alcance) > `spec-visual.md` 3.0 (visual) > **este documento (texto)**. **Para revisión humana:** lo aprueba Ramón antes de construir; nada de esto llega a producción (brief §6, spec P22).
> **Reemplaza, para la v3, a `copy-secciones.md` y `copy-muestra.md` en todo lo que se ve.** Si un texto visible no está aquí, no va en pantalla. Esos dos documentos quedan como historia y como inventario de quién escribe qué en el sitio (`copy-secciones.md` §6, que sigue sirviendo en la reunión).
> **Insumos:** spec 3.0 (§2, §9, §10, §13), las capturas y los HTML guardados de Studio Iron de esta ronda (`referencias/studio-iron-v3/inventario/`, `scratch/v3/inventario/html/`, texto extraído en `scratch/v3/clara/si-*.txt`), las mediciones de la auditoría de la v2 (`referencias/studio-iron-v3/auditoria-v2/datos/medidas-si-1440.json` y `medidas-v2-1440.json`), el diccionario de `maqueta/app.js` (`T` y `M`) y `GALERIA-MARIA-LORETO/BRIEF.md`.
> **Medido, no estimado:** los anchos de §11.1 salen de Chrome headless con EB Garamond y Albert Sans cargadas desde archivos locales de Google Fonts (`scratch/v3/clara/medir.mjs`).

---

## 1 · Cómo escribe Studio Iron, y la regla de largo que sale de ahí

Leído en sus capturas y en el texto de sus páginas (portada, All Objects, `/art`, `/artists`, Andu Masebo, Apohli, Kouros Maghsoudi, ficha de producto, ficha de obra, cajón Enquire, `/events`, Saatchi Yates, London Design Festival, About, Shipping & Returns, 404, pie).

| Pieza | Studio Iron (textual) | Largo | Regla para la v3 |
|---|---|---|---|
| Menú | Design · Art · London Design Festival · Events · About | 1 palabra | Una palabra por ítem (salvo «Acerca de») |
| Título de índice | ALL OBJECTS · ART · SELECTED STUDIO IRON ARTISTS · EVENTS CURATED BY STUDIO IRON | 1 a 5 palabras | El nombre de la vista o una frase de hasta 5 palabras, sin bajada que explique |
| Enunciado de portada | DEDICATED TO A NEW ERA OF DESIGN. + un párrafo | 6 + 31 palabras | 6 palabras + ≤ 30 |
| Banda | London Design Festival + párrafo + «Discover» | 3 + 28 a 37 + 1 | Título de 1 a 3 palabras, párrafo ≤ 30, enlace de 1 a 3 palabras |
| Tarjeta | Chainmail Chair (2021) · PANORAMMMA | título (año) + autor | Igual: «Campo 04 (2025)» · «ARTISTA A» |
| Ficha de obra (`/art`) | PHIL HALE · *Record Separator, 2010* · Oil on canvas · 63 x 63 in. / 160 x 160 cm · ENQUIRE | 5 líneas, sin descripción | Cartela de 6 líneas; la descripción, ≤ 30 palabras con «Leer más» |
| Ficha de producto | Read more · Dimensions · Made In · Add To Bag £3,800.00 · › Shipping & returns · Price on request | 1 a 3 palabras por rótulo | Rótulos y botones de 1 a 3 palabras |
| Cajón Enquire | Enquire · Close · Name · E-mail · SEND ENQUIRY | 1 a 2 palabras | Nombre · Correo · Mensaje · «Enviar consulta →», sin texto de ayuda |
| Diseñador | ABOUT · KOUROS MAGHSOUDI · 2 párrafos en tercera persona (Andu: 155 palabras; Apohli: 53) + citas | 53 a 155 | Bio ≤ 100 palabras en dos párrafos + statement ≤ 30 |
| Diseñador sin obras | No works currently listed. | 4 palabras | Estados vacíos en una línea |
| Índice de eventos | Título · fecha · dirección; los pasados, solo título y lugar | 2 líneas por evento | «Encuentro 006» + lugar |
| Página de evento | Título · fecha · dirección · bajada de 35 palabras · «← 01 / 15 →» | 35 | Bajada ≤ 30 |
| About | Dos párrafos justificados, sin título ni subtítulos | 79 + 90 | Titular + tres párrafos ≤ 45 cada uno |
| Página de soporte | Shipping & Returns · Last updated: August 27, 2026 · SHIPPING OVERVIEW · LEAD TIMES | H2 de 2 a 3 palabras | Igual en Créditos y en Cómo se compra |
| 404 | PAGE NOT FOUND · Sorry, we couldn't find the page you're looking for. | 3 + 10 | 4 + ≤ 8 |
| Pie | BE THE FIRST TO HEAR ABOUT NEW *OBJECTS*, *COLLECTIONS* AND *STUDIO* NEWS. · STUDIO · SUPPORT · SOCIAL | 13 + rótulos de 1 palabra | Titular de ≤ 10 palabras con tres en itálica; columnas de 1 palabra |

**Lo que Studio Iron no hace nunca:** explicar la interfaz, preguntar, exclamar, hablar en primera persona plural fuera de las páginas de soporte, poner rótulos sobre rótulos («01 · VISTA GENERAL»), escribir dos veces lo mismo en la misma pantalla.

**Medido contra la v2** (palabras visibles por página a 1440, cromo incluido; `medidas-*-1440.json`):

| Página | Studio Iron | v2 | v3 (estimado: lo medido en la v2 menos lo que este documento borra) |
|---|---|---|---|
| Artista | 158 | 372 | ≈ 230 (el texto de muestra baja de 221 a 97 palabras, §10.2) |
| Acerca | 258 | 282 | ≈ 190 |
| Encuentro | (LDF, con 20 fichas de producto) | 346 | ≈ 275 |
| Libro | 137 | 515 (437 en el primer viewport, casi todas números de casilla) | ≈ 120 + los números de casilla, ahora debajo de las fotos |
| Obras | 214 | 557 (abría en Lista) | ≈ 230 (abre en Muro) |

---

## 2 · Reglas de voz (las mismas de la v2, más tres nuevas)

- **Habla la galería**, en tercera persona («Módulo 369», «la galería», o impersonal); al visitante, de **tú**. Cero «nosotros», cero «usted». Única primera persona: el statement de cada artista.
- **Castellano de Chile** (correo, link, living) e **inglés británico de galería** (Enquire, colour, licence, Private collection, Price on request). No se traducen: Módulo 369, Encuentro, Libro, Mercado Pago, Amazon.
- **Sin Title Case, sin rayas largas ni medias, sin preguntas fuera del FAQ, sin exclamaciones.**
- **Cero cifras de precio y cero «$»** (P14). **Nada atribuido a María.** **Artista sin retrato y sin género**: «Artista A» es el sujeto; «los artistas» en plural genérico (el tercero todavía no existe).
- **Nada que suene a currículum**: sin nombres, ciudades, fechas, escuelas, exposiciones ni premios. Fechas de encuentro: estaciones del año.
- **Vocabulario de la declaración privada de María que no entra** (brief §5, copy-muestra §1): hallazgo, accidente, inesperado, estructura, acumulación, fragmento, repetición, vacío, gesto, disrupción, romper, escala, desplazado, fuera de lugar, orden, limpio, elegante, sorprender.
- **Nuevas en la v3:**
  1. **Ninguna frase existe solo porque es maqueta.** Eso lo dice el aviso general, una vez, y lo detalla Créditos y notas. Fuera de ahí, solo hablan de la maqueta los avisos que aparecen **al usar** algo simulado (brief §6) y la línea de Activar que exige el brief §3.
  2. **Botones y enlaces de 1 a 3 palabras**, como Studio Iron. Siguen completándose con «…y entonces pasa X».
  3. **Ningún texto describe una foto que todavía no existe.** Lo que depende de las fotos de Unsplash (descripciones de obra, `alt`, lugares de los registros, nombres de serie) se escribe en la segunda pasada, contra el manifiesto (§9).

---

## 3 · El aviso general (el único en pantalla) · spec 2.0.1, §13-1

| Slot | ES | EN | Medido |
|---|---|---|---|
| Rótulo (`.etiqueta`) | Maqueta | Mock-up | 69 px |
| Texto, ≥ 621 | Contenido de muestra; fotos de Unsplash. | Sample content; photos from Unsplash. | 232 / 217 px |
| Enlace, ≥ 621 | Créditos y notas | Credits and notes | 91 / 98 px |
| Texto, ≤ 620 | Contenido de muestra. | Sample content. | 127 / 90 px |
| Enlace, ≤ 620 | Créditos | Credits | 48 / 41 px |

- **Una línea en todos los anchos.** A 621, con «Lo editas tú · Retícula» a la derecha, quedan 277 px para el texto: «Obras, artistas, textos y datos de muestra; fotos de Unsplash.» mide 338 y salta a dos líneas hasta los 682 px de ventana. «Contenido» cubre obras, artistas, títulos, técnicas, medidas y textos; la lista completa está en Créditos (§6.16), a un toque. A 390: rótulo + texto + enlace + calles = 268 px de 366.
- **Se borró:** «se cambian por los reales» (lo dice Créditos), «de relleno» (sugiere código), la lista de cuatro sustantivos.

---

## 4 · Cromo

### 4.1 · Cabecera y menú

| Slot | ES | EN |
|---|---|---|
| Marca (enlace al inicio) | MÓDULO 369 | MÓDULO 369 |
| `aria-label` de la marca | Módulo 369, inicio | Módulo 369, home |
| Menú, en el orden del mapa de María | Artistas · Obras · Ediciones · Encuentro · Acerca de · Tienda · Contacto | Artists · Works · Editions · Encuentro · About · Shop · Contact |
| `aria-label` del menú | Principal | Main |
| Botón de dos rayas (`aria-label`) | Abrir menú · Cerrar menú | Open menu · Close menu |
| Subnivel a ≤ 1000 | Artistas › · ‹ Volver | Artists › · ‹ Back |
| Primera celda del panel y del subnivel | Todos los artistas | All artists |
| Barra inferior del menú (≤ 1000) | ES · EN · Lo editas tú · Retícula | ES · EN · What you edit · Grid |
| Idioma (`aria-label`) | Español · English | Español · English |
| Salto al contenido | Ir al contenido | Skip to content |

«Acerca de» es el nombre de la sección en el mapa de María; el ítem más largo del menú de 390 («ENCUENTRO», 236 px a 38) cabe en 366.

### 4.2 · Pie · spec 2.0.13

| Slot | ES | EN |
|---|---|---|
| Titular (tres palabras en `<em>`) | Consulta por una *obra*, una *edición* o un *encuentro*. | Enquire about a *work*, an *edition* or an *Encuentro*. |
| Enlace bajo el titular (a Contacto) | Escribir a Módulo 369 → | Write to Módulo 369 → |
| Columna 1 · rótulo y enlaces | **Galería** · Acerca de · Artistas · Encuentro | **Gallery** · About · Artists · Encuentro |
| Columna 2 | **Ayuda** · Cómo se compra · Contacto | **Help** · How to buy · Contact |
| Columna 3 | **Redes** · Instagram | **Social** · Instagram |
| Fila 3, izquierda | Módulo 369 · Galería de arte en línea | Módulo 369 · Online art gallery |
| Fila 3, derecha (enlace a `#/creditos`) | Créditos y notas de la maqueta | Mock-up credits and notes |

- **Columnas como las de Studio Iron** (STUDIO · SUPPORT · SOCIAL, tres enlaces como máximo): «Ayuda» es SUPPORT. **Cambia la v2**, que decía «Galería · Módulo 369 · Redes»: un rótulo «Módulo 369» dentro del sitio de Módulo 369 no orienta. «Cómo se compra» enlaza a esa sección de Tienda.
- «Instagram» va sin enlace mientras la cuenta no esté confirmada (§12-4).
- Medido: el titular mide 1.049 px a 37,44 (dos líneas en `c1-5`, como Studio Iron) y 655 a 24 (dos líneas a 390).

### 4.3 · Pestaña y metadatos

| Slot | ES | EN |
|---|---|---|
| `<title>` | {nombre de la vista} · Módulo 369 · maqueta | {view name} · Módulo 369 · mock-up |
| `<title>` del inicio | Módulo 369 · maqueta | Módulo 369 · mock-up |
| `<title>` de Créditos | Créditos y notas · Módulo 369 · maqueta | Credits and notes · Módulo 369 · mock-up |
| `og:title` | Módulo 369 · maqueta v3 | Módulo 369 · mock-up v3 |
| `og:description` | Propuesta de diseño. Contenido de muestra; fotos de Unsplash. | Design proposal. Sample content; photos from Unsplash. |

---

## 5 · Piezas compartidas

### 5.1 · Tarjeta de obra, de artista, de tienda

| Slot | ES | EN |
|---|---|---|
| Pie: título con año | Campo 04 (2025) | Field 04 (2025) |
| Pie: autor (`.t-autor`) | ARTISTA A | ARTIST A |
| Estado, segunda línea (solo si no está disponible) | VENDIDA · COLECCIÓN PRIVADA | SOLD · PRIVATE COLLECTION |
| Tarjeta de artista (Inicio): autor + conteo | ARTISTA A · 9 obras | ARTIST A · 9 works |

Series de muestra: A «Campo» / «Field», B «Recorte» / «Cut-out», C «Línea» / «Line». **Se confirman o cambian en la segunda pasada** (§9.3).

### 5.2 · Cartela de la ficha (spec 2.5) y sus cuatro estados (brief §4)

| # | Línea | ES | EN |
|---|---|---|---|
| 1 | Artista (enlace) | ARTISTA A | ARTIST A |
| 2 | H1 | Campo 04, 2025 | Field 04, 2025 |
| 3 | Descripción (dos líneas) + botón | {descripción, §9.1} · Leer más | {description, §9.1} · Read more |
| 4 | Técnica | Óleo sobre tela | Oil on canvas |
| 4 | Medidas (alto × ancho) | 120 × 90 cm | 120 × 90 cm |
| 4 | Disponibilidad | Disponible · Vendida · Colección privada | Available · Sold · Private collection |
| 4 | Precio, estado 1 y estado 2 con precio | Precio en pesos chilenos | Priced in Chilean pesos |
| 4 | Precio, estado 2 sin precio | Precio a consultar | Price on request |
| 5 | Botón-fila, estado 1 | Comprar · Mercado Pago → | Buy · Mercado Pago → |
| 5 | Botón-fila, estados 2, 3 y 4 | Consultar · → | Enquire · → |
| 6 | Bajo la fila, solo estado 1 (enlace de acción) | Consultar | Enquire |
| 7 | `<details>` | › Cómo se compra | › How to buy |

- **«Consultar», no «Consultar por esta obra».** Es la palabra del brief §4 y el «Enquire» de Studio Iron; dentro de la ficha de una obra, «por esta obra» sobra. Se completa igual: …y entonces vas a Contacto con la obra cargada.
- **La línea de precio** reemplaza a «CLP ···» y a su marca: dice lo que hay (la obra tiene precio, en pesos) sin cifra ni glifo de hueco. Se lee como un dato de cartela, no como una nota de maqueta. El estado 1 sigue distinguiéndose del 2 por su botón Comprar.
- **Sale** la fila numerada «01 · Vista general / 02 · Detalle» (P30) y toda la navegación anterior / siguiente (spec 2.5.2).

**Contenido de «› Cómo se compra»** (ficha):

| ES | EN |
|---|---|
| Cada obra se paga en Mercado Pago, con el botón Comprar de su ficha; no hay carrito. Si la obra no tiene ese botón, o prefieres conversarlo antes, usa Consultar. | Each work is paid for through Mercado Pago, with the Buy button on its page; there is no cart. If a work has no Buy button, or you would rather talk first, use Enquire. |

**Imágenes de la ficha:**

| Slot | ES | EN |
|---|---|---|
| Rótulo bajo un detalle (`.t-detalle`) | Detalle | Detail |
| Segmentos a ≤ 1000 (`aria-label`) | Vista general · Detalle · En su espacio · Otro detalle | Full view · Detail · In situ · Another detail |
| `aria-label` de la pista | Imágenes de la obra | Images of the work |

### 5.3 · Filtros de Obras (spec 2.4)

| Slot | ES | EN |
|---|---|---|
| Celdas de artista (sin rótulo de grupo) | Todos los artistas · Artista A · Artista B · Artista C | All artists · Artist A · Artist B · Artist C |
| Técnica | Técnica · Todas · Óleo · Acrílico · Collage · Recortado · Tinta · Grafito | Medium · All · Oil · Acrylic · Collage · Cut paper · Ink · Graphite |
| Tamaño | Tamaño · Todos · Hasta 50 cm · De 50 a 100 cm · Más de 100 cm | Size · All · Up to 50 cm · 50 to 100 cm · Over 100 cm |
| Disponibilidad | Disponibilidad · Todas · Disponible · Vendida · Colección privada | Availability · All · Available · Sold · Private collection |
| Conteo (`aria-live`) | 27 obras · 1 obra · 0 obras | 27 works · 1 work · 0 works |
| Vista | Muro · Lista | Wall · List |
| Botón plegado a ≤ 620 | Filtrar | Filter |
| Quitar | Quitar filtros | Clear filters |
| Estado vacío (Albert 14 gris) | No hay obras con estos filtros. | No works match these filters. |
| Lista: botón contorno | Ver la obra | View work |
| `aria-label` del formulario | Filtros | Filters |

- **Sale** «(lado mayor)» del rótulo de Tamaño: Studio Iron no explica sus filtros y las tres opciones se entienden solas.
- Las opciones de Técnica cambian si la segunda pasada cambia las técnicas (§9.3).

### 5.4 · Formularios (Contacto y Activar)

| Slot | ES | EN |
|---|---|---|
| Nombre | Nombre | Name |
| Correo | Correo | Email |
| Mensaje (Contacto) | Mensaje | Message |
| Campo opcional de Activar | Sobre tu encuentro (opcional) | About your Encuentro (optional) |
| Ayuda bajo ese campo | Dónde piensas abrir la caja y con quién. | Where you plan to open the box, and who with. |
| Botón lleno, Contacto | Enviar consulta → | Send enquiry → |
| Botón lleno, Activar | Enviar solicitud → | Send request → |
| Chip de obra cargada | {Campo 04, 2025} · {ARTISTA A} · Quitar | {Field 04, 2025} · {ARTIST A} · Remove |
| Error: nombre vacío | Falta tu nombre. | Please add your name. |
| Error: correo vacío | Falta tu correo. | Please add your email. |
| Error: correo mal escrito | Revisa el correo: le falta la @ o lo que va después. | Check the email address: it needs an @ and a domain. |
| Error: mensaje vacío | Escribe tu mensaje. | Please write your message. |

**Sale** «Aquí llega la respuesta.» bajo el correo: el cajón Enquire de Studio Iron no lleva ayuda y el campo se entiende solo. Los errores se quedan: dicen cómo arreglarlo.

### 5.5 · Avisos al usar algo simulado (brief §6; no están en pantalla en reposo)

| Disparador | ES | EN |
|---|---|---|
| Comprar (obra) | Maqueta: aquí se abre el link de Mercado Pago de esta obra. | Mock-up: this is where the work's Mercado Pago link opens. |
| Comprar (caja, Activar opción 2) | Maqueta: aquí se abre el link de Mercado Pago de la caja, si se vende. | Mock-up: this is where the box's Mercado Pago link opens, if it is sold. |
| Comprar · Amazon (Edición) | Maqueta: aquí se abre esta edición en Amazon, en español. | Mock-up: this is where this edition opens on Amazon, in English. |
| Edición en el otro idioma | Maqueta: aquí se abre la edición en inglés, en Amazon. | Mock-up: this is where the Spanish edition opens, on Amazon. |
| Enviar consulta | Maqueta: no se envió nada. En el sitio, el mensaje llega al correo de Módulo 369. | Mock-up: nothing was sent. On the live site, the message goes to the Módulo 369 inbox. |
| Enviar solicitud | Maqueta: no se envió nada. En el sitio, la solicitud llega al correo de Módulo 369. | Mock-up: nothing was sent. On the live site, the request goes to the Módulo 369 inbox. |

Una frase cada uno (la v2 traía dos, con «Al marcarla vendida, desaparece», que ahora vive solo en la capa «Lo editas tú»). «Maqueta:» con dos puntos, no «Maqueta ·»: es la palabra que dice que no pasó nada real, y no es un rótulo en reposo (P24).

---

## 6 · Vista por vista

Texto **fijo** = interfaz (Clara; lo traduce SpindleLab). Texto **de muestra** = lo que en el sitio escriben María o cada artista; va con `.pendiente` (gancho de «Lo editas tú») y **sin ninguna marca**. Los conteos de palabras están hechos con script (§10.2).

### 6.1 · Inicio `/` · única acción: abrir la obra del carrusel

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 (solo lectores) | fijo | Módulo 369 | Módulo 369 |
| Carrusel (`aria-label`, `aria-roledescription`) | fijo | Obras destacadas · carrusel | Selected works · carousel |
| Lámina (`aria-label`) | fijo | 1 de 3 | 1 of 3 |
| Línea de pie: título y autor | fijo | Campo 04 (2025) · ARTISTA A | Field 04 (2025) · ARTIST A |
| Controles | fijo | ← · 01 / 03 · → | ← · 01 / 03 · → |
| Flechas (`aria-label`) | fijo | Obra anterior · Obra siguiente | Previous work · Next work |
| Enunciado, H2 (punto final en cobalto) | muestra | De cada artista, la serie entera. | From each artist, the whole series. |
| Enunciado, párrafo (29 palabras) | muestra | Módulo 369 es una galería de arte en línea. Trabaja con pocos artistas y publica su obra cuando cada serie está terminada, con todas las piezas y sus datos. | Módulo 369 is an online art gallery. It works with a small number of artists and publishes their work once each series is finished, with every piece and its details. |
| Tira 1: título (enlace a Obras) | fijo | Todas las obras | All works |
| Banda Encuentro: rótulo (gris) | muestra | 007/369 | 007/369 |
| Banda Encuentro: título | fijo | Encuentro | Encuentro |
| Banda Encuentro: párrafo (28 palabras) | muestra | Una caja numerada del 001 al 369, con materiales para armar algo donde y con quien quieras. Cada caja se activa una vez y queda en el Libro. | A box numbered 001 to 369, with materials to make something wherever and with whoever you like. Each box is activated once and goes into the Libro. |
| Banda Encuentro: enlace | fijo | Qué es Encuentro | About Encuentro |
| Palabra casi escondida (enlace) | fijo | Libro | Libro |
| Tira 2: título | fijo | Artistas | Artists |
| Banda Ediciones: título | fijo | Ediciones | Editions |
| Banda Ediciones: párrafo | muestra | `ediciones.presentacion` (§6.6), tal cual | |
| Banda Ediciones: enlace | fijo | Ver las ediciones | See the editions |
| Tiras: flechas (`aria-label`, en un grupo con el título) | fijo | Anterior · Siguiente | Previous · Next |

- **El enunciado se queda** (pasa el test de intercambio: una galería de piezas sueltas no lo puede decir; medido: tres líneas a 390, dos a 1440). **El párrafo cambia:** sale «en español y en inglés», que describe el sitio y no la galería, y deja de repetir «serie entera». Es la primera parte de Acerca (6.12), así que María escribe un texto para los dos lugares, como Studio Iron repite el suyo en About.
- **La tira de obras se titula «Todas las obras»**, como «ALL OBJECTS» de Studio Iron y como el H1 de Obras (6.4): un concepto, un nombre.
- **Sale «007/369 · activados de muestra»**: el número solo, en gris, como rótulo de banda.

### 6.2 · Artistas `/artistas/` · única acción: entrar a un artista

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 (`.t-mayuscula`) | fijo | Artistas de Módulo 369 | Módulo 369 artists |
| Nombre bajo cada foto | fijo | ARTISTA A | ARTIST A |
| Visión curatorial, bajo la grilla (21 palabras) | muestra | Los artistas de Módulo 369 vienen de medios distintos y comparten una forma de trabajar: en series largas, hechas con tiempo. | The artists of Módulo 369 come from different media and share a way of working: in long series, made over time. |

- **H1 con frase, como «SELECTED STUDIO IRON ARTISTS»** (medido: 322 px a 26, una línea a 390; 446 a 36). Dice de quién son estos artistas sin explicar nada. Si Lucía prefiere el rótulo solo, «Artistas» / «Artists».
- **Visión curatorial de 48 a 21 palabras.** Sale «La galería espera a que cada serie esté terminada…», que ya dicen el enunciado y Acerca.

### 6.3 · Artista `/artistas/<a>/` · única acción: abrir una obra

**Texto fijo de la vista:**

| Slot | ES | EN |
|---|---|---|
| H1 (itálica, sobre la foto a ≥ 1001) | Artista A | Artist A |
| Rótulo del bloque partido (`.etiqueta-ancha`) | Acerca de | About |
| Nombre en el bloque (`.t-mayuscula`) | ARTISTA A | ARTIST A |
| Rótulo bajo el detalle de B y C | Detalle | Detail |
| Enlace al siguiente, bajo el statement | Artista B → (de C vuelve a A) | Artist B → |
| `aria-label` de la sección del statement | Statement | Statement |

**«Acerca de», no «Sobre la artista»** (spec 2.3 y §13-7): es el «ABOUT» que Studio Iron pone sobre el nombre en Kouros Maghsoudi, se lee completo con el nombre debajo («ACERCA DE / ARTISTA A») y no le pone género a un artista que todavía no existe (el tercero, `BRIEF.md`). Sale «Biografía» y sale «Historia y proceso» como subtítulo: el proceso es el segundo párrafo.

**Texto de muestra, por artista** (statement ≤ 30 palabras, en primera persona; bio en dos párrafos, tercera persona: el primero, quién es y cómo trabaja; el segundo, el proceso. **Escritos contra la técnica de la spec §4, no contra una foto**: no nombran colores, composición ni cantidad de piezas, así resisten cualquier serie que cumpla R6 a R8; lo que hay que confirmar con las fotos está en §9.2).

**Artista A · pintura** (97 palabras en total)

| Slot | ES | EN |
|---|---|---|
| Statement (25) | Pinto por capas y casi siempre tapo más de lo que dejo. Lo que se ve es la última decisión; debajo están todas las anteriores. | I paint in layers and nearly always cover more than I keep. What you see is the last decision; all the earlier ones are underneath. |
| Bio, párrafo 1 (41) | Artista A estudió pintura y trabajó varios años preparando telas en talleres de otros pintores. Hoy pinta al óleo y al acrílico, en series de nueve a doce cuadros que avanzan en paralelo y que no muestra hasta que están terminadas. | Artist A studied painting and spent several years preparing canvases in other painters' studios. Artist A now paints in oil and acrylic, in series of nine to twelve canvases developed side by side and not shown until they are finished. |
| Bio, párrafo 2 · proceso (31) | Cada cuadro parte de una base de color. Encima vienen las capas, con pincel o espátula, cada una seca antes de la siguiente; muchas terminan tapadas. Un cuadro puede llevar semanas. | Each painting starts from a ground of colour. The layers go on top, by brush or palette knife, each one dry before the next; many end up covered. A painting can take weeks. |

**Artista B · collage** (111 palabras)

| Slot | ES | EN |
|---|---|---|
| Statement (27) | Corto y rasgo el papel a mano. Muevo cada pieza muchas veces sobre la hoja antes de pegarla y, una vez pegada, no la vuelvo a tocar. | I cut and tear the paper by hand. I move each piece around the sheet many times before gluing it, and once it is glued I leave it alone. |
| Bio, párrafo 1 (39) | Artista B viene del diseño gráfico y lleva años dedicado solo al collage. Trabaja con papeles de color plano y papeles viejos que guarda por tono, sobre cartón o papel grueso, en formatos que rara vez pasan del metro. | Artist B comes from graphic design and has worked only in collage for years, with flat-coloured papers and old papers kept by tone, on card or heavy paper, in formats that rarely go beyond a metre. |
| Bio, párrafo 2 · proceso (45) | Una serie empieza con una jornada entera de corte. Después viene la mesa: las piezas se prueban, se cambian de lugar y se pegan de arriba hacia abajo. Antes de firmarla, cada obra pasa una semana bajo peso para que el papel no se ondule. | A series starts with a whole day of cutting. Then comes the table: pieces are tried, moved around and glued from top to bottom. Before it is signed, each work spends a week under weights so the paper does not cockle. |

**Artista C · tinta** (90 palabras)

| Slot | ES | EN |
|---|---|---|
| Statement (20) | Dibujo con tinta, directo sobre el papel y sin boceto. La primera línea decide el dibujo; las demás le responden. | I draw in ink, straight onto the paper, with no sketch. The first line decides the drawing; the others answer it. |
| Bio, párrafo 1 (33) | Artista C estudió arquitectura y dibujó planos a mano durante años antes de dedicarse al dibujo. Trabaja con tinta negra, pincel y agua sobre papel de buen gramaje, en formatos chicos y medianos. | Artist C studied architecture and spent years drawing plans by hand before turning to drawing. Artist C works in black ink, brush and water on heavy paper, in small and mid-size formats. |
| Bio, párrafo 2 · proceso (37) | Antes de empezar, humedece el papel, lo estira sobre una tabla y lo deja secar un día. Cada dibujo se hace en una sola sesión; si no funciona, no se corrige: se guarda y se empieza otro. | Before starting, Artist C dampens the paper, stretches it on a board and leaves it to dry for a day. Each drawing is made in one sitting; if it does not work, it is not corrected but put away, and another is begun. |

- **De 183 palabras de bio e historia por artista a 75 en promedio** (en Studio Iron, la bio de Andu Masebo tiene 155 palabras y la de Apohli, 53). Con statement, rótulos, pies de tarjeta y cromo, la página de la artista baja de 372 palabras visibles a unas 230 (§1).
- **Se borró la plantilla que repetían las tres bios de la v2** (oficio de origen → «de ese tiempo le quedaron X, Y y la costumbre de Z» → taller con un detalle de luz → hábito de guardar): las tres tenían el mismo esqueleto, y tres textos con la misma forma son el olor más claro a texto generado. Ahora cada una tiene una forma propia y una sola anécdota, y ninguna tiene «luz pareja», cera, regla metálica ni cajonera.
- La bio en inglés repite «Artist A» en vez de usar pronombre (sin género), como en la v2.

### 6.4 · Obras `/obras/` · única acción: abrir una obra

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 (`.t-mayuscula`) | fijo | Todas las obras | All works |
| Conteo, filtros, vista, estado vacío, Lista | fijo | §5.3 | §5.3 |
| Tarjetas | fijo | §5.1 | §5.1 |

**«Todas las obras», no «Obras»**: es el «ALL OBJECTS» de Studio Iron (la página que se pone lado a lado, T03), el menú dice «Obras» y la página dice qué hay en ella. Medido: 226 px a 26 (una línea a 390). En la v2 lo había descartado por repetir el rótulo; al lado de la referencia, se lee como catálogo.

### 6.5 · Ficha de obra `/obras/<o>/` · única acción: la de su estado

Todo en §5.2. Obras de muestra por estado: sin cambio (spec 2.5.1).

### 6.6 · Ediciones `/ediciones/` · única acción: abrir una edición

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 | fijo | Ediciones | Editions |
| `ediciones.presentacion` (24 palabras; también en la banda del Inicio) | muestra | Cuadernos y libros con obra de los artistas de Módulo 369. Se imprimen a pedido y se venden en Amazon, en español y en inglés. | Notebooks and books featuring work by the Módulo 369 artists, printed on demand and sold on Amazon in Spanish and English. |
| Pie de tapa | fijo | Edición 01 · CUADERNO / LIBRO | Edition 01 · NOTEBOOK / BOOK |
| `alt` de la franja de interiores | fijo | Interior de la Edición 01 | Inside pages of Edition 01 |

### 6.7 · Edición `/ediciones/<e>/` · única acción: ir a Amazon, en el idioma de la página

| Slot | Tipo | ES | EN |
|---|---|---|---|
| Volver (enlace de acción) | fijo | ← Ediciones | ← Editions |
| Tipo (`.etiqueta`) | fijo | CUADERNO / LIBRO | NOTEBOOK / BOOK |
| H1 | fijo | Edición 01 | Edition 01 |
| Emisor | fijo | MÓDULO 369 | MÓDULO 369 |
| Descripción + botón | muestra | (abajo) · Leer más | (below) · Read more |
| Páginas | muestra | 120 páginas | 120 pages |
| Formato | muestra | Tapa blanda · 14 × 21,6 cm | Paperback · 14 × 21.6 cm |
| Botón-fila | fijo | Comprar · Amazon → | Buy · Amazon → |
| Enlace al otro idioma | fijo | Edición en inglés → | Spanish edition → |
| Segmentos (`aria-label`) | fijo | Tapa · Interior · Las tres ediciones | Cover · Inside · The three editions |

**Descripciones** (≤ 30 palabras; sin el material de la tapa, que lo dice la foto; se revisan contra `ED-n` y `ED-ni`, §9.2):

| Edición | ES | EN | Págs. · formato |
|---|---|---|---|
| 01 · Cuaderno (28) | Cuaderno de hojas lisas, con cuatro láminas a color de obras de Artista A repartidas entre las páginas. Tapa blanda, del tamaño justo para llevar en un bolso. | A notebook of plain pages, with four colour plates of work by Artist A spread through it. Softcover, sized to carry in a bag. | 120 · Tapa blanda · 14 × 21,6 cm |
| 02 · Cuaderno (24) | Cuaderno con una cuadrícula de puntos apenas marcada, para escribir o dibujar a mano. Abre con una obra de Artista B y sus datos. | A notebook with a faint dot grid, for writing or drawing by hand. It opens with a work by Artist B and its details. | 160 · Tapa blanda · 15,2 × 22,9 cm |
| 03 · Libro (22) | Libro de tapa dura con nueve obras de cada uno de los tres artistas con que parte Módulo 369, con sus datos. | A hardcover book with nine works by each of the three artists Módulo 369 starts with, and their details. | 96 · Tapa dura · 21 × 28 cm |

**Sale** «01 · Portada / 02 · Interior / 03 · Interior» (P30) y el nombre de una obra concreta en 01 y 02 («Campo 03», «Recorte 07»): la foto de un cuaderno de Unsplash no va a mostrar esa obra.

### 6.8 · Encuentro `/encuentro/` · única acción: activar un encuentro

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 (itálica, sobre la foto a ≥ 1001) | fijo | Encuentro | Encuentro |
| Intro, párrafo 1 | muestra | Encuentro es una caja. Hay 369, numeradas del 001 al 369, y cada una se activa una sola vez. | Encuentro is a box. There are 369, numbered 001 to 369, and each one is activated only once. |
| Intro, párrafo 2 | muestra | Adentro vienen materiales para armar algo, donde y con quien quieras. Lo que pasa con la caja es el encuentro. | Inside are materials to make something, wherever and with whoever you like. Whatever happens with the box is the Encuentro. |
| Intro, párrafo 3 | muestra | Cada encuentro activado queda en el Libro, con su número, una foto y el lugar donde ocurrió. | Every activated Encuentro goes into the Libro, with its number, a photo and the place where it happened. |
| Contador: rótulo (gris) | fijo | Encuentros activados | Activated Encuentros |
| Contador | muestra | 007/369 | 007/369 |
| Contador (`aria-label`) | fijo | 7 de 369 encuentros activados | 7 of 369 Encuentros activated |
| Enlace vertical | fijo | Libro → | Libro → |
| Enlace vertical (`aria-label`) | fijo | Libro: el registro de los encuentros activados | Libro: the record of activated Encuentros |
| Bloque 1: categoría · título | fijo | ENCUENTRO · *Cómo funciona* | ENCUENTRO · *How it works* |
| Bloque 1: texto (38) | muestra | Pides o compras la caja y llega con su número. La abres cuando quieras. Al terminar envías una foto y unas líneas, y el encuentro aparece en el Libro con su número, la fecha y un lugar aproximado. | You request or buy the box and it arrives with its number. Open it whenever you like. Afterwards you send a photo and a few lines, and the Encuentro appears in the Libro with its number, the date and an approximate location. |
| Bloque 2: categoría · título | fijo | ENCUENTRO · *Formas de activación* | ENCUENTRO · *Ways to activate* |
| Bloque 2: texto (30) | muestra | A solas o entre varias personas, en una casa, un taller o al aire libre. También se puede pedir para regalar: llega a nombre de quien la va a abrir. | Alone or with several people, at home, in a studio or outdoors. It can also be requested as a gift: it arrives in the name of the person who will open it. |
| Bloque 2: botón contorno | fijo | Activar un encuentro | Activate an Encuentro |
| H2 de las preguntas | fijo | Preguntas frecuentes | Frequently asked questions |
| Botón-fila final | fijo | Activar un encuentro · → | Activate an Encuentro · → |

**Preguntas frecuentes** (muestra, tres `<details>` cerrados; las preguntas son contenido, por eso llevan «¿?»):

| Pregunta ES | Respuesta ES | Question EN | Answer EN |
|---|---|---|---|
| ¿Hace falta saber de arte? | No. La caja trae los materiales y unas indicaciones breves; lo demás lo pone quien la abre. | Do I need to know about art? | No. The box holds the materials and a few short instructions; the rest is up to whoever opens it. |
| ¿Cuánto dura un encuentro? | Lo que tú quieras: una tarde o varios días. La caja no vence. | How long does an Encuentro last? | As long as you like: an afternoon or several days. The box does not expire. |
| ¿Puede haber dos cajas con el mismo número? | No. Cada número, del 001 al 369, existe una sola vez. | Can two boxes have the same number? | No. Each number, from 001 to 369, exists only once. |

- **De 145 a 56 palabras en la intro** (Studio Iron LDF: tres párrafos cortos centrados). «Qué es», «Cómo funciona» y «Formas de activación» de la v2 se repartían lo mismo tres veces; ahora la intro dice qué es, y los dos bloques dicen cómo se usa y de qué formas.
- **Sale la nota «Maqueta · Por decidir: quién sube cada registro…»** (pasa a Créditos, §6.16) y la presentación de las preguntas (desvío 93: no hace falta).

### 6.9 · Activar `/encuentro/activar/` · única acción: enviar la solicitud o comprar la caja

| Slot | Tipo | ES | EN |
|---|---|---|---|
| Volver | fijo | ← Encuentro | ← Encuentro |
| H1 (`.t-recta`) | fijo | Activar un encuentro | Activate an Encuentro |
| Línea bajo el H1 (`--t-dato` gris; brief §3 y §9-4) | fijo | Por decidir: pedir la caja o comprarla. | To be decided: request the box or buy it. |
| Proceso: rótulo · texto (27) | fijo · muestra | Proceso · Envías la solicitud o pagas la caja. Módulo 369 te escribe para coordinar la entrega. Después del encuentro, respondes ese correo con una foto y unas líneas. | Process · You send the request or pay for the box. Módulo 369 writes to you to arrange delivery. After the Encuentro, you reply to that email with a photo and a few lines. |
| Qué recibes (20) | fijo · muestra | Qué recibes · La caja con su número, entre 001 y 369, los materiales para el encuentro y una hoja con indicaciones breves. | What you receive · The box with its number, between 001 and 369, the materials for the Encuentro and a sheet of short instructions. |
| Tiempos (20) | fijo · muestra | Tiempos · El plazo de entrega depende de dónde estés y se confirma por correo. Para abrir la caja no hay plazo. | Timing · Delivery time depends on where you are and is confirmed by email. There is no deadline for opening the box. |
| Registro fotográfico (38) | fijo · muestra | Registro fotográfico · Una foto horizontal y dos o tres líneas. En el Libro se publican con el número de la caja, la fecha y un lugar aproximado, nunca una dirección. Quienes aparezcan en la foto tienen que estar de acuerdo. | Photo record · A landscape photo and two or three lines. In the Libro they appear with the box number, the date and an approximate location, never an address. Anyone in the photo needs to agree to it. |
| Opción 1: categoría · título | fijo | Opción 1 · Pedir la caja | Option 1 · Request the box |
| Opción 1: formulario | fijo | §5.4 (Nombre, Correo, Sobre tu encuentro, Enviar solicitud →) | §5.4 |
| Opción 2: categoría · título | fijo | Opción 2 · Comprar la caja | Option 2 · Buy the box |
| Opción 2: precio | fijo | Precio en pesos chilenos | Priced in Chilean pesos |
| Opción 2: botón-fila | fijo | Comprar · Mercado Pago → | Buy · Mercado Pago → |

- **La línea de «por decidir» es la única frase de maqueta en una vista en reposo** (spec 10.3): ocho palabras, sin «Maqueta ·». Medido: 224 px a 13, una línea a 390.
- **Sale «El registro aparece en el Libro después de que Módulo 369 lo revise»** de Tiempos (la revisión es una regla de María que no conocemos); el permiso de las personas en la foto se queda, en una frase.

### 6.10 · Libro `/encuentro/libro/` · única acción: abrir un encuentro

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 | fijo | Libro | Libro |
| Bajada | fijo | El registro de cada encuentro activado. | The record of every activated Encuentro. |
| Fila (`.etiqueta` gris) | muestra | 7 de 369 activados | 7 of 369 activated |
| Volver | fijo | ← Encuentro | ← Encuentro |
| Destacado: título · fila | muestra | Encuentro 007 · Primavera · Una biblioteca de barrio | Encuentro 007 · Spring · A neighbourhood library |
| Pares: título · lugar | muestra | Encuentro 006 · Junto a una ventana | Encuentro 006 · By a window |
| Rótulo del mapa | fijo | Las 369 posiciones | The 369 positions |
| Mapa (`aria-label`) | fijo | 369 posiciones, 7 activadas | 369 positions, 7 activated |
| Casilla activa (`aria-label`) | fijo | Encuentro 001 | Encuentro 001 |

**Sale** «Activados: 7 de 369 · los 7 son de muestra», «LOS 7 SON DE MUESTRA», «, de muestra» en el mapa y en cada casilla, y el aviso «Maqueta · En el sitio, mientras no haya…» (pasa a Créditos). La bajada sigue siendo texto fijo: orienta, sobre todo en inglés, donde «Libro» no se traduce.

### 6.11 · Encuentro activado `/encuentro/libro/<nnn>/` · única acción: volver al Libro

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 | fijo | Encuentro 001 | Encuentro 001 |
| Fila (`.etiqueta`) | muestra | 001/369 · Verano · Una mesa de cocina | 001/369 · Summer · A kitchen table |
| Fila para lectores (el número visible va `aria-hidden`) | fijo | Encuentro 001 de 369 | Encuentro 001 of 369 |
| Bajada | muestra | (tabla de abajo) | (below) |
| Título de la galería | fijo | Otros encuentros del Libro | Other Encuentros in the Libro |
| Paginación | fijo | ← 01 / 06 → | ← 01 / 06 → |
| Flechas (`aria-label`) | fijo | Encuentro anterior · Encuentro siguiente | Previous Encuentro · Next Encuentro |
| Volver | fijo | ← Libro | ← Libro |

**Los siete registros de muestra** (fecha = estación del año, sin día ni año: brief §6; lugar sin ciudad; bajada ≤ 25 palabras; **el lugar se confirma contra la foto `R-nnn`**, §9.2):

| Nº | Fecha ES / EN | Lugar ES / EN | Bajada ES | Bajada EN |
|---|---|---|---|---|
| 001 | Verano / Summer | Una mesa de cocina / A kitchen table | Tres personas abrieron la caja después de almorzar y armaron todo sobre la mesa. Lo dejaron ahí hasta la noche. | Three people opened the box after lunch and set everything out on the table. They left it there until night. |
| 002 | Otoño / Autumn | Un taller compartido / A shared studio | La caja pasó de mano en mano durante el día. Cada persona trabajó un rato y se la dejó a la siguiente. | The box passed from hand to hand through the day. Each person worked on it for a while and left it for the next. |
| 003 | Otoño / Autumn | Un patio / A courtyard | Una sola persona, al sol, durante toda una mañana. | One person, in the sun, for a whole morning. |
| 004 | Invierno / Winter | Un living / A living room | Dos personas trabajaron en el suelo, con los materiales repartidos alrededor, antes de una comida con amigos. | Two people worked on the floor, with the materials spread around them, before dinner with friends. |
| 005 | Invierno / Winter | Una oficina, fuera de horario / An office, after hours | Cinco personas de una misma oficina la abrieron en la sala de reuniones. Lo que armaron estuvo en la pared hasta el lunes. | Five people from the same office opened it in the meeting room. What they made stayed on the wall until Monday. |
| 006 | Primavera / Spring | Junto a una ventana / By a window | Dos hermanos que no se veían hace tiempo la abrieron juntos. Les tomó la tarde entera. | Two siblings who had not seen each other for a while opened it together. It took them the whole afternoon. |
| 007 | Primavera / Spring | Una biblioteca de barrio / A neighbourhood library | Un grupo de lectura dedicó su sesión a la caja. Lo que armaron quedó una semana en la entrada. | A reading group gave its session over to the box. What they made stayed at the entrance for a week. |

- **Estaciones en vez de «Un sábado por la tarde»**: en la fila en mayúsculas («001/369 · VERANO · UNA MESA DE COCINA», 299 px) se lee como el dato de un registro, no como el comienzo de un cuento, y sigue sin ser una fecha real.
- **Sale** «De muestra» de la fila y «Pidió que la foto no mostrara su cara» del 003 (la regla R3 ya garantiza que no hay caras). Los lugares calzan con las escenas que pide la spec §4.2-10 (mesa de cocina, piso de madera, patio, mesa de trabajo, ventana), para que la foto y el texto se encuentren.

### 6.12 · Acerca `/acerca/` · única acción: ir a Artistas

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 (solo lectores) | fijo | Acerca de Módulo 369 | About Módulo 369 |
| Titular visible (`--t-enunciado` a 36) | muestra | De cada artista, la serie entera. | From each artist, the whole series. |
| Párrafo 1 · qué es y su criterio (46) | muestra | Módulo 369 es una galería de arte en línea. Trabaja con pocos artistas y publica su obra cuando cada serie está terminada, con todas las piezas y sus datos. Elige a sus artistas por la constancia del trabajo más que por el medio o la trayectoria. | Módulo 369 is an online art gallery. It works with a small number of artists and publishes their work once each series is finished, with every piece and its details. It chooses its artists for the consistency of their work rather than their medium or track record. |
| Párrafo 2 · la acción (27) | muestra | Antes de publicar, la galería mira la serie completa en el taller, selecciona las obras que se sostienen juntas y decide con cada artista cuáles quedan disponibles. | Before publishing, the gallery looks at the whole series in the studio, selects the works that hold together and decides with each artist which ones are available. |
| Párrafo 3 · la visión (37) | muestra | Módulo 369 parte con tres artistas y va a crecer de a poco. Junto a las obras edita cuadernos y libros, y lleva adelante Encuentro: 369 cajas numeradas que salen de la galería y vuelven como registro. | Módulo 369 starts with three artists and will grow slowly. Alongside the works it publishes notebooks and books, and runs Encuentro: 369 numbered boxes that leave the gallery and come back as a record. |
| Enlace de acción | fijo | Ver los artistas → | See the artists → |

- **El titular es el enunciado del Inicio**, como Studio Iron repite «a new era of design» en About; el párrafo 1 empieza con el párrafo del Inicio tal cual. María escribe un enunciado y un párrafo, y sirven en los dos lugares.
- **De 4 párrafos y 3 subtítulos (186 palabras de muestra) a titular y 3 párrafos (110).** Mirar, seleccionar y decidir van en prosa en el párrafo 2 (spec 2.12), sin rótulo ni itálica; son la serie de tres de esta página, y es contenido de su mapa, no ritmo. Ningún párrafo habla de María.

### 6.13 · Tienda `/tienda/` · única acción: ir a una obra disponible

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 | fijo | Tienda | Shop |
| Opciones | fijo | Todo · Obras · Encuentro · Ediciones | All · Works · Encuentro · Editions |
| Conteo | fijo | 7 piezas · 1 pieza | 7 pieces · 1 piece |
| Tarjeta de obra: pie · vía · botón | fijo | Campo 01 (2025) · ARTISTA A · MERCADO PAGO · Ver la obra | Field 01 (2025) · ARTIST A · MERCADO PAGO · View work |
| Tarjeta de la caja | fijo | Caja de Encuentro · MÓDULO 369 · POR DECIDIR · Activar un encuentro | Encuentro box · MÓDULO 369 · TO BE DECIDED · Activate an Encuentro |
| Tarjeta de edición | fijo | Edición 01 · MÓDULO 369 · AMAZON · Ver la edición | Edition 01 · MÓDULO 369 · AMAZON · See the edition |
| Estado vacío | fijo | No hay piezas en esta categoría. · Ver todo | Nothing in this category. · See all |
| Rótulo de la sección de compra | fijo | Cómo se compra | How to buy |
| H2 · texto: Obras | fijo | Obras · Cada obra se paga en Mercado Pago, desde el botón Comprar de su ficha. No hay carrito: se compra una obra a la vez. | Works · Each work is paid for through Mercado Pago, from the Buy button on its page. There is no cart: works are bought one at a time. |
| H2 · texto: Consultas | fijo | Consultas · Si una obra no tiene botón Comprar, o prefieres conversarlo antes, usa Consultar en su ficha o escribe desde Contacto. | Enquiries · If a work has no Buy button, or you would rather talk first, use Enquire on its page or write from Contact. |
| H2 · texto: Encuentro | fijo | Encuentro · La caja se pide o se compra en Activar un encuentro. | Encuentro · The box is requested or bought on Activate an Encuentro. |
| H2 · texto: Ediciones | fijo | Ediciones · Cada edición se compra en Amazon, en español o en inglés, desde su página. | Editions · Each edition is bought on Amazon, in Spanish or English, from its own page. |

- **Los botones de las tarjetas llevan a la página de cada pieza** («Ver la obra», «Activar un encuentro», «Ver la edición»), como «ENQUIRE» y «VIEW» de Studio Iron, en vez de disparar avisos desde la grilla: los avisos de compra viven donde se compra (§5.5). Es la única acción de la vista (brief §3).
- **El criterio del brief §7 se cumple en «Obras»:** dice cómo se compra y que no hay carrito, en la voz de la galería. El aviso de la v2 sobre el carrito como servicio aparte pasa a Créditos.

### 6.14 · Contacto `/contacto/` · única acción: enviar la consulta

| Slot | Tipo | ES | EN |
|---|---|---|---|
| H1 (`.t-recta`) | fijo | Contacto | Contact |
| Chip y campos | fijo | §5.4 | §5.4 |
| Fila de datos 1 | fijo · muestra | CORREO · hola@modulo369.com | EMAIL · hola@modulo369.com |
| Fila de datos 2 | fijo · muestra | INSTAGRAM · @modulo369 | INSTAGRAM · @modulo369 |
| `aria-label` del formulario | fijo | Contacto | Contact |

**Sale** el bloque Newsletter (spec 2.14) con sus dos avisos, la nota de la casilla que no existe y el H2 «Consultas» (sin newsletter, la página tiene una sola sección). Las notas pasan a Créditos.

### 6.15 · 404

| Slot | ES | EN |
|---|---|---|
| Titular (`.t-404`) | Esta página no existe. | Page not found. |
| Línea | Puede que la dirección esté mal escrita. | The address may be mistyped. |
| Enlaces de acción | Volver al inicio · Ver las obras | Back to home · See the works |

**Medido, para Lucía:** a ≥ 1001 (`.t-404` a 7,6vw = 109 px), «ESTA PÁGINA» mide 665 px y «NO EXISTE.» 569: con el tope de 560 de la spec 2.15, el titular se parte en tres o cuatro líneas. Con **tope 680** queda en dos («ESTA PÁGINA / NO EXISTE.»), como «PAGE NOT / FOUND.» en inglés (519 y 405). A 390 son dos líneas sin cambio.

### 6.16 · Créditos y notas `/creditos/` (spec 2.16, §13-2)

| Slot | ES | EN |
|---|---|---|
| H1 (`.t-recta`) | Créditos y notas de la maqueta | Mock-up credits and notes |
| Línea gris | Actualizado: 7 de octubre de 2026 | Last updated: 7 October 2026 |
| H2 1 | Qué es esta maqueta | About this mock-up |
| H2 2 | Notas abiertas | Open notes |
| H2 3 | Fotografías | Photographs |
| H2 4 | Tipografías | Typefaces |

**1 · Qué es esta maqueta** (59 palabras)
- ES: Esta maqueta es una propuesta de diseño para el sitio de Módulo 369. Los nombres de artista, los títulos, las técnicas, las medidas y los textos son de muestra. Las fotos son de Unsplash y se usan con su licencia; sus autores se nombran abajo y no tienen relación con la galería. Nada de esto pasa al sitio publicado.
- EN: This mock-up is a design proposal for the Módulo 369 website. Artist names, titles, media, dimensions and texts are samples. The photographs come from Unsplash and are used under its licence; their authors are credited below and have no connection with the gallery. None of this goes into the published site.

**2 · Notas abiertas** (lista, una línea cada una)

| # | ES | EN |
|---|---|---|
| 1 | Artista: si un artista no tiene foto de taller, junto a su texto va un detalle de su obra. | Artist: if an artist has no studio photo, a detail of their work goes beside the text. |
| 2 | Encuentro: por decidir quién sube cada registro al Libro. Si lo sube María desde el panel, está incluido; si lo sube quien activó la caja, queda fuera del alcance cotizado. | Encuentro: still to be decided who uploads each record to the Libro. If María uploads it from the panel, it is included; if the person who activated the box uploads it, it falls outside the quoted scope. |
| 3 | Encuentro: por decidir si la caja se pide con un formulario o se compra con un link de Mercado Pago. La maqueta muestra las dos. | Encuentro: still to be decided whether the box is requested through a form or bought with a Mercado Pago link. The mock-up shows both. |
| 4 | Libro: en el sitio, mientras no haya encuentros activados, se ven las 369 posiciones sin foto. Los siete de la maqueta son de muestra. | Libro: on the live site, until an Encuentro is activated, the 369 positions show without photos. The seven in the mock-up are samples. |
| 5 | Acerca: mirar, seleccionar y decidir son palabras del mapa del sitio de María; la traducción al inglés la confirma ella. | About: look, select and decide come from María's site map; she confirms the English. |
| 6 | Tienda: no hay carrito. Cada obra se paga con su propio link de Mercado Pago; la tienda completa (carro, pago en el sitio y stock) se cotiza aparte. | Shop: there is no cart. Each work is paid for with its own Mercado Pago link; a full shop (basket, on-site payment and stock) is quoted separately. |
| 7 | Precios: la maqueta no muestra cifras. Donde una obra tiene precio, dice «Precio en pesos chilenos». | Prices: the mock-up shows no figures. Where a work has a price, it reads «Priced in Chilean pesos». |
| 8 | Comprar, Amazon y los formularios no hacen nada en la maqueta: al usarlos, avisan qué pasa en el sitio. | Buy, Amazon and the forms do nothing in the mock-up: when used, they say what happens on the live site. |
| 9 | Contacto: la casilla hola@modulo369.com todavía no existe; se crea con el correo del dominio. | Contact: the hola@modulo369.com inbox does not exist yet; it is set up with the domain's email. |
| 10 | Contacto: la cuenta @modulo369 no está confirmada, así que no lleva enlace. | Contact: the @modulo369 account is not confirmed, so it has no link. |
| 11 | Newsletter: no está incluido; necesita un servicio externo y se contrata aparte. | Newsletter: not included; it needs an external service and is contracted separately. |

**3 · Fotografías**
- Frase de entrada: «Cada foto es de su autor y se usa con la licencia de Unsplash. Los títulos, técnicas y medidas que la acompañan en la maqueta son de muestra.» / «Each photograph belongs to its author and is used under the Unsplash licence. The titles, media and dimensions shown with it in the mock-up are samples.»
- Grupos (H3 o `.etiqueta`): Artista A · Artista B · Artista C · Encuentro y Libro · Ediciones · Acerca / Artist A · Artist B · Artist C · Encuentro and Libro · Editions · About.
- Una línea por foto: **«{dónde} · Foto: {autor} / Unsplash»** / **«{where} · Photo: {author} / Unsplash»**, con «{dónde}» en gris: «Campo 04», «Lámina 1 y página de Artista A», «Taller de Artista A», «Encuentro 004», «Caja de Encuentro», «Edición 02, tapa», «Las tres ediciones», «Acerca». El nombre del autor enlaza a su perfil y «Unsplash» a unsplash.com, los dos con `?utm_source=modulo369_maqueta&utm_medium=referral` (guía de atribución de Unsplash, spec 3.5). El autor se escribe como aparece en Unsplash; no se traduce.

**4 · Tipografías**
- ES: EB Garamond (Georg Duffner y Octavio Pardo) y Albert Sans (Andreas Rasmussen), las dos con licencia SIL Open Font License 1.1.
- EN: EB Garamond (Georg Duffner and Octavio Pardo) and Albert Sans (Andreas Rasmussen), both under the SIL Open Font License 1.1.

---

## 7 · Capa «Lo editas tú» (spec 9.2)

Habla de tú porque es para María. Solo nombra lo que el panel previsto hace.

| Pieza | ES | EN |
|---|---|---|
| Carrusel de portada | Portada: eliges qué obras van y en qué orden. | Home: you choose which works appear, and in what order. |
| Tarjeta de obra | Obra: fotos, título, técnica, medidas, precio y link de Mercado Pago, en los dos idiomas. | Work: photos, title, medium, dimensions, price and Mercado Pago link, in both languages. |
| Disponibilidad de la ficha | Estado: disponible, vendida o colección privada. Al marcarla vendida, Comprar desaparece. | Status: available, sold or private collection. Mark it sold and Buy disappears. |
| Línea de precio | Precio: lo publicas o lo dejas a consultar. | Price: publish it or leave it on request. |
| Índice de Artistas | Artistas: cada artista que sumas aparece aquí. | Artists: every artist you add appears here. |
| Página de artista | Artista: nombre, statement, textos, fotos y obras, en los dos idiomas. | Artist: name, statement, texts, photos and works, in both languages. |
| Edición | Edición: tapa, texto, interiores y links de Amazon. | Edition: cover, text, inside pages and Amazon links. |
| Casilla activa y encuentro | Encuentro: número, foto, fecha, lugar y texto, si los registros los subes tú (por decidir). | Encuentro: number, photo, date, place and text, if you upload the records (to be decided). |
| Contadores | Contador: suma cada encuentro que publicas. | Counter: adds each Encuentro you publish. |
| Todo texto de muestra (`.pendiente`) | Texto: lo escribes tú en el panel, en español y en inglés. | Text: you write it in the panel, in Spanish and English. |
| Correo e Instagram | Datos de contacto: los cambias en el panel. | Contact details: you change them in the panel. |
| **Toda foto** (nueva; va en su caja, no en el `<img>`) | Fotos: las cambias por las tuyas. · Foto: {autor} / Unsplash | Photos: you replace them with your own. · Photo: {author} / Unsplash |
| Menú, pie, botones, Cómo se compra | Texto fijo: está en el código, no en el panel. | Fixed text: it lives in the code, not in the panel. |

**Líneas de estado de la ficha** (solo con la capa encendida):

| Estado | ES | EN |
|---|---|---|
| 1 | Estado 1 de 4: disponible, con precio y link. Comprar y Consultar. | Status 1 of 4: available, with price and link. Buy and Enquire. |
| 2 | Estado 2 de 4: disponible, sin precio o sin link. Solo Consultar. | Status 2 of 4: available, no price or no link. Enquire only. |
| 3 | Estado 3 de 4: vendida. Solo Consultar. | Status 3 of 4: sold. Enquire only. |
| 4 | Estado 4 de 4: colección privada. Solo Consultar. | Status 4 of 4: private collection. Enquire only. |
| Enlaces | Ver estado 1 · 2 · 3 · 4 · 2 con precio | See status 1 · 2 · 3 · 4 · 2 with price |

---

## 8 · `alt` (spec §13-10)

**Regla:** describe lo que se ve, en una frase, en la voz del sitio; sin «de relleno», sin «imagen de», sin el nombre del fotógrafo. Se escriben **mirando cada foto del manifiesto** (§9), no antes.

| Imagen | Patrón ES | Patrón EN | Ejemplo (forma, no contenido) |
|---|---|---|---|
| Obra plana (tarjeta, ficha, Lista, obra sola) | {Técnica en minúscula}: {lo que se ve} | {Medium}: {what is seen} | «Óleo sobre tela: franjas anchas de rojo y ocre sobre un fondo claro» |
| Detalle declarado | Detalle de {título} | Detail of {title} | «Detalle de Campo 04» |
| Obra en su espacio (`{X}-S`, lámina, hero) | {Título}, de {Artista}, {dónde está} | {Title}, by {Artist}, {where it is} | «Campo 01, de Artista A, apoyada en un muro junto a una ventana» |
| Taller (`A-T`) | {lo que se ve} | {what is seen} | «Mesa de taller con pinceles, tarros y telas apoyadas en el muro» |
| Apertura de Encuentro (`E-AP`) | {lo que se ve} | | «Varias personas trabajan con papeles alrededor de una mesa, vistas desde arriba» |
| Caja (`E-CAJA`) | Caja de Encuentro: {lo que se ve} | Encuentro box: {what is seen} | «Caja de Encuentro: una caja de cartón cerrada sobre una mesa» |
| Registro (`R-nnn`) | Encuentro {nnn}: {lo que se ve} | Encuentro {nnn}: {what is seen} | «Encuentro 004: dos manos pliegan papel sobre un piso de madera» |
| Tapa (`ED-n`) | Edición {nn}: {lo que se ve} | Edition {nn}: {what is seen} | «Edición 02: cuaderno cerrado de tapa kraft» |
| Interior (`ED-ni`) | Interior de la Edición {nn}: {lo que se ve} | Inside Edition {nn}: {what is seen} | |
| Las tres ediciones (`ED-J`) | Las tres ediciones de Módulo 369 {sobre qué} | The three Módulo 369 editions {on what} | |
| Acerca (`AC`) | {lo que se ve} | | «Sala vacía con luz de ventana sobre un muro blanco» |
| Miniaturas del panel, del menú y del filtro | `alt=""` (el nombre está al lado) | `alt=""` | |

---

## 9 · Segunda pasada: lo que se escribe contra las fotos (tramo 0 de la spec)

**Por qué no va ahora:** las fotos no están elegidas (`fotos-unsplash/manifiesto.csv` no existe). Escribir una descripción antes de ver la obra es exactamente el defecto que la v2 arrastró tres rondas (desvíos 1, 2 y 30: 27 descripciones y dos statements que contradecían la imagen de al lado). **Cuándo:** con el manifiesto completo y la hoja de contacto de spec 4.3, antes del tramo B. **Quién:** Clara, mirando cada foto ampliada.

### 9.1 · Lo que se escribe entero en la segunda pasada
1. **Las 27 descripciones de obra** (cartela, línea 3): ≤ 25 palabras, una o dos frases; la primera dice lo que se ve (color, cómo se reparte, qué toca el borde), la segunda, si hace falta, algo del soporte o de la serie. No contradicen la técnica de la cartela; sin «gesto» (vetada), sin adjetivos de valor. Patrón de la v2 que funcionó: «Un solo campo ocre sobre un fondo café oscuro, corrido hacia la izquierda.»
2. **Los 48 `alt`** con los patrones de §8.

### 9.2 · Lo que ya está escrito y se confirma contra las fotos
| Texto | Qué se mira | Si no calza |
|---|---|---|
| Statements y bios (6.3) | A: pintura sobre tela con capas (pincel o espátula). B: papel cortado o rasgado y pegado, sobre cartón o papel grueso. C: tinta con pincel y agua | Cambia la palabra que no calza (por ejemplo «pincel» por «pluma» en C); la forma del texto no |
| Lugares de los registros 001 a 007 (6.11) | Que la foto `R-nnn` muestre ese lugar | Cambia el lugar al que muestra la foto; la bajada se ajusta en una frase |
| Descripciones de las ediciones (6.7) | Hojas lisas en 01, cuadrícula de puntos en 02, tapa dura en 03 | Se cambia el dato que no calza |
| Párrafo de Encuentro y bloque «Formas de activación» | Que `E-AP` y los registros no muestren algo que el texto niega | Una frase |

### 9.3 · Nombres de serie y técnicas (spec §13-9)
- **A «Campo» / «Field»** sirve si la serie A son campos de color (spec 4.2-1). Si la serie elegida es de pincelada suelta y muchos colores, **«Capa» / «Layer»** (calza con el statement de A, «Pinto por capas»).
- **B «Recorte» / «Cut-out»** sirve para papel cortado o rasgado. Técnicas: «Collage sobre cartón» y «Papel recortado sobre cartón»; si el soporte que se ve es papel, «… sobre papel».
- **C «Línea» / «Line»** sirve para dibujo a tinta. Si ninguna foto de C se lee como grafito, «Grafito sobre papel» pasa a **«Tinta y aguada sobre papel»** / «Ink and wash on paper», y la opción del filtro, a «Aguada» / «Wash».
- Un cambio de nombre de serie toca: `ARTISTAS[].serie` y `TECNICAS` en `app.js`, el pie de las tarjetas y el chip de Contacto. Ningún texto de muestra de este documento nombra una serie, salvo los ejemplos.

### 9.4 · Lo que vi en `referentes/unsplash/` (7-oct, 10:51; 25 fotos, la búsqueda sigue)
Lo dejo anotado porque cambia el copy si esas fotos quedan:
- **artista-b:** cuatro de las nueve son esculturas (no collage), y los cinco collages tienen texto legible o caras (R3, R5).
- **artista-c:** dos vienen de cuentas de museo o archivo (Europeana, The Cleveland Museum of Art: R4) y varias son figurativas, con figuras o caras (R3).
- **artista-a:** pintura de pincelada suelta y espátula, multicolor, con azules saturados (R7); no son «campos de color contenido» (spec 4.2-1). Si la serie A queda así, va «Capa» (9.3); los textos de 6.3 ya sirven.

---

## 10 · Pasada de borrado (v2 → v3)

### 10.1 · Qué salió y por qué

| Salió (v2) | Por qué |
|---|---|
| Las 49 marcas «muestra» / «sample», «activados de muestra», «Los 7 son de muestra», «De muestra», «, de muestra» en `aria-label` | Regla (d) de Ramón; lo cubre el aviso general |
| Las 7 notas «Maqueta ·» en pantalla (Artista, Encuentro, Libro, Acerca, Tienda, Contacto ×2) | Frases que existen solo porque es maqueta; pasan a Créditos (6.16) |
| El aviso de dos líneas con «se cambian por los reales» | Una línea; el detalle está a un toque |
| «CLP ···» y «Precio de muestra» | Glifo de hueco; lo reemplaza un dato de cartela (5.2) |
| «01 · Vista general», «02 · Detalle», «01 · Portada», «Detalle · Campo 01, 2025» | Numeración decorativa (P30) |
| «Biografía» + «Historia y proceso» como subtítulos; 183 palabras por artista | Studio Iron: «ABOUT» y dos párrafos |
| El esqueleto común de las tres bios | Tres textos con la misma forma se leen generados |
| «Consultar por esta obra» en el botón | «Consultar», como el brief y como «Enquire» |
| «Aquí llega la respuesta.» | Studio Iron no pone ayuda en su formulario; el campo se entiende |
| «(lado mayor)» en el filtro | Explica la interfaz |
| «en español y en inglés» en el párrafo del Inicio | Describe el sitio, no la galería |
| Intro de Encuentro en tres textos (145 palabras) | Decían lo mismo tres veces; queda en 56 |
| Acerca en 4 párrafos, 3 subtítulos y el tricolon MIRAR / *SELECCIONAR* / DECIDIR | Titular + 3 párrafos, como About |
| «El registro aparece en el Libro después de que Módulo 369 lo revise» | Una regla de María que no conocemos |
| Newsletter (rótulo, campo, botón y dos avisos) y H2 «Consultas» | Fuera de alcance (spec 2.14); la página queda en una sección |
| Botones de compra en la grilla de Tienda | La compra vive en la ficha; la grilla lleva a la pieza |
| «Galería · Módulo 369 · Redes» en el pie | «Módulo 369» no orienta dentro de Módulo 369 |
| «Un sábado por la tarde», «Pidió que la foto no mostrara su cara» | Se leían como cuento; las estaciones, como dato |
| Nombres de obras concretas en las ediciones 01 y 02 | La foto de un cuaderno no va a mostrar esa obra |

### 10.2 · Conteos (palabras, contadas con script sobre los textos)

| Bloque | v2 | v3 |
|---|---|---|
| Artista A: statement + bio + proceso | 34 + 99 + 88 = 221 | 25 + 41 + 31 = 97 |
| Artista B | 34 + 93 + 89 = 216 | 27 + 39 + 45 = 111 |
| Artista C | 33 + 92 + 88 = 213 | 20 + 33 + 37 = 90 |
| Visión curatorial | 48 | 21 |
| Acerca (texto de muestra, sin el titular) | 186 | 110 |
| Encuentro (intro + bloques) | 145 | 124 |
| Activar (cuatro textos) | 140 | 105 |
| Aviso general, por vista | 13 + «Maqueta» | 6 + «Maqueta» |
| Marcas y notas de maqueta en reposo, sitio completo | 49 marcas + 7 notas | 0 + la línea de Activar |

**Borrar 30 % más:** lo probé en las bios (lo más largo que queda). Sin el párrafo de proceso, la página de la artista no dice cómo trabaja, que es lo único que la hace distinta de las otras dos; sin el primero, el statement queda sin quién. Lo probé en Cómo se compra: sin «Consultas», quien llega a una obra en estado 2, 3 o 4 no sabe qué hacer. Se quedan.

### 10.3 · Pasada de voz
Leído en voz alta, vista por vista. Los textos fijos suenan a rótulos de galería; los de muestra, a quien atiende la galería diciendo qué hay en la sala, un hecho por frase. Los statements son lo único en primera persona y suenan a artista hablando de su taller. Búsqueda hecha sobre este archivo: cero rayas (U+2014, U+2013) en textos visibles; cero palabras del vocabulario vetado de §2 en textos de muestra; cero «nosotros», «nuestro», «usted»; cero cifras de precio y cero «$»; cero «muestra» / «sample» en pantalla en reposo fuera del aviso «Contenido de muestra». Tú en todo.

---

## 11 · Lo que entrego distinto de la spec (con su porqué)

| # | Spec | Este documento | Por qué |
|---|---|---|---|
| 1 | 2.3 · «Sobre la artista» | «Acerca de» | El «ABOUT» de Studio Iron; sin género (el tercer artista no existe) |
| 2 | 2.4 · H1 «OBRAS» | «Todas las obras» | «ALL OBJECTS» de T03; mismo título en la tira del Inicio |
| 3 | 2.2 · H1 «ARTISTAS» | «Artistas de Módulo 369» | «SELECTED STUDIO IRON ARTISTS»; cabe en una línea a 390 (322 px) |
| 4 | 5.15 · «Consultar por esta obra · →» | «Consultar · →» | Palabra del brief §4; botones de 1 a 3 palabras |
| 5 | §13-12 · frase que diga que el precio «se ve en la versión final» | «Precio en pesos chilenos» | La versión de la spec es una frase de maqueta en la cartela; la nota de precios va en Créditos (6.16-7) |
| 6 | 2.0.13 · «Escribir una consulta →»; columnas GALERÍA · MÓDULO 369 · REDES | «Escribir a Módulo 369 →»; Galería · Ayuda · Redes | No repite «consulta» del titular; columnas como STUDIO · SUPPORT · SOCIAL |
| 7 | 2.15 · titular del 404 en dos líneas con tope 560 | Mismo titular; **tope 680** a ≥ 1001 | Medido: en castellano no cabe en 560 (§6.15) |
| 8 | 2.14 · H2 «FORMULARIO» y ayuda bajo el correo | Sin H2 ni ayuda | Una sola sección; el cajón Enquire no lleva ayuda |
| 9 | §13-1 · aviso largo que nombra obras, artistas, textos y datos | «Contenido de muestra; fotos de Unsplash.» | Medido: la lista de cuatro no cabe en una línea entre 621 y 681 (338 px contra 277); la lista está en Créditos |
| 10 | 3.5 · tipografía «Albert Sans (Albert Sans Project Authors)» | «Albert Sans (Andreas Rasmussen)» | Se nombra a la persona, como en EB Garamond; el archivo dice «The Albert Sans Project Authors» (verificar, §12-6) |
| 11 | §13-6 · bios «contra las fotos reales» | Contra la técnica de la spec §4; confirmación en la segunda pasada | Las fotos no están (§9) |

### 11.1 · Medidas que respaldan las decisiones (Chrome headless, fuentes locales)

| Texto | Estilo | Ancho | Disponible |
|---|---|---|---|
| MAQUETA + «Contenido de muestra.» + «Créditos» + calles | Albert 12 | 268 px | 366 (390) |
| «Contenido de muestra; fotos de Unsplash.» | Albert 12 | 232 px | 277 (621, con herramientas) |
| «Comprar» + «Mercado Pago →» | Albert 16, 0,062em | 73 + 141 px | 318 (botón a 390) |
| «Activar un encuentro» + «→» | Albert 16 | 174 px | 318 |
| «ARTISTAS DE MÓDULO 369» | EB 26 mayúscula | 322 px | 366 |
| «TODAS LAS OBRAS» | EB 26 mayúscula | 226 px | 366 |
| «ENCUENTRO» (menú) | EB 38 mayúscula | 236 px | 366 |
| «DE CADA ARTISTA, LA SERIE ENTERA.» | EB 450 a 46,8 (12vw) | 815 px | 3 líneas a 390 |
| «Por decidir: pedir la caja o comprarla.» | Albert 13 | 224 px | 342 |
| «001/369 · VERANO · UNA MESA DE COCINA» | Albert 12, 0,12em | 299 px | 366 |
| Línea de pie del carrusel (título + autor + controles) | | 263 px | 366 |

---

## 12 · Afirmaciones por verificar antes de mostrar

| # | Texto | Dónde | Qué falta y quién |
|---|---|---|---|
| 1 | «Precio en pesos chilenos» | Ficha, Activar | Que el link de Mercado Pago cobre en pesos también a quien compra desde afuera. Ramón, con María |
| 2 | «Se imprimen a pedido y se venden en Amazon, en español y en inglés» | Ediciones, Inicio | Amazon KDP imprime a pedido (cierto); que cada edición exista en los dos idiomas lo confirma María |
| 3 | hola@modulo369.com | Contacto | La casilla no existe (brief §9-5); nota 9 de Créditos |
| 4 | @modulo369 | Contacto, pie | No está verificado que sea de María; sin enlace (nota 10) |
| 5 | «parte con tres artistas» | Acerca | `BRIEF.md` (María, una amiga y un tercero por definir): cierto |
| 6 | «Albert Sans (Andreas Rasmussen)» | Créditos | Confirmar el nombre en fonts.google.com/specimen/Albert+Sans antes de publicar la v3; si no, «The Albert Sans Project Authors», como dice el archivo |
| 7 | Todo Encuentro y Activar (una caja se activa una vez, indicaciones breves, regalo, permiso de quien sale en la foto) | Encuentro, Activar | Es un ejemplo de largo y tono, no una propuesta de cómo funciona la caja. Ramón lo dice en voz alta al llegar a Encuentro |
| 8 | Oficios de origen de A, B y C (pintura, diseño gráfico, arquitectura) | Artista | Si uno coincide con la trayectoria real de María o de su amiga, aparece el «¿esa soy yo?». Ramón, un vistazo |
| 9 | «queda fuera del alcance cotizado» | Créditos, nota 2 | Borrador §8-3 lo dice; Ramón confirma que se dice así |
| 10 | «Consulta por una obra, una edición o un encuentro» | Pie | Si Encuentro no se puede consultar (§9-4), el titular queda con dos palabras en itálica |

---

## 13 · Para Diego: qué cambia en `app.js`

| Clave | Acción |
|---|---|
| `T.aviso` | Dos valores: largo (§3, ≥ 621) y corto (≤ 620); suma `T.creditosNotas` («Créditos y notas» / «Credits and notes») y `T.creditos` («Créditos» / «Credits») |
| `T.muestra`, `T.textoMuestra`, `T.activadosMuestra`, `T.deMuestra`, `M.precioAria`, `T.contadorLibro` (parte «los 7 son de muestra»), `T.casillaAria` («, de muestra»), `T.mapaAria` («de muestra») | Se borran o se cortan como dice 6.10 |
| `T.avisos.*` | Los seis de §5.5; se borran `carrito`, `registroLibro`, `cajaDecidir` (queda solo la línea de Activar, 6.9), `libroVacio`, `tresPalabras`, `newsletter`, `casilla`, `suscribir` (pasan a Créditos) |
| `T.avisoFotoTaller`, `T.avisoFotoObra`, `T.heroRotulo`, `T.altHero`, `T.vistaGeneral`, `T.vistaDetalle`, `T.rotPortada`, `T.rotInterior`, `T.anterior` / `T.siguiente` / `T.todasLasObras` (navegación de la ficha), `T.ayudaCorreo`, `T.tuCorreo`, `T.suscribirme`, `T.newsletter`, `T.consultasH`, `T.biografia`, `T.historiaProceso`, `T.criterioCuratorial`, `T.vision`, `T.tresPalabras` | Salen de la v3 |
| `T.consultar` | «Consultar» / «Enquire» |
| `T.fTamano` | «Tamaño» / «Size» |
| `T.fConsulta` → `T.fMensaje` | «Mensaje» / «Message»; `T.errConsulta` → «Escribe tu mensaje.» / «Please write your message.» |
| `T.rotulosPie` | Galería · Ayuda · Redes / Gallery · Help · Social, con los enlaces de 4.2 |
| `T.verLaObra` | «Ver la obra» / «View work» |
| `T.verTodo` | «Ver todo» / «See all» (estado vacío de Tienda) |
| `M.precio` | «Precio en pesos chilenos» / «Priced in Chilean pesos» (ya no es un dato corto con `aria-label`) |
| `M.artista.*` | Los de 6.3: `statement`, `bio` (párrafo 1) y `proceso` (párrafo 2, sin H2) |
| `M.artistasVision`, `M.acerca*`, `M.inicioEncuentro`, `M.encuentro*`, `M.faq`, `M.activar*`, `M.encuentros`, `M.edicion.*.descripcion`, `M.edicionesPresentacion` | Los de §6 |
| Nuevas | `T.acercaDe` («Acerca de» / «About»), `T.detalle` («Detalle» / «Detail»), `T.segmentos` (5.2), `T.precioPesos`, `T.porDecidirCaja` (6.9), `T.obrasTitulo` («Todas las obras»), `T.artistasTitulo` («Artistas de Módulo 369»), `T.encuentrosActivados`, `T.nDe369Activados`, `T.posiciones`, `T.lineaE404`, `T.creditos*` (6.16), `T.capa.fotos` (7) |
| `M.obraDescripcion`, todos los `alt*` | Se vacían hasta la segunda pasada (§9); mientras tanto, sin descripción en la cartela (la ficha se lee terminada sin ella, como `/art` de Studio Iron) |
