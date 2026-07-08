# Análisis de la cotización SPL-COT-2026-014 — Sitio web portafolio fotográfico

> Documento para aplicar correcciones a la cotización (pegar en el chat de Cowork donde está el documento fuente). Sección final: checklist «listo para enviar».

**Estado (8 jul 2026):** SimpleTrust queda en pausa hasta nuevo aviso; esta cotización es la prioridad. El lado web (spindlelab.cl) ya está alineado — ver checklist al final.

## Qué está bien (no tocar)

Estructura de tres planes con anclaje de precio, fases con pagos 30/40/30 amarrados a aprobaciones, adicionales opcionales que abren venta futura (prints, booking, mantención), referencias de mercado citadas con fuentes y referencias de dirección de arte por género fotográfico. La validez de 30 días y la transferencia de propiedad intelectual con el pago final también están correctas.

## Correcciones antes de enviar

### 1. Correo del remitente (obligatoria)
Aparece `manuvalleespin@gmail.com` en el encabezado y en el pie. Reemplazar en ambos por **hola@spindlelab.cl** (ya operativa). Un estudio que cotiza $890.000 desde un Gmail personal pierde credibilidad en la primera línea, y además el Gmail personal rompe la separación de identidades.

### 2. Promesas en tensión técnica
Hoy se promete a la vez: «transiciones cinematográficas scroll-driven», «nivel Awwwards» y «rendimiento 90+ en móvil». Los sitios con efectos scroll pesados rara vez logran 90+ móvil; prometer las tres cosas es firmar un incumplimiento.
**Texto sugerido:** dejar «Rendimiento 90+ en móvil» solo en el plan Portafolio Pro, y en Vanguardia reemplazarlo por «Rendimiento optimizado (el mejor equilibrio posible entre efectos visuales y velocidad)». En la fila de benchmark, cambiar «estándar contra el que se medirá el resultado» por «estándar de referencia que inspira el diseño».

### 3. Techo de alcance (evita el proyecto infinito)
Agregar a las condiciones:
- «Cada galería incluye hasta 60 fotografías optimizadas; galerías o fotografías adicionales se cotizan como ronda extra.»
- «Los textos del sitio (bio, descripciones, servicios) los provee el cliente; la redacción profesional puede cotizarse aparte.»
- «La fase de QA incluye una (1) carga final de material; cargas posteriores corresponden a mantención o ronda extra.»

### 4. Bruto vs. líquido (diferencia real de ~$130.000 en el plan Pro)
La cotización dice «se aplica la retención legal vigente» pero no aclara si los valores son brutos o líquidos. Con la retención de boleta de honorarios vigente (15,25 % en 2026 — verificar), $890.000 brutos son ~$754.000 líquidos.
**Texto sugerido:** «Los valores indicados son brutos; la retención legal de la boleta de honorarios se descuenta según la normativa vigente.» (O subir los precios si el objetivo es recibir esos montos líquidos.)

### 5. Alcance de la garantía
«30 días de garantía post-lanzamiento» sin definición invita a pedidos de cambios de diseño gratis.
**Texto sugerido:** «La garantía cubre la corrección de errores de funcionamiento del sitio entregado; no incluye cambios de diseño, contenido nuevo ni funcionalidades adicionales.»

### 6. Encabezado de marca (ver sección web más abajo)
El subtítulo dice «Estudio de diseño y desarrollo web con IA», pero spindlelab.cl se presenta como consultoría de SEO técnico y visibilidad en IA. Si el cliente googlea SpindleLab encontrará otra cosa que la que le cotizaron — disonancia que resta confianza justo antes de firmar.
**Cambio en la cotización:** subtítulo del encabezado → **«SEO, visibilidad en IA y desarrollo web»**. Cargo del pie → «Fundador» (en vez de «Programador & Diseñador Web»).

### 7. Menores
- Poner nombre completo del cliente cuando se confirme (hoy: «Bernardo — Fotógrafo»).
- El pie repite el Gmail personal (cubierto en el punto 1).
- Usar el wordmark nuevo de SpindleLab en el encabezado: `marketing/brand/logo/logo-horizontal.png` (fondo blanco) — reemplaza al lockup viejo del átomo, que ya no existe.

---

