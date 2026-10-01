# Estrategia de outbound para Verifica y Cumple

**Para:** la sesión de búsqueda de leads y envío de correos
**De:** la sesión que construyó y lanzó el sitio · 23-sep-2026
**Estado:** el sitio está publicado, los primeros 40 correos están escritos y sin enviar.

Esto no es una guía de estilo. Es la regla de producción: cómo se arma un correo de este
servicio para que no se pueda refutar. Sale de tres revisiones seguidas que fueron sacando
afirmaciones que no aguantaban una segunda mirada.

---

# 🚨 28-sep-2026: el pozo está seco. Esto es lo primero.

**Queda UN prospecto sin contactar en toda la lista de Verifica y Cumple.** Grupo Altum
(`grupoaltum.cl`, Ignacio Valenzuela Maureira). Los otros 29 están contactados o excluidos.

Contado contra la bandeja de enviados y contra `ventas/lista-exclusion.csv`, no de memoria:

| | |
|---|---|
| En `lote-abogados-23sep.csv` | 30 |
| Ya contactados el 24-sep | 26 |
| Excluidos con razón | 3 (BH dijo que no; CEP y LSC ya tenían sus 3 toques de la campaña AEO) |
| **Sin usar y contactables** | **1** |

**Los dos flujos tienen que correr, y hoy no corre ninguno bien:**

1. **Los seguimientos existen y no salen.** 35 escritos desde el 25-sep. Al 28-sep a mediodía
   salieron **2**: delamazaycia.cl y tuane.cl. Faltan 13 del lote de 15 y los 20 de abogados.
   En outbound frío las respuestas llegan en el segundo y el tercer toque, casi nunca en el
   primero. Con 36 prospectos tocados una sola vez, todavía no sabemos si el mensaje sirve.
2. **El frente nuevo no está atrasado: está vacío.** No hay a quién escribirle.

⚠️ **Esto deroga lo que decía la puesta al día del 25-sep.** Ahí escribí "no se manda un lote
nuevo hasta cerrar los seguimientos de estos 36". Ya no aplica, porque no hay lote nuevo que
mandar aunque se quisiera. **La tarea dejó de ser escribir correos y pasó a ser conseguir
prospectos calificados.**

**Lo que NO sirve como reemplazo.** Las tres listas de `marketing/listas/` (clínicas dentales,
ópticas, asesoras patrimoniales) son de julio y agosto, de otra campaña y de otro servicio. Un
lote de Verifica se arma calificando sitios: hay que abrirlos, medirlos y descartar los que no
tienen hallazgo. Reusarlas sin ese trabajo produce correos refutables, que es lo que estas
reglas existen para evitar.

**Y un dato técnico que descarta la hipótesis fácil:** la autenticación del dominio está
correcta. SPF apuntando a Google, DKIM firmado, DMARC en `quarantine` con reportes, MX de
Google. Verificado el 28-sep contra el DNS. Los correos no están cayendo a spam por
configuración, así que el cero respuestas no se explica por ahí.

---

# ⚠️ Puesta al día del 25-sep-2026 (léela antes que el resto)

Un día completo de revisión cambió cosas que el documento de abajo daba por ciertas. Esto manda.

## 1. No fueron 15 correos. Fueron 36.

Verificado en la bandeja de enviados de hola@spindlelab.cl: el **24-sep** entre las 09:36 y las
09:37 salieron **26 a estudios de abogados y 10 a hoteles y clínicas**. El "15" que circulaba
era lo que cubría el material de seguimiento, no lo enviado.

**Respuestas hasta ahora: cero.** Ni una negativa. Una automática de postnatal (lembeye.cl) que
deriva a una colega, ya contestada. Cero rebotes.

⚠️ **Eso rompió la rampa.** El tope era 15 la primera semana, 30 la segunda, 50 la tercera, y es
reputación de dominio, no capacidad de producción. Salieron 36 en un día. **No se manda un lote
nuevo hasta cerrar los seguimientos de estos 36**, y la rampa se retoma desde donde quedó, no
desde cero.

## 2. Los seguimientos ya están escritos: 35 de 36

| Lote | Dónde | Cuándo |
|---|---|---|
| 15 (10 hoteles/clínicas + 5 abogados) | `seguimientos/toque2/` y `toque3/` | toque 2 el 27-sep · toque 3 el 1-oct |
| 20 abogados | `seguimientos/toque2-abogados/` | listos, sin fecha asignada |

