# Copy de interfaz · Módulo 369 · maqueta v2

> Lo escribe Clara (`/web-copy-interfaz`) para la obra de `brief-de-obra.md` (aprobado en la compuerta 1, 5-oct-2026). Es **todo el texto de la v2**, slot por slot y vista por vista, en ES y EN. **Para revisión humana:** lo aprueba Ramón antes de construir, y María lo ve en la reunión del 6-oct. Nada de este documento llega a producción (brief §6: corchetes, avisos y textos de propuesta se quedan en la maqueta). Si algo de acá choca con el brief, manda el brief.

**Fecha:** 5-oct-2026 · **Insumos:** `brief-de-obra.md` (contrato), `borrador-brief-sitio.md` (contexto), `diagnostico-maqueta-v1.md` (C05, C08 a C14, C28 y lo que toca copy en el resto), `GALERIA-MARIA-LORETO/BRIEF.md` (corpus de María), maqueta v1 (`app.js`, `index.html`).
**Fuera de este documento** (brief §3 y §8-3): panel simulado (C16, C30), páginas de reunión `#/idea`, `#/incluido` y `#/decisiones` (C17, C18, C29), el enlace «Reunión →» de la barra (C03) y el Archivo de exposiciones (C32). No tienen copy acá porque no se construyen.

---

## 0 · Cuatro capas de texto, cada una con una sola voz

| Capa | Quién habla | A quién | Cómo se reconoce | Idiomas |
|---|---|---|---|---|
| **Texto fijo** (menú, botones, etiquetas, «Cómo se compra», 404) | la galería | al visitante | sin marca | ES y EN; lo escribe Clara y lo traduce SpindleLab (brief §6) |
| **Corchete** (`.pendiente`) | la maqueta | a quien mire | `[Lo escribe X · qué va ahí]` | ES y EN |
| **Aviso de maqueta** (`.nota-maqueta`) | la maqueta | a María | empieza con «Maqueta ·» / «Mock-up ·» | ES y EN |
| **Lo editas tú** (capa que se enciende) | la maqueta | a María, de tú | etiqueta sobre la pieza, solo con la capa encendida | ES y EN |

**Por qué los avisos y la capa van también en inglés** (pisa a C12 y C15, que los dejaban solo en ES): brief §7-3 dice que con EN activo no queda texto fijo en castellano en ninguna vista, y §6 cuenta los avisos de formulario como texto fijo. Javiera lo va a medir así.

**Reglas de la capa fija**
- **Tuteo** (brief §6), en indicativo o imperativo. Ningún texto fijo pregunta.
- **La galería no habla en primera persona.** Ni «nosotros» (María está sola: sería el plural de tamaño que prohíbe el detector, A9) ni «yo» (Acerca «no es una bio personal»). Cuando hace falta sujeto, se dice «Módulo 369». Es un supuesto: se revierte en los pocos textos que lo usan.
- **Castellano de Chile:** correo, celular, link (es la palabra de los compromisos del 24-sep para Mercado Pago).
- **Inglés británico de galería:** Enquire, Medium, Dimensions, Edition, Private collection, Price on request, colour. Esther Schipper usa «Inquire» (revisado hoy): las dos formas son correctas, lo que no se hace es mezclarlas. Si Ramón prefiere la americana, se cambia «Enquire» por «Inquire» en tres textos.
- **Nombres que no se traducen:** Módulo 369, Encuentro, Libro, Mercado Pago, Amazon. En EN, «Encuentro» va siempre con mayúscula (plural «Encuentros»). En ES, «encuentro» va en minúscula cuando es sustantivo común («activar un encuentro») y con mayúscula cuando es el proyecto («Qué es Encuentro»).
- **Cero rayas largas y cero rayas medias.** Los rangos se escriben «50 a 100 cm» / «50 to 100 cm». Sin Title Case («Colección privada», «Private collection»).
- **Cero cifras de precio.** Las únicas cifras visibles son las medidas y los años de relleno (bajo el aviso global), el contador del Encuentro y los conteos de resultados.
- `lang="es-CL"` en ES y `lang="en"` en EN (la v1 ponía `es`).

**Formato de los corchetes** (el hueco dice qué va y quién lo escribe)

| Quién | ES | EN |
|---|---|---|
| María | `[Lo escribe María · …]` | `[Written by María, in English · …]` |
| Cada artista | `[Lo escribe cada artista · …]` | `[Written by the artist, in English · …]` |
| María o la artista | `[Lo escribe María o cada artista · …]` | `[Written by María or the artist, in English · …]` |
| Dato corto (precio, fecha, lugar, cuenta) | `[precio]` | `[price]` |

- **«in English» hace un trabajo:** el compromiso 5 del 24-sep dice que SpindleLab traduce solo los textos fijos y que el contenido lo escriben ellas en los dos idiomas. Si la vista EN no lo dice, más adelante se lee como un costo escondido (diagnóstico, lente de contenido).
- **Tercera persona, no «lo escribes tú»:** el link de la maqueta se puede reenviar (a la amiga artista, por ejemplo), y «Lo escribe María» se entiende sin contexto. El «tú» queda reservado para la capa «Lo editas tú», que es explícitamente para ella.

---

## 1 · Calibración de voz

No hay textos publicados de Módulo 369 (la galería no existe todavía). El único corpus es lo que María escribió: la declaración creativa del correo del 26-sep, su frase-resumen y el mapa del sitio (`BRIEF.md`).

**Lo que tomo de ella**
- Frases cortas y afirmativas, sin adjetivos de venta. Su forma de decir lo que quiere es descartar primero: «No busco extravagancia ni desorden».
- Series de verbos o sustantivos sin conectores: «mirar, seleccionar, decidir»; «qué es, cómo funciona, numeración 001/369».
- En su mapa, las secciones se nombran con sustantivos simples y al visitante lo trata de tú («qué recibes»).
- Lo que no hace: no explica para convencer, no usa superlativos, no habla de «experiencias únicas».

**Consecuencia:** los textos fijos son rótulos (sustantivos), las instrucciones caben en una línea y **ningún texto fijo explica el concepto del sitio**.

**Lo que no tomo:** su primera persona («Yo creo a partir del hallazgo») es la voz de la artista, no la de la galería. Y su vocabulario de obra (hallazgo, accidente, acumulación, fragmento, repetición, vacío) no entra en textos fijos ni en el relleno: usado como decoración, el sitio se explica a sí mismo, que es justo lo que ella pidió evitar, y en los artistas de relleno provoca un «¿esa soy yo?» (diagnóstico C11).

---

## 2 · Titulares: decisiones, con los descartes a la vista

### 2.1 · Regla: el H1 de cada vista es su nombre

| Vista | H1 ES | H1 EN | Titular de la v1 que se descarta | Por qué |
|---|---|---|---|---|
| `/` | Módulo 369 | Módulo 369 | «Una galería de arte contemporáneo que crece de a tres.» | Inventado por SpindleLab y presentado como definitivo; «contemporáneo» no es palabra de María; «crece de a tres» convierte un plan interno en eslogan. Ver 2.2 |
| `/artistas/` | Artistas | Artists | «Tres artistas para empezar. Después seis, después nueve.» | Explica el 3·6·9 en vez de dejar que se vea al crecer |
| `/obras/` | Obras | Works | «Todas las obras» | Repite el rótulo |
| `/ediciones/` | Ediciones | Editions | «Cuadernos y libros» | Repite el rótulo, y «libros» choca con el Libro de Encuentro |
| `/encuentro/` | Encuentro | Encuentro | (no tenía h1) | El contador hace de elemento grande; el h1 lo nombra |
| `/encuentro/activar/` | Activar un encuentro | Activate an Encuentro | igual | Es el nombre que le da su mapa |
| `/encuentro/libro/` | Libro | Libro | «7 de 369 encuentros activados» | El conteo pasa a ser un dato bajo el título (ver vista 10) |
| `/acerca/` | Acerca de Módulo 369 | About Módulo 369 | «Orden, con pequeñas disrupciones.» | Frase de su correo privado, que describe la web y no la galería, y nombra el concepto. Ver 2.5 |
| `/tienda/` | Tienda | Shop | «Obras, encuentros y ediciones» | Lista lo que viene abajo |
| `/contacto/` | Contacto | Contact | «Escríbenos» / «Write to us» | Plural de tamaño en ES, calco en EN |
| fichas | el título de la obra, el nombre de la artista, la edición o el número del encuentro | igual | | Es contenido |

**Por qué:** los titulares de la v1 los escribimos nosotros y se ven como textos de la galería (lo prohíbe `GALERIA-MARIA-LORETO/CLAUDE.md`); además explican, y María pidió «que no todo esté explicado ni mostrado de inmediato». Revisé hoy sus referentes: el inicio de Esther Schipper no tiene ninguna frase sobre la galería (solo el nombre y las exposiciones), y la página de artistas de Kurimanzutto tampoco (solo los nombres). Escat sí tiene una frase que describe la galería, pero de Escat a María le gustó la foto grande, no el texto.
**Test de intercambio:** «Artistas» sirve para cualquier galería, y está bien que así sea. Un rótulo no tiene que ser exclusivo. El test es para las frases que prometen algo, y en esta v2 ningún titular promete nada: lo propio lo ponen la obra, la composición y las palabras de María cuando las escriba.

### 2.2 · Inicio: sin titular visible

| | Candidato | ES | EN |
|---|---|---|---|
| **A · recomendado** | H1 = el nombre, sin frase. Puede ser la propia marca o quedar solo para lectores de pantalla (lo decide la spec). Lo primero que se lee bajo la obra es su pie | Módulo 369 | Módulo 369 |
| B | Su frase, **marcada como propuesta**. Solo si Ramón quiere mostrarle sus palabras convertidas en sitio | Encontrar lo inesperado, seleccionarlo, darle estructura. | To find the unexpected, select it, give it structure. |
| | Nota que acompaña a B (obligatoria) | Maqueta · Propuesta: es una frase de tu correo del 26-sep. Va solo si tú lo decides. | Mock-up · Proposal: it is a line from your email of 26 Sep. It only goes in if you say so. |
| C | Corchete | [Lo escribe María · una frase para el inicio, si quiere tener una] | [Written by María, in English · a line for the home page, if she wants one] |

**Por qué A:** (1) cumple lo que ella pidió, que no todo se explique de entrada; (2) Esther Schipper, cuyo inicio a ella no le molesta, abre así; (3) la frase de B sale de un correo privado (brief §5: publicarla textual no está consultado) y describe **su práctica de artista** («Yo creo a partir del hallazgo…»), no la de la galería, y María va a ser una de tres artistas. Si se usa B, su nota habla de tú porque está dirigida a ella, y nunca se muestra sin la nota.
**El enunciado de Módulo 369 sale del inicio** (estaba en la v1, L113) y vive solo en Acerca. Así María escribe un texto en vez de dos, y el inicio queda con obra, nombres y números. Si Simón necesita texto indexable en el inicio, lo resuelven el `title` y la meta descripción, no un párrafo.

### 2.3 · La palabra enorme

| | Palabra | ES | EN | Lectura |
|---|---|---|---|---|
| **A · recomendada** | El título de la sección de artistas del inicio, llevado a escala enorme y cortado por el borde | Artistas | Artists | Hace trabajo (rotula la sección), se traduce sin dejar español colado y tiene **8 letras, igual que «Hallazgo»**: la medida de la composición de la v1 se conserva. La disrupción es la escala, no el significado |
| B | Título del bloque Encuentro | Encuentro | Encuentro | Le da peso a su proyecto, pero ese bloque ya tiene el cambio de escala del contador: serían dos en el mismo lugar |
| C | Título de obras | Obras | Works | Cinco letras, menos efecto; el inicio ya es todo obra |
| descartada | «Hallazgo» (v1, C05) | | | Nombra el concepto en vez de hacerlo pasar, es la primera palabra de su correo privado y en EN queda en español sin nada que la explique |
| descartada | «Módulo» | | | Repite la marca de la cabecera |

Si el cobalto va en una letra de la palabra, lo decide Lucía.

### 2.4 · La palabra casi escondida

