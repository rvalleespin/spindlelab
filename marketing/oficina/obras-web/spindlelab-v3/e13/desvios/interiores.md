# Desvíos del área INTERIORES (obra E13)

**26-oct-2026 · Clara + Diego.** Páginas: `/v3/metodo/`, `/v3/nosotros/`, `/v3/contacto/` y `/v3/diagnostico/`. Rama `claude/v3-modelo-nuevo`, sin commit.
Fuente del texto: `e13/fuentes/v2-vigente/<ruta>.txt` (publicado y aprobado el 24-oct), `copy-secciones-v1.2.md` §2.7, §6, §7, §8 y §9, y la sección «Afirmaciones a corregir» de `revision-v3-contra-modelo-nuevo-23oct.md`.

## 1 · Qué cambié

### Cómo está repartido el texto (y por qué)

| Qué | Dónde vive |
|---|---|
| Título, meta, h1, entradillas, rótulos, botones y todo texto con id | `e13/texto/{metodo,nosotros,contacto,diagnostico}.json`, con su copia con huella en `src/data/archivo/texto/` (re-extraídas con `extraer-texto.mjs`; `--comprobar` dice «igual» en las cuatro). El texto de E12 que se reemplaza queda en `antes`. |
| Los cuatro pasos del método (nombre, texto, duración, lo que recibes, cuánto cuesta) | `paginas-v3.json`, clave `metodo`. De ahí sale también el HowTo: el texto de cada paso es el mismo que se ve. |
| Las preguntas de contacto (4) y de diagnóstico (5) | `paginas-v3.json`, claves `contacto.faq` y `diagnostico.faq`. De ahí sale el FAQPage: lo visible y el JSON-LD son el mismo dato (comprobado en el HTML construido). |
| Los tres bloques de «Los 21 chequeos» | `interiores.mjs`, tal cual (nombres y pesos son los del chequeo: `functions/api/chequeo.js:1224`). |

`paginas-v3.json` queda con tres claves reducidas a lo estructural (`slug`, `canonical`, `breadcrumb`) más esas listas. Salió de las claves `metodo`, `diagnostico` y `contacto` todo el texto de E12 (títulos, h1, `lead`, los `parrafos` que repetían los textos de las listas, «Del diagnóstico al monitoreo» y todas las frases con «mini-diagnóstico» y «24 horas»). `servicios` y `blog` se releen y se vuelven a escribir idénticos (comprobado contra `HEAD`). Se quitaron los guardianes `reemplaza/«antes»` de `interiores.mjs` para estas cuatro páginas: ya no hay un dato de E12 contra el cual comparar. Siguen los guardianes de precios (`comprobarPrecio`), de miga contra `BreadcrumbList`, de largos de title y description, y los pesos 30/40/30.

