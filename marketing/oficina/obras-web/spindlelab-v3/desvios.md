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
