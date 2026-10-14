# Copy por sección del v3 (E8, pasos 4 a 6)

14-oct-2026 · Clara · base `6bf84fa` (el sitio es el de `28c5d85` más `a70e945`, que cambió Gemini por
Claude en la meta de la home) · contrato: el plan E8 aprobado por Ramón, pasos 4 a 6, y el encargo de la
oferta del 14-oct que Ramón pidió incluir.

**Qué es.** El entregable de Clara para tu lectura, ya revisado. Trae todo lo que el pase de voz
propone cambiar en el v3, página por página, con su razón. El crítico de voz y Simón lo revisaron en
contexto limpio (paso 5), y yo lo cerré con sus objeciones (paso 6). **No se aplicó nada:** ni
`spindlelab-astro/` ni los JSON de datos cambiaron. Lo aplica Diego en el paso 7, ranura por ranura,
desde `scratchpad/e8/registro-final.json`.

**Cómo se lee.** «Antes» es lo que el sitio muestra hoy y «Después» es la propuesta. El número es el
de la ranura en el inventario; «nueva» es un texto que hoy no existe. **Simón** marca una ranura de
búsqueda (title, meta, h1, preguntas de FAQ, Offer, HowTo), donde él tiene veto. «Va también al
JSON-LD» quiere decir que el mismo texto cambia en el grafo. «Revisada en el paso 5» marca las filas
que tocaron las objeciones. La sección «Revisión» dice qué se objetó y cómo se resolvió. Las tablas
traen solo lo que cambia. Lo que se mantiene está en el registro, cada ranura con su motivo.

---

## Lo que queda para ti

En orden de peso. El detalle está en la sección que se cita.

1. **R2** (anexo A). Si se promete medir menciones en IA en los planes pagados, y si el informe del
   Acompañamiento Esencial es mensual o quincenal. El anexo A trae el texto de cada lugar para cada
   respuesta.
2. **El compromiso de los 3 meses** (Visibilidad y Acompañamiento). Es una promesa comercial nueva del
   encargo de Marco y va como un solo párrafo bajo los planes, el mismo en las dos páginas salvo el nombre
   de los planes:

   > En el Esencial y en el Pro nos comprometemos a que, a los 3 meses (el mínimo del plan), tu sitio
   > saque en el chequeo gratis más puntos que el día en que partimos, contando las mismas señales, y a
   > que los robots de ChatGPT, Claude y Perplexity puedan entrar a él. Necesitamos a alguien de tu
   > equipo que apruebe los cambios que proponemos; si no se publican, el puntaje no se mueve. El
   > chequeo es público, así que lo compruebas tú.

   En Visibilidad dice «En el Acompañamiento Esencial y en el Pro», como sus tarjetas. Si no lo
   confirmas, no va en ninguna de las dos páginas. Antes de confirmarlo, mira los casos borde del
   anexo D, punto 2: un sitio que ya parte cerca de 100, un Esencial solo de SEO técnico y las reglas
   de bots de Cloudflare.
3. **La prueba en Trabajo** (ficha de Verifica y Cumple). Es copy nuevo con cifras públicas:

   > El primer sitio que revisó fue el nuestro. spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026
   > y, con lo que encontró ya arreglado, 73 el 21 de septiembre. El 14 de octubre, ya con otra forma de
   > puntuar, sacó 100. Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los
   > rastreadores, hoy no suma ni resta.

   La medición es la del chequeo de la Ley 21.719, no la del hero. El 36 y el 73 ya los publicó la página
   de LinkedIn el 21-sep. Si prefieres no reusarlos (corpus §8), hay una versión solo con el 100 en el
   anexo D, punto 1. Antes de publicar el v3 hay que volver a correr el chequeo de la ley sobre la vista
   previa.
