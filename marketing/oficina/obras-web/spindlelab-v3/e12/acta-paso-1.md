# Acta de QA · E12 paso 1 · vuelta 1

**16-oct-2026 · Javiera (QA crítico web), en subagente de contexto limpio** · rama `claude/magical-franklin-ckfki2`,
revisado sobre `d2056ec` · aprueba nadie: esto es evidencia; decide Ramón.

**Qué se revisó:** `e12/medicion/` (Koto y Accept & Proceed), `e12/brief-de-obra.md` (Mauro),
`e12/inventario-casos.md` y su JSON (Diego, con Simón), `e12/lock-koto.md` (Lucía) y
`tableros/e12-laboratorio/tablero.html` (Lucía). **Contra qué:** `e12/insumos-ramon-16oct.md` (manda), el encargo de
este paso, `CLAUDE.md`, el manual y los dos detectores (`estudio-web/antislop-web.md` y
`refero-design/references/anti-ai-slop.md`). No hay `spec-visual.md` ni `desvios.md` de E12: en el paso 1 todavía no
corresponden, así que el cumplimiento se audita contra el brief y el lock, no contra una spec.

**Cómo:** todo lo de abajo lo medí yo, con herramientas propias (no corrí las de Lucía ni las de Diego), en
Chromium 141.0.7390.37 headless con Playwright 1.63.0, por el proxy de la sesión. Herramientas, crudos y capturas en
`e12/qa-paso-1/vuelta-1/`.

---

## Veredicto: **Con reparos**

La base es sólida y se puede mostrar: **la medición es real** (las 13 filas re-medidas, con más de 40 valores, coinciden con
`medicion.json`, y las capturas son de esos sitios), **el inventario es verdadero** (los dos chequeos repetidos dan
el mismo puntaje, señal por señal, y las etiquetas que se pueden ver desde afuera están en lo servido), **no hay
ninguna cifra inventada ni ningún prospecto nombrado**, el contraste del lock cuadra al centésimo y el tablero pasa
el contrato, el render a cuatro anchos, la carga de imágenes y las tres demos (mouse, teclado, movimiento reducido).

**Los reparos, con plazo:**
- **Antes de mandarle el enlace a Ramón:** defectos **1, 2 y 3**. Son de texto y un atributo: el brief y el lock
  dejan sin respuesta ideas que Ramón escribió (la más visible, su filosofía «Form & Intelligence»), y en el
  tablero la ficha del papel no se ve. Ramón ya rechazó cuatro direcciones; que no encuentre una idea suya contestada
  es exactamente lo que este paso existe para evitar.
- **En la misma pasada o, a más tardar, antes de la compuerta 2:** defectos 4 a 14.

---

## 1 · Lo medido, con su evidencia

### 1.1 · Los referentes, re-medidos (punto 1 del encargo)

`herramientas/remedir-referentes.mjs` y `herramientas/remedir-koto-cursor.mjs`, 16-oct 21:23 a 21:25Z, 1440 × 900,
dpr 1. Crudos: `crudo/referentes-remedidos.json`, `crudo/koto-cursor-barra-remedido.json`.

| Sitio | Valor | Lucía (`medicion.json`) | Hoy (QA) | |
|---|---|---|---|---|
| Koto | Letra y tamaño del display a 1440 (`[data-ref-showreel-title-title]`, «We’re Koto») | gtKotoheimCondensed 300, 48 px, interlínea 1,0, −0,01 em | gtKotoheimCondensed, peso 300, 48 px, interlínea 48 px, −0,48 px | coincide |
| Koto | Color de fondo | `html` `#060606` | `html` `rgb(6, 6, 6)` | coincide |
| Koto | Margen lateral | 16 px | contenedor del título en x = 16, 1408 de 1440 de ancho | coincide |
| Koto | Una transición: enlace del nav | color, 167 ms, lineal | `color …`, `0.167s`, `linear`, blanco al 70 % | coincide |
| Koto | Cursor sobre el showreel | «PLAY», negro al 20 %, `blur(40px)`, radio 2, padding 6, Mono 11 MAYÚSCULAS, sin retardo | `[data-ref-cursor]` «PLAY», `oklab(0.122 … / 0.2)`, `blur(40px)`, radio 2 px, padding 6 px, gtKotoheimMono 11 px `uppercase`; puntero del sistema `none`; en el primer cuadro (12 ms) ya está en el destino | coincide |
| Koto | Barra lateral de `/work` y titular de página | 320 px; 24 px, 300 | contenedor `md:w-sidebar` de 320 px desde x = 16; «Our work» 24 px, 300 | coincide |
| A&P | Letra y tamaño del display a 1440 (h1 de Work) | Messina Sans 400, 35 px, interlínea 48, −0,35 px | `"Messina Sans"`, 400, 35 px, 48 px, −0,35 px | coincide |
| A&P | Color de fondo | `#F9F7F3` | `body` `rgb(249, 247, 243)` | coincide |
| A&P | Margen lateral | 44 px | `div.container.main-grid` con padding 44 / 44 | coincide |
| A&P | Bajada gris | `#8C8C8C` al 80 % | `rgba(140, 140, 140, 0.8)` | coincide |
| A&P | Una transición: el cursor | `all .2s ease-out` | `0.2s ease-out` | coincide |
| A&P | Cursor en reposo | círculo 16 × 16, `rgba(23,23,23,.2)`, `blur(5px)`, radio 100 | 16 × 16, `rgba(23, 23, 23, 0.2)`, `blur(5px)`, radio 100 px; puntero del sistema `none` | coincide |
| A&P | Cursor sobre un proyecto | pastilla 139,5 × 40, «View Project» | `custom-cursor grow`, 139,5 × 40, «View Project» (sobre `/work/vans`) | coincide |

**13 de 13 filas coinciden.** Además leí en el JSON tres afirmaciones que el tablero repite: los 35 casos de Koto tienen 0
porcentajes y 0 multiplicadores (`contenido.casos.resumen`); de los 6 con una cifra de dinero, solo MachineX es un
resultado después del lanzamiento (las otras 5 son contexto: «$121 billion in unclaimed perks», «2 billion people»…),
como dicen el lock y el tablero; `--animate-feed-in-transform: feed-in-transform .5s cubic-bezier(0,0,0,1)` está en
las variables de Koto, y la pieza del índice pasa de 393,4 a 369,4 px de alto (24 px) con la bajada a 167 ms tras
167, todo como lo cita el tablero.

**Las capturas existen y son de esos sitios.** Las 66 capturas que nombra `koto/medicion.json` y las 62 de
`accept-and-proceed/medicion.json` están en disco. Mis capturas de hoy (`capturas/koto-trabajo-1440-remedido.jpg`,
`capturas/ap-trabajo-1440-remedido.jpg`) muestran la misma composición, pieza por pieza, que
`koto/capturas/trabajo-1440-primera.jpg` y `accept-and-proceed/capturas/trabajo-1440-pantalla1.jpg` (solo cambia la
hora del reloj de Koto y, en A&P, la posición del scroll y el cursor encima de Vans).

### 1.2 · El inventario (punto 2)

| Qué | Diego (17:51Z) | QA (21:26Z) | |
|---|---|---|---|
| `/api/chequeo?dominio=spindlelab.cl` | 85, 21 señales, 100 de peso | **85**, 21, 100; los mismos 18 en ok y los mismos 3 pendientes (perfiles externos, preguntas, fecha) | igual |
| `/api/chequeo?dominio=verifica.spindlelab.cl` | 94 | **94**; el mismo único pendiente (perfiles externos) | igual |
| Pesos por bloque | 30 + 40 + 30 | 30 + 40 + 30 | igual |
| El 54 del 14-oct | crudo de E9 | 54, nueve pendientes; las ocho que pasaron a ok suman 40: 32 de datos estructurados y 8 de llms.txt y sitemap | cuadra con §2.3 y §4.1 |

Crudos: `crudo/chequeo-spindlelab.cl.json` y `crudo/chequeo-verifica.spindlelab.cl.json`, con cabeceras.

**Etiquetas técnicas, releídas en lo servido** (`herramientas/verificar-servido.sh` → `crudo/verificar-servido.txt`,
sin guardar el HTML de Combeau porque trae sus datos de contacto): Combeau `server: Netlify`, `Astro v7.3.1`, 11 rutas
`/.netlify/images`, `decap-cms@3.15.1` en `/admin/`, `/api/auth` → 302 a `github.com/login/oauth/authorize`, la foto
`beto3.jpg` en 804.697 B (JPEG) y 94.576 B (WebP, 828 px); Verifica `server: cloudflare`, los cinco tipos de JSON-LD y
las fechas 2026-09-23 y 2026-10-15; spindlelab.cl `Astro v4.16.19` y 217 variables `--tw-`. Todas como dice el
inventario. **Una nota:** el beacon de Cloudflare Web Analytics de Verifica está en el crudo de Diego y en 1 de mis 6
lecturas: la inyección es intermitente. La etiqueta es verdadera; si un día se muestra, se respalda con la
configuración de la cuenta, no con un HTML.

