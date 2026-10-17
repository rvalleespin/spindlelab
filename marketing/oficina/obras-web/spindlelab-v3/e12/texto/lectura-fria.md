# E12 · Paso 2 · Lectura fría del texto de la compuerta 2

**17-oct-2026 · la encarga Clara (copy de interfaz, con Renata)** · rama `claude/magical-franklin-ckfki2` · sobre
`texto-paso2.json` · los informes van íntegros al final, tal como los escribió el lector, sin editar.

## Cómo se hizo

- **Contexto aparte.** En esta sesión no está la herramienta Agent, así que el lector corrió con el CLI de Claude
  Code (`claude -p`, versión 2.1.302) en un directorio vacío del scratchpad, fuera de los dos repos, con todas las
  herramientas desactivadas (`--disallowedTools Bash,Read,Write,Edit,Glob,Grep,WebFetch,WebSearch,Task,Agent`). Cada
  vuelta es una conversación nueva: el lector de la vuelta 2 no vio la vuelta 1.
- **Lo único que recibió:** las instrucciones (`lectura-fria/instrucciones.txt`) y el texto visible de las cuatro
  páginas, sacado del JSON con `herramientas/md.py --lector` (`lectura-fria/entrada-vuelta-1.txt` y
  `entrada-vuelta-2.txt`). Sin fuentes, sin notas, sin condiciones, sin mi razonamiento. Las tres opciones del hero
  van marcadas como «Versión 1, 2 y 3», sin decir de quién es cada una.
- **Los tres lectores**, los mismos de E11: gerente comercial de una industrial B2B de 40 personas que paga Google
  Ads; dueña de una clínica dental de regiones; socio de un estudio de abogados de 8 personas.
- **Qué vale y qué no.** Es una lectura simulada, no un test con personas: sirve para encontrar dónde se pierde
  alguien que no sabe de SEO, no para medir cuántos se pierden (la misma advertencia de `e11/diagnostico-texto.md`).
- **Vuelta 1** sobre el borrador del commit `88cde2e`. **Vuelta 2** sobre el texto corregido con la vuelta 1. El
  texto final tiene además las correcciones de la vuelta 2, que ningún lector leyó todavía: la próxima lectura es
  la de Javiera, en su subagente, sobre el tablero.

## La decisión del hero

| Versión | Vuelta 1 | Vuelta 2 |
|---|---|---|
| **1 · la frase de Ramón** («Diseñamos experiencias. Programamos inteligencia.» + «Un estudio de diseño y tecnología construyendo infraestructura digital a medida para líderes con visión.») | Los tres: «suena bien y no dice nada». No entendieron que hagan sitios, SEO ni IA. «Infraestructura digital» → servidores o un ERP (gerente); «para gente importante» (clínica); «marketing de lujo», «evasiva» (abogado) | Igual en los tres: «folleto puro», «no es para mí», «palabras de agencia» |
| **2 · Clara, quiénes somos** | Clara para los tres; el abogado la prefirió por prudente | El abogado leyó «estudios» como ellos mismos (corregido a «estudios profesionales») |
| **3 · Clara, qué hacemos y qué te deja** | La más clara para el gerente y la clínica; el abogado leyó «entiendan tu negocio» como garantía; el coach de entrenamiento confundió a dos | **La eligieron los tres**: «dice qué hacen, para quién y qué hago si ya tengo sitio»; «dice clínicas, me sentí incluida»; «puedan leerlos no promete resultado, solo capacidad técnica» |

**Recomendada: la 3**, marcada así en el JSON (`decision_hero`). La de Ramón queda en el JSON como opción 1, marcada
como suya: si la quiere igual, conviene que la bajada sea la de la 3, que es la que dice qué se vende.

## Vuelta 1: lo que no entendieron y qué se hizo

Los números son los de la lista consolidada del lector (al final del informe 1).

| # | Lo que no se entendió | Qué se hizo |
|---|---|---|
| 1 | El hero de Ramón | Queda como opción, no recomendada (arriba) |
| 2 | «AEO/GEO» sin desarrollar | El glosario explica las siglas y va **antes** de las tarjetas de los planes |
| 3 | «El valor final se cierra cuando conversamos» sin nada más | La nota de los planes dice qué mueve el precio (páginas y funciones, como la FAQ). Anticipo, costos mensuales y rondas: **a Ramón** (no hay dato para escribirlo) |
| 4 | ¿El dominio viene incluido? ¿Y el hosting? | «Lo publicamos en tu dominio»: el dominio es del cliente, como dice la nota de los planes. Si el plan incluye comprarlo, lo dice Ramón |
| 5 | «54 de 100 en el chequeo de esta página»: ¿qué sitio?, ¿qué chequeo? | El dato dice de qué chequeo es, qué se le agregó en palabras del dueño y cómo comprobarlo tú |
| 6 | El resultado de spindlelab.cl, con la escala cambiada, leído como un truco | Reescrito en la vuelta 1 y, como la vuelta 2 lo volvió a marcar, sale el 100 del índice |
| 7 | Praxi «fuera de línea» y el contacto que se leía como si fuera de Sesenta | El contacto va antes de «Siguiente» y dice «una herramienta como Praxi». Lo de fuera de línea es decisión de Ramón (ver abajo) |
| 8 | «21 revisiones» leído como «21 personas lo usaron» | «Mira 21 cosas de tu sitio» |
| 9 | Nombres de herramientas usados como evidencia | Fuera de la home y de Desarrollo web (línea solo con tipo y año); en /trabajo/ la columna se llama «Con qué está hecho» y una nota dice que qué hace cada una está en el caso; en Praxi, la lista pone primero lo que hace |
| 10 | El panel y la lectura para IA, en todos los planes y a la vez solo en el Completo | Desarrollo web dice qué va en todos y qué solo en el Completo; el panel sale de «En todos los planes» y la contradicción va a Ramón |
| | Cliente único sin decir | La entradilla de /trabajo/ lo dice |
| | «Concepto» sin definir en la home | Una línea bajo el índice corto de la home |
| | «robots que entran a tu sitio» sonó a hackeo; Claude y Perplexity, desconocidos | «ChatGPT y otros asistentes de IA pueden leerlo» |
| | «Tu dominio» | «La dirección de tu sitio» |
| | El bloque de pruebas, en idioma de técnico (dos lectores se perdieron ahí) | Cada dato dice primero qué le pasa al visitante; una línea dice que no hay cifras de ventas de clientes y que no se inventan |
| | «suma partners», «agentes de IA» sin explicar | Quién programa y quién revisa, dicho; «tú hablas con él durante todo el proyecto» |
| | Verifica y Cumple: ¿asesoría legal o chequeo técnico? | La bajada lo dice: no es asesoría legal ni certifica |
| | «persona activada», «formato fijo», «control de marca», «Lo medido es el oficio» | Reescritos en palabras del lector |
| | Textos y fotos: «yo no los tengo» (clínica) | Pregunta frecuente nueva, con la fuente de la oferta («fuera») y la condición para Ramón |

