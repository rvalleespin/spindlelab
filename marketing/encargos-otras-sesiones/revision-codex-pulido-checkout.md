# Revisión del checkout con tráfico en curso

Revisión estática de `public/index.html`, `public/pedido/index.html`, las Pages Functions implicadas y las pruebas en `pruebas/`. No cambié código ni ejecuté la suite. Los hallazgos son reproducibles siguiendo el flujo de código; los puntos marcados como sospecha dependen del comportamiento del navegador o de una falla de infraestructura que no se puede forzar leyendo el código.

## Hallazgos, ordenados por impacto

### 1. La compra pierde todos los parámetros UTM de la campaña

- **Dónde:** [public/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/index.html:3177), [functions/api/pedido.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/pedido.js:338), [functions/api/pedidos.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/pedidos.js:133)
- **Gravedad:** alta para medición y optimización de campaña; afecta cada compra atribuible.
- **Escenario:** alguien entra con `?utm_source=facebook&utm_medium=paid_social&utm_campaign=...` y compra. El navegador hace `POST /api/pedido` sin query string. El servidor ejecuta `utmsDe(request.url)` sobre la URL del endpoint, no sobre la URL original de la portada; por eso guarda las columnas UTM como `NULL`.
- **Qué ve la persona:** nada anómalo; puede pagar. La venta aparece sin la campaña, conjunto o creatividad que la trajo.
- **Arreglo acotado:** capturar las UTM de la URL de entrada en el navegador y enviarlas en el cuerpo del POST; validarlas/recortarlas en servidor antes de pasarlas a `crearPedido`. No confiar en una URL de retorno de Mercado Pago para atribución.
- **Cómo comprobarlo:** hacer un POST desde una URL con los cinco parámetros y comprobar en D1 que `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` y `utm_term` conservan sus valores. La prueba existente de `utmsDe()` solo pasa una URL con UTM directamente al helper; no atraviesa el formulario ni `onRequestPost`.

### 2. Se puede vender basándose en una revisión profunda vieja

- **Dónde:** [functions/api/profundo.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/profundo.js:1541), [functions/api/pedido.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/pedido.js:270), [functions/api/pedido.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/pedido.js:282)
- **Gravedad:** alta; puede congelar y vender un alcance que ya no corresponde al sitio actual.
- **Escenario:** la persona vio un chequeo viejo o el sitio cambió después. Al comprar, el servidor vuelve a correr la revisión rápida, pero toma la profunda de `cache:<dominio>` si existe; ese cache dura 24 horas. La elegibilidad y el contrato congelado mezclan entonces dos momentos distintos.
- **Qué ve la persona:** la compra puede seguir habilitada y el pedido congela señales de la revisión profunda anterior, aunque el sitio ya haya cambiado. El cambio de la revisión rápida sí se considera, pero no sustituye la evidencia profunda guardada.
- **Arreglo acotado:** incluir fecha/huella del profundo en el resultado que habilita compra y rechazarlo o volver a medir cuando sea anterior al resultado que la persona está usando. Mantener el chequeo rápido recién ejecutado.
- **Cómo comprobarlo:** poblar KV con un profundo elegible de ayer, hacer que el chequeo rápido refleje un sitio modificado y crear el pedido; afirmar que el servidor no crea un contrato mezclado y que devuelve una salida explicable.

### 3. Si falla guardar `mp_order_id`, el pedido afirma que no hubo cobro y deja de actualizarse

- **Dónde:** [functions/api/pedido.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/pedido.js:443), [functions/api/etapas.js](/Users/ramon/vyc-ley21719/verificaycumple/functions/api/etapas.js:75), [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:357)
- **Gravedad:** alta si coincide una falla transitoria de D1 con la creación exitosa de la orden.
- **Escenario:** Mercado Pago crea una orden y devuelve la URL, pero falla el `UPDATE` que guarda su id en D1. El `catch` se traga el error y el navegador sí recibe la URL. Si la persona paga y vuelve antes de que el webhook marque el pedido pagado, el registro sigue como `creado` sin `mp_order_id`.
- **Qué ve la persona:** la etapa `sin-orden` dice «No se te cobró nada» y no se refresca sola porque `convieneRefrescar` no refresca pedidos sin `mp_order_id`. Si el webhook llega, una recarga manual acabará mostrando el estado real; antes de eso el texto es falso y la pantalla puede quedarse quieta.
- **Arreglo acotado:** si no se pudo persistir el id, no ocultar la falla: devolver un mensaje que explique que el pago se abrió pero que el estado está pendiente de confirmación, y permitir actualización manual/automática basada en una ruta segura de consulta. Registrar el fallo internamente sin exponer datos sensibles.
- **Cómo comprobarlo:** hacer que `marcarEstado` falle después de que el mock de Mercado Pago cree la orden; simular el retorno antes del webhook y confirmar que la pantalla no dice que no hubo cobro ni queda sin forma de actualizarse.

### 4. Intake y carga del pedido todavía culpan a la conexión cuando llega una respuesta ilegible

