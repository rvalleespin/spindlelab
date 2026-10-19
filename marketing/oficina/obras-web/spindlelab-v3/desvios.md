# Desvíos de la construcción · obra E12 · SpindleLab v3 sobre A · Archivo

Lo que la construcción hizo distinto de `spec-visual.md` (§0 a §6), o lo que la spec no cubría, con su porqué y la
solución mínima. Un desvío que no está aquí es un defecto (spec, cabecera; skill `persona-disenador-web`). Cada tanda
de la corrida 2 abre su sección; la de una tanda no se reescribe en la siguiente: se le agrega una fila con fecha.

**Cómo se comprueba que producción no cambió:** `node e12/construccion/comparar-produccion.mjs` después de
`npm run build` en `spindlelab-astro/`. Compara el `dist/` fuera de `v3/` contra la línea base que dejó la tanda 1
(`e12/construccion/base-dist/`, tomada en `03d1bb3`, antes de tocar nada): cada archivo con su md5, y de `_astro/` los que
cargan las páginas publicadas. Sale con 1 si algo cambió.

---

## Tanda 1 · La base de A (19-oct-2026, Diego)

### 1. `Layout.astro`: las cinco props que aprobó Ramón (la excepción de §6.16)

**Qué dice la spec:** §0.5 y la fila del 19-oct de §7: cinco props opcionales en `src/layouts/Layout.astro`, con valor
por defecto igual al de hoy, que solo pasa `/v3/`; las páginas publicadas iguales byte a byte; gtag, consentimiento y
Pixel intactos. Ramón: «Sí, agrégalas» (`e12/insumos-ramon-19oct.md` §5).

**Qué hice:**

| Prop | Por defecto (lo de hoy) | Lo que pasa A (`src/components/a/layout-a.ts`) |
|---|---|---|
| `lenis` | `true`: nada cambia | `false`: `<body data-lenis-prevent>` (ver el punto 2) |
| `letras` | sin valor: las tres precargas de hoy (Inter, Gabarito, Manrope) y las dos hojas | `['/fonts/google-sans-flex-latin.woff2', '/fonts/dm-mono-500-latin.woff2']`: solo esas dos se precargan. Las hojas `inter.css` y `manrope.css` se siguen enlazando: solo declaran `@font-face`, y una letra sin texto que la use no se baja |
| `themeColor` | `#0E141B` | `#060606` |
| `iconos` | sin valor: los tres `<link>` de hoy (`favicon.svg?v=4`, `favicon-32.png`, `apple-touch-icon.png`) | El huso, desde `/v3/marca/`, todos con `?v=5` (spec §5.4) |
| `entidad` | sin valor: `#org` y `#autor-ramon` como hoy | Los campos de Simón (`senales-obra.md` §1.1): `description`, `knowsAbout` (+ «Diseño web» y «Desarrollo de aplicaciones web») y `logo` (`icon-512.png` de El huso) de `#org`; el `jobTitle` propuesto de `#autor-ramon` |

Nada más cambió en el archivo: ni los `<script>` (gtag, Pixel, Lenis, el de aparición, el de videos), ni el aviso de
cookies, ni `consent-banner.js`. **Comprobado:** con el `Layout` nuevo, `npm run build` y `comparar-produccion.mjs`:
las 22 páginas fuera de `/v3/`, sus 110 archivos y los 4 de `_astro/` que cargan, iguales byte a byte.

**El `jobTitle`** es la propuesta de Simón («Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad
en IA»), que él mismo dejó para que **Ramón la confirme antes de publicar**. Va en `/v3/` (con `noindex`) mientras tanto.

### 2. Lenis: «que no se cree» no se puede con las páginas publicadas byte a byte; queda inerte en toda la página

**Qué dice la spec:** §0.5 pedía que Lenis no cargara en A, y la fila del 19-oct de §7 dice que, con la prop, «en A Lenis
no se crea».

**Por qué no se puede, medido:**

1. Astro 4 (4.16.19) junta los `<script>` procesados de todo componente que una página importa, se rendericen o no
   (`node_modules/astro/dist/core/build/plugins/plugin-analyzer.js`: recorre el grafo de importaciones). El de Lenis vive
   en `Layout.astro`, que A tiene que usar (gtag, consentimiento, Pixel): va en el paquete de A igual.
2. Un `<script>` dentro de una condición (`{lenis && <script>…</script>}`) Astro no lo procesa: lo pega tal cual en el
   HTML. Probado en una copia del proyecto: `import Lenis from 'lenis'` quedaba crudo en `/index.html`, que en el
   navegador no corre.
3. Cambiarle cualquier cosa al script (una condición que lea una marca de la página) cambia el paquete compartido
   `_astro/hoisted.Bkkmjuy0.js`, que cargan `/` y `/nosotros/`; su nombre lleva el hash del contenido, así que el
   `<script src>` de esas dos páginas publicadas cambiaría. Eso rompe la condición que puso Ramón.

**La solución mínima:** con `lenis={false}`, el `<body>` lleva `data-lenis-prevent`. Lenis 1.3.26 revisa ese atributo en
cada elemento del camino del evento (`lenis.mjs:609`) y, si lo encuentra, no toca la rueda ni el dedo: el scroll es el
nativo **en toda la página** (también sobre el aviso de cookies, que queda fuera del contenedor de A). Lo que sigue
igual: el script baja con el resto de los del `Layout` y crea su bucle por cuadro, y `html` lleva la clase `lenis`
(que deja `scroll-behavior: auto`, lo que A quiere). Las dos reglas de §5.2 siguen como resguardo: el contenedor de A
lleva su propio `data-lenis-prevent` y todo enlace interno va con su ruta.

**Para la spec (Lucía):** la fila del 19-oct de §7 tendría que decir «Lenis queda inerte» y no «no se crea». Que no
cargue solo se puede cuando no haya páginas publicadas que compartan el paquete con `/v3/`: al publicar A.

### 3. Motion 13.5.0: su dependencia `framer-motion` quedó en 13.5.1

`npm install --save-exact motion@13.5.0`: `package.json` dice `"motion": "13.5.0"` y el lock tiene la integridad de
§5.1 (`sha512-W/Vj6RDg…HDA==`). `motion` 13.5.0 no trae el código: lo reexporta de `framer-motion`, que pide con `^13.5.0`,
y npm resolvió `framer-motion` 13.5.1 y `motion-dom` 13.5.1 (`motion-utils` 13.5.0). El lock los fija, así que el build
es reproducible; no es el mismo código byte a byte que `proto/a/vendor/motion-13.5.0.js`. No agregué un `overrides`
para bajarlos a 13.5.0 porque la spec no lo pide; si Lucía quiere el mismo código que el prototipo, es una línea en
`package.json`.

### 4. La cinta: VP9 a crf 36, y el tramo de Tonela sale del recorrido corregido

`e12/construccion/herramientas/rehacer-cinta.py` (las dos funciones de corte son las de `proto/a/herramientas/medios.py`,
copiadas sin cambios). Los dos tramos de Combeau salen de `e12/casos/combeau/medios/*-cinta.mp4` (spec §3.2); los
otros seis, de las mismas fuentes y con los mismos puntos de partida que el prototipo.

- **VP9 a crf 36, no a 34:** a 34 la cinta nueva pesaba 1.087.506 bytes, sobre el techo de 1 MB por formato (§3.2 y
  §3.5.5). A 36, 976.539. El H.264 queda a crf 26, como en `medios.py`: 986.256 bytes.
- **Tonela no es idéntica al tramo del prototipo** (PSNR 26 contra 99 de Sesenta y Doceavo): Bruno rehizo su recorrido el
  18-oct (`7b0f2c6`, el piso de 11 px de las bandas, defecto 17 del acta del paso 2), después de que se armara el
  prototipo. Va el recorrido de hoy, que es el corregido. Praxi, Verifica y Cumple y Ocelo dan de 46 a 59 dB: los
  mismos cuadros, con la pérdida de volver a comprimir.
- **La captura de Verifica y Cumple** es la del 17-oct (`capturar-fuentes.mjs`), que vive fuera del repo, como cuando se
  armó el prototipo: el script la pide como argumento. Lo medido está en `rehacer-cinta.json`.
- El tramo nuevo de «Combeau, modelo» mirado cuadro por cuadro (12 a 14 s): el book y el menú del sitio; ninguna línea
  de medidas, ficha ni contacto.

### 5. El CSS que comparten las páginas publicadas cambia de nombre si un componente importa el `Layout`

**Qué dice la spec:** §5.2 y §5.3 hablan de «el componente base de A» que envuelve encabezado, `main` y pie, y de que las
páginas de A pasan `bodyClass="a-body"` al `Layout`. No dice quién importa el `Layout`.

**Lo que pasó, medido:** el primer `PaginaA.astro` importaba el `Layout` y las páginas lo usaban a él. Con eso, el CSS de
`global.css` que cargan `/` y `/nosotros/` pasó de llamarse `_astro/index.BudKb2Rm.css` a `_astro/prueba-base-a.BudKb2Rm.css`:
el mismo contenido (mismo hash), otro nombre, y el `<link>` de las dos páginas publicadas cambiaba. Astro 4 nombra ese CSS
con la primera página que encuentra al subir desde `global.css` por quienes importan el `Layout`, en orden alfabético de
ruta (`css-asset-name.js`, `getFirstParentId`): `src/components/…` va antes que `src/pages/index.astro`.

**La solución:** **ningún componente importa el `Layout`.** Cada página de A lo importa ella misma, con las props de
`src/components/a/layout-a.ts`, y pone `PaginaA` adentro (el uso está escrito en la cabecera de `PaginaA.astro`):

```astro
<Layout title="…" description="…" {...LAYOUT_A}>
  <meta slot="head" name="robots" content="noindex, nofollow" />
  <script slot="head" type="application/ld+json" is:inline set:html={…} />
  <PaginaA> … </PaginaA>
</Layout>
```

Las páginas de A viven en `src/pages/v3/`, que va después de `src/pages/index.astro`: el nombre no se mueve. **Para las
tandas que siguen:** ninguna página nueva fuera de `src/pages/v3/` y ningún componente que importe el `Layout`; y correr
`comparar-produccion.mjs` después de cada build.

### 6. Tailwind lee los `.astro` de A: los scripts van en `.mjs`

`tailwind.config.mjs` (diff 0) lee toda palabra de los `.astro`, `.js` y `.ts` de `src/`. Una palabra que coincide con
una clase de Tailwind que hoy no se usa («transform», «fixed», «contents»…) se agrega al CSS que comparten las páginas
publicadas, y su archivo cambia de nombre. Por eso la lógica de A está en `src/scripts/archivo/*.mjs` (que Tailwind no
lee) y los `.astro` de A no llevan `<style>` ni scripts largos; las reglas, en `src/styles/archivo.css` (tampoco lo lee).
El guardia es `comparar-produccion.mjs`: si una tanda agrega una palabra así, el CSS publicado cambia y el script falla.

### 7. Valores que la spec no fijaba y cómo los resolví