## Vuelta 2: lo que quedaba y qué se hizo

| # | Lo que no se entendió | Qué se hizo |
|---|---|---|
| 1 | El hero de Ramón, otra vez | Igual que arriba |
| 2 | La visibilidad en IA sin prueba de que traiga clientes | No hay una cifra con fuente (e11/material.md §4). El texto lo dice y manda al chequeo gratis como primer paso |
| 3 | Praxi como caso: fuera de línea, sin resultado, de otro rubro | El párrafo que lo conecta con una empresa ayudó al gerente («me hace pensar en un cotizador»). Lo demás es decisión de Ramón |
| 4 | Sesenta en Desarrollo web sin aclarar que es inventado | La línea de «Concepto» va también ahí |
| 5 | Servicios que se pisan, tres chequeos | Una línea bajo «Servicios»: si no sabes cuál, el mini-diagnóstico te lo dice (fuente: la FAQ de Acompañamiento) |
| 6 | Nombres de herramientas en /trabajo/ y en Praxi | Se quedan, porque el índice los pide (lock §7 y §14), pero la lista de Praxi dice que es «el detalle, para quien quiera mostrárselo a su técnico» |
| 7 | 805 → 95 kB y las 384 pruebas, «¿qué gano?» | Cada uno dice para qué sirve; sale el 100 de spindlelab.cl |
| 8 | «bloque escondido» sonó sospechoso; AEO y GEO no se distinguían | «un bloque de datos que el visitante no ve, pero que Google y la IA leen»; AEO/GEO como una sola idea |
| 9 | Precio y condiciones sin cerrar | A Ramón (lista abajo) |
| 10 | «Ya giras», «te lo pasamos», «Santiago» | «Tu sitio ya funciona y quieres que siga mejorando»; «le pasamos este chequeo»; «Santiago» sale del rótulo y la pregunta va a Ramón |
| | «Mínimo tres meses» sin salida; Paid Media sin decir si incluye la inversión | Las dos condiciones, de servicios-v3.json |
| | «siete rondas de corrección» en Praxi: «¿cuántas me tocan a mí?» | Sale |

## Lo que no se corrigió, y por qué

Ninguno de estos se arregla escribiendo: piden una decisión o un dato que no está en el repo.

1. **Las condiciones del contrato**, que los tres pidieron antes de escribir: porcentaje del anticipo, costo mensual
   (hosting, dominio, mantención), de quién es el código y el diseño, qué pasa si Ramón no está, cuántas rondas de
   revisión trae cada plan, si «Home y hasta 5 páginas» son cinco o seis, si hay agenda en línea fuera de Plataforma a
   Medida, si hay WhatsApp y si trabaja con regiones. Están en `texto-paso2.json` → `pendientes`.
2. **Praxi fuera de línea.** A los tres les bajó la confianza que el único caso con IA sea un producto apagado y sin
   usuarios. Si Ramón no lo reactiva, conviene que Praxi no encabece lo propio en el índice ni sea el caso de la vista 3.
3. **Las personas generadas con IA** del material de Praxi le bajaron la confianza a la dueña de la clínica. Decirlo es
   regla; la salida es mostrar menos fotos y más pantallas de la app, que hoy faltan (inventario-praxi §10.1).
4. **Un solo cliente y cuatro conceptos de diez.** El gerente y el abogado lo notaron en las dos vueltas. El texto ya
   no lo esconde; el número lo cambia el trabajo, no la redacción.
5. **Las mediciones hechas con nuestro propio instrumento.** El abogado las leyó como autoevaluación. El chequeo es
   público y el texto dice cómo comprobar el dato de Verifica, pero ningún dato es de un tercero.
6. **Que el abogado se incomode con un estudio de abogados inventado (Sesenta).** Es la decisión de Ramón de la
   compuerta 1 (punto 5), con el rótulo «Concepto» a la vista.
7. **Los nombres de herramientas en el índice.** El lock los pide en la línea mono; el texto los acompaña con lo que
   hacen, pero los tres los siguen viendo como jerga. Si Lucía decide sacarlos del índice, la línea queda en tipo y año.

---

# Informe de la vuelta 1 (íntegro)

<sub>Entrada: `lectura-fria/entrada-vuelta-1.txt` (borrador del commit 88cde2e).</sub>

## Lectura del sitio por tres lectores

### 1. Gerente comercial, empresa industrial B2B (Santiago)

**A. Primera pantalla**
- **Versión 1.** Entendí que son una consultora de TI o una agencia creativa, pero no sé qué venden. No entendí que hagan SEO ni visibilidad en IA. Esa versión no los menciona.
- **Versión 2.** Entendí que hacen sitios y herramientas a medida para empresas. Sí entendí lo otro:
  - SEO técnico es que Google pueda leer mi sitio.
  - Visibilidad en IA es que ChatGPT nombre a mi empresa cuando le preguntan por mi rubro.
  - Eso último me interesa, porque yo ya pago Google Ads y nadie me ha hablado de ChatGPT.