| | Palabra | ES | EN | Lectura |
|---|---|---|---|---|
| **A · recomendada** | Un enlace chico en una casilla vacía de la retícula del inicio, que lleva al Libro (`#/encuentro/libro`) | Libro | Libro | Es palabra de María (su boceto), hace trabajo (es una segunda entrada al Libro; la primera es el enlace vertical de Encuentro) y el hallazgo ocurre: quien la encuentra, encuentra el registro. Es igual en los dos idiomas |
| B | Enlace chico a Obras en vista Índice | índice | index | Funciona, pero no es una palabra suya |
| descartada | «vacío» (C05) | | | Vocabulario de su correo privado, nombra el concepto, y con `aria-hidden` no hace nada |

**Para la spec:** la palabra se esconde por tamaño y por lugar, no por contraste. Si es enlace, tiene que pasar AA (el `#BDB5A6` de C05 no pasa y además sería un color nuevo, que el brief §7 no permite).

### 2.5 · Acerca

- H1 «Acerca de Módulo 369» / «About Módulo 369» (el nombre no se traduce). Es el nombre de la sección en su mapa, y Kurimanzutto usa «Acerca de» en su menú.
- **Descartado:** «Orden, con pequeñas disrupciones.» Es una frase de su correo privado que describe cómo quiere la web, no qué es la galería, y además nombra el concepto. Si Ramón la quiere mostrar, entra solo como la opción B del inicio: marcada como propuesta.
- **Las tres palabras «mirar · seleccionar · decidir» sí van.** Salen de su mapa del sitio (un documento que escribió para el sitio, no del correo privado), y el brief §3 las pone como contenido de Acerca. Van tal cual, con un corchete para el texto que las desarrolla y una nota que dice de dónde salen. La traducción «look · select · decide» es propuesta nuestra y la confirma ella.

---

## 3 · Global (todas las vistas)

### 3.1 · Barra de aviso

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Rótulo (negrita) | Decir qué es esto | Maqueta | Mock-up |
| Texto | Decir qué es relleno y que se cambia | Obras, artistas y datos de relleno: se cambian por los reales. | Placeholder works, artists and data, to be replaced with the real ones. |
| Versión corta (solo si a 390 no cabe en 2 líneas) | Lo mismo, mínimo | Relleno: se cambia por lo real. | Placeholder, to be replaced. |

- **Recomiendo el texto completo en todos los anchos.** Con «Maqueta · » suma 72 caracteres en ES y 81 en EN: dos líneas a 390 en mono de 11 px. Y 390 es el ancho principal: la versión corta pierde «obras, artistas y datos».
- **Se borró:** «generados» (a una artista le sugiere IA), la repetición de «maqueta», el número de versión (no le dice nada a María) y «hechos por código… no son obra de nadie» (no cabe en dos líneas; Ramón lo dice en voz alta al abrir la reunión, como propone el diagnóstico en «Para la reunión»).

### 3.2 · Herramientas de la barra

| Slot | ES | EN | Nota |
|---|---|---|---|
| Grupo (aria-label) | Herramientas de la maqueta | Mock-up tools | |
| Capa «Lo editas tú» (botón, aria-pressed) | Lo editas tú | What you edit | Visible también a 390: María la prueba en su iPhone (C03 la dejaba solo en escritorio) |
| Retícula (botón, aria-pressed) | Retícula | Grid | Herramienta de la maqueta, no del sitio (brief §8-4) |
| Idioma | ES · EN | ES · EN | aria-label «Español» / «English» |
| Notas (botón) | **no recomendado** | | Los avisos aparecen al usar lo simulado o, donde el brief pide que estén a la vista, en línea. Un botón menos en el iPhone. Si la spec lo pone: «Notas» / «Notes» |

### 3.3 · Cabecera y menú

| Slot | ES | EN |
|---|---|---|
| Marca (enlace al inicio) | Módulo 369 | Módulo 369 |
| aria-label de la marca | Módulo 369, inicio | Módulo 369, home |
| Menú (orden de su mapa) | Artistas · Obras · Ediciones · Encuentro · Acerca de · Tienda · Contacto | Artists · Works · Editions · Encuentro · About · Shop · Contact |
| aria-label del menú | Principal | Main |
| Botón del menú a 390 (si la spec lo pliega, C26) | Menú / Cerrar | Menu / Close |
| Salto al contenido (visible solo con foco) | Ir al contenido | Skip to content |

### 3.4 · Pie

| Slot | ES | EN | Nota |
|---|---|---|---|
| Nombre | Módulo 369 | Módulo 369 | |
| Descriptor | Galería de arte en línea | Online art gallery | Reemplaza «Galería de arte contemporáneo». A verificar con María (§10-1) |
| Enlaces | los del menú | los del menú | |
| Dominio | modulo369.com | modulo369.com | Sin «modulo369.cl»: el .cl solo redirige |

### 3.5 · Título de la pestaña

`{nombre de la vista} · Módulo 369 · maqueta` / `{view name} · Módulo 369 · mock-up`. Inicio: `Módulo 369 · maqueta` / `Módulo 369 · mock-up`. El nombre de la vista es su H1 (en fichas, el título de la obra, el nombre de la artista, la edición o «Encuentro 001»).

---

## 4 · Piezas compartidas

### 4.1 · Pie de obra

| Dónde | ES | EN |
|---|---|---|
| Tarjeta (Obras, Tienda): línea 1 | Artista A | Artist A |
| Tarjeta: línea 2 | Campo 04, 2025 | Field 04, 2025 |
| Tarjeta: línea 3 (estado) | Disponible | Available |
| Tarjeta en la página de artista | sin el nombre (ya está en el título de la página) | igual |
| Leyenda del carrusel (enlace a la ficha: la única acción del inicio) | Artista A · Campo 04, 2025 | Artist A · Field 04, 2025 |
| Fila del Índice | Campo 04 · Artista A · 2025 | Field 04 · Artist A · 2025 |
| `alt` de cada obra | Obra de relleno: Campo 04, de Artista A | Placeholder work: Field 04, by Artist A |

- Primero la artista, después el título y el año: es el orden de pie de las galerías y sirve en un índice con varias artistas.
- **Se borró el código de la obra (C-04)** de la vista Índice y de la navegación de la ficha. En el sitio no hay un campo de inventario, así que mostrarlo sería anunciar algo que no existe.
- **Relleno:** artistas «Artista A, B, C» / «Artist A, B, C». Series de títulos (C11): A «Campo» / «Field», B «Recorte» / «Cut-out», C «Línea» / «Line». Técnicas (C23): A «Óleo sobre tela», «Acrílico sobre tela» / «Oil on canvas», «Acrylic on canvas»; B «Collage sobre papel», «Papel recortado» / «Collage on paper», «Cut paper»; C «Tinta sobre papel», «Grafito sobre papel» / «Ink on paper», «Graphite on paper». **Se borraron los «lenguajes»** de cada artista («[Pintura de campos de color]», «[Acumulación, fragmento, repetición]», «[Gesto, tinta y vacío]»): dos repetían casi literal cómo María describe su obra, y en el sitio no hay un campo de una línea por artista (su mapa no lo pide). Un campo menos para que María lo llene.

### 4.2 · Los cuatro estados de la ficha (brief §4)

| Estado | Lo que ve el visitante | Fila «Precio» | Botones (exactamente) |
|---|---|---|---|
| 1 · Disponible, con precio y link de MP | Disponible / Available | [precio] / [price] | **Comprar con Mercado Pago** / **Buy with Mercado Pago** (principal) + Consultar por esta obra / Enquire about this work |
| 2 · Disponible, sin precio o sin link | Disponible / Available | Precio a consultar / Price on request (si no hay precio) o [precio] / [price] (si hay precio y falta el link) | Consultar por esta obra / Enquire about this work |
| 3 · Vendida | Vendida / Sold | no aparece | Consultar por esta obra / Enquire about this work |
| 4 · Colección privada | Colección privada / Private collection | no aparece | Consultar por esta obra / Enquire about this work |

- Para el visitante, los estados 1 y 2 se llaman igual: la diferencia está en el botón.
- **«Comprar con Mercado Pago»** dice qué pasa al tocarlo: el pago sigue en Mercado Pago. Es el botón Comprar del brief. Si a 390 no cabe en una línea, la spec lo acorta a «Comprar» / «Buy» y suma «Mercado Pago» en mono chico debajo.
- **Se borró:** «Por definir» / «To be defined» (sonaba a que la galería no había decidido) y el guion que hacía de valor vacío en las obras privadas (la fila desaparece; C23).
- **Consultar** lleva a Contacto con la obra cargada (ver 4.5). El texto es el mismo en los cuatro estados: una consulta por una obra vendida también le sirve a María (supuesto del brief §4).

### 4.3 · Ficha de obra

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Artista (enlace, sobre el título) | Llevar a la artista | Artista A | Artist A |
| H1 | Nombrar | Campo 04 | Field 04 |
| Imagen 1 / 2 (controles) | Recorrer | Vista general · Detalle | Full view · Detail |
| Contador de imagen | Orientar | 1 / 2 | 1 / 2 |
| `alt` imagen 1 | | Obra de relleno: Campo 04, de Artista A. Vista general | Placeholder work: Field 04, by Artist A. Full view |
| `alt` imagen 2 | | Obra de relleno: Campo 04, de Artista A. Detalle | Placeholder work: Field 04, by Artist A. Detail |
| Etiquetas de datos | | Año · Técnica · Medidas · Precio · Disponibilidad | Year · Medium · Dimensions · Price · Availability |
| Formato de medidas | | 96 × 120 cm (alto × ancho) | 96 × 120 cm (height × width) |
| Descripción (corchete) | Marcar el hueco | [Lo escribe María o cada artista · sobre la obra, opcional, 2 a 4 líneas] | [Written by María or the artist, in English · about the work, optional, 2 to 4 lines] |
| Navegación | Seguir recorriendo | ← Anterior · Todas las obras · Siguiente → | ← Previous · All works · Next → |

- **«Estado» pasa a «Disponibilidad»** / «Availability», el mismo nombre del filtro: un concepto, un nombre (C23).
- **Medidas en alto × ancho**, que es la convención de galería (la v1 imprimía ancho × alto). Lo construye Diego; la etiqueta no lo explica.

### 4.4 · Filtros de Obras

| Slot | ES | EN |
|---|---|---|
| aria-label del formulario | Filtros | Filters |
| Plegado a 390 (si la spec usa C25) | Filtrar | Filter |
| Artista | Artista: Todos · Artista A · Artista B · Artista C | Artist: All · Artist A · Artist B · Artist C |
| Técnica | Técnica: Todas · (las seis técnicas de 4.1) | Medium: All · (the six media in 4.1) |
| Tamaño | Tamaño (lado mayor): Todos · Hasta 50 cm · De 50 a 100 cm · Más de 100 cm | Size (longest side): All · Up to 50 cm · 50 to 100 cm · Over 100 cm |
| Disponibilidad | Disponibilidad: Todas · Disponible · Vendida · Colección privada | Availability: All · Available · Sold · Private collection |
| Conteo (aria-live) | 27 obras · 1 obra | 27 works · 1 work |
| Vista | Vista: Muro · Índice | View: Wall · Index |
| Quitar filtros (solo con alguno activo) | Quitar filtros | Clear filters |
| Sin resultados | No hay obras con estos filtros. | No works match these filters. |
| Acción del estado vacío | Quitar filtros | Clear filters |

- **Se borró** «Pequeño / Mediano / Grande»: en EN «Medium» quedaba dos veces en la misma fila (técnica y tamaño). Ahora el tamaño se dice en centímetros y la etiqueta explica que se mide por el lado mayor.

### 4.5 · Formularios (Contacto, Activar, newsletter)

