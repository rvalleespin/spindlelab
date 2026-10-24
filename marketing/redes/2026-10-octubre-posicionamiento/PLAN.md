# Instagram del posicionamiento nuevo: plan de los primeros 10 días hábiles

**Cuenta:** `spindlelab.cl` en Instagram · **Hecho por:** Marta (calendario) con Cata (texto) · **Fecha:** viernes 23-oct-2026 · **Versión:** v2, corregida el mismo día tras una revisión independiente (19 hallazgos al plan)
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. Nada está publicado y nada se publica solo: todo lo que sube lo sube él.
**Ventana:** el día 1 es el primer día hábil después de que el sitio nuevo esté publicado. Fecha tentativa: **martes 27-oct-2026**, a confirmar. Los 10 días hábiles van del martes 27-oct al lunes 9-nov.
**De dónde sale el mensaje:** `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` (v1.2, secciones 1, 2.2, 2.4, 2.6, 2.8, 11 y 14). Este plan no toca `spindlelab-astro/` ni `marketing/oficina/obras-web/`.

> ## Decisiones de Ramón antes de producir o publicar
>
> Son cuatro. Este plan no resuelve ninguna: cada una trae lo que recomienda Marta y por qué. Lo que depende de una decisión sin respuesta queda detenido, y se dice qué.
>
> **A. Pieza 3, «probado primero en lo nuestro».** Toca el chequeo de la Ley 21.719, que Ramón bajó de la línea de SpindleLab el 25-sep y que pertenece a Verifica y Cumple. **Recomendación:** sacarla de la primera tanda y poner en su lugar la imagen de los bots (hoy en el día 7; pasaría al slot del día 5). **Porqué:** la lámina 2 completa y un párrafo del pie de foto son los hallazgos de la ley, y el 25-sep Ramón bajó una pieza por esa misma razón. *Detiene:* producir y programar la pieza 3.
>
> **B. Bio y orden de la grilla mientras corre la campaña paga de Verifica y Cumple (hasta el 30-nov, tope $100.000).** ¿SpindleLab primero o Verifica primero? Son dos cosas: el orden de los enlaces del bio y qué publicaciones quedan fijadas. **Recomendación:** SpindleLab primero en el bio, y los reels de Verifica fijados en la grilla hasta el 30-nov (los fijados de SpindleLab pasan a ese día). **Porqué:** los anuncios de Verifica mandan directo a su dominio sin pasar por el bio, y quien llega al perfil desde un anuncio ve los fijados antes que el bio. El 30-sep se había dejado Verifica primero «mientras la campaña corra». *Detiene:* el orden de enlaces del día 1 y los fijados (2.2 y 2.5).
>
> **C. Precios en la imagen.** La regla del 31-ago (`marketing/rebranding-2026-08-brief-comunicacion.md`, addendum) dice que ninguna pieza gráfica de redes lleva precios propios en la imagen, con revisión «al cierre de mes»; no encontré una revisión escrita posterior. La lámina 2 de la pieza 2 trae los seis precios. **Recomendación:** levantar la regla por escrito, con fecha de revisión. **Porqué:** el sitio nuevo publica los precios en la home. Si no se levanta: rehacer la lámina sin cifras y mandar a `/servicios/`. (El 1-sep la regla se reencuadró: lo vetado es la cartera completa de las seis; un solo «desde» con «+ IVA, el detalle en el sitio» sí puede ir.) *Detiene:* la lámina 2 de la pieza 2 y el render final de esa pieza.
>
> **D. La pieza 1 usa tres hallazgos reales de prospectos que recibieron un correo en julio**, reconocibles para ellos (a uno le escribimos casi la misma frase que lleva la lámina 2). **Recomendación:** reemplazarlos por evidencia propia o por un conjunto no atribuible a nadie. **Porqué:** generalizar a «servicios financieros» no alcanza en un nicho chico, y la verificación en Gmail no cubre a quien sigue en secuencia de seguimiento. Si se mantienen: Ramón confirma en Gmail que ninguno respondió ni pidió baja y que ninguno está en secuencia activa el día de publicar. *Detiene:* programar la pieza 1.

## 0. Ocho cosas que Ramón tiene que saber antes de leer

1. **Las piezas se producen ahora y se publican cuando el sitio salga, salvo las del chequeo.** Los seis precios ya están vivos en el sitio de hoy (verificado el 23-oct). Lo que solo existe en el sitio nuevo es la revisión gratis (hoy `/contacto/` dice «diagnóstico gratis»), los cuatro pasos nuevos (el `/metodo/` vivo describe el método anterior) y el H1. Por eso la pieza 1, el método de la pieza 2 y la pieza 3 esperan el go-live, y lo que solo cita `/diagnostico/` (la parte del chequeo de la pieza 2 y la imagen de los bots) puede salir antes. Tenerlo todo aprobado antes del go-live es lo que acerca el día 1.
2. **La medición tiene una trampa que ya está en el código.** El script que guarda el UTM vive solo en `/contacto/` (`spindlelab-astro/public/contacto/index.html`, líneas 332 a 348). Si un enlace aterriza en la home y la persona navega a `/contacto/`, el UTM se pierde. Por eso todos los enlaces de este plan apuntan **directo** a `/contacto/` y no a `spindlelab.cl/?utm...`. El texto de contacto nuevo (copy sección 8) no menciona esos campos ocultos; el brief de la obra (§7) ya prohíbe tocar el formulario y los UTM, y falta comprobarlo con `curl` el día 1.
3. **Los hallazgos de julio del outbound se vencieron.** De nueve que volví a probar el 23-oct, cuatro siguen vigentes, cuatro caducaron y uno no se pudo verificar. La pieza 1 usa tres de los vigentes, que además son reconocibles para sus destinatarios (Decisión D). Resultado en la sección 9; la tabla con dominios vive en `marketing/outbound/verificaciones-plan-instagram-23oct.md`, no acá.
4. **La pieza 3 toca la línea de Verifica y Cumple, y no es solo una frase.** Cuenta la historia del chequeo de la Ley 21.719 corrido sobre nuestro propio sitio. La lámina 2 completa y un párrafo del pie de foto (de cinco) son los hallazgos de la ley, y la lámina 2 nombra la Ley 21.719. Queda **no programable hasta la Decisión A**; el reemplazo del slot ya está identificado (la imagen de los bots).
5. **No miré el canal hoy.** El estado de Instagram lo leí de `marketing/redes/QUE-HAY-PUBLICADO.md` (capturado el 25-sep, con anotaciones hasta el 16-oct). La regla de ese archivo dice que se mira el canal antes de planificar: está en el checklist del día 1.
6. **Instagram no es la palanca de este plan de ventas.** Con 19 seguidores, el feed lo ve casi nadie, y lo esperable por pieza son dígitos bajos (sección 1). El valor de estas piezas es que el perfil diga lo mismo que el sitio cuando alguien lo abre, y que Ramón tenga algo que compartir en historias.
7. **El calendario se recortó a lo que cabe en unas 3 horas de Ramón en las dos semanas** (sección 3.1): tres publicaciones de feed, una historia propia y la lectura del día 10. Lo demás quedó en reserva (sección 3.4), no borrado.
8. **El copy es un borrador.** `copy-secciones.md` tiene 13 decisiones abiertas. Las que cambian palabras de acá son la 1 («revisión» frente a «diagnóstico», que hoy los correos de outbound y el sitio vivo dicen «diagnóstico gratis») y la 2 (el plazo). Si cambian, se reescriben las láminas y el bio. El H1 elegido tampoco se probó con lectores del perfil (el copy pide probarlo con 2 o 3 personas reales antes de publicar).

## 1. Qué hace Instagram en el embudo de SpindleLab hoy

**El estado, sin adornos.** La cuenta tenía 19 seguidores el 25-sep (confirmar el día 1). Su única superficie con descubrimiento real son los Reels; el feed sirve de archivo. Desde fines de septiembre la cuenta lleva dos líneas visuales distintas: la de SpindleLab (oscuro, Gabarito, hilo de oro) y la de Verifica y Cumple (azul, lima, rosa, Archivo Black), esta última con una campaña paga de $100.000 hasta el 30-nov (encendida el 23-oct, promociona los reels y el carrusel ya publicados). Según el registro del repo, la última pieza de línea SpindleLab es del 3-sep.