- **Versión 3.** Entendí lo mismo, pero más claro: hacen sitios, y además arreglan el sitio que ya tengo.
  - Me confundió el «coach de entrenamiento con IA». No sé qué tiene que ver un coach de gimnasio con una empresa industrial.
- **Cuál es más clara:** la 3, porque dice qué hacen y qué consigo. La 2 es buena, pero repite «diseño y tecnología» dos veces antes de decir algo útil.
- **Cuál suena bien y no dice nada:** la 1. Y ninguna dice para qué tipo de empresa trabajan.

**B. Lo que no entendí o entendí distinto**
- «infraestructura digital a medida para líderes con visión» (home, V1). Pensé en servidores o en un ERP.
- «21 revisiones. Gratis, sin dejar tu correo» (home). Lo leí como «21 personas lo han usado», o sea poca tracción. Recién en /trabajo/ vi que son 21 señales que mide la herramienta.
- «los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio» (home). Suena a hackeo.
- «Netlify Image CDN», «Decap CMS», «805 kB», «95 kB» (home y /trabajo/). No sé qué son.
- «384 pruebas automáticas. Pasaron todas.» (home). No sé si eso es mucho o poco, ni qué me importa a mí.
- «la ficha que les dice a las máquinas qué es y quién responde, y el índice de sus páginas» (home). No sé qué es la «ficha».
- «Su sitio sacaba 54 de 100 en el chequeo de esta página» (home). ¿El sitio de quién? ¿Qué chequeo?
- «Lo bloqueaba una regla de su proveedor» (home). ¿Qué proveedor? ¿El hosting?
- «Paid Media (Google)» (home). Español de agencia, aunque yo lo entiendo.
- «suma partners para lo que no hace» (home). ¿Qué partners? ¿Quiénes?
- «AEO/GEO» (Desarrollo web, planes). Nunca dice qué significan las siglas. Solo dice «ChatGPT lo lee».
- «Arquitectura propia» (Desarrollo web, Plataforma a Medida).
- «agentes de IA» (home y Desarrollo web). ¿Quién programa entonces, una persona o una máquina?
- «Hipótesis» y «persona activada» (Praxi). Es jerga de producto.
- «Lógica de entrenamiento en código» (/trabajo/ y Praxi).
- «Video con carga diferida» (/trabajo/).
- «Ingredientes» (/trabajo/). Es una palabra rara para decir «tecnologías».

**C. Dónde me perdí**
- En la home leí todo hasta Servicios. Ahí me enganché con los precios y con «Ya giras y quieres sostenerlo».
- Me perdí en «Cada pieza, con su prueba»: kB, CDN y pruebas automáticas, y ninguna cifra que le pueda mostrar a mi gerente general.
- En la página de Praxi dejé de leer en «Solución», con el formato fijo del modelo y los «Ingredientes». Salté al final.

**D. Trabajo y Praxi**
- **Concepto.**
  - En /trabajo/ lo entendí: una marca inventada para mostrar cómo trabajarían, sin clientes ni cifras. Es honesto.
  - En la home no está definido. La pieza Sesenta dice «que no existe», pero la sección no explica qué es un Concepto.
  - La diferencia con un trabajo para cliente es clara solo en /trabajo/.
- **Lo que me hizo ruido:** de diez piezas, los dos «Cliente» son Combeau (fotografía y modelo), o sea un solo cliente real. Eso no se dice.
- **Praxi.**
  - Es una app de gimnasio para consumidores. Mi empresa vende a otras empresas, así que no me dice nada directo.
  - Tampoco sé si «código decide, IA conversa» sirve para cotizar o para cualquier cosa mía. Nadie lo conecta con B2B.
- **Lo que no me creí:**
  - «Estado: Fuera de línea». El caso de éxito es un producto apagado y sin usuarios.
  - Una medición hecha por ellos mismos, con su propia herramienta, sirve poco como prueba.
  - «Si quieres algo así para tu empresa» viene justo después del bloque «Sesenta. El plazo antes que el juicio». Pensé que se refería a un estudio de abogados.

**E. Desarrollo web**
- **Plan.**
  - Creo que me sirve «Página de Campaña», porque «convertir la pauta que ya estás pagando» es mi problema. Pero tengo sitio, así que quizás me sirva más Visibilidad en IA.
  - No tengo claro cuál me recomiendan.
- **Cuánto cuesta.** «Desde $390.000 + IVA» y un valor final que «se cierra cuando conversamos». No puedo ir a la gerencia general con un «desde».
- **Lo que me faltó:**
  - Un ejemplo de precio final.
  - Qué mueve el precio.
  - El porcentaje del anticipo.
  - Si hay un costo mensual de hosting.
  - Un caso B2B con resultados en leads.

**F. Qué haría.** Probaría el chequeo con mi dominio, porque es gratis, sin correo y de 30 segundos. Si el resultado es entendible, pediría el mini-diagnóstico. No escribiría pidiendo cotización todavía, porque no veo un caso parecido al mío ni un precio cerrable.

---

### 2. Dueña de clínica dental (regiones)

**A. Primera pantalla**
- **Versión 1.** Entendí «algo de diseño y computación para gente importante». No sé si hacen páginas web. No entendí lo de SEO ni lo de IA, porque ni se nombran.
- **Versión 2.** Entendí que hacen páginas web y herramientas para empresas.
  - Lo de Google lo capté por la explicación: «que Google pueda leer tu sitio».
  - Lo de ChatGPT también: que me nombren cuando alguien pregunta.
  - «SEO técnico» sola no la entiendo.
  - Me quedé pensando si «empresas» incluye clínicas.
- **Versión 3.** Entendí que hacen mi página web y la dejan lista para Google y ChatGPT. «Tu negocio» me incluye, y «si tu sitio ya existe» soy yo.
  - El «coach de entrenamiento con IA» no me dice nada.
