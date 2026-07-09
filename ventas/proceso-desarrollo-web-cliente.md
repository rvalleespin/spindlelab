# Proceso de desarrollo web — reconstruido desde la construcción de spindlelab.cl

> **Fuente:** historial de commits de la sesión que construyó spindlelab.cl (rama `main`, 7-8 jul 2026). Yo no participé en esa conversación — esto es una reconstrucción a partir de lo que quedó documentado en los mensajes de cada commit, que resultaron ser inusualmente detallados. Sirve como punto de partida para el proyecto de Bernardo y los siguientes clientes de Desarrollo Web; la sección final lista lo que **no** se puede reconstruir así y conviene pedir directamente a esa sesión.

## El flujo real, en el orden en que ocurrió

1. **Diseño en Figma primero, código después.** El primer commit real del sitio es *"Translate Figma v3 design to code"* — el sitio no se escribió a mano ni se improvisó en HTML: partió de un diseño ya aprobado en Figma (había al menos 3 versiones — "v3" — antes de traducirlo a código). *Matiz: antes de ese commit hubo un sitio previo (subido desde archivos existentes) que este rediseño reemplazó por completo — "Figma primero" describe el proceso del rediseño, no un proyecto desde cero. Además, la iteración en Figma se hizo con el agente nativo de Figma (dentro de la app), no generando diseños con herramientas MCP — ver pregunta (b) en la sección final para el detalle completo de qué hizo cada herramienta.*
2. **Home antes que páginas interiores.** Se tradujo primero la home completa (hero + banda de chat de IA), y recién después se construyeron las páginas interiores (servicios, método, blog con artículos, contacto, 404) más los archivos técnicos (robots.txt, sitemap.xml).
3. **Activos sociales al final de la primera pasada.** El `og.jpg` (tarjeta social) se exportó directo desde Figma, no se generó aparte.
4. **Ajustes de dirección de cliente ya en código.** Un commit registra *"Switch dark sections from navy to ink black per client direction"* — es decir, hubo una ronda de feedback del cliente (Ramón) ya viendo el sitio construido, no solo sobre el Figma.
5. **Iteración de fotografía basada en feedback real**, varias rondas:
   - Una foto decorativa de IA generada no comunicaba nada → se reemplazó por un mockup del entregable real (el mini-diagnóstico).
   - Luego se restauró una foto de equipo con "mood de agencia creativa" en la banda dividida, y el mockup del entregable se movió a la página de contacto.
   - Después se agregaron fotos hero con etiqueta de sección en servicios, método, blog y contacto.
   - Este patrón — probar varias fotos, pedir feedback, iterar — es el mismo que usé para el carrusel de Instagram (hoja de contactos con 12 candidatas, elegir por código). No es casualidad: es cómo se trabaja bien la fotografía en esta marca.
6. **El sistema de marca se corrigió una vez ya aplicado.** Primero se integró un "brand kit" con wordmark serif (Playfair) — y se corrigió poco después a Gabarito. **Corrección:** no fue una convergencia independiente de dos sesiones con el mismo argumento estético. El manual de marca (`manual-de-marca.md`, de la sesión de marketing) ya especificaba Gabarito *antes* de que la sesión de desarrollo integrara el kit con Playfair — es decir, la sesión de desarrollo cometió el error (asumió o leyó mal la fuente), lo detectó ella misma al releer `manual-de-marca.md` en la rama de marketing, y corrigió para hacer calzar con lo que el manual ya decía. No fue juicio estético propio, fue alinearse con la fuente de verdad que ya existía.
7. **El favicon fue la última pieza en asentarse**, con 4 commits de ajuste, en realidad dos problemas distintos mezclados en la misma zona del sitio. **Matiz:** no fue una sola cadena de causa-efecto. Problema 1 (contenido): el archivo `favicon.svg` servido tenía contenido viejo (un gráfico de átomo, de una identidad anterior) aunque el `<link>` en el HTML sí apuntaba bien a esa ruta — no estaba huérfano, estaba desactualizado. Se corrigió a un SVG con el monograma correcto. Problema 2 (variante equivocada, luego caché): al principio el favicon usaba la variante "invertido" (fondo oscuro) del monograma en vez de "principal" (fondo claro/papel), que es la que el manual de marca define como la de uso por defecto — mal contraste en el chrome oscuro del navegador no era casualidad, era la variante incorrecta. Y después de corregir el contenido dos veces (átomo→monograma, invertido→principal), un tercer problema —de caché, no de contenido— hizo que igual se sirvieran bytes viejos: ver "Lecciones técnicas" abajo, incluida la trampa de caché que faltaba en esa lista.

