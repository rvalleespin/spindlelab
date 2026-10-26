# Desvíos del área SERVICIOS (obra E13)

26-oct-2026 · Clara + Diego. Páginas: `/v3/servicios/` y las seis de servicio. Precios, planes, plazos y nombres de servicio: sin cambio (los importes de cada página coinciden con `v2-vigente/servicios__*.txt`, y los de `servicios-v3.json` y `oferta-v3.json` son los mismos de antes de la obra; lo único que cambió de nombre es un plan sin precio: «Mini-diagnóstico» pasa a «Revisión gratis»).

## 1 · Lo que cambié

### Transversal a las siete páginas

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Miga y BreadcrumbList dicen «Soluciones» (era «Servicios»), también el nombre del ItemList | La navegación y el título de la página dicen «Soluciones» | copy-secciones §3 y §4; v2-vigente |
| El botón principal del cierre dice qué se pide en cada servicio: «Pedir la revisión de mi sitio» (Visibilidad), «Pedir la auditoría» (Auditoría), «Conversar mi caso» (Acompañamiento, Redes, Paid), «Conversar mi proyecto» (Desarrollo web), «Pedir la revisión» (índice). Todos a `/v3/contacto/`. Cada texto vive como `<slug>.cierre.boton` | Sale «Pedir el diagnóstico» | copy-secciones §4 y §5; guía §3 |
| El botón secundario del cierre pasa a «Chequear mi sitio ahora» (`/v3/diagnostico/`), en el índice y en las cinco páginas que lo llevan (Redes y Paid no lo llevaban y siguen sin él) | «Revisión» ahora es lo que se pide a Ramón; el chequeo es la herramienta. Es el texto del enlace secundario de la portada | brief de obra §4 |
| Orden de los seis y de «Siguiente»: Auditoría, Visibilidad, Paid Media, Redes, Desarrollo web, Acompañamiento. `ORDEN` en `servicios.mjs` es una lista fija de slugs; `oferta-v3.json` conserva su forma (la home lee `momentos[]` y `tambien[]`) | La página sigue los cuatro bloques del documento de textos y el ItemList sigue el mismo orden | copy-secciones §4 |
| Imágenes al compartir de las siete páginas regeneradas con el h1 nuevo (`og-e12-<id>.jpg`, mismo método de `og-tanda-4.mjs`, Chrome de la Mac), referencia `?v=2` | Las anteriores traían escrito el h1 viejo («Diseñamos y programamos sitios…», «…y nombrarte») | CLAUDE.md, trampa de caché |

### `/v3/servicios/` (índice)

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| H1 «Lo que hacemos. Con el precio de partida a la vista.»; entradilla «Eliges una o varias de estas soluciones. Cada una dice qué incluye y desde cuánto.» | Sale el claim «diseñamos y programamos sitios» | copy-secciones §4; revisión 23-oct |
| Las cuatro «situaciones» pasan a los cuatro bloques con precio, con el mismo componente: 01 Búsqueda y visibilidad en IA (Auditoría, Visibilidad), 02 Anuncios en Google y redes (Paid Media, Redes), 03 Sitio web a medida (Desarrollo web), 04 Acompañamiento mensual. Cada bloque lleva su párrafo del documento | El conflicto con las situaciones numeradas se resuelve con el orden y el texto | copy-secciones §4; v2-vigente/servicios.txt |
| Línea de cada servicio en plural de marca («Revisamos…», «Medimos…», «Nosotros lo hacemos…»); Desarrollo web pasa a «Cuando el sitio actual no da para más, lo reconstruimos: a medida, sin plantillas ni WordPress» | Un solo sujeto; sale «le pasamos el chequeo» en presente de costumbre | copy-secciones §5 (regla común) |
| El precio de Visibilidad dice también el del acompañamiento («Auditoría desde $400.000 + IVA, una vez · acompañamiento desde $590.000/mes + IVA») | Es el texto del documento; los dos montos están en los JSON y el build los compara | v2-vigente/servicios.txt |
| «Lo que pones tú»: el pie pasa de «te conectamos con partners» a «te orientamos» | No hay relación comercial con productores | barrido §13; revisión 23-oct |
| Se agrega «Antes de escribirnos» con tres preguntas y su `FAQPage` en el JSON-LD, del mismo texto: ¿Tengo que contratar todo?, ¿Publican precios?, ¿Atienden solo ciertos rubros? (la cuarta del documento, sobre quién crea el contenido, ya la responde «Lo que pones tú») | El documento trae FAQ; usa el mismo marcado que las páginas de servicio, sin componente nuevo | copy-secciones §4 |
| Cierre: «Con la revisión vemos cuál tiene sentido.» + «Revisamos tu sitio y si Google y las IA pueden leerlo, en un día hábil. Es gratis.» | Plazo de la guía; sale «mira 21 cosas en segundos» como argumento de cierre | copy-secciones §4; guía §3 |