| Slot | ES | EN |
|---|---|---|
| Nombre | Nombre | Name |
| Correo | Correo | Email |
| Ayuda bajo el correo (Contacto y Activar) | Aquí llega la respuesta. | The reply goes here. |
| Consulta (Contacto) | Consulta | Message |
| Obra cargada desde «Consultar» (chip sobre el campo) | Consulta por: Campo 04, de Artista A | Enquiry about: Field 04, by Artist A |
| Quitar la obra cargada | Quitar | Remove |
| Botón Contacto | Enviar consulta | Send enquiry |
| Pregunta de Activar (etiqueta del campo de texto) | [Pregunta del formulario · la define María] | [Form question · defined by María] |
| Botón Activar | Enviar solicitud | Send request |
| Newsletter: campo | Tu correo | Your email |
| Newsletter: botón | Suscribirme | Subscribe |
| Error: nombre vacío | Falta tu nombre. | Please add your name. |
| Error: correo vacío | Falta tu correo. | Please add your email. |
| Error: correo mal escrito | Revisa el correo: le falta la @ o lo que va después. | Check the email address: it needs an @ and a domain. |
| Error: consulta vacía | Escribe tu consulta. | Please write your message. |

- Los errores van bajo el campo y dicen cómo arreglarlo. Si la spec valida con `required` nativo, Safari muestra su propio mensaje en el idioma del teléfono y estos textos no aparecen: para controlarlos, la validación tiene que ser propia.
- **Microcopy de confianza:** solo «Aquí llega la respuesta», que no promete nada que no se pueda cumplir. «Tu correo se usa solo para responderte» queda fuera hasta que exista el aviso de privacidad (borrador §9-a). Tampoco se escribe un plazo de respuesta: lo define María.
- **Se borró** la pregunta inventada de Activar, «¿Dónde y con quién harías el encuentro?», que proponía un uso de la caja que María nunca describió.

### 4.6 · 404

| Slot | ES | EN |
|---|---|---|
| H1 | Esta página no existe. | Page not found. |
| Acción principal | Ver las obras → | See the works → |
| Enlace secundario | Ir al inicio | Back to home |

Se queda la línea de la v1 en ES: es directa y no tiene sujeto. En EN, «This page does not exist» pasa a «Page not found» (C28).

---

## 5 · Vista por vista

### 1 · Inicio `/`
**Única acción:** abrir la obra del carrusel.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 | Nombrar (ver 2.2) | Módulo 369 | Módulo 369 |
| Carrusel (aria-label) | | Obras destacadas | Selected works |
| Lámina (aria-label) | | 1 de 5 | 1 of 5 |
| Leyenda (enlace a la ficha) | Nombrar la obra y abrirla | Artista A · Campo 04, 2025 | Artist A · Field 04, 2025 |
| Controles | Recorrer | ← Anterior · 01 / 05 · Siguiente → | ← Previous · 01 / 05 · Next → |
| aria-label de los controles | | Obra anterior · Obra siguiente | Previous work · Next work |
| Palabra enorme (título de la sección artistas, ver 2.3) | Rotular | Artistas | Artists |
| Enlace de la sección | Llevar | Ver todo → | View all → |
| Nombre bajo cada obra | Nombrar | Artista A | Artist A |
| Palabra casi escondida (enlace al Libro, ver 2.4) | Que se descubra | Libro | Libro |
| Bloque Encuentro: rótulo | Nombrar | Encuentro | Encuentro |
| Contador | Mostrar cuántos van | 007/369 | 007/369 |
| Bajo el contador | Marcar el relleno | activados · de muestra | activated · samples |
| Enlace | Llevar | Qué es Encuentro → | About Encuentro → |
| Ediciones: rótulo | Nombrar | Ediciones | Editions |
| Enlace | Llevar | Ver todo → | View all → |
| Tapa (tipo · título) | Nombrar | Cuaderno · Edición 01 | Notebook · Edition 01 |

**Se borró de la v1:** el titular inventado, «hallazgo, accidente», el enunciado (pasa a Acerca), «Hallazgo», el «3 / 6 / 9», la línea de cada artista y la descripción inventada de Encuentro («Una caja con materiales para armar una experiencia…»). Tampoco hay corchete de Encuentro en el inicio: el contador y su enlace bastan, y María escribe un texto de Encuentro en vez de dos.

### 2 · Artistas `/artistas/`
**Única acción:** entrar a una artista.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 | Nombrar | Artistas | Artists |
| Visión curatorial | Marcar el hueco | [Lo escribe María · visión curatorial: qué une a los artistas de Módulo 369, un párrafo] | [Written by María, in English · curatorial vision: what brings the Módulo 369 artists together, one paragraph] |
| Número de fila | Orientar | 01 / 03 | 01 / 03 |
| Nombre (enlace a la artista) | Nombrar y llevar | Artista A | Artist A |
| `alt` de las obras de la fila | | Obra de relleno: Campo 01, de Artista A | Placeholder work: Field 01, by Artist A |

Solo si la spec incluye el selector de C22:

| Slot | ES | EN |
|---|---|---|
| Grupo | Maqueta · ver con | Mock-up · show |
| Botones | 3 · 6 · 9 artistas | 3 · 6 · 9 artists |
| Artistas de relleno D a I | Artista D … Artista I | Artist D … Artist I |
| Número de fila con 6 o 9 | 01 / 06 · 01 / 09 | igual |

Ninguna artista con retrato (brief §7).

### 3 · Artista `/artistas/a/`
**Única acción:** abrir una obra.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Volver | Orientar | ← Artistas | ← Artists |
| H1 | Nombrar | Artista A | Artist A |
| Statement (sin rótulo, bajo el nombre) | Marcar el hueco | [Lo escribe cada artista · statement: su obra en sus palabras, un párrafo] | [Written by the artist, in English · statement: the work in their own words, one paragraph] |
| Título de las obras | Rotular | Obras | Works |
| Tarjeta | | Campo 01, 2025 · Disponible | Field 01, 2025 · Available |
| Rótulo bio | Rotular | Biografía | Biography |
| Bio | Marcar el hueco | [Lo escribe cada artista · biografía, de 80 a 120 palabras] | [Written by the artist, in English · biography, 80 to 120 words] |
| Rótulo historia | Rotular | Historia y proceso | Practice |
| Historia | Marcar el hueco | [Lo escribe cada artista · cómo trabaja, desde cuándo, qué mueve su obra] | [Written by the artist, in English · how they work, since when, what drives the work] |
| Foto opcional (marcador) | Marcar el hueco | [Foto opcional, por ejemplo del taller] | [Optional photo, such as the studio] |
| Aviso bajo la foto | Explicar qué pasa si no hay | Maqueta · Si no hay foto, este espacio no aparece. | Mock-up · Without a photo, this space does not appear. |
| Siguiente | Seguir recorriendo | Artista B → | Artist B → |

- «Historia y proceso» es el nombre de su mapa; en EN, «History / process» era un calco y la palabra de galería es «Practice» (C28).
- **Marcadores sin género:** la v1 decía «Statement de la artista» y «qué la mueve», y el tercer artista todavía no existe.
- «80 a 120 palabras» es sugerencia nuestra, no un requisito (§10-15).

### 4 · Obras `/obras/`
**Única acción:** abrir una obra.

| Slot | ES | EN |
|---|---|---|
| H1 | Obras | Works |
| Filtros, conteo, vista, estado vacío | ver 4.4 | ver 4.4 |
| Tarjetas | ver 4.1 | ver 4.1 |

### 5 · Ficha de obra `/obras/<o>/`
**Única acción:** la de su estado (4.2). Textos en 4.2 y 4.3, más:

| Slot | Cuándo | ES | EN |
|---|---|---|---|
| Aviso al tocar Comprar | estado 1 | Maqueta · En el sitio, este botón abre el link de Mercado Pago de esta obra. Al marcarla vendida, desaparece. | Mock-up · On the live site, this button opens this work's Mercado Pago link. Once the work is marked sold, it disappears. |
| Estado de muestra (solo con «Lo editas tú» encendida) | estado 1 | Estado 1 de 4 · disponible, con precio y link de Mercado Pago: Comprar y Consultar. | Status 1 of 4 · available, with price and Mercado Pago link: Buy and Enquire. |
| | estado 2 | Estado 2 de 4 · disponible, sin precio o sin link: solo Consultar. | Status 2 of 4 · available, no price or no link: Enquire only. |
| | estado 3 | Estado 3 de 4 · vendida: solo Consultar. | Status 3 of 4 · sold: Enquire only. |
| | estado 4 | Estado 4 de 4 · colección privada: solo Consultar. | Status 4 of 4 · private collection: Enquire only. |
| Enlaces a las obras de muestra de cada estado (misma línea) | | Ver estado 1 · 2 · 3 · 4 | See status 1 · 2 · 3 · 4 |

Qué obra de relleno muestra cada estado lo fija la spec. Con la línea de estados, María y Javiera recorren los cuatro casos en cuatro toques.

### 6 · Ediciones `/ediciones/`
**Única acción:** abrir una edición.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 | Nombrar | Ediciones | Editions |
| Presentación | Marcar el hueco | [Lo escribe María · qué son las ediciones de Módulo 369, 2 o 3 frases] | [Written by María, in English · what the Módulo 369 editions are, 2 or 3 sentences] |
| Tapa (tipo · título) | Nombrar | Cuaderno · Edición 01 | Notebook · Edition 01 |
| `alt` de la tapa | | Portada de relleno: Edición 01 | Placeholder cover: Edition 01 |

Relleno: «Edición 01, 02, 03» / «Edition 01, 02, 03» (C08), para que ningún título choque con el Libro de Encuentro. Tipos: «Cuaderno», «Cuaderno», «Libro» / «Notebook», «Notebook», «Book». «Libro» como tipo de edición es palabra de su mapa («cuadernos/libros»); el choque con el Libro de Encuentro va a la reunión (§10-14).

### 7 · Edición `/ediciones/<e>/`
**Única acción:** ir a Amazon, a la edición del idioma de la página.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Volver | Orientar | ← Ediciones | ← Editions |
| Tipo | Nombrar | Cuaderno | Notebook |
| H1 | Nombrar | Edición 01 | Edition 01 |
| Descripción | Marcar el hueco | [Lo escribe María · descripción de la edición, un párrafo] | [Written by María, in English · about the edition, one paragraph] |
| Rótulo de datos | Rotular | Detalles | Details |
| Páginas | | Páginas: [nº de páginas] | Pages: [page count] |
| Formato | | Formato: [medidas y encuadernación] | Format: [size and binding] |
| Botón principal | Llevar a comprar | Comprar en Amazon | Buy on Amazon |
| Enlace de texto (otro idioma) | Dar la otra edición | Edición en inglés → | Spanish edition → |
| Aviso al tocar el botón | | Maqueta · En el sitio, este botón abre esta edición en Amazon, en español. | Mock-up · On the live site, this button opens this edition on Amazon, in English. |
| Aviso al tocar el enlace | | Maqueta · En el sitio, este enlace abre la edición en inglés en Amazon. | Mock-up · On the live site, this link opens the Spanish edition on Amazon. |
| Rótulo de interiores | Rotular | Páginas interiores | Inside pages |
| Marcador de cada interior | Marcar el hueco | [página interior] | [inside page] |

- **Un botón, no dos.** El brief §3 pide ir a la edición del idioma de la página. El otro idioma queda como enlace de texto porque su mapa dice «Amazon KDP (ES/EN)» y un lector en Chile puede querer la edición en inglés. Si la spec lo quiere estricto, el enlace se borra sin tocar nada más.
- **Se borró** el corchete con raya larga de Páginas y Formato (raya prohibida y hueco mudo) y la frase «Los botones llevan a la ficha de Amazon KDP en cada idioma», que pasa a aviso al tocar.

