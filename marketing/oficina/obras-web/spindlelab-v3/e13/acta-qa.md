# Acta de QA · SpindleLab, sitio nuevo en la raíz · obra E13 · ronda 1

> La escribe Javiera (`/web-qa-critico`) en contexto limpio (subagente): leyó el brief, la spec, los seis `desvios/*` y las fuentes; no vio la conversación donde se construyó. No arregló nada: el único archivo del repositorio que modifica es esta acta (más `capturas-qa/` y `lectura-fria/`, que son su evidencia).

**Fecha:** 26-oct-2026 · **Rama:** `claude/v3-modelo-nuevo` · **Sitio auditado:** árbol de `spindlelab-astro/` en `1c65e6a6`, construido en la raíz (22 rutas + `/privacidad/` y `404.html` estáticas). Durante la auditoría `HEAD` avanzó a `0fc30c3f` (solo `lista-publicacion.md`, `armar-corte.mjs` y `ver-el-sitio.sh`; `git diff 1c65e6a6 HEAD -- spindlelab-astro` está vacío), así que lo medido vale para los dos. · **Rondas previas:** la QA de E12 (23-oct, «Con reparos») es de otra obra; esta es la primera de E13 (quedan hasta dos).

## Veredicto

**APROBADO CON REPAROS.**

Los 17 criterios medibles de `spec-home.md` §6 se reproducen (la home y el marco cumplen), el barrido de términos, los precios, la atribución UTM, el formulario, el peso, el chequeo propio (94) y los JSON-LD pasan, y de las 25 afirmaciones a corregir de la revisión del 23-oct 22 quedaron cerradas o cerradas de otra manera, 1 cerrada con un residuo, 1 abierta en un verbo y 1 abierta por decisión de Ramón. **No hay bloqueantes** (nadie queda sin poder contactar, nada sale del índice, el sitio no afirma resultados). Hay **6 mayores y 12 menores**. Los mayores son correcciones de texto, de una imagen, de un registro y de un criterio de lectura; ninguno toca el diseño ni la estructura.

**Reparos con plazo:** cerrar los mayores 1 a 6 (o dejarlos decididos por escrito por Ramón) **antes de armar el corte**; lo que cambie se revisa en una QA exprés. Los menores se anotan; el 13 se vuelve a mirar el día del corte.

Conteo: **0 bloqueantes · 6 mayores · 12 menores.**

## Cómo se verificó

- **Build:** `construir.sh javiera` (copia fuera de iCloud, `astro build`): 22 páginas en 1,34 s, sin errores ni avisos. Node v24.18.0 (producción usa Node 20 por `.nvmrc`: sin ensayar), Chrome 155.0.8059.85, Playwright 1.63. Un servidor estático propio sirvió el `dist`.
- **`verificar.mjs`** a 390, 768 y 1440 sobre las 22 rutas (`--excluir /privacidad/`): «Sin hallazgos» en los tres (a 1440 avisa «6 nodos sobre imagen o degradado: el contraste ahí se revisa a ojo»; ver el contraste de la portada más abajo).
- **Capturas:** las 22 rutas + `/privacidad/` a 390, 768 y 1440 (173 cortes de 1.800 a 2.400 px) y `404.html` a 1440, con overflow medido en la página (`scrollWidth == clientWidth` y, con `overflow-x: visible` forzado, ningún elemento con `right > innerWidth`): 0 páginas con desborde en las 69 combinaciones (solo sobresalen, recortados por su contenedor, la tabla de `/blog/21-chequeos-visibilidad-ia/` a 390 y 768 y la píldora del menú de `/privacidad/` a 768). Miré con la herramienta Read **42 cortes sueltos, 13 hojas de contacto** (2 a 4 cortes lado a lado) y 3 capturas de primera pantalla: la home a 1440 y a 390 completas y a 768 el primer corte; `/trabajo/`, `/trabajo/combeau/` (1440 completo y 390 en hoja), `/servicios/`, `/metodo/`, `/nosotros/`, `/contacto/` y `/diagnostico/` a 1440 (los dos últimos, parcial), 390 y 768 (hojas); de las seis páginas de servicio, la primera pantalla de Auditoría, Paid Media y Acompañamiento a 1440, Desarrollo web y Visibilidad casi completas a 1440, y Desarrollo web, Redes y Acompañamiento a 390; el índice del blog y `como-aparecer-en-chatgpt` (1440 y 768); la tabla de `21-chequeos` (390 y 768); `/privacidad/` a 1440. **No miré a ojo** los otros cinco artículos del blog ni las páginas de Auditoría, Paid Media y Redes a 768, ni Auditoría y Paid Media a 390, ni el segundo corte de `/nosotros/` y de `/contacto/` a 1440: de esas rutas tengo texto íntegro, overflow medido, `verificar.mjs` y los volcados.
- **Primera pantalla de la home** en 12 tamaños (los 7 pedidos más 5 de la spec), con y sin aviso de cookies: `elementsFromPoint` en el centro y las cuatro esquinas del botón.
- **Contraste de la portada** medido por mi cuenta: 11 cuadros del video × 7 tamaños, fondo = percentil 99 de luminancia bajo cada línea de texto (texto oculto).
- **Foco:** Tab hacia adelante (89 enfoques por pasada) y 15 Shift+Tab, en la home a 1440 y 390 con y sin aviso, y en `/servicios/`, el artículo `21-chequeos` (390), `/contacto/` (390), `/trabajo/combeau/` y `/diagnostico/`.
- **Metas, JSON-LD y señales:** todos parseados con `JSON.parse`; `FAQPage` comparado con el texto de la página por `textContent` en las 16 páginas que lo declaran; `canonical`, `og:url` y `robots` contra las 22 URL del `sitemap.xml`; las 22 imágenes al compartir abiertas y leídas en 4 hojas de contacto.
- **Texto:** volcado de cada ruta (texto visible, metas, JSON-LD) y diferencia por frases contra `fuentes/v2-vigente/*.txt` (el texto aprobado el 24-oct); barrido de términos (`barrer-terminos.mjs`) y mis propios barridos de voseo, frases de folleto, Title Case, rayas y números.
- **Atribución UTM:** `utm.mjs` (4 de 4) y ocho recorridos míos con clic real (portada, encabezado, cierre, servicio, artículo, chequeo -> «Pedir la revisión a mano», menú, directo), todos con los tres campos llenos. Formulario enviado con el endpoint interceptado: 12 campos idénticos a los de `origin/main`, confirmación «Listo…», `generate_lead` solo con consentimiento.
- **Protegidos:** `git diff origin/main -- spindlelab-astro/functions spindlelab-astro/public/_headers spindlelab-astro/public/_redirects spindlelab-astro/public/js`: vacío. Campos del formulario contra `git show origin/main:spindlelab-astro/public/contacto/index.html`: los 12 `name` en el mismo orden, mismos `#f-utm-*`, misma casilla y mismo `access_key`.
- **Peso, chequeo propio, lectura en frío:** ver las secciones de abajo. Mis capturas y herramientas están en el scratchpad (`…/scratchpad/javiera/`); a `capturas-qa/` copié 10 JPEG y a `lectura-fria/` las respuestas íntegras.