El que falta es **lembeye.cl**: postnatal, el hilo se movió a otra persona y corre desde otra
fecha. **Los 20 no tienen toque 3 escrito todavía.**

Cada uno lleva `Para:`, `Asunto:` y cuerpo, y **el asunto es `Re:` del original**: va dentro del
hilo del 24-sep, no como correo nuevo. Un "Re:" fuera de hilo se lee como spam.

## 3. La lista de exclusión es `ventas/lista-exclusion.csv`. Una sola.

El 25-sep dos sesiones crearon una lista el mismo día sin saber una de la otra. Se disolvió la
de `marketing/outbound/` y quedó la de `ventas/`, que ya estaba en uso y tiene filas reales.

**Se consulta por correo Y por dominio**, siempre, antes de cada envío:

```bash
grep -i -E "correo@ejemplo.cl|ejemplo.cl" ventas/lista-exclusion.csv
```

Las dos cosas: alguien puede responder desde otra dirección. **La baja es de la empresa, no del
buzón.**

**Y ojo con esto:** de los cuatro abogados del CSV que nunca recibieron toque 1, **tres están
excluidos con razón** (BH Abogados dijo que no; CEP y LSC ya tenían sus tres toques de la
campaña AEO anterior). El único realmente sin tocar es **grupoaltum.cl**.

## 4. Dos correcciones legales, y una ya salió publicada mal

Verificadas contra el PDF del Diario Oficial el 25-sep:

- **El 4% es solo de las infracciones GRAVÍSIMAS.** En las graves el porcentaje es 2%. Y el Art.
  35 dice que la multa alcanza *"la más gravosa entre"* hasta tres veces la multa base **o** ese
  porcentaje: **no digas "el tope es 2%"**, que también es impreciso.
  El post de LinkedIn del 25-sep decía "grave o gravísima" y **hubo que editarlo en vivo**.
- **Los artículos son de la ley 19.628**, en el texto que le puso la 21.719. Esa ley tiene tres
  artículos permanentes. Quien busque "el artículo 50 de la 21.719" no lo encuentra.

⚠️ **El toque 1 que ya salió le dijo a siete de estos prospectos** que "la Ley 21.719 pide que
esté publicada (artículo 14 ter)". El 14 ter es de la 19.628. Si un abogado lo nota, la
respuesta honesta es esa, sin inventar: el artículo existe y dice lo que dijimos, pero vive en
la 19.628 con el texto que fijó la 21.719.

## 5. Cuatro reglas nuevas, cada una de un error real de hoy

1. **Primera parte por dominio NO es lo mismo que propia.** Un correo presentaba dos cookies
   `_ga` como "las dos son tuyas, a favor tuyo". Las escribe Google. Es el error de los tres
   verbos por una puerta nueva.
2. **Una cita con "[...]" no es evidencia hasta abrir la fuente completa.** El error del 4%
   salió de una cita guardada cortada justo en la frase que lo resolvía.
3. **Ningún dato sobre una persona que no salga del sitio.** Un correo decía qué diplomado
   había cursado un abogado del estudio. En una campaña sobre protección de datos, eso le avisa
   al destinatario que investigamos personas.
