# Política de privacidad de Verifica y Cumple · borrador de la versión 1.6

**Qué es esto:** el texto que reemplaza cinco de los doce puntos de
`verificaycumple.cl/privacidad/` cuando se encienda el cobro en línea.
**Fecha del borrador:** 23 de octubre de 2026.

> ⚠️ **Esto es un borrador y la revisión final es de abogado.** Es la misma regla que el producto
> le aplica a sus clientes con la plantilla del kit: nosotros escribimos la capa técnica, el texto
> legal lo revisa quien corresponde.

---

## Cuándo se publica, y por qué importa

La política v1.5 tiene escrita esta promesa, en el punto 11:

> *«Si algún día sumamos algo más que te pida datos, actualizamos esta política antes de
> encenderlo.»*

Eso fija el orden. Pero hay una trampa en el otro sentido: **la 1.6 tampoco se puede publicar
antes.** Si dice «tenemos una base de datos con los pedidos» y todavía no existe, es falsa al
revés, y en una página que se lee ordenada por los doce puntos del Art. 14 ter.

**Se publica el mismo día que se enciende el cobro.** Antes, no; después, tampoco.

---

## Las cuatro frases de la v1.5 que un checkout vuelve falsas

| Dice hoy | Dónde | Qué pasa |
|---|---|---|
| «un proceso que no guarda nada y no tiene una base de datos detrás» | 05 | el pedido tiene que persistir |
| «el dominio que escribes y tu resultado existen solo el tiempo que toma responderte» | 05 | el diagnóstico queda pegado al pedido |
| «No tenemos una base de datos propia con los pedidos» | 05 | va a haberla |
| «los tres proveedores que usamos» | 05 y 08 | Mercado Pago es el cuarto |

Y una quinta, en el punto 09: *«El dominio que revisas y el resultado de tu chequeo no se guardan
en ninguna parte.»*

---

## 01 · Esta política

> Esta es la versión 1.6. Si la cambiamos, actualizamos la fecha de arriba.
>
> En esta versión abrimos el pago en línea del kit, y eso cambia cosas que antes eran ciertas.
> Ahora sí guardamos tu pedido en una base de datos nuestra, con el dominio que revisaste y el
> resultado de tu chequeo pegados a él, para poder entregarte el trabajo y mostrarte en qué va
> (puntos 04, 05 y 09). Y sumamos a Mercado Pago, que es quien procesa el pago (punto 08). Los
> datos de tu tarjeta no pasan por este sitio en ningún momento.
>
> *(Y el párrafo de la 1.5 sobre el Pixel de Meta, y los de las versiones anteriores, se quedan
> igual debajo.)*

---

## 04 · Qué datos procesamos, y para qué

**Se agrega un bloque nuevo, después del formulario y antes del conteo de visitas:**

> **Si compras el kit.** Al momento de pagar te pedimos lo necesario para entregarte el trabajo y
> para emitir tu documento tributario: tu nombre y tu correo, y los datos de tu empresa —razón
> social, RUT, giro y dirección—. A eso le quedan pegados el dominio que revisaste y el resultado
> del chequeo que disparó la compra, porque es lo que define qué hay que arreglar.
>
> La base de legitimidad acá es doble: **la ejecución del servicio que contrataste**, y para el
> documento tributario, **una obligación legal nuestra**.
>
> **Los datos de tu tarjeta no pasan por este sitio.** El pago lo procesa Mercado Pago en su
> propia página (punto 08). Nosotros recibimos de vuelta solo si el pago quedó aprobado,
> pendiente o rechazado, y un identificador de la operación. Nunca el número de tu tarjeta.
>
> Después del pago te vamos a pedir además **un acceso temporal a tu sitio** para poder trabajar.
> Nunca te vamos a pedir una contraseña, ni por formulario ni por correo.

---

## 05 · Cómo protegemos lo que pasa por acá

**Reemplaza los dos párrafos actuales.** Ojo con el título: hoy dice «lo poco que pasa por acá», y
con una compra adentro ya no es poco.