## Defectos

Severidad: **bloqueante** = deja a un visitante sin contactar, saca al sitio del índice o afirma en público algo falso; **mayor** = el entregable no cumple un criterio o una regla de la obra; **menor** = se corrige si no cuesta o se anota.

### Mayores

| # | Dónde | Qué está mal | Contra qué | Cómo se reproduce |
|---|---|---|---|---|
| 1 | `/servicios/visibilidad-en-ia/` (franja bajo el encabezado; `public/v3/medios/chequeo-239.webp` y `-43.webp`) | La imagen es una captura de la página del chequeo **anterior** y trae texto horneado: «…entender qué haces y **citarte**» (la palabra que `desvios/interiores.md` retiró de todo lo demás), «**Ninguna herramienta del rubro publica su metodología**» (superlativo sin fuente), la frase cortada por el borde («…para qu»), y un campo de formulario falso (píldora «tuempresa.cl» + «Revisar mi sitio») en el lenguaje visual anterior (píldoras, Inter), fuera del sistema A · Archivo. A 1440 el `alt` («¿Te puede leer la IA?…») no describe lo que se ve (esa frase solo está en la variante móvil `-43`). `desvios/servicios.md` §2.5 lo declara y lo deja abierto: sigue publicable | `guia-para-roles.md` §3 (cero «citarte», cero prueba sin respaldo); antislop A9 y C5; spec §7.1 en espíritu (un campo que parece interactivo y no lo es). Fuente: `capturas-qa/03-visibilidad-en-ia-franja-chequeo-1440.jpg` | Abrir la ruta a 1440 y mirar bajo los botones; o abrir `/v3/medios/chequeo-239.webp` |
| 2 | `extraer-texto.mjs --comprobar` | Resultado: **16 de 16 «DISTINTO»** (se pedía todo «igual»). Causa: `convertir-a-raiz.mjs` reescribió `/v3/…` -> `/…` en las copias `src/data/archivo/texto/*.json` (queda el `sha256` de la fuente, pero `texto` ya no es el de la fuente); en las fuentes `e13/texto/*.json` siguen los `/v3/`. Consecuencias: el guardián de huella ya no certifica nada, y **volver a correr `extraer-texto.mjs`** (lo que la guía §4 manda hacer a cada rol para cambiar un texto) reintroduce enlaces `/v3/…` que no existen. No está declarado en ningún `desvios/*`, en el brief ni en `lista-publicacion.md` | `guia-para-roles.md` §4 (copias con huella, «no se editan a mano»); brief §10 (historial, conversión a raíz) y §8; pedido de esta QA | `node …/e13/herramientas/extraer-texto.mjs --comprobar` (solo lee). Con `/v3/` -> `/` aplicado a la fuente, 13 de 16 quedan iguales; `comun`, `home` y `trabajo` difieren además porque los medios conservan `/v3/` |
| 3 | `/` (y `/servicios/`) · lectura en frío | Tres lectores aislados (`claude -p`, perfiles: dueña de consultora, gerente de clínica, dueño de restaurante) respondieron bien qué hace SpindleLab, para quién y cuál es el primer paso, pero **los tres tropiezan con términos sin explicar**: «si Google y las IA pueden leerlo» (3 de 3, uno con la frase gemela «para que la IA lo lea»), «ves 21 señales, con lo que pesa cada bloque» (3 de 3), «Uso agentes de IA…» (3 de 3 dudan de lo que reciben), «Paid Media (Google)» y «visibilidad en IA» (2 de 3 cada una), «sin plantillas ni WordPress» leído como desventaja (2 de 3). Además **2 de 3 leen dos precios distintos para lo mismo**: el bloque «Búsqueda y visibilidad en IA» de la home muestra un solo «Desde $400.000 + IVA · una vez» y enlaza a Auditoría SEO técnica (desde $490.000) y a Visibilidad en IA (auditoría desde $400.000); una lectora lo puso entre sus tres mayores frenos («si no me cuadra el precio, me pregunto qué más no cuadra»). El texto del bloque viene del v2 aprobado y los montos coinciden con `origin/main` (criterio 6), así que no es un error de dato sino de lectura | Brief §7.4 («sin tropezar con un término sin explicar»). Respuestas íntegras en `lectura-fria/lector-1..3.txt` | Leer `lectura-fria/lector-*.txt` (secciones E y «las tres cosas que más me frenaron»). Bloque de la home: `capturas-qa/09-home-1440-bloque-con-un-precio-y-dos-servicios.jpg` |
| 4 | Home sección 6 («…y hoy lo opera él») y `/trabajo/combeau/` («El panel existe y lo opera él») | Afirmación de **uso presente** sin registro. La fuente (`revision-panel-admin-bernardo.md`) dice que Bernardo «ya volvió a usar el panel» y, en el mismo párrafo, que el login no funcionaba y no podía entrar hasta el 23-sep; no hay un registro de uso posterior. La fila 10 de la revisión se cerró a medias: salieron la fecha y la campaña, quedó el verbo. `desvios/home.md` §7.1 lo deja como decisión de Ramón y propone el texto conservador, pero **el valor construido es el que afirma más** | Revisión de veracidad, fila 10; brief §6.5 y guía §3 (cero prueba sin respaldo) | `grep -n "lo opera" ` sobre el volcado de `/` y de `/trabajo/combeau/` |
| 5 | `/trabajo/combeau/` (sin pie) | Tras contestar el aviso **no hay en la página ningún control de cookies, ni enlace visible a `/privacidad/`, ni correo** (`#cookie-preferencias` no existe; el único enlace a la política está dentro del aviso ya cerrado). La política v1.4 dice: «Al final de cualquier página, junto al enlace a esta política, hay un control… que abre el mismo aviso para que elijas de nuevo»: falso en esta página. Viene de `spec-visual.md` §2 («el caso no tiene pie») frente a `spec-home.md` §3.4 («el pie cambia en todas las rutas»): contradicción entre specs, no declarada en `desvios/trabajo.md`. Además, con el aviso abierto y la página al final, a 390 y 360 «[ Todo el trabajo ] (2)» queda tapado por el aviso y la barra del caso (sin poder subirlo con scroll) y a 768 parcialmente; en la captura a 390 el botón final queda con unos 14 px bajo la barra | Política de privacidad (§ cambiar de opinión); `spec-home.md` §3.4 y §6.8 (foco no tapado por el aviso) | Poner `localStorage.spindlelab_consent = 'denied'`, abrir la ruta y buscar `#cookie-preferencias` (0 resultados; las otras 21 rutas lo traen). Fuente: `capturas-qa/05-combeau-390-final-con-aviso.jpg` |
| 6 | Registro de desvíos | **Desvíos sin declarar o desactualizados.** (a) `desvios/trabajo.md` §5.1 dice «propuesta, no la apliqué» para el muro parejo de `/trabajo/`, pero el commit `1c65e6a6` la aplicó (`PORTADAS` con `combeau-fotografia-169` en `p-53`; sale en el `alt` «…a 1440»): el código y el registro se contradicen y solo el mensaje del commit lo dice. (b) El `sitemap.xml` construido trae 22 URL (suma `/trabajo/` y `/trabajo/combeau/`); el brief §7.12 habla de sumar `/trabajo/` (21) y el mensaje de `452f3bac` dice «sitemap de 21 URL». (c) `desvios/interiores.md` aún dice que las cuatro interiores usan `og-posicionamiento.jpg?v=1`; el build usa `og-e12-<ruta>.jpg?v=2` (lo declara `home-construccion.md`). (d) Los defectos 2 y 5 | Skill de QA, paso 4 (un desvío no declarado es defecto mayor aunque la decisión sea buena) | `git show 1c65e6a6 -- spindlelab-astro/src/pages/trabajo/index.astro` y `desvios/trabajo.md` líneas 59 a 60 |

