# Medición E14: la home de Koto al bajar, contra la home de spindlelab.cl

**2-nov-2026 · Lucía (dirección de arte) · obra E14, prototipo de home.** Encargo: medir solo lo que
`../e12/lock-koto.md` no tenía: la sección «Our work» de la home de koto.com y lo que pasa al bajar (qué queda
fijo, cómo entran las tarjetas, cómo cambia la etiqueta, cómo entran las imágenes de noticias y contacto), más la home
actual de spindlelab.cl para contrastar. Lo que el lock ya fijó (letras, color, retícula, cursor, hovers, la página
del caso, `prefers-reduced-motion` ignorado por Koto) no se volvió a medir: se cita.

**Cómo se midió.** Chromium 1243 con Playwright 1.63 (el de `spindlelab-astro/node_modules`), por el proxy del
entorno, a 1440 × 900 (dpr 1) y 390 × 844 (dpr 2, táctil). Barrido de toda la página en pasos de 40 px con 90 ms de
espera, guardando por elemento solo lo que cambia: posición, tamaño, opacidad, `transform`, `translate`, `scale`,
`clip-path` y clase (Koto usa Tailwind v4, que mueve con las propiedades `translate` y `scale`, no con `transform`;
la primera pasada sin ellas no vio la etiqueta moverse). Después, pruebas de **tiempo contra scroll**: se salta a una
posición y se muestrea cada 15 a 30 ms durante 1,3 s; si el valor ya está quieto en el primer cuadro, va atado al
scroll; si sigue cambiando sin que la página se mueva, es una transición disparada por la posición. Umbrales en pasos
de 8 px, bajando y subiendo. Cuadros fijos en las posiciones clave y un video del recorrido con la rueda, a los dos
anchos. Herramientas en `medicion/herramientas/`; números crudos y compactos en `medicion/datos.json`.

A 1440 el navegador deja 15 px de barra de scroll: el ancho útil es 1425 y por eso la tarjeta mide 868 y no 877.

---

## 0 · Lo que hay que corregir antes de nada

La descripción con que llegó el encargo dice que en «Our work» las tarjetas **«se apilan y crecen al bajar»**. **No
pasa, ni en el navegador ni en el video de Ramón.** Medido a 1440 en 66 posiciones de la sección: **ninguna tarjeta
cambia de tamaño, de escala ni de posición relativa**; bajan con la página como cualquier bloque. Lo que da esa
impresión son cuatro cosas, y son las que hay que copiar:

1. **Dentro de cada tarjeta corre un video en bucle con cortes** (la de Amazon pasa de la sonrisa en una caja a un
   avión, a «Shop now», a Fallout). El plano cambia dentro de un marco quieto.
2. **Solo una tarjeta está encendida**: la activa al 100 %, todas las demás al **20 %**. Al cruzar el centro de la
   pantalla, la siguiente se enciende y la anterior se apaga.
3. **La columna izquierda no se mueve**: «Our work» y el nombre del caso quedan fijos mientras las tarjetas pasan, y
   el nombre cambia con un golpe de máscara.
4. **Lo único que de verdad cambia de tamaño en la home es la portada, y se achica**: el showreel a pantalla completa
   se recoge en una franja al bajar (§1). Y al final, la foto del estudio **aparece escalando de 0 a 1** (§5).

El video de Ramón (`video-ramon-our-work-4cps.jpg`, 2712 × 1424 a 60 cuadros, 23 s, ventana de unos 1356 × 712 px)
muestra exactamente eso: etiqueta fija a la izquierda, una columna de tarjetas 16:9 a la derecha, la activa encendida
y las otras apagadas, y el contenido del video cambiando dentro de cada marco.

Consecuencia para el prototipo: el movimiento de Koto es **más liviano** de lo que se suponía. No hace falta una
pila con escalas: hace falta una columna pegajosa, un cambio de estado por umbral y una portada que se recoge.

---

## 1 · Portada: el showreel se recoge (atado al scroll)

`koto-1440/koto-1440-y0000.jpg` → `y0160` → `y0450` → `y0760` → `y0900`; a 390, `koto-390/koto-390-y0000.jpg` →
`y0300` → `y0760`.