**Qué se puede esperar.**
- **Vitrina (hipótesis, sin verificar).** La idea es que un prospecto que recibió un correo o una llamada abre el perfil antes de responder. Nada del repo la respalda: hasta donde revisé el 23-oct, ningún correo de outbound ni el guion de la llamada de 20 minutos lleva a la cuenta (cero menciones de «instagram» en `marketing/plantillas/emails-fase0.md`, `marketing/outbound/copiloto-outbound.md`, `ventas/guion-llamada-20min.md` ni `ventas/cola-calientes.md`). **Cómo se verifica:** en las llamadas, junto a «¿cómo llegaste?», preguntar **«¿miraste nuestro Instagram?»** y anotar el sí y el no. Si casi todos dicen que no, el perfil importa poco y el plan baja de ritmo. Alinear el bio con el sitio cuesta unos diez minutos, así que se hace igual.
- **Archivo que se puede compartir.** Tres piezas con evidencia real para mandar por correo o WhatsApp a quien pregunta «¿y cómo trabajan?».
- **Empuje manual.** El 30-sep Ramón compartió las piezas a historias en las dos cuentas (la personal y la de la empresa). La hipótesis de ese plan era que la pieza vive en la grilla y que la historia es lo que mueve gente; el registro no trae ninguna lectura de si lo hizo. Cada pieza de este plan trae su historia con enlace, y esta vez la lectura sí está planeada (sección 8).
- **Visitas del tráfico pagado de Verifica.** Quien llegue desde un anuncio y toque el perfil verá este bio. Hay que decidir qué enlace va primero (Decisión B).

**Qué no se puede esperar.** Alcance orgánico por algoritmo: con 19 seguidores, un post de feed no lo ve nadie fuera de lo que Ramón empuje. **Orden de magnitud para comparar el día 10:** con 19 seguidores más la red personal de Ramón, lo esperable por pieza son dígitos bajos de interacción y a lo más pocas decenas de alcance. La referencia más cercana que hay en el repo es LinkedIn: un post de texto del perfil de Ramón (380 contactos) hace hoy entre 50 y 76 impresiones, y el reel más su compartir sumó 55 (`marketing/encargos-otras-sesiones/reel-linkedin-publicado-19oct.md`, al 23-oct); en las ocho piezas publicadas desde el 13-oct no hubo una sola reacción ni comentario ajeno. Este plan no promete ninguna cifra de revisiones. El embudo se corta después del interés (checkpoint del día 77 y evaluación del 19-oct): más contenido arriba no arregla eso, y por eso la cadencia es corta a propósito.

**Cómo se mide** (en este orden de confianza). Mientras corra la campaña paga de Verifica y Cumple (hasta el 30-nov), la señal de interés en SpindleLab se lee **solo** en estas dos cosas:
1. **El correo del formulario.** `/contacto/` guarda `UTM Source`, `UTM Medium` y `UTM Campaign` en campos ocultos que viajan en el correo de notificación. Una revisión pedida desde acá debe traer `utm_source=instagram` y el slug de la pieza en `utm_campaign`. Es el único dato duro. Se lee aunque la persona haya llegado por el enlace del bio: quien pide una revisión de SpindleLab pidió algo de SpindleLab, venga de donde venga.
2. **Los stickers de enlace de las historias.** Cada historia lleva su sticker con su `utm_campaign`, y Insights de la historia da los toques al enlace. Es una señal de interés mucho más débil que el correo.

**Lo que NO se usa mientras corra esa campaña:** los toques al enlace del bio, las visitas al perfil y los seguidores nuevos. La campaña trae gente que llega por la ley, y esos números la mezclan con interés por SpindleLab: «hay toques pero ninguna revisión» daría un falso positivo.

Dos lecturas más que no son de Insights:
3. **La pregunta en la llamada de 20 minutos:** «¿cómo llegaste?» y «¿miraste nuestro Instagram?». Instagram no entrega referer (comprobado en producción), y quien tipea la dirección escrita en un pie de foto entra como «directo». Esto cubre lo que el UTM no ve y es la prueba de la vitrina.
4. **GA4 `generate_lead`.** Subcuenta: desde el 22-sep Analytics no carga sin permiso, y el evento solo se dispara en el formulario. Sirve de respaldo del correo, no de medida.

**Mecanismo opcional por mensaje directo.** El 3-sep se usó «comenta CIRCUITO y te mando el link»; el registro (`QUE-HAY-PUBLICADO.md`) no trae resultado ni métrica de esa pieza, así que no se sabe si funcionó y tampoco sirve de línea base. Si Ramón lo quiere, el pie de las piezas 1 y 3 puede cerrar con «comenta REVISIÓN y te mandamos el enlace», y el mensaje lleva el UTM de esa pieza. Cuesta responder a mano, y con 19 seguidores son pocos mensajes.

El campo «Llegó de» con lista cerrada (`instagram`, `linkedin`, `correo`...) existe en el formulario de Verifica, no en el de `spindlelab.cl`. Agregarlo al formulario nuevo es una decisión del equipo del sitio, no de este plan.

## 2. Perfil: biografía, enlaces, destacados y fijados

Todo esto es texto: lo aplica Ramón **desde el teléfono** (el enlace del bio solo se cambia ahí, nota del 5-oct) y **el día 1**, no antes, porque el bio nuevo habla del sitio nuevo.

### 2.1 Biografía (la propuesta queda condicionada)

**Propuesta A, 142 caracteres (el máximo es 150), solo con una condición:**

```
Marketing y crecimiento con IA para empresas que ya venden.
Te llegan consultas. Veamos dónde se cae el resto.
Revisión gratis de una página ↓
```

**Versión B, 136 caracteres, la que se aplica mientras la condición no se cumpla:** igual, con la línea 3 en `Chequea tu sitio gratis ↓` (la herramienta viva, `/diagnostico/`).

- **Condición de la línea 3 de A:** que Ramón **reconfirme por escrito que la revisión gratis está encendida**. El 25-sep el bio dejó de ofrecer el mini-diagnóstico («era una promesa que la cuenta no podía cumplir», `marketing/brand/redes/perfil-instagram.md`); A reintroduce la misma oferta con otro nombre. La revisión ya tiene entregas reales, pero el plazo no está decidido (una de octubre tardó 31 h contra 24 prometidas) y el copy deja abierta la decisión 1 («revisión» frente a «diagnóstico»). Hasta que se cierre todo eso, se aplica B.
- Línea 1: la línea sobre el titular del hero. Línea 2: el H1 elegido de la home (copy 2.1), **que todavía no se probó con lectores del perfil**. Línea 3 de A: el CTA principal.
- La línea 2 promete mirar el recorrido («dónde se cae el resto») y la revisión gratis cubre una página; es la pregunta abierta 1 del copy §15. Se deja porque es el H1 elegido, pero queda anotado.
- Si el H1 de la home cambia antes de publicar, cambia la línea 2. Si el sitio se atrasa, el bio actual se queda como está (A y B hablan del sitio nuevo).
- **Sale del bio actual** «SEO técnico y visibilidad en IA para empresas chilenas. / Le preguntamos a ChatGPT por tu negocio. / Chequea tu sitio gratis»: «le preguntamos a ChatGPT» es hoy un paso manual de Ramón y no una parte fija del servicio (decisión 7 del copy), y el posicionamiento ya no abre por SEO.
- **No entra:** «socio» (decisión 5), «24 h» o cualquier plazo (decisión 2), «especialistas», cifras.

### 2.2 Enlaces del perfil (Instagram permite varios)

| Orden | Título | URL |
|---|---|---|
| 1 | Pedir la revisión (solo con la reconfirmación de 2.1; si no, este lugar es «Chequear mi sitio» y la fila 2 no se agrega) | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| 2 | Chequear mi sitio | `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=bio-chequeo` |
| 3 | Verifica y Cumple (Ley 21.719) | `https://verifica.spindlelab.cl/?utm_source=instagram` (el que ya está puesto) |

