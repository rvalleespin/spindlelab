# Manual de marca SpindleLab · v3.0 (7 oct 2026)

> ⚠️ **ESTADO: PROPUESTA EN EVALUACIÓN.** Esta versión la escribió la sesión del estudio web y
> **la evalúa la sesión de redes sociales** antes de que rija las publicaciones. Hasta que esa
> sesión deje su veredicto en `marketing/encargos-otras-sesiones/manual-v3-instagram-para-redes.md`,
> el capítulo §10 (Instagram) y el kit `instagram-v3/` son propuesta, no regla. Las secciones
> que describen el sitio (§01–§09) copian `driftime.css` y la spec v3, ya medidos.

> Fuente de verdad del sistema de marca. **Esta versión copia el sistema del sitio v3**, que
> es el lenguaje de driftime.com traducido a SpindleLab y ya construido en
> `spindlelab-astro/src/styles/driftime.css` y las páginas `/v3/`. Se escribió para que
> Instagram se vea igual que el sitio (pedido de Ramón del 7-oct: *«dame un manual de marca
> que sea una copia del sitio de referencia. quiero avanzar con publicaciones en
> instagram»*).
>
> **Qué se copia y qué no.** Se copia el sistema tal como lo tradujimos: lienzo negro,
> cuatro campos de color, una tipografía display escasa, imagen como pieza, radio único,
> filas con filete. **No se copia nada propio de driftime:** ni su tipografía (landour), ni
> su logo, ni sus textos, ni sus clientes (lock §8).
>
> Cada sección dice si está **vigente** (sigue igual que en la v2.0) o **corregida contra el
> sitio**, y cada valor corregido lleva su fuente. Lo que quedó atrás vive en el historial.

**Abreviaturas de fuente:** `CSS` = `spindlelab-astro/src/styles/driftime.css` · `spec` =
`marketing/oficina/obras-web/spindlelab-v3/spec-visual.md` (su §7 es el historial de reglas
medidas) · `lock` = `…/spindlelab-v3/referencia-driftime/lock-driftime.md` · `NAV`, `PIE`,
`PIEZA`, `MOV` = `spindlelab-astro/src/components/v3/{NavV3,FooterV3,Pieza,MovimientoV3}.astro`
· `OG` = `marketing/brand/og-v3/` · **«medido»** = render con Chromium de las 14 rutas `/v3/`
a 1440×900 y 390×844 (7-oct), contraste con la fórmula WCAG 2.x.

## Leer esto antes de usar el manual

**La v3 todavía no está publicada.** Vive bajo `/v3/` con `noindex`, en la rama
`claude/magical-franklin-ckfki2` (`acta-qa-final.md`). El sitio que ve el público
(`spindlelab-site/`) sigue con su sistema hasta que la v3 se publique, y publicar es una
decisión aparte.

| Si estás produciendo… | Rige |
|---|---|
| El sitio nuevo (v3) | **Este manual**, y en el detalle la `spec`. Si los dos dicen distinto sobre el sitio, se mide el sitio y se corrige el que esté mal |
| Una corrección al sitio vivo, hoy | El sistema anterior (§ Historial, al final) |
| **Piezas de Instagram de SpindleLab** | **Este manual, §10**, y el kit `marketing/brand/instagram-v3/`. Ya **no** `marketing/redes/README.md` (sistema v2 de redes, retirado) |
| Otras piezas de redes (LinkedIn, portadas) | Este manual (§02 a §08). Sus formatos propios no están fijados todavía |
| Piezas de la línea Verifica y Cumple (Ley 21.719) | **Su línea editorial propia.** Este manual no la rige (decisión 7 del 7-oct) |
| Papelería, mini-diagnósticos, documentos | La proporción papel-dominante (§04b) |

**Estado de cada decisión.** No todo pesa lo mismo; conviene saber qué se aprobó y cómo:

| Decisión | Estado | Constancia |
|---|---|---|
| Lienzo negro puro `#000000` | **Aprobado por Ramón** | 27-sep-2026 |
| ~~Titulares en MAYÚSCULAS~~ (reemplazado el 5-oct, fila de abajo) | Aprobado por Ramón | 27-sep, ratificado el 29-sep |
| **Mayúsculas solo en el display: cinco lugares del sitio** (titular del hero y las cuatro palabras de campo) | **Aprobado por Ramón** | 5-oct-2026 |
| Manrope toma titulares y cuerpo; Gabarito solo el wordmark | **Aprobado por Ramón** | 29-sep-2026 |
| **driftime.com como la vara del sitio entero** | **Aprobado por Ramón** | 5-oct-2026 (`lock`, línea 3) |
| Campos brasa y ciruela · radio único de 6 px | Ratificados al fijar driftime como vara: driftime tiene los cuatro campos y un radio de 6 px (`lock` §3-4); la `spec` los da por regla (§1 y §7, 6-oct) | 5-oct-2026 |
| **Instagram copia el sistema del sitio** (las siete decisiones de §10) | Fijadas el 7-oct a partir del pedido de Ramón; él las ve en el kit antes de la primera publicación | 7-oct-2026 |

---

## 01 · Esencia *(vigente, sin cambios desde v1.3)*

- **Posicionamiento:** SpindleLab hace que las empresas aparezcan cuando sus clientes preguntan, en Google y en los motores de IA.
- **Sensación objetivo («solidez cercana»):** *confío en él, y además se entiende lo que dice*.
- **Personalidad:** cercano, preciso y con vida; un laboratorio de creatividad que optimiza la maquinaria de un negocio. Nunca: robots, cerebros, circuitos dibujados, degradados neón, jerga startup.
- **Idea rectora del sistema visual:** ser **el punto donde te encuentran** → el punto dorado como única firma gráfica.

## 02 · Wordmark *(vigente en la forma; corregido en el punto, la placa y el tamaño)*

**Vigente:**

- **Forma:** `SpindleLab.` · tipográfico puro, sin símbolo.
- **Tipografía:** Gabarito, y Gabarito no se usa para nada más (§05).
- **Versiones:** una línea (principal) · apilada `Spindle / Lab.` (firma de correo, laterales).
- **Área de respeto:** media altura de la «S» por todos los lados.
- **Prohibido:** otra tipografía · mayúsculas · contenedores tipo ícono de app · símbolos acompañando · dorado como color del texto.

**Corregido contra el sitio:**

| Tema | v2.0 decía | El sitio hace | Fuente |
|---|---|---|---|
| Color del punto | «SIEMPRE dorado», «no cambia nunca» | **Dorado cuando es el único oro de la vista.** En el pie gigante el punto va en **papel**, porque el oro de esa vista ya está en el módulo de navegación | `CSS`:311-314 · `PIE`:45 |
| Placa | «sin contenedor» | **Puro, sin placa**, en todo lo que es marca (imagen OG, Instagram, documentos). La única placa es la del **módulo de navegación**: negro al 75 %, desenfoque de 8 px, borde blanco al 10 %, radio 6. Esa placa es la navegación, no el logo | `NAV`:71 (medido) · `OG/base.css`:7 |
| Tamaño mínimo | 120 px de ancho | 120 px sigue siendo el mínimo **en piezas**. El módulo de navegación lo lleva a **97,5 px** de tinta a 1440 y **87,8 px** a 390, dentro de su placa: es la excepción medida | `NAV`:75 (medido) |
| Peso | «Gabarito 800» | El archivo de Gabarito es **estático, peso 600, sin eje**. Pedirle 400 u 800 da la misma letra (medido: tinta idéntica). El peso del wordmark es el del archivo | medido con fontTools |
| Tracking | — | Módulo: −0,025em (tinta = 4,877 × tamaño). Pie gigante e imagen OG: −0,035em (tinta = 4,744 × tamaño) | `NAV`:75 · `CSS`:314 · `OG/base.css`:6 |

**Sobre qué fondo se lee el punto dorado** (contraste del oro `#C9A227`, calculado):
negro 8,68:1 · módulo 7,48 · navy 6,02 · ciruela 6,24 · **petróleo 2,26 · papel 2,22 ·
brasa 1,94**. Sobre petróleo, papel y brasa el punto no llega a 3:1: ahí va en el color del
texto de ese fondo, como el del pie va en papel, y esa vista queda con cero oros.

## 03 · Monograma *(vigente, sin cambios desde v1.3)*

- **Forma:** `S.` · S de Gabarito + punto dorado, sobre cuadrado de **esquinas rectas** (sello editorial, no ícono de app).
- **Versiones:** papel con tinta (principal) · tinta con papel (invertido).
- **Usos:** favicon, avatar de LinkedIn e Instagram, sello en documentos, espacios bajo 120 px.
- El monograma no aparece en `/v3/`. El radio único de §07 rige la interfaz y las piezas; el monograma es un sello y conserva sus esquinas. En Instagram el avatar se muestra recortado en círculo: el monograma tiene que caber en el círculo inscrito.

---

## 04 · Color · el lienzo negro y los campos *(corregido contra el sitio)*

El lienzo es negro puro y el recorrido pasa por campos de color enteros. **La lista de abajo
es la de `driftime.css`**, no la de la v2.0: la tinta `#131A22` y el humo `#96948E` salieron
del sistema v3.

### El lienzo y sus superficies