- **Cuál es más clara:** la 3, porque habla de «tu negocio» y de «sitio a medida», que entiendo.
- **Cuál suena bien y no dice nada:** la 1, sin duda.

**B. Lo que no entendí o entendí distinto**
- «Diseñamos experiencias. Programamos inteligencia.» (home, V1). ¿Qué experiencias?
- «Tu dominio» (home, chequeo). No estoy segura de que sea la dirección de mi página.
- «los robots de ChatGPT, Claude y Perplexity» (home). No sé cuáles son los dos últimos.
- «SEO técnico» (home, V2 y V3). Solo la entiendo por la explicación del servicio.
- «Decap CMS», «Netlify Image CDN», «805 kB» (home y /trabajo/).
- «Diseñamos y programamos» (home). ¿Qué es programar un sitio?
- «ficha» y «índice de sus páginas» (home).
- «Visibilidad en IA» (home). Entiendo la idea, pero «se arma con lo que esas herramientas leen de tu sitio y con lo que otros publican de ti» me enreda.
- «Auditoría SEO técnica» (home). No sé la diferencia con la otra auditoría.
- «Paid Media» (home).
- «schema», «indexación», «AEO/GEO», «CRM» (Desarrollo web). Algunas las explican abajo, pero ya las había leído arriba sin entender.
- «pauta» (Desarrollo web, «convertir la pauta que ya estás pagando»). Yo digo «publicidad».
- «Home y hasta 5 páginas» (Desarrollo web). ¿Son 5 en total o 6?
- «dirección de prueba» (Desarrollo web, fase 03).
- «la portada» (Desarrollo web, «el chequeo gratis de la portada»). Yo digo «inicio».
- «anticipo» (Desarrollo web). ¿Cuánto?
- «el control de marca» (Praxi).
- «Cloudflare Pages Functions», «Browser Rendering» (/trabajo/).
- «Analítica tras el aviso de cookies» (/trabajo/).
- «Datos estructurados» (Praxi).

**C. Dónde me perdí**
- En «Cada pieza, con su prueba», con las fichas de números. Ahí cerré mentalmente la página.
- Volví en Servicios, porque ahí había precios y frases como «Tu sitio te frena, o no existe».
- De Praxi leí el título y el video. Cuando empezó el texto con «API» y «Supabase», salí.
- En Desarrollo web leí los planes y los precios, y me perdí un poco en «AEO/GEO». El cuadro «Qué quiere decir» me rescató.

**D. Trabajo y Praxi**
- **Concepto.**
  - Lo entendí en /trabajo/: una marca inventada.
  - Me gustó Ocelo (clínica de ojos), pero es de mentira, así que no es prueba de que lo hayan hecho para una clínica de verdad.
  - Lo que no me quedó claro es cuál es el trabajo real: el fotógrafo, y nada más.
- **Praxi.** No me dice nada sobre mi clínica. Es una app de pesas.
- **Lo que no me creí:** «Datos de ejemplo de la portada de Praxi: no son de una persona.» Y que las personas del video estén generadas con IA me baja la confianza.

**E. Desarrollo web**
- **Plan y precio.** Creo que «Sitio Esencial», $690.000 + IVA, con servicios, equipo y contacto. Pero no sé si $690.000 es el precio o el piso.
- **Lo que me faltó:**
  - Si pueden agendar horas online. «Reservas» aparece solo en «Plataforma a Medida», que «se cotiza».
  - Quién escribe los textos y saca las fotos. Piden «textos e imágenes» antes de empezar y yo no los tengo.
  - Si hay un costo mensual por el sitio.
  - Si mantienen mi dominio actual o compro uno nuevo.
  - WhatsApp. No hay, solo un correo.

**F. Qué haría.** Probaría el chequeo con mi sitio, porque no pide correo y es lo único fácil. Si el resultado trae cosas que no entiendo, le preguntaría a mi conocido. Escribirles me costaría: solo hay un correo y no veo ningún caso de clínica de verdad.

---

### 3. Socio de estudio de abogados (8 personas)

**A. Primera pantalla**
- **Versión 1.** Me suena a marketing de lujo: «líderes con visión», «infraestructura digital». No entendí qué hacen ni qué venden. No hay SEO ni IA, y su ausencia me parece evasiva.
- **Versión 2.** Entendí que son un estudio de diseño y desarrollo que, además, hace SEO técnico y «visibilidad en IA». Lo explican en términos que puedo evaluar: «puedan nombrar», no «vamos a posicionar». Me parece prudente.
- **Versión 3.** Entendí lo mismo, pero con una promesa: «Y los dejamos listos para que Google y ChatGPT entiendan tu negocio». Eso no lo pueden garantizar, y yo lo leo como un compromiso. La bajada es más cautelosa: «revisamos qué le impide a Google y a la IA leerlo, y lo arreglamos».
- **Cuál es más clara:** la 2, porque dice quiénes son y qué hacen sin prometer resultado. La 3 es útil, pero «entiendan tu negocio» me suena a garantía.
- **Cuál suena bien y no dice nada:** la 1.

**B. Lo que no entendí o entendí distinto**
- «Diseñamos experiencias. Programamos inteligencia.» y «líderes con visión» (home, V1). Es retórica sin contenido.
- «que ChatGPT y otros asistentes puedan nombrar a tu empresa» (home, V2). Aun con «puedan», no sé cómo lo van a medir ni a probar.
- «Trabajamos las dos cosas para que tu empresa pueda aparecer.» (home). El «pueda» es una cobertura.
- «21 revisiones» (home). Primero pensé que eran 21 usos.
- «Lo bloqueaba una regla de su proveedor que nadie en el estudio había decidido.» (home).
  - ¿De qué estudio hablan? Si es un cliente, ¿tenían permiso para contarlo?
  - Si no es cliente, ¿cómo lo revisaron?
