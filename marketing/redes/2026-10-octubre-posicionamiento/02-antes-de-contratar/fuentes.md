# Fuentes · Carrusel "Lo que puedes revisar antes de contratar"

Cada afirmación factual de la pieza, con el archivo del repo que la respalda. Una afirmación sin respaldo se quita de la pieza; acá no queda ninguna.
**Hecho el 23-oct-2026.** Rutas relativas a la raíz del repo. `servicios/*` = `spindlelab-astro/public/servicios/*/index.html`. `copy` = `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` (v1.2).

**Vocabulario (corregido tras la revisión independiente):** en el sitio, "medir" es el protocolo con el que se le pregunta a los motores si te nombran (cinco preguntas fijas por tres motores; `diagnostico/index.html`, bloque "Y cómo medimos si la IA te nombra"; `copy` §9 "Es el protocolo que usamos para medir"; paso 04 del método "medimos cada mes con el mismo criterio"). El chequeo de 21 señales, en cambio, "lee tu sitio". Por eso esta pieza no usa "cómo medimos" para el chequeo: la portada dice "cómo revisamos tu sitio" y la lámina 4 se rotula "Qué mira el chequeo". El verbo "mide" solo aparece donde la propia página lo usa para el chequeo ("Este chequeo mide si tu sitio está preparado, no si hoy te citan").

**Qué quiere decir cada estado:**
- **Verificado:** lo comprobé el 23-oct contra el archivo y contra el sitio vivo o la API.
- **Verificado en el sitio nuevo:** está en los archivos de `spindlelab-astro/` (el sitio que sale), pero el sitio vivo todavía dice otra cosa. Se re-verifica el día de publicar.
- **Declarado:** lo dice el sitio, y el repo no prueba que se haya ejercido. Se publica porque es lo que el sitio promete.
- **Razón declarada:** opinión de Ramón ya publicada, no un hecho medible.

---

## Lámina 1 · Portada

| Afirmación | Archivo que la respalda | Estado |
|---|---|---|
| Se puede leer cuánto cuesta (precios de partida publicados) | `servicios/*` (las seis); `copy` §2.6 "Precios publicados" | Verificado |
| Se puede leer cómo trabajamos (método escrito) | `spindlelab-astro/public/metodo/index.html`; `copy` §2.6 "Método escrito", §6 | Verificado en el sitio nuevo |
| Se puede leer cómo revisamos tu sitio (el chequeo con sus 21 señales y sus pesos, publicados) | `spindlelab-astro/public/diagnostico/index.html` ("Los 21 chequeos, publicados"; "El chequeo de arriba lee tu sitio"); `functions/api/chequeo.js`; `copy` §2.6 "Chequeo abierto" ("Escribes tu dominio y ves 21 señales, con lo que pesa cada bloque") | Verificado |
| "Antes de hablar con nadie": el chequeo corre sin registro ni correo, y los precios y el método se leen sin escribirnos | `diagnostico/index.html` ("Gratis y sin dejar tu correo"; FAQ "no pedimos tu correo"); API consultada con solo el dominio, sin sesión | Verificado |
| "Las tres cosas están publicadas en spindlelab.cl" | Las tres rutas existen en `spindlelab-astro/public/`. Precios y chequeo ya están en el sitio vivo; la redacción de `/metodo/` de esta pieza solo existe en el sitio nuevo | Verificado en el sitio nuevo. **Dependencia: go-live** |

## Lámina 2 · Cuánto cuesta

Precios comparados el 23-oct entre el archivo de `spindlelab-astro/` y el sitio vivo (`curl` a `spindlelab.cl/servicios/<ruta>/`): **coinciden los seis.**

