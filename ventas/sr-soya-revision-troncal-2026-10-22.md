# Revisión de la propuesta a SR.SOYA

- **Fecha:** 22-oct-2026 · **Autor:** Tomás (troncal) · **Encargo de Ramón:** *«revisa la propuesta
  que se le está haciendo a este cliente»*.
- **Método:** nada de esto sale de lo que reportó otra sesión. Está verificado contra Gmail, contra
  `git` y contra los archivos.

---

## 0. Lo primero: la propuesta ya no «se está haciendo». Se envió.

| Qué | Verificado |
|---|---|
| Mensaje `1a15b4c03e1ca083`, **20-oct 21:51 UTC** | Etiqueta `SENT` en el hilo |
| **Con los dos PDF adjuntos** | `SPL-COT-2026-016` y `SPL-NT-2026-002`, por nombre de archivo |
| **El cuerpo lo reescribió Ramón**, no es el borrador que dejó la sesión anterior | Empieza «Leí tu correo con detalle», ninguna versión del borrador empezaba así |
| **Carlos no ha respondido.** Van dos días | El hilo termina en ese mensaje |

**Y una cosa que se salvó por poco:** el PDF que Ramón adjuntó (248.742 bytes) **no estaba en git**.
El commit tenía la versión anterior al pase editorial (297.770 bytes). Rescatado en `459d72b`.
Es el mismo error de siempre: el reporte llegó, los datos no.

## 1. ⚠️ El IVA: hay $38.000 al mes que Carlos no sabe que va a pagar

Es el hallazgo que más puede doler, y **no nació en esta semana: tiene seis semanas y ya se envió
dos veces.**

| Dónde | Qué dice |
|---|---|
| Cotización 016, al pie | «Los valores no incluyen IVA (19%)» |
| Cotización 016, sección El proyecto | «Con dos alumnos semanales cubres **los $300.000 completos**, mi trabajo y la publicidad» |
| Correo enviado el 20-oct | «Mantiene el mismo valor (**$200.000 al mes**)» |
| Correo de Ramón, 10-sep | «Con los $100.000 que pensabas poner en publicidad, **te queda justo en los $300.000**» |
| Correo de Carlos, 19-oct | «**$200.000 por los servicios de SpindleLab y hasta $100.000** en inversión publicitaria» |
| `pipeline.md` en `main` | «el paquete **calza en $300.000/mes** = $900.000» |

**La cuenta real:**

```
$200.000  honorario
+ $38.000  IVA 19%
+$100.000  pauta
─────────
 $338.000  al mes · $1.014.000 el trimestre
```

Carlos tiene $300.000 en la cabeza. **La diferencia es $38.000 al mes, $114.000 en el trimestre.**
Y que el IVA se cobra de verdad está confirmado en el pipeline: *«Contrato nuevo → se factura por
la SpA, + IVA»*.

**Esto aparece solo, con la primera boleta**, justo cuando le estás pidiendo que ponga su tarjeta
en la cuenta publicitaria. Es el peor momento posible para una sorpresa de precio.

**Lo bueno:** el argumento comercial aguanta igual. Dos alumnos semanales dejan unos $414.000 al
mes, que cubren los $338.000 reales. **Lo que está mal es la cifra escrita, no el razonamiento.**

**Decisión de Ramón, y es de precio, así que no la tomo yo:**

| Opción | Qué implica |
|---|---|
| **A. Los $200.000 son con IVA incluido** | Honorario neto $168.067. Calza con lo que Carlos entendió, y no hay conversación incómoda. Ramón gana $31.933 menos al mes |
| **B. $200.000 + IVA, y se le dice derecho** | Mantiene el honorario. Hay que decirlo antes de la boleta, idealmente en la reunión |
| **C. $200.000 + IVA y la pauta baja a $62.000** | Calza en los $300.000 que él puso como tope, pero deja la campaña con menos aire del que ya tiene poco |

Mi lectura: **B**, dicho en la reunión y no por correo. Es un cliente que ya cambió tres veces de
rumbo y no ha pagado; una sorpresa de precio escrita es más fácil de usar como excusa que una
conversada.

## 2. El proyecto musical desapareció del contrato, y nadie lo escribió

En septiembre Ramón lo dejó dicho por correo, **para un mes**:

> «ese mes se va completo a esto, así que durante ese mes **no corre la gestión de redes del
> proyecto musical**»

