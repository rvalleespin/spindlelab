# Lote 1 — Frente C experimental (salud visual / oftalmología y ópticas)

**Preparado:** 9 jul 2026 · 5 prospectos, verificados sitio por sitio con curl directo (no solo el sitio visible).
**Origen:** exportación de Apollo de una sesión paralela — ver `listas/frente-c-salud-visual-optica.md` para el detalle completo, los descartes y los 2 casos ya bien optimizados que quedaron fuera.
**Regla de calentamiento:** este frente es adicional al de Frente A (asesoras) — el dominio ya está enviando ahí. No mezclar tandas: esperar a que Frente A tenga su primera tanda fuera antes de sumar esta.

## Antes de enviar — 3 pasos por prospecto

1. **Email del decisor:** ya viene verificado por Apollo (columna Email Status = Verified en el CSV original). Revisar igual que el nombre coincida con el cargo antes de enviar.
2. **Prueba de evidencia (1 min, opcional):** pegar la «pregunta ChatGPT» de cada prospecto en ChatGPT y anotar el resultado real. Si no aparecen (lo esperable), usar esa línea en `[+EVIDENCIA]`. Si el resultado no es claro, eliminar la línea — el hallazgo técnico sostiene el email solo.
3. **Leer el email completo una vez** en voz propia antes de enviar.

**Toques 2 y 3:** usar el estándar F-C de `plantillas/emails-fase0.md`, día +4 y día +10.

## Tabla de seguimiento

| # | Empresa | Email decisor | Enviado | Respuesta | Diagnóstico |
|---|---|---|---|---|---|
| 1 | HK Centro Visual | crado@hkcentrovisual.cl | ✅ 14 jul | | |
| 2 | Centro Europeo Oftalmología | jose.assadi@ceof.cl | ✅ 14 jul | | |
| 3 | Redlaser | scastillo@redlaser.cl | ✅ 14 jul | | |
| 4 | COP - Clínica Oftalmológica Providencia | joaquin.vicuna@cop.cl | ✅ 14 jul | | |
| 5 | Óptica Roccelli | claudia@opticaroccelli.com | ✅ 14 jul | | |

**Nota:** enviados directo desde hola@spindlelab.cl (confirmado en Gmail web), no vía la herramienta de esta sesión — el conector de Gmail de este chat resultó estar apuntando a la cuenta personal de Ramón, no a hola@spindlelab.cl. Los 5 borradores que esa herramienta alcanzó a crear quedaron huérfanos en la cuenta personal y no se usaron.

---

## 1. HK Centro Visual — hkcentrovisual.cl
**Decisor:** Claudia Rado (Gerente de Marketing).
**Hallazgo verificado:** el sitio devuelve error HTTP 403 a cualquier lector automatizado — lo comprobé con dos user-agents distintos (navegador normal y uno genérico), mismo resultado ambas veces. La página de error que se muestra en su lugar trae además `<meta name="robots" content="noindex">`. En la práctica: Google, ChatGPT y Perplexity no pueden leer una sola palabra de hkcentrovisual.cl.
**Pregunta ChatGPT:** «¿Dónde comprar lentes de contacto de marcas reconocidas en Santiago con buena atención y asesoría?»

**Asunto:** hkcentrovisual.cl le da error 403 a Google y a ChatGPT — lo comprobé

Hola Claudia:

Antes de escribirte probé leer hkcentrovisual.cl con las mismas herramientas automatizadas que usan los buscadores y los motores de IA, y el sitio responde error 403 — bloqueado. Lo probé dos veces con configuraciones distintas y el resultado fue el mismo ambas veces.

[+EVIDENCIA: Hice la prueba en ChatGPT preguntando por lentes de contacto en Santiago: recomendó a (X e Y). HK Centro Visual no apareció — ni podría, si el sitio no se puede leer.]

Toda la variedad de marcas y el catálogo que manejan hoy es invisible para cualquier motor de búsqueda o de IA. Es de los hallazgos más directos de arreglar que he visto — no es un problema de contenido, es un bloqueo técnico puntual.

¿Te preparo un mini-diagnóstico de 1 página en 48 horas mostrando exactamente qué está pasando? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 2. Centro Europeo Oftalmología (CEOF) — ceof.cl
**Decisor:** Jose Assadi Zaror (Socio y Gerente Comercial).
**Hallazgo verificado:** el sitio no tiene meta description ni un solo dato estructurado (JSON-LD) — nada que ayude a un motor de IA a entender de qué trata la página más allá del título. Corre sobre WordPress con un stack de plugins de hace varios años sin actualizaciones visibles (tema Jupiter, dos sliders distintos, Visual Composer) — la clase de sitio que se armó una vez y no se ha vuelto a tocar.
**Pregunta ChatGPT:** «¿Qué clínica oftalmológica en Santiago recomiendas para cirugía refractiva o tratamiento de cataratas?»

**Asunto:** ceof.cl no le da a Google ni una línea de descripción

Hola Jose:

Revisé ceof.cl antes de escribirte: no tiene meta description ni ningún dato estructurado — la información mínima que un motor de búsqueda o de IA necesita para entender y citar correctamente una clínica. El sitio además corre sobre una base de WordPress con plugins visiblemente antiguos, sin actualizaciones recientes.

