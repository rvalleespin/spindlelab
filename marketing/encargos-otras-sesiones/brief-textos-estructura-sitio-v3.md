# Brief de textos y estructura — sitio v3

**Para:** la sesión que construye la v3 del sitio · **De:** la troncal · **27-sep-2026**
**Fundamento:** dos competidores chilenos revisados a mano esta semana
(`marketing/inteligencia-mercado/competidor-agencia-bull-2026-09-27.md` y
`competidor-brandandco-2026-09-27.md`). Cada recomendación de acá sale de algo verificado.

---

## 0 · ⚠️ ACTUALIZACIÓN DEL 28-SEP — el centro cambió, lee esto antes que nada

**Ramón decidió el 28-sep que el centro del motor es EL SITIO WEB**, no la visibilidad como
categoría. Queda canonizado en `marketing/oficina/clientes/spindlelab.md`. El resto de este brief
sigue vigente, con este ajuste:

- **El AEO deja de venderse como servicio central y pasa a ser la especificación del producto:**
  la razón por la que este sitio vale más que el de al lado.
- **Cuidado con el argumento fácil:** «a medida, sin plantillas» **lo dice toda la competencia**
  (verificado: Brand&Co, AnonimoDsn y Agencia Bull usan esa misma frase). No es diferenciador,
  es higiene. **No construyas el hero sobre eso.**
- **El argumento defendible es:** *un sitio que nace legible para las máquinas que hoy recomiendan
  tu negocio, y que se puede comprobar.* Se sostiene porque el chequeo lo demuestra gratis y
  porque las agencias que hacen sitios entregan sitios que fallan ese examen (Bull 46/100,
  Brand&Co 51/100 — el patrón se cuenta, los nombres no se publican).
- **El hero propuesto más abajo sigue sirviendo:** la pregunta sobre si la IA te nombra, con el
  campo del chequeo. Lo que cambia es lo que viene después: la respuesta al problema es **el
  sitio**, no un servicio de visibilidad.
- **Sigue habiendo puerta para quien ya tiene sitio y no lo va a rehacer.** No se cierra.

---

## 1 · La tesis, que es de dónde cuelga todo lo demás

Así se presentan las dos agencias revisadas:

> «Logramos que tu marca se vea, comunique y venda mejor.»
> «Potenciamos marcas en el mundo digital.»

Las dos **prometen**. Ninguna le puede demostrar nada al visitante antes de que les pague. Y las
dos, medidas con el instrumento de la casa, sacan **46 y 51 sobre 100** en visibilidad para
motores de IA. Una tiene un `llms.txt` que manda a ChatGPT a tres URLs rotas; la otra tiene el
que Shopify genera solo, que le dice a las IA que es una tienda con productos.

**SpindleLab tiene lo único que ninguna tiene: un instrumento que le muestra al visitante su
propio problema en 30 segundos, gratis y sin registro.**

> **La decisión estructural más importante de la v3: el chequeo deja de ser una página y pasa a
> ser la portada.** Hoy vive en `/diagnostico/`, como un servicio más. Debe subir al hero.

El lema ya dice *«No te prometo. Te muestro»*. Hasta ahora eso es una frase en una sección de
marca. **En la v3 tiene que ser la arquitectura del sitio:** el visitante no lee lo que hacemos,
lo comprueba sobre su propio dominio antes de leer una sola línea de venta. Eso es lo que ninguna
de las dos agencias puede copiar esta semana, porque requiere el motor, no un copy nuevo.

---

## 2 · Qué tomar de cada competidor, y qué no

### De Agencia Bull — **tomar**
1. **Las herramientas gratuitas como sistema, no como pieza suelta.** Ellos tienen tres (auditoría
   automatizada, playbook con registro, quiz de arquetipo) y las exhiben como un bloque. SpindleLab
   tiene dos activos reales —el chequeo de visibilidad en IA y el de Ley 21.719— y los trata como
   cosas separadas. **En la v3 van juntos, bajo un rótulo tipo «Herramientas gratis».** Es el mismo
   movimiento de captación, con la ventaja de que las nuestras miden algo que las suyas no.