Ahora son **tres meses**, y la cotización 016 no lo dice en ninguna parte. Verificado: la palabra
«disco» aparece una vez y solo para explicar que la cotización anterior hablaba de él.

**Por qué importa:** Carlos contrató originalmente gestión de redes para SR.SOYA artista. Su propio
correo dice que la academia debe «financiar el crecimiento de mi proyecto artístico». Si en
noviembre no sale nada del disco, va a preguntar. **Mejor que esté escrito ahora que discutido
después.**

## 3. La cotización no tiene fecha de inicio, y el trimestre ya se corrió

Dice «tres meses» y «los plazos corren desde el primer pago y los accesos». Correcto como condición,
**incompleto como plan**: no hay una fecha.

- Aceptó el 15-sep para partir el **12-oct**.
- Hoy es **22-oct**: diez días, sin pago.
- Si parte en noviembre, el trimestre cierra en **enero**, que en Chile es el peor mes para una
  academia que depende de que él esté disponible dando clases.

## 4. El patrón del cliente, que es lo que un PM tiene que nombrar

| Fecha | Qué pasó |
|---|---|
| 15-sep | Acepta el Plan Arranque para el disco |
| 21-sep | Cambia a Terapias 5D |
| **12-oct** | **No llega el depósito** |
| 19-oct | Cambia a academia vocal |
| 20-oct | Se le envía la tercera propuesta |
| 22-oct | Sin respuesta |

**Tres enfoques, tres juegos de documentos, cero pesos.** No lo leo como mala fe: es entusiasmo sin
caja, y lo dice él mismo («si no genero ingresos paralelamente, podría quedarme sin capital»).

Pero el costo de servirlo antes de cobrar ya es alto, y hay algo que se repitió tres veces sin que
nadie lo sumara: **la página de $290.000 se regaló en las tres propuestas.** La 016 por fin escribe
«por única vez», que era lo que faltaba. Llegó justo.

## 5. El estado compartido está desactualizado

`ventas/pipeline.md` en `main` tiene la fila de Carlos **anterior al giro**: lo llama «proyecto
Terapias 5D», su próximo paso son las dos preguntas del 19-oct, y no sabe que existe la cotización
016 ni que el correo salió con adjuntos. `proyectos-en-curso.md` no lo menciona, lo que está bien:
todavía no es un proyecto en curso, porque no ha pagado.

**Lo actualizo yo en este mismo turno**, que para eso soy el troncal.

## 6. Lo que la propuesta tiene bien, y conviene no tocar

Para que la revisión no sea solo una lista de problemas:

- **El punto de equilibrio en dos alumnos** es el mejor argumento del documento, y es verdadero.
- **La separación entre lo que se construye y lo que se configura** cierra la puerta a que Carlos
  espere un desarrollo de software. Era un riesgo real y quedó resuelto en una tabla.
- **Optimizar hacia la consulta y no hacia la compra** está respaldado por la documentación de Meta,
  no por criterio propio. Eso es exactamente lo que la marca vende.
- **«Por única vez»** sobre la página, escrito sin reproche.
- **Los riesgos van en la cotización**, incluido el que nadie quiere escribir: que si Carlos demora
  tres días en contestar una consulta, el embudo no sirve.

## 7. Dónde te necesito, Ramón

| # | Decisión | Urgencia |
|---|---|---|
| **1** | **El IVA.** A, B o C del punto 1. Si es B, hay que decirlo en la reunión | **Antes de la reunión** |
| **2** | **¿Qué pasa con el proyecto musical durante los tres meses?** Si no corre, se escribe. Si corre en alguna forma mínima, también | Antes de que acepte |
| **3** | **¿Desde cuándo cuentan los tres meses?** Y si el cierre cae en enero, ¿se acepta o se corre | Antes de que acepte |
| **4** | **¿Hasta cuándo se sigue cotizando sin cobrar?** Van tres propuestas. Sugiero una fecha límite mental, no escrita: si al 31-oct no hay pago, pasa a seguimiento frío | Tuya, cuando quieras |

Las cuatro decisiones del 19-oct en `sr-soya-academia-vocal-analisis.md` §1 quedaron resueltas por
los hechos: la regla del reencuadre se escribió en la cotización, el arranque quedó condicionado al
pago, Terapias 5D se archivó reutilizando el andamiaje, y el mercado mixto se envió.
