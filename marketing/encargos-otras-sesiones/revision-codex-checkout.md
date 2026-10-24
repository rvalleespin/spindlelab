# Revisión del checkout de Verifica y Cumple

Revisión estática del checkout y de las diez pruebas indicadas. No ejecuté la batería ni cambié el código.

### 1. Una segunda compra después de 30 minutos deja viva la primera orden

- **Dónde:** `functions/api/pedido.js:91-98, 262-268`; `functions/api/pedidos.js:130-137, 219`
- **Gravedad:** alta
- **Escenario:** la persona abre una orden y no paga. Pasan 30 minutos y vuelve a intentar; como `buscarPedidoReciente` solo encuentra pedidos de la ventana, el servidor crea otro id y otra orden. La primera orden de Mercado Pago vence recién después de `P1D`, así que ambas siguen pagables. Si la persona paga ambos enlaces, los dos webhooks pueden marcar dos pedidos pagados y el sistema queda con dos ventas por un kit.
- **Por qué importa:** permite cobrar dos veces al mismo cliente por el mismo sitio y obliga a resolver una devolución y un pedido duplicado.
- **Arreglo:** no abrir una segunda orden mientras la anterior siga pagable. Reutilizar la orden activa o cerrar/invalidar la anterior antes de crear otra; la ventana de 30 minutos no debe ser más corta que la vigencia de la orden.
- **Cómo comprobarlo:** prueba de endpoint: crear una orden, avanzar el reloj a 31 minutos sin cambiar su estado ni expirar la orden, repetir la solicitud y comprobar que queda una sola orden pagable; además simular el pago de ambas y verificar que no se producen dos pedidos pagados.

### 2. Dos solicitudes simultáneas pueden crear dos pedidos y dos órdenes

- **Dónde:** `functions/api/pedido.js:262-288`; `functions/api/pedidos.js:130-137`
- **Gravedad:** alta
- **Escenario:** llegan dos `POST /api/pedido` de igual dominio y correo a la vez. Ambas consultas `buscarPedidoReciente` terminan antes de que la otra inserte y devuelven `null`; cada solicitud genera su propio id, inserta un pedido y crea una orden con una clave de idempotencia distinta. El estado final son dos órdenes pagables para una sola compra.
- **Por qué importa:** la idempotencia de Mercado Pago solo deduplica solicitudes con la misma clave. Aquí las claves son los dos ids distintos, por lo que no evita el doble cobro.
- **Arreglo:** hacer atómica la reserva/reutilización de la compra por dominio y correo antes de llamar a Mercado Pago, de modo que solicitudes concurrentes reciban el mismo id. La búsqueda seguida de un INSERT separado no lo garantiza.
- **Cómo comprobarlo:** reemplazar la prueba secuencial de `prueba-crear-pedido.mjs` por dos solicitudes concurrentes (`Promise.all`) con una barrera que haga que ambas completen la búsqueda antes de insertar; exigir un solo pedido, una clave de idempotencia y una orden.

### 3. Un contracargo se muestra como si Verifica y Cumple hubiera devuelto el dinero

- **Dónde:** `functions/api/cobro.js:283-289`; `functions/api/etapas.js:127-136`
- **Gravedad:** media
- **Escenario:** Mercado Pago informa `charged_back`. `MAPA_ORDEN` lo convierte en `DEVUELTO`; la etapa entonces muestra «Te devolvimos el dinero» y «el pago volvió a tu medio de pago». Un contracargo es una reversa/disputa iniciada por el emisor, no evidencia de que nosotros hayamos emitido una devolución.
- **Por qué importa:** la pantalla atribuye una acción a la empresa que el registro no acredita y puede confundir al cliente sobre el estado de su dinero.
- **Arreglo:** distinguir contracargo de devolución en el estado/dato que se registra y redactar la etapa de contracargo según lo que confirma la orden. No presentar `charged_back` como una devolución emitida por nosotros.
- **Cómo comprobarlo:** prueba de decisión y de etapa para `charged_back`: debe seguir distinguiéndose de `refunded` y la frase no debe afirmar que nosotros devolvimos el dinero.

### 4. La prueba del doble clic no cubre la carrera que puede duplicar el cobro

- **Dónde:** `prueba-crear-pedido.mjs:253-278`; `functions/api/pedido.js:262-288`
- **Gravedad:** alta
- **Escenario:** la prueba hace `await` de la primera solicitud antes de iniciar la segunda. En esa secuencia la segunda siempre ve el pedido ya insertado; por eso pasa aunque el código no sea seguro ante dos solicitudes concurrentes. El escenario concurrente del hallazgo 2 sigue sin estar restringido por esta prueba.
- **Por qué importa:** la prueba describe que cubre el doble clic, pero el orden impuesto solo prueba dos envíos consecutivos y deja verde la implementación que abre dos órdenes al recibir ambos clics juntos.
- **Arreglo:** hacer que ambas solicitudes se solapen y sincronizar el mock de D1 para que las dos lecturas terminen antes de permitir cualquier INSERT; verificar también que Mercado Pago reciba una sola clave efectiva.
- **Cómo comprobarlo:** la propia prueba debe fallar con la implementación actual bajo esa barrera y pasar una vez que la reserva concurrente sea atómica.

### 5. Una aserción compara el resultado de la función consigo mismo

