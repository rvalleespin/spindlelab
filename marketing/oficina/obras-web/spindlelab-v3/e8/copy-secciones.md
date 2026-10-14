# Copy por sección del v3 (E8, paso 4)

14-oct-2026 · Clara, unificando los cuatro registros del paso 3 · base `519e359` (el sitio es el
de `28c5d85` más `a70e945`, que cambió Gemini por Claude en la meta de la home) · contrato: el plan
E8 aprobado por Ramón, paso 4, y el encargo de la oferta del 14-oct que Ramón pidió incluir.

**Qué es.** El entregable de Clara para tu lectura. Trae todo lo que el pase de voz propone
cambiar en el v3, página por página, con su razón. **No se aplicó nada:** ni `spindlelab-astro/`
ni los JSON de datos cambiaron en esta tanda. Lo aplica Diego en el paso 7, ranura por ranura,
desde `scratchpad/e8/registro-unificado.json`, después de que pasen el crítico de voz y Simón
(paso 5) y yo cierre la lista (paso 6).

**Cómo se lee.** «Antes» es lo que el sitio muestra hoy y «Después» es la propuesta. El número
es el de la ranura en el inventario; «nueva» es un texto que hoy no existe. **Simón** marca una
ranura de búsqueda (title, meta, h1, preguntas de FAQ, Offer, HowTo), donde él tiene veto. «Va
también al JSON-LD» quiere decir que el mismo texto cambia en el grafo. Las tablas traen solo lo
que cambia. Lo que se mantiene está en el registro, cada ranura con su motivo.

---

## Resumen

- **881 filas.** Son las 851 ranuras abiertas del inventario, el 100 %, y 30 filas nuevas del
  encargo de la oferta. Las 630 ranuras cerradas (hero, `.d-pres`, la bio, los cuerpos de los
  artículos, precios, R3, R4 y R7) no llevan fila y no se tocan.
- **Por estado:** 153 cambian (134 ranuras y 19 textos nuevos) · 662 se mantienen · 55 esperan R2
  (54 ranuras y una variante nueva) · 10 son para ti · 1 es un dato a verificar.
- **Qué tipo de cambios.** De los 163 textos que cambian o son nuevos:
  - **Unos 70 sacan repeticiones.** Son frases que decían lo mismo que otra de la misma página
    (A10), o que repetían el texto con que se llega desde la página anterior (P86). Por ejemplo,
    «las máquinas que hoy recomiendan tu negocio» estaba en el menú de las 21 rutas.
  - **Unos 30 son de glosario.** Una sola forma por oferta: «mini-diagnóstico», «Auditoría +
    Visibilidad en IA», «plan» y no «pack», «servicio» y no «pieza», y sin «(social ads)».
  - **Unos 20 son tics de voz.** El remate que evalúa la frase anterior, los dos puntos de
    anuncio, la segunda serie de tres de una página y el «y más» de las tarjetas.
  - **Unos 15 sacan afirmaciones sin respaldo** o promesas que no controlamos: «citen a tu
    empresa», «la mayoría del rubro no lo hace», «200 hallazgos», «nunca pedimos accesos de
    administrador», «ninguna consulta quede sin contestar». También corrigen datos: el robots.txt
    de la FAQ de Visibilidad, los cuatro planes de Desarrollo web y Analytics, que es opcional en
    la Auditoría.
  - **29 son nuevos, del encargo de la oferta:** el bloque Resultado · Plazo · Condición y la
    prueba en Trabajo (sección siguiente).
- **Reglas duras, medidas sobre el «después» completo** (las 21 rutas con head, JSON-LD y el
  texto de `v3-chequeo.js`, con tus decisiones pendientes aplicadas como si las aprobaras):
  - cadencia `quincen|cada mes|mes a mes|al mes`: 51 antes y 51 después, el mismo 51 de la hoja
    (1.10). La búsqueda amplia de la hoja (con `mensual`, `/mes`, `cada quince días` y `a
    diario`) también da lo mismo antes y después;
  - «acá»: 3 y 3 (los tres del cuerpo del artículo de los 21 chequeos, que va tal cual). Raya,
    voseo, «usted» y signos de exclamación: 0;
  - «...»: de 2 a 0. «sin (costo ni) compromiso»: de 4 a 2, y las dos que quedan son un h2 del
    cuerpo de un artículo y su fila en el índice del artículo, cerrados;
  - precios: los mismos en cada ruta (96 menciones). Ningún verbo nuevo de la marca en primera
    singular;
  - ninguna ranura cerrada o R2 cambia. Las R2 solo llevan variantes en el anexo A.
- **Lo que espera tu decisión** (el detalle está en los anexos):
  1. **R2**: si se promete medir menciones en IA en los planes pagados, y si el informe del
     Acompañamiento Esencial es mensual o quincenal. El anexo A trae el texto de cada lugar para
     cada respuesta.
  2. **El compromiso de los tres meses** del Esencial y el Pro (encargo de la oferta): que el
     sitio saque más puntos en el chequeo que el día en que partimos. Si no lo confirmas, el
     bloque no va en ninguno de los dos planes.
  3. **La prueba en Trabajo** (36 → 100): con qué chequeo se midió, la fecha del 36 y si se
     reusa una cifra que el corpus dice que no se reusa.
  4. **Si cada mini-diagnóstico pregunta de verdad a ChatGPT, Gemini y Perplexity.** El sitio lo
     promete en Diagnóstico, en el resultado del chequeo, en Nosotros y en el artículo del
     mini-diagnóstico. Ninguno de los tres mini-diagnósticos archivados trae una respuesta real de
     un motor.
  5. **R4 y R7** (anexo C), los datos del anexo D y la meta de la home, que promete «que ChatGPT,
     Claude y Perplexity te recomienden antes que tu competencia» (decide con Simón).

---

## El encargo de la oferta (14-oct)

Marco pidió reescribir la oferta del v3 con resultado, plazo y condición
(`marketing/encargos-otras-sesiones/encargo-estudio-web-oferta-resultado-plazo-condicion.md`). Su
regla: solo se promete lo que controlamos y medimos, y nunca una cita en un modelo. Tú pediste
incluir esos hallazgos en los textos. El texto del encargo era un borrador de otra sesión: no se
copió tal cual. Cada línea se pasó por la hoja de voz y cada afirmación se comprobó antes de
entrar.

### Qué entró y dónde

