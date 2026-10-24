# Fuentes · Carrusel «Dónde se cae una consulta» (v2)

**Hecho el viernes 23-oct-2026, en la noche** (rehecha sobre la v1 de la tarde, con `PLAN.md` v2 §5 y las opciones seguras de las decisiones A, C y D). Este archivo es **interno**: no se copia a ningún texto público. Lista cada afirmación factual de la pieza con el archivo del repo que la respalda y lo que se comprobó ese día. Si una afirmación no tenía respaldo, se sacó de la pieza (sección 4).

**Regla de esta versión.** Ninguna afirmación se apoya en el sitio de un prospecto, y ningún prospecto aparece, ni identificable ni como «una empresa de…». Las láminas 2 y 3 describen la señal que mira el chequeo, no un caso. Por eso este archivo **no cita** `marketing/outbound/verificaciones-plan-instagram-23oct.md` ni el lote de outbound como fuente de nada público: lo que antes se probaba sobre sitios de prospectos ahora se prueba sobre un fixture propio (sección 3) y sobre `spindlelab.cl`.

## 1. Afirmación por afirmación

### Lámina 1 · portada

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Entre que alguien te busca y te compra, una consulta puede caerse en cuatro lugares» | `PLAN.md` §5, pieza 1 (gancho de la v2, corregido por la revisión independiente). `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` §2.2: «Entre esa primera consulta y la venta hay varios puntos donde se puede caer, desde lo que tu sitio explica hasta cuánto tarda alguien en responder». «Puede» y «cuatro» son el encuadre de la pieza, no una medida ni una lista cerrada del negocio. El gancho de la v1 («antes y después de que alguien te escriba») chocaba con el mapa; este abarca los cuatro lugares porque los cuatro ocurren entre la búsqueda y la compra | n/a |
| «Dos se ven desde afuera. Dos se conversan.» y el mapa de cuatro pasos | `PLAN.md` §4 (pilar 1) y §5 (pieza 1, lámina 1); `copy-secciones.md` §6, paso 01 (la revisión mira «lo más relevante que se ve desde afuera») y §2.4, paso 02 (lo demás se conversa en 20 minutos) | n/a |
| «Consulta» tiene un solo sentido en toda la pieza | `copy-secciones.md` §2.2: consulta = lo que alguien pregunta por lo que vendes, desde que busca hasta que compra. Lo que esa persona te escribe es el «mensaje» (lámina 4, pie y alt) | Se revisaron portada, láminas, pie, alt, comentario e historias |

### Lámina 2 · cuando te buscan

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «El título de la pestaña debería decir qué haces y dónde» | Es el criterio que declara nuestro chequeo: `spindlelab-astro/functions/api/chequeo.js` línea 1043, señal `title`, «El título dice qué haces y dónde», con el arreglo «con el servicio y el país» (línea 1045). Se presenta como recomendación nuestra, no como algo que haga Google ni una IA | API en vivo el 23-oct sobre `spindlelab.cl`: ítem `title` con ese texto, dentro del bloque `entidad`, que se titula «¿Te entienden?» |
| «Pestaña del navegador» (rótulo) y la pestaña dibujada | La etiqueta `<title>` es lo que el navegador muestra en la pestaña (`chequeo.js` línea 829 extrae esa etiqueta). Se dice «pestaña» porque «título de la portada» se lee como el titular grande de la página | n/a |
| Texto dentro de la pestaña dibujada: «Qué haces y dónde» | No es un título real ni el ejemplo de ningún sitio: repite la recomendación del titular. Va rotulada «esquema» | n/a |
| «Nuestro chequeo gratis revisa el largo: entre 15 y 65 caracteres» | `chequeo.js` línea 1041: `title.length >= 15 && title.length <= 65`; línea 1045: «Deja el título entre 15 y 65 caracteres». **La señal solo mide el largo; no lee lo que dice el título**, y pesa 4 de 100 puntos (`chequeo.js` línea 1043, quinto argumento de `add`). Por eso la lámina atribuye al chequeo únicamente el largo, y por eso **ya no es una cifra grande ni dorada**: la revisión independiente del 23-oct (noche) la marcó como el dato menos significativo de la pieza. Va en la glosa, en crema. «Revisa el largo» es lo que hace el chequeo; no dice que un título de ese largo sea bueno | Prueba de borde con node el 23-oct: 14 caracteres no cumple; 15 y 65 cumplen; 66 no cumple. «Entre 15 y 65» es inclusivo en los dos extremos. Peso releído en el código el 23-oct, noche |
| «Lo que dice el título lo vemos a mano en la revisión» | `copy-secciones.md` §6, paso 01: la revisión mira, entre lo que se ve desde afuera, los «títulos». Es oferta del sitio nuevo (borrador v1.2) | n/a. Depende de que el copy se apruebe como está |

