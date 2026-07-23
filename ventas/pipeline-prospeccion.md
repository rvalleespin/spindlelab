# Pipeline de prospección en frío — piloto SpindleLab

> Primer piloto de venta activa (outbound frío), decidido el 9 de julio de 2026. Segmento: rubros de confianza (finanzas, salud, legal, B2B) en Chile, empresas de 11-200 empleados. Canal: email + LinkedIn, marca sin nombre personal. Oferta de lanzamiento -20% vigente (se menciona recién en la propuesta post-diagnóstico, no en el primer contacto).

## Dimensionamiento del mercado (Explorium, gratis, 9-jul-2026)

Empresas en Chile por rubro (total / segmento 11-200 empleados aprox.):

| Rubro | Total Chile | ~11-200 empleados |
|---|---|---|
| Business consulting and services | 5.648 | ~1.406 |
| Legal services | 1.666 | ~369 |
| Financial services | 1.340 | ~496 |
| Law practice | 1.254 | ~357 |
| Investment management | 422 | ~129 |

**Total addressable (segmento 11-200):** ~2.750 empresas.

## Cargo objetivo por tamaño

- **11-50 empleados:** Gerente General / Socio / Fundador (no suele existir cargo de marketing dedicado).
- **51-200 empleados:** Gerente de Marketing / Crecimiento.

## Limitación conocida (9-jul-2026)

El conector de prospección (vibe-prospecting/Explorium) expone en esta sesión solo las herramientas auxiliares (`autocomplete`, `fetch-entities-statistics`, `enrich-business`, `enrich-prospects`, `match-business`, `match-prospects`, `export-to-csv`, `get-dataset`) pero **no** `fetch-entities`, que es la que arma la lista real de empresas/contactos. Sin esa pieza no se puede automatizar la extracción completa del piloto.

**Decisión (9-jul-2026):** Ramón se conecta directo a Apollo.io para sacar la lista de emails del piloto (11-50 empleados → Gerente General/Socio; 51-200 → Gerente de Marketing/Crecimiento, rubros de la tabla de dimensionamiento arriba). Cuando la exporte, se pega/guarda acá para aplicar la plantilla y completar la tabla de seguimiento — no se envía nada sin su aprobación explícita mensaje por mensaje.

## Búsquedas guardadas en Apollo (9-jul-2026)

La primera búsqueda que Ramón armó en Apollo la configuró el Asistente de IA nativo de Apollo (a partir de un "Centro de Contexto" autogenerado desde el dominio spindlelab.cl, nunca aprobado por Ramón) y quedó mal alineada: sin filtro de industria ni de tamaño de empresa, con un filtro de "Department" que metía hospitales y universidades gigantes. De 30 resultados muestreados, solo 3 (10%) calzaban con el ICP real. Se corrigió y se guardaron dos búsquedas limpias:

- **"SpindleLab - Finanzas Legal Consultoria (11-200)"** — Industry: financial services, legal services, management consulting, investment management · # Empleados: 11-200 (rangos 11-20/21-50/51-100/101-200) · Ubicación: Chile · Email verificado · Cargos: founder, co-founder, CEO, managing director, gerente general, socio, director de marketing. **1.482 contactos.** Verificado con muestra de 30: 100% de match (empresas 11-190 empleados, todas del rubro correcto).
- **"SpindleLab - Medico Dental (1-100)"** — Industry: medical practice (única categoría disponible en Apollo que agrupa clínicas chicas/dentales; no existe tag "dental" separado) · # Empleados: 1-100 · Ubicación: Chile · Email verificado · mismos cargos. **127 contactos.**
- **"SpindleLab - Oftalmologia Chile (1-100)"** — refinamiento de la anterior a solo oftalmología/óptica, armado en conjunto con el Asistente de IA de Apollo (iterado y corregido dos veces: la primera pasada no traía filtro de cargo, la segunda usaba solo títulos en inglés y perdía a los dueños que figuran como "director médico"/"director clínico"). Industry: medical practice + health, wellness & fitness · Keywords de empresa: oftalmologia, ophthalmology, optometry, optica, vision, salud visual · # Empleados: 1-100 · Ubicación: Chile · Email verificado · Cargos: founder, co-founder, CEO, managing director, gerente general, socio, director de marketing, director, gerente, owner, propietario, director médico, director clínico. **22 contactos** — universo real y acotado (nicho chico en Chile, no problema de filtro). Incluye a Alex y Jose Assadi Zaror (Centro Europeo Oftalmología / ceof.cl, el sitio con certificado SSL vencido confirmado). Tiene ~6 falsos positivos esperables por lo ancho de la industria "health, wellness & fitness" (una farmacia, un centro de meditación, un fabricante de ropa quirúrgica) — filtrar a mano antes de escribir.

## Exploración: segmento médico/dental (1-100 empleados) — fricción web por sub-rubro (9-jul-2026)

A pedido de Ramón, se exploró si vale la pena abrir el piloto a clínicas chicas médico/dentales (fuera del segmento original finanzas/legal/consultoría), evaluando qué sub-rubro tiene más fricción técnica/SEO en su sitio (= dolor más obvio de vender = público objetivo natural de SpindleLab). Se revisaron 11 clínicas repartidas en 7 sub-rubros (WebFetch + verificación en navegador real):

