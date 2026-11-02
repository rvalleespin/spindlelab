# Fuentes · Imagen única «Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy»

Cada afirmación factual de la pieza (lámina, pie de foto, primer comentario, historias) con la página que la respalda. Regla: si una afirmación no tiene respaldo, se quita de la pieza. Las rutas del repo son relativas a su raíz. Las páginas oficiales se parafrasean: la única cita textual de este archivo está en la fila 4.

**Fecha de consulta de las páginas oficiales: viernes 23-oct-2026.** Se leyó el HTML publicado de cada una (no un resumen de terceros), y la lista de robots se cruzó con el chequeo en producción.

## Las páginas oficiales

| Sigla | Página | Qué se vio el 23-oct-2026 |
|---|---|---|
| **OPENAI** | https://developers.openai.com/api/docs/bots (la dirección antigua, `platform.openai.com/docs/bots`, redirige acá con un 301) · «Overview of OpenAI Crawlers» | La página **no trae fecha de publicación ni de actualización**. Lista cuatro agentes: OAI-SearchBot, OAI-AdsBot, GPTBot y ChatGPT-User |
| **ANTHROPIC** | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler · «Does Anthropic crawl data from the web, and how can site owners block the crawler?» | Fechada **7 de abril de 2026**. Lista tres robots: ClaudeBot, Claude-User y Claude-SearchBot. No menciona `anthropic-ai` |
| **PERPLEXITY** (no se usa en la pieza; se verificó para decidir qué dejar fuera) | https://docs.perplexity.ai/guides/bots · «Perplexity Crawlers» | Sin fecha visible. Lista PerplexityBot y Perplexity-User |
| **CHEQUEO** | `spindlelab-astro/functions/api/chequeo.js` y `spindlelab-astro/public/diagnostico/index.html` (idéntico al sitio vivo el 23-oct: `spindlelab.cl/diagnostico/` responde 200 y trae el mismo bloque «¿Te pueden leer?») | Corrido en vivo sobre `spindlelab.cl` el 23-oct: devuelve 21 señales y las tres de robots (`bots-indices`, `bots-asistentes`, `bots-entrenamiento`) |

## Afirmaciones y su respaldo

