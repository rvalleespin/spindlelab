# Ficha R26

**resultado:** `hallazgo-capa-2` · motor v0 · 2026-10-16T23:19:44.245Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

### C1 · Rastreadores que escriben antes de cualquier consentimiento
- **capa:** 2 · **estado:** estable
- **línea:** Verifica y Cumple · **lo comprueba:** el dueño, en 30 segundos
- **dónde mirar:** Abrir el sitio en una ventana nueva y, sin tocar nada ~10 s, mirar las cookies (candado > Cookies, o F12 > Application > Cookies).
- **se puede afirmar:** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga, _gid, _gat, _ga_042NHNB2HQ.
- **NO se puede afirmar:** que algún proveedor "recibió la visita" salvo que haya envío observado en ambas corridas (hoy: Google Analytics); que el sitio "no tiene aviso" sin ver la captura del tramo B; lo que la ley "exige"; cualquier cosa que no aparezca en las dos corridas
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Abrí tu sitio sin tocar nada ni aceptar nada, y ya había dejado en mi navegador cookies de Google.»
  - **el hecho técnico detrás (no va en el correo):** Al abrir el sitio sin aceptar ni tocar nada, el navegador guardó: _ga, _gid, _gat, _ga_042NHNB2HQ.
  - **se vende:** Kit de implementación de Verifica y Cumple (Verifica y Cumple). Lo que el chequeo gratis deje pendiente. El kit no incluye asesoría legal: entrega la plantilla de política para que la revise el abogado del cliente. Eso se dice, no se esconde.
  - **precio en el correo:** Desde $149.000 + IVA, una vez
  - **servicio publicado más cercano:** Desde $149.000 + IVA, una vez (correos aprobados 23-sep y estrategia §1) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** fuerte
  - **frase de arreglo:** «Eso lo arreglo yo, con lo demás que el chequeo deje pendiente. Desde $149.000 + IVA, una vez.»
  - **puerta a la reunión:** «Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.»
  - **cierre sugerido:** Gratis y sin registro: https://verifica.spindlelab.cl
  - **texto:** APROBADO: tomado de correos ya revisados. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
- **cuatro condiciones:**
  - **1** (✔): Las cookies las escriben scripts de terceros; el dueño ve el sitio normal.
  - **2** (✔): Cookies de medición o publicidad escritas sin que nadie haya aceptado: _ga, _gid, _gat, _ga_042NHNB2HQ. Se describe la señal, no la obligación.
  - **3** (✔): Se ve en el panel de cookies del navegador.
  - **4** (✔): Exige dos tramos, atribuir cada cookie a su script y leer Consent Mode (gcs); no lo entrega una API.

## Ruta interna (no va en el correo)

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

### F12 · La portada descarga demasiado peso
- **capa:** 1 · **estado:** estable
- **línea:** Auditoría SEO Técnica · **lo comprueba:** quien administra el sitio, con las herramientas del navegador
- **dónde mirar:** En el navegador: F12, pestaña Network, recargar y mirar el total transferido abajo.
- **se puede afirmar:** La portada descarga 6 MB solo al abrirse, sin bajar la página (mínimo de las 3 corridas).
- **NO se puede afirmar:** cuánto tarda en abrir para un visitante real (se mide desde un datacenter)
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu portada descarga 6 MB solo al abrirse; en un celular con datos eso tarda.»
  - **el hecho técnico detrás (no va en el correo):** La portada descarga 6 MB solo al abrirse, sin bajar la página (mínimo de las 3 corridas).
  - **se vende:** Auditoría SEO Técnica, Completa (Auditoría SEO Técnica). Reducir el peso de la portada y medir el antes y el después.
  - **precio en el correo:** Solo como referencia, no como cotización: Auditoría SEO Técnica, Completa, desde $490.000 + IVA, una vez (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $490.000 + IVA, una vez (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso se arregla: dejo la portada liviana y mido cuánto baja.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
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

### C2 · Medición instalada sin ningún evento de conversión
- **capa:** 2 · **estado:** sospecha (Las conversiones marcadas dentro de la propiedad de GA4 son invisibles desde afuera: nunca pasa de sospecha.)
- **línea:** Acompañamiento · **lo comprueba:** el dueño, con acceso a su Google Analytics
- **dónde mirar:** En Google Analytics: Administrar > Eventos (y cuáles están marcados como clave). Del lado del sitio: Tag Assistant o el contenedor de Tag Manager, buscando alguna etiqueta de evento.
- **se puede afirmar:** El sitio no envía ningún evento de conversión que se vea desde afuera (ni etiqueta de evento en el contenedor, ni evento en el código).
- **NO se puede afirmar:** "no mides" o "no tienes conversiones" (una regla del panel de Analytics puede estar convirtiendo visitas sin etiqueta en el sitio); que "tus cifras están mal"
- **advertencias:** Sin clics (§3) el motor no ve qué se dispara al enviar un formulario.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu sitio tiene Google Analytics y, desde afuera, no veo que mida otra cosa que visitas: ni consultas, ni llamadas, ni clics a WhatsApp. Si ya lo tienes medido desde tu panel, entonces no aplica.»
  - **el hecho técnico detrás (no va en el correo):** El sitio no envía ningún evento de conversión que se vea desde afuera (ni etiqueta de evento en el contenedor, ni evento en el código).
  - **se vende:** Acompañamiento Mensual, plan Esencial (foco en una capa) (Acompañamiento). Dejar medido lo que importa: consultas por formulario, llamadas y WhatsApp.
  - **precio en el correo:** Solo como referencia, no como cotización: Acompañamiento Mensual, plan Esencial (foco en una capa), desde $590.000 + IVA al mes (spindlelab.cl). El valor del arreglo se cierra en la llamada.
  - **línea de precio (referencia):** «Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.»
  - **servicio publicado más cercano:** Desde $590.000 + IVA al mes (spindlelab.cl, leído el 15-oct-2026) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **fuerza para un primer correo:** débil (verdadera, pero sin una consecuencia que el dueño sienta: estrategia §14.3, decidir si se escribe)
  - **frase de arreglo:** «Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes y qué no.»
  - **puerta a la reunión:** «Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay precio publicado para un arreglo puntual: el sitio publica el "desde" del servicio y dice que el valor final se cierra tras el diagnóstico gratuito y una llamada de 20 minutos. Por decisión de Ramón, el correo apunta a la base publicada como referencia y el valor se cierra en la llamada.
- **cuatro condiciones:**
  - **1** (✔): El dueño ve cifras de visitas y cree que mide.
  - **2** (◐): Cuesta plata solo si se decide algo con esas cifras.
  - **3** (◐): Requiere acceso a su propiedad de Analytics.
  - **4** (✔): Se lee el contenedor de Tag Manager y el código de la página; no lo entrega una API.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: sin_llms_txt, sin_entidad_en_jsonld, sin_meta_description

## Notas

- La respuesta con agente normal no fue estable o los agentes discreparon entre rondas.

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
- r3-A.jpg
- r3-B.jpg
- m1-movil.jpg
- m2-movil.jpg