### Método

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Los cuatro pasos son los del modelo: Revisión gratis, Conversación y propuesta, Implementación, Acompañamiento mensual (antes: Diagnóstico técnico, Estrategia AEO/GEO, Implementación, Monitoreo) | La ruta es otra: falta «conversación y propuesta» como paso propio y «Estrategia AEO/GEO» no es paso del modelo | v2-vigente/metodo.txt; copy §6; revisión, fila `/v3/metodo/` |
| Paso 04: «medimos cada mes con el mismo criterio… la reunión mensual define las prioridades» | Sale «cada quince días medimos menciones en IA… además de posiciones clásicas en Google y tráfico orgánico» (bloqueante: `capacidad-servicios.md:55` marca el monitoreo doble como no disponible). Decisión 4 del brief: informe mensual, sin monitoreo de menciones | v2-vigente/metodo.txt; brief §1, decisión 4 |
| HowTo del JSON-LD: el texto de cada paso es el de la página; la descripción es la de v2-vigente | El HowTo tenía un arreglo de textos aparte que decía «cada quince días medimos menciones en IA, posiciones en Google y tráfico orgánico» y «llevar un sitio de la invisibilidad a ser citado» (promesa de resultado). Ahora no puede divergir de lo visible | v2-vigente/metodo.txt (JSON-LD) |
| h1 en dos tintas: «Cómo trabajamos.» + «Partimos por una revisión gratis y seguimos por fases.»; la entradilla es la otra mitad del subtítulo publicado | El subtítulo publicado tiene 17 palabras; en gris del h1 caben de 6 a 13 (lock §14), así que se parte en dos | v2-vigente/metodo.txt |
| Se sacan el `lead` de E12 («nuestro proceso de auditoría SEO + visibilidad en IA») y la puerta a Desarrollo web («Si vamos a diseñar y programar tu sitio desde cero, el proceso es otro…») | Eran la tesis anterior. v2-vigente no las trae. La plantilla ya no las pinta | v2-vigente/metodo.txt |
| Botones: «Enviar mi dirección» (a `/v3/contacto/`) y «Ver los cuatro pasos»; cierre «Pedir mi revisión» y «Correr el chequeo» como enlace secundario | Una sola acción principal por ruta (brief §2). Antes la principal era el chequeo | v2-vigente/metodo.txt; brief §2 |
| Cada paso dice lo documentado y nada más. Duración: 01 «Un día hábil», 02 «20 minutos por videollamada», 03 «La fija la propuesta, fase por fase», 04 pasa a «Frecuencia: Informe mensual, Reunión mensual». Recibes: «Una página en lenguaje claro», «Una propuesta por escrito, con precio», «Un entregable por fase, que apruebas antes de seguir», «Una página en lenguaje de negocio». Cuánto cuesta: «Gratis.»; la propuesta lleva el precio y la auditoría SEO técnica se cotiza aparte desde $490.000 + IVA; «Lo que diga la propuesta» con enlace a las soluciones; acompañamiento desde $590.000/mes + IVA, mínimo 3 meses y después mes a mes con aviso de 30 días | El documento dice «no se inventan duraciones nuevas». La plantilla soporta filas libres (`datos` es una lista; si un paso no trae una fila, no se pinta). No hizo falta un componente nuevo | v2-vigente/metodo.txt (plazos: «un día hábil», «20 minutos»); copy §2.8 y `servicios-v3.json` (precios y mínimo); «Cada fase termina con algo que apruebas» (v2-vigente) |
| Los precios del método se comparan con los JSON (`comprobarPrecio`): pasos 02 y 04 | Brief §6.3: diff 0 en precios | `servicios-v3.json` |
| «Tres reglas» (antes «Tres reglas que no negociamos»); la regla I pasa a «Ordenamos los hallazgos por impacto y esfuerzo. Primero lo que más pesa, después lo cosmético.» | «Que no negociamos» sonaba a bravata; «Nunca entregamos hallazgos sin jerarquía» afirma historial | copy §6; v2-vigente/metodo.txt |
| «Lo que necesitamos de ti»: sale «Nos agregas como usuario, sin compartir tu contraseña»; el acceso es «de lectura a Google Search Console y a tu analítica, si avanzamos; y para implementar, un acceso acotado a tu sitio» | «Nunca pedimos accesos de administrador»: el onboarding interno pide un usuario con permisos en el sitio | copy §6 «Se borra» |
| Cierre: «Envíanos la dirección de tu sitio y en un día hábil tienes la revisión.» Sale «Las otras tres fases, solo si la primera te convence» | Sale «24 horas» y «mini-diagnóstico» | v2-vigente/metodo.txt |
| title: «Método SpindleLab: de la revisión gratis al trabajo mensual» (59 caracteres) | Es el title publicado en v2; el del documento («…al trabajo de cada mes») tiene 63 y el guardián pide 60 como máximo | v2-vigente/metodo.txt |