### 8 · Encuentro `/encuentro/`
**Única acción:** activar un encuentro.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 / rótulo | Nombrar | Encuentro | Encuentro |
| Contador (h1 accesible: «Encuentro, 7 de 369 activados») | Mostrar cuántos van | 007/369 | 007/369 |
| Bajo el contador | Marcar el relleno | activados · de muestra | activated · samples |
| Enlace vertical a la derecha | Llevar al Libro | Libro → | Libro → |
| aria-label del enlace vertical | | Libro: el registro de cada encuentro activado | Libro: the record of every activated Encuentro |
| H2 | Rotular | Qué es | About Encuentro |
| Qué es | Marcar el hueco | [Lo escribe María · qué es Encuentro: la caja, qué trae y qué se hace con ella] | [Written by María, in English · what Encuentro is: the box, what it holds and what people do with it] |
| Marcador de foto | Marcar el hueco | [Foto de la caja] | [Photo of the box] |
| H2 | Rotular | Cómo funciona | How it works |
| Cómo funciona | Marcar el hueco | [Lo escribe María · cómo funciona, desde que se recibe la caja hasta que el encuentro queda en el Libro] | [Written by María, in English · how it works, from receiving the box to the Encuentro appearing in the Libro] |
| Aviso en línea, bajo «Cómo funciona» | Abrir la decisión §9-4 | Maqueta · Por decidir: quién sube cada registro al Libro. Si lo sube María desde el panel, está incluido. Si lo sube quien activó la caja, hace falta un formulario con fotos, moderación y almacenamiento, y eso se cotiza aparte. | Mock-up · To be decided: who uploads each record to the Libro. If María uploads it from the panel, it is included. If the person who activated the box uploads it, it needs a form with photos, moderation and storage, which is quoted separately. |
| H2 | Rotular | Formas de activación | Ways to activate |
| Formas de activación | Marcar el hueco | [Lo escribe María · formas de activación] | [Written by María, in English · ways to activate] |
| H2 | Rotular | Preguntas frecuentes | Frequently asked questions |
| Presentación de las preguntas | Marcar el hueco | [Lo escribe María · las preguntas que de verdad le hacen sobre la caja, con su respuesta] | [Written by María, in English · the questions people actually ask about the box, with answers] |
| Tres preguntas plegadas (`<details>`) | | [Pregunta] / [Respuesta] | [Question] / [Answer] |
| Botón | Pedir la acción | Activar un encuentro → | Activate an Encuentro → |

- **Se borraron los cuatro pasos de «Cómo funciona»** de la v1 (y los dos procesos A/B que proponía C09): describían como hecho un proceso de su obra que inventamos nosotros, y el paso «Lo registras con una foto» daba por incluido el flujo del público que el brief marca fuera de alcance. El brief §7 pide corchete; la pregunta de alcance la abre el aviso, sin escribirle el proceso.
- **Se borraron** «individual, en grupo, por encargo…» (modalidades que ella nunca nombró) y «Sección en prototipo: el texto definitivo lo escribe María» (lo dicen ya los corchetes).
- Las preguntas frecuentes no se inventan (detector B3): el corchete le pide las que de verdad le hacen.

### 9 · Activar un encuentro `/encuentro/activar/`
**Única acción:** enviar la solicitud o comprar la caja (las dos, porque §9-4 está abierta).

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Volver | Orientar | ← Encuentro | ← Encuentro |
| H1 | Nombrar | Activar un encuentro | Activate an Encuentro |
| Proceso | Rótulo + hueco | Proceso · [Lo escribe María · el proceso, de la solicitud o la compra hasta el registro en el Libro] | Process · [Written by María, in English · the process, from request or purchase to the record in the Libro] |
| Qué recibes | Rótulo + hueco | Qué recibes · [Lo escribe María · qué trae la caja] | What you receive · [Written by María, in English · what the box holds] |
| Tiempos | Rótulo + hueco | Tiempos · [Lo escribe María · plazos de envío y de activación] | Timing · [Written by María, in English · shipping and activation times] |
| Registro fotográfico | Rótulo + hueco | Registro fotográfico · [Lo escribe María · cómo se registra el encuentro y cuándo aparece en el Libro] | Photo record · [Written by María, in English · how the Encuentro is recorded and when it appears in the Libro] |
| Aviso en línea, antes de las dos opciones | Abrir la decisión §9-4 | Maqueta · Por decidir: si la caja se pide con este formulario o se compra con su botón de Mercado Pago, como una obra. La maqueta muestra las dos. | Mock-up · To be decided: whether the box is requested through this form or bought with its Mercado Pago button, like a work. The mock-up shows both. |
| Opción 1: título | Rotular | Pedir la caja | Request the box |
| Formulario | | ver 4.5 (Nombre, Correo, pregunta de María, Enviar solicitud) | ver 4.5 |
| aria-label del formulario | | Pedir la caja | Request the box |
| Opción 2: título | Rotular | Comprar la caja | Buy the box |
| Precio | Marcar el hueco | [precio de la caja] | [box price] |
| Botón | Pedir la acción | Comprar con Mercado Pago | Buy with Mercado Pago |
| Aviso al tocar Comprar | | Maqueta · Si la caja se vende, este botón abre su link de Mercado Pago, como el de una obra. | Mock-up · If the box is sold, this button opens its Mercado Pago link, like a work's. |
| Aviso al enviar | | Maqueta · No se envió nada. En el sitio, la solicitud llega al correo de Módulo 369. | Mock-up · Nothing was sent. On the live site, the request goes to the Módulo 369 inbox. |

«Proceso» es la viñeta de su mapa que faltaba en la v1 (C40). **Se cortó el círculo** de la v1: «Comprar la caja» ya no lleva a Tienda; muestra el aviso.

### 10 · Libro `/encuentro/libro/`
**Única acción:** abrir un encuentro.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Volver | Orientar | ← Encuentro | ← Encuentro |
| H1 | Nombrar | Libro | Libro |
| Bajada | Orientar (sobre todo en EN, porque «Libro» no se traduce) | El registro de cada encuentro activado. | The record of every activated Encuentro. |
| Contador | Contar y marcar el relleno | Activados: 7 de 369 · los 7 son de muestra | Activated: 7 of 369 · all 7 are samples |
| Casilla activa (aria-label) | | Encuentro 001, de muestra | Encuentro 001, sample |
| Casilla del próximo (aria-label, si la spec la marca) | | 008, el próximo | 008, next |
| Aviso en línea, bajo la grilla | Decir qué se ve al principio | Maqueta · En el sitio, mientras no haya encuentros activados, el Libro muestra las 369 posiciones vacías. | Mock-up · On the live site, until the first Encuentro is activated, the Libro shows all 369 positions empty. |

El enlace vertical de Encuentro se llama «Libro» (brief §3, su boceto), en los dos idiomas, hasta que María confirme el nombre.

### 11 · Encuentro activado `/encuentro/libro/<nnn>/`
**Única acción:** volver al Libro.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| Contador (h1 accesible: «Encuentro 001 de 369») | Nombrar | 001/369 | 001/369 |
| Marca de relleno | Marcar | De muestra | Sample |
| Fecha | Dato + hueco | Fecha: [fecha] | Date: [date] |
| Lugar | Dato + hueco | Lugar: [lugar aproximado] | Place: [approximate location] |
| Descripción | Marcar el hueco | [Lo escribe María · 2 o 3 líneas sobre el encuentro] | [Written by María, in English · 2 or 3 lines about the Encuentro] |
| Marcador de foto | Marcar el hueco | [Registro fotográfico · encuentro 001] | [Photo record · Encuentro 001] |
| Volver | Pedir la acción | ← Libro | ← Libro |

**Se borró** «Fecha: 2026» (un dato inventado que parecía real) y la foto de una obra de la Artista B como registro: un encuentro no es una obra de artista.

### 12 · Acerca `/acerca/`
**Única acción:** ir a Artistas.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 | Nombrar | Acerca de Módulo 369 | About Módulo 369 |
| Enunciado | Marcar el hueco | [Lo escribe María · enunciado de Módulo 369: 2 o 3 frases, qué es y qué mira] | [Written by María, in English · Módulo 369 statement: 2 or 3 sentences, what it is and what it looks at] |
| Las tres palabras (sin rótulo) | Contenido de su mapa | mirar · seleccionar · decidir | look · select · decide |
| Desarrollo | Marcar el hueco | [Lo escribe María · qué es mirar, seleccionar y decidir en Módulo 369] | [Written by María, in English · what looking, selecting and deciding mean at Módulo 369] |
| Aviso en línea | Decir de dónde salen | Maqueta · Las tres palabras son del mapa del sitio de María. | Mock-up · The three words come from María's site map; the English is our proposed translation, for her to confirm. |
| H2 | Rotular | Criterio curatorial | Curatorial approach |
| Criterio | Marcar el hueco | [Lo escribe María · cómo se eligen artistas y obras] | [Written by María, in English · how artists and works are chosen] |
| H2 | Rotular | Visión | Vision |
| Visión | Marcar el hueco | [Lo escribe María · hacia dónde va Módulo 369] | [Written by María, in English · where Módulo 369 is heading] |
| Enlace | Pedir la acción | Ver los artistas → | See the artists → |

- **Se borró** el rótulo «la acción» sobre las tres palabras: sin rótulo, las palabras quedan sin explicar, que es lo que ella pidió; el corchete de abajo es donde ella las explica si quiere.
- Ningún bloque habla de María como persona (brief §7).

### 13 · Tienda `/tienda/`
**Única acción:** ir a una obra disponible.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 | Nombrar | Tienda | Shop |
| H2 | Rotular | Obras disponibles | Available works |
| Tarjetas (una disponible por artista, C13) | | ver 4.1 | ver 4.1 |
| Enlace | Llevar | Ver todas en Obras → | See all in Works → |
| Sin obras disponibles (estado del sitio) | Dar salida | No hay obras disponibles en este momento. | No works are available right now. |
| Acción del estado vacío | | Ver todas las obras → | See all works → |
| H2 | Rotular | Encuentro | Encuentro |
| Caja | Marcar el hueco | [Lo escribe María · qué trae la caja y su precio] | [Written by María, in English · what the box holds and its price] |
| Botón | | Comprar la caja | Buy the box |
| Aviso al tocar | | (el mismo de la vista 9) | (the same as view 9) |
| Enlace | | Activar un encuentro → | Activate an Encuentro → |
| H2 | Rotular | Ediciones | Editions |
| Tapas | | ver vista 6 | ver vista 6 |
| H2 | Rotular | Cómo se compra | How to buy |
| Obras | Decir la vía | Obras: desde su ficha, con el botón Comprar. El pago se hace en Mercado Pago, obra por obra; no hay carrito. | Works: from each work's page, with the Buy button. Payment goes through Mercado Pago, one work at a time; there is no cart. |
| Consultas | Bajar el miedo a comprar sin hablar | Si una obra no tiene botón Comprar, o prefieres conversarlo antes, usa Consultar en su ficha o escribe desde Contacto. | If a work has no Buy button, or you would rather talk first, use Enquire on its page or write from Contact. |
| Encuentro | Decir la vía | Encuentro: la caja se pide o se compra en Activar un encuentro. | Encuentro: the box is requested or bought on Activate an Encuentro. |
| Ediciones | Decir la vía | Ediciones: en Amazon, en español y en inglés, desde la página de cada una. | Editions: on Amazon, in Spanish and English, from each edition's page. |
| Aviso en línea, bajo «Cómo se compra» | Marcar lo no incluido (brief §8-2) | Maqueta · El carrito (carro, pago dentro del sitio y stock) no está incluido: es la tienda completa y se cotiza aparte. Lo incluido es el botón Comprar en cada obra, con su link de Mercado Pago. | Mock-up · The cart (basket, on-site payment and stock) is not included: it is the full shop, quoted separately. What is included is the Buy button on each work, with its Mercado Pago link. |

**Decisión: la maqueta no escribe la cifra de la tienda completa** (ni «desde $450.000 + IVA» ni ninguna otra). Por qué:
1. Las dos fuentes no coinciden: `BRIEF.md` dice «desde $450.000 + IVA» y la cotización enviada dice «se cotiza tras una reunión» (diagnóstico, decisiones de criterio).
2. Un precio de SpindleLab escrito dentro de la Tienda de la galería mezcla la venta de la agencia con la página que lee el comprador de María, y queda en las capturas y en un link que cualquiera con la URL puede abrir.
3. El brief §9 ya dice que eso **se le comunica en la reunión**: lo dice Ramón en voz alta, con la cifra que él confirme.
4. Si la spec igual quiere mostrarla, va solo en el aviso de maqueta, nunca en la voz de la galería, y después de que Ramón elija la cifra.

**Se borró:** el bloque «Próximamente · [Futuras categorías]» (una promesa sin fecha; el borrador §3 dice que no se muestra hasta que exista una categoría), la frase que mezclaba la voz de la galería con el alcance («El carrito de compra es una etapa posterior») y el texto suelto «Se compran en Amazon…» del bloque Ediciones, que ahora está una sola vez, en «Cómo se compra».
El criterio §7 («Tienda dice cómo se compra cada cosa y que no hay carrito») queda cumplido por la línea de Obras.

