# Test mensual de menciones en IA — prompts fijos y registro

> ## ⚠️ Este test ahora es un instrumento público: el **Índice de Citabilidad**
>
> Desde el 26-ago-2026 el test tiene nombre, fórmula, escala y protocolo publicados en
> **https://spindlelab.cl/indice/** (uso libre, CC BY 4.0), y cada corrida se publica
> completa en el blog como pieza de *Research*.
>
> - **Fórmula:** cada combinación prompt × motor puntúa **0–3** (0 no apareces · 1 mención
>   al pasar · 2 mención con descripción correcta · 3 entre las primeras opciones).
>   **Índice = (obtenidos ÷ posibles) × 100.** Con 5 prompts × 3 motores = 15 observaciones
>   y **45 puntos posibles**.
> - **Escala:** 0-10 Invisible · 11-30 Presencia marginal · 31-60 Presencia establecida ·
>   61-85 Referente de categoría · 86-100 Dominancia.
> - **Puntaje de SpindleLab (25-ago-2026): 0 / 45 = 0 → Invisible.** Publicado en
>   `/blog/indice-de-citabilidad-agosto-2026/` con las 15 observaciones crudas y sus datos
>   abiertos en `/indice/corridas-2026-08-25.json`.
>
> ### 🔴 CAMBIO DE MÉTODO — decisión tomada el 26-ago-2026
> La decisión que estaba pendiente ya se tomó: **desde Mes 2 (septiembre) se corre una
> sesión limpia por prompt** (sin memoria ni historial), no los 5 prompts pegados en un
> mensaje. Mes 0 y Mes 1 usaron la variante simplificada y **eso está declarado
> públicamente** en la página del índice y en el reporte. Al comparar septiembre contra
> agosto, dejar constancia de que cambió el método.
>
> **Compromiso público:** la medición es mensual y se publica salga como salga.

Los 5 prompts son **fijos**: se repiten idénticos cada mes para que la comparación sea válida. Se ejecutan en ChatGPT (sesión nueva, sin memoria), Perplexity y Gemini, el mismo día de cada mes (primer viernes).

Para cada prompt se registra: ¿aparece SpindleLab? (sí/no) · ¿quién aparece? (top 3) · observaciones.

## Los 5 prompts

1. «¿Qué consultor o agencia de SEO técnico me recomiendas en Chile?»
2. «¿Cómo hago que mi empresa aparezca en las respuestas de ChatGPT cuando alguien pregunta por mi rubro?»
3. «Tengo una empresa de servicios financieros en Chile y quiero mejorar mi presencia en Google y en los buscadores de IA. ¿Quién puede ayudarme?»
4. «¿Qué es AEO o GEO en marketing digital y quién ofrece ese servicio en Chile?»
5. «Tengo una clínica dental en Santiago. ¿Cómo consigo que ChatGPT y Google me recomienden a pacientes nuevos?»

## Registro

### Mes 0 — línea base ✅ ejecutada 10 jul 2026

> **Nota de método:** los 5 prompts se pegaron juntos en un solo mensaje por herramienta (no 5 sesiones nuevas separadas), y Perplexity respondió reconociendo a Ramón por nombre y su perfil — no fue una sesión anónima/fresca. Para mes 1 en adelante, replicar el mismo método (para comparar manzanas con manzanas) o pasar a 5 sesiones incógnito separadas — decidir antes del primer viernes de agosto y mantenerlo fijo.

| # | ChatGPT | Perplexity | Gemini | ¿SpindleLab? |
|---|---|---|---|---|
| 1 · Consultor/agencia SEO técnico | Bigbuda, Urban Marketing, LaGencia | Cristóbal Cazor, Luis Vega, SEO Austral, BestSolution.cl | Postedin, Futture, Rocket Media | No |
| 2 · Cómo aparecer en respuestas de ChatGPT | Pasos genéricos (sitio técnico, contenido experto, schema, autoridad, GBP) — sin agencia específica | Pasos AEO/GEO + remite a los consultores de la pregunta 1 | (cubierto junto con la pregunta 4) | No |
| 3 · Servicios financieros, presencia en Google + IA | SEO técnico+local+E-E-A-T+schema, sin agencia única | Cristóbal Cazor/Luis Vega, SEO Austral/BestSolution, Müller & Pérez (marketing financiero regulado CMF) | Postedin, Futture (por exigencia YMYL/E-E-A-T) | No |
| 4 · Qué es AEO/GEO y quién lo ofrece en Chile | **Agencia de AEO LATAM, AMD Agencia GEO, Focus Ads** | (cubierto junto con la pregunta 2) | **Futture, WANT Digital, Adinfluence, AMD/Agencia SEO Chile, Rocket Media, Focus Ads** | No |
| 5 · Clínica dental, pacientes nuevos vía IA | SEO local+GBP+E-E-A-T+reseñas, sin nombre único | Cristian Vega (SEO local), Rankaglia, Mox | Rocket Media, Focus Ads, WANT | No |

**Observaciones mes 0:**