| | 1440 | 390 |
|---|---|---|
| Qué queda fijo | El escenario de la portada es una capa fija de 100 svh; el texto de la página sube por encima | Igual |
| Empieza a recogerse | scroll **120** | scroll **120** |
| Termina | scroll **900** (una pantalla) | scroll **760** |
| `clip-path` al final | `inset(8px 8px 76.56% round 4px)`: queda una **franja de 1393 × ~203 px** arriba (la proporción `1496/216` de la caja que la recibe) | `inset(8px 8px 69.67% round 4px)` |
| Cómo avanza | **Lineal con el scroll**: +4,09 % de recorte abajo, +0,43 px a los lados y +0,21 px de radio por cada 40 px | Igual, +4,41 % por 40 px |
| El video dentro | Sube a **0,43 × el scroll** (de 0 a −337,5 px): paralaje contra el recorte | De 0 a −316,5 px |
| Título «We’re Koto / The Creative Company» | Opacidad 1 → 0 entre scroll **0 y 150**, lineal | Igual |
| Prueba de tiempo | Saltando de 500 a 700 el valor queda quieto desde el primer cuadro (29 ms): **atado al scroll, sin suavizado** | |

## 2 · La declaración entra línea por línea (atado al scroll)

«We make ambitious ideas for ambitious brands. Five offices…» (`koto-1440-y0760.jpg`, `y0900`).

- El bloque sube desde abajo de la pantalla: su `translate` va de **675 px a 0** entre scroll 120 y 920 (lineal).
- Cada línea está en una máscara (`overflow: hidden`) y sube **de 100 % (41,8 px a 1440; 31,2 a 390) a 0**. Línea 1
  entre scroll 600 y 760; línea 4 entre 740 y 900: **unos 160 px de scroll por línea, cada una 40 a 50 px después de
  la anterior**. A 390 la frase se parte en 6 líneas y corren entre 520 y 880.
- Prueba de tiempo: quieto desde el primer cuadro. **Atado al scroll**, no es una animación que «se dispara».
- Tinta: la primera parte en blanco y la continuación en gris, en la misma línea (ya en el lock §2.8).

## 3 · «Our work» (1440): columna fija a la izquierda, tarjetas a la derecha

`koto-1440-y1340.jpg` (aún no aparece el panel) → `y1460` (aparece) → `y1600` (pleno) → `y1852` (cambia a Amazon) →
`y2100` → `y2400` → `y2900` → `y3400` → `y3560` (se suelta). Video del recorrido: `recorrido-koto-1440.jpg`, de
t = 4 s a 11 s.

### 3.1 · La retícula

| Pieza | Medida |
|---|---|
| Retícula | 16 columnas, separación 8, márgenes 16 (lock §2.3). Izquierda **6 columnas = 517 px**; derecha **10 columnas = 868 px** |
| Tarjeta | **868 × 488 (16:9), radio 6 px**, sin borde ni sombra, **12 px entre tarjetas** (paso de 500 px). Cinco tarjetas. Cada una es un video en bucle |
| Al final de la columna | Una barra **868 × 158** (proporción 922/168), fondo blanco al 10 %, radio 6, con «[ VIEW ALL PROJECTS ]» en mono 11 abajo a la derecha; los corchetes se separan 4 px al pasar el mouse (333 ms, lineal). Después, 160 px de aire |
| Sección completa | De 1800 a 4458 de documento: **2658 px, casi tres pantallas**, para cinco casos |

### 3.2 · El panel pegajoso

- `position: sticky; top: 0; height: 100svh; margin-top: -100svh; padding-top: 30svh; padding-bottom: 24px;
  padding-left: 12px`. El margen negativo hace que el panel **ya esté pegado desde el scroll 900** (cuando termina la
  portada), antes de que llegue la primera tarjeta; se suelta en el scroll **3558**, con la última.
- Arriba, a **270 px** del borde (30 svh): «Our work» en blanco y debajo el nombre del caso en gris, los dos a 38/1,1
  en el corte condensado liviano. Dos tintas, dos líneas.
