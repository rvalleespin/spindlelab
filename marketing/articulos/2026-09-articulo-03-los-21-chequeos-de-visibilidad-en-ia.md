# Los 21 chequeos de visibilidad en IA, explicados uno por uno (y cómo correrlos gratis en tu sitio)

> **Estado: ⬜ BORRADOR para edición de Ramón (Pase 1+2, lun 31-ago).** Publica Diego el **jue 3-sep**.
> Tiene que estar en vivo antes del post de página del **mar 8-sep**, que lo enlaza.
> **Blog #1 de la línea editorial v2** (`marketing/linea-editorial-blog-v2.md`). Pilar: **Pedagogía**.
> **Fuente real:** la metodología pública de `spindlelab.cl/diagnostico` y el chequeo que la
> ejecuta (`spindlelab-astro/functions/api/chequeo.js`). Los 21 nombres, los pesos y las
> instrucciones de arreglo de la tabla salen de ahí, verificados uno por uno. Cero cifras
> inventadas: si un número aparece en este artículo, está en el código o en la página.

---

Un chequeo de visibilidad en IA revisa si un motor como ChatGPT, Gemini o Perplexity puede hacer tres cosas con tu sitio: entrar, entender qué eres y citarte. Nuestro chequeo mide 21 señales, todas leídas del código público de tu sitio, y las agrupa en esos tres bloques. Acá están las 21, qué mide cada una, cuánto pesa en el puntaje final y qué hacer si no la pasas.

Publicamos la metodología completa porque un puntaje que no explica cómo se calcula no sirve para decidir nada. Puedes correr el chequeo sobre tu propio sitio en [spindlelab.cl/diagnostico](/diagnostico/), gratis y sin registrarte, o puedes leer esta página y revisarlo a mano. Las dos formas llegan al mismo lugar.

## Qué mide el puntaje, y qué no

El puntaje va de 0 a 100 y mide **si tu sitio está técnicamente preparado para que un motor de IA lo lea, lo entienda y lo cite**. No mide si hoy te citan.

Esa distinción importa más de lo que parece. Los motores arman sus respuestas con fuentes de terceros, como rankings, directorios y artículos, no solo con tu sitio. Puedes estar impecable por dentro y no aparecer en ninguna respuesta. Al revés también pasa: hay sitios técnicamente pobres que salen mencionados porque alguien más los mencionó primero.

Lo que este chequeo te dice es si el problema está **dentro** de tu sitio. Si sale bajo, ya sabes por dónde partir y no hace falta seguir buscando. Si sale alto, el trabajo que te queda es de menciones externas, y eso se revisa de otra manera.

## Los 21 chequeos

Cada chequeo vale un peso fijo. Los tres bloques suman 100: acceso 30, entidad 40, citabilidad 30. Los pesos no son parejos a propósito, y en la última columna se ve por qué.

