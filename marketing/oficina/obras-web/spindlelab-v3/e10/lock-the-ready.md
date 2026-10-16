# Lock de referencia: The Ready, con la claridad de Gehl (medido)

**15-oct-2026 · Lucía (dirección de arte).** Reemplaza a `../referencia-driftime/lock-driftime.md`
como referencia del sitio v3. Sale de lo que Ramón marcó en la página de referentes
(`referentes/marcas-15oct.json`):

> **Corregido el 16-oct tras la ronda 1 de QA** (`acta-paso-2.md`, defectos 3 a 6). Lo medido de The Ready
> (§1 a §9) no cambia. Cambia lo que se toma: **§10b es nuevo** y dice, recurso por recurso, qué se hizo
> propio y cómo; §5, §10, §12, §13, §14 y §15 se corrigieron para que digan lo mismo; §17 fija el orden del
> hero y §18 es el historial de esta corrección.
>
> **Corregido otra vez el 16-oct, tras la ronda 2 de QA** (defectos 2 a 7 y lo que quedaba de 8 a 11) **y la
> decisión de Ramón** de dejar abierto el logo («no te preocupes por el logo de la marca, es muy probable que lo
> tenga que cambiar por la nueva imagen del sitio»). §13 trae la regla de escala para todos los anchos, las dos
> composiciones, el marcador con su única excepción y el techo del filete; §11, la prueba de peso (Instrument Sans
> a 540); §12 queda como historia: el wordmark y la regla de un oro por vista ya no son restricción; §17 suma el
> chequeo a 390. El historial, en §18.
>
> **Ajustado el 16-oct tras la ronda 3** (aprobada; un defecto menor y dos arreglos de pasada). §7 trae el tamaño de
> archivo que se sirve por tramo de F1, F5 y F7; §13, dónde va la flecha del chequeo en cada tramo, la medición del
> desborde también con el clip apagado y la cifra corregida del marcador; §16 y §18, la evidencia y el historial.

- **The Ready, idea principal.** «me gusta mucho todo lo que dices que no se toma (…) me gusta mucho
  la guinche, la tipografía y los colores». La guinche (huincha) es, aclarado en el chat, **la cinta
  que se mueve y el subrayado amarillo**.
- **Gehl, segundo sí.** «creo que es un buen acercamiento a lo que quiero. las fotos hay que
  hacerlas. podemos ocupar modelos de IA. pero me gusta la claridad y lo limpio. me falta
  creatividad. está siendo casi un sitio típico.»

Todo lo de abajo está **medido en el navegador**, no recordado: Chromium 141 headless con
Playwright 1.63, `getComputedStyle` sobre cada nodo con texto después de bajar la página
entera, a 1440×900 y 390×844. Evidencia en `lock/`:

- `medicion-the-ready.json` y `medicion-gehl.json`: resumen por tema y, al final, la medición
  cruda de cada página (cada nodo de texto con su familia, tamaño, color, fondo y contraste).
- `the-ready/` y `gehl/`: primera pantalla a 1440 y 390 de cada página, y la página completa
  (la de 1440 reducida a 480 de ancho; la de 390 en su ancho). Más las capturas de la cinta, del
  subrayado dibujándose, de los botones en reposo y al pasar el cursor, y del grano de la foto.
- `tipos-comparados.png`: Saans contra las dos letras libres elegidas, mismo texto y tamaño.

Páginas de The Ready medidas: la home, `working-together` (la oferta), `case-studies/navy-federal`
(un caso) y `who-we-are` (nosotros). De Gehl: la home y `projects/huechuraba-masterplan` (su caso de
Santiago). Ninguna mostró desafío anti-robots; Gehl pidió cookies y se cerraron con «Allow all».

---

## 1 · Lo que The Ready ES (la tesis, en una línea)

**Un papel claro con una sola voz tipográfica grande, y el juego encima: la cinta, el marcador
amarillo, los garabatos en ciruela y bandas de color enteras.** No es un sistema de imagen como
driftime: la foto aparece en tres de las cuatro páginas, pero lo que carga cada pantalla es el
titular grande en caja de oración. El color no se usa por pilar: cada banda es un cambio de ritmo
dentro de la página (amarilla para lo que ganas, ciruela para el llamado final, lima para el caso).

## 2 · Tipografía (medida)

Tres familias cargadas: **Saans Medium** (titulares), **IBM Plex Sans** (cuerpo) e **IBM Plex Mono**
(rótulos y botones). La plantilla declara además Rubik, Proxima Nova y Brandon Grotesque, y ningún
nodo las usa (peso muerto, no se copia).

| Rol | Familia | 1440 | 390 | Peso | Interlínea | Interletra | Caja |
|---|---|---|---|---|---|---|---|
| Display: h1 de portada y banda final | Saans | **138** | **86,9** | 500 | 0,86 | −0,02em | oración |
| Titular de sección (h2) | Saans | 91,3 | 59,6 | 500 | 0,99 | −0,02em | oración |
| Frase grande (h3) y cinta | Saans | 51,6 | 36,3 | 500 | 1,1 (cinta 1,4) | −0,02em | oración |
| Cita grande en banda | Saans | 44,6 | 32,2 | 500 | 0,99 | −0,02em | oración |
| Subtítulo (h4), nombre de persona | Saans | 30,8 | 24,1 | 500 | 1,16 | −0,02em | oración |
| Entradilla | IBM Plex Sans | 22,2 | 19 | 400 | 1,2 | −0,008em | oración |
| Cuerpo | IBM Plex Sans | 17 | 16 | 400 (700 en `strong`) | 1,2 | −0,01em | oración |
| Nota, firma de cita | IBM Plex Sans | 15,3 | 15 | 400 | 1,2 | 0 | oración |
| Rótulo de sección, navegación, migas | IBM Plex Mono | 11,8 | 13 | 500 | 1,2 | **+0,03em** | **MAYÚSCULAS** |
| Botón óvalo | IBM Plex Mono | 12,7 | 13,5 | 500 | normal | **+0,1em** | **MAYÚSCULAS** |
| Botón del encabezado | IBM Plex Mono | 11 | no hay (menú) | 500 | normal | +0,1em | MAYÚSCULAS |

**Lo que importa, y lo contrario de driftime:**

1. **El display no grita en mayúsculas.** Todos los titulares, del de 138 px al de 31, van en
   Saans 500 en caja de oración. Lo grande es grande por tamaño, no por peso ni por caja.
2. **No hay escasez de display: hay una sola voz.** Saans está en 16 a 31 nodos por página. La
   jerarquía la hacen saltos grandes de tamaño (138 → 91 → 52 → 31), no cambios de familia.
3. **El contrapunto es el mono.** Lo único en mayúsculas es IBM Plex Mono a 11-13 px con
   interletra positiva: rótulos, navegación y botones. Grande y suave contra chico y mecánico.
4. Medido con texto real de SpindleLab: a 390, «Continuidad» y «Acompañamiento» **no caben** en
   342 px a los tamaños de The Ready (484 y 705 px a 86,9 px en Instrument Sans; 470 y 684 en Saans). El castellano tiene palabras más
   largas que el inglés de la referencia; ver la regla en §13.

## 3 · Color (medido)

Variables de la paleta leídas en `site.css` de Squarespace; los usos, en el render.

| Color | Hex | Rol en The Ready | Área de la página a 1440 |
|---|---|---|---|
| **Papel** | `#FFFEFA` | Lienzo de todas las páginas; texto sobre ciruela | 49 % (home) a 87 % (nosotros) |
| **Ciruela** | `#1B0925` | Todos los titulares, botones, banda final, filetes de 1 px, los garabatos | 7 a 8 % (la banda final) |
| Casi negro | `#0D0C0E` | Cuerpo y rótulos mono | (texto) |
| **Amarillo** | `#F4F480` | El marcador detrás de palabras; bandas enteras; texto del óvalo dentro de la banda amarilla | 13 % home, 19 % oferta, 1 % nosotros (la cinta), 0 % caso |
| Lima | `#E6FA97` | Portada del caso y su banda de impacto; solo en casos | 23 % del caso |
| Lavanda | `#EDD1FF` | Óvalo de la banda final; banda de cita del caso; menú desplegable | 8 % del caso |
| Gris cálido | `#ECECE2` | Banda de clientes en la home; pie | 31 % home, 4 % el resto |
| Naranja | `#EC6227` | Una mancha orgánica de 215 px con un rótulo mono adentro, una por página (home y oferta) | (pieza) |

**Contraste de cada combinación, medido (WCAG 2.x):**

| Texto | Fondo | Contraste | Uso |
|---|---|---|---|
| ciruela | papel | **18,71** | titulares |
| casi negro | papel | 19,34 | cuerpo, rótulos |
| ciruela | amarillo | 16,27 | texto sobre el marcador y la banda amarilla |
| casi negro | amarillo | 16,82 | rótulo mono en la banda amarilla |
| papel | ciruela | 18,71 | botón, banda final |
| amarillo | ciruela | 16,27 | texto del óvalo en la banda amarilla |
| casi negro | lavanda | 14,09 | óvalo de la banda final |
| ciruela | lima | 16,62 | portada de caso |
| ciruela | gris cálido | 15,88 | pie |
| casi negro | naranja | 5,89 | rótulo de la mancha (aprueba AA de cuerpo) |
| amarillo (forma) | papel | 1,15 | el marcador como forma: no se distingue del papel sin el texto encima |
| **oro `#C9A227`** | papel | **2,40** | el punto del wordmark (ver §12) |
| oro | ciruela | **7,80** | ídem |

Todas las combinaciones de texto de The Ready aprueban AA con margen; la más baja es el rótulo
sobre la mancha naranja (5,89).