| Token | Hex | Rol | Dónde NO | Fuente |
|---|---|---|---|---|
| **Noche** `--d-noche` | `#000000` | **El lienzo** | — | `CSS`:18 |
| Módulo `--d-modulo` | `#161616` | Notas, rasgos de plan, botón secundario, fondo de una pieza de imagen mientras carga | **Nunca fondo de sección.** No hay tarjetas | `CSS`:19 · `spec` §1 |
| Filete `--d-filete` | papel al 12 % | Separador de filas, 1 px | Nunca borde de tarjeta | `CSS`:20 |
| **Papel** `--d-papel` | `#F7F5F0` | Texto principal (19,27:1) · botón primario · campo del chequeo | Nunca fondo de sección | `CSS`:21 |
| Gris `--d-gris` | `#9AA4B0` | Texto secundario (**8,31:1** sobre negro) | Nunca texto de acción | `CSS`:22 |
| Gris 2 `--d-gris-2` | `#6B7580` | **Solo líneas y bordes** (viñetas y tablas del artículo) | Nunca texto: a 13 px sobre el pie da 4,12:1 | `CSS`:23 · `spec` §7 (5-oct) |
| **Oro** `--d-oro` | `#C9A227` | **Solo el punto del wordmark** (§06) | Todo lo demás | `CSS`:24 |
| Pie | `#0E0E0E` | Fondo del pie | — | `CSS`:307 |
| Blanco | `#FFFFFF` | Texto sobre brasa (es lo único que aprueba ahí) · botón al pasar el cursor | Nunca texto sobre negro: el texto es papel | `CSS`:27, 55 |

**Por qué negro puro y no un negro cálido** *(vigente)*. Es el valor medido de la referencia,
no una preferencia. Un negro cálido tira el dorado a mostaza; sobre `#000000` el dorado lee
como dorado.

*Nota de fuente:* el comentario de `CSS`:22 y la `spec` §1 dicen que el gris da «6,9:1 sobre
negro». El cálculo da **8,31:1**; 6,92 es el valor del humo.

### Los cuatro campos de color

Cada campo es una pantalla entera con su propio color de texto, y dice uno de los cuatro
pilares de la oferta (`spindlelab-astro/src/data/oferta-v3.json`):

| Campo | Fondo | Texto | Contraste | Pilar (la palabra del campo) | Momento | Servicios |
|---|---|---|---|---|---|---|
| **Brasa** | `#DA3400` | `#FFFFFF` | 4,70:1 | **Desarrollo** | «Tu sitio te frena, o no existe» | Desarrollo web |
| **Navy** | `#0E2A47` | `#E4F1EC` | 12,56:1 | **Visibilidad** | «Tu sitio existe y no lo vas a rehacer» | Visibilidad en IA · Auditoría SEO técnica |
| **Petróleo** | `#0F766E` | `#FFF4E2` | 5,03:1 | **Continuidad** | «Ya giras y quieres sostenerlo» | Acompañamiento mensual |
| **Ciruela** | `#341F34` | `#FFEFDD` | 13,40:1 | **Alcance** | «Ya tienes demanda y quieres más» | Gestión de redes sociales · Paid Media (Google) |

Fuente: `CSS`:27-30, 190-193. *(Corregido: navy ya no abre «el blog»; el blog de la v3 va en negro.)*

**El texto sobre un campo va siempre al 100 %, en el color del texto del campo.** Brasa y
petróleo no tienen margen: el texto del campo al 72 % da 3,05 y 3,39:1, y el gris da 1,86 y
2,17:1. Por eso la línea de precio va sin opacidad (`CSS`:222, `spec` §7 5-oct) y el gris del
lienzo no se usa sobre ningún campo.

**Lo que sí lleva opacidad sobre un campo son superficies y líneas, no texto** *(corrige la
v2.0, que lo prohibía en general)*: la caja de las píldoras (negro al 22 %), la píldora
activa (blanco al 14 %), el separador del precio (al 35 %) y el filete de las bandas del
índice (el color del texto al 32 %, porque el papel al 12 % daba 1,14:1 sobre brasa y casi no
se veía). `CSS`:59-61, 224 · `spec` §3.

**Brasa es el caso especial** *(vigente)*: la única opción que aprueba AA de cuerpo sobre
`#DA3400` es el blanco puro; el papel da 4,31:1 y reprueba.

**Cuánto campo hay, medido** *(corrige la v2.0)*. Home: **48,1 %** del área, con los cuatro
campos. `/v3/servicios/`: **45,0 %**, con las cuatro bandas. Las otras doce rutas: **0 %**.
La v2.0 decía que ninguna página quedaba sin campo y que la página que abre un campo llevaba
su color; lo construido no lo hace, porque los casos de driftime son negro e imagen. Está
abierto en la `spec` (§7, 6-oct, «pendiente de decidir», Lucía y Ramón). Hasta que se decida,
este manual describe lo construido.

### 04b · Documentos y papelería *(vigente, sin cambios desde v1.3)*

Para mini-diagnósticos, cotizaciones y papelería **no rige el lienzo negro**: papel y blanco
dominan (~70 %), tinta `#131A22` trabaja (~25 %), gris apoya, **el dorado aparece una vez**
(~1-2 %). Un documento que alguien imprime o reenvía no es un cartel.

---

## 05 · Tipografía *(vigente en el reparto; corregido en la escala y en Inter)*

- **Manrope** (variable, peso 200 a 800): titulares y cuerpo. Pila del sitio: `'Manrope', system-ui, sans-serif` (`CSS`:37).
- **Gabarito:** **solo el wordmark** (módulo y pie gigante en el sitio; portada y cierre en Instagram). Archivo estático de peso 600 (§02).
- **Inter: sale del sistema** *(corrige «queda de fallback»)*. No está en la pila v3 y no se carga en ninguna ruta `/v3/` (medido; `spec` §7, 5-oct: «sin Gabarito/Inter: la escasez se logra en Manrope»).

**El argumento del reparto** *(vigente)*. Si Gabarito aparece en un solo lugar, el wordmark
deja de leerse como «el titular más grande» y pasa a leerse como firma. Manrope ya está
auto-alojada, así que no agrega ni una petición a terceros.

### La caja: mayúsculas solo donde grita el display *(vigente desde el 5-oct)*

Las mayúsculas en peso 800 se usan en **cinco lugares del sitio y en ninguno más**: el
titular del hero de la home y las cuatro palabras de campo (Desarrollo, Visibilidad,
Continuidad, Alcance). Todo otro titular va en **caja normal**, Manrope 500. Medido el 7-oct:
la home tiene 5 elementos en mayúsculas; las otras 13 rutas, 0.

**Por qué.** En la home de driftime la tipografía display aparece en **5 elementos contra
517**, y sus páginas internas no la usan ni en el h1. Lo que se ve fuerte es el contraste
entre esos cinco gritos y el silencio del resto (`lock` §2).

- **Límite del display:** máximo **6 palabras y 34 caracteres**. Si no cabe, se reescribe; nunca se le baja la caja. *«Que las frases sean más concisas, precisas y con mejores ganchos»* (Ramón, 29-sep).
- **Rótulos en caja normal, nunca en mayúsculas espaciadas.** No hay tracking positivo en ningún elemento del sitio (medido).
- **Display de referencia, texto real:** ojillo «Estás pagando para que lleguen a tu sitio.» + display «Ahí se corta / el circuito» (`pages/v3/index.astro`:198-199).

### La escala real *(corregida contra el sitio)*

| Rol | Regla | 1440 | 390 | Peso | Interlínea | Tracking |
|---|---|---|---|---|---|---|
| **Display** (cinco lugares) | `clamp(2.4rem, 10vw, 7.5rem)`; en el hero y en los campos desde 768 px también limita por alto: `min(10vw, 14svh)` | **120 px** | **39 px** | 800, MAYÚSCULAS | 0,9 | −0,005em |
| Ojillo (sobre el display) | `clamp(1rem, 1.4vw, 1.25rem)` | 20 | 16 | 500 | 1,5 | 0 |
| Título de página (h1) | `clamp(2.25rem, 4.17vw, 3.75rem)`, balanceado | 60 | 36 | 500 | 1,1 | −0,02em |
| Título de sección (h2) | `clamp(1.375rem, 2.08vw, 1.875rem)` | 30 | 22 | 500 | 1,4 | −0,02em |
| Subtítulo (h3) | `clamp(1.25rem, 1.67vw, 1.5rem)` | 24 | 20 | 500 | 1,4 | 0 |
| Párrafo guía | igual al h3 | 24 | 20 | 400 | 1,5 | 0 |
| Descripción del campo | `clamp(1.125rem, 1.67vw, 1.5rem)`; el momento en 600 | 24 | 18 | 400 / 600 | 1,5 | 0 |
| Cuerpo (en gris) | `clamp(1.0625rem, 1.25vw, 1.125rem)` | 18 | 17 | 400 | 1,6 | 0 |
| Precio (cifras en 600) | 1rem | 16 | 16 | 400 / 600 | 1,6 | 0 |
| Nota (gris; destacado en papel 600) | 0,9375rem | 15 | 15 | 400 | 1,5 | 0 |
| Chico | 0,875rem | 14 | 14 | 400 | 1,5 | 0 |
| Botón | 14 px, 36 px de alto | 14 | 14 | 500 | 1 | 0 |
| Rótulo, miga, línea legal (gris) | 0,8125rem | 13 | 13 | 500 / 400 | 1,5 | 0 |
| Etiqueta de pieza | 0,75rem | 12 | 12 | 500 | 1,5 | 0 |
| Wordmark del módulo | Gabarito, 18 px bajo 640 / 20 px desde 640 | 20 | 18 | archivo 600 | — | −0,025em |
| Wordmark gigante del pie (punto en papel) | Gabarito, `calc(100cqi / 4.78)` | 284,5 | 73,2 | archivo 600 | 0,78 | −0,035em |

Fuente: `CSS`:43-51, 54, 73, 109-110, 115, 183, 187, 223, 255, 257, 314 · `NAV`:75 · valores a 1440 y 390 medidos.

