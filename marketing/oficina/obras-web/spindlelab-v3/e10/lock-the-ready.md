# Lock de referencia: The Ready, con la claridad de Gehl (medido)

**15-oct-2026 · Lucía (dirección de arte).** Reemplaza a `../referencia-driftime/lock-driftime.md`
como referencia del sitio v3. Sale de lo que Ramón marcó en la página de referentes
(`referentes/marcas-15oct.json`):

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

**Lo que sí es a mano** son los **garabatos e íconos dibujados**, PNG en ciruela (medido en la
captura: ~`#18082A`): el ovillo junto al h1 de la oferta, los tres íconos de investigar, decidir
y mover, los cuadrados concéntricos de la portada del caso, los rulos de la banda amarilla de la
home. Más la mancha naranja de borde orgánico. Uno o dos por página; nosotros no tiene ninguno.

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
  puede traer oro; se mide igual que las del pool.

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

| De The Ready | ¿Se toma? | Cómo, y por qué |
|---|---|---|
| Papel `#FFFEFA` como lienzo, ciruela `#1B0925` para titulares, botones y la banda final, casi negro `#0D0C0E` para el cuerpo | **Sí** | Es el sistema que Ramón marcó («los colores»). Reemplaza el lienzo negro y el texto papel de driftime |
| Amarillo `#F4F480`: el marcador y bandas enteras | **Sí, con techo** (§13) | Es la huincha. No cuenta como oro (§12) |
| Lima `#E6FA97` | **Sí, un solo rol:** portada de las páginas de obra (Trabajo) | Es el rol que tiene en The Ready: solo en casos |
| Lavanda `#EDD1FF` | **Solo** como óvalo de la banda final ciruela; **nunca** como banda | Tono 277°: es la familia violeta del tell #1 de refero. Como botón sobre ciruela es un acento; como banda de cita vuelve la página una paleta SaaS |
| Gris cálido `#ECECE2` | **Solo el pie** | En The Ready su rol grande es la banda del muro de logos, que no existe aquí |
| Naranja `#EC6227`, la mancha con rótulo | **Solo en la dirección Taller**, una por página | Es la pieza más de agencia de la paleta, y su tono (18,0°) queda a 3,7° del brasa `#DA3400` (14,3°), el campo de driftime que Ramón descartó |
| Saans en todos los titulares, en caja de oración, peso 500, −0,02em | **Sí, con Instrument Sans** (§11) | «La tipografía». Saans tiene licencia comercial |
| La escala 138 / 91 / 52 / 31 a 1440 y 87 / 60 / 36 / 24 a 390 | **Sí**, con el tope de palabra larga de §13 | Medida |
| IBM Plex Sans para el cuerpo e IBM Plex Mono para rótulos, navegación y botones | **Sí, las mismas** | Son libres (OFL) |
| Rótulos mono en MAYÚSCULAS con +0,03em; botones con +0,1em | **Sí**, solo en mono y solo a 11-13 px | Es el contrapunto del sistema. Reabre una regla aprobada (§15) |
| Interlínea 1,2 del cuerpo | **No: 1,45** | 1,2 es apretado para castellano con tildes y eñes a 17 px. Desvío escrito, no gusto |
| La cinta | **Sí, reconstruida** (§14) | Mismo alto, letra, dirección y velocidad (30 px/s). Distinto: se puede pausar, la velocidad va por tiempo y no por cuadro, no es un `h1`, y el separador es el interpunto «·» en ciruela del manual §06, no el ✳︎, que es firma de The Ready |
| El marcador detrás de la frase: 1em, remate cuadrado, 0,12em de vuelo, dibujo a la derecha en ~470 ms | **Sí, tal cual medido** | Es la otra mitad de la huincha. Se construye con CSS (fondo con `box-decoration-break: clone`) o con un SVG `aria-hidden` |
| Los garabatos en ciruela | **Sí, en la dirección Taller**, uno por página | Son lo único de verdad a mano. Hay que producirlos (Bruno): trazo de rotulador, ciruela, sin texto |
| Óvalo grande como llamado principal; hover que invierte y crece ×1,10 | **Sí** | Con ancho mínimo para que el texto no se parta (su defecto a 390) |
| Botón rectángulo de radio 0 en el encabezado | **Sí** | |
| Filete ciruela de 1 px que nace del borde izquierdo | **Sí** | Es barato, propio de la referencia y ordena el titular |
| Margen lateral 75 px a 1440 y 24 a 390; ~96 px de aire por sección | **Sí** | Gehl mide casi lo mismo (72 y 20): las dos referencias coinciden |
| Fotos de radio 0, con grano en el archivo, saturadas, gente trabajando de espaldas o de perfil | **Sí, generadas con IA** | Con la regla nueva: personas como ambiente, nunca presentadas como equipo ni como clientes, y medidas por oro (§07b) |
| Collage de fotos que se montan y tocan los bordes | **Solo en la dirección Taller** | |
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
| **Techo de densidad** | **Sí, en Pizarra limpia:** el texto cubre como máximo **15 %** de la página a 1440 | Gehl 10-12 %; The Ready 14-30 % |
| **Aire entre bloques parejo:** 40 + 40 px | **Sí, en Pizarra limpia**, dentro de las secciones de 96 px de The Ready | Cumple un trabajo distinto: el de The Ready separa secciones, el de Gehl separa bloques dentro de una |
| **Columna de lectura corrida**, rótulo a la izquierda | **Sí, en las dos** | Las dos referencias lo hacen. Con tope de **68 caracteres por línea** (`max-width` en em), no los 89-106 de Gehl |
| **Foto a sangre** | **Sí, como banda propia**: 100 % del ancho, 16:9 o 21:9 a 1440, 4:5 a 390 | **Nada escrito encima** salvo una etiqueta de pieza: el manual §07b prohíbe texto y velos sobre las fotos, y Gehl sí pone el titular encima. El hero conserva su titular y su chequeo fuera de la foto |
| Foto principal de caso inset con radio 8 | **No** | Las fotos van con radio 0 (The Ready manda en la forma) |
| Serif de lectura (Times Now) | **No** | Es de pago, Ramón no la marcó, y sería la cuarta familia (detector C7). Si se quiere una serif para el cuerpo largo de los casos, la coherente es **IBM Plex Serif** (OFL, de la misma familia que Plex Sans y Mono), y queda como opción abierta, no como parte del lock |
| Rótulos grises `#C4BDB3` | **No** | 1,80:1 |
| Carrusel en el hero | **No** | |

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
100), así que el peso fino se ajusta en el tablero si el 500 se ve más liviano que Saans. Trae todo
el castellano (á é í ó ú ü ñ ¿ ¡ « »).