- «Detrás de SpindleLab está Ramón Vallejos… suma partners para lo que no hace» (home). Una sola persona y subcontratados. ¿Quién responde si algo falla?
- «Verifica y Cumple» (home y /trabajo/). El nombre sugiere certificar cumplimiento legal. ¿Es asesoría legal o un chequeo técnico?
- «Revisa gratis lo que la ley de datos personales le pide a cualquier sitio con formulario» (/trabajo/). ¿Qué ley y qué artículos? ¿Lo revisó un abogado?
- «36 de 100 el 9-sep-2026 y 73 el 21-sep. El 23-sep cambió la forma de puntuar, y desde el 14-oct saca 100 sobre 14 de los 20 puntos de peso.» (/trabajo/).
  - No se entiende. Parece que cambiaron la vara, y eso lo leo con desconfianza.
  - No deja claro si cumplen o no la ley de datos con su propio sitio.
- «el coach recomendó creatina aunque sus instrucciones se lo prohibían» (Praxi). Aplaudo la franqueza. También anoto que su producto, probado con una cuenta de 16 años, falló, y que lo corrigieron con código.
- «Lo medido es el oficio.» (Praxi). Frase de efecto, no contenido.
- «Lo construimos con agentes de IA, y una persona revisa cada fase antes de avanzar.» (Desarrollo web). ¿Quién es esa persona? ¿La misma que lo diseña?
- «30 días de garantía para corregir errores de funcionamiento» (Desarrollo web). ¿Qué es un error de funcionamiento y qué no lo es?
- «El valor final se cierra cuando conversamos tu proyecto.» (Desarrollo web).
- «AEO/GEO» (Desarrollo web). Sin desarrollar.

**C. Dónde me detuve**
- En la sección «Detrás de SpindleLab…», porque una sola persona con agentes de IA y partners es un riesgo.
- En las fichas de Medido, donde me dediqué a ver cómo se sostienen. «Medido: 14 y 16-oct-2026» son fechas muy recientes y la medición la hacen ellos mismos.
- En la fila de spindlelab.cl de /trabajo/, por la puntuación cambiada.
- En «Sesenta» reconocí el plazo de 60 días hábiles. Me pareció ingenioso, pero también me incomoda que inventen un estudio de abogados que no existe.

**D. Trabajo y Praxi**
- **Concepto.**
  - Lo entendí en /trabajo/: «no existe, no tuvo clientes y no lleva cifras». Esa frase es limpia y la valoro.
  - Pero cuatro de diez piezas son inventadas y cuatro son propias. Solo hay un cliente real, con dos piezas.
- **Praxi.**
  - Me dice algo sobre el método (el código decide, la IA conversa), pero no sobre mi estudio.
  - Si pensara en una herramienta para mi estudio, me preocuparía el episodio de la cuenta de 16 años: reglas que se saltó el modelo.
- **Lo que no me creí:**
  - Nada de lo medido es de un cliente. «384 de 384 pruebas» y «8 de 8» son autoevaluaciones.
  - «Sin métrica» es honesto, pero no es evidencia de resultado.
  - Que el producto esté fuera de línea me hace dudar de que alguien lo use.

**E. Desarrollo web**
- **Plan.**
  - Sitio Esencial o Completo. Pero lo mío es más Visibilidad en IA, porque ya tengo sitio.
  - Cuánto costaría: de $690.000 a $1.190.000 + IVA «desde», más lo que cierren en la conversación.
- **Lo que me faltó, y lo leo como contrato:**
  - Quién es dueño del código y del diseño al terminar.
  - Qué pasa si Ramón no está disponible.
  - Hosting y costos recurrentes.
  - Cuántas «rondas de revisión» tiene cada plan.
  - Confidencialidad y responsabilidad por errores.
  - Condiciones de pago del anticipo.
  - Una referencia de cliente real con quien hablar.

**F. Qué haría.** Pasaría mi dominio por el chequeo sin avisar a nadie. La anécdota del estudio con 250 artículos bloqueados se la mandaría a mi empresa de marketing actual para preguntar si nos pasa lo mismo. A ellos no les escribiría todavía: primero querría una referencia verificable y las condiciones por escrito.

---

### Las diez cosas que más confundieron, de mayor a menor gravedad

1. **«Diseñamos experiencias. Programamos inteligencia.»** con «infraestructura digital a medida para líderes con visión» (home, V1). Los tres lectores quedaron sin saber qué venden ni si hacen SEO o IA.
2. **«AEO/GEO»** (Desarrollo web, plan Sitio Completo y «Puesta a punto AEO/GEO»). Las siglas nunca se explican, y justo definen el plan caro.
3. **«El valor final se cierra cuando conversamos tu proyecto.»** (Desarrollo web). Todos los precios son «desde», sin ejemplo cerrado, sin anticipo ni costos recurrentes. Ninguno de los tres puede decidir ni justificar el gasto.
4. **«Dominio, certificado de seguridad (el candado junto a la dirección), medición de visitas y 30 días de garantía después de publicar.»** frente a «Para publicar necesitamos acceso a tu dominio.» (Desarrollo web). ¿El dominio viene incluido o lo pongo yo? Tampoco se menciona el hosting.
5. **«Su sitio sacaba 54 de 100 en el chequeo de esta página»** (home y /trabajo/). Hay dos chequeos distintos (el de 21 señales y Verifica y Cumple), y la frase «esta página» apunta a un chequeo que no está en la página donde aparece.
6. **«36 de 100 el 9-sep-2026 y 73 el 21-sep. El 23-sep cambió la forma de puntuar, y desde el 14-oct saca 100 sobre 14 de los 20 puntos de peso.»** (/trabajo/, spindlelab.cl). No se entiende, y parece que cambiaron la vara para subir el puntaje.
7. **«Hoy praxi.coach está fuera de línea, y por eso esta página no lo enlaza.»** y **«Si quieres algo así para tu empresa, escríbenos…»** (Praxi). El caso estrella es un producto apagado, sin usuarios y de otro rubro. Además, «algo así» aparece después del bloque «Sesenta. El plazo antes que el juicio» y se lee como si se refiriera a eso.
8. **«21 revisiones. Gratis, sin dejar tu correo»** (home). Se lee como «21 personas lo usaron», y recién en /trabajo/ («No guarda los dominios, así que no sabemos cuántas veces se ha usado») se ve que son señales.
9. **«Netlify Image CDN», «Decap CMS», «805 kB», «Cloudflare Browser Rendering», «Lógica de entrenamiento en código»** (home y /trabajo/). Nombres de herramientas, usados como si fueran evidencia, que nadie fuera del rubro técnico entiende.
10. **«Un panel para cambiar textos e imágenes tú mismo, sin pedírselo a nadie.»** frente a **«Blog o CMS que administras tú»**, y **«Listo para que Google y la IA te lean.»** frente a **«SEO técnico base»** (Desarrollo web). El panel y la lectura para IA aparecen incluidos en todos los planes y a la vez como diferencia del plan Completo, así que no sé qué trae el mío.

