# E12 · Dirección B «Banco» para la compuerta 2

**17-oct-2026, de 01:10 a 02:00 (Chile) · Lucía (dirección de arte)** · rama `claude/magical-franklin-ckfki2` · encargo
del 16-oct, 19:50. **Manda** la sección «Compuerta 1» del brief (los nueve puntos de Ramón), después
`e12/encargo-paso-2.md`, `e12/lock-koto.md` (sobre todo §20 y §21), `e12/inventario-casos.md` e `inventario-praxi.md`.
Texto: `e12/texto/texto-paso2.json` (Clara), tal cual. Nada se publica; `spindlelab-astro/` no se tocó; el repo de Praxi
tampoco (sigue en `a360d7a`, `git status` limpio); cero generación pagada.

## 0 · En una línea

**B pone el dato vivo en lo grande:** la declaración del hero a 88 px en el corte liviano de Mona Sans, el chequeo de
verdad en la misma pantalla como su prueba, la cifra que prueba cada pieza a 54 px, y el índice como una tabla con
filetes donde cada fila abre su pieza y la muestra en un visor fijo a la izquierda. El negro es el de Koto y el color
lo ponen el trabajo y una sola hoja blanca, la de los planes.

**Cómo verlo:** `node proto/b/herramientas/servir.mjs 8791` y abrir
`http://127.0.0.1:8791/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/b/`. Ese servidor
responde `/api/chequeo` con el chequeo de verdad (importa `chequear()` de `spindlelab-astro/functions/api/chequeo.js`
sin tocarlo y sale a la red por el proxy de la sesión). Sin él, las páginas abren igual y el chequeo muestra su error.

| Vista | Archivo | Primera pantalla | Página completa |
|---|---|---|---|
| 1 · Home | `proto/b/index.html` | `img/b-home-1440-primera.jpg` · `img/b-home-390-primera.jpg` | `b-home-1440-1de2…2de2` · `b-home-390-1de4…4de4` |
| 2 · `/trabajo/` | `proto/b/trabajo/index.html` | `b-trabajo-1440-primera.jpg` · `b-trabajo-390-primera.jpg` | `b-trabajo-1440-1de1` · `b-trabajo-390-1de3…3de3` |
| 3 · Caso real: Praxi | `proto/b/trabajo/praxi/index.html` | `b-praxi-1440-primera.jpg` · `b-praxi-390-primera.jpg` | `b-praxi-1440-1de3…3de3` · `b-praxi-390-1de4…4de4` |
| 4 · Caso de concepto: Sesenta | `proto/b/trabajo/sesenta/index.html` | `b-sesenta-1440-primera.jpg` · `b-sesenta-390-primera.jpg` | `b-sesenta-1440-1de3…3de3` · `b-sesenta-390-1de3…3de3` |
| 5 · Interior con el juego de color: Desarrollo web | `proto/b/servicios/desarrollo-web/index.html` | `b-desarrollo-web-1440-primera.jpg` · `…-390-primera.jpg` | `b-desarrollo-web-1440-1de2…2de2` · `…-390-1de5…5de5` |
| Estados | | `b-trabajo-1440-visor.jpg` (mouse sobre Tonela: círculo, fila activa, visor con el video del concepto) · `b-home-1440-chequeo.jpg` (el chequeo corrido) | |
| Recorridos | `video/b-home-1440.webm` (16,8 s) · `video/b-trabajo-1440.webm` (14,9 s), regrabados el 18-oct con las capturas planas | | |

Capturas con Chromium 141 (`/opt/pw-browsers/chromium-1194`): 1440 × 900 a dpr 1 y 390 × 844 a dpr 2, página completa
en tramos de 4.000 px de imagen como máximo, JPEG calidad 82, después de recorrer la página para que cada bloque
llegue a su estado final y con los videos en su póster. 42 archivos, 11 MB.

---

## 1 · Qué es B y en qué se separa de A

| Eje (lock §16 y encargo §1) | **A · Archivo** (la otra dirección) | **B · Banco** (esta) |
|---|---|---|
| Letra | Google Sans Flex | **Mona Sans** en dos cortes: display a wdth 89 · wght 340, cuerpo a wdth 100 · wght 390 (lock §6.2 y §6.4); **DM Mono 500** para rótulos y datos |
| Lo que carga la pantalla | El trabajo, a sangre en su marco | **El dato vivo**: el chequeo, la cifra que prueba cada pieza, la ficha, la hora y lo que pesó tu visita |
| Escala del titular | La de Koto (48 / 38 / 24) | **La declaración a 88 px** (87,84 medido) con interlínea 0,98; la segunda escala, 64, para el titular de página y el cierre |
| Índice | Muro de dos columnas | **Tabla con filetes** (Nombre · Tipo · Año · Con qué está hecho · Resultado, las columnas que escribió Clara para B), con la pieza a la vista en un **visor** pegajoso en el riel al pasar o enfocar la fila |
| Retícula | El muro de Koto | La de Koto (16 / 12 / 8 columnas, margen 16, separación 8) **con el riel de A&P**: las columnas 1 a 4 quedan vacías salvo donde tienen un trabajo (el visor, el conteo, la ficha del caso) |

