# Las tres decisiones que desbloquean vender el primer kit

**Fecha:** 23 de octubre de 2026 · **Decide:** Ramón
**Para qué:** son las tres cosas que hay que cerrar para vender un kit **por cualquier vía**,
incluso a mano por correo. No son decisiones de programación y no dependen del checkout.

> Las tres salen de las dos revisiones del brief (la de esta sesión y la de Codex). Acá no hay
> hallazgos nuevos: hay opciones y lo que implica elegir cada una.

---

## Decisión 1 · Qué corrige el kit, con nombre y apellido

### El problema

La oferta publicada hoy dice:

> *«Instala el gestor de consentimiento, corrige las señales que tu chequeo dejó pendientes,
> incluye una plantilla de política de privacidad para que la revise tu abogado, y vuelve a correr
> el chequeo al final.»*

«Las señales que tu chequeo dejó pendientes» suena cerrado y no lo es: **una de esas señales no la
puedes cerrar tú.**

### El dato que lo hace decidible

El chequeo mide siete señales. No son siete trabajos:

| Señal | Peso | Quién la cierra de verdad |
|---|---|---|
| Permiso antes de cargar rastreadores (rápido) | 6 | **el gestor de consentimiento** |
| Rastreadores que parten solos (profundo) | 3 | **el gestor de consentimiento** |
| Cookies escritas sin permiso (profundo) | 3 | **el gestor de consentimiento** |
| Datos que ya salieron de tu sitio (profundo) | 4 | **el gestor de consentimiento** |
| Si aparece un aviso al entrar (profundo) | 3 | **el gestor de consentimiento** |
| Enlace a tu política de privacidad (rápido) | 8 | **el cliente y su abogado** |
| Conexión cifrada HTTPS (rápido) | 6 | su hosting, no el kit |

**Cinco de las siete son un solo trabajo:** instalar un gestor de consentimiento y configurarlo
para que **retenga** los rastreadores, no solo los anuncie. Eso es el kit.

La de la política no la puedes cerrar: tú entregas una plantilla, su abogado la revisa, y **el
cliente la publica**. Si la prometes como «señal en verde», quedas colgado de dos actos que no son
tuyos, o publicas un texto legal sin revisión, que es justo el borde que este producto no cruza.

### Las opciones

**A · El kit es el gestor de consentimiento, y se dice así.**
Lo que se promete: que nada se cargue, escriba ni envíe antes de que la persona acepte, y que
rechazar cueste lo mismo que aceptar. Más la plantilla de política, declarada como insumo para su
abogado y no como entregable cerrado.
*Implica:* el precio cubre un trabajo acotado y repetible. El informe final puede mostrar cinco
señales en verde y una pendiente, y eso **no es un fracaso**: es lo que se vendió.

**B · El kit deja las siete en verde.**
*Implica:* dependes de que el abogado del cliente revise y de que el cliente publique. Un pedido
puede quedar abierto meses por algo que no controlas. No lo recomiendo.

**C · Precio por señal.**
*Implica:* mata la compra directa — el comprador tiene que elegir entre opciones técnicas que no
entiende. Contradice el principio del brief.

### Lo que yo haría

**A.** Y escribirlo en la oferta con las mismas palabras que el comprador ya vio en su informe,
separado en dos columnas por responsable:

> **Lo dejamos hecho nosotros:** que ningún rastreador cargue, escriba una cookie ni envíe datos
> antes de que la persona acepte, y que el aviso retenga de verdad.
> **Queda para tu abogado:** el texto final de tu política. Te entregamos el borrador.

### Lo que hay que resolver para cerrarla

- **Qué gestor de consentimiento.** Hoy no está escrito en ninguna parte del repo.
- **De quién es la cuenta de ese gestor** y quién paga si tiene plan de pago. Si queda a tu
  nombre, es un costo recurrente tuyo por cada cliente vendido.
- **En qué plataformas se puede instalar** y en cuáles no.

---

## Decisión 2 · Qué página se vende

### El problema

El chequeo devuelve `revisado: https://www.tuane.cl/`. **Mide la portada**, más la página de
política cuando logra encontrarla — y a veces no la encuentra. Nunca mide «el sitio».

El brief vende «un dominio y el sitio principal asociado». El comprador lo lee como todo lo que
vive bajo su marca.

### Por qué importa con precio fijo