El orden es el de la recomendación de la **Decisión B**. Si Ramón decide que Verifica va primero hasta el 30-nov, las filas 1 y 2 bajan un lugar y nada del calendario cambia; solo se pierde la ruta más corta hacia el formulario.

### 2.3 Nombre del perfil (opcional)

Hoy: «Spindlelab Consultoría». El campo Nombre es el que busca Instagram. Propuesta: `SpindleLab | Marketing con IA` (29 caracteres, el máximo es 30). Si «Consultoría» le importa más, se queda.

### 2.4 Destacados

Se arman con las historias de los días 1, 3 y 5 (los destacados salen de historias, no de posts), cuando existan, y solo si hay material:
- **Revisión:** la historia del sitio nuevo (día 1) y la historia de la pieza 1.
- **Precios:** la historia de la pieza 2, lámina de precios (según la Decisión C).
- **Pruebas:** solo si sale la pieza 3 (Decisión A) o, cuando pase de la reserva, el caso de Bernardo. Si no hay material, no se arma un destacado vacío.
Portadas solo tipográficas (una palabra, Gabarito, fondo `#0e141b`), sin ícono ni imagen.

### 2.5 Publicaciones fijadas (parte de la Decisión B)

Instagram deja fijar tres. **Mientras corra la campaña paga de Verifica y Cumple (hasta el 30-nov, tope $100.000) se mantienen fijados los reels de Verifica**: la campaña promociona esas piezas, y quien toca el perfil desde un anuncio ve los fijados primero. **El 30-nov** los fijados de SpindleLab pasan a ser la pieza 2 (antes de contratar) y la pieza del día 5 (la de los bots o la pieza 3, según la Decisión A), con el tercer lugar para el reel de Verifica con más alcance al leer Insights. Así la primera fila del perfil dice lo que SpindleLab es y deja a la vista la otra línea, sin que parezcan dos cuentas. La pieza 1 se fija solo si la lectura del día 10 la muestra como la que más revisiones atribuibles trajo.

### 2.6 Dos cosas del perfil que no son de este plan

La etiqueta **«Perfil generado con IA»** sigue pendiente (nota del 25-sep): para una marca que dice «marketing con IA» y vende criterio, decidirla a propósito y no por omisión. Y la grilla mezcla dos sistemas visuales: si la campaña de Verifica muestra tracción, la salida ya está escrita en `verifica-campana-linea-propia.md` (cuenta propia).

## 3. Calendario de 10 días hábiles

**Reglas del calendario.**
- Tope de **3 publicaciones de feed por semana, contando las de Verifica y Cumple** (el tope es de la cuenta, no de cada línea). Este plan usa **2 la semana del 26-oct y 1 la del 2-nov**, para que quepa Verifica y porque las horas de Ramón son pocas (3.1). Stories solo donde dicen algo que el feed no dice.
- La cadencia pactada de Instagram es una pieza a la semana (`marketing/oficina/memoria/marta-calendario.md`, «IG viernes 19:00»), y las directrices de la cuenta piden un lote de tres piezas para partir y recién ahí decidir el resto (`marketing/encargos-otras-sesiones/instagram-spindlelab-directrices.md` §8). Este plan es ese lote: tres publicaciones de feed y una historia propia.
- No encontré calendario de feed de Verifica en el repo; el ritmo que muestra `QUE-HAY-PUBLICADO.md` es de una pieza cada una o dos semanas, y sus anuncios promocionan lo ya publicado. **Antes del día 1, preguntarle a esa sesión si tiene algo agendado.** Si sale una pieza de Verifica en la semana 2, la que se mueve es la del día 5.
- Los tres slots de feed usan dispositivos distintos y entre cada par hay un día sin publicación (el README de `marketing/redes/` diferencia las familias por dispositivo, no por fondo). Orden de los días 1, 3 y 5: ficha tipográfica con hallazgos (pieza 1), cartera de precios y señales (pieza 2), y en el día 5 código con las líneas del `robots.txt` (bots) o ficha con el botón «Enviando…» congelado (pieza 3).
- Ventanas vetadas: ninguna. No hay feriado en días hábiles de la ventana (el 31-oct cae sábado y el 1-nov domingo; confirmar en el calendario oficial). Si Ramón agrega una (viaje, semana sin horas), se escribe como fila y se corre el calendario.
- **El UTM de los enlaces** va solo en bio y stickers de historia (los enlaces del pie de foto no son clicables). El pie de foto escribe la dirección sin UTM: `spindlelab.cl/contacto`. Base de todos los UTM de abajo: `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=<slug>`.

| Día | Fecha tentativa | Slot | ¿Necesita el sitio nuevo? | Pilar | Gancho (primera línea) | Evidencia | CTA (slug del UTM) | Estado |
|---|---|---|---|---|---|---|---|---|
| 1 | Mar 27-oct | **Feed · carrusel 5 láminas** (pieza 1) | **Sí**: `/contacto/` con la oferta de revisión y los campos de UTM | Dónde se cae una consulta | «Entre que alguien te busca y te compra, una consulta puede caerse en cuatro lugares.» | `copy-secciones.md` §2.2 y §2.4; `outbound/semana-02/lote-1-frente-a.md` §1, §4, §5; `spindlelab-astro/public/diagnostico/index.html` | Revisión de una página · `donde-se-cae-una-consulta` | producida; **no programar hasta la Decisión D, la reconfirmación de la revisión (2.1) y el go-live** |
| 1 | Mar 27-oct | **Story · 2 cuadros** | **Sí**: necesita la captura de la home publicada | El sitio nuevo | «El sitio nuevo ya está publicado.» | `copy-secciones.md` §2.1 y §2.9; captura de la home ya publicada | Revisión · `sitio-nuevo-story` | story (se produce el día 1) |
| 2 | Mié 28-oct | sin publicación | | | | | | |
| 3 | Jue 29-oct | **Feed · carrusel 6 láminas** (pieza 2 completa) | **Sí**: la lámina 3 usa los cuatro pasos nuevos de `/metodo/` y el cierre ofrece la revisión | Lo que se ve antes de contratar | «Puedes leer cuánto cuesta, cómo trabajamos y cómo medimos antes de hablar con nadie.» | `copy-secciones.md` §2.4, §2.5, §2.6; las seis `spindlelab-astro/public/servicios/*/index.html`; `public/diagnostico/index.html`; `functions/api/chequeo.js` | Chequeo gratis (segundo: revisión) · `antes-de-contratar` | producida; la lámina 2 depende de la Decisión C |
| 3 | Jue 29-oct, **plan B** | **Feed · carrusel 4 láminas** (pieza 2A, el chequeo) | **No**: solo cita `/diagnostico/`, que ya está vivo | Qué mira la revisión | «Escribes tu dominio y ves 21 señales, ordenadas en tres preguntas.» | `public/diagnostico/index.html`; `functions/api/chequeo.js` | Chequeo gratis · `que-mira-el-chequeo` | por producir; sale **solo si el sitio no está publicado el 29-oct** (puede salir antes del go-live). Si el sitio sale a tiempo, sus láminas viajan dentro de la pieza 2 completa y no se publica aparte |
| 4 | Vie 30-oct | sin publicación (hueco para Verifica) | | | | | | |
| 5 | Lun 2-nov | **Feed · imagen única de los bots** (si A = no, lo recomendado) | **No**: solo cita `/diagnostico/` | Qué mira la revisión | «Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy.» | `spindlelab-astro/public/diagnostico/index.html` (bloque «¿Te pueden leer?»); `functions/api/chequeo.js` | Chequeo gratis · `bots-que-buscan-y-bots-que-entrenan` | guion; **se produce solo con las dos condiciones de la sección 5** |
| 5 | Lun 2-nov | **Feed · carrusel 5 láminas** (pieza 3, si A = sí) | **Sí**: `/contacto/` con la oferta de revisión | Probado primero en lo nuestro | «Antes de publicar el chequeo de la ley, lo corrimos sobre nuestro propio sitio. Salió mal.» | `ventas/casos-de-exito/verifica-y-cumple.md`; `copy-secciones.md` §2.6 y §11; `voz-spindlelab/corpus.md` §4 | Revisión · `probado-primero-en-lo-nuestro` | producida; solo si Ramón responde A = sí |
| 6 a 9 | Mar 3-nov a Vie 6-nov | sin publicación propia (cabe una pieza de Verifica) | | | | | | **reserva**: ver 3.4 |
| 10 | Lun 9-nov | sin publicación: **lectura de los 10 días** (sección 8) | | | | | | |