## 4 · La cinta (medida)

| Qué | Medido |
|---|---|
| Componente | Bloque «scrolling» de Squarespace: un `<svg>` con `textPath` que corre sobre un trazado recto |
| Dónde | Home (bajo el hero, sobre papel, entre dos filetes ciruela de 1 px) y nosotros (sobre una banda amarilla). Oferta y caso: ninguna. **Una por página como máximo** |
| Alto | 72-75 px a 1440 con texto de 51,6 px · 94-96 px a 390 con texto de 36,3 px |
| Letra | Saans 500, −0,02em, ciruela |
| Texto | «A Work Design Company ✳︎» · «Leaders ✳︎ Facilitators ✳︎ Operators ✳︎ Coaches ✳︎ Partners ✳︎» |
| Separador | ✳︎ (U+2733 en presentación de texto), 0,5em entre cada ítem |
| Velocidad | **≈ 30 px/s hacia la izquierda**: 29,5 a 30,1 px/s medidos en las cuatro instancias (0,469 px por cuadro a 63-64 cuadros/s). Configurada como 0,5 px **por cuadro**: en una pantalla de 120 Hz corre al doble |
| Con el mouse encima | **Sigue igual** (29,6 a 30 px/s): `pausedOnHover` vacío |
| Pausa | **No hay**: sin botón, 0 elementos enfocables |
| Fuera de pantalla | Se detiene (IntersectionObserver) |
| `prefers-reduced-motion: reduce` | **Quieta**: el script no arranca la animación y queda el texto fijo, cortado en los bordes |
| Semántica | El SVG va `aria-hidden`, pero todo va envuelto en `<h1>`: un lector oye «encabezado de nivel 1: A Work Design Company». La home queda con 4 h1 para un lector |

Capturas: `the-ready/cinta-home-1440-t0.png` y `-t4s.png` (la misma franja con 4 s de diferencia,
corrida ~125 px), `-movimiento-reducido.png`, y las tres de nosotros.

## 5 · El subrayado amarillo (medido): no es a mano

Lo que se lee como «subrayado a mano» es la forma de texto **marker** de Squarespace. Su
configuración, leída de la página: `animation: draw`, `duration: 0.5`, `direction: right`,
`color: darkAccent` (el amarillo), `thickness: 1em`, `linecap: square`.

| Qué | Medido |
|---|---|
| Qué es | Un `<svg>` con un `<path>` **recto** (curvas cúbicas con desvío vertical de 10⁻¹⁴ px) detrás del texto (`z-index: −1`), pintado con trazo |
| Color | `#F4F480`; una vez en papel `#FFFEFA` sobre la banda amarilla (oferta) |
| Grosor | **1em** del texto: 137 px en un h1 de 138, 91 en un h2 de 91,3 |
| Dónde cae | Cubre la letra entera: desde 0,826em sobre la línea de base (13 px por encima de la altura de mayúscula) hasta 0,167em bajo ella (4 px antes del fondo de los descendentes). Es un resaltador, no una raya bajo la palabra |
| Remates | Cuadrados: la banda sobresale **0,12em** a cada lado de las letras |
| Varias líneas | Un tramo por línea; todos se dibujan a la vez |
| Animación | Al entrar en pantalla salta a oculto y se dibuja de izquierda a derecha en **~470 ms** con salida suave (`subrayado-dibujo-250ms.png` lo toma a la mitad) |
| Movimiento reducido | Sin dibujo: está completo desde el principio. El titular cambia su entrada de «flexIn» a un fundido de 0,8 s |
| Cuántos | Frases marcadas por página: 7 home, 5 oferta, 4 caso, 4 nosotros. **Máximo a la vez en una pantalla: 3 a 4** a 1440 (2 a 4 a 390) |
| Qué marca | Siempre **la parte final de una frase**, la consecuencia: «built to benefit from change.», «Work Design», «they have to change, too.», el remate de cada columna en la home, las cifras de resultado, los tres títulos «Strategy: / Structure: / Individuals:». Nunca la primera palabra, nunca un botón |
| Cuántas palabras | Depende de dónde (medido en `medicion-the-ready.json`, `subrayado.frasesPorPagina`): **en un titular (h1 a h3), de 2 a 5**; en una entradilla o en el cuerpo de 17 px, **la última frase entera, de 4 a 11** («more of a living frame you can pressure-test, adjust, and use.», 11) |

**Lo que sí es a mano** son los **garabatos e íconos dibujados**, PNG en ciruela (medido en la
captura: ~`#18082A`): el ovillo junto al h1 de la oferta, los tres íconos de investigar, decidir
y mover, los cuadrados concéntricos de la portada del caso, los rulos de la banda amarilla de la
home. Más la mancha naranja de borde orgánico. Uno o dos por página; nosotros no tiene ninguno.

**Lo que se construye no es este marcador** (corregido el 16-oct, defecto 6): de The Ready se toman la
idea (resaltar la consecuencia, al final de la frase), el alto que cubre la letra entera y el dibujo de
izquierda a derecha en ~470 ms, completo con movimiento reducido. **La forma es propia**: una pasada de
plumón con bordes que ondulan, entrada en ángulo, salida que sube y dos vetas donde el plumón se secó
(`tableros/e10-direcciones/proto/e10/marcador.svg`, generado por `herramientas/marcas.mjs`), en el
resaltador propio (§10b). No es el trazo recto de remate cuadrado que se midió arriba.

## 6 · Botones, grilla, líneas y ritmo (medidos)

- **Óvalo.** `border-radius: 100 %` sobre una caja de 317×99 px a 1440 (212×88 o 255×88 a 390).
  IBM Plex Mono 500 12,7 px en mayúsculas, +0,1em. En reposo, ciruela con texto papel y borde papel
  de 1 px; al pasar el cursor **se invierte** (papel con texto y borde ciruela) **y crece a 348×109
  (×1,10)**. Foco: contorno de 2 px a 4 px de distancia. En la home **cabalga el borde de la foto**,
  mitad sobre el papel y mitad sobre la imagen. En la banda final va en lavanda.
  **Defecto de ellos:** a 390 «LET'S GET STARTED» se parte en tres líneas dentro del óvalo.
- **Botón del encabezado.** Rectángulo de 153×50, **radio 0**, ciruela; al pasar el cursor se
  invierte (0,6 s, `cubic-bezier(0.19, 1, 0.22, 1)`).
- **Encabezado.** 90 px a 1440 (102 a 390), fijo, papel, con un filete ciruela de 1 px abajo; logo
  a 75 px; navegación mono a la derecha. A 390, menú de dos rayas.
- **Grilla.** Motor «fluid engine»: 26 pistas a 1440 (24 + 2 de margen), separación 8-11 px,
  **margen lateral 75 px**; 10 pistas a 390, **margen 23-24 px**.
- **El filete que nace del borde.** Un filete ciruela de 1 px que parte en x = 0 y corre bajo o
  junto al titular: 229 px a media altura de «The Ready.», 716 px bajo el h2 de «What we do», 986 px
  sobre «Are you ready?». En las filas de cuatro columnas, un filete de 262 px sobre cada una.
- **Ritmo.** A 1440 la mayoría de las secciones deja **~95-100 px** sobre su primer elemento y 95-150
  debajo, y mide 680 a 970 px (las de clientes y de los tres caminos llegan a 1326 y 1457). A 390,
  ~56-58 arriba.
- **Columnas de texto.** Rótulo mono a la izquierda, texto a la derecha. La entradilla corre en
  587 px (47 a 56 caracteres por línea a 1440; 33 a 38 a 390).
- **Densidad.** El texto cubre 14 % (nosotros) a 30 % (home) de la página a 1440; la imagen, 8 a 22 %.

## 7 · Fotos (medidas)

- **Radio 0** en todas. Nada de esquinas redondas.
- **Grano en el archivo.** Encima de la foto no hay capa de ruido, filtro ni mezcla (cero en las
  cuatro páginas). El grano viene en la imagen: ruido de alta frecuencia 12,1 contra 8,1 de una foto
  sin tratar del mismo sitio, y saturación alta (`the-ready/foto-grano-hero-x2.png`).
- **La del hero.** Vertical, 391×671 a 1440 (0,58), pegada al borde derecho, del filete del
  encabezado hasta la cinta. A 390 baja debajo del titular, a todo el ancho.
- **El collage de nosotros.** Seis fotos de proporciones distintas (0,64 a 1,53) montadas unas sobre
  otras, que tocan los dos bordes de la pantalla, sobre una cuadrícula de papel a la derecha.
- **Qué muestran.** Gente trabajando de pie ante una mesa, post-its, talleres, de espaldas o de
  perfil, interiores con ladrillo y ventanales, luz de día con lámparas encendidas. Nadie posa a
  cámara salvo en la grilla de retratos del equipo.
- Las fotos **sí tienen tonos de oro**: con el criterio de §07b, la primera pantalla de nosotros da
  0,52 %, y sale casi entero de dos fotos: el jardín al sol detrás de la oradora (3.709 píxeles) y las
  hojas de otoño (2.519); el atardecer aporta 353. Una foto generada al estilo The Ready
  puede traer oro; se mide igual que las del pool. (Medición; desde el 16-oct el oro no es restricción para las
  fotos, §12.)

