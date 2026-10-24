# Resultado · Pago de prueba de Verifica y Cumple

**Responde a:** `INSTRUCCIONES-sesion-mercado-pago-pago-de-prueba.md`
**De:** la sesión de Mercado Pago · 24-oct-2026
**Estado (actualizado, ver «Pago de prueba real» al final):** **el pago se acreditó y el formato de la firma quedó CONFIRMADO contra una notificación real.** Lo que falta es operativo: el secreto cargado en Cloudflare no es el que firmó esa notificación (ver abajo).

> La primera versión de este archivo decía que el pago no llegaba a Mercado Pago (502). Era el token vacío, ya resuelto por la sesión del checkout. Esa sección se deja como historia.

## Hecho (verificado)

- **Paso 1 del documento:** webhook configurado en la **cuenta de prueba vendedora** (TestApp `7038352161250325`), pestaña Producción, URL `https://verifica.spindlelab.cl/api/webhook-mp`, solo **Order (Mercado Pago)**. Ramón confirmó que quedó guardado.
- **Paso 2:** ya existía una cuenta compradora de prueba (Chile, rol Comprador). No se creó otra.
- **Preflight:** `POST /api/intake` con id inexistente → **404** (desplegado).
- **Despliegue vigente en producción:** `88f97123-abe7-432f-96e1-307d442f44c3` (rama `laboratorio/ley-21719`, commit `5006f6c`). El `tail` hay que apuntarlo a ese id; el anterior (`c06153e7`) ya no recibe tráfico.

## Lo que pasó al intentar comprar (del tail)

Dominio medido: `www.claseejecutiva.uc.cl` (`/api/chequeo`, `/api/profundo`, `/api/doce-puntos` → 200, o sea que la medición terminó). Luego, desde el navegador de Ramón:

- `POST /api/pedido` → **502** (varias veces) y al final **429** (el tope de intentos se activó por los reintentos seguidos).
- **Nunca apareció** un `POST /api/webhook-mp` de Mercado Pago. Coherente: sin orden creada no hay notificación.

## Diagnóstico

El 502 sale de `functions/api/pedido.js` cuando `crearOrdenMP(...)` devuelve `!ok`: **Mercado Pago rechazó o no pudo abrir la orden.** El handler oculta el motivo en la respuesta y no deja nada en logs (el tail trae `logs: []`), así que **desde afuera no se ve qué contestó Mercado Pago**.

Hipótesis principal, la que el encargo original ya advertía (§2): `POST /v1/orders` con el **Access Token de prueba** devuelve `401 invalid_credentials`, porque la referencia de Create order dice «no hay soporte para credenciales de prueba; usar usuarios de prueba con credenciales de producción». **No está confirmado**; el 502 también cuadraría con un 400 por el cuerpo de la orden, o con un correo/monto inválido.

## Lo que hace falta (decisión y código de la sesión del checkout)

1. **Hacer observable el fallo.** En la rama de `!creada.ok`, dejar en `console.log` (visible por el tail) el `status` HTTP y el código/mensaje de error que devuelve Mercado Pago, **sin el token ni el cuerpo completo**. Sin eso estamos adivinando.
2. Con ese dato:
   - Si es `401 invalid_credentials` → el camino es usar **credenciales de producción** de la aplicación con **usuarios de prueba** para pagar. Eso implica generar las credenciales de producción, y el encargo original dice **no activar producción** hasta tener endpoint, política v1.6 y facturación de la SpA. **Es una decisión de Ramón**, no se toma sola.
   - Si es 400 → corregir el cuerpo de la orden con el mensaje exacto.
3. Mientras tanto, **esperar unos minutos** antes de reintentar: el 429 es un tope de intentos.

## Intentado y no resuelto

Se intentó leer el motivo llamando a `GET /v1/orders/<id inexistente>` con el token desde el navegador; el token no está disponible en la página (solo se muestra enmascarado) y no se forzó revelarlo. No hay otra forma de ver la respuesta de Mercado Pago sin tocar el handler.

---

## Pago de prueba real (24-oct) — lo que se hizo y lo que salió