Notas por slot:
- **Día 1, story:** dos cuadros, uno con la captura de la home publicada y su H1, otro con «Empieza por una página» y el sticker de enlace a `/contacto/` (`sitio-nuevo-story`). No se produce antes del go-live: necesita la captura real.
- **Cada pieza de feed se comparte a historias** el mismo día, con el sticker de enlace y su slug. Es el empujón que ya se usó el 30-sep (sin lectura registrada de su efecto: sección 1). Ramón lo hace desde la cuenta de la empresa y desde la personal (un minuto).
- **Día 3, CTA:** esta es una de las dos piezas cuyo enlace de historia va a `/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar`, porque su gesto es «corre el chequeo» (la otra es la imagen de los bots, y la 2A si sale). El chequeo no captura leads: esas piezas no pasan por el correo del formulario, se leen por los toques al sticker, y **no cuentan para el mínimo de revisiones** de la sección 8.
- **Día 3, plan B:** la pieza 2 se parte en dos. La parte del chequeo (2A: portada nueva y las láminas 4 a 6, sin la línea chica que ofrece la revisión) no depende del sitio nuevo y puede salir antes del go-live; el método y el cierre con la revisión (2B: láminas 1 a 3 y la línea chica) solo salen tras el go-live. Detalle en la sección 5.
- **Día 5:** la pieza que ocupa el slot se revisa el vie 30-oct (3.1). Los bots no dependen del sitio nuevo: si hay que llenar un día antes del go-live, es la que va.
- **Hallazgos de prospectos (Decisión D):** la pieza 1 no se programa mientras el casillero de Gmail de la sección 3.3 esté abierto.

### 3.1 Presupuesto de horas de Ramón (unas 3 horas en las dos semanas)

Ramón tiene media jornada a la semana para todo, y el outbound va primero (`instagram-spindlelab-directrices.md` §8). Este plan usa **unas 3 horas en total**, con holgura; lo que no cabe quedó en reserva. Solo cuentan las tareas que hace él (marcadas [TÚ] en el checklist); las comprobaciones con `curl`, capturas y render son de una sesión.

| Momento | Qué hace Ramón | Tiempo |
|---|---|---|
| Tanda 0 (lun 26-oct) | Responde las decisiones A a D; revisa el bio, las piezas 1 y 2 renderizadas con sus pies y alt; reconfirma por escrito si la revisión está encendida | 45 min |
| Día 1 (mar 27-oct) | Aplica el bio y los enlaces desde el teléfono (10), publica la pieza 1 y la comparte a historias en las dos cuentas (10), sube la historia del sitio nuevo (10) | 30 min |
| Día 3 (jue 29-oct) | Publica la pieza 2 (o la 2A) y la comparte a historias | 10 min |
| Tanda 1 (vie 30-oct) | Revisa la pieza del día 5 (la imagen de los bots, o la pieza 3 si A = sí) | 15 min |
| Día 5 (lun 2-nov) | Publica esa pieza y la comparte a historias | 10 min |
| Gmail (antes del día 1) | Solo si la Decisión D mantiene los hallazgos: confirma que ninguno respondió ni pidió baja | 10 min |
| Tanda 2 (lun 9-nov) | Lectura de los 10 días (sección 8) | 20 min |
| **Suma** | | **140 min (2 h 20 min)** |

Quedan unos 40 minutos de margen para responder mensajes directos y para lo que se alargue. No se suma la lectura del Juez de la campaña de Verifica (días 7 a 10, entre el 30-oct y el 2-nov), que compite por las mismas horas. Si el tiempo se acorta, lo primero que se cae es la pieza del día 5, luego la historia del día 1; las piezas 1 y 2 no se tocan.

**Programar solo después de confirmar el go-live** (la home responde con el H1 nuevo y `/contacto/` conserva los campos de UTM). Programar un lunes para un martes y descubrir que el sitio no salió es la forma más barata de publicar una pieza que promete una revisión inexistente.

### 3.2 Para llegar antes

El plan no puede acelerar el sitio, pero sí lo que depende de este lado:
1. Las piezas, el bio y las historias quedan **aprobados y renderizados antes del go-live**. El día del go-live solo se saca la captura de la home y se pega el bio: 15 minutos.
2. **Lo que no necesita el sitio nuevo sale antes:** la parte del chequeo de la pieza 2 (2A) y la imagen de los bots solo citan `/diagnostico/`, que ya está vivo. Es la única palanca real de «llegar antes», porque los seis precios ya están vivos pero la revisión, el método y el H1 no.
3. El calendario es **relativo**: si el sitio sale el lunes 26, el día 1 es el lunes 26 y todo corre un día. La columna «¿Necesita el sitio nuevo?» dice qué se puede publicar y qué no si el sitio sale por partes.

### 3.3 Checklist del día 1

[TÚ] es de Ramón; [CC] es de una sesión de Claude.
- [ ] [TÚ] Mirar la cuenta en Instagram: seguidores hoy, bio actual, orden de enlaces, si sigue la etiqueta «Perfil generado con IA». Anotarlo en `QUE-HAY-PUBLICADO.md`.
- [ ] [CC] Confirmar el go-live con `curl`: la home trae el H1 «Te llegan consultas. Veamos dónde se cae el resto.» y `/contacto/` conserva `UTM Source`, `UTM Medium` y `UTM Campaign`.
- [ ] [TÚ] Reconfirmar por escrito si la revisión gratis está encendida, si no lo hizo en la tanda 0 (decide si el bio lleva la línea 3 de la propuesta A o la de B).
- [ ] [CC] Re-verificar los precios de la pieza 2 contra `spindlelab.cl/servicios/*` el mismo día (en el copy: «reverificar contra el sitio vivo el día de publicar»).
- [ ] [CC] Si la Decisión D mantiene los hallazgos: re-correr los tres hechos de la pieza 1 (comandos en `marketing/outbound/verificaciones-plan-instagram-23oct.md`).
- [ ] [TÚ] Si la Decisión D mantiene los hallazgos: confirmar en Gmail (no en archivos) que ninguno de los prospectos de origen de la pieza 1 respondió ni pidió que no lo escribieran, y que ninguno está en secuencia activa. **Puerta dura para programar la pieza 1.**
- [ ] [CC] Preguntarle a la sesión de Verifica si tiene feed agendado en la ventana.
- [ ] [TÚ] Aplicar el bio y los enlaces desde el teléfono.

### 3.4 Reserva: lo que se recortó y qué lo libera

Nada de esto está descartado. Entra al calendario si la lectura del día 10 lo pide o si Ramón libera horas.

| Pieza | ¿Necesita el sitio nuevo? | Por qué quedó en reserva | Qué la libera |
|---|---|---|---|
| **Imagen de los bots** (si A = sí y la pieza 3 ocupó el día 5) | No | Cabe un solo slot de feed en la semana 2 | Las dos condiciones de la sección 5 y horas de Ramón |
| **Historia «¿Prometen resultados? No.»** (era el día 8; `copy-secciones.md` §1.4 y §2.8) | Sí: el FAQ del sitio nuevo y el CTA a `/contacto/` | Es una historia propia más, y el límite se dice una sola vez | La lectura del día 10 o que Ramón lo pida |
| **Caso de sitio web de Bernardo** (era el día 9; carrusel de 4 a 5 láminas) | Sí: CTA de revisión y la sección Pruebas de la home | Faltan tres datos y cuesta producción (abajo) | Los tres datos de abajo |
| **Banco de preguntas**: «¿Cuánto cuesta un año completo?» (la hicieron las dos lecturas en frío), «¿Qué necesitan de mí para partir?» (copy §2.8) | Sí: el FAQ | Mismo costo de horas | La lectura del día 10 |