| Fila de la lámina | Archivo | Qué dice el archivo | Estado |
|---|---|---|---|
| Auditoría SEO técnica, desde $490.000 | `servicios/auditoria-seo-tecnica` | "Auditoría completa… Desde $490.000 + IVA · una vez" | Verificado |
| Visibilidad en IA (auditoría), desde $400.000 | `servicios/visibilidad-en-ia` | "Auditoría de visibilidad… Desde $400.000 + IVA · una vez" | Verificado |
| Google Ads, gestión, desde $350.000 al mes | `servicios/paid-media` | "Gestión esencial… Desde $350.000 /mes + IVA"; "Gestión desde $350.000/mes · inversión aparte" | Verificado |
| "Pauta aparte" (Google Ads) | `servicios/paid-media` | "La inversión en pauta la pones tú… ese fee no incluye la inversión en pauta" | Verificado |
| ~~"Mínimo 3 meses" (Google Ads)~~ **QUITADO de la lámina** | `servicios/paid-media` lo dice ("…nunca la subimos sin tu confirmación. Mínimo 3 meses."), y es la única fuente: no está en `copy` (el FAQ de la home y §2.8 lo declaran solo para el acompañamiento mensual) ni en `informe-revision-externa`, `capacidad-servicios` o ventas | **Sin respaldo comercial.** Pendiente de Ramón (ver `publicar.md`): si lo confirma, se agrega a la home y recién ahí vuelve a la lámina |
| Gestión de redes, desde $390.000 al mes | `servicios/redes-sociales` | "Orgánico… Desde $390.000 /mes + IVA" | Verificado |
| "El creativo lo pones tú" (nota de la fila de redes) | `servicios/redes-sociales` | "Desde $390.000/mes · el creativo lo pones tú"; FAQ "¿Ustedes crean el contenido? No los producimos. Las piezas gráficas y el video los pones tú"; `copy` §5.5 y §4 FAQ ("No. Eso lo pones tú o un productor") | Verificado |
| Página web a medida, desde $390.000 | `servicios/desarrollo-web` | "4 packs · desde $390.000 + IVA"; pack "Página de campaña… Desde $390.000". El nombre "web a medida" es el del bloque de `copy` §2.5 ("Sitio web a medida"); la fila dice "página" porque el precio es el de una sola | Verificado |
| "Una página para una campaña" (nota de la fila web) | `servicios/desarrollo-web` | Pack Campaña: "Una página, para una campaña y una oferta"; "¿Necesitas más de una página? El sitio esencial parte en $690.000"; sitio completo desde $1.190.000; `copy` §2.5 "Desde una página de campaña hasta un sitio de doce páginas" | Verificado |
| Acompañamiento mensual, desde $590.000 al mes, mínimo 3 meses | `servicios/acompanamiento-mensual` | "Desde $590.000/mes · mínimo 3 meses · sin permanencias largas"; `copy` §2.8 FAQ y §4 ("desde $590.000 al mes, mínimo 3 meses"); `informe-revision-externa-2026-09-27.md` ("Recurrente, mínimo 3 meses") | Verificado |
| "Precios de partida" y "más IVA" | Las seis páginas ("Los precios no incluyen IVA (19%)"; "+ IVA") | | Verificado |
| "Octubre 2026" | Fecha de esta verificación (23-oct-2026) | | Verificado |
| "El valor final se cierra por escrito" | `servicios/auditoria-seo-tecnica` ("El valor final se cierra por escrito tras la revisión gratis"); `copy` §2.6, §4 FAQ "¿Publican precios?" | | Verificado |
| Título "Cada solución, con su precio de partida" | `copy` §2.5, intro: "Cada solución tiene su página, con lo que incluye y su precio de partida (más IVA)" | | Verificado |

Notas: en las seis soluciones el sitio publica además al menos un plan mayor (por ejemplo Auditoría + Visibilidad en IA desde $690.000, Gestión Pro desde $550.000, Sitio esencial desde $690.000). La lámina muestra solo el precio de partida de cada solución, que es lo que dice su título. En web ese precio es el de la página de campaña (una sola página): por eso la nota de la fila, para que nadie lea $390.000 como el precio de un sitio de varias páginas.

## Lámina 3 · Cómo trabajamos

Fuente de todo: `spindlelab-astro/public/metodo/index.html` (versión del sitio nuevo) y `copy` §2.4 y §6.

