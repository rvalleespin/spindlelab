# Publicar · Imagen única «Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy»

**Canal:** Instagram `spindlelab.cl` · imagen única, **1080×1350 (4:5)** · archivo: `lamina-1.png`
**Estado:** PRODUCIDA, PARA REVISIÓN DE RAMÓN. **No publicada y NO programable** hasta que se cierren las puertas 2 y 3 de abajo. Nada sale de un borrador generado y el clic de publicar es suyo.
**Pieza 4 del plan** `marketing/redes/2026-10-octubre-posicionamiento/PLAN.md` (día 5, lunes 2-nov). Pilar 2: qué mira la revisión. Ocupa el lugar de la pieza 3 mientras la decisión A siga sin respuesta (opción segura); la pieza 3 queda en reserva (`03-probado-primero-en-lo-nuestro/RESERVA.md`).
**Etiqueta de IA:** no corresponde. La pieza es solo tipografía y código dibujado: sin imagen generada ni fotorrealismo. (La etiqueta «Perfil generado con IA» es de la cuenta, no de la pieza, y sigue pendiente: `PLAN.md` §2.6.)

## Qué decisión de Ramón la condiciona

| Decisión | ¿Afecta a esta pieza? |
|---|---|
| **A** (pieza 3, ley 21.719) | **Sí, es la que la pone en el calendario.** Con A = no (lo recomendado), esta pieza sale el día 5. Con A = sí, la pieza 3 toma el día 5 y esta pasa a la reserva (`PLAN.md` §3.4) |
| B (bio y fijados) | No |
| C (precios en la imagen) | No: la lámina no lleva ningún precio |
| D (hallazgos de prospectos) | No: la lámina no usa ningún hallazgo de ningún prospecto, ni descrito en general |

## Puertas duras: sin las tres cerradas, no se programa

`PLAN.md` §5 dice que esta imagen «se produce solo con las dos condiciones» (fuente primaria y diagnósticos alineados). La imagen está producida porque el texto y la fuente están listos, pero **no es programable**: la condición 2 sigue abierta y la 3 (nueva en esta revisión) también. Son puertas duras, no avisos. Cada una tiene dueño y fecha.

| # | Puerta | Dueño | Fecha límite | Cómo se sabe que cerró | Estado |
|---|---|---|---|---|---|
| **1** | **Fuente primaria citada.** Documentación oficial de OpenAI y de Anthropic, con fecha de consulta, en `fuentes.md` **y a la vista en el primer comentario** | Esta carpeta | Cumplida el 23-oct-2026; se vuelve a abrir el día de publicar | Las dos páginas releídas y comparadas con las filas 1 a 11 de `fuentes.md`; la fecha del comentario es la de esa relectura | **Cumplida** (se repite el día de publicar) |
| **2** | **Diagnósticos y correos ya enviados, alineados con la pieza.** `marketing/outbound/semana-03/lote-1-frente-b.md`, prospecto 7, presenta el bloqueo de GPTBot y ClaudeBot como «el hallazgo más fuerte del lote», y su borrador de correo dice que les impide leer y citar al prospecto. La pieza dice lo contrario. **No se sabe si ese correo salió** (el estado real vive en Gmail). Si salió, publicar la imagen contradice en público lo dicho en privado a una persona real, que puede verla. Detalle en `fuentes.md`, «Lo que contradice la pieza dentro del repo» | **La troncal** (Tomás), con Ramón para decidir qué hacer si el correo salió | **Viernes 30-oct**, el día en que Ramón revisa la pieza del día 5 (`PLAN.md` §3.1) | (a) Gmail leído por la troncal, no los archivos: si el correo del prospecto 7 salió, y qué respondió esa persona; (b) el lote y la plantilla del copiloto de outbound ya dicen lo mismo que la pieza (bloquear a los que entrenan no quita citas hoy; bloquear a los que buscan en vivo sí las quita); (c) si el correo salió, Ramón decide qué se le dice a esa persona antes de que vea la imagen | **ABIERTA**, no es de esta sesión |
| **3** | **`/diagnostico/` y el texto del chequeo dicen lo mismo que la pieza.** Hoy `spindlelab-astro/public/diagnostico/index.html` (línea 296) dice que bloquear a los robots que buscan en vivo, que incluye a ChatGPT-User, Claude-User y Perplexity-User, «te borra de las respuestas de hoy». OpenAI dice que las reglas del robots.txt pueden no aplicar a ChatGPT-User, y Perplexity que Perplexity-User en general ignora el robots.txt; Anthropic dice «puede reducir» para Claude-User. El botón de la imagen manda a esa página: quien llega y lee una frase más fuerte que la de la imagen ve una contradicción. Detalle en `fuentes.md`, «Lo que nuestro sitio dice más fuerte que la documentación» | **Diego** (texto de `/diagnostico/` y de `functions/api/chequeo.js`), con la troncal | **Viernes 30-oct** | `curl -sL https://spindlelab.cl/diagnostico/` ya no afirma «te borra de las respuestas de hoy» para ChatGPT-User, Claude-User ni Perplexity-User, ni «el efecto es inmediato» (las líneas 944, 947, 955 y 1000 de `chequeo.js` dicen lo mismo que la documentación). El comando de abajo imprime el pasaje | **ABIERTA** |

