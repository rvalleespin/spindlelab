# E12 · Dirección A «Archivo»: el trabajo es lo grande

**17-oct-2026 · Lucía (dirección de arte) · obra E12, paso 2, para la compuerta 2** · rama
`claude/magical-franklin-ckfki2`. **Manda** la sección «Compuerta 1» de `e12/brief-de-obra.md` (los nueve puntos de
Ramón del 16-oct), después `e12/encargo-paso-2.md`, después `e12/lock-koto.md` (§20 y §21 sobre todo). El texto es el
de Clara (`e12/texto/texto-paso2.json`), tal cual. La otra dirección es B «Banco» (`direccion-b.md`): ninguno de sus
archivos se tocó.

**Lo que no se movió:** nada se publicó; `spindlelab-astro/` no se tocó (solo se leyeron `oferta-v3.json`, el script
del chequeo de producción y el retrato de `/nosotros/`, y se corrió su `verificar.mjs` contra el servidor local, que no
escribe archivos); **0 llamadas a generación pagada**; `/home/user/praxis-coach` sigue en `a360d7a` con `git status`
limpio (comprobado al cerrar). Ningún prospecto nombrado, ninguna cifra sin fila en el inventario.

---

## 0 · En una línea

**Koto, su índice y su caso.** Un lienzo `#060606` donde la interfaz se retira (gris, chica, una letra en dos cortes,
cero negrita) y lo que ocupa la pantalla es el trabajo: capturas y grabaciones planas en su marco, del 33 al 59 % de
cada página, con la escala de letra de Koto (48 de tope a 1440) y el índice como un muro de dos columnas. El color lo
pone cada pieza dentro de su marco; la interfaz no tiene ninguno.

| | **A · Archivo** (esta) | **B · Banco** |
|---|---|---|
| Lo que carga la pantalla | El trabajo: una cinta de ocho piezas a 12 columnas en la primera pantalla; el muro; los casos con 59 % de medios | El dato vivo: el chequeo y sus lecturas, la ficha de cada pieza |
| Escala del titular | La de Koto: 48 · 38 · 24 (36 · 26 · 23 a 390) | La declaración grande en el corte condensado |
| Índice | Muro de dos columnas, tres proporciones (4:5, 4:3, 5:3), sin bordes | Lista en tabla con filetes y la pieza al pasar |
| Letra | **Google Sans Flex** (display wdth 76 · wght 300; cuerpo wdth 100 · wght 370) + DM Mono 500 | Mona Sans + DM Mono 500 |
| Logo provisorio | Camino 2, «El huso» | Camino 3, «Dos cortes» |

**Qué sacrifica A.** El hero monumental del brief (la frase va a 48 px, no a escala de cartel). Depende del material
grabado: sin capturas buenas, A se cae, y la cinta y los casos ya usan casi todo lo que hay. Y lleva la letra de los
productos de Google: **un estudio que vende aparecer en Google, escrito con la letra de Google, puede leerse como «de
Google» o «partner de Google»** (lock §6.2). Ramón la eligió sabiéndolo (compuerta 1, punto 8); queda aquí a la vista
para que la pese mirándola.

---

## 1 · Dónde está y cómo se rehace

| Qué | Dónde |
|---|---|
| Las cinco vistas | `proto/a/index.html` (home), `proto/a/trabajo/`, `proto/a/trabajo/praxi/`, `proto/a/trabajo/sesenta/`, `proto/a/servicios/desarrollo-web/` |
| Hoja y movimiento | `proto/a/a.css`, `proto/a/a.js` (Motion 13.5.0 local en `proto/a/vendor/`, sha256 `0d94331c…f0ed3897`, bajado de `cdn.jsdelivr.net/npm/motion@13.5.0/dist/motion.js`) |
| Letras | `proto/a/fuentes/`: Google Sans Flex (subconjunto latino de Google Fonts, ejes `wdth` 25–151 y `wght` 100–1000, 119 kB) y DM Mono 500 (15 kB), con sus dos OFL al lado |
| Medios | `proto/a/medios/` (58 archivos, 6,55 MB; `medios.json` dice de dónde sale cada uno y `cinta.json` cada tramo de la cinta) |
| Capturas | `img/a-<vista>-<1440|390>-primera.jpg` y `-01.jpg`, `-02.jpg`… (página completa en tramos de hasta 4000 px, JPEG 82; 1440 a dpr 1 y 390 a dpr 2): **42 archivos, 12 MB** |
| Recorridos | `video/a-home-1440.webm` (14,2 s) y `video/a-trabajo-1440.webm` (12,7 s; 12,72 con `ffprobe`), 1440 × 900, grabados del navegador con mouse real |
| Mediciones | `proto/a/medicion/mediciones.json`, `campos.json`, `render.json` y cuatro capturas de estados (cursor blanco, cursor cobalto, teclado, chequeo corrido) |

