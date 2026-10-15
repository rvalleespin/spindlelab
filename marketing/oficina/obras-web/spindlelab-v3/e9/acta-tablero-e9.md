# Acta de QA · SpindleLab v3 · E9, tablero de la compuerta (Tanda A)

## Ronda 2 · 14-oct-2026, 21:15 (Chile)

**Javiera (`/web-qa-critico`), en contexto limpio.** No escuché a Mauro, a Bruno ni a Lucía en esta
ronda tampoco: no leí sus mensajes, solo sus archivos, y todas las cifras de abajo son mediciones mías
de hoy, con scripts nuevos (no reutilicé los resultados de la ronda 1, solo su método). Leí entero el
plan aprobado (`dazzling-snacking-river.md`), `e9/brief-e9.md`, `tablero.html`, el `git diff` de la
ronda 2, `e9/piezas/manifiesto.json`, el `registro.json` y el crudo, el §07b del manual y los dos
detectores.

**Auditado:** rama `claude/magical-franklin-ckfki2`. Empecé sobre `c254fd0` (no `72045f8`: encima
están `69b190c` y `c254fd0`, las dos de la Tanda A) con la ronda 2 sin commitear en el árbol de trabajo:
25 archivos, todos dentro de `tableros/e9-interiores/` (`tablero.html`, md5 `81a36f8c…`, escrito a las
20:53; `armar-protos.py`; los dos prototipos de D2; `recortes/trabajo-despues.html`; `proto/e9/e9.css`;
las 16 tiras de D2, las 2 de Trabajo y `medidas.json`). Mientras medía, el orquestador los commiteó en
`67f785e` (21:17) junto con el acta de la ronda 1. Comprobé que es lo mismo que medí: `c254fd0..67f785e`
son esos 25 archivos más el acta, el md5 de `tablero.html` no cambió, y ningún archivo del tablero, de
`e9/piezas/` ni el brief es más nuevo que mi build de las 20:56. `e9/piezas/` y `e9/brief-e9.md` no
cambiaron desde `69b190c`.
`git diff 72045f8 -- spindlelab-astro/src spindlelab-astro/public`: vacío. Corrí `npm run build`
(27 páginas) para comparar contra `dist/v3`.

### Veredicto: **Aprobado**

Los tres mayores de la ronda 1 están cerrados y los verifiqué midiendo, no leyendo el tablero: la tira
de columnas está ahora en las dos direcciones y el tablero dice qué secciones siguen en filas (1), la
recomendación usa las cifras medidas y la razón de los 3 px (2), y la nota de Trabajo declara palabra por
palabra lo que sale, con «de 100» pegado al 36 (3). Sigue sin haber un solo bloqueante: todo texto de
cada pieza está en su crudo, los cinco status y los tres puntajes los volví a pedir a las 20:58 y dan lo
mismo, cero oro nuevo, cero prospectos, cero `assets/img/d/`, cero display, el copy de las dos páginas
es el de `dist/v3` salvo etiquetas y rótulos, y el tablero cumple el contrato de Artifact a 390 y a 1440.

**Quedan 14 menores** (9 de la ronda 1 que eran para antes de la Tanda B, y 5 nuevos). Ninguno impide
mostrarle el tablero a Ramón: se puede publicar el Artifact. Tres son baratos y conviene cerrarlos antes
de publicar porque tocan cómo decide Ramón: **16** (la pregunta de alcance que el tablero deja fuera de
la línea de respuesta), **13** (la fecha de cada lectura no se lee en el teléfono) y **14** (el párrafo
repetido). El resto se cierra antes de la Tanda B.

### Cómo lo verifiqué

- Servidores locales: `proto/` en 8775, `spindlelab-astro/dist` en 8776, la carpeta del tablero en 8777
  (tal cual, sin charset) y en 8780 (con `text/html; charset=utf-8`, como lo sirve el Artifact),
  `e9/piezas/` en 8778 y una copia aislada del generador de Bruno en 8779.
- Chromium de Playwright (`/opt/pw-browsers/chromium-1194`), desplazamiento previo para asentar
  `[data-reveal]`, `<details>` abiertos y `loading=lazy` forzado a `eager` donde mido imágenes.
- Archivos de trabajo, que no se commitean:
  `/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/javiera-e9-r2/`.
  Scripts: `literal.mjs` y `literal-var.mjs` (cada nodo de texto de cada pieza contra su crudo),
  `regen/` (el generador de Bruno corrido en una copia, para las variantes de campo), `oro.py` (§07b,
  con controles), `protos.mjs` (prototipo contra `dist`: texto, cadencia, display, filas, carrusel,
  bandas, desborde), `trabajo.mjs` (texto y enlaces de Trabajo de 1024 a 1920), `legible.mjs` (tamaño
  efectivo del texto de cada pieza), `raigal.mjs`, `tablero.mjs` y `tablero-utf8.mjs` (contrato del
  Artifact, hosts, imágenes, foco, contraste), `tiras.py` y `tiras390.py` (tiras del tablero contra mis
  renders), `alto.mjs`, `peso.mjs`, `texto-tab.mjs` y `palabras.mjs` (antislop sobre el copy).
  Resultados en `literal.json`, `oro-piezas.json`, `oro-tiras.json`, `protos.json`, `tablero.json`,
  `tablero-utf8.json`.

**Capturas mías** (`capturas/` de esa carpeta): `tablero-utf8-390.jpg` y `tablero-utf8-1440.jpg` (página
entera, como la verá Ramón) y `tablero-390.jpg` / `tablero-1440.jpg` (servido sin charset, defecto 9);
`tab-{390,1440}-{cabecera,d2-cambia,reco,trabajo}.png` (las partes que cambiaron, a tamaño real);
`d1-pantallas_*-{1440,390}.jpg` y `d2-lectura_*-{1440,390}.jpg` (las cuatro páginas prototipo);
`dist_v3_*-1440.jpg` (el antes); `recortes_*-{1440,390}.jpg`; `raigal-390-d1-pantallas.png` y
`raigal-390-d2-lectura.png`; `trabajo390-oro-recorte.png`.

### Los tres mayores de la ronda 1

| # | Qué se pidió | Qué medí | Estado |
|---|---|---|---|
| 1 | La tira en D2, o decirlo; y decir qué sigue en filas | En D2, «Así se ve un mes tipo» es tira de 4 columnas y «Cinco fases» de 5 (`section.e9-tira`, 4 y 5 `li` en x distintos a 1440), igual que en D1. Secciones que siguen en filas: Acompañamiento 4 de 5 en **las dos**; Desarrollo web 4 de 5 sin contar la obra en **las dos**. El tablero lo dice en las dos direcciones, con las mismas cuatro secciones que medí. Tiras de D2 re-rendidas: contra mis renders, diferencia media 1,4 a 1,7 sobre 255 a 1440; a 390, 1,4 a 7 tras alinear | **Cerrado** |
| 2 | Cifra medida en la recomendación y la razón de los 3 px | «2 de las 6 piezas en Acompañamiento (el 49 % y el 34 %) y 2 de las 7 en Desarrollo web (el 7 % y el 5 %)»: medí 0,49 y 0,34 (`n2-jsonld-petroleo`, `l2`) y 0,07 y 0,05 (`p2`, `n2-jsonld-brasa`). La cabecera de D1 a 390 muestra `n1-robots-petroleo.jpg` a 350 px: la letra del notebook queda en unos 3 a 4 px de alto | **Cerrado** |
| 3 | Declarar lo que sale del párrafo de Trabajo y no perder la escala | Diff palabra por palabra contra `dist/v3/trabajo/` a 1440: salen «sacó» ×2, «el» ×2, «El», «y», 4 comas y 2 puntos finales; entra «en el chequeo de la Ley 21.719»; el 100 pasa delante de «14 de octubre»; las notas van detrás. Es exactamente lo que declara el tablero. «36 de 100» visible, «de 100» en 15 px gris. Enlaces de las dos fichas: hoy Verifica cae 148, 175, 185 y 185 px (1024, 1280, 1440, 1920); con el cambio, 0 en los cuatro | **Cerrado** (ver 14 por «dos puntos») |

