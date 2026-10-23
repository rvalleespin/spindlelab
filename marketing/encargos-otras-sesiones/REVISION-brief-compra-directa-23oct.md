# Revisión del brief de compra directa — Verifica y Cumple

**Fecha:** 23-oct-2026 · **Encargo:** revisión independiente de producto y conversión

**Método:** cuatro revisores con lentes distintas sobre el mismo brief, cada uno auditado por
un verificador adversario que cazaba propuestas que inventaran capacidades, precios o garantías,
que mataran la compra directa o que confundieran señal técnica con cumplimiento legal.
**46 hallazgos, 12 descartados por la auditoría, 34 en pie.** Acá están los 34.

Todo está fundamentado contra el código del chequeo y contra mediciones reales, no contra
supuestos. Los hechos que sirvieron de piso están al final.

> Esto es una segunda opinión. El alcance y el precio los decide Ramón.


---

## Lo primero, si no vas a leer todo

El brief está bien construido en lo que más suele salir mal: la cadena de pago, la disciplina de
no tocar el sitio antes de tener pago y acceso, y la negativa a decir «cumples». Eso no hay que
tocarlo.

Lo que no está listo es el paquete. **Hay cinco decisiones que van antes de escribir una línea
de checkout**, y ninguna es de programación:

1. **Qué corrige el kit, con nombre y apellido.** Hoy el alcance se define por referencia a sí
   mismo: «las correcciones dentro del alcance publicado». Ni el comprador ni Ramón pueden saber
   si un caso entra.
2. **Qué pasa con la plata si el caso no se puede entregar.** El brief cierra la puerta del cobro
   extra y no abre ninguna otra. No hay política de devolución.
3. **Cómo se filtra lo que el chequeo no ve.** Tres de las cuatro exclusiones del brief no son
   detectables. O se declaran antes del botón, o llegan al pago.
4. **Si el total que viaja a Mercado Pago es el neto o el bruto.** «+ IVA» no es un total, y
   Checkout Pro cobra un número.
5. **La política de privacidad, antes del botón.** Hoy dice que no guarda nada, en el sitio que
   vende cumplimiento de la ley de datos.

Y dos cosas que el brief da por resueltas y no lo están: **la facturación electrónica de la SpA
sigue pendiente** (no se puede recibir dinero sin poder emitir el documento), y **la compuerta
que el brief quiere construir ya existe** en el botón actual — hay que llevarla al pago, no
diseñarla de nuevo.

---

## Los hechos que fundamentan todo esto

Verificados el 23-oct-2026 leyendo `functions/api/*.js` y corriendo el chequeo sobre sitios reales.

**Lo que el chequeo detecta hoy**
- Chequeo rápido (lee el HTML, ~2s): 2 señales puntuables.
- Revisión con navegador (mira 25-28s, ~30s en total): 4 señales, peso 13.
- Los 12 puntos del Art. 14 ter, leyendo la política publicada. No puntúan.
- Estados: `ok` / `pendiente` / `sin-confirmar` / `no-aplica`. Los dos últimos salen del puntaje.

**Lo que el chequeo NO puede detectar**
- No clasifica plataforma ni CMS.
- No detecta tienda en línea con checkout.
- No sabe si la empresa tiene varios dominios: recibe uno y mira ese.
- No detecta integraciones a medida.
- **Sí** detecta cuántos rastreadores de su catálogo corren, y **sí** detecta que no pudo medir
  (`bloqueado`, `parcial` → puntaje `null`).

**Lo que la página ya hace con el botón, hoy**
- `pendientes > 0 ? "Quiero el kit" : "Pregúntanos"`. El comentario del código dice literal:
  **«Sin pendientes no se vende nada.»**
- Si no pudo medir, tampoco ofrece el kit: dice *«Esto no es un resultado a tu favor: es que no vimos.»*
- El botón actual lleva al formulario `#pedir`, no a un pago. **Hoy ese formulario es la única
  compuerta real**, porque Ramón lee la solicitud antes de comprometerse.

**Medición sobre 10 sitios chilenos reales** (banco de pruebas, 25 y 26-sep)
- 3 de 10 sacan 100: no hay nada que venderles.
- 3 de 10 no se pueden medir.
- 2 de 10 traen 7 y 5 rastreadores.
- 2 de 10 quedan como candidatos limpios al kit estándar.
- ⚠️ Muestra sesgada (hay bancos y un sitio de gobierno) y de 10 casos. Es **direccional, no una
  tasa** del mercado objetivo, que son pymes.

**La política de privacidad publicada** está en **versión 1.5** (verificado en vivo y en el repo)
y menciona **cero veces** pago, compra, cobro, tarjeta, factura, boleta, transacción o Mercado
Pago. Afirma hoy que *«no guarda nada»*.

---

## Alcance operable y exclusiones

**Veredicto del revisor:** No listo para construir el checkout. El recorrido y las reglas de confianza están bien, pero el paquete estándar todavía no es operable: su alcance se define por referencia a sí mismo, tres de sus cuatro exclusiones no son detectables, y la variable que más mueve el costo (la plataforma) se pregunta después de cobrar.

### 🔴 La compuerta «el sistema debe reconocer esos casos antes de cobrar» no se puede construir: 3 de las 4 exclusiones no son detectables

**Dónde:** Paquete estándar, párrafo de exclusiones (línea 49) y Decisión para cerrar, punto 2 (línea 58)