**Quedaron fuera del diez, pero se notaron:**
- Los dos trabajos «Cliente» son del mismo fotógrafo (/trabajo/).
- Las «herramientas a medida» de la home no tienen servicio ni precio propio.
- La cuenta de 16 años y la creatina en Praxi preocupan al abogado.
- «Concepto» solo se define en /trabajo/ y no en la home.

---

# Informe de la vuelta 2 (íntegro)

<sub>Entrada: `lectura-fria/entrada-vuelta-2.txt` (el texto con las correcciones de la vuelta 1). Conversación nueva: este lector no vio la vuelta 1.</sub>

## Lectura en frío de /v3/, /v3/trabajo/, /v3/trabajo/praxi/ y /v3/servicios/desarrollo-web/

Lo hice solo con el texto que me pasaste, sin abrir nada más.

---

## Lector 1: Gerente comercial, empresa industrial B2B, Santiago

**A. Primera pantalla**

- **Versión 1.** «Diseñamos experiencias. Programamos inteligencia.» Entendí que son una consultora tecnológica, pero no sé de qué. «Infraestructura digital» me suena a servidores o a TI. No entendí que hacen SEO ni visibilidad en IA, porque no aparece.
- **Versión 2.** Hacen sitios y herramientas a medida, y además SEO técnico, o sea que Google lea el sitio. Visibilidad en IA lo entiendo a medias: que ChatGPT mencione a mi empresa. Me suena interesante, pero no sé si hay clientes que lleguen por ahí.
- **Versión 3.** Hacen sitios a medida y, si ya tengo uno, lo revisan para que Google y ChatGPT lo lean. La bajada separa bien los dos casos: sitio nuevo o sitio existente. SEO técnico lo entiendo como «arreglar lo que impide que Google me lea».
- **La más clara:** la 3, porque me dice qué hacen, para quién y qué hago si ya tengo sitio. La 2 es casi igual de clara.
- **La que suena bien y no dice nada:** la 1, sin duda.
- Del chequeo entendí que pego mi URL y me dice si ChatGPT me entiende. No me dice nada de Google, que es lo que yo pago.

**B. Lo que no entendí o entendí distinto**

- «infraestructura digital a medida para líderes con visión» (/v3/): folleto puro.
- «visibilidad en IA» (/v3/): no sé si hay demanda real que llegue por ahí.
- «Si construimos tu sitio, te lo pasamos antes de entregarlo.» (/v3/): ¿qué me pasan, el sitio o el chequeo?
- «Cliente es un encargo pagado: hoy hay uno con caso publicado, con sus dos sitios.» (/v3/trabajo/): ¿un cliente?
- «Decap CMS · Netlify Image CDN» (/v3/trabajo/): nombres de herramientas sin explicar.
- «805 kB» y «95 kB» (/v3/): no me dice qué gano yo.
- «El 16 de octubre pasaron las 384 revisiones.» (/v3/): no sé qué se revisó.
- «Tu sitio te frena, o no existe.» y «Ya giras y quieres sostenerlo.» (/v3/): «giras» no lo había visto así. Suena a traducción.
- «Paid Media (Google)» (/v3/): ¿incluye la inversión en anuncios o solo la gestión?
- «Arquitectura propia» y «Puesta a punto AEO/GEO» (/v3/servicios/desarrollo-web/): jerga.

**C. Dónde me perdí**

Me fui perdiendo en /v3/trabajo/, en la columna «Con qué está hecho». Es una lista de herramientas, y yo quiero saber qué logra el cliente. En Praxi dejé de leer en «Con qué está hecho». Es una lista de nueve ítems de tecnología sin una sola cifra de negocio.

**D. Concepto y Praxi**

- Sí entendí «Concepto»: es una marca inventada para mostrar cómo trabajan. Pero me genera ruido que 4 de 10 piezas sean inventadas y 4 sean suyas. Clientes reales hay uno.
- Tonela, el proveedor de izaje, me llamó la atención porque es mi rubro. Está solo en el índice y sin cifras.
- Praxi me muestra que saben programar algo con IA que calcula. La última línea, «una solicitud o una cotización», sí me hace pensar en un cotizador para mi equipo de ventas. Pero Praxi no vende ni tiene usuarios, está «Fuera de línea», y no puedo llevarle a gerencia general un caso así.
- No me creí que «Sin métrica» sea un caso. Honesto, pero a mí me sirve el resultado, no la honestidad.

**E. Desarrollo web**

Me sirve la Página de Campaña: «Una página hecha para convertir la pauta que ya estás pagando.» Esa frase me habla a mí. Costaría desde $390.000 + IVA, en una semana. Pero «Desde» no me dice cuánto es en la práctica. Me faltó el tope o un ejemplo de precio final. También me faltó cómo mido si la página convierte mejor, qué entrega de reportes hay y quién escribe los textos, porque «La redacción [...] no están en los planes».

**F. Qué haría**

Probaría el chequeo con el sitio de mi empresa, porque es gratis y no pide correo. Si sale mal, escribo para el mini-diagnóstico. No contrato nada antes de eso. No hay casos con resultados de negocio.