1. **Gemini por Claude donde se promete acceso.** La tarjeta de Visibilidad de la home y del
   índice decía «Para que ChatGPT, Gemini y Perplexity puedan citarte». «Puedan citarte» habla
   del acceso, y el chequeo prueba en vivo los robots de ChatGPT, Claude y Perplexity
   (`functions/api/chequeo.js:867-869`). Google-Extended es un robot de entrenamiento. Queda
   «ChatGPT, Claude y Perplexity» (#13 y #782, que son la misma hoja). La meta de la home ya la
   había corregido `a70e945`.
   - **Donde Gemini es un motor al que se le pregunta a mano, se queda,** porque ahí es cierto: el
     mini-diagnóstico, la línea base de Visibilidad, «Medición en…» de los planes y Método
     (`marketing/capacidad-servicios.md:39`). Por eso la línea de Visibilidad (#1232) dice
     «ChatGPT, Gemini o Perplexity»: habla de dónde pregunta tu cliente y dónde medimos. La
     tarjeta habla de quién puede entrar a tu sitio. Las dos listas son ciertas, cada una para lo
     suyo (hoja 2.12).
   - **`v3-chequeo.js:104` no se cambia a Claude.** Esa frase describe el mini-diagnóstico, y a
     Claude no se le pregunta a mano: sería falso. Lo que no está asegurado es que se pregunte, y
     por eso queda para ti (anexo D, punto 4).
   - **`oferta-v3.json#/momentos/1/planes/0/d` dice lo mismo y ninguna página la lee.** No lleva
     fila, porque el paso 7 exige que cada cambio se vea en el resultado. Diego la corrige en el
     mismo commit, con una aserción aparte.
2. **La misma regla, en otros lugares.** No se promete una cita en la línea y la meta de
   Visibilidad (#1232, #1298) ni en Método (#682). La FAQ de robots.txt de Visibilidad (#1291)
   decía que bloquear GPTBot o Google-Extended «te saca de las respuestas», y es falso: son
   robots de entrenamiento. En Redes y Paid Media salen las promesas que no medimos («para llegar
   más lejos», «ninguna consulta quede sin contestar», «escalamos con cabeza», «bien hecha»).
3. **El bloque Resultado · Plazo · Condición.** Va bajo la bajada de cada plan, sin
   reemplazarla, con el rótulo igual en las cuatro páginas:
   - en Desarrollo web, los cuatro planes (la Plataforma a Medida lleva solo el plazo);
   - en Visibilidad, la Auditoría de Visibilidad, y el Esencial y el Pro si confirmas el
     compromiso;
   - en Auditoría, la Completa y la combinada;
   - en Acompañamiento, el Esencial y el Pro, si confirmas el compromiso.

   Cuando una línea es igual a la del plan anterior se juntan («Plazo y condición: los de la
   Auditoría Completa»). Donde el bloque trae el plazo, sale el punto «Entrega en ~N semanas»,
   que lo repetía. Redes y Paid Media no lo llevan: el encargo no lo trae, y para escribirlo
   faltan datos tuyos, como en cuántos días sale el primer calendario o la primera campaña.
4. **La prueba propia.** Es un párrafo nuevo en la ficha de Verifica y Cumple, en Trabajo. Es la
   ubicación que sugería el encargo: obra propia, sin permiso de cliente. Va para ti, por ser
   copy nuevo con una cifra pública.

### Qué se adaptó, y por qué

**Plazos: manda lo que el sitio ya publica.**

| Plan | El encargo decía | El sitio y las fuentes dicen | Queda |
|---|---|---|---|
| Página de Campaña | una semana desde textos, imágenes y accesos; material en 3 días; aprobaciones en 48 h | ~1 semana (`desarrollo-web.astro`); los plazos corren desde el anticipo y el material (cotización, `plantilla_generador.py:318-319`) | ~1 semana, desde el anticipo, el texto y las imágenes. Los 3 días y las 48 horas no tienen fuente |
| Sitio Esencial | tres semanas desde el arranque | ~3 semanas (sitio y cotización) | igual |
| Sitio Completo | cuatro a seis semanas | ~4 a 6 semanas (sitio y cotización) | igual |
| Auditoría de Visibilidad | dos semanas desde que tenemos acceso | ~2 semanas; el servicio no pide accesos | ~2 semanas, sin punto de partida (anexo D) |
| Auditoría Completa | dos semanas | 2 a 3 semanas desde el acceso a los datos (FAQ de la página) | 2 a 3 semanas desde el acceso a los datos |
| Auditoría + Visibilidad en IA | (no lo trae) | no hay fuente | dato a verificar |
| Acompañamiento Esencial | noventa días, «el trabajo sigue mes a mes» | mínimo 3 meses | al cumplir los 3 meses del mínimo. «Mes a mes» es R2 |

**Condiciones.** Dicen lo que depende del cliente, y cada una sale de una fuente:
- la Auditoría pedía «acceso al código», y la FAQ de la misma página dice que no lo necesitamos.
  Queda Search Console, Analytics si existe (`onboarding-cliente.md` §2) y 20 minutos;
- Visibilidad pedía «la analítica», que el servicio no usa. Queda la conversación de 20 minutos,
  de Método;
- Desarrollo web tiene la condición de la cotización: el anticipo, los textos y las imágenes. Es
  la primera vez que el sitio nombra el anticipo. «El calendario que fijamos al arrancar» no
  está en ningún documento del proceso, y no entra;
- Acompañamiento: «alguien de tu equipo que apruebe los cambios en los plazos que acordemos»,
  como dice Método. Sale «lo vas a ver en el mismo informe», que amarra la promesa al informe de
  R2.

**Resultados.** Prometen solo lo que el cliente puede comprobar: que los robots puedan entrar,
que el sitio sea indexable, su puntaje en el chequeo y la línea base con fecha. Del borrador
salieron:
- «velocidad en verde», una promesa nueva sin fuente;
- «cuánto mueve cada arreglo», que no se puede saber antes de hacerlo;
- «las máquinas que hoy recomiendan tu rubro» (P86);
- el párrafo «Lo que no prometemos» de Visibilidad, porque la página ya tiene «Qué prometemos y
  qué no».

**Voz.** El «Siempre que…» del borrador pasó a líneas cortas. Salen la construcción «no con una
lista de hallazgos» (A4) y las series de tres. Todo va en plural de marca, con tuteo y sin
rayas.

**Precios.** No se tocaron. Los del encargo calzan con `oferta-v3.json` y `servicios-v3.json`:
Desarrollo web $390.000 / $690.000 / $1.190.000; Visibilidad $400.000; Auditoría $490.000
($690.000 con Visibilidad en IA); Acompañamiento $590.000 / $790.000. El addendum del estudio de
Marco los trae cruzados (Auditoría $400.000 y Visibilidad $490.000): esa línea no se cita.

### Qué quedó para ti

- **R2.** «Cada quince días te llega el informe, con el número de hoy al lado del de la quincena
  anterior» es cadencia, y no entra al texto visible. Va al anexo A en dos versiones, quincenal y
  mensual, como segunda frase del Resultado del Esencial. Lo mismo pasa con «mes a mes» y «más
  consultas medidas».
- **Los noventa días.** El compromiso del Esencial y el Pro es una promesa comercial nueva:
  «a los 3 meses, tu sitio saca más puntos en el chequeo gratis que el día en que partimos, y los
  robots de ChatGPT, Claude y Perplexity pueden entrar». Se usa el mínimo de 3 meses que el sitio
  ya publica. Hay dos casos borde: un sitio que ya parte en 100, o cerca, no tiene cómo subir; y
  un Esencial solo de SEO técnico mueve parte del chequeo, no todo. Si no lo confirmas, el bloque
  no va en el Esencial ni en el Pro, ni en Visibilidad ni en Acompañamiento.
- **La cifra de la prueba.** El encargo dice que los dos 100/100 son «con el mismo instrumento
  que está en el hero», y no es así:
  - salen de `verifica.spindlelab.cl/api/chequeo`, el chequeo de la Ley 21.719 (política,
    seguridad y consentimiento);
  - el chequeo de visibilidad en IA del hero le da hoy 85 a spindlelab.cl y 54 a
    verifica.spindlelab.cl (corrido en vivo el 14-oct, `scratchpad/e8/clara-S1/chq-ia-spindlelab.json`
    y `clara-P/vivo/`).

  Por eso el párrafo va en la ficha de Verifica y Cumple, cuya línea ya nombra la ley, y dice que
  la forma de puntuar cambió entre las dos fechas. Tú decides si se publica, con qué fecha (9-sep
  o 10-sep) y si se reusa el 36. Las variantes están en el anexo D.

---

## Lo que cambié al unificar

Doce filas cambiaron respecto de lo que entregaron las cuatro Claras. Cada una lleva en el
registro el motivo original y, después de «UNIFICA», el mío.

| # | Página | Qué cambié | Por qué |
|---|---|---|---|
| 1234 | Visibilidad | La entrada ya no dice «el sitio que ya tienes, sin rehacerlo» | P86: es el texto con que se llega desde la home, el índice y la guía nueva de Desarrollo web |
| 1076 | Paid Media | Entrada nueva | La de S2 repetía la pestaña nueva de la home y del índice (H), desde donde se llega |
| 983 | Desarrollo web | Guía más corta | Repetía «Si ya tienes uno y funciona», la frase del índice, y decía «tienes» tres veces |
| 1331 | Trabajo | «con el chequeo gratis ves…» | Sin eso, la frase decidida «Es el mismo chequeo…» quedaba sin referente |
| 1332 | Trabajo | «cuatro planes» y «cuando conversamos tu proyecto» | Tiene que seguir a la Desarrollo web nueva (H #979 y #982) |
| 1019 | Desarrollo web | Sin «y más» | Como los otros nueve planes del sitio |
| 682 | Método | «tu cliente ideal» → «tu cliente» | Como en Visibilidad (#1237 y #1289) |
| 900 | Auditoría | Sin «200» | P la sacó de Método por cifra sin respaldo, y §7:193 ya la había sacado de la nota |
| 951 | Auditoría | «y a Analytics, si lo tienes» | En la Auditoría, Analytics es opcional (`onboarding-cliente.md` §2), y Método ya lo dice así |
| nueva | Auditoría | La misma corrección en la condición de la Auditoría Completa | Idem |
| nueva | Visibilidad | La condición de la Auditoría de Visibilidad, más corta | «Las preguntas que haría tu cliente» salía tres veces en la página |
| 1440 | Resultado del chequeo | De «se mantiene» a «para Ramón», con dos versiones | Gemini es cierto, pero no está asegurado que se pregunte (anexo D, punto 4) |

## Revisión de conjunto

- **Una serie de tres por página.** Cada página quedó con una sola serie de ritmo, por ejemplo:
  - Diagnóstico: leer, entender y citar;
  - Auditoría: rastrearlo, entenderlo y confiar en él;
  - Desarrollo web: datos estructurados, contenido citable e indexación;
  - Visibilidad: si apareces, cómo te describen y quién gana. Va dos veces, en la lista y en la
    FAQ, que está sola en el FAQPage.

  Las demás enumeraciones son de hechos distintos, como los motores, los entregables o los
  plazos, y se quedan.
- **Repeticiones aceptadas, para el crítico:**
  - el bloque nuevo de la Auditoría repite su FAQ de plazo y de accesos, porque se lee al
    comparar planes;
  - en Visibilidad, «probabilidad» sale tres veces: en la línea, en «Prometemos» y en la FAQ;
  - en Acompañamiento, el h2 del cierre («Una auditoría no se ejecuta sola») repite la entrada,
    que es R2; el anexo A lo resuelve;
  - en el índice, la nota decidida «No hace falta reconstruir para que una IA pueda citarte» va
    pegada a la tarjeta «Para que ChatGPT, Claude y Perplexity puedan citarte…», así que
    «citarte» sale dos veces seguidas. Viene de antes del pase, y una de las dos es una ranura
    decidida (§7:176).
- **Glosario.**
  - «Pedir el diagnóstico» queda en los cinco cierres de servicio.
  - «mini-diagnóstico» queda en el cuerpo de todas las páginas. «diagnóstico gratis» se queda
    solo en el title de Contacto y en las metas de la home y de Nosotros, que son de Simón y
    funcionan como términos de búsqueda.
  - En Desarrollo web el valor se cierra «cuando conversamos tu proyecto» (nota, FAQ de precio y
    Trabajo).
  - No queda ningún «y más» en las tarjetas. Queda solo el de la Offer de la Plataforma a Medida,
    donde presenta una lista.
- **El mismo alt para la misma imagen.**
  - Seis imágenes tienen variantes entre páginas: `ventana`, `escritorio`, `domino-curva`,
    `domino`, `hilo` y el retrato de Ramón. Las miré: todas nombran los mismos objetos, con más
    o menos detalle o según el recorte (Método muestra la ventana sin el laptop). Es lo que
    §7:210 ya aceptó, así que no se cambia ninguna.
  - Las obras tienen un solo alt por archivo (§7:274).
- **Tuteo y persona.**
  - El tuteo va en todo, y «ustedes» solo aparece en las preguntas que el visitante le hace a la
    marca.
  - El plural de marca va en todo lo que se entrega. «Conocer a Ramón» es la voz del visitante.
  - No entra ningún singular nuevo.

---

## Copy por página

### Home

| # | Antes | Después | Por qué |
|---|---|---|---|
| 13 | Tu sitio existe y no lo vas a rehacer. Para que ChatGPT, Gemini y Perplexity puedan citarte cuando preguntan por tu rubro. | Tu sitio existe y no lo vas a rehacer. Para que ChatGPT, Claude y Perplexity puedan citarte cuando preguntan por tu rubro. | Encargo del 14-oct, §2. «Puedan citarte» habla del acceso, y el chequeo prueba en vivo los robots de ChatGPT, Claude y Perplexity (chequeo.js:867-869). Google-Extended es de entrenamiento. Misma hoja que el índice (#782). |
| 17 | Desde $490.000 · $690.000 con Visibilidad IA + IVA | Desde $490.000 · $690.000 con Visibilidad en IA + IVA | Glosario 2.10 y 2.11: el plan se llama «Auditoría + Visibilidad en IA» en todas partes. Cifras idénticas. |
| 25 | Ya tienes demanda y quieres más. Google Ads de alta intención: captura a quien ya está buscando lo que ofreces. | Ya tienes demanda y quieres más. Google Ads para llegar a quien ya está buscando lo que ofreces. | Tic 2 (los dos puntos de remate) y jerga de embudo («captura»). Misma hoja que el índice (#793). |
| 29 | Detrás de SpindleLab está una persona, no una agencia de veinte. Cada proyecto parte con el mismo chequeo que puedes correr arriba, sobre tu dominio, y termina con el mismo chequeo corrido otra vez. | Detrás de SpindleLab está una persona, no una agencia de veinte. Cada proyecto termina como empezó: con el chequeo de arriba, corrido otra vez sobre tu dominio. | A10: «parte con el mismo chequeo» era la tercera vez en la home. Queda lo que solo esta frase dice: que el proyecto termina con el chequeo. |
| 32 | Quién está detrás | Conocer a Ramón | Hoja §3: un botón dice qué pasa al hacer clic. Es la voz del visitante, no un singular de la marca. |
| 34 | Ver todo | Ver el blog | Hoja §3: «Ver todo» no dice qué se ve. |

Cambian 6. No cambian 22 (1 espera R2).

### Servicios (índice)

| # | Antes | Después | Por qué |
|---|---|---|---|
| 774 | Valores en pesos, + IVA. Los publicamos a propósito: la mayoría del rubro no lo hace. | Valores en pesos, + IVA. Los publicamos para que compares antes de escribirnos. | 5a: «la mayoría del rubro» dice más que su fuente (tres competidores en competidores.md; seis de nueve en el estudio del 14-oct). Queda la razón con la que Ramón publicó sus precios (corpus §1). |
| 775 | El centro es tu sitio: lo construimos para que los motores de IA puedan leerlo. Si ya tienes uno y funciona, hay una puerta para eso. Y antes de contratar nada, mira gratis cómo te leen hoy. | El centro es tu sitio. Si hay que hacerlo de nuevo, lo construimos; si ya tienes uno y funciona, hay una puerta para eso. Y antes de contratar nada, mira gratis cómo te leen hoy. | A10 con la fila de Desarrollo web de justo abajo («El sitio nace legible…»), el defecto que §7:176 ya le sacó a la nota de la banda. Los dos enlaces quedan iguales. |
| 782 | Para que ChatGPT, Gemini y Perplexity puedan citarte cuando preguntan por tu rubro. | Para que ChatGPT, Claude y Perplexity puedan citarte cuando preguntan por tu rubro. | Igual que la home (#13): misma hoja. |
| 785 | Desde $490.000 · $690.000 con Visibilidad IA + IVA | Desde $490.000 · $690.000 con Visibilidad en IA + IVA | Igual que la home (#17): misma hoja. |
| 790 | El contenido creativo lo pones tú. Nosotros lo hacemos funcionar. | *(se borra)* | A10: la sección «Lo que pones tú», pegada debajo, dice lo mismo. «Nosotros lo hacemos funcionar» no dice qué (A1). |
| 793 | Google Ads de alta intención: captura a quien ya está buscando lo que ofreces. | Google Ads para llegar a quien ya está buscando lo que ofreces. | Igual que la home (#25): misma hoja. |
| 801 | Pon tu dominio y ves en segundos si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio. Gratis y sin dejar tu correo. | Es gratis y revisa 21 señales de tu dominio en segundos, sin pedirte el correo. Cada señal que no pases viene con la instrucción para arreglarla. | P86: el botón lleva a Diagnóstico, que abre con casi la misma frase. Las 21 señales y la instrucción por señal son datos del chequeo. |

Cambian 7. No cambian 30 (1 espera R2).

### Desarrollo web

| # | Antes | Después | Por qué |
|---|---|---|---|
| 979 | Sitios a medida con el SEO técnico puesto desde el primer commit. Tres planes, desde $390.000 + IVA. | Sitios a medida con el SEO técnico puesto desde el primer commit. Cuatro planes, desde $390.000 + IVA. | Dato: la página muestra cuatro planes, y la Desarrollo web publicada dice «4 packs». |
| 982 | Valores en pesos, + IVA. El valor final se cierra tras el diagnóstico gratuito. | Valores en pesos, + IVA. El valor final se cierra cuando conversamos tu proyecto. | Glosario 2.2: el mini-diagnóstico no le pone precio a un sitio, y quien parte de cero no tiene sitio que diagnosticar. Vale para las dos copias de la nota. |
| 983 | A veces el problema no es lo que se audita: es lo que hay que reconstruir. Construimos el sitio para que las máquinas que hoy recomiendan tu negocio puedan leerlo, y te lo demostramos con el mismo chequeo sobre tu dominio. | Esto es para cuando no tienes sitio o hay que rehacerlo. Si el tuyo funciona, la Visibilidad en IA trabaja sobre él. | Corregida al unificar. P86: repetía la línea cerrada del campo Desarrollo y el menú («las máquinas que hoy recomiendan tu negocio»). Ahora dice para quién es la página y adónde va el que no la necesita. Al unificar se acortó, porque repetía «Si ya tienes uno y funciona», la frase del índice desde donde se llega. |
| 985 | Legible para motores de IA desde el primer commit: datos estructurados, contenido citable e indexación. | Legible para motores de IA: datos estructurados, contenido citable e indexación. | A10: «desde el primer commit» ya va en la línea bajo el h1. La serie que queda es la única de la página. |
| 1000 | Entrega en ~1 semana | *(se borra)* | Pasa al «Plazo» del bloque nuevo, idéntico. La Offer lo conserva. |
| 1007 | Entrega en ~3 semanas | *(se borra)* | Pasa al «Plazo» del bloque nuevo, idéntico. La Offer lo conserva. |
| 1015 | Entrega en ~4 a 6 semanas | *(se borra)* | Pasa al «Plazo» del bloque nuevo, idéntico. La Offer lo conserva. |
| 1019 | Todo lo del Sitio Completo, y más | Todo lo del Sitio Completo | Corregida al unificar. Sin «y más», como los otros nueve planes del sitio. |
| 1027 | Conversamos sobre tu negocio, tu marca y qué necesita comunicar el sitio. Definimos la dirección de diseño con referentes concretos de tu rubro. | Conversamos sobre tu negocio y sobre a quién le tiene que hablar el sitio. Definimos la dirección de diseño con referentes concretos de tu rubro. | A3, y el tercer elemento repetía el h2 del cierre («Cuéntanos qué necesita comunicar tu sitio»). |
| 1033 | Construimos el sitio con el agente de desarrollo de SpindleLab, con supervisión técnica humana en cada avance. Sigues el progreso en una URL de prueba. | Construimos el sitio con el agente de desarrollo de SpindleLab. Sigues cada avance en una URL de prueba. | A10: la revisión humana en cada avance ya la dicen la lista y la FAQ. |
| 1039 | Configuramos dominio, SSL y analítica, y publicamos en producción. Quedas con 30 días de garantía para corregir errores de funcionamiento. | Publicamos el sitio en tu dominio. Quedas con 30 días de garantía para corregir errores de funcionamiento. | A3 y A10: «dominio, SSL y analítica» repetía «Todo parte con esto». Queda lo que cubre la garantía, con los 30 días idénticos. |
| 1042 | No. Cada sitio se construye con código propio, a medida. Sin temas genéricos ni page builders: control total sobre rendimiento, diseño y SEO técnico. | No. Cada sitio se construye con código propio, sin temas genéricos ni page builders. Así controlamos el rendimiento y el SEO técnico desde la base. | Va también al JSON-LD. A3 y tic 2. «Control total» repetía «Todo parte con esto». |
| 1044 | Cada pack tiene un precio de partida («desde»): Página de Campaña desde $390.000 + IVA, Sitio Esencial desde $690.000 + IVA y Sitio Completo desde $1.190.000 + IVA; la Plataforma a Medida se cotiza tras una reunión. El valor final se cierra tras el diagnóstico gratuito, según las páginas y funcionalidades que necesites. Sin sorpresas. | Cada plan tiene un precio de partida: Página de Campaña desde $390.000 + IVA, Sitio Esencial desde $690.000 + IVA y Sitio Completo desde $1.190.000 + IVA. La Plataforma a Medida se cotiza tras una reunión. El valor final se cierra cuando conversamos tu proyecto, según las páginas y funciones que necesites. | Va también al JSON-LD. «Plan», no «pack» (1.7). Tic 1 en «Sin sorpresas». El valor se cierra al conversar, como la nota (#982). Precios idénticos. |
| 1046 | La ejecución asistida por IA reduce tiempos, no supervisión: cada fase pasa por revisión humana antes de avanzar a la siguiente. La velocidad se traduce en plazos más cortos, no en menos control de calidad. | La IA acorta los plazos, no la supervisión: cada fase pasa por revisión humana antes de avanzar a la siguiente. | Va también al JSON-LD. Tic 1: la segunda frase repetía la primera con otra contraposición. Queda una sola, con un contraste real. |
| 1048 | Sí, de base: rendimiento, datos estructurados y arquitectura pensados desde el diseño. Si además necesitas visibilidad en motores de IA, ese trabajo se profundiza con el servicio de Visibilidad en IA. | Sí. El SEO técnico va de base en todos los planes y se piensa desde el diseño. Si además necesitas visibilidad en motores de IA, ese trabajo se profundiza con el servicio de Visibilidad en IA. | Va también al JSON-LD. A3 y A10 con «Todo parte con esto». «En todos los planes» es dato de las cuatro tarjetas. |
| 1050 | Si ya tienes uno, empezamos con el diagnóstico gratuito. Si partes de cero, conversemos tu proyecto directamente. | Si ya tienes uno, empezamos con el mini-diagnóstico gratuito. Si partes de cero, conversemos tu proyecto directamente. | Glosario 2.2. §7:241 decidió el cierre, no el nombre del paso, y la hoja deja unificarlo. |
| nueva · rótulos del bloque | *(nuevo)* | Resultado · Plazo · Condición | Encargo del 14-oct: las mismas etiquetas que en Visibilidad, Auditoría y Acompañamiento. Van bajo la bajada, sin reemplazarla. |
| nueva · Página de Campaña, Resultado | *(nuevo)* | Tu página publicada y abierta a los robots de ChatGPT, Claude y Perplexity, lista para recibir la pauta. | Encargo del 14-oct. Promete lo que controlamos y el chequeo mide en vivo: que los robots puedan entrar. No promete una cita. |
| nueva · Página de Campaña, Plazo | *(nuevo)* | ~1 semana. | El plazo que el sitio ya publica (~1 semana). Del borrador del encargo salen «tres días» y «48 horas», que no tienen fuente. |
| nueva · Página de Campaña, Condición | *(nuevo)* | El plazo corre desde que recibimos el anticipo, el texto y las imágenes de la oferta. | Lo que dicen las condiciones de la cotización (plantilla_generador.py:318-319). Es la primera vez que el sitio nombra el anticipo. |
| nueva · Sitio Esencial, Resultado | *(nuevo)* | Tu sitio publicado e indexable, y su puntaje en el chequeo el día de la entrega. Si ya tenías uno, también el de antes. | Lo que el cliente puede comprobar solo: que el sitio sea indexable y su puntaje en el chequeo. Sale «velocidad en verde», una promesa sin fuente. |
| nueva · Sitio Esencial, Plazo | *(nuevo)* | ~3 semanas. | El plazo que el sitio ya publica (~3 semanas). Calza con el encargo. |
| nueva · Sitio Esencial, Condición | *(nuevo)* | El plazo corre desde que recibimos el anticipo, los textos y las imágenes. | La de la cotización. Sale «contenidos en la primera semana», que no tiene fuente. |
| nueva · Sitio Completo, Resultado | *(nuevo)* | El del Sitio Esencial, con el blog o el CMS listo para que publiques tú. | Lo propio del plan: el blog o CMS que administras tú. Sale «las máquinas que hoy recomiendan tu rubro» (P86). |
| nueva · Sitio Completo, Plazo | *(nuevo)* | ~4 a 6 semanas. | El plazo que el sitio ya publica (~4 a 6 semanas). Calza con el encargo. |
| nueva · Sitio Completo, Condición | *(nuevo)* | La del Sitio Esencial. | La misma del Esencial. «El calendario que fijamos al arrancar» no existe en ningún documento del proceso. |
| nueva · Plataforma a Medida, Plazo | *(nuevo)* | Se define contigo, junto con el alcance. | Solo plazo: antes de la reunión no hay nada verificable que prometer. Es lo que dicen la Desarrollo web publicada y la cotización. |

Cambian 27. No cambian 73.

### Visibilidad en IA

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1230 | · Visibilidad en IA (AEO/GEO) | · Visibilidad en IA | Va también al JSON-LD. Hoja 2.11: la miga dice lo mismo que el menú (§7:203). Cambia junto con el BreadcrumbList, aunque Simón vete el h1. |
| 1231 | Visibilidad en IA (AEO/GEO) | Visibilidad en IA | **Simón**. Hoja 2.11: el rótulo con la palabra del visitante. «AEO/GEO» se queda en el title, la meta, el grafo y la FAQ que lo define. |
| 1232 | Que ChatGPT, Gemini y Perplexity citen a tu empresa. Tres planes, desde $400.000 + IVA. | Subimos tu probabilidad de aparecer cuando tus clientes le preguntan a ChatGPT, Gemini o Perplexity. Tres planes, desde $400.000 + IVA. | Encargo del 14-oct: nunca se promete una cita, y la misma página dice «No prometemos: Garantizar una respuesta exacta». Gemini se queda porque aquí es donde pregunta el cliente y donde medimos a mano (hoja 2.12). |
| 1233 | Valores en pesos, + IVA. Los acompañamientos son mensuales; el valor final se cierra tras el diagnóstico gratuito. | Valores en pesos, + IVA. Los acompañamientos son mensuales; el valor final se cierra tras el mini-diagnóstico gratuito. | Glosario 2.2: una sola forma por página. |
| 1234 | Este servicio analiza cómo te describen ChatGPT, Gemini y Perplexity, y optimiza tu contenido, estructura y señales de autoridad para que te citen a ti como fuente confiable. | Los motores leen tu sitio y también lo que se dice de tu empresa fuera de él. Trabajamos en los dos lados. | Corregida al unificar. Repetía la línea de arriba (los tres motores y «que te citen»), con una serie de tres y jerga. Al unificar cambió la propuesta de S1 («Trabajamos sobre el sitio que ya tienes, sin rehacerlo, y sobre tus perfiles fuera de él»): repetía el texto con que se llega a esta página desde la home, el índice y la guía nueva de Desarrollo web (P86). Queda lo que la página no decía: el trabajo es dentro y fuera del sitio (el mismo hecho de Diagnóstico #632). |
| 1235 | De invisible a citable | Las cuatro partes del trabajo | El título en palabras del visitante y con un hecho. «De invisible a citable» prometía un cambio que la página después matiza. |
| 1237 | Ejecutamos las preguntas que haría tu cliente ideal en los principales motores de IA y documentamos si apareces, cómo te describen y quién está ganando esas respuestas hoy. | Antes de tocar nada, les hacemos a los motores de IA las preguntas que haría tu cliente y anotamos si apareces, cómo te describen y quién gana hoy esas respuestas. | Calco («ejecutamos las preguntas») y jerga («cliente ideal»). La promesa de medir no cambia. |
| 1239 | Alineamos quién eres, qué haces y dónde operas en todo el ecosistema: tu sitio, datos estructurados, directorios y perfiles. Los modelos citan lo que entienden sin ambigüedad. | Ordenamos tu sitio, tus datos estructurados, los directorios y tus perfiles para que digan lo mismo sobre tu empresa. Los modelos citan lo que entienden sin ambigüedad. | Jerga («alineamos quién eres», «ecosistema»), tic 2 y una segunda serie de tres. |
| 1241 | Reestructuramos tus páginas clave para que respondan preguntas concretas con definiciones, datos y formato que los modelos pueden extraer y citar con confianza. | Reestructuramos tus páginas clave para que respondan preguntas concretas, con definiciones y datos que un modelo pueda extraer y citar. | Prueba del 30 %: «formato» y «con confianza» no suman. |
| 1248 | La radiografía: qué dice la IA de ti hoy, y qué falta. | Qué dice hoy la IA de ti y qué te falta. | «La radiografía» es el nombre del mini-diagnóstico, que es gratis. Aquí nombraba un plan de $400.000. |
| 1252 | Plan de citabilidad priorizado por impacto | *(se borra)* | Lo dice el «Resultado» del bloque nuevo. Si el bloque no entra, se queda. |
| 1253 | Entrega en ~2 semanas | *(se borra)* | Lo dice el «Plazo» del bloque nuevo, idéntico. Si el bloque no entra, se queda. |
| 1257 | Todo lo de la Auditoría, y más | Todo lo de la Auditoría de Visibilidad | Sin «y más». «La Auditoría» a secas se confunde con la Auditoría SEO técnica. |
| 1265 | Todo lo del Esencial, y más | Todo lo del Esencial | Sin «y más». |
| 1273 | Las señales que optimizamos son las que los modelos usan para elegir fuentes. Eso se mueve y se mide. | Las señales que optimizamos son las que los modelos usan para elegir fuentes. | Tic 1: «Eso se mueve y se mide» remataba la frase anterior. |
| 1276 | Protocolo repetible de consultas, no pantallazos anecdóticos. Sabrás si avanzas y contra quién. | Sabrás si avanzas y contra quién, sin depender de un pantallazo suelto. | «Protocolo repetible» iba cuatro veces en la página (§7:193). La promesa de medir no cambia. |
| 1282 | Sin texto oculto ni manipulación. Lo que construye citabilidad es lo mismo que construye confianza real. | Sin texto oculto ni manipulación. | Tic 1: el aforismo evaluaba la frase anterior sin agregar un hecho. |
| 1285 | Sí, dentro de límites honestos. Los motores de IA eligen fuentes según claridad de entidad, autoridad y contenido citable. Optimizar esas señales aumenta de forma medible la probabilidad de ser citado; nadie puede garantizar una respuesta específica. | Sí, hasta cierto punto. Los motores de IA eligen fuentes según la claridad de entidad, la autoridad y el contenido citable. Trabajar esas señales sube la probabilidad de que te citen. | Va también al JSON-LD. La no-garantía ya está en «No prometemos». «De forma medible» no tenía respaldo en la respuesta. |
| 1289 | Con un protocolo de consultas repetibles: las preguntas que haría tu cliente ideal, ejecutadas periódicamente en los principales motores, registrando si apareces, cómo te describen y a quién citan. | Les hacemos periódicamente a los principales motores las mismas preguntas que haría tu cliente y registramos si apareces, cómo te describen y a quién citan. | Va también al JSON-LD. El cuarto «protocolo… repetible» de la página, y «cliente ideal». La promesa no cambia. |
| 1291 | Si tu negocio depende de ser encontrado, bloquear GPTBot o Google-Extended te saca de las respuestas. Recomendamos permitirlos de forma deliberada, salvo contenido que necesites proteger. | Si tu negocio depende de que te encuentren, bloquear los robots con que ChatGPT, Claude y Perplexity buscan en el momento (OAI-SearchBot, Claude-SearchBot y PerplexityBot) te puede sacar de sus respuestas. Los de entrenamiento, como GPTBot o Google-Extended, son otra decisión. Recomendamos permitir los de búsqueda a propósito, salvo contenido que necesites proteger. | Va también al JSON-LD. Dato corregido: bloquear GPTBot o Google-Extended no saca a nadie de las respuestas de hoy. Lo que saca son los robots de búsqueda en vivo, los que prueba el chequeo. |
| 1293 | La Auditoría de Visibilidad parte en $400.000 + IVA (pago único). El acompañamiento mensual parte en $590.000/mes + IVA (Esencial) y $790.000/mes + IVA (Pro). El valor final se cierra tras el diagnóstico gratuito, según el tamaño de tu sitio y las consultas a cubrir. | La Auditoría de Visibilidad parte en $400.000 + IVA (pago único). El acompañamiento mensual parte en $590.000/mes + IVA (Esencial) y $790.000/mes + IVA (Pro). El valor final se cierra tras el mini-diagnóstico gratuito, según el tamaño de tu sitio y las consultas a cubrir. | Va también al JSON-LD. Glosario 2.2: una sola forma por página. Precios idénticos. |
| 1298 | Visibilidad en IA (AEO/GEO): que ChatGPT, Gemini y Perplexity citen a tu empresa, con análisis de presencia, claridad de entidad y contenido citable. | Visibilidad en IA (AEO/GEO): análisis de presencia en ChatGPT, Gemini y Perplexity, claridad de entidad y contenido citable para subir tu probabilidad de cita. | **Simón**. La meta prometía lo que la página niega («citen a tu empresa»). Mismos términos de búsqueda y la sigla que decidió §7:213. Elige Simón. |
| 1303 | Radiografía única: medición en ChatGPT, Gemini y Perplexity, quién gana esas respuestas, y plan de citabilidad priorizado. Entrega en ~2 semanas. | Pago único: medición en ChatGPT, Gemini y Perplexity, quién gana esas respuestas y plan de citabilidad priorizado. Entrega en ~2 semanas. | **Simón** · va también al JSON-LD. «Radiografía» es el nombre del mini-diagnóstico. «Pago único», como dice la FAQ de precio. |
| nueva · Auditoría de Visibilidad, Resultado | *(nuevo)* | La línea base con fecha y el plan en orden de impacto, listo para ejecutarlo con tu equipo o con nosotros. | Encargo del 14-oct: lo que tienes al terminar, sin prometer una cita. Sale «cuánto mueve cada arreglo», que no se puede medir antes de hacerlo. |
| nueva · Auditoría de Visibilidad, Plazo | *(nuevo)* | ~2 semanas. | El plazo que el sitio ya publica. El borrador decía «desde que tenemos acceso», pero este servicio no pide accesos: el plazo quedó sin punto de partida y lo define Ramón. |
| nueva · Auditoría de Visibilidad, Condición | *(nuevo)* | Una conversación de 20 minutos para conocer tu negocio. | Corregida al unificar. El borrador pedía «el sitio y su analítica», y este servicio no usa la analítica. La conversación de 20 minutos sale de Método. Al unificar se acortó, porque «las preguntas que haría tu cliente» ya salía dos veces en la página. |
| nueva · Acompañamiento Esencial, Resultado | *(nuevo)* | Tu sitio saca más puntos en el chequeo gratis que el día en que partimos, y los robots de ChatGPT, Claude y Perplexity pueden entrar a él. | **Para Ramón**. Compromiso comercial nuevo del encargo: lo confirma Ramón. Promete solo lo que medimos y el cliente comprueba por su cuenta. Es el mismo bloque del Esencial de Acompañamiento, palabra por palabra. |
| nueva · Acompañamiento Esencial, Plazo | *(nuevo)* | Al cumplir los 3 meses del mínimo. | **Para Ramón**. Los «noventa días» del encargo pasan a los 3 meses que el sitio ya publica. Sale «mes a mes» (R2). |
| nueva · Acompañamiento Esencial, Condición | *(nuevo)* | Alguien de tu equipo que apruebe los cambios en los plazos que acordemos. Si no se publican, el puntaje no se mueve. | **Para Ramón**. La condición dice qué depende del cliente y qué pasa si no se cumple. Sale «lo vas a ver en el mismo informe» (R2). |
| nueva · Acompañamiento Pro, Resultado, plazo y condición | *(nuevo)* | Los del Acompañamiento Esencial. | **Para Ramón**. El Pro del encargo: el mismo compromiso. Sale «más consultas medidas» (R2). |

Cambian 30. No cambian 54 (12 esperan R2).

### Auditoría SEO técnica

| # | Antes | Después | Por qué |
|---|---|---|---|
| 900 | Sabemos que tu sitio «funciona». La pregunta es si Google y los motores de IA pueden rastrearlo, entenderlo y confiar en él. Esta auditoría responde eso con evidencia y entrega un plan priorizado por impacto, no un volcado de 200 hallazgos sin jerarquía. | Que tu sitio funcione para quien lo visita no dice si Google y los motores de IA pueden rastrearlo, entenderlo y confiar en él. La auditoría responde eso con evidencia, no con un volcado de hallazgos sin jerarquía. | Corregida al unificar. Concede sin ironía. Al unificar sale «200», una cifra sin respaldo que §7:193 ya sacó de la nota y P sacó de Método (#701). |
| 905 | Velocidad real de carga en celular y computador, scripts de terceros que frenan tu sitio, y qué corregir primero para pasar los umbrales de Google. | Velocidad real de carga en celular y computador, scripts de terceros que frenan tu sitio y qué te falta para pasar los umbrales de Google. | A10 con el bloque B y el cierre. Ahora dice lo que mide esta capa. |
| 911 | Autoría, políticas, transparencia corporativa y consistencia de entidad. En sectores financieros y de salud, esto define si te recomiendan o no. | Autoría, políticas, transparencia corporativa y consistencia de entidad. En finanzas y salud, Google y los motores de IA exigen pruebas de que eres quien dices ser. | 5a: «esto define si te recomiendan» dice más que su respaldo. La frase nueva tiene fuente (el artículo del mini-diagnóstico y las pautas YMYL de Google). |
| 913 | Toda auditoría pagada entrega lo mismo: un informe priorizado por impacto, código y datos estructurados listos para pegar, y una sesión de traspaso con tu equipo. | Las dos auditorías pagadas entregan lo mismo; cambia lo que cubren. | A10: los entregables salían tres veces seguidas. |
| 918 | Una corrección de mayor impacto para partir | La corrección de mayor impacto, para partir | Comparativo sin término. Igual en su Offer (#968). |
| 927 | Auditoría + Visibilidad IA | Auditoría + Visibilidad en IA | Glosario 2.10 y 2.11. Igual en la FAQ de precio y en el Offer. |
| 930 | Todo lo de la Auditoría Completa, y más | *(se borra)* | Lo dicen la bajada y el bloque nuevo. Si el bloque no entra: «Todo lo de la Auditoría Completa». |
| 951 | Acceso de lectura a Google Search Console y Analytics, y una conversación de 20 minutos sobre tu negocio. No necesitamos acceso al código ni al servidor. | Acceso de lectura a Google Search Console (y a Analytics, si lo tienes) y una conversación de 20 minutos sobre tu negocio. No necesitamos acceso al código ni al servidor. | Va también al JSON-LD · corregida al unificar. Dato: onboarding-cliente.md §2 marca Analytics como opcional en la Auditoría, y Método ya lo dice así (#713). |
| 957 | El mini-diagnóstico es gratis. La Auditoría Completa parte en $490.000 + IVA y la Auditoría + Visibilidad IA en $690.000 + IVA. El valor final se cierra tras el mini-diagnóstico gratuito, según el tamaño del sitio. | El mini-diagnóstico es gratis. La Auditoría Completa parte en $490.000 + IVA y la Auditoría + Visibilidad en IA en $690.000 + IVA. El valor final se cierra tras el mini-diagnóstico, según el tamaño del sitio. | Va también al JSON-LD. Nombre del plan, y sale el segundo «gratuito». Precios idénticos. |
| 968 | Radiografía de una página con los hallazgos técnicos más relevantes y una corrección de mayor impacto. Gratis, en 24 horas. | Radiografía de una página con los hallazgos técnicos más relevantes y la corrección de mayor impacto. Gratis, en 24 horas. | **Simón** · va también al JSON-LD. El mismo arreglo de la tarjeta (#918). |
| 971 | Auditoría + Visibilidad IA | Auditoría + Visibilidad en IA | **Simón** · va también al JSON-LD. El nombre del plan, como la tarjeta y la FAQ. |
| nueva · Auditoría Completa, Resultado | *(nuevo)* | Tu equipo puede corregir lo que frena a tu sitio, en orden, sin depender de nosotros. | Encargo del 14-oct. Queda el resultado que la tarjeta no dice y que el sitio respalda (código listo y sesión de traspaso). |
| nueva · Auditoría Completa, Plazo | *(nuevo)* | 2 a 3 semanas desde el acceso a los datos. | El borrador decía «dos semanas». Manda lo que ya dicen la FAQ y la hoja: 2 a 3 semanas. |
| nueva · Auditoría Completa, Condición | *(nuevo)* | Acceso de lectura a tu Search Console (y a Analytics, si lo tienes) y 20 minutos para conocer tu negocio. | Corregida al unificar. El borrador pedía «acceso al código», y la FAQ de la misma página dice que no lo necesitamos. Al unificar, Analytics queda opcional (#951). |
| nueva · Auditoría + Visibilidad en IA, Resultado | *(nuevo)* | El de la Auditoría Completa, y además sabes qué responden hoy ChatGPT, Gemini y Perplexity sobre tu rubro. | Encargo del 14-oct. Gemini es un motor al que se le pregunta a mano (hoja 2.12). Sin cita prometida. |
| nueva · Auditoría + Visibilidad en IA, Plazo y condición | *(nuevo)* | Los de la Auditoría Completa. | **Dato a verificar**. Ni el sitio ni el encargo dan el plazo del plan combinado. Si los dos trabajos corren en paralelo, vale esta línea. Si no, Ramón da el plazo. |

Cambian 16. No cambian 66.

### Acompañamiento mensual

| # | Antes | Después | Por qué |
|---|---|---|---|
| 824 | Piezas pensadas para posicionar en Google y ser citadas por los modelos: estructura de respuesta, datos verificables y schema correcto. | Textos pensados para posicionar en Google y para que los modelos los citen: estructura de respuesta, datos verificables y schema correcto. | Glosario 2.12: «pieza» es obra o pieza gráfica. Pasa a voz activa. |
| 836 | Sostener y mejorar un frente: técnico o visibilidad en IA. | Sostener y mejorar una capa: SEO técnico o visibilidad en IA. | «Un frente» nombra otra cosa en «A medida». La página habla de capas. |
| 837 | Foco en una capa (técnica o visibilidad) | *(se borra)* | Repetía la tagline palabra por palabra. |
| 851 | Todo lo del Pro, y más | Todo lo del Pro | Sin «y más». |
| 870 | Porque el SEO y la visibilidad en IA se mueven en ciclos de semanas: rastreo, re-indexación y actualización de los modelos. En menos de tres meses no hay señal suficiente para evaluar con seriedad. | Porque el SEO y la visibilidad en IA se mueven en ciclos de semanas: rastreo, reindexación y actualización de los modelos. En menos de tres meses no hay señal suficiente para evaluar con seriedad. | Va también al JSON-LD. Ortografía (RAE). |
| 878 | El plan Esencial parte en $590.000/mes + IVA y el Pro en $790.000/mes + IVA; el plan a medida se cotiza tras una reunión. El plan se dimensiona tras el diagnóstico gratuito, según el tamaño del sitio y tus objetivos. | El plan Esencial parte en $590.000/mes + IVA y el Pro en $790.000/mes + IVA; el plan a medida se cotiza tras una reunión. Cuál te conviene lo definimos después del mini-diagnóstico gratuito, según el tamaño del sitio y tus objetivos. | Va también al JSON-LD. Glosario 2.2 y sale la pasiva. Precios idénticos. |
| 880 | Envíanos tu URL y en 24 horas tienes el diagnóstico gratuito: es el punto de partida para dimensionar tu plan. | Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito. | Glosario 2.2: la misma frase de los otros cuatro cierres. Sale el anuncio con dos puntos. |
| nueva · Esencial, Resultado | *(nuevo)* | Tu sitio saca más puntos en el chequeo gratis que el día en que partimos, y los robots de ChatGPT, Claude y Perplexity pueden entrar a él. | **Para Ramón**. Compromiso comercial nuevo del encargo: lo confirma Ramón. Los robots son los que prueba el chequeo (Claude, no Gemini). «Cada quince días te llega el informe…» es R2 y va al anexo A. |
| nueva · Esencial, Plazo | *(nuevo)* | Al cumplir los 3 meses del mínimo. | **Para Ramón**. Los «noventa días» pasan a los 3 meses del mínimo, que el sitio ya publica. Sale «mes a mes» (R2). |
| nueva · Esencial, Condición | *(nuevo)* | Alguien de tu equipo que apruebe los cambios en los plazos que acordemos. Si no se publican, el puntaje no se mueve. | **Para Ramón**. Lo que depende del cliente, con la forma de Método («Una contraparte»). Sale la referencia al informe (R2). |
| nueva · Pro, Resultado, plazo y condición | *(nuevo)* | Los del Esencial. | **Para Ramón**. El Pro del encargo: el mismo compromiso. Sale «más consultas medidas» (R2). |

Cambian 11. No cambian 71 (22 esperan R2).

### Gestión de redes sociales

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1158 | Definimos de qué habla tu marca, en qué formato y con qué cadencia, alineado a tu cliente y a tus objetivos de negocio. | Definimos de qué habla tu marca, en qué formato y con qué cadencia. | Relleno de consultora que repetía la entrada y el bloque 01. |
| 1159 | Gestión de la pauta social (social ads), desde el plan con Pauta | Gestión de la pauta social, desde el plan Orgánico + Pauta | «(social ads)» fuera (1.7). El plan con el nombre de su tarjeta (2.10). |
| 1160 | Armamos y ajustamos las campañas en Meta (Facebook e Instagram): audiencias, presupuesto y creatividades, sin encender gasto sin tu confirmación. | Armamos y ajustamos las campañas en Meta (Facebook e Instagram): audiencias, presupuesto y creatividades. No encendemos gasto sin tu confirmación. | La condición en una frase propia y en un solo lugar de la página. |
| 1162 | Moderamos comentarios y respondemos mensajes con tu tono, para que ninguna consulta de un posible cliente quede sin contestar. | Moderamos comentarios y respondemos mensajes con tu tono. | 5a y encargo: una garantía absoluta («ninguna consulta… sin contestar») sin un plazo de respuesta que la sostenga. |
| 1164 | Alcance útil, conversación, clics y contactos generados. Nada de métricas de vanidad ni capturas sueltas. | Alcance útil, conversación, clics y contactos generados. | «Métricas de vanidad» iba dos veces, y la coletilla calificaba la frase anterior (tic 1). |
| 1166 | Las piezas gráficas y el video los produces tú o un partner de confianza; nosotros orquestamos el brief, la revisión y la salida. | Las piezas gráficas y el video los produces tú o un partner de confianza; nosotros los revisamos antes de publicarlos. | «Orquestamos» es jerga de la bio (5b), y la serie de tres era de ritmo. |
| 1171 | Presencia con criterio en una plataforma, sin pauta. | Presencia en una plataforma, sin pauta. | «Con criterio» es un adjetivo sin referente. |
| 1178 | Presencia y pauta social para llegar más lejos. | Presencia en las dos plataformas, con pauta social. | Encargo: «para llegar más lejos» promete un alcance que no medimos. |
| 1179 | Todo lo del Orgánico, y más | Todo lo del Orgánico | Sin «y más». |
| 1186 | Todo lo anterior, y más | Todo lo del Orgánico + Pauta | Sin «y más». El plan con el nombre de su tarjeta. |
| 1189 | Integrado con SEO, IA y Paid Media | Integrado con SEO, visibilidad en IA y Paid Media (Google) | «IA» suelta se lee como «hecho con IA». Nombres de servicio del glosario. Igual en el Offer. |
| 1193 | Definimos objetivos, temas y cadencia. De ahí sale el calendario editorial y el brief que va a los partners de contenido. | A partir de tus objetivos armamos el calendario editorial y el brief para quien produce el contenido. | Repetía la lista y era una serie de ritmo. El brief vive ahora aquí. |
| 1196 | Publicamos según el calendario y gestionamos la pauta social: audiencias, presupuesto y ajustes, siempre con tu visto bueno antes de gastar. | Publicamos según el calendario y, si tu plan trae pauta, encendemos las campañas en Meta. | Repetía la condición, que ahora se dice una sola vez (#1160). |
| 1199 | Moderamos, respondemos mensajes y comentarios con tu tono, y derivamos a ventas las consultas que valen la pena. | Las consultas de posibles clientes que llegan por mensaje o en comentarios las derivamos a ventas. | Repetía la lista casi palabra por palabra. Queda lo propio del paso, con un criterio que se puede comprobar. |
| 1205 | No los producimos. Las piezas gráficas y el video los pones tú; si no los tienes, te conectamos con partners de producción. SpindleLab orquesta la estrategia, la pauta, la comunidad y los reportes, y hace que ese contenido salga con criterio y llegue a la gente correcta. | No los producimos. Las piezas gráficas y el video los pones tú; si no los tienes, te conectamos con partners de producción. Lo nuestro es la estrategia, la pauta, la comunidad y los reportes. | Va también al JSON-LD. «Orquesta» (5b) y una promesa de alcance que no medimos. |
| 1207 | LinkedIn y el ecosistema Meta (Facebook e Instagram). Elegimos dónde vale la pena estar según tu cliente y tu tipo de negocio, no por estar en todas. | LinkedIn y Meta (Facebook e Instagram). Elegimos dónde vale la pena estar según tu cliente y tu tipo de negocio, no por estar en todas. | Va también al JSON-LD. «El ecosistema» no agrega nada. |
| 1209 | Desde el plan Orgánico + Pauta. La gestión de la pauta social (social ads) es parte del servicio: definimos audiencias, montamos las campañas y las ajustamos. El manejo de Google Ads y la pauta de alta intención en buscadores viven en su propia pieza: Paid Media (Google). | Desde el plan Orgánico + Pauta. La gestión de la pauta social es parte del servicio: definimos audiencias, montamos las campañas y las ajustamos. Google Ads y la pauta en buscadores los manejamos en Paid Media (Google). | Va también al JSON-LD. §7:193 fijó la primera frase, que queda igual. «Pieza» por servicio (2.12) y «(social ads)» fuera. El enlace se conserva. |
| 1213 | El plan Orgánico parte en $390.000/mes + IVA y el Orgánico + Pauta en $590.000/mes + IVA; el plan a medida se cotiza tras una reunión. Los precios no incluyen la inversión en pauta, que la defines tú. Se dimensiona tras el diagnóstico gratuito. | El plan Orgánico parte en $390.000/mes + IVA y el Orgánico + Pauta en $590.000/mes + IVA; el plan a medida se cotiza tras una reunión. Los precios no incluyen la inversión en pauta, que la defines tú. El alcance lo fijamos después del mini-diagnóstico gratuito. | Va también al JSON-LD. Glosario 2.2: una forma por página. Precios idénticos. |
| 1214 | Pongamos tu marca en redes | Partimos por el sitio al que llevan tus redes | Repetía la entrada («Ponemos tu marca en redes») y era una invitación. Los otros cierres afirman. |
| 1227 | Multi-plataforma y mayor volumen: todo lo anterior con plataformas y cadencia a definir, integrado con SEO, IA y Paid Media. Se cotiza tras una reunión. | Multi-plataforma y mayor volumen: todo lo anterior con plataformas y cadencia a definir, integrado con SEO, visibilidad en IA y Paid Media (Google). Se cotiza tras una reunión. | **Simón** · va también al JSON-LD. El mismo arreglo de la tarjeta (#1189). |

Cambian 20. No cambian 53 (8 esperan R2).

### Paid Media (Google)

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1076 | Publicidad para capturar a quien ya está buscando lo que ofreces, con la intención de compra más alta. Manejamos tu cuenta de Google Ads optimizada con agentes de IA. | Un anuncio de búsqueda en Google sale cuando alguien busca lo que vendes, que es cuando está más cerca de comprar. Nosotros armamos y manejamos la cuenta. | Corregida al unificar. Sin verbo y en jerga («capturar», «intención de compra más alta»). Al unificar se reescribió: la versión de S2 repetía la pestaña de la home y la fila del índice, desde donde se llega (P86). Describe cómo funciona un anuncio de búsqueda, no promete que el tuyo salga. |
| 1077 | Todo lo que ponemos a trabajar | Lo que incluye la gestión | El título en palabras del visitante. «Todo» decía más que la lista. |
| 1079 | Qué buscas (leads, ventas, llamadas), con qué oferta y en qué orden. La estrategia primero, el gasto después. | Qué buscas (contactos, ventas, llamadas), con qué oferta y en qué orden. | Repetía el bloque 01 y el cierre. «Leads» pasa a «contactos», la palabra de Redes. |
| 1085 | Cuánto se invirtió, en qué y qué generó, en lenguaje de negocio y sin letra chica. | Cuánto se invirtió, en qué y qué generó, en lenguaje de negocio. | Tic 1: «y sin letra chica» se evaluaba a sí misma. |
| 1092 | Una campaña de búsqueda de alta intención, bien hecha. | Una campaña de búsqueda, para partir. | «Bien hecha» es una promesa sin referente. Queda para qué sirve el plan. |
| 1093 | Una campaña de búsqueda (Google Ads) | *(se borra)* | Repetía la tagline. La Offer sigue diciéndolo. |
| 1099 | Varias campañas y optimización avanzada, integrada a tu SEO y tu sitio. | Más de un objetivo a la vez. | La tagline repetía tres de sus cuatro puntos. |
| 1100 | Todo lo de la Esencial, y más | Todo lo de la Gestión Esencial | Sin «y más». El plan con el nombre de su tarjeta. |
| 1102 | Seguimiento de conversiones y optimización avanzada | Seguimiento de conversiones | «Optimización avanzada» no dice qué tiene de avanzada. La Offer la conserva (decide Simón). |
| 1106 | Cuentas grandes o multi-campaña, con volumen alto. | Cuentas grandes o con muchas campañas. | Prueba del 30 %: «volumen alto» repetía «cuentas grandes». |
| 1107 | Todo lo del Pro, y más | Todo lo de la Gestión Pro | Sin «y más». El plan con el nombre de su tarjeta. |
| 1114 | Definimos objetivo, oferta y estructura de cuenta antes de gastar un peso. Qué buscamos, a quién y con qué mensaje. | Definimos objetivo, oferta y estructura de cuenta antes de encender la primera campaña. | Repetía la lista y el cierre. Queda el orden, que es lo propio del paso. |
| 1117 | Montamos las campañas y afinamos la segmentación hacia quien de verdad puede comprarte. | Montamos las campañas y afinamos la segmentación. | Repetía la lista. «De verdad» era relleno. |
| 1120 | Revisamos el rendimiento a diario con agentes de IA: cortamos lo que no rinde, reforzamos lo que convierte y cazamos los defaults que juegan en contra de tu cuenta. | Revisamos el rendimiento a diario con agentes de IA. Cortamos lo que no rinde y desactivamos los ajustes que Google activa por defecto y que juegan en contra de tu cuenta. | Tic 2 y una serie de tres. «Defaults» en castellano, como la FAQ. «A diario» queda (1.10). |
| 1123 | Reporte claro de inversión y resultados. Cuando un canal rinde, escalamos con cabeza; cuando no, lo ajustamos o lo apagamos. | Con el reporte a la vista, si una campaña rinde te proponemos subirle el presupuesto; si no, la ajustamos o la apagamos. | Repetía el h3 de la lista. Encargo: el presupuesto lo fija el cliente, así que lo proponemos y no lo «escalamos». |
| 1128 | La pauta en Instagram y Facebook vive junto a la gestión de tus redes, porque comparte contenido, audiencia y comunidad: la manejamos en Gestión de redes sociales. Esta pieza se enfoca en Google, donde capturamos a quien ya está buscando lo que ofreces: la intención de compra más alta. | La pauta en Instagram y Facebook vive junto a la gestión de tus redes, porque comparte contenido, audiencia y comunidad: la manejamos en Gestión de redes sociales. Este servicio se enfoca en Google, donde llegamos a quien ya está buscando lo que ofreces. | Va también al JSON-LD. Un servicio no es una «pieza» (2.12). El nombre y el enlace que decidió §7:191 quedan iguales. |
| 1132 | Sí, y ahí está la diferencia. La pauta acelera lo que el orgánico ya mueve: enviamos el tráfico pagado a páginas trabajadas para convertir y lo medimos todo junto. Si el sitio al que llega ese tráfico no está trabajado, la pauta paga por visitas que se pierden. | Sí. Enviamos el tráfico pagado a páginas trabajadas para convertir y lo medimos todo junto. Si el sitio al que llega ese tráfico no está trabajado, la pauta paga por visitas que se pierden. | Va también al JSON-LD. Tic 1 («y ahí está la diferencia»), y repetía la frase cerrada de la lista (R4). |

Cambian 17. No cambian 55.

### Método

| # | Antes | Después | Por qué |
|---|---|---|---|
| 673 | Todo parte con tu URL y el chequeo de 21 señales, el mismo que puedes correr tú en segundos. Después revisamos el sitio a mano (rastreo, indexación, velocidad, datos estructurados y señales de confianza) y sintetizamos los hallazgos más relevantes en un mini-diagnóstico de una página. Y conversamos 20 minutos para entender tu negocio y las búsquedas que te importan. | Todo parte con tu URL y el chequeo de 21 señales, el mismo que puedes correr tú en segundos. Después revisamos el sitio a mano (rastreo, indexación, velocidad, datos estructurados y señales de confianza) y conversamos 20 minutos para entender tu negocio y las búsquedas que te importan. | Lo mismo que dice el dato de abajo («Recibes: Mini-diagnóstico de una página…»). |
| 682 | Con la base técnica clara, medimos tu presencia en los motores de IA: ejecutamos las preguntas que haría tu cliente ideal en ChatGPT, Gemini y Perplexity, documentamos quién gana esas respuestas hoy, y diseñamos la hoja de ruta para que los modelos te citen y recomienden (claridad de entidad, contenido citable y autoridad). | Con la base técnica clara, medimos tu presencia en los motores de IA: hacemos en ChatGPT, Gemini y Perplexity las preguntas que haría tu cliente y vemos quién gana hoy esas respuestas. Con eso armamos la hoja de ruta para que los modelos puedan citarte. | Corregida al unificar. Encargo del 14-oct y «Sin promesas mágicas»: «puedan citarte», no «te citen». Sale una segunda serie de tres. Al unificar, «tu cliente ideal» pasa a «tu cliente», como en Visibilidad. |
| 688 | Ejecutamos los cambios técnicos y de contenido en conjunto con tu equipo: correcciones de indexación y velocidad, datos estructurados listos para pegar, y páginas reestructuradas para responder preguntas con formato citable. Tú decides el ritmo: entrega de especificaciones para tu equipo, o ejecución directa nuestra. | Los cambios son técnicos y de contenido: correcciones de indexación y velocidad, datos estructurados listos para pegar y páginas reestructuradas para responder preguntas en formato citable. Tú decides si los ejecuta tu equipo, con nuestras especificaciones, o los ejecutamos nosotros. | Lo que se decide es quién ejecuta, no el ritmo. |
| 689 | Según alcance: típicamente 2 a 6 semanas | 2 a 6 semanas, según el alcance | Calco de «typically». Cifra idéntica. |
| 701 | Nunca entregamos 200 hallazgos sin jerarquía. Primero lo que mueve resultados; lo cosmético, al final o nunca. | Nunca entregamos hallazgos sin jerarquía. Primero lo que más te frena; lo cosmético, al final o nunca. | Cifra sin respaldo, la que §7:193 ya sacó de Servicios. «Lo que más te frena» es la fórmula del sitio (§7:250). |
| 709 | Con eso parte el diagnóstico gratuito. | Con eso parte el mini-diagnóstico. | Glosario 2.2: una forma por página. |
| 713 | Google Search Console y Analytics para la auditoría completa. Nunca pedimos accesos de administrador. | Google Search Console, y Analytics si lo tienes, para la auditoría completa. Nos agregas como usuario y nunca te pedimos tu contraseña. | 5a: «Nunca pedimos accesos de administrador» choca con onboarding-cliente.md, que en Acompañamiento pide un usuario de CMS con rol admin. La regla real es usuario propio y nunca la contraseña. |
| 717 | Envíanos tu URL y en 24 horas tienes el mini-diagnóstico. Los otros tres pasos, solo si el primero te convence. | Envíanos tu URL y en 24 horas tienes el mini-diagnóstico. Las otras tres fases, solo si la primera te convence. | Una sola palabra para las etapas del método: «fase», como el botón y la nota. |

Cambian 8. No cambian 57 (8 esperan R2).

### Chequeo gratis (Diagnóstico)

| # | Antes | Después | Por qué |
|---|---|---|---|
| 616 | 21 chequeos, 100 puntos. Tres bloques, con su peso a la vista: leerte 30, entenderte 40, citarte 30. | 21 chequeos, 100 puntos. Tres bloques: leerte 30, entenderte 40, citarte 30. | Lo dicen los números y el rótulo de abajo. Cifras idénticas. |
| 632 | Quienes aparecen recomendados casi nunca lo consiguen desde su propio sitio: los motores los citan desde rankings, directorios y artículos de terceros. Sin saber de dónde sale la recomendación, no hay nada que trabajar. | Los motores citan rankings, directorios y artículos de terceros, y no solo el sitio de quien recomiendan. Si no sabes de dónde sale la recomendación, no sabes qué trabajar. | 5a: «casi nunca lo consiguen desde su propio sitio» dice más que su fuente (test-menciones-ia.md:77, «no solo»). |
| 636 | Automático, en segundos, sobre tu sitio. Te dice si estás técnicamente listo y qué corregir primero. | Automático y en segundos. Te dice si tu sitio está técnicamente listo y qué corregir primero. | A3: era una segunda serie de tres en la página. |
| 651 | No. Este chequeo mide si tu sitio está preparado, no si hoy te citan. Los motores arman sus respuestas con fuentes de terceros (rankings, directorios, artículos), no solo con tu sitio. Puedes estar impecable por dentro y aun así no aparecer. Qué fuentes te faltan es justo lo que revisa el mini-diagnóstico. | No. Puedes estar impecable por dentro y aun así no aparecer, porque los motores también arman sus respuestas con lo que publican otros sitios. Qué fuentes te faltan es lo que revisa el mini-diagnóstico. | Va también al JSON-LD. A10: repetía la respuesta de arriba, la nota de «Lo que este chequeo no mide» y la lista de las corridas. |
| 653 | No guardamos el dominio consultado ni te pedimos datos. El chequeo lee únicamente páginas públicas de tu sitio, las mismas que lee cualquier buscador. | No guardamos el dominio consultado ni te pedimos datos. | Va también al JSON-LD. A10: repetía la nota del instrumento (el mismo criterio de §7:164). Comprobado que chequeo.js no guarda nada. |

Cambian 5. No cambian 46 (2 esperan R2).

### Contacto

| # | Antes | Después | Por qué |
|---|---|---|---|
| 574 | Email | Correo | «Email» con palabra aquí (1.7). El name del campo no cambia. |
| 581 | Te escribimos dentro de 24 horas con tu mini-diagnóstico. | Te escribimos dentro de 24 horas con tu mini-diagnóstico, o para conversar tu proyecto si partes de cero. | La ayuda del campo invita a escribir «no tengo», y la confirmación le prometía un diagnóstico de un sitio que no existe. |
| 586 | Un correo con tu URL basta. Si quieres, agrega contexto: qué vendes, quién es tu cliente, qué te preocupa. | Un correo con tu URL basta. Si quieres, cuéntanos qué vendes y qué te preocupa de tu sitio. | Decidido en §7:189 y sin aplicar: palabra por palabra. |
| 594 | ¿El diagnóstico es realmente gratis? | ¿El mini-diagnóstico es realmente gratis? | **Simón** · va también al JSON-LD. Glosario 2.2: el h2, el botón y la respuesta dicen «mini-diagnóstico». |
| 595 | Sí: una página con los hallazgos más relevantes de tu sitio, en 24 horas, sin costo ni compromiso. Es nuestra forma de demostrar cómo trabajamos antes de que decidas nada. | Sí. Es nuestra forma de mostrarte cómo trabajamos antes de que decidas nada. | Va también al JSON-LD. La única «sin costo ni compromiso» viva del sitio. Lo demás repetía la línea y el paso 02. |
| 597 | Solo la URL de tu sitio. Con eso generamos el mini-diagnóstico; si después quieres la auditoría completa, pediremos acceso de lectura a Search Console. | Solo la URL de tu sitio. Con eso hacemos el mini-diagnóstico; si después quieres la auditoría completa, te pedimos acceso de lectura a Search Console. | Va también al JSON-LD. «Generamos» lo hace sonar automático, y el mini-diagnóstico se hace a mano. |

Cambian 6. No cambian 31.

### Nosotros

| # | Antes | Después | Por qué |
|---|---|---|---|
| 736 | Detrás de SpindleLab está Ramón Vallejos: SEO técnico y visibilidad en motores de IA, con evidencia antes que promesas. | Detrás de SpindleLab está Ramón Vallejos: SEO técnico y visibilidad en motores de IA. | Repetía el h1 de justo arriba. La meta, decidida, conserva su frase. |

Cambian 1. No cambian 17.

### Trabajo

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1331 | Pon tu dominio y ves en segundos si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio, sea cual sea el rubro. Es el mismo chequeo con el que partimos cada proyecto. | Si ya tienes un sitio, sea cual sea tu rubro, con el chequeo gratis ves en segundos qué le muestra tu sitio a la IA. Es el mismo chequeo con el que partimos cada proyecto. | Corregida al unificar. P86: repetía la primera línea de Diagnóstico, adonde lleva el botón. Al unificar se agregó «el chequeo gratis» para que la frase decidida «Es el mismo chequeo…» tenga referente. |
| 1332 | Si hay que construirlo de nuevo, eso es Desarrollo web: tres planes, y el valor final se cierra tras el diagnóstico gratuito. | Si hay que construirlo de nuevo, eso es Desarrollo web: cuatro planes, y el valor final se cierra cuando conversamos tu proyecto. | Corregida al unificar. Sigue a la Desarrollo web nueva, con cuatro planes y el valor que se cierra al conversar (H #979 y #982). |
| nueva · ficha de Verifica y Cumple | *(nuevo)* | Antes de publicarlo lo corrimos sobre nuestro propio sitio: spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026. El 14 de octubre sacó 100. Entre una fecha y otra también cambió la forma de puntuar. | **Para Ramón**. Encargo del 14-oct, §4: copy nuevo con cifra pública, lo confirma Ramón. La medición es la del chequeo de la Ley 21.719 y no la del hero. Por eso va en la ficha de Verifica y Cumple y dice que la forma de puntuar cambió. Variantes y fechas en el anexo D. |

Cambian 3. No cambian 29.

### Blog (índice y los 7 artículos, fuera de los cuerpos)

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1455 | Pon tu dominio y ves en segundos si una IA te puede leer, si te entiende y si te puede citar. | El chequeo revisa 21 señales de tu dominio en segundos, gratis. Cada señal que no pases viene con la instrucción para arreglarla. | P86: Diagnóstico abre con casi la misma frase. Nombra «El chequeo» para que la frase decidida de abajo tenga referente. |

Cambian 1. No cambian 35.

### Común: menú, pie y piezas repetidas

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1472 | Pedir el diagnóstico gratis | Pedir el diagnóstico | Hoja §3: §7:192 decidió la estructura del cierre, no la palabra. La guía de encima ya dice «mini-diagnóstico gratuito». Vale para los cinco servicios. |
| nueva · rótulos del bloque | *(nuevo)* | Resultado · Plazo · Condición | Encargo del 14-oct: el rótulo del bloque, igual en las cuatro páginas que lo llevan. Si dos líneas son iguales a las del plan anterior, se juntan («Plazo y condición»). |
| 1359 | Estudio de diseño y SEO técnico en Santiago. Construimos el sitio y dejamos resuelto que las máquinas que hoy recomiendan tu negocio puedan leerlo. | Estudio de diseño y SEO técnico en Santiago. Trabajamos para que tu empresa aparezca cuando tus clientes preguntan, en Google y en los motores de IA. | P86: la fórmula de la línea cerrada del campo Desarrollo no se repite fuera de ahí, y el menú está en las 21 rutas. Va el posicionamiento del manual §01, con «trabajamos para que». |
| 1377 | Si quieres hablar de tu sitio, escríbenos. | Hablemos de tu sitio. | Hoja §3: el texto pegado al botón repetía su verbo. 21 rutas. |
| 1444 | Revisando... | Revisando… | Puntos suspensivos «…» (1.12): era el único «...» que quedaba. v3-chequeo.js va con ?v=3. |

Cambian 5. No cambian 79 (1 espera R2).

---

## Anexo A · R2, escrita sobre el texto nuevo

**Las dos preguntas** (`lista-publicacion.md`, sección 0):
- **R2.1:** ¿se promete medir menciones en IA en los planes pagados? La regla del 27-sep dice
  que la vigilancia de menciones no entra en la promesa, y `capacidad-servicios.md:55` la marca
  ❌.
- **R2.2:** el informe del Acompañamiento Esencial, ¿es quincenal o mensual? Hoy el sitio dice
  las dos cosas para el mismo plan.

**Cómo se usa.** Cada fila trae el texto de cada lugar para cada respuesta. Diego aplica en P0.2
una columna de cadencia, y además la última si la respuesta a R2.1 es «no se promete».

- «=» quiere decir que el texto queda como hoy.
- «[cadencia]» es la palabra que salga de R2.2.
- «se borra» deja la hoja en "" (la plantilla filtra los vacíos).

**Qué más se arregla en el mismo paso.** Los textos nuevos también arreglan lo que el pase de
voz no pudo tocar en las ranuras R2: el remate «Sin permanencias largas ni letra chica», la serie
de tres de la entrada de Acompañamiento, «Retainer» y «share-of-voice» (1.7) y «el plan con
Pauta» (2.10).

**Lo que hay que saber antes de aplicar.**
- **Si es mensual,** asumo que vale para los tres planes del Acompañamiento, porque la página
  dice «Todos los planes traen…». Si quieres el Esencial mensual y el Pro quincenal, la nota de
  planes se reescribe aparte.
- **Si es quincenal,** lo que cambia es Visibilidad, que hoy dice «Informe mensual» para el mismo
  Esencial.
- **El conteo de cadencia cambia a propósito** cuando se aplica R2. La aserción del paso 7 se
  vuelve a medir sobre el resultado de P0.2.
- **Si no se promete el monitoreo, se pierden enlaces.** El de «protocolo público»
  (`/v3/diagnostico/#s-nom`, §7:191 y :197) desaparece de Acompañamiento, Visibilidad y Método,
  porque la frase que lo lleva se va. En ninguna de las tres queda otro.

### Home e índice de servicios

| # | Hoy | Quincenal | Mensual | Si no se promete el monitoreo |
|---|---|---|---|---|
| 19 y 787 (misma hoja; la home le antepone «Ya giras y quieres sostenerlo.») | Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA. | = | Implementación continua e informes mensuales de SEO técnico o de visibilidad en IA. | = la de la cadencia |

### Acompañamiento mensual

| # | Hoy | Quincenal | Mensual | Si no se promete el monitoreo |
|---|---|---|---|---|
| 817 línea | Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA, desde $590.000/mes + IVA; las dos juntas, desde $790.000/mes + IVA. Mínimo 3 meses. | = | …e informes mensuales de SEO técnico… (el resto igual) | = la de la cadencia |
| 818 nota | Valores en pesos, + IVA. Cumplidos los 3 meses, mes a mes con aviso de 30 días. | = | = | = (aquí «mes a mes» es el contrato, no el informe) |
| 819 entrada | Una auditoría te dice qué hacer; este servicio lo hace y lo sostiene. Implementación continua, contenido que posiciona en Google y en las respuestas de IA, y medición quincenal para que cada mes sepas exactamente qué avanzó. | Hacemos lo que la auditoría deja escrito y lo sostenemos en el tiempo. Cada quince días te llega un informe con lo que avanzó. | Hacemos lo que la auditoría deja escrito y lo sostenemos en el tiempo. Cada mes te llega un informe con lo que avanzó. | = la de la cadencia (sale la serie de tres y deja de repetir el h2 del cierre) |
| 825 h3 | Monitoreo doble | = | = | Seguimiento de posiciones |
| 826 | Posiciones clásicas y presencia en respuestas de IA, medidas quincenalmente con nuestro protocolo público. | = | …medidas cada mes con nuestro protocolo público. | Tus posiciones en Google, medidas [cada quince días \| cada mes] con tu Search Console. (sale el enlace) |
| 827 h3 | Informe quincenal en lenguaje de negocio | = | Informe mensual en lenguaje de negocio | = la de la cadencia |
| 828 | Qué se hizo, qué se movió y qué sigue. Una página, sin jerga, lista para reenviar a gerencia. | = | = | = |
| 833 nota de planes | Todos los planes traen lo de arriba (implementación, contenido, monitoreo doble, informe quincenal y reunión mensual). Se diferencian en cuánta cobertura y volumen. Mínimo 3 meses; después, mes a mes con aviso de 30 días. | Todos los planes traen lo de arriba (implementación, contenido, monitoreo doble, informe quincenal y reunión mensual) y se diferencian en cobertura y volumen. | …(implementación, contenido, monitoreo doble, informe y reunión mensuales) y se diferencian en cobertura y volumen. | …(implementación, contenido, seguimiento de posiciones, informe [quincenal \| mensual] y reunión mensual) y se diferencian en cobertura y volumen. (En las tres sale el mínimo, que ya dicen la línea y la nota de la entrada) |
| 838 Esencial | ~10 consultas medidas al mes en IA | = | = | se borra |
| 840 Esencial | Informe quincenal + reunión mensual | = | Informe y reunión mensuales | = la de la cadencia |
| nueva · Esencial, 2.ª frase del Resultado (solo si confirmas el compromiso de los 3 meses; igual en Visibilidad) | (no existe) | Cada quince días te llega el informe, con el puntaje de hoy al lado del de la quincena anterior. | Cada mes te llega el informe, con el puntaje de hoy al lado del que tenías el mes anterior. | = la de la cadencia (es el puntaje del chequeo, no menciones) |
| 845 Pro | ~20 consultas medidas al mes (+ AI Overviews) | = | = | se borra |
| 847 Pro | Share-of-voice frente a tus competidores | Tu presencia en IA comparada con la de tus competidores | igual que quincenal | se borra |
| 860 h3 | Semana 2: Primer informe | = | Semana 2: Implementación | = la de la cadencia |
| 861 | Medición quincenal: posiciones, menciones en IA y estado de lo implementado. | = | Seguimos con las mejoras del foco del mes. | quincenal: «Primer informe: posiciones y estado de lo implementado.» · mensual: = la de la cadencia |
| 867 | Segundo informe + reunión mensual: qué avanzó y qué priorizamos ahora. | = | Informe y reunión mensual: qué avanzó y qué priorizamos ahora. | = la de la cadencia |
| 871 pregunta (Simón) | ¿Qué incluye el mes a mes? | = | = | = |
| 872 respuesta y FAQPage | Implementación priorizada, contenido optimizado para búsqueda e IA, monitoreo de posiciones y menciones en IA, informes quincenales en lenguaje de negocio y una reunión mensual de decisiones. | = | …informes mensuales en lenguaje de negocio… | Implementación priorizada, contenido optimizado para búsqueda e IA, seguimiento de tus posiciones en Google, informes [quincenales \| mensuales] en lenguaje de negocio y una reunión mensual de decisiones. |
| 876 respuesta y FAQPage | Cumplido el mínimo de tres meses, el servicio es mes a mes y puedes pausar o salir avisando con 30 días. Sin permanencias largas ni letra chica. | Cumplido el mínimo de tres meses, el servicio es mes a mes y puedes pausar o salir avisando con 30 días. | igual que quincenal | igual que quincenal (sale el remate, tic 1) |
| 884 meta (Simón) | Consultoría mensual de SEO técnico y visibilidad en IA: implementación continua, contenido optimizado e informes quincenales. Mínimo 3 meses. | = | …e informes mensuales. Mínimo 3 meses. | = la de la cadencia |
| 889 Offer Esencial (Simón) | Retainer mensual sobre una capa (SEO técnico o visibilidad en IA): implementación priorizada, ~10 consultas medidas al mes, informe quincenal y reunión mensual. | Plan mensual sobre una capa (SEO técnico o visibilidad en IA): implementación priorizada, ~10 consultas medidas al mes, informe quincenal y reunión mensual. | Plan mensual sobre una capa (…): implementación priorizada, ~10 consultas medidas al mes, informe y reunión mensuales. | Plan mensual sobre una capa (SEO técnico o visibilidad en IA): implementación priorizada, informe [quincenal \| mensual] y reunión mensual. |
| 891 Offer Pro (Simón) | Las dos capas juntas (SEO técnico + visibilidad en IA): ~20 consultas medidas al mes con AI Overviews, contenido citable mensual y share-of-voice vs competidores. | Las dos capas juntas (SEO técnico + visibilidad en IA): ~20 consultas medidas al mes con AI Overviews, contenido citable mensual y tu presencia frente a la de tus competidores. | igual que quincenal | Las dos capas juntas (SEO técnico + visibilidad en IA), con contenido citable cada mes. |

### Visibilidad en IA

| # | Hoy | Quincenal | Mensual | Si no se promete el monitoreo |
|---|---|---|---|---|
| 1242 h3 | Acceso y medición | = | = | Acceso de los robots |
| 1243 | Configuramos el acceso correcto para los bots de IA (robots.txt, políticas) y dejamos instalado un protocolo de medición repetible para seguir tu evolución mes a mes. | = | = | Configuramos el acceso correcto para los robots de IA (robots.txt y políticas) y dejamos anotada la línea base con fecha. |
| 1245 nota de planes | Incluido en todo plan: medición real de menciones en IA con nuestro protocolo público y reproducible (mismas consultas, mismos motores, misma cadencia), informe en lenguaje de negocio y cero prueba inventada. Solo lo que la IA de verdad responde. | Todos los planes miden tus menciones en IA con nuestro protocolo público (las mismas consultas, en los mismos motores y con la misma cadencia) y te lo entregan en lenguaje de negocio, sin pruebas inventadas. | igual que quincenal | Todos los planes parten de la línea base con fecha y se entregan en lenguaje de negocio, sin pruebas inventadas. (sale el enlace) |
| 1256 Esencial | Medimos y optimizamos mes a mes para que te empiecen a citar. | Medimos y optimizamos mes a mes, sobre lo que encontró la auditoría. | igual que quincenal | Optimizamos mes a mes, sobre lo que encontró la auditoría. |
| 1258 Esencial | ~10 consultas medidas al mes, en 3 motores | = | = | se borra |
| 1261 Esencial | Informe mensual en lenguaje de negocio | Informe quincenal en lenguaje de negocio | = | = la de la cadencia |
| 1264 Pro | Cobertura completa y share-of-voice contra tu competencia. | Más consultas y más motores, comparados con tu competencia. | igual que quincenal | Más keywords y el trabajo de autoridad fuera de tu sitio. |
| 1266 Pro | ~20 consultas medidas al mes, en 4 motores (+ AI Overviews) | = | = | se borra |
| 1268 Pro | Share-of-voice frente a tus competidores | Tu presencia comparada con la de tus competidores | igual que quincenal | se borra |
| 1269 Pro | Autoridad de entidad y menciones externas | = | = | = (es trabajo fuera del sitio, no medición) |
| 1305 Offer Esencial (Simón) | Retainer mensual: ~10 consultas medidas al mes en 3 motores, hasta 8 keywords, contenido citable e informe mensual. | Plan mensual: ~10 consultas medidas al mes en 3 motores, hasta 8 keywords, contenido citable e informe quincenal. | Plan mensual: ~10 consultas medidas al mes en 3 motores, hasta 8 keywords, contenido citable e informe mensual. | Plan mensual: hasta 8 keywords, contenido citable, claridad de entidad e informe [quincenal \| mensual]. |
| 1307 Offer Pro (Simón) | Retainer mensual: ~20 consultas medidas al mes en 4 motores (incluye AI Overviews), hasta 15 keywords, share-of-voice vs competidores y autoridad de entidad. | Plan mensual: ~20 consultas medidas al mes en 4 motores (incluye AI Overviews), hasta 15 keywords, presencia frente a tus competidores y autoridad de entidad. | igual que quincenal | Plan mensual: hasta 15 keywords, contenido citable y autoridad de entidad. |
| 1275 h3 y 1276 (no son R2 en el inventario, pero dependen de R2.1) | Prometemos: Medición seria · Sabrás si avanzas y contra quién, sin depender de un pantallazo suelto. | = | = | Prometemos: Una línea base con fecha · Sabes desde dónde partes y contra quién, sin depender de un pantallazo suelto. |
| 1289 respuesta y FAQPage (no es R2 en el inventario; la pregunta es de Simón) | Les hacemos periódicamente a los principales motores las mismas preguntas que haría tu cliente y registramos si apareces, cómo te describen y a quién citan. | = | = | En la Auditoría de Visibilidad les hacemos a los principales motores las preguntas que haría tu cliente y registramos, con fecha, si apareces, cómo te describen y a quién citan. |

Con R2 resuelta y R2.1 en «se promete», Visibilidad queda con un solo «protocolo… repetible»: el
de #1243 o el de #1245, a elección. El doble de §7:193 queda cerrado.

### Chequeo gratis (Diagnóstico)

| # | Hoy | Quincenal | Mensual | Si no se promete el monitoreo |
|---|---|---|---|---|
| 630 | No mide si hoy te citan: para eso hay que preguntarle a los motores. En los planes con acompañamiento lo hacemos cada mes con las mismas preguntas y en los mismos motores, con fecha y con la fuente de cada respuesta registrada. Cambiar las preguntas rompería la comparación entre meses. | …lo hacemos cada quince días con las mismas preguntas… Cambiar las preguntas rompería la comparación entre una medición y otra. | = | No mide si hoy te citan: para eso hay que preguntarle a los motores. Lo hacemos a mano en el mini-diagnóstico y en la Auditoría de Visibilidad, con fecha y con la fuente de cada respuesta registrada. |
| 649 respuesta y FAQPage | …No mide si hoy te citan: eso depende de menciones en fuentes externas y se revisa en el mini-diagnóstico. | = | = | = |

### Método

«Estrategia de visibilidad en IA», en lugar de «estrategia AEO/GEO», lo decide Simón (hoja
2.11). Si lo veta, queda «estrategia AEO/GEO» en todas estas filas y en el h3 #681.

| # | Hoy | Quincenal | Mensual | Si no se promete el monitoreo |
|---|---|---|---|---|
| 665 línea | Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. | Cuatro fases que se miden: diagnóstico técnico, estrategia de visibilidad en IA, implementación y monitoreo. | igual que quincenal | …implementación y seguimiento. |
| 670 h2 (Simón) | Del diagnóstico al monitoreo | = | = | Del diagnóstico al seguimiento |
| 693 h3 y HowToStep.name (Simón) | Monitoreo | = | = | Seguimiento |
| 694 | Cada quince días medimos menciones en IA con nuestro protocolo público, repetible por cualquiera, además de posiciones clásicas en Google y tráfico orgánico, y te lo reportamos en una página en lenguaje de negocio. La reunión mensual define las prioridades del ciclo siguiente. | = | Cada mes medimos menciones en IA con nuestro protocolo público… (el resto igual) | Cada [quince días \| mes] medimos tus posiciones en Google y el tráfico orgánico, y te lo reportamos en una página en lenguaje de negocio. La reunión mensual define las prioridades del ciclo siguiente. (sale el enlace) |
| 696 «Frecuencia» | Informes quincenales · Reunión mensual | = | Informe y reunión mensuales | = la de la cadencia |
| 723 meta (Simón) | Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Conoce el método de trabajo de SpindleLab paso a paso. | Cuatro fases que se miden: diagnóstico técnico, estrategia de visibilidad en IA, implementación y monitoreo. Conoce el método de trabajo de SpindleLab fase por fase. | igual que quincenal | …implementación y seguimiento… |
| 726 HowTo.description (Simón) | El Método SpindleLab es el proceso de cuatro fases de SpindleLab para llevar un sitio de la invisibilidad a ser citado en Google y en las respuestas de los motores de IA (AEO/GEO): diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Es un ciclo repetible y cada fase se mide. | El Método SpindleLab es el proceso de cuatro fases con que SpindleLab prepara un sitio para que Google y los motores de IA (AEO/GEO) puedan leerlo, entenderlo y citarlo: diagnóstico técnico, estrategia de visibilidad en IA, implementación y monitoreo. Es un ciclo repetible y cada fase se mide. | igual que quincenal | …implementación y seguimiento… (sale la promesa de «ser citado», encargo del 14-oct, en las tres) |
| 730 HowToStep.text (Simón) | Cada quince días medimos menciones en IA, posiciones en Google y tráfico orgánico contra la línea base, y lo reportamos en lenguaje de negocio. El ciclo se repite: el monitoreo alimenta el siguiente diagnóstico. | = | Cada mes medimos menciones en IA… (el resto igual) | Cada [quince días \| mes] medimos posiciones en Google y tráfico orgánico contra la línea base, y lo reportamos en lenguaje de negocio. El ciclo se repite: el seguimiento alimenta el siguiente diagnóstico. |

### Gestión de redes sociales (fuera de R2.1 y R2.2)

Los reportes quincenales de Redes caen en R2 solo por la palabra. No dependen de ninguna de las
dos preguntas, y se quedan quincenales con cualquier respuesta. En P0.2 van tres arreglos de voz
que hoy no se pueden aplicar, porque estas ranuras son R2:

| # | Hoy | Con cualquier respuesta |
|---|---|---|
| 1163 y 1164 (una hoja, que la plantilla parte en h3 y párrafo) | Reportes quincenales con métricas que importan: alcance útil, conversación, clics y contactos generados. | Reportes quincenales: alcance útil, conversación, clics y contactos generados. («métricas que importan» salía tres veces) |
| 1168 nota de planes | …La gestión de pauta social entra desde el plan con Pauta; la inversión publicitaria va aparte. | …La gestión de pauta social entra desde el plan Orgánico + Pauta; la inversión publicitaria va aparte. (2.10) |
| 1202 | Cada quincena entregamos un reporte de las métricas que importan y ajustamos el plan según lo que de verdad funcionó. | Cada quincena te entregamos el reporte y ajustamos el plan con lo que funcionó. |
| 1155, 1175, 1190, 1211, 1223 | (cadencia de redes) | = |

### Fuera de E8, y alcanzado por R2.1

- **La bio de Nosotros (R4, cerrada)** dice «Mido si te recomiendan» y «Registro si ChatGPT,
  Gemini y Perplexity te nombran ante las preguntas de tus clientes». Si R2.1 es «no se promete»,
  esas líneas también prometen algo que no se entrega. Hay una variante en el anexo C.
- **`public/llms.txt:13` y `:18`** van en P11 (anexo B).
- **El veredicto de 70 a 89 del chequeo** («…huecos que te cuestan menciones», #1429) no promete
  medir. Se queda con cualquier respuesta.

---

## Anexo B · Borrador de `llms.txt` para P11

No se aplica. Depende de R1 (va solo si el v3 va a la raíz) y de R2. Va escrito con las URL de la
raíz y con los nombres y el orden de `SERVICIOS_V3`. Cumple las tres verificaciones de P11:
- no dice «agencia de marketing con IA»;
- no dice «cinco preguntas fijas»;
- nombra `/trabajo/`.

Los corchetes se resuelven con R2. Lo revisa Simón y lo aprueba Ramón en la lectura de P0.4.

```text
# SpindleLab

> Estudio chileno de desarrollo web, SEO técnico y visibilidad en motores de IA. Trabajamos para que las empresas aparezcan cuando sus clientes preguntan, en Google y en los motores de IA. El primer paso es gratis: un chequeo automático del sitio y un mini-diagnóstico de una página en 24 horas.

SpindleLab construye sitios que los motores de IA pueden leer y trabaja la visibilidad en IA de sitios que ya existen, con el SEO técnico como base. Mide antes de prometer, no promete el primer lugar en ChatGPT ni en Google y no usa prueba social inventada. Los precios están publicados en cada servicio.

## Chequeo gratis de visibilidad en IA

Herramienta gratuita y sin registro: https://spindlelab.cl/diagnostico/

Revisa en segundos si los robots con que ChatGPT, Claude y Perplexity buscan en vivo (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot y Perplexity-User) pueden entrar a un sitio, y si la IA puede entender qué hace la empresa y citarla. Son 21 chequeos en tres bloques con peso publicado: leerte (30 puntos), entenderte (40) y citarte (30). Devuelve un puntaje de 0 a 100 y, por cada chequeo que no se pasa, la instrucción para arreglarlo. No guarda el dominio consultado.

El chequeo no mide si hoy te citan. Para eso hay que preguntarles a los motores: [si R2.1 = se promete] lo hacemos en el mini-diagnóstico y, en los planes con acompañamiento, [cada quince días | cada mes], con las mismas preguntas en los mismos motores y con fecha y fuente registradas. [si R2.1 = no] lo hacemos a mano en el mini-diagnóstico y en la Auditoría de Visibilidad.

## Servicios
- [Desarrollo web](https://spindlelab.cl/servicios/desarrollo-web/): sitios a medida con el SEO técnico desde el primer commit, legibles para los motores de IA. Cuatro planes, desde $390.000 + IVA.
- [Visibilidad en IA](https://spindlelab.cl/servicios/visibilidad-en-ia/): para un sitio que ya existe: línea base de presencia en ChatGPT, Gemini y Perplexity, claridad de entidad, contenido citable y acceso de los robots. Desde $400.000 + IVA.
- [Auditoría SEO técnica](https://spindlelab.cl/servicios/auditoria-seo-tecnica/): rastreo, indexación, Core Web Vitals, datos estructurados y señales de confianza, con el plan priorizado por impacto y el código listo para tu equipo. Desde $490.000 + IVA.
- [Acompañamiento mensual](https://spindlelab.cl/servicios/acompanamiento-mensual/): implementación continua de SEO técnico o de visibilidad en IA, con informe [quincenal | mensual][si R2.1 = se promete: y medición de menciones en IA]. Desde $590.000/mes + IVA, mínimo 3 meses.
- [Gestión de redes sociales](https://spindlelab.cl/servicios/redes-sociales/): estrategia, comunidad, pauta social y reportes en LinkedIn y Meta. El contenido creativo lo pone el cliente. Desde $390.000/mes + IVA.
- [Paid Media (Google)](https://spindlelab.cl/servicios/paid-media/): gestión de campañas de búsqueda en Google Ads, con el presupuesto bajo control del cliente. Desde $350.000/mes + IVA.

## Blog
- [Los 21 chequeos de visibilidad en IA, explicados uno por uno](https://spindlelab.cl/blog/21-chequeos-visibilidad-ia/): qué mide cada chequeo del instrumento público, cuánto pesa y cómo se arregla.
- [Cómo elegir (y verificar) una agencia de AEO/GEO en Chile](https://spindlelab.cl/blog/como-elegir-verificar-agencia-aeo-geo-chile/): los seis criterios que exigir y cómo comprobar cada uno. No es un ranking.
- [AEO y GEO explicados para gerentes que no son técnicos](https://spindlelab.cl/blog/que-es-aeo-geo/): qué son, en qué se diferencian del SEO y cuándo actuar.
- [¿Cómo lograr que tu empresa aparezca en las respuestas de ChatGPT?](https://spindlelab.cl/blog/como-aparecer-en-chatgpt/): qué mira un motor generativo antes de recomendar una empresa.
- [¿Cuánto cuesta el SEO técnico en el mercado chileno en 2026?](https://spindlelab.cl/blog/cuanto-cuesta-seo-tecnico-chile/): rangos de precio para auditoría técnica y visibilidad en IA.
- [¿Qué es un mini-diagnóstico SEO y qué incluye?](https://spindlelab.cl/blog/que-es-un-mini-diagnostico-seo/): qué incluye y qué no el mini-diagnóstico gratuito de una página.
- [SEO técnico para fintechs chilenas: los 7 problemas que más se repiten](https://spindlelab.cl/blog/seo-tecnico-fintechs-chile/): patrones recurrentes al auditar sitios financieros en Chile.

## Sobre
- [Método](https://spindlelab.cl/metodo/): las cuatro fases de trabajo, con lo que cuesta cada una.
- [Trabajo](https://spindlelab.cl/trabajo/): sitios construidos, con cuál es de un cliente, cuál es producto propio y cuál es un ejercicio de concepto.
- [Nosotros](https://spindlelab.cl/nosotros/): quién está detrás de SpindleLab.
- [Contacto](https://spindlelab.cl/contacto/): pide el mini-diagnóstico gratis (24 horas).
```

Notas para Simón:
- Los precios son los de `oferta-v3.json`. Si alguno cambia antes del corte, cambia aquí también.
- «Gemini» sale solo donde se le pregunta a mano (hoja 2.12).
- Los títulos de los siete artículos son los de `_indice.json`, sin cambios.

---

## Anexo C · Opciones para R4 y R7

### R4 · Singular o plural, y el paquete de la bio

El manual §08 pone plural para lo que el negocio entrega y singular para lo observado y lo
personal. Las dos lecturas caben: mostrar antes de cobrar es algo que la empresa entrega, pero lo
dicen el titular de la página de la persona y el bloque de la home que habla de la persona.

| Lugar | A · singular (hoy) | B · plural |
|---|---|---|
| Nosotros, :196 | Te lo muestro antes de que pagues nada. | Te lo mostramos antes de que pagues nada. (como la publicada) |
| h1 de Nosotros y h2 de la home | No te prometo. Te muestro. | No te prometemos. Te mostramos. |

Mi lectura: **A**. En Nosotros, todo lo que rodea al titular es la bio en singular. En la home,
el bloque dice «Detrás de SpindleLab está una persona» y el botón nuevo es «Conocer a Ramón». Con
B, el titular le habla a la marca justo donde la página presenta a la persona. Elige uno solo
para los tres lugares.

Si decides abrir el resto del paquete, estas son las variantes:

| Hoy | Variante | Regla |
|---|---|---|
| SpindleLab soy yo al frente, orquestando el motor, con agentes de IA a mi lado y partners para lo que no hacemos en casa. | SpindleLab soy yo al frente, con agentes de IA a mi lado y partners para lo que no hacemos en casa. | «motor» y «orquestar» (5b) |
| Te lo cuento porque con esa experiencia puedo hacerme cargo del eje de tu operación y poner el motor a funcionar entero, no por partes. Conectamos las piezas en un solo sistema y las medimos juntas, con el orgánico como eje, porque es lo que no se apaga cuando cortas el presupuesto. | Te lo cuento porque con esa experiencia puedo hacerme cargo del circuito entero, no de una parte. Conectamos las piezas en un solo sistema y las medimos juntas, con el orgánico al centro, porque es lo que no se apaga cuando cortas el presupuesto. | «eje» ×2 y «motor» |
| El objetivo no es solo que vendas. Es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí. | Lo que busco es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí. | A4 («no solo X») |
| Lo primero es un diagnóstico. Reviso tu sitio, tu contenido y si la IA te nombra, y te entrego en una página qué te frena y qué mueve la aguja. Gratis, en 24 horas. Con eso decides con información, no a ciegas. | Lo primero es un diagnóstico. Reviso tu sitio, tu contenido y si la IA te nombra, y te entrego en una página qué te frena y qué arreglar primero. Con eso decides con información, no a ciegas. | «Gratis, en 24 horas» ×2 (A10) y «qué mueve la aguja», que §7:250 sacó del resto del sitio |
| Mido si te recomiendan · Registro si ChatGPT, Gemini y Perplexity te nombran ante las preguntas de tus clientes. Con fecha, no de memoria. Nada de métricas de vanidad. | Solo si R2.1 es «no se promete»: Te muestro si te recomiendan · Antes de empezar, registro si ChatGPT, Gemini y Perplexity te nombran ante las preguntas de tus clientes. Con fecha, no de memoria. | R2.1 |
| Paid Media: «El sitio es el eje; la pauta lo acelera.» | Solo si la bio deja «eje»: «La pauta acelera lo que el sitio ya hace.» | P46 |

### R7 · Copy nuevo o dato

**La FAQ de Diagnóstico** («¿En qué se diferencia del mini-diagnóstico?», visible y FAQPage):
- **A (hoy, la de la QA):** «El chequeo es automático y revisa tu sitio. El mini-diagnóstico lo
  hacemos a mano: le preguntamos a ChatGPT, Gemini y Perplexity por tu categoría, vemos quién
  aparece en tu lugar y qué fuentes citan, y te entregamos en una página qué te frena y qué
  arreglar primero. Gratis, en 24 horas.»
- **B (la anterior):** la misma, con «qué mueve la aguja» en vez de «qué arreglar primero».

Mi lectura: **A**. §7:250 ya sacó «qué mueve la aguja» del resto del sitio. Si en el anexo D,
punto 4, decides que el mini-diagnóstico no siempre pregunta a los motores, la FAQ pasa a: «El
chequeo es automático y revisa tu sitio. El mini-diagnóstico lo hacemos a mano y te dice en una
página qué te frena y qué arreglar primero. Gratis, en 24 horas.»

**El alcance de Método.** La entrada dice «Cada proyecto sigue el Método SpindleLab, nuestro
proceso de auditoría SEO + visibilidad en IA», y Desarrollo web tiene sus propias cinco fases.

| Opción | Entrada | Title (Simón) |
|---|---|---|
| A · acotarlo | Así trabajamos la auditoría SEO y la visibilidad en IA, fase por fase, para que sepas qué esperar antes de escribirnos. Un sitio nuevo sigue las cinco fases de Desarrollo web. | Se queda «Nuestro método de auditoría SEO + visibilidad en IA» |
| B · sumar la construcción | Todo proyecto parte igual: con tu URL, el chequeo y el mini-diagnóstico. Desde ahí, la auditoría y la visibilidad en IA siguen estas cuatro fases, y un sitio nuevo sigue las cinco de Desarrollo web. | Lo reescribe Simón, hasta 65 caracteres |

Mi lectura: **A**. Es una frase y no obliga a tocar el title ni el HowTo.

**«67 de 69».**
- **Qué se midió de verdad.** El 31-ago-2026 corrimos el chequeo público sobre 69 sitios de
  corredoras de propiedades (38) y oficinas contables de Santiago (31). 67 fallan «Tienes
  preguntas frecuentes marcadas»: 37 de 38 y 30 de 31. La fuente es
  `marketing/metricas/corridas-chequeo-2026-08-31.md`, con los `.jsonl` en esa carpeta.
- **Ya es público:** lo publicó la página de LinkedIn el 9-sep
  (`marketing/redes/2026-09-septiembre/09-mie-marca-hallazgo-67de69/`).
- **Dónde va:** en Diagnóstico, bajo «¿Te pueden citar?», como segundo párrafo del bloque.
- **Texto propuesto:** «En agosto de 2026 pasamos este chequeo por 69 sitios de corredoras de
  propiedades y oficinas contables de Santiago. 67 no tenían ninguna pregunta frecuente marcada
  con FAQPage.»
- **Lo que no dice:** que esos sitios no aparecen en ChatGPT. La corrida no midió eso.
- **Antes de publicar:** comprobar que el chequeo `faq` sigue midiendo lo mismo que el 31-ago. Si
  cambió, la frase lleva «con el chequeo de esa fecha».

**Verifica y Cumple en la home, y la FAQ de la home.** No tienen ranura (el hero está cerrado) y
E8 no los toca. Siguen en la lista de R7.

---

## Anexo D · Datos a verificar antes de publicar

1. **La prueba de Trabajo.** Texto propuesto: «Antes de publicarlo lo corrimos sobre nuestro
   propio sitio: spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026. El 14 de octubre sacó
   100. Entre una fecha y otra también cambió la forma de puntuar.»
   - **La fecha del 36.** El caso de Verifica y Cumple (`ventas/casos-de-exito/verifica-y-cumple.md`,
     commit `1a0ae0a`, en otra rama) dice 9-sep y el encargo dice 10-sep.
   - **El 73 que quedó entre medio.** La página de LinkedIn publicó 36 → 73 el 21-sep (corpus §4).
     El corpus §8 dice que esas cifras no se reusan, porque cambió la forma de puntuar. La frase
     propuesta lo dice en voz alta, sin el 73. Si prefieres no reusar el 36, queda solo el 100,
     con el gesto de haberlo corrido primero sobre el sitio propio.
   - **Las variantes:**
     - sumar «Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los
       rastreadores, no suma ni resta.» El chequeo de la ley le da a spindlelab.cl 14 de 20
       puntos comprobables y deja una señal sin confirmar;
     - sumar «El sitio de Verifica y Cumple también sacó 100 ese día.» Quedó fuera porque es la
       herramienta midiéndose a sí misma.
   - **Antes de publicar el v3:** spindlelab.cl va a ser el v3, con otro aviso de cookies y otro
     formulario. Hay que volver a correr el chequeo de la ley sobre la vista previa, y si no da
     100, la frase se corrige.
2. **El compromiso de los 3 meses** (Esencial y Pro, en Visibilidad y Acompañamiento). Lo
   confirmas tú. Hay dos casos borde:
   - un sitio que ya parte en 100, o cerca, no tiene cómo subir;
   - un Esencial solo de SEO técnico mueve parte del chequeo, no todo.

   Una salida para el primero es una condición que diga «si partes bajo 90». No la propongo sin
   tu visto bueno.
3. **Plazos sin fuente:**
   - **Auditoría de Visibilidad:** ~2 semanas, ¿desde cuándo? ¿Desde la conversación de 20
     minutos?
   - **Auditoría + Visibilidad en IA:** ¿los dos trabajos corren en paralelo? Si es así, valen
     los 2 a 3 semanas de la Completa.
   - **Desarrollo web:** el bloque nombra por primera vez el anticipo, que sale de la cotización.
     Los «tres días» para mandar el material y las «48 horas» para aprobar, del borrador, serían
     compromisos nuevos.
4. **El mini-diagnóstico y los motores.** El sitio dice que el mini-diagnóstico le pregunta a
   ChatGPT, Gemini y Perplexity: en la guía y el paso 02 de Diagnóstico, en su FAQ (R7), en el
   resultado del chequeo y en el artículo publicado. Los tres archivados
   (`marketing/diagnosticos/SPL-DIAG-2026-001`, `-002` y `-006`) no traen ninguna respuesta real
   de un motor: el 001 dice «Confirmaremos el resultado real… antes de la reunión», el 002
   describe la prueba y el 006 dice que no se corrió (README:37). La skill `mini-diagnostico`
   permite escribir esa parte «en términos de riesgo general».
   - **O** cada mini-diagnóstico corre esas preguntas, y el sitio queda como está,
   - **o** el sitio dice otra cosa. Para el resultado del chequeo (#1440) la versión b es: «El
     chequeo revisa tu sitio. El diagnóstico lo hacemos a mano y te dice qué te frena y qué
     arreglar primero. Te lo entregamos en una página, gratis, en 24 horas.» Lo mismo para el
     paso 02 y la FAQ de Diagnóstico (anexo C).

   Gemini es correcto en todos esos lugares. Claude no lo sería.
5. **La meta de la home** (Simón). Dice «Auditamos tu sitio y tu presencia en IA para que
   ChatGPT, Claude y Perplexity te recomienden antes que tu competencia. Diagnóstico gratis en 24
   horas.» Promete lo que el sitio dice que nadie garantiza. Una opción del mismo largo: «Auditamos
   tu sitio y tu presencia en IA para que ChatGPT, Claude y Perplexity puedan citarte. Diagnóstico
   gratis en 24 horas.»
6. **Paid Media dice «a diario»** con agentes de IA en tres lugares, y «día a día» en la FAQ.
   Viene de la página publicada. Confirma que es la práctica. E8 no toca la cadencia.
7. **Accesos en Método (#713).** Cambió «Nunca pedimos accesos de administrador», porque
   `onboarding-cliente.md` pide un usuario de CMS con rol admin en el Acompañamiento con acceso
   directo. Si quieres mantener esa promesa, lo que cambia es el onboarding, no el sitio.
8. **Contacto (#581).** La confirmación promete respuesta en 24 horas también a quien parte de
   cero. Se apoya en la copia vieja del JSON («con el mini-diagnóstico o los siguientes pasos»).
   Si ese plazo no aplica a proyectos nuevos, hay que decirlo.
9. **Ley 21.719 (Diagnóstico).** La fecha del 1-dic-2026 sigue vigente al 14-oct, y la prórroga
   (boletín 18.623-07) está en tramitación. Hay que comprobarlo el día del corte.
10. **Desarrollo web:**
    - la guía nueva le dice a quien ya tiene un sitio que funciona que no lo rehaga, y lo manda a
      Visibilidad en IA. Es la página de entrada de Ads: confirma esa postura;
    - el sitio nombra varias veces el agente y la construcción con IA, y de las cotizaciones lo
      sacaste;
    - la fase 02 dice «Ajustamos hasta que el diseño te representa», cuando las cotizaciones fijan
      las rondas de revisión.
11. **Redes.** El cierre nuevo es «Partimos por el sitio al que llevan tus redes». Si prefieres
    otro ángulo, que afirme algo y no repita la entrada.
12. **El estudio de Marco.** El addendum cruza los precios de la Auditoría y de Visibilidad. El
    encargo está bien.
13. **Visibilidad, meta (#1298).** Pasa de 149 a 159 caracteres. Simón decide si cabe.
14. **Paid Media.** La pregunta «¿Se integra con el SEO y la visibilidad en IA?» (Simón) tiene
    una respuesta que no habla de visibilidad en IA. O la pregunta pierde «y la visibilidad en
    IA», o la respuesta suma un hecho.

---

## Para Diego (paso 7)

- **El bloque nuevo.** En `servicios-v3.json`, cada plan que lo lleva suma `oferta` con los campos
  `resultado`, `plazo` y `condicion`, o `plazoCondicion` o `todo` cuando se juntan. Va entre la
  bajada y los puntos, como un `dl` con el rótulo «Resultado», «Plazo» o «Condición» en el `dt`.
  En Desarrollo web van los mismos campos en la constante de cada plan. Las Offer no lo llevan:
  sus filas (#1062 a #1068) traen la frase por si Simón la quiere en el grafo. Si no confirmas el
  compromiso, el Esencial y el Pro van sin bloque, en las dos páginas.
- **Hojas en "".** #837, #930, #1093, #1252, #1253 y #790 quedan vacías, sin sacar el elemento,
  para no correr los punteros. La plantilla filtra los vacíos. En Desarrollo web, #1000, #1007 y
  #1015 salen de la lista.
- **`oferta-v3.json#/momentos/1/planes/0/d`** (Gemini → Claude) no la lee ninguna página. Va en el
  mismo commit que #13, con una aserción aparte.
- **`v3-chequeo.js?v=3`** en sus dos referencias (#1444).
- **Medir:**
  - «$690.000 con Visibilidad en IA» en `nowrap`, a 390, en la home y el índice;
  - el panel del menú (#1359) a 1280 × 650 con el aviso de cookies abierto;
  - «Ver el blog» junto al h2 de la home, a 390;
  - el bloque nuevo a 390, en las cuatro páginas.
- **Enlaces:**
  - «Visibilidad en IA» en la guía de Desarrollo web (#983) se puede enlazar, una vez (§7:191);
  - los de «protocolo público» siguen donde están, en frases R2;
  - los de «Gestión de redes sociales» y «Paid Media (Google)» en las FAQ #1128 y #1209 quedan
    con el mismo texto.