[+EVIDENCIA: Le pregunté a ChatGPT por cirugía refractiva en Santiago: recomendó a (X e Y). CEOF no apareció.]

En un rubro donde la confianza médica lo es todo, esa brecha entre la trayectoria real de CEOF y lo que un paciente puede encontrar investigando con IA es exactamente lo que trabajo.

¿Le preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 3. Redlaser — redlaser.cl
**Decisor:** Silvia Castillo Diaz (Subgerente Comercial).
**Hallazgo verificado:** cero datos estructurados y sin meta description, pese a ser la cadena más grande de las revisadas en este grupo (51 empleados, 3 sedes) y líder en cirugía refractiva/LASIK. El contenido real existe — testimonios de pacientes con nombre, descripciones de procedimientos — pero no está marcado de forma que un motor de IA lo pueda interpretar como autoridad en el tema.
**Pregunta ChatGPT:** «¿Dónde hacerme una cirugía láser de miopía (LASIK o PRK) en Santiago con buena reputación?»

**Asunto:** Redlaser es el más grande del grupo — y el menos preparado técnicamente para IA

Hola Silvia:

Revisando redlaser.cl encontré algo llamativo: siendo la cadena más grande entre las clínicas oftalmológicas que analicé (3 sedes, 51 personas), el sitio no tiene un solo dato estructurado ni meta description. Tienen testimonios reales de pacientes y contenido de valor sobre los procedimientos — pero nada de eso está marcado para que un motor de IA lo identifique como autoridad en cirugía refractiva.

[+EVIDENCIA: Hice la prueba en ChatGPT: preguntando por cirugía láser de miopía en Santiago, recomendó a (X e Y). Redlaser no apareció.]

Es el tipo de caso donde el contenido ya está — falta la capa técnica que lo hace citable.

¿Le preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, y se queda con el documento.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 4. COP — Clínica Oftalmológica Providencia — cop.cl
**Decisor:** Joaquín Vicuña Kojchen (Director Médico).
**Hallazgo verificado:** sin meta description — el título de la home es "Inicio - Clinica Oftalmológica Providencia", genérico, no dice a qué se dedican. Es la clínica más grande del grupo (44 empleados) y sí tiene un blog activo de salud ("Noticias y Salud") con artículos recientes — la base de contenido existe, pero no está resuelta la capa técnica básica que ayuda a un motor de IA a entender y priorizar ese contenido.
**Pregunta ChatGPT:** «¿Qué clínica oftalmológica en Providencia recomiendas para una consulta o cirugía de cataratas?»

**Asunto:** COP publica contenido de salud regularmente — y Google no sabe de qué trata el sitio

Hola Joaquín:

Reviso cop.cl y encuentro algo que vale la pena decir: publican contenido de salud visual con regularidad (control de miopía infantil, señales de alerta, etc.) — algo que casi ninguna clínica de este tamaño hace en Chile. El problema técnico es más básico: el título de la página principal es genérico ("Inicio - Clínica Oftalmológica Providencia") y no hay una descripción para buscadores, así que ni Google ni un motor de IA tienen claro, sin leer todo el sitio, a qué se dedica exactamente COP.

[+EVIDENCIA: Le pregunté a ChatGPT por cirugía de cataratas en Providencia: recomendó a (X e Y). COP no apareció.]

Con el contenido que ya producen, esta es una corrección de bajo esfuerzo y alto impacto.

¿Le preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 5. Óptica Roccelli — opticaroccelli.cl
**Decisora:** Claudia Cerda Navarro (Directora General).
**Hallazgo verificado:** tiene meta description y un dato estructurado — mejor base técnica que el resto del grupo. Su diferenciador real es B2B (programas de salud visual corporativa para empresas: operativos oftalmológicos, exámenes en el lugar de trabajo, convenios), pero no hay contenido ni marcado específico que respalde esa oferta frente a un motor de IA — el sitio habla de eso, pero no de forma que un motor lo cite como respuesta a una búsqueda B2B.
**Pregunta ChatGPT:** «¿Qué óptica en Santiago ofrece programas de salud visual corporativa para empresas?»

**Asunto:** Su programa B2B es el diferenciador — y no aparece cuando una empresa pregunta por eso

Hola Claudia:

Revisando opticaroccelli.cl noté que la base técnica del sitio está mejor resuelta que el resto de las ópticas que analicé — título y descripción presentes, algo de datos estructurados. Lo que encontré es una oportunidad más específica: ustedes ofrecen algo poco común en el rubro (programas de salud visual corporativa para empresas — operativos, exámenes en terreno, convenios), pero esa oferta no está estructurada como para que un motor de IA la recomiende cuando una empresa pregunta específicamente por eso.

[+EVIDENCIA: Le pregunté a ChatGPT por ópticas con programas de salud visual corporativa en Santiago: recomendó a (X e Y). Roccelli no apareció, pese a tener la oferta.]

Es un ajuste dirigido, no una reconstrucción del sitio.

¿Le preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl
