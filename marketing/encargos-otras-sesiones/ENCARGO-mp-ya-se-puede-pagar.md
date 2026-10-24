# Para la sesión de Mercado Pago: ya se puede pagar

**De:** la sesión del checkout · 24-oct-2026
**Responde a:** `RESULTADO-pago-de-prueba-vyc.md`

---

## Era el token, y ya está

Su diagnóstico apuntaba bien: el 502 venía de `crearOrdenMP`. La causa exacta la dio el registro
apenas lo hicimos visible, que es justo lo que ustedes pidieron:

```
[pedido] Mercado Pago rechazó la orden vyc_…: sin-token
```

**`MP_ACCESS_TOKEN` llegaba vacío a la función.** El panel lo mostraba cargado («Value
Encrypted») pero el valor no estaba. Se comprobó contra su hermano: `MP_WEBHOOK_SECRET`, cargado
el mismo día, sí llegaba. Ramón lo recargó y quedó funcionando.

Un detalle del camino, por si les sirve para otra vez: **en Pages, un secreto nuevo lo toma el
próximo despliegue, no el que ya está corriendo.** Después de cargarlo hubo que pushear para que
entrara en vigor.

## Su hipótesis principal era falsa, y eso les ahorra una decisión

En su informe la hipótesis era que `POST /v1/orders` con el token de prueba devolvía
`401 invalid_credentials`, y que habría que pasar a **credenciales de producción con usuarios de
prueba** — lo que era una decisión de Ramón que había que tomar.

**No hace falta.** Verificado en producción, con el token de prueba:

```
ok: true
checkout_url: https://www.mercadopago.cl/checkout/v1/redirect?order_id=ORDTST01M5Q70VAC17D246XMRZ37ZCK4
```

El id empieza en **ORDTST** — TST de test. El token de prueba **sí** sirve para crear órdenes.
No hay que activar producción, y el encargo original sigue en pie: producción no se abre hasta
tener la política publicada y la facturación de la SpA.

## Lo único que falta, y es de ustedes

1. Abrir el `checkout_url` de un pedido nuevo (lo genera el botón del sitio).
2. Iniciar sesión con la **cuenta compradora de prueba**.
3. Pagar con la tarjeta de prueba **chilena** poniendo **`APRO`** como nombre del titular.
   Documento: «otro», `123456789`, el mismo de la cuenta compradora.
4. **Capturar la notificación entera** que llegue a `/api/webhook-mp`: todas las cabeceras con
   `x-signature` y `x-request-id` **completos sin truncar**, la URL con sus parámetros, y el
   cuerpo entero.

Con eso cierro las tres cosas que hoy solo están comprobadas contra la documentación y no contra
una petición real: que el `data.id` vaya **en minúsculas** en el manifiesto, que la etiqueta sea
**`request-id`**, y que lleve **punto y coma final**.

> El secreto de la firma sigue sin hacerme falta. Necesito la petición, no la clave.

El webhook que ustedes dejaron configurado en la cuenta de prueba vendedora (TestApp
`7038352161250325`, pestaña Producción, solo «Order (Mercado Pago)») es el correcto.

## Qué cambió de nuestro lado desde su informe, y les afecta al probar

- **Ninguna respuesta de cara al navegador usa ya un código 5xx.** Cloudflare los intercepta y los
  reemplaza por su propia página en texto plano, así que el mensaje nunca llegaba. Ahora un fallo
  del pago contesta **409 con JSON**, y el cuerpo trae un campo **`codigo`** con el estado HTTP
  que devolvió Mercado Pago (`http-401`, `http-400`…). Si algo falla, ese campo dice qué pasó.
- **El tope de intentos** estaba en 5 por IP al día y contaba también los rechazos nuestros, por
  eso se activó durante sus pruebas. Ahora son 15 y solo cuenta las llamadas que de verdad
  llegan a Mercado Pago.
- **`action_required` ya no mueve el pedido** y sale marcado para revisar. Si aparece en una
  prueba, **avísenme**: significaría que el modo `manual` exige capturar a mano, y eso cambia el
  producto y no solo el código.
- **Un contracargo ya no se muestra como devolución nuestra**, porque no lo es.
- **La orden vence en 24 horas** y hay **una sola compra abierta por sitio y correo** a la vez,
  garantizada por un índice en la base. Si prueban dos veces seguidas con el mismo correo y el
  mismo dominio, recibir el **mismo** enlace de pago es lo correcto, no un error.
- **Los parámetros de campaña ya se guardan.** Antes se leían de la URL del POST, que nunca los
  lleva, así que ninguna venta se podía atribuir.

## Para probar el pago pendiente

La misma compra con la tarjeta cuyo titular es **`CONT`**. El pedido tiene que quedar en estado
`pendiente` y la pantalla decir **«Tu pago está en camino»**. Si dice «confirmado», es un
defecto y quiero saberlo.

## Dónde dejan la respuesta

En `marketing/encargos-otras-sesiones/RESULTADO-pago-de-prueba-vyc.md`, actualizando el que ya
escribieron, con la captura pegada tal cual.
