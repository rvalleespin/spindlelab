# Ficha G43

**resultado:** `oferta-capa-1` · motor v0 · 2026-10-29T16:51:16.762Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### F2 · No hay a la vista cómo contactar al negocio
- **capa:** 1 · **estado:** estable
- **línea:** Desarrollo Web · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir la portada y buscar por dónde un cliente puede escribir o llamar.
- **se puede afirmar:** En la portada no hay formulario, ni teléfono, ni correo, ni WhatsApp, ni un enlace de contacto.
- **NO se puede afirmar:** que el negocio no tenga contacto en otras páginas del sitio (solo se revisó la portada)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «En la portada de tu sitio no encontré cómo contactarte: ni formulario, ni teléfono, ni correo, ni WhatsApp.»
  - **el hecho técnico detrás (no va en el correo):** En la portada no hay formulario, ni teléfono, ni correo, ni WhatsApp, ni un enlace de contacto.
  - **se vende:** Desarrollo Web a medida (Desarrollo Web). Poner a la vista un formulario, teléfono o WhatsApp y probarlo.
  - **precio en el correo:** Solo como referencia, no como cotización: Desarrollo Web a medida, página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Página desde $390.000 + IVA; Sitio Esencial desde $690.000 + IVA (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso se arregla: dejo a la vista por dónde te escriben y lo pruebo de punta a punta.»
  - **puerta a la reunión:** «Vi otra cosa que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✘): Se ve mirando el sitio.
  - **2** (✔): Sin ruta de contacto, cada visita que quiere comprar se va.
  - **3** (✔): Se ve a simple vista.
  - **4** (✘): Cualquier herramienta lo ve: es capa 1.

## Ruta interna (no va en el correo)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **capa:** 2 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _fbp.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: ninguno); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de Meta.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _fbp.
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
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _fbp. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

### C4 · El nombre del negocio no es el mismo dentro del sitio
- **capa:** 2 · **estado:** sospecha (El cruce con la ficha de Google y LinkedIn es manual: nunca pasa de sospecha.)
- **línea:** Visibilidad en IA · **lo comprueba:** el dueño, buscando su propio nombre
- **dónde mirar:** Buscar el nombre del negocio y comparar con: JSON-LD name: Oggi - Officina Gelato Gusto Italiano / og:site_name: Oggi Gelato - Officina Gelato Gusto Italiano. Después, la ficha de Google y LinkedIn (a mano).
- **se puede afirmar:** Dentro del sitio el nombre aparece como: JSON-LD name: Oggi - Officina Gelato Gusto Italiano y og:site_name: Oggi Gelato - Officina Gelato Gusto Italiano.
- **NO se puede afirmar:** que ocurre lo mismo en Google o LinkedIn (no revisado)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «SIN REDACTAR: todavía es una sospecha, no se usa en un correo.»
  - **el hecho técnico detrás (no va en el correo):** Dentro del sitio el nombre aparece como: JSON-LD name: Oggi - Officina Gelato Gusto Italiano y og:site_name: Oggi Gelato - Officina Gelato Gusto Italiano.
  - **se vende:** Auditoría de Visibilidad en IA (Visibilidad en IA). Un solo nombre del negocio, igual en el sitio y en los datos estructurados.
  - **precio en el correo:** Solo como referencia, no como cotización: Auditoría de Visibilidad en IA, desde $400.000 + IVA, una vez (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $400.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso lo arreglo yo: dejo el nombre igual en el sitio y en los datos que leen Google y la IA.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✔): Cada pieza se ve bien por separado.
  - **2** (◐): El costo (que ningún modelo consolide quién es) es blando.
  - **3** (✔): Se compara a simple vista.
  - **4** (◐): Comparar texto es automático; interpretarlo y cruzarlo con otras fuentes es oficio.

## Capa 1 (contexto)

- con consecuencia: sin_ruta_de_contacto_visible, sin_analitica
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
