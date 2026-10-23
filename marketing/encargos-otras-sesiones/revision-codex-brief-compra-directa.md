# Revisión de producto y conversión

## 1. Alcance

### 1.1 «Correcciones técnicas detectadas dentro del alcance publicado» todavía no define el trabajo estándar

- **Parte del brief:** la oferta incluye configuración de un gestor de consentimiento y correcciones técnicas dentro del alcance publicado; la decisión pendiente pide definir qué gestor y qué cambios incluye el servicio estándar.
- **Por qué importa:** con esa definición abierta, dos sitios con el mismo resultado podrían requerir trabajos distintos. El equipo no puede estimar ni entregar de manera consistente, y el comprador no puede saber qué está comprando antes de pagar.
- **Ajuste accionable:** antes del checkout, publicar una lista cerrada de tareas incluidas, organizada por señales del chequeo y por plataforma compatible. Definir también qué significa “configurar” el gestor y qué resultado observable se verificará. Si una señal no corresponde a una tarea incluida, mostrarla como informativa o pendiente de revisión, no como parte implícita del kit.
- **Dato faltante:** gestor o gestores admitidos, plataformas compatibles, tareas incluidas para cada señal, y límites de intervención y verificación por tarea.

### 1.2 El límite de exclusión no está convertido en una regla que pueda operar antes del pago

- **Parte del brief:** tiendas en línea con checkout, varios dominios, múltiples herramientas de seguimiento e integraciones a medida quedan fuera; el sistema debe reconocer esos casos antes de cobrar y ofrecer una revisión de alcance.
- **Por qué importa:** no se explica cómo detectará el sistema esas condiciones ni qué ocurre con casos dudosos. Si una tienda o una integración no se reconoce, el cliente puede pagar por un paquete que el equipo no puede completar. Si se detecta todo caso complejo con un desvío genérico, la compra directa se rompe para usuarios que podrían calificar.
- **Ajuste accionable:** definir señales de exclusión verificables por el chequeo y añadir, antes del checkout, una confirmación breve en lenguaje cotidiano para condiciones que el chequeo no pueda determinar. Cuando una exclusión esté confirmada, reemplazar el botón de compra estándar por una solicitud de revisión de alcance, explicando qué condición la activó y qué información se necesita. Mantener el checkout directo para los casos estándar confirmados; no usar una llamada como paso obligatorio.
- **Dato faltante:** lista completa de exclusiones, qué señales permiten detectarlas automáticamente, cuáles requieren confirmación del cliente y el proceso y canal de revisión para los casos fuera del paquete.

### 1.3 «Un dominio y el sitio principal asociado» deja casos de cobertura ambiguos

- **Parte del brief:** el paquete cubre un dominio y el sitio principal asociado; el respaldo técnico puede incluir las URLs revisadas.
- **Por qué importa:** no queda claro si subdominios, áreas de inicio de sesión, páginas de campaña u otras secciones están incluidas. El cliente puede entender “un sitio” como todo lo que vive bajo su marca, mientras que el equipo puede medir solo una parte.
- **Ajuste accionable:** definir en la oferta qué se considera el sitio principal y cómo se determina la cobertura (por ejemplo, qué URLs o secciones revisa el chequeo y cuáles se intervienen). Mostrar el dominio y el alcance de revisión antes de pagar y pedir confirmación si la cobertura es limitada.
- **Dato faltante:** criterio de inclusión de subdominios y secciones, límites de URLs revisadas y forma de identificar el sitio principal.

### 1.4 Hay una etapa de «revisión del alcance» después del pago que puede contradecir la oferta cerrada

