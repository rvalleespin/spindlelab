# Encargo · Google-Extended en el chequeo y en los artículos, y la corrección del estudio de Marco

**Fecha:** 14-oct-2026
**De:** el estudio web, al cerrar el frente E8 (el pase de voz del v3). Lo encontraron Simón y el
crítico de voz en la revisión del paso 5, y Clara al verificar el encargo de la oferta. Lo escribe
Mauro.
**Para:** la troncal (Tomás) y la sesión de Marco (inteligencia de mercado).
**Decide:** Ramón. Las dos partes cambian algo que ya está publicado o que alguien puede citar.
**Rama donde se midió:** `claude/magical-franklin-ckfki2`, en `ad7fea5`. Las rutas con `public/` y
`functions/` son las mismas que en `main` (E8 no las tocó).
**Fuera de E8.** Nada de esto entró al pase de voz, salvo lo que dice el §3.

---

## 0 · En dos líneas

1. **(a)** La casa trata a Google-Extended como un robot de entrenamiento puro, y la documentación
   de Google dice que también controla el grounding de Gemini Apps. Lo dice el chequeo, que con eso
   puntúa y explica, el artículo de los 21 chequeos y la regla del 8-sep. «Cómo aparecer en ChatGPT»
   tiene el error contrario.
2. **(b)** El estudio de Marco y su encargo de la oferta dicen que el 36 → 100 de spindlelab.cl se
   midió con el instrumento del hero. Se midió con el chequeo de la Ley 21.719 de Verifica y Cumple.
   Además, el addendum del estudio trae cruzados los precios de las dos auditorías.

---

## 1 · (a) Google-Extended

### Lo que dice Google

Fuente: `https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers`
(«Last updated 2026-07-14 UTC»). La leyeron Simón y el crítico el 14-oct, y la volví a leer el
mismo día a las 20:11 UTC. Texto original, en la sección de Google-Extended:

> «Google-Extended is a standalone product token that web publishers can use to manage whether
> content Google crawls from their sites may be used for training future generations of Gemini
> models that power Gemini Apps and Vertex AI API for Gemini and for grounding (providing content
> from the Google Search index to the model at prompt time to improve factuality and relevancy) in
> Gemini Apps and Grounding with Google Search on Vertex AI. Google-Extended does not impact a
> site's inclusion in Google Search nor is it used as a ranking signal in Google Search.»

En simple: bloquear Google-Extended no te saca de Google, pero sí decide si Gemini puede usar tu
sitio **para responder en el momento**. No es solo entrenamiento de modelos futuros.

### Dónde la casa dice que es solo entrenamiento

| Lugar | Qué dice hoy |
|---|---|
| `spindlelab-astro/functions/api/chequeo.js:864-869` | Comentario «v2 (8-sep-2026)»: los de entrenamiento «deciden si los modelos futuros te conocen; bloquearlos NO borra citas hoy», y `botsEntrenamiento = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot']` |
| `chequeo.js:993-1002` | El ítem `bots-entrenamiento` («Robots de entrenamiento: decisión consciente», peso 2). Si los bloqueas: «Esto NO te quita citas hoy». Si no: «GPTBot, ClaudeBot, Google-Extended y CCBot pueden recoger tu texto para modelos futuros» (:998) |
| Artículo «21 chequeos», producción: `spindlelab-astro/public/blog/21-chequeos-visibilidad-ia/index.html:265` (tabla) y `:269` (párrafo) | La fila del ítem: «recogen texto para modelos futuros; no afecta tus citas de hoy». El párrafo: «Bloquearlos no te quita ni una cita hoy» |
| El mismo artículo en el v3: `spindlelab-astro/src/data/blog-v3/21-chequeos-visibilidad-ia.html:30` y `:34` | Lo mismo, verbatim. En E8 era zona cerrada |
| La regla del 8-sep: `marketing/oficina/clientes/spindlelab.md:289` | «**Entrenamiento** (modelos futuros): GPTBot, ClaudeBot, Google-Extended, CCBot. Bloquearlos NO borra citas hoy; es decisión legítima de PI.» |

