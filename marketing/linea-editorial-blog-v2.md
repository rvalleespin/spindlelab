# Línea editorial del blog — v2 (28-ago-2026)

**De:** sesión fundadora del relanzamiento · **Para:** Marta (calendario) + Renata (copy) + Diego (publica)
**Por qué existe:** Ramón encontró los temas actuales "flacos": siguen los temas de la
competencia y no generan autoridad. Además el blog solo habla del eje (SEO/IA) cuando
el negocio ahora vende el motor completo. Esta línea reemplaza los artículos 3–8 del
plan operativo viejo (Tomás los cierra en su encargo).

## Principios (no negociables)

1. **Cada post se construye alrededor de una tabla.** Los motores citan páginas con
   tabla ~2,5× más; hoy 0 de los 6 posts publicados tienen una. La tabla no es adorno:
   es el esqueleto del post.
2. **Cada post nace de un hallazgo real citable** (auditorías propias, corridas del
   chequeo, la operación propia). Cero relleno SEO, cero cifras sin fuente.
3. **El blog cubre el motor completo**: eje (SEO/IA), desarrollo web, redes y paid
   media. La proporción propuesta: mitad eje, mitad resto del motor.
4. **Pilares** (del plan de reposicionamiento): Evidencia · Pedagogía AEO/GEO ·
   Contraste honesto. Cada post declara el suyo.
5. **Formato AEO en todos:** título-pregunta o título-promesa concreta, respuesta
   directa en el primer párrafo, FAQPage en el schema, tabla, es-CL.
6. **Evitar lo saturado:** "el SEO ha muerto", "que la IA te recomiende", "IA que
   trabaja por ti", "posiciónate en la era zero-click", "share of model".
7. **Vetos vigentes:** el puntaje propio del test de menciones (0/15) no se publica;
   no se nombran competidores; el "Índice de Citabilidad" ya no existe como nombre
   (el instrumento es el chequeo de /diagnostico/).

## Los 10 temas

| # | Título tentativo | Pilar | La tabla | Fuente real | Pieza del motor |
|---|---|---|---|---|---|
| 1 | Los 21 chequeos de visibilidad en IA, explicados uno por uno (y cómo correrlos gratis en tu sitio) | Pedagogía | 21 filas: chequeo · qué mide · cómo se arregla | /diagnostico/ (metodología ya pública) | Eje + campaña |
| 2 | Un motor de adquisición, no cuatro servicios sueltos: cómo se conectan tu sitio, tu SEO, tus redes y tu pauta | Pedagogía | pieza · qué aporta · qué se rompe si falta | El reposicionamiento + Método SpindleLab | Todo el motor |
| 3 | Los defaults de Google Ads que gastan tu presupuesto: lo que vimos operando nuestra propia cuenta | Evidencia + Contraste | default · qué hace · qué configurar | Notas reales de la operación jul-2026 (IA Max reactivándose, cambios que no persistían, sitelinks) — cuenta propia, sin nombrar a nadie | Paid media |
| 4 | SEO para clínicas dentales en Chile: lo que cambió con la IA | Evidencia | hallazgos más comunes en 40+ sitios dentales · impacto · arreglo | Audits Frente B (marketing/outbound/semana-03/ + lote 21-jul), anonimizados | Eje |
| 5 | Wealth management y family offices: los errores técnicos que se repiten | Evidencia (YMYL) | error · frecuencia en 15 audits · riesgo | Audits Frente A (marketing/outbound/semana-02/) | Eje |
| 6 | Anatomía de una auditoría real, hallazgo por hallazgo | Evidencia (caso) | hallazgo · antes · después | Caso Bernardo CON permiso (pendiente R7) o anonimizado | Eje + web |
| 7 | Qué tiene que tener un sitio para ser la base de un motor (y por qué casi nunca hay que rehacerlo) | Pedagogía | requisito · por qué · cómo verificarlo tú | ventas/proceso-desarrollo-web-cliente.md + audits | Desarrollo web |
| 8 | Cómo producimos un mes de contenido visual con un sistema, no con piezas sueltas | Contraste | paso · herramienta · tiempo real | marketing/redes/posts-agosto/README.md (pipeline HTML→PNG) | Redes |
| 9 | Cómo medir visibilidad en IA sin humo: el protocolo mensual que usamos (y puedes copiar) | Pedagogía + Contraste | paso del protocolo · qué se registra | /diagnostico/#medicion-mensual — **sin resultados propios** | Eje |
| 10 | **Research (APROBADO por Ramón 28-ago):** corrimos nuestro chequeo público sobre ~40 sitios de un rubro chileno. Esto encontramos | Evidencia (el cuadrante vacío: instrumento + corridas) | distribución de puntajes por chequeo, agregada | Corridas reales de GET /api/chequeo (vertical sugerido: dental — alimenta también el #4); **agregado y anónimo, sin nombrar empresas, SpindleLab auto-excluido**; corridas crudas con fecha guardadas en marketing/metricas/ | Eje · activa la tarjeta Research de blog/index.html |

## Cadencia y tandas

- **Septiembre:** #1 (semana del 1) · #2 (semana del 8) · semana 11 congelada (Fiestas
  Patrias) · #3 (semana del 22) · #4 (semana del 29).
- **Octubre:** #5, #6, #7 y el Research (#10), que necesita las corridas hechas antes.
- Edición humana de Ramón en **2 tandas por mes** (~90 min c/u, 2 posts por sentada),
  nunca al goteo. Las fechas exactas las fija Marta en el calendario.
- Flujo por post: Renata escribe (desde esta línea + la fuente real) → Ramón edita →
  Diego publica (checklist de publicación de la ficha: post copiado de uno existente,
  @graph completo con #autor-ramon, tarjeta + JSON-LD del índice del blog, sitemap,
  llms.txt, render headless 1280/390).
- **Deuda técnica que va con el primer publish:** agregar FAQPage a
  spindlelab-astro/public/blog/seo-tecnico-fintechs-chile/index.html (único de los 6
  sin él).

## Qué NO entra en esta línea

- Rankings de agencias ("mejores agencias de X") — es el patrón de la competencia y
  contradice "no nos auto-rankeamos".
- Posts de anuncio de la empresa ("renovamos nuestra imagen") — eso es de redes, no
  del blog.
- Cualquier pieza que necesite inventar un dato para sostenerse.