| # | Dónde aparece | Afirmación | Respaldo | Qué dice la fuente (parafraseado) |
|---|---|---|---|---|
| 1 | Lámina (código), pie de foto, historias | GPTBot es el robot con el que OpenAI recoge texto que puede servir para entrenar sus modelos | OPENAI, fila GPTBot | Lo describe como el que rastrea contenido que puede usarse para entrenar sus modelos de IA generativa de base |
| 2 | Lámina («Pide que no usen tu texto para entrenar modelos»), pie de foto | Bloquear a GPTBot en el robots.txt indica que el contenido no debe usarse para entrenar | OPENAI, fila GPTBot | Dice que impedir el paso a GPTBot indica que el contenido del sitio no debe usarse para entrenar esos modelos |
| 3 | Lámina (comentario `# búsqueda de ChatGPT`), pie de foto | OAI-SearchBot es el robot de la búsqueda de ChatGPT | OPENAI, fila OAI-SearchBot | Lo describe como el que sirve para mostrar sitios en los resultados de las funciones de búsqueda de ChatGPT |
| 4 | Pie de foto («cada ajuste es independiente de los demás») | La configuración de GPTBot y la de OAI-SearchBot son independientes | OPENAI, párrafo de entrada | «Each setting is independent of the others.» Su ejemplo es dejar entrar a OAI-SearchBot para aparecer en la búsqueda y bloquear a GPTBot para el entrenamiento |
| 5 | **Gancho de la lámina**, pie de foto, historias | Bloquear a GPTBot no cambia si la búsqueda de ChatGPT te muestra | Filas 2, 3 y 4 juntas | La documentación separa los dos robots y dice que son independientes. El alcance exacto está en la sección «Qué sostiene el gancho» (más abajo) |
| 6 | Lámina («Este sí te saca de las respuestas de búsqueda de ChatGPT»), pie de foto | Si un sitio bloquea a OAI-SearchBot, no se muestra en las respuestas de búsqueda de ChatGPT, aunque puede aparecer como enlace de navegación | OPENAI, fila OAI-SearchBot | Dice que los sitios que se excluyen de OAI-SearchBot no se muestran en las respuestas de la búsqueda de ChatGPT, aunque pueden seguir apareciendo como enlaces de navegación. La lámina dice «te saca de las respuestas de búsqueda»; el matiz del enlace va en el pie |
| 7 | Pie de foto («Permitirlo es lo que OpenAI recomienda para aparecer») | OpenAI recomienda permitir a OAI-SearchBot para aparecer en la búsqueda | OPENAI, fila OAI-SearchBot | Para ayudar a que el sitio aparezca, recomienda permitir a OAI-SearchBot en el robots.txt y las direcciones IP que publica. Dice «ayudar a asegurar», no que lo garantice |
| 8 | Pie de foto («no garantiza que ChatGPT te nombre») | Permitir el paso no garantiza ser nombrado | Fila 7, y `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` §2.5 | La página de OpenAI solo habla de aparecer y de «ayudar a asegurar». Es el límite de la casa: COPY §2.5 «no garantiza que te nombre». Se dice una sola vez, en el pie |
| 9 | Lámina (nota), pie de foto | ClaudeBot es el robot de entrenamiento de Anthropic | ANTHROPIC, fila ClaudeBot | Lo describe como el que reúne contenido web que podría contribuir al entrenamiento de sus modelos. Si un sitio lo restringe, señala que su material futuro debe quedar fuera de los datos de entrenamiento. **La página no trae para ClaudeBot ningún aviso de visibilidad**: por eso el pie no lo incluye entre los robots cuyo bloqueo «puede restar visibilidad» (filas 10 y 11) |
| 10 | Lámina (nota), pie de foto | Claude-SearchBot es de búsqueda; bloquearlo puede restar visibilidad. **El pie lo nombra por su nombre** («bloquear a Claude-SearchBot o a Claude-User puede restarte visibilidad»), no como «estos dos» | ANTHROPIC, fila Claude-SearchBot | Recorre la web para mejorar la calidad de los resultados de búsqueda. Si se desactiva, no indexa el contenido para la búsqueda y eso **puede** reducir la visibilidad y la precisión del sitio en los resultados |
| 11 | Lámina (nota), pie de foto | Claude-User entra a una página cuando alguien le hace una pregunta a Claude; bloquearlo puede restar visibilidad | ANTHROPIC, fila Claude-User | Cuando una persona le hace preguntas a Claude, este puede acceder a sitios con el agente Claude-User. Si se desactiva, el sistema no recupera el contenido en respuesta a una consulta de usuario, lo que **puede** reducir la visibilidad en la búsqueda dirigida por el usuario |
| 12 | Pie de foto («el archivo de la raíz de tu sitio»), primer comentario (`tudominio.cl/robots.txt`) | El robots.txt vive en la raíz del sitio y ahí se bloquea a un robot con `User-agent` y `Disallow: /` | ANTHROPIC, instrucciones de bloqueo; CHEQUEO `chequeo.js` línea 934 | Para bloquear un robot de todo el sitio, la regla va en el robots.txt del directorio de más arriba, con el nombre del robot y `Disallow: /`. El chequeo manda a abrir `dominio/robots.txt` |
| 13 | Lámina (CTA), pie de foto, primer comentario | El chequeo gratis lee el robots.txt y dice cuáles de estos robots están bloqueados | CHEQUEO: `chequeo.js` líneas 867 a 869 (las tres listas) y 940 a 1002 (el detalle nombra a los bloqueados); `diagnostico/index.html` línea 296; corrida en vivo del 23-oct | Cuando hay bloqueo, el detalle dice «Tu robots.txt bloquea a …» con los nombres, separado en tres señales (índices de búsqueda, asistentes en vivo, entrenamiento). Cuando no, dice que no están bloqueados. OAI-SearchBot, Claude-SearchBot, GPTBot y ClaudeBot están en las listas |
| 14 | Lámina (CTA), pie de foto | El chequeo es gratis y sin registro | `diagnostico/index.html` líneas 63 y 68 (meta descripción: «Gratis, sin registro»); COPY §2.6 | «Gratis, sin registro» está en la descripción de la página; COPY §2.6: «Es gratis y sin registro» |
| 15 | Historia de la empresa («Un robot entrena modelos y otro busca para responder») | Hay robots que entrenan y robots que buscan, y se manejan por separado | Filas 1 a 4, 9 y 10 | Las dos empresas los separan por función y dan una regla para cada uno |
| 16 | Historia personal («Lo leí en la documentación…») | Ramón leyó las dos páginas | **Pendiente de él**: abrir OPENAI y ANTHROPIC antes de subir la historia | Ver checklist de `publicar.md` |
| 17 | **Primer comentario**, línea de fuentes | OpenAI y Anthropic publican en esas dos páginas lo que la pieza atribuye. La línea dice: «Fuentes, consultadas el 23-oct-2026: OpenAI: developers.openai.com/api/docs/bots · Anthropic: support.claude.com, artículo 8896518» (en el comentario va en tres líneas) | OPENAI y ANTHROPIC, tabla de arriba | Las dos direcciones respondieron 200 el 23-oct (noche) con `curl`; la de OpenAI es la actual (la antigua redirige con un 301) y la de Anthropic muestra el artículo con fecha 7 de abril de 2026. Se vuelve a comprobar el día de publicar y se cambia la fecha del comentario por la de esa lectura |