4. **El mea culpa tiene que ser real.** Cuatro correos se disculpaban por algo que el toque 1
   nunca afirmó, porque el toque 1 era condicional ("si el formulario del sitio recibe
   consultas"). El prospecto tiene el original abajo en el hilo.

## 6. Cómo se mide un hallazgo, y cómo se comprueba el de otro

La sonda es `seguimientos/probe.mjs`: dos tramos, 11 s quieto y después mouse y scroll sin
clics. El segundo no es opcional, varios sitios chilenos retrasan sus scripts hasta el gesto.

**Todo dos veces. Lo que cambie entre corridas no entra al correo.**

Y lo que más conviene recordar de hoy: en una ronda, **la refutación del revisor tampoco
sobrevivió al reconteo**. Afirmaba que un script cargaba solo tras el gesto, y al remedirlo
cargó antes en una corrida y después en otra. Ni el correo ni su corrección aguantaban.
**La evidencia de quien corrige también se recuenta.**

## 7. Lo que sigue pendiente

- **El toque 3 de los 20 abogados**, que no está escrito.
- **grupoaltum.cl**, que nunca recibió toque 1.
- **El chequeo profundo con navegador real** sigue sin publicar: espera a que Ramón active el
  plan de Workers ($5/mes). Mientras tanto el chequeo no ejecuta JavaScript, y por eso el correo
  lleva el hallazgo y nunca el puntaje.

---

## 1. Qué se vende, y dónde

- **El chequeo** es gratis, sin registro, en **https://verifica.spindlelab.cl**
  (el viejo `verificaycumple.pages.dev` redirige solo; **no lo uses en ningún correo**).
- **Kit de implementación**, desde **$149.000 + IVA**, una vez.
- **Revisión trimestral**, desde **$39.000 + IVA al mes**, mínimo 2 trimestres.
  ⚠️ Se llamaba "Suscripción de vigilancia" hasta el 23-sep. Ese nombre ya no existe.
- El kit **no incluye asesoría legal**: entrega la plantilla de política para que la revise
  el abogado del cliente. Eso se dice, no se esconde.

---

## 2. La regla que manda: el correo lleva el HALLAZGO, no el puntaje

**Nunca escribas el puntaje del chequeo en un correo.** El puntaje no mide el riesgo.

El caso que lo prueba: **awasi.com saca 100/100** y es de los peores sitios reales que
revisamos. El chequeo lee el HTML y no ejecuta JavaScript, así que ve Tag Manager, no puede
confirmar qué hay adentro, y prefiere declinar antes que acusar. Cuando abres ese mismo sitio
en un navegador, a los diez segundos ya escribió cookies de Google Analytics, Google Ads, el
Pixel de Meta y el de Reddit, sin ningún aviso.

Al revés también pasa: sitios con puntaje bajo que están mejor de lo que el número sugiere.

**Entonces:** el chequeo sirve para filtrar candidatos rápido. El hallazgo que va en el correo
se comprueba **abriendo el sitio**.

---

## 3. Cómo se produce un hallazgo que aguante

Abre el sitio en un navegador limpio, contexto nuevo, **sin hacer un solo clic**, y haz **dos
tramos**:

1. **Pasivo**, unos 11 segundos sin tocar nada.
2. **Con movimiento**: mueve el mouse y baja con la rueda, sin clics.

Los dos tramos importan. Varios sitios chilenos usan plugins que **retrasan los scripts hasta
el primer gesto** (WP Rocket, por ejemplo). Si te quedas solo en el tramo pasivo, le escribes
a alguien que está limpio y no lo está. Nos pasó con dos de doce.

### Las tres cosas que no son lo mismo

Este fue el error que tres revisiones seguidas tuvieron que sacar:

| Lo que viste | Lo que puedes escribir |
|---|---|
| El script se descarga | "cargó" |
| Queda una cookie | "dejó su cookie `_fbp`" |
| Hay una petición con datos | "ya recibió esa visita" |

Decir "el Pixel de Meta recibió la visita" cuando lo único visible es que el script cargó es
refutable en dos minutos: el desarrollador abre la pestaña de red, filtra por Facebook y no
encuentra el envío. Meta es el caso más frecuente: carga y deja cookie sin llegar a enviar.

### Nada que dependa de la corrida

Si una frase es cierta en dos de tres corridas, **no va**. Basta que el prospecto abra el sitio
una vez y no lo vea para que el correo quede desmentido. Descartamos dos frases por esto.

Lo mismo con los conteos: si al recontar cambia, escribe "todos los enlaces de la portada" en
vez de un número.

---

## 4. Lo que no se afirma nunca

### Los tres mitos que el mercado está vendiendo, y nosotros no

Verificados contra el **PDF del Diario Oficial** (N° 44.023, 13-dic-2024, CVE 2583630):

1. **El delegado de protección de datos NO es obligatorio.** Art. 50: "podrá designar".
   Art. 49: el programa se adopta voluntariamente. Lo obligatorio es el Art. 48.
2. **No existen las 72 horas** para notificar brechas. Eso es europeo. El Art. 14 sexies pide
   "sin dilaciones indebidas", que es un estándar de conducta, no un reloj.
3. **El 4% de los ingresos no es lo que arriesga una pyme.** Art. 35: solo para empresas que
   no son de menor tamaño **y** que reinciden. Reincidir, Art. 36, es dos sanciones en 30 meses.


⚠️ **Dos precisiones verificadas el 25-sep contra el PDF, que corrigen material anterior:**
1. **El 4% es solo de las infracciones gravísimas.** El Art. 35 dice "2% o 4% ... según se
   trate de infracciones graves o gravísimas, respectivamente". En las graves el tope es 2%.
   El post del 25-sep decía "grave o gravísima" para el 4% y se corrigió en LinkedIn ese día.
2. **Estos artículos son de la ley 19.628, no de la 21.719.** La 21.719 tiene tres artículos
   permanentes; su artículo primero mete las modificaciones en la 19.628. Al citar, decir
   "el artículo 50 de la ley 19.628, en el texto que le puso la 21.719", o anclar al PDF del
   Diario Oficial. Quien busque el "artículo 50 de la 21.719" no lo encuentra.

⚠️ **La API de la BCN sirve esta ley TRUNCADA** (salta del Art. 16 sexies al 20 y corta en el
22, sin el capítulo de sanciones). Si necesitas citar un artículo, ve al PDF del Diario Oficial.

### Tampoco

- **Que el chequeo dice si alguien cumple.** No lo dice nunca, y el correo tampoco.
- **Cifras de multas.** Dos competidores le muestran al prospecto una multa estimada en pesos.
  Es exactamente el diferencial que estamos construyendo: no lo gastes.
- **Lo que la ley "exige"** sobre cosas que son interpretación. Para rastreadores, di que el
  permiso se pide con el aviso de cookies y que ese sitio no tiene ninguno. Describe la señal,
  no dictes la obligación.
- **El 36 → 73** del post del 21-sep. La forma de puntuar cambió y ya no se reproduce.
  Si necesitas un número propio, corre el chequeo y usa el del día.

---

## 5. El eje: el sitio, no la fecha

Hay un proyecto en el Senado (**boletín 18.623-07**) que movería la vigencia al 1-dic-2027.
Al 23-sep sigue en comisión, sin informe y sin votaciones, con urgencia renovada tres veces.

Por eso **ningún correo cuelga de "antes del 1 de diciembre"**. El ancla es el sitio:
*"tu formulario ya trata datos personales hoy"*. Si la postergación se aprueba, el argumento
sigue en pie. Si tu copy dice "quedan X semanas", queda viejo el día que se vote.

Estado actualizado:
`curl -s "https://tramitacion.senado.cl/wspublico/tramitacion.php?boletin=18623"`
(sin el `-07` y sin puntos, o responde vacío).

---

## 6. Nuestro propio cumplimiento, que es lo primero que te van a revisar

Le escribimos en frío a estudios de abogados **sobre la ley de datos**. Si nuestro outbound no
cumple, el primer abogado que quiera devolvernos el golpe lo hace con una línea.

### La línea de baja va en TODOS los correos, sin excepción

Va antes de la firma. Decirlo nosotros primero es más fuerte que esperar a que lo pregunten.

**⚠️ Se nombra la fuente REAL, no la categoría.** Hasta el 28-sep la línea decía "de una base de
prospección comercial". Es cierto y es vago, y esa vaguedad fue justo lo que gatilló el reclamo:
Elías Cabello, abogado de Mi Equipo Legal, respondió con copia a dos colegas ejerciendo el
**derecho a conocer el origen** de sus datos, citando nuestra propia política. Tuvo respuesta
porque la fuente era rastreable (Apollo, cosecha del 9-sep), pero nombrarla de entrada se
adelanta al reclamo y cuesta una palabra. Cuatro variantes según de dónde salió de verdad:

**Lead de Apollo:**
> Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo de Apollo,
> una base comercial de contactos B2B; en verifica.spindlelab.cl/privacidad cuento qué datos
> trato y cómo pedir que deje de hacerlo.

**Lead de Google Maps (el correo está publicado en su propio sitio):**
> Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo del sitio de
> ustedes; en verifica.spindlelab.cl/privacidad cuento qué datos trato y cómo pedir que deje de
> hacerlo.

**Contacto que llegó por una respuesta automática:**
> Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo de la
> respuesta automática de X; en verifica.spindlelab.cl/privacidad cuento qué datos trato y cómo
> pedir que deje de hacerlo.

**Lead de un directorio público donde la empresa se inscribió (guía de DiarioEmprende):**
> Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo de la Guía de
> Empresas y Negocios de DiarioEmprende, donde ustedes lo publicaron; en
> verifica.spindlelab.cl/privacidad cuento qué datos trato y cómo pedir que deje de hacerlo.

Esta cuarta es la más sólida de todas, porque el prospecto publicó el correo él mismo para que
lo contactaran. Se agregó el 30-sep con el banco `ventas/contactos-diarioemprende-30sep.csv`.

Si no sabes de cuál de las cuatro salió, no mandes el correo hasta saberlo. La fuente de cada
lead está en su CSV de origen.

### Y hay que honrarla

- Si alguien lo pide, **sale de la lista y no se le vuelve a escribir**. Sin preguntar por qué.
- **La lista de exclusión ya existe**: `ventas/lista-exclusion.csv`, con la regla
  en `ventas/LEEME-lista-exclusion.md`. **Se consulta por correo Y por dominio antes de cada envío**, porque
  alguien puede responder desde otra dirección: la baja es de la empresa, no del buzón. La
  fila se agrega el mismo día, antes de cerrar el correo.
- La política (`/privacidad/`, versión 1.4) ya declara en los puntos **04 y 10** qué datos
  tratamos de un prospecto, para qué, con qué base y de dónde salieron. Si cambias la fuente de
  los leads, hay que actualizar esos puntos.
- **Si preguntan por el origen, se responde con el nombre de la fuente y nada más.** Sin vender,
  sin aprovechar el hilo. El 28-sep se respondió "Apollo.io, consultada en septiembre", se
  apuntó a apollo.io para su propia supresión, y se explicó que de sus datos solo queda la
  dirección en el registro de exclusión, que es lo que permite no volver a escribirle. Esa
  retención está declarada en el punto 10, así que la respuesta se sostiene sola.

**Pendiente de abogado:** la base de legitimidad del punto 04 dice "interés legítimo". Es lo
habitual, pero es una calificación legal y Ramón la va a confirmar.

---

## 7. Forma del correo

### El reparto entre VyC y el motor, decidido por Ramón el 30-sep

No son dos campañas, son dos momentos del mismo correo, y **no hay que unificarlos**:

- **El toque 1 abre con el hallazgo medido de la ley y cierra vendiendo el motor completo.**
  Ramón: "el mail debe estar enfocado en el motor que mueve tu negocio, que es lo que hace
  SpindleLab, y de primera instancia está Verifica y Cumple como gran gancho". La plantilla es
  la de 4 párrafos del 8-sep, con el hallazgo de la ley en el P1 en vez del de AEO. Eso sube el
  cuerpo a ~200 palabras: **el tope de 130 de más abajo aplica al correo de VyC puro, no a
  este.**
- **El toque 2 y el toque 3 se quedan en Verifica y Cumple.** Decisión explícita de Ramón el
  30-sep: *"que se quede en VyC porque es la puerta de entrada para SpindleLab, es lo más
  contundente que tenemos para que lleguen a los servicios de la empresa"*.

### El error de escritura del 30-sep: contar la medición en vez del hallazgo

Ramón leyó los diez correos y dijo: *"están muy largos y/o demasiado técnicos, deberían tener
una mejor escritura"*. Tenía razón, y la causa no era el largo, era de dónde salía el texto.

**Los correos estaban escritos en el vocabulario de la sonda.** "Doce cookies, una de ellas en
doubleclick.net", "el Pixel de Meta cargó y dejó su cookie", "Sourcebuster, WooCommerce,
PHPSESSID", "un plugin que retrasa los scripts hasta el primer gesto". Todo eso es cierto y
nada de eso le importa al dueño. Le importa qué le está pasando.

Reglas, con el ejemplo real de tgfclean:

1. **La consecuencia primero, en castellano.** No "escribió doce cookies, GA y Google Ads
   recibieron la visita", sino *"no toqué nada, ni acepté nada, y en diez segundos tu sitio ya
   le había avisado a Google que yo estaba ahí"*.
2. **UN dato como prueba, no el inventario.** Un número concreto basta. La lista completa de
   cookies y dominios vive en el CSV del banco y en el JSON de la sonda, que es donde
   corresponde. **El correo hereda la exactitud, no el vocabulario.** El rigor de la sección 3
   sigue mandando: lo que no se puede afirmar, no se afirma. Solo se dice distinto.
3. **Cero nombres de proveedor y cero jerga.** Ni `_fbp`, ni `_gcl_au`, ni doubleclick.net, ni
   "pixel", ni "plugin", ni "tramo pasivo".
4. **El motor en UNA frase, no en tres cláusulas.** "Eso es lo que hago: dejo el sitio en orden
   y lo pongo a aparecer donde la gente pregunta. Los precios están publicados en spindlelab.cl."
   Lo que había antes ("soy el motor que cierra ese círculo: que tu sitio esté en orden y
   convierta al que llega, que Google y la IA te recomienden, y que lo que inviertes en pauta no
   se escape por una fuga") suena a folleto pegado al final.
5. **Sin costuras.** "Te lo cuento porque es el síntoma de algo más grande" es el andamio
   asomándose. Se saca y se dice la cosa.
6. **Varía el párrafo del dolor.** Si la misma frase aparece en los diez correos, se lee como
   plantilla aunque cada hallazgo sea distinto.
7. **Bajo 150 palabras** el cuerpo, sin firma ni línea de baja. Los del 30-sep tenían 200 a 230.

Y la línea de baja también se acortó, sin perder nada de lo que tiene que decir:
> Si no quieres que te escriba, dime y no insisto. Saqué tu correo de la Guía de Empresas y
> Negocios de DiarioEmprende, donde ustedes lo publicaron; en
> verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo.

⚠️ **No "armonices" el seguimiento con la voz del motor.** Es la corrección obvia y es
equivocada: lo concreto y comprobable del hallazgo de la ley es lo que gana la conversación, y
el motor se vende después, en la conversación que ese hallazgo abrió. Si un día el toque 2
suena a catálogo de servicios, se volvió atrás sin querer.


- **Voz singular de Ramón.** Es una persona escribiendo, no la marca. "Revisé", "te escribo".
  El plural es para el sitio y la página de LinkedIn.
- **Bajo 130 palabras** el cuerpo, sin contar la firma ni la línea de baja.
- **Cero raya larga** (—). Cero relleno de transición. Cero urgencia fabricada.
- **Asunto específico del sitio**, en minúsculas, sin gancho de venta.
  Bien: `la política de privacidad de garciaparot.cl`.
  Mal: `¿Tu sitio cumple la Ley 21.719?`
- **Estructura:** el hallazgo en la primera línea · qué significa en una frase llana · el link
  para que lo compruebe él · qué haríamos y cuánto · cierre bajo, sin pedir reunión.
- **El link va como `https://verifica.spindlelab.cl`**, nunca el dominio viejo.

---

## 8. Volumen y cadencia (topes duros, ya existentes)

- **Rampa de contactos por semana: 15 → 30 → 50.** Es reputación de dominio, no capacidad de
  producción. No se excede aunque se puedan generar más.
- **Tope 3 toques por empresa**: toque 1, seguimiento ~día 3, final ~día 7.
- **De a uno, desde el correo de Ramón.** Nada de envío masivo.
- El estado real de un prospecto **está en Gmail**, no en los CSV. La columna `estado` de las
  listas viejas está desactualizada.

---

## 9. Cuándo NO se escribe

Un lote chico y cierto vale más que uno grande con una exageración. Descarta si:

- **El chequeo declina** (el sitio no deja leer, o no hay sitio publicado).
- **No hay hallazgo**: todo sale bien, o todo sale "sin confirmar".
- **El sitio no existe de verdad**: plantilla sin terminar, dominio que no sirve página.
  De 12 prospectos, 2 se cayeron por esto.
- **El prospecto ya vende esto.** Descartamos un estudio que promociona "Protección de datos
  Ley 21.719" en su propia portada.
- **El hallazgo lo deja bien parado.** Si su aviso de cookies funciona, o su formulario ya
  tiene casilla de consentimiento, reconócelo en el correo: sostiene el argumento en vez de
  debilitarlo. Pero entonces el correo va por otro hallazgo, no por ese.

---

## 10. Dónde está el material

`marketing/lanzamiento-vyc-23sep/`

- `correos-abogados-30.txt` y `lote-abogados-23sep.csv` — 30 correos, listos para pegar.
- `correos-hoteles-clinicas/` — 10 correos (hoteles, clínicas, estética).
- `post-linkedin-tres-mitos.md` — el post de la página y el comentario del perfil personal.
- `LEEME.md` — descartes, el porqué de cada decisión, pasos antes de mandar.

Nada de eso se ha enviado. Los 12 borradores viejos de Gmail ya los borró Ramón el 23-sep.

---

## 11. Qué hacer cuando alguien responde

- **Pide darse de baja** → sale de la lista, se confirma en una línea, no se insiste.
- **Pregunta técnica** → se responde con lo que se vio, sin inventar. Si hace falta mirar el
  sitio de nuevo, se mira.
- **"¿Y ustedes cumplen?"** → es la pregunta esperable y la respuesta está publicada:
  `/privacidad/`, con los 12 puntos del Art. 14 ter, el punto 04 sobre el outbound y la
  versión con fecha. Mandar el link, no explicar.
- **Quiere avanzar** → el formulario del sitio lo lleva al pedido con el dominio y el contexto
  del chequeo. El estado se registra en el pipeline, no en el CSV del lote.