2. **Un `llms.txt` escrito a mano, con estructura de respuesta.** El de ellos está mejor redactado
   que su propio sitio: descripción, servicios, clientes, precios y FAQ, en prosa que una IA puede
   citar entera. **El de SpindleLab tiene que ser el mejor del mercado chileno: es literalmente lo
   que vendemos.** Si el nuestro es mediocre, el argumento entero se cae.
3. **Decir el precio de partida en la respuesta a la pregunta**, no escondido en una tabla. Su
   `llms.txt` responde «¿cuánto cuesta un sitio?» con un rango. Eso es exactamente lo que una IA
   cita cuando alguien pregunta.

### De Agencia Bull — **no tomar**
- Su portada de **52 palabras** renderizadas (12 sin JavaScript) y **cero datos estructurados**.
  Es un sitio hecho para impresionar a un humano y para no existir para una máquina.

### De Brand&Co — **tomar**
1. **Planes ordenados por etapa del negocio, no por tamaño del entregable.** Su encabezado es
   *«Elige el plan que necesita tu marca hoy»*. Le habla al momento del cliente, no al catálogo.
   La página de servicios actual de SpindleLab ya insinúa esto («¿por dónde empezar?»); en la v3
   debe ser el criterio de orden, no una tabla al final.
2. **Separar por tipo de necesidad con pestañas** (ellos: e-commerce / web informativa). Reduce la
   sensación de menú infinito sin esconder nada.
3. **Precios comparables y a la vista.** Ellos publican en UF. SpindleLab ya publica en pesos, que
   para su cliente es más claro. **Mantenerlo y decir que se publica a propósito**, porque es un
   diferencial real: la mayoría del rubro no lo hace.

### De Brand&Co — **no tomar**
- Título duplicado, cero meta description, un typo en la portada y un `llms.txt` automático que
  le dice a las IA que son una tienda. **Descuido técnico en una agencia que vende oficio digital.**

---

## 3 · La estructura de la home, sección por sección

> Los textos de abajo son **propuestas de trabajo**, no copy final. Renata pasa el tono; Ramón
> aprueba. Lo que no se negocia es el **orden** y el **porqué** de cada bloque.

### Bloque 1 — Hero: la prueba, no la promesa
**Qué cambia:** hoy el hero explica un concepto («un motor de adquisición»). En la v3 **abre con
una pregunta que el visitante puede responder ahí mismo**, con el campo del chequeo debajo.

> **Cuando tu cliente le pregunta a una IA quién puede ayudarlo, ¿aparece tu nombre?**
>
> Pega tu dirección web y te lo decimos en 30 segundos. Sin registro, sin dejar tu correo.
>
> `[ tuempresa.cl ]  [ Revisar mi sitio ]`
>
> *Revisamos 21 señales técnicas. Es el mismo chequeo con el que partimos cada proyecto.*

**Por qué así:** resuelve las dos objeciones que quedaron abiertas. No es abstracto como «motor de
adquisición», y **no excluye al que ya tiene sitio** —que es la mayoría del nicho legal donde hoy
hay respuesta—, cosa que sí hacía «sitios web preparados para la IA».

### Bloque 2 — El problema, contado con evidencia propia
Mantener la estructura actual (problema → demostración), pero **cambiar el argumento genérico por
el dato propio**:

> De los últimos 69 sitios que revisamos, **67 tenían el mismo problema**: ni una sola pregunta
> respondida en un formato que una IA pueda citar. No eran sitios malos. Estaban escritos para
> que los lea una persona, no la máquina que hoy responde por su rubro.

**Por qué:** las dos agencias afirman sin probar. Un número propio y verificable es la diferencia
entre decir «somos técnicos» y demostrarlo. **El dato existe y es real; no se infla.**

### Bloque 3 — La conversación simulada (se conserva)
Funciona y ninguna competidora tiene algo parecido. **Mantener el rótulo de «simulada»**: esa
honestidad es parte del activo, no un descargo legal.