```
cd marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/a/herramientas
node capturar-fuentes.mjs <tmp>                 # capturas vivas de Combeau, Verifica y Cumple, el chequeo y spindlelab.cl
python3 -I medios.py <tmp>                      # deriva los medios (webp 80, VP9) y arma la cinta con ffmpeg
python3 -I armar.py                             # escribe las cinco páginas desde el texto de Clara
python3 -I servir.py 8761 &                     # sirve proto/a y reenvía /api/chequeo a spindlelab.cl
node render.mjs http://127.0.0.1:8761/ ../../../img
node grabar.mjs http://127.0.0.1:8761/ ../../../video
node medir.mjs http://127.0.0.1:8761/ ../medicion/mediciones.json <tmp2>
python3 -I campos.py <tmp2> ../medicion/campos.json
```

**El chequeo corre de verdad.** `servir.py` reenvía `GET /api/chequeo?dominio=…` al chequeo en producción
(`https://spindlelab.cl/api/chequeo`, la misma API que usa el sitio; lee la portada del dominio y no guarda nada). Con
el servidor, escribir `verifica.spindlelab.cl` devuelve **94/100 con sus 21 ítems** (corrido el 17-oct a las 05:16
UTC, captura `medicion/a-chequeo-resultado-1440.png`). Sin el servidor (el HTML abierto como archivo, o dentro del
tablero), el chequeo muestra su error real: «No pudimos completar el chequeo. Inténtalo de nuevo en un momento.», el
texto de producción.

---

## 2 · Lo que se tomó del lock, decisión por decisión