**Tamaño de archivo por tramo: F1, F5 y F7** (16-oct, observación de la ronda 3 de QA). La pauta medía la cobertura a
1440 y a 390. Pero en la composición de una columna (hasta 1023 px, §13) estas tres fotos van a todo el ancho y en
4:5, así que la tableta pide más píxeles que el escritorio. **Regla: en cada tramo se sirve un archivo que cubre dpr 2
en el ancho más grande del tramo.** Dos fuentes por foto, con `<picture>` y `media="(max-width: 1023px)"`: la de la
columna (4:5) y la de escritorio (su proporción); dentro de cada una, anchos en `srcset` para que el navegador elija
por densidad. Medido en los prototipos (los espacios, de 360 a 1920):

| Foto | Escritorio, desde 1024 (medido a 1440) | Tableta, 600 a 1023 (a 1023) | Teléfono, hasta 599 (a 390) |
|---|---|---|---|
| **F1** (Taller, «Qué hacemos») | 0,58 · 420×724 css (fijo desde 1440; 307×530 a 1024) → **840×1448 px** | 4:5 a todo el ancho · 1023×1279 css (768×960 a 768) → **2048×2560 px** | 4:5 · 390×488 css → 780×975 px; a 599, 599×749 → **1200×1500 px** |
| **F5** y **F7** (Pizarra, bandas a sangre) | 21:9 a todo el ancho · 1440×617 css (1024×439 a 1024; 1920×823 a 1920, que a dpr 1 cubre el mismo archivo) → **2880×1234 px** | 4:5 a todo el ancho · 1023×1279 css → **2048×2560 px** | 4:5 · 390×488 css → 780×975 px; a 599 → **1200×1500 px** |

Los archivos de la columna salen de **un solo original 4:5 de 2048×2560** (el de teléfono es el mismo, reducido:
780, 1200, 1536 y 2048 de ancho en el `srcset`). **Ningún proveedor llega sin escalar**, y menos en F5 y F7, donde
el 4:5 se recorta de un 16:9: el recorte 4:5 más grande da, con Gemini, 768×960 en F1 (0,75× a 1023) y 614×768 en
F5 y F7 (0,6×); con OpenAI, 1024×1280 (1,0×) y 819×1024 (0,8×). Escalado necesario hasta 2048 de ancho: ×2,67 (F1)
y ×3,33 (F5 y F7) con Gemini, ×2 y ×2,5 con OpenAI; en escritorio, ×1,09 en F1 con Gemini (OpenAI ya da 891×1536) y ×2,14 o
×1,88 en F5 y F7. Eso cambia la pauta (la cobertura de tableta, el escalado y el 2× a 1440), y la pauta es de Bruno:
no se editó acá. Las otras seis fotos también crecen en la columna (a 1023: F3, F4 y F6 a todo el ancho; F2 a 749 y
F8 a 914 css) y siguen la misma regla; sus tamaños se escriben con la spec de la dirección elegida.

## 8 · Cómo arma cada tipo de página

| Página | Recorrido medido |
|---|---|
| **Home** | Hero: titular a la izquierda, foto vertical a sangre derecha, óvalo cruzando el borde de la foto · cinta · «What we do» en dos columnas con marcador · foto y garabato · banda gris de clientes (muro de logos, mancha naranja, carrusel de citas) · banda amarilla con garabatos · cuatro columnas con filete y marcador en el remate · banda final ciruela «Are you ready?» · pie gris |
| **Oferta** | h1 con marcador y garabato a sangre derecha · texto en dos columnas · banda amarilla con los tres íconos a mano · lista de cinco h4 · banda amarilla con collage · tres caminos en tres columnas, mancha naranja y óvalo · cifras con marcador sobre cuadrícula · video · banda final |
| **Caso** | Portada lima: miga mono, h1, etiquetas separadas por «\|», dibujo a mano a sangre derecha · ficha en dos columnas con rótulo mono a la izquierda · video · banda lavanda de cita · texto largo con dibujo · acordeón · tres columnas con marcador en el título · banda lima de impacto · banda final |
| **Nosotros** | Collage de fotos con marcador en «The Ready.» · texto en dos columnas · cinta sobre banda amarilla · «sí podemos ayudarte si / no podemos si» · equipo en dos columnas · banda final |

Las cuatro terminan igual: banda ciruela con el display en papel, un filete que nace del borde y el
óvalo lavanda.

## 9 · Gehl: solo lo que Ramón marcó (medido)

| Qué | 1440 | 390 |
|---|---|---|
| Margen lateral | **72 px** | **20 px** |
| Columna de lectura del caso | 755 px desde x = 474 (la primera tercera parte queda para rótulos: contacto, servicios) | 343-348 px |
| Caracteres por línea del cuerpo | 89 a 106 (largo: no se copia) | 44 a 46 |
| Aire entre bloques | **40 px arriba y 40 abajo de cada bloque (80 entre bloques)**, parejo en casi toda la página; los cambios de tema abren 104 a 162 | igual |
| Densidad | **texto 9,8 a 11,7 %** de la página, imagen 30 a 32 % | texto 38 a 43 %, imagen 15 a 26 % |
| Papel y tinta | `#FCFBF9` y `#1E1919` (16,81:1). Un solo fondo en toda la página | igual |
| Rótulos grises de la ficha | `#C4BDB3`: **1,80:1, no aprueba**. No se copia | igual |

**Foto a sangre.** Solo la home la tiene: un carrusel a todo el ancho y alto de la pantalla
(1440×900 y 390×844), con el titular blanco encima, sin velo. La foto principal del caso **no va a
sangre**: 1296×729 (16:9, 90 % del ancho) con radio 8 px; las intermedias, 894×503 en la columna de
lectura. Son fotos documentales: gente usando el lugar, luz de día, color natural, sin grano.

**La serif de lectura.** JHA Times Now Regular (Jan Henrik Arnold, licencia comercial con EULA)
lleva todo lo que se lee como relato: títulos de proyecto 28/1,1, entradilla 28/1,1 y cuerpo
18/1,28. Los titulares de página, la navegación y los rótulos van en Studio6 (Playtype, comercial).
Las dos letras de Gehl son de pago: ninguna se usa.

**Lo limpio de Gehl, dicho con números:** menos texto por pantalla (10-12 % contra 14-30 % de The
Ready), un solo color de fondo, un aire entre bloques que no cambia y una columna de lectura
corrida a la derecha con los rótulos a la izquierda (lo mismo que hace la ficha del caso de The Ready).

---

## 10 · Qué se toma y qué no

Corregido el 16-oct (ronda 1, defecto 6): la versión anterior de esta tabla tomaba casi todo «tal cual»,
y el tablero salió con los siete colores de The Ready idénticos al hex, su óvalo, su encabezado, su banda
final, su collage y sus garabatos en sus mismos lugares: con el logo tapado, Taller se leía como The Ready.
Ahora la tabla dice qué se toma de verdad (lo que Ramón marcó: la letra, la huincha y el juego) y remite a
**§10b** para todo lo que se hizo propio.

| De The Ready | ¿Se toma? | Cómo, y por qué |
|---|---|---|
| Papel `#FFFEFA`, ciruela `#1B0925` y casi negro `#0D0C0E` | **No: propios** (§10b) | El papel `#F7F5F0` y el ciruela `#341F34` son los del manual de SpindleLab (§04); una sola tinta. Los de The Ready quedan como opción del tablero, dicha como suya |
| Amarillo `#F4F480`: el marcador y bandas enteras | **El rol sí, el valor no** (§10b) | El rol es la huincha que Ramón marcó. El valor es el resaltador propio `#EEF26E` (§12); el exacto, solo si Ramón lo elige en el tablero |
| Lima `#E6FA97`, lavanda `#EDD1FF`, naranja `#EC6227` | **No** (§10b) | Sus roles los hacen el papel (portada de Trabajo), el botón papel (pie) y el sello en tinta. Vuelven solo con la opción «colores exactos», en su rol de allá |
| Saans en todos los titulares, en caja de oración, peso 500, −0,02em | **Sí, con Instrument Sans a 540** (§11) | «La tipografía». Saans tiene licencia comercial: la letra es otra, y su 540 es el que tiene el color de Saans 500 (prueba en §11) |
| La escala 138 / 91 / 52 / 31 a 1440 y 87 / 60 / 36 / 24 a 390 | **Sí, en las dos direcciones** y en todas las páginas, con el tope de palabra larga de §13 | Medida. Desde la ronda 1 también en Pizarra limpia (defecto 5) |
| IBM Plex Sans para el cuerpo e IBM Plex Mono para rótulos, navegación y botones | **Sí, las mismas** | Son libres (OFL) |
| Rótulos mono en MAYÚSCULAS con +0,03em; botones con +0,1em | **Sí**, solo en mono y solo a 11-13 px | Es el contrapunto del sistema. Reabre una regla aprobada (§15) |
| Interlínea 1,2 del cuerpo | **No: 1,45** | 1,2 es apretado para castellano con tildes y eñes a 17 px. Desvío escrito, no gusto |
| La cinta | **Sí, reconstruida y propia** (§10b, §14) | Mismo alto, letra, dirección y velocidad (30 px/s). Distinto: se puede pausar, la velocidad va por tiempo y no por cuadro, no es un `h1`, y el separador es el interpunto «·» en ciruela del manual §06, no el ✳︎, que es firma de The Ready |
| El marcador detrás de la frase | **La idea y el tiempo sí; la forma es propia** (§5, §10b) | Corregido: la versión anterior decía «tal cual medido» y no era lo construido. Se toman la consecuencia al final, el alto que cubre la letra y el dibujo de ~470 ms; la forma es una pasada de plumón propia |
| Los garabatos en ciruela, puestos junto al h1 de la oferta, en la banda amarilla y en la portada del caso | **No** (§10b) | Se reemplazan por **marcas de revisión** propias, una por página en Taller, donde hacen un trabajo |
| La mancha naranja de borde orgánico con un rótulo mono | **No** (§10b) | Se reemplaza por el **sello** (Taller) |
| Óvalo grande como llamado principal; hover que invierte y crece ×1,10 en 0,6 s | **No** (§10b) | Botón de la marca (radio 6) con el resaltador que lo cruza al pasar el cursor; el botón grande es solo el del chequeo |
| Encabezado de 90 px a todo el ancho con filete y botón rectángulo de radio 0 | **No** (§10b) | El módulo de navegación de SpindleLab (manual §02), pasado a papel |
| Banda final ciruela con el display en papel y el óvalo lavanda | **La idea sí; el color y lo que lleva, no** (§10b) | Banda final en el ciruela del manual, botón papel y el wordmark gigante del sitio v3 (el logo se rediseña después de elegir dirección, §12) |
| Filete ciruela de 1 px que nace del borde izquierdo | **Sí, declarado** (§10b), **con techo** (§13) | Es de The Ready, y el tablero lo dice. Lo propio es dónde se corta en el hero. Desde la ronda 2 va dos veces por página como máximo, con un rol: abrir la serie de lo que se ofrece |
| Margen lateral 75 px a 1440 y 24 a 390; ~96 px de aire por sección | **Sí** | Gehl mide casi lo mismo (72 y 20): las dos referencias coinciden |
| Fotos de radio 0, con grano en el archivo, saturadas, gente trabajando de espaldas o de perfil | **Sí, generadas con IA** | Con la regla nueva: personas como ambiente, nunca presentadas como equipo ni como clientes, y medidas por oro (§07b; en pausa desde el 16-oct con el logo, §12). El contenido (empresas chilenas, el mundo del cliente) es propio: lo fija la pauta de Bruno |
| Collage de fotos que se montan sobre una cuadrícula y tocan los bordes | **No** (§10b) | Corregido: Taller lo tenía. Las obras van en la fila del sitio v3 |
| Muro de 300 logos, «11 years. 300 clients.», carrusel de testimonios | **No** | Cero prueba social inventada |
| Grilla de retratos del equipo | **No** | SpindleLab es una persona; las personas generadas no pueden posar como equipo |
| Video incrustado | **No** | No existe material |
| Su texto («Are you ready?», «A Work Design Company») | **No** | El texto del sitio es el de E8 y se queda |
| La cinta como `h1` y sin pausa; varios `h1` por página | **No** | Defectos de accesibilidad (§14) |
| Velocidad por cuadro (al doble en 120 Hz) | **No** | Se fija en px/s |
| Rubik, Proxima Nova y Brandon declaradas y sin uso | **No** | Peso muerto |

