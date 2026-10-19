# E12 · El texto de toda la obra sobre la dirección A · Archivo

**19-oct-2026, desde las 09:55 (Chile) · Clara (copy de interfaz) con Renata (copy de venta)** · rama `claude/magical-franklin-ckfki2` · fuente: `texto-obra.json` (este archivo sale de ahí con `herramientas/md-obra.py`; no se edita a mano) · se comprueba con `herramientas/comprobar-obra.py`.

**Estado:** En avance (19-oct): escrito y comprobado con herramientas/comprobar-obra.py; faltan los dos detectores completos y la lectura fría en contexto aparte. Nada se publica: lo revisa Ramón.

**Manda:**

- e12/brief-de-obra.md, sección «Compuerta 2» (19-oct) y después «Compuerta 1»; e12/insumos-ramon-19oct.md
- spec-visual.md (Lucía, 19-oct): las rutas, los bloques y su orden; este archivo pone el texto de cada bloque
- e12/inventario-casos.md (§2, §2.9) y e12/inventario-praxi.md (al día con 5a a 5e): una etiqueta o un número sin fila no existe
- e12/senales-obra.md (Simón): title, description y JSON-LD de las 27 rutas; aquí se copian el title y la description para tenerlo todo junto, y donde difieran manda Simón
- spindlelab-astro/src/data/oferta-v3.json y servicios-v3.json: nombres y precios, comparados como texto
- e12/texto/texto-paso2.json: el texto que ya pasó dos lecturas frías y la compuerta 2; lo que viene de ahí lleva «origen» y no se reescribe
- marketing/portafolio/0N-*/caso.md (Bruno): los hechos de los cuatro conceptos, sin cambiar los verificados

## Cómo leer esto

- Tuteo en todo el sitio. Castellano de Chile. Sin raya de golpe.
- «tinta» + «gris» = una sola frase en dos tintas (lock §2.8 y §14: hasta 8 palabras en tinta, de 6 a 13 en gris, una vez por sección).
- «estado»: «queda» (viene del paso 2 o del sitio v3 y no cambia), «cambia» (con «antes» y «por_que») o «nuevo».
- «origen» dice de dónde viene el texto; «fuente», de dónde sale el hecho. Lo que no tiene fuente es redacción.
- «condicion» marca un texto que espera una decisión. Si la decisión es «no», el elemento sale o queda su «antes».
- «uso: referencia» es una instrucción para quien construye, no texto de la página. En las rutas que quedan, el texto que no cambia se toma de su dato (servicios-v3.json, paginas-v3.json, nosotros.astro) y no se transcribe aquí: así no hay dos copias que se separen.
- «medios» lista, por sección, cada archivo con su forma y su alt (imágenes) o su descripción (videos, que van con aria-hidden). Las filas y su orden los fija la spec; los alt se escribieron mirando cada imagen.
- Cada línea empieza con su rol entre comillas invertidas: `rotulo`, `h1`, `h2`, `entradilla`, `parrafo`, `boton`, `nota`, `ficha`, `cita`. *La parte en cursiva* es la continuación en gris.

## Lo que decidió Ramón en la compuerta 2, y cómo queda en el texto