**Dominante:** Koto, su capa de instrumentos: el reloj con huso, los conteos entre paréntesis, la ficha mono, los
paneles en placa `#141414` (lock §16). **Secundaria acotada, dos cosas y nada más:** de Accept & Proceed, las columnas
vacías y la tabla con filetes de 1 px (lock §3, §7 y §20.7). Nada más de A&P entra: ni su letra, ni su gris de 2,41:1,
ni su cursor, ni su curva de 1,5 s.

**La prueba de que no son la misma dirección con otra letra:** tapa la letra en `b-trabajo-1440-primera.jpg` y en la de
A: en B el índice es una tabla de diez filas con cinco columnas de dato, y la única imagen es un visor de 346 px; en A
el índice es el trabajo. En la home de B la primera pantalla no tiene una sola imagen: la llenan la frase y el panel del
chequeo.

## 2 · Lo que tomé del lock, punto por punto

| Decisión en B | Del lock | Valor |
|---|---|---|
| Lienzo `#060606` en todas las páginas, siempre | §20.2, regla 1 | Medido: 89,9 % de los píxeles fuera de medios son negros (luminancia ≤ 0,01) en la home y 87,8 % en `/trabajo/` (criterio 4: ≥ 80 %) |
| Placa `#141414` solo con rol: encabezado plegado, menú, panel del chequeo, marco de carga de cada medio, la placa de datos del resultado | §20.2 y §14 | Ninguna tarjeta de contenido |
| Placa activa `#202020` solo en la fila de la tabla bajo el mouse o el foco y en la sección activa de la barra de 390 | §20.2 | Gris sobre ella 5,65:1 |
| Señal: opción (a), la de Koto. Lo activo en blanco con un punto de 3 px; cero color de interfaz | §20.4 | El cobalto no aparece |
| Dos tintas en la misma frase, una por sección, con el corte exacto de Clara («tinta» / «gris») | §2.8 y §14 | Blanco 20,26:1 · gris `#989898` 7,02:1 |
| Rótulo mono 11 px MAYÚSCULAS +0,03em; dato mono 12 px caja normal; piso de 11 px | §6.4 y §15 | Medido: ningún texto bajo 11 px en las 10 vistas |
| Cero negrita | §14 | Pesos 340 y 390 en Mona Sans, 500 en DM Mono |
| Interlínea 1,4 en el cuerpo, caja de 493 px | §6.4 | |
| Cursor: círculo **blanco** de 88 px con el texto en `#060606` y anillo de 1 px `#060606`, solo sobre el trabajo, nunca sobre un botón o un campo; dice «Ver el caso» o «Ver el concepto» (Clara) | §8 con §20.4 | Medido: aparece sobre la fila de Sesenta con «Ver el concepto», `cursor: none` solo ahí |
| Teclado: el círculo se esconde con el primer Tab y vuelve solo con un movimiento real del mouse; la fila enfocada muestra el mismo texto quieto en un rótulo | §8 y §19 (regla del 16-oct) | Medido: con Tab el círculo queda en escala 0 y el foco es un contorno blanco de 2 px a 3 px |
| Resortes de Motion 13.5.0: cursor 2700·104·1, estado 800·57·1, entrada 230·31·1 | §9 | Una entrada por sección, una vez, nunca en texto de lectura |
| Encabezado que se pliega en una placa al bajar, con el resorte «entrada» | §2.3 y §9 | Se ve en `b-trabajo-1440-visor.jpg` |
| Telemetría verdadera, una franja: «Santiago 01:45 UTC-3» (gris) y «Esta visita 441 kB» (blanco, porque responde a ti) | §11 | La hora con `Intl` y `America/Santiago`; el peso con Resource Timing y un `PerformanceObserver`: crece mientras navegas (en `/trabajo/` abre en unos 345 kB y el recorrido grabado termina en 3.335 kB, cuando ya corrieron los videos de los conceptos) |
| El chequeo de verdad, el único sandbox de la home | §12 | Ver §5 |
| Corchetes una vez por página, alrededor del enlace al índice: «[ Todo el trabajo ] (10)» | §14 | |
| Marca de registro: la cruz de 9 px en `#2D2D2D` donde el borde de una sección cruza el límite del riel, dos por página, ninguna bajo 1194 px | §10 | Es el límite real del riel de B (x = 366) |
| El caso: barra lateral pegajosa, ficha mono, índice de secciones con el punto blanco, medio principal 16:9, cinco secciones con su rótulo, filas solo en las cuatro formas de Koto, cierre «Siguiente» con el corchete y el conteo | §21.1 a §21.5 | Ver §3 |
| `prefers-reduced-motion: reduce`: ni resortes, ni círculo, ni entradas, ni videos que corran solos | §9 y §15 | Medido en las cinco vistas |

