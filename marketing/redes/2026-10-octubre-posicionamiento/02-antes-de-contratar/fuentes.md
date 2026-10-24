# Fuentes · Carrusel «Antes de contratar» (pieza 2) · v2, 23-oct-2026

Cada afirmación de las 14 láminas y de los pies de foto, con el archivo del repo que la respalda. Lo que no tiene respaldo se quitó de la pieza; acá no queda ninguna afirmación sin fuente.

**Rutas relativas a la raíz del repo.** `web/` = `spindlelab-astro/public/` (el sitio nuevo, **estado del árbol de trabajo del 23-oct, con cambios sin commitear**: se re-lee el día de publicar). `copy` = `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` (v1.2). `chequeo.js` = `spindlelab-astro/functions/api/chequeo.js`.

**Dónde está cada lámina.** Completa: 1 portada, 2 cuánto cuesta, 3 cómo trabajamos, 4 qué mira el chequeo, 5 el límite del puntaje, 6 cierre. **2A:** portada propia, y las láminas 4, 5 y un cierre sin la oferta de revisión (`2a-lamina-1` a `-4`). **2B:** portada propia, las láminas 2 y 3 de la completa, y un cierre con la revisión (`2b-lamina-1` a `-4`).

**Estados.**
- **Verificado:** comprobado el 23-oct contra el archivo y contra el sitio vivo o la API.
- **Verificado en el sitio nuevo:** está en `web/`, pero el sitio vivo todavía dice otra cosa (comprobado con `curl` el 23-oct: `/metodo/` no trae los cuatro pasos y `/contacto/` dice «diagnóstico gratis»). Se re-verifica el día de publicar.
- **Declarado:** lo dice el sitio y el repo no prueba que se haya ejercido en todos los casos. Se publica porque es lo que el sitio promete.
- **Razón declarada:** opinión ya publicada, no un dato medible.

**Vocabulario.** En el sitio, «medir» es el protocolo con el que se le pregunta a los motores si te nombran (`web/diagnostico/index.html`, bloque «Y cómo medimos si la IA te nombra»; `copy` §9: «Es el protocolo que usamos para medir»). El chequeo de 21 señales, en cambio, «lee tu sitio» y la sección se llama «Qué revisamos». Por eso la pieza no dice «cómo medimos» para hablar del chequeo: dice «qué mira el chequeo». El único «medimos» es el del paso 04 del método, con el sentido que le da el sitio. El verbo «mide» no aparece en ninguna lámina: la del límite habla de «puntaje».

---

## Lámina 1 · Portada (completa) y portada de la 2B

| Afirmación | Archivo | Estado |
|---|---|---|
| Se puede leer cuánto cuesta (precios de partida publicados) | `web/servicios/index.html` («Lo que hacemos, con el precio de partida a la vista»; FAQ «¿Publican precios? Sí, el precio de partida de cada solución…»); `copy` §2.6 «Precios publicados» | Verificado en el sitio nuevo; los seis precios ya están en el sitio vivo (`curl`, 23-oct) |
| Se puede leer cómo trabajamos | `web/metodo/index.html`; `copy` §2.6 «Método escrito», §6 | Verificado en el sitio nuevo |
| Se puede leer qué mira nuestro chequeo (solo completa) | `web/diagnostico/index.html` («Qué revisamos», «Los 21 chequeos, publicados»); `chequeo.js`; `copy` §2.6 «Chequeo abierto» | Verificado (también en el sitio vivo: `curl`, 23-oct) |
| «Antes de hablar con nadie»: los precios y el método se leen sin escribirnos, y el chequeo corre sin registro ni correo | `web/diagnostico/index.html` («Gratis y sin dejar tu correo»; FAQ «no pedimos tu correo»); la API responde con solo el dominio | Verificado |
| «Precios, método y chequeo, en ese orden» (el orden de las láminas 2, 3 y 4) | Estas láminas | Es la estructura de la pieza |

## Lámina 2 · Cuánto cuesta (completa y 2B)