- **Texto corrido:** ≤ 68 caracteres por línea *(vigente)*. **Se implementa en em, no en ch:** `max-width: 28.5em`. En Manrope, `68ch` daba ~87 caracteres reales (`spec` §7, 5-oct, medido con Range).

---

## 06 · El punto dorado *(corregido: de tres usos a uno)*

Significa *el punto donde te encuentran* y funciona por escasez *(vigente)*.

**Regla del sitio, que ahora es la de la marca:** el oro es **solo el punto del wordmark**,
**uno por vista** (en Instagram, uno por lámina). Cero es válido. Dos o más es defecto
(`CSS`:24 · `spec` §1, §6 y §7 5-oct: «`oro1 = 1` es lo esperado; 2 o más es defecto»).

La v2.0 permitía tres usos (el punto, el separador `·` y un dato clave). **Los otros dos
salen:**

- El separador `·` va en el color del texto que separa (la miga del sitio lo lleva en gris).
- Ningún dato, cifra, número de lámina o punto final de titular va en oro.

**El oro dentro de una foto cuenta como oro** (decisión 4 del 7-oct; `spec` §5 y §7: por eso
`hilos.jpg` se recortó bajo su línea dorada y `servicios-capas` y `evidencia-medicion` están en
la lista negra). Qué fotos del pool lo tienen está medido en §07b.

**Prohibido** *(vigente y ampliado)*: viñetas doradas · varios elementos dorados · dorado de
fondo o en texto corrido · un dato en oro · el wordmark con el punto en blanco para «liberar»
el oro hacia otra cosa (lo hacía el sistema v2 de redes).

## 06b · Territorio creativo de campaña · «el eje y el circuito» *(vigente, sin cambios desde sep-2026)*

Cerrado por Ramón el 1-sep-2026 (reporte:
`marketing/encargos-otras-sesiones/direccion-creativa-campana-sep-REPORTE.md`).

> SpindleLab no es solo el eje del negocio: es **el circuito que lo enciende**. El
> argumento deja de ser «no apareces en la IA» y pasa a **por qué tu sitio no convierte**.
> **El circuito existe entero y se corta en el último tramo, justo donde se cobra.**

- **Ejecución visual: consecuencias físicas, no diagramas.** El dominó es el molde: algo que se siente en 3 segundos. «Circuito» es metáfora narrativa; jamás placas, chips ni circuitos dibujados.
- **Cómo conversa con la marca:** el hilo de oro es la corriente que recorre el circuito, y el punto dorado el lugar donde esa energía llega, donde te encuentran.
- **Sostén del nombre:** *spindle* = eje/husillo, la pieza que gira y transmite el movimiento.
- **En la v3:** el titular del hero («Ahí se corta el circuito») es este territorio; las dos fotos del dominó están en el pool (§07b). El video del hilo no está hoy en ninguna página (medido: 0 `<video>`), y si vuelve, cuenta como oro (§07b).

---

## 07 · Forma, componentes y movimiento *(corregido contra el sitio)*

### Forma

| Tema | Valor del sitio | Fuente | v2.0 decía |
|---|---|---|---|
| **Radio** | **6 px, el único.** 4 px solo en: controles (botón del chequeo, píldoras), etiqueta de pieza, rasgo de plan y píldora-rótulo. Medido: solo 6 y 4 en todo el render. **Cero píldoras redondas** (`rounded-full`) | `CSS`:31, 60, 73, 104, 281 · `spec` §7 (6-oct) | «UN radio para todo: 6 px» |
| Margen lateral `--d-m` | **40 px; 20 px** hasta 767 px | `CSS`:32, 35 | «medianil 40 px» |
| Separación entre piezas `--d-g` | **16 px; 10 px** hasta 767 px | `CSS`:33, 35 | — |
| Filete | 1 px de papel al 12 % entre filas; sobre un campo, el color del texto al 32 % | `CSS`:246-247, 273-274 · `spec` §3 | — |
| **Vidrio** (`backdrop-filter`) | **Dos usos y solo dos:** el módulo de navegación (8 px) y la etiqueta de pieza (6 px) | `spec` §7 (6-oct) | — |
| Sombras | Ninguna, salvo el anillo de foco del campo del chequeo | `CSS`:103 | — |
| **Botón** | Papel `#F7F5F0` con texto **`#000`**, 36 px de alto, 14 px 500, radio 6. Secundario: módulo con texto papel. **Igual sobre los campos.** Nunca un botón grande, salvo el del chequeo | `CSS`:54-57 (medido sobre brasa) | «Botón sobre campo: blanco lleno, texto `#14110E`» |
| Tarjetas | **No hay.** Las listas son filas con filete (`.d-filas`), nunca tarjetas iguales en grilla | `spec` §3 y §6 | — |

**Aire entre secciones** *(corrige los 256 px de la v2.0)*:

| Bloque | Escritorio | Celular | Fuente |
|---|---|---|---|
| Hero | 112 arriba / 28 abajo | 96 arriba | `CSS`:97, 151 |
| Presentación | 180 / 200 | 110 / 130 | `CSS`:160, 163 |
| Quién está detrás | 180 / 160 | 110 / 100 | `CSS`:238, 241 |
| Sección con etiqueta pegajosa | 180 arriba | 110 | `CSS`:267, 271 |
| Galería | 180 arriba | 110 | `CSS`:290, 298 |
| «Siguiente» | margen de 200 arriba | — | `CSS`:300 |
| Pie | relleno 72 / 40 / 28, margen 120 arriba | — | `CSS`:307 |
| Campo | relleno 92 / 40 / 32 | 84 / 20 / 24 | `CSS`:168, 198 |
| Fila de lista | 22 px | 22 px | `CSS`:247, 273 |

### Los componentes que una pieza gráfica puede copiar

| Componente | Cómo es en el sitio | Fuente |
|---|---|---|
| **Wordmark** | §02. Con placa solo en el módulo de navegación; puro en todo lo demás | `NAV`:71-77 |
| **Etiqueta de pieza** | Arriba a la izquierda, a 10 px; varias apiladas con 4 px entre sí (en fila en el hero). 12 px 500, relleno 5/8, 28 px de alto, radio 4, negro al 66 % con desenfoque de 6 px, texto papel. **En capturas planas de un sitio va abajo a la izquierda**, porque arriba está la cabecera del sitio retratado | `CSS`:72-79 · `spec` §7 (6-oct) |
| **Rótulo de concepto** | «Pieza de concepto · no es un cliente», fondo papel, texto `#000`, **siempre primero** | `PIEZA`:60 · `CSS`:74 |
| **Rótulo único por obra** | «Combeau, fotografía · Cliente» · «Combeau, modelo · Cliente» · «Verifica y Cumple · Producto propio» · «Raigal · Implantología» | `obra-v3.json` · `spec` §7 (6-oct) |
| **Línea de precio** | `Desde` ▏ **`$390.000 · $690.000 · $1.190.000`** `+ IVA`. Un separador vertical (1 px, 0,875em de alto, al 35 %) entre «Desde» y las cifras; «+ IVA» pegado a la última cifra; cifras en 600; rótulos sin opacidad; cada alternativa con su plan no se parte. Cifras **exactas** de `oferta-v3.json` | `CSS`:220-232 · `spec` §7 (5 y 6-oct) |
| **Filas con filete** | Filete arriba de cada fila y abajo de la última, 22 px de relleno. Índice: fecha 15 px en gris · h3 24 px 500 · «→» en gris | `CSS`:244-251, 272-274 |
| **Campo** | Una pantalla exacta. Palabra en display · píldoras · descripción 24 px con el **momento en 600** · precio · dos botones · fila de dos imágenes al fondo, cada una en su proporción y sin recorte | `CSS`:166-193 · `spec` §3 y §7 (5-oct) |
| **Pieza de imagen** | Radio 6, `overflow: hidden`, fondo módulo, imagen en `object-fit: cover`. En las filas, **cada pieza en su proporción y todas del mismo alto** | `CSS`:67-69, 120-121, 180 · `spec` §7 (6-oct) |
| **Nota** | Fondo módulo, radio 6, relleno 14/16, 14 px en gris, destacado en papel 600 | `CSS`:262-263 |
| **Miga** | Separador «·» en gris | `spec` §7 (6-oct) |

### Movimiento

| Mecanismo | Valor | Estado hoy | Fuente |
|---|---|---|---|
| **Entrada** | Opacidad 0 → 1 y 28 px, en 0,8 s con `cubic-bezier(.5, 0, .1, 1)`. Escalonado 0,08 / 0,16 / 0,24 s, máximo tres pasos. El primer pantallazo no anima. Red de seguridad a los 3 s | **El mecanismo existe y ninguna página v3 lo marca** (`[data-entra]`: 0, medido) | `campos-v3.css`:219-251 · `MOV`:27-47 |
| **Scroll suave** (Lenis) | Duración 1,1; curva `min(1, 1.001 − 2^(−10t))`; nada en táctil; apagado con movimiento reducido | En uso | `Layout.astro`:208-224 |
| **Composición pegajosa** | Campos que se apilan (cada uno tapa al anterior) · etiqueta de sección pegajosa a 120 px · en celular, filas en carrusel con la siguiente pieza asomándose (78 % / 86 %) | En uso | `CSS`:88-94, 166-193, 268 |
| **Video montado tarde** | El `src` se pone a 400 px de la vista; uno por página | Mecanismo listo; 0 videos en `/v3/` | `MOV`:93-108 |
| Menú | Filas que entran en 0,5 s con la misma curva, 14 px, escalonado de 0,04 s | En uso | `NAV`:205-217 |
| Paralaje | ±22 px sobre `.paralaje` | Definido en `MOV` y **sin uso**. No es parte del sistema mientras ninguna página lo use y la `spec` no lo escriba | `MOV`:118-128 |

