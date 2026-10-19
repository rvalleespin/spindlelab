# Spec visual · SpindleLab v3 · obra E12 · dirección elegida: A · Archivo

**Vigente desde el 19-oct-2026 (Lucía, dirección de arte).** El contrato contra el que Diego construye en la corrida 2 y
contra el que Javiera audita. **Lo que no está aquí no se inventa:** si un caso no está cubierto, se le pregunta a Lucía
y la respuesta se escribe aquí, con su fila en §7. Una corrección que se queda en el chat vuelve como defecto.

- **Referencia dominante:** Koto (koto.com), **medida** (`e12/lock-koto.md`, §20 y §21 sobre todo; `e12/medicion/koto/`).
  Accept & Proceed queda acotada a una cosa: la carga como diseño (cada medio espera en su placa con su radio).
- **Rasgo que se preserva:** un lienzo `#060606` donde la interfaz se retira (gris, chica, una letra en dos cortes,
  cero negrita) y lo que ocupa la pantalla es el trabajo, plano en su marco. El color lo pone cada pieza dentro de su
  marco; la interfaz no tiene ninguno.
- **Qué sacrifica:** el hero monumental del brief de Ramón (la frase va a 48 px, como la portada de Koto); depende del
  material grabado (sin capturas buenas, A se cae); y lleva la letra de los productos de Google (riesgo dicho en
  `tableros/e12-direcciones/direccion-a.md` §0, que Ramón eligió sabiéndolo).
- **Implementación de referencia:** el prototipo `tableros/e12-direcciones/proto/a/` (cinco vistas, aprobado por Javiera
  en la vuelta 2 del paso 2) y el estudio de la portada `e12/spec/portada/` (la portada con el hilo de oro, medida para
  esta spec). **Donde el prototipo y esta spec difieren, manda la spec**; las diferencias están listadas en §0.4.
- **La spec anterior** (el sitio en el lenguaje de driftime, 5 al 15-oct) es historia, entera y sin cambios, en
  [`spec-visual-driftime.md`](spec-visual-driftime.md). Lo construido con ella en `spindlelab-astro/` lo reemplaza la
  corrida 2.
- **Herramientas y datos de esta spec:** `e12/spec/` (`herramientas/`, `datos/`, `img/`, `portada/`). Cada número de
  abajo dice de qué archivo sale.

**Manda, en este orden:** el brief de obra, sección «Compuerta 2» (`e12/brief-de-obra.md`) y después «Compuerta 1»;
`e12/insumos-ramon-19oct.md` (lo que contestó Ramón, textual); esta spec; `e12/lock-koto.md`; el prototipo. El texto es
de Clara (`e12/texto/texto-paso2.json` y lo que escriba para las rutas nuevas); los datos, de los inventarios
(`e12/inventario-casos.md`, `e12/inventario-praxi.md`): **una etiqueta o un número sin fila ahí no existe**. Las señales,
de Simón (`e12/senales-obra.md`).

---

## 0 · Lo que esta spec ejecuta

### 0.1 · La compuerta 2 (19-oct, ~09:50), punto por punto

| # | Decidió Ramón | Cómo lo ejecuta esta spec | Dónde |
|---|---|---|---|
| 1 | **A · Archivo** («1 A») | Google Sans Flex + DM Mono 500 sobre `#060606`; el trabajo carga la pantalla. B no se construye ni se le toman rasgos | §1, §2 |
| 2 | **Logo: El huso** («2 dos»), monocromo (pregunta 10, por defecto), Google Sans Flex wght 600 | En el encabezado, el pie y el favicon; blanco sobre negro, nada más | §5.4 |
| 3 | **Hero 3** («3 tres»): «hero-sitio» de Clara | El rótulo, el `h1` en dos tintas y la entradilla, en la portada | §2.1 |
| 4 | **Portada: el video del hilo de oro** del sitio actual, sin pagar generación («cuando tenga plata vamos con lo faltante») | En el lugar del showreel de Koto, con velo `#060606`, pausa, VP9 y H.264, póster y quieto con movimiento reducido. **Desvío autorizado**, registrado en §0.3. La cinta de trabajo baja a primera sección | §2.1, §3.1, §3.2 |
| 5a | «tienes capturas en los archivos» | El caso Praxi va con las capturas de las páginas públicas y los recortes de A; el hueco de las pantallas internas queda nombrado, con su marco punteado | §2.3, §3.3 |
| 5b | «no se cuenta» | Ni «en pausa» ni «fuera de línea» en ninguna parte; sin enlace a praxi.coach | §2.3, §6 |
| 5c | «las fotos están en la nube» | `landing-1/2/3.jpg` solo dentro de las capturas de la landing, nunca sueltas | §3.3, §6 |
| 5d | «nombra» | Los dos modelos, cada uno con lo que hace para quien usa Praxi | §2.3 |
| 5e | «si fue con agentes de IA» | En los créditos de la barra del caso | §2.3 |
| 5f | «ambos son casos reales» | Praxi y Combeau con página propia; Combeau es **una** página con dos partes | §2.3 |
| 6 a 10 | Sin respuesta: van por defecto | 6: ni 54 → 94 ni 36 → 73 a la vista (cierra el defecto 20). 7: Combeau sin medidas personales (defecto 21 en A). 8: ninguna interior con el lienzo claro. 9: el círculo del cursor es blanco. 10: el logo es monocromo | §1.1, §2, §3.3, §6 |

### 0.2 · Los defectos abiertos del acta del paso 2 (vuelta 2)

| # | Cómo se cierra | Dónde |
|---|---|---|
| 20 | La home muestra la alternativa de Clara en «Cada pieza, con su prueba», no el 54 → 94 | §2.1 (sección 5) |
| 21 | El caso Combeau en A usa solo los medios recortados de `e12/casos/combeau/medios/`; ningún `alt` menciona medidas; la cinta se rehace sin el tramo viejo | §2.3, §3.2, §3.3 |
| 22 | **Techos de campo por tipo de página**, escritos y medibles; la franja de Desarrollo web deja de ser un campo (Doceavo sale de la franja y entra Combeau) | §3.4 |
| 23 | La línea de `direccion-a.md` §9.2 corregida (19-oct) | `tableros/e12-direcciones/direccion-a.md` §9.2 y §10 |

### 0.3 · Desvíos registrados (de Koto, del lock o del brief)

Cada uno con su porqué. Un desvío que no está en esta lista es un defecto.

1. **La portada es un video de marca generado con IA** (Higgsfield, 1-ago), cuando el brief (§5, «Huecos»; §4, la fila
   de los clichés) y el lock §20.2 piden solo trabajo real. **Autorizado por Ramón** en la compuerta 2, punto 4. Es la
   única imagen generada de la obra y no abre la puerta a otra (brief §6.12). No va en un marco de trabajo: va a sangre,
   sin radio y sin rótulo de pieza, para que nadie lo lea como un proyecto.
2. **Bajo 834 px la portada es una franja 16:9 a sangre y el texto va debajo, sobre el lienzo**, no encima del video
   como en Koto a 390 (su reel ocupa la pantalla entera). Por qué: el chequeo tiene que entrar en la primera pantalla a
   360 × 800 (§4.4). Con el video a pantalla completa y el texto encima, a 360 × 800 el texto tapaba el video entero
   (medido: la rampa del velo empezaba en el borde de arriba) y a 375 × 667 el botón quedaba 42 px bajo el borde.
