# Checkpoint §8 — día 77 de 90 · 21-sep-2026

**Quién:** la troncal (Tomás). **Por qué ahora:** el plan de 90 días vence el **5-oct**, en 14
días. Al día 60 (4-sep) se incumplió casi todo y **no se activó ninguno de los cortes escritos
en §8**. Este documento los corre con los datos reales y deja la decisión lista para Ramón.

> **Regla de este documento:** cada cifra lleva su fuente y el comando con que se obtuvo.
> Lo que no se pudo verificar desde esta sesión se marca ⚠️ y se dice quién puede verificarlo.
> Ningún corte se ejecuta acá: apagar gasto es decisión de Ramón.

---

## 1 · El panel, hoy (día 77)

| Métrica §8 | Umbral | Real hoy | Estado | Fuente |
|---|---|---|---|---|
| Respuesta a outbound | ≥ 3 % (día 30) | **4,9 %** (7/142) | 🟢 Cumple | conteo directo sobre `ventas/enviados/REGISTRO-enviados.csv` |
| Mini-diagnósticos entregados | ≥ 5 (día 30) | **3 producidos**, 2 confirmados enviados | 🔴 Incumplido hace 47 días | `marketing/diagnosticos/` (3 carpetas) |
| Llamadas realizadas | ≥ 3 (día 30) | **0 registradas** ⚠️ hubo 1 agendada el 11-sep (Legal Prisma) sin registro de resultado | 🔴 Incumplido | `ventas/metricas-ventas.md` + ausencia de registro |
| Clientes cerrados | 1 al día 45 · 1–2 al día 60 | **1** (Bernardo, $512.000) — por contacto directo, no del funnel | 🟡 Cumple la letra, no el fondo | `ventas/proyectos-en-curso.md` |
| Menciones en IA | ≥ 1 al día 90 | **0/45** (mes 1) | 🔴 Tendencia en cero | `marketing/metricas/test-menciones-ia.md` |
| Tráfico orgánico (GSC) | ascendente | sin dato | ⚪ | no accesible desde el repo |

**Plan operativo:** 20 casillas hechas, 4 en curso, **34 pendientes**. Las semanas 9 a 13
están casi enteras sin marcar.

---

## 2 · El dato nuevo que decide el §8: el nicho

§8 prescribe, cuando los mini-diagnósticos están bajo umbral: *«el problema es volumen o
segmento → evaluar nicho B como principal»*. Nunca se corrió ese desglose. Corrido hoy:

| Nicho | Enviados | Respuestas | Tasa | Rebotes | Rechazos |
|---|---|---|---|---|---|
| **Abogados** | 69 | **4** | **5,8 %** | 0 | 0 |
| **Salud** (dental/estética/médico) | 72 | **1** | **1,4 %** | 3 | 1 |
| Media/Turismo | 1 | 1 | — (muestra de 1) | 0 | 0 |

**Mismo volumen, cuatro veces la tasa.** Salud además concentra el 100 % de los rebotes y el
único rechazo explícito. Y las 5 conversaciones vivas más calientes (incluida Legal Prisma)
son de Abogados. La estrategia tenía a Abogados en «lista de espera» (§ nichos); los datos lo
ascienden a principal.

Concuerda con lo ya sabido: Apollo está agotado para clínicas chicas, mientras Abogados está
validado con 4.522 contactos y ~100 % de verificación.

---

## 3 · Los cortes que corresponde activar

### CORTE 1 — Google Ads ✅ VERIFICADO EN LA CUENTA (21-sep, después de la aprobación)
Ramón aprobó apagar. **Al entrar a la cuenta 597-527-6690 resultó que no había nada que apagar,
y el motivo cambia la conclusión.**

**Los números reales de la campaña «Campaign #1» (Búsqueda):**

| Dato | Valor real | Lo que decía el repo |
|---|---|---|
| Estado | **Detenida** | «activa» |
| Presupuesto | **CLP 3.000/día** | CLP 1.500/día (la mitad) |
| Costo total | **CLP 100.411** | estimado ~$103.500 (coincide por casualidad: doble presupuesto, la mitad de días) |
| Impresiones | 648 | — |
| Clics | **104** | — |
| **CTR** | **16,05 %** | — |
| **Conversiones** | **0,00** | 0 (confirmado) |

**Por qué está detenida, y esto importa:** Google la frenó con el aviso *«No se están publicando
sus anuncios. Para reanudar la publicación, verifique su forma de pago.»* No se detuvo por
decisión: se detuvo sola, alrededor del 24-ago (última fecha con datos). **Es el mismo pendiente
que el plan operativo arrastra sin resolver desde el 20-jul** («confirmar método de pago… y
verificación de correo de la cuenta publicitaria»).

**El hallazgo que vale más que el corte:** un **CTR de 16,05 %** es excepcional en Búsqueda
(lo normal ronda 3-5 %). El anuncio y las keywords funcionaban muy bien. **104 personas de alta
intención llegaron al sitio y ninguna dejó sus datos.** No es que Ads no sirva: es que el
tráfico llegó y el sitio no convirtió.

**Tercera fuente independiente que apunta al mismo lugar.** El outbound cumple su umbral de
respuesta y se cae después; Ads trae clics con CTR excelente y convierte cero. El cuello no está
en generar demanda, está donde el visitante tiene que dar el paso.