| Qué | Lo que hice | Por qué |
|---|---|---|
| Los espacios del encabezado (logo → menú, entre ítems) | 56 y 40 px desde 1194; **40 y 32 de 834 a 1193** | El prototipo usaba 60 y 36, fuera de la escala de §1.5: van al paso más cercano. Con 56 y 40, plegado a 834 la hora se salía 15 px de la placa (logo 117 + menú 437 + hora 139 + 2 × 56 = 805 en una caja de 778); un paso menos y cabe (medido de 834 a 1024) |
| El anillo del círculo del cursor | `border: 1px` en lienzo, no `box-shadow` | §1.5: «es un borde, no una sombra». El prototipo usaba una sombra |
| El contorno del foco con radio 2 (§1.5) | Solo en lo que no tiene radio propio (enlaces, `summary`); botones, campo, pausa y medios conservan el suyo | El prototipo ponía `border-radius: 2px` en todo `:focus-visible`, y al enfocar un botón su radio pasaba de 4 a 2 |
| La miga | El separador «·» es un `span` con `aria-hidden`, nombre «Miga de pan», lista ordenada, la actual con `aria-current` | Como la miga del v3 anterior (`components/v3/Miga.astro`): el `::before` del prototipo lo leen algunos lectores de pantalla |
| El menú, en una página de su sección | `aria-current="true"` (un caso está dentro de Trabajo); `"page"` solo en la página misma. Los dos en blanco | §2 dice «la página actual en blanco con `aria-current`» y no cubre las páginas de sección |
| Sin JS | `body.a-sin-js` (lo pone `LAYOUT_A`, lo quita un script en línea al empezar `PaginaA` y `base.mjs`): las imágenes se ven de entrada y la pausa no aparece | El prototipo lo hacía con una clase en `<html>`, que A no puede poner sin tocar el `Layout` |
| El video | La imagen quieta es un `<img>` con el póster debajo del `<video>`, en todos los videos y no solo en la portada (§3.1.1); su `alt` es la descripción de Clara, vacío en la portada | El video va con `aria-hidden` (§3.5): sin eso, un video de un caso no tenía alternativa de texto |
| La pausa | `aria-pressed` dice lo que eligió la persona, no si el video está parado en ese instante: fuera de la vista se pausa solo, y apretar «Pausar» ahí sigue pausando | Medido: con la primera versión, apretar «Pausar» justo al volver a la vista lo hacía correr |
| El resultado del chequeo | Lo pinta `v3-chequeo.js` sin cambios; `archivo.css` viste sus clases (`.chq-*`) con el sistema de A. La marca (✓ ✕ ?) que escribe el script no está en ninguna de las dos letras: se oculta y se dibuja el punto de 9 px del prototipo (lleno si cumple); lo que lee el lector de pantalla es el texto oculto del script | §2.1: «con el sistema de A (prototipo `.res__*`)», y el prototipo no usaba el script de producción |
| El botón «Cookies» del pie | Lo cuelga `consent-banner.js` junto al correo, con estilo en línea; bajo 834 y con puntero grueso se le da el área de 44 (con `!important`) | §4.3: 44 × 44 también en los correos sueltos (medido antes: 49 × 14) |
| El aviso que confirma la elección de cookies (`#cookie-aviso`) | Placa, radio 4, sin sombra ni borde, texto gris en Google Sans Flex 14 y botones del sistema (con `!important`: viene en línea) | §4.3 viste el aviso; el de confirmación lo crea el script y la spec no lo nombra |
| Lo fijo no tapa el foco | `scroll-padding-top: 80px` desde 834 solo con foco de teclado (el encabezado pegajoso) y `scroll-padding-bottom` del alto del aviso de cookies mientras está abierto (medido en esta tanda: 69 px en una fila, 115 de 600 a 834, 134 de 390 a 414, 153 a 360) | §4.3 lo pide para las barras pegajosas; el aviso es fijo abajo y pasaba lo mismo en driftime |

### 8. Lo que queda para Lucía o para Ramón (no lo resolví a la fuerza)

1. **El favicon SVG.** La spec §5.4 pide `favicon.svg` junto al `.ico` y los PNG, y así está (todos con `?v=5`). El README de
   Bruno, que llegó después de la spec, recomienda **no** declarar el SVG: Chrome y Firefox lo prefieren, y a 16 px pinta
   26 píxeles grises contra 10 del dibujado a mano. Si Lucía acepta la recomendación, sale una línea de `layout-a.ts`.
2. **Los casos no tienen pie (§2), y el botón para cambiar las cookies vive en el pie:** `consent-banner.js` lo cuelga del
   `<footer>`, así que en las seis páginas de caso no aparece. Se puede cambiar desde cualquier otra página. Si hace falta en
   el caso, la spec dice dónde.
3. **El pie de A no enlaza a `/privacidad/`** (la spec no lo pone); el aviso de cookies sí la enlaza.
4. **Lenis** (punto 2): la fila del 19-oct de §7 dice «no se crea»; lo construido lo deja inerte.

### 9. La página de prueba

Para probar los componentes antes de que existan las rutas usé `src/pages/v3/prueba-base-a.astro` (fuera del mapa del
brief §3). **Se borró antes del commit final de la tanda** y nunca entró a un commit. Las capturas y las medidas son de
ella: `e12/construccion/capturas/tanda-1/` (390 y 1440, página entera y primera pantalla; el cursor y el encabezado
plegado a 1440; el aviso de cookies a 390) y `medidas.json`.

### 10. Lo verificado en esta tanda

- `npm run build` + `comparar-produccion.mjs`: las 22 páginas publicadas y lo que sirven, iguales byte a byte. Nuevos fuera
  de `v3/`: solo las dos letras de A y sus OFL en `fonts/`.
- `npm run verificar -- --prefijo /v3/` a 390 y a 1440: sin hallazgos (22 páginas, con la de prueba); con `--sin-pildoras`
  en la de prueba, sin hallazgos.
- Render de la página de prueba a 360, 390, 768, 834, 1024, 1194, 1440 y 1920 (`herramientas/capturar.mjs`), mirado:
  desborde 0 también sin el `overflow-x: clip` de `global.css`, un `h1`, encabezado de 90 bajo 834 y de 64 desde 834,
  solo Google Sans Flex y DM Mono cargadas, cero errores de consola.
- `herramientas/comprobar-base.mjs` sobre el build: una muesca de rueda llega al 90 % en 45 a 58 ms (§5.2.4: < 100);
  cero `a[href^="#"]`; el enlace para saltar es lo primero con Tab, se ve y va a `/v3/…/#contenido`; el encabezado se
  pliega en la placa (opacidad 1, fila a 28 px); el círculo aparece sobre la pieza con «Ver el caso», se esconde con Tab,
  sigue escondido si la página se desplaza bajo el mouse quieto y vuelve con un movimiento real; la portada toma
  `hilo-1920.webm` a 1440 y `hilo-960.webm` a 390; la pausa para el video y dice «Seguir el video»; con movimiento
  reducido ningún video corre, la pausa dice «Seguir el video» (y al apretarla corre), no hay círculo ni entradas, y las
  transiciones son 0 s.
- El chequeo, con una respuesta real de `/api/chequeo` servida al navegador de prueba: el resultado se pinta con el sistema
  de A; el error del campo vacío y el de un sitio que no abre salen en blanco bajo el campo; borde del campo `#707070`.

---

## Tanda 2 · La home (`/v3/`) y el índice de trabajo (`/v3/trabajo/`) (19-oct-2026, Diego)

**Qué se construyó.** `src/pages/v3/index.astro` (la home de driftime se reemplaza entera) y `src/pages/v3/trabajo/index.astro`
(sale de `src/pages/v3/trabajo.astro`, que se borra: la URL no cambia). Nuevos: `src/components/a/Pieza.astro` (una entrada
del trabajo, para el índice corto y el muro), `src/scripts/archivo/cinta.mjs` y `muro.mjs`, `src/data/archivo/texto.mjs` y
`texto/*.json` (el texto de Clara), `src/data/archivo/medios.json` (de dónde sale cada medio y su `alt`), 18 medios en
`public/v3/medios/` y las dos imágenes al compartir en `public/assets/img/`. Compartido con la tanda 1, tocado:
`archivo.css` (dos bloques nuevos, HOME e ÍNDICE, y una regla del chequeo, punto 9) y `video.mjs` (punto 13). Las
herramientas, en `e12/construccion/herramientas/` (abajo, en cada punto).

### 1. spindlelab.cl en el muro: la portada del prototipo es el hilo de oro

**Qué dice la spec:** §2.2 y §3.3 ponen en el muro las diez portadas de `proto/a/medios/`, entre ellas `spindlelab-53.webp`
(la portada de spindlelab.cl a 1440, 17-oct). **Y §6.8 prohíbe** «el hilo de oro en un marco de trabajo, en el índice»;
la regla de la obra: el hilo de oro solo en la portada de la home. Esa captura **es** el video del hilo de oro detrás del
titular del sitio publicado (mirada lado a lado con `public/video/hero-hilo-de-oro.jpg`). La spec choca consigo misma.

**Lo que hice (la solución mínima):** la misma entrada, en la misma forma (5:3) y con el mismo método (sitio vivo, 1440,
primera pantalla), de una página del mismo sitio sin el hilo: **`/privacidad/`**, con el aviso de cookies abierto como lo
ve quien entra por primera vez. Las demás páginas publicadas llevan el hilo (blog, contacto) o videos e imágenes de banco
(método, servicios), y `/diagnostico/` ya es la portada de «El chequeo de 21 señales». La privacidad es justo lo que
cuenta la bajada de la entrada («… no cargan hasta que aceptas las cookies»). Herramienta:
`capturar-spindlelab.mjs` (`public/v3/medios/spindlelab-privacidad-53.webp`, 32.912 bytes, HTTP 200, 19-oct 17:14Z). Su
`alt` lo escribí mirándola. **Para Lucía:** si prefiere otra página, es una línea de `trabajo/index.astro` (`PORTADAS`).

### 2. Praxi en «Cada pieza, con un dato medido»: la spec y el prototipo no usan la misma captura

**Qué dice la spec:** §3.3, fila «Cada pieza, con su prueba»: «Praxi (sus números, con “datos de ejemplo”)». El prototipo
ponía `praxi-reglas-169` («Debajo del chat hay reglas…»), y la diferencia no está en la lista de §0.4. **Manda la spec:**
va `praxi-numeros-169` con el `alt` y el pie que Clara le escribió a esa misma captura en el caso
(`texto-obra.json`, caso-praxi, medios de «Solución»: «Los números son de ejemplo: los escribimos para la portada de Praxi
y no son de un usuario.»). La página los lee de la copia del caso y el build se cae si el `alt` de `medios.json` no es
el de Clara. **Para Lucía:** el dato de esa fila (384 pruebas que pasaron el 16-oct) habla de las reglas; si prefiere la
captura de las reglas, cambia una línea y el pie sale.

### 3. El texto de Clara, tal cual, sin escribirlo a mano en la página

La spec no dice cómo llega el texto al sitio. `texto-obra.json` vive en `marketing/`, fuera de `spindlelab-astro/` (el build
no debe depender de eso, y `astro dev` lo bloquea). `extraer-texto.mjs` copia, sin cambiar una letra, el objeto de cada
página pedida (home, trabajo, caso-praxi y «comun») a `src/data/archivo/texto/<id>.json`, con el sha256 del origen;
`extraer-texto.mjs --comprobar` dice si alguna copia quedó atrás. Las páginas buscan cada texto por su id
(`texto.mjs`), y **el build se cae** si un id no existe, si un precio o un nombre de servicio no es igual, como texto, al
de `oferta-v3.json` y `servicios-v3.json` (los cuatro precios de la home, los nombres, los destinos, y los dos precios
dentro de la frase de Paid Media y redes), si los conteos del filtro y el «(10)» no salen de las entradas, o si los
ocho tramos de la cinta no son los mismos que los de `cinta.json`. Los `.json` no los lee Tailwind (tanda 1, punto 6).
Para las tandas que siguen: `node e12/construccion/herramientas/extraer-texto.mjs <ids de sus páginas>`.

### 4. Lo que la spec no fijaba de la home, y cómo lo resolví

| Qué | Lo que hice | Por qué |
|---|---|---|
| El título de la sección 4 | «Cada pieza, con un dato medido. Y su fecha, para que lo revises tú.» (Clara) | Clara la renombró después de la spec (su pendiente para Lucía); la spec la nombra por el título viejo. Es la misma sección, con los mismos ids |
| La imagen quieta de la portada | Se ve de entrada (`opacity: 1`), sin esperar al script que hace aparecer los otros medios en 167 ms | §3.1: «es lo primero que se pinta … y el candidato a LCP». Con la regla general esperaba a `base.mjs` |
| El espacio entre rótulo, `h1` y entradilla de la portada | 16 px (el estudio usaba 14, fuera de la escala de §1.5) | La escala. Bajo 834 el botón del chequeo queda 4 px más abajo que en la tabla de §3.1: a 48 px del borde a 360 × 800 (spec: 52) y a 96 a 390 × 844 (spec: 100). Desde 834 no cambia nada: los bloques se apoyan abajo |
| El velo y el puntero | El bloque del velo no recibe el puntero; el texto y el chequeo sí | Cuando la portada es baja, la rampa del velo pasa sobre la pausa (que vive en el medio, debajo) y la tapaba al clic |
| La cinta bajo 1194 | El rótulo de placa arriba a la izquierda dice «nombre · tipo · año» (la ficha de Clara en una línea); la nota de personas generadas va en otra placa abajo a la izquierda, con ancho máximo para no tapar la pausa (100 % − 80 px) | §2.1 dice «la ficha va como rótulo sobre la cinta» y no dice dónde va la nota, que la regla de Praxi y Verifica y Cumple pide junto a la imagen |
| La imagen quieta de la cinta | `alt=""` | La sección lleva el nombre que Clara le escribió (`aria-label`) y la ficha dice qué pieza pasa; el `alt` del cuadro repetiría el nombre |
| El enlace de la ficha cuando el tramo es Verifica y Cumple | La flecha ↗ y el «(sitio aparte: verifica.spindlelab.cl)» oculto, como en el índice | §2.2 y `comun.externo` (Clara) |
| El pie de la persona generada en el índice corto | Bajo la portada de Verifica y Cumple, a chico | Clara: «Junto a la portada de Verifica y Cumple» |
| El índice corto | Con el círculo del cursor, sin acortarse ni velo | §4.2 pone el círculo sobre el índice corto; el acortarse y el velo son de «Pieza del índice» (§2.2, §4.1), como en el prototipo |
| Las entradas con resorte (una por sección, §1.6) | El marco de la cinta, el marco de la primera pieza del índice corto, el medio de la primera fila de pruebas y el retrato. Ninguna en la portada, servicios ni contacto | «El medio o el abridor de una sección … nunca texto de lectura» |
| La situación de cada servicio | A cuerpo, en gris, como el prototipo | Clara la marca «rotulo · situacion»: es su rol, no su letra; en mono y mayúsculas sería una frase en rótulo (lock §14: «nunca una frase») |
| Los botones de servicios | Desarrollo web, botón claro; los otros tres, de placa (prototipo). De 834 a 1193, en c10–c12 (194 px a 834), los nombres largos parten en dos líneas dentro del botón | Las columnas de §2.1. Sin partir, «Ver Auditoría SEO técnica» se sale de la columna |
| El chico del chequeo y la entradilla del índice | Con el tope de 493 de la caja | §1.3: «tope de 493 px en todos los anchos». A 768 la ayuda del chequeo corría a 736 px y la entradilla del índice, a 800 entre 834 y 1193 |

