# Ficha L20

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-15T14:30:31.678Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **capa:** 2 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva, mirar las cookies (candado > Cookies, o F12 > Application > Cookies) sin tocar nada ~10 s, y de nuevo tras mover el mouse y bajar por la página. Algunas aparecen solo tras el primer gesto.
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _gcl_au, _ga_Q58BSVKWC1, _ga, _ga_KR22X7736F.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Ads, Google Analytics, Hotjar, Microsoft Clarity); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **advertencias:** Cambiaron entre corridas y por eso quedan fuera: _tt_enable_cookie, _ttp, _fbp, _clck, _clsk.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin aceptar nada ni hacer un solo clic. Bastó mover el mouse para que quedaran en mi navegador cookies de Google.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _gcl_au, _ga_Q58BSVKWC1, _ga, _ga_KR22X7736F.
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
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _gcl_au, _ga_Q58BSVKWC1, _ga, _ga_KR22X7736F. Se describe la señal, no la obligación.
  - **3** (◐): Comprobable, pero hay que explicar que aparecen tras mover el mouse.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

### F7 · Enlaces de la portada que llevan a páginas que no existen
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** el dueño, haciendo clic
- **dónde mirar:** Hacer clic en los enlaces de la portada y el menú.
- **se puede afirmar:** 7 enlace(s) internos de la portada responden 404 (revisados 30), en dos rondas.
- **NO se puede afirmar:** que sean todos los rotos del sitio (solo se revisó la portada)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «En tu portada hay 7 enlaces que llevan a páginas que no existen (error 404), por ejemplo /.»
  - **el hecho técnico detrás (no va en el correo):** 7 enlace(s) internos de la portada responden 404 (revisados 30), en dos rondas.
  - **se vende:** Auditoría SEO Técnica, Completa (Auditoría SEO Técnica). Corregir los enlaces rotos de la portada y revisar el resto del sitio.
  - **precio en el correo:** Solo como referencia, no como cotización: Auditoría SEO Técnica, Completa, desde $490.000 + IVA, una vez (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $490.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** media
  - **frase de arreglo:** «Eso se arregla: dejo cada enlace llevando a una página que existe y reviso que no queden más rotos.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (◐): Solo se nota al hacer clic en ese enlace.
  - **2** (◐): Cada clic roto es una visita perdida.
  - **3** (✔): Se prueba con un clic.
  - **4** (✘): Cualquier verificador de enlaces lo ve: es capa 1.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: sin_llms_txt

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
- r3-A.jpg
- r3-B.jpg
- m1-movil.jpg
- m2-movil.jpg