### 14 · Contacto `/contacto/`
**Única acción:** enviar la consulta.

| Slot | Trabajo | ES | EN |
|---|---|---|---|
| H1 | Nombrar | Contacto | Contact |
| Formulario | | ver 4.5 (Nombre, Correo, Consulta, Enviar consulta) | ver 4.5 |
| aria-label del formulario | | Contacto | Contact |
| Aviso al enviar | | Maqueta · No se envió nada. En el sitio, la consulta llega al correo de Módulo 369. | Mock-up · Nothing was sent. On the live site, the enquiry goes to the Módulo 369 inbox. |
| Rótulo + correo | Dar la vía directa | Correo · hola@modulo369.com | Email · hola@modulo369.com |
| Aviso en línea, bajo el correo | Marcar lo que no existe | Maqueta · Esta casilla todavía no existe: se crea con el correo del dominio (Zoho o Google Workspace, por decidir). | Mock-up · This inbox does not exist yet: it is set up with the domain's email (Zoho or Google Workspace, to be decided). |
| Rótulo + cuenta | | Instagram · [@cuenta de Instagram de Módulo 369] | Instagram · [@Módulo 369 Instagram account] |
| Rótulo | | Newsletter | Newsletter |
| Campo y botón | | Tu correo · Suscribirme | Your email · Subscribe |
| Aviso en línea, siempre visible | Marcar lo no incluido (brief §7) | Maqueta · El newsletter no está incluido: necesita un servicio externo, con cuenta a nombre de María, y se contrata aparte. | Mock-up · The newsletter is not included: it needs an external service, in María's name, contracted separately. |
| Aviso al tocar Suscribirme | | Maqueta · No se suscribió nada: el newsletter no está incluido. | Mock-up · Nothing was subscribed: the newsletter is not included. |

**Recomiendo mostrar el newsletter**, marcado: está en su mapa, y si no aparece la pregunta «¿y el newsletter?» llega igual, sin la respuesta a la vista. Si la spec lo saca, se borran tres filas y el criterio §7 sigue cumplido («si aparece»).

---

## 6 · Inventario de corchetes (la lista de lo que escriben ellas)

Sirve también en la reunión, como mapa de qué textos tiene que entregar María, en los dos idiomas.

| # | Vista | Qué va | Quién | Largo |
|---|---|---|---|---|
| 1 | Artistas | Visión curatorial | María | un párrafo |
| 2 | Artista | Statement | cada artista | un párrafo |
| 3 | Artista | Biografía | cada artista | 80 a 120 palabras (sugerido) |
| 4 | Artista | Historia y proceso | cada artista | libre |
| 5 | Artista | Foto opcional | cada artista | una foto |
| 6 | Ficha | Descripción de la obra (opcional) | María o cada artista | 2 a 4 líneas |
| 7 | Ficha | Precio | María, con cada artista | dato |
| 8 | Ediciones | Qué son las ediciones | María | 2 o 3 frases |
| 9 | Edición | Descripción, páginas, formato | María | un párrafo + 2 datos |
| 10 | Encuentro | Qué es, cómo funciona, formas de activación, preguntas frecuentes | María | libre |
| 11 | Activar | Proceso, qué recibes, tiempos, registro fotográfico, pregunta del formulario, precio de la caja | María | libre |
| 12 | Encuentro activado | Fecha, lugar aproximado, descripción | María (si §9-4 dice que los sube ella) | 2 o 3 líneas |
| 13 | Acerca | Enunciado, desarrollo de mirar · seleccionar · decidir, criterio curatorial, visión | María | 2 o 3 frases cada uno |
| 14 | Tienda | Qué trae la caja y su precio | María | una línea + dato |
| 15 | Contacto | Cuenta de Instagram | María | dato |

Todos los de la lista del brief §7-4 están: bio, statement, historia/proceso, visión curatorial, enunciado, criterio, descripción de cada obra y edición, Instagram, los textos de Encuentro y Activar, y la fecha, el lugar y la descripción de cada encuentro de muestra.

## 7 · Avisos de maqueta (todos)

| Disparador | Vista | ES | EN |
|---|---|---|---|
| Al tocar Comprar (obra) | 5 | Maqueta · En el sitio, este botón abre el link de Mercado Pago de esta obra. Al marcarla vendida, desaparece. | Mock-up · On the live site, this button opens this work's Mercado Pago link. Once the work is marked sold, it disappears. |
| Al tocar Comprar la caja | 9, 13 | Maqueta · Si la caja se vende, este botón abre su link de Mercado Pago, como el de una obra. | Mock-up · If the box is sold, this button opens its Mercado Pago link, like a work's. |
| Al tocar Comprar en Amazon | 7 | Maqueta · En el sitio, este botón abre esta edición en Amazon, en español. | Mock-up · On the live site, this button opens this edition on Amazon, in English. |
| Al tocar el enlace del otro idioma | 7 | Maqueta · En el sitio, este enlace abre la edición en inglés en Amazon. | Mock-up · On the live site, this link opens the Spanish edition on Amazon. |
| Al enviar Contacto | 14 | Maqueta · No se envió nada. En el sitio, la consulta llega al correo de Módulo 369. | Mock-up · Nothing was sent. On the live site, the enquiry goes to the Módulo 369 inbox. |
| Al enviar Activar | 9 | Maqueta · No se envió nada. En el sitio, la solicitud llega al correo de Módulo 369. | Mock-up · Nothing was sent. On the live site, the request goes to the Módulo 369 inbox. |
| Al tocar Suscribirme | 14 | Maqueta · No se suscribió nada: el newsletter no está incluido. | Mock-up · Nothing was subscribed: the newsletter is not included. |
| En línea | 14 | Maqueta · El newsletter no está incluido: necesita un servicio externo, con cuenta a nombre de María, y se contrata aparte. | Mock-up · The newsletter is not included: it needs an external service, in María's name, contracted separately. |
| En línea | 14 | Maqueta · Esta casilla todavía no existe: se crea con el correo del dominio (Zoho o Google Workspace, por decidir). | Mock-up · This inbox does not exist yet: it is set up with the domain's email (Zoho or Google Workspace, to be decided). |
| En línea | 13 | Maqueta · El carrito (carro, pago dentro del sitio y stock) no está incluido: es la tienda completa y se cotiza aparte. Lo incluido es el botón Comprar en cada obra, con su link de Mercado Pago. | Mock-up · The cart (basket, on-site payment and stock) is not included: it is the full shop, quoted separately. What is included is the Buy button on each work, with its Mercado Pago link. |
| En línea | 8 | Maqueta · Por decidir: quién sube cada registro al Libro. Si lo sube María desde el panel, está incluido. Si lo sube quien activó la caja, hace falta un formulario con fotos, moderación y almacenamiento, y eso se cotiza aparte. | Mock-up · To be decided: who uploads each record to the Libro. If María uploads it from the panel, it is included. If the person who activated the box uploads it, it needs a form with photos, moderation and storage, which is quoted separately. |
| En línea | 9 | Maqueta · Por decidir: si la caja se pide con este formulario o se compra con su botón de Mercado Pago, como una obra. La maqueta muestra las dos. | Mock-up · To be decided: whether the box is requested through this form or bought with its Mercado Pago button, like a work. The mock-up shows both. |
| En línea | 10 | Maqueta · En el sitio, mientras no haya encuentros activados, el Libro muestra las 369 posiciones vacías. | Mock-up · On the live site, until the first Encuentro is activated, the Libro shows all 369 positions empty. |
| En línea | 12 | Maqueta · Las tres palabras son del mapa del sitio de María. | Mock-up · The three words come from María's site map; the English is our proposed translation, for her to confirm. |
| En línea | 3 | Maqueta · Si no hay foto, este espacio no aparece. | Mock-up · Without a photo, this space does not appear. |
| Solo si se usa la opción B del inicio | 1 | Maqueta · Propuesta: es una frase de tu correo del 26-sep. Va solo si tú lo decides. | Mock-up · Proposal: it is a line from your email of 26 Sep. It only goes in if you say so. |

- El prefijo «Maqueta ·» / «Mock-up ·» va **en el texto**, no en un `::before` de CSS: así se traduce con el resto.
- Los avisos hablan de María en tercera persona, salvo el de la opción B, que se le dirige a ella porque le pregunta algo suyo.
- Todo aviso nombra lo que no está incluido sin cifras.

## 8 · Capa «Lo editas tú»

Cada etiqueta dice en una frase qué parte cambia María desde el panel. Habla de tú porque la capa es para ella. **Solo nombra lo que el panel previsto hace** (colecciones de Decap, lista ordenable, imágenes, campos de texto en dos idiomas); lo marcado con (v) depende de cómo se construya y está en §10-12.

| Pieza (dónde va el atributo) | ES | EN |
|---|---|---|
| Carrusel de portada | Portada: eliges qué obras van y en qué orden. | Home: you choose which works appear, and in what order. |
| Tarjeta de obra | Obra: fotos, título, técnica, medidas, precio y link de Mercado Pago. Título y técnica, en los dos idiomas. | Work: photos, title, medium, dimensions, price and Mercado Pago link. Title and medium in both languages. |
| Datos de la ficha (fila Disponibilidad) | Estado: Disponible, Vendida o Colección privada. Al marcarla Vendida, el botón Comprar desaparece solo. (v) | Status: Available, Sold or Private collection. Mark it Sold and the Buy button disappears on its own. (v) |
| Fila Precio de la ficha | Precio: lo muestras o lo dejas «a consultar», obra por obra. | Price: show it or leave it "on request", work by work. |
| Índice de Artistas | Artistas: cada artista que sumas en el panel aparece aquí. | Artists: every artist you add in the panel appears here. |
| Cabecera de la página de artista | Artista: nombre, statement, biografía, historia y proceso, foto y obras, en los dos idiomas. | Artist: name, statement, biography, practice, photo and works, in both languages. |
| Tapa de edición | Edición: portada, texto, páginas interiores y links de Amazon. | Edition: cover, text, inside pages and Amazon links. |
| Casilla activa del Libro y ficha del encuentro | Encuentro: número, foto, fecha, lugar y texto, si los registros los subes tú (por decidir). | Encuentro: number, photo, date, place and text, if you upload the records (to be decided). |
| Contador del Libro y de Encuentro | Contador: suma solo cada encuentro que publicas. (v) | Counter: adds up each Encuentro you publish, on its own. (v) |
| Todo texto entre corchetes | Texto: lo cargas tú en el panel, en español y en inglés. | Text: you add it in the panel, in Spanish and English. |
| Correo e Instagram de Contacto | Datos de contacto: los cambias en el panel. (v) | Contact details: you change them in the panel. (v) |
| Menú, pie, botones y «Cómo se compra» | Texto fijo: no se cambia desde el panel; está en el código. | Fixed text: not editable in the panel; it lives in the code. |

- La última fila es la de **textos fijos NO**: va en el menú, en el pie, en un botón de cada vista y en «Cómo se compra». Dice la verdad sin prometer quién los cambia después.
- Las líneas de estado de muestra de la ficha (vista 5) aparecen solo con esta capa encendida.
- **Se borró** de las etiquetas cualquier campo que el panel no va a tener («palabra de portada», por ejemplo, como advertía C15).

---

## 9 · Pasada de borrado y pasada de voz

**Borrado.** De los 25 textos en voz de la galería que tenía la v1 (titulares, bajadas, frases sueltas, susurros; sin contar rótulos ni etiquetas), 19 se borran o pasan a corchete, 4 se reescriben («Galería de arte contemporáneo», «Cómo se compra», la frase de Amazon de Tienda y la de la ficha de edición) y 2 se quedan («Qué es Encuentro →» y el 404). Lo que entra nuevo es casi todo de las otras capas: corchetes que dicen quién escribe, avisos al usar y la capa «Lo editas tú».