### 1 · Cada pieza contra su crudo

Rendí cada `e9/piezas/html/*.html` y comparé cada nodo de texto visible contra los archivos que declara
el manifiesto (`literal.mjs`). Las variantes de campo del tablero (`l1 … --petroleo`, `l4 … --brasa`) las
regeneré con el generador de Bruno en una copia aislada (`--sin-captura --solo=l1,l4
--campo=l1:petroleo,l4:brasa`): los dos JPEG salen **idénticos byte a byte** a los de
`piezas-tablero/` (md5 `ca9b00dd…` y `cba374ca…`) y su texto pasa el mismo control.

| Pieza | Nodos | Resultado | Dominio, fecha, status (pedidos por mí a las 20:58) |
|---|---|---|---|
| `l1-robots-spindlelab` y variante petróleo | 11 y 11 | 9 literales en `robots.txt` + 2 glifos «·» | `robots.txt` de hoy: 200, sha256 `9413cbdd…`, **igual** al crudo |
| `l2-respuesta-robots-spindlelab` | 15 | 12 literales en `registro.json`, «GET /» derivado con su fórmula, 2 glifos | Pedí la portada con los cinco user-agent del registro: **200 · 200 · 200 · 200 · 200** |
| `l3-jsonld-spindlelab` | 52 | 52 literales | Ver defecto 15 |
| `l4-21-chequeos` y variante brasa | 53 y 53 | 53 literales; 21 filas, 7+7+8+2+6 = 30, 6+8+5+6+5+4+4+2 = 40, 4+6+4+2+2+5+4+3 = 30 | `spindlelab.cl/api/chequeo?dominio=spindlelab.cl` responde hoy (puntaje 85) |
| `v1-ley-36-73-100` (reserva) | 14 | 12 literales en `obra-v3.verifica-y-cumple.json` y el registro, 2 flechas | `verifica.spindlelab.cl/api/chequeo?dominio=spindlelab.cl`: **100**. El 36 y el 73 están en `ventas/casos-de-exito/verifica-y-cumple.md@1a0ae0a` |
| `k1-67-de-69` | 11 | 8 literales; 67 de 69, 37 de 38 y 30 de 31 derivados: 37 + 30 = 67, 38 + 31 = 69. El extracto coincide con las líneas 1, 14, 16, 17, 20, 22, 80, 81, 84 y 86 de `corridas-chequeo-2026-08-31.md`; la 78 va recortada porque nombra un dominio | Sin dominio, por regla; dato del 31-ago |
| `k2-chequeo-ia-85-54` | captura | texto en `chq-score-*.txt` | Pedí los dos puntajes: **85** y **54** |
| `k1`, `k2`, `k3` `-tablero` | 1 cada una | «Espera tu OK», que el manifiesto declara como texto del tablero y no de la pieza | |
| `n1` robots en el navegador | captura | Lo abrí con Read: es el `robots.txt` entero, en el orden del archivo | |
| `n2` JSON-LD en el navegador | captura | `pantallas/jsonld-portada-bloque-1.json` es **igual** a `bloques[0]` del crudo una vez parseado (el crudo lo guarda como texto) | |

Abrí con Read las piezas `l1`, `l2`, `l3`, `l4`, `v1`, `k1-tablero`, `k2-tablero`, `k3-tablero`, `p1` y
`p2`: lo que se ve coincide con lo extraído, cada lectura lleva su pie «dominio · qué es · 2026-10-14» y
las pantallas solo agregan la hora del teléfono (19:29 y 19:30, igual al registro).
`verifica.spindlelab.cl/robots.txt`, `llms.txt` y `sitemap.xml`: 200 con `text/html`, como dice el tablero.

### 2 · Reglas duras

| Regla | Medición | Resultado |
|---|---|---|
| Cero datos inventados | Sección 1: ningún nodo fuera del crudo salvo glifos y derivados con fórmula | ✅ |
| Cero prospectos | Los 69 dominios de `corridas-chequeo-2026-08-31-*.jsonl` con `grep -rlFf` sobre `e9/` y `tableros/e9-interiores/`: 0 archivos. Sus 66 nombres sin dominio (≥ 5 letras, palabra entera, sin distinguir mayúsculas) sobre brief, piezas, crudo, tablero y prototipos: 0 | ✅ |
| Ningún oro en piezas | `oro.py` con el criterio §07b (tono 38–54°, S y V ≥ 0,5); control: `#C9A227` da 100 %, brasa, petróleo, navy, ciruela y el lima de Verifica dan 0 %. 61 archivos (salida, piezas del tablero, `proto/assets/img`): todas las piezas nuevas bajo 0,05 % (máximo 0,0234 %, antialias). Sobre el umbral solo `mock-combeau-modelo-alto-2.jpg` (0,0594 %) y su `-800` (0,0551 %), que ya están en el sitio y el tablero declara (defecto 8). `grep -ril c9a227` en piezas y tablero: solo en el CSS del sitio copiado a `proto/_astro/` (el punto del wordmark) | ✅ |
| Un oro por vista | Componentes de oro ≥ 12 px en las 50 tiras: el punto del wordmark (una vez, en la primera tira a 390), restos de 12 px en el mockup de Combeau modelo y, en las de Trabajo, el teléfono de Combeau modelo; los dos ya están publicados | ✅ en lo nuevo |
| Monitoreo de menciones y cadencia | Piezas (HTML, `texto_en_pieza`, etiquetas): 0 de `quincen|cada mes|mes a mes|al mes`. «menciones» solo en K2, dentro del veredicto literal, y el tablero lo declara (defecto 6). Prototipos contra `dist`, mismo corte de texto visible: Acompañamiento **15 y 15** (D1 y D2, a 1440 y a 390), Diagnóstico 1 y 1, Desarrollo web 0 y 0, Trabajo 0 y 0. «menciones» 2 y 2, 1 y 1. Copy del tablero y sus 50 alt: 0 de cadencia | ✅ no aumenta |
| Raigal con rótulo primero | En D1 y D2, a 390 y a 1440: el `figcaption` lleva primero «Pieza de concepto · no es un cliente» (12 px, negro sobre papel) a 10 px del borde de la pieza, y después «Raigal · Implantología» | ✅ |
| 36 → 73 → 100 solo en Trabajo | Texto visible: el 36 aparece solo en `recortes/trabajo-despues` (1 vez, igual que `dist/v3/trabajo/`), 0 en las cuatro páginas, Diagnóstico y los tres «Espera tu OK». `v1` no se usa en ningún prototipo. `dist/v3/trabajo/` sin `chq-*`. En el tablero, Trabajo y Diagnóstico son recortes de páginas distintas, rotulados | ✅ |
| Tres pruebas nuevas marcadas | 3 `span.marca` «Espera tu OK», 13 apariciones en `tablero.html`, el sello en las tres piezas `-tablero` y el contorno punteado (`.e9-ok`) en los tres recortes | ✅ |
| Sin generación pagada | Ni el generador ni las herramientas de Lucía llaman a Higgsfield ni a Unsplash | ✅ |
| No se toca el sitio | `src/` y `public/` sin cambios contra `72045f8` | ✅ |

### 3 · Las dos direcciones

**Mediciones** (`protos.json`, `legible.mjs`, `alto.mjs`):

