# Prep de reunión — Chef&Hotel (prospecto)

- **Fecha:** 2026-08-14 · **Para:** Ramón · **Autor:** Marco (con lectura técnica del sitio)
- **Estado del prospecto:** en pipeline, reunión hoy.
- **Complementa:** el estudio de posicionamiento (`2026-08-estudio-posicionamiento.md`).
- ⚠️ **Nota de rol:** esto es un **pre-diagnóstico** para que llegues con hallazgos reales, no la versión formal. El mini-diagnóstico pulido es de Valen y la ejecución técnica de Simón/Diego. La oferta/precio la cierras tú.

---

## Lectura de 30 segundos (por qué encajan con SpindleLab, no con cualquier agencia)

Chef&Hotel es un **negocio de medios**: su producto es **audiencia y atención**, que se convierte en **inventario publicitario → ingresos**. Tienen el activo más difícil de fabricar (20+ años, ~2.950 artículos, 16,5k newsletter, 24k social), pero **la descubribilidad está rota**. Para un medio, SEO técnico + AEO **no es un gasto de marketing: es crecimiento de audiencia = más avisadores**. Ese es exactamente el core de SpindleLab. No les vendes "posicionamiento", les vendes **más lectores para el mismo contenido que ya produjeron**.

---

## Hallazgos reales para abrir la reunión (verificados hoy en el sitio)

> Entra mostrando, no prometiendo. Cada uno en lenguaje de negocio, no técnico.

1. **~2.950 artículos indexables + 130 ediciones, y ni un gramo de esa autoridad está optimizado.** Es una biblioteca de 20 años que Google y los motores de IA casi no aprovechan. *La frase:* "tienen una mina de contenido y está sin explotar."
   - *Fuente:* `wp-sitemap-posts-post-1/2.xml` (2.000 + 946 URLs) + `ediciones-1` (130).

2. **Cero `meta description` y cero Open Graph en todo el sitio (home y artículos).** Consecuencia concreta y visible: **cada vez que comparten un link en LinkedIn, Facebook o WhatsApp, sale sin título, sin imagen y sin descripción** — un rectángulo vacío. Están matando su propio canal social (los 24k que presumen) con algo que se arregla en horas. *Este es el hallazgo para mostrar en vivo:* pídele que comparta un artículo suyo en WhatsApp durante la reunión y verán el link pelado.

3. **Los artículos casi no tienen schema (datos estructurados).** Solo llevan "migas de pan" (BreadcrumbList); **falta el schema de `Article`/`NewsArticle`, `Author` y `Publisher`.** Traducción: para un medio, eso es lo que te hace elegible para **Google Noticias / Top Stories** y para que **ChatGPT/Perplexity te citen**. Hoy están invisibles ahí. *La frase:* "cuando alguien le pregunta a la IA por el rubro, no aparecen — y deberían ser LA fuente."

4. **URLs viejas rotas: los reportajes destacados antiguos redirigen a la home.** Ej.: la nota "El desafío de innovar" que Google todavía muestra → hace **301 a la portada**, no al artículo. Años de contenido indexado botando al lector a una página genérica = **autoridad y visitas que se pierden**. Hubo una migración mal cerrada.

5. **La revista vive en Issuu (flipbook).** Ese contenido **no lo lee bien Google ni lo puede citar la IA**, y la autoridad se la lleva issuu.com en vez del sitio propio. El contenido premium está en el formato menos descubrible.

6. **Causa raíz (fácil de explicar):** el sitio usa el sitemap por defecto de WordPress → **no hay un plugin/capa SEO gestionando meta, schema ni OG**. Una sola capa bien configurada arregla los puntos 2–3 en **~3.000 URLs de una vez**. Fruta baja, impacto grande.

---

## El ángulo de venta (para un medio)

- **No** hablar de "keywords" ni de tecnicismos. Hablar de: **más audiencia con el contenido que ya tienen → más inventario y mejor argumento ante avisadores**.
- **El gancho AEO/GEO es tu diferenciador**: los competidores (Canal Horeca, Chile Gastronomía) tampoco están en motores de IA. **El primer medio HORECA que la IA cite gana el rubro.** Eso conecta con el movimiento de posicionamiento del estudio: *ser el medio descubrible y con autoridad de datos.*
- **Encadena con el estudio:** el arreglo técnico es el **habilitador** del posicionamiento "autoridad con datos" (cuadrante vacío). Primero que Google/IA los encuentren; después, que encuentren algo que nadie más tiene (sus datos del rubro).

