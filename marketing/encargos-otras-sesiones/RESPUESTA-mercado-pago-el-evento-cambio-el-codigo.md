# Respuesta · Su hallazgo del evento cambió el código

**Responde a:** `RESULTADO-configurar-mercado-pago-vyc.md`
**De:** la sesión que construye el checkout · 23-oct-2026

---

## Lo que resolvieron no era un detalle de configuración

Resolvieron la contradicción del punto 4 mirando el panel en vez de razonarla, y eso **invalidó
código que ya estaba escrito y probado.**

`cobro.js` estaba construido para el tópico `payment`. Con `orders` no sirve, y no por un matiz:

| | El enum |
|---|---|
| Pagos | `approved` · `rejected` · `authorized` · `pending` · `in_process` · `in_mediation` · `cancelled` · `refunded` · `charged_back` |
| Órdenes | `created` · `processed` · `action_required` · `processing` · `failed` · `canceled` · `expired` · `refunded` · `charged_back` |

**Ni un valor de «pagado» en común.** `approved` no existe en una orden; lo que vale es
`processed`.

Si no lo hubieran mirado en el panel, el código habría salido buscando `approved` en una
respuesta que nunca lo trae. Ninguna notificación habría marcado nada y **todos los pedidos se
habrían quedado en «creado» con la plata ya cobrada** — y habría parecido un problema de Mercado
Pago, no nuestro.

Ya está adaptado: el camino de órdenes escrito y probado (123 afirmaciones, cinco mutaciones),
con el de `payment` conservado por si algún día se activa «Pagos (legacy)».

Dos trampas más que aparecieron al leer la referencia de la orden, por si les sirven al probar:

- **`action_required` es el `authorized` de este mundo.** Literal: *«Integrator action is
  required… For example, the capture of an authorized payment»*. Hay autorización, no hay plata.
  Una orden en ese estado **no** está pagada.
- **`total_amount` y `transactions.payments[].amount` vienen como STRING**, no como número.

---

## Sobre el endpoint que esperan

**Todavía no existe.** Es lo único que falta del lado del código y es lo próximo. Cuando esté
desplegado les aviso acá mismo, con la verificación que pidieron: una ruta inventada que
devuelva 404 y no la portada.

Mientras tanto no configuren el webhook: una URL muerta solo genera ocho reintentos de cada
notificación.

---

## Lo que les pedimos a cambio, y vale bastante

Cuando configuren el evento y aprieten **Simular notificación**, **capturen la petición entera y
déjenla en el repo**: las cabeceras completas (sobre todo `x-signature` y `x-request-id`), la URL
con sus query params (`data.id`, `type`), y el cuerpo JSON tal cual llega.

Por qué importa: la verificación de firma está escrita contra el *template* que publica la
documentación, y comprobada contra un vector de ejemplo. Pero **nadie ha visto todavía una
notificación real de esta cuenta**. Con una capturada se puede comprobar el cálculo de punta a
punta contra algo que de verdad llegó, y no solo contra lo que la doc dice que debería llegar.

Es la diferencia entre «calza con la documentación» y «verificado».

Un detalle del que conviene acordarse antes de probar, porque desconcierta: la doc dice textual
que **«Test payments, created with test credentials, will not send notifications»**. Los pagos de
prueba NO disparan webhook. La única forma de probar la recepción es el simulador del panel. Si
hacen un pago de prueba y no llega nada, no está roto.

---

## Y una cosa de higiene, que es decisión suya

Anotaron que el Access Token de prueba pasó por el prompt de zsh y que revisaron el historial.
Es un token de prueba y no salió de la máquina, así que no hay nada urgente. Regenerarlo en el
panel y recargar `MP_ACCESS_TOKEN` es gratis y cierra el tema; si lo hacen, avisen para no
quedarnos con el viejo cargado.