| | D1 Pantallas | D2 Lectura de máquina |
|---|---|---|
| Fotos `assets/img/d/` | 0 en las dos páginas, a 1440 y 390 | 0 |
| Display (≥ 700 en mayúsculas, o ≥ 800) en `main` | 0 nodos | 0 nodos |
| h1 | 60 px, 500, sin mayúsculas | 60 px, 500, sin mayúsculas, dentro de la banda |
| Texto contra `dist/v3` (1440) | Acompañamiento: 2 etiquetas nuevas y los rótulos Plazo, Resultado y Condición. Desarrollo web: etiquetas reordenadas y la del JSON-LD | Acompañamiento: los 3 rótulos y la etiqueta del retrato movida. Desarrollo web: **0 diferencias** |
| Piezas | 6 y 7 (hoy 3 y 6, dos `d/` en cada una) | 4 y 6 |
| Altos (1440 / 390) | 8.539 / 8.979 y 8.951 / 9.107 | 8.298 / 9.162 y 8.838 / 9.056 |
| Bandas de campo a 1440 | ninguna | cabecera 589 px (petróleo) y 628 px (brasa); compromiso 320 px |
| Secciones que siguen en filas | Acompañamiento 4 de 5; Desarrollo web 4 de 5 sin la obra | **igual** |
| A 390 | 2 de 6 y 2 de 7 piezas empiezan fuera de pantalla; cabecera con letra de 3 a 4 px | todo apilado a 350 px; filas de `l2` y `l3` a 17–20 px |
| Fecha de cada lectura a 390 | 5 a 6,4 px dentro de `l1`, `l2` y `l4` (los montajes `n1` y `n2` la llevan en `figcaption`, legible) | **7,4 px** dentro de `l1`, `l2` y `l3`; 5 px en `l4` (defecto 13) |
| `verificar.mjs --base` sobre los 5 prototipos, 390 y 1440 | Sin hallazgos de contraste, desborde, h1, JSON-LD ni alt. Solo el comentario de prototipo del armador y los enlaces a `/v3/…`, 404 porque ese servidor solo tiene `proto/` | igual |
| Desborde | `scrollWidth` 390 y 1440 | igual |

Los altos a 390 del tablero los reproduzco exactos con una ventana de 390 × 844. Con 900 de alto, D1 y
`dist` salen 13 px más largos porque la cabecera del sitio depende del alto de la ventana; la banda de
D2 no. No es un defecto.

**Mi lectura.** Siguen siendo dos direcciones y no un promedio: D1 toma los casos de driftime (negro,
galería entre cada par de secciones) y D2 toma los campos de la home (color de margen a margen en la
cabecera y en el compromiso). Desde esta ronda comparten la tira, y eso es lo correcto: lo que no depende
de la dirección ya no inclina la comparación. Ahora se diferencian en lo que de verdad es dirección:
la cabecera, la densidad de piezas y dónde vive el color.

Contra lo que marcó Ramón: **(2) las fotos** quedan resueltas en las dos, con material real y fechado.
**(3) la prueba** queda resuelta en grande a 1440 en las dos (compromiso a 20 px con rótulos, Trabajo a
44 px, la metodología a 60 px), pero en el teléfono la fecha de cada lectura se lee a 5–7 px, que es justo
lo que hace prueba a una pieza (defecto 13). **(1) las filas** quedan resueltas igual de a medias en las
dos: una sección de cinco pasa a columnas y cuatro siguen en filas. El tablero ahora lo dice con todas
sus letras y lo llama decisión de alcance, lo que es honesto; lo que falta es que esa decisión esté en
la línea de respuesta (defecto 16), porque es la primera de las tres cosas que marcó Ramón y la que más
probablemente vuelva como «no me convence» si no se le pregunta.

Las medidas siguen favoreciendo a D2 en el teléfono por lo mismo que dice ahora la recomendación: lo
principal de cada lectura se lee a 17–20 px, mientras la cabecera de D1 queda en 3 a 4 px. A 1440, D1
tiene más ritmo de revista y D2 más color; las dos son legibles. La elección es de Ramón.

### 4 · El tablero como Artifact

| Comprobación | Resultado |
|---|---|
| Sin `<!doctype>`, `<html>`, `<head>` ni `<body>` | ✅ 0 coincidencias |
| `<title>` | «Tablero interiores E9», 3 palabras ✅ |
| `meta claude:viewport-fit-sides` y los dos `max()` de gutter | ✅ `content="cover"`; `.tab` con `padding-left` y `padding-right` en `max(16px, env(safe-area-inset-*, 0px))` |
| Tokens en `:root`, `color-scheme: dark`, `body` con fondo | ✅ (`color-scheme` computado `dark`, `body` `rgb(17,17,17)`), salvo `#262626` suelto en la línea 49 (defecto 10) |
| Hojas externas y hosts | Solo `@import` de `fonts.googleapis.com`. Hosts pedidos al rendir, a 390 y 1440: el propio, `fonts.googleapis.com` y `fonts.gstatic.com` ✅ |
| 390 | `scrollWidth` 390 = `clientWidth` 390, 0 elementos pasan del borde, con todos los `<details>` abiertos ✅ |
| 1440 | `scrollWidth` 1440 ✅ |
| Imágenes | 50 referencias relativas, las 50 existen, 0 respuestas 4xx, 0 rotas; `width` y `height` iguales a las del archivo en las 50; la mayor 0,29 MB (`d2-desarrollo-web-1440-t2.jpg`), total **9,98 MB** ✅ |
| Foco | Tab recorre 11 paradas (índice y `summary`), contorno de 2 px papel en todas ✅ |
| Contraste | Mínimo 7,5:1 (gris de 14 px sobre el módulo) ✅ |
| Codificación | Sin `<meta charset>`: servido por `http.server` sale en windows-1252 («DirecciÃ³n 1»); con `charset=utf-8` en la respuesta, bien (defecto 9) |
| Encabezados | Un h1; sigue el salto h2 → h4 en las notas de cada dirección (defecto 10) |

### 5 · Antislop

**Checklist de cierre (`antislop-web.md` §E), sobre el copy del tablero (texto visible con los
`<details>` abiertos, más los 50 alt):**

- **Copy.** Verbos de folleto: 0. Relleno de apertura: no; la primera línea dice qué se elige. Tricolon
  automático: no; las series son cosas reales (las tres pruebas, los tres casos). «No solo X sino Y»: 0.
  Preguntas: una, «¿Te pueden citar?», que es el nombre del bloque del chequeo. Title Case: no. Registro:
  tú con Ramón, primera persona de Lucía, sin «usted» ni españolismos. Rayas: 0. Prueba social sin
  respaldo: 0. Emoji: 0. **Borrar 30 %: falla, con su porqué en el defecto 14**: el tablero pasó de 1.939
  a 2.303 palabras plegado (de 2.382 a 2.784 abierto, +17 %), y parte del aumento es el mismo párrafo
  de unas 85 palabras escrito dos veces y la tira explicada cuatro veces.
- **Estructura.** Sin tarjetas iguales, sin «por qué elegirnos», sin métricas inventadas, sin
  formulario. El orden responde a la decisión (qué se elige, las dos opciones, la recomendación, la
  prueba, lo que espera el OK, las fuentes).
- **Código.** `main`, `header`, `nav` y `section` reales, un h1; salto h2 → h4 (defecto 10). Radio 6 px,
  el de la marca. Sin vidrio, sin degradé, sin sombras. Un hex suelto (defecto 10). Manrope 800 se carga
  y lo usan sin querer los `<b>` de «Las piezas» (defecto 10). Alt: abrí con Read las tiras de D2 a
  1440 (Acompañamiento t1 a t3, Desarrollo web t1 a t3), la t1 de Desarrollo web a 390 y las de Trabajo,
  y sus alt describen lo que se ve, incluidos los tres que ahora nombran las columnas; los de los tramos
  a 390 siguen siendo genéricos («segundo tramo») pero no falsos. Foco visible, contraste AA, imágenes dimensionadas. JSON-LD,
  canonical, OG, índice, sitemap y `?v=N`: no aplican a un Artifact privado.