---

## Lectora 2: Dueña de clínica dental, ciudad de regiones

**A. Primera pantalla**

- **Versión 1.** No entendí qué hacen. Pensé en una empresa de computación o de inteligencia artificial para empresas grandes. «Líderes con visión» no es para mí. No entendí lo del SEO ni la IA.
- **Versión 2.** Hacen páginas web y herramientas para clínicas como la mía. Me suena a «mi página, pero mejor». Lo de ChatGPT lo entendí a medias: que cuando alguien le pregunte por dentistas, salga mi clínica. No sé si la gente hace eso.
- **Versión 3.** Hacen páginas web, y además arreglan la que ya tengo para que Google y ChatGPT la lean. Dice «clínicas», así que me sentí incluida. Pone «Santiago» y yo estoy en regiones, ¿trabajan allá?
- **La más clara:** la 2 o la 3. Me quedo con la 3 porque separa «no tengo sitio» de «tengo uno y no lo voy a rehacer». Esa segunda parte es la mía, porque mi página la hizo un conocido.
- **La que suena bien y no dice nada:** la 1.

**B. Lo que no entendí o entendí distinto**

- «SEO técnico» (/v3/): ni idea. Me lo explican en Servicios, pero en la primera pantalla no.
- «visibilidad en IA» (/v3/): me suena a magia.
- «Perplexity» y «Gemini» (/v3/): nunca los he usado.
- «un bloque escondido en el código que les dice a Google y a la IA qué es el sitio y quién está detrás» (/v3/): «escondido» me suena sospechoso.
- «Tu sitio te frena, o no existe.» (/v3/): sí me sentí identificada, pero «Ya giras y quieres sostenerlo.» no lo entendí.
- «Acompañamiento mensual» (/v3/): ¿acompañamiento de qué?
- «Código propio, sin WordPress ni constructores de páginas.» (/v3/servicios/desarrollo-web/): no sé qué tengo yo. ¿Mi sitio es WordPress?
- «pauta», «Home», «CMS», «Indexación» (/v3/servicios/desarrollo-web/): la mitad la tuve que mirar en el glosario del final.
- «Decap CMS», «Supabase», «Resend» (/v3/trabajo/ y /v3/trabajo/praxi/): nada.
- «Ley 21.719» (/v3/): no sé qué ley es.

**C. Dónde me perdí**

En /v3/, en la sección «Visibilidad en IA». Es el párrafo largo de cómo responde ChatGPT. Ahí pensé que esto era para empresas con más sofisticación que yo.

En Praxi dejé de leer en «Hipótesis». Es una app de pesas. No tiene que ver con mi clínica.

**D. Concepto y Praxi**

- Entendí que «Concepto» es algo inventado. Me gustó Ocelo, la clínica de ojos, porque es parecida a lo mío. Pero no sé si es lo que me harían a mí o solo un ejemplo.
- El caso de Praxi no me dice nada sobre mi clínica. Lo del 16 de octubre y las 384 pruebas me da lo mismo.
- No me creí que sea un caso útil: es de ellos mismos y «Fuera de línea». Además, que las personas del video estén hechas con IA me baja la confianza.

**E. Desarrollo web**

Me serviría el Sitio Esencial, desde $690.000 + IVA. Pero no sé si necesito agenda online. «Reservas» sale solo en Plataforma a Medida, que «Se cotiza», o sea que puede salir mucho más. Me faltó esto:
- Quién escribe mis textos y saca mis fotos. «No están en los planes», y yo no tengo ni lo uno ni lo otro.
- Cuánto es el anticipo.
- Cuánto cuesta mantenerlo después.
- Si puedo cambiar un horario yo misma. El Esencial no menciona panel, solo el Completo.

**F. Qué haría**

Probaría el chequeo con mi sitio, porque me da curiosidad. Pero no sé si voy a entender el resultado. Escribirles me da un poco de susto: pienso que esto es caro y para gente más técnica.

---

## Lector 3: Socio de estudio de abogados (8 personas)

**A. Primera pantalla**

- **Versión 1.** No me dice nada comprobable. «Experiencias» e «inteligencia» son palabras de agencia. Lo leo como: no sé qué venden.
- **Versión 2.** «Estudio de diseño y tecnología». Después «para empresas, clínicas y estudios»: ¿estudios como el mío? Me confunde que se llamen «estudio» ellos también. Entendí que además hacen SEO y que ChatGPT me nombre, y lo anoto como promesa a examinar.
- **Versión 3.** La más precisa. «puedan leerlos» no promete resultado, solo capacidad técnica. Eso me da más confianza que «nombrar».
- **La más clara:** la 3, por esa cautela en el verbo y porque dice «estudios profesionales».
- **La que suena bien y no dice nada:** la 1.
- Del chequeo: me gusta que dice «No guardamos la dirección que escribes». Pero lo leo como lo que es, una afirmación.

**B. Lo que no entendí o entendí distinto**

- «para empresas, clínicas y estudios» (/v3/, versión 2): ambiguo, porque «estudio» es también lo que ellos dicen que son.
- «SEO técnico» y «visibilidad en IA» (/v3/): ¿en qué se diferencia de lo que ya me hace mi agencia?
- «Nadie puede prometerte que aparezcas; lo que sí se puede es sacar lo que te lo impide.» (/v3/): me gusta la honestidad.
- «una regla del servicio que protege su sitio que nadie en el estudio había decidido» (/v3/): ¿qué servicio? ¿Qué regla? No dice. Además, ¿es mi colega?
- «Su sitio sacaba 54 de 100 en el chequeo gratis de esta página.» (/v3/): se evalúan con su propia vara.
- «hoy saca 100, sobre los 14 de 20 puntos que se pueden ver desde afuera, y ese 100 no se compara con los dos anteriores» (/v3/trabajo/): cambiaron la escala y ahora sacan el máximo. En un contrato eso se objetaría.
- «Ley 21.719» (/v3/): la conozco. «No es asesoría legal ni certifica que cumples» me parece correcto. Pero «Revisa gratis las señales técnicas que la Ley 21.719 [...] le pide a un sitio con formulario» es una lectura de la ley que no firmaría.
- «programa con agentes de IA: escriben código que él revisa y aprueba» (/v3/): ¿responsabilidad, propiedad del código, datos de mis clientes?
- «Cuando un trabajo pide algo que él no hace, lo hace con otros profesionales, y te lo dice.» (/v3/): ¿subcontratación sin contrato claro?
- «Mínimo tres meses.» (/v3/): ¿hay cláusula de salida?

