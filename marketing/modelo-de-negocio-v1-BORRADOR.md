# Modelo de negocio v1 — BORRADOR (23-oct-2026)

> ⚠️ **BORRADOR. No es una decisión, no se publica y no cambia ninguna otra pieza.**
> Escrito por la troncal a partir del encargo de Ramón (23-oct), una lectura de `origin/main` y Gmail (19 al 22-oct). No modifica `pipeline.md`, el plan operativo, el sitio ni material público.
> **Versión 1.1:** corregida tras la revisión de dos auditores independientes. La primera versión decía que la ruta «revisión gratis → proyecto» era la que había cerrado a los dos clientes; las fuentes dicen lo contrario y está corregido abajo.
> **Actualización 23-oct (tarde):** Ramón eligió el **Camino A** (probar el modelo sin cambiar lo público). Paso 0 hecho: ver Anexo C. Eduardo ya recibió su cotización (SPL-COT-2026-017).
> **Rótulos:** **[HECHO]** = venta o entrega verificable. **[DECLARADO]** = Ramón dice que puede hacerlo y ningún cliente lo ha comprado, o un pago sin comprobante. **[HIPÓTESIS]** = por probar. **[propuesta]** = número u opción de este borrador, no dato.
> Los precios son los ya existentes en el repo, con su tipo (publicado, cotizado o vendido). No se inventó ninguno. Las cifras del sitio vivo las leyó un agente el 23-oct y no las re-verifiqué.

## 1. Resumen

1. **Lo único que SpindleLab ha vendido son sitios web.** Dos clientes de Desarrollo Web, uno por contacto directo y otro por referido. Del servicio SEO/AEO por correo frío: 0 clientes sobre 142 correos registrados hasta el 22-sep (el registro está obsoleto; lo realmente enviado es mayor).
2. **El modelo nuevo («socio de marketing y crecimiento con IA») no tiene ninguna venta.** Ni el diagnóstico pagado, ni analítica o CRM, ni automatizaciones, ni acompañamiento a un equipo ajeno, ni un recurrente cobrado.
3. **Según la evaluación del 19-oct (diagnóstico de la troncal), el cuello del embudo está después de la respuesta** (llamada, propuesta, cierre). Un modelo nuevo no arregla eso por sí solo.
4. **Recomiendo tratar el v1 como hipótesis medida dentro del corte vigente (3-dic)**, sin tocar el sitio ni el mensaje.
5. **La ruta probada es otra: conversación directa o referido → cotización a medida con fases → proyecto.** Así cerraron Bernardo y María, sin revisión gratis ni llamada de diagnóstico. La revisión gratis como primer paso todavía no cerró a nadie. Eduardo es el primer caso que la recorrió hasta una cotización: revisión gratis (2-oct) → llamada (22-oct) → cotización de Sitio Completo SPL-COT-2026-017 (23-oct, unas 20 horas después), sin cierre todavía.
6. **El acompañamiento mensual no debería ser el centro del modelo.** Lleva 0 ventas, y `capacidad-servicios.md` (12-jul) dice que el monitoreo en IA es manual y no escala más allá de 1-2 clientes sin resolverlo.

## 2. Qué está respaldado y qué no

