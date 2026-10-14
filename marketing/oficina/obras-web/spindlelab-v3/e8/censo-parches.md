# Censo de parches de texto del v3 (E8, paso 0)

14-oct-2026 · base `63f1e55` · orquestador técnico, sin rol de marca. Contrato: el plan E8 aprobado
por Ramón (paso 0). Este censo no propone copy: dice dónde está cada texto y qué lo tapa.

**Qué es.** Cada lugar de las plantillas del v3 donde lo que se ve (o lo que va al JSON-LD o a la
meta) no es lo que dice el JSON: la plantilla lo tapa, lo recorta, lo sustituye o lo fija. Es el
mapa de la migración de Diego (paso 1) y la razón por la que nadie edita el JSON a ciegas: hoy,
tocar una hoja parchada puede devolver a la página una frase que la QA ya había sacado, y el build
no avisa.

**Alcance.** `spindlelab-astro/src/pages/v3/` sin las maquetas (`a`, `b`, `c`, `maqueta-inicial`),
`src/components/v3/` y `src/consts-v3.ts`. Cada parche se comprobó contra los JSON de la base:
**calza** = hoy cambia algo; **no-op** = hoy no cambia nada. Las líneas son las de `63f1e55`. Los
punteros van como JSON Pointer sobre el archivo nombrado.

## Tipos

| Tipo | Qué hace | El riesgo al editar el JSON |
|---|---|---|
| **tapa todo** | La plantilla ignora la hoja del JSON (o la reemplaza entera) y pinta otro texto, siempre. | Editar la hoja no cambia nada visible. Clara cree que corrigió y la página sigue igual. |
| **exacto condicional** | Solo actúa si el JSON trae el texto (o la clave) exacto. | Si la hoja cambia una letra, el parche deja de actuar en silencio y sale lo que diga el JSON. |
| **reemplazo de frase** | `.replace` de un trozo dentro de un texto más largo. | Si el trozo cambia, el parche deja de actuar en silencio; si cambia otra parte de la hoja, el parche sigue y mezcla las dos versiones. |
| **texto fijado** | Copy escrito en la plantilla, sin hoja en el JSON (o en lugar de una que existe y no se lee). | Ninguno al editar el JSON; el copy se edita en la plantilla. Va al JSON si la migración lo decide. |
| **tipografía** | `comillas`, `partir`, `mayus`, `sinPunto`, `sinCorte`, `enlaza`, espacios duros. Se queda en la página. | `enlaza` y `partir` dependen de que la frase exista: si el JSON la cambia, el enlace o el corte desaparecen en silencio. |

## Resumen

Filas del censo por archivo y tipo (una fila puede cubrir varios servicios: `CAJA` cubre tres).

| Archivo | Tapa todo | Exacto condicional | Reemplazo de frase | Texto fijado (que ocupa o debería ocupar una hoja) | Tipografía |
|---|---:|---:|---:|---:|---:|
| `servicios/[slug].astro` | 7 (uno no-op) | 0 | 26 (24 calzan; los 2 de `LIMPIEZA` son no-op) | 3 (línea ×5, nota ×5, marcas) | 7 |
| `metodo.astro` | 2 | 0 | 10 | 6 | 4 |
| `diagnostico.astro` | 6 | 0 | 0 | 4 | 1 |
| `contacto.astro` | 3 | 1 | 0 | 2 (uno no-op) | 1 |
| `trabajo.astro` | 0 | 2 | 0 | 4 | 2 |
| `servicios/index.astro` | 5 | 1 | 0 | 2 | 3 |
| `servicios/desarrollo-web.astro` | 0 | 0 | 0 | toda la página | 1 |
| `index.astro` (fuera de lo cerrado) | 0 | 0 | 0 | 3 | 3 |
| `blog/index.astro`, `blog/[slug].astro` | 2 | 1 | 0 | 3 | 3 |
| componentes y `consts-v3.ts` | 0 | 0 | 0 | 5 | 1 |

Los 13 `.replace` de `metodo.astro` que nombra el plan son las 10 frases + `comillas` (:156) +
`sinPunto` (:336) + el espacio duro de «24 horas» (:338).

## Lo que volvería si se edita el JSON sin migrar

Medido contra la extracción de la base (`antes.json`, texto visible + oculto + JSON-LD + head +
atributos): estas hojas tienen una frase vetada y **hoy no se ven** porque un parche las tapa o
porque nadie las lee.