**Tres datos antes de producir el caso de Bernardo:** (1) registrar en `ventas/proyectos-en-curso.md` el **alcance** del permiso de caso público (concedido y confirmado por Ramón el 19-oct, pero sin alcance escrito: nombre, «fotógrafo», capturas de su sitio y su panel, «lo opera él» frente a la mantención acordada de $50.000 al mes); (2) capturas propias de `bernardocombeau.cl` y de su panel; (3) que Ramón confirme qué edita Bernardo por su cuenta, porque hoy lo único registrado es que «creó series de prueba» el 20-jul.

## 4. Los pilares de contenido

Salen de la sección 2 del copy oficial. Cada uno dice solo lo que hoy se puede probar.

| Pilar | Qué dice | Por qué es creíble hoy | Evidencia real | Lo que no dice |
|---|---|---|---|---|
| **1. Dónde se cae una consulta** | Entre que alguien te busca y te compra hay puntos donde se pierde; dos se ven desde afuera y dos se conversan | Es un problema que **una de las dos lectoras en frío** reconoció como propio («ese problema es el mío»; es una muestra de dos y no valida nada, `copy-secciones.md` §1.2). Los dos puntos visibles se sostienen con las señales publicadas del chequeo y con hechos verificados el 23-oct | `copy-secciones.md` §1.2, §2.2; `outbound/semana-02/lote-1-frente-a.md`; `public/diagnostico/index.html` (señal del título, bloque de acceso) | No dice cuántas consultas se pierden ni que un sitio con esos defectos haya perdido ventas. Los dos puntos que no se ven desde afuera (si el mensaje llega, cuánto tardan en responder) no tienen hallazgo real publicable. **Brecha declarada:** los únicos hallazgos reales son de lo que se ve desde afuera del sitio; el cuello de botella que nombró esa misma lectora era «de registro y seguimiento interno, no del sitio» (copy §15) y ninguna pieza tiene evidencia de eso |
| **2. Qué mira la revisión** | Primero si los robots pueden entrar, luego si te entienden, luego si te pueden citar; la revisión parte de un sitio, no de todo el negocio | La jerarquía 30/40/30 está publicada y cualquiera la repite: el 23-oct el chequeo devolvió 21 señales, 5 de acceso (30 puntos), 8 de entidad (40), 8 de citabilidad (30) | `functions/api/chequeo.js`; `public/diagnostico/index.html`; `copy-secciones.md` §6 (paso 01) | No dice que la revisión incluya la consulta real a ChatGPT: hoy es un paso manual (decisión 7). No dice que un puntaje alto haga que te citen |
| **3. Lo que se ve antes de contratar** | Precios de partida, método y chequeo están escritos y se pueden leer sin hablar con nadie | Es verificable en minutos. Los seis precios coinciden con el sitio vivo (verificado el 23-oct) | `public/servicios/*/index.html`; `copy-secciones.md` §2.4 a §2.6; `ventas/proceso-desarrollo-web-cliente.md` para las fases | Los precios son «desde» y más IVA; el valor final se cierra por escrito. «Cada fase termina con algo que apruebas» está probado en Desarrollo Web y no en los otros servicios (copy §11): en una pieza pública solo se dice acotado a un sitio web |
| **4. Probado primero en lo nuestro** | Antes de publicar el chequeo de la ley lo corrimos sobre nuestro propio sitio, salió mal y apareció un formulario que perdía mensajes | Es un hecho nuestro con consecuencia incómoda, ya publicado en LinkedIn el 21-sep y escrito en el sitio nuevo. Toca la línea de Verifica y Cumple (Decisión A) | `ventas/casos-de-exito/verifica-y-cumple.md`; `voz-spindlelab/corpus.md` §4 | No cita los puntajes 36 y 73 (el sitio hoy marca otro número y el copy §11 prohíbe citarlos). No es un caso de cliente ni de resultados |
| **5. El caso de sitio web de Bernardo** (en reserva) | Un fotógrafo con un sitio con panel de administración | Es el único caso público con permiso; el sitio está en línea (200 el 23-oct) | Celda de Bernardo en `ventas/proyectos-en-curso.md` (permiso de caso público concedido, confirmado por Ramón el 19-oct) y `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/modelo-de-negocio-v1-BORRADOR.md` §13 y Anexo A; `bernardocombeau.cl` | La pieza **tiene que decir** que es un caso de sitio web y no de crecimiento de ventas (copy §2.6). **Alcance del permiso sin registrar**, y que Bernardo edite solo lo que la pieza diría no está confirmado (único respaldo: «creó series de prueba», 20-jul). La fila de Bernardo en `proyectos-en-curso.md` sigue en la fase 5 del 20-jul y «Proyectos entregados» está vacía |

El límite de lo que se promete (copy §1.4) se dice **una vez y concreto**. Era la historia del día 8, que ahora está en reserva; mientras tanto no se repite como estribillo en las otras piezas.

## 5. Las tres piezas que se producen ya

Carpeta de cada una: `marketing/redes/2026-10-octubre-posicionamiento/<NN>-<slug>/`, autocontenida (fuentes `Gabarito.woff2` y `manrope.woff2`, `fondo-hilo.jpg` y `base.css` con rutas relativas, partiendo de `marketing/redes/2026-09-septiembre/_sistema/base.css`). Render con `marketing/redes/_tools/render.sh <lamina>.html 1080 1350` (4:5: la grilla del perfil recorta a 3:4 y un cuadrado pierde el borde del titular), y **mirar cada PNG**. Cada carpeta lleva su `publicar.md` con pie de foto, texto alternativo por lámina, UTM y checklist de marca. Piezas **tipográficas**: sin imagen generada, así que no corresponde la etiqueta de IA en la pieza.

Estilo: fondo `#0e141b` con el hilo de oro bajo velo, texto `#f2efe8`, etiquetas en `#2fa99b`, **un solo dorado `#c9a227` por lámina** (el punto del wordmark o un dato), Gabarito en títulos, Manrope en texto. Cero raya larga, cero Title Case, cero «¿Listo para...?». El texto que sigue es **base**: la versión final la cierra Cata al producir.

**Las carpetas ya renderizadas todavía llevan algunos textos de la v1 de este plan** (el gancho de la pieza 1 con su pie, alt e historias; la lámina 3 de la pieza 1; el pie de la lámina 3 de la pieza 2; la portada de la pieza 3). Se corrigen al re-renderizar desde el HTML, no editando el PNG, y no en este pase.

### Pieza 1 · `donde-se-cae-una-consulta` (carrusel, 5 láminas)
Pilar 1. Dispositivo: ficha tipográfica, un punto por lámina. Necesita del sitio nuevo: **sí** (`/contacto/` con la oferta de revisión y los campos de UTM). No se programa hasta la Decisión D y la reconfirmación de la revisión (2.1).
1. **Portada.** Etiqueta «Dónde se cae una consulta». Título: «Entre que alguien te busca y te compra, una consulta puede caerse en cuatro lugares.» Bajada: «Dos se ven desde afuera. Dos se conversan.»
2. **Cuando te buscan.** «El título de tu portada le dice a Google, y a una IA, qué eres y dónde.» Debajo: «En dos empresas de servicios financieros que revisamos, el título era una sola palabra: el nombre de la empresa. No decía qué hacen ni dónde.» Marca pequeña: «Revisado en octubre de 2026».
3. **Cuando entran.** «Una portada puede llegar vacía.» Debajo: «En un sitio de servicios financieros, el cuerpo de la portada llega vacío: todo el texto aparece solo cuando el navegador ejecuta JavaScript. Quien lee la página sin ejecutarlo no encuentra texto en ella.»
4. **Cuando escriben y cuando esperan.** «Los otros dos no se ven desde afuera.» Debajo: «Si el mensaje llega a alguien, y cuánto tarda esa persona en responder. Eso se conversa: veinte minutos por videollamada, si después de la revisión quieres seguir.»
5. **Cierre.** «Partimos por una página.» Debajo: «Nos pasas la dirección de tu sitio y te devolvemos por escrito lo más importante que vimos y por dónde partiríamos. Es gratis.» Pie: `spindlelab.cl/contacto`.

