# Encargo · Configurar Mercado Pago para el cobro de Verifica y Cumple

**Para:** la sesión que va a hacer la configuración en Mercado Pago
**De:** la sesión que está construyendo el checkout · 23-oct-2026
**Qué hay construido ya:** la compuerta de venta, la verificación de firma del webhook y el
esquema de pedidos, con 2.581 afirmaciones de prueba en verde. Falta conectar la cuenta.

> Todo lo técnico de acá sale de la documentación oficial de Mercado Pago leída el 23-oct-2026,
> con su URL. **No está escrito de memoria.** Donde la doc se contradice consigo misma, se dice.

---

## 0. Antes de tocar el panel: una pregunta que no es técnica

**¿La cuenta de Mercado Pago está a nombre de SpindleLab SpA (RUT 78.474.925-8) o de Ramón como
persona natural?**

No es un detalle administrativo. El kit es un contrato nuevo, así que lo cobra la SpA, y la plata
tiene que llegar a la SpA. Si la cuenta es personal, el dinero entra al bolsillo equivocado y
después hay que arreglarlo con una transferencia que no tiene respaldo de la venta.

Y encadenado con eso: **la facturación electrónica de la SpA sigue pendiente de activación en el
SII.** Sin eso no se puede emitir documento, con checkout o sin él. Ese trámite va antes que todo
lo demás de este encargo.

---

## 1. Crear la aplicación

En el panel de desarrolladores: **Tus integraciones → crear aplicación.**

- Producto: **Checkout Pro**.
- Al crearla se generan automáticamente las credenciales de prueba.

Esto no mueve plata ni publica nada. Es seguro hacerlo antes de que el resto esté listo.

---

## 2. Las credenciales, y la primera contradicción de la doc

Cada aplicación tiene **dos juegos de credenciales** y un selector de entorno Prueba/Producción.
Lo que distingue un entorno del otro **no es la URL ni un parámetro**: es cuál Access Token se
usa. El endpoint es el mismo, `https://api.mercadopago.com/v1/orders`.

⚠️ **Ojo con esto, porque desorienta:** la doc dice que para Checkout Pro con Orders *«el Access
Token de prueba empieza con el prefijo APP_USR»*. O sea que **el prefijo no distingue prueba de
producción**. Lo que marca el entorno es el campo `live_mode` de las respuestas.

⚠️ **Y acá la doc se contradice consigo misma.** La tabla de errores de la referencia de *Create
order* describe el 401 `invalid_credentials` así, literal:

> *«There is no support for test credentials. Use test users with production credentials for the
> sandbox environment and your production credentials for the production environment.»*

Eso choca de frente con la página de credenciales y la de testing, que mandan usar las
credenciales de prueba de la aplicación. **No se pudo resolver cuál rige hoy.**

**Implicación práctica:** si el primer POST a `/v1/orders` con el Access Token de prueba devuelve
`401 invalid_credentials`, **no es un error del código**. Es esta ambigüedad, y el camino es
activar el entorno de producción y usar **usuarios de prueba** con las credenciales de producción.

---

## 3. Cómo se cargan los secretos (importante)

Van dos secretos, y **ninguno de los dos se escribe en un archivo del repositorio, ni se pega en
un chat, ni se manda por correo**:

```bash
cd ~/vyc-ley21719/verificaycumple
npx wrangler pages secret put MP_ACCESS_TOKEN
npx wrangler pages secret put MP_WEBHOOK_SECRET
```

Cada comando **pide el valor por teclado** y no lo deja en el historial. Es el mismo mecanismo con
que ya están cargados `CF_ACCOUNT_ID` y `CF_BROWSER_TOKEN`.

⚠️ **No agregar un bloque `[vars]` a `wrangler.toml`.** Está documentado en los comentarios de ese
archivo y costó dos incidentes: poner variables ahí vuelve al archivo la fuente de verdad del
entorno completo, y los secretos del proyecto **dejan de sobrevivir a un build desde Git**. Se
cargan bien, se ven, y al siguiente despliegue desaparecen.

---

## 4. El webhook: qué configurar, y CUÁNDO