## 3 · Las cinco vistas

**1 · Home.** El rótulo «Estudio de diseño y tecnología», la declaración de Clara (opción 3, la recomendada) en dos
tintas a 88 px, y abajo, en la misma pantalla, la entradilla a la izquierda y **el panel del chequeo** a la derecha
(columnas 9 a 16). El panel trae su lectura arriba a la derecha («--/100» en reposo, la cifra cuando corre), el campo,
el botón y **la regla de las 21 señales**: 21 tramos cuyo ancho es lo que pesa cada señal en el puntaje
(`chequeo.js`: 7 · 7 · 8 · 2 · 6 | 6 · 8 · 5 · 6 · 5 · 4 · 4 · 2 | 4 · 6 · 4 · 2 · 2 · 5 · 4 · 3 = 30 + 40 + 30).
En reposo los tramos están vacíos; al correr, cada uno se llena en blanco si cumple, queda en contorno gris si no y
rayado si no se pudo confirmar. Debajo, el índice corto (cuatro filas: Combeau fotografía, Praxi, Verifica y Cumple,
Sesenta) con su visor; «Cada pieza, con su prueba» con la pieza a la izquierda y la cifra a la derecha («805 kB → 95 kB»,
«384 / 384», «30 + 40 + 30» sobre la regla grande); servicios como tabla con la situación primero y el precio en
mono; quién está detrás; y el cierre a 64 px. Sin pie: la página termina en el contacto, como el caso de Koto.

**2 · `/trabajo/`.** El titular a 64 px, la entradilla y la nota de Clara, el conteo «(10)» a escala de cifra en el
riel, el filtro (Todo 10 · Cliente 2 · Propio 4 · Concepto 4, filtra de verdad) y la tabla de diez filas con el visor
pegajoso. Al pasar o enfocar una fila: la fila pasa a `#202020`, el visor cambia a su portada y, si es un concepto,
corre su recorrido de 10 s (muteado, con su botón de pausa) y aparece el círculo. En la tabla, «Concepto» va en blanco
en la columna Tipo. A 390 la tabla se vuelve una lista: cada fila trae su imagen a la vista y cada dato con el nombre
de su columna.

**3 · Praxi** (caso real, como Koto). Barra lateral de 346 px con «Praxi.» y «Se acuerda de cada serie» en dos tintas,
la ficha como tabla con filetes (Tipo, Año, Qué es, Hecho, Estado: «Fuera de línea»), el índice con su punto y, abajo,
«Quién lo hizo». Columna de 1.054 px: el video del inicio de Praxi (convertido a VP9 porque Chromium no reproduce
H.264) con su pie, y las cinco secciones: 12 filas con el medio principal y 17 medios del material que juntó Diego,
en las cuatro formas de Koto y sin dos partidas seguidas. Los pies de Clara van debajo de lo que corresponde: «Los números de esta
captura son de ejemplo…» bajo la conversación y bajo «Tu progreso, en números»; «Las personas… están generadas con
IA» bajo la portada, el reel y el carrusel. En la fila del teléfono (la conversación y la portada a 390, en Solución)
cada captura lleva el suyo debajo: uno solo para las dos diría «esta captura» de una (defecto 2 del acta del paso 2). **Lo propio de B está en «Sin métrica»:** la fila del resultado es una
placa de datos con el crudo de la verificación tal cual (`e12/praxi/crudo/verificacion-copia.txt`): 384 / 384 en 35
archivos, 8 / 8 de la revisión de marca, `tsc` en exit 0, la lista de los 35 archivos con sus conteos y la fecha UTC.
Cierra con el contacto de Clara y «Siguiente: Sesenta», con «Concepto · 2026» a la vista. Ningún enlace a `praxi.coach`.

**4 · Sesenta** (concepto). La misma plantilla con el texto de Bruno (`06-sesenta/caso.md`) sin cambiar una palabra:
los títulos en negrita de cada sección pasan a ser el titular de 24 px y sus párrafos el cuerpo; las 12 filas y 19
medios de su tabla, en su orden. «Concepto» está a la vista sin scroll en la ficha (Tipo: Concepto), en el sello de
cada placa y en el rótulo fijo del sitio que sale en el video. A 390 el medio principal es la portada 4:5 que pide el
caso, no el video recortado. Cierra con «Siguiente: Verifica y Cumple».

