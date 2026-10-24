# Encargo para la sesión de Mercado Pago: probar el webhook con una notificación real

**De:** la sesión que escribió el código del checkout
**Fecha:** 23-oct-2026
**Depende de:** que el endpoint esté desplegado en producción (ver «Antes de empezar»)

---

## Qué está hecho de este lado

El endpoint existe: **`POST https://verifica.spindlelab.cl/api/webhook-mp`**.

Lo que hace, en orden, y por qué ese orden:

1. **Verifica la firma.** Antes de eso no toca nada, ni siquiera para anotar que llegó algo.
   Si no, cualquiera podría llenar la tabla de eventos desde afuera. Firma inválida → **401**.
2. **Reclama el evento** con un `INSERT OR IGNORE` sobre la clave primaria, que es atómico.
   Si la notificación ya se procesó → **200** con `{"motivo":"repetido"}`, sin rehacer nada.
3. **Relee la orden contra la API** (`GET /v1/orders/{id}`). El cuerpo de la notificación
   **no viene firmado**, así que solo se usa para sacar la clave del evento; nada de lo que
   diga sobre el estado del pago se usa para decidir.
4. **Decide y mueve el pedido.**

Y si algo falla *después* de reclamar el evento, el evento **se suelta** y contesta **503**
para que Mercado Pago reintente. Sin eso, el reintento vería el evento ya registrado, se iría
sin hacer nada, y el pago se perdería en silencio sin dejar rastro en ninguna parte.

### Lo que ya se verificó (no hace falta repetirlo)

- **514 aserciones** en las pruebas de los módulos, con **11 mutaciones comprobadas en rojo**
  (se rompe el código a propósito y se confirma que la prueba lo ve).
- **26 aserciones de punta a punta contra el runtime real de Workers** (`wrangler pages dev`)
  con D1 de verdad: la ruta enruta, un `GET` da 405 con `Allow: POST`, las rutas inventadas dan
  404, las firmas malas dan 401 sin escribir nada, y con firma **válida** y un token de MP
  inválido el handler contestó 503 y la tabla de eventos quedó vacía.
- La firma se comprobó contra el **vector de ejemplo de la documentación** de Mercado Pago.
- El esquema está aplicado en la D1 de producción (2 tablas, 3 índices, 27 columnas), y la
  función de producción ya consulta la tabla correctamente.

### Lo único que no se puede probar sin ti

**Una notificación real de tu cuenta.** El vector de la documentación prueba que el algoritmo
está bien; no prueba que la petición que Mercado Pago manda de verdad tenga la forma que el
código espera. Esa es toda la brecha que queda.

---

## Antes de empezar: comprobar que el endpoint está arriba

El despliegue lo corre Ramón. Comprueba que ya pasó antes de configurar nada:

```bash
curl -s -o /dev/null -w "%{http_code} (esperado 405)\n" -X GET https://verifica.spindlelab.cl/api/webhook-mp
```

- **405** → desplegado, sigue.
- **404** → todavía no está desplegado. No configures el evento en Mercado Pago hasta que dé 405,
  porque las notificaciones se perderían.

---

## Lo que necesito que hagas

### 1. Configurar el evento

En el panel de Mercado Pago, con la URL `https://verifica.spindlelab.cl/api/webhook-mp` y el
tópico **`orders`** (que es el que ya quedó configurado según tu informe anterior, y es el que
el código implementa).

### 2. Simular una notificación desde el panel

Y decirme qué código de respuesta mostró el panel. Lo esperable con la simulación del panel es
un **401** o un **200 con motivo `orden-inexistente`**, y las dos cosas son buenas señales:
significan que la petición llegó al handler y no a la página 404 del sitio.

### 3. Capturar la petición ENTERA — esto es lo importante

Esto es lo único que de verdad necesito, y es lo que no puedo conseguir solo. De la simulación
o de una notificación real, necesito:

- **Todas las cabeceras**, en particular `x-signature` y `x-request-id` tal cual llegaron
  (con el valor completo de `v1`, no truncado).
- **La URL completa con sus parámetros**, sobre todo `data.id` y `type`, tal como vienen.
- **El cuerpo entero** de la petición, sin recortar.

Con eso puedo verificar la firma de punta a punta contra una petición real y confirmar las tres
cosas que hoy solo están comprobadas contra la documentación:

- que el `data.id` del manifiesto va **en minúsculas**;
- que la etiqueta del manifiesto es **`request-id`** y no `x-request-id`;
- que lleva **punto y coma final**.

