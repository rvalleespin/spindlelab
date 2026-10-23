# Fuentes · Carrusel «Dónde puede caerse una consulta»

**Hecho el viernes 23-oct-2026** (verificaciones entre las 17:13 y las 17:35, hora de Chile; pase de corrección del mismo día, después de las 17:45, con las tres pruebas y la API del chequeo repetidas, ver §5). Este archivo es **interno**: no se copia a ningún texto público. Lista cada afirmación factual de la pieza con el archivo del repo que la respalda y lo que se comprobó ese día. Si una afirmación no tenía respaldo, se sacó de la pieza (sección 4).

Los prospectos se identifican por su número en `marketing/outbound/semana-02/lote-1-frente-a.md`. Los dominios y los comandos para repetir las pruebas están en `PLAN.md` §9, al final, y no se reimprimen acá.

## 1. Afirmación por afirmación

### Lámina 1 · portada

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Una consulta puede caerse antes y después de que alguien te escriba» | `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` §2.2 (H2 «Dónde puede caerse una consulta» y «hay varios puntos donde se puede caer, desde lo que tu sitio explica hasta cuánto tarda alguien en responder»). Es un encuadre con «puede», no una cifra ni un hecho medido. **Antes y después**: los lugares 1 y 2 ocurren antes de que la persona escriba (te buscan, entran); el 3 y el 4 ocurren cuando y después de que escribe (si el mensaje llega, cuánto tardan en responder). La versión anterior decía solo «antes» y el mapa de la misma lámina la contradecía | n/a |
| «Consulta» tiene un solo sentido en toda la pieza | `copy-secciones.md` §2.2: «Alguien pregunta por lo que vendes… esa primera consulta». Consulta = lo que alguien pregunta por lo que vendes, que existe desde que busca hasta la venta. Lo que esa persona te escribe es el «mensaje» (láminas 4 y pie). Se revisaron la portada, el pie, el texto alternativo y las dos historias para que no use «consulta» por el mensaje | n/a |
| «Cuatro lugares donde puede pasar. Dos se ven desde afuera» | `PLAN.md` §4 (pilar 1: «dos se ven desde afuera y dos se conversan») y §5 (pieza 1, lámina 1). El copy §2.2 los describe como los puntos que van «desde lo que tu sitio explica hasta cuánto tarda alguien en responder». El «cuatro» es el encuadre de la pieza, no una lista cerrada del negocio | n/a |
| Mapa: «cuando te buscan» y «cuando entran» se ven desde afuera; «cuando escriben» y «cuando esperan» se conversan | `PLAN.md` §5 pieza 1, láminas 2 a 4; `copy-secciones.md` §6 paso 01 (la revisión mira «lo más relevante que se ve desde afuera») y §2.4 paso 02 (lo demás se conversa en 20 minutos) | n/a |

