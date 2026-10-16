# Ficha L14

**resultado:** `oferta-capa-1` · motor v0 · 2026-10-15T14:25:50.437Z · cloud (IP de datacenter, via proxy)

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
  - **puerta a la reunión:** «Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (◐): El dueño ve su sitio todos los días y no ve lo que falta.
  - **2** (✔): Quien llega y no ve cómo seguir, se va.
  - **3** (✔): Se ve a simple vista.
  - **4** (✘): Es capa 1.

## Ruta interna (no va en el correo)

### F1 · Un formulario que pide datos y no enlaza a ninguna política de privacidad
- **capa:** 1 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Mirar el formulario de la portada y el pie de página: buscar un enlace a "política de privacidad".
- **se puede afirmar:** La portada tiene un formulario que pide correo o teléfono y no hay ningún enlace a una política de privacidad (ni en el HTML ni tras ejecutar la página).
- **NO se puede afirmar:** que "no tiene política" en todo el sitio (solo se revisó la portada); lo que la ley "exige"
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu formulario pide correo o teléfono y, en tu portada, no encontré ningún enlace a una política de privacidad.»
  - **el hecho técnico detrás (no va en el correo):** La portada tiene un formulario que pide correo o teléfono y no hay ningún enlace a una política de privacidad (ni en el HTML ni tras ejecutar la página).
  - **se vende:** Kit de implementación de Verifica y Cumple (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio en el correo:** Desde $149.000 + IVA, una vez
  - **servicio publicado más cercano:** Desde $149.000 + IVA, una vez (correos aprobados 23-sep y estrategia §1) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (◐): La ausencia de un enlace se nota poco.
  - **2** (✔): El formulario ya trata datos personales hoy.
  - **3** (✔): Se ve mirando el formulario y el pie.
  - **4** (✘): Cualquier chequeo gratis (incluido el de Verifica y Cumple) lo muestra: es capa 1.

### F13 · La información de la portada está mal estructurada
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** el dueño, con el código de la página
- **dónde mirar:** Ver el código fuente (clic derecho > ver código) y buscar "<h1"; o contar las palabras de la portada.
- **se puede afirmar:** La portada no tiene un título principal (H1).
- **NO se puede afirmar:** que el resto del sitio tenga el mismo problema
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu portada no tiene un título principal.»
  - **el hecho técnico detrás (no va en el correo):** La portada no tiene un título principal (H1).
  - **se vende:** Auditoría SEO Técnica, Completa (Auditoría SEO Técnica). Ordenar la información de la portada: un título principal claro y el contenido que explica la oferta.
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Desde $490.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso lo arreglo yo: dejo la información ordenada, con un título que diga qué haces y para quién.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (✔): La estructura del código no se ve.
  - **2** (◐): Google y la IA usan esa estructura para entender de qué trata la página.
  - **3** (✔): Se ve en el código fuente.
  - **4** (✘): Cualquier auditor SEO gratuito lo ve: es capa 1.

### F4 · No hay ninguna herramienta de medición instalada
- **capa:** 1 · **estado:** estable
- **línea:** Acompañamiento · **lo comprueba:** el dueño, con acceso a su panel
- **dónde mirar:** Preguntar a quien administra el sitio si hay Google Analytics u otra herramienta; o abrir el sitio con Tag Assistant.
- **se puede afirmar:** No hay Google Analytics, Tag Manager ni otra herramienta de medición visible en el sitio.
- **NO se puede afirmar:** que "no mides nada" (puede haber medición del lado del servidor o la propia de la plataforma)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «No veo Google Analytics ni Tag Manager en tu sitio.»
  - **el hecho técnico detrás (no va en el correo):** No hay Google Analytics, Tag Manager ni otra herramienta de medición visible en el sitio.
  - **se vende:** Acompañamiento Mensual, plan Esencial (foco en una capa) (Acompañamiento). Instalar analítica y medir consultas, llamadas y WhatsApp.
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Desde $590.000 + IVA al mes (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (✘): No se ve, pero lo confirma cualquier extensión gratuita.
  - **2** (◐): Sin medición no se sabe qué trae clientes.
  - **3** (✔): Se comprueba con Tag Assistant.
  - **4** (✘): Es capa 1.

## Capa 1 (contexto)

- con consecuencia: formulario_que_pide_datos_sin_enlace_a_politica, sin_analitica
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