| De Gehl | ¿Se toma? | Cómo |
|---|---|---|
| **Un solo fondo** por página salvo la banda final | **Sí, en la dirección Pizarra limpia** | Es «lo limpio» medido: Gehl no cambia de fondo en toda la página |
| **Techo de densidad** | **Sí, en Pizarra limpia:** el texto de lectura (sin la letra display de 40 px o más) cubre como máximo **15 %** de la página a 1440 | Gehl 10-12 %; The Ready 14-30 %. Corregido el 16-oct: con la escala display de vuelta en Pizarra (defecto 5), los titulares de 138 y 91 px ocupan área sin cargar lectura; contando todo, Pizarra queda en 8,7 a 18,1 % y el texto de lectura en 3,4 a 8,4 % (`../tableros/e10-direcciones/img/medidas.json`) |
| **Aire entre bloques parejo:** 40 + 40 px | **Sí, en Pizarra limpia**, dentro de las secciones de 96 px de The Ready | Cumple un trabajo distinto: el de The Ready separa secciones, el de Gehl separa bloques dentro de una |
| **Columna de lectura corrida**, rótulo a la izquierda | **Sí, en las dos** | Las dos referencias lo hacen. Con tope de **68 caracteres por línea** (`max-width` en em), no los 89-106 de Gehl |
| **Foto a sangre** | **Sí, como banda propia**: 100 % del ancho, 16:9 o 21:9 a 1440, 4:5 a 390 | **Nada escrito encima** salvo una etiqueta de pieza: el manual §07b prohíbe texto y velos sobre las fotos, y Gehl sí pone el titular encima. El hero conserva su titular y su chequeo fuera de la foto |
| Foto principal de caso inset con radio 8 | **No** | Las fotos van con radio 0 (The Ready manda en la forma) |
| Serif de lectura (Times Now) | **No** | Es de pago, Ramón no la marcó, y sería la cuarta familia (detector C7). Si se quiere una serif para el cuerpo largo de los casos, la coherente es **IBM Plex Serif** (OFL, de la misma familia que Plex Sans y Mono), y queda como opción abierta, no como parte del lock |
| Rótulos grises `#C4BDB3` | **No** | 1,80:1 |
| Carrusel en el hero | **No** | |

## 10b · Lo propio, recurso por recurso (ronda 1 de QA, 16-oct)

El encargo era «ningún recurso copiado tal cual de The Ready, debe ser propio». La primera versión cumplió
con la cinta y el marcador y tomó el resto al hex y al milisegundo. Esta tabla dice, para cada recurso que
Javiera encontró copiado (`acta-paso-2.md`, defecto 6) y para los que quedaban sin declarar, **qué se hace
propio y por dónde**: el valor, la forma o la composición. Todo está construido en los prototipos
(`tableros/e10-direcciones/proto/e10/`) y se ve en el tablero.

| Recurso de The Ready | Lo que el tablero tenía el 16-oct a las 12:30 | Lo que se hace ahora | Por dónde es propio |
|---|---|---|---|
| **Paleta** (papel `#FFFEFA`, ciruela `#1B0925`, casi negro `#0D0C0E`, amarillo `#F4F480`, lima, lavanda, naranja) | Los siete, idénticos al hex (`tokens.css`) | Papel `#F7F5F0` y ciruela `#341F34` del manual de SpindleLab (§04: el papel del sistema y el ciruela del campo Alcance), **una sola tinta** para titulares y cuerpo; resaltador `#EEF26E`; oro `#C9A227` (el del wordmark actual, en pausa con el logo, §12). Sin lima, lavanda ni naranja | **Valor**: dos de cuatro son de la marca; el resaltador es más fluor y más verde que el de ellos (61,8° y 0,545 contra 60,0° y 0,475). Contraste: ciruela sobre papel 13,85:1, sobre el resaltador 12,62:1. **Si Ramón quiere los exactos, lo decide en el tablero** sabiendo que son los de The Ready (`?paleta=the-ready` los muestra) |
| **Óvalo**: 317×99, Plex Mono 12,7 px +0,1em; al pasar el cursor se invierte y crece ×1,10 en 0,6 s con `cubic-bezier(.19, 1, .22, 1)` | Igual en tamaño, interletra, inversión, escala, tiempo y curva | Sale. El llamado es el **botón de la marca**: radio 6 (manual §07), 50 px de alto, Plex Mono +0,1em. Al pasar el cursor **no se invierte ni crece**: lo cruza el resaltador de izquierda a derecha en 0,47 s, el mismo tiempo que el marcador. **El botón grande es uno solo: el del chequeo** (manual §07, «nunca un botón grande, salvo el del chequeo») | **Forma** (el radio y el campo de la marca) y **movimiento** (el resaltador, no la inversión). Cierra de paso el defecto 7: ya no hay óvalo que monte el campo |
| **Encabezado**: 90 px a todo el ancho, papel, filete ciruela abajo, botón rectángulo de radio 0 que se invierte en 0,6 s | Igual | Sale. Va el **módulo de navegación** de SpindleLab (manual §02: «la única placa es la del módulo de navegación»): placa compacta arriba a la izquierda con sus tres casillas (wordmark · Escríbenos · menú), pasada a papel con filete ciruela y radio 6. (La opción B del oro, con la placa en ciruela, es historia: §12) | **Composición**: es el componente del sitio v3, no el de ellos |
| **Banda final** ciruela con el display en papel, un filete que nace del borde y el óvalo lavanda | Igual, con su ciruela y su lavanda | Se toma la idea (el llamado final en una banda oscura con el display grande). Lo que lleva es propio: el ciruela del manual, el botón papel de la marca y el **wordmark gigante del sitio v3**, que es el logo actual y se rediseña después de elegir dirección (§12) | **Valor y composición** |
| **Collage** de fotos montadas sobre una cuadrícula de papel que tocan los dos bordes («Who we are») | En Taller, con su cuadrícula de 48 px y sus desfases | Sale. Las obras van en la **fila del sitio v3** (spec §3 y §7, 6-oct): las cuatro del mismo alto, cada una en su proporción, de borde a borde, dentro del hero y después del titular, como en el build | **Composición**: la de SpindleLab, y en el orden del sitio (§17) |
| **Garabatos** en ciruela: el ovillo junto al h1 de la oferta, los rulos en la banda amarilla, el dibujo a sangre de la portada del caso | Un ovillo junto al h1 de Acompañamiento, rulos en la banda amarilla de la home, un lazo en la portada lima de Trabajo: sus lugares | Salen. Van **marcas de revisión**, las de quien revisa un sitio con un plumón, una por página en Taller y donde hacen un trabajo: una **flecha** que apunta al campo del chequeo (home), un **visto** junto a la prueba de los robots que responden 200 (Acompañamiento), un **anillo** alrededor de «Correr el chequeo» (Trabajo). Nunca detrás de texto. Provisionales generadas con semilla (`herramientas/marcas.mjs`); las definitivas las traza Bruno con esa forma y en ese lugar | **Forma y lugar**: no adornan un titular, señalan una acción o una prueba. El oficio es el de SpindleLab («revisé el sitio») |
| **Mancha** naranja de borde orgánico con un rótulo mono adentro | Igual, naranja exacto, en el chequeo de la home y junto a Raigal | Sale. Va el **sello**: el rótulo que ya existía dentro de un marco de esquinas rectas con doble filete, girado −4°, en tinta y sin color de fondo. Uno por página en Taller: «Chequeo de visibilidad en IA» (home) y «Pieza de concepto · no es un cliente» (Trabajo, donde lo estampado es justo la aclaración) | **Forma y color**: viene del monograma de la marca (manual §03, «sello editorial de esquinas rectas») |
| **Marcador** | Propio en la forma, pero el lock decía «tal cual medido» | Sin cambio en lo construido; corregidos §5 y §10 para que digan lo que es | **Forma** (pasada de plumón propia); se toman la idea y el tiempo |
| **Cinta** | Propia | Sin cambio | **Comportamiento y separador**: pausable, por tiempo, no es un encabezado, interpunto del manual §06 |
| **Filete** de 1 px que nace del borde | Igual, sobre cada titular de sección (5 en la home, 5 en Acompañamiento, 1 en Trabajo) | Se toma, declarado como de The Ready en el tablero, y con techo (§13, ronda 2, defecto 5): **dos por página** contando el hilo del hero. Lo propio es dónde se corta: en el hero de Taller el hilo llega hasta «el circuito» y se corta antes de tocarlo (el territorio «el circuito se corta», manual §06b) | **Composición** en el único lugar donde dice algo, y **rol**: abrir la serie de lo que se ofrece |
| **Letra y escala** | Instrument Sans con su escala | Sin cambio: es lo que Ramón marcó («la tipografía») | Se toma **la escala y la caja**; la letra es otra (§11) |
| **Fotos** de radio 0 con grano, gente trabajando | Espacios dirigidos | Sin cambio en la forma; el contenido lo fija la pauta de Bruno (empresas chilenas, el mundo del cliente, nunca equipo ni clientes) | **Contenido** |