| Frase | Hoja | La tapa | Tipo | Volvería en |
|---|---|---|---|---|
| «Equipo dedicado y varios frentes a la vez.» | `servicios-v3.json#/acompanamiento-mensual/secciones/1/planes/2/tagline` | `[slug].astro:84` | reemplazo de frase | plan «A medida» |
| «Equipo dedicado y multi-servicio: …» | `servicios-v3.json#/acompanamiento-mensual/offerCatalog/itemListElement/2/description` | `[slug].astro:85` | reemplazo de frase | JSON-LD (Offer) |
| «Equipo dedicado y varios frentes a la vez.» | `oferta-v3.json#/momentos/2/planes/2/d` | nadie lee `planes` de oferta | muerto | si alguien conecta `planes` |
| «… estamos acostumbrados a trabajar bajo NDA.» | `paginas-v3.json#/contacto/faq/2/r` | `contacto.astro:68-70` | exacto condicional (por la pregunta) | FAQ visible y FAQPage |
| «motor» (×8 hojas) | redes `lead`, `secciones/1/planes/2/tagline`, `offerCatalog/itemListElement/2/description`; paid `lead`, `secciones/0/lista/4`, `secciones/1/planes/1/tagline`, `offerCatalog/itemListElement/1/description`, `faq/3/r` | `[slug].astro:363` (tapa todo), `:102`, `:103`, `:381`, `:116`, `:117`, `:118`, `:119` | tapa todo y frases | entrada, planes, lo que incluye, FAQ, Offer |
| «Ninguna herramienta del rubro publica su metodología. Acá está la nuestra …» | `paginas-v3.json#/diagnostico/secciones/0/parrafos/0` | `diagnostico.astro:149` | tapa todo | rótulo de «Los 21 chequeos» |
| «Cada día más decisiones de compra B2B …» | `servicios-v3.json#/visibilidad-en-ia/lead` | `[slug].astro:295` (leadSin) | reemplazo de frase | entrada de Visibilidad |
| «Cada vez más clientes preguntan antes de buscar.» | `paginas-v3.json#/diagnostico/lead` | no se lee (`diagnostico.astro:113` fija la línea) | tapa todo | línea de Diagnóstico |
| «Sin compromiso.» / «Sin costo ni compromiso» | `servicios-v3.json#/auditoria-seo-tecnica/secciones/4/parrafos/0`, `#/redes-sociales/secciones/4/parrafos/0`, `#/auditoria-seo-tecnica/secciones/1/planes/0/puntos/2` | `[slug].astro:77`, `:95` | reemplazo de frase | cierres, plan gratis de Auditoría |
| «sin compromiso» | `paginas-v3.json#/diagnostico/secciones/4/parrafos/0`, `#/contacto/lead`, `#/contacto/secciones/2/parrafos/0` | no se leen | muerto | ninguna parte |
| «en móvil y escritorio» | `servicios-v3.json#/auditoria-seo-tecnica/secciones/0/lista/1` | `[slug].astro:93` | reemplazo de frase | lo que incluye |
| «Calidad de agencia, trato directo de consultor.» | `servicios-v3.json#/acompanamiento-mensual/lead` | `[slug].astro:330` (leadSin) | reemplazo de frase | entrada |
| «Gemini» en lo que mide el chequeo | `paginas-v3.json#/diagnostico/description`, `#/diagnostico/lead`, `#/diagnostico/secciones/0/bloques/0/d` | `diagnostico.astro:66`, `:113`, `:179` | tapa todo | meta, línea, nota de «no mide» |
| «Sitio completo, del argumento clínico a la ficha de tratamiento.» (falso: es una sola home) | `obra-v3.json#/casos/3/linea` | `trabajo.astro:79-84` | exacto condicional | pie de Raigal y JSON-LD |

**Una frase vetada que hoy SÍ se ve y no tiene parche:** «sin costo ni compromiso» en
`paginas-v3.json#/contacto/faq/0/r` (FAQ visible de Contacto y su FAQPage). Es de Clara P.

---

## 1 · `servicios/[slug].astro` → `servicios-v3.json`

Mecanismo: `corrige()` (:125-130) aplica los pares de `CORRIGE_TODOS` y `CORRIGE[slug]` a **todo**
el objeto del servicio antes de pintarlo, así que cada par cambia a la vez el texto visible, la
FAQPage y las Offer. Un par con texto de cadena reemplaza solo la primera aparición en cada hoja;
uno con regex `/g`, todas. Un punto de plan que queda en `''` se saca al pintar (:512).

### 1.1 `CORRIGE_TODOS` (los cinco servicios)

| # | Línea | Tipo | Hojas donde calza hoy | Qué hace | Dónde se ve | Lo que queda debajo en el JSON |
|---|---|---|---|---|---|---|
| 1 | :73 | reemplazo de frase (regex /g) | `/{visibilidad-en-ia,auditoria-seo-tecnica,acompanamiento-mensual,redes-sociales,paid-media}/faq/4/r` | «590.000 CLP» → «$590.000» | FAQ «¿Cuánto cuesta?» y su FAQPage | «400.000 CLP + IVA», «590.000 CLP/mes + IVA» y el resto de las cifras en CLP (precio: no se toca la cifra, solo la notación) |
| 2 | :74 | reemplazo de frase (regex /g) | visibilidad `secciones/1/planes/1/precio` y `/2/precio`; acompañamiento, redes y paid `secciones/1/planes/0/precio` y `/1/precio` | «$590.000 /mes» → «$590.000/mes» | precio de cada plan | «$590.000 /mes» con espacio |
| 3 | :77 | reemplazo de frase (regex /g) | `/auditoria-seo-tecnica/secciones/4/parrafos/0`, `/redes-sociales/secciones/4/parrafos/0` | saca « Sin compromiso.» | párrafo del cierre | «… mini-diagnóstico gratuito. Sin compromiso.» |

### 1.2 `CORRIGE` por servicio (los 18 pares calzan)