- **Dónde:** [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:246), [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:260), [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:343), [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:365)
- **Gravedad:** media; diagnóstico falso que puede hacer abandonar a quien ya pagó.
- **Escenario:** `/api/intake` o `/api/pedido` contesta, pero el cuerpo no es JSON legible (por ejemplo, una página de error del edge o una respuesta truncada). `r.json()` rechaza y el `catch` muestra «No pudimos conectarnos. Revisa tu conexión».
- **Qué ve la persona:** se le pide revisar su conexión aunque sí recibió una respuesta y el problema sea del servidor/edge. En intake se reabre el botón, por lo que puede volver a enviar los datos; guardar el intake admite correcciones, pero la causa del fallo queda mal explicada.
- **Arreglo acotado:** conservar la referencia a la respuesta como hace el checkout y usar texto distinto para «fetch no obtuvo respuesta» y «hubo respuesta pero no se pudo leer». En la carga del pedido, ofrecer reintento explícito sin atribuir de entrada la causa a la persona.
- **Cómo comprobarlo:** en una prueba de navegador simular `fetch` rechazado y, por separado, una respuesta HTTP con cuerpo no JSON; exigir mensajes diferentes para ambas.

### 5. Sospecha: volver atrás desde Mercado Pago puede restaurar un formulario deshabilitado

- **Dónde:** [public/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/index.html:3164), [public/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/index.html:3167), [public/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/index.html:3203)
- **Gravedad:** media; puede cortar el reintento tras abandonar la pasarela.
- **Escenario:** tras obtener la URL, el checkout deja deshabilitados el botón y los campos y navega con `location.assign`. Si se vuelve con el botón del navegador y el navegador restaura la página desde BFCache conservando el DOM, no hay manejador `pageshow` que reactive el formulario.
- **Qué ve la persona:** podría regresar a «Te estamos llevando a Mercado Pago…» con los datos y botón todavía deshabilitados, sin una acción visible para reintentar. El resultado depende de si ese navegador restaura la página desde BFCache; no se puede asegurar solo leyendo el código.
- **Arreglo acotado:** en `pageshow`, si la página fue restaurada, limpiar el mensaje transitorio y reactivar el formulario, o ofrecer un enlace de regreso al pedido con el id devuelto.
- **Cómo comprobarlo:** en Safari iOS y Chrome Android iniciar pago, pulsar atrás y verificar que el formulario vuelve a estar operativo y no conserva el mensaje de navegación.

### 6. Contraste bajo en el botón principal «Ir a pagar»

- **Dónde:** [public/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/index.html:1291), [public/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/index.html:1577)
- **Gravedad:** media para accesibilidad; también dificulta leer el CTA en móvil bajo reflejo o brillo alto.
- **Escenario:** el texto blanco del botón hereda `#fff` sobre el rosa `#ff3ea0`. La relación de contraste aproximada es 3.2:1, por debajo del mínimo 4.5:1 para texto normal (el botón es 16 px en negrita).
- **Qué ve la persona:** el CTA se distingue por su forma, pero el texto tiene contraste insuficiente para baja visión.
- **Arreglo acotado:** oscurecer el rosa de fondo del CTA o usar texto oscuro manteniendo la paleta; comprobar el estado hover y disabled por separado.
- **Cómo comprobarlo:** medir los colores finales renderizados con un comprobador WCAG y revisar el botón en móvil, normal, foco, hover y deshabilitado.

### 7. Los errores del intake no identifican ni enfocan el campo que hay que corregir

- **Dónde:** [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:216), [public/pedido/index.html](/Users/ramon/vyc-ley21719/verificaycumple/public/pedido/index.html:257)
- **Gravedad:** baja-media; fricción para teclado y lector de pantalla ante un RUT inválido o rechazo del servidor.
- **Escenario:** el servidor rechaza el RUT por dígito verificador, pero el mensaje solo se agrega al final del formulario; el campo RUT no recibe `aria-invalid` ni `aria-describedby`, ni se enfoca. El `role="status"` anuncia el texto en lectores compatibles, pero no indica qué control debe corregirse.
- **Qué ve la persona:** visualmente aparece el detalle, pero debe deducir el campo y volver a él; con teclado/lector puede no asociar el mensaje al RUT.
- **Arreglo acotado:** para `rut-invalido`, marcar el input con `aria-invalid="true"`, asociar el mensaje mediante `aria-describedby` y llevar el foco al RUT. Limpiar el estado al editar.
- **Cómo comprobarlo:** enviar un RUT inválido con teclado y lector de pantalla; comprobar que el foco cae en RUT y que el mensaje queda anunciado como su descripción.

## Qué ocurre en los escenarios de uso real