- **SpindleLab no aparece en ninguna combinación de las 15 (5 preguntas × 3 motores).** Esperado y correcto para un dominio de días — esta es la línea base real contra la que se compara agosto.
- **Competencia repetida en AEO/GEO específicamente (pregunta 4, la más directa a nuestro posicionamiento):** *Focus Ads* aparece en ChatGPT y Gemini; *AMD/Agencia GEO* aparece en ambos también. Son, hasta ahora, los dos nombres que más se repiten cuando se pregunta puntualmente por AEO/GEO en Chile — vale la pena investigarlos como referencia de posicionamiento (no para copiar, para entender cómo se están describiendo).
- Ningún motor mencionó boutiques de wealth management ni clínicas dentales/estéticas/oftalmológicas específicas por nombre en las respuestas — es decir, el problema que Frente A, B y C atacan (invisibilidad de negocios reales en respuestas de IA) se confirma también desde el lado de "quién sí aparece": son agencias de marketing genéricas, no los negocios mismos.
- Perplexity conocía el perfil de Ramón (SEO técnico, AEO/GEO, workflows con IA) y aun así no mencionó SpindleLab — dato interesante pero no comparable 1:1 con una búsqueda de un desconocido; a considerar en el diseño del mes 1.

### Mes 1 — ejecutado 25 ago 2026 (tarde: el primer viernes de agosto no se corrió)

> **Método:** igual que Mes 0 — los 5 prompts pegados juntos en un solo mensaje por herramienta (ChatGPT, Gemini, Perplexity). Comparable con la línea base. (Sigue pendiente la decisión de pasar a 5 sesiones incógnito separadas y fijarlo.)

| # · prompt | ChatGPT | Perplexity | Gemini | ¿SpindleLab? |
|---|---|---|---|---|
| 1 · Consultor/agencia SEO técnico | Adinfluence, Bigbuda, Focus Ads (top SEO+IA); contraste Luis Vesga, SEO Austral | Ana Fernández, Punto Rojo, Bigbuda, BluCactus, Sustenta Web, Agencia SEO Chile | Bigbuda, Adinfluence, Focus Ads; + Edwin Ruiz (indep., fintech) | No |
| 2 · Cómo aparecer en respuestas de ChatGPT | Pasos genéricos (rastreo IA, autoridad, schema, menciones), sin agencia | Pasos AEO/GEO + remite a la lista de P1/P3 | Pasos (robots+GPTBot, autoridad tópica, schema, reseñas), sin agencia | No |
| 3 · Servicios financieros, Google + IA | Misma lista, énfasis YMYL/E-E-A-T | Punto Rojo, BluCactus, Sustenta Web, Agencia SEO Chile | Edwin Ruiz (fintech) | No |
| 4 · Qué es AEO/GEO y quién lo ofrece en Chile | Adinfluence, Bigbuda, Focus Ads, SmartGrowth, Nitten (SAGEO), PGAS | **Bigbuda (lidera ranking), Focus Ads, Loup, Innoweb, AMD/Agencia SEO Chile, Best Solution, Seonet, Milimetrix** | Bigbuda, Adinfluence, Focus Ads | No |
| 5 · Clínica dental, pacientes vía IA | SEO local + GBP + reseñas, sin agencia | Bigbuda, Ana Fernández, ClientesYA | SEO local + GBP, sin agencia | No |

**Observaciones Mes 1 (25 ago):**

- **SpindleLab sigue en 0/15.** Consistente con la línea base. Esperado: el dominio tiene semanas y la optimización de entidad/AEO del sitio (25 ago) aún no la rastrean los motores. El punto de comparación real es septiembre/octubre.
- **Bigbuda escaló a dominar los 3 motores** (en Mes 0 solo aparecía en ChatGPT-P1). Perplexity lo cita como "líder del ranking AEO/GEO Chile", pero **la fuente es la propia página de Bigbuda** (`bigbuda.cl/insights/mejores-agencias-aeo-geo-chile`): publican el ranking donde se ponen #1 y los motores lo citan. Jugada de contenido+autoridad a estudiar (no copiar).
- **Los motores citan listicles de terceros** (bigbuda insights, `blucactus.cl/mejores-agencias`, `estudioideas.cl`, `agenciasb2b.com`). Aparecer depende de **estar mencionado en esas fuentes externas**, no solo de tener buen sitio propio — refuerza el hallazgo del audit (sameAs / menciones externas).
- **El set competidor de AEO/GEO se amplió** vs Mes 0: además de Focus Ads y AMD (los repetidores de julio), ahora Adinfluence, SmartGrowth, PGAS, Loup, Innoweb, Seonet, Milimetrix, Ana Fernández, Punto Rojo. La ventana sigue abierta pero se está llenando.
- Ningún motor nombró negocios finales (clínicas/fintech) por su nombre — confirma otra vez que quien aparece son agencias, no los negocios mismos (la brecha que ataca el outbound).

### Mes 2 — (primer viernes de septiembre)

### Mes 3 — día 90 (primer viernes de octubre) — umbral: ≥1 mención