### Menores

| # | Dónde | Qué está mal | Contra qué | Cómo se reproduce |
|---|---|---|---|---|
| 7 | `/servicios/`, `/servicios/visibilidad-en-ia/`, `/acompanamiento-mensual/`, `/paid-media/`, `/metodo/`, `/diagnostico/` a ≥ 1194 px | El texto de la columna c1 a c4 (h2 o párrafo) termina a **8 a 13 px** del contenido que arranca en c5 (el gutter `--a-g` es 8 px): p. ej. a 1440, «Lo que incluye cada mes» termina en x=360 y la lista empieza en x=370; en `/servicios/` el párrafo de cada bloque llega a x=362 y el enlace «Auditoría SEO técnica» empieza en x=370. Se lee como una sola línea corrida. Es de la spec, no de la construcción | Legibilidad; `capturas-qa/06-servicios-1440-hueco-de-8px.jpg` | Script de gutter: mínimo 8 px (`/diagnostico/` a 1194), 9 (`/servicios/visibilidad-en-ia/`, `/metodo/`), 10 (acompañamiento, paid media), 11 (`/servicios/`) |
| 8 | `/metodo/` a 390 | Tres enlaces de fila («Ver la auditoría», «Ver las soluciones», «Ver el acompañamiento») miden **17 px de alto** y no se estiran. Diego lo declaró y no lo corrigió | `spec-home.md` §6.17 (≥ 44 × 44 en enlaces de las filas) | `a` dentro de `.datos-fase` a 390 px de ancho |
| 9 | `/llms.txt` | Describe el bloque de acceso del chequeo como «30 puntos: GPTBot, ClaudeBot, PerplexityBot, Google-Extended y HTTPS», la clasificación anterior. `/diagnostico/` y el artículo de los 21 chequeos dicen otra cosa (robots de búsqueda en vivo 7+7+8, entrenamiento 2, HTTPS 6) y es justo la distinción que el sitio defiende | Revisión, fila 11 (llms.txt contradictorio) | `grep -n "acceso" dist/llms.txt` |
| 10 | `dist` (`public/` fuera de `public/v3/`) | **23 MB sin referencia** desde ninguna página: `hero-hilo-de-oro.mp4` (5,1 MB), `video/metodo.mp4` (5,0), `video/servicios-oficina.mp4` (4,9), `video/problema.mp4` (3,8), `video/evidencia-oficina.mp4` (3,2), sus pósters y cuatro `og-*.jpg` anteriores. `lista-publicacion.md` §8 declara solo `hero-hilo-de-oro.mp4`, su póster, `og.jpg` y `logo-spindlelab.png`. Ya están en producción hoy, no crecen con el corte. (`public/v3/` sí cumple: 27.153.688 -> 8.660.004 B, 156 -> 42 archivos) | Brief §7.8 y §5 (no dejar peso sin uso) | Script de archivos sin referencia sobre el `dist` |
| 11 | Blog (`que-es-aeo-geo`, `21-chequeos-visibilidad-ia`, `como-aparecer-en-chatgpt`, `como-elegir-…`) | Afirmaciones comparativas o causales **sin fuente** que sobrevivieron: «las empresas que se describen igual… ganan por goleada», «las páginas que responden preguntas específicas superan siempre al folleto» y «una parte creciente de las decisiones… empieza con una pregunta a una IA» (aeo); «una distinción que casi ninguna herramienta hace», «el fallo que menos se detecta y el que más caro sale», «casi nadie bloquea estos bots a propósito», «llms.txt… todavía no lo tiene casi nadie» (21 chequeos); «Los modelos citan con confianza lo que entienden sin ambigüedad», «Es una sola inversión con dos retornos» (como-aparecer). Y `elegir` cierra con «Puedes usar esta misma vara con nosotros» sin tener un caso con antes y después (la frase honesta que Clara propuso está sin decidir, `desvios/blog.md` §3.3) | Antislop A9 y B (cero afirmación sin respaldo); brief §6.4 en espíritu | `grep -n` de cada cita sobre `texto/blog__*.txt` |
| 12 | Nombres de plan, home, servicios y blog | Title Case en lo que ve el público: «Página de Campaña», «Sitio Esencial», «Sitio Completo», «Plataforma a Medida», «Auditoría Completa», «Gestión Esencial», «Orgánico + Pauta», «Paid Media (Google)». Es un **defecto del brief**: §7.11 pide cero Title Case y §6.3 y §7.6 congelan los nombres de plan y de servicio (los guardianes los comparan). Declarado en `desvios/servicios.md` §2.9; decide Ramón | Brief §6.3 frente a §7.11 | Mirar los títulos de plan en las seis páginas de servicio |
| 13 | `/privacidad/` y `404.html` del árbol auditado | Son las versiones **anteriores al 24-oct** (la rama no las tocó y `main` sí): «Diagnóstico gratis» en el menú de `/privacidad/` (único hallazgo de `barrer-terminos.mjs` fuera de la URL del blog), «Chequea tu sitio» y «Irónico para una consultora SEO, ¿no? Por eso nuestras auditorías incluyen detección de enlaces rotos» en el 404, pie «SEO técnico · AEO/GEO · Chile», `style.css?v=29` contra `?v=30` de `main`, y los enlaces `/#evidencia` y `/#nosotros` que ya no existen en la home. **Mitigado:** `armar-corte.mjs` (en `0fc30c3f`) devuelve las dos páginas de `origin/main` y cambia dos enlaces. Revisé las de `main`: 0 términos del barrido, la única raya larga es un comentario HTML. Queda como pie de obra: ambas conservan la identidad anterior (declarado en `lista-publicacion.md` §8). Riesgo solo si alguien copia `spindlelab-astro/` de la rama sin pasar por el corte | Brief §7.5 a la letra; `capturas-qa/04-privacidad-1440-identidad-anterior.jpg` y `10-404-1440-texto-anterior.jpg` | `node …/barrer-terminos.mjs <dist>` -> «diagnóstico gratis/gratuito: 1» en `privacidad/index.html` |
| 14 | Chequeo propio | La home saca **94**: falla solo «Te conectas con al menos 3 perfiles externos» (declara 2: LinkedIn e Instagram). Cumple el umbral (≥ 83), pero el instrumento público que el sitio promueve le quita 6 puntos al propio sitio | Brief §7.9 (cumple); memoria «un instrumento público se voltea» | `node chequeo-propio.mjs <dist>` (adaptado de Diego: raíz `/index.html`) |
| 15 | `/robots.txt` | Una raya larga en el comentario de la primera línea (entre «SpindleLab» y «spindlelab.cl») y la frase «nuestro negocio es la visibilidad en IA», del posicionamiento anterior. Es público; no cambió respecto de `main` | Brief §7.11 a la letra | `cat dist/robots.txt` |
| 16 | CSS global y cabecera | El `_astro/_slug_.*.css` (13 kB, todas las páginas) conserva tokens y reglas del diseño anterior sin uso (`--gold: #c9a227`, `#nav.scrolled` con `backdrop-filter`, `.backdrop-blur`); ningún elemento renderizado de las 22 rutas tiene un tono dorado (solo el video de la portada), y `archivo.css` está limpio como pide la spec §5. Y cada página pide `inter.css` y `manrope.css` (dos hojas bloqueantes que no bajan ninguna letra: solo cargan Google Sans Flex y DM Mono) | Antislop C7 y spec §5 y §1 (ningún token que no esté en la spec) | `grep -c "var(--gold" dist/_astro/*.css` (0) y `head` de cualquier página |
| 17 | `/blog/21-chequeos-visibilidad-ia/` a 390 | La tabla de 21 filas queda en un contenedor desplazable en horizontal que muestra dos columnas y media; no hay ninguna pista visible de que «Cómo se arregla» y «Peso» están a la derecha (sí es enfocable con Tab) | Usabilidad; antislop C6 | Abrir la ruta a 390 px. Fuente: corte `blog__21-chequeos-visibilidad-ia-390-02` |
| 18 | `/` | Dos h2 llevan punto final y los otros seis no: «Lo que puedes revisar antes de contratar.» y «Lo esencial, en claro.». Vienen del texto del v2; en la home nueva se ve la inconsistencia | Voz / consistencia (`web-copy-interfaz`) | Mirar los h2 de la home |