- **Dos pestañas, mismo sitio y correo:** el índice parcial único de D1 y `INSERT OR IGNORE` impiden dos pedidos abiertos; ambas solicitudes deberían acabar con el id del ganador y la clave de idempotencia común. Hay cobertura secuencial y una prueba concurrente con barrera en `prueba-crear-pedido.mjs`. Dos correos distintos sí pueden abrir compras separadas: es la clave de deduplicación elegida por el sistema.
- **Doble toque en móvil:** el botón se deshabilita antes del `fetch`; el servidor además busca un pedido abierto y protege la carrera en D1. La operación puede tardar hasta 30 segundos en el navegador. Si vence el timeout tras crear la orden pero antes de recibir respuesta, la UI reabre el botón y permite reintentar; el servidor debería reutilizar el pedido y la idempotency key. No encontré un caso de doble cobro dentro de la ventana abierta.
- **Cerrar a medio pagar y volver:** el pedido se inserta antes de llamar a MP. Mientras no se pague, volver a iniciar con mismo sitio/correo debería reutilizar el pedido dentro de la vigencia de la orden. Si alcanzó a pagar, el webhook lo asocia por `external_reference`; el enlace de retorno también usa el id del pedido. El estado puede tardar en actualizarse; el caso de fallo al persistir `mp_order_id` está descrito arriba.
- **Enlace de chequeo viejo o sitio cambiado:** no hay una versión del chequeo que se mande para validar al comprar. El servidor vuelve a ejecutar el rápido y puede usar hasta 24 horas de profundo cacheado. Esto produce la mezcla indicada en el hallazgo 2.
- **Atrás después de pagar:** las URL de éxito, pendiente y rechazo de MP apuntan a la misma página; esa página lee el estado de D1, no confía en parámetros de retorno. Si el webhook todavía no llegó, la página consulta cada cinco segundos hasta dos minutos. Volver al checkout en sí tiene la sospecha BFCache del hallazgo 5.

## Cobertura de pruebas: dinero y posibles falsos verdes

- **Sin protección end-to-end:** propagación de UTM desde la URL de entrada, a través del `fetch`, el handler y la fila SQLite/D1. `prueba-pedidos.mjs` prueba `utmsDe()` con una URL artificial y demuestra el helper, pero pasaría aunque la portada no le mande esas UTM al endpoint. Es el falso verde más relevante para la campaña.
- **Sin prueba de la interfaz real:** comportamiento de errores visibles, timeout de 30 s, parsing de respuesta, BFCache/atrás, campos y `location.assign` no se cubre en las pruebas de Pages Function. Por tanto los textos/estados de UI y el bloqueo al volver atrás no tienen prueba de regresión.
- **Sin prueba del fallo de persistencia del id de orden:** `prueba-crear-pedido.mjs` contempla fallo al crear la orden de MP y verifica que se conserve el pedido; no encontré una inyección donde MP sí crea la orden y falle específicamente el `UPDATE mp_order_id`. Esa ruta queda verde por omisión aunque produzca la etapa incorrecta descrita.
- **Sin prueba de antigüedad/coherencia entre informes:** los casos de elegibilidad cambian el contenido actual de KV, pero no verifican qué pasa con un informe profundo de hasta 24 horas junto a un rápido recién corrido; el contrato puede congelar datos de momentos diferentes sin que la suite lo detecte.
- **Doble solicitud concurrente sí tiene cobertura útil:** la suite contiene una barrera para que dos solicitudes terminen la búsqueda antes de insertar, y comprueba una fila y la misma clave efectiva de MP. No es solo una prueba de doble llamada secuencial.
- **La ruta webhook y transiciones de pago están mejor protegidas:** hay pruebas de firma, repetición de eventos, orden desconocida, monto que no calza, API caída y rescate de reclamo. `prueba-cobro.mjs` cubre estados de órdenes. Esas pruebas son sobre el handler con red simulada y SQLite local compatible, no una compra de punta a punta contra una cuenta real de MP.
- **Mutaciones que la suite actual dejaría pasar:** borrar la captura de UTM del navegador (no está ahí); dejar de pasar query params en el POST; no implementar recuperación visual de BFCache; quitar la distinción de mensajes en intake; o dejar sin tratar el fallo del `UPDATE mp_order_id`. El helper UTM aislado seguiría pasando. No hice mutaciones en el checkout real.

## Lo que miré y está bien

- El precio y las señales se reconstruyen en el servidor, y las señales/evidencia del pedido quedan congeladas.
- El POST vuelve a medir el chequeo rápido y comprueba elegibilidad antes de insertar y llamar a MP.
- El pedido se inserta antes de llamar a MP, de modo que el webhook puede resolver una notificación temprana por referencia.
- La idempotencia de MP reutiliza el id de pedido; el índice parcial de D1 cubre la carrera de dos pestañas para la misma pareja sitio/correo.
- La URL de checkout se valida en el navegador para HTTPS y dominios de Mercado Pago/Mercado Libre antes de redirigir.
- Las tres URL de retorno de MP llevan al pedido; el navegador no decide si el pago fue aprobado.
- La mayoría de errores JSON del checkout usa mensajes claros y accionables. El formulario de compra tiene etiqueta asociada, `type="email"`, autocomplete, consentimiento obligatorio y región `role="status"`; la portada declara foco visible global.
- El intake usa etiquetas envolventes, validación nativa, `select` para plataforma y `role="status"`; sus controles ocupan el ancho disponible en móvil.
- Las etapas distinguen pago pendiente, falta de datos, falta de acceso, rechazo, devolución y contracargo sin decir que el cliente debe actuar cuando no le toca.
