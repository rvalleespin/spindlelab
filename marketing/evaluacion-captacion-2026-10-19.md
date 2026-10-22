# Evaluación de captación — 19-oct-2026 (día 104 del plan)

> **Autor:** Tomás (troncal). **Origen:** pedido de Ramón ("no he tenido clientes nuevos desde septiembre").
> **Método:** barrido de 7 lectores sobre el repo y Gmail, síntesis independiente, 5 estrategias
> competidoras y jurado de 3 lentes. Luego el troncal **verificó contra git y Gmail** los hechos que
> más pesan en la conclusión. Esta página separa lo verificado de lo que viene sin re-chequear.
> **No modifica `pipeline.md` ni `plan-operativo-90-dias.md`.** Registrar lo de abajo ahí requiere el OK de Ramón.

## 1. Dónde estamos (hechos)

**Verificados por el troncal (git y Gmail, 19-oct):**
- `ventas/pipeline.md` y `ventas/proyectos-en-curso.md`: último commit el **26-sep**. Llevan 23 días sin tocarse.
- `ventas/enviados/REGISTRO-enviados.csv`: **142 filas**, último commit el 22-sep. Después de eso se enviaron decenas de correos que no están registrados.
- `ventas/objeciones-y-perdidas.md`: el **registro de pérdidas está vacío** (solo la sección de guiones tiene contenido). Sigue citando los precios viejos ($350k/$500k).
- El trabajo del Motor de revisión previa (commit `3c9056a9`) vive en `origin/claude/motor-revision-previa-build` y **no está en `main`**.
- Dos clientes en toda la historia, los dos de Desarrollo Web: Bernardo Combeau (contacto directo) y María Loreto (referida por Bernardo, 26-sep). Del funnel SEO/AEO, que es lo que la agencia dice vender: **142 correos fríos, 0 clientes**.

**Vienen del barrido, sin re-chequear:** respuesta fría 4,9% (7/142), abogados 5,8% sin rebotes; 336 hilos con segundo toque → 14 respuestas, ~4-5 de interés real; Google Ads $100.411 CLP, 104 clics, CTR 16,05%, 0 conversiones, detenida desde el 24-ago; cuenta Meta de la agencia sin campañas; Instagram sin publicar 43 días; campaña de Verifica y Cumple (31 correos el 14-oct, 27 el 13-oct) con 0 entradas al pipeline y varios "no me escriba más" (**matiz de Ramón, 19-oct:** no es una campaña solo de cookies; la sesión del Motor cuenta los hallazgos de cada página y ofrece un servicio concreto, y suma el incumplimiento de Verifica y Cumple como gancho cuando el sitio no cumple); inbound en 90 días: 0.

## 2. Corrección al barrido (importante)

El workflow afirmó que **legalprisma** "ofreció hora el 6-sep y el hilo muere sin respuesta nuestra". **Es falso.** Gmail muestra:
- 6-sep: Sebastián ofrece el miércoles 17:00. Ramón confirma el 7-sep con enlace de Meet.
- 8-sep: Sebastián rechaza la invitación (reunión con cliente) y propone el viernes 10:00. Ramón confirma.
- 11-sep: Sebastián cancela por una emergencia con sus socios y dice que coordinará una nueva fecha.
- 22-sep: Ramón lo retoma ("¿te sirve esta semana?"). **Sin respuesta desde entonces (27 días).**

El hilo no murió porque nadie respondiera. Murió porque el prospecto canceló y no volvió, y se hizo un solo seguimiento. La fricción de agenda sí existió (la invitación llegó duplicada), pero el argumento "el link de reserva lo habría salvado" queda más débil de lo que decía la estrategia.

## 3. Conversaciones vivas que los documentos no reflejan

| Quién | Qué hay | Estado verificado | Pelota |
|---|---|---|---|
| **Carlos (srsoya.com)** | "Plan Arranque" $200.000/mes por 3 meses. El 21-sep Carlos propuso reestructurar a un programa propio de acompañamiento; el 28-sep Ramón le respondió largo y le dejó **dos preguntas** (partir en Chile y mover EE.UU. al mes 2; precio en dólares). | Último mensaje es nuestro, del 28-sep. **No hay respuesta ni evidencia del depósito del 12-oct.** No está en `pipeline.md`. | De Carlos, hace 21 días |
| **Eduardo (focuscontable.cl)** | Pidió el diagnóstico (1-oct), lo recibió (2-oct). El 13-oct Ramón pidió 20 min. | Sin respuesta, 6 días | De Eduardo |
| **legalprisma** | Ver sección 2 | Sin respuesta desde el 22-sep | De Sebastián |
| **Chef & Hotel** | Llamada 14-ago, propuesta 15-ago | 42+ días mudo, nunca cerrado | Cerrar o último toque |
| **María Loreto (Módulo 369)** | Ganada el 26-sep, Sitio Completo | **Ramón confirmó el 19-oct que el primer pago está cobrado y en orden.** | En entrega | Ramón (entrega) |

## 4. Diagnóstico

El embudo no se rompe arriba. Se rompe **después de que alguien responde**, en el tramo que no se puede delegar a un agente: llamada, propuesta, cierre. Nadie es dueño de los estados "entregable enviado, sin respuesta" ni "llamada ofrecida o cancelada". Además, el copiloto excluye por diseño los hilos donde el prospecto ya respondió, que son los más calientes.

El diagnóstico de septiembre (21, 22 y 27-sep) ya decía esto, con orden seguimiento → conversión → techo técnico y plazo al 5-oct. **No se ejecutó.** Octubre repitió el patrón que el propio diagnóstico nombra: cuando una métrica se pone roja se abre un frente nuevo (Verifica y Cumple, Motor, verticales) en vez de aplicar el corte escrito. El frente EE.UU. que se abrió el 4-ago nunca salió del día 0.

## 5. Estrategia (ajustada con lo que Ramón aclaró el 19-oct)

**Ganadora: conversión y seguimiento humano** (primera en 2 de 3 lentes; la tercera la puso segunda y le injertó sus piezas).

1. **Rescate de las conversaciones vivas esta semana**, antes de cualquier outbound nuevo: Carlos, Eduardo, legalprisma y Chef & Hotel. Los cuatro correos de reencuentro se prepararon el 19-oct. **Ramón ya envió los de Carlos (12:20), legalprisma y Chef & Hotel (12:41, hora Chile)**; el de Eduardo salió a las 14:07 y **él ya respondió a las 15:02** (ver sección 7). Cada uno retoma la historia y pregunta si se retoma o en qué está el tema. A Eduardo y a legalprisma se les suma un dato nuevo **verificado hoy**.
2. **Un dueño del tramo caliente.** Raquel compila cada mañana, desde Gmail, la lista de calientes con próximo paso y fecha (`ventas/cola-calientes.md`). Ramón decide en 10 minutos. Regla: ningún caliente pasa 48 h sin un toque humano o sin decisión de Perdido. Falta corregir el copiloto para que **no excluya** los hilos ya respondidos.
3. **Referidos como paso fijo del proceso de Desarrollo Web** (kickoff, entrega, pago). Es el único canal que cerró en septiembre y cuesta casi cero. *(El permiso de caso público de Bernardo ya está concedido y en uso en el sitio nuevo; no se vuelve a plantear.)*
4. **Llenar el registro de pérdidas** con motivo estandarizado, solo con lo verificado en Gmail.
5. **El outbound en curso se mantiene.** La sesión del Motor cuenta hallazgos por página y ofrece un servicio concreto; Verifica y Cumple entra como gancho cuando el sitio no cumple. No se pausa nada. Única sugerencia: anotar para cada respuesta qué gancho la trajo (hallazgo técnico o Verifica y Cumple), para saber cuál convierte en conversación.
6. **La prueba del pivote hacia Desarrollo Web ya está en marcha** en esa sesión (entrar por el problema técnico del sitio). Falta solo medirla.

**Dejar de hacer:** abrir frentes nuevos mientras haya calientes sin trabajar; Fiverr (sin una sola señal); mantener `REGISTRO-enviados.csv` como fuente de verdad (la verdad vive en Gmail). El frente EE.UU. quedó **cerrado** el 19-oct.

## 6. Medición y corte (estilo §8)

- **KPI guardián semanal:** 0 calientes con más de 48 h sin toque humano registrado.
- **Al 19-nov:** ≥3 llamadas de venta sostenidas.
- **Al 3-dic:** ≥1 cliente nuevo cerrado desde calientes o referidos.
- **Corte:** si al 19-nov hay 0 llamadas pese a correr el ritual todos los días hábiles, el problema no es la mecánica de conversión sino la falta de leads calientes. Solo entonces se reabre la parte alta del embudo. Mientras haya calientes sin trabajar, el corte **no autoriza abrir un frente nuevo**.

## 7. Decisiones del 19-oct y correcciones de Ramón

**Tomadas y aplicadas:** frente EE.UU. cerrado; estrategia de conversión y seguimiento aplicada; Carlos, Eduardo y legalprisma registrados en `ventas/pipeline.md`.

**Correcciones de Ramón a la primera versión de esta evaluación** (ya reflejadas arriba):
- **Verifica y Cumple no se toca.** Corre en paralelo con la sesión del Motor, que cuenta los hallazgos de cada página y ofrece un servicio concreto. El incumplimiento de Verifica y Cumple es gancho adicional. La recomendación de pausarlo se retira.
- **Los cobros de María Loreto están hechos** (primer pago confirmado). Se retira el aviso de «confirmar en el banco».
- **El permiso de caso público de Bernardo está concedido** y se usa en el sitio nuevo. Se retira el pedido. Ya figuraba en la memoria de la oficina desde el 22-sep y no debió volver a plantearse.

**Pendiente de Ramón:** **Eduardo respondió** (19-oct, 15:02 hora Chile): propone reunirse el miércoles 21 a las 12:00 o más tarde y quiere cotizar mejoras de su sitio. Ramón le respondió a las 15:46 confirmando esa hora; falta mandarle el enlace de Meet. Los correos a Carlos, legalprisma y Chef & Hotel salieron el 19-oct; Carlos dijo que escribiría el 20-oct. Sin confirmar: si el depósito de Carlos del 12-oct llegó.
