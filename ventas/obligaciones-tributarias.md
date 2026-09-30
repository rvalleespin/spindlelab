# Obligaciones tributarias — SpindleLab SpA + Ramón persona natural

> **Qué es esto.** El mapa operativo de lo que hay que declarar, cuándo, y quién lo hace.
> Existe porque hay dos contribuyentes vivos al mismo tiempo (la SpA y Ramón como persona
> natural) y porque la obligación de declarar **no depende de que entre plata**: una empresa
> con inicio de actividades vigente declara todos los meses, aunque el resultado sea $0.
>
> **Advertencia que no se borra.** Esto lo escribió una sesión de Claude Code, no un contador.
> Sirve para saber qué preguntar, qué fecha mirar y qué no dejar pasar. **Cada cifra y cada
> plazo los confirma el contador o el propio SII antes de actuar.** Donde hay fuente, está
> linkeada; donde no hay certeza, está marcado como pendiente de confirmar.
>
> Última actualización: 2026-09-30. Dueño del documento: **Monse (`agente-finanzas`)** — hoy
> vacante, así que lo mantiene quien toque el tema.

---

## 1. Los dos contribuyentes

| | **SpindleLab SpA** | **Ramón, persona natural** |
|---|---|---|
| RUT | 78.474.925-8 | el personal |
| Existe desde | **24-jul-2026** (constitución) | siempre |
| Documento que emite | Factura electrónica (afecta a IVA 19 %) | Boleta de honorarios electrónica |
| Estado operativo | ⚠️ **por confirmar** (ver §2) | operativo |

**Regla de corte ya decidida** (25-jul-2026, cerrada, no se reabre — está en
`ventas/proyectos-en-curso.md`):

- Contrato **contratado y prestado antes del 24-jul-2026** → se cobra **persona natural**.
- Contrato **nuevo** → se factura por **la SpA, + IVA**.

Consecuencia práctica de esa regla: **los dos contribuyentes declaran en paralelo**, y son dos
calendarios distintos. No es uno u otro.

---

## 2. Lo primero, porque de esto depende todo lo demás

