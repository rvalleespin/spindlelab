# Acta de QA · SpindleLab, sitio nuevo · cambios del 30-oct · vueltas 1, 2 y 3

> **Vuelta 3 (QA exprés de las respuestas de Ramón), sobre `284757fb`: al final de esta acta.** Veredicto: **Aprobado.** Lo que
> eligió Ramón está en el `dist` frase por frase, el peso de la home se sostiene (1.398,8 kB, margen 1.236 bytes) y no hay
> regresiones; queda 1 menor de documento (Mauro) y, para Ramón, que la frase de los agentes de IA sigue tropezando.

> **Vuelta 2 (la última vuelta interna), sobre `4d794419`: más abajo, antes de la vuelta 3.** Veredicto: **Aprobado con reparos.** Los mayores 1 y 2 y
> nueve menores quedan cerrados y medidos; siguen abiertos solo los cuatro que decide Ramón (mayor 3, menores 5, 6 y 7), con su
> reparo y su plazo. Lo de abajo, hasta «Vuelta 2», es la vuelta 1 tal como se firmó.

> La escribe Javiera (`/web-qa-critico`) en contexto limpio (subagente): leyó lo que decidió Ramón el 30-oct (el encargo de la orquestadora), `desvios/texto-30oct.md` (Clara), `desvios/construccion-30oct.md` (Diego), la fila del 30-oct de `spec-visual.md` §7, `spec-home.md` §6 y §12, el brief de E13 y el acta de E13 (`acta-qa.md`) para medir igual que antes. No vio cómo se construyó. No arregló nada: lo único que escribe en el repositorio es esta acta, `capturas-qa-30oct/` y `lectura-fria/30oct/`, que son su evidencia.

**Fecha:** 30-oct-2026 · **Rama:** `claude/magical-franklin-ckfki2` · **Commit auditado:** `a84a1381` (árbol limpio), construido en una copia en el scratchpad con `npx astro build`: 22 páginas en 3,91 s, sin errores ni avisos, más `/privacidad/` y `404.html` estáticas. Node v22.22.0 (producción usa Node 20: sin ensayar), Chromium 1194 de Playwright. Un servidor estático local sirvió el `dist`. Para calibrar el peso construí también `9039b521` (la E13 aprobada el 26-oct, sin nada del 30-oct). **Ronda:** primera vuelta de QA de los cambios del 30-oct (quedan hasta dos).

## Veredicto

**APROBADO CON REPAROS.**

Lo que Ramón eligió el 30-oct está en el sitio y se reproduce: la portada nueva, el botón amarillo en dos lugares y en ninguno más, la sección 2 en dos columnas con los filetes alineados, el sitio primero en Soluciones, la pregunta de Instagram primera y con su `FAQPage`, «Quién está detrás» en tercera persona sin agencias ni clientes, `/contacto/` con los dos caminos y el logo de la i con su disco. El botón entra entero y sin nada encima en la primera pantalla en los cuatro tamaños pedidos, con y sin aviso; el contraste, el foco, los enlaces, el UTM de punta a punta, los precios y los protegidos pasan. **No hay bloqueantes.**

Hay **3 mayores**: (1) la primera carga de la home a 1440 pasa el tope de E13 por 2,1 kB; (2) 19 de las 22 imágenes al compartir siguen con el logo anterior, la i cruzada que Ramón descartó, mientras el encabezado, el favicon y 3 tarjetas ya llevan la nueva; (3) la lectura en frío (criterio 4 del brief) tropieza en tres frases nuevas o que volvieron, una de ellas en «Quién está detrás». Y **12 menores**.

**Reparos con plazo:** cerrar los mayores 1 y 2 **antes de armar el corte** (o dejarlos decididos por escrito: el techo de peso lo sube Lucía con su porqué, las 19 tarjetas las decide Ramón), y el 3 lo decide Ramón con la propuesta de Clara antes del corte. Lo que cambie se revisa en una QA exprés. Los menores 4 y 5 también antes del corte; el resto se anota.

Conteo: **0 bloqueantes · 3 mayores · 12 menores.**

## Cómo se verificó

| Qué | Comando o herramienta | Resultado |
|---|---|---|
| Texto con huella | `node e13/herramientas/extraer-texto.mjs --comprobar` | **16 de 16 «igual»**, sale con 0 |
| Build | `npx astro build` sobre la copia | 22 páginas, 0 errores, 0 avisos; los guardianes de precios, nombres, largos y el de las 4 filas de `.int-par` no cayeron |
| `verificar` a 390 | `node scripts/verificar.mjs --excluir /privacidad/` | 22 páginas, **«Sin hallazgos»**, sale con 0 |
| `verificar` a 1440 | `… --ancho 1440` | 22 páginas, **«Sin hallazgos»**, sale con 0 (6 nodos sobre imagen o degradado: la portada, medida aparte abajo) |
| Desborde | mi `desborde.mjs`: 22 rutas + `/privacidad/` × 360, 390, 768, 1024, 1440 y 1920, medido **en la página** (`scrollWidth` contra `clientWidth`, y cada elemento con `right > innerWidth` buscando quién lo recorta), con la página recorrida | **0 de 138** con desborde. Solo se pasa del ancho la tabla de `/blog/21-chequeos-visibilidad-ia/` a 360, 390 y 768, dentro de su contenedor desplazable (igual que en E13). 0 errores de consola ni de red. Un `h1` en las 22 (`/privacidad/` trae 2: es la de `main`, fuera de la obra) |
| Primera pantalla | mi `primera.mjs`: `elementFromPoint` en el centro y en las cuatro esquinas del botón (a 4 px de cada esquina, por el radio de 4), con el aviso abierto y contestado | Ver la tabla de abajo: **0 de 5 puntos tapados en los 11 tamaños de la obra**, con y sin aviso |
| Lo mismo con la herramienta de Lucía | `node e13/herramientas/portada-30oct.mjs <url> <salida>` **sin** `--inyectar` | Lo mismo que midió Lucía y que reportó Diego, al décimo de píxel: margen con aviso 181,1 a 360 × 800 y 227,2 a 390 × 844; sección 2 sin desfase de filetes (0 · 0 · 0) desde 834; alto de la home 7.486 · 7.470 · 9.463 · 9.057 (1440 · 1024 · 768 · 390), bajo los techos nuevos (7.800 · 7.800 · 9.700 · 9.300) |
| Contraste sobre el video | `python3 e12/spec/herramientas/contraste-portada.py` (sin cambios) sobre lo que dejó `portada-30oct.mjs`, 121 cuadros, 13 tamaños | **0 líneas bajo 4,5:1**; la peor, **5,35:1** (el rótulo a 1024 × 768); el amarillo contra lo que lo rodea, 12,8 a 13,27:1 desde 834 y 16,2:1 bajo 834 |
| El amarillo, sus estados y el foco | mi `primera.mjs` (color calculado en reposo, con `hover` y con `mouse.down`; Tab hasta cada botón) y el recorte del foco medido píxel a píxel | Ver abajo |
| Dónde hay amarillo | mi `amarillo.mjs`: 22 rutas + `/privacidad/` + `404.html`, a 390 y 1440, con y sin aviso; todo elemento con `background-color`, `color`, bordes, contorno, `fill`, `stroke` o subrayado de tono 45 a 75° saturado | Home **2** (`.cab__cta` y `#portada-cta`); las otras 20 rutas de A **1** (`.cab__cta`); `/contacto/` **0**; ningún texto, borde, fondo ni foco amarillo. En `/privacidad/` y `404.html` (de `main`) solo el punto dorado `#C9A227` del logo anterior |
| Foco por toda la página | mi `tab.mjs`: Tab y Shift+Tab por `/`, `/nosotros/` y `/contacto/`, a 1440 y 390, con y sin aviso (24 pasadas) | **0 paradas sin indicador y 0 tapadas** por el encabezado o el aviso (de 19 a 38 paradas por pasada) |
| Logo | mi `logo.mjs`: el `<svg>` del build a 16, 24 y 48 px, a 1x y 2x, y los favicon e iconos servidos; cobertura por fila en la columna de la i | Ver abajo |
| Enlaces internos | mi `enlaces.py` sobre el `dist` (`href`, `src`, `srcset`, `poster`, imágenes de `og:`, y los `#ancla` contra los `id` de la página destino) | 24 páginas, **975 referencias, 0 que no resuelven, 0 anclas sin destino** |
| UTM de punta a punta | mi `utm.mjs`: entrar a `/?utm_source=google&utm_medium=cpc&utm_campaign=qa30oct` y seguir con **clics reales** seis recorridos (portada → enlace de Desarrollo web → «Hablemos» del encabezado; botón amarillo directo; Soluciones → Auditoría → encabezado; Soluciones → Desarrollo web → «Hablemos de tu sitio» de la página; cierre de la home; menú → Nosotros → su botón), con y sin aviso | **12 de 12** con los tres `#f-utm-*` llenos (`google` / `cpc` / `qa30oct`) |
| Formulario | los `name`, el `action` y los ocultos contra `git show origin/main:spindlelab-astro/public/contacto/index.html`; envío con el endpoint interceptado (no salió ningún correo) y «no tengo» en el campo del sitio | Los 12 campos iguales y en el mismo orden, mismo `action` y `access_key`. Con «no tengo» el envío pasa (el campo no tiene `pattern`), la ayuda está enlazada por `aria-describedby` y sale «Listo. Te escribimos dentro de un día hábil.» |
| JSON-LD | mi `jsonld.mjs`: todos los bloques de las 22 rutas con `JSON.parse`; cada `FAQPage` contra el `textContent` de su página | **44 bloques, 0 errores.** `FAQPage` igual a lo visible en las **16** páginas que lo tienen; en la home **6 de 6**, en el orden visible y con «¿Por qué un sitio, si ya tengo Instagram?» primera |
| Agencias, clientes y frases que no van | `grep -rIo` sobre todo el `dist` | **0** McCann, Graphene, IPG, Universal, LATAM, Incrementa, Maggiore, «ocho marcas», «cuatro países», «SpindleLab soy yo», «soy yo», «pocos proyectos», «Te llegan consultas», «Pedir la revisión de una página», «Dónde puede caerse», «spindle es», «huso» |
| Barrido de términos y rayas | `node e13/herramientas/barrer-terminos.mjs <dist> --resumen` (30 archivos) y mi barrido del texto visible de `/`, `/nosotros/`, `/contacto/`, `/servicios/`, Desarrollo web, `/diagnostico/`, `/blog/` y Combeau | **0 rayas largas o medias**, 0 «24 horas», «diagnóstico gratis», «partners», «¿Listo para…?», «sin compromiso», promesas de cita, voseo, «¡», «en Chile», «revolucionario», «experto en», «apasionado», «líder», «innovador». «agentes de IA», 3: «Quién está detrás» y «Cómo trabaja» de `/nosotros/` (permitido). «mini-diagnóstico», 25 (el slug del artículo). «motor(es)»: «motores de IA». «posicionamiento anterior», 3: la description nueva (menor 12) |
| Precios contra `origin/main` (`840dc024`) | importes visibles y `price`/`minPrice` del JSON-LD, página por página | Las seis páginas de servicio: **idénticos** (visibles y JSON-LD). Índice: los mismos más 550.000 y 790.000, que ya están en las páginas de servicio de `main` (como en E13). Home: {350.000, 390.000, 400.000, 490.000, 590.000} = `Servicios.astro` + `Faq.astro` de `main` |
| Protegidos | `git diff origin/main -- spindlelab-astro/functions spindlelab-astro/public/_headers spindlelab-astro/public/_redirects spindlelab-astro/public/js` | **0 bytes.** Y `git diff 9039b521 HEAD` sobre esos, `public/assets/js` (con `v3-contacto.js`) y `src/layouts/Layout.astro`: **0 bytes**: Layout trae solo lo de E13 |
| Ley 21.719 | `grep` de «21.719», «diciembre», «vigencia» sobre el `dist` y `llms.txt`; la ficha del boletín leída por mí: `curl https://tramitacion.senado.cl/wspublico/tramitacion.php?boletin=18623` (30-oct) | Ver abajo |
| Peso | mi `peso.mjs`: bytes de cuerpo de cada respuesta (CDP, caché apagada), primera carga y recorrida, a 1440 y 390; **calibrado** con el build de `9039b521` | Ver mayor 1 |
| Imágenes al compartir | Read de los JPEG de `public/assets/img/` y `og:image` de cada ruta | Ver mayor 2 |
| Lectura en frío | `e13/herramientas/lectura-fria-texto.mjs` (texto de `/` y `/contacto/` tal como se ve en el build, con el `executablePath` de este Chromium) y `lectura-fria.py` (`claude -p` en directorio vacío, sin herramientas, skills, MCP ni ajustes; una conversación por lector) | Ver mayor 3. Íntegro en `lectura-fria/30oct/` |
| Capturas | mis `capturas.mjs` (página completa de `/`, `/nosotros/`, `/contacto/` y `/servicios/` a 390, 768 y 1440) y los recortes de arriba | Miré la home a 1440 por secciones (portada, sección 2, Soluciones, «Quién está detrás», preguntas y cierre) y entera a 390; `/nosotros/` a 1440 entera; `/contacto/` a 390 entera. **No miré a ojo** `/servicios/` ni ninguna ruta a 768: de esas tengo desborde, `verificar` y texto |

### La primera pantalla (botón `#portada-cta`)

Margen = borde de arriba del aviso (o de la ventana) menos el fondo del botón. «Tapados» = puntos del botón donde `elementFromPoint` no da el botón.

