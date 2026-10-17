# E12 · Paso 2 · El texto de las páginas de la compuerta 2

**16-oct-2026, 19:50 (Chile) · escrito el 17-oct-2026 · Clara (copy de interfaz) con Renata (copy de venta)** · rama `claude/magical-franklin-ckfki2` · fuente: `texto-paso2.json` (este archivo sale de ahí con `herramientas/md.py`; no se edita a mano).

**Estado:** Borrador para la compuerta 2. Pasado por dos vueltas de lectura fría en contexto aparte (lectura-fria.md). Nada se publica: lo revisa Ramón.

**Manda:** e12/brief-de-obra.md, sección «Compuerta 1» (los nueve puntos de Ramón del 16-oct); e12/encargo-paso-2.md; e12/lock-koto.md §2.8, §7, §11, §14, §20 y §21; e12/inventario-casos.md y e12/inventario-praxi.md (una etiqueta o un número sin fila no existe); e11/diagnostico-texto.md (el error a no repetir: dar por sabido al cliente); spindlelab-astro/src/data/oferta-v3.json y servicios-v3.json (nombres y precios, comparados como texto).

## Cómo leer esto

- Tuteo en todo el sitio. Castellano de Chile.
- «tinta» + «gris» = una sola frase en dos tintas (Koto, lock §2.8 y §14: hasta 8 palabras en tinta, de 6 a 13 en gris, una vez por sección).
- «condicion» marca un texto que espera una decisión. Si la decisión es «no», el elemento sale o se usa su «alternativa».
- «fuente» dice de dónde sale el hecho. Lo que no tiene fuente no es un hecho: es redacción.
- El texto es el mismo en la dirección A y en la B (criterio 14 del encargo). Lo que cambia es cómo se muestra.
- Cada línea empieza con su rol entre comillas invertidas: `rotulo`, `h1`, `h2`, `entradilla`, `parrafo`, `boton`, `nota`, `ficha`, `cita`. *La parte en cursiva* es la continuación en gris.
- `Fuente` dice de dónde sale el hecho; `Condición`, qué decisión espera.

## La decisión del hero

**Recomendada:** `hero-sitio`. En la vuelta 2 la eligieron los tres lectores: «me dice qué hacen, para quién y qué hago si ya tengo sitio» (gerente); «dice clínicas, así que me sentí incluida» y separa «no tengo sitio» de «tengo uno» (dueña de la clínica); «puedan leerlos no promete resultado, solo capacidad técnica» (abogado). En la vuelta 1, el abogado había preferido la 2 porque la 3 decía «entiendan tu negocio» y le sonó a garantía.

- La 1, la frase de Ramón, no la entendió ninguno de los tres lectores en ninguna de las dos vueltas: no nombra sitios, ni SEO, ni IA. «Infraestructura digital» le sonó al gerente a servidores o a TI; a la dueña de la clínica, «líderes con visión» le dijo que no era para ella; al abogado, «experiencias» e «inteligencia» le sonaron a palabras de agencia. Queda en el JSON, marcada, por si Ramón la quiere igual: en ese caso conviene que la bajada sea la de la 3.
- La 2 queda como alternativa: es la más prudente para el abogado.
- Las tres comparten el bloque del chequeo, que la lectura también corrigió.

## /v3/ · home

- `title` SpindleLab · Estudio de diseño y tecnología en Santiago
- `description` Diseñamos y programamos sitios y herramientas a medida, y los dejamos listos para que Google y la IA puedan leerlos. Precios publicados y un chequeo gratis para tu sitio.

### Primera pantalla: la declaración y el chequeo como su prueba

*Trabajo del bloque:* Decir qué es SpindleLab y qué hace, para quién, y que también hace SEO técnico y visibilidad en IA; y dejar el chequeo a mano para comprobarlo con el sitio propio. Compuerta 1, punto 1.


#### Opción 1 · la frase de Ramón, textual

- `h1` Diseñamos experiencias. *Programamos inteligencia.*
- `entradilla` Un estudio de diseño y tecnología construyendo infraestructura digital a medida para líderes con visión.

<sub>Va como la escribió Ramón, sin el «[ LAB_01 ]» del principio (brief §4: los corchetes solo van alrededor de un enlace a un índice) y en caja de oración (antislop A6: si va en mayúsculas, que lo haga la hoja de estilo). El resultado de la lectura fría está en «decision_hero».</sub>

#### Opción 2 · Clara: quiénes somos y qué hacemos, como abre Koto

- `h1` SpindleLab es un estudio de diseño y tecnología. *Hacemos sitios y herramientas a medida para empresas, clínicas y estudios profesionales.*
- `entradilla` También hacemos SEO técnico y visibilidad en IA: que Google pueda leer tu sitio, y que ChatGPT y otros asistentes puedan nombrar a tu empresa cuando alguien les pregunta por tu rubro.

<sub>El registro de Koto («We’re Koto / The Creative Company»): el nombre y lo que es, en una frase. Lo concreto va en gris. Corregida tras la lectura fría: el gerente notó que «diseño y tecnología» y «diseñamos y programamos» decían dos veces lo mismo antes de decir algo útil.</sub>

#### Opción 3 · Clara: lo que hacemos y lo que eso te deja · **recomendada**

- `rotulo` Estudio de diseño y tecnología
- `h1` Diseñamos y programamos sitios a medida. *Y los dejamos listos para que Google y ChatGPT puedan leerlos.*
- `entradilla` Para empresas, clínicas y estudios profesionales. Si tu sitio ya existe y no lo vas a rehacer, también hacemos SEO técnico y visibilidad en IA: revisamos qué le impide a Google y a ChatGPT leerlo, y lo arreglamos.

<sub>Recomendada después de la lectura fría (ver «decision_hero»). Corregida: «entiendan tu negocio» pasó a «puedan leerlos» (el abogado lo leyó como garantía), sale el ejemplo del coach de entrenamiento (confundió al gerente y a la dueña de la clínica: no tiene que ver con su negocio) y entra para quién es (ninguna versión lo decía).</sub>

#### Común a las tres opciones

- `rotulo` Chequeo gratis
- `parrafo` Escribe la dirección de tu sitio y en segundos ves si ChatGPT y otros asistentes de IA pueden leerlo y entender a qué te dedicas.  
  <sub>Fuente: inventario-casos §2.4; e11/material.md §3</sub>
- `rotulo · label` La dirección de tu sitio
- `nota · placeholder` tuempresa.cl
- `boton` Revisar mi sitio  
  → `corre /api/chequeo en la misma pantalla (v3-chequeo.js; ids chq-* sin cambio)`