**También lo dicen, y entran en el mismo arreglo:**
- el Diagnóstico de producción, `spindlelab-astro/public/diagnostico/index.html:133` (la respuesta
  del FAQPage, «porque no afecta las citas de hoy») y `:295` (la metodología visible, «bloquear a
  los segundos no te quita ni una cita»);
- el comentario de `spindlelab-astro/src/pages/v3/diagnostico.astro:108-110` («Gemini no:
  Google-Extended cuenta como robot de entrenamiento»);
- `spindlelab-astro/public/llms.txt:11`, que pone a Google-Extended en el bloque de acceso. Ese
  archivo ya se reescribe en P11 de `lista-publicacion.md`.

### El error contrario

| Lugar | Qué dice | Por qué está mal |
|---|---|---|
| «Cómo aparecer en ChatGPT», producción: `spindlelab-astro/public/blog/como-aparecer-en-chatgpt/index.html:193`; en el v3: `src/data/blog-v3/como-aparecer-en-chatgpt.html:36` | «sitios que bloquean `GPTBot`, `Google-Extended` o `PerplexityBot` en su `robots.txt` […] Si tu negocio depende de ser encontrado, esos bots son tus nuevos vendedores» | En un artículo sobre ChatGPT, pone a GPTBot, que solo recoge texto para entrenar (OpenAI), como el robot que te hace encontrable. El que decide si ChatGPT te encuentra al responder es OAI-SearchBot, junto con ChatGPT-User. Google-Extended sí cuenta, pero para Gemini, no para ChatGPT |
| Visibilidad en IA, producción: `spindlelab-astro/public/servicios/visibilidad-en-ia/index.html:136` (FAQPage) | «bloquear GPTBot o Google-Extended te saca de las respuestas» | GPTBot no te saca de ninguna respuesta de hoy. En el v3 ya está corregida (§3) |

### Qué se propone

Simón define la categoría y el peso, y Diego lo ejecuta.

1. **El chequeo primero.** Google-Extended sale de `botsEntrenamiento`. Va en un ítem propio, o
   junto a los de búsqueda con una lectura como «Gemini puede usar tu sitio para responder».
   - **Mueve puntajes.** Hoy pesa 2, dentro de un ítem que solo pide que el bloqueo sea «una
     decisión». Un sitio que lo bloquea pasaría a perder puntos en un ítem de acceso.
   - Hay que anotar el cambio de versión, porque el compromiso de los 3 meses del v3 promete más
     puntos «contando las mismas señales». El informe de partida de cada cliente guarda la fecha y
     la lista de señales (`e8/copy-secciones.md`, anexo D, punto 2).
2. **Después, en el mismo PR, lo que describe al chequeo:** la tabla y el párrafo del artículo de
   los 21 chequeos, la metodología y el FAQPage del Diagnóstico de producción, y el comentario de
   `diagnostico.astro`. Así ninguna página describe un instrumento distinto del que corre.
3. **La regla del 8-sep** (`spindlelab.md:289`): Google-Extended sale de «Entrenamiento». Lo
   escribe la troncal, porque es la ficha que leen Valen, Emilia y las demás piezas.
4. **«Cómo aparecer en ChatGPT»:** los robots que te hacen encontrable en ChatGPT son
   OAI-SearchBot y ChatGPT-User, y GPTBot es otra decisión. Es texto publicado de Ramón, así que
   la redacción la propone Clara o Renata y la aprueba él.