| # | Línea | Servicio · hoja | Pasa de → a | Dónde se ve |
|---|---|---|---|---|
| 4 | :84 | acompañamiento · `secciones/1/planes/2/tagline` | «Equipo dedicado y varios frentes a la vez.» → «Varios frentes a la vez.» | plan «A medida» |
| 5 | :85 | acompañamiento · `offerCatalog/itemListElement/2/description` | «Equipo dedicado y multi-servicio: todo lo del Pro» → «Multi-servicio: todo lo del Pro» | JSON-LD (Offer). El resto de la hoja lleva «desarrollo web y mantención» (R3) |
| 6 | :90 | auditoría · `secciones/1/h2` | «Del chequeo gratis a la auditoría» → «Del mini-diagnóstico gratis a la auditoría» | h2 de planes |
| 7 | :92 | auditoría · `secciones/1/nota` | saca « Nada de un volcado de 200 hallazgos sin jerarquía.» | nota de planes |
| 8 | :93 | auditoría · `secciones/0/lista/1` | «en móvil y escritorio» → «en celular y computador» | lo que incluye |
| 9 | :95 | auditoría · `secciones/1/planes/0/puntos/2` | «Sin costo ni compromiso» → `''` (el punto se saca) | plan gratis |
| 10 | :100 | redes · `faq/2/r` | «Sí. La gestión de la pauta social …» → «Desde el plan Orgánico + Pauta. La gestión …» | FAQ y FAQPage |
| 11 | :102 | redes · `secciones/1/planes/2/tagline` | «Más plataformas y volumen, integrado al resto del motor.» → «Más plataformas y más volumen.» | plan |
| 12 | :103 | redes · `offerCatalog/itemListElement/2/description` | «integrado con el resto del motor de adquisición» → «integrado con SEO, IA y Paid Media» | JSON-LD (Offer) |
| 13 | :106 | redes · `secciones/1/nota` | «, y en todos el creativo lo pones tú (o te conectamos con un partner).» → «.» | nota de planes |
| 14 | :110-111 | paid · `secciones/1/nota` | la nota entera («El precio es el fee de gestión: … nunca la subimos sin tu confirmación. Mínimo 3 meses.») → «El fee cubre la estrategia, … Mínimo 3 meses.» | nota de planes |
| 15 | :112 | paid · `secciones/1/planes/0/puntos/3` | «Inversión publicitaria aparte, bajo tu control» → «Inversión publicitaria aparte» | plan |
| 16 | :114 | paid · `secciones/2/bloques/1/d` | saca «, no hacia todo el mundo» | bloque 02 |
| 17 | :116 | paid · `secciones/0/lista/4` | «Integración con el resto del motor: » → «Integración con tu SEO, redes y sitio: ». El resto de la hoja sigue: «El sitio es el eje; la pauta lo acelera.» (R4) | lo que incluye |
| 18 | :117 | paid · `secciones/1/planes/1/tagline` | «integrada al motor.» → «integrada a tu SEO y tu sitio.» | plan |
| 19 | :118 | paid · `offerCatalog/itemListElement/1/description` | «integración con el resto del motor.» → «integración con SEO, redes y sitio.» | JSON-LD (Offer) |
| 20 | :119 | paid · `faq/3/r` | «La pauta acelera un motor que ya gira con el orgánico: » → «La pauta acelera lo que el orgánico ya mueve: » | FAQ y FAQPage |
| 21 | :121 | paid · `faq/1/r` (y `secciones/3/parrafos/1`, muerta) | «Gestión de Redes Sociales» → «Gestión de redes sociales». Es además el texto de un enlace (`ENLACES`, :172): si la frase cambia, el enlace se pierde | FAQ y FAQPage |

### 1.3 `LIMPIEZA` (:149-152): **los dos pares son no-op**

| # | Línea | Patrón | Estado |
|---|---|---|---|
| 22 | :150 | «con nuestro protocolo público, protocolo público.» | no calza en ninguna hoja: el JSON ya está limpio |
| 23 | :151 | «con el protocolo público de medición, nuestro protocolo público y reproducible» | no calza |

### 1.4 `PROPIO` (:285-385)

| # | Línea | Servicio | Campo | Tipo | Hoja que reemplaza o recorta | Lo que queda debajo / nota |
|---|---|---|---|---|---|---|
| 24 | :287 :299 :313 :342 :366 | los cinco | `linea` (bajo el h1) | texto fijado | ninguna (sale de la meta y de la «note» de la publicada) | `:313` lleva «informes quincenales» (R2, G2 de la lista de publicación) |
| 25 | :288 :300 :314 :343 :367 | los cinco | `nota` (nota-card) | texto fijado | ninguna | `:314` «mes a mes con aviso de 30 días» |
| 26 | :295 | visibilidad | `leadSin` | reemplazo de frase | `/visibilidad-en-ia/lead` | «Cada día más decisiones de compra B2B empiezan en un chat, no en una lista de resultados.» (A2) |
| 27 | :330 | acompañamiento | `leadSin` | reemplazo de frase | `/acompanamiento-mensual/lead` | « Calidad de agencia, trato directo de consultor.» (A4) |
| 28 | :381 | paid | `leadSin` | reemplazo de frase | `/paid-media/lead` | «, con el presupuesto siempre bajo control: la pieza que acelera cuando el motor orgánico ya gira» (A10, B8) |
| 29 | :363 | redes | `lead` | tapa todo | `/redes-sociales/lead` | el lead entero: «Tus clientes ya pasan el día en redes. … Es una de las cuatro piezas del motor de adquisición: el eje lo ponen el SEO técnico y la visibilidad en IA.» |
| 30 | :327 | acompañamiento | `incluyeH2` | tapa todo | `/acompanamiento-mensual/secciones/0/h2` | «Ejecución, contenido y medición» |
| 31 | :335 | acompañamiento | `cierreP` | tapa todo | `/acompanamiento-mensual/secciones/4/parrafos/0` | «Cuéntanos dónde está tu sitio hoy y te proponemos un plan de acompañamiento a tu medida.» |
| 32 | :382 | paid | `cierreH2` | tapa todo, **hoy no-op** | `/paid-media/secciones/4/h2` | el JSON ya dice «Vemos dónde conviene invertir» |
| 33 | :383 | paid | `cierreP` | tapa todo | `/paid-media/secciones/4/parrafos/0` | «Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito. Vemos dónde conviene invertir antes de que pongas un peso en pauta.» |
| 34 | :291-292 :307 :321-322 :352 :377 | los cinco | `marcas`, `marcasSr` | texto fijado | ninguna | rótulos Sí/No, A-D, S1-S4, 01-04; para lector de pantalla «Prometemos:», «No prometemos:», «Semana 1:» … |