- **Parte del brief:** tras el pago, el estado privado incluye «Revisión del alcance»; el equipo revisa el sitio real y registra hallazgos adicionales antes de ampliar el trabajo. A la vez, se afirma que el checkout corresponde a un paquete delimitado y que no habrá cobros posteriores sin aceptación.
- **Por qué importa:** si la revisión determina que el sitio no era estándar, el cliente ya pagó y puede quedar sin una respuesta clara sobre la entrega, la devolución o la alternativa disponible. La revisión puede convertirse en una cotización obligatoria posterior y debilitar la promesa de compra directa.
- **Ajuste accionable:** resolver esa bifurcación antes de construir el checkout. Para el caso estándar, confirmar elegibilidad con el resultado y las preguntas previas al pago y usar la revisión posterior solo para validar los datos y accesos necesarios para ejecutar el alcance contratado. Si aparece una condición excluida que no era detectable, definir y comunicar antes de cobrar la salida concreta (incluida la opción de no continuar), sus condiciones y quién la gestiona. No iniciar ampliaciones sin aceptación expresa.
- **Dato faltante:** criterio para declarar que un pedido no se puede ejecutar tras la revisión, solución disponible para ese caso y condiciones de cancelación o devolución aplicables.

### 1.5 La plantilla de privacidad necesita un límite operativo comprensible

- **Parte del brief:** se entrega una plantilla basada en información del cliente, para revisión de su abogado; no incluye asesoría legal ni certifica cumplimiento.
- **Por qué importa:** “basada en la información” no indica qué datos debe entregar el cliente ni si el equipo redacta, adapta o solo entrega un modelo. El cliente puede esperar un documento ajustado y listo para publicar, o interpretar su inclusión como una garantía legal.
- **Ajuste accionable:** describir qué recibe exactamente, qué información debe aportar, quién la completa y qué revisión queda a cargo del abogado del cliente. En el resultado y en la entrega, decir expresamente que es un insumo para revisión legal y que el chequeo y los cambios solo informan sobre señales técnicas observables.
- **Dato faltante:** formato y nivel de adaptación de la plantilla, datos que se solicitarán, responsable de completarla y criterios para considerarla entregada.

## 2. Compra directa

### 2.1 El resumen promete valor, pero aún no conecta cada resultado con una acción y un límite

- **Parte del brief:** el resultado debe explicar qué señales se encontraron, qué se puede mejorar, qué no se pudo confirmar y qué cambios incluye el servicio.
- **Por qué importa:** una persona no técnica puede ver una señal y no saber si es un problema observado, una incertidumbre de la medición o una tarea incluida. Sin esa relación, el precio y el botón no se sienten vinculados a algo concreto; además, “no se pudo confirmar” podría confundirse con un fallo que el kit arreglará.
- **Ajuste accionable:** para cada señal, mostrar en términos cotidianos qué observó el chequeo, qué no pudo comprobar, si la acción correspondiente está incluida y qué quedará para el abogado o el equipo web del cliente. No presentar señales técnicas como diagnóstico de incumplimiento ni prometer que el sitio “cumple” después de implementarlas.
- **Dato faltante:** catálogo final de señales, correspondencia entre cada señal y las tareas incluidas, y causas conocidas por las que una señal no puede confirmarse.

### 2.2 La fricción de elegibilidad puede aparecer en el peor momento, después de cobrar

- **Parte del brief:** la plataforma se solicita en el inicio postpago, el cliente entrega acceso temporal y el equipo revisa el sitio real antes de implementar; el sistema debe reconocer exclusiones antes del botón.
- **Por qué importa:** el cliente no necesariamente sabe cómo identificar su plataforma, checkout o herramientas de seguimiento. Si esas preguntas aparecen solo después de pagar, el flujo cobra antes de saber si el paquete aplica. Si aparecen con jerga técnica, personas elegibles pueden abandonar por inseguridad.
- **Ajuste accionable:** trasladar al resultado una comprobación de elegibilidad breve, con ejemplos en lenguaje corriente y opción “no sé”. Usar las respuestas para bloquear el checkout solo cuando confirmen una exclusión; para “no sé”, explicar qué dato falta y permitir resolverlo por un mecanismo asíncrono de revisión de alcance, sin exigir una llamada como camino típico. Reutilizar después las respuestas para no preguntarlas otra vez.
- **Dato faltante:** preguntas suficientes para separar casos estándar de excluidos, método para resolver respuestas inciertas y canal de asistencia disponible.