### Lámina 2 · cuando te buscan

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «El título de la pestaña debería decir qué haces y dónde» | Es el criterio que declara nuestro chequeo: `spindlelab-astro/functions/api/chequeo.js`, líneas 1041 a 1046, señal `title`, «El título dice qué haces y dónde», bloque «¿Te entienden?» (peso 4 de 40), con el arreglo «con el servicio y el país». **Pero la señal solo mide el largo**: `titleOk = title.length >= 15 && title.length <= 65`. No lee lo que dice el título. Por eso la lámina lo presenta como recomendación nuestra y atribuye al chequeo solo lo que mide | El 23-oct la API en vivo devolvió un ítem `title` con ese texto. Un título corto que sí diga qué haces también saldría pendiente: por eso la pieza ya no le atribuye al chequeo la lectura del contenido |
| «Pestaña del navegador» (etiqueta de la lámina) y «el título que aparece en la pestaña del navegador al abrir la portada» (pie) | La etiqueta `<title>` de la portada es lo que el navegador muestra en la pestaña. Se dice dónde mirar porque «título de la portada» se lee como el titular grande de la página, y esos dos sitios sí tienen texto y encabezados visibles | `curl -sL` el 23-oct a las portadas de los prospectos 4 y 5: la etiqueta `<title>` trae una sola palabra en cada una. No se dice que Google ni una IA lo usen para nada |
| «Nuestro chequeo gratis pide entre 15 y 65 caracteres en el título» | `chequeo.js` líneas 1041 a 1046: «Deja el título entre 15 y 65 caracteres, con el servicio y el país». `public/diagnostico/index.html`: el bloque «¿Te entienden?» incluye «el título, la meta description y el H1» | API en vivo el 23-oct sobre las portadas de los prospectos 4 y 5: la señal `title` sale **pendiente** en las dos, porque ambos títulos tienen menos de 15 caracteres. No se publica el largo exacto (acerca la pieza a una empresa) |
| «Lo que dice, lo vemos a mano en la revisión» | `copy-secciones.md` §6, paso 01: la revisión mira «títulos» entre lo que se ve desde afuera, y §15. Es oferta del sitio nuevo (borrador v1.2) | n/a |
| «Revisado el 23 de octubre de 2026» | Esta sesión | `curl` el 23-oct-2026 a las 17:13 (20:13 GMT), repetido en el pase de corrección |
| «1 palabra… ese título en la portada de dos empresas de servicios financieros: solo el nombre de la empresa» | `marketing/outbound/semana-02/lote-1-frente-a.md` §4 (prospecto 4: «el title de la home es solo» el nombre) y §5 (prospecto 5: «title de home = [nombre] a secas»). Respaldo secundario en `PLAN.md` §9 | **Re-verificado el 23-oct con `curl -sL`** (dos veces): la portada de los prospectos 4 y 5 sigue devolviendo un `<title>` de una sola palabra, igual al nombre comercial (la segunda lo acorta: la empresa se llama «… Advisors») |

### Lámina 3 · cuando entran

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Una portada puede verse completa y llegar vacía» | Encuadre con «puede». Las dos mitades están medidas abajo: llegar vacía (HTML sin texto) y verse completa (en un navegador). El titular nombra las dos para no acusar al sitio de estar roto | n/a |
| «0 palabras… el cuerpo de la portada de un sitio de servicios financieros cuando lo leímos sin ejecutar JavaScript» | `lote-1-frente-a.md` §1 (prospecto 1: «el sitio es una aplicación JavaScript (Vue.js): el HTML que reciben los bots llega prácticamente vacío») | **Re-verificado el 23-oct (dos veces)**: la portada del prospecto 1 pesa **2.521 bytes**. Su `<body>` es solo `<div id="app"></div>`: cero palabras. No hay `<noscript>`. Los scripts de la aplicación van con `defer` |
| «JavaScript es el código que arma la página en el navegador» | Explicación de media frase para dueños y gerentes (la lectura en frío del copy §15 pide lenguaje de negocio). Es cierto para este sitio: la aplicación Vue construye el contenido en el navegador | Lectura del HTML del 23-oct |
| «Nuestro chequeo gratis lee sin ejecutarlo» | `chequeo.js`: `traer()` y `pedirUna()` (desde la línea 170) piden la URL por HTTP; la extracción de texto es por expresiones regulares sobre el HTML (líneas 856 a 862). No hay navegador, Puppeteer ni Playwright (búsqueda en el archivo, sin resultados) | Lectura del código el 23-oct |
| «En ese sitio deja «contenido suficiente» en pendiente» | `chequeo.js` línea 1183: la señal `sustancia` se llama «Tu portada tiene contenido suficiente» y exige 300 palabras o más; `pendiente` es «lo miramos y hay algo que corregir» (comentario de las líneas 878 a 890) | **API en vivo el 23-oct** sobre el dominio del prospecto 1: `sustancia` = `pendiente`, detalle «Contamos alrededor de 6 palabras de texto visible» |
| (se sacó) «Abierto en un navegador, ese mismo sitio se ve completo» como frase de la lámina | Sigue en el pie, como «En un navegador, ese sitio se ve completo», y la lámina lo dice en el titular («puede verse completa») | Chrome headless (`--dump-dom`, 8 s de espera) sobre el mismo dominio: el `<body>` renderizado trae **361 palabras** (menú, «Quiénes Somos», «Servicios», «Equipo», «Contacto») |

