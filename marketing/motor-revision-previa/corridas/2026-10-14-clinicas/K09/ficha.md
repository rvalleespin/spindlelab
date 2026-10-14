# Ficha K09

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-14T22:13:13.255Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga_LD4P08R0K7, _ga.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _ga_LD4P08R0K7, _ga. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

### C2 · Medición instalada sin ningún evento de conversión
- **estado:** sospecha (Las conversiones marcadas dentro de la propiedad de GA4 son invisibles desde afuera: nunca pasa de sospecha.)
- **línea:** Acompañamiento · **lo comprueba:** el dueño, con acceso a su Google Analytics
- **dónde mirar:** En Google Analytics: Administrar > Eventos (y cuáles están marcados como clave). Del lado del sitio: Tag Assistant o el contenedor de Tag Manager, buscando alguna etiqueta de evento.
- **se puede afirmar:** El sitio no envía ningún evento de conversión que se vea desde afuera (ni etiqueta de evento en el contenedor, ni evento en el código).
- **NO se puede afirmar:** "no mides" o "no tienes conversiones" (una regla del panel de Analytics puede estar convirtiendo visitas sin etiqueta en el sitio); que "tus cifras están mal"
- **advertencias:** Sin clics (§3) el motor no ve qué se dispara al enviar un formulario.
- **cuatro condiciones:**
  - **1** (✔): El dueño ve cifras de visitas y cree que mide.
  - **2** (◐): Cuesta plata solo si se decide algo con esas cifras.
  - **3** (◐): Requiere acceso a su propiedad de Analytics.
  - **4** (✔): Se lee el contenedor de Tag Manager y el código de la página; no lo entrega una API.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: sin_llms_txt, sin_entidad_en_jsonld

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
