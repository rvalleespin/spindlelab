# Lectura estratégica de la referencia · driftime.com

**Fecha:** 29-sep-2026 · **Rama:** `claude/rebranding-webdev-exploracion`
**Encargo:** Ramón, en sesión. Tres miradas: dirección creativa, web, inteligencia de mercado.

Todo lo que sigue está **medido sobre el sitio cargado**, no descrito de memoria. Lo que es
inferencia mía va marcado como tal.

---

## 0 · El dato que motivó el encargo

Ramón: *«aún veo el tema de la visibilidad IA como el eje central cuando lo que quiero es
cambiarlo al desarrollo web»*. Tiene razón, y se puede medir. Contando el alto de cada
sección de nuestra home según qué marco domina su texto:

| | |
|---|---|
| Alto de la home con marco de **IA** | **55 %** |
| Alto con marco de **desarrollo web** | **31 %** |

Las tres primeras pantallas (hero, problema, las tres cosas) y el cierre son todas IA.
Desarrollo aparece en la pantalla 04 y no vuelve.

**La causa no es el reparto de secciones, es el hero.** Lo movimos todo menos eso: el
titular más grande del sitio sigue siendo una pregunta sobre la IA, con el instrumento de
la IA debajo. Un visitante decide de qué se trata el negocio en esa pantalla.

---

## 1 · La estructura, medida

La home de la referencia mide **11.097 px** en 8 secciones. La nuestra mide **11.345 px**
en 12. Mismo largo, la mitad de los movimientos.

Su recorrido:

1. **Hero** — `The Guide to your Hero™`, 120 px, peso 800, MAYÚSCULAS. Debajo, una frase de
   24 px que explica qué son.
2. **Cuatro campos de servicio**, uno por pantalla: `Strategy` · `Brand` · `Digital` ·
   `Reporting`. Cada uno 900-913 px, un color propio, la palabra a 120 px.
3. **Quiénes son / qué hacen**, otra frase de 24 px.
4. **Últimas publicaciones**, cuatro piezas a 30 px peso 500.

Nuestro recorrido tiene, además del hero y los cuatro campos: el bloque del problema, las
tres cosas, el renglón de precios, las tres herramientas, el método y el cierre. **Seis
movimientos más para decir lo mismo.**

---

## 2 · Bruno — dirección creativa

**El hallazgo principal: la palabra gigante es el NOMBRE del servicio, no una afirmación.**
`DIGITAL`. `BRAND`. `STRATEGY`. Una palabra, sin adjetivo, sin promesa. La promesa va en la
frase de 24 px de abajo. Nosotros hacemos lo mismo (`DESARROLLO`, `VISIBILIDAD`) y eso ya
está bien resuelto.

**Lo que no estamos haciendo: cada campo lleva CUATRO imágenes de trabajo, dentro del
bloque.** No en una página de portafolio aparte: pegadas al servicio, en la misma pantalla
donde se dice el precio. Nuestros campos llevan **una** imagen decorativa.

Esa es la diferencia que más pesa visualmente, y es exactamente el hueco que Ramón señaló:
ahí es donde van las piezas de cliente ficticio.

**El contraste tipográfico es extremo y no hay nada en medio.** Display a 120 px / cuerpo a
24 px. No existe un tamaño intermedio. Eso es lo que hace que sus pantallas se lean de un
golpe: hay exactamente dos niveles de lectura.

**Cero video en la home.** 25 imágenes, 0 elementos `<video>`. El video aparece en las
páginas de caso, no en la portada.

---

## 3 · Diego — web

**Las pestañas son botones reales (`role=tab`), no enlaces.** Cambian el contenido del
bloque sin cambiar de página. Eso importa para nosotros: el campo mantiene su color y su
palabra, y solo se reemplaza el párrafo, el precio y los botones.

**Cada campo mide exactamente una pantalla** (900-913 px contra un viewport de 900). Es la
misma regla que ya tenemos en `.campo`.

**El bloque completo, en orden:**

```
  PALABRA            120px · peso 800 · mayúsculas
  [ Tab A | Tab B ]  las dos modalidades
  descripción        24px · peso 400 · una a dos frases
  Fixed Fee  £15K + VAT
  [ Learn More ] [ Contact Us ]
  ■ ■ ■ ■            cuatro piezas de trabajo
```