| Chequeo | Bloque | Qué mide | Cómo se arregla | Peso |
|---|---|---|---|---|
| ChatGPT puede leer tu sitio | ¿Te pueden leer? | Que tu `robots.txt` no bloquee a **GPTBot** en la raíz del sitio | Quita la regla que bloquea a GPTBot en tu `robots.txt` | 6 |
| Claude puede leer tu sitio | ¿Te pueden leer? | Que tu `robots.txt` no bloquee a **ClaudeBot** | Quita la regla que bloquea a ClaudeBot | 6 |
| Perplexity puede leer tu sitio | ¿Te pueden leer? | Que tu `robots.txt` no bloquee a **PerplexityBot** | Quita la regla que bloquea a PerplexityBot | 6 |
| Gemini puede leer tu sitio | ¿Te pueden leer? | Que tu `robots.txt` no bloquee a **Google-Extended** | Quita la regla que bloquea a Google-Extended | 6 |
| El sitio responde por HTTPS | ¿Te pueden leer? | Que el dominio devuelva un 200 sobre HTTPS, sin cadenas de redirección rotas | Asegura que el dominio sirva por HTTPS y responda 200 | 6 |
| Tienes datos estructurados | ¿Te entienden? | Que haya al menos un bloque de JSON-LD **válido** en la portada | Agrega JSON-LD. Es la forma en que le explicas a un motor qué es tu negocio | 6 |
| Tu negocio está declarado como entidad | ¿Te entienden? | Que exista un nodo `Organization`, `LocalBusiness`, `MedicalOrganization`, `LegalService` o equivalente | Declara un nodo de entidad con nombre, dirección y contacto | 8 |
| Tu entidad tiene dirección y contacto | ¿Te entienden? | Que ese nodo declare `address` y además `telephone`, `email` o `contactPoint` | Suma dirección y forma de contacto al nodo de tu negocio | 5 |
| Te conectas con al menos 3 perfiles externos | ¿Te entienden? | Que el `sameAs` de tu schema apunte a tres perfiles reales o más | Suma tus perfiles reales: LinkedIn, Instagram, Google Business. Uno solo no basta | 6 |
| Hay una persona con credenciales detrás | ¿Te entienden? | Que exista un nodo `Person` con cargo, especialidad, formación o empleador | Declara quién firma el contenido, con cargo y especialidad | 5 |
| El título dice qué haces y dónde | ¿Te entienden? | Que el `<title>` tenga entre 15 y 65 caracteres | Deja el título en ese rango, con el servicio y el país | 4 |
| Tienes meta description útil | ¿Te entienden? | Que la `meta description` tenga entre 50 y 165 caracteres | Escribe una meta description dentro de ese rango | 4 |
| Hay un solo H1 | ¿Te entienden? | Que la página tenga exactamente un `<h1>`, ni cero ni varios | Deja un solo H1 por página | 2 |
| Tienes llms.txt | ¿Te pueden citar? | Que exista `/llms.txt` y no venga vacío | Publica un `llms.txt` que diga qué eres y qué páginas importan | 4 |
| Tienes preguntas frecuentes marcadas | ¿Te pueden citar? | Que haya `FAQPage` o `QAPage` en tu schema | Marca tus preguntas frecuentes con `FAQPage`. Es el formato que un motor cita textual | 6 |
| Tienes sitemap.xml | ¿Te pueden citar? | Que `/sitemap.xml` responda y sea un `urlset` o `sitemapindex` válido | Publica un sitemap y decláralo en `robots.txt` | 4 |
| Declaras la URL canónica | ¿Te pueden citar? | Que la portada declare `<link rel="canonical">` | Agrega la canónica en cada página | 2 |
| Declaras el idioma | ¿Te pueden citar? | Que el `<html>` declare `lang` | Agrega `lang="es-CL"` al `<html>` | 2 |
| Respondes preguntas en tus títulos | ¿Te pueden citar? | Que haya al menos dos `H2` o `H3` escritos como pregunta | Escribe subtítulos con la pregunta que hace tu cliente | 5 |
| Tu contenido tiene fecha | ¿Te pueden citar? | Que el schema declare `datePublished` o `dateModified` | Declara ambas. Sin fecha, un motor no sabe si tu información sigue vigente | 4 |
| Tu portada tiene contenido suficiente | ¿Te pueden citar? | Que haya al menos 300 palabras de texto visible en la portada | Explica qué haces, para quién y dónde. Una portada sin texto no le da nada que citar | 3 |

## Bloque 1: ¿te pueden leer? (30 puntos)

Este bloque vale casi un tercio del puntaje y es el único donde fallar significa que todo lo demás da lo mismo. Un sitio impecable con GPTBot bloqueado es un sitio que ChatGPT no va a citar nunca, porque no lo puede abrir.

Lo importante acá es que **casi nadie bloquea estos bots a propósito**. Aparecen por otras vías: un plugin de seguridad que agrega reglas "recomendadas", un WAF que trata a cualquier agente automatizado como amenaza, un `robots.txt` heredado del sitio anterior. La regla queda escrita y nadie la vuelve a mirar.

Los cuatro bots que revisamos son los que alimentan los motores donde hoy la gente pregunta:

- **GPTBot** rastrea para ChatGPT.
- **ClaudeBot** rastrea para Claude.
- **PerplexityBot** rastrea para Perplexity.
- **Google-Extended** controla si tu contenido puede usarse en las respuestas de Gemini, y es independiente de si Googlebot te indexa. Puedes estar perfecto en el buscador de Google y bloqueado en Gemini.

El quinto chequeo del bloque es HTTPS, que suena obvio hasta que el dominio sin `www` no redirige, o el certificado venció el mes pasado y nadie lo notó porque la mayoría del tráfico entra por un link directo.

**Cómo revisarlo a mano:** abre `tudominio.cl/robots.txt` en el navegador y busca los cuatro nombres. Si aparecen bajo un `Disallow: /`, ahí está el problema.

## Bloque 2: ¿te entienden? (40 puntos)

Es el bloque que más pesa, y en las auditorías que hacemos es también el que más veces aparece a medias.

Un motor de IA no lee tu portada como la lees tú. Lee el texto, sí, pero lo que le permite afirmar cosas sobre ti con confianza son tus **datos estructurados**: un bloque de JSON-LD donde declaras, en un formato que no admite interpretación, que eres una clínica dental, que estás en Providencia, que tu teléfono es este y que la persona que firma el contenido es especialista en tal cosa.

Por eso el chequeo de más peso de todo el instrumento, con 8 puntos, es **declarar tu negocio como entidad**. Sin ese nodo, un motor tiene que adivinar qué eres a partir del texto suelto, y cuando adivina, prefiere citar a alguien que no lo obligó a adivinar.

Los tres chequeos que siguen construyen sobre ese nodo:

- **Dirección y contacto** convierten una declaración en algo verificable. Una organización sin dirección ni forma de contacto se parece bastante a una que no existe.
- **`sameAs` con al menos tres perfiles** es cómo un motor cruza tu identidad con el resto de internet. Un solo perfil no sirve para confirmar nada; tres empiezan a formar una entidad reconocible.
- **Una persona con credenciales** es el chequeo que más pesa en salud, finanzas y legal. En esos rubros, quién dice algo determina si la afirmación se puede citar.

Los últimos tres del bloque son de higiene clásica de SEO, y valen poco justamente por eso: el título, la meta description y tener un solo H1 suman 10 puntos entre los tres. Importan, pero un sitio que solo tiene resuelto eso no está preparado para nada.

## Bloque 3: ¿te pueden citar? (30 puntos)

Los motores no citan sitios. Citan **fragmentos**. Este bloque mide si tu contenido está en un formato del que se puede extraer un fragmento limpio, con atribución y fecha.

Los dos chequeos que más pesan acá son los que más se ignoran:

**Preguntas frecuentes marcadas con `FAQPage` (6 puntos).** Es el formato más citable que existe: una pregunta, una respuesta cerrada, sin contexto alrededor. Un motor puede tomarla textual sin riesgo de sacar algo de contexto. Ojo con la trampa: tener una sección de preguntas frecuentes visible no es lo mismo que tenerla marcada en el schema. El chequeo busca lo segundo.

**Títulos escritos como pregunta (5 puntos).** Si tus `H2` dicen "Servicios" y "Nosotros", no hay nada que calce con lo que alguien le escribe a un motor. Si dicen "¿Cuánto demora un implante dental?", el párrafo que sigue es candidato directo a ser la respuesta. Pedimos al menos dos porque uno puede ser casualidad.

Los demás son señales de orden. **`llms.txt`** es el más nuevo de todos y todavía no lo tiene casi nadie: es un archivo de texto en la raíz que le dice a un motor qué eres y qué páginas importan, sin que tenga que deducirlo del menú. **`sitemap.xml`** le entrega el mapa completo. La **canónica** evita que dos URLs compitan por la misma cita. El **idioma declarado** distingue tu español de Chile del de cualquier otro lugar.

**La fecha en el schema (4 puntos)** es el chequeo que más subestiman los sitios institucionales. Sin `datePublished` ni `dateModified`, un motor no tiene cómo saber si tu página es de este año o de 2019, y ante la duda cita a quien sí se lo dijo.