| Sub-rubro | Empresa | Sitio | Hallazgo de fricción |
|---|---|---|---|
| **Oftalmología** | Centro Europeo Oftalmología | ceof.cl | **Crítico** — certificado SSL vencido, sitio no carga (confirmado en Chrome) |
| **Oftalmología** | Diagnomar (centro oftalmológico, Viña del Mar) | diagnomar.cl | **Crítico** — certificado SSL vencido, sitio no carga (confirmado en Chrome) |
| Cirugía estética | Clínica Huinganal | clinicahuinganal.cl | Alto — sin H1 claro, contenido delgado, sin schema, secciones duplicadas |
| Diagnóstico/laboratorio | Positronpharma (PositronMed) | positronmed.cl | Alto — sin title/meta, contenido delgado, imágenes rotas |
| Diagnóstico/cardiología | CIMEK (Rancagua) | cimek.cl | Alto — sin H1, sin schema, links rotos (protocolo mal formado) |
| Diagnóstico/toxicología | Corthorn Health | chealth.cl | Medio-alto — múltiples H1 (mal jerarquizado), sin schema |
| Implantes/estética | DGmed | dgmed.cl | Medio-alto — sin meta description, sin schema, copy delgado |
| Estética capilar | Bravo Hair Institute | bhi.cl | Medio — buena estructura, pero sin meta description ni schema |
| Telemedicina/kinesiología | Cyber Salud | cybersalud.cl | Medio — buen contenido pero sin meta tags, testimonios duplicados |
| Dental | Clínica Aires | clinicaaires.cl | Medio — buena estructura y contenido, pero sin meta description ni schema |
| Urgencia/salud general | Clínica Cruz Nacional | cruznacional.cl | Menor (relativo) — contenido sólido y jerarquía clara, aun así sin schema ni meta description |

**Conclusión: oftalmología es el sub-rubro con mayor fricción, y por lejos.** No es una diferencia de matiz (falta un meta tag) — es **2 de 2 centros oftalmológicos muestreados con el sitio completamente caído** (certificado SSL vencido, confirmado navegando de verdad en Chrome, no solo por fetch). Eso es fricción máxima: cero visibilidad, cero conversión, mientras el resto de sub-rubros (diagnóstico/laboratorio, cirugía estética) tienen sitios funcionales con debilidades técnicas normales (sin schema, sin meta description, contenido delgado). Ningún sitio de los 11 tiene datos estructurados (JSON-LD) — gap transversal a todo el rubro médico/dental, válido como ángulo de venta secundario.

**Decisión (9-jul-2026):** Ramón confirma enfocar el segmento médico/dental del piloto en **centros oftalmológicos pequeños** (1-100 empleados) con la evidencia actual (n=2, ambos con certificado SSL vencido) — no se amplía más la muestra por ahora. Pendiente para cuando se retome: Apollo activó una verificación anti-bot (Cloudflare) al intentar paginar más resultados de la búsqueda "Medico Dental (1-100)" — hay que resolverla manualmente en la sesión de Ramón antes de poder refinar esa búsqueda a solo oftalmología (agregar palabra clave "oftalmolog" o similar).

## Candidatos semilla (verificados por búsqueda web real, 9-jul-2026 — sin contacto de persona aún)

| Empresa | Rubro | Sitio | Cargo a buscar | Estado |
|---|---|---|---|---|
| Koncept Ltd | Consultoría de gestión | ver fuente | Gerente General/Socio | Por verificar tamaño real y ubicar contacto |
| KPaz Consultores SpA | Consultoría empresarial | ver fuente | Gerente General/Socio | Por verificar tamaño real y ubicar contacto |
| Avanzoconsultora | Consultoría RRHH (pymes) | avanzoconsultora.cl | Gerente General/Socio | Por verificar tamaño real y ubicar contacto |
| Becker Abogados | Legal — corporativo/tributario | beckerabogados.cl | Socio | Por verificar tamaño real y ubicar contacto |
| CZ Abogados | Legal — corporativo/compliance | czabogados.cl | Socio | Por verificar tamaño real y ubicar contacto |
| Abogaley | Legal — corporativo/M&A | abogaley.cl | Socio | Por verificar tamaño real y ubicar contacto |
| Fintual | Gestión de inversiones (boutique/fintech) | fintual.cl | Gerente de Marketing/Crecimiento | Por verificar tamaño real y ubicar contacto |

**Nota:** esto son 7 empresas reales, no 15-20 — la búsqueda web no reemplaza completo al conector de datos B2B. Faltan por sumar ~8-13 más y, en las 7, identificar a la persona exacta (nombre/cargo/email) antes de escribir.

## Plantilla de mensaje (borrador, tono marca — sin nombre personal, sin urgencia artificial)

**Asunto:** Visibilidad en IA para [Empresa]

**Cuerpo:**
> Hola [Nombre],
>
> Cuando un cliente le pregunta a ChatGPT o Gemini por [servicio del rubro], ¿aparece [Empresa] en la respuesta?
>
> [Observación real y específica sobre su sitio — completar tras revisión manual de 2 minutos, nunca un dato inventado].
>
> Hacemos auditorías de SEO técnico y visibilidad en IA (AEO/GEO) para empresas de rubros donde la confianza es crítica — finanzas, legal, consultoría B2B. El diagnóstico inicial es gratis y toma 48 horas.
>
> Si te sirve, te lo envío esta semana.
>
> SpindleLab
> hola@spindlelab.cl

**Follow-up (día +4 a +5, si no hay respuesta):**
> Hola [Nombre], seguimiento breve a mi mensaje anterior — sigue en pie el diagnóstico gratis si te sirve revisar cómo aparece [Empresa] en las respuestas de IA. Sin compromiso.
>
> SpindleLab

## Seguimiento

| Empresa | Contacto | Rubro | 1er contacto | Estado | Próxima acción |
|---|---|---|---|---|---|
| | | | | | |