| | Qué | Evidencia |
|---|---|---|
| **[HECHO]** | 2 clientes de Desarrollo Web: Bernardo Combeau (contacto directo) y María Loreto (referida por Bernardo, luz verde 26-sep) | `ventas/proyectos-en-curso.md`, `ventas/pipeline.md`, `ventas/metricas-ventas.md` |
| **[HECHO]** | Bernardo: venta de $392.000 (oferta de lanzamiento, IVA incluido) + ampliación de $120.000 = $512.000, que recompró. Sitio con panel entregado (lanzamiento 24-jul). Cobrado como persona natural | Pago **confirmado verbalmente por Ramón (21-sep)**. Único comprobante en el repo: $156.800 el 14-jul. No consta el IVA de la ampliación |
| **[HECHO]** | María Loreto: Sitio Completo, $1.190.000 + IVA = $1.416.100, **a precio de lista**, factura la SpA | Primer pago cobrado según Ramón (19-oct), monto y comprobante no registrados. **Sitio sin entregar**: va en maqueta |
| **[HECHO]** | Cómo entraron: ninguno vino del embudo. Bernardo, contacto directo («sin pasar por llamada de diagnóstico»); María, referido de Bernardo. Costo de pauta de esos dos clientes: $0 (el tiempo de Ramón no está costeado) | `ventas/metricas-ventas.md` (corte 27-sep) |
| **[HECHO]** | Entregables producidos: sitio con panel (Bernardo), mini-diagnósticos (carpetas 001, 002 y 006 en `main`; el 007 de Eduardo está en Gmail; otros se enviaron según el pipeline y no tienen carpeta; conteo exacto no determinado), cotizaciones a medida, kit de consentimiento aplicado al sitio propio | `marketing/diagnosticos/`, `.claude/skills/*` |
| **[HECHO]** | Construir sitios nuevos desde cero | Entregado en Bernardo; en curso en María |
| **[DECLARADO]** | Mejorar sitios existentes de terceros | Ningún caso. La brecha de implementación sobre sitios ajenos está marcada desde julio |
| **[DECLARADO]** | Diseñar y coordinar soluciones de crecimiento | Hecho en web; no probado como consultoría de crecimiento |
| **[DECLARADO]** | Configurar analítica, CRM e integraciones | Solo sobre activos propios (GA4, chequeo del sitio, PostHog en Praxi). Ningún CRM ni integración entregada a un cliente. El único compromiso escrito es el botón de pago con Mercado Pago para María, sin entregar |
| **[DECLARADO]** | Crear automatizaciones o asistentes de IA | No hay entrega, cotización ni skill con ese rol |
| **[DECLARADO]** | Acompañar la optimización mensual | 0 clientes en tres meses. Ver sección 6 por los límites de capacidad |
| **[DECLARADO]** | Acompañar al equipo del cliente o a sus proveedores | Solo compromisos escritos a María (cuentas a su nombre, traspaso del código con documento). Bernardo ya opera su panel. **Sin clasificar** |
| **[DECLARADO]** | **Plan Arranque de Carlos Soya:** $200.000/mes × 3 meses + hasta $100.000/mes de pauta, con la página (valorada en $290.000) incluida | Aceptado de palabra el 21-sep; sin aviso de pago desde el 10-oct; cambió el enfoque dos veces; cotización SPL-COT-2026-016 del 20-oct mantiene $200.000/mes. Es lo más parecido a «socio de marketing» que existe en el repo (web + pauta + acompañamiento mensual) y no está pagado |
| **[HIPÓTESIS]** | Que existan empresas de 2-3+ empleados con sistema de ventas activo al alcance de SpindleLab y que compren un diagnóstico pagado | Ningún dato. De los clientes y prospectos actuales no hay registro de tamaño ni de sistema de ventas |
| **[HIPÓTESIS]** | Que el sitio sea el cuello de botella principal | No comprobado |
| **[HIPÓTESIS]** | Que cobrar el diagnóstico no destruya la puerta gratuita | Todo el embudo actual descansa en la revisión gratis |

**Dato que importa sobre rubros:** la única tasa de respuesta en frío medida por rubro es la de abogados (4 de 69, 5,8 %) y salud (1 de 72, 1,4 %). Hay respuestas aisladas de otros rubros, sin tasa: Chef & Hotel (medio/turismo) llegó a llamada y propuesta; Eduardo (contador) entró por correo frío el 30-sep. La muestra fuera de abogados es de 1 o 2 casos, no cero.

## 3. Cliente ideal (v1)

**Perfil propuesto [HIPÓTESIS]:** empresa de 2 o 3+ personas, de cualquier rubro, que ya vende y quiere más prospectos calificados o mejor conversión.

