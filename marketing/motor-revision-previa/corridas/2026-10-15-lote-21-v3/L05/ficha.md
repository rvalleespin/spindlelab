# Ficha L05

**resultado:** `oferta-capa-1` · motor v0 · 2026-10-15T14:18:46.562Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### F7 · Enlaces de la portada que llevan a páginas que no existen
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** el dueño, haciendo clic
- **dónde mirar:** Hacer clic en los enlaces de la portada y el menú.
- **se puede afirmar:** 1 enlace(s) internos de la portada responden 404 (revisados 4), en dos rondas.
- **NO se puede afirmar:** que sean todos los rotos del sitio (solo se revisó la portada)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «En tu portada hay un enlace que lleva a páginas que no existen (error 404), por ejemplo /webinar-registration.»
  - **el hecho técnico detrás (no va en el correo):** 1 enlace(s) internos de la portada responden 404 (revisados 4), en dos rondas.
  - **se vende:** Auditoría SEO Técnica, Completa (Auditoría SEO Técnica). Corregir los enlaces rotos de la portada y revisar el resto del sitio.
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Desde $490.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso se arregla: dejo cada enlace llevando a una página que existe y reviso que no queden más rotos.»
  - **puerta a la reunión:** «Vi 2 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (◐): Solo se nota al hacer clic en ese enlace.
  - **2** (◐): Cada clic roto es una visita perdida.
  - **3** (✔): Se prueba con un clic.
  - **4** (✘): Cualquier verificador de enlaces lo ve: es capa 1.

## Ruta interna (no va en el correo)

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
  - **precio en el correo:** NO va en el correo: se cierra en la llamada (el sitio publica el "desde" del servicio, no del arreglo puntual)
  - **servicio publicado más cercano:** Desde $400.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso lo arreglo yo: dejo declarado qué negocio eres, con tu dirección y tu contacto, en el formato que leen Google y la IA.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos.
- **cuatro condiciones:**
  - **1** (✔): Los datos estructurados no se ven.
  - **2** (◐): Sin entidad declarada, la IA y Google adivinan quién eres.
  - **3** (✔): Se comprueba con una herramienta gratuita.
  - **4** (✘): Los chequeos gratis lo muestran: es capa 1.

## Capa 1 (contexto)

- con consecuencia: sin_analitica
- higiene: sin_entidad_en_jsonld, sin_meta_description

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
- r3-A.jpg
- r3-B.jpg
- m1-movil.jpg
- m2-movil.jpg
