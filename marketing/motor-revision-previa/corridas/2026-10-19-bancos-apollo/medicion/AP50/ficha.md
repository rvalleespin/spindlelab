# Ficha AP50

**resultado:** `oferta-capa-1` · motor v0 · 2026-10-19T18:25:32.501Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

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
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Vi 2 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (◐): La ausencia de un enlace se nota poco.
  - **2** (✔): El formulario ya trata datos personales hoy.
  - **3** (✔): Se ve mirando el formulario y el pie.
  - **4** (✘): Cualquier chequeo gratis (incluido el de Verifica y Cumple) lo muestra: es capa 1.

## Ruta interna (no va en el correo)

### F7 · Enlaces de la portada que llevan a páginas que no existen
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** el dueño, haciendo clic
- **dónde mirar:** Hacer clic en los enlaces de la portada y el menú.
- **se puede afirmar:** 1 enlace(s) internos de la portada responden 404 (revisados 15), en dos rondas.
- **NO se puede afirmar:** que sean todos los rotos del sitio (solo se revisó la portada)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «En tu portada hay un enlace que lleva a una página que no existe (error 404): /curriculums/jaime-tagle.»
  - **el hecho técnico detrás (no va en el correo):** 1 enlace(s) internos de la portada responden 404 (revisados 15), en dos rondas.
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

### F4 · No hay ninguna herramienta de medición instalada
- **capa:** 1 · **estado:** estable
- **línea:** Acompañamiento · **lo comprueba:** el dueño, con acceso a su panel
- **dónde mirar:** Preguntar a quien administra el sitio si hay Google Analytics u otra herramienta; o abrir el sitio con Tag Assistant.
- **se puede afirmar:** No hay Google Analytics, Tag Manager ni otra herramienta de medición visible en el sitio.
- **NO se puede afirmar:** que "no mides nada" (puede haber medición del lado del servidor o la propia de la plataforma)
- **advertencias:** El sitio usa Wix, que trae analítica propia: lo único afirmable es que no hay Google Analytics ni Tag Manager.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «No veo Google Analytics ni Tag Manager en tu sitio.»
  - **el hecho técnico detrás (no va en el correo):** No hay Google Analytics, Tag Manager ni otra herramienta de medición visible en el sitio.
  - **se vende:** Acompañamiento Mensual, plan Esencial (foco en una capa) (Acompañamiento). Instalar analítica y medir consultas, llamadas y WhatsApp.
  - **precio en el correo:** Solo como referencia, no como cotización: Acompañamiento Mensual, plan Esencial (foco en una capa), desde $590.000 + IVA al mes (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $590.000 + IVA al mes (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✘): No se ve, pero lo confirma cualquier extensión gratuita.
  - **2** (◐): Sin medición no se sabe qué trae clientes.
  - **3** (✔): Se comprueba con Tag Assistant.
  - **4** (✘): Es capa 1.

## Capa 1 (contexto)

- con consecuencia: sin_analitica
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