- `nota · ayuda` Mira 21 cosas de tu sitio, gratis y sin pedirte el correo. No guardamos la dirección que escribes. Si construimos tu sitio, le pasamos este chequeo antes de entregártelo.  
  <sub>Fuente: chequeo.js (21 ítems); /v3/diagnostico/ («Gratis y sin dejar tu correo», FAQ «¿Guardan mi dominio?»); Desarrollo web, «Todo parte con esto»</sub>

**Descartes del titular**

- «Diseño y tecnología para empresas que quieren que las encuentren»: pasa el test de rubro, pero «que las encuentren» promete un resultado que nadie puede garantizar.
- «Sitios que se ven bien y que la IA puede leer»: la mitad «se ven bien» lo dice cualquier agencia.
- Volver al circuito («Estás pagando para que lleguen a tu sitio»): con el giro, la primera pantalla dice qué hacemos; el circuito exige contexto que no cabe arriba (E11, B.1).

**Lo que se borró del texto anterior, y por qué**

- «Chequeo de visibilidad en IA» como título del campo: el lector no sabe qué es (E11, fila 1). Queda «Chequeo gratis» y la frase que dice qué revisa.
- «Ver cómo lo lee»: no decía quién lee. El botón dice lo que pasa al hacer clic.
- «21 revisiones»: dos de los tres lectores lo leyeron como «21 personas lo han usado». Ahora dice qué son: 21 cosas que mira.
- «los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio»: al gerente le sonó a hackeo, y la dueña de la clínica no conoce Claude ni Perplexity. Queda «ChatGPT y otros asistentes de IA pueden leerlo».
- «Tu dominio» como label: la dueña de la clínica no sabía si era la dirección de su página.
- Vuelta 2: «Si construimos tu sitio, te lo pasamos antes de entregarlo»: «¿qué me pasan, el sitio o el chequeo?» (gerente).
- Vuelta 2: «Santiago» en el rótulo dejó a la dueña de la clínica preguntando si trabajan en regiones. Sale del rótulo; la pregunta va a Ramón.

### Índice corto de trabajo

*Trabajo del bloque:* Mostrar que lo de arriba ya existe, con cuatro piezas de tipos distintos, y llevar al índice.

- `h2` Trabajo. *Lo que diseñamos y programamos, para clientes y para nosotros.*
- `nota · referencia` Cuatro entradas del índice, con el mismo nombre y bajada que en /trabajo/, y en la línea mono solo tipo · año (sin herramientas): Combeau, fotografía · Praxi · Verifica y Cumple · Sesenta (concepto). Ver «trabajo.entradas».  
  <sub>Nota: En la home la línea va sin los nombres de herramientas: los tres lectores los leyeron como jerga usada de evidencia (lectura fría, punto 9). El lock §14 permite «hasta dos»: cero también cabe.</sub>