- **Visual (`refero-design`, checklist entero).** Sin índigo propio (el azul es el de Verifica, dentro de
  sus capturas). Tarjetas: `.responde` y `.reco` son dos llamados, no un sistema. Sin franja lateral. Sin
  emoji. Oscuro por brief (driftime). Sin serif ni tierra. Tell 7: no hay promedio, y compartir la tira
  no lo crea porque no es un rasgo de ninguna de las dos referencias. Tell 8: el color de campo conserva
  su papel (el del servicio). Tell 9: el papel de la imagen se conserva con material real. Mayúsculas:
  ninguna en el tablero; las de Verifica están dentro de sus capturas.

**Pruebas de fuego** (sobre las direcciones):
- **Logo tapado.** D2 pasa a 1440 y a 390: banda del campo y, debajo, lecturas del propio dominio. D1
  pasa a 1440 y **falla a 390**: la cabecera es un notebook con letra de 3 a 4 px.
- **Rubro cambiado.** Las lecturas de máquina solo calzan con este negocio. La galería de obra de
  Desarrollo web calzaría con cualquier estudio, pero es obra propia, real y rotulada.
- **Leído en voz alta.** El tablero suena a una persona explicando una decisión. La nota nueva de
  Trabajo («salen "sacó" (dos veces), "el" (dos veces)…») es un inventario de auditor y se lee pesada,
  pero va en gris chico y es la declaración que pedí.

### Defectos vivos

Mantengo la numeración de la ronda 1. Del 1 al 3, cerrados (arriba). Del 4 al 12, abiertos, con su
estado de hoy. Del 13 al 17, nuevos.

4. **Menor · Bruno · «ClaudeBot/1.0» sin fuente archivada.** Sin cambios: `ua-anthropic.txt` sigue
   trayendo solo «User-agent: ClaudeBot», y la cadena con versión está en el registro solo porque es la
   que mandamos. **Cierre:** el de la ronda 1 (archivar la cadena completa o dejar «ClaudeBot» sin
   versión y volver a rendir `l2`), antes de la Tanda B.
5. **Menor · Bruno · K2 trae dos «Pedir el diagnóstico» dentro de la imagen.** Sin cambios. **Cierre:** si
   Ramón la autoriza, recortar al puntaje, el dominio y el veredicto.
6. **Menor · Mauro · el criterio de «menciones» choca con K2.** El brief no cambió. **Cierre:** una línea
   en el brief §6 (excepción para el texto literal del instrumento, o recorte del veredicto).
7. **Menor · Mauro · 49 contra 51 para la misma invariante de cadencia.** El brief no cambió. **Cierre:**
   decir qué corte da 49.
8. **Menor · Mauro · el criterio de oro del brief solo mide `public/assets/img/e9/`.** Re-medido hoy:
   `mock-combeau-modelo-alto-2.jpg` 0,0594 % y su `-800` 0,0551 %. **Cierre:** que mida toda imagen de
   cada vista.
9. **Menor · Lucía · el tablero no declara su codificación.** Medido hoy: sin `charset` en la respuesta,
   Chromium lo lee en windows-1252. El Artifact lo envuelve con su esqueleto; el paquete local no.
   **Cierre:** `<meta charset="utf-8">` como primera línea.
10. **Menor · Lucía · higiene del marcado y el CSS.** Siguen el salto h2 → h4 en «Referencia dominante»,
    «Rasgo que toma» y «Qué sacrifica», y `#262626` fuera de los tokens. **Corrijo la ronda 1:** Manrope
    800 sí se usa, sin querer: los 10 `<b>` de «Las piezas, con su fuente y su fecha» no tienen regla de
    peso, quedan en 700 y el navegador los sirve con el 800 cargado (medido: `fontWeight` 700, caras
    cargadas 400, 500, 600 y 800). **Cierre:** `.piezas li b { font-weight: 600; }`, y recién entonces
    quitar 800 de la URL; h3 o `p` en las notas; el hover a un token.
11. **Menor · Lucía · el compromiso partido a mitad de frase.** Sin cambios: «Plazo» termina en coma y
    «Resultado» parte en minúscula. **Cierre:** el de la ronda 1.
12. **Menor · Lucía · la dirección elegida no se ve en las internas sin campo.** Sin cambios: D2 no dice
    qué cabecera llevan Método, Diagnóstico, Nosotros, Trabajo, Contacto, el blog y los artículos.
    **Cierre:** una línea por dirección.
13. **Menor · Lucía · «todas legibles» y «se lee entera» no valen para la fecha en el teléfono.** A 390,
    el pie «dominio · qué es · fecha» de cada lectura mide 7,4 px en D2 (`l1` petróleo, `l2`, `l3`) y
    5,5 a 6,4 px en el carrusel de D1; en `l4` todo baja a 5 px (eso sí está declarado). La fecha es lo
    que convierte una lectura en prueba, y en ninguna de las dos direcciones se lee en el teléfono. La
    recomendación dice «con menos piezas y todas legibles» y «la respuesta a cada robot se lee entera».
    No inclina la elección (pasa en las dos), por eso es menor. **Cierre:** «legibles a 1440» en vez de
    «todas legibles», y una línea en la recomendación: a 390 la fecha va además como leyenda de texto
    junto a la pieza (lo que el plan ya prevé para `Pieza.astro` en la Tanda B). Lo compruebo con
    `legible.mjs` y un grep.
14. **Menor · Lucía · el tablero creció repitiendo.** De 1.939 a 2.303 palabras plegado (+19 %). El
    párrafo «Siguen como hoy, en filas…» va dos veces palabra por palabra (D1 y D2), y la tira se explica
    en cuatro lugares (las dos guías y las dos listas de decisiones). Además, en la nota de Trabajo,
    «cuatro comas y dos puntos» se lee como el signo «:»; lo medido son dos puntos finales. **Cierre:** un
    bloque corto «Vale para las dos» antes de las direcciones, con la tira y lo que sigue en filas; en
    cada dirección solo lo que difiere; y «dos puntos finales». Lo compruebo con `palabras.mjs`.
15. **Menor · Mauro · la lectura del JSON-LD es la de la portada publicada hoy, no la de la v3.** `l3`
    muestra un nodo `FAQPage`; la portada v3 no lo tiene (`dist/v3/index.html`: ProfessionalService,
    WebSite, Person y WebPage), y el mismo tablero dice en el «En contra» del 67 de 69 que la home v3
    falla esa señal. Si `l3` sale con la v3, quien la compruebe no encuentra lo que la pieza muestra. El
    `robots.txt` de la v3 es igual al de hoy (mismo sha256), así que `l1` no tiene el problema. **Cierre:**
    criterio nuevo en el brief §6 para la Tanda B: toda lectura de `spindlelab.cl` se recaptura contra lo
    que va a quedar publicado (la vista previa v3, o el día de la publicación) y lleva esa fecha; si no
    se recaptura, `l3` no se publica.
16. **Menor · Mauro · la compuerta no pregunta lo que el tablero llama «decisión de alcance aparte».** Las
    dos direcciones dejan 4 de 5 secciones en filas y el tablero lo dice, en gris de 14 px, pero el brief
    §8 («Lo que decides en la compuerta») y el recuadro «Para responder basta una línea» solo piden
    dirección y las tres pruebas. Las filas son lo primero que marcó Ramón: si responde solo «Dirección
    2», vuelven en la Tanda B como «no me convence», que es lo que este circuito existe para evitar.
    **Cierre:** un punto 4 en el brief §8 («¿Lo que incluye, los planes, las preguntas y el cierre también
    cambian de forma? sí o no; si sí, es otra obra») y Lucía lo suma a la línea de respuesta. Conviene
    antes de publicar el Artifact. Lo compruebo con un grep del tablero y del brief.