| Tamaño | Con aviso: margen · tapados | Sin aviso: margen · tapados | |
|---|---|---|---|
| **360 × 800** | 181,2 · 0 de 5 | 333,8 · 0 | Entero, con el microcopy y el enlace también a la vista |
| **390 × 844** | 227,2 · 0 | 360,9 · 0 | Igual |
| **768 × 1024** | 231,5 · 0 | 346,3 · 0 | Igual |
| **1440 × 900** | 54,6 · 0 | 123,6 · 0 | El microcopy queda bajo el aviso hasta contestarlo (declarado en la spec, como el 26-oct) |
| 360 × 640 · 375 × 667 · 414 × 896 | 44,5 · 82,8 · 264,7 · 0 | 197,1 · 216,5 · 398,4 · 0 | |
| 834 × 1112 · 1024 × 768 · 1194 × 834 · 1920 × 1080 | 51,6 · 52,6 · 72,1 · 35,7 · 0 | 120,6 · 121,6 · 141,1 · 104,7 · 0 | |
| 320 × 568 (fuera de la obra) | **−7,3 · 2 de 5** | 145,2 · 0 | La excepción dicha en la spec (§12.1) |

`capturas-qa-30oct/01` (360 × 800, 390 × 844 y 768 × 1024 con el aviso abierto) y `02` (1440 × 900 con el aviso abierto).

### El amarillo, sus estados y el foco

| | `#portada-cta` | `.cab__cta` |
|---|---|---|
| Reposo | fondo `rgb(255, 232, 0)`, texto y flecha `rgb(6, 6, 6)`: **16,20:1** | igual: **16,20:1** |
| Al pasar | `rgb(233, 212, 0)`: **13,39:1** | **13,39:1** |
| Apretado | `rgb(212, 193, 0)`: **11,03:1** | **11,03:1** |
| Transición | 167 ms lineal | 167 ms lineal |
| Foco (Tab, `:focus-visible`) | contorno 2 px blanco a 3 px; parada 11 a 1440 y 10 a 390 | igual; parada 9 a 1440 y 8 a 390 |
| Contorno contra lo que lo rodea (píxeles del recorte) | **20,08:1** a 1440 y **20,26:1** a 390 (el hueco de 3 px entre el amarillo y el contorno queda en `#060606`/`#060808`) | **20,26:1** a 1440 y a 390 |
| Medida | 346 × 44 a 1440, 196 × 44 a 390 | 87,5 × 44 en los 13 tamaños, sin desborde, plegado dentro de la placa en `y` 10 a 54 |

`capturas-qa-30oct/03`. Sobre el video, desde 834, Lucía midió el contorno a 16,01 a 16,59:1 (cuadro más claro); mi recorte de 1440 cae en el tramo más oscuro del velo, así que el número mío es el del caso común, no el peor.

### El logo, la i con su disco

Cobertura máxima por fila en la columna de la i (1 = blanco lleno, 0,02 = fondo), de arriba abajo:

| Tamaño | Disco | Filas limpias hasta el asta | |
|---|---|---|---|
| 16 px · 1x | 0,27 · **1** · 0,51 | **1** | La i se lee i: el disco no se funde con el asta |
| 24 px · 1x (encabezado desde 834) | 0,27 · **1 · 1** · 0,45 | **1** | Lo mismo que midió Diego (`logo-encabezado-30oct.mjs`) |
| 48 px · 1x | 0,71 · 1 · 1 · 1 · 1 · 0,71 | **3** | |
| 16 · 24 · 48 px a 2x | 4, 6 y 11 filas | 1 a 2, 3 y 7 | |
| `favicon-16.png` (servido) | 3 filas | **3** | Fondo `#060606` opaco (`alpha` 255): se ve también en una pestaña clara |
| `favicon-32/48`, `.ico` (16, 32, 48), `apple-touch-icon`, `icon-192`, `icon-512` | | | Todos opacos, la misma i con su disco; `?v=6` en las cinco referencias del `<head>` y en el `logo` de `#org` |

`capturas-qa-30oct/04`. El `d` construido es el corte menú de Bruno (disco centrado en 184,37 · −92,28, unos 15 × 8,3), no la elipse de la maqueta (rx 17, ry 6,5): desvío declarado por Diego (1 a 3) que la spec todavía no recoge (menor 4).

### Ley 21.719

- **Dónde se nombra:** home (2: «Probado primero en lo nuestro» y «Quién está detrás»), `/nosotros/`, `/trabajo/`, `/servicios/desarrollo-web/` (la ficha de Verifica y Cumple), `/diagnostico/`, `llms.txt` y `/privacidad/` (de `main`). **Solo `/diagnostico/` da una fecha**, y calificada: «El 28 de octubre el Senado aprobó un proyecto que posterga su entrada en vigencia (boletín 18.623-07), y ahora lo revisa la Cámara de Diputados. Mientras no se publique esa ley, la fecha legal sigue siendo el 1 de diciembre de 2026. El proyecto cambia cuándo, no qué.» Ninguna otra dice «1 de diciembre» ni «entra en vigencia». El blog no la nombra.
- **Contra la ficha** (la leí yo el 30-oct, XML del servicio público del Senado): 28/10/2026, «Discusión general. Aprobado en general y particular a la vez»; 29/10/2026, «Oficio de ley a Cámara Revisora» (oficio 355-26); etapa «Segundo trámite constitucional (C.Diputados)», subetapa «Cuenta de proyecto», urgencia «Discusión inmediata», sin número de ley ni Diario Oficial. **La frase de `/diagnostico/` es exacta al 30-oct.** Envejece: ver menor 13.
- **Verifica y Cumple** (`verifica.spindlelab.cl`) no está en este repositorio: no lo medí.

## Defectos

Severidad: **bloqueante** = deja a un visitante sin contactar, saca al sitio del índice o afirma en público algo falso; **mayor** = el entregable no cumple un criterio o una regla de la obra; **menor** = se corrige si no cuesta o se anota.

### Mayores

| # | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce | Cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | Diego (y Lucía si se sube el techo) | Home a 1440, primera carga | **1.402,1 kB**, sobre el tope de **1.400 kB** (2,1 kB de más). Mi herramienta, calibrada sobre `9039b521`, da **1.399,0 kB** ahí: la misma cifra del acta de E13 («1 kB de margen»). El 30-oct sumó **+3,1 kB**: el HTML de la home pasa de 37,5 a 39,8 kB (+2,3, el texto nuevo y la sección 2), el CSS de A de 49,5 a 50,6 kB (+1,1, el amarillo y `.int-par`) y el favicon pedido baja 0,3 (`favicon.svg?v=5` → `favicon-32.png?v=6`). La recorrida, 1.564,9 kB (≤ 1.600), y a 390, 758,8 kB (≤ 950): cumplen. **No está declarado:** Diego no midió peso, y la spec subió el techo del alto (criterio 5) pero no el del peso | `spec-home.md` §6, criterio 10 (≤ 1,4 MB primera carga a 1440); brief §7.8 aclarado el 26-oct; observación 1 del cierre exprés de E13 («cualquier texto… nuevo en la portada lo cruza») | `node peso.mjs <url>` (CDP: suma de `dataLength` por respuesta, caché apagada, aviso contestado, 4 s tras `networkidle`) sobre los dos builds | Uno de dos, por escrito: **(a)** bajar ≥ 2,1 kB de la primera carga y volver a medir. Lo que ya está identificado y no se usa: las dos hojas `inter.css` (1,5 kB) y `manrope.css` (1,6 kB) del `<head>`, que no bajan ninguna letra (defecto 16/23c de E13, abierto); viven en `Layout.astro`, **fuera** del bloque de gtag, consentimiento y Pixel, pero tocar `Layout.astro` lo autoriza la orquestadora. **(b)** Lucía sube el techo en `spec-home.md` §6.10 con su porqué, como hizo con el alto, y queda en la fila de la spec |
| 2 | Diego (con el corte de Bruno) | 19 de las 22 imágenes al compartir: método, diagnóstico, blog y sus 7 artículos, servicios y sus 6 páginas, trabajo y Combeau | Siguen con **El huso, la i cruzada por la tortera**: el dibujo que Ramón sacó el 30-oct («la cruz de la i se ve horrible»). El encabezado, el pie, el favicon, los iconos, el `logo` de `#org` y las 3 tarjetas regeneradas ya llevan la i con su disco. Al publicar, quien comparta `/servicios/` en LinkedIn o WhatsApp ve un logo y quien entra al sitio ve otro. Diego lo dejó escrito como pendiente (§4, «Para Ramón o para una pasada aparte»): el encargo le pedía solo las tres que cambian de titular | `spec-visual.md` §5.4 (fila del 30-oct): «un logo distinto en el encabezado y en la tarjeta al compartir sería un defecto»; la decisión de Ramón («logo 2») | Abrir `og-e12-metodo.jpg` y `og-e12-servicios.jpg` junto a `og-e12-marca.jpg`: `capturas-qa-30oct/05` | Regenerar las 19 con el corte que usa `og-30oct.mjs` (el mismo de las 3 nuevas: corte menú a 50,4 px, que Diego ya midió), subir su `?v=` (las de `?v=2` a 3; blog y Combeau de 1 a 2), mirarlas con Read y comprobar que ninguna referencia quede en la versión anterior. Si Ramón prefiere publicar así, que lo diga por escrito y pasa a menor |
| 3 | Clara (propone); decide Ramón | Home, lectura en frío | Los tres lectores entienden lo sustancial (qué hace, para quién, que el primer paso es mandar el sitio, gratis y en un día hábil) y los tres describen a Ramón como **serio**. Pero tropiezan en tres frases del texto del 30-oct: **(a)** «Trabaja con agentes de IA dentro del equipo» (**3 de 3**; para 2 de 3 es uno de sus tres mayores frenos: L3 «¿quién me hace el sitio, una persona o un robot?», L2 «todo pasa por una sola persona… ¿qué pasa si se enferma?»). La segunda mitad, «el código de cada entrega lo revisa y lo aprueba él», **tranquiliza** a 2 de 3. Es la misma frase que tropezó en las dos lecturas de E13 (3 de 3 y 2 de 3) y está justo en la sección que Ramón pidió que se viera profesional. **(b)** El rótulo «Sitios web a medida y marketing con IA» (**2 de 3**: «no sé si usan IA para hacer mi marketing o si es marketing para que me encuentre la IA»). **(c)** «sin plantillas ni WordPress» **vuelve** (2 de 3 no saben si es bueno o malo; en la ronda 2 de E13 había bajado a 0 de 3 al sacarla, y entró de nuevo con el texto de Soluciones) | Brief §7.4 («sin tropezar con un término sin explicar»); el pedido de Ramón del 30-oct («profesional, serio») | `lectura-fria/30oct/lector-1..3.txt`, secciones E, G y «las tres cosas que más me frenaron» | Clara propone, para cada una, una versión que conserve el hecho (el texto es de Ramón): en (a), decir qué recibe el cliente de esa manera de trabajar y quién responde, sin quitar que hay agentes de IA ni que él aprueba cada entrega; en (b), si hace falta, que la entradilla o la sección 2 aclaren el «con IA» (el rótulo es de Ramón y no se toca sin él); en (c), el porqué en cuatro palabras o sacarlo. Ramón elige por escrito; luego `extraer-texto.mjs`, build y una lectura en frío de la home. **Escalo (a) a Ramón con diagnóstico:** es la tercera lectura en que tropieza; la frase dice la herramienta y no lo que gana el cliente, y la mitad que habla de él (aprueba cada entrega) es la que da confianza |

### Menores

