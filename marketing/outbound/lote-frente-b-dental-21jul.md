# Lote Frente B — dental/estética (borrador, 21 jul 2026)

**Origen de los emails:** `ventas/contactos-clinicas-dentales-chile.csv` (47 clínicas, decisor + email verificado por Apollo).
**Estado:** BORRADOR para revisión de Ramón. **No enviado.** Respetar rampa (tope 50/sem) y orden de calentamiento antes de mandar. Envío a mano desde `hola@spindlelab.cl` (Gmail web), no vía herramienta.
**Método (igual que lote-1-frente-c):** por cada clínica se verifica el sitio con lector automatizado → se busca un hallazgo técnico real → se corre la prueba de evidencia en ChatGPT → se redacta el toque 1 con la plantilla F-B. Sin hallazgo verificado, no sale el email.

---

## 1. Clínica Dental Naran — dentalnaran.cl ✅ verificado
**Decisora:** Carolina Bilbao (CEO & Founder) · carolina.bilbao@clinicanaran.cl (verificado)
**Hallazgo verificado (21 jul):** al leer dentalnaran.cl con un lector automatizado (los que usan buscadores y motores de IA) el sitio devuelve una **página de verificación de Cloudflare** ("One moment, please…") en vez del contenido — comprobado dos veces (una devolvió incluso HTTP 415). Detrás de esa pantalla no hay meta description ni datos estructurados legibles. En la práctica, ChatGPT y Perplexity no acceden al contenido real de la clínica.
**Pregunta ChatGPT (correr antes de enviar):** «¿Qué clínica en Providencia recomiendas para diseño de sonrisa o carillas?»

**Asunto:** dentalnaran.cl le muestra una pantalla de verificación a ChatGPT, no tu sitio — lo comprobé

Hola Carolina:

Antes de escribirte intenté leer dentalnaran.cl con las mismas herramientas automatizadas que usan los buscadores y los motores de IA, y en vez del sitio aparece una pantalla de verificación de Cloudflare ("One moment, please…"). Lo probé dos veces, mismo resultado ambas veces.

[+EVIDENCIA: Le pregunté a ChatGPT por diseño de sonrisa en Providencia — recomendó a (X e Y). Naran no apareció, ni podría, si tu contenido queda detrás de esa pantalla.]

Todo el trabajo de diseño de sonrisa y carillas que muestran queda invisible para un motor de IA. No es un problema de contenido: es un bloqueo técnico puntual, de los más directos de corregir.

¿Te preparo un mini-diagnóstico de 1 página en 48 horas mostrando exactamente qué pasa? Gratis, sin compromiso, y te quedas con el documento.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## Próximos en el lote (pendientes de redactar cuando confirmes rampa)

Estas dos tienen los básicos técnicos BIEN (meta description + datos estructurados presentes), así que su gancho **no** es un error técnico sino la **prueba de evidencia en IA** (preguntar por su categoría y mostrar que no aparecen) o un hallazgo más fino en el diagnóstico:

- **Clínica Dra. Zaror** (estética, Las Condes/Vitacura) · dra@clinicadrazaror.cl — sitio con meta + JSON-LD OK. Gancho: evidencia IA sobre «medicina estética facial Las Condes / bioestimulación».
- **Clínica Terré** (estética, Las Condes) · fterre@clinicaterre.cl — WordPress con meta + JSON-LD OK. Gancho: evidencia IA sobre «botox y rellenos faciales Las Condes».

Resto de las 47 en el CSV: seguir el mismo método, en lotes del tamaño de la rampa de la semana.