### 5. El muro: el documento en el orden de Clara

**Qué dice la spec:** «dos columnas de igual ancho con 8 px entre ellas … en el orden de Clara»; el prototipo lo hacía con
dos contenedores de columna en el documento (1, 4, 5, 7, 9 | 2, 3, 6, 8, 10), y así lo recorría el teclado. Bajo 834,
apiladas, se veían en ese orden y no en el de Clara.

**Lo que hice:** el documento va en el orden de Clara y la retícula reparte (`muro.mjs`): cada pieza a la columna más corta
y tantas filas de 1 px como mide, más los 32 de separación. Sin JS, cada pieza en la columna que le tocó en el build
(`data-col`, con las alturas de su proporción) y las filas alineadas. Medido (`comprobar-tanda-2.mjs`): Tab recorre las
piezas en el orden de Clara; las columnas son las del prototipo; 0 piezas pisadas con cada filtro; 32 px entre piezas.
El reparto al cargar mueve el muro: CLS de 0 a 0,027 a 1440 (según si el navegador pintó antes del script) y 0,024 a
834; bajo 0,1.

### 6. El filtro y la línea mono

- **El filtro**: un grupo con el nombre de Clara («Filtrar por tipo»); cada botón con `aria-pressed` y su nombre accesible
  tal cual lo escribió Clara («Todo (10)»): el nombre va a cuerpo y el conteo en mono, con `aria-hidden` para no leerlo
  dos veces. Sin JS no se muestra (no filtraría). Con puntero grueso tiene 44 de alto también desde 1194 (§4.3).
- **La línea mono del muro es tipo · año, sin ingredientes** (Clara; la spec dice «hasta dos»: cero cabe).

### 7. La barra lateral del índice

Desde 1194 es pegajosa y, si es más alta que la pantalla, se desplaza adentro (`max-height` de §2.3 para el caso, el
mismo criterio). El desplazamiento recortaba el contorno del foco de los botones del filtro, pegados al borde: lleva 8 px
de relleno a los lados y el mismo margen negativo, y lo que se ve no se mueve. La miga («Inicio · Trabajo», Clara) va
arriba de la barra.

### 8. Las señales (Simón, `senales-obra.md` §2.1 y §2.2)

`title` y `description` de Clara, que son los de Simón (55 y 156; 47 y 159); el build se cae si se salen de los largos de
§1.2. JSON-LD por el slot `head`: la home, el `WebPage` de §2.1; `/trabajo/`, `CollectionPage` + `ItemList` (10, en el
orden del muro, con los nombres de la tabla de Simón; spindlelab.cl como `CreativeWork` sin `url`; Verifica y Cumple con
la del producto) + `BreadcrumbList` igual a la miga. **Las imágenes al compartir de §1.6**, hechas como dice Simón (HTML
renderizado en la letra y el negro de A, nada generado, sin el hilo): `og-e12-marca.jpg` (50.825 bytes) y
`og-e12-trabajo.jpg` (63.429 bytes), 1200 × 630, con `og-tanda-2.mjs`. En la de `/trabajo/` la portada de Sesenta va más
grande que las otras dos para que su «CONCEPTO» se lea en la tarjeta (§1.3, regla 1); a la misma escala que las otras
medía unos 13 × 4 px. Son archivos nuevos fuera de `v3/`: el comparador los lista y no cambian ninguna página publicada.

### 9. El resultado vacío del chequeo no suma su separación

`#chq-out` está vacío hasta que hay resultado (y en su lugar, para que el lector de pantalla anuncie lo que llegue), pero
sumaba 20 px (la separación del grupo y su margen) bajo la ayuda, y el chequeo no quedaba apoyado en la misma línea que
la frase (§2.1). Una regla en `archivo.css` (`.chequeo > #chq-out:empty`). Con ella, a 1440 × 900 el campo queda de 696 a
740 y el botón de 748 a 792, lo mismo que la tabla de §3.1.

### 10. La portada, medida sobre el video (§3.1: «si cambia el archivo, el velo o el texto, se mide de nuevo»)

Con las herramientas de Lucía sobre la home construida: `portada-home.mjs` (es `e12/spec/herramientas/portada.mjs` con un
cambio: abre el build y pone el blanco puro en la imagen quieta desde el navegador) y `contraste-portada.py` contra los
121 cuadros de `hilo-1920.webm`. Datos: `e12/construccion/medicion-portada/`.

| Tamaño | Líneas sobre el video | Bajo el mínimo | La peor (spec §3.1) | Sin velo | Borde del campo | Botón |
|---|---|---|---|---|---|---|
| 360 × 800 · 390 × 844 · 414 × 896 · 768 × 1024 | 0 (franja) | 0 | gris 7,02:1 | | 4,09 | a 48 · 96 · 176 · 135 px del borde (spec 52 · 100 · 180 · 139; punto 4) |
| 834 × 1112 | 19 | 0 | 5,42:1 (5,43) | 1,21 | 3,29 | a 105 (105) |
| 1024 × 768 | 15 | 0 | 5,38:1 (5,38) | 1,05 | 3,25 | a 87 (87) |
| 1194 × 834 | 17 | 0 | 5,31:1 (5,31) | 1,04 | 3,24 | a 107 (107) |
| 1280 × 800 | 18 | 0 | 5,32:1 (5,32) | 1,03 | 3,23 | a 107 (107) |
| **1440 × 900** | 17 | 0 | 5,34:1 (5,34) | 1,11 | 3,27 | **a 108** (108) |
| 1920 × 1080 | 15 | 0 | 5,50:1 (5,50) | 1,12 | 3,29 | a 89 (89) |

A 375 × 667 el botón queda 93 px bajo el borde (spec: 89; fuera de los anchos de la obra, ya dicho en §4.4).

### 11. Los techos de campo (§3.4), medidos

`campos-tanda-2.mjs` (captura de página completa a 1440 y las cajas de cada medio) + `campos.py` del prototipo +
`campos-cinta.py` (la cinta tramo por tramo). Datos: `e12/construccion/medicion-campos/`.

- **Home: 10,3 %** con la cinta en su póster; **15,5 %** con la cinta en su tramo más claro (Ocelo, `#E8F8E8` en el 58 %
  del marco) — techo 20 %. Campos seguidos, a lo más 2 (techo 2). La portada no es campo (dominante `#080808`).
- **`/trabajo/`: 26,6 %** (5 portadas) — techo 35 %.
- Negro fuera de los medios: 96,1 % y 96,3 %.

### 12. Lo que queda para Lucía o para Ramón (no lo resolví a la fuerza)

1. **El aviso de cookies tapa el chequeo en el teléfono la primera vez.** §4.3: «nada importante queda tapado por él en la
   primera pantalla: se mide con el aviso abierto»; §4.4 pone el botón a 52 px del borde a 360 × 800 y a 100 a 390 × 844,
   medidos sin el aviso. Con el aviso abierto (153 y 134 px de alto, tanda 1) tapa el campo y el botón: a 390 × 844 el
   aviso empieza en 710 y el campo va de 704 a 748; a 360 × 800, el aviso en 647 y el campo de 708 a 752. A 1440 × 900 no
   tapa nada (aviso en 831, botón hasta 792). Achicar el aviso no alcanza a 360 (el botón queda a 48 del borde). La salida
   es de la spec: o el aviso arriba en A, o la portada del teléfono más baja, o se acepta hasta que la persona elige.
