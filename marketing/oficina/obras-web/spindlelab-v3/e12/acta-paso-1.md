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