| Decisión | Fila del lock | Cómo quedó (y qué se midió) |
|---|---|---|
| Lienzo `#060606` siempre; placa `#141414`; placa activa `#202020`; blanco para lo nombrado y lo activo; gris `#989898` para el cuerpo; líneas `#2D2D2D` y blanco al 10 % | §20.2 | Sin un tercer gris. El lienzo no cambia en ninguna página, sección, scroll ni estado |
| El color, solo dentro de los marcos del trabajo, y el de cada pieza | §20.2 reglas 2 y 3 | Ningún servicio, ruta ni estado tiene color propio. Medido abajo (§7): fuera de los medios, del 95,2 al 97,1 % de los píxeles es lienzo |
| Letra: **Google Sans Flex** en dos cortes (display wdth 76 · wght 300; cuerpo wdth 100 · wght 370) y DM Mono 500 (rótulo 11 px MAYÚSCULAS +0,03em; dato 12 px) | §6.2, §6.3, compuerta 1 punto 8 | `getComputedStyle`: h1 en Google Sans Flex 300 al 76 %; cuerpo en Google Sans Flex; rótulos en DM Mono. Solo esas dos letras cargan |
| **Interlínea medida para esta letra: 1,35** | §6.4 (pide una por dirección) | La x de Google Sans Flex es 0,711 de la mayúscula (wdth 100, wght 370, medido con fontTools en el archivo que usa A); la de Koto, 0,654. 1,25 × 0,711 / 0,654 = 1,36 → 1,35. B, con Mona Sans, va en 1,4 |
| Escala de Koto: 48 (portada) · 38 (sección) · 32 (siguiente) · 24 (página y caso), y 36 · 26 · 23 · 23 a 390 | §2.1, §16 | `clamp()` entre los dos anchos medidos |
| Cero negrita; la jerarquía por corte y tinta | §2.1, §14 | 0 nodos de texto con peso ≥ 600 en las diez capturas |
| Dos tintas en una frase, una por sección | §2.8, §14 | Las que Clara marcó con «tinta» y «gris» |
| Retícula de Koto: margen 16, separación 8, 8 · 12 · 16 columnas con cortes en 834 y 1194, sin ancho máximo | §2.3, §7 | Ver el desvío del corte de 1024 en §9 |
| Índice: muro de dos columnas con 4:5, 4:3 y 5:3, sin bordes; bajo cada pieza nombre en blanco, bajada en gris y una línea mono con tipo · año · hasta dos ingredientes | §2.4, §7, §14 | Diez entradas, en el orden de Clara (un cliente primero, los conceptos intercalados). El reparto en dos columnas lo hace el HTML y se rehace al filtrar |
| Filtro que filtra de verdad, con el conteo del dato; activo en blanco con el punto de 3 px | §20.4 (a), encargo §2 | Medido: «Concepto (4)» deja Sesenta, Tonela, Ocelo y Doceavo |
| Hover del índice: la pieza se acorta 24 px con el resorte «estado» y las demás se cubren con el velo al 70 % en 167 ms lineales, solo con puntero fino desde 834 | §2.6, §20.1, §20.2 (`--velo`) | Medido: `clip-path: inset(0 0 24px 0 round 6px)` en la pieza y opacidad 1 del velo en las otras |
| Cursor: círculo de 88 px solo sobre el trabajo, que dice adónde lleva (Clara: «Ver el caso» o «Ver el concepto»), sin magnetismo; el puntero del sistema se oculta solo sobre la pieza | §8 | Medido sobre Combeau: «Ver el caso», 88 px, `cursor: none` solo en la pieza |
| **Color del círculo: blanco con el texto en lienzo (20,26:1) y anillo de 1 px en lienzo** | §20.4 (a), la que rige | La opción (b), el cobalto `#316BFF`, queda a una línea: `?senal=cobalto` en cualquier página (captura `medicion/a-cursor-1440-cobalto.png`). Ver §9 |
| Teclado: el círculo se esconde con el primer Tab y vuelve con un movimiento real del mouse; la pieza enfocada muestra el mismo texto quieto en un rótulo; foco blanco de 2 px a 3 px | §8, §15, §19 (regla del 16-oct) | Medido: escala 0 tras Tab, contorno `solid 2px` blanco, «Ver el caso» quieto en la pieza enfocada (`medicion/a-teclado-1440.png`) |
| Resortes de Motion: cursor 2700/104, estado 800/57, entrada 230/31, todos con ζ ≥ 1 | §9 | Los mismos valores que el tablero del paso 1 midió corriendo (75, 139 y 264 ms al 90 %) |
| Entrada: una por sección, sube 50 px una vez, nunca texto de lectura; lo que ya se ve no se esconde | §9, §14 | Con `inView` de Motion. Medido con movimiento reducido: 0 bloques escondidos |
| El encabezado se pliega en la placa al bajar (desde 834) | §9 | La placa entra con el resorte «entrada» |
| La carga como diseño: cada medio espera en la placa con su radio y aparece en 167 ms | §20.7 (lo que queda de A&P) | Sin brillo que corre ni esqueleto animado |
| Caso: barra lateral pegajosa de 320 px (nombre y bajada en dos tintas a 24, ficha mono, índice de secciones con el punto blanco, créditos abajo); medio principal a 1057 × 595; la introducción con el titular a la izquierda y el cuerpo de 493 px a la derecha; rótulo mono en las cinco secciones, también Problema (lock §21.5, desvío de Koto escrito el 18-oct); **solo las cuatro formas de fila**; «Siguiente» con el contacto, el próximo caso y «[ Todo el trabajo ] (10)»; sin pie | §21.1 a §21.5 | Medido a 1440, a la mitad de cada caso: la barra sigue en el viewport (de 80 a 884 px) y el índice marca «La pieza». Praxi: 9 filas más el medio principal; Sesenta: 12 filas más el medio principal, 19 medios |
| A 390: el medio principal a sangre en 4:5 arriba, el nombre y la ficha debajo, y el índice en una barra flotante abajo (nombre en mono gris, la sección activa en mono blanco sobre la placa activa, «+» que abre la lista) | §21.3 | Ver las capturas `a-caso-*-390-primera.jpg` |
| Telemetría verdadera y nada más: la hora de Santiago con su huso (gris), el resultado de tu chequeo con su hora (blanco), los conteos del índice | §11 | Ningún «LAB_STATUS», coordenadas ni contadores decorativos |
| Corchetes: uno por página, alrededor de un enlace mono a un índice | §14 | Home y casos: «[ Todo el trabajo ] (10)». /trabajo/ y Desarrollo web: ninguno |
| Marca de registro: una cruz de 9 × 9 en `--linea-seccion` donde el borde de sección cruza el límite de la barra (x = 336), dos por página, ninguna bajo 1194 | §10, desvío registrado §19 | Solo en los casos (es donde hay barra). Medida en x = 336. Si se lee como adorno, sale una regla de CSS |
| Sandboxes: solo el verdadero, uno por página | §12 | El chequeo, en la home. El modo esqueleto y «esta página como la lee un robot» no van en A: son el terreno de B |
| Accesibilidad: foco visible siempre, AA en todo texto, un h1, landmarks, piso de 11 px, 44 px de área a 390, nada que se entienda solo con hover | §15 | Medido en §7 |
| `prefers-reduced-motion: reduce`: ningún resorte, sin círculo, las entradas en su lugar, ningún video arranca solo | §9, §15 | Medido emulando en la home y en Praxi |

---

## 3 · Las cinco vistas

**1 · Home** (`index.html`). Primera pantalla a 1440: a la izquierda, 12 columnas de **la cinta**, un video de 16 s
con ocho piezas de 2 s (Combeau fotografía, Sesenta, Praxi, Tonela, Verifica y Cumple, Ocelo, Combeau modelo, Doceavo),
cortes secos como en una sala de montaje; debajo, la declaración de Clara a 48 px en dos tintas (la opción
recomendada, «hero-sitio») y su entradilla. A la derecha, 4 columnas: arriba **la ficha de la pieza que está pasando**
(tipo · año, nombre, bajada, y en Praxi «Las personas están generadas con IA.»), que cambia con la cinta; abajo **el
chequeo**, con campo y botón dentro de la primera pantalla. Es el gesto de Koto (la frase en una esquina, el trabajo
lleno) con la prueba al lado. Después: el índice corto como los destacados de Koto (el titular pegado a la izquierda,
Combeau a 16:9, Praxi y Verifica y Cumple en par 4:5, Sesenta a 16:9), «Cada pieza, con su prueba» (la pieza a 8
columnas y su dato con fecha al lado, una fila sin caja), servicios por situación (Desarrollo web primero y a 38 px; las
otras tres a 24; Paid Media y redes en una línea), quién está detrás (el retrato de `/nosotros/` en 3:4, grande y
entero) y el contacto.