En el panel: **la aplicación → Configuración de Webhooks → interruptor Prueba/Producción → la URL
HTTPS de cada entorno → elegir el evento → Guardar.** Al guardar se genera la **Firma secreta**,
que es el valor de `MP_WEBHOOK_SECRET`.

**La URL será:**
```
https://verifica.spindlelab.cl/api/webhook-mp
```

⚠️ **Todavía no existe.** El endpoint está por construirse. Mercado Pago no valida la URL al
guardarla —la doc dice textual que *«esta URL no es validada por los sistemas»*— así que se puede
configurar antes, pero las notificaciones van a fallar hasta que el endpoint esté. **Coordinar
antes de activar el tópico**, para no generar reintentos a una URL muerta.

⚠️ **Y la segunda contradicción de la doc, sobre qué evento activar.** La página de notificaciones
de Orders dice seleccionar **«Order (Mercado Pago)»** (tópico `orders`). Pero la tabla general de
webhooks dice que `orders` es para Checkout API, Point y QR, y que el tópico de **Checkout Pro** es
`payment`, con `action` = `payment.created` / `payment.updated`.

**No lo resuelvas por lógica: míralo en el panel.** La lista de eventos que ofrece la aplicación
creada como Checkout Pro es la respuesta. Si aparecen los dos, actívalos y anótalo acá: el
verificador de firma que ya está escrito funciona igual para los dos, byte por byte, eso sí está
confirmado en cuatro páginas distintas.

---

## 5. Qué NO hacer

- **No activar el entorno de producción** hasta que el endpoint del webhook exista, la política de
  privacidad v1.6 esté publicada y la facturación de la SpA esté activa.
- **No pegar el Access Token ni la Firma secreta** en un archivo, un chat o un correo. Van por
  `wrangler pages secret put`, que los pide por teclado.
- **No usar el Public Key** para llamar la API. El `Authorization: Bearer` lleva el Access Token
  privado, que nunca sale del servidor.
- **No tocar `wrangler.toml`** más allá de lo que ya tiene, salvo para el enlace de la base D1
  cuando llegue ese momento (eso lo hace la sesión que construye).

---

## 6. Para cuando toque probar

El checklist oficial de paso a producción pide cuatro cosas, y conviene tenerlas a la vista desde
ahora:

1. Que `POST /v1/orders` devuelva un `checkout_url` válido y redirija bien.
2. Que el webhook esté configurado y se procese.
3. Que se esté mandando la cabecera `X-Idempotency-Key`.
4. Que los flujos de **cancelación y reembolso** estén probados.

El cuarto no es un trámite: es el que depende de la decisión de devolución que todavía está
abierta (qué pasa si se cobra y no se puede entregar). Ver
`tres-decisiones-kit-verifica.md`.

Dato útil para esa decisión: una orden en estado `created` **expira a las 24 horas en producción**
(una hora en sandbox) si no se paga. Eso acota solo el abandono antes de pagar, no el caso de
alguien que pagó y no entrega el acceso.

---

## 7. Lo que te va a hacer falta de vuelta

Cuando termines, anota acá:

- [ ] A nombre de quién quedó la cuenta (SpA o persona natural).
- [ ] Qué evento o eventos ofrece el panel, y cuál se activó.
- [ ] Si el Access Token de prueba funcionó, o hubo que ir por usuarios de prueba con
      credenciales de producción.
- [ ] Confirmación de que los dos secretos quedaron cargados (`npx wrangler pages secret list
      --project-name verificaycumple` muestra los nombres, nunca los valores).

---

## Las fuentes

- Crear la orden: `mercadopago.cl/developers/es/reference/online-payments/checkout-pro/create-order/post.md`
- Guía de Orders: `.../docs/checkout-pro-orders/create-order.md`
- Notificaciones de Orders: `.../docs/checkout-pro-orders/notifications.md`
- Webhooks, página general: `.../docs/your-integrations/notifications/webhooks.md`
- Credenciales: `.../docs/your-integrations/credentials.md`
- Paso a producción: `.../docs/checkout-pro-orders/go-to-production.md`
