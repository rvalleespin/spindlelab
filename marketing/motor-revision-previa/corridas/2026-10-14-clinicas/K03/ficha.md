# Ficha K03

**resultado:** `sin-gancho-capa-2` · motor v0 · 2026-10-14T22:04:44.510Z · cloud (IP de datacenter, via proxy)

> Detector de sospecha. Nada de esto está verificado. La propuesta es lo que se vendería **si** una persona confirma el hallazgo.

## Hallazgo (el de mayor posición con estado estable)

_Ninguno._

## Ruta interna (no va en el correo)

### C2 · Medición instalada sin ningún evento de conversión
- **estado:** sospecha (Las conversiones marcadas dentro de la propiedad de GA4 son invisibles desde afuera: nunca pasa de sospecha.)
- **línea:** Acompañamiento · **lo comprueba:** el dueño, con acceso a su Google Analytics
- **dónde mirar:** En Google Analytics: Administrar > Eventos (y cuáles están marcados como clave). Del lado del sitio: Tag Assistant o el contenedor de Tag Manager, buscando alguna etiqueta de evento.
- **se puede afirmar:** El sitio no envía ningún evento de conversión que se vea desde afuera (ni etiqueta de evento en el contenedor, ni evento en el código).
- **NO se puede afirmar:** "no mides" o "no tienes conversiones" (una regla del panel de Analytics puede estar convirtiendo visitas sin etiqueta en el sitio); que "tus cifras están mal"
- **advertencias:** Sin clics (§3) el motor no ve qué se dispara al enviar un formulario.
- **Propuesta (el arreglo que se vende)**
  - **cómo se le diría (castellano, para el correo):** «Tu sitio tiene Google Analytics y, desde afuera, no veo que mida otra cosa que visitas: ni consultas, ni llamadas, ni clics a WhatsApp. Si ya lo tienes medido desde tu panel, entonces no aplica.»
  - **el hecho técnico detrás (no va en el correo):** El sitio no envía ningún evento de conversión que se vea desde afuera (ni etiqueta de evento en el contenedor, ni evento en el código).
  - **se vende:** Medición de conversiones (Acompañamiento). Dejar medido lo que importa: consultas por formulario, llamadas y WhatsApp.
  - **precio:** POR DEFINIR (no hay precio documentado) · **plazo:** no se ofrece plazo (ningún correo aprobado lo hace)
  - **frase de arreglo:** «Eso se arregla: dejo medido lo que importa, que te escriban, te llamen o te hablen por WhatsApp, para que veas qué trae clientes y qué no.»
  - **texto:** BORRADOR: no está en el corpus aprobado. Requiere revisión de Ramón. · **tono:** limpia
  - **registro:** singular (firma Ramón, estrategia §7). Para sitio o redes, usar la versión plural.
  - **por definir (decide Ramón):** No hay un producto ni un precio publicado para instalar medición suelta. El Acompañamiento Mensual existe, pero es una mensualidad.
- **cuatro condiciones:**
  - **1** (✔): El dueño ve cifras de visitas y cree que mide.
  - **2** (◐): Cuesta plata solo si se decide algo con esas cifras.
  - **3** (◐): Requiere acceso a su propiedad de Analytics.
  - **4** (✔): Se lee el contenedor de Tag Manager y el código de la página; no lo entrega una API.

## Capa 1 (contexto)

- con consecuencia: -
- higiene: sin_llms_txt, sin_entidad_en_jsonld

## Evidencia

- r1-A.jpg
- r1-B.jpg
- r2-A.jpg
- r2-B.jpg