La lámina **no lleva ninguna cifra**. Ya no lleva la cartera de seis precios (regla del 31-ago, reencuadrada por Ramón el 1-sep: `marketing/rebranding-2026-08-brief-comunicacion.md`, addendum 31-ago y addendum 1-sep: lo vetado es la cartera completa; «UN “desde” como umbral de entrada SÍ puede ir en pieza… el copy que la acompaña porta “+ IVA / el detalle en el sitio”»), y desde la corrección del 23-oct (noche) tampoco lleva un «desde» suelto. **Por qué se sacó:** la versión anterior mostraba «desde $490.000» de la auditoría SEO técnica rotulado «Un ejemplo». La regla deja pasar un «desde» **como umbral de entrada**, y $490.000 no lo es (ver «Para decidir si vuelve un “desde”», abajo); además la decisión C de PLAN §0 sigue sin respuesta de Ramón. Lo que dice ahora es solo que cada solución publica su precio de partida, el nombre de las seis y que el detalle está en `/servicios/`.

| Afirmación | Archivo | Estado |
|---|---|---|
| «Cada solución publica su precio de partida» | `web/servicios/index.html`, FAQ «¿Publican precios? Sí, el precio de partida de cada solución, con lo que incluye. Siempre más IVA. El valor final se cierra por escrito.»; `copy` §2.5 intro («Cada solución tiene su página, con lo que incluye y su precio de partida (más IVA)») | Verificado en el sitio nuevo; las seis páginas de servicio traen su precio en el sitio vivo (`curl`, 23-oct) |
| Las seis soluciones, por nombre: Auditoría SEO técnica, Visibilidad en IA, Google Ads, Gestión de redes, Sitio web a medida, Acompañamiento mensual | `web/servicios/index.html`: seis soluciones en cuatro grupos (Búsqueda y visibilidad en IA: Auditoría SEO técnica y Visibilidad en IA; Anuncios en Google y redes: Paid media (Google) y Gestión de redes; Sitio web a medida, con la tarjeta «Desarrollo web»; Acompañamiento mensual). «Google Ads» es el nombre corriente de la tarjeta «Paid media (Google)» (la página de esa solución y el FAQ de la home lo usan: «Google Ads desde $350.000 al mes», `copy` §2.8); «Sitio web a medida» es el título del grupo de la tarjeta «Desarrollo web» (`copy` §2.5). Cada una tiene su página: `web/servicios/{auditoria-seo-tecnica,visibilidad-en-ia,paid-media,redes-sociales,desarrollo-web,acompanamiento-mensual}/index.html` | Verificado en el sitio nuevo. **No se publica ningún precio en la imagen** |
| «Lo que incluye cada una está en su página» | `web/servicios/index.html` («Lo que hacemos, con el precio de partida a la vista»); cada página de servicio trae lo que incluye; `copy` §2.5 («con lo que incluye y su precio de partida») | Verificado en el sitio nuevo |
| «Los precios son más IVA» | Las páginas de servicio: «Los precios no incluyen IVA (19%)», «+ IVA» | Verificado |
| «El valor final se cierra por escrito» | `web/servicios/auditoria-seo-tecnica/index.html` («El valor final se cierra por escrito tras la revisión gratis»); `web/servicios/index.html` FAQ | Verificado en el sitio nuevo. La frase de la lámina no nombra la revisión, así que también se cumple en el sitio vivo («se cierra tras el mini-diagnóstico gratuito») |

**Para decidir si vuelve un «desde» (decisión C, de Ramón).** Datos para elegir, todos de las páginas de servicio del 23-oct: Google Ads desde $350.000 al mes, con la pauta aparte; sitio web desde $390.000 por proyecto; gestión de redes desde $390.000 al mes; auditoría de visibilidad en IA desde $400.000; auditoría SEO técnica desde $490.000 («una vez»); acompañamiento mensual desde $590.000 al mes. El umbral de entrada mezcla dos unidades (al mes y por proyecto), así que un único «desde» obliga a elegir cuál mostrar. Sin OK explícito de Ramón no se agrega ninguno.

Se dejaron fuera a propósito: cualquier precio de las seis, la fecha «octubre de 2026» (ya no hay cifras que fechar), «mínimo 3 meses» de Google Ads (lo dice solo `web/servicios/paid-media/index.html`; ningún documento comercial lo respalda, sigue pendiente de Ramón) y lo que incluye la auditoría SEO técnica, que acompañaba al ejemplo y se fue con él.

