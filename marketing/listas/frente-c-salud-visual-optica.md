# Lista — Frente C (experimental): salud visual, oftalmología y ópticas

**Origen:** exportación de Apollo (22 contactos, 13 empresas) hecha por una sesión paralela conectada directamente al navegador con Apollo abierto — no fue una búsqueda planificada en la estrategia original. El estudio de categorías de `estrategia-marketing-spindlelab.md` no evaluó este rubro; se trata como **frente experimental** hasta decidir si se suma de forma permanente.

**Verificación:** los 7 candidatos que pasaron el primer filtro se revisaron sitio por sitio (curl directo, no solo el sitio visualmente) el 9 jul 2026.

## Descartados del CSV (no calzan con el frente)

| Empresa | Motivo |
|---|---|
| Centro de Meditación Dharmahue | Rubro no relacionado (meditación/bienestar), apareció por superposición de keywords "wellness & fitness" |
| Centro Médico 27 1/2 | Medicina general multi-especialidad, no salud visual específica |
| MyM Descartables | Fabricante B2B de indumentaria médica (pack quirúrgicos) — no es un negocio de cara al paciente, mal ajuste para AEO local |
| Aki Veo + | Startup de 1 empleado, muy temprano para outbound de este tipo |
| Farmacia Farmex | Cadena de farmacia con stack de marketing ya sofisticado (HubSpot, Mailgun, Shopify) — probablemente ya tiene equipo propio |

## Candidatos verificados

| Empresa | Sitio | Decisor (Apollo) | Hallazgo técnico verificado |
|---|---|---|---|
| HK Centro Visual | hkcentrovisual.cl | Claudia Rado — Gerente de Marketing | **El sitio devuelve HTTP 403 a cualquier visitante automatizado** (confirmado con dos user-agents distintos), con una página de error que además trae `<meta name="robots" content="noindex">`. Los crawlers de Google, ChatGPT y Perplexity no pueden leer el sitio en absoluto. |
| Centro Europeo Oftalmología (CEOF) | ceof.cl | Jose Assadi Zaror — Socio y Gerente Comercial | Cero meta description, cero datos estructurados (JSON-LD). WordPress con stack de plugins de 2017-2023 sin actualizar visiblemente (Jupiter 5.9.2, Visual Composer, dos sliders distintos) — típico de un sitio armado y nunca vuelto a tocar. |
| Redlaser | redlaser.cl | Silvia Castillo Diaz — Subgerente Comercial | Cero datos estructurados (JSON-LD), sin meta description — pese a ser la cadena más grande del grupo (51 empleados, 3 sedes, líder en cirugía refractiva/LASIK). El contenido real existe (testimonios, servicios) pero no está marcado para que los motores lo interpreten. |
| COP — Clínica Oftalmológica Providencia | cop.cl | Joaquín Vicuña Kojchen — Director Médico | Sin meta description (el título sí existe: "Inicio - Clinica Oftalmológica Providencia" — genérico, no dice qué hacen). Es la clínica más grande del grupo (44 empleados) con blog activo — base de contenido real que no se está aprovechando técnicamente. |
| Óptica Roccelli | opticaroccelli.cl | Claudia Cerda Navarro — Directora General | Meta description y 1 dato estructurado presentes — mejor base técnica del grupo. Su ángulo de venta es B2B (programas de salud visual corporativa para empresas) y no hay contenido ni marcado que respalde esa oferta específica frente a un motor de IA. |

## Bien optimizados — no entran al lote 1, otro ángulo si se retoman

| Empresa | Sitio | Nota |
|---|---|---|
| Óptica Will Bloom | willbloom.cl | Meta description + 2 JSON-LD (Shopify). Técnicamente resuelto para e-commerce; el hueco real sería autoridad/E-E-A-T en salud visual, no visibilidad básica — requiere otro ángulo de pitch, no el de "eres invisible". |
| Ópticas Gonzalo Cortés D | opticagc.cl | Meta description + 2 JSON-LD, buen título con la historia familiar de 4 generaciones ya en el copy. Base técnica sólida; ángulo pendiente de definir. |

**Siguiente paso:** lote 1 con los 5 verificados en `outbound/semana-02/lote-1-frente-c.md`.
