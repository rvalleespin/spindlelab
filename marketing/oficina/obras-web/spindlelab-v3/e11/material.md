# E11 · Material real para el texto: home, Acompañamiento mensual y Trabajo

16-oct-2026, 13:20 (Chile) · Renata · base `bdf07d4`, rama `claude/magical-franklin-ckfki2` · lo pide
el brief de Mauro (`e11/brief-texto.md` §5 y criterio 5: «cada afirmación tiene fila en `material.md`»).
**No es texto del sitio.** Es lo que se puede afirmar, con su fuente, y lo que no.

**Cómo leerlo.**

- Cada fila trae su fuente: archivo y línea, o comando. Las citas literales van entre «».
- Las rutas que llevan el nombre de un prospecto van con `*` en esa parte. Cada patrón calza con un
  solo archivo (comprobado con `ls`). En el texto, ningún prospecto lleva nombre ni dominio.
- El texto vigente del sitio sale de `spindlelab-astro/dist/v3/` (build del 16-oct, 11:50), extraído
  con `e8/herramientas/extraer.mjs` sobre las 21 rutas (servidor en el puerto 8795, apagado al
  terminar). Se cita como «dist, /v3/ruta/».
- **Uso:** *Sí* se puede escribir tal cual, generalizado · *Con condición* necesita lo que dice la
  fila · *No* no entra al texto.

---

## 0 · Lo que este material le cambia a quien escriba

1. **El circuito se puede contar entero con hechos, tramo por tramo** (sección 8). Falta una sola
   pieza: una respuesta real de ChatGPT en el rubro del lector, guardada con fecha. Nunca se corrió:
   los `[+EVIDENCIA]` de los correos quedaron vacíos.
2. **Lo que más se repite no es el robots.txt.** En 69 sitios medidos con el mismo instrumento,
   ninguno bloqueaba a los robots de IA en su robots.txt; 67 no tenían preguntas frecuentes marcadas,
   64 no mostraban una persona detrás y 43 no declaraban qué negocio son (sección 2a).
3. **El bloqueo que sí aparece está donde el dueño no mira:** el servidor o el CDN. De 49 sitios
   revisados a mano, 11 no se dejaban leer por un robot o estaban caídos (2b).
4. **«Estás pagando» se sostiene aunque el lector no pague pauta.** Lo pagado es el sitio y lo que
   escribió: el caso más fuerte es un estudio con más de 250 artículos detrás de un 403 (escena E1).
5. **Ningún prospecto describe su problema con sus palabras.** Lo que hay son objeciones y frases de
   agenda (sección 7).
6. **Cero cifras externas con fuente en el sitio o el blog.** Lo externo verificado es documentación
   de Google y la ley, sin cifras de uso de IA (sección 4).
7. **Cuatro contradicciones y una tarea** para Ramón antes de escribir (sección 9): si el
   mini-diagnóstico se ofrece, Google-Extended, el Ads propio, el permiso escrito de Combeau, y correr
   la escena en ChatGPT.

---

## 1 · Escenas reales del problema

Cada escena es un hecho observado y verificado en su fecha. Ninguna es un resultado de cliente.

