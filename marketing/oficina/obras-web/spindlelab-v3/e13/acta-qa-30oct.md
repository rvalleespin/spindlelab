# Acta de QA · SpindleLab, sitio nuevo · cambios del 30-oct · vuelta 1

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