> Todo el sitio viaja cifrado por HTTPS, así que lo que escribes en él no se puede leer en el
> camino.
>
> **El chequeo gratuito sigue sin guardar nada.** Corre en Cloudflare, el dominio que escribes y
> tu resultado existen solo el tiempo que toma responderte, y no te pedimos correo ni creamos
> ninguna cuenta.
>
> **Lo que sí guardamos es tu pedido, si compras.** Ahí tenemos una base de datos nuestra, alojada
> en Cloudflare, con tus datos de contacto y facturación, el dominio, el resultado del chequeo, el
> estado del pago y en qué va el trabajo. La necesitamos para entregarte el kit y para que puedas
> ver el avance. **Los datos de tu tarjeta no están ahí, porque nunca llegan a este sitio.**
>
> El formulario lo procesa Web3Forms, que nos lo reenvía a nuestro correo, alojado en Google
> Workspace. Los pedidos y las preguntas que llegan por ahí quedan en ese correo y en la copia que
> guarda Web3Forms (punto 09).
>
> Los cuatro proveedores que usamos se comprometen en sus términos a medidas de seguridad que
> incluyen cifrar los datos (punto 08).

⚠️ **Hay que verificar antes de publicar:** dónde queda alojada esa base de datos. El texto de
arriba dice Cloudflare porque es donde corre el resto. Si se implementa en otro lado, se corrige
acá.

---

## 08 · Quién más procesa tus datos, dónde y con qué protección

**Cambia el primer párrafo** («tres proveedores» pasa a cuatro, y Meta era «un cuarto»; ahora hay
cinco contando a Meta, que sigue siendo condicional).

> No tenemos servidores propios. El sitio funciona sobre cuatro proveedores de afuera, así que tus
> datos se pueden procesar fuera de Chile. Esto es lo que hace cada uno.

**Se agrega, después de Google y antes de Meta:**

> **Mercado Pago** (de Chile, parte de MercadoLibre) procesa el pago del kit. Cuando pulsas el
> botón de pagar, te lleva a su propia página, y ahí escribes los datos de tu medio de pago, que
> **nunca pasan por este sitio**. Mercado Pago nos devuelve si el pago quedó aprobado, pendiente o
> rechazado, y un identificador de la operación. Procesa esos datos según sus propios términos y
> su política de privacidad.

⚠️ **Hay que completar antes de publicar:** el enlace a los términos de tratamiento de datos de
Mercado Pago, y confirmar si para la cuenta de la SpA aplican los de Chile o los regionales. Es
dato de la cuenta, no se infiere.

**Y el párrafo de «con qué protección» cambia «estos tres proveedores» por «estos cuatro».**

---

## 09 · Cuánto tiempo se guarda

**Reemplaza el primer párrafo y agrega uno:**

> El dominio que revisas y el resultado de tu chequeo **no se guardan en ninguna parte, mientras
> no compres nada.**
>
> **Si compras el kit**, tu pedido sí queda guardado: tus datos de contacto y facturación, el
> dominio, el resultado del chequeo que disparó la compra, el estado del pago y el avance del
> trabajo. Lo conservamos mientras dure la entrega y después, por el plazo que la normativa
> tributaria nos obliga a mantener el respaldo de la venta: **[PENDIENTE: el plazo. Es pregunta de
> contador, no se infiere]**. Pasado eso, lo borramos.
>
> *(Los párrafos actuales sobre el formulario, Cloudflare y la cookie del Pixel se quedan igual.)*

---

## 12 · El chequeo lo hace un programa, no una persona

**Se agrega un párrafo.** Esto no estaba en la lista original de cinco, y aparece al escribirlo:
con un checkout, **el puntaje automático pasa a decidir si se te ofrece comprar o no.**

> El puntaje y las señales de tu resultado salen de reglas automáticas, sin revisión humana caso
> por caso. *(El párrafo actual, igual.)*
>
> **Desde que existe el pago en línea, ese resultado automático decide además una cosa más:** si
> tu chequeo no dejó ninguna señal pendiente, o si no pudimos medir tu sitio, no te ofrecemos el
> kit, porque no habría nada que arreglar o no sabríamos qué arreglar. En esos casos te
> proponemos escribirnos. No es una decisión sobre ti ni sobre tu empresa: es sobre lo que
> alcanzamos a ver de tu sitio, y puedes escribirnos igual para que lo miremos a mano.

---

## Lo que falta para poder publicarla

| Dato | A quién se le pregunta |
|---|---|
| El plazo de conservación tributaria del respaldo de la venta | contador |
| Los términos de tratamiento de datos de Mercado Pago para la cuenta de la SpA | la cuenta |
| Dónde queda alojada la base de datos de pedidos | quien implemente |
| La redacción de las bases de legitimidad | abogado |

Los tres primeros son datos. El cuarto es criterio legal, y es la misma regla que el producto le
aplica a sus clientes.
