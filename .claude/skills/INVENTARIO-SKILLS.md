# Inventario de Skills — SpindleLab

_Actualizado: 20 jul 2026._ Lista de todos los skills disponibles, qué hace cada uno y cuándo conviene usarlo. Dos grandes grupos: **(1) los tuyos**, hechos a mano para SpindleLab, y **(2) los de plugins**, potencia externa que se activa cuando la necesitas.

> ⚠️ Varios plugins con datos (SEO, ads, analytics) necesitan **autorizar su conector** antes de traer datos reales. Sin eso el skill razona pero no consulta nada. Se autoriza en sesión interactiva (`/mcp` o ajustes de conectores en claude.ai).

---

## 1. Tus skills propios de SpindleLab

Son tu diferenciación: codifican tu marca, tono y proceso. Nadie más los tiene.

| Skill | Qué hace | Cuándo usarlo |
|---|---|---|
| **`agente-troncal-marketing`** | Rol troncal/orquestador de una sesión de marketing. Define el protocolo para que sesiones paralelas no se desincronicen. | Al **empezar** cualquier sesión del repo que toque seguimiento, estrategia u orquestación entre frentes (outbound, contenido, paid, web). |
| **`mini-diagnostico`** | Genera el entregable de 1 página (SEO técnico + visibilidad IA) que prometes en 48h. Ya mejorado con lo aprendido en la prueba de searchfit (chequeo multi-página, FAQPage, alt, NAP, Core Web Vitals, DOM renderizado). | Cuando un prospecto (Frente A/B/C o contacto directo) dice "sí"/"ok" o pide el diagnóstico. **Tu producto de entrada.** |
| **`persona-paid-media`** | Encargado de Google Ads. Opera con **acceso directo al navegador** (lee la cuenta libre; escribe solo con tu sí). Trae la cuenta correcta, la filosofía de la campaña y las trampas de Google (IA Max, etc.). | Para revisar, ajustar o diagnosticar la campaña de Google Ads. |
| **`persona-meta-ads`** | Encargado de paid media para Meta (Facebook + Instagram). Hoy opera guiando con capturas (sin navegador). | Para configurar y gestionar la primera campaña de Meta. _(Candidato a actualizar a navegador, igual que se hizo con Google.)_ |
| **`persona-social-media`** | Contenido en redes (LinkedIn + Instagram): reglas de marca, tono, cadencia, y el formato propio de la cuenta personal. | Para redactar, revisar tono o gestionar la cadencia de posts. **Leer entero antes de escribir cualquier post.** |
| **`persona-disenador-web`** | Diseñador/dev web: sistema de marca y convenciones del sitio. | Al trabajar en `spindlelab-site/` o en proyectos de la línea Desarrollo Web (ej. Bernardo Combeau). |
| **`performance-marketing-agent`** | Copia versionada del agente de Adspirer (175+ tools multi-plataforma). Redundante con el plugin; requiere Adspirer conectado. | Solo si sumas paid media más allá de Google (Meta/LinkedIn/TikTok/Amazon) vía Adspirer. Para solo-Google, `persona-paid-media` basta. |
| **`dream`** _(personal, no del repo)_ | Revisión diaria: lee tus últimas 24h de actividad en tu stack de IA y escribe las 4 prescripciones de mayor impacto. | Rutina diaria personal, fuera del trabajo de cliente. |

---

## 2. Plugins clave para la agencia

Ordenados por impacto para SpindleLab.

### 🔍 SEO y visibilidad en IA — plugin `searchfit-seo` (el más valioso)
Multiplica tu `mini-diagnostico` y sostiene tu línea de servicio SEO.

| Skill | Cuándo usarlo |
|---|---|
| `seo-audit` / `seo-auditor` (agente) | Auditoría completa de un sitio — probado en lacasadejuana.cl, caza 500/404, schema, alt, etc. |
| `ai-visibility` | Cómo aparece (o no) una marca en ChatGPT/Claude/Gemini/Perplexity — GEO/AEO. **Tu diferencial.** |
| `technical-seo` | Core Web Vitals, crawlabilidad, robots/sitemap, velocidad. |
| `on-page-seo` | Optimizar una página concreta (meta, headings, keyword). |
| `keyword-clustering` | Agrupar keywords en temas → plan de contenido. |
| `content-strategy` / `content-brief` | Planificar qué contenido crear y briefear un artículo antes de escribir. |
| `schema-markup` | Generar JSON-LD (FAQPage, negocio local, etc.). |
| `internal-linking` / `broken-links` | Estructura de enlaces internos y cazar links rotos. |
| `competitor-analyzer` (agente) | Comparar SEO/contenido contra 2-3 competidores. |