### 1.5 Nombres: `CAJA` y la miga del grafo

| # | Línea | Tipo | Hoja | Dónde se ve | Lo que queda debajo |
|---|---|---|---|---|---|
| 35 | :401-409 | tapa todo (por slug) | `/{auditoria-seo-tecnica,acompanamiento-mensual,redes-sociales}/h1` y `/breadcrumb/2/name` | h1, miga visible, BreadcrumbList posición 3 | «Auditoría SEO Técnica», «Acompañamiento Mensual», «Gestión de Redes Sociales» (Title Case). La entrada `desarrollo-web` es no-op (no hay esa clave en el JSON). Visibilidad y Paid Media no están en `CAJA`: su h1 sale del JSON («Visibilidad en IA (AEO/GEO)», «Paid Media (Google)») |
| 36 | :441 | tapa todo | `/{los cinco}/breadcrumb/1/name` | BreadcrumbList posición 2 | «Soluciones» |

`title` y `serviceName` no se tocan: conservan el nombre de producto a propósito (spec §7).
Los nombres en caja de oración viven en **dos** lugares: `CAJA` y `SERVICIOS_V3` (`consts-v3.ts:17-24`).

### 1.6 Texto propio de la plantilla (sin hoja)

:139 «Preguntas frecuentes» (respaldo, hoy no se usa: los cinco traen la sección) · :468 «Ver planes»
· :469 «Escríbenos» · :552 «Pedir el diagnóstico gratis» · :553 «Correr el chequeo» · :559
«Siguiente» · :189-200 los alt de `IMG`.

### 1.7 Tipografía que se queda

:144 `comillas` (entrada, lo que incluye, nota, bloques) · :145 `mayus` · :146 `sinPunto` (h2 de
lo que incluye, planes, bloques, FAQ y cierre) · :156-159 `partir` («Título: cuerpo» → h3 + p en lo
que incluye) · :169-182 `ENLACES`/`enlaza`, primera aparición por página (hoy: «protocolo público»
en Visibilidad `#planes>p:0` y en Acompañamiento `§s-inc>p:2`; «servicio de acompañamiento mensual»
en Auditoría `§s-faq>p:2`; «Gestión de redes sociales» en Paid Media `§s-faq>p:1`; «Paid Media
(Google)» en Redes `§s-faq>p:2`) · :392 `sinCorte` (palabras con guion) · :559 espacio duro antes
de «→».

---

## 2 · `metodo.astro` → `paginas-v3.json#/metodo`

| # | Línea | Tipo | Hoja | Qué hace | Lo que queda debajo / nota |
|---|---|---|---|---|---|
| 37 | :70 | texto derivado de la meta | `/metodo/description` (primera frase); el campo `linea` no existe | la línea bajo el h1 | «Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo.» La meta tiene veto de Simón; «pasos» y «AEO/GEO» los dejó pendientes la QA2 (:38-40) |
| 38 | :75 | reemplazo de frase (regex) | `/metodo/lead` | «No improvisamos: cada» → «Cada» | A4 |
| 39 | :76 | reemplazo de frase | `/metodo/lead` | « de cuatro fases de auditoría» → « de auditoría» | |
| 40 | :77 | reemplazo de frase | `/metodo/lead` | saca «, refinado para sectores donde la confianza es crítica» | A2 |
| 41 | :78 | reemplazo de frase | `/metodo/lead` | «sepas exactamente qué» → «sepas qué» | |
| 42 | :91 | reemplazo de frase (regex) | `/metodo/secciones/0/bloques/0/d` | «Todo parte con tu URL. Auditamos el sitio en profundidad» → «Todo parte con tu URL y el chequeo de 21 señales, el mismo que puedes correr tú en segundos. Después revisamos el sitio a mano» | la frase nueva vive en la plantilla |
| 43 | :92 | reemplazo de frase | ídem | «Luego conversamos» → «Y conversamos» | |
| 44 | :93 | reemplazo de frase | ídem | «tu negocio, tus clientes y las búsquedas» → «tu negocio y las búsquedas» | |
| 45 | :97 | reemplazo de frase (regex) | ídem | « que recibes gratis, en 24 horas.» → «.» | |
| 46 | :99 | reemplazo de frase (regex) | `/metodo/secciones/0/bloques/3/d` | saca «Lo que no se mide, se estanca.» | aforismo (A2) |
| 47 | :154 | reemplazo de frase (regex) | `/metodo/secciones/2/lista/1` | «una conversación sobre tu negocio, tus clientes y qué» → «una conversación para entender qué» | |
| 48 | :319 | tapa todo | `/metodo/secciones/2/h2` | h2 fijo «Lo que necesitamos de ti»; el del JSON baja a bajada con punto agregado (`{poco.h2}.`) | «Poco, pero importante» |
| 49 | :109-114 | texto fijado | ninguna (de `public/metodo/index.html`) | Duración, Recibes y Frecuencia de cada fase | :113 «Informes quincenales», «Reunión mensual» (R2) |
| 50 | :123-132 | texto fijado | ninguna | «Cuánto cuesta» de cada fase, con precios y los enlaces «Ver la auditoría», «Ver Visibilidad en IA», «Ver el acompañamiento» | precios: no se tocan |
| 51 | :162-167 | texto fijado (JSON-LD) | ninguna; **no** sale del texto visible de la fase | `HowToStep.text` de los 4 pasos | difiere de lo visible; :166 «Cada quince días medimos menciones en IA» (R2, G2) |
| 52 | :177, :187, :188-189 | texto fijado (JSON-LD) | ninguna | `WebPage.name`, `HowTo.name`, `HowTo.description` | la descripción dice «estrategia AEO/GEO» |
| 53 | :254 | texto fijado | ninguna | nota-card «La fase 01 es gratis. Cada una de las demás dice cuánto cuesta.» | |
| 54 | :222, :228-229, :340-341 | texto fijado | ninguna | miga, «Correr el chequeo», «Ver las cuatro fases», «Pedir el diagnóstico» | |

