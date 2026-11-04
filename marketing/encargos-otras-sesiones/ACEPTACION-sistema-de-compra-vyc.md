# Criterios de aceptación del sistema de compra · Verifica y Cumple
*4-nov-2026 · la matriz que faltaba: qué caminos puede recorrer un comprador y cuáles se
ejercitaron de verdad*

## Por qué este documento

Hasta hoy el sistema se corrigió **reactivamente**: un ensayo produjo 9 hallazgos y se
arreglaron uno por uno. Eso cierra los defectos que el ensayo tocó, y deja sin mirar todo lo que
el ensayo no recorrió. Esta matriz invierte el orden: primero los caminos, después el trabajo.

**Cobertura real: de 18 caminos, 6 ejercitados contra producción.** Los otros 12 están cubiertos
por 5.134 aserciones contra dobles — que no es lo mismo, y este proyecto ya aprendió la
diferencia a golpes (5.041 aserciones verdes no vieron una columna que faltaba en producción).

## El hallazgo que cambia las prioridades

**No existe ningún camino para devolverle la plata a alguien en el registro del sistema.**

- `devuelto` solo lo escribe `cobro.js:76` y `:298`, que es el mapa de estados de **Mercado
  Pago** (`refunded → DEVUELTO`).
- La pasarela viva desde el 30-oct es **Flow**, y `ESTADOS_FLOW` (flow.js:328) mapea solo tres
  números: 1 pendiente, 2 pagado, 3 rechazado. No hay devolución.
- `flow-confirmacion.js` no importa nada de `cobro.js`.
- No hay endpoint para marcarlo a mano. No hay `/api/devolver`.

**La consecuencia concreta:** si alguien ejerce el derecho a retracto, Ramón le devuelve la plata
en el panel de Flow y **el pedido queda en `pagado` o `entregado` para siempre**. La pantalla
del cliente le sigue mostrando su kit entregado, la cola de entrega lo sigue listando como
trabajo por hacer o hecho, y no queda registro de la devolución en ninguna parte del sistema.

**Por qué es el primero de la lista:** los términos publicados el 3-nov declaran el derecho a
retracto de 10 días, prometen el 100% del dinero y ponen un tope de 45 días. La promesa está
escrita y publicada; el sistema no tiene cómo reflejar que se cumplió. Es el único ítem de esta
matriz con consecuencia legal, y conecta directo con el requisito de Ramón del 3-nov: *«tampoco
quiero tener problemas legales con la entrega»*.

## La matriz

Leyenda: **PROD** ejercitado contra producción · **PRUEBA** solo cubierto por la batería ·
**HUECO** no existe el camino

### Entrada y elegibilidad

| # | Camino | Estado | Riesgo |
|---|---|---|---|
| 1 | No elegible: no ve el botón | PRUEBA | bajo |
| 2 | Fuera de alcance (carro, varios dominios): va al formulario | PRUEBA | bajo |
| 3 | Elegible solo-política: compra sin que se le pida acceso | PRUEBA | **medio** |
| 4 | Elegible con gestor: compra completa | **PROD** | — |

### Pago

| # | Camino | Estado | Riesgo |
|---|---|---|---|
| 5 | Paga y acredita (Flow 2) | **PROD** (monto de prueba) | — |
| 6 | La tarjeta se rechaza (Flow 3) | PRUEBA | **alto** · es frecuente |
| 7 | Pago que no acredita al instante (Flow 1) | PRUEBA | medio |
| 8 | Abandona: nunca paga | PRUEBA | bajo |
| 9 | Doble clic: no se cobra dos veces | PRUEBA | medio |
| 10 | Flow caído al crear la orden: 502 | PRUEBA | bajo |
| 11 | Flow devuelve un estado 4 (anulado) | **HUECO** sin mapear, falla cerrado y pide revisión | medio |
| 12 | Contracargo | PRUEBA, fuera del camino automático por decisión | bajo |
| 13 | **Devolución / derecho a retracto** | **HUECO: no existe** | **el más alto** |

### Después de pagar