## Cambios derivados en spindlelab.cl — ✅ HECHOS (8 jul 2026)

**El principio:** el desarrollo web con IA es una **cuarta línea de servicio** del mismo paraguas — sin diluir el foco principal (SEO/visibilidad IA para rubros de confianza). La web ahora cuenta la misma historia que la cotización.

1. [x] **Tagline (footer, todas las páginas):** ahora dice «SEO técnico · AEO/GEO · Desarrollo Web · Chile». El hero de la home y su meta description **no se tocaron a propósito** — el mensaje principal sigue siendo visibilidad, el desarrollo es secundario.
2. [x] **Página /servicios/:** 4ª tarjeta «Desarrollo Web» agregada al grid (ahora 4 columnas), con su ícono y enlace a la página propia. Hero de la página actualizado a «Cuatro formas de trabajar tu visibilidad» y la tabla comparativa ahora tiene 4 columnas.
3. [x] **Página /servicios/desarrollo-web/** creada, misma estructura que las otras (page-hero, qué incluye, cómo trabajamos en 4 fases, FAQ, CTA). Contenido real: diseño a medida sin plantillas, desarrollo con el agente SpindleLab sobre Claude Code + supervisión humana, SEO técnico de fábrica, sin precios públicos. Incluye la aclaración de garantía del punto 5 (arriba) ya redactada igual en ambos lugares.
4. [x] **JSON-LD:** `makesOffer` de la home y `knowsAbout` actualizados con el 4º servicio; Service + BreadcrumbList + FAQPage propios en la página nueva.
5. [x] **Sitemap:** `/servicios/desarrollo-web/` agregada, `lastmod` de todas las páginas actualizado a 2026-07-08.
6. [ ] **Regla de coherencia (pendiente, futuro):** cuando el sitio de Bernardo esté terminado, pedirle permiso desde el día 1 para usarlo como primer caso público de esta línea — no repetir la espera de SimpleTrust.
7. [x] **Marca aplicada:** tipografía Gabarito y favicon monograma (antes átomo) en las 13 páginas del sitio — ver `brand/manual-de-marca.md` v1.2.

**Nota de anonimato (consciente, no accidente):** la cotización lleva el nombre real; está bien para Bernardo y el círculo de conocidos. La web y el outbound frío siguen siendo 100 % marca, sin nombre. Las dos firmas de correo (con nombre / solo marca) existen exactamente para esta separación — para Bernardo usa **`firmas/firma-a-nombre.png`** (te conoce, es una relación directa, no outbound frío).

---

## ✅ Checklist final — listo para enviar a Bernardo

**Lado spindlelab.cl (hecho por Claude Code, verificado con capturas):**
- [x] Marca nueva aplicada (Gabarito, favicon, coherencia visual)
- [x] Servicio "Desarrollo Web" visible en /servicios/ con página propia
- [x] Si Bernardo googlea SpindleLab después de recibir la cotización, encuentra una empresa que ofrece exactamente lo que le cotizaron — ya no hay disonancia

**Lado cotización (documento en Cowork — pendiente de tu edición, los 7 puntos de arriba):**
- [ ] 1. Correo cambiado a hola@spindlelab.cl (encabezado + pie)
- [ ] 2. Promesas técnicas destensadas (90+ móvil solo en Pro; Vanguardia con "rendimiento optimizado")
- [ ] 3. Techo de alcance agregado (60 fotos/galería, textos del cliente, 1 carga final)
- [ ] 4. Aclaración bruto/líquido agregada
- [ ] 5. Alcance de la garantía definido
- [ ] 6. Subtítulo del encabezado → «SEO, visibilidad en IA y desarrollo web»; cargo del pie → «Fundador»
- [ ] 7. Nombre completo del cliente + wordmark nuevo en el encabezado

**Envío:**
- [ ] Enviar desde **hola@spindlelab.cl** (no desde el Gmail personal — ya está operativa)
- [ ] Usar la firma **`firmas/firma-a-nombre.png`** (Ramón, Fundador — Bernardo ya te conoce, no es outbound frío)
- [ ] Adjuntar el PDF final una vez aplicados los 7 puntos

Cuando termines de editar en Cowork, pégame el PDF final si quieres una última revisión antes de enviarlo.