**Qué corresponde ahora (cambia respecto de «apagar»):**
1. **No reactivar.** Concretamente: **no arreglar la forma de pago** hasta que la conversión del
   sitio esté resuelta. Reactivarla hoy sería volver a comprar clics que ya sabemos que no
   convierten.
2. **Dejarla detenida, no borrarla.** La configuración costó trabajo y el CTR demuestra que la
   parte de captación está bien resuelta. Cuando la conversión funcione, esto se reenciende con
   ventaja.
3. **Corregir el repo:** el presupuesto real era el doble del documentado.

### CORTE 2 — Frente EE.UU.: cerrar formalmente
- **Criterio escrito** (`marketing/frente-eeuu/fundamento-frente-eeuu.md`): ventana de
  **4 semanas desde el primer Loom enviado**; ≥20 video-audits → ≥2 discovery calls.
- **La ventana nunca empezó: no se envió ni un Loom.** El frente tiene un único archivo, el
  documento de fundamento, fechado el 20-ago.
- **Y ni siquiera estaba en el repositorio:** vivía completo en un worktree gitignoreado
  (`.claude/worktrees/elastic-thompson-3a8ffd/`). Rescatado a `main` en este mismo commit —
  el fundamento, la skill `persona-frente-eeuu` y la memoria de Sam.
- **Esto no es «el frente no rindió», es «el frente no se ejecutó».** No hay nada que medir.
- **Recomendación:** cerrar con fecha y motivo escrito («abierto 4-ago, cero ejecución, cerrado
  21-sep»), y conservar el fundamento como material si se retoma con método. Reabrirlo exige
  primer Loom enviado en la misma semana, o no se abre.

### CORTE 3 — Nicho Salud: pausar · Abogados pasa a principal
- Es la acción que §8 prescribe literalmente para el incumplimiento de mini-diagnósticos.
- **Recomendación:** no enviar más lotes a Salud hasta tener una hipótesis nueva de por qué no
  responde (segmento, gancho o lista). Todo el volumen disponible va a Abogados, que ya tiene
  lista validada.
- Las conversaciones de Salud que siguen vivas (Dentimagen) no se abandonan: se cierran.

### CORTE 4 — el que NO corresponde activar: subir el outbound
La regla de capacidad diría 50/semana con 0 clientes activos. **No aplica como remedio:** la
tasa de respuesta cumple el umbral, y el corte del embudo está aguas abajo (0 llamadas). Subir
volumen es responder con más entrada a un problema de salida, y contradice la prescripción de
§8 para llamadas en cero (*revisar si el mini-diagnóstico cierra con puente claro a la
llamada*).

---

## 4 · Lo que hay que decidir antes del 5-oct

Cinco decisiones. Las tres primeras son los cortes de arriba; las dos últimas son las que
definen si hay trimestre 2 con rumbo o se repite el patrón.

1. ~~**Google Ads:** ¿se apaga?~~ **RESUELTO el 21-sep:** ya estaba detenida por forma de pago. La decisión viva pasa a ser **no reactivarla** hasta que la conversión del sitio funcione.
2. **Frente EE.UU.:** ¿se cierra formalmente?
3. **Nicho:** ¿Abogados pasa a principal y Salud se pausa?
4. **El producto recurrente:** el acompañamiento mensual **no se ha vendido nunca**. Es el
   único ingreso que compone. ¿Entra como objetivo explícito del trimestre 2, o se acepta que
   el negocio es por proyecto? Antes de venderlo hace falta resolver el techo técnico:
   `marketing/capacidad-servicios.md` marca ❌ el monitoreo de menciones en IA («no escala más
   allá de 1-2 clientes»).
5. **Verifica y Cumple vs. el core:** la ventana se cierra el **1-dic** y compite por las mismas
   horas que el trimestre 2. ¿Es el frente principal hasta diciembre, o una línea secundaria
   con tope de horas declarado? Decidirlo evita que sea el sexto frente abierto sin corte.

**El riesgo de fondo, dicho por Ramón y confirmado por los archivos:** cada vez que una métrica
se pone en rojo se abre un frente nuevo en vez de aplicar el criterio de corte ya escrito. Pasó
el 4-ago (EE.UU.) y el 3-sep (laboratorio). Los criterios existen y son buenos; lo que falla es
la ejecución del corte. **Por eso este checkpoint termina en decisiones numeradas y no en un
plan nuevo.**

---

## 5 · Lo que esta sesión dejó corregido

- `ventas/pipeline.md`: la fila de Bernardo decía «$235.200 pendientes». Está **pagado al
  100 %**, ticket real **$512.000**. Corregido (`proyectos-en-curso.md` ya lo tenía bien;
  el pipeline se había quedado atrás).
- `marketing/frente-eeuu/` + `.claude/skills/persona-frente-eeuu/` + memoria de Sam:
  rescatados del worktree gitignoreado a `main`.

## 6 · Discrepancia detectada, sin resolver

El pulso del 4-sep dice *«excluyendo el rechazo de bhabogados»*, pero el CSV registra
**bhabogados.cl como RESPONDIO - activo** y **clinicahunza.cl como RECHAZADO (28-ago)**. Uno de
los dos está mal. Importa porque bhabogados sería una sexta conversación viva. **Se resuelve con
el correo, no con los archivos** — va en la lista de preguntas.