### Nosotros

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Se saca la sección «Por qué un solo sistema» (plantilla y texto) | Subordina redes y pauta al sitio («parto por el sitio, que es adonde llega todo lo demás»); el documento la borra entera | copy §7 «Se borra»; revisión, fila `/v3/nosotros/` |
| Bio P1: «Soy Ramón Vallejos y SpindleLab soy yo. Uso agentes de IA para el trabajo que se repite y reviso yo lo que te entrego. Como soy una persona, tomo pocos proyectos a la vez. Atiendo a todo Chile por videollamada.» | Sale «orquestando el motor… y partners para lo que no hacemos en casa» | copy §2.7 (P1); v2-vigente/nosotros.txt |
| Trayectoria: «Antes trabajé en agencias» y tres líneas con el texto del documento (Universal McCann, Graphene IPG con «cuatro países», Incrementa y Maggiore) | Sale «más de cinco años» (las fechas del CV suman entre 4 años y 4 años 9 meses) | copy §2.7 (P2); revisión, fila de veracidad |
| Cargo bajo la foto: «Consultor de marketing y crecimiento con IA · Chile» (antes «Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad en IA · Chile») | Tesis anterior | v2-vigente/nosotros.txt |
| «Cómo trabajo» pasa a las tres reglas: «Empiezo por mirar», «Te digo qué se puede mover y qué no», «Lo dejo por escrito», con los textos publicados en v2 | Reemplazan las cinco de E12; «Sin humo» sale (el h1 ya lo dice) | copy §2.7 y §7; v2-vigente/nosotros.txt |
| Se sacan «El objetivo es que vendas, y que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí» y «Mido si te recomiendan» (con «Nada de métricas de vanidad») | Promesa de resultado; capacidad de medición que no existe para clientes | copy §2.7 y §7 «Se borra»; brief §6.4 |
| Cierre: «Escríbeme la dirección de tu sitio.» / «Te respondo con la revisión.» / «Escribirme» (a `/v3/contacto/`); sin bajada ni segundo botón; queda «Siguiente: Método» | Sale «¿Apareces cuando tus clientes preguntan?», «mueve la aguja», «24 horas» y «Con eso decides con información» | copy §7; v2-vigente/nosotros.txt |
| Cabecera: un solo botón, «Pedir la revisión de una página» (a `/v3/contacto/`); entradilla «Detrás de SpindleLab está Ramón Vallejos: marketing y crecimiento con IA para empresas que ya venden.» | Una sola acción principal (brief §2). La entradilla sale de la meta description publicada y de la línea sobre el titular de la home | brief §2; v2-vigente/nosotros.txt |
| title y description de v2-vigente; `description` agregada al `AboutPage` | El title de E12 («Ramón Vallejos, quién está detrás») y su description hablaban de «agentes de IA cuyo código él revisa» | v2-vigente/nosotros.txt |

### Contacto

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| h1: «Escríbenos la dirección de tu sitio y te respondemos con una revisión.» (dos tintas: 6 + 6 palabras); entradilla: «Te respondemos con una página con lo más importante que encontramos. Es gratis y llega en un día hábil.» | Sale «24 horas» (el único plazo documentado fue de 31 h) y «mini-diagnóstico» | copy §8; v2-vigente/contacto.txt |
| Formulario: h2 «Cuéntanos de tu proyecto»; placeholder del mensaje «Qué vende tu empresa y cómo te llegan hoy las consultas»; botón «Enviar la dirección»; confirmación «Listo. Te escribimos dentro de un día hábil con tu revisión.» Los nombres de campo, los `#f-utm-*`, `.contact-form`, `.form-status`, `.form-success` y `v3-contacto.js` no se tocaron | Protegido por el brief §6.2. Probado con Playwright (UTM llenos desde la URL, `?sitio=` en el campo, error, botón que vuelve con su flecha, confirmación) | copy §8 |
| «Qué pasa después»: «Nos escribes», «Recibes la revisión», «Tú decides» con los textos publicados | Salen «mini-diagnóstico», «Decides con calma» y «sin seguimiento insistente» | v2-vigente/contacto.txt; copy §8 «Se borra» |
| FAQ (cuatro preguntas, ahora con `FAQPage` idéntico): «¿La revisión es gratis?», «¿Qué información necesitan para empezar?», «¿Firman acuerdos de confidencialidad?» → «Podemos firmar uno si lo necesitas.», «¿Atienden fuera de Santiago?» → «Sí. El trabajo es remoto y atendemos a todo Chile…» | Sale «En sectores financieros es práctica habitual y trabajamos bajo NDA» (no hay NDA firmado ni cliente financiero) y «Nunca solicitamos claves de administrador» | v2-vigente/contacto.txt; revisión, fila de veracidad «medio» |
| `mailto` del pie del formulario: asunto «Revisión de mi sitio» (antes «Diagnóstico gratis») | El término estaba en un atributo `href`, que el barrido incluye | e13 |
| title «Contacto: pide tu revisión gratis · SpindleLab» y description de v2-vigente | Sale «diagnóstico» y «24 horas» | v2-vigente/contacto.txt |