## Cumplimiento del brief

| # | Criterio | Resultado | Medición |
|---|---|---|---|
| 1 | Build sin errores y guardianes del texto activos | **Cumple** el build (22 páginas, 0 errores, 0 avisos; los guardianes `igualQue`/`contiene` no cayeron). **Defecto 2:** la huella `--comprobar` no pasa | `astro build`; `extraer-texto.mjs --comprobar` 16/16 DISTINTO |
| 2 | `verificar` sin hallazgos a 390, 768, 1440 | **Cumple** | 22 páginas por ancho, «Sin hallazgos» |
| 3 | Home: 9 secciones en orden, botón visible (también con aviso), enlace secundario, `FAQPage` igual | **Cumple** | 9/9 en el orden del brief §4 (1 h1, 8 h2); botón en 11 de 12 tamaños con aviso (320×568 queda bajo el aviso: excepción dicha por la spec); `FAQPage` 5/5 idéntico al visible; el chequeo es un enlace, no un botón |
| 4 | Lectura en frío | **No cumple la cláusula «sin tropezar»**; sí la sustancia (3/3 entienden qué hace, para quién y el primer paso, gratis y en un día hábil) | Defecto 3; `lectura-fria/` |
| 5 | Barrido de términos sobre todo lo publicado | **Cumple en lo construido por la obra, con tres matices.** 0 de «24 horas», «partners», «monitoreo doble», «quincenal», «share-of-voice», «AI Overviews», «compromiso», «NDA habitual», «más de cinco años», «Más elegido», «sin compromiso», «¿Listo para…?», «Estudio de diseño y tecnología». «agentes de IA»: solo en Quién está detrás (home) y Nosotros. «motor»: 105, todos «motores de IA» o «motor generativo» (permitido). «mini-diagnóstico»: 25, todos en la URL del artículo `que-es-un-mini-diagnostico-seo` (canonical, `@id`, sitemap, `llms.txt`, nombre del archivo de la tarjeta; declarado en `desvios/blog.md` §2). Matices: «Diagnóstico gratis» en la `/privacidad/` del árbol auditado (defecto 13) y 2 rayas en `robots.txt` (defecto 15) | `barrer-terminos.mjs` y mis `grep -E` con locale UTF-8 sobre los volcados |
| 6 | Precios idénticos a `origin/main` | **Cumple** | Seis páginas de servicio: mismos montos visibles y mismos `price`/`minPrice` del JSON-LD que `origin/main`. Índice: mismos montos más $550.000 y $790.000, que ya estaban en las páginas de servicio de `main`. Home: mismos montos que `v2-vigente/home.txt`. Todo monto con «desde» (o «parte en») y «+ IVA» o «más IVA» antes. `/metodo/` suma $490.000 y $590.000/mes (no tenía precios en `main`; coinciden con los servicios y con los guardianes `comprobarPrecio`). El único precio que no es nuestro: los rangos de mercado del artículo `cuanto-cuesta` |
| 7 | UTM | **Cumple** | 4/4 de `utm.mjs` y 8/8 recorridos con clic real; tres campos llenos |
| 8 | Peso | **Cumple** con la aclaración del 26-oct | Home a 1440: primera carga **1.398 kB** (1.246 con brotli en texto), recorrida **1.561 kB** (1.409 con brotli), sin movimiento 535 kB; a 390: 755 kB y 918 kB recorrida. Sobre 1.500 kB solo si se lee «recorrida» con la cifra sin comprimir (el criterio aclarado dice 1.600 kB). `public/v3`: 8.660.004 B en 42 archivos (antes 27.153.688 en 156). **Defecto 10** fuera de `public/v3` |
| 9 | Chequeo propio ≥ 83 | **Cumple: 94** | `chequear()` de `functions/api/chequeo.js` sobre el `dist` servido (defecto 14) |
| 10 | Detector anti-slop, Javiera, subagente limpio, máx. dos rondas | **Corrido** (esta acta); ronda 1 | Secciones siguientes |
| 11 | Cero rayas, Title Case, «¿Listo para…?», «en Chile» de relleno | **Parcial** | Rayas: 0 en HTML visible, atributos y JSON-LD; 2 en `robots.txt`. Title Case: solo los nombres de plan (defecto 12, contradicción del brief). «¿Listo para…?»: 0. «en Chile» en title o description: 0 (aparece en un h1 donde Chile es el dato, y en los slugs) |
| 12 | 20 URL vivas con equivalente y el sitemap suma `/trabajo/` | **Cumple** | 20 de 20; el sitemap trae 22 (suma `/trabajo/` y `/trabajo/combeau/`; ver defecto 6b); las 22 responden, declaran su canonical y ninguna lleva `noindex` |

