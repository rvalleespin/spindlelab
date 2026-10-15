# Acta de QA · SpindleLab v3 · E9, tablero de la compuerta (Tanda A)

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