**2 · /trabajo/**. La barra lateral de Koto (el titular de Clara en dos tintas, «(10)», la entradilla que explica
cliente, propio y concepto, el filtro) y el muro de dos columnas. Los diez: Combeau fotografía 4:5, Praxi 4:3 (su P en
el amarillo de la marca), Sesenta 4:5, Verifica y Cumple 5:3, Ocelo 4:3, Combeau modelo 4:5, Doceavo 5:3, el chequeo 4:3,
Tonela 4:5, spindlelab.cl 5:3. Las portadas de los conceptos son las de Bruno, con su «CONCEPTO» en la esquina; la línea
mono de cada concepto dice «CONCEPTO · 2026».

**3 · Caso Praxi** (`trabajo/praxi/`). El caso real de la vista 3, como pide el encargo de esta corrida. Medio principal:
el video del inicio de Praxi (los cinco clips del hero, con su pie de generado). Problema sin filas, como la
introducción de Koto, pero con su rótulo, como las otras cuatro; Hipótesis con el par «portada de ahora / lema de antes» a 390; Solución con las reglas de la
landing, la conversación y los números (con el pie de «datos de ejemplo») y la lista «Con qué está hecho» (lo que le
hace al usuario en cuerpo, la herramienta en mono); La pieza con la marca en su amarillo a 16:9 (el gesto de Koto con
Lyft), la portada de Facebook, el reel con los dos avatares y el carrusel; Sin métrica con «Lo que te llevas gratis». La
nota del hueco (faltan las pantallas de la app) va en su sección, con borde punteado porque marca que falta algo.

**4 · Caso de concepto Sesenta** (`trabajo/sesenta/`). La misma plantilla, con el texto de Bruno en
`06-sesenta/caso.md` y sus 12 filas de placas y medios en el orden que él dejó. «CONCEPTO · 2026» en la ficha, a la
vista sin scroll a 1440 y a 390; el sello de la pieza en cada cuadro del recorrido y en la portada de 390. Siguiente:
Verifica y Cumple, la entrada que le sigue en el índice.

**5 · Desarrollo web** (`servicios/desarrollo-web/`), la interior que muestra el juego. **El lienzo no cambia**: el
juego es el de Koto medido en el lock §20.1 y §20.6, el color entra con el trabajo. Una **franja ancha** con la portada
de Doceavo (papel verde pálido, un campo claro, con su nombre y «Concepto · 2026» al pie), **las tres portadas** de «Lo
que construimos» (el verde de Combeau, el amarillo de Praxi, el azul de Sesenta; bajo cada una, la línea corta de Clara: tipo y año) y, en «Cinco fases», el único cambio de
color atado al scroll que Koto tiene, el de `/services`: la fase a la vista pasa del gris al blanco en 167 ms y la
anterior vuelve al gris. Los cuatro planes, tal cual `oferta-v3.json`, con el glosario de Clara antes de las tarjetas.

---

## 4 · El logo, provisorio: camino 2, «El huso»

En el encabezado y el pie va `e12/logo/camino-2-el-huso/camino-2-el-huso-A-blanco.svg` en línea, a 24 px de alto
(130 px de ancho), con `fill="currentColor"`, y su favicon (`proto/a/favicon.svg`, el huso solo). **Calza con A porque
A toma de Koto el índice y el caso, y Koto pone su única idea de marca en el logo**: un signo hecho con una letra del
nombre, más pesado que una interfaz que se retira (Bruno, `caminos.md` §4). El riesgo que Bruno dejó escrito sigue a la
vista: a 24 px el huso se lee bien como «i», pero en grande puede leerse como alfiler o cerradura. El camino se elige en
la compuerta 2, no aquí.

---

## 5 · El material: de dónde sale cada imagen y cada video

Todo es real o es una pieza de concepto rotulada. **Ninguna imagen se generó para A.**

| Material | Origen | Notas |
|---|---|---|
| Combeau fotografía y modelo, Verifica y Cumple, el chequeo, spindlelab.cl | Capturas de los sitios vivos con `capturar-fuentes.mjs`, 17-oct-2026 entre las 04:17 y las 04:24 UTC; solo GET y scroll, ningún formulario. En spindlelab.cl se eligió «Rechazar» en el aviso de cookies | Combeau, con la compuerta 1 punto 2 («no se necesita más permiso», dicho por Ramón). La galería de Combeau y «Las 12 cosas» de Verifica y Cumple ilustran sus datos en «Cada pieza, con su prueba» |
| Praxi | `e12/praxi/capturas/` y `e12/praxi/material/` (Diego, copia local, nunca producción) | **No se usan** `landing-1440-completa`, `landing-390-completa` ni `landing-1440-sec06` (llevan la foto sin procedencia, inventario-praxi §6). Cada imagen con personas lleva el pie de Clara «Las personas de las fotos y del video están generadas con IA…»; cada una con cifras, el de «datos de ejemplo». El hero y el reel se pasaron a VP9 porque el Chromium de Playwright no reproduce H.264 |
| Sesenta, Tonela, Ocelo, Doceavo | `marketing/portafolio/0N-*/` (Bruno): portadas, placas en su versión sobre tinta, medios y recorridos | Tal cual; solo se escalaron y se pasaron a webp |
| La cinta de la home | `medios.py`: cuatro tramos de los recorridos de Bruno y cuatro desplazamientos sobre capturas (Combeau, Praxi, Verifica y Cumple, Combeau modelo), 1280 × 720, VP9 (975 kB) y H.264 (933 kB) | El rótulo de cada tramo sale de `cinta.json` |
| Ramón | `spindlelab-astro/public/assets/img/ramon-vallejos.jpg`, el retrato de `/v3/nosotros/` | Solo lectura |

---

## 6 · El texto: lo que es de Clara y lo que no

Todo el texto visible sale de `texto-paso2.json` por su `id` (`armar.py`), de `oferta-v3.json` (los planes) o de
`06-sesenta/caso.md` (el caso de concepto, que Clara dejó sin reescribir: su pendiente 2). **Lo que no venía en esas
fuentes y hacía falta para que una pantalla funcione**, para que Clara lo confirme o lo cambie:

1. **Nombres accesibles de control:** «Pausar el video» / «Seguir el video» (los botones de pausa), «Principal» (el menú),
   «Secciones» (el índice del caso). No se ven; se leen con lector de pantalla.
2. **El chequeo, una vez corrido:** los textos del resultado son **los de producción**
   (`spindlelab-astro/public/assets/js/v3-chequeo.js`, pase de voz de E8): «Revisando…», los cuatro veredictos, «Pedir
   el diagnóstico», «Cumple / No cumple / No lo pudimos confirmar» para lector de pantalla, y los errores («Escribe tu
   dominio para empezar.» todavía dice «dominio», y el campo ahora dice «La dirección de tu sitio»: lo ve Clara).
3. **Los `alt`** los escribí mirando cada imagen; el del video de Praxi es el de Clara. El `aria-label` de la cinta es mío.
4. **La ficha de la cinta** se arma con las entradas de Clara (nombre, tipo, bajada, línea corta) y, en el tramo de
   Praxi, con la frase de su pie («Las personas están generadas con IA.»).
5. **Sesenta:** el nombre y la bajada, la ficha («Concepto · 2026») y «Lo hecho» salen de la ficha lateral de
   `caso.md`. Su «Siguiente» no tenía texto: usa el contacto de la home («Escríbenos con la dirección de tu sitio…») y la
   entrada de Verifica y Cumple.
6. **Un solo juego de rótulos en los casos** (pendiente 1 de Clara, la decisión era mía): el del lock §21.5, **Problema
   · Hipótesis · Solución · La pieza · Sin métrica**, el mismo de Praxi. En Sesenta, Desafío pasa a Problema,
   Estrategia a Hipótesis, Identidad a Solución, Aplicación a La pieza y Qué muestra a Sin métrica; el texto de cada
   sección no cambia. Clara ajusta los cuatro conceptos.
7. **«Visibilidad en IA →»**: la flecha va dibujada en SVG porque ni Google Sans Flex ni DM Mono traen flechas en el
   archivo que usa A. En el diff de texto contra B, esa «→» es la única diferencia de un elemento de Clara.
8. **Lo que salió por una condición de Clara:** el segundo párrafo de Hipótesis de Praxi (su señal no tiene fila en
   `inventario-praxi`); los ingredientes de los cuatro conceptos (sin fila en el inventario: la línea dice «Concepto ·
   2026»).
9. **Lo que está puesto por defecto y decide Ramón:** el 54 → 94 de Verifica y Cumple (home e índice; la alternativa
   está en el JSON), «Fuera de línea» en Praxi, «con agentes de IA» en sus créditos y la nota del hueco de las pantallas.
10. **Pie del sitio:** el logo, `hola@spindlelab.cl` y la hora; nada nuevo. A 390 no hay botón «Menú»: los cinco
    enlaces caben en una fila de 44 px.

---

## 7 · Mediciones (17-oct-2026, Chromium 141.0.7390.37 con Playwright, servidor local; repetidas el 18-oct después de los defectos 11, 13 y 14 del acta)

| Qué | Resultado | Criterio |
|---|---|---|
| **Desborde horizontal** de 360 a 1920 (360, 375, 390, 414, 600, 768, 834, 1024, 1194, 1280, 1440, 1680, 1920), tal cual y con `overflow-x: clip` inyectado en `html` y `body`, buscando además cualquier elemento que se pase del borde | **0 de 65** vista × ancho, en los dos modos. A no usa `overflow: clip` en ninguna parte | Encargo 17 |
| **Contraste WCAG** de cada nodo de texto, componiendo los fondos y la opacidad heredada (`medir.mjs`), en las diez capturas más dos estados (el resultado del chequeo y el filtro en «Concepto») | **930 nodos, 0 bajo el mínimo** (926 el 17-oct; los 4 nuevos son el rótulo «Problema» de los dos casos a 1440 y 390). El más justo: gris sobre la placa de la barra de 390, **6,39:1**; el resto, 7,02:1 o más. 0 nodos de interfaz sobre un medio | Encargo 5 |
| `npm run verificar` de `spindlelab-astro` con `--base` al servidor local, a 390, 768 y 1440 | 0 de contraste, 0 desborde, un `h1`, 0 imágenes sin `alt` en las tres pasadas. **Dos hallazgos esperados:** las cinco páginas «sin JSON-LD» (la capa de señales es de Simón y entra en la construcción; los prototipos van con `noindex, nofollow`) y 18 enlaces a rutas `/v3/` que este prototipo no construye (servicios, método, nosotros, contacto, diagnóstico y los otros ocho casos) | Encargo 17 |
| Un `h1` por página · `lang="es-CL"` · un `main` | 10 de 10 | Encargo 17 |
| Texto más chico | 11 px (los rótulos mono) | Lock §15 |
| Negrita | 0 nodos | Lock §14 |
| Letras cargadas | Google Sans Flex (100–1000) y DM Mono 500; ninguna otra | Encargo 2 |
| Imágenes rotas · errores de consola | 0 · 0 en las diez capturas | Encargo 17 |
| **Primera pantalla de la home** | 1440 × 900: h1 de 664 a 760 px, campo de 659 a 703, botón de 711 a 755: **dentro**. 390 × 844: campo y botón en la misma fila, de 776 a 820: **dentro, a 24 px del borde** (eran 764 a 808 antes de que el logo midiera 44 de alto; ver la fila de área de toque) | Encargo 10 |
| **Base negra:** píxeles fuera de los medios con luminancia ≤ 0,01, a 1440 | Home 95,2 % · /trabajo/ 96,0 % · Praxi 97,0 % · Sesenta 97,3 % · Desarrollo web 95,2 % | Encargo 4 (≥ 80 %) |
| **Área de medios** a 1440 | Home 32,9 % · /trabajo/ 53,0 % · **Praxi 49,8 % · Sesenta 59,2 %** · Desarrollo web 15,0 % | Encargo 6 (casos ≥ 1/3) |
| **Campos claros y de color** (lock §20.1: el color dominante cubre el 30 % del medio) | **Sesenta 22,3 %** (6 campos) · Home 16,6 % · /trabajo/ 27,0 % · Desarrollo web 13,3 % · **Praxi 6,0 %** (2 campos). Seguidos, como mucho 3 (techo: 4) | Lock §20.3 (caso: del 10 al 35 %) |
| Chequeo | Corrido contra `/api/chequeo`: `verifica.spindlelab.cl` 94/100, 21 ítems | |
| Cursor sobre una pieza | `con-circulo`, «Ver el caso», 88 px, fondo blanco, texto `#060606`, la pieza recortada 24 px y el velo de la vecina en 1 | Lock §8 |
| Teclado | Tab: círculo a escala 0, contorno blanco de 2 px; en la pieza, «Ver el caso» quieto a la vista | Lock §8, §15 |
| Movimiento reducido (emulado, home y Praxi) | Sin círculo, videos detenidos y sin `autoplay`, la pausa en «apretado», 0 bloques escondidos, 0 transiciones | Encargo 16 |
| Teléfono (390, táctil) | Sin círculo; la bajada de cada pieza a la vista | Lock §8 |
| **Área de toque** (18-oct), con `e12/qa-paso-2/vuelta-1/herramientas/area-toque-390.js` de Javiera y, en cada objetivo agrandado, qué elemento recibe el toque en sus cuatro bordes y su centro (`elementFromPoint`) | **0 objetivos bajo 44 × 44** en las cinco vistas a 360, 390 y 768 (teléfono y tableta táctiles); 0 tapados. El logo pasa de 108 × 20 a 108 × 44 en el encabezado y el pie; `hola@spindlelab.cl` del pie, de 125 × 14 a 125 × 44; «O directo a hola@spindlelab.cl», de 176 × 17 a 176 × 44; «Método» y la miga «Inicio», de 42 a 44 de ancho. En el pie y el contacto el área crece con margen negativo y la letra no se mueve (medido contra la versión anterior: la distancia entre el logo, el correo y la hora del pie es la misma al décimo de píxel); en el encabezado el logo tiene el menú justo debajo, así que la fila del menú y todo lo que sigue bajan 12 px bajo 834. A 1440 con mouse no cambia nada: la regla vale bajo 834 px y con puntero grueso | Lock §15 |
| Peso de cada vista (HTML, hoja, JS, Motion, letras y los medios que referencia) | Home 1,78 MB (la cinta, 975 kB) · /trabajo/ 0,65 · Praxi 2,41 · Sesenta 2,32 · Desarrollo web 0,54 | |

