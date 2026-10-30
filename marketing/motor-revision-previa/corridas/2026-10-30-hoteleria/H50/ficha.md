# Ficha H50

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-30T14:18:36.554Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **capa:** 2 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva, NO responder el aviso, y mirar las cookies (candado > Cookies, o F12 > Application > Cookies): ya hay de medición o publicidad.
- **se puede afirmar:** El sitio muestra un aviso de cookies, pero antes de elegir nada en él ya había guardado: _gcl_au, _clck, _clsk.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics, Microsoft Clarity); lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas; que el sitio "no tiene aviso" (sí lo tiene); que el aviso sea ilegal o insuficiente; que las cookies se escriban aun después de pulsar Rechazar (no se probó)
- **advertencias:** Hay peticiones a Google con gcs=G100 (Consent Mode, consentimiento denegado): no afirmar "Analytics recibe la visita" sin mirar las cookies.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu sitio tiene aviso de cookies, pero antes de que yo eligiera nada ahí ya habían quedado en mi navegador cookies de Google y Microsoft.»
  - **el hecho técnico detrás (no va en el correo):** El sitio muestra un aviso de cookies, pero antes de elegir nada en él ya había guardado: _gcl_au, _clck, _clsk.
  - **se vende:** Kit de implementación de Verifica y Cumple (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio en el correo:** Desde $149.000 + IVA, una vez
  - **servicio publicado más cercano:** Desde $149.000 + IVA, una vez (correos aprobados 23-sep y estrategia §1) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** media
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _gcl_au, _clck, _clsk. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

### F14 · El formulario de contacto pide demasiados datos
- **capa:** 1 · **estado:** estable
- **línea:** Desarrollo Web · **lo comprueba:** el dueño, mirando su formulario
- **dónde mirar:** Abrir el formulario de contacto y contar los campos que hay que llenar.
- **se puede afirmar:** El formulario de contacto pide 13 datos o más.
- **NO se puede afirmar:** cuántos de esos campos son obligatorios; cuánta gente lo abandona
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu formulario de contacto pide 13 datos o más antes de poder enviarlo.»
  - **el hecho técnico detrás (no va en el correo):** El formulario de contacto pide 13 datos o más.
  - **se vende:** Desarrollo Web a medida (Desarrollo Web). Reducir el formulario de contacto a lo necesario y probarlo.
  - **precio en el correo:** Solo como referencia, no como cotización: Desarrollo Web a medida, página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** media
  - **frase de arreglo:** «Eso se arregla: lo dejo en lo mínimo para que te escriban y lo pruebo.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (◐): El dueño no lo mira como lo mira un cliente.
  - **2** (◐): Cada campo de más es una razón para no terminarlo.
  - **3** (✔): Se cuenta a simple vista.
  - **4** (✘): Es capa 1.

### F12 · La portada descarga demasiado peso
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** quien administra el sitio, con las herramientas del navegador
- **dónde mirar:** En el navegador: F12, pestaña Network, recargar y mirar el total transferido abajo.
- **se puede afirmar:** La portada descarga 15.6 MB solo al abrirse, sin bajar la página (mínimo de las 3 corridas).
- **NO se puede afirmar:** cuánto tarda en abrir para un visitante real (se mide desde un datacenter)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu portada descarga 15.6 MB solo al abrirse; en un celular con datos eso tarda.»
  - **el hecho técnico detrás (no va en el correo):** La portada descarga 15.6 MB solo al abrirse, sin bajar la página (mínimo de las 3 corridas).
  - **se vende:** Arreglo puntual de la portada (Arreglo puntual). Reducir el peso de la portada y medir el antes y el después.
  - **precio en el correo:** $149.000 + IVA, una vez
  - **servicio publicado más cercano:** $149.000 + IVA, una vez (decisión de Ramón, 30-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso se arregla: dejo la portada liviana y mido cuánto baja.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (✔): Nadie mira cuánto pesa su portada.
  - **2** (◐): En un celular con datos, una portada pesada tarda en abrir.
  - **3** (✔): Se ve en la pestaña Network.
  - **4** (✘): Cualquier medidor de velocidad lo ve: es capa 1.

### F8 · El negocio no está declarado como entidad en datos estructurados
- **capa:** 1 · **estado:** estable
- **línea:** Visibilidad en IA · **lo comprueba:** el dueño, con una herramienta gratuita
- **dónde mirar:** Pegar la dirección en el probador de resultados enriquecidos de Google, o buscar "application/ld+json" en el código de la página.
- **se puede afirmar:** El sitio no declara el negocio (Organization o LocalBusiness) en datos estructurados.
- **NO se puede afirmar:** que "Google no te entiende"
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu sitio no le dice a Google ni a la IA qué negocio eres en el formato que ellos leen (datos estructurados).»
  - **el hecho técnico detrás (no va en el correo):** El sitio no declara el negocio (Organization o LocalBusiness) en datos estructurados.
  - **se vende:** Auditoría de Visibilidad en IA (Visibilidad en IA). Declarar el negocio como entidad en datos estructurados.
  - **precio en el correo:** Solo como referencia, no como cotización: Auditoría de Visibilidad en IA, desde $400.000 + IVA, una vez (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $400.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso lo arreglo yo: dejo declarado qué negocio eres, con tu dirección y tu contacto, en el formato que leen Google y la IA.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✔): Los datos estructurados no se ven.
  - **2** (◐): Sin entidad declarada, la IA y Google adivinan quién eres.
  - **3** (✔): Se comprueba con una herramienta gratuita.
  - **4** (✘): Los chequeos gratis lo muestran: es capa 1.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: sin_llms_txt, sin_entidad_en_jsonld

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
- r3-A.jpg
- r3-B.jpg
- m1-movil.jpg
- m2-movil.jpg