Alguien puede tener la portada limpia y tres subdominios cargando rastreadores. El informe que
disparó la compra no los miró. El desajuste aparece durante la entrega, con la plata adentro.

### Las opciones

**A · Decirlo: el kit cubre la página que medimos.**
*Implica:* una línea en la oferta, hoy. Acota el riesgo a cero y es verdad. Lo que esté fuera es
revisión de alcance.

**B · Ampliar el chequeo antes de vender.**
*Implica:* trabajo real sobre el chequeo (recorrer más URLs, decidir cuáles, qué pasa con los
subdominios), y retrasa todo lo demás. Es lo correcto a futuro, no ahora.

**C · Vender «el sitio» y absorber la diferencia.**
*Implica:* con precio fijo, el primer cliente con subdominios se come el margen de varios.

### Lo que yo haría

**A ahora, B el día que esto venda solo.** Y que la oferta nombre la URL exacta que se midió, que
el chequeo ya devuelve en el campo `revisado`.

---

## Decisión 3 · Qué pasa si no se puede entregar

### El problema

El brief cierra la puerta de cobrar un adicional y no abre ninguna otra. Si el caso no se puede
entregar, el pedido queda **pagado, sin entregable y sin regla**, y se resuelve improvisando por
correo con la plata ya cobrada.

### Los cuatro casos que hay que cubrir

1. **El cliente nunca entrega el acceso.** Es el más probable: la pyme típica no administra su
   propio sitio.
2. **La plataforma no admite el gestor**, o no hay forma de instalarlo sin acceso al código.
3. **Aparece algo fuera de alcance** que el chequeo no podía detectar (tienda, varios dominios,
   integración a medida) y el cliente no acepta ampliar.
4. **El cliente se arrepiente** antes de que empiece el trabajo.

### Las opciones

**A · Si no podemos entregar, se devuelve.** En los casos 2 y 3 el problema es de nuestro lado o
de algo que no supimos ver: se devuelve completo. En el caso 1, el pedido queda abierto un plazo
definido y después se devuelve. En el 4, se devuelve mientras no haya empezado el trabajo.
*Implica:* la comisión del medio de pago puede no volver, y eso es el costo de haber intentado.
Es simple de explicar y defendible.

**B · Se devuelve menos la comisión.**
*Implica:* hay que decirlo antes del pago y en el correo de confirmación, o se vuelve un conflicto.

**C · Crédito para otro servicio en vez de devolución.**
*Implica:* en una primera venta, a un comprador que no te conoce, suena a no querer devolver. No
lo recomiendo para el primer kit.

### Lo que yo haría

**A**, con un plazo escrito para el caso 1 — cuántos días hábiles queda abierto un pedido
esperando el acceso antes de devolverse. Y la regla visible en la misma pantalla del pago, no solo
en un correo posterior.

### Lo que hay que averiguar antes de escribirla

- **Si Mercado Pago devuelve su comisión** en un reembolso. Está en los términos de tu cuenta.
- **Qué dice la ley del consumidor** sobre el derecho a retracto en una contratación electrónica
  como esta. **Es pregunta de abogado**, no se decide acá ni se infiere.

---

## Lo que NO está en esta página, y por qué

Hay una cuarta cosa que bloquea cobrar y que no es una decisión sino un trámite: **la facturación
electrónica de la SpA sigue pendiente.** Sin eso no se puede emitir el documento, con checkout o
sin él. Va antes que las tres.

Y una advertencia sobre el orden general: **el checkout no es lo próximo.** Quita fricción entre
«quiero comprarlo» y «pago», y hoy nadie llega a ese punto. Estas tres decisiones sirven para
vender el primer kit **a mano**, que es además la única forma de conseguir el dato que falta para
validar el precio: cuánto toma de verdad una entrega.

---

## Para decidir en una sentada

| | La decisión | Mi recomendación | Qué necesitas averiguar |
|---|---|---|---|
| 1 | Qué corrige el kit | El gestor de consentimiento, y la política como borrador para su abogado | Qué gestor, de quién es la cuenta, en qué plataformas corre |
| 2 | Qué página se vende | La que midió el chequeo, nombrándola | Nada |
| 3 | Si no se puede entregar | Se devuelve, con plazo escrito para el caso del acceso | Si MP devuelve su comisión · el retracto (abogado) |
