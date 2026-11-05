# Ficha G03

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-29T16:30:43.144Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **capa:** 2 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _gcl_au, _ga_6PTX1WKC4B, _ga.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Ads); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de Google.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _gcl_au, _ga_6PTX1WKC4B, _ga.
  - **se vende:** Kit de implementación de Verifica y Cumple (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio en el correo:** Desde $149.000 + IVA, una vez
  - **servicio publicado más cercano:** Desde $149.000 + IVA, una vez (correos aprobados 23-sep y estrategia §1) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Vi otra cosa que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _gcl_au, _ga_6PTX1WKC4B, _ga. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

### F13 · La información de la portada está mal estructurada
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** el dueño, con el código de la página
- **dónde mirar:** Ver el código fuente (clic derecho > ver código) y buscar "<h1"; o contar las palabras de la portada.
- **se puede afirmar:** La portada no tiene un título principal (H1).
- **NO se puede afirmar:** que el resto del sitio tenga el mismo problema; que tenga poco texto en total: solo se cuentan las palabras visibles al cargar la portada, no el texto oculto
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu portada no tiene un título principal.»
  - **el hecho técnico detrás (no va en el correo):** La portada no tiene un título principal (H1).
  - **se vende:** Auditoría SEO Técnica, Completa (Auditoría SEO Técnica). Ordenar la información de la portada: un título principal claro y el contenido que explica la oferta.
  - **precio en el correo:** Solo como referencia, no como cotización: Auditoría SEO Técnica, Completa, desde $490.000 + IVA, una vez (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $490.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso lo arreglo yo: dejo la información ordenada, con un título que diga qué haces y para quién.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✔): La estructura del código no se ve.
  - **2** (◐): Google y la IA usan esa estructura para entender de qué trata la página.
  - **3** (✔): Se ve en el código fuente.
  - **4** (✘): Cualquier auditor SEO gratuito lo ve: es capa 1.

### C5 · La ruta de contacto apunta a algo que no responde
- **capa:** 2 · **estado:** sospecha
- **línea:** Desarrollo Web · **lo comprueba:** el dueño o quien administra el sitio
- **dónde mirar:** El formulario envía a https://singularcoffee.cl/contact#Newsletter--newsletter, que al pedirlo responde HTTP 404. Probar el envío con un dato de prueba propio.
- **se puede afirmar:** El destino del formulario (https://singularcoffee.cl/contact#Newsletter--newsletter) responde 404 al pedirlo.
- **NO se puede afirmar:** que "el formulario no funciona" (un GET no es un envío; el motor nunca envía); cuántas consultas se perdieron
- **advertencias:** Tope: la rotura de formulario nunca pasa de sospecha sin probar el envío.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «SIN REDACTAR: todavía es una sospecha, no se usa en un correo.»
  - **el hecho técnico detrás (no va en el correo):** El destino del formulario (https://singularcoffee.cl/contact#Newsletter--newsletter) responde 404 al pedirlo.
  - **se vende:** Desarrollo Web a medida (Desarrollo Web). Corregir el destino del formulario o del correo y probarlo de punta a punta.
  - **precio en el correo:** Solo como referencia, no como cotización: Desarrollo Web a medida, página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso lo arreglo yo y lo pruebo de punta a punta, para que cada consulta llegue.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✔): El dueño ve un formulario o un correo que parecen normales.
  - **2** (✔): Cada consulta enviada por ahí se pierde.
  - **3** (◐): Hay que enviar el formulario para probarlo; el motor nunca lo hace.
  - **4** (◐): La detección estructural es barata; distinguir rotura real de un destino que solo acepta POST exige criterio.

## Capa 1 (contexto)

- con consecuencia: sin_ruta_de_contacto_visible
- higiene: -

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
- r3-A.jpg
- r3-B.jpg
- m1-movil.jpg
- m2-movil.jpg
