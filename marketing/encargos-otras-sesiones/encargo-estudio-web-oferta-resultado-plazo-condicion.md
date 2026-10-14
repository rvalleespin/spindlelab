# Encargo al Estudio Web — la oferta del v3 reescrita con resultado, plazo y condición

**De:** Marco (inteligencia de mercado) · **14-oct-2026**
**Para:** la sesión de diseño web (Mauro encuadre · Clara copy de interfaz · Diego construcción · Javiera QA)
**Toca:** `spindlelab-astro/src/data/oferta-v3.json` y las fichas de servicio del v3
**Aprueba:** Ramón. Nada de esto se publica sin su pase.

---

## 1. El hallazgo, en cuatro líneas

Tres fuentes independientes llegaron el mismo día a la misma conclusión:

1. **El mercado** ([estudio del 14-oct](../inteligencia-mercado/2026-10-estudio-categoria-llena-y-sitio-nuevo.md)):
   la categoría AEO/GEO chilena se llenó de nombres y está vacía de pruebas. De cinco directos
   revisados uno por uno, **ninguno muestra un caso verificable de citación en IA**.
2. **Las ventas propias:** 2 de 2 clientes cerrados son Desarrollo Web, por referido. Cero del
   embudo AEO.
3. **Un video de un operador** (Agustín Medina, 20 min, [veredicto en el laboratorio](https://github.com/rvalleespin/spindlelab/blob/laboratorio/ideas/laboratorio/videos/2026-10-14-730-dias-gurus-agustin-medina.md)):
   vender la construcción es vender una commodity, porque su precio cae con cada mejora de la IA.
   El precedente es Wix: murieron las agencias que vendían "te hago una web" y sobrevivieron las
   que vendían "te consigo clientes con la web".

**Lo que esto le pide a la oferta:** hoy el v3 lista entregables (páginas, idiomas, semanas).
Un entregable se compara línea a línea y se regatea. Una promesa con **resultado, plazo y
condición** se compara con lo que vale el resultado. La condición es lo que la hace creíble:
dice qué parte depende del cliente, y por eso no suena a promesa de agencia.

**La regla dura, para no cruzar la línea de la marca:** solo se promete lo que controlamos y
medimos. El puntaje del chequeo, el acceso de los agentes, la indexación, el schema, la
velocidad, los plazos. **Nunca una cita en un modelo**, porque las respuestas de los LLM son
probabilísticas y eso no depende de nosotros.

---

## 2. Un defecto verificable que arreglar en el mismo pase

`oferta-v3.json` dice **dos veces** (en el item y en el plan de Visibilidad en IA):

> *"Para que ChatGPT, Gemini y Perplexity puedan citarte cuando preguntan por tu rubro."*

Y `public/assets/js/v3-chequeo.js` también nombra a Gemini. **Contradice la narrativa de bots
corregida el 8-sep** (ficha de cliente, "motor v2") y contradice al propio sitio: `trabajo.astro`
ya fue corregido en su QA del 6-oct por esto mismo, y hoy dice **ChatGPT, Claude y Perplexity**.

El dato: `functions/api/chequeo.js` prueba OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
Claude-User, PerplexityBot y Perplexity-User **en vivo**; Google-Extended, GPTBot y CCBot son de
**entrenamiento**. Prometer que Gemini "pueda citarte" apoyado en Google-Extended es exactamente
el argumento que la casa se prohibió.

**Arreglo:** reemplazar Gemini por Claude en las dos entradas de `oferta-v3.json` y en
`v3-chequeo.js`, dejando la misma trinca que ya usan el índice de servicios, el diagnóstico y
`trabajo.astro`.

---

## 3. La oferta reescrita

Registro **plural** (es la marca la que entrega). Tuteo. Sin guion largo. Cada bloque es
`Resultado · Plazo · Condición`, pensado para caer bajo la bajada que ya existe en cada plan, sin
reemplazarla.

### Desarrollo web

**Página de Campaña — desde $390.000 + IVA**
> **Resultado.** Tu página sale publicada, midiendo desde el primer día, y con los agentes de
> ChatGPT, Claude y Perplexity pudiendo entrar a leerla.
> **Plazo.** Una semana desde que tenemos textos, imágenes y accesos.
> **Condición.** Siempre que el material llegue completo en los primeros tres días y las
> aprobaciones no se detengan más de 48 horas.

**Sitio Esencial — desde $690.000 + IVA**
> **Resultado.** Hasta cinco páginas publicadas e indexables, con schema y velocidad en verde, y
> el chequeo corrido sobre tu dominio el día de la entrega para que veas el puntaje con el que
> sales a la calle.
> **Plazo.** Tres semanas desde el arranque.
> **Condición.** Siempre que los contenidos lleguen en la primera semana y el dominio esté a tu
> nombre y con acceso.

**Sitio Completo — desde $1.190.000 + IVA**
> **Resultado.** Hasta doce páginas, el blog que administras tú, y la puesta a punto para que las
> máquinas que hoy recomiendan tu rubro puedan leerte. Si hoy tienes sitio, corremos el chequeo
> antes y el día de la entrega, y la diferencia queda por escrito.
> **Plazo.** Entre cuatro y seis semanas.
> **Condición.** Siempre que los contenidos lleguen por etapas según el calendario que fijamos al
> arrancar.

### Visibilidad en IA — $400.000 (pago único)

> **Resultado.** Terminas con tu línea base medida y con las correcciones ordenadas por impacto,
> no con una lista de hallazgos. Sabes qué te frena, en qué orden se arregla y cuánto mueve cada
> arreglo.
> **Plazo.** Dos semanas desde que tenemos acceso.
> **Condición.** Siempre que podamos ver el sitio y su analítica.
>
> *Lo que no prometemos:* que un modelo te cite. Eso no lo controla nadie. Lo que sí: que cuando
> alguien pregunte por tu rubro, tu sitio esté en condiciones de ser la respuesta.

### Auditoría SEO técnica — $490.000 ($690.000 con Visibilidad en IA)

> **Resultado.** Rastreo, indexación, Core Web Vitals y datos estructurados revisados a mano, con
> el plan de corrección priorizado por lo que más te cuesta hoy.
> **Plazo.** Dos semanas.
> **Condición.** Siempre que tengamos acceso a Search Console y al código del sitio.

### Acompañamiento mensual

**Esencial — desde $590.000/mes + IVA**
> **Resultado.** En noventa días tu sitio sube en el chequeo desde el puntaje con el que partimos,
> y los agentes en vivo de ChatGPT, Claude y Perplexity pueden entrar a todas tus páginas clave.
> Cada quince días te llega el informe con el número de hoy al lado del de la quincena anterior.
> **Plazo.** Noventa días para el primer salto medido. El trabajo sigue mes a mes.
> **Condición.** Siempre que los cambios técnicos se aprueben dentro de los plazos que acordemos.
> Si no se implementan, el número no se mueve, y lo vas a ver en el mismo informe.

**Pro — desde $790.000/mes + IVA**
> **Resultado.** Las dos capas juntas, técnica y de visibilidad, con el mismo compromiso de
> noventa días y cobertura de más páginas y más consultas medidas.
> **Plazo y condición.** Los mismos del Esencial.

---

## 4. La prueba que hace creíble todo lo anterior, y que ya existe

El portafolio del v3 registra **lo construido** ("una home"), no un resultado medido. Es el mismo
vacío que tiene todo el mercado, y la diferencia es que acá hay con qué llenarlo hoy, sin pedirle
permiso a nadie:

- **spindlelab.cl: 36/100 el 10-sep → 100/100 el 14-oct.**
- **verifica.spindlelab.cl: 100/100 al 14-oct.**

Ambos corridos en vivo contra `verifica.spindlelab.cl/api/chequeo`, con el mismo instrumento que
está en el hero y que el visitante puede correr sobre su propio dominio en segundos.

**Lo publicable no es el 100.** Un 100 medido con la vara propia es autorreferencial y se lee como
tal. Lo publicable es **el antes y el después con fecha**, diciendo cuál es la vara y dejando que
cualquiera la corra. Esa es la pieza que falta, y es la que nos pone en el único cuadrante que el
mercado tiene vacío.

**Sugerencia de ubicación** (decide el encuadre, no este encargo): la ficha de Verifica y Cumple
en `trabajo.astro` es el lugar natural. Es obra propia, no necesita permiso de cliente, y es
donde el número no compite con el trabajo del cliente.

---

## 5. Lo que este encargo NO pide

- **No pide tocar precios.** Los montos quedan como están.
- **No pide cambiar el hero.** El chequeo en la portada es lo mejor del v3 y es la diferenciación
  que el estudio llama defendible. No se toca.
- **No pide inventar un caso de cliente.** Si Combeau da permiso para publicar un número, es
  decisión de Ramón y va aparte.
- **No pide copiar el vocabulario del video.** El nombre de su modelo es su marca y su embudo.