### Lámina 3 · cuando entran

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Hay portadas que llegan vacías a quien no ejecuta JavaScript» | Encuadre acotado. La versión anterior («Una portada puede llegar vacía») no decía para quién, y la revisión independiente la marcó. Ahora el titular nombra al lector («quien no ejecuta JavaScript»), y el único lector concreto que el repo respalda es nuestro chequeo (fila de «Nuestro chequeo gratis lee las portadas así»). No dice nada sobre lo que hacen Google ni una IA con una portada vacía. El mecanismo está probado abajo, en un fixture propio | Fixture (sección 3) |
| Esquema de dos recuadros: «En un navegador» (una página con texto, dibujada con barras) y «Sin ejecutar JavaScript» (`<body>`, `<div id="root"></div>`, `</body>`, «Sin texto en el cuerpo») | Es un esquema, rotulado «Esquema de ejemplo, no es un sitio real». El fragmento reproduce la forma de una portada que se arma con JavaScript: un contenedor vacío al que la aplicación le monta el contenido. Es un patrón corriente de las aplicaciones de una sola página y es el mismo del fixture. Se eligió `root` (el nombre más genérico) y no el identificador que tuviera la portada de ningún sitio revisado: no corresponde a ningún prospecto | Fixture (sección 3) |
| Nota: «Si el texto lo arma JavaScript, el cuerpo llega vacío» (y, en el pie de foto, «porque su texto lo arma el navegador») | Fixture propio | El 23-oct, leído con `curl` (sin ejecutar JavaScript): **0 palabras en el cuerpo**. En Chrome headless con `--dump-dom` (ejecuta JavaScript): **603 palabras** |
| «Nuestro chequeo gratis lee las portadas así» (bajo el recuadro rotulado «Sin ejecutar JavaScript») | `chequeo.js`: `traer()` (línea 170) y `pedirUna()` (línea 217) piden la URL por HTTP con `fetch`, y el texto se extrae con expresiones regulares sobre el HTML (líneas 856 a 862). No hay navegador en el código: la búsqueda de `puppeteer`, `playwright`, `browser` y `headless` solo encuentra la línea 565, que es una cadena para detectar páginas con filtro anti-bot | Lectura del código el 23-oct |
| «…el cuerpo llega vacío y «Tu portada tiene contenido suficiente» no se cumple» | `chequeo.js` línea 1183: señal `sustancia`, «Tu portada tiene contenido suficiente», que exige `palabras >= 300` y **pesa 3 de 100 puntos** (quinto argumento de `add`). Con el cuerpo vacío, la cuenta queda en las palabras del `<title>` y no llega | Fixture: la misma cuenta del chequeo da 3 palabras y `sustancia_cumple:false`. API en vivo: la señal existe con ese nombre en el bloque «¿Te pueden citar?». Peso releído en el código el 23-oct, noche |

**Precisiones que la lámina respeta.** (1) La señal también falla en una portada que sí trae texto pero menos de 300 palabras; la lámina dice que **sin** texto no se cumple, que es verdad y no dice lo contrario. (2) En la pantalla de la herramienta, la señal que falla se ve con una ✕ y, para quien usa lector de pantalla, «No cumple». La v1 decía «pendiente», que es el nombre interno del estado y no lo que ve quien corre el chequeo; la lámina dice «no se cumple». (3) El chequeo cuenta el `<title>` dentro de las palabras de la portada (líneas 856 a 862), así que llamar «texto visible» a esa cuenta, como hace el detalle de la herramienta, es impreciso. Queda anotado para la troncal y para quien mantenga la función; la lámina no cita ningún conteo.