### Diagnóstico (el chequeo)

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Entradilla: se saca «Es el mismo chequeo que le pasamos a cada sitio que construimos, antes de entregarlo.» También de `Chequeo.astro` (valor por omisión de `ayuda`: «Si construimos tu sitio, le pasamos este chequeo antes de entregártelo.») | El chequeo existe desde el 27-ago y ningún sitio entregado pasó por él antes de salir | copy §9; revisión («alto, sin_respaldo») |
| «Dos caminos»: «La revisión que hacemos a mano» (antes «El mini-diagnóstico») con «Te devolvemos una página con lo más importante que encontramos en tu sitio y por dónde partiríamos. Es gratis y llega en un día hábil.»; sale «Le preguntamos a ChatGPT, Gemini y Perplexity por tu categoría» | La consulta real es un paso manual de Ramón y no escala (decisión 7 abierta) | copy §9; v2-vigente/diagnostico.txt |
| «Lo que este chequeo no mide»: «Si hoy la IA te nombra» (sin «En los planes con acompañamiento lo hacemos cada mes…») y «Qué pasa después de la visita» (reemplaza a «Lo que muestran las corridas») | Nadie compra aún esos planes (no hay cadencia que prometer); «las corridas» son pruebas internas sin tamaño de muestra declarado («se verifica o se quita», copy §9). El segundo límite es verdadero y conecta con el paso 02 | copy §9; brief §1, decisión 4 |
| Cierre: «También lo revisamos nosotros, a mano.» / «Es gratis y llega en un día hábil.» / «Pedir la revisión a mano» (a `/v3/contacto/`). Sale «¿Quién aparece en tu lugar?» | Pregunta retórica que prometía mostrar quién aparece en tu lugar | copy §9; v2-vigente/diagnostico.txt |
| «Los 21 chequeos»: «Acá está la metodología completa…»; la línea queda «Tres bloques, con su peso: leer 30, entender 40, citar 30» (antes «leerte 30, entenderte 40, citarte 30») | Pedido: sin «citarte». Los nombres de los bloques de abajo («¿Te pueden citar?») son los del chequeo y no se tocan | copy §9; `functions/api/chequeo.js:1224` |
| FAQ (cinco preguntas, con `FAQPage` idéntico) con las respuestas de v2-vigente. Dos ajustes: en «¿Qué mide exactamente el puntaje?» sale «y se revisa a mano» (la revisión a mano no incluye la consulta a los motores mientras la decisión 7 siga abierta); en «¿Un puntaje alto…?» «no solo con tu sitio» pasa a «además de tu sitio» | Decisión 7; detector A4 | v2-vigente/diagnostico.txt |
| description: la de v2-vigente («…No mide si hoy te citan.»); la `description` del `WebApplication` dice «pueden entrar a tu sitio y entender qué haces» (antes «leer, entender y citar tu sitio») | Pedido: sin promesas de cita | v2-vigente/diagnostico.txt |
| `v3-chequeo.js`, solo cadenas (la lógica, los `chq-*`, el endpoint y los eventos no se tocaron; `node --check` pasa; probado con Playwright y respuestas simuladas a los cuatro puntajes): `veredicto()` sin «te citen», «te cuestan menciones», «no tienen mucho que citar» ni la escena de quien pregunta por tu rubro; botón «Pedir la revisión a mano» (junto al puntaje y en el remate); remate «Lo revisamos a mano, gratis.» sin la consulta a los motores ni «24 horas»; error de campo vacío «Escribe la dirección de tu sitio para empezar.» (decidido en E12 y nunca aplicado). Se reescribieron los comentarios del encabezado que nombraban «Pedir el diagnóstico» y «mini-diagnóstico». Referencia con `?v=4` (había una sola: `Chequeo.astro`, que usan la home y esta página) | El chequeo mide si el sitio está preparado, no si hoy aparece en las respuestas | pedido de la orquestadora; copy §9 |
| `chequeo-v3.css`: solo un comentario (sin referencias; no hizo falta `?v=`) | Quedaba «Pedir el diagnóstico» | e13 |
| `v3-contacto.js`: **sin cambios**. Sus cadenas (`Enviando…`, el error de envío, `Enviar →`) ya eran las del documento. `Enviar →` se deja a propósito: `contacto.mjs` restaura el botón (con su flecha SVG) solo cuando el texto es distinto del suyo; si el script pusiera «Enviar la dirección», el botón perdería la flecha | | `src/scripts/archivo/contacto.mjs` |