## Cumplimiento de la spec (`spec-home.md` §6, medido sobre el `dist`)

| # | Qué se mide | Valor medido | Umbral | |
|---|---|---|---|---|
| 1 | Botón `#portada-cta` entero, sin nada encima, primera pantalla | Con aviso (margen): 360×640 **30** · 360×800 167 · 375×667 69 · 390×844 213 · 414×896 251 · 768×1024 231 · 834×1112 52 · 1024×768 53 · 1194×834 72 · 1440×900 55 · 1920×1080 55 · **320×568 −22 (3 de 5 puntos tapados)**. Sin aviso: entra en los 12 (mínimo 121). 0 puntos tapados en todos salvo 320×568 | ≤ borde del aviso | Cumple (320×568 es la excepción dicha) |
| 2 | Contraste del texto de la portada sobre el video | Mínimo **5,38:1** (rótulo a 1024×768); 5,5:1 a 1194 y 1440; 7,02:1 bajo 834; h1 15,8 a 20,3:1; botón blanco sobre fondo ≈ 16:1 | ≥ 4,5:1 | Cumple |
| 3 | Un h1 y jerarquía | 1 h1, 8 h2, h3 dentro de las filas, 0 saltos (también en las otras 21 rutas) | 1 y 8 | Cumple |
| 4 | `FAQPage` = FAQ visible | 5 de 5 (`name` y `text` idénticos por `textContent`); las 15 páginas restantes con FAQ también, sin diferencias | exacto | Cumple |
| 5 | Altura de la home tras recorrer | 1440 **6.597** · 1024 **6.692** · 768 **8.391** · 390 **7.879** | ≤ 7.000 · 7.300 · 8.800 · 8.200 | Cumple |
| 6 | `a.cab__cta[href="/contacto/"]` | 616 comprobaciones (21 rutas × 7 anchos × 4 posiciones de scroll), 0 fallas: presente, 44 de alto, borde derecho ≤ borde del contenido, sin `aria-current`, dentro de los 64 px de arriba plegado bajo 834; ausente en `/contacto/` | presente y entero | Cumple |
| 7 | Un solo destino de acción principal | Los 3 `a.boton--claro` de la home (barra, portada, cierre) van a `/contacto/` | 3 de 3 | Cumple |
| 8 | Foco visible y no tapado | 89 enfoques por pasada: 0 sin indicador (contorno de 2 px, blanco, y gris `#989898` en el botón «Cookies» de `consent-banner.js`, 7,0:1), 0 tapados por el encabezado ni por el aviso (un «cubierto» transitorio a los 60 ms era la imagen en su entrada y se despeja a los 400 ms). Shift+Tab igual | 0 tapados | Cumple |
| 9 | Sin desborde | 9 anchos (320 a 1920) en home, `/servicios/`, `/trabajo/combeau/` y `/contacto/`: `scrollWidth == innerWidth` y 0 elementos pasados | 0 | Cumple |
| 10 | Peso | Ver brief 8 | ≤ 1.600 recorrida, ≤ 1.400 primera carga, ≤ 950 a 390 | Cumple (**primera carga 1.398 kB: 2 kB de margen**) |
| 11 | Campos de color | Un campo: `verifica-y-cumple-12-169`, 747×420 = **3,31 %** de la página a 1440; el medio de Combeau mide lo mismo y no es campo; 1 seguido | ≤ 20 %, ≤ 3 seguidos | Cumple |
| 12 | Un solo dorado | Póster de la portada 3,61 %; los tres medios 0,00 %; ningún elemento renderizado en las 22 rutas con tono 30 a 60° (solo `/privacidad/`, anterior); `archivo.css` sin dorado (defecto 16: token muerto en otra hoja) | solo el hilo | Cumple |
| 13 | Orden de la portada bajo 834 | A 390, 360 y 768: rótulo < h1 < botón < microcopy < enlace < entradilla; DOM rótulo, h1, entradilla, acción | los dos órdenes | Cumple |
| 14 | Retirado | Sin `cinta`, sin archivos de Praxi ni de los cuatro conceptos, sin `#chq-*` ni `v3-chequeo.js` en la home; `public/v3` 8,66 MB | ≤ 9 MB | Cumple |
| 15 | Nueve secciones en orden | Portada, Dónde puede caerse una consulta, Para empresas que ya venden, Cómo partimos y cómo seguimos, Lo que podemos hacer por ti, Lo que puedes revisar antes de contratar, Quién está detrás, Lo esencial en claro, cierre | el orden de §1 | Cumple |
| 16 | Movimiento reducido | Con `reduce`: el video no pide archivos (0 peticiones de video), la pausa dice «Seguir el video» con `aria-pressed="true"`, la placa pasa a opacidad 1 sin transición. Sin `reduce`: resorte de 650 ms (`linear()`) | cumple | Cumple (no medí los 167 ms lineales bajo 834) |
| 17 | Áreas de toque bajo 834 | Home a 360, 390 y 768: 33 controles, **0 bajo 44 × 44**. Fuera de la home: `/servicios/` ok (las filas se estiran con `::after`; área efectiva de 192 px en la primera); `/metodo/` 3 enlaces de 17 px (defecto 8) | ≥ 44 × 44 | Cumple en la home |