| # | Dueño | Dónde | Qué está mal | Contra qué | Cómo se cierra |
|---|---|---|---|---|---|
| 4 | Lucía | `spec-visual.md` §5.4 y §2.1 (fila 6), `spec-home.md` §6.21, `e13/herramientas/logo-i-disco.mjs` | **La spec no dice lo construido.** §5.4 prescribe la elipse de la maqueta (rx 17, ry 6,5), el favicon y los iconos de El huso a `?v=5` y el logo de las tarjetas a 39 px; el build usa el corte de Bruno, favicon e iconos nuevos a `?v=6`, sin `favicon.svg` en el `<head>`, y el logo de las tarjetas a 50,4 px. `logo-i-disco.mjs` se cae («El `d` de Logo.astro no trae ni la i dibujada ni la opción 2»), así que el criterio 21 no se puede verificar como está escrito. Tampoco están en la spec las dos secciones nuevas de `/nosotros/` («De dónde sale SpindleLab», «Cómo trabaja») ni «Quién está detrás» en cuatro párrafos (la fila 6 dice dos; Diego anotó que a 32 px entre párrafos se lee en bloques sueltos, `capturas-qa-30oct/08`). Todo **declarado** por Diego (desvíos 1, 2, 3 y 5), por eso no es mayor | Skill de QA, paso 4; el contrato es la spec | Lucía escribe en §5.4 y §6.21 lo construido (con los números de Bruno y de Diego), corrige `logo-i-disco.mjs` para que mida el `d` de hoy, confirma o corrige las secciones de `/nosotros/` y decide el aire de «Quién está detrás». Antes del corte |
| 5 | Clara (Ramón confirma el hecho) | Home (entradilla, Soluciones), description, `#org`, `llms.txt` | «con un panel para que edites tú» va pegado a «Desde una página de campaña…» y a «Desde $390.000 + IVA». En `/servicios/desarrollo-web/` el único plan que lista «Blog o CMS que administras tú» es el Sitio Completo (desde $1.190.000), y el glosario de esa misma página define «CMS: el panel donde cambias textos…». Página de Campaña y Sitio Esencial no lo listan. El sitio de `main` sí decía que todo sitio trae panel («Un panel para editar textos e imágenes tú mismo»), así que no lo cuento como afirmación sin respaldo, pero el v3 se contradice consigo mismo en lo que incluye el precio de entrada (`capturas-qa-30oct/09`) | Brief §6.4 y guía §3 (lo que se promete, por escrito y sin contradicción); «se dice una vez y en todas partes igual» | Ramón confirma si todo plan trae panel. Si sí, la lista de cada plan lo dice; si no, la home no junta el panel con los $390.000 |
| 6 | Clara (decide Ramón) | Home, «Probado primero en lo nuestro» | «lo **corrí** sobre **mi** propio sitio… **encontré**… lo **corregí**»: la única primera persona singular de la home, sin sujeto, en una página donde Ramón aparece en tercera persona y la marca en plural. 2 de 3 lectores lo notan (L2 «pasa a decir "lo corrí sobre mi propio sitio", de golpe en primera persona»; L3 «hablan en "nosotros" pero también en "yo", y parece una persona sola»). Declarado por Clara (§5.3) | Antislop A7 (tratamiento consistente en toda la página); lectura en frío | Ramón elige entre las dos que propuso Clara (plural, o el hecho atribuido a él en tercera persona) |
| 7 | Clara (decide Ramón) | Home, entradilla y párrafo de la sección 2 | Dicen la misma lista dos veces seguidas: «El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección» y, un bloque después, «El anuncio en Google, el post en Instagram, la respuesta de ChatGPT… Todos mandan a la persona al mismo lugar». A 390 quedan a unos 150 px. Leída en voz alta, la segunda suena a eco. Ningún lector lo citó. Clara me lo dejó para juzgar (§3.4) | Antislop A10 y prueba de fuego «en voz alta» | Una de las dos dice la lista; la otra la da por dicha («Todo eso termina en el mismo lugar: tu sitio…»). Las dos son de Ramón: elige él |
| 8 | Clara | Home, sección 2, «En tu sitio» | «Google y las IA pueden **leerlo** y **citarlo**.» «Leer» es la palabra que en la ronda 1 de E13 tropezó 3 de 3 y que la ronda 2 unificó en todo el sitio a «visitar y entender»; y «citarlo», a tres secciones de «no mide si hoy te citan» y «no garantiza que te nombren», es lo más cerca de una promesa que tiene la home. Esta vez ningún lector la citó. Declarado por Clara (§3.5) | `ronda-2-correcciones.md` («se dice una vez… y en todas partes igual») | «Google y las IA pueden visitarlo y entenderlo», o la versión que Ramón prefiera, sin el verbo que el sitio ya retiró |
| 9 | Clara (y Diego para el de `/contacto/`) | Los `mailto` preescritos: 25 páginas con asunto «Quiero mi revisión gratis» (`comun.json`, `home.json`) y `/contacto/` con asunto «Revisión de mi sitio» y cuerpo «Hola, mi sitio es: » | No le sirven a quien no tiene sitio, que es el segundo camino que abrió el 30-oct. Además el de `/contacto/` está escrito en código (`interiores.mjs:343`), no en el JSON de Clara | La regla de la obra: el texto vive en `e13/texto/*.json`; el recuadro de los dos caminos | Clara escribe un asunto que sirva a los dos («Hablemos de mi sitio»), Diego lee el de `/contacto/` desde el JSON |
| 10 | Clara | `/contacto/`, el formulario | Quien no tiene sitio escribe «no tengo» y puede mandar sin decir qué vende: el único campo donde cabe es el opcional. Lo que se le promete («te decimos cómo lo haríamos y cuánto cuesta») necesita saberlo. El formulario no se toca (`name` y `action`), pero sí su texto | La línea de `/contacto/` («cuéntanos qué vendes») y el paso 1 | La ayuda del campo del sitio o la etiqueta del mensaje lo pide: «Si todavía no tienes sitio, escribe "no tengo" y cuéntanos abajo qué vendes» (o la que Clara prefiera). Solo texto |
| 11 | Diego (con Lucía) | `/servicios/` | El sitio a medida va **tercero** («03 Sitio web a medida») mientras la home lo pone primero como el eje. Lo fija `ORDEN` de `servicios.mjs` y su guardián; declarado por Clara (§2) | La decisión de Ramón (el sitio primero, lo demás conectado) | Diego y Lucía mueven el orden (y el «Siguiente») o dejan escrito por qué el índice va en otro orden |
| 12 | Clara | `herramientas/barrer-terminos.mjs` y `guia-para-roles.md` §3 | La regla «posicionamiento anterior» marca 3 veces la description nueva que eligió Ramón («Diseñamos y programamos sitios a medida…»): falsos positivos que entrenan a ignorar el barrido. Declarado por Clara | El barrido tiene que dar 0 en lo aprobado | Poner al día la regla y la guía con el posicionamiento del 30-oct |
| 13 | Diego | `lista-publicacion.md` §3.11 | Sigue diciendo «confirmar que la fecha que dice `/diagnostico/` («1 de diciembre de 2026») sigue vigente», y la frase ya no es esa: ahora fecha el 28-oct y dice que lo revisa la Cámara. Si la Cámara lo despacha o la ley se publica antes del corte, la frase queda vieja | El paso del corte tiene que describir lo que hay que mirar | El paso dice: releer la ficha del boletín 18.623-07 (la URL de arriba) y la frase de `/diagnostico/` el día de publicar; si cambió, Clara la corrige |
| 14 | Diego | `/404.html`, `/privacidad/` y `/favicon.ico` en la raíz de `public/` | Siguen con el favicon del v2 (`/assets/img/`), el punto dorado incluido. Al publicar en la raíz, `/favicon.ico` es el que piden los navegadores donde no hay `<link>`. Declarado por Diego | Un solo logo | Copiar el `favicon.ico` de Bruno a la raíz en el corte (`armar-corte.mjs`) y decidir si `/404.html` y `/privacidad/` apuntan a los de `/v3/marca/` |
| 15 | Clara | `e13/texto/home.json` | `home.portada.chequeo` y `home.quien.cv` ya no se leen. Declarado por los dos | Copias con huella limpias | Borrarlos, `extraer-texto.mjs home` y `--comprobar` |

### Desvíos no declarados

Ninguno. Comparé `git diff --stat 9039b521 HEAD -- spindlelab-astro` (29 archivos) con los dos `desvios/*-30oct.md`: cada archivo del sitio está en una de las dos tablas. El peso (mayor 1) no es un desvío del código sino una medición que nadie hizo.

## Cumplimiento de lo que pidió Ramón el 30-oct

| Pedido | Resultado |
|---|---|
| Rótulo, h1 en dos tintas, entradilla, botón, microcopy y enlace secundario de la portada | **Cumple**, texto exacto; el enlace va a `/servicios/desarrollo-web/`; el botón del encabezado dice «Hablemos» y va a `/contacto/` |
| Botón principal y del encabezado en `#FFE800` con texto `#060606`, solo esos dos | **Cumple**: 2 en la home, 1 en las otras 20, 0 en `/contacto/`; el cierre, «Enviar», «Saltar al contenido» y el aviso siguen como estaban |
| Sección 2 (h2, párrafo, dos columnas, cierre) | **Cumple**, texto exacto; filetes alineados fila a fila desde 834, apiladas bajo 834 con «En redes» primero, sin caja ni fondo (`capturas-qa-30oct/07`) |
| Para quién, «Si estás partiendo…» | **Cumple**: reemplaza el p2, no repite |
| Soluciones con el sitio primero, precios sin cambio | **Cumple** en la home (ver menor 5 y, en `/servicios/`, menor 11) |
| Pregunta nueva primera y `FAQPage` igual | **Cumple**, 6 de 6 |
| Quién está detrás en tercera persona, sin nombres de agencias o clientes, sin explicar el nombre, tres reglas en plural | **Cumple**. Los hechos coinciden con el texto base y con sus fuentes (`nosotros.json`, ids de trayectoria, y `git show 2db3d18:…/texto-obra.json`); p3 se reescribió para no decir que todas las herramientas son suyas (declarado) |
| `/nosotros/` en el mismo tono, más extenso | **Cumple** (h1 nuevo de Clara, declarado; «Detrás de SpindleLab está Ramón Vallejos…»; botones «Hablemos de tu sitio»). «Una aerolínea regional» va generalizada y con fuente; es casi identificable en Chile, y lo dejo a Ramón |
| `/contacto/` (h1, línea, ayuda, confirmación, paso 2, «Enviar») | **Cumple**, texto exacto; el gris del h1 es de Clara (declarado) |
| Señales (title, description, `jobTitle`, `#org`, `llms.txt`, imágenes al compartir con `?v=` nuevo) | **Cumple.** Title de 51; description de 157 (Ramón dijo «y conectamos a ellos», quedó «y les conectamos» por el tope de 160: declarado, lo confirma Ramón); `jobTitle` «Fundador de SpindleLab: sitios web a medida y marketing con IA» en las 22; `#org` «Sitios web a medida y marketing con IA: diseñamos y programamos el sitio…»; `llms.txt` al día; `og-e12-marca`, `-nosotros` y `-contacto` a `?v=3`, cada una con su h1 (`capturas-qa-30oct/06`) |
| Ley 21.719 calificada donde se nombra | **Cumple**, verificada contra la ficha |
| Logo opción 2 | **Cumple** en el encabezado, el pie, el favicon y los iconos; **no** en 19 tarjetas (mayor 2); la spec no lo recoge (menor 4) |
| Lo que no se toca (gtag, consentimiento, Pixel, `functions/`, `_headers`, `_redirects`, `public/js/`, `v3-contacto.js`, `action` y `name` del formulario, precios) | **Cumple**: 0 bytes de diferencia y formulario idéntico |

## Lectura en frío (criterio 4 del brief)

Tres lectores aislados (`claude -p` en un directorio vacío, sin herramientas, skills, MCP, ajustes ni CLAUDE.md; una conversación por lector; los mismos tres perfiles de E13: consultora, clínica, restaurante) sobre el texto de **`/` y `/contacto/`** tal como se ve en el build. **Cambié una cosa de las instrucciones y lo digo:** sumé la pregunta G («¿Quién está detrás… y qué impresión te deja esa persona? ¿Le confiarías tu sitio?»), porque «Quién está detrás» es lo que Ramón pidió revisar. Son personas simuladas por un modelo, no clientes: sirven para ver dónde se tropieza, no para medir conversión. Íntegro en `lectura-fria/30oct/`.

**Lo sustancial está bien:** los tres dicen qué hace SpindleLab con sus palabras («hacen sitios web a medida y después te conectan Google, anuncios y redes»), se reconocen en el «para quién», saben que el primer paso es mandar la dirección y que es gratis y en un día hábil, y los tres harían eso. En `/contacto/` nadie tropieza con el formulario ni con los dos caminos.

**Quién está detrás (pregunta G):** los tres lo leen **serio** («una impresión seria: viene de agencias grandes, tiene estudios y habla de dónde se pierde la plata»; «seria y honesta, sin humo, y que tiene oficio de pauta»; «un tipo serio y ordenado»). Ninguno lo describe como creativo o innovador (no se les preguntó con esas palabras). Dos de tres le confiarían «una revisión, no todavía el sitio» y uno «de a poco, partiendo por la revisión y una fase». Lo que frena es «agentes de IA» (mayor 3a) y que parezca una sola persona. L3 lee como «discurso de venta» la frase de p2 «casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva» (1 de 3).

| Tropiezo | Ronda 1 E13 | Ronda 2 E13 | 30-oct | |
|---|---|---|---|---|
| «agentes de IA» | 3 de 3 | 2 de 3 | **3 de 3** (2 entre sus tres frenos) | Mayor 3a |
| Rótulo «marketing con IA» | no existía | no existía | **2 de 3** | Mayor 3b |
| «sin plantillas ni WordPress» | 2 de 3 | 0 de 3 | **2 de 3** | Mayor 3c |
| «lo corrí sobre mi propio sitio» (yo suelto) | «SpindleLab soy yo», 3 de 3 | 3 de 3 | **2 de 3** | Menor 6 |
| «Si te vas, tus seguidores se quedan» | | | 1 de 3 lo lee al revés | Nuevo, leve |
| «Le conectamos lo demás» / «Tu sitio es lo único que es tuyo» | | | 1 de 3 cada uno (L3: «mis reservas llegan por redes») | Nuevo, leve |
| «Search Console», «Auditoría SEO técnica», «Paid Media (Google)», «Visibilidad en IA» (no garantiza), «21 chequeos… puntos», Verifica y Cumple y la ley, el único caso «no de crecimiento de ventas», los precios «desde» | | escalados a Ramón | 2 a 3 de 3 cada uno | Siguen igual que en E13; el 30-oct no los tocó. No los cuento de nuevo |

## Detector anti-slop (`antislop-web.md` §E y `refero-design/references/anti-ai-slop.md`), sobre lo que cambió