**C. Dónde me detuve**

En la anécdota del estudio de abogados anónimo. Quedé pensando si hablan de un cliente o de un potencial prospecto, y de cómo manejan la confidencialidad. En Praxi me detuve en: «el 22 de agosto, probando con una cuenta de 16 años, el coach recomendó creatina aunque sus instrucciones se lo prohibían». Valoro que lo cuenten, pero lo leo como: el sistema falló, y lo corrigieron después.

**D. Concepto y Praxi**

- Entendí «Concepto» después de leer la bajada de /v3/trabajo/: «no existe, no tuvo clientes y no lleva cifras». En el índice de la home es poco visible. En Desarrollo web, Sesenta aparece junto a casos reales sin esa aclaración, y eso me parece peligroso para un cliente que lee de corrido.
- Praxi me dice que son rigurosos con las decisiones de la IA. Pero «Sin métrica» y «Fuera de línea» significan que la hipótesis nunca se probó. Es un caso de proceso, no de resultado.
- No me creí que «todo es 2026». Una sola cartera de clientes de 2026 y la experiencia previa en agencias, que no puedo verificar. También me incomoda «La portada la aprobó Ramón después de siete rondas de corrección»: ¿cuántas rondas me corresponden a mí?

**E. Desarrollo web**

Para un estudio con blog sería el Sitio Completo, desde $1.190.000 + IVA. Me faltó todo lo contractual:
- Anticipo y forma de pago.
- Propiedad del código y del diseño.
- Hosting y quién lo paga.
- Qué pasa si no me gusta lo entregado.
- Número de rondas: «las rondas de revisión de tu plan» no dice cuántas.

La garantía de 30 días cubre «errores de funcionamiento», no del diseño.

**F. Qué haría**

Correría el chequeo, porque es gratis y no guarda datos. Después le preguntaría a mi agencia actual si esto lo cubre. No escribiría de inmediato. Quiero ver términos escritos antes de hablar con ellos.

---

## Las diez cosas que más confundieron, de más a menos grave

1. **Titular de la versión 1.** «Diseñamos experiencias. Programamos inteligencia.» y «infraestructura digital a medida para líderes con visión» (/v3/). Suena bien, no dice qué venden. Los tres lectores lo descartaron.
2. **Visibilidad en IA sin prueba de que importe.** «Cuando alguien le pregunta a ChatGPT, Gemini o Perplexity por tu rubro, la respuesta sale de lo que esas herramientas leen en internet» (/v3/). No hay cifra ni caso de que esto traiga clientes. Los tres dudaron del valor y dos no conocen las herramientas.
3. **Praxi como caso.** «Estado: Fuera de línea» y «No tenemos un número de usuarios, de uso ni de ventas de Praxi que podamos publicar» (/v3/trabajo/praxi/). No muestra un resultado de negocio y ninguno lo vio aplicable a su empresa.
4. **Cuántos clientes hay y qué es cada cosa.** «Cliente es un encargo pagado: hoy hay uno con caso publicado, con sus dos sitios.» (/v3/trabajo/). Sesenta aparece sin aclarar que es inventado en Desarrollo web (/v3/servicios/desarrollo-web/).
5. **Servicios que se pisan.** «Auditoría SEO técnica», «Visibilidad en IA» y «Acompañamiento mensual», más el chequeo y el mini-diagnóstico (/v3/). No sé cuál me sirve. Además hay tres «chequeos» distintos, incluido «Verifica y Cumple».
6. **Nombres de herramientas y jerga técnica sin explicar.** «Decap CMS · Netlify Image CDN» y «Cloudflare Pages Functions · Prueba con robots de IA» (/v3/trabajo/). También «una regla del servicio que protege su sitio que nadie en el estudio había decidido» (/v3/). Y «Supabase», «Resend», «Datos estructurados» (/v3/trabajo/praxi/).
7. **Cifras que no dicen qué gano.** «una foto que él sube con 805 kB, quien la mira la recibe en 95 kB» y «El 16 de octubre pasaron las 384 revisiones.» (/v3/). Y la escala que cambió: «hoy saca 100, sobre los 14 de 20 puntos que se pueden ver desde afuera, y ese 100 no se compara con los dos anteriores» (/v3/trabajo/).
8. **Jerga con explicación tardía o poco clara.** «un bloque escondido en el código que les dice a Google y a la IA qué es el sitio y quién está detrás» (/v3/). También «SEO técnico y puesta a punto AEO/GEO» y su definición «optimizar para los motores que responden preguntas (AEO) y para la IA que escribe respuestas (GEO)» (/v3/servicios/desarrollo-web/). «Escondido» suena sospechoso y AEO/GEO no se distinguen.
9. **Precio y condiciones sin cerrar.** «El valor final se cierra cuando conversamos tu proyecto» y «La redacción, el diseño gráfico y la producción de fotos o video no están en los planes.» (/v3/servicios/desarrollo-web/). Faltan anticipo, hosting, propiedad del código y número de rondas, y «reservas» solo aparece en el plan que se cotiza.
10. **Etiquetas que suenan a traducción o son ambiguas.** «Ya giras y quieres sostenerlo.», «Tu sitio te frena, o no existe.» y «Si construimos tu sitio, te lo pasamos antes de entregarlo.» (/v3/). También «Santiago» en la etiqueta de la versión 3 (/v3/), que deja la duda de si trabajan en regiones.
