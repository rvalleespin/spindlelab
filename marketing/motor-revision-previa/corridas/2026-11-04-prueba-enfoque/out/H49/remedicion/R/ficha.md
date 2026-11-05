# Ficha R

**resultado:** `sin-gancho` · motor v0 · 2026-11-04T17:31:30.528Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

_Ninguno._

## Ruta interna (no va en el correo)

### C5 · La ruta de contacto apunta a algo que no responde
- **capa:** 2 · **estado:** sospecha
- **línea:** Desarrollo Web · **lo comprueba:** el dueño o quien administra el sitio
- **dónde mirar:** El formulario envía a https://hoteloceanic.cl/contact, que al pedirlo responde HTTP 404. Probar el envío con un dato de prueba propio.
- **se puede afirmar:** El destino del formulario (https://hoteloceanic.cl/contact) responde 404 al pedirlo.
- **NO se puede afirmar:** que "el formulario no funciona" (un GET no es un envío; el motor nunca envía); cuántas consultas se perdieron
- **advertencias:** Tope: la rotura de formulario nunca pasa de sospecha sin probar el envío.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «SIN REDACTAR: todavía es una sospecha, no se usa en un correo.»
  - **el hecho técnico detrás (no va en el correo):** El destino del formulario (https://hoteloceanic.cl/contact) responde 404 al pedirlo.
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