**Cifras con fecha y método:** recorrí el JSON; las 16 cifras de los seis proyectos tienen `fecha`, `metodo` y
`crudo`, y los 30 ingredientes, su `evidencia`. El 36 y el 73 van rotulados como «dichos», sin crudo, con su fuente
(`9ebf384`); está bien así. La única cifra cuyo método no la mide es la del h1 «pegado» de Combeau (defecto 13).

### 1.3 · Contraste del lock, recalculado (punto 5)

`herramientas/contraste-qa.py` (fórmula WCAG 2.1 escrita de cero; transparencias compuestas) → `crudo/contraste-qa.json`.
**Los 24 pares coinciden al centésimo con el lock §5 y con el tablero:** tinta 17,45 / 16,37 / 18,88; gris 5,32 / 4,99
/ 5,76; cobalto 7,03 / 6,59 / 7,61; blanco sobre cobalto 7,61; tinta sobre cobalto 2,48 (por eso el círculo se
esconde con teclado); líneas 1,18 y 1,47; Koto 7,02 / 20,26 / 2,89 / 1,10; A&P 19,63 y 2,41 (el resumen de A&P dice
2,40 y su JSON 2.4: es redondeo). Tono OKLCH del cobalto 264,2° y croma 0,298; `indigo-500` 277,1°: cuadra.
**El cobalto como texto** aparece en el tablero solo en la lectura del resorte (16 px sobre la placa, 6,59:1) y el
blanco sobre el círculo da 7,61:1: **pasa AA donde se usa.**

### 1.4 · Letras: licencia y detectores (punto 5)

| Letra | Licencia | URL verificada hoy |
|---|---|---|
| Mona Sans | SIL OFL 1.1, nombre reservado «Mona» (en GitHub, «Mona Sans») | `https://github.com/google/fonts/blob/main/ofl/monasans/OFL.txt` · `https://github.com/github/mona-sans/blob/main/LICENSE` |
| Google Sans Flex | SIL OFL 1.1 | `https://github.com/google/fonts/blob/main/ofl/googlesansflex/OFL.txt` |
| DM Mono | SIL OFL 1.1 | `https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt` |

Copias en `crudo/licencia_*`. **Las tres son libres**; el lock no trae la URL de ninguna licencia (defecto 11).
**Ninguno de los dos detectores marca estas letras**: el de refero señala «la misma letra de todo sitio hecho con
IA» sin lista, y en su tabla de sugerencias por rubro aparecen Inter, Geist, DM Sans, Plus Jakarta y JetBrains Mono,
no Mona Sans ni DM Mono. Las que el brief de Ramón proponía y la respuesta 4 marcó como cliché (Space Grotesk, Plus
Jakarta) y las de plantilla (Geist Mono, por `create-next-app`) quedan fuera con su porqué medido.

**Motion:** `motion@13.5.0` publicado el 2026-10-01T11:31:59Z (registro de npm): 15 días, cumple las dos semanas;
jsDelivr lo sirve (200, 144.828 B). La última es 14.3.0; el lock deja la 14 para la construcción.

### 1.5 · El tablero (punto 6)

`herramientas/auditar-tablero.mjs` (envuelve el archivo como el publicador, lo sirve en 127.0.0.1) →
`crudo/auditoria-tablero.json`; `herramientas/tab-recorrido.mjs` → `crudo/tab-recorrido.json`.

**Contrato de página**

| Ítem | Medido | |
|---|---|---|
| `<title>` de 2 a 4 palabras | «Tablero laboratorio E12»: 3 | cumple |
| `meta claude:viewport-fit-sides` | `content="cover"` | cumple |
| Gutter con safe-area | `.marco`: `max(16px, env(safe-area-inset-left/right, 0px))` | cumple |
| Tokens en `:root` | `--papel`, `--placa`, `--hoja`, `--tinta`, `--gris`, `--linea`, `--linea-seccion`, `--senal`, `--f-letra`, `--f-mono` | cumple |
| Fondo en `body` | `background: var(--papel)` | cumple |
| Hojas externas | solo `fonts.googleapis.com/css2` (Mona Sans, Google Sans Flex, DM Mono, `display=swap`) | cumple |
| Scripts externos | solo `cdn.jsdelivr.net/npm/motion@13.5.0/dist/motion.js` | cumple |
| Sin doctype / html / head / body | ninguno de los cuatro | cumple |
| (fuera del contrato pedido) Tema oscuro | no hay; `color-scheme: light` con un comentario que lo justifica (es el tablero de una dirección clara) | anotado, no es defecto |
| HTML válido | **tres `<span>` con dos atributos `style`**: el segundo se descarta | defecto 3 |

**Render** (página envuelta, todas las img perezosas forzadas a cargar bajando la página)

| Ancho | `scrollWidth` / `clientWidth` | Elementos que salen | h1 | img cargadas | Nodos de texto | Bajo AA | Errores de consola o red |
|---|---|---|---|---|---|---|---|
| 360 (táctil, dpr 2) | 360 / 360 | 0 | 1 | 22 / 22 | 692 | 0 | 0 |
| 390 (táctil, dpr 2) | 390 / 390 | 0 | 1 | 22 / 22 | 692 | 0 | 0 |
| 768 | 768 / 768 | 0 | 1 | 22 / 22 | 692 | 0 | 0 |
| 1440 | 1440 / 1440 | 0 | 1 | 22 / 22 | 699 | 0 | 0 |

Landmarks: un `header`, un `nav`, un `main`, un `footer`. Jerarquía: un salto h2 → h4 (defecto 5). Texto más chico:
8,8 px (defecto 6). Las tres letras y Motion cargan en los cuatro anchos.

**Imágenes.** El encargo de esta revisión no fija un tope; comparo con lo que declaran el lock §18 y
`img/manifiesto.json`: 21 archivos en `img/` = 21 en el manifiesto; 1.611.702 B en disco = el total del manifiesto
(el lock dice «1,5 MB»: son 1,54 MiB o 1,61 MB); la mayor, 168.461 B (`letras-comparadas.jpg`). En el navegador se
transfieren las 21 con exactamente los bytes del disco; las `img` son 22 porque Verifica va dos veces. Las 22
tienen `width`/`height` iguales a su tamaño real, y `alt`. Miré seis imágenes contra su `alt` (portada de Verifica,
portada de Combeau, panel de telemetría de Koto, cursor «VIEW CASE», las dos piezas del índice en reposo y en hover):
describen lo que se ve, incluida la honestidad de que la pieza de Koto «todavía no cargaba».

**Demos** (1440 con puntero fino; reducido y teléfono emulados)

| Demo | Medido | |
|---|---|---|
| Cursor con mouse | Círculo de 88 px, `rgb(0, 41, 255)`, «Ver el caso», centrado en el puntero (712, 424); puntero del sistema `none` solo sobre el medio (`pointer` fuera); salto de 240 px sin pasarse (0 px); al salir, ancho 0 | funciona |
| Cursor con teclado | Tab a la pieza: clase `teclado`, círculo `hidden`, foco `solid 2px rgb(17,17,17)` a 3 px, rótulo quieto con opacidad 1; vuelve al mover el mouse | funciona |
| Recorrido de Tab entero | 11 paradas en orden (6 del índice, enlace a los insumos, la lámina, la pieza, el grupo de radios, «Mover»), las 11 con contorno visible | funciona |
| Resorte con teclado | flecha cambia el radio (entrada → estado); Enter y Espacio mueven; lectura 144 y 145 ms (calculado 139) | funciona |
| Resorte con mouse | cursor 90 ms, estado 142 ms, entrada 274 ms (calculados 75, 139, 264; la diferencia es el cuadro de 16,7 ms en que se lee) | funciona |
| Movimiento reducido | clase `sin-circulo`, círculo `display: none`, puntero del sistema, rótulo a la vista al pasar; «Mover»: 0 animaciones y el bloque ya en 920 px en el primer cuadro | funciona |
| Teléfono (390, táctil) | `sin-circulo`, sin círculo; tocar la pieza lleva a `#casos` | funciona |
| Gráfico | la cruz aparece y el valor se lee («260 ms · resorte 90 % · Koto 90 % · A&P 56 %»); los mismos números están en la tabla, así que nada depende del hover | funciona |

Capturas: `capturas/tablero-{360,390,768,1440}-primera.jpg`, la página entera en tramos
(`capturas/tablero-390-completa-01…09.jpg`, `capturas/tablero-1440-completa-01…06.jpg`) y las demos
(`demo-cursor-mouse-1440.jpg`, `demo-cursor-teclado-1440.jpg`, `demo-resorte-1440.jpg`, `fichas-de-color-1440.jpg`,
`tabla-resortes-390-recorte.jpg`).