3. **Bajo 834 px el `h1` de la portada va a 26 px**, el paso de la declaración de Koto, no a 36, el de su portada.
   Koto usa 36 a 390 para una frase de 3 palabras («We're Koto / The Creative Company») y 26 para una declaración larga
   (lock §2.1); la nuestra tiene 18 palabras. A 36 ocupaba 6 líneas a 360 (216 px) y el chequeo no entraba.
4. **Entre 834 y 1193 px el muro del índice va en dos columnas**; Koto, en una (medido el 19-oct,
   `datos/koto-entre-cortes.json`). Con diez entradas, una columna de 788 a 1147 px deja cada pieza 4:5 de 985 a 1434 px
   de alto, más de una pantalla por pieza. El prototipo lo construyó así y Javiera lo aprobó a 768 y 1024.
5. **Problema lleva su rótulo mono** (Koto no lo pone en su introducción): lock §21.5, fila del 18-oct en su §19.
6. **La cruz de registro** en el borde de sección de los casos: lock §10, desvío del brief de obra §4 ya registrado.
   Reversible en una regla de CSS.
7. **La home tiene campos en más de una pieza** (el lock §20.2, regla 4, decía «en la home, a lo más la pieza
   destacada»): la home de A que Ramón eligió tiene un índice corto de cuatro piezas y la fila de pruebas. Lo acota el
   techo de §3.4.
8. **El borde del campo del chequeo es `#707070`**, no el `#4a4a4a` del prototipo: el del prototipo daba 2,29:1 contra el
   lienzo, bajo el 3:1 de WCAG 1.4.11. Koto no tiene un campo de texto medido.

### 0.4 · Lo que cambia respecto del prototipo de A (lo construye Diego así, no como el prototipo)

1. **Portada nueva** (§2.1, §3.1): el video del hilo de oro llena la primera pantalla; la cinta pasa a ser la sección 2.
2. **La cinta se rehace** sin el tramo viejo de Combeau modelo, que mostraba su línea de medidas (§3.2).
3. **Las barras laterales (caso, índice, artículo) aparecen desde 1194, no desde 1024** (§1.4): así lo hace Koto
   (medido), y entre 1024 y 1193 la caja del cuerpo del caso quedaba en 292 a 377 px (42 a 53 caracteres por línea).
4. **La caja del cuerpo tiene tope de 493 px en todos los anchos** (§1.3): el prototipo lo aplicaba solo desde 1024, y
   entre 768 y 1023 el cuerpo de los casos llegaba a 106 y 142 caracteres por línea (`datos/proto-a.json`).
5. **El `h1` de la portada a 26 px bajo 834** (§0.3, punto 3).
6. **Combeau es una página** (`/v3/trabajo/combeau/`, con `#fotografia` y `#modelo`); el índice y la home enlazan ahí,
   no a `combeau-fotografia/` ni `combeau-modelo/` (inventario §2.9; `senales-obra.md` §0).
7. **Verifica y Cumple, el chequeo y spindlelab.cl no tienen página de caso** (§2.2); ningún enlace a una ruta
   `/trabajo/x/` que no exista.
8. **Ni el 54 → 94 ni «Fuera de línea»** (§0.1, filas 5b y 6).
9. **La franja de Desarrollo web es Combeau, no Doceavo** (§3.4).
10. **El borde del campo, `#707070`** (§0.3, punto 8).
11. **Todo video lleva H.264 además de VP9** (§3.5); el prototipo tenía solo VP9 en los casos.
12. **El logo es el dibujo final de Bruno** (`e12/logo/final/`, §5.4), no el provisorio del prototipo.

### 0.5 · Preguntas abiertas (no se resuelven a la fuerza)

**Para Ramón (lo trae Mauro):** `Layout.astro` es el de producción y el brief §6.7 prohíbe tocarlo (gtag,
consentimiento, Pixel). Desde él, cinco cosas de toda página v3 que A no puede cambiar desde afuera:

| Qué | Hoy, en toda página `/v3/` | Lo que A necesita | Qué pasa si no se toca |
|---|---|---|---|
| **Lenis** | Se carga y se crea (20.034 bytes con el resto de los scripts del Layout, 5,9 kB comprimido, `dist/_astro/hoisted.*.js`) | Que no cargue: A va con scroll nativo, como Koto (lock §9) | Se deja sin efecto desde la página (§5.2), medido: la rueda vuelve a ser nativa. Sigue bajando y corriendo su bucle por cuadro |
| **Letras precargadas** | Inter (48.432 B), Gabarito (20.080 B) y Manrope (24.576 B), con `rel=preload` | Solo Google Sans Flex y DM Mono (antislop C7: ninguna letra cargada sin uso) | Cada página de A baja 93.088 bytes de letras que no usa |
| **`theme-color`** | `#0E141B` (la tinta vieja) | `#060606` | La barra del navegador del teléfono queda en otro negro |
| **Favicon** | `favicon.svg?v=4` (el de antes) | El huso, con `?v=5` | El de antes en la pestaña, mientras viva en `/v3/` |
| **`#org` y `jobTitle`** | El posicionamiento de antes (Simón, `senales-obra.md` §1.1) | El del estudio | Lo cubre Simón; va con lo mismo |

**La propuesta, para que Ramón la apruebe o no:** una prop opcional del `Layout` por cada una, cuyo valor por defecto es
el de hoy, de modo que las 20 páginas publicadas salgan **byte a byte iguales** (se comprueba con un `diff` del `dist/`
de esas rutas antes y después); el v3 las pasa. No toca gtag, consentimiento ni Pixel, pero es un cambio en
`Layout.astro` y va a `desvios.md`. **Hasta que conteste, rige lo que dice §5.2 y nada se cambia en el `Layout`.**

**Para Clara:** el texto del círculo y del rótulo quieto sobre la entrada de Verifica y Cumple, que ahora enlaza al
sitio del producto y no a un caso (§2.2); el texto del caso Combeau (inventario §2.9) y la confirmación de los textos
de control que A puso (`direccion-a.md` §6).

---

## 1 · Tokens

Viven en `src/styles/archivo.css` (§5.3), como propiedades en `body.a-body`, no en `:root`: así ninguna regla de A
alcanza a una página de producción aunque la hoja se cargue por error. **Un valor que no esté en estas tablas no se
usa.** Valores tomados del prototipo (`proto/a/a.css`) salvo donde se dice.

### 1.1 · Color (cada token con su rol; contraste calculado desde el hex, `datos/tokens.json`)

| Token | Valor | Rol, y solo ese | Dónde **no** |
|---|---|---|---|
| `--a-lienzo` | `#060606` | El fondo de todas las páginas, siempre: `html` y `body`. El texto sobre lo blanco (botón claro, círculo) | Nunca cambia por página, sección, scroll ni estado (lock §20.2, regla 1) |
| `--a-placa` | `#141414` | Encabezado plegado, menú, barra del caso bajo 1194, rótulo sobre un medio (`marca-medio`), botón de pausa, fondo del campo, el marco donde espera cada medio mientras carga | Tarjeta de contenido, banda de sección, fondo de un bloque de texto |
| `--a-placa-activa` | `#202020` | La sección activa en la barra del caso; el botón de placa al pasar el mouse | Cualquier cosa que no sea un estado |
| `--a-placa-apretada` | `#2A2A2A` | El botón de placa apretado (`:active`) | Fuera de ese instante |
| `--a-blanco` | `#FFFFFF` | Lo nombrado y lo activo: titulares, la primera tinta, enlaces, la sección activa y su punto de 3 px, el foco, el botón claro, el círculo del cursor, el estado apretado de la pausa | El cuerpo corrido |
| `--a-blanco-70` | blanco al 70 % (`#B4B4B4` compuesto) | El menú del encabezado en reposo (Koto: 70 → 100 % en 167 ms) | Cualquier otro texto |
| `--a-gris` | `#989898` | La continuación de la frase, el cuerpo, los rótulos y datos mono en reposo, el placeholder | Sobre un campo claro; un enlace que no se distinga de otra forma |
| `--a-apretado` | `#D0D0D0` | El botón claro apretado (`:active`) | Fuera de ese instante |
| `--a-linea-seccion` | `#2D2D2D` | El borde superior (1 px) de cada sección del caso, del índice, de una fila de plan, fase o pregunta; la cruz de registro | Alrededor de un bloque; borde de tarjeta |
| `--a-linea` | blanco al 10 % | Separador entre filas de una lista y entre ingredientes | Borde de un bloque |
| `--a-borde-campo` | `#707070` | El borde de 1 px del campo de texto (WCAG 1.4.11) | Cualquier otro borde |
| `--a-hueco` | `#4A4A4A`, punteado | El borde punteado de un hueco nombrado (lo que falta, dicho: las pantallas internas de Praxi) | Cualquier cosa que exista |
| `--a-velo` | `#060606` al 70 % | Las piezas del índice que no tienen el mouse (167 ms lineal, solo con puntero fino desde 834) | En táctil no existe; nada más |
| `--a-velo-portada` | `#060606` de 0 a 0,88 y a 1 en el borde de abajo | Solo la portada desde 834 px (§3.1) | Cualquier otro medio: el texto nunca va sobre un medio del trabajo |
| campos | los del trabajo | Dentro de un marco de medio, con los techos de §3.4 | La interfaz entera |

**Ningún color más.** Ni el oro `#C9A227`, ni el cobalto (la opción b del lock §20.4 queda descartada por la pregunta
9), ni un color por servicio, ruta o estado.

| Par (WCAG 2.1) | Contraste | Mínimo |
|---|---|---|
| blanco sobre lienzo · placa · placa activa | 20,26 · 18,42 · 16,29 | 4,5 |
| gris sobre lienzo · placa · placa activa | 7,02 · 6,39 · **5,65** (el más justo: sobre la placa activa nada más oscuro que el gris) | 4,5 |
| blanco al 70 % (menú) sobre lienzo | 9,81 | 4,5 |
| lienzo sobre blanco (botón claro, círculo) · sobre gris (botón claro al pasar) · sobre `#D0D0D0` (apretado) | 20,26 · 7,02 · 13,14 | 4,5 |
| foco: contorno blanco de 2 px contra el lienzo · contra la placa | 20,26 · 18,42 | 3 |
| borde del campo `#707070` contra el lienzo · contra el peor fondo del velo de la portada | 4,09 · 3,14 (medido en el render: 3,23 a 3,29) | 3 |
| gris · blanco sobre el peor fondo del velo de la portada (0,88 sobre un blanco puro) | 5,39 · 15,55 (medido sobre el video: §3.1) | 4,5 |
| anillo de 1 px del círculo (lienzo) contra un campo blanco | 20,26 | 3 |
| punto activo (blanco) contra el gris de su fila | 2,88: **no basta**, por eso la activa la marca el punto y no el color | |
| línea de sección · línea · placa contra el lienzo | 1,47 · 1,23 · 1,10 | decorativas: separan, no informan |

### 1.2 · Letras

Dos familias, en dos archivos locales, y ninguna otra (antislop C7). Se copian de `proto/a/fuentes/` a
`spindlelab-astro/public/fonts/` con su licencia al lado:

| Archivo | Qué es | Peso | Licencia |
|---|---|---|---|
| `google-sans-flex-latin.woff2` | Google Sans Flex variable, subconjunto latino de Google Fonts, ejes `wdth` 25–151 y `wght` 100–1000 | 119 kB | `OFL-google-sans-flex.txt` (SIL OFL 1.1, © 2015 Google LLC) |
| `dm-mono-500-latin.woff2` | DM Mono 500, estático | 15 kB | `OFL-dm-mono.txt` (SIL OFL 1.1, The DM Mono Project Authors) |

`@font-face` como en el prototipo (`font-weight: 100 1000; font-stretch: 25% 151%` en la variable; `font-display: swap`
en las dos) y `rel=preload` de las dos por el slot `head`. **Ninguna de las dos trae flechas** en este subconjunto: la
flecha es un SVG (§1.6, iconos).

| Rol | Letra y corte | Se usa en |
|---|---|---|
| **Display** | Google Sans Flex, `font-stretch: 76%`, `font-weight: 300` | `h1`, `h2`, `h3` de sección, títulos de pieza en la ficha de la cinta, el puntaje del resultado del chequeo |
| **Cuerpo** | Google Sans Flex, `font-stretch: 100%`, `font-weight: 370` | Párrafos, entradillas, nombres de pieza bajo el medio, el índice de secciones, el filtro, los campos |
| **Rótulo** | DM Mono 500, 11 px, MAYÚSCULAS, `letter-spacing: .03em`, interlínea 1,25 | Rótulos de sección, ficha (TIPO · AÑO), menú, botones, la hora, el texto del círculo |
| **Dato** | DM Mono 500, 12 px, caja normal, `.03em`, interlínea 1,35 | Valores con fila en el inventario (fechas, ingredientes, identificadores de modelo) |
| **Logo** | Google Sans Flex wght 600, **dibujado en SVG** (no carga la letra a 600) | Encabezado, pie, favicon (§5.4) |

**Cero negrita** (`strong`, `b`, `em` heredan peso y estilo; ningún nodo con peso ≥ 600, medido en el prototipo: 0).
**Nada en mayúsculas salvo la mono.** La interlínea del rótulo queda en **1,25** (la decisión que el lock §6.4 dejó a la
spec): la línea mono del índice pasa a dos líneas a 390 y a 1,0 se montan.

### 1.3 · Escala (1440 → 390; entre los dos anchos, lineal con `clamp`)

| Paso | 1440 | 390 | `clamp` | Se usa en |
|---|---|---|---|---|
| Portada | 48 / 1,0 / −0,01em | **26** / 1,0 | `clamp(26px, 2.0952vw + 17.829px, 48px)` | Solo el `h1` de la home (§0.3, punto 3) |
| Declaración | 38 / 1,1 / −0,01em | 26 / 1,1 | `clamp(26px, 1.15vw + 21.5px, 38px)` | `h1` de las interiores, `h2` de sección de la home y de las interiores |
| Siguiente | 32 / 1,15 | 23 / 1,15 | `clamp(23px, .86vw + 19.6px, 32px)` | El nombre del caso siguiente |
| Título | 24 / 1,2 | 23 / 1,2 | `clamp(23px, .1vw + 22.6px, 24px)` | `h1` de caso y de artículo (en la barra), `h2` de sección del caso, `h3` de plan y de pregunta, servicios secundarios de la home |
| Cuerpo | 16 / 1,35 | 15 / 1,35 | `clamp(15px, .1vw + 14.6px, 16px)` | Párrafos |
| Chico | 14 / 1,35 | 13 / 1,35 | `clamp(13px, .1vw + 12.6px, 14px)` | Pies de medio, notas, la ayuda del chequeo, créditos |
| Dato | 12 / 1,35 | igual | | §1.2 |
| Rótulo | 11 / 1,25 | igual | | §1.2. **Piso de todo texto: 11 px** |

Medido en el prototipo a 1440: `h1` 48 px en dos líneas (1054 px de ancho), declaración 38, título 24
(`datos/proto-a.json`). **La caja del cuerpo tiene tope de 493 px en todos los anchos** (Koto: 493; A da de 68 a 71
caracteres por línea a 1440 y Koto 72 en Lyft, `datos/koto-entre-cortes.json`). `text-wrap: balance` en titulares,
`pretty` en cuerpo. **Dos tintas en una frase:** una por sección, la parte en blanco hasta 8 palabras y la gris de 6 a
13 (lock §14); son las que Clara marcó con «tinta» y «gris».

### 1.4 · Retícula y cortes

- **Retícula de Koto:** margen lateral 16 px, separación 8 px, **sin ancho máximo**. **8 columnas bajo 834 px, 12 de
  834 a 1193, 16 desde 1194** (los cortes medidos de Koto). A 1440 la columna mide 80,5 px.
- **El corte de 1024 que A dejó abierto (`direccion-a.md` §9.4) se cierra en 1194.** Medido en Koto el 19-oct
  (`herramientas/koto-entre-cortes.mjs` → `datos/koto-entre-cortes.json`, Lyft y `/work` a 834, 900, 1024, 1100, 1193,
  1194 y 1440): la barra lateral del caso (320 px, `sticky`) y la del índice aparecen **recién desde 1194**; de 834 a 1193
  el caso va apilado como a 390 (medio principal arriba, nombre, ficha, introducción, barra flotante abajo con la
  sección activa) y el índice va con el título arriba y el filtro en una barra. Con la barra desde 1024, como en el
  prototipo, la columna del caso quedaba en 656 px y la caja del cuerpo en 292 (42 a 44 caracteres por línea).
- **Desde 1194:** barra lateral de 320 px a 16 del borde, columna del ancho de la ventana menos 368 (16 + 320 + 16 + 16), con 16 px entre las dos (a 1440: 1072).
- **Qué se mide en cada ancho:** 360, 390, 768, 1024 y 1440 (los de la obra), más 834 y 1194 (los cortes) y 1920.

### 1.5 · Espaciado, radios, profundidad

- **Espaciado** (la escala, no «donde caiga»): 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56 · 80 · 120 · 160 px. Entre
  medios, 8 (Koto). Arriba de cada sección, **120 desde 834 y 80 bajo 834**. Antes del pie, 160.
- **Radios** (Koto, lock §17): **6** en los medios; **4** en placas, botones, campo, pausa y barra; **2** en rótulos sobre
  un medio y en el contorno del foco; **0** en todo medio a sangre (la portada, la cinta y el medio principal del caso
  bajo 834) y en la línea de sección.
- **Profundidad:** ninguna sombra. Lo único que sube es la placa (encabezado plegado, menú, barra, pausa, rótulo sobre
  un medio), y comunica «esto es un control o un estado», nunca «esto es una tarjeta». El anillo de 1 px del círculo del
  cursor es un borde, no una sombra. **Ningún bloque lleva borde alrededor**: las líneas son el borde superior de una
  sección o de una fila.

### 1.6 · Movimiento

**Motion 13.5.0, fijo** (§5.1). Tres resortes, calibrados contra Koto y A&P (lock §9, `datos/resortes.json` del
tablero del paso 1), todos con ζ ≥ 1 (cero rebote):

| Resorte | stiffness · damping · mass | 90 % | Qué lo dispara |
|---|---|---|---|
| **cursor** | 2700 · 104 · 1 | 75 ms | La posición del círculo |
| **estado** | 800 · 57 · 1 | 139 ms | La escala del círculo al entrar y salir de una pieza; la pieza del índice que se acorta 24 px; el punto activo del índice de secciones |
| **entrada** | 230 · 31 · 1 | 264 ms | Un bloque que entra a la vista **una vez** (`inView`), subiendo 50 px con opacidad 0 → 1: el medio o el abridor de una sección, **uno por sección, nunca texto de lectura ni línea por línea**; el encabezado que se pliega en la placa (desde 834); «Siguiente» al final del caso |

- **El color no lleva resorte:** cambia en **167 ms lineal** (el menú de 70 a 100 %, el velo del índice, la tinta de la
  fase a la vista en Desarrollo web, los subrayados).
- **Nada atado a la posición del scroll** (Koto lo hace; aquí no: lock §3). Scroll nativo (§5.2).
- **Lo que se mueve solo:** la portada, la cinta y los videos de los casos (§3), cada uno con su pausa; la hora cambia
  el minuto. Nada más.
- **El cambio de página** es el de `global.css` (`@view-transition { navigation: auto }`, del sitio de producción): se
  queda como está; A no agrega `view-transition-name` a nada.
- **`prefers-reduced-motion: reduce`:** ningún resorte corre; el círculo no existe; los bloques están en su lugar desde
  el principio; ningún video arranca solo (se ve su póster y la pausa queda en «Seguir el video»); los cambios de color
  son instantáneos. Se mide emulando (criterio 8 del brief).
- **Iconos:** tres SVG propios en línea, de trazo o relleno en `currentColor`: la **flecha** (12 × 12, trazo 1,5), la
  **pausa** y **seguir** (14 × 14). Sin librería.

---

## 2 · Composición por ruta

Rutas del brief §3, todas bajo `/v3/` con `noindex`. Las vistas que el prototipo construyó (home, `/trabajo/`, el caso,
Desarrollo web) se construyen como el prototipo salvo lo que dice §0.4; las demás salen de cuatro plantillas: **portada**
(solo la home), **índice**, **caso** y **interior**. Cada composición dice qué manda el ojo primero, dónde está la
tensión y qué pasa en los cortes. Columnas: «c» es columna de la retícula de §1.4 (c1–c12 = de la 1 a la 12).

### Lo común a todas las páginas

1. **Encabezado** (prototipo `.cab`): el logo a 24 px de alto en el margen (20 bajo 834), el menú en mono 11 (Trabajo,
   Servicios, Método, Nosotros, Escríbenos; la página actual en blanco con `aria-current`), y a la derecha «SANTIAGO»
   con la hora y su huso en gris (§5.5). **Alto: 64 desde 834; 90 bajo 834**, donde el menú pasa a una segunda fila de
   44 px y no hay botón «Menú». Desde 834 es `sticky`: al bajar se pliega en una placa de 48 px (radio 4, a 8 del borde)
   con el resorte **entrada**.
2. **Pie** (prototipo `.pie-sitio`): borde superior `--a-linea-seccion`, el logo a 20 px, `hola@spindlelab.cl` en mono y
   la hora; 160 px arriba. **No hay pie en los casos** (cierran con «Siguiente», como Koto).
3. **Enlace para saltar al contenido**, el primero del documento, visible al recibir el foco (botón claro).
4. **Un `h1` por página, `main`, `nav` con nombre, `lang="es-CL"`.**
5. **Miga** en las interiores, el caso y el artículo: mono 11, separada por «·», la actual en blanco; su
   `BreadcrumbList` dice lo mismo (Simón).

### 2.1 · Home (`/v3/`)

| # | Sección | Desde 1194 (16 c) | 834 a 1193 (12 c) | Bajo 834 (8 c) |
|---|---|---|---|---|
| 1 | **Portada** | El video del hilo de oro llena la sección: alto mínimo `100svh − 64` (el encabezado va antes, sobre el lienzo), a sangre, sin radio. Abajo y sobre el velo: **c1–c12** el rótulo «Estudio de diseño y tecnología», el `h1` a 48 en dos tintas (dos líneas a 1440) y la entradilla (tope 493); **c13–c16** el chequeo: rótulo «Chequeo gratis», su frase, la etiqueta, el campo y el botón **uno sobre otro** a todo el ancho de las 4 c, y la ayuda. Los dos bloques apoyados en la misma línea de abajo, a 24 px del borde. La pausa, arriba a la derecha (§3.1) | Igual, con **c1–c7** para la frase y **c8–c12** para el chequeo; campo y botón **en una fila** | **Franja 16:9 a sangre** con el video (§0.3, punto 2) y debajo, sobre el lienzo, una columna: rótulo, `h1` a 26, entradilla, el chequeo con campo y botón en una fila, la ayuda |
| 2 | **La cinta** | **c1–c12**: la cinta 16:9 exacta (a 1440, 1054 × 593), radio 6; **c13–c16**: la ficha de la pieza que está pasando (tipo · año en mono, el nombre a 24 enlazado a su caso, la bajada en chico; en el tramo de Praxi, la nota de personas generadas), apoyada abajo. Sin titular visible: la sección se nombra con `aria-label` (el de A, §2 del prototipo). La pausa, en la esquina de abajo a la derecha de la cinta | La cinta a las 12 c; la ficha va como rótulo sobre la cinta (`marca-medio`, arriba a la izquierda) | Igual que 834, a sangre y sin radio |
| 3 | **Índice corto** (los destacados de Koto) | **c1–c4**, pegajoso a 88 px: el `h2` «Trabajo.» + su continuación gris. **c5–c16**: Combeau fotografía 16:9; un par 4:5 \| 4:5 (Praxi, Verifica y Cumple); Sesenta 16:9; bajo cada pieza, nombre en blanco y bajada en gris en una sola frase, y la línea mono **solo tipo · año** (Clara: sin herramientas en la home). Abajo, la nota de los conceptos y «[ Todo el trabajo ] (10)», el único corchete de la página | El `h2` arriba; las piezas a las 12 c | Una columna; el par se apila |
| 4 | **Cada pieza, con su prueba** | `h2` en c1–c6. Tres filas sin caja, con borde superior `--a-linea`: el medio en **c5–c12** y lo que lo prueba, con su fecha, en **c13–c16**. **Verifica y Cumple muestra la alternativa de Clara** («Sin métrica de negocio…»), no el 54 → 94 (defecto 20) | Medio c1–c7, dato c8–c12 | Medio arriba, dato debajo |
| 5 | **Servicios** | `h2` en c1–c6. **Desarrollo web primero y a otra escala** (el nombre en Declaración); Visibilidad en IA, Auditoría SEO técnica y Acompañamiento mensual a Título. Cada fila: la situación de quien lee (c1–c4), el cuerpo (c5–c11), el precio en blanco y el botón (c13–c16). **Paid Media y Gestión de redes, en una línea de cuerpo** con sus precios, en c5–c12. Precios, iguales a los JSON | Situación c1–c4, cuerpo c5–c9, precio c10–c12 | Apilado |
| 6 | **Quién está detrás** | El retrato 3:4 de Ramón (el de `/v3/nosotros/`) en **c1–c5**, entero y grande; el `h2` en dos tintas, dos párrafos (tope 493) y «Conocer a Ramón» (botón de placa) en **c7–c14**, apoyados abajo | Retrato c1–c5, texto c6–c12 | Retrato a lo ancho, texto debajo |
| 7 | **Contacto** | **c1–c9**: el `h2` en dos tintas, dos párrafos, «Escribir a SpindleLab» (botón claro) y el correo | c1–c9 | Una columna |

- **Qué manda el ojo primero:** el video (la luz del hilo); después la frase, abajo a la izquierda; después el campo
  blanco del botón. **La tensión:** la frase pesada a la izquierda contra el chequeo angosto a la derecha, con el video
  respirando arriba. A 1440 × 900 quedan **288 px de video sin velo** más 160 de rampa (`datos/portada-contraste.json`).
- **El chequeo** es el de producción: mismos ids (`chq-form`, `chq-dominio`, `chq-btn`, `chq-out`, `chq-error`) y
  `v3-chequeo.js`; su resultado se pinta bajo el formulario, en la misma columna, con el sistema de A (prototipo
  `.res__*`). Donde lo pinta: dentro de la portada desde 834 (la portada crece; el velo crece con ella, §3.1).

### 2.2 · Índice de trabajo (`/v3/trabajo/`)

- **Desde 1194:** barra lateral pegajosa de 320 px (a 80 px del borde de arriba): el `h1` a 24 en dos tintas, «(10)»
  en mono, la entradilla de Clara (cliente, propio y concepto) y **el filtro** (Todo, Cliente, Propio, Concepto, cada uno
  con su conteo en mono; el activo en blanco con el punto de 3 px; botones con `aria-pressed`, filtran de verdad).
  A la derecha, **el muro**: dos columnas de igual ancho con 8 px entre ellas, piezas sin borde ni caja, en las tres
  proporciones de Koto, **en el orden de Clara**: Combeau fotografía 4:5, Praxi 4:3, Sesenta 4:5, Verifica y Cumple
  5:3, Ocelo 4:3, Combeau modelo 4:5, Doceavo 5:3, el chequeo 4:3, Tonela 4:5, spindlelab.cl 5:3 (prototipo). Bajo cada
  pieza: nombre en blanco, bajada en gris, línea mono **tipo · año · hasta dos ingredientes** con fila en el inventario
  (los conceptos: «Concepto · 2026», sin ingredientes). Las portadas de los conceptos llevan su «CONCEPTO» en la esquina.
- **834 a 1193:** el título, el conteo, la entradilla y el filtro arriba (el filtro en una fila de botones de 44 px de
  alto; Koto lo lleva en una barra flotante abajo: A lo deja en la página, como el prototipo aprobado); el muro a dos columnas (§0.3, punto 4). **Bajo 834:** una columna; nombre, bajada y línea mono siempre a la vista.
- **Adónde lleva cada entrada:** Combeau fotografía → `/v3/trabajo/combeau/#fotografia`; Combeau modelo →
  `/v3/trabajo/combeau/#modelo`; Praxi → `/v3/trabajo/praxi/`; los cuatro conceptos → `/v3/trabajo/<concepto>/`;
  el chequeo → `/v3/diagnostico/`; **Verifica y Cumple → `https://verifica.spindlelab.cl/`** (el producto, que responde),
  marcado como externo con la flecha ↗ en SVG junto al nombre (texto del círculo: Clara, §0.5); **spindlelab.cl, sin
  enlace** (es este sitio): su pieza no es un enlace, no tiene círculo ni velo, y la entrada se lee igual.
- **Hover** (solo puntero fino desde 834): la pieza con el mouse se acorta 24 px (`clip-path: inset(0 0 24px 0 round
  6px)`, resorte **estado**) y las demás se cubren con `--a-velo` en 167 ms; el círculo dice adónde lleva (§4.2).

### 2.3 · Caso (`/v3/trabajo/<caso>/`): Praxi, Combeau y los cuatro conceptos

**La plantilla de Koto, lock §21.5, una sola para los seis.**

- **Desde 1194:** barra lateral pegajosa de 320 px (`top: 80px; height: calc(100svh − 96px)`), de arriba abajo: miga;
  el `h1` (nombre en blanco) y la bajada en gris, a 24, en dos tintas; la **ficha mono** (TIPO · AÑO; en los conceptos
  «CONCEPTO · 2026», **a la vista sin scroll a 1440 y a 390**); el **índice de secciones** (cuerpo 16, filas de 36 px, la
  activa en blanco con el punto de 3 px a su izquierda, que se mueve con el resorte **estado**); abajo, los **créditos**
  (quién hizo qué, en chico). A la derecha, la columna: el **medio principal 16:9** a todo el ancho de la columna (a 1440,
  1072 × 603), y después las cinco secciones.
- **Cada sección:** borde superior `--a-linea-seccion`, 24 px arriba y 12 abajo; a la izquierda el rótulo mono y el `h2`
  a Título (2 a 7 palabras); a la derecha, el cuerpo (tope 493), de uno a tres párrafos; después, **sus filas de medios**.
  Las secciones, en este orden y con estos rótulos: **Problema · Hipótesis · Solución · La pieza · Sin métrica** (o
  «Resultado medido», con instrumento y fecha, si hay fila). Desde 1194, el rótulo y el `h2` van a la izquierda y el cuerpo
  a la derecha (dos mitades de la columna); bajo 1194, el rótulo y el `h2` arriba y el cuerpo debajo.
- **Filas de medios, solo las cuatro formas de Koto** (lock §21.2): una 16:9 a todo el ancho de la columna; par 4:5 \|
  4:5; 4:5 \| dos 1,62 apilados; dos 1,62 apilados \| 4:5. Radio 6, 8 px entre todos. La sección abre con una 16:9; una
  fila partida va después de una 16:9, no de otra partida. **Ninguna a sangre desde 834.**
- **«Siguiente»**, al final de la columna (no fijo detrás del caso, como Koto: aquí nada va atado al scroll): borde
  superior, 120 px arriba; a la izquierda el contacto (frase a Título, botón claro); a la derecha «SIGUIENTE» en mono, el
  nombre del próximo caso a 32 y su medio (16:9, 416 px de ancho), y «[ Todo el trabajo ] (10)». Entra una vez con el
  resorte **entrada**. **El caso no tiene pie.**
- **La cruz de registro:** 9 × 9 px en `--a-linea-seccion` donde el borde de las dos primeras secciones cruza el límite
  de la barra (x = 336 a 1440); ninguna bajo 1194. Reversible.
- **834 a 1193 y bajo 834:** el medio principal arriba (desde 834, 16:9 dentro de los márgenes, radio 6; bajo 834, **4:5 a
  sangre sin radio**), después el nombre y la bajada, la ficha, la introducción (Problema) y las secciones en una
  columna; el índice pasa a la **barra flotante** abajo (placa `#141414`, radio 4, a 16 del borde: el nombre del caso en
  mono gris, la sección activa en mono blanco sobre `--a-placa-activa`, «+» que abre la lista; un `details` con su
  `summary`). Las filas partidas mantienen su forma (a 390: pares de 175 px). La página deja 96 px abajo para que la
  barra no tape el final.

**Lo propio de cada caso:**

| Caso | Medio principal | Lo que la spec fija |
|---|---|---|
| **Praxi** (real, propio) | El video del inicio de Praxi (`praxi/material/praxi-hero-secuencia.mp4`, los cinco clips del hero) con su pie de «generado» | Filas del prototipo (9 más el principal). En **Solución**, la lista «Con qué está hecho» (lo que le hace a quien usa Praxi en cuerpo, la herramienta en dato mono) con **los dos modelos nombrados, cada uno con su papel**: Claude Sonnet 5 (`claude-sonnet-5`) conversa como coach; Claude Haiku 4.5 (`claude-haiku-4-5`) saca el registro de lo que escribes y escribe la conclusión del día (inventario-praxi §10.4; el texto final es de Clara). En **La pieza**, la marca en su amarillo a 16:9 y el hueco de las pantallas internas en su marco punteado (`--a-hueco`), dicho. **Créditos:** «Ramón Vallejos, con agentes de IA». **Nada** de «en pausa», «fuera de línea» ni enlace a praxi.coach. Cada medio con personas, con el pie de Clara de personas generadas; cada uno con cifras, «datos de ejemplo». `landing-1/2/3.jpg` solo dentro de las capturas de la landing |
| **Combeau** (real, cliente) | El recorrido de su sitio de fotografía (`casos/combeau/medios/combeau-fotografia-recorrido-1440.*`; a 390, el `-390`) | **Una página, dos partes:** la ficha y las cinco secciones cuentan el caso; dentro, dos anclas con `id="fotografia"` e `id="modelo"` (el índice enlaza ahí), cada una abriendo con su 16:9 (`combeau-fotografia-169`, `combeau-modelo-169`). Solo los medios de `casos/combeau/medios/` (inventario §2.9, «Lo que se puede usar»): el panel por dentro con su pie de fecha (3-sep) y método; la foto servida de 95 kB junto al original enlazado. **Ningún medio ni `alt` con sus medidas, su contacto ni su ficha de contratación.** Resultado: «Sin métrica» |
| **Tonela, Ocelo, Sesenta, Doceavo** (conceptos) | El recorrido grabado de cada sitio (`marketing/portafolio/0N-*/movimiento/`), con el sello de la pieza | Las filas en el orden de su `caso.md` (Bruno), con los rótulos de la plantilla (Desafío → Problema, Estrategia → Hipótesis, Identidad → Solución, Aplicación → La pieza, Qué muestra → Sin métrica; el texto de cada sección no cambia). «CONCEPTO · 2026» en la ficha. **Sin métrica:** «es un concepto, no tuvo usuarios» (Clara). Cero cifras de resultado, cero testimonios, cada persona dicha como ficticia. Las secciones «Lo que subiría de nivel con fotografía» y «Cuenta de filas» de los `caso.md` **no van al sitio** |

**El orden de «Siguiente»** sigue el muro de `/trabajo/`, saltando lo que no tiene página: Combeau → Praxi → Sesenta →
Ocelo → Doceavo → Tonela → Combeau.

### 2.4 · Interior (la plantilla de las páginas de la casa)

La de Koto en `/services` y `/about` (lock §20.1: negras, con a lo más una franja de imagen y fotos), construida en el
prototipo como Desarrollo web:

1. **Cabecera** (`.dw-cab`): miga; `h1` a Declaración en dos tintas (c1–c10 desde 1194); la entradilla (tope 493); los
   botones (claro y de placa) si la página los tiene. 48 px arriba.
2. **Franja** (opcional, a lo más una): un medio del trabajo a todo el ancho de la retícula, **2,39:1 desde 834 y 16:9
   bajo 834**, radio 6, 56 px arriba. **Nunca un campo** (§3.4) y nunca una imagen que no sea del trabajo.
3. **Secciones**: el `h2` a Declaración en **c1–c4, pegajoso a 88 px** (desde 1194; bajo 1194, arriba); el contenido en
   **c5–c12** (listas, fases, preguntas) o **c5–c16** (planes, piezas). Filas con borde superior: `--a-linea` entre
   filas de una lista; `--a-linea-seccion` en planes, fases y preguntas.
4. **Cierre**: c1–c9, el `h2` en dos tintas y los botones de contacto o del chequeo.
5. **Bajo 1194**, el `h2` de cada sección va arriba de su contenido y deja de pegarse; **bajo 834**, todo en una columna
   en el orden del documento: la franja en 16:9 dentro de los márgenes, con radio 6; los planes, las fases y las
   preguntas, que desde 834 van en columnas (3:4:3, 2:5 y 2:3, como el prototipo), se apilan.

| Ruta | Lo que lleva, en este orden | Franja |
|---|---|---|
| `/v3/servicios/` | Cabecera («Qué hacemos»); **una sección por momento** de `oferta-v3.json` (`momentos`): a la izquierda el rótulo y el `h2` del momento, a la derecha sus servicios como filas enlazadas (nombre a Título, la línea de qué hace, el precio «desde … + IVA» en blanco, la flecha); «Lo que pones tú»; «Empieza por el chequeo». **Sin campo de color por servicio** (lo que Ramón rechazó de driftime) | Ninguna |
| `/v3/servicios/desarrollo-web/` | Como el prototipo (vista 5): cabecera; franja; «Lo que va en todos los planes» (lista); «Sitios que construimos» (tres portadas 4:5 en c5–c16: Combeau, Praxi, Sesenta, con la línea corta de Clara, tipo y año); el glosario y los cuatro planes; «Cinco fases» (la fase a la vista pasa del gris al blanco en 167 ms, el único cambio de tinta atado a la vista que tiene Koto, en `/services`; con movimiento reducido, todas en blanco); preguntas; cierre | **Combeau fotografía** (`casos/combeau/medios/combeau-fotografia-169.webp`), no Doceavo (§3.4) |
| `/v3/servicios/visibilidad-en-ia/` | Cabecera; franja; las secciones de hoy (incluye, planes, fases, preguntas, cierre) con la misma forma que Desarrollo web | **El chequeo** (`proto/a/medios/chequeo-43.webp`, recortado a 2,39 al centro): es lo que mide este servicio |
| `/v3/servicios/auditoria-seo-tecnica/` | Ídem | **Verifica y Cumple** (`proto/a/medios/verifica-y-cumple-53.webp`): el producto propio al que se le aplicó (inventario §0.2), sin su puntaje |
| `/v3/servicios/acompanamiento-mensual/`, `/redes-sociales/`, `/paid-media/` | Ídem | Ninguna: ninguna pieza del inventario muestra ese servicio aplicado |
| `/v3/metodo/` | Cabecera; «Del diagnóstico al monitoreo» como las fases de Desarrollo web; «Tres reglas que no negociamos» (lista); «Lo que necesitamos de ti»; cierre | Ninguna |
| `/v3/nosotros/` | Cabecera; **el retrato 3:4** de Ramón en c1–c5 junto a la bio (c7–c14), como «Quién está detrás» de la home pero a la escala de la página; «Por qué un solo sistema», «Cómo trabajo» (secciones); preguntas; cierre. El texto de la bio, tal cual (R4) | Ninguna (el retrato es la imagen) |
| `/v3/diagnostico/` | **El instrumento primero:** miga, `h1` y su línea en c1–c10, y debajo el chequeo grande en c1–c8 (etiqueta, campo y botón en una fila, la ayuda), el resultado en la misma columna; después «Los 21 chequeos» (lista de las 21 señales en tres grupos con sus pesos 30 + 40 + 30, en mono), «Lo que este chequeo no mide», «Dos caminos», «La Ley 21.719», preguntas y el cierre «¿Quién aparece en tu lugar?». Un sandbox a la vista: este | Ninguna |
| `/v3/contacto/` | Cabecera corta (el formulario tiene que quedar entero sobre el pliegue a 1440 × 900, como hoy); **el formulario** en c1–c8 (campos de §4.1, mismos nombres, `.contact-form`, `#f-utm-*`, `.form-status`, `.form-success`, `v3-contacto.js`); «Qué pasa después» (tres pasos como filas); «Antes de escribir» (preguntas) | Ninguna |
| `/v3/blog/` | Ver §2.5 | Ninguna |

### 2.5 · Blog (`/v3/blog/`) y sus siete artículos

- **Índice** (Koto `/latest`, sin sus imágenes: los artículos no tienen una imagen del trabajo): desde 1194, barra
  lateral de 320 px con el `h1` en dos tintas, «(7)» y la línea de Clara; a la derecha, **los siete como filas**, del más
  reciente al más antiguo, con borde superior `--a-linea`: la fecha y el tema en dato mono en la mitad izquierda de la
  columna y el título a Título, enlazado, con la flecha, en la derecha (las dos mitades de las secciones del caso). Al final, el cierre del blog («Leer ayuda; medir, más.» y el chequeo).
  Bajo 1194, todo en una columna.
- **Artículo**: **la plantilla del caso** (§2.3) con otro contenido. En la barra: miga (`Inicio · Blog · <nombre
  corto>`), el `h1` a Título, la ficha en dato mono (fecha · tiempo de lectura · tema), el autor (Ramón, su nombre y su
  rol, con el retrato que ya existe, `public/assets/img/ramon-vallejos-avatar.jpg`, a 44 px y radio 6) y **el índice del artículo** (sus `h2`, con el punto en la
  activa; si algún `h2` trae número propio, el índice no numera ninguna fila, regla del 13-oct del §7). En la columna, el
  cuerpo verbatim con tope de 493 px; los `h2` a Título con su borde superior; tablas y citas con el sistema (líneas
  `--a-linea`, cita a Título en blanco). **Sin imagen editorial**: el pool de driftime (`assets/img/d/`) no es trabajo y
  no entra; si un artículo describe una pieza real (el chequeo, en «21 chequeos»), puede llevar esa captura como medio
  de su sección. Cierra con el mismo paso de conversión del índice y «Siguiente artículo».

---

## 3 · Media

### 3.1 · La portada: el hilo de oro (brief, «Compuerta 2», punto 4 y criterio 14)

**Los archivos son de Bruno** (`e12/medios/hilo/`, README con todo lo medido), sacados del video del sitio actual sin
generar ni gastar nada; el bucle ya no salta (fundido de 24 cuadros: el corte cambia 0,49 veces la mediana entre cuadros
seguidos, contra 8,65 del original). Diego los copia a `spindlelab-astro/public/v3/portada/` en la corrida 2.

| Slot | Archivo | Peso | Cuándo |
|---|---|---|---|
| Video, primer `<source>` | `hilo-1920.webm` (VP9, 1920 × 1080, 121 cuadros, 5,04 s, sin audio) | 1,03 MB | Desde 834 px, y bajo 834 mientras no exista el de 960 |
| Video, segundo `<source>` | `hilo-1920.mp4` (H.264 High, `avc1.640028`, `faststart`, sin audio): **Safari** | 1,40 MB | Ídem |
| Video bajo 834 | **`hilo-960.webm` y `.mp4`, 960 × 540, del mismo bucle: los pide esta spec** (Bruno, con `hacer-hilo.sh` cambiando la escala; techo 0,4 MB VP9 y 0,6 MB H.264, lo que pesa su vertical de 500 × 1080, que tiene casi los mismos píxeles por cuadro: 0,34 y 0,50 MB) | | La franja 16:9 del teléfono mide 360 a 833 px de ancho |
| Imagen quieta y póster | `hilo-1920-poster.webp` (el primer cuadro del bucle, 1920 × 1080) | 34 kB | Siempre: es lo primero que se pinta, lo que se ve con movimiento reducido o sin JS, y el candidato a LCP |
| Ninguno | `hilo-movil.webm` · `.mp4` · `-poster.webp` (500 × 1080 vertical) | | **No se usan:** la spec pone el teléfono en franja 16:9 (§0.3, punto 2). Quedan si un día la portada del teléfono va a pantalla completa con el chequeo bajo el pliegue |

**El marcado** (lo que se construye; el estudio `e12/spec/portada/` es su referencia visual):

1. La sección de la portada contiene, en este orden: la **imagen quieta** (`<img>` del póster, `alt=""`, porque es un
   ambiente sin información; `fetchpriority="high"`, precargada por el slot `head`), el **`<video>`** encima
   (`muted`, `loop`, `playsinline`, **sin** `controls` ni `autoplay` en el HTML, `aria-hidden="true"`, `preload="none"`),
   el **velo** (desde 834) y el **texto**.
2. **Lo arranca el script, solo si:** no hay `prefers-reduced-motion: reduce`, no hay `navigator.connection.saveData`, y
   la sección está a la vista (`inView` de Motion o `IntersectionObserver` al 25 %). Le pone las fuentes (VP9 primero,
   después H.264) según el ancho al cargar (`(min-width: 834px)` → 1920; si no, 960), llama a `play()` y, cuando el video
   da su primer cuadro (`playing`), lo muestra sobre la imagen quieta en 167 ms. Fuera de la vista, se pausa solo; al
   volver, sigue si la persona no lo pausó. **Sin JS, la imagen quieta y nada más** (sin JS no hay pausa, así que no hay
   video: WCAG 2.2.2).
3. **El botón de pausa** (prototipo `.pausa`): 44 × 44, placa, radio 4, el icono en blanco; arriba a la derecha de la
   portada, a 16 px del borde (desde 834, dentro de la costura de arriba; bajo 834, sobre la franja). `aria-label`
   «Pausar el video» / «Seguir el video» (de A, pendiente de Clara), `aria-pressed`; apretado, fondo blanco e icono en
   lienzo. **Con movimiento reducido o `saveData`:** el video no arranca y el botón dice «Seguir el video»: si la persona
   lo aprieta, el video corre (lo pidió). Es el primer control de la portada en el orden de tabulación, antes del campo
   del chequeo.
4. **El velo, desde 834** (estudio: `.portada-v__pie`): un degradé en `#060606` que nace con el bloque de texto, no con la
   pantalla, así crece si el texto crece (el resultado del chequeo): **0 en el borde de arriba del bloque, 0,88 a los
   160 px, 0,88 hasta 48 px antes del borde de abajo y `#060606` entero en el borde**, que empalma con el lienzo de la
   sección siguiente. El texto empieza 16 px bajo el final de la rampa. **Arriba**, 48 px que funden el borde del video
   con el lienzo del encabezado (no es para el contraste: es la costura). **Bajo 834, sin velo:** el texto va sobre el
   lienzo.
5. **Encuadre:** `object-fit: cover; object-position: 50% 50%`. A 1440 × 900 la caja mide 1440 × 836: el video se escala a 1486 × 836 y
   recorta 23 px de cada lado.

**El contraste, medido sobre el video** (`herramientas/portada.mjs` + `contraste-portada.py`, `datos/portada-contraste.json`):
el velo pintado por el navegador, leído en píxeles sobre un blanco puro, compuesto con **los 121 cuadros** de
`hilo-1920.webm` (el primero es el póster), y por cada línea de texto **el píxel más claro bajo su caja en su peor
cuadro** (la cota estricta), en 11 tamaños de 360 × 800 a 1920 × 1080:

| Tamaño | Líneas sobre el video | Bajo el mínimo | La peor | Sin velo, la misma | Video sin velo | Botón del chequeo |
|---|---|---|---|---|---|---|
| 360 × 800 · 390 × 844 · 414 × 896 · 768 × 1024 | 0 (franja; el texto va en el lienzo) | 0 | gris 7,02:1 | | la franja entera (203 a 432 px) | a 52, 100, 180 y 139 px del borde de abajo |
| 834 × 1112 | 19 | 0 | 5,43:1 (rótulo, cuadro 120) | 1,21:1 | 534 px | a 105 px |
| 1024 × 768 | 15 | 0 | 5,38:1 (entradilla, cuadro 80) | 1,05:1 | 233 px | a 87 px |
| 1194 × 834 | 17 | 0 | **5,31:1** (rótulo «Chequeo gratis», gris, cuadro 72) | 1,05:1 | 224 px | a 107 px |
| 1280 × 800 | 18 | 0 | 5,32:1 | 1,03:1 | 190 px | a 107 px |
| **1440 × 900** | 17 | 0 | 5,34:1 (cuadro 65) | 1,11:1 | **288 px** | **a 108 px** (campo de 696 a 740, botón de 748 a 792) |
| 1920 × 1080 | 15 | 0 | 5,50:1 | 1,12:1 | 506 px | a 89 px |

El velo bajo el texto vale entre 0,876 y 1 (0,88 con el redondeo del navegador). **Sin velo**, la peor línea sobre el
video da de 1,03 a 1,21:1 según el tamaño: el velo no es adorno. El borde del campo (`#707070`) da de 3,23 a 3,29:1 contra su contorno compuesto
(1.4.11, mínimo 3). Capturas con los cuadros que dieron el peor caso: `e12/spec/img/portada-*.jpg`.
**Si cambia el archivo, el velo o el texto, se mide de nuevo** con las dos herramientas (corren en un minuto) y la tabla
se rehace aquí.

### 3.2 · La cinta: la primera sección después de la portada

- **Qué es:** el video de 16 s del prototipo, ocho tramos de 2 s con cortes secos (Combeau fotografía, Sesenta, Praxi,
  Tonela, Verifica y Cumple, Ocelo, Combeau modelo, Doceavo), 1280 × 720, mudo, en bucle, con su pausa; la ficha cambia
  con el tramo (`cinta.json`).
- **Se rehace antes de construir** (Diego, con `proto/a/herramientas/medios.py`): **el tramo «Combeau, modelo» del
  prototipo muestra su línea de medidas** entre los 12 y los 14 s (inventario §2.9). Los dos tramos de Combeau salen de
  `casos/combeau/medios/combeau-fotografia-cinta.*` y `combeau-modelo-cinta.*`; los otros seis, como estaban. VP9 y
  H.264, cada uno ≤ 1 MB. `proto/a/medios/cinta.*` **no se usa**.
- **Proporción resuelta: 16:9 exacta.** En la primera pantalla el prototipo la achicaba a 1,95:1 para que entraran la
  frase y el chequeo; como sección propia ya no hace falta: a 1440, 1054 × 593 (c1–c12). Bajo 834, a sangre y sin radio.
- **Arranca** como la portada (a la vista, sin movimiento reducido ni `saveData`), con su póster
  (`cinta-poster.webp`, rehecho con el primer cuadro nuevo), y se pausa fuera de la vista.

### 3.3 · Plan de media por slot

**Regla:** todo medio es una captura o una grabación real, o una pieza de concepto rotulada; la portada es la única
excepción (§0.3, punto 1). Cada medio espera en su placa con su radio y aparece en 167 ms al cargar (la carga como
diseño de A&P); ningún brillo que corre ni esqueleto animado. Imágenes en WebP, con `width` y `height`, `loading="lazy"`
salvo las de la primera pantalla, `decoding="async"`. **Los `alt` los escribe quien mira la imagen** (los de partida, en
`medios.json` de cada carpeta) y nunca nombran las medidas de Combeau.

| Slot | Qué va | Origen | Ratio | Tratamiento |
|---|---|---|---|---|
| Portada | El hilo de oro | Bruno, `e12/medios/hilo/` (generado: desvío autorizado) | 16:9 a sangre | §3.1 |
| Cinta | Ocho tramos | `proto/a/medios/` + `casos/combeau/medios/*-cinta.*` | 16:9 | §3.2 |
| Índice corto de la home | Combeau fotografía, Praxi, Verifica y Cumple, Sesenta | `casos/combeau/medios/combeau-fotografia-169.webp`; `proto/a/medios/praxi-45`, `verifica-y-cumple-45`, `sesenta-home-169` | 16:9 · 4:5 · 4:5 · 16:9 | Plano en su marco |
| Cada pieza, con su prueba | Combeau (su galería), Praxi (sus números, con «datos de ejemplo»), Verifica y Cumple (sus 12 cosas) | `proto/a/medios/` | como el prototipo | Plano |
| Quién está detrás · `/nosotros/` | El retrato de Ramón | `proto/a/medios/ramon-vallejos-34.webp` (de `public/assets/img/ramon-vallejos.jpg`) | 3:4 | Entero, sin recorte de cara |
| Muro de `/trabajo/` | Las diez portadas | `proto/a/medios/` (las de Combeau, de `casos/combeau/medios/`, con `combeau-modelo-45` cortado sobre la línea de medidas) | 4:5 · 4:3 · 5:3 | Los conceptos, con su «CONCEPTO» horneado en la esquina |
| Caso Praxi | Hero, reel, capturas de las páginas públicas, marca, carrusel, portada de Facebook, avatares | `e12/praxi/capturas/`, `e12/praxi/material/`, recortes de `proto/a/medios/praxi-*` | las cuatro formas de §2.3 | Pie de personas generadas en cada medio con personas; «datos de ejemplo» en cada uno con cifras; el hueco de las pantallas internas, **placeholder dirigido**: marco punteado `--a-hueco` del tamaño de una fila 16:9, con el texto de Clara que dice qué falta (Inicio, Coach, Registro, Progreso a 390, desde una cuenta de prueba) |
| Caso Combeau | Recorridos, portadas, panel, foto servida | `casos/combeau/medios/` (y nada de `inventario/grabaciones/`, que trae sus medidas) | ídem | Pie con fecha y método en las capturas del panel |
| Casos de concepto | Recorrido, placas, portadas, identidad | `marketing/portafolio/0N-*/` (Bruno) | ídem | Tal cual; solo se escalan y se pasan a WebP |
| Franjas de interiores | §2.4 | Combeau fotografía, el chequeo, Verifica y Cumple | 2,39:1 desde 834 · 16:9 bajo 834 | Recortadas al centro; nunca un campo (§3.4) |
| Imágenes al compartir | Simón, `senales-obra.md` §1.6 | HTML renderizado en la letra y el negro de A | 1200 × 630 | Ninguna con el hilo de oro |

**Faltan, y quedan nombrados sin rellenar:** las pantallas internas de Praxi (5a); las fotos y clips de la pauta de los
conceptos (9 fotos y 2 clips, `plan-e12.md` §11: «cuando tenga plata vamos con lo faltante»); el panel de Combeau en
producción por dentro.

### 3.4 · Techos de campo por tipo de página (cierra el defecto 22)

Un **campo** es un medio cuyo color dominante cubre el 30 % o más de su marco y es claro o de color (lock §20.1; la regla
exacta está en `herramientas/campo-medios.py`, copiada de `proto/a/herramientas/campos.py`). Se cuenta en la página
completa a 1440, como hace `campos.py`. **Ningún campo en la interfaz, en ninguna página.**

| Tipo de página | Techo (área de campos sobre el área de la página, a 1440) | Dónde puede haber campos | De dónde sale |
|---|---|---|---|
| **Caso** (real o concepto) | **Del 10 al 35 %**; seguidos, a lo más 4 | En las filas de medios | Lock §20.3 (Koto: 2,9 a 35,4 %, mediana 23). **Bajo el piso solo si el material real no da más, dicho en la spec:** Praxi (6,0 % medido en A), marca oscura de un solo acento que no se recolorea (lock §20.2, regla 3). Combeau se mide al construir y, si queda bajo 10 %, se declara aquí con su cifra |
| **Índice** (`/trabajo/`) | **≤ 35 %** | Solo las portadas | Koto `/work`: 20 % de color, todo en portadas. A medido: 27,0 % |
| **Home** | **≤ 20 %**, contando la cinta en su tramo más claro; seguidos, a lo más 2 | Solo en la cinta, el índice corto y «Cada pieza, con su prueba»; **la portada, servicios, quién y contacto, sin campos** | Koto `/work` (20 %): la home no juega más que el índice. A medido con la cinta en la primera pantalla: 16,6 %; la portada (no es campo: dominante `#080808`) solo lo baja. Desvío del lock §20.2, regla 4 (§0.3, punto 7) |
| **Interiores** (servicios y sus seis, método, nosotros, diagnóstico, contacto, blog y artículos) | **≤ 5 %**, y **la franja nunca es un campo** | Solo en las portadas de una sección de piezas (las tres de «Sitios que construimos») | Koto: interiores de 0 a 0,9 % de campo claro y 0 de color; su home, 4,8 %. **La vista 5 del prototipo daba 13,3 %** (la franja de Doceavo, campo claro `#D8E8D8` en el 52 % del marco, más dos portadas): Doceavo sale de la franja y entra **Combeau fotografía**, que no es campo (dominante `#080808`, 18 % del marco a 2,39:1, `datos/campo-medios.json`). Con las tres portadas (Praxi y Sesenta son campo), Desarrollo web queda en unos 3,5 % (estimado con las cajas del prototipo: 2 × 346 × 433 sobre 1440 × 5911; se mide al construir) |

**Antes de poner un medio en una franja**, se corre `campo-medios.py` sobre él: en `datos/campo-medios.json` están los 59
medios de A, de Combeau y el póster de la portada. Las franjas de §2.4 salen de ahí (el chequeo, Verifica y Cumple y Combeau fotografía: los tres
sin campo a 2,39:1).

### 3.5 · Video: formatos y reglas para todos

1. **Cada `<video>` lleva dos fuentes**, el mismo contenido: VP9/WebM primero y **H.264/MP4 después, para Safari**
   (High, `yuv420p`, `faststart`, sin pista de audio). El prototipo llevaba solo VP9 en los casos; **el H.264 ya existe
   para todos, con `faststart` y sin audio** (comprobado el 19-oct con `ffprobe` y el orden de `moov` y `mdat`): los
   recorridos de los conceptos (`marketing/portafolio/0N-*/movimiento/recorrido.mp4`, 1440 × 810), los de Praxi
   (`e12/praxi/material/*.mp4`), los de Combeau (`e12/casos/combeau/medios/*.mp4`) y la portada (`e12/medios/hilo/`).
   La cinta rehecha sale con los dos.
2. **Mudo, en bucle, sin controles nativos, `playsinline`, `preload="none"`**, con póster WebP del primer cuadro. Arranca
   solo a la vista y sin movimiento reducido ni `saveData`; se pausa fuera de la vista.
3. **Todo video que se mueve solo más de 5 s lleva su botón de pausa** (WCAG 2.2.2), enfocable, que dice su estado.
4. **Ningún video con audio. Ningún video del trabajo a sangre desde 834** (solo la portada).
5. Techos de peso: la portada, 1,4 MB (el H.264 de Bruno, el más pesado que baja un visitante); la cinta, 1 MB por
   formato; cada video de un caso, 1,5 MB en VP9 y 2,2 MB en H.264 (el más pesado que hay, el recorrido de Sesenta, pesa
   0,97 y 2,12 MB).

---

## 4 · Estados, interacción y cortes

### 4.1 · Estados

| Elemento | Reposo | Al pasar el mouse | Foco | Apretado | Deshabilitado o esperando |
|---|---|---|---|---|---|
| **Botón claro** (mono 11 MAYÚSCULAS, 44 px de alto, radio 4) | blanco, texto lienzo | fondo gris (7,02:1) | contorno blanco 2 px a 3 px | `#D0D0D0` | «Revisando…» en el del chequeo: fondo `--a-placa-activa`, texto gris, `cursor: progress` |
| **Botón de placa** | placa, texto blanco | placa activa | ídem | `#2A2A2A` | |
| **Enlace del cuerpo** | blanco, subrayado de 1 px al 45 % a 3 px | subrayado al 100 % (167 ms) | ídem | | |
| **Menú** | blanco al 70 % | 100 % (167 ms) | ídem | | La página actual, blanco con `aria-current` |
| **Corchete** («[ Todo el trabajo ] (10)») | gris | blanco | ídem | | |
| **Campo** (chequeo, contacto) | placa, borde `#707070`, texto 16 px (sin zoom en iOS), placeholder gris, 44 px de alto (también en contacto) | borde gris | borde gris + contorno blanco 2 px a 3 px | | |
| **Error de un campo** | | | | | El mensaje en `role="alert"`, en blanco bajo el campo (`#chq-error`, `.form-status`); sin rojo |
| **Filtro del índice** | gris | blanco | contorno | blanco con el punto de 3 px, `aria-pressed="true"` | |
| **Pieza del índice** | entera | se acorta 24 px (resorte **estado**) y las demás bajo el velo; aparece el círculo | contorno a 3 px con radio 6 y, dentro, el texto del círculo quieto en un rótulo de placa | | |
| **Pausa** | placa, icono blanco | placa activa | contorno | blanco, icono en lienzo | |
| **Índice de secciones** | gris | blanco | contorno | la activa: blanco + punto de 3 px | |
| **Barra del caso bajo 1194** | cerrada: nombre y sección activa | | contorno | abierta: la lista | |
| **Encabezado** | sobre el lienzo | | | plegado en la placa al bajar (desde 834) | |

### 4.2 · El cursor (lock §8, con el color de la pregunta 9)

- **Solo con `(hover: hover) and (pointer: fine)` y sin movimiento reducido.** En táctil y con movimiento reducido no
  existe, y lo que el hover revela está siempre a la vista.
- **Dónde:** solo sobre las piezas enlazadas del índice, del índice corto de la home y de «Sitios que construimos», y
  sobre el medio principal de un caso que enlaza. Nunca sobre enlaces de texto, botones, campos, la portada ni la cinta.
- **Forma:** círculo de 88 px, **blanco**, texto en lienzo en mono 11 MAYÚSCULAS (hasta dos líneas), anillo de 1 px en
  lienzo; `aria-hidden`, `pointer-events: none`. **Dice adónde lleva:** «Ver el caso», «Ver el concepto» (Clara); en
  Verifica y Cumple, el texto que escriba Clara (§0.5).
- **Sigue** con el resorte **cursor**; entra y sale con **estado**; **sin magnetismo**. El puntero del sistema se oculta
  solo sobre la pieza.
- **Teclado:** el círculo se esconde con el primer Tab y vuelve con el primer movimiento real del mouse (no con el aviso
  que da el navegador al desplazarse bajo un mouse quieto: regla del lock §19, 16-oct).

### 4.3 · Accesibilidad que la composición tiene que dejar posible

- **Foco visible en todo**, contorno blanco de 2 px a 3 px; nunca tapado: en las barras pegajosas, el foco que queda bajo
  el encabezado plegado o bajo la barra del caso se corrige con `scroll-margin-top: 88px` en los destinos y
  `scroll-padding-bottom` del alto de la barra bajo 1194; se mide con Tab hacia adelante y hacia atrás (la regla de la
  pila pegajosa del §7, 5-oct, sigue valiendo para cualquier cosa pegajosa).
- **Área de toque de 44 × 44** bajo 834 y con cualquier puntero grueso, en alto y en ancho, también el logo y los
  correos sueltos (prototipo, defecto 11; se mide con `e12/qa-paso-2/vuelta-1/herramientas/area-toque-390.js`).
- **Nada que se entienda solo con hover;** contraste AA en todo texto (§1.1, §3.1); piso de 11 px; `alt` que describe la
  pieza mirándola; los videos `aria-hidden` con su pausa nombrada.
- **El aviso de cookies** (del `Layout`): A lo viste desde `archivo.css` como lo hizo driftime (`html body.a-body
  #cookie-banner …`: placa, borde `--a-linea-seccion`, texto gris en Google Sans Flex 14, enlace blanco subrayado,
  botones del sistema), **sin tocar su HTML ni sus ids** (`cookie-accept`, `cookie-reject`). Nada importante queda
  tapado por él en la primera pantalla: se mide con el aviso abierto.

### 4.4 · Breakpoints

| Ancho | Columnas | Qué cambia | Por qué ahí |
|---|---|---|---|
| **360 a 833** | 8 | Encabezado de dos filas (90 px); portada en franja 16:9 y texto debajo; todo en una columna; caso con medio 4:5 a sangre y barra flotante; muro a una columna | Koto, corte de 834. **El chequeo entra en la pantalla a 360 × 800** (botón a 52 px del borde de abajo) y a 390 × 844 (a 100). A 375 × 667 no entra (89 px bajo el borde): fuera de los anchos de la obra, queda dicho |
| **768** | 8 | Igual que 360, más ancho: la franja mide 768 × 432; el muro a una columna | Tableta vertical: botón a 139 px del borde |
| **834 a 1193** | 12 | Encabezado de una fila (64), `sticky`, que se pliega; portada a pantalla con el texto sobre el velo (frase c1–c7, chequeo c8–c12); muro a dos columnas; caso todavía apilado con la barra flotante | Koto, corte de 834 |
| **1024** | 12 | Nada nuevo: es un ancho de 834 a 1193. **Ya no es un corte** (cerrado en §1.4) | Medido en Koto: su barra aparece en 1194 |
| **1194 en adelante** | 16 | Barras laterales de 320 (caso, índice, artículo, blog); portada con frase c1–c12 y chequeo c13–c16 (campo y botón uno sobre otro); cruz de registro; secciones de interior con el `h2` pegajoso a la izquierda | Koto, corte de 1194 |
| **1440** | 16 | El de referencia de todas las medidas | |
| **1920** | 16 | Sin ancho máximo: la retícula crece; la caja del cuerpo sigue en 493 | Koto no tiene ancho máximo |

**Medido en cada ancho, en la corrida 2:** desborde horizontal 0 (también con `overflow-x: clip` quitado); un `h1`;
contraste; foco; el chequeo dentro de la pantalla a 1440 × 900, 390 × 844 y 360 × 800.

---

## 5 · Construcción

### 5.1 · Motion, fijo en 13.5.0

`npm install --save-exact motion@13.5.0` en `spindlelab-astro/`: en `package.json`, `"motion": "13.5.0"` **sin `^` ni
`~`**; en `package-lock.json`, `version: 13.5.0` con integridad
`sha512-W/Vj6RDg9f9yJoaS+ohRYtl1j3Rb86fOCCjzn3M3M10Dg7ap3M7sMUeQs9wTsLQwHHmhioYsJLRRRTXxvhtHDA==` (leída del registro de
npm el 19-oct). Se importa solo lo que se usa (`animate`, `spring`, `inView`) en los `<script>` de los componentes de
A, y Vite lo empaqueta. Si el registro no responde en la corrida 2, el archivo de `proto/a/vendor/motion-13.5.0.js`
(sha256 `0d94331cbb351e9ae46f98448ecade03b646bd9872eecfccb08396eff0ed3897`) a `public/v3/vendor/`, y se dice. **La 14 no
se evalúa en esta obra.**

### 5.2 · Lenis no corre en A, sin tocar `Layout.astro`

**Que no *cargue* no se puede sin tocar el `Layout`** (es un módulo que Astro empaqueta en toda página que lo usa): es
la pregunta abierta de §0.5. **Que no *actúe*, sí**, con la API del propio Lenis 1.3.26 (el de `node_modules`), medido
(`herramientas/lenis-prevent.mjs` → `datos/lenis-prevent.json`, la configuración y el manejo de anclas copiados del
`Layout`):

| Caso | Una muesca de rueda (100 px) llega al 90 % | Ancla `href="#x"` | Ancla `href="/ruta/#x"` |
|---|---|---|---|
| Lenis como está en el `Layout` | 394 ms (suavizado) | Suavizada, **sin cambiar el `#` de la URL** | Salto inmediato, con `#x` |
| **Lenis con `data-lenis-prevent` en el contenedor de la página** | **54 ms** (nativo) | Suavizada, sin `#` | **Salto inmediato, con `#x`** |
| Sin Lenis (referencia) | 25 ms | | |

**La regla para Diego:**

1. El contenedor de toda la página de A (el elemento que envuelve encabezado, `main` y pie en el componente base de A)
   lleva **`data-lenis-prevent`**: Lenis deja pasar la rueda (`lenis.mjs:609`) y el scroll es el nativo.
2. **Todo enlace interno a un `id` se escribe con su ruta** (`/v3/trabajo/praxi/#solucion`, `/v3/contacto/#contacto-form`,
   también el de saltar al contenido), **nunca `#x` suelto**: el `Layout` intercepta `a[href^="#"]`, lo lleva con Lenis y
   no cambia el `#`, y así el foco del teclado no salta al destino.
3. **No se agrega** ningún otro arreglo (ni detener eventos, ni tapar `matchMedia`). Lo que queda de Lenis: baja con el
   resto de los scripts del `Layout` y corre su bucle por cuadro; la clase `lenis` en `html` deja `scroll-behavior:
   auto`, que es lo que A quiere. Si Ramón aprueba la prop de §0.5, el `Layout` deja de crearlo en A y estas dos reglas
   quedan como resguardo.
4. Se mide en la corrida 2 sobre el build: una muesca de rueda en tres páginas de A llega al 90 % en menos de 100 ms, y
   cero `a[href^="#"]` en el HTML de A.

### 5.3 · Los tokens nuevos junto a `tailwind.config.mjs`, sin cambiar producción

1. **Las reglas de A van en CSS propio, `src/styles/archivo.css`**, importado solo por los componentes y páginas de A
   (como `driftime.css` hoy): tokens de §1 como propiedades en `body.a-body` (con prefijo `--a-`), `@font-face` de §1.2
   y las clases del prototipo. Las páginas de A pasan `bodyClass="a-body"` al `Layout` (la prop ya existe).
2. **`tailwind.config.mjs` no se toca** (diff 0): A no necesita utilidades de Tailwind (el prototipo no usa ninguna) y
   así ninguna clase de producción cambia de valor. Tailwind sigue en el stack (su base ya está en `global.css`).
3. **Lo que `global.css` le pone a toda página y A sobrescribe** desde `archivo.css`, con más especificidad y solo en
   `body.a-body`: la familia y el color de `html, body` (Inter, `--fg`), el fondo de `body` (`--bg`). `html` lleva el
   lienzo por `html:has(body.a-body)` para que el rebote del scroll no muestre otro negro.
4. **Si algún día A usa utilidades de Tailwind**, se agregan **solo** bajo una clave nueva (`theme.extend.colors.archivo`,
   que apunte a las propiedades `--a-*`), nunca cambiando una clave existente (`bg`, `fg`, `noche`, `gold`…), y se
   comprueba que `/` y `/nosotros/` (producción, construidos con Astro) salen **iguales píxel a píxel** a 1440 y 390 antes
   y después, y con el mismo HTML.
5. Las páginas v3 de driftime que A reemplaza dejan de importar `driftime.css`; el archivo se queda hasta que nada lo
   importe (registro de la spec anterior).

### 5.4 · El logo: El huso

- **Los archivos son el dibujo final de Bruno, en `e12/logo/final/`** (commit `688eac6`, en avance al escribir esto: falta
  su README). Tres cortes por tamaño, y cuál va dónde lo dice `construccion-final.json` (`cortes.*.usar`): **grande**
  desde 40 px de alto, **menú** de 18 a 39 px y **pequeño** de 12 a 17. Diego usa estos, no los provisorios del prototipo
  (`camino-2-el-huso/`). Monocromo: **blanco sobre el negro y nada más**. El SVG va en línea, con su `fill` cambiado a
  `currentColor`, `role="img"` y `aria-label="SpindleLab"`.
- **Encabezado:** `logo-menu-blanco.svg`, a **24 px de alto desde 834 y 20 bajo 834**, en el margen de 16, con área de
  toque de 44 de alto. **Pie:** el mismo corte menú, a 20 px. El sitio no usa los cortes grande ni pequeño (son para
  documentos, avatar e imágenes al compartir).
- **Favicon:** `favicon.svg` (el huso solo), con `favicon.ico` y los PNG de 16, 32 y 48; `apple-touch-icon.png`;
  `icon-192.png` e `icon-512.png`, este último como `logo` de `#org` (Simón). Todos en blanco sobre `#060606`.
- **El giro de la tortera no entra en el sitio.** Bruno lo dibujó para el corte grande (`final/movimiento/`); el sitio
  usa el corte menú, a 24 px, donde la tortera mide unos 8 × 5 px y el giro no se ve, y sería un cuarto tipo de
  movimiento fuera de las tres familias de §1.6. Si Ramón lo quiere en otra parte, se especifica aparte.
- **El favicon y el `logo` de `#org` dependen del `Layout`** (§0.5): mientras no se resuelva, en `/v3/` se ve el favicon
  de antes.

### 5.5 · Telemetría y sandboxes (lock §11 y §12)

Solo lo verdadero, en mono: la hora de Santiago con su huso, calculada en el navegador (`Intl.DateTimeFormat`,
`America/Santiago`), en gris; el conteo del índice entre paréntesis; la ficha de cada caso; el resultado del chequeo del
visitante con su hora, en blanco. **Un sandbox a la vista por página:** el chequeo (home y diagnóstico). Ningún
«LAB_STATUS», coordenada, contador o fecha de despliegue escrita a mano.

### 5.6 · Señales

Las fija Simón en **`e12/senales-obra.md`** (title, description, canonical, Open Graph y JSON-LD de las 27 rutas, y cómo
se comprueban): esta spec no las repite. Lo que toca a lo visual: el JSON-LD va por el slot `head` (el `Layout` no tiene
prop `jsonLd`, regla del 5-oct del §7); la `BreadcrumbList` dice lo mismo que la miga; las imágenes al compartir se
hacen en la letra y el negro de A, sin el hilo de oro (Simón §1.6); y los `id` `#fotografia` y `#modelo` existen en la
página de Combeau.

---

## 6 · Lo que esta spec prohíbe

**Los dos detectores corren completos en la QA** (`.claude/skills/estudio-web/antislop-web.md` y
`refero-design/references/anti-ai-slop.md`), y además:

1. **Otro color de interfaz.** Ni oro, ni cobalto, ni un color por servicio, ruta o estado; ningún bloque de interfaz
   pinta un fondo claro o de color más grande que un control. El lienzo no cambia nunca.
2. **Una interior con el lienzo claro**, o la hoja blanca de B (pregunta 8).
3. **Tomar rasgos de B** (Mona Sans, la escala grande, la tabla con visor, el banco de datos): brief §6.11.
4. **Negrita, mayúsculas fuera de la mono, una tercera letra, texto bajo 11 px.**
5. **Tarjetas:** cajas con borde, sombra o fondo de placa que agrupan contenido. Las líneas son bordes superiores.
6. **Texto de la interfaz sobre un medio del trabajo** (salvo los rótulos de placa en la esquina). Sobre la portada,
   solo con el velo de §3.1 y medido.
7. **Otra imagen o video generado**, cualquier generación pagada (Higgsfield, Gemini, OpenAI), imágenes de banco o del
   pool de driftime (`assets/img/d/`, `hero-*.jpg`, `estrategia-mesa`, `equipo-creativo`).
8. **El hilo de oro en un marco de trabajo, en el índice, en un caso o en una imagen al compartir.**
9. **Cifras, logos, testimonios o puntajes sin fila**: ni 54 → 94, ni 36 → 73, ni 40 %, ni +150 %, ni conteos de
   clientes. Precios distintos a `oferta-v3.json` y `servicios-v3.json`, comparados como texto.
10. **Combeau:** su edad, estatura, pelo, ojos, contacto o ficha de contratación en cualquier medio o `alt`; los medios de
    `e12/inventario/grabaciones/` o el `cinta.*` del prototipo.
11. **Praxi:** enlace a praxi.coach; «en pausa» o «fuera de línea»; `offers` o `url` en su JSON-LD; las fotos de su
    landing sueltas; un nombre de modelo sin lo que hace; una persona generada sin su pie.
12. **Conceptos:** sin «CONCEPTO» a la vista sin scroll; una cifra de resultado; un testimonio; una persona no dicha como
    ficticia.
13. **«IA propietaria», «modelos RAG», «despliegue de modelos»**, telemetría decorativa, corchetes que no rodeen un enlace
    a un índice, más de un corchete por página.
14. **Movimiento fuera de §1.6:** rebote, animación por línea, nada atado a la posición del scroll, entradas en texto de
    lectura, un video que arranque con movimiento reducido o sin pausa, Lenis actuando (§5.2), el giro del logo.
15. **El cursor** en táctil, con movimiento reducido, sobre texto o controles, con magnetismo o de color.
16. **Tocar** `Layout.astro`, `global.css`, `tailwind.config.mjs`, las URLs publicadas, `.contact-form`, `#f-utm-*`,
    `.form-status`, `.form-success`, los `chq-*`, `v3-chequeo.js`, `functions/api/chequeo.js`, `/privacidad/` o
    `spindlelab-site/`; sacar algo de `/v3/` o del `noindex`; publicar.
17. **Escribir un enlace interno como `#x` suelto** (§5.2) o comentar una plantilla Astro con `<!-- -->` (regla del 13-oct).
18. **Resolver en el chat un caso que esta spec no cubre:** se pregunta y se escribe en §7.

**Y lo que el brief §6 no hace en esta obra, entero:** Next.js (se sigue en Astro + Tailwind + Motion); cifras
inventadas; logos, marcas o nombres de clientes sin permiso, y **ningún prospecto nombrado**; tocar precios, planes o
nombres de servicio; publicar, reencender Ads o sacar algo de `/v3/` y del `noindex`; «IA propietaria», «modelos RAG» o
«despliegue de modelos» como hecho; cambiar URLs publicadas o tocar `Layout.astro`, `.contact-form`, `#f-utm-*`,
`chq-*`, `/privacidad/` o `spindlelab-site/`; **retomar E10 o E11** (ni la ciruela, el resaltador, Instrument Sans o
Plex de E10, ni los campos de color por servicio de driftime); **editar documentos compartidos** (estrategia, manual,
fichas, pipeline, plan, outbound: los decide la troncal); construir B o tomarle rasgos; otra imagen o video generado y
cualquier generación pagada; y en Praxi, enlazar a praxi.coach, contar que está en pausa o usar sueltas las fotos de
su landing.

## 7 · Historial de correcciones
| Fecha | Qué | Regla o preferencia | Quién |
|---|---|---|---|
| 5-oct | Mayúsculas solo en el display | **regla** (manual §05) | Ramón |
| 5-oct | Precios siempre «desde … + IVA» | **regla** | encuadre (se publicaban sin IVA en el tablero) |
| 5-oct | Etiquetas de pieza arriba, no abajo | **regla** | QA del tablero (el aviso de cookies las tapaba) |
| 5-oct | Wordmark del pie con `cqi`, no `vw` | **regla** | QA del tablero (se cortaba) |
| 5-oct | Sin Gabarito/Inter: la escasez se logra en Manrope | **regla** | corrección propia (revertía la aprobación del 29-sep) |
| 5-oct | Mockups sobre fondo de color de estudio, no sobre las fotos del pool | **preferencia** (la foto no lo permite: notebooks cerrados) | Diego, al componerlos |
| 5-oct | `hilos.jpg` sin la línea de oro (recorte) | **regla** (un oro por vista) | Diego, al construir Visibilidad en IA |
| 5-oct | El JSON-LD de una página va en `slot="head"`; el Layout **no tiene** prop `jsonLd` (Astro la ignora sin error y el grafo se pierde) | **regla** | Diego, en Trabajo |
| 5-oct | Una pieza cuya captura trae el aviso de concepto horneado se muestra en su mockup, no en la captura plana (el rótulo de `Pieza` tapaba el aviso) | preferencia | Diego, en Trabajo |
| 5-oct | Línea de precio en flujo de texto, no flex: «+ IVA» pegado a la última cifra, nunca huérfano; rótulos sin opacidad (a 0,72 medían 3,05:1 sobre brasa) | **regla** | verificar.mjs, índice de servicios |
| 5-oct | Wordmark gigante con margen inferior `0,16 em + 16 px`: la «p» baja 0,15 em bajo su caja y pisaba la línea legal | **regla** (medido) | cinco constructores por separado |
| 5-oct | Línea legal del pie en `--gris`, no `--gris-2` (4,12:1 a 13 px) | **regla** | verificar.mjs |
| 5-oct | `.d-sec--quieta` para secciones cortas: la etiqueta no se pega | componente | Diego, en el blog |
| 5-oct | `.d-fase` en una columna en celular (la de 56 px dejaba el texto en ~270 px) | **regla** | Diego, en Método |
| 5-oct | El resultado del chequeo se adapta al sistema en `chequeo-v3.css` (antes salía con el botón principal invisible) | **regla** | Diego, en Diagnóstico, con respuesta simulada |
| 5-oct | `oro1 = 1` es lo esperado en toda página (el punto del módulo); 2 o más es defecto | aclaración de medición | tres constructores |
| 5-oct | Componente «banda del índice» (§3): alto variable, filete `currentColor` al 32 %, pegajosa solo ≥ 768 × 680 | componente | QA del índice de servicios (estaba construido y sin declarar) |
| 5-oct | Línea de precio: cada alternativa con su plan va en `white-space: nowrap` (a 390 cortaba «… con Visibilidad» / «IA + IVA»), y las piezas llevan espacios reales con el separador `aria-hidden` (sin CSS se leía «Desde$390.000…+ IVA») | **regla** | QA del índice de servicios |
| 5-oct | Un botón «chequeo» lleva a `/v3/diagnostico/` y su texto describe el chequeo automático (tu sitio, en segundos); la competencia es del diagnóstico completo, no del chequeo | **regla** | QA del índice de servicios (bloqueante) |
| 5-oct | Índice del blog (desvío de §4): la fila del artículo más reciente se abre con una imagen del pool + bajada + botón 36 px (la fila de Novedades de driftime, lock §5); las demás, fecha · título · flecha. En celular la imagen va **después** del texto: delante sacaba el primer título del primer pantallazo | preferencia | Diego, en el blog (QA: estaba construido y sin declarar) |
| 5-oct | Medida del cuerpo del artículo con tope en **em, no en ch**: `ch` es el ancho del cero y en Manrope `68ch` daban ~87 caracteres reales (el tope nunca actuaba). Medido con Range carácter por carácter: `28.5em` en p, li y blockquote (máx. 66–67 en las 5 rutas, a 1280 y 1440) y `31em` en la nota de 16 px | **regla** (manual §05, medido) | QA del artículo (bloqueante) |
| 5-oct | El artículo cierra con un paso de conversión antes de «Siguiente artículo»: el cierre del índice del blog, mismas palabras y mismo componente. Faltaba en §4: era un defecto de la spec, no del constructor | **regla** | QA del artículo |
| 5-oct | Miga del artículo: `Inicio · Blog · <nombre corto>`. La publicada decía «Inicio › Chequeo gratis › El Taller › …»: se saca «Chequeo gratis» (no es un padre del post) y «El Taller» pasa a «Blog», como el menú, el índice y su BreadcrumbList. El BreadcrumbList del post dice lo mismo que la miga visible | **regla** (antislop C8) | QA del artículo (estaba construido y sin declarar) |
| 5-oct | Cabecera del artículo con autor (avatar 44 + nombre + rol, del post publicado), entre la línea de fecha y la imagen | preferencia | QA del artículo (estaba construido y sin declarar) |
| 5-oct | Una página no repite en su JSON-LD los nodos que ya emite el Layout (`#org`, `#autor-ramon`): se filtran al serializar, sin tocar Layout. Las referencias por @id siguen apuntando a los nodos completos | **regla** | QA del artículo (la referencia, desarrollo-web, ya lo hacía) |
| 5-oct | Diagnóstico (desvío de §4, Herramienta): entre el instrumento y las secciones va la imagen a sangre (`d/hilo.jpg`) + `.d-entrada` de la plantilla Servicio (nota «21 chequeos, 100 puntos» + guía + `Pedir el diagnóstico` 36 px `--alt`). Por qué: la entrada lleva el primer «Pedirlo» de la página (brief §3), que antes aparecía recién a 4,3 pantallas en 1440 y a 5,4 en 390; ahora está a 1,5 y 1,1 (medido). Si se acepta, la fila Herramienta de §4 se actualiza (decide la dueña de la spec, no el constructor) | preferencia, **pendiente de aceptar** | Diego, en Diagnóstico (QA: estaba construido y sin declarar) |
| 5-oct | Diagnóstico: h2 «Lo que este chequeo no mide.» con sus dos h3 («Y cómo medimos si la IA te nombra.», «Lo que muestran las corridas.»). No está en paginas-v3.json: viene tal cual de la página publicada (`public/diagnostico/index.html`). Va sin su guía, porque la FAQ «¿Qué mide exactamente el puntaje?» dice lo mismo. La sección «Tu dominio y tus datos.» se quitó: repetía la nota del instrumento, y sus dos preguntas volvieron a la FAQ | preferencia | QA de Diagnóstico (antislop A10, regla del 30 %) |
| 5-oct | Diagnóstico: `.d-siguiente` se usa como cierre de conversión (rótulo «Una página, gratis, en 24 horas.» + «Pedir el diagnóstico →» a contacto), no como «siguiente página»: una herramienta no tiene siguiente natural, y el artículo cierra con un paso de conversión por regla | preferencia | Diego, en Diagnóstico (QA: estaba construido y sin declarar) |
| 5-oct | Diagnóstico, celular: `.d-cab-diag` con `padding-top: 124px` en vez del `min(34vh, 300px)` de `.d-cab`. Medido a 375 × 667 con el aviso de cookies abierto: con el valor de `.d-cab` el botón del chequeo termina en y=528 y el aviso empieza en 537 (9 px, y la nota bajo el campo queda tapada); con 124 px termina en 425 | preferencia (medido) | Diego, en Diagnóstico (QA: estaba construido y sin declarar) |
| 5-oct | Una página que carga el chequeo no redefine las reglas del resultado (variables, `.chq-ramas a`, `.chq-r1`, `.chq-r2`, `.chq-error-codigo`): su único dueño es el bloque «EN EL SISTEMA DRIFTIME» de `chequeo-v3.css`. La página solo ubica el resultado (márgenes) | aclaración (antislop C2) | QA de Diagnóstico (había dos fuentes de verdad) |
| 5-oct | Diagnóstico: cuatro textos van escritos en la página y no leídos del JSON, hasta que Clara/Simón corrijan `paginas-v3.json`: la línea bajo el h1 (nombraba a Gemini, que `functions/api/chequeo.js` no prueba en vivo, y omitía a Claude), la guía de la entrada (sin «Cada vez más…», A2), el rótulo de «Los 21 chequeos» (sin «ninguna herramienta del rubro…», más amplio que su respaldo) y el rótulo del cierre (sin pregunta ni «sin compromiso»). Los botones dicen «Pedir el diagnóstico», sin «completo», porque contacto lo ofrece como «mini-diagnóstico» | preferencia, **transitoria** | QA de Diagnóstico |
| 5-oct | Contacto: `.d-cab--ct` con `padding-top: 140px` (112 en celular) en vez del `min(34vh, 300px)` de `.d-cab`, para que el formulario entero quede sobre el pliegue. Medido a 1440 × 900 con el aviso de cookies abierto: botón en y 748–784, aviso en 823 (con `.d-cab` el botón bajaría a ~908, bajo el aviso y bajo el pliegue). A 390 × 844: «Sitio web» en y 614–662, aviso en 714. Por eso contacto y diagnóstico arrancan a alturas distintas en escritorio: el instrumento del chequeo cabe con la `.d-cab` normal y el formulario no | preferencia (medido) | QA de Contacto (estaba construido y sin declarar) |
| 5-oct | Componente **campo de formulario** (§3), hoy solo en contacto: relleno `--modulo`, borde papel al **32 %** (3,24:1 contra el lienzo, WCAG 1.4.11; al 30 % medía 2,99:1 y el filete al 12 % ~1,3:1), radio 6, 48 px de alto, texto 16 px (iOS no hace zoom al enfocar), etiqueta visible arriba en papel 15 px 500; hover al 50 %, foco con borde papel más el contorno de 2 px del sistema. Es el único uso de `--modulo` con borde | componente | QA de Contacto (estaba construido y sin declarar) |
| 5-oct | La caja de éxito del formulario (`.d-ct-listo`, reemplaza al formulario cuando el envío sale bien) va sobre `--modulo` con radio 6: entra en el rol «notas» de §1, nunca como fondo de sección | componente | QA de Contacto (estaba construido y sin declarar) |
| 5-oct | Contacto sin imagen a sangre, como dice la plantilla Herramienta (§4). La `ventana.jpg` que iba entre el formulario y los pasos se sacó: ya está en cuatro páginas y separaba el formulario de su respaldo con casi una pantalla de atmósfera. Los pasos van pegados al formulario. Si dirección de arte quiere imagen aquí, la candidata es el retrato de Ramón (la cara de quien responde), sin afirmaciones nuevas | preferencia | QA de Contacto |
| 5-oct | Dentro de contacto, todo llamado a contacto (módulo, menú, pie) lleva a `#contacto-form` y no recarga la página (recargar volvía arriba y podía borrar lo escrito). Hoy lo hace un script de la página; está propuesto que lo hagan `NavV3` y `FooterV3` comparando `Astro.url.pathname` | **regla** | QA de Contacto |
| 5-oct | Contacto: seis textos van escritos en la página y no leídos de `paginas-v3.json` hasta que Clara lo corrija: h2 «Pide tu mini-diagnóstico» (era «Cuéntanos de tu proyecto»: no se pide un proyecto), h2 «Qué pasa después» (era «Tres pasos, cero fricción», jerga startup, manual §01), «O escríbenos directo a» (era «¿Prefieres ir directo?», A5), botón «Pedir mi mini-diagnóstico →» (era «Enviar →», A5), la respuesta del NDA y (6-oct, QA2) la **línea bajo el h1**: «Escríbenos con la dirección de tu sitio y recibes el mini-diagnóstico, gratis.» (el `lead` del JSON es otro texto, más largo; sin «sin compromiso», frase de folleto que la pregunta 1 ya responde; propuesta: campo propio `linea` en `contacto`). Esta última es **regla**: el JSON decía «estamos acostumbrados a trabajar bajo NDA», experiencia que nada en el repo respalda; va la versión visible de la página publicada («trabajamos bajo NDA cuando el cliente lo requiere»), en pantalla y en el FAQPage | preferencia, **transitoria** (NDA: regla, cero prueba social inventada) | QA de Contacto (bloqueante el NDA) |
| 5-oct | Contacto, atribución (brief §6): si ni la URL de contacto ni la sesión traen UTM, la página los toma de la página anterior del mismo sitio (`document.referrer`) antes de que corra `v3-contacto.js`, que los vuelca en `#f-utm-*`. Medido: `/v3/?utm_source=test&utm_medium=cpc&utm_campaign=c1` → «Escríbenos» → llegan test/cpc/c1 (antes, vacíos). **No cubre dos saltos** (anuncio → servicios → desarrollo-web → contacto sigue vacío): eso lo arregla mover la captura a `NavV3` (propuesto); cuando entre, este puente sobra | preferencia, **transitoria** | QA de Contacto |
| 5-oct | Índice de servicios: textos escritos en la página y no leídos de `oferta-v3.json` hasta que se corrija el JSON (compartido con la home). **Notas de banda** (`notaPagina`): Visibilidad solo «No hace falta reconstruir para que una IA pueda citarte.» (la primera frase repetía el «no lo vas a rehacer» del h2); **Desarrollo sin nota** (QA2: la guía de la entrada, la nota y la fila decían tres veces seguidas que el sitio nace legible para la IA; petróleo tampoco lleva). **Descripción de Desarrollo Web** (`descPagina`): «Lo compruebas con el chequeo gratis, sobre tu dominio, antes y después.», no «con el mismo chequeo» (en la home remite al instrumento del hero; acá no remitía a nada). **«Lo que pones tú»** (h2, de «Fuera (lo pones tú)» de la publicada) y primer ítem «Contenido creativo: redacción y guiones de piezas.» (`fueraPagina`; el JSON dice «Creación de contenido», que negaba el «contenido para búsqueda e IA» de Acompañamiento), con el pie verbatim de la publicada «Si no tienes quién lo produzca, te conectamos con partners.». El bloque «Lo hacemos nosotros» (`oferta.dentro`) se sacó: repetía las bandas en orden inverso. El texto del chequeo nombra ChatGPT, Claude y Perplexity, como la línea de `/v3/diagnostico/` (Gemini no se prueba en vivo); su segundo botón dice «Pedir el diagnóstico» → contacto, el mismo par que Nosotros y Diagnóstico | preferencia, **transitoria** (los textos en la página) | QA y QA2 del índice de servicios (Clara puede reescribirlos en el JSON) |
| 5-oct | Índice de servicios: miga visible y BreadcrumbList dicen «Servicios», como el menú, el pie y la miga de cada servicio (el JSON publicado dice «Soluciones»; se sobrescribe la posición 2 al serializar). El `<title>` sigue «Soluciones: …» (73 caracteres): lo decide Simón | **regla** (antislop C8) | QA2 del índice de servicios |
| 5-oct | Foco no oculto en toda pila pegajosa (§3): el índice de servicios lo cumple con un script de página + `:focus-within` sin JS; medido Shift+Tab y Tab en 1440 × 900, 1280 × 720, 768 × 1024 y 390, con y sin movimiento reducido (Lenis activo), con y sin JS: 6 de 6 filas visibles en 3 de 3 puntos. La home queda pendiente (propuesto al sistema) | **regla** (WCAG 2.2 SC 2.4.11) | QA2 del índice de servicios (bloqueante) |
| 5-oct | Nosotros: la bio va verbatim («Lo primero es un diagnóstico», meta «Diagnóstico gratis en 24 horas»); «chequeo» en la página nombra solo el automático. Cierre: «Pedir el diagnóstico» → contacto + «Correr el chequeo» → `/v3/diagnostico/`. Los cambios de envase que sí se mantienen están declarados en la cabecera de `v3/nosotros.astro` | **regla** (manual §08) | QA de Nosotros (bloqueante: se había cambiado a «chequeo» sin declararlo) |
| 5-oct | Nosotros, **dos decisiones abiertas de copy** (frases de la bio publicada; el constructor no las toca): (a) A4, «El objetivo no es solo que vendas. Es que…» → propuesta «El objetivo es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí.»; decide Ramón. (b) A10, la fila «Diagnóstico antes que contrato» y el párrafo del cierre repiten «Gratis, en 24 horas»: se quita una de las dos; decide Clara o Ramón. Mientras no decidan, van tal cual y sin destacar: no es defecto nuevo en la próxima pasada | **pendiente de decidir** | QA de Nosotros (menores) |
| 5-oct | Medida del texto corrido en las internas (manual §05, ≤ 68 caracteres): hoy `.d-filas .d-cuerpo` llega a 96–100 a 1440 y a 131–135 a 1920, y `.d-sec .d-guia` a 72–74 a 1440 y a 92–97 a 1920. Es del sistema, no de una página: se arregla en `driftime.css` y **ninguna página lo parcha localmente**. Valores medidos con Range carácter por carácter en diagnóstico y desarrollo-web, a 1280, 1440 y 1920: `68ch` y `34em` no actúan en Manrope (93 y 72–77, igual que la fila del artículo), `max-width: 28.5em` en `.d-filas .d-cuerpo` da máx. 67 y `29em` en `.d-sec .d-guia` máx. 66 | **regla** (medida), **pendiente** de que el dueño de `driftime.css` la aplique | QA de Diagnóstico |
| 5-oct | Campo de color = **una pantalla exacta**. En escritorio la fila de imágenes llena lo que deja la cabecera y **ninguna imagen se recorta** (cada pieza con su proporción natural, `proporcion` en `Pieza`); en celular las dos piezas van lado a lado dentro de la pantalla (no carrusel), Desarrollo con la obra en teléfono (`srcCel`). Bajo 680 px de alto (escritorio) o 600 px (celular) el campo deja de pegarse. Medido en 8 pantallas reales: antes se recortaba de 25 a 73 % y la segunda pieza quedaba 244 px fuera del borde | **regla** | Ramón («las imágenes quedan fuera del navegador») |
| 6-oct | Diagnóstico: dos textos más van escritos en la página (se suman a los cuatro de la fila del 5-oct) hasta que Clara/Simón corrijan `paginas-v3.json`. (1) **Meta description y og:description**: «Pon tu dominio y revisamos al instante si ChatGPT, Claude y Perplexity pueden leerte, entenderte y citarte. Gratis, con los 21 chequeos y su puntaje publicados.» (el JSON nombraba a Gemini: la misma corrección de la línea bajo el h1, que en pantalla ya estaba y en Google no; antislop C8). (2) **Nota «Y cómo medimos si la IA te nombra.»**: «No mide si hoy te citan: para eso hay que preguntarle a los motores. En los planes con acompañamiento lo hacemos cada mes con las mismas preguntas y en los mismos motores, con fecha y con la fuente de cada respuesta registrada. Cambiar las preguntas rompería la comparación entre meses.» El JSON, y la página publicada, decían «cinco preguntas fijas por tres motores (ChatGPT, Gemini y Perplexity)»: eso es el Índice de Citabilidad propio (`marketing/metricas/test-menciones-ia.md`), no lo que traen los planes (`servicios-v3.json`: ~10 consultas en 3 motores en Esencial, ~20 en 4 en Pro). Va sin cifras, con la nota de `servicios-v3.json` («mismas consultas, mismos motores, misma cadencia»). Además abre diciendo qué no mide, que es lo que promete el h2, y deja de repetir la guía de la entrada (A10) | **regla** (cifra sin respaldo, manual §08); **transitoria** en cuanto a que el texto vive en la página | QA de Diagnóstico, 2.ª ronda (bloqueante la nota) |
| 6-oct | Diagnóstico: bajo el instrumento el único botón papel es «Pedir el diagnóstico». «Revisar mi sitio para la Ley 21.719» lleva a otro producto (verifica.spindlelab.cl) y va `.d-btn--alt`, en la misma pestaña, como en la página publicada | preferencia | QA de Diagnóstico, 2.ª ronda |
| 6-oct | Diagnóstico, celular: `.d-cab-diag` baja de 124 a **100 px** (reemplaza la medida de la fila del 5-oct). Medido a 375 × 667 con el aviso de cookies abierto y el campo del chequeo a 52 px (fila siguiente, inyectado): botón 381–429, nota hasta 513, aviso en 537. El módulo de nav fijo termina en 86; la miga empieza en 100 | preferencia (medido) | QA de Diagnóstico, 2.ª ronda |
| 6-oct | Campo del chequeo en celular a **52 px**: con `.d-dom` en columna, el `flex: 1` (base 0 %) del input le gana al `height: 52px` y lo deja en 24 px (medido a 375 y 390, en la home y en diagnóstico). Arreglo en `driftime.css`, dentro del media query de ≤ 767 px: `.d-dom input { flex: none; height: 52px; font-size: 1.125rem; }`. Ninguna página lo parcha. Medido inyectado: 24 → 52 px; en la home a 390 × 844 el titular y la fila no se mueven (el hero absorbe los 28 px), a 375 × 667 bajan 28 px (la fila ya estaba bajo el pliegue) | **regla**, **pendiente** de que el dueño de `driftime.css` la aplique | QA de Diagnóstico, 2.ª ronda |
| 6-oct | Marcas de estado del resultado del chequeo (`.chq-mark`: ✓ ✕ ?) con `var(--d-r)`, no `50 %`: eran el único radio fuera de 6 px (y 4 px dentro de un control) en todo lo que pinta la página (medido con respuesta simulada). Va en el bloque «EN EL SISTEMA DRIFTIME» de `chequeo-v3.css`: `.d-body .chq-mark { border-radius: var(--d-r); }`; ninguna página lo parcha (fila del 5-oct sobre el dueño único del resultado) | **regla** (manual §07), **pendiente** de aplicar en `chequeo-v3.css` | QA de Diagnóstico, 2.ª ronda |
| 6-oct | Contacto, envío correcto: la caja de éxito (`.form-success`) **tiene que verse y recibir el foco**. `v3-contacto.js` oculta el formulario y la página se acorta ~560 px: la caja quedaba sobre el borde superior, bajo el módulo (0 px visibles a 390 × 844 con el botón al centro) y el foco caía a BODY. Sin tocar `v3-contacto.js`, un script de la página observa el `hidden` de la caja y, al volverse visible, le da el foco (`tabIndex = -1`, `focus({ preventScroll: true })`, que además la anuncia: un `role=status` que pasa de oculto a visible no se lee de forma fiable) y, si no queda entera entre el módulo y el borde inferior o el aviso de cookies, la centra (`scrollIntoView`, `smooth`; `auto` con movimiento reducido). Medido con web3forms simulado: 390 × 844 botón al centro (scrollY 479) → caja 348–495, módulo hasta 86; 375 × 667 con aviso → 260–407, aviso en 537 (igual con movimiento reducido); 1440 × 900 y 1280 × 720 → la caja ya cabía entera y no se desplaza; botón arriba en 1440 × 900 y 1280 × 720 (Lenis activo) → 364–490 y 299–420. Foco en la caja en 11 de 11 casos; el contorno de 2 px aparece solo si se envió con teclado. El camino de error no cambia | **regla** (antislop C6; brief: la única conversión medida) | QA2 de Contacto (bloqueante) |
| 6-oct | Contacto, paso 01 de «Qué pasa después» (`contacto.secciones[1].bloques[0].d` y `parrafos[0]`): «qué vendes, quién es tu cliente, qué te preocupa» es la segunda serie de tres de la página (A3; la que se queda es el h1). Lo corrige Clara en el JSON: «Un correo con tu URL basta. Si quieres, cuéntanos qué vendes y qué te preocupa de tu sitio.» La página no lo parcha. El placeholder del mensaje ya usa «…» y no «...» | **pendiente** (Clara) | QA2 de Contacto |
| 6-oct | Servicios (las cinco de `servicios/[slug].astro`): el BreadcrumbList dice lo mismo que la miga visible: posición 2 «Servicios» y posición 3 el nombre en caja de oración («Auditoría SEO técnica», «Acompañamiento mensual», «Gestión de redes sociales»). El JSON publicado dice «Soluciones» y el nombre de producto; se sobrescribe al serializar, el mismo patrón del índice. El nodo Service y el `<title>` conservan el nombre de producto | **regla** (antislop C8) | QA2 de Servicios (bloqueante) |
| 6-oct | Servicios [slug]: lo que el texto corrido nombra va enlazado, una vez por página y solo en lo visible (el FAQPage sigue en texto plano): «protocolo público» → `/v3/diagnostico/#s-nom` (en la publicada, `/diagnostico/#medicion-mensual`); «servicio de acompañamiento mensual», «Gestión de redes sociales» y «Paid Media (Google)» → su página. Papel con subrayado de 1 px, como en Método y el artículo | **regla** (web-qa-critico paso 3; manual §08) | QA2 de Servicios |
| 6-oct | Servicios [slug] (desvío de §4): entre las preguntas y «Siguiente» va un cierre `.d-sec--quieta`: h2 + guía + «Pedir el diagnóstico gratis» → contacto, y en Visibilidad, Auditoría y Acompañamiento además «Correr el chequeo» `--alt` → `/v3/diagnostico/` (la puerta de quien ya tiene sitio, brief §2; el mismo par que Nosotros y el índice). Es el cierre de la página publicada: la oferta concreta en 24 horas, que el pie no dice. Desarrollo Web no lo lleva. Si se acepta, §4 Servicio queda «… preguntas → cierre → siguiente servicio» y falta decidir si Desarrollo Web lo suma (decide la dueña de la spec, no el constructor) | preferencia, **pendiente de aceptar** | QA2 de Servicios (estaba construido y sin declarar) |
| 6-oct | Servicios [slug]: textos escritos en la página y no leídos de `servicios-v3.json` hasta que Clara lo corrija. En `PROPIO`: la línea bajo el h1 de las cinco (Redes y Acompañamiento nombran el plan que trae lo que dicen: el Orgánico de $390.000 es una red y sin pauta, la pauta y las dos redes parten en $590.000; el Esencial de Acompañamiento es una capa, las dos juntas son el Pro de $790.000), la nota de la entrada, la entrada (recortes en Visibilidad, Acompañamiento y Paid Media; reescrita en Redes), el h2 «Lo que incluye» de Acompañamiento y el cierre de Acompañamiento y de Paid Media. En `CAJA`: caja de oración del h1, la miga y «Siguiente». En `CORRIGE`, que se aplica al dato entero para que lo visible y el JSON-LD digan lo mismo: el precio con una notación, «equipo dedicado» fuera, la FAQ «¿Incluye pauta pagada?» dice desde qué plan, el h2 de Auditoría «Del mini-diagnóstico gratis a la auditoría», «sin compromiso» fuera, «móvil y escritorio» → «celular y computador», repeticiones fuera (el presupuesto en Paid Media, «no a todo el mundo», «200 hallazgos», «el creativo lo pones tú» en la nota de planes de Redes) y «motor» fuera (B8, también en las Offer). **Para Clara en el JSON:** una sola serie de tres por página (A3) y los dobles de Visibilidad (protocolo repetible ×4, la no-garantía ×2) y de Redes | preferencia, **transitoria** | QA y QA2 de Servicios |
| 6-oct | Servicios [slug], reparto del pool: recorridas con «Siguiente» en ciclo (… Paid Media → Desarrollo Web → Visibilidad …), ninguna foto en más de dos páginas seguidas. Redes y Paid Media llevan una sola imagen ancha (`d-g-ancha`): Redes `hilos`, Paid Media `domino-curva`. La propuesta de la QA (Paid Media con `ventana`) dejaba ventana en Redes (cabecera) → Paid Media → Desarrollo Web (galería): tres seguidas. Con la cabecera `hilo` (familia hilo/hilos fuera) y escritorio en Desarrollo Web y Visibilidad, a Paid Media solo le quedan el dominó curvo o el retrato. Dominó curvo queda en 3 de 5 (Visibilidad, Acompañamiento, Paid Media), nunca seguidas | preferencia (medido sobre el pool) | QA2 de Servicios |
| 6-oct | Servicios [slug] y Desarrollo Web van sin campo de color, siguiendo la referencia aprobada (los casos de driftime son negro e imagen). Choca con el manual §04 («ninguna página del sistema queda sin campo», «la página que abre no puede llegar en blanco y negro»): o el manual exceptúa las internas de servicio, o §4 Servicio suma una banda en el color del campo (p. ej. el cierre). No lo decide el constructor | **pendiente de decidir** (Lucía/Ramón) | QA y QA2 de Servicios |
| 6-oct | Método (desvío de §4, Editorial): suma piezas de la plantilla Servicio: línea y 2 botones en la cabecera (`Correr el chequeo` + `Ver las cuatro fases`), nota + entrada (`.d-entrada`) y una galería (`.d-galeria`, `ventana` + `hilo`) entre las fases y las reglas. El cierre «El primer paso es gratis.» va en `.d-sec--quieta` (mide ~160 px a 1440 × 900; pegado, el h2 pasaba bajo el módulo). Detalle y porqué en la cabecera de `v3/metodo.astro`. Si se acepta, la fila Editorial de §4 se actualiza (decide la dueña de la spec, no el constructor) | preferencia, **pendiente de aceptar** | QA2 de Método (estaba construido y sin declarar) |
| 6-oct | Método, fase 04: «nuestro protocolo público» → `/v3/blog/como-aparecer-en-chatgpt/#como-medir-si-esta-funcionando`, no `/v3/diagnostico/#s-nom`. Desde la corrección del 6-oct, la nota de diagnóstico no publica ningún protocolo (sin preguntas, motores ni cantidades) y dice «cada mes», contra el «cada quince días» de la fase: quien hace clic para comprobar encuentra otra cadencia y nada repetible. El artículo describe el protocolo en público («el mismo set de preguntas… ejecutadas periódicamente en los mismos motores…») sin cadencia que choque (medido: 200 y el id existe). **La fila de Servicios [slug] de arriba apunta al mismo destino y hereda el defecto** (decide quien lleva Servicios). Cadencia en conflicto, para Clara/Ramón: `servicios-v3.json` dice quincenal (acompañamiento: «medidas quincenalmente», «informe quincenal»; pero en visibilidad-en-ia el plan Esencial dice «Informe mensual») y `/v3/diagnostico/` «cada mes». Método sigue a acompañamiento-mensual | **regla** (manual §08: la prueba de una afirmación no la contradice) | QA2 de Método (bloqueante) |
| 6-oct | Trabajo, celular: `.d-cab--trab` con `padding-top: 112px` (≤ 767 px) en vez del `min(34vh, 300px)` de `.d-cab`, el mismo valor de `.d-cab--ct`. Medido a 375 × 667 con el aviso de cookies abierto: la primera pieza empezaba en y=576, bajo el aviso (537), y el primer pantallazo no mostraba ninguna obra; ahora la pieza empieza en 461 y su rótulo va en 471–499. A 390 × 844: pieza 461–724, aviso en 714 (antes asomaban 78 px de imagen, ahora 253). Escritorio sin cambio (1440 × 900: pieza en 668, aviso en 823) | preferencia (medido) | QA2 de Trabajo (brief §3; lock §5 y §9.3) |
| 6-oct | Trabajo, medida (manual §05): el tope del pie de cada pieza y del cuerpo del cierre va en el párrafo y en em (`.d-pie-trab__txt .d-cuerpo` y `.d-cierre-trab .d-cuerpo`, `28.5em`), no `620px` en el contenedor (36,5 em a 17 px: 75–84 caracteres). La bajada de la entrada (`.d-entrada-trab .d-guia`) también lleva `28.5em`, como la entrada de Método (medía 69 a 1280 y 1440 y 96 a 1920). Medido con Range a 1280, 1440 y 1920: máx. 65 en los pies, 64 en el cuerpo del cierre y 59 en la bajada. La `.d-guia` del cierre (72 a 1280 y 1440, 95 a 1920) no se parcha: va con la fila «Medida del texto corrido en las internas». Propuesta para esa fila: sumar `.d-entrada .d-guia` al arreglo del sistema (en desarrollo-web mide 96 a 1920) | **regla** (medida) | QA2 de Trabajo (bloqueante) |
| 6-oct | Trabajo: tres datos de `obra-v3.json` van corregidos en la página hasta que su dueño corrija el JSON. Cada corrección actúa solo si el JSON trae todavía el valor viejo, exacto, y se retira sola cuando cambia. (1) **Línea de Raigal** (`LINEA_CORREGIDA`): el JSON dice «Sitio completo, del argumento clínico a la ficha de tratamiento» y lo construido es una portada (`marketing/portafolio/01-raigal/ficha.md`, §Estado: las internas siguen abiertas). Va «Clínica de implantología. Por ahora, solo la portada: costo y plazos, etapas, la especialista, lo que no se promete y preguntas frecuentes.» (las cinco secciones están en `sitio/index.html`; 22 palabras, contra 31 de la versión anterior; redacción final, Clara). (2) **Alt del mockup alto** de Model (`ALT_ALTO`): el JSON solo trae `altMock`, que describe notebook y teléfono, y el `-alto.jpg` es solo el teléfono. Va «El book de modelo de Bernardo Combeau abierto en un teléfono». (3) **Rubro de Verifica y Cumple** (`RUBRO_CORREGIDO`): «Herramienta propia» junto al tipo «Producto propio» se leía «Herramienta propia · Producto propio» (A10). Va «Herramienta». Propuesto al dueño del JSON: la `linea` de Raigal, `rubro: "Herramienta"` y un campo `altMockAlto` en los cuatro casos. La fila del hero de la home usa hoy `altMock` en las cuatro imágenes `mockAlto`, que muestran solo el teléfono (C5): cuando entre `altMockAlto`, la home lo usa | preferencia, **transitoria** (la línea de Raigal es regla: ninguna afirmación sin respaldo) | QA2 de Trabajo (estaba construido y sin declarar) |
| 6-oct | Mockup `obra/mock-combeau-modelo-alto.jpg`: el borde inferior del archivo cortaba «Grey Hair · Blue Eyes» por la mitad de las letras (la imagen va en su proporción, sin recorte CSS: el corte es del archivo). Recompuesto con el procedimiento de `mockups/README.md`, cambiando solo el `ty` del teléfono en este caso, de 130 a **105** px: el corte cae en el blanco entre la línea de datos y la foto siguiente (en px de la captura de 390: el texto termina en 667, la foto siguiente empieza en 714, el corte queda en 682). No se sube más, aunque QA pedía ~45: en la fila del hero de la home las cuatro piezas comparten `ty` 130, y con 95 el teléfono quedaba 11 px más alto que sus vecinos a 1440 y el rótulo de la pieza pisaba 7 px de su borde superior; con 105 son 8 px de desalineación y 4 px pisados (a 390: 9 px pisados, contra 3 con el archivo de hoy). Rehacer las cuatro a 85 alinearía la fila, pero los rótulos taparían el aviso de concepto en la pantalla de Raigal. Verificado con `ty` 130 (reproduce el archivo publicado, diferencia media ~1/255) y exportado a 1000 × 1100 con calidad 82, la del publicado | **pendiente** de que el dueño de `public/` cambie el archivo | QA2 de Trabajo |
| 6-oct | El resultado del chequeo (`v3-chequeo.js`) lleva a **contacto de la v3**: el destino se lee del formulario (`data-contacto`, que ponen `/v3/` y `/v3/diagnostico/` con `CONTACTO_V3`); sin el atributo sigue yendo a `/contacto/`. Los ids del chequeo no cambian. Antes los dos botones del resultado y el enlace del aviso de error sacaban al visitante de la maqueta, y el puente de UTM de contacto (fila del 5-oct) no corría. Medido con `/api/chequeo` simulado, con y sin error, en las dos rutas: llegan a `/v3/contacto/` con `utm_source/medium/campaign` en `#f-utm-*`. En el mismo archivo: el botón principal dice «Pedir el diagnóstico» (era «Quiero el análisis completo»), el remate «El diagnóstico te dice…» sin «completo» (fila del 5-oct de Diagnóstico) y el veredicto ≥ 90 «ya no está dentro de tu sitio» (era «acá adentro»). «Prefiero hablarlo contigo» se queda como segunda rama | **regla** (criterio de éxito = conversión; consts-v3) | revisión cruzada (bloqueante) |
| 6-oct | **Un nombre por servicio, en caja de oración**, en todo lo visible: `SERVICIOS_V3` (menú, pie y «Siguiente» de cada servicio, que ahora lee de ahí), `oferta-v3.json` (`n` y `cta`: pestañas y botones «Ver …» de la home, filas del índice), Método, Trabajo y las migas. Nombres: Desarrollo web · Visibilidad en IA · Auditoría SEO técnica · Acompañamiento mensual · Gestión de redes sociales · **Paid Media (Google)** (así dicen su h1, su miga y el índice; el menú decía «Paid Media»). La miga y el BreadcrumbList de Desarrollo web dicen «Desarrollo web». El `<title>` y el nodo Service conservan el nombre de producto (fila de Servicios del 6-oct). Diagnóstico: miga y BreadcrumbList «**Chequeo gratis**», el nombre del menú y del pie (el JSON publicado decía «Chequeo de visibilidad en IA»; se sobrescribe la posición 2 al serializar) | **regla** (antislop A6 y C8; miga = menú) | revisión cruzada (bloqueante) |
| 6-oct | Cabeceras de servicio: **ninguna familia de imagen en la cabecera de dos páginas seguidas** de la cadena «Siguiente» (reemplaza el reparto de la fila de Servicios del 6-oct, QA2). Acompañamiento pasa a `ventana` y Redes a `domino-curva` (`50% 62%`); galerías: Acompañamiento retrato + `hilos`, Redes `escritorio` ancha. Antes Auditoría (dominó) → Acompañamiento (dominó curvo), con el dominó curvo de la galería de Visibilidad: tres pantallas seguidas de fichas. Cabeceras del ciclo: escritorio (DW) · hilos · dominó · ventana · dominó curvo · hilo. Medido sobre las 6 páginas: ninguna foto en más de dos páginas seguidas | preferencia (medido sobre el pool) | revisión cruzada |
| 6-oct | Ningún artículo lleva `hilo.jpg` de cabecera: es la imagen a sangre de `/v3/diagnostico/`, a donde lleva el cierre de cada artículo («Correr el chequeo»). Los dos que la llevaban (cómo elegir agencia, fintechs) pasan a `hilos.jpg`, la misma familia: el reparto dominó · hilo · mesa no se mueve y `hilos` queda en los posts 2, 5 y 7 del ciclo, nunca seguidos | **regla** (misma foto en dos pantallas seguidas) | revisión cruzada |
| 6-oct | Precio con una notación también en Desarrollo web («Desde $390.000 + IVA», «Desde $690.000 + IVA», «Desde $1.190.000 + IVA»; antes «desde $390.000») y en Método («$590.000/mes + IVA», sin espacio antes de /mes). `oferta-v3.json` normalizado igual (planes de brasa y petróleo, hoy sin uso en pantalla) | **regla** (aplica la del 5-oct) | revisión cruzada |
| 6-oct | El BreadcrumbList del artículo toma la posición 3 de la **misma fuente** que la miga visible (el último eslabón de la miga publicada). En fintechs el grafo decía «… fintechs chilenas» y la miga «… fintechs»; las otras seis coincidían por casualidad | **regla** (la del artículo, 5-oct) | revisión cruzada |
| 6-oct | Artículo: la fecha bajo el h1 sale de `meta.datePublished` en es-CL («7 de julio de 2026»), no del byline publicado («7 de julio, 2026», coma del inglés). El tema de fintechs va «SEO técnico» (el byline publicado dice «SEO Técnico»; se corrige al leer, el HTML verbatim de `data/blog-v3/` no se toca) | **regla** (antislop A6, A7) | revisión cruzada |
| 6-oct | La home lleva title y description de producción, como las otras 20 rutas: «SEO técnico y visibilidad en IA para empresas en Chile · SpindleLab» (el de `spindlelab-site/index.html`, con «·» en vez de raya) y la description por defecto de `Layout.astro` (la de la home Astro; dice 24 horas como el resto de la v3, no las 48 de `spindlelab-site`). Antes: «Maqueta v3 · home en el lenguaje de driftime…», que nombraba a la referencia. El noindex se mantiene | **regla** (antislop C8) | revisión cruzada |
| 6-oct | **Una imagen, un alt que describe lo mismo** en todas las páginas: `hilos.jpg` «Cantos de hojas apiladas en azul oscuro, en diagonal» (los servicios decían «fibras finas»); `domino-curva.jpg` sobre **piedra oscura** (la home decía «sobre madera»); `ventana.jpg` con un **cuaderno** (servicios y blog decían «libro»). Las variantes que quedan describen los mismos objetos con más o menos detalle, o un recorte (Método, sin el laptop). `obra-v3.json` trae `altMockAlto` en los cuatro casos (solo el teléfono), que usan la fila del hero, Trabajo y Desarrollo web (cierra la propuesta de la fila de Trabajo del 6-oct) | **regla** (antislop C5) | revisión cruzada |
| 6-oct | Los h2 de sección van **sin punto final** en todo el sitio: Diagnóstico (sus 5 h2 y sus dos h3 de «Lo que este chequeo no mide») y el cierre de Método («El primer paso es gratis»), con el mismo `sinPunto` de Servicios. Quedan con punto, a propósito, el cierre del artículo y del blog («Leer ayuda; medir, más.», §4) y los titulares de dos frases («No te prometo. Te muestro.») | **regla** (una voz en todas las internas) | revisión cruzada |
| 6-oct | El campo del chequeo a 52 px en celular (fila del 6-oct, Diagnóstico 2.ª ronda) quedó **aplicado** en `driftime.css`. Medido: 52 px a 390 y 375 en la home y en diagnóstico; diagnóstico a 375 × 667 con aviso: botón 381–429, nota hasta 513, aviso en 537 (lo que suponía la fila de `.d-cab-diag` a 100 px); home a 390 × 844: titular 344–492 y fila desde 516, sin cambio | **regla** (aplicada) | Diego, en la revisión cruzada |
| 6-oct | Quedan abiertos de la revisión cruzada, sin tocar: (1) **cadencia** del acompañamiento, que Visibilidad dice mensual («Informe mensual», «mes a mes») y Acompañamiento y Método quincenal, con el mismo plan y la misma cifra, en dos páginas seguidas de la cadena; Diagnóstico #s-nom dice «cada mes». Decide **Ramón**; si es quincenal: `servicios-v3.json` visibilidad «Informe quincenal…», «quincena a quincena» y la nota de diagnóstico «cada quince días». (2) Los tres «acá» del artículo de los 21 chequeos (texto verbatim publicado; la voz real de Ramón usa «acá»): deciden **Clara/Ramón**. (3) La galería de Desarrollo web repite tres piezas de Trabajo, que la antecede en su «Siguiente»; propuesta: capturas planas `obra/combeau-modelo-alto.jpg` y `obra/verifica-y-cumple-ancho.jpg`. Decide **Lucía** (Desarrollo web es la referencia aprobada). (4) Visibilidad: menú, índice, home y «Siguiente» dicen «Visibilidad en IA»; su h1 y su miga, «Visibilidad en IA (AEO/GEO)». No se marcó, pero es el mismo caso que «Paid Media (Google)»: o la miga pierde el paréntesis o el menú lo gana. Deciden **Clara/Simón** | **pendiente de decidir** | revisión cruzada |
| 6-oct | Atribución: la captura de UTM vive en `NavV3`, en un script inline en las 21 rutas, con las mismas claves de sessionStorage que lee `v3-contacto.js`. Se retiró el puente por `document.referrer` de contacto, lo que cierra la fila transitoria del 5-oct. Medido con `utm-caminos.mjs` en astro dev: test/cpc/c1 en los 8 caminos (antes 3 de 8), incluido home → Desarrollo web → Escríbenos | **regla** (brief §6, criterio 7.1) | QA final, conversión (bloqueante) |
| 6-oct | El chequeo pasa el dominio a contacto. Los enlaces del resultado y del aviso de error llevan `?sitio=<dominio>` (en el error, lo escrito en el campo) y contacto lo pone en `#f-sitio` solo si está vacío. No se renombra nada y los UTM siguen en sessionStorage. «Pedir el diagnóstico» se repite dentro de `.chq-score`, junto al veredicto, reusando `.chq-ramas`, y el remate completo sigue al final. Medido con la respuesta real simulada en `/v3/` y `/v3/diagnostico/` a 1440, 768 y 390: botón de 36 px a la derecha del veredicto (debajo a 390); contacto llega con «spindlelab.cl» en Sitio web y test/cpc/c1 | **regla** (criterio de éxito = conversión) | QA final, conversión 6 y 7 |
| 6-oct | Aplicadas en el bloque «EN EL SISTEMA DRIFTIME» de `chequeo-v3.css`: `.chq-mark` con `var(--d-r)` (21 de 21 a 6 px; cierra la fila del 6-oct) y el enlace del aviso de error subrayado a 1 px (`text-underline-offset: .2em`) | **regla** (aplicada; manual §07, WCAG 1.4.1) | QA final, técnica 4 y conversión 3 |
| 6-oct | El paso gratis se llama «mini-diagnóstico», como en contacto, en el cuerpo de Diagnóstico y en su FAQPage: h3 del segundo camino, las respuestas, la pregunta «¿En qué se diferencia del mini-diagnóstico?» y la guía de la entrada. Los botones dicen la forma corta «Pedir el diagnóstico». «diagnóstico completo» queda en 0 en la página. El artículo de los 21 chequeos es verbatim y no se toca | **regla** (antislop C8) | QA final, conversión 8 |
| 6-oct | Componente **miga** (`Miga.astro`, §3): `<nav class="d-miga" aria-label="Miga de pan">` con lista ordenada en línea, separador «·» con `aria-hidden` y `aria-current="page"` en el último eslabón, sin enlace; `html: true` para títulos con entidades. El aspecto no cambia y el texto visible sigue igual al BreadcrumbList. Hoy lo usan Contacto y Diagnóstico; las demás plantillas lo adoptan en el paquete C | componente | QA final, técnica 12 |
| 6-oct | Dónde estás, en el menú y en el pie: `aria-current="page"` en la página exacta (comparando `Astro.url.pathname`) y `aria-current="true"` en la sección que la contiene («Servicios» en un servicio, «Blog» en un artículo). Estado visual sin oro: en el menú, número en papel y palabra subrayada a 1 px; en el pie, opacidad plena y subrayado de 1 px. Medido en las 21 rutas a 1440, 768 y 390 | **regla** | QA final, mirada 11 y técnica 12 |
| 6-oct | Pie: el control «Cookies», que inyecta `consent-banner.js` con un estilo en línea subrayado, lleva el mismo trato que «Privacidad» y el resto de la columna: sin subrayar, opacidad 0,9 y subrayado al pasar el cursor. Se hace desde `FooterV3` con `:global(#cookie-preferencias)` y `!important`, sin tocar Layout ni el script | **regla** | QA final, mirada 8 |
| 6-oct | Menú: la trampa de foco recorre el módulo entero (wordmark, Escríbenos y cerrar) y el panel, y al abrir el foco va a «Inicio». Con el menú abierto, todo hijo de `body` que no sea el módulo, el panel o el aviso de cookies queda `inert` (main y pie incluidos) y se libera al cerrar. Los enlaces del módulo también cierran el menú | **regla** (WCAG 2.1.2, 2.4.3) | QA final, técnica 6 |
| 6-oct | Contacto: ayuda visible bajo «Sitio web» para quien parte de cero: «Si partes de cero, escribe «no tengo» y cuéntanos tu proyecto abajo.» (de la DW publicada más el arreglo de la QA), 14 px gris, con `aria-describedby`. El campo sigue obligatorio y con su nombre; quitar el required lo decide Ramón. Nueva medida de la fila del 5-oct: a 1440 × 900 el botón queda en 777–813 con el aviso en 823; a 390 × 844 «Sitio web» sigue en 614–662 y la ayuda queda en 670–712 (aviso en 714). Redacción final: Clara | preferencia, **transitoria** (copy) | QA final, conversión 9 |
| 6-oct | Contacto: meta description y og:description sin «Sin compromiso.», corregido en `paginas-v3.json` | **regla** | QA final, técnica 13a |
| 6-oct | `v3-chequeo.js` cambió de contenido y `/assets/*` se cachea 7 días, así que sus referencias llevan `?v=2`. Diagnóstico ya lo tiene; falta la home | **regla** (caché) | Diego, QA final |
| 6-oct | Tableta vertical (hasta 1024 px de ancho, en vertical) = celular en la home. La fila del hero es carrusel con alto común y en ese tramo el hero mide lo que trae, sin min-height ni margen automático en el titular. Los campos van en la grilla de dos celdas sin tope de alto: la fila llena lo que deja la cabecera. El mockup en teléfono (`srcCel`, `mediaCel` en Pieza) manda también ahí. Medido: 22 px de vacío entre los botones y la fila a 768×1024, 810×1080, 820×1180 y 1024×1366 (antes 357–433 a 768); etiquetas del hero en el 13 % del alto de la pieza a 768 | **regla** | QA final (mirada #1, bloqueante) |
| 6-oct | El titular del hero escala por alto, como el de los campos (`min(10vw, 14svh)`). Bajo 800 px de alto el hero lleva 96 px arriba y el titular 24. Medido: primera pieza visible al 83 % a 1280×720 (antes 46 %) y al 89 % a 1366×768 (antes 56 %) | **regla** | QA final (mirada #3) |
| 6-oct | Fila del hero en proporciones mixtas con alto común: piezas 2 y 4 en el mockup ancho (4:3), 1 y 3 en el alto (10:11), cada una en su proporción con `--r` y `--suma` (el mecanismo de los campos), de margen a margen y sin recorte. En carrusel conserva el alto común y la pieza ancha cabe entera al detenerse. Las etiquetas del hero van en fila cuando caben. El alt sigue al mockup (`altMock` o `altMockAlto`) | **regla** (antislop B1) | QA final (mirada #5) |
| 6-oct | `obra/combeau-fotografia-ancho-2.jpg` (1440×616, termina con la banda verde) reemplaza a `combeau-fotografia-ancho.jpg` en `obra-v3.json` (`img`, `w`, `h`) y en el campo Desarrollo, que ahora lee de ahí. Va con archivo nuevo por el caché de 7 días en /assets/*. `.d-g-ancha` respeta `--r` si la pieza trae `proporcion` (si no, 16:9) | **regla** | QA final (mirada #4) |
| 6-oct | `d/hilos.jpg` con más contraste (niveles 5–115, gamma 0,9): la desviación de luminancia pasa de 5,4 % a 13,3 %, sin píxeles cerca del oro. Conserva el nombre (nació en la rama) y las referencias llevan `?v=2` | preferencia (medido) | QA final (mirada #6) |
| 6-oct | `.d-siguiente` se apila en celular desde el sistema (rótulo sobre el título, 6 px). Ninguna página lo parcha | **regla** | QA final (mirada #7) |
| 6-oct | El aviso de cookies se pinta en la paleta v3 desde `driftime.css`, sin tocar Layout: fondo `--modulo` con filete, texto Manrope en `--gris`, enlace papel con subrayado de 1 px y botones como `.d-btn`. Los selectores llevan `html body.d-body #cookie-banner …`, porque Astro aísla el `<style>` del aviso con atributos (especificidad 1-2-1) | **regla** | QA final (mirada #8, técnica #5) |
| 6-oct | `mock-combeau-modelo-alto.jpg` recompuesto con el teléfono en `ty` 105: «Grey Hair · Blue Eyes» entra entero. Con `ty` 130 el pipeline reproduce el archivo anterior con diferencia 0. Cierra la fila de Trabajo del 6-oct | **regla** (aplicada) | QA final (mirada #9) |
| 6-oct | Rótulo único por obra: campo `rotulo` en `obra-v3.json` («Combeau, fotografía · Cliente», «Combeau, modelo · Cliente», «Verifica y Cumple · Producto propio», «Raigal · Implantología»). La home lo usa en el hero y en el campo Desarrollo; Trabajo y Desarrollo web lo adoptan (paquete C) | **regla** (antislop A6) | QA final (mirada #10) |
| 6-oct | Pila pegajosa (§3): el mecanismo es el componente `FocoPila.astro` (`bandas` y `pila` opcional) y no un script de página; la home lo usa en sus campos. El respaldo sin JS es `.d-campo:not([data-foco]):focus-within { z-index: 7 }`. En §3, «está propuesto como script compartido» pasa a «FocoPila; la home cumple». Medido con Shift+Tab a 1440×900, 1280×720, 768×1024 y 390×844, con y sin movimiento reducido y sin JS: 0 tapados (antes 14) | **regla** (WCAG 2.2 SC 2.4.11) | QA final (técnica #1, tercera ronda) |
| 6-oct | Foco bajo lo fijo: `scroll-padding-bottom` con el alto del aviso de cookies más ~18 px mientras está abierto, en el documento y en `#menu-overlay` (96/152/146/164 px según el ancho). `scroll-padding-top: 100px` solo con `:focus-visible`: siempre puesto corría 100 px las anclas que tienen scroll-margin medido. Medido: 0 paradas tapadas en las 21 rutas a 1440 y 390, adelante con el aviso y atrás (antes 111 y 37); menú 0 (antes 4). Las anclas por clic, toque o Enter caen igual (#planes 180/110, #contacto-form 88/96). El resultado del chequeo enviado con Enter cae en 196 en vez de 96 | **regla** | QA final (técnica #2) |
| 6-oct | Pestañas con una sola implementación: MovimientoV3 (`[data-planes], [data-pestanas]`), con flechas, Inicio/Fin y tabindex itinerante desde el HTML. Un campo de un solo servicio lleva la píldora como rótulo (`span.d-pill--rotulo`), sin tablist | **regla** (antislop C2) | QA final (técnica #7) |
| 6-oct | Imágenes del pool y mockups con versión `<foto>-800.jpg` y `srcset` + `sizes` en Pieza. En una celda con `object-fit: cover` el `sizes` declara el ancho al que se pinta la foto (alto de la celda × proporción), no el de la celda. width/height reales en la home, también en el `<source>`. La fila del hero es `role="region"` con su aria-label | **regla** | QA final (técnica #8, #9 y #12) |
| 6-oct | Home: title de 53 caracteres «SEO técnico y visibilidad en IA en Chile · SpindleLab» (reemplaza el de la fila 209; el chequeo de la casa pide 15–65) y nodo WebPage `https://spindlelab.cl/#webpage` en su JSON-LD con datePublished 2026-07-08 (portada en línea según el plan operativo, semana 1) y dateModified, que se actualiza al publicar. Chequeo simulado: 75 → 83 | **regla** | QA final (conversión #2) |
| 6-oct | La línea de precio de la home lleva el marcado del índice: cada alternativa en `.d-pre-alt` (nowrap, regla del sistema), separador aria-hidden, espacios reales y «+ IVA» pegado a la última cifra | **regla** (aplica la del 5-oct) | QA final (conversión #4) |
| 6-oct | «Siguiente» apilado en celular (rótulo sobre título) es regla del sistema en driftime.css; el parche local `.d-siguiente--svc` de Servicios [slug] se retiró. Medido a 390: los 6 servicios, Trabajo y Nosotros con «Siguiente» en y 29 y el título en y 56, x 20 | **regla** (aplicada) | QA final, mirada #7 |
| 6-oct | Desarrollo web cierra como los otros cinco servicios: `.d-sec--quieta` entre las preguntas y «Siguiente», con el h2 y la guía del cierre publicado («Cuéntanos qué necesita comunicar tu sitio» / «Si ya tienes uno, empezamos con el diagnóstico gratuito. Si partes de cero, conversemos tu proyecto directamente.») + «Escríbenos» papel + «Correr el chequeo» `--alt` → /v3/diagnostico/. «chequeo» de «Todo parte con esto» enlazado a /v3/diagnostico/. Medido: primer paso dentro de la página a 1,9 pantallas y el cierre a 7,1 (1440), contra 8,7 del pie antes. Si la dueña de la spec lo acepta, §4 Servicio queda «… preguntas → cierre → siguiente servicio» en las seis y se cierra la pregunta abierta de la fila de Servicios [slug] (desvío de §4) | preferencia, **pendiente de aceptar** en §4 | QA final, conversión #5 |
| 6-oct | Galería de Desarrollo web: Combeau modelo (`obra.tira`) y Verifica y Cumple (`obra.img`) en captura plana; Raigal en mockup (fila del 5-oct). Las capturas de sitio no se recortan: la ancha con su proporción (1440 × 616) y dos filas `.d-fila-dw` de alto común (flex-grow = proporción); la ventana cierra como pieza de 3:4 (4:3 en celular). Desvío de la grilla 4/8 de `.d-galeria`: en una caja 4:3, la captura 16:9 de Verifica perdía el 25 % de los lados (el «¿» y el «?» del titular). Cierra el pendiente (3) de la revisión cruzada | preferencia (desvío declarado; decide Lucía si sube a §3) | QA final, revisión cruzada |
| 6-oct | Un solo rótulo por obra: el `rotulo` de obra-v3.json en la home, la galería de Desarrollo web y las etiquetas de Trabajo. «Bernardo Combeau \| Model» con la barra en gris queda solo donde se nombra el sitio: el h2 del pie de Trabajo, junto a su enlace | **regla** | QA final, mirada #10 |
| 6-oct | Toda foto del pool y todo mockup con versión de 800 px lleva `srcset` («…-800.jpg 800w, ….jpg <ancho>w») y `sizes` = el ancho al que se **pinta**, no el de su caja: con object-fit: cover, alto de la caja × proporción de la foto (domino de Auditoría en celular, × 1,82 del zoom). Medido con currentSrc en 14 rutas a 1440 DPR 1 y 2, 768 DPR 2 y 390 DPR 2 y 3: 0 elecciones cortas, 0 sobradas. El retrato (896) y combeau-modelo-alto (900) no llevan srcset | **regla** | QA final, técnica #8 |
| 6-oct | Avatar de la cabecera del artículo: `ramon-vallejos-avatar.jpg`, 132 × 132 (44 × 3), el mismo encuadre cuadrado y centrado que cover sacaba del retrato, con `alt=""` porque el nombre está al lado. 193 KB → 5 KB por artículo | **regla** | QA final, técnica #8 |
| 6-oct | Artículos: el FAQPage dice lo mismo que el FAQ visible. En como-aparecer-en-chatgpt y que-es-aeo-geo se regeneró desde el FAQ visible, verbatim (en como-aparecer no se pintaron las preguntas del FAQPage: el cuerpo ya trae las mismas tres en otras palabras y quedaban dos listas casi iguales, A10). La plantilla hace caer el build si una pregunta del FAQPage no está visible o su respuesta no está dentro de la visible. El sitio vivo tiene el mismo desajuste en esos dos posts | **regla** (antislop C8; directriz de Google) | QA final, técnica #10 |
| 6-oct | ItemList de /v3/servicios/: «Servicios de SpindleLab» y el orden de las bandas (sale de oferta-v3.json, el mismo dato que las pinta); cada ítem conserva su nodo Service publicado (mismo @id y nombre de producto) | **regla** (antislop C8) | QA final, técnica #13c |
| 6-oct | Title de Trabajo: «Trabajo: sitios que construimos · SpindleLab» (44 caracteres) | **regla** | QA final, técnica #13b (propuesta para Simón) |
| 6-oct | Miga: el componente `Miga` en todas las internas con miga (índice y 6 servicios, Trabajo, Método, Nosotros, blog y los 7 artículos). Medido: nav «Miga de pan», `<ol>`, `aria-current="page"` en el último eslabón, y miga visible = BreadcrumbList en las 20 rutas con miga | **regla** | QA final, técnica #12 |
| 6-oct | Copy en los JSON (Clara): cierre de Visibilidad como afirmación, «Te mostramos qué dicen de tu empresa los motores de IA» + «Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito.»; «qué mueve la aguja» → «qué arreglar primero» (oferta ×2) y «Primero lo que hay que arreglar, no lo cosmético.» (Auditoría). Una sola serie de tres en la home: Acompañamiento «Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA.» (la línea de su página) y Redes «Orgánico y pauta social en LinkedIn y Meta.» (de `oferta.dentro`). Quedan fuera la FAQ de Diagnóstico (paginas-v3.json) y el cierre de Nosotros (bio, Ramón) | **regla** (A3, A5; manual §01) | QA final, mirada #12 |
| 6-oct | `hilos.jpg` se pide con `?v=2` en todas las páginas, no solo en la home: es la misma URL y el mismo archivo en caché tras la re-exportación con más contraste | **regla** | QA final, mirada #6 (seguimiento) |
| 6-oct | En el frontmatter de un `.astro`, dos divisiones en la misma línea («Math.max(1 / 3, n / 2)») las lee el compilador de Astro como una expresión regular: la página da 500 en dev con «Unexpected "export"» y arrastra a las rutas vecinas del mismo directorio. Una división por línea o constantes | **regla** (técnica) | Diego, en la QA final |
| 6-oct | **Radio de 4 px declarado**: además de los controles, lo llevan la etiqueta de pieza (`.d-etq span`), el rasgo de plan (`.d-plan li`) y la píldora-rótulo de un campo con un solo servicio: son «píldora sobre superficie», no tarjetas. El **vidrio** (`backdrop-filter`) tiene dos usos y solo dos: el módulo de navegación y la etiqueta de pieza, para leerse sobre cualquier imagen | **regla** (cierra técnica #11 de la QA final) | orquestador, en rol de dirección de arte |
| 6-oct | Captura plana de un sitio (su arriba es la cabecera del sitio retratado): la etiqueta va **abajo** a la izquierda (`Pieza etqAbajo`), porque arriba tapaba su wordmark. Excepción a la regla del 5-oct, que sigue valiendo en el primer pantallazo. Donde la captura tiene texto arriba y abajo (el book de modelo), va el mockup en teléfono | **regla** | re-verificación de la QA final (mirada) |
| 6-oct | En celular el hero vuelve a llenar la pantalla con el titular anclado abajo; el tratamiento «sin alto mínimo» es solo de tableta vertical. Alto común del carrusel en celular: `(100vw − margen) × 0,74`, el máximo con el que la pieza ancha 4:3 cabe entera | **regla** (medido) | re-verificación de la QA final (mirada) |
| 6-oct | Un asset que cambia de contenido cambia de **nombre** (`-2`) o lleva `?v=N` en **todas** sus referencias: `/assets/*` se cachea 7 días también en la vista previa. Aplicado: `mock-combeau-modelo-alto-2.jpg`, `combeau-fotografia-ancho-2.jpg`, `hilos.jpg?v=2`, `v3-chequeo.js?v=2`, `v3-contacto.js?v=2` | **regla** | re-verificación de la QA final (técnica) |
| 6-oct | **Cerradas por la QA final** (no reabrir): la captura de UTM vive en `NavV3` en todas las rutas y el puente por referrer de contacto se retiró (cierra la fila del puente transitorio); `FocoPila` resuelve el foco tapado en la pila de la home (cierra «la home queda pendiente»); `.chq-mark` con radio 6 (cierra «pendiente de aplicar»); Desarrollo Web lleva el mismo cierre `.d-sec--quieta` que los otros cinco servicios (se acepta en §4 Servicio para las seis); el title de la home es de producción y de 65 caracteres o menos; la galería de Desarrollo Web ya no repite tres piezas de Trabajo | cierre | orquestador |
| 6-oct | **Reservado para Ramón** (no lo resuelve el constructor): sección de preguntas con FAQPage en la home (el chequeo propio da 83/100 sin ella y ~94 con ella), tercer `sameAs`, imagen OG v3 y `og:type` de artículo (tocan Layout), precarga de Inter en las páginas v3, cadencia del plan Acompañamiento Esencial (mensual o quincenal), los «acá» del artículo verbatim de los 21 chequeos, la frase de la bio de Nosotros, y si «Sitio web» deja de ser obligatorio en contacto | pendiente de decisión | orquestador |
| 6-oct | **Diferido** hasta que entren fotos nuevas (Ramón está eligiendo en Unsplash): sumar piezas a los campos para que la fila llegue de margen a margen, y sacar `hilos.jpg` de las cabeceras | pendiente | orquestador |
| 6-oct | **Imagen al compartir de la v3**, autorizada por Ramón: `Layout.astro` gana tres props opcionales (`ogImage`, `ogImageAlt`, `ogType`) cuyo valor por defecto es el de siempre, así que el sitio publicado no cambia (verificado: etiquetas OG idénticas en las 21 páginas fuera de /v3/). La v3 usa `og-v3.jpg` (titular de la home) en todas sus rutas y `og-v3-desarrollo-web.jpg` (obra real, sin Raigal) en Desarrollo web y Trabajo; los posts van con `og:type` article y su `Article.image` apunta a la imagen nueva. Fuente y reglas en `marketing/brand/og-v3/README.md` | **regla** (cierra el reservado de la imagen OG) | Ramón autorizó; orquestador |
| 10-oct | **El hero queda como está: «Ahí se corta el circuito»**, con el ojillo «Estás pagando para que lleguen a tu sitio.». Ramón lo confirmó al leer el traspaso de la sesión antigua, que daba por cerrado «El eje de tu negocio» (29-sep); esa decisión la había reabierto él mismo en la compuerta 1 (2-oct). No vuelven ni ese titular ni su bajada | **regla** | Ramón |
| 13-oct | **Aviso de cookies compacto en pantallas bajas** (C34, P66, P92), desde `driftime.css` y solo por alto, nunca por ancho: apaisado ≤ 500 px y vertical ≤ 600 px. Texto a 0,75rem con interlínea 1,4 (el tamaño de la etiqueta de pieza), relleno 8/16 en apaisado y 10/16 en vertical; en apaisado, texto y botones en una fila. Los botones siguen en 36 px. Mide 53–67 px en apaisado (568×320 a 1440×500) y 99–132 en vertical (480×600 a 320×568); antes medía 109–146. El `scroll-padding-bottom` baja con él: 86 y 150 px. Medido con el aviso abierto en la primera carga, en 16 tamaños por ruta: el centro de `#chq-dominio` y de `#chq-btn` devuelve el propio control en 32 de 32 casos (antes 23). En los demás tamaños el aviso no cambia (78 px a 1440×900) | **regla** | Diego |
| 13-oct | `#cookie-aviso`, el aviso que `consent-banner.js` crea al pulsar Aceptar o Rechazar con estilo en línea, se pinta en el sistema desde `driftime.css` con `!important` y sin tocar el script. Queda con radio `--d-r`, sin sombra, fondo `--d-modulo` con borde `--d-filete` y texto papel en Manrope de 14 px. Los botones de la variante «otra pestaña» van como `.d-btn`: 36 px, radio 6, papel, y el alternativo con borde papel al 32 %. Medido tras `#cookie-accept` a 390 y 1440: radio 6, sombra none, rgb(22,22,22), 81 glifos de Manrope y 0 de Inter. Antes eran radio 16, sombra, #161D26, 81 glifos de Inter y botones de 999 px. Con esto Inter no pinta nada en la v3, ni antes ni después de decidir (dato para el R5 de Ramón) | **regla** (cierra P63 y el hueco de P79) | Diego |
| 13-oct | Diagnóstico en pantallas bajas, con las mismas media queries del aviso compacto (desvío de §4 Herramienta). (1) El instrumento va justo bajo el h1 y la línea pasa debajo; es solo orden visual: el DOM no cambia y la línea no es enfocable. (2) La miga queda en 96 px, bajo la caja del módulo (86 o 94). (3) En apaisado bajo 768 de ancho, el campo y el botón van en la fila de 64 px del escritorio. Por qué: con el aviso compacto, el aire mínimo y la fila, la línea (3 renglones) terminaba en 249 y el campo en 265–329, con el aviso desde 253 (568×320), 293 (640×360) y 307 (740×360): tapado en 5 de 6 apaisados. Ahora el campo y el botón quedan en 193–245 en todos los apaisados, y a 320×568 el campo va en 233–285 y el botón en 291–339, con el aviso en 436. Cuando hay resultado, la línea queda después de él. Si se acepta, la fila Herramienta de §4 suma «en pantallas bajas, el instrumento antes de la línea» (decide Lucía) | preferencia, **pendiente de aceptar** | Diego |
| 13-oct | En pantallas bajas, el aviso todavía tapa parte del titular de la home: 56 de 69 px a 320×568, 53 a 812×375, 50 a 844×390, 22 a 932×430 y 4 a 740×360. Antes eran 69, 87, 98, 46 y 4. No se puede arreglar sin tocar `section.d-hero` (regla del 10-oct). Si Ramón lo quiere, va al paquete del hero (R6); mientras tanto, el aviso se cierra con un toque | pendiente de decidir (Ramón) | Diego |
| 13-oct | Hallazgo al medir el foco, fuera de E1: a 844×390 (ancho ≥ 768 y alto 390), la etiqueta pegajosa del artículo con su índice mide más que la ventana, y los últimos enlaces quedan bajo el borde o bajo el aviso. Son 22 paradas de Tab tapadas en 6 artículos (33 antes de compactar el aviso). Propuesta: que `.d-eti` deje de pegarse bajo 500 px de alto, como ya hace `.d-campo` en pantallas bajas | pendiente | Diego |
| 13-oct | Menú (§3): las ocho filas entran enteras desde ~650 px de alto. La palabra escala también por alto: `clamp(1.625rem, min(4vw, 5.8svh), 3.25rem)`, como el titular del hero y de los campos. Desde 768 de ancho el aire también sigue al alto: arriba `clamp(96px, 32svh − 160px, 128px)` (96 hasta 800 de alto, como el hero; 128 desde 900) y relleno de fila `clamp(9px, 2svh − 4px, 14px)`. En celular siguen 112 y 12. Medido con el menú abierto: «08 Contacto» termina en 564 a 1280 × 650 y en 574 a 1366 × 657 (antes 772 y 776, fuera de la ventana), sobre el aviso de cookies abierto (573 y 580) y sin scroll en el panel; 610 a 1280 × 720 y 650 a 1366 × 768. 1440 × 900, 1920 × 1080, 768 × 1024 y celular vertical sin cambio (capturas idénticas). Con 10 px de relleno a 650 el aviso tapaba el filete de la última fila | **regla** (medido) | Diego (cierra C38) |
| 13-oct | Entrada escalonada del menú: el retardo sale del índice de la fila (`--paso` × 0,04 s, que pone el map), no de una regla por paso. Con seis reglas, la octava fila entraba en 0 s junto con la primera. Medido: 0 a 0,28 s en orden en las 8 filas; con movimiento reducido, sin animación | **regla** | Diego (cierra C38) |
| 13-oct | NavV3 sin comentarios que contradigan el código: «ocho» filas donde decía «siete», «el sitio tenía veinte páginas» dentro del relato del 29-sep (C40/P78) y el primario sin «en mayúsculas» (el menú va en caja normal; las mayúsculas 800 quedan en sus cinco lugares) | cierre | Diego |
| 13-oct | Pie: los enlaces de «Servicios» y «La casa» van en `ul.d-pie__lista > li > a`, como en el menú. La lista no lleva viñetas, margen ni relleno, es flex en columna con gap de 6 px, y el enlace va en block, como el ítem flex estirado de antes. El `<li>` va en varias líneas para que el texto plano separe los nombres: antes salía «Desarrollo webVisibilidad en IA…» en las 21 rutas. `consent-banner.js` sigue envolviendo «Privacidad · Cookies» en su span dentro del li. Medido a 1440, 768 y 390 en 5 rutas, con y sin decisión de cookies: 16 de 16 cajas con 0,00 px de diferencia, el mismo recorrido de foco con Tab y la captura idéntica píxel a píxel | regla (rescate del v3 viejo) | Diego |
| 13-oct | Un proceso en orden va en `ol.d-filas > li.d-fase` con la marca `aria-hidden`, como en Método: las 5 fases de Desarrollo web y los bloques de Acompañamiento (S1–S4, que siguen diciendo «Semana N:» al lector de pantalla), Redes y Paid Media (01–04), marcados con `secuencia: true` en `PROPIO`. Lo que no es secuencia va en `ul`: el Sí/No de Visibilidad y los entregables A–D de Auditoría, cuya letra se sigue leyendo. Medido a 1440, 768 y 390 en las 6 páginas: 0,00 px en cada fila y en cada hijo, y capturas idénticas. Quedan con div `contacto.astro:202` y `diagnostico.astro:190` | regla | Diego |
| 13-oct | Artículo: un `<article>` sin clase envuelve la cabecera (miga, h1, línea tema · fecha · lectura, autor), la imagen y `.d-art` (índice + cuerpo), como el post publicado. `.d-prosa-art` pasa a `div`. El cierre y «Siguiente artículo» quedan fuera, porque son de la página y no del artículo. El índice pegajoso sigue dentro de `.d-art` y no cambia de contenedor. Medido en los 7 posts a 1440 y 768: posición del índice idéntica en cada paso de 250 px de scroll y la misma sección marcada. Cabeceras con 0,00 px de diferencia también a 390. JSON-LD idéntico | regla (rescate; producción ya lo tenía) | Diego |
| 13-oct | Índice del artículo: si algún h2 del post empieza con número seguido de punto o paréntesis (`/^\d+[.)]\s/`), ninguna fila lleva el contador 01–09. Hoy pasa solo en fintechs, donde salía «01 1. La aplicación…». La marca del contenido gana, como `pr.marcas` en Servicios. Se decide por artículo y no por h2: por h2 quedaba un «08» suelto bajo siete títulos con número propio, dos numeraciones en la misma lista (mirado a 1440). La columna queda con un espacio duro, porque vacía cada fila perdía 1,1 px y el índice se acortaba 4,38 px. «03 Bloque 1» de los 21 chequeos no cambia | regla (desvío declarado: la instrucción decía por h2) | Diego |
| 13-oct | El alt de una pieza de obra nombra el titular visible de su portada. `altMock` y `altMockAlto` suman el de Combeau fotografía («Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.») y el de Raigal («Volver a morder»), comprobados en los cuatro mockups, como ya hacía Verifica y Cumple. El campo Desarrollo de la home lee `alt` de obra-v3.json para Combeau y Verifica y Cumple: escritos a mano, esas dos capturas tenían otro alt en Desarrollo web. Medido a 1440: cada archivo de obra tiene un solo alt en las 9 rutas. Bajo 1024 px, el `<picture>` del campo pinta el mockup en teléfono con el alt de la captura plana, porque un `img` tiene un solo alt. Las dos variantes nombran la misma portada y el mismo titular (fila del 6-oct, «más o menos detalle») | regla (antislop C5) | Diego |
| 13-oct | El cierre del índice del blog es el del artículo, botón por botón: «Correr el chequeo» → `/v3/diagnostico/` y «Escríbenos» `--alt` → contacto. «Ver el método» sale y no se conserva como enlace de texto: la fila del 5-oct pide «mismas palabras», y un enlace de más rompería el par. Método sigue en el menú y en el pie. Con esto el cuerpo de `/v3/blog/` vuelve a tener un camino a contacto. La sección queda en el mismo lugar a 1440, 768 y 390, y el segundo botón pasa de 117,7 a 100,6 px de ancho | regla (aplica la del 5-oct) | Diego |
| 13-oct | Código muerto fuera: `src/utils/caja.ts` (y su import en desarrollo-web.astro), `prosa-v3.css` y `campos-v3.css`. Ninguno lo usaba nada y los tres traían reglas contrarias al 5-oct (titulares en MAYÚSCULAS, h1 800, #14110E). Los contrastes de los cuatro campos, que solo vivían en campos-v3.css, pasan al comentario de los tokens en `driftime.css`. El límite de 6 palabras y 34 caracteres sigue en el manual §05; no lo mide ningún script. Medido: 47 HTML y 13 archivos de `_astro` idénticos antes y después | **cierre** (B22, C39, P61) | Diego |
| 13-oct | Un dato no apunta a archivos que no existen, y un archivo de `public/` que nada pide no se publica. Las imágenes se borran **en el mismo commit** que los campos que las nombran, nunca antes (P77 contra C42). Salen de `oferta-v3.json`: img, alt y video de Desarrollo, los img/alt de Visibilidad, Continuidad y Alcance (hero-* de la lista negra) y momentos[0].obra[].img y alt. Salen de `obra-v3.json`: `tira` (los cuatro casos), img, w, h y alt de combeau-modelo y raigal, y mockAlto y altMockAlto de raigal. Se borran 11 imágenes de `obra/` (aplomo, raigal y las nueve de esos campos): 1.071.131 B. `planes` se queda hasta R7. Las filas del 6-oct que nombran `combeau-modelo-alto.jpg` y `combeau-fotografia-ancho.jpg` quedan como historia: esos archivos ya no existen. `altMockAlto` queda en tres casos, no en cuatro: Raigal va en el mockup ancho y no tiene teléfono solo | **regla** (A13, C42, P77) | Diego |
| 13-oct | `paginas-v3.json`, clave `servicios`: la _nota decía «ningún template la lee» y era falso. `servicios/index.astro` lee `breadcrumb` (miga y BreadcrumbList) e `itemList` (ItemList; si falta un servicio, el build cae). Se corrige la nota y salen title, description, h1, lead y secciones, que nada leía. **La clave no se borra** | cierre (C41) | Diego |
| 13-oct | Un comentario no lleva un conteo que envejece: «catorce páginas del v3» pasa a «todas las páginas del v3» (MovimientoV3). El comentario de tipografía de `tailwind.config.mjs` apunta al manual v3.0 §05 y a la regla del 5-oct, sin /v2/* ni pendientes cumplidos | cierre (C40, P78, C37) | Diego |
| 13-oct | En voz manda el manual §08 (persona híbrida: singular para lo observado, plural para lo que se entrega), no `voz-spindlelab`:24 («nunca se mezclan en la misma pieza»), que ya está en la lista de skills desactualizadas del manual. El aviso de `v3/nosotros.astro` lo dice. «Te lo muestro antes de que pagues nada.» se suma al paquete de la bio de Ramón (fila «Reservado para Ramón»): lo pasó al singular una nota que citaba mal el manual, y la publicada dice «Te lo mostramos». El constructor no lo cambia | **regla** (A04) | Diego |
| 13-oct | Manual §07, Movimiento, «Entrada»: hoy solo existe el script de MovimientoV3. La clase `.entra` vivía en `campos-v3.css`, que nada importaba y se borró. Si una página marca `[data-entra]`, la regla va a `driftime.css` con los valores del manual | aclaración | Diego |
| 13-oct | Seis documentos de `marketing/exploracion-rebranding-webdev/` quedaron superados: la auditoría de la referencia (§8 entero), la lectura estratégica, la recomendación del 27-sep, las tres direcciones, la comparación del giro del 29-sep y la nota de titulares. Cada uno lleva arriba una nota de estado que dice qué quedó atrás, por qué decisión y fecha, y remite a esta spec y a `pendientes-traspaso-revisados.md`. El texto original no se reescribe y ninguna nota reabre una decisión. Un documento de exploración que una decisión deja atrás se marca así: no se borra ni se corrige en silencio | **regla** | Mauro, frente E5 |
| 13-oct | «Dos piezas de concepto más» (auditoría §8 punto 4 y pendiente 2 de la lectura estratégica): **cerrado por decisión, no por trabajo**. En el sitio va una sola pieza de concepto, Raigal (`brief-de-obra.md`:144; `marketing/portafolio/README.md`:55). El hueco que iban a llenar, que la fila del campo llegue de margen a margen, es el diferido de fotos de la fila del 6-oct, no piezas nuevas. Si Deslinde entra algún día, lo decide Ramón (README:56, R9) | cierre | Mauro, frente E5 |
| 13-oct | Aclaración: la «dirección A» del §0 es la del par de la compuerta 2 del 2-oct (`fase1-resultado.md`, el instrumento primero), no la «A · Papel» de `tres-direcciones.md` (27-sep). En esa exploración Ramón eligió C, y de ella salió la v3 (`brief-de-obra.md`:15). `/v3/a/`, `/v3/b/` y `/v3/c/` quedan como su registro interno, con noindex. `#14110E` no entra: el lienzo aprobado es `#000` (27-sep) | aclaración | Mauro, frente E5 |
| 13-oct | El pendiente de los h1 de artículo de la entrada v2.0 del manual (historial, :681) lo cerró la decisión del 5-oct: el límite de 6 palabras y 34 caracteres es solo del display. Medido en las 21 rutas a 1440 y 390: 32 h1/h2 de más de 40 caracteres (8 h1 y 24 h2), todos en caja normal y 500. A 390, 9 títulos ocupan 3 o 4 líneas (los 7 h1 de artículo, el h1 de Desarrollo web y un h2 del índice del blog). Si molestan, el ajuste va en el `clamp` de `.d-h1` en `driftime.css` y se anota aquí | cierre (medido) | Mauro, frente E5 |
| 13-oct | En una plantilla Astro, `<!-- -->` se sirve al navegador con lo que diga: se comenta con `{/* */}` (en el frontmatter, `//`). Lo sabía la sesión antigua (el 16,2 % del HTML de su home eran notas internas; traspaso §4) y no estaba escrito en ninguna parte. Medido en el build del 13-oct: 0 en las 21 páginas v3 (solo `/v3/maqueta-inicial/`, 4, de `HeroV2.astro`). La home v2 sirve 12 y `/nosotros/` 2, que no se tocan porque son producción (se van con R1). `npm run verificar` los cuenta como hallazgo en toda página que arma Astro; los HTML de `public/` se copian tal cual y no se cuentan | **regla** | Mauro, frente E6 (rescate de la sesión antigua) |
| 13-oct | `npm run verificar -- --excluir ''` no vaciaba la lista de exclusiones: el `''` se leía como bandera sin valor y las maquetas seguían fuera (con `--prefijo /v3/maqueta-inicial/` barría 0 páginas). Arreglado en `arg()`: ahora barre la maqueta y reporta sus 4 comentarios | aclaración de medición | Mauro, frente E6 |
| 13-oct | Diagnóstico, pantallas bajas (vertical ≤ 600 px de alto, apaisado ≤ 500): **excepción por alto de §4 Herramienta**, aceptada. El instrumento va justo bajo el h1 y la línea pasa debajo (solo `order: 1`: el DOM no cambia y la línea no es enfocable). La miga va a 96 px y, en apaisado bajo 768 de ancho, el campo y el botón van en una fila de 64 px (el `.d-dom` de escritorio, con radio `--r` y el botón a 4 px). Por qué: con el aviso de cookies abierto en la primera carga, el campo o el botón quedaban tapados en 8 de 16 tamaños de esta ruta (320 × 568 y los siete apaisados, de 568 × 320 a 932 × 430). Con el aviso compacto y solo más aire seguía tapado en 5 de 6 apaisados (`aire.mjs`). Ahora son 0 de 16. El protagonista de la plantilla es el instrumento: si la línea lo empuja bajo el aviso, la línea cede. Fuera de esas alturas no cambia nada (375 × 667, 390 × 844 y 1440 × 900 dan las mismas cifras antes y después). §4 Herramienta queda: «h1 60 px + una línea → el instrumento o el formulario como protagonista (en pantalla baja: h1 → el instrumento → la línea) → secciones pegajosas de apoyo» | **regla** (desvío de §4 aceptado como excepción por alto; construido en E1, QA 13-oct menor 2) | Lucía |
| 13-oct | Diagnóstico, pantallas bajas: **con un resultado pintado, la línea sale de la vista**. Con `order: 1` la línea va después de todo `.d-instr-diag`, y `#chq-out` está dentro de ese bloque. Al correr el chequeo, «Pon tu dominio y revisamos…» quedaba bajo el remate del resultado («Pedir el diagnóstico» / «Prefiero hablarlo contigo»), a 5,4 pantallas a 320 × 568, 4,8 a 360 × 592, 6,9 a 568 × 320 y 5,3 a 844 × 390: una instrucción suelta después del paso de conversión. Arreglo, en la misma media query de `diagnostico.astro`: `.d-cab-diag:has(#chq-out:not(:empty)) .d-linea` con las propiedades de `.d-sr`. La línea queda visualmente oculta y sigue en el árbol de accesibilidad en su lugar del DOM, antes del instrumento. No va con `display: none`, y tampoco vuelve arriba, porque correría el formulario entre 72 y 120 px en el instante en que aparece el resultado. Medido inyectado: oculta tras el resultado en los 6 tamaños bajos, y el resultado cierra contra la imagen a 40 px, como en pantalla alta. 375 × 667, 390 × 844 y 1440 × 900 no cambian. Si un segundo intento da error después de un resultado, la línea sigue oculta, y se acepta así porque el aviso de error se explica solo. `v3-chequeo.js` y los ids chq-* no se tocan | **regla**, **pendiente** de que Diego la aplique | Lucía |
| 13-oct | Índice del artículo: **si algún h2 del post trae número propio** (`/^\d+[.)]\s/`, hoy solo fintechs), **el índice no numera ninguna fila**. La columna del contador queda vacía (espacio duro), para que el título arranque en la misma x en los siete artículos y cada fila conserve su alto. Se decide por artículo y no por h2, y esto reemplaza la instrucción de quitarlo solo en los h2 numerados. Numerar únicamente los h2 sin número dejaba un «08» bajo «1.» a «7.»: dos numeraciones en la misma lista, y un octavo ítem bajo un h1 que dice «los 7 problemas que más se repiten», cuando «Autodiagnóstico en 10 minutos» no es el problema 8. La numeración es del contenido o del índice, nunca de los dos | **regla** | Lucía |
| 13-oct | Índice del artículo en pantalla baja: `.d-indice-art` deja de pegarse con `(max-height: 679px)`, el mismo corte de `.d-campo` y de la banda del índice de servicios. Reemplaza la propuesta de la fila «Hallazgo al medir el foco» (`.d-eti` bajo 500 px): con 500 seguían tapadas las filas a 1280 × 600 y 1280 × 650, y de las etiquetas pegajosas solo el índice es una lista alta. Medido con Tab y el aviso abierto en los 7 artículos: 0 de 45 filas tapadas a 844 × 390, 932 × 430, 1280 × 500, 600, 650, 679 y 680, 1024 × 680 y 900 × 680 (antes 20, 15, 7, 2 y 1). A 1440 × 900 sigue pegado en 120. Queda abierto: entre 768 y ~880 de ancho el aviso mide 134 px, y con 680 a 749 de alto quedan 1 o 2 filas bajo él, igual que antes | **regla** (cierra el menor 1 de la QA del 13-oct); el residuo, **pendiente** | Diego, medido por Javiera |
| 13-oct | Panel del menú con el aviso abierto: `#menu-overlay .menu-nav` lleva `padding-bottom: var(--d-bajo-aviso)`, y `--d-bajo-aviso` es la única tabla de altos del aviso (96, 152, 146, 164, 86 y 150 px) para el `scroll-padding-bottom` y para el panel. Con scroll al fondo, todo el panel queda 18 a 19 px sobre el aviso (antes «…leerlo.» quedaba 6 px bajo él a 1280 × 650, 19 a 568 × 320 y 80 a 98 en celular vertical). Las filas no se mueven, y «08 Contacto» entra sin scroll a 1280 × 650 y 1366 × 657, con y sin aviso. Corrige la fila del menú del 13-oct: «sin scroll en el panel» vale solo con el aviso cerrado. Con el aviso abierto, el panel hace 25 px de scroll a 1280 × 650 y 18 a 1366 × 657 | **regla** (cierra el menor 5) | Diego, medido por Javiera |
| 13-oct | La regla de Lucía «con un resultado pintado, la línea sale de la vista» quedó aplicada (f293700) y medida en el build: el `:has()` compilado coincide. En 9 tamaños bajos, la línea se ve al cargar y queda en 1 × 1 con `clip` tras el resultado. Sigue en el árbol de accesibilidad antes del campo, el formulario no se mueve y el resultado cierra a 40 px de la imagen (antes 134 a 182). Un error tras el resultado la deja oculta, y un error en el primer intento la deja visible. En las alturas normales es igual que antes. Campo y botón libres en 32 de 32 casos | **regla** aplicada (cierra el pendiente de la fila de Lucía) | Diego, medido por Javiera |
| 13-oct | Limpieza del cierre de la QA. Salen de `oferta-v3.json` `momentos[0].obra`, `obraNota`, `obraRotulo` y `dentro`, que nada lee (`planes` se queda hasta R7). Sale `ALT_ALTO` de `trabajo.astro`, porque el JSON trae `altMockAlto` en los tres casos con teléfono. Sale de NavV3 la regla de `.rotulo`, una clase que no lleva ningún elemento. Medido: las 21 rutas tienen texto, DOM y alts idénticos a la base a 1440 y a 390 | **cierre** (menores 3 y 4) | Diego, medido por Javiera |
| 13-oct | Índice del artículo, residuo del menor 1: **segunda banda sin pegar**, `(min-width: 768px) and (max-width: 899px) and (max-height: 749px)`, sumada a `(max-height: 679px)` en `blog/[slug].astro`. En ese ancho el aviso de cookies parte su texto y mide 134 px, no 78, así que el corte de 680 no alcanzaba (una ventana a media pantalla en un notebook de 1536 × 864 queda en ~768 × 730). Medido con el recorrido de Tab de Javiera (`indice.mjs`) y el aviso abierto en los 7 artículos: 0 de 45 filas tapadas a 768 × 700, 730, 740, 749 y 750, 800 × 700, 850 × 700, 880 × 700, 899 × 700 y 900 × 700 (antes 2 o 1 en esa banda). Sigue pegado en 120 a 768 × 750, 900 × 700, 1024 × 768, 768 × 1024 y 1440 × 900. El comentario de NavV3 que decía «el panel no hace scroll» ahora dice que con el aviso abierto baja 18 a 25 px | **regla** (cierra el residuo de la fila anterior y el menor 2 de la QA exprés) | orquestador |
| 14-oct | **Cierre de las filas transitorias** de textos fijados en la página «hasta que Clara corrija el JSON»: Diagnóstico (5-oct, los cuatro textos), Contacto (5-oct, los seis textos y la respuesta del NDA), el índice de servicios (5-oct, `notaPagina`, `descPagina` y `fueraPagina`), Diagnóstico (6-oct, la meta y la nota «Y cómo medimos si la IA te nombra»), el paso 01 de Contacto (6-oct, pendiente de Clara), Servicios [slug] (6-oct, `PROPIO`, `CAJA` y `CORRIGE`) y Trabajo (6-oct, `LINEA_CORREGIDA` y `RUBRO_CORREGIDO`; `ALT_ALTO` ya había salido el 13-oct). En E8, paso 1 (`28c5d85`), lo que la página escribía encima de una hoja del JSON pasó a esa hoja tal como se veía (la extracción de las 21 rutas dio 0 diferencias contra `63f1e55`), y las plantillas dejaron de corregir el dato. Lo que sigue escrito en la plantilla es texto propio de la página, y ninguna hoja que se lea dice otra cosa: la guía de la entrada de Diagnóstico, «O escríbenos directo a» y los rótulos del formulario de Contacto, y «Lo que pones tú» con su pie en el índice. El pase de voz revisó los dos casos con su fuente, puntero o ancla (fila siguiente; por ejemplo #617, #582 y #795, que se mantienen). El paso 01 de Contacto quedó en `paginas-v3.json#/contacto/secciones/1/bloques/0/d`: «Un correo con tu URL basta. Si quieres, cuéntanos qué vendes y qué te preocupa de tu sitio.» Lo que la fila de Servicios dejaba «para Clara en el JSON» (una serie de tres por página y los dobles de Visibilidad y de Redes) lo cierra la revisión de conjunto de `e8/copy-secciones.md`. **Queda escrito, no abierto:** `paginas-v3.json` guarda hojas que ninguna plantilla lee, con el texto viejo (`lead` y los `parrafos` de Contacto; `lead`, `secciones/0/bloques`, parte de los `parrafos` y `secciones/4` de Diagnóstico). No se borran (plan E8, paso 1) y la cabecera de cada plantilla las nombra: para saber qué dice el sitio se lee la plantilla antes que el JSON. **Punto 4 de la fila de la revisión cruzada (6-oct):** el servicio se llama «Visibilidad en IA», sin «(AEO/GEO)», en el h1, la miga y su BreadcrumbList, igual que en el menú (Clara, `e8/hoja-de-voz.md` 2.11; Simón lo aprobó sin veto). «AEO/GEO» se queda donde hace trabajo de búsqueda: el title, la meta, `serviceName`, `serviceType`, el nombre del `OfferCatalog` y la pregunta «¿Qué es AEO y GEO?». Los puntos 1 a 3 de esa fila siguen como estaban (el 1 es R2) | **cierre** | Mauro, E8 paso 9 |
| 14-oct | **Pase de voz de Clara sobre todo el copy nuevo del v3** (E8; P0.3 de `lista-publicacion.md`), aplicado en la rama y sin publicar. Cubre el 100 % de lo abierto: las 851 ranuras no cerradas del inventario y 35 filas nuevas del encargo de la oferta de Marco, 886 filas, cada una con su motivo, también las que se mantienen. **141 cambian** y se aplicaron todas: en los JSON, por puntero y con la aserción valor = texto de hoy (104 hojas, 4 de ellas nuevas; tres hojas las comparten dos filas), y en las plantillas, 34 reemplazos exactos que calzaban una sola vez, `v3-chequeo.js` incluido (`?v=3` en sus dos referencias). 690 se mantienen, 54 esperan R2 y 1 es un dato a verificar. Commits `3877e51`, `2dbaa09` y `eaa0c33`, sobre la migración `28c5d85`; arreglos de la QA en `f0d911c`. **Reglas del pase:** una sola forma por oferta (mini-diagnóstico, «Auditoría + Visibilidad en IA», plan, servicio); una serie de tres por página; ninguna promesa de cita en un modelo; los motores según lo que el verbo puede comprobar (acceso de robots, que el chequeo prueba en vivo: ChatGPT, Claude y Perplexity; lo que se pregunta a mano o trabaja un servicio pagado: ChatGPT, Gemini y Perplexity; hoja de voz 2.12); ninguna cifra sin fuente ni singular nuevo de la marca; tuteo sin voseo, «aquí» y no «acá» fuera de lo cerrado, y cero rayas. Medido: la cadencia no cambia (51 y 51 contando `v3-chequeo.js`, 49 y 49 sin él), «acá» 3 y 3 (las del artículo de los 21 chequeos), raya 0, y precios, `name`, `chq-*` y las 40 zonas cerradas iguales. **Decisiones de Ramón del 14-oct, aplicadas:** Resultado · Plazo · Condición una vez por página; el mini-diagnóstico le pregunta a ChatGPT, Gemini y Perplexity (#617, #639 y #1440 sin cambio); la prueba de Verifica y Cumple con el chequeo de la Ley 21.719 (36 el 9-sep, 73 el 21-sep y 100 el 14-oct, con la forma de puntuar dicha), en su ficha de Trabajo y fuera del JSON-LD; el compromiso de los 3 meses en Visibilidad y en Acompañamiento, con sus dos ajustes (el sitio que ya parte en 100 y el acceso a donde se configuran los robots) y sin decir qué pasa si no se cumple; la meta de la home de Simón y Clara (#50), que revierte `a70e945`. **Parches nuevos que dejan de calzar en silencio si su texto cambia** (acta, ronda 2, observación 3): la frase «chequeo gratis» en `ENLACES` de `servicios/[slug].astro` (enlaza el compromiso, al que R2 le suma una frase al final) y los dos espacios duros por `.replace`, en el h2 del cierre de Redes (`[slug].astro`) y en la primera pregunta de Contacto (`contacto.astro`). Quien cambie esos textos revisa el parche en el mismo commit. **Queda:** R2 (54 filas, con el texto listo en el anexo A de `e8/copy-secciones.md`), R4 y R7 (anexo C), el plazo de la Auditoría + Visibilidad en IA y desde cuándo corren las ~2 semanas de la Auditoría de Visibilidad; las confirmaciones sobre texto ya aplicado, arriba en `e8/e8-antes-despues.md`; y, antes de publicar, volver a correr el chequeo de la Ley 21.719 sobre la vista previa para la frase del 100 | **regla** (el copy del v3 sale del JSON y pasó por voz; los parches nuevos quedan nombrados) | Clara (copy), Diego (aplicó), el crítico de voz y Simón (revisión) |
| 14-oct | **QA del pase de voz** (`e8/acta-qa-E8.md`), Javiera en contexto limpio y con builds propios. **Ronda 1** (`8417701`): aprobado con reparos, 6 menores y ningún bloqueante. El reparo: `e8-antes-despues.md` no le mostraba arriba a Ramón lo que tiene que confirmar sobre texto ya aplicado. Diego lo arregló en `f0d911c` (el enlace de «chequeo gratis» en el compromiso, dos espacios duros y el comentario del `?v=3`) y en `f57f227` (las nueve confirmaciones). **Ronda 2** (`ad7fea5`): **aprobado**, sin ronda 3. Lo medido: 245 de 245 diferencias contra `migrado.json` salen de una fila «cambia», 141 de 141 filas están en el sitio, las 40 zonas cerradas tienen el mismo hash, los precios, `name`, `chq-*` y JSON-LD son iguales (21 de 21 rutas parsean, con FAQPage, BreadcrumbList y HowTo iguales a lo visible) y `verificar` sale sin hallazgos a 390, 768 y 1440. **Quedan dos menores, ninguno del constructor:** (1) en la prueba de Trabajo, «como si el aviso de cookies frena…» tropieza en voz alta; Clara le propone a Ramón «por ejemplo, si…» antes de P0.4 (confirmación 9). (2) La prueba alarga solo la ficha de Verifica y Cumple, y los enlaces de la fila de dos de Trabajo quedan descuadrados: 202 px a 768, 148 a 1024 y 185 a 1440 (antes 0, 27 y 0). Lucía no lo decidió antes de este paso, así que pasa a Ramón como confirmación 10, con las dos salidas: alinear el enlace al pie de la ficha (columna flex con `margin-top: auto` en `.d-pie-trab__enlace`) o aceptar el descuadre (a 1024 ya había 27 px, y ninguna regla de esta spec pide la alineación). Mientras tanto queda declarado aquí. **Medido en este paso:** la vista previa (`claude-magical-franklin-ckfk.spindlelab-v2.pages.dev`) responde 200 con `x-robots-tag: noindex` en `/v3/` y en `/v3/servicios/visibilidad-en-ia/`, y ya sirve el compromiso con el enlace de `f0d911c` | **cierre** (QA del pase); el descuadre de Trabajo, **pendiente de decidir** (Ramón) | Javiera; registra Mauro |
| 15-oct | **Cambio de referencia (E10).** Ramón vio el tablero de E9 (las dos direcciones para las interiores, `tableros/e9-interiores/`, `d13b571`) y no le gustó ninguna: «es buena la construcción, pero la línea creativa no me gustó. La referencia la quiero cambiar». Marcó lo que no le gusta de la línea driftime: **los colores de campo** y que **se siente frío o genérico**, como un estudio o una agencia tech y no como una consultora de confianza para empresas B2B. No marcó el negro ni la tipografía gigante (ni prohibidos ni dados por buenos). El texto se queda: el copy de E8, las ofertas, los precios y el chequeo. **Consecuencias:** el lock `referencia-driftime/lock-driftime.md` queda **reemplazado** (sigue como registro); el tablero E9 queda **descartado** y su Tanda B no se construye; se conservan la estructura Astro, los datos, el texto, lo técnico y las piezas reales de E9 (`e9/piezas/`, que rinden en cualquier paleta). Esta spec rige lo construido hasta que el lock nuevo y la compuerta 2 de E10 la reescriban. **Paso 1 de E10:** 12 referentes reales en 4 líneas (editorial cálida, de autor, documento técnico claro, oscura y cálida), capturados el 15-oct, en `e10/referentes/`, para que Ramón marque sí, no o comentario | **decisión** (Ramón) | Ramón; registra el orquestador |
| 15-oct | **Ramón eligió la referencia nueva (E10, paso 1): The Ready como principal y Gehl como segunda** (`e10/referentes/marcas-15oct.json`, copiadas de la página de referentes). Sus comentarios, tal cual. **The Ready:** «me gusta mucho todo lo que dices que no se toma jajajaj creo que sale harto de lo que he visto. me gusta mucho la guinche, la tipografía y los colores», y aclaró en el chat que la guinche (huincha) es **la cinta que se mueve y también el subrayado amarillo**. **Gehl:** «creo que es un buen acercamiento a lo que quiero. las fotos hay que hacerlas. podemos ocupar modelos de IA. pero me gusta la claridad y lo limpio. me falta creatividad. está siendo casi un sitio típico.» De los otros diez: no a nueve (de Hoare: «parece pastoral gringa») y el Web Almanac sin marcar. **Lo que se lee:** quiere personalidad y juego (la cinta, el marcador amarillo, el color usado con humor y una letra con carácter) sobre una base clara y limpia, y no una consultora seria y típica. Lo que le gustó de The Ready es justo lo que la ficha de la página de referentes ponía en «Riesgo» y dejaba fuera (la cinta y el subrayado amarillo como tics de agencia, la letra sin serif, Saans, y las bandas de color de más abajo), así que el lock nuevo lo toma y le pone reglas para que no se vuelva tic (lock §13). A Gehl le reconoce la claridad y le pide más creatividad. Acepta los colores de The Ready después de rechazar los campos de driftime: el problema no era el color, era el color usado como sistema frío, una banda por pilar. El texto de E8 se queda. **Consecuencias:** el lock nuevo es `e10/lock-the-ready.md` (Lucía, medido en el navegador), que reemplaza a `referencia-driftime/lock-driftime.md`; esta spec sigue rigiendo lo construido hasta que la compuerta 2 de E10 la reescriba. Saans es una letra comercial: la reemplaza Instrument Sans (OFL), con IBM Plex Sans en el cuerpo e IBM Plex Mono en rótulos y botones. Las fotos, en la fila siguiente | **decisión** (Ramón) | Ramón; registra Mauro |
| 15-oct | **Imágenes nuevas: fotos generadas con IA, y personas generadas como ambiente.** Sale del comentario de Ramón sobre Gehl («las fotos hay que hacerlas. podemos ocupar modelos de IA») y de lo que decidió en el chat. Las fotos se generan con Nano Banana (Gemini, `gemini-2.5-flash-image`) o con GPT (`gpt-image-1`), con **la clave de API de Ramón** (`GEMINI_API_KEY` u `OPENAI_API_KEY` en la configuración del entorno; nunca en el chat ni en el repo). Como la clave solo la toma una sesión nueva, se generan allá (`marketing/encargos-otras-sesiones/encargo-e10-fotos-ia.md`), con la pauta de Bruno (`e10/fotos/pauta.json` y `pauta.md`) y `e10/fotos/generar.mjs`, que no gasta sin `--tope` y no genera si la pauta no calza con los espacios del tablero. **Regla de personas** (manual §07b, reemplaza la línea de la decisión 6 del 7-oct): puede haber personas generadas como **ambiente**, gente anónima trabajando en su propia empresa, y **nada puede presentarlas como el equipo de SpindleLab ni como clientes**. En la práctica: sin nombre, pie ni etiqueta de lugar o empresa; sin escena de asesoría; nadie posa ni mira a cámara; ninguna en la sección «Quién», en Nosotros, junto al retrato de Ramón, en Trabajo ni junto a una obra, una cifra, un testimonio o un caso; el alt nunca dice «equipo», «cliente» ni «nuestro». Ninguna foto va al sitio sin que Ramón la vea. **Revierte, solo para fotos, la línea «Nada de generación pagada» del §0.3 (5-oct)**; los mockups siguen compuestos con lo que hay. Entra al §5 cuando esta spec se reescriba después de la compuerta 2 | **regla** (Ramón) | Ramón; registra Mauro |
| 16-oct | **El logo y la regla del oro quedan abiertos.** Ramón: «no te preocupes por el logo de la marca, es muy probable que lo tenga que cambiar por la nueva imagen del sitio». El wordmark (Gabarito con el punto `#C9A227`) y la regla de un solo oro por vista **no son restricción** para las direcciones de E10 ni para sus fotos: **el logo se rediseña después de elegir dirección**, con la imagen nueva del sitio. Qué cambió con esto: en el tablero salió «Dónde va el punto dorado» (las opciones A y B) y quedó una nota corta, «El logo, después»; el lock §12 (la guarda del resaltador contra el oro) pasa a ser historia; la pauta de fotos ya no prohíbe dorado, amarillo ni madera, y ninguna foto se descarta por oro (`generar.mjs` lo sigue midiendo, solo como dato); Javiera dejó de medir oro desde la ronda 2. **Lo construido no cambia:** las filas de este §7 que aplican la regla del oro (5-oct: `hilos.jpg` sin la línea de oro y `oro1 = 1`; 6-oct: `hilos.jpg` sin píxeles cerca del oro) siguen describiendo el build de `spindlelab-astro/` hasta que la compuerta 2 y el logo nuevo las reemplacen. El manual de marca lleva arriba la nota de que el wordmark y la regla del oro están en revisión | **decisión** (Ramón) | Ramón; registra Mauro |
| 16-oct | **E10, paso 2: lock de The Ready, dos direcciones y pauta de fotos, aprobados por Javiera en la ronda 3** (`e10/acta-paso-2.md`). **Qué se hizo:** Lucía midió The Ready en el navegador (la home, `working-together`, un caso y `who-we-are`, a 1440 y 390) y de Gehl solo lo que Ramón marcó (la claridad, el aire y la foto a sangre), en `e10/lock-the-ready.md`, con su JSON y sus capturas en `e10/lock/`. Instrument Sans va a 540, peso elegido con una prueba contra Saans (lock §11). Paleta propia: papel `#F7F5F0`, una sola tinta ciruela `#341F34` y el resaltador `#EEF26E`. Dos direcciones sobre el HTML del build y con el texto de E8, en la home, Acompañamiento mensual y Trabajo: **Taller** (The Ready a fondo: la cinta, el resaltador, una banda del resaltador por página, marcas de revisión y fotos de gente a sangre) y **Pizarra limpia** (la letra y los colores de The Ready como acento sobre la columna y el aire de Gehl; la cinta solo en la home). El tablero (`tableros/e10-direcciones/tablero.html`) muestra lo que la elección cambia del manual (lock §15) y 9 espacios de foto marcados (F1 a F7, y F8 una vez por dirección). Bruno escribió la pauta de 9 fichas, todas de prioridad 1, y `generar.mjs`. **QA, tres rondas, Javiera en contexto limpio.** Ronda 1 (`6fdd8a1`), **rechazado**: la pauta y los espacios no hablaban de las mismas fotos (bloqueante); dos fichas con proporción y encuadre ajenos a su espacio, el tablero no mostraba lo que cambia del manual, el hero había invertido el orden del sitio (el instrumento va primero, §0.4), Pizarra era genérica del hero para abajo y Taller tomaba recursos de The Ready tal cual (5 mayores); 6 menores. Ronda 2 (`d4b82c8`), **aprobado con reparos**: `--verificar` terminaba en código 2 porque la pauta se había desfasado del tablero, y la escala display no cabía entre 390 y 1440 ni a 360 (2 mayores); 5 menores, 3 de ellos con dos rondas abiertos. Ronda 3 (`990b91d`), **aprobado**: los once cierres declarados, medidos con scripts propios, están cerrados; el texto es igual al de `dist/v3` en 12 de 12 vistas (la única diferencia, «· Cookies», está declarada); 84 vistas (6 páginas × 14 anchos, de 360 a 1920) sin desborde ni texto fuera de su caja; contraste sin fallas en 3.844 nodos (mínimo 6,24:1); la cinta a 30 px/s, pausable con teclado y quieta con movimiento reducido; los 18 espacios de foto calzan al píxel con `espacios-foto.json` y con `pauta.json`; `generar.mjs --verificar` termina en código 0 y, sin clave, falla limpio (código 2, sin red y sin escribir nada); el tablero cumple el contrato del Artifact (49 imágenes, 10,45 MB). Nada que escalar a Ramón. **Queda abierto:** (1) el menor de la ronda 3, de Lucía: la flecha del chequeo de Taller (`.t-instr::after`, `taller.css:48`) se corta entre 1024 y 1258 px bajo el `overflow-x: clip` del body; se cierra en esta spec al reescribirla (dónde va la flecha en ese tramo, y `anchos.mjs` midiendo también con el clip apagado). (2) Sin severidad: el lock §13 dice «9 marcadores por dirección, 8 cierran su oración» y Pizarra tiene 8 y 7; el comentario CSS de `tablero.html` (líneas 6 a 9) todavía nombra el punto dorado. (3) La spec tiene que decir de qué tamaño se sirven las fotos en tableta: de 600 a 1023 px, F1, F5 y F7 van a todo el ancho, y un archivo de Gemini cubre 1× a 768, no 2×. (4) E10 no tiene `brief-de-obra.md` ni `desvios.md`: Javiera usó como criterio la verificación del plan; se escriben antes de construir la dirección elegida. (5) Las fotos: encargo a la sesión con clave. (6) La compuerta 2: Ramón elige Taller o Pizarra limpia, los colores (los propios o los exactos de The Ready) y los cambios del manual de «Lo que tu elección cambia»; después se reescribe esta spec con el lock nuevo | **cierre** (paso 2, QA aprobada); (1) a (6) **pendientes** | Lucía (lock y direcciones), Bruno (pauta), Javiera (QA); registra Mauro |
| 16-oct | **Fotos por tramo** (cierra el (3) de la fila anterior; el (1) y el (2) se cerraron en el lock §13 y §18). En cada tramo se sirve un archivo que cubre dpr 2 en su ancho más grande. Para F1, F5 y F7 (4:5 a todo el ancho de 600 a 1023 px) los tamaños en css y en px están en `e10/lock-the-ready.md` §7, «Tamaño de archivo por tramo»: 2048×2560 en tableta. Ningún proveedor llega sin escalar; el cambio de la pauta es de Bruno | **regla** | Lucía (observación de Javiera, ronda 3) |
| 16-oct | **Cambio de dirección (E12): estudio de diseño y tecnología, «laboratorio digital», con Koto como referente y Accept & Proceed como segundo.** Ramón pegó un brief de sistema de diseño y un segundo texto, y respondió cuatro preguntas (textual en `e12/insumos-ramon-16oct.md`): **(1)** posicionamiento: estudio de diseño y tecnología que también hace SEO técnico y visibilidad en IA; esos servicios y el chequeo quedan como la parte «Logic» que se puede comprobar, y precios y oferta siguen iguales a `oferta-v3.json` y `servicios-v3.json`; **(2)** stack: Astro + Tailwind + Motion, no Next.js; se conserva lo construido (chequeo, formularios, `verificar`, deploy en Cloudflare); **(3)** casos: solo lo medido, y donde no hay métrica, no se pone; **(4)** Koto manda y el brief orienta: se miden koto.com y acceptandproceed.com, se mantiene la intención del brief y se reemplaza lo que huela a plantilla, diciendo por qué (las cifras de ejemplo de su texto, 40 % y +150 %, no existen y no se usan). **Consecuencias:** E10 (The Ready: Taller y Pizarra limpia) queda **en pausa como historia**, sin compuerta 2; su tablero no se borra, su lock queda como registro y su encargo de fotos con IA, en pausa. E11 (texto) queda **en pausa** antes de escribir direcciones; siguen sirviendo `e11/diagnostico-texto.md` y `e11/material.md`. Esta spec sigue describiendo el build de `spindlelab-astro/` hasta que la compuerta 2 de E12 la reemplace: en este paso no cambia nada construido. Brief: `e12/brief-de-obra.md` (compuerta 1 abierta, cinco preguntas). El giro de posicionamiento va a la troncal: `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` | **decisión** (Ramón) | Ramón; registra Mauro |
| 16-oct | **E12, compuerta 1 aprobada** (16-oct, entre las 19:20 y las 19:45), después de que Javiera aprobara el paso 1 en el cierre exprés de la vuelta 2 (`e12/acta-paso-1.md`, `f248882`). Ramón, con el tablero `tableros/e12-laboratorio/tablero.html` delante: **(1)** las preguntas 1 a 4 del brief van con la opción recomendada («de acuerdo con todo lo que propones»): el mismo comprador, la declaración arriba y el chequeo en la misma pantalla, `/trabajo/` como índice con una página por caso y sin `/laboratorio/`, y Redes y Paid en una línea de la home (su último mensaje fue «no te contesté los 4 puntos»: si siguen abiertas, el paso 2 usa la opción recomendada y lo dice en el tablero); **(2)** Combeau: «no se necesita más permiso. ya lo pedí hace un rato», registrado como lo dice él, sin respaldo escrito en el repo; **(3)** **Praxi entra como caso** («podría entrar praxi como caso ya que creó un sitio y una app»), desde un clon de solo lectura, sin commit, push ni tocar su producción; **(4)** los casos, con la estructura medida de Koto («hacer los casos como los hace la referencia»); **(5)** **cuatro piezas de concepto** (industrial B2B, clínica, estudio legal y servicios) con identidad, sitio y movimiento, rotuladas «Concepto» con las reglas de `marketing/portafolio/README.md` («no solo es poner cosas medidas si no que también mostrar el nivel de trabajo que puedo llegar a hacer»); **(6)** **base negra como Koto, con juegos de blanco u otros colores en páginas o secciones interiores** («tomar el negro, pero así como muestra el sitio, también hay juegos con sitios interno con blanco u otros colores»), que reemplaza el claro del paso 1; **(7)** **el manual de marca antiguo deja de regir el diseño del sitio** («en diseño regirse por la referencia. el manual antiguo se olvida. ahora tenemos que cambiar»): el oro `#C9A227` y su regla, Gabarito e Inter y el wordmark actual no obligan, y la identidad nueva sale de E12; **(8)** una letra por dirección, **A Google Sans Flex** y **B Mona Sans**, con **DM Mono** en las dos; **(9)** Bruno trae **dos o tres caminos de wordmark** a la compuerta 2. **Consecuencias para esta spec:** sigue describiendo el build de `spindlelab-astro/` (driftime) hasta que la compuerta 2 de E12 la reemplace, y en el paso 2 no cambia nada construido: los prototipos van en `tableros/e12-direcciones/`. Las filas de este §7 que aplican el oro, Gabarito o los campos de color siguen siendo historia del build de hoy, no regla para E12. Dos datos que el paso 2 tiene que resolver: el cobalto `#0029FF` sobre el negro de Koto (`#060606`) da 2,66:1, bajo el 3:1 de una forma, y el juego de color no puede ser un campo de color por servicio, que es lo que Ramón rechazó de driftime el 15-oct. Registro: `e12/brief-de-obra.md`, sección «Compuerta 1»; encargo del paso 2: `e12/encargo-paso-2.md`; aviso a la troncal: `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` §5 | **decisión** (Ramón) | Ramón; registra Mauro |
| 19-oct | **E12, compuerta 2: Ramón eligió A · Archivo** (19-oct, a eso de las 09:50, con el tablero `tableros/e12-direcciones/tablero.html` delante y el acta del paso 2 aprobada en la vuelta 2, `70d7c23`): Google Sans Flex con DM Mono 500 sobre el lienzo `#060606`, y el trabajo carga la pantalla; **logo: camino 2, «El huso»**, monocromo, en Google Sans Flex wght 600; **hero 3** («hero-sitio» de `e12/texto/texto-paso2.md`); **la portada de la home es el video del hilo de oro del sitio actual** (`spindlelab-astro/public/hero-hilo-de-oro.mp4`), en el lugar del showreel de Koto, como **desvío autorizado** de la regla de solo trabajo real, con versión VP9/WebM y un H.264 más liviano, botón de pausa, velo `#060606`, contraste de la frase medido sobre el video y quieto con movimiento reducido; ninguna generación pagada; Praxi y Combeau como casos reales. Por defecto (no contestó): los puntajes propios no se muestran, el círculo del cursor es blanco, ninguna interior con el lienzo claro y a Combeau se le recortan sus medidas personales. B · Banco queda como historia. **Consecuencia para esta spec:** Lucía la reescribe para E12 sobre A en esta misma corrida; desde ahí describe lo que se construye, y las filas anteriores de este §7 quedan como historia del build de driftime. Los defectos 22 y 23 del acta del paso 2 se cierran en ella. Registro: `e12/brief-de-obra.md`, sección «Compuerta 2»; textual: `e12/insumos-ramon-19oct.md` | **decisión** (Ramón) | Ramón; registra Mauro |
| 19-oct | **E12: la spec se reescribe sobre A · Archivo** (§0 a §6; la de driftime pasa entera, sin cambios, a `spec-visual-driftime.md`). Lo que fija y el prototipo no tenía: la portada con el hilo de oro de Bruno, con un velo `#060606` que nace con el texto (0 → 0,88 en 160 px → `#060606` en el borde), medido contra los 121 cuadros del bucle en 11 tamaños: 0 líneas bajo el mínimo, la peor 5,31:1 (sin velo, 1,03:1); bajo 834, una franja 16:9 y el `h1` a 26, para que el chequeo entre a 360 × 800 (botón a 52 px del borde); la cinta como primera sección, 16:9 exacta y rehecha sin el tramo de Combeau con sus medidas; las barras laterales desde 1194 y no desde 1024 (Koto, medido entre cortes); el tope de 493 px del cuerpo en todos los anchos (el prototipo llegaba a 142 caracteres por línea a 1023); techos de campo por tipo de página (caso 10 a 35 %, índice ≤ 35, home ≤ 20, interiores ≤ 5 y la franja nunca es campo: cierra el defecto 22, y Desarrollo web cambia Doceavo por Combeau en la franja); el borde del campo `#707070` (1.4.11); H.264 en todo video; Motion 13.5.0 exacto; Lenis sin efecto con `data-lenis-prevent` y los enlaces internos con su ruta, sin tocar el `Layout` (medido: la rueda vuelve a 54 ms), y la pregunta a Ramón por una prop del `Layout`; el logo El huso, sin el giro de la tortera. Los defectos 20 y 21, aplicados; el 23, corregido en `direccion-a.md` §9.2. Herramientas y datos, en `e12/spec/` | **regla** (toda la spec) | Ramón, compuerta 2; escribe Lucía |
| 19-oct | **Ramón aprobó la propuesta de §0.5** («Sí, agrégalas», textual en `e12/insumos-ramon-19oct.md` §5): cinco props opcionales en `Layout.astro` (Lenis, letras precargadas, `theme-color`, favicon, `#org`/`jobTitle`), con valor por defecto igual al de hoy, que solo pasa `/v3/`. Las páginas publicadas salen **iguales byte a byte** (`diff` del `dist/` de esas rutas antes y después); gtag, consentimiento y Pixel no se tocan. Con eso, en A Lenis no se crea, solo se precargan Google Sans Flex y DM Mono, `theme-color` es `#060606` y el favicon es El huso `?v=5`. Las reglas de §5.2 (`data-lenis-prevent` y enlaces con su ruta) quedan como resguardo. La prohibición de §6.16 sobre `Layout.astro` se lee con esta excepción, y nada más | **regla** | Ramón, a la pregunta de Lucía |