## Qué sostiene el gancho (y qué no)

**Gancho pedido:** «Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy.» **Se mantiene tal cual.** Lo que la documentación sostiene:

- GPTBot es el robot de entrenamiento y OAI-SearchBot el de la búsqueda de ChatGPT (filas 1 y 3).
- OpenAI dice que cada ajuste es independiente, con un ejemplo que es exactamente este caso: un sitio que deja entrar a OAI-SearchBot y bloquea a GPTBot (fila 4).
- Lo que saca a un sitio de las respuestas de búsqueda de ChatGPT es bloquear a OAI-SearchBot (fila 6).

**Lo que la documentación no dice**, y la pieza tampoco: qué pasa con lo que un modelo ya aprendió en un entrenamiento anterior, y si las respuestas que ChatGPT da sin buscar cambian por el bloqueo. OpenAI describe el bloqueo de GPTBot como una señal sobre el uso futuro del contenido en el entrenamiento y no dice nada de lo ya entrenado; Anthropic habla de «material futuro». Por eso la lámina y el pie hablan de las **respuestas de búsqueda** de ChatGPT, que es lo que OpenAI documenta, y el «de hoy» del gancho se lee en ese alcance. Si Ramón prefiere un gancho que cubra solo lo documentado de forma literal: «Bloquear a GPTBot no te saca de la búsqueda de ChatGPT.»

## Lo que nuestro sitio dice más fuerte que la documentación

La pieza solo afirma lo que dicen las páginas oficiales. Estas frases de nuestro propio sitio y del chequeo van más allá, y conviene que la troncal y Diego las revisen antes de que alguien compare la pieza con la página:

1. **ChatGPT-User, Claude-User y Perplexity-User.** `diagnostico/index.html` línea 296 dice que bloquear a «los primeros» (que incluyen a estos tres) «te borra de las respuestas de hoy», y `chequeo.js` línea 955 que, con ellos cerrados, «el asistente no puede leerte». OPENAI dice que ChatGPT-User no decide si un contenido aparece en la búsqueda y que, por ser acciones iniciadas por una persona, las reglas del robots.txt pueden no aplicarse. PERPLEXITY dice que Perplexity-User en general ignora el robots.txt. ANTHROPIC dice que bloquear a Claude-User **puede** reducir la visibilidad.
2. **Claude-SearchBot y PerplexityBot.** `chequeo.js` línea 944 afirma que con ellos cerrados «no puedes aparecer como fuente en sus respuestas de hoy». ANTHROPIC dice «puede reducir» para Claude-SearchBot. Para OAI-SearchBot, en cambio, OPENAI sí dice que no se muestra el sitio en las respuestas de búsqueda.
3. **«El efecto es inmediato»** (`chequeo.js` línea 947, el arreglo de los índices cerrados). OPENAI dice que, para la búsqueda, los sistemas pueden tardar unas 24 horas en ajustarse tras un cambio en el robots.txt; PERPLEXITY dice que hasta 24 horas.
4. **«Los modelos de dentro de dos años sepan de ti»** (`chequeo.js` línea 1000, el arreglo de los robots de entrenamiento): ninguna de las dos páginas dice algo parecido.
5. **«Modelos futuros»** para GPTBot (`chequeo.js` líneas 865, 997 y 998): ANTHROPIC dice «material futuro» para ClaudeBot; la página de OPENAI no usa la palabra «futuros» para GPTBot.

## Lo que contradice la pieza dentro del repo (para la troncal)