**Por qué importa:** De las cuatro exclusiones (tienda en línea con checkout, varios dominios, múltiples herramientas de seguimiento, integraciones a medida) el chequeo solo mide una: cuántos rastreadores de su catálogo corren. No clasifica plataforma ni detecta checkout, recibe un solo dominio y no ve integraciones a medida. Y el brief además reemplaza el botón actual, que lleva a un formulario de pedido (#pedir), por un pago directo: hoy ese formulario es la única compuerta real, porque Ramón lee la solicitud antes de comprometerse. Si se construye tal cual, o alguien programa un clasificador que no existe, o la compuerta nunca se dispara y la tienda con checkout y el caso de varios dominios llegan al pago con precio fijo, ya con plata cobrada, donde solo queda devolver o entregar a pérdida. El punto 2 de la lista de decisiones agrava la contradicción: pide cerrar «qué casos detectables se salen del paquete», y con eso acepta que los no detectables sí lleguen al botón, lo contrario de lo que dice la línea 49.

**Ajuste propuesto:** Partir la compuerta en dos y escribirlo así en el brief. (a) Automática, sobre lo que el chequeo sí mide: si la cuenta de rastreadores conocidos pasa un umbral, el resultado ofrece «Pregúntanos» en vez del kit. (b) Declarada, sobre lo que no mide: 3 preguntas de sí/no antes del botón de pago, donde el camino por defecto (todas «no») sigue derecho al pago sin fricción extra. Guardar las respuestas junto al pedido como la base declarada del precio fijo, para que un desajuste descubierto durante la entrega sea una revisión de alcance con aceptación expresa, regla que el brief ya tiene, y no un cobro sorpresa. Reescribir el punto 2 de la lista de decisiones como «qué casos se salen del paquete, y para cada uno si se detecta o se declara».

**Dato que falta:** El umbral de rastreadores. Hoy no existe: el banco de 10 sitios muestra 7 y 5 en bancos grandes, está sesgado y no dice nada de pymes. Hace falta cuánto demora llevar N rastreadores detrás del consentimiento en una entrega real medida.


### 🔴 Los dos casos en que no hay nada que vender no están en el brief, y la página ya los resuelve bien

**Dónde:** Recorrido principal, pasos 3 y 4 (líneas 19-20) y Criterios de aceptación (líneas 127-129)

**Por qué importa:** El recorrido da por hecho que después del resultado «aparece una oferta principal de implementación» y que el botón lleva al pago. El código de la página ya decide distinto: sin pendientes muestra «Pregúntanos» (el comentario dice «Sin pendientes no se vende nada»), y si no pudo medir tampoco ofrece el kit, muestra «Esto no es un resultado a tu favor: es que no vimos». En el banco de 10 sitios chilenos esos dos casos fueron 6: 3 sacaron 100 y 3 dieron puntaje null. La muestra está sesgada y es direccional, no una tasa del mercado objetivo, pero los dos casos son reales y frecuentes. Quien implemente el brief al pie de la letra reemplaza una regla correcta que ya está viva por un botón que cobraría por un sitio sin nada pendiente, o por uno que nadie pudo medir y que por lo tanto nadie puede cotizar.

**Ajuste propuesto:** Subir al brief la regla que ya existe, como criterio de aceptación del MVP, en dos líneas: «si el informe no deja ninguna señal en pendiente, el resultado no muestra el botón de pago»; «si el puntaje sale null (bloqueado o parcial), el resultado no muestra el botón de pago y dice que no se pudo medir». En los dos casos la acción es «Pregúntanos», que es el comportamiento actual. Y corregir el paso 3 del recorrido para que diga que la oferta aparece solo cuando hay pendientes medidos.


### 🟡 Las exclusiones están escritas en categorías que un dueño de pyme no puede contestar

**Dónde:** Paquete estándar, párrafo de exclusiones (línea 49)

**Por qué importa:** «Múltiples herramientas de seguimiento» e «integraciones a medida» son categorías internas. Si tres de las cuatro exclusiones pasan a declararlas el comprador, que es la única salida porque no son detectables, y el comprador es justamente la persona no técnica a la que apunta el producto, la compuerta falla abierta: contesta «no» porque no entiende la pregunta, no porque su caso esté limpio. El efecto es el de no tener compuerta, con el agravante de que ahora existe una declaración que apunta al cliente.

**Ajuste propuesto:** Reescribir cada exclusión como una pregunta sobre algo que el dueño ve o sabe: «¿Se puede comprar y pagar con tarjeta en tu sitio?» en vez de tienda con checkout; «¿Tienes más de una dirección web (otro dominio, un subdominio o una landing aparte)?» en vez de varios dominios; «¿Quién mantiene tu sitio hoy: tú, una agencia o desarrollador, o nadie?» en vez de integraciones a medida. La tercera además entrega el dato operativo que de verdad importa, que es si hay alguien que pueda dar el acceso.


### 🟡 Las señales en «sin-confirmar» quedan en el informe del comprador pero no se dice si entran en el precio fijo

**Dónde:** Paquete estándar, «Revisión de las señales que detectó el chequeo inicial» (línea 43) y Cómo se presenta el resultado (línea 89)

**Por qué importa:** El chequeo tiene cuatro estados por señal (ok, pendiente, sin-confirmar, no-aplica) y los dos últimos salen del puntaje. El brief habla de «las señales que detectó el chequeo inicial» y de mostrar «qué no pudo confirmar», pero nunca dice qué pasa con una señal «sin-confirmar» al fijar el precio. Es justo la señal que se convierte en trabajo al abrir el sitio real. Como el comprador la vio en su informe, va a entender que estaba incluida; Ramón la cotizó sin saber qué era. El brief tiene la regla correcta de no cobrar adicionales sin aceptación, así que el costo del desajuste cae entero en él.

**Ajuste propuesto:** Que el pedido congele por nombre la lista de señales en estado «pendiente» al momento de la compra, y que el texto junto al botón diga que esas son las que incluye el precio fijo. Dejar escrito que las señales en «sin-confirmar» o «no-aplica» no forman parte del alcance fijo y que, si al revisar el sitio resultan trabajo, entran como revisión de alcance con aceptación expresa.


### 🟡 El kit no tiene definición de «listo» que el comprador pueda verificar solo

**Dónde:** Paquete estándar, «Nueva verificación y entrega de un resumen antes/después» (línea 46) y Recorrido principal, paso 8 (línea 24)

**Por qué importa:** El brief promete volver a correr el chequeo y entregar un antes/después, pero no dice cuál es la condición de término. En un producto que se compra sin conversación previa, «listo» tiene que poder comprobarlo el comprador por su cuenta. Además la verificación final puede no poder medir: en el banco de 10 sitios, 3 dieron puntaje null, y un sitio medible antes puede quedar «parcial» después. Sin condición escrita, la entrega se cierra por conversación, que es exactamente lo que este producto quiere evitar, y en un caso discutido Ramón no tiene criterio para decir que terminó.

**Ajuste propuesto:** Escribir la condición de término en una línea en el alcance y repetirla en el informe final: «las señales listadas en tu pedido salen ok en el mismo chequeo público, y las que no, se informan con la razón». Agregar la regla del caso sin medición: si el chequeo posterior sale bloqueado o parcial, se entrega la evidencia de los cambios aplicados y se dice que la verificación automática no se pudo completar, sin presentarlo como resultado a favor.


### 🟡 «Pendientes > 0» no distingue un enlace que falta de rehacer cómo carga el sitio sus etiquetas, y el precio es el mismo

**Dónde:** Oferta y precio (línea 32) y Paquete estándar, precio de prueba (línea 51)

**Por qué importa:** La compuerta que ya existe es binaria: con al menos un pendiente se ofrece el kit. Pero las 6 señales puntuables no cuestan lo mismo de arreglar: llevar a ok «Enlace a tu política de privacidad» es publicar un enlace, y llevar a ok «Rastreadores que parten solos» y «Cookies escritas sin permiso» es cambiar cómo carga el sitio sus etiquetas. El paquete cobra lo mismo por el sitio con un solo pendiente liviano que por el que trae los cuatro de la revisión con navegador. El primer comprador podría ser el caso liviano, que es el peor estreno posible para un producto con demanda orgánica casi cero: queda con la sensación de haber pagado de más y no hay cola de compradores que compense ese estreno.

**Ajuste propuesto:** Definir el piso del paquete estándar en la misma unidad que produce el chequeo: por ejemplo, que el kit se ofrezca cuando hay al menos un pendiente de los relacionados con consentimiento, y que el caso «solo falta el enlace a la política» vaya a «Pregúntanos» hasta que exista una oferta más chica definida. Dejar el piso escrito en el brief junto a la regla de pendientes, no solo en el código.

**Dato que falta:** Cuánto toma cada corrección en una entrega real medida. Sin eso no se puede decidir el piso ni saber si el caso liviano deja margen o se regala.


### ⚪ El pedido se asocia a un «dominio» y no a la URL que de verdad se midió

**Dónde:** Paquete estándar, «Un dominio y el sitio principal asociado a ese dominio» (línea 42) y Recorrido principal, paso 3 (línea 19)

**Por qué importa:** El chequeo recibe un dominio y mira ese. «El sitio principal asociado a ese dominio» no dice qué pasa con un subdominio, con la versión con y sin www, o con una landing hecha en otra herramienta que también escribe cookies. El comprador entiende «mi sitio» como todo lo que tiene en internet. Después del pago, con precio fijo, la diferencia entre lo medido y lo que él entendía es trabajo no cotizado o una conversación incómoda.

**Ajuste propuesto:** Guardar en el pedido la URL exacta que se midió y mostrarla junto al precio antes del pago, con una línea de que el alcance es ese sitio. La pregunta sobre otras direcciones web del ajuste de exclusiones cubre el resto.


**Lo que está bien y conviene no tocar:**

- La separación entre señales técnicas y cumplimiento legal, con las frases prohibidas escritas («tu empresa no cumple», «sitio certificado», «ahora cumples») y la plantilla de política que va al abogado del cliente. Es lo que hace vendible el producto sin exponerse. No suavizarla, y conviene repetirla en el texto del botón y en el informe final.
- «No se cobra un adicional después del pago sin que el cliente lo acepte», repetido tres veces (líneas 30, 49 y 62). Es lo que permite publicar un precio fijo sin que el comprador tenga miedo. Casi todos los ajustes de esta revisión existen para que esa regla no le salga cara a Ramón; la regla misma se queda tal cual.
- La unidad del paquete es un dominio y un sitio. Coincide con lo que el chequeo realmente recibe y mide, así que el alcance comercial y el instrumento hablan de la misma cosa.
- El criterio de aceptación de que la entrega separe resumen, evidencia técnica, pendientes y límites de la verificación. Es el único lugar donde el brief admite que el instrumento tiene límites, y es lo que sostiene la honestidad del informe cuando el chequeo no alcanza a medir todo.
- No volver a pedir el dominio ni el informe. Quita fricción al comprador no técnico y es construible, porque el chequeo ya tiene esos datos.
- Cerrar las cuatro decisiones antes de programar el checkout, y decir explícitamente que los $149.000 + IVA son hipótesis y no precio aprobado. Es el orden correcto: lo que falta no es código, es alcance medido.
- Nunca pedir contraseñas, acceso por invitación temporal con permisos mínimos, y no tocar el sitio antes de tener pago, alcance y acceso confirmados. Además de ser lo correcto con los datos, da un hito verificable desde el cual empieza a correr el trabajo.
- Una sola oferta, total visible antes de pagar y sin carrito. Para un comprador no técnico y un operador solo, hacerlo elegir entre opciones técnicas sería la fricción que mata la compra directa.

---

## Friccion para una persona no tecnica

**Veredicto del revisor:** No listo para construir el checkout: el cobro y las reglas de honestidad están bien pensados, pero el tramo que el cliente recorre después de pagar (acceso, fechas, quién empuja, qué gana) no está escrito, y cuatro de los problemas graves caen justo después de que la plata ya salió.

### 🔴 El muro de acceso queda después del pago y está escrito en un idioma que el comprador no puede ejecutar

**Dónde:** Recorrido principal, paso 6 ("se solicita una invitación temporal con permisos acotados o un medio seguro acordado") y Paquete estándar, último punto ("El cliente entrega acceso temporal con permisos mínimos; el trabajo comienza una vez recibido")

**Por qué importa:** "Invitación temporal con permisos acotados" solo lo puede ejecutar alguien que administra su propio sitio. El caso típico de la pyme es que el sitio lo hizo un tercero, y el protocolo real de entrega exige acceso al hosting, repo o CMS, no un snippet autoinstalable. Si se construye así, el pedido queda cobrado y detenido en el estado 2 ("Falta el acceso temporal al sitio"), y la única persona que puede desatascarlo es la que no administra el sitio. El brief no dice qué pasa si ese acceso nunca llega, así que el camino por defecto es una disputa en Mercado Pago, que para un operador solo es peor que haber conversado antes.

**Ajuste propuesto:** Mover la compuerta a ANTES del botón de pago, como una pregunta de una línea con tres opciones, no como una llamada: (a) "Yo entro a administrar mi sitio" va a checkout normal; (b) "Lo administra alguien más (quien me lo hizo, una agencia)" va a checkout normal Y el pedido incluye un correo ya redactado PARA esa persona, con el permiso exacto que se pide y qué se va a hacer, listo para reenviar, de modo que el comprador no tiene que explicar nada técnico; (c) "No sé quién puede entrar" no llega al botón de pago y cae en el formulario #pedir que ya existe, marcado. Y reemplazar en el brief la frase "invitación temporal con permisos acotados" por las tres cosas concretas que se aceptan, nombradas como las ve el cliente: usuario temporal en el panel de su sitio, invitación al repo, o acceso al panel del hosting.

**Dato que falta:** Ninguno para escribir la compuerta. Para dimensionar cuántos caen en la opción (c), habría que preguntarlo en los correos de outbound que ya salen, que hoy no lo preguntan.


### 🔴 Para decidir, el comprador tiene que sostener él mismo la diferencia entre señal técnica y cumplir la ley

**Dónde:** "Cómo se presenta el resultado", párrafo de prohibiciones ("Evitar las expresiones 'tu empresa no cumple', 'sitio certificado' y 'ahora cumples'") y Oferta y precio ("No incluye asesoría legal ni certifica cumplimiento")

**Por qué importa:** El producto se niega, correctamente, a decir "cumples". Pero entonces la decisión de compra exige que el comprador sostenga una distinción abstracta: "esto no me pone al día con la ley, y aun así me conviene". El brief nunca convierte eso en una frase decidible; lo más cerca es una línea enterrada después del precio. Construido así, pasa una de dos cosas, y las dos son malas: o asume que el kit resuelve la ley y se siente engañado al recibir la entrega con el descargo, o sospecha que no resuelve nada y no compra. Que el comprador tenga que entender un concepto para poder decidir es un defecto de diseño, no un problema de redacción.

**Ajuste propuesto:** Un bloque fijo de dos columnas del mismo tamaño, antes del precio, titulado por responsable y no por concepto: "Esto lo dejamos hecho nosotros" (las N correcciones con su nombre, tomadas del resultado real) y "Esto queda para tu abogado" (el texto final de tu política y la evaluación de tu caso). Repetir la segunda columna en la última pantalla antes de pagar, como lo que explícitamente NO va incluido. Partir la decisión por responsable es algo que una persona no técnica sí puede decidir; partirla por "señal" contra "cumplimiento" no.

**Dato que falta:** Ninguno. Las dos columnas se llenan con el alcance ya publicado y con las señales que el chequeo ya devuelve con su nombre.


### 🔴 El limbo entre el pago y la entrega del acceso no tiene dueño, ni fecha, ni salida

**Dónde:** Recorrido principal pasos 5 a 7, "Espacio privado del cliente" (estados 1 y 2) y Criterios de aceptación ("El cliente puede entender el estado del trabajo y qué acción le corresponde")

**Por qué importa:** La pantalla le dice al cliente qué le toca a él, en voz pasiva, y nadie queda nombrado como el que empuja. El brief no tiene ni una fecha en todo el tramo de entrega. Un operador solo con horas limitadas no va a revisar pedidos detenidos salvo que algo se lo recuerde, así que el estado 2 puede quedar indefinido con la plata ya cobrada. Además, la razón principal por la que alguien no compra sin conversar es no saber cuándo va a estar hecho, y el brief no le da ninguna fecha antes de pagar.

**Ajuste propuesto:** Tres cosas concretas: (1) mostrar antes de pagar las dos fechas que de verdad dependen del cliente, redactadas como condición y no como promesa ("empezamos dentro de X días hábiles desde que recibimos el acceso, y entregamos Y días hábiles después"); (2) nombrar el empuje en el brief como paso operativo de Ramón, no "el equipo": recordatorio manual al día 2 y al día 7 sobre un pedido detenido en el estado 2, porque hoy el sitio no tiene forma de mandar correos programados y suponerla sería inventar capacidad; (3) escribir la política del pedido que nunca arrancó (plazo tras el cual se devuelve o se deja en crédito), para que no la defina una disputa.

**Dato que falta:** El plazo real de entrega medido en un sitio de un tercero (el único caso real, spindlelab.cl el 21-sep, fue el propio repo de Ramón y no sirve de referencia), y la ventana de reembolso y contracargo que aplica a la cuenta de Mercado Pago de la agencia.


### 🔴 "Plantilla basada en la información que entregue el cliente" contradice el intake mínimo y, preguntada con los nombres de la ley, es un examen legal

**Dónde:** Paquete estándar, cuarto punto ("plantilla de política de privacidad basada en la información que entregue el cliente") contra el paso 5 ("Solicita solo plataforma, contacto y datos mínimos para iniciar")

**Por qué importa:** Las dos frases no pueden ser verdad a la vez: o el intake es mínimo y la plantilla no se puede llenar, o alcanza para llenarla y no es mínimo. Y la plantilla se arma sobre los 12 puntos del Art. 14 ter, varios de los cuales un dueño de pyme no puede contestar si se le preguntan con esos nombres (plazo de conservación, transferencias internacionales, decisiones automatizadas, medidas de seguridad). Si el intake se construye como un formulario con esos campos, el cliente lo abandona y el pedido se detiene por segunda vez, ahora en el estado 3.

**Ajuste propuesto:** Partir el intake en dos. Al momento del pedido se piden solo los datos para arrancar y para identificar al responsable: razón social, RUT de la empresa, dirección, correo de contacto para temas de datos, y quién administra el sitio. El resto NO se le pregunta: la plantilla se entrega como borrador ya redactado, derivado de lo que el chequeo midió, con entre 5 y 8 huecos marcados como preguntas en castellano de todos los días y con una respuesta sugerida ("¿Guardas los correos de quien te escribe por el formulario? ¿Por cuánto tiempo?" en vez de "plazo de conservación"). El cliente recibe un documento, no un cuestionario, y lo que queda abierto va a su abogado.

**Dato que falta:** La lista cerrada de campos que la plantilla necesita del cliente, que hoy no está escrita en ninguna parte. Sale de la plantilla real que ya se usó, quitando lo que no aplica a un tercero.


### 🟡 Se le pregunta al cliente la plataforma de su sitio, que es justo lo que no sabe y lo que el chequeo no puede prellenar

**Dónde:** Recorrido principal, paso 5 ("Solicita solo plataforma, contacto y datos mínimos")

**Por qué importa:** El chequeo no clasifica plataforma ni CMS, así que ese campo no se puede prellenar ni verificar contra nada. Muchos dueños de pyme no saben si su sitio es WordPress, un constructor o código a medida. La respuesta que entra va a ser "no sé" o va a ser equivocada, y de ella depende cómo se instala el gestor de consentimiento. El resultado es que la plataforma real se descubre recién estando adentro, que es exactamente de donde salen las sorpresas de "el valor sube" que el brief quiere eliminar.

**Ajuste propuesto:** Sacar el campo "plataforma" del formulario del cliente y reemplazarlo por dos preguntas que sí puede contestar: "¿Cuál es la dirección del panel donde entras a administrar tu sitio?" (opcional) y "Si no entras tú, ¿cuál es el correo de quien te lo hizo?". Dejar escrito en el brief que la plataforma la identifica el operador leyendo el sitio, no la declara el cliente.


### 🟡 El brief no dice cuál de los dos chequeos es el antes y el después, y los dos no son comparables

**Dónde:** Recorrido principal, paso 8 ("se vuelve a correr el chequeo y se entrega un informe antes/después") y "Qué entra en el primer MVP" ("Informe final antes/después")

**Por qué importa:** Hoy existen dos chequeos distintos: el rápido, que puntúa 2 señales con peso 20 a 24 y no acredita un gestor hecho a mano, y la revisión con navegador, que mira 4 señales con peso 13 y mide el comportamiento real. Si el "antes" se toma con uno y el "después" con el otro, los números no son comparables y el informe se lee como manipulado. Y si el antes y el después se toman con el rápido en un sitio donde el gestor se construyó a medida, el puntaje puede moverse poco pese a que el arreglo funciona: una entrega correcta parece una entrega fallida, y eso es la prueba completa de lo que el cliente pagó.

**Ajuste propuesto:** Escribir en el brief que el antes y el después son los dos chequeos corridos dos veces, siempre el mismo par, y que la prueba principal del informe es una tabla señal por señal con su nombre (señal, antes, después), con el puntaje como número secundario. Agregar al informe el par de capturas del sitio al entrar, con el aviso apareciendo, porque es lo único que el cliente puede verificar con sus propios ojos. Y cuando la plataforma del cliente lo permita, usar un gestor que el detector reconozca, para que la prueba y el instrumento no se contradigan.

**Dato que falta:** Ninguno nuevo, pero la elección del gestor de consentimiento es la decisión 1 que el propio brief deja abierta, y de ella depende cómo se ve este informe.


### 🟡 El resultado dice "+ IVA" y Mercado Pago va a cobrar el bruto, justo en el paso donde más se abandona

**Dónde:** "Oferta y precio" y "Camino de cobro", punto 1 ("El resultado muestra el precio total del paquete"), contra el copy ya publicado ("Desde $149.000 + IVA")

**Por qué importa:** El comprador no técnico lee $149.000, pulsa el botón y en el checkout hospedado ve un número mayor (el bruto del precio que se confirme, 149.000 por 1,19 igual a 177.310 si se mantiene el precio de prueba). En la pantalla de pago, un monto distinto al que venía leyendo se interpreta como cobro sorpresa, y es el punto exacto donde se cierra la pestaña. El brief ya pide "impuestos y condiciones claramente indicados", pero no dice cuál de los dos números es el grande.

**Ajuste propuesto:** Desde el resultado en adelante, el número grande es el que Mercado Pago va a cobrar, con el neto como línea secundaria: monto bruto como protagonista, y debajo "IVA incluido · equivale a X + IVA". Mismo criterio en la tarjeta del kit y en la pantalla de confirmación previa al pago.

**Dato que falta:** El precio final que se confirme. El bruto es aritmética sobre ese número, no un precio nuevo.


### ⚪ La propia regla de privacidad del brief, leída al pie de la letra, bloquea la plantilla que el kit promete

**Dónde:** "Datos y confianza", tercer punto ("No pedir contraseñas, RUT personal ni datos de visitantes del sitio para iniciar la prestación")

**Por qué importa:** La regla dice RUT personal, pero quien la implemente puede leerla como "no pedir RUT". El responsable que va en la política de privacidad es la empresa del cliente, con su razón social y su RUT, que son datos públicos y obligatorios del documento. Si el intake se construye sin ese campo, la plantilla sale sin responsable, que es el error grave ya identificado en el protocolo de entrega.

**Ajuste propuesto:** Reescribir el punto como "no se pide RUT de personas naturales ni datos de los visitantes del sitio; sí se pide la razón social y el RUT de la empresa, porque son el responsable que la política tiene que declarar".


**Lo que está bien y conviene no tocar:**

- La compuerta de venta que ya está en el código: con cero señales pendientes el botón es "Pregúntanos" y no el kit ("Sin pendientes no se vende nada"). En el banco de 10 sitios, 3 sacaron 100. La mayoría de los productos de este tipo les venden igual. No tocar.
- El caso en que no se pudo medir tampoco ofrece el kit, y lo dice sin maquillaje: "Esto no es un resultado a tu favor: es que no vimos". Con 3 de 10 sitios sin medir, esta decisión es la que impide cobrar por arreglar algo que nadie observó.
- El chequeo gratis sin correo ni registro. Es la condición material de la compra directa: sin él, el recorrido empieza en un formulario y vuelve a ser una conversación.
- Nunca pedir credenciales en un formulario ni por correo. Es correcto y además es el único detalle del paso 6 que no hay que rediseñar.
- La confirmación del pago en servidor (webhook con firma validada, consulta a la API, idempotencia, y la vuelta del navegador no marca nada como pagado). Protege al cliente tanto como a la agencia y resuelve bien la parte más fácil de equivocar.
- El informe en dos niveles, resumen para el cliente y anexo técnico descargable. Es la decisión correcta justamente porque el comprador no es quien va a leer la parte técnica: la lee el tercero que administra el sitio.
- El vocabulario que ya está en producción y que el brief debería heredar en vez de escribir "señales": "el aviso de cookies", "la casilla de tu formulario", "quién más recibe datos de tus visitantes", y cada señal con su arreglo nombrado.
- Negarse a decir "cumples", "certificado" o "ahora cumples". Es lo que protege al cliente de una multa y a SpindleLab de una demanda, y hay que conservarlo incluso sabiendo que es lo que vuelve más difícil explicar la oferta. La salida no es relajar la regla, es dividir el trabajo por responsable.
- No cobrar nada adicional después del pago sin aceptación expresa, y no tocar el sitio antes de tener pago, alcance y acceso confirmados. Son las dos reglas que hacen que una compra sin conversación previa no termine en conflicto.
- Dejar la suscripción trimestral fuera del primer MVP. Un cobro recurrente con mínimo de seis meses vendido sin conversación previa es un problema distinto y más grande; separarlo es correcto.

---

## Precio, costos y margen

**Veredicto del revisor:** No listo para construir el checkout, pero sí listo para cerrar el precio en días: falta medir una entrega (lo que se puede hacer esta semana sin comprador) y contar tres costos que hoy salen del margen sin estar anotados en ninguna parte: el 19% de IVA, la facturación de la SpA que aún no está activa, y las horas de navegador que el chequeo gratis y la verificación final se reparten.

### 🔴 El monto que viaja a Mercado Pago no está definido: "+ IVA" no es un total

**Dónde:** Sección «Oferta y precio» y el criterio de aceptación «El precio total y el alcance aparecen antes de aceptar el pago»

**Por qué importa:** Checkout Pro cobra UN número bruto. El brief repite «precio total» sin decidir nunca si ese total es el neto publicado o el neto más 19%. Si el pedido se crea con el neto, el 19% sale del margen en cada venta y no se recupera después, porque el cliente ya pagó un total que vio y aceptó. Si se crea con el bruto sin desglosar, el comprador que venía del titular «Desde $149.000 + IVA» ve en el checkout un número 19% más alto y abandona ahí, donde ya no hay forma de explicarle nada.

**Ajuste propuesto:** Fijar en el servidor el monto bruto como el único valor que viaja a la orden, y mostrar tres líneas en la tarjeta de la oferta antes del botón: servicio (neto), IVA 19%, total a pagar. El criterio de aceptación pasa a ser verificable así: «el número que muestra la página es idéntico al que muestra el checkout de Mercado Pago». Y en la página del resultado el monto deja de decir «+ IVA» y dice el total, con el neto en la línea de abajo.


### 🔴 La decisión 3 nombra dos partidas y la entrega tiene al menos catorce

**Dónde:** Decisión 3: «Cuántas horas de trabajo y costos directos requiere una entrega típica, incluyendo la comisión del medio de pago»

**Por qué importa:** Con dos partidas el cálculo va a dar bajo, y el precio se va a fijar sobre ese número bajo. Las que faltan no son residuales: la gestión del acceso y la redacción de la política son las dos que más tiempo se llevan cuando el comprador es una empresa pequeña sin equipo técnico, y son justamente las que el brief trata como trámite.

**Ajuste propuesto:** Medir con cronómetro en la próxima entrega, una fila por entrega en una planilla, con estas partidas separadas. Horas: (1) alta del pedido y volver a correr el chequeo, porque el del pedido puede tener días; (2) pedir el acceso, esperarlo, y el ida y vuelta cuando llega mal o insuficiente, que es la partida que más se subestima; (3) reconocer el sitio: plataforma, dónde está inyectado cada rastreador (etiquetado, plugin o código), cuántas plantillas hay que tocar; (4) instalar y configurar el gestor, con textos en es-CL y bloqueo previo; (5) cada corrección técnica, contada por señal, no en bloque; (6) el cuestionario al cliente y la redacción de los 12 puntos del Art. 14 ter, que el brief llama «plantilla» y en realidad es redacción con datos que hay que pedir y esperar; (7) la verificación final y sus repeticiones cuando no queda verde en la primera pasada; (8) el informe antes/después y el anexo técnico; (9) la ventana de soporte posterior, hoy abierta sin límite escrito porque el paso 8 dice que el cliente «confirma la recepción» y no dice hasta cuándo puede reclamar; (10) la revisión de Ramón antes de que el informe salga, que la skill de entrega exige como paso obligatorio. Costos directos: (11) comisión de Mercado Pago más el IVA de la comisión; (12) revisiones de Browser Rendering; (13) plan del gestor de consentimiento, si aplica; (14) el costo de las sesiones de agente usadas en la entrega. Y una partida de reparto que nunca se anota: las horas de los pedidos que se devuelven sin entregar, que hay que repartir entre los que sí se entregan.

**Dato que falta:** Ninguno para empezar a medir. El dato que falta es la medición misma, y hoy no existe en ninguna parte del repo.


### 🔴 La facturación de la SpA no está activa y el intake no pide los datos para emitir el documento

**Dónde:** «Camino de cobro con Mercado Pago» («la boleta sigue el proceso tributario que la agencia ya utiliza») y paso 5 del recorrido («solicita solo plataforma, contacto y datos mínimos»)

**Por qué importa:** El kit vendido ahora es contrato nuevo, así que lo cobra SpindleLab SpA, y la activación de la facturación electrónica de la SpA está pendiente. Abrir el checkout antes significa recibir dinero sin poder emitir el documento. Y aun estando activa: una empresa pequeña que compra cumplimiento lo quiere con factura para usar el crédito fiscal, y la factura necesita RUT de empresa, razón social, giro y dirección. Esos campos no están en el intake y el brief evita pedir RUT, así que cada pedido pagado va a obligar a abrir un correo pidiendo datos tributarios, que es exactamente la conversación que la compra directa venía a eliminar.

**Ajuste propuesto:** (a) Poner la activación de la facturación electrónica de la SpA como bloqueador del paso 2 de la secuencia de trabajo, antes de crear la aplicación de Mercado Pago. (b) Agregar al intake postpago un bloque de cuatro campos con su motivo escrito: «para emitir tu factura: RUT de la empresa, razón social, giro, dirección». Eso no choca con la regla del brief, que prohíbe RUT personal y contraseñas, no datos tributarios de la empresa compradora. (c) Escribir una línea en las condiciones sobre boleta y factura: quién recibe cuál y que el monto a pagar es el mismo en los dos casos.

**Dato que falta:** El estado real de la facturación electrónica de la SpA en el SII (lo está viendo Ramón en otra sesión), y si la cuenta de Mercado Pago está a nombre de la SpA con su RUT o a nombre de persona natural.


### 🟡 «La comisión del medio de pago» son varias comisiones, y cuál aplica depende de decisiones que nadie tomó

**Dónde:** Decisión 3, el paréntesis «incluyendo la comisión del medio de pago»

**Por qué importa:** La tarifa de Mercado Pago cambia según el plazo de liberación del dinero y según el medio con que pague el cliente, se calcula sobre el bruto y no sobre el neto, y la comisión misma lleva IVA. Si además quedan activas las cuotas sin interés, ese costo lo paga el vendedor y puede ser varias veces la comisión base. Un porcentaje genérico en la planilla puede quedar corto por un factor grande, y es un error que se repite idéntico en cada venta.

**Ajuste propuesto:** Bajar la hoja de tarifas de la cuenta y escribir cuatro líneas separadas en el costo unitario: comisión del plazo de liberación elegido, IVA de esa comisión, costo de cuotas si se habilitan, y costo esperado de contracargos. Y tomar dos decisiones explícitas antes de abrir el checkout: qué plazo de liberación se usa, y si las cuotas sin interés van encendidas. Apagadas es lo defendible mientras el margen no esté medido.

**Dato que falta:** La hoja de tarifas de la cuenta de Mercado Pago de SpindleLab: comisión por plazo de liberación, costo de cuotas y política de contracargos. Está en el panel de la cuenta.


### 🟡 El gestor de consentimiento queda instalado en el sitio del cliente sin que nadie haya definido quién paga su plan

**Dónde:** Alcance del kit («configuración del gestor de consentimiento») y decisión 1, que lo trata como decisión técnica

**Por qué importa:** Es una decisión de costo disfrazada de decisión técnica, y el brief no la menciona como costo en ninguna parte. Varios de los gestores que el chequeo reconoce tienen capa gratuita con tope de visitas o de dominios. Si el kit instala uno a nombre de Ramón, Ramón arrastra un costo mensual por cada cliente que pagó una sola vez. Si lo instala a nombre del cliente y el cliente supera el tope meses después, el banner deja de cargar, el sitio vuelve a lo que estaba, y el informe antes/después firmado por Ramón queda diciendo lo contrario de lo que el sitio hace. Un pago único no puede dejar abierta una obligación sin ingreso asociado.

**Ajuste propuesto:** (a) Elegir el gestor y nombrarlo en la página del checkout, dentro del alcance incluido. (b) Escribir en las condiciones que la cuenta del gestor se crea a nombre del cliente y es suya, y que si su tráfico supera la capa gratuita, el plan lo paga él. (c) Poner el tope de la capa gratuita en esa misma línea, en visitas al mes, para que el comprador vea antes de pagar si le aplica. (d) Confirmar en el código del chequeo si un gestor hecho a mano puntúa hoy: el código ya puntúa por comportamiento y no por marca, pero la skill de entrega todavía documenta la limitación antigua de la lista fija de proveedores, y de cuál de las dos sea verdad depende si existe una opción sin costo mensual.

**Dato que falta:** Topes de la capa gratuita y precio del plan pago de los dos o tres gestores candidatos de la lista que el chequeo reconoce, y si soportan textos en es-CL y bloqueo previo en WordPress, Wix, Squarespace y Shopify.


### 🟡 No hay techo de entregas: el checkout está abierto 24/7 y el que entrega es una persona con horas limitadas

**Dónde:** «Qué entra en el primer MVP» y el recorrido completo, que no mencionan capacidad ni plazo de entrega

**Por qué importa:** Nada en el flujo limita cuántos pedidos se toman en una semana. Si se venden cinco en la misma semana quedan cinco entregas comprometidas que no caben en las horas disponibles, y el valor del kit está amarrado al 1-dic, así que atrasarse no es neutro: es incumplir lo único que hacía urgente la compra. Encima el checkout no promete ningún plazo, así que no hay nada medible que cumplir, lo que a ojos del comprador es peor que un plazo ajustado.

**Ajuste propuesto:** (a) El endpoint que crea el pedido lee un cupo semanal, un número que Ramón fija a mano; cuando está lleno, el botón cambia a lista de espera que toma el correo y dice la próxima ventana. No es «agenda una llamada» y no rompe la compra directa del caso típico. (b) Escribir un plazo de entrega en días hábiles contados desde que llega el acceso, no desde el pago, y mostrarlo antes del botón; así el reloj no corre mientras se espera algo que depende del cliente.

**Dato que falta:** Cuántas horas por semana reserva Ramón para entregas del kit. Con eso y las horas por entrega del hallazgo de medición, el cupo es una división.


### 🟡 El nombre que el comprador verá en su tarjeta no es el nombre con el que compró

**Dónde:** «El pago corresponde al kit de implementación y llega a la cuenta de Mercado Pago de la agencia»

**Por qué importa:** La página se llama Verifica y Cumple y la cuenta que cobra es de SpindleLab SpA. En el estado de cuenta aparece el nombre del comercio. Un cargo que el comprador no reconoce es la causa más común de contracargo, y un contracargo en un servicio sin entrega física se pierde casi siempre, con la comisión incluida. Es plata que se va de un pedido que sí se entregó.

**Ajuste propuesto:** Escribir en la tarjeta de la oferta, antes del botón, una línea que diga quién cobra y qué nombre va a aparecer en el estado de cuenta, con el RUT de la SpA. Y revisar en el panel de Mercado Pago el nombre de fantasía que viaja al estado de cuenta, para que coincida con lo que dice la página.

**Dato que falta:** El nombre de comercio configurado hoy en la cuenta de Mercado Pago. Se ve en el panel de la cuenta.


### 🟡 La oferta publicada ya compromete seis meses de un recurrente que el MVP no puede cobrar ni tiene definido

**Dónde:** «La oferta pública actual comunica (…) la revisión trimestral desde $39.000 + IVA al mes, con mínimo de seis meses» y «La revisión periódica se ofrece como continuidad después de la entrega»

**Por qué importa:** El recurrente se muestra hoy en la portada en una tarjeta gemela a la del kit, con el mismo «desde». Mientras el MVP no pueda cobrarlo es un compromiso anunciado que nadie puede aceptar, y además está escrito de una forma que el comprador va a leer mal: «revisión trimestral» cobrada «al mes» se lee como pagar todos los meses por un trabajo que ocurre cada tres. Un comprador que lo lee así calcula el total de seis meses y decide que es caro, antes de llegar a evaluar el kit.

**Ajuste propuesto:** Para el MVP, o se saca el recurrente de la página del resultado y queda solo en la portada, o se escribe en una línea qué es: cuota mensual, revisión cada tres meses, compromiso de seis meses, y el total de esos seis meses en pesos. Ese total hay que calcularlo sobre el precio final y no sobre el «desde», así que la línea se escribe después de cerrar el precio del recurrente, no antes.

**Dato que falta:** Qué incluye exactamente una revisión trimestral y cuántas horas toma, que no está definido en ninguna parte del repo, y el precio final del recurrente.


### ⚪ «Precio de prueba» sin regla de precio congelado al comprar

**Dónde:** «Precio de prueba: usar los actuales $149.000 + IVA solo como hipótesis para evaluar el paquete»

**Por qué importa:** Si la medición muestra que el alcance toma el doble y el precio sube, no hay nada escrito sobre los pedidos ya pagados al precio de prueba. Un cliente a mitad de entrega que se enteró del cambio va a preguntar, y la respuesta tiene que estar escrita antes, no improvisada en el momento.

**Ajuste propuesto:** Una línea en las condiciones del checkout: el precio queda fijo al momento del pago para el alcance estándar de ese pedido, y un cambio posterior de precio no afecta pedidos ya pagados. Y guardar en el registro del pedido el precio y la versión del alcance vigentes al cobrar, no solo el monto.


**Lo que está bien y conviene no tocar:**

- Negarse a publicar los $149.000 como total fijo antes de medir la entrega. Tratar el precio publicado como hipótesis y no como aprobado es el orden correcto, y es la línea que mantiene honesto al resto del brief. No ablandarla por la fecha del 1-dic.
- Fijar precio e identificador del pedido en el servidor y no aceptarlos desde el navegador, con referencia externa propia y clave de idempotencia. Son las dos formas directas de perder plata en un checkout (monto manipulado y orden duplicada) y están cerradas antes de existir.
- Confirmar el pago solo desde el servidor, con firma validada más consulta a la API, y que la vuelta del navegador no marque nada como pagado. Evita el error más caro de un flujo de compra directa, que es entregar trabajo contra un pago que nunca se confirmó.
- «No se cobra un adicional después del pago sin que el cliente lo acepte.» La regla es correcta y no hay que debilitarla para proteger margen; lo que falta es la rama de devolución que la hace operable, no un permiso para cobrar sorpresas.
- Una sola oferta y un solo precio, sin planes ni opciones técnicas. Para un comprador que no entiende gestores de consentimiento, elegir entre alternativas técnicas es donde se muere la venta. Y tiene un beneficio de costo que el brief no nombra: con una sola configuración, hay una sola cosa que medir.
- Dejar la suscripción fuera del MVP y habilitar solo pago único. El recurrente arrastra alcance indefinido y un compromiso de seis meses; cobrarlo antes de saber cuánto cuesta una revisión trimestral sería amarrar un margen que nadie midió.
- No certificar cumplimiento y mantener separadas las señales técnicas del cumplimiento legal, con la política como plantilla para el abogado del cliente. Además de ser correcto, es protección de margen: prometer cumplimiento crea una exposición que ningún precio de este orden puede cubrir.
- Mantener el chequeo gratis sin correo ni cuenta, y vincular dominio e informe a una compra solo cuando la persona inicia el pago. Es lo que hace creíble el resto y no cuesta nada conservarlo.

---

## Pago, datos y el limite legal

**Veredicto del revisor:** No listo para construir el checkout: la cadena de pago está bien pensada, pero faltan tres decisiones previas completas (una compuerta de alcance declarada, porque la automática no existe; una política de devolución; y la actualización de la política de privacidad, que ella misma promete hacer antes de encender cualquier cosa nueva).

### 🔴 La compuerta de alcance que el brief da por existente no existe

**Dónde:** §49 ("El sistema debe reconocer esos casos antes de cobrar") y el paso 5 del recorrido, que pide la plataforma después del pago

**Por qué importa:** Las tres exclusiones del paquete (tienda con checkout, varios dominios, integraciones a medida) son justo las tres cosas que el chequeo no puede detectar: recibe un dominio, no clasifica plataforma ni CMS, no tiene clasificador de tienda y no detecta integraciones. El único filtro real queda en el paso 5, que pregunta la plataforma cuando el dinero ya entró. Un sitio en Shopify, uno con tres dominios o uno en una plataforma donde no se puede insertar un script pasan el botón de pago sin que nada los frene, y la conversación de alcance ocurre con el pago hecho.

**Ajuste propuesto:** Convertir la detección en declaración, antes del botón: tres preguntas en la misma pantalla del resultado, "¿tu sitio vende en línea con carro de compra?", "¿quieres que cubramos más de un dominio?" y "¿en qué está hecho tu sitio?" con lista cerrada más "no sé". Cualquier respuesta fuera de la lista entregable va al formulario #pedir que ya existe, rotulado como revisión de alcance, no al pago. Tres toques no matan la compra directa del caso típico (un sitio informativo de un dominio) y el que no califica igual deja su pedido.

**Dato que falta:** La lista de plataformas en las que el kit se puede instalar hoy y en las que no. No está escrita en ninguna parte del repo, y sin ella no se puede redactar la lista cerrada ni decidir qué hace la opción "no sé".


### 🔴 Nadie decidió qué pasa con la plata si el caso no se puede entregar

**Dónde:** §30, §49 y §62 prohíben cobrar un adicional después de la compra; el estado 3 del espacio privado es "Revisión del alcance". No hay política de devolución en ninguna parte del brief.

**Por qué importa:** El brief cierra la puerta del cobro extra y no abre ninguna otra. Si en la revisión de alcance aparece que el caso estaba fuera, o el cliente no acepta ampliar, o el sitio está en una plataforma donde el gestor no se puede instalar, el pedido queda en un estado que el documento no describe: pagado, sin entregable y sin regla. El primer caso así se resuelve improvisando por correo con la plata ya en Mercado Pago, y en un producto que se vende sobre protección de datos un reclamo de ese tipo pega donde más duele.

**Ajuste propuesto:** Escribir la política antes de abrir el cobro, visible en la misma pantalla del pago y repetida en el correo de confirmación. Tiene que cubrir, caso por caso: fuera de alcance detectado después del pago y el cliente no acepta ampliar; plataforma donde el kit no se puede instalar; el cliente nunca entrega el acceso (cuántos días queda abierto el pedido y qué pasa después); el cliente se arrepiente antes de que empiece el trabajo; no se entregó en el plazo ofrecido; y quién absorbe la comisión del medio de pago cuando se devuelve.

**Dato que falta:** Tres datos: si Mercado Pago devuelve su comisión en un reembolso (está en los términos de la cuenta, hay que leerlos); qué dice la ley del consumidor sobre retracto en una contratación electrónica como esta, que es pregunta de abogado y no se decide acá; y el plazo de entrega que Ramón puede comprometer con sus horas reales.


### 🔴 Encender el checkout rompe la política de privacidad publicada, que promete actualizarse antes

**Dónde:** §106-113 "Datos y confianza" del brief, contra la política v1.4 en vivo (verifica.spindlelab.cl/privacidad)

**Por qué importa:** La política publicada afirma hoy como hecho que el resultado del chequeo "no se guarda en ninguna parte" (punto 09), que el proceso "no guarda nada y no tiene una base de datos detrás" y que "no tenemos una base de datos propia con los pedidos" (punto 05), que los proveedores son exactamente tres (punto 08), y en el punto 11 promete que "si algún día sumamos algo más que te pida datos, actualizamos esta política antes de encenderlo". El recorrido del brief necesita lo contrario en cuatro frentes: guardar el diagnóstico asociado al pedido, un registro de pedido con seis estados, datos de pago que llegan de un cuarto proveedor y datos de facturación. Si el checkout sale antes que la política, el producto queda incumpliendo por escrito su propia promesa, en la página que usa como prueba de que sabe hacer esto.

**Ajuste propuesto:** Agregar a la secuencia de trabajo (§136-143), como paso previo al paso 2, la versión 1.5 de la política, con la lista exacta de lo que cambia: punto 04, nueva categoría de datos de pago y facturación con su finalidad y su base; punto 05, que sí hay base de datos propia, cuál y qué guarda; punto 08, Mercado Pago como cuarto proveedor, dónde procesa y con qué términos; punto 09, cuánto se conserva el pedido, el informe y el registro de pago; punto 12, que el puntaje automático ahora decide si se puede comprar. Publicarla antes de habilitar el botón, no el mismo día.

**Dato que falta:** Cuánto obliga a conservar el registro de la venta la normativa tributaria, para escribir el plazo del punto 09 sin inventarlo. Es pregunta de contador, no de abogado.


### 🟡 Un pago pendiente con botón de reintento puede cobrar dos veces

**Dónde:** §74 y §76 del camino de cobro

**Por qué importa:** La idempotencia que describe el brief protege contra dos órdenes por el mismo pedido, que es un problema distinto. El hueco está en el estado pendiente: el brief ofrece "una acción para volver a intentar" sin distinguir pendiente de rechazado. Un pago pendiente que después se aprueba, más un reintento con tarjeta que también se aprueba, son dos pagos aprobados contra el mismo pedido. El cliente queda cobrado dos veces por un kit, y el que se entera primero es él.

**Ajuste propuesto:** Separar los dos estados en la pantalla de retorno. Con un pago pendiente no se ofrece pagar de nuevo: se muestra el estado, hasta cuándo vale y un camino para avisar que ya pagó. El reintento se habilita solo con el pago rechazado o vencido. Y en el webhook, un segundo pago aprobado con el mismo identificador externo no se acepta en silencio: se marca para devolución y avisa.

**Dato que falta:** Qué medios de pago tiene habilitados esa cuenta de Mercado Pago, cuáles pueden quedar pendientes y por cuánto tiempo. Está en la configuración de la cuenta y en la documentación de medios de pago de Mercado Pago Chile.


### 🟡 El precio fijo no tiene límite medible, y el chequeo sí mide uno

**Dónde:** §38-51, el paquete estándar propuesto, y el punto 3 de §59

**Por qué importa:** El alcance dice "las correcciones técnicas que estén dentro del alcance publicado", que es circular: el alcance publicado es el que se está definiendo. El trabajo real no escala con el puntaje, escala con cuántos rastreadores hay que poner detrás del consentimiento, y eso es justo lo único de esta dimensión que el chequeo sabe contar: cuántos rastreadores de su catálogo corren. En la medición de 10 sitios chilenos, dos traían 7 y 5 (muestra sesgada y chica, direccional, no una tasa de mercado). Un precio fijo sin tope en ese eje se cobra igual para un sitio con GA4 que para uno con siete rastreadores, y el segundo se entrega a pérdida o se entrega mal.

**Ajuste propuesto:** Definir el paquete estándar con tope en el único eje que el sistema mide hoy: hasta N rastreadores detectados del catálogo, un dominio, un sitio. Por sobre N, el botón manda a revisión de alcance en vez de al pago, con la misma compuerta del primer hallazgo. Y queda escrito en la página como condición del precio, no en una nota interna.

**Dato que falta:** Cuántos minutos toma dejar un rastreador detrás del consentimiento en una entrega real. Sin ese número no se puede elegir N, y sale de cronometrar la primera entrega, no de estimarla.


### 🟡 "+ IVA" no es un total, y el precio está escrito en cinco lugares del sitio

**Dónde:** §28, §51 y el punto 4 de §60, contra public/index.html del sitio de Verifica y Cumple

**Por qué importa:** Mercado Pago cobra un monto bruto único. Mientras la página dice "Desde $149.000 + IVA", el comprador que apriete va a ver en el checkout un número distinto del que leyó, que es la fricción clásica que mata una compra directa en el último paso. Y cuando se fije el total hay cinco lugares que lo dicen: el JSON-LD de preguntas frecuentes (línea 216), la tarjeta del kit (1634), la pregunta visible (1758) y los dos cierres del resultado (2117 y 2497). Si se cambia la tarjeta y se olvida el JSON-LD, Google y los motores de IA siguen citando el precio viejo, que es el canal donde este producto dice jugarse.

**Ajuste propuesto:** Mostrar el monto bruto como el número grande, con el neto y el IVA desglosados debajo, y que ese bruto sea el que va a la orden. Cambiar los cinco lugares en una sola pasada, el JSON-LD incluido, y verificar el render antes de publicar. Si la palabra "desde" queda en algún lado, que no sea una pantalla con botón de pago.

**Dato que falta:** El total final, que es la decisión del punto 4 de §60 y la toma Ramón. Nada más.


### 🟡 Falta confirmar que se puede emitir el documento y que la plata llega a la SpA

**Dónde:** §66 ("la boleta sigue el proceso tributario que la agencia ya utiliza") y el paso 2 de la secuencia de trabajo

**Por qué importa:** Las dos cosas se dan por hechas. Según el registro de este proyecto, al 26 de septiembre la SpA estaba constituida en el SII con cuenta de empresa lista pero faltaba activar la facturación; si eso sigue pendiente, el checkout empieza a cobrar con IVA sin poder emitir el documento. Y si el titular de la cuenta de Mercado Pago no es SpindleLab SpA con su RUT, el dinero entra a una persona natural mientras factura la empresa, y la contabilidad queda cruzada desde la primera venta.

**Ajuste propuesto:** Antes del paso 2 de la secuencia, dos verificaciones con captura: facturación electrónica activa en el SII para el RUT 78.474.925-8, y cuenta de Mercado Pago a nombre de la SpA con su cuenta bancaria asociada. Y decidir si se emite boleta o factura, porque eso define qué datos de facturación se piden y en qué momento. Un comprador empresa va a querer factura para su crédito de IVA, y eso choca con la regla de §110 de no pedir RUT: hay que acotarla a que el RUT se pide para el documento, una vez que la compra existe.

**Dato que falta:** El estado real de la facturación electrónica hoy (lo lleva Ramón en otra sesión) y el titular actual de la cuenta de Mercado Pago. Ninguno de los dos está escrito en el repo.


### 🟡 El espacio privado guarda el diagnóstico y el pago, y no tiene puerta definida

**Dónde:** §21, §73 y §93-104

**Por qué importa:** El brief hace bien en prohibir contraseñas, pero no pone nada en su lugar. El espacio privado va a mostrar el diagnóstico del sitio del cliente, el estado del pedido y el pago, y se "habilita" sin que el documento diga con qué credencial se entra ni cuánto dura. Si termina siendo un enlace adivinable, o un enlace eterno reenviado por correo, el diagnóstico de un cliente queda abierto a cualquiera que tenga la dirección. Y eso es justo lo que la política del tercer hallazgo tiene que declarar como medida de seguridad.

**Ajuste propuesto:** Decidir y escribir el mecanismo antes del paso 5 de la secuencia, porque define el modelo de datos: enlace con token aleatorio largo, con vencimiento y renovable por correo, y que el espacio no muestre del pago más que el monto, la fecha y los últimos dígitos.


### ⚪ El nombre del ítem en Mercado Pago es un comprobante que queda guardado

**Dónde:** §68-70, el camino de cobro

**Por qué importa:** El brief define el texto del botón pero no el del ítem de la orden, y ese texto es el que aparece en el checkout de Mercado Pago, en el comprobante del pago y en la cartola del comprador. Si el ítem se llama "Verifica y Cumple", el documento que el cliente archiva dice que pagó por cumplir, que es exactamente lo que §91 cuida en todas las demás pantallas.

**Ajuste propuesto:** Fijar el título del ítem describiendo el trabajo, por ejemplo "Kit técnico de consentimiento y señales, 1 sitio", y revisar cómo queda el descriptor que aparece en la cartola. Es un campo que se define al crear la orden.

**Dato que falta:** Si Mercado Pago Chile permite definir el descriptor de la cartola en esta cuenta o si lo fija con el nombre del titular.


### ⚪ La medición que queda pegada al pedido puede tener un día de antigüedad

**Dónde:** §19 y el criterio de aceptación "El dominio y el informe inicial no se solicitan por segunda vez"

**Por qué importa:** La revisión con navegador se guarda por dominio 24 horas (clave cache:<dominio> en KV) y la página lo dice en voz alta. Si el pedido congela ese resultado sin su hora, se cobra un kit contra una foto que puede ser de ayer, y cuando el cliente diga "mi sitio no tenía eso" no hay con qué responderle.

**Ajuste propuesto:** Guardar con el pedido la hora de la medición y mostrarla junto al precio antes de pagar, con las mismas palabras que ya usa el resultado. Si al crear la orden la medición tiene más de un día, volver a medir antes de fijar el precio.


**Lo que está bien y conviene no tocar:**

- La cadena de confirmación del pago está bien pensada y no hay que tocarla: monto e identificador del pedido fijados en el servidor y nunca aceptados desde el navegador (§69), confirmación solo desde la fuente servidor con firma validada más consulta a la API (§72-73), y la vuelta del navegador que por sí sola no marca nada como pagado (§71). Eso es exactamente el orden correcto.
- Checkout hospedado, sin datos de tarjeta en el sitio (§70). Deja fuera toda la superficie de datos de pago, que es lo último que esta operación quiere administrar.
- Secretos como variables de entorno de Cloudflare, nunca en HTML, JavaScript público, formularios ni mensajes (§76).
- Probar aprobado, pendiente, rechazado, reintentos y notificaciones repetidas en modo de prueba antes de publicar (§143). La notificación repetida es el caso que casi siempre se descubre en producción.
- Solo pago único en el MVP, con la suscripción trimestral como contratación aparte y con precio, duración, renovación y cancelación explicados antes de aceptarla (§78). Un cobro recurrente vendido contra una fecha legal es donde nacen los reclamos.
- Nunca pedir contraseñas en un formulario ni por correo, y trabajar con invitación temporal de permisos mínimos que se retira al terminar (§22 y §111).
- No tocar el sitio del cliente antes de tener pago, alcance y acceso confirmados (§112).
- Mantener el chequeo gratuito sin correo y sin cuenta (§108). Es lo que hace funcionar la entrada y es lo primero que un checkout suele destruir.
- Vincular dominio e informe con una compra solo cuando la persona inicia el pago, con explicación de uso y retención (§109). El principio es correcto; lo que falta es que la política publicada lo diga antes.
- No cobrar un adicional después del pago sin aceptación expresa del cliente (§30 y §62).
- No emitir el documento tributario desde el sitio y dejarlo en el proceso que ya existe (§66). Correcto: ese es el camino más corto a un problema que no es de producto.
- Prohibir "tu empresa no cumple", "sitio certificado" y "ahora cumples", y definir que el resultado de la implementación significa que se hicieron y verificaron los cambios contratados (§91). Esa frase final es la definición exacta de lo que se vende y conviene conservarla literal.
- La compuerta que ya está en el código y que el checkout tiene que heredar sin excepción: sin pendientes no se ofrece el kit, y cuando no se pudo medir tampoco, con la frase "Esto no es un resultado a tu favor: es que no vimos". Esa es la pieza que impide cobrarle a quien no tiene nada que corregir, y es la que un botón de pago suele ser el primero en saltarse.

---

## Lo que la auditoría descartó, y por qué

Doce propuestas no pasaron. Van acá porque saber por qué una idea razonable no sirve ahorra
que vuelva en la próxima versión del brief.

- **«Dentro del alcance publicado» se define a sí mismo: el kit no nombra ni una corrección** — *inventa-capacidad*: El diagnóstico es correcto y necesario: las líneas 34 y 44 se apuntan una a la otra y ninguna nombra una corrección. El ajuste es el que falla. Dice que el kit «incluye llevar a ok las que el informe marcó pendiente de esa lista, y nada más», y la lista incluye «Enlace a tu política de privacidad». Esa señal solo pasa a ok cuando hay una política publicada y enlazada en el sitio. Pero lo que el kit entrega, según el 
- **La plataforma del sitio se pregunta después del pago, y es la variable que más mueve el costo** — *mata-la-compra-directa*: El diagnóstico se sostiene entero: el paso 5 (línea 21) y el intake postpago (línea 121) preguntan la plataforma después de cobrar, el chequeo no clasifica CMS, y con precio fijo eso es cobrar antes de saber si el trabajo es de una tarde. El ajuste es el que falla, por su rama «no sé». Mandar a «Pregúntanos» a quien contesta «no sé» le quita el botón de pago a la respuesta más característica de la audiencia que el pr
- **«Configuración de un gestor de consentimiento» no dice si se instala el nuestro o se repara el del cliente** — *mata-la-compra-directa*: La ambigüedad que detecta es real y la combinación de señales que la delata (aviso presente en ok junto a cookies sin permiso en pendiente) sí está en lo que el chequeo mide hoy. El problema es el ajuste, y lo delata el propio hallazgo: abre diciendo «hay un caso común que el chequeo deja ver» y después le pone a ese caso común una compuerta que pide «confirmar qué gestor tiene antes del pago, u ofrece Pregúntanos». 
- **La oferta describe tareas y señales, nunca dice qué gana el comprador** — *confunde-señal-con-cumplimiento*: El diagnóstico es correcto y es probablemente la razón real de que el botón no se pulse, pero el ajuste llena el vacío con la pieza prohibida. Poner como PRIMER elemento de un bloque titulado "lo que el comprador gana" la frase "esto es exigible desde el 1 de diciembre de 2026" convierte la obligación legal en el beneficio del producto: el lector no técnico lee "compro esto y quedo cubierto para el 1 de diciembre". E
- **"El valor sube si tu sitio tiene más de lo que el chequeo alcanzó a ver" es la frase que mata la compra directa** — *contradice-los-hechos*: La frase de la tarjeta sí es un problema real y merece reemplazo, pero la evidencia con que se justifica no aplica y el propio ajuste lo demuestra. Los 3 de 10 sitios con puntaje nulo son casos donde el chequeo no pudo medir, y la página ya no ofrece el kit en ese estado: ofrece "Pregúntanos". Es decir, esos 3 nunca llegan a ver la tarjeta ni la nota, así que no pueden servir para dimensionar cuántas veces "aparece a
- **El espacio privado no dice cómo se entra, y si pide cuenta, el comprador que acaba de pagar se topa con un registro** — *inventa-capacidad*: El problema es válido (el brief define seis estados y nunca dice cómo entra el cliente) y el criterio de no crear cuentas es el correcto, pero el ajuste apoya el ÚNICO punto de entrada al pedido en un canal que no existe. No hay nada que envíe correo en el código: grep de resend / mailchannels / sendgrid / postmark / smtp sobre verificaycumple/functions/ y spindlelab-astro/functions/ no devuelve una sola línea, y el 
- **Los casos que el brief deja fuera del paquete no son detectables, así que van a llegar al botón de pago** — *inventa-precio-o-garantia*: El diagnóstico es correcto y la pieza (a) también: tres casillas autodeclaradas en el mismo paso del botón es una compuerta para casos raros, el caso típico responde no a las tres y compra directo, y no inventa capacidad porque pregunta justamente lo que el chequeo no puede ver. Lo que falla es la pieza (b): escribe en las condiciones del checkout una devolución del 100% que nadie aprobó, y la escribe ANTES de tener 
- **La verificación del «después» y el chequeo gratis consumen el mismo recurso medido, y no está contado como costo** — *contradice-los-hechos*: El costo es real y el ajuste sirve, pero el mecanismo con que se justifica la gravedad «alta» no existe. Verificado en /Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/.claude/worktrees/elastic-thompson-3a8ffd/verificaycumple/public/index.html: el botón del resultado rápido depende solo de los `pendientes` del chequeo rápido, que lee el HTML y NO abre navegador. Si se agota la cuota de navegador, 
- **No hay forma de medir la entrega típica antes de vender, y con demanda casi cero el «desde» se queda indefinidamente** — *inventa-capacidad*: El bloqueo que describe es real y la pieza (a) es ejecutable: filtrar los commits del 21 y 22-sep da una envolvente imperfecta pero propia. La pieza (b) no se sostiene. Correr «el kit completo» sobre los dos sitios del banco de pruebas supone acceso de administración a sitios de producción de terceros que no son clientes, para instalar un gestor de consentimiento gratis como ejercicio de medición: eso no está estable
- **La política ya va atrás del código, antes de que exista el checkout** — *confunde-señal-con-cumplimiento*: Los hechos del hallazgo están verificados en functions/api/profundo.js: namespace VYC_TOPES (línea 52, 1676), clave cache:<dominio> con expirationTtl de CACHE_HORAS=24 (1541, 1557, 1722) y contador tope:ip:<día>:<IP> con TTL de 60*60*30 (1552-1557, 1707). El arreglo principal (declarar el KV en la 1.5) se sostiene. Lo que falla es la rama alternativa, además declarada con necesita_dato "ninguno": "guardar un hash con
- **El informe antes/después es donde el comprador va a leer "cumplo"** — *no-es-accionable*: El hallazgo es el más valioso del conjunto y hay que conservarlo: la lectura de cumplimiento sale de la composición (puntaje que sube, estado "Entrega lista", el nombre de la marca, los 12 puntos marcados), no de una frase, y el riesgo de que la plantilla entregada vuelva "mencionados" los 12 puntos es real. El cambio 1 (renombrar el estado final) y el 3 (pegar el descargo al bloque de los 12 puntos y marcar la plant
- **El pago confirmado no le avisa a nadie, y el comprador no tiene forma de volver** — *inventa-capacidad*: El diagnóstico es correcto y probablemente el más urgente en términos operativos: una venta pagada que nadie ve es trabajo que no arranca. Pero el arreglo se apoya en algo que no está establecido: "que el servidor mande a ese correo el enlace al espacio privado cuando el pago se confirma". Hoy no hay con qué enviar correo transaccional desde el sitio. El formulario pasa por Web3Forms y termina en Google Workspace, y 
