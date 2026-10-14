# Ficha K02

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-14T22:02:51.679Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _clck, _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clsk.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics, Microsoft Clarity); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de Microsoft y Google.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _clck, _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clsk.
  - **se vende:** Kit de implementación (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio:** Desde $149.000 + IVA, una vez · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
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