---

## 8 · Detector anti-slop sobre A (los dos documentos, corridos por mí antes de entregar; el veredicto es de Javiera)

- **Color:** cero índigo o violeta; el único color de la interfaz es el del círculo, y por defecto es blanco. El
  cobalto de la opción (b) está en 264,2° OKLCH, no en la banda del índigo. Cero degradados de color, cero manchas, cero
  vidrio.
- **Tarjetas:** ninguna. Las placas tienen un rol (encabezado plegado, marca sobre un medio, barra del caso a 390, botón
  secundario, el campo). La única caja con borde es el hueco de Praxi, punteada porque dice que falta algo.
- **Modo oscuro:** lo pide la compuerta 1 (punto 6), medido en Koto. **Serif:** ninguna. **Emoji:** ninguno; tres SVG
  propios (flecha, pausa, seguir).
- **Promedio de referencias:** se preservan los rasgos de Koto (negro, retirada, escala chica, muro, caso, color en el
  trabajo). Lo que no es de Koto tiene fila: la cruz (§10, desvío registrado) y el filtro como lista.
- **Rol de los tokens:** el blanco nombra y marca lo activo; el gris es cuerpo y reposo; la placa nunca agrupa texto
  como tarjeta; el color de campo nunca sale de su marco.
- **Copy:** el de Clara, sin cambios; los textos de control de §6 no rematan con raya ni con pregunta retórica.
- **Estructura:** nada de tres tarjetas iguales (los servicios van por situación, con Desarrollo web a otra escala); el
  hero no es un 100vh vacío: es el trabajo, la frase y el chequeo.