Y el último, **contenido suficiente en la portada**, es casi una obviedad que igual falla seguido: las portadas de puro diseño, con tres frases y muchas imágenes, no le dan a un motor nada que copiar.

## Cómo leer tu puntaje

Estos son los cuatro tramos que usa el chequeo:

| Puntaje | Qué significa | Qué hacer |
|---|---|---|
| 90 a 100 | Tu sitio está listo por el lado técnico | Lo que te falta para que te citen ya no está dentro de tu sitio, está en las menciones externas |
| 70 a 89 | Tienes lo esencial resuelto, con huecos | Revisa los chequeos de más peso que no pasaste; suelen ser dos o tres arreglos concretos |
| 45 a 69 | Los motores llegan, pero les cuesta entenderte | Parte por el bloque de entidad. Es donde está el 40 % del puntaje |
| Menos de 45 | Hoy la IA tiene poco con qué trabajar | Revisa primero si hay un bloqueo de acceso. Suele ser una sola línea en el `robots.txt` |

## Por dónde partir si no pasas varios

El orden no es por dificultad, es por peso y por dependencia:

1. **Desbloquea el acceso.** Si algún bot está bloqueado, nada de lo que hagas después se va a notar. Es un cambio de una línea.
2. **Declara tu entidad completa.** El nodo de organización con dirección, contacto y `sameAs` vale 25 puntos entre los cuatro chequeos, y es la base sobre la que se apoya todo lo demás.
3. **Marca tus preguntas frecuentes y escribe títulos que sean preguntas.** Once puntos entre los dos, y es el trabajo que convierte contenido existente en contenido citable, sin escribir nada nuevo.
4. **Cierra la higiene.** Fecha, canónica, idioma, sitemap, `llms.txt`. Ninguno es difícil y juntos suman más de lo que parecen.

Casi nada de esto exige rehacer el sitio. La mayoría son cambios en el `<head>`, en un bloque de JSON-LD y en un archivo de texto en la raíz. Si quieres ver cómo encaja esto en un trabajo completo, está en [nuestro método](/metodo/) y en la [auditoría SEO técnica](/servicios/auditoria-seo-tecnica/).

## Lo que este chequeo no mide

Lo decimos en la página del chequeo y lo repetimos acá, porque es la parte que más se malinterpreta.

**No mide si hoy te citan.** Eso depende de que te mencionen en fuentes que los motores leen, y no se puede saber leyendo tu sitio. Hay que preguntarle a los motores directamente, con las mismas preguntas todos los meses, y registrar qué fuentes citan en cada respuesta.

**No mide calidad de contenido.** Un chequeo automático ve que tienes 800 palabras en la portada. No ve si esas 800 palabras responden algo que a alguien le importe.

**No mide autoridad real.** Declarar un `Person` con credenciales en el schema es una afirmación tuya. Que esa persona sea reconocida en su campo es otra cosa, y se construye fuera de tu sitio.

Nadie puede garantizarte que vas a aparecer primero en ChatGPT, y quien te lo garantice te está vendiendo algo que no controla. Lo que sí se puede hacer es quitar todas las razones técnicas por las que hoy no apareces. Eso es lo que miden estos 21 chequeos.

## Preguntas frecuentes

**¿Qué es un chequeo de visibilidad en IA?**
Es una revisión automática del código público de tu sitio que verifica si los motores de IA pueden acceder a él, entender qué es tu negocio y extraer fragmentos citables. El nuestro mide 21 señales agrupadas en tres bloques: acceso, entidad y citabilidad.

**¿Cuánto puntaje necesito para estar bien?**
Sobre 90 significa que la parte técnica está resuelta y lo que falta ya no está dentro de tu sitio. Entre 70 y 89 quedan huecos concretos, normalmente dos o tres. Bajo 45 conviene revisar primero si hay un bloqueo de acceso en el `robots.txt`.

**¿Bloquear a GPTBot protege mi contenido?**
Evita que ese bot lo rastree, y también evita que ChatGPT te cite. Si tu negocio depende de que te encuentren, bloquearlo te saca de las respuestas donde podrías aparecer. Es una decisión legítima para un medio que vende suscripciones, y casi nunca lo es para una empresa de servicios.