**Lo que la lámina no dice, a propósito:** qué hace ChatGPT, Google ni ninguna otra IA con una portada de cuerpo vacío, ni que «no se pueda resumir ni citar». Nombra al único lector que el repo respalda, nuestro chequeo, y deja que quien sabe de JavaScript saque su conclusión (`PLAN.md` §5, pieza 1, «Qué no hace»).

### Lámina 4 · cuando escriben y cuando esperan

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Después de que alguien te escribe quedan otros dos lugares» | Encuadre del mapa (`PLAN.md` §5, pieza 1, lámina 4; `copy-secciones.md` §2.2) | n/a |
| «Que el mensaje llegue a alguien» · «Cuánto tarda esa persona en responder» | `copy-secciones.md` §2.2: «desde lo que tu sitio explica hasta cuánto tarda alguien en responder». No se dice cuántos mensajes se pierden ni cuánto se tarda: no hay dato | n/a |
| «Los conversamos en 20 minutos por videollamada, si después de la revisión quieres seguir» | `copy-secciones.md` §2.4, paso 02 («Hablamos 20 minutos por videollamada sobre cómo te llegan las consultas y qué pasa con ellas»), §6 paso 02 y §8 «Qué pasa después», paso 03. **Que «qué pasa con ellas» cubra si el mensaje llega y cuánto se tarda es una lectura nuestra del texto**, no una frase del copy. Es oferta del sitio nuevo: el sitio vivo no tiene ese paso escrito | n/a |

### Lámina 5 · cierre

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Pide la revisión de una página de tu sitio» | `copy-secciones.md` §2.1 (CTA principal «Pedir la revisión de una página» → `/contacto/`) y §2.9 | n/a |
| «Nos pasas la dirección y te devolvemos por escrito lo más importante que vimos y por dónde partiríamos» | `copy-secciones.md` §2.1 (microcopy del CTA), §2.4 paso 01 y §6 paso 01 | n/a. Sin plazo, a propósito (decisión 2 del copy sin resolver) |
| «Es gratis» | `copy-secciones.md` §2.1 y §8 («¿La revisión es gratis? Sí») | **Condicionada a la reconfirmación de Ramón** (`PLAN.md` §2.1): el 25-sep el bio dejó de ofrecer el mini-diagnóstico |
| «spindlelab.cl/contacto» y «Revisión de una página» | `copy-secciones.md` §2.1 y §3 | `/contacto/` responde 200 en el sitio vivo el 23-oct (noche) y trae los tres campos ocultos de UTM. Su título y su texto todavía dicen «diagnóstico»: «revisión» es el sitio nuevo |

### Pie de foto, primer comentario e historias (lo que no está en las láminas)

| Afirmación | Respaldo |
|---|---|
| «Alguien pregunta por lo que vendes, mira tu sitio y quizás le escribe también a otra empresa» | `copy-secciones.md` §2.2, tal cual |
| «Nuestro chequeo gratis (spindlelab.cl/diagnostico)» | `/diagnostico/` responde 200 el 23-oct (noche); la página dice «Gratis y sin dejar tu correo» |
| «El primero… El segundo… Los otros dos…» y el resto del pie | Las mismas afirmaciones de las láminas 2 a 5, con las mismas fuentes |
| Primer comentario: «Para la revisión alcanza con la dirección de tu sitio. Los accesos, si avanzamos, vienen después» | `copy-secciones.md` §2.8 (FAQ «¿Qué necesitan de mí para partir?»: la dirección del sitio y, «si avanzamos», acceso de lectura a analítica y Search Console y un acceso acotado para implementar) y §6 «Qué necesitamos de ti» |
| Historia de la empresa | Lo mismo que la portada |
| Historia personal: «Si quieres que mire una página de tu sitio» | `copy-secciones.md` §2.7 («Reviso tu sitio antes de cobrarte nada»). «Mire» va en singular porque es la cuenta personal de Ramón; que lo diga así lo confirma él |

## 2. Lo que se comprobó el 23-oct (resumen)