17. **Menor · Mauro · la tira no está en el «Cambia» del brief §2.** El §2 lista cabecera, galerías,
    color del campo, bloque de prueba y etiquetas; la tira de columnas (mes tipo y fases) va en las dos
    direcciones y no figura. **Cierre:** sumarla al §2 cuando Ramón decida, para que la QA de la Tanda B
    no la lea como desvío.

### Lo que está bien (que la Tanda B no lo rompa)

- **Los tres mayores se cerraron como se pidió y sin romper nada:** las tiras de D1 no cambiaron, las de
  D2 coinciden con mis renders, y el texto de las dos páginas sigue siendo el de `dist/v3`.
- **La recomendación ahora se sostiene en medidas que reproduje:** 2 de 6 (49 % y 34 %), 2 de 7 (7 % y
  5 %), la cabecera de D1 a 3 o 4 px, y la respuesta a cada robot de D2 a 17–20 px.
- **La declaración de Trabajo es exacta**, palabra por palabra, y «de 100» conserva la escala.
- **Las piezas siguen siendo el estándar del plan:** crudo con sha256, hora y status; derivados con
  fórmula; las variantes de campo se regeneran idénticas byte a byte; los datos de hoy a las 20:58
  repiten los de las 19:29.
- **Las restricciones, sin excepción:** cero `assets/img/d/`, cero display, cero oro nuevo, cero
  prospectos, el 36 → 73 → 100 solo en Trabajo, Raigal con su rótulo primero, cadencia igual a `dist`.
- **El tablero es honesto con lo que no resuelve:** dice qué sigue en filas, qué no se lee en el
  teléfono (los 21 chequeos) y los «en contra» de cada prueba nueva.
- Contrato de Artifact cumplido; 390 sin desborde; 50 imágenes presentes, 9,98 MB.

### Para la Tanda B

Los menores 4 a 12, 15 y 17 los compruebo al empezar la QA de la Tanda B; 13, 14 y 16, si se cierran
antes de publicar, con `legible.mjs`, `palabras.mjs` y un grep del tablero y del brief. La regla nueva
que dejo para `e9/acta-qa-E9.md`: cada lectura publicada se compara contra un crudo tomado de lo que va a
quedar publicado, no del sitio de hoy (defecto 15).

---

## Ronda 1 · 14-oct-2026

**Javiera (`/web-qa-critico`), en contexto limpio.** No escuché a Mauro, a Bruno ni a Lucía, y no tomé
sus cifras: lo que va abajo sale de renders, extracciones y pedidos míos. Leí entero el plan aprobado
(`dazzling-snacking-river.md`), `e9/brief-e9.md`, `tablero.html`, `e9/piezas/manifiesto.json`, el
`registro.json` y todo el crudo de `crudo/2026-10-14/`, `herramientas/armar-protos.py`, `proto/e9/e9.css`,
`piezas-tablero/manifiesto-tablero.json`, la fila :195 del §7 de la spec, el §07b del manual y los dos
detectores (`estudio-web/antislop-web.md` y `refero-design/references/anti-ai-slop.md`).

**Auditado:** rama `claude/magical-franklin-ckfki2`. Empecé sobre `69b190c` (brief y piezas); mientras
medía, el orquestador commiteó el tablero en `c254fd0`. Comprobé que es lo mismo que medí: `tablero.html`
no cambió (md5 `a8b059b1…`, escrito a las 20:24) y las tiras del tablero coinciden con mis renders de los
prototipos de hoy (diferencia media de 1,1 a 1,5 sobre 255, ruido de JPEG). `spindlelab-astro/src` y
`public` sin cambios contra `72045f8`; corrí `npm run build` (27 páginas) para comparar contra `dist/v3`.

### Veredicto: **con reparos**

Las piezas están limpias: cero bloqueantes. Todo texto de cada lectura está literal en su crudo o es un
conteo con su fórmula, los cinco status y los tres puntajes los volví a pedir yo a las 20:33 y dan lo mismo,
ninguna pieza lleva oro, no hay un solo dominio de prospecto, el 36 → 73 → 100 vive solo en Trabajo y las
tres pruebas nuevas llevan «Espera tu OK» en la pieza misma. Ninguna dirección usa `assets/img/d/` ni
display, y el texto de las dos páginas prototipo es el de `dist/v3` palabra por palabra salvo etiquetas y
los tres rótulos del compromiso.

Lo que falla está en cómo el tablero le presenta la decisión a Ramón: las dos direcciones no se comparan
en igualdad (defecto 1), la recomendación usa una cifra que no es la medida (defecto 2) y el recorte de
Trabajo borra palabras aprobadas sin decirlo (defecto 3). Son tres mayores de texto y composición, todos
de Lucía. **El reparo:** se cierran 1, 2 y 3 antes de publicar el Artifact para Ramón; los menores (4 a 12)
no bloquean mostrárselo y se cierran antes de la Tanda B. Si 1 se cierra aplicando la tira también a la
Dirección 2, hay que volver a rendir las tiras de D2; si se cierra por declaración, basta el texto.

### Cómo lo verifiqué

- Tres servidores locales: `proto/` en 8765, `spindlelab-astro/dist` en 8766 y la carpeta del tablero
  en 8767 (y por `file://`, para la codificación).
- Chromium de Playwright (`/opt/pw-browsers/chromium-1194`), sin aviso de cookies en los prototipos
  (el armador lo quita) y con desplazamiento previo para asentar `[data-reveal]` en `dist`.
- Archivos de trabajo, que no se commitean:
  `/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/javiera-e9-r1/`.
  Scripts `protos.mjs` (prototipo contra dist), `literal.mjs` (pieza contra crudo), `oro.py` y
  `oro-tramos.py` (§07b), `tablero.mjs` (Artifact a 390 y 1440, foco, contraste, hosts), `cuadra.mjs`
  (enlaces de Trabajo), `carrusel.mjs` (piezas visibles a 390 y alto de la banda), `raigal.mjs`,
  `cel.mjs`, `charset.mjs`; resultados en `protos.json` y `tablero.json`; capturas en `capturas/`.

**Capturas mías** (`capturas/` de esa carpeta): `tablero-390.jpg` y `tablero-1440.jpg` (página entera);
`d1-pantallas_*-{1440,390}.jpg` y `d2-lectura_*-{1440,390}.jpg` (las cuatro páginas prototipo);
`dist_v3_*-1440.jpg` (el antes); `recortes_*-{1440,390}.jpg` (Trabajo, Diagnóstico y los tres «Espera tu
OK»); `d1-cabecera-robots-1440-recorte.png` y `d1-cabecera-robots-390-dpr3.png` (la cabecera de D1 a
tamaño real); `raigal-390-d1-pantallas.png` y `raigal-390-d2-lectura.png`.

### 1 · Cada pieza contra su crudo

Rendí el HTML de cada pieza de lectura y comparé cada nodo de texto visible, uno por uno, contra los
archivos de crudo que declara el manifiesto (`literal.mjs`). Las pantallas las comparé contra su captura y
el registro. Los pedidos los repetí yo a las 20:33 (23:33 UTC).