Tipografía: :141-146 `PROTOCOLO` (parte la fase 04 en «nuestro protocolo público» y la enlaza; si la
frase cambia en `/metodo/secciones/0/bloques/3/d`, el enlace se pierde en silencio) · :156 `comillas`
y :157 `mayus` en la lista de lo que pedimos · :336 `sinPunto` del h2 del cierre
(`/metodo/secciones/3/h2`, «El primer paso es gratis.», con «paso» pendiente de la QA2) · :338 y la
constante `NB` (:64, **un U+00A0 literal**, no se ve en el editor): «24 horas», «21 señales», «2 a 6
semanas». `HowToStep.name` (:196) sale de `b.t` del JSON: el h3 y el paso del grafo van juntos.

---

## 3 · `diagnostico.astro` → `paginas-v3.json#/diagnostico`

| # | Línea | Tipo | Hoja | Qué pinta en su lugar | Lo que queda debajo |
|---|---|---|---|---|---|
| 55 | :66 | tapa todo | `/diagnostico/description` | meta description y og:description fijas (veto de Simón) | «… si ChatGPT, Gemini y Perplexity pueden leerte …» (Gemini no se prueba en vivo) |
| 56 | :72, :82, :108 | tapa todo | `/diagnostico/breadcrumb/1/name` | «Chequeo gratis» en la miga visible y en el BreadcrumbList | «Chequeo de visibilidad en IA» |
| 57 | :113 | tapa todo (la hoja no se lee) | `/diagnostico/lead` | la línea bajo el h1, fija | «Cada vez más clientes preguntan antes de buscar. … ChatGPT, Gemini y Perplexity …» |
| 58 | :149 | tapa todo | `/diagnostico/secciones/0/parrafos/0` | la bajada «La metodología completa, con el peso de cada bloque …» | «Ninguna herramienta del rubro publica su metodología. Acá está la nuestra completa, …» |
| 59 | :177-180 | tapa todo | `/diagnostico/secciones/0/bloques/0` | la sección «Lo que este chequeo no mide», fija; :179 dice «cada mes» (R2, G2) | t «Si la IA te nombra.», d «… cinco preguntas fijas por tres motores (ChatGPT, Gemini y Perplexity) …» |
| 60 | :220 | tapa todo (la sección no se lee, :49) | `/diagnostico/secciones/4` | el «Siguiente» de la página: «Una página, gratis, en 24 horas.» + «Pedir el diagnóstico →» | h2 «¿Quién aparece en tu lugar?», párrafo «… Gratis, en 24 horas, sin compromiso.» |
| 61 | :151-162 | texto fijado | ninguna (de `public/diagnostico/index.html`) | los tres bloques con su peso («¿Te pueden leer?» 30, «¿Te entienden?» 40, «¿Te pueden citar?» 30) | debería vivir en el JSON |
| 62 | :137, :142 | texto fijado | ninguna | nota-card y guía de la entrada | |
| 63 | :118-122, :126 | texto fijado (zona chq) | ninguna | «Tu dominio», «Revisar mi sitio», la nota, «Resultado del chequeo» (lector de pantalla) | los `id` chq-* y el `name` no se tocan; el texto sí se puede |
| 64 | :143, :193, :204, :205 | texto fijado | ninguna | botones y la etiqueta «{n} · Producto propio» de Verifica y Cumple | |

Tipografía: :55 `sinPunto` en los h2 de las secciones 0 a 3 (el JSON los trae con punto).
El title sale del JSON (veto de Simón).

---

## 4 · `contacto.astro` → `paginas-v3.json#/contacto`