- Abajo, pegado al pie: la bajada del caso (16/1,25, gris, **334 px** de ancho = 4 de las 6 columnas, de 7 a 17 líneas
  según el caso) y, 48 px más abajo, una fila con una miniatura de **40 × 40, radio 2**, la frase corta del caso a 14
  y la ficha en mono 9 («2026, SOCIAL MEDIA»).
- **El panel entra con el scroll**: opacidad 0 → 1 entre scroll **1340 y 1600** (lineal, +0,178 por cada 40 px), o
  sea mientras el borde superior de la primera tarjeta pasa de 460 a 200 px de la pantalla. Antes de eso la columna
  izquierda está vacía y la tarjeta sube sola.

### 3.3 · El cambio de caso

**Qué lo dispara:** la tarjeta cuyo borde superior cruzó **la mitad de la pantalla** (450 px a 900 de alto). Bajando,
Amazon se enciende con su borde a **448 px**; subiendo, Instagram vuelve con el borde de Amazon a **468 px**. No hay
histéresis aparte del paso de la medición. Los cambios ocurren en el scroll 1852, 2360, 2880 y 3360, uno cada 500 px.

**Cómo cambia** (no va atado al scroll: la posición dispara transiciones con tiempo; medido saltando de 2300 a 2440):

| Qué | De → a | Duración y curva | Medido |
|---|---|---|---|
| Tarjeta que se apaga | opacidad 1 → **0,2** | 167 ms, lineal | quieta a los 254 ms del salto (incluye ~30 ms de latencia) |
| Tarjeta que se enciende | 0,2 → 1 | 167 ms, lineal, al mismo tiempo | igual |
| Nombre que sale | `translate` 0 → **−100 %** (sube y desaparece por la máscara de 42 px) | **133 ms**, `cubic-bezier(.75,0,.85,1)` (acelera al salir) | en −100 % a los 210 ms |
| Nombre que entra | +100 % → 0 (sube desde abajo) | **333 ms**, `cubic-bezier(0,0,0,1)` (frena al llegar), después de la salida | quieto a los **442 ms** |
| Bajada y fila de la miniatura | la vieja 1 → 0 enseguida; la nueva 0 → 1 | 167 ms, lineal; la nueva con **333 ms de retardo** | empieza a los 398 ms, llena a los 573 |

Orden que se ve: se enciende la tarjeta, el nombre viejo se va hacia arriba, el nuevo llega desde abajo y recién
entonces aparece el texto. **Toda la secuencia dura menos de 0,6 s y ninguna curva pasa de 1 (cero rebote).**

**Lo que no hace:** ninguna tarjeta escala, se apila, se fija ni entra con desplazamiento propio; ninguna imagen
entra con fundido. La entrada es el scroll mismo.

### 3.4 · «Our work» a 390

Sin panel pegajoso y **sin apagar ninguna tarjeta**: la sección es una lista. «Our work» a 26 px; cinco tarjetas de
**358 × 269 (4:3), radio 4**, cada una con su nombre en blanco y la frase en gris debajo (15 px), paso de 348 px. Nada
se mueve fuera del scroll (`koto-390-y1700.jpg`, `y2100`, `y2500`; `recorrido-koto-390.jpg`, de t = 1 s a 3,5 s).

## 4 · Noticias: imágenes que **no** entran

`koto-1440-y4300.jpg`, `y4618`, `y4950`.

- Empieza en 4618, alto 785. Encabezado en mono: «STUDIO NEWS · PRESS, TALKS, AND EVENTS … [ VIEW ALL ]».
- Tres notas: una grande de **592 × 333** y dos de **376 × 212**, todas 16:9, radio 6, en x 28 / 632 / 1021; debajo,
  título a 14, etiqueta mono en caja y fecha.
- **Cero cambios en el barrido a los dos anchos**: ni opacidad, ni desplazamiento, ni escala. Las fotos están ahí
  cuando llegas. Lo que se siente es la foto misma (un retrato en blanco y negro, una portada, un grupo), no un efecto.
- A 390: una sola foto grande (358 × 201) y las otras dos notas como filas con miniatura de 60 × 48.

## 5 · Contacto: filas que aparecen con el scroll y la foto del estudio que salta

`koto-1440-y4950.jpg`, `y5236`; `koto-390-y3700.jpg`, `y4139`.

