# Proceso de desarrollo web — reconstruido desde la construcción de spindlelab.cl

> **Fuente:** historial de commits de la sesión que construyó spindlelab.cl (rama `main`, 7-8 jul 2026). Yo no participé en esa conversación — esto es una reconstrucción a partir de lo que quedó documentado en los mensajes de cada commit, que resultaron ser inusualmente detallados. Sirve como punto de partida para el proyecto de Bernardo y los siguientes clientes de Desarrollo Web; la sección final lista lo que **no** se puede reconstruir así y conviene pedir directamente a esa sesión.

## El flujo real, en el orden en que ocurrió

1. **Diseño en Figma primero, código después.** El primer commit real del sitio es *"Translate Figma v3 design to code"* — el sitio no se escribió a mano ni se improvisó en HTML: partió de un diseño ya aprobado en Figma (había al menos 3 versiones — "v3" — antes de traducirlo a código).
2. **Home antes que páginas interiores.** Se tradujo primero la home completa (hero + banda de chat de IA), y recién después se construyeron las páginas interiores (servicios, método, blog con artículos, contacto, 404) más los archivos técnicos (robots.txt, sitemap.xml).
3. **Activos sociales al final de la primera pasada.** El `og.jpg` (tarjeta social) se exportó directo desde Figma, no se generó aparte.
4. **Ajustes de dirección de cliente ya en código.** Un commit registra *"Switch dark sections from navy to ink black per client direction"* — es decir, hubo una ronda de feedback del cliente (Ramón) ya viendo el sitio construido, no solo sobre el Figma.
5. **Iteración de fotografía basada en feedback real**, varias rondas:
   - Una foto decorativa de IA generada no comunicaba nada → se reemplazó por un mockup del entregable real (el mini-diagnóstico).
   - Luego se restauró una foto de equipo con "mood de agencia creativa" en la banda dividida, y el mockup del entregable se movió a la página de contacto.
   - Después se agregaron fotos hero con etiqueta de sección en servicios, método, blog y contacto.
   - Este patrón — probar varias fotos, pedir feedback, iterar — es el mismo que usé para el carrusel de Instagram (hoja de contactos con 12 candidatas, elegir por código). No es casualidad: es cómo se trabaja bien la fotografía en esta marca.
6. **El sistema de marca se corrigió una vez ya aplicado.** Primero se integró un "brand kit" con wordmark serif (Playfair) — y se corrigió poco después a Gabarito, con el mismo argumento que usé yo en esta rama ("muy solemne/rígido"). Ambas sesiones llegaron independientemente a Gabarito.
7. **El favicon fue la última pieza en asentarse**, con 3 commits de ajuste seguidos: primero quedó un favicon huérfano (el átomo viejo, sin ningún `<link>` apuntándolo pero inconsistente en el repo), después se reemplazó por el monograma correcto, y finalmente se descubrió que la variante oscura ("invertido") tenía mal contraste en el chrome oscuro del navegador — se cambió a la variante clara ("papel con tinta"), que es la que el manual de marca ya marcaba como principal.

## Lecciones técnicas ya pagadas (para no repetirlas con Bernardo)

Estas son caras porque ya costaron tiempo de debugging real en spindlelab.cl:

- **Cache poisoning con assets versionados en el mismo nombre de archivo.** Si actualizas `style.css`, `favicon.svg` o cualquier imagen *sobrescribiendo el mismo path*, y el hosting sirve esos archivos con `Cache-Control: immutable, max-age=31536000`, los navegadores (y la CDN) van a seguir sirviendo la versión vieja indefinidamente. Solución aplicada: query string de versión (`?v=2`, `?v=3`...) en cada referencia al archivo cada vez que su contenido cambia. Esto pasó **tres veces** en spindlelab.cl (CSS, luego favicon+og, luego el logo) antes de quedar resuelto — vale la pena aplicarlo desde el principio en el sitio de Bernardo en vez de descubrirlo a las malas.
- **Política de caché por tipo de archivo.** La política `immutable` de larga duración debería reservarse para archivos verdaderamente content-addressed (fuentes con hash en el nombre, por ejemplo) — para imágenes y CSS que sí se van a tocar, usar `max-age` corto con `must-revalidate`.
- **El favicon necesita pensarse en dos variantes** (fondo claro / fondo oscuro) porque el chrome del navegador puede ser oscuro o claro según el sistema del usuario — probar en ambos antes de dar por cerrado.
- **Patrón "compositor-safe" para layout de imágenes**: usar imágenes en flujo normal del documento en vez de posicionamiento absoluto/flotante cuando hay bandas con texto + foto — evita bugs de composición sutiles. (El detalle técnico exacto de qué falló con el enfoque anterior no quedó en el mensaje de commit — preguntar si se repite el problema.)

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