**Lo que dice de Koto y A&P contra la medición:** las 15 afirmaciones de las dos listas de valores, las 16 filas de
«Tu brief, punto por punto» y los pies de foto que revisé coinciden con `medicion.json` y con mi re-medición. Las
únicas diferencias son de redondeo (defecto 14).

### 1.6 · Honestidad en lo que verá Ramón (punto 3)

- **Cifras inventadas:** ninguna. El 40 % y el +150 % de su segundo texto aparecen solo en «Lo que no se puede
  decir», rotulados como ejemplos. Cada cifra de los casos lleva fecha, método y si se puede publicar. Las frases de
  Ramón que se usan como muestra de letra van rotuladas («Texto de muestra, no el definitivo: la frase de tu brief»).
- **Telemetría falsa:** el reloj se calcula en el navegador con `America/Santiago` (lo vi en 18:30 UTC-3). Dos
  valores escritos a mano quedan con forma de dato vivo (defecto 9).
- **Prospectos:** ninguno nombrado en el tablero, el brief ni el lock. El tablero nombra a Bernardo Combeau, que es
  cliente con permiso verbal para el caso, y no lo publica: sus mediciones van marcadas «pide OK escrito». El
  cliente en construcción y el de SEO sin permiso van sin nombre. (El inventario los nombra, §8: es un documento
  interno y los nombres ya están en `ventas/`.)
- **Raya de muletilla:** 0 en el tablero, el brief, el lock y el inventario. **Verbos de folleto:** 0.

### 1.7 · El brief (punto 4)

- **Las cuatro respuestas de Ramón se respetan:** estudio que también hace SEO e IA con precios iguales (§1, §6.4),
  Astro + Tailwind + Motion (§4, §6.1), solo lo medido (§4 casos, §6.2), Koto manda y el brief orienta (§4).
- **Preguntas:** 5, cada una con opción recomendada y alternativas (§8). Cumple.
- **Criterios verificables:** los 13 de §7 se pueden comprobar con un instrumento o un documento (medir en el
  navegador, diff contra los JSON, `npm run verificar`, `chequeo.js` sobre el build, lectores fríos con perfil).
- **Cobertura de las ideas de Ramón:** incompleta (defecto 1). Cifras: comprobé el 104 / 16,05 % / 7 de 142 contra
  `metricas/checkpoint-dia77-2026-09-21.md` y los contrastes de §4 contra mi cálculo; el 5,8 % / 1,4 % está en la
  misma fuente pero no se cita en su línea (defecto 12).

---

## 2 · Defectos

