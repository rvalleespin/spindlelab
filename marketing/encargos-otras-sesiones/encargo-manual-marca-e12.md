# Encargo · El manual de marca nuevo, desde la obra E12 (A · Archivo y el logo El huso)

**23-oct-2026, 17:00 (Chile) · De:** el estudio web (Mauro, cierre de la obra E12) · **Para:** la troncal (Tomás) ·
**Rama:** `claude/magical-franklin-ckfki2` (nada de esto está en `main`) · **Nada publicado:** el sitio vivo sigue con la
identidad vieja hasta que Ramón decida la publicación del v3 (R1).

Es el encargo que anunciaron `encargo-troncal-giro-laboratorio.md` §5 y §6: «cuando esté elegida, el estudio web te
deja un encargo con la letra, los colores con su rol y contraste, y el logo, para que el manual nuevo se escriba desde
ahí». La identidad ya está elegida, especificada, construida en el sitio v3 y revisada por Javiera en contexto limpio
(`marketing/oficina/obras-web/spindlelab-v3/e12/acta-obra.md`, vuelta 2: Con reparos, `f3044fc`; los dos reparos no
tocan la identidad).

## 0 · En corto

- **Letra:** Google Sans Flex (titulares y cuerpo) y DM Mono 500 (rótulos y datos). Ninguna otra.
- **Color:** lienzo negro `#060606`, blanco y un gris. **La interfaz no tiene color:** el color lo trae el trabajo que se
  muestra. Sin oro, sin cobalto, sin color por servicio.
- **Logo:** «El huso», la «i» de SpindleLab dibujada como un huso de hilar, monocromo, en tres cortes por tamaño.
- **Dejó de regir en diseño** el manual antiguo: el oro `#C9A227` y su regla, Gabarito, Inter y Manrope, el wordmark
  con punto, el monograma `S.`, la paleta «Tinta editorial» y los campos de color de driftime.
- **Sigue:** la voz, cero prueba social inventada, ningún prospecto nombrado sin permiso, ninguna raya usada como golpe
  y la revisión humana antes de publicar.
- **Lo que decides tú con Ramón** está en §6: quién escribe el manual y cuándo rige, y qué pasa mientras tanto con lo
  que ya circula.

## 1 · Qué decidió Ramón, y de dónde sale

Las citas son lo que Ramón escribió en su conversación con la sesión que orquesta el estudio web, copiado por esa
sesión: **no hay un documento suyo en el repo**. Confírmalo con él antes de llevarlo a un documento de nivel 1 a 3.

| Fecha | Lo que decidió | Su texto | Registro |
|---|---|---|---|
| 16-oct (compuerta 1) | En diseño manda la referencia (Koto); **el manual antiguo deja de regir el diseño del sitio** | «en diseño regirse por la referencia. el manual antiguo se olvida. ahora tenemos que cambiar» | `obras-web/spindlelab-v3/e12/brief-de-obra.md`, «Compuerta 1», punto 7 |
| 16-oct (compuerta 1) | Base negra como Koto | «tomar el negro, pero así como muestra el sitio, también hay juegos con sitios interno con blanco u otros colores» | ídem, punto 6 |
| 16-oct (compuerta 1) | Una letra por dirección: A, Google Sans Flex; DM Mono en las dos | (sin cita) | ídem, punto 8 |
| 19-oct (compuerta 2) | **Dirección A · Archivo** | «1 A» | ídem, «Compuerta 2», punto 1; textual en `e12/insumos-ramon-19oct.md` |
| 19-oct (compuerta 2) | **Logo: camino 2, «El huso»** | «2 dos» | ídem, punto 2 |
| 19-oct (compuerta 2) | El logo, **monocromo**; el círculo del cursor, **blanco** | (no contestó; quedaron por defecto, como se le dijo) | `insumos-ramon-19oct.md` §3, preguntas 9 y 10 |
| 19-oct (compuerta 2) | La portada de la home es **el video del hilo de oro del sitio actual**, como excepción a la regla de mostrar solo trabajo real | «para la portada, re usar el video del sitio actual (hilo dorado)» | ídem, punto 4 |

**Supuesto, reversible en una línea:** «en diseño» limita la decisión al aspecto (letra, color, logo, forma, imagen). La
voz y las reglas de contenido no se tocaron.