⚠️ **Matiz que cambia lo que la lámina puede decir** (resuelto en el pase de corrección): si alguien corre nuestro chequeo gratis sobre ese dominio, la señal «contenido suficiente» sale **pendiente** y dice «alrededor de 6 palabras de texto visible». Esas 6 palabras son el `<title>` de la cabecera: el chequeo cuenta el texto que queda después de quitar scripts, estilos y etiquetas, y eso incluye el título (`chequeo.js` líneas 856 a 862). La versión anterior decía «Así lee nuestro chequeo» justo debajo de «0 palabras», y quien probara la herramienta habría visto otro número. Ahora la lámina mide el **cuerpo** con nuestra prueba (0), y del chequeo dice solo lo que se puede comprobar en su pantalla: que lee sin ejecutar JavaScript y que deja esa señal en pendiente. No cita ningún conteo del chequeo. Queda anotado para la troncal y para quien mantenga la función: llamar «texto visible» al título es impreciso, y el chequeo del título que mide solo largo se llama «dice qué haces y dónde».

**Lo que la lámina no dice, a propósito:** qué hace ChatGPT, Google ni ninguna otra IA con esa portada. Nombra al único lector que el repo respalda, nuestro chequeo, y deja que quien entiende JavaScript saque su conclusión.

### Lámina 4 · cuando escriben y cuando esperan

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Si el mensaje llega a alguien» · «Cuánto tarda esa persona en responder» | `copy-secciones.md` §2.2 («desde lo que tu sitio explica hasta cuánto tarda alguien en responder») | n/a. No se dice cuántos mensajes se pierden ni cuánto tardan: no hay dato |
| «La revisión mira lo que se ve desde afuera» | `copy-secciones.md` §6, paso 01 («Revisamos lo más relevante que se ve desde afuera: acceso de los rastreadores, datos estructurados, títulos, señales de confianza y si la IA puede leerlo») y §15 («la revisión gratis hoy mira el sitio y la IA; el proceso de ventas entra en la conversación de 20 minutos») | n/a |
| «Estos dos los conversamos en 20 minutos por videollamada, si después quieres seguir» | `copy-secciones.md` §2.4 paso 02 («Hablamos 20 minutos por videollamada sobre cómo te llegan las consultas y qué pasa con ellas»), §6 paso 02 y §8 «Qué pasa después» paso 03 («Si quieres avanzar, conversamos 20 minutos») | n/a. **Es oferta del sitio nuevo**: el sitio vivo no tiene ese paso escrito |

### Lámina 5 · cierre

| Afirmación en la pieza | Respaldo | Comprobado |
|---|---|---|
| «Partimos por una página» | `copy-secciones.md` §2.9 (H2 «Empieza por una página») y §1.4 | n/a |
| «Nos pasas la dirección de tu sitio y te devolvemos por escrito lo más importante que vimos y por dónde partiríamos» | `copy-secciones.md` §2.1 (microcopy del CTA principal), §2.4 paso 01 y §6 paso 01 | n/a. Sin plazo, a propósito (decisión 2 del copy sin resolver) |
| «Es gratis» | `copy-secciones.md` §2.1 y §8 («¿La revisión es gratis? Sí») | n/a |
| «spindlelab.cl/contacto» y «Pedir la revisión» | `copy-secciones.md` §2.1 (CTA principal → `/contacto/`) y §3 | `/contacto/` responde 200 en el sitio vivo el 23-oct y ya trae los tres campos ocultos de UTM. Su título y su texto todavía dicen «diagnóstico»: el de «revisión» es el sitio nuevo |

### Pie de foto, primer comentario e historias (lo que no está en las láminas)

