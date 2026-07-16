# Cómo ejecutar el plan — manual de operación

La mecánica es simple: **abres una sesión de Claude Code sobre este repo, pegas el prompt del día, revisas lo que produce y tú haces el paso final** (enviar, publicar, llamar). Este repo es la memoria del proyecto: todo lo que los agentes produzcan se guarda aquí, así cada sesión nueva retoma donde quedó la anterior.

## Convención de carpetas (donde los agentes guardan su trabajo)

```
marketing/
  listas/           → listas de prospectos por frente (CSV/markdown)
  outbound/         → lotes semanales: semana-02/, semana-03/... (evidencia + emails listos)
  diagnosticos/     → mini-diagnósticos por prospecto
  metricas/         → panel semanal y tests de menciones en IA
  articulos/        → borradores; al aprobarse pasan a spindlelab-site/blog/
```

---

## Lo que SOLO tú puedes hacer (porque requiere tus cuentas o tu criterio)

1. **Poder ENVIAR como hola@spindlelab.cl** ← ⚠️ brecha real detectada: el Email Routing de Cloudflare solo **recibe**. Para outbound necesitas una casilla que envíe con SPF/DKIM alineados. Recomendación: **Google Workspace** (~USD 7/mes, cabe en el presupuesto) — es lo más seguro para entregabilidad de email frío. Alternativa gratis: Zoho Mail. Sin esto no arranca la fase 0.
2. **Enviar el email a SimpleTrust** (plantilla lista en `plantillas/solicitud-testimonio-simpletrust.md`).
3. **Crear la página de LinkedIn** y publicar los posts (LinkedIn exige una cuenta personal detrás; los textos te los dejan listos).
4. **Conectar cuentas la primera vez**: Search Console (tu Google), Apollo (tu cuenta), Google Ads (semana 4-5).
5. **Enviar los emails, hacer las llamadas, firmar las propuestas.** Siempre.
6. **La pasada de edición humana** en todo lo público: artículos, posts, diagnósticos. Sin excepciones.

Todo lo demás es delegable a las sesiones de Claude Code.

---

## Prompts listos para cada tarea recurrente

### 1 · Arranque (una sola vez, esta semana)
> Lee marketing/estrategia-marketing-spindlelab.md y marketing/plan-operativo-90-dias.md. Ejecuta las tareas [CC] de la semana 1: verifica el estado de SPF/DKIM/DMARC de spindlelab.cl y dime exactamente qué registros crear en Cloudflare si falta alguno; guíame paso a paso (no soy técnico) para configurar Google Search Console y Cloudflare Web Analytics; deja listos los textos de la página de LinkedIn desde plantillas/linkedin-posts.md; construye las listas de los frentes A y B en marketing/listas/ con los criterios de la estrategia (§3); redacta el artículo 1 en marketing/articulos/; y ejecuta la línea base del test de menciones en IA guardándola en marketing/metricas/.

### 2 · Lote semanal de outbound (lunes o martes, ~1,5 h tuyas)
> Prepara el lote de outbound de esta semana según el plan operativo (revisa en qué semana estamos y el tope de contactos que corresponde). Toma los siguientes prospectos de marketing/listas/ [o: elige tú los mejores N], ejecuta la evidencia personalizada (pregunta real a ChatGPT/Perplexity por la categoría de cada uno, documenta el resultado) y redacta los emails del toque 1 con las plantillas de plantillas/emails-fase0.md. Guarda todo en marketing/outbound/semana-XX/ listo para que yo revise y envíe. Incluye también los toques 2 y 3 programados de los lotes anteriores.

### 3 · Mini-diagnóstico (cada vez que alguien responda «ok»)
> Respondió [EMPRESA] ([URL]). Ejecuta el mini-diagnóstico de 1 página siguiendo el Workflow v2.1 (Capa 1: auditoría técnica; Capa 2: visibilidad en IA). Guárdalo en marketing/diagnosticos/[empresa].md. Marca explícitamente 2-3 hallazgos donde necesites mi validación de criterio, y cierra con el puente a la llamada de 20 minutos. Objetivo: que yo lo revise en 20 minutos y lo envíe hoy.

### 4 · Artículo semanal (jueves, ~45 min tuyas de edición)
> Redacta el artículo de esta semana según el pipeline de temas de la estrategia (§6.2) y los ya publicados en spindlelab-site/blog/. Formato AEO: título-pregunta, respuesta directa en el primer párrafo, JSON-LD FAQPage, es-CL, mismo estilo y estructura HTML que los artículos existentes. Déjalo en marketing/articulos/ para mi edición; cuando te confirme, intégralo al sitio con su entrada en el índice del blog y el sitemap.

### 5 · Posts de LinkedIn (mismo jueves)
> Prepara los 3 posts de esta semana con los formatos de plantillas/linkedin-posts.md: uno reciclando el último artículo del blog, uno de observación con evidencia real (ejecuta la prueba en ChatGPT tú mismo y documenta el resultado), uno de mito/método. Respeta las reglas de anonimato.

### 6 · Briefing pre-llamada (antes de cada llamada de 20 min)
> Mañana tengo llamada con [EMPRESA]. Prepara un briefing de 1 página: quiénes son, su sitio y estado SEO/IA (usa su mini-diagnóstico en marketing/diagnosticos/), qué les duele probablemente, objeciones esperables con respuestas, y los 3 puntos que debo lograr comunicar. Recuerda: auditoría desde $350k, retainer desde $500k/mes — solo se dicen en la llamada.

### 7 · Panel de métricas (viernes, 15 min tuyas)
> Arma el panel semanal en marketing/metricas/: enviados/respuestas/rebotes del outbound (te pego abajo los datos de Apollo), diagnósticos entregados, llamadas, propuestas, tráfico de Search Console y Cloudflare Analytics [pegar o exportar datos]. Compara contra los umbrales de §8 de la estrategia y dime en 5 líneas: qué va bien, qué va mal, y qué única cosa cambiarías la próxima semana.

### 8 · Test mensual de menciones en IA (una vez al mes)
> Ejecuta el test mensual de menciones en IA con los 5 prompts fijos de marketing/metricas/, guarda los resultados con fecha y compáralos contra la línea base y el mes anterior.

---

## Tu semana en la práctica (6–8 h)

| Día | Tú haces | Tiempo |
|---|---|---|
| Lun/Mar | Pegar prompt 2 → revisar lote → enviar emails | 1,5 h |
| Mié | Responder interesados; si hay diagnóstico: prompt 3 → validar → enviar | 1 h |
| Jue | Prompt 4 y 5 → editar artículo → publicar posts | 1,5 h |
| Vie | Prompt 7 → leer panel → decidir | 30 min |
| Flotante | Llamadas (con prompt 6 antes de cada una) y propuestas | 1–3 h |

## Reglas que no se negocian

- Tope de **50 emails/semana** aunque el agente pueda producir 500 — el límite es la reputación del dominio.
- **Nada** producido por IA se envía o publica sin tu pasada.
- La promesa «mini-diagnóstico en 48 h» no se rompe jamás (estándar interno: 24 h).
- Con 2 clientes activos, el outbound se pausa; con 1, baja a 25/semana.