### Visibilidad en IA

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| H1 «Visibilidad en IA. Qué dicen ChatGPT, Gemini y Perplexity de tu empresa.»; `linea` y descripciones sin «aparezcas» ni «para que te citen»; title/description del v2 | Promesa de resultado | copy-secciones §5.2; revisión 23-oct (fila «aumentar tu probabilidad de cita») |
| Sale el bloque «compromiso» (puntaje del chequeo a los 3 meses y acceso de los robots) | Garantía sin aprobación registrada | revisión 23-oct; brief §1, decisión 4 |
| Planes: salen «~10 / ~20 consultas medidas al mes», «+ AI Overviews», «Share-of-voice frente a tus competidores», «Autoridad de entidad y menciones externas» y la tagline «share-of-voice contra tu competencia». Queda el Esencial con 8 keywords, contenido citable, claridad de entidad e informe mensual, y el Pro con 15 keywords y contenido citable todos los meses | No hay herramienta ni proceso; el protocolo propio son 5 preguntas por 3 motores; `capacidad-servicios.md` §2 | revisión 23-oct; capacidad-servicios §2 |
| La medición con el protocolo público queda como medición puntual y fechada (línea base de la auditoría), sin «misma cadencia», «periódicamente» ni «para seguir tu evolución mes a mes». El cuarto frente pasa a «Acceso y protocolo de medición»: dejamos por escrito el protocolo para que cualquiera lo repita | Sin monitoreo de menciones (regla del 27-sep) | capacidad-servicios §2; decisión 4 |
| «Qué prometemos y qué no»: sale «Aumentar tu probabilidad de cita» y «Medición seria… sabrás si avanzas». Entran «Medir con un protocolo repetible» y «Decir lo que encontramos». Se conservan los dos «No» | Causalidad no medida | copy-secciones §5.2 |
| FAQ: «¿Se puede influir…?» y «¿Cómo miden…?» reescritas sin «sube la probabilidad de que te citen» ni «periódicamente». Se quita «a las consultas a cubrir» del precio | Idem | copy-secciones §5.2 |
| Sale «Los modelos citan lo que entienden sin ambigüedad» (claridad de entidad) | Afirmación sobre cómo eligen fuentes los modelos, sin respaldo | revisión 23-oct |
| «mini-diagnóstico gratuito» → «revisión gratis»; «en 24 horas» → «en un día hábil» (nota, FAQ, cierre) | Guía §3 | guía §3 |
| Cierre: «Revisa si las IA pueden leer tu sitio.» | Sin consulta manual a un motor prometida | copy-secciones §5.2 («Ojo») |
| La franja ya no toma el pie de `trabajo.entradas` (la entrada «chequeo» salió del índice de /trabajo/): el pie «El chequeo de 21 señales · Propio · 2026» vive en `visibilidad-en-ia.franja.pie` | El build caía | Trabajo (otro rol) |

### Auditoría SEO técnica

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Plan «Mini-diagnóstico» → «Revisión gratis» («La radiografía de una página, en un día hábil»), h2 «De la revisión gratis a la auditoría a fondo», oferta del JSON-LD con el nombre nuevo | Guía §3 | copy-secciones §5.1 |
| Sale «En finanzas y salud, Google y los motores de IA exigen pruebas de que eres quien dices ser» | Sin respaldo | copy-secciones §5.1; revisión 23-oct |
| `lead` pasa al subtítulo del documento («Tu sitio puede funcionar bien y aun así ser difícil de leer…»); `linea` dice que la revisión de una página es gratis | v2 | copy-secciones §5.1 |
| FAQ «¿En qué se diferencia…?»: de «las señales que los motores de IA usan para citar fuentes» a «lo que los motores de IA necesitan para leer y entender tu sitio» | Causalidad sobre cómo eligen fuentes | revisión 23-oct |
| «24 horas» → «un día hábil»; «mini-diagnóstico» → «revisión» en nota, FAQ y cierre | Guía §3 | guía §3 |