**Dos reglas que no se negocian** *(vigentes)*:

- **La clase que esconde la pone el JS, no el marcado.** Si el script no corre, nada queda en opacidad 0.
- **Todo respeta `prefers-reduced-motion`.** Con `reduce` no se esconde nada, no hay paralaje y el video no se reproduce.

**Lo que NO hace el sistema** *(vigente)*: animación tipográfica letra por letra. Los
encabezados son texto plano. Lo que hace que el sitio se sienta vivo es el scroll suave, la
composición pegajosa y el video que se monta cuando se va a ver.

---

## 07b · Imagen *(nueva en v3.0)*

**La tesis de la referencia:** driftime es *un sistema de imágenes con una tipografía display
escasa*. El color es el fondo; **la imagen es el contenido** (`lock` §1). Por eso una foto
nunca es textura bajo un velo: va como **pieza**, con radio 6, en su proporción, y nada se
escribe encima salvo las etiquetas de pieza. En el sitio no hay velos sobre las fotos.

### El pool en uso

Todo en `spindlelab-astro/public/assets/img/`. Medidas y textos alternativos del sitio
(`pages/v3/index.astro`:101-115 · `spec` §7, 6-oct: **una imagen, un alt que describe lo mismo**).

| Archivo | Tamaño | Alt |
|---|---|---|
| `d/domino.jpg` | 1600×1600 | «Fichas de dominó cayendo en fila sobre fondo negro» |
| `d/domino-curva.jpg` | 1600×1600 | «Fichas de dominó cayendo en fila curva sobre piedra oscura, con luz cálida» |
| `d/escritorio.jpg` | 1600×670 | «Escritorio de madera con un laptop, un cuaderno y una taza junto a la ventana» |
| `d/ventana.jpg` | 1600×670 | «Mesa de trabajo junto a una ventana con cortinas, con un cuaderno abierto y un laptop» |
| `d/hilo.jpg` | 1400×787 | «Un hilo luminoso cruza en diagonal un fondo verde oscuro» |
| `d/hilos.jpg` | 1600×960 | «Cantos de hojas apiladas en azul oscuro, en diagonal». **Es un recorte sin la línea de oro, con más contraste; siempre `?v=2` en el sitio** |
| `ramon-vallejos.jpg` | 896×1200 | retrato de Ramón |
| `obra/mock-<caso>-alto.jpg` | 1000×1100 (10:11) | la obra en un teléfono |
| `obra/mock-<caso>-ancho.jpg` | 1600×1200 (4:3) | la obra en notebook y teléfono |
| `obra/<caso>-alto.jpg` · `-ancho.jpg` | 900×1200 · 1440×810 | capturas planas |

Las fotos `d/*` y los mockups tienen versión de 800 px (`*-800.jpg`). Un archivo que cambia
de contenido cambia de nombre (`-2`) o lleva `?v=N` en todas sus referencias: la versión
vigente es la de nombre más nuevo (p. ej. `mock-combeau-modelo-alto-2.jpg`,
`combeau-fotografia-ancho-2.jpg`; `spec` §7, 6-oct).

### Mockups

La obra real montada en un notebook y un teléfono dibujados en CSS, sobre un **fondo de
estudio** por caso: salvia `#C5CFC0` (Combeau fotografía), piedra `#D6D0C8` (Combeau modelo),
lavanda `#C3C8EE` (Verifica y Cumple), arcilla `#B7AC9A` (Raigal). Ninguno cerca del oro. No
se montan sobre las fotos del pool (sus notebooks están cerrados). Se regeneran con el
procedimiento de `marketing/oficina/obras-web/spindlelab-v3/mockups/README.md`.

### Etiquetas: cuáles imágenes las llevan

- **La obra lleva etiqueta** con su rótulo único (§07, componentes). Las fotos del pool y de Unsplash **no**, igual que en el sitio.
- **Arriba a la izquierda** por regla; **abajo a la izquierda** en una captura plana de un sitio.
- **Raigal va siempre con el rótulo de concepto, primero.** El rótulo va en la pieza misma, visible sin scroll y en cualquier captura de la primera pantalla. Cero cifras de resultado, cero testimonios (`marketing/portafolio/README.md`:23-37). Si el rótulo no se lee al tamaño en que se va a ver la pieza, Raigal no va en esa pieza: por eso no está en la imagen OG (`OG/README.md`).

### Fotos nuevas de Unsplash *(regla nueva, decisión 6 del 7-oct)*

- **Sí:** objetos, materiales y lugares.
- **Nunca:** personas presentadas como el equipo o como clientes. Nunca pantallas con datos inventados.
- Las elige Ramón (`spec` §7, 6-oct: «Ramón está eligiendo en Unsplash»; `acta-qa-final.md`:51).
- Se miden por oro antes de usarlas (abajo) y van como pieza, sin velo.

### Oro dentro de una foto

Criterio del relevamiento del 7-oct: tono 38–54°, saturación ≥ 0,5 y brillo ≥ 0,5.

> ⚠️ **El umbral de brillo está mal y hay que corregirlo (hallazgo del 7-oct, sesión de redes).**
> **El propio oro de la marca no pasa ese filtro:** `#C9A227` es tono 46°, saturación 0,67 y
> **brillo 0,47**, bajo el 0,5 que pide la regla. Un detector de oro que no detecta el oro de la
> marca da 0 % en todo y parece que nada falla.
> **El umbral correcto es brillo ≥ 0,35**, que captura el oro de marca con margen y sigue dejando
> fuera los marrones oscuros de las fotos. Verificado el mismo día: la luz cálida de
> `domino-curva.jpg` está en **tono 12–20°**, o sea naranja, y queda fuera por tono, no por brillo.
> **Lo que el criterio corregido NO cambia:** las conclusiones del relevamiento siguen en pie,
> porque se separaron por tono. Lo que cambia es que `medir.py` tiene que usar este umbral, o
> seguirá informando 0 % sin mirar nada.
Resultado sobre el pool:

- **0 %** en todas las fotos `d/*`, en el retrato y en los mockups (máximo 0,05 %).
- **`obra/combeau-modelo-alto.jpg`: 0,86 %** (follaje de palmera amarillo en la foto del cliente). **Cuenta como oro.**
- **`hero-hilo-de-oro.mp4`: 0,13 a 0,72 % por cuadro.** **Cuenta como oro.**
- El lima de la captura de Verifica y Cumple no es oro por tono (73° contra 46°; `OG/README.md`).

Una foto nueva se mide igual. Si el criterio marca una zona que se ve a simple vista, como la
palmera o el hilo, cuenta como oro, y la vista donde va no lleva el punto dorado.

### Lista negra *(spec §5)*

`hero-*.jpg`, `estrategia-mesa.jpg`, `equipo-creativo.jpg`, `servicios-oficina`,
`evidencia-oficina`, `metodo`, `problema` y **`foto-banner-original`** (son de banco o
muestran equipos que no existen). `servicios-capas` y `evidencia-medicion` (llevan un punto
dorado dibujado). *La v2.0 daba `foto-banner-original` como foto de marca con velo: queda
fuera.*

### Video

Solo `hero-hilo-de-oro.mp4` (1920×1080, 24 fps, 6 s), solo sin `prefers-reduced-motion`
(`spec` §5). Hoy ninguna página v3 lo usa.

---

## 08 · Voz *(vigente; se suma lo del 7-oct)*

Afirmaciones verificables, ejemplos concretos, valentía de decir «esto no lo necesitas». La
persona gramatical es híbrida, y la regla es precisa: cambia el significado.

- **Primera persona singular** para lo observacional y evidencial: probar algo, revisar, investigar. Ej.: *«Le pregunté a ChatGPT por tu negocio.»*
- **Primera persona plural** para todo lo que la empresa entrega, ofrece o hace como servicio. Ej.: *«Te lo entregamos gratis, en 24 horas.»*
- **Instagram de SpindleLab va en el registro de la marca: plural** (`voz-spindlelab`, tabla de registros). El singular es del perfil personal de Ramón.

| Sí | No |
|---|---|
| «Le pregunté a ChatGPT por tu negocio. No apareces. Te mostramos por qué.» | «Soluciones integrales de posicionamiento digital potenciadas por IA.» |
| «La auditoría toma dos semanas y entregamos un plan priorizado.» | «Nuestro equipo multidisciplinario optimizará sus KPIs.» |
| «Esto puede esperar; lo urgente es lo otro.» | «¡Aprovecha ahora esta oportunidad única!» |

**Nunca:** raya larga como golpe de efecto · relleno de transición · superlativos de venta ·
urgencia fabricada · cifras, logos, testimonios o clientes que no existen · el nombre de un
prospecto sin permiso.

**Sumado el 7-oct (decisión 7), para toda pieza nueva:** **sin «acá»** (se escribe «aquí» o
se reescribe) · **sin voseo** (tuteo siempre) · textos reales o reescritos desde el sitio, el
blog y el corpus de `voz-spindlelab`. Choca con la skill de voz, que cita «escríbeme por acá y
lo miramos» como rasgo: el texto ya publicado no se reescribe, pero no es modelo para piezas
nuevas (ver el final del manual).

Los textos publicados que fijan el sonido real están en la skill `voz-spindlelab`
(`corpus.md`). El tono se calibra leyendo dos párrafos reales, no diez viñetas de reglas.

---

## 09 · Aplicaciones y activos *(corregido)*

