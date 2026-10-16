# E11 · Diagnóstico del texto vigente: home, Acompañamiento mensual y Trabajo

16-oct-2026 · lector frío y editor, en contexto limpio · base `b971a82` (el código del sitio es
el de `f0d911c`, 14-oct, con el pase de voz E8 aplicado) · **no reescribe nada**: dice dónde se
pierde el lector y por qué, para que quien escriba la versión nueva parta de ahí.

**Lo que pidió Ramón** (16-oct, 13:14): “creo que el enfoque de los textos no me está gustando
mucho. siento que se está dando por sabido al cliente. me gustaría un mejor texto. estratégico
para venta pero también con una buena pluma. la idea gancho hay que explicarlo mejor si lo
queremos hacer durar (lo de "ahí se corta el circuito") no tiene contexto”.

**La vara.** La del manual de marca §01, que es justo lo que el comentario de Ramón dice que no
se cumple: “confío en él, y además se entiende lo que dice”. Y la del brief de obra §4 para la home: el
primer viewport dice “qué se construye, para quién”.

**Cómo se leyó.**

- El texto sale de `spindlelab-astro/dist/v3/` (construido el 16-oct a las 11:50), con
  `e8/herramientas/extraer.mjs` a 1440 × 900 sobre las tres rutas, y sobre las 21 como contexto.
  Se lee también lo oculto (pestañas cerradas, menú), y aquí se marca como tal.
- Las posiciones se midieron con Chromium a 1440 × 900 y a 390 × 844. La pantalla es el alto de
  la ventana: 2,0 quiere decir dos pantallas de scroll desde arriba. Donde va un solo número, es
  a 1440.
- **Las citas del sitio van entre «» y están literales en la extracción.** Las de otras fuentes
  van entre “ ” y llevan su archivo. Ningún prospecto va con nombre ni dominio.
- No se leyó el resultado del chequeo (necesita la función del servidor): se cita por su archivo,
  `public/assets/js/v3-chequeo.js`.
- Los tres lectores son una lectura simulada, no un test con personas. Sirven para ordenar
  dónde se pierde alguien que no sabe de SEO, no para medir cuántos se pierden.

---

## Lo que ve el visitante de la home, en orden

| Pantalla (1440 · 390) | Lo que se lee |
|---|---|
| 0,12 · 0,11 | «Chequeo de visibilidad en IA», un campo «Tu dominio» y el botón «Ver cómo lo lee» |
| 0,24 · 0,30 | «21 señales, con la metodología publicada. Es el mismo chequeo con el que partimos cada proyecto.» |
| 0,31 · 0,49 | «Estás pagando para que lleguen a tu sitio.» |
| 0,38 · 0,53 | «Ahí se corta el circuito», el titular, a 120 px de alto en escritorio |
| 0,66 · 0,65 | Cuatro sitios en maqueta: «Combeau, fotografía · Cliente», «Combeau, modelo · Cliente», «Verifica y Cumple · Producto propio» y «Pieza de concepto · no es un cliente» (Raigal) |
| 1,20 · 1,13 | «Tu sitio está escrito para personas. Pero cada vez más, el primero en llegar no es una persona: es la máquina que responde cuando alguien pregunta por tu rubro. Si esa máquina no puede leerte, entenderte ni citarte, la consulta que pagaste termina en otra parte.» y el botón «Ver el método» |
| 1,76 a 5,11 | Los cuatro campos, «Desarrollo», «Visibilidad», «Continuidad» y «Alcance», cada uno con una línea, sus precios y dos botones |
| 6,35 | «No te prometo. Te muestro.» |
| 6,91 | Cuatro artículos del blog |
| 7,59 | El pie: «Hablemos de tu sitio.» y «Escríbenos» |

La home mide 8,3 pantallas a 1440 y 8,7 a 390, con 387 palabras visibles fuera del menú y el pie.

---

## A · Tres lectores, uno a la vez

### Lector 1 · Gerente comercial de una empresa industrial B2B de 40 personas, en Santiago, que paga Google Ads

**Qué entendió que hace SpindleLab.** Que hacen sitios (lo dicen las cuatro maquetas y «Tu sitio
te frena, o no existe.») y algo relacionado con ChatGPT, que recién ve nombrado a las 3
pantallas. La línea de arriba del titular le habla a él: paga Google Ads, así que «Estás pagando
para que lleguen a tu sitio.» es cierta en su caso y lo hace seguir leyendo.