### Transversal de las cuatro

| Qué cambié | Por qué |
|---|---|
| La imagen al compartir de las cuatro páginas pasa a `/assets/img/og-posicionamiento.jpg?v=1` con alt «SpindleLab. Marketing y crecimiento con IA» (la que usa v2-vigente) | Las `og-e12-{metodo,nosotros,contacto,diagnostico}.jpg` traen el h1 anterior horneado en la imagen (la de contacto dice «Te respondemos en 24 horas»). La imagen nueva es un archivo sin versionar que agregó otro rol: si no llega al árbol, hay que traerla |
| Comentarios de plantilla (los rangos de columnas, «c5» a «c12») con guion simple | Para que la búsqueda de rayas largas y medias dé cero en lo mío; no cambia nada de lo que se ve |

## 2 · Las afirmaciones de la revisión que caían en mis páginas

| Afirmación | Estado |
|---|---|
| Monitoreo doble quincenal y «cada quince días medimos menciones en IA» en Método (paso 04 y HowTo) | Corregida (paso 04 mensual, HowTo = texto visible) |
| «El objetivo es que vendas… tu nombre ya esté ahí» y el HowTo «de la invisibilidad a ser citado» | Corregidas |
| «Más de cinco años en agencias» | Corregida |
| «Orquestando el motor… partners» | Corregida |
| «Por qué un solo sistema… parto por el sitio» | Sección eliminada |
| «Es el mismo chequeo que le pasamos a cada sitio que construimos / con el que partimos cada proyecto» | Corregida en Diagnóstico y en `Chequeo.astro`. La segunda frase vivía en `paginas-v3.json` (`diagnostico.cierre.cuerpo`, ya eliminada) y en el cierre de los siete artículos del blog (otra área) |
| «NDA es práctica habitual en sectores financieros» | Corregida (contacto: HTML y FAQPage) |
| «24 horas» y «mini-diagnóstico» en contacto y diagnóstico | Corregidos (barrido en 5) |
| «Le preguntamos a ChatGPT, Gemini y Perplexity por tu categoría» | Corregida (Diagnóstico y remate del script) |
| «En los planes con acompañamiento lo hacemos cada mes» | Corregida |
| `jobTitle` de Ramón | **Parcial.** La línea visible bajo la foto en Nosotros dice «Consultor de marketing y crecimiento con IA». El `jobTitle` del `Person` en el JSON-LD sale de `layout-a.ts` (`entidad.autor.jobTitle`), que no es de mi área y sigue diciendo «Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad en IA» |