| Afirmación | Dónde | Estado |
|---|---|---|
| Cuatro pasos: Revisión gratis, Conversación y propuesta, Implementación, Acompañamiento mensual | `metodo/index.html`; `copy` §2.4. La lámina escribe "Implementación por fases", como el título y la meta description de `/metodo/` (`copy` §6) | Verificado en el sitio nuevo |
| 01: nos pasas la dirección de tu sitio y te devolvemos una página con lo más importante que encontramos | `metodo/index.html` paso 01 ("Todo parte con la dirección de tu sitio… Te devolvemos una página con los hallazgos y por dónde partiríamos"); `diagnostico/index.html` ("una página con lo más importante que encontramos") | Verificado en el sitio nuevo |
| 02: 20 minutos por videollamada; si hay trabajo, propuesta por escrito con qué hacemos, en qué fases y cuánto cuesta | `metodo/index.html` paso 02; `copy` §2.4 (es la frase de la home) | Verificado en el sitio nuevo |
| 03: hacemos lo acordado, o entregamos las especificaciones para que lo implemente tu equipo | `metodo/index.html` paso 03. `copy` §11: la implementación sobre un sitio ajeno está declarada y nunca ejercida; entregar especificaciones sí es posible | **Declarado** |
| 04: si quieres seguir, medimos cada mes con el mismo criterio | `metodo/index.html` paso 04 | **Declarado** (cero clientes de acompañamiento de pago, `copy` §2.5 y PLAN §6) |
| "El primero es gratis" | `metodo/index.html` paso 01 "Revisión gratis"; `contacto/index.html` FAQ "¿La revisión es gratis? Sí. Es nuestra primera entrega y no te cobramos por ella" | Verificado |
| "Cada fase termina con algo que apruebas antes de seguir" | `metodo/index.html` paso 03; `copy` §2.4. `copy` §11: probado en Desarrollo Web, no en los otros servicios | **Declarado** (probado en un servicio) |

**No se afirma:** ningún plazo. El método dice "plazos" dentro de la propuesta, pero la lámina no promete cuánto tarda nada.

## Lámina 4 · Qué mira el chequeo

Comprobado el 23-oct-2026 con `curl "https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl"`: `items` trae 21 señales; por bloque, `acceso` 5 señales y 30 puntos, `entidad` 8 y 40, `citabilidad` 8 y 30. `pesoTotal` 100.

| Afirmación | Archivo / comando | Estado |
|---|---|---|
| 21 señales | `functions/api/chequeo.js` (arreglo `items`); API del 23-oct: 21 | Verificado |
| ¿Te pueden leer? 30 puntos | `diagnostico/index.html` ("¿Te pueden leer? · 30 puntos"); API: bloque `acceso` suma 30 | Verificado |
| ¿Te entienden? 40 puntos | `diagnostico/index.html` ("¿Te entienden? · 40 puntos"); API: `entidad` suma 40 | Verificado |
| ¿Te pueden citar? 30 puntos | `diagnostico/index.html` ("¿Te pueden citar? · 30 puntos"); API: `citabilidad` suma 30 | Verificado |
| "Si los bots de IA en vivo no entran, nada de lo demás importa" | `diagnostico/index.html`, bloque "¿Te pueden leer?": "Si los bots en vivo no entran, nada de lo demás importa" (la página distingue a los bots que buscan en vivo de los que entrenan: "bloquear a los segundos no te quita ni una cita"). La lámina agrega "de IA" para que se entienda de qué bots se habla. **Ya no copia el texto de `chequeo.js` (`bloques[0].sub`: "Si los bots de IA no entran, nada más importa"), que no hace esa distinción** y refuerza el mito que la pieza del día 7 corrige (PLAN, riesgo 7) | Verificado en la página |
| "Qué eres, a qué te dedicas y dónde operas" | `functions/api/chequeo.js`, `bloques[1].sub`, texto literal | Verificado |
| "El formato en que la IA copia y atribuye" | `functions/api/chequeo.js`, `bloques[2].sub`, texto literal | Verificado |
| Escribes tu dominio | `diagnostico/index.html` ("Pon tu dominio… Revisar mi sitio"; FAQ "Escribes el dominio y ves el resultado completo en pantalla") | Verificado |
| Es gratis y no pedimos tu correo | `diagnostico/index.html` ("Gratis y sin dejar tu correo"; FAQ "Sí, y no pedimos tu correo") | Verificado |

**No se afirma:** ningún puntaje de spindlelab.cl (hoy da 85, no se cita) ni de otro sitio; ninguna cifra agregada de sitios revisados.

## Lámina 5 · Lo que no mide el chequeo

Todo sale de `spindlelab-astro/public/diagnostico/index.html`: bloque "Lo que este chequeo no mide" y FAQ. La lámina dice el límite **una sola vez** (titular + una línea de apoyo), como pide `copy` §1.4.

| Afirmación | Texto de la página | Estado |
|---|---|---|
| No mide si hoy te citan | "No mide si hoy te citan." | Verificado |
| Eso depende de que te mencionen en fuentes que la IA lee, como rankings, directorios y artículos, y no se puede saber leyendo tu sitio; hay que preguntarle a los motores | "Eso depende de que te mencionen en fuentes que la IA lee, y no se puede saber leyendo tu sitio: hay que preguntarle a los motores." (bloque "Lo que este chequeo no mide") más el FAQ: "Los motores arman sus respuestas con fuentes de terceros (rankings, directorios, artículos)". Las dos frases se fundieron en una sola línea de apoyo | Verificado |