| N.º | Severidad | Dueño | Dónde | Qué (reproducible) | Cierre |
|---|---|---|---|---|---|
| 1 | Mayor | Mauro | `brief-de-obra.md` §4 | La tabla «Las ideas de Ramón, una por una» no tiene fila para varias ideas de `insumos-ramon-16oct.md`: la **filosofía «Form & Intelligence»** (§2, punto 1; `grep` da 0 en brief, lock y tablero), la **iconografía** («minimalista, 1,5 px, Lucide»: 0 en el brief), la **atmósfera** («microinteracciones táctiles», «sin redes neuronales dibujadas ni gradientes púrpura»: 0), la **mono** (Geist Mono o JetBrains Mono: 0 en el brief) y el párrafo **«[ LAB_01 ] … para líderes con visión»** (0). El encargo pide que cada idea salga con «se toma / con datos reales / se ajusta» y su porqué | Una fila por cada una, con veredicto y porqué. Lo que ya resolvió el lock (iconos, mono) se cita: «lo fija el lock §4» |
| 2 | Mayor | Lucía | `lock-koto.md` §4 y tablero §3 «Tu brief, punto por punto» | El lock no contrasta con lo medido tres ideas del brief de Ramón: **«Form & Intelligence»**, la **atmósfera** (táctil, sin púrpura ni redes neuronales) y las **etiquetas de ingredientes** («[React]», «[Modelos RAG]»…, segundo texto, punto 2). Para las etiquetas hay referente medido y no se usa: A&P pone bajo cada pieza **etiquetas con filete de 1 px y un icono** («New Ambition», «New Expressions»: `accept-and-proceed/capturas/trabajo-1440-pantalla1.jpg`; «filetes de 1 px solo en las etiquetas», resumen §3). El lock §7 decide «una línea mono» sin decir por qué no la etiqueta medida. El tablero hereda los tres huecos | Tres filas más en §4 (lo medido de Koto y A&P, decisión, porqué) y los mismos tres puntos en el tablero §3 |
| 3 | Menor | Lucía | Tablero §4, fichas de `--papel`, `--placa` y `--hoja` | Cada `span.ficha__chip` claro tiene **dos atributos `style`** (`style="background:#F6F6F4" style="outline:1px solid var(--linea-seccion)"`); el navegador descarta el segundo y el contorno no existe (medido: `outline: none 0px` en las 6). **La ficha del papel es invisible** (papel sobre papel, 1:1) y las de placa y hoja quedan a 1,07 y 1,08:1: `capturas/fichas-de-color-1440.jpg` muestra un hueco donde va el papel. Es la ficha del color de fondo que Ramón eligió | Un solo `style` con `background` y `outline` (en `armar-tablero.py`), y captura nueva |
| 4 | Menor | Lucía | Tablero (CSS `.registro::before/::after` y SVG «Líneas de registro») contra lock §10; lock §10 contra brief §4 | (a) El lock dice que la cruz de registro va en `--linea-seccion` (1,47:1); el tablero la dibuja en **`--tinta`** (17,45:1), en las dos secciones y en el dibujo. (b) El tablero dice «una marca solo donde **dos líneas reales** se cruzan»; en x = 336 hay una sola línea dibujada (el borde de sección): el borde de la barra lateral no tiene línea (`.seccion__lado` sin borde; `capturas/tablero-1440-primera.jpg`, la «+» en 335, 791). (c) El brief §4 condiciona las marcas a que «la medición de Koto las traiga», y Koto trae cero; el lock las agrega sin anotarlo como desvío del brief en §19 | Color igual al lock (o el lock cambia, con su porqué); el texto dice lo que hay («donde el borde de sección cruza el límite de la barra»); fila en §19 que registre la diferencia con el brief |
| 5 | Menor | Lucía | Tablero §5 «Casos y datos reales» | Salto de jerarquía **h2 → h4**: los seis casos son `h4` directo bajo el `h2` (medido en los cuatro anchos: «h2 → h4 «Bernardo Combeau, fotografía»»). antislop C1 | Los casos en `h3` (o un `h3` que los agrupe) |
| 6 | Menor | Lucía | Tablero, tabla de resortes | `<code>spring()</code>` dentro del `caption.rotulo` de 11 px queda en **8,8 px** (`.8em`), bajo el piso de 11 px del lock §6.4 y §15. Además el `text-transform` lo vuelve «SPRING()» y «(DATOS/RESORTES.JSON)» (`capturas/tabla-resortes-390-recorte.jpg`) | `code` a `1em` dentro de rótulos, sin mayúsculas en nombres de función o archivo |
| 7 | Menor | Lucía | Tablero, tabla de resortes, fila «A&P, cursor propio…» | Texto cortado a la vista: «…sin inercia **(medicion.js**» (sin cerrar; el JSON dice `medicion.json`). Sale del recorte de texto de `armar-tablero.py` | Texto entero, o la fuente en otra columna |
| 8 | Menor | Lucía | Tablero, tabla de resortes bajo 834 px | El `thead` se esconde y las celdas quedan en dos columnas **sin rótulo**: a 390 se lee «1,001 / 33 ms / 75 ms / 128 ms / 0 %» sin saber cuál es ζ, 50 %, 90 % o 99 % (`capturas/tabla-resortes-390-recorte.jpg`) | Cada celda con su rótulo a la vista bajo 834 px (por ejemplo `data-rotulo` + `::before`) |
| 9 | Menor | Lucía | Tablero: muestra de la mono y reloj de la cabecera | (a) «**Fecha del build: 16-oct-2026**» está escrito a mano en la muestra de DM Mono, sin rótulo de muestra; no hay ningún build del 16-oct (la vista previa sirve `f0d911c`, del 14-oct: inventario §2). Es la «fecha de despliegue escrita a mano» que el inventario §5.2 pone en lo que no va. (b) La hora «14:05» está escrita en el HTML como respaldo de las dos `.reloj`: si el JS no corre (vista previa, miniatura), queda una hora fija con forma de reloj vivo | (a) «Muestra:» delante, o el valor verdadero con su fuente (14-oct, `f0d911c`). (b) Respaldo vacío o «--:--» hasta que corre el reloj |
| 10 | Menor | Lucía | Tablero §5 | La nota «Publicable: Los kB, sí, con fecha y método. Los ms, no como «velocidad para tus clientes»: son de laboratorio y desde EE.UU.» se repite **6 veces** (34 palabras cada una; el tablero tiene 5.429 palabras visibles). antislop A10. Y «Publicable: Los» va con mayúscula después de dos puntos | Una sola vez, arriba de los casos; en cada fila, «kB publicables, ms no» o nada |
| 11 | Menor | Lucía | `lock-koto.md` §6.2 y §6.3 | Las letras propuestas no traen **la URL de su licencia**: Mona Sans y DM Mono citan el repositorio; Google Sans Flex, solo «OFL según su tabla `name`». Las tres son OFL (verificado: §1.4 de esta acta) | Poner las tres URLs de §1.4 |
| 12 | Menor | Mauro | `brief-de-obra.md` §4 «Telemetría», §4 «Índice», §8.3 y §2 | (a) «Los dos referentes tienen una sola telemetría, y es verdadera: **un reloj**»: Koto medido trae además la hora de cinco estudios, conteos «(148)», «(35)» y la ficha del caso (`medicion/koto/resumen.md` §5). El brief dice que la medición de Koto lo corrige, y no se corrigió. (b) «son **cinco**» (§4) y «Con **cinco** entradas» (§8.3); el inventario cuenta **seis** (§0.1) y el tablero muestra los dos números (§5 «Seis cosas reales», §6 «Con cinco entradas»). (c) «5,8 % de respuesta contra 1,4 % de salud» sin fuente en la línea ni el tamaño: son 4 de 69 y 1 de 72 (`metricas/checkpoint-dia77-2026-09-21.md:36-37`) | Corregir (a) con lo medido, (b) a seis, (c) con fuente y «4 de 69 · 1 de 72» |
| 13 | Menor | Inventario | `inventario-casos.json`, Combeau, «Encabezado principal (h1) por ruta» | El valor dice que el h1 de la portada «se lee pegado («Se construyedirigiendo»)», pero el método citado («curl -L … contando `<h1`») y el crudo (`h1-bernardocombeau.cl.tsv`) solo cuentan h1. Es verdad para una máquina que lee `textContent` (el HTML servido es `Se construye<br>dirigiendo`, `crudo/verificar-servido.txt`) y su fuente es `encargo-h1-sitio-bernardo-10oct.md` §3. De paso: «786 KB → 92 KB» está en KiB y las cargas en kB (804.697 B serían 805 kB) | Método y fuente de esa frase («textContent del h1 servido; encargo del 10-oct §3») y una sola unidad |
| 14 | Nit | Lucía | Tablero, pie de `letras-comparadas.jpg`, contra lock §6.2 | Space Grotesk mide «**1,32**» veces el ancho de Koto en el tablero y «1,33» / «33 % más» en el lock; el dato es 1,325 (`datos/letras.json`). Igual con «1,5 MB» (son 1,54 MiB o 1,61 MB) junto a «168 KB» decimal | Un redondeo y una unidad en los dos |

**Observaciones que no son defecto:** las anclas del índice del tablero miden 38 px de alto a 390 (el lock pide 44
para los controles del sitio, no para este tablero; WCAG 2.5.8 pide 24); el tablero agrega la letra como sexta
decisión opcional además de las cinco preguntas del brief, y lo dice; a 768 con puntero fino aparece el círculo,
que es lo correcto.

---

## 3 · Los dos detectores, completos (sobre el tablero)

**`antislop-web.md` §E**

```
COPY            [x] sin verbos de folleto (0)  [x] sin relleno de apertura
                [x] sin tricolon automático  [x] sin "no solo X sino Y" (0)
                [x] sin pregunta retórica ni "¿Listo para…?"  (las 5 preguntas de §6 son decisiones reales para Ramón)
                [x] sin Title Case  [x] registro es-CL consistente: tú en todo el tablero
                [x] sin raya como remate (0)  [x] cero prueba social sin respaldo
                [ ] borrar 30 % no mejora la página: FALLA en §5 (defecto 10)
ESTRUCTURA      [x] sin tres tarjetas idénticas (no hay tarjetas; la placa del resorte agrupa un control)
                [x] sin "¿por qué elegirnos?"  [-] FAQ: no aplica, no hay
                [x] sin fila de métricas inventadas  [-] formulario: no aplica
                [x] hero no es 100vh centrado vacío  [x] orden de secciones: pediste → medido → tomamos → tokens → casos → decides
CÓDIGO          [ ] landmarks + un h1 + jerarquía sin saltos: FALLA el salto h2 → h4 (defecto 5)
                [x] cero valores por defecto sin justificar: radios 6/4/2 y tiempos salen de Koto (lock §17, §9)
                [x] sin degradé-mancha ni glass  [x] cero emoji (↗ es un carácter)
                [x] alt reales (seis revisados mirando la imagen)  [x] foco visible (11 de 11), contraste AA (0 bajo), labels en los radios
                [x] imágenes dimensionadas (22/22); [-] hero eager: no hay imagen en el primer viewport; [x] font-display swap
                [-] JSON-LD + canonical + OG: no aplica, es un tablero privado de trabajo, no una página del sitio
                [-] índice y sitemap, ?v=N: no aplica, nada se publica
VISUAL          [x] detector de refero-design corrido entero (abajo)
PRUEBAS         [x] logo tapado  [x] rubro cambiado  [x] leído en voz alta (sección 4)
```

**`anti-ai-slop.md` (refero)**

```
[x] Acento no índigo: cobalto 264,2° OKLCH, a 13° de indigo-500 y con 50 % más croma
[x] Tarjetas solo con interacción: la única caja (placa del resorte) contiene un control
[x] Sin franja lateral de acento  [x] Sin emoji
[x] Claro: lo pide el brief de Ramón («Light Mode Editorial»)
[x] Sin serif editorial  [x] Sin paleta terrosa: papel con croma OKLCH 0,003
[x] Sin palabra destacada decorativa: las dos tintas son regla medida de Koto (10 de 17 titulares) con rol escrito (lock §14)
[x] Rasgos fuertes preservados: el tell #7 marca «lienzo oscuro que pasa a claro»; aquí está justificado por escrito
    (lock §1: lo pide el brief, A&P prueba que funciona en claro) y el acento no se apaga (cobalto puro, no #0B25B7)
[x] Roles de token preservados: el cobalto conserva el rol que le dio Ramón (estados activos, cursor, dato vivo)
[x] Rol de los medios: capturas reales de Koto, A&P, Verifica y Combeau, sin imágenes generadas
[x] Mayúsculas con interletra: rótulos mono +0,03em
[x] Pasa la prueba de captura junto a productos reales  [x] letras elegidas con medición  [x] colores del brief y de lo medido
[x] Tensión: barra de 320 px a la izquierda, contenido corrido; la retícula de Koto
[x] Cada decisión tiene su porqué en el lock
```

Pruebas de refero: tarjeta (pasa), imagen (no aplica: el primer viewport es texto, a propósito, es un tablero),
marca (pasa: el tablero es inconfundible por su contenido), copy (falla en §5, defecto 10), identidad (pasa),
editorial (pasa: no es «calma editorial»).

---

## 4 · Las tres pruebas de fuego

- **Logo tapado:** pasa. No hay logo; lo que identifica la página son mediciones y piezas propias (Verifica, el
  chequeo, Combeau) que no pueden ser de otro estudio.
- **Rubro cambiado:** pasa. Con otro rubro no queda nada: todo el contenido es la obra E12 de SpindleLab.
- **Leído en voz alta:** pasa. «El laboratorio: lo que medimos de Koto y qué hacemos con tu brief. Koto manda y tu
  brief orienta.» suena a alguien que le explica algo a Ramón en una reunión.

---

## 5 · Lo que está bien y no se toca

- **La medición de Lucía:** cada valor con página, ancho y selector; herramientas que la repiten; los límites dichos
  (videos que no corren, iframe bloqueado). Re-medida, coincide en 13 de 13 filas.
- **El inventario de Diego:** separa servido, medido, repo y dicho; guarda crudos con sha256; no guarda el HTML de
  Combeau por sus datos de contacto; dice lo que no se pudo leer. Es la razón por la que este tablero no tiene ni una
  cifra inventada.
- **El brief de Mauro:** las cuatro respuestas de Ramón respetadas, cinco preguntas con recomendación, trece criterios
  medibles, la lista de lo que no se hace.
- **El lock:** la decisión de letras está medida (34 + 14 candidatas, ancho y asta igualados) y explica el costo de la
  elegida («Mona Sans se parece menos»); el contraste cuadra al centésimo; los resortes están calibrados contra lo
  medido y probados corriendo; los techos de §14 convierten el juego en reglas.
- **El tablero:** contrato, cuatro anchos sin desborde, 22 de 22 imágenes con los bytes del disco, 0 nodos bajo AA,
  foco visible en las 11 paradas, cursor que se esconde con teclado y no existe con movimiento reducido ni en el
  teléfono. «Lo que no se puede decir» a la vista de Ramón es exactamente la honestidad que pide la respuesta 3.

---

## 6 · Lo que no medí

- No repetí la medición completa de Koto y A&P (más de 100 valores): re-medí 13 filas, las del encargo y algunas más.
- No repetí la carga y el peso de `medir-carga.mjs` ni el chequeo sobre bernardocombeau.cl (el encargo pide dos
  sitios; elegí los dos propios).
- No repetí `letras.py` (la forma de 48 letras contra GT Kotoheim): verifiqué sus salidas en `datos/letras.json` y la
  licencia de las tres elegidas.
- No corrí lectores de pantalla; revisé `aria-hidden`, nombres y orden de foco en el DOM.

---

## 7 · Archivos de esta vuelta

`e12/qa-paso-1/vuelta-1/`

- `herramientas/`: `remedir-referentes.mjs`, `remedir-koto-cursor.mjs`, `contraste-qa.py`, `verificar-servido.sh`,
  `auditar-tablero.mjs`, `tab-recorrido.mjs`.
- `crudo/`: `referentes-remedidos.json`, `koto-cursor-barra-remedido.json`, `chequeo-spindlelab.cl.json` y
  `chequeo-verifica.spindlelab.cl.json` (con cabeceras), `verificar-servido.txt`, `contraste-qa.json`, las cuatro
  licencias, `auditoria-tablero.json`, `tab-recorrido.json`.
- `capturas/`: re-medición de Koto y A&P (`koto-trabajo-1440-remedido.jpg`, `koto-home-1440-remedido.jpg`,
  `koto-cursor-showreel-remedido.jpg`, `ap-trabajo-1440-remedido.jpg`); el tablero a 360, 390, 768 y 1440 (primera
  pantalla), entero a 390 y 1440 en tramos; las demos y los recortes de los defectos 3, 6 y 8.

---
---

# Acta de QA · E12 paso 1 · vuelta 2

**16-oct-2026, 19:05 a 19:20 (Chile) · Javiera (QA crítico web), en subagente de contexto limpio** · rama
`claude/magical-franklin-ckfki2`, revisado sobre `bcd2a8b` (los tres commits de arreglo: `0938ddd` brief, `b3a1105`
inventario, `bcd2a8b` lock y tablero) · aprueba nadie: esto es evidencia; decide Ramón.

**Qué se revisó:** lo mismo que en la vuelta 1 (`medicion/`, `brief-de-obra.md`, `inventario-casos.md` y su JSON,
`lock-koto.md`, `tableros/e12-laboratorio/tablero.html`), contra `insumos-ramon-16oct.md`, el encargo, `CLAUDE.md`, el
manual y los dos detectores. Primero, cada uno de los 14 defectos de la vuelta 1; después, los seis puntos del encargo
otra vez, con herramientas propias (no corrí `verificar.mjs`, `atmosfera.mjs` ni las de Diego). Leí los diffs, no los
mensajes de commit. Chromium 141.0.7390.37 headless, Playwright, por el proxy de la sesión. Herramientas, crudos y
capturas en `e12/qa-paso-1/vuelta-2/`.

## Veredicto: **Con reparos**

**Los 14 defectos de la vuelta 1 están cerrados**, cada uno medido o leído en el archivo (tabla de §1). La medición
de Koto y A&P sigue siendo verdadera (18 filas re-medidas hoy, unos 50 valores, incluidos los que el lock agregó en su segunda
vuelta: degradados, dibujos grandes y las etiquetas de A&P), el inventario repite sus chequeos señal por señal, no
hay ninguna cifra inventada ni ningún prospecto nombrado, y el tablero pasa contrato, cuatro anchos, imágenes y demos.

**Los reparos son cuatro defectos nuevos, todos de texto** (§3). Tres estaban ya en `d2056ec` y se me pasaron en la
vuelta 1; uno (el 15) se volvió una contradicción a la vista cuando el tablero sumó la fila de las etiquetas:

- **Antes de mandarle el enlace a Ramón: 15, 16 y 17.** El tablero le dice a Ramón algo de A&P que la medición
  desmiente (15), y una idea suya, el **cursor magnético**, no aparece contestada ni en el brief ni en el tablero
  aunque el lock §8 ya la decide (16 y 17). Es la misma clase de hueco que el defecto 1: que Ramón no encuentre una
  idea suya contestada.
- **En la misma pasada:** 18 (nit).

Son cuatro líneas de texto. No hace falta una vuelta 3 completa: se comprueban con `grep` sobre los tres archivos y
una captura del tablero §2 y §3 (las búsquedas exactas van en la columna «Cierre»).

---

## 1 · Los 14 defectos de la vuelta 1, uno por uno

| N.º | Dueño | Cómo lo verifiqué | Resultado |
|---|---|---|---|
| 1 | Mauro | `brief-de-obra.md` §4 releído fila por fila contra `insumos-ramon-16oct.md`: filas nuevas para «Form & Intelligence», las dos de atmósfera («microinteracciones táctiles»; «sin redes neuronales ni gradientes púrpura»), el párrafo «[ LAB_01 ] … para líderes con visión» con «LAB_STATUS» y «DEPLOYMENT_CYCLE», la mono y la iconografía (las dos, «lo fija el lock §4»). Cada una con veredicto y porqué | **Cerrado.** (Queda una idea sin fila: el cursor magnético, defecto 16 nuevo) |
| 2 | Lucía | Lock §4: tres filas nuevas contrastadas con lo medido (filosofía, atmósfera, etiquetas); §7 dice por qué la línea mono y no la etiqueta de A&P, con cuatro razones medidas. Tablero §3: los tres puntos están («Pediste · Lo medido · Qué hacemos»), con `img/ap-etiquetas.jpg` (mirada: la pieza de Vans con «New Ambition» y «New Expressions»; el `alt` lo describe) | **Cerrado.** Re-medí lo que esas filas afirman (§2.1): coincide |
| 3 | Lucía | `crudo/auditoria-tablero.json`, `fichas`: un solo `style` por ficha; las tres claras con `outline: solid 1px` (`--linea-seccion`). `capturas/fichas-de-color-1440.jpg`: la ficha del papel se ve | **Cerrado** |
| 4 | Lucía | (a) `::before` y `::after` de `.registro` computados: `1px rgba(17, 17, 17, 0.18)`, en las dos secciones; el SVG usa `rgba(17,17,17,.18)`, `.08` y `var(--gris)`, sin tinta. (b) El texto dice «donde el borde de la sección cruza el límite de la barra lateral (x = 336). Ese límite no se dibuja»; medido: el lado termina en x = 336 sin borde, el trazo vertical en x = 335. (c) Lock §10 y §19: «desvío del brief de obra, registrado», reversible. `capturas/registro-cruz-1440-x6.png` | **Cerrado** |
| 5 | Lucía | Jerarquía en los cuatro anchos: 0 saltos (`saltos: []`); los casos son `h3` | **Cerrado** |
| 6 | Lucía | `code` del `caption`: `spring() 11px none`, `datos/resortes.json 11px none`. Texto más chico del tablero: 11 px en los cuatro anchos | **Cerrado** |
| 7 | Lucía | 0 bloques con paréntesis desbalanceados (`li, td, p, figcaption, dd, th`); la fila de A&P termina «…el resumen lo redondea a 80 ms)» | **Cerrado** |
| 8 | Lucía | A 390: `thead` oculto y **34 de 34** celdas con su rótulo visible (`td::before` con `attr(data-rotulo)`). `capturas/tabla-resortes-390.jpg` | **Cerrado** |
| 9 | Lucía | (a) La muestra dice «Build de la vista previa: f0d911c, 14-oct-2026». Comprobado: `f0d911c` es el último commit que toca `spindlelab-astro/` (14-oct 19:38Z) y `/v3/trabajo/` de la vista previa es idéntica byte a byte a `dist/` (sha256 `e7c9a92a…` en los dos). (b) Sin JS, las dos `.reloj` dicen «--:--»; con JS, la hora de Santiago y el huso los calcula `Intl` (vi 19:11 y 19:12 UTC-3) | **Cerrado** |
| 10 | Lucía | «Los kB, sí, con fecha y método» aparece 0 veces; la nota va una vez arriba de los casos («Se pueden publicar los kB… En cada caso queda como «kB sí, ms no»»). «Publicable:» con mayúscula: 0 | **Cerrado** |
| 11 | Lucía | Lock §6.2 y §6.3 traen las cuatro URLs; las cuatro responden 200 hoy y son SIL OFL 1.1 (`crudo/licencias-urls.txt`) | **Cerrado** |
| 12 | Mauro | (a) §4 Telemetría: A&P, el reloj; Koto, cuatro (hora del visitante con huso, cinco estudios, conteos, ficha), como `medicion/koto/resumen.md:24-25`. (b) «seis» en §4 Índice y §8.3; el tablero §6 también. (c) §2: «4 respuestas de 69 correos, 5,8 %, contra 1 de 72 en salud, 1,4 %; `checkpoint-dia77-2026-09-21.md:36-37`»: las dos líneas citadas dicen eso | **Cerrado** |
| 13 | Inventario | Volví a leer la portada de Combeau (`herramientas/verificar-servido.mjs` → `crudo/verificar-servido.json`): servido `Se construye<br>dirigiendo`, `textContent` «Se construyedirigiendo», `innerText` con salto de línea, mismo sha256 de HTML que el crudo de Diego (`8e785562…`). El valor dice ahora «leído como textContent», con método, dos crudos y la fuente del 10-oct. Unidad: `beto3.jpg` 804.697 B = 805 kB y 94.576 B = 95 kB; 0 «KB» o KiB en el inventario fuera de la tabla de correcciones; los 24 crudos con sha256 y bytes iguales a los del JSON | **Cerrado** |
| 14 | Lucía | Tablero: «1,33 y 1,20» (0 veces «1,32»); 0 veces «1,5 MB». Lock §6.2 «1,33», §18 «1,63 MB» = 1.631.266 B en disco | **Cerrado** |

