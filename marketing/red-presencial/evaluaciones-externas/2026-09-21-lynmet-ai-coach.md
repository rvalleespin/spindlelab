# Evaluación externa — LynMet "AI Coach de negocio" (21-sep-2026)

**Qué es:** coach de IA de la plataforma LynMet (lynmet.com), conocida a través del Hub
Metropolitano. Formulario de 5 preguntas y un informe automático. Costó **10 tokens** de los 40
del plan gratuito (quedan 30). Sesión guardada en el Dashboard como "SpindleLab es una consultora
chilena — Seed".

**Cómo se respondió:** las 5 respuestas las redactó Claude Code y las pegó Ramón a mano (la
sesión tiene bloqueada la escritura en sitios de terceros). ⚠️ **La respuesta 4 (proyecciones)
que alcanzó a entrar era la versión optimista**, con una rampa a 7 acompañamientos mensuales. La
corrección, que declara el techo real de 1-2 clientes, llegó después de ejecutar. **El informe de
abajo evalúa un negocio que no es exactamente el que existe.**

⚠️ **Captura parcial.** El botón "Exportar" solo vive en la pantalla de resultados y se perdió al
abrir una sesión nueva. Esto se transcribió de la pantalla: las puntuaciones, el análisis y las
recomendaciones 4 y 5 están completos; **las recomendaciones 1, 2 y 3 quedaron cortadas** donde
dice `[...]`.

---

## Puntuación: 68/100 — "Preparación para Inversores"

> ⚠️ El marco es inversión y Ramón declaró explícitamente que no busca levantar capital. El
> titular no aplica; el desglose sí sirve.

| Categoría | Nota | Comentario del informe |
|---|---|---|
| Propuesta de Valor | 16/20 | "clara, centrada en IA y visibilidad integral; sin embargo, carece de métricas de éxito comprobadas que ayuden a demostrar su efectividad al cliente potencial." |
| Modelo de Negocio | 14/20 | "el modelo basado en servicios recurrentes y proyectos puntuales es sólido, aunque la dependencia del fundador y la falta de ingresos recurrentes suficientes presenta un riesgo." |
| Estrategia de Mercado | 13/20 | "bien formulada con un enfoque en outbound bien segmentado, pero hay una alta dependencia en técnicas de prospección activa que limita el escalamiento sin más personal o herramientas automatizadas." |
| Capacidad de Ejecución | **12/20** | "la fuerte dependencia del fundador es un cuello de botella significativo; delegar y automatizar ciertos procesos es crítico para la sostenibilidad a largo plazo." |
| Finanzas y Proyecciones | 13/20 | "razonables pero ambiciosas. Falta un historial financiero y la sobre-dependencia en el solo fundador puede ser problemático si las estimaciones no se cumplen." |

## Análisis de negocio (texto del informe)

> SpindleLab presenta un modelo de negocio innovador dentro del mercado chileno de marketing
> digital con un enfoque fuerte en IA. Su propuesta de valor se centra en la integración de
> servicios de visibilidad SEO, desarrollo web, gestión de redes sociales y Google Ads,
> combinados con un enfoque en visibilidad en buscadores y motores de IA. Esto diferencia su
> oferta al no depender exclusivamente de los costos de publicidad continua. Sin embargo, existen
> desafíos significativos. Uno de los principales es la falta de casos de éxito documentados y
> publicables, lo que resulta indispensable para demostrar eficacia y generar confianza en un
> mercado que todavía no está claramente definido y donde el cliente carece de puntos claros de
> comparación. El control unipersonal del negocio también limita la capacidad de expansión y
> atención. El modelo operativo actual, aunque eficiente en términos de costos, necesita
> evolucionar hacia un sistema más robusto para manejar un mayor volumen de clientes sin
> desgastar al fundador. Además, la dependencia actual en el outbound frío sugiere una
> vulnerabilidad que podría mitigarse mediante el fortalecimiento del inbound marketing y la
> optimización de procesos internos, como la automatización del diagnóstico gratuito.

## Recomendaciones

1. **ALTA — Desarrollar y publicar casos de éxito.** "Conseguir testimonios de tres clientes con
   resultados medibles y documentar esos casos como pruebas `[...]`"
2. **ALTA — Optimizar el proceso de diagnóstico gratuito.** "Automatizar el análisis y envío del
   diagnóstico básico a través del sitio web para ahorrar tiempo. C`[...]`"