| Aplicación | Regla | Archivo | Estado |
|---|---|---|---|
| Logo (todas las variantes) | Horizontal · apilada · monograma, positivo/invertido | `logo/` | vigente |
| Firma correo (conocidos) | Wordmark apilado + regla dorada + nombre/cargo | `firmas/firma-a-nombre.png` | vigente (documento, §04b) |
| Firma correo (outbound) | Wordmark + tagline 3 servicios | `firmas/firma-b-marca.png` | vigente (documento, §04b) |
| Avatar de LinkedIn e Instagram | Monograma S. sobre papel; en Instagram cabe en el círculo inscrito | `redes/perfil-avatar.png` | vigente |
| Imagen al compartir un enlace (OG) | Wordmark puro + ojillo + display, y la variante de obra sin Raigal | `og-v3/` (`a-titular`, `b-obra`) | **nueva, aprobada** (`spec` §7, 6-oct) |
| **Piezas de Instagram** | **§10** | **`instagram-v3/`** | **nuevo en v3.0** |
| ~~Posts Instagram 1080×1080~~ | Plantillas v1.x (papel claro, Gabarito + Inter) | `redes/post-tipografico.*` · `redes/post-foto.*` | **retiradas**: no se usan para piezas nuevas |
| Banner LinkedIn | Foto con velo de tinta + wordmark + promesa | `redes/banner-linkedin.png` | **por rehacer**: usa `foto-banner-original`, que está en la lista negra (§07b) |
| Favicon | Monograma S. (SVG con Gabarito embebida) | `spindlelab-site/assets/img/favicon.svg` | vigente |

*La v2.0 decía «Fotografía de marca: `foto-banner-original.jpg` con velo de tinta ≥ 50 %».
Queda reemplazado por §07b.*

**Verificación antes de dar algo por bueno.**

- **Sitio:** `cd spindlelab-astro && npm run build && npm run verificar`. Mide contraste real sobre píxel renderizado, desborde a 390 px, `h1` duplicados o ausentes, JSON-LD, `alt` faltantes y enlaces internos rotos, y sale con código distinto de cero si encuentra algo.
- **Piezas gráficas:** el patrón de `og-v3/` (§10.9): render a 2x con `render.mjs`, revisión de las fuentes cargadas y reducción con `reducir.py` a JPEG con croma completo.

---

## 10 · Instagram *(nueva en v3.0)*

**Instagram se ve como el sitio.** Lienzo negro, un campo de color por publicación que dice
el pilar, la imagen como pieza, el display una sola vez y en la portada, el oro solo en el
punto del wordmark. Las siete decisiones del 7-oct son la base; este capítulo las escribe con
sus medidas y el kit `marketing/brand/instagram-v3/` las cumple.

### 10.1 · Formatos y zonas seguras (verificado el 7-oct)