---

## 2 · Lo medido, con su evidencia (los seis puntos del encargo)

### 2.1 · La medición es real (punto 1)

`herramientas/remedir-referentes.mjs` y `herramientas/remedir-koto-marco.mjs`, 16-oct 22:06 a 22:08Z, 1440 × 900 y
390 × 844 táctil. Crudos: `crudo/referentes-remedidos.json`, `crudo/koto-marco-remedido.json`.

| Sitio | Valor | `medicion.json` / lock | Hoy (QA) | |
|---|---|---|---|---|
| Koto | Display a 1440 | gtKotoheimCondensed 300, 48 px, 1,0, −0,01em | gtKotoheimCondensed 300, 48 px, 48 px, −0,48 px | coincide |
| Koto | Display a 390 | 36 px, 1,0 | 36 px, 36 px | coincide |
| Koto | Fondo | `#060606` | `rgb(6, 6, 6)` | coincide |
| Koto | Margen lateral | 16 px | contenedor con `padding` 16 px (x = 16, 1408 de ancho); el título queda en x = 28 porque su caja trae otro `padding` de 12 dentro del showreel, que va a sangre | coincide |
| Koto | Transición del nav | color, 167 ms, lineal, blanco al 70 % | `0.167s linear`, `oklab(0.99… / 0.7)` | coincide |
| Koto | Cursor sobre el showreel | «PLAY», vidrio negro al 20 %, `blur(40px)`, radio 2, padding 6, Mono 11 MAYÚSCULAS | `[data-ref-cursor]` «Play» en `uppercase`, gtKotoheimMono 11 px, `oklab(0.122 … / 0.2)`, `blur(40px)`, 2 px, 6 px; puntero del sistema `none` | coincide |
| Koto | Barra de `/work` y su titular | 320 px desde x = 16; 24 px, 300 | 320 px desde x = 16; «Our work» 24 px, 300 | coincide |
| Koto | `prefers-reduced-motion` | 0 reglas | 0 reglas | coincide |
| Koto | Degradados en home y `/work` (lock §4, nuevo) | 13 y 12, todos neutros, 0 con color, 0 púrpura | 13 y 12; croma máximo 0 en todos; 0 púrpura | coincide |
| Koto | Dibujos grandes en `canvas` o `svg` (nuevo) | 0 | 0 en las dos páginas | coincide |
| A&P | Display a 1440 (h1 de Work) | Messina Sans 400, 35 px, 48, −0,35 px | igual | coincide |
| A&P | Fondo | `#F9F7F3` | `rgb(249, 247, 243)` | coincide |
| A&P | Margen lateral | 44 px | `padding` 44 / 44 | coincide |
| A&P | Transición del cursor | `.2s ease-out` | `0.2s ease-out` | coincide |
| A&P | Cursor en reposo / sobre un proyecto | 16 × 16 gris al 20 %, `blur(5px)`; pastilla 139,5 × 40 «View Project» | igual, sobre `/work/vans`; puntero del sistema `none` | coincide |
| A&P | Lenis | 1.1.8 | presente (`html.lenis`) | coincide |
| A&P | Etiquetas bajo cada pieza (lock §4 y §7, nuevo) | filete 1 px `#8C8C8C` al 80 %, radio 3,4, 28 px, pictograma 20 × 20, separador 1 px; una o dos por pieza (12 y 8 de 20) | `1px solid rgba(140, 140, 140, 0.8)`, 3,4 px, 28 px, icono 20 × 20, separador de 1 px; 28 etiquetas en 20 piezas: 12 con una y 8 con dos; texto 14 px al mismo gris | coincide |
| A&P | Degradados y dibujos grandes (nuevo) | 0 y 0 | 0 y 0 en home y `/work` | coincide |