**Qué no entendió.**

- «Ahí se corta el circuito». Lee *ahí* como *en tu sitio* y espera que le expliquen por qué la
  gente por la que paga no le deja sus datos. Ese es el problema que de verdad tiene: cuánto le
  cuesta cada contacto.
- «el primero en llegar no es una persona: es la máquina que responde cuando alguien pregunta
  por tu rubro». A su sitio llegan personas, las que hacen clic en su anuncio. No ve cómo un
  aviso de Google termina en una máquina.
- «la consulta que pagaste termina en otra parte». Él pagó un clic, y el clic llegó. La frase
  junta dos caminos distintos, el anuncio que lleva a su sitio y la pregunta que alguien le hace
  a ChatGPT, sin decir dónde se tocan.
- «Para que ChatGPT, Gemini y Perplexity puedan citarte cuando preguntan por tu rubro.» Entiende
  *aparecer en ChatGPT*, pero no quién pregunta ni por qué le importaría a una empresa que le vende
  a otras empresas.
- «Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA.» No sabe
  qué se implementa.

**Dónde se perdió.** Entre el titular y el párrafo de la segunda pantalla. El titular le prometió
hablar de su plata en pauta y el párrafo le habla de una máquina. Lo que él compra, la pauta en
Google, está en la última sección como segunda pestaña, «Paid Media (Google)», a 4,9 pantallas,
con su texto escondido hasta que hace clic.

**Qué haría al final de la home, y por qué.** Abre «Paid Media (Google)» o se va. No escribe:
«Hablemos de tu sitio.» no le dice qué recibe, en cuánto tiempo ni si cuesta algo, y no sabe que
existe un mini-diagnóstico gratis en 24 horas, porque en el cuerpo de la home solo aparece como
título de un artículo. Tampoco pone su dominio en el campo de arriba: la home no dice que el
chequeo es gratis ni que no pide correo (lo dice la página del chequeo: «Gratis y sin dejar tu
correo.»). Y «Detrás de SpindleLab está una persona, no una agencia de veinte.» le puede sonar a
riesgo, quién responde si esa persona no está, y la home no lo contesta.

### Lector 2 · Dueña de una clínica dental en una ciudad de regiones

**Qué entendió que hace SpindleLab.** Que hacen sitios, con precios a la vista, y que hay algo
para redes sociales. Se detiene en Raigal porque es la única pieza de su rubro, y ve que está
rotulada «Pieza de concepto · no es un cliente».

**Qué no entendió.**

- «Chequeo de visibilidad en IA» y «Ver cómo lo lee». No sabe quién lee ni qué es la
  visibilidad en IA, y es lo primero que le piden.
- «Estás pagando para que lleguen a tu sitio.» Si paga algo, son promociones en Instagram que
  llevan a su perfil o a WhatsApp, no al sitio. La frase no es su caso.
- «leerte, entenderte ni citarte» y «puedan citarte». En una clínica, citar a alguien es darle
  hora. «Para que ChatGPT, Gemini y Perplexity puedan citarte» admite esa lectura y el texto no
  la descarta.
- «Orgánico y pauta social en LinkedIn y Meta.» No reconoce Instagram dentro de «Meta»,
  «orgánico» no le dice nada y LinkedIn no es su canal.
- «Rastreo, indexación, Core Web Vitals y datos estructurados.», si abre la pestaña de la
  auditoría.

**Dónde se perdió.** En la primera pantalla. Antes de una sola frase sobre su negocio le piden su
dominio, y la frase que sigue habla de una pauta que no lleva a su sitio. Lo que la habría retenido es la
escena de su rubro, un paciente que le pregunta a ChatGPT dónde ponerse un implante en su ciudad.
Esa escena está escrita en la estrategia (“Probé preguntarle a ChatGPT por [tratamiento] en
[comuna]. Tu clínica no aparece.”, `marketing/estrategia-marketing-spindlelab.md` §4) y no en la
home.

**Qué haría al final de la home, y por qué.** Si su sitio es viejo, entra a «Ver Desarrollo web»,
porque «Tu sitio te frena, o no existe.» la nombra y el precio está a la vista. Si no, se va. No
sabe si trabajan con clínicas fuera de Santiago: lo único que dice la home sobre dónde están es
«Santiago, Chile · SpindleLab SpA», en el pie.

