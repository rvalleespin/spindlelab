# Plan de relanzamiento — Google Ads (Búsqueda)

**Autor:** Gonzalo (persona-paid-media) · **Fecha:** 2026-08-25
**Estado:** PROPUESTA — no ejecutar sin OK de Ramón. Nada de esto está encendido.
**Cuenta:** `597-527-6690` ("Spindlelab"), login `hola@spindlelab.cl` (`authuser=1`).

> Contexto: tras el rediseño/reposicionamiento del sitio (25-ago), la campaña actual
> (`Campaign #1`) quedó **alineada en copy + UTM y pausada** (ver reporte de esta misma
> sesión). Este documento propone cómo **relanzar** con foco en **alta intención sobre el
> core que se vende**, no en el gancho genérico.

## 0. Principios (heredados de la cuenta)

- **Solo Búsqueda.** Nada de Máximo rendimiento, Display ni Socios de búsqueda.
- **Presupuesto pequeño y controlado.** Alta intención sobre alcance.
- **Keywords en frase/exacta**, nunca amplia sin vigilancia.
- **IA Max / optimización con IA: APAGADA** (Google la reintroduce sola; chequear cada revisión).
- **NO negativizar "gratis"** — la oferta de entrada *es* un diagnóstico gratis.
- **Voz del sitio:** "Mostramos, no prometemos". Evidencia por sobre promesa; cero hype de
  "agencia con IA / agencia 360". El filo es **SEO técnico + visibilidad en motores de IA
  (AEO/GEO)**; desarrollo web como línea; Google/Meta Ads *completan* la ruta.
- **Oferta ancla:** mini-diagnóstico **gratis en 24 horas** (la auditoría completa es 2-3
  semanas — no confundir plazos).
- **Conversión:** `generate_lead` (GA4, se dispara solo en el formulario de `/contacto/`).
- **UTM canónico:** `utm_source=google&utm_medium=cpc&utm_campaign=<campaña>`. En el
  relanzamiento conviene un `utm_campaign` por campaña/intención (ver §5) para separar la
  atribución por ángulo. Definir **un** método (URL final con UTM hardcodeado **o** sufijo
  de URL final a nivel campaña) y no mezclar, para no duplicar parámetros.

## 1. Estructura propuesta — 3 grupos por intención (core), 2 opcionales

La landing por grupo apunta a la **página de servicio específica** (no siempre el home),
que ya existe en el sitio nuevo. La ruta lleva el UTM.

### Grupo A — SEO técnico (núcleo)
- **Intención:** alguien que busca resolver SEO técnico / contratar a un especialista.
- **Keywords (frase/exacta):**
  - `"seo técnico"`, `[consultor seo técnico]`, `"consultoría seo técnica"`,
    `"agencia seo técnico chile"`, `[seo técnico empresas]`, `"experto seo técnico"`.
- **Landing:** `/servicios/auditoria-seo-tecnica/`
- **Negativas de grupo sugeridas:** `curso`, `gratis tutorial`, `empleo`, `sueldo`,
  `qué es` (informacional suelto). *(No negativizar "gratis" a secas — solo combinaciones
  claramente informacionales/no comerciales.)*

### Grupo B — Visibilidad en IA / AEO-GEO (el diferencial)
- **Intención:** empresa que quiere aparecer/ser recomendada en ChatGPT, Gemini, Perplexity.
- **Keywords (frase/exacta):**
  - `"aparecer en chatgpt"`, `[cómo aparecer en chatgpt empresa]`,
    `"aparecer en gemini"`, `"salir en perplexity"`, `"visibilidad en motores de ia"`,
    `"optimización aeo"`, `"geo generative engine optimization"`, `"que la ia me recomiende"`.
- **Landing:** `/servicios/visibilidad-en-ia/`
- **Nota:** término con mucho ruido informacional → arrancar en **exacta** y abrir a frase
  solo mirando el informe de términos de búsqueda.

### Grupo C — Auditoría SEO (entrada de alta intención)
- **Intención:** busca una auditoría/análisis de su sitio → encaja con el mini-diagnóstico.
- **Keywords (frase/exacta):**
  - `"auditoría seo"`, `[auditoría seo técnica]`, `"análisis seo sitio web"`,
    `"auditoría web seo"`, `[auditoría seo chile]`, `"revisión seo profesional"`.
- **Landing:** `/servicios/auditoria-seo-tecnica/` (o el flujo del diagnóstico en `/contacto/`).

### Grupo D (opcional) — Acompañamiento / consultoría mensual
- **Keywords:** `"consultoría seo mensual"`, `"acompañamiento seo"`, `[consultor seo mensual]`.
- **Landing:** `/servicios/acompanamiento-mensual/`

### Grupo E (opcional) — Desarrollo web técnico
- **Keywords:** `"desarrollo web seo"`, `"sitio web optimizado seo"`, `[desarrollo web técnico]`.
- **Landing:** `/servicios/desarrollo-web/`
- **Nota:** es línea secundaria; encender solo si sobra presupuesto. Riesgo de tráfico
  genérico "desarrollo web" — vigilar términos y negativizar fuerte.

## 2. RSA sugeridos (en la voz del sitio)

> Máximos: títulos 30 car., descripciones 90 car. Pinnear 1-2 títulos de marca/oferta si
> se quiere control. Todos deben pasar revisión humana antes de cargar.