**Filtro de calificación (5 preguntas para la primera llamada, costo cero):**
1. ¿Cuántas personas trabajan y cuántas atienden o siguen prospectos?
2. ¿Tienen un proceso de ventas que alguien pueda describir de principio a fin?
3. ¿Usan algún CRM o registro, aunque sea una planilla?
4. ¿Les llegan prospectos con regularidad? ¿De dónde?
5. ¿Cerraron ventas en los últimos 90 días?

Encaja si cumple al menos 4 de 5 **[propuesta]**.

**Tensiones con decisiones ya tomadas** (hay que resolverlas explícitamente):

| Dirección nueva | Decisión previa | Propuesta |
|---|---|---|
| Multirrubro | «Especialista, no generalista» (plan de reposicionamiento, 2-ago; esa misma decisión bajó Desarrollo Web a cross-sell). Concentración en abogados por datos (5,8 % vs 1,4 %) | El perfil es multirrubro y **no limita a la agencia a una industria**. Para el outbound frío, mantener abogados como decisión táctica temporal (muestra pequeña, registro no fiable); el diagnóstico pagado se prueba en el rubro de las conversaciones que ya vienen calientes |
| Exigir «sistema de ventas activo» | ICP de dos puertas (21-sep): quien parte de cero entra por Desarrollo Web, nunca se excluye | Usar el filtro para **priorizar**, no para excluir |
| Diagnóstico pagado | El embudo y la regla «mostramos, no prometemos» descansan en el diagnóstico gratis | Conservar la revisión gratis como entrada; el pagado entra después, para quien ya calificó |
| Socio de crecimiento | «No te prometo. Te muestro»; cero prueba social inventada | Prometer método y entregables, nunca resultados (sección 4) |
| Un frente nuevo | Corte vigente: ≥3 llamadas al 19-nov y ≥1 cliente al 3-dic. La evaluación del 19-oct dice que el corte no autoriza abrir un frente nuevo | Solo como hipótesis medida (sección 11) |

## 4. Problema y resultado prometido

**Problema [HIPÓTESIS]:** la empresa recibe prospectos o tráfico y pierde ventas en alguna parte del recorrido que nadie midió de punta a punta. En algunos casos el sitio será una de esas partes; eso lo debe mostrar el diagnóstico, no darse por sentado.

**Qué se puede prometer** (lo que SpindleLab controla): un mapa del recorrido con cuellos priorizados y su evidencia; una recomendación con alcance y precio; un plan para medir si la solución funcionó; implementación con alcance definido por escrito.

**Qué NO se promete nunca:** una cantidad de prospectos, ventas, citas o menciones en respuestas de IA. SpindleLab no controla esas cifras, y su propio sitio tuvo 0 menciones en 45 pruebas (corrida de agosto, dato interno).

## 5. Oferta por etapa

Precios de **referencia ya documentados**, no precios del modelo nuevo. Los publicados son «desde» y + IVA.

