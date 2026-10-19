# Ficha V71

**resultado:** `sin-gancho` · motor v0 · 2026-10-19T14:39:14.562Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

_Ninguno._

## Ruta interna (no va en el correo)

### C4 · El nombre del negocio no es el mismo dentro del sitio
- **capa:** 2 · **estado:** sospecha (El cruce con la ficha de Google y LinkedIn es manual: nunca pasa de sospecha.)
- **línea:** Visibilidad en IA · **lo comprueba:** el dueño, buscando su propio nombre
- **dónde mirar:** Buscar el nombre del negocio y comparar con: JSON-LD name: Clínica Odontológica CEOS Providencia / og:site_name: Clínica Dental en Providencia. Después, la ficha de Google y LinkedIn (a mano).
- **se puede afirmar:** Dentro del sitio el nombre aparece como: JSON-LD name: Clínica Odontológica CEOS Providencia y og:site_name: Clínica Dental en Providencia.
- **NO se puede afirmar:** que ocurre lo mismo en Google o LinkedIn (no revisado)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «SIN REDACTAR: todavía es una sospecha, no se usa en un correo.»
  - **el hecho técnico detrás (no va en el correo):** Dentro del sitio el nombre aparece como: JSON-LD name: Clínica Odontológica CEOS Providencia y og:site_name: Clínica Dental en Providencia.
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

### F6 · El servidor rechaza a agentes de IA por su nombre (causa sin nombrar)
- **capa:** 1 · **estado:** sospecha (Tope sospecha: el nombre del agente se presenta desde una IP que no es la oficial.)
- **línea:** Visibilidad en IA · **lo comprueba:** quien administra el sitio (con una línea de comandos)
- **dónde mirar:** curl -sI -A "GPTBot" <portada>, comparado con un navegador normal.
- **se puede afirmar:** Al presentarse con el nombre GPTBot, ClaudeBot, el servidor respondió con un rechazo, y con un navegador normal responde bien.
- **NO se puede afirmar:** que "bloquea al bot real"
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «SIN REDACTAR: todavía es una sospecha, no se usa en un correo.»
  - **el hecho técnico detrás (no va en el correo):** Al presentarse con el nombre GPTBot, ClaudeBot, el servidor respondió con un rechazo, y con un navegador normal responde bien.
  - **se vende:** Auditoría de Visibilidad en IA (Visibilidad en IA). Revisar la regla del servidor que rechaza a los agentes de IA.
  - **precio en el correo:** Solo como referencia, no como cotización: Auditoría de Visibilidad en IA, desde $400.000 + IVA, una vez (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $400.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso se arregla en el servidor, no en tu sitio. Lo hago yo, con quien lo administra.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
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