**¿Sirve tener llms.txt si ya tengo sitemap.xml?**
Hacen cosas distintas. El sitemap lista todas tus URLs para que un rastreador no se pierda ninguna. El `llms.txt` explica en texto plano qué eres y cuáles de esas páginas importan. Uno es un inventario, el otro es una guía de lectura.

**¿Por qué declarar la entidad pesa más que tener un solo H1?**
Porque son problemas de distinto tamaño. Sin un nodo de entidad, un motor tiene que deducir qué eres a partir del texto suelto y prefiere citar a quien se lo dijo explícito. Un H1 de más es un detalle de orden que casi nunca cambia si te citan o no. Por eso valen 8 y 2 puntos.

**¿Un puntaje alto significa que ChatGPT me va a recomendar?**
No. El chequeo mide si tu sitio está preparado, no si hoy te citan. Los motores arman sus respuestas con fuentes de terceros, no solo con tu sitio. Puedes estar impecable por dentro y aun así no aparecer, y qué fuentes te faltan es justo lo que revisa el diagnóstico completo.

---

## Notas para Diego (no publicar)

**URL sugerida:** `/blog/21-chequeos-visibilidad-ia/`

**Meta title (≤65):** Los 21 chequeos de visibilidad en IA, explicados | SpindleLab
**Meta description (50-165):** Qué mide cada uno de los 21 chequeos de visibilidad en IA, cuánto pesa en el puntaje y cómo se arregla si no lo pasas. Con la metodología completa.

**Schema:** `@graph` con `Article` + `BreadcrumbList` + `FAQPage`, autor
`{"@id":"https://spindlelab.cl/#autor-ramon"}`, `inLanguage: "es-CL"`. Las seis preguntas de la
sección "Preguntas frecuentes" van al `FAQPage` **textuales**: este artículo predica marcar las FAQ,
así que publicarlo sin `FAQPage` sería el peor error posible.

**Enlaces internos ya puestos en el cuerpo:** `/diagnostico/`, `/metodo/`,
`/servicios/auditoria-seo-tecnica/`. Verificar que resuelvan.

**Tres cosas que actualizar al publicar** (checklist de la ficha): el archivo, la tarjeta en
`blog/index.html` y la línea en `sitemap.xml`. Sumar también `llms.txt`.

**Deuda técnica que va con este publish** (línea editorial v2): agregar `FAQPage` a
`spindlelab-astro/public/blog/seo-tecnico-fintechs-chile/index.html`, el único de los seis posts
publicados que no lo tiene.

**Aviso de mantenimiento:** los pesos y los nombres de los 21 chequeos de la tabla salen de
`spindlelab-astro/functions/api/chequeo.js`. Si el chequeo cambia, este artículo queda desfasado y
hay que corregirlo el mismo día, porque el artículo dice explícitamente que la metodología es
pública y verificable.

## Verificación de Renata

- Título-promesa concreta, respuesta directa en el primer párrafo (formato AEO, línea v2 §5). ✅
- **La tabla de 21 filas es el esqueleto**, no adorno: el artículo se construye alrededor de ella
  (línea v2, principio 1). ✅
- Cada chequeo, peso e instrucción de arreglo verificado contra `chequeo.js`. Los bloques suman
  30 + 40 + 30 = 100. ✅
- Cero cifras sin fuente. Los únicos números del artículo son pesos, umbrales y tramos que están
  en el código o en la página pública. ✅
- Sin el 0/15 propio, sin `/indice/`, sin "Índice de Citabilidad", sin competidores. ✅
- Sin lo saturado: no aparece "el SEO ha muerto", "era zero-click", "share of model" ni "IA que
  trabaja por ti". ✅
- Sin em-dash de muletilla, sin relleno de transición. ✅
- es-CL, voz plural (es contenido de negocio, no observacional). ✅

**Qué falta para estar listo:** edición de Ramón en el Pase 1+2 y montaje de Diego con el `FAQPage`.
