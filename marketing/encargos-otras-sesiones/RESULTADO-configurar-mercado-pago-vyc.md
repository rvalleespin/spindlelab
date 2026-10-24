# Resultado · Configurar Mercado Pago para Verifica y Cumple

**Responde a:** `ENCARGO-configurar-mercado-pago-vyc.md`
**Para:** la sesión que construye el checkout
**De:** la sesión que hizo la configuración en Mercado Pago · 23-oct-2026
**Estado:** aplicación y secretos listos. **Falta tu endpoint** para configurar el webhook.

---

## Lo que quedó hecho (verificado)

- [x] **Cuenta:** a nombre de **SpindleLab SpA** (confirmado por Ramón; el panel muestra "Spindlelab SpA").
- [x] **Aplicación creada:** `App-Checkout-Pro-20261023-2f586c15c8`, ID **8671857492523196**, solución Checkout Pro, **tipo de API: API de Orders** (el selector también ofrecía API de Preferences, que venía por defecto; se eligió Orders porque el checkout usa `/v1/orders`). Nace en entorno de prueba.
- [x] **Secretos cargados** en el proyecto Pages `verificaycumple` (producción). `wrangler pages secret list` muestra los cuatro nombres:
  `CF_ACCOUNT_ID`, `CF_BROWSER_TOKEN`, `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`.
  Ojo: `list` solo prueba que existen, no que no tengan un espacio pegado ni que el valor sea el correcto.
- [x] `wrangler.toml` sin tocar.

## Resolución de la contradicción de eventos (punto 4 del encargo)

El panel de la aplicación ofrece, en **Eventos recomendados para Checkout Pro**: Vinculación de aplicaciones, Reclamos, Pedidos comerciales, Pagos (legacy), Alertas de fraude, Contracargos, Envíos.
En **Otros eventos** aparece **Order (Mercado Pago)**.

**No hay un `payment` a secas**, solo "Pagos (legacy)". Para una aplicación con API de Orders el evento que corresponde es **Order (Mercado Pago)** (tópico `orders`), como dice la guía de notificaciones de Orders. Cuando se configure se marca solo ese; "Pagos (legacy)" queda sin marcar.

## Lo que está pendiente y es tuyo

1. **Construir `functions/api/webhook-mp.js`** (hoy no existe en `functions/api/`). La URL será `https://verifica.spindlelab.cl/api/webhook-mp`.
2. **Avisarle a Ramón cuando esté desplegado.** Verificar con una ruta inventada que no devuelva la portada con 200.
3. Ahí, esta sesión (o quien tenga el panel) guarda la URL de prueba, marca **Order (Mercado Pago)**, guarda y usa **Simular notificación**.

## Lo que sigue abierto y no depende de nadie de acá

- **Primer `POST /v1/orders` de prueba:** aún no se probó el Access Token. Si devuelve `401 invalid_credentials`, es la ambigüedad documentada en el encargo (§2): ir por usuarios de prueba con credenciales de producción.
- **Producción:** no se activa hasta tener el endpoint, la política v1.6 publicada y la facturación de la SpA activa en el SII.
- **Devoluciones:** el checklist de paso a producción exige probar cancelación y reembolso; depende de `tres-decisiones-kit-verifica.md`.

## Higiene

Por un pegado en el lugar equivocado, el **Access Token de prueba** pasó por el prompt de zsh de Ramón (no se subió a ningún lado; no estaba en `~/.zsh_history` al revisarlo). Es un token de prueba. Si se quiere cerrar del todo, se regeneran las credenciales de prueba en el panel y se vuelve a cargar `MP_ACCESS_TOKEN`.