### Lector 3 · Socio de un estudio de abogados de 8 personas

**Qué entendió que hace SpindleLab.** Que es una persona, con precios publicados, y que hay un
servicio para quien ya tiene sitio y no lo va a rehacer, que es su caso. Lo encuentra a 3
pantallas, en «Tu sitio existe y no lo vas a rehacer.».

**Qué no entendió.**

- «Estás pagando para que lleguen a tu sitio.» No paga pauta: sus clientes llegan por referidos.
  La segunda frase que lee le dice que esto no es para él.
- «Ahí se corta el circuito». Una metáfora sin hechos al lado. Un abogado la lee como eslogan.
- «la consulta que pagaste termina en otra parte». En su oficio, una consulta es la reunión con
  un cliente. La frase se lee como *la reunión que pagaste*, que no tiene sentido.
- «puedan citarte». Para él, citar es citar una fuente o citar a alguien a declarar.
- «Detrás de SpindleLab está una persona, no una agencia de veinte. Al terminar cada proyecto,
  volvemos a correr el chequeo de arriba sobre tu dominio.» Una persona y «volvemos» en el mismo
  párrafo. Alguien que lee contratos lo nota.
- «Cómo elegir (y verificar) una agencia de AEO/GEO en Chile». La home no explica AEO ni GEO en
  ninguna otra parte.

**Dónde se perdió.** En la segunda línea. Si sigue, es por «No te prometo. Te muestro.», que es el
tono que le da confianza, y está a 6,4 pantallas.

**Qué haría al final de la home, y por qué.** Va a «Conocer a Ramón» o al artículo sobre cómo
elegir una agencia, porque su pregunta es en quién confiar. No pone su dominio: la home no dice
qué hace el chequeo con él (la página del chequeo sí: «Leemos solo páginas públicas, las mismas
que lee cualquier buscador.»). Y la objeción real de su rubro queda sin respuesta: un estudio
de abogados contestó al outbound que ya trabajaba “en esto con una empresa de marketing digital”
(`ventas/pipeline-reconstruido-2026-09-22.md`). La home no dice en qué se distingue esto del
marketing digital que el estudio ya contrata.

---

## B · Dónde el texto da algo por sabido

### B.1 · El gancho: «Estás pagando para que lleguen a tu sitio.» / «Ahí se corta el circuito»

**Qué circuito.** El de la campaña de septiembre, que Ramón cerró el 1-sep (manual §06b) y que el
reporte de dirección creativa dejó escrito así: “El dueño ya está pagando Meta y ya está pagando
Google. Los dos empujan al mismo lugar: su landing, que le costó dinero y está escrita para que
la lea una persona, no la máquina que hoy responde por su rubro.” El recorrido: “te preguntan →
el motor busca → ✂ → tu landing → convierte”
(`marketing/encargos-otras-sesiones/direccion-creativa-campana-sep-REPORTE.md` §1). En Instagram
el gancho iba con sus estaciones y con la foto del dominó (corpus de voz §2):

> “Estás pagando para que lleguen. Meta empuja. Google empuja. Los dos llevan al mismo lugar: tu
> sitio. / Y ahí se corta el circuito.”

**Qué quedó en la home.** El principio y el final. Se perdieron cuatro cosas en el camino:

1. Quién empuja: “Meta empuja. Google empuja.” no está en ninguna página.
2. El nombre de la máquina. La campaña decía “la máquina que responde cuando alguien pregunta por
   tu rubro en ChatGPT o en Google”; la home dice «la máquina que responde cuando alguien pregunta
   por tu rubro», sin decir cuál.
3. La frase que cerraba la idea: “No es un problema de presupuesto. Es el último tramo del
   circuito, justo donde se cobra.”
4. La imagen. Bajo el titular no hay un dominó sino cuatro sitios en maqueta, que llevan a leer
   *ahí se corta* como *tu sitio está mal hecho*.

**Dónde se explica y a cuántas pantallas.** En un solo párrafo, el que empieza con «Tu sitio está
escrito para personas.», a 1,20 pantallas a 1440 y a 1,13 a 390. Está 740 px bajo el titular a
1440 (0,8 pantallas) y 506 px a 390 (0,6), después de la fila de cuatro sitios. En ninguno de los
dos anchos cabe en la primera pantalla junto al titular. Y ese párrafo no dice «circuito», no
nombra las estaciones y explica otra cosa: que la IA no puede leer tu sitio. No une la plata de
la pauta con la respuesta de ChatGPT, que es justo lo que el titular promete.