> ⚠️ **El secreto de la firma no me lo pases.** No lo necesito y no lo voy a usar: ya está
> cargado como secreto del proyecto (`MP_WEBHOOK_SECRET`) y con eso basta. Lo que necesito es
> la petición, no la clave.

### 4. Si todo da 401 y no sabemos por qué

Hay una causa que no se puede ver desde afuera y que ya está cubierta: un secreto pegado con un
espacio o un salto de línea al final **se ve igual que uno correcto** en el panel y produce otro
HMAC. El código ahora lo limpia antes de firmar, así que esa rama ya no debería dar problemas.
Si aun así todo da 401 con motivo `no-coincide`, lo más probable es que el secreto cargado no
sea el del mismo entorno de la aplicación que manda la notificación.

---

## Lo que NO hay que hacer todavía

- **No enviar un pago real.** Todavía no existe el endpoint que crea la orden
  (`POST /api/pedido`), así que una orden pagada no tendría un pedido nuestro contra el cual
  calzar: el webhook la vería como referencia ajena y la ignoraría. Eso es el comportamiento
  correcto, pero no prueba nada útil.
- **No tocar el código del handler.** Si algo no calza con la petición real, pásame la captura
  y lo ajusto yo con su prueba, para que el arreglo y la prueba no salgan del mismo supuesto.

---

## Dónde queda tu respuesta

En `marketing/encargos-otras-sesiones/RESULTADO-probar-el-webhook-con-una-notificacion-real.md`,
con la captura de la petición pegada tal cual.

---

## Actualización del 24-oct: ya existe `POST /api/pedido`, y hay un paso del panel que falta

**El checkout está construido.** Cuando Ramón despliegue, la compra de punta a punta se puede
hacer: el botón del chequeo abre un paso de dos campos, el endpoint crea el pedido y la orden en
Mercado Pago, y la persona vuelve a su pantalla del pedido. Eso es lo que su informe pedía para
cerrar el formato de la firma.

### Un hallazgo que les sirve antes de probar

En el informe de ustedes quedó citado el comentario de nuestro código: «Test payments, created
with test credentials, will not send notifications». Lo fui a verificar contra la doc actual, y
el resultado es que **no está zanjado, pero hay un paso documentado que no se hizo**:

- Para la **Checkout API**, la doc es clara: los pagos con credenciales de prueba **no** disparan
  notificaciones, y por eso se usa «Simular».
- Para la **Orders API**, la guía dice algo distinto y concreto: *si estás desarrollando con
  credenciales de prueba, entra a Tus integraciones → Datos de integración → Credenciales de
  prueba, **inicia sesión en Mercado Pago Developers con el usuario y la contraseña de esa cuenta
  de prueba**, y configura los Webhooks **en modo producción para esa cuenta**. Así vas a poder
  probar las notificaciones correctamente.*

Eso **no** es lo que está configurado hoy: el webhook está en la pestaña **Prueba** de la
aplicación principal (`8671857492523196`), no en el panel de la cuenta de prueba en modo
producción. Si el pago de prueba no dispara nada, ese es el primer lugar donde mirar, antes de
sospechar del handler.

Fuente: la guía de prueba de integración de Checkout Pro / Orders en developers.mercadopago.

### Qué necesito, igual que antes

La **captura de una petición real** —cabeceras, parámetros de la URL y cuerpo entero— de una
notificación de un pago hecho con la tarjeta cuyo titular es `APRO`. Con eso cierro las tres
cosas que hoy solo están comprobadas contra la documentación: el `data.id` en minúsculas en el
manifiesto, la etiqueta `request-id` y el punto y coma final.

El secreto sigue sin hacerme falta.

### Dos cosas más que cambiaron de mi lado y les afectan

1. **`action_required` ya no se trata como «el cliente está pagando».** La doc lo define como
   «Integrator action is required… For example, the capture of an authorized payment», o sea que
   el que tiene que actuar somos nosotros. Ahora el webhook lo deja sin mover el pedido y lo
   marca para REVISAR, que queda escrito en `eventos_mp.resultado`. **Si en una prueba aparece ese
   estado, avísenme**: significa que el modo `manual` de la Orders API exige capturar, y eso
   cambia el producto, no solo el código.

2. **La orden ahora lleva `expiration_time: 'P1D'` y `auto_return: 'approved'`.** O sea que una
   orden que nadie paga pasa a `expired` en un día (y el webhook la trata como rechazo), y quien
   paga vuelve solo al sitio en vez de quedarse en Mercado Pago.

### Para probar la etapa de pago pendiente

Con la tarjeta cuyo titular es `CONT`, que deja el pago en proceso. El pedido tiene que quedar en
estado `pendiente` y la pantalla decir «Tu pago está en camino», no «confirmado».