| # | La escena, generalizada | Tramo (sección 8) | Fuente | Uso |
|---|---|---|---|---|
| E1 | Un estudio de abogados de Santiago con años de artículos (257, uno cada 3 o 4 días). Pedimos su portada presentándonos como cada robot: un navegador, Google y Bing recibían la página; los buscadores de ChatGPT, Perplexity y Claude recibían un 403. Su robots.txt les daba permiso: el que los echaba era el servidor, por una regla del CDN que nadie en el estudio había decidido. | Lee | `ventas/presentaciones/*-2026-09-11/preguntas-y-hallazgos.md:24-39` (verificado 9-sep), `:60-61` (257 artículos); `ventas/reunion-*-2026-09-11.md:80-85` | Sí. Decir «más de 250» o «años de artículos»: la cifra exacta ayuda a identificarlo. Con su límite dicho: la prueba sale de nuestro servidor; prueba que filtra por nombre, no descarta que además filtre por origen (`preguntas-y-hallazgos.md:41-44`) |
| E2 | El mismo estudio: sus artículos ya venían marcados con preguntas y respuestas, pero las páginas donde cobra (sus 9 áreas) no respondían nada de lo que alguien pregunta antes de elegir: cuánto cobran, cuánto demora, qué opinan sus clientes, con qué empresas han trabajado, cómo es el proceso. Los logos de clientes eran imágenes sin texto: para una máquina, esa sección estaba en blanco. | Encuentra | `preguntas-y-hallazgos.md:46-49`, `:91-99` | Sí. Ojo: las preguntas las escribimos nosotros y se verificaron contra el sitio; no las dijo un cliente (sección 7) |
| E3 | Un estudio de abogados pidió cotización a los 24 minutos de recibir nuestro correo. Su sitio mostraba el error de WordPress en vez de la portada, también en la página de contacto, y seguía así 33 días después del primer aviso. | Escribe | `ventas/pipeline-reconstruido-2026-09-22.md:40`, `:98-101`, `:115-116` | Sí, como escena de corte total |
| E4 | Una clínica dental de Las Condes: su robots.txt prohibía rastrear la página de especialidades, la misma que enlaza su menú, y las páginas de dos especialistas del equipo. A una persona la página le carga; a Google y a los robots de IA, no. | Lee | `marketing/diagnosticos/SPL-DIAG-2026-001-*/diagnostico.html:183`, `:197` (21-jul) | Sí |
| E5 | Clínicas cuyo servidor rechaza a cualquier lector automático: un 403 a todo pedido, un 406 «bloqueado por ModSecurity», una pantalla de verificación de Cloudflare en vez del contenido. Para quien entra con el navegador, el sitio se ve perfecto. | Lee | `marketing/outbound/semana-02/lote-1-frente-c.md:31`; `marketing/outbound/semana-03/lote-1-frente-b.md:137`; `…/lote-frente-b-2026-07-25/borradores/17-*.md:6-9`; `marketing/outbound/lote-frente-b-dental-21jul.md:11` | Sí |
| E6 | Una clínica dental con el hosting suspendido: «Account Suspended» para todos, comprobado dos veces el mismo día. | Escribe | `…/borradores/10-*.md:4-6` (25-jul) | Sí, como corte total |
| E7 | Una clínica dental del sur cuyo sitio le decía a Google que su dirección oficial era otro dominio, y sin mapa del sitio para corregirlo. | Entiende | `…/borradores/12-*.md:6-12` (25-jul) | Sí. Sin ciudad: con ella se identifica |
| E8 | Una gestora de inversiones: su página de equipo daba error y Google tenía guardada una página de error con el nombre de otra empresa. | Entiende | `marketing/outbound/semana-02/lote-1-frente-a.md:67` (8-jul) | Sí |
| E9 | Una gestora de inversiones con décadas de trayectoria: el sitio respondía error 503 a los lectores automáticos. | Lee | `lote-1-frente-a.md:86`, `:93` | Sí, sin los años exactos |
| E10 | Asesoras de inversión cuyo título de portada es solo el nombre de la empresa, sin descripción: nada dice a qué se dedican ni dónde. | Entiende | `lote-1-frente-a.md:105`, `:126`, `:145`, `:238` | Sí |
| E11 | Una clínica estética que es la marca personal de su fundadora: los datos que leen las máquinas traen nombre de la clínica, logo y teléfono, y no a ella. | Entiende | `lote-1-frente-b.md:71` | Sí |
| E12 | Clínicas con blog activo, contenido real, y cero datos estructurados: lo escrito no le dice a una máquina quién lo escribe ni qué negocio es. | Entiende | `lote-1-frente-b.md:193`; `lote-1-frente-c.md:94` | Sí |
| E13 | Un medio de gastronomía y hotelería con años de archivo: cada nota se comparte por WhatsApp sin título ni imagen, y ninguna declara para una máquina quién la escribió ni cuándo. | Entiende | `marketing/diagnosticos/SPL-DIAG-2026-002-*/diagnostico.html:183-184`, `:192` (21-jul) | Sí. Es la escena más cotidiana del material |
| E14 | **SpindleLab mismo.** Revisando el formulario de contacto apareció un error: el botón se quedaba en «Enviando…» y el mensaje no llegaba a ninguna parte. No hay cómo saber cuántos se perdieron. | Escribe | `.claude/skills/voz-spindlelab/corpus.md:190` (publicado en la página de LinkedIn el 21-sep) | Sí, ya es público. Plural de marca |
| E15 | **SpindleLab mismo.** Su anuncio en Google trajo 104 clics con un CTR de 16,05 % y ninguno dejó sus datos. | Encuentra / Escribe | `marketing/metricas/checkpoint-dia77-2026-09-21.md:61-66`, `:76-77` | Con condición: decide Ramón (brief §7.1, supuesto «no») |
| E16 | Cómo arma Google sus respuestas con IA: una pregunta se abre en varias búsquedas (query fan-out), y para salir como enlace la página tiene que estar indexada y poder mostrarse con fragmento. Quien pregunta por «abogado laboral en Santiago» compite por las cinco o seis preguntas que el sistema se hace en el camino. | Pregunta | `marketing/redes/2026-09-septiembre/23-mie-query-fan-out/publicar.md:20-26`, fuente `:48-57` | Sí. Publicado por Ramón el 23-sep, con fuente primaria (sección 4) |
| E17 | Lo que devuelve la IA cuando se le pide un proveedor: pidiendo un consultor SEO en Chile, ChatGPT dio tres agencias por nombre (10-jul) y otras tres el 25-ago; Perplexity citó como fuente un ranking publicado por la misma agencia que salía primera. Los motores citan rankings y artículos de terceros, no solo el sitio de quien recomiendan. | Pregunta | `marketing/metricas/test-menciones-ia.md:48`, `:67`, `:76-77` | Con condición: es el rubro de SpindleLab, no el del lector, y tiene tres meses. Repetir antes de citar (brief §5). Sin nombres de agencias |
| E18 | Los dos clientes de Desarrollo web: el segundo llegó recomendado por el primero, por WhatsApp. Antes de comprar preguntó qué podía editar sola, a nombre de quién quedaban las cuentas, si podía cambiar de técnico y cuánto costaba al mes. | Encuentra | `ventas/pipeline.md:25` (12 dudas, 24-sep) y `:26` | Con condición: las preguntas, generalizadas, sí; «llegó recomendado» es prueba social, decide Ramón |