### Grupo A — SEO técnico
- **Títulos:** `SEO Técnico para Empresas` · `Consultor SEO Técnico` · `Arreglamos lo que
  frena tu SEO` · `SEO Técnico + Visibilidad IA` · `Diagnóstico Gratis en 24 h` ·
  `Informe Priorizado por Impacto` · `Mostramos, No Prometemos` · `SpindleLab`
- **Descripciones:**
  - `SEO técnico que arregla lo que frena tu sitio en Google y en IA. Sin humo.`
  - `Auditoría priorizada por impacto, no un volcado de datos genérico.`
  - `Mini-diagnóstico gratis en 24 horas: qué te está frenando y por dónde partir.`

### Grupo B — Visibilidad en IA (AEO/GEO)
- **Títulos:** `¿Apareces en ChatGPT?` · `Visibilidad en Motores de IA` · `Que la IA te
  Recomiende` · `AEO/GEO para Empresas` · `Aparece en ChatGPT y Gemini` · `Diagnóstico
  Gratis en 24 h` · `SEO + Visibilidad en IA` · `SpindleLab`
- **Descripciones:**
  - `Optimizamos para que ChatGPT, Gemini y Perplexity te encuentren y te citen.`
  - `Visibilidad en motores de IA (AEO/GEO), el paso que casi nadie está dando.`
  - `Mini-diagnóstico gratis en 24 horas: cómo te ve hoy la IA y qué falta.`

### Grupo C — Auditoría SEO
- **Títulos:** `Auditoría SEO Técnica` · `Análisis SEO de tu Sitio` · `Las 5 Capas del
  Análisis` · `Diagnóstico Gratis en 24 h` · `Sin Costo, Sin Compromiso` · `Informe
  Accionable, No un PDF` · `SEO + Visibilidad en IA` · `SpindleLab`
- **Descripciones:**
  - `Auditoría SEO técnica priorizada por impacto. Sabrás qué arreglar primero.`
  - `Mini-diagnóstico gratis en 24 horas. Sin compromiso.`
  - `Revisamos Google y también tu visibilidad en ChatGPT, Gemini y Perplexity.`

*(Grupos D/E: derivar de los anteriores cambiando el eje al servicio correspondiente.)*

## 3. Extensiones (recursos)

- **Sitelinks:** reutilizar los actuales (ya apuntan a rutas vivas y con UTM): Auditoría
  SEO Técnica, Visibilidad en IA, Servicios, Acompañamiento Mensual, Desarrollo Web,
  Nuestro Método, Blog Técnico. Revisar que sigan calzando con el grupo.
- **Textos destacados (callouts):** HOY NO HAY NINGUNO — **oportunidad**. Sugeridos:
  `Diagnóstico gratis en 24 h` · `Sin compromiso` · `Visibilidad en IA (AEO/GEO)` ·
  `Informe priorizado por impacto` · `Supervisión humana en cada fase`.
- **Fragmentos estructurados:** HOY NO HAY NINGUNO. Sugerido — encabezado "Servicios":
  Auditoría SEO Técnica, Visibilidad en IA, Acompañamiento Mensual, Desarrollo Web.
- **Llamada:** los 3 números actuales están **rechazados (sin verificar)** → verificar el
  teléfono antes de reactivar la extensión de llamada, o quitarla.

## 4. Presupuesto y puja (a validar con Ramón)

- **Presupuesto:** ⚠️ dato a confirmar — la ficha dice **$1.500 CLP/día** pero la cuenta
  muestra **CLP 3.000/día**. Definir el número real antes de encender. Sugerencia: partir
  en el piso acordado y concentrarlo en los grupos A+B+C (core), no repartir en D/E.
- **Estrategia de oferta:** para empezar y con poco historial, **Maximizar clics con un
  CPC máximo tope** (control de gasto) o **CPC manual**; migrar a Maximizar conversiones /
  tCPA solo cuando `generate_lead` tenga volumen suficiente (varias conversiones/mes).
- **Ubicación/idioma:** Chile, español (como hoy).
- **Programación:** evaluar horario comercial si el presupuesto es muy chico.

## 5. Medición

- Conversión ancla **`generate_lead`** (GA4 → importada a Ads). Confirmar que siga
  importada y contando antes de encender.
- **`utm_campaign` por intención** para separar atribución por ángulo, p. ej.
  `seo-tecnico`, `visibilidad-ia`, `auditoria-seo`. (Hoy todo usa `auditoria-seo`.)
- Umbral de corte heredado: **semana 12, ≥2 mini-diagnósticos originados en ads** → si no
  se cumple, se apaga (ver ficha del cliente y estrategia §8).

## 6. Checklist para el día del encendido (cuando Ramón lo decida)

- [ ] Confirmar cuenta correcta (597-527-6690) y presupuesto real.
- [ ] Búsqueda únicamente; Display/Socios OFF; **IA Max OFF**.
- [ ] Keywords en frase/exacta; negativas base cargadas (sin negativizar "gratis").
- [ ] RSA por grupo cargados y pasados por revisión humana.
- [ ] Sitelinks/callouts/fragmentos por grupo; teléfono verificado (o extensión de
      llamada quitada).
- [ ] UTM consistente (un solo método) y `generate_lead` importada y contando.
- [ ] Encender con OK explícito de Ramón (nadie enciende gasto sin su visto).