**Dónde están las demás piezas del circuito.** Google y Meta como pauta aparecen recién en el campo
Alcance, a 4,9 pantallas: «Paid Media (Google)», segunda pestaña, con su texto oculto hasta el
clic, y «Orgánico y pauta social en LinkedIn y Meta.». Las dos fotos del dominó están en los campos
Continuidad y Alcance (4,2 y 5,2 pantallas), sin una palabra que las relacione con el titular. La
palabra «circuito» se ve una vez en las 21 rutas: en el titular.

**El gancho también viaja solo.** «SpindleLab. Estás pagando para que lleguen a tu sitio. Ahí se
corta el circuito.» es el texto de la imagen que se ve al compartir 19 de las 21 rutas, Acompañamiento
incluida. Quien recibe un enlace por WhatsApp ve la frase sin nada de su explicación.

**Dos lecturas que la página no resuelve.** La campaña dice que el argumento es “por qué tu sitio
no convierte” (manual §06b). El párrafo de la home dice que «la máquina» no puede leerte. El lector
que paga pauta lee lo primero y encuentra lo segundo.

**Para quién la premisa es falsa.** Para quien no paga pauta, como el lector 3, y para quien paga
pero no hacia su sitio, como el lector 2. A ellos la primera frase les dice que esto no es para
ellos. El repo no tiene un dato de cuántos prospectos pagan pauta. Conviene tenerlo antes de
reescribir: si la mayoría no paga, el gancho deja fuera a la mayoría.

Leído en frío, el circuito no tiene estaciones, *ahí* no tiene lugar y el párrafo que viene
después habla de otra cosa. Se entiende si ya viste la campaña de septiembre.

### B.2 · La tabla

La pantalla es la posición a 1440. Oculto quiere decir que solo se ve al abrir una pestaña.