**La escena que falta.** No hay en el repo una sola respuesta real de ChatGPT, Gemini o Perplexity a
una pregunta del rubro del lector («qué estudio me recomiendas para un tema laboral en Santiago»,
«dónde me pongo un implante en [ciudad]»). Los correos dejaban el lugar marcado y nunca se llenó
(`marketing/outbound/lote-frente-b-dental-21jul.md:20`; `lote-1-frente-a.md:9`); el diagnóstico del
estudio lo dice en su pie (`marketing/diagnosticos/SPL-DIAG-2026-006-*/SPL-DIAG-2026-006-*.html:248`);
el de la clínica lo prometía para después (`SPL-DIAG-2026-001-*/diagnostico.html:190`). Si el texto la
quiere, la corre Ramón, en singular («le pregunté a ChatGPT», manual `marketing/brand/manual-de-marca.md:430`),
con fecha y captura. Dos avisos: la versión «salieron tres nombres y ninguno era el tuyo» es el anuncio
más corrido de la categoría (`marketing/encargos-otras-sesiones/direccion-creativa-campana-sep-REPORTE.md:34`),
y «le pregunté a ChatGPT…» como apertura ya cansó en sus posts (`marketing/oficina/clientes/spindlelab.md:106-107`).

---

## 2 · Hallazgos que se repiten

### 2a · 69 sitios, mismo instrumento (31-ago-2026)

38 corredoras de propiedades y 31 oficinas contables, casi todas de Santiago (una de Concepción),
corridas con el chequeo público (`marketing/metricas/corridas-chequeo-2026-08-31.md:3-4`; ciudades en
`ventas/contactos-google-maps-inmobiliarias.csv` y `…-contadores.csv`, columna `ciudad`). Conteo sobre
los crudos: `python3` sobre `marketing/metricas/corridas-chequeo-2026-08-31-*.jsonl`, contando
`ok: false` por `id` en las 69 corridas con `ok: true`.

| Lo que el sitio no tenía | Sitios | Dicho en simple |
|---|---|---|
| Preguntas frecuentes marcadas | **67 de 69** | Ninguna pregunta respondida en el formato que una máquina copia y atribuye |
| Una persona con credenciales detrás | 64 | Nadie con nombre y cargo responde por el contenido |
| Títulos escritos como pregunta | 64 | Las páginas no se titulan con lo que la gente pregunta |
| Al menos 3 perfiles externos enlazados | 63 | La máquina no puede comprobar que eres el mismo de LinkedIn o Google |
| Dirección y contacto en la ficha de la empresa | 60 | |
| Fecha en el contenido | 51 | |
| llms.txt | 49 | Ver la tensión con Google, sección 3 |
| La empresa declarada como entidad | 43 | La máquina no sabe qué negocio eres |
| Descripción útil | 40 | Google escribe la suya |
| Un solo H1 | 36 | |
| Datos estructurados de cualquier tipo | 36 | |
| Mapa del sitio | 31 | |
| URL canónica | 22 | |
| Título que dice qué haces y dónde | 18 | |
| Contenido suficiente en la portada | 16 | |
| Idioma declarado | 11 | |
| **Bloqueo a robots de IA en el robots.txt** | **0** | Con un límite: 50 de los 69 estaban tras Cloudflare, y esa versión del chequeo no veía las reglas del borde (`corridas-chequeo-2026-08-31.md:10-12`, `:18`, `:82`) |

Puntajes: corredoras, mediana 45 (mín 34, máx 82); contables, mediana 58 (mín 30, máx 79)
(`corridas-chequeo-2026-08-31.md:16`, `:80`). **El «67 de 69» es R7:** lo medido es «67 de 69 sitios sin
preguntas frecuentes marcadas (FAQPage)», no «sin ninguna pregunta respondida» como decía el carrusel del
3-sep (`pendientes-traspaso-revisados.md:130-134`; `marketing/redes/2026-09-septiembre/03-jue-carrusel-perder-clientes/lamina-3.html:8`).
Supuesto del brief: no entra a la home (§7.2). La versión del chequeo de esa fecha es anterior a la actual
(revisaba GPTBot y Google-Extended como acceso; ver el primer ítem de cualquier corrida en el `.jsonl`).

### 2b · 49 sitios revisados a mano (8-jul a 22-sep-2026)

