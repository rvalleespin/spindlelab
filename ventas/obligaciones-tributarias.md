# Obligaciones tributarias — SpindleLab SpA + Ramón persona natural

> **Qué es esto.** El mapa operativo de lo que hay que declarar, cuándo, y quién lo hace.
> Existe porque hay dos contribuyentes vivos al mismo tiempo (la SpA y Ramón como persona
> natural) y porque la obligación de declarar **no depende de que entre plata**: una empresa
> con inicio de actividades vigente declara todos los meses, aunque el resultado sea $0.
>
> **Documento hermano:** `ventas/instructivo-contable.md` explica la **lógica** (qué es el IVA,
> qué es la utilidad, cómo se saca plata de la empresa, por qué la SpA no puede quedar exenta de
> IVA y qué régimen conviene). Este archivo es el **calendario y el registro**. Si la pregunta es
> "¿qué hago con la plata que entró?", va en el instructivo; si es "¿qué vence y cuándo?", va acá.
>
> **Advertencia que no se borra.** Esto lo escribió una sesión de Claude Code, no un contador.
> Sirve para saber qué preguntar, qué fecha mirar y qué no dejar pasar. **Cada cifra y cada
> plazo los confirma el contador o el propio SII antes de actuar.** Donde hay fuente, está
> linkeada; donde no hay certeza, está marcado como pendiente de confirmar.
>
> Última actualización: 2026-10-02 (pago 1 en proceso: el IVA cae en el F29 de oct, vence 20-nov).
> Dueño del documento: **Monse (`agente-finanzas`)** — hoy
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

El último estado registrado en el repo era de **25-jul-2026**: *inicio de actividades enviado
pero bloqueado por documentos que dependen de terceros; faltan Certificado Digital SII,
facturación electrónica y cuenta corriente empresa.*

### ✅ Estado real al 30-sep-2026 (reportado por Ramón)

**El F29 del período ago-2026 quedó declarado sin movimiento, y no hubo multa.**
Septiembre todavía no aparece habilitado en el portal.

- **El inicio de actividades está vigente.** No se puede presentar un F29 con el RUT inactivo
  en el SII, así que el Formulario 4415 quedó procesado.
- **Rige desde agosto, no desde julio.** Es una inferencia razonable, no un dato leído: el
  portal ofrece los períodos desde el inicio de actividades en adelante, y agosto fue el
  primero disponible. Si julio correspondiera, habría aparecido igual que agosto.
  **No hay períodos atrasados que cubrir.** Se confirma de una mirada al listado de F29 del RUT.
- **Que septiembre no esté habilitado es el calendario, no un bloqueo.** El período se declara
  una vez cerrado: septiembre se abre el **1-oct** y vence el **20-oct**. Nada que hacer hasta
  entonces, y nada que esperar tampoco: el 1-oct ya se puede presentar.
- **Queda pendiente el comprobante.** Por la convención de §8, esto se anota ⚠️ y no ✅ hasta
  que el PDF del SII esté guardado. No es desconfianza, es la misma regla que se aplica a
  cualquier otro estado de este repo.