**Si el viernes 30-oct la puerta 2 o la 3 siguen abiertas:** la pieza no se programa. **El día 5 (lunes 2-nov) queda sin publicación**, o va otra pieza que no dependa de ellas (la reserva de `PLAN.md` §3.4 depende casi toda del sitio nuevo; si el sitio ya salió, se mira ahí). Esa es una consecuencia que `PLAN.md` §3 y §5 todavía no recogen: dan este slot por resuelto con «se produce solo con las dos condiciones». **Aviso para la troncal/Marta:** esta carpeta no edita `PLAN.md`; conviene que el PLAN diga que el día 5 es condicional a las puertas 2 y 3, con esta fecha límite, y no un slot ya asignado.

Comando para la puerta 3 (se corre el día de la revisión y el día de publicar):

```
curl -sL https://spindlelab.cl/diagnostico/ | python3 -c "
import sys,re,html
t=html.unescape(re.sub(r'<[^>]+>',' ',sys.stdin.read())); t=re.sub(r'\s+',' ',t)
i=t.find('te borra de las respuestas de hoy')
print('sin la frase' if i<0 else t[max(0,i-420):i+160])"
```

## Depende del sitio nuevo: **no**

La pieza solo cita `/diagnostico/` (el chequeo), que está vivo: el 23-oct respondió 200, con el UTM de esta pieza, y trae el bloque «¿Te pueden leer?» con la separación entre robots que buscan y robots que entrenan. **No ofrece la revisión, no menciona el método nuevo, no lleva precios**, así que no hace falta esperar al go-live del sitio nuevo. Es la pieza que puede ocupar un día antes del go-live si hace falta llenarlo (`PLAN.md` §3). Si el sitio nuevo se publicó antes de subirla, se confirma que `/diagnostico/` conserva ese bloque (checklist).

## Cuándo

**Lunes 2-nov-2026, 19:00 (hora de Chile). Tentativo.** Las 19:00 son el horario con el que se programó el último carrusel de línea SpindleLab en esta cuenta (3-sep, 19:00); con 19 seguidores no hay dato para una hora mejor y no se inventa una razón. Si el sitio sale otro día, esta pieza no cambia de fecha por eso, porque no depende de él. Entre el carrusel del día 3 (jue 29-oct) y esta hay un día sin publicación (vie 30-oct), que queda libre por si Verifica tiene algo.

- **Tope de la cuenta:** 3 publicaciones de feed por semana, **contando las de Verifica y Cumple**. Esta es la primera de la semana 2 del plan. Si Verifica tiene algo agendado, la que se mueve es esta, no la del día 3.
- **Misma tarde, en historias:** compartir el post a historias en las dos cuentas (empresa y personal) con el sticker de abajo. La pieza vive en la grilla y la historia es lo que la mueve. Un minuto.

## Texto final

El pie de foto exacto, listo para copiar, está en `caption.md` (sección 1). Primera línea, la que se ve antes del «más» (66 caracteres):

> Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy.

Hashtags opcionales: `#SEO #IA #ChatGPT #Chile`. El texto alternativo (120 caracteres) está en `caption.md` (sección 3). La dirección va escrita `spindlelab.cl/diagnostico`, sin parámetros, porque en un pie de foto no se puede tocar.