## 2 · La letra, con sus roles

Dos familias, las dos libres (SIL OFL 1.1) y las dos en Google Fonts, de donde se bajaron.

| Archivo en el sitio | Qué es | Peso | Licencia |
|---|---|---|---|
| `spindlelab-astro/public/fonts/google-sans-flex-latin.woff2` | Google Sans Flex variable, subconjunto latino, ejes de ancho 25–151 y de peso 100–1000 | 118.860 B | `OFL-google-sans-flex.txt` (© 2015 The Google Sans Flex Authors) |
| `spindlelab-astro/public/fonts/dm-mono-500-latin.woff2` | DM Mono 500, estático | 14.988 B | `OFL-dm-mono.txt` (© 2020 The DM Mono Project Authors) |

| Rol | Letra y corte | Para qué |
|---|---|---|
| **Display** | Google Sans Flex, ancho 76 %, peso 300 | Titulares (`h1`, `h2`, `h3`), títulos de pieza, el puntaje del chequeo |
| **Cuerpo** | Google Sans Flex, ancho 100 %, peso 370 | Párrafos, entradillas, nombres de pieza, campos |
| **Rótulo** | DM Mono 500, 11 px, MAYÚSCULAS, interletra .03em, interlínea 1,25 | Rótulos de sección, ficha (TIPO · AÑO), menú, botones, la hora |
| **Dato** | DM Mono 500, 12 px, caja normal, .03em, interlínea 1,35 | Valores medidos con su fuente (fechas, identificadores) |
| **Logo** | Google Sans Flex peso 600, **dibujado en SVG** | El logo no carga la letra: es un contorno (§4) |

**Reglas que hacen la identidad, más que la letra misma** (spec §1.2 y §1.3):

- **Cero negrita.** Ningún texto pesa 600 o más; el énfasis es la segunda tinta, no el peso.
- **Mayúsculas solo en la mono.** Nada en mayúsculas en Google Sans Flex.
- **Dos tintas en una frase:** la parte en blanco hasta 8 palabras y la continuación en gris de 6 a 13 («Trabajo. Lo que
  diseñamos y programamos…»). Una por sección.
- **Escala del sitio (1440 → 390):** portada 48 → 26; declaración 38 → 26; título 24 → 23; cuerpo 16 → 15; chico 14 → 13;
  dato 12; rótulo 11. **Piso de todo texto: 11 px.** El cuerpo corre en una caja de 493 px como máximo.
- **El riesgo que Ramón eligió sabiéndolo:** Google Sans Flex es la letra de los productos de Google, en un estudio que
  vende aparecer en Google (`tableros/e12-direcciones/direccion-a.md` §0).

## 3 · Los colores, con su rol y su contraste

**Ningún color más que estos.** Los valores viven en `spindlelab-astro/src/styles/archivo.css` (en `body.a-body`, para que
no alcancen a las páginas de producción). El contraste es WCAG 2.1, calculado desde el hex
(`obras-web/spindlelab-v3/e12/spec/datos/tokens.json`) y medido además en el render (abajo).

| Token | Valor | Rol, y solo ese |
|---|---|---|
| Lienzo | `#060606` | El fondo, siempre. Nunca cambia por página, sección ni estado |
| Placa | `#141414` | Lo que es control o estado: encabezado plegado, menú, barra, pausa, campo, el marco donde espera un medio. Nunca tarjeta ni banda de sección |
| Placa activa · apretada | `#202020` · `#2A2A2A` | Un estado (activa, al pasar el mouse; apretada, al presionar) |
| Blanco | `#FFFFFF` | Lo nombrado y lo activo: titulares, la primera tinta, enlaces, foco, botón claro, el círculo del cursor |
| Blanco al 70 % | `#B4B4B4` compuesto | El menú en reposo |
| Gris | `#989898` | La continuación de la frase, el cuerpo, rótulos y datos en reposo |
| Apretado claro | `#D0D0D0` | El botón claro apretado |
| Línea de sección | `#2D2D2D` | El borde superior de 1 px de una sección o fila. Nunca alrededor de un bloque |
| Línea | blanco al 10 % | Separador entre filas |
| Borde de campo | `#707070` | El borde del campo de texto (WCAG 1.4.11) |
| Hueco | `#4A4A4A` punteado | Lo que falta, dicho como falta (las pantallas internas de Praxi) |
| Velo | `#060606` al 70 % | Las piezas del índice que no tienen el mouse |