| # | Página · pantalla | Cita exacta | Lo que supone que el lector ya sabe | Lo que le falta para entenderlo |
|---|---|---|---|---|
| 1 | Home · 0,12 | «Chequeo de visibilidad en IA» · «Ver cómo lo lee» | Qué es la visibilidad en IA y quién «lo lee» | Quién lee (la IA: los robots de ChatGPT y de otros motores), qué mira y qué devuelve. Que es gratis, en segundos y sin correo: la home no lo dice, lo dice la página del chequeo |
| 2 | Home · 0,24 | «21 señales, con la metodología publicada. Es el mismo chequeo con el que partimos cada proyecto.» | Qué es una señal, dónde está publicada la metodología, de qué proyecto se habla | Un ejemplo de señal en palabras de dueño y el enlace a la metodología (R6 ya propone ese enlace sin cambiar palabras) |
| 3 | Home · 0,31 | «Estás pagando para que lleguen a tu sitio.» | Que el lector paga por tráfico, y a quién | A quién se le paga (Google, Meta) y quiénes «llegan». Para quien no paga pauta, la frase no es su caso |
| 4 | Home · 0,38 | «Ahí se corta el circuito» | El circuito de la campaña de septiembre | Ver B.1 |
| 5 | Home · 0,66 | «Combeau, fotografía · Cliente» … «Pieza de concepto · no es un cliente» | Quién es Combeau y qué tienen que ver cuatro sitios con un circuito que se corta | Qué muestran esos sitios respecto del titular. La fila no tiene texto propio ni enlace a Trabajo (R6 propone el enlace) |
| 6 | Home · 1,20 | «el primero en llegar no es una persona: es la máquina que responde cuando alguien pregunta por tu rubro» | Qué máquina, y que una IA «llega» a tu sitio | El nombre de la máquina y el mecanismo: cuando alguien le pregunta a ChatGPT, la IA lee sitios para armar su respuesta, y el tuyo es uno de ellos o no |
| 7 | Home · 1,20 | «Si esa máquina no puede leerte, entenderte ni citarte, la consulta que pagaste termina en otra parte.» | Los tres bloques del chequeo (leer, entender, citar) como si fueran verbos con sentido propio, y qué es «la consulta» | Qué es cada verbo para un sitio. *Citar* y *consulta* se leen distinto en una clínica (dar hora, la atención) y en un estudio (citar a declarar, la reunión). Y cómo la plata de la pauta termina en una respuesta de IA |
| 8 | Home · 1,76 a 4,76 | «Desarrollo» · «Visibilidad» · «Continuidad» · «Alcance» | Que son cuatro momentos de un negocio, en orden | Son las palabras más grandes de la página después del titular, y son nombres internos. La línea que va debajo sí habla en la situación del lector (ver C) |
| 9 | Home · 1,96 | «El sitio nace legible para las máquinas que hoy recomiendan tu negocio. Lo compruebas con el mismo chequeo, sobre tu dominio, antes y después.» | Que hay máquinas que recomiendan negocios, y cuál es «el mismo chequeo» | Quién recomienda a quién. «El mismo chequeo» remite a un campo que quedó 1,8 pantallas más arriba |
| 10 | Home · 2,96 | «Para que ChatGPT, Gemini y Perplexity puedan citarte cuando preguntan por tu rubro.» | Quién pregunta | Tal como está escrita, el sujeto de «preguntan» son los tres motores; quien pregunta es el cliente del lector. Es la primera vez que la home nombra ChatGPT, y Gemini y Perplexity pueden no sonarle |
| 11 | Home · 2,96 (oculto) | «Rastreo, indexación, Core Web Vitals y datos estructurados.» | El vocabulario del oficio | Qué le pasa al negocio con cada uno. La frase siguiente, «Qué te frena y qué arreglar primero.», sí lo dice |
| 12 | Home · 3,96 | «Ya giras y quieres sostenerlo. Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA.» | Qué se sostiene, qué se implementa, qué es SEO técnico | La home no explica «SEO técnico» en ninguna parte (la cadencia de esta frase es R2) |
| 13 | Home · 4,96 | «Orgánico y pauta social en LinkedIn y Meta.» | Que «orgánico» es publicar sin pagar y que Meta es Instagram y Facebook | Los nombres que usa el dueño: Instagram, Facebook, publicaciones |
| 14 | Home · 4,91 | «Paid Media (Google)» | El inglés de agencia para lo que el lector llama Google Ads | Es lo que paga el lector 1, y está al final, como segunda pestaña (el nombre se decidió en §7:203: se anota, no se propone) |
| 15 | Home · 6,42 | «Al terminar cada proyecto, volvemos a correr el chequeo de arriba sobre tu dominio.» | Que el lector recuerda el campo del principio | «el chequeo de arriba» quedó 6,3 pantallas más arriba. Y «volvemos» viene justo después de «una persona» (singular o plural es R4) |
| 16 | Home · 6,98 a 7,25 | «Cómo elegir (y verificar) una agencia de AEO/GEO en Chile» · «¿Qué es un mini-diagnóstico SEO y qué incluye?» | Qué es AEO/GEO, y que existe un mini-diagnóstico | La home nunca dice AEO ni GEO fuera de ese título, y nunca ofrece el mini-diagnóstico: este título es su única mención en el cuerpo |
| 17 | Home · 7,59 | «Hablemos de tu sitio.» · «Escríbenos» | Qué pasa al escribir | Qué se recibe, en cuánto tiempo y si cuesta. La oferta de entrada (una página, gratis, en 24 horas) no está en la home. El resultado del chequeo la ofrece, pero solo a quien lo corrió (`v3-chequeo.js`) |
| 18 | Acompañamiento · 0,47 | «Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA, desde $590.000/mes + IVA; las dos juntas, desde $790.000/mes + IVA. Mínimo 3 meses.» | Qué son el SEO técnico y la visibilidad en IA, y que son dos cosas que se compran por separado | Para quién es y qué problema resuelve. La página no tiene una frase sobre la situación del cliente; la home la resumía en «Ya giras y quieres sostenerlo.» y aquí no está ni eso |
| 19 | Acompañamiento · 1,34 | «Una auditoría te dice qué hacer; este servicio lo hace y lo sostiene.» | Qué es una auditoría, y si hay que tener una antes de contratar esto | Qué pasa si no la tiene. La FAQ de precio responde a medias, a 6,2 pantallas: se define «después del mini-diagnóstico gratuito» |
| 20 | Acompañamiento · 1,77 | «Trabajamos la lista de mejoras técnicas por impacto: indexación, velocidad, datos estructurados, enlazado interno.» | Que existe «la lista» | De dónde sale esa lista (de la auditoría o del mini-diagnóstico) |
| 21 | Acompañamiento · 1,93 y 2,09 | «para que los modelos puedan citarlos: estructura de respuesta, datos verificables y schema correcto» · «Posiciones clásicas y presencia en respuestas de IA, medidas quincenalmente con nuestro protocolo público.» | «modelos», «schema», «posiciones clásicas», «protocolo» | Qué ve el cliente de todo eso. El informe lo dice bien («Qué se hizo, qué se movió y qué sigue.»), pero llega después (el monitoreo es R2) |
| 22 | Acompañamiento · 3,58 a 3,92 | «Elige la cobertura» · «Sostener y mejorar una capa: SEO técnico o visibilidad en IA.» · «~10 consultas medidas al mes en IA» · «Hasta 8 keywords o páginas prioritarias» · «~20 consultas medidas al mes (+ AI Overviews)» · «Share-of-voice frente a tus competidores» | Cobertura de qué, «capa», «consultas medidas», «keywords», «AI Overviews», «share-of-voice» | Qué es una consulta medida (una pregunta que se le hace a ChatGPT sobre tu rubro: se entiende en Visibilidad en IA, no aquí) y los términos en inglés sin traducción (las consultas medidas y el share-of-voice son R2) |
| 23 | Acompañamiento · 4,20 | «tu sitio saque en el chequeo gratis más puntos que el día en que partimos, contando las mismas señales» · «acceso a donde se configura qué robots entran, como Cloudflare u otro CDN» | El chequeo y su puntaje, qué es un robot, qué es un CDN | La página no explica el chequeo, así que el compromiso se mide en una escala que el lector no conoce, y no dice qué significan más puntos para su negocio (el compromiso lo decidió Ramón el 14-oct: se anota la comprensión, no el contenido) |
| 24 | Acompañamiento · 5,44 | «rastreo, reindexación y actualización de los modelos» | Jerga, en la respuesta que tenía que tranquilizar | La razón de fondo sí está (antes de tres meses no hay señal); falta en palabras del cliente |
| 25 | Acompañamiento · 6,50 | «Una auditoría no se ejecuta sola» · «Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito.» | Qué es el mini-diagnóstico y qué tiene que ver con la auditoría del titular | El mini-diagnóstico aparece por primera vez a 6,2 pantallas, en la FAQ, y la página nunca dice qué es |
| 26 | Trabajo · 0,53 | «Cuatro piezas: tres sitios en producción y un ejercicio de concepto. Está dicho cuál es cuál en cada una.» | «en producción» (jerga de desarrollo: publicado) | *Publicados*, en palabras del lector. La segunda frase contesta una sospecha que el lector todavía no tuvo |
| 27 | Trabajo · 2,65 | «Chequeo gratuito de las señales técnicas que pide la Ley 21.719.» | Qué es la Ley 21.719 y a quién se aplica | Que es la ley de datos personales y que alcanza a cualquier sitio con un formulario de contacto. Lo decía el post publicado del 22-sep (corpus de voz §3); el sitio no |
| 28 | Trabajo · 2,73 | «spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026» · «Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los rastreadores, hoy no suma ni resta.» | Que este chequeo no es el de la home | Son dos instrumentos, los dos gratis y los dos sobre 100, y la misma página cierra con «el chequeo gratis te muestra en segundos qué ve la IA en tu sitio». El lector los junta. La última frase es una nota de ingeniería, el mismo tipo de explicación que Ramón sacó del post del 22-sep (corpus §3, borrador 2); la QA ya marcó el «como si … frena» |
| 29 | Trabajo · 1,61 a 3,69 | «Sitio y panel de administración para un fotógrafo de retrato.» y las otras tres fichas | Que el lector une estos sitios con la promesa de la home | Ninguna ficha muestra lo que Desarrollo web promete de cada sitio: «Te dejamos el puntaje por escrito y, si tenías otro sitio, también el de antes.» No hay un puntaje de ningún sitio de cliente |
| 30 | Trabajo · 4,07 a 4,39 | «Antes de construir el tuyo» · «Pedir el diagnóstico» | Que el lector viene a construir, y qué es «el diagnóstico» | El botón ofrece algo que la página no presentó |