**18 de 18 filas coinciden.** Las capturas existen y son de esos sitios: las 66 de `koto/medicion.json` y las 62 de
`accept-and-proceed/medicion.json` están en disco (incluida la nueva `etiquetas-detalle-1440.jpg`, que es la pieza de
Vans); mis capturas de hoy (`capturas/koto-trabajo-1440.jpg`, `koto-home-1440.jpg`, `koto-home-390.jpg`,
`koto-cursor-showreel-1440.jpg`, `ap-cursor-proyecto-1440.jpg`, `ap-home-1440.jpg`) muestran las mismas
composiciones; en `/work` de Koto se ve el reloj del visitante («19:06 UTC-3») y los conteos del filtro («09»).

### 2.2 · El inventario es verdadero (punto 2)

`herramientas/repetir-chequeo.sh` (22:09Z), sobre dos sitios (Combeau no estaba en la vuelta 1):

| Dominio | Inventario (17:51Z) | QA (22:09Z) | |
|---|---|---|---|
| bernardocombeau.cl | 76, 21 señales, peso 100 | **76**, 21, 100; 16 ok y los mismos 5 pendientes (perfiles externos, preguntas frecuentes, títulos como pregunta, fecha, contenido de la portada) | igual, señal por señal |
| spindlelab.cl | 85, 21, 100 | **85**; 18 ok, los mismos 3 pendientes | igual, señal por señal |
| Pesos por bloque | 30 + 40 + 30 | 30 + 40 + 30 en los dos | igual |

Crudos con cabeceras: `crudo/chequeo-bernardocombeau.cl.json`, `crudo/chequeo-spindlelab.cl.json`.
Lo que cambió en el inventario desde la vuelta 1, releído en lo servido (`crudo/verificar-servido.json`): el `h1` de
Combeau (defecto 13), `beto3.jpg` en 805 y 95 kB, y los posters de la portada de spindlelab.cl: **cinco**, cuatro de
170.533 a 194.894 B de cuerpo y el del hero de 40.337 B (el inventario da 171 a 196 kB y 41 kB porque cuenta bytes
transferidos con cabeceras, como dice su método; cuadra). Recorrí el JSON: las 16 cifras de los seis proyectos tienen
`fecha`, `metodo` y `crudo`; los 30 ingredientes, su `evidencia`; los 24 crudos, sha256 y bytes iguales.

### 2.3 · Honestidad en todo lo que verá Ramón (punto 3)

- **Cifras inventadas:** ninguna. El 40 % y el +150 % solo en «Lo que no se puede decir», rotulados como ejemplos. Las
  frases de muestra de letra van rotuladas («Texto de muestra, no el definitivo»). Cada cifra de los casos, con fecha,
  método y si se publica.
- **Telemetría:** las tres líneas mono de la muestra son verdaderas (tipo y año de Verifica; la hora y el huso
  calculados para Santiago; «Trabajo (6)» son las seis entradas del inventario; el build `f0d911c` del 14-oct,
  comprobado en §1, defecto 9). Sin JS no queda ninguna hora fija.
- **Prospectos:** ninguno nombrado en el brief, el lock ni el tablero. Bernardo Combeau es cliente con permiso verbal
  del caso, y sus mediciones van marcadas «pide OK escrito». El competidor del commit `7696d63`, sin nombre.
- **Lo que dice de A&P:** una frase la medición la desmiente (defecto 15).
- **Raya de muletilla:** 0 en el tablero, el brief, el lock y el inventario. **Verbos de folleto:** 0.

### 2.4 · El brief (punto 4)

