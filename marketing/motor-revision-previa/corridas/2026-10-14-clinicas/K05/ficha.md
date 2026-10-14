# Ficha K05

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-14T22:08:05.197Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _gcl_au, _ttp, _ga_8M1L53V84Y, _ga_XM1ZJZDWWS, _ga_BEB0C0PMTV, _ga, _gid, _gat_UA-35361339-1, _clck, _fbp, _tt_enable_cookie, _clsk, _pin_unauth.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Ads, Google Analytics, Microsoft Clarity); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _gcl_au, _ttp, _ga_8M1L53V84Y, _ga_XM1ZJZDWWS, _ga_BEB0C0PMTV, _ga, _gid, _gat_UA-35361339-1, _clck, _fbp, _tt_enable_cookie, _clsk, _pin_unauth. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

### C5 · La ruta de contacto apunta a algo que no responde
- **estado:** sospecha
- **línea:** Desarrollo Web · **lo comprueba:** el dueño o quien administra el sitio
- **dónde mirar:** El formulario envía a https://www.cela.cl/contact#contact_form, que al pedirlo responde HTTP 404. Probar el envío con un dato de prueba propio.
- **se puede afirmar:** El destino del formulario (https://www.cela.cl/contact#contact_form) responde 404 al pedirlo.
- **NO se puede afirmar:** que "el formulario no funciona" (un GET no es un envío; el motor nunca envía); cuántas consultas se perdieron
- **advertencias:** Tope: la rotura de formulario nunca pasa de sospecha sin probar el envío.
- **cuatro condiciones:**
  - **1** (✔): El dueño ve un formulario o un correo que parecen normales.
  - **2** (✔): Cada consulta enviada por ahí se pierde.
  - **3** (◐): Hay que enviar el formulario para probarlo; el motor nunca lo hace.
  - **4** (◐): La detección estructural es barata; distinguir rotura real de un destino que solo acepta POST exige criterio.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: -

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