| Afirmación | Respaldo |
|---|---|
| «Alguien pregunta por lo que vendes, mira tu sitio y quizás le escribe también a otra empresa» | `copy-secciones.md` §2.2, tal cual |
| «nuestro chequeo gratis (spindlelab.cl/diagnostico)… la lee así y, en ese sitio, deja en pendiente la señal de contenido suficiente» | `public/diagnostico/index.html`; la página vive en el sitio actual. El resto, en la tabla de la lámina 3 |
| «el título que aparece en la pestaña del navegador al abrir la portada era una sola palabra» | Tabla de la lámina 2 |
| Primer comentario: «Para la revisión alcanza con la dirección de tu sitio. Los accesos, si avanzamos, vienen después» | `copy-secciones.md` §2.8 (FAQ «¿Qué necesitan de mí para partir?»: la dirección del sitio y, «si avanzamos», acceso de lectura a analítica y Search Console y un acceso acotado para implementar), §6 «Qué necesitamos de ti» y §8 FAQ |
| Historia personal: «cuatro lugares donde puede caerse una consulta, antes y después de que alguien escriba» | Igual que la portada: `copy-secciones.md` §2.2 y el mapa de la lámina 1. Lleva «puede», como la portada |
| Historia personal: «Los dos primeros los miré en sitios reales» | Los hallazgos de las láminas 2 y 3 son de sitios reales (lote frente A §1, §4 y §5, re-verificados el 23-oct). «Miré» va en singular porque es la cuenta personal de Ramón; confirmar que lo dice así |

## 2. Lo que se comprobó el 23-oct (resumen)

1. Título de una sola palabra: **se sostiene** en los prospectos 4 y 5. Un tercero (prospecto 6) también devuelve un título de una sola palabra: queda como reserva si Ramón prefiere decir «tres» (hoy dice «dos», el número que el plan y el encargo ya traían).
2. Portada que llega vacía: **se sostiene** en el prospecto 1 (2.521 bytes, `<body>` sin texto), y en un navegador ese sitio sí se ve completo.
3. Las 21 señales y el criterio del título: **se sostienen** en la API en vivo. Pero la señal del título solo mide el largo (15 a 65 caracteres) y la de contenido cuenta el título como texto visible: las láminas 2 y 3 ya no dicen más que eso (§5).
4. El sitio nuevo **no está publicado**: la home sigue titulándose «Agencia de marketing con IA en Chile», no trae el H1 «Te llegan consultas…», y `/contacto/` dice «pide tu diagnóstico gratis».

## 3. Lo que esta sesión NO pudo comprobar

- **Gmail.** No se pudo confirmar que ninguno de los prospectos de origen respondió ni pidió que no lo escribieran, ni que no hubo rebotes (la regla de `PLAN.md` §3.3 pide mirarlo en Gmail, no en archivos). **Es una puerta dura**: `publicar.md` dice que no se programa nada hasta hacerlo, y que Ramón decida a conciencia si acepta que los tres dueños puedan reconocerse.
- **El canal de Instagram.** No se miró: el estado de la cuenta sale de `marketing/redes/QUE-HAY-PUBLICADO.md` (capturado el 25-sep con anotaciones hasta el 16-oct). La regla de ese archivo dice que se mira el canal antes de publicar.
- **El copy del sitio nuevo es un borrador** (v1.2, sin aprobar). Si Ramón cambia «revisión», los «20 minutos», «por escrito» o el microcopy del CTA, se ajustan las láminas 4 y 5 y el pie.

## 4. Afirmaciones que estaban en el plan y se sacaron