4. **Si cada mini-diagnóstico le pregunta de verdad a ChatGPT, Gemini y Perplexity** (anexo D, punto 4).
   El sitio lo promete en tres lugares decididos: la guía de Diagnóstico (#617), su paso 02 (#639) y el
   resultado del chequeo (#1440). Ninguno de los tres mini-diagnósticos archivados trae una respuesta
   real de un motor. Si lo confirmas, los tres se quedan como están. Si no contestas, va la versión b de
   cada uno (en las tablas), que no promete la pregunta. Gemini es correcto en las dos versiones.
5. **La meta de la home revierte `a70e945`.** El commit de hoy cambió Gemini por Claude porque «Google-Extended
   es de entrenamiento». La documentación de Google dice que también controla el grounding de Gemini
   Apps. Simón vetó el mismo cambio en la tarjeta de Visibilidad (#13, #782), y la meta vuelve a Gemini
   con la promesa arreglada (#50): «…para que ChatGPT, Gemini y Perplexity puedan citarte». Si prefieres
   conservar `a70e945`, va la misma frase con Claude, y entonces Claude va también en #13 y #782, para
   que la home tenga una sola trinca.
6. **Un encargo aparte, fuera de E8: Google-Extended** (Simón; anexo D, punto 5). El chequeo
   (`chequeo.js`), el artículo de los 21 chequeos y la regla del 8-sep tratan a Google-Extended como
   entrenamiento puro. Hay que recategorizarlo, y eso mueve puntajes. El artículo «Cómo aparecer en
   ChatGPT» tiene el error contrario. En E8 solo se acota la frase de Diagnóstico (#623) para que no
   diga nada falso.
7. **El bloque Resultado · Plazo · Condición no va como plantilla en cada tarjeta.** El crítico lo
   objetó y le doy la razón (sección «Revisión»). Lo que el encargo pide entra igual, de otra forma:
   - el plazo sigue como punto de cada tarjeta;
   - la condición va una vez por página;
   - el resultado común de Desarrollo web va una vez;
   - el compromiso de los 3 meses va en un párrafo.

   Si lo quieres por tarjeta, la versión anterior está en el registro, en el motivo de cada fila que no
   se agrega.
8. **Datos que faltan** (anexo D, punto 3):
   - el plazo de la Auditoría + Visibilidad en IA;
   - desde cuándo corren las ~2 semanas de la Auditoría de Visibilidad.
9. **La postura de Desarrollo web** (anexo D, punto 9). La guía nueva le dice a quien ya tiene un sitio
   que funciona que le sirve más Visibilidad en IA. Es la página de entrada de Ads, y el estudio de Marco
   dice que 2 de 2 cierres son de Desarrollo web.
10. **El estudio de Marco necesita una corrección** (anexo D, punto 11). Dice que el 36 → 100 es «con el
    mismo instrumento que está en el hero», y es el chequeo de la ley. Su addendum cruza los precios de la
    Auditoría y de Visibilidad. Lo corrige el troncal antes de que alguien lo cite.
11. **R4 y R7** (anexo C) y el resto de los datos del anexo D.

---

## Resumen

- **886 filas.** Son las 851 ranuras abiertas del inventario, el 100 %, y 35 filas nuevas del encargo de
  la oferta (30 del paso 4 y 5 del cierre). Las 630 ranuras cerradas no llevan fila y no se tocan: el
  hero, `.d-pres`, la bio, los cuerpos de los artículos, los precios, R3, R4 y R7.
- **Por estado.**
  - Las 851 ranuras: 136 cambian, 659 se mantienen, 53 esperan R2 y 3 son para ti (#617, #639 y #1440).
  - Las 35 nuevas: 2 entran (la condición de Desarrollo web y el plazo de la Auditoría Completa), 3 son
    para ti (la prueba de Trabajo y los dos párrafos del compromiso), 1 es un dato a verificar y 1 espera
    R2. Las otras 28 no se agregan: eran el bloque por tarjeta.
- **Qué tipo de cambios.** En las tablas hay 145 filas:
  - **Unos 70 sacan repeticiones.** Son frases que decían lo mismo que otra de la misma página (A10), o
    que repetían el texto con que se llega desde la página anterior (P86). Por ejemplo, «las máquinas que
    hoy recomiendan tu negocio» estaba en el menú de las 21 rutas.
  - **Unos 30 son de glosario.** Una sola forma por oferta: «mini-diagnóstico», «Auditoría + Visibilidad
    en IA», «plan» y no «pack», «servicio» y no «pieza», y sin «(social ads)».
  - **Unos 20 son tics de voz.** El remate que evalúa la frase anterior, los dos puntos de anuncio, la
    segunda serie de tres de una página y el «y más» de las tarjetas.
  - **Unos 20 sacan afirmaciones sin respaldo**, o promesas que no controlamos:
    - «citen a tu empresa», «te recomienden antes que tu competencia» y «la mayoría del rubro no lo hace»;
    - «200 hallazgos» y «nunca pedimos accesos de administrador»;
    - «ninguna consulta quede sin contestar».

    También corrigen datos: los robots de la FAQ de Visibilidad y de la metodología de Diagnóstico, los
    cuatro planes de Desarrollo web y Analytics, que es opcional en la Auditoría.
  - **6 son nuevos, del encargo de la oferta** (la sección siguiente).
- **Reglas duras, medidas sobre el «después» completo.** Son las 21 rutas con head, JSON-LD y el texto
  de `v3-chequeo.js`, con tus decisiones pendientes aplicadas como si las aprobaras
  (`scratchpad/e8/cierre/reglas.py`).
  - Cadencia, `quincen|cada mes|mes a mes|al mes` sin distinguir mayúsculas: 51 antes y 51 después, el
    mismo 51 de la hoja (1.10). La búsqueda amplia también da lo mismo antes y después.
  - «acá»: 3 y 3, los tres del cuerpo del artículo de los 21 chequeos, que va tal cual. Raya, voseo,
    «usted» y signos de exclamación: 0.
  - «...» pasa de 2 a 0. «sin (costo ni) compromiso» pasa de 4 a 2, y las dos que quedan son un h2 del
    cuerpo de un artículo y su fila en el índice del artículo, que están cerrados.
  - Los precios son los mismos en cada ruta. No hay ningún verbo nuevo de la marca en primera singular.
  - Ninguna ranura cerrada cambia. De las R2, cambia solo #1256, con la excepción de la hoja (§0): arregla
    una regla dura y deja la promesa y la cadencia idénticas. Las demás R2 solo llevan variantes en el
    anexo A.

---

## El encargo de la oferta (14-oct)

Marco pidió reescribir la oferta del v3 con resultado, plazo y condición
(`marketing/encargos-otras-sesiones/encargo-estudio-web-oferta-resultado-plazo-condicion.md`). Su regla
es que solo se promete lo que controlamos y medimos, y nunca una cita en un modelo. Tú pediste incluir
esos hallazgos en los textos. El texto del encargo era un borrador de otra sesión, así que no se copió
tal cual: cada línea se pasó por la hoja de voz y cada afirmación se comprobó antes de entrar.

### Qué entró y dónde

1. **Gemini se queda en la tarjeta de Visibilidad.** El encargo (§2) pedía cambiarlo por Claude en
   `oferta-v3.json` y en `v3-chequeo.js`, porque «Google-Extended es de entrenamiento». La documentación
   de Google (google-common-crawlers, actualizada el 14-jul-2026, que leí el 14-oct) dice que
   Google-Extended también controla el grounding de Gemini Apps. Así que la premisa no se sostiene.
   - Simón vetó el cambio en la tarjeta (#13 y el índice, #782, que son la misma hoja): vende el servicio
     que mide en ChatGPT, Gemini y Perplexity, y la línea de su página dice lo mismo. Tampoco se toca la
     hoja muerta `oferta-v3.json#/momentos/1/planes/0/d`.
   - **La lista de motores sigue a lo que el verbo puede comprobar** (hoja 2.12):
     - donde se promete acceso de robots, que es lo que el chequeo prueba en vivo
       (`functions/api/chequeo.js:867-869`), va «ChatGPT, Claude y Perplexity»: Diagnóstico, el cierre
       del índice, Trabajo, la metodología acotada (#623) y el compromiso de los 3 meses;
     - donde se pregunta a mano, se habla de presencia o de dónde pregunta tu cliente, va «ChatGPT, Gemini
       y Perplexity»: el mini-diagnóstico, «Medición en…», la línea y la meta de Visibilidad, Método, la
       tarjeta de Visibilidad y la meta de la home (#50).
   - `v3-chequeo.js:104` describe el mini-diagnóstico y no se cambia a Claude, porque a Claude no se le
     pregunta a mano. Queda para ti si se pregunta siempre («Lo que queda para ti», punto 4).
2. **Nunca una cita en un modelo.** Salen las promesas de cita en:
   - la línea y la meta de Visibilidad (#1232, #1298) y su Esencial (#1256);
   - Método (#682) y Acompañamiento (#824);
   - la meta de la home (#50).

   También se corrigen dos datos de robots: la FAQ de robots.txt de Visibilidad (#1291) y la metodología
   de Diagnóstico (#623). En Redes y Paid Media salen las promesas que no medimos: «para llegar más
   lejos», «ninguna consulta quede sin contestar», «escalamos con cabeza» y «bien hecha».
3. **Resultado, plazo y condición, sin plantilla.** Cada página dice lo que el encargo pide, una vez y
   donde se lee:

   | Página | Resultado | Plazo | Condición |
   |---|---|---|---|
   | Desarrollo web | Una vez, en «Todo parte con esto» (#986): «Te dejamos el puntaje por escrito y, si tenías otro sitio, también el de antes.» | El punto de cada tarjeta, como hoy (~1, ~3 y ~4 a 6 semanas) | Una vez, en la nota de planes: «Cada plazo cuenta desde que nos llegan el anticipo, los textos y las imágenes. Para publicar necesitamos acceso a tu dominio.» |
   | Visibilidad en IA | La Auditoría de Visibilidad ya lo dice en sus puntos (plan de citabilidad priorizado). El Esencial y el Pro, en el párrafo del compromiso, si lo confirmas | ~2 semanas en la tarjeta de la Auditoría; 3 meses en el compromiso | En el compromiso: alguien de tu equipo que apruebe los cambios |
   | Auditoría SEO técnica | Lo dicen la tarjeta, el bloque B y la FAQ | Un punto nuevo en la Completa: «Entrega en 2 a 3 semanas desde el acceso a los datos». La combinada, cuando des el plazo | Los accesos, en la FAQ (#951), que ya los dice |
   | Acompañamiento mensual | En el párrafo del compromiso, igual al de Visibilidad | 3 meses, el mínimo del plan | Alguien de tu equipo que apruebe los cambios |

   Redes y Paid Media no lo llevan, porque el encargo no lo trae. Para escribirlo faltarían datos tuyos,
   por ejemplo en cuántos días sale el primer calendario o la primera campaña.
4. **La prueba propia.** Es un párrafo nuevo en la ficha de Verifica y Cumple, en Trabajo, la ubicación
   que sugería el encargo: obra propia, sin permiso de cliente. Va para ti, por ser copy nuevo con cifras
   públicas.

### Qué se adaptó, y por qué

**Plazos: manda lo que el sitio ya publica.**

| Plan | El encargo decía | El sitio y las fuentes dicen | Queda |
|---|---|---|---|
| Página de Campaña | una semana desde textos, imágenes y accesos; material en 3 días; aprobaciones en 48 h | ~1 semana (`desarrollo-web.astro`); los plazos corren desde el anticipo y el material (cotización, `plantilla_generador.py:318-319`) | ~1 semana, en la tarjeta. Desde cuándo, en la nota de planes. Los 3 días y las 48 horas no tienen fuente |
| Sitio Esencial | tres semanas desde el arranque | ~3 semanas (sitio y cotización) | igual, en la tarjeta |
| Sitio Completo | cuatro a seis semanas | ~4 a 6 semanas (sitio y cotización) | igual, en la tarjeta |
| Auditoría de Visibilidad | dos semanas desde que tenemos acceso | ~2 semanas; el servicio no pide accesos | ~2 semanas, en la tarjeta, sin punto de partida (anexo D) |
| Auditoría Completa | dos semanas | 2 a 3 semanas desde el acceso a los datos (FAQ de la página) | punto nuevo en la tarjeta, con la cifra de la FAQ |
| Auditoría + Visibilidad en IA | (no lo trae) | no hay fuente | dato a verificar |
| Acompañamiento Esencial y Pro | noventa días; «el trabajo sigue mes a mes» | mínimo 3 meses | a los 3 meses, el mínimo del plan. «Mes a mes» es R2 |

**Condiciones.** Dicen lo que depende del cliente, y cada una sale de una fuente:
- la Auditoría pedía «acceso al código», y la FAQ de la misma página dice que no lo necesitamos. Los
  accesos quedan en esa FAQ: Search Console, Analytics si lo tienes (`onboarding-cliente.md` §2) y 20
  minutos;
- Visibilidad pedía «la analítica», que el servicio no usa. La Auditoría de Visibilidad no lleva condición;
- Desarrollo web tiene la condición de la cotización (el anticipo, los textos y las imágenes) y el acceso
  al dominio para publicar, que agregó Simón (cotización, `plantilla_generador.py:258`). Es la primera vez
  que el sitio nombra el anticipo. «El calendario que fijamos al arrancar» no está en ningún documento del
  proceso, y no entra;
- el compromiso de los 3 meses pide a alguien de tu equipo que apruebe los cambios, y dice qué pasa si no
  se publican. Salen dos cosas: «en los plazos que acordemos», una cláusula sin número, y «lo vas a ver en
  el mismo informe», que amarra la promesa al informe de R2.

**Resultados.** Prometen solo lo que el cliente puede comprobar: que los robots puedan entrar, su puntaje
en el chequeo y la línea base con fecha. Del borrador salieron:
- «velocidad en verde», una promesa nueva sin fuente;
- «cuánto mueve cada arreglo», que no se puede saber antes de hacerlo;
- «las máquinas que hoy recomiendan tu rubro» (P86);
- el párrafo «Lo que no prometemos» de Visibilidad, porque la página ya tiene «Qué prometemos y qué no».

**Voz.** Del borrador:
- el «Siempre que…» pasó a frases cortas;
- salieron «no con una lista de hallazgos» (A4) y las series de tres.

En la revisión salieron también el rótulo «Condición», que sonaba a letra chica, y las líneas que solo
remitían a otra. Todo va en plural de marca, con tuteo y sin rayas.

**Precios.** No se tocaron. Los del encargo calzan con `oferta-v3.json` y `servicios-v3.json`:
- Desarrollo web: $390.000, $690.000 y $1.190.000;
- Visibilidad: $400.000;
- Auditoría: $490.000 ($690.000 con Visibilidad en IA);
- Acompañamiento: $590.000 y $790.000.

El addendum del estudio de Marco los trae cruzados (Auditoría $400.000 y Visibilidad $490.000), y esa
línea no se cita.

**La cifra de la prueba.** El encargo dice que los dos 100/100 son «con el mismo instrumento que está en el
hero», y no es así:
- salen de `verifica.spindlelab.cl/api/chequeo`, el chequeo de la Ley 21.719 (política, seguridad y
  consentimiento);
- el chequeo de visibilidad en IA del hero le da hoy 85 a spindlelab.cl y 54 a verifica.spindlelab.cl
  (corrido en vivo el 14-oct, `scratchpad/e8/clara-S1/chq-ia-spindlelab.json` y `clara-P/vivo/`).

Por eso el párrafo va en la ficha de Verifica y Cumple, cuya línea ya nombra la ley. Además, no dice «el
chequeo» a secas (2.9) y nunca va al lado del chequeo de IA.

---

## Revisión (paso 5)

El crítico de voz y Simón revisaron por separado y en contexto limpio, sin tocar archivos. Los dos leyeron
la hoja de voz, el plan, el encargo, el estudio de Marco y este documento. El crítico leyó además el corpus
entero, el manual §01 y §08 y el detector anti-slop. Revisó:
- las 153 filas «cambia», las para ti y el dato a verificar;
- una muestra de 69 «se mantiene»;
- en voz alta, Visibilidad, Acompañamiento, Auditoría y Desarrollo web completas.

Simón revisó las filas con Simón o JSON-LD, las nuevas del encargo, los title y las metas de las 21 rutas,
cada FAQ contra su FAQPage, las Offer, el HowTo y la miga contra su BreadcrumbList.

**Cómo se resolvió.**
- Una objeción de regla la gana el crítico, con su alternativa o una mejor que cumpla la regla.
- Una de estilo la decido yo y dejo la razón.
- El veto de Simón se respeta y su ajuste se aplica.
- Lo que no se puede cerrar pasa a ti.

**En números.** Fueron 37 objeciones: 23 del crítico (7 de regla y 16 de estilo) y 14 de Simón (3 vetos, 10
ajustes y 1 de regla).
- **Aceptadas: 35.**
  - Son 22 del crítico. En tres va otra redacción: #50 y #1298 con la de Simón, porque son sus ranuras y el
    crítico mismo dejó la redacción en sus manos, y #983 con la mía.
  - Son 13 de Simón: los 3 vetos y los 10 ajustes.
- **Rechazada con razón: 1.** De Simón, dejar #623 sin tocar en E8. El acotado del crítico arregla la regla
  sin contradecir al instrumento, y el encargo aparte que Simón pedía va igual a ti.
- **Pasa a ti sin cerrar: 1.** Es #1440, extendida a #617 y #639, con la b por defecto. El crítico mismo
  pide que la decidas tú.

Quedan además para ti, ya revisadas, la prueba de Trabajo, los dos párrafos del compromiso y el encargo
aparte de Google-Extended.

### Lo que objetó el crítico de voz

| # | Objeción | Tipo | Cómo quedó |
|---|---|---|---|
| 1291 | La corrección metía a Google-Extended entre los robots «de entrenamiento», y Google dice que también controla el grounding de Gemini Apps. «A propósito» se leía como «por cierto». La respuesta no contestaba la pregunta de entrada | regla | Aceptada, junto con el ajuste de Simón: contesta «no» de entrada, sale «a propósito» y nombra solo a GPTBot como robot de entrenamiento. Vale para la FAQPage |
| 623 | Fila «se mantiene» con el mismo dato: bloquear Google-Extended «no te quita ni una cita» no es cierto para Gemini (5a) | regla | Aceptada: la frase se acota a ChatGPT, Claude y Perplexity, los tres que el chequeo prueba. Simón pedía no tocarla (ver abajo) |
| 50 | La meta de la home promete «que te recomienden antes que tu competencia». Por 5a, el arreglo es obligatorio | regla | Aceptada: cambia. La redacción es de Simón, con Gemini y no con Claude (ver abajo) |
| 1256 | «Para que te empiecen a citar» promete la cita, el mismo defecto de #1232, #1298 y #682. La hoja deja arreglarlo en una ranura R2 | regla | Aceptada: «Medimos y optimizamos mes a mes, sobre lo que encontró la auditoría.» La promesa de medir y la cadencia quedan idénticas |
| 824 | «Para que los modelos los citen» promete la cita | regla | Aceptada: «puedan citarlos», como Método |
| 713 | «Nunca te pedimos tu contraseña» cambia un «nunca» sin respaldo por otro (`onboarding-cliente.md:34`) | regla | Aceptada: «Nos agregas como usuario, sin compartir tu contraseña.» |
| 1440 | Respalda «para ti» y fija la vara: si no confirmas, va la b. Lo mismo para la guía y el paso 02 de Diagnóstico y para la FAQ R7 | regla | Aceptada. #1440, #617 y #639 son para ti, con la b por defecto. El anexo C dice lo mismo para la FAQ |
| prueba de Trabajo | Sin el arreglo, el «también» final colgaba. Faltaba el 73, que ya es público. Había dos puntos como motor y cuatro «lo» seguidos con la línea de la ficha | estilo | Aceptada. Entra el 73 (36 y 73 con la misma vara; el 100 con otra), sin dos puntos. «El primer sitio que revisó fue el nuestro» corta la cadena de «lo». Va con la frase obligatoria de Simón |
| el bloque por tarjeta | El mismo `dl` bajo cuatro tarjetas, seis líneas que solo remiten a otra y el rótulo «Condición» como letra chica (B1). Repetía puntos de la tarjeta y FAQ | estilo | Aceptada. No hay bloque. Lo común va una vez por página y cada tarjeta dice solo lo suyo (tabla de arriba). Las 28 filas del bloque quedan en el registro como «no se agrega», con su texto anterior |
| el compromiso de 3 meses | «En los plazos que acordemos» no tenía número. En Visibilidad, «el mínimo» no tenía referente. «Pueden entrar a él» sonaba forzado. «Los del Esencial.» era el puntero más plantilla | estilo | Aceptada: un párrafo bajo los planes, con el mínimo dicho entre paréntesis y el ajuste de Simón. La frase R2 del informe va al final del párrafo (anexo A) |
| Página de Campaña, Resultado | Prometía los robots solo en el plan más barato, y repetía la bajada | estilo | Aceptada: sale con el bloque |
| Sitio Completo, Resultado | Repetía el punto #1012 y era un puntero | estilo | Aceptada: sale. La condición «La del Sitio Esencial.» sale también |
| Desarrollo web, Condición | «El plazo corre desde» es el registro del PDF de cotización, y «de la oferta» se leía como nuestra oferta | estilo | Aceptada: una frase en la nota de planes, «Cada plazo cuenta desde que nos llegan…», más el dominio de Simón |
| Auditoría + Visibilidad en IA, Resultado | Repetía la bajada y dos puntos de la misma tarjeta, y era un puntero | estilo | Aceptada: sin Resultado. #930 se queda como «Todo lo de la Auditoría Completa». El plazo, cuando lo des |
| Auditoría Completa, Resultado | «Frena a tu sitio» (con una «a» de persona) repetía el h2 #934 y la FAQ #953. El plazo y la condición repetían las FAQ | estilo | Aceptada: sale. La tarjeta suma solo el punto de plazo, y los accesos quedan en la FAQ #951 |
| 1232 | «Subimos tu probabilidad de aparecer» es un calco de consultora y una promesa que el cliente no puede comprobar | estilo | Aceptada: «Trabajamos para que aparezcas cuando tus clientes le preguntan a ChatGPT, Gemini o Perplexity por tu rubro.» Por eso #1234 pierde su «Trabajamos» y queda en una frase |
| 1298 | «Probabilidad de cita» es jerga, y la meta crecía a 159 caracteres | estilo | Aceptado el fondo. La ranura es de Simón, así que va su redacción y no la del crítico («medimos tu presencia…»). La de Simón evita además el verbo de R2 y queda en 136 caracteres |
| 900 | Sin «un plan priorizado», el contraste «con evidencia, no con un volcado» quedaba roto | estilo | Aceptada: «La auditoría lo responde con evidencia.» |
| 29 | «Cada proyecto termina como empezó:» era una adivinanza que resolvían los dos puntos (tic 2) | estilo | Aceptada: «Al terminar cada proyecto, volvemos a correr el chequeo de arriba sobre tu dominio.» |
| 1331 | Dos incisos antes del verbo, y «sitio» dos veces | estilo | Aceptada: «Sea cual sea tu rubro, el chequeo gratis te muestra en segundos qué ve la IA en tu sitio.» |
| 983 | «La Visibilidad en IA trabaja sobre él» pone al servicio como sujeto. La postura choca con el estudio de Marco | estilo | Aceptado el fondo, con mi redacción, porque la del crítico decía «rehacerlo» dos veces: «Si el tuyo funciona, te sirve más Visibilidad en IA.» La postura sigue para ti |
| 1235 | «Las cuatro partes del trabajo» anunciaba una cuenta (tic 2) | estilo | Aceptada: «Lo que incluye», como las otras páginas de servicio |
| 1153 | «El creativo», como sustantivo, es calco de «the creative» y se lee como una persona | estilo | Aceptada: «El contenido creativo lo pones tú.» Responde a §7:193: el orden de la cabecera no cambia |

### Lo que objetó Simón

| # | Objeción | Tipo | Cómo quedó |
|---|---|---|---|
| 13 y 782 | El cambio a Claude parte de una premisa falsa: Google-Extended también controla el grounding de Gemini Apps. La tarjeta vende el servicio que mide en ChatGPT, Gemini y Perplexity | veto | Respetado: «se mantiene», con Gemini. Comprobé la fuente de Google el 14-oct. La hoja muerta de `oferta-v3.json` tampoco se toca |
| 50 | La meta promete un resultado y una comparación que el sitio dice que nadie garantiza. La trinca sigue al verbo: auditar tu presencia es preguntar a mano | ajuste | Aplicado: «Auditamos tu sitio y tu presencia en IA para que ChatGPT, Gemini y Perplexity puedan citarte. Diagnóstico gratis en 24 horas.» (125 caracteres). Revierte el motor de `a70e945`: va arriba |
| 1291 | La corrección metía a Google-Extended en la bolsa del entrenamiento. Mejor que la FAQ no lo nombre | ajuste | Aplicado, junto con el del crítico |
| 623 | Es falso para Gemini, pero corregir solo esta frase haría que la página describa mal su instrumento. Pedía no tocarla y abrir un encargo aparte | regla | Rechazada la parte de no tocarla: el acotado del crítico no contradice a `chequeo.js`, porque deja sus categorías como están y solo dice menos. El encargo aparte va igual a ti («Lo que queda para ti», punto 6) |
| 1298 | «Probabilidad de cita» se lee como una hora agendada | ajuste | Aplicado: «…análisis de tu presencia en ChatGPT, Gemini y Perplexity, claridad de entidad y contenido que puedan citar.» (136) |
| 804 | El title del índice tiene 72 caracteres, sobre el tope de 65, y usa «Soluciones» | ajuste | Aplicado: «Servicios: SEO técnico, visibilidad en IA y desarrollo web» (58), sin sufijo a propósito |
| 1131 | La pregunta promete una integración con la visibilidad en IA que la respuesta no menciona | ajuste | Aplicado: «¿Se integra con el SEO?», en el h3 y en el FAQPage |
| 1218 | «Orquestado con agentes de IA» es jerga y la página no lo sostiene | ajuste | Aplicado: «Gestión de redes sociales para empresas en LinkedIn y Meta: estrategia, pauta, comunidad y reportes. El contenido creativo lo pones tú.» (135) |
| 1146 | La Offer conservaba «optimización avanzada», que la tarjeta ya no lista | ajuste | Aplicado |
| 681 | El anexo A cambiaba «estrategia AEO/GEO» por «estrategia de visibilidad en IA» en Método. La sigla hace trabajo de búsqueda en la fase y en el HowTo | veto | Respetado: el anexo A conserva «estrategia AEO/GEO» en #665, #681, #723 y #726. En #726 queda «puedan leerlo, entenderlo y citarlo» |
| el compromiso de 3 meses | La vara del chequeo cambia, y una señal que pasa de «sin confirmar» a medida mueve el puntaje sin que nadie toque el sitio | ajuste | Aplicado: «contando las mismas señales». Sus dos notas de operación van al anexo D, punto 2 |
| Desarrollo web, condición | «Publicado» y «abierto a los robots» dependen del dominio, que es del cliente. El acceso se necesita al publicar, no al empezar | ajuste | Aplicado: «Para publicar necesitamos acceso a tu dominio.», en la nota de planes |
| prueba de Trabajo | El 100 es del chequeo de la ley y no cuenta lo que no se ve desde afuera. El 36 era sobre todo eso. Sin decirlo, «36 → 100» sugiere lo que el instrumento no comprobó | ajuste | Aplicado: la frase de lo que no se ve desde afuera pasa a obligatoria. Su variante sin las cifras viejas es la b del anexo D. Sin JSON-LD, y nunca al lado del chequeo de IA |

**Lo que Simón aprobó sin objeción.**
- Son 28 filas con FAQ, Offer o JSON-LD. En todas, la FAQ visible y su FAQPage salen de la misma hoja y
  cambian juntas.
- También aprobó «Visibilidad en IA» sin «(AEO/GEO)» en el h1, la miga con su BreadcrumbList y el plan
  «Auditoría + Visibilidad en IA». La Offer «Auditoría de Visibilidad en IA» (#1302) se queda: en el grafo
  se lee fuera de la página.
- El bloque y el compromiso no van al JSON-LD.

### Lo que vieron fuera del registro

- **Dos trincas en la misma tarjeta.** En Visibilidad, el Esencial dice «en 3 motores», y Gemini es uno de
  ellos. El compromiso, en cambio, nombra a los robots de ChatGPT, Claude y Perplexity. Las dos cosas son
  ciertas, porque una es preguntar y la otra es dejar entrar. Con el compromiso fuera de la tarjeta, en un
  párrafo propio, se leen como dos hechos distintos.
- **Títulos sobre 65 caracteres.**
  - El del índice se corrige.
  - Diagnóstico tiene 66 y está decidido.
  - Hay dos títulos de artículos con 70 y 67, que están cerrados y no se proponen.
- **El HEAD.** El crítico avisó que el HEAD era `6bf84fa` y no `b1e36d5`. La base de este documento quedó
  corregida.

---

## Lo que cambié al unificar

Doce filas cambiaron respecto de lo que entregaron las cuatro Claras. Cada una lleva en el
registro el motivo original y, después de «UNIFICA», el mío. La revisión del paso 5 cambió seis de
ellas otra vez: #900, #983 y #1331 tienen redacción nueva, las dos condiciones nuevas ya no se agregan (el
bloque por tarjeta salió) y #1440 lleva la versión b por defecto. Las tablas de abajo traen el texto
final.

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
  - Visibilidad: si apareces, cómo te describen y quién gana. Va dos veces, en la lista y en la FAQ, que
    está sola en el FAQPage.

  Las demás enumeraciones son de hechos distintos, como los motores, los entregables o los plazos, y se
  quedan.
- **Repeticiones aceptadas, para el crítico:**
  - en Visibilidad, «probabilidad» queda dos veces: en «Prometemos» y en la FAQ. La línea y la meta ya no
    la usan;
  - «Trabajamos para que…» abre la línea de Visibilidad (#1232) y el párrafo del menú (#1359). Es la
    fórmula del manual §01, y el menú se lee aparte, al abrirlo;
  - en Acompañamiento, el h2 del cierre («Una auditoría no se ejecuta sola») repite la entrada, que es R2.
    El anexo A lo resuelve;
  - en el índice, la nota decidida «No hace falta reconstruir para que una IA pueda citarte» va pegada a
    la tarjeta «Para que ChatGPT, Gemini y Perplexity puedan citarte…». Así, «citarte» sale dos veces
    seguidas. Viene de antes del pase, y una de las dos es una ranura decidida (§7:176) y la otra la vetó
    Simón;
  - el compromiso de los 3 meses dice lo mismo en Visibilidad y en Acompañamiento, a propósito: es el
    mismo plan, con el mismo precio (hoja 2.5).
- **Glosario.**
  - «Pedir el diagnóstico» queda en los cinco cierres de servicio.
  - «mini-diagnóstico» queda en el cuerpo de todas las páginas. «diagnóstico gratis» se queda solo en el
    title de Contacto y en las metas de la home y de Nosotros, que son de Simón y funcionan como términos
    de búsqueda.
  - En Desarrollo web el valor se cierra «cuando conversamos tu proyecto» (nota, FAQ de precio y Trabajo).
  - No queda ningún «y más» en las tarjetas. Queda solo el de la Offer de la Plataforma a Medida, donde
    presenta una lista.
  - «El chequeo», a secas, es siempre el de visibilidad en IA. La prueba de Trabajo, que es del chequeo de
    la ley, no lo usa (2.9).
- **El mismo alt para la misma imagen.**
  - Seis imágenes tienen variantes entre páginas: `ventana`, `escritorio`, `domino-curva`, `domino`, `hilo`
    y el retrato de Ramón. Las miré: todas nombran los mismos objetos, con más o menos detalle o según el
    recorte (Método muestra la ventana sin el laptop). Es lo que §7:210 ya aceptó, así que no se cambia
    ninguna.
  - Las obras tienen un solo alt por archivo (§7:274).
- **Tuteo y persona.**
  - El tuteo va en todo, y «ustedes» solo aparece en las preguntas que el visitante le hace a la marca.
  - El plural de marca va en todo lo que se entrega. «Conocer a Ramón» es la voz del visitante.
  - No entra ningún singular nuevo.

---

## Copy por página

### Home

| # | Antes | Después | Por qué |
|---|---|---|---|
| 17 | Desde $490.000 · $690.000 con Visibilidad IA + IVA | Desde $490.000 · $690.000 con Visibilidad en IA + IVA | Glosario 2.10 y 2.11: el plan se llama «Auditoría + Visibilidad en IA» en todas partes. Cifras idénticas. |
| 25 | Ya tienes demanda y quieres más. Google Ads de alta intención: captura a quien ya está buscando lo que ofreces. | Ya tienes demanda y quieres más. Google Ads para llegar a quien ya está buscando lo que ofreces. | Tic 2 (los dos puntos de remate) y jerga de embudo («captura»). Misma hoja que el índice (#793). |
| 29 | Detrás de SpindleLab está una persona, no una agencia de veinte. Cada proyecto parte con el mismo chequeo que puedes correr arriba, sobre tu dominio, y termina con el mismo chequeo corrido otra vez. | Detrás de SpindleLab está una persona, no una agencia de veinte. Al terminar cada proyecto, volvemos a correr el chequeo de arriba sobre tu dominio. | Revisada en el paso 5. A10: «parte con el mismo chequeo» era la tercera vez en la home. Queda lo que solo esta frase dice, sin la adivinanza con dos puntos (tic 2) de la primera propuesta. |
| 32 | Quién está detrás | Conocer a Ramón | Hoja §3: un botón dice qué pasa al hacer clic. Es la voz del visitante, no un singular de la marca. |
| 34 | Ver todo | Ver el blog | Hoja §3: «Ver todo» no dice qué se ve. |
| 50 | Auditamos tu sitio y tu presencia en IA para que ChatGPT, Claude y Perplexity te recomienden antes que tu competencia. Diagnóstico gratis en 24 horas. | Auditamos tu sitio y tu presencia en IA para que ChatGPT, Gemini y Perplexity puedan citarte. Diagnóstico gratis en 24 horas. | **Simón** · revisada en el paso 5. 5a: «te recomienden antes que tu competencia» prometía lo que el sitio dice que nadie garantiza. Redacción de Simón, con Gemini, porque auditar tu presencia es preguntar a mano (hoja 2.12). Revierte el motor de a70e945: ver «Lo que queda para Ramón». |

Cambian 6. No cambian 22 (1 espera R2).

### Servicios (índice)

| # | Antes | Después | Por qué |
|---|---|---|---|
| 774 | Valores en pesos, + IVA. Los publicamos a propósito: la mayoría del rubro no lo hace. | Valores en pesos, + IVA. Los publicamos para que compares antes de escribirnos. | 5a: «la mayoría del rubro» dice más que su fuente (tres competidores en competidores.md; seis de nueve en el estudio del 14-oct). Queda la razón con la que Ramón publicó sus precios (corpus §1). |
| 775 | El centro es tu sitio: lo construimos para que los motores de IA puedan leerlo. Si ya tienes uno y funciona, hay una puerta para eso. Y antes de contratar nada, mira gratis cómo te leen hoy. | El centro es tu sitio. Si hay que hacerlo de nuevo, lo construimos; si ya tienes uno y funciona, hay una puerta para eso. Y antes de contratar nada, mira gratis cómo te leen hoy. | A10 con la fila de Desarrollo web de justo abajo («El sitio nace legible…»), el defecto que §7:176 ya le sacó a la nota de la banda. Los dos enlaces quedan iguales. |
| 785 | Desde $490.000 · $690.000 con Visibilidad IA + IVA | Desde $490.000 · $690.000 con Visibilidad en IA + IVA | Igual que la home (#17): misma hoja. |
| 790 | El contenido creativo lo pones tú. Nosotros lo hacemos funcionar. | *(se borra)* | A10: la sección «Lo que pones tú», pegada debajo, dice lo mismo. «Nosotros lo hacemos funcionar» no dice qué (A1). |
| 793 | Google Ads de alta intención: captura a quien ya está buscando lo que ofreces. | Google Ads para llegar a quien ya está buscando lo que ofreces. | Igual que la home (#25): misma hoja. |
| 801 | Pon tu dominio y ves en segundos si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio. Gratis y sin dejar tu correo. | Es gratis y revisa 21 señales de tu dominio en segundos, sin pedirte el correo. Cada señal que no pases viene con la instrucción para arreglarla. | P86: el botón lleva a Diagnóstico, que abre con casi la misma frase. Las 21 señales y la instrucción por señal son datos del chequeo. |
| 804 | Soluciones: SEO técnico, visibilidad en IA y desarrollo web · SpindleLab | Servicios: SEO técnico, visibilidad en IA y desarrollo web | **Simón** · revisada en el paso 5. Decidida (§7:177, la decide él). 72 caracteres contra el tope de 65, y «Soluciones» contra la miga y el menú. Sin sufijo a propósito (og:site_name): 58 caracteres. Vale para og:title. |

Cambian 7. No cambian 30 (1 espera R2).

### Desarrollo web

| # | Antes | Después | Por qué |
|---|---|---|---|
| 979 | Sitios a medida con el SEO técnico puesto desde el primer commit. Tres planes, desde $390.000 + IVA. | Sitios a medida con el SEO técnico puesto desde el primer commit. Cuatro planes, desde $390.000 + IVA. | Dato: la página muestra cuatro planes, y la Desarrollo web publicada dice «4 packs». |
| 982 | Valores en pesos, + IVA. El valor final se cierra tras el diagnóstico gratuito. | Valores en pesos, + IVA. El valor final se cierra cuando conversamos tu proyecto. | Glosario 2.2: el mini-diagnóstico no le pone precio a un sitio, y quien parte de cero no tiene sitio que diagnosticar. Vale para las dos copias de la nota. |
| 983 | A veces el problema no es lo que se audita: es lo que hay que reconstruir. Construimos el sitio para que las máquinas que hoy recomiendan tu negocio puedan leerlo, y te lo demostramos con el mismo chequeo sobre tu dominio. | Esto es para cuando no tienes sitio o hay que hacerlo de nuevo. Si el tuyo funciona, te sirve más Visibilidad en IA. | Revisada en el paso 5. P86: repetía la línea cerrada del campo Desarrollo y el menú. Ahora dice para quién es la página y adónde va el que no la necesita. Puede llevar el enlace a Visibilidad en IA (§7:191). La postura la confirma Ramón (anexo D, 10). |
| 985 | Legible para motores de IA desde el primer commit: datos estructurados, contenido citable e indexación. | Legible para motores de IA: datos estructurados, contenido citable e indexación. | A10: «desde el primer commit» ya va en la línea bajo el h1. La serie que queda es la única de la página. |
| 986 | El mismo chequeo que corres gratis en la portada, pasado sobre tu sitio antes de entregarlo. | El mismo chequeo que corres gratis en la portada, pasado sobre tu sitio antes de entregarlo. Te dejamos el puntaje por escrito y, si tenías otro sitio, también el de antes. | Revisada en el paso 5. Encargo del 14-oct. El resultado de los cuatro planes, dicho una vez: el puntaje por escrito y, si había sitio, el de antes. La frase enlazada queda igual. La nueva no lleva «chequeo», por el corte de la plantilla. |
| 1019 | Todo lo del Sitio Completo, y más | Todo lo del Sitio Completo | Corregida al unificar. Sin «y más», como los otros nueve planes del sitio. |
| 1027 | Conversamos sobre tu negocio, tu marca y qué necesita comunicar el sitio. Definimos la dirección de diseño con referentes concretos de tu rubro. | Conversamos sobre tu negocio y sobre a quién le tiene que hablar el sitio. Definimos la dirección de diseño con referentes concretos de tu rubro. | A3, y el tercer elemento repetía el h2 del cierre («Cuéntanos qué necesita comunicar tu sitio»). |
| 1033 | Construimos el sitio con el agente de desarrollo de SpindleLab, con supervisión técnica humana en cada avance. Sigues el progreso en una URL de prueba. | Construimos el sitio con el agente de desarrollo de SpindleLab. Sigues cada avance en una URL de prueba. | A10: la revisión humana en cada avance ya la dicen la lista y la FAQ. |
| 1039 | Configuramos dominio, SSL y analítica, y publicamos en producción. Quedas con 30 días de garantía para corregir errores de funcionamiento. | Publicamos el sitio en tu dominio. Quedas con 30 días de garantía para corregir errores de funcionamiento. | A3 y A10: «dominio, SSL y analítica» repetía «Todo parte con esto». Queda lo que cubre la garantía, con los 30 días idénticos. |
| 1042 | No. Cada sitio se construye con código propio, a medida. Sin temas genéricos ni page builders: control total sobre rendimiento, diseño y SEO técnico. | No. Cada sitio se construye con código propio, sin temas genéricos ni page builders. Así controlamos el rendimiento y el SEO técnico desde la base. | Va también al JSON-LD. A3 y tic 2. «Control total» repetía «Todo parte con esto». |
| 1044 | Cada pack tiene un precio de partida («desde»): Página de Campaña desde $390.000 + IVA, Sitio Esencial desde $690.000 + IVA y Sitio Completo desde $1.190.000 + IVA; la Plataforma a Medida se cotiza tras una reunión. El valor final se cierra tras el diagnóstico gratuito, según las páginas y funcionalidades que necesites. Sin sorpresas. | Cada plan tiene un precio de partida: Página de Campaña desde $390.000 + IVA, Sitio Esencial desde $690.000 + IVA y Sitio Completo desde $1.190.000 + IVA. La Plataforma a Medida se cotiza tras una reunión. El valor final se cierra cuando conversamos tu proyecto, según las páginas y funciones que necesites. | Va también al JSON-LD. «Plan», no «pack» (1.7). Tic 1 en «Sin sorpresas». El valor se cierra al conversar, como la nota (#982). Precios idénticos. |
| 1046 | La ejecución asistida por IA reduce tiempos, no supervisión: cada fase pasa por revisión humana antes de avanzar a la siguiente. La velocidad se traduce en plazos más cortos, no en menos control de calidad. | La IA acorta los plazos, no la supervisión: cada fase pasa por revisión humana antes de avanzar a la siguiente. | Va también al JSON-LD. Tic 1: la segunda frase repetía la primera con otra contraposición. Queda una sola, con un contraste real. |
| 1048 | Sí, de base: rendimiento, datos estructurados y arquitectura pensados desde el diseño. Si además necesitas visibilidad en motores de IA, ese trabajo se profundiza con el servicio de Visibilidad en IA. | Sí. El SEO técnico va de base en todos los planes y se piensa desde el diseño. Si además necesitas visibilidad en motores de IA, ese trabajo se profundiza con el servicio de Visibilidad en IA. | Va también al JSON-LD. A3 y A10 con «Todo parte con esto». «En todos los planes» es dato de las cuatro tarjetas. |
| 1050 | Si ya tienes uno, empezamos con el diagnóstico gratuito. Si partes de cero, conversemos tu proyecto directamente. | Si ya tienes uno, empezamos con el mini-diagnóstico gratuito. Si partes de cero, conversemos tu proyecto directamente. | Glosario 2.2. §7:241 decidió el cierre, no el nombre del paso, y la hoja deja unificarlo. |
| nueva · nota de planes, la condición | *(nuevo)* | Cada plazo cuenta desde que nos llegan el anticipo, los textos y las imágenes. Para publicar necesitamos acceso a tu dominio. | Revisada en el paso 5. Encargo del 14-oct. La condición de los cuatro planes, una vez, en la nota de planes: la de la cotización, más el acceso al dominio para publicar (Simón). |

Cambian 15. No cambian 75.

### Visibilidad en IA

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1230 | · Visibilidad en IA (AEO/GEO) | · Visibilidad en IA | Va también al JSON-LD · revisada en el paso 5. Hoja 2.11: la miga dice lo mismo que el menú (§7:203). Cambia junto con el BreadcrumbList. Simón lo aprueba. |
| 1231 | Visibilidad en IA (AEO/GEO) | Visibilidad en IA | **Simón** · revisada en el paso 5. Hoja 2.11: el rótulo con la palabra del visitante. «AEO/GEO» se queda en el title, la meta, el grafo y la FAQ que lo define. Simón lo aprueba. |
| 1232 | Que ChatGPT, Gemini y Perplexity citen a tu empresa. Tres planes, desde $400.000 + IVA. | Trabajamos para que aparezcas cuando tus clientes le preguntan a ChatGPT, Gemini o Perplexity por tu rubro. Tres planes, desde $400.000 + IVA. | Revisada en el paso 5. Encargo del 14-oct. «Citen a tu empresa» prometía lo que la misma página niega. Queda la fórmula del manual §01, la misma del menú. Gemini se queda, porque es donde pregunta el cliente (hoja 2.12). |
| 1233 | Valores en pesos, + IVA. Los acompañamientos son mensuales; el valor final se cierra tras el diagnóstico gratuito. | Valores en pesos, + IVA. Los acompañamientos son mensuales; el valor final se cierra tras el mini-diagnóstico gratuito. | Glosario 2.2: una sola forma por página. |
| 1234 | Este servicio analiza cómo te describen ChatGPT, Gemini y Perplexity, y optimiza tu contenido, estructura y señales de autoridad para que te citen a ti como fuente confiable. | Los motores leen tu sitio y también lo que se dice de tu empresa fuera de él, y nos ocupamos de los dos. | Revisada en el paso 5. Repetía la línea de arriba (los tres motores y «que te citen»), con una serie de tres y jerga. Al unificar salió «el sitio que ya tienes, sin rehacerlo» (P86). En la revisión, una sola frase, porque la línea nueva (#1232) ya empieza con «Trabajamos». |
| 1235 | De invisible a citable | Lo que incluye | Revisada en el paso 5. «De invisible a citable» prometía un cambio que la página después matiza. «Lo que incluye» es el h2 de las otras páginas de servicio. |
| 1237 | Ejecutamos las preguntas que haría tu cliente ideal en los principales motores de IA y documentamos si apareces, cómo te describen y quién está ganando esas respuestas hoy. | Antes de tocar nada, les hacemos a los motores de IA las preguntas que haría tu cliente y anotamos si apareces, cómo te describen y quién gana hoy esas respuestas. | Calco («ejecutamos las preguntas») y jerga («cliente ideal»). La promesa de medir no cambia. |
| 1239 | Alineamos quién eres, qué haces y dónde operas en todo el ecosistema: tu sitio, datos estructurados, directorios y perfiles. Los modelos citan lo que entienden sin ambigüedad. | Ordenamos tu sitio, tus datos estructurados, los directorios y tus perfiles para que digan lo mismo sobre tu empresa. Los modelos citan lo que entienden sin ambigüedad. | Jerga («alineamos quién eres», «ecosistema»), tic 2 y una segunda serie de tres. |
| 1241 | Reestructuramos tus páginas clave para que respondan preguntas concretas con definiciones, datos y formato que los modelos pueden extraer y citar con confianza. | Reestructuramos tus páginas clave para que respondan preguntas concretas, con definiciones y datos que un modelo pueda extraer y citar. | Prueba del 30 %: «formato» y «con confianza» no suman. |
| 1248 | La radiografía: qué dice la IA de ti hoy, y qué falta. | Qué dice hoy la IA de ti y qué te falta. | «La radiografía» es el nombre del mini-diagnóstico, que es gratis. Aquí nombraba un plan de $400.000. |
| 1256 | Medimos y optimizamos mes a mes para que te empiecen a citar. | Medimos y optimizamos mes a mes, sobre lo que encontró la auditoría. | Revisada en el paso 5. Ranura R2, arreglo de 5a. «Para que te empiecen a citar» prometía la cita. «Medimos» y «mes a mes» quedan igual: el conteo de cadencia no cambia. |
| 1257 | Todo lo de la Auditoría, y más | Todo lo de la Auditoría de Visibilidad | Sin «y más». «La Auditoría» a secas se confunde con la Auditoría SEO técnica. |
| 1265 | Todo lo del Esencial, y más | Todo lo del Esencial | Sin «y más». |
| 1273 | Las señales que optimizamos son las que los modelos usan para elegir fuentes. Eso se mueve y se mide. | Las señales que optimizamos son las que los modelos usan para elegir fuentes. | Tic 1: «Eso se mueve y se mide» remataba la frase anterior. |
| 1276 | Protocolo repetible de consultas, no pantallazos anecdóticos. Sabrás si avanzas y contra quién. | Sabrás si avanzas y contra quién, sin depender de un pantallazo suelto. | «Protocolo repetible» iba cuatro veces en la página (§7:193). La promesa de medir no cambia. |
| 1282 | Sin texto oculto ni manipulación. Lo que construye citabilidad es lo mismo que construye confianza real. | Sin texto oculto ni manipulación. | Tic 1: el aforismo evaluaba la frase anterior sin agregar un hecho. |
| 1285 | Sí, dentro de límites honestos. Los motores de IA eligen fuentes según claridad de entidad, autoridad y contenido citable. Optimizar esas señales aumenta de forma medible la probabilidad de ser citado; nadie puede garantizar una respuesta específica. | Sí, hasta cierto punto. Los motores de IA eligen fuentes según la claridad de entidad, la autoridad y el contenido citable. Trabajar esas señales sube la probabilidad de que te citen. | Va también al JSON-LD. La no-garantía ya está en «No prometemos». «De forma medible» no tenía respaldo en la respuesta. |
| 1289 | Con un protocolo de consultas repetibles: las preguntas que haría tu cliente ideal, ejecutadas periódicamente en los principales motores, registrando si apareces, cómo te describen y a quién citan. | Les hacemos periódicamente a los principales motores las mismas preguntas que haría tu cliente y registramos si apareces, cómo te describen y a quién citan. | Va también al JSON-LD. El cuarto «protocolo… repetible» de la página, y «cliente ideal». La promesa no cambia. |
| 1291 | Si tu negocio depende de ser encontrado, bloquear GPTBot o Google-Extended te saca de las respuestas. Recomendamos permitirlos de forma deliberada, salvo contenido que necesites proteger. | Si tu negocio depende de que te encuentren, no. Bloquear los robots con que ChatGPT, Claude y Perplexity buscan en el momento (OAI-SearchBot, Claude-SearchBot y PerplexityBot) te puede sacar de sus respuestas, así que recomendamos dejarlos entrar, salvo en el contenido que necesites proteger. GPTBot solo recoge texto para entrenar modelos, y bloquearlo es otra decisión. | Va también al JSON-LD · revisada en el paso 5. Dato corregido: bloquear GPTBot no te saca de ChatGPT, y Google-Extended también controla el grounding de Gemini (Google), así que no va entre los de entrenamiento. Contesta la pregunta de entrada. |
| 1293 | La Auditoría de Visibilidad parte en $400.000 + IVA (pago único). El acompañamiento mensual parte en $590.000/mes + IVA (Esencial) y $790.000/mes + IVA (Pro). El valor final se cierra tras el diagnóstico gratuito, según el tamaño de tu sitio y las consultas a cubrir. | La Auditoría de Visibilidad parte en $400.000 + IVA (pago único). El acompañamiento mensual parte en $590.000/mes + IVA (Esencial) y $790.000/mes + IVA (Pro). El valor final se cierra tras el mini-diagnóstico gratuito, según el tamaño de tu sitio y las consultas a cubrir. | Va también al JSON-LD. Glosario 2.2: una sola forma por página. Precios idénticos. |
| 1298 | Visibilidad en IA (AEO/GEO): que ChatGPT, Gemini y Perplexity citen a tu empresa, con análisis de presencia, claridad de entidad y contenido citable. | Visibilidad en IA (AEO/GEO): análisis de tu presencia en ChatGPT, Gemini y Perplexity, claridad de entidad y contenido que puedan citar. | **Simón** · revisada en el paso 5. Decidida (§7:213, la sigla queda). «Citen a tu empresa» contradecía la página. «Probabilidad de cita» se lee como una hora agendada. 136 caracteres. |
| 1303 | Radiografía única: medición en ChatGPT, Gemini y Perplexity, quién gana esas respuestas, y plan de citabilidad priorizado. Entrega en ~2 semanas. | Pago único: medición en ChatGPT, Gemini y Perplexity, quién gana esas respuestas y plan de citabilidad priorizado. Entrega en ~2 semanas. | **Simón** · va también al JSON-LD. «Radiografía» es el nombre del mini-diagnóstico. «Pago único», como dice la FAQ de precio. |
| nueva · párrafo del compromiso, bajo los planes | *(nuevo)* | En el Acompañamiento Esencial y en el Pro nos comprometemos a que, a los 3 meses (el mínimo del plan), tu sitio saque en el chequeo gratis más puntos que el día en que partimos, contando las mismas señales, y a que los robots de ChatGPT, Claude y Perplexity puedan entrar a él. Necesitamos a alguien de tu equipo que apruebe los cambios que proponemos; si no se publican, el puntaje no se mueve. El chequeo es público, así que lo compruebas tú. | **Para Ramón** · revisada en el paso 5. Encargo del 14-oct. El compromiso de los 3 meses, en un párrafo bajo los planes, igual que en Acompañamiento. Solo promete lo que el cliente comprueba con el chequeo. «Contando las mismas señales» es de Simón. |

Cambian 23. No cambian 55 (11 esperan R2).

### Auditoría SEO técnica

| # | Antes | Después | Por qué |
|---|---|---|---|
| 900 | Sabemos que tu sitio «funciona». La pregunta es si Google y los motores de IA pueden rastrearlo, entenderlo y confiar en él. Esta auditoría responde eso con evidencia y entrega un plan priorizado por impacto, no un volcado de 200 hallazgos sin jerarquía. | Que tu sitio funcione para quien lo visita no dice si Google y los motores de IA pueden rastrearlo, entenderlo y confiar en él. La auditoría lo responde con evidencia. | Revisada en el paso 5. Concede sin la ironía de las comillas. Sale «200», una cifra sin respaldo que §7:193 ya sacó de la nota. Sale el contraste con «un volcado de hallazgos», que repetía Método (#701) y el bloque B. |
| 905 | Velocidad real de carga en celular y computador, scripts de terceros que frenan tu sitio, y qué corregir primero para pasar los umbrales de Google. | Velocidad real de carga en celular y computador, scripts de terceros que frenan tu sitio y qué te falta para pasar los umbrales de Google. | A10 con el bloque B y el cierre. Ahora dice lo que mide esta capa. |
| 911 | Autoría, políticas, transparencia corporativa y consistencia de entidad. En sectores financieros y de salud, esto define si te recomiendan o no. | Autoría, políticas, transparencia corporativa y consistencia de entidad. En finanzas y salud, Google y los motores de IA exigen pruebas de que eres quien dices ser. | 5a: «esto define si te recomiendan» dice más que su respaldo. La frase nueva tiene fuente (el artículo del mini-diagnóstico y las pautas YMYL de Google). |
| 913 | Toda auditoría pagada entrega lo mismo: un informe priorizado por impacto, código y datos estructurados listos para pegar, y una sesión de traspaso con tu equipo. | Las dos auditorías pagadas entregan lo mismo; cambia lo que cubren. | A10: los entregables salían tres veces seguidas. |
| 918 | Una corrección de mayor impacto para partir | La corrección de mayor impacto, para partir | Comparativo sin término. Igual en su Offer (#968). |
| 927 | Auditoría + Visibilidad IA | Auditoría + Visibilidad en IA | Revisada en el paso 5. Glosario 2.10 y 2.11. Igual en la FAQ de precio y en el Offer. |
| 930 | Todo lo de la Auditoría Completa, y más | Todo lo de la Auditoría Completa | Revisada en el paso 5. Sin «y más», como los otros planes del sitio. |
| 951 | Acceso de lectura a Google Search Console y Analytics, y una conversación de 20 minutos sobre tu negocio. No necesitamos acceso al código ni al servidor. | Acceso de lectura a Google Search Console (y a Analytics, si lo tienes) y una conversación de 20 minutos sobre tu negocio. No necesitamos acceso al código ni al servidor. | Va también al JSON-LD · corregida al unificar. Dato: onboarding-cliente.md §2 marca Analytics como opcional en la Auditoría, y Método ya lo dice así (#713). |
| 957 | El mini-diagnóstico es gratis. La Auditoría Completa parte en $490.000 + IVA y la Auditoría + Visibilidad IA en $690.000 + IVA. El valor final se cierra tras el mini-diagnóstico gratuito, según el tamaño del sitio. | El mini-diagnóstico es gratis. La Auditoría Completa parte en $490.000 + IVA y la Auditoría + Visibilidad en IA en $690.000 + IVA. El valor final se cierra tras el mini-diagnóstico, según el tamaño del sitio. | Va también al JSON-LD · revisada en el paso 5. Nombre del plan, y sale el segundo «gratuito». Precios idénticos. |
| 968 | Radiografía de una página con los hallazgos técnicos más relevantes y una corrección de mayor impacto. Gratis, en 24 horas. | Radiografía de una página con los hallazgos técnicos más relevantes y la corrección de mayor impacto. Gratis, en 24 horas. | **Simón** · va también al JSON-LD. El mismo arreglo de la tarjeta (#918). |
| 971 | Auditoría + Visibilidad IA | Auditoría + Visibilidad en IA | **Simón** · va también al JSON-LD · revisada en el paso 5. El nombre del plan, como la tarjeta y la FAQ. |
| nueva · Auditoría Completa, punto de plazo | *(nuevo)* | Entrega en 2 a 3 semanas desde el acceso a los datos | Revisada en el paso 5. Encargo del 14-oct. El plazo como punto de la tarjeta, igual que en las otras tarjetas pagadas. La cifra es la de la FAQ (#949). |
| nueva · Auditoría + Visibilidad en IA, punto de plazo | *(nuevo)* | Entrega en 2 a 3 semanas desde el acceso a los datos | **Dato a verificar** · revisada en el paso 5. Si la auditoría y la visibilidad corren en paralelo, vale este punto. Si no, el plazo lo das tú. Sin el dato, la tarjeta va sin él. |

Cambian 13. No cambian 66.

### Acompañamiento mensual

| # | Antes | Después | Por qué |
|---|---|---|---|
| 824 | Piezas pensadas para posicionar en Google y ser citadas por los modelos: estructura de respuesta, datos verificables y schema correcto. | Textos pensados para posicionar en Google y para que los modelos puedan citarlos: estructura de respuesta, datos verificables y schema correcto. | Revisada en el paso 5. Glosario 2.12: «pieza» es obra o pieza gráfica. Encargo del 14-oct: «puedan citarlos», no «los citen», igual que Método (#682). |
| 836 | Sostener y mejorar un frente: técnico o visibilidad en IA. | Sostener y mejorar una capa: SEO técnico o visibilidad en IA. | «Un frente» nombra otra cosa en «A medida». La página habla de capas. |
| 837 | Foco en una capa (técnica o visibilidad) | *(se borra)* | Repetía la tagline palabra por palabra. |
| 851 | Todo lo del Pro, y más | Todo lo del Pro | Sin «y más». |
| 870 | Porque el SEO y la visibilidad en IA se mueven en ciclos de semanas: rastreo, re-indexación y actualización de los modelos. En menos de tres meses no hay señal suficiente para evaluar con seriedad. | Porque el SEO y la visibilidad en IA se mueven en ciclos de semanas: rastreo, reindexación y actualización de los modelos. En menos de tres meses no hay señal suficiente para evaluar con seriedad. | Va también al JSON-LD. Ortografía (RAE). |
| 878 | El plan Esencial parte en $590.000/mes + IVA y el Pro en $790.000/mes + IVA; el plan a medida se cotiza tras una reunión. El plan se dimensiona tras el diagnóstico gratuito, según el tamaño del sitio y tus objetivos. | El plan Esencial parte en $590.000/mes + IVA y el Pro en $790.000/mes + IVA; el plan a medida se cotiza tras una reunión. Cuál te conviene lo definimos después del mini-diagnóstico gratuito, según el tamaño del sitio y tus objetivos. | Va también al JSON-LD. Glosario 2.2 y sale la pasiva. Precios idénticos. |
| 880 | Envíanos tu URL y en 24 horas tienes el diagnóstico gratuito: es el punto de partida para dimensionar tu plan. | Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito. | Glosario 2.2: la misma frase de los otros cuatro cierres. Sale el anuncio con dos puntos. |
| nueva · párrafo del compromiso, bajo los planes | *(nuevo)* | En el Esencial y en el Pro nos comprometemos a que, a los 3 meses (el mínimo del plan), tu sitio saque en el chequeo gratis más puntos que el día en que partimos, contando las mismas señales, y a que los robots de ChatGPT, Claude y Perplexity puedan entrar a él. Necesitamos a alguien de tu equipo que apruebe los cambios que proponemos; si no se publican, el puntaje no se mueve. El chequeo es público, así que lo compruebas tú. | **Para Ramón** · revisada en el paso 5. Encargo del 14-oct. El mismo párrafo de Visibilidad, con los planes como los nombra esta página. Si no lo confirmas, no va en ninguna de las dos. |

Cambian 8. No cambian 70 (21 esperan R2).

### Gestión de redes sociales

| # | Antes | Después | Por qué |
|---|---|---|---|
| 1153 | LinkedIn o Meta, con estrategia, comunidad y reportes: desde $390.000/mes + IVA. Con pauta en Meta y las dos redes, desde $590.000/mes + IVA. El creativo lo pones tú. | LinkedIn o Meta, con estrategia, comunidad y reportes: desde $390.000/mes + IVA. Con pauta en Meta y las dos redes, desde $590.000/mes + IVA. El contenido creativo lo pones tú. | Revisada en el paso 5. «El creativo» es calco de «the creative» y se lee como una persona. Queda la forma del índice. El orden que fijó §7:193 no cambia. Precios idénticos. |
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
| 1218 | Gestión de redes en LinkedIn y Meta: estrategia, pauta, comunidad y reportes, orquestado con agentes de IA. El contenido creativo lo pones tú. | Gestión de redes sociales para empresas en LinkedIn y Meta: estrategia, pauta, comunidad y reportes. El contenido creativo lo pones tú. | **Simón** · revisada en el paso 5. «Orquestado con agentes de IA»: jerga (5b) y algo que la página no dice. Forma única del servicio (2.7). Vale para og:description. |
| 1227 | Multi-plataforma y mayor volumen: todo lo anterior con plataformas y cadencia a definir, integrado con SEO, IA y Paid Media. Se cotiza tras una reunión. | Multi-plataforma y mayor volumen: todo lo anterior con plataformas y cadencia a definir, integrado con SEO, visibilidad en IA y Paid Media (Google). Se cotiza tras una reunión. | **Simón** · va también al JSON-LD. El mismo arreglo de la tarjeta (#1189). |

Cambian 22. No cambian 51 (8 esperan R2).

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
| 1131 | ¿Se integra con el SEO y la visibilidad en IA? | ¿Se integra con el SEO? | **Simón** · va también al JSON-LD · revisada en el paso 5. La respuesta no habla de visibilidad en IA, y la Offer tampoco. |
| 1132 | Sí, y ahí está la diferencia. La pauta acelera lo que el orgánico ya mueve: enviamos el tráfico pagado a páginas trabajadas para convertir y lo medimos todo junto. Si el sitio al que llega ese tráfico no está trabajado, la pauta paga por visitas que se pierden. | Sí. Enviamos el tráfico pagado a páginas trabajadas para convertir y lo medimos todo junto. Si el sitio al que llega ese tráfico no está trabajado, la pauta paga por visitas que se pierden. | Va también al JSON-LD. Tic 1 («y ahí está la diferencia»), y repetía la frase cerrada de la lista (R4). |
| 1146 | Varias campañas y objetivos con optimización avanzada, seguimiento de conversiones e integración con SEO, redes y sitio. La inversión publicitaria va aparte. | Varias campañas y objetivos, con seguimiento de conversiones e integración con SEO, redes y sitio. La inversión publicitaria va aparte. | **Simón** · va también al JSON-LD · revisada en el paso 5. Sale «optimización avanzada», como en la tarjeta (#1102). |

Cambian 19. No cambian 53.

### Método

| # | Antes | Después | Por qué |
|---|---|---|---|
| 673 | Todo parte con tu URL y el chequeo de 21 señales, el mismo que puedes correr tú en segundos. Después revisamos el sitio a mano (rastreo, indexación, velocidad, datos estructurados y señales de confianza) y sintetizamos los hallazgos más relevantes en un mini-diagnóstico de una página. Y conversamos 20 minutos para entender tu negocio y las búsquedas que te importan. | Todo parte con tu URL y el chequeo de 21 señales, el mismo que puedes correr tú en segundos. Después revisamos el sitio a mano (rastreo, indexación, velocidad, datos estructurados y señales de confianza) y conversamos 20 minutos para entender tu negocio y las búsquedas que te importan. | Lo mismo que dice el dato de abajo («Recibes: Mini-diagnóstico de una página…»). |
| 682 | Con la base técnica clara, medimos tu presencia en los motores de IA: ejecutamos las preguntas que haría tu cliente ideal en ChatGPT, Gemini y Perplexity, documentamos quién gana esas respuestas hoy, y diseñamos la hoja de ruta para que los modelos te citen y recomienden (claridad de entidad, contenido citable y autoridad). | Con la base técnica clara, medimos tu presencia en los motores de IA: hacemos en ChatGPT, Gemini y Perplexity las preguntas que haría tu cliente y vemos quién gana hoy esas respuestas. Con eso armamos la hoja de ruta para que los modelos puedan citarte. | Corregida al unificar. Encargo del 14-oct y «Sin promesas mágicas»: «puedan citarte», no «te citen». Sale una segunda serie de tres. Al unificar, «tu cliente ideal» pasa a «tu cliente», como en Visibilidad. |
| 688 | Ejecutamos los cambios técnicos y de contenido en conjunto con tu equipo: correcciones de indexación y velocidad, datos estructurados listos para pegar, y páginas reestructuradas para responder preguntas con formato citable. Tú decides el ritmo: entrega de especificaciones para tu equipo, o ejecución directa nuestra. | Los cambios son técnicos y de contenido: correcciones de indexación y velocidad, datos estructurados listos para pegar y páginas reestructuradas para responder preguntas en formato citable. Tú decides si los ejecuta tu equipo, con nuestras especificaciones, o los ejecutamos nosotros. | Lo que se decide es quién ejecuta, no el ritmo. |
| 689 | Según alcance: típicamente 2 a 6 semanas | 2 a 6 semanas, según el alcance | Calco de «typically». Cifra idéntica. |
| 701 | Nunca entregamos 200 hallazgos sin jerarquía. Primero lo que mueve resultados; lo cosmético, al final o nunca. | Nunca entregamos hallazgos sin jerarquía. Primero lo que más te frena; lo cosmético, al final o nunca. | Cifra sin respaldo, la que §7:193 ya sacó de Servicios. «Lo que más te frena» es la fórmula del sitio (§7:250). |
| 709 | Con eso parte el diagnóstico gratuito. | Con eso parte el mini-diagnóstico. | Glosario 2.2: una forma por página. |
| 713 | Google Search Console y Analytics para la auditoría completa. Nunca pedimos accesos de administrador. | Google Search Console, y Analytics si lo tienes, para la auditoría completa. Nos agregas como usuario, sin compartir tu contraseña. | Revisada en el paso 5. 5a. «Nunca pedimos accesos de administrador» choca con onboarding-cliente.md, que en Acompañamiento pide un usuario de CMS con rol admin. «Nunca te pedimos tu contraseña» tampoco tenía respaldo (:34). Queda lo cierto para estos dos accesos. |
| 717 | Envíanos tu URL y en 24 horas tienes el mini-diagnóstico. Los otros tres pasos, solo si el primero te convence. | Envíanos tu URL y en 24 horas tienes el mini-diagnóstico. Las otras tres fases, solo si la primera te convence. | Una sola palabra para las etapas del método: «fase», como el botón y la nota. |

Cambian 8. No cambian 57 (8 esperan R2).

### Chequeo gratis (Diagnóstico)

| # | Antes | Después | Por qué |
|---|---|---|---|
| 616 | 21 chequeos, 100 puntos. Tres bloques, con su peso a la vista: leerte 30, entenderte 40, citarte 30. | 21 chequeos, 100 puntos. Tres bloques: leerte 30, entenderte 40, citarte 30. | Lo dicen los números y el rótulo de abajo. Cifras idénticas. |
| 617 | El chequeo de esta página lee tu sitio; el mini-diagnóstico le pregunta a los motores. Los dos son gratis. | El chequeo de esta página lee tu sitio; el mini-diagnóstico lo hacemos a mano y te dice qué arreglar primero. Los dos son gratis. | **Para Ramón** · revisada en el paso 5. Decidida (§7:168). 5a: el sitio promete que el mini-diagnóstico le pregunta a los motores, y nada en el proceso lo asegura. (a) Se queda si confirmas que cada mini-diagnóstico corre esas preguntas. (b) La propuesta, si no. Sin respuesta, va la b. |
| 623 | No todos los robots de IA hacen lo mismo: unos buscan en vivo cuando alguien pregunta (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) y otros recogen texto para entrenar modelos futuros (GPTBot, ClaudeBot, Google-Extended, CCBot). Bloquear a los primeros te borra de las respuestas de hoy; bloquear a los segundos no te quita ni una cita y es una decisión legítima. Verificamos ambos por separado, probamos si tu servidor expulsa a los robots por su nombre, y que el sitio responda 200 por HTTPS. Si los bots en vivo no entran, nada de lo demás importa. | No todos los robots de IA hacen lo mismo: unos buscan en vivo cuando alguien pregunta (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) y otros recogen texto para entrenar modelos futuros (GPTBot, ClaudeBot, Google-Extended, CCBot). Bloquear a los primeros te borra de las respuestas de hoy en ChatGPT, Claude y Perplexity; bloquear a los segundos no te quita ahí ni una cita y es una decisión legítima. Verificamos ambos por separado, probamos si tu servidor expulsa a los robots por su nombre, y que el sitio responda 200 por HTTPS. Si los bots en vivo no entran, nada de lo demás importa. | Revisada en el paso 5. 5a. Para Gemini no es cierto que bloquear Google-Extended no te quite ni una cita (Google: también controla el grounding de Gemini Apps). Se acota a los tres motores que el chequeo prueba. Las categorías del instrumento no cambian. |
| 632 | Quienes aparecen recomendados casi nunca lo consiguen desde su propio sitio: los motores los citan desde rankings, directorios y artículos de terceros. Sin saber de dónde sale la recomendación, no hay nada que trabajar. | Los motores citan rankings, directorios y artículos de terceros, y no solo el sitio de quien recomiendan. Si no sabes de dónde sale la recomendación, no sabes qué trabajar. | 5a: «casi nunca lo consiguen desde su propio sitio» dice más que su fuente (test-menciones-ia.md:77, «no solo»). |
| 636 | Automático, en segundos, sobre tu sitio. Te dice si estás técnicamente listo y qué corregir primero. | Automático y en segundos. Te dice si tu sitio está técnicamente listo y qué corregir primero. | A3: era una segunda serie de tres en la página. |
| 639 | Lo hacemos a mano. Le preguntamos a ChatGPT, Gemini y Perplexity por tu categoría, y vemos quién aparece en tu lugar y qué fuentes citan. Una página, gratis, en 24 horas. | Lo hacemos a mano y te dice qué te frena y qué arreglar primero. Una página, gratis, en 24 horas. | **Para Ramón** · revisada en el paso 5. Decidida (§7:217). La misma decisión que la guía (#617) y el resultado del chequeo (#1440). (a) Se queda tal cual si confirmas. (b) La propuesta, si no. |
| 651 | No. Este chequeo mide si tu sitio está preparado, no si hoy te citan. Los motores arman sus respuestas con fuentes de terceros (rankings, directorios, artículos), no solo con tu sitio. Puedes estar impecable por dentro y aun así no aparecer. Qué fuentes te faltan es justo lo que revisa el mini-diagnóstico. | No. Puedes estar impecable por dentro y aun así no aparecer, porque los motores también arman sus respuestas con lo que publican otros sitios. Qué fuentes te faltan es lo que revisa el mini-diagnóstico. | Va también al JSON-LD. A10: repetía la respuesta de arriba, la nota de «Lo que este chequeo no mide» y la lista de las corridas. |
| 653 | No guardamos el dominio consultado ni te pedimos datos. El chequeo lee únicamente páginas públicas de tu sitio, las mismas que lee cualquier buscador. | No guardamos el dominio consultado ni te pedimos datos. | Va también al JSON-LD. A10: repetía la nota del instrumento (el mismo criterio de §7:164). Comprobado que chequeo.js no guarda nada. |

Cambian 8. No cambian 43 (2 esperan R2).

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
| 1331 | Pon tu dominio y ves en segundos si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio, sea cual sea el rubro. Es el mismo chequeo con el que partimos cada proyecto. | Sea cual sea tu rubro, el chequeo gratis te muestra en segundos qué ve la IA en tu sitio. Es el mismo chequeo con el que partimos cada proyecto. | Revisada en el paso 5. La segunda frase es la decidida (§7:275). P86: la primera repetía la línea con que abre Diagnóstico, adonde lleva el botón. «El chequeo gratis» le da referente a la frase decidida. |
| 1332 | Si hay que construirlo de nuevo, eso es Desarrollo web: tres planes, y el valor final se cierra tras el diagnóstico gratuito. | Si hay que construirlo de nuevo, eso es Desarrollo web: cuatro planes, y el valor final se cierra cuando conversamos tu proyecto. | Corregida al unificar. Sigue a la Desarrollo web nueva, con cuatro planes y el valor que se cierra al conversar (H #979 y #982). |
| nueva · ficha de Verifica y Cumple | *(nuevo)* | El primer sitio que revisó fue el nuestro. spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026 y, con lo que encontró ya arreglado, 73 el 21 de septiembre. El 14 de octubre, ya con otra forma de puntuar, sacó 100. Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los rastreadores, hoy no suma ni resta. | **Para Ramón** · revisada en el paso 5. Encargo del 14-oct. El chequeo de la Ley 21.719, no el del hero. 36 y 73 con la misma vara, ya públicos (21-sep). El 100, con otra. Dice lo que hoy no cuenta (Simón). Variante sin las cifras viejas, en el anexo D. |

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
| 1359 | Estudio de diseño y SEO técnico en Santiago. Construimos el sitio y dejamos resuelto que las máquinas que hoy recomiendan tu negocio puedan leerlo. | Estudio de diseño y SEO técnico en Santiago. Trabajamos para que tu empresa aparezca cuando tus clientes preguntan, en Google y en los motores de IA. | P86: la fórmula de la línea cerrada del campo Desarrollo no se repite fuera de ahí, y el menú está en las 21 rutas. Va el posicionamiento del manual §01, con «trabajamos para que». |
| 1377 | Si quieres hablar de tu sitio, escríbenos. | Hablemos de tu sitio. | Hoja §3: el texto pegado al botón repetía su verbo. 21 rutas. |
| 1440 | El chequeo revisa tu sitio. El diagnóstico te dice quién aparece hoy cuando alguien pregunta por tu rubro en ChatGPT, Gemini y Perplexity, y de qué fuentes lo están sacando. Te lo entregamos en una página, gratis, en 24 horas. | El chequeo revisa tu sitio. El diagnóstico lo hacemos a mano y te dice qué te frena y qué arreglar primero. Te lo entregamos en una página, gratis, en 24 horas. | **Para Ramón** · revisada en el paso 5. Decidida (§7:202). Gemini es correcto aquí; lo que no está asegurado es que se pregunte. (a) Se queda si confirmas que cada mini-diagnóstico corre esas preguntas. (b) La propuesta, si no. Sin respuesta, va la b. v3-chequeo.js va con ?v=3. |
| 1444 | Revisando... | Revisando… | Puntos suspensivos «…» (1.12): era el único «...» que quedaba. v3-chequeo.js va con ?v=3. |

Cambian 5. No cambian 79 (2 esperan R2).

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
| nueva · frase final del párrafo del compromiso (solo si confirmas el compromiso de los 3 meses; la misma en Visibilidad) | (no existe) | Cada quince días te llega el informe, con el puntaje de hoy al lado del de la quincena anterior. | Cada mes te llega el informe, con el puntaje de hoy al lado del que tenías el mes anterior. | = la de la cadencia (es el puntaje del chequeo, no menciones) |
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
| 1256 Esencial (ya cambia en E8: arreglo de 5a) | Medimos y optimizamos mes a mes, sobre lo que encontró la auditoría. | = | = | Optimizamos mes a mes, sobre lo que encontró la auditoría. |
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

Simón vetó «estrategia de visibilidad en IA» (#681). La sigla se queda en el h3, en el HowToStep.name
y en las tres enumeraciones que nombran las fases, porque ahí hace trabajo de búsqueda y Método no
tiene una FAQ que la defina. En #726 aprobó «puedan leerlo, entenderlo y citarlo».

| # | Hoy | Quincenal | Mensual | Si no se promete el monitoreo |
|---|---|---|---|---|
| 665 línea | Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. | Cuatro fases que se miden: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. | igual que quincenal | …implementación y seguimiento. |
| 670 h2 (Simón) | Del diagnóstico al monitoreo | = | = | Del diagnóstico al seguimiento |
| 693 h3 y HowToStep.name (Simón) | Monitoreo | = | = | Seguimiento |
| 694 | Cada quince días medimos menciones en IA con nuestro protocolo público, repetible por cualquiera, además de posiciones clásicas en Google y tráfico orgánico, y te lo reportamos en una página en lenguaje de negocio. La reunión mensual define las prioridades del ciclo siguiente. | = | Cada mes medimos menciones en IA con nuestro protocolo público… (el resto igual) | Cada [quince días \| mes] medimos tus posiciones en Google y el tráfico orgánico, y te lo reportamos en una página en lenguaje de negocio. La reunión mensual define las prioridades del ciclo siguiente. (sale el enlace) |
| 696 «Frecuencia» | Informes quincenales · Reunión mensual | = | Informe y reunión mensuales | = la de la cadencia |
| 723 meta (Simón) | Cuatro pasos medibles: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Conoce el método de trabajo de SpindleLab paso a paso. | Cuatro fases que se miden: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Conoce el método de trabajo de SpindleLab fase por fase. | igual que quincenal | …implementación y seguimiento… |
| 726 HowTo.description (Simón) | El Método SpindleLab es el proceso de cuatro fases de SpindleLab para llevar un sitio de la invisibilidad a ser citado en Google y en las respuestas de los motores de IA (AEO/GEO): diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Es un ciclo repetible y cada fase se mide. | El Método SpindleLab es el proceso de cuatro fases con que SpindleLab prepara un sitio para que Google y los motores de IA (AEO/GEO) puedan leerlo, entenderlo y citarlo: diagnóstico técnico, estrategia AEO/GEO, implementación y monitoreo. Es un ciclo repetible y cada fase se mide. | igual que quincenal | …implementación y seguimiento… (sale la promesa de «ser citado», encargo del 14-oct, en las tres) |
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
- Si en el anexo D, punto 4, el mini-diagnóstico no pregunta siempre a los motores, en el párrafo del
  chequeo sale «en el mini-diagnóstico» y queda solo la Auditoría de Visibilidad.

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
página qué te frena y qué arreglar primero. Gratis, en 24 horas.» Si no contestas el punto 4, va esta
última, como la b de #1440, #617 y #639.

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

---

## Anexo D · Datos a verificar antes de publicar

1. **La prueba de Trabajo.** El texto propuesto está arriba, en «Lo que queda para ti», punto 3.
   - **La vara.** Es el chequeo de la Ley 21.719 (`verifica.spindlelab.cl/api/chequeo`), no el del hero.
     Por eso va en la ficha de Verifica y Cumple y no dice «el chequeo» a secas (2.9).
   - **Las cifras.**
     - El 36 es del 9-sep. Lo dice el caso de Verifica y Cumple (`ventas/casos-de-exito/verifica-y-cumple.md`,
       commit `1a0ae0a`, en otra rama); el 10-sep del encargo no tiene fuente.
     - El 36 y el 73 los publicó la página de LinkedIn el 21-sep (corpus §4), con la misma forma de puntuar.
     - El 100 es del 14-oct, con otra (corpus §8).

     Con el 73, quien vio aquel post lee la misma historia, y el salto no parece obra de los arreglos.
   - **Lo que hoy no cuenta.** Hoy el chequeo de la ley le da a spindlelab.cl 14 de 20 puntos comprobables,
     y deja sin confirmar «Permiso antes de cargar rastreadores». El 36 era sobre todo eso: Analytics y el
     Pixel de Meta cargaban antes del permiso. Por eso la última frase es obligatoria (Simón): sin ella,
     «36 → 100» sugiere que el instrumento comprobó el arreglo del consentimiento.
   - **Si no quieres reusar el 36 ni el 73** (el corpus §8 dice que no se reusan): «El primer sitio que
     revisó fue el nuestro, y arreglamos lo que encontró. El 14 de octubre de 2026, spindlelab.cl sacó 100.
     Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los rastreadores, no suma
     ni resta.»
   - **Dónde no va.** No va al JSON-LD de Trabajo, ni a la home, ni al lado del chequeo de IA o de la oferta
     de Visibilidad.
   - **Antes de publicar el v3.** spindlelab.cl va a ser el v3, con otro aviso de cookies y otro formulario.
     Hay que volver a correr el chequeo de la ley sobre la vista previa. La frase lleva esa fecha y ese
     puntaje, y si no da 100, se corrige.
2. **El compromiso de los 3 meses** (Esencial y Pro, en Visibilidad y Acompañamiento). Lo confirmas tú.
   - **Casos borde:**
     - un sitio que ya parte en 100, o cerca, no tiene cómo subir. Una salida es una condición que diga «si
       partes bajo 90», y no la propongo sin tu visto bueno;
     - un Esencial solo de SEO técnico mueve parte del chequeo, no todo.
   - **Notas de operación de Simón:**
     - el informe de partida se guarda con fecha y con su lista de señales. Eso es lo que sostiene «contando
       las mismas señales» cuando el chequeo cambie de versión;
     - el chequeo no ve las reglas de bots de IA que Cloudflare aplica en el borde (`chequeo.js:900-902`).
       Si el cliente las tiene, «puedan entrar» necesita que nos dé acceso a esa configuración. Si quieres
       decirlo en la página, la condición suma «y acceso a la configuración de tu dominio».
3. **Plazos sin fuente:**
   - **Auditoría de Visibilidad:** son ~2 semanas, pero ¿desde cuándo? ¿Desde la conversación de 20 minutos?
   - **Auditoría + Visibilidad en IA:** ¿los dos trabajos corren en paralelo? Si es así, vale el punto «Entrega
     en 2 a 3 semanas desde el acceso a los datos». Si no, el plazo lo das tú. Sin el dato, la tarjeta va sin
     punto de plazo.
   - **Desarrollo web:** la nota de planes nombra por primera vez el anticipo, que sale de la cotización. Los
     «tres días» para mandar el material y las «48 horas» para aprobar, que traía el borrador, serían
     compromisos nuevos y no entran.
4. **El mini-diagnóstico y los motores.**
   - **Lo que el sitio promete.** Dice que el mini-diagnóstico le pregunta a ChatGPT, Gemini y Perplexity:
     - en la guía (#617) y el paso 02 (#639) de Diagnóstico;
     - en su FAQ (R7, anexo C) y en el resultado del chequeo (#1440);
     - en la bio de Nosotros (R4, «Registro si ChatGPT, Gemini y Perplexity te nombran…») y en el artículo
       publicado (cerrado).
   - **Lo que muestra el archivo.** Los tres mini-diagnósticos archivados (`marketing/diagnosticos/SPL-DIAG-2026-001`,
     `-002` y `-006`) no traen ninguna respuesta real de un motor:
     - el 001 dice «Confirmaremos el resultado real… antes de la reunión»;
     - el 002 describe la prueba;
     - el 006 dice que no se corrió (README:37).

     La skill `mini-diagnostico` permite escribir esa parte «en términos de riesgo general» (SKILL.md:27-29).
   - **Las dos salidas:**
     - **o** cada mini-diagnóstico corre esas preguntas, y el sitio queda como está;
     - **o** van las versiones b de #617, #639 y #1440 (en las tablas) y la b de la FAQ (anexo C). Es lo que
       va si no contestas: lo pidió el crítico, por regla. La bio y el artículo están cerrados: si eliges la
       b, quedan anotados para R4 y para el pase del blog.

   Gemini es correcto en todos esos lugares. Claude no lo sería.
5. **Google-Extended, un encargo aparte (Simón).**
   - **Qué se descubrió.** La documentación de Google (google-common-crawlers, actualizada el 14-jul-2026)
     dice que Google-Extended también controla el grounding de Gemini Apps y que no afecta Google Search.
   - **Dónde la casa dice lo contrario.** Lo trata como entrenamiento puro en cuatro lugares:
     - `functions/api/chequeo.js`, que lo cuenta entre los robots de entrenamiento (:869), le da 2 puntos
       en ese ítem y lo dice en su respuesta (:995-998);
     - el cuerpo del artículo de los 21 chequeos (el `td` de la tabla y el p:11);
     - la regla del 8-sep (`marketing/oficina/clientes/spindlelab.md:289`);
     - la metodología de Diagnóstico (#623), que en E8 solo se acota.
   - **El encargo.** Simón define qué cambia y Diego lo ejecuta: Google-Extended pasa a un ítem propio, o
     junto a los de búsqueda como «Gemini puede usar tu sitio para responder». Ojo: eso mueve puntajes. En el
     mismo encargo va el artículo «Cómo aparecer en ChatGPT» (cerrado), que tiene el error contrario: pone a
     GPTBot y Google-Extended como robots que te hacen encontrable.
   - **Después.** Cuando se corrija, la FAQ de Visibilidad (#1291) puede nombrar a Google-Extended.
6. **Paid Media dice «a diario»** con agentes de IA en tres lugares, y «día a día» en la FAQ. Viene de la
   página publicada. Confirma que es la práctica. E8 no toca la cadencia.
7. **Accesos en Método (#713).** Cambió «Nunca pedimos accesos de administrador», porque
   `onboarding-cliente.md` pide un usuario de CMS con rol admin en el Acompañamiento con acceso directo.
   Queda «Nos agregas como usuario, sin compartir tu contraseña», que es cierto para Search Console y
   Analytics (onboarding :26 y :28). Si quieres mantener la promesa vieja, lo que cambia es el onboarding,
   no el sitio.
8. **Contacto (#581).** La confirmación promete respuesta en 24 horas también a quien parte de cero. Se
   apoya en la copia vieja del JSON («con el mini-diagnóstico o los siguientes pasos»). Si ese plazo no
   aplica a proyectos nuevos, hay que decirlo.
9. **Desarrollo web:**
   - **La guía nueva (#983).** Le dice a quien ya tiene un sitio que funciona que le sirve más Visibilidad
     en IA. Es la página de entrada de Ads, y el estudio de Marco dice que 2 de 2 cierres son de Desarrollo
     web y que el AEO es la razón para comprar el sitio. Confirma esa postura. Si no la quieres, la guía
     queda solo con su primera frase;
   - el sitio nombra varias veces el agente y la construcción con IA, y de las cotizaciones lo sacaste;
   - la fase 02 dice «Ajustamos hasta que el diseño te representa», cuando las cotizaciones fijan las rondas
     de revisión.
10. **Redes.** El cierre nuevo es «Partimos por el sitio al que llevan tus redes». Si prefieres otro ángulo,
    que afirme algo y no repita la entrada.
11. **El estudio de Marco** (para el troncal):
    - §4 y M1 dicen que el 36 → 100 es «con el mismo instrumento que está en el hero». Es el chequeo de la
      ley, y el de IA le da hoy 85 a spindlelab.cl;
    - el addendum cruza los precios de la Auditoría y de Visibilidad.

    El encargo, en cambio, trae los precios bien.
12. **Ley 21.719 (Diagnóstico).** La fecha del 1-dic-2026 sigue vigente al 14-oct, y la prórroga (boletín
    18.623-07) está en tramitación. Hay que comprobarlo el día del corte.
13. **El title del índice (#804)** queda sin sufijo, a propósito. Si Javiera o tú quieren el sufijo, va
    «Servicios: SEO técnico, IA y desarrollo web · SpindleLab» (56).

---

## Para Diego (paso 7)

- **No hay bloque `oferta` en las tarjetas.** Lo nuevo del encargo entra en cinco hojas:
  - **El compromiso** va en `servicios-v3.json#/visibilidad-en-ia/secciones/1/compromiso` y en
    `#/acompanamiento-mensual/secciones/1/compromiso`, y solo si Ramón lo confirma. `[slug].astro` lo pinta
    como `<p class="d-cuerpo">` después de la lista de planes, dentro de `#planes`. No va al JSON-LD. Si
    R2 se aplica junto con el compromiso, la frase del informe (anexo A) va al final del mismo párrafo.
  - **El plazo de la Auditoría Completa** es un punto nuevo al final de su lista:
    `#/auditoria-seo-tecnica/secciones/1/planes/1/puntos/5`. El de la combinada (`…/planes/2/puntos/4`)
    entra solo con el dato de Ramón.
  - **La prueba** va en `obra-v3.json#/casos/2/prueba`, solo si Ramón la aprueba. Es un
    `<p class="d-cuerpo">` bajo la línea de la ficha, y solo la lee `trabajo.astro`. No va al JSON-LD ni a
    otra página. Antes de publicar se corre otra vez el chequeo de la ley sobre la vista previa, y la frase
    lleva esa fecha y ese puntaje.
- **Desarrollo web.**
  - La nota de `#planes`, la `d-chico` del `d-eti` y no la de la entrada, suma dos frases después del texto
    de #982.
  - #986 suma una frase al final del ítem. Esa frase no lleva «chequeo»: el `split(CHEQUEO)` de la
    plantilla solo toma las dos primeras partes, y una segunda aparición cortaría el resto en silencio.
  - #1000, #1007 y #1015 se quedan en la lista.
- **Hojas en "".** #837, #1093 y #790 quedan vacías, sin sacar el elemento, para no correr los punteros.
  La plantilla filtra los vacíos. #930, #1252 y #1253 ya no se vacían.
- **#623.** Se conservan los `<b>` de `diagnostico.astro:151`. Cambia solo la oración «Bloquear a los
  primeros…».
- **#50.** El ancla es la de hoy, con Claude (`a70e945`), y la propuesta vuelve a Gemini con la promesa
  arreglada. Vale para og:description.
- **#804.** Es el único title sin sufijo, a propósito: Google muestra el nombre del sitio aparte
  (og:site_name). Que nadie lo «corrija». Vale para og:title.
- **#1256.** Es una ranura R2 que cambia por la excepción de 5a de la hoja (§0). La aserción «ninguna R2
  cambia» del paso 7 tiene que admitir esta, y el conteo de cadencia sigue en 51.
- **`oferta-v3.json#/momentos/1/planes/0/d` no se toca.** Simón vetó el cambio a Claude, y no hay aserción
  aparte.
- **#617, #639 y #1440 (para Ramón).** No se aplican hasta su respuesta. Si llega a la lectura de P0.4 sin
  contestar, va la b de cada una.
- **`v3-chequeo.js?v=3`** va en sus dos referencias (#1444, y #1440 si va la b).
- **Medir:**
  - «$690.000 con Visibilidad en IA» en `nowrap`, a 390, en la home y el índice;
  - el panel del menú (#1359) a 1280 × 650, con el aviso de cookies abierto;
  - «Ver el blog» junto al h2 de la home, a 390;
  - a 390, el párrafo del compromiso y la nota de planes de Desarrollo web, que pasa a cuatro frases.
- **Enlaces:**
  - «Visibilidad en IA» en la guía de Desarrollo web (#983) se puede enlazar, una vez (§7:191);
  - los de «protocolo público» siguen donde están, en frases R2;
  - los de «Gestión de redes sociales» y «Paid Media (Google)» en las FAQ #1128 y #1209 quedan con el
    mismo texto.