| Par | Contraste | Mínimo |
|---|---|---|
| Blanco sobre lienzo · placa · placa activa | 20,26 · 18,42 · 16,29 | 4,5 |
| Gris sobre lienzo · placa · placa activa | 7,02 · 6,39 · 5,65 (el más justo) | 4,5 |
| Blanco al 70 % sobre lienzo | 9,81 | 4,5 |
| Lienzo sobre blanco · sobre gris · sobre `#D0D0D0` | 20,26 · 7,02 · 13,14 | 4,5 |
| Foco (contorno blanco de 2 px) contra lienzo · placa | 20,26 · 18,42 | 3 |
| Borde de campo contra el lienzo | 4,09 | 3 |
| Línea de sección · línea · placa contra el lienzo | 1,47 · 1,23 · 1,10 | decorativas: separan, no informan |

**Medido en el render, no solo calculado:** `npm run verificar` (el contraste real de cada nodo de texto, con las capas
translúcidas compuestas) da **cero hallazgos en las 27 páginas y en ocho anchos**; la frase de la portada sobre el video
del hilo de oro, medida contra sus 121 cuadros, no baja de **5,31:1** en ningún tamaño (acta, vuelta 2, filas 2 y 13).

**Dos cosas que no son color de marca y conviene que el manual diga:**

- **El oro del hilo** vive solo en el video de la portada de la home, como excepción autorizada por Ramón (§1). No es un
  color de la identidad: no va en texto, botones, rótulos ni piezas.
- **El color que se ve en el sitio es del trabajo:** cada caso trae el suyo dentro de su marco (el amarillo de Praxi, el
  azul de Sesenta, el verde de Combeau). La identidad no tiene un color propio que se pueda poner de fondo.

## 4 · El logo: El huso

La «i» de SpindleLab es un huso: la vara es el asta de la letra, atraviesa una tortera dibujada como un disco con canto y
asoma por arriba en una punta que se afina. Google Sans Flex peso 600, en contorno. **Monocromo:** blanco sobre `#060606`
o `#060606` sobre blanco (20,26:1 en los dos). Todo está en
`marketing/oficina/obras-web/spindlelab-v3/e12/logo/final/`, con su `README.md` (manda ese archivo; aquí va lo que el
manual necesita).

**Tres cortes, por el alto al que se ve, no por gusto:**

| Corte | Alto | Archivos | Qué cambia |
|---|---|---|---|
| **Grande** | 40 px o más | `logo-grande-blanco.svg`, `logo-grande-negro.svg` | El dibujo entero, con el filete entre la cara y el canto de la tortera |
| **Menú** | de 18 a 39 px | `logo-menu-blanco.svg`, `logo-menu-negro.svg` | Sin el filete (a 24 px mide 0,4 px y ensucia). Es el del sitio: 24 px desde 834 y 20 bajo 834, y 20 en el pie |
| **Pequeño** | de 12 a 17 px | `logo-pequeno-{blanco,negro}.svg` y `pequeno/` (PNG a 12, 14 y 16 px, con su `@2x`) | La letra en tamaño óptico 12, tortera pegada a la vara y sin punta, interletra abierta. Para pies chicos y la firma de correo |

Bajo 12 px no hay logo: va el favicon o el nombre en texto.

| Para | Archivo |
|---|---|
| El signo solo (avatar, sello, marca de agua) | `signo-blanco.svg`, `signo-negro.svg` |
| Favicon | `favicon.ico` (16 dibujado píxel a píxel, 32 y 48), `favicon-16.png`, `favicon-32.png`, `favicon-48.png`; `favicon.svg` existe, pero el README recomienda no declararlo (a 16 px se ensucia) |
| Teléfono | `apple-touch-icon.png` (180), `icon-192.png` e `icon-512.png` (este es el `logo` de `#org` en el JSON-LD) |
| **Avatar de LinkedIn, Instagram y Google** | `avatar/avatar-cuadrado-1080.png` (el que se sube; la red lo recorta en círculo) y `avatar-redondo-1080.png` |
| **Documentos** (propuestas, cotizaciones, membretes, mini-diagnóstico) | `documentos/spindlelab-{negro,blanco}.svg` y sus PNG de 2400 px de ancho, fondo transparente |
| La lámina para mirarlo todo junto | `lamina-final.png` |