- `marketing/outbound/semana-03/lote-1-frente-b.md`, prospecto 7 (clinicaopia.cl), líneas 173 y 179: presenta el bloqueo de GPTBot, ClaudeBot, Google-Extended, CCBot y otros como «el hallazgo más fuerte del lote», y el borrador del correo dice que les impide «directamente leer y citar» al prospecto en sus respuestas. Esa lectura no la sostienen las páginas oficiales para los robots de entrenamiento. Leído el 23-oct; **no sé si ese correo salió** (el estado real vive en Gmail).
- `marketing/encargos-otras-sesiones/chequeo-v2-brief-citable.md` (sección «ALERTA para nuestro propio material»): ya avisa de que la narrativa de outbound y de piezas decía «bloqueas GPTBot ⇒ invisible en ChatGPT hoy». No revisé los demás lugares que ese archivo enumera.
- `marketing/encargos-otras-sesiones/revision-v3-contra-modelo-nuevo-23oct.md` anota que `/v3/blog/como-aparecer-en-chatgpt/` (rama del sitio v3, no el sitio vivo) dice lo contrario que el chequeo sobre estos robots. No lo abrí.

Esta es la **condición 2** de `PLAN.md` §5 y sigue abierta: la imagen se produjo, pero no se publica hasta que la troncal alinee esos materiales (ver `publicar.md`).

## Qué se quitó o se acotó por falta de respaldo

- **ChatGPT-User y los robots de Perplexity no entran en la lámina.** Se verificaron y no sostienen la frase «te saca»: ver la sección anterior, punto 1.
- **No se dice «te borra».** La documentación de OpenAI dice «no se muestra en las respuestas de búsqueda» y que puede quedar como enlace; «borra» es de nuestro sitio.
- **No se dice «modelos futuros» para OpenAI** (fila 2 y sección «Qué sostiene el gancho»).
- **No se dice que bloquear al entrenamiento sea una decisión «legítima»** (es de `/diagnostico/`, no de la documentación): la pieza se limita a decir qué indica cada bloqueo.
- **No se afirma que Anthropic «saque» a un sitio**: la documentación dice «puede reducir» (filas 10 y 11).
- **El ejemplo de robots.txt es ilustrativo.** Los dos bloques de la lámina muestran la regla `User-agent` + `Disallow: /` de la que hablan ambas páginas; no son el robots.txt de ningún sitio real. El de `spindlelab.cl` permite a todos esos robots (verificado el 23-oct).

## Dependencias de estado (lo que puede cambiar entre hoy y el día de publicar)

- **Las páginas oficiales cambian sin aviso** (la de OpenAI no trae fecha). El día de publicar se vuelven a abrir las dos y se compara con las filas 1 a 11. Si algo cambió, la lámina se corrige en el HTML y se vuelve a renderizar, el pie se ajusta y la fecha de la línea de fuentes del primer comentario pasa a ser la de esa lectura (fila 17).
- **`/diagnostico/` puede cambiar con el sitio nuevo.** `copy-secciones.md` §9 deja la página casi igual, pero el día de publicar se confirma que sigue dándose el bloque «¿Te pueden leer?» y que el chequeo sigue nombrando a los robots bloqueados (fila 13).
- **El chequeo no ve todo.** Si el sitio usa Cloudflare, las reglas de bots de IA que Cloudflare pone en el borde pueden no llegar al chequeo, y él mismo lo dice (`chequeo.js` línea 901). «Mira cuáles de estos bloquea tu sitio» promete leer el robots.txt, no el borde.

## Historial de correcciones (revisión independiente del 23-oct, noche)

| Hallazgo | Qué se cambió | Dónde |
|---|---|---|
| «Estos dos» en el párrafo de Anthropic no tenía referente claro y podía leerse como ClaudeBot más Claude-SearchBot | El pie nombra a Claude-SearchBot y a Claude-User, que son los dos que traen el aviso en la página de Anthropic (releída el 23-oct, noche). ClaudeBot no lo trae | `caption.md` §1; filas 9 a 11 |
| Las fuentes primarias no estaban a la vista del público | Línea de fuentes en el primer comentario, con las dos direcciones y la fecha | `caption.md` §5; fila 17 |
| Condiciones 2 y 3 del PLAN §5 abiertas, y la pieza se daba por programable | Tres puertas duras con dueño y fecha en `publicar.md` | `publicar.md`, «Puertas duras» |
