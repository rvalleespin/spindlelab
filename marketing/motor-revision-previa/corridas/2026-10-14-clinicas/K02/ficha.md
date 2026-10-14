# Ficha K02

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-14T22:02:51.679Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _clck, _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clsk.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics, Microsoft Clarity); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _clck, _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clsk. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

_Vacía._

## Capa 1 (contexto)

- con consecuencia: sin_ruta_de_contacto_visible
- higiene: sin_llms_txt

## Notas

- La respuesta con agente normal no fue estable o los agentes discreparon entre rondas.

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