```
COPY       [x] sin verbos de folleto (0 impuls/potenci/transform/maximiz/revolucion)
           [x] sin relleno de apertura: el h1 entra en materia
           [x] sin tricolon automático: las listas de la sección 2 son hechos distintos, no ritmo
           [x] sin «no solo X sino Y»: «No te decimos que dejes las redes: también las gestionamos» es contraste real
           [x] sin «¿Listo para…?»; una pregunta nueva (la de Instagram), y es la objeción que responde la página
           [~] sin Title Case: lo nuevo no; siguen los nombres de plan de E13 (defecto 12 de E13, decisión de Ramón)
           [~] registro consistente: tuteo en todo, 0 voseo; un «yo» suelto en la home (menor 6)
           [x] sin raya como remate (0 en todo lo publicado)
           [x] cero prueba social sin respaldo: 0 agencias, clientes, cifras; cada hecho de «Quién está detrás» con fuente
           [~] borrar 30 % no mejora la página: la home sí mejora si se borra el eco entre entradilla y sección 2 (menor 7)
ESTRUCTURA [x] sin tarjetas idénticas: la sección 2 son dos listas con filete, sin caja
           [x] sin «¿por qué elegirnos?»: las tres reglas son compromisos verificables (por escrito, antes de cobrar)
           [x] FAQ con preguntas reales: la nueva es la objeción que Ramón eligió responder
           [x] sin fila de métricas  [x] formulario mínimo (sin cambios)
           [x] hero no es 100vh centrado vacío: asimétrico, con la acción a la vista en los 11 tamaños
           [x] orden de secciones justificado: el sitio como eje primero, después lo que se conecta
CÓDIGO     [x] landmarks, un h1, 8 h2, sin saltos  [x] 0 comentarios HTML servidos en la home
           [x] cero valores por defecto: los 3 tokens nuevos y `.int-par` salen de la spec (§1.1, §12.2)
           [x] sin degradé-mancha ni vidrio nuevos  [x] cero emoji
           [x] alt reales (sin cambios de imagen salvo las tarjetas; su alt es «SpindleLab: » + h1)
           [x] foco visible, contraste AA, labels (y la ayuda del campo enlazada por aria-describedby)
           [~] imágenes dimensionadas, hero eager, font-display: sin cambios; **peso sobre el tope (mayor 1)**
           [x] JSON-LD + canonical + OG + title propio en las tres páginas que cambiaron
           [~] ?v=N subido: sí en iconos (v=6) y en las 3 tarjetas (v=3); 19 tarjetas con el logo anterior (mayor 2)
VISUAL     [x] refero #1 sin índigo  [x] #2 sin tarjetas por defecto  [~] #3 oscuro: lo pidió el brief (A · Archivo)
           [x] #5 sin emoji  [x] #6 sin franja lateral  [x] #7 una referencia (Koto) por pieza: su amarillo, con su rol
           [x] #8 rol del token conservado: el amarillo de Koto es solo acción, medido en las 22 rutas (0 fuera de los dos botones)
           [x] MAYÚSCULAS con letter-spacing (0,03 em en los botones)
PRUEBAS    ver abajo
```

## Pruebas de fuego

- **Logo tapado:** pasa mejor que el 26-oct. Sin logo ni menú, la primera pantalla dice qué se vende («Sitios web a medida y marketing con IA», «En redes arriendas. Tu sitio es lo único que es tuyo.») y el amarillo lleno es un rasgo que no tiene ninguna consultora del rubro. El video del hilo, solo, sigue pudiendo ser de cualquier empresa tecnológica.
- **Rubro cambiado:** pasa en la sección 2 (antes era un párrafo sin forma): «En redes» contra «En tu sitio» es el argumento de este negocio y no calza en una clínica ni en una inmobiliaria. El resto (filas con filete) sigue siendo una composición que cualquier rubro llenaría.
- **Leído en voz alta:** el h1 suena a una persona en una reunión. Tropiezan, en este orden: el eco de la sección 2 (menor 7); «Detrás de SpindleLab está Ramón Vallejos: sitios web a medida y marketing con IA» (los dos puntos pegan a una persona con una línea de negocio y se lee como etiqueta; observación); p1 de «Quién está detrás», 43 palabras en una oración que es una lista. Ningún adjetivo de venta: el peso sale de los hechos, como pidió Ramón.

## Lo que está bien (y no hay que perder al corregir)

- **La primera pantalla con el aviso abierto:** el botón amarillo entero y sin nada encima en los 11 tamaños de la obra, y a 360 × 800 y 390 × 844 con 181 y 227 px de holgura y el microcopy y el enlace a la vista (`capturas-qa-30oct/01`). Lucía, Diego y yo medimos lo mismo con herramientas distintas.
- **El amarillo con su rol:** dos botones, 16,20 · 13,39 · 11,03:1 en sus estados, foco a 20:1, y en ningún otro lugar de 22 rutas. Es exactamente la regla de la spec.
- **La sección 2:** filetes alineados al píxel entre columnas desde 834 y un guardián en el build que corta si cambian las filas (`capturas-qa-30oct/07`).
- **El logo a tamaños chicos:** la i se lee i a 16 px a 1x, con una fila limpia entre el disco y el asta, y el favicon de 16 dibujado a mano con tres filas limpias y fondo opaco (`capturas-qa-30oct/04`).
- **La capa de veracidad:** 0 agencias ni clientes, cada hecho de la biografía con su fuente, `FAQPage` igual en 16 páginas, precios idénticos y la frase de la ley exacta contra la ficha del Senado.
- **UTM y formulario:** 12 de 12 recorridos con clic real y el formulario idéntico a `main`, también con «no tengo».

## Lo que no pude medir

- **Safari, Firefox y un iPhone real** (ni el favicon en su pantalla de inicio): solo Chromium.
- **Red real:** todo contra un servidor estático local, sin `_headers`, redirecciones ni Brotli de Cloudflare; el peso es sin comprimir, la misma base que las actas de E13.
- **Node 20** (producción); el envío real del formulario, GA4 y Meta; los enlaces externos; un lector de pantalla.
- **Verifica y Cumple** (`verifica.spindlelab.cl`) y su texto de la ley: no está en este repositorio.
- **El chequeo propio** (`chequear()` de `functions/api/chequeo.js` sobre el build): no lo corrí; el 30-oct no cambió las señales que mide salvo textos y el `logo` de `#org`.
- **A ojo:** `/servicios/` y cualquier ruta a 768; de esas tengo desborde, `verificar` y texto.

## Decisiones que son de Ramón (no son defectos)

1. Si publica con 19 tarjetas con el logo anterior (mayor 2) o se regeneran antes.
2. Las tres frases del mayor 3, sobre la propuesta de Clara, y el «yo» de «Probado primero en lo nuestro» (menor 6).
3. Si todo plan trae panel (menor 5).
4. La description de 157 caracteres («y les conectamos»).
5. El h1 de `/nosotros/` («Construimos el sitio como eje y le conectamos lo demás.», de Clara) y el gris del h1 de `/contacto/` («Del que ya tienes o del que todavía no.», de Clara).
6. «El código de cada entrega lo revisa y lo aprueba él» vale también para las entregas a clientes (Clara, §5.2).
7. «Una aerolínea regional» en `/nosotros/`: generalizada y con fuente, pero en Chile casi identifica al cliente.

## Evidencia en el repositorio

- `e13/capturas-qa-30oct/` (9 JPEG, de 30 a 133 kB): `01` y `02` primera pantalla con el aviso abierto (bien); `03` el foco de los dos botones amarillos (bien); `04` el logo a 16, 24 y 48 px y los favicon e iconos (bien); `05` dos logos en las tarjetas al compartir (mayor 2); `06` las tres tarjetas regeneradas (bien); `07` la sección 2 y «Para quién» a 1440 (bien; menor 7); `08` «Quién está detrás» a 1440 (menor 4, el aire entre párrafos); `09` Soluciones con el panel y el precio de entrada (menor 5).
- `e13/lectura-fria/30oct/`: `entrada.txt` (el texto de `/` y `/contacto/` del build), `instrucciones.txt` (con la pregunta G), `lector-1..3.txt`, `lectores.json`.
- Mis herramientas (`desborde.mjs`, `primera.mjs`, `amarillo.mjs`, `tab.mjs`, `logo.mjs`, `enlaces.py`, `utm.mjs`, `formulario.mjs`, `jsonld.mjs`, `peso.mjs`, `capturas.mjs`) y sus salidas quedaron en el scratchpad de la sesión (`…/scratchpad/javiera-30oct/`), que se borra al reiniciar: lo que importa está en esta acta.

---

# Vuelta 2 · 30-oct-2026, tarde

> La escribe Javiera (`/web-qa-critico`) en contexto limpio (subagente). Leyó lo que se pidió el 30-oct, la vuelta 1 de esta acta, `desvios/construccion-30oct.md` §5 a §7 (lo que hizo Diego con lo de Clara, Lucía y Bruno), `desvios/texto-30oct.md`, la fila del 30-oct de `spec-visual.md` §7 y §5.4, y `spec-home.md` §6 (criterios 10, 21 y 22). No vio cómo se arregló. No arregló nada: escribe esta sección, las capturas `10` a `13` de `capturas-qa-30oct/` y `lectura-fria/30oct-v2/`.

**Rama:** `claude/magical-franklin-ckfki2` · **Commit auditado:** `4d794419` (árbol limpio), sacado con `git archive` a una copia en el scratchpad y construido con `npx astro build`: **22 páginas en 3,68 s, 0 errores, 0 avisos**, más `/privacidad/` y `404.html` estáticas. Node v22.22.0, Chromium 1194 de Playwright, servidor estático local. Para calibrar el peso volví a servir los dos `dist` de la vuelta 1 (`a84a1381` y `9039b521`). `origin/main` sigue en `840dc024`. **Ronda:** segunda y última vuelta interna; lo que siga vivo va a Ramón, no a una tercera.

## Veredicto de la vuelta 2

**APROBADO CON REPAROS.**

Lo que el equipo podía cerrar está cerrado y lo medí: **la home vuelve bajo el tope de peso** (1.398,9 kB primera carga a 1440, en tres corridas iguales, con la herramienta calibrada contra los dos builds de la vuelta 1), **las 22 tarjetas al compartir llevan la i con su disco** (la franja del logo de las 20 de texto es idéntica píxel a píxel a la de `og-e12-marca.jpg`, la que se aprobó en la vuelta 1, y las 19 rehechas subieron su `?v=`), la spec dice lo construido y sus herramientas salen con 0, `/servicios/` pone el sitio primero en lo visible, en el `ItemList` y en los «Siguiente», y los textos de oficio (8, 9, 10, 12, 13, 14, 15) están en el `dist`. **Ninguna regresión**: primera pantalla, amarillo, foco, logo, desborde, `verificar`, enlaces, UTM, formulario, JSON-LD, precios y protegidos dan lo mismo que en la vuelta 1 o mejor. **Ningún defecto nuevo.**

**El reparo, con nombre y plazo:** siguen abiertos el **mayor 3** (la lectura en frío tropieza en tres frases) y los **menores 5, 6 y 7**. No son de oficio: el texto o el hecho son de Ramón, y Diego los dejó escritos como preguntas con las versiones de Clara (`desvios/construccion-30oct.md` §6). **Plazo: Ramón contesta antes de armar el corte** (`armar-corte.mjs`, lista de publicación). Lo que cambie pasa por una **QA exprés**: `extraer-texto.mjs`, build, `verificar` a 390 y 1440, **peso de la home** (quedan **1,1 kB** de margen: casi cualquier frase que se sume lo cruza) y una lectura en frío de la home. Si Ramón decide publicar con las frases como están, lo dice por escrito y el mayor 3 queda como decisión suya, no como defecto.

Conteo de la vuelta 2: **0 bloqueantes · 1 mayor abierto (3, decide Ramón) · 3 menores abiertos (5, 6 y 7, decide Ramón) · 0 nuevos.** Cerrados en esta vuelta: **mayores 1 y 2; menores 4, 8, 9, 10, 11, 12, 13, 14 y 15.**

## Cómo se verificó (vuelta 2)