| Pieza | Texto contra crudo | Dominio, fecha y status | Oro (§07b, medido por mí) |
|---|---|---|---|
| `l1-robots-spindlelab` (navy) y variante petróleo | 9 de 9 literales en `robots.txt`; el «·» es glifo. Las 6 líneas van en el orden del archivo | `spindlelab.cl · robots.txt · 2026-10-14`. robots.txt de hoy: 200 y el **mismo sha256** que el crudo (`9413cbdd…`) | 0 % |
| `l2-respuesta-robots-spindlelab` (petróleo) | 12 de 12 literales en `registro.json`; «GET /» derivado con fórmula | Pedido de nuevo con los cinco user-agent: **200, 200, 200, 200, 200**. Ver defecto 4 sobre «ClaudeBot/1.0» | 0 % |
| `l3-jsonld-spindlelab` (brasa) | 52 de 52 nodos de texto literales; los 4 nodos y sus propiedades coinciden con `nodos` del crudo | `spindlelab.cl · JSON-LD · 2026-10-14` | 0,023 % (antialias del blanco sobre brasa) |
| `l4-21-chequeos` (petróleo) y variante brasa | 53 de 53 nodos de texto en el crudo (`chequeo-ia.json` y `paginas-v3.json`). Las 21 filas coinciden en título y peso con la tabla del artículo (21 de 21) y con `functions/api/chequeo.js` (21 de 21). Sumas 30 + 40 + 30 = 100, recalculadas | `spindlelab.cl · 21 chequeos · 2026-10-14` | 0 % y 0,0051 % |
| `v1-ley-36-73-100` (brasa, de reserva) | 12 de 12 literales en `obra-v3.verifica-y-cumple.json`, la línea de `publicar-03` y el registro; las 2 flechas son glifos | El 100 lo pedí de nuevo a `verifica.spindlelab.cl/api/chequeo`: **100**. El 36 y el 73 están en `hallazgo.md@1a0ae0a` | 0,0002 % |
| `k1-67-de-69` (Espera tu OK) | 8 literales en el extracto; 67 de 69, 37 de 38 y 30 de 31 derivados con fórmula. Comparé el extracto contra `corridas-chequeo-2026-08-31.md`: mismo sha256 (`ebdb1692…`) y mismas líneas 1, 14, 20, 22, 78, 84 y 86. La línea 78 nombra un dominio y el extracto la corta | Sin dominio, por regla; fecha del dato, 31-ago-2026 | 0 % |
| `k2-chequeo-ia-85-54` (Espera tu OK) | Captura de la página del chequeo; el texto está en `chq-score-*.txt` | Pedí de nuevo los dos puntajes: **85** y **54**. Ver defectos 5 y 6 | 0,022 % |
| `k3-panel-combeau` (Espera tu OK) | Capturas existentes del 3-sep (en el repo desde `9f2e6a6`), sin texto agregado | Sin hora registrada, declarado | 0,0025 % |
| `p1` y `p2`, Verifica y Cumple | Capturas de hoy; la única adición es la hora del teléfono, 19:29 y 19:30, igual al registro (19:29:53 y 19:30:04) | Obra, con su rótulo de obra | 0,0003 % y 0,0011 % |
| `n1` y `n2` de Lucía (robots.txt y JSON-LD en notebook y teléfono) | El robots.txt entero y el bloque 1 del JSON-LD formateado: el JSON del montaje es **igual** al `bloques[0]` del crudo una vez parseado | La etiqueta va en el `figcaption` del prototipo, con fecha | 0 % y 0,0004 % |

**verifica.spindlelab.cl sin robots.txt, llms.txt ni sitemap.xml:** lo confirmé, las tres rutas dan 200
con `text/html` (la aplicación). **La home v3 sin FAQPage** (lo que dice el «En contra» del 67 de 69): lo
confirmé en el JSON-LD de `dist/v3/index.html` (ProfessionalService, WebSite, Person, WebPage).

### 2 · Reglas duras

| Regla | Medición | Resultado |
|---|---|---|
| Cero datos inventados | Sección 1: ningún texto fuera del crudo salvo glifos y derivados con fórmula | ✅ |
| Cero prospectos | Los 69 dominios de `corridas-chequeo-2026-08-31-*.jsonl` (sin los propios) con `grep -rFf` contra `e9/` y `tableros/e9-interiores/`: 0 archivos. `chileaudita` (línea 78): 0 | ✅ |
| Ningún oro en las piezas | 60 archivos medidos con mi propia máscara (tono 38–54°, S ≥ 0,5, V ≥ 0,5; control: `#C9A227` da oro, brasa, petróleo y el lima de Verifica no). Máximo de una pieza: 0,0234 %. `grep -ril c9a227 e9/piezas/`: 0 | ✅ |
| Un oro por vista | En los prototipos no aparece oro nuevo. Sigue el del teléfono de Combeau modelo, **ya en el sitio**: `mock-combeau-modelo-alto-2.jpg` 0,059 % y su `-800` 0,055 %, sobre el umbral. Lucía lo declara en el tablero | ✅ en lo nuevo; ver defecto 8 |
| Cadencia y monitoreo de menciones | Piezas, etiquetas y alt: 0 coincidencias de `quincen|cada mes|mes a mes|al mes`. «menciones» aparece en una sola pieza, K2, dentro del veredicto literal del chequeo, y el tablero lo declara. Prototipos contra `dist` con el mismo corte: Acompañamiento 15 y 15, Diagnóstico 1 y 1, Desarrollo web 0 y 0, Trabajo 0 y 0; «menciones» 2 y 2, 1 y 1 | ✅ no aumenta; ver defecto 6 |
| Raigal solo con su rótulo | En las dos direcciones, a 390, el `figcaption` lleva primero «Pieza de concepto · no es un cliente» (12 px, negro sobre papel), a 10 px del borde de la pieza, y después «Raigal · Implantología» | ✅ |
| 36 → 73 → 100 | Solo en `recortes/trabajo-despues.html` entre los prototipos (búsqueda de `\b36\b` en el texto visible); Trabajo no tiene `chq-*`. Ni la home ni el JSON-LD se tocan | ✅ |
| Tres pruebas nuevas marcadas | 3 `span.marca` «Espera tu OK» en el tablero, el sello en las tres piezas `-tablero` y el contorno punteado en los recortes; 13 apariciones en `tablero.html` | ✅ |
| Sin generación pagada | `generar.mjs` y las herramientas de Lucía no llaman a Higgsfield ni a Unsplash (la única mención es la regla) | ✅ |
| No se toca el sitio | `git diff 72045f8 HEAD -- spindlelab-astro/src spindlelab-astro/public`: vacío | ✅ |

### 3 · Las dos direcciones

**Mediciones** (`protos.json`, `carrusel.mjs`):

| | D1 Pantallas | D2 Lectura de máquina |
|---|---|---|
| Fotos `assets/img/d/` | 0 en las dos páginas (en `proto/` solo las pide `recortes/diagnostico-antes.html`, que es el antes) | 0 |
| Display (≥ 700 en mayúsculas, o 800) en el `<main>` | 0 nodos a 1440 y a 390 | 0 nodos |
| h1 | 60 px, 500, sin mayúsculas | 60 px, 500, en el color del texto del campo |
| Texto contra `dist/v3` | Acompañamiento: solo 2 etiquetas nuevas y los rótulos Plazo, Resultado y Condición. Desarrollo web: solo etiquetas reordenadas o nuevas | Acompañamiento: solo los rótulos y una etiqueta movida. Desarrollo web: **0 diferencias** |
| Piezas | 6 y 7 (hoy 3 y 6) | 4 y 6 |
| Altos a 1440 | 8.539 y 8.951 px (hoy 7.158 y 8.275) | 8.449 y 9.159 px |
| Banda de campo | no hay | 589 px (Acompañamiento) y 628 px (Desarrollo web) a 1440; 445 y 460 a 390 |
| A 390 | 2 de 6 piezas empiezan fuera de pantalla en Acompañamiento (se ve el 49 % y el 34 %) y 2 de 7 en Desarrollo web (7 % y 5 %). El robots.txt de la cabecera queda con texto de unos 3 px | Todo apilado y visible; la respuesta a cada robot se lee a 350 px |
| Secciones que siguen como «etiqueta a la izquierda, lista a la derecha» | Acompañamiento: 4 de 5 (sale el mes tipo). Desarrollo web: 4 de 5 sin contar la obra (salen las fases) | Acompañamiento: **5 de 5**. Desarrollo web: **5 de 5** |
| `verificar.mjs --base` sobre los 7 prototipos, a 390 y 1440 | Sin hallazgos de contraste, desborde, h1, JSON-LD ni alt. Solo el comentario de prototipo que pone el armador y los enlaces a `/v3/…`, que dan 404 porque ese servidor solo tiene `proto/` | igual |
| Desborde a 390 | `scrollWidth` 390 en las cuatro páginas y los tres recortes | igual |

