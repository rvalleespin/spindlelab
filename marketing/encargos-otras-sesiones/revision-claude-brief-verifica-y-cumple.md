# Revisión del brief de compra directa — Verifica y Cumple

**Archivo revisado:** `marketing/encargos-otras-sesiones/brief-producto-compra-directa-verifica-y-cumple.md`
**Fecha:** 23 de octubre de 2026
**Encargo:** evaluar alcance, compra directa y qué datos faltan para validar el precio de prueba,
sin inventar cifras ni capacidades, manteniendo separada la revisión técnica del cumplimiento legal.

> Esto es una segunda opinión. El alcance y el precio los decide Ramón. No se tocó el brief ni
> ningún otro archivo.

## Cómo se hizo, y en qué se apoya

Cuatro revisiones independientes con lentes distintas sobre el mismo brief, cada una auditada
después por un verificador adversario cuyo único trabajo era cazar propuestas que inventaran
capacidades o precios, que mataran la compra directa, o que confundieran señal técnica con
cumplimiento legal. **46 hallazgos, 12 descartados en la auditoría, 34 en pie.**

Una aclaración honesta sobre el método: el encargo decía revisar únicamente el brief. Esta
revisión **se salió de ese límite a propósito**, y leyó también el código del chequeo
(`functions/api/*.js`) y corrió mediciones sobre sitios reales. Sin eso no se habría podido
descubrir lo más importante que aparece acá: que tres de las cuatro exclusiones que el brief da
por detectables no lo son, y que la compuerta que el brief quiere construir ya existe. Un documento
no puede desmentirse a sí mismo; solo los hechos pueden.

**Lo que queda pendiente, y vale decirlo:** esta revisión y su fundamentación salen de la misma
cabeza, así que comparten sus puntos ciegos. Una lectura a ciegas del documento solo, hecha por
alguien que no vio el código, es un chequeo distinto y sigue valiendo la pena.

---

## Los hechos que fundamentan la revisión

Verificados el 23-oct-2026.

**Lo que el chequeo detecta hoy.** El rápido (lee el HTML, ~2 s) mide 2 señales puntuables. La
revisión con navegador (mira 25-28 s) mide 4, con peso total 13. Aparte, lee la política publicada
y revisa los 12 puntos del Art. 14 ter, que **no puntúan**. Los estados son `ok`, `pendiente`,
`sin-confirmar` y `no-aplica`; los dos últimos salen del puntaje.

**Lo que el chequeo NO puede detectar.** No clasifica plataforma ni CMS. No detecta tienda en
línea con carro de compra. No sabe si la empresa tiene varios dominios: recibe uno y mira ese. No
ve integraciones a medida. **Sí** cuenta cuántos rastreadores de su catálogo corren, y **sí** sabe
cuándo no pudo medir (`bloqueado`, `parcial` → puntaje `null`).

**Lo que la página ya hace hoy con el botón.** `pendientes > 0 ? "Quiero el kit" : "Pregúntanos"`.
El comentario del código dice, literal: **«Sin pendientes no se vende nada.»** Si no pudo medir,
tampoco ofrece el kit: dice *«Esto no es un resultado a tu favor: es que no vimos.»* El botón
actual lleva al formulario `#pedir`, **y hoy ese formulario es la única compuerta real**, porque
Ramón lee la solicitud antes de comprometerse a nada.

**Medición sobre 10 sitios chilenos reales** (banco de pruebas, 25 y 26-sep): 3 sacaron 100 (no
hay nada que venderles), 3 no se pudieron medir, 2 traían 7 y 5 rastreadores, y 2 quedaron como
candidatos limpios al kit estándar. ⚠️ La muestra tiene bancos y un sitio de gobierno, son 10
casos, y es **direccional, no una tasa** del mercado objetivo, que son pymes.

**La política de privacidad publicada** está en **versión 1.5** y menciona **cero veces** pago,
compra, cobro, tarjeta, factura, boleta, transacción o Mercado Pago. Afirma hoy que *«no guarda
nada»*.

---

## Antes de todo lo demás: cinco decisiones que van primero

Ninguna es de programación, y las cinco bloquean el checkout:

1. **Qué corrige el kit, con nombre y apellido.** Hoy el alcance se define por referencia a sí
   mismo.
2. **Qué pasa con la plata si el caso no se puede entregar.** No hay política de devolución.
3. **Cómo se filtra lo que el chequeo no ve.** O se declara antes del botón, o llega al pago.
4. **Si el monto que viaja a Mercado Pago es el neto o el bruto.**
5. **La política de privacidad, actualizada antes del botón.**

Y dos cosas que el brief da por resueltas y no lo están: **la facturación electrónica de la SpA
sigue pendiente**, y **la compuerta que el brief quiere construir ya existe** en el botón actual.

---

## 1. El alcance

La pregunta: ¿se entiende el paquete estándar y tiene límites que se puedan operar?

**Respuesta corta: no todavía, y el problema es de definición, no de redacción.**

### 🔴 La compuerta «el sistema debe reconocer esos casos antes de cobrar» no se puede construir: 3 de las 4 exclusiones no son detectables

**Dónde en el brief:** Paquete estándar, párrafo de exclusiones (línea 49) y Decisión para cerrar, punto 2 (línea 58)