Las cuatro respuestas de Ramón se respetan (§1, §4, §6.1, §6.2, §6.4); cinco preguntas con opción recomendada (§8);
13 criterios verificables (§7). Recorrí de nuevo cada idea de `insumos-ramon-16oct.md` (las cuatro secciones del brief
pegado, los cinco puntos del segundo texto y las cuatro respuestas) contra §4: todas tienen fila con veredicto y
porqué **menos una**: «Úsalo únicamente para estados activos, **cursores magnéticos** y telemetría de código vivo»
(insumos §2, acento). El lock §8 la decide («Magnetismo: No», con lo medido), pero ni el brief ni el tablero la
contestan (defectos 16 y 17). Las fuentes de PP Neue Montreal y Söhne, que Ramón dio como ejemplos, quedan contestadas
por la fila de la display (lo medido es lo contrario: estrecha y liviana) y son de pago: no es defecto.

### 2.5 · El lock (punto 5)

- §4 contrasta cada punto del brief con lo medido, incluidas las tres filas nuevas; el magnetismo está en §8, con su
  porqué. **Una fila no cuadra con la medición**: §3, «Tabla con filetes de 1 px … Su único uso de líneas» (defecto
  15); el propio §2.4 y la fila de etiquetas de §4 dicen lo contrario.
- Letras: Mona Sans, Google Sans Flex y DM Mono, SIL OFL 1.1, con la URL de su licencia (las cuatro, 200 hoy). Ninguno
  de los dos detectores las marca; Space Grotesk, Plus Jakarta y Geist Mono quedan fuera con su porqué medido.
- Contraste recalculado con mi fórmula (`herramientas/contraste-qa.py` → `crudo/contraste-qa.json`): los 24 pares
  igual que en la vuelta 1. **El cobalto como texto** aparece solo en la lectura del resorte (16 px sobre la placa,
  6,59:1; medido en la demo: `rgb(0, 41, 255)` sobre `rgb(239, 239, 234)`), y el blanco sobre el círculo da 7,61:1:
  **pasa AA donde se usa.** Las fichas claras llevan ahora un contorno de 1,47:1 contra el papel: es decorativo (el
  hex va escrito al lado) y se ve.
- Motion 13.5.0, publicado el 1-oct: 15 días, cumple.

### 2.6 · El tablero (punto 6)

`herramientas/auditar-tablero.mjs` (envuelve el archivo como el publicador y lo sirve en 127.0.0.1) →
`crudo/auditoria-tablero.json`; `herramientas/tab-recorrido.mjs` → `crudo/tab-recorrido.json`; texto visible a 1440
en `crudo/tablero-texto-1440.txt`.

| Ítem | Medido | |
|---|---|---|
| `<title>` | «Tablero laboratorio E12», 3 palabras | cumple |
| `meta claude:viewport-fit-sides` | `cover` | cumple |
| Gutter con safe-area | `max(16px, env(safe-area-inset-left/right, 0px))` | cumple |
| Tokens en `:root` · fondo en `body` | 10 tokens · `var(--papel)` | cumple |
| Hojas externas | solo Google Fonts (Mona Sans, Google Sans Flex, DM Mono, `display=swap`) | cumple |
| Scripts externos | solo `cdn.jsdelivr.net/npm/motion@13.5.0/dist/motion.js` | cumple |
| Sin doctype / html / head / body | ninguno | cumple |
| Atributos `style` duplicados | 0 (eran 3) | cumple |

| Ancho | `scrollWidth` / `clientWidth` | Salen | h1 | Saltos | img cargadas | Textos | Bajo AA | Más chico | Errores |
|---|---|---|---|---|---|---|---|---|---|
| 360 (táctil, dpr 2) | 360 / 360 | 0 | 1 | 0 | 23 / 23 | 723 | 0 | 11 px | 0 |
| 390 (táctil, dpr 2) | 390 / 390 | 0 | 1 | 0 | 23 / 23 | 723 | 0 | 11 px | 0 |
| 768 | 768 / 768 | 0 | 1 | 0 | 23 / 23 | 723 | 0 | 11 px | 0 |
| 1440 | 1440 / 1440 | 0 | 1 | 0 | 23 / 23 | 730 | 0 | 11 px | 0 |

Landmarks: un `header`, un `nav`, un `main`, un `footer`. **Imágenes:** 22 archivos en `img/` = 22 en el manifiesto;
1.631.266 B en disco = total del manifiesto = lo que dice el lock §18 («1,63 MB, la mayor de 168 kB»: 168.461 B); en el
navegador se transfieren las 22 con los bytes del disco; las 23 `img` (Verifica va dos veces) tienen `width`/`height`
iguales a su tamaño real y `alt`. Miré la nueva, `ap-etiquetas.jpg`, contra su `alt`: lo describe.

| Demo | Medido | |
|---|---|---|
| Cursor con mouse | círculo de 88 px `rgb(0, 41, 255)` «Ver el caso» centrado en el puntero (712, 424); puntero del sistema `none` sobre el medio y `pointer` fuera; salto de 240 px sin pasarse (0 px); al salir, ancho 0 | funciona |
| Cursor con teclado | Tab a la pieza: clase `teclado`, círculo `hidden`, foco `solid 2px rgb(17,17,17)` a 3 px, rótulo quieto; vuelve al mover el mouse | funciona |
| Recorrido de Tab (carga limpia) | 11 paradas en orden (6 del índice, los insumos, la lámina, la pieza, los radios, «Mover»), las 11 con contorno | funciona |
| Resorte | flecha cambia el radio; Enter y Espacio mueven (155 y 143 ms, calculado 139); con mouse 90, 142 y 276 ms (calculados 75, 139, 264) | funciona |
| Movimiento reducido | `sin-circulo`, círculo `display: none`, puntero del sistema, rótulo a la vista; «Mover»: 0 animaciones, el bloque ya en 920 px | funciona |
| Teléfono (390, táctil) | sin círculo; tocar la pieza lleva a `#casos`; controles de 44 px de alto | funciona |
| Gráfico | la cruz aparece y se lee «260 ms · resorte 90 % · Koto 90 % · A&P 56 %»; los mismos números están en la tabla | funciona |

**Texto:** 0 rayas, 0 verbos de folleto, tú en todo el tablero. Palabras visibles: 5.784 (`wc -w` sobre el texto
visible a 1440): la nota repetida salió y entraron las tres filas que pedía el defecto 2. **Lo que dice de Koto y A&P contra la medición:**
coincide salvo una frase (defecto 15) y un cociente (defecto 18).

Capturas: `capturas/tablero-{360,390,768,1440}-primera.jpg`, la página entera en tramos
(`tablero-390-completa-01…09.jpg`, `tablero-1440-completa-01…06.jpg`), las demos (`demo-cursor-mouse-1440.jpg`,
`demo-cursor-teclado-1440.jpg`, `demo-resorte-1440.jpg`) y los cierres y defectos (`fichas-de-color-1440.jpg`,
`registro-cruz-1440.png` y su ampliación `-x6.png`, `tabla-resortes-390.jpg`, `filetes-ap-contradiccion-1440.jpg`).

---

## 3 · Defectos de la vuelta 2

Numeración seguida de la vuelta 1. Los 15, 17 y 18 ya estaban en `d2056ec`: se me pasaron en la vuelta 1, no los
trajeron los arreglos.