| Formato | Lienzo | Dónde va lo esencial | Fuente |
|---|---|---|---|
| **Post y carrusel** | **1080×1350 (4:5)** | Dentro del **recorte 3:4 de la grilla del perfil: 1012×1350 centrado** (x de 34 a 1046; se pierden ~34 px por lado). El usuario puede mover ese recorte a mano, pero la vista por defecto es la central | grilla 3:4 desde ene-2025 ([Inquirer](https://usa.inquirer.net/165044/bye-squares-why-instagram-switched-to-a-taller-grid), [Business Today](https://www.businesstoday.in/technology/news/story/instagram-head-announces-big-changes-3-minute-reels-and-new-look-for-profile-grid-461527-2025-01-21)) · «roughly 1012 x 1350» ([Oktopost](https://www.oktopost.com/blog/instagram-grid-size-guide/), [Kapwing](https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/)) |
| Carrusel | Hasta **20 láminas**, y **todas toman la proporción de la primera** | — | [Storrito](https://storrito.com/resources/how-instagrams-20-slide-carousels-work-and-what-the-new-limits-are/) |
| **Story** | **1080×1920** | Nada clave **sobre y = 250 ni bajo y = 1580** (250 arriba, 340 abajo) ni a menos de **65 px** de los lados. Si la story se **promociona**, abajo sube a **672 px** | orgánico: [Moonb, jul-2026](https://www.moonb.io/blog/instagram-story-specs) · anuncio: [Meta Ads Guide, Stories](https://www.facebook.com/business/ads-guide/update/image/instagram-story) (14 % arriba, 35 % abajo, 6 % por lado) |
| **Reel** | **1080×1920** | Texto clave **entre y = 270 e y = 1248**, a ≥ 65 px de los lados, y **bajo y = 1150 nada a la derecha de x = 850** (la columna de íconos) | [Meta Ads Guide, Reels](https://www.facebook.com/business/ads-guide/update/video/instagram-reels) · [Hopper HQ, 18-sep-2026](https://www.hopperhq.com/blog/instagram-reel-size/) |
| Portada de reel | la misma | Se lee en su **recorte 3:4 central, 1080×1440** (y de 240 a 1680). Con la zona del reel, lo que tiene que leerse en la grilla y al reproducir va entre y = 270 e y = 1248 | [Hopper HQ](https://www.hopperhq.com/blog/instagram-reel-size/) |
| Exportación | **1080 px de ancho exacto**; JPEG calidad 90 **con croma 4:4:4**, o PNG | Instagram guarda hasta 1080 de ancho; imagen hasta 30 MB | [Ayuda de Instagram](https://help.instagram.com/1631821640426723) · [Sked](https://skedsocial.com/blog/best-instagram-image-and-video-size-recommendations.md) · `OG/README.md` (4:4:4) |

**Lo que cambió contra la decisión 1.** La decisión fijaba 250/340 también para reels. La
guía actual de Meta para reels pide 14 % arriba, **35 % abajo** y 6 % por lado: en 1080×1920
son ~270, **~672** y ~65 px, porque el pie de foto, el usuario y los íconos tapan hasta ahí.
**Manda la fuente:** 250/340 queda para stories orgánicas; los reels usan 270/672/65 y la
columna derecha.

**Opción nueva que decide Ramón:** desde el 29-may-2025 Instagram acepta **3:4 (1080×1440)**
en foto única y en carrusel, y lo muestra sin recorte en la grilla ([9to5Mac](https://9to5mac.com/2025/05/29/instagram-changes-standard-photo-aspect-ratio/),
[PetaPixel](https://petapixel.com/2025/05/29/instagram-finally-adds-support-for-34-aspect-ratio-photos)).
Mientras no lo cambie, rige 4:5, que es además el formato del anuncio si una pieza se promociona.

### 10.2 · De sitio a 1080: cómo se traduce cada medida

**El factor es 2,77.** En un teléfono de 390 px de ancho (el ancho al que se midió el sitio)
una publicación ocupa la pantalla entera: sus 1080 px se ven como 390 px del sitio. Por eso
**cada medida del sitio a 390 se multiplica por 1080 / 390 = 2,77**, y la pieza se lee en el
teléfono igual que el sitio en ese mismo teléfono. Vale para todo lo que el sitio fija en px:
tamaños de letra, radio, filete, etiqueta, márgenes y el mínimo del wordmark. Lo que va en em
(tracking, interlínea) no cambia. **Un valor de este manual escrito «en px» es un px del
sitio; en el lienzo se multiplica.**

**En la grilla del perfil** cada miniatura mide ~129 px del sitio para los 1012 px del recorte:
**factor 7,8**. A ese tamaño solo el display se lee (108 px → ~14 px, como un rótulo del
sitio); todo lo demás baja de 8 px. Por eso el display va en la portada: es lo único que
trabaja en la grilla.

### 10.3 · Retícula y márgenes a 1080

| Medida | Valor | De dónde sale |
|---|---|---|
| **Margen** | **90 px** por los cuatro lados | 34 px del recorte de la grilla + 56 px (el margen de 20 px del sitio a 390, × 2,77). Arriba y abajo el mismo valor: la pieza tiene un solo margen, como el sitio tiene un solo `--d-m` |
| **Ancho útil** | **900 px** (x de 90 a 990) | 1080 − 2 × 90. Queda dentro del recorte de la grilla |
| **Separación entre piezas** | **28 px** | 10 px del sitio a 390 × 2,77 |
| **Filete** | **3 px**, papel al 12 % (sobre un campo, el color del texto al 32 %) | 1 px del sitio × 2,77. A 1 px el filete desaparece en el teléfono |
| **Radio** | **17 px** (6 del sitio); **11 px solo en la etiqueta de pieza** (4 del sitio) | decisión 5, leída en px del sitio (nota de abajo) |
| Story | contenido entre x 90–990 e y 250–1580 | 10.1 + el mismo margen (≥ 65) |
| Reel | texto entre x 90–990 e y 270–1248; bajo 1150, nada pasado x 850 | 10.1 |

**Composición, copiada del sitio.** La firma arriba a la izquierda, donde el sitio pone el
módulo de navegación; el titular **apoyado abajo**, como el del hero, que se ancla al fondo de
la pantalla (`CSS`:108). Las imágenes van en **filas de piezas con alto común, cada una en su
proporción y sin recorte** (`CSS`:120-121, 180): con *n* piezas en el ancho útil, alto =
(900 − (n − 1) × 28) / suma de las proporciones.

**Cómo se lee la decisión 5 («radio único 6 px, 4 px en etiquetas»).** En px del sitio,
como todo lo demás: 6 × 2,77 = 16,6 → **17 px** de lienzo, y 4 → **11 px**. Escrito literal
en el lienzo, 6 px se verían en el teléfono como ~2 px del sitio, una esquina casi recta, y
la pieza dejaría de parecerse al sitio. El kit lo aplica así (`instagram-v3/base.css`,
`--d-r: calc(6px * var(--k))`). La imagen OG aprobada usa 6 px literales en 1200: es una
tarjeta de enlace, no una pieza de este sistema, y no se toca.

### 10.4 · Escala tipográfica a 1080

Tamaño del sitio a 390 × 2,77. Interlínea y tracking, los del sitio.

| Rol | Sitio a 390 | **A 1080** | Peso y caja | Interlínea | Tracking | Dónde va |
|---|---|---|---|---|---|---|
| **Display** | 39 | **108 px** | 800, MAYÚSCULAS | 0,9 | −0,005em | **Solo la portada**, una vez, ≤ 6 palabras y ≤ 34 caracteres |
| Ojillo | 16 | **44** | 500 | 1,5 | 0 | Sobre el display |
| Título (h1) | 36 | **100** | 500 | 1,1 | −0,02em | La idea de una lámina interior · la cifra de un dato |
| Título de sección (h2) | 22 | **61** | 500 | 1,4 | −0,02em | Lámina interior con más texto · titular de post-obra y post-foto |
| Subtítulo (h3) | 20 | **55** | 500 | 1,4 | 0 | Nombre de un servicio |
| Guía | 20 | **55** | 400 | 1,5 | 0 | El llamado del cierre |
| Descripción del campo | 18 | **50** | 400; el momento en 600 | 1,5 | 0 | post-campo |
| Cuerpo (gris sobre negro) | 17 | **47** | 400 | 1,6 | 0 | Apoyo en láminas interiores |
| Precio | 16 | **44** | 400; cifras en 600 | 1,6 | 0 | post-campo |
| Nota | 15 | **42** | 400 | 1,5 | 0 | — |
| Rótulo (gris sobre negro) | 13 | **36** | 500 | 1,5 | 0 | La fuente de un dato · el número de lámina, si lo hay |
| Etiqueta de pieza | 12 | **33** | 500 | 1,5 | 0 | Sobre la imagen de una obra |
| **Wordmark** | mínimo de piezas: 120 px de tinta | **≥ 70** (el kit usa 76) | Gabarito (archivo 600) | 1 | −0,035em | Portada y cierre |

- **Nada de texto bajo 33 px.** Es la etiqueta de pieza, el texto más chico del sitio (12 px).
- **El wordmark no baja de 70 px:** el mínimo de 120 px de tinta (§02), × 2,77, son 332 px de lienzo, y la tinta mide 4,744 veces el tamaño. A 76 px mide 360 px y se ve como 130 px del sitio. En el cierre puede ir a todo el ancho útil, como el pie del sitio (10.6).
- **Medido el 7-oct** (Chromium, fuentes de `og-v3/` cargadas): a 108 px, la palabra de campo más larga, «CONTINUIDAD», mide **747 px** y cabe en los 900 con 153 de holgura; «AHÍ SE CORTA», 730. Una línea de display lleva ~13 caracteres, así que el límite de 34 da **tres líneas como máximo**. La guía a 55 px da ~31 caracteres por línea.
- La etiqueta de pieza a 1080: a **28 px** de la esquina de la imagen, relleno 14/22, **78 px** de alto, radio 11, negro al 66 % con desenfoque de 17 px, texto papel; varias, con 11 px entre sí.

### 10.5 · Color por pilar

**Lienzo negro por defecto.** Una publicación lleva **como máximo un campo de color**, y el
campo dice su pilar. En un carrusel, todas las láminas que lleven campo llevan el mismo; el
resto va en negro. El campo es el **fondo entero de la lámina**, como en el sitio es una
pantalla entera; nunca una franja ni un recuadro.

| Campo | Fondo | Texto (al 100 %, también el pequeño) | Pilar | El punto del wordmark ahí |
|---|---|---|---|---|
| Brasa | `#DA3400` | `#FFFFFF` | **Desarrollo** | en blanco (el oro da 1,94:1) |
| Navy | `#0E2A47` | `#E4F1EC` | **Visibilidad** | **en oro** (6,02:1) |
| Petróleo | `#0F766E` | `#FFF4E2` | **Continuidad** | en `#FFF4E2` (el oro da 2,26:1) |
| Ciruela | `#341F34` | `#FFEFDD` | **Alcance** | **en oro** (6,24:1) |
| Negro (sin pilar) | `#000000` | papel · gris para lo secundario | — | **en oro** (8,68:1) |

Sobre un campo **no se usa el gris** ni texto con opacidad (§04). Una pieza que no habla de
un pilar va en negro.

### 10.6 · Los tipos de pieza del kit

Archivos en `marketing/brand/instagram-v3/`, uno por tipo. Este manual fija lo que cada uno
cumple; la composición exacta está en el kit.

| Tipo | Formato | Lleva | Cuándo se usa |
|---|---|---|---|
| **`post-titular`** | 1080×1350 | Negro · wordmark arriba a la izquierda · ojillo + display apoyados abajo | Una idea que se sostiene sola, tomada del sitio o del blog. El modelo es el hero: «Estás pagando para que lleguen a tu sitio.» / «AHÍ SE CORTA EL CIRCUITO» |
| **`post-campo`** | 1080×1350 | El campo entero de un pilar · wordmark · la palabra del pilar en display · el momento en 600 + la descripción · como máximo una línea de precio · una fila de piezas al fondo. Los servicios van como texto, no como píldoras | Presentar un pilar y sus servicios. Pone en la grilla los cuatro campos del sitio |
| **`post-obra`** | 1080×1350 | Negro · wordmark · titular en h2 · una fila de obra (mockups) en su proporción, cada una con su rótulo | Mostrar trabajo real: Combeau ×2 (cliente, con permiso) y Verifica y Cumple (producto propio). **Raigal no** |
| **`post-foto`** | 1080×1350 | Negro · wordmark · una foto del pool o de Unsplash como pieza (radio 6, en su proporción, sin texto encima) · titular en caja normal | Una observación de oficio con una imagen del territorio (dominó, hilo, mesa de trabajo) |
| **`carrusel-portada`** | 1080×1350 | Como `post-titular`, o como `post-campo` si el carrusel es de un pilar | La primera lámina. Fija la proporción de todas |
| **`carrusel-interior`** | 1080×1350 | Sin wordmark y sin display · h1 o h2 + cuerpo · piezas con etiqueta si hacen falta | El desarrollo, una idea por lámina. **Raigal, con su rótulo, solo aquí** |
| **`carrusel-dato`** | 1080×1350 | La cifra en h1 (100 px, 500, papel o el texto del campo) · qué es · **la fuente** en rótulo | Un dato con una fuente que cualquiera puede revisar |
| **`carrusel-cierre`** | 1080×1350 | Negro · el llamado en texto · wordmark (puede ir a todo el ancho útil, como el pie del sitio: 900 / 4,744 = 190 px) | La última lámina, siempre |
| ~~**`story-portada`**~~ | 1080×1920 | Negro o el campo del post · wordmark · display una vez · todo dentro de y 250–1580 · espacio libre para el sticker de enlace | **ARCHIVADA, no se usa (ver 10.6b).** La plantilla queda en el kit para cuando la cuenta tenga público de stories |

### 10.6b · La story: hoy no se diseña, se re-comparte

**No se producen stories propias** (Ramón, 1-sep, reconfirmado el 7-oct): con pocos seguidores que
vean stories, una pieza diseñada para ese formato no paga el trabajo que cuesta. El uso vigente es
uno solo:

> **Ramón re-comparte la publicación del feed a su story**, a mano, desde Instagram.

Eso **no es una pieza nueva**: Instagram toma el post 4:5, lo encoge y lo centra sobre un fondo que
pone él. Tres consecuencias para quien produce el feed:

1. **Nada se recorta, pero todo se achica.** La lámina ocupa cerca de dos tercios del alto de la
   pantalla, así que el texto de 33 px (el piso de §10.4) se ve todavía más chico ahí. **Una pieza
   que solo se lee en el feed no se lee re-compartida**: razón de más para no bajar del piso.
2. **El enlace va en el sticker**, pegado encima al re-compartir. Es el único enlace que se toca
   aparte de la bio. Al pegarlo conviene no tapar el llamado de la lámina.
3. **El llamado de §10.8 sigue sirviendo**: quien ve la story llega al post y comenta ahí.

**Cuándo se reactiva `story-portada`:** cuando la cuenta tenga base de seguidores que vea stories.
Es una decisión de Ramón, no una fecha. Mientras tanto la plantilla, su guía de zonas y las medidas
de 10.1 y 10.3 quedan en el kit: sirven igual para un reel, que sí usa 1080×1920.

**El kit no trae plantilla de reel.** Un reel se compone con las zonas de 10.1 y el
movimiento del sitio (§07): entrada de 28 px en 0,8 s con `cubic-bezier(.5, 0, .1, 1)`,
máximo tres pasos escalonados, nada letra por letra.

### 10.6c · Ninguna publicación es solo tipografía

**Toda publicación lleva al menos una imagen del territorio.** No es una preferencia de esta
sección: sale de dos reglas que ya están en el manual y se refuerzan entre sí.

- **§07b, la tesis del sistema:** *«el color es el fondo; **la imagen es el contenido**»*. Una
  publicación sin ninguna imagen no es este sistema, es una ficha de texto con sus colores.
- **§06b, vigente sin cambios:** el territorio se ejecuta con **consecuencias físicas, no
  diagramas**. El dominó es el molde, y sus dos fotos están en el pool.
- **Y la regla de Ramón del 1-sep, que dice lo mismo en otras palabras:** *«las fichas
  tipográficas planas SOLAS ya no pasan el pase: son sistema, no campaña»*. **Esa regla no quedó
  obsoleta con el v3** — se revisó el 7-oct contra §06b y §07b, y el manual la respalda.

**Cómo se cumple, por tipo:**

| | Cómo cumple |
|---|---|
| `post-campo`, `post-obra`, `post-foto` | Ya cumplen: llevan su fila de piezas |
| **`post-titular`** | **Hoy NO cumple.** Es puro texto. Necesita una imagen del territorio, y su titular («Ahí se corta el circuito») es literalmente §06b, así que el dominó le calza de origen |
| **Carrusel** | **Hoy NO cumple**: las cinco láminas son texto. **Basta una lámina con imagen**, no las cinco. §10.7 dice que la imagen es «opcional» lámina por lámina, y sigue siendo cierto: lo obligatorio es **por publicación**, no por lámina |

**Lo que esto NO autoriza:** meter una foto de relleno para cumplir. Si ninguna imagen del pool
dice algo sobre esa idea, la pieza no está lista; se busca la imagen o se cambia la idea. Una foto
decorativa bajo un texto es el velo de siempre con otro nombre, y §07b lo prohíbe.

### 10.7 · Un carrusel: portada, interior y cierre

| | Portada | Interior | Cierre |
|---|---|---|---|
| **Display** (800, MAYÚSCULAS) | **Sí, una vez**, ≤ 6 palabras y ≤ 34 caracteres | **Nunca.** Todo en caja normal, 500/400 | **Nunca** |
| **Wordmark** | **Sí**, puro | **No** | **Sí**, puro |
| **Oro** | El punto del wordmark (si el fondo lo sostiene, 10.5) | Ninguno | El punto del wordmark |
| **Campo** | El del pilar, si el carrusel tiene pilar | El mismo, o negro | Negro, como el pie del sitio |
| **Imagen** | Opcional | Piezas con su etiqueta; Raigal con su rótulo | No |

- **Una idea por lámina interior**, en h1 (100 px) o, si necesita más texto, en h2 (61 px) con cuerpo en gris.
- **Si la cifra es el gancho**, va en la portada y sigue las reglas del display. En el interior va en h1 (100 px, 500), nunca en 800 y nunca en oro. El porqué: en el sitio no hay ningún texto más grande que el h1 fuera del display y del wordmark del pie (§05). Una cifra gigante en una lámina interior sería un segundo grito, y la escasez del display es lo que hace que el primero se vea.
- **Sin paginador dibujado ni «Desliza →»**: Instagram muestra los puntos, y un «Desliza» con flecha en negrita se lee como un control. Si una lámina lleva número, va como rótulo en gris (36 px), sin caja, como las fases del sitio.

### 10.8 · El llamado, sin botones

Instagram no tiene botones, así que **nada imita un botón**: ni cajas con texto de acción, ni
píldoras, ni flechas en cápsula. El llamado es **texto**:

> **Comenta QUIERO MEJORAS y te mandamos el chequeo por DM**

En el cierre, en guía (55 px, 400, papel). **Un solo llamado por pieza.**

**Por qué el gancho de comentarios y no «enlace en la bio»** (Ramón, 1-sep, keyword actualizada
el 7-oct): en Instagram los enlaces del pie de foto no son clicables, así que el DM es la entrega
real, no una fricción inventada. La bio sigue siendo el único enlace que se puede tocar, y queda
como respaldo **en el pie de foto**, nunca como segundo llamado dentro de la lámina. En stories,
el enlace va en el **sticker**.

**La keyword es `QUIERO MEJORAS`** (Ramón, 7-oct; reemplaza a `CIRCUITO`). Va en mayúsculas dentro
de la línea, porque así se escribe igual en el comentario; no es un display ni un rótulo espaciado,
así que no choca con §10.4.

> **Corrección de una justificación equivocada (7-oct).** Al hacer el cambio se escribió que
> `CIRCUITO` «había quedado huérfana porque su concepto era del sistema v2». **Es falso:** §06b
> sigue vigente sin cambios, el territorio del circuito y el dominó está vivo, y el titular del
> hero del sitio v3 es exactamente ese territorio. Lo que cambió del v2 al v3 fue el sistema
> visual, no el territorio creativo. La keyword cambió porque `QUIERO MEJORAS` dice lo que la
> persona quiere, no el nombre interno de la metáfora, y eso es razón suficiente. Queda anotado
> porque un porqué equivocado en un manual se reusa para decidir otra cosa.

> ⚠️ **La keyword vive en ManyChat, no en la pieza.** Publicar una lámina que pide
> `QUIERO MEJORAS` mientras ManyChat sigue escuchando `CIRCUITO` deja a quien comenta sin
> respuesta. **Antes de la primera publicación hay que cambiarla en ManyChat** (Automation →
> keyword) y agregar ahí el post nuevo al trigger. Lo hace Ramón; esta sesión no toca ManyChat.
> Conviene configurarla como «contiene» y no como coincidencia exacta: son dos palabras, y
> «quiero mejoras!» o «Quiero mejoras.» tienen que entrar igual.

**Precio.** Como máximo **una línea de precio por publicación**, en el campo de su pilar y en
el formato del sitio: `Desde ▏ $X + IVA`, con la cifra exacta de `oferta-v3.json` (umbral de
entrada de un servicio). **Nunca la cartera** (los precios de varios servicios juntos).
Fuente: Ramón, 1-sep (`marketing/encargos-otras-sesiones/jue3-copy-circuito-renata.md`: la
regla era «sin cartera de precios»; un «desde» es un umbral de entrada) · formato de la `spec`
§7 (5 y 6-oct).

### 10.9 · Exportar y verificar

El patrón aprobado de `marketing/brand/og-v3/`:

1. **Cada carpeta lleva sus fuentes y sus imágenes** copiadas (`manrope-latin.woff2`, `manrope-latin-ext.woff2`, `Gabarito.woff2`), con `@font-face` relativo. Sin `inter.woff2`.
2. **Render a 2x** con Playwright (`render.mjs`): espera `document.fonts.ready` y anota las fuentes cargadas. Si no aparecen «Manrope 200 800» y «Gabarito», la pieza salió en la fuente de respaldo y no sirve.
3. **Reducción a 1080 de ancho** con `reducir.py`: LANCZOS, JPEG calidad 90, `subsampling=0` (croma 4:4:4). Con el 4:2:0 por defecto el punto dorado salía `#8D834E` en vez de `#C9A227`.
4. **Mirar la pieza en el recorte de la grilla** (1012×1350 central) y, en story y reel, con las zonas de 10.1 dibujadas encima.
5. **Después de la primera publicación:** descargar la pieza desde Instagram y medir el color del punto. No hay fuente seria sobre cómo recomprime Instagram el croma; el 4:4:4 protege nuestro archivo, no el que sirve Instagram.

### 10.10 · Lo que NO se hace en Instagram

- **Formato:** 1080×1080. Texto clave fuera del recorte de la grilla o de las zonas de story y reel.
- **Tipografía:** Gabarito fuera del wordmark · Inter · display en una lámina interior, dos veces en una pieza o con más de 6 palabras o 34 caracteres · bajarle la caja al display para que quepa · rótulos en mayúsculas espaciadas · tracking positivo · texto bajo 33 px.
- **Oro:** más de uno por lámina · un dato, una cifra, un número o un punto final en oro · el punto del wordmark en blanco para dar el oro a otra cosa · el punto dorado sobre brasa o petróleo · el punto dorado en una lámina con una foto que ya tiene oro.
- **Wordmark:** en láminas interiores · sobre una placa o un recuadro.
- **Color:** dos campos en una publicación · el campo como franja o recuadro · gris o texto con opacidad sobre un campo · papel como fondo de lámina · el fondo `#0E141B` y la foto del hilo bajo velo del sistema v2.
- **Forma:** radios que no sean 17 u 11 de lienzo (6 y 4 del sitio) · píldoras redondas · tarjetas con borde parejo · vidrio fuera de la etiqueta de pieza · sombras · cualquier cosa que imite un botón.
- **Imagen:** fotos de la lista negra · personas presentadas como equipo o clientes · pantallas con datos inventados · texto sobre una foto (salvo la etiqueta de pieza) · velos · Raigal sin su rótulo, en una portada o en una pieza única.
- **Verdad:** cifras, logos o testimonios inventados · precios distintos a los de `oferta-v3.json` · la cartera de precios · el nombre de un prospecto.
- **Voz:** «acá» · voseo · raya como muleta · singular en la cuenta de la marca.
- **Formato, otra vez:** **stories propias diseñadas.** La story se usa solo para re-compartir una publicación del feed (10.6b).
- **Composición:** **una publicación sin ninguna imagen** (10.6c). Una foto de relleno puesta solo para cumplir esa regla.
- **Línea:** contenido de Verifica y Cumple (Ley 21.719) publicado como pieza de SpindleLab con este manual. Tiene su línea propia.

### 10.11 · Lo que decide Ramón antes de la primera publicación

1. **El enlace de la bio:** `spindlelab.cl/diagnostico/` (el llamado de 10.8 funciona) o `verifica.spindlelab.cl` (hay que cambiar el llamado).
2. **4:5 o 3:4** (10.1). Rige 4:5 mientras no lo cambie.
3. **Confirmar la lectura del radio** (10.3): la decisión 5 se aplicó en px del sitio (17/11 de lienzo). Si la quería literal (6/4 de lienzo, casi recto en el teléfono), se cambia en una línea del kit.
4. **Volver a capturar la cuenta.** La última captura del repo es del 25-sep (19 seguidores, 7 publicaciones, dos sin identificar en `marketing/redes/QUE-HAY-PUBLICADO.md`). Hay que mirarla antes de publicar la primera pieza en este sistema.

---

## Historial

- **v3.0 (7 oct 2026):** el manual copia el sistema del sitio v3 para que Instagram se vea como el sitio. **Por qué:** pedido de Ramón del 7-oct (*«como este sitio ya está casi listo, dame un manual de marca que sea una copia del sitio de referencia. quiero avanzar con publicaciones en instagram»*). La v2.0 se había escrito antes de construir el sitio y quedó atrás en tokens, forma, oro y movimiento; el sitio y la `spec` (con su historial medido) pasan a ser la fuente de cada valor.
  - **Cabecera:** las piezas de redes ahora las rige este manual (§10) y no `marketing/redes/README.md`; Verifica y Cumple tiene su línea propia; la rama de la v3 es `claude/magical-franklin-ckfki2`; la tabla de estado suma driftime como vara (5-oct) y las decisiones de Instagram (7-oct).
  - **§02 Wordmark:** el punto va en papel en el pie gigante y en el color del texto sobre brasa, petróleo o papel; la única placa es la del módulo de navegación; el mínimo de 120 px tiene la excepción medida del módulo; Gabarito es un archivo estático de peso 600; se anotan los dos trackings.
  - **§04 Color:** tokens de `driftime.css`. El módulo `#161616` reemplaza a la tinta como superficie (y nunca es fondo de sección); el gris `#9AA4B0` (8,31:1) reemplaza al humo; el gris 2 solo en líneas; el blanco solo sobre brasa; texto sobre campos al 100 %, y superficies y líneas sí pueden llevar opacidad; proporción de campo medida (48,1 / 45,0 / 0 %) y se retira «ninguna página sin campo», que queda abierto en la `spec`. Navy deja de abrir el blog.
  - **§05 Tipografía:** Inter sale del sistema; escala real a 1440 y 390 con el display que también limita por alto; la medida de 68 caracteres se implementa en em.
  - **§06 Punto dorado:** de tres usos a uno (solo el punto del wordmark, uno por vista o por lámina); el oro dentro de una foto cuenta.
  - **§07 Forma y movimiento:** radio de 4 px declarado; margen 40/20 y separación 16/10 como dos tokens; aire de sección real (180/200, no 256); botón papel con texto negro, también sobre campos; vidrio con dos usos; sin tarjetas. Se suma la tabla de componentes que una pieza gráfica puede copiar. Movimiento: la entrada existe y hoy no se usa, Lenis entra al manual, el paralaje está definido y sin uso.
  - **§07b Imagen:** sección nueva. Pool con medidas y alt, mockups, etiquetas, concepto rotulado, regla de Unsplash (decisión 6), oro en fotos medido, lista negra (sale `foto-banner-original` como foto de marca), video.
  - **§08 Voz:** sin «acá», sin voseo, Instagram en plural de marca.
  - **§09 Aplicaciones:** las plantillas de posts 1080×1080 quedan retiradas; se suman la imagen OG v3 y el kit de Instagram; el banner de LinkedIn queda por rehacer.
  - **§10 Instagram:** sección nueva. Formatos y zonas seguras con fuente (la zona de los reels cambió contra la decisión 1: manda Meta), factor 2,77 de sitio a 1080 (también para el radio, que queda en 17/11 de lienzo, y para el mínimo del wordmark, ≥ 70 px), retícula, escala medida, color por pilar, tipos de pieza del kit, reglas de carrusel, llamado sin botones, precio, exportación y lista de lo que no se hace.
  - **Lo que NO cambió:** esencia, la forma del wordmark, el monograma, el sentido del punto dorado, el territorio de campaña, el núcleo de la voz y §04b.
- **v2.0 (29 sep 2026):** manual reescrito sobre el sistema v3. La v1.3 dejó de ser la base porque el sitio se está rehaciendo completo.
  - **§04 Color:** el lienzo pasa de tinta `#131A22` a **negro puro `#000000`**. Se suman los cuatro campos de color con sus cremas y contrastes medidos (navy y petróleo vuelven a subir de rango; brasa y ciruela son nuevos), y el gris `humo` para metadatos sobre negro. La proporción papel-dominante queda acotada a documentos y papelería (§04b).
  - **§05 Tipografía:** **Manrope** toma titulares y cuerpo; **Gabarito queda reservada al wordmark**; Inter pasa a fallback. La regla de caja se invierte: donde la v1.3 prohibía ALL CAPS en titulares, el v3 los pone en mayúsculas, **con un límite de largo de 6 palabras y 34 caracteres que es parte de la regla.**
  - **§07 Forma y movimiento:** sección nueva. Radio único de 6px, aire de sección de 256px, y los tres mecanismos de movimiento con sus dos reglas de degradación.
  - **§09:** se documenta `npm run verificar`.
  - **Lo que NO cambió:** esencia, wordmark, monograma, punto dorado, territorio de campaña y voz. El v3 los usa tal cual.
  - **Queda pendiente de Ramón:** decidir si los h1 de los siete artículos se acortan al límite, con su costo de SEO; y bajar este manual a las skills que todavía repiten las reglas de la v1.3.
- **v1.3 (8 jul 2026):** regla de voz refinada: plural para lo que la empresa ofrece, singular para lo observacional.
- **v1.2 (8 jul 2026):** sistema aplicado a `spindlelab-site`: tipografía, favicon, 4ª línea de servicio (Desarrollo Web). Corrección: el sitio nunca usó Fraunces, usaba Manrope.
- **v1.1 (8 jul 2026):** la tipografía de marca pasa de Fraunces Display a **Gabarito** (la serif era demasiado solemne). Kit de logo en `logo/`.
- **v1.0 (8 jul 2026):** sistema inicial.

### El sistema anterior, para el sitio vivo

Hasta que la v3 se publique, `spindlelab-site/` corre con: Gabarito en titulares, Manrope
en cuerpo, fondo tinta `#131A22`, titulares en sentence case y mayúsculas solo en etiquetas
pequeñas con tracking ≥ 1,4 px. **Eso no es un error del sitio vivo: es la v1.3 funcionando.**
No lo «corrijas» contra este manual hasta que la v3 se despliegue.

---

## Lo que queda desactualizado fuera de este manual

Para que el orquestador lo actualice. Este manual no los toca.

**Skills**
- `.claude/skills/persona-director-creativo/SKILL.md`, línea 59: «Tamaños: 1080×1080 (feed/carrusel)». Falta el recorte de grilla, las zonas seguras y la exportación a 2x con JPEG 4:4:4.
- `.claude/skills/voz-spindlelab/SKILL.md`, línea 43: cita «escríbeme por acá y lo miramos» como rasgo; choca con «sin acá». `.claude/skills/voz-spindlelab/corpus.md` tiene 7 «acá» y el usuario viejo `@spindle.lab`: es texto publicado, se anota y no se reescribe.
- `.claude/skills/persona-social-media/SKILL.md`: no recoge «sin acá / sin voseo» ni que en Instagram el enlace va en la bio y en el sticker.

**Redes**
- `marketing/redes/README.md`: la sección «El estilo visual vigente (v2, 31-ago)» y la regla 1 («partiendo de `2026-09-septiembre/base.css`»).
- `marketing/redes/2026-09-septiembre/_sistema/base.css` y `marketing/redes/2026-10-octubre/_sistema/base.css`: plantilla v2. Quedan como archivo, no como base.
- `marketing/redes/_tools/render.sh`: rinde 1080×1080 a 1x en PNG. Pasa al patrón de `marketing/brand/og-v3/render.mjs` + `reducir.py` a 1080×1350.
- `marketing/encargos-otras-sesiones/instagram-spindlelab-directrices.md`: §3 (tokens v2, «producción nunca repo», radio 16, cifra en Gabarito a 210 px, petróleo en etiquetas) y §4 (1080×1080, «no hay ffmpeg», falso desde el 25-sep).
- `marketing/brand/redes/perfil-instagram.md`: alinear el llamado con el enlace de la bio y quitar «pasar a cuenta profesional» (ya está hecho).
- `marketing/brand/redes/post-tipografico.html`, `post-tipografico.png`, `post-foto.html`, `post-foto.png`: plantillas v1.x retiradas (§09).
- `marketing/redes/2026-10-octubre/01-carrusel-tres-mitos/` y `marketing/redes/2026-10-octubre/02-cifra-articulo-50/`: v2, 1080×1080, tema Verifica. No se publican como SpindleLab.
- `marketing/redes/QUE-HAY-PUBLICADO.md`: Instagram capturado el 25-sep, con dos publicaciones sin identificar. Recapturar desde el canal.

**Oficina**
- `marketing/oficina/clientes/spindlelab.md`: la regla de precios (línea ~178) está en su versión del 31-ago (ver 10.8); «enlaces en el primer comentario» no aplica en Instagram; falta una sección de formatos de Instagram que apunte a §10.
- `marketing/oficina/memoria/bruno-direccion-creativa.md` (líneas ~180-185, «Estilo v2 obligatorio») y `marketing/oficina/memoria/cata-social.md` (línea ~39): sumar una entrada nueva que apunte a este manual, sin reescribir la memoria.
- `marketing/oficina/organigrama-oficina.md`, línea 58: «(1080×1080 / 1080×1920)».

**Raíz**
- `CLAUDE.md`, línea 105: copiar `Gabarito.woff2` + `inter.woff2` y feed a 1080×1080. Línea 121: «Gabarito (headlines/wordmark), Inter (body)» y «usually the wordmark's final dot», que pasa a «siempre, y solo».

**Fuentes del sitio** (las corrige su dueño; esta sesión no toca `spindlelab-astro/`)
- `spindlelab-astro/src/styles/driftime.css`, línea 22, y `spec-visual.md` §1: el gris da 8,31:1 sobre negro, no 6,9:1.
- `spec-visual.md` §1: asigna `--modulo` al «módulo de nav»; el módulo usa negro al 75 % con desenfoque (`NavV3.astro`:71).
- `spec-visual.md` §1, fila de `--r`: «4 px solo dentro de un control» quedó corto frente a la fila del 6-oct de su propio §7 (etiqueta, rasgo de plan y píldora-rótulo).