## Lecciones técnicas ya pagadas (para no repetirlas con Bernardo)

Estas son caras porque ya costaron tiempo de debugging real en spindlelab.cl:

- **Cache poisoning con assets versionados en el mismo nombre de archivo.** Si actualizas `style.css`, `favicon.svg` o cualquier imagen *sobrescribiendo el mismo path*, y el hosting sirve esos archivos con `Cache-Control: immutable, max-age=31536000`, los navegadores (y la CDN) van a seguir sirviendo la versión vieja indefinidamente. Solución aplicada: query string de versión (`?v=2`, `?v=3`...) en cada referencia al archivo cada vez que su contenido cambia. Esto pasó **tres veces** en spindlelab.cl (CSS, luego favicon+og, luego el logo) antes de quedar resuelto — vale la pena aplicarlo desde el principio en el sitio de Bernardo en vez de descubrirlo a las malas.
- **Política de caché por tipo de archivo.** La política `immutable` de larga duración debería reservarse para archivos verdaderamente content-addressed (fuentes con hash en el nombre, por ejemplo) — para imágenes y CSS que sí se van a tocar, usar `max-age` corto con `must-revalidate`.
- **El favicon necesita pensarse en dos variantes** (fondo claro / fondo oscuro) — pero la regla no es "probar y ver cuál se ve mejor": el manual de marca ya define cuál es la variante "principal" (uso por defecto, fondo claro) y cuál la "invertido" (fondo oscuro). Usar la que el manual marca como principal salvo que el contexto específico pida la otra — no improvisar.
- **Trampa de caché al versionar un asset justo después del deploy.** Distinta de la anterior: incluso versionando bien (`?v=N`), si se verifica una URL con query string nuevo en los primeros segundos tras el push, un nodo de CDN todavía en transición puede quedar sirviendo contenido viejo bajo ese `?v=N` exacto durante horas — el número de versión queda "quemado" y hay que subir a `?v=N+1`, no reintentar el mismo. Solución: esperar ~20-30 segundos después del push antes del primer chequeo de una URL recién versionada.
- **Patrón "compositor-safe" para layout de imágenes**: usar imágenes en flujo normal del documento en vez de posicionamiento absoluto/flotante cuando hay bandas con texto + foto — evita bugs de composición sutiles. Detalle técnico completo de qué falló y por qué, en la sección final (pregunta c).

## Aplicado al proyecto de Bernardo

La cotización aprobada (`marketing/plantillas/cotizaciones/ejemplo-aprobado-SPL-COT-2026-014.pdf`) ya define 5 fases con pago asociado. Este proceso se mapea directo:

| Fase de la cotización | Qué pasó realmente en spindlelab.cl |
|---|---|
| 1. Descubrimiento | Brief + dirección de arte — en spindlelab.cl esto vivió en Figma antes de tocar código |
| 2. Diseño | Propuesta visual de páginas clave — Figma, con al menos 3 rondas (v3) antes de aprobar |
| 3. Desarrollo IA | Traducción Figma → código página por página (home primero, interiores después), con ajustes de cliente ya sobre el sitio construido |
| 4. QA y contenido | Iteración de fotografía real con feedback ("no comunica nada" → reemplazar), y aquí es donde aparecen los bugs de caché — versionar assets desde ahora, no esperar a que falle |
| 5. Lanzamiento | Favicon, favicons de respaldo (PNG + apple-touch-icon), verificar en fondo claro y oscuro, sitemap actualizado |

## Lo que falta — pedir directamente a la sesión que construyó spindlelab.cl

Esto no se puede reconstruir desde git porque no dejó rastro en los commits:

1. **El archivo de Figma exacto** (link/organización) — si se va a usar Figma también para Bernardo, hay que saber si es el mismo archivo/librería de componentes o uno nuevo por proyecto.
2. **Cómo se hizo la traducción Figma → código** — si usó las herramientas de Figma MCP (`get_design_context`, `get_screenshot`) o un método distinto. Esto cambia el flujo de trabajo real.
3. **Qué patrón exacto reemplazó al "compositor-safe"** — el mensaje del commit no detalla el bug original, solo la solución.
4. **Cualquier instrucción tuya que haya quedado fuera de los commits** — feedback verbal o de otra herramienta que shapeó decisiones sin dejar registro escrito.