Asesoras de inversión y family offices (15, `lote-1-frente-a.md:18-32`), oftalmología y ópticas (5,
`lote-1-frente-c.md:19-23`), clínicas dentales y estéticas (8 + 10, `lote-1-frente-b.md:69-193` y
`lote-frente-b-2026-07-25/LEEME.md:25-45`), estudios de abogados (7 con hallazgo o revisión anotada,
`marketing/outbound/lote-abogados-19ago.md:49-105` y `marketing/outbound/envios-abogados-19ago.csv`, filas
2, 8 y 128), tres mini-diagnósticos (001, 002, 006) y un estudio con el sitio caído (E3). Métodos distintos
según la tanda (agentes, `curl`, sonda por robot), así que los conteos son **«al menos»** y no son una
estadística publicable. Sirven para saber qué escena es típica.

| Lo que se encontró | Al menos | Dónde (líneas) |
|---|---|---|
| Descripción ausente, vacía, cortada a media frase o hecha de palabras sueltas | 15 de 49 | frente-a `:105`, `:126`, `:145`, `:162`, `:181`, `:238`; frente-c `:52`, `:73`, `:94`; frente-b `:193`; borrador `18-*:6`; abogados `:51`, `:69`, `:87`; 002 `:183` |
| Título que no dice qué hacen ni dónde: solo el nombre, «Inicio - …», el nombre dos veces, un emoji, o sin título | 13 | frente-a `:105`, `:126`, `:145`, `:162`, `:200`, `:238`; frente-c `:94`; frente-b `:87`; borradores `09-*:6`, `13-*:6`, `15-*:6`; abogados `:87`; 002 `:183` |
| **No se deja leer por un robot** (403, 406, 503, verificación de Cloudflare, HTML vacío) **o está caído** | **11** | frente-a `:46`, `:86`, `:162`; frente-c `:31`; frente-b `:137`; dental-21jul `:11`; borradores `17-*:6`, `10-*:6`; abogados `:105`; E1; E3. De esos, 2 caídos para todos (E3, E6) |
| Sin datos estructurados | 9 | frente-a `:105`; frente-c `:52`, `:73`; frente-b `:193`; borradores `11-*:6`, `16-*:6`; abogados `:51`, `:69`, `:87` |
| Datos estructurados que no dicen qué negocio es («Organization», «WebPage», sin tipo médico ni legal) | 8 | frente-b `:105`, `:121`; borradores `09-*:6`, `13-*:6`, `15-*:6`, `18-*:6`; 001 `:183`; 006 README `:56` |
| Las personas que dan confianza no existen para la máquina (equipo, fundadora, especialistas) | 6 | frente-a `:255`, `:310`; frente-b `:71`, `:121`; 001 `:197`; 006 README `:59` |
| Contenido real que no llega a la máquina (blog sin marcar, archivo sin autor ni fecha, artículos tras un 403) | 6 | frente-a `:162`; frente-c `:73`, `:94`; frente-b `:193`; 002 `:192`; E1 |
| Dirección oficial equivocada (canónica a otro dominio, a `/index`, dominios duplicados) | 4 | frente-a `:67`; frente-b `:155`; borradores `12-*:6`, `11-*:6` |
| robots.txt con bloqueo a robots | 3 | frente-b `:173`; 006 README `:54`; 001 `:183` |
| **Nada que señalar** | **4** | `LEEME.md:41-45`; abogados CSV filas 2, 8 y 128 («Sitio bien optimizado») |

**Lo que dice la tabla y conviene no perder:** el robots.txt es el hallazgo menos frecuente, y dos de
sus tres casos bloqueaban sobre todo robots de entrenamiento, que no deciden las citas de hoy en ChatGPT,
Claude ni Perplexity (`preguntas-y-hallazgos.md:18-22`). El correo de julio que decía que una clínica
quedaba «invisible para esos sistemas» por su robots.txt (`lote-1-frente-b.md:173-181`) dijo más de lo que
había. La excepción es Google-Extended, que sí pesa en Gemini (sección 3). Y hay sitios sanos: si el texto
dice «casi siempre», lo sostiene la tabla 2a, no esta.

---

## 3 · Qué mide el chequeo, dicho en simple

Gratis, en segundos, sobre tu dominio. Lee solo páginas públicas, no pide correo y no guarda el dominio
(dist, /v3/diagnostico/: «Gratis y sin dejar tu correo. Leemos solo páginas públicas…» y FAQ «¿Guardan mi
dominio?»). 21 señales, 100 puntos, tres preguntas. Fuente de cada señal: `spindlelab-astro/functions/api/chequeo.js`,
línea del `add(` y su peso; los títulos de bloque, `:1224-1226`. Metodología publicada en /v3/diagnostico/
(«Los 21 chequeos, publicados») y en el artículo del 4-sep (/v3/blog/21-chequeos-visibilidad-ia/).

**¿Te pueden leer? (30).** Si los robots de IA no entran, lo demás no cuenta.