| Qué | Comando o herramienta | Resultado |
|---|---|---|
| Texto con huella | `node e13/herramientas/extraer-texto.mjs --comprobar` (en el repo) | **16 de 16 «igual»**, sale con 0 |
| Build | `npx astro build` sobre la copia de `4d794419` | 22 páginas, 0 errores, 0 avisos; pasan los guardianes de precios, nombres, largos, `.int-par`, el orden de servicios, los «Siguiente» y el nuevo del `mailto` de `/contacto/` |
| `verificar` | `node scripts/verificar.mjs --excluir /privacidad/` y `… --ancho 1440` | **«Sin hallazgos»** a 390 y a 1440, 22 páginas, sale con 0 (6 nodos sobre imagen: la portada, igual que antes) |
| Desborde | mi `desborde.mjs`: 22 rutas + `/privacidad/` × 360, 390, 768, 1024, 1440 y 1920, medido en la página | **0 de 138** con desborde. Igual que en la vuelta 1: la tabla del artículo de los 21 chequeos dentro de su contenedor desplazable (360 a 768) y `/privacidad/` con dos `h1` (es la de `main`) |
| Primera pantalla | mi `primera.mjs` y `e13/herramientas/portada-30oct.mjs` sin `--inyectar` | **Idéntica a la vuelta 1 al décimo:** con aviso 181,2 · 227,2 · 231,5 · 54,6 px de margen a 360×800, 390×844, 768×1024 y 1440×900; sin aviso 333,8 · 360,9 · 346,3 · 123,6; **0 de 5 puntos tapados** en los 11 tamaños de la obra (320×568 sigue siendo la excepción de la spec §12.1). Encabezado plegado dentro de la placa en los 8 anchos |
| El amarillo y el foco | `primera.mjs` y `amarillo.mjs` (22 rutas + `/privacidad/` + `404.html`, a 390 y 1440, con y sin aviso) | Reposo 16,20:1, al pasar 13,39:1, apretado 11,03:1, 167 ms; foco 2 px blanco a 3 px. Home **2** botones amarillos, otras 20 rutas **1**, `/contacto/` **0**; ningún otro amarillo |
| Tab | `tab.mjs` por `/`, `/nosotros/` y `/contacto/`, 1440 y 390, con y sin aviso, Tab y Shift+Tab | 24 pasadas: **0 paradas sin indicador, 0 tapadas** |
| Logo | `logo.mjs` (16, 24 y 48 px, 1x y 2x, favicon e iconos) y `e13/herramientas/logo-i-disco.mjs` (rehecha por Lucía) | El `<svg>` del build es **byte a byte** el de la vuelta 1 y su render a 1x y 2x es **idéntico píxel a píxel**. `logo-i-disco.mjs` sale con 0: 24 px a 1x, disco en 4 filas (0,25 · 1 · 1 · 0,44) y 1 fila limpia; 20 px a 1x, 3 filas y 1 limpia; a 2x, 3 limpias |
| Letras que ya no se piden | mi `letras.mjs` (nueva): las 22 rutas × 390 y 1440 con el aviso abierto y después de «Rechazar» (que abre `#cookie-aviso`); primera familia computada de cada nodo con texto, caras cargadas y archivos de letra pedidos | **0 de 44** pasadas piden o dibujan Inter o Manrope. Familias en uso: Google Sans Flex y DM Mono, nada más. `#cookie-aviso` sale en Google Sans Flex. Solo `/404.html` y `/privacidad/` siguen enlazando `inter.css` (las estáticas de `main`, con su propio `<link>`) |
| Peso | mi `peso.mjs` (el de la vuelta 1, sin cambios): CDP, caché apagada, aviso contestado, 4 s tras `networkidle` | Ver defecto 1 |
| Tarjetas al compartir | `og:image` de cada ruta en el `dist`; comparación por píxel con PIL contra la versión de `a84a1381` y entre ellas; Read de la hoja | Ver defecto 2 y `capturas-qa-30oct/10` |
| Enlaces internos | mi `enlaces.py` sobre el `dist` | 24 páginas, **935 referencias, 0 que no resuelven, 0 anclas sin destino**. Son 40 menos que en la vuelta 1 (975) y cuadra: −44 por las dos hojas de letras en 22 páginas, +4 por los iconos de A en `/404.html` y `/privacidad/` (5 en lugar de 3 cada una). Diego cuenta 957 con otro alcance de atributos |
| UTM | mi `utm.mjs`: `/?utm_source=google&utm_medium=cpc&utm_campaign=qa30oct` y seis recorridos con clic real, con y sin aviso | **12 de 12** con los tres `#f-utm-*` llenos |
| Formulario | mi `formulario.mjs` (envío interceptado, «no tengo» en el sitio) y los campos contra `origin/main` | `action`, los 12 `name` en el mismo orden y los ocultos **iguales a `main`**. La ayuda nueva va enlazada por `aria-describedby`; con «no tengo» el envío pasa y sale «Listo. Te escribimos dentro de un día hábil.» |
| JSON-LD | mi `jsonld.mjs` (22 rutas del sitemap) | **44 bloques, 0 errores** (Diego cuenta 45 con `/privacidad/`). `FAQPage` igual a lo visible en las 16 páginas que lo tienen; home 6 de 6 con la de Instagram primera. `jobTitle` de `#autor-ramon`, uno solo en las 22: «Fundador de SpindleLab: sitios web a medida y marketing con IA». `logo` de `#org`: `icon-512.png?v=6`. `ItemList` de `/servicios/`: Desarrollo Web, Auditoría, Visibilidad, Paid Media, Redes, Acompañamiento. El `image` de cada `Article` del blog es su `og:image` (`?v=3`) |
| Agencias, clientes y frases que no van | `grep -rIoi` sobre todo el `dist` | **0** McCann, Graphene, IPG, Universal, LATAM, Incrementa, Maggiore, «ocho marcas», «cuatro países», «soy yo», «pocos proyectos», «Te llegan consultas», «Pedir la revisión de una página», «Dónde puede caerse», «spindle es», «huso», «leerlo y citarlo» |
| Barrido de términos y rayas | `node e13/herramientas/barrer-terminos.mjs <dist> --resumen` (30 archivos) | **0 rayas**, 0 «posicionamiento anterior», 0 «¿Listo para…?», 0 «sin compromiso», 0 promesa de citación. «agentes de IA» 3 (home y `/nosotros/`, donde vive). «mini-diagnóstico» 25 y «motor» 102 (el slug del artículo y «motores de IA»), como en la vuelta 1 |
| Precios | importes visibles y `price`/`minPrice`/`maxPrice` del JSON-LD, página por página, contra el `dist` de `a84a1381` (que la vuelta 1 ya comparó con `origin/main`) | **0 páginas distintas** (82 importes visibles, 15 en JSON-LD). `oferta-v3.json` y `servicios-v3.json` sin diferencias |
| Protegidos | `git diff origin/main -- spindlelab-astro/functions spindlelab-astro/public/_headers spindlelab-astro/public/_redirects spindlelab-astro/public/js` | **0 bytes.** Y contra `9039b521` y `a84a1381`, también `public/assets/js` (con `v3-contacto.js`): 0 bytes |
| `Layout.astro` | `git diff 9039b521 HEAD` y `git diff origin/main HEAD`, filtrando gtag, consentimiento y Pixel | **No es solo lo de E13:** trae 4 líneas más, el ramal `letras` sin las dos hojas (mayor 1, la opción (a) que propuse en la vuelta 1). **gtag, consentimiento y Pixel: idénticos** a los de E13 (las únicas diferencias con `main` en esos bloques son los comentarios `<!-- -->` pasados a `{/* */}`, que ya traía E13). Declarado por Diego («autorizada por la orquestadora»); esa autorización no está escrita en el repositorio: ver «Decisiones de Ramón» |
| Ley 21.719 | `grep` de «21.719», «diciembre», «vigencia» en el `dist` y `llms.txt`; la ficha del boletín releída por mí: `curl https://tramitacion.senado.cl/wspublico/tramitacion.php?boletin=18623` (30-oct, 16:37 UTC) | Se nombra en las mismas 7 rutas. **Solo `/diagnostico/` da fecha, y calificada**; 0 «entra en vigencia». La ficha es **byte a byte la de la vuelta 1** (28-oct aprobado en general y particular, 29-oct oficio a la Cámara, segundo trámite, sin número de ley ni Diario Oficial): la frase sigue exacta |
| Lectura en frío | `e13/herramientas/lectura-fria-texto.mjs` (el texto de `/` y `/contacto/` del build) y `lectura-fria.py` (`claude -p` en directorio vacío, sin herramientas, skills, MCP ni ajustes; una conversación por lector), con las mismas instrucciones de la vuelta 1 (pregunta G incluida) | Ver «Lectura en frío, vuelta 2». La entrada difiere de la de la vuelta 1 en **dos líneas** (la de «visitarlo y entenderlo» y la ayuda del campo) más la hora del encabezado. Íntegro en `lectura-fria/30oct-v2/` |
| Capturas | mi `cap-v2.mjs` (por sección) y las hojas de tarjetas | `/servicios/` a 1440 entera hasta el cierre, «Quién está detrás» a 1440, la sección 2 a 1440, el formulario de `/contacto/` a 390 y las 22 tarjetas: **miradas** |

## Los defectos de la vuelta 1, uno por uno

| # | Sev. | Dueño | Estado | Qué medí |
|---|---|---|---|---|
| 1 | Mayor | Diego | **Cerrado** | **1.398,9 kB** primera carga a 1440 (tope 1.400), **1.561,7** recorrida (tope 1.600), **755,6** a 390 (tope 950); **tres corridas, el mismo número al décimo**. Calibración con la misma herramienta: `a84a1381` 1.402,1 y `9039b521` 1.399,0, los números de la vuelta 1: la diferencia es real y no ruido. La home pide 14 respuestas (antes 16: las dos hojas). Que sacar las hojas no cambió nada a la vista lo medí aparte (`letras.mjs`: 0 de 44). **Queda 1,1 kB de margen**: es la condición del reparo |
| 2 | Mayor | Diego (corte de Bruno) | **Cerrado** | Las 22 rutas apuntan a su tarjeta con **una sola versión**; las 19 rehechas subieron uno (`?v=` de 1→2, 2→3 o 3→4) y las 3 de la vuelta 1 siguen en `?v=3` sin cambiar el archivo; **0 referencias a versiones viejas**. La **franja del logo** de las 20 de texto es **idéntica píxel a píxel** (media 0,00, máximo 0) a la de `og-e12-marca.jpg`, y la de `/trabajo/` a la de Combeau. **Fuera del logo**, contra la versión de `a84a1381`: media 0,00 en 6 y 0,59 a 1,84 en 13, con las diferencias solo en el borde de las letras (mismo texto, otro suavizado). 24 a 66 kB cada una. `capturas-qa-30oct/10` |
| 3 | Mayor | Clara propone, **decide Ramón** | **Abierto** | No se tocó (§6.1 de `construccion-30oct.md`, con A1/A2, B1 a B3 y C1/C2). Re-medido en la lectura en frío: «agentes de IA» **3 de 3** otra vez (para 1 de 3 entre sus tres frenos: L2 «dependencia de una sola persona y de la IA»; L3 «¿quién me hace el sitio, entonces?»); el rótulo «marketing con IA» **1 de 3** (antes 2); «sin plantillas ni WordPress» **3 de 3** (antes 2). Es la cuarta lectura en que tropieza «agentes de IA». **Ya está escalado con diagnóstico**; no vuelve a una vuelta interna: se cierra con la elección de Ramón y la QA exprés |
| 4 | Menor | Lucía | **Cerrado** | `spec-visual.md` §5.4 dice lo construido (el `d` de Bruno, `?v=6`, sin `favicon.svg` en el `<head>`, `/favicon.ico`, las 22 tarjetas a 50,4 y 36,0 px), §2.1 fila 6 (cuatro párrafos, 16 px), §2.4 (`/nosotros/` confirmado, `/servicios/`) y fila nueva en §7; `spec-home.md` criterios 21 y 22. Corrí sus herramientas: `logo-i-disco.mjs` sale con 0 y `quien-aire-30oct.mjs` da **16 · 16 · 16 px** entre párrafos a 390 y 1440. La biografía se lee como un bloque (`capturas-qa-30oct/12`). Alto de la home 7.459 a 1440, 7.423 a 1024, 9.417 a 768 y 9.012 a 390, bajo sus techos |
| 5 | Menor | Clara, **Ramón confirma** | **Abierto** | No se tocó (§6.2). En la lectura en frío, L2: «con un panel para que edites tú: no sé si lo voy a poder usar yo». La contradicción con la lista de planes de Desarrollo web sigue igual |
| 6 | Menor | Clara, **decide Ramón** | **Abierto** | No se tocó (§6.3). «lo corrí sobre mi propio sitio»: **2 de 3** lo notan otra vez (L2 «de repente hablan en "yo"», L3 «no sé quién habla») |
| 7 | Menor | Clara, **decide Ramón** | **Abierto** | No se tocó (§6.4). 0 de 3 lectores notan el eco (como en la vuelta 1); en voz alta sigue sonando a eco |
| 8 | Menor | Clara | **Cerrado** | «Google y las IA pueden visitarlo y entenderlo.» en la home; «leerlo y citarlo», 0 en el `dist`; 0 de 3 lectores tropiezan. A 1194 y 1440 la frase pasa a dos líneas y los filetes de las dos columnas siguen alineados (desfase 0 · 0 · 0, `portada-30oct.mjs`). Cambio de oficio: Ramón lo puede devolver. `capturas-qa-30oct/13` |
| 9 | Menor | Clara y Diego | **Cerrado en la obra** | `mailto` en el `dist`: **23** con «Hablemos de mi sitio» (los 22 pies y el cierre de la home) y **1** en `/contacto/` con asunto y cuerpo («Hola.» / «Mi sitio: » / «Lo que vendemos: »), leído del JSON de Clara; el build cae si no apunta al correo con su asunto. Quedan **2** con «Quiero mi revisión gratis», en los pies de `/404.html` y `/privacidad/`: las estáticas de `main`, fuera de la obra, declarado por Diego (§7). Anotado abajo como observación |
| 10 | Menor | Clara | **Cerrado** | La ayuda dice «Si todavía no tienes sitio, escribe «no tengo» y cuéntanos abajo qué vendes.», enlazada por `aria-describedby`; el formulario es el de `main` campo por campo; «no tengo» pasa. `capturas-qa-30oct/13` |
| 11 | Menor | Diego con Lucía | **Cerrado** | `/servicios/` a la vista: «01 Sitio web a medida», «02 Búsqueda y visibilidad en IA», «03 Anuncios en Google y redes», «04 Acompañamiento mensual»; el `ItemList` en ese orden; «Siguiente» en ciclo Desarrollo web → Auditoría → Visibilidad → Paid Media → Redes → Acompañamiento → Desarrollo web. La entradilla («Partimos por el sitio y le conectamos lo demás») y el orden dicen lo mismo. `capturas-qa-30oct/11` |
| 12 | Menor | Clara | **Cerrado** | «posicionamiento anterior»: **0** en `4d794419`. La regla nueva sí encuentra **1** en el `dist` de `a84a1381` (el pie viejo de `/privacidad/`, que esta vuelta cambió): deja de dar falsos positivos y sigue atrapando lo anterior. `guia-para-roles.md` §3 al día |
| 13 | Menor | Diego | **Cerrado** | El paso 3.11 de `lista-publicacion.md` pide releer la ficha del boletín (con la URL) y compararla con la frase de `/diagnostico/`, citada, el día de publicar |
| 14 | Menor | Diego | **Cerrado** | `/favicon.ico` del `dist` tiene el mismo md5 que `/v3/marca/favicon.ico` y que `e13/logo/favicon.ico` (tres PNG de 16, 32 y 48). `/404.html` y `/privacidad/` enlazan los cinco iconos de A a `?v=6`, y los cinco resuelven. `armar-corte.mjs`: `node --check` bien; no lo corrí (es del día de publicar) |
| 15 | Menor | Clara | **Cerrado** | `home.portada.chequeo` y `home.quien.cv` no los lee ningún `.astro` ni `.mjs`; solo quedan nombrados en las notas de `borrado` de `home.json`. `--comprobar` 16 de 16 |

### Desvíos no declarados (vuelta 2)