- **Dónde:** `prueba-webhook.mjs:403-405`
- **Gravedad:** baja
- **Escenario:** `C.claveDeEvento({ id: 991199 }, 'ORD_X').clave` se compara con otra llamada idéntica. Cualquier implementación determinista que devuelva una clave equivocada —por ejemplo, una constante que ignore el id del aviso— deja verde esa aserción. Hay comprobaciones vecinas que sí detectan que dos recursos distintos deben separarse, pero esta comprobación de reintento por sí sola no demuestra que se conserva la clave correcta.
- **Por qué importa:** es un literal lógico sin una expectativa independiente; aparenta comprobar la repetición sin fijar qué significa que el reintento sea el mismo evento.
- **Arreglo:** comprobar la clave esperada para ese caso concreto (derivada del contrato de clave del evento) y conservar además la comparación entre dos llamadas idénticas.
- **Cómo comprobarlo:** mutar `claveDeEvento` para ignorar `cuerpo.id`; esta aserción debe fallar. La batería también debería seguir comprobando que un id de aviso distinto cambia la clave.

### 6. Dos aserciones de formato pueden seguir verdes con un valor mal formado

- **Dónde:** `prueba-compuerta-boton.mjs:166`; `prueba-crear-pedido.mjs:151`
- **Gravedad:** baja
- **Escenario:** la comprobación de precio de la portada solo busca la subcadena `177.310`, por lo que también pasa si una mutación hace que un precio visible diga, por ejemplo, `$1.177.310`. La comprobación de la URL de checkout solo busca `mercadopago`, por lo que pasa con `https://atacante.invalid/?retorno=mercadopago` aunque no sea una URL de Checkout.
- **Por qué importa:** estas aserciones no fijan por sí solas el valor ni el destino que dicen proteger. Otras aserciones de la página fijan el precio del JSON-LD y una frase del FAQ, pero no sustituyen una comprobación del importe en el texto de compra; la URL proviene del mock de Mercado Pago, así que el test tampoco valida su host.
- **Arreglo:** comprobar el nodo/etiqueta visible de precio contra el total contractual y analizar la URL de pago para exigir HTTPS y el host de Checkout esperado según la respuesta documentada.
- **Cómo comprobarlo:** probar mutaciones que cambien el total visible a `$1.177.310` y que hagan devolver una URL externa con la palabra `mercadopago`; cada aserción correspondiente debe ponerse roja.

### 7. Una mutación puede hacer que `prueba-pedidos.mjs` muera sin cierre

- **Dónde:** `prueba-pedidos.mjs:84-90`
- **Gravedad:** baja
- **Escenario:** si una regresión hace que `congelarContrato` devuelva `informe_json` como texto inválido (por ejemplo, `'{'`), la comprobación de tipo pasa porque sigue siendo una cadena y el `JSON.parse` de la línea 85 lanza fuera de una captura. No se imprimen el total ni la línea de cierre. La línea 89 también puede lanzar al volver a parsear.
- **Por qué importa:** un fallo de prueba queda con aspecto de ejecución interrumpida, igual al síntoma de la línea de cierre que el encargo pide distinguir.
- **Arreglo:** capturar el parseo y convertir el error en una aserción legible («JSON válido»); usar el objeto parseado solo si el parseo tuvo éxito.
- **Cómo comprobarlo:** mutar la serialización para devolver JSON inválido y confirmar que la prueba imprime una falla nombrada y termina con código 1 y resumen.

## Lo que miré y está bien

- No encontré una vía de código para que `POST /api/intake` mueva un pedido a pagado o habilite la entrega antes de ese estado: el UPDATE del intake exige `pagado` o `entregado`; la elegibilidad y el total del checkout se recalculan del lado servidor.
- El webhook verifica firma, relee la orden contra Mercado Pago, comprueba referencia y monto y usa una transición condicional en D1. El reclamo vencido permite recuperar un evento sin procesar aunque falle el borrado; no encontré en esta lectura otra ruta que marque un pedido pagado.
- El enlace privado funciona como credencial portadora de 122 bits generados por `crypto.randomUUID`; las respuestas de pedido omiten correo, RUT, datos de facturación e informe completo. En la ruta revisada no encontré una forma de rodear esa llave para leer o escribir un pedido ajeno.
- Los errores del checkout/intake no devuelven el token de Mercado Pago ni detalles crudos de la API. El checkout solo intenta abrir orden si existe la revisión profunda en KV; sus topes existen si está configurado ese binding. No evalué configuración de producción.
- Literales como `$177.310` / `177310` tienen una base contractual visible (149.000 + IVA), los estados de Mercado Pago son enums que se quieren fijar, y el manifiesto de firma usa un vector publicado. Esas comparaciones no son falsos verdes solo por ser literales. La aserción tautológica citada arriba y la prueba secuencial del doble clic sí son huecos concretos.
- Los literales exactos de monto total en las aserciones de JSON-LD, los importes neto/IVA y el vector de firma publicado están respaldados por el precio contractual o por el contrato externo que esas pruebas quieren fijar. Los huecos de valores literales que sí pude concretar son la comparación de una función consigo misma en el webhook, la mera subcadena en el precio y el fragmento de URL anterior; no encontré razón para llamar falsos verdes a los otros literales enumerados en las pruebas enfocadas del encargo.
- La mayoría de las pruebas termina con resumen y código de salida. Además de `prueba-pedidos.mjs`, las extracciones `JSON.parse` de `prueba-compuerta-boton.mjs` podrían lanzar si una mutación rompe el formato HTML/JSON que extraen; no comprobé una mutación concreta que afecte ese caso. No lo cuento como hallazgo confirmado.