## Lámina 3 · Cómo trabajamos (completa y 2B)

Todo sale de `web/metodo/index.html` (sitio nuevo) y `copy` §2.4 y §6.

| Afirmación | Archivo | Estado |
|---|---|---|
| Cuatro pasos: Revisión gratis, Conversación y propuesta, Implementación por fases, Acompañamiento mensual | `web/metodo/index.html`; título y meta description de `/metodo/` (`copy` §6) | Verificado en el sitio nuevo |
| 01: nos pasas la dirección de tu sitio y te devolvemos una página con lo más importante que encontramos | `web/metodo/index.html` paso 01 («Todo parte con la dirección de tu sitio… Te devolvemos una página con los hallazgos y por dónde partiríamos»); `web/contacto/index.html` («una página con lo más importante que encontramos») | Verificado en el sitio nuevo |
| 02: 20 minutos por videollamada; si hay trabajo, recibes por escrito qué hacemos, en qué fases y cuánto cuesta | `web/metodo/index.html` paso 02; `copy` §2.4 | Verificado en el sitio nuevo |
| 03: hacemos lo acordado, o entregamos las especificaciones para que lo implemente tu equipo | `web/metodo/index.html` paso 03. `copy` §11: la implementación sobre un sitio ajeno está declarada y nunca ejercida; entregar especificaciones sí es posible | **Declarado** |
| 04: si quieres seguir, volvemos a medir con el mismo criterio | `web/metodo/index.html` paso 04 («medimos cada mes con el mismo criterio»). **La lámina quita «cada mes» a propósito:** la cadencia es la decisión 8 de `copy` §12 (mensual en el copy nuevo, «medición quincenal» en la página viva del acompañamiento) y PLAN §6 la lista en «Lo que NO se puede publicar todavía». El título del paso, «Acompañamiento mensual», es el nombre de la solución, no una cadencia de medición | **Declarado** (cero clientes de acompañamiento de pago, `copy` §2.5 y PLAN §6), **sin cadencia** |
| «El primero es gratis» | `web/metodo/index.html` paso 01 «Revisión gratis»; `web/contacto/index.html` FAQ «¿La revisión es gratis? Sí. Es nuestra primera entrega y no te cobramos por ella» | Verificado en el sitio nuevo |
| **«En un sitio web, cada fase termina con algo que apruebas antes de seguir»** | `web/servicios/desarrollo-web/index.html` («Cinco fases, aprobación en cada una», con «Brief creativo aprobado» y «Diseño aprobado» como entregables); `.claude/skills/cotizaciones/SKILL.md` línea 124 («Nada avanza a la fase siguiente sin tu aprobación»); `copy` §11 («Probado en Desarrollo Web; no probado en otros servicios»). **La lámina lo acota a un sitio web** con el rótulo «En un sitio web»; el método del sitio lo dice sin acotar, y por eso la lámina dice menos que el sitio y no más | **Declarado, probado en un servicio** |

**No se afirma:** ningún plazo, y tampoco cada cuánto se mide. El método habla de «plazos» dentro de la propuesta, pero la lámina no promete cuánto tarda nada.

## Lámina 4 (completa) y 2 de la 2A · Qué mira el chequeo

Comprobado el 23-oct-2026 con `curl "https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl"`: 21 señales; `acceso` 5 señales y 30 puntos, `entidad` 8 y 40, `citabilidad` 8 y 30. La página `/diagnostico/` del sitio vivo y la del sitio nuevo publican el mismo reparto.