| Se borró (v1) | Por qué |
|---|---|
| «Una galería de arte contemporáneo que crece de a tres.» | Inventado, «contemporáneo» no es suyo, nombra el plan |
| «hallazgo, accidente» · «Hallazgo» · «3 / 6 / 9» · «la acción» | Nombran el concepto en vez de hacerlo pasar |
| Enunciado en el inicio | Duplicado con Acerca: un texto que María tendría que escribir dos veces |
| «Tres artistas para empezar. Después seis, después nueve.» | Explica el crecimiento |
| Los «lenguajes» de cada artista | Dos repetían el vocabulario de María; en el sitio no hay ese campo |
| «Todas las obras» · «Cuadernos y libros» · «Obras, encuentros y ediciones» | Repiten el rótulo o lo de abajo |
| Las dos descripciones de Encuentro y los 4 pasos de «Cómo funciona» | Describían como hecho un proceso suyo que inventamos nosotros |
| «individual, en grupo, por encargo…» · «¿Dónde y con quién harías el encuentro?» | Modalidades y preguntas que ella no nombró |
| «Sección en prototipo: el texto definitivo lo escribe María.» | Lo dicen los corchetes |
| «Orden, con pequeñas disrupciones.» | Correo privado; describe la web; nombra el concepto |
| «Próximamente · [Futuras categorías]» | Promesa sin fecha de algo que no se muestra hasta que exista |
| «Escríbenos» / «Write to us» | Plural de tamaño / calco |
| «Por definir» · el guion como precio vacío · el corchete con raya larga | Suena a indecisión; una raya no es un valor; raya larga en la interfaz |
| Código de obra (C-04) en el Índice y en la ficha | En el sitio no hay campo de inventario |
| «modulo369.cl» en el pie | Solo redirige |
| «Requires choosing a newsletter service (not included in the quote)» | Voz de la agencia hablándole a un visitante en inglés; pasa a aviso de maqueta |

**Voz (leído en voz alta).** Las líneas de «Cómo se compra» suenan a lo que diría quien atiende la galería si alguien pregunta cómo comprar: una vía por cosa y sin adjetivos. Lo único que no pasó la lectura fue la línea que proponía C13, «Para quien prefiere conversar antes de comprar», que sonaba a folleto; quedó como «o prefieres conversarlo antes», dentro de la línea de Consultas. En EN se revisaron los calcos de C28 («Curatorial criteria» → «Curatorial approach», «History / process» → «Practice», «Interior photos» → «Inside pages», «Write to us» → fuera) y la minúscula de «encuentro» dentro de frases en inglés.
**Registro:** tú en todos los textos fijos y en la capa «Lo editas tú»; tercera persona en corchetes y avisos. Cero «usted», cero «nosotros».
**Borrar 30% más:** lo probé sobre «Cómo se compra», que es el bloque más largo de voz de la galería. Si se saca la línea de Consultas, quien llega a una obra en estado 2, 3 o 4 no sabe qué hacer; si se saca la de Ediciones, no se cumple «cómo se compra cada cosa». Queda así.

## 10 · Afirmaciones a verificar antes de mostrar o publicar

| # | Texto | Dónde | Respaldo hoy | Qué falta y quién |
|---|---|---|---|---|
| 1 | «Galería de arte en línea» / «Online art gallery» | Pie | Ficha de la clienta y brief («en línea»); `BRIEF.md` titula «galería de arte virtual» | Confirmar con María cuál usa ella |
| 2 | «hola@modulo369.com» | Contacto | Brief: hola@ y ventas@ por crear | La casilla no existe (§9-5). ¿Contacto muestra hola@ o ventas@? Ramón/María |
| 3 | «modulo369.com» | Pie | Dominio de María según su correo | Acceso a GoDaddy sin confirmar (§9-5) |
| 4 | «Al marcarla vendida, el botón Comprar desaparece» | Ficha, aviso, capa | Compromiso 3 del 24-sep | Construirlo así en producción |
| 5 | «No hay carrito: cada obra se paga por separado» | Tienda | Borrador §8-1 | Ninguno |
| 6 | «El carrito … se cotiza aparte» (sin cifra) | Tienda | Brief §9 | La cifra no se escribe; la dice Ramón en la reunión (BRIEF «desde $450.000 + IVA» y cotización «se cotiza tras una reunión» no coinciden) |
| 7 | «El newsletter no está incluido … se contrata aparte», «con cuenta a nombre de María» | Contacto | Brief §9; compromiso 2 (cuentas a su nombre) | Que «a su nombre» aplique también al newsletter lo confirma Ramón |
| 8 | «En Amazon, en español y en inglés» y el enlace a la otra edición | Tienda, Edición | Su mapa («Amazon KDP (ES/EN)») | Confirmar que cada edición existe en los dos idiomas; si una no, su enlace secundario no aparece |
| 9 | «Si lo sube quien activó la caja … se cotiza aparte» | Encuentro | Brief §9-4 y borrador §8-3: «sale del alcance» | Ramón: ¿se cotiza o no se ofrece? Si no se ofrece, el aviso dice «no está incluido» y se borra «se cotiza aparte» |
| 10 | «007/369 · activados · de muestra», «7 de 369» | Inicio, Encuentro, Libro | Relleno marcado | En producción parte en 0 (borrador §7) |
| 11 | «La consulta / la solicitud llega al correo de Módulo 369» | Avisos de formulario | Borrador §7 (prueba de envío) | Depende del proveedor de formularios (borrador §9-b, Ramón) |
| 12 | Capa «Lo editas tú»: orden de portada (lista ordenable de Decap: sí), botón que desaparece solo (v), precio o «a consultar» por obra (supuesto del brief), artistas que aparecen al sumarlas (colección: sí), contador que suma solo (v), datos de contacto editables (v) | Capa | Brief §10 (capa aprobada), borrador §7 | Las (v) se construyen así o se borra su etiqueta antes de la reunión |
| 13 | «Las tres palabras son del mapa del sitio de María» y «look · select · decide» | Acerca | `BRIEF.md`, mapa §6 | La traducción la confirma María |
| 14 | «Libro» como nombre del registro y «Libro» como tipo de edición | Encuentro, Ediciones | Su boceto y su mapa | Brief §3: «Libro» hasta que María confirme. Preguntar si los dos usos conviven |
| 15 | «80 a 120 palabras» | Artista | Sugerencia nuestra (diagnóstico C29) | No es requisito; se le dice así |
| 16 | Su frase como titular (opción B del inicio) | Inicio | Correo privado del 26-sep | Brief §5: publicarla textual no está consultado. Solo con su OK |
| 17 | Títulos, técnicas, medidas y años de las obras | Todas | Relleno bajo aviso global (brief §6) | Ninguno en la maqueta; nada de esto llega a producción |
| 18 | «Aquí llega la respuesta» | Formularios | Que María responde por correo | Ninguno; no promete plazo |

## 11 · Lo que decide la spec (con mi recomendación)

| # | Decisión | Recomiendo | Alternativa |
|---|---|---|---|
| 1 | Titular del inicio | A: «Módulo 369», sin frase (2.2) | B: su frase, con la nota de propuesta |
| 2 | Palabra enorme | «Artistas» / «Artists» (2.3) | «Encuentro» |
| 3 | Palabra casi escondida | «Libro», enlace chico en una casilla vacía (2.4) | «índice» |
| 4 | Avisos | Al usar, más los en línea de §7; sin botón «Notas» | Botón «Notas» / «Notes» |
| 5 | Botón Comprar | «Comprar con Mercado Pago» | «Comprar» + «Mercado Pago» chico debajo, si a 390 no cabe |
| 6 | Amazon | Botón del idioma de la página + enlace de texto al otro | Solo el botón |
| 7 | Newsletter | Visible y marcado | Fuera |
| 8 | Contador de Encuentro | «007/369», cuántos van, marcado de muestra | «001/369» como formato de numeración |
| 9 | Inglés | Británico (Enquire) | Americano (Inquire), en tres textos |
| 10 | Selector 3 · 6 · 9 (C22) | Copy listo en la vista 2 si entra | |

---

## 12 · Studio Iron: slots nuevos o cambiados (spec v2 §12)

> Lo escribe Clara el 5-oct (noche) contra `spec-visual.md` v2 §12, después de que Ramón pasara a Studio Iron como referencia dominante (brief §10, segunda corrección). Aquí va **el texto fijo**; el texto de muestra que pide §12 (slots 8, 9, 12, 13, 20, 27 y 28, más dos correcciones fuera de la lista) está en `copy-muestra.md` §14. **Donde esta sección contradice algo anterior de este documento, gana esta** (la lista exacta está en 12.0). Para revisión humana: lo aprueba Ramón antes de construir.
> **Medido, no estimado:** los anchos que se citan salen de Chrome headless con Archivo, IBM Plex Mono e Instrument Serif cargadas de Google Fonts, a los tamaños de la spec 1.2 (`scratchpad/clara-si/medir.html`).
> **Ningún slot pide algo que el brief prohíbe:** no hay cifras de precio, carrito, newsletter como función ni texto atribuido a María. Lo que entregué distinto de lo que proponía la spec está en 12.6, con su porqué.

### 12.0 · Qué cambia de este documento (y nada más)

| Dónde | Antes | Ahora | Por qué |
|---|---|---|---|
| 2.2 · Inicio | Sin titular visible; el enunciado vive solo en Acerca | Enunciado en el inicio: H2 + párrafo de muestra (copy-muestra §14.1) | Spec D4 y slot 8: Studio Iron lo tiene y es la palabra enorme a 390. El párrafo es el mismo de Acerca, así que María sigue escribiendo un texto |
| 3.3 · Botón del menú a 390 | «Menú» / «Cerrar» visibles | Sin texto visible; `aria-label` (12.1-1) | Spec 2.0.4: dos rayas, como Studio Iron |
| 3.4 · Pie | Nombre, descriptor, enlaces, dominio | Titular, enlace, tres columnas y línea legal (12.1-4 a 7) | Spec 2.0.14 |
| 4.1 · Pie de tarjeta y del carrusel | «Artista A · Campo 04, 2025» | Título «Campo 04 (2025)» a la izquierda, autor «ARTISTA A» a la derecha (12.2-10, 12.3-22) | Spec 2.0.6: el pie de tarjeta de Studio Iron |
| 4.1 · Técnicas de B | «Collage sobre papel» · «Papel recortado» | «Collage sobre cartón» · «Papel recortado sobre cartón» / «Collage on card» · «Cut paper on card» | El collage de M01 está pegado sobre cartón y el statement de B lo dice; la fila «Técnica» no puede decir otra cosa. Las opciones cortas del filtro no cambian |
| 4.2 · Botón Comprar | «Comprar con Mercado Pago» | Botón-fila «Comprar» · «Mercado Pago →» (12.3-25) | Es la variante corta que 4.2 ya dejaba prevista |
| 4.2 · Fila «Precio», estado 2 sin precio | «Precio a consultar» | «A consultar» / «On request» | La fila ya se llama «Precio»: se leía «PRECIO · Precio a consultar» |
| 4.3 · H1 de la ficha | «Campo 04», con fila «Año» | «Campo 04, 2025», sin fila «Año» (12.3-23) | Spec 2.5 |
| 4.4 · Filtros | `select` y vista «Muro · Índice» | Opciones de texto y vista «Muro · Lista» (12.3-21) | Spec D21 |
| 5-1 y 5-8 · Bajo el contador | «activados · de muestra» | «activados de muestra» / «sample activations» | Slot 11. Es la misma clave en Inicio y en Encuentro (`activadosMuestra`): cambia en las dos, y así hay un solo nombre |
| 5-7 · Botón de Edición | «Comprar en Amazon» | Botón-fila «Comprar» · «Amazon →» (12.4-29) | Paralelo exacto al de la obra; «Comprar en Amazon · AMAZON →» decía Amazon dos veces |
| 5-13 · Cómo se compra | Cuatro líneas con prefijo («Obras: …») | Cuatro frases completas, sin prefijo (12.3-26) | Spec 2.13 pone un H2 por vía; además las dos primeras se reusan en la ficha, donde no hay H2 |
| 5-14 · Contacto | Sin H2 de sección | H2 «Consultas» · «Correo» · «Instagram» · «Newsletter» (12.4-37) | Spec 2.14; «Formulario» cambia a «Consultas» (12.6) |
| 7 · Avisos | aviso único de la foto de Biografía | dos avisos, A y B/C (12.3-19) | Resuelve el desvío 14 |

