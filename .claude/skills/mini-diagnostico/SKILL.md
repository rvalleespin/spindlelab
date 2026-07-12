---
name: mini-diagnostico
description: Genera el mini-diagnóstico de 1 página (SEO técnico + visibilidad en IA) que SpindleLab promete en 48h a cualquier prospecto que responda interesado a un email de outbound. Usar cuando un prospecto de Frente A, B o C (o cualquier contacto directo) dice "sí" / "ok" / pide el diagnóstico.
---

# Mini-diagnóstico SpindleLab

Tarea recurrente: cada vez que un prospecto responde con interés a un email de outbound, SpindleLab se compromete a entregar un diagnóstico de 1 página en 48 horas (apuntar a 24h — regla sagrada del plan operativo, nunca se rompe). Este skill produce ese documento de forma consistente, sin reconstruir el proceso cada vez.

Referencias que este skill asume ya leídas o a leer si hace falta detalle:
- `marketing/plantillas/mini-diagnostico/guia-mini-diagnostico.md` — estructura fija, reglas de contenido y checklist completo.
- `marketing/plantillas/mini-diagnostico/plantilla-mini-diagnostico.html` — la plantilla editable.
- `marketing/brand/manual-de-marca.md` — sistema de marca (colores, tipografía, regla de escasez del dorado).
- `marketing/articulos/2026-07-articulo-01-que-es-un-mini-diagnostico-seo.md` — la promesa pública que este documento debe cumplir.

## Cuándo se usa

Trigger: un prospecto respondió a un email de outbound (de `marketing/outbound/`) mostrando interés, o pidió el diagnóstico por cualquier otro canal. Si el prospecto ya tiene un hallazgo técnico documentado en un lote de outbound (`marketing/outbound/semana-*/lote-*.md`), **reutilizarlo** — no re-investigar desde cero.

## Inputs necesarios antes de empezar

Preguntar solo lo que falte (no repreguntar lo que ya está en el hilo de conversación o en un lote de outbound existente):
1. Nombre de la empresa y dominio.
2. Rubro/categoría (para saber si aplica el marco YMYL de la sección 3).
3. Nombre de contacto (si se sabe).
4. ¿Viene de un lote de outbound ya investigado? Si sí, de cuál archivo — para reutilizar el hallazgo y la pregunta ChatGPT ya usados.

## Paso 1 — Auditoría técnica (si no existe ya una)

Verificar con `curl`, nunca solo mirar el sitio visualmente:

```bash
curl -sS -o /tmp/sitio.html -w "HTTP %{http_code}\n" -A "Mozilla/5.0 (compatible; SpindleLabBot/1.0)" --max-time 15 "https://[dominio]"
grep -o '<title>[^<]*</title>' /tmp/sitio.html
grep -io '<meta name="description"[^>]*>' /tmp/sitio.html
grep -c "application/ld+json" /tmp/sitio.html
```

⚠️ **Si `curl` falla por "SSL certificate problem: self-signed certificate"**, es el proxy de salida del entorno (`Anthropic Egress Gateway`), no un problema real del sitio del prospecto. Repetir con `curl -k` para ver el sitio real antes de reportar nada sobre SSL. No fabricar un hallazgo a partir de ese error.

Documentar solo lo verificado: status HTTP, título, meta description (presente/ausente), conteo de datos estructurados, bloqueos (403/503), blog/contenido presente o no.

## Paso 2 — Visibilidad en motores de IA (requiere al humano)

Claude no puede consultar ChatGPT, Perplexity o Gemini directamente. Pedir a Ramón que pegue el resultado real de la "pregunta ChatGPT" ya definida para ese prospecto (reusar la del lote de outbound si existe; si no, definir una pregunta natural que un cliente real haría). Si no se ejecuta la prueba a tiempo para cumplir el plazo de 48h, redactar la sección en términos de riesgo general, sin inventar qué apareció o no.

## Paso 3 — Señales de confianza

Si el rubro es YMYL (finanzas, salud): revisar autoría nombrada, prensa, certificaciones, datos de contacto verificables — qué existe y qué falta. Reutilizar lo que ya se encontró en la investigación del outbound si aplica.

## Paso 4 — La corrección de mayor impacto

Síntesis de especialista: si el prospecto solo pudiera arreglar una cosa este mes, cuál y por qué. Una idea, no una lista. Este es el único bloque del documento con acento dorado — ver regla de escasez en la guía.

## Paso 5 — Generar el documento

```bash
mkdir -p "marketing/diagnosticos/SPL-DIAG-AAAA-NNN-[empresa-slug]"
cp marketing/plantillas/mini-diagnostico/plantilla-mini-diagnostico.html "marketing/diagnosticos/SPL-DIAG-AAAA-NNN-[empresa-slug]/diagnostico.html"
cp marketing/plantillas/mini-diagnostico/Gabarito.woff2 marketing/plantillas/mini-diagnostico/inter.woff2 "marketing/diagnosticos/SPL-DIAG-AAAA-NNN-[empresa-slug]/"
```

Reemplazar los `[[...]]` del HTML con la investigación real. Renderizar para verificar visualmente antes de entregar:

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=900,1150 --screenshot=diagnostico.png "file://[ruta absoluta]/diagnostico.html"
```

(Si esa ruta de Chromium no existe en el entorno, buscar el binario real con `find /opt/pw-browsers -iname "chrome"`.)

El PNG es para revisión rápida. Para el entregable final, abrir el HTML en un navegador real y "Imprimir → Guardar como PDF" (o pedir explícitamente que se genere el PDF si hay herramienta disponible).

Numeración: `SPL-DIAG-AAAA-NNN` correlativo, serie independiente de las cotizaciones (`SPL-COT-`).

## Paso 6 — Checklist antes de entregar

Ver checklist completo en la guía. Resumen:
- [ ] 4 hallazgos reales, ninguno inventado
- [ ] Sección 2 con resultado real o redactada sin inventar uno
- [ ] Un solo acento dorado (sección 4)
- [ ] Remitente hola@spindlelab.cl
- [ ] Dentro de 48h desde la respuesta del prospecto (apuntar a 24h)
- [ ] Actualizar `ventas/pipeline.md` → etapa "Diagnóstico/propuesta enviada"

## Después de entregar

Actualizar `ventas/pipeline.md` con la nueva fila o el cambio de etapa del prospecto, y si el prospecto venía de un lote de outbound, anotar el resultado en la columna "Diagnóstico" de esa tabla de seguimiento.