| Afirmación | Archivo / comando | Estado |
|---|---|---|
| 21 señales | `chequeo.js` (21 llamadas a `add(...)`); API del 23-oct: 21 | Verificado |
| ¿Te pueden leer? 30 puntos · ¿Te entienden? 40 · ¿Te pueden citar? 30 | `web/diagnostico/index.html` («¿Te pueden leer? · 30 puntos»…); API: 30, 40, 30 | Verificado |
| ¿Te pueden leer?: «si los robots de IA que buscan en vivo pueden entrar» | `web/diagnostico/index.html`, bloque «¿Te pueden leer?»: «unos buscan en vivo cuando alguien pregunta… Bloquear a los primeros te borra de las respuestas de hoy; bloquear a los segundos no te quita ni una cita»; señales `bots-indices` y `bots-asistentes` en `chequeo.js`. **No copia** el subtítulo de `chequeo.js` («Si los bots de IA no entran, nada más importa»), que no distingue a los robots que entrenan de los que buscan en vivo | Verificado en la página |
| ¿Te entienden?: «si tu sitio dice qué eres, a qué te dedicas y dónde operas» | `chequeo.js`, `bloques[1].sub` («Qué eres, a qué te dedicas y dónde operas.»); señales `entidad`, `entidad-completa`, `title` | Verificado |
| ¿Te pueden citar?: «preguntas frecuentes, fechas y texto suficiente en la portada» | `web/diagnostico/index.html` («preguntas frecuentes marcadas con FAQPage… fechas en el schema y cantidad de texto visible en tu portada»); señales `faq` («Tienes preguntas frecuentes marcadas»), `fecha` («Tu contenido tiene fecha») y `sustancia` («Tu portada tiene contenido suficiente») en `chequeo.js`. Es una muestra de las ocho señales del bloque, no la lista completa | Verificado |
| «Escribes tu dominio. Es gratis y no pedimos tu correo» (en la 2A: «Es gratis y no pedimos tu correo») | `web/diagnostico/index.html` («Gratis y sin dejar tu correo»; FAQ «Sí, y no pedimos tu correo. Escribes el dominio y ves el resultado completo en pantalla») | Verificado (sitio vivo y nuevo) |

**No se afirma:** ningún puntaje de spindlelab.cl ni de otro sitio, ninguna cifra agregada de sitios revisados.

## Lámina 5 (completa) y 3 de la 2A · El límite del puntaje

El límite se dice **una sola vez por versión**, en el titular. El rótulo («Para leer el puntaje») no lo anticipa y el apoyo da la razón, no lo repite.

| Afirmación | Texto de la página | Estado |
|---|---|---|
| «El puntaje no dice si hoy te citan» | FAQ «¿Qué mide exactamente el puntaje?»: «No mide si hoy te citan» | Verificado (sitio vivo y nuevo) |
| «Ni garantiza que te recomienden» | FAQ «¿Un puntaje alto significa que ChatGPT me va a recomendar? No. Este chequeo mide si tu sitio está preparado, no si hoy te citan…» | Verificado (sitio vivo y nuevo) |
| «Los motores arman sus respuestas con fuentes de terceros, como rankings, directorios y artículos, no solo con tu sitio» | Misma FAQ: «Los motores arman sus respuestas con fuentes de terceros (rankings, directorios, artículos), no solo con tu sitio». **La lámina trae ahora la frase completa.** La versión anterior cortaba «no solo con tu sitio», y sin esa cláusula la frase se lee como que los motores usan fuentes de terceros *en vez de* tu sitio. Es una afirmación nuestra, la misma que hace el sitio, y no está atribuida a ningún motor; por eso no dice «todos» ni nombra a ninguno | Verificado (sitio vivo y nuevo, releído el 23-oct, noche, con `curl` y en el archivo) |

**Se dejó fuera a propósito:** «Eso lo hacemos a mano» (la consulta real a los motores es hoy un paso manual de Ramón y no una parte fija de la revisión: `copy` §12, decisión 7), «Puedes estar impecable por dentro y aun así no aparecer» y «hay que preguntarle a los motores». Dicen el mismo límite o prometen algo que no es fijo. Siguen publicados en `/diagnostico/`.

## Lámina 6 · Cierre (completa)

| Afirmación | Archivo | Estado |
|---|---|---|
| El chequeo se corre sobre tu sitio en `spindlelab.cl/diagnostico` | `web/diagnostico/index.html`; la ruta responde 200 con el UTM (23-oct) | Verificado |
| «Si prefieres que lo veamos nosotros, pide la revisión de una página, también gratis», en `spindlelab.cl/contacto` | `web/contacto/index.html` (H1, formulario, FAQ «¿La revisión es gratis? Sí»); `web/diagnostico/index.html` («También lo revisamos nosotros, a mano»); `copy` §2.1 | Verificado en el sitio nuevo. **Depende de que Ramón reconfirme la oferta** (PLAN §2.1) |