- **Pruebas de fuego.** *Logo tapado:* la primera pantalla sigue siendo de este estudio por lo que muestra (la cinta
  con su ficha y el chequeo al lado), no por el logo. *Rubro cambiado:* no calza, porque el contenido de los marcos es
  este trabajo. *Leído en voz alta:* es el texto de Clara después de dos lecturas frías.

---

## 9 · Lo que queda abierto, para Javiera y para Ramón

1. **El color del círculo.** El encargo de esta corrida pedía «círculo cobalto». El lock §20.4 (que escribí al medir
   el negro) rige la opción (a): blanco, porque Koto no tiene color de interfaz y la compuerta 1 pide regirse por la
   referencia (punto 7); B también va en blanco. **A va en blanco por defecto** y el cobalto `#316BFF` se ve con
   `?senal=cobalto` (un token, una línea; `medicion/a-cursor-1440-cobalto.png`). Si Ramón quiere el azul de su brief,
   es esa línea en las dos direcciones.
2. **La vista 5 no cambia el lienzo.** El criterio 4 del encargo pide que la interior pase de negro a blanco u otro
   color; el lock §20.6 midió que Koto no lo hace en ninguna de 640 paradas y que su juego está dentro de los marcos.
   A lo construye como Koto (franja, portadas, la tinta de las fases). Una interior con el lienzo claro sería un desvío
   de Koto: no está construido en A, y si Ramón lo quiere al ver esto, se rotula como desvío y se decide en la
   compuerta. Mauro ajustó ese criterio el 18-oct a las 21:13 UTC (`01ea00f`, antes del último commit de A,
   `6a340fc`): el criterio 4 y la vista 5 del encargo ya dicen lo que hace Koto (el lienzo no cambia; el color, dentro
   de los marcos del trabajo). En la compuerta 2 la pregunta de la interior clara quedó en «ninguna», por defecto
   (`e12/insumos-ramon-19oct.md`, pregunta 8). El techo de campos de la vista 5 lo cierra `spec-visual.md` §3.4.