1. **El mecanismo de la lámina 3 se sostiene** en un fixture propio: cuerpo vacío sin ejecutar JavaScript, completo al ejecutarlo, y el chequeo lee sin ejecutarlo (sección 3).
2. **El criterio del título y la señal de contenido existen tal como las nombran las láminas**, en el código y en la API en vivo sobre `spindlelab.cl` (sección 3).
3. **El sitio nuevo no está publicado**: la home sigue titulándose «Agencia de marketing con IA en Chile», no trae el H1 «Te llegan consultas. Veamos dónde se cae el resto.», y `/contacto/` dice «pide tu diagnóstico gratis». `/contacto/` conserva `UTM Source`, `UTM Medium` y `UTM Campaign`; `/diagnostico/` responde 200.

## 3. Cómo se probó (comandos, para repetirlo)

**El mecanismo de la lámina 3, con un fixture propio.** Tres archivos en una carpeta vacía:

```html
<!-- index.html -->
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Sitio de prueba</title>
<script defer src="app.js"></script></head>
<body><div id="root"></div></body></html>
```

`app.js` escribe en `#app` un `<h1>` y unas 600 palabras de texto. `medir.js` es la cuenta literal del chequeo (`chequeo.js` líneas 856 a 862) más la cuenta del cuerpo:

```js
const html = require('fs').readFileSync(0, 'utf8');
const texto = html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const palabras = texto ? texto.split(' ').length : 0;
const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [,''])[1];
const cuerpo = body.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log(JSON.stringify({palabras_chequeo: palabras, palabras_cuerpo: cuerpo ? cuerpo.split(' ').length : 0, sustancia_cumple: palabras >= 300}));
```

```
python3 -m http.server 8765 --bind 127.0.0.1 &
curl -s http://127.0.0.1:8765/ | node medir.js
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --virtual-time-budget=5000 --dump-dom http://127.0.0.1:8765/ | node medir.js
```

Resultado del 23-oct:

```
curl (no ejecuta JavaScript):   {"palabras_chequeo":3,"palabras_cuerpo":0,"sustancia_cumple":false}
Chrome headless (lo ejecuta):   {"palabras_chequeo":606,"palabras_cuerpo":603,"sustancia_cumple":true}
```

**Las señales, en la API en vivo, sobre nuestro propio dominio** (la herramienta no guarda el dominio consultado, según su página):

```
curl -s "https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl" | python3 -c "
import json,sys; d=json.load(sys.stdin)
print([(b['id'],b['titulo']) for b in d['bloques']])
print([(i['bloque'],i['id'],i['titulo']) for i in d['items'] if i['id'] in ('title','sustancia')])"
```

Resultado del 23-oct: bloques `acceso` «¿Te pueden leer?», `entidad` «¿Te entienden?» y `citabilidad` «¿Te pueden citar?»; ítems `entidad/title` «El título dice qué haces y dónde» y `citabilidad/sustancia` «Tu portada tiene contenido suficiente»; 21 ítems en total.

**El borde del título:**

```
node -e 'for (const t of ["a".repeat(14),"a".repeat(15),"a".repeat(65),"a".repeat(66)]) console.log(t.length, t.length>=15 && t.length<=65)'
```

Resultado: `14 false`, `15 true`, `65 true`, `66 false`.

**El estado del sitio:**

```
curl -s https://spindlelab.cl/ | grep -o '<title>[^<]*</title>'      # «Agencia de marketing con IA en Chile · SpindleLab»
curl -s https://spindlelab.cl/ | grep -c 'Te llegan consultas'        # 0
curl -s https://spindlelab.cl/contacto/ | grep -o '<title>[^<]*</title>'   # «Contacto: pide tu diagnóstico gratis · SpindleLab»
curl -s https://spindlelab.cl/contacto/ | grep -o 'UTM Source\|UTM Medium\|UTM Campaign' | sort -u   # los tres
```

## 4. Afirmaciones que estaban en la v1 o en el plan y se sacaron

