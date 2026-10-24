# Resultado · Probar el webhook con una notificación real

**Responde a:** `ENCARGO-probar-el-webhook-con-una-notificacion-real.md`
**De:** la sesión de Mercado Pago · 24-oct-2026
**Estado:** **brecha a medias.** Webhook de prueba configurado y operativo. La simulación del panel SÍ llega (se capturaron dos peticiones reales), pero el panel no muestra respuesta y **su firma no coincide con ningún formato probado**. El secreto de Cloudflare sí es el del panel. Lo que sigue sin confirmarse es el formato del manifiesto contra una notificación de un pago real.

> **Actualización (más abajo, sección «Captura real y diagnóstico»)** corrige la lectura de «no llegó nada».

---

## Lo que se comprobó

- **Endpoint desplegado.** `GET https://verifica.spindlelab.cl/api/webhook-mp` → **405**. Una ruta inventada (`/api/ruta-inventada-xyz`) → **404**, así que el 405 no es la portada respondiendo 200.
- **El handler recibe y rechaza sin firma.** `POST` sin cabeceras de firma, con `?data.id=ord01simulacion&type=order` y cuerpo `{"type":"order","data":{"id":"ORD01SIMULACION"}}`:
  `HTTP/2 401`, cuerpo `{"ok":false,"motivo":"sin-cabecera"}`, `cache-control: no-store`.
  Esto prueba que la petición llega al handler (no a la 404 del sitio). **No** prueba nada sobre una petición firmada por Mercado Pago.
- **Webhook de prueba guardado en el panel** (aplicación `8671857492523196`, pestaña Prueba): URL `https://verifica.spindlelab.cl/api/webhook-mp`, **solo "Order (Mercado Pago)" marcado**, "Pagos (legacy)" y el resto sin marcar. El panel mostró "Configuraciones guardadas" y al recargar la configuración persistía.

## Lo que NO se pudo comprobar

- **Simulación desde el panel.** Se abrió "Simular notificación", se eligió tipo Order (Mercado Pago), Data ID `ORD01SIMULACION000000000000`, y Ramón pulsó **Enviar**.
  **El panel no mostró ningún código, mensaje ni cierre con confirmación.** La sección "Notificaciones enviadas" de la pestaña Webhooks de la aplicación quedó en "No se encontraron notificaciones" (período 18 al 24-oct).
  No sabemos si la simulación salió y el panel no la muestra, o si no salió. **No hay ninguna captura de petición** (cabeceras, URL, cuerpo), así que las tres cosas que el encargo quería confirmar contra una petición real siguen sin confirmar: `data.id` en minúsculas, etiqueta `request-id` y punto y coma final.
- **El panel no muestra la petición cruda** en ningún lugar visible, ni siquiera cuando sí envía.

## Para ver la petición real

Dos caminos, y los dos son decisión de la sesión que escribió el handler (el encargo dice que esta sesión no lo toca):

1. **Registro temporal** en el handler (o en un Worker aparte) que vuelque cabeceras, URL y cuerpo de lo que llegue a `/api/webhook-mp`, sin el secreto. Leerlo en los logs de Cloudflare tras la simulación.
2. **Esperar `POST /api/pedido`** y hacer un pago de prueba con la tarjeta de prueba de la aplicación (APRO). Ese camino sí produce una notificación real de Orders. Es el definitivo.

## Notas

- Si el primer intento real da 401 con `no-coincide`: el `MP_WEBHOOK_SECRET` cargado es el de la pestaña **Prueba** de esta aplicación. La pestaña **Producción** tiene su propia firma secreta y su propia URL; no se tocó.
- Producción sigue sin activarse (faltan política v1.6 y facturación de la SpA en el SII).

---

## Captura real y diagnóstico (24-oct, segunda pasada)

**Cómo se capturó, sin tocar el handler:** `npx wrangler pages deployment tail <id-del-despliegue> --project-name verificaycumple --format json` (id del despliegue de producción de `wrangler pages deployment list`). El tail entrega **URL con parámetros, todas las cabeceras y el código de respuesta**. No entrega el cuerpo ni el motivo del 401. No hace falta registro temporal en el código para ver la petición.

**Corrección a la sección anterior:** la simulación del panel **sí llegó**. El panel no muestra nada, pero se capturaron dos `POST` reales de Mercado Pago (user-agent `restclient-node/5.3.0`, `baggage: origin_application_name=dx-panel`, IP de Google Cloud/EE.UU.). Forma real de la petición:

- URL: `/api/webhook-mp?data.id=ORD01SIMULACION000000000000&type=order` → **el `data.id` llega tal cual se escribió en el panel (mayúsculas) y `type=order`.**
- Cabeceras: `x-signature: ts=<10 dígitos, segundos>,v1=<64 hex>`, `x-request-id: <uuid>`, `content-type: application/json`, `content-length: 613`, `x-retry: 0`, `x-socket-timeout: 22000`.
- Respuesta de nuestro handler: **401** (reproducido idéntico: `{"motivo":"no-coincide"}`).

**Diagnóstico de la firma (lo importante):**

1. Se probaron **2.332 combinaciones** (variantes de manifiesto: `id`/`data.id`, `request-id`/`x-request-id`, separadores `;` `\n` `&` `,`, con y sin cierre, `data.id` en minúscula o tal cual, y la clave como texto, minúscula, base64 y hex) contra las dos firmas del panel, usando **la Firma secreta del propio panel**, calculado dentro de la página sin sacar el secreto. **Ninguna coincide.** Conclusión: **el simulador del panel no firma con la Firma secreta que muestra** (o con un formato que no está documentado). Su 401 NO indica un error del handler y **no sirve para validar el formato**.
2. **El secreto cargado en Cloudflare es el mismo del panel.** Se generó, dentro de la página, una firma válida con la Firma secreta del panel para una petición inventada (manifiesto en el formato documentado y que implementa el handler) y se envió al endpoint real: **no dio 401**, pasó la verificación y el handler siguió al paso 3 (leer la orden). Respondió `503 {"motivo":"no-se-pudo-leer:http-400"}` porque el id inventado no existe en Mercado Pago. El 400 (no 401) sugiere además que el Access Token cargado es aceptado por la API, pero **no está probado con una orden real**.
   - ⚠️ Esta prueba usa **el mismo supuesto de formato que el handler** (`id` en minúscula, `request-id`, `;` final), así que confirma el **secreto**, no el **formato**. Eso solo lo confirma una notificación de un pago real.
3. Efecto secundario de la prueba: un evento de prueba (`ord01pruebafirma00000000000`) pasó por el handler. Como respondió 503, el handler debe haberlo soltado; si queda una fila en `eventos` con esa clave, es de esta prueba.

**Lo que queda por confirmar (solo con un pago de prueba real):** `data.id` en minúscula en el manifiesto, etiqueta `request-id`, punto y coma final. Como el simulador firma distinto, **no se puede cerrar con el panel**.

## Qué hacer ahora (para la sesión del checkout)

- Cuando exista `POST /api/pedido`, hacer un pago de prueba con la tarjeta APRO y mirar el tail en vivo. Si da `no-coincide`, esa captura sí es una notificación firmada de verdad y el formato se corrige con ella.
- Dejar el **webhook de Producción** del panel para después: tiene su propia firma secreta y su propia URL; no se tocó.