3. **Praxi tiene 6,0 % de campos**, bajo el piso de 10 % del lock §20.3. Praxi es una marca oscura con un solo acento, y
   el lock prohíbe recolorear el trabajo (§20.2, regla 3; inventario-praxi §7). Es el caso de Call of Duty en Koto
   (2,9 %). Ya entró la marca en su amarillo a 16:9; subirlo más pediría inventar campos.
4. **El corte del caso y del índice está en 1024, no en 834 ni en 1194.** Entre 834 y 1023 una barra de 320 dejaba la
   columna en 480 px y las filas partidas en 236; desde 1024 la barra cabe con una columna de 656. El lock deja esa
   franja para la spec (§2.3): se mide ahí.
5. **La cinta a 1440 no es 16:9 exacto:** su alto es `clamp(380px, 100svh − 360px, 593px)` para que la frase y el
   chequeo entren en 900 px; a 1440 × 900 queda en 1054 × 540 (1,95:1) y recorta un 9 % del alto de cada tramo. A 390 va
   en 16:9 a sangre.
6. **JSON-LD y enlaces:** las vistas no llevan datos estructurados (la capa es de Simón) y enlazan rutas `/v3/` que no
   existen en el prototipo. Los dos son hallazgos esperados de `verificar`, no defectos de A.
7. **Safari:** la cinta lleva VP9 y H.264; los videos de los casos, solo VP9 (los recorridos de Bruno y los de Praxi
   pasados a VP9). En la construcción, cada uno lleva su H.264.
