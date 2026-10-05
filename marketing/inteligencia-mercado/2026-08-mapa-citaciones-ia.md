# Estudio — Mapa de citaciones en IA y ruta de entrada (share-of-voice)

- **Fecha de corte:** 2026-08-25
- **Vigencia sugerida:** ~30 días (el panorama AEO/GEO chileno se mueve rápido: ya hay ≥4 agencias jugando la carta del ranking propio).
- **Autor:** Marco (agente-inteligencia-mercado)
- **Foco del estudio:** por qué SpindleLab no aparece cuando se le pregunta a la IA por agencias SEO/AEO/GEO en Chile, de qué fuentes se alimentan los motores, y cómo entrar.
- **Decisión que informa:** contenido + PR de citaciones + autoridad de entidad en el sitio (no edita estrategia; input para que Tomás decida qué entra al plan).
- **Insumo que lo dispara:** `marketing/metricas/test-menciones-ia.md` → "Mes 1 (25 ago)". Continúa el estudio del 2-ago (`2026-08-estudio-agencias-ia.md`), no lo repite.

> **Regla aplicada:** cada dato lleva URL + fecha de acceso (todas 2026-08-25). Lo no verificable va marcado *inferido* / *pendiente*, nunca como hecho. Entorno: web pública; el deep-dive de Instagram queda *pendiente* de una sesión con Chrome logueado.

---

## TL;DR

El test de menciones (SpindleLab 0/15) no mide calidad de servicio: mide **presencia en las fuentes que la IA cita**. Y esas fuentes son, en su mayoría, **rankings-listicle que las propias agencias se auto-publican** (BigBudá, Milimetrix, Best Solution), cada una coronándose #1. Los nombres que la IA "recomienda" salen **literalmente** de esos listicles. **SpindleLab no está en ninguno; esa ausencia, no el servicio, es la causa directa de su invisibilidad.**

La palanca #1 **no es postular** (la mayoría de esos rankings no tienen formulario: puntúan la *evidencia pública* del sitio de cada agencia). Es **volver el rigor de SpindleLab legible y extraíble por máquina**, y **publicar un artefacto de autoridad propio** — pero como *evaluador que no se corona*, no como un 5º auto-rey. Ese cuadrante está vacío y es defendible justo por la honestidad que vende la marca.

---

## 1. El mecanismo (leer antes de todo)