| # | Camino | Estado | Riesgo |
|---|---|---|---|
| 14 | Entrega los datos de su empresa | **PROD** | — |
| 15 | Declara el acceso a su sitio | **PROD** | — |
| 16 | Se le entrega y se cierra el pedido | **PROD** | — |
| 17 | Se corrige su borrador después de entregado | **PROD** | — |
| 18 | Pierde el enlace de su pedido | a verificar | medio |

## El plan, en orden de riesgo

1. **El camino de la devolución** (#13). Es código nuevo: un endpoint con la misma clave que
   `/api/entregar`, la transición a `devuelto`, el correo al cliente, y la etapa que ya existe
   en la pantalla. El estado y la etapa ya están construidos; falta quién los dispara.
2. **El rechazo de tarjeta** (#6), ejercitado de verdad. No necesita plata: se corre contra las
   claves de sandbox de Flow con `wrangler pages dev` en local, que es un ensayo de staging.
   Junto con #7 y #11, que se prueban igual.
3. **El aviso de venta** (el hallazgo #5 del ensayo). Arreglo barato: mandarlo al Gmail que
   empíricamente sí recibe, en vez del dominio que Workspace filtra.
4. **La recuperación del enlace** (#18). Verificar si existe; si no, es un hueco de servicio.
5. **Solo-política con plata real** (#3), que es cerca de la mitad de los casos vendibles.

## Lo que NO entra, y por qué

- Rehacer la compra completa a $177.310 con tarjeta. El monto viaja por el mismo código que ya
  corrió; cuesta la comisión de Flow y no compra información nueva.
- El webhook `email.bounced` de Resend. Lo reemplaza, mucho más barato, mandar el aviso a una
  casilla que sí recibe más el resumen diario del copiloto listando los pedidos sin atender.


---

# Avance del 4-nov (tarde)

## Cerrado

**#13 · La devolución.** `POST /api/devolver` con la clave de la cola. No mueve plata a
propósito: se devuelve en el panel de Flow y acá se anota, porque un endpoint que devolviera
dinero con una sola clave de cabecera es lo que vacía la cuenta si esa clave se filtra — y se
filtró una hoy. La bandera `ya_devuelto_en_flow` obliga a declarar que la plata ya se movió,
porque el correo al cliente dice que ya salió. El motivo (`retracto` / `no-se-pudo-entregar` /
`otro`) elige el texto del correo, no es una etiqueta. 102 aserciones, 7 mutaciones.

**#6 · El pago rechazado ya no es un callejón.** La etapa decía «puedes intentarlo de nuevo» y
la pantalla dibujaba UN botón: «Escríbenos». Ahora dibuja «Intentar el pago de nuevo» como
primario, con el dominio en la URL, y la portada lo recibe por `?dominio=` y corre el chequeo
sola. No se saltea ninguna compuerta: corre el mismo chequeo y la misma elegibilidad del
servidor. 11 aserciones más, 4 mutaciones.

## Retirado: no era un hueco

**#11 · El estado 4 de Flow.** Mi matriz lo marcó como hueco y **estaba mal**. El mapa
`ESTADOS_FLOW` se llenó con pagos reales en el sandbox, uno por uno, con la evidencia escrita al
lado de cada número. El 4 no está **a propósito**: el comentario dice que escribirlo «porque
seguro significa anulada» sería justo la suposición que el mapa existe para evitar. Hoy cae en
«revisar» con aviso, y nunca entrega un kit sin pago. Es la decisión correcta.

Se intentó observarlo igual: la sonda (`herramientas/sonda-flow.mjs`) abre el pago en el sandbox
y lee el número — se confirmó el estado 1. Pero la página de pago del sandbox solo ofrece medios
de pago, sin botón de anular, así que el 4 sale del panel de comercio o de la expiración.
Observarlo no es barato hoy y el comportamiento actual es seguro, así que queda como está.

**El duplicado de `~/.flow-claves`.** `FLOW_SECRET_KEY` aparece dos veces, y se verificó
(comparando huellas, sin imprimir valores) que los dos son **idénticos**. Es ruido, no un riesgo.

## Cobertura, ahora

**8 de 18 caminos ejercitados o cerrados con prueba dirigida**, contra 6 esta mañana. Siguen
pendientes, en orden: el pago pendiente de verdad (#7), la recuperación del enlace (#18) y
solo-política con plata real (#3).