## Primer comentario

```
Para ver el robots.txt de tu sitio, escribe tudominio.cl/robots.txt en el navegador.
El chequeo lo lee por ti: spindlelab.cl/diagnostico

Fuentes, consultadas el 23-oct-2026:
OpenAI: developers.openai.com/api/docs/bots
Anthropic: support.claude.com, artículo 8896518
```

La línea de fuentes es nueva (revisión independiente del 23-oct, noche): la pieza corrige un mito y las dos páginas oficiales vivían solo en `fuentes.md`, que es interno. El día de publicar se abren las dos páginas y se pone en el comentario la fecha de esa lectura. No lleva UTM porque son direcciones de OpenAI y de Anthropic, no nuestras.

## Historia (el empujón de la misma tarde)

- **Cuenta de la empresa (plural):** `Un robot entrena modelos y otro busca para responder. Bloquear al primero no te saca de la búsqueda de ChatGPT.`
- **Cuenta personal de Ramón (singular):** `Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy. Lo leí en la documentación de OpenAI y en la de Anthropic.`
- **Sticker de enlace, texto «Chequear mi sitio»:**
  `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=bots-que-buscan-y-bots-que-entrenan`

El pie de foto y el comentario llevan la dirección escrita **sin UTM** porque no son clicables. Quien la tipee entra como «directo»: se cubre preguntando «¿cómo llegaste?» en la llamada.

---

## Checklist previo (en este orden)

- [ ] **Decisión A de Ramón.** Si A = sí, esta pieza no va el día 5 (pasa a la reserva). Si sigue sin respuesta, rige la opción segura: va esta.
- [ ] **PUERTA DURA 2 · La troncal: diagnósticos y correos ya enviados, alineados** con lo que dice esta pieza, y Gmail leído para saber si el correo del prospecto 7 salió. **Fecha límite: viernes 30-oct.** Sin esto, no se programa (cuadro de arriba, puerta 2).
- [ ] **PUERTA DURA 3 · Diego: `/diagnostico/` y `chequeo.js` alineados** con la documentación (nada de «te borra de las respuestas de hoy» para ChatGPT-User, Claude-User ni Perplexity-User; nada de «el efecto es inmediato»). **Fecha límite: viernes 30-oct.** Se comprueba con el comando de arriba. Sin esto, no se programa (cuadro de arriba, puerta 3).
- [ ] **Si el viernes 30-oct la 2 o la 3 siguen abiertas:** el día 5 queda sin publicación o va otra pieza que no dependa de ellas; avisar a la troncal para que `PLAN.md` §3 y §5 lo reflejen.
- [ ] **Sitio nuevo: no hace falta esperarlo.** Si ya está publicado, abrir `/diagnostico/` y comprobar que sigue dando el bloque «¿Te pueden leer?» y que el chequeo corrido sobre cualquier dominio nombra a los robots bloqueados.
- [ ] **Volver a abrir las dos páginas oficiales** (en `fuentes.md`, tabla de arriba) y comparar con las filas 1 a 11. La de OpenAI no trae fecha y las dos cambian sin aviso. Si algo cambió, se corrige `lamina-1.html` y el pie, y se vuelve a renderizar; no se republica el PNG viejo. **Poner en la línea de fuentes del primer comentario la fecha de esa relectura** (hoy dice 23-oct-2026) y comprobar que las dos direcciones del comentario abren (`developers.openai.com/api/docs/bots` y el artículo 8896518 de `support.claude.com`).
- [ ] **Ramón abre esas dos páginas antes de subir la historia personal**, que dice «lo leí». Dos minutos.
- [ ] **Preguntarle a la sesión de Verifica y Cumple** si tiene feed agendado esa semana (el tope es de la cuenta).
- [ ] **Mirar la cuenta en Instagram**: seguidores hoy, qué hay en la grilla, bio, orden de enlaces. Anotarlo en `marketing/redes/QUE-HAY-PUBLICADO.md`.
- [ ] **Chequeo de duplicación (`pulso-redes`): primeras palabras de las últimas cinco publicaciones del feed y su cierre.** Esta abre con un verbo en infinitivo («Bloquear a GPTBot…») y cierra en la dirección del chequeo; las piezas 1 y 2 del plan abren con «Entre que alguien te busca…» y «Puedes leer…». Las piezas 2 y 4 apuntan las dos al chequeo, con dos publicaciones de por medio en el calendario (jue 29-oct y lun 2-nov): si el feed trae otro cierre igual, se cambia.
- [ ] **Abrir `lamina-1.png` en el celular**, no solo en el computador: texto legible, nada pegado al borde. Mirar también el recorte 3:4 de la grilla del perfil: el gancho y el wordmark deben verse enteros (se revisó sobre el archivo y se ve completo; se vuelve a mirar en el perfil real).
- [ ] Subir la imagen, pegar el pie (`caption.md` §1), pegar el texto alternativo (§3), comentar al tiro (§5, con la línea de fuentes).
- [ ] Compartir a historias en las dos cuentas con el sticker de arriba.
- [ ] **Después de publicar:** recargar el perfil y confirmar que está, con el pie completo (los botones mienten); anotar hora real y enlace en `QUE-HAY-PUBLICADO.md`; a los 4 días, mirar Insights y los toques al sticker. **El chequeo no pasa por el correo del formulario: esta pieza no cuenta para el mínimo de revisiones del plan** (§8).