### 12.1 · Cromo

| # | Slot | ES | EN | Nota |
|---|---|---|---|---|
| 1 | Botón de menú (≤ 1000), `aria-label` | Abrir menú · Cerrar menú | Open menu · Close menu | Ya no lleva texto visible. Con `aria-expanded` bastaría un rótulo fijo («Menú» / «Menu»); si la spec cambia el rótulo, estos son los dos |
| 2 | Panel y submenú Artistas: primera celda | Todos los artistas | All artists | La spec proponía «Todas las artistas»: ver 12.6-1. Mide 94,8 px en Archivo 500 12; cabe en la celda de 114 a 768 y de 97,9 a 1001 |
| 3 | Submenú a 390: volver | ‹ Volver | ‹ Back | `.etiqueta-ancha`, sale en mayúsculas |
| 3b | Ítem del menú a 390 que abre el subnivel | Artistas › | Artists › | El «›» va en Archivo 16 (spec 2.0.4) |
| 4 | **Titular del pie** (`--t-titulo` mayúscula; las tres palabras marcadas, en `<em>`) | Consulta por una *obra*, una *edición* o un *encuentro*. | Enquire about a *work*, an *edition* or an *Encuentro*. | 9 palabras en los dos idiomas. Lleva a Contacto con el enlace del slot 5. Medido: 740 px en una línea a 36 (cabe en `c1-5`, 781, a 1440); a 26, en 354 px, dos líneas |
| 5 | Enlace del pie (a Contacto) | Escribir a Módulo 369 → | Write to Módulo 369 → | 207 / 189 px en `.etiqueta-ancha`. No repite «consulta», que ya está en el titular |
| 6 | Rótulos de las columnas del pie | Galería · Módulo 369 · Redes | Gallery · Módulo 369 · Social | Los de Studio Iron son STUDIO · SUPPORT · SOCIAL |
| 6b | Contenido de Redes | @modulo369 | @modulo369 | Sin enlace y con su marca «muestra» (copy-muestra §9 y §13-2: la cuenta no está verificada) |
| 7 | Línea legal del pie | Módulo 369 · Galería de arte en línea · modulo369.com | Módulo 369 · Online art gallery · modulo369.com | El descriptor sigue por confirmar con María (§10-1) |

**Titular del pie, con los descartes a la vista** (paso 2):

| | Candidato | Por qué |
|---|---|---|
| **A · elegido** | Consulta por una *obra*, una *edición* o un *encuentro*. | Dice las tres cosas que se pueden pedir y usa el mismo verbo que el botón de la ficha («Consultar por esta obra»): un concepto, un nombre. Imperativo de tú, sin pregunta. Es lo que diría quien atiende la galería si alguien pregunta «¿y cómo pido algo?» |
| B | Escribe por una obra, una edición o un encuentro. | «Escribir por» en Chile se entiende como escribir en nombre de alguien |
| C | Para una obra, una edición o un encuentro, escribe. | El verbo al final suena a remate armado |
| descartado | El de Studio Iron («Be the first to hear about new objects, collections and studio news») | Es la invitación al newsletter, que no está incluido (brief §8-2) |

La serie de tres del titular no es tricolon de ritmo: son las tres vías reales de la galería, y la spec pide justamente tres palabras en itálica.

### 12.2 · Inicio

| # | Slot | ES | EN | Nota |
|---|---|---|---|---|
| 8 | Enunciado, H2 (`inicio.enunciado`) | muestra: copy-muestra §14.1 | | ≤ 7 palabras, punto final en cobalto |
| 9 | Enunciado, párrafo | muestra: `acerca.enunciado` tal cual (30 palabras) | | Confirmo que funciona en su nuevo lugar: desarrolla el H2 sin repetirlo |
| 10 | Línea de pie y controles del carrusel | Título: «{titulo} ({anio})», p. ej. «Línea 04 (2025)» · autor: «{artista}», sale «ARTISTA C» | «Line 04 (2025)» · «ARTIST C» | Reemplaza `pieCarrusel`. Medido a 390: título 84 + autor 49 + controles ≈ 306 px de 366: cabe en una línea |
| 10b | Controles | ← · 01 / 05 · → | igual | `aria-label` de las flechas: «Obra anterior» / «Obra siguiente» · «Previous work» / «Next work» (copy 5-1, sin cambio) |
| 11 | Banda Encuentro: rótulo | 007/369 · activados de muestra | 007/369 · sample activations | Gris, sin cobalto (D6). El mismo texto va bajo el contador de Encuentro (12.0) |
| 12 | Banda Encuentro: párrafo (`inicio.encuentro`) | muestra: copy-muestra §14.1 | | ≤ 30 palabras |
| 13 | Banda Ediciones: párrafo (`inicio.ediciones`) | muestra: `ediciones.presentacion` tal cual (25 palabras) | | Un texto de María sirve en los dos lugares |
| 14 | Enlaces de banda | Qué es Encuentro · Ver las ediciones | About Encuentro · See the editions | Los dos **sin flecha**: son la misma pieza (enlace de acción ancho) en dos bandas seguidas, y la spec 2.1 los escribe así |
| 15 | Tiras: `aria-label` de la pista | Obras · Artistas | Works · Artists | |
| 15b | Tiras: flechas, `aria-label` | Anterior · Siguiente | Previous · Next | Las flechas están fuera de la pista: que la línea de título sea un grupo con `aria-labelledby` al título de la tira, así el lector de pantalla dice «Obras, Siguiente» y no tres «Siguiente» iguales en la página |
| 16 | Tarjeta de artista: conteo | {n} obras · 1 obra | {n} works · 1 work | `.etiqueta`: sale «9 OBRAS» |

### 12.3 · Artista, Obras, Ficha

| # | Slot | ES | EN | Nota |
|---|---|---|---|---|
| 17 | Rótulo del hero | Detalle · Campo 01, 2025 | Detail · Field 01, 2025 | B: «Detalle · Recorte 09, 2026» / «Detail · Cut-out 09, 2026». C: «Detalle · Línea 08, 2026» / «Detail · Line 08, 2026». Años de `app.js` (01 a 04 son 2025; 05 a 09, 2026) |
| 17b | `alt` del hero | Detalle de relleno de Campo 01, de Artista A | Placeholder detail of Field 01, by Artist A | Patrón: «Detalle de relleno de {titulo}, de {artista}» |
| 18 | Rótulo de Biografía | Biografía | Biography | |
| 19 | Aviso de la imagen de Biografía, Artista A | Maqueta · La foto de taller es opcional. Si no hay, aquí va una obra. | Mock-up · The studio photo is optional. Without one, a work goes here. | Resuelve el desvío 14: dos avisos |
| 19b | Aviso de la imagen de Biografía, Artistas B y C | Maqueta · Si no hay foto de taller, aquí va una obra suya. | Mock-up · Without a studio photo, one of the artist's works goes here. | «Suya» concuerda con «obra» y no le pone género a la artista |
| 20 | Statement | muestra: copy-muestra §14.2 | | ≤ 35 palabras, sin comillas; B y C reescritos sobre M01 |
| 21 | Obras: filtro Artista (celdas) | Todos los artistas · Artista A · Artista B · Artista C | All artists · Artist A · Artist B · Artist C | Mismo texto que el slot 2: un concepto, un nombre. Sin rótulo de grupo (las celdas se explican solas) |
| 21b | Obras: filtro Técnica | Técnica: Todas · Óleo · Acrílico · Collage · Recortado · Tinta · Grafito | Medium: All · Oil · Acrylic · Collage · Cut paper · Ink · Graphite | Opciones cortas; la técnica larga queda en la ficha |
| 21c | Obras: filtro Tamaño | Tamaño (lado mayor): Todos · Hasta 50 cm · De 50 a 100 cm · Más de 100 cm | Size (longest side): All · Up to 50 cm · 50 to 100 cm · Over 100 cm | Los de copy 4.4, como pide el slot. **No** «Chico · Mediano · Grande» de la spec 2.4: ver 12.6-3. Medido: 316 / 262 px; a 390 pasa a dos líneas con `flex-wrap` |
| 21d | Obras: filtro Disponibilidad | Disponibilidad: Todas · Disponible · Vendida · Colección privada | Availability: All · Available · Sold · Private collection | |
| 21e | Vista | Vista: Muro · Lista | View: Wall · List | «Lista» reemplaza a «Índice». El rótulo «Vista» queda solo para lectores de pantalla a 390 (desvío 27) |
| 21f | Conteo, «Quitar filtros», «Filtrar», estado vacío | sin cambio (copy 4.4) | | |
| 21g | Lista (nivel 2): botón contorno por estado | Comprar · Consultar | Buy · Enquire | Corto porque va solo, bajo los datos de la obra |
| 22 | Pie de tarjeta | Campo 04 (2025) · ARTISTA A | Field 04 (2025) · ARTIST A | Chip: «Disponible» / «Vendida» / «Colección privada» (sin cambio) |
| 23 | **H1 de la ficha** | Campo 04, 2025 | Field 04, 2025 | Sale la fila «Año»; el `dl` queda Técnica · Medidas · Precio · Disponibilidad / Medium · Dimensions · Price · Availability |
| 24 | Rótulos de imagen, ficha | 01 · Vista general · 02 · Detalle | 01 · Full view · 02 · Detail | En los segmentos a ≤ 1000, el mismo texto sin el «·»: «01 Vista general» |
| 24b | Rótulos de imagen, Edición | 01 · Portada · 02 · Interior · 03 · Interior | 01 · Cover · 02 · Inside pages · 03 · Inside pages | |
| 25 | **Botón-fila**, estado 1 (lleno) | Comprar · Mercado Pago → | Buy · Mercado Pago → | Medido a 390 (318 px útiles dentro del botón): 64 + 114 px. Debajo, el enlace «Consultar por esta obra» / «Enquire about this work» |
| 25b | Botón-fila, estado 2 sin precio (lleno) | Consultar el precio · → | Enquire about the price · → | **No** «Consultar por esta obra · PRECIO A CONSULTAR»: ver 12.6-2. La fila Precio del `dl` dice «A consultar» / «On request» |
| 25c | Botón-fila, estado 2 con precio y sin link (lleno; no aparece en la maqueta) | Consultar por esta obra · → | Enquire about this work · → | El precio ya está en el `dl` |
| 25d | Botón-fila, estados 3 y 4 (contorno) | Consultar por esta obra · → | Enquire about this work · → | 168 px de 318: cabe |
| 26 | Resumen plegable de la ficha | › Cómo se compra | › How to buy | Contenido: `compraObras` y `compraConsultas` de 12.3-26b. Funcionan en la ficha porque ya no llevan el prefijo «Obras:» y son frases completas |
| 26b | Cómo se compra (Tienda y ficha) | **Obras:** Cada obra se compra desde su ficha, con el botón Comprar. El pago se hace en Mercado Pago, obra por obra; no hay carrito. · **Consultas:** Si una obra no tiene botón Comprar, o prefieres conversarlo antes, usa Consultar en su ficha o escribe desde Contacto. · **Encuentro:** La caja se pide o se compra en Activar un encuentro. · **Ediciones:** Cada edición se compra en Amazon, en español o en inglés, desde su página. | **Works:** Each work is bought from its own page, with the Buy button. Payment goes through Mercado Pago, one work at a time; there is no cart. · **Enquiries:** If a work has no Buy button, or you would rather talk first, use Enquire on its page or write from Contact. · **Encuentro:** The box is requested or bought on Activate an Encuentro. · **Editions:** Each edition is bought on Amazon, in Spanish or English, from its own page. | Lo que va en negrita es el H2 de Tienda (spec 2.13), no parte de la frase. El criterio del brief §7 («cómo se compra cada cosa y que no hay carrito») sigue cumplido por la línea de Obras |
| 27 | Descripciones de las 27 obras | muestra: copy-muestra §14.3 | | Escritas mirando las obras de M01 |

### 12.4 · Ediciones, Encuentro, Libro, Acerca, Tienda, Contacto

