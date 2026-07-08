# Guía de cotizaciones SpindleLab

**Documento base:** SPL-COT-2026-014 (sitio web portafolio fotográfico, cliente Bernardo Combeau) — la primera cotización enviada bajo la marca SpindleLab, corregida en `marketing/analisis-cotizacion-fotografo.md` y **aprobada por el cliente el 8 de julio de 2026**. Es la referencia probada: esta guía documenta por qué funciona, para que la siguiente cotización parta del mismo nivel en vez de reconstruirlo desde cero.

Usar junto con `plantilla-cotizacion.html` (la plantilla editable) y `marketing/brand/manual-de-marca.md` (sistema de marca).

---

## 1. Estructura fija (este orden, siempre)

1. **Encabezado** — wordmark + tagline de tres servicios + datos de contacto, y una caja de metadatos (Documento / N.º / Proyecto / Fecha / Cliente / Validez). Es lo primero que ancla el documento como profesional y trazable — un número de cotización (`SPL-COT-AAAA-NNN`) hace que el documento se pueda referenciar después.
2. **El proyecto** — 1-2 párrafos. Primer párrafo: qué se hace y con qué dirección/enfoque. Segundo párrafo: cómo se hace (mención del método/agente SpindleLab sobre Claude Code, supervisión humana) y la honestidad de precio — el ahorro de la ejecución asistida por IA se traslada al cliente, no se embolsa en silencio.
3. **Referencias/contexto del proyecto** *(opcional, según el tipo de trabajo)* — cuando aplique mostrar de dónde viene cada decisión (referentes de diseño, benchmarks, comparables), una tabla de 3 columnas: **Categoría / Referencia / Qué tomamos para tu proyecto**. La tercera columna es la que importa: traduce la referencia abstracta en una decisión concreta para el cliente.
4. **Opciones de inversión** — siempre 3 niveles (Esencial / Recomendado ★ / Avanzado), nunca uno solo ni más de tres — un solo precio no da anclaje, cuatro o más diluye la decisión. La opción del medio siempre marcada con ★ y con borde/columna destacada. Filas típicas: Ideal para · alcance (páginas/entregables) · qué incluye por capas · plazo · rondas de revisión · valor lista (tachado si hay oferta) · oferta vigente.
5. **Fases de ejecución** — tabla de Fase / Qué se hace / Entregable / Pago asociado. Los pagos NUNCA van 100% adelantado ni 100% contra entrega — se reparten en el avance (ej. 30/40/30) y cada pago está atado a un entregable verificable, no a una fecha. Cerrar la sección con la frase que fija la relación: **"Nada avanza a la fase siguiente sin tu aprobación."**
6. **Servicios adicionales (opcionales)** — tabla corta de up-sells reales (no relleno), con precio "desde" cuando el alcance varía.
7. **Referencias de precios de mercado** — 1 párrafo + fuentes citadas con enlace. Ancla el valor mostrando que el precio propio está deliberadamente bajo el rango de mercado, con evidencia verificable — no una afirmación de vendedor.
8. **Condiciones comerciales** — forma de pago (medio, cuándo empiezan a correr los plazos), transferencia de propiedad intelectual al pago final, **aclaración explícita de si los valores incluyen IVA o son brutos/netos** (nunca dejarlo ambiguo — fue el error real corregido en SPL-COT-2026-014), validez de la cotización.
9. **Alcance y límites** — lista de topes concretos: cantidades máximas incluidas (fotos por galería, rondas, horas), qué provee el cliente vs. qué provee SpindleLab, y **qué cubre exactamente la garantía post-entrega** (corrección de errores de funcionamiento — nunca "cambios" sin definir, porque eso invita a pedir rediseños gratis). Esta sección es la que evita el proyecto que nunca termina.
10. **Firma final** — una sola línea: `SpindleLab · [Nombre] · [Cargo] · hola@spindlelab.cl`. Sin foto, sin redes, sin adornos.

## 2. Registro de lenguaje (la voz en documentos comerciales)

Aplica la voz general de `manual-de-marca.md` §07, con estas reglas propias de cotizaciones:

- **Segunda persona para el cliente:** "tu sitio", "tu proyecto", nunca "el cliente" o "el usuario" en tercera persona dentro del cuerpo del documento.
- **Primera persona plural para lo que SpindleLab entrega o hace** — "construimos", "tomamos", "revisamos", "trabajamos" — nunca "yo" en un documento comercial (aunque el resto de la marca use singular para lo observacional, en cotizaciones SIEMPRE es plural: es el negocio comprometiéndose, no una persona opinando).
- **Concreto, nunca vendedor.** Cero superlativos ("increíble", "único", "revolucionario"), cero urgencia artificial. La oferta de lanzamiento con descuento y validez de 30 días ya genera urgencia real — no hace falta fabricarla con adjetivos.
- **Cifras y plazos como rangos honestos**, no promesas optimistas: "3–4 semanas", no "en solo 3 semanas". Cuando hay tensión entre dos promesas técnicas (ej. efectos visuales vs. rendimiento móvil), se resuelve con lenguaje que no compromete ambas a la vez — ver el ejemplo de "Rendimiento optimizado: el mejor equilibrio posible" en vez de prometer un número fijo que no siempre se puede cumplir.
- **Transparencia como argumento de venta**, no como trámite: citar fuentes de precio de mercado, explicar el IVA, definir la garantía — todo eso construye confianza más que cualquier frase de marketing.

## 3. Checklist antes de enviar cualquier cotización

- [ ] Número de documento único (`SPL-COT-AAAA-NNN`, correlativo)
- [ ] Remitente: **hola@spindlelab.cl** (nunca el Gmail personal)
- [ ] Los tres niveles de precio, con ★ en el recomendado
- [ ] Fases con pago asociado a cada entregable, nunca a una fecha
- [ ] Aclaración explícita de IVA/bruto-líquido
- [ ] Garantía definida (qué cubre y qué no)
- [ ] Topes de alcance (cantidades, no "ilimitado")
- [ ] Sin promesas técnicas que se contradicen entre sí
- [ ] Firma final con el wordmark de marca vigente (ver `manual-de-marca.md`)
- [ ] Validez de 30 días desde la fecha de emisión

## 4. Cómo usar la plantilla

1. Copiar `plantilla-cotizacion.html` con un nombre nuevo (ej. `SPL-COT-2026-015-nombre-proyecto.html`).
2. Reemplazar todos los bloques marcados `[[...]]` — cubren cada campo variable del documento (cliente, proyecto, precios, fases, fuentes).
3. Si el proyecto no tiene una tabla de "referencias/contexto" (sección 3), eliminar esa sección completa — es opcional, no todos los servicios la necesitan (una auditoría SEO no tiene "referentes de diseño", por ejemplo).
4. Renderizar a PDF: abrir el HTML en el navegador y usar "Imprimir → Guardar como PDF", o pedir que se genere automáticamente con Claude Code.
5. Revisar contra el checklist de la sección 3 antes de enviar.