Qué no hace: no nombra a nadie, no pone ninguna cifra de pérdida, no promete plazo. **Tampoco dice qué hacen Google o ChatGPT con una portada de cuerpo vacío** (Googlebot ejecuta JavaScript, y el `<title>` y la descripción de ese sitio sí llegan): la lámina 3 habla solo del cuerpo. Cierre propio (ofrece la revisión); no repite el cierre de la pieza 3. Los tres hallazgos son los de la Decisión D: si Ramón elige reemplazarlos, las láminas 2 y 3 se rehacen con la evidencia nueva.

Cambió respecto de la v1: el gancho. «Una consulta puede caerse antes de que alguien te escriba» chocaba con las láminas 3 y 4, que ocurren después (cuando escriben y cuando esperan). El mismo ajuste va en el pie de foto, el texto alternativo de la lámina 1 y las historias.

Diferencia con el carrusel del 3-sep («Cinco cosas que las empresas serias están haciendo para perder clientes», serie «circuito»): esta pieza retoma el tema de por dónde se pierde un cliente, pero parte de hechos verificados en octubre y no de una lista de cinco prácticas (por su título). No hay resultado registrado de aquella, así que no sirve de línea base.

### Pieza 2 · `antes-de-contratar` (carrusel, 6 láminas; se parte en 2A y 2B)
Pilar 3. Dispositivo: cartera (filas con valor). **La parte del chequeo (2A) no necesita el sitio nuevo; la del método y el cierre con la revisión (2B) sí.**
1. **Portada** (2B: sí). Etiqueta «Lo que puedes revisar antes de contratar». Título: «Puedes leer cuánto cuesta, cómo trabajamos y cómo medimos antes de hablar con nadie.»
2. **Cuánto cuesta** (2B; **depende de la Decisión C**). Seis filas con el dispositivo `.cartera` de `base.css`: Auditoría SEO técnica desde $490.000 · Visibilidad en IA (auditoría) desde $400.000 · Google Ads, gestión desde $350.000 al mes (pauta aparte) · Gestión de redes desde $390.000 al mes · Sitio web a medida desde $390.000 · Acompañamiento mensual desde $590.000 al mes (mínimo 3 meses). Nota: «Precios de partida, más IVA, octubre 2026. El valor final se cierra por escrito después de la revisión.» Si la regla de precios no se levanta, esta lámina se rehace sin cifras («Los seis precios están publicados, con lo que incluye cada uno») y manda a `/servicios/`.
3. **Cómo trabajamos** (2B: sí, usa el `/metodo/` nuevo). Los cuatro pasos de `/metodo/`: 01 Revisión gratis · 02 Conversación y propuesta · 03 Implementación por fases · 04 Acompañamiento mensual. Pie: «En un sitio web, cada fase termina con algo que apruebas antes de seguir.» (La promesa solo está probada en Desarrollo Web: copy §11. Sin acotarla, la lámina la extendía a los cuatro pasos, incluidos el 01 gratis y el 04, que no tienen fases que aprobar.)
4. **Cómo medimos** (2A: no). «21 señales, tres preguntas.» ¿Te pueden leer? 30 puntos · ¿Te entienden? 40 · ¿Te pueden citar? 30. «Escribes tu dominio. Gratis, sin dejar tu correo.»
5. **Lo que no mide** (2A: no). «No mide si hoy te citan. Eso depende de que te mencionen en fuentes que la IA lee, y no se sabe leyendo tu sitio. Un puntaje alto tampoco garantiza que ChatGPT te recomiende.»
6. **Cierre** (2A: no, salvo la línea chica). «Córrelo sobre tu sitio, sin registro.» `spindlelab.cl/diagnostico`. Línea chica: «Si prefieres que lo veamos nosotros: spindlelab.cl/contacto» (2B: sí, ofrece la revisión).

**Cómo se parte.** *Pieza 2 completa* (las seis láminas) es la que sale el día 3 si el sitio ya está publicado. *Pieza 2A* es una variante de cuatro láminas para si el sitio se atrasa o para salir antes del go-live: **portada propia** (hay que producirla) y las láminas 4, 5 y 6 sin la línea chica. Su portada no dice «cómo medimos» sino «qué mira el chequeo», porque el sitio reserva «medir» para el protocolo de preguntas a los motores (`/diagnostico/`: «Es el protocolo que usamos para medir»), distinto de las 21 señales, que leen el sitio. *Pieza 2B* (portada, precios, método, línea chica) queda para el primer día hábil después del go-live y no se publica aparte si el sitio salió a tiempo.

Dependencia que revisar el día de producir y el de publicar: que la redacción de `/metodo/` publicada sea la del copy; si cambia, se re-renderiza la lámina 3. Los precios envejecen: por eso llevan la fecha y el pie de foto no los repite.

### Pieza 3 · `probado-primero-en-lo-nuestro` (carrusel, 5 láminas) · detenida hasta la Decisión A
Pilar 4. Formato **1080x1350 (4:5)**, como las piezas 1 y 2 (la v1 salió cuadrada y la grilla de 3:4 le cortaba el titular de la portada). Dispositivo: ficha con el botón «Enviando…» dibujado y congelado en la lámina 3 y el aviso con el botón activo en la 4 (sin foto ni captura de nadie). Necesita del sitio nuevo: **sí** (`/contacto/`). Voz plural. Sin puntajes, sin multas, sin fechas de vigencia, sin enlace a `verifica.spindlelab.cl`. **Contiene contenido de la Ley 21.719 en la lámina 2 y en un párrafo del pie de foto; no se produce ni se programa sin la Decisión A.** Texto vigente en `03-probado-primero-en-lo-nuestro/caption.md`.
1. **Portada.** Etiqueta «Probado primero en lo nuestro». Título: «Antes de publicar el chequeo de la ley, lo corrimos sobre nuestro propio sitio.» Debajo, en gris: «Salió mal.» (Se nombra «el chequeo de la ley» y no «nuestro chequeo», porque la pieza 2 presenta el chequeo de 21 señales de visibilidad en IA y quien vio ambas leería que ese salió mal.)
2. **Lo que tenía nuestro sitio.** Dos grupos con etiqueta. «Lo marcó el chequeo»: «Sin política de privacidad.» «Sin gestor de consentimiento.» «Lo vimos nosotros»: «Analytics y el Pixel de Meta corriendo antes de que alguien diera permiso.» (El chequeo solo ve si los rastreadores están en el código, no cuándo se activan; que corrían antes del permiso lo constató el equipo.) Nota chica: «El chequeo era el de la Ley 21.719 de datos personales. Ve si los rastreadores están en el código, no cuándo se activan.»
3. **Y apareció algo peor.** Formulario dibujado con el botón «Enviando…» detenido. «Un error dejaba el botón «Enviando…» pegado para siempre, y el mensaje no llegaba a ninguna parte.» Debajo: «El chequeo no lo había marcado.»
4. **Lo que no sabemos.** «Cuántos mensajes se perdieron así antes de que lo encontráramos.» Dibujo del mismo formulario con el aviso y el botón activo. Debajo: «Hoy, si el envío falla, el botón se reactiva y avisa.» (Hecho comprobable en el sitio vivo; reemplaza a «Lo arreglamos.»)
5. **Cierre.** «Pídenos la revisión de una página de tu sitio.» Debajo: «Es gratis y te respondemos por escrito.» y la dirección `spindlelab.cl/contacto` en grande.