| Frase | Por qué se sacó |
|---|---|
| Los tres hallazgos de la v1: el título de «1 palabra» en «dos empresas de servicios financieros» (lámina 2) y las «0 palabras» en el cuerpo de la portada de «un sitio de servicios financieros» (lámina 3), con sus sellos «revisado el 23 de octubre de 2026» | **Decisión D, opción segura.** Venían de prospectos que recibieron un correo en julio y eran reconocibles (nicho chico). No se reemplazan por otro caso: las láminas describen la señal, sin empresas ni cifras de sus sitios |
| «Nuestro chequeo gratis lee sin ejecutarlo: en ese sitio deja «contenido suficiente» en pendiente» | Hablaba de un sitio concreto. Ahora es general, y dice «no se cumple» en lugar de «pendiente» (el nombre interno del estado) |
| «Es una de sus señales de «¿Te entienden?»» (nota de la lámina 2, v2 inicial) | Sumaba una segunda afirmación sobre una señal que pesa 4 de 100. La lámina dice solo lo que el chequeo hace con el título: revisar el largo |
| La cifra «15 a 65» de 210 px, en dorado (lámina 2, v2 inicial) | Daba el mayor peso visual de la pieza al criterio menos significativo del chequeo y sugería que el largo del título era el lugar donde se cae una consulta. Pasó a la glosa, en crema |
| «Una portada puede llegar vacía» (titular de la lámina 3, v2 inicial) y «Nuestro chequeo gratis lee la portada así» con «quien lee el código sin ejecutarlo recibe el cuerpo vacío» | No decía quién recibe la portada vacía ni qué pierde. Ahora el titular nombra al lector («quien no ejecuta JavaScript») y la glosa nombra al único lector concreto que el repo respalda, nuestro chequeo |
| «Una portada puede verse completa y llegar vacía» (titular v1) | «Verse completa» afirmaba el caso concreto visto en Chrome. Sin caso, queda «puede llegar vacía» |
| Historia personal: «Los dos primeros los miré en sitios reales» | Afirmaba los casos que ya no están |
| «Lo que no se puede leer, no se puede resumir ni citar» (lámina 3 del plan v1) | Es una afirmación general sobre qué hace una IA con una portada vacía; sin respaldo, y el encargo pide no decir qué ve cada IA |
| «El título de tu portada le dice a Google, y a una IA, qué eres y dónde» (lámina 2 del plan v1) | Atribuye a Google y a una IA lo que hacen con el título. Queda como recomendación nuestra, con el nombre de la señal del chequeo como origen |
| «No decía qué hacen ni dónde» (cola de la lámina 2 del plan v1) | Era una evaluación pegada a un hecho que la pieza ya no trae |
| «Una consulta puede caerse antes y después de que alguien te escriba» (gancho de la v1) | Mezclaba dos sentidos de «consulta» y no cubría el mapa; lo reemplaza el gancho de `PLAN.md` v2 |
| «Los otros dos no se ven desde afuera» (titular de la lámina 4 en la v1) y «La revisión mira lo que se ve desde afuera» (glosa) | Repetían el límite que ya dice la portada. Ahora se dice una sola vez en las láminas, en la portada (bajada y rótulos del mapa); la lámina 4 solo dice qué pasa con esos dos lugares. El pie lo menciona una vez, con otras palabras, al presentar los dos últimos |
| «Es gratis», «20 minutos», «por escrito» como hechos establecidos | Siguen, pero como oferta del sitio nuevo y condicionadas (reconfirmación de Ramón y decisiones 1 y 2 del copy); ver `publicar.md` |

## 5. Lo que esta sesión NO pudo comprobar

- **El canal de Instagram.** No se miró: el estado de la cuenta sale de `marketing/redes/QUE-HAY-PUBLICADO.md` (capturado el 25-sep con anotaciones hasta el 16-oct). La regla de ese archivo dice que se mira el canal antes de publicar.
- **Que la revisión gratis esté encendida.** Es decisión y reconfirmación de Ramón (`PLAN.md` §2.1).
- **El copy del sitio nuevo es un borrador** (v1.2, sin aprobar). Si Ramón cambia «revisión», los «20 minutos», «por escrito» o el microcopy del CTA, se ajustan las láminas 4 y 5 y el pie. Si el texto publicado de `/metodo/` o del paso 01 ya no menciona los títulos, se corrige la nota de la lámina 2.
- **Que Ramón diga «mire» en la historia personal.**
- **Si el sitio nuevo cambia los nombres de las señales del chequeo.** La obra no los toca (`PLAN.md` §0, punto 2, y brief de la obra), pero se re-corre la API el día de publicar (`publicar.md`, checklist).

