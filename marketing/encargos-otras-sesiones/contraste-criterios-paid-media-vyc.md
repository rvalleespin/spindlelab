# Los criterios de paid media de GPT, contrastados contra el producto

**Fecha:** 23 de octubre de 2026
**Qué se revisa:** los criterios de paid media para el flujo de compra de Verifica y Cumple,
escritos por GPT en la sesión que lleva las campañas.
**Contra qué:** el código del chequeo, la cuenta de Meta, y lo que ya está construido.

> Esta es la tercera revisión independiente sobre el mismo flujo (Claude, Codex y ahora GPT),
> y las tres llegaron por caminos distintos. Donde coinciden las tres, no vale la pena seguir
> discutiendo.

---

## Lo que converge con las otras dos revisiones

Estos puntos ya los habían encontrado Claude o Codex, o los dos. Que GPT llegue igual desde el
lado de paid media los deja firmes:

| Lo que dice GPT | Dónde converge |
|---|---|
| No pedir correo antes de mostrar el resultado | ya es la regla del producto, y es su diferenciador |
| Precio, alcance y condiciones visibles antes del pago | las dos revisiones anteriores, y el brief |
| No declarar una compra hasta confirmar el pago en el servidor | el brief; ya está implementado así en el diseño |
| Si el sitio ya está en orden, no presionar una compra | «Sin pendientes no se vende nada», y la compuerta nueva |
| Separar cumple / no cumple / no aplica / requiere revisión | **el producto ya tiene esos cuatro estados** |
| No contar como aprobado un control desconocido | es la disciplina del falso verde, que costó cuatro arreglos |
| No fijar un CAC objetivo hasta conocer el costo de entregar | Codex dijo lo mismo; Claude listó las 14 partidas a medir |
| No enviar a Meta datos personales ni hallazgos del sitio | regla de la casa |
| No tocar la campaña activa ni el sitio sin autorización | regla de la casa |

**Lo más notable de la lista:** GPT propone separar los controles en cuatro estados —cumple, no
cumple, no aplica, requiere revisión— y el producto ya los tiene, con esos mismos cuatro
significados: `ok`, `pendiente`, `no-aplica` y `sin-confirmar`. Llegó al mismo modelo sin ver el
código. Eso es buena señal de que el modelo es correcto.

---

## Donde apunta a un fantasma

> *«No usar un umbral como 70% para decidir si mostrar la oferta.»*

**No existe ningún umbral de 70%**, ni de ningún otro número. Lo verifiqué en el código: lo único
que dice «umbral» es un comentario sobre cómo tratar una respuesta vieja de la API. La condición
real para mostrar la oferta es si quedaron señales pendientes, no un puntaje.

El consejo no está mal, y de hecho es más correcto de lo que su autor sabe: **un umbral de
puntaje sería inaplicable acá**, porque el puntaje se calcula solo sobre el peso confirmado. Dos
sitios con el mismo número pueden tener confirmado un peso muy distinto.

---

## Dos conflictos reales con el producto

### 1. «Pedir correo después de la compra» no se puede cumplir como está escrito

> *«Pedir correo después de la compra solo para comprobante, instrucciones y entrega.»*

**Mercado Pago exige `payer.email` al CREAR la orden**, antes de que exista cualquier pago. Es
textual de su referencia: «Required for all Checkout Pro orders». No es una decisión de diseño
que podamos tomar distinto.

Lo que sí se puede, y conserva el espíritu del criterio: pedir **solo el correo** en la pantalla
de pago, con su motivo escrito, y dejar el resto (razón social, RUT, giro, dirección para la
factura) para después del pago confirmado. El criterio correcto no es «correo después de la
compra» sino **«nada más que el correo antes del pago»**.

### 2. Hay dos «100» distintos, y conviene no mezclarlos

> *«Definir qué significa 100: todos los controles aplicables del alcance del kit verificados
> como cumplidos.»*

Esa definición no es la que usa el chequeo hoy. Son dos números distintos:

| | Qué significa | Sobre qué se calcula |
|---|---|---|
| **El 100 del chequeo** | todo lo que se pudo confirmar está en orden | las 7 señales, excluyendo las que no se pudieron ver |
| **Un 100 del kit** | todo lo que el kit cubre está en orden | las 5 señales del gestor |