---

## C · Lo que funciona y conviene conservar

### C.1 · En el sitio

1. **La situación del lector como primera frase de cada oferta.** «Tu sitio te frena, o no
   existe.» · «Tu sitio existe y no lo vas a rehacer.» · «Ya tienes demanda y quieres más.» Es lo
   que mejor funciona en la home, y es lo que hace Ramón en sus posts: abrir en la situación de
   quien lee. Los lectores 2 y 3 se encuentran por estas líneas, no por los títulos grandes.
2. **«Estás pagando para que lleguen a tu sitio.»** Un hecho, en la plata del lector. Para quien
   paga pauta es la línea más efectiva de la página. Lo que falla es lo que viene después, no esta
   frase.
3. **Los precios bajo cada campo.** «Desde $390.000 · $690.000 · $1.190.000 + IVA» · «Desde
   $400.000 + IVA». Datos concretos justo donde el lector espera vaguedad.
4. **«Detrás de SpindleLab está una persona, no una agencia de veinte.»** Honesta, corta, y
   contesta quién está detrás antes de que alguien lo pregunte.
5. **«No te prometo. Te muestro.»** La marca en cuatro palabras. Lo que R4 tiene abierto es el
   singular o el plural, no la frase.
6. **«Una auditoría te dice qué hacer; este servicio lo hace y lo sostiene.»** La mejor frase de
   Acompañamiento: la diferencia entre dos servicios en una línea. Solo le falta que el lector
   sepa qué es una auditoría.
