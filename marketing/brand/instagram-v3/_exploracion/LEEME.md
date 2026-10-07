# Exploración de dirección para Instagram (7-oct-2026)

**Por qué existe esta carpeta.** Ramón vio el kit y dijo: *«No me gustan mucho las gráficas. Las
imágenes no me convencen. Están muy poco creativas. Sé que la referencia es así pero encuentro muy
poco atractiva para la publicación.»* Es un rechazo de dirección, no de ejecución, y se atiende con
direcciones, no con retoques.

## El diagnóstico

**El kit es una traducción literal del sitio, y nunca tuvo una pasada de dirección propia para
Instagram.** El manual §10 hace muy bien el trabajo de convertir medidas (el factor 2,77, la
retícula, la escala), pero convertir medidas no es dirigir. Y los dos medios piden cosas distintas:

| | El sitio | Instagram |
|---|---|---|
| Cómo se consume | se recorre, con scroll y tiempo | se decide en una pasada de pulgar |
| El aire | es jerarquía: separa secciones | se lee como pieza vacía |
| La foto | acompaña al texto, como pieza con radio | es lo que detiene el pulgar |

Traducir 1:1 da piezas **correctas y mudas**: mucho negro, texto chico y una foto de pool
encajonada en una esquina. Por eso Ramón tiene razón, y por eso «la referencia es así» no alcanza
como defensa: la referencia es un sitio.

## Las dos direcciones (una sola pieza, para comparar peras con peras)

Las dos usan **el mismo texto, el mismo wordmark, la misma tipografía y la misma paleta**. Lo que
cambia es qué hace el trabajo visual.

### A · «La foto manda» — `A-foto-a-sangre.html`

La imagen deja de ser una pieza con radio y pasa a ser el lienzo. El texto se apoya arriba, sobre
el tercio que en `domino.jpg` es negro casi puro, **así que no hace falta velo ni gradiente**: la
legibilidad la da la foto. Medido tras el ajuste: la luminancia media del fondo bajo las dos líneas
del display es **82 de 255**, suficiente para texto papel.

- **A favor:** detiene el pulgar, la miniatura se reconoce en la grilla, y el territorio del dominó
  (§06b) por fin se ve en vez de insinuarse.
- **Costo declarado:** contradice **§07b** («la foto va como pieza, con radio, en su proporción») y
  **§10.6**. Si se elige, **esas dos reglas cambian para Instagram** y se escribe el porqué: en el
  sitio la foto acompaña, en el feed la foto es el primer argumento.
- **Lo que hay que cuidar:** solo sirve con fotos que tengan una zona oscura real donde apoyar el
  texto. Con una foto pareja habría que inventar un velo, y eso sí está prohibido.

### B · «La evidencia es la imagen» — `B-evidencia.html`

Sin foto. Lo que se muestra es el hallazgo: un `robots.txt` con `Disallow: /` bajo `GPTBot`, en el
mismo mono que el sitio usa dentro de sus tarjetas. **El fragmento es genérico e ilustrativo**, no
es de ningún prospecto; GPTBot es el rastreador real de OpenAI y esa línea lo bloquea entero.

- **A favor:** es la marca diciendo lo suyo. «Mostramos, no prometemos» deja de ser un eslogan y
  pasa a ser la composición. Y resuelve de raíz la queja de las fotos: no hay stock que convencer.
- **Costo declarado:** mete **un segundo acento** (el `Disallow` en brasa) junto al punto dorado, y
  §06 pide uno solo por pieza. Si se elige, o el `Disallow` va en papel, o el punto del wordmark va
  sin oro en estas piezas. **Hay que decidirlo, no dejarlo pasar.**
- **Lo que hay que cuidar:** no toda pieza tiene una evidencia que mostrar. Es una dirección para
  las piezas de hallazgo, no para las de oferta.

## Mi recomendación