| Frase del plan o del encargo | Por qué se sacó |
|---|---|
| «Lo que no se puede leer, no se puede resumir ni citar» (lámina 3 del plan) | Es una afirmación general sobre qué hace una IA con una portada vacía. El encargo pide acotar a lo medido y no decir qué ve cada IA. No tiene respaldo en el repo con esa forma |
| «El título de tu portada le dice a Google, y a una IA, qué eres y dónde» | Se reescribió como recomendación nuestra («debería decir qué haces y dónde», con el nombre de la señal del chequeo como origen de la frase). Atribuirle a Google y a una IA lo que hacen con el título no está respaldado. Y el chequeo no juzga ese contenido: solo mide el largo (ver §1, lámina 2 y §5) |
| «No decía qué hacen ni dónde» (cola de la lámina 2 del plan) | Era una evaluación pegada a un hecho. El hecho (una palabra, el nombre) se sostiene solo, y esa frase repetía lo que la cifra ya dice |
| «Es una de las 21 señales que mira nuestro chequeo gratis» (nota de la lámina 2) | Pegada a «debería decir qué haces y dónde», sugería que el chequeo juzga lo que dice el título. Solo mide el largo (`chequeo.js` líneas 1041 a 1046). Se cambió por lo que sí mide |
| «Así lee nuestro chequeo: el código de la página tal como llega» (nota de la lámina 3) | Quedaba debajo de «0 palabras», y el chequeo cuenta unas 6 en ese sitio (el título). Se cambió por «lee sin ejecutarlo: en ese sitio deja «contenido suficiente» en pendiente», que se comprueba en su pantalla |
| «Revisado en octubre de 2026» | Se cambió por **«Revisado el 23 de octubre de 2026»**: los hallazgos se escribieron en julio y se re-verificaron el 23-oct, y una fecha exacta se puede volver a comprobar |

## 5. Historial de correcciones

Para que un arreglo no se quede en el chat y vuelva como defecto. Un revisor independiente leyó la pieza el 23-oct; estos son sus hallazgos y qué se hizo.

| Hallazgo (gravedad) | Qué se cambió | Dónde |
|---|---|---|
| **Alto.** El titular decía «antes de que alguien te escriba» y el mapa incluía «cuando escriben» y «cuando esperan», que ocurren después. «Consulta» tenía dos sentidos | Titular «Una consulta puede caerse antes y después de que alguien te escriba», con «puede» también en la historia personal. «Consulta» = lo que alguien pregunta por lo que vendes; lo que te escribe es el «mensaje» | `lamina-1.html` (100 px para que entre en cuatro líneas), pie, texto alternativo 1, historia personal, `publicar.md` |
| **Medio.** Lámina 3 no decía quién lee sin ejecutar JavaScript; jerga; el chequeo cuenta unas 6 palabras en ese sitio mientras la lámina decía «así lee nuestro chequeo» | Titular «Una portada puede verse completa y llegar vacía»; JavaScript explicado en media frase; el chequeo se nombra como el lector y de él solo se dice que lee sin ejecutarlo y deja «contenido suficiente» en pendiente. Sin cifras del chequeo. No se dice qué hace ninguna IA | `lamina-3.html`, `consulta.css` (cifra de 340 a 310 px y menos margen sobre la etiqueta, igual en láminas 2 y 3, para que quepa la nota de tres líneas sin desalinear), pie, texto alternativo 3 |
| **Medio.** La nota «una de las 21 señales» sugería que el chequeo lee lo que dice el título; solo mide el largo | Nota: «pide entre 15 y 65 caracteres en el título. Lo que dice, lo vemos a mano en la revisión». Lo de «qué haces y dónde» queda como recomendación nuestra | `lamina-2.html`, texto alternativo 2 y esta tabla |
| **Medio.** «Título de la portada» se lee como el titular grande de la página; esos sitios sí tienen texto visible | Titular «El título de la pestaña…», etiqueta «Pestaña del navegador», y en el pie «el título que aparece en la pestaña del navegador al abrir la portada» | `lamina-2.html`, pie, texto alternativo 2 |
| **Medio.** Los tres hallazgos vienen de prospectos que recibieron un correo en julio; el Gmail nunca se miró | **No se resuelve con texto: se convierte en puerta dura.** `publicar.md` ahora abre con el recuadro: mirar Gmail (respuestas, bajas, rebotes), sacar el hallazgo de quien respondió o pidió baja, y decisión de Ramón entre subir tal cual, generalizar más el rubro o no usar estos tres. No se agregó ningún dato que acerque la pieza a una empresa concreta | `publicar.md`, `caption.md` (encabezado), §3 de este archivo |

**Qué sigue abierto, a propósito:** la mirada a Gmail y la decisión de reconocimiento son de Ramón. El resto de la pieza puede quedar lista, pero no se programa.
