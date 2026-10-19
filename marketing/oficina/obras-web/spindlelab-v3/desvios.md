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

| Prop | Por defecto (lo de hoy) | Lo que pasa A (`src/components/a/PaginaA.astro`) |
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