**5 · Desarrollo web** (el juego de color). Ver §4.

**El título del caso es el único `h1`, en todos los anchos** (defecto 1 del acta del paso 2). A 1440 y a 1024 está
arriba de la barra lateral. Bajo 834 px la barra no se apaga entera: su título baja al lugar que tiene en Koto a 390
(después del medio principal a sangre y antes de la ficha, lock §21.3) y el resto de la barra se va, porque la ficha la
repite la cabeza móvil y el índice lo lleva la barra flotante. Antes, bajo 834, el `h1` quedaba en `display: none` y lo
que se veía era un `<p aria-hidden>`: un lector de pantalla no oía el nombre del caso. La primera pantalla a 390 quedó
igual píxel por píxel.

**Un solo juego de rótulos en los dos casos** (el pendiente 1 de Clara, que me toca): Problema · Hipótesis · Solución ·
La pieza · Sin métrica, el de §21.5. En Sesenta quedan en el rótulo y en el índice; los títulos de Bruno («El rubro le
grita a alguien asustado», «Ordenar todo alrededor de la fecha y de la carta»…) siguen como titulares. Clara ajusta los
de Bruno en `caso.md` si quiere; el prototipo los mapea por orden (Desafío → Problema, Estrategia → Hipótesis,
Identidad → Solución, Aplicación → La pieza, Qué muestra → Sin métrica). A hizo lo mismo (lo leí en su `armar.py`).

## 4 · El juego de color: la hoja de los planes (vista 5)

**Lo que dice la medición** (lock §20.1 y §20.6): en Koto el lienzo no cambia nunca, en 640 paradas de 22 páginas; el
blanco y los colores entran **dentro de los marcos del trabajo**, como campos de la marca de cada cliente, a 8 px del
negro y con radio 6 (`medicion/koto/paso2/capturas/color-lyft-1440.jpg`: el campo crema `#F1F0EB` de Lyft a 1440,
1057 × 595, junto al magenta `#FF00C4`). Las interiores de la casa no juegan (0 a 0,9 % de campo claro).

**Lo que pidió Ramón** (punto 6): «también hay juegos con sitios interno con blanco u otros colores».

**Lo que hace B:** en Desarrollo web, la sección de los planes es **una hoja blanca** con la forma exacta de un campo de
Koto: un marco de radio 6 a 16 px del borde (el margen), sobre el negro, que entra seco con el scroll, sin fundido del
lienzo. Adentro van, en este orden, el titular en dos tintas (`#060606` y `#5C5C5C`), el glosario «Qué quiere decir»
(antes de los planes, como pidió Clara) y los cuatro planes de `oferta-v3.json` como una tabla de cuatro columnas con
filetes: nombre, precio en mono, la línea y los puntos, sin cambiar una palabra; y la nota. Mide el 17,1 % del alto de
la página a 1440. El resto de la página es negro, y el color de la página lo ponen las portadas de la obra (Combeau en
su verde pálido, Sesenta en su azul) en el visor de «Lo que construimos».

**Por qué así y no un lienzo blanco:** cambiar el lienzo de una página interior sería el desvío de Koto que el lock
§20.6 no respalda; la hoja conserva la forma medida del campo (marco, radio, 8 a 16 px de negro) y le da al blanco un
rol que se puede decir en una frase: **la hoja es donde se lee lo que se firma**, el precio y lo que incluye. Es el
único campo que pone la interfaz y no el trabajo.

**El desvío, rotulado:** rompe la regla 5 de §20.2 («ningún texto de la interfaz sobre un campo»), y lo hace con su
propio par: tinta 20,26:1, gris 6,69:1, contorno de foco en tinta 20,26:1, medido. Si Ramón lo quiere más, el paso
siguiente es medir una segunda hoja (las cinco fases); si lo lee como ajeno a Koto, sale y los planes vuelven a la tabla
sobre negro sin cambiar nada más.

**Campos en los casos** (lock §20.3, medido con `herramientas/campos.py`: un medio es campo si su color dominante,
claro o de color, cubre al menos el 30 %):

| Página a 1440 | Medios | Campos claros o de color | Techo del lock |
|---|---|---|---|
| Sesenta | 57,4 % | **29,3 %** | 10 a 35 % ✓ |
| Praxi | 50,3 % | **8,8 %** | 10 a 35 %: **bajo el piso, con razón** |