| # | Slot | ES | EN | Nota |
|---|---|---|---|---|
| 28 | Descripción breve de cada edición | muestra: copy-muestra §14.4 | | ≤ 35 palabras; es la misma en Ediciones y en Edición |
| 29 | Botón de cada edición (Ediciones) | Ver la edición | See the edition | Botón contorno |
| 29b | Botón-fila de la Edición (lleno) | Comprar · Amazon → | Buy · Amazon → | Ver 12.0. Debajo, sin cambio: «Edición en inglés →» / «Spanish edition →» |
| 29c | Bloque partido de Ediciones: tipo y emisor | Cuaderno / Libro · Módulo 369 | Notebook / Book · Módulo 369 | Sin cambio |
| 30 | Encuentro: categoría y títulos de bloque | Encuentro · Cómo funciona · Formas de activación | Encuentro · How it works · Ways to activate | Confirmados |
| 31 | Encuentro: enlace bajo la franja de registros | Ver el Libro | See the Libro | |
| 32 | Activar: categoría de cada opción | Opción 1 · Opción 2 | Option 1 · Option 2 | Títulos sin cambio: «Pedir la caja» / «Comprar la caja» |
| 32b | Activar: botones-fila | Enviar solicitud · → · Comprar con Mercado Pago · → | Send request · → · Buy with Mercado Pago · → | Aquí sí cabe «Comprar con Mercado Pago» (202 px): la derecha lleva solo la flecha. Si Lucía prefiere el mismo par que la obra: «Comprar» · «Mercado Pago →» |
| 33 | Encuentro activado: rótulo del carrusel | Otros encuentros del Libro | Other Encuentros in the Libro | La spec traía «encounters»: Encuentro no se traduce (§0) |
| 33b | Encuentro activado: paginación | ← 01 / 06 → | igual | `aria-label` de las flechas: «Encuentro anterior» / «Encuentro siguiente» · «Previous Encuentro» / «Next Encuentro» |
| 34 | Libro: pie del destacado y de los otros | Encuentro {nnn} | Encuentro {nnn} | Sin cambio |
| 35 | Tienda: opciones y conteo | Todo · Obras · Encuentro · Ediciones · «{n} piezas» / «1 pieza» | All · Works · Encuentro · Editions · «{n} pieces» / «1 piece» | |
| 35b | Tienda: estado vacío (spec 4.18) | No hay piezas en esta categoría por ahora. · Ver todas | Nothing in this category right now. · See all | Con los datos de la maqueta no aparece; queda escrito para el sitio |
| 35c | Tienda: título de la tarjeta de la caja y de cada tapa | Caja de Encuentro · Edición 01 | Encuentro box · Edition 01 | Autor a la derecha: «MÓDULO 369». La caja y las tapas no llevan año |
| 35d | Tienda: rótulo sobre los cuatro H2 de compra | Cómo se compra | How to buy | Recomendado: sin él, el H2 «Obras» bajo la grilla se lee como otra lista de obras (ver 12.6-6) |
| 36 | Tienda: chip de vía | Mercado Pago · Amazon | Mercado Pago · Amazon | Nombres propios, no se traducen |
| 36b | Tienda: botones | Comprar · Ver en Amazon | Buy · View on Amazon | Avisos al tocar: el de la ficha (obra), el de la caja (copy §7) y el de Amazon de la Edición, sin cambio |
| 37 | Contacto: H2 de las secciones | Consultas · Correo · Instagram · Newsletter | Enquiries · Email · Instagram · Newsletter | «Consultas» en vez de «Formulario»: 12.6-5 |
| 37b | Contacto: botón-fila del formulario | Enviar consulta · → | Send enquiry · → | |
| 37c | Contacto: campo del newsletter | Tu correo · Suscribirme → | Your email · Subscribe → | El aviso de no incluido sigue siempre visible (copy §7) |
| 38 | `alt` de las imágenes nuevas | tabla de abajo | | Todos dicen «de relleno» |

**Slot 38 · `alt` de las imágenes nuevas** (spec 3.1; ES y EN; los patrones usan los datos de `app.js`):

| Imagen (spec 3.1) | `alt` ES | `alt` EN |
|---|---|---|
| 3.1.1 · Láminas del carrusel y 3.1.2 · tarjetas de obra (vista en muro) | Obra de relleno: {titulo}, de {artista}, colgada en un muro | Placeholder work: {titulo}, by {artista}, hung on a wall |
| 3.1.3 · Tarjeta de artista y Biografía de B y C | el mismo patrón, con su obra (Campo 07, Recorte 07, Línea 07) | the same pattern |
| 3.1.4 · Miniaturas del panel, del submenú y del filtro | `alt=""` | `alt=""` |
| 3.1.5 · Hero de Artista | Detalle de relleno de {titulo}, de {artista} | Placeholder detail of {titulo}, by {artista} |
| 3.1.6 · Obra sola de Artista | Obra de relleno: {titulo}, de {artista} | Placeholder work: {titulo}, by {artista} |
| 3.1.7 · Imagen del statement | patrón de vista en muro | wall-view pattern |
| 3.1.10 · Tapas en Tienda | Portada de relleno: Edición 01 | Placeholder cover: Edition 01 |
| 3.1.12 · Banda Ediciones | Interior de relleno, Edición 03: doble página con Línea 02 a la derecha | Placeholder inside page, Edition 03: spread with Line 02 on the right |
| 3.1.13 · Banda Encuentro y foto de Encuentro | Foto de relleno: la caja de Encuentro, de cerca | Placeholder photo: the Encuentro box, close up |
| 3.1.14 · Caja en Activar y Tienda | Foto de relleno: la caja de Encuentro | Placeholder photo: the Encuentro box |
| 3.1.15 · Registros | Registro de relleno: Encuentro 001 | Placeholder record: Encuentro 001 |
| 3.1.17 · Acerca | Vista de relleno: Campo 09, de Artista A, colgada en un muro | Placeholder view: Field 09, by Artist A, hung on a wall |
| 3.1.18 · Fila de 4 detalles (nivel 2) | Detalle de relleno de {titulo}, de {artista} | Placeholder detail of {titulo}, by {artista} |

- **Miniaturas con `alt=""`:** van dentro de un enlace o botón que ya tiene el nombre al lado («Artista A»). Con `alt` lleno, el lector de pantalla leería «Obra de relleno: Campo 07, de Artista A, colgada en un muro, Artista A» en cada celda del menú. El criterio de `alt` de relleno (brief §7) se cumple igual: una imagen que no se anuncia no dice que es real. Si Javiera lo mide como `alt` vacío prohibido, el patrón de vista en muro sirve.
- **Acerca:** la spec proponía «Vista de relleno: una obra en un muro». Nombrar la obra dice lo mismo y además cuál es.
- **Registros:** «Encuentro 001» con mayúscula, como en el Libro («Encuentro 007»): es el nombre del registro. Cambia también en copy-muestra §10.

### 12.5 · Lo que Diego me dejó en `desvios.md`

| Desvío | Respuesta |
|---|---|
| 1 y 30 · descripciones de las 27 obras | Reescritas mirando M01: copy-muestra §14.3 |
| 2 · statements de B y C | Reescritos (copy-muestra §14.2). Además corregí la historia y proceso de A, B y C y la bio de C, que tenían el mismo problema |
| 13 · «CLP ···» en ES | De acuerdo. Si P14 prohíbe el «$», «CLP ···» en los dos idiomas está bien |
| 14 · aviso de la foto opcional | Dos versiones: 12.3-19 y 19b |
| 15 · EN de los pies | Pie de la caja: ES «Caja de Encuentro» (no «Caja Encuentro») / EN «Encuentro box» ✓. Pie del registro: ES «Registro · Encuentro 001» (mayúscula) / EN «Record · Encuentro 001» ✓. `aria-label` del mapa: ES «369 posiciones, 7 activadas, de muestra» / EN «369 positions, 7 activated, all samples» (sumo «all», como el contador del Libro). Con la spec v2, los dos pies pueden no tener lugar: si no aparecen, no hacen falta |
| 28 · «0 obras» | De acuerdo: «0 obras» / «0 works» |

### 12.6 · Lo que entregué distinto de lo que proponía la spec

1. **«Todos los artistas», no «Todas las artistas»** (slots 2 y 21). `BRIEF.md` l.100: las artistas de partida son María, una amiga «y un tercero que todavía está buscando». Todo el sitio dice ya «los artistas» (visión curatorial, Acerca, «Ver los artistas»); un femenino solo en el menú se leería como texto cosido por partes.
2. **Estado 2 sin precio: «Consultar el precio · →»**, no «Consultar por esta obra · PRECIO A CONSULTAR». Medido a 390: la etiqueta mide 167,7 px y el valor 146,9; dentro del botón hay 318. Quedan 3,4 px entre los dos, se tocan; a 375 no caben. «Consultar el precio» mide 134,7 px (EN «Enquire about the price», 166,5), dice qué pasa al tocarlo (pides el precio) y deja el dato en el `dl` («Precio · A consultar»). En EN el par de la spec sí cabía (18 px de aire), pero los dos idiomas van con la misma estructura.
3. **Tamaño en centímetros, no «Chico · Mediano · Grande»** (spec 2.4). El slot 21 pide las opciones de copy 4.4, y 4.4 ya había sacado esos tres: en EN, «Medium» quedaba dos veces en el mismo bloque (el filtro Técnica se llama «Medium» y la opción del medio también). Ahora que los filtros son líneas de texto una encima de otra, se nota más.
4. **«Comprar · Amazon →»** en vez de «Comprar en Amazon · AMAZON →» (slot 29): el valor ya dice adónde va, como en la obra.
5. **Contacto: «Consultas», no «Formulario»** (slot 37). «Formulario» nombra la pieza de interfaz, no lo que la persona viene a hacer; «Consultas» / «Enquiries» es el rótulo de una galería.
6. **Tienda: un rótulo «Cómo se compra» sobre los cuatro H2** (spec 2.13 los deja sin título). Sin él, «OBRAS» justo debajo de la grilla parece el título de otra lista. Es composición: lo decide Lucía; el texto queda escrito.
7. **La bajada del Libro sigue siendo texto fijo** («El registro de cada encuentro activado.»), no de muestra como dice la spec 2.10: orienta, sobre todo en EN, donde «Libro» no se traduce, y no la escribe María.

### 12.7 · Pasada de borrado y pasada de voz

| Se borró | Por qué |
|---|---|
| «Escribir una consulta →» (propuesta de la spec para el enlace del pie) | Repetía «consulta» del titular, a una línea |
| «Formulario» como H2 | Nombre de la pieza, no de lo que se hace |
| El prefijo «Obras:», «Encuentro:», «Ediciones:» de Cómo se compra | Ahora hay H2; y en la ficha, sin H2, la frase tenía que sostenerse sola |
| «Amazon» dos veces en el botón de Edición; «Precio» dos veces en la fila del `dl` | Repetición dentro de la misma pieza |
| «Todas las artistas» | Género que el brief no sostiene |

**Voz:** leí en voz alta el titular del pie con el enlace debajo («Consulta por una obra, una edición o un encuentro. Escribir a Módulo 369»): suena a lo que diría quien atiende la galería, sin pregunta ni promesa. Los botones-fila se completan todos con «…y entonces pasa X»: Comprar → vas a Mercado Pago; Consultar el precio → vas a Contacto con la obra cargada. Tú en todo; cero «nosotros», cero «usted»; sin Title Case; cero rayas.
**Borrar 30% más:** lo probé en Cómo se compra (el bloque más largo de voz de la galería): sin la línea de Consultas, quien llega a una obra en estado 2, 3 o 4 no sabe qué hacer. Queda.

### 12.8 · Afirmaciones nuevas por verificar

| # | Texto | Dónde | Qué falta y quién |
|---|---|---|---|
| 1 | «Consulta por una obra, una edición o un encuentro» | Pie | Que Encuentro se pueda consultar depende de §9-4; si la caja no existe en el sitio, el titular queda con dos palabras en itálica y Lucía decide si se sostiene. Ramón, después de la reunión |
| 2 | «Collage sobre cartón» / «Papel recortado sobre cartón» | Ficha, Tienda | Ninguno en la maqueta (relleno bajo aviso global) |
| 3 | `alt=""` en miniaturas | Menú, filtro | Que Javiera lo acepte (12.4, nota de slot 38) |