**Reglas de uso:** aire alrededor de al menos la altura de la x del propio logo por los cuatro lados; sobre una foto o un
video, solo si el fondo pasa 4,5:1 detrás del logo; sin oro, sin otro color, sin degradé, sin sombra; no se redibuja, no
se estira, no se le cambia la letra. Cada SVG trae su nombre accesible («SpindleLab»).

**Lo que la prueba dejó dicho** (`final/prueba-tortera/`, lectores en contexto aparte): la tortera ya no se lee como
alfiler ni como cerradura; a veces se lee como seta. La alternativa que lo evita (v8) se lee primero como daga, y quedó
dibujada por si Ramón la prefiere. **El giro de la tortera** está propuesto (`final/movimiento/`) y no entró al sitio.

**En el sitio v3** ya está: el corte menú en línea (`spindlelab-astro/src/components/a/Logo.astro`) y los favicons e
iconos en `spindlelab-astro/public/v3/marca/`, con `?v=5`. El sitio vivo sigue con el wordmark viejo hasta R1.

## 5 · Lo que dejó de regir del manual viejo, y lo que sigue

Hay **dos manuales viejos**, y los dos quedan sin efecto en diseño:

- **v1.3 (julio), el de `main`**: el que hoy usan redes, firmas, mini-diagnóstico y cotización.
- **v3.0 (7-oct), solo en esta rama**, marcado «propuesta en evaluación»: copiaba el sitio en el lenguaje de driftime,
  que E12 reemplazó entero en `/v3/`. Nunca rigió en `main`.

| Deja de regir en diseño | En v1.3 (`main`) | En v3.0 (rama) |
|---|---|---|
| El wordmark `SpindleLab.` en Gabarito con el punto dorado, y sus versiones | §02 | §02 |
| El monograma `S.` | §03 | §03 |
| La paleta («Tinta editorial» `#131A22`, papel `#F7F5F0`, gris pluma; y en redes el sistema live v2 `#0e141b` con petróleo `#2fa99b`) y los cuatro campos de color de driftime | §04 | §04 |
| Gabarito, Inter y Manrope, con su escala | §05 | §05 |
| El punto dorado `#C9A227` y su regla de un uso por pieza | §06 | §06 |
| Forma, componentes, movimiento e imagen | (no tenía) | §07 y §07b |
| Instagram en lo que es aspecto (color por pilar, escala, retícula) | (no tenía) | §10; los formatos y zonas seguras son de la plataforma y siguen sirviendo |
| Lo de aplicaciones y activos que dependa de lo de arriba | §08 | §09 |

| Sigue | Dónde |
|---|---|
| La voz (singular para lo observado, plural para lo que entregamos; tuteo de Chile, sin voseo) | v1.3 §07 · v3.0 §08 |
| Cero prueba social inventada; ningún prospecto ni cliente nombrado sin permiso; ninguna raya usada como golpe; todo lo público pasa por revisión humana | `CLAUDE.md`, «Brand & content rules» |
| La esencia (§01) | Ya estaba en revisión por el giro a estudio de diseño y tecnología: `encargo-troncal-giro-laboratorio.md` §2 |
| **Para decidir** (§6, punto 5): el territorio de campaña «el eje y el circuito» | v1.3 y v3.0 §06b |

## 6 · Lo que decides tú con Ramón

El estudio web no decide nada de esto. Van en el orden en que destraban.

1. **Quién escribe el manual nuevo y cuándo empieza a regir.** La lectura del estudio web, que no es decisión: que rija
   el día que se publique el v3 (R1), porque antes el sitio vivo sigue con la marca vieja y cambiar avatares o piezas
   antes mostraría dos marcas a la vez. Escribirlo puede empezar ya: todo lo de §2 a §4 está medido y en archivos.
2. **Qué pasa con la v3.0 de esta rama** («propuesta en evaluación», driftime): la recomendación es dejarla como historia,
   con una nota de «superado» arriba, sin reescribirla, como se hizo con los documentos superados del v3 (E5).
