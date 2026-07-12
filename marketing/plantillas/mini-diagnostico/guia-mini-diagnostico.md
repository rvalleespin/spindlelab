# Guía del mini-diagnóstico SpindleLab

**Documento base:** el mini-diagnóstico es la promesa central del outbound — está descrito públicamente en `marketing/articulos/2026-07-articulo-01-que-es-un-mini-diagnostico-seo.md` y comprometido en cada email de `plantillas/emails-fase0.md` ("¿te preparo un mini-diagnóstico de 1 página en 48 horas?"). Esta guía documenta cómo se construye, para que sea repetible en vez de improvisado cada vez que alguien responde interesado.

Usar junto con `plantilla-mini-diagnostico.html` (la plantilla editable) y el Skill `/mini-diagnostico` (`.claude/skills/mini-diagnostico/`), que automatiza el flujo completo.

---

## 1. Estructura fija (4 secciones, este orden, siempre)

Definida en el artículo público — no se improvisa ni se agregan secciones:

1. **Estado técnico esencial** — lo que un buscador ve al llegar al sitio: rastreo, indexación, meta description, datos estructurados, errores HTTP evidentes.
2. **Visibilidad en motores de IA** — resultado real de preguntarle a ChatGPT/Perplexity/Gemini la pregunta de categoría del prospecto. Si no se aparece, quién aparece en su lugar.
3. **Señales de confianza** — en rubros YMYL (finanzas, salud) qué pruebas de autoridad existen y cuáles faltan (E-E-A-T: autoría, prensa, certificaciones).
4. **La corrección de mayor impacto** — una sola cosa, no una lista. Es el único bloque con acento dorado en todo el documento (ver §3).

## 2. Reglas de contenido — no fabricar nada

- **Cada hallazgo debe venir de una verificación real**, no de una suposición. Método probado en `outbound/semana-02/lote-1-frente-*.md`: `curl` directo con user-agent explícito para status HTTP, título, meta description, conteo de JSON-LD; nunca solo "mirar" el sitio.
- ⚠️ **Advertencia del entorno:** las peticiones HTTPS salientes pasan por un proxy que inyecta su propio certificado (`Anthropic Egress Gateway`). Si `curl` sin `-k` falla por "certificado autofirmado", **no es un hallazgo real del sitio del prospecto** — es el proxy. Repetir con `curl -k` para verificar el sitio real antes de reportar cualquier problema de SSL.
- La **sección 2 (visibilidad en IA) depende del humano**: Claude no puede consultar ChatGPT/Perplexity/Gemini directamente. Si Ramón no ejecuta la prueba, la sección se redacta describiendo el riesgo en términos generales — nunca inventando qué "apareció" o no.
- Si un hallazgo técnico ya existe (el prospecto viene de un lote de outbound ya investigado), **reutilizarlo** en vez de re-auditar desde cero — ya está verificado y documentado.

## 3. Sistema visual — reglas de marca aplicadas

- Tipografía: **Gabarito** (wordmark, títulos, sección 4) + **Inter** (cuerpo). Fuentes cargadas desde `Gabarito.woff2` / `inter.woff2` en la misma carpeta — **deben copiarse junto a cada instancia del documento** o el `@font-face` no carga (mismo problema ya resuelto en el carrusel de Instagram).
- Paleta: tinta `#131A22` / papel `#F7F5F0` / dorado `#C9A227` solo en el punto del wordmark y en la sección 4 / gris pluma `#5D6673` para metadatos.
- **Regla de escasez del dorado:** un uso adicional por pieza, nunca más. En este documento ese uso ya está fijado en la sección 4 (la corrección de mayor impacto) — no agregar dorado en ningún otro lugar (ni en el CTA final, ni en viñetas, ni en subrayados).

## 4. Numeración y ubicación

- Correlativo `SPL-DIAG-AAAA-NNN` (mismo patrón que las cotizaciones `SPL-COT-AAAA-NNN`, serie independiente).
- Guardar en `marketing/diagnosticos/SPL-DIAG-AAAA-NNN-[empresa-slug]/`, con el HTML final, el PNG/PDF renderizado, y una copia de los dos `.woff2`.

## 5. Cómo usar la plantilla

1. Copiar la carpeta `plantillas/mini-diagnostico/` completa (HTML + 2 fuentes) a `marketing/diagnosticos/SPL-DIAG-AAAA-NNN-[empresa-slug]/`.
2. Reemplazar los bloques `[[...]]` con la investigación real (ver §2).
3. Renderizar: `chromium --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=900,1150 --screenshot=diagnostico.png file://[ruta].html`, o abrir el HTML en un navegador real y usar "Imprimir → Guardar como PDF".
4. Revisar contra el checklist de §6 antes de enviar.
5. Actualizar `ventas/pipeline.md`: mover al prospecto a la etapa **"Diagnóstico/propuesta enviada"**.

## 6. Checklist antes de enviar

- [ ] Número de documento único (`SPL-DIAG-AAAA-NNN`, correlativo)
- [ ] Los 4 hallazgos son reales y verificados — ninguno inventado o genérico
- [ ] La sección 2 (IA) tiene un resultado real, o está redactada sin inventar uno
- [ ] Un solo acento dorado en todo el documento (sección 4)
- [ ] Remitente: **hola@spindlelab.cl**
- [ ] Enviado dentro de 48 horas desde que el prospecto respondió (apuntar a 24h)
- [ ] `ventas/pipeline.md` actualizado a la nueva etapa
