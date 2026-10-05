# Propuesta: automatizar el mini-diagnóstico

**Estado: propuesta, no construida.** Este documento existe para que la idea quede planteada y no se pierda — no es un compromiso ni un plan aprobado.

## Por qué esto ahora

El sitio (rama `redesign`) pasó su promesa de "48 horas" a "menos de 24 horas" a pedido explícito de Ramón (28 jul 2026): *"para una empresa IA es mucho tiempo 48 horas para dejarlo en el gancho. se debe mostrar seriedad y eficiencia."* El hallazgo importante: el proceso interno **ya apunta a 24h** — `.claude/skills/mini-diagnostico/SKILL.md` lo dice explícitamente ("apuntar a 24h — regla sagrada del plan operativo, nunca se rompe"). El cambio de copy en el sitio no es una promesa nueva sin respaldo; alinea el sitio con el estándar que ya se persigue puertas adentro. Lo que sigue manual hoy es lo que puede fallar bajo presión de tiempo o volumen.

## El proceso actual, paso a paso (de qué es rápido vs. qué es el cuello de botella real)

| Paso | Qué hace hoy | ¿Automatizable? |
|---|---|---|
| 1. Auditoría técnica | `curl` + grep sobre el HTML del sitio del prospecto | **Sí, ya es casi un script** — mínimo esfuerzo formalizarlo |
| 2. Visibilidad en IA | Ramón pega manualmente la respuesta real de ChatGPT/Perplexity/Gemini — Claude no puede consultarlos directo | **El cuello de botella real** — ver abajo |
| 3. Señales de confianza | Revisión humana de autoría, prensa, certificaciones | Parcialmente — heurísticas ayudan, el juicio YMYL no debería automatizarse del todo |
| 4. Corrección de mayor impacto | "Síntesis de especialista" — explícitamente el corazón del valor que vende SpindleLab | **No debería automatizarse** — es la razón por la que alguien paga, no un paso de trámite |
| 5. Generar HTML/PDF | Copiar plantilla, reemplazar `[[...]]`, screenshot, exportar PDF | **Sí, scriptable** |
| 6. Checklist + registrar en pipeline | Manual | Ya es rápido, no es el problema |

## Qué se propone (por fases, sin tocar el paso 4)

**Fase 1 — bajo esfuerzo, ya paga la promesa de <24h en la práctica**
Scriptear los pasos 1 y 5: un comando que reciba la URL, corra la auditoría técnica automáticamente, y arme el HTML de la plantilla con los datos ya insertados donde el análisis es puramente técnico (status HTTP, meta description, datos estructurados, etc.). Reduce el trabajo de Ramón al paso 2 (pegar la respuesta de IA) y al paso 4 (la síntesis). Sin costos nuevos, sin infraestructura nueva.

**Fase 2 — resuelve el cuello de botella real**
Integrar las APIs reales de los motores (OpenAI/ChatGPT, Google Gemini, Perplexity) para ejecutar la "pregunta ChatGPT" del prospecto programáticamente, en vez de depender de que Ramón la haga a mano en cada motor. Esto es lo que de verdad permite pasar de "cuando Ramón tenga un hueco" a "en minutos, cualquier hora". Tiene costo real (uso de API) y requiere decidir qué motores priorizar.

**Fase 3 — opcional, más adelante**
Un formulario en el propio sitio donde el prospecto ingresa su URL y dispara el pipeline de las Fases 1-2 automáticamente, en vez de depender de que responda a un email de outbound. Solo tiene sentido una vez que 1 y 2 ya funcionan de forma confiable.

## Lo que esto NO propone

- No propone eliminar la revisión humana antes de entregar — sigue siendo obligatoria por regla de marca ("todo lo público recibe una revisión humana antes de publicar").
- No propone automatizar el paso 4 (la corrección de mayor impacto). Ese es el trabajo de especialista que SpindleLab vende; convertirlo en salida automática de una herramienta contradice el posicionamiento del método completo.
- No es una estimación de tiempo ni de costo — eso requiere que Ramón decida si quiere avanzar y con qué prioridad.