**Flujo:** dominio medido `www.udp.cl` → «Quiero el kit» → «Ir a pagar» → checkout de Mercado Pago (`ORDTST…`, TST de test) → login con la cuenta compradora de prueba → Mastercard de prueba `**** 2580`, titular `APRO` → **«¡Listo! Tu pago ya se acreditó»**, operación `#185892855010`, $177.310. En la cuenta vendedora de prueba aparece «Venta · Kit de implementación · Aprobado +$177.310».

- `POST /api/pedido` → **200** (ya no 502).
- Pedido: `vyc_228831919bfa4ba397423a89b82d2315`. Orden de Mercado Pago: `ORDTST01M5Q7SBSB37C4KBSYDKXZXSGA`.
- El estado final del pedido en pantalla **no se registró** (pendiente que Ramón lo cuente).

### La notificación real (capturada con `wrangler pages deployment tail`, despliegue `bf677589…`)

Llegaron **dos** `POST` a `/api/webhook-mp`, con 1 segundo de diferencia, ambos respondidos **401**:

- URL: `/api/webhook-mp?data.external_reference=vyc_228831919bfa4ba397423a89b82d2315&data.id=ORDTST01M5Q7SBSB37C4KBSYDKXZXSGA&type=order`
  → **`data.id` llega en MAYÚSCULAS**; trae además `data.external_reference` y `type=order`.
- `user-agent: MercadoPago WebHook v1.0 order`, `content-type: application/json`, `content-length: 756`, `referer: https://mercadopago.com.ar`.
- `x-signature: ts=1792855425,v1=1990556e84965aeaf0d1686c456fe232bc54faa4fcdbd3fb80bdec61193927c2` y `x-request-id: 3ff28d90-b859-4008-984e-d3a09843a6a9`.
- Segunda: `ts=1792855426,v1=2836977fda1757d5ad4c83f2538256382985ee7e752edd57138f15b68ff1a5ab`, `x-request-id: bf373833-95f1-4b60-bce7-5b4a9927d3d5`.
- El cuerpo (756 bytes) no sale en el tail; no hizo falta para la firma.

### Las tres cosas, confirmadas contra una petición real

Con la **Firma secreta de la pestaña Producción de la cuenta de prueba vendedora** (TestApp `7038352161250325`) se recalculó el HMAC sobre las dos notificaciones y **coinciden las dos** con este manifiesto, exactamente el que implementa el handler:

```
id:<data.id en MINÚSCULAS>;request-id:<x-request-id>;ts:<ts>;
```

1. `data.id` **en minúsculas** en el manifiesto (aunque llegue en mayúsculas en la URL). ✅
2. Etiqueta **`request-id`**, no `x-request-id`. ✅
3. **Punto y coma final**. ✅

**El handler no necesita ningún cambio de formato.**

### Por qué el handler dio 401 igual

**El secreto cargado en Cloudflare (`MP_WEBHOOK_SECRET`) es el de la aplicación principal `App-Checkout-Pro` (`8671857492523196`), no el de la cuenta de prueba vendedora.** El webhook que dispara estas notificaciones se configuró en la cuenta de prueba (paso 1 del documento), y Mercado Pago firma con **la firma secreta de esa cuenta/aplicación**. Se comprobó que ninguna variante calza con el secreto de la aplicación principal.

- Para que el flujo de prueba dé 200, hay que cargar la firma secreta del webhook de la **pestaña Producción de TestApp** en `MP_WEBHOOK_SECRET` y **hacer un despliegue nuevo** (en Pages un secreto nuevo lo toma el próximo despliegue).
- ⚠️ Ese valor es **solo para el flujo de prueba**. Cuando se abra producción de verdad, `MP_WEBHOOK_SECRET` tiene que ser la firma secreta del webhook de Producción de la aplicación **real**, y habrá que recargarlo. No se deben mezclar.
- Ramón puede cargarlo sin pasarlo por ningún chat: copiar el valor del panel y pegarlo cuando `wrangler pages secret put MP_WEBHOOK_SECRET --project-name verificaycumple` lo pida.

### Pendiente

- Tras cargar el secreto y desplegar, **repetir el pago** para ver el 200 de punta a punta y el cambio de estado del pedido (`creado → pagado`).
- Probar el pago **pendiente** con titular `CONT` (debe decir «Tu pago está en camino», no «confirmado»).
- Si aparece `action_required`, avisar: cambia el producto.