### 2.3 Entregar acceso temporal puede ser difícil aunque la instrucción sea segura

- **Parte del brief:** tras el pago se pide plataforma, contacto y acceso por invitación temporal con permisos mínimos o medio seguro acordado; no se aceptan contraseñas por formulario o correo.
- **Por qué importa:** un dueño de pequeña empresa puede no saber qué usuario invitar, qué permiso dar, cómo crear una invitación ni dónde hacerlo. “Medio seguro acordado” no le indica un siguiente paso concreto. El pedido puede quedarse detenido justo después de comprar.
- **Ajuste accionable:** crear instrucciones paso a paso por cada plataforma admitida, indicando dónde invitar al equipo, qué permiso mínimo seleccionar y cómo revocar el acceso al finalizar. Para plataformas sin invitación temporal, definir el mecanismo seguro que se ofrecerá. Mostrar desde el primer estado quién debe actuar y cómo pedir ayuda sin enviar credenciales.
- **Dato faltante:** plataformas que se admitirán, permisos mínimos requeridos en cada una, mecanismo seguro alternativo y persona o canal responsable de ayudar con el acceso.

### 2.4 El «espacio privado» no explica cómo se accede ni cuándo se crea la cuenta

- **Parte del brief:** después de confirmar el pago se crea un espacio privado; el chequeo gratuito no requiere registro ni correo y el intake postpago solicita un contacto.
- **Por qué importa:** no se dice si la persona crea una contraseña, recibe un enlace, usa el correo del pago u otro método. Puede no encontrar el seguimiento o creer que necesita registrarse antes de comprar, en contra del chequeo sin registro.
- **Ajuste accionable:** definir y describir el paso de acceso al espacio después de confirmar el pago, qué canal se usa para entregarlo y qué hacer si el pago fue aprobado pero el acceso no llegó. Pedir solo los datos necesarios y explicar su uso y retención al vincular el diagnóstico con el pedido.
- **Dato faltante:** método de autenticación, dato de contacto necesario para activarlo y proceso de recuperación de acceso.

### 2.5 Los estados del pedido no explican qué pasa si la persona no puede continuar

- **Parte del brief:** el espacio muestra «Falta el acceso temporal», «Revisión del alcance» e «Implementación en curso» y debe indicar la acción del cliente y lo que ocurrirá después.
- **Por qué importa:** un estado sin acción, responsable o expectativa entendible hace que el comprador no sepa si debe esperar o actuar. La etapa de revisión también puede sonar a que todavía no se ha confirmado la compra del servicio.
- **Ajuste accionable:** para cada estado, indicar quién actúa, la acción concreta, qué dato o evidencia se necesita y qué estado viene después. Distinguir con claridad “pedido pagado” de “trabajo en pausa a la espera de acceso” y definir cómo se informan bloqueos o exclusiones detectadas.
- **Dato faltante:** responsables y reglas de transición por estado, condiciones de bloqueo y canal de seguimiento o ayuda.

## 3. Precio

### 3.1 El precio de prueba no se puede validar sin medir entregas comparables

- **Parte del brief:** se propone usar $149.000 + IVA como hipótesis y medir horas y costos directos antes de activar pagos.
- **Por qué importa:** el promedio de una entrega sencilla puede ocultar casos que consumen mucho tiempo. Sin datos por tipo de sitio, no se sabrá si el paquete deja margen de forma repetible ni qué exclusiones hacen falta.
- **Ajuste accionable:** registrar en entregas piloto comparables el tiempo por etapa (revisión, configuración, correcciones, coordinación de acceso, verificación e informe), retrabajo y costos directos. Separar los casos estándar de los que activan exclusiones y calcular margen con el precio final candidato antes de publicarlo.
- **Dato faltante:** horas reales por etapa y por tipo de sitio, frecuencia de retrabajo, costo interno por hora o criterio de margen mínimo, costos de herramientas y otros costos variables.