**Mi lectura.** Son dos direcciones de verdad y no un promedio: cada una toma una sola referencia y
conserva su rasgo (D1, los casos de driftime, negro y galería entre secciones; D2, los campos de la home,
color de margen a margen en la cabecera). Pero se diferencian en la cabecera y en la densidad, no en el
cuerpo: en Acompañamiento comparten cuatro piezas (respuesta, 21 chequeos, robots y retrato) y en las dos
el texto aprobado sigue en las mismas filas.

Contra lo que marcó Ramón: **(2) las fotos** quedan resueltas en las dos, con material real y fechado.
**(3) la prueba** queda resuelta en parte: el compromiso pasa a 20 px en papel con rótulos, Trabajo
muestra las cifras a 44 px y la metodología muestra 30/40/30 a 60 px, pero los 21 chequeos de la
metodología siguen en gris de 15 px. **(1) las filas** quedan resueltas en parte y desigual: D1 pone una
galería entre cada par de secciones y pasa una sección por página a columnas; D2 no cambia ninguna fila
y pone el pulso en la banda de color. Las dos dejan «Lo que incluye», los planes y las preguntas como
están. Eso no es un error de ellas: el copy de E8 está cerrado y la estructura de esas secciones no entró
en el plan. Lo que sí es un defecto es que el tablero no lo diga y que la tira de columnas, que no depende
de la dirección, solo se le muestre a D1 (defecto 1).

Las medidas favorecen a D2 en el teléfono, por una razón que el tablero no usa: a 390, la cabecera de D1 es un
notebook con texto de unos 3 px (`d1-cabecera-robots-390-dpr3.png`). Tapando el logo, a ese ancho podría
ser cualquier estudio de desarrollo; la respuesta a cada robot de D2 se lee entera en el teléfono. La
cifra con que el tablero lo argumenta («la mitad de las piezas queda escondida») no es la medida
(defecto 2). La decisión la toma Ramón, y la tiene que tomar con las medidas.

### 4 · El tablero como Artifact

| Comprobación | Resultado |
|---|---|
| Sin `<!doctype>`, `<html>`, `<head>` ni `<body>` | ✅ (la única coincidencia de «<head» es `<header>`) |
| `<title>` | «Tablero interiores E9», 3 palabras ✅ |
| `meta claude:viewport-fit-sides` y los dos `max()` de gutter | ✅ `content="cover"`; `padding-left` y `padding-right` con `max(16px, env(safe-area-inset-*, 0px))` |
| Colores como tokens en `:root`, `color-scheme: dark`, `body` con fondo | ✅, salvo un `#262626` suelto en el hover del índice (defecto 10) |
| Hojas externas | Solo `fonts.googleapis.com` (Manrope); hosts pedidos al rendir: el propio, `fonts.googleapis.com` y `fonts.gstatic.com` ✅ |
| 390 | `scrollWidth` 390 = `clientWidth` 390, ningún elemento pasa del borde, con todos los `<details>` abiertos ✅ |
| 1440 | `scrollWidth` 1440 ✅ |
| Imágenes | 50 referencias, las 50 existen, 0 respuestas 4xx, 0 rotas; `width` y `height` iguales a las del archivo en las 50; ninguna sobre 4 MB (la mayor, 0,30 MB); total 10,46 MB ✅ |
| Foco | Tab recorre índice (5), los `summary` y vuelve; contorno de 2 px en papel en todos ✅ |
| Contraste | Mínimo 7,5:1 (gris de 14 px sobre el módulo) ✅ |
| Codificación | **Sin `<meta charset>`**: servido por `http.server` sale en windows-1252 («DirecciÃ³n 1 Â· Pantallas»); por `file://` en Chromium sale bien (defecto 9) |
| Encabezados | Un h1. Salto de h2 a h4 en «Referencia dominante», «Rasgo que toma» y «Qué sacrifica» (defecto 10) |

### 5 · Antislop

**Checklist de cierre (`antislop-web.md` §E), sobre el copy del tablero y los prototipos:**

- **Copy.** Verbos de folleto: 0. Relleno de apertura: no, la primera línea dice qué se elige. Tricolon
  automático: las series son listas de cosas reales (las tres pruebas, los tres casos de driftime).
  «No solo X sino Y»: 0. Preguntas: una, «¿Te pueden citar?», que es el nombre del bloque del chequeo.
  Title Case: no; las mayúsculas internas son nombres de dirección y de página. Registro: tú con Ramón y
  primera persona singular de Lucía, consistente. Rayas: 0. Prueba social sin respaldo: 0; los
  porcentajes son medidas de oro y de alto. **Borrar 30 %: abierto, con su porqué:** son 2.391 palabras,
  pero es un documento de decisión y lo largo está plegado (las decisiones de cada dirección) o es la
  procedencia de cada pieza, que es justo lo que la regla de «cero datos inventados» pide mostrar.
- **Estructura.** Sin tarjetas iguales, sin «por qué elegirnos», sin métricas inventadas, sin formulario.
  El orden responde a la decisión: qué se elige, las dos opciones, la recomendación, la prueba, lo que
  espera el OK y las fuentes.
- **Código.** Landmarks reales (`main`, `header`, `nav`, `section`), un h1; salto h2 → h4 (defecto 10).
  Radio de 6 px, el de la marca; un hex suelto y un peso cargado de más (defecto 10). Sin vidrio ni
  degradé, sin emoji. Alt reales: revisé contra su imagen los de las cabeceras de cada dirección, los de la prueba y los de «Espera tu OK» (una docena), y describen lo que se ve. Foco visible,
  contraste AA, imágenes dimensionadas. JSON-LD, canonical, OG, índice y `?v=N`: no aplican a un Artifact
  privado.
- **Visual (`refero-design`).** Sin índigo propio: el azul es el de Verifica dentro de sus capturas. Las
  cajas `.responde` y `.reco` son dos llamados, no un sistema de tarjetas. Oscuro por brief (driftime).
  Sin serif de piloto automático, sin franja lateral. Tell 7: no hay promedio. Tell 8: el color de campo
  conserva su papel, el campo del servicio (petróleo en Acompañamiento, brasa en Desarrollo web).
  Tell 9: el papel de la imagen se conserva con material real, que es el punto de la obra.

**Pruebas de fuego** (sobre las direcciones):
- **Logo tapado.** D2 pasa a 1440 y a 390: banda del campo y lecturas del propio dominio. D1 pasa a 1440
  (el robots.txt de spindlelab.cl se lee) y **falla a 390**: la cabecera queda en un notebook con código
  ilegible.
- **Rubro cambiado.** Las lecturas de máquina solo calzan con este negocio. La galería de obra de
  Desarrollo web calzaría con cualquier estudio, pero es obra propia, real y rotulada.
- **Leído en voz alta.** El tablero suena a una persona que explica una decisión. Las líneas de «Las
  decisiones» usan jerga de estudio («alto común», «filas 05, 07 y 20 de CeHDI», «lock §6.4»), pero
  van plegadas.

### Defectos