**No se afirma:** plazo de entrega de la revisión.

## 2A · Portada y cierre

| Afirmación | Archivo | Estado |
|---|---|---|
| «Escribes tu dominio y ves 21 señales, ordenadas en tres preguntas» | `web/diagnostico/index.html` («Pon tu dominio…», «Los 21 chequeos, publicados», tres bloques con su pregunta); `copy` §2.6 «Escribes tu dominio y ves 21 señales, con lo que pesa cada bloque» | Verificado (sitio vivo y nuevo) |
| «Cada señal que no se cumple trae su explicación y cómo arreglarla» | `web/diagnostico/index.html`, función que arma la lista (líneas 493 a 510): si la señal se cumple imprime solo el título con ✓; si no se cumple o no se pudo confirmar, imprime `detalle` y, si lo hay, `arreglo`. `chequeo.js`: las 21 llamadas a `add(...)` traen un séptimo argumento con el texto del arreglo (conteo de argumentos hecho el 23-oct), y la API devuelve `arreglo` en las tres señales sin cumplir de `spindlelab.cl` (`sameas`, `preguntas`, `fecha`). Un comentario de `chequeo.js` (hacia la línea 969) lo dice igual: «la página solo muestra el detalle de lo que no cumple». **Se reemplazó** la frase anterior («El resultado sale en pantalla, con el detalle de cada una»), que salía del FAQ de la página («ves el resultado completo en pantalla, con el detalle de cada chequeo») y no describe lo que se ve: las señales que se cumplen salen sin detalle. El FAQ del sitio repite esa frase inexacta: aviso al final de este archivo | Verificado en el código y con la API (23-oct, noche) |
| «Leemos solo páginas públicas, las mismas que lee cualquier buscador» | `web/diagnostico/index.html` («Gratis y sin dejar tu correo. Leemos solo páginas públicas, las mismas que lee cualquier buscador») | Verificado (sitio vivo y nuevo) |

## 2B · Portada y cierre

| Afirmación | Archivo | Estado |
|---|---|---|
| «Puedes leer cuánto cuesta y cómo trabajamos antes de hablar con nadie» | Como la lámina 1 de la completa, sin el chequeo | Verificado en el sitio nuevo |
| «Escríbenos la dirección de tu sitio» | `web/contacto/index.html`, H1 («Escríbenos la dirección de tu sitio y te respondemos con una revisión»); `copy` §8 | Verificado en el sitio nuevo |
| «La revisión, gratis» | `web/contacto/index.html` FAQ «¿La revisión es gratis? Sí» | Verificado en el sitio nuevo. **Depende de la reconfirmación de la oferta** (PLAN §2.1) |
| «Te respondemos con una página con lo más importante que encontramos» | `web/contacto/index.html`, subtítulo, **sin** la parte «llega en un día hábil» (plazo sin decidir) | Verificado en el sitio nuevo |

## Pies de foto

| Afirmación | Archivo | Estado |
|---|---|---|
| «Cada solución publica su precio de partida, con lo que incluye y más IVA» | `web/servicios/index.html` FAQ «¿Publican precios?»; `copy` §2.5 | Verificado en el sitio nuevo |
| «El método tiene cuatro pasos y el primero es una revisión gratis de una página» | `web/metodo/index.html` | Verificado en el sitio nuevo |
| «El chequeo de visibilidad en IA lo corres tú: escribes tu dominio, ves 21 señales y no dejas tu correo» | `web/diagnostico/index.html` (título «Chequeo de visibilidad en IA»); lámina 4 | Verificado |
| «Cada pregunta tiene su peso en el puntaje y las 21 señales están publicadas, para que puedas repetir el chequeo a mano si quieres» (2A) | `web/diagnostico/index.html`, «Acá está la metodología completa, con el peso de cada bloque, para que puedas repetir el chequeo a mano si quieres» (el sitio vivo trae la misma frase) | Verificado |
| «Lo dejamos escrito porque es difícil contratar algo que no puedes comparar» | Argumento publicado por Ramón el 1-sep-2026 en LinkedIn (singular: «Alguien que hoy necesita contratar visibilidad en motores de IA no tiene con qué comparar»), `.claude/skills/voz-spindlelab/corpus.md` §1. Acá va en plural de marca | **Razón declarada**, no un dato |
| Enlaces con UTM (`utm_source=instagram`, `utm_medium=social`, `utm_campaign=<slug>`), directo a `/diagnostico/` o `/contacto/` | PLAN §3; `web/contacto/index.html` guarda `utm_source`, `utm_medium` y `utm_campaign` en campos ocultos; las tres URL responden 200 (23-oct) | Verificado |