**A como dirección base del feed, B como formato recurrente dentro de ella.** No se promedian: A
resuelve el problema de atención, que es el que Ramón está viendo, y B resuelve el de
diferenciación. Una grilla alternando fotos a sangre y láminas de evidencia se reconoce a tres
piezas de distancia, y ninguna de las dos se parece a la competencia.

**Lo que NO recomiendo:** quedarse con lo que hay y retocarlo. El defecto no está en el tamaño de
una foto, está en que el kit nunca decidió qué hace el trabajo visual en este medio.

## Si se elige una

No se toca el kit pieza por pieza. Se escribe primero qué cambia en §07b y §10.6 (dirección A) o en
§06 (dirección B), y recién después se rehacen las piezas contra esa regla nueva. Al revés es como
se llega a tres pasadas, que es lo que este repo ya aprendió a evitar.


---

# Decisión de Ramón (7-oct): va la A. Y dos encargos.

> *«Me gusta la A, pero tienes que hacerlo más entendible para un usuario de una pyme. El siguiente
> slide tiene que ser algo que le resuelva el dolor, contado de forma muy práctica, muy humana, que
> le haga ver que cuando la agencia que ya tiene le dé los números, entienda si el número está bien
> o mal. Eso podría ser un buen indicador para venirse conmigo.»*

**La B queda descartada, y la mató su propio comentario.** Un `robots.txt` con `Disallow: /` no le
dice nada a un dueño de pyme: es evidencia para alguien del oficio. La dirección B sirve para
LinkedIn, donde el lector es técnico; para el feed de Instagram, no.

## 1 · El titular, en castellano de pyme — `A-llano.html`

| | |
|---|---|
| Antes | «AHÍ SE CORTA EL CIRCUITO» |
| Ahora | «Y AHÍ LOS PIERDES» |

«Circuito» es la metáfora interna de §06b y en el sitio funciona, porque quien llega ya está
leyendo. **En el feed el lector es frío y no le debe nada a nuestra metáfora.** «Los pierdes» nombra
el dolor sin pedir que se entienda nada.

**El territorio no se pierde:** lo sostiene la foto del dominó, que es el molde declarado de §06b.
Se cambia la palabra, no el mundo.

## 2 · La lámina 2 — `A2-cuantos-te-escribieron.html`

La idea de Ramón es la más vendedora de la sesión: **darle al dueño una forma de juzgar lo que su
agencia le entrega.** La pieza le pasa tres preguntas que puede contestar hoy, sin pedirle permiso
a nadie, y cierra diciendo qué significa la respuesta.

**La restricción que la hizo honesta: cero benchmark inventado.** La salida fácil era decir «lo
normal es un 2 % de conversión» y dejar que se compare. **No tenemos ese dato**, y una cifra
inventada en una pieza es exactamente lo que el manual prohíbe. Así que el indicador **no es un
número nuestro: es un número que él ya tiene** en su teléfono y en su bandeja. Por eso funciona, y
por eso no se puede discutir: no le estamos pidiendo que nos crea.

**El remate es el puente al servicio**, sin vender: *«Si las visitas suben y estos no, el problema
no es traer gente. Es lo que encuentra cuando llega.»* Eso es Desarrollo Web dicho sin nombrarlo, y
enlaza de vuelta con la lámina 1.

**Por qué va sobre campo brasa y no sobre foto:** da el ritmo foto → color que hace que el carrusel
no sea monótono, y brasa es el pilar Desarrollo, que es el servicio que resuelve justo esto (§10.5).

## Lo que falta antes de producir el resto

1. **Elegir entre los dos titulares de portada** (`A-foto-a-sangre` o `A-llano`).
2. **Escribir el cambio en el manual antes de tocar el kit**: la dirección A contradice §07b y
   §10.6 (la foto como pieza con radio). Se escribe la excepción para Instagram con su porqué, y
   recién después se rehacen las piezas. Al revés es como se llega a tres pasadas.