| # | Línea | Tipo | Hoja | Qué pinta | Lo que queda debajo |
|---|---|---|---|---|---|
| 65 | :54 | tapa todo | `/contacto/secciones/0/h2` | «Pide tu mini-diagnóstico» | «Cuéntanos de tu proyecto» |
| 66 | :55 | tapa todo | `/contacto/secciones/1/h2` | «Qué pasa después» | «Tres pasos, cero fricción» |
| 67 | :68-70 | exacto condicional (por `faq[i].p === NDA_P`) | `/contacto/faq/2/r` | `NDA_R`: «Sí, sin problema. En sectores financieros es práctica habitual y trabajamos bajo NDA cuando el cliente lo requiere.» (visible y FAQPage) | «… es práctica habitual y estamos acostumbrados a trabajar bajo NDA.» (A9). Si la pregunta del JSON cambia una letra, vuelve |
| 68 | :119 | tapa todo (la hoja no se lee) | `/contacto/lead` | la línea bajo el h1, fija | «Así de simple es empezar: … Gratis y sin compromiso.» |
| 69 | :47 | texto fijado de respaldo, **hoy no-op** | `/contacto/secciones/0/bloques/0` | «Listo.» + «Te escribimos dentro de 24 horas …» solo si falta la hoja | el JSON trae el mismo texto |
| 70 | :59 | texto fijado | ninguna | botón «Pedir mi mini-diagnóstico →»; :245-251 lo devuelve si `v3-contacto.js` (no se toca) lo deja en «Enviar →» | |

Texto del formulario sin hoja (Clara P): :141 «Nombre», :145 «Email», :157 «Sitio web», :159 la
ayuda «Si partes de cero, escribe «no tengo» …», :163 «Cuéntanos brevemente (opcional)», :164 el
placeholder, :174 el consentimiento, :190 «O escríbenos directo a». Los `value` de :134-135 (asunto y
remitente del correo) también son texto, aunque no se vean. **Los `name` no se tocan.**

Tipografía: :46 espacios duros en el h1 («Tu URL», «24 horas»). Title y description salen del JSON
(veto de Simón).

---

## 5 · `trabajo.astro` → `obra-v3.json`

| # | Línea | Tipo | Hoja | Qué pinta | Lo que queda debajo |
|---|---|---|---|---|---|
| 71 | :79-84 | exacto condicional | `/casos/3/linea` (Raigal) | «Clínica de implantología. Por ahora, solo la portada: …» en el pie y en la `description` del CreativeWork | «Clínica de implantología y rehabilitación oral. Sitio completo, del argumento clínico a la ficha de tratamiento.» (falso: es una home) |
| 72 | :88-90 | exacto condicional | `/casos/2/rubro` | «Herramienta» | «Herramienta propia» |
| 73 | :104-108 | texto fijado | ninguna | `ROTULO`: «Cliente», «Producto propio», «Pieza de concepto» | |
| 74 | :183, :200 | texto fijado (JSON-LD) | ninguna | `CollectionPage.name` «Trabajo» y la `description` del CreativeWork armada en la plantilla («Pieza de concepto: {n} no existe y no es un cliente. Es un ejercicio de SpindleLab en el rubro de {rubro}. {linea}») | |
| 75 | :219 | texto fijado | ninguna (`obra-v3.json` no tiene title) | title «Trabajo: sitios que construimos · SpindleLab» (veto de Simón) | |
| 76 | :262, :266, :284-287, :292, :296 | texto fijado | ninguna | frase de concepto, texto para lector de pantalla del enlace, cierre (h2 y dos párrafos), botones, «Siguiente» | |

Tipografía: :102 `partesNombre` (la barra de «Bernardo Combeau | Model») · :296 `&nbsp;→`. El precio
de :94-97 sale de `oferta-v3.json` (no se toca).

---

## 6 · `servicios/index.astro` → `oferta-v3.json` y `paginas-v3.json#/servicios`

| # | Línea | Tipo | Hoja | Qué pinta | Lo que queda debajo |
|---|---|---|---|---|---|
| 77 | :59 | tapa todo | `paginas-v3.json#/servicios/breadcrumb/1/name` | «Servicios» en el BreadcrumbList | «Soluciones» |
| 78 | :70 | tapa todo | `paginas-v3.json#/servicios/itemList/name` | «Servicios de SpindleLab» en el ItemList (y lo reordena) | «Soluciones de SpindleLab» |
| 79 | :98-101 (`brasa: ''`) | tapa todo | `oferta-v3.json#/momentos/0/nota` | nada (la banda Desarrollo va sin nota) | «El SEO técnico y el AEO van puestos desde el primer commit, no parchados al final. Esa es la especificación del producto, no un servicio aparte.» |
| 80 | :98-101 (`navy`) | tapa todo | `oferta-v3.json#/momentos/1/nota` | «No hace falta reconstruir para que una IA pueda citarte.» | «Si tu sitio funciona y no lo vas a rehacer, esta es la puerta. No hace falta reconstruir …» |
| 81 | :106-108 | tapa todo, solo en esta página | `oferta-v3.json#/momentos/0/items/0/d` | «… Lo compruebas con el chequeo gratis, sobre tu dominio, antes y después.» | **Esa hoja es la línea del campo Desarrollo de la home, cerrada.** El texto del índice necesita hoja propia (el `dIndice` del plan); la hoja cerrada no se edita |
| 82 | :116-118 | exacto condicional | `oferta-v3.json#/fuera/0` | «Contenido creativo: redacción y guiones de piezas.» | «Creación de contenido: redacción y guiones de piezas.» |
| 83 | :144-145 | texto fijado | ninguna (se quitaron de `paginas-v3.json` el 13-oct) | title «Soluciones: SEO técnico, visibilidad en IA y desarrollo web · SpindleLab» y description (veto de Simón) | |
| 84 | :154-163, :171, :187, :204, :209, :220-223 | texto fijado | ninguna | miga, h1 «Qué hacemos», nota-card, guía con dos enlaces, rótulo de banda, «Desde» y «+ IVA», «Lo que pones tú», su pie, el cierre «Empieza por el chequeo» | |