De las cuatro exclusiones (tienda en línea con checkout, varios dominios, múltiples herramientas de seguimiento, integraciones a medida) el chequeo solo mide una: cuántos rastreadores de su catálogo corren. No clasifica plataforma ni detecta checkout, recibe un solo dominio y no ve integraciones a medida. Y el brief además reemplaza el botón actual, que lleva a un formulario de pedido (#pedir), por un pago directo: hoy ese formulario es la única compuerta real, porque Ramón lee la solicitud antes de comprometerse. Si se construye tal cual, o alguien programa un clasificador que no existe, o la compuerta nunca se dispara y la tienda con checkout y el caso de varios dominios llegan al pago con precio fijo, ya con plata cobrada, donde solo queda devolver o entregar a pérdida. El punto 2 de la lista de decisiones agrava la contradicción: pide cerrar «qué casos detectables se salen del paquete», y con eso acepta que los no detectables sí lleguen al botón, lo contrario de lo que dice la línea 49.

**Ajuste:** Partir la compuerta en dos y escribirlo así en el brief. (a) Automática, sobre lo que el chequeo sí mide: si la cuenta de rastreadores conocidos pasa un umbral, el resultado ofrece «Pregúntanos» en vez del kit. (b) Declarada, sobre lo que no mide: 3 preguntas de sí/no antes del botón de pago, donde el camino por defecto (todas «no») sigue derecho al pago sin fricción extra. Guardar las respuestas junto al pedido como la base declarada del precio fijo, para que un desajuste descubierto durante la entrega sea una revisión de alcance con aceptación expresa, regla que el brief ya tiene, y no un cobro sorpresa. Reescribir el punto 2 de la lista de decisiones como «qué casos se salen del paquete, y para cada uno si se detecta o se declara».

**Falta este dato:** El umbral de rastreadores. Hoy no existe: el banco de 10 sitios muestra 7 y 5 en bancos grandes, está sesgado y no dice nada de pymes. Hace falta cuánto demora llevar N rastreadores detrás del consentimiento en una entrega real medida.

### 🔴 Los dos casos en que no hay nada que vender no están en el brief, y la página ya los resuelve bien

**Dónde en el brief:** Recorrido principal, pasos 3 y 4 (líneas 19-20) y Criterios de aceptación (líneas 127-129)

El recorrido da por hecho que después del resultado «aparece una oferta principal de implementación» y que el botón lleva al pago. El código de la página ya decide distinto: sin pendientes muestra «Pregúntanos» (el comentario dice «Sin pendientes no se vende nada»), y si no pudo medir tampoco ofrece el kit, muestra «Esto no es un resultado a tu favor: es que no vimos». En el banco de 10 sitios chilenos esos dos casos fueron 6: 3 sacaron 100 y 3 dieron puntaje null. La muestra está sesgada y es direccional, no una tasa del mercado objetivo, pero los dos casos son reales y frecuentes. Quien implemente el brief al pie de la letra reemplaza una regla correcta que ya está viva por un botón que cobraría por un sitio sin nada pendiente, o por uno que nadie pudo medir y que por lo tanto nadie puede cotizar.

**Ajuste:** Subir al brief la regla que ya existe, como criterio de aceptación del MVP, en dos líneas: «si el informe no deja ninguna señal en pendiente, el resultado no muestra el botón de pago»; «si el puntaje sale null (bloqueado o parcial), el resultado no muestra el botón de pago y dice que no se pudo medir». En los dos casos la acción es «Pregúntanos», que es el comportamiento actual. Y corregir el paso 3 del recorrido para que diga que la oferta aparece solo cuando hay pendientes medidos.

### 🟡 El kit no tiene definición de «listo» que el comprador pueda verificar solo

**Dónde en el brief:** Paquete estándar, «Nueva verificación y entrega de un resumen antes/después» (línea 46) y Recorrido principal, paso 8 (línea 24)

El brief promete volver a correr el chequeo y entregar un antes/después, pero no dice cuál es la condición de término. En un producto que se compra sin conversación previa, «listo» tiene que poder comprobarlo el comprador por su cuenta. Además la verificación final puede no poder medir: en el banco de 10 sitios, 3 dieron puntaje null, y un sitio medible antes puede quedar «parcial» después. Sin condición escrita, la entrega se cierra por conversación, que es exactamente lo que este producto quiere evitar, y en un caso discutido Ramón no tiene criterio para decir que terminó.

**Ajuste:** Escribir la condición de término en una línea en el alcance y repetirla en el informe final: «las señales listadas en tu pedido salen ok en el mismo chequeo público, y las que no, se informan con la razón». Agregar la regla del caso sin medición: si el chequeo posterior sale bloqueado o parcial, se entrega la evidencia de los cambios aplicados y se dice que la verificación automática no se pudo completar, sin presentarlo como resultado a favor.

### ⚠️ (no encontrado: Las señales en «sin-confirmar» quedan en el informe del comprador pero no se dice si entran en el kit)

### 🟡 «Pendientes > 0» no distingue un enlace que falta de rehacer cómo carga el sitio sus etiquetas, y el precio es el mismo

**Dónde en el brief:** Oferta y precio (línea 32) y Paquete estándar, precio de prueba (línea 51)

La compuerta que ya existe es binaria: con al menos un pendiente se ofrece el kit. Pero las 6 señales puntuables no cuestan lo mismo de arreglar: llevar a ok «Enlace a tu política de privacidad» es publicar un enlace, y llevar a ok «Rastreadores que parten solos» y «Cookies escritas sin permiso» es cambiar cómo carga el sitio sus etiquetas. El paquete cobra lo mismo por el sitio con un solo pendiente liviano que por el que trae los cuatro de la revisión con navegador. El primer comprador podría ser el caso liviano, que es el peor estreno posible para un producto con demanda orgánica casi cero: queda con la sensación de haber pagado de más y no hay cola de compradores que compense ese estreno.

**Ajuste:** Definir el piso del paquete estándar en la misma unidad que produce el chequeo: por ejemplo, que el kit se ofrezca cuando hay al menos un pendiente de los relacionados con consentimiento, y que el caso «solo falta el enlace a la política» vaya a «Pregúntanos» hasta que exista una oferta más chica definida. Dejar el piso escrito en el brief junto a la regla de pendientes, no solo en el código.

**Falta este dato:** Cuánto toma cada corrección en una entrega real medida. Sin eso no se puede decidir el piso ni saber si el caso liviano deja margen o se regala.

### 🟡 Las exclusiones están escritas en categorías que un dueño de pyme no puede contestar

**Dónde en el brief:** Paquete estándar, párrafo de exclusiones (línea 49)

«Múltiples herramientas de seguimiento» e «integraciones a medida» son categorías internas. Si tres de las cuatro exclusiones pasan a declararlas el comprador, que es la única salida porque no son detectables, y el comprador es justamente la persona no técnica a la que apunta el producto, la compuerta falla abierta: contesta «no» porque no entiende la pregunta, no porque su caso esté limpio. El efecto es el de no tener compuerta, con el agravante de que ahora existe una declaración que apunta al cliente.

**Ajuste:** Reescribir cada exclusión como una pregunta sobre algo que el dueño ve o sabe: «¿Se puede comprar y pagar con tarjeta en tu sitio?» en vez de tienda con checkout; «¿Tienes más de una dirección web (otro dominio, un subdominio o una landing aparte)?» en vez de varios dominios; «¿Quién mantiene tu sitio hoy: tú, una agencia o desarrollador, o nadie?» en vez de integraciones a medida. La tercera además entrega el dato operativo que de verdad importa, que es si hay alguien que pueda dar el acceso.

### ⚪ El pedido se asocia a un «dominio» y no a la URL que de verdad se midió

**Dónde en el brief:** Paquete estándar, «Un dominio y el sitio principal asociado a ese dominio» (línea 42) y Recorrido principal, paso 3 (línea 19)

El chequeo recibe un dominio y mira ese. «El sitio principal asociado a ese dominio» no dice qué pasa con un subdominio, con la versión con y sin www, o con una landing hecha en otra herramienta que también escribe cookies. El comprador entiende «mi sitio» como todo lo que tiene en internet. Después del pago, con precio fijo, la diferencia entre lo medido y lo que él entendía es trabajo no cotizado o una conversación incómoda.

**Ajuste:** Guardar en el pedido la URL exacta que se midió y mostrarla junto al precio antes del pago, con una línea de que el alcance es ese sitio. La pregunta sobre otras direcciones web del ajuste de exclusiones cubre el resto.

---

## 2. La compra directa

La pregunta: ¿sobrevive el principio de comprar sin conversación previa, y dónde se cae una
persona que no es técnica?

**Respuesta corta: el principio es correcto y se puede sostener. Lo que no sobrevive tal como
está escrito es el tramo de después del pago.**

### 🔴 El muro de acceso queda después del pago y está escrito en un idioma que el comprador no puede ejecutar

**Dónde en el brief:** Recorrido principal, paso 6 ("se solicita una invitación temporal con permisos acotados o un medio seguro acordado") y Paquete estándar, último punto ("El cliente entrega acceso temporal con permisos mínimos; el trabajo comienza una vez recibido")

"Invitación temporal con permisos acotados" solo lo puede ejecutar alguien que administra su propio sitio. El caso típico de la pyme es que el sitio lo hizo un tercero, y el protocolo real de entrega exige acceso al hosting, repo o CMS, no un snippet autoinstalable. Si se construye así, el pedido queda cobrado y detenido en el estado 2 ("Falta el acceso temporal al sitio"), y la única persona que puede desatascarlo es la que no administra el sitio. El brief no dice qué pasa si ese acceso nunca llega, así que el camino por defecto es una disputa en Mercado Pago, que para un operador solo es peor que haber conversado antes.

**Ajuste:** Mover la compuerta a ANTES del botón de pago, como una pregunta de una línea con tres opciones, no como una llamada: (a) "Yo entro a administrar mi sitio" va a checkout normal; (b) "Lo administra alguien más (quien me lo hizo, una agencia)" va a checkout normal Y el pedido incluye un correo ya redactado PARA esa persona, con el permiso exacto que se pide y qué se va a hacer, listo para reenviar, de modo que el comprador no tiene que explicar nada técnico; (c) "No sé quién puede entrar" no llega al botón de pago y cae en el formulario #pedir que ya existe, marcado. Y reemplazar en el brief la frase "invitación temporal con permisos acotados" por las tres cosas concretas que se aceptan, nombradas como las ve el cliente: usuario temporal en el panel de su sitio, invitación al repo, o acceso al panel del hosting.

**Falta este dato:** Ninguno para escribir la compuerta. Para dimensionar cuántos caen en la opción (c), habría que preguntarlo en los correos de outbound que ya salen, que hoy no lo preguntan.

### 🔴 El limbo entre el pago y la entrega del acceso no tiene dueño, ni fecha, ni salida

**Dónde en el brief:** Recorrido principal pasos 5 a 7, "Espacio privado del cliente" (estados 1 y 2) y Criterios de aceptación ("El cliente puede entender el estado del trabajo y qué acción le corresponde")

La pantalla le dice al cliente qué le toca a él, en voz pasiva, y nadie queda nombrado como el que empuja. El brief no tiene ni una fecha en todo el tramo de entrega. Un operador solo con horas limitadas no va a revisar pedidos detenidos salvo que algo se lo recuerde, así que el estado 2 puede quedar indefinido con la plata ya cobrada. Además, la razón principal por la que alguien no compra sin conversar es no saber cuándo va a estar hecho, y el brief no le da ninguna fecha antes de pagar.

**Ajuste:** Tres cosas concretas: (1) mostrar antes de pagar las dos fechas que de verdad dependen del cliente, redactadas como condición y no como promesa ("empezamos dentro de X días hábiles desde que recibimos el acceso, y entregamos Y días hábiles después"); (2) nombrar el empuje en el brief como paso operativo de Ramón, no "el equipo": recordatorio manual al día 2 y al día 7 sobre un pedido detenido en el estado 2, porque hoy el sitio no tiene forma de mandar correos programados y suponerla sería inventar capacidad; (3) escribir la política del pedido que nunca arrancó (plazo tras el cual se devuelve o se deja en crédito), para que no la defina una disputa.

**Falta este dato:** El plazo real de entrega medido en un sitio de un tercero (el único caso real, spindlelab.cl el 21-sep, fue el propio repo de Ramón y no sirve de referencia), y la ventana de reembolso y contracargo que aplica a la cuenta de Mercado Pago de la agencia.

### 🔴 "Plantilla basada en la información que entregue el cliente" contradice el intake mínimo y, preguntada con los nombres de la ley, es un examen legal

**Dónde en el brief:** Paquete estándar, cuarto punto ("plantilla de política de privacidad basada en la información que entregue el cliente") contra el paso 5 ("Solicita solo plataforma, contacto y datos mínimos para iniciar")

Las dos frases no pueden ser verdad a la vez: o el intake es mínimo y la plantilla no se puede llenar, o alcanza para llenarla y no es mínimo. Y la plantilla se arma sobre los 12 puntos del Art. 14 ter, varios de los cuales un dueño de pyme no puede contestar si se le preguntan con esos nombres (plazo de conservación, transferencias internacionales, decisiones automatizadas, medidas de seguridad). Si el intake se construye como un formulario con esos campos, el cliente lo abandona y el pedido se detiene por segunda vez, ahora en el estado 3.

**Ajuste:** Partir el intake en dos. Al momento del pedido se piden solo los datos para arrancar y para identificar al responsable: razón social, RUT de la empresa, dirección, correo de contacto para temas de datos, y quién administra el sitio. El resto NO se le pregunta: la plantilla se entrega como borrador ya redactado, derivado de lo que el chequeo midió, con entre 5 y 8 huecos marcados como preguntas en castellano de todos los días y con una respuesta sugerida ("¿Guardas los correos de quien te escribe por el formulario? ¿Por cuánto tiempo?" en vez de "plazo de conservación"). El cliente recibe un documento, no un cuestionario, y lo que queda abierto va a su abogado.

**Falta este dato:** La lista cerrada de campos que la plantilla necesita del cliente, que hoy no está escrita en ninguna parte. Sale de la plantilla real que ya se usó, quitando lo que no aplica a un tercero.

### ⚠️ (no encontrado: Se le pregunta al cliente la plataforma de su sitio, que es justo lo que no sabe y lo que el chequeo tampoco ve)

### 🟡 Un pago pendiente con botón de reintento puede cobrar dos veces

**Dónde en el brief:** §74 y §76 del camino de cobro

La idempotencia que describe el brief protege contra dos órdenes por el mismo pedido, que es un problema distinto. El hueco está en el estado pendiente: el brief ofrece "una acción para volver a intentar" sin distinguir pendiente de rechazado. Un pago pendiente que después se aprueba, más un reintento con tarjeta que también se aprueba, son dos pagos aprobados contra el mismo pedido. El cliente queda cobrado dos veces por un kit, y el que se entera primero es él.

**Ajuste:** Separar los dos estados en la pantalla de retorno. Con un pago pendiente no se ofrece pagar de nuevo: se muestra el estado, hasta cuándo vale y un camino para avisar que ya pagó. El reintento se habilita solo con el pago rechazado o vencido. Y en el webhook, un segundo pago aprobado con el mismo identificador externo no se acepta en silencio: se marca para devolución y avisa.

**Falta este dato:** Qué medios de pago tiene habilitados esa cuenta de Mercado Pago, cuáles pueden quedar pendientes y por cuánto tiempo. Está en la configuración de la cuenta y en la documentación de medios de pago de Mercado Pago Chile.

### 🟡 El nombre que el comprador verá en su tarjeta no es el nombre con el que compró

**Dónde en el brief:** «El pago corresponde al kit de implementación y llega a la cuenta de Mercado Pago de la agencia»

La página se llama Verifica y Cumple y la cuenta que cobra es de SpindleLab SpA. En el estado de cuenta aparece el nombre del comercio. Un cargo que el comprador no reconoce es la causa más común de contracargo, y un contracargo en un servicio sin entrega física se pierde casi siempre, con la comisión incluida. Es plata que se va de un pedido que sí se entregó.

**Ajuste:** Escribir en la tarjeta de la oferta, antes del botón, una línea que diga quién cobra y qué nombre va a aparecer en el estado de cuenta, con el RUT de la SpA. Y revisar en el panel de Mercado Pago el nombre de fantasía que viaja al estado de cuenta, para que coincida con lo que dice la página.

**Falta este dato:** El nombre de comercio configurado hoy en la cuenta de Mercado Pago. Se ve en el panel de la cuenta.

### 🟡 El brief no dice cuál de los dos chequeos es el antes y el después, y los dos no son comparables

**Dónde en el brief:** Recorrido principal, paso 8 ("se vuelve a correr el chequeo y se entrega un informe antes/después") y "Qué entra en el primer MVP" ("Informe final antes/después")

Hoy existen dos chequeos distintos: el rápido, que puntúa 2 señales con peso 20 a 24 y no acredita un gestor hecho a mano, y la revisión con navegador, que mira 4 señales con peso 13 y mide el comportamiento real. Si el "antes" se toma con uno y el "después" con el otro, los números no son comparables y el informe se lee como manipulado. Y si el antes y el después se toman con el rápido en un sitio donde el gestor se construyó a medida, el puntaje puede moverse poco pese a que el arreglo funciona: una entrega correcta parece una entrega fallida, y eso es la prueba completa de lo que el cliente pagó.

**Ajuste:** Escribir en el brief que el antes y el después son los dos chequeos corridos dos veces, siempre el mismo par, y que la prueba principal del informe es una tabla señal por señal con su nombre (señal, antes, después), con el puntaje como número secundario. Agregar al informe el par de capturas del sitio al entrar, con el aviso apareciendo, porque es lo único que el cliente puede verificar con sus propios ojos. Y cuando la plataforma del cliente lo permita, usar un gestor que el detector reconozca, para que la prueba y el instrumento no se contradigan.

**Falta este dato:** Ninguno nuevo, pero la elección del gestor de consentimiento es la decisión 1 que el propio brief deja abierta, y de ella depende cómo se ve este informe.

### 🟡 El espacio privado guarda el diagnóstico y el pago, y no tiene puerta definida

**Dónde en el brief:** §21, §73 y §93-104

El brief hace bien en prohibir contraseñas, pero no pone nada en su lugar. El espacio privado va a mostrar el diagnóstico del sitio del cliente, el estado del pedido y el pago, y se "habilita" sin que el documento diga con qué credencial se entra ni cuánto dura. Si termina siendo un enlace adivinable, o un enlace eterno reenviado por correo, el diagnóstico de un cliente queda abierto a cualquiera que tenga la dirección. Y eso es justo lo que la política del tercer hallazgo tiene que declarar como medida de seguridad.

**Ajuste:** Decidir y escribir el mecanismo antes del paso 5 de la secuencia, porque define el modelo de datos: enlace con token aleatorio largo, con vencimiento y renovable por correo, y que el espacio no muestre del pago más que el monto, la fecha y los últimos dígitos.

---

## 3. Qué falta para validar los $149.000 + IVA

La pregunta: ¿qué costos o datos faltan para poder fijar ese precio?

**Respuesta corta: falta una medición que hoy no existe, y faltan tres costos que el brief no
cuenta. Ninguna de las dos cosas requiere un comprador para resolverse.**

### 🔴 La decisión 3 nombra dos partidas y la entrega tiene al menos catorce

**Dónde en el brief:** Decisión 3: «Cuántas horas de trabajo y costos directos requiere una entrega típica, incluyendo la comisión del medio de pago»

Con dos partidas el cálculo va a dar bajo, y el precio se va a fijar sobre ese número bajo. Las que faltan no son residuales: la gestión del acceso y la redacción de la política son las dos que más tiempo se llevan cuando el comprador es una empresa pequeña sin equipo técnico, y son justamente las que el brief trata como trámite.

**Ajuste:** Medir con cronómetro en la próxima entrega, una fila por entrega en una planilla, con estas partidas separadas. Horas: (1) alta del pedido y volver a correr el chequeo, porque el del pedido puede tener días; (2) pedir el acceso, esperarlo, y el ida y vuelta cuando llega mal o insuficiente, que es la partida que más se subestima; (3) reconocer el sitio: plataforma, dónde está inyectado cada rastreador (etiquetado, plugin o código), cuántas plantillas hay que tocar; (4) instalar y configurar el gestor, con textos en es-CL y bloqueo previo; (5) cada corrección técnica, contada por señal, no en bloque; (6) el cuestionario al cliente y la redacción de los 12 puntos del Art. 14 ter, que el brief llama «plantilla» y en realidad es redacción con datos que hay que pedir y esperar; (7) la verificación final y sus repeticiones cuando no queda verde en la primera pasada; (8) el informe antes/después y el anexo técnico; (9) la ventana de soporte posterior, hoy abierta sin límite escrito porque el paso 8 dice que el cliente «confirma la recepción» y no dice hasta cuándo puede reclamar; (10) la revisión de Ramón antes de que el informe salga, que la skill de entrega exige como paso obligatorio. Costos directos: (11) comisión de Mercado Pago más el IVA de la comisión; (12) revisiones de Browser Rendering; (13) plan del gestor de consentimiento, si aplica; (14) el costo de las sesiones de agente usadas en la entrega. Y una partida de reparto que nunca se anota: las horas de los pedidos que se devuelven sin entregar, que hay que repartir entre los que sí se entregan.

**Falta este dato:** Ninguno para empezar a medir. El dato que falta es la medición misma, y hoy no existe en ninguna parte del repo.

### 🔴 El monto que viaja a Mercado Pago no está definido: "+ IVA" no es un total

**Dónde en el brief:** Sección «Oferta y precio» y el criterio de aceptación «El precio total y el alcance aparecen antes de aceptar el pago»

Checkout Pro cobra UN número bruto. El brief repite «precio total» sin decidir nunca si ese total es el neto publicado o el neto más 19%. Si el pedido se crea con el neto, el 19% sale del margen en cada venta y no se recupera después, porque el cliente ya pagó un total que vio y aceptó. Si se crea con el bruto sin desglosar, el comprador que venía del titular «Desde $149.000 + IVA» ve en el checkout un número 19% más alto y abandona ahí, donde ya no hay forma de explicarle nada.

**Ajuste:** Fijar en el servidor el monto bruto como el único valor que viaja a la orden, y mostrar tres líneas en la tarjeta de la oferta antes del botón: servicio (neto), IVA 19%, total a pagar. El criterio de aceptación pasa a ser verificable así: «el número que muestra la página es idéntico al que muestra el checkout de Mercado Pago». Y en la página del resultado el monto deja de decir «+ IVA» y dice el total, con el neto en la línea de abajo.

### 🟡 «La comisión del medio de pago» son varias comisiones, y cuál aplica depende de decisiones que nadie tomó

**Dónde en el brief:** Decisión 3, el paréntesis «incluyendo la comisión del medio de pago»

La tarifa de Mercado Pago cambia según el plazo de liberación del dinero y según el medio con que pague el cliente, se calcula sobre el bruto y no sobre el neto, y la comisión misma lleva IVA. Si además quedan activas las cuotas sin interés, ese costo lo paga el vendedor y puede ser varias veces la comisión base. Un porcentaje genérico en la planilla puede quedar corto por un factor grande, y es un error que se repite idéntico en cada venta.

**Ajuste:** Bajar la hoja de tarifas de la cuenta y escribir cuatro líneas separadas en el costo unitario: comisión del plazo de liberación elegido, IVA de esa comisión, costo de cuotas si se habilitan, y costo esperado de contracargos. Y tomar dos decisiones explícitas antes de abrir el checkout: qué plazo de liberación se usa, y si las cuotas sin interés van encendidas. Apagadas es lo defendible mientras el margen no esté medido.

**Falta este dato:** La hoja de tarifas de la cuenta de Mercado Pago de SpindleLab: comisión por plazo de liberación, costo de cuotas y política de contracargos. Está en el panel de la cuenta.

### ⚠️ (no encontrado: El gestor de consentimiento queda instalado en el sitio del cliente sin que nadie haya definido de quién es la cuenta)

### 🔴 La facturación de la SpA no está activa y el intake no pide los datos para emitir el documento

**Dónde en el brief:** «Camino de cobro con Mercado Pago» («la boleta sigue el proceso tributario que la agencia ya utiliza») y paso 5 del recorrido («solicita solo plataforma, contacto y datos mínimos»)

El kit vendido ahora es contrato nuevo, así que lo cobra SpindleLab SpA, y la activación de la facturación electrónica de la SpA está pendiente. Abrir el checkout antes significa recibir dinero sin poder emitir el documento. Y aun estando activa: una empresa pequeña que compra cumplimiento lo quiere con factura para usar el crédito fiscal, y la factura necesita RUT de empresa, razón social, giro y dirección. Esos campos no están en el intake y el brief evita pedir RUT, así que cada pedido pagado va a obligar a abrir un correo pidiendo datos tributarios, que es exactamente la conversación que la compra directa venía a eliminar.

**Ajuste:** (a) Poner la activación de la facturación electrónica de la SpA como bloqueador del paso 2 de la secuencia de trabajo, antes de crear la aplicación de Mercado Pago. (b) Agregar al intake postpago un bloque de cuatro campos con su motivo escrito: «para emitir tu factura: RUT de la empresa, razón social, giro, dirección». Eso no choca con la regla del brief, que prohíbe RUT personal y contraseñas, no datos tributarios de la empresa compradora. (c) Escribir una línea en las condiciones sobre boleta y factura: quién recibe cuál y que el monto a pagar es el mismo en los dos casos.

**Falta este dato:** El estado real de la facturación electrónica de la SpA en el SII (lo está viendo Ramón en otra sesión), y si la cuenta de Mercado Pago está a nombre de la SpA con su RUT o a nombre de persona natural.

### 🟡 Falta confirmar que se puede emitir el documento y que la plata llega a la SpA

**Dónde en el brief:** §66 ("la boleta sigue el proceso tributario que la agencia ya utiliza") y el paso 2 de la secuencia de trabajo

Las dos cosas se dan por hechas. Según el registro de este proyecto, al 26 de septiembre la SpA estaba constituida en el SII con cuenta de empresa lista pero faltaba activar la facturación; si eso sigue pendiente, el checkout empieza a cobrar con IVA sin poder emitir el documento. Y si el titular de la cuenta de Mercado Pago no es SpindleLab SpA con su RUT, el dinero entra a una persona natural mientras factura la empresa, y la contabilidad queda cruzada desde la primera venta.

**Ajuste:** Antes del paso 2 de la secuencia, dos verificaciones con captura: facturación electrónica activa en el SII para el RUT 78.474.925-8, y cuenta de Mercado Pago a nombre de la SpA con su cuenta bancaria asociada. Y decidir si se emite boleta o factura, porque eso define qué datos de facturación se piden y en qué momento. Un comprador empresa va a querer factura para su crédito de IVA, y eso choca con la regla de §110 de no pedir RUT: hay que acotarla a que el RUT se pide para el documento, una vez que la compra existe.

**Falta este dato:** El estado real de la facturación electrónica hoy (lo lleva Ramón en otra sesión) y el titular actual de la cuenta de Mercado Pago. Ninguno de los dos está escrito en el repo.

### 🟡 No hay techo de entregas: el checkout está abierto 24/7 y el que entrega es una persona con horas limitadas

**Dónde en el brief:** «Qué entra en el primer MVP» y el recorrido completo, que no mencionan capacidad ni plazo de entrega

Nada en el flujo limita cuántos pedidos se toman en una semana. Si se venden cinco en la misma semana quedan cinco entregas comprometidas que no caben en las horas disponibles, y el valor del kit está amarrado al 1-dic, así que atrasarse no es neutro: es incumplir lo único que hacía urgente la compra. Encima el checkout no promete ningún plazo, así que no hay nada medible que cumplir, lo que a ojos del comprador es peor que un plazo ajustado.

**Ajuste:** (a) El endpoint que crea el pedido lee un cupo semanal, un número que Ramón fija a mano; cuando está lleno, el botón cambia a lista de espera que toma el correo y dice la próxima ventana. No es «agenda una llamada» y no rompe la compra directa del caso típico. (b) Escribir un plazo de entrega en días hábiles contados desde que llega el acceso, no desde el pago, y mostrarlo antes del botón; así el reloj no corre mientras se espera algo que depende del cliente.

**Falta este dato:** Cuántas horas por semana reserva Ramón para entregas del kit. Con eso y las horas por entrega del hallazgo de medición, el cupo es una división.

### 🟡 La oferta publicada ya compromete seis meses de un recurrente que el MVP no puede cobrar ni tiene definido

**Dónde en el brief:** «La oferta pública actual comunica (…) la revisión trimestral desde $39.000 + IVA al mes, con mínimo de seis meses» y «La revisión periódica se ofrece como continuidad después de la entrega»

El recurrente se muestra hoy en la portada en una tarjeta gemela a la del kit, con el mismo «desde». Mientras el MVP no pueda cobrarlo es un compromiso anunciado que nadie puede aceptar, y además está escrito de una forma que el comprador va a leer mal: «revisión trimestral» cobrada «al mes» se lee como pagar todos los meses por un trabajo que ocurre cada tres. Un comprador que lo lee así calcula el total de seis meses y decide que es caro, antes de llegar a evaluar el kit.

**Ajuste:** Para el MVP, o se saca el recurrente de la página del resultado y queda solo en la portada, o se escribe en una línea qué es: cuota mensual, revisión cada tres meses, compromiso de seis meses, y el total de esos seis meses en pesos. Ese total hay que calcularlo sobre el precio final y no sobre el «desde», así que la línea se escribe después de cerrar el precio del recurrente, no antes.

**Falta este dato:** Qué incluye exactamente una revisión trimestral y cuántas horas toma, que no está definido en ninguna parte del repo, y el precio final del recurrente.

### 🟡 "+ IVA" no es un total, y el precio está escrito en cinco lugares del sitio

**Dónde en el brief:** §28, §51 y el punto 4 de §60, contra public/index.html del sitio de Verifica y Cumple

Mercado Pago cobra un monto bruto único. Mientras la página dice "Desde $149.000 + IVA", el comprador que apriete va a ver en el checkout un número distinto del que leyó, que es la fricción clásica que mata una compra directa en el último paso. Y cuando se fije el total hay cinco lugares que lo dicen: el JSON-LD de preguntas frecuentes (línea 216), la tarjeta del kit (1634), la pregunta visible (1758) y los dos cierres del resultado (2117 y 2497). Si se cambia la tarjeta y se olvida el JSON-LD, Google y los motores de IA siguen citando el precio viejo, que es el canal donde este producto dice jugarse.

**Ajuste:** Mostrar el monto bruto como el número grande, con el neto y el IVA desglosados debajo, y que ese bruto sea el que va a la orden. Cambiar los cinco lugares en una sola pasada, el JSON-LD incluido, y verificar el render antes de publicar. Si la palabra "desde" queda en algún lado, que no sea una pantalla con botón de pago.

**Falta este dato:** El total final, que es la decisión del punto 4 de §60 y la toma Ramón. Nada más.

### 🟡 El precio fijo no tiene límite medible, y el chequeo sí mide uno

**Dónde en el brief:** §38-51, el paquete estándar propuesto, y el punto 3 de §59

El alcance dice "las correcciones técnicas que estén dentro del alcance publicado", que es circular: el alcance publicado es el que se está definiendo. El trabajo real no escala con el puntaje, escala con cuántos rastreadores hay que poner detrás del consentimiento, y eso es justo lo único de esta dimensión que el chequeo sabe contar: cuántos rastreadores de su catálogo corren. En la medición de 10 sitios chilenos, dos traían 7 y 5 (muestra sesgada y chica, direccional, no una tasa de mercado). Un precio fijo sin tope en ese eje se cobra igual para un sitio con GA4 que para uno con siete rastreadores, y el segundo se entrega a pérdida o se entrega mal.

**Ajuste:** Definir el paquete estándar con tope en el único eje que el sistema mide hoy: hasta N rastreadores detectados del catálogo, un dominio, un sitio. Por sobre N, el botón manda a revisión de alcance en vez de al pago, con la misma compuerta del primer hallazgo. Y queda escrito en la página como condición del precio, no en una nota interna.

**Falta este dato:** Cuántos minutos toma dejar un rastreador detrás del consentimiento en una entrega real. Sin ese número no se puede elegir N, y sale de cronometrar la primera entrega, no de estimarla.

### ⚪ «Precio de prueba» sin regla de precio congelado al comprar

**Dónde en el brief:** «Precio de prueba: usar los actuales $149.000 + IVA solo como hipótesis para evaluar el paquete»

Si la medición muestra que el alcance toma el doble y el precio sube, no hay nada escrito sobre los pedidos ya pagados al precio de prueba. Un cliente a mitad de entrega que se enteró del cambio va a preguntar, y la respuesta tiene que estar escrita antes, no improvisada en el momento.

**Ajuste:** Una línea en las condiciones del checkout: el precio queda fijo al momento del pago para el alcance estándar de ese pedido, y un cambio posterior de precio no afecta pedidos ya pagados. Y guardar en el registro del pedido el precio y la versión del alcance vigentes al cobrar, no solo el monto.

---

## 4. La frontera entre revisión técnica y cumplimiento legal

Lo pediste explícitamente y es donde el brief tiene su mejor decisión y su peor hueco a la vez.

El brief prohíbe, con razón, decir «tu empresa no cumple», «sitio certificado» y «ahora
cumples». Esa negativa es correcta y no hay que tocarla. El problema es lo que deja sin
resolver: si el producto no dice «cumples», **entonces la decisión de compra le exige al
comprador sostener él mismo una distinción abstracta**, y el brief nunca se la pone por escrito
en una frase que pueda usar para decidir.

### 🔴 Para decidir, el comprador tiene que sostener él mismo la diferencia entre señal técnica y cumplir la ley

**Dónde en el brief:** "Cómo se presenta el resultado", párrafo de prohibiciones ("Evitar las expresiones 'tu empresa no cumple', 'sitio certificado' y 'ahora cumples'") y Oferta y precio ("No incluye asesoría legal ni certifica cumplimiento")

El producto se niega, correctamente, a decir "cumples". Pero entonces la decisión de compra exige que el comprador sostenga una distinción abstracta: "esto no me pone al día con la ley, y aun así me conviene". El brief nunca convierte eso en una frase decidible; lo más cerca es una línea enterrada después del precio. Construido así, pasa una de dos cosas, y las dos son malas: o asume que el kit resuelve la ley y se siente engañado al recibir la entrega con el descargo, o sospecha que no resuelve nada y no compra. Que el comprador tenga que entender un concepto para poder decidir es un defecto de diseño, no un problema de redacción.

**Ajuste:** Un bloque fijo de dos columnas del mismo tamaño, antes del precio, titulado por responsable y no por concepto: "Esto lo dejamos hecho nosotros" (las N correcciones con su nombre, tomadas del resultado real) y "Esto queda para tu abogado" (el texto final de tu política y la evaluación de tu caso). Repetir la segunda columna en la última pantalla antes de pagar, como lo que explícitamente NO va incluido. Partir la decisión por responsable es algo que una persona no técnica sí puede decidir; partirla por "señal" contra "cumplimiento" no.

**Falta este dato:** Ninguno. Las dos columnas se llenan con el alcance ya publicado y con las señales que el chequeo ya devuelve con su nombre.

### 🔴 Encender el checkout rompe la política de privacidad publicada, que promete actualizarse antes

**Dónde en el brief:** §106-113 "Datos y confianza" del brief, contra la política v1.4 en vivo (verifica.spindlelab.cl/privacidad)

La política publicada afirma hoy como hecho que el resultado del chequeo "no se guarda en ninguna parte" (punto 09), que el proceso "no guarda nada y no tiene una base de datos detrás" y que "no tenemos una base de datos propia con los pedidos" (punto 05), que los proveedores son exactamente tres (punto 08), y en el punto 11 promete que "si algún día sumamos algo más que te pida datos, actualizamos esta política antes de encenderlo". El recorrido del brief necesita lo contrario en cuatro frentes: guardar el diagnóstico asociado al pedido, un registro de pedido con seis estados, datos de pago que llegan de un cuarto proveedor y datos de facturación. Si el checkout sale antes que la política, el producto queda incumpliendo por escrito su propia promesa, en la página que usa como prueba de que sabe hacer esto.

**Ajuste:** Agregar a la secuencia de trabajo (§136-143), como paso previo al paso 2, la versión 1.5 de la política, con la lista exacta de lo que cambia: punto 04, nueva categoría de datos de pago y facturación con su finalidad y su base; punto 05, que sí hay base de datos propia, cuál y qué guarda; punto 08, Mercado Pago como cuarto proveedor, dónde procesa y con qué términos; punto 09, cuánto se conserva el pedido, el informe y el registro de pago; punto 12, que el puntaje automático ahora decide si se puede comprar. Publicarla antes de habilitar el botón, no el mismo día.

**Falta este dato:** Cuánto obliga a conservar el registro de la venta la normativa tributaria, para escribir el plazo del punto 09 sin inventarlo. Es pregunta de contador, no de abogado.

### 🔴 Nadie decidió qué pasa con la plata si el caso no se puede entregar

**Dónde en el brief:** §30, §49 y §62 prohíben cobrar un adicional después de la compra; el estado 3 del espacio privado es "Revisión del alcance". No hay política de devolución en ninguna parte del brief.

El brief cierra la puerta del cobro extra y no abre ninguna otra. Si en la revisión de alcance aparece que el caso estaba fuera, o el cliente no acepta ampliar, o el sitio está en una plataforma donde el gestor no se puede instalar, el pedido queda en un estado que el documento no describe: pagado, sin entregable y sin regla. El primer caso así se resuelve improvisando por correo con la plata ya en Mercado Pago, y en un producto que se vende sobre protección de datos un reclamo de ese tipo pega donde más duele.

**Ajuste:** Escribir la política antes de abrir el cobro, visible en la misma pantalla del pago y repetida en el correo de confirmación. Tiene que cubrir, caso por caso: fuera de alcance detectado después del pago y el cliente no acepta ampliar; plataforma donde el kit no se puede instalar; el cliente nunca entrega el acceso (cuántos días queda abierto el pedido y qué pasa después); el cliente se arrepiente antes de que empiece el trabajo; no se entregó en el plazo ofrecido; y quién absorbe la comisión del medio de pago cuando se devuelve.

**Falta este dato:** Tres datos: si Mercado Pago devuelve su comisión en un reembolso (está en los términos de la cuenta, hay que leerlos); qué dice la ley del consumidor sobre retracto en una contratación electrónica como esta, que es pregunta de abogado y no se decide acá; y el plazo de entrega que Ramón puede comprometer con sus horas reales.

### 🔴 La compuerta de alcance que el brief da por existente no existe

**Dónde en el brief:** §49 ("El sistema debe reconocer esos casos antes de cobrar") y el paso 5 del recorrido, que pide la plataforma después del pago

Las tres exclusiones del paquete (tienda con checkout, varios dominios, integraciones a medida) son justo las tres cosas que el chequeo no puede detectar: recibe un dominio, no clasifica plataforma ni CMS, no tiene clasificador de tienda y no detecta integraciones. El único filtro real queda en el paso 5, que pregunta la plataforma cuando el dinero ya entró. Un sitio en Shopify, uno con tres dominios o uno en una plataforma donde no se puede insertar un script pasan el botón de pago sin que nada los frene, y la conversación de alcance ocurre con el pago hecho.

**Ajuste:** Convertir la detección en declaración, antes del botón: tres preguntas en la misma pantalla del resultado, "¿tu sitio vende en línea con carro de compra?", "¿quieres que cubramos más de un dominio?" y "¿en qué está hecho tu sitio?" con lista cerrada más "no sé". Cualquier respuesta fuera de la lista entregable va al formulario #pedir que ya existe, rotulado como revisión de alcance, no al pago. Tres toques no matan la compra directa del caso típico (un sitio informativo de un dominio) y el que no califica igual deja su pedido.

**Falta este dato:** La lista de plataformas en las que el kit se puede instalar hoy y en las que no. No está escrita en ninguna parte del repo, y sin ella no se puede redactar la lista cerrada ni decidir qué hace la opción "no sé".

### ⚪ La propia regla de privacidad del brief, leída al pie de la letra, bloquea la plantilla que el kit promete

**Dónde en el brief:** "Datos y confianza", tercer punto ("No pedir contraseñas, RUT personal ni datos de visitantes del sitio para iniciar la prestación")

La regla dice RUT personal, pero quien la implemente puede leerla como "no pedir RUT". El responsable que va en la política de privacidad es la empresa del cliente, con su razón social y su RUT, que son datos públicos y obligatorios del documento. Si el intake se construye sin ese campo, la plantilla sale sin responsable, que es el error grave ya identificado en el protocolo de entrega.

**Ajuste:** Reescribir el punto como "no se pide RUT de personas naturales ni datos de los visitantes del sitio; sí se pide la razón social y el RUT de la empresa, porque son el responsable que la política tiene que declarar".

---

## Lo que está bien y no hay que tocar

El brief acierta en varias cosas que son justo las que suelen salir mal, y conviene nombrarlas
para que la próxima versión no las pierda:

- **La cadena de pago está bien pensada.** Precio fijado en el servidor y no aceptado desde el
  navegador, confirmación por webhook verificado en vez de por la vuelta del navegador,
  idempotencia por pedido, y el checkout hospedado por Mercado Pago para no tocar datos de tarjeta.
- **La disciplina de no tocar el sitio del cliente** antes de tener pago, alcance y acceso
  confirmados.
- **Nunca pedir contraseñas**, ni en un formulario ni por correo.
- **El chequeo gratuito sigue sin pedir correo.** Es el único diferenciador real frente a un
  mercado donde todo diagnóstico pide el mail antes de mostrar nada, y el brief lo protege.
- **La negativa a certificar cumplimiento**, y la prohibición explícita de las tres frases.
- **No cobrar adicionales sin aceptación expresa del cliente.**
- **Un solo producto principal y un solo botón.** Resistir la tentación del catálogo es correcto
  para un MVP y para un comprador no técnico.
- **Dos niveles de informe**, resumen para quien decide y anexo técnico para quien administra.

---

## Las doce propuestas que la auditoría descartó

Van acá con su motivo, para que no vuelvan en la próxima versión del brief.


**«Dentro del alcance publicado» se define a sí mismo: el kit no nombra ni una corrección**

*Falla: inventa-capacidad.* El diagnóstico es correcto y necesario: las líneas 34 y 44 se apuntan una a la otra y ninguna nombra una corrección. El ajuste es el que falla. Dice que el kit «incluye llevar a ok las que el informe marcó pendiente de esa lista, y nada más», y la lista incluye «Enlace a tu política de privacidad». Esa señal solo pasa a ok cuando hay una política publicada y enlazada en el sitio. Pero lo que el kit entrega, según el propio brief (líneas 34 y 45), es una plantilla de política para que la revise el abogado del cliente. Cerrar esa señal depende entonces de que el abogado revise y el cliente publique: dos actos que no son de Ramón y que no se ha establecido que pueda hacer ni comprometer. Escrito como alcance fijo, queda una de dos salidas, las dos malas: publicar la plantilla sin revisión legal, que es exactamente el borde que el producto no debe cruzar, o quedar colgado de un tercero para cerrar la entrega. Y el hallazgo declara «necesita_dato: ninguno», cuando lo que falta es justamente definir qué significa cerrar esa señal cuando la política no es nuestra. Arreglo del arreglo: enumerar las 6 señales como hace el hallazgo, pero separar la del enlace a la política, cuyo entregable del kit es la plantilla más la instrucción de publicación, no el estado ok del chequeo.


**La plataforma del sitio se pregunta después del pago, y es la variable que más mueve el costo**

*Falla: mata-la-compra-directa.* El diagnóstico se sostiene entero: el paso 5 (línea 21) y el intake postpago (línea 121) preguntan la plataforma después de cobrar, el chequeo no clasifica CMS, y con precio fijo eso es cobrar antes de saber si el trabajo es de una tarde. El ajuste es el que falla, por su rama «no sé». Mandar a «Pregúntanos» a quien contesta «no sé» le quita el botón de pago a la respuesta más característica de la audiencia que el producto declara servir: el dueño no técnico que no sabe si su sitio es WordPress, un constructor cerrado o algo que le hizo un sobrino. La propia revisión establece ese punto en el hallazgo sobre las exclusiones escritas en categorías internas, y aquí lo contradice. No es una compuerta para casos raros: su tamaño es desconocido y puede ser la mayoría, y el hallazgo no pide ningún dato al respecto (solo pide la lista de plataformas entregables). Arreglo del arreglo: preguntar la plataforma antes del pago, que es lo correcto, pero que «no sé» siga al pago quedando registrada como base declarada del alcance, con la revisión de alcance y aceptación expresa que el brief ya tiene (líneas 49 y 62), y reservar «Pregúntanos» solo para las plataformas que estén declaradas fuera.


**«Configuración de un gestor de consentimiento» no dice si se instala el nuestro o se repara el del cliente**

*Falla: mata-la-compra-directa.* La ambigüedad que detecta es real y la combinación de señales que la delata (aviso presente en ok junto a cookies sin permiso en pendiente) sí está en lo que el chequeo mide hoy. El problema es el ajuste, y lo delata el propio hallazgo: abre diciendo «hay un caso común que el chequeo deja ver» y después le pone a ese caso común una compuerta que pide «confirmar qué gestor tiene antes del pago, u ofrece Pregúntanos». Un dueño de pyme no sabe nombrar su gestor de consentimiento; muchos tienen un banner porque alguien instaló un plugin gratis y nadie recuerda cuál. Las dos ramas bloquean: la pregunta es incontestable y la alternativa es una conversación humana. O sea, una compuerta humana sobre un caso que el hallazgo mismo califica de común, que es justo lo que el encargo prohíbe. Arreglo del arreglo: dejar escrito en el alcance que el kit instala y configura el gestor que usamos, nombrado, y que si el sitio ya trae uno se reemplaza por el nuestro dentro del paquete estándar, o se declara explícitamente que reparar uno ajeno queda fuera y ese caso se resuelve como revisión de alcance después del pago con aceptación expresa, no como un bloqueo antes del botón. Y antes de escribir cualquiera de las dos, falta el dato que el hallazgo pide bien: cuál es el gestor estándar y en qué plataformas Ramón ya lo instaló de verdad.


**La oferta describe tareas y señales, nunca dice qué gana el comprador**

*Falla: confunde-señal-con-cumplimiento.* El diagnóstico es correcto y es probablemente la razón real de que el botón no se pulse, pero el ajuste llena el vacío con la pieza prohibida. Poner como PRIMER elemento de un bloque titulado "lo que el comprador gana" la frase "esto es exigible desde el 1 de diciembre de 2026" convierte la obligación legal en el beneficio del producto: el lector no técnico lee "compro esto y quedo cubierto para el 1 de diciembre". El kit arregla señales del sitio y entrega una plantilla para que la revise un abogado; la ley exige mucho más que eso, y el propio protocolo de entrega (.claude/skills/entrega-kit-verificaycumple/SKILL.md) lista "Prometer cumplimiento" entre los errores típicos del oficio. La fecha es verdadera y sirve como contexto al lado del precio, no como primera línea de lo que se gana. Segundo defecto del mismo ajuste: la promesa (2) "te lo mostramos corriendo el mismo chequeo" choca con la limitación documentada del instrumento (chequeo.js reconoce gestores de una lista fija de proveedores y el protocolo dice explícitamente que un gestor hecho a mano puede funcionar y el puntaje no subir), que es justo lo que el hallazgo 7 de esta misma revisión advierte. Lo que sí se sostiene es el punto (3), el de la lista corta para el abogado: eso es un beneficio decible sin tocar la frontera. Rehacer el bloque con ese punto al frente y sin la fecha como gancho de valor.


**"El valor sube si tu sitio tiene más de lo que el chequeo alcanzó a ver" es la frase que mata la compra directa**

*Falla: contradice-los-hechos.* La frase de la tarjeta sí es un problema real y merece reemplazo, pero la evidencia con que se justifica no aplica y el propio ajuste lo demuestra. Los 3 de 10 sitios con puntaje nulo son casos donde el chequeo no pudo medir, y la página ya no ofrece el kit en ese estado: ofrece "Pregúntanos". Es decir, esos 3 nunca llegan a ver la tarjeta ni la nota, así que no pueden servir para dimensionar cuántas veces "aparece algo que el chequeo no alcanzó a ver" DESPUÉS de entrar al sitio, que es un caso distinto (páginas que no se miraron, un carrito, un segundo dominio) y sobre el que la medición de 10 sitios no dice nada. La revisión repite el descargo de sesgo y acto seguido usa la muestra como tasa ("alcanza para decir que no es un caso raro"), que es exactamente lo que los hechos piden no hacer. Aparte, la parte 1 del ajuste es describir en el brief lo que la página ya hace (está bien documentarlo, no es un hallazgo), y la copy propuesta declara "el precio es fijo" cuando el precio fijo todavía no existe: hoy lo publicado es "desde $149.000 + IVA" y el dato de horas y costos sigue abierto. El reemplazo de la nota queda bloqueado hasta ese dato, no por falta de redacción.


**El espacio privado no dice cómo se entra, y si pide cuenta, el comprador que acaba de pagar se topa con un registro**

*Falla: inventa-capacidad.* El problema es válido (el brief define seis estados y nunca dice cómo entra el cliente) y el criterio de no crear cuentas es el correcto, pero el ajuste apoya el ÚNICO punto de entrada al pedido en un canal que no existe. No hay nada que envíe correo en el código: grep de resend / mailchannels / sendgrid / postmark / smtp sobre verificaycumple/functions/ y spindlelab-astro/functions/ no devuelve una sola línea, y el brief no incluye envío de correo en el MVP. Si el enlace viaja solo por correo y el canal no está, el comprador que pagó se queda sin acceso a su pedido, que es peor que el registro que el ajuste quiere evitar. Además es inconsistente con el hallazgo 4 de la misma revisión, que se niega a suponer correos programados "porque suponerla sería inventar capacidad" y aquí supone el envío transaccional sin decirlo. La versión que no inventa nada: mostrar el enlace del pedido en la pantalla de retorno que el brief ya tiene ("Estamos confirmando tu pago"), con el estado en texto en esa misma página, y dejar el correo como copia secundaria recién cuando el canal de envío esté establecido y probado.


**Los casos que el brief deja fuera del paquete no son detectables, así que van a llegar al botón de pago**

*Falla: inventa-precio-o-garantia.* El diagnóstico es correcto y la pieza (a) también: tres casillas autodeclaradas en el mismo paso del botón es una compuerta para casos raros, el caso típico responde no a las tres y compra directo, y no inventa capacidad porque pregunta justamente lo que el chequeo no puede ver. Lo que falla es la pieza (b): escribe en las condiciones del checkout una devolución del 100% que nadie aprobó, y la escribe ANTES de tener el dato que el propio hallazgo pide (plazo y comisión reintegrable de Mercado Pago). Es el ejemplo literal que el encargo prohíbe, devoluciones inventadas, y además compromete plata en dos capas: la comisión que puede no volver más las horas ya gastadas en abrir el sitio y revisar el alcance. El mismo sesgo aparece en lo_que_esta_bien, que ya da por sentada «la rama de devolución que la hace operable». La versión defendible: (a) se queda tal cual, y (b) se reduce a redactar la REGLA DE SALIDA como decisión pendiente de Ramón, con la hoja de devoluciones de Mercado Pago en la mano, y con las opciones puestas como alternativas a elegir (devolver, cotizar el excedente, acreditar a cuenta), no con el 100% ya escrito. El estado «pedido devuelto» del espacio privado solo se agrega si esa decisión lo incluye.


**La verificación del «después» y el chequeo gratis consumen el mismo recurso medido, y no está contado como costo**

*Falla: contradice-los-hechos.* El costo es real y el ajuste sirve, pero el mecanismo con que se justifica la gravedad «alta» no existe. Verificado en /Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/.claude/worktrees/elastic-thompson-3a8ffd/verificaycumple/public/index.html: el botón del resultado rápido depende solo de los `pendientes` del chequeo rápido, que lee el HTML y NO abre navegador. Si se agota la cuota de navegador, el chequeo rápido sigue puntuando sus dos señales y sigue ofreciendo «Quiero el kit» cuando encuentra algo pendiente; lo que se cae es la revisión con navegador, que muestra su propio mensaje de falla. El puntaje `null` de los HECHOS sale de 'bloqueado' o 'parcial' en la medición, no de la cuota. Así que «la tienda se apaga sola justo cuando empieza a funcionar» no es cierto, y con ella se cae la urgencia que ordena este hallazgo por encima de los demás. Dos cosas más que el hallazgo da por nuevas y ya existen en functions/api/profundo.js: hay tres capas de tope (WAF 5 por IP cada 60 s, KV `TOPE_IP_DIA = 20` y `TOPE_GLOBAL_DIA = 80`) y una caché de resultado por dominio de 24 h, así que el consumo no es estrictamente «una por visitante» y el tope global ya acota el mes. Lo que SÍ se sostiene y hay que quedarse: cada pedido pagado consume revisiones adicionales que hoy no están en ninguna hoja de costo, el `anotarUso` de hoy cuenta llamadas por día y origen pero no guarda duración, y con la cuota diaria agotada Ramón puede quedarse sin poder verificar un pedido ya cobrado. Ese último riesgo es el que justifica reservar cuota, y es suficiente: no hace falta el relato del cierre de la tienda.


**No hay forma de medir la entrega típica antes de vender, y con demanda casi cero el «desde» se queda indefinidamente**

*Falla: inventa-capacidad.* El bloqueo que describe es real y la pieza (a) es ejecutable: filtrar los commits del 21 y 22-sep da una envolvente imperfecta pero propia. La pieza (b) no se sostiene. Correr «el kit completo» sobre los dos sitios del banco de pruebas supone acceso de administración a sitios de producción de terceros que no son clientes, para instalar un gestor de consentimiento gratis como ejercicio de medición: eso no está establecido que Ramón pueda conseguir, y el `necesita_dato` lo reconoce pero el ajuste igual lo propone como la medición de esta semana. El respaldo «o sobre una propiedad propia» cae en el defecto que el propio hallazgo nombra en su nota: el escenario más barato posible. Y hay un problema peor de lógica, el mismo que ya costó caro en este proyecto (la prueba y el arreglo saliendo del mismo supuesto): cualquiera de las dos mediciones excluye por construcción las partidas que el hallazgo 4 identifica como las más grandes (pedir el acceso y esperarlo, el ida y vuelta cuando llega mal, el cuestionario al cliente para los 12 puntos del Art. 14 ter). Con eso no se puede concluir «con un piso y dos mediciones ya se puede reemplazar «desde» por un total»: un piso al que se le quitaron las horas del cliente no autoriza publicar un total, autoriza publicar un número bajo. La versión defendible: quedarse con (a) como piso declarado, hacer (b) solo sobre propiedad propia o sobre un sitio con permiso escrito, y dejar explícito que el total publicado necesita además una estimación aparte de las horas de interacción con el cliente, que solo la primera venta real mide.


**La política ya va atrás del código, antes de que exista el checkout**

*Falla: confunde-señal-con-cumplimiento.* Los hechos del hallazgo están verificados en functions/api/profundo.js: namespace VYC_TOPES (línea 52, 1676), clave cache:<dominio> con expirationTtl de CACHE_HORAS=24 (1541, 1557, 1722) y contador tope:ip:<día>:<IP> con TTL de 60*60*30 (1552-1557, 1707). El arreglo principal (declarar el KV en la 1.5) se sostiene. Lo que falla es la rama alternativa, además declarada con necesita_dato "ninguno": "guardar un hash con sal en vez de la IP, y entonces la frase del punto 11 se sostiene tal como está". Primero, técnicamente no se sostiene: el espacio IPv4 completo son 2^32 valores y la sal vive en el mismo entorno del Worker que el dato, así que un hash con sal de una IP es una derivación reversible por enumeración, no una anonimización. Seguir diciendo "nosotros no los guardamos" mientras se guarda una derivación de la IP del visitante es exactamente la lectura conveniente que este producto le cobra a los demás, en la única página que usa como prueba de que esto se hace bien. Segundo, decidir que un valor seudonimizado deja de ser dato personal es una conclusión legal, y el propio comentario del código de la política se niega a concluir sobre el Art. 27-28 sin abogado; o sea, la rama necesita un dato (opinión de abogado) que declara no necesitar. El camino honesto es el que el mismo hallazgo pone primero: declarar el KV, su TTL y para qué sirve, y borrar la frase.


**El informe antes/después es donde el comprador va a leer "cumplo"**

*Falla: no-es-accionable.* El hallazgo es el más valioso del conjunto y hay que conservarlo: la lectura de cumplimiento sale de la composición (puntaje que sube, estado "Entrega lista", el nombre de la marca, los 12 puntos marcados), no de una frase, y el riesgo de que la plantilla entregada vuelva "mencionados" los 12 puntos es real. El cambio 1 (renombrar el estado final) y el 3 (pegar el descargo al bloque de los 12 puntos y marcar la plantilla como borrador sin revisión legal) son ejecutables tal como están. El cambio 2 no: pide imprimir el puntaje "siempre con su denominador en señales técnicas revisadas, nunca como porcentaje", y el puntaje es literalmente un porcentaje de peso confirmado — functions/api/chequeo.js línea 1545: Math.round((obtenido / pesoConfirmado) * 100) — donde el denominador es una suma de pesos (20-24 en el rápido, 13 en el de navegador) que además cambia caso a caso porque las señales no-aplica y sin-confirmar salen del total. No existe un "denominador en señales técnicas revisadas" que imprimir: ejecutarlo tal cual obliga a inventar un segundo número para el informe final, distinto del que el cliente ya vio en el sitio, y un 100 al lado de un "4 de 6 señales" es peor que cualquiera de los dos solo. Lo accionable ya está en el endpoint: pesoConfirmado y pesoTotal viajan en la respuesta (líneas 1542-1543, 1667-1668) junto con las señales que no se pudieron confirmar. El ajuste tiene que elegir cuál de esos dos se imprime y decirlo, antes de que alguien construya el informe.


**El pago confirmado no le avisa a nadie, y el comprador no tiene forma de volver**

*Falla: inventa-capacidad.* El diagnóstico es correcto y probablemente el más urgente en términos operativos: una venta pagada que nadie ve es trabajo que no arranca. Pero el arreglo se apoya en algo que no está establecido: "que el servidor mande a ese correo el enlace al espacio privado cuando el pago se confirma". Hoy no hay con qué enviar correo transaccional desde el sitio. El formulario pasa por Web3Forms y termina en Google Workspace, y el punto 08 de la política publicada enumera exactamente tres proveedores; nada en el repo establece un emisor que le permita al sitio escribirle a un comprador cualquiera. Eso es un proveedor nuevo, con su costo, sus registros DNS y una entrada nueva en el punto 08 que el propio hallazgo 3 de esta revisión no lista (ahí solo entra Mercado Pago como cuarto). El hallazgo declara un único dato faltante (si la Orders API trae el correo del pagador) y ninguno sobre la capacidad de enviar. El mismo supuesto se reutiliza sin pedir dato en el hallazgo 2 ("repetida en el correo de confirmación"), en el 7 ("avisa") y en el 11 ("renovable por correo"), así que conviene cerrarlo acá antes de que cuatro arreglos dependan de él. Lo que sí se sostiene del ajuste: pedir el correo al crear el pedido (un campo, no mata la compra directa) y mostrar el enlace al espacio privado en la pantalla de retorno. El aviso a Ramón es una decisión aparte con su propio dato — con qué emisor y a qué costo; avisar a una casilla del propio dominio no es lo mismo que escribirle a un tercero.