### Acompañamiento mensual

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Informe **mensual** en todas partes (línea, lista, plan, FAQ, JSON-LD, description). Sale «medición quincenal» | Decisión 4 | brief §1; revisión 23-oct |
| Sale «Monitoreo doble: posiciones y presencia en respuestas de IA, medidas quincenalmente». Entra «Medición de lo implementado: cada mes revisamos cómo quedó el sitio con el chequeo y con los datos de Google Search Console, a los que nos das acceso de lectura» | Lo que sí se puede entregar: el acceso a Search Console es paso estándar del onboarding | capacidad-servicios §3; onboarding-cliente §2 |
| Planes: salen «~10 / ~20 consultas medidas», «+ AI Overviews» y «Share-of-voice»; el Esencial dice «Foco en una capa (técnica o visibilidad en IA)» y el Pro «SEO técnico + visibilidad en IA» | Idem Visibilidad | revisión 23-oct |
| Sale el compromiso de puntaje a 3 meses | Idem Visibilidad | revisión 23-oct |
| Lead con la frase del documento («Una auditoría te dice qué hacer. Nosotros lo hacemos y lo seguimos cada mes…»); sale «contenido que posiciona» | Promesa de resultado | copy-secciones §5.3 |
| «Así se ve un mes tipo» pasa a «Qué pasa cada mes.»; el paso 2 es «Medición» (chequeo y Search Console) | Sin monitoreo | copy-secciones §5.3 |
| Salen «Muchos clientes nos usan como capa técnica…» (texto sin mostrar) y «nos integramos»; la FAQ dice «Podemos trabajar con quien ejecute hoy: te damos las especificaciones, revisamos lo que se implementa…» | No hay ningún cliente de acompañamiento | copy-secciones §5.3 y §11 |
| Entra la pregunta «¿Necesito una auditoría antes?» | Estaba en la versión publicada el 24-oct | v2-vigente |
| Cierre: «Cuéntanos dónde está tu sitio hoy.» + «Conversar mi caso» | v2 | copy-secciones §5.3 |

### Gestión de redes sociales

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| «te conectamos con partners de producción» (3 lugares) y «un partner de confianza» → «te orientamos»; la viñeta pasa a «Brief, revisión y salida del contenido» | Sin relación comercial documentada | copy-secciones §5.5 |
| Reporte **mensual** (viñeta, plan Orgánico, nota, proceso «mes a mes», FAQ, JSON-LD); salen «quincenal» y «quincena a quincena» | Informe mensual en todas partes | decisión de la orquestadora; ver pendientes |
| Plan A medida: «Integrado con SEO, visibilidad en IA y Paid Media» → «Se coordina con tu sitio y tu SEO si los contratas» | Sin integraciones prometidas | copy-secciones §5.5 y §5.6 |
| Paso de pauta: «siempre con tu visto bueno antes de gastar» | Es la regla de Meta de la casa (nunca se enciende gasto sin OK) | v2-vigente |
| Cierre: «Pongamos tu marca en redes con criterio.» + «Conversar mi caso» (sale la oferta del mini-diagnóstico) | La revisión gratis es del sitio, no de las redes | copy-secciones §5.5 |
| FAQ «crean el contenido»: sale «partners»; del párrafo «Sobre la gestión de redes» sale «orquesta» | Partners y jerga | copy-secciones §5.5 |

### Paid Media (Google)

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Salen «agentes de IA» y «revisión diaria» en la lista, el plan Esencial, el paso 3, la FAQ «¿Cómo optimizan con IA?» (ahora «¿Cómo optimizan la cuenta?»), la nota de precios, el JSON-LD y la `description` de datos | No hay cuenta de cliente en gestión | copy-secciones §5.6 |
| Sale «El sitio es el eje; la pauta lo acelera» y «se mide junto al orgánico» / «lo medimos todo junto»; entra «Coordinación con tu sitio y tu SEO, si los contratas» | Tesis anterior; «todo se mide junto» es afirmación de integración sin entrega | revisión 23-oct |
| Salen «gestionamos la cuenta día a día» y «optimización con IA» | Idem | copy-secciones §5.6 |
| Cierre: «Revisemos tu cuenta o armemos la primera campaña.» + «Conversar mi caso» | v2 | copy-secciones §5.6 |

### Desarrollo web

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| H1 «Desarrollo web. Un sitio a medida, sin plantillas ni WordPress, con panel para editar.» (sale «Diseñamos y programamos sitios listos para…»); description sin «Diseñamos y programamos» | Claim central de la marca anterior; sigue siendo un servicio con ese nombre | brief §6; revisión 23-oct |
| Sale «Lo programamos con agentes de IA, y Ramón revisa cada fase» → «Revisión humana en cada fase antes de avanzar» (método, no hecho medido); fase 03 «Desarrollo con IA» → «Desarrollo» sin agentes ni «Ramón revisa el código» | «Agentes de IA» solo vive en «Quién está detrás»; en Praxi 50 de 219 cambios fueron directo | copy-secciones §5.4; revisión 23-oct |
| Sale la pregunta «¿Qué cambia que lo construyan con IA?»; las otras se renumeran | Cuenta el método interno | copy-secciones §5.4 |
| Sale «tu CRM» de «Integraciones» (glosario) y de la viñeta de Plataforma a Medida (queda «Integraciones a medida: reservas, pagos») | Nunca entregado | copy-secciones §5.4; revisión 23-oct |
| «puedan nombrarte en sus respuestas» → «puedan leerlo y entender a qué te dedicas» (incluye 3 y glosario AEO/GEO) | Promesa de resultado | revisión 23-oct |
| El chequeo: «El chequeo gratis de SpindleLab, pasado sobre tu sitio antes de entregarlo…» (era «de nuestra página de inicio»). Se queda como compromiso de proceso, no como práctica pasada | No decir «es el mismo chequeo que le pasamos a cada sitio que construimos» | revisión 23-oct |
| «Lo que construimos»: quedan Combeau y Verifica y Cumple (con su flecha ↗, el aviso de sitio aparte y el pie de la persona generada con IA); salen Praxi, Sesenta y la nota de los conceptos. La plantilla lee las dos entradas por su id (`combeau-fotografia`, `verifica-y-cumple`) | Decisión 3 de Ramón | brief §1 y §3 |
| Cierre: «Te respondemos en un día hábil, tengas sitio o no.»; «empezamos con la revisión gratis»; botón «Conversar mi proyecto» | Sin «24 horas» ni «mini-diagnóstico» | copy-secciones §5.4; guía §3 |
| Sale «Siguiente: Visibilidad en IA» → «Acompañamiento mensual» | Nuevo orden de los seis | servicios.mjs |

