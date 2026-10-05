# Encargo: agente dedicado a contenido en redes (LinkedIn + Instagram)

**Para:** una sesión/agente nuevo, dedicado solo a esto · **De:** sesión de marketing · **Fecha:** 15 jul 2026

## Por qué existe este documento

Hasta ahora, los posts de LinkedIn se producían dentro de la sesión principal de marketing, mezclados con outbound, artículos y ventas. Eso funciona para arrancar, pero no escala: la cadencia de redes es semanal y recurrente, y no debería competir por atención con decisiones de outbound o pipeline. Este documento es el "arranque en frío" para que un agente separado tome la propiedad completa de redes — léelo una vez y puedes operar de forma autónoma desde ahí, reportando de vuelta solo lo que corresponda al pipeline (ver §6).

## 1. Alcance

- **LinkedIn** (canal principal): página de empresa SpindleLab, ya creada (14 jul 2026).
- **Instagram** (canal secundario, menor prioridad): perfil ya configurado, un carrusel publicado en semana 1. Detalle de marca en `brand/redes/perfil-instagram.md`.
- **Fuera de alcance:** artículos de blog (tienen su propio flujo hacia `spindlelab-site/`, ver otros documentos en esta misma carpeta), emails de outbound (`marketing/outbound/`), pipeline de ventas (`ventas/`).

## 2. Reglas de marca (no negociables)

Fuente completa: `marketing/brand/manual-de-marca.md`. Lo esencial para redes:

- **Anonimato del fundador (actualizado 21 jul 2026):** los posts de la página los firma la marca, no una persona con nombre y apellido visible. Pero el anonimato se relajó el 12 jul, así que:
  - El perfil personal de Ramón **sí puede publicar posts propios** que mencionen su rol en SpindleLab, con su nombre de pila (sin apellido visible ni foto real todavía). Ver `marketing/redes/2026-07-15-post-empresa-y-personal.md`.
  - El perfil personal **sí puede compartir, comentar y reaccionar a los posts de la página** (convención nueva confirmada por Ramón el 21 jul). Sirve para darle a la página el empujón inicial de alcance/seguidores. Al compartir, el "comentario" que va arriba se escribe en su voz personal (primera persona singular).
- **Links de LinkedIn:** van en el primer comentario del post, no en el cuerpo (convención nueva 21 jul — pendiente actualizar `plantillas/linkedin-posts.md`, que hoy todavía pone el link en el cuerpo).
- **Acento dorado con escasez:** si se produce cualquier pieza visual (carrusel, imagen), el dorado (`#C9A227`) aparece UNA sola vez por pieza. Nunca como color de texto corrido ni en viñetas de lista.
- **Tipografía:** Gabarito para titulares/wordmark, Inter para cuerpo de texto. Activos ya generados en `brand/redes/` y `brand/logo/`.
- **Tono — esto se aprendió a pulso esta semana, léelo con cuidado:**
  - Nada de guiones largos (—) usados como muletilla de impacto. Usa puntos, comas o "y"/"pero" según corresponda. Es el tic más delatador de texto generado por IA.
  - Frases cortas, directas. Nada de "Ironía que encontré..." (fragmentos sin sujeto) — mejor "Encontré algo irónico...".
  - Cero jerga de venta inflada ("revolucionario", "en la era digital", "no te pierdas la oportunidad", "sinergia").
  - No repetir muletillas entre piezas — si ya usaste "donde la confianza lo es todo" en un email o post, no la repitas en el siguiente. Antes de publicar, compara contra lo último publicado.
  - El hallazgo técnico sostiene el post solo. No hace falta forzar una moraleja al final.
  - Formato "[+EVIDENCIA: ...]" con placeholders sin completar (X e Y) **nunca se publica así** — o se completa con datos reales (probando la pregunta en ChatGPT de verdad) o se elimina la línea entera.

## 3. Plantillas y formatos ya validados

Todo en `marketing/plantillas/linkedin-posts.md`:

- **Formato 1** — Observación con evidencia ("hice la prueba en ChatGPT...")
- **Formato 2** — Reciclaje de artículo del blog
- **Formato 3** — Mito vs. realidad
- **Formato 4** — Detrás del método (autoridad sin cliente nombrado)
- **Formato 5** — Caso con nombre (SOLO con permiso explícito del cliente — hoy nadie lo ha dado)

Cadencia sugerida: 2 posts/semana (martes y jueves).

## 4. De dónde sacar contenido real

La regla de oro: **nunca inventar hallazgos.** Todo post basado en "encontré que..." debe salir de trabajo real ya hecho, nunca de una afirmación genérica. Fuentes disponibles:

- `marketing/outbound/semana-02/lote-1-frente-a.md` y `lote-1-frente-c.md` — 20 auditorías técnicas reales (con hallazgos verificados: errores 403, JavaScript sin renderizar, datos estructurados ausentes, meta descriptions vacías o cortadas, confusión de entidad con homónimos, etc.)
- **Regla de anonimato de prospectos:** se puede usar el hallazgo técnico (es genérico y educativo), pero **nunca el nombre de la empresa** sin su permiso explícito. Generalizar: "una boutique de wealth management" en vez de "Vicapital".
- A medida que haya clientes reales con permiso de caso público (Bernardo ya lo tiene pendiente de pedir, ver `ventas/pipeline.md`), esos casos sí pueden nombrarse — Formato 5.

## 5. Estado actual (actualizado 16 jul 2026 — corrige el snapshot original del 15 jul)

- **Corrección 16 jul (confirmado por Ramón):** LinkedIn página de empresa creada 14 jul, pero **sigue sin ningún post propio**. Lo que este encargo registró como "Post 1 publicado" en realidad salió en la cuenta **personal** de Ramón, no en la página — de ahora en adelante hay que llevar el seguimiento de ambas cuentas por separado para no repetir la confusión. Posts 1, 2 y 3 de `marketing/outbound/semana-02/posts-linkedin-semana-02.md` siguen disponibles sin usar: son el inventario listo para arrancar la página.
- Cuenta personal de Ramón: primer post propio publicado 16 jul (reflexión sobre AEO/GEO en Chile, ver `marketing/redes/2026-07-15-post-empresa-y-personal.md`), bajo la regla nueva que permite mencionar su rol en SpindleLab (actualización en `.claude/skills/persona-social-media/SKILL.md`, §Reglas de marca).
- Instagram: perfil configurado, un carrusel publicado en semana 1 (`brand/redes/carrusel-01/`). Sin cadencia activa desde entonces — confirmado por Ramón el 16 jul que ya pasó demasiado tiempo sin publicar, retomarlo es ahora prioridad.

## 6. Cómo reportar de vuelta

Este agente no necesita aprobación previa para redactar borradores, pero **Ramón revisa y aprueba antes de publicar cualquier pieza** (regla general del proyecto: nada generado por IA se publica sin pasada humana). El mecanismo:

1. Producir el borrador en un archivo nuevo dentro de `marketing/outbound/semana-XX/` (mismo patrón que `posts-linkedin-semana-02.md`) o, si prefieres una carpeta propia, crear `marketing/redes/` y mantenerla ahí en adelante — decisión del agente, pero sé consistente.
2. Marcar en `marketing/plan-operativo-90-dias.md` (sección "Rutina semanal tipo" ya la referencia: "Jueves 1h: editar artículo de la semana + aprobar posts de LinkedIn") cuando algo esté listo para revisión.
3. Una vez Ramón confirma que publicó (él lo hace manualmente, este agente no tiene acceso al navegador), actualizar el archivo del borrador con el estado "✅ publicado [fecha]".

## 7. Primera tarea concreta

No hace falta reinventar nada para arrancar: los posts 2 y 3 de esta semana ya están escritos y aprobados en tono. Confirma con Ramón si ya se publicaron (el Post 2 correspondía al jueves 16 jul) y, si no, ese es el primer pendiente a resolver. De ahí en adelante, toma la cadencia semanal como propia.