**Lo que hay que construir de nuestro lado:** el estado de pestaña (sin JS el bloque tiene
que mostrar la primera modalidad completa, misma regla de degradación que el resto del v3),
y la tira de cuatro piezas por campo.

---

## 4 · Marco — inteligencia de mercado

**Publican precio fijo, y es el MISMO para tres de sus cuatro servicios: £15K + VAT.**
Brand, Digital y Reporting comparten cifra. Eso no es una lista de precios, es una decisión
de producto: el precio dejó de ser una variable de la negociación.

*(Inferencia mía, no medible en la página: un precio único por servicio simplifica la venta
y filtra al que no puede pagarlo, antes de la primera reunión.)*

**Dos modalidades en todo el catálogo, con la misma forma.** `Foundations` (una entrega
cerrada, precio fijo) y `Partnership` (relación continua). Strategy cambia la primera por
`Sessions`. La estructura se repite servicio por servicio, así que el cliente aprende el
modelo una vez y lo aplica a los cuatro.

**Nosotros tenemos las mismas dos modalidades, pero escondidas.** Desarrollo Web trae
`$390.000 · $690.000 · $1.190.000` apretados en una línea, sin decir qué separa a uno del
otro. Son tres planes presentados como tres números.

**El hero no vende un servicio, reclama un rol.** `The Guide to your Hero™`, con marca
registrada. No dice qué hacen: dice qué son para el cliente. Y nombran a la audiencia real
del comprador, no a la disciplina: *funders, policymakers, commissioners*. No dicen «SEO» ni
«UX» en toda la portada.

**Contraste con nuestro hero.** El nuestro es una pregunta sobre la IA más un instrumento de
diagnóstico. Es bueno como gancho y funciona, pero **declara que el negocio se trata de la
IA**. Por eso el giro a desarrollo web no se siente: el reparto de secciones cambió, el
primer golpe no.

---

## 5 · Qué recomiendo, en orden de impacto

### 5.1 · El hero (lo que de verdad mueve la aguja)

El brief de la troncal pedía «el chequeo sube al hero», y así se construyó. **Eso y «el
centro es el sitio web» se contradicen**, y hay que elegir.

Mi recomendación: **el chequeo se queda, el titular cambia.** El instrumento es el activo
diferenciador de la casa y no se toca. Lo que tiene que cambiar es qué afirma la palabra más
grande del sitio: hoy afirma «esto se trata de la IA». Debería afirmar algo sobre el sitio
que construimos, con el chequeo debajo como la prueba de que sabemos de qué hablamos.

**No lo aplico sin que Ramón lo mire.** Es la decisión más cara de la página.

### 5.2 · Las pestañas en el campo Desarrollo

Cambio directo y de bajo riesgo. Los tres precios apretados pasan a tres modalidades con
nombre, cada una con su párrafo y su cifra. El campo mantiene color, palabra y altura.

### 5.3 · La tira de trabajo dentro del campo

Cuatro piezas por campo, como la referencia. Acá entran las piezas de cliente ficticio, que
es lo que Ramón propuso: **ya existen dos**, en la rama `claude/portafolio-constructora`:

- **Raigal** — clínica de implantología
- **Aplomo** — constructora industrial B2B

Faltan dos para completar la tira del campo Desarrollo.

**Una advertencia que no es negociable:** una pieza de concepto tiene que estar rotulada
como tal. El manual prohíbe prueba social inventada, y una tira de trabajos sin rótulo se
lee como cartera de clientes reales. El `README` del portafolio ya fija esa regla; hay que
respetarla en el sitio.

### 5.4 · Lo que NO hay que copiar

- **El precio único.** Ellos cobran lo mismo por tres servicios distintos; nuestros seis
  precios son los que son y no se tocan.
- **La marca registrada en el hero.** `The Guide to your Hero™` funciona porque llevan años
  de trabajo detrás. Una casa nueva reclamando un rol con ™ se lee a inflado.
- **El video en la home.** No tienen. Nosotros pusimos uno, medido y montado tarde, y
  funciona. No hay que sacarlo por parecernos.

---

## Pendiente de decisión

1. **El titular del hero.** Es la contradicción entre el brief y el giro. Decide Ramón.
2. **Dos piezas de concepto más**, para completar la tira de cuatro del campo Desarrollo.
3. **Cómo se rotulan** las piezas de concepto en el sitio, para que ninguna se lea como
   cliente real.