| Señal | Peso | En simple | Línea |
|---|---|---|---|
| Los índices de búsqueda de IA pueden entrar | 7 | Los robots con que ChatGPT, Claude y Perplexity arman su buscador no están bloqueados | `:941` |
| Los asistentes pueden visitarte en vivo | 7 | Cuando alguien pregunta, el asistente puede entrar a leerte en ese momento | `:952` |
| El servidor no expulsa a los robots de IA | 8 | Lo que le pasó al estudio de E1: el robots.txt dice que sí y el servidor dice que no | `:979` |
| Robots de entrenamiento: decisión consciente | 2 | Bloquear los que recogen texto para modelos futuros es legítimo, si lo decidiste tú | `:994` |
| El sitio responde por HTTPS | 6 | | `:1005` |

**¿Te entienden? (40).** Qué eres, a qué te dedicas y dónde operas.

| Señal | Peso | En simple | Línea |
|---|---|---|---|
| Tienes datos estructurados | 6 | Hay una ficha escondida en el código que las máquinas leen | `:1012` |
| Tu negocio está declarado como entidad | 8 | Esa ficha dice qué negocio eres | `:1017` |
| Tu entidad tiene dirección y contacto | 5 | | `:1022` |
| Te conectas con al menos 3 perfiles externos | 6 | La máquina puede comprobar que eres el mismo de LinkedIn, Google o un directorio | `:1029` |
| Hay una persona con credenciales detrás | 5 | Alguien con nombre responde por lo publicado | `:1034` |
| El título dice qué haces y dónde | 4 | | `:1042` |
| Tienes meta description útil | 4 | El resumen que Google muestra lo escribiste tú | `:1048` |
| Hay un solo H1 | 2 | Un titular principal por página | `:1053` |

**¿Te pueden citar? (30).** El formato en que la IA copia y atribuye.

| Señal | Peso | En simple | Línea |
|---|---|---|---|
| Tienes llms.txt | 4 | | `:1127` |
| Tienes preguntas frecuentes marcadas | 6 | | `:1135` |
| Tienes sitemap.xml | 4 | Un índice de tus páginas | `:1150` |
| Declaras la URL canónica | 2 | Dices cuál es la dirección oficial de cada página | `:1159` |
| Declaras el idioma | 2 | | `:1165` |
| Respondes preguntas en tus títulos | 5 | | `:1170` |
| Tu contenido tiene fecha | 4 | | `:1177` |
| Tu portada tiene contenido suficiente | 3 | | `:1182` |

**Lo que no mide, y quién lo mide.** No dice si hoy te nombran: eso es preguntarle a los motores, y lo
hace el mini-diagnóstico a mano en ChatGPT, Gemini y Perplexity (dist, /v3/diagnostico/, «Lo que este
chequeo no mide» y FAQ). Un puntaje alto no garantiza aparecer, porque los motores también citan lo que
publican otros (FAQ «¿Un puntaje alto significa que ChatGPT me va a recomendar?»). El chequeo no prueba
Gemini en vivo; prueba OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot y
Perplexity-User (`e8/hoja-de-voz.md:150-156`). Nombres de motor: el chequeo dice «ChatGPT, Claude y
Perplexity»; el mini-diagnóstico y los servicios, «ChatGPT, Gemini y Perplexity» (`hoja-de-voz.md:297-300`).

**Tres límites que el texto no puede tapar.**

1. **Google-Extended.** El chequeo lo trata como robot de entrenamiento («no te quita citas»). La
   documentación de Google dice que también decide si Gemini Apps usa tu sitio para responder en el
   momento (`marketing/encargos-otras-sesiones/encargo-chequeo-google-extended-y-estudio-marco.md:31-43`,
   leída el 14-oct). Decide Ramón. Mientras tanto, el texto nuevo no repite «bloquear a los de
   entrenamiento no te quita ni una cita».
2. **llms.txt y datos estructurados frente a Google.** Google escribe que para sus respuestas con IA no
   hacen falta archivos nuevos, archivos de texto para IA ni datos estructurados especiales; Ramón lo
   publicó («Ahí se cae llms.txt», `23-mie-query-fan-out/publicar.md:28-30`, `:57`). El chequeo suma 4
   puntos por llms.txt. El texto no promete que el marcado o llms.txt te metan en Google; lo que vale para
   ChatGPT y Perplexity es otra cosa, y el post de Ramón lo dice (`:32`).
3. **Lo que el chequeo no ve desde afuera.** Sitios tras Cloudflare podían salir mejor de lo real
   (`marketing/oficina/clientes/spindlelab.md:120-124`); la señal del servidor (`:979`) cubre ahora el
   rechazo por nombre, pero no el filtro por dirección de origen (`preguntas-y-hallazgos.md:41-44`).

**«El mismo chequeo con el que partimos cada proyecto»** (dist, /v3/, nota del hero): es la fase 01 del
método publicado («Todo parte con tu URL y el chequeo de 21 señales», dist, /v3/metodo/).

---

## 4 · Cifras y fuentes externas

**En el sitio y el blog del v3 no hay una sola cifra externa con su fuente.** Los 7 artículos no enlazan
ninguna fuente fuera de spindlelab (`grep` de URLs externas en `spindlelab-astro/src/data/blog-v3/*`: 0),
y el blog de producción tampoco (`spindlelab-site/blog/`).