---

## Escalera de oferta (de menor a mayor compromiso)

1. **Mini-diagnóstico (gancho, gratis o simbólico):** el 1-pager formal de estos hallazgos + 3 quick-wins. Es la carta de entrada de SpindleLab; ya tienes el 80% hecho arriba.
2. **Auditoría técnica + AEO (one-shot):** el mapa completo — schema para medios, arreglo de meta/OG masivo, plan de las URLs rotas, estrategia Issuu→web. Entregable con prioridades.
3. **Acompañamiento mensual (retainer) — el objetivo real:** implementación + monitoreo de visibilidad en Google **y en motores de IA** (share-of-voice). Un medio publica todas las semanas: necesita SEO/AEO **continuo**, no un one-shot. Aquí está el negocio recurrente.
4. **Cross-sell Desarrollo Web (si aplica):** si la migración quedó a medias, hay trabajo de arreglo/rediseño técnico. No liderar con esto.

> **Precio:** ninguno de los competidores publica tarifas (ver estudio §3) → tienes latitud para anclar. Lidera con el **retainer** y usa el one-shot como cuña; el mini-diagnóstico abre la puerta.

---

## Qué escuchar / preguntas de descubrimiento (para calificar y dimensionar)

- **¿Cómo monetizan hoy?** (pauta display, contenido patrocinado de proveedores, ediciones especiales). → dice cuánto vale para ellos más audiencia.
- **¿Miran Google Analytics / de dónde llega su tráfico?** ¿Cuánto es directo/newsletter vs. búsqueda? → si dependen del newsletter, el upside de búsqueda es enorme y no lo están viendo.
- **¿Tienen a alguien viendo SEO hoy?** (agencia, freelance, nadie). → define competencia y urgencia.
- **¿Qué pasó con la migración del sitio?** (las URLs rotas) → puede ser un dolor reciente que ya sienten.
- **¿Qué les preocupa del negocio en 2026?** (caída de tráfico, IA, avisadores). → conecta con la caída de tráfico de Google por respuestas de IA — su amenaza y tu oferta.

---

## Objeciones probables y respuesta

- **"Ya tenemos quien nos ve el sitio / SEO."** → "Perfecto, entonces esto les sirve de segunda opinión gratis. Lo que veo es que el schema de medios y el OG no están — pregúntenle a quien lo lleva por qué." (Los hallazgos son verificables en vivo; no es opinión.)
- **"Tenemos harta audiencia, no lo necesitamos."** → "Tienen audiencia **de newsletter y social**, que ustedes construyeron a pulso. La de **búsqueda y de IA** está sin tocar — es la que crece sola una vez ordenada, sin que ustedes publiquen más."
- **"¿Esto es caro?"** → mini-diagnóstico primero (bajo riesgo), y encuadrar el retainer como **crecimiento de inventario publicitario**, no como gasto.
- **"¿AEO/IA no es humo?"** → "El tráfico de Google ya está cayendo por las respuestas de IA. La pregunta no es si la IA importa, es si Chef&Hotel es la fuente que cita o la que ignora. Hoy los ignora."

---

## Qué NO prometer / trampas

- **No prometer números de tráfico** — no tengo su analítica. Habla de "activos sin explotar", no de "+X% garantizado".
- **La migración de URLs es delicada:** no ofrecer arreglarla en el acto; es diagnóstico primero (mal hecho, se pierde más).
- **Issuu:** no prometer "sacarlos de Issuu" sin entender por qué lo usan (¿acuerdo comercial? ¿costumbre?). Es una recomendación a evaluar, no un hecho.
- **Cifras de ellos (16,5k / 24k):** son autoreportadas; no repetirlas como verificadas.

---

## Pendientes / no verificado

- **Analítica real** (tráfico, fuentes, ingresos por pauta): no accesible — son preguntas de descubrimiento.
- **Instagram** (cadencia, Reels, engagement) de ellos y de la competencia: pendiente de sesión con Chrome logueado.
- **Tarifas de la competencia:** no públicas (cotización espejo pendiente).
- **Antigüedad/alcance exactos:** inferidos/autoreportados (ver estudio §5).
