# Guía de la revisión gratis de una página (antes «mini-diagnóstico») · SpindleLab

**Documento base (al día desde el 30-oct-2026):** la revisión gratis de una página es lo que ofrece `spindlelab.cl/contacto/` a quien ya tiene sitio, detrás del botón «Hablemos de tu sitio». El pedido llega por ese formulario y la revisión sale **en un día hábil**. A quien no tiene sitio no se le hace revisión: se le responde cómo lo haríamos y cuánto cuesta. Está descrita en público en `spindlelab.cl/blog/que-es-un-mini-diagnostico-seo/` («¿Qué es la revisión gratis de una página y qué incluye?»), que manda sobre el borrador de julio en `marketing/articulos/2026-07-articulo-01-que-es-un-mini-diagnostico-seo.md`. Esta guía documenta cómo se construye, para que sea repetible en vez de improvisada cada vez que llega un pedido.

*Historia:* hasta oct-2026 se llamaba mini-diagnóstico y nacía de los correos de `plantillas/emails-fase0.md` («¿te preparo un mini-diagnóstico de 1 página en 48 horas?»). Esa plantilla está retirada; el nombre de la carpeta queda.

Usar junto con `plantilla-mini-diagnostico.html` (la plantilla editable) y el Skill `/mini-diagnostico` (`.claude/skills/mini-diagnostico/`), que automatiza el flujo completo.

---

## 1. Estructura fija (4 secciones, este orden, siempre)

Definida en el artículo público (texto vivo leído el 2-nov-2026) — no se improvisa ni se agregan secciones:

1. **Estado técnico esencial** — lo que un buscador ve al llegar al sitio: rastreo, indexación, meta description, datos estructurados, errores HTTP evidentes.
2. **Si ChatGPT y otras IA pueden visitar tu sitio y entender a qué te dedicas** — si los robots de ChatGPT, Gemini y Perplexity no están bloqueados, y si lo que dice la página alcanza para que entiendan qué hace, para quién y dónde. El artículo dice que la revisión **no** mide qué responden hoy esas IA; eso es de la auditoría de visibilidad en IA.
3. **Señales de confianza** — en rubros YMYL (finanzas, salud) qué pruebas de autoridad existen y cuáles faltan (E-E-A-T: autoría, prensa, certificaciones).
4. **La corrección que más pesa** — una sola cosa, no una lista. Es el único bloque con acento dorado en todo el documento (ver §3).

Después de las cuatro va el «por dónde partiríamos» que el artículo promete, y no se numera como sección: la tabla **«La ruta completa, con el estado de cada paso»** (4 pasos con su estado medido; el paso 1 va regalado, del 2 al 4 es el trabajo que se contrata) y un párrafo con por dónde partiríamos, su precio, y en una línea lo demás que se conecta al sitio, con sus precios publicados (+ IVA); si no se parte por el sitio, esa línea nombra también Desarrollo web con su precio de partida. La lámina 7 de la presentación de la llamada se copia de esa tabla.

## 2. Reglas de contenido — no fabricar nada

- **Cada hallazgo debe venir de una verificación real**, no de una suposición. Método probado en `outbound/semana-02/lote-1-frente-*.md`: `curl` directo con user-agent explícito para status HTTP, título, meta description, conteo de JSON-LD; nunca solo "mirar" el sitio.
- ⚠️ **Advertencia del entorno:** las peticiones HTTPS salientes pasan por un proxy que inyecta su propio certificado (`Anthropic Egress Gateway`). Si `curl` sin `-k` falla por "certificado autofirmado", **no es un hallazgo real del sitio del prospecto** — es el proxy. Repetir con `curl -k` para verificar el sitio real antes de reportar cualquier problema de SSL.
- La **sección 2 se verifica con curl, igual que la 1** (robots.txt, respuesta del servidor a cada robot, lo que dice la página). No se afirma qué "apareció" o no en ChatGPT: la revisión publicada no lo mide, y Claude tampoco puede consultarlo.
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
- [ ] La sección 2 dice si las IA pueden entrar y entender el sitio, verificado; no afirma qué responden hoy
- [ ] Un solo acento dorado en todo el documento (sección 4)
- [ ] Remitente: **hola@spindlelab.cl**
- [ ] Enviada dentro de un día hábil desde que llegó el pedido
- [ ] La tabla de ruta trae los 4 pasos con su estado medido, sin dorado
- [ ] El cierre dice por dónde partiríamos y lo demás que se conecta al sitio, con los precios publicados leídos del sitio ese día (+ IVA), nombra Desarrollo web con su precio de partida si no se parte por el sitio, y «Hablemos de tu sitio»
- [ ] `ventas/pipeline.md` actualizado a la nueva etapa