3. **MEDIA — Diversificar canal de prospección.** "Aumentar la eficiencia del inbound marketing
   preparando contenido valioso que atraiga a prospectos d`[...]`"
4. **MEDIA — Incrementar el valor por cliente.** "Desarrollar ofertas que incrementen el ticket
   promedio, como un plan Pro adaptado a clientes existentes o la integración de servicios
   adicionales muy demandados por pymes. Evaluar cross-selling con servicios complementarios a
   los actuales clientes también."
5. **BAJA — Buscar alianzas estratégicas.** "Formalizar asociaciones estratégicas con empresas de
   servicios complementarios como agencias de contenido, diseño y video para aumentar la
   capacidad operativa. Esto permitirá ofrecer servicios más completos, atraer proyectos de mayor
   envergadura, y fortalecer la oferta conjunta sin incurrir en altos costos fijos."

---

# Contra-lectura (Claude Code, 21-sep-2026)

## Hechos verificados en el repo, que el informe no tuvo

Leídos directamente de los archivos, no inferidos:

1. **El outbound se detuvo.** `ventas/enviados/REGISTRO-enviados.csv`: los 142 primeros toques
   son **todos de agosto 2026**, cero en septiembre. De ellos: 132 sin respuesta, 6 "RESPONDIO -
   activo", 1 rechazado, 3 rebotes, **0 cierres**.
2. **El techo documentado son 2 clientes, no 7.** `marketing/capacidad-servicios.md` marca ❌ la
   línea base de presencia en motores de IA: *"No escala más allá de 1-2 clientes en
   acompañamiento mensual sin resolver esto"*. También ❌ la implementación priorizada (no está
   definido cómo SpindleLab accede al sitio del cliente) y ❌ el monitoreo quincenal.
   `marketing/estrategia-marketing-spindlelab.md` §7: *"la capacidad sigue siendo 1-2 clientes"*.
3. **Ritmo real de diagnósticos:** 3 en once semanas (`marketing/diagnosticos/`), no 10 al mes.
4. **Cero acompañamientos mensuales activos.** El único proyecto ganado y entregado es un sitio
   web de $392.000.

## Dónde el informe acierta

- **Capacidad de Ejecución como nota más baja.** Llegó ahí sin ver un solo archivo. Tres agentes
  críticos que sí leyeron el repo aterrizaron en el mismo cuello de botella por otro camino. Dos
  análisis independientes convergiendo es señal.
- **Casos de éxito como obstáculo #1.** Correcto, y peor de lo que el informe cree: hay **dos
  casos gratis sin reclamar**. A Bernardo Combeau nunca se le pidió permiso de caso público pese
  al acuerdo de pedirlo desde el día 1, y la solicitud de testimonio a SimpleTrust
  (`marketing/plantillas/solicitud-testimonio-simpletrust.md`) sigue sin enviarse.
- **Automatizar el diagnóstico gratuito.** Coincide con la corrección al embudo: el chequeo
  automático de 21 señales pasa a ser el techo, el diagnóstico manual solo para quien ya agendó.

## Dónde el informe falla

- **No ve el techo real.** Habla de "dependencia del fundador" en abstracto. Lo concreto es que
  la promesa central del producto recurrente es un paso manual no escalable y que no hay modelo
  de acceso al sitio del cliente. No lo vio porque la respuesta 4 era la versión optimista.
- **Invierte el orden de la prospección.** Pone inbound en prioridad MEDIA. El inbound tarda
  meses; el outbound, que produjo las únicas 6 conversaciones, lleva apagado desde el 31 de
  agosto. Construir inbound con el outbound detenido cambia un canal lento por ninguno.
- **El marco de inversión no aplica.** 68/100 mide preparación para levantar capital, que Ramón
  descartó explícitamente en la respuesta 5.

## Orden de prioridades — CORREGIDO 21-sep tras contra-lectura adversarial

> ⚠️ **La primera versión de esta sección estaba equivocada** y se deja anotado el error porque
> es instructivo. Decía: (1) pedir dos permisos de caso, (2) **reactivar el outbound**, (3)
> resolver las dependencias técnicas. Dos agentes adversariales lo refutaron y la verificación en
> el repo les dio la razón.

**Lo que estaba mal, con evidencia:**

1. **El embudo no gotea arriba, gotea al medio.** `marketing/metricas/pulso-2026-09-04.md`: tasa
   de respuesta **4,9 % (7/142), 🟢 cumple** el umbral de ≥3 %. En rojo están **2
   mini-diagnósticos confirmados** (meta ≥5) y **0 llamadas realizadas** (meta ≥3). El propio
   pulso concluye que "el motor de generación de demanda está roto en el tramo medio" y que §8
   prescribe *revisar si el mini-diagnóstico cierra con puente claro a la llamada*, no subir
   volumen. Recomendar "reactivar outbound" era responder con volumen a un problema de conversión.
2. **La semana sin envíos era una pausa planificada, no un colapso.**
   `marketing/calendario-editorial.md`: *"Semana 11 (15–21 sep): VETADA, Fiestas Patrias. Cero
   publicaciones, cero lotes, cero envíos."*
3. **Ya existe un caso publicable que no depende de permisos ajenos:**
   `ventas/casos-de-exito/verifica-y-cumple.md`, con antes/después medido y verificado contra el
   texto oficial de la Ley 21.719.
4. ~~**Bernardo tiene $235.200 sin cobrar.**~~ **Desmentido por Ramón el 21-sep: ya está
   cobrado**, el proyecto quedó pagado al 100% y además el cliente pidió una sección extra que ya
   se entregó. `ventas/proyectos-en-curso.md` estaba desactualizado y ya se corrigió. La
   conversación de permiso de caso público está despejada, y el caso vale más de lo que parecía:
   un cliente que pagó, recibió y volvió a pedir.

**Orden vigente:**

1. **Cerrar lo abierto.** Legal Prisma: reunión el 11-sep con propuesta comprometida para el
   lunes 14, **sin registro de resultado en el repo**. Chef&Hotel: pidió agendar el 17-ago y
   quedó 14 días sin retomar (`ventas/enviados/reportes/reporte-2026-08-31.md`). Son las únicas
   oportunidades calientes existentes.
2. **Arreglar el puente diagnóstico → llamada**, que es lo que §8 manda con las llamadas en cero.
3. **Reanudar outbound el 22-sep** con el canon ya definido (10/día, tope 50/sem, 3 toques). No
   requiere decisión: ya estaba planificado tras la ventana vetada.
4. **Publicar el caso propio que ya existe** y pedirle a Bernardo el permiso de caso público, que ya no tiene nada que lo bloquee.
5. **Automatizar el diagnóstico** (`marketing/propuesta-automatizacion-mini-diagnostico.md`), que
   es lo que levanta el techo de 1-2 clientes. Crédito al informe: su recomendación ALTA #2
   apuntaba exactamente a este nodo, y la contra-lectura inicial la despachó como genérica.

---

# Segunda corrida — 21-sep-2026, 13:53 (con datos reales)

Se rehizo la sesión completa con las 5 respuestas corregidas: base de partida sin maquillaje
(cero acompañamientos activos, embudo con 4,9 % de respuesta y cero llamadas), el techo de 1-2
clientes declarado, el ticket real de $512.000 del proyecto de desarrollo web, las dos fechas de
corte (5-oct y 1-dic) y el patrón de abrir frentes nuevos. Costó otros 10 tokens (quedan 20).

## Puntuación: 65/100 (bajó 3 puntos)

| Categoría | Nota | Comentario |
|---|---|---|
| Propuesta de valor | 15/20 | "sólida pero no completamente implementada. Los casos de éxito publicables fortalecerían la oferta." |
| Estrategia comercial | 13/20 | "necesita mejoras en el seguimiento de ventas y conversión de leads. El CRM propuesto puede potenciar esta área." |
| Capacidad operativa | **11/20** | "operación limitada por gestión manual y falta de automatización. Priorizar desarrollo de soluciones tecnológicas." |
| Finanzas y escalabilidad | 13/20 | "la dependencia de recursos personales limita la escalabilidad. Ingresos recurrentes deben asegurarse para estabilidad financiera." |
| Preparación de mercado | 13/20 | "segmentación bien definida, pero falta penetración más eficiente en el mercado objetivo y creación de credibilidad." |

Del análisis: *"la principal debilidad radica en la ausencia de un seguimiento adecuado a las
oportunidades de venta, lo cual representa una barrera crítica"*. Y sobre la segunda marca:
*"una oportunidad única… pero su ventana de implementación está restringida temporalmente, lo que
exige una acción decisiva y bien coordinada antes de la fecha de vigencia de la Ley 21.719."*

## Recomendaciones

1. **ALTA — Mejora del seguimiento de ventas.** "Implementar un sistema de gestión de relaciones
   con clientes (CRM) para el seguimiento automatizado de interacciones y procesos de ventas.
   Realizar revisiones semanales del embudo de ventas para asegurar que todas las oportunidades
   están siendo gestionadas efectivamente."
2. **ALTA — Automatización de monitoreo de IA.** "Desarrollar herramientas tecnológicas que
   permitan el monitoreo automatizado de menciones en IA para `[...]`"
3. **ALTA — Optimización del proceso de conversión.** "Revisar estrategias para convertir
   respuestas en llamadas agendadas, por ejemplo, mejorando los guio`[...]`"
4. **MEDIA — Desarrollo de casos de éxito publicables.** (bajó de ALTA)
5. **MEDIA — Foco en el mercado de Verifica y Cumple.** "Dedicarse intensamente al cierre de
   oportunidades en el mercado de Verifica y Cumple, priorizando la `[...]`"

---

# Comparación de las dos corridas

| Primera (datos optimistas) | Segunda (datos reales) |
|---|---|
| 68/100 | **65/100** |
| ALTA Publicar casos de éxito | **ALTA Mejorar el seguimiento de ventas** (CRM + revisión semanal) |
| ALTA Automatizar el diagnóstico gratuito | **ALTA Automatizar el monitoreo de menciones en IA** |
| MEDIA Diversificar prospección con inbound | **ALTA Optimizar la conversión de respuesta a llamada** |
| MEDIA Subir el valor por cliente | MEDIA Casos de éxito (bajó de ALTA) |
| BAJA Alianzas estratégicas | MEDIA Foco en Verifica y Cumple antes del 1-dic |

**La lección del ejercicio: el puntaje bajó y el diagnóstico mejoró.** Los tres ALTA de la
segunda corrida son exactamente los tres cuellos verificados en el repo, y la primera corrida no
mencionó ninguno. También desapareció el consejo de "haz inbound", que era el que estaba
invertido: lo mató el dato de que la tasa de respuesta cumple umbral. Capacidad operativa bajó de
12 a 11 y sigue siendo la nota más baja en ambas.

**El puntaje agregado no sirve en ninguna de las dos.** Mide preparación para levantar capital,
que Ramón descartó explícitamente. Lo que sirve es el ranking de notas y las recomendaciones.

## Dónde Claude discrepa de la segunda corrida

Bajar casos de éxito a MEDIA. Probablemente lo bajó al leer la ampliación pagada de $120.000 como
prueba suficiente. No lo es: sigue sin haber un caso con antes y después **medido**, y en una
categoría sin puntos de comparación eso es lo que reemplaza la discusión de precio. El caso propio
(`ventas/casos-de-exito/verifica-y-cumple.md`) ya está documentado y no depende de permisos.

## Lo que se le declaró y no tomó

El patrón de abrir un frente nuevo cada vez que una métrica se pone en rojo, y la fecha del
5-oct en que vence el plan de 90 días. Ambos se declararon explícitamente y no aparecen en
ninguna recomendación. **Diagnostica el negocio, no la disciplina de quien lo opera.** Para eso
no sirve, y conviene no volver a gastar tokens esperando que lo haga.

## Convergencia

El coach, los agentes críticos y los archivos del repo ahora coinciden en el mismo orden:
**seguimiento → conversión → techo técnico.** Con tres fuentes independientes apuntando al mismo
lugar, la discusión sobre qué arreglar está cerrada.

Detalle práctico: **el CRM que recomienda ya existe.** `ventas/pipeline.md` tiene las etapas
definidas y está congelado desde el 23-jul con una sola fila. No falta herramienta, falta usarla:
meter ahí las 6 conversaciones abiertas, empezando por Legal Prisma y Chef&Hotel.

**Estado:** quedan 20 tokens. El "Mapa Estratégico" (siguiente escalón de pago de la plataforma)
recién ahora partiría de un análisis con datos reales, si alguna vez se decide gastarlos.