**La prueba del logo tapado** (pedida en el acta, defectos 5 y 6) está escrita en el tablero, pantalla por
pantalla, con su captura (`../tableros/e10-direcciones/img/var-tapado-*.jpg`, `herramientas/variantes.mjs`). Resumen: Taller ya no se
lee como The Ready (no queda su encabezado, su óvalo, su collage, sus garabatos ni su mancha), sino como un
sitio de su familia, por la letra, el resaltador y la cinta, que son lo que Ramón eligió. Pizarra limpia
ya no es el sitio típico del hero para abajo; sus dos pantallas más débiles son la 3.ª de la home (depende
de la foto F5) y «Lo que incluye».

## 11 · Sustitutos

**Saans no se puede usar.** Tabla `name` del archivo: «Copyright © 2021-2026 by Displaay Type
Foundry s.r.o. All rights reserved.», diseño de Martin Vácha; la licencia prohíbe modificar,
renombrar, guardar en servidores públicos o redistribuir (`displaay.net/about/licenses/`). El archivo
se descargó solo para el render de comparación y no se publica.

Se compararon 22 letras libres contra Saans Medium (20 de Google Fonts, más IBM Plex Sans y Manrope), letra por letra (las 52 de a-z y A-Z a igual
altura de mayúscula, alineadas por la línea de base; 1 = idéntica), más el ancho de «Ahí se corta
el circuito», la proporción de la x contra la mayúscula y el ancho del espacio entre palabras.

| Letra | Licencia | Forma | Letras clave | Ancho | x / mayúscula | Espacio |
|---|---|---|---|---|---|---|
| Saans (referencia) | comercial | 1 | 1 | 1 | 0,720 | 0,208em |
| **Instrument Sans** | **OFL** | 0,837 | **0,795** | 1,03 | **0,708** | **0,197em** |
| **Funnel Sans** | **OFL** | 0,839 | 0,784 | **1,01** | 0,741 | 0,242em |
| Host Grotesk | OFL | 0,844 | 0,798 | 1,03 | 0,709 | **0,307em** |
| Be Vietnam Pro | OFL | 0,849 | 0,829 | **1,12** | 0,716 | 0,230em |
| Manrope (la actual) | OFL | 0,734 | 0,680 | 1,04 | 0,750 | 0,200em |

(Letras clave: a e g t y r R G Q. La tabla completa de las 22 está en `medicion-the-ready.json`,
`tipografia.sustitutos`.)

**Elegida: Instrument Sans** (Rodrigo Fuenzalida, diseñador chileno, y Jordan Egstad; OFL, Google
Fonts). Es la que más se parece donde se nota a 138 px: el ritmo de la línea. Su espacio entre
palabras es casi el de Saans (0,197 contra 0,208em), su x casi igual (0,708 contra 0,720) y sus
letras clave están entre las tres más cercanas. Es variable en peso (400 a 700) y en ancho (75 a
100). Trae todo el castellano (á é í ó ú ü ñ ¿ ¡ « »). **El peso es 540, no 500** (prueba abajo).

**Alternativa: Funnel Sans** (NORD ID, Kristian Möller; OFL). Es la de ancho más parecido (1,01) y su
forma general empata con Instrument, pero su x es más alta (0,741) y su espacio más abierto (0,242em):
se ve un poco más redonda y más ancha de aire. Variable en peso (300 a 800).

**Por qué no las de mejor puntaje bruto:** Host Grotesk abre el espacio entre palabras un 48 % más
que Saans, y a tamaño display la línea se llena de huecos (se ve en el render de prueba). Be Vietnam
Pro es 12 % más ancha: «Ahí se corta el circuito» no entra igual. **Manrope**, la letra actual de la
marca, queda entre las tres más lejanas (0,734): es la razón de que el lock la cambie.

Render lado a lado, mismo texto y tamaño (96 px y 34 px, peso 500, −0,02em), con las letras clave
superpuestas a Saans: **`tipos-comparados.png`**.

**El peso (ronda 2 de QA, defectos 7 y 10).** En `tipos-comparados.png` Instrument Sans 500 se ve más liviana que
Saans Medium, y este lock decía «se ajusta si el 500 se ve más liviano» sin la prueba. Se midió, en vez de mirar
(`../tableros/e10-direcciones/herramientas/peso.mjs`, datos en `img/peso.json`, lámina en
**`lock/peso-instrument-saans.png`**): el asta de la «l» y de la «n» a 400 px, en el medio de la parte recta, y la
tinta por píxel de ancho de línea en tres frases del sitio a 138 px, como proporción de Saans 500 (1 = igual).
Render de Chromium sin suavizado subpíxel ni hinting.

| Instrument Sans | Asta «l» | Asta «n» | Tinta por ancho de línea |
|---|---|---|---|
| 500 | 0,977 | 0,955 | **0,895** |
| 520 | 1,000 | 0,977 | 0,928 |
| **540** | **1,047** | **1,023** | **0,957** |
| 560 | 1,093 | 1,068 | 0,990 |
| 580 | 1,140 | 1,114 | 1,021 |
| 600 | 1,163 | 1,159 | 1,048 |

**Elegido: 540.** A 500 la letra tiene el asta de Saans pero 10 % menos tinta: es lo que se ve «más liviano», y no
viene del trazo sino de que Instrument es 3 % más ancha y abre más blanco entre letras. A 540 el asta queda entre +2 y
+5 % y la tinta a −4 %. A 560 la tinta empata, pero el asta ya va 7 a 9 % más gruesa que la de Saans y las curvas
(«o», «c», «e») se ven más pesadas que en la referencia: se pasaría al otro lado. 540 es el punto donde la letra
deja de verse más liviana sin volverse otra. Va en toda la letra display (titulares, citas, entradillas grandes,
precios, la cinta), como `--peso-display: 540` en `proto/e10/base.css`. Cambiar el peso ensancha las palabras un
0,5 %: la regla de escala (§13) se midió con 540.

**El sistema queda en tres familias cargadas:** Instrument Sans (titulares, a 540), IBM Plex Sans 400 y 700
(cuerpo) e IBM Plex Mono 500 (rótulos y botones). Gabarito sigue siendo el wordmark actual y nada más; para
no cargar una cuarta letra (detector C7) se recomienda servir el wordmark como SVG con la letra
convertida a trazo. El logo se rediseña después de elegir dirección (§12): la recomendación vale para el que venga.

## 12 · El amarillo y el oro: historia, no regla (desde el 16-oct)

**Decisión de Ramón, 16-oct:** «no te preocupes por el logo de la marca, es muy probable que lo tenga que cambiar por
la nueva imagen del sitio». Desde ahí, **el wordmark (Gabarito con el punto `#C9A227`) y la regla de un solo oro por
vista no son restricción** para las direcciones ni para las fotos: el logo se rediseña después de elegir dirección,
con la imagen nueva del sitio. En el tablero, «Dónde va el punto dorado» salió y quedó una nota corta («El logo,
después»). **El amarillo ya no tiene que esquivar el oro:** nada de lo que sigue obliga. Se deja escrito porque
explica por qué el resaltador es `#EEF26E` y no otro, y porque el logo nuevo tendrá que volver a medirse contra él.

Lo que queda en pausa con esta decisión (no se borra; se retoma con el logo nuevo): la guarda del resaltador
(«nunca más cálido que 60°»), las opciones A y B del punto dorado y sus capturas
(`../tableros/e10-direcciones/img/var-oro-*.jpg`, que `variantes.mjs` solo rehace con `ORO=1`), la regla «el
amarillo y el oro nunca comparten banda», el oro por vista como criterio de QA y la medición de oro dentro de las
fotos (manual §07b), que es de la pauta de Bruno. Los prototipos siguen mostrando el wordmark actual, con su punto
dorado en el pie, para que las páginas se lean completas.