## 3 · Qué quedó sin decidir

1. **`layout-a.ts` (no es mío) rompe el barrido en mis cuatro páginas.** `entidad.org.description` («Estudio de diseño y tecnología en Santiago: diseñamos y programamos sitios y herramientas a medida…») y `entidad.autor.jobTitle` salen en el JSON-LD de las cuatro. Lo trae quien tenga la capa transversal. Debe decir «Consultor de marketing y crecimiento con IA» y la descripción de v2-vigente.
2. **Campo opcional «¿Cuántas personas son en la empresa?» (decisión 9 del documento): no se agregó.** Tocaría los nombres de los campos del formulario, que están protegidos. Si Ramón lo quiere, hay que decidir el nombre del campo nuevo (y que `generate_lead` no cambie).
3. **«Completar el formulario ↓» y «Con tu nombre, tu correo y la dirección de tu sitio ya podemos partir.» no se pasaron.** En v2 el formulario estaba más abajo; en v3 está debajo del h1, dentro de la primera pantalla a 1440 × 900 (spec §2.4). El ancla sobraba.
4. **La confirmación «Listo… con tu revisión» no distingue a quien parte de cero.** El formulario sigue diciendo «Si partes de cero, escribe «no tengo»» y esa persona no tiene un sitio que revisar. El texto del documento no la distingue; si Ramón quiere una frase para ese caso, hay que escribirla.
5. **La línea de los estudios en Nosotros se conserva** («Estudié Comunicación Publicitaria… máster en Marketing Digital y E-commerce…»): es un hecho del CV que ya declara el JSON-LD (`alumniOf`), pero el texto de v2-vigente no la trae. Si Ramón quiere la página igual que v2, sale.
6. **«Como soy una persona, tomo pocos proyectos a la vez»** (Nosotros): afirmación de capacidad que Ramón confirma (decisión 6 del documento). Una lectora la tomó por «escasez planeada».
7. **«Podemos firmar un acuerdo de confidencialidad»** (contacto): no hay ninguno firmado; que Ramón esté dispuesto (copy §11).
8. **Método, paso 03, duración: «La fija la propuesta, fase por fase».** No hay un plazo común: los de Desarrollo web están en su página; la auditoría tarda «dos a tres semanas». No se agregó ninguna duración. Si Ramón quiere un plazo en el método, sale de esas fuentes.
9. **Método, paso 02: la conversación y la propuesta no dicen si son gratis.** Ningún documento lo afirma; el texto dice solo que el precio queda por escrito antes de empezar. Si es gratis (probablemente lo es), conviene una frase de Ramón.
10. **Decisión 7 (consulta real a ChatGPT dentro de la revisión).** Mientras siga abierta, ninguna de mis páginas dice que la revisión «le pregunta a los motores». Si se vuelve parte fija, se reescriben la FAQ «¿Qué mide el puntaje?», «Dos caminos» y el remate del script.
11. **«Prefiero hablarlo contigo»** (segundo botón del remate del script) queda como estaba: singular de Ramón en un texto de marca. No está en el barrido y es lo que ya medía el recorrido; se anota por si Clara quiere un pase de voz.
12. **Imágenes al compartir viejas.** Las cuatro `og-e12-*` de estas rutas quedan sin referencia en mis páginas (y traen el mensaje anterior). Retirarlas del árbol es de quien corte el peso de `public/`.
13. **Barrido de «motor».** En mis páginas solo aparece «motores» en el sentido de motores de IA (FAQ y «no mide», texto aprobado en v2-vigente); «motor» singular no aparece.
14. **El árbol de trabajo no compiló entero mientras construí** (otros roles a medias: `home.cinta.tramos` y `blog.cierre.h2` faltaban en sus copias de texto). Verifiqué con `HEAD` más solo mis archivos (33 páginas, `astro build` sin errores) y con una copia que deja solo mis cuatro rutas. Falta una construcción del árbol completo cuando los demás terminen.