- «Contact / Press and careers» a la izquierda (dos tintas, 38 px), sin fijarse. A la derecha, tres filas (Press +
  Media, Recruitment, Channels) con filete arriba.
- **Las filas aparecen atadas al scroll**: cada una de 0 a 1 en unos 240 px, la segunda 40 px después de la primera y
  la tercera 80 px después. A 1440, entre el scroll 4900 y el final (5236); a 390, entre 3700 y 4000.
- **La foto del estudio** (366 × 220 a 1440, 358 × 215 a 390; 5:3, radio 6) **no está hasta el final**: al llegar a
  los últimos ~36 px de la página **escala de 0 a 1 desde la esquina inferior izquierda** (`transform-origin: 0 100%`),
  en unos 0,3 s, rápida al principio y frenando (0,60 → 0,88 → 0,99 → 1 en muestras sucesivas a 390). Esta sí es una
  animación disparada, no atada al scroll. Después la etiqueta «SAY HELLO / NYC@KOTO.COM» sube 10 px y aparece
  (0 → 0,25 → 0,60 → 0,96 → 1), y queda un botón «COPY». La foto lleva abajo un degradado de negro al 0 % a negro al
  80 % para que se lea la etiqueta.

## 6 · Resumen de Koto: qué se mueve y cómo

| Momento | Atado al scroll | Disparado por posición |
|---|---|---|
| Portada que se recoge, título que se apaga | ✓ (120 a 900 px) | |
| Declaración que sube línea por línea | ✓ (~160 px por línea) | |
| Panel de «Our work» que aparece | ✓ (1340 a 1600) | |
| Panel fijo mientras pasan las tarjetas | ✓ (sticky, 900 a 3558) | |
| Tarjeta activa 100 % / resto 20 %, cambio de nombre y de bajada | | ✓ (umbral en la mitad de la pantalla; 133 + 333 ms; texto con 333 ms de retardo) |
| Noticias | no | no |
| Filas de contacto | ✓ (240 px cada una, escalonadas 40) | |
| Foto del estudio que escala, etiqueta que sube | | ✓ (al llegar al final; ~0,3 s) |

Video en el contenido: el showreel y las cinco tarjetas. Nada dibujado, ningún degradado de color. Koto **no** atiende
`prefers-reduced-motion` (lock §2.7): ese hueco no se copia.

---

## 7 · La home actual de spindlelab.cl, medida igual

`spindlelab-actual/spindlelab-1440-y*.jpg` (una por sección) y `spindlelab-390-y*.jpg`. Datos en
`datos.json → spindlelab_1440 / spindlelab_390`.

| | Koto | spindlelab.cl |
|---|---|---|
| Alto a 1440 | 6136 px (6,8 pantallas), de las que 2658 son el trabajo | **7531 px (8,4 pantallas)** |
| Alto a 390 | 4983 px (5,9 pantallas de 844) | **9064 px (10,7 pantallas)** |
| Palabras | 577 en la página, de las que unas 390 son las cinco bajadas de caso que se turnan en el mismo lugar (estimado por su alto): **unas 260 a 300 se leen en el recorrido** | **1421**, todas a la vista |
| Imágenes y videos en el flujo | 8, que ocupan el **28 %** del área de la página, más el showreel a pantalla completa en una capa fija | **4** (video de portada, dos casos, foto de Ramón): **19 %** del área |
| Secciones sin ninguna imagen | 0 de 4 (la declaración va bajo la franja del showreel; contacto tiene la foto al final) | **6 de 9**: «Todo lo que haces para vender…» (142 palabras), «Para empresas que ya venden» (51), «Cómo partimos y cómo seguimos» (145), «Lo que podemos hacer por ti» (236), «Lo esencial, en claro» (265) y el cierre (23) |
| Qué queda fijo | Un rótulo que **cambia con la imagen de al lado** | 5 títulos de sección (`int-sec__cab`, sticky a 88 px, 346 px de ancho) que quedan quietos **junto a texto**; a 390, ninguno |
| Movimiento al bajar | 6 momentos (§6), 4 atados al scroll | **2 entradas** (el bloque de casos en el scroll 3120 a 3360 y el retrato en 4440 a 4680) y un fundido de carga en 3 imágenes. **0 atados al scroll**, 0 cambios de estado |
| `prefers-reduced-motion` | Ignorado | 3 reglas |