### Lo que se midió (15 y 16-oct)


Criterio del manual §07b, con el mismo código de `marketing/brand/instagram-v3/medir.py` (HSV de
PIL): cuenta como oro un color con **tono de 38 a 54°, saturación ≥ 0,5 y brillo ≥ 0,5**.

| Color | Tono | Saturación | Brillo | ¿Oro? |
|---|---|---|---|---|
| Oro SpindleLab `#C9A227` | 45,6° | 0,806 | 0,788 | **sí** (control) |
| **Amarillo The Ready `#F4F480`** | **60,0°** | **0,475** | 0,957 | **no** |
| **Resaltador propio `#EEF26E`** (desde el 16-oct, §10b) | **61,8°** | 0,545 | 0,949 | **no** |
| Papel propio `#F7F5F0` | 42,9° | 0,028 | 0,969 | no |
| Lima `#E6FA97` | 72,1° | 0,396 | 0,980 | no |
| Gris cálido `#ECECE2` | 60,0° | 0,042 | 0,925 | no |
| Naranja `#EC6227` | 18,0° | 0,835 | 0,925 | no |

El amarillo de The Ready no cae en el rango: queda 5,6° por encima del límite de tono y 7 puntos (de 255) por
debajo del de saturación. No hacía falta ajustarlo, pero estaba cerca, así que se fijó una guarda (hoy en pausa).

Corregido el 16-oct (§10b): el valor que se usa es el **resaltador propio `#EEF26E`**, más fluor y un poco
más verde que el de ellos, 7,8° por encima del límite de tono. La guarda que se fijó entonces («el resaltador
nunca es más cálido que 60°»; de los vecinos probados, solo `#F4E76E`, 54° y 0,55, entraba al rango del oro)
**queda como historia desde el 16-oct**: ya no obliga. El `#F4F480` exacto vuelve solo si Ramón elige los colores
de The Ready en el tablero.

**El punto dorado era el que tenía el problema, no el amarillo.** Sobre el papel de The Ready da
**2,40:1**; sobre amarillo 2,08, lima 2,13, lavanda 1,75 y gris 2,03. Con la paleta propia: sobre el
papel `#F7F5F0` **2,22:1** (el valor que ya traía el manual §02) y sobre el resaltador 2,02. La regla que
ya está en el manual (§02) dice que bajo 3:1 el punto va en el color del texto y esa vista queda con cero
oros. **Solo sobre ciruela llega: 6,24:1 sobre el ciruela del manual** (7,80 sobre el de The Ready).
Entonces se propusieron dos opciones, que el tablero mostró hasta el 16-oct y hoy son historia:

- **A · recomendada (aplica el manual tal como está):** en el módulo de navegación, el wordmark va en
  ciruela con el punto en ciruela; **el punto dorado es el del wordmark gigante de la banda final**
  ciruela. El oro queda donde el sitio invita a conversar: el punto donde te encuentran, al final.
  Cero oros en el resto de las vistas, que el manual da por válido.
- **B · si Ramón quiere el oro en la primera pantalla:** el módulo de navegación pasa a ciruela (la
  «única placa» del manual, que hoy es negra), con el punto a 6,24:1, y el punto del pie va en papel.
- En los dos casos, la banda del punto dorado no llevaba el resaltador («el amarillo y el oro nunca comparten
  banda»). En pausa con el resto.

## 13 · Reglas para que el juego no se vuelva tic

El juego funciona en The Ready porque cada recurso tiene un trabajo y aparece pocas veces. Medido,
y convertido en techo:

| Recurso | Máximo | Rol, y solo ese |
|---|---|---|
| **Cinta** | **1 por página**; **3 páginas en todo el sitio** (Taller) o **1, la home** (Pizarra limpia). Nunca dos a la vista | Bajo el hero o como cambio de tema entre dos secciones. Texto: solo palabras que ya están en el copy de E8 (por ejemplo, los cuatro nombres de servicio que ya son títulos en la home). Ninguna frase nueva |
| **Marcador (resaltador)** | **Hasta 4 frases por página** en las dos; **2 a la vista** en Taller y **1** en Pizarra limpia (corregido el 16-oct: Pizarra tenía uno por página y ahora llega a 4, de a uno a la vista). Medido: Taller 4 / 2 / 3 y Pizarra 4 / 2 / 2 (home, Acompañamiento, Trabajo); a la vista, 1, salvo Trabajo de Taller con 2 de 390 a 1024 | La consecuencia de la frase, **al final de su oración**. Largo según dónde (medido en The Ready, §5; corregido en la ronda 2, que decía «2 a 6» para todo): **en un titular, de 2 a 6 palabras**; **en una entradilla, una cita o el cuerpo, la parte final de la oración, hasta 9**. Nunca una palabra suelta de adorno; nunca junto a otro cambio en la misma frase (cursiva, otra letra, otro color); nunca en enlaces, botones, precios ni cifras sin fuente. Si la frase no tiene una consecuencia que subrayar, no lleva marcador (tell #4). **Una sola excepción, escrita:** en el titular del hero el marcador va en «se corta» y no al final («Ahí se corta el circuito»), porque en castellano la consecuencia está en el verbo (lo que pasa es que *se corta*; «el circuito» ya lo nombra la línea) y la composición parte la línea justo después: «se corta» cierra la primera línea y el hilo que nace del borde se corta antes de «el circuito». No hay otra: en Trabajo el marcador pasó de «cuál es cuál» a «cuál es cuál en cada una.», que cierra la oración. Medido en `../tableros/e10-direcciones/img/ronda2.json` (y otra vez el 16-oct, tras la ronda 3, con `marcador3.mjs` de Javiera): Taller tiene 9 marcadores y 8 cierran su oración; Pizarra limpia, 8 y 7 (no lleva el de «el sitio se arma solo.» en Trabajo). En las dos, el que no cierra es la excepción, «se corta» |
| **Banda del resaltador** | **1 por página** en Taller; **0** en Pizarra limpia | Lo que el cliente gana. Nunca dos bandas de color seguidas. Ahí el botón lo cruza el papel, no el amarillo |
| **Banda ciruela** | **1 por página**, la última | El llamado final, con el display en papel, el botón papel y el wordmark gigante (el logo actual; se rediseña después, §12) |
| **Lima, lavanda, naranja** | **0** en el sistema propio | Solo con la opción «colores exactos de The Ready», en su rol de allá (portada de Trabajo, botón del pie, fondo del sello) |
| **Marca de revisión a mano** (flecha, visto, anillo) | **1 por página** (Taller); **0** (Pizarra limpia) | Señala una acción o una prueba: el campo del chequeo, la prueba de los robots, el botón del chequeo. Nunca detrás de texto, nunca un adorno junto a un titular. Las de los prototipos son **provisionales**, generadas con semilla (`herramientas/marcas.mjs`) para fijar forma y lugar; las definitivas las traza Bruno a mano, y el tablero lo dice |
| **Flecha del chequeo** (Taller, home; ronda 3 de QA, defecto 1) | **Entera dentro de la pantalla en todo ancho.** Nunca se esconde un desborde con `overflow`: si no cabe, cambia de lugar | Tres lugares, uno por tramo. **Hasta 1023** (una columna): sobre el campo, a la derecha del sello, bajando al botón (104×64, girada −64°). **De 1024 a 1299**: bajo el chequeo, dentro de su caja, a la derecha de la nota, subiendo al botón (104×64, girada 64°). **Desde 1300**: a la derecha del chequeo, a 18 px, apuntando al botón (196×120). Antes iba a la derecha desde 1024, pero entre 1024 y 1258 el chequeo llena el ancho útil y la flecha salía de la pantalla (de 1024 a 1119 se veía solo la punta); el `overflow-x: clip` del `body` la cortaba sin agrandar el documento. El corte va en 1300 y no en 1259 porque la media query mide la ventana **con** la barra de desplazamiento: con una barra de 17 px, a 1259 la flecha se volvía a cortar; desde 1300 queda a 30 px del borde con barra y a 47 sin ella. Medido en `../tableros/e10-direcciones/img/flecha.json` (`herramientas/flecha.mjs`: el trazo del SVG, no su caja, en 112 anchos de 360 a 1920, px a px de 1016 a 1032 y de 1250 a 1310, con y sin barra): entera en las 224 vistas, a 6 px o más de todo texto, y el documento sin desborde con el clip apagado. Aviso, no falla, fuera de lo que se cambió: a 360 el trazo roza el filete de afuera del sello (−1 px); se resuelve con la spec de la dirección elegida |
| **Filete que nace del borde** (de The Ready, declarado; ronda 2, defecto 5) | **2 por página** contando el hilo del hero (Taller); **0** (Pizarra limpia, que separa con el filete de la ficha a todo el ancho). Nunca dos a la vista | Abre la serie de lo que se ofrece: el hilo del hero (que se corta antes de «el circuito»), el filete sobre «Desarrollo» (abre los cuatro servicios) y el de «Elige la cobertura» (abre los planes). Nunca donde la sección ya abre con un filete a todo el ancho ni junto a la cinta, que lleva los suyos. Medido: Taller 2 / 1 / 0 por página, 1 a la vista (`img/ronda2.json`). Antes iba sobre cada titular de sección: 5 / 5 / 1 |
| **Sello** | **1 por página**, solo Taller; puede haber 0 | Un rótulo mono que ya existía, adentro; no un botón ni un texto nuevo |
| **Botón grande** | **Uno: el del chequeo** (manual §07) | El resto de los llamados son el botón de la marca (50 px) o texto. No hay óvalo |
| **Mono en mayúsculas** | Solo a 11-13 px | Rótulos, navegación, migas y botones. Nunca un titular, nunca una frase |
| **Escala display, en todo ancho** (corregida en la ronda 2, defecto 2: antes valía solo a 390) | **tamaño = min(escalón, caja ÷ palabra)** | Toda letra display (titulares, citas, entradillas grandes, el número de semana, el titular del pie) va al tamaño de su **escalón** (138 / 91 / 52 / 31 en escritorio; 86,9 / 59,6 / 36,3 / 24 en una columna) o, si su **palabra más larga** no cabe en su **caja**, al tamaño que la deja caber. La palabra se mide en em con la letra cargada (Instrument Sans 540, −0,02em, kerning incluido; `img/palabras.json`, con 1 % de margen). La caja es la del titular, no la pantalla: su columna. En el hero la unidad es **la línea «Ahí se corta»**, que la composición no deja partir (en Taller se suma la sangría de 1,15em de la segunda línea). Los titulares que se leen juntos, una **serie**, van al tamaño del que menos cabe: los cuatro servicios de Taller, las dos puertas y los dos que siguen de Pizarra, los tres planes y las cuatro obras. Nunca se corta una palabra con guion; nunca se esconde un desborde con `overflow` |
| **Dos composiciones** (ronda 2, defecto 2) | **Una columna hasta 1023 px; escritorio desde 1024** | Entre 768 y 1023 las columnas de 5/12 del escritorio dejaban 200 a 234 px: «Desarrollo» y «Continuidad» quedaban debajo de la foto y la cita de «Qué hacemos» en una palabra por línea. En la composición de una columna, el margen es lineal entre los dos medidos (§6: 24 px a 390 y 75 a 1440, con piso 24; 42 a 768) y el escalón es el de celular. Desde 1024, escritorio con margen 75 y la regla de arriba |

**La regla, medida** (`../tableros/e10-direcciones/herramientas/anchos.mjs` → `img/anchos.json`): 14 anchos (360, 390, 430,
600, 700, 768, 820, 900, 1024, 1180, 1280, 1366, 1440 y 1920) por las seis páginas, 84 vistas. En ninguna hay un
titular fuera de su caja o de su columna, una palabra más ancha que su caja, un titular encima de una foto o de otro
texto, ni un documento más ancho que la pantalla (antes: 20 vistas con falla, `scrollWidth` hasta 1191 contra 768).
**Desde la ronda 3, el documento se mide dos veces:** con el clip del `body` puesto y con el clip apagado (`html` y
`body` con `overflow-x: visible`), porque el clip esconde lo que sale de la pantalla y un `::after` no tiene caja que
se pueda pedir. Con el clip apagado, la versión anterior daba 1163 a 1024 y 1259 a 1180 en la home de Taller (la
flecha); hoy, 0 desbordes en los dos modos en las 84 vistas.
Tamaños que resultan (px):

| Titular | 360 | 390 | 768 | 1024 | 1180 | 1440 |
|---|---|---|---|---|---|---|
| «Ahí se corta / el circuito» (Taller · Pizarra) | 56,5 · 58,4 | 62 · 64 | 86,9 | 138 | 138 | 138 |
| «Acompañamiento mensual» (Taller; Pizarra igual desde 1024) | 38 | 41,7 | 83,3 | 106,5 | 125,5 | 138 |
| Los cuatro servicios de Taller (serie) | 55,5 | 59,6 | 59,6 | 72,7 | 86,6 | 91 |
| «Continuidad» y «Alcance» de Pizarra (serie) | 36,3 | 36,3 | 36,3 | 44,7 | 52 | 52 |
| «Sobre el acompañamiento» (Taller) | 36,3 | 36,3 | 36,3 | 42,4 | 50,4 | 52 |

Capturas a 768 y 1024 de las seis páginas, como evidencia y no para el tablero (no ayudan a elegir entre las dos):
`../tableros/e10-direcciones/img/<dirección>-<página>-768-t<n>.jpg` y `-1024-t<n>.jpg`.

## 14 · Accesibilidad

**La cinta** se construye para pasar donde The Ready no pasa (WCAG 2.2.2: lo que se mueve solo y dura
más de 5 segundos tiene que poder pausarse):

- Un **botón de pausa** visible al final de la franja, enfocable con teclado, `aria-pressed`, con
  rótulo «Pausar cinta» / «Mover cinta» y área de 44×44 px a 390.
- Con `prefers-reduced-motion: reduce`, **quieta**, y empezando en el margen (no cortada a mitad de
  palabra como la de ellos).
- Velocidad **por tiempo**: 30 px/s en cualquier pantalla (duración = ancho del grupo ÷ 30).
- Se detiene fuera de pantalla.
- La franja va `aria-hidden="true"` y **no es un encabezado**: un solo `h1` por página (detector C1).
  Lo que dice la cinta ya está escrito en la página; no hay información que solo viva en ella.

**El marcador** es adorno: nada se entiende solo por él (el texto se lee igual sin la banda), en modo
de colores forzados desaparece sin perder contenido, y con movimiento reducido aparece completo, sin
dibujarse. El texto encima mantiene su contraste (ciruela sobre el resaltador propio, 12,62:1; sobre el
de The Ready, 16,27:1).

**Contraste.** Con la paleta propia: ciruela sobre papel 13,85:1, papel sobre ciruela 13,85:1, ciruela
sobre el resaltador 12,62:1, el texto de ejemplo del campo (`#6B5A6B`) 5,84:1. Medido sobre los seis
prototipos con `npm run verificar` a 390 y 1440: ningún hallazgo de contraste. Las combinaciones de
The Ready (opción del tablero) también aprueban AA (§3: la más baja, casi negro sobre naranja, 5,89:1).
No se toman los rótulos grises de Gehl (1,80:1). El punto dorado, que no es texto, seguía la regla de 3:1
del manual (§12); queda en pausa con el logo. Repetido el 16-oct tras la ronda 2 (peso 540, regla de escala,
chequeo apilado): `npm run verificar` sobre los seis prototipos, a 390 y a 1440, sin hallazgos de contraste,
desborde, `h1`, `alt` ni JSON-LD.

**Foco.** El de The Ready se toma: contorno de 2 px a 4 px de distancia, ciruela sobre papel y papel
sobre ciruela. En el chequeo el foco lo muestra la barra entera (campo y botón). Los botones tienen 50 px
de alto y las pestañas 44 a 390.

**Campo del chequeo a 390** (ronda 2, defecto 6). Hasta 767 px el campo va a todo el ancho y el botón debajo, como
en el build: quedan 308 px útiles a 390 y 278 a 360, y «constructoraandesur.cl» (186 px) se lee entero sin correrse
dentro del campo. En fila quedaban 135 a 142 px. Desde 768, en fila (468 px útiles en Taller a 768). Medido en
`../tableros/e10-direcciones/img/ronda2.json`.

**Peso.** Tres familias y sus pesos medidos: Instrument Sans (un variable, usado a 540), IBM Plex Sans 400 y
700, IBM Plex Mono 500. Ninguna letra declarada sin uso.

## 15 · Lo que esto reabre del manual (decide Ramón en la compuerta 2)

El manual v3.0 copia driftime. Tomar The Ready cambia decisiones que Ramón aprobó; ninguna se aplica
sin su sí. **Corregido el 16-oct** (ronda 1, defecto 3): la tabla ahora está también en el tablero, en
«Lo que también decides», fila por fila con su fecha, junto con la decisión de los colores (la del punto
dorado salió el 16-oct: es una nota corta, §12); y con lo propio de §10b cambia menos de lo que decía la versión anterior (el radio de 6 px se
queda en los controles y el papel y el ciruela son los del manual).

| Manual hoy | Con cualquiera de las dos direcciones | Se aprobó |
|---|---|---|
| §04 Lienzo negro puro `#000000`, texto papel | Lienzo papel `#F7F5F0` (el del manual) con una sola tinta ciruela `#341F34` | 27-sep, Ramón |
| §04 Cuatro campos de color a pantalla entera, uno por pilar | Taller: una banda del resaltador por página («lo que ganas») y la ciruela al final. Pizarra limpia: un solo fondo, solo el pie en ciruela | 5-oct, ratificado al fijar driftime como vara |
| §05 Manrope en titulares y cuerpo | Instrument Sans en titulares, IBM Plex Sans en cuerpo, IBM Plex Mono en rótulos y botones | 29-sep, Ramón |
| §05 Display en MAYÚSCULAS 800 en cinco lugares; titulares internos chicos (h1 60, h2 30) | Todos los titulares en caja de oración, 540, grandes en todas las páginas (138 / 91 / 52, con la regla de escala de §13) | 5-oct, Ramón |
| §05 Rótulos en caja normal, sin interletra positiva | Rótulos, navegación y botones en mono, MAYÚSCULAS, +0,03 y +0,1em | 5-oct, Ramón |
| §06 y §02 El punto dorado en el módulo de cada vista | **Queda abierto**: el logo se rediseña después de elegir dirección (Ramón, 16-oct). Las opciones A y B de §12 son historia | Un oro por vista: 5-oct (spec §1 y §7); la regla de 3:1 del punto: manual v3.0, 7-oct; en pausa: 16-oct |
| §07 Radio único de 6 px, botones chicos (36 px), cero píldoras | El radio de 6 px **se queda** en botones, campo, módulo y pestañas; fotos y piezas con radio 0; botones de 50 px en mono; sin óvalo ni píldoras | 5-oct ratificado; escrito en la spec el 6-oct |
| §07 Movimiento: entrada, Lenis, campos pegajosos | Se suman la cinta (pausable) y el dibujo del resaltador; los campos pegajosos salen porque no hay campos | Sin fecha: lo escribió la spec, no hay un sí de Ramón registrado |

El texto de E8, los precios, el chequeo y el formulario **no cambian**. La regla de personas generadas como
ambiente (manual §07b) ya la aprobó Ramón el 15-oct. **Quedan abiertos desde el 16-oct**, por decisión de Ramón,
Gabarito como wordmark, el punto como única firma gráfica y la regla de un oro por vista: el logo se rediseña después
de elegir dirección (§12). El tablero lo dice en una nota corta y ya no pide decidir dónde va el punto.

## 16 · Evidencia

- `lock/medicion-the-ready.json`: tipografía con archivos y licencias, paleta con su área por página,
  tonos y contraste de cada par, cinta (configuración, fórmula, velocidad, mouse, movimiento reducido,
  árbol accesible), marcador (configuración, geometría, serie del dibujo con y sin movimiento
  reducido, frases por página), botones en reposo, al pasar el cursor y con foco, grilla, filetes,
  ritmo por sección, fotos, recorridos, y la medición cruda de las ocho vistas.
- `lock/medicion-gehl.json`: aire, densidad, columna, foto a sangre, serif con su licencia, y la
  medición cruda de las cuatro vistas.
- `lock/the-ready/`: `home|servicios|caso|nosotros-1440.jpg` y `-390.jpg` (primera pantalla),
  `-1440-completa.jpg` (a 480 de ancho) y `-390-completa.jpg`; `cinta-*`, `subrayado-*`, `boton-*`,
  `foto-grano-hero-x2.png`.
- `lock/gehl/`: `home|caso-1440.jpg`, `-390.jpg` y sus completas.
- `lock/tipos-comparados.png`.
- Ronda 1 de QA (16-oct), en `../tableros/e10-direcciones/`: `img/orden-hero.json` (orden del hero),
  `img/variantes.json` y `img/var-*.jpg` (logo tapado, colores, punto dorado), `texto-igual.json`
  (texto y orden de lectura, 12 de 12), `img/medidas.json` (densidad total y de lectura).
- Ronda 2 de QA (16-oct), en `../tableros/e10-direcciones/`: `img/anchos.json` (la regla de escala en 14 anchos y
  84 vistas, `herramientas/anchos.mjs`), `img/palabras.json` (cada palabra de la letra display en em,
  `herramientas/palabras.mjs`), `img/peso.json` y `lock/peso-instrument-saans.png` (el peso, `herramientas/peso.mjs`;
  el archivo de Saans no está en el repo y se le pasa la ruta), `img/ronda2.json` (chequeo a 360, 390 y 768,
  filetes y marcadores, `herramientas/ronda2.mjs`), `img/texto-js-encendido.txt` (texto con JavaScript encendido,
  por el método de Javiera) y las capturas a 768 y 1024 (`img/*-768-t*.jpg`, `img/*-1024-t*.jpg`).
- Ronda 3 de QA (16-oct), en `../tableros/e10-direcciones/`: `img/flecha.json` (la flecha del chequeo de Taller en 112
  anchos, con y sin barra de desplazamiento, `herramientas/flecha.mjs`), `img/anchos.json` rehecho con el desborde
  medido también con el clip apagado, y `img/taller-home-1024-t*.jpg` capturadas de nuevo: antes medían 1163 de ancho,
  porque la flecha ensanchaba la página completa; hoy, 1024. Las capturas del tablero (1440 y 390) no cambiaron: las 12
  vistas re-renderizadas son iguales al píxel a las de antes del arreglo.

## 17 · Lo que el lock no cambia: el orden del hero

El lock fija el lenguaje, no el recorrido. **El hero va en el orden del sitio construido**, que es una
decisión de Ramón con criterio de conversión (spec §0.4, «dirección A, el instrumento primero en la
home»; spec §4, «instrumento → display → fila de 4 obras»): el chequeo arriba, después el ojillo y el
titular, después la fila de obras. Las dos direcciones lo respetan (corregido el 16-oct, defecto 4: la
primera versión ponía el titular primero y, en Taller, bajaba las obras debajo de «Qué hacemos»).
Medido en `../tableros/e10-direcciones/img/orden-hero.json`: a 1440 el sitio pone el chequeo en y 142 y el titular en 340; Taller,
151 y 453; Pizarra limpia, 151 y 502. Y en las tres páginas el orden de lectura es el del build (12 de 12
vistas, `texto-igual.json`); la composición se hace con CSS, no moviendo bloques. Cambiar ese orden sería
una decisión aparte de Ramón, nunca un efecto de la dirección de arte.

**El chequeo, tal cual también en su forma a 390** (ronda 2, defecto 6). El build apila el campo y el botón en el
teléfono; los prototipos los ponían en una fila y el campo quedaba con 135 a 142 px útiles. Desde la ronda 2, hasta
767 px van apilados como en el build (308 px útiles a 390; «constructoraandesur.cl» se lee entero) y desde 768 en
fila. Los nodos del formulario (`chq-*`, atributos, placeholder, aria) siguen siendo los del build.

## 18 · Historial de correcciones

| Fecha | Corrección | Tipo | Origen |
|---|---|---|---|
| 16-oct | El marcador es propio en la forma; se toman la idea y el tiempo. §5 y §10 decían «tal cual medido» | **regla** | Javiera, ronda 1, defecto 6 |
| 16-oct | Nada se toma de The Ready al hex ni al milisegundo sin decirlo: §10b, recurso por recurso. Paleta propia (papel y ciruela del manual, resaltador `#EEF26E`); sin óvalo, encabezado de 90 px, collage, garabatos ni mancha; entran el módulo, el botón y el chequeo de la marca, las marcas de revisión y el sello | **regla** | Javiera, ronda 1, defecto 6 |
| 16-oct | Los colores exactos de The Ready son una decisión de Ramón en el tablero, dicha como suya, no un valor por defecto | **regla** | Javiera, ronda 1, defecto 6 |
| 16-oct | El orden del hero es el del sitio (spec §0.4) y el orden de lectura es el del build en todas las páginas; `texto-igual.mjs` lo exige | **regla** | Javiera, ronda 1, defecto 4 |
| 16-oct | La escala display (138 / 91 / 52) va en todas las páginas de las dos direcciones; en Pizarra limpia los servicios se ordenan en dos puertas de entrada y dos que siguen; el techo de densidad de Pizarra se mide sobre el texto de lectura | **regla** | Javiera, ronda 1, defecto 5 |
| 16-oct | Las reglas del manual que cambian, con su fecha, y la opción del punto dorado van en el tablero, no solo en el lock | **regla** | Javiera, ronda 1, defecto 3 |
| 16-oct | La escala display tiene una regla para todos los anchos: tamaño = min(escalón, caja ÷ palabra más larga), medida con la letra cargada; el hero se mide por su línea; las series van al tamaño del que menos cabe. Antes la regla valía solo a 390 y entre 768 y 1180 los titulares se cortaban o quedaban bajo una foto | **regla** | Javiera, ronda 2, defecto 2 (y el resto del 11 de la ronda 1: 360 px) |
| 16-oct | Dos composiciones: una columna hasta 1023 px, escritorio desde 1024; margen lineal entre los dos medidos | **regla** | Lucía, al cerrar el defecto 2: a 768 la regla evitaba el corte, pero la composición de escritorio dejaba columnas de 200 px |
| 16-oct | El marcador cierra su oración; su largo depende de dónde (titular 2 a 6, frase de lectura hasta 9, medido en The Ready). Una sola excepción escrita: «se corta» en el hero. En Trabajo, «cuál es cuál en cada una.» | **regla** | Javiera, ronda 2, defecto 3, y ronda 1, defecto 8 |
| 16-oct | Las personas de las fotos son gente en su propio trabajo; ningún texto dice «empresa cliente». Las marcas de revisión se presentan como provisionales | **regla** | Javiera, ronda 2, defecto 4, y ronda 1, defecto 9 (a y d) |
| 16-oct | El filete que nace del borde: de The Ready, declarado, con rol (abrir la serie de lo que se ofrece) y techo (2 por página contando el hilo del hero; 0 en Pizarra) | **regla** | Javiera, ronda 2, defecto 5 |
| 16-oct | Hasta 767 px el chequeo apila campo y botón, como el build | **regla** | Javiera, ronda 2, defecto 6 |
| 16-oct | Instrument Sans va a 540 en toda la letra display: iguala el asta de Saans 500 y deja la tinta a −4 % | **preferencia** medida | Javiera, ronda 2, defecto 7, y ronda 1, defecto 10 |
| 16-oct | El wordmark y la regla de un oro por vista quedan abiertos: el logo se rediseña después de elegir dirección. La guarda del resaltador contra el oro y las opciones A y B del punto pasan a historia (§12); el tablero cambia «Dónde va el punto dorado» por una nota corta | **regla** | Ramón, 16-oct |
| 16-oct | Ronda 3 (aprobada), arreglos de pasada. La flecha del chequeo de Taller va entera en todo ancho: de 1024 a 1299, bajo el chequeo (§13, «Flecha del chequeo»); nunca se esconde un desborde con `overflow`, y `anchos.mjs` mide el documento también con el clip apagado. En cada tramo se sirve un archivo que cubre dpr 2 en su ancho más grande; F1, F5 y F7, en §7 (el cambio de la pauta es de Bruno). Cifra del marcador corregida: Taller 9 (8 cierran), Pizarra 8 (7 cierran); la regla no cambia | **regla** (flecha, desborde y fotos por tramo); la cifra es un dato | Javiera, ronda 3, defecto 1 y «sin severidad»; observación para la spec |