Un sitio puede quedar en 100 del kit y seguir con la política pendiente, porque esa señal no es
del kit. Si el informe final dice «100» sin decir de cuál de los dos habla, el comprador va a
entender el primero y va a recibir el segundo.

**Recomendación:** no redefinir el 100 del chequeo. El informe de entrega habla de **señales
cerradas sobre señales contratadas**, que es verificable y no se confunde con el puntaje público.

---

## Un hueco de medición que el documento no ve

GPT pide seis métricas. **La tercera no se puede medir hoy**, y conviene saberlo antes de
prometerla:

> *«3. Ofertas vistas / chequeos completados.»*

La oferta se dibuja **en el navegador**: once veces en el JavaScript de la portada, cero en el
servidor. Los contadores que existen (`uso:rapido`, `uso:profundo`, `uso:origen:*`) se escriben
del lado del servidor justamente para no depender de cookies ni de consentimiento.

Para contar «ofertas vistas» hay dos caminos, y los dos tienen costo:

- **Analítica en el cliente.** Necesita consentimiento, así que subcuenta sistemáticamente. Ya
  pasó con `generate_lead` en GA4 (está anotado desde el 22-sep).
- **Una señal al servidor** cuando se dibuja la oferta. Es un contador más, sin cookies, en la
  misma línea que los que ya existen. Es lo que haría.

Las otras cinco métricas sí son medibles: 1 y 2 ya se cuentan, y 4, 5 y 6 salen del pedido una
vez que exista.

---

## Lo que GPT vio y conviene tomar

> *«Preservar las UTMs hasta la compra para conocer campaña, creatividad y rubro de origen.»*

Esto es correcto y todavía no está. Hoy el origen se lee al momento del chequeo (`uso:origen:*`,
lista cerrada) y el formulario lleva un campo «Llego de». Pero **el pedido no existe todavía**, y
cuando exista tiene que guardar la UTM completa, no solo el origen genérico.

Con nueve conjuntos por rubro en la campaña, la diferencia entre saber «vino de Instagram» y
saber «vino del conjunto de contadores con la creatividad B» es la diferencia entre poder
escalar y no poder.

> *«El evento de consulta no debe confundirse con una compra.»*

También correcto, y es un error fácil: hoy el botón de «Pregúntanos» y el de «Quiero el kit»
llevan al mismo formulario. Cuando exista el pago hay que separarlos de verdad, no solo por
etiqueta.

---

## Lo que ninguna de las tres revisiones dijo, y lo vi al verificar

**La campaña de VyC está ACTIVA**, no en pausa. Son dos, las dos con objetivo `OUTCOME_TRAFFIC`:

- `🧪 VyC · Laboratorio · Tráfico · por rubro`, creada hoy 23-oct
- `Tráfico frío IG - test 01 (jul 2026)`, de julio

Ninguna registra entrega en los últimos 7 días. La de VyC se creó hoy, así que eso es esperable.

Pero el punto de fondo: **la campaña manda gente a una página donde todavía no se puede comprar.**
GPT tiene razón en que optimizar a visitas no aprende quién compra. Lo que falta decir es que hoy
**no hay nada que aprender**, porque no hay compra que medir. Cualquier conversación sobre
optimizar a conversiones es prematura hasta que el checkout exista.

Esto no contradice a GPT —él mismo dice «revisar el nuevo flujo por separado»— pero sí cambia el
orden: primero el flujo, después la campaña que lo alimenta.

---

## Qué cambia en lo que estoy construyendo

| Criterio | Qué hago |
|---|---|
| Solo el correo antes del pago | lo pide Mercado Pago igual; el resto va al intake posterior |
| UTMs hasta el pedido | el pedido guarda la UTM completa, no solo el origen |
| Separar consulta de compra | dos caminos distintos de verdad, no dos etiquetas |
| Contar ofertas vistas | un contador server-side más, sin cookies |
| No confundir los dos «100» | el informe de entrega habla de señales cerradas sobre contratadas |

Lo demás ya está hecho o ya estaba en el diseño.
