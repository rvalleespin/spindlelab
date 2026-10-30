# Ficha H22

**resultado:** `oferta-capa-1` · motor v0 · 2026-10-30T14:03:45.703Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### F10 · En la primera pantalla no hay cómo contactar, cotizar o comprar
- **capa:** 1 · **estado:** estable
- **línea:** Desarrollo Web · **lo comprueba:** el dueño, mirando la primera pantalla
- **dónde mirar:** Abrir el sitio y, sin bajar, buscar un botón o enlace para contactar, cotizar, escribir por WhatsApp o comprar.
- **se puede afirmar:** En la primera pantalla de la portada no hay ningún botón o enlace para contactar, cotizar, escribir por WhatsApp o comprar.
- **NO se puede afirmar:** que no exista contacto más abajo en la página
- **advertencias:** Mirar la captura del tramo A (escritorio) antes de usarlo: la heurística busca palabras de acción, y un botón con otro texto no cuenta.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «En la primera pantalla de tu sitio no hay ningún botón para contactarte, cotizar o escribir por WhatsApp.»
  - **el hecho técnico detrás (no va en el correo):** En la primera pantalla de la portada no hay ningún botón o enlace para contactar, cotizar, escribir por WhatsApp o comprar.
  - **se vende:** Desarrollo Web a medida (Desarrollo Web). Poner una acción de contacto visible en la primera pantalla, en escritorio y en celular.
  - **precio en el correo:** Solo como referencia, no como cotización: Desarrollo Web a medida, página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso se arregla: dejo a la vista, desde la primera pantalla, la forma de escribirte y lo pruebo en el celular.»
  - **puerta a la reunión:** «Vi 2 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (◐): El dueño ve su sitio todos los días y no ve lo que falta.
  - **2** (✔): Quien llega y no ve cómo seguir, se va.
  - **3** (✔): Se ve a simple vista.
  - **4** (✘): Es capa 1.

## Ruta interna (no va en el correo)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **capa:** 2 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga_4BQGE77K4E, _ga.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de Google.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga_4BQGE77K4E, _ga.
  - **se vende:** Kit de implementación de Verifica y Cumple (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio en el correo:** Desde $149.000 + IVA, una vez
  - **servicio publicado más cercano:** Desde $149.000 + IVA, una vez (correos aprobados 23-sep y estrategia §1) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _ga_4BQGE77K4E, _ga. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

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