Por qué el formulario es el sujeto: es lo que conecta con el pilar 1 (una consulta que no llega) y lo que hace distinta esta pieza de la campaña de la ley. **Pero no es una historia nueva para esta audiencia**: la contaron tres piezas de LinkedIn el 21 y 22-sep (la página, el compartir y el post personal) y el sitio nuevo la repite en la sección de pruebas (copy §2.6). Según `QUE-HAY-PUBLICADO.md` («Lo que este cuadro deja ver»), la audiencia de esas piezas es básicamente la red personal de Ramón, que es la misma que ve sus historias de Instagram. Por eso se trata como un toque más de la misma historia al mismo público, y no se programa cerca de una publicación de LinkedIn sobre el mismo tema.

### Las tres piezas anteriores (`marketing/redes/2026-10-octubre/`): destino
Esa carpeta tiene tres piezas de Instagram ya renderizadas en la línea oscura de SpindleLab. Ninguna entra a este calendario y ninguna queda en la cola de revisión de Ramón. No se mueven archivos en este pase; el destino es:

| Pieza | Destino | Motivo (una frase) |
|---|---|---|
| `01-carrusel-tres-mitos` | **Archivar** | Es contenido de la Ley 21.719 (los tres mitos), que pertenece a la campaña de Verifica y Cumple, y está hecha en la línea oscura de SpindleLab que Verifica dejó el 25-sep; el contenido ya salió en LinkedIn el 25-sep |
| `02-cifra-articulo-50` | **Archivar** | Es la misma ley (el artículo 50) y la misma línea visual, y su checklist sigue preguntando por la grilla de julio; si la sesión de Verifica quiere el texto, lo rehace en su línea propia |
| `03-lo-que-no-se-ve` | **Archivar** | Es la pieza que Ramón publicó y bajó el 25-sep por quedar fuera de la línea de Verifica; su propio `publicar.md` dice que el argumento se rehace en el sistema de Verifica |

### Qué se produce después, y no ahora
- **Imagen única de los bots** (dispositivo código, con las líneas del `robots.txt`). Gancho: «Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy.» El «de hoy» importa: el sitio y el chequeo hablan de las respuestas de hoy, no de siempre. **Se produce solo si se cumplen las dos condiciones:**
  1. **Fuente primaria.** Citar la documentación oficial de OpenAI y de Anthropic sobre la distinción entre rastreadores que buscan en vivo y rastreadores que entrenan (el chequeo la publica, pero una pieza que corrige un mito merece fuente primaria), con la fecha de consulta.
  2. **Los diagnósticos ya enviados, alineados.** **Nota para la troncal:** un lote anterior presentó que un sitio bloqueaba GPTBot y ClaudeBot como «el hallazgo más fuerte del lote» (`marketing/outbound/semana-03/lote-1-frente-b.md`, prospecto 7), y el chequeo público dice lo contrario: bloquear a los que entrenan no quita citas hoy, y lo que borra de las respuestas de hoy es bloquear a los que buscan en vivo. Antes de publicar la imagen, conviene que la troncal alinee los diagnósticos y correos ya enviados (y la plantilla del copiloto de outbound) con esa postura, para no contradecir en público lo dicho en privado.
- **Caso de Bernardo, historia «¿Prometen resultados?» y banco de preguntas:** en reserva, con sus condiciones en la sección 3.4.

## 6. Lo que NO se puede publicar todavía

Lo que el posicionamiento pediría y hoy no tiene evidencia:

| Contenido | Por qué no |
|---|---|
| Resultados de cualquier tipo: más consultas, más ventas, «subimos X%», «te cita ChatGPT» | No existe ningún cliente medido con mejora de ventas, ni un diagnóstico pagado, ni una entrega de analítica o CRM (copy §0.1) |
| Testimonios y logos | No hay ninguno. Los dos clientes que existen (Bernardo y María Loreto) son de Desarrollo Web |
| Casos de crecimiento | El único caso público es de sitio web, y debe decirse así |
| El caso de María Loreto (Módulo 369) | Cliente en ejecución desde octubre, sin permiso de uso público y sin entrega terminada |
| «Antes y después» de un cliente | Ningún cliente lo tiene. El único antes y después real es el nuestro, y sin puntajes |
| Acompañamiento mensual en acción: informes, reuniones, cadencia | Cero clientes de pago. La cadencia (mensual o quincenal) está sin decidir (decisión 8) |
| Capacidades sin entrega: analítica, CRM, automatización, seguimiento de ventas | La brecha que las lecturas en frío marcaron y que el modelo todavía no cubre con una entrega real |
| «Cómo usamos la IA por dentro»: agentes, qué hace la IA y qué hace Ramón | Decisión 4 pendiente; el 22-sep Ramón pidió no contarlo en cotizaciones |
| Cifras agregadas del chequeo o del outbound («X% de los sitios...», tasas de respuesta, menciones de IA) | Son internas y la muestra no es representativa |
| Hallazgos con nombre de empresa, o reconocibles | Regla de marca: los prospectos se generalizan. **La pieza 1 usa tres hallazgos que sus destinatarios podrían reconocer: Decisión D** |
| **Cartera completa de precios en una imagen** | Regla del 31-ago (reencuadrada el 1-sep): lo vetado es la lista de las seis soluciones en una imagen; un solo «desde» con «+ IVA, el detalle en el sitio» sí puede ir. **La lámina 2 de la pieza 2 es la cartera completa: Decisión C** |
| La consulta real a ChatGPT como parte fija de la revisión | Es un paso manual de Ramón (decisión 7) |
| Cualquier plazo («24 horas», «un día hábil») | Decisión 2 pendiente; una revisión de octubre tardó 31 h contra 24 prometidas |
| Disponibilidad («pocos proyectos a la vez») | Una lectora no lo creyó; el copy lo deja en un solo lugar del sitio, no en redes |
| La palabra «socio» | Decisión 5: los dos lectores la entendieron como «proveedor por fases» |
| Continuidad del servicio si Ramón no puede | Pregunta abierta de las lecturas; hoy no hay respuesta escrita |
| Contenido de la Ley 21.719 en la línea de SpindleLab | Es de la campaña de Verifica y Cumple. **La pieza 3 lo toca** (lámina 2 y un párrafo del pie de foto son los hallazgos de la ley), así que no se produce ni se programa hasta la Decisión A |
| La oferta de «revisión gratis» en el bio antes de la reconfirmación | El 25-sep el bio dejó de ofrecer el mini-diagnóstico por no poder cumplirlo (2.1) |
| Reels de Ramón cara a cámara con este mensaje | Es la mejor superficie para descubrimiento, pero cuesta horas que Ramón no tiene en estas dos semanas. Se decide con la lectura del día 10 |

## 7. Riesgos y supuestos

**Supuestos.**
- El sitio nuevo se publica el martes 27-oct (a confirmar). Todo el calendario se mueve junto con esa fecha.
- Ramón tiene unas 3 horas en estas dos semanas: media jornada a la semana para todo, y el outbound va primero (directrices del 25-sep, §8). Presupuesto en 3.1.
- La campaña paga de Verifica y Cumple corre hasta el 30-nov (tope $100.000) y no se pausa por este plan.
- La cuenta sigue en 19 seguidores. Si hoy hay otra cifra, no cambia el plan.
- Las voces: plural de marca en toda la cuenta; el singular es del perfil personal de Ramón.