- `nota` Las marcas rotuladas Concepto son inventadas: muestran cómo trabajaríamos un rubro, y no tuvieron clientes.
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`  
  <sub>Nota: El único corchete de la página (lock §14). El 10 es el conteo verdadero del índice: si cambia el número de entradas, cambia aquí.</sub>

### La pieza y lo que la prueba (Craft y Logic)

*Trabajo del bloque:* Cumplir lo que dice el posicionamiento: lo que construimos se puede medir. Una pieza al lado de un dato revisable, con fecha.

- `h2` Cada pieza, con su prueba. *Al lado de lo que hicimos, un dato con su fecha, que puedes revisar.*
- `parrafo` No son cifras de ventas de clientes: esas no las tenemos medidas, y no las vamos a inventar. Son datos de cómo quedó hecho el trabajo.
- `h3` El sitio de Bernardo Combeau, fotógrafo de retrato.
- `parrafo` Él sube sus fotos tal como las tiene, sin achicarlas, y el sitio las ajusta solo a la pantalla de cada visitante. Una foto que él sube con 805 kB, quien la mira la recibe en 95 kB: ocho veces más liviana, así que en el celular aparece antes.  
  <sub>Fuente: inventario-casos §2.1 (Netlify Image CDN: 804.697 → 94.576 bytes, WebP a 828 px)</sub>
- `ficha`   - **Medido:** 16-oct-2026  
  ⚠ **Condición:** Medición de un sitio de cliente: la permite la compuerta 1, punto 2 («no se necesita más permiso», dicho por Ramón).
- `h3` Praxi, una app de entrenamiento con un coach de IA.
- `parrafo` En Praxi la IA conversa, pero no decide cuánto peso levantas: eso lo calcula un programa con reglas fijas. La app tiene 384 pruebas automáticas que revisan, cada vez que algo cambia, que todo siga calculando igual, y el 16 de octubre pasaron todas.  
  <sub>Fuente: inventario-praxi §0.1, §5 y §8.1 (384/384 en 35 archivos)</sub>
- `ficha`   - **Medido:** 16-oct-2026
- `h3` Verifica y Cumple, nuestro chequeo gratis de la ley de datos personales.  
  ⚠ **Condición:** Decide Ramón en la compuerta 2 (encargo §10.3: mostrar los puntajes propios).
- `parrafo` Su sitio sacaba 54 de 100 en el chequeo gratis de esta página. Le agregamos lo que le faltaba, como un bloque de datos que el visitante no ve, pero que Google y la IA leen para saber qué es el sitio y quién está detrás. Dos días después sacó 94. Puedes comprobarlo: escribe verifica.spindlelab.cl en el chequeo de esta página.  
  <sub>Fuente: inventario-casos §4.1 (14-oct 22:29Z → 16-oct 17:51Z, mismo instrumento, crudos guardados)</sub>  
  ⚠ **Condición:** Decide Ramón (encargo §10.3).  
  **Si la respuesta es no:** pieza: «El chequeo gratis de esta página.»; dato: «Mira 21 cosas de un sitio y las suma sobre 100 puntos, con la metodología publicada para que cualquiera la revise.»
- `ficha`   - **Medido:** 14 y 16-oct-2026  
  ⚠ **Condición:** Igual que la fila.

**Lo que se borró del texto anterior, y por qué**

- La palabra «Logic» y «Craft»: son el nombre interno de la idea, en inglés. El lector ve «la pieza» y «su prueba».
- «Datos estructurados», «llms.txt», «sitemap» en el dato de Verifica: van en palabras del dueño («un bloque de datos que el visitante no ve, pero que Google y la IA leen»).
- El bloque entero estaba en el idioma del técnico (kB, CDN, «pruebas automáticas», «la ficha»): el gerente y la dueña de la clínica se perdieron aquí, y ella «cerró mentalmente la página». Cada dato dice ahora primero qué le pasa al visitante o al usuario, y después el número.
- El abogado leyó las mediciones como autoevaluaciones. El chequeo es público: el dato de Verifica dice cómo comprobarlo.
- Vuelta 2: «un bloque escondido en el código» le sonó sospechoso a la dueña de la clínica («escondido»). Queda «un bloque de datos que el visitante no ve, pero que Google y la IA leen».
- Vuelta 2: 805 → 95 kB y las 384 pruebas «no me dicen qué gano» (gerente). Cada uno dice ahora para qué sirve.

### Servicios, Desarrollo web primero

*Trabajo del bloque:* Que cada lector encuentre su caso por la situación en que está, con el precio a la vista, y que cada término técnico venga explicado la primera vez.

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

**Lo que se borró del texto anterior, y por qué**

- «Desarrollo», «Visibilidad», «Continuidad», «Alcance» como palabras grandes: eran nombres internos (E11, fila 8). Manda la situación del lector, que era lo que funcionaba (E11, C.1.1).
- «Rastreo, indexación, Core Web Vitals y datos estructurados»: se cambia por lo que eso le hace al negocio.
- «Implementación continua e informes quincenales»: la cadencia de informes es R2, abierta. No se promete aquí.
- «se arma con lo que esas herramientas leen de tu sitio y con lo que otros publican de ti»: a la dueña de la clínica la enredó.
- En la escena: «una regla de su proveedor» (¿qué proveedor?, preguntó el gerente) y sin decir cómo se revisó ni si se nombra (el abogado).
- Vuelta 2: «Ya giras y quieres sostenerlo»: el gerente lo leyó como traducción y la dueña de la clínica no lo entendió.
- Vuelta 2: los tres dudaron de que la visibilidad en IA les traiga clientes, y no hay una cifra con fuente que lo sostenga. El texto lo dice y manda al chequeo gratis.
- Vuelta 2: «Mínimo tres meses» sin salida («¿hay cláusula de salida?», abogado) y Paid Media sin decir si incluye la inversión (gerente).

### Quién está detrás

*Trabajo del bloque:* Contestar quién hace esto antes de que lo pregunten, sin inflar el tamaño.

- `h2` Detrás de SpindleLab está Ramón Vallejos. *Diseña él, y programa con agentes de IA: escriben código que él revisa y aprueba.*  
  <sub>Fuente: nosotros.astro:85 («con agentes de IA a mi lado y partners para lo que no hacemos en casa»)</sub>
- `parrafo` Antes pasó más de cinco años en agencias: Universal McCann; Graphene IPG, con la cuenta de LATAM Airlines en cuatro países; Incrementa y Maggiore.  
  <sub>Fuente: nosotros.astro:89-94 (CV cerrado, e11/material.md §5)</sub>
- `parrafo` Tú hablas con él durante todo el proyecto. Cuando un trabajo pide algo que él no hace, lo hace con otros profesionales, y te lo dice. Los precios, el método y el chequeo están publicados, para que compares antes de escribirnos.  
  ⚠ **Condición:** «y te lo dice» describe cómo trabaja Ramón: lo confirma él.
- `boton` Conocer a Ramón  
  → `/v3/nosotros/`

<sub>Ramón va en tercera persona y el estudio en plural. Así no se cruzan «una persona» y «volvemos» en el mismo párrafo, que fue lo que notó el lector abogado en E11.</sub>

**Lo que se borró del texto anterior, y por qué**

- «suma partners para lo que no hace»: «¿qué partners?, ¿quiénes?» (gerente); «una sola persona y subcontratados, ¿quién responde?» (abogado).
- «agentes de IA» sin explicar: «¿quién programa entonces, una persona o una máquina?» (gerente).

### Contacto

*Trabajo del bloque:* Decir qué pasa al escribir: qué recibes, en cuánto tiempo y si cuesta. Y separar el chequeo del mini-diagnóstico.

- `h2` Escríbenos con la dirección de tu sitio. *En 24 horas te mandamos el mini-diagnóstico, gratis.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `parrafo` Es una página con lo que está bien en tu sitio, lo que lo frena y qué haríamos primero. Lo hace una persona, que además le pregunta a ChatGPT, Gemini y Perplexity por tu rubro, cosa que el chequeo gratis de esta página no hace.  
  <sub>Fuente: paginas-v3.json contacto.lead; e11/material.md §3 («lo hace el mini-diagnóstico a mano»)</sub>
- `parrafo` Si partes de cero, en el mismo plazo te escribimos para conversar tu proyecto.  
  <sub>Fuente: paginas-v3.json contacto (bloque «Listo.»)</sub>
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `nota` O directo a hola@spindlelab.cl

**Lo que se borró del texto anterior, y por qué**

- «Hablemos de tu sitio.»: no decía qué se recibe ni en cuánto (E11, fila 17).

## /v3/trabajo/ · trabajo

- `title` Trabajo · SpindleLab
- `description` Sitios, una app y herramientas que diseñamos y programamos, y cuatro marcas inventadas para rubros que atendemos. Cada entrada dice de quién es y qué se midió.

### Título, bajada y filtro

*Trabajo del bloque:* Decir qué hay y cómo leer el tipo de cada entrada, sobre todo qué es un concepto, antes de que el lector lo pregunte.

- `h1` Trabajo. *Lo que diseñamos y programamos, y cómo lo resolveríamos en tu rubro.*
- `entradilla` Cada entrada dice de quién es. Cliente es un encargo pagado: hoy hay uno con caso publicado, con sus dos sitios. Propio lo hicimos para nosotros, sin encargo. Concepto es una marca inventada para mostrar cómo trabajaríamos un rubro: no existe, no tuvo clientes y no lleva cifras.
- `nota` Bajo cada pieza van las herramientas con que está hecha. Qué hace cada una por el cliente está en su caso.
- `rotulo` (10)  
  <sub>Nota: Conteo verdadero de entradas; sale del dato, no se escribe a mano.</sub>
- `rotulo · filtro` Todo (10) · Cliente (2) · Propio (4) · Concepto (4)  
  <sub>Nota: El filtro filtra de verdad (encargo §2, vista 2). Los conteos salen del dato. Tres tipos y no cuatro: el lock §7 separaba «herramienta», pero Verifica y Cumple también es una herramienta gratis y la diferencia no se podía explicar en una línea. Si Lucía la quiere de vuelta, la entradilla suma una frase.</sub>
- `rotulo · tabla (dirección B)` Nombre · Tipo · Año · Con qué está hecho · Resultado

### Las entradas del índice

*Las entradas van en el orden de «entradas»: una de cliente primero, y los conceptos intercalados para que no queden todos al final ni parezcan relleno. Es una propuesta: el orden lo fija Lucía en el tablero.*

| # | Nombre | Bajada (gris) | Línea mono | Resultado (columna de B) |
|---|---|---|---|---|
| 1 | **Combeau, fotografía** | El sitio de un fotógrafo de retrato. Él sube sus series desde un panel, y el sitio las publica con cada foto ajustada a la pantalla de quien la mira. | Cliente · 2026 · Decap CMS · Netlify Image CDN<br><sub>home y servicio: Cliente · 2026</sub> | Sin métrica de negocio. Una foto que sube con 805 kB llega en 95 kB (16-oct-2026). |
| 2 | **Praxi** | Una app de entrenamiento con un coach de IA que se acuerda de cada serie. El modelo conversa; cuándo subir el peso lo calcula el código. | Propio · 2026 · API de Anthropic · Lógica de entrenamiento en código<br><sub>home y servicio: Propio · 2026</sub> | Sin métrica de uso. 384 de 384 pruebas automáticas en verde (16-oct-2026). |
| 3 | **Sesenta** | Un estudio de abogados laborales que no existe, del lado del trabajador. Su portada cuenta los días hábiles que te quedan para demandar. | Concepto · 2026<br><sub>home y servicio: Concepto · 2026</sub> | Sin métrica: es un concepto. |
| 4 | **Verifica y Cumple** | Revisa gratis las señales técnicas que la Ley 21.719, de datos personales, le pide a un sitio con formulario. No es asesoría legal ni certifica que cumples. | Propio · 2026 · Cloudflare Pages Functions<br><sub>home y servicio: Propio · 2026</sub> | 54 → 94 en nuestro chequeo de visibilidad en IA, 14 y 16-oct-2026. ⚠ El 54 → 94 lo decide Ramón (encargo §10.3). Si no: «Sin métrica de uso: no guarda los dominios que revisa.» |
| 5 | **Ocelo** | Una clínica de ojos que no existe, en Providencia. En vez de prometer que vas a dejar los lentes, te muestra el examen que dice si te puedes operar. | Concepto · 2026<br><sub>home y servicio: Concepto · 2026</sub> | Sin métrica: es un concepto. |
| 6 | **Combeau, modelo** | El mismo cliente, el otro oficio: su book de modelo, en inglés, que también se edita desde el panel. Los videos se descargan solo cuando alguien los abre. | Cliente · 2026 · Decap CMS · Video con carga diferida<br><sub>home y servicio: Cliente · 2026</sub> | Sin métrica de negocio. La página abre sin descargar ningún video (16-oct-2026). |
| 7 | **Doceavo** | Un estudio contable que no existe, en Concepción. Su portada te dice cuándo vence tu próxima declaración mensual, y su logo cambia cada mes. | Concepto · 2026<br><sub>home y servicio: Concepto · 2026</sub> | Sin métrica: es un concepto. |
| 8 | **El chequeo de 21 señales** | Escribes un dominio y en segundos ves si ChatGPT, Claude y Perplexity pueden entrar y entender a qué se dedica. También avisa si el servidor los echa aunque tu configuración los deje pasar. | Propio · 2026 · Cloudflare Pages Functions · Prueba con robots de IA<br><sub>home y servicio: Propio · 2026</sub> | 21 revisiones, 100 puntos. No guarda los dominios, así que no sabemos cuántas veces se ha usado. |
| 9 | **Tonela** | Un proveedor de izaje que no existe, en Antofagasta: eslingas, cadenas y grilletes. Ordena su sitio con el color que la norma le da a cada capacidad de carga. | Concepto · 2026<br><sub>home y servicio: Concepto · 2026</sub> | Sin métrica: es un concepto. |
| 10 | **spindlelab.cl** | Este sitio. El chequeo de la portada corre en nuestro servidor, y Google Analytics y el píxel de Meta no cargan hasta que aceptas las cookies. | Propio · 2026 · Cloudflare Pages Functions · Analítica tras el aviso de cookies<br><sub>home y servicio: Propio · 2026</sub> | En el chequeo de la ley de datos personales sacó 36 de 100 el 9-sep-2026; lo arreglamos y el 21-sep sacó 73. Después cambiamos cómo puntúa ese chequeo, así que el puntaje de hoy no se compara con esos dos. |

<sub>Fuentes por entrada: Combeau, fotografía: inventario-casos §2.1 (las dos etiquetas y su efecto: «él carga sus series solo», «805 kB → 95 kB») · Praxi: inventario-praxi §4 y §8.1 · Sesenta: marketing/portafolio/06-sesenta/ficha.md §4.1 y §6 · Verifica y Cumple: inventario-casos §2.3 y §4.1 y §7 («describe señales; no certifica») · Ocelo: marketing/portafolio/05-ocelo/caso.md (Desafío, Estrategia) y ficha.md §6 · Combeau, modelo: inventario-casos §2.2 («0 kB de video en la carga inicial») · Doceavo: marketing/portafolio/07-doceavo/caso.md (Estrategia, Identidad) · El chequeo de 21 señales: inventario-casos §2.4 y §4.4 · Tonela: marketing/portafolio/04-tonela/caso.md (Desafío, Estrategia) · spindlelab.cl: inventario-casos §2.6 y §4.1 (36 y 73 son dichos, sin crudo). El 100 del 14-oct no va: con la regla cambiada, el abogado lo leyó como «cambiaron la escala y ahora sacan el máximo» (lectura fría, vuelta 2)</sub>

<sub>Cada herramienta de la línea mono y su fila en el inventario: «Decap CMS» → inventario-casos.json «Decap CMS» · «Netlify Image CDN» → inventario-casos.json «Netlify Image CDN» · «API de Anthropic» → inventario-praxi.json «API de Anthropic solo en servidor: …» (sin los nombres de modelo, inventario-praxi §10.4) · «Lógica de entrenamiento en código» → inventario-praxi.json «Lógica de entrenamiento en código con tests» · «Cloudflare Pages Functions» → inventario-casos.json «Cloudflare Pages Functions» · «Video con carga diferida» → inventario-casos.json «Video con carga diferida» · «Prueba con robots de IA» → inventario-casos.json «Prueba con el user-agent de tres robots de IA» (acortado: «user-agent» no se explica en una línea mono) · «Analítica tras el aviso de cookies» → inventario-casos.json «GA4 y Meta Pixel tras el aviso de cookies» (acortado a lo que le hace al visitante)</sub>

<sub>Sesenta: Los ingredientes de los conceptos están en su ficha (§6) y todavía no tienen fila en el inventario: hasta que Diego la ponga, la línea dice solo «Concepto · 2026».</sub>

**Lo que se borró del texto anterior, y por qué**

- «en producción» (E11, fila 26): dice «publicado» o nada.
- «Está dicho cuál es cuál en cada una»: contestaba una sospecha que el lector todavía no tenía. La entradilla dice qué es cada tipo.
- «Ingredientes» como nombre de columna: «palabra rara para decir tecnologías» (gerente). Queda «Con qué está hecho».
- Que los dos «Cliente» fueran del mismo fotógrafo no se decía, y dos lectores lo notaron solos. Ahora lo dice la entradilla.
- El resultado de spindlelab.cl: el abogado leyó «cambió la forma de puntuar» como «cambiaron la vara para subir el puntaje». Ahora dice qué cambió y que el 100 no se compara.
- Verifica y Cumple: «¿es asesoría legal o un chequeo técnico?» (abogado). La bajada lo contesta.
- Vuelta 2: el 100 de spindlelab.cl sale del índice. Sumarlo con la escala nueva al lado de 36 y 73 se leyó como un truco.

## /v3/trabajo/praxi/ · caso-praxi

- `title` Praxi, una app de entrenamiento con un coach de IA · Trabajo · SpindleLab
- `description` Diseñamos y programamos Praxi, una app de entrenamiento por chat. La IA entiende lo que le escribes y conversa; cuándo subir el peso lo calcula código con pruebas automáticas.
- *Estructura:* La de Koto medida (lock §21.5): barra lateral pegajosa, medio principal, cinco secciones con su rótulo y sus filas de medios, y el cierre «Siguiente». Las secciones van con los rótulos de §21.5 (Problema · Hipótesis · Solución · La pieza · Sin métrica).

### Barra lateral (a 390: el encabezado y la barra flotante)

*Trabajo del bloque:* Nombrar el caso, decir qué tipo de trabajo es y llevar a cada sección.

- `h1` Praxi *Se acuerda de cada serie*
- `ficha` 
  - **Tipo:** Propio
  - **Año:** 2026
  - **Qué es:** Sitio y app
  - **Hecho:** 21-jul a 25-ago-2026
  - **Estado:** Fuera de línea  
  línea mono: «Propio · 2026 · Sitio y app»  
  <sub>Fuente: inventario-praxi §2 y §9 (Ficha)</sub>
- `rotulo · índice de secciones` Problema · Hipótesis · Solución · La pieza · Sin métrica
- `rotulo` Quién lo hizo
- `nota` Marca, sitio, app y campaña: Ramón Vallejos, con agentes de IA.  
  <sub>Fuente: inventario-praxi §2 («Quién lo hizo»: los commits llevan Co-Authored-By: Claude)</sub>  
  ⚠ **Condición:** Decide Ramón si el caso dice «con agentes de IA» (inventario-praxi §10.6). El sitio ya lo dice de su método («Construcción con IA, revisión humana en cada fase»).

### Medio principal

*Trabajo del bloque:* Mostrar la pieza entera, y decir sin letra chica qué es generado.

- `nota · alt` Cinco escenas cortas de un hombre que entrena, come en casa, camina, está en una reunión y en una cena: el video del inicio del sitio de Praxi.
- `nota · pie` El video del inicio de Praxi. Las personas están generadas con IA.  
  <sub>Fuente: inventario-praxi §7 (Seedance 2.0, personaje PraxiChileno)</sub>

### Problema

*Trabajo del bloque:* Contar el problema en palabras de cualquiera, sin jerga de gimnasio.

- `rotulo` Problema
- `h2` Las apps de entrenamiento olvidan lo que hiciste.
- `parrafo` Quien entrena con pesas se hace la misma pregunta cada semana: si subir el peso o no. La respuesta depende de lo que hizo las semanas anteriores, y en las reseñas de las apps de entrenamiento la queja que más se repite es que no se acuerdan.  
  <sub>Fuente: Praxi, docs/2026-08-03-inteligencia-mercado-praxi.md §1.2 y §2.1 (marcado [D], con citas de reseñas)</sub>
- `parrafo` Praxi partió vendiendo otra cosa: un coach que te explica el porqué de cada decisión. Eso ChatGPT ya lo hace gratis, y lo hace bien. Había que ofrecer algo que un chat general no puede hacer.  
  <sub>Fuente: Praxi, inteligencia-mercado §1.1 (D'hoe et al., 2026); CLAUDE.md de Praxi, «Lo que se vende es la MEMORIA»</sub>

### Hipótesis

*Trabajo del bloque:* Decir qué se creyó y cómo se iba a saber si funcionaba.

- `rotulo` Hipótesis
- `h2` Vender la memoria, no la explicación.
- `parrafo` Si Praxi se acuerda de cada serie, puede decirte cuándo subir el peso, y eso no lo hace un chat que no guarda lo que entrenaste. La portada pasó de «Entrena sabiendo por qué» a «Se acuerda de cada serie que hiciste», y las palabras técnicas del entrenamiento salieron de la portada, porque en Chile casi nadie las busca en Google.  
  <sub>Fuente: inventario-praxi §2 (Claim) y §9 (Estrategia); CLAUDE.md de Praxi, «La jerga no va en la portada»</sub>
- `parrafo` Para saber si funcionaba, se fijó una señal: que alguien volviera a anotar, con su peso, un ejercicio que ya había anotado antes. Esa señal quedó medida en el servidor.  
  <sub>Fuente: Praxi, docs/encargos/2026-08-05-instrumentacion-medicion.md §A.3 (línea 97); CLAUDE.md de Praxi, «Medición y publicidad», bloque A completo</sub>  
  ⚠ **Condición:** Falta su fila en inventario-praxi.md (Diego). Si no entra, el párrafo sale y la sección queda con el primero.

**Lo que se borró del texto anterior, y por qué**

- «persona activada»: jerga de producto (gerente). Queda la señal en palabras.

### Solución

*Trabajo del bloque:* Explicar qué hace la IA y qué no, que es lo que el caso tiene de único, y cada ingrediente con lo que le hace a quien usa la app.

- `rotulo` Solución
- `h2` El modelo conversa. El código decide.
- `parrafo` A Praxi le escribes como a una persona: «hoy hice press banca, tres series de 10 con 60 kilos». La IA convierte esa frase en un registro ordenado y, si no está segura de que le contaste un entrenamiento, no guarda nada.  
  <sub>Fuente: inventario-praxi §5.1 (extract.ts, tool_choice forzado; «ante la duda, no se guarda nada» desde el 19-ago). La frase es la del ejemplo de la landing, no de una persona</sub>
- `parrafo` Las decisiones que importan no las toma el modelo. Cuándo subir el peso, cuándo hacer una semana más liviana para recuperarte y qué serie cuenta los calcula código, revisado por pruebas automáticas: programas que comprueban, cada vez que algo cambia, que cada regla siga dando lo mismo. El peso sube solo después de dos sesiones confirmadas, nunca por una suelta. El modelo recibe esas cuentas hechas y te las explica.  
  <sub>Fuente: inventario-praxi §5.3 y §4 (lib/domain/, signals.ts; 42 tests en esas piezas)</sub>
- `parrafo` Con la salud pasa lo mismo. Si mencionas dolor, mareo o señales de un trastorno alimentario, el coach no diagnostica y te manda a un profesional, y esa regla también vive en el código. Tiene una razón: el 22 de agosto, probando con una cuenta de 16 años, el coach recomendó creatina aunque sus instrucciones se lo prohibían. Desde ese día, la edad se revisa en código y no se le deja al modelo.  
  <sub>Fuente: inventario-praxi §4 y §5.5; Praxi, lib/coach/guardrailMenores.ts:6-21 (leído el 17-oct)</sub>
- `parrafo` Se paga con tarjeta sin salir de la app y sin cuenta en Mercado Pago. El número de la tarjeta lo reciben los campos de Mercado Pago y nunca pasa por el servidor de Praxi.  
  <sub>Fuente: inventario-praxi §4 (mp-card-form.tsx; CLAUDE.md de Praxi :144-164)</sub>
- `rotulo` Con qué está hecho
- `nota` El detalle, para quien quiera mostrárselo a su técnico.
- `nota · lista` 
  - Le escribes como a una persona y queda registrado, sin formularios. (API de Anthropic, solo en el servidor)
  - El peso sube con dos sesiones confirmadas, y la semana liviana llega por cansancio comprobado, no por calendario. (Lógica de entrenamiento en código)
  - Si mencionas dolor o mareo, el coach no diagnostica y te deriva; a un menor no le recomienda suplementos. (Reglas de salud y de edad en código)
  - Cada persona ve y borra solo lo suyo, y sus exámenes se guardan en un espacio privado. (Supabase)
  - Pagas sin salir de Praxi, y la tarjeta no pasa por su servidor. (Mercado Pago, dentro de la app)
  - Te llega por correo la fecha exacta del cobro, el monto y cómo cancelar. (Resend)
  - Un color fuera de la paleta de la marca no llega al sitio: la publicación se detiene. (Revisión de marca en cada publicación)
  - Google y los asistentes de IA pueden leer qué es Praxi, cuánto cuesta y qué responde. (Datos estructurados)
  - Se instala en el teléfono y se abre a pantalla completa, como una app.  
  <sub>Fuente: inventario-praxi §4 (la columna «Lo que le hace al usuario»; solo los que tienen efecto que contar)</sub>

**Lo que se borró del texto anterior, y por qué**

- Los nombres de los modelos (Sonnet 5, Haiku 4.5): queda «un modelo de IA de Anthropic» hasta que Ramón diga si se nombran (inventario-praxi §10.4).
- RIR, deload, mesociclo: van como «qué serie cuenta», «una semana más liviana para recuperarte».
- Next.js, Vercel, Tailwind, PWA como etiquetas: no tienen un efecto que contar al lector (inventario-praxi §4) y el brief §2 dice que un término sin lo que le hace al cliente no va. «PWA» queda como «Se instala en el teléfono».
- «Está obligado a responder en un formato fijo» y el nombre del modelo en el primer párrafo: el gerente y la dueña de la clínica dejaron de leer ahí. El detalle queda en la lista de abajo.
- La lista ponía primero el nombre de la herramienta (API, Supabase, Resend) y después lo que hace: la dueña de la clínica salió al ver «API» y «Supabase». Ahora va primero lo que le hace a quien usa la app.

### La pieza

*Trabajo del bloque:* Mostrar la marca, el sitio y la campaña, y rotular lo que es de ejemplo o generado junto a la imagen.

- `rotulo` La pieza
- `h2` Sitio, app y campaña, con una sola marca.
- `parrafo` La marca de Praxi vive en dos archivos que el código hace cumplir: uno con los colores, la letra y las formas, y otro con cómo habla. Si alguien pone un color que no está ahí, el sitio no se publica. El color principal partió morado, el de casi cualquier demo de IA, y pasó al amarillo del punto del logo.  
  <sub>Fuente: inventario-praxi §7 (brand.json, voice.json; el acento pasó de #8069F2 a #E2F349 el 26-jul) y §4 (design-check en prebuild, 8/8)</sub>
- `parrafo` La campaña usa el mismo chat como pieza: un reel donde la conversación con el coach aparece sobre el video.  
  <sub>Fuente: inventario-praxi §7 (reel «a memoria»)</sub>
- `nota · pie` Los números de esta captura son de ejemplo: los escribimos para la portada de Praxi y no son de un usuario.  
  <sub>Dónde: Bajo las capturas de la conversación y de «Tu progreso, en números» (inventario-praxi §6)</sub>
- `nota · pie` Las personas de las fotos y del video están generadas con IA. El texto encima es de la pieza.  
  <sub>Dónde: Bajo el reel, el carrusel y la portada de Facebook</sub>
- `nota` Faltan las pantallas de la app por dentro. Para verlas hace falta una cuenta y su base de datos, y no las vamos a armar con datos inventados.  
  ⚠ **Condición:** Solo si Ramón no entrega las capturas de la app (inventario-praxi §10.1). Si las entrega, esta nota sale.

**Lo que se borró del texto anterior, y por qué**

- Vuelta 2: «La portada la aprobó Ramón después de siete rondas de corrección»: el abogado preguntó cuántas rondas le tocan a él, y eso no está escrito en ningún plan.

### Sin métrica

*Trabajo del bloque:* Cerrar con lo que se midió y lo que no, sin adornar.

- `rotulo` Sin métrica
- `h2` Lo que se midió, y lo que no.
- `parrafo` No tenemos un número de usuarios, de uso ni de ventas de Praxi que podamos publicar, así que no ponemos ninguno. El 16 de octubre de 2026, sobre la última versión, pasaron las 384 pruebas automáticas, la revisión de marca pasó sus 8 reglas y el sitio se armó sin errores.  
  <sub>Fuente: inventario-praxi §0.4, §8.1 y crudo/verificacion-copia.txt</sub>
- `parrafo` Hoy praxi.coach está fuera de línea, y por eso esta página no lo enlaza.  
  <sub>Fuente: inventario-praxi §0.3 (402 DEPLOYMENT_DISABLED, 16-oct 22:56 UTC)</sub>  
  ⚠ **Condición:** La misma decisión del campo «Estado» de la ficha.

**Lo que se borró del texto anterior, y por qué**

- «Lo medido es el oficio.»: frase de efecto (abogado).
- «el control de marca dio 8 de 8»: la dueña de la clínica no supo qué era.

### Siguiente

*Trabajo del bloque:* Ofrecer escribir y llevar al próximo caso, en ese orden, sin pie de página (Koto, lock §21.4).

- `parrafo` Si quieres una herramienta como Praxi para tu empresa, *escríbenos y te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `parrafo` Sirve fuera del gimnasio: cualquier cosa que alguien escribe en sus palabras y que después hay que registrar y calcular bien, como una solicitud o una cotización, se puede programar igual.  
  <sub>Nota: El gerente no vio qué le decía una app de gimnasio a una empresa que le vende a otras. Es una afirmación de capacidad, no de un trabajo hecho: remite a cómo está hecho Praxi (encargo, criterio 13).</sub>
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `rotulo` Siguiente
- `h2` Sesenta *El plazo antes que el juicio*  
  <sub>Nota: Lleva el rótulo «Concepto» a la vista. La bajada es la de su caso (06-sesenta/caso.md).</sub>
- `boton` [ Todo el trabajo ] (10)  
  → `/v3/trabajo/`

**Lo que se borró del texto anterior, y por qué**

- El contacto iba después de «Sesenta. El plazo antes que el juicio», y el gerente leyó «algo así» como «un estudio de abogados». Ahora va primero y dice «una herramienta como Praxi».

## /v3/servicios/desarrollo-web/ · desarrollo-web

- `title` Desarrollo web a medida · SpindleLab
- `description` Diseñamos y programamos tu sitio a medida, listo para que Google y la IA puedan leerlo. Cuatro planes, desde $390.000 + IVA.

### Cabecera

*Trabajo del bloque:* Decir qué es, para quién es y para quién no, con el precio de partida.

- `rotulo · miga` Inicio · Servicios · Desarrollo web
- `h1` Desarrollo web. *Diseñamos y programamos tu sitio, y lo dejamos listo para que Google y la IA puedan leerlo.*
- `entradilla` Es para cuando no tienes sitio, o el que tienes hay que hacerlo de nuevo. Cuatro planes, desde $390.000 + IVA. Si tu sitio funciona y no lo vas a rehacer, te sirve más Visibilidad en IA.  
  enlaces: «Visibilidad en IA» → `/v3/servicios/visibilidad-en-ia/`
- `boton` Ver los planes  
  → `#planes`
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`

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

**Lo que se borró del texto anterior, y por qué**

- «Todo parte con esto» como título: no decía qué es «esto».
- «Legible para motores de IA: datos estructurados, contenido citable e indexación»: tres términos sin explicar en una línea.
- «Un panel para cambiar textos e imágenes tú mismo» en todos los planes: chocaba con «Blog o CMS que administras tú», que solo figura en el Sitio Completo, y los tres lectores lo notaron (punto 10). Sale de «En todos los planes»; el panel queda donde lo pone la oferta.
- «Listo para que Google y la IA te lean» en todos los planes chocaba con «puesta a punto AEO/GEO» solo en el Completo. Ahora dice qué va en todos y qué solo en el Completo.
- «Dominio, SSL…»: ¿el dominio viene incluido o lo pongo yo? (punto 4). Ahora dice que se publica en tu dominio.
- «una persona revisa»: «¿quién es esa persona?» (abogado). Es Ramón.

### Sitios que construimos

*Trabajo del bloque:* Mostrar obra al lado del precio, con el tipo de cada pieza dicho.

- `h2` Lo que construimos. *Para clientes, para nosotros y como concepto, con lo que se midió.*
- `nota · referencia` Tres entradas del índice, con su nombre, bajada y línea mono: Combeau, fotografía · Praxi · Sesenta (concepto). Ver «trabajo.entradas».
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

**Lo que se borró del texto anterior, y por qué**

- El glosario no explicaba las siglas AEO/GEO (los tres lectores, punto 2), ni «pauta», «home» ni «arquitectura propia».

### Cinco fases

*Trabajo del bloque:* Bajar el miedo a no saber qué pasa después de pagar.

- `h2` Cinco fases. *Apruebas cada una antes de pasar a la siguiente.*
- `parrafo` **01 · Descubrimiento** · Conversamos sobre tu negocio y sobre a quién le tiene que hablar el sitio. Definimos la dirección de diseño con referentes concretos de tu rubro.
- `parrafo` **02 · Diseño** · Te mostramos las páginas clave, la portada y una página tipo, antes de programar. Ajustamos hasta que el diseño te represente.
- `parrafo` **03 · Desarrollo con IA** · Programamos el sitio con agentes de IA y Ramón revisa el código. Sigues cada avance en un enlace de prueba, antes de que se publique.
- `parrafo` **04 · Pruebas y contenido** · Cargamos tu contenido final, lo probamos en celular y en computador, afinamos la velocidad y el SEO técnico, y hacemos las rondas de revisión de tu plan.
- `parrafo` **05 · Lanzamiento** · Publicamos el sitio en tu dominio. Tienes 30 días de garantía para corregir errores de funcionamiento.

**Lo que se borró del texto anterior, y por qué**

- «QA y contenido» pasa a «Pruebas y contenido»: QA es jerga.
- «con el agente de desarrollo de SpindleLab»: suena a un producto que el lector no conoce.
- «una dirección de prueba»: la dueña de la clínica no supo qué era.

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

- `h2` Cuéntanos qué necesita tu sitio. *Te respondemos en 24 horas.*  
  <sub>Fuente: paginas-v3.json contacto</sub>
- `parrafo` Si partes de cero, conversamos tu proyecto. Si ya tienes sitio, empezamos con el mini-diagnóstico: una página con lo que está bien, lo que lo frena y qué haríamos primero, gratis.
- `boton` Escribir a SpindleLab  
  → `/v3/contacto/`
- `boton` Revisar mi sitio gratis  
  → `/v3/diagnostico/`
- `boton` **Siguiente** · Visibilidad en IA →  
  → `/v3/servicios/visibilidad-en-ia/`

## Afirmaciones por verificar antes de publicar

- **54 → 94 de Verifica y Cumple (home y /trabajo/).** Decide Ramón (encargo §10.3). Si no, va la alternativa de cada elemento.
- **«Fuera de línea» en la ficha de Praxi y su párrafo final.** Decide Ramón (inventario-praxi §10.2). Medido el 16-oct: 402 DEPLOYMENT_DISABLED.
- **«con agentes de IA» en los créditos de Praxi.** Decide Ramón (inventario-praxi §10.6).
- **La definición de «persona activada» de Praxi.** Está en el repo de Praxi (instrumentacion-medicion.md:97) pero no en inventario-praxi.md: Diego le pone fila o el párrafo sale.
- **«Un panel para cambiar textos e imágenes tú mismo», que el texto anterior ponía en todos los planes de Desarrollo web.** Salió de «En todos los planes»: chocaba con la oferta, donde el CMS solo figura en el Sitio Completo (aunque Bernardo tiene panel con el Esencial), y los tres lectores lo notaron. Decide Ramón si vuelve y en qué planes.
- **805 kB → 95 kB de Combeau, con su nombre.** Medido el 16-oct. Se publica por la compuerta 1, punto 2 (dicho por Ramón, sin respaldo escrito en el repo).
- **Ingredientes de los cuatro conceptos en el índice.** Están en cada ficha (§6), sin fila en el inventario todavía. Hasta entonces, la línea dice solo «Concepto · 2026».
- **«la queja que más se repite» sobre las apps de entrenamiento (caso Praxi).** Fuente: la investigación de Praxi del 3-ago, marcada [D] con citas de reseñas. Es un documento interno de Praxi: si Javiera pide fila en inventario-praxi.md, se le pide a Diego.
- **«así que en el celular aparece antes» (Combeau) y «una foto más liviana».** Lo medido es el peso (805 → 95 kB); el tiempo no se midió. Es una consecuencia del peso, no un dato: si Javiera pide medirlo, se mide o la frase sale.
- **«Tú hablas con él durante todo el proyecto» y «y te lo dice» (home, quién está detrás).** Describe cómo trabaja Ramón hoy, sin documento que lo diga: lo confirma él.

## Pendientes que no son míos

- Los rótulos de las secciones de caso no coinciden: Praxi lleva los del lock §21.5 (Problema · Hipótesis · Solución · La pieza · Sin métrica) y los cuatro conceptos de Bruno llevan los de Koto (Desafío · Estrategia · Identidad · Aplicación · Qué muestra). En el índice conviven: Lucía elige un solo juego y yo ajusto el que quede fuera.
- La página de caso de concepto (vista 4, Sesenta) usa el texto de Bruno en 06-sesenta/caso.md: este archivo no lo reescribe. Su registro lo reviso en la pasada siguiente.
- Si la vista 3 vuelve a ser Combeau (inventario-praxi §0.7), su caso no está escrito aquí: hay que escribirlo con inventario-casos §2.1 y §2.2.
- Para Ramón, de la lectura fría (no se pueden escribir sin su respuesta): el porcentaje del anticipo; si hay un costo mensual (hosting, dominio, mantención); de quién es el código y el diseño al terminar; qué pasa si él no está disponible; cuántas rondas de revisión trae cada plan; si «Home y hasta 5 páginas» son cinco o seis en total; si se puede agendar hora en línea sin ir a Plataforma a Medida; si hay WhatsApp de contacto; si trabaja con clientes de regiones (la dueña de la clínica lo preguntó al ver «Santiago»). Los tres lectores se quedaron sin decidir por algo de esta lista.
- Praxi «fuera de línea»: a los tres les bajó la confianza que el caso con IA sea un producto apagado y sin usuarios. Si Ramón no lo reactiva, conviene que Praxi no sea la primera pieza propia del índice ni el caso de la vista 3.
- Las personas generadas con IA en el material de Praxi le bajaron la confianza a la dueña de la clínica. Decirlo es regla (inventario-praxi §7); la alternativa es mostrar menos fotos y más pantallas.

## Lo que cambió con la lectura fría

Dos vueltas en contexto aparte, con los mismos tres lectores (gerente comercial de una industrial B2B, dueña de una clínica dental de regiones, socio de un estudio de abogados de 8 personas). Vuelta 1 sobre el commit 88cde2e; vuelta 2 sobre el texto corregido. Los informes completos y lo que se hizo con cada punto están en lectura-fria.md.

- Hero: recomendada la 3, con «puedan leerlos», sin el coach y con para quién es.
- Chequeo: «Mira 21 cosas de tu sitio» en vez de «21 revisiones»; «ChatGPT y otros asistentes de IA pueden leerlo» en vez de robots que entran; «La dirección de tu sitio» en vez de «Tu dominio».
- La pieza y su prueba: primero qué le pasa al visitante, después el número; una línea que dice que no hay cifras de ventas de clientes; el dato de Verifica dice cómo comprobarlo.
- Índice: sin herramientas en la home; «Con qué está hecho» en vez de «Ingredientes»; dicho que hay un solo cliente con caso; Verifica dice que no es asesoría legal; el resultado de spindlelab.cl, explicado.
- Praxi: sin «persona activada» ni «formato fijo»; la lista pone primero lo que hace; el contacto va antes de «Siguiente» y dice «una herramienta como Praxi»; un párrafo que lo conecta con una empresa.
- Desarrollo web: qué va en todos los planes y qué solo en el Completo (SEO, IA y panel); el dominio es tuyo; qué mueve el precio; el glosario va antes de los planes y explica AEO/GEO; quién revisa es Ramón; una pregunta sobre textos y fotos.
- Vuelta 2: «un bloque de datos que el visitante no ve» en vez de «escondido»; 805 → 95 kB y las 384 pruebas dicen para qué sirven; una guía para elegir servicio (el mini-diagnóstico); visibilidad en IA dice que no hay cifra de cuántos clientes llegan por ahí; «Tu sitio ya funciona y quieres que siga mejorando» en vez de «Ya giras»; Acompañamiento con su salida; Paid Media sin la inversión; sale el 100 de spindlelab.cl del índice; sale «siete rondas» de Praxi; Concepto aclarado en Desarrollo web; AEO/GEO explicado como una sola idea.

## Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 17-oct-2026 | Primera versión: home con tres heros, /trabajo/ con diez entradas, caso Praxi, Desarrollo web | Clara, con Renata |
| 17-oct-2026 | Correcciones de la lectura fría, vuelta 1 (lectura-fria.md) | Tres lectores en contexto aparte |
| 17-oct-2026 | Correcciones de la lectura fría, vuelta 2 | Los mismos tres lectores, contexto nuevo |