| Etapa | Alcance | Evidencia | Precio de referencia |
|---|---|---|---|
| **1. Revisión breve gratis** | Mini-diagnóstico de 1 página en 24 h con hallazgos y una corrección de partida; termina en una llamada de 20 min | [HECHO] que se entrega; **no ha cerrado a ningún cliente por esta vía.** Ramón sacó el mini-diagnóstico de la bio de Instagram el 25-sep; el sitio y el correo del 30-sep lo siguen ofreciendo. Falta decidir si es la entrada oficial. SmartGrowth ofrece un diagnóstico gratis de visibilidad en IA | $0 |
| **2. Diagnóstico pagado** | Entregables: mapa del recorrido, cuellos priorizados con evidencia, recomendación con alcance y precio, plan de medición. Insumos estándar: analítica web, Search Console, CRM, campañas pagadas, sitio o equipo técnico, conversación con quienes atienden y siguen prospectos, resultados de ventas. Un dato faltante queda como limitación declarada. **Plazo y límites del alcance: por definir** | [HIPÓTESIS]: sin plantilla, precio ni comprador. «Abonable al proyecto» es una opción de este borrador **[propuesta]**, no consta en ninguna fuente | **Sin precio propio.** Contexto: Auditoría Completa desde $490.000 y Visibilidad en IA desde $400.000 (publicadas); diagnóstico AEO de Nitten $350.000 (estudio del 2-ago y blog propio; en su tarifario del 26-ago figura otro precio de $350.000/mes, no este) |
| **3. Implementación** | Desarrollo Web: Landing ~1 semana, Esencial (home + hasta 5 páginas) ~3 semanas, Completo (hasta 12 páginas, blog, AEO/GEO, 1-2 idiomas) 4-6 semanas. Tienda aparte (desde $450.000 + IVA). Condición de entrada: alcance escrito en la cotización, fases con pago asociado (30/40/30) | [HECHO] en web. [DECLARADO] en analítica, CRM, automatización | Landing desde $390.000, Esencial desde $690.000, Completo desde $1.190.000 (publicados). María pagó lista; Bernardo, oferta de lanzamiento |
| **4. Acompañamiento mensual** | Publicado: mínimo 3 meses y luego mes a mes con aviso de 30 días; implementación, contenido, monitoreo doble, informe quincenal y reunión mensual. No incluye pauta publicitaria (va aparte) | [DECLARADO]: 0 clientes | Esencial desde $590.000/mes, Pro desde $790.000/mes (publicados). Mantención de Bernardo $50.000/mes (acordada, sin cobro verificado). Plan Arranque de Carlos $200.000/mes (cotizado, sin pago) |

**Ruta estándar recomendada [propuesta]: conversación → cotización a medida con alcance claro → proyecto, con el diagnóstico incluido en el proyecto.** Es la única que ha cerrado (dos veces). La revisión gratis queda como generador de conversaciones, y el diagnóstico pagado separado como prueba para quien necesita mapear antes de saber qué comprar. Acompañamiento: solo como cierre de un proyecto entregado y para 1 o 2 clientes mientras el monitoreo en IA siga siendo manual.

## 6. Forma de entrega

- **Producen los agentes, con revisión humana:** mini-diagnóstico, borradores de cotización, código del sitio, hallazgos técnicos del motor de revisión previa.
- **Solo Ramón, sin agente que lo sustituya:** llamadas de venta, cotización de cierre, aprobación y envío de todo, cobros, reunión mensual y las consultas manuales a ChatGPT, Gemini y Perplexity.
- **Límites escritos** (`capacidad-servicios.md`, 12-jul): el monitoreo de presencia en IA es manual y «no escala más allá de 1-2 clientes en acompañamiento mensual sin resolver esto». El documento propone salidas (seguir manual con 1-2 clientes, herramienta de share-of-voice con 2 o más). El modelo de acceso a sitios de terceros está definido en `onboarding-cliente.md`, pero nunca se ha ejercido.
- **Hueco:** no hay registro de horas por proyecto (Bernardo ni María). Sin eso no se sabe cuántos clientes simultáneos aguanta el modelo.

## 7. Fuentes de ingreso

| Fuente | Estado |
|---|---|
| Proyectos de Desarrollo Web | [HECHO]. Bernardo: $512.000 (pagado según Ramón). María: $1.416.100 con IVA, facturada por la SpA, primer pago cobrado según Ramón. **No se suman:** distinta base de IVA y distinto estado de cobro |
| Ampliaciones a clientes existentes | [HECHO]: 1 (Bernardo, +$120.000) |
| Diagnóstico pagado | [HIPÓTESIS]: 0 |
| Recurrentes acordados sin cobro verificado | Mantención de Bernardo ($50.000/mes) y Plan Arranque de Carlos ($200.000/mes × 3, sin aviso de depósito) |
| Acompañamiento mensual publicado | [DECLARADO]: 0 clientes |
| Verifica y Cumple (kit desde $149.000; revisión trimestral desde $39.000/mes) | [HIPÓTESIS]: 0 pedidos registrados |
| Gestión de redes y Paid media | [DECLARADO]: Bla! (Gestión de Redes, $390.000/mes + IVA) cotizada el 28-sep, sin respuesta |