5. **Cuando el chequeo cambie,** la FAQ de robots de Visibilidad en el v3 (fila #1291 de E8) puede
   volver a nombrar a Google-Extended, y la metodología del Diagnóstico del v3 (#623) puede decirlo
   sin acotar.

**Dónde se hace.** `functions/` y `public/` están dentro de `spindlelab-astro/`. Si se hace en la
rama de la obra v3, la lista de publicación obliga a volver a ensayar el corte (G7: la rama
cambiaría el sitio más allá de P0.2 y P0.3). Conviene una rama aparte contra `main`, antes o
después del corte. Además, `functions/api/chequeo.js` es el que sirve spindlelab.cl hoy, así que
el cambio llega a producción apenas se mergea.

**No hay riesgo hoy en el sitio propio:** `spindlelab-astro/public/robots.txt` deja entrar a
Google-Extended (`Allow: /`).

---

## 2 · (b) El estudio de Marco y el encargo de la oferta

Documentos: `marketing/inteligencia-mercado/2026-10-estudio-categoria-llena-y-sitio-nuevo.md` (el
estudio) y `marketing/encargos-otras-sesiones/encargo-estudio-web-oferta-resultado-plazo-condicion.md`
(el encargo).

### El 36 → 100 no es del instrumento del hero

**Lo que dicen:**
- el estudio, M1 (:148): «36/100 el 10-sep → 100/100 hoy […] Es un antes/después reproducible por
  cualquiera, con el instrumento propio»;
- el addendum del estudio, punto 1 (:199-203): «con la vara declarada y el visitante pudiendo
  correrla en el mismo hero»;
- el encargo, §4 (:129-133): «con el mismo instrumento que está en el hero».

**Lo que es:**
- Los dos 100 salen de `verifica.spindlelab.cl/api/chequeo`, el chequeo de la Ley 21.719 de
  Verifica y Cumple (política, seguridad y consentimiento). El estudio mismo nombra esa URL en M1.
- El instrumento del hero es el chequeo de visibilidad en IA, `spindlelab.cl/api/chequeo`
  (`functions/api/chequeo.js`, 21 señales). A spindlelab.cl le da **85**, no 100.
- Medido el 14-oct, dos veces: a las 12:12 y 12:17 UTC (Clara, al revisar el encargo) y a las
  20:11 UTC (yo, para este encargo). Las dos veces, 100 en el de la ley y 85 en el de IA. En el de
  la ley, el 100 sale de 14 de 20 puntos comprobables. Cualquiera lo repite:
  ```
  curl 'https://verifica.spindlelab.cl/api/chequeo?dominio=spindlelab.cl'   # puntaje 100
  curl 'https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl'            # puntaje 85
  ```
- **La fecha del 36 es el 9-sep, no el 10-sep.** Lo dice el caso de Verifica y Cumple,
  `ventas/casos-de-exito/verifica-y-cumple.md` en el commit `1a0ae0a` (ramas
  `claude/pruebas-23sep` y `laboratorio/ideas`, entre otras), :33 y :147: «Cifras reales y
  verificadas: 36 (9-sep) y 73 (21-sep)». El 10-sep no tiene fuente.
- **Falta el 73.** El 36 y el 73 se midieron con la misma vara, y el 73 ya es público (LinkedIn,
  21-sep). El 100 del 14-oct es con otra forma de puntuar. Y lo que no se ve desde
  afuera, como si el aviso de cookies frena de verdad a los rastreadores, hoy no suma ni resta. El
  36 era sobre todo eso. Por eso «36 → 100», dicho solo, sugiere que el instrumento comprobó el
  arreglo del consentimiento, y no lo comprobó (Simón).

**Cómo quedó en el sitio** (Ramón, 14-oct; ya aplicado en el v3, sin publicar): en Trabajo, en la
ficha de Verifica y Cumple, con el chequeo de la ley y la forma de puntuar dicha. No va en la home,
ni al lado del chequeo de IA, ni en el JSON-LD:

> El primer sitio que revisó fue el nuestro. spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026
> y, con lo que encontró ya arreglado, 73 el 21 de septiembre. El 14 de octubre, ya con otra forma de
> puntuar, sacó 100. Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los
> rastreadores, hoy no suma ni resta.

**La corrección que se pide** (sesión de Marco, en sus dos documentos):
- en M1, en el punto 1 del addendum y en el §4 del encargo, nombrar el instrumento: el chequeo de la
  Ley 21.719 de Verifica y Cumple, no el del hero;
- 10-sep → 9-sep, sumar el 73 del 21-sep y decir que el 100 es con otra forma de puntuar;
- revisar si la recomendación sigue en pie: el estudio pide «un número reproducible» con el
  instrumento del hero, y ese número hoy es 85, sin un antes con fecha. Lo decide Marco con Ramón.
  Este encargo no lo resuelve.

### El addendum cruza dos precios

- **Dice** (:179): «Auditoría SEO $400.000 · Visibilidad en IA $490.000 ($690.000 combinada)».
- **Es al revés.** La Auditoría SEO técnica (Completa) es desde $490.000 y la Auditoría de
  Visibilidad, desde $400.000. La combinada es $690.000. Fuentes: `servicios-v3.json` (los planes de
  `auditoria-seo-tecnica` y de `visibilidad-en-ia`) y `oferta-v3.json`. El cuerpo del estudio
  (:103) y el encargo los traen bien.
- **Por eso el punto 2 del addendum** (:204), «La auditoría a $400.000 sigue siendo el techo del
  rango de entrada», se lee como si fuera la Auditoría SEO. Es la de Visibilidad: hay que nombrarla.

### La premisa del §2 del encargo

El §2 del encargo pedía cambiar Gemini por Claude en `oferta-v3.json` y en `v3-chequeo.js`, porque
«Google-Extended es de entrenamiento». **No se aplicó:** Simón lo vetó con la documentación de
Google (§1). La meta de la home, que `a70e945` había pasado a Claude con la misma razón, volvió a
Gemini en E8 (fila 50). El encargo necesita una nota arriba que diga qué entró y qué no, para que
nadie lo vuelva a aplicar. El detalle está en `obras-web/spindlelab-v3/e8/copy-secciones.md`,
sección «El encargo de la oferta (14-oct)».

---

## 3 · Lo que E8 ya hizo (en el v3, sin publicar) y lo que no tocó

**Hizo:**
- acotó la metodología del Diagnóstico (#623) a ChatGPT, Claude y Perplexity: «bloquear a los
  segundos no te quita ahí ni una cita». Ahora es cierto, porque «ahí» son esos tres;
- corrigió la FAQ de robots de Visibilidad (#1291): nombra solo a GPTBot como robot de
  entrenamiento y no a Google-Extended;
- dejó a Gemini en la tarjeta de Visibilidad (#13 y #782) y en la meta de la home (#50);
- puso la prueba en Trabajo, con el instrumento correcto.

**No tocó** (era zona cerrada en E8): `functions/api/chequeo.js`, los cuerpos de los artículos
(`src/data/blog-v3/`), la regla del 8-sep y los HTML de producción en `public/`.

---

## 4 · Quién hace qué

| Qué | Quién | Decide |
|---|---|---|
| La nueva categoría de Google-Extended y su peso | Simón | Ramón (mueve puntajes en producción) |
| `chequeo.js`, el Diagnóstico de producción y el comentario del v3 | Diego, en una rama aparte | Ramón (merge a `main`) |
| La tabla y el párrafo del artículo de los 21 chequeos, y «Cómo aparecer en ChatGPT» | Clara o Renata redactan, Simón revisa | Ramón (texto publicado) |
| La regla del 8-sep en `spindlelab.md:289` | La troncal | Ramón |
| El estudio y el encargo de la oferta | La sesión de Marco | Ramón |

**Cómo se comprueba:**
- El chequeo, corrido sobre spindlelab.cl y sobre un sitio que bloquee Google-Extended, antes y
  después, con los dos puntajes anotados.
- `grep -rn "Google-Extended" spindlelab-astro/functions spindlelab-astro/public spindlelab-astro/src marketing/oficina/clientes/spindlelab.md`:
  cada mención calza con la categoría nueva.
- En el estudio y en el encargo, ninguna línea dice «hero» junto al 36 o al 100, ninguna dice
  «10-sep», y los precios calzan con `servicios-v3.json`.

---

## 5 · Fuera de este encargo, para la misma troncal

**El mini-diagnóstico tiene que preguntarles de verdad a los motores.** Ramón confirmó el 14-oct
que el mini-diagnóstico les pregunta a ChatGPT, Gemini y Perplexity, y el v3 lo dice en Diagnóstico
(guía, paso 02 y FAQ) y en el resultado del chequeo. Pero la skill (`.claude/skills/mini-diagnostico/SKILL.md:27-29`)
permite escribir esa parte «en términos de riesgo general», y los tres mini-diagnósticos archivados
(`marketing/diagnosticos/SPL-DIAG-2026-001`, `-002` y `-006`) no traen ninguna respuesta real de un
motor. Para que el sitio diga la verdad, la skill tiene que obligar a correr las preguntas. Lo anotó
Clara en `e8/copy-secciones.md`, anexo D, punto 4.
