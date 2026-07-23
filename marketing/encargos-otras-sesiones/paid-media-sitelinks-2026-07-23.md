# Handoff paid media → sesión troncal — Sitelinks Google Ads, 23 jul 2026 (2ª tarea del día)

Reporte de la sesión de paid media (`/persona-paid-media`, con navegador) para reconciliar en `plan-operativo-90-dias.md`. Esta sesión **no** edita el plan directo (protocolo `agente-troncal-marketing`, punto 1). Cuenta correcta: **597-527-6690** (`hola@spindlelab.cl`).

## Encargo
Sumar 2 sitelinks para intentar recuperar calidad "Excelente" del anuncio (estaba en "Buena"). Leer los sitelinks actuales, cubrir los 4 servicios reales, seguir el patrón UTM existente, verificar el guardado y reportar.

## Hallazgo importante (mismo patrón del 23 jul con los títulos)
El encargo asumía "6 sitelinks activos". La realidad en la cuenta:
- **6 sitelinks existían en la biblioteca, pero solo 4 estaban asociados a la campaña.** Los 2 sin asociar eran justo **"Visibilidad en IA"** y **"Desarrollo Web"** — los que se crearon el 20 jul.
- Es **el mismo patrón de "se creó pero no se aplicó"**: el 20 jul los recursos se crearon pero nunca se asociaron a la campaña. Por eso el anuncio servía 4 y Google recomendaba "agrega al menos 6".

## Mapeo sitelinks ↔ 4 servicios reales (antes de esta sesión)
- `/servicios/auditoria-seo-tecnica/` → "Auditoría SEO Técnica" ✅ asociado
- `/servicios/visibilidad-en-ia/` → "Visibilidad en IA" ⚠️ existía sin asociar
- `/servicios/desarrollo-web/` → "Desarrollo Web" ⚠️ existía sin asociar
- `/servicios/acompanamiento-mensual/` → ❌ no existía ningún sitelink

## Cambios ejecutados (aprobados por Ramón, guardados y VERIFICADOS con recarga)
1. **Asociados a la campaña los 2 sitelinks que ya existían**: "Visibilidad en IA" + "Desarrollo Web" → la tabla pasó de 4 a **6 de 6**. Verificado.
2. **Creado 1 sitelink nuevo: "Acompañamiento Mensual"** → **7 de 7**. Verificado con recarga (fila presente, "En proceso de revisión", 23 jul 4:35 p.m.).
- Los 3 nuevos quedan "En proceso de revisión" (normal; Google los revisa antes de servir).

## Los 7 sitelinks resultantes (texto / descripción)
1. **Auditoría SEO Técnica** — Las 5 capas del análisis / Informe priorizado por impacto
2. **Nuestro Método** — Cómo trabajamos, paso a paso / Supervisión humana en cada fase
3. **Blog Técnico** — Guías sin jerga sobre SEO e IA / Artículos nuevos cada semana
4. **Servicios** — SEO técnico, IA y desarrollo web / Conoce los 4 servicios
5. **Visibilidad en IA** — Aparece en ChatGPT y Gemini / Que la IA te recomiende
6. **Desarrollo Web** — Sitios rápidos y medibles / Base técnica para rankear
7. **Acompañamiento Mensual** (NUEVO) — SEO técnico mes a mes / Mejora continua y medible

## URLs / UTM (lo verificado directamente en la cuenta)
- **Auditoría SEO Técnica**: `https://spindlelab.cl/servicios/auditoria-seo-tecnica/` — **sin UTM** (sitelink original, 14 jul).
- **Desarrollo Web**: `https://spindlelab.cl/servicios/desarrollo-web/?utm_source=google&utm_medium=cpc&utm_campaign=auditoria-seo` — **con UTM** (creado 20 jul).
- **Acompañamiento Mensual** (el que creé): `https://spindlelab.cl/servicios/acompanamiento-mensual/?utm_source=google&utm_medium=cpc&utm_campaign=auditoria-seo` — seguí el patrón UTM de Desarrollo Web / Visibilidad en IA (la misma cadena de la campaña, sin identificador propio por sitelink; los sufijos/plantillas de seguimiento están vacíos).
- **No verifiqué fila por fila** las URLs de Nuestro Método, Blog Técnico, Servicios y Visibilidad en IA (solo sus textos). Inconsistencia detectada: los sitelinks originales (ej. Auditoría) no llevan UTM; los del 20 jul sí. Vale unificar criterio en algún momento.

## Resultado sobre la calidad del anuncio
- **Calidad del anuncio: sigue en "Buena"** (no subió a "Excelente") inmediatamente.
- **Nivel de optimización: 94%** (subió de 93%).
- Nota honesta: el Ad Strength de un anuncio responsivo depende sobre todo de la diversidad de títulos/descripciones, no de los sitelinks; y los 3 sitelinks nuevos están en revisión. Google podría recalcular tras la aprobación, pero **no hay garantía de que "Excelente" venga de sumar sitelinks**. Para forzar "Excelente" habría que trabajar más los títulos (diversidad / quitar fijaciones).

## Nota lista para pegar en plan-operativo-90-dias.md (sub-bullet bajo "Encender Google Ads", Semana 5, junto a las notas 15 y 23 jul)
> - **Nota 23 jul (sitelinks) — sesión paid media:** se detectó que los sitelinks "Visibilidad en IA" y "Desarrollo Web" creados el 20 jul nunca se habían asociado a la campaña (existían en la biblioteca pero servían solo 4). Se asociaron ambos + se creó "Acompañamiento Mensual" (URL real `/servicios/acompanamiento-mensual/` con la UTM estándar) → **7 sitelinks asociados, los 4 servicios cubiertos**, verificado con recarga. Calidad del anuncio sigue "Buena" (los sitelinks casi no mueven el Ad Strength; los 3 nuevos están en revisión); nivel de optimización 93%→94%.

## Para la estrategia de campaña
- **Segundo caso de "cambio del 20 jul que no persistió"** (después de los títulos el 23 jul). Refuerza la checklist de "verificar guardado/asociación", ya incorporada a la persona de paid media.
- La meta "Excelente" no se logra con sitelinks. Si se quiere, es una tarea aparte sobre los títulos del RSA.
