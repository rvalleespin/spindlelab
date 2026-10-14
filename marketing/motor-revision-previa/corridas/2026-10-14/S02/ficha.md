# Ficha S02

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-14T21:06:09.728Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga_8ZYSJNWHXJ, _ga.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _ga_8ZYSJNWHXJ, _ga. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

### C4 · El nombre del negocio no es el mismo dentro del sitio
- **estado:** sospecha (El cruce con la ficha de Google y LinkedIn es manual: nunca pasa de sospecha.)
- **línea:** Visibilidad en IA · **lo comprueba:** el dueño, buscando su propio nombre
- **dónde mirar:** Buscar el nombre del negocio y comparar con: JSON-LD name: Amgestemp / og:site_name: Gestión Contable y Asesoría Tributaria Chile | AM Gestión Empresarial. Después, la ficha de Google y LinkedIn (a mano).
- **se puede afirmar:** Dentro del sitio el nombre aparece como: JSON-LD name: Amgestemp y og:site_name: Gestión Contable y Asesoría Tributaria Chile | AM Gestión Empresarial.
- **NO se puede afirmar:** que ocurre lo mismo en Google o LinkedIn (no revisado)
- **cuatro condiciones:**
  - **1** (✔): Cada pieza se ve bien por separado.
  - **2** (◐): El costo (que ningún modelo consolide quién es) es blando.
  - **3** (✔): Se compara a simple vista.
  - **4** (◐): Comparar texto es automático; interpretarlo y cruzarlo con otras fuentes es oficio.

## Capa 1 (contexto)

- con consecuencia: sin_analitica
- higiene: -

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
