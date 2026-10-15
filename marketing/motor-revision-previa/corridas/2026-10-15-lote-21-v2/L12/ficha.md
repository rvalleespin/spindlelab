# Ficha L12

**resultado:** `oferta-capa-1` · motor v0 · 2026-10-15T14:23:49.808Z · cloud (IP de datacenter, via proxy)

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
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso se arregla: dejo a la vista, desde la primera pantalla, la forma de escribirte y lo pruebo en el celular.»
  - **puerta a la reunión:** «Vi 2 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
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
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clck, _clsk.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics, Microsoft Clarity); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de Google y Microsoft.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clck, _clsk.
  - **se vende:** Kit de implementación de Verifica y Cumple (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio en el correo:** Desde $149.000 + IVA, una vez
  - **servicio publicado más cercano:** Desde $149.000 + IVA, una vez (correos aprobados 23-sep y estrategia §1) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _ga_QBDE89RCSB, _ga, _ga_494WVNK71K, _clck, _clsk. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

### F12 · La portada descarga demasiado peso
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** quien administra el sitio, con las herramientas del navegador
- **dónde mirar:** En el navegador: F12, pestaña Network, recargar y mirar el total transferido abajo.
- **se puede afirmar:** La portada descarga 17 MB al abrirse (mínimo de las 3 corridas).
- **NO se puede afirmar:** cuánto tarda en abrir para un visitante real (se mide desde un datacenter)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu portada descarga 17 MB solo al abrirse; en un celular con datos eso tarda.»
  - **el hecho técnico detrás (no va en el correo):** La portada descarga 17 MB al abrirse (mínimo de las 3 corridas).
  - **se vende:** Auditoría SEO Técnica, Completa (Auditoría SEO Técnica). Reducir el peso de la portada y medir el antes y el después.
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Desde $490.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso se arregla: dejo la portada liviana y mido cuánto baja.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (✔): Nadie mira cuánto pesa su portada.
  - **2** (◐): En un celular con datos, una portada pesada tarda en abrir.
  - **3** (✔): Se ve en la pestaña Network.
  - **4** (✘): Cualquier medidor de velocidad lo ve: es capa 1.

### F6 · El servidor rechaza a agentes de IA por su nombre (causa sin nombrar)
- **capa:** 1 · **estado:** sospecha (Tope sospecha: el nombre del agente se presenta desde una IP que no es la oficial.)
- **línea:** Visibilidad en IA · **lo comprueba:** quien administra el sitio (con una línea de comandos)
- **dónde mirar:** curl -sI -A "GPTBot" <portada>, comparado con un navegador normal.
- **se puede afirmar:** Al presentarse con el nombre GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, el servidor respondió con un rechazo, y con un navegador normal responde bien.
- **NO se puede afirmar:** que "bloquea al bot real"
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «SIN REDACTAR: todavía es una sospecha, no se usa en un correo.»
  - **el hecho técnico detrás (no va en el correo):** Al presentarse con el nombre GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, el servidor respondió con un rechazo, y con un navegador normal responde bien.
  - **se vende:** Auditoría de Visibilidad en IA (Visibilidad en IA). Revisar la regla del servidor que rechaza a los agentes de IA.
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Desde $400.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso se arregla en el servidor, no en tu sitio. Lo hago yo, con quien lo administra.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (✔): El rechazo ocurre en el servidor.
  - **2** (◐): Efecto no medido.
  - **3** (◐): Solo quien administra el sitio.
  - **4** (✘): Sin causa nombrada es capa 1.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: sin_llms_txt

## Notas

- Hay rechazo por nombre de agente pero no se pudo nombrar la capa que lo causa: se queda en capa 1 (decisión D1).

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
- r3-A.jpg
- r3-B.jpg
- m1-movil.jpg
- m2-movil.jpg