| Lo que sí está verificado | Qué dice | Fuente y fecha | Uso |
|---|---|---|---|
| Google Search Central, funciones de IA | Query fan-out; requisito para salir como enlace: indexada y elegible para fragmento; no hacen falta archivos ni schema especiales | developers.google.com/search/docs/appearance/ai-features, leída el 23-sep-2026 (`23-mie-query-fan-out/publicar.md:48-57`) | Sí, con la URL. Es un mecanismo, no una cifra |
| Google, rastreadores comunes | Google-Extended controla entrenamiento **y** grounding en Gemini Apps; no afecta la inclusión en Google Search | developers.google.com/search/docs/crawling-indexing/google-common-crawlers, «Last updated 2026-07-14», leída el 14-oct-2026 (`encargo-chequeo-google-extended-y-estudio-marco.md:31-43`) | Con condición: decide Ramón (sección 3) |
| Ley 21.719 | Plena vigencia el 1-dic-2026; la prórroga (boletín 18.623-07) está en tramitación, último movimiento el 01-09-2026 | Diario Oficial, 13-dic-2024 (`marketing/redes/2026-09-septiembre/24-jue-tres-mitos-ley21719/publicar.md:120`); `marketing/inteligencia-mercado/2026-10-estudio-categoria-llena-y-sitio-nuevo.md:166`, leído 14-oct | Sí, pero comprobar la fecha el día que se publique (`e8/e8-antes-despues.md:48-50`) |
| Precios de la competencia | Seis de nueve directos no publican precios | `2026-10-estudio-categoria-llena-y-sitio-nuevo.md`, `:140`; vigente hasta el 15-ene-2027 (`:4`) | Con condición: comparación, solo con esa fuente y sin nombres |

| Cifra que circula sin fuente | Dónde | Uso |
|---|---|---|
| «cada vez más clientes le preguntan a la IA antes de buscar en Google» | `03-jue-carrusel-perder-clientes/lamina-6.html:8` | No |
| CTR «normal» de 3 a 5 % | `checkpoint-dia77-2026-09-21.md:75` | No |
| «Casi ningún estudio en Chile las tiene implementadas» | `lote-abogados-19ago.md:26` | No |
| «Los motores de IA citan 2 a 4 fuentes» | `marketing/brand/redes/carrusel-02/copy-post.md:15` | No |
| Rangos de precio del mercado («entre $200.000 y $2.500.000», «la mayoría de las PyME…») | /v3/blog/cuanto-cuesta-seo-tecnico-chile/ | No como cifra nueva: el artículo no muestra fuente |
| El vicepresidente de Search de Google: «el buen SEO es buen GEO» | `corpus.md:239` | Con condición: la URL no está en el repo; sin ella no se cita |

---

## 5 · Lo verificable de SpindleLab

| Hecho | Fuente | Uso |
|---|---|---|
| Ramón Vallejos, con nombre y retrato en el sitio. Más de cinco años en agencias: Universal McCann (producción de piezas para ocho marcas nacionales), Graphene IPG (la cuenta de LATAM Airlines en Chile, Perú, Ecuador y Colombia), Incrementa (pauta de retail y B2B), Maggiore (contenido y SEO de una cartera B2B). Comunicación Publicitaria en la UNAB y máster en Marketing Digital y E-commerce en la Universidad de Barcelona | `spindlelab-astro/src/pages/v3/nosotros.astro:89-94` | Sí. El CV es un conjunto cerrado y nunca se contrasta con esas agencias (`marketing/oficina/memoria/renata-copy.md:33-36`). La bio en sí es R4: verbatim |
| Una persona al frente, con agentes de IA y partners | `index.astro:273` («una persona, no una agencia de veinte»); `nosotros.astro:85` | Sí. «Equipo dedicado», «nuestro equipo», «expertos»: no (`hoja-de-voz.md:431`) |
| Precios publicados, con lo que incluye cada plan | `spindlelab-astro/src/data/oferta-v3.json`, `servicios-v3.json`; ratificados el 27-sep (`pendientes-traspaso-revisados.md:79`) | Sí, idénticos (brief §5) |
| Método publicado, fase por fase, con lo que cuesta cada una | dist, /v3/metodo/ | Sí |
| Chequeo público con su metodología | sección 3 | Sí |
| El instrumento apuntado primero a uno mismo: Verifica y Cumple revisó spindlelab.cl: 36 el 9-sep, 73 el 21-sep, 100 el 14-oct con otra forma de puntuar | `spindlelab-astro/src/data/obra-v3.json:56` | Con condición: solo en Trabajo (brief §5); se midió con el chequeo de la Ley 21.719, no con el de visibilidad (`encargo-chequeo-google-extended-y-estudio-marco.md:21-23`) |
| El formulario roto que encontramos revisándonos (E14) | `corpus.md:190` | Sí |
| Trabajo: dos sitios de Bernardo Combeau (cliente), Verifica y Cumple (producto propio), Raigal (concepto, «no existe») | `obra-v3.json:9-68` | Con condición: el permiso de Combeau es verbal, del 30-sep, sin respaldo escrito (`ventas/proyectos-en-curso.md:16`); Raigal lo revisa Ramón antes de mostrárselo a un prospecto (R9, `pendientes-traspaso-revisados.md:161-166`) |
| Combeau carga sus series solo desde el panel | `obra-v3.json:16`; `proyectos-en-curso.md:16` («creó series de prueba él mismo») | Sí |
| Correr el chequeo al terminar: antes y después en Desarrollo web; compromiso de 3 meses en Acompañamiento (decidido por Ramón el 14-oct) | dist, /v3/servicios/desarrollo-web/ y /acompanamiento-mensual/; `e8/e8-antes-despues.md:117`, `:215` | Con condición: es promesa de proceso. No hay en el repo un puntaje registrado del sitio de un cliente; no se escribe como algo ya hecho |
| El Acompañamiento mensual no se ha vendido nunca | `checkpoint-dia77-2026-09-21.md:129` | No se dice, pero manda: ningún texto puede sugerir clientes de Acompañamiento |