8. **El riesgo de la letra** (§0): está dicho; lo pesa Ramón mirando.
9. **La primera pantalla a 360 × 800** (fuera del criterio 10, que se mide a 390 × 844): Javiera anotó el campo del
   chequeo 4 px bajo el borde; con el encabezado 12 px más alto (área de toque del logo) queda de 816 a 860. A 390 × 844
   sigue dentro, a 24 px. Si se quiere dentro también a 360, la spec lo resuelve en la primera pantalla de la elegida (la
   cinta a 16:9 a sangre es lo que más alto ocupa), no con un logo de 20 px de toque.

## 10 · Historial

| Fecha | Qué | Origen |
|---|---|---|
| 17-oct-2026 | Primera versión: las cinco vistas, capturas, recorridos y mediciones | Lucía, encargo del paso 2 |
| 17-oct-2026 | El círculo pasa de cobalto a blanco con anillo (lock §20.4 a), con el cobalto a mano con `?senal=cobalto`; se suma la cruz de registro (§10) en los casos | Lucía, al contrastar el encargo de la corrida con el lock y con B |
| 17-oct-2026 | El tablero de la compuerta 2 recomprimió en su lugar, con el mismo ancho, las capturas que pasaban de 450 kB: `a-home-1440-01.jpg` (506 → 433 kB, JPEG 76), `a-trabajo-1440-01.jpg` (482 → 446 kB, JPEG 80), `a-caso-praxi-1440-01.jpg` (508 → 434 kB, JPEG 76), `a-caso-sesenta-1440-02.jpg` (549 → 431 kB, JPEG 68), `a-desarrollo-web-1440-01.jpg` (531 → 445 kB, JPEG 76) (`datos/recompresion.json`). Y su comparación de texto contra B (`datos/diferencias-texto.json`) encontró un defecto de A: bajo las portadas de «Lo que construimos», en Desarrollo web, va la línea completa con las herramientas, y Clara dejó para la home y esta página la línea corta, solo tipo y año (`linea_corta` en `texto-paso2.json`, lectura fría, vuelta 1, punto 9). Queda abierto y se corrige al construir la dirección elegida | Lucía, tablero de la compuerta 2 |
| 18-oct-2026 | **Acta del paso 2, defecto 11 (área de toque a 390).** Bajo 834 px y con puntero grueso, todo enlace suelto mide 44 × 44: el logo del encabezado y del pie (108 × 20 → 108 × 44), `hola@spindlelab.cl` del pie (125 × 14 → 125 × 44), «O directo a hola@spindlelab.cl» del contacto (176 × 17 → 176 × 44), «Método» y la miga «Inicio» (42 → 44 de ancho). En el pie y el contacto con margen negativo, sin mover la letra; en el encabezado la fila del menú baja 12 px para no quedar tapada por el área del logo. Medido con la herramienta de Javiera y con `elementFromPoint` en los bordes de cada objetivo (§7). A 1440 con mouse, nada cambia | Lucía, acta del paso 2 |
| 18-oct-2026 | **Defecto 13.** Problema lleva su rótulo mono a la vista en Praxi y en Sesenta, como las otras cuatro secciones y como B (`armar.py`, `seccion_caso`); el lock §21.5 se corrige en el mismo sentido | Lucía, acta del paso 2 |
| 18-oct-2026 | **Defecto 14.** Bajo las portadas de «Lo que construimos», en Desarrollo web, va la línea corta de Clara (tipo y año), como en la home; la diferencia de texto contra B que lo anotaba sale del tablero (`armar-tablero.py`, `DIFERENCIAS`; `datos/diferencias-texto.json` medido de nuevo: en Desarrollo web solo dejan de estar en A «decap», «netlify», «image», «cdn», «api» y «anthropic») | Lucía, acta del paso 2 |
| 18-oct-2026 | **Defecto 19.** El recorrido de `/trabajo/` dura 12,7 s (12,72 con `ffprobe`), no 12,4; el de la home, 14,2 | Lucía, acta del paso 2 |
| 18-oct-2026 | Rehecho lo que cambió: `armar.py` → las cinco vistas; capturas de las cinco a 390 y de Praxi, Sesenta y Desarrollo web a 1440 (`render.mjs`; a 1440 la home y `/trabajo/` no cambian, así que quedan sus capturas y sus dos recorridos del 17-oct); `medir.mjs` y `campos.py` (§7); el tablero con su script, que recomprimió en su lugar `a-caso-praxi-1440-01.jpg` (510 → 436 kB), `a-caso-sesenta-1440-02.jpg` (550 → 432 kB) y `a-desarrollo-web-1440-01.jpg` (528 → 443 kB), y su `verificar.mjs` a 360, 390, 768 y 1440 sin fallas | Lucía, acta del paso 2 |
| 19-oct-2026 | **Defecto 23 del acta del paso 2.** §9.2 decía «Mauro tenía que ajustar ese criterio y en el repo sigue igual»: el encargo se había reescrito en `01ea00f` (18-oct, 21:13 UTC), antes del último commit de A. La línea dice ahora cuándo se ajustó, qué dice el criterio y que la interior clara quedó en «ninguna» en la compuerta 2. Desde el 19-oct, A es la dirección elegida y su contrato es `spec-visual.md`: donde este documento y la spec difieran, manda la spec | Lucía, spec de E12 |