### Bloque 4 — Qué hacemos, ordenado por el momento del cliente
Tomar el criterio de Brand&Co, con la jerarquía de SpindleLab:

> **¿Por dónde te toca partir?**
> - **Tu sitio existe y no lo van a rehacer** → Visibilidad en IA · Auditoría SEO Técnica
> - **Tu sitio te frena o no existe** → Desarrollo Web (con el SEO técnico y el AEO puestos desde
>   el primer commit, no parchados después)
> - **Ya giras y quieres sostenerlo** → Acompañamiento Mensual

**Por qué:** conserva la puerta para quien ya tiene sitio **y** deja Desarrollo Web al frente para
quien lo necesita, sin obligar a elegir entre las dos cosas. Precios **exactamente como están**.

### Bloque 5 — Herramientas gratis (bloque nuevo, idea tomada de Bull)
> **Herramientas que puedes usar sin hablar con nadie**
> - **Chequeo de visibilidad en IA** — 21 señales, 30 segundos, sin registro.
> - **Verifica y Cumple** — si tu sitio cumple lo técnico de la Ley 21.719, que entra en vigencia
>   el 1 de diciembre.
> - **La metodología completa, publicada** — cómo se calcula cada punto del chequeo.

**Por qué:** es el movimiento de Bull con activos mejores, y la tercera línea es la jugada de
autoridad que ninguna competidora puede igualar sin abrir su método.

### Bloque 6 — Quién está detrás (se conserva)
Cara, nombre y trayectoria real. **Ventaja competitiva no obvia:** las dos competidoras son
«agencias» sin rostro. Un responsable con nombre es más verificable, que es justo lo que vende
la marca.

### Bloque 7 — Cierre
Mantener el cierre bajo, sin urgencia fabricada (regla de voz).

---

## 4 · Lo que hay que arreglar sí o sí en la v3 (técnico)

**El sitio tiene que ser el mejor ejemplo de lo que vende.** Hoy lo es en parte y ahí está la
ventaja: las dos competidoras fallan su propio examen. Lista mínima:
- **Datos estructurados completos en cada página** (las dos competidoras tienen cero).
- **Todo el contenido legible sin JavaScript** (Bull: 12 palabras sin JS).
- **`llms.txt` reescrito a mano**, con FAQ y precios de partida en prosa citable.
- **`sitemap.xml` válido** (el de Bull devuelve HTML).
- **Meta description y título únicos por página** (Brand&Co falla las dos).
- **Que el sitio pase su propio chequeo con el puntaje más alto posible**, y que ese número se
  pueda mostrar. Es la prueba final del argumento.

---

## 5 · La debilidad honesta que este brief no puede resolver

**No hay casos públicos.** Las dos competidoras exhiben clientes con nombre; SpindleLab tiene dos
clientes y **el permiso de caso público sigue sin pedirse desde julio**. Mientras eso no exista:
- **No se inventa ni se insinúa prueba social.** Regla dura de la casa.
- Se compensa con **evidencia propia verificable**: los 69 sitios revisados, la metodología
  publicada, el chequeo que cualquiera puede correr sobre el sitio de SpindleLab.
- **El pedido de permiso es la tarea de más alto retorno del trimestre** y no depende del sitio.

---

## 6 · Reglas que no se tocan
1. **Precios exactamente como están** (decisión de Ramón, 27-sep). Si algo parece fuera de lugar,
   se anota como observación.
2. **Ningún competidor se nombra en el sitio.** El patrón se puede contar en abstracto; los
   nombres, jamás.
3. **Voz de marca intacta:** singular para lo observado, plural para lo que entrega el negocio.
   Sin urgencia fabricada, sin superlativos, sin guion largo de impacto.
4. **Cero prueba social inventada.** Ni una cifra que no se pueda reproducir.
5. **No prometer monitoreo continuo de menciones en IA** hasta que escale
   (`marketing/capacidad-servicios.md` lo marca ❌).

---
**Estado:** ⬜ entregado a la sesión del sitio v3 · fundamento verificado el 27-sep