Praxi es una marca oscura con **un solo acento**, el amarillo `#E2F349` del punto del logo, que su propio contrato
(`brand.json`, inventario-praxi §7) deja como acento único. Llevarla al 10 % obligaba a pintar de amarillo más medios de
lo que la marca hace, que es cambiarle el rol a su token (tell #8). El amarillo entra donde la marca lo pone: el
avatar a 16:9, abriendo «La pieza», que es justo donde el texto de Clara cuenta que el color pasó del morado al amarillo.
Koto tiene el mismo caso con Call of Duty: 2,9 %, todo oscuro.

## 5 · El chequeo, de verdad

El panel corre `/api/chequeo` contra el servidor local, que llama al `chequear()` de producción (sin cambiarlo). Los
textos del resultado son los de `v3-chequeo.js` sin cambiar una palabra (veredictos, «Esto es la mitad técnica.», los
botones, los errores, «Revisando…»), con los ids `chq-*` de siempre. Lo que cambia es la forma: la cifra grande arriba,
la regla que se llena y la lista como tabla con filetes.

Medido (17-oct, 01:55): `example.com` (el dominio reservado de la IANA: no es un prospecto ni un cliente) da **30/100**,
5 de 21 señales cumplen, en 946 ms. Captura: `img/b-home-1440-chequeo.jpg`; detalle: `proto/b/datos/chequeo-resultado-1440.jpg`.
El recorrido de la home lo corre en vivo. **No corrí el chequeo sobre spindlelab.cl ni sobre ningún sitio de un
cliente**: sus puntajes piden el OK de Ramón (encargo §10.3).

## 6 · El texto

**Tal cual.** `herramientas/armar.py` pone en las plantillas el texto de `texto-paso2.json` por su id, el de
`06-sesenta/caso.md`, los planes de `oferta-v3.json` y el crudo de Praxi, sin reescribir nada. Las decisiones abiertas
están en una línea al principio del armador:

- **`PUNTAJES_PROPIOS = False`** (encargo §10.3). Mientras Ramón no diga sí, Verifica y Cumple va con la alternativa de
  Clara: en la home «El chequeo gratis de esta página.» con su dato, y en el índice «Sin métrica de uso: no guarda los
  dominios que revisa.». Con `True`, la fila de la home lleva «54 → 94» a escala de cifra y la ficha «Medido 14 y
  16-oct-2026». El resultado de spindlelab.cl en el índice (36 → 73, de la ley de datos personales) entra en la misma
  pregunta desde el 18-oct (Clara, defecto 15 del acta del paso 2): con `False` va «Sin métrica de negocio. Si no aceptas
  las cookies, la portada no carga nada de Google ni de Meta (16-oct-2026).»; con `True`, el 36 → 73.
- **Hipótesis de Praxi, segundo párrafo: sale.** Su condición pide una fila en `inventario-praxi.md` que no existe
  («persona activada»). A hizo lo mismo.
- **Se muestran tal como los escribió Clara, a la espera de Ramón:** «Fuera de línea» (ficha de Praxi y su párrafo),
  «con agentes de IA» (créditos de Praxi), «y te lo dice» (quién está detrás), el dominio en Desarrollo web, la
  respuesta sobre textos y fotos.

**Lo que B agrega y no está en el texto de Clara** (para el diff A/B del criterio 14):

| Texto | Dónde | De dónde sale |
|---|---|---|
| «805 kB → 95 kB», «384 / 384», «30 + 40 + 30» | Cifra grande en «Cada pieza, con su prueba» (`aria-hidden`: repite el párrafo) | inventario-casos §2.1, inventario-praxi §8.1, `chequeo.js` |
| «--» y «/100» | Lectura del panel del chequeo | «/100» es el de producción; «--» es el instrumento sin lectura |
| «¿Te pueden leer?», «¿Te entienden?», «¿Te pueden citar?», 30, 40, 30 y los 21 pesos | La regla de las 21 señales | `chequeo.js` (los títulos son los que ya muestra el resultado de producción) |
| «Esta visita» | Franja de telemetría | Lock §11 («rotulado esta visita») |
| «Menú», «Ir al contenido», «+» | Botón del menú a 390, salto al contenido, barra del caso a 390 | Interfaz |
| «Pausar el video» / «Reproducir el video» | `aria-label` del botón de pausa | Interfaz (WCAG 2.2.2) |
| «Tipo», «Año», «Rubro» y su valor | Ficha de Sesenta | Las etiquetas de la ficha de Praxi (Clara) y la fila «Rubro» de `caso.md` |
| La placa de Praxi: «vitest run · 35 archivos», «npm run design-check», «tsc --noEmit», «exit 0», los 35 archivos, la fecha UTC | Fila de «Sin métrica» | El crudo, tal cual |
| `<title>` y `description` de Sesenta | Página de Sesenta | **Hueco para Clara**: los escribí yo para que la página no saliera sin ellos |
| Los `alt` de cada imagen | Todas | Escritos mirando cada archivo; el de Praxi en el video es el de Clara |

**Tres cosas del texto que choca con B, para Clara:**

1. «Bajo cada pieza van las herramientas con que está hecha» (nota de `/trabajo/`): en la tabla de B, a 1440, las
   herramientas van en la columna «Con qué está hecho», no bajo la pieza (a 390 sí quedan debajo). Propuesta: «En cada
   pieza van…». No la cambié: el texto es el mismo en A y en B.
2. El caso de Sesenta no trae texto de contacto para el cierre: va solo el botón «Escribir a SpindleLab» (el de Praxi).
3. El `title` y la `description` de Sesenta (fila anterior).

## 7 · Logo, provisorio: camino 3, «Dos cortes»

En el nav va `e12/logo/camino-3-dos-cortes/camino-3-dos-cortes-B-blanco.svg` en línea, a 22 px de alto, con
`currentColor`, y su favicon `favicon-B.svg`. **Por qué este en B:** B es la dirección donde la mono es la voz del dato
vivo (la hora, el peso de tu visita, el chequeo, la ficha), y el camino 3 es el único que lleva esa voz dentro del
nombre: «Spindle» en Mona Sans y «LAB» en DM Mono. En A, donde manda el trabajo y no el dato, el camino 2 tiene más
sentido (A usa el 2). La recomendación de Bruno sigue siendo el 2; lo elige Ramón.

## 8 · Mediciones

Todo con Chromium 141 y Playwright desde `spindlelab-astro/node_modules`, contra el servidor local, el 17-oct entre las
01:50 y las 01:57 (Chile). Crudos en `proto/b/datos/`.

| Qué | Resultado | Archivo |
|---|---|---|
| **Desborde horizontal** de 360 a 1920 (15 anchos: 360, 375, 390, 414, 600, 768, 833, 834, 1024, 1193, 1194, 1280, 1440, 1680, 1920), tal como se sirve **y con `overflow-x` quitado** de `html` y `body` | **0 px en las 5 vistas, en los 15 anchos, con y sin clip**; ningún elemento pasa el borde | `mediciones.json` → `desborde` |
| **Contraste AA de cada nodo de texto**, compuesto sobre su fondo real (la herramienta de la casa, `npm run verificar` con `--base`), a 360, 390, 768 y 1440 | **0 hallazgos** en las 20 pasadas (5 vistas × 4 anchos): contraste, desborde, un `h1`, JSON-LD y `alt` | `verificar.txt` |
| Contraste en el juego de color (la hoja) | Tinta 20,26:1 · gris 6,69:1 · foco 20,26:1; la hoja la mide también `verificar` como cualquier texto | `contraste-tokens.json` |
| Contraste de los estados | Gris sobre la fila activa `#202020` 5,65:1; blanco 16,29:1; texto del círculo 20,26:1 | `contraste-tokens.json` |
| **Un `h1` por página** | 1 en las 10 vistas (5 × 2 anchos) | `mediciones.json` → `vistas` |
| **Imágenes** | 0 rotas, 0 sin `alt`, en las 10 vistas (las imágenes de la lista móvil no se piden a 1440, donde están ocultas) | ídem |
| Letras | Titular y cuerpo computan **Mona Sans**, rótulos, datos y `code` **DM Mono**; cargadas solo esas dos, de `proto/b/fuentes/` (Mona Sans recortada a wdth 85–100 y wght 300–420, 72 kB; DM Mono 500, 16 kB). La recortada se llama por dentro **«Riel Sans»** y en `b.css` «Riel Sans B»: la OFL de Mona Sans reserva el nombre «Mona» para las versiones modificadas (`herramientas/renombrar-fuente.py`; solo cambia la tabla `name`, el copyright queda igual). Por eso las mediciones dicen «Riel Sans B» donde antes decían «Mona Sans B»: es la misma letra | ídem |
| Texto más chico | 11 px | ídem |
| Errores de consola | 0 (sin contar los 404 de las rutas que no son parte del prototipo, abajo) | ídem |
| **Primera pantalla de la home** (criterio 10) | 1440 × 900: `h1` de 125 a 383 px, campo y botón de 585 a 629 ✓. 390 × 844: campo de 648 a 692, botón de 700 a 744 ✓, los dos dentro | `primera-y-ficha.json` |
| Ficha lateral pegajosa a media página (criterio 6) | Praxi y Sesenta a 1440, con la página a la mitad: la ficha ocupa de 56 a 900 px y la sección activa es «La pieza» | ídem |
| Medios en los casos (criterio 6, ≥ ⅓) | Praxi 50,3 % · Sesenta 57,4 % | `campos.json` |
| Negro fuera de medios (criterio 4, ≥ 80 %) | Home 89,9 % · `/trabajo/` 87,8 % | ídem |
| **El acta del paso 2, con las herramientas de Javiera sin tocarlas** (18-oct) | `h1-caso-b.js`: un `h1` visible en Praxi y Sesenta a 360, 390, 768, 1024 y 1440, ningún título con `aria-hidden`. `pies-praxi.js`: ningún medio con cifras de demostración o personas generadas sin su pie (inventario-praxi §6). `mono.js`: 0 nodos en la mono genérica en las cinco vistas a 390 y 1440. `area-toque-390.js`: 0 objetivos bajo 44 × 44 en las cinco vistas; con `elementFromPoint` en los cuatro bordes, 0 tapados por otro objetivo | `cierre-acta-paso-2.json` (`herramientas/cierre-acta.mjs`) |
| El chequeo | `example.com` → 30/100, 21 señales, 946 ms | `mediciones.json` → `interaccion` |
| Índice | Círculo blanco con «Ver el concepto» sobre Sesenta, la fila en `#202020`, el visor con su portada y su video corriendo; el filtro «Concepto» deja Sesenta, Ocelo, Doceavo y Tonela | ídem y `trabajo-hover-1440.jpg` |
| Movimiento reducido (emulado) | En las 5 vistas: sin círculo, 0 bloques escondidos, 0 videos corriendo | `mediciones.json` → `reducido` |
| Peso de la página (lo que pesó la visita, medido por la propia página) | Home 441 kB sin correr videos | La franja de telemetría |

**Los 18 enlaces que dan 404 en el prototipo** son las rutas del v3 que no están en el encargo (servicios, método,
nosotros, contacto, diagnóstico, los otros servicios y las ocho entradas del índice sin página). Van con su ruta final y
no se inventó ninguna página para taparlas.

## 9 · Lo que B sacrifica, dicho

- **El muro de imágenes de Koto.** En el índice, el trabajo se ve de a una pieza, en un visor de 346 × 260 px; a 1440
  los medios ocupan el 2,9 % de `/trabajo/`. Es la apuesta de B: el índice se lee como un banco de datos y la pieza se
  pone en el banco al pasar. Si Ramón quiere ver el trabajo grande sin pasar el mouse, esa es la dirección A.
- **Más texto por pantalla**, con riesgo de leerse como panel. Lo que lo contiene: la letra liviana sin negritas, una
  sola franja de telemetría, el riel vacío y los techos del lock.
- **Sin los puntajes propios**, la home muestra solo lo del visitante y la metodología (30 + 40 + 30). La cifra más
  fuerte de B («54 → 94») espera la respuesta de Ramón.

## 10 · Lo que no hice o queda abierto

- No toqué `proto/comun/` ni nada de A. No hizo falta un archivo compartido: B tiene sus letras, su Motion y sus medios
  en `proto/b/`. Los videos de los conceptos se enlazan desde `marketing/portafolio/` (no se copiaron).
- Las imágenes del índice de spindlelab.cl y del chequeo salen del **build local** de `spindlelab-astro/dist/`
  (servido aparte, solo lectura, con el aviso de cookies rechazado en esa pestaña): `herramientas/capturas-obra.mjs`.
- Combeau fotografía, Combeau modelo y Verifica y Cumple van con **su captura plana del sitio vivo** en el visor y en
  «Cada pieza, con su prueba» (`herramientas/capturas-vivas.mjs`, 18-oct, 1440 × 1080 para el 4:3 y 1440 × 810 para el
  16:9; solo GET y scroll; registro en `datos/capturas-vivas.json`). Hasta el 18-oct iban las maquetas de dispositivo
  de `spindlelab-astro/public/assets/img/obra/`, y el lock pide la pieza plana en su marco (§13, punto 5, y §21.2;
  defecto 8 del acta del paso 2). Grabaciones de Combeau siguen sin haber: las del encargo §5 no están en el repo.
- **Para Clara y Diego:** la portada de Verifica y Cumple muestra a la sheriff de rosa a caballo, y el encargo de su
  campaña dice «No regeneres el personaje» (`marketing/encargos-otras-sesiones/verifica-campana-linea-propia.md`), o
  sea que es una imagen generada. No tiene fila en el inventario de casos ni pie; el `alt` la describe sin decir de dónde
  sale. Si va un pie como el de Praxi, lo escribe Clara y lo respalda la fila.
- Las pantallas de la app de Praxi: siguen como hueco nombrado (nota de Clara en «La pieza»).
- El tablero de la compuerta 2 (A y B juntos, armado por script) no es parte de este encargo.

## 11 · Cómo se rehace

```
B=marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/b
node $B/herramientas/servir.mjs 8791 &                                   # sitio + /api/chequeo
python3 -m http.server 8792 --bind 127.0.0.1 --directory spindlelab-astro/dist &
node $B/herramientas/capturas-obra.mjs http://127.0.0.1:8792 /tmp/crudo  # dos portadas del índice
node $B/herramientas/capturas-vivas.mjs /tmp/vivas                       # los tres sitios vivos, planos
python3 -I $B/herramientas/medios.py /tmp/crudo /tmp/vivas               # derivados WebP y VP9 (con una lista al final, solo esos)
python3 -I $B/herramientas/renombrar-fuente.py                           # el nombre interno de la letra recortada
python3 -I $B/herramientas/armar.py                                      # las cinco vistas, con el texto tal cual
U=http://127.0.0.1:8791/$B/
node $B/herramientas/capturar.mjs $U                                     # img/b-*.jpg
node $B/herramientas/grabar.mjs $U /tmp/cuadros                          # video/b-*.webm
node $B/herramientas/medir.mjs $U                                        # datos/mediciones.json
node $B/herramientas/primera.mjs $U                                      # datos/primera-y-ficha.json
node $B/herramientas/medir-campos.mjs $U /tmp/campos && python3 -I $B/herramientas/campos.py /tmp/campos/campos.json $B/datos/campos.json
(cd spindlelab-astro && node scripts/verificar.mjs --base ${U%/} --rutas /,/trabajo/,/trabajo/praxi/,/trabajo/sesenta/,/servicios/desarrollo-web/ --ancho 390)
node $B/herramientas/cierre-acta.mjs $U                                  # datos/cierre-acta-paso-2.json
```

## 12 · Detector anti-slop, pasada propia (la de Javiera va aparte, en limpio)

`refero-design/references/anti-ai-slop.md`: sin índigo ni violeta; sin tarjetas (las dos placas tienen rol: panel del
chequeo y placa de datos; la hoja es un campo); oscuro porque lo eligió Ramón; sin serif ni palabra destacada en otra
letra (las dos tintas son la regla medida de Koto, siempre la frase entera); sin emoji; sin franja lateral; mayúsculas
con +0,03em; referencias sin promediar (negro de Koto, nada del papel de A&P); roles de token intactos (placa, placa
activa, blanco como señal); la media se preserva con material real o con un instrumento de datos verdadero (la regla y
la placa de Praxi), nunca un dibujo falso. `estudio-web/antislop-web.md`: el copy es de Clara; un `h1`, landmarks, foco,
contraste y `alt` medidos; sin tres tarjetas iguales (los planes son una tabla en la hoja); sin fila de métricas
inventadas (cada cifra con su fila); hero que no es 100vh centrado y deja ver la sección siguiente; JSON-LD en cada
vista, sin `Review` ni `AggregateRating`; el concepto declarado como concepto también en sus datos.
**Prueba del logo tapado:** la primera pantalla de la home se reconoce por la frase a 88 px en el corte condensado
liviano y el panel con la regla de 21 tramos, que no tiene otro estudio porque el chequeo es nuestro.
**Prueba del rubro cambiado:** con el copy de una inmobiliaria la regla de las 21 señales no tiene sentido: la
composición depende del instrumento.

## Historial

| Fecha | Qué | Origen |
|---|---|---|
| 17-oct, 02:00 | Primera versión | Lucía, encargo del paso 2 |
| 17-oct | El tablero de la compuerta 2 recomprimió en su lugar, con el mismo ancho, las capturas que pasaban de 450 kB: `b-home-1440-1de2.jpg` (458 → 411 kB, JPEG 80), `b-sesenta-1440-2de3.jpg` (530 → 433 kB, JPEG 72), `b-desarrollo-web-1440-1de2.jpg` (505 → 445 kB, JPEG 80) (`datos/recompresion.json`) | Lucía, tablero de la compuerta 2 |
| 18-oct | Defectos 1, 2, 8, 9, 10 y 12 del acta del paso 2, cerrados: el título del caso es el `h1` en todos los anchos; la fila del teléfono de Praxi lleva un pie bajo cada captura; capturas planas de los tres sitios vivos en vez de las maquetas; `code` en DM Mono; la letra recortada se llama «Riel Sans» por dentro; 44 px de área a 390 y con puntero grueso (filas del índice, migas, «Menú», el salto al contenido y el siguiente caso), con relleno y margen negativo para que nada se mueva. Rehechas las capturas que cambian (las que solo cambiaban la hora de la franja quedaron como estaban), los dos recorridos, `mediciones.json`, `primera-y-ficha.json`, `campos.json` y `verificar.txt` (sin cambios: 0 hallazgos) | Lucía (B), acta de Javiera |