---

## Lo que la pieza NO afirma

Resultados de cualquier tipo, plazos, clientes, logos, testimonios, nombres de prospectos, hallazgos de un sitio real, cifras internas del outbound, ningún precio (ni los seis juntos ni uno suelto), la cadencia con que se mide en el acompañamiento, el caso de Bernardo Combeau, la Ley 21.719 o Verifica y Cumple, cómo se usa la IA por dentro, disponibilidad («pocos proyectos a la vez»), la palabra «socio», comparaciones con otras agencias, que una IA vaya a citar a nadie, ni que Google Ads tenga un mínimo de meses.

## Qué hay que re-verificar el día de publicar

1. **Completa y 2B:** que `/servicios/` siga diciendo que cada solución publica su precio de partida y que las seis existan (lámina 2, sin cifras). Comando en `publicar.md`.
2. **Completa y 2B:** que `/metodo/` publicado diga lo que dicen la lámina 3 y su rótulo «En un sitio web», y que el paso 04 siga hablando de volver a medir (la lámina no fija cadencia: decisión 8).
3. **Las tres:** que `/diagnostico/` conserve las seis frases del comando de `publicar.md` (la de las fuentes de terceros, con su cláusula «no solo con tu sitio») y el reparto 21 señales, 30/40/30, y que la pantalla siga mostrando explicación y arreglo solo en las señales que no se cumplen.
4. **Completa y 2B:** la reconfirmación por escrito de Ramón de que la revisión gratis está encendida.

## Aviso para el equipo del sitio (no se toca desde esta carpeta)

`chequeo.js`, `bloques[0].sub` («Si los bots de IA no entran, nada más importa») no distingue a los robots que entrenan de los que buscan en vivo, y la página `/diagnostico/` sí lo hace. La lámina 4 sigue a la página. Conviene alinear el texto que devuelve la herramienta con el de la página.

**FAQ de `/diagnostico/` (23-oct, noche).** La pregunta «¿El chequeo es realmente gratis?» (líneas 147 del JSON-LD y 354 del cuerpo de `web/diagnostico/index.html`) dice «ves el resultado completo en pantalla, con el detalle de cada chequeo». La pantalla muestra el detalle solo de las señales que no se cumplen o no se pudieron confirmar (líneas 493 a 510 del mismo archivo). Conviene que el FAQ diga lo mismo que la pantalla. La 2A ya no repite la frase inexacta.

## Historial de correcciones (revisión independiente del 23-oct, noche)

| Hallazgo | Qué se cambió | Dónde |
|---|---|---|
| Paso 04 con «cada mes»: cadencia sin decidir (decisión 8, PLAN §6) | «Si quieres seguir, volvemos a medir con el mismo criterio.» Sin cadencia | `lamina-3.html`, `2b-lamina-3.html`; fila 04 de «Lámina 3» |
| Bajada de la 2A: «con el detalle de cada una» no es lo que muestra la pantalla | «Cada señal que no se cumple trae su explicación y cómo arreglarla.» | `2a-lamina-1.html`; fila de «2A · Portada y cierre» |
| Lámina 2 con «desde $490.000» como «Un ejemplo»: no es el umbral de entrada y la decisión C sigue sin respuesta | Lámina sin cifras: seis soluciones por nombre y `/servicios/`. Qué decide Ramón, en `publicar.md` §2 | `lamina-2.html`, `2b-lamina-2.html`, `antes.css`; sección «Lámina 2» |
| Lámina del límite sin «no solo con tu sitio» | Frase completa de la página | `lamina-5.html`, `2a-lamina-3.html`; fila de «Lámina 5» |