---

## 6 · Lo que no se puede usar

| Qué | Por qué | Fuente |
|---|---|---|
| Nombre o dominio de cualquier prospecto, y detalles que lo identifiquen (cifra exacta de artículos, ciudad chica, «30 años») | Sin permiso | manual `:440-442`; `marketing/oficina/clientes/spindlelab.md:109` |
| Testimonios, resultados de clientes, «empresas como la tuya confían» | No existen | brief §5; `hoja-de-voz.md:431` |
| SimpleTrust, «una asesora de inversiones chilena» como caso | Sin permiso, en pausa desde julio | `ventas/pipeline.md:32`; `marketing/estrategia-marketing-spindlelab.md:17` |
| Puntajes del chequeo de spindlelab.cl (83, 85, ~94) y de Verifica y Cumple (54) | Esperan el OK de Ramón | `e9/brief-e9.md:40`; `pendientes-traspaso-revisados.md:143-144` |
| El Índice de Citabilidad (SpindleLab 0/45) | La página se retiró (301 a /diagnostico/) y la medición mensual no se siguió | `spindlelab-astro/public/_redirects:1-2`; `test-menciones-ia.md:81-83` |
| Promesas de resultado: posiciones, «aparecer en ChatGPT», garantías | Regla de marca; el propio sitio dice que nadie puede | brief §5; dist, /v3/servicios/visibilidad-en-ia/ («No prometemos») |
| Todo lo de R2: monitoreo de menciones, «consultas medidas», share-of-voice, informes y su cadencia | Abierto; la regla del 27-sep no promete monitoreo continuo y la capacidad lo marca imposible hoy | `pendientes-traspaso-revisados.md:62-75`; `marketing/capacidad-servicios.md:55` |
| La implementación del Acompañamiento como algo resuelto | Falta definir cómo se accede al sitio del cliente | `capacidad-servicios.md:53` |
| «Ninguna herramienta del rubro publica su metodología» | Falso: Nitten la publica | `pendientes-traspaso-revisados.md:155` |
| «La mayoría de las agencias en Chile no habla de AEO/GEO» | Lo que se midió es otra cosa | `ventas/objeciones-y-perdidas.md:13` frente a `test-menciones-ia.md:51`, `:70`, `:78` |
| «Bloquear a los robots de entrenamiento no te quita citas», con Google-Extended dentro | Google dice lo contrario para Gemini | sección 3 |
| 36 → 73 → 100 fuera de Trabajo | E9 lo deja solo ahí | brief §5 |
| El Ads propio (104 clics, 0 contactos) | Decide Ramón | brief §7.1 |
| «2 de 2 clientes por referido» | El primero fue contacto directo; solo el segundo llegó recomendado | `ventas/pipeline.md:25-26` frente a `2026-10-estudio-categoria-llena-y-sitio-nuevo.md:17` |
| Vocabulario a no calcar: «crecimiento rentable», «resultados medibles», «share of voice», «soluciones a medida», «la IA cambió la búsqueda» | Lo dice toda la categoría | `2026-10-estudio-categoria-llena-y-sitio-nuevo.md:117`, `:122` |

---

## 7 · Las palabras del cliente

Literales, de correos reales, sin nombres.

| Quién, generalizado | Lo que escribió | Fuente |
|---|---|---|
| Estudio de abogados, 25-ago | «ya hemos estado trabajando en esto con una empresa de marketing digital» | `pipeline-reconstruido-2026-09-22.md:44` |
| Estudio de abogados, 11-sep, al cancelar la llamada que él mismo había pedido dos veces | «tengo una emergencia que abordar con mis socios. Me coordinaré para darte una fecha» | `:15` |
| Medio de gastronomía y hotelería, 17-ago, después de la llamada y la propuesta | «dame la próxima para que podamos conversar más tranquilos» | `:16` |
| Estudio de abogados con el sitio caído, 20-ago, 24 minutos después del correo | «Ok, envíame una cotización por favor» | `:40` |
| Estudio de abogados, 24-ago | «Ok, revisemos el asunto. Quedo atento.» | `:42` |
| Clínica dental, 10-ago | «Gracias.» | `:43` |
| Clínica de salud, 28-ago | rechazo: no quieren el servicio (sin texto literal en el repo) | `ventas/enviados/REGISTRO-enviados.csv`, fila 87 |
| Clienta de Desarrollo web, 24-sep | doce dudas antes de firmar, resumidas: qué puede editar sola, idiomas, cuentas a su nombre, cambio de técnico, costos recurrentes, tienda, fotos, correo, celular, dominios .com y .cl | `ventas/pipeline.md:25` |