**Alternativa: Funnel Sans** (NORD ID, Kristian Möller; OFL). Es la de ancho más parecido (1,01) y su
forma general empata con Instrument, pero su x es más alta (0,741) y su espacio más abierto (0,242em):
se ve un poco más redonda y más ancha de aire. Variable en peso (300 a 800).

**Por qué no las de mejor puntaje bruto:** Host Grotesk abre el espacio entre palabras un 48 % más
que Saans, y a tamaño display la línea se llena de huecos (se ve en el render de prueba). Be Vietnam
Pro es 12 % más ancha: «Ahí se corta el circuito» no entra igual. **Manrope**, la letra actual de la
marca, queda entre las tres más lejanas (0,734): es la razón de que el lock la cambie.

Render lado a lado, mismo texto y tamaño (96 px y 34 px, peso 500, −0,02em), con las letras clave
superpuestas a Saans: **`tipos-comparados.png`**.

**El sistema queda en tres familias cargadas:** Instrument Sans (titulares), IBM Plex Sans 400 y 700
(cuerpo) e IBM Plex Mono 500 (rótulos y botones). Gabarito sigue siendo el wordmark y nada más; para
no cargar una cuarta letra (detector C7) se recomienda servir el wordmark como SVG con la letra
convertida a trazo.

## 12 · El amarillo y el oro