Tipografía: :124 `alternativas` · :138-141 `partir` · :187 **U+00A0 literal** antes de «·».
`ciruela` no está en `notaPagina`: su nota sale del JSON (`/tambienPanel/nota`).

---

## 7 · `servicios/desarrollo-web.astro` (no lee ningún JSON de copy)

Toda la página es **texto fijado**, y debería vivir en un dato (Clara H, P86):

- :52-59 lo que incluye · :64-89 los cuatro planes, **duplicados palabra por palabra** en
  `oferta-v3.json#/momentos/0/planes`, que nadie lee · :91-97 las cinco fases · :99-116 la FAQ
  (visible y FAQPage).
- JSON-LD :124-135: `Service.name` «Desarrollo Web», `serviceType` y las `description` de las cuatro
  Offer, que **no** dicen lo mismo que los planes visibles.
- :207-208 title y description (veto de Simón) · :219-222 miga, h1, línea y botones · :230 nota-card ·
  :231 la guía de la entrada (P86: repite la línea del campo de la home y la del menú) · :235, :243,
  :253, :266, :281, :290 los h2 · :292-296 el cierre · :300 «Siguiente» · :201 el alt de ventana.

Tipografía: :237-238 parte «chequeo» y lo enlaza a `/v3/diagnostico/` (si la palabra sale de la
lista, el enlace se pierde) · :17-19 avisa que la FAQ publicada empieza con «Sí.» (defecto de producción).

---

## 8 · `index.astro` (la home, fuera de lo cerrado)

Cerrado y fuera del censo: `section.d-hero` (:186-211), `.d-pres` (:216-219) y la línea del campo
Desarrollo (`oferta-v3.json#/momentos/0/items/0/d`, pintada en :239).

| # | Línea | Tipo | Qué es |
|---|---|---|---|
| 85 | :156, :177 | texto fijado | `TITLE` (también `WebPage.name`) y la description (veto de Simón) |
| 86 | :249-250, :265-270, :277-278 | texto fijado | «Ver {servicio}», «Escríbenos», el bloque «No te prometo. Te muestro.» con su guía, firma y botón, «Lo que escribimos sobre búsqueda e IA» (repetido como h1 de `/v3/blog/`), «Ver todo» |
| 87 | :102-111 | texto fijado (alt) | los alt de las fotos del pool en los campos Visibilidad, Continuidad y Alcance |

Tipografía: :239 agrega «.» al `momento` del JSON · :243-246 `alternativas`, «Desde», «+ IVA» y
`'\u00a0·'` · :147 formato de fecha. Las `nota` de `oferta-v3.json` no se pintan en la home.

---

## 9 · Blog: `blog/index.astro` y `blog/[slug].astro`

Los cuerpos (`src/data/blog-v3/*.html`) y `_indice.json` están cerrados. Los titulares, bajadas y
fechas que muestran la home, el índice y el «Siguiente artículo» salen de `_indice.json`: no se editan.

| # | Línea | Tipo | Hoja | Qué hace |
|---|---|---|---|---|
| 88 | `[slug]`:79-81 | exacto condicional, sobre dato cerrado | byline de `seo-tecnico-fintechs-chile.html` | `TEMA_CAJA`: «SEO Técnico» → «SEO técnico» |
| 89 | `[slug]`:101-103 | tapa todo, sobre dato cerrado | `blog-v3/<slug>.json` · BreadcrumbList posiciones 2 y 3 | «Blog» (el JSON dice «El Taller») y el nombre corto de la miga visible |
| 90 | `[slug]`:113-117 | tapa todo (alt) | el `<img>` del autor en el HTML del post | `alt=""` (el nombre ya está escrito al lado) |
| 91 | `index`:39-40, :75, :118 | texto fijado | ninguna | `DESCRIPCION` (meta y CollectionPage), `CollectionPage.name`, title |
| 92 | `index`:131-136, :142, :152 | texto fijado | ninguna | miga, h1, línea («Redacción provisoria: la final es de Clara», :135), nombre de la lista, «Leer el artículo» |
| 93 | `index`:182-186 y `[slug]`:319-323 | texto fijado **en dos archivos** | ninguna | el mismo cierre («Leer ayuda; medir, más.», la guía, «Es el mismo chequeo …», los botones), escrito dos veces |

Texto fijado en `[slug]` además: :261 miga, :292 «Contenido del artículo», :294 «En este artículo»,
:329 «Siguiente artículo».