7. **«Qué se hizo, qué se movió y qué sigue. Una página, sin jerga, lista para reenviar a
   gerencia.»** Le habla exactamente al lector 1, que le rinde cuentas a una gerencia. (El título
   que la lleva tiene la cadencia de R2; la frase no.)
8. **«Necesitamos a alguien de tu equipo que apruebe los cambios»** y **«Sí, nos integramos con
   quien ejecute hoy: damos las especificaciones, revisamos lo implementado y coordinamos
   prioridades.»** Dicen qué pone el cliente y contestan una objeción real (la del estudio que ya
   trabajaba con una agencia de marketing digital).
9. **«Cumplido el mínimo de tres meses, el servicio es mes a mes y puedes pausar o salir avisando
   con 30 días.»** Una condición clara. El problema es que la página la repite (ver D).
10. **«Sitio y panel de administración para un fotógrafo de retrato. Él carga las series y el
    sitio se arma solo.»** El beneficio del cliente en sus palabras, y la respuesta a lo primero
    que pregunta quien compra un sitio sin saber de sitios: qué puedo cambiar yo. Es la línea más
    vendedora de Trabajo.
11. **«El mismo cliente, el otro oficio.»** Pluma, en cinco palabras.
12. **«El primer sitio que revisó fue el nuestro. spindlelab.cl sacó 36 de 100 el 9 de
    septiembre de 2026 y, con lo que encontró ya arreglado, 73 el 21 de septiembre.»** El mejor
    gesto de la marca, apuntarse el instrumento a uno mismo (corpus §4), con fechas.
13. **«Raigal no existe. Es un ejercicio para mostrar cómo trabajamos en este rubro, no un
    cliente.»** Una honestidad que el resto de la página necesita para que le crean.
14. **Las dos frases más claras sobre qué hace SpindleLab no están a la vista en la home.**
    «Trabajamos para que tu empresa aparezca cuando tus clientes preguntan, en Google y en los
    motores de IA.» vive en el menú cerrado de las 21 rutas. «Trabajamos para que aparezcas cuando
    tus clientes le preguntan a ChatGPT, Gemini o Perplexity por tu rubro.» abre Visibilidad en
    IA. Las dos están cerca del posicionamiento del manual §01, y ninguna está en el cuerpo de la
    home.
15. **«El chequeo de esta página lee tu sitio; el mini-diagnóstico le pregunta a los motores. Los
    dos son gratis.»** La distinción más clara entre las dos ofertas gratis. Está en la página del
    chequeo, no en la home.

### C.2 · Fuera del sitio, ya escrito por la casa

No es texto del sitio. Se lista porque muestra que el contexto que falta ya existe, en la voz de
Ramón o en trabajo entregado:

- **El circuito con sus estaciones**, en el post de Instagram del 1-sep (corpus §2): “Meta empuja.
  Google empuja. Los dos llevan al mismo lugar: tu sitio.” y “No es un problema de presupuesto. Es
  el último tramo del circuito, justo donde se cobra.”
- **La misma idea dicha como fila de dominó** (corpus §6, página de empresa): “Tu web, tus redes y
  tu pauta son fichas de la misma fila: si una está torcida, la energía no llega a la venta, da lo
  mismo cuánto inviertas en las demás.”
- **La escena**, en un mini-diagnóstico entregado a un estudio de abogados de Santiago en agosto
  (`marketing/diagnosticos/`): “Un cliente nuevo llega hoy de dos maneras: busca en Google, o le
  pregunta directo a ChatGPT (“¿qué estudio me recomiendas para un tema laboral en Santiago?”).
  Quien aparece en esa respuesta se lleva la consulta; el resto no se entera de que existió.”
- **Un hallazgo que se entiende sin saber de SEO**, en un mini-diagnóstico a una clínica dental
  (julio): el archivo que les dice a Google y a los robots de IA por dónde pasar les prohibía
  entrar a la página de especialidades, la misma que el menú de la clínica enlaza. Y en el de los
  abogados, la entrada cerrada a los robots de ChatGPT, Claude y Gemini, puesta “posiblemente por
  defecto” por su proveedor.
- **La promesa central de la estrategia** (§4): “Tus futuros clientes ya le preguntan a ChatGPT.
  Yo me encargo de que la respuesta seas tú.”

---

## D · Resumen en cinco líneas

1. **Se habla desde adentro.** El texto usa el vocabulario del método y de la campaña (el circuito, leer, entender y citar, capa, señales, «el chequeo de arriba», los cuatro campos) como si el visitante ya lo conociera, y lo que lo explica vive en subpáginas, en el blog o en el menú cerrado.
2. **El gancho perdió sus estaciones al pasar de Instagram a la home.** Quedaron el principio y el final del circuito, y el párrafo que lo sigue explica otra cosa (que la IA no te puede leer) sin unir la plata de la pauta con la respuesta de ChatGPT.
3. **No hay escena.** En ninguna de las tres páginas alguien le pregunta algo a ChatGPT y le pasa algo a un negocio, así que «la máquina», «citarte» y «consulta» quedan en el aire o se leen con el sentido del oficio de cada lector (dar hora, citar a declarar, la reunión).
4. **Es preciso donde es fácil y vago donde vende.** Precios, mínimos y avisos están dichos y repetidos (en Acompañamiento, 7 bloques de texto nombran los 3 meses), mientras el problema que se resuelve, el resultado para el negocio y el paso siguiente (el mini-diagnóstico gratis en 24 horas) faltan o llegan al final.
5. **Ninguna revisión midió la comprensión.** El pase de voz E8 revisó palabras (rayas, glosario, cadencia) con el hero, el párrafo que lo explica y la línea del campo Desarrollo cerrados, que son justo las zonas que más dan por sabido.

---

## Lo que este diagnóstico no decide

Quien reescriba se va a encontrar con esto, y no lo resuelve una reescritura:

- **El hero.** Lo decidió Ramón el 10-oct (`e8/hoja-de-voz.md` §4, fila 1, y spec §7:261). Su
  comentario de hoy lo reabre con una condición: se queda solo si se entiende.
- **Lo cerrado en E8** (hoja de voz §0): el hero, el párrafo que explica el gancho y la línea del
  campo Desarrollo («Tu sitio te frena, o no existe. El sitio nace legible…»). Ahí caen 8 de las 17
  filas de la home en B.2 (de la 1 a la 7, y la 9). No se tocan sin que Ramón los abra.
- **R2.** El «Monitoreo doble», los informes quincenales, las «consultas medidas» y el
  share-of-voice de Acompañamiento esperan la decisión pendiente sobre prometer monitoreo de
  menciones en IA y una frecuencia de informes (`pendientes-traspaso-revisados.md`, R2). Explicar mejor esas filas sería
  explicar mejor una promesa que puede salir.
- **R4.** Singular o plural en «No te prometo. Te muestro.» y en el párrafo que la sigue.
- **R6.** El paquete del hero que ya estaba propuesto: que las cuatro maquetas lleven a su ficha
  en Trabajo y que «la metodología publicada» lleve a la página del chequeo.