Otros contratos de la spec: §7 (prohibiciones): ninguna segunda acción con forma de botón en las secciones 2 a 8 (el único `boton--placa` es «Conocer a Ramón», permitido), 0 `#chq-*`, 0 tarjetas, 1 solo corchete, 2 rótulos mono (máximo 6), 5 ítems del menú visibles bajo 834 (solo se oculta «Contacto»). §3.2 encabezado: 15 anchos × 3 rutas × plegado y sin plegar, 0 solapes entre logo, menú, hora y botón. §3.4 pie: cuatro enlaces presentes en 21 de 22 rutas (la excepción es el defecto 5).

### Desvíos no declarados

Ver el defecto 6 (muro de Trabajo, sitemap de 22, `og` en `interiores.md`) y el 2 (efecto de la conversión a raíz sobre las huellas). Declarados y aceptados como tales (no los cuento): rótulos mono sin pintar, `max-height: 28svh` solo en pantallas bajas, áreas de toque de enlaces de fila, relleno del pie con el aviso, sin línea de marca ni © en el pie, título de la fila 5 con «, fotógrafo», «Conocer a Ramón» en vez de «Conocer más», y la fila 4 con su aviso.

## Revisión de veracidad: las 25 filas de «Afirmaciones a corregir» (la tabla trae 25, no 23)

Estado: **cerrada** · **cerrada de otra manera** (ya no se dice, o se dijo más corto) · **abierta**.

| # | Afirmación (revisión del 23-oct) | Estado | Prueba en el `dist` |
|---|---|---|---|
| 1 | Monitoreo doble quincenal (acompañamiento, método, visibilidad, nosotros) | Cerrada | 0 «quincen / cada quince / monitoreo doble» en las 22 páginas (texto, metas, JSON-LD) y en `llms.txt`; el paso 04 y su HowTo dicen «medimos cada mes… informe mensual» |
| 2 | Pro: «~20 consultas medidas», AI Overviews, share-of-voice, «autoridad de entidad y menciones externas» | Cerrada | 0 en los planes; solo dos usos descriptivos de «menciones externas» en el artículo de los 21 chequeos («lo que el chequeo no mide») |
| 3 | Cadencia contradictoria (mensual contra quincenal) | Cerrada | «informe / reporte mensual» en método, acompañamiento, visibilidad, paid media y redes (15 apariciones, 0 quincenal) |
| 4 | Compromiso de puntaje a los 3 meses | Cerrada | 0 «nos comprometemos», «a los 3 meses», «más puntos que el día» |
| 5 | «Aumentar tu probabilidad de cita» y causalidad de señales | Cerrada | 0 «probabilidad»; h2 del blog «Las cinco acciones que dependen de ti»; «Regla de bolsillo» reescrita. Residuo menor: defecto 11 |
| 6 | «Tu nombre ya esté ahí», HowTo «de la invisibilidad a ser citado» | Cerrada | 0; el HowTo de `/metodo/` parsea y su texto es el visible, paso por paso |
| 7 | «Más de cinco años en agencias» | Cerrada | 0 «cinco años»; queda «Antes trabajé en agencias» con «ocho marcas nacionales» y «cuatro países», que están en `marca-personal-ramon-linkedin.md:44` (CV cerrado) y en el sitio vigente; Clara las deja a confirmar (`home.md` §7.3) |
| 8 | «24 horas» (38 + 6) y «mini-diagnóstico» | Cerrada | 0 «24 h/horas»; «mini-diagnóstico» solo en la URL del artículo (25 apariciones, todas URL) |
| 9 | «Es el mismo chequeo que le pasamos a cada sitio que construimos» / «con el que partimos cada proyecto» | Cerrada de otra manera | 0; en Desarrollo web queda, como compromiso de proceso, «El chequeo gratis de SpindleLab, pasado sobre tu sitio antes de entregarlo. Te dejamos el puntaje por escrito…» (no está en el v2 aprobado; declarado en `servicios.md`) |
| 10 | Combeau: «en septiembre publicó por su cuenta» | **Abierta en un verbo** | 0 «publicó por su cuenta»; quedan «hoy lo opera él» y «lo opera él»: defecto 4 |
| 11 | `llms.txt` contradictorio | Cerrada, con un residuo | Texto nuevo coherente con el mensaje, la cadencia, los precios y las 22 URL del sitemap; queda la lista de bots: defecto 9 |
| 12 | Dos artículos con consejos opuestos sobre los robots de IA | Cerrada | `como-aparecer`, `21-chequeos` y `/diagnostico/` dicen lo mismo (búsqueda en vivo se deja entrar; entrenamiento es decisión, 2 puntos); 0 «error más común que encontramos», 0 «nuevos vendedores» |
| 13 | La revisión gratis «le pregunta a ChatGPT, Gemini y Perplexity por tu rubro» | Cerrada de otra manera | La revisión ya no lo promete y el artículo dice que no mide qué responden hoy los modelos; `/servicios/visibilidad-en-ia/` conserva la «línea base de presencia» como parte de la auditoría de pago (medición puntual y fechada, `servicios.md` §2.2) |
| 14 | Praxi en presente, `SoftwareApplication` | Cerrada | 0 «Praxi», 0 `SoftwareApplication`, sin archivos de Praxi en el `dist` |
| 15 | «Se puede programar igual», integración CRM, «todo se mide junto», «nos integramos» | Cerrada de otra manera | 0; quedan «Integraciones a medida: reservas, pagos» y la definición de «Integraciones» sin «CRM» |
| 16 | «Agentes de IA; él revisa y aprueba el código», «Ramón revisa cada fase» | Cerrada de otra manera | «agentes de IA» solo en Quién está detrás y Nosotros; Desarrollo web conserva «Revisión humana en cada fase antes de avanzar» como método (declarado, `servicios.md` §2.7) |
| 17 | Partners, «otros profesionales», «orquestando el motor» | Cerrada | 0 (barrido) |
| 18 | `sameAs` con `instagram.com/spindle.lab/` | Cerrada | 22 de 22 páginas con `instagram.com/spindlelab.cl/`; el nodo declara 2 perfiles (defecto 14) |
| 19 | «Siete problemas… en las auditorías», «la mayoría de los sitios que auditamos» | Cerrada | 0; los artículos hablan en impersonal («suelen aparecer»); sigue siendo un artículo de un rubro (declarado) |
| 20 | Nitten, Maqui y rangos de precio sin fuente | Cerrada de otra manera | Sin nombres; los rangos de mercado salen marcados como estimaciones («tienden a quedar altos») de un estudio interno (Marco, 25-ago): siguen siendo cifras ajenas, decisión de Ramón (`blog.md` §3.1) |
| 21 | `/trabajo/`: «rubros que atendemos» | Cerrada | Meta: «El sitio de un fotógrafo, que hicimos para un cliente, y Verifica y Cumple, una herramienta propia. Cada entrada dice de quién es.» |
| 22 | «NDA… práctica habitual en sectores financieros» | Cerrada de otra manera | «Podemos firmar uno si lo necesitas.» (HTML y `FAQPage` idénticos); 0 «NDA», 0 «práctica habitual». Que Ramón esté dispuesto a firmar lo confirma él |
| 23 | Paid media: «revisión diaria con agentes de IA», «optimización con IA» | Cerrada | 0; «Optimización continua: revisamos el rendimiento de la cuenta y movemos el presupuesto hacia lo que convierte» |
| 24 | Combeau nombrado como cliente (permiso solo verbal) | **Abierta (declarada)** | Sigue nombrado con sus dos sitios, el panel y el book; el permiso es verbal (Ramón, 16-oct) y ninguna página lo dice. Decisión de Ramón |
| 25 | Verifica y Cumple: «pide permiso antes de medir», «0,52 s», «las corridas» | Cerrada | 0 de las tres; la home dice «Salió mal… un formulario que perdía mensajes sin avisar», sin cifras (hecho propio, a confirmar: `home.md` §7.4) |