La obligación mensual de declarar **empieza cuando el SII aprueba el inicio de actividades**,
no cuando se constituye la sociedad. La SpA existe legalmente desde que el sistema le asignó
el RUT, pero su RUT queda inactivo en el SII hasta que el Formulario 4415 está procesado
([referencia](https://yo-facturo.com/blog/inicio-de-actividades-en-el-sii-paso-a-paso-2026/)).

El último estado registrado en el repo es de **25-jul-2026**, y decía: *inicio de actividades
enviado pero bloqueado por documentos que dependen de terceros; faltan Certificado Digital SII,
facturación electrónica y cuenta corriente empresa.* Han pasado **dos meses**.

### Preguntas que hay que responder antes de cualquier otra cosa

| # | Pregunta | Cómo se responde | Por qué importa |
|---|---|---|---|
| 1 | **¿El inicio de actividades de la SpA está APROBADO?** Y si sí, ¿con qué fecha? | sii.cl → Mi SII → *Consultar situación tributaria* del RUT 78.474.925-8 | Si está aprobado desde agosto, **ya hay F29 atrasados** (§5). Si sigue pendiente, la obligación todavía no corre y el trabajo es desbloquearlo. |
| 2 | **¿Qué régimen quedó marcado?** ProPyme General (14 D N°3) o ProPyme Transparente (14 D N°8) | misma consulta de situación tributaria | Cambia qué se declara en abril y quién paga el impuesto (la empresa o Ramón en su Global Complementario). |
| 3 | **¿Ramón emitió boletas de honorarios por lo que ya cobró como persona natural?** (Fase 3 y los $235.200 de Bernardo llegaron **sin retención**) | Mi SII → boletas de honorarios emitidas | Si el pagador no retuvo, **el que debe el PPM es él**, mes a mes. Sin eso, la cuenta aparece entera en abril de 2027. |
| 4 | **¿Hay contador contratado?** | Ramón | Un contador para una SpA sin movimiento cuesta del orden de decenas de miles de pesos al mes. La multa de un solo F29 no presentado parte en 1 UTM (~$71.500). No tenerlo no se sostiene por precio. |

**Nada de lo que sigue se ejecuta a ciegas:** primero se responden estas cuatro.

---

## 3. La respuesta corta a "¿hay que declarar aunque no entre plata?"

**Sí.** Y son dos cosas distintas que se confunden:

1. **F29, mensual.** Toda empresa con inicio de actividades vigente presenta el F29 **todos los
   meses**, aunque no haya vendido ni comprado nada. En ese caso se presenta **"sin
   movimiento"**: $0 a pagar, pero presentado. No presentarlo es una infracción por sí sola,
   independiente de que no hubiera impuesto que pagar
   ([1](https://solutiontax.cl/f29-sin-movimiento-pyme-chile-2026/),
   [2](https://blog.relbase.cl/blog-para-empresas-y-emprendedores/c%C3%B3mo-declarar-el-formulario-29-f29-sin-movimientos-en-el-sii-gu%C3%ADa-paso-a-paso)).
2. **F22, anual (abril).** Los contribuyentes de Primera Categoría declaran renta **siempre**;
   la obligación no está atada a tener movimiento
   ([SII](https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_8382.htm)).

Dicho de otra forma: **la cuenta corriente empresa vacía no es un argumento.** Lo que el SII
espera no es plata, es la declaración.

---

## 4. Calendario

### Mensual — SpindleLab SpA

| Qué | Cuándo | Detalle |
|---|---|---|
| **F29** | hasta el **día 12** del mes siguiente en el caso general; **hasta el día 20** si se declara por internet y se es facturador electrónico ([ref](https://blog.uwigo.com/ormulario-29-guia-plazos-multas-sii)) | Con movimiento: IVA débito (ventas) menos crédito (compras). Sin movimiento: se presenta en ceros. Una fuente indica que la declaración **sin movimiento** admite hasta el **día 28** ([ref](https://solutiontax.cl/f29-sin-movimiento-pyme-chile-2026/)) — ⚠️ **confirmar con el contador antes de usar ese plazo**; la regla segura sigue siendo el día 20. |
| **PPM** | dentro del mismo F29 | Pago provisional mensual a cuenta del impuesto de abril. En ProPyme el primer ejercicio tiene tasa reducida. ⚠️ Tasa exacta: la confirma el contador. |
| **Cotizaciones de Ramón** | si la SpA le paga sueldo | Hoy **no** hay sueldo desde la SpA. Si algún día lo hay, aparece un F29 con retenciones y una previred mensual. Decisión abierta, no urgente. |

### Mensual — Ramón persona natural

| Qué | Cuándo | Detalle |
|---|---|---|
| **Boleta de honorarios** | al cobrar | Retención vigente **2026: 15,25 %** (sube a 16 % en 2027 y 17 % en 2028, Ley 21.133 — [ref](https://www.buk.cl/novedades/finanzas/boleta-de-honorarios-chile-calculo-retencion-2026)). Si el cliente es empresa, **retiene el cliente**. Si es persona natural, **no retiene nadie**: la boleta sale bruta y el PPM lo paga Ramón. |
| **PPM de honorarios** | F29 del mes siguiente | Es el caso de los cobros a Bernardo, que llegaron íntegros sin retención. ⚠️ Confirmar con el contador si corresponde declararlos mes a mes o si quedan para abril. |

### Anual — los dos

| Qué | Cuándo | Detalle |
|---|---|---|
| **Declaraciones juradas** | marzo | Las que apliquen según régimen. Las prepara el contador; aquí solo se marca que existen y que vencen **antes** del F22. |
| **F22 renta** | abril | La SpA declara aunque no haya tenido movimiento. Ramón declara sus honorarios; ahí se descuentan las cotizaciones previsionales que la retención financió. |
| **Patente municipal** | al tener inicio de actividades; se paga por semestres | Con inicio de actividades en el SII corresponde patente en la municipalidad del domicilio ([ref](https://denegocios.cl/patente-municipal-para-tu-empresa/)). ⚠️ **Verificar si la SpA la tiene.** Es el olvido más común de una empresa nueva que opera desde casa. |

---

## 5. Lo que cuesta no hacerlo

| Situación | Sanción |
|---|---|
| F29 presentado fuera de plazo **sin impuesto a pagar** (el caso "sin movimiento") | **1 UTM a 1 UTA**, art. 97 N°2 del Código Tributario. Referencia jun-2026: ~$71.506 a ~$858.072. La UTM cambia cada mes ([SII](https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1061.htm)) |
| F29 fuera de plazo **con impuestos retenidos o recargados** (IVA, retenciones) | **10 %** de lo adeudado, **+2 % por cada mes o fracción** de retardo, tope **30 %**. Si el SII lo detecta fiscalizando: **20 % a 60 %** (art. 97 N°11) |
| No declarar de forma sostenida | Anotaciones en el historial tributario del contribuyente. En la práctica esto es lo caro: traba trámites, timbraje y la propia operación de la empresa |

El punto importante: **una multa de 1 UTM por mes de omisión es barata al mes y absurda al año**,
y el daño que de verdad molesta es la anotación, no el monto.

---

## 6. Dos cosas que se están perdiendo plata ahora mismo

1. **Las suscripciones van a nombre personal.** Google Workspace, Apollo, Higgsfield, Metricool,
   Cloudflare, los dominios. Mientras salgan de la tarjeta personal y con boleta a nombre de
   Ramón, **no son gasto de la SpA ni crédito fiscal de IVA**. En cuanto la SpA tenga cuenta y
   pueda recibir factura, **pasarlas al RUT de la empresa**. Y el crédito fiscal de IVA no se
   pierde por no tener ventas todavía: se acumula como remanente para el mes en que sí las haya.
   ⚠️ Los servicios digitales extranjeros tienen regla propia de IVA: la confirma el contador.
2. **La cotización nunca dice "IVA incluido".** Ya costó: en el contrato de Bernardo, pactar
   "IVA incluido" habría significado regalar ~$37.553 de IVA débito sobre el mismo precio.
   Las cotizaciones vigentes dicen **"+ IVA"** y así se quedan
   (regla ya escrita en `.claude/skills/cotizaciones/SKILL.md`).

---

## 7. Cómo lo hacemos — plan

| # | Paso | Quién | Cuándo |
|---|---|---|---|
| 1 | Entrar a Mi SII y sacar la **situación tributaria del RUT 78.474.925-8**: ¿inicio de actividades aprobado?, ¿desde qué fecha?, ¿qué régimen? | Ramón | **esta semana** |
| 2 | Según eso: (a) si está aprobado → contar cuántos F29 faltan desde ese mes y presentarlos, aunque sean todos en ceros; (b) si sigue pendiente → listar exactamente qué documento falta y de quién depende | Ramón + contador | mismo día que el paso 1 |
| 3 | **Contratar contador con tarifa de empresa sin movimiento.** El encargo es chico y definido: F29 mensual, DDJJ de marzo, F22 de abril, y decir si falta patente municipal | Ramón | antes del **20-oct** (siguiente vencimiento de F29) |
| 4 | Completar lo que queda del setup: Certificado Digital SII, facturación electrónica, cuenta corriente empresa. Sin esto la SpA no puede facturar el 30 % de María Loreto | Ramón | antes de la reunión de inicio del **6-oct** |
| 5 | Revisar si Ramón debió emitir boleta de honorarios por los cobros sin retención, y regularizar si corresponde | contador | con el paso 3 |
| 6 | Volver acá y llenar el registro de §8 | quien toque el tema | cada mes |

**El paso 4 tiene fecha real y consecuencia comercial**, no solo tributaria: María Loreto es
contrato nuevo, se factura por la SpA + IVA, y el anticipo del 30 % ($424.830 con IVA) no se
puede cobrar bien sin facturación electrónica andando.

---

## 8. Registro de cumplimiento

Se llena hacia adelante. Un mes sin fila es un mes que nadie verificó.

| Período | F29 SpA | F29 / boletas Ramón | Quién lo presentó | Evidencia | Nota |
|---|---|---|---|---|---|
| ago-2026 | ❓ por verificar | ❓ | — | — | Depende de la fecha de aprobación del inicio de actividades |
| sep-2026 | ❓ por verificar | ❓ | — | — | Vence el **20-oct-2026** |

Convención: ✅ presentado con comprobante a la vista · ⚠️ presentado sin comprobante guardado ·
❌ no presentado · ❓ no verificado. **Nada se marca ✅ sin el comprobante del SII**, igual que
cualquier otro estado compartido de este repo.
