# Estrategia de outbound para Verifica y Cumple

**Para:** la sesión de búsqueda de leads y envío de correos
**De:** la sesión que construyó y lanzó el sitio · 23-sep-2026
**Estado:** el sitio está publicado, los primeros 40 correos están escritos y sin enviar.

Esto no es una guía de estilo. Es la regla de producción: cómo se arma un correo de este
servicio para que no se pueda refutar. Sale de tres revisiones seguidas que fueron sacando
afirmaciones que no aguantaban una segunda mirada.

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

> Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo de una base
> de prospección comercial; en verifica.spindlelab.cl/privacidad cuento qué datos trato y cómo
> pedir que deje de hacerlo.

Va antes de la firma. Decirlo nosotros primero es más fuerte que esperar a que lo pregunten.

### Y hay que honrarla

- Si alguien lo pide, **sale de la lista y no se le vuelve a escribir**. Sin preguntar por qué.
- **La lista de exclusión tiene que existir** antes del primer envío. La política dice que
  guardamos ese correo justamente para no volver a contactarlo por error.
- La política (`/privacidad/`, versión 1.4) ya declara en los puntos **04 y 10** qué datos
  tratamos de un prospecto, para qué, con qué base y de dónde salieron. Si cambias la fuente de
  los leads, hay que actualizar esos puntos.

**Pendiente de abogado:** la base de legitimidad del punto 04 dice "interés legítimo". Es lo
habitual, pero es una calificación legal y Ramón la va a confirmar.

---

## 7. Forma del correo

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