**Lo que no hay.** Ninguna respuesta describe el problema con palabras del prospecto. Las preguntas «que
hace un cliente antes de elegir un estudio» de E2 son hipótesis nuestras, comprobadas contra el sitio, no
dichas por un cliente. La pregunta que lo habría sacado («¿qué es lo que más te preguntan los clientes
antes de contratarlos?») era para la llamada que se canceló (`reunion-*-2026-09-11.md:49`). Lo que sí
muestran estas frases: la objeción real del rubro principal es «ya tenemos agencia», y los que responden
se enfrían cuando el paso siguiente es una reunión.

Y la vara de Ramón para cualquier texto que lea el dueño: «el idioma del dueño, no el del técnico»; abre
con cómo le llega un cliente nuevo y quién se lo está llevando, los hallazgos son la evidencia
(`marketing/oficina/clientes/spindlelab.md:129-132`).

---

## 8 · El circuito, tramo por tramo, con lo que hay

El circuito es de Ramón (1-sep): el dueño ya paga para que lleguen y se corta en el último tramo, «justo
donde se cobra» (`manual-de-marca.md:261-263`; `direccion-creativa-campana-sep-REPORTE.md:13-21`). En el
post publicado tenía estaciones: «Meta empuja. Google empuja. Los dos llevan al mismo lugar: tu sitio.»
(`corpus.md:68-74`). Esto es lo que hay para cada tramo:

| Tramo | Qué pasa | Lo que lo prueba | Lo que falta |
|---|---|---|---|
| **Paga** | El dueño ya invirtió para que lleguen: pauta, un sitio, artículos | E1 (más de 250 artículos), E12, E13; E15 si Ramón lo suelta | Dato de cuántos prospectos pagan pauta: no hay |
| **Pregunta** | Alguien le pregunta a Google, a ChatGPT o a un colega | E16 (Google se abre en varias búsquedas), E17 (los motores nombran proveedores y citan rankings de terceros), E18 (llegó por recomendación) | La respuesta real en el rubro del lector (sección 1, «La escena que falta») |
| **Lee** | La máquina entra a tu sitio, o no | E1, E4, E5, E9; 11 de 49 en 2b; la señal más pesada del chequeo (`chequeo.js:979`) | |
| **Entiende** | La máquina sabe qué negocio eres, dónde y quién responde | E7, E8, E10, E11, E12, E13; 2a: 43, 64 y 63 de 69 | |
| **Encuentra** | La persona llega y encuentra lo que se pregunta antes de elegir | E2; 2a: 67 y 64 de 69 | |
| **Escribe** | El contacto llega | E3 y E6 (caídos), E14 (nuestro formulario) | |

Cada campo de la home arregla un tramo, que es lo que el brief pide retomar abajo (§4, punto 3): Desarrollo
web cuando el sitio no existe o se cae (E3, E6); Visibilidad en IA y la Auditoría cuando no te leen o no
te entienden (E1, E4, E10); Acompañamiento cuando sabes qué arreglar y no se ejecuta («Una auditoría te
dice qué hacer; este servicio lo hace y lo sostiene», dist, /v3/servicios/acompanamiento-mensual/).

---

## 9 · Lo que tiene que contestar Ramón, con su supuesto

1. **¿Se ofrece el mini-diagnóstico?** El 25-sep confirmó que «ya no se ofrece» (`marketing/brand/redes/perfil-instagram.md:13`);
   el v3 lo ofrece en todas las rutas (gratis, una página, 24 horas) y el brief lo pone en el paso 6.
   **Supuesto:** se ofrece en el sitio, y lo de septiembre era el bio de Instagram. Si no, el paso 6 queda
   solo con el chequeo.
2. **¿Corre él la escena en ChatGPT?** Tres preguntas del rubro (abogado laboral en Santiago, implantes en
   una ciudad de regiones, contador para pyme), un día fijo, captura y fuentes. **Supuesto:** el texto se
   escribe sin ella, con E16 y E17.
3. **¿Entra nuestro propio Ads (E15)?** **Supuesto del brief: no.** El formulario roto (E14) ya es público y
   cumple el mismo papel.
4. **Google-Extended.** **Supuesto:** el texto nuevo no dice nada sobre los robots de entrenamiento.
5. **Permiso escrito de Combeau.** **Supuesto:** Trabajo queda como está, con el permiso verbal del 30-sep.