Por sección (1440, alto · palabras · medios): portada 836 · 98 · video; «Todo lo que haces…» 627 · 142 · 0;
«Para empresas…» 244 · 51 · 0; «Cómo partimos…» 581 · 145 · 0; «Lo que podemos hacer por ti» 867 · 236 · 0 (es la
captura `y2352`: tres columnas de texto y precios); «Lo que puedes revisar…» 1769 · 212 · 2; «Quién está detrás»
980 · 249 · 1; «Lo esencial, en claro» 927 · 265 · 0; cierre 298 · 23 · 0.

**Lo que dice la comparación, en una frase que se comprueba mirando:** en Koto cada pantalla tiene una imagen que
manda y unas 40 palabras; en la nuestra, la mitad de las pantallas son solo texto, y lo que queda fijo es un título
al lado de párrafos, que es justo lo que se lee como sábana.

## 8 · Lo que esto le pide al prototipo (para la composición, no la decide)

- **Copiar el mecanismo, no la pila imaginada:** columna izquierda pegajosa con rótulo + nombre que cambia por
  máscara (133 ms fuera, 333 ms dentro), una columna de medios 16:9 a la derecha con la activa al 100 % y el resto al
  20 %, umbral en la mitad de la pantalla. A 390, lista simple con el nombre bajo cada medio, sin apagar nada.
- **La portada se recoge** con un `clip-path` atado al scroll durante una pantalla, con el video subiendo más lento
  que el recorte. El hilo de oro (video real) es el candidato natural.
- **Las líneas de la declaración suben atadas al scroll**, una tras otra. Es lo que convierte el h1 y la frase de
  Ramón en movimiento sin agregar texto.
- **Noticias sin efecto:** donde no hay movimiento, la imagen hace el trabajo. No hay que animar todo.
- **Contacto:** filas que aparecen con el scroll y la foto (la de Ramón, real) que escala desde una esquina al
  llegar al final.
- **Con `prefers-reduced-motion: reduce`**, que Koto no tiene: la portada ya recogida o quieta, las líneas a la
  vista, todas las tarjetas al 100 %, el cambio de nombre sin desplazamiento y la foto sin escala.
- **Presupuesto de texto**, por la medición: unas 40 palabras por pantalla en la home. Con ocho pantallas, del orden de
  300 a 350 palabras, contra 1421 hoy. Las bajadas largas van a las páginas internas.

## 9 · Archivos

- `medicion/koto-1440/koto-1440-y*.jpg` (19 cuadros) y `medicion/koto-390/koto-390-y*.jpg` (12), en las posiciones
  que cita este documento. El showreel sale negro en los cuadros fijos (este Chromium no reproduce H.264; ver la nota en `../e12/medicion/koto/herramientas/comun.mjs`);
  en el video del recorrido sí corre.
- `medicion/recorrido-koto-1440.jpg` y `recorrido-koto-390.jpg`: el recorrido con la rueda, un cuadro cada 0,5 s.
- `medicion/video-ramon-our-work-4cps.jpg`: el video de Ramón entre los segundos 2 y 10, a 4 cuadros por segundo.
- `medicion/spindlelab-actual/`: una captura por sección de la home publicada, a 1440 y 390.
- `medicion/datos.json`: series de scroll (portada, líneas, panel, tarjetas, contacto), la prueba de tiempo del
  cambio de caso, los umbrales de ida y vuelta, noticias y la medición de spindlelab.cl.
- `medicion/herramientas/`: `barrer.mjs` (barrido por elemento), `detalle.mjs` y `detalle2.mjs` (tiempo contra
  scroll y umbrales), `capturar.mjs` (cuadros y video), `spindle.mjs`, `sticky.mjs`, `palabras.mjs`, `palsl.mjs`,
  `dom.mjs`, `dom390.mjs`, `analizar.py` y `serie.py`. Se corren con `node <archivo>` desde un directorio de trabajo;
  `comun.mjs` apunta a `/opt/pw-browsers/chromium-1243`.

Las capturas de Koto son para estudio interno: ninguna de sus letras, imágenes, videos ni código va al sitio.