Cuando le preguntas a ChatGPT / Gemini / Perplexity "¿qué agencia de SEO/AEO/GEO me recomiendas en Chile?", el motor **no evalúa los sitios de las agencias**: extrae nombres de **listicles y tablas de terceros**. Hay evidencia pública de que los motores favorecen ese formato: un estudio de patrones de citación reporta que los **listicles se citan ~25% vs ~11%** de las columnas de opinión y que **las páginas con tabla se citan ~2,5×** más (cifras *reportadas por* [quickseo.ai](https://quickseo.ai/blog/ai-citation-patterns-chatgpt-claude-gemini-perplexity), acc. 2026-08-25; estudio primario de Omniscient Digital, *pendiente* de verificación directa).

El corolario incómodo: **quien escribe el ranking se cita a sí mismo.** BigBudá y Best Solution y Milimetrix publican "las mejores agencias AEO/GEO/SEO de Chile" y se ponen primeros. La IA lo cita como si fuera una fuente neutral. Ese es el campo de batalla real.

**Cruce que lo confirma:** los "competidores" que la IA nombró en el test (Focus Ads, Loup, Innoweb, AMD, Best Solution, Seonet, Milimetrix) son **exactamente** las 8 agencias que BigBudá lista con puntaje en su ranking (ver §3). No es coincidencia: la IA leyó el listicle de BigBudá.

---

## 2. Mapa de fuentes — dónde debe aparecer SpindleLab

Prioridad = retorno esperado ÷ esfuerzo, para una consultora nueva y chica.

| Fuente | URL | Tipo | Cómo se entra | Esfuerzo | Prioridad |
|---|---|---|---|---|---|
| **BigBudá — ranking AEO/GEO** | [bigbuda.cl/insights/mejores-agencias-aeo-geo-chile](https://bigbuda.cl/insights/mejores-agencias-aeo-geo-chile) | Ranking-de-competidor (metodología abierta) | Sin formulario; puntúa evidencia pública del propio sitio. Vía real: publicar prueba AEO/GEO verificable + outreach editorial (*contacto pendiente*) | Alto | **Alta** — es el nicho exacto y la fuente que la IA citó |
| **AgenciasB2B** | [agenciasb2b.com](https://agenciasb2b.com/) | Directorio editorial B2B | Botón **"Solicitar ficha"** + revisión editorial. Gratuito o pago *pendiente* | Medio | **Alta** — cita del test, B2B, y tiene puerta real |
| **Sortlist (Chile)** | [sortlist.com/seo/chile-cl](https://www.sortlist.com/seo/chile-cl) | Directorio gratuito (+ pago opcional) | "Register as an agency" → perfil gratis, self-serve | Bajo | **Alta** — victoria rápida: alta inmediata y gratis, rankea el SERP chileno |
| **BluCactus — mejores SEO Chile** | [blucactus.cl/mejores-agencias-seo-chile](https://www.blucactus.cl/mejores-agencias-seo-chile/) | Ranking-de-competidor (conflicto declarado) | Sin formulario; editorial curado por un rival | Alto | Media — foco SEO (no AEO), curado por competidor |
| **agencias.marketing** | [agencias.marketing/directorio/chile](https://agencias.marketing/directorio/chile) | Directorio gratuito | Alta de ficha (mecanismo exacto *pendiente*) | Bajo | Media — masivo, self-serve, indexable |
| **Clutch** | [clutch.co/get-listed](https://clutch.co/get-listed) | Directorio de reseñas | Perfil gratis; requiere **≥3 reseñas verificadas**; "Verified" ~US$499/año (*inferido*) | Medio | Media — alta autoridad, pero las 3 reseñas son el cuello de botella |
| **Marketing4eCommerce** | [marketing4ecommerce.cl/ranking-de-agencias-seo-chilenas](https://marketing4ecommerce.cl/ranking-de-agencias-seo-chilenas/) | Listicle editorial (medio real) | PR/pitch editorial o slot patrocinado (*costo pendiente*) | Medio | Media — medio, no competidor; entrada por relación |
| **GoodFirms / DesignRush / Semrush Agency Partners** | goodfirms.co · designrush.com · semrush.com/agencies | Directorios gratuito/pago | Perfil básico gratis; premium pago (*costos inferidos*) | Bajo–Medio | Baja — poca tracción en el SERP chileno / US-céntricos |
| **Milimetrix / Seonet / SEO Austral / Loup…** | ej. [milimetrix listicle](https://www.milimetrix.com/blog/las-mejores-agencias-de-seo-en-chile-2026) | Ranking-de-competidor auto-publicado | Sin formulario; misma lógica que BigBudá | Alto | Baja — se cubren "de una" con la evidencia pública, no uno por uno |
| **estudioideas.cl** | [estudioideas.cl](https://estudioideas.cl) | No aplica (agencia sin listicle) | — | — | Baja — verificado: no publica ranking; su cita es ruido |

**Las 3 entradas de mayor retorno/esfuerzo:**
1. **Publicar evidencia AEO/GEO verificable en spindlelab.cl** (casos con métricas, precios transparentes, metodología documentada). Es la palanca #1 porque **la mayoría de esos rankings puntúan el contenido público del sitio y no tienen formulario** — un solo activo te hace elegible en *todos* a la vez, incluida la fuente exactamente correcta (el ranking AEO de BigBudá).
2. **AgenciasB2B ("Solicitar ficha")** — mejor esfuerzo-medio/retorno-alto puntual: citada por la IA, B2B, con puerta editorial real.
3. **Sortlist** — la victoria rápida de menor esfuerzo (alta gratis, self-serve). Pareja: abrir también agencias.marketing (gratis) y **arrancar ya** la recolección de las 3 reseñas de Clutch (es el cuello de botella).

---

## 3. La jugada del ranking propio — y por qué SpindleLab la juega distinto

**Anatomía de la jugada BigBudá** ([fuente](https://bigbuda.cl/insights/mejores-agencias-aeo-geo-chile), pub. 2 ago 2026, autor Marcel Acunis):

- **Listicle rankeado y numérico, BigBudá #1:** 8 agencias con puntaje /100 — BigBudá 93 · Focus Ads 68 · Loup 63 · Innoweb 58 · AMD/Agencia SEO Chile 55 · Best Solution 54 · Seonet 47 · Milimetrix 39. Nombra competidores reales (le da verosimilitud).
- **Barniz de objetividad:** 5 criterios ponderados (evidencia AEO/GEO 30% · verificabilidad 25% · trayectoria 20% · transparencia de precios 15% · medición 10%) — elegidos donde BigBudá ya gana.
- **Preempta la objeción en su propio FAQ** ("¿por qué encabezas tu propio ranking? porque los criterios son públicos") y reconoce dónde pierde (admite que Focus Ads publicó investigación original que ellos no).
- **Construido para que la IA lo extraiga:** JSON-LD apilado (`BlogPosting` + `FAQPage` + `BreadcrumbList` + `Organization` + `Person` + `WebPage`) + tabla + puntajes.
- **`llms.txt` que sirve el contenido a los modelos** ([bigbuda.cl/llms.txt](https://bigbuda.cl/llms.txt)) + una **fábrica de contenido** (~100+ artículos en /insights, familias "mejores agencias de X Chile 2026" y "BigBudá vs [competidor]").
- **Llegó temprano a una categoría vacía** — el primero en publicar la página canónica se vuelve la fuente por defecto.

**Ya es carrera local:** **Best Solution** copió la jugada el 23 ago ([bestsolution.cl/mejores-agencias-geo-chile](https://bestsolution.cl/mejores-agencias-geo-chile/), 5 agencias, ellos #1, sin metodología) y **Milimetrix** publica el suyo (se rankea #1). Internacionalmente el molde es idéntico (Omnius, Discovered Labs se auto-rankean #1 con "fit score" y tabla).

**Veredicto para SpindleLab: SÍ al artefacto citable, NO a auto-coronarse.**
- La **artesanía** (contenido estructurado, schema, FAQ, `llms.txt`, criterios públicos, fechado) es legítima y hay que copiarla.
- El **corazón deshonesto** (ser juez y parte y ponerse #1) choca con la promesa de marca (cero prueba social inventada) **y ya está tomado** — ser el 5º auto-rey da ruido, no autoridad.
- **El cuadrante vacío:** hoy nadie ocupa "**evaluador neutral, método reproducible, que no se auto-rankea**". Esa es la jugada defendible, y es *literalmente el servicio de SpindleLab demostrado en vivo*.

**Formato honesto recomendado:**
1. **Guía-estándar "Cómo elegir (y verificar) una agencia AEO/GEO en Chile"** — base segura: convierte los "criterios" en una vara neutral que SpindleLab redacta, **sin rankear a nadie**. Cero exposición reputacional, máxima señal de honestidad, igual de citable (lista + FAQ + schema + `llms.txt`).
2. **"Índice de visibilidad en IA en Chile" con datos reales medidos** — pieza estrella: correr el test sobre un set de consultas chilenas y publicar **el método + los resultados reproducibles**, con **SpindleLab auto-excluido del ranking** ("no nos puntuamos porque medimos"). Nota: **Focus Ads ya publicó una versión** de esto ("AI Search Chile 2026 Report") — la ventana se está cerrando.

---

## 4. Competidores nuevos (altas al registro)

Ver fichas completas en `competidores.md`. Lectura de amenaza:

- **Amenaza real, misma esquina B2B + proof legible:**
  - **Focus Ads** (focus-ads.cl) — el más peligroso del lote. Tiene lo que a SpindleLab le falta frente a Nitten/Best Solution: **métrica propia nombrada ("Share of Answer"), un reporte-benchmark publicado ("AI Search Chile 2026 Report") y casos con cifras**, bajo un modelo de riesgo compartido (fee fijo + revenue share) muy vendible.
  - **Loup** (loup.cl) — Nitten-lite: método nombrado ("Search Engine Everywhere") y contenido propio que *se ve* citado por los LLMs (proof por evidencia visible), con encuadre B2B/pipeline.
  - **SmartGrowth** (smartgrowth.cl) — proof delgada, pero su posicionamiento ("AEO/GEO para empresas B2B en Chile") es **casi idéntico al de SpindleLab**: compite por la misma consulta.
- **Referentes de tier superior (vara aspiracional, no rival cabeza a cabeza):** **Punto Rojo** (enterprise LATAM, SEOday, clientes marquesina) y **Ana Fernández** (marca personal + clientes enterprise US/YC) — proof legible real, pero juegan enterprise, no el SMB/YMYL chileno.
- **Ruido de listicle (aparecen citados sin sustancia propia):** **AMD/Agencia SEO Chile**, **Innoweb**, **Adinfluence** y, en buena medida, **Milimetrix** (se auto-rankea). Salen porque un ranking los listó, no por método/índice/casos propios.
- **Seonet** — confirmado Directo (ahora GEO/AEO explícito + Google Premier Partner, foco B2B), sin índice/tool público.
- **PGAS** — *no verificable*: 6 estrategias de búsqueda → cero resultados. Con alta probabilidad es **alucinación del test o nombre mal transcrito**. *Pendiente:* Ramón confirma nombre/URL antes de ficharlo. **No fichar.**

---

## 5. Tres movimientos concretos (para el troncal)

1. **[Contenido citable → Renata + Cata]** Producir **(a) la guía-estándar "Cómo elegir y verificar una agencia AEO/GEO en Chile"** (base segura, sin rankear) y, cuando haya datos medidos, **(b) el "Índice de visibilidad en IA en Chile"** con SpindleLab como evaluador auto-excluido. Ambos con la ingeniería de citación de BigBudá: tabla + `FAQPage`/`ItemList` + autor `#autor-ramon` + fecha de corte + `llms.txt`. Ángulo diferenciador: **"el único que muestra el método y no se pone primero"**. Corre contra reloj (Focus Ads ya publicó su benchmark).

2. **[Entrada a fuentes / PR de citaciones → outbound (Emilia/Dereck) + Marco]** Ejecutar las 3 entradas rápidas: **Sortlist** (alta gratis hoy), **AgenciasB2B** (Solicitar ficha), **agencias.marketing** (alta gratis), y **arrancar la recolección de 3 reseñas verificadas de Clutch** con clientes reales (Bernardo, etc., con permiso). Es *pendiente* confirmar gratuito/pago de AgenciasB2B y el canal editorial de BigBudá/BluCactus.

3. **[Autoridad de entidad en el sitio → Simón + Diego]** Volver el rigor **legible y extraíble**: publicar **casos con métricas** (con permiso), **precios transparentes**, **metodología AEO documentada** (nombrar el método, p. ej. las "capas" como framework), y reforzar `sameAs`/schema/`llms.txt`. Atar con el hallazgo del audit del 25-ago (`marketing/encargos-otras-sesiones/auditoria-seo-sitio-2026-08.md`): esa evidencia pública es lo que te hace elegible en todos los rankings que puntúan el sitio, sin postular a ninguno.

---

## 6. Pendientes / no verificado

- Deep-dive de Instagram de los competidores nuevos → *pendiente* de una sesión con **Chrome logueado** (esta corrió en cloud).
- Costos exactos: Clutch Verified (US$499/año), DesignRush premium, Semrush (~US$90/mes), modelo gratuito/pago de AgenciasB2B y agencias.marketing → *inferidos* de terceros, no de página oficial.
- Canal de contacto editorial de BigBudá / BluCactus para outreach directo → *pendiente*.
- Causalidad exacta del salto de citaciones de BigBudá (1→3 motores) → *inferida*; coherente con la publicación del 2-ago + `llms.txt`, pero no auditable en la lógica de Perplexity.
- **PGAS** → *no verificable*; confirmar antes de tratarlo como competidor.
- Cotización espejo de precios (Best Solution / ROI / Seonet no publican) → sigue *pendiente* del estudio anterior.