## 2 · Qué quedó sin decidir

1. **Reporte de Redes: mensual.** La versión publicada el 24-oct (aprobada) dice quincenal. Lo pasé a mensual por la regla «informe mensual en todas partes» y porque «quincenal» está en el barrido. Si Ramón quiere quincenal en Redes, son seis frases (viñeta, plan, nota, proceso, FAQ y JSON-LD).
2. **Medición de menciones en IA: una sola vez.** Queda en la Auditoría de Visibilidad y en Auditoría + Visibilidad como medición puntual y fechada, porque es el servicio. `capacidad-servicios.md` §2 marca esa línea base como manual de Ramón y que no escala más allá de 1 o 2 clientes. Si no se quiere ni eso, hay que reescribir los dos planes y el h1.
3. **Qué se mide cada mes en el Acompañamiento.** Dejé «chequeo + Search Console», que es lo que el documento de onboarding respalda. Si algún día hay medición mensual de menciones, hay que escribirla antes en `capacidad-servicios.md`.
4. **El Pro de $790.000 se describe distinto en dos páginas** (heredado): en Visibilidad es Esencial + 15 keywords + contenido citable mensual; en Acompañamiento son las dos capas juntas. Al sacar share-of-voice, AI Overviews y las consultas medidas, el Pro de Visibilidad queda con poco que lo diferencie. Lo decide Ramón.
5. **La franja de Visibilidad en IA** es una captura del chequeo anterior (`chequeo-43` y `chequeo-239`): trae escritos «Cada vez más clientes preguntan antes de buscar…» y «…y citarte». Conviene volver a sacarla (captura real, no generada) cuando `/diagnostico/` esté cerrado, o quitar la franja, como en Auditoría y Acompañamiento. No la toqué: el texto está dentro de la imagen.
6. **Verifica y Cumple en Desarrollo web.** Lo dejé junto a Combeau como «sitio propio». Si Ramón prefiere solo Combeau, se quita una línea del arreglo `obra` en `desarrollo-web.astro`. Con dos piezas la tercera columna de la grilla queda vacía.
7. **«Revisión humana en cada fase antes de avanzar»** sigue en «En todos los planes» (era la frase de la versión publicada). Es método, pero el inventario no lo mide. Lo confirma Ramón.
8. **«Podemos trabajar con quien ejecute hoy»** (FAQ del Acompañamiento): capacidad declarada y nunca ejercida (`capacidad-servicios.md` §3). Quedó en «podemos», con especificaciones.
9. **Nombres de plan en Title Case** (Página de Campaña, Sitio Esencial, Plataforma a Medida, Auditoría Completa, Gestión Esencial, Orgánico + Pauta…): son nombres de oferta y los guardianes los comparan; no los toqué.
10. **Miga «Soluciones» frente a la navegación.** Si `comun.nav.servicios` sigue diciendo «Servicios», las siete páginas muestran dos nombres distintos para lo mismo. Lo cierra quien edita `comun.json` y `Encabezado`.
11. **Fuera de mi área, y aparece en cada página**: el nodo `ProfessionalService` / `Person` del JSON-LD de `Layout.astro` todavía dice «Estudio de diseño y tecnología… diseñamos y programamos sitios» y «visibilidad en motores de IA» (lo detecta `barrer-terminos.mjs` como «posicionamiento anterior» en las siete rutas).
12. **El build completo del sitio** caía en `/v3/index.html` («Falta el texto «home.cinta.tramos»», edición en curso de la home) y en `/v3/trabajo/combeau/` («combeau.siguiente.caso»). Mis siete páginas compilan; las revisé en un build con esas dos rutas sustituidas por un stub.