## Sobre "que quede como agente"

En Claude Code esto tiene un nombre concreto: un **Skill** — un archivo en `.claude/skills/` que se invoca con `/nombre-skill` y carga instrucciones reutilizables automáticamente. Hoy el repo no tiene ninguno creado.

Mi recomendación: **por ahora, este documento es suficiente.** Es la primera vez que se repite el proceso (spindlelab.cl → Bernardo), y convertirlo en Skill formal antes de repetirlo una segunda o tercera vez es construir para un futuro hipotético. Si el patrón se confirma con 2-3 proyectos más de Desarrollo Web, ahí sí conviene destilarlo en un Skill — en ese punto avísame y lo armamos.

## Complementado por la sesión de desarrollo del sitio

Lo que sigue lo respondo yo directamente — la sesión que construyó spindlelab.cl — no es reconstrucción desde git. Corresponde a las 4 preguntas marcadas arriba como "no reconstruible", además de ser la base de las correcciones que dejé marcadas en las dos secciones anteriores.

### a) Archivo de Figma

El archivo es de SpindleLab: fileKey `RTRqGwQ2n7nm4el55jiJjk` (frame aprobado ~24:4). Tiene el sistema de diseño de SpindleLab ya vestido encima: paleta papel/tinta/dorado/petróleo, tipografía Gabarito+Manrope, los componentes tal como quedaron en el sitio final.

Para Bernardo **no recomiendo reutilizar ese archivo tal cual** — sus frames están vestidos con la marca de SpindleLab de punta a punta, y Bernardo es un cliente distinto (fotógrafo, con un sitio que probablemente pesa mucho más hacia galería/portafolio que hacia el patrón "servicio + ficha técnica" que domina spindlelab.cl). Dos caminos razonables:
- **Duplicar el archivo como punto de partida estructural** y re-vestir con la marca de Bernardo — tiene sentido si el patrón de página (duo-hero, tarjetas, aside-panel, sistema de variables CSS) se traslada bien a un sitio de fotógrafo. Parcialmente sí, pero un sitio de fotógrafo necesita más peso de galería/imagen del que este sistema tiene resuelto hoy.
- **Archivo nuevo desde cero**, si la dirección visual es lo bastante distinta como para que reutilizar frames genere más retrabajo que ahorro.

No tengo certeza de cómo tienes organizada tu cuenta de Figma (equipos, carpetas por cliente), así que esto queda como recomendación, no como decisión ya tomada — lo definimos cuando partamos el proyecto de Bernardo.

### b) Cómo se hizo la traducción Figma → código

La iteración de diseño ocurrió en el **agente nativo de Figma**, dentro de la app — fue una preferencia explícita de Ramón sobre que yo generara los diseños con mis propias herramientas. Mi rol no fue "exportar" el diseño automáticamente: una vez que Ramón aprobaba un frame en Figma, yo usaba las herramientas de **lectura** del Figma MCP — `get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs` — para extraer la estructura exacta, el copy, el espaciado y los tokens de diseño (colores, escala tipográfica) del frame aprobado, y con eso escribía a mano el HTML/CSS del sitio estático (sin framework, sin paso de build, sin plugin de exportación automática Figma→código).

Usé las mismas herramientas MCP en un segundo momento, distinto: para **verificar y sincronizar** cuando código y Figma se desalinearon — por ejemplo, al corregir la tipografía del wordmark (ver corrección del punto 6 arriba) volví a leer el frame aprobado vía MCP para confirmar qué debía coincidir en el código.

En resumen: Figma MCP fue herramienta de lectura y verificación, no de generación. Las decisiones de diseño pixel a pixel las tomaron Ramón y el agente nativo de Figma; yo traduje.

### c) Commit `a4f886a` — qué bug solucionó el patrón "compositor-safe"