Resumen: 16 cerradas, 6 cerradas de otra manera, 1 cerrada con un residuo, 1 abierta en un verbo y 1 abierta por decisión de Ramón.

## Detector anti-slop (`antislop-web.md` §E y `anti-ai-slop.md`)

```
COPY       [x] sin verbos de folleto (0 impuls/potenci/transform/maximiz…; «a medida» solo como nombre de plan)
           [x] sin relleno de apertura
           [~] sin tricolon automático: la home no; el blog sí en dos líneas («entender, verificar y citar», defecto 11)
           [~] sin «no solo X sino Y»: las páginas comerciales no; el blog lo usa 4 veces con contraste real; el h1 de /nosotros/
               «No te prometo. Te muestro.» es el binario que la memoria de VyC marca como tono IA; es el principio declarado de la marca
               («evidencia antes que promesas») y lo dejo a juicio de Ramón
           [x] sin ¿Listo para…? (0); preguntas: títulos de FAQ y de 1 artículo
           [~] sin Title Case: solo los nombres de plan (defecto 12)
           [x] tuteo consistente, 0 voseo
           [x] sin raya como remate (0 en lo visible; 2 en robots.txt, defecto 15)
           [x] cero prueba social sin respaldo (0 cifras de clientes; Combeau con permiso verbal, defecto 4 y fila 24)
           [~] borrar 30 % no mejora la página: la home no pierde nada; los artículos del blog son largos por diseño del v2 (fuera de alcance)
ESTRUCTURA [x] sin tres tarjetas idénticas (filas con línea) · [x] sin «¿por qué elegirnos?» · [x] sin fila de métricas
           [~] FAQ con preguntas reales: las de la home y de contacto salen del v2 y de lecturas en frío, no de prospectos (Clara §7.11);
               con 2 clientes no hay otra fuente; los lectores no pidieron ninguna pregunta que falte salvo «cuál me conviene»
           [x] formulario mínimo (nombre, correo, sitio, mensaje opcional, consentimiento)
           [~] hero no es 100vh centrado: es asimétrico y trae video, pero a 1440×900 no asoma la siguiente sección; es la composición
               que Ramón aprobó el 19-oct
           [x] orden de secciones justificado por el recorrido (brief §4)
CÓDIGO     [x] landmarks, un h1, sin saltos (1 main en las 22; el caso no tiene footer por spec, defecto 5)
           [x] sin ids duplicados ni referencias ARIA rotas · [x] 0 emoji · [x] 0 border-left decorativo
           [~] valores por defecto: los tokens salen de spec-visual; no los audité uno por uno; sin degradé-mancha en archivo.css
               (los `backdrop-filter` están en CSS heredado sin uso, defecto 16)
           [x] alt reales (el de la franja de Visibilidad es el defecto 1; el resto describe la imagen; decorativas con alt="")
           [x] foco visible y propio, contraste AA, labels asociados; MAYÚSCULAS con letter-spacing 0,33 px
           [x] imágenes con ancho y alto; hero con `loading="eager" fetchpriority="high"` y póster precargado; font-display: swap
           [x] JSON-LD parseado (23 páginas, 0 errores) + canonical + OG + title propio; title ≤ 60 (máx. 60) y description 127 a 158
           [x] índice y sitemap al día (22 URL, 0 inconsistentes); `?v=` subido en las imágenes al compartir regeneradas (v=2)
VISUAL     [x] anti-ai-slop.md corrido entero: sin índigo, sin emoji, sin franja lateral, tarjetas solo donde hay interacción, medios
               reales (el jinete de Verifica y Cumple lleva su pie de «generada con IA»)
           [~] «oscuro por defecto» (tell 3): el brief lo pide expresamente (A · Archivo, aprobado por Ramón el 19-oct) y la spec §1 lo justifica
           [~] h1 de dos tintas (tell 4, color distinto en parte del titular): es regla del sistema en todos los h1 (lock §14), cambia de
               frase y no de palabra; justificado
PRUEBAS    ver abajo
```

## Pruebas de fuego