## 8. Adquisición de clientes

| Canal | Qué muestran los datos |
|---|---|
| Contacto directo y referido | **Los únicos que cerraron.** Referido: 1 caso (Bernardo → María Loreto) |
| Correo frío | 142 **registrados hasta el 22-sep** (registro declarado obsoleto el 19-oct: después salieron decenas más sin fila) → 7 respuestas (4,9 %, incluye 2 rechazos; 3,5 % positivas), 0 clientes. Abogados 5,8 %. Cifras del barrido, sin re-chequear. Reencuentros del 19-oct: 4 enviados, 3 respuestas, 0 cierres |
| Google Ads | $100.411 CLP, 104 clics, 0 conversiones; detenida desde el 24-ago |
| Meta Ads | Prueba de julio $20.656, 0 leads (**solo en la memoria de Ramón, no en el repo**). Campaña de Verifica y Cumple construida y en pausa |
| LinkedIn e Instagram | Página 15 seguidores, perfil personal 380 (captura del 22-sep), Instagram 19 (25-sep). Mejor pieza de la página: 398 impresiones |
| Red presencial | Una ronda, 0 alianzas |
| Motor de revisión previa | Sin ofertas enviadas al 15-oct (LEEME de la entrega); estado posterior sin verificar. 0 de 20 sitios verificados por una persona |

**Costo de adquisición por cliente: no calculable.** Ningún cliente vino de pauta ni del correo frío. Gasto en pauta conocido: $121.067 CLP (de los cuales $20.656 sin respaldo en el repo), 0 clientes.

## 9. Métricas

| Etapa | Métrica | Hoy |
|---|---|---|
| Entrada | Respuestas y conversaciones por canal y por gancho | Falta anotar el gancho (se pidió el 19-oct) |
| Calificación | % de conversaciones que cumplen el filtro de 5 preguntas | Sin dato |
| Llamada | Llamadas de venta realizadas | 2 registradas en 104 días. Meta vigente: ≥3 al 19-nov |
| Propuesta | Propuestas con seguimiento humano en 48 h (regla de la cola) y propuestas respondidas | Sin medir |
| Cierre | Clientes nuevos | Meta vigente: ≥1 al 3-dic |
| Entrega | Horas reales por proyecto | Sin dato |
| Resultado del cliente | Métrica acordada en el plan de medición de cada diagnóstico | No existe aún |

## 10. Economía unitaria (pendiente)

No se calcula nada que los datos no sostengan.

| Dato | Estado |
|---|---|
| Ingreso por cliente | Conocido: $512.000 (oferta) y $1.416.100 con IVA (lista), con bases distintas |
| Horas por proyecto | **Falta.** Se mide en el experimento |
| Costo directo mensual | Apollo US$65/mes (vigencia no verificada), rutinas y herramientas sin cifra |
| Costo de adquisición | No calculable |
| Margen por hora | No calculable |
| Recurrencia real cobrada | $0 verificado |

## 11. Experimento

**Hipótesis:** hay empresas que encajan con el perfil y aceptarían pagar un diagnóstico, o un proyecto que lo incluya.

**Paso 0 (esta semana, costo cero): calibrar el filtro, no decidir el perfil.** Clasificar con las 5 preguntas solo las conversaciones **vivas y con dato**: Eduardo, Carlos Soya y Bla! (más Chef & Hotel, mudo). Las demás son históricas o cerradas y **no se recontactan**: BH Abogados (rechazó el 25-ago, en lista de exclusión), Cortes Zamora (cerrado por tope el 5-oct), Dentimagen y Grupo Altum (sin respuesta), Legal Prisma (pausa por rebrand con otra consultora). Con tres o cuatro casos el paso 0 no puede decidir el perfil; solo muestra si el filtro discrimina y qué datos faltan.