Ninguno. Los 37 archivos del sitio que tocó `4d794419` (código, textos, las 19 tarjetas, `favicon.ico`, `404.html`, `privacidad/`, `Layout.astro` y `archivo.css`) están en la tabla de §5 de `construccion-30oct.md`, cada uno en el defecto que lo motivó. El cambio de nombre de los `hoisted.*.js` y del CSS en `_astro/` es consecuencia de la regla nueva de `archivo.css` (el contenido de los scripts es el mismo salvo el nombre que importan).

### Observaciones (no son defectos; quedan anotadas)

- **Peso al límite.** 1,1 kB de margen. Lo siguiente que pesa sin aportar, según Diego, es el logo en línea dos veces (spec-home, criterio 10). Cualquier cambio de §6 se vuelve a medir antes del corte.
- **`/404.html` y `/privacidad/`** siguen siendo páginas del v2 (encabezado y logo con el punto dorado, `inter.css`, pie con «Quiero mi revisión gratis»). Esta vuelta les cambió los iconos y, en `/privacidad/`, la línea de marca. Rehacerlas en A es otra obra.
- **El campo del mensaje sigue diciendo «(opcional)»** mientras la ayuda del campo del sitio le pide a quien no tiene sitio que cuente ahí qué vende. Ningún lector tropezó. Si Ramón quiere apretarlo, es texto de la etiqueta, no del formulario.
- **`armar-corte.mjs` avisa pero no se detiene** si `/favicon.ico` no es el de Bruno. Hoy lo es en la rama; `/favicon.ico` no lleva versión, así que un navegador que ya tenía el viejo puede mostrarlo un tiempo (declarado por Diego).
- **«Cookies: rechazadas»** en el pie: 2 de 3 lectores no entienden qué hace ahí. Es el mismo texto de E13 y de la vuelta 1, donde nadie lo citó: lo tomo como variación entre lectores simulados, no como algo que cambió.

## Lectura en frío, vuelta 2 (criterio 4 del brief)

Los mismos tres perfiles de la vuelta 1 (consultora, clínica, restaurante), con las mismas instrucciones (incluida la pregunta G sobre «Quién está detrás»), sobre el texto de `/` y `/contacto/` del build de `4d794419`. Son personas simuladas por un modelo: sirven para ver dónde se tropieza, no para medir conversión. Íntegro en `lectura-fria/30oct-v2/`.

**Lo sustancial sigue bien:** los tres dicen con sus palabras qué hace SpindleLab («hacen sitios web a medida y después les conectan Google, anuncios y redes»), se reconocen en el «para quién», saben que el primer paso es mandar la dirección, que es gratis y en un día hábil, y los tres pedirían la revisión. En `/contacto/` nadie tropieza con el formulario ni con la ayuda nueva.

**Quién está detrás (G):** los tres lo leen **serio** («serio y sin humo»; «alguien que sabe, serio y bastante franco»; «alguien serio, con años en agencias, que explica sin inflar»). Los tres le harían la revisión; el sitio entero, «hablando antes con él», «todavía no» y «con cautela, después de ver la propuesta escrita». La frase de p2 («casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva»), que en la vuelta 1 un lector leyó como discurso de venta, ahora **2 de 3 la citan como lo que les hizo sentido**. Lo que frena sigue siendo «agentes de IA» y que parezca una sola persona.

| Tropiezo | Ronda 1 E13 | Ronda 2 E13 | Vuelta 1 | **Vuelta 2** | |
|---|---|---|---|---|---|
| «agentes de IA» | 3 de 3 | 2 de 3 | 3 de 3 (2 entre sus frenos) | **3 de 3** (1 entre sus frenos) | Mayor 3a, abierto |
| Rótulo «marketing con IA» | | | 2 de 3 | **1 de 3** | Mayor 3b, abierto |
| «sin plantillas ni WordPress» | 2 de 3 | 0 de 3 | 2 de 3 | **3 de 3** | Mayor 3c, abierto |
| «lo corrí sobre mi propio sitio» | 3 de 3 | 3 de 3 | 2 de 3 | **2 de 3** | Menor 6, abierto |
| «visitarlo y entenderlo» (antes «leerlo y citarlo») | | | 0 de 3 | **0 de 3** | Menor 8, cerrado |
| La ayuda del campo del sitio | | | 0 de 3 | **0 de 3** | Menor 10, cerrado |
| «Si te vas, tus seguidores se quedan» | | | 1 de 3 al revés | **1 de 3 al revés** | Leve, igual |
| «con un panel para que edites tú» | | | | **1 de 3** | Liga con el menor 5 |
| «el eje del negocio» suena a discurso; «alcance nacional y regional» aleja a un negocio chico; «la revisión de una página», ¿una sola? | | | | **1 de 3 cada uno** | Leves, nuevos en la lectura; textos que ya estaban |
| «Cookies: rechazadas» | | | 0 de 3 | **2 de 3** | Observación (mismo texto) |
| «Search Console», «Auditoría SEO técnica», «Paid Media (Google)», «Visibilidad en IA» (no garantiza), «21 chequeos… puntos», Verifica y Cumple y la ley, el único caso «no de crecimiento de ventas», los precios «desde» | | escalados a Ramón | 2 a 3 de 3 | **2 a 3 de 3** | Igual que en E13; fuera de lo del 30-oct |

## Detector anti-slop y pruebas de fuego, sobre lo que cambió en la vuelta

Lo que cambió en la vuelta es texto de oficio (8, 9, 10, el «Siguiente» de Desarrollo web), el orden de `/servicios/`, el aire de la biografía y las tarjetas. **Copy:** sin verbos de folleto, sin raya (0 en el `dist`), sin Title Case nuevo (los nombres de plan y de servicio del `ItemList` son los de E13, defecto 12 de E13), tuteo, 0 voseo; el asunto «Hablemos de mi sitio» es el botón dicho por quien escribe. **Estructura:** `/servicios/` ahora dice con el orden lo que dice su entradilla. **Código:** una regla de CSS nueva (`.quien__txt > .cuerpo + .cuerpo`), del mismo patrón que ya usa el sitio; 0 comentarios HTML servidos (`verificar`). **Visual:** el amarillo sigue en dos botones y en nada más. Las tres pruebas de fuego dan lo mismo que en la vuelta 1: la composición no cambió; en voz alta, la biografía suena mejor sin los saltos de 32 px y el eco de la sección 2 (menor 7) sigue ahí.

## Lo que está bien (y no hay que perder)

- **El peso se cerró sin subir el techo** y con una medición que reproduce la de QA al décimo sobre los dos builds anteriores. Es la manera de cerrar un número: misma herramienta, misma base.
- **Las 22 tarjetas, idénticas en el logo al píxel**, con una versión por archivo y ninguna vieja en el `dist` (`capturas-qa-30oct/10`).
- **La spec y sus herramientas miden lo construido**: `logo-i-disco.mjs` y `quien-aire-30oct.mjs` salen con 0 y las corrí yo.
- **`/servicios/` con el sitio primero** en lo que se ve, en el JSON-LD y en la navegación entre servicios (`capturas-qa-30oct/11`).
- **Nada se rompió**: primera pantalla, amarillo, foco, logo y formulario medidos igual que en la vuelta 1.

## Lo que no pude medir

- Safari, Firefox y un iPhone real (tampoco el favicon nuevo en su pantalla de inicio); red real con `_headers` y Brotli de Cloudflare; Node 20.
- `armar-corte.mjs` corrido de verdad (es del día de publicar); el envío real del formulario, GA4 y Meta; un lector de pantalla.
- Verifica y Cumple (`verifica.spindlelab.cl`), que no está en este repositorio.

## Decisiones que son de Ramón (vuelta 2)

1. **Las cuatro preguntas de `desvios/construccion-30oct.md` §6**: las tres frases del mayor 3 (A1 o A2; B1, B2 o B3; C1 o C2), si todo plan trae panel (5), el «yo» de «Probado primero en lo nuestro» (6) y la lista dicha dos veces (7). **Antes del corte**, y después QA exprés con el peso.
2. **Lo cambiado de oficio, que puede devolver:** «visitarlo y entenderlo» (8), la suma a su ayuda del campo (10) y el asunto «Hablemos de mi sitio» (9).
3. **Confirmar por escrito que se podía tocar `Layout.astro`** fuera de gtag, consentimiento y Pixel (las 4 líneas de las hojas de letras). Diego lo declara autorizado por la orquestadora; en el repositorio no hay registro de esa autorización, y la regla que dio Ramón protege esos tres bloques, que están intactos.
4. Las que la vuelta 1 ya listaba y siguen igual: la description de 157 («y les conectamos»), el `h1` de `/nosotros/` y el gris del de `/contacto/`, si «el código de cada entrega lo revisa y lo aprueba él» vale para las entregas a clientes, y «una aerolínea regional» en `/nosotros/`.

## Evidencia de la vuelta 2 en el repositorio

- `e13/capturas-qa-30oct/`: `10` las 22 tarjetas (franja del logo) y dos de las 19 antes y después con su diferencia (defecto 2); `11` `/servicios/` a 1440 con el sitio primero (defecto 11); `12` «Quién está detrás» a 1440 con 16 px entre párrafos (defecto 4); `13` la sección 2 a 1440 con «visitarlo y entenderlo» y el formulario de `/contacto/` a 390 con la ayuda nueva (defectos 8 y 10). De 62 a 114 kB.
- `e13/lectura-fria/30oct-v2/`: `entrada.txt`, `instrucciones.txt`, `lector-1..3.txt`, `lectores.json`.
- Mis herramientas (las de la vuelta 1 más `letras.mjs` y `cap-v2.mjs`) y sus salidas quedaron en el scratchpad (`…/scratchpad/javiera-30oct-v2/`), que se borra al reiniciar: lo que importa está en esta acta.

---

# Vuelta 3 · QA exprés de las respuestas de Ramón

> La escribe Javiera (`/web-qa-critico`) en contexto limpio (subagente), a pedido de la orquestadora, 30-oct-2026 en la tarde. Leyó lo que Ramón decidió por escrito (el encargo de la orquestadora, que lo trae de su conversación con él), las vueltas 1 y 2 de esta acta, `desvios/construccion-30oct.md` §6 y §8 (Diego), `desvios/texto-30oct.md` §6 (Clara) y `lista-publicacion.md`. No vio cómo se escribió ni cómo se construyó. No arregló nada: escribe esta sección, las capturas `14` a `16` de `capturas-qa-30oct/` y `lectura-fria/30oct-v3/`. Es la QA exprés que pidió la vuelta 2 («El reparo, con nombre y plazo»).

**Rama:** `claude/magical-franklin-ckfki2` · **Commit auditado:** `284757fb` (HEAD, igual a `origin`; árbol limpio), sacado con `git archive` a una copia en el scratchpad y construido con `npx astro build`: **22 páginas en 3,23 s, sale con 0, sin errores ni avisos**. Para comparar, `1f02ece6` (el cierre de Mauro, antes de las respuestas) construido igual: 22 páginas. Node v22.22.0, Chromium 1194 de Playwright, los dos `dist` servidos en local sin compresión (`python3 -m http.server`), la misma base que las vueltas 1 y 2. `origin/main` sigue en `840dc024`.

## Veredicto de la vuelta 3

**APROBADO.**

Lo que Ramón eligió está en el `dist` **frase por frase** y no hay nada más que haya cambiado: entre los dos builds difieren **5 archivos** (`/`, `/nosotros/`, `/servicios/`, `/servicios/desarrollo-web/` y `llms.txt`), y en cada uno solo las líneas de texto que él decidió y las dos `Offer` del panel. El CSS y el JS son **idénticos byte a byte**. **El peso de la home se sostiene: 1.398,8 kB** en primera carga a 1440 (1.398.764 bytes, tres corridas iguales, con la herramienta de la obra y con la mía), bajo el tope de 1.400; **margen 1.236 bytes**. Los importes visibles y los del JSON-LD son **idénticos** a los de `1f02ece6` en los 30 archivos. **Ninguna regresión**: primera pantalla con el aviso abierto, botón amarillo, foco, enlaces, UTM con clic real, formulario, JSON-LD y protegidos dan lo mismo que en la vuelta 2.

**La lectura en frío:** «sin plantillas ni WordPress» y el «yo» ya **no aparecen** (0 de 3 cada uno; antes 3 de 3 y 2 de 3). **«agentes de IA» sigue tropezando, 3 de 3**, ahora con la frase nueva: la mitad «Responde él por cada entrega» tranquiliza a **los tres**, y «Para escribirlo trabaja con agentes de IA dentro del equipo» los frena a los tres (para dos, entre sus tres mayores frenos). Es texto que Ramón eligió por escrito, tal cual, con la lectura de las vueltas 1 y 2 a la vista: **no es un defecto de oficio**, va primero en «Decisiones de Ramón (vuelta 3)» con el diagnóstico, para que lo confirme o lo cambie antes del corte.

Conteo de la vuelta 3: **0 bloqueantes · 0 mayores · 1 menor (documento) · 0 desvíos no declarados.** Cerrados: **el mayor 3** (Ramón eligió A1, B1 y C1) y **los menores 5, 6 y 7** (panel en todos los planes, plural, 7A), y **la decisión 3 de la vuelta 2** (`Layout.astro`, ver abajo).

## Cómo se verificó (vuelta 3)

| Qué | Comando o herramienta | Resultado |
|---|---|---|
| Texto con huella | `node e13/herramientas/extraer-texto.mjs --comprobar` (en el repo) | **16 de 16 «igual»**, sale con 0 |
| Build | `npx astro build` sobre la copia de `284757fb` (y de `1f02ece6`) | **22 páginas**, sale con 0, 0 errores, 0 avisos; no cae ningún guardián (precios y nombres contra `oferta-v3.json` y `servicios-v3.json`, largos, orden de servicios, «Siguiente», `.int-par`) |
| `verificar` a 390 | `node scripts/verificar.mjs --excluir /privacidad/` | 22 páginas, **«Sin hallazgos»**, sale con 0 |
| `verificar` a 1440 | `… --ancho 1440` | 22 páginas, **«Sin hallazgos»**, sale con 0 (6 nodos sobre imagen o degradado: la portada, igual que antes) |
| **Peso, primera carga a 1440** | `node e13/herramientas/peso-30oct.mjs <url> --ancho 1440`, tres corridas sobre cada build | **`284757fb`: 1.398,8 kB las tres (1.398.764 bytes)** ≤ 1.400. `1f02ece6`: 1.398,9 las tres (1.398.863), el número de la vuelta 2: la herramienta sigue calibrada. Diferencia: −99 bytes. **Margen: 1.236 bytes** |
| Peso, recorrida y 390 | la misma, `--recorrer` y `--ancho 390`, tres corridas cada una | **1.561,6 kB** recorrida (≤ 1.600) y **755,5 kB** a 390 (≤ 950), las tres iguales |
| Peso, con otra herramienta | mi `peso.mjs` de las vueltas 1 y 2 (CDP, caché apagada, consentimiento puesto antes de cargar), tres corridas | **Los mismos bytes**: 1.398,8 · 1.561,6 a 1440 y 755,5 a 390; `1f02ece6` 1.398,9 · 1.561,7 · 755,6. El HTML de la home, 39,6 kB (antes 39,7) |
| Qué cambió en el `dist` | `diff -rq` de los dos `dist` y comparación línea a línea del texto de los que difieren | **5 archivos** con contenido distinto: `/`, `/nosotros/`, `/servicios/`, `/servicios/desarrollo-web/`, `llms.txt`. Todo lo demás (las otras 25 páginas y archivos de texto, todo `_astro/` con su CSS y su JS, las imágenes) **idéntico byte a byte** (en mi build ni siquiera cambió el nombre del `hoisted`) |
| Las decisiones, frase por frase | mi `frases.mjs` (`innerText` de 9 rutas en los dos builds) y `decisiones.py` (cada frase exacta, contada) | Ver «Las decisiones de Ramón en el `dist`» |
| Los planes y sus `Offer` | mi `planes.mjs` sobre `/servicios/desarrollo-web/` (tarjetas, `Offer` del JSON-LD, glosario, «En todos los planes») | Ver abajo |
| Importes | mi `importes.py`: todo `$NNN.NNN` y número con punto de miles en el texto visible (sin `<script>` ni `<style>`) y cada campo `price`/`minPrice`/`priceCurrency` del JSON-LD parseado, archivo por archivo, en los 30 `.html`, `.txt` y `.xml` de los dos `dist` | **93 visibles y 30 campos de JSON-LD en los dos; 0 archivos con diferencia.** En `/servicios/desarrollo-web/`: 390.000, 690.000 y 1.190.000 visibles y como `minPrice` en CLP, iguales. (Diego cuenta 137 y Clara 138 con otro patrón; lo que importa es la diferencia, y es 0 con los tres) |
| `oferta-v3.json` | `git diff 1f02ece6 HEAD -- spindlelab-astro/src/data/oferta-v3.json` | **2 líneas añadidas** (el punto del panel en Campaña y Esencial); ningún `p` tocado |
| Barrido de términos | `node e13/herramientas/barrer-terminos.mjs <dist> --resumen` sobre los dos `dist` | **0 rayas**; «agentes de IA» 3 (home 1, `/nosotros/` 2); total **130 en los dos**, resumen idéntico línea a línea |
| «WordPress» y «sin plantillas» | `grep -rIoi` sobre el `dist` y búsqueda en los valores de `e13/texto/*.json` | «WordPress»: **2**, los dos en `/servicios/desarrollo-web/`: la pregunta «¿Usan plantillas o WordPress?» a la vista y la misma en el `FAQPage` (su respuesta dice «desde cero»). «sin plantillas»: **0**. En los JSON de Clara solo queda en `antes` y `por_que` (registro), y en `dw.faq.1` (la pregunta) |
| Primera pantalla | mi `primera.mjs` y `e13/herramientas/portada-30oct.mjs` sin `--inyectar` | **Idéntica a la vuelta 2 al décimo:** con aviso 181,2 · 227,2 · 231,5 · 54,6 px de margen a 360×800, 390×844, 768×1024 y 1440×900; **0 de 5 puntos tapados en los 11 tamaños**; 320×568 sigue siendo la excepción de la spec (§12.1). Amarillo 16,20 · 13,39 · 11,03:1 en reposo, al pasar y apretado; foco 2 px blanco a 3 px. Encabezado plegado dentro de la placa en los 8 anchos. Sección 2 sin desfase de filetes (0 · 0 · 0) desde 834 |
| Alto de la home | `portada-30oct.mjs` | **7.438** a 1440 · **7.402** a 1024 · **9.355** a 768 · **8.951** a 390, bajo los techos (7.800 · 7.800 · 9.700 · 9.300). Los mismos números que midió Diego |
| Desborde | mi `desborde.mjs`: 22 rutas + `/privacidad/` × 360, 390, 768, 1024, 1440 y 1920, medido en la página | **0 de 138.** Igual que antes: la tabla del artículo de los 21 chequeos dentro de su contenedor desplazable (360 a 768) y `/privacidad/` con dos `h1` (la de `main`) |
| Tab | mi `tab.mjs` por `/`, `/nosotros/` y `/servicios/desarrollo-web/`, a 1440 y 390, con y sin aviso, Tab y Shift+Tab | 24 pasadas, de 19 a 38 paradas: **0 sin indicador, 0 tapadas** |
| Enlaces internos | mi `enlaces.py` sobre el `dist` | 24 páginas, **935 referencias, 0 que no resuelven, 0 anclas sin destino** (lo mismo que la vuelta 2) |
| UTM de punta a punta | mi `utm.mjs`: `/?utm_source=google&utm_medium=cpc&utm_campaign=qa30oct` y seis recorridos con **clic real**, con y sin aviso | **12 de 12** con los tres `#f-utm-*` llenos (`google` / `cpc` / `qa30oct`) |
| Formulario | `action`, `name` y ocultos contra `git show origin/main:spindlelab-astro/public/contacto/index.html`; envío con el endpoint interceptado (no salió ningún correo), «no tengo» en el sitio | `action` `https://api.web3forms.com/submit`, **los 12 `name` iguales y en el mismo orden**, los 6 ocultos iguales (mismo `access_key`). El cuerpo enviado lleva `Sitio web=no tengo` y los tres UTM; sale «Listo. Te escribimos dentro de un día hábil.» |
| JSON-LD | mi `jsonld.mjs` (22 rutas del sitemap) | **44 bloques, 0 que no parsean** (45 con `/privacidad/`). **`FAQPage` igual a lo visible en las 16 páginas** que lo tienen; home 6 de 6 con la de Instagram primera. `jobTitle` y descripción de `#org` sin cambio (B1) |
| Protegidos | `git diff origin/main -- spindlelab-astro/functions spindlelab-astro/public/_headers spindlelab-astro/public/_redirects spindlelab-astro/public/js` | **0 bytes** |
| `Layout.astro`, `v3-contacto.js`, `servicios-v3.json` | `git diff 4d794419 HEAD --` esos más `public/assets/js` | **0 bytes**: `Layout.astro` es el de la vuelta 2, con gtag, consentimiento y Pixel idénticos y las 4 líneas de las hojas de letras como quedaron (`v3-contacto.js` no existe en `main`: se compara contra la vuelta 2) |
| Lectura en frío | `lectura-fria-texto.mjs` (texto de `/` y `/contacto/` del build; solo cambié la ruta del Chromium) y `lectura-fria.py` (`claude -p` en directorio vacío, sin herramientas, skills, MCP ni ajustes; una conversación por lector), con las **mismas instrucciones** de las vueltas 1 y 2 (pregunta G incluida) | La entrada difiere de la de la vuelta 2 en **las cuatro frases decididas** más la hora del encabezado. Ver «Lectura en frío, vuelta 3». Íntegro en `lectura-fria/30oct-v3/` |
| Capturas | mi `cap-v3.mjs`, por pieza, y Read de cada una | La sección 2 a 1440 y 390, «Quién está detrás» a 1440, Soluciones y «Lo que puedes revisar» a 1440, los planes de Desarrollo web a 1440 y 390, la fila de `/nosotros/`: **miradas**, desborde 0 en las 8 |

## Las decisiones de Ramón en el `dist`

| Decisión | Dónde | Resultado |
|---|---|---|
| **(a) A1** | `/`, «Quién está detrás», p3 | «Responde él por cada entrega: el código lo revisa y lo aprueba antes de que llegue a tu sitio. Para escribirlo trabaja con agentes de IA dentro del equipo.» **1 vez, exacta**, seguida sin cambio por «También construyó dos herramientas abiertas: …». «con él hablas de principio a fin»: **0** en el `dist` (A2 no entró). La frase anterior: 0 |
| **(a) A1, en su forma de fila** | `/nosotros/`, «Cómo trabaja» | Las mismas dos oraciones, **exactas**, bajo el título «Agentes de IA, con su revisión» (sin cambio); las herramientas siguen en su fila propia |
| **(b) B1** | rótulo, `title`, tarjeta, `jobTitle`, `#org`, pie, `llms.txt` | «Sitios web a medida y marketing con IA»: **las mismas apariciones en los mismos 24 archivos** que en `1f02ece6` (2 en `index.html`, 1 en cada uno de los otros); ninguno de esos archivos cambió en esas líneas |
| **(c) C1** | home, Soluciones; `/servicios/`, bloque 01; `llms.txt` | «Diseñado y programado para tu negocio, con un panel para que edites tú. Desde una página de campaña hasta un sitio de doce páginas.» **exacta en la home y en `/servicios/`**; en `llms.txt` la línea de Desarrollo web sin «sin plantillas ni WordPress». Queda solo la pregunta del FAQ de Desarrollo web y su respuesta «desde cero», como pidió Ramón |
| **(d) Plural** | home, «Probado primero en lo nuestro» | «Antes de publicar Verifica y Cumple, el chequeo de la Ley 21.719 de datos personales, lo corrimos sobre nuestro propio sitio. Salió mal. Al arreglarlo encontramos además un formulario que perdía mensajes sin avisar, y lo corregimos.» **exacta**. «lo corrí», «mi propio sitio», «encontré», «lo corregí»: **0** en las 9 rutas leídas. La home queda sin primera persona singular |
| **(e) 7A** | home, sección 2 | «Si tu sitio no explica bien lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traer a esa persona se pierde ahí.» **exacta**; la lista «El anuncio en Google, el post en Instagram…»: 0. La entradilla de la portada, **idéntica** a la de `1f02ece6` |
| **El panel en todos los planes** | `/servicios/desarrollo-web/`, tarjetas y `Offer` | Página de Campaña: «Panel donde cambias textos y fotos» (tercer punto). Sitio Esencial: el mismo (segundo). Sitio Completo: «Blog o CMS que administras tú», sin cambio. Plataforma a Medida: «Todo lo del Sitio Completo, y más», sin cambio (lo incluye por herencia; ver «Decisiones», 3). Las palabras son las del glosario de la misma página («CMS: el panel donde cambias textos, fotos o artículos sin tocar el código»), sin «artículos»: no promete un blog. **En una línea a 1440 y a 390** (`capturas-qa-30oct/15`). Las `Offer` de Campaña y Esencial dicen el panel, igual que sus tarjetas; Completo, «blog/CMS»; Plataforma, «Todo lo del Sitio Completo y más». **Ningún importe cambió** (tabla de arriba). La home, como estaba |
| **`Layout.astro`** | las 4 líneas que sacaron `inter.css` y `manrope.css` del ramal `letras` | Quedan como están (0 bytes contra la vuelta 2). gtag, consentimiento y Pixel, idénticos. **Cierro la decisión 3 de la vuelta 2**: Ramón dio el visto por escrito el 30-oct, en su conversación con la orquestadora (lo trae el encargo de esta vuelta); queda registrado aquí |
| **Los botones con texto propio** | `/metodo/`, `/diagnostico/`, cada servicio | Sin cambio: esos `index.html` son **idénticos byte a byte** a los de `1f02ece6` |

## Los abiertos de la vuelta 2, uno por uno

| # | Sev. | Estado | Qué medí |
|---|---|---|---|
| 3 | Mayor | **Cerrado: decidió Ramón** (A1, B1, C1) | (a) y (c) están en el `dist` tal cual; (b) no cambió. Lectura en frío: (c) **0 de 3** (antes 3 de 3); (b) **1 de 3** (igual que en la vuelta 2: L2 «no sé si usan IA para hacer marketing o si hacen marketing para que la IA los vea»); (a) **3 de 3**, ver «Decisiones de Ramón (vuelta 3)», 1 |
| 5 | Menor | **Cerrado** | El panel está en la lista de cada plan (Campaña y Esencial explícito; Completo como CMS; Plataforma por herencia) y en las `Offer`; la home ya no promete algo que la lista de su plan de entrada no diga. Importes intactos |
| 6 | Menor | **Cerrado** | Plural exacto; **0 de 3** lectores notan un «yo» (antes 2 de 3); los tres citan «Salió mal» como lo que les da confianza |
| 7 | Menor | **Cerrado** | La lista se dice una vez, en la entradilla; **0 de 3** lectores tropiezan con la sección 2. En voz alta queda un eco leve de «lo que haces» entre el `h2` y el párrafo (observación) |
| Decisión 3 de la vuelta 2 | | **Cerrada** | El visto de Ramón a las 4 líneas de `Layout.astro`, anotado arriba |

### Desvíos no declarados (vuelta 3)