### 🎯 Prospección — plugin `vpai` (vibe-prospecting)
| `vibe-prospecting` | Enriquecer y armar listas de prospectos para alimentar el outbound (Frentes A/B/C). _Cobra por fetch._ |

### 📈 Paid media — plugin `adspirer-ads-agent`
| `performance-review`, `wasted-spend`, `keyword-research`, `write-ad-copy` | Revisión cross-plataforma, cazar gasto desperdiciado, research de keywords, copy de anuncios. Requiere Adspirer conectado. Útil si escalas más allá de Google. |

### ✍️ Contenido y campañas — plugin `marketing`
| `campaign-plan` | Brief de campaña completo con calendario semana a semana. |
| `content-creation` / `draft-content` | Redactar piezas de contenido. |
| `email-sequence` | Secuencias de email (outbound/nurturing). |
| `performance-report` | Informe de rendimiento para cliente. |
| `competitive-brief` / `brand-review` | Brief competitivo y revisión de marca. |

### 🎨 Marca y voz — plugin `brand-voice`
| `discover-brand`, `generate-guidelines`, `enforce-voice` | Descubrir materiales de marca, generar guías de voz y aplicarlas. **Vale la pena cuando escales a varios clientes** y necesites codificar la voz de cada uno. |

### 📅 Redes: agendar — plugin `postiz`
| `postiz` | Programar y publicar posts en redes. Para cuando quieras automatizar la cadencia. |

### 📄 Entregables y visuales
| `anthropic-skills:pptx` / `docx` / `xlsx` / `pdf` | Generar presentaciones, documentos, planillas y PDFs para clientes. |
| `dataviz` | Gráficos y dashboards bien diseñados (para informes). |
| `anthropic-skills:skill-creator` | Crear/estructurar un skill nuevo desde cero. |

### 💼 Correr el negocio — plugin `small-business`
No es entrega de marketing, pero mantiene SpindleLab con caja y cobrado.
| `business-pulse` / `monday-brief` / `friday-brief` | Snapshot del negocio, brief de lunes/viernes. |
| `invoice-chase` / `cash-flow-snapshot` | Perseguir facturas impagas, forecast de caja. |
| `margin-analyzer` / `price-check` | Analizar márgenes y escenarios de precio (para decidir cuánto cobrar). |
| `close-month` / `tax-prep` | Cierre de mes y preparación de materiales para el contador. |
| `contract-review` | Revisar un contrato/NDA en lenguaje simple con banderas de riesgo. |

---

## 3. Apoyo / uso ocasional

Instalados y disponibles, pero no del día a día de marketing:
- **Claude Code / dev:** `verify`, `code-review`, `simplify`, `run`, `update-config`, `claude-api`, `artifact-design`.
- **Automatización:** `loop`, `schedule` (agendar tareas recurrentes en la nube).
- **Productividad:** `productivity:memory-management`, `task-management` _(ojo: ya tienes tu propio sistema de memoria)_.
- **Cowork/plugins:** `create-cowork-plugin`, `cowork-plugin-customizer`.
- **Investigación:** `deep-research` (informe multi-fuente verificado sobre cualquier tema).

---

## 4. Recomendación — tu stack mínimo efectivo

Eres solo y con horas limitadas. No adoptes todo. El corte:
1. **Tus 8 skills propios** — son la base y tu diferenciación.
2. **`searchfit-seo`** — el que más multiplica tu producto de entrada (empezar por `ai-visibility` y `seo-audit`).
3. **`vpai`** para llenar el pipeline de outbound sin buscar a mano.
4. **`small-business`** (`invoice-chase`, `business-pulse`) para no descuidar la caja.
5. El resto (brand-voice, postiz, marketing:\*, adspirer) → **cuando escales a más de 1-2 clientes**, no antes.

---

## 5. Pendiente conocido

- **Duplicación de skills:** los tuyos viven repartidos en 4 ubicaciones (global + repo + 2 worktrees) y aparecen dobles en el menú. Plan de consolidación en `marketing/encargos-otras-sesiones/cleanup-skills-duplicados.md`. Target: el **repo es la fuente de verdad**; en global queda solo `dream`.