3. **Las fotos tienen que tener una zona oscura real** donde apoyar el texto. Con una foto pareja
   habría que inventar un velo, y eso sigue prohibido. Es un criterio de selección, no un detalle.


---

# Ronda 2 (7-oct): el ángulo pasa a ser el Cyber, y tres correcciones

> *«Hay que mejorar la redacción… la segunda parte me gusta pero la encuentro un poco técnica…
> no está tan directo para decir, ya, si no recibiste los números de teléfono, entonces tu página
> no está resultando, estás gastando de más… y la escena de los dominós, hay una ficha que se
> devuelve, hazle un mejor encuadre para que sea en una sola dirección.»*
>
> Y después: *«estas gráficas tienen que ser alusivas al Cyber… apuntadas a la problemática de
> alguien que no le funcionó su sitio para el Cyber.»*

## 1 · El ángulo: Cyber

**El CyberMonday fue del 5 al 7 de octubre y terminó anoche.** Es la única semana del año en que
esta pregunta llega en el momento exacto: el dueño tiene los números frescos y la decepción
reciente. La portada pasa a pasado («Pagaste… y ahí los perdiste») y la lámina 2 pregunta por
**estos tres días**, no por el mes.

⚠️ **Ventana corta, y hay que decirlo:** el ángulo sirve esta semana. Pasada, el arranque se cambia
por temporada alta (noviembre y diciembre) y **el argumento se sostiene igual**, porque lo que
vende no es el Cyber: es que el dueño cuente sus mensajes.

## 2 · El encuadre: una sola dirección

En `domino.jpg`, al fondo a la derecha hay **una ficha inclinada en sentido contrario** al de la
caída. Leída rápido parece que la fila se devuelve, y eso rompe la lectura de «cae y se corta».
La foto se alinea a la izquierda (`object-position: 0% 50%`), lo que recorta los 270 px sobrantes
por la derecha. **Todas las fichas quedan cayendo hacia el mismo lado.**

## 3 · La redacción, en castellano de dueño

| | Antes | Ahora |
|---|---|---|
| Portada, ojillo | «Pagas para que lleguen a tu sitio.» | «Pagaste publicidad para el Cyber. Llegaron.» |
| Portada, titular | «Y AHÍ LOS PIERDES» | «Y AHÍ LOS PERDISTE» |
| Lámina 2 | tres preguntas en una tabla, con la fuente al lado | un gesto («Ahora abre tu teléfono») y **una** pregunta |
| Lámina 2, remate | «el problema no es traer gente» | «Si no te escribió nadie, esas visitas no valieron nada.» |

**La lámina 2 pasó de tres preguntas a una.** Tres se leen como formulario; una se contesta. Y el
cierre dice la conclusión en vez de insinuarla, que era el reparo de Ramón.

**Lo que NO se escribió, y es deliberado: «te vendieron humo».** Es la frase que Ramón usó para
explicar la idea, y como idea es correcta. Pero escrita en la pieza es una acusación a la agencia
que el lector tiene hoy, y el posicionamiento de la marca es **capacidad + resultado, nunca
contraste** (brief v2 §4.5, §10.10). La pieza dice el hecho —«esas visitas no valieron nada»— y
deja que la conclusión la saque él. Llega al mismo lugar y no nos pone a hablar mal de un tercero.

## 4 · Un defecto del sistema que apareció acá

**El display a interlínea 0,9 choca con las tildes.** En «AHORA ABRE / TU TELÉFONO», la tilde de la
É de la segunda línea subía al espacio de la primera y **se leía como una coma**: «AHORA,ABRE».
Corregido a 1,05 en la pieza y **anotado en §10.4 del manual**, porque le va a pasar a cualquier
titular en caja alta con acento fuera de la primera línea. En el sitio no se nota; en Instagram,
con titulares cortos y en mayúsculas, pasa seguido.