1. **Mayor · Lucía · las direcciones no se comparan en igualdad.** La tira de columnas para «Así se ve un
   mes tipo» y «Cinco fases» no depende de la dirección, pero solo está dibujada en D1: en D2 esas dos
   secciones siguen como «etiqueta a la izquierda, lista a la derecha» y el tablero no lo dice (D2 deja
   5 de 5 secciones en filas en las dos páginas; D1, 4 de 5). Además, ninguna de las dos toca «Lo que
   incluye», los planes ni las preguntas, que es lo primero que Ramón marcó, y el tablero tampoco lo
   dice. **Cierre:** o se aplica la tira también en D2 y se vuelven a rendir sus tiras (`armar-protos.py`
   y `renderizar.mjs`), o el «Qué sacrifica» de D2 dice que el mes tipo y las fases quedan en filas. Y en
   las dos, una línea que diga qué secciones siguen como hoy y por qué (copy de E8 cerrado). Lo compruebo
   con `protos.json` y un grep del tablero.
2. **Mayor · Lucía · la recomendación usa una cifra que no es la medida.** «En celular la mitad de las
   piezas queda escondida en el carrusel»: medí 2 de 6 en Acompañamiento (se ve el 49 % y el 34 % de
   ellas) y 2 de 7 en Desarrollo web (7 % y 5 %), un tercio y no la mitad. **Cierre:** reemplazar por las
   medidas y sumar la razón que sí se sostiene: a 390, la cabecera de D1 muestra el robots.txt con texto de
   unos 3 px (`d1-cabecera-robots-390-dpr3.png`).
3. **Mayor · Lucía · el recorte de Trabajo borra palabras aprobadas sin declararlo.** El tablero dice «lo
   único nuevo es el rótulo». Medido contra `dist/v3/trabajo/`: además de sumar el rótulo, salen «sacó»
   (dos veces), «de 100», «y», dos «el», «El» y las comas, y la nota del 73 pasa detrás de su cifra. Con eso
   se pierde la escala: el 36 queda sin «de 100». Puede ser
   una buena decisión, pero así no es auditable. **Cierre:** declarar en la nota del recorte qué palabras
   salen y, para no perder la escala, mantener «de 100» en la primera cifra (las palabras están en el
   párrafo aprobado); el texto final lo afina Clara en la Tanda B.
4. **Menor · Bruno · «ClaudeBot/1.0» sin fuente archivada.** El status 200 es real y la cadena está en
   `registro.json`, pero solo porque es la que mandamos. El extracto de Anthropic (`ua-anthropic.txt`)
   trae únicamente el token «ClaudeBot», y el registro dice «la cadena completa es la de los registros de
   servidor» sin archivar ninguno. Las otras tres cadenas sí salen de la página de su empresa. **Cierre:**
   archivar en `crudo/` una fuente con la cadena completa, o dejar la fila como «ClaudeBot» sin versión,
   y volver a rendir `l2`.
5. **Menor · Bruno · K2 trae dos botones dentro de la imagen.** Si Ramón lo autoriza, la captura lleva
   dos «Pedir el diagnóstico» que en la página serían botones de mentira, sin enlace, al lado de botones de
   verdad. **Cierre:** si se autoriza, recortar la captura al puntaje, el dominio y el veredicto.
6. **Menor · Mauro · el criterio de «menciones» choca con K2.** El brief §6 pide que ninguna pieza diga
   «menciones», y el veredicto literal del chequeo para 85 dice «te cuestan menciones». El tablero lo
   avisa, pero el brief no dice qué hacer si Ramón autoriza la pieza. **Cierre:** una línea en el brief:
   excepción para el texto literal del instrumento, o recorte del veredicto.
7. **Menor · Mauro · dos cifras para la misma invariante de cadencia.** El brief §6 dice «49 en la
   extracción»; el plan dice 51, y `e8/e8-antes-despues.md`:427 dice 51 (37 en texto, 12 en JSON-LD y 2 en
   el head) y 52 contado directo sobre el HTML. **Cierre:** decir en el brief qué corte da 49 (parece texto
   más JSON-LD, sin head) para que la QA de la Tanda B compare con el mismo corte.
8. **Menor · Mauro · el criterio de oro del brief no ve la obra.** El §6 mide solo los archivos de
   `public/assets/img/e9/`. El teléfono de Combeau modelo (`obra/mock-combeau-modelo-alto-2.jpg`, 0,059 %, y
   su `-800`, 0,055 %) está hoy en Desarrollo web y en Trabajo, y pasaría el criterio sin medirse.
   **Cierre:** que el criterio mida toda imagen de cada vista, no solo las de `e9/`.
9. **Menor · Lucía · el tablero no declara su codificación.** Sin `<meta charset="utf-8">`, servido por un
   servidor estático sale en windows-1252 («DirecciÃ³n»), y un Safari que abra el paquete local puede hacer
   lo mismo. El Artifact lo envuelve con su propio esqueleto, pero el paquete local no. **Cierre:**
   `<meta charset="utf-8">` como primera línea (no es una etiqueta de esqueleto).
10. **Menor · Lucía · higiene del marcado y el CSS del tablero.** Salto de h2 a h4 en las notas de cada
    dirección (antislop C1). Manrope 800 se pide a Google Fonts y ningún elemento lo usa (C7). `#262626`
    suelto en el hover del índice, fuera de los tokens (C2). **Cierre:** h3 o `p` en las notas, quitar 800
    de la URL y pasar el hover a un token.
11. **Menor · Lucía · el compromiso partido a mitad de frase.** «Plazo» termina en coma, «Resultado» parte
    en minúscula y trae dos compromisos más la excepción del 100, y «Condición» cierra con «El chequeo es
    público, así que lo compruebas tú.», que no es una condición. Se lee como una frase cortada, no «en 3
    segundos». **Cierre:** que el tablero lo diga junto a la nota del orden, para que Ramón elija entre la
    versión literal y la reescrita (Clara, Tanda B) sabiendo cómo se lee cada una.
12. **Menor · Lucía · la dirección elegida no se ve en las internas sin campo.** Ramón decide la dirección
    para los tipos Servicio, Editorial y Herramienta (brief §2), pero el tablero solo muestra servicios. En
    D2 no se dice qué cabecera llevan Método, Diagnóstico, Nosotros, Trabajo, Contacto, el blog y los
    artículos, que no tienen campo. **Cierre:** una línea por dirección con lo que pasa en esas páginas
    (negras como hoy, o qué color).

### Lo que está bien (que la ronda 2 no lo rompa)

- **Las piezas son el estándar que pedía el plan.** Cada lectura tiene crudo con sha256, hora y status;
  el generador se niega a rendir si un texto no cuadra; los derivados traen fórmula. Reproduje los datos
  dos horas después y dan lo mismo.
- **Las restricciones se respetaron sin excepción:** cero `assets/img/d/`, cero display, cero oro nuevo,
  cero prospectos, el 36 → 73 → 100 encerrado en Trabajo, Raigal con su rótulo primero, el copy de las
  dos páginas intacto.
- **Las afirmaciones del tablero que medí son ciertas:** las alturas a 1440, el número de piezas, la
  banda de 600 y 450 px, el oro de 0,059 % y 0,0095 % de Combeau modelo, la falta de robots.txt en
  Verifica, la home v3 sin FAQPage, y el descuadre de Trabajo: hoy el enlace de Verifica cae 148 px
  (1024), 175 (1280), 185 (1440) y 185 (1920) bajo el de Combeau modelo; con el cambio, 0 en los cuatro.
- **El tablero es honesto con lo que espera el OK:** cada prueba trae dónde, a favor, en contra y fuente,
  incluidos los dos «en contra» que más pesan (Verifica con 54 y «menciones» en el veredicto) y la
  pregunta del permiso escrito de Combeau.
- Mobile del tablero: sin desborde, foco visible, 10,46 MB en 50 imágenes, todas presentes.

### Para la ronda 2

Vuelvo a correr `protos.mjs`, `carrusel.mjs` y `tablero.mjs` sobre el commit nuevo y un grep del tablero
por las frases de los defectos 1 a 3. Si 1 se cierra con la tira en D2, comparo sus tiras nuevas contra
mis renders igual que en esta ronda. Los menores de Bruno y de Mauro los compruebo en la Tanda B.