| # | Decidió | En el texto |
|---|---|---|
| 1 | A · Archivo | El texto es el de A: la línea mono del índice va sin herramientas (salida A del paso 2) y la columna «Resultado» de B no va. |
| 2 | Logo El huso, monocromo | Su nombre accesible es «SpindleLab» (spec §5.4). |
| 3 | Hero 3 | La portada lleva el rótulo, el h1 y la entradilla de «hero-sitio», tal cual. |
| 4 | Portada: el video del hilo de oro; ninguna generación pagada | El video no lleva texto propio: alt vacío y aria-hidden; su pausa dice «Pausar el video» / «Seguir el video». La cinta pasa a sección propia, con nombre accesible y su ficha por tramo. |
| 5a | Capturas de los archivos | El caso Praxi va con las capturas de las páginas públicas; el hueco de las pantallas internas tiene su texto («praxi.pieza.hueco»). |
| 5b | No se cuenta la pausa | Salen la línea «Estado» de la ficha y el párrafo final de «Sin métrica». Ni «en pausa» ni «fuera de línea» en ninguna parte. |
| 5c | Las fotos de la landing, solo dentro de las capturas | Ningún alt describe una de esas fotos como foto: se describe la captura de la página. |
| 5d | Se nombran los modelos | Claude Haiku 4.5 registra lo que escribes y deja la conclusión del día; Claude Sonnet 5 conversa como coach con las cuentas ya hechas. En la lista para el técnico, con su identificador del código. |
| 5e | Se dice que se construyó con agentes de IA | En los créditos y en un párrafo de «La pieza», con el conteo medido (218 de 219) y separando las herramientas que programaron de los modelos de la app. |
| 5f | Praxi y Combeau, los dos casos reales | El caso Combeau es nuevo: una página con dos partes (#fotografia y #modelo), con lo que tiene fila en inventario-casos §2.9. |
| 6 | Los puntajes propios no se muestran (por defecto) | Ni 54 → 94 ni 36 → 73 en ninguna página. En «Cada pieza, con su prueba», Verifica y Cumple lleva un dato nuevo (cierra el defecto 20). |
| 7 | A Combeau se le recortan sus medidas (por defecto) | Ningún texto ni alt las menciona, ni dice que hay algo recortado (defecto 21 en A). |
| 8 a 10 | Ninguna interior clara; círculo blanco; logo monocromo (por defecto) | Sin efecto en el texto. El círculo dice adónde lleva: «Ver el caso», «Ver el concepto», «Ver el sitio» (Verifica y Cumple) e «Ir al chequeo». |

## Lo común a todas las páginas

### Nav

- `boton` Trabajo  
  → `/v3/trabajo/`
- `boton` Servicios  
  → `/v3/servicios/`
- `boton` Método  
  → `/v3/metodo/`
- `boton` Nosotros  
  → `/v3/nosotros/`
- `boton` Escríbenos  
  → `/v3/contacto/`
- `nota · nombre accesible` Principal  
  <sub>Dónde: aria-label del nav del encabezado</sub>

### Encabezado

- `nota · nombre accesible` SpindleLab  
  <sub>Dónde: aria-label del SVG del logo, en el encabezado y en el pie; el enlace del logo lleva a /v3/</sub>
- `rotulo` Santiago  
  <sub>Nota: Va con la hora en vivo y su huso («Santiago 14:05 UTC-3»), spec §5.5. La escribe el navegador.</sub>
- `boton` · **nuevo** Saltar al contenido  
  → `/v3/<ruta>/#contenido`  
  <sub>Nota: El primer enlace del documento, visible al recibir el foco (spec, lo común, punto 3). Se escribe con su ruta, nunca «#contenido» suelto (spec §5.2).</sub>

### Pie

- `boton` hola@spindlelab.cl  
  → `mailto:hola@spindlelab.cl`
- `rotulo` Santiago  
  <sub>Nota: La misma hora del encabezado. Los casos no tienen pie.</sub>

### Miga

- `rotulo · miga` Inicio · <página>  
  <sub>Nota: Separada por «·», la actual en blanco. Su BreadcrumbList dice lo mismo (Simón, senales-obra.md).</sub>

### Cursor

- `nota · cursor` Ver el caso  
  <sub>Dónde: Sobre una pieza real con página de caso: Combeau (las dos entradas) y Praxi</sub>
- `nota · cursor` Ver el concepto  
  <sub>Dónde: Sobre las cuatro piezas de concepto</sub>
- `nota · cursor` · **nuevo** Ver el sitio  
  <sub>Dónde: Sobre Verifica y Cumple, que enlaza a verifica.spindlelab.cl (spec §2.2 y §0.5, «Para Clara»)</sub>  
  <sub>Por qué: Dice adónde lleva, como los otros dos: no hay caso, hay un sitio que responde. En el rótulo quieto que aparece con el foco va el mismo texto.</sub>
- `nota · cursor` · **nuevo** Ir al chequeo  
  <sub>Dónde: Sobre la entrada «El chequeo de 21 señales», que lleva a /v3/diagnostico/</sub>  
  <sub>Por qué: No es un caso ni un sitio aparte: es la herramienta, en esta misma web.</sub>
- `nota · referencia` · **nuevo** El rótulo quieto que aparece al recibir el foco con el teclado lleva el mismo texto que el círculo de esa pieza.

### Controles

- `boton · nombre accesible` Pausar el video  
  en pausa: «Seguir el video»  
  <sub>Nota: aria-label del botón de pausa de todo video que se mueve solo (portada, cinta, casos), con aria-pressed. Con movimiento reducido o ahorro de datos el video no arranca y el botón dice «Seguir el video».</sub>
- `nota · nombre accesible` Secciones  
  <sub>Dónde: aria-label del índice de secciones de un caso o de un artículo</sub>
- `nota · nombre accesible` · **nuevo** Ver las secciones  
  <sub>Dónde: El «+» de la barra flotante del caso bajo 1194 px (el summary del details). Lo visible es el nombre del caso y la sección activa; esto es lo que lee el lector de pantalla del botón «+».</sub>
- `nota · solo lector de pantalla` · **nuevo** (sitio aparte: verifica.spindlelab.cl)  
  <sub>Dónde: Dentro del enlace de Verifica y Cumple, oculto a la vista; la flecha ↗ en SVG va con aria-hidden.</sub>

## /v3/ · home

- `title` SpindleLab · Estudio de diseño y tecnología en Santiago
- `description` Diseñamos y programamos sitios y herramientas a medida, listos para que Google y ChatGPT puedan leerlos. Precios publicados y un chequeo gratis de tu sitio.
- <sub>Señales: Simón, e12/senales-obra.md §2.1 (la description de Simón, de 156; la mía medía 170 y nombraba «la IA»: queda la de él, que nombra ChatGPT como el h1)</sub>
- *Estructura:* spec-visual.md §2.1: portada con el video del hilo de oro → la cinta → índice corto → cada pieza con su prueba → servicios → quién está detrás → contacto.

### Portada: el hilo de oro, la declaración y el chequeo

*Trabajo del bloque:* Decir qué es SpindleLab, qué hace y para quién, y que también hace SEO técnico y visibilidad en IA; y dejar el chequeo a mano para comprobarlo con el sitio propio. El video no dice nada: todo el trabajo lo hace el texto.

- `nota · referencia` · **nuevo** El video del hilo de oro (e12/medios/hilo/). La imagen quieta lleva alt vacío y el video, aria-hidden: es un ambiente sin información, así que no se describe ni lleva pie. No muestra a ninguna persona y no se presenta como trabajo (spec §0.3, punto 1), así que tampoco lleva el aviso de imagen generada.
- `boton · nombre accesible` · **nuevo** Pausar el video  
  en pausa: «Seguir el video»  
  <sub>Dónde: Arriba a la derecha de la portada; primer control en el orden de tabulación (spec §3.1, punto 3)</sub>
- `rotulo` Estudio de diseño y tecnología
- `h1` Diseñamos y programamos sitios a medida. *Y los dejamos listos para que Google y ChatGPT puedan leerlos.*  
  <sub>Nota: Hero 3, elegido por Ramón en la compuerta 2 («3 tres»). Es la frase de 48 px en la esquina, sobre el velo.</sub>
- `entradilla` Para empresas, clínicas y estudios profesionales. Si tu sitio ya existe y no lo vas a rehacer, también hacemos SEO técnico y visibilidad en IA: revisamos qué le impide a Google y a ChatGPT leerlo, y lo arreglamos.
- `rotulo` Chequeo gratis
- `parrafo` Escribe la dirección de tu sitio y en segundos ves si ChatGPT y otros asistentes de IA pueden leerlo y entender a qué te dedicas.  
  <sub>Fuente: inventario-casos §2.4; e11/material.md §3</sub>
- `rotulo · label` La dirección de tu sitio
- `nota · placeholder` tuempresa.cl
- `boton` Revisar mi sitio  
  → `corre /api/chequeo en la misma pantalla (v3-chequeo.js; ids chq-* sin cambio)`
- `nota · ayuda` Mira 21 cosas de tu sitio, gratis y sin pedirte el correo. No guardamos la dirección que escribes. Si construimos tu sitio, le pasamos este chequeo antes de entregártelo.  
  <sub>Fuente: chequeo.js (21 ítems); /v3/diagnostico/ («Gratis y sin dejar tu correo», FAQ «¿Guardan mi dominio?»); Desarrollo web, «Todo parte con esto»</sub>
- `nota · error` · **cambia** Escribe la dirección de tu sitio para empezar.  
  <sub>Antes: «Escribe tu dominio para empezar.»</sub>  
  <sub>Por qué: El campo dice «La dirección de tu sitio» desde la lectura fría (la dueña de la clínica no sabía si «dominio» era la dirección de su página) y el error todavía dice «dominio» (direccion-a.md §6.2).</sub>  
  ⚠ **Condición:** Vive en v3-chequeo.js, que el brief protege (criterio 11: diff 0 o el cambio con su motivo en la spec). Lucía lo anota en la spec y Diego lo cambia; si no, queda el de hoy.
- `nota · referencia` El resultado del chequeo, los veredictos, «Revisando…», «Pedir el diagnóstico», «Prefiero hablarlo contigo» y los demás errores son los de producción (v3-chequeo.js, pase de voz de E8) y quedan tal cual.

**Lo que se borró o cambió, y por qué**

- Las opciones 1 y 2 del hero quedan en texto-paso2.json como historia (compuerta 2, punto 3).
- Nada sobre el video: ni pie, ni rótulo, ni «generado con IA». No muestra personas ni se presenta como trabajo, y cualquier texto encima que no sea la frase y el chequeo es un texto sobre un medio (spec §6.6).

### La cinta: ocho piezas, dos segundos cada una

*Trabajo del bloque:* Mostrar que lo de arriba ya existe, en movimiento, y llevar a cada pieza. Sin titular visible.

- `nota · nombre accesible` · **cambia** Ocho piezas seguidas, dos segundos cada una: los dos sitios de Bernardo Combeau, Praxi y Verifica y Cumple, y cuatro conceptos: Sesenta, Tonela, Ocelo y Doceavo.  
  <sub>Dónde: aria-label de la sección (el video va con aria-hidden)</sub>  
  <sub>Antes: «Ocho piezas seguidas, dos segundos cada una: los sitios de Combeau, Praxi y Verifica y Cumple, y las piezas de concepto Sesenta, Tonela, Ocelo y Doceavo»</sub>  
  <sub>Por qué: Combeau son dos sitios; «las piezas de concepto» pasa a «cuatro conceptos».</sub>
- `boton · nombre accesible` · **nuevo** Pausar el video  
  en pausa: «Seguir el video»  
  <sub>Dónde: Esquina de abajo a la derecha de la cinta</sub>
- `ficha · tramos` · **nuevo**
  - **Combeau, fotografía** · Cliente · 2026 · El sitio de un fotógrafo de retrato. → `/v3/trabajo/combeau/#fotografia`
  - **Sesenta** · Concepto · 2026 · Un estudio de abogados laborales que no existe, del lado del trabajador. → `/v3/trabajo/sesenta/`
  - **Praxi** · Propio · 2026 · Una app de entrenamiento con un coach de IA que se acuerda de cada serie. · *Las personas están generadas con IA.* → `/v3/trabajo/praxi/`
  - **Tonela** · Concepto · 2026 · Un proveedor de izaje que no existe, en Antofagasta: eslingas, cadenas y grilletes. → `/v3/trabajo/tonela/`
  - **Verifica y Cumple** · Propio · 2026 · Revisa gratis las señales técnicas que la Ley 21.719, de datos personales, le pide a un sitio con formulario. · *La persona a caballo de esta portada está generada con IA.* → `https://verifica.spindlelab.cl/`
  - **Ocelo** · Concepto · 2026 · Una clínica de ojos que no existe, en Providencia. → `/v3/trabajo/ocelo/`
  - **Combeau, modelo** · Cliente · 2026 · El mismo cliente, el otro oficio: su book de modelo, en inglés. → `/v3/trabajo/combeau/#modelo`
  - **Doceavo** · Concepto · 2026 · Un estudio contable que no existe, en Concepción. → `/v3/trabajo/doceavo/`  
  <sub>Nota: La ficha de la pieza que está pasando (spec §2.1, fila 2; cinta.json). El nombre va enlazado; tipo · año en mono; la bajada en chico es la primera frase de su entrada del índice.</sub>

**Lo que se borró o cambió, y por qué**

- El tramo de Verifica y Cumple suma la nota de la persona a caballo: es una imagen generada con IA (Higgsfield, commit 698821e del 21-sep, «Imagen generada (Higgsfield, cinematic_studio_2_5): un fiscalizador a caballo»), y la regla del caso Praxi vale para toda persona generada que se vea en el sitio: se dice junto a la imagen.

### Índice corto de trabajo

*Trabajo del bloque:* Mostrar cuatro piezas de tipos distintos y llevar al índice.

- `h2` Trabajo. *Lo que diseñamos y programamos, para clientes y para nosotros.*
- `nota · referencia` · **cambia** Cuatro entradas del índice, con el mismo nombre y bajada que en /trabajo/ y la línea mono solo tipo · año: Combeau, fotografía (→ /v3/trabajo/combeau/#fotografia) · Praxi (→ /v3/trabajo/praxi/) · Verifica y Cumple (→ https://verifica.spindlelab.cl/, con ↗) · Sesenta (→ /v3/trabajo/sesenta/). Ver «trabajo.entradas».  
  <sub>Antes: «Cuatro entradas del índice, con el mismo nombre y bajada que en /trabajo/, y en la línea mono solo tipo · año (sin herramientas)»</sub>  
  <sub>Por qué: Los destinos: Combeau es una página con dos partes y Verifica y Cumple no tiene caso (spec §0.4, puntos 6 y 7).</sub>
- `nota · pie` · **nuevo** La persona a caballo de esta portada está generada con IA.  
  <sub>Dónde: Junto a la portada de Verifica y Cumple (verifica-y-cumple-45: la persona a caballo se ve entera)</sub>
- `nota` Las marcas rotuladas Concepto son inventadas: muestran cómo trabajaríamos un rubro, y no tuvieron clientes.
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`  
  <sub>Nota: El único corchete de la página (lock §14). El 10 es el conteo verdadero del índice: si cambia el número de entradas, cambia aquí.</sub>

### Cada pieza, con su prueba

*Trabajo del bloque:* Cumplir lo que dice el posicionamiento: lo que construimos se puede medir. Una pieza al lado de un dato revisable, con fecha.

- `h2` · **cambia** Cada pieza, con su prueba. *Al lado de lo que hicimos, un dato con fecha que puedes revisar.*  
  <sub>Antes: «Cada pieza, con su prueba. Al lado de lo que hicimos, un dato con su fecha, que puedes revisar.»</sub>  
  <sub>Por qué: Lock §14: la continuación gris va de 6 a 13 palabras y la tinta hasta 8 (lo midió herramientas/comprobar-obra.py).</sub>
- `parrafo` No son cifras de ventas de clientes: esas no las tenemos medidas, y no las vamos a inventar. Son datos de cómo quedó hecho el trabajo.
- `h3` El sitio de Bernardo Combeau, fotógrafo de retrato.
- `parrafo` Él sube sus fotos tal como las tiene, sin achicarlas, y el sitio las ajusta solo a la pantalla de cada visitante. Una foto que él sube con 805 kB, quien la mira la recibe en 95 kB: ocho veces más liviana, así que en el celular aparece antes.  
  <sub>Fuente: inventario-casos §2.1 (Netlify Image CDN: 804.697 → 94.576 bytes, WebP a 828 px)</sub>
- `ficha`   - **Medido:** 16-oct-2026  
  <sub>Nota: El permiso es el de la compuerta 1, punto 2 («no se necesita más permiso»), dicho por Ramón.</sub>
- `h3` Praxi, una app de entrenamiento con un coach de IA.
- `parrafo` En Praxi la IA conversa, pero no decide cuánto peso levantas: eso lo calcula un programa con reglas fijas. La app tiene 384 pruebas automáticas que revisan, cada vez que algo cambia, que todo siga calculando igual, y el 16 de octubre pasaron todas.  
  <sub>Fuente: inventario-praxi §0.1, §5 y §8.1 (384/384 en 35 archivos)</sub>
- `ficha`   - **Medido:** 16-oct-2026
- `h3` Verifica y Cumple, nuestro chequeo gratis de la ley de datos personales.
- `parrafo` · **cambia** Revisa desde afuera lo que la Ley 21.719 le pide a un sitio con formulario: si enlaza la política de privacidad, si pide permiso antes de medir a quien entra y si el formulario tiene su casilla de consentimiento. El 16 de octubre respondió en 0,52 segundos. No es asesoría legal: te dice qué falta, no si cumples la ley.  
  <sub>Antes: «Su sitio sacaba 54 de 100 en el chequeo gratis de esta página. Le agregamos lo que le faltaba, como un bloque de datos que el visitante no ve, pero que Google y la IA leen para saber qué es el sitio y quién está detrás. Dos días después sacó 94. Puedes comprobarlo: escribe verifica.spindlelab.cl en el chequeo de esta página.»</sub>  
  <sub>Por qué: Cierra el defecto 20 del acta del paso 2: sin el 54 → 94 (compuerta 2, pregunta 6, por defecto). La «alternativa» del paso 2 cambiaba la pieza por el chequeo, pero la spec deja el medio de Verifica y Cumple en esta fila (§3.3, «sus 12 cosas»): el texto ahora habla de esa pieza, con un dato medido.</sub>  
  <sub>Fuente: inventario-casos §2.3 (qué revisa; Medido: /api/chequeo respondió 200 en 0,52 s el 16-oct) y §7 («describe señales; no certifica»)</sub>
- `ficha` · **cambia**   - **Medido:** 16-oct-2026  
  <sub>Antes: «[{"rotulo": "Medido", "valor": "14 y 16-oct-2026"}]»</sub>  
  <sub>Por qué: El dato es el tiempo de respuesta del 16-oct, no el puntaje del 14 y el 16.</sub>

**Lo que se borró o cambió, y por qué**

- El 54 → 94 de Verifica y Cumple: no se muestra (compuerta 2, pregunta 6). Sigue medido en el inventario.

### Servicios, Desarrollo web primero

*Trabajo del bloque:* Que cada lector encuentre su caso por la situación en que está, con el precio a la vista.

- `h2` Servicios. *Lo que hacemos, cada uno con su precio publicado.*
- `parrafo` Si no sabes cuál te sirve, pide el mini-diagnóstico gratis: con él te decimos por dónde partir.  
  <sub>Fuente: servicios-v3.json acompanamiento-mensual.faq[4] («Cuál te conviene lo definimos después del mini-diagnóstico gratuito»)</sub>
- `rotulo · situacion` Tu sitio te frena, o no existe.
- `h3` Desarrollo web
- `parrafo` Lo diseñamos y lo programamos a medida, sin plantilla. Queda listo para que Google y la IA puedan leerlo, y antes de entregarlo le pasamos el chequeo gratis de esta página.
- `nota · precio` Desde $390.000 + IVA  
  <sub>Fuente: oferta-v3.json momentos[0].planes[0].p</sub>
- `boton` Ver Desarrollo web  
  → `/v3/servicios/desarrollo-web/`
- `rotulo · situacion` Tu sitio existe y no lo vas a rehacer.
- `h3` Visibilidad en IA
- `parrafo` Cuando alguien le pregunta por tu rubro a ChatGPT o a otro asistente de IA, como Gemini o Perplexity, la respuesta sale de lo que esas herramientas leen en internet: tu sitio y lo que otros dicen de ti. Trabajamos los dos para que tu empresa pueda aparecer. Nadie puede prometerte que aparezcas, y no tenemos una cifra de cuántos clientes llegan hoy por ahí. Por eso el primer paso, el chequeo, es gratis.  
  <sub>Fuente: servicios-v3.json visibilidad-en-ia.lead; e11/material.md E17 y §6 («No prometemos», /v3/servicios/visibilidad-en-ia/)</sub>
- `nota · escena` En septiembre revisamos desde afuera el sitio público de un estudio de abogados que aquí no nombramos, con más de 250 artículos. Google podía leer su sitio; ChatGPT, Claude y Perplexity recibían un error. Lo causaba una regla del servicio que protege su sitio, que alguien activó sin saber qué apagaba.  
  <sub>Fuente: e11/material.md E1; ventas/presentaciones/*-2026-09-11/preguntas-y-hallazgos.md:24-39 («una regla del CDN que alguien activó sin saber qué apagaba»; la prueba fue sobre la portada)</sub>
- `nota · precio` Desde $400.000 + IVA  
  <sub>Fuente: servicios-v3.json visibilidad-en-ia (Auditoría de Visibilidad)</sub>
- `boton` Ver Visibilidad en IA  
  → `/v3/servicios/visibilidad-en-ia/`
- `rotulo · situacion` Quieres saber qué frena a tu sitio en Google.
- `h3` Auditoría SEO técnica
- `parrafo` El SEO técnico es lo que permite que Google encuentre tus páginas, las lea y las muestre. La auditoría revisa tu sitio completo y te dice qué falla y qué arreglar primero.
- `nota · precio` Desde $490.000 + IVA  
  <sub>Fuente: servicios-v3.json auditoria-seo-tecnica (Auditoría Completa)</sub>
- `boton` Ver Auditoría SEO técnica  
  → `/v3/servicios/auditoria-seo-tecnica/`
- `rotulo · situacion` Tu sitio ya funciona y quieres que siga mejorando.
- `h3` Acompañamiento mensual
- `parrafo` Una auditoría te dice qué hacer; este servicio lo hace, mes a mes, en SEO técnico, en visibilidad en IA o en las dos. Mínimo tres meses; después, mes a mes, con aviso de 30 días.  
  <sub>Fuente: servicios-v3.json acompanamiento-mensual (lead, linea y nota[1] «Cumplidos los 3 meses, mes a mes con aviso de 30 días»)</sub>
- `nota · precio` Desde $590.000/mes + IVA  
  <sub>Fuente: servicios-v3.json acompanamiento-mensual (Esencial)</sub>
- `boton` Ver Acompañamiento mensual  
  → `/v3/servicios/acompanamiento-mensual/`
- `parrafo` También: Paid Media (Google), la gestión de tus anuncios de búsqueda en Google, desde $350.000/mes + IVA, sin contar lo que inviertes en los anuncios; y Gestión de redes sociales en LinkedIn, Instagram y Facebook, desde $390.000/mes + IVA.  
  enlaces: «Paid Media (Google)» → `/v3/servicios/paid-media/`, «Gestión de redes sociales» → `/v3/servicios/redes-sociales/`  
  <sub>Fuente: oferta-v3.json tambien; servicios-v3.json paid-media y redes-sociales (planes[0].precio); servicios-v3.json paid-media.nota («El precio es el fee de gestión»; «La inversión en pauta la pones tú»)</sub>  
  <sub>Nota: Compuerta 1, punto 1: en la home, una línea.</sub>

### Quién está detrás

*Trabajo del bloque:* Contestar quién hace esto antes de que lo pregunten, sin inflar el tamaño.

- `h2` · **cambia** Detrás de SpindleLab está Ramón Vallejos. *Diseña y programa con agentes de IA; él revisa y aprueba el código.*  
  <sub>Antes: «Detrás de SpindleLab está Ramón Vallejos. Diseña él, y programa con agentes de IA: escriben código que él revisa y aprueba.»</sub>  
  <sub>Por qué: Lock §14: la continuación gris va de 6 a 13 palabras y la tinta hasta 8 (lo midió herramientas/comprobar-obra.py). La idea no cambia: los agentes escriben el código y él lo revisa y lo aprueba.</sub>  
  <sub>Fuente: nosotros.astro:85 («con agentes de IA a mi lado y partners para lo que no hacemos en casa»)</sub>
- `parrafo` Antes pasó más de cinco años en agencias: Universal McCann; Graphene IPG, con la cuenta de LATAM Airlines en cuatro países; Incrementa y Maggiore.  
  <sub>Fuente: nosotros.astro:89-94 (CV cerrado, e11/material.md §5)</sub>
- `parrafo` Tú hablas con él durante todo el proyecto. Cuando un trabajo pide algo que él no hace, lo hace con otros profesionales, y te lo dice. Los precios, el método y el chequeo están publicados, para que compares antes de escribirnos.  
  ⚠ **Condición:** «y te lo dice» describe cómo trabaja Ramón: lo confirma él.
- `boton` Conocer a Ramón  
  → `/v3/nosotros/`
- `nota · alt` Ramón Vallejos, de camisa celeste, sobre fondo oscuro.

### Contacto

*Trabajo del bloque:* Decir qué pasa al escribir: qué recibes, en cuánto tiempo y si cuesta.

- `h2` Escríbenos con la dirección de tu sitio. *En 24 horas te mandamos el mini-diagnóstico, gratis.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `parrafo` Es una página con lo que está bien en tu sitio, lo que lo frena y qué haríamos primero. Lo hace una persona, que además le pregunta a ChatGPT, Gemini y Perplexity por tu rubro, cosa que el chequeo gratis de esta página no hace.  
  <sub>Fuente: paginas-v3.json contacto.lead; e11/material.md §3 («lo hace el mini-diagnóstico a mano»)</sub>
- `parrafo` Si partes de cero, en el mismo plazo te escribimos para conversar tu proyecto.  
  <sub>Fuente: paginas-v3.json contacto (bloque «Listo.»)</sub>
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `nota` O directo a hola@spindlelab.cl

## /v3/trabajo/ · trabajo

- `title` Trabajo de diseño y desarrollo web · SpindleLab
- `description` Sitios, una app y herramientas que diseñamos y programamos, y cuatro marcas inventadas para rubros que atendemos. Cada entrada dice de quién es y qué se midió.
- <sub>Señales: Simón, e12/senales-obra.md §2.2 (el title de Simón, con la consulta que lo buscaría; la description es la mía)</sub>
- *Estructura:* spec-visual.md §2.2: barra lateral con el h1, el conteo, la entradilla y el filtro; a la derecha el muro de dos columnas.

### Título, bajada y filtro

*Trabajo del bloque:* Decir qué hay y cómo leer el tipo de cada entrada, sobre todo qué es un concepto.

- `rotulo · miga` · **nuevo** Inicio · Trabajo
- `h1` Trabajo. *Lo que diseñamos y programamos, y cómo lo resolveríamos en tu rubro.*
- `entradilla` Cada entrada dice de quién es. Cliente es un encargo pagado: hoy hay uno con caso publicado, con sus dos sitios. Propio lo hicimos para nosotros, sin encargo. Concepto es una marca inventada para mostrar cómo trabajaríamos un rubro: no existe, no tuvo clientes y no lleva cifras.
- `rotulo` (10)  
  <sub>Nota: Conteo verdadero de entradas; sale del dato, no se escribe a mano.</sub>
- `rotulo · filtro` Todo (10) · Cliente (2) · Propio (4) · Concepto (4)  
  <sub>Nota: El filtro filtra de verdad (encargo §2, vista 2). Los conteos salen del dato. Tres tipos y no cuatro: el lock §7 separaba «herramienta», pero Verifica y Cumple también es una herramienta gratis y la diferencia no se podía explicar en una línea. Si Lucía la quiere de vuelta, la entradilla suma una frase.</sub>
- `nota · nombre accesible` · **nuevo** Filtrar por tipo  
  <sub>Dónde: aria-label del grupo de botones del filtro (cada botón con aria-pressed)</sub>

**Lo que se borró o cambió, y por qué**

- «trabajo.nota-herramientas» sale: en A la línea mono es tipo · año, sin herramientas (texto-paso2, «Para la construcción», dirección A). Las herramientas van en el caso, después de lo que hacen. La spec §2.2 permite «hasta dos ingredientes»: cero cabe en ese tope.
- La columna «Resultado» es de B y no va en A; queda en texto-paso2.json.

### Las entradas del índice

*El orden del muro de la spec §2.2, que es el del paso 2: una de cliente primero y los conceptos intercalados.*

| # | Nombre | Bajada (gris) | Línea mono | Adónde lleva · círculo | Pie o nota |
|---|---|---|---|---|---|
| 1 | **Combeau, fotografía** | El sitio de un fotógrafo de retrato. Él sube sus series desde un panel, y el sitio las publica con cada foto ajustada a la pantalla de quien la mira. | Cliente · 2026 | `/v3/trabajo/combeau/#fotografia` · «Ver el caso» |  |
| 2 | **Praxi** | Una app de entrenamiento con un coach de IA que se acuerda de cada serie. El modelo conversa; cuándo subir el peso lo calcula el código. | Propio · 2026 | `/v3/trabajo/praxi/` · «Ver el caso» | Si su portada del muro lleva personas, va con «Las personas están generadas con IA.» |
| 3 | **Sesenta** | Un estudio de abogados laborales que no existe, del lado del trabajador. Su portada cuenta los días hábiles que te quedan para demandar. | Concepto · 2026 | `/v3/trabajo/sesenta/` · «Ver el concepto» |  |
| 4 | **Verifica y Cumple** | Revisa gratis las señales técnicas que la Ley 21.719, de datos personales, le pide a un sitio con formulario. No es asesoría legal ni certifica que cumples. | Propio · 2026 | `https://verifica.spindlelab.cl/` · «Ver el sitio» | La persona a caballo de esta portada está generada con IA. Enlaza al producto, que responde; con la flecha ↗ en SVG junto al nombre y, oculto a la vista, «(sitio aparte: verifica.spindlelab.cl)». |
| 5 | **Ocelo** | Una clínica de ojos que no existe, en Providencia. En vez de prometer que vas a dejar los lentes, te muestra el examen que dice si te puedes operar. | Concepto · 2026 | `/v3/trabajo/ocelo/` · «Ver el concepto» |  |
| 6 | **Combeau, modelo** | El mismo cliente, el otro oficio: su book de modelo, en inglés, que también se edita desde el panel. Los videos se descargan solo cuando alguien los abre. | Cliente · 2026 | `/v3/trabajo/combeau/#modelo` · «Ver el caso» |  |
| 7 | **Doceavo** | Un estudio contable que no existe, en Concepción. Su portada te dice cuándo vence tu próxima declaración mensual, y su logo cambia cada mes. | Concepto · 2026 | `/v3/trabajo/doceavo/` · «Ver el concepto» |  |
| 8 | **El chequeo de 21 señales** **(cambia)** | Escribes la dirección de un sitio y en segundos ves si ChatGPT y otros asistentes de IA pueden leerlo y entender a qué se dedica. También avisa si el servidor los echa aunque tu configuración los deje pasar. | Propio · 2026 | `/v3/diagnostico/` · «Ir al chequeo» |  |
| 9 | **Tonela** | Un proveedor de izaje que no existe, en Antofagasta: eslingas, cadenas y grilletes. Ordena su sitio con el color que la norma le da a cada capacidad de carga. | Concepto · 2026 | `/v3/trabajo/tonela/` · «Ver el concepto» |  |
| 10 | **spindlelab.cl** | Este sitio. El chequeo de la portada corre en nuestro servidor, y Google Analytics y el píxel de Meta no cargan hasta que aceptas las cookies. | Propio · 2026 | sin enlace | Sin enlace: es este sitio. La pieza no es un enlace, no tiene círculo ni velo (spec §2.2). |

<sub>El chequeo de 21 señales: antes «Escribes un dominio y en segundos ves si ChatGPT, Claude y Perplexity pueden entrar y entender a qué se dedica. También avisa si el servidor los echa aunque tu configuración los deje pasar.». «pueden entrar» le sonó a hackeo al gerente en la lectura fría (texto-paso2, home, «Lo que se borró»), y la home y /diagnostico/ ya lo dicen así: un solo idioma para el chequeo.</sub>

<sub>Fuentes por entrada: Combeau, fotografía: inventario-casos §2.1 (las dos etiquetas y su efecto: «él carga sus series solo», «805 kB → 95 kB») · Praxi: inventario-praxi §4 y §8.1 · Sesenta: marketing/portafolio/06-sesenta/ficha.md §4.1 y §6 · Verifica y Cumple: inventario-casos §2.3 y §4.1 y §7 («describe señales; no certifica») · Ocelo: marketing/portafolio/05-ocelo/caso.md (Desafío, Estrategia) y ficha.md §6 · Combeau, modelo: inventario-casos §2.2 («0 kB de video en la carga inicial») · Doceavo: marketing/portafolio/07-doceavo/caso.md (Estrategia, Identidad) · El chequeo de 21 señales: inventario-casos §2.4 y §4.4 · Tonela: marketing/portafolio/04-tonela/caso.md (Desafío, Estrategia) · spindlelab.cl: inventario-casos §2.6 y §4.1 (36 y 73 son dichos, sin crudo). El 100 del 14-oct no va: con la regla cambiada, el abogado lo leyó como «cambiaron la escala y ahora sacan el máximo» (lectura fría, vuelta 2). La alternativa: inventario-casos.json «GA4 y Meta Pixel tras el aviso de cookies», medido en e12/inventario/crudo/carga-playwright.json (16-oct-2026 17:54Z, portada de producción, 3 corridas a 1440 y a 390, sin aceptar cookies: el único tercero es static.cloudflareinsights.com, unos 10,6 kB)</sub>

## /v3/trabajo/praxi/ · caso-praxi

- `title` Praxi: app de entrenamiento con un coach de IA · SpindleLab
- `description` Diseñamos y programamos Praxi con agentes de IA: una app de entrenamiento por chat. La IA conversa; cuándo subir el peso lo calcula código con pruebas.
- <sub>Señales: Simón, e12/senales-obra.md §2.3 (los míos medían 73 y 175; los de Simón guardan las dos ideas y suman la 5e)</sub>
- *Estructura:* La plantilla de caso de la spec §2.3 (lock §21.5): barra lateral, medio principal 16:9, cinco secciones con su rótulo y sus filas, y «Siguiente». Sin pie.

### Barra lateral (bajo 1194: el encabezado y la barra flotante)

*Trabajo del bloque:* Nombrar el caso, decir qué tipo de trabajo es y llevar a cada sección.

- `rotulo · miga` · **nuevo** Inicio · Trabajo · Praxi
- `h1` · **cambia** Praxi. *Se acuerda de cada serie que hiciste.*  
  <sub>Antes: «Praxi. Se acuerda de cada serie»</sub>  
  <sub>Por qué: La continuación en gris tenía 5 palabras y el lock §14 pide de 6 a 13; ahora es la frase de la portada de Praxi, tal cual. Con punto en las dos partes, como los demás titulares del sitio («Trabajo.», «Servicios.»): sin él, el h1 se lee «Praxi Se acuerda…» en un lector de pantalla.</sub>
- `ficha` · **cambia**
  - **Tipo:** Propio
  - **Año:** 2026
  - **Qué es:** Sitio y app
  - **Hecho:** 21-jul a 25-ago-2026  
  línea mono: «Propio · 2026 · Sitio y app»  
  <sub>Antes: «[{"rotulo": "Tipo", "valor": "Propio"}, {"rotulo": "Año", "valor": "2026"}, {"rotulo": "Qué es", "valor": "Sitio y app"}, {"rotulo": "Hecho", "valor": "21-jul a 25-ago-2026"}, {"rotulo": "Estado", "valor": "Fuera de línea", "condicion": "Decide Ramón si se dice que está en pausa (inventario-praxi §10.2). Si dice que no, el campo sale y el resto no cambia."}]»</sub>  
  <sub>Por qué: Compuerta 2, 5b: «no se cuenta». Sale la línea «Estado: Fuera de línea».</sub>  
  <sub>Fuente: inventario-praxi §2 y §9 (Ficha)</sub>
- `rotulo · índice de secciones` Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` Quién lo hizo
- `nota` Marca, sitio, app y campaña: Ramón Vallejos, con agentes de IA.  
  <sub>Fuente: inventario-praxi §2 («Quién lo hizo»: los commits llevan Co-Authored-By: Claude)</sub>  
  <sub>Nota: Compuerta 2, 5e: «si fue con agentes de IA». Medido: 218 de los 219 commits de código llevan Co-Authored-By: Claude (inventario-praxi §2).</sub>

### Medio principal

*Trabajo del bloque:* Mostrar la pieza entera, y decir sin letra chica qué es generado.

- `nota · alt` Cinco escenas cortas de un hombre que entrena, come en casa, camina, está en una reunión y en una cena: el video del inicio del sitio de Praxi.  
  <sub>Nota: Descripción del video del hero (va con aria-hidden: este texto va en el aria-label de su figura o como texto oculto junto al pie).</sub>
- `nota · pie` El video del inicio de Praxi. Las personas están generadas con IA.  
  <sub>Fuente: inventario-praxi §7 (Seedance 2.0, personaje PraxiChileno)</sub>

### Problema

*Trabajo del bloque:* Contar el problema en palabras de cualquiera, sin jerga de gimnasio.

- `rotulo` Problema
- `h2` · **cambia** Las apps olvidan lo que entrenaste.  
  <sub>Antes: «Las apps de entrenamiento olvidan lo que hiciste.»</sub>  
  <sub>Por qué: Lock §21.5: titulares de sección de 2 a 7 palabras (lo midió herramientas/comprobar-obra.py).</sub>
- `parrafo` · **cambia** Quien entrena con pesas se hace la misma pregunta cada semana: si subir el peso o no. La respuesta depende de lo que hizo las semanas anteriores, y en las reseñas de las apps de entrenamiento se repite la misma queja: que no se acuerdan.  
  <sub>Antes: «Quien entrena con pesas se hace la misma pregunta cada semana: si subir el peso o no. La respuesta depende de lo que hizo las semanas anteriores, y en las reseñas de las apps de entrenamiento la queja que más se repite es que no se acuerdan.»</sub>  
  <sub>Por qué: inventario-praxi §8.1 (19-oct): «la queja que más se repite» es el juicio de una investigación interna, no un conteo. Se dice lo que sí está: que la queja se repite.</sub>  
  <sub>Fuente: inventario-praxi §8.1, fila «Problema» (docs/2026-08-03-inteligencia-mercado-praxi.md §1.2 y §2.1: cinco citas de reseñas, marcadas [D])</sub>
- `parrafo` Praxi partió vendiendo otra cosa: un coach que te explica el porqué de cada decisión. Eso ChatGPT ya lo hace gratis, y lo hace bien. Había que ofrecer algo que un chat general no puede hacer.  
  <sub>Fuente: Praxi, inteligencia-mercado §1.1 (D'hoe et al., 2026); CLAUDE.md de Praxi, «Lo que se vende es la MEMORIA»</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/praxi-portada-390-45.webp` | 4:5 | Captura de la portada de Praxi en un celular: «Se acuerda de cada serie que hiciste.», sobre el video de un hombre que entrena. | Las personas están generadas con IA. |
| `tableros/e12-direcciones/proto/a/medios/praxi-login-390-45.webp` | 4:5 | Captura de la entrada de Praxi en un celular, con su lema de antes, «Entrena sabiendo por qué», y el formulario para entrar. | Las personas están generadas con IA. |

### Hipótesis

*Trabajo del bloque:* Decir qué se creyó y cómo se iba a saber si funcionaba.

- `rotulo` Hipótesis
- `h2` Vender la memoria, no la explicación.
- `parrafo` Si Praxi se acuerda de cada serie, puede decirte cuándo subir el peso, y eso no lo hace un chat que no guarda lo que entrenaste. La portada pasó de «Entrena sabiendo por qué» a «Se acuerda de cada serie que hiciste», y las palabras técnicas del entrenamiento salieron de la portada, porque en Chile casi nadie las busca en Google.  
  <sub>Fuente: inventario-praxi §2 (Claim) y §9 (Estrategia); CLAUDE.md de Praxi, «La jerga no va en la portada»</sub>
- `parrafo` · **cambia** Para saber si funcionaba, se fijó una señal: que alguien vuelva a anotar, con su peso, un ejercicio que ya había anotado antes. Quedó programada en el servidor, con sus pruebas automáticas.  
  <sub>Antes: «Para saber si funcionaba, se fijó una señal: que alguien volviera a anotar, con su peso, un ejercicio que ya había anotado antes. Esa señal quedó medida en el servidor.»</sub>  
  <sub>Por qué: La señal ya tiene fila (inventario-praxi §8.1, 19-oct). «Quedó medida» se leía como que hay un resultado; el inventario dice que lo exacto es «quedó programada».</sub>  
  <sub>Fuente: inventario-praxi §8.1, fila «Hipótesis» (instrumentacion-medicion.md:95-97; lib/growth/activacion.ts; 11 tests)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/praxi-reglas-169.webp` | 16:9 | Captura de la portada de Praxi: «Debajo del chat hay reglas, no una corazonada.», con las tres reglas que calcula el código. |  |

### Solución

*Trabajo del bloque:* Explicar qué hace la IA y qué no, con los dos modelos nombrados y lo que hace cada uno para quien usa Praxi (compuerta 2, 5d).

- `rotulo` Solución
- `h2` · **cambia** La IA conversa. El código decide.  
  <sub>Antes: «El modelo conversa. El código decide.»</sub>  
  <sub>Por qué: Con dos modelos nombrados, «el modelo» en singular dejó de ser exacto.</sub>
- `parrafo` · **cambia** A Praxi le escribes como a una persona: «hoy hice press banca, tres series de 10 con 60 kilos». Claude Haiku 4.5, un modelo de IA de Anthropic, convierte esa frase en un registro ordenado y, si no está seguro de que le contaste un entrenamiento, no guarda nada. Al cerrar el día, el mismo modelo te deja una observación corta sobre lo que hiciste.  
  <sub>Antes: «A Praxi le escribes como a una persona: «hoy hice press banca, tres series de 10 con 60 kilos». La IA convierte esa frase en un registro ordenado y, si no está segura de que le contaste un entrenamiento, no guarda nada.»</sub>  
  <sub>Por qué: Compuerta 2, 5d: «nombra». El modelo pequeño, con su nombre y lo que hace: registra lo que escribes y escribe la conclusión del día.</sub>  
  <sub>Fuente: inventario-praxi §4 (claude-haiku-4-5, EXTRACTION_MODEL, lib/anthropic.ts:17; usos 1 y 4) y §5.1 y §5.6</sub>
- `parrafo` · **cambia** Las decisiones que importan no las toma ningún modelo. Cuándo subir el peso, cuándo hacer una semana más liviana para recuperarte y qué serie cuenta los calcula código, revisado por pruebas automáticas que comprueban, cada vez que algo cambia, que cada regla siga dando lo mismo. Esas cuentas le llegan hechas a Claude Sonnet 5, el modelo que conversa contigo como coach y te las explica.  
  <sub>Antes: «Las decisiones que importan no las toma el modelo. Cuándo subir el peso, cuándo hacer una semana más liviana para recuperarte y qué serie cuenta los calcula código, revisado por pruebas automáticas: programas que comprueban, cada vez que algo cambia, que cada regla siga dando lo mismo. El peso sube solo después de dos sesiones confirmadas, nunca por una suelta. El modelo recibe esas cuentas hechas y te las explica.»</sub>  
  <sub>Por qué: Compuerta 2, 5d: el modelo grande, con su nombre y lo que hace: conversa como coach con las cuentas ya hechas. Sale «El peso sube solo después de dos sesiones confirmadas»: va en la lista de abajo.</sub>  
  <sub>Fuente: inventario-praxi §4 (claude-sonnet-5, COACH_MODEL, lib/anthropic.ts:14; app/api/chat), §5.3 y §5.4 (lib/domain/, signals.ts; 42 tests)</sub>
- `parrafo` Con la salud pasa lo mismo. Si mencionas dolor, mareo o señales de un trastorno alimentario, el coach no diagnostica y te manda a un profesional, y esa regla también vive en el código. Tiene una razón: el 22 de agosto, probando con una cuenta de 16 años, el coach recomendó creatina aunque sus instrucciones se lo prohibían. Desde ese día, la edad se revisa en código y no se le deja al modelo.  
  <sub>Fuente: inventario-praxi §4 y §5.5; Praxi, lib/coach/guardrailMenores.ts:6-21 (leído el 17-oct)</sub>
- `rotulo` Con qué está hecho
- `nota` El detalle, para quien quiera mostrárselo a su técnico.
- `nota · lista` · **cambia**
  - Le escribes como a una persona y queda registrado, sin formularios. (Claude Haiku 4.5, claude-haiku-4-5, solo en el servidor)
  - Te contesta como un coach que conoce tu historial y las cuentas ya hechas. (Claude Sonnet 5, claude-sonnet-5, solo en el servidor)
  - Al cerrar el día recibes una observación corta con criterio, no un «¡bien hecho!». (Claude Haiku 4.5)
  - El peso sube con dos sesiones confirmadas, y la semana liviana llega por cansancio comprobado, no por calendario. (Lógica de entrenamiento en código)
  - Si mencionas dolor o mareo, el coach no diagnostica y te deriva; a un menor no le recomienda suplementos. (Reglas de salud y de edad en código)
  - Cada persona ve y borra solo lo suyo, y sus exámenes se guardan en un espacio privado. (Supabase)
  - Pagas con tarjeta sin salir de Praxi y sin cuenta en Mercado Pago, y el número de la tarjeta no pasa por su servidor. (Mercado Pago, dentro de la app)
  - Te llega por correo la fecha exacta del cobro, el monto y cómo cancelar. (Resend)
  - Un color fuera de la paleta de la marca no llega al sitio: la publicación se detiene. (Revisión de marca en cada publicación)
  - Google y los asistentes de IA pueden leer qué es Praxi, cuánto cuesta y qué responde. (Datos estructurados)
  - Se instala en el teléfono y se abre a pantalla completa, como una app.  
  <sub>Antes: «["Le escribes como a una persona y queda registrado, sin formularios. (API de Anthropic, solo en el servidor)", "El peso sube con dos sesiones confirmadas, y la semana liviana llega por cansancio comprobado, no por calendario. (Lógica de entrenamiento en código)", "Si mencionas dolor o mareo, el coach no diagnostica y te deriva; a un menor no le recomienda suplementos. (Reglas de salud y de edad en código)", "Cada persona ve y borra solo lo suyo, y sus exámenes se guardan en un espacio privado. (Supabase)", "Pagas sin salir de Praxi, y la tarjeta no pasa por su servidor. (Mercado Pago, dentro de la app)", "Te llega por correo la fecha exacta del cobro, el monto y cómo cancelar. (Resend)", "Un color fuera de la paleta de la marca no llega al sitio: la publicación se detiene. (Revisión de marca en cada publicación)", "Google y los asistentes de IA pueden leer qué es Praxi, cuánto cuesta y qué responde. (Datos estructurados)", "Se instala en el teléfono y se abre a pantalla completa, como una app."]»</sub>  
  <sub>Por qué: Compuerta 2, 5d: los dos modelos, cada uno con su papel, con el nombre comercial y el identificador del código para el técnico (inventario-praxi §10.4). Entra el pago, que salió de los párrafos (el lock §21.5 pide de uno a tres por sección).</sub>  
  <sub>Fuente: inventario-praxi §4 (la columna «Lo que le hace al usuario»; solo los que tienen efecto que contar)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/praxi-frase-45.webp` | 4:5 | Captura de Praxi en un celular: una conversación de ejemplo, «Hoy hice press banca 3x10 con 60 kg, RIR 2», y lo que quedó guardado. | Los números son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario. |
| `tableros/e12-direcciones/proto/a/medios/praxi-numeros-45.webp` | 4:5 | Captura de Praxi en un celular: «Tu progreso, en números.», con cifras de ejemplo. | Los números son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario. |
| `tableros/e12-direcciones/proto/a/medios/praxi-numeros-169.webp` | 16:9 | Captura de la portada de Praxi: cuatro gráficos de progreso con cifras de ejemplo. | Los números son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario. |

**Lo que se borró o cambió, y por qué**

- El párrafo del pago («Se paga con tarjeta sin salir de la app…»): el hecho queda en la lista. Con él eran cuatro párrafos y el lock §21.5 pide de uno a tres.

### La pieza

*Trabajo del bloque:* Mostrar la marca, el sitio y la campaña, decir cómo se programó (5e) y rotular lo que es de ejemplo o generado junto a la imagen.

- `rotulo` La pieza
- `h2` · **cambia** Sitio, app y campaña, una sola marca.  
  <sub>Antes: «Sitio, app y campaña, con una sola marca.»</sub>  
  <sub>Por qué: De 8 a 7 palabras (lock §21.5: titulares de 2 a 7).</sub>
- `parrafo` La marca de Praxi vive en dos archivos que el código hace cumplir: uno con los colores, la letra y las formas, y otro con cómo habla. Si alguien pone un color que no está ahí, el sitio no se publica. El color principal partió morado, el de casi cualquier demo de IA, y pasó al amarillo del punto del logo.  
  <sub>Fuente: inventario-praxi §7 (brand.json, voice.json; el acento pasó de #8069F2 a #E2F349 el 26-jul) y §4 (design-check en prebuild, 8/8)</sub>
- `parrafo` La campaña usa el mismo chat como pieza: un reel donde la conversación con el coach aparece sobre el video.  
  <sub>Fuente: inventario-praxi §7 (reel «a memoria»)</sub>
- `parrafo` · **nuevo** El sitio y la app los programó Ramón con agentes de IA: sesiones de Claude Code que escriben código a partir de sus instrucciones. Entre el 21 de julio y el 25 de agosto quedaron 219 cambios de código, y 218 llevan la firma de esas sesiones. Son herramientas para programar: no son los modelos que conversan dentro de Praxi.  
  <sub>Por qué: Compuerta 2, 5e: el caso dice que se construyó con agentes de IA, con verdad y sin jerga. No dice que Ramón revisó cada cambio: 50 commits fueron directo a main (inventario-praxi §8.1).</sub>  
  <sub>Fuente: inventario-praxi §2 («Quién lo hizo», medido con git log el 19-oct) y §8.2 (no decir que la app usa el modelo que la programó)</sub>
- `nota · referencia` · **cambia** Los números son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario.  
  <sub>Dónde: Bajo las capturas de la conversación y de «Tu progreso, en números» (inventario-praxi §6)</sub>  
  <sub>Antes: «Los números de esta captura son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario.»</sub>  
  <sub>Por qué: Un solo texto de pie para toda captura con cifras.</sub>  
  <sub>Nota: Cada medio lleva su propio pie en «medios»; este texto queda como regla para cualquier captura nueva.</sub>
- `nota · referencia` Las personas de las fotos y del video están generadas con IA. El texto encima es de la pieza.  
  <sub>Dónde: Bajo el reel, el carrusel y la portada de Facebook</sub>  
  <sub>Nota: Cada medio lleva su propio pie en «medios»; este texto queda como regla para cualquier captura nueva.</sub>
- `nota · hueco` · **cambia** Aquí van las pantallas de la app por dentro: Inicio, Coach, Registro y Progreso, en un celular. Para capturarlas hace falta una cuenta de prueba con su historial, y no las vamos a armar con datos inventados.  
  <sub>Antes: «Faltan las pantallas de la app por dentro. Para verlas hace falta una cuenta y su base de datos, y no las vamos a armar con datos inventados.»</sub>  
  <sub>Por qué: Compuerta 2, 5a: en los repos no hay capturas con sesión iniciada; el hueco queda a la vista, como un marco punteado del tamaño de una fila 16:9 (spec §3.3). Si Ramón sube otras, esta nota sale.</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/praxi-amarillo-169.webp` | 16:9 | La marca de Praxi: la P negra con su punto, grande, sobre el amarillo del acento. |  |
| `tableros/e12-direcciones/proto/a/medios/praxi-avatar-amarillo-162.webp` | 1,62 | El avatar de Praxi: la P negra con su punto sobre el amarillo de la marca. |  |
| `tableros/e12-direcciones/proto/a/medios/praxi-avatar-oscuro-162.webp` | 1,62 | El avatar de Praxi en su versión oscura: la P blanca con el punto amarillo. |  |
| `tableros/e12-direcciones/proto/a/medios/praxi-facebook-169.webp` | 16:9 | La portada de Facebook de Praxi: un hombre levanta una barra en penumbra y, a la derecha, «Praxi.» y «Entrena sabiendo por qué». | Las personas están generadas con IA. El texto encima es de la pieza. |
| `tableros/e12-direcciones/proto/a/medios/praxi-reel-45.webm` | 4:5 | (video) El reel de campaña de Praxi: un atleta entrena y encima aparece la conversación con el coach. | Las personas están generadas con IA. El texto encima es de la pieza. |
| `tableros/e12-direcciones/proto/a/medios/praxi-carrusel-1-45.webp` | 4:5 | Primera lámina del carrusel de Praxi: «La mitad de tus series quizá no cuentan.», sobre la foto de un hombre que entrena. | Las personas están generadas con IA. El texto encima es de la pieza. |
| `tableros/e12-direcciones/proto/a/medios/praxi-carrusel-3-45.webp` | 4:5 | Tercera lámina del carrusel: «No las cuentas tú.», con un ejemplo de series que cuentan. | Los números son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario. |
| `(marco punteado, sin archivo)` | 16:9 | El hueco: va el texto de «praxi.pieza.hueco». |  |

### Sin métrica

*Trabajo del bloque:* Cerrar con lo que se midió y lo que no, sin adornar.

- `rotulo` Sin métrica
- `h2` · **cambia** Qué se midió y qué no.  
  <sub>Antes: «Lo que se midió, y lo que no.»</sub>  
  <sub>Por qué: Lock §21.5: titulares de sección de 2 a 7 palabras (lo midió herramientas/comprobar-obra.py).</sub>
- `parrafo` · **cambia** De Praxi no mostramos usuarios, uso ni ventas: no hay una medición que podamos publicar. Lo que sí está medido es cómo quedó hecha. El 16 de octubre de 2026, sobre la última versión, pasaron las 384 pruebas automáticas, la revisión de marca pasó sus 8 reglas y el sitio se armó sin errores.  
  <sub>Antes: «No tenemos un número de usuarios, de uso ni de ventas de Praxi que podamos publicar, así que no ponemos ninguno. El 16 de octubre de 2026, sobre la última versión, pasaron las 384 pruebas automáticas, la revisión de marca pasó sus 8 reglas y el sitio se armó sin errores.»</sub>  
  <sub>Por qué: Sin «que podamos publicar», que sugería un número escondido; el resto, igual.</sub>  
  <sub>Fuente: inventario-praxi §0.4, §8.1 y crudo/verificacion-copia.txt</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/praxi-empezar-169.webp` | 16:9 | Captura de la página «Lo que te llevas gratis» de Praxi, con el botón amarillo «Empezar gratis». |  |

**Lo que se borró o cambió, y por qué**

- «Hoy praxi.coach está fuera de línea, y por eso esta página no lo enlaza.»: compuerta 2, 5b, «no se cuenta». La regla interna sigue: ningún enlace a praxi.coach y su JSON-LD sin offers ni url.

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar al próximo caso, en ese orden, sin pie de página.

- `parrafo` · **cambia** Si quieres una herramienta como Praxi, *escríbenos y te respondemos en 24 horas.*  
  <sub>Antes: «Si quieres una herramienta como Praxi para tu empresa, escríbenos y te respondemos en 24 horas.»</sub>  
  <sub>Por qué: Lock §14: la continuación gris va de 6 a 13 palabras y la tinta hasta 8 (lo midió herramientas/comprobar-obra.py).</sub>  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `parrafo` Sirve fuera del gimnasio: cualquier cosa que alguien escribe en sus palabras y que después hay que registrar y calcular bien, como una solicitud o una cotización, se puede programar igual.  
  <sub>Nota: El gerente no vio qué le decía una app de gimnasio a una empresa que le vende a otras. Es una afirmación de capacidad, no de un trabajo hecho: remite a cómo está hecho Praxi (encargo, criterio 13).</sub>
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` Siguiente
- `h2` · **cambia** Sesenta. *El plazo antes que el juicio.*  
  → `/v3/trabajo/sesenta/`  
  <sub>Antes: «Sesenta El plazo antes que el juicio»</sub>  
  <sub>Por qué: Con punto en las dos partes, como los demás titulares del sitio («Trabajo.», «Servicios.»): sin él, el título se lee «Sesenta El plazo…» en un lector de pantalla.</sub>  
  <sub>Nota: Lleva el rótulo «Concepto» a la vista. La bajada es la de su caso (06-sesenta/caso.md).</sub>
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

## /v3/trabajo/combeau/ · caso-combeau

- `title` Bernardo Combeau: fotografía y book de modelo · SpindleLab
- `description` Diseñamos y programamos los dos sitios de Bernardo Combeau, fotógrafo y modelo. Él carga sus series desde un panel, y el sitio entrega sus fotos livianas.
- <sub>Señales: Simón, e12/senales-obra.md §2.4</sub>
- *Estructura:* La plantilla de caso (spec §2.3). Una página con dos partes: dentro de «La pieza», id="fotografia" e id="modelo", cada una abriendo con su 16:9. Solo medios de e12/casos/combeau/medios/.
- *Regla:* Ningún texto, medio ni alt con su edad, estatura, pelo, ojos, contacto o ficha de contratación (compuerta 2, pregunta 7; defecto 21 del acta, en A).
- *Regla:* Ningún resultado de su negocio, ni el 76 de su portada, ni su sitio como ejemplo de SEO (inventario §7).

### Barra lateral

*Trabajo del bloque:* Nombrar el caso: quién es el cliente, qué se hizo y cuándo salió.

- `rotulo · miga` · **nuevo** Inicio · Trabajo · Bernardo Combeau
- `h1` · **nuevo** Bernardo Combeau. *Fotógrafo y modelo: dos sitios y un panel donde carga sus fotos.*  
  <sub>Fuente: inventario-casos §2.1, §2.2 y §2.9 (él carga sus series desde el panel; el book es el otro oficio)</sub>
- `ficha` · **nuevo**
  - **Tipo:** Cliente
  - **Año:** 2026
  - **Qué es:** Sitio de fotografía y book de modelo
  - **En línea desde:** 24-jul-2026  
  línea mono: «Cliente · 2026»  
  <sub>Fuente: inventario-casos §2 y §2.9 («Fechas con fila»)</sub>
- `rotulo · índice de secciones` · **nuevo** Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` · **nuevo** Quién lo hizo
- `nota` · **nuevo** Diseño, programación y panel: SpindleLab. Las fotos y los textos los pone Bernardo.  
  <sub>Fuente: inventario-casos §2.1 («Sitio y panel de administración»; él carga sus series)</sub>

### Medio principal

*Trabajo del bloque:* Mostrar el sitio de punta a punta.

- `nota · alt` · **nuevo** Recorrido por la portada de su sitio de fotografía: el retrato en luz verde con su frase, sus retratos y sus proyectos.  
  <sub>Dónde: combeau-fotografia-recorrido-1440 (a 390, el -390); video con aria-hidden, este texto en la figura</sub>
- `nota · alt` · **nuevo** Portada del sitio de Bernardo Combeau: «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.»  
  <sub>Dónde: póster del recorrido</sub>

### Problema

*Trabajo del bloque:* Decir qué necesitaba el cliente, con lo que consta, sin inventar sus palabras.

- `rotulo` · **nuevo** Problema
- `h2` · **nuevo** Fotos grandes, sin depender de nadie.
- `parrafo` · **nuevo** Bernardo es fotógrafo de retrato. Necesitaba un sitio donde sus fotos se vieran grandes, y poder subir una serie nueva él mismo, sin escribirle a nadie cada vez. Y para su otro oficio, un book de modelo en inglés, con su propia portada y su propio menú, en el mismo dominio.  
  <sub>Fuente: oficina/clientes/bernardo-combeau.md (sitio + panel de administración, Plan Esencial); obra-v3.json:16 y :33 (el book en inglés, con su propia marca y navegación)</sub>

### Hipótesis

*Trabajo del bloque:* Decir qué se creyó y cómo se iba a saber.

- `rotulo` · **nuevo** Hipótesis
- `h2` · **nuevo** Que el sitio lo actualice él.
- `parrafo` · **nuevo** Si él podía cargar sus series desde un panel, el sitio iba a seguir vivo sin depender de nosotros. Y si el sitio ajustaba cada foto a la pantalla de quien la mira, Bernardo podía subirlas tal como las tiene, sin achicarlas antes. Íbamos a saber si funcionaba cuando publicara una serie nueva sin pedirnos nada.  
  <sub>Fuente: inventario-casos §2.1, §2.2 y §2.9</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `e12/casos/combeau/medios/combeau-panel-entrada-169.webp` | 16:9 | La pantalla de entrada del panel donde Bernardo carga sus series, con el botón para entrar con su cuenta de GitHub. |  |

### Solución

*Trabajo del bloque:* Lo que se hizo, con cada ingrediente después de lo que le hace a él o a quien lo visita.

- `rotulo` · **nuevo** Solución
- `h2` · **cambia** Un panel y fotos a su medida.  
  <sub>Antes: «Un panel, y cada foto a su medida.»</sub>  
  <sub>Por qué: Lock §21.5: titulares de sección de 2 a 7 palabras (lo midió herramientas/comprobar-obra.py).</sub>
- `parrafo` · **nuevo** Bernardo entra a su panel con su cuenta de GitHub y desde ahí carga sus series: la portada, sus retratos, sus proyectos y lo que cuenta de su estudio. Para cada foto marca qué parte no se puede cortar, y el sitio respeta ese punto en los recuadros de la portada y de las galerías.  
  <sub>Fuente: inventario-casos §2.1 (Decap CMS, login con GitHub) y §2.9 (colecciones del panel; encuadre de fotos, en producción según revision-panel-admin-bernardo.md:586-588; no medido el 19-oct)</sub>
- `parrafo` · **nuevo** Él sube cada foto tal como la tiene, y el sitio la entrega al tamaño de la pantalla de quien la mira. Una foto de su portada que él subió con 805 kB le llega al visitante en 95 kB, ocho veces más liviana. En el book de modelo, los videos no se descargan hasta que alguien los abre.  
  <sub>Fuente: inventario-casos §2.1 (Netlify Image CDN: 804.697 → 94.576 bytes, WebP a 828 px, 16 y 19-oct) y §2.2 (0 kB de video en la carga inicial)</sub>
- `parrafo` · **nuevo** Por dentro, el sitio también dice quién es: un bloque de datos que el visitante no ve, pero que le dice a Google y a la IA que Bernardo Combeau es fotógrafo de retrato y dónde trabaja.  
  <sub>Fuente: inventario-casos §2.1 (Person y LocalBusiness: «una máquina puede leer quién es, a qué se dedica y dónde trabaja») y §4.3 (antes del 3-sep, cero datos estructurados)</sub>
- `rotulo` · **nuevo** Con qué está hecho
- `nota` El detalle, para quien quiera mostrárselo a su técnico.
- `nota · lista` · **nuevo**
  - Él carga sus series solo, desde un panel. (Decap CMS)
  - Entra al panel con su cuenta de GitHub. (Login con GitHub)
  - Marca qué parte de cada foto no se corta en los recuadros. (Encuadre hecho para su panel)
  - Sube la foto tal cual y el sitio la entrega recortada y liviana. (Netlify Image CDN)
  - El book no baja sus videos hasta que hacen falta. (Video con carga diferida)
  - Una máquina puede leer quién es y a qué se dedica. (Datos estructurados)
  - Las páginas llegan armadas, sin esperar scripts de otros sitios. (Astro)  
  <sub>Fuente: inventario-casos §2.1, §2.2 y §2.9, «Ingredientes con fila»</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `e12/casos/combeau/medios/combeau-panel-encuadre-169.webp` | 16:9 | El panel de Bernardo editando una serie de retratos: a la izquierda marca qué parte de la foto no se corta; a la derecha, la página como va a quedar. | El panel por dentro, capturado el 3 de septiembre de 2026 en una copia de prueba con sus fotos de ese día. Hoy el encuadre se abre con el botón «Editar foto». |
| `e12/casos/combeau/medios/combeau-panel-colecciones-169.webp` | 16:9 | El panel de Bernardo: la lista de lo que puede editar (portada, sobre mí, estudio, servicios, contacto, retratos y proyectos). | El panel por dentro, capturado el 3 de septiembre de 2026 en una copia de prueba. |
| `e12/casos/combeau/medios/combeau-foto-servida-828.webp` | 4:5 o 1:1, a decidir por Lucía | Retrato de un hombre que sonríe con un acordeón rojo, de Bernardo Combeau, tal como lo entrega su sitio. | La foto como la entrega su sitio: 828 × 828 píxeles y 95 kB. La original pesa 805 kB. · enlace «Ver la original (805 kB)» → `https://bernardocombeau.cl/uploads/beto3.jpg` |

### La pieza (con las dos partes)

*Trabajo del bloque:* Mostrar los dos sitios, cada uno en su parte, para que el índice lleve directo a cada uno.

- `rotulo` · **nuevo** La pieza
- `h2` · **nuevo** Dos oficios, un mismo nombre.
- `h3` · **nuevo** El sitio de fotografía  
  id="fotografia"
- `parrafo` · **nuevo** Abre con un retrato a pantalla completa y su frase: «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.» Debajo van sus retratos y sus proyectos, cada serie con su página.  
  <sub>Fuente: casos/combeau/medios.json (recorrido: el hero, «Retratos» y «Proyectos»)</sub>
- `h3` · **nuevo** El book de modelo  
  id="modelo"
- `parrafo` · **nuevo** Vive en el mismo dominio, en inglés, con su propia portada y su propio menú: sus fotos, sus trabajos publicitarios y sus comerciales. Se edita desde el mismo panel.  
  <sub>Fuente: obra-v3.json:33; inventario-casos §2.2 (colección «Modelo» en el panel) y medios.json (recorrido: el book, «Selected Work» y «Commercials»)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `e12/casos/combeau/medios/combeau-fotografia-169.webp` (abre la parte id="fotografia") | 16:9 | Portada del sitio de fotografía de Bernardo Combeau a 1440: un retrato en luz verde con su frase encima. |  |
| `e12/casos/combeau/medios/combeau-fotografia-45.webp` | 4:5 | La portada del sitio de fotografía de Bernardo Combeau en un celular. |  |
| `e12/casos/combeau/medios/combeau-modelo-169.webp` (abre la parte id="modelo") | 16:9 | Portada del book de modelo de Bernardo Combeau: él, de traje azul, apoyado en una columna. |  |
| `e12/casos/combeau/medios/combeau-modelo-45.webp` | 4:5 | El book de modelo de Bernardo Combeau en un celular: su nombre, el menú y su retrato de traje. |  |
| `e12/casos/combeau/medios/combeau-modelo-recorrido-1440.webm` | 16:9 | (video) Recorrido por el book de modelo: sus fotos, sus trabajos publicitarios y sus comerciales. |  |

### Sin métrica

*Trabajo del bloque:* Decir qué no se midió y lo que sí, sin presentar su sitio como logro de SEO.

- `rotulo` · **nuevo** Sin métrica
- `h2` · **nuevo** Ningún dato de su negocio.
- `parrafo` · **nuevo** No medimos visitas, consultas ni ventas del sitio de Bernardo, y no tenemos ningún dato de su negocio para mostrar. Lo que sí está medido, el 16 de octubre de 2026, es cómo quedó hecho: la foto de su portada llegaba en 95 kB en vez de 805, y el book abría sin descargar ningún video.  
  <sub>Fuente: inventario-casos §4.4 (sin métrica de negocio), §2.1 y §2.2</sub>
- `parrafo` · **nuevo** Hay también una señal de que el panel le sirve, sin número: después de que el sitio cambió de servidor, en septiembre, Bernardo publicó solo una campaña y fotos nuevas.  
  <sub>Fuente: inventario-casos §2.9, «Él usa el panel solo» (dicho: revision-panel-admin-bernardo.md:589-590, «confirmado por HTTP directo»)</sub>

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar al próximo caso.

- `parrafo` · **nuevo** Si quieres un sitio así para tu negocio, *escríbenos y te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `boton` · **nuevo** Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` · **nuevo** Siguiente
- `h2` · **nuevo** Praxi. *Se acuerda de cada serie que hiciste.*  
  → `/v3/trabajo/praxi/`
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

## /v3/trabajo/sesenta/ · caso-sesenta

- `title` Concepto: Sesenta, estudio laboral · SpindleLab
- `description` Concepto: Sesenta no existe. Un estudio laboral inventado, del lado del trabajador, para mostrar cómo haríamos un sitio legal que cuenta los días que te quedan.
- <sub>Señales: Simón, e12/senales-obra.md §2.5 (copiado tal cual; manda Simón)</sub>
- *Estructura:* La plantilla de caso (spec §2.3), con el texto del caso.md de Bruno pasado por registro: los hechos verificados no cambian; salen los códigos de color, los pesos de letra, los nombres de código y los esquemas, y lo técnico va con lo que hace. «Concepto · 2026» en la ficha, a la vista sin scroll a 1440 y a 390.

### Barra lateral

*Trabajo del bloque:* Nombrar la pieza y decir sin scroll que es un concepto.

- `rotulo · miga` · **nuevo** Inicio · Trabajo · Sesenta
- `h1` · **nuevo** Sesenta. *El plazo antes que el juicio.*  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/), «Ficha lateral»</sub>
- `ficha` · **nuevo**
  - **Tipo:** Concepto
  - **Año:** 2026
  - **Rubro:** Estudio de abogados laborales, del lado del trabajador
  - **Lo hecho:** Identidad, sitio (portada y una página interior) y un recorrido en video  
  línea mono: «Concepto · 2026»  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/), «Ficha lateral»</sub>
- `rotulo · índice de secciones` · **nuevo** Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` · **nuevo** Quién lo hizo
- `nota` · **nuevo** Identidad, sitio y recorrido: SpindleLab. La marca es inventada.

### Medio principal

*Trabajo del bloque:* Mostrar la pieza en movimiento.

- `nota · alt` · **nuevo** Recorrido de diez segundos por el sitio de Sesenta: la portada con el 60, el contador que baja hasta 35 y el lector de la carta en el artículo 161.  
  <sub>Dónde: movimiento/recorrido (video con aria-hidden; este texto en la figura)</sub>
- `nota · alt` · **nuevo** Portada de Sesenta: un 60 enorme en blanco cortado por el marco, sobre el azul de la ropa de trabajo, con la suma de un escrito en papel.  
  <sub>Dónde: póster del recorrido</sub>

### Problema

*Trabajo del bloque:* El problema real del rubro, en palabras de cualquiera.

- `rotulo` · **nuevo** Problema
- `h2` · **nuevo** El rubro le grita a alguien asustado.
- `parrafo` · **nuevo** Los estudios laborales se anuncian con «¿te despidieron? llama ya» y con juicios ganados de antemano. La persona que llega, desde el celular y a pocos días de que la despidieran, tiene en la mano dos cosas: una fecha y una carta.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>
- `parrafo` · **nuevo** Lo que le pregunta a una IA depende de las dos: cuánto plazo le queda y qué significa el artículo que cita su carta. Y un estudio no puede contestar con una promesa: no hay tasa de éxito ni monto que se pueda decir antes de leer el caso.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>

### Hipótesis

*Trabajo del bloque:* La idea que ordena la pieza.

- `rotulo` · **nuevo** Hipótesis
- `h2` · **cambia** La fecha y la carta, al centro.  
  <sub>Antes: «Todo, alrededor de la fecha y la carta.»</sub>  
  <sub>Por qué: Lock §21.5: titulares de sección de 2 a 7 palabras (lo midió herramientas/comprobar-obra.py).</sub>
- `parrafo` · **nuevo** La fecha se vuelve el número: el Código del Trabajo da 60 días hábiles desde la separación para ir al juzgado (art. 168), y el estudio se llama así.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>
- `parrafo` · **nuevo** La carta se vuelve la manera de escribir el sitio: cada sección lleva el rótulo de un escrito judicial, «En lo principal», «Primer otrosí», y debajo, el título en las palabras de la persona. Así la página se lee como un escrito sin que nadie tenga que saber qué es un otrosí.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/sesenta-suma-169.webp` | 16:9 | Placa de Sesenta: la suma de un escrito judicial, «En lo principal», «Primer otrosí», y la pantalla del sitio que sale de ella. |  |

### Solución

*Trabajo del bloque:* La identidad, con lo que hace cada decisión.

- `rotulo` · **nuevo** Solución
- `h2` · **nuevo** Un timbre sobre un documento.
- `parrafo` · **nuevo** SESENTA va en Schibsted Grotesk, en su peso más grueso, y el 60 es un timbre de doble filete, como el timbre de cargo de la oficina de partes: sobre el azul va en blanco; sobre el papel, en tinta azul y torcido, como cae un timbre de goma. En los tamaños chicos queda el 60 solo.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>
- `parrafo` · **nuevo** El fondo es el azul del overol, no el marino de los estudios, con una trama de tela dibujada en el código. El papel y la letra de máquina de escribir, Courier Prime, aparecen solo cuando hay un documento en pantalla (la carta, el finiquito, la hoja, la suma), y el azul vuelve sobre el papel una sola vez: como tinta del timbre.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/sesenta-logo-169.webp` | 16:9 | Placa de Sesenta: la palabra SESENTA y el sello del 60 con doble filete, en blanco sobre tinta. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-sello-45.webp` | 4:5 | El sello del 60 y sus versiones a 32 y 16 px. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-paleta-45.webp` | 4:5 | Los cinco colores de Sesenta, cada uno con su rol y su contraste. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-contador-169.webp` | 16:9 | El contador de Sesenta: el 60 que baja hasta los días hábiles que quedan, con la línea de tiempo del plazo. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-letra-45.webp` | 4:5 | La letra de Sesenta, Schibsted Grotesk, con su escala. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-courier-162.webp` | 1,62 | Courier Prime, la letra de los documentos de Sesenta. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-otrosi-162.webp` | 1,62 | Un rótulo de escrito judicial, «Primer otrosí», con su título en palabras de la persona. |  |

### La pieza

*Trabajo del bloque:* El sitio aplicado.

- `rotulo` · **nuevo** La pieza
- `h2` · **nuevo** El primer día, sin prometer el juicio.
- `parrafo` · **nuevo** La portada abre con un 60 enorme cortado por el marco, la frase con el plazo y tres cosas que hacer hoy. El contador pide el día en que dejaste de trabajar y el 60 baja, cifra por cifra, hasta los días hábiles que te quedan, contados de lunes a sábado y sin feriados; dice en la misma pantalla que es referencial.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>
- `parrafo` · **nuevo** El lector de la carta cambia la línea de una carta de ejemplo según el artículo que eliges (159, 160, 161 o ninguno), le dibuja un óvalo de tinta y explica qué suele significar y de qué depende. Después vienen el finiquito con cinco notas al margen, la hoja de la primera reunión para imprimir, el cobro explicado sin una sola cifra, seis preguntas en texto y un formulario que dice que no envía nada.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>
- `parrafo` · **nuevo** La página interior, «¿Qué artículo dice tu carta?», cuenta el 159, el 160, el 161 y la nulidad del despido, cada uno con la línea de la carta donde aparece.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/sesenta-home-169.webp` | 16:9 | La primera pantalla del sitio de Sesenta a 1440, con el sello «Concepto de SpindleLab: Sesenta no existe» arriba. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-home-390-45.webp` | 4:5 | La portada de Sesenta en un celular. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-interior-390-45.webp` | 4:5 | La página «¿Qué artículo dice tu carta?» de Sesenta en un celular. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-finiquito-169.webp` | 16:9 | Placa de Sesenta: un finiquito con cinco notas al margen, sobre tinta. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-hoja-162.webp` | 1,62 | La hoja de la primera reunión, para imprimir. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-tarjeta-162.webp` | 1,62 | La tarjeta de Sesenta, con los datos tachados porque es ficticia. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-lector-390-45.webp` | 4:5 | El lector de la carta de Sesenta en un celular. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-lector-169.webp` | 16:9 | El lector de la carta de Sesenta a 1440, con el artículo 161 marcado por un óvalo de tinta. |  |
| `tableros/e12-direcciones/proto/a/medios/sesenta-interior-169.webp` | 16:9 | La página interior de Sesenta a 1440, en el artículo 161. |  |

### Sin métrica

*Trabajo del bloque:* Decir que no existe y qué muestra igual, sin una cifra de resultado.

- `rotulo` · **nuevo** Sin métrica
- `h2` · **nuevo** Sesenta no existe y no llevó causas.
- `parrafo` · **nuevo** Lo que muestra es que un estudio puede contestar la pregunta del primer día sin prometer el juicio: el plazo exacto, con su artículo, y qué significa la carta, con lo que no se puede saber sin leerla.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>
- `parrafo` · **nuevo** Por dentro, un bloque de datos que el visitante no ve le dice a Google y a la IA qué tipo de estudio es y que el estudio y sus dos abogados son inventados, y las preguntas largas van en texto, sin desplegables, que es como una IA las puede citar.  
  <sub>Fuente: marketing/portafolio/06-sesenta/caso.md (hechos de ficha.md §4); alt de Lucía (prototipo de A, trabajo/sesenta/)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `tableros/e12-direcciones/proto/a/medios/sesenta-pregunta-169.webp` | 16:9 | Placa de Sesenta: la pregunta «¿Cuánto plazo tengo para demandar…?» y su respuesta tal como está en el sitio, con los datos que dicen que es un concepto. |  |

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar a la pieza que sigue.

- `parrafo` · **nuevo** Si quieres un sitio así para tu rubro, *escríbenos y te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `boton` · **nuevo** Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` · **nuevo** Siguiente
- `h2` · **nuevo** Ocelo. *La carta antes que la promesa.*  
  → `/v3/trabajo/ocelo/`  
  <sub>Nota: Lleva su rótulo «Concepto» a la vista.</sub>
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

**Cambios de registro respecto del caso.md de Bruno (los hechos no cambian)**

- Desafío → Problema y Estrategia → Hipótesis, con el texto de Bruno partido en dos párrafos; el titular de Estrategia, de 9 a 7 palabras.
- Identidad: «Schibsted Grotesk 900» pasa a «en su peso más grueso»; salen los códigos de color; «sarga hecha en CSS» pasa a «trama de tela dibujada en el código»; «A 32 y 16 px» pasa a «en los tamaños chicos»; sale la frase de la etiqueta de las placas.
- Aplicación: salen la línea de tiempo con el día 60 y el tope de 90, y la suma del escrito como índice (los dos se ven en las filas); el titular, de 11 a 7 palabras.
- Qué muestra: «datos estructurados del tipo de negocio correcto, con la ficción declarada» pasa a «un bloque de datos que el visitante no ve»; «sin acordeón» pasa a «sin desplegables»; suma que sus dos abogados son inventados.
- Los alt son los que Lucía escribió mirando cada placa en el prototipo de A; en el de la pregunta, «con el JSON-LD que dice que es concepto» pasa a «con los datos que dicen que es un concepto».

## /v3/trabajo/ocelo/ · caso-ocelo

- `title` Concepto: Ocelo, clínica de ojos · SpindleLab
- `description` Concepto: Ocelo no existe. Una clínica de ojos inventada, para mostrar cómo haríamos un sitio de salud que explica el examen en vez de prometer resultados.
- <sub>Señales: Simón, e12/senales-obra.md §2.5 (copiado tal cual; manda Simón)</sub>
- *Estructura:* La plantilla de caso (spec §2.3), con el texto del caso.md de Bruno pasado por registro: los hechos verificados no cambian; salen los códigos de color, los pesos de letra, los nombres de código y los esquemas, y lo técnico va con lo que hace. «Concepto · 2026» en la ficha, a la vista sin scroll a 1440 y a 390.

### Barra lateral

*Trabajo del bloque:* Nombrar la pieza y decir sin scroll que es un concepto.

- `rotulo · miga` · **nuevo** Inicio · Trabajo · Ocelo
- `h1` · **nuevo** Ocelo. *La carta antes que la promesa.*  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4), «Ficha lateral»</sub>
- `ficha` · **nuevo**
  - **Tipo:** Concepto
  - **Año:** 2026
  - **Rubro:** Clínica de ojos: cirugía refractiva y de cataratas
  - **Lo hecho:** Identidad, sitio (portada y una página interior) y un recorrido en video  
  línea mono: «Concepto · 2026»  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4), «Ficha lateral»</sub>
- `rotulo · índice de secciones` · **nuevo** Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` · **nuevo** Quién lo hizo
- `nota` · **nuevo** Identidad, sitio y recorrido: SpindleLab. La marca es inventada.

### Medio principal

*Trabajo del bloque:* Mostrar la pieza en movimiento.

- `nota · alt` · **nuevo** Recorrido de diez segundos por el sitio de Ocelo, grabado en el navegador desde su portada.  
  <sub>Dónde: movimiento/recorrido (video con aria-hidden; este texto en la figura)</sub>
- `nota · alt` · **nuevo** Portada de Ocelo con la luz encendida: la carta del examen de la vista, con OCELO arriba y siete palabras que se achican fila a fila, y «Antes de hablar de operar, te medimos los ojos.»  
  <sub>Dónde: póster del recorrido</sub>

### Problema

*Trabajo del bloque:* El problema real del rubro, en palabras de cualquiera.

- `rotulo` · **nuevo** Problema
- `h2` · **nuevo** El paciente trae una pregunta.
- `parrafo` · **nuevo** Las clínicas de cirugía refractiva se anuncian con la promesa de dejar los lentes y con fotos de antes y después. La persona que llega pregunta otra cosa: si puede operarse.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>
- `parrafo` · **nuevo** Esa pregunta no la contesta un aviso, la contesta un examen: el grosor y la forma de la córnea, si la graduación dejó de cambiar, la edad, la lágrima. Y en salud la página tiene un límite que no se negocia: no puede prometer un resultado clínico.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>

### Hipótesis

*Trabajo del bloque:* La idea que ordena la pieza.

- `rotulo` · **nuevo** Hipótesis
- `h2` · **nuevo** Cambiar la promesa por el examen.
- `parrafo` · **nuevo** El sitio se ordena como la evaluación, y la carta de letras del examen de la vista, lo primero que ve cualquier paciente, pasa a ser la interfaz. Cada fila de la carta es una palabra de cinco letras y lleva a una sección, y cada una es un poco más chica que la anterior, en el mismo paso que usa la carta del oftalmólogo. La fila más chica es la que dice que esto es un concepto.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/05-ocelo/identidad/placas/carta-tinta.png` | 16:9 | Placa de Ocelo: la carta, con OCELO arriba y siete palabras que se achican fila a fila, su valor de agudeza al lado y adónde lleva cada fila. |  |

### Solución

*Trabajo del bloque:* La identidad, con lo que hace cada decisión.

- `rotulo` · **nuevo** Solución
- `h2` · **nuevo** Los instrumentos del examen, como sistema.
- `parrafo` · **nuevo** OCELO va dibujado en la misma cuadrícula de cinco por cinco de las letras del examen: la O, la C y la E son letras de la carta, y la L se dibuja con las mismas reglas. El símbolo es la C de Landolt, un anillo con una abertura que se usa para medir la vista: se lee por dónde se abre, y por eso sigue legible en el ícono de la pestaña.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>
- `parrafo` · **nuevo** El color tiene dos estados. La página parte a oscuras, como la sala de examen, porque después de una cirugía refractiva la luz molesta unos días, y se enciende con un interruptor. El rojo y el verde son los del test rojo y verde de la consulta, y en el sitio tienen un solo uso: comparar dos opciones, siempre con letra grande.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>
- `parrafo` · **nuevo** Para leer, Atkinson Hyperlegible, la letra del Braille Institute hecha para personas con baja visión, que es parte de quien entra a este sitio.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/05-ocelo/identidad/placas/logotipo-tinta.png` | 16:9 | El logotipo de Ocelo dibujado en su cuadrícula de cinco por cinco, con las medidas de cada letra. |  |
| `marketing/portafolio/05-ocelo/identidad/placas/landolt-tinta.png` | 4:5 | La C de Landolt de Ocelo con sus medidas, y en tamaños de 64 a 16 píxeles. |  |
| `marketing/portafolio/05-ocelo/identidad/placas/letra-tinta.png` | 4:5 | La letra de Ocelo, Atkinson Hyperlegible Next: «Il1 O0», letras que no se confunden, y «Antes de hablar de operar, te medimos los ojos.» |  |
| `marketing/portafolio/05-ocelo/identidad/placas/duocromo-tinta.png` | 16:9 | El rojo y el verde de Ocelo, solo para comparar: LASIK en rojo y PRK en verde, cada uno con cuándo sirve. |  |
| `marketing/portafolio/05-ocelo/identidad/placas/interruptor-tinta.png` | 4:5 | La carta de Ocelo partida al medio: a oscuras con «Encender la luz», y encendida con «Apagar la luz». |  |
| `marketing/portafolio/05-ocelo/identidad/placas/mono-tinta.png` | 1,62 | Atkinson Hyperlegible Mono: «0,9 MEDIR» y tres mediciones del examen. |  |
| `marketing/portafolio/05-ocelo/identidad/placas/puerta-tinta.png` | 1,62 | La placa de la puerta de Ocelo: «OCELO · Cirugía refractiva y de cataratas». |  |

### La pieza

*Trabajo del bloque:* El sitio aplicado.

- `rotulo` · **nuevo** La pieza
- `h2` · **nuevo** Un sitio que no encandila.
- `parrafo` · **nuevo** La portada abre con la carta: OCELO arriba y siete palabras que se achican fila a fila. Al lado, «¿Soy candidato?», que explica las cinco mediciones que deciden; un comparador en rojo y verde para LASIK o PRK y para lente monofocal o multifocal, que dice qué pesa en cada caso; y una sección con lo que no se puede prometer, tachado.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>
- `parrafo` · **nuevo** Después vienen dos oftalmólogos inventados, sin foto ni número de registro, con sus iniciales dibujadas en la cuadrícula; las preguntas largas contestadas en texto; y el pedido de evaluación sin precios, con lo que mueve el precio. La página interior, «La evaluación», cuenta los ocho pasos en orden y termina con la plantilla del informe que se lleva el paciente, sin datos de nadie.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/05-ocelo/medios/home-1440-luz.png` | 16:9 | La portada de Ocelo a 1440 con la luz encendida, con el rótulo «Concepto de SpindleLab · Ocelo no existe» arriba. |  |
| `marketing/portafolio/05-ocelo/medios/home-390-sala.png` | 4:5 | La portada de Ocelo en un celular, a oscuras. |  |
| `marketing/portafolio/05-ocelo/medios/home-390-luz.png` | 4:5 | La misma portada con la luz encendida. |  |
| `marketing/portafolio/05-ocelo/medios/evaluacion-1440-pasos.png` | 16:9 | La página «La evaluación» de Ocelo a 1440: los pasos 3, 4 y 5, cada uno con lo que se hace y lo que decide, y su número dibujado. |  |
| `marketing/portafolio/05-ocelo/identidad/placas/informe-tinta.png` | 1,62 | La plantilla del informe de evaluación de Ocelo, sin datos, sobre negro. |  |
| `marketing/portafolio/05-ocelo/identidad/placas/informe-lienzo.png` | 1,62 | La misma plantilla sobre blanco. |  |
| `marketing/portafolio/05-ocelo/medios/evaluacion-390-duocromo.png` | 4:5 | La página «La evaluación» de Ocelo en un celular, con el test rojo y verde. |  |

### Sin métrica

*Trabajo del bloque:* Decir que no existe y qué muestra igual, sin una cifra de resultado.

- `rotulo` · **nuevo** Sin métrica
- `h2` · **cambia** Ocelo no existe ni atendió a nadie.  
  <sub>Antes: «Ocelo no existe y no atendió a nadie.»</sub>  
  <sub>Por qué: Lock §21.5: titulares de sección de 2 a 7 palabras (lo midió herramientas/comprobar-obra.py).</sub>
- `parrafo` · **nuevo** Lo que muestra es que en salud la honestidad también es diseño: una identidad hecha con los instrumentos del examen, una página que parte a oscuras por una razón clínica, y una sección entera para lo que ninguna cirugía garantiza.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>
- `parrafo` · **nuevo** Por dentro, un bloque de datos que el visitante no ve le dice a Google y a la IA que la clínica y sus dos médicos son inventados, y las preguntas largas van en texto, que es como una IA las puede citar.  
  <sub>Fuente: marketing/portafolio/05-ocelo/caso.md (hechos de ficha.md §4)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/05-ocelo/medios/prometer-1440.png` | 16:9 | La sección «Lo que no te vamos a prometer» de Ocelo: «Que vas a ver perfecto sin lentes», tachado, y al lado por qué nadie lo puede garantizar. |  |

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar a la pieza que sigue.

- `parrafo` · **nuevo** Si quieres un sitio así para tu rubro, *escríbenos y te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `boton` · **nuevo** Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` · **nuevo** Siguiente
- `h2` · **nuevo** Doceavo. *El año en doce, con lo que vence cada mes.*  
  → `/v3/trabajo/doceavo/`  
  <sub>Nota: Lleva su rótulo «Concepto» a la vista.</sub>
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

**Cambios de registro respecto del caso.md de Bruno (los hechos no cambian)**

- Desafío → Problema; el titular, de 10 a 5 palabras («El rubro vende un resultado; el paciente trae una pregunta.»). «Banner» pasa a «aviso».
- Estrategia: salen «logMAR», «0,1 log» y «factor de 1,2589»; queda que cada fila es un poco más chica, en el mismo paso que usa la carta.
- Identidad: «retícula de 5 × 5» pasa a «cuadrícula de cinco por cinco»; salen «ISO 8596», los códigos de color y «24 px»; «duocromo» pasa a «el test rojo y verde de la consulta».
- Aplicación: «ficticios» pasa a «inventados»; «sin acordeón», fuera.
- Qué muestra: «datos estructurados del tipo de negocio correcto» pasa a «un bloque de datos que el visitante no ve».

## /v3/trabajo/doceavo/ · caso-doceavo

- `title` Concepto: Doceavo, estudio contable · SpindleLab
- `description` Concepto: Doceavo no existe. Un estudio contable inventado en Concepción, para mostrar un sitio que te dice qué vence este mes según el calendario del SII.
- <sub>Señales: Simón, e12/senales-obra.md §2.5 (copiado tal cual; manda Simón)</sub>
- *Estructura:* La plantilla de caso (spec §2.3), con el texto del caso.md de Bruno pasado por registro: los hechos verificados no cambian; salen los códigos de color, los pesos de letra, los nombres de código y los esquemas, y lo técnico va con lo que hace. «Concepto · 2026» en la ficha, a la vista sin scroll a 1440 y a 390.

### Barra lateral

*Trabajo del bloque:* Nombrar la pieza y decir sin scroll que es un concepto.

- `rotulo · miga` · **nuevo** Inicio · Trabajo · Doceavo
- `h1` · **nuevo** Doceavo. *El año en doce, con lo que vence cada mes.*  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII), «Ficha lateral»</sub>
- `ficha` · **nuevo**
  - **Tipo:** Concepto
  - **Año:** 2026
  - **Rubro:** Estudio contable para pymes e independientes
  - **Lo hecho:** Identidad, sitio (portada y una página interior) y un recorrido en video  
  línea mono: «Concepto · 2026»  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII), «Ficha lateral»</sub>
- `rotulo · índice de secciones` · **nuevo** Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` · **nuevo** Quién lo hizo
- `nota` · **nuevo** Identidad, sitio y recorrido: SpindleLab. La marca es inventada.

### Medio principal

*Trabajo del bloque:* Mostrar la pieza en movimiento.

- `nota · alt` · **nuevo** Recorrido de diez segundos por el sitio de Doceavo, grabado en el navegador desde su portada.  
  <sub>Dónde: movimiento/recorrido (video con aria-hidden; este texto en la figura)</sub>
- `nota · alt` · **nuevo** Portada de Doceavo: «El IVA de septiembre se declara hasta el martes 20 de octubre», junto al año 2026 en doce meses con cada vencimiento en rojo.  
  <sub>Dónde: póster del recorrido</sub>

### Problema

*Trabajo del bloque:* El problema real del rubro, en palabras de cualquiera.

- `rotulo` · **nuevo** Problema
- `h2` · **nuevo** Enterarse tarde, por un aviso del SII.
- `parrafo` · **nuevo** Los sitios de los estudios contables dicen «asesoría integral» y terminan en un botón de WhatsApp. Ninguno dice lo único que el dueño de una pyme necesita saber al entrar: qué vence este mes y qué le toca a él. Se entera por un aviso del SII, cuando ya es tarde.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>
- `parrafo` · **nuevo** Y en este rubro hay dos límites que no se cruzan: nadie puede prometer que vas a pagar menos impuestos, ni que nunca vas a tener una multa.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>

### Hipótesis

*Trabajo del bloque:* La idea que ordena la pieza.

- `rotulo` · **nuevo** Hipótesis
- `h2` · **nuevo** Publicar el calendario.
- `parrafo` · **nuevo** Cada mes trae sus fechas: el F29, la declaración mensual del IVA, el 12 o el 20; las cotizaciones el 13; el F29 sin movimiento el 28; y una vez al año las declaraciones juradas y la Operación Renta. Son públicas, están en el calendario del SII, pero nadie las pone en su portada. Doceavo sí, y el sitio sabe en qué mes estás: el titular de la portada es la fecha del próximo F29 y cambia solo.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/07-doceavo/identidad/placas/16x9-anio-tinta.png` | 16:9 | Placa de Doceavo: 1/12 grande y el año 2026 en doce meses, con cada vencimiento en rojo y octubre lleno. |  |

### Solución

*Trabajo del bloque:* La identidad, con lo que hace cada decisión.

- `rotulo` · **nuevo** Solución
- `h2` · **nuevo** El almanaque al revés.
- `parrafo` · **nuevo** «doceavo» va en minúsculas, y su símbolo es una cuadrícula de 3 por 4 casillas: el año, de enero arriba a la izquierda a diciembre abajo a la derecha. La casilla del mes en curso va llena, así que el logo cambia solo cada mes: el sitio lo dibuja con la fecha del día, y el ícono de la pestaña también.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>
- `parrafo` · **nuevo** La letra es Recursive, que tiene un ajuste para volverse de ancho fijo sin cambiar de familia: el texto se lee normal y las cifras se ordenan en columnas, con las mismas letras. El color es el de un libro contable, verde pálido con su renglón y su columna, y un solo rojo que marca únicamente lo que vence. En un almanaque el rojo es feriado; aquí es plazo.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/07-doceavo/identidad/placas/4x5-logo-tinta.png` | 4:5 | El logo de Doceavo en octubre: la cuadrícula de doce casillas con la de octubre llena, y la palabra «doceavo». |  |
| `marketing/portafolio/07-doceavo/identidad/placas/4x5-meses-tinta.png` | 4:5 | Un logo por mes: las doce versiones, de enero a diciembre, con octubre destacado. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/4x5-letra-tinta.png` | 4:5 | La letra de Doceavo, Recursive, con «¿Cuándo vence el F29?» y las fechas en sus dos anchos. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/1-62-eje-tinta.png` | 1,62 | Tres veces «martes 20», de la letra normal a la de ancho fijo. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/1-62-cifras-tinta.png` | 1,62 | Las fechas del F29 de 2026, mes por mes, encolumnadas, con las del 20 en rojo. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/16x9-papel-tinta.png` | 16:9 | Octubre día por día en el papel de Doceavo: lo que vence, lo que hace el estudio, y el 16 como hoy. |  |

### La pieza

*Trabajo del bloque:* El sitio aplicado.

- `rotulo` · **nuevo** La pieza
- `h2` · **nuevo** La fecha antes que la promesa.
- `parrafo` · **nuevo** La portada abre con el titular que cambia cada mes («El IVA de septiembre se declara hasta el martes 20 de octubre»), el año en doce con el mes en curso lleno y, debajo, un almanaque de taco con lo que vence ese mes: al tocar otro mes, la hoja se arranca. Después viene octubre día por día: lo que vence, lo que hace el estudio y lo que te toca a ti.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>
- `parrafo` · **nuevo** Lo que el estudio no hace va como en un libro contable, donde la raya en la columna del monto quiere decir nada. Los servicios van en tabla y sin precios, las preguntas largas en texto con su fuente, y el formulario de tres preguntas no envía nada. La página «Calendario» es el año completo, con las fechas que el SII corrió al día hábil siguiente subrayadas.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/07-doceavo/medios/home-1440.png` | 16:9 | La portada de Doceavo a 1440: el titular con el 20 de octubre en rojo, el año en doce a la derecha y octubre día por día debajo. |  |
| `marketing/portafolio/07-doceavo/medios/home-390.png` | 4:5 | La portada de Doceavo en un celular, con la nota al margen que dice que es un concepto. |  |
| `marketing/portafolio/07-doceavo/medios/calendario-390.png` | 4:5 | La hoja de octubre del calendario de Doceavo en un celular, con el 20 y el 28 en rojo. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/1-62-lomo-lienzo.png` | 1,62 | Doce archivadores, uno por mes, con el de octubre sacado. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/1-62-hoja-tinta.png` | 1,62 | La hoja de octubre del taco, con lo que vence y el 16 como hoy. |  |
| `marketing/portafolio/07-doceavo/identidad/placas/4x5-informe-tinta.png` | 4:5 | El informe mensual de Doceavo, una plantilla sin datos. |  |
| `marketing/portafolio/07-doceavo/medios/calendario-1440.png` | 16:9 | La página «Calendario» de Doceavo a 1440: la hoja grande de octubre y el selector de meses. |  |

### Sin métrica

*Trabajo del bloque:* Decir que no existe y qué muestra igual, sin una cifra de resultado.

- `rotulo` · **nuevo** Sin métrica
- `h2` · **nuevo** Doceavo no existe y no tiene clientes.
- `parrafo` · **nuevo** Lo que muestra es un servicio profesional sin una sola promesa vaga: lo que ofrece es una fecha que se puede comprobar, y la identidad está hecha de esas fechas, hasta el logo.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>
- `parrafo` · **nuevo** Por dentro, cada fecha sale del calendario del SII con su fuente y su día de consulta, la página se lee entera aunque el navegador no cargue sus programas, y un bloque de datos que el visitante no ve le dice a Google y a la IA que el estudio y su contadora son inventados.  
  <sub>Fuente: marketing/portafolio/07-doceavo/caso.md (hechos de ficha.md §4, calendario del SII)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/07-doceavo/identidad/placas/16x9-f29-tinta.png` | 16:9 | Placa de Doceavo: «¿Cuándo vence el F29?» y la respuesta del sitio con su fuente: el 12, o el 20 si facturas electrónico. |  |

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar a la pieza que sigue.

- `parrafo` · **nuevo** Si quieres un sitio así para tu rubro, *escríbenos y te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `boton` · **nuevo** Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` · **nuevo** Siguiente
- `h2` · **nuevo** Tonela. *El color de la eslinga es su capacidad.*  
  → `/v3/trabajo/tonela/`  
  <sub>Nota: Lleva su rótulo «Concepto» a la vista.</sub>
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

**Cambios de registro respecto del caso.md de Bruno (los hechos no cambian)**

- La bajada pasa de «El año en doce» (4 palabras) a «El año en doce, con lo que vence cada mes»: el lock §14 pide de 6 a 13 en la continuación gris.
- Desafío → Problema; el titular, de 12 a 7 palabras («El dueño de una pyme no compra asesoría: compra no enterarse tarde.» pasa a «Enterarse tarde, por un aviso del SII.»). Sale «soluciones a tu medida» de la cita: queda «asesoría integral», que dice lo mismo, y la otra es una frase vetada del detector aunque vaya entre comillas.
- Estrategia: «el F29» se explica la primera vez («la declaración mensual del IVA»).
- Identidad: «eje que la vuelve monoespaciada» pasa a «un ajuste para volverse de ancho fijo»; salen los códigos de color y «lleno es en curso, rojo es vence».
- Qué muestra: «el HTML se lee completo sin JavaScript» pasa a «la página se lee entera aunque el navegador no cargue sus programas»; sale la lista de preguntas de ejemplo; suma que su contadora es inventada.

## /v3/trabajo/tonela/ · caso-tonela

- `title` Concepto: Tonela, proveedor de izaje · SpindleLab
- `description` Concepto: Tonela no existe. Una marca inventada de eslingas en Antofagasta, para mostrar cómo diseñaríamos y programaríamos un sitio industrial B2B. Sin cifras.
- <sub>Señales: Simón, e12/senales-obra.md §2.5 (copiado tal cual; manda Simón)</sub>
- *Estructura:* La plantilla de caso (spec §2.3), con el texto del caso.md de Bruno pasado por registro: los hechos verificados no cambian; salen los códigos de color, los pesos de letra, los nombres de código y los esquemas, y lo técnico va con lo que hace. «Concepto · 2026» en la ficha, a la vista sin scroll a 1440 y a 390.

### Barra lateral

*Trabajo del bloque:* Nombrar la pieza y decir sin scroll que es un concepto.

- `rotulo · miga` · **nuevo** Inicio · Trabajo · Tonela
- `h1` · **nuevo** Tonela. *El color de la eslinga es su capacidad.*  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón), «Ficha lateral»</sub>
- `ficha` · **nuevo**
  - **Tipo:** Concepto
  - **Año:** 2026
  - **Rubro:** Izaje: eslingas, cadenas y grilletes
  - **Lo hecho:** Identidad, sitio (portada y una página interior) y un recorrido en video  
  línea mono: «Concepto · 2026»  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón), «Ficha lateral»</sub>
- `rotulo · índice de secciones` · **nuevo** Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` · **nuevo** Quién lo hizo
- `nota` · **nuevo** Identidad, sitio y recorrido: SpindleLab. La marca es inventada.

### Medio principal

*Trabajo del bloque:* Mostrar la pieza en movimiento.

- `nota · alt` · **nuevo** Recorrido de diez segundos por el sitio de Tonela, grabado en el navegador desde su portada.  
  <sub>Dónde: movimiento/recorrido (video con aria-hidden; este texto en la figura)</sub>
- `nota · alt` · **nuevo** Portada de Tonela: «Cada color levanta un peso. El amarre decide cuánto.», con las ocho eslingas de colores colgadas de una barra, de 1 a 10 toneladas.  
  <sub>Dónde: póster del recorrido</sub>

### Problema

*Trabajo del bloque:* El problema real del rubro, en palabras de cualquiera.

- `rotulo` · **nuevo** Problema
- `h2` · **nuevo** El catálogo copiado del fabricante.
- `parrafo` · **nuevo** Foto de producto, «solicite cotización» y ninguna tabla de carga en castellano. El que compra (un jefe de mantención, un prevencionista, el encargado de bodega de una faena) cruza tres PDF en inglés para saber qué eslinga sirve para su maniobra, y el sitio no le dice qué revisar antes de usarla ni cuándo botar la que ya tiene.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** Es una compra de seguridad: si la eslinga no alcanza, se cae una carga.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>

### Hipótesis

*Trabajo del bloque:* La idea que ordena la pieza.

- `rotulo` · **nuevo** Hipótesis
- `h2` · **nuevo** Que la norma sea la marca.
- `parrafo` · **nuevo** Las eslingas de poliéster ya vienen pintadas según lo que levantan: la norma europea EN 1492 las ordena en ocho colores, del violeta de 1 tonelada al naranja de 10. Tonela no inventa un color: toma ese código como paleta y como manera de recorrer el sitio, y cada color significa su tonelaje y nada más.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** Y publica lo que un proveedor se guarda: la tabla de carga por modo de amarre y cuándo dar de baja una eslinga, con la fuente al lado.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/04-tonela/identidad/placas/16x9-codigo-tinta.png` | 16:9 | Placa de Tonela: «El color es la capacidad», con las ocho eslingas de la norma colgadas por tonelaje, de violeta 1 t a naranja 10 t. |  |

### Solución

*Trabajo del bloque:* La identidad, con lo que hace cada decisión.

- `rotulo` · **nuevo** Solución
- `h2` · **nuevo** La etiqueta como documento.
- `parrafo` · **nuevo** Cada eslinga lleva cosida una etiqueta que dice qué levanta, de qué es y bajo qué norma. La marca se cose igual: TONELA dentro de una etiqueta con su costura punteada y el zigzag con que se remata una cinta de izaje. En los tamaños chicos, como el ícono de la pestaña, queda la T sola.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** La marca es tinta casi negra sobre blanco y no tiene color propio: los colores son de la carga. Cada color lleva su texto en el tono que se lee bien encima; el verde de la norma no alcanzaba y se oscureció hasta que se leyera.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** Las letras son tres, cada una con un trabajo: Big Shoulders para la marca y los titulares; su versión de plantilla, Big Shoulders Stencil, para lo que en una bodega se pinta con plantilla (el tonelaje, el lote, el rótulo del estante); y Barlow Semi Condensed para el texto y las tablas, con cifras del mismo ancho para que una columna de capacidades se lea de un vistazo.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/04-tonela/identidad/placas/16x9-logo-tinta.png` | 16:9 | La marca de Tonela: TONELA dentro de una etiqueta cosida con costura punteada, sobre negro. |  |
| `marketing/portafolio/04-tonela/identidad/placas/4x5-eslinga-2-lienzo.png` | 4:5 | Una eslinga verde de 2 toneladas con la marca cosida y su etiqueta colgante: capacidad por amarre, norma EN 1492-1 y lote «ficticio». |  |
| `marketing/portafolio/04-tonela/identidad/placas/4x5-eslinga-5-tinta.png` | 4:5 | Una eslinga roja de 5 toneladas con la marca cosida y su etiqueta colgante, sobre negro. |  |
| `marketing/portafolio/04-tonela/identidad/placas/4x5-letra-tinta.png` | 4:5 | La letra de Tonela, Big Shoulders: «Aa» grande y «Cuánto levanta cada color, según cómo amarres». |  |
| `marketing/portafolio/04-tonela/identidad/placas/1-62-stencil-lienzo.png` | 1,62 | Big Shoulders Stencil: los tonelajes de 1 a 10 con su color, y «Estante C · Lote ficticio». |  |
| `marketing/portafolio/04-tonela/identidad/placas/1-62-barlow-lienzo.png` | 1,62 | Barlow Semi Condensed: un párrafo sobre el canasto y una columna de capacidades. |  |
| `marketing/portafolio/04-tonela/identidad/placas/16x9-tabla-lienzo.png` | 16:9 | La tabla de carga por color de Tonela, con el amarre en canasto de 7° a 45° elegido. |  |
| `marketing/portafolio/04-tonela/identidad/pliego.png` | 16:9 | El pliego de identidad de Tonela: la marca, el código de color, las tres letras y la tabla de carga. |  |

### La pieza

*Trabajo del bloque:* El sitio aplicado.

- `rotulo` · **nuevo** La pieza
- `h2` · **nuevo** Un sitio que contesta la pregunta técnica.
- `parrafo` · **nuevo** La portada abre con las ocho eslingas colgadas de una barra, cada una más ancha según lo que levanta, y el titular «Cada color levanta un peso. El amarre decide cuánto.». Debajo, la tabla de carga funciona: eliges el amarre y cada fila muestra su capacidad, y un dibujo del canasto deja abrir los ramales para ver cómo baja la carga hasta que, pasados los 60°, dice «No se iza».  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** El catálogo va ordenado por lo que levanta y sin precios; estrobos, cadenas y grilletes van aparte y sin color, porque el código no es de ellos. Después vienen la inspección, cinco cosas que la empresa no hace (entre ellas, firmar tu plan de izaje), cinco preguntas largas en texto y un contacto de tres campos: qué levantas, cuánto pesa y en qué faena.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** La página interior, «Inspección y certificación», cuenta las tres revisiones (antes de cada uso, durante el trabajo y la anual, que es la del taller), dibuja los seis lugares donde una eslinga avisa y los ocho criterios para darla de baja. El registro de inspección es el documento de la marca: apta o dada de baja, sin un tercer resultado.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `marketing/portafolio/04-tonela/capturas/home-1440-primera.png` | 16:9 | La portada de Tonela a 1440: el titular a la izquierda y las ocho eslingas colgadas a la derecha, con el rótulo de concepto arriba. |  |
| `marketing/portafolio/04-tonela/capturas/medio-4x5-390.png` | 4:5 | La portada de Tonela en un celular, con el rótulo «Concepto. De SpindleLab. Tonela no existe y nada de esto ocurrió.» |  |
| `marketing/portafolio/04-tonela/capturas/inspeccion-4x5-390.png` | 4:5 | La página «Inspección y certificación» de Tonela en un celular: «Qué revisamos en una eslinga y cuándo se da de baja». |  |
| `marketing/portafolio/04-tonela/identidad/placas/1-62-registro-tinta.png` | 1,62 | El registro de inspección de Tonela, una plantilla sin datos: apta o se da de baja. |  |
| `marketing/portafolio/04-tonela/identidad/placas/1-62-rotulo-tinta.png` | 1,62 | El rótulo de un estante pintado con plantilla: «Estante C · Eslingas rojas · 5 t». |  |
| `marketing/portafolio/04-tonela/identidad/placas/4x5-eslinga-2-tinta.png` | 4:5 | Una eslinga verde de 2 toneladas con su etiqueta colgante, sobre negro. |  |
| `marketing/portafolio/04-tonela/capturas/inspeccion-1440-primera.png` | 16:9 | La página «Inspección y certificación» de Tonela a 1440. |  |

### Sin métrica

*Trabajo del bloque:* Decir que no existe y qué muestra igual, sin una cifra de resultado.

- `rotulo` · **nuevo** Sin métrica
- `h2` · **nuevo** Tonela no existe y no tuvo clientes.
- `parrafo` · **nuevo** Nada de lo que muestra su sitio ocurrió. Lo que enseña es oficio: una identidad que sale de la norma del rubro en vez de decorarla, y un sitio que contesta en castellano la pregunta que el comprador le hace hoy a una IA, como «¿qué eslinga uso para levantar 3 toneladas en canasto?».  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** La respuesta está escrita en la página, y un bloque de datos que el visitante no ve le dice a Google y a la IA que Tonela es un ejercicio.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>
- `parrafo` · **nuevo** Las únicas cifras de la pieza son de la norma, con su fuente: el código de color, los factores de cada amarre, el rango de temperatura del poliéster y el ángulo de 60°. Ni precios, ni plazos, ni clientes. La tabla dice que es referencial: manda la etiqueta de cada eslinga, y el plan de izaje lo firma una persona calificada.  
  <sub>Fuente: marketing/portafolio/04-tonela/caso.md (hechos de ficha.md, verificados por Simón)</sub>

| Medio | Forma | Alt o descripción | Pie |
|---|---|---|---|
| `(fila 11 del caso.md: «Lo que lee un motor», placa pendiente de Bruno)` | 16:9 | Si la placa no se compone antes de construir, la sección va sin fila. |  |

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar a la pieza que sigue.

- `parrafo` · **nuevo** Si quieres un sitio así para tu rubro, *escríbenos y te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `boton` · **nuevo** Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` · **nuevo** Siguiente
- `h2` · **nuevo** Bernardo Combeau. *Fotógrafo y modelo: dos sitios y un panel donde carga sus fotos.*  
  → `/v3/trabajo/combeau/`
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

**Cambios de registro respecto del caso.md de Bruno (los hechos no cambian)**

- Desafío → Problema; el titular, de 10 a 5 palabras («En izaje, el sitio es un catálogo copiado del fabricante.»).
- Estrategia: «la EN 1492» pasa a «la norma europea EN 1492», para que se entienda qué es; sale «(ni un botón, ni un fondo, ni un ícono)».
- Identidad: salen los códigos de color, el 16,55:1 y el 5,38:1 y los pesos de letra; el verde que se oscureció queda dicho en palabras. «A 32 y 16 px» pasa a «en los tamaños chicos, como el ícono de la pestaña».
- Aplicación: sale la descripción de la cinta que cruza la interior; el resto, igual.
- Qué muestra: «FAQPage» y «disambiguatingDescription» pasan a «un bloque de datos que el visitante no ve»; sale «Las 40 capacidades de la tabla son su producto».

## /v3/servicios/ · servicios

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Servicios: desarrollo web, SEO técnico y visibilidad en IA
- `description` Desarrollo web a medida desde $390.000 + IVA, y SEO técnico y visibilidad en IA para que Google y ChatGPT puedan leer y citar tu sitio. Precios publicados.
- <sub>Señales: Simón, e12/senales-obra.md §2.7</sub>
- *Estructura:* spec-visual.md §2.4, fila /v3/servicios/: cabecera; una sección por momento de oferta-v3.json; «Lo que pones tú»; «Empieza por el chequeo». Sin campo de color por servicio.

### Cabecera

*Trabajo del bloque:* Decir que la puerta es el sitio: lo hacemos o lo dejamos legible.

- `rotulo · miga` Inicio · Servicios
- `h1` · **cambia** Qué hacemos. *Diseñamos y programamos sitios, y los dejamos listos para Google y la IA.*  
  <sub>Antes: «Qué hacemos»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas; la continuación dice el giro: primero se diseña y se programa.</sub>
- `entradilla` · **cambia** Si tu sitio hay que hacerlo de nuevo, o no existe, lo diseñamos y lo programamos. Si ya tienes uno y funciona, revisamos qué le impide a Google y a ChatGPT leerlo, y lo arreglamos. Antes de contratar nada, puedes revisarlo gratis con el chequeo.  
  enlaces: «el chequeo» → `/v3/diagnostico/`  
  <sub>Antes: «El centro es tu sitio. Si hay que hacerlo de nuevo, lo construimos; si ya tienes uno y funciona, hay una puerta para eso. Y antes de contratar nada, mira gratis cómo te leen hoy.»</sub>  
  <sub>Por qué: Brief §3: Desarrollo web pasa a ser la puerta del estudio. «Hay una puerta para eso» no decía cuál.</sub>
- `nota` Valores en pesos, + IVA. Los publicamos para que compares antes de escribirnos.

### Una sección por momento

*Trabajo del bloque:* Que cada lector encuentre su caso por la situación en que está, con los mismos rótulos de la home.

- `nota · referencia` · **nuevo** Nombres de servicio y precios, tal cual de oferta-v3.json momentos[].items[] («n» y «p», con «Desde … + IVA» como hoy). Las cuatro situaciones y las líneas son las de la home, que pasaron por la lectura fría. El rótulo mono de cada momento es su número de orden: «01», «02», «03», «04». Las «palabras» del dato (Desarrollo, Visibilidad, Continuidad, Alcance) no van: eran nombres internos (E11, fila 8).
- `h2` · **cambia** Tu sitio te frena, o no existe.  
  <sub>Antes: «Tu sitio te frena, o no existe»</sub>  
  <sub>Por qué: Con punto, como en la home.</sub>
- `h3` Desarrollo web  
  → `/v3/servicios/desarrollo-web/`
- `nota · precio` Desde $390.000 · $690.000 · $1.190.000 + IVA
- `parrafo` · **cambia** Lo diseñamos y lo programamos a medida, sin plantilla. Queda listo para que Google y la IA puedan leerlo, y antes de entregarlo le pasamos el chequeo gratis.  
  <sub>Antes: «El sitio nace legible para las máquinas que hoy recomiendan tu negocio. Lo compruebas con el chequeo gratis, sobre tu dominio, antes y después.»</sub>  
  <sub>Por qué: La línea de la home (texto-paso2 «home.servicios.dw.texto», aprobada en la compuerta 2): dice primero que lo diseñamos y lo programamos. La de E8 hablaba solo de máquinas.</sub>
- `h2` Tu sitio existe y no lo vas a rehacer.
- `parrafo` No hace falta reconstruir para que una IA pueda citarte.
- `h3` Visibilidad en IA  
  → `/v3/servicios/visibilidad-en-ia/`
- `nota · precio` Desde $400.000 + IVA
- `parrafo` Para que ChatGPT, Gemini y Perplexity puedan citarte cuando preguntan por tu rubro.
- `h3` Auditoría SEO técnica  
  → `/v3/servicios/auditoria-seo-tecnica/`
- `nota · precio` Desde $490.000 · $690.000 con Visibilidad en IA + IVA
- `parrafo` · **cambia** Revisa tu sitio completo y te dice qué le impide a Google encontrar tus páginas, leerlas y mostrarlas, y qué arreglar primero.  
  <sub>Antes: «Rastreo, indexación, Core Web Vitals y datos estructurados. Qué te frena y qué arreglar primero.»</sub>  
  <sub>Por qué: Cuatro términos sin explicar (brief §2); la home ya lo dice así desde la lectura fría.</sub>
- `h2` · **cambia** Tu sitio ya funciona y quieres que siga mejorando.  
  <sub>Antes: «Ya giras y quieres sostenerlo»</sub>  
  <sub>Por qué: Lectura fría, vuelta 2: el gerente lo leyó como traducción y la dueña de la clínica no lo entendió.</sub>
- `h3` Acompañamiento mensual  
  → `/v3/servicios/acompanamiento-mensual/`
- `nota · precio` Desde $590.000/mes · $790.000/mes Pro + IVA
- `parrafo` · **cambia** Una auditoría te dice qué hacer; este servicio lo hace, mes a mes, en SEO técnico, en visibilidad en IA o en las dos. Mínimo tres meses.  
  <sub>Antes: «Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA.»</sub>  
  <sub>Por qué: La línea de la home; la cadencia de informes es R2, abierta, y no se promete aquí.</sub>
- `h2` Ya tienes demanda y quieres más.
- `parrafo` · **cambia** Tus publicaciones y tu publicidad en LinkedIn, Instagram y Facebook.  
  <sub>Antes: «Orgánico y pauta social en LinkedIn y Meta.»</sub>  
  <sub>Por qué: «Orgánico» y «pauta social» son jerga; Meta es Instagram y Facebook (la home lo dice así).</sub>
- `parrafo` Google Ads para llegar a quien ya está buscando lo que ofreces.

### Lo que pones tú

*Trabajo del bloque:* Decir qué no está en los planes antes de que alguien lo suponga.

- `nota · referencia` Queda tal cual: «Lo que pones tú», sus tres puntos y «Si no tienes quién lo produzca, te conectamos con partners.»

### Empieza por el chequeo

*Trabajo del bloque:* Llevar al chequeo.

- `h2` Empieza por el chequeo
- `parrafo` · **cambia** Es gratis y mira 21 cosas de tu sitio en segundos, sin pedirte el correo. Cada una que no pase viene con la instrucción para arreglarla.  
  <sub>Antes: «Es gratis y revisa 21 señales de tu dominio en segundos, sin pedirte el correo. Cada señal que no pases viene con la instrucción para arreglarla.»</sub>  
  <sub>Por qué: El mismo idioma del chequeo en todo el sitio («21 cosas», «tu sitio»), que pasó por la lectura fría.</sub>
- `boton` · **cambia** Revisar mi sitio gratis  
  → `/v3/diagnostico/`  
  <sub>Antes: «Correr el chequeo»</sub>  
  <sub>Por qué: El botón dice qué pasa al hacer clic, igual que en Desarrollo web.</sub>
- `boton` Pedir el diagnóstico  
  → `/v3/contacto/`

## /v3/servicios/desarrollo-web/ · desarrollo-web

- `title` Desarrollo web a medida, desde $390.000 + IVA · SpindleLab
- `description` Diseñamos y programamos tu sitio a medida, listo para que Google y la IA puedan leerlo. Cuatro planes, desde $390.000 + IVA.
- <sub>Señales: Simón, e12/senales-obra.md §2.7 (el title de Simón, con el precio de entrada; la description es la mía)</sub>
- *Estructura:* spec-visual.md §2.4 (vista 5 del prototipo): cabecera; franja (Combeau fotografía); lo que va en todos los planes; sitios que construimos; glosario y planes; cinco fases; preguntas; cierre.

### Cabecera

*Trabajo del bloque:* Decir qué es, para quién es y para quién no, con el precio de partida.

- `rotulo · miga` Inicio · Servicios · Desarrollo web
- `h1` · **cambia** Desarrollo web. *Diseñamos y programamos sitios listos para que Google y la IA los lean.*  
  <sub>Antes: «Desarrollo web. Diseñamos y programamos tu sitio, y lo dejamos listo para que Google y la IA puedan leerlo.»</sub>  
  <sub>Por qué: Lock §14: la continuación gris va de 6 a 13 palabras y la tinta hasta 8 (lo midió herramientas/comprobar-obra.py).</sub>
- `entradilla` Es para cuando no tienes sitio, o el que tienes hay que hacerlo de nuevo. Cuatro planes, desde $390.000 + IVA. Si tu sitio funciona y no lo vas a rehacer, te sirve más Visibilidad en IA.  
  enlaces: «Visibilidad en IA» → `/v3/servicios/visibilidad-en-ia/`
- `boton` Ver los planes  
  → `#planes`
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `nota · alt` · **nuevo** La portada del sitio de fotografía de Bernardo Combeau: un retrato en luz verde con su frase.  
  <sub>Dónde: La franja 2,39:1 (combeau-fotografia-169 recortada al centro; spec §3.4)</sub>

### Lo que va en todos los planes

*Trabajo del bloque:* Decir qué se lleva el cliente, con cada término técnico explicado en la misma línea.

- `h2` En todos los planes. *Lo que te llevas, partas por donde partas.*
- `parrafo` Diseño propio, sin plantilla. Partimos de referentes de tu rubro, no de un tema comprado.  
  <sub>Fuente: fases, 01 Descubrimiento; FAQ «¿Usan plantillas o WordPress?»</sub>
- `parrafo` Código propio, sin WordPress ni constructores de páginas. Así controlamos cuánto pesa cada página y qué tan rápido carga.  
  <sub>Fuente: desarrollo-web.astro, «Código propio y diseño a medida, con control total del rendimiento»</sub>
- `parrafo` El SEO técnico de base: que Google pueda encontrar tus páginas, leerlas y mostrarlas, con un bloque de datos que el visitante no ve, pero que le dice a Google qué negocio eres, dónde estás y quién responde. En el Sitio Completo, además, lo preparamos para que ChatGPT y otros asistentes de IA puedan nombrarte en sus respuestas.  
  <sub>Fuente: oferta-v3.json planes (SEO técnico en los cuatro; «puesta a punto AEO/GEO» solo en el Sitio Completo)</sub>
- `parrafo` El chequeo gratis de nuestra página de inicio, pasado sobre tu sitio antes de entregarlo. Te dejamos el puntaje por escrito y, si tenías otro sitio, también el de antes.  
  enlaces: «chequeo» → `/v3/diagnostico/`  
  <sub>Fuente: desarrollo-web.astro (decidido en E8); promesa de proceso, e11/material.md §5</sub>
- `parrafo` Lo programamos con agentes de IA, y Ramón revisa cada fase antes de avanzar.  
  <sub>Fuente: desarrollo-web.astro, «Construcción con IA, revisión humana en cada fase antes de avanzar»</sub>
- `parrafo` Lo publicamos en tu dominio, con certificado de seguridad (el candado junto a la dirección) y medición de visitas. Después tienes 30 días de garantía: si algo no funciona como se aprobó, lo corregimos.  
  <sub>Fuente: desarrollo-web.astro, «Dominio, SSL, analítica y 30 días de garantía post-lanzamiento»</sub>  
  ⚠ **Condición:** Si «Dominio» en el texto anterior quería decir que el plan incluye comprarlo, Ramón lo dice y se agrega. Hoy la nota de los planes pide «acceso a tu dominio», o sea que el dominio es del cliente.

### Sitios que construimos

*Trabajo del bloque:* Mostrar obra al lado del precio, con el tipo de cada pieza dicho.

- `h2` Lo que construimos. *Para clientes, para nosotros y como concepto, con lo que se midió.*
- `nota · referencia` · **cambia** Tres entradas del índice, con su nombre, bajada y la línea corta (tipo · año): Combeau, fotografía (→ /v3/trabajo/combeau/#fotografia) · Praxi (→ /v3/trabajo/praxi/) · Sesenta, concepto (→ /v3/trabajo/sesenta/). Ver «trabajo.entradas».  
  <sub>Antes: «Tres entradas del índice, con su nombre, bajada y línea mono: Combeau, fotografía · Praxi · Sesenta (concepto). Ver «trabajo.entradas».»</sub>  
  <sub>Por qué: Los destinos de A: Combeau es una página con dos partes.</sub>
- `nota` Las marcas rotuladas Concepto son inventadas: muestran cómo trabajaríamos un rubro, y no tuvieron clientes.
- `boton` Ver todo el trabajo  
  → `/v3/trabajo/`

### Planes

*Trabajo del bloque:* Los cuatro planes tal como están en oferta-v3.json, y lo que quiere decir cada término de esa lista.

- `h2` Elige por dónde partir. *Cuatro planes, cada uno con su precio de partida.*
- `nota · planes` Los cuatro planes van tal cual en oferta-v3.json momentos[0].planes: nombre, precio, línea y puntos, sin cambiar una palabra. Página de Campaña · Desde $390.000 + IVA · Sitio Esencial · Desde $690.000 + IVA · Sitio Completo · Desde $1.190.000 + IVA · Plataforma a Medida · Se cotiza.  
  <sub>Fuente: oferta-v3.json</sub>
- `nota` Valores en pesos, + IVA. El valor final se cierra cuando conversamos tu proyecto: lo mueven la cantidad de páginas y las funciones que necesites. Cada plazo cuenta desde que nos llegan el anticipo, los textos y las imágenes. Para publicar necesitamos acceso a tu dominio.  
  <sub>Fuente: desarrollo-web.astro #planes y FAQ «¿Cuánto cuesta?» («según las páginas y funciones que necesites»)</sub>
- `rotulo` Qué quiere decir
- `nota · glosario`
  - Pauta: la publicidad que pagas en Google, Instagram o Facebook. Convertirla es que quien llega por ella te escriba o te compre.
  - Home: la página de inicio.
  - SEO técnico: lo que permite que Google encuentre tus páginas, las lea y las muestre.
  - Schema: un bloque de datos que el visitante no ve, pero que le dice a Google y a la IA qué negocio eres.
  - Indexación: que Google guarde tus páginas para poder mostrarlas cuando alguien busca.
  - Velocidad: cuánto demora tu sitio en aparecer, sobre todo en el celular.
  - CMS: el panel donde cambias textos, fotos o artículos sin tocar el código.
  - Puesta a punto AEO/GEO: dejar el sitio listo para que ChatGPT y otros asistentes de IA lo lean y puedan nombrarte en sus respuestas. Son dos siglas en inglés para lo mismo: aparecer en las respuestas que escribe la IA.
  - Integraciones: conectar el sitio con otros sistemas, como tu CRM (donde registras a tus clientes), tus reservas o tus pagos.
  - Arquitectura propia: el sitio se organiza por dentro según lo que necesita tu negocio, no según una plantilla.  
  <sub>Nota: Va antes de las tarjetas de los planes, no después: la dueña de la clínica leyó «schema», «indexación» y «AEO/GEO» en los planes sin entenderlos, y el glosario la rescató recién abajo.</sub>

### Cinco fases

*Trabajo del bloque:* Bajar el miedo a no saber qué pasa después de pagar.

- `h2` Cinco fases. *Apruebas cada una antes de pasar a la siguiente.*
- `parrafo` Conversamos sobre tu negocio y sobre a quién le tiene que hablar el sitio. Definimos la dirección de diseño con referentes concretos de tu rubro.
- `parrafo` Te mostramos las páginas clave, la portada y una página tipo, antes de programar. Ajustamos hasta que el diseño te represente.
- `parrafo` Programamos el sitio con agentes de IA y Ramón revisa el código. Sigues cada avance en un enlace de prueba, antes de que se publique.
- `parrafo` Cargamos tu contenido final, lo probamos en celular y en computador, afinamos la velocidad y el SEO técnico, y hacemos las rondas de revisión de tu plan.
- `parrafo` Publicamos el sitio en tu dominio. Tienes 30 días de garantía para corregir errores de funcionamiento.

### Preguntas

*Trabajo del bloque:* Contestar las dudas reales antes de escribir.

- `h2` Preguntas sobre el desarrollo
- `h3` ¿Usan plantillas o WordPress?
- `parrafo` No. Cada sitio se programa desde cero, sin temas comprados ni constructores de páginas. Así controlamos la velocidad y el SEO técnico desde la base.
- `h3` ¿Cuánto cuesta?
- `parrafo` Cada plan tiene un precio de partida: Página de Campaña desde $390.000 + IVA, Sitio Esencial desde $690.000 + IVA y Sitio Completo desde $1.190.000 + IVA. La Plataforma a Medida se cotiza tras una reunión. El valor final se cierra cuando conversamos tu proyecto, según las páginas y funciones que necesites.  
  <sub>Fuente: desarrollo-web.astro FAQ (sin cambio)</sub>
- `h3` ¿Qué cambia que lo construyan con IA?
- `parrafo` Los plazos. La IA acorta el trabajo de programar, no la revisión: Ramón aprueba cada fase antes de pasar a la siguiente.
- `h3` ¿El sitio incluye SEO?
- `parrafo` Sí. El SEO técnico va en todos los planes y se piensa desde el diseño. Si además quieres trabajar cómo te nombran ChatGPT, Gemini y Perplexity, eso se profundiza en Visibilidad en IA.
- `h3` ¿Qué necesitan de mí para partir?
- `parrafo` El anticipo, los textos y las imágenes: el plazo de tu plan cuenta desde que nos llegan. Para publicar, acceso a tu dominio.  
  <sub>Fuente: desarrollo-web.astro #planes, nota</sub>
- `h3` ¿Ustedes escriben los textos y sacan las fotos?
- `parrafo` No. Los textos y las imágenes los pones tú, y el plazo cuenta desde que nos llegan. La redacción, el diseño gráfico y la producción de fotos o video no están en los planes.  
  <sub>Fuente: oferta-v3.json «fuera» (contenido creativo, diseño gráfico, producción de video); nota de #planes</sub>  
  ⚠ **Condición:** Lo confirma Ramón: si en la práctica ayuda con los textos, la respuesta cambia.

### Cierre

*Trabajo del bloque:* Una acción para cada caso: partir de cero o revisar el sitio que ya hay.

- `h2` · **cambia** Cuéntanos qué necesita tu sitio. *Te respondemos en 24 horas, tengas sitio o no.*  
  <sub>Antes: «Cuéntanos qué necesita tu sitio. Te respondemos en 24 horas.»</sub>  
  <sub>Por qué: Lock §14: la continuación gris va de 6 a 13 palabras y la tinta hasta 8 (lo midió herramientas/comprobar-obra.py). La continuación suma los dos casos, como el contacto.</sub>  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `parrafo` Si partes de cero, conversamos tu proyecto. Si ya tienes sitio, empezamos con el mini-diagnóstico: una página con lo que está bien, lo que lo frena y qué haríamos primero, gratis.
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `boton` Revisar mi sitio gratis  
  → `/v3/diagnostico/`
- `boton` Visibilidad en IA →  
  → `/v3/servicios/visibilidad-en-ia/`

## /v3/servicios/visibilidad-en-ia/ · visibilidad-en-ia

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Visibilidad en IA (AEO/GEO): que ChatGPT pueda citarte
- `description` Revisamos cómo te describen ChatGPT, Gemini y Perplexity y qué le falta a tu sitio para que puedan citarte, y nos ocupamos de eso. Desde $400.000 + IVA.
- <sub>Señales: Simón, e12/senales-obra.md §2.7 (title y description: los fija Simón, con Clara, en servicios-v3.json)</sub>

### Cabecera

*Trabajo del bloque:* Nombrar el servicio y decir qué le hace al cliente.

- `rotulo · miga` Inicio · Servicios · Visibilidad en IA
- `h1` · **cambia** Visibilidad en IA. *Que ChatGPT, Gemini y Perplexity puedan leer tu sitio y nombrarte.*  
  <sub>Antes: «Visibilidad en IA»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas; el nombre del servicio no cambia y la continuación dice qué le hace al cliente.</sub>
- `nota · referencia` Queda tal cual, desde su dato: la línea con el precio («linea»), los dos botones, la nota de precios, el lead, todas las secciones con sus planes y precios, las preguntas, el cierre y «Siguiente».
- `nota · alt` · **nuevo** El chequeo gratis de SpindleLab con el resultado de un sitio en pantalla.  
  <sub>Dónde: La franja 2,39:1: el chequeo con un resultado (chequeo-43, recortado al centro; spec §2.4)</sub>

## /v3/servicios/auditoria-seo-tecnica/ · auditoria-seo-tecnica

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Auditoría SEO Técnica para empresas · SpindleLab
- `description` Encontramos qué le impide a Google rastrear, entender y confiar en tu sitio, y te lo entregamos ordenado por impacto. Desde $490.000 + IVA.
- <sub>Señales: Simón, e12/senales-obra.md §2.7 (title y description: los fija Simón, con Clara, en servicios-v3.json)</sub>

### Cabecera

*Trabajo del bloque:* Nombrar el servicio y decir qué le hace al cliente.

- `rotulo · miga` Inicio · Servicios · Auditoría SEO técnica
- `h1` · **cambia** Auditoría SEO técnica. *Qué le impide a Google leer tu sitio, y qué arreglar primero.*  
  <sub>Antes: «Auditoría SEO técnica»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas; el nombre del servicio no cambia y la continuación dice qué le hace al cliente.</sub>
- `nota · referencia` Queda tal cual, desde su dato: la línea con el precio («linea»), los dos botones, la nota de precios, el lead, todas las secciones con sus planes y precios, las preguntas, el cierre y «Siguiente».
- `nota · alt` · **nuevo** La portada de verifica.spindlelab.cl: «¿Estás seguro?» en letras enormes, blanco y lima sobre azul, y una persona de traje y sombrero rosados que lee un papel, a caballo.  
  <sub>Dónde: La franja 2,39:1 de la spec: verifica-y-cumple-53 (spec §2.4)</sub>
- `nota · pie` · **nuevo** La persona a caballo de esta portada está generada con IA.  
  ⚠ **Condición:** Solo si la franja sigue siendo la portada de Verifica y Cumple. Propuesta para Lucía: la franja con «sus 12 cosas» (verifica-y-cumple-12-169), sin persona generada, y el pie sale.

## /v3/servicios/acompanamiento-mensual/ · acompanamiento-mensual

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Acompañamiento Mensual de SEO e IA · SpindleLab
- `description` Cada mes arreglamos y medimos lo que hace que Google y la IA lean y citen tu sitio, con informes quincenales. Desde $590.000/mes + IVA, mínimo 3 meses.
- <sub>Señales: Simón, e12/senales-obra.md §2.7 (copiado tal cual; en servicios-v3.json los aplica Diego con Clara). Ojo: la de Acompañamiento dice «con informes quincenales», que es R2 (ver pendientes de Simón)</sub>

### Cabecera

*Trabajo del bloque:* Nombrar el servicio y decir qué le hace al cliente.

- `rotulo · miga` Inicio · Servicios · Acompañamiento mensual
- `h1` · **cambia** Acompañamiento mensual. *Cada mes hacemos lo que la auditoría dijo que había que hacer.*  
  <sub>Antes: «Acompañamiento mensual»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas; el nombre del servicio no cambia y la continuación dice qué le hace al cliente.</sub>
- `nota · referencia` Queda tal cual, desde su dato: la línea con el precio («linea»), los dos botones, la nota de precios, el lead, todas las secciones con sus planes y precios, las preguntas, el cierre y «Siguiente».

## /v3/servicios/redes-sociales/ · redes-sociales

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Gestión de Redes Sociales para empresas · SpindleLab
- `description` Gestión de redes sociales para empresas en LinkedIn y Meta: estrategia, pauta, comunidad y reportes. El contenido creativo lo pones tú.
- <sub>Señales: Simón, e12/senales-obra.md §2.7 (title y description: los fija Simón, con Clara, en servicios-v3.json)</sub>

### Cabecera

*Trabajo del bloque:* Nombrar el servicio y decir qué le hace al cliente.

- `rotulo · miga` Inicio · Servicios · Gestión de redes sociales
- `h1` · **cambia** Gestión de redes sociales. *Tus publicaciones y tu publicidad en LinkedIn, Instagram y Facebook.*  
  <sub>Antes: «Gestión de redes sociales»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas; el nombre del servicio no cambia y la continuación dice qué le hace al cliente.</sub>
- `nota · referencia` Queda tal cual, desde su dato: la línea con el precio («linea»), los dos botones, la nota de precios, el lead, todas las secciones con sus planes y precios, las preguntas, el cierre y «Siguiente».

## /v3/servicios/paid-media/ · paid-media

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Paid Media (Google): anuncios de búsqueda · SpindleLab
- `description` Armamos y manejamos tu Google Ads para que tu anuncio salga cuando alguien busca lo que vendes, con el presupuesto bajo tu control. Desde $350.000/mes + IVA.
- <sub>Señales: Simón, e12/senales-obra.md §2.7 (title y description: los fija Simón, con Clara, en servicios-v3.json)</sub>

### Cabecera

*Trabajo del bloque:* Nombrar el servicio y decir qué le hace al cliente.

- `rotulo · miga` Inicio · Servicios · Paid Media (Google)
- `h1` · **cambia** Paid Media (Google). *Tu anuncio aparece cuando alguien busca en Google lo que vendes.*  
  <sub>Antes: «Paid Media (Google)»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas; el nombre del servicio no cambia y la continuación dice qué le hace al cliente.</sub>
- `nota · referencia` Queda tal cual, desde su dato: la línea con el precio («linea»), los dos botones, la nota de precios, el lead, todas las secciones con sus planes y precios, las preguntas, el cierre y «Siguiente».

## /v3/metodo/ · metodo

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Método: SEO técnico y visibilidad en IA · SpindleLab
- `description` Cómo trabajamos, en cuatro pasos medibles: revisamos qué le impide a Google y a la IA leer tu sitio, priorizamos, lo arreglamos y medimos el cambio.
- <sub>Señales: Simón, e12/senales-obra.md §2.8</sub>

### Cabecera

*Trabajo del bloque:* Decir para qué es este método, y adónde ir si el sitio hay que hacerlo de cero.

- `rotulo · miga` Inicio · Método
- `h1` · **cambia** Cómo trabajamos. *Para que Google y la IA lean el sitio que ya tienes.*  
  <sub>Antes: «Cómo trabajamos»</sub>  
  <sub>Por qué: Con el giro, el estudio también diseña y programa; este método es el de un sitio que ya existe. La continuación lo dice. Lock §14: la continuación gris va de 6 a 13 palabras y la tinta hasta 8 (lo midió herramientas/comprobar-obra.py).</sub>
- `entradilla` Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo.
- `parrafo` · **nuevo** Si vamos a diseñar y programar tu sitio desde cero, el proceso es otro: cinco fases que apruebas una por una, en Desarrollo web.  
  enlaces: «Desarrollo web» → `/v3/servicios/desarrollo-web/`  
  <sub>Por qué: Brief §3: Desarrollo web es la puerta del estudio. Sin esta línea, quien llega por el menú lee que el estudio solo audita.</sub>
- `nota · referencia` Queda tal cual, desde su dato: el lead, «Del diagnóstico al monitoreo» (las cuatro fases con duración, entregable y costo), «Tres reglas que no negociamos», «Lo que necesitamos de ti» y el cierre «El primer paso es gratis.».

## /v3/diagnostico/ · diagnostico

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Chequeo gratis: ¿ChatGPT puede leer tu sitio? · SpindleLab
- `description` Escribe tu dominio y en segundos ves si ChatGPT, Claude y Perplexity pueden leer, entender y citar tu sitio. Gratis, con las 21 señales y su peso publicados.
- <sub>Señales: Simón, e12/senales-obra.md §2.6</sub>

### El instrumento primero

*Trabajo del bloque:* Brief §3, «sube de papel»: es la parte que el visitante corre sobre su dominio, la prueba de que lo que construimos se mide. Mismo idioma que el chequeo de la home.

- `rotulo · miga` Inicio · Chequeo gratis
- `h1` · **cambia** Chequeo gratis. *Mira si ChatGPT y otros asistentes de IA pueden leer tu sitio.*  
  <sub>Antes: «¿Te puede leer la IA?»</sub>  
  <sub>Por qué: El h1 era la única pregunta de la página aparte de las preguntas frecuentes y el cierre; ahora dice qué es y qué hace, como la home.</sub>
- `entradilla` · **cambia** Escribe la dirección de tu sitio y en segundos ves si ChatGPT y otros asistentes de IA pueden leerlo y entender a qué te dedicas. Es el mismo chequeo que le pasamos a cada sitio que construimos, antes de entregarlo.  
  <sub>Antes: «Pon tu dominio y revisamos al instante si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio, y si la IA puede entender qué haces y citarte.»</sub>  
  <sub>Por qué: La lectura fría: «los robots… pueden entrar» le sonó a hackeo al gerente, la dueña de la clínica no conoce Claude ni Perplexity y no sabía si «tu dominio» era la dirección de su página. La segunda frase es el giro: el chequeo prueba el trabajo del estudio.</sub>
- `rotulo · label` · **cambia** La dirección de tu sitio  
  <sub>Antes: «Tu dominio»</sub>  
  <sub>Por qué: El mismo campo que la home.</sub>
- `nota · placeholder` tuempresa.cl
- `boton` Revisar mi sitio  
  → `corre /api/chequeo (ids chq-* sin cambio)`
- `nota · ayuda` Gratis y sin dejar tu correo. Leemos solo páginas públicas, las mismas que lee cualquier buscador.
- `nota · error` · **cambia** Escribe la dirección de tu sitio para empezar.  
  <sub>Antes: «Escribe tu dominio para empezar.»</sub>  
  ⚠ **Condición:** El mismo de la home: vive en v3-chequeo.js y pide su fila en la spec.

### Lo demás

*Trabajo del bloque:* La metodología publicada, lo que no mide, los dos caminos, la ley y las preguntas.

- `nota · referencia` Queda tal cual, desde su dato: el resultado del chequeo y su línea («21 chequeos, 100 puntos…»), «Los 21 chequeos, publicados» con sus tres bloques y pesos, «Dos caminos, y ninguno te cobra», «La Ley 21.719 también te toca», las cinco preguntas y el cierre «¿Quién aparece en tu lugar?».
- `parrafo` · **cambia** Los motores citan rankings, directorios y artículos de terceros, además del sitio de quien recomiendan. Si no sabes de dónde sale la recomendación, no sabes qué trabajar.  
  <sub>Antes: «Los motores citan rankings, directorios y artículos de terceros, y no solo el sitio de quien recomiendan. Si no sabes de dónde sale la recomendación, no sabes qué trabajar.»</sub>  
  <sub>Por qué: Detector A4 («no solo X, sino Y»): el contraste es real, pero «además del» dice lo mismo sin el molde.</sub>
- `nota · pie` · **nuevo** La persona a caballo de esta portada está generada con IA.  
  ⚠ **Condición:** Solo si la sección de la ley conserva la imagen de Verifica y Cumple abierta en un notebook y un teléfono, donde se ve la persona a caballo. Su alt queda.

## /v3/blog/ · blog

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Blog: SEO técnico y visibilidad en IA · SpindleLab
- `description` Cómo funcionan el SEO técnico y la visibilidad en motores de IA en Chile, explicado con la metodología a la vista y sin promesas de primeros lugares.
- <sub>Señales: Simón, e12/senales-obra.md §2.9: el índice y los siete artículos quedan; cambia solo su imagen al compartir</sub>

### Índice (barra lateral y filas)

*Trabajo del bloque:* Nombrar el blog y llevar a cada artículo.

- `rotulo · miga` Inicio · Blog
- `h1` · **cambia** Blog. *Lo que escribimos sobre búsqueda e IA.*  
  <sub>Antes: «Lo que escribimos sobre búsqueda e IA»</sub>  
  <sub>Por qué: La plantilla de A pone el h1 en dos tintas: el texto de hoy pasa a la continuación, sin cambiar una palabra.</sub>
- `rotulo` (7)  
  <sub>Nota: Conteo verdadero de artículos; sale del dato.</sub>
- `entradilla` Cómo funciona esto por dentro, desde qué mira el chequeo hasta qué preguntar antes de contratar a alguien. La metodología está publicada a propósito.
- `nota · referencia` Cada fila: la fecha y el tema en mono (el tema es el que ya trae cada artículo: Metodología, Visibilidad en IA, Guía de compra, Guía de precios, Guía para gerentes, Guía del método, SEO técnico) y el título del artículo, tal cual, enlazado.
- `nota · referencia` Queda tal cual: «Leer ayuda; medir, más.», su guía, su cuerpo y los dos botones.

### Plantilla del artículo (los siete)

*Trabajo del bloque:* El cuerpo de cada artículo queda tal cual (brief §3); aquí solo lo que pone la plantilla de A.

- `rotulo · miga` Inicio · Blog · <nombre corto>
- `ficha · ficha`
  - **Tema:** <tema>
  - **Fecha:** <fecha de publicación>
  - **Lectura:** <n> min
- `nota · autor` · **cambia** Ramón Vallejos · Fundador de SpindleLab  
  <sub>Antes: «Ramón · SEO técnico y GEO en SpindleLab»</sub>  
  <sub>Por qué: El de hoy es el cargo de antes del giro.</sub>  
  ⚠ **Condición:** Es su cargo (R5 del brief; senales-obra §1.1): lo confirma Ramón. Si no, queda el de hoy.
- `rotulo` · **nuevo** En este artículo  
  <sub>Nota: Sobre el índice de sus h2 en la barra (nombre accesible: «Secciones»).</sub>
- `rotulo` · **nuevo** Siguiente artículo  
  <sub>Nota: Con el título del siguiente, enlazado.</sub>

## /v3/nosotros/ · nosotros

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Ramón Vallejos, quién está detrás · SpindleLab
- `description` Detrás de SpindleLab está Ramón Vallejos: diseña, programa con agentes de IA cuyo código él revisa, y deja cada sitio listo para que Google y la IA lo lean.
- <sub>Señales: Simón, e12/senales-obra.md §2.10</sub>

### Cabecera y bio

*Trabajo del bloque:* Decir quién está detrás. La bio y el h1 son R4: tal cual.

- `rotulo · miga` Inicio · Nosotros
- `h1` No te prometo. Te muestro.  
  <sub>Nota: R4: tal cual. Va en una sola tinta: partirlo en dos dejaría una continuación de dos palabras (el lock §14 pide de 6 a 13) y no se le agrega nada a un texto de Ramón.</sub>
- `entradilla` · **cambia** Detrás de SpindleLab está Ramón Vallejos: diseño y programación de sitios a medida, SEO técnico y visibilidad en IA.  
  <sub>Antes: «Detrás de SpindleLab está Ramón Vallejos: SEO técnico y visibilidad en motores de IA.»</sub>  
  <sub>Por qué: El giro (brief §1): el estudio diseña y programa. No es la bio: es la línea de presentación.</sub>
- `nota · alt` · **cambia** Ramón Vallejos, de camisa celeste, sobre fondo oscuro.  
  <sub>Antes: «Ramón Vallejos, consultor de SpindleLab, de camisa celeste sobre fondo oscuro»</sub>  
  <sub>Por qué: El alt describe la foto; el cargo no se ve en ella (y es R5).</sub>
- `boton` · **cambia** Revisar mi sitio gratis  
  → `/v3/diagnostico/`  
  <sub>Antes: «Correr el chequeo»</sub>  
  <sub>Por qué: El mismo botón del chequeo en todo el sitio.</sub>
- `boton` Escríbenos  
  → `/v3/contacto/`
- `parrafo` Soy Ramón Vallejos. SpindleLab soy yo al frente, orquestando el motor, con agentes de IA a mi lado y partners para lo que no hacemos en casa.
- `nota` · **cambia** Ramón Vallejos · Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad en IA · Chile  
  <sub>Antes: «Ramón Vallejos · Consultor de SEO técnico y visibilidad en IA · Chile»</sub>  
  ⚠ **Condición:** Es su cargo (R5; senales-obra §1.1, que propone el mismo para el jobTitle): lo confirma Ramón. Si no, queda el de hoy.
- `nota · referencia` Queda tal cual (R4): «Antes pasé más de cinco años en agencias» y sus cuatro líneas.

### Por qué un solo sistema

*Trabajo del bloque:* Contar por qué un solo responsable, con el sitio al centro (brief §1: no es una agencia de marketing).

- `h2` Por qué un solo sistema
- `parrafo` En las empresas que reviso pasa casi siempre lo mismo. Uno hizo el sitio, otro lleva las redes, otro la pauta, y ninguno mira si la IA te nombra.
- `parrafo` · **cambia** Por eso parto por el sitio, que es adonde llega todo lo demás: lo diseño y lo programo, o reviso el que ya tienes, y lo dejo listo para que Google y la IA lo lean. Las redes y la pauta se suman cuando el sitio ya responde, y todo se mide junto.  
  <sub>Antes: «Te lo cuento porque con esa experiencia puedo hacerme cargo del eje de tu operación y poner el motor a funcionar entero, no por partes. Conectamos las piezas en un solo sistema y las medimos juntas, con el orgánico como eje, porque es lo que no se apaga cuando cortas el presupuesto.»</sub>  
  <sub>Por qué: Brief §1 y §2: el estudio no es una agencia de marketing y el sitio va al centro; redes y pauta siguen en la oferta, no al frente. «El eje de tu operación», «el motor» y «el orgánico» son jerga de agencia.</sub>  
  ⚠ **Condición:** Es la voz de Ramón, en primera persona y fuera de la bio: lo confirma él. Si no, queda el de hoy.
- `parrafo` · **cambia** El objetivo es que vendas, y que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí.  
  <sub>Antes: «El objetivo no es solo que vendas. Es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí.»</sub>  
  <sub>Por qué: Detector A4 («no solo X, sino Y»): la misma idea, sin el molde.</sub>  
  ⚠ **Condición:** Igual que el párrafo anterior.

### Cómo trabajo

*Trabajo del bloque:* Cuatro hechos de cómo trabaja, más el que pide el giro.

- `h2` Cómo trabajo
- `h3` · **nuevo** Diseño y programo a medida  
  ⚠ **Condición:** Primera persona de Ramón: lo confirma él.
- `parrafo` · **nuevo** Cuando el sitio hay que hacerlo de nuevo, lo diseño y lo programo con agentes de IA, y reviso cada fase antes de avanzar, sin plantillas ni WordPress.  
  <sub>Por qué: Brief §3: Desarrollo web es la puerta del estudio, y esta lista no lo nombraba.</sub>  
  <sub>Fuente: desarrollo-web (texto-paso2 «dw.incluye.1», «dw.incluye.6» y «dw.faq.1.r»); nosotros.astro:85</sub>  
  ⚠ **Condición:** Igual que el título.
- `nota · referencia` Queda tal cual: «Diagnóstico antes que contrato» y su texto.
- `h3` Arreglo lo técnico y lo legible
- `parrafo` · **cambia** SEO técnico, datos estructurados y contenido que la IA pueda citar. Si tu sitio funciona, no hay que rehacerlo: hay que hacerlo legible.  
  <sub>Antes: «SEO técnico, datos estructurados y contenido que la IA pueda citar. No hay que rehacer tu sitio. Hay que hacerlo legible.»</sub>  
  <sub>Por qué: Con el giro, a veces sí hay que rehacerlo: la frase pasa a ser condicional.</sub>
- `nota · referencia` Quedan tal cual: «Mido si te recomiendan» y «Sin humo», con sus textos.

### Cierre y siguiente

*Trabajo del bloque:* Llevar al diagnóstico.

- `nota · referencia` Queda tal cual: «¿Apareces cuando tus clientes preguntan?», su bajada, su párrafo, «Pedir el diagnóstico» y «Siguiente · Método». El segundo botón dice «Revisar mi sitio gratis», como arriba.

## /v3/contacto/ · contacto

- *Modo:* queda con ajustes. Lo que no se lista aquí queda tal cual, desde su dato. Cambia solo lo que pide el giro (brief §3 y §5), lo que la plantilla de A necesita (el h1 en dos tintas) y lo que dispara un detector.
- `title` Contacto: pide un sitio o un diagnóstico gratis · SpindleLab
- `description` Escríbenos a hola@spindlelab.cl. Si quieres un sitio, te contamos cómo lo haríamos; si ya tienes uno, en 24 horas te mandamos un mini-diagnóstico gratis.
- <sub>Señales: Simón, e12/senales-obra.md §2.11</sub>
- *Lo que no se toca:* No cambian los nombres de los campos, .contact-form, #f-utm-*, .form-status, .form-success, v3-contacto.js ni generate_lead (brief §6.7, criterio 11). Solo cambia el texto visible.

### Cabecera

*Trabajo del bloque:* Con el giro, la puerta también es un sitio nuevo: decir qué pasa al escribir en los dos casos.

- `rotulo · miga` Inicio · Contacto
- `h1` · **cambia** Escríbenos. *Te respondemos en 24 horas, tengas sitio o partas de cero.*  
  <sub>Antes: «Un correo. Tu URL. 24 horas.»</sub>  
  <sub>Por qué: Hablaba solo del diagnóstico (Simón, senales-obra §2.11), y tres fragmentos sin verbo como titular son lo que la voz de la marca no usa (voz-spindlelab, «Lo que no aparece nunca»).</sub>
- `entradilla` · **cambia** Si ya tienes sitio, te mandamos el mini-diagnóstico: una página con lo que está bien, lo que lo frena y qué haríamos primero, gratis. Si partes de cero, te escribimos para conversar tu proyecto.  
  <sub>Antes: «Escríbenos con la dirección de tu sitio y recibes el mini-diagnóstico, gratis.»</sub>  
  <sub>Por qué: Los dos caminos, con lo que recibe cada uno (las mismas palabras que el contacto de la home).</sub>

### El formulario

*Trabajo del bloque:* Que llenarlo sea obvio para los dos casos, sin tocar lo que mide.

- `h2` · **cambia** Cuéntanos qué necesitas  
  <sub>Antes: «Pide tu mini-diagnóstico»</sub>  
  <sub>Por qué: El formulario sirve también para pedir un sitio.</sub>
- `rotulo · label` Nombre
- `rotulo · label` Correo
- `rotulo · label` · **cambia** La dirección de tu sitio  
  <sub>Antes: «Sitio web»</sub>  
  <sub>Por qué: El mismo nombre del campo que el chequeo. El name del campo sigue siendo «Sitio web».</sub>
- `nota · placeholder` tuempresa.cl
- `nota · ayuda` Si partes de cero, escribe «no tengo» y cuéntanos tu proyecto abajo.
- `rotulo · label` Cuéntanos brevemente (opcional)
- `nota · placeholder` · **cambia** Qué hace tu empresa y qué necesitas de tu sitio…  
  <sub>Antes: «Qué hace tu empresa, qué te preocupa de tu sitio…»</sub>  
  <sub>Por qué: Sirve también para quien parte de cero.</sub>
- `rotulo · label` Acepto que estos datos se usen para responder mi solicitud, según la política de privacidad.
- `boton` · **cambia** Enviar mi mensaje →  
  <sub>Antes: «Pedir mi mini-diagnóstico →»</sub>  
  <sub>Por qué: Dice qué pasa al hacer clic en los dos casos. El script, si el envío falla, le vuelve a poner este texto (contacto.astro, MutationObserver).</sub>
- `nota · estado` Enviando…
- `nota · error` Algo falló al enviar. Escríbenos directo a hola@spindlelab.cl mientras lo revisamos.
- `h3` Listo.
- `parrafo` Te escribimos dentro de 24 horas con tu mini-diagnóstico, o para conversar tu proyecto si partes de cero.
- `nota` O escríbenos directo a hola@spindlelab.cl

### Qué pasa después

*Trabajo del bloque:* Bajar el miedo a escribir: qué pasa, en cuánto y sin compromiso.

- `h2` Qué pasa después
- `h3` Nos escribes
- `parrafo` · **cambia** Con la dirección de tu sitio basta. Si partes de cero, cuéntanos qué vendes y qué necesitas.  
  <sub>Antes: «Un correo con tu URL basta. Si quieres, cuéntanos qué vendes y qué te preocupa de tu sitio.»</sub>  
  <sub>Por qué: El camino de quien parte de cero; «URL» pasa a «la dirección de tu sitio».</sub>
- `h3` · **cambia** Te respondemos en 24 horas  
  <sub>Antes: «Recibes el diagnóstico»</sub>  
  <sub>Por qué: Vale para los dos caminos.</sub>
- `parrafo` · **cambia** Si tienes sitio, con el mini-diagnóstico: una página, en lenguaje claro, con los hallazgos que más importan y su prioridad. Si partes de cero, para conversar tu proyecto.  
  <sub>Antes: «En 24 horas: una página, en lenguaje claro, con los hallazgos que más importan y su prioridad.»</sub>  
  <sub>Por qué: Los dos caminos, con el mismo plazo que ya dice «Listo.».</sub>
- `nota · referencia` Queda tal cual: «Decides con calma» y su texto.
- `nota · referencia` Queda tal cual: «Antes de escribir» y sus tres preguntas.

## Afirmaciones por verificar antes de publicar

- **La persona a caballo de la portada de Verifica y Cumple está generada con IA.** Lo dice el commit que la puso (698821e, 21-sep: «Imagen generada (Higgsfield, cinematic_studio_2_5): un fiscalizador a caballo»). Hallazgo de esta corrida: ningún documento de la obra lo anotaba. Todo medio de Verifica y Cumple donde se vea lleva el pie: el tramo de la cinta, el índice corto de la home, el muro, la franja de Auditoría SEO técnica y la imagen de la ley en /diagnostico/.
- **«El 16 de octubre respondió en 0,52 segundos» (Verifica y Cumple, home).** Medido una vez, el 16-oct (inventario-casos §2.3). Si Javiera pide la mediana de tres, se mide en la corrida 2 y la cifra se cambia aquí, con su fecha.
- **«ocho veces más liviana» (Combeau).** 804.697 / 94.576 = 8,5 (inventario-casos §2.1). «Ocho veces» redondea hacia abajo.
- **«después de que el sitio cambió de servidor, en septiembre, Bernardo publicó solo una campaña y fotos nuevas» (Combeau, Sin métrica).** Dicho, no medido hoy: revision-panel-admin-bernardo.md:589-590 («confirmado por HTTP directo»). Si Javiera pide medirlo, se mide o la frase sale.
- **El encuadre de fotos en el panel de Combeau, y que hoy se abre con «Editar foto».** Dicho: en producción según revision-panel-admin-bernardo.md:586-588; el panel por dentro no se pudo abrir el 19-oct (pide su sesión de GitHub). Las capturas son del 3-sep y su pie lo dice.
- **«en las reseñas de las apps de entrenamiento se repite la misma queja» (Praxi).** Dicho: investigación interna de Praxi del 3-ago, cinco citas marcadas [D] (inventario-praxi §8.1). Ya no dice «la que más se repite».
- **Los tres cambios en primera persona de /nosotros/ (Por qué un solo sistema, párrafos 2 y 3; «Diseño y programo a medida»).** Son la voz de Ramón fuera de la bio: los confirma él. Si no, quedan los de hoy (el párrafo 3 de hoy dispara el detector A4).
- **El cargo de Ramón («Fundador de SpindleLab…»), en /nosotros/ y en la firma de los artículos.** R5 del brief: lo confirma Ramón (senales-obra §1.1 propone el mismo para el jobTitle).
- **«Tú hablas con él durante todo el proyecto» y «y te lo dice» (home, Quién está detrás).** Viene del paso 2 con su condición: describe cómo trabaja Ramón; lo confirma él.
- **Las condiciones de Desarrollo web que vienen del paso 2 (si el plan incluye comprar el dominio; si Ramón ayuda con los textos).** Siguen abiertas: las responde Ramón.

## Pendientes que no son míos


**Lucía (spec)**

- El error del chequeo vacío («Escribe la dirección de tu sitio para empezar.») vive en v3-chequeo.js: pide su fila en la spec con el motivo (criterio 11) para que Diego lo cambie.
- Spec §2.1, fila 4: dice que Verifica y Cumple muestra «la alternativa de Clara («Sin métrica de negocio…»)». El texto de esa fila es «home.prueba.vyc.dato» (lo que revisa y su tiempo de respuesta medido), sin puntaje. La alternativa del paso 2 cambiaba la pieza por el chequeo; como la spec deja el medio de Verifica y Cumple (§3.3), escribí el dato para esa pieza.
- Spec §2.2: la línea mono de /trabajo/ en A es «tipo · año», sin herramientas (salida A del paso 2, que cerró el defecto 16). La spec dice «hasta dos ingredientes»: cero cabe; conviene que lo diga.
- La persona generada en la portada de Verifica y Cumple: dónde va el pie en la cinta, el índice corto, el muro y la franja de Auditoría SEO técnica. Propuesta: en la franja, «sus 12 cosas» (verifica-y-cumple-12-169), sin persona, y el pie sobra.
- La foto servida de Combeau es cuadrada (828 × 828): su forma en la fila la decides tú.

**Diego (construcción)**

- La ficha de cada tramo de la cinta («home.cinta.tramos») reemplaza la de cinta.json del prototipo.
- Las situaciones y líneas de /servicios/ son las de la home: van en la página o en oferta-v3.json, a tu elección, con nombres y precios en diff 0.
- En /contacto/ cambia solo el texto visible: el name del campo sigue siendo «Sitio web».

**Bruno**

- Tonela, fila 11 del caso.md («Lo que lee un motor»): la placa está pendiente; sin ella, «Sin métrica» va sin fila.

**Simón**

- La description de Acompañamiento mensual que propones dice «con informes quincenales»: la cadencia de informes es R2, abierta, y la home y /servicios/ ya no la prometen.
- El og:image:alt de Praxi («Debajo del chat hay reglas, no una corazonada.»): confirmado contra la captura (landing-1440-sec09, praxi-reglas-169).
- Tu description de la home, de 156, queda; nombra ChatGPT como el h1.

**Ramón**

- Paid Media dice cuatro veces que optimiza «con agentes de IA» (servicios-v3.json paid-media) y no tiene fila en ningún inventario; el criterio 13 del paso 2 pedía que toda afirmación de IA remita a Praxi. No lo toqué porque no es del giro: lo decides tú (o se le pone fila).
- Las preguntas de la lectura fría del paso 2 que siguen sin respuesta: el anticipo, si hay un costo mensual, de quién es el código al terminar, qué pasa si no estás disponible, cuántas rondas trae cada plan, si atiendes regiones y si hay WhatsApp.

## Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 19-oct-2026 | Primera versión: el texto de las 27 rutas sobre A, con la compuerta 2 aplicada (portada, cinta, Praxi 5b a 5e, Combeau nuevo, cuatro conceptos, rutas que quedan con el giro) | Clara, con Renata; brief «Compuerta 2» |