Tipografía en `[slug]`: :85-87 la fecha visible se rehace desde `meta.datePublished` · :180 `<p hidden>`
sobre «En esta guía:» (atributo, no texto) · :298 U+00A0 en el número del índice. El comentario de
`index`:109-110 dice que los cierres de servicios y trabajo nombran a Gemini: ya no es así.

---

## 10 · Componentes y `consts-v3.ts` (las 21 rutas)

| # | Dónde | Tipo | Qué es |
|---|---|---|---|
| 94 | `NavV3.astro`:28-35 | texto fijado | los ocho nombres del menú («Chequeo gratis» incluido) |
| 95 | `NavV3.astro`:85, :90 (y :287, :301 por JS), :145, :162-165 | texto fijado | «Escríbenos», «Abrir menú» / «Cerrar menú», «Los servicios», y el párrafo del menú «Estudio de diseño y SEO técnico en Santiago. Construimos el sitio y dejamos resuelto que las máquinas …» (P86) |
| 96 | `FooterV3.astro`:30-31, :41, :51, :62-63 | texto fijado | «Si quieres hablar de tu sitio, escríbenos.», «Escríbenos», «Servicios», «La casa», «SpindleLab.», «Santiago, Chile · SpindleLab SpA», «© 2026» |
| 97 | `consts-v3.ts`:17-34 | texto fijado | `SERVICIOS_V3` y `CASA_V3`: los nombres de menú, pie y «Siguiente» (los de los servicios se repiten en `CAJA`) |
| 98 | `consts-v3.ts`:40-46 | texto fijado | `og:image:alt` de las 21 rutas. `OG_V3.alt` cita el hero cerrado: se mueve con él, no aparte |

Además: `Pieza.astro`:60 «Pieza de concepto · no es un cliente» · `Miga.astro` el separador « · »
(oculto al lector de pantalla) y «Miga de pan».

---

## 11 · Texto muerto en el JSON

Hojas que ninguna plantilla lee. Hoy no se ven; si alguien las conecta, salen tal cual. **No se
borran por eso**: `[slug].astro` busca las secciones por forma (la que tiene `parrafos` titula la FAQ
y la última es el cierre), así que borrar un arreglo que parece muerto puede mover lo que se pinta.

- `servicios-v3.json`: `/{servicio}/secciones/3/parrafos` (copia vieja de la FAQ; solo se usa su
  `h2`). En `/paid-media/secciones/3/parrafos/1` está «Gestión de Redes Sociales».
- `paginas-v3.json`: `/metodo/secciones/0/parrafos` y `/metodo/secciones/1/parrafos` (copias de los
  bloques con el texto viejo: «Auditamos el sitio en profundidad …»); `/diagnostico/lead`,
  `/diagnostico/secciones/1/parrafos`, `/diagnostico/secciones/3/parrafos`, `/diagnostico/secciones/4`;
  `/contacto/lead`, `/contacto/secciones/{0,1,2}/parrafos` (con «sin costo ni compromiso» y otra
  versión del NDA).
- `oferta-v3.json`: `/momentos/*/planes` y `/tambienPanel/planes` (con «Equipo dedicado …» en
  `/momentos/2/planes/2/d` y los planes de Desarrollo web duplicados), `/momentos/0/nota` (además
  tapada en el índice), y los `cta`.
- `servicios-v3.json` no tiene la clave `desarrollo-web`, aunque `CAJA` la nombre.

## 12 · Comentarios que nombran a Clara (para el paso 7)

`metodo.astro`:21-22, :38-40, :66-69 · `diagnostico.astro`:26-27, :219 · `contacto.astro`:52-53, :67,
:114-115 · `trabajo.astro`:67-69, :77, :86-87 · `servicios/index.astro`:94-95 · `servicios/[slug].astro`:64
· `blog/index.astro`:135. Varios dicen «cuando el JSON cambie, este parche deja de hacer nada»: con
la migración del paso 1 eso deja de ser cierto o de hacer falta, y el comentario tiene que decirlo.

## 13 · Lo que la extracción no ve

El texto que solo aparece después de una acción: el resultado y los errores de `v3-chequeo.js` (los
pinta tras llamar a `/api/chequeo`), «Enviando…» y el error de `v3-contacto.js`, el aviso de cookies
después de elegir y «Cerrar menú» con el menú abierto. Son copy (los de `v3-chequeo.js`, de Clara H) y
se revisan a mano; el extractor solo ve la página cargada.

## Cómo se buscó

```
rg -n -e '\.replace\(' src/pages/v3 src/components/v3          # (sin a, b, c, maqueta-inicial)
rg -n -e 'CORRIGE|LIMPIEZA|leadSin|PROPIO|CAJA|descPagina|notaPagina|fueraPagina' src/pages/v3
rg -n -e 'NDA_|h2Form|h2Pasos|etiquetaEnvio|descripcion|DESCRIPCION|_CORREGID|TEMA_CAJA|MIGA|ROTULO' src/pages/v3
rg -n -e "name: '|title=\"|description=\"|label: '" src/pages/v3 src/components/v3 src/consts-v3.ts
rg -n -e '\\u00a0|&nbsp;|\bNB\b|sinPunto|comillas|mayus|partir|sinCorte|enlaza' src/pages/v3 src/components/v3
```

Más la lectura completa de cada plantilla, la evaluación del frontmatter de `[slug].astro` por
servicio contra `servicios-v3.json` (qué hoja toca cada par) y el cruce de las frases vetadas del plan
con la extracción de la base.
