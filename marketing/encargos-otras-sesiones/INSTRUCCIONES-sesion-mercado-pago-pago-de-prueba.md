# Para pegar en la sesión de Mercado Pago

El checkout está desplegado. Falta una sola cosa para cerrar la parte técnica, y es tuya: **un
pago de prueba de punta a punta**, para capturar una notificación firmada de verdad.

---

## Antes de empezar: comprueba que está arriba

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST -H 'content-type: application/json' \
  -d '{"id":"vyc_00000000000000000000000000000000"}' https://verifica.spindlelab.cl/api/intake
```

**404** significa desplegado (el id no existe, que es lo correcto). Si da **405**, el despliegue
todavía no terminó: espera y repite.

---

## 1. El paso del panel que falta, y es el primero

En tu informe anterior quedó citado nuestro propio comentario: «Test payments, created with test
credentials, will not send notifications». Lo verifiqué contra la documentación actual y **no
está zanjado para la Orders API**, pero apareció un paso concreto que no se hizo:

> Si estás desarrollando con credenciales de prueba, entra a **Tus integraciones → Datos de
> integración → Credenciales de prueba**, **inicia sesión en Mercado Pago Developers con el
> usuario y la contraseña de esa cuenta de prueba**, y configura los **Webhooks en modo
> producción para esa cuenta**.

Hoy el webhook está en la pestaña **Prueba** de la aplicación principal (`8671857492523196`), que
es otra cosa. **Haz eso primero.** Si el pago de prueba no dispara nada, ahí es donde hay que
mirar antes de sospechar del handler.

La URL es la misma: `https://verifica.spindlelab.cl/api/webhook-mp`, y el evento sigue siendo
solo **Order (Mercado Pago)**.

---

## 2. Crear la cuenta compradora de prueba

En **Tus integraciones → la aplicación → Cuentas de prueba → + Crear cuenta de prueba**. El país
tiene que ser el mismo que el de la vendedora. Guarda su usuario y contraseña: vas a iniciar
sesión con ella en el navegador para pagar.

---

## 3. El pago de prueba

1. Abre `https://verifica.spindlelab.cl/` e ingresa un dominio que tenga rastreadores y no tenga
   gestor de consentimiento, para que el chequeo ofrezca el kit. **Deja que termine también la
   revisión con navegador**: sin ella el checkout contesta 409 `sin-medicion` a propósito,
   porque no se puede cotizar lo que no se midió.
2. Pulsa **«Quiero el kit →»**. Se abre ahí mismo un paso con dos campos: correo y una casilla de
   consentimiento. Pon el correo de la cuenta compradora de prueba.
3. Pulsa **«Ir a pagar»**. Te lleva a Mercado Pago.
4. Inicia sesión con la **cuenta compradora de prueba** y paga con la tarjeta de prueba **chilena**
   (las de Argentina no sirven), poniendo **`APRO`** como nombre del titular. El documento en
   Chile es «otro» con `123456789`, y tiene que ser el mismo de la cuenta compradora.
5. Deberías volver solo a `https://verifica.spindlelab.cl/pedido/?id=vyc_...`. **Guarda ese
   enlace**: es la pantalla del pedido y no hay otra forma de volver a ella.

### Mientras pagas, deja el tail corriendo

```bash
cd /Users/ramon/vyc-ley21719/verificaycumple
npx wrangler pages deployment list --project-name verificaycumple   # saca el id del de Production más nuevo
npx wrangler pages deployment tail <ID> --project-name verificaycumple --format json
```

Es como capturaste las peticiones la vez pasada, y entrega URL con parámetros, todas las
cabeceras y el código de respuesta.

---

## 4. Lo único que necesito de vuelta

**La petición entera de la notificación**, tal cual:

- todas las cabeceras, con `x-signature` y `x-request-id` **completos, sin truncar**;
- la URL con sus parámetros (`data.id`, `type`);
- el cuerpo entero.

Con eso cierro las tres cosas que hoy solo están comprobadas contra la documentación y no contra
una petición real: que el `data.id` vaya **en minúsculas** en el manifiesto, que la etiqueta sea
**`request-id`** y no `x-request-id`, y que lleve **punto y coma final**.

> **El secreto de la firma no me lo mandes.** No lo necesito y no lo voy a usar: ya está cargado
> como `MP_WEBHOOK_SECRET` y confirmado. Lo que necesito es la petición, no la clave.

Y dime **en qué estado quedó el pedido**: abre tu enlace `/pedido/?id=...` y cuéntame qué título
muestra.

---

## 5. Tres cosas que cambiaron de mi lado y te afectan al probar

- **`action_required` ya no mueve el pedido**, y sale marcado para **revisar**. La documentación
  lo define como «falta una acción del integrador, por ejemplo capturar un pago autorizado», o
  sea que el que tiene que actuar somos nosotros. **Si ese estado aparece en tu prueba, avísame
  de inmediato**: significaría que el modo `manual` de la Orders API exige capturar a mano, y eso
  cambia el producto, no solo el código.
- **Un contracargo ya no se muestra como una devolución nuestra**, porque no lo es.
- **La orden ahora vence en 24 horas** y hay una sola compra abierta por sitio y correo a la vez,
  con un índice en la base que lo garantiza. Si intentas comprar dos veces seguidas con el mismo
  correo y el mismo dominio, es correcto que te devuelva el **mismo** enlace de pago.

---

## 6. Si quieres probar también el pago pendiente

Repite el paso 3 con la tarjeta cuyo titular es **`CONT`**. El pedido tiene que quedar en estado
`pendiente` y la pantalla decir **«Tu pago está en camino»**, no «confirmado». Si dice
«confirmado», avísame: sería un defecto.

---

## 7. Lo que NO hay que hacer todavía

- **No actives el webhook de Producción** del panel. Tiene su propia firma secreta y su propia
  URL, y producción no se abre hasta que estén la política publicada y la facturación de la SpA
  activa en el SII.
- **No toques el código del handler.** Si algo no calza con la petición real, mándame la captura
  y lo ajusto yo con su prueba, para que el arreglo y la prueba no salgan del mismo supuesto.

---

## Dónde dejas la respuesta

En `marketing/encargos-otras-sesiones/RESULTADO-pago-de-prueba-vyc.md`, con la captura de la
petición pegada tal cual.