2. **Los enlaces a los casos responden 404 hasta que los construyan las tandas que siguen**: `npm run verificar` da 0
   páginas con hallazgos y 7 enlaces rotos, todos a `/v3/trabajo/combeau/` (#fotografia y #modelo), `praxi/`, `sesenta/`,
   `ocelo/`, `doceavo/` y `tonela/`.
3. **El error del chequeo vacío sigue diciendo «Escribe tu dominio para empezar.»**: vive en `v3-chequeo.js`, que esta obra
   no toca; el cambio de Clara («Escribe la dirección de tu sitio para empezar.») espera su fila en la spec.
4. **La portada de spindlelab.cl en el muro** (punto 1) y **la captura de Praxi en las pruebas** (punto 2).

### 13. `video.mjs` (tanda 1): un video quedaba parado si se pasaba rápido por él

Medido en esta tanda: si la persona pasa por un video y sale de la vista antes de que arranque, `play()` se interrumpe con
la pausa (`AbortError`) y el script lo tomaba como «el navegador no deja reproducir»: el video quedaba parado para siempre
y el botón decía «Seguir el video» sin que nadie lo hubiera pausado (reproducido: un desplazamiento rápido sobre la cinta
la dejaba en el segundo 0). Ahora solo se queda en pausa si el error es otro. `comprobar-base.mjs` sobre la home, después
del cambio: la pausa y el seguir, las fuentes por ancho y el movimiento reducido dan lo mismo que en la tanda 1.

### 14. Lo verificado en esta tanda

- `npm run build` + `comparar-produccion.mjs`: las 22 páginas publicadas y lo que sirven, iguales byte a byte. Nuevos fuera
  de `v3/`: las dos imágenes al compartir (y las letras de la tanda 1).
- `npm run verificar -- --prefijo /v3/` a 390, 768 y 1440 (y con `--sin-pildoras` a 1440): 0 páginas con hallazgos; los 7
  enlaces del punto 12.2. A 1440, 8 nodos sobre el degradado del velo, medidos aparte (punto 10).
- Render con Chromium a 360, 390, 768, 834, 1024, 1194, 1440 y 1920 de las dos páginas (`capturar.mjs`), mirado: desborde
  0 también sin el `overflow-x: clip`, un `h1`, encabezado de 90 bajo 834 y de 64 desde 834, solo Google Sans Flex y DM
  Mono, cero errores de consola. Capturas a 390 y 1440 en `e12/construccion/capturas/tanda-2/`, con la pieza del muro
  bajo el mouse (`comprobar-tanda-2-trabajo-hover-1440.png`), el cursor y el encabezado plegado.
- `comprobar-base.mjs` sobre las dos páginas: la rueda llega al 90 % en 44 y 45 ms; cero `a[href^="#"]`; saltar al
  contenido con su ruta; encabezado plegado; el círculo aparece, se esconde con Tab y vuelve con un movimiento real; la
  portada toma `hilo-1920.webm` a 1440 y `hilo-960.webm` a 390; con movimiento reducido ningún video corre.
- `comprobar-tanda-2.mjs`: el filtro (10, 2, 4, 4, 10 piezas; `aria-pressed`); el orden con Tab; Verifica y Cumple con
  «Ver el sitio» y «(sitio aparte: …)» en su nombre; spindlelab.cl sin enlace, círculo ni velo; al pasar el mouse, la
  pieza recortada 24 px y las otras nueve con el velo en 1; la ficha de la cinta cambia cada 2 s (Praxi y Verifica y
  Cumple con su nota; Verifica y Cumple con la flecha); en la portada, la pausa es el control que va antes del campo.
- Área de toque a 390 (táctil): 0 controles bajo 44 × 44 en las dos páginas (`area-toque-390.js` del paso 2).
- En el HTML de las dos páginas: cero «54 → 94», «36 → 73», `praxi.coach`, «en pausa», «fuera de línea», `Review`,
  `VideoObject` y `<!--`; los precios a la vista son los seis de los JSON; ningún `alt` con medidas de Combeau.

---

## Tanda 3 · La plantilla de caso y sus seis páginas (19-oct-2026, Diego)

**Qué se construyó.** `/v3/trabajo/praxi/`, `/combeau/` (una página, con `#fotografia` y `#modelo`), `/sesenta/`,
`/ocelo/`, `/doceavo/` y `/tonela/`, desde una sola ruta, `src/pages/v3/trabajo/[caso].astro`, y una sola plantilla
(spec §2.3), `src/components/a/Caso.astro`, con dos piezas nuevas: `FilaCaso.astro` (una fila de medios en las cuatro
formas de Koto, o el hueco) y `MedioCaso.astro` (una imagen o un video de la fila). Lo que la plantilla pinta lo arma
`src/data/archivo/casos.mjs` (`modelo()`): el texto de Clara por su id (las copias `texto/caso-*.json`, sacadas con
`extraer-texto.mjs`), cada medio por su nombre en `medios-casos.json` y en `texto-obra.json` (su alt y su pie), el orden
de las filas, el siguiente caso y el JSON-LD. **El build se cae** si falta un texto, si Clara no le escribió alt a un
medio, si un elemento de Clara no se sabe pintar, si el rótulo de una sección no es el del índice, si el destino de
«Siguiente» no es el que manda el orden de la spec o si el corchete no dice el conteo de `/trabajo/` (10). El índice de
secciones y la barra flotante los mueve `src/scripts/archivo/caso.mjs`.

**Los medios** (`e12/construccion/herramientas/medios-casos.py`, sin generar nada): 120 archivos en
`public/v3/trabajo/<caso>/` (21,0 MB en total; de 2,0 MB Doceavo a 4,9 MB Combeau), imágenes en WebP y cada video en VP9 y
H.264 (`faststart`, sin audio). Praxi y Sesenta, las capturas y placas del prototipo tal cual; Combeau, solo
`e12/casos/combeau/medios/`, tal cual; Ocelo, Doceavo y Tonela, sus placas, capturas y medios de `marketing/portafolio/`,
escalados (16:9 a 1600, 4:5 y 1,62 a 1050) y en WebP calidad 80, como el prototipo. El único video recodificado es el
H.264 del reel de Praxi (el prototipo solo tenía VP9): el mismo corte del prototipo (`crop=720:900:0:100`), 685 kB. Todos
bajo los techos de §3.5.5 (el más pesado, el H.264 de Sesenta, 2,12 MB; el VP9 de Tonela, 1,44 MB).

**Compartido con las tandas 1 y 2, tocado:** `archivo.css` (un bloque nuevo, CASO, antes del de movimiento reducido),
`Video.astro` (una prop opcional, punto 1) y `video.mjs` (punto 1). Lo comprobé sobre la home y `/trabajo/` después del
cambio (`comprobar-base.mjs` sobre `/v3/` y `comprobar-tanda-2.mjs`): las mismas fuentes por ancho, la pausa y el
movimiento reducido que en la tanda 2, sin errores.

### 1. El medio principal bajo 834: una imagen quieta en los conceptos, y `Video` lo sabe hacer

**Qué dice la spec:** §2.3, bajo 834 el medio principal va «4:5 a sangre sin radio»; el de los conceptos es «el recorrido
grabado de cada sitio», que es 16:9. Cada `caso.md` de Bruno dice qué va a 390: una imagen 4:5 (Sesenta, Ocelo y Doceavo,
su portada 4:5; Tonela, `capturas/medio-4x5-390.png`). Combeau tiene su recorrido del teléfono (780 × 1688); Praxi, solo su
video de 568 × 320.

**Lo que hice:** `Video.astro` suma una prop opcional, `posterAngosto`: la imagen quieta va en un `<picture>` con la de
bajo 834 (sin la prop, el marcado es el de siempre). En los conceptos las fuentes del video son solo «desde 834»
(`data-fuentes`), y `video.mjs` ahora elige la fuente al cargar: si ninguna sirve para el ancho, no hay video ni pausa,
queda la imagen quieta (antes el botón aparecía y el `play()` fallaba). Combeau: desde 834 el recorrido de 1440, bajo 834
el del teléfono, cada uno con su póster. Praxi: el mismo video en todo ancho; bajo 834 el marco 4:5 lo recorta (como el
prototipo). Bajo 834 el recorte se ancla arriba (`object-position: 50% 0`: la cabecera del sitio grabado), desde 834 al
centro.

### 2. Praxi: las filas, con las reglas de §2.3 sobre la lista de Clara

**Qué dice la spec:** §2.3, Praxi va con las «filas del prototipo (9 más el principal)», y para todo caso: «la sección abre
con una 16:9; una fila partida va después de una 16:9, no de otra partida». Clara (texto-obra.json, que dice que «las
filas y su orden los fija la spec») lista el par de las portadas (`praxi-portada-390-45` y `praxi-login-390-45`) en
Problema y `praxi-reglas-169` en Hipótesis. El prototipo los tenía en Hipótesis (el par solo) y en Solución.

**Lo que hice:** las mismas nueve filas más el hueco, ordenadas para cumplir las dos reglas:

| Sección | Filas |
|---|---|
| Problema | ninguna (lock §21.5: la introducción de Koto va en texto) |
| Hipótesis | `reglas` 16:9 · par `portada` \| `login` |
| Solución | `numeros` 16:9 · par `frase` \| `numeros` 4:5 |
| La pieza | `amarillo` 16:9 · `reel` 4:5 \| `avatar` amarillo y oscuro 1,62 · `facebook` 16:9 · par `carrusel` 1 \| 3 · el hueco 16:9 |
| Sin métrica | `empezar` 16:9 |

Por qué el par de las portadas va en Hipótesis y no en Problema: Problema no tiene una 16:9 con que abrir, y el texto de
Hipótesis es el que cuenta lo que esas dos capturas muestran («La portada pasó de “Entrena sabiendo por qué” a “Se
acuerda de cada serie que hiciste”»). En La pieza, el prototipo ponía `facebook` antes del reel y dejaba dos partidas
seguidas (reel y carrusel); van alternadas. Cada medio lleva el alt y el pie de Clara; cuando los dos medios de una fila
llevan pies distintos, el pie de la fila dice los dos (el carrusel: personas generadas y números de ejemplo).

### 3. Combeau: la foto servida y las dos capturas del teléfono, en las formas de Koto

**Qué dice la spec:** §2.3, «solo las cuatro formas de Koto». Clara lista tres medios 4:5 sueltos: la foto servida
(«4:5 o 1:1, a decidir por Lucía»; la spec no lo decidió), `combeau-fotografia-45` y `combeau-modelo-45`, los dos últimos en
La pieza. Un 4:5 solo no es una forma de Koto, y con tres no se arman pares.

**Lo que hice, lo mínimo para quedar en las cuatro formas:**

- **Solución:** `panel-encuadre` 16:9 · **par `foto-servida` \| `fotografia-45`** · `panel-colecciones` 16:9. La foto
  servida va en 4:5 (el marco la recorta a lo ancho: es 828 × 828) junto a la portada del sitio en un celular, que pasa de
  La pieza a esta sección: es la pantalla para la que el sitio la entrega en 828 px, lo que dice el párrafo de al lado.
  Su pie y el enlace a la original (↗, sale del sitio) son de Clara.
- **La pieza:** `#fotografia`, su título y su párrafo, y `fotografia-169`; `#modelo`, su título y su párrafo,
  `modelo-169` · **par `modelo-45` \| el recorrido del book a 390** · el recorrido del book a 1440. El recorrido a 390
  (`combeau-modelo-recorrido-390`, de `e12/casos/combeau/medios/`, sin medidas en ningún cuadro, inventario §2.9) no está
  en la lista de Clara como medio aparte: lleva su descripción del mismo recorrido («Recorrido por el book de modelo:
  sus fotos, sus trabajos publicitarios y sus comerciales.»). **Para Lucía y Clara:** si prefieren la foto servida en
  1:1 o el book sin el recorrido del teléfono, es una línea de `casos.mjs`.
- Los dos títulos de las partes van a la izquierda y su párrafo a la derecha, como una sección, con la línea entre filas
  (`--a-linea`) arriba; el id va en la parte entera, que abre con su título y sigue con su 16:9.

### 4. Los conceptos: el orden de su `caso.md`, y lo que eso deja

Las filas van en el orden de las tablas «Fila · Forma · Medios» de cada `caso.md` (spec §2.3), con el alt de Clara. Dos
cosas quedan como las dejó Bruno y la spec no las corrige: **Doceavo** abre su Solución con un par y le sigue otra
partida (la regla de §2.3 no rige sobre el orden del `caso.md`), y **Tonela** usa a 390 como medio principal la misma
captura que va después en el par de La pieza (`medio-4x5-390`), así que en el teléfono se ve dos veces. **Tonela, Sin
métrica:** sin fila, porque la placa «Lo que lee un motor» no está compuesta (Clara: «la sección va sin fila»). Las
secciones «Lo que subiría de nivel con fotografía» y «Cuenta de filas» no van (spec §2.3).

### 5. «Siguiente»

**Qué dice la spec:** §2.3, «el nombre del próximo caso a 32 y su medio (16:9, 416 px de ancho)», en el orden Combeau →
Praxi → Sesenta → Ocelo → Doceavo → Tonela → Combeau, que es el de Clara (el build lo compara).

**Lo que hice:** el medio de cada caso en el «Siguiente» de otro es el póster de su medio principal, salvo dos: **Praxi**,
`praxi-reglas-169` (su video del inicio tiene personas generadas, y un medio con personas lleva su pie: §6.11; la captura
de las reglas es la que Simón eligió para su tarjeta por lo mismo) y **Combeau**, `combeau-fotografia-169` (la primera
pantalla de su sitio). Debajo del nombre, la línea mono de la ficha del caso que sigue («Concepto · 2026», que Clara pide
a la vista). Es un enlace con el círculo del cursor («Ver el caso» o «Ver el concepto», de Clara) y su nombre es el del
`h2`; el orden de arriba abajo es el del prototipo (rótulo, medio, nombre, línea, corchete). Dos columnas desde 834
(contacto | caso). Abajo de la página, 96 px bajo 1194 (la barra, §2.3) y 80 desde 1194 (la spec no lo dice: un paso de
la escala).

### 6. Valores que la spec no fijaba y cómo los resolví

| Qué | Lo que hice | Por qué |
|---|---|---|
| La barra lateral desde 1194 | `<header>` (no `<aside>`, que haría del `h1` el título de una región complementaria); relleno arriba de 48 y de 8 a los lados con margen negativo, como la del índice (tanda 2); se desplaza adentro si no cabe | Medido: no desborda a 1194 × 834 ni a 1280 × 720 (la de Combeau, la más alta, deja los créditos 29 px bajo el índice) |
| La ficha | La línea mono de Clara y, debajo, los campos que no están en la línea (Hecho, Qué es, En línea desde, Rubro, Lo hecho) en dato mono, en gris los dos | §1.1: los datos mono en reposo van en gris; el prototipo ponía el valor en blanco |
| «Con qué está hecho» | Cada fila a cuerpo y la herramienta debajo en dato mono gris, con la línea entre filas | §2.3: «lo que le hace a quien usa Praxi en cuerpo, la herramienta en dato mono». El prototipo usaba chico y blanco. Clara la escribe como «texto (herramienta)»: el paréntesis final es la herramienta |
| El punto del índice | Un `span` del alto de una fila, movido con el resorte «estado» (Motion) a la fila activa; con movimiento reducido salta. La activa lleva `aria-current="location"` | §2.3: «el punto de 3 px… que se mueve con el resorte estado». Un `::before` por fila (el prototipo) no se puede mover |
| La sección activa | La última cuyo borde de arriba pasó el 40 % de la ventana (el prototipo) | §2.3 no fija el umbral |
| La barra flotante | El `+` con `aria-hidden` y, oculto a la vista, «Ver las secciones» (Clara, `comun.secciones.barra`) dentro del `summary`: su nombre es «Praxi Problema Ver las secciones», que contiene lo que se ve (WCAG 2.5.3). Elegir una sección cierra la lista. El color al pasar el mouse, solo con un puntero que pasa: en táctil el toque que abría la lista dejaba pegada en blanco la fila que quedaba bajo el dedo (medido) | Clara: «esto es lo que lee el lector de pantalla del botón «+»»; con `aria-label` en el `summary` el nombre no contendría lo visible |
| Nada tapado por la barra | `scroll-padding-bottom: 96px` bajo 1194 | §4.3 |
| Las secciones | 24 px a los lados del texto desde 1194 y `h2` de 16em como máximo (el prototipo); entre bloques, 8 (Koto) y 16 más sobre cada sección | §2.3 da solo «24 px arriba y 12 abajo» |
| El hueco de Praxi | Marco punteado `--a-hueco` de 1 px, radio 6, 16:9, el texto de Clara en chico gris arriba a la izquierda con relleno de 16 | §3.3 no dice dónde va el texto |
| El video principal y su descripción | La imagen quieta lleva el alt del póster de Clara; la descripción del video (que va con `aria-hidden`) queda oculta a la vista dentro del pie de la figura. Praxi no tiene alt de póster: su imagen quieta lleva la descripción | Clara: «este texto va en el aria-label de su figura o como texto oculto junto al pie» |
| El enlace del pie (la original de la foto) | Área de 44 de alto bajo 834 y con puntero grueso, sin mover lo que se ve | §4.3; medido antes: 142 × 17 |
| Una entrada por sección (§1.6) | La primera fila de cada sección; en La pieza de Combeau, la primera fila de la primera parte | La sección no tiene filas propias: sus partes las tienen |

### 7. Las señales (Simón, `senales-obra.md` §2.3 a §2.5)

`title` y `description` de Clara, que son los de Simón (el build se cae fuera de los largos de §1.2). JSON-LD por el slot
`head`, como lo escribió Simón: `WebPage`; Praxi, `CreativeWork` y `SoftwareApplication` **sin `offers`, `url` ni
`sameAs`**; Combeau, `CreativeWork` con `hasPart` (`#fotografia`, `#modelo`) y su `WebSite` con el `publisher` que su sitio
ya publica; cada concepto, `CreativeWork` con `genre: "Concepto"` y su `disambiguatingDescription`. Dos lecturas mías:

- **La `BreadcrumbList` dice lo mismo que la miga** («Sesenta»), no «Sesenta (concepto)» como el ejemplo de §2.5: la spec
  (§2, lo común, 5) y el propio §4 de Simón piden que sean iguales, y que es concepto ya lo dicen el `title`, la
  `description`, `genre` y `disambiguatingDescription`.
- **La `description` del caso** es la bajada visible del `h1` (la parte en gris), en los seis; en Praxi, Simón pedía «la
  frase de entidad visible arriba de la página», y la que hay arriba es esa.

**Las imágenes al compartir (§1.6)**, con `og-tanda-3.mjs` (HTML renderizado en el negro de A, el logo de El huso, nada
generado y sin el hilo): `og-e12-praxi.jpg` (la captura de las reglas: sin personas ni cifras de ejemplo),
`og-e12-combeau.jpg` (`combeau-fotografia-169`, de `casos/combeau/medios/`) y una por concepto con su portada 5:3 entera, con
su «CONCEPTO» a la vista. 1200 × 630, de 27 a 67 kB. Son archivos nuevos fuera de `v3/`: no cambian ninguna página
publicada.

### 8. Los techos de campo (§3.4), medidos

`campos-tanda-3.mjs` (página completa a 1440, con movimiento reducido) + `campos.py` del prototipo. Datos:
`e12/construccion/medicion-campos/campos-tanda-3.json` y `a-<caso>-1440-completa.json`.

| Caso | Campos (techo 10 a 35 %) | Seguidos (techo 4) | Medios (piso un tercio) | Negro fuera de los medios |
|---|---|---|---|---|
| Praxi | **6,1 %** | 2 | 45,1 % | 97,2 % |
| Combeau | **24,2 %** | 2 | 49,8 % | 97,2 % |
| Sesenta | 22,9 % | 2 | 59,0 % | 97,6 % |
| Ocelo | 18,9 % | 2 | 57,4 % | 97,5 % |
| Doceavo | 30,2 % | 4 | 56,3 % | 97,3 % |
| Tonela | 26,9 % | 4 | 55,0 % | 97,2 % |

**Combeau queda sobre el 10 %**, así que no hay nada que declarar. **Praxi queda bajo el piso, en 6,1 %**: es el caso que la
spec ya admite (§3.4: «Praxi (6,0 % medido en A), marca oscura de un solo acento que no se recolorea»).

### 9. Lo que queda para Lucía o para Ramón (no lo resolví a la fuerza)

1. **A 390, en Praxi y en Combeau la ficha queda bajo la barra flotante en la primera pantalla** (Praxi: la línea
   «Propio · 2026 · Sitio y app» en 784 a 798 y la barra desde 776; Combeau, en 776 a 790, por su `h1` de tres líneas). La barra flota
   sobre el contenido, como la de Koto; la spec solo exige la ficha a la vista en los conceptos, y en los cuatro sí queda
   libre (de 721 a 762 a 390 × 844 y de 684 a 725 a 360 × 800). Si Lucía la quiere libre también en los reales, la salida
   es de la spec (que la barra aparezca al dejar atrás la ficha, por ejemplo).
2. **El aviso de cookies** tapa abajo la primera vez, como en la tanda 2 (punto 12.1). En los conceptos, el «CONCEPTO» del
   medio principal 4:5 de bajo 834 viene en la imagen, arriba, y se ve igual.
3. **Tonela a 390 muestra dos veces la misma captura** (punto 4) y **la foto servida va en 4:5** (punto 3).
4. **El video del inicio de Praxi mide 568 × 320**: a 390, recortado a 4:5, se agranda a 1,5 veces y se ve blando. No hay
   otro.
5. **Los casos no tienen pie, así que no tienen el botón para cambiar las cookies** (tanda 1, punto 8.2).

### 10. Lo verificado en esta tanda

- `npm run build` + `comparar-produccion.mjs`: las 22 páginas publicadas y lo que sirven, **iguales byte a byte**. Nuevos
  fuera de `v3/`: las seis imágenes al compartir (y las de las tandas 1 y 2).
- `npm run verificar -- --prefijo /v3/` a 390, 768 y 1440: **27 páginas, sin hallazgos** (los 7 enlaces rotos de la tanda 2,
  a los casos, ya responden); con `--sin-pildoras` en `/v3/trabajo/` a 1440, sin hallazgos.
- Render con Chromium a 360, 390, 768, 834, 1024, 1194, 1440 y 1920 de las seis páginas (`capturar.mjs`), mirado: desborde
  0 también sin el `overflow-x: clip`, un `h1`, encabezado de 90 bajo 834 y de 64 desde 834, solo Google Sans Flex y DM
  Mono, cero errores de consola. Capturas a 390 y 1440 en `e12/construccion/capturas/tanda-3/` (la primera pantalla en PNG
  y la página entera en JPEG), con el índice a 1440 marcando «Solución» y la barra abierta a 390 (las dos de Combeau).
- `comprobar-tanda-3.mjs` (**sin fallas**, `capturas/tanda-3/comprobar-tanda-3.json`): JSON-LD que parsea, sin `@id`
  repetidos ni tipos vetados, la `BreadcrumbList` igual a la miga; Praxi sin `offers`, `url` ni `sameAs`, cero `praxi.coach`,
  «en pausa» y «fuera de línea»; Combeau con `#fotografia` y `#modelo`, cero `mailto:`, `tel:`, `wa.me` y medidas; los
  conceptos con «concepto» en el title, la description y el `disambiguatingDescription`; cero «54 → 94», «36 → 73»,
  `<!--` y `href="#…"`; un corchete por página; la ficha de los conceptos a la vista y sin nada encima a 1440 × 900,
  390 × 844 y 360 × 800; el índice marca la sección y el punto queda en su fila; la barra abre, lleva a «La pieza» y se
  cierra; dos cruces a 1440 y ninguna a 1024; el medio principal 4:5 a sangre bajo 834, sin video ni pausa en los
  conceptos; área de toque a 390: 0 controles bajo 44 en las seis; y los 3 enlaces de la home y los 7 del índice a los
  casos responden 200, con sus fragmentos.
- `comprobar-base.mjs` sobre las seis (`capturas/tanda-3/comprobar-base-<caso>.json`): la rueda llega al 90 % en 45 a
  58 ms; cero `a[href^="#"]`; saltar al contenido con su ruta; encabezado plegado; el círculo sobre el medio de «Siguiente»
  y escondido con Tab; los videos corren a la vista con la fuente de su ancho y la pausa los para y dice su estado; con
  movimiento reducido ningún video corre, no hay círculo ni entradas.

---

## Tanda 4 · Los servicios: `/v3/servicios/`, Desarrollo web y los cinco de `[slug]` (19-oct-2026, Diego)

**Qué se construyó.** Las siete rutas sobre la plantilla interior de la spec §2.4, reemplazando las de driftime en los
mismos tres archivos (las URL no cambian): `src/pages/v3/servicios/index.astro`, `desarrollo-web.astro` y `[slug].astro`
(Visibilidad en IA, Auditoría SEO técnica, Acompañamiento mensual, Gestión de redes sociales y Paid Media). Nuevos:
`src/data/archivo/servicios.mjs` (el orden de los seis, «Siguiente», los trozos de un texto de Clara con sus enlaces y la
comparación de los precios), `src/scripts/archivo/fases.mjs`, `src/data/archivo/guardia-tailwind.ts` (punto 1), los textos
de Clara de las siete rutas (`src/data/archivo/texto/`, `extraer-texto.mjs --comprobar`: iguales), dos medios en
`public/v3/medios/` (punto 2) y siete imágenes al compartir en `public/assets/img/` (punto 7). **Compartido con las tandas
anteriores, tocado:** `archivo.css` (un bloque nuevo, INTERIOR, antes del de movimiento reducido; ninguna de sus clases
aparece en la home, `/trabajo/` ni los casos, comprobado en el `dist/`) y `medios.json` (dos entradas nuevas, ninguna
cambiada). Después de esos cambios, `comprobar-tanda-2.mjs` y `comprobar-tanda-3.mjs` siguen sin fallas.
`servicios-v3.json`, `oferta-v3.json` y `paginas-v3.json` no se tocaron (diff 0). Herramientas, en
`e12/construccion/herramientas/`: `comprobar-tanda-4.mjs`, `campos-tanda-4.mjs`, `og-tanda-4.mjs` y `franjas-tanda-4.py`.

### 1. Al reemplazar una página de driftime, el CSS publicado perdía una clase

**Lo que pasó, medido:** con las siete páginas nuevas, `comparar-produccion.mjs` falló: el CSS que cargan `/` y
`/nosotros/` pasaba de `index.BudKb2Rm.css` a `index.AFQ_8GCk.css`. La diferencia es una sola regla que **desaparecía**:
`.flex-grow`. Tailwind la generaba porque el `desarrollo-web.astro` de driftime decía «flex-grow» en un comentario de su
galería; al reemplazar la página, la palabra se fue con ella (el problema de la tanda 1, punto 6, al revés: allí una
palabra nueva sumaba una clase; aquí una palabra que se va la resta).

**La solución mínima:** `src/data/archivo/guardia-tailwind.ts`, que nadie importa y Tailwind lee, con la palabra perdida y
la página de la que venía. Con ella, producción vuelve a salir igual byte a byte. **Para la tanda 5**, que reemplaza las
demás páginas de driftime: si `comparar-produccion.mjs` muestra una regla que falta en el CSS, su palabra va a esa lista.

### 2. Las franjas de Visibilidad en IA y de Auditoría, nítidas desde 834

**Qué dice la spec:** §2.4, la franja de Visibilidad en IA es `proto/a/medios/chequeo-43.webp` y la de Auditoría
`verifica-y-cumple-53.webp`, «recortados a 2,39 al centro».

**Lo que pasó, medido:** esos archivos miden 1050 px de ancho; la franja mide 1408 a 1440 y 1888 a 1920: el navegador los
agrandaba 1,34 y 1,8 veces, y en la captura a 1440 el texto de las dos páginas capturadas se veía borroso.

**Lo que hice:** `franjas-tanda-4.py` saca, de la misma captura a 2× de la que salieron (17-oct, la de Lucía), el mismo
encuadre (el recorte del prototipo y después su centro a 2,39) a 1920 de ancho: `chequeo-239.webp` (50,7 kB) y
`verifica-y-cumple-239.webp` (49,3 kB), registrados en `medios.json` con su origen. La franja es un `<picture>`: desde 834
la de 1920; bajo 834, el archivo de la spec en 16:9 al centro (ahí 1050 px alcanzan, y su encuadre a 16:9 no es el de un
recorte del 2,39). Nada se genera: es la misma captura con más píxeles. La de Desarrollo web es el archivo de la spec tal
cual (`combeau-fotografia-169`, 1600 px: 1,18 veces a 1920). `campos.py` sobre la página: ninguna de las tres es campo.

### 3. El alt de la franja de Visibilidad en IA no describía el archivo

**Qué dice Clara:** `visibilidad-en-ia.franja.alt`: «El chequeo gratis de SpindleLab con el resultado de un sitio en
pantalla.» (su «dónde»: «el chequeo con un resultado (chequeo-43…)»). **El archivo de la spec no tiene resultado:** es la
primera pantalla de `/diagnostico/` con el campo vacío (mirado). Spec §3.3: el alt lo escribe quien mira la imagen.

**Lo que hice:** el alt que la tanda 2 escribió mirando ese mismo archivo (`medios.json`, `chequeo-43`): «La página del
chequeo en spindlelab.cl: «¿Te puede leer la IA?», el campo para el dominio y el botón «Revisar mi sitio».». Un matiz: a
2,39 el título «¿Te puede leer la IA?» queda fuera del recorte al centro (bajo 834, en 16:9, se ve). **Para Clara y
Lucía:** o el alt pasa a describir lo que queda a 2,39, o la franja usa una captura del chequeo con un resultado (una
captura nueva del chequeo vivo, nada generado), o el recorte se ancla más arriba. Es una línea de `[slug].astro`.

### 4. Lo que la spec no fijaba de la plantilla interior, y cómo lo resolví

| Qué | Lo que hice | Por qué |
|---|---|---|
| El pie de la franja | Debajo, el nombre de la pieza en blanco y su línea mono («Combeau, fotografía · Cliente · 2026»), de su entrada de `/trabajo/`; en Auditoría, además, el pie de Clara de la persona generada | El prototipo lo ponía así (vista 5); §2.4 no lo quita (§0.4 no lo lista). Sin él la franja no dice de quién es el sitio que se ve |
| La franja y la carga | `loading="eager"` y `fetchpriority="high"` (está en la primera pantalla a 1440 y a 390); entra con el resorte «entrada» si no está a la vista al cargar | Antislop C7; §1.6 (el medio de la sección) |
| Las filas de servicios de `/servicios/` | Desde 834, sobre las doce columnas que ocupa la lista: nombre en 3, línea en 5, una libre, precio en 3; borde de arriba en `--a-linea-seccion`, como los planes. Toda la fila lleva al servicio (el área del enlace del nombre se estira) y al pasar el mouse el subrayado del nombre va al 100 % | §2.4 dice qué lleva cada fila y no sus columnas. En 3:4:3, como los planes, la línea y el precio quedaban a 8 px (mirado a 1440); con la columna libre se leen como tres datos |
| El número de cada momento | «01» a «04» en rótulo mono sobre el `h2` | Clara (`servicios.momentos.nota`) |
| «Lo que pones tú» | Sus tres puntos de `oferta-v3.json` («fuera»), el rótulo en blanco y el detalle en gris, como hoy; el título y el pie, comparados con la nota de Clara que los cita | Clara: «queda tal cual»; ningún texto escrito a mano en la página |
| La fase a la vista (Desarrollo web) | Una sola a la vez: la que está bajo la línea del 47,5 % de la ventana, el centro de la franja del prototipo (40 al 55 %) | Con la franja del prototipo, dos fases cortas quedaban en blanco a la vez (medido con `comprobar-tanda-4.mjs`); Koto pone una y «la anterior vuelve a gris» (lock §20.1). Sin JS, títulos en blanco y cuerpo en gris; con movimiento reducido, todas en blanco |
| El número de cada fase | La lista es ordenada y el «01 · » va con `aria-hidden` | Como las fases del v3 anterior: el lector de pantalla no lee dos veces el número |
| El glosario | Una lista en dos columnas desde 834, antes de los planes, con el término en blanco | Clara: «va antes de las tarjetas de los planes» |
| «Ver los planes» | Con su ruta: `/v3/servicios/desarrollo-web/#planes` (Clara escribe «#planes») | §5.2.2 |
| «Siguiente» | Rótulo mono y el nombre a Título, subrayado, con la flecha SVG; la flecha «→» del texto de Clara pasa a ser el SVG (ninguna de las dos letras la trae, §1.2). Bajo 834 y con puntero grueso su área es de 44 de alto sin mover lo que se ve | Prototipo; §4.3 (medido antes: 28 px) |

### 5. Los cinco servicios: «queda tal cual, desde su dato», sobre A

Clara cambia de cada uno la miga, el `h1` en dos tintas y el alt (y el pie) de la franja; lo demás queda «desde su dato»
(`servicios-v3.json`). Cómo lo puse en la plantilla:

- **La cabecera:** la «línea» con el precio es la entradilla; debajo, el lead y la nota de los precios (en chico); después
  los dos botones. En driftime el lead y la nota iban después de la imagen.
- **El armado de hoy, sin cambiar el dato:** cada punto de la lista partido en su «:» (el título en blanco, el cuerpo con
  mayúscula), las comillas rectas en «», y los mismos cinco enlaces en el texto corrido, cada uno con su ruta
  (`protocolo público` lleva a `/v3/blog/como-aparecer-en-chatgpt/#como-medir-si-esta-funcionando`, que existe hoy en
  el blog de driftime: la tanda 5 tiene que conservar ese `id`). Los `h2` van como el dato, con o sin punto.
- **Los bloques**, en la forma de las fases: «marca · título» (Sí · Aumentar…, A · Resumen ejecutivo, S1 · Priorizar…,
  01 · Estrategia…). Si son pasos en orden (Acompañamiento, Redes, Paid Media) van en una lista ordenada y la marca no se
  lee; si la marca trae su lectura (Sí → «Prometemos:», S1 → «Semana 1:»), se lee esa; las A a D se leen tal cual.
- **Los planes**, en la forma de los de Desarrollo web; el compromiso de los tres meses y la nota de los planes, debajo
  (driftime ponía la nota bajo el `h2`; Desarrollo web la pone después de los planes, y §2.4 pide «la misma forma»).
- **El cierre:** su `h2` en una tinta (el dato no trae continuación gris), el párrafo y los botones de hoy; «Siguiente»,
  el que sigue en el orden de `oferta-v3.json`, en ciclo (Paid Media → Desarrollo web).
- **Los botones** son los de hoy: «Ver planes» y «Escríbenos» arriba; «Pedir el diagnóstico» y, salvo en Redes y Paid
  Media, «Correr el chequeo» al cierre. «Escríbenos» y «Pedir el diagnóstico» son textos de Clara (el menú y
  `/servicios/`); «Ver planes» y «Correr el chequeo» solo existían en la página anterior y van como constantes nombradas.
  **Para Clara:** `/servicios/` y Desarrollo web dicen «Revisar mi sitio gratis» y «Ver los planes»; los cinco, como hoy.

### 6. Las señales (Simón, `senales-obra.md` §2.7)

- **`title` y `description`, de la copia de Clara** (que son los de Simón); el build se cae fuera de los largos de §1.2.
  Simón pedía aplicarlos en `servicios-v3.json`: la página los lee de la copia de Clara, así el JSON de los precios queda
  con diff 0 y no hay dos copias del mismo texto. La `description` del `Service` es la de la página.
- **El grafo de hoy queda:** `/servicios/`, `BreadcrumbList` + `ItemList` en el orden de la página; los cinco,
  `Service` (con su `OfferCatalog` de `servicios-v3.json`) + `BreadcrumbList` + `FAQPage`; Desarrollo web, su `Service` con
  las cuatro ofertas de hoy (nombre y `minPrice` de `oferta-v3.json`, comparados; la descripción de cada oferta, la de
  hoy), la `BreadcrumbList` como hoy y la `FAQPage` con las seis preguntas de Clara que se ven (la de hoy traía cuatro
  preguntas viejas que ya no están en la página: §1.5).
- **Las imágenes al compartir** (§1.6), con `og-tanda-4.mjs`: el logo arriba, el `h1` en sus dos tintas y el precio de
  entrada tal cual de los JSON; 1200 × 630, de 39 a 47 kB. **`/servicios/` va sin precio:** es el índice de seis y
  ninguno es «el» de entrada. Su `og:image:alt` es «SpindleLab: » + el `h1`.

### 7. Los techos de campo (§3.4), medidos

`campos-tanda-4.mjs` (página completa a 1440, con movimiento reducido) + `campos.py` del prototipo. Datos:
`e12/construccion/medicion-campos/campos-tanda-4.json` y `a-servicios-*-1440-completa.json`.

| Página | Campos (techo 5 %) | Medios | Negro fuera de los medios |
|---|---|---|---|
| `/servicios/` | 0 % | 0 % | 96,3 % |
| Desarrollo web | **3,5 %** (las portadas de Praxi y Sesenta; la franja de Combeau no es campo) | 15,0 % | 95,3 % |
| Visibilidad en IA | 0 % (la franja del chequeo no es campo) | 12,1 % | 95,6 % |
| Auditoría SEO técnica | 0 % (la franja de Verifica y Cumple no es campo) | 13,2 % | 95,7 % |
| Acompañamiento mensual · Redes · Paid Media | 0 % | 0 % | 95,8 a 95,9 % |

### 8. Lo que queda para Lucía, Clara o Ramón (no lo resolví a la fuerza)

1. **El alt y el recorte de la franja del chequeo** (punto 3).
2. **La franja de Auditoría** sigue siendo la portada de Verifica y Cumple (spec §2.4), así que va el pie de la persona
   generada. Clara propone «sus 12 cosas» (`verifica-y-cumple-12-169`), sin persona: es campo de color (`#2858F8` en el
   82 % del marco a 2,39, `datos/campo-medios.json`) y la spec prohíbe un campo en la franja. Lo decide Lucía.
3. **El centro a 2,39 corta arriba** las dos píldoras de la portada de Verifica y Cumple y deja abajo, en la de Combeau,
   la franja oscura de «Retratos». Es el recorte que pide la spec; si Lucía lo quiere anclado de otra forma, es la
   posición del medio en `archivo.css` (y en `franjas-tanda-4.py`).
4. **Los botones de los cinco servicios** frente a los de `/servicios/` y Desarrollo web (punto 5), para Clara.
5. **Del texto que queda «tal cual»**, lo que Clara ya dejó anotado y no es de esta tanda: la `description` de
   Acompañamiento dice «con informes quincenales» (R2, abierta) y Paid Media dice cuatro veces que optimiza «con agentes
   de IA» sin fila en el inventario (para Ramón).

### 9. Lo verificado en esta tanda

- `npm run build` + `comparar-produccion.mjs`: las 22 páginas publicadas y lo que sirven, **iguales byte a byte** (con la
  guardia del punto 1). Nuevos fuera de `v3/`: las siete imágenes al compartir (y las de las tandas anteriores).
- `npm run verificar -- --prefijo /v3/` a 390, 768 y 1440: **27 páginas, sin hallazgos**; con `--sin-pildoras` en
  `/v3/servicios/` a 1440, sin hallazgos.
- Render con Chromium a 360, 390, 768, 834, 1024, 1194, 1440 y 1920 de las siete páginas (`capturar.mjs`), mirado: desborde
  0 también sin el `overflow-x: clip`, un `h1`, encabezado de 90 bajo 834 y de 64 desde 834, solo Google Sans Flex y DM
  Mono, cero errores de consola. Capturas a 390 y 1440 en `e12/construccion/capturas/tanda-4/` (la primera pantalla en PNG
  y la página entera en JPEG) y el círculo sobre una pieza de Desarrollo web a 1440.
- `comprobar-tanda-4.mjs` (**sin fallas**, `capturas/tanda-4/comprobar-tanda-4.json`): JSON-LD que parsea, sin `@id`
  repetidos ni `Review`, `AggregateRating` o `VideoObject`; la `BreadcrumbList` igual a la miga; la `FAQPage` con las
  preguntas que se ven; la `description` del `Service` igual a la de la página; title de 47 a 58 y description de 124 a
  157; `noindex`; cada imagen al compartir existe, 1200 × 630, JPEG, ≤ 200 kB; **cada monto a la vista, en el title, la
  description o una oferta del grafo está, como texto, en los JSON** (además, el build se cae si un precio de Clara no
  está en ellos); cero «54 → 94», «36 → 73», `<!--`, `href="#…"`, «IA propietaria», «modelos RAG», «despliegue de
  modelos», praxi.coach, «en pausa» y «fuera de línea»; a 1440 los `h2` de sección en c1–c4 y pegajosos a 88, el
  contenido desde c5 hasta c12 o c16; a 1024 el `h2` arriba y sin pegarse; la franja 2,39 desde 834 y 16:9 a 390, dentro
  de los márgenes y con radio 6, la nítida desde 834; las fases (una en blanco, las otras en gris; con movimiento
  reducido, todas en blanco); el círculo sobre las tres piezas («Ver el caso», «Ver el caso», «Ver el concepto»); los
  enlaces internos responden 200 con sus fragmentos; área de toque a 390: 0 controles bajo 44.
- `comprobar-base.mjs` sobre `/v3/servicios/` y Desarrollo web (`capturas/tanda-4/comprobar-base-*.json`): la rueda llega al
  90 % en 45 y 58 ms; cero `a[href^="#"]`; saltar al contenido con su ruta; encabezado plegado; el círculo aparece sobre una
  pieza, se esconde con Tab, no vuelve con un desplazamiento bajo el mouse quieto y sí con un movimiento real; con
  movimiento reducido no hay círculo, ni entradas, y las transiciones son 0 s.
- `comprobar-tanda-2.mjs` y `comprobar-tanda-3.mjs`, después de tocar `archivo.css` y `medios.json`: sin fallas.

---

## Tanda 5 · Método, diagnóstico, nosotros, contacto, el blog y sus siete artículos, y el barrido final (19-oct-2026, Diego)

**Qué se construyó.** Las doce rutas que quedaban del mapa, reemplazando las de driftime en los mismos archivos (las URL
no cambian): `src/pages/v3/metodo.astro`, `diagnostico.astro`, `nosotros.astro`, `contacto.astro`, `blog/index.astro` y
`blog/[slug].astro` (los siete artículos). Nuevos: `src/data/archivo/interiores.mjs` (lo que arma las cuatro interiores),
`src/data/archivo/blog.mjs` (el índice y la plantilla del artículo), `src/scripts/archivo/contacto.mjs`, las copias de Clara
de las cinco páginas (`src/data/archivo/texto/{metodo,diagnostico,nosotros,contacto,blog}.json`; `extraer-texto.mjs
--comprobar`: iguales) y doce imágenes al compartir en `public/assets/img/` (punto 6). **Compartido con las tandas
anteriores, tocado:** `archivo.css` (un bloque nuevo, TANDA 5, antes del de movimiento reducido; ninguna de sus clases
aparece en las páginas de las tandas 1 a 4), `Chequeo.astro` (una prop opcional, `tituloResultado`; sin ella, el marcado
es el de siempre), `caso.mjs` (punto 4) y `guardia-tailwind.ts` (punto 1). Después de esos cambios, `comprobar-tanda-2.mjs`,
`comprobar-tanda-3.mjs` y `comprobar-tanda-4.mjs` siguen sin fallas (en la tanda 2, lo único distinto del registro es el
segundo exacto en que se muestrea la cinta y el CLS al cargar: de 0 a 0,0001, contra 0 a 0,027 registrados). `paginas-v3.json`, `oferta-v3.json`,
`servicios-v3.json` y `data/blog-v3/` no se tocaron (diff 0). Herramientas, en `e12/construccion/herramientas/`:
`comprobar-tanda-5.mjs`, `barrido-final.mjs`, `campos-tanda-5.mjs` y `og-tanda-5.mjs`.

### 1. Al reemplazar las páginas de driftime, el CSS publicado perdía seis clases

Lo mismo que la tanda 4, punto 1: con las páginas nuevas, `comparar-produccion.mjs` falló (el CSS de `/` y `/nosotros/`
pasaba de `index.BudKb2Rm.css` a `index.DvwKXHlQ.css`). Faltaban `.border-collapse`, `.collapse`, `.italic`, `.static`
(del `<style>` del artículo de driftime), `.outline` (del índice del blog) y `.text-wrap` (de método, nosotros y el blog).
Van a `guardia-tailwind.ts`, cada una con la página de la que venía. Con ellas, producción vuelve a salir igual byte a byte.
Ninguna regla nueva: el CSS es el de la línea base.

### 2. Las cuatro interiores: «queda con ajustes», desde su dato

Clara dejó las cuatro en «queda con ajustes»: cambia lo que ella lista; lo demás queda tal cual, «desde su dato». Su dato es
el de hoy: `paginas-v3.json` y lo que las páginas de driftime escribían por su cuenta (la duración, lo que recibes y el
precio de cada fase del método; los tres bloques de los 21 chequeos; la bio y la trayectoria de Ramón; los botones). Eso
va copiado letra por letra en `interiores.mjs`, con la página de la que sale. **El build se cae** si el «antes» de un texto
de Clara no es el dato de hoy (así nadie cambia uno sin el otro), si la miga no es la `BreadcrumbList`, si los pesos de los
bloques no suman 100 o no son los de la línea «21 chequeos, 100 puntos…», o si un precio del método no está en los JSON.

Los textos de Clara que esperan a Ramón van con su texto nuevo, como en las tandas anteriores (todo vive bajo `/v3/` con
`noindex`): el cargo de la firma de `/nosotros/` y del autor de los artículos, los dos párrafos nuevos de «Por qué un solo
sistema» y «Diseño y programo a medida». Si Ramón dice que no, vuelve el «antes» de cada uno, que está en la copia.

### 3. Lo que la spec no fijaba, y cómo lo resolví

| Página | Qué | Lo que hice | Por qué |
|---|---|---|---|
| Método | El orden de la cabecera | Entradilla, el lead, la línea de Desarrollo web (Clara) y los dos botones de hoy | Clara pone la línea nueva después de la entradilla y no ubica el lead; así «Cada proyecto sigue el método…» va antes de «si es de cero, el proceso es otro» |
| Método | La nota «La fase 01 es gratis. Cada una de las demás dice cuánto cuesta.» | Bajo el `h2` de las fases, en chico, la primera frase en blanco | En driftime iba en una caja entre la imagen y las fases; A no tiene ni la imagen ni la caja (§6.5). Ahí explica los precios que vienen |
| Método | «Del diagnóstico al monitoreo» «como las fases de Desarrollo web» | La misma forma (2:5, el número con `aria-hidden`, la línea de sección), **sin** el cambio de tinta de la fase a la vista | §1.6 lo ata a Desarrollo web («la tinta de la fase a la vista en Desarrollo web») y §2.4 lo llama «el único cambio de tinta atado a la vista que tiene Koto» |
| Método | Los datos de cada fase | Rótulo mono y valor en chico, dos por fila desde 834; «Cuánto cuesta» a lo ancho, con su enlace y la flecha SVG | Los datos mono en reposo van en gris (§1.1) |
| Método | Los botones | Los de hoy: «Correr el chequeo» (claro) y «Ver las cuatro fases» con su ruta (`/v3/metodo/#fases`); al cierre, «Pedir el diagnóstico» y «Correr el chequeo» | Clara no los cambia; queda tal cual (como los cinco servicios en la tanda 4) |
| Diagnóstico | El chequeo | El componente de la home sin su rótulo ni su frase (el `h1` y la entradilla ya lo dicen), con la etiqueta, el ejemplo, el botón y la ayuda de Clara; en una fila, en c1–c8 | §2.4: «etiqueta, campo y botón en una fila, la ayuda» |
| Diagnóstico | El salto de `h1` a los `h3` del resultado | Un `h2` oculto, «Resultado del chequeo», que existe solo cuando hay resultado (la prop `tituloResultado` de `Chequeo.astro`) | Lo tenía la página de driftime; sin él el resultado salta de nivel (antislop C1) |
| Diagnóstico | «Los 21 chequeos»: «lista de las 21 señales en tres grupos con sus pesos 30 + 40 + 30, en mono» | Los tres bloques de hoy (el `h3`, el peso en dato mono y el texto que nombra sus señales), en la forma de las fases; lo que driftime marcaba con `<b>`, en blanco y sin negrita | Clara: «“Los 21 chequeos, publicados” con sus tres bloques y pesos» queda tal cual. Una lista nueva de 21 filas sería texto escrito aquí |
| Diagnóstico | La entrada de driftime («21 chequeos, 100 puntos…», la guía y su botón) | La línea, bajo el `h2` de los 21 chequeos; la guía («El chequeo de esta página lee tu sitio; el mini-diagnóstico le pregunta a los motores…»), bajo el `h2` de «Dos caminos», cuyos botones ya traen «Pedir el diagnóstico» | §2.4 no tiene esa entrada entre el instrumento y los 21 chequeos; así cada texto queda donde explica algo y el botón no se repite |
| Diagnóstico | La sección de la ley | Sin imagen | La spec no pone una (fila de `/diagnostico/`: «Ninguna»), y la de driftime era la portada de Verifica y Cumple en un notebook y un teléfono, un campo azul que en una interior solo cabe en las portadas de una sección de piezas (§3.4). Por lo mismo no va el pie de Clara («La persona a caballo…»), que ella condicionó a esa imagen |
| Diagnóstico | El cierre «¿Quién aparece en tu lugar?» | Su `h2` y la línea y el botón que la página muestra hoy («Una página, gratis, en 24 horas.» · «Pedir el diagnóstico») | El párrafo viejo de esa sección decía «sin compromiso», que la QA del 5-oct sacó de lo visible; lo que se ve hoy es `siguiente` |
| Nosotros | La trayectoria («Antes pasé más de cinco años en agencias» y sus cuatro líneas, R4) | Dentro de la bio, junto al retrato: el título a Título (`h2`) y las cuatro líneas en la lista con la línea entre filas | Clara la pone en «Cabecera y bio»; §2.4: «el retrato … junto a la bio» |
| Nosotros | «preguntas», en la fila de la spec | No va: no hay ninguna en el dato ni en el texto de Clara | Lo que no está no se inventa |
| Nosotros | La firma | El nombre en blanco y el resto de la línea de Clara en gris; «E-commerce» sin partir (ninguna de las dos letras trae el guion que no se parte) | El nombre es lo nombrado (§1.1) |
| Contacto | El `h2` del formulario | A Título, no a Declaración | **Medido** a 1440 × 900 con el aviso de cookies abierto (empieza en 831): a Declaración el botón termina en 835, bajo el aviso; a Título, en 822, y el formulario queda entero sobre el pliegue (§2.4: «como hoy») |
| Contacto | El espacio | 40 arriba del formulario y 12 entre campos | Lo mismo: con 48 y 16 el botón terminaba en 854 |
| Contacto | Las etiquetas | En rótulo mono (Clara: `rotulo · label`), salvo la del consentimiento, que es una frase: en chico, con el enlace blanco | Lock §14: una frase nunca va en rótulo |
| Contacto | La casilla del consentimiento (§4.1 no la nombra) | 16 px dentro de un área de 44 × 44 que no mueve lo que se ve: vacía, el borde del campo (`#707070`); marcada, blanca; el foco a 3 px del cuadro | §4.3: 44 × 44 bajo 834 y con puntero grueso. La nativa medía 13 px |
| Contacto | El autocompletado de Chrome | Se le devuelve la placa al campo con un relleno interior (`box-shadow` inset), no una sombra | Chrome lo pinta de otro color y el texto quedaba ilegible |
| Contacto | «Listo.» | Sin caja: la línea de sección arriba, el `h3` a Título y el texto | En driftime era una placa; §6.5 |
| Contacto | Lo que la página de driftime hacía por su cuenta | En `contacto.mjs`: el `?sitio=` que manda el chequeo llena el campo; «Escríbenos» lleva a `/v3/contacto/#contacto-form` (no recarga ni borra lo escrito; con su ruta, §5.2.2); el botón recupera su texto y su flecha si el envío falla; «Listo.» toma el foco | v3-contacto.js no se toca y le pone «Enviar →» al botón cuando falla: esa flecha no está en ninguna de las dos letras |
| Contacto | El enlace de la política y el correo suelto | Área de 44 de alto bajo 834 y con puntero grueso, sin mover la línea (relleno en un elemento en línea) | §4.3 |
| Contacto | El `id` `f-sitio-ayuda` | Queda (lo tenía la v3 de driftime): la ayuda del campo del sitio, por `aria-describedby` | Los `name`, los `id` de producción, el `action`, los ocultos, las clases y el script, iguales a `public/contacto/` (comprobado) |
| Blog | Las filas | Desde 1194, la fecha y el tema a la izquierda y el título a la derecha (las dos mitades del caso, 24 a los lados); bajo 1194, uno sobre otro. Toda la fila lleva al artículo; el título subrayado, como las filas de `/servicios/` | §2.5 |
| Blog | La fecha | Corta («4 sept 2026»), la de hoy en el índice | La larga va en la ficha del artículo |
| Blog | El cierre | Al final de la columna, con la línea de sección y el `h2` a Declaración | §2.5: «al final, el cierre del blog» |
| Artículo | El cuerpo en la plantilla del caso | Partido en secciones, una por `h2`: el `h2` a la izquierda y lo demás a la derecha desde 1194, con la línea de sección y la cruz de registro; las tablas, a lo ancho de las dos mitades; la entrada (lo de antes del primer `h2`), en la mitad derecha. Bajo 1194, una columna. **Ni una letra cambia**: `blog.mjs` comprueba que el texto partido es el mismo | §2.5: «la plantilla del caso con otro contenido»; las secciones del caso son así (§2.3) |
| Artículo | Los `id` y los enlaces | El `id` del `h2` pasa a su sección (el `#como-medir-si-esta-funcionando` que usan el método y Visibilidad en IA sigue existiendo); los `href="#x"` del cuerpo llevan su ruta | §5.2.2 |
| Artículo | Lo que la escala no nombra | Los `h3` del cuerpo, a cuerpo en blanco; `strong` en blanco, sin negrita; `em` sin cursiva (§1.2: heredan); `code` en DM Mono 12 en blanco, sin fondo; listas con «·» y con el número en mono; la cita a Título en blanco con la línea encima; la nota, sin caja, con la línea; las preguntas, filas con la línea de sección y «+» / «–» en mono | §1.2, §1.5 y §6.5: sin negrita, sin cajas |
| Artículo | Las tablas | Encabezado en rótulo, la primera columna en blanco; bajo 1024 cada columna de 152 y la primera pegada al desplazar (la regla de driftime); se desplazan en su caja | Medido: 0 de desborde a 390 |
| Artículo | La ficha, el autor y el índice | La ficha en el orden de Clara (Tema, Fecha, Lectura); el autor con su miniatura de 132 × 132 a 44 px (alt vacío: el nombre va al lado); el índice con el rótulo «En este artículo» y ninguna fila numerada | La regla del 13-oct (§2.5) se cumple sin excepción: el índice del caso no numera |
| Artículo | La barra flotante bajo 1194 | El rótulo «En este artículo» y la sección activa en chico, en una línea con puntos suspensivos | En el caso la activa es un rótulo («PROBLEMA»); aquí es una frase de hasta 70 caracteres, y en mono y mayúsculas sería una frase en rótulo (lock §14) |
| Artículo | La sección activa | La última cuyo borde pasó los 120 px de arriba (`data-linea`, punto 4) | Con la línea del caso (40 % de la ventana), al elegir una sección corta del índice quedaba marcada la siguiente (medido en «¿Qué NO incluye?») |
| Artículo | «Siguiente artículo» | En la sección «Siguiente» del caso: a la izquierda el cierre del blog (`h2` a Título, la guía, el cuerpo, los dos botones); a la derecha el rótulo de Clara y el título del siguiente a la escala de «Siguiente», sin medio | §2.5: «cierra con el mismo paso de conversión del índice y “Siguiente artículo”»; los artículos no tienen imagen |
| Artículo | El pie | Los artículos llevan pie (la spec solo se lo quita a los casos), y bajo 1194 la página deja 96 abajo para que la barra no lo tape | §2, lo común, 2 |
| Artículo | El medio de «21 chequeos» | No va | §2.5 dice que «puede llevar» la captura del chequeo; no hacía falta, y sin él el artículo queda en 0 % de campo |
| Artículo | La flecha «→» del cuerpo de fintechs («URL vieja → URL nueva») | Queda: es texto verbatim; ninguna de las dos letras la trae y la pinta una letra del sistema | El cuerpo no se toca (brief §3) |

### 4. `caso.mjs`: la línea de la sección activa, por página

Los artículos usan el `caso.mjs` de la tanda 3. Su página pone `data-linea="120"`: la activa es la última sección que pasó
120 px desde arriba (donde la deja un enlace del índice, con `scroll-margin-top: 88px`), y al final de la página, si la
elegida ya no puede subir, la que dice la dirección (`#…`, también al cambiar). Sin `data-linea` (los casos) todo es como
antes: `comprobar-tanda-3.mjs` sin fallas.

### 5. Los precios y los nombres

Cada monto a la vista o en las señales de método, diagnóstico, nosotros, contacto y el índice del blog está, como texto, en
`oferta-v3.json` o `servicios-v3.json` (`$490.000`, `$400.000` y `$590.000/mes` en el método; el build se cae si no).
**Los artículos quedan fuera de esa comparación:** su cuerpo va verbatim, y el de los costos cita rangos del mercado y
precios de terceros que no son la oferta. Están listados en `comprobar-tanda-5.json`.

### 6. Las señales (Simón, `senales-obra.md` §2.6, §2.8 a §2.11)

- **`title` y `description`**, de Clara (que son los de Simón): de 46 a 60 y de 148 a 157 en las cinco páginas. Los siete
  artículos quedan con los suyos (Simón §2.9): tres pasan de 60.
- **JSON-LD:** método, `WebPage` + `HowTo` + `BreadcrumbList` de hoy (mismos `@id` y pasos); diagnóstico, la
  `BreadcrumbList` y la `FAQPage` de hoy más el `WebPage` y el `WebApplication` `#chequeo` de Simón; nosotros, `AboutPage` +
  `BreadcrumbList` de hoy (el `jobTitle` lo pone el `Layout`); contacto, la `BreadcrumbList` y la `FAQPage` de hoy más el
  `ContactPage`; el índice, `CollectionPage` + `BreadcrumbList` + `ItemList`; cada artículo, su grafo de hoy sin los nodos que
  emite el `Layout`, con la miga que se ve y el `Article.image` en su tarjeta nueva. Ninguna `FAQPage` marca una pregunta que
  no se vea.
- **Las imágenes al compartir** (§1.6, `og-tanda-5.mjs`, HTML renderizado en la letra y el negro de A, sin el hilo):
  `og-e12-metodo`, `-diagnostico`, `-contacto` y `-blog` (el logo y el `h1` en sus dos tintas), una por artículo
  (`og-e12-blog-<slug>`, con su titular) y `og-e12-nosotros` (el retrato real y el nombre, con el rol corto de Clara). 1200 ×
  630, de 24 a 43 kB. Son archivos nuevos fuera de `v3/`: no cambian ninguna página publicada.

### 7. Los techos de campo (§3.4), medidos

`campos-tanda-5.mjs` (página completa a 1440, con movimiento reducido; cuenta también la miniatura del autor) + `campos.py`
del prototipo. Datos: `e12/construccion/medicion-campos/campos-tanda-5.json`. **Las doce páginas, 0 % de campo** (techo de las
interiores, 5 %); medios: 6,5 % en nosotros (el retrato), 0 a 0,1 % en las demás; negro fuera de los medios, de 94,4 a
96,5 %.

### 8. Lo que queda para Lucía, Clara o Ramón (no lo resolví a la fuerza)

1. **Los botones del chequeo:** `/nosotros/` dice «Revisar mi sitio gratis» (Clara: «el mismo botón del chequeo en todo el
   sitio»), pero el método, el blog y los artículos siguen con «Correr el chequeo», como hoy, porque Clara no los cambia ahí
   (lo mismo que los cinco servicios en la tanda 4). Para Clara.
2. **El error del chequeo vacío** sigue diciendo «Escribe tu dominio para empezar.» (`v3-chequeo.js`, que no se toca;
   tanda 2, punto 12.3).
3. **Lo que espera a Ramón** (punto 2): el cargo de la firma y del autor, y los textos en primera persona de `/nosotros/`.
4. **`/nosotros/` sin preguntas**, aunque la fila de la spec las nombra: no hay dato (punto 3).
5. **Lo que sobra de driftime:** ninguna página importa ya `driftime.css` (el barrido lo comprueba en el CSS que carga cada
   página), pero el archivo, `components/v3/` y `consts-v3.ts` siguen en el repo: Tailwind lee los `.astro` de
   `components/v3/`, y borrarlos cambiaría el CSS de las páginas publicadas (punto 1). Se van al publicar, con la línea base
   rehecha.

### 9. Lo verificado en esta tanda

- `npm run build` + `comparar-produccion.mjs`: las 22 páginas publicadas y lo que sirven, **iguales byte a byte** (con la
  guardia del punto 1). Nuevos fuera de `v3/`: las doce imágenes al compartir (y las de las tandas anteriores).
- `npm run verificar -- --prefijo /v3/` a 390, 768, 1440 y 1920 (y con `--sin-pildoras` a 1440): **27 páginas, sin
  hallazgos** (a 1440, los 8 nodos sobre el degradado del velo de la portada, medidos en la tanda 2).
- Render con Chromium a 360, 390, 768, 834, 1024, 1194, 1440 y 1920 de las doce páginas (`capturar.mjs`), mirado: desborde 0
  también sin el `overflow-x: clip`, un `h1`, encabezado de 90 bajo 834 y de 64 desde 834, solo Google Sans Flex y DM Mono,
  cero errores de consola. Capturas a 390 y 1440 en `e12/construccion/capturas/tanda-5/` (la primera pantalla en PNG y la
  página entera en JPEG), más los estados: el resultado del chequeo a 1440, el foco en un campo con el aviso abierto, la
  casilla marcada con el foco a 390, la barra de un artículo abierta a 390 y el índice marcando una sección a 1440.
- `comprobar-tanda-5.mjs` (**sin fallas**, `capturas/tanda-5/comprobar-tanda-5.json`): JSON-LD que parsea, sin `@id` repetidos
  ni tipos vetados, la `BreadcrumbList` igual a la miga, la `FAQPage` igual a las preguntas a la vista; largos de §1.2;
  `noindex`; cada imagen al compartir 1200 × 630, JPEG, ≤ 200 kB; cero «54 → 94», «36 → 73», `<!--`, `href="#…"`,
  praxi.coach, «en pausa», «fuera de línea» y driftime; cero nodos en negrita; a 1440 los `h2` de sección en c1–c4 y
  pegajosos a 88 y el contenido en c5–c12, y a 1024 arriba y sin pegarse; ninguna franja; el formulario de contacto igual al
  de producción y entero sobre el pliegue a 1440 × 900 con el aviso abierto (de 421 a 822; el aviso empieza en 831); un envío
  que sale bien muestra «Listo.» con el foco, uno que falla deja el botón con su texto y su flecha y el error en blanco;
  `?sitio=` llena el campo; el chequeo en c1–c8 con sus cinco ids, y con una respuesta guardada de `/api/chequeo` el
  resultado se pinta en la misma columna con el `h2` oculto; en los siete artículos el índice marca la sección y el punto
  queda en su fila, y a 390 la barra abre, lleva a la sección, se cierra y la nombra; las tablas, dentro de su caja; los
  enlaces internos responden 200 con sus fragmentos; área de toque a 390: 0 controles bajo 44.
- `comprobar-base.mjs` sobre las cinco interiores y un artículo (`capturas/tanda-5/comprobar-base-*.json`): la rueda llega al
  90 % en 44 a 59 ms; cero `a[href^="#"]`; saltar al contenido con su ruta; encabezado plegado; con movimiento reducido,
  ninguna entrada y las transiciones en 0 s.

### 10. El barrido final de toda la obra

`barrido-final.mjs` (**sin fallas**, `capturas/tanda-5/barrido-final.json`), sobre el build:

- **Las 27 rutas del mapa** tienen su página, y en `dist/v3/` no hay otra que las maquetas.
- **Cero `a[href^="#"]`** y cero `<!--` en el HTML de las 27; un `h1`, `noindex` y un JSON-LD sin `@id` repetidos en cada una.
- **Ningún enlace interno roto entre las rutas de A:** los 390 enlaces que empiezan con «/» llevan a un archivo del build, y
  cada fragmento a un `id` que existe en su página.
- **Ninguna página de A carga el CSS de driftime** (spec §5.3.5).
- **Una muesca de rueda llega al 90 % en menos de 100 ms** en la home (53 ms), Praxi (54) y el artículo de los 21 chequeos
  (43).
- **Las maquetas `a`, `b`, `c` y `maqueta-inicial` siguen fuera y con `noindex`:** ninguna página de A las enlaza, no están
  en el `sitemap.xml` (que no nombra ninguna ruta `/v3/`) y `verificar` las sigue dejando fuera.
- Más lo de arriba: `verificar` a 390, 768, 1440 y 1920 sin hallazgos en las 27, y producción igual a la línea base.