### 3.2 Falta determinar el costo completo de cada cobro

- **Parte del brief:** el medio elegido es Checkout Pro de Mercado Pago; se menciona incluir su comisión en los costos directos.
- **Por qué importa:** el precio puede parecer viable con el tiempo de implementación, pero dejar de serlo al sumar comisión y costos de operación. El brief no contiene una tasa o estructura aplicable al caso, por lo que no es posible cerrar el cálculo.
- **Ajuste accionable:** obtener las tarifas vigentes aplicables a la cuenta y al medio de pago elegido, y sumarlas al costo por pedido junto con los demás costos variables antes de aprobar el precio. No fijar el monto mostrado al cliente hasta confirmar el tratamiento tributario y el total que efectivamente se cobrará.
- **Dato faltante:** comisión efectiva y otros cargos de Mercado Pago para esta cuenta y configuración; costos de infraestructura, soporte y generación/almacenamiento de informes atribuibles a una entrega; tratamiento final de IVA y forma en que se expresará el total pagadero.

### 3.3 No están cuantificados el volumen ni la mezcla de casos para interpretar el piloto

- **Parte del brief:** el precio se probará como hipótesis, pero no se define qué observaciones permitirán concluir que el monto o el paquete son sostenibles.
- **Por qué importa:** unas pocas compras de casos simples podrían parecer rentables aunque una parte relevante de los pedidos consuma más trabajo o quede bloqueada por accesos. Sin registrar conversión, elegibilidad y costo por entrega, no se podrá distinguir un problema de precio de uno de alcance o de fricción.
- **Ajuste accionable:** antes del piloto, acordar qué métricas se registrarán: resultados elegibles, clics al checkout, pagos aprobados, pedidos completados, tiempo y costo por pedido, pedidos pausados o excluidos y solicitudes de ayuda. Establecer internamente qué umbral de margen y qué cantidad de entregas comparables bastarán para revisar la hipótesis, sin presentarlos como garantías al cliente.
- **Dato faltante:** volumen esperado de resultados elegibles, tasa de conversión disponible o método para medirla, umbral interno de margen y tamaño de muestra que Ramón considerará suficiente para decidir.

### 3.4 El «total» y las condiciones deben ser inequívocos antes del pago

- **Parte del brief:** la oferta pública actual dice $149.000 + IVA “desde”; el flujo debe mostrar un total concreto con impuestos y condiciones antes de pagar.
- **Por qué importa:** “desde” no es un monto autorizable para una compra directa. Si el cliente ve solo el precio neto y descubre el impuesto o condiciones después, el total no cumple el propio criterio del producto y puede interrumpir el pago.
- **Ajuste accionable:** sustituir “desde” por el monto final aplicable al paquete una vez validado. En la misma pantalla, mostrar el total que se cobrará, qué incluye, exclusiones relevantes y condiciones de inicio, acceso y salida del servicio. Mantener la revisión periódica como contratación separada y no mezclar su precio mensual con el precio del kit.
- **Dato faltante:** monto final aprobado con impuestos, condiciones comerciales aplicables al pago e inicio, y tratamiento de pedidos que no puedan ejecutarse por una exclusión descubierta.

## Síntesis de decisión

La compra directa es viable para los casos que califican al paquete estándar: el brief ya propone una oferta única, precio previo, pago confirmado en servidor y seguimiento postpago. Antes de activar el checkout, faltan tres cierres concretos: una matriz de tareas y señales incluidas, una comprobación de elegibilidad que resuelva las exclusiones antes del cobro y datos reales de costo por entrega para aprobar el precio total. En todos los resultados e informes, el alcance debe seguir describiendo señales técnicas observables y cambios realizados; no debe afirmar ni insinuar certificación o cumplimiento legal.