- **Logo tapado:** pasa con reserva. Sin el logo ni el menú, lo que identifica a SpindleLab es el texto (el rótulo «Marketing y crecimiento con IA para empresas que ya venden» y «Te llegan consultas. Veamos dónde se cae el resto.»). La imagen sola (hilo de luz sobre bokeh verde azulado, tipografía liviana, negro) podría ser de cualquier consultora tecnológica; el hilo remite al huso del nombre, pero hay que saberlo.
- **Rubro cambiado:** pasa a medias. Con el texto de una clínica dental o una inmobiliaria la composición (video, frase a la izquierda, botón a la derecha, luego filas con línea) calzaría igual de bien: lo que le da forma propia al rubro es el contenido (camino de cuatro pasos, precios a la vista, caso con su límite dicho), no la composición. La sección 2 («Dónde puede caerse una consulta») es un párrafo sin ninguna forma visual que muestre el problema; es el sitio donde la composición podría trabajar para este negocio. Observación, no defecto.
- **Leído en voz alta:** el hero y la sección «Cómo partimos» suenan a persona. Tropiezan: «…encontramos en tu sitio y **en si la IA puede leerlo**» (repetida en siete páginas; Clara ya propuso reescribirla en `home.md` §7.5), «ves 21 señales, con lo que pesa cada bloque» y, en el blog, «ganan por goleada» y «una sola inversión con dos retornos». Un patrón que los tres lectores notaron sin que se lo pidiera nadie: **«SpindleLab soy yo» frente al plural de marca del resto del sitio** («revisamos», «te devolvemos») se lee como plural falso. Cumple la regla de voz de la casa (plural de marca para lo que el negocio entrega), así que no lo cuento como defecto; lo dejo para que Ramón lo mire.

## Lo que está bien (y conviene no perder al corregir)

- **La primera pantalla de la home**: botón entero, visible y sin nada encima en 11 de 12 tamaños con el aviso abierto, contraste mínimo de 5,38:1 sobre el video, microcopy pegado al botón. Es lo que más costó y se reproduce al píxel (`capturas-qa/01` y `02`).
- **La capa de veracidad**: 16 de 25 filas cerradas limpio, `FAQPage` idéntico al texto visible en las 16 páginas que lo declaran, las 21 señales y los pesos 30/40/30 calzan con el código, una sola cadencia (mensual) en todas partes, «un día hábil» en lugar de «24 horas», y los límites dichos donde corresponden (el caso de Combeau «no es de crecimiento de ventas», la revisión «no mide si hoy te citan»). Los lectores en frío lo notaron: los precios publicados y el «No» a «¿Prometen resultados?» fueron lo que más confianza les dio.
- **Atribución, formulario y protegidos**: UTM completo en 12 de 12 recorridos, `generate_lead` solo con consentimiento, 12 campos idénticos a `main`, `functions/`, `_headers`, `_redirects` y `public/js` sin diff.
- **Peso**: 27 MB -> 8,7 MB en `public/v3` sin perder un medio usado; la home carga 1,4 MB a 1440 con el video completo y 0,75 MB a 390.
- **Encabezado pegajoso con botón**: 616 comprobaciones sin una falla, sin solapes en 15 anchos.
- **Las imágenes al compartir**: 22 distintas, ninguna con «24 horas», «diagnóstico» ni «Estudio de diseño y tecnología», y cada una dice lo que dice su página (`capturas-qa/08`).
- **El muro de `/trabajo/`** con las dos portadas parejas (`capturas-qa/07`): corregir el registro (defecto 6a), no el diseño.

## Lo que no pude medir

- **Safari y Firefox** (solo Chrome 155): el color, el foco y los resortes no están comprobados en WebKit, donde `getComputedStyle` ha mentido antes en este proyecto.
- **Red real:** todo contra un servidor estático local (sin los `_headers`, redirecciones ni Brotli de Cloudflare; para los textos estimé Brotli con `zlib`). LCP y CLS en laboratorio con 4G lenta y CPU ×4: 1.476 a 2.260 ms y 0,0007 a 0,0132 en cuatro rutas; no son datos de campo. Lo que cubre `wrangler pages dev` (`lista-publicacion.md` §3.5) no lo repetí.
- **Envío real del formulario y GA4 / Meta:** probé el formulario con el endpoint interceptado (no mandé ningún correo) y `generate_lead` con una pila de `gtag` local; no vi Tiempo real de GA4 ni Meta.
- **Enlaces externos** (LinkedIn, Instagram, `verifica.spindlelab.cl`): no verifiqué que respondan.
- **Lector de pantalla** (VoiceOver): no corrí; el foco con teclado sí.
- **Node 20** (el de producción); **la Ley 21.719** (`/diagnostico/` dice «1 de diciembre de 2026»: hay un proyecto de postergación en el Senado; la lista de publicación lo deja para el día del corte).
- **Lo que no miré a ojo** está dicho en «Cómo se verificó»; de esas rutas medí overflow, `verificar.mjs`, texto íntegro y la primera pantalla.
- **`desvios.md` consolidado, calendario y decisiones abiertas** (brief §8): no existen aún como archivo; los `desvios/*` son seis.

## Decisiones que son de Ramón (no son defectos)

1. Los valores de las cuatro decisiones del brief siguen sin respuesta suya.
2. El permiso de Combeau es verbal; sale nombrado con sus dos sitios (fila 24).
3. «Ocho marcas nacionales» y «cuatro países» (CV): documentadas, pero su memoria dice que las cifras de agencias no van al copy de SpindleLab.
4. Los rangos de mercado de `cuanto-cuesta` (cifras de terceros, evidencia media según Marco).
5. Los nombres de plan en Title Case (defecto 12).
6. `/privacidad/` y 404 con la identidad anterior después del corte.
7. El plural de marca frente a «SpindleLab soy yo».
8. Qué decir de la revisión cuando quien parte de cero no tiene sitio (el formulario le pide «no tengo» y la confirmación habla de «tu revisión»).

## Evidencia en el repositorio

- `e13/capturas-qa/` (10 JPEG, ≤ 150 kB cada uno): `01` y `02` primera pantalla con aviso (bien); `03` franja de Visibilidad (defecto 1); `04` `/privacidad/` y `10` 404 del árbol auditado (defecto 13); `05` caso sin pie con aviso (defecto 5); `06` hueco de 8 px (defecto 7); `07` muro de `/trabajo/` (bien); `08` imágenes al compartir (bien); `09` bloque con un precio y dos servicios (defecto 3).
- `e13/lectura-fria/`: `entrada.txt` (el texto de `/`, `/servicios/` y `/contacto/` tal como se ve en el build), `instrucciones.txt`, `lector-1.txt`, `lector-2.txt`, `lector-3.txt`, `lectores.json`.