---

## Notas de publicación

- **Qué no es.** No recomienda bloquear ni dejar de bloquear a nadie, no promete que ChatGPT ni Claude te nombren, no nombra ninguna empresa, no usa ningún hallazgo de un prospecto (decisión D, opción segura) y no tiene cifras, precios ni plazos. Cada cosa que afirma tiene a su autor en la frase («OpenAI dice», «Anthropic dice»), su página en `fuentes.md` y las dos páginas a la vista en el primer comentario.
- **El alcance del «de hoy».** La documentación de OpenAI sostiene que GPTBot y OAI-SearchBot se manejan por separado y que lo que saca a un sitio de las respuestas de búsqueda de ChatGPT es bloquear al segundo. No dice nada sobre lo que un modelo ya aprendió antes. Por eso la lámina habla de las **respuestas de búsqueda**. El gancho se mantiene como se pidió; si Ramón prefiere uno literal, está en `fuentes.md`, sección «Qué sostiene el gancho».
- **Los dos bloques de código son ilustrativos.** Muestran la regla `User-agent` + `Disallow: /` de la que hablan las dos páginas; no son el robots.txt de ningún sitio real. El de `spindlelab.cl` permite a todos esos robots.
- **Qué lee el chequeo y qué no.** Lee el robots.txt que entrega el sitio. Si el sitio usa Cloudflare con reglas de bots de IA en el borde, puede no verlas, y el propio chequeo lo avisa. La CTA («Mira cuáles de estos bloquea tu sitio») promete leer el robots.txt, no el borde.
- **Por qué código y no ficha.** El plan reparte tres dispositivos distintos entre los slots de feed (ficha tipográfica el día 1, cartera el día 3, código el día 5), con un día de por medio. Este es el de código.
- **Por qué 4:5 y no cuadrado.** Como las piezas 1 a 3: la grilla del perfil recorta a 3:4, un 4:5 pierde unos 34 px por lado (dentro del margen de 80) y un cuadrado pierde unos 135.

## Chequeo de marca (hecho sobre el PNG, no supuesto)