**Paso 1 (hasta el 3-dic):** en cada llamada de 20 min con una empresa que encaje, ofrecer la ruta corta (alcance claro, proyecto con diagnóstico incluido) o, si hay precio, la larga (diagnóstico pagado). **El Paso 1 en su ruta larga queda bloqueado hasta que Ramón fije el precio y la regla de abono (decisión 3).** Registrar horas reales por diagnóstico y qué datos entregó o negó el cliente.

**Criterios [propuesta, Ramón los confirma]**, anclados al corte vigente y medidos por separado:

| | Umbral |
|---|---|
| Llamadas (al 19-nov) | ≥3 llamadas con empresas que encajan. Coincide con el corte vigente. Referencia: 2 llamadas registradas en 104 días |
| Aceptación del diagnóstico pagado (al 3-dic) | ≥1 pago o aceptación escrita de una cotización con monto |
| Cierre de proyecto (al 3-dic) | ≥1 cliente nuevo (es el corte vigente; se mide aparte, porque un proyecto web ya se vende hoy) |
| Corte | Al 3-dic, si hubo llamadas con empresas que encajan y ninguna aceptó un diagnóstico pagado, se retira como puerta y se mantiene la ruta actual |
| Sin veredicto | Si al 3-dic hay menos de 3 llamadas con empresas que encajan, no hay conclusión sobre el diagnóstico; se decide en una revisión posterior, sin extender el plazo por defecto |

**Qué no cambia durante el experimento:** el sitio, el mensaje público, el outbound en abogados, Verifica y Cumple, la cola de calientes y el corte vigente. No se abre canal nuevo.

## 12. Riesgos

| Riesgo | Por qué importa |
|---|---|
| Reposicionar sin prueba | Repite el patrón que Ramón reconoció por escrito: abrir un frente nuevo en vez de aplicar el corte |
| Capacidad | Monitoreo en IA manual, 1-2 clientes recurrentes, Ramón es el único que vende y entrega |
| Credencial débil | 0 menciones propias en IA, 0 clientes SEO/AEO, 0 casos de crecimiento con cifras |
| Competencia | Nitten: diagnóstico AEO a $350.000 (ver sección 5). Focus Ads: publica un piso de CLP 1.000.000/mes de pauta y menciona fee más revenue share sin cifras; al 14-oct no exhibe casos; **«el más parecido al socio de crecimiento» es juicio de la troncal**. SmartGrowth regala el diagnóstico de visibilidad en IA |
| Clientes que cambian el alcance | Carlos Soya lo cambió dos veces y no hay aviso de pago del 12-oct |
| Datos del cliente | Los diagnósticos dependen de acceso a analítica, CRM y Search Console que el cliente puede no dar |
| Foco en un rubro | Concentrar el frío en abogados sigue una muestra pequeña y un registro no fiable; es una decisión táctica, no la definición de la agencia |

## 13. Qué puede ir al sitio hoy

Lo que ya está publicado y respaldado: Desarrollo Web con **un caso público, el de Bernardo** (permiso concedido y en uso desde el 19-oct). El de María solo cuando esté entregado y ella lo autorice. La revisión gratuita y Verifica y Cumple ya están en el sitio; se ofrecen, no hay ventas de Verifica y Cumple todavía. Las tres capacidades sin entrega (analítica y CRM, automatizaciones, acompañamiento al equipo) **no se publican** hasta tener una entrega real. El 0 de 45 menciones es dato interno: no pasa al brief web ni a nada público. Este documento sirve como insumo para el brief del equipo web, sin publicarse.

## 14. Decisiones para Ramón, en orden de importancia