Criterio del manual §07b, con el mismo código de `marketing/brand/instagram-v3/medir.py` (HSV de
PIL): cuenta como oro un color con **tono de 38 a 54°, saturación ≥ 0,5 y brillo ≥ 0,5**.

| Color | Tono | Saturación | Brillo | ¿Oro? |
|---|---|---|---|---|
| Oro SpindleLab `#C9A227` | 45,6° | 0,806 | 0,788 | **sí** (control) |
| **Amarillo The Ready `#F4F480`** | **60,0°** | **0,475** | 0,957 | **no** |
| Lima `#E6FA97` | 72,1° | 0,396 | 0,980 | no |
| Gris cálido `#ECECE2` | 60,0° | 0,042 | 0,925 | no |
| Naranja `#EC6227` | 18,0° | 0,835 | 0,925 | no |

**El amarillo no cae en el rango:** queda 5,6° por encima del límite de tono y 7 puntos (de 255) por
debajo del de saturación. **No hace falta ajustarlo.** Pero está cerca, así que se fija una guarda: el
amarillo es exactamente `#F4F480` y no se calienta. De los vecinos probados, uno solo entra al rango
(54°, saturación 0,55: `#F4E76E`); cualquier variante más cálida o más saturada que el original
queda prohibida, y una foto con amarillos se mide igual que una con oro.

**El punto dorado es el que tiene el problema, no el amarillo.** Sobre el papel de The Ready da
**2,40:1**; sobre amarillo 2,08, lima 2,13, lavanda 1,75 y gris 2,03. La regla que ya está en el
manual (§02) dice que bajo 3:1 el punto va en el color del texto y esa vista queda con cero oros.
**Solo sobre ciruela llega: 7,80:1.** Entonces:

- **Recomendado (aplica el manual tal como está):** en el encabezado, el wordmark va en ciruela con el
  punto en ciruela; **el punto dorado aparece en la banda final ciruela y en el pie**, si el pie va en
  ciruela. El oro queda donde el sitio invita a conversar: el punto donde te encuentran, al final.
  Cero oros en el resto de las vistas, que el manual da por válido.
- **Si Ramón quiere el oro en la primera pantalla:** el wordmark del encabezado va sobre un módulo
  ciruela (la «única placa» del manual, que hoy es negra, pasa a ciruela), con el punto a 7,80:1.
- **En los dos casos:** la banda donde está el punto dorado no lleva amarillo (ni marcador, ni texto
  amarillo en el óvalo). El amarillo y el oro nunca comparten banda.

## 13 · Reglas para que el juego no se vuelva tic

El juego funciona en The Ready porque cada recurso tiene un trabajo y aparece pocas veces. Medido,
y convertido en techo:

| Recurso | Máximo | Rol, y solo ese |
|---|---|---|
| **Cinta** | **1 por página**; **3 páginas en todo el sitio** (Taller) o **1, la home** (Pizarra limpia). Nunca dos a la vista | Bajo el hero o como cambio de tema entre dos secciones. Texto: solo palabras que ya están en el copy de E8 (por ejemplo, los cuatro nombres de servicio que ya son títulos en la home). Ninguna frase nueva |
| **Marcador amarillo** | **4 frases por página**; **2 a la vista** en Taller y **1** en Pizarra limpia | La consecuencia de la frase, al final, de 2 a 6 palabras. Nunca una palabra suelta de adorno; nunca junto a otro cambio en la misma frase (cursiva, otra letra, otro color); nunca en enlaces, botones, precios ni cifras sin fuente. Si la frase no tiene una consecuencia que subrayar, no lleva marcador (tell #4) |
| **Banda amarilla** | **1 por página** en Taller; **0** en Pizarra limpia (salvo la cinta de la home, si va sobre amarillo) | Lo que el cliente gana. Nunca dos bandas de color seguidas |
| **Banda ciruela** | **1 por página**, la última | El llamado final, con el display en papel y el óvalo |
| **Lima** | La portada de una página de obra | Nada más |
| **Garabato a mano** | **1 por página** (Taller); **0** (Pizarra limpia) | Al costado de un titular o a sangre en un borde; nunca detrás de texto |
| **Mancha naranja** | **1 por página**, solo Taller | Un rótulo mono adentro, no un botón |
| **Óvalo** | **1 a la vista** | El llamado principal. El resto de los enlaces son texto o el rectángulo del encabezado |
| **Mono en mayúsculas** | Solo a 11-13 px | Rótulos, navegación, migas y botones. Nunca un titular, nunca una frase |
| **Display a 390** | El tamaño de cada titular a 390 se fija por **su palabra más larga**: tiene que caber en 342 px | Medido en Instrument Sans 500: «circuito» cabe a 86,9 px; «Visibilidad» pide ≤ 73 px; «Continuidad» ≤ 61; «Acompañamiento» ≤ 42. Nunca se corta una palabra con guion en un titular |

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
dibujarse. El texto encima mantiene su contraste (ciruela sobre amarillo, 16,27:1).

**Contraste.** Todas las combinaciones de texto que se toman aprueban AA con margen (§3: la más baja,
casi negro sobre naranja, 5,89:1). Las que no se toman: los rótulos grises de Gehl (1,80:1). El punto
dorado, que no es texto, sigue la regla de 3:1 del manual (§12).

**Foco.** El de The Ready se toma: contorno de 2 px a 4 px de distancia, casi negro sobre papel y papel
sobre ciruela. **Óvalo** con ancho mínimo para que su texto no se parta a 390.

**Peso.** Tres familias y sus pesos medidos: Instrument Sans (un variable), IBM Plex Sans 400 y 700,
IBM Plex Mono 500. Ninguna letra declarada sin uso.

## 15 · Lo que esto reabre del manual (decide Ramón en la compuerta 2)

El manual v3.0 copia driftime. Tomar The Ready cambia decisiones que Ramón aprobó; ninguna se aplica
sin su sí:

| Manual hoy | Con The Ready | Aprobado |
|---|---|---|
| §04 Lienzo negro puro `#000000`, texto papel | Lienzo papel `#FFFEFA`, titulares ciruela, cuerpo casi negro | 27-sep |
| §04 Cuatro campos de color, uno por pilar | Bandas con humor y con rol (§13), no por pilar | 5-oct (ratificado con driftime) |
| §05 Manrope en titulares y cuerpo | Instrument Sans en titulares, IBM Plex Sans en cuerpo, IBM Plex Mono en rótulos | 29-sep |
| §05 Display en MAYÚSCULAS 800 en cinco lugares | Todos los titulares en caja de oración, 500 | 5-oct |
| §05 Rótulos en caja normal, sin interletra positiva | Rótulos y botones mono en MAYÚSCULAS con +0,03 y +0,1em | 5-oct |
| §06 El punto dorado en el módulo de cada vista | El punto dorado solo sobre ciruela (§12) | (regla de 3:1 ya vigente) |
| §07 Radio único de 6 px, botones chicos, cero píldoras | Óvalo grande, rectángulo de radio 0, fotos de radio 0 | 6-oct |
| §07 Movimiento: entrada, Lenis, campos pegajosos | Se suman la cinta y el dibujo del marcador | (sin fecha: lo escribió la spec) |

Gabarito para el wordmark, el punto como única firma gráfica, la regla de un oro por vista, el texto
de E8, los precios, el chequeo y el formulario **no cambian**.

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