**Riesgos.**
1. **El sitio se atrasa o sale por partes.** Las piezas 1, 2B y 3 prometen una revisión y un método que hoy el sitio vivo no tiene. Mitigación: se programan solo después del go-live confirmado, y la pieza 2A o la de los bots sirven de puente porque no necesitan el sitio nuevo.
2. **La medición se rompe sin que nadie lo note.** El script de UTM vive solo en `/contacto/` y el copy nuevo del formulario no menciona los campos ocultos. Mitigación: los enlaces van directo a `/contacto/` y el día 1 se comprueba con `curl`. El brief de la obra (§7) ya prohíbe tocar el formulario y los UTM; pedir al equipo del sitio que los conserve y, si quiere, que agregue el campo «Llegó de».
3. **La pieza 3 puede repetir el error del 25-sep.** Ramón ya bajó una pieza de SpindleLab sobre el chequeo de la ley. La pieza 3 pone el formulario como sujeto, pero la lámina 2 completa y un párrafo del pie de foto son los hallazgos de la ley, y la lámina 2 la nombra; no es «una frase de contexto». **Decisión A** (recuadro del inicio). Si dice que no, el slot del día 5 es la imagen de los bots y la historia del formulario vive solo en LinkedIn y en el sitio. Si dice que sí, se puede acortar la lámina 2 y ese párrafo a lo mínimo, o reescribir la pieza solo con el formulario.
4. **El enlace del bio y los fijados.** El tráfico pagado de Verifica llega por anuncios directos, pero quien toque el perfil desde un reel verá el bio y los fijados. **Decisión B** (recuadro del inicio).
5. **La evidencia caduca.** De nueve hallazgos de julio que volví a probar, cuatro ya no se sostienen y uno no se pudo verificar. Los tres que usa la pieza 1 se verificaron el 23-oct y se re-verifican el día de producir. Los precios y las 21 señales también.
6. **Reconocimiento.** Los tres hallazgos de la pieza 1 vienen de prospectos que recibieron un correo en julio. Se generalizan («dos empresas de servicios financieros», «un sitio de servicios financieros»), pero el dueño podría reconocerse, y la confirmación en Gmail de que no respondieron ni pidieron baja no cubre a quien sigue en secuencia ni a quien se reconoce en un hallazgo escrito casi igual. **Decisión D** (recuadro del inicio). Si la pieza usa la variante «tres de tres empresas», se cuentan los tres reales y no dos.
7. **Inconsistencia con lo ya dicho en privado.** Una versión previa del diagnóstico de un prospecto trataba como hallazgo mayor que su `robots.txt` bloqueaba GPTBot, ClaudeBot y otros. El chequeo público dice lo contrario: bloquear a los que entrenan «no te quita ni una cita»; lo que borra de las respuestas de hoy es bloquear a los que buscan en vivo. **Ninguna pieza usa el bloqueo de entrenadores como ejemplo de consulta caída**, y la de los bots explica la diferencia. Nota para la troncal en la sección 5.
8. **Nada de esto prueba el posicionamiento.** Con 19 seguidores, Instagram no separa el efecto del sitio nuevo del efecto del seguimiento, y mientras corra la campaña paga el bio y las visitas al perfil están contaminados (por eso no se leen). Los cortes del 19-nov y el 3-dic miden las dos cosas juntas (copy decisión 0); lo que salga de Instagram es una señal más, no la medida.
9. **Repetición de forma.** Las aperturas de las piezas («Entre que alguien te busca...», «Puedes leer...», «Antes de publicar...») y sus cierres están variados a propósito. Antes de cada `publicar.md`, correr el chequeo de `pulso-redes`: primeras palabras de las últimas cinco publicaciones y del cierre.
10. **La lámina de precios contradice una regla vigente.** La lámina 2 de la pieza 2 es la cartera completa que la regla del 31-ago veta. **Decisión C** (recuadro del inicio).
11. **Las horas de Ramón no alcanzan.** Presupuesto de 140 minutos en 3.1, más el Juez de la campaña de Verifica entre el 30-oct y el 2-nov. Si se acortan, se cae primero la pieza del día 5, luego la historia del día 1.

## 8. Cómo se lee todo esto el día 10

Lunes 9-nov, 20 minutos, con el correo del formulario, Insights de las historias y las notas de las llamadas abiertos.

**Qué se lee como señal de interés en SpindleLab (solo esto):**
1. Revisiones pedidas con `utm_source=instagram` en el correo del formulario, con el slug de cada una en `utm_campaign`, y qué dijo cada persona en la llamada sobre cómo llegó.
2. Toques al sticker de enlace de cada historia.

**Qué no se lee mientras corra la campaña paga de Verifica (hasta el 30-nov):** los toques al enlace del bio, las visitas al perfil, el alcance de la grilla y los seguidores nuevos. Se anotan por curiosidad, pero no deciden nada.

**La vitrina:** contar en las llamadas del período cuántas personas respondieron que miraron el Instagram a la pregunta «¿miraste nuestro Instagram?». Si casi nadie lo hizo, la hipótesis de la vitrina se descarta y el perfil se deja como está.

**Qué cuenta como señal** (mínimo propuesto por Marta, sin base histórica; Ramón lo ajusta). Son dígitos bajos a propósito: con 19 seguidores es lo que cabe, y el plan no promete ninguna cifra.
- **Cero revisiones atribuibles es el resultado esperable**, no un fracaso. Lo más probable es que pase.
- **Una** revisión atribuible: anécdota. Se anota de dónde vino y qué dijo en la llamada; no cambia el ritmo.
- **Dos o más** revisiones atribuibles de personas que Ramón no conocía antes: señal. Recién ahí se evalúa la siguiente apuesta, un Reel de Ramón con el mismo mensaje. Cuesta horas que hoy no hay: se decide ese día, no antes.
- **Toques a stickers:** menos de 5 en total entre todas las historias es ruido y no se interpreta. Cinco o más sin ninguna revisión: el mensaje llega y el paso siguiente no convence; se mira `/contacto/`, no el contenido.

Regla de decisión (no es una predicción, es qué hacer con lo que salga):
- **Dos o más revisiones atribuibles:** seguir con el ritmo y evaluar un Reel de Ramón, con la reserva (3.4) como banco.
- **Toques en los stickers pero menos de dos revisiones:** el mensaje llega y el paso siguiente no convence. Se mira `/contacto/`.
- **Cero revisiones y menos de 5 toques:** la cuenta funciona como vitrina de archivo. Bajar a una pieza por semana (o dejar la cuenta de SpindleLab sin cadencia) y no invertir más horas acá.

Después, actualizar `QUE-HAY-PUBLICADO.md` con lo que salió de verdad y pasar el texto publicado al corpus de voz.

## 9. Verificaciones del 23-oct-2026: resultado

La tabla con los comandos, los dominios de prospectos y el detalle vive en **`marketing/outbound/verificaciones-plan-instagram-23oct.md`** (archivo interno: no se copia a ninguna pieza). Acá solo el resultado:

- **Hechos de prospectos vueltos a probar: 9.** Cuatro siguen vigentes, cuatro caducaron y uno no se pudo verificar. La pieza 1 usa tres de los vigentes.
- **Precios:** los seis coinciden con el sitio vivo (y con el copy §2.5).
- **Chequeo:** devuelve 21 señales, 5 de acceso (30 puntos), 8 de entidad (40) y 8 de citabilidad (30). El puntaje del sitio actual no se cita.
- **Sitio vivo:** `/metodo/` describe el método anterior y `/contacto/` dice «diagnóstico gratis»; la redacción nueva solo existe en el sitio nuevo. `/contacto/` conserva los tres campos de UTM.
- **Bernardo:** el sitio de Bernardo responde en línea.
- **Fechas:** el 27-oct es martes; el 31-oct cae sábado y el 1-nov domingo.
- **Si algún hecho de la pieza 1 cambia** el día de producir, la lámina correspondiente se reescribe en pasado («en julio encontramos...») o se saca.

## 10. Historial

- **v1 (23-oct, tarde):** plan de 10 días con tres piezas, pieza 3 y caso de Bernardo programados.
- **v2 (23-oct, noche):** corregida tras una revisión independiente. Cuatro decisiones de Ramón al inicio; presupuesto de horas y calendario recortado con reserva; columna «¿Necesita el sitio nuevo?» y la pieza 2 partida; destino de las tres piezas de `2026-10-octubre/`; medición sin el bio ni las visitas al perfil mientras corra la campaña de Verifica, con un mínimo explícito; vitrina como hipótesis; bio condicionado; ajustes de evidencia (una de dos lectoras, permiso de Bernardo, «funcionó»), del gancho de la pieza 1, de las láminas 3 de las piezas 1 y 2 y de la portada de la pieza 3; tabla de verificaciones movida a `marketing/outbound/`.