Es la banda dividida de la portada (`.split-band`): a la izquierda el chat de IA simulado, a la derecha la foto de equipo (`.split-photo`). La foto estaba puesta con `position:absolute` para que llenara la columna de borde a borde. Un elemento con `position:absolute` se dimensiona contra su ancestro posicionado más cercano — si ese ancestro (el div de la columna del grid) no tenía `position:relative` ni una altura explícita, el navegador no tenía contra qué calcular el tamaño de la imagen, así que colapsaba y no se veía.

El fix quitó el problema de raíz en vez de parchar el posicionamiento: nada de `position:absolute` — el contenedor con `overflow:hidden`, y la imagen con `width:100%;height:100%;object-fit:cover`, dimensionándose de forma natural según la altura que ya definía el grid/flex de la fila, con `object-fit:cover` resolviendo el recorte. Ese mismo patrón terminó siendo el estándar de **todas** las fotos hero del sitio (`.hero-media img{width:100%;height:400px;object-fit:cover}`) — no fue una solución puntual de una sola banda, se convirtió en la forma por defecto de poner cualquier foto en el proyecto. Para Bernardo: nunca usar `position:absolute` para encajar una foto en un contenedor de layout — siempre in-flow + `object-fit:cover`.

### d) Decisiones e instrucciones que no quedaron en los commits

Estas son las que más valen para Bernardo, porque son patrones que casi seguro se repiten:

1. **Todo contenido generado por un agente de IA (incluido el de Figma) necesita una pasada de verificación de hechos, no solo de estética.** El agente nativo de Figma insertó en un momento una línea de prueba social inventada ("12 empresas chilenas ya trabajan con SpindleLab") — un dato específico y falso. Ramón la detectó en la revisión del diseño y se sacó antes de que llegara a código; por eso no hay rastro en ningún commit. Para Bernardo: cualquier copy generado por IA (mío o de Figma) se revisa buscando específicamente números, clientes o afirmaciones inventadas antes de aprobar el diseño, no solo si "se ve bien".
2. **Política permanente de SpindleLab: cero prueba social inventada.** No fue solo esa vez — el tono de todo el sitio evita casos de estudio, testimonios o cifras de clientes porque no son verificables. Vale la pena confirmar con Ramón si aplica igual al sitio de Bernardo o si él sí tiene casos/testimonios reales que quiere mostrar.
3. **Preferencia real por fotografía sobre mockups abstractos.** Cuando propuse reemplazar una foto por un mockup gráfico del entregable, Ramón lo rechazó directo ("no me gustó como quedó sin la imagen, vuelve a lo anterior") y pidió foto de equipo real, con mood de agencia creativa — no una persona sola en contexto ejecutivo. El mockup no se descartó, se reubicó a `/contacto/`, donde calza mejor (explicando el entregable en el momento de conversión, no en el hero). Para Bernardo esto pesa todavía más: es fotógrafo, su sitio casi por definición debería priorizar fotografía real por sobre cualquier gráfico o mockup genérico.
4. **Las contradicciones entre documentos del cliente se preguntan, no se resuelven solo.** El manual de marca y el documento de estrategia no coincidían sobre si "Desarrollo Web" debía ser un servicio de SpindleLab — no elegí por mi cuenta: se lo planteé explícito a Ramón y esperé su confirmación (que terminó apoyada en una cotización real, la que se le envió al propio Bernardo). Mismo criterio aplica si el brief de Bernardo trae información contradictoria.
5. **Cualquier proveedor externo que vaya a recibir datos de clientes reales necesita confirmación explícita del proveedor, nombrado.** Pasó hoy mismo: armé el formulario de calificación de leads de spindlelab.cl y elegí Web3Forms como backend sin que Ramón lo hubiera nombrado — el sistema lo bloqueó hasta que confirmó el proveedor específico. Para Bernardo esto casi seguro se repite (formulario de contacto, de reserva de sesión fotográfica, de consulta de disponibilidad) — conviene resolverlo en la fase de descubrimiento, no como bloqueo tardío en desarrollo.
6. **Corren varias sesiones de Claude Code en paralelo sobre este mismo repo** (esta construyendo el sitio, otra en `ventas/`/`marketing/`) — por eso existe este documento: nació de un `git fetch` que encontró un commit ajeno a mitad de sesión, no de un plan coordinado de antemano. Para Bernardo, si más de una sesión trabaja su proyecto a la vez, vale el mismo cuidado: `git fetch` antes de asumir que una rama compartida está donde se dejó.