**Se dejó fuera a propósito:**
- "Eso lo hacemos a mano", que la página agrega después de "hay que preguntarle a los motores". La consulta real a los motores es hoy un paso manual de Ramón y no una parte fija de la revisión (`copy` §12, decisión 7; PLAN §4).
- "Un puntaje alto tampoco garantiza que ChatGPT te recomiende" y "Puedes estar impecable por dentro y aun así no aparecer" (FAQ de la página). Decían el mismo límite que el titular; la v1 lo repetía cinco veces entre lámina y pie. Siguen publicados en `/diagnostico/`.

## Lámina 6 · Cierre

| Afirmación | Archivo | Estado |
|---|---|---|
| El chequeo se corre sobre tu sitio, sin registro, en spindlelab.cl/diagnostico | `diagnostico/index.html`; la ruta responde 200 con el UTM (23-oct) | Verificado |
| "Pide la revisión de una página" en spindlelab.cl/contacto | `contacto/index.html` (H1, formulario, "Pedir la revisión"); responde 200 con el UTM (23-oct) | Verificado en el sitio nuevo |
| La revisión es gratis | `contacto/index.html` FAQ; `diagnostico/index.html` ("Es gratis") | Verificado |
| "Si prefieres que lo veamos nosotros": hay una revisión hecha por personas | `diagnostico/index.html` ("La revisión que hacemos a mano"); `copy` §2.1 | Verificado |

**No se afirma:** plazo de entrega de la revisión.

## Pie de foto

| Afirmación | Archivo | Estado |
|---|---|---|
| "Lo dejamos escrito porque es difícil contratar algo que no puedes comparar" | Argumento publicado por Ramón el 1-sep-2026 en LinkedIn (singular: "Alguien que hoy necesita contratar visibilidad en motores de IA no tiene con qué comparar"), en `.claude/skills/voz-spindlelab/corpus.md` §1. Acá va en plural de marca | **Razón declarada**, no un dato |
| Cada solución tiene su precio de partida publicado, con lo que incluye | `copy` §2.5 (intro) | Verificado |
| El método tiene cuatro pasos y el primero es una revisión gratis | `metodo/index.html` | Verificado en el sitio nuevo |
| Puedes leer cómo revisamos tu sitio (gancho) y el chequeo con el que revisamos tu sitio lo puedes correr tú: 21 señales, gratis y sin dejar tu correo | Ver lámina 1 y lámina 4. No dice "medimos": ver "Vocabulario" arriba | Verificado |
| El chequeo mide si tu sitio está listo para que la IA lo lea, no si hoy te citan | `diagnostico/index.html` FAQ "¿Qué mide exactamente el puntaje?" y "Este chequeo mide si tu sitio está preparado, no si hoy te citan" | Verificado |
| Enlaces con UTM (`utm_source=instagram`, `utm_medium=social`, `utm_campaign=antes-de-contratar`) | Receta de `marketing/redes/2026-10-octubre-posicionamiento/PLAN.md` §3; `contacto/index.html` guarda `utm_source`, `utm_medium` y `utm_campaign` en campos ocultos | Verificado |

---

## Lo que la pieza NO afirma

Resultados de cualquier tipo, plazos, clientes, logos, testimonios, nombres de prospectos, cifras internas del outbound, el caso de Bernardo Combeau, la Ley 21.719 o Verifica y Cumple, cómo se usa la IA por dentro, disponibilidad ("pocos proyectos a la vez"), la palabra "socio", comparaciones con otras agencias, ni que una IA vaya a citar a nadie, ni que Google Ads tenga un mínimo de meses.

## Qué hay que re-verificar el día de publicar

1. Los seis precios, el "mínimo 3 meses" del acompañamiento y las notas de fila de la lámina 2 ("pauta aparte", "el creativo lo pones tú", "una página para una campaña"); comando en `publicar.md`. Además, la decisión de Ramón sobre el mínimo de Google Ads.
2. Que `/metodo/` publicado diga lo que dice la lámina 3.
3. 21 señales con el reparto 30/40/30 (comando en `publicar.md`).
4. Que `/diagnostico/` siga diciendo "Gratis y sin dejar tu correo", "No mide si hoy te citan" y "Si los bots en vivo no entran, nada de lo demás importa".
