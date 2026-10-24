# Resultado · Pago de prueba de Verifica y Cumple

**Responde a:** `INSTRUCCIONES-sesion-mercado-pago-pago-de-prueba.md`
**De:** la sesión de Mercado Pago · 24-oct-2026
**Estado:** **el pago de prueba NO llegó a Mercado Pago.** `POST /api/pedido` responde **502** en cada intento. No hay notificación firmada que capturar todavía.

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