| N.º | Severidad | Dueño | Dónde | Qué (reproducible) | Cierre |
|---|---|---|---|---|---|
| 15 | Menor | Lucía | `tablero.html:290` (pie de `img/ap-tabla-filetes.jpg`, §2) y `lock-koto.md:223` (§3, fila «Tabla con filetes de 1 px») | El tablero dice «**El único lugar con filetes de 1 px: una tabla.**» y el lock, «Su único uso de líneas». La medición dice tres usos: las etiquetas bajo cada pieza, la tabla de episodios y el subrayado de sus enlaces (`accept-and-proceed/medicion.json`, `reticula.filetes1px`; resumen: «solo en las etiquetas y en una tabla de episodios»). Re-medido hoy: 28 etiquetas con `1px solid rgba(140, 140, 140, 0.8)` en `/work`. El mismo tablero lo contradice dos veces: el pie «A 390: … cada pieza con nombre y etiquetas» y la fila de etiquetas de §3 («una o dos etiquetas con filete de 1 px»); en la captura, las etiquetas con filete se ven justo encima del pie (`capturas/filetes-ap-contradiccion-1440.jpg`). Incumple el punto 6 del encargo | «Filetes de 1 px: en las etiquetas de cada pieza y en una tabla» (tablero, en `armar-tablero.py:279`) y «su único uso de líneas fuera de las etiquetas» (lock §3). `grep -c "nico lugar con filetes"` da 0 |
| 16 | Menor | Mauro | `brief-de-obra.md` §4 (tabla «Las ideas de Ramón, una por una») | Ramón escribió «Úsalo únicamente para estados activos, **cursores magnéticos** y telemetría de código vivo» (insumos §2, acento). El brief promete «una fila por idea» y no la tiene: `grep -ci "magn" brief-de-obra.md` da 0. El lock §8 ya la decide («Magnetismo: No: el círculo va donde va el puntero»; ninguno de los dos referentes lo tiene) | Una fila (o una frase en «Cursor con texto»): «Cursor magnético · No (lo fija el lock §8)», con su porqué |
| 17 | Menor | Lucía | `tablero.html`, §3 «Tu brief, punto por punto», fila del cobalto | El «Pediste» cita a Ramón sin la palabra: «Cobalto … para estados activos, **cursor** y telemetría viva»; lo que escribió es «cursores magnéticos». Y el tablero no dice en ninguna parte que el magnetismo no va (`grep -ci "magn" tablero.html` da 0). Ramón lee una cita suya recortada y no encuentra la respuesta a lo recortado | Citar «cursores magnéticos» y, en la fila del cursor, el «no» del lock §8 en una línea («el círculo va donde va el puntero: ni Koto ni A&P lo atraen») |
| 18 | Nit | Lucía | `tablero.html:309`, §3 «No tomamos» | «La entrada de 1,5 s de A&P: la de Koto llega al 90 % en **una cuarta parte** de ese tiempo». Datos (`datos/resortes.json` y la tabla del propio tablero): Koto llega al 90 % en 261 ms; A&P, en 850 ms. Es el 31 % (un tercio) contra el 90 % de A&P y el 17 % contra sus 1,5 s; ninguno es un cuarto | «…en menos de un tercio (261 contra 850 ms al 90 %)» |

**Observaciones que no son defecto:** el lock §13 conserva «0 KB de video» en mayúsculas (cero es cero en cualquier
unidad; si se toca, «0 kB»); el lock §18 cuenta «685 nodos de texto» y yo cuento 723 a 730 con otro criterio de qué es
un nodo visible: los dos dan 0 bajo AA; el brief §4 «Planos y registro» todavía dice que registrar la cruz «es el
defecto 4 del acta»: ya está registrada en el lock §19; «publicable: no: es un defecto abierto» lleva dos dos puntos
seguidos, viene así del JSON. Las anclas del índice miden 38 px de alto a 390 (el piso de 44 es del sitio, no de este
tablero).

---

## 4 · Los dos detectores, completos (sobre el tablero)

**`antislop-web.md` §E**

```
COPY            [x] sin verbos de folleto (0)  [x] sin relleno de apertura
                [x] sin tricolon automático  [x] sin "no solo X sino Y" (0)
                [x] sin pregunta retórica ni "¿Listo para…?"  (las 5 preguntas de §6 son decisiones reales)
                [x] sin Title Case  [x] registro es-CL consistente: tú en todo el tablero
                [x] sin raya como remate (0)  [x] cero prueba social sin respaldo
                [x] borrar 30 % no mejora la página: la nota repetida salió; lo que entró son respuestas a ideas de Ramón
ESTRUCTURA      [x] sin tres tarjetas idénticas (no hay tarjetas; la placa del resorte agrupa un control)
                [x] sin "¿por qué elegirnos?"  [-] FAQ: no aplica, no hay
                [x] sin fila de métricas inventadas  [-] formulario: no aplica
                [x] hero no es 100vh centrado vacío  [x] orden: pediste → medido → tomamos → tokens → casos → decides
CÓDIGO          [x] landmarks + un h1 + jerarquía sin saltos (0 saltos en los cuatro anchos)
                [x] cero valores por defecto sin justificar: radios 6/4/2 y tiempos salen de Koto (lock §17, §9)
                [x] sin degradé-mancha ni glass  [x] cero emoji (↗ es un carácter)
                [x] alt reales (la imagen nueva, mirada)  [x] foco visible (11 de 11), contraste AA (0 bajo), labels en los radios
                [x] imágenes dimensionadas (23/23); [-] hero eager: no hay imagen en el primer viewport; [x] font-display swap
                [-] JSON-LD + canonical + OG: no aplica, es un tablero privado de trabajo, no una página del sitio
                [-] índice y sitemap, ?v=N: no aplica, nada se publica
VISUAL          [x] detector de refero-design corrido entero (abajo)
PRUEBAS         [x] logo tapado  [x] rubro cambiado  [x] leído en voz alta (§5)
```

**`anti-ai-slop.md` (refero)**

```
[x] Acento no índigo: cobalto 264,2° OKLCH, a 13° de indigo-500 y con 50 % más croma
[x] Tarjetas solo con interacción: la única caja (placa del resorte) contiene un control
[x] Sin franja lateral de acento  [x] Sin emoji
[x] Claro: lo pide el brief de Ramón («Light Mode Editorial»)
[x] Sin serif editorial  [x] Sin paleta terrosa: papel con croma OKLCH 0,003
[x] Sin palabra destacada decorativa: las dos tintas son regla medida de Koto con rol escrito (lock §14)
[x] Rasgos fuertes preservados: el paso de negro a claro está justificado por escrito (lock §1) y el cobalto no se apaga
[x] Roles de token preservados: el cobalto conserva el rol que le dio Ramón (estado activo, cursor, dato vivo)
[x] Rol de los medios: capturas reales de Koto, A&P, Verifica y Combeau, sin imágenes generadas
[x] Mayúsculas con interletra: rótulos mono +0,03em
[x] Captura junto a productos reales  [x] letras elegidas con medición  [x] colores del brief y de lo medido
[x] Tensión: barra de 320 px a la izquierda, contenido corrido; la retícula de Koto
[x] Cada decisión tiene su porqué en el lock
```

Pruebas de refero: tarjeta (pasa), imagen (no aplica: el primer viewport es texto, a propósito), marca (pasa), copy
(pasa ahora: la nota repetida salió), identidad (pasa), editorial (pasa).

## 5 · Las tres pruebas de fuego

- **Logo tapado:** pasa. Lo que identifica la página son mediciones y piezas propias que no pueden ser de otro estudio.
- **Rubro cambiado:** pasa. Con otro rubro no queda nada: todo es la obra E12 de SpindleLab.
- **Leído en voz alta:** pasa. «Koto manda y tu brief orienta. Aquí está lo medido, lo que se toma, lo que no y por
  qué» suena a alguien que le explica algo a Ramón en una reunión.

## 6 · Lo que está bien y no se toca

- **Los arreglos son de verdad, no de forma:** la cruz cambió de color y su texto ahora dice lo que hay; la tabla se
  lee a 390; la hora sin JS no miente; el build citado es el que sirve la vista previa, byte a byte.
- **El defecto 13 se cerró midiendo**, no reescribiendo: una herramienta nueva, un crudo con sha256 y, de paso, un
  error que nadie había visto (cinco posters, no cuatro) corregido con su propia medición.
- **La fila de etiquetas del lock §4 y §7** es el ejemplo de cómo contrastar una idea con lo medido: toma la medida
  de A&P (una o dos por pieza) y deja la forma con cuatro razones que se pueden comprobar.
- **La atmósfera medida** (`atmosfera.mjs`) convierte «sin gradientes púrpura» en un número; re-medido, cuadra.
- Todo lo de la vuelta 1 que estaba bien sigue igual: contrato, cuatro anchos sin desborde, 0 nodos bajo AA, foco en
  las 11 paradas, el cursor que se esconde con teclado y no existe con movimiento reducido ni en el teléfono.

## 7 · Lo que no medí

- No repetí la medición completa de Koto y A&P: 18 filas, las del encargo y las que el lock agregó hoy.
- No re-medí las etiquetas de A&P a 390 (24 px de alto según `medicion.json`) ni la carga y el peso de
  `medir-carga.mjs`.
- No repetí `letras.py`; verifiqué la licencia de las tres letras.
- No corrí lectores de pantalla.

## 8 · Archivos de esta vuelta

`e12/qa-paso-1/vuelta-2/`

- `herramientas/`: `remedir-referentes.mjs`, `remedir-koto-marco.mjs`, `repetir-chequeo.sh`, `verificar-servido.mjs`,
  `contraste-qa.py`, `auditar-tablero.mjs`, `tab-recorrido.mjs`.
- `crudo/`: `referentes-remedidos.json`, `koto-marco-remedido.json`, `chequeo-bernardocombeau.cl.json` y
  `chequeo-spindlelab.cl.json` (con cabeceras), `verificar-servido.json` (sin HTML de Combeau), `licencias-urls.txt`,
  `contraste-qa.json`, `auditoria-tablero.json`, `tab-recorrido.json`, `tablero-texto-1440.txt`.
- `capturas/`: Koto y A&P re-medidos; el tablero a 360, 390, 768 y 1440 y entero a 390 y 1440; las demos; los
  recortes de los cierres (3, 4, 8) y del defecto 15.