3. **Cuándo cambia lo que ya circula**, y en qué orden: el avatar de LinkedIn, Instagram y Google (hay archivo listo); la
   firma de correo (el corte pequeño en PNG); el mini-diagnóstico y la cotización (`marketing/plantillas/`, con
   `.claude/skills/cotizaciones/plantilla_generador.py`); las imágenes al compartir y la portada de Facebook
   (`marketing/brand/og-v3/`, `marketing/brand/redes/`); el kit de Instagram (`marketing/brand/instagram-v3/`); y las
   piezas de octubre por publicar. Mientras tanto vale lo que ya decidiste según `encargo-troncal-giro-laboratorio.md`
   §5 (el estudio web leía la opción 1: seguir con lo viejo en lo que circula, sin producir activos nuevos que habría
   que rehacer).
4. **Cómo se traduce A a una pieza de redes.** En el sitio la regla es que la interfaz no tiene color y el color lo pone
   el trabajo dentro de su marco; una pieza de Instagram sin trabajo adentro queda en negro, blanco y gris. El manual
   tiene que decir qué lleva color en una pieza (una captura de un caso, una foto de Ramón, nada) y cómo se traduce la
   escala a 1080. Si lo quieres medido como se midió el sitio, es un encargo nuevo para Lucía (dirección de arte) y
   Bruno (piezas), no algo que se improvise en la primera publicación.
5. **El hilo de oro y el territorio «el eje y el circuito».** En el sitio nuevo el hilo es solo la portada de la home,
   por decisión de Ramón, y el oro no es color de marca. Si las campañas siguen usando el hilo como imagen, o si ese
   territorio se cierra con el manual viejo, lo decides con él.
6. **La configuración que hoy obliga lo viejo** (la cambia Ramón o quien él autorice; cada sesión la lee al arrancar):
   `CLAUDE.md`, «Brand & content rules» (el oro escaso, Gabarito e Inter) y «Render a brand/social asset»
   (`Gabarito.woff2` + `inter.woff2` en cada carpeta de pieza); la ficha `marketing/oficina/clientes/spindlelab.md`; y lo
   que recuerdan Bruno y Cata en sus skills y memorias (`persona-director-creativo`, `persona-social-media`). Si cambian
   las skills, hay que recrear las sesiones largas (`CLAUDE.md`, «Skills are scanned once»).
7. **El favicon y el logo del sitio vivo** cambian con la publicación (R1), no antes; la lista de publicación lo trae.

## 7 · Lo que el estudio web no hizo

- **No tocó** el manual, `CLAUDE.md`, las fichas, el plan, el pipeline ni ninguna pieza de redes, outbound o plantilla.
- **No probó el logo con personas:** la lectura fría de Bruno es simulada (sirve para ver qué se lee en la forma, no
  cuánta gente lo lee así). El favicon en Safari y en la pantalla de inicio de un iPhone real no se vio todavía
  (`obras-web/spindlelab-v3/pendientes-traspaso-revisados.md` §0.2, punto 14).
- **No generó nada:** ninguna imagen nueva ni gasto. La generación para los conceptos espera a que Ramón diga que hay
  presupuesto.

## 8 · Dónde está todo

| Qué | Dónde |
|---|---|
| La spec de la identidad en el sitio (tokens, letra, escala, movimiento, logo) | `marketing/oficina/obras-web/spindlelab-v3/spec-visual.md` §1 y §5.4 |
| El logo, sus archivos y cómo rehacerlo | `marketing/oficina/obras-web/spindlelab-v3/e12/logo/final/README.md` |
| Los caminos que no se eligieron | `…/e12/logo/caminos.md`, `camino-1-la-palabra/`, `camino-3-dos-cortes/` |
| La referencia medida (Koto) | `…/e12/lock-koto.md` |
| Las dos direcciones que vio Ramón | `…/tableros/e12-direcciones/` (A: `direccion-a.md`; B quedó como historia) |
| Cómo se ve construido | `…/capturas/e12/` (27 rutas a 390, 768 y 1440) |
| Lo que queda de la obra, con dueño | `…/pendientes-traspaso-revisados.md` §0 |
| El giro de posicionamiento (lo que cambia en documentos tuyos) | `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` |