- **Ninguna lámina muestra una consulta perdida.** La revisión independiente lo señaló y es cierto: no hay evidencia propia publicable de que un sitio con esos defectos haya perdido consultas (la decisión D baja los hallazgos reales de prospectos, y el repo no tiene un caso medido). Las láminas 2 y 3 dicen qué mira el chequeo y quedan acotadas a eso; el marco «puede caerse» es el de la portada y lo fija `PLAN.md` §5. Si Ramón quiere una pieza que muestre una pérdida, necesita un caso propio medido, que hoy no existe.

## 6. Historial de correcciones

Para que un arreglo no se quede en el chat y vuelva como defecto. El historial completo de la v1 (cinco hallazgos de la primera revisión independiente) sigue en git, commit `a9ab2f6a`. De ahí siguen vigentes estas cuatro lecciones: «consulta» no es «mensaje»; «título de la portada» se lee como el titular grande y por eso se dice «pestaña»; la señal del título solo mide el largo; y el chequeo cuenta el título dentro de las palabras de la portada.

| Hallazgo | Qué se cambió | Dónde |
|---|---|---|
| **`PLAN.md` v2 §5.** El gancho de la v1 chocaba con las láminas 3 y 4, que ocurren después de que alguien escribe | Gancho nuevo: «Entre que alguien te busca y te compra, una consulta puede caerse en cuatro lugares», en portada, pie, alt 1 y las dos historias | `lamina-1.html`, `caption.md`, `publicar.md` |
| **`PLAN.md` v2 §5 y decisión D.** La lámina 3 daba por hecho qué pasa con una portada vacía y usaba un sitio de un prospecto | Lámina 3 acotada a lo medido: el cuerpo llega vacío para quien no ejecuta JavaScript, y nuestro chequeo lee así. Dispositivo nuevo: dos recuadros rotulados como esquema. Sin caso real, sin cifra | `lamina-3.html`, `consulta.css` |
| **Decisión D, opción segura.** La lámina 2 traía un hallazgo reconocible de dos prospectos | Lámina 2 describe la señal del título del chequeo (el criterio de 15 a 65 caracteres) con una pestaña dibujada y rotulada como esquema; el único número es de nuestra herramienta | `lamina-2.html`, `consulta.css` |
| **Encargo del 23-oct (noche).** Etiquetas y notas legibles en un celular | Todo texto pasa a 26 px o más (antes, las etiquetas iban en 20 px); verificado con el estilo calculado de cada elemento | `consulta.css` |
| **Encargo del 23-oct (noche).** Un mismo límite una sola vez | El límite «lo que se ve desde afuera / lo que se conversa» queda en la portada; la lámina 4 ya no lo repite. El límite del título («lo que dice, lo vemos a mano en la revisión») queda solo en la nota de la lámina 2; el pie dice únicamente que el chequeo revisa el largo | `lamina-4.html`, `caption.md`, `publicar.md` |
| **Encargo del 23-oct (noche).** Cierre sin eslogan | La lámina 5 pasa de «Partimos por una página» a una instrucción con verbo («Pide la revisión de una página de tu sitio») | `lamina-5.html` |
| **Encargo del 23-oct (noche).** Todo enlace con UTM | Tabla de enlaces con columna «¿Clicable?»: lo clicable (sticker, bio, mensaje directo) lleva UTM completo; las direcciones escritas en el pie y el comentario no son enlaces | `caption.md` §4, `publicar.md` |
| **Revisión independiente del 23-oct (noche), severidad media.** Las láminas 2 y 3 implican una pérdida que no muestran, y el dato dorado (15 a 65) es el de menor peso | Lámina 2: sin cifra grande ni dorada, la pestaña es el dibujo principal y el rango va en una glosa en crema («Nuestro chequeo gratis revisa el largo: entre 15 y 65 caracteres»). Lámina 3: el titular nombra al lector («Hay portadas que llegan vacías a quien no ejecuta JavaScript») y la glosa dice «Nuestro chequeo gratis lee las portadas así». Pie de foto y alt alineados | `lamina-2.html`, `lamina-3.html`, `consulta.css`, `caption.md`, `publicar.md` |
| **Revisión independiente del 23-oct (noche), formato.** Raya larga en la primera línea de `base.css` | Cambiada por una coma. El original (`2026-09-septiembre/_sistema/base.css`) sigue con la raya y está fuera de esta carpeta: aviso a la troncal | `base.css` |