1. **Estatus del v1. DECIDIDA el 23-oct: Camino A**, hipótesis medida dentro del corte vigente (3-dic), no reemplazo del posicionamiento.
2. **Ruta estándar.** Recomendación: conversación → cotización a medida → proyecto con diagnóstico incluido; la ruta larga solo como prueba.
3. **Precio del diagnóstico pagado y si se abona al proyecto.** Bloquea solo la ruta larga del Paso 1. Referencias en la sección 5. No es urgente mientras no haya una llamada con una empresa que encaje y no tenga alcance claro.
4. **Rubro del frío.** Recomendación: abogados como decisión táctica; multirrubro en lo que ya viene caliente.
5. **Acompañamiento mensual publicado** ($590.000 y $790.000) con 0 ventas y capacidad de 1-2 clientes.
6. **Qué capacidad sin entrega se vende primero** (analítica y CRM, automatización o acompañamiento) y con qué cliente piloto.
7. **Pivote «Desarrollo Web + AEO» del 27-sep**, que este modelo toca de lleno y sigue pendiente.

**Pregunta más urgente (tras elegir el Camino A):** ¿agrego las 5 preguntas de calificación al guion de la llamada de 20 minutos, para que cada llamada nueva quede calificada? (Anexo C explica por qué.)

## Anexo A — Datos que se contradicen en el repo (limpiar antes de usar)

- **`pipeline.md` en `main`** tiene a Carlos «aceptado de palabra», a Eduardo con «llamada por agendar el 21-oct» y a Legal Prisma con «llamada agendada». Mi copia local los actualiza al 22-oct y no tiene la fila de Bla!, que `main` sí tiene.
- **Mini-diagnósticos:** el pulso del 23-oct dice 3; con el 007 de Eduardo son al menos 4, y el pipeline cita otros enviados sin carpeta. Que «ya no se ofrece desde el 25-sep» viene de `perfil-instagram.md` y `QUE-HAY-PUBLICADO.md` (la bio), no del pulso; el correo a Eduardo del 30-sep lo ofrece.
- **142 correos y 4,9 %:** salen de `REGISTRO-enviados.csv`, declarado no fiable el 19-oct. Después del 22-sep salieron al menos 36 correos el 24-sep, 10 el 6-oct, 27 el 13-oct y 31 el 14-oct, sin fila.
- **Cobros de Bernardo:** dos documentos dan fechas distintas de confirmación (3-sep y 21-sep) y ninguno trae comprobante. La ficha de cliente dice que su permiso de caso no está autorizado; está concedido.
- **Precios:** `capacidad-servicios.md` (12-jul) lista $550.000 y $900.000 para el acompañamiento; el sitio publica $590.000 y $790.000. El estudio de Marco del 14-oct invierte Auditoría y Visibilidad en IA respecto del sitio (el sitio manda).
- **Pipeline y cola locales** dicen que la llamada con Eduardo es el 22-oct y que la cotización está por enviar. La llamada se hizo y la cotización SPL-COT-2026-017 salió el 23-oct a las 10:44. El pipeline sigue con la fila vieja (no se tocó por encargo).
- **La evaluación del 19-oct** dice que el motor de revisión previa no está en `main`; ya está.
- **Apollo:** una memoria lo da con plan de pago vigente y otro documento lo da de baja el 26-ago.

## Anexo B — Huecos de datos

Primer contacto y ciclo de venta de Bernardo y María; monto y comprobante del primer pago de María; tamaño y sistema de ventas de cualquier cliente o prospecto; resultado de la llamada con Eduardo (22-oct) y de la cotización a Carlos (SPL-COT-2026-016, no está en el repo); resultado de la prueba de 20 abogados; horas reales por proyecto; entrevistas a clientes; tamaño del mercado de empresas con 2-3+ empleados y sistema de ventas; comparables de un diagnóstico pagado de crecimiento en Chile; relación comercial real con SimpleTrust.

## Anexo C — Resultado del Paso 0 (23-oct)

Las 5 preguntas se aplicaron **solo con lo que ya consta** en Gmail y en el repo; nadie fue contactado.