> ⚠️ **Una precisión sobre "no hubo multa".** La sanción por una declaración sin pago inmediato
> es un **rango** (1 UTM a 1 UTA) que el SII aplica, no un monto que el formulario cobre solo
> al momento de declarar. Si el período se presentó **dentro de plazo**, no hay nada que mirar.
> Si se presentó atrasado, vale la pena revisar en Mi SII que no quede anotación ni giro
> pendiente antes de darlo por cerrado
> ([SII](https://www.sii.cl/preguntas_frecuentes/iva/001_030_1228.htm),
> [ref](https://www.scauditores.cl/blog/f29-atrasado-como-regularizar)).

### Preguntas que siguen abiertas

| # | Pregunta | Cómo se responde | Por qué importa |
|---|---|---|---|
| 1 | **Confirmar que no quedó ningún período anterior a agosto sin cubrir.** Ya sabemos que el inicio está vigente y que agosto fue el primer período ofrecido; esto solo cierra la inferencia con el dato | sii.cl → Mi SII → listado de F29 presentados del RUT 78.474.925-8 | Un mes vigente sin declarar expone a 1 UTM–1 UTA (§5). Es la verificación más barata del documento: una pantalla. |
| 2 | **¿Qué régimen quedó marcado?** ProPyme General (14 D N°3) o ProPyme Transparente (14 D N°8) | misma consulta de situación tributaria | Cambia qué se declara en abril y quién paga el impuesto (la empresa o Ramón en su Global Complementario). |
| 3 | **¿Ramón emitió boletas de honorarios por lo que ya cobró como persona natural?** (Fase 3 y los $235.200 de Bernardo llegaron **sin retención**) | Mi SII → boletas de honorarios emitidas | Si el pagador no retuvo, **el que debe el PPM es él**, mes a mes. Sin eso, la cuenta aparece entera en abril de 2027. |
| 4 | **¿Hay contador contratado?** | Ramón | Un contador para una SpA sin movimiento cuesta del orden de decenas de miles de pesos al mes. La multa de un solo F29 no presentado parte en 1 UTM (~$71.500). No tenerlo no se sostiene por precio. |
| 5 | ~~¿La SpA tiene patente municipal?~~ **Respondida el 30-sep-2026: no la tiene, está pendiente.** Lo que queda es cómo se tramita operando desde el domicilio | municipalidad del domicilio | Ya no es una pregunta sino una tarea, con plazo real: primera cuota en enero-2027. Detalle y qué preguntar, en §4. |

La 1 y la 2 salen de Mi SII y son cinco minutos. La 3 la responde Ramón. La 5 es una llamada a
la municipalidad. **La 4 sigue siendo la que hace que esto no dependa de que alguien se acuerde
cada mes** — y ahora con más razón, porque el calendario ya está corriendo de verdad.

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

> **Y desde octubre de 2026 esto deja de ser el caso central.** Con el pago 1 en curso, el F29
> pasa de trámite en ceros a cálculo real. El mes en que cae lo define la fecha de la factura o la
> de la plata, la que ocurra primero (art. 9 DL 825), no la fecha del acuerdo. La lógica está en
> `ventas/instructivo-contable.md`.

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
| **Patente municipal** | dos cuotas: **enero y julio** | Con inicio de actividades en el SII corresponde patente en la municipalidad del domicilio ([ref](https://denegocios.cl/patente-municipal-para-tu-empresa/)). ⚠️ **Pendiente confirmado el 30-sep-2026.** Detalle abajo. |

### Patente municipal — pendiente confirmado (30-sep-2026)

Ramón lo tiene en la lista, sin resolver. Lo que conviene saber antes de llamar:

- **Cuánto.** Se calcula entre **0,25 % y 0,5 % del capital propio tributario** (el porcentaje lo
  fija cada municipalidad), con **mínimo 1 UTM** (~$71.500) y tope 8.000 UTM. Y hay una regla que
  aquí probablemente aplica: **cuando el contribuyente no está obligado a llevar balance general,
  la patente es un monto fijo igual al mínimo, 1 UTM**
  ([ref](https://transtecnia.cl/articulo-tributario/capital-propio-tributario-para-efectos-de-pago-de-patentes-municipales/)).
  Para una SpA recién constituida y sin movimiento, **el orden de magnitud realista es el mínimo**,
  no una cifra que asuste.
- **Cuándo.** Se paga en **dos cuotas semestrales, enero y julio**
  ([ref](https://www.asesoriasintegralesjaao.cl/blog/2026/07/02/patente-municipal-comercial-2026-segunda-cuota-julio/)).
  El próximo hito es **enero de 2027**, así que hay margen para hacerlo bien.
- **El punto que sí puede trabar.** La SpA opera desde el domicilio de Ramón. Las municipalidades
  suelen pedir **certificado de informaciones previas / zonificación** antes de otorgar patente
  comercial, y en zona residencial la vía habitual es inscribirse como **Microempresa Familiar**
  (Ley 19.749), que existe justamente para permitir actividad económica desde la vivienda.
  ⚠️ **Esto varía por municipalidad y no está verificado para la de Ramón**: es la pregunta
  concreta que hay que hacer, no una conclusión.
- **Qué preguntar, textual:** *"Tengo una SpA de servicios profesionales, sin local, que funciona
  desde mi domicilio. ¿Qué necesito para la patente: patente comercial con informe de
  zonificación, o me corresponde Microempresa Familiar?"* Con eso se resuelve en una llamada.

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
| 1 | ~~Confirmar si el inicio de actividades está aprobado~~ **✅ resuelto 30-sep-2026: vigente desde agosto, F29 de ago-2026 declarado sin movimiento y sin multa.** Queda de ese mismo paso: ver **qué régimen** quedó marcado en la situación tributaria del RUT 78.474.925-8 | Ramón | **esta semana** |
| 2 | **Declarar el F29 de sep-2026** (habilitado desde el 1-oct, vence el 20-oct). Probablemente en ceros: el pago 1 estaba en proceso al 2-oct. Antes de presentarlo, confirmar que no entró nada en septiembre | Ramón | **entre el 1 y el 20-oct** |
| 2d | **El F29 de oct-2026 (vence 20-nov) sí lleva IVA:** el del pago 1. Apartar los **$67.830** el día que entre la plata, no el 19-nov | Ramón | al recibir el pago 1 |
| 2b | ~~Guardar el comprobante del F29 de agosto~~ **ya está guardado** (carpeta `SpindleLab` de la nube, 30-sep). Queda anotar **folio y fecha de presentación** en §8: eso convierte el ⚠️ en ✅ y de paso aclara si agosto entró dentro de plazo | Ramón, o una sesión local en el Mac | próxima vez que se abra el repo en el Mac |
| 2c | **Patente municipal:** la llamada a la municipalidad con la pregunta de §4. Pendiente confirmado por Ramón el 30-sep | Ramón | antes de **enero-2027** (primera cuota) |
| 3 | **Contratar contador con tarifa de empresa sin movimiento.** El encargo es chico y definido: F29 mensual, DDJJ de marzo, F22 de abril, y decir si falta patente municipal | Ramón | antes del **20-oct** (vence el F29 de sep-2026, ya con obligación vigente y confirmada) |
| 4 | Completar lo que queda del setup: Certificado Digital SII, facturación electrónica, cuenta corriente empresa. Sin esto la SpA no puede facturar el 30 % de María Loreto | Ramón | antes de la reunión de inicio del **6-oct** |
| 5 | Revisar si Ramón debió emitir boleta de honorarios por los cobros sin retención, y regularizar si corresponde | contador | con el paso 3 |
| 7 | ~~Verificar si falta patente municipal~~ **confirmado: falta.** Pasa a ser el paso 2c | — | — |
| 6 | Volver acá y llenar el registro de §8 | quien toque el tema | cada mes |

**El paso 4 tiene fecha real y consecuencia comercial**, no solo tributaria: María Loreto es
contrato nuevo, se factura por la SpA + IVA, y el anticipo del 30 % ($424.830 con IVA) no se
puede cobrar bien sin facturación electrónica andando.

---

## 8. Registro de cumplimiento

Se llena hacia adelante. Un mes sin fila es un mes que nadie verificó.

| Período | F29 SpA | F29 / boletas Ramón | Quién lo presentó | Evidencia | Nota |
|---|---|---|---|---|---|
| jul-2026 | — no aplica | ❓ | — | — | El portal no lo ofreció: el inicio de actividades rige desde agosto. Se cierra con una mirada al listado de F29 (pregunta 1 de §2) |
| **ago-2026** | ⚠️ **presentado sin movimiento, sin multa** | ❓ | Ramón | comprobante **existe**: PDF en la carpeta `SpindleLab` de la nube personal de Ramón (reportado 30-sep-2026). **Falta el folio y la ruta exacta acá** | Reportado por Ramón el **30-sep-2026**. Primer período de la SpA. Vencía el 20-sep: si se presentó después, ver la precisión de §2 sobre la multa |
| sep-2026 | ⬜ **habilitado desde el 1-oct** | ❓ | — | — | Vence el **20-oct-2026**. El pago 1 estaba *en proceso* al 2-oct, así que probablemente este mes **todavía va en ceros**. Confirmar que no entró nada más en septiembre |
| oct-2026 | ⬜ | ❓ | — | — | Vence el **20-nov-2026**. Aquí cae el IVA del **pago 1 de María Loreto**: $424.830 con IVA, de los cuales **$67.830 son IVA débito**. Ver `ventas/instructivo-contable.md` |

Convención: ✅ presentado con comprobante a la vista · ⚠️ presentado sin comprobante guardado ·
⬜ todavía no vence · ❌ no presentado · ❓ no verificado. **Nada se marca ✅ sin el comprobante del SII**, igual que
cualquier otro estado compartido de este repo.

### Dónde viven los comprobantes

El comprobante de agosto existe y está en la carpeta `SpindleLab` de la nube personal de Ramón.
Eso es mejor que no tenerlo, pero todavía no sirve como evidencia para este repo, por una razón
práctica: **una sesión en la nube no ve esa carpeta**, y una sesión local tampoco sabe que ahí
está si no se lo dicen. Se buscó en el Google Drive de `hola@spindlelab.cl` el 30-sep-2026 y no
hay ningún archivo de F29 ni de comprobante, así que está en la nube personal (iCloud), fuera
del alcance de cualquier sesión que no corra en el Mac.

**Convención que cierra el hueco, sin mover archivos a ninguna parte:**

1. **El PDF se queda donde está.** No se sube al repo. Los documentos tributarios llevan RUT y
   folio, y aquí ya existe el criterio de dejar fuera lo sensible (`COTIZACIONES/` y `LOGOS/`
   están en `.gitignore`). Si algún día conviene tenerlos en el árbol, van en un `TRIBUTARIO/`
   también ignorado.
2. **Lo que se versiona es el rastro, no el archivo:** en la columna *Evidencia* van
   **folio + fecha de presentación + nombre del archivo**. Con eso cualquiera lo encuentra en
   treinta segundos y nadie tiene que volver a preguntar si existe.
3. **Nombre de archivo sugerido:** `F29-2026-08-spindlelab-spa.pdf`. Períodos en `AAAA-MM` para
   que se ordenen solos.
4. **Quién lo marca ✅:** una sesión local en el Mac puede abrir el PDF, leer el folio, anotarlo
   acá y cerrar la fila. Desde la nube no se puede, y por eso queda en ⚠️: **no es duda de que
   el trámite se hizo, es que el dato todavía no está escrito donde se consulta.**
