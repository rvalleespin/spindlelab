# Resultado · Probar el webhook con una notificación real

**Responde a:** `ENCARGO-probar-el-webhook-con-una-notificacion-real.md`
**De:** la sesión de Mercado Pago · 24-oct-2026
**Estado:** **brecha NO cerrada.** Webhook de prueba configurado; la simulación del panel no entregó ninguna respuesta visible, así que no hay petición real que verificar.

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