| Conversación | 1. Equipo | 2. Proceso de ventas | 3. CRM | 4. Prospectos regulares | 5. Ventas en 90 días | Lectura |
|---|---|---|---|---|---|---|
| **Eduardo** (Focus Contable / HB Contadores) | Al menos 2 personas en el hilo (Eduardo, Director de Operaciones; Dana en copia). Total: sin dato | Sin dato | Sin dato | Sin dato. Tiene canal de YouTube y 9 servicios; su sitio está sin terminar | Sin dato (firma operativa; ventas no documentadas) | **Sin dato.** La llamada se hizo, pero lo que llegó por correo son notas automáticas de Gemini con el resumen (objetivos web, cliente objetivo, planes), sin respuestas a las 5 preguntas |
| **Carlos Soya** | 1 persona (proyecto personal) | No: la academia aún no existe | No consta; su sitio no tenía medición instalada | Irregular: consultas espontáneas por sus Reels, sin cifra | No: la academia no genera ingresos todavía, y él mismo lo dice | **No encaja** (según sus propios correos) |
| **Bla!** (productora, Vitacura) | 8 personas (pipeline en `main`); tiene Líder Comercial | Sin dato | Sin dato | Sin dato | Sin dato | **Encaje parcial probable, sin dato.** Único contacto por LinkedIn el 28-sep, sin respuesta; no queda rastro en Gmail |
| **Chef & Hotel** | Sin dato | Sin dato | Sin dato | Sin dato | Sin dato | **Sin dato.** Mudo desde el 17-ago; 2 correos sin respuesta (22-sep y 19-oct) |

**Resultado:** de 4 conversaciones vivas, **0 confirmadas como encaje**, 1 claramente fuera (Carlos), 1 parcial (Bla!), 2 sin dato (Eduardo y Chef & Hotel).

**Qué muestra esto:**
1. **El filtro no pudo discriminar porque ninguna conversación trae los datos.** Ni siquiera Eduardo, que tuvo la llamada. Hay que preguntarlas en la llamada y anotarlas.
2. **El pipeline actual no alcanza para la meta de llamadas.** Hay 1 llamada reciente con una empresa de encaje desconocido (Eduardo) y ninguna otra agendada. Las llamadas con empresas que encajan tienen que salir de conversaciones nuevas (la prueba de abogados, referidos de Bernardo y María, consultas entrantes), no de las existentes.
3. **Primer dato de la ruta con revisión gratis:** Eduardo pasó de revisión gratis a cotización de proyecto en unas 20 horas desde la llamada, dentro del plazo de 48 h. La cotización usa el plan Sitio Completo y un pago de 50 % al iniciar y 50 % contra entrega (el 50 % final fraccionable en 2 cuotas), distinto del 30/40/30 de las cotizaciones anteriores. El monto está en el PDF adjunto y no lo leí.

**Cómo preguntarlas en la llamada** (lenguaje natural, una por una):
1. «¿Cuántas personas son hoy en la empresa y quiénes atienden o siguen a los que consultan?»
2. «Cuando alguien consulta, ¿qué pasa después, paso a paso, hasta que compra o se cae?»
3. «¿Dónde anotan quién consultó y en qué va? ¿CRM, planilla, WhatsApp?»
4. «¿Les llegan consultas todas las semanas? ¿Por dónde llegan?»
5. «¿Cuántas ventas cerraron en los últimos tres meses?»

## Fuentes principales

`marketing/evaluacion-captacion-2026-10-19.md`, `ventas/pipeline.md`, `ventas/proyectos-en-curso.md`, `ventas/metricas-ventas.md`, `ventas/cola-calientes.md`, `ventas/enviados/REGISTRO-enviados.csv`, `ventas/lista-exclusion.csv`, `marketing/capacidad-servicios.md`, `marketing/onboarding-cliente.md`, `marketing/decision-pendiente-pivote-webdev-2026-09-27.md`, `marketing/informe-revision-externa-2026-09-27.md`, `marketing/plan-reposicionamiento-2026-08.md`, `marketing/inteligencia-mercado/`, `marketing/motor-revision-previa/`, sitio vivo `spindlelab.cl` (23-oct) y Gmail de `hola@spindlelab.cl` (19 al 22-oct).