Ninguno. Del sitio cambiaron **7 archivos** desde `1f02ece6`, todos en `0f5bf988` (Clara): `llms.txt`, los cuatro `src/data/archivo/texto/*.json` (las copias de `extraer-texto.mjs`), `oferta-v3.json` y `desarrollo-web.astro`. Los siete están en `desvios/texto-30oct.md` §6.1, con la decisión que los motivó; `284757fb` (Diego) no tocó el sitio. La edición en `desarrollo-web.astro` (las dos `Offer.description`) está declarada (§6.2): ver observaciones.

## Lectura en frío, vuelta 3 (criterio 4 del brief)

Los mismos tres perfiles (consultora, clínica, restaurante), con las mismas instrucciones de las vueltas 1 y 2 (incluida la pregunta G sobre «Quién está detrás»), sobre el texto de `/` y `/contacto/` del build de `284757fb`. Son personas simuladas por un modelo: sirven para ver dónde se tropieza, no para medir conversión. Íntegro en `lectura-fria/30oct-v3/`.

**Lo sustancial sigue bien:** los tres dicen con sus palabras qué hace SpindleLab («hacen sitios web a medida y después te conectan Google, anuncios y redes»), se reconocen en el «para quién», saben que el primer paso es mandar la dirección, gratis y en un día hábil, y los tres harían la revisión o el chequeo antes de contratar. En `/contacto/` nadie tropieza con el formulario.

**Quién está detrás (G):** los tres lo leen **serio** («seria, ordenada y que habla sin inflar»; «alguien que sabe de pauta como yo»; «alguien serio y que sabe de marketing»). **«Responde él por cada entrega» les da confianza a los tres** («me deja tranquila que haya una persona responsable»; «me dio confianza»; «me gusta, porque hay una cara responsable»). La frase siguiente los frena a los tres: «no sé si es bueno o malo que el código lo escriba una IA»; «me hizo dudar de quién hace realmente el sitio»; «¿quién escribe mi sitio, una persona o una máquina?». Los tres le harían la revisión; el sitio entero, «con cautela» o «todavía no».

| Tropiezo | Vuelta 1 | Vuelta 2 | **Vuelta 3** | |
|---|---|---|---|---|
| «agentes de IA» | 3 de 3 (2 entre sus frenos) | 3 de 3 (1 entre sus frenos) | **3 de 3 (2 entre sus tres frenos: L2 y L3, los dos en el segundo lugar)** | Decide Ramón (A1 elegido). Ver «Decisiones», 1 |
| La mitad que dice quién responde | tranquiliza a 2 de 3 | | **tranquiliza a 3 de 3** («Responde él por cada entrega») | Lo que A1 ganó |
| «el código lo revisa y lo aprueba»: ¿quién? | | | **1 de 3** (L3: «¿Quién? ¿Él mismo?») | Nuevo, del sujeto tácito de A1 |
| Que sea una sola persona con IA | 2 de 3 | 2 de 3 | **3 de 3** (L1: «diga "nosotros" todo el rato y después sea básicamente una persona más herramientas de IA») | Liga con «agentes de IA» |
| Rótulo «marketing con IA» | 2 de 3 | 1 de 3 | **1 de 3** | B1: Ramón lo deja |
| «sin plantillas ni WordPress» | 2 de 3 | 3 de 3 | **0 de 3** (ya no está en la home) | C1, cerrado |
| «lo corrí sobre mi propio sitio» | 2 de 3 | 2 de 3 | **0 de 3**; los tres citan «Salió mal» como confianza | Plural, cerrado |
| La lista dicha dos veces | 0 de 3 | 0 de 3 | **0 de 3** (ya no está) | 7A, cerrado |
| «con un panel para que edites tú» | | 1 de 3 | **1 de 3** (L2: «no sé cómo es ese panel») | Leve |
| «Si te vas, tus seguidores se quedan» | 1 de 3 al revés | 1 de 3 al revés | **1 de 3** (L2: «no lo entendí bien») | Leve, igual |
| «Cookies: rechazadas» | 0 de 3 | 2 de 3 | **2 de 3** | Observación, mismo texto |
| El caso único «no de crecimiento de ventas», los precios «desde», «Visibilidad en IA», «Search Console», «Paid Media», la ley | | | **2 a 3 de 3**; el caso y el «desde» están entre los tres frenos de los tres | Igual que en E13 y en las vueltas 1 y 2; escalados antes, fuera de lo del 30-oct |

## Defectos (vuelta 3)

Severidad como en la vuelta 1.

| # | Sev. | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce | Cómo se cierra |
|---|---|---|---|---|---|---|---|
| 1 | Menor | Mauro | `e13/lista-publicacion.md`, filas 8 y 9 | Siguen diciendo **«(30-oct, abierto)»**: la 8, «Pendiente de Ramón, **antes del corte**», para las tres frases, el panel, el «yo» y la lista, que Ramón ya contestó y que están en el `dist`; la 9, el permiso de `Layout.astro` y las que Ramón dejó como las dejó el equipo. Quien arme el corte lee ahí que falta una respuesta que ya llegó | La lista de publicación tiene que describir lo que queda por hacer el día del corte | `grep -n '30-oct, abierto' e13/lista-publicacion.md` (líneas 36 y 37) | Fila 8: cerrada con lo que eligió Ramón (A1, B1, C1, plural, 7A, panel en todos los planes), remitiendo a `desvios/texto-30oct.md` §6, `desvios/construccion-30oct.md` §8 y esta vuelta. Fila 9: cerrar el visto de `Layout.astro` y lo que Ramón dejó como lo dejó el equipo; si queda algo, que sea solo lo de «Decisiones de Ramón (vuelta 3)». **Antes de armar el corte.** Solo documento, no toca el sitio |

### Observaciones (no son defectos; quedan anotadas)

- **Margen de peso: 1.236 bytes.** Cualquier frase que se sume a la home se vuelve a medir con `peso-30oct.mjs` antes del corte. Si Ramón cambia la frase de los agentes, eso incluido.
- **Las `Offer.description` siguen escritas en `desarrollo-web.astro`**, no en `e13/texto/*.json`. Es el patrón que dejó Simón (`senales-obra.md` §2.7) y Clara cambió dos cadenas que ya vivían ahí, declarado (§6.2). El JSON-LD dice lo mismo que lo visible. Si Diego o Simón prefieren derivarlas de `puntos`, es suyo. La de Sitio Completo no dice los idiomas y su tarjeta sí («Uno o dos idiomas»): lo anotó Diego para Simón, es anterior al 30-oct.
- **Eco leve en la sección 2:** «lo que haces» en el `h2` («Todo lo que haces para vender…») y en la primera línea del párrafo («…no explica bien lo que haces…»), con dos sentidos. Ningún lector lo citó; es la frase de Ramón tal cual.
- **Fuera de la obra, para la troncal:** `.claude/skills/cotizaciones/SKILL.md` (método, paso 1) todavía lista el panel entre lo que cambia el precio. Con la decisión de Ramón, en Desarrollo web ya no.
- **Las capturas `15` y `16`** muestran el encabezado fijo a mitad de la imagen: es la placa `fixed` que la captura por elemento deja donde estaba la ventana, no un solapamiento de la página.

## Detector anti-slop y pruebas de fuego, sobre lo que cambió

Lo que cambió es texto. **Copy:** sin verbos de folleto ni relleno; 0 rayas largas o medias en el `dist`; tuteo, 0 voseo; sin Title Case nuevo («Panel donde cambias textos y fotos» va como los demás puntos, sustantivo al frente y sin punto); 0 prueba social, cifras o clientes nuevos; ninguna promesa nueva (el panel lo respalda ahora la lista de cada plan). La home queda **sin primera persona singular** y sin la lista repetida (antislop A7 y A10, los menores 6 y 7 de la vuelta 1). **Dos puntos (voz, tic del 23-sep):** «Quién está detrás» queda con tres en dos párrafos seguidos (p2 «…para atraer clientes: casi nunca…»; p3 «Responde él por cada entrega: …» y «dos herramientas abiertas: …»). No son el motor de cada párrafo de la página, pero en esa sección se oyen; las dos frases de p3 están fijadas por Ramón (ver «Decisiones», 2). **Estructura, código y visual:** sin cambios (CSS y JS idénticos byte a byte; los cuatro `index.html` y `llms.txt` difieren solo en texto). **Pruebas de fuego:** logo tapado y rubro cambiado dan lo mismo que en la vuelta 2 (la composición no cambió). **En voz alta:** la sección 2 suena mejor sin la lista (el `h2` dice la premisa y el párrafo lo que se pierde); «Probado primero en lo nuestro» calza con su título y con «Construimos su sitio» del caso de abajo; p3 se oye en dos tiempos, él responde y después la herramienta, y el segundo tiempo es el que los lectores no pasan.

## Lo que está bien (y no hay que perder)

- **Cambiar cinco frases sin mover nada más:** 5 archivos distintos entre los dos `dist`, y en ellos solo las líneas decididas. CSS, JS y las otras 25 páginas, idénticos byte a byte (`capturas-qa-30oct/14` a `16`).
- **El peso medido igual por tres manos**: Diego, la herramienta de la obra y la mía dan 1.398.764 bytes, y el build anterior da el número de la vuelta 2. Así se cierra un número.
- **El panel resuelto sin tocar un peso**: la promesa de la home ahora la dice la lista de cada plan, con las palabras del glosario de la misma página y en una línea, y el JSON-LD dice lo mismo.
- **«Responde él por cada entrega»** es la primera versión de esa idea que tranquiliza a los tres lectores.
- **Nada se rompió:** primera pantalla, amarillo, foco, enlaces, UTM, formulario, JSON-LD y protegidos, igual que en la vuelta 2.

## Lo que no pude medir

- Safari, Firefox y un iPhone real; red real con `_headers` y Brotli de Cloudflare; Node 20 (producción).
- `armar-corte.mjs` corrido de verdad (es del día de publicar y lo arma la orquestadora); el envío real del formulario, GA4 y Meta; un lector de pantalla.
- `/nosotros/` en la lectura en frío: leí `/` y `/contacto/`, como en las vueltas 1 y 2, para que los números se puedan comparar. La fila de `/nosotros/` dice las mismas dos oraciones de A1 que la home.

## Decisiones de Ramón (vuelta 3)

1. **«Para escribirlo trabaja con agentes de IA dentro del equipo» (A1) no bajó el tropiezo.** Es la quinta lectura en que tropieza la idea (3 de 3, 2 de 3, 3 de 3, 3 de 3 y ahora 3 de 3; para 2 de los 3, entre sus tres mayores frenos). **Diagnóstico:** A1 acertó en poner primero quién responde («Responde él por cada entrega» tranquiliza a los 3, antes a 2), pero la segunda oración ahora dice de forma explícita que **la IA escribe el código** («Para escribirlo…»), y los tres la leen como «¿quién hace mi sitio, una persona o una máquina?». Además, a 1 de 3 el sujeto tácito de «el código lo revisa y lo aprueba» no le queda claro («¿Quién? ¿Él mismo?»). El hecho es verdadero y la frase es la que Ramón eligió por escrito, con la lectura de las vueltas anteriores a la vista. **Dos caminos:** publicar con A1 tal como está (decisión suya, no defecto), o pedirle a Clara una versión que diga qué gana el cliente con esa manera de trabajar sin esconder que hay agentes de IA; en ese caso, QA exprés de nuevo (texto, build, peso con 1.236 bytes de margen y lectura en frío). **Antes del corte.**
2. **Dos puntos en «Quién está detrás»:** p3 queda con dos («Responde él por cada entrega:» y «dos herramientas abiertas:») y p2 trae otro. Ningún lector lo notó. Las dos de p3 están fijadas por su decisión (A1 tal cual y las herramientas se conservan); si quiere aflojarlo, lo más barato es el segundo («También construyó dos herramientas abiertas, un chequeo que…»), propuesta de Clara.
3. **«En todos los planes»** (`/servicios/desarrollo-web/`) no nombra el panel, y la Plataforma a Medida lo trae solo por «Todo lo del Sitio Completo, y más». Ramón lo pidió plan por plan y así quedó; si quiere que se lea como algo de base, ese es su lugar natural (propuesta de Clara, §6.5).
4. **El título de la fila de `/nosotros/`**, «Agentes de IA, con su revisión», sigue nombrando primero la herramienta mientras la descripción ahora parte por quién responde. No estaba en lo decidido.
5. **La description de 157 caracteres** («y les conectamos») no la nombró; la tomo cerrada por su regla general («lo que no frena la publicación queda como lo dejó el equipo»). «El código de cada entrega lo revisa y lo aprueba él» para las entregas a clientes queda respondido por A1 («antes de que llegue a tu sitio»). El `h1` de `/nosotros/`, el gris del de `/contacto/`, «una aerolínea regional», «visitarlo y entenderlo», la ayuda del campo y el asunto «Hablemos de mi sitio»: **cerrados**, quedan como los dejó el equipo, por su decisión.

## Evidencia de la vuelta 3 en el repositorio

- `e13/capturas-qa-30oct/`: `14` la sección 2 y «Quién está detrás» a 1440 (7A y A1); `15` los planes de Desarrollo web a 1440 y 390, con el panel en una línea; `16` «Lo que puedes revisar» (el plural), Soluciones (C1) y la fila de `/nosotros/` (A1), a 1440. De 105 a 137 kB.
- `e13/lectura-fria/30oct-v3/`: `entrada.txt`, `instrucciones.txt` (las de las vueltas 1 y 2), `lector-1..3.txt`, `lectores.json` (30-oct, 18:50 UTC).
- Mis herramientas (`frases.mjs`, `decisiones.py`, `planes.mjs`, `importes.py`, `cap-v3.mjs`, más las de las vueltas 1 y 2 con la ruta puesta al día) y sus salidas quedaron en el scratchpad (`…/scratchpad/javiera-30oct-v3/`), que se borra al reiniciar: lo que importa está en esta acta.