- **Un dorado en toda la lámina:** el punto del wordmark (49 píxeles dorados, todos en x 286 a 292, y 1251 a 1258). Nada más es dorado.
- **Verde petróleo solo en la etiqueta** («Robots de IA y tu robots.txt», 26 px). Nunca en el cuerpo.
- **Cero serif.** Gabarito en el gancho, el wordmark y la dirección del pie; Manrope en el texto; monoespaciada del sistema solo dentro del dispositivo de código.
- **Cero raya larga o media** en la lámina, el pie, el comentario, las historias, estos archivos y el comentario de la primera línea de `base.css` (la raya se cambió por una coma el 23-oct, noche; el original sigue en `2026-09-septiembre/_sistema/base.css`, fuera de esta carpeta). Cero Title Case, cero «¿Listo para…?», cero pregunta retórica, cero «no X, sino Y».
- **Un solo conjunto de tres en la pieza** (ClaudeBot, Claude-SearchBot, Claude-User), y sus tres elementos son distintos. El límite («no garantiza que ChatGPT te nombre») se dice una vez, en el pie.
- **Contraste medido sobre el PNG:** texto gris `#9aa4b0`: 6,8 contra 1 dentro del recuadro y 7,4 contra 1 fuera de él. Etiqueta verde: 6,5 contra 1. Todo sobre 4,5.
- **Tamaños:** etiqueta 26 px; comentarios de código 26 px; nota y texto del pie 26 px; efectos del recuadro 28 px; reglas de código 34 px; gancho 77 px; dirección del pie 38 px. Nada bajo 26 px.
- **Márgenes:** todo el contenido queda entre x=81 y x=999, y el último elemento a 82 px del borde inferior.
- **Plural de marca y tuteo** en todo lo que dice la cuenta; el singular solo en la línea de la historia personal.
- **El PNG fue abierto y mirado** (no solo medido) después de cada ajuste de tamaño y de cortes de línea.

## Corrección tras la revisión independiente (23-oct, noche)

Cuatro hallazgos a esta pieza, de severidad media. La lámina no cambió; cambiaron el pie, el primer comentario y las puertas.

| Hallazgo | Qué se cambió | Dónde |
|---|---|---|
| **Afirmación.** «Anthropic dice que bloquear a estos dos puede restarte visibilidad» no tenía referente claro: se leía como ClaudeBot más Claude-SearchBot, y la página de Anthropic (releída el 23-oct, noche) trae ese aviso solo para Claude-SearchBot y Claude-User | «Anthropic dice que bloquear a Claude-SearchBot o a Claude-User puede restarte visibilidad.» | `caption.md` §1 y su nota, `fuentes.md` filas 9 a 11 |
| **Decisión.** Las condiciones 2 y 3 del PLAN §5 seguían abiertas y la pieza se daba por programable | Tres puertas duras con dueño y fecha límite (vie 30-oct); si siguen abiertas, el día 5 queda sin publicación o va otra pieza. Aviso a la troncal para que `PLAN.md` §3 y §5 lo reflejen | Esta carpeta, «Puertas duras» y checklist |
| **Afirmación.** Las fuentes primarias y la fecha de consulta vivían solo en `fuentes.md`, que es interno | Línea de fuentes en el primer comentario, con las dos direcciones y la fecha de consulta, que se actualiza el día de publicar | `caption.md` §5, `fuentes.md` fila 17, esta carpeta |
| **Formato.** Raya larga en la primera línea de `base.css` | Cambiada por una coma | `base.css` |

Lección que sigue vigente: «estos dos» o «ambos» sin referente claro es un defecto en una pieza que vive de distinguir entre robots; se nombra a cada uno.

## De dónde sale cada dato

`fuentes.md`, fila por fila, con la fecha de consulta (23-oct-2026). En corto:

| Dato | Fuente |
|---|---|
| GPTBot entrena; OAI-SearchBot es la búsqueda de ChatGPT; son independientes; bloquear a OAI-SearchBot saca el sitio de las respuestas de búsqueda | OpenAI, «Overview of OpenAI Crawlers» (`developers.openai.com/api/docs/bots`) |
| ClaudeBot entrena; Claude-SearchBot y Claude-User; «puede reducir la visibilidad» | Anthropic, artículo del 7-abr-2026 (`support.claude.com`, artículo 8896518) |
| El chequeo lee el robots.txt y nombra a los robots bloqueados; es gratis y sin registro | `spindlelab-astro/functions/api/chequeo.js` y `spindlelab-astro/public/diagnostico/index.html`, y una corrida en vivo del 23-oct |
| Límite «no garantiza que te nombre» | `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` §2.5 |

## Producción

Desde esta carpeta:

```
bash ../../_tools/render.sh lamina-1.html 1080 1350
```

Los estilos propios están en `bots.css`, que extiende `base.css` (copia de `2026-09-septiembre/_sistema/base.css`) sin redefinir tokens. Fuentes (`Gabarito.woff2`, `manrope.woff2`, `inter.woff2`) y `fondo-hilo.jpg` están copiadas acá con rutas relativas. Reciclar es volver a renderizar desde el HTML, nunca republicar el PNG.
