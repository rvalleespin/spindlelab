# Encargo a Codex: pulir el checkout, que está en vivo y con campaña pagada encima

**Urgencia real:** hay una campaña de Meta corriendo y entrando gente al sitio **ahora mismo**.
Cada defecto que quede es una persona que se va. No es un ejercicio.

---

## Qué pasó hoy, para que no busques donde ya se buscó

El checkout estuvo caído varias horas y la causa fue una cadena de tres cosas, todas ya
corregidas:

1. **`MP_ACCESS_TOKEN` llegaba vacío a la función.** El panel lo muestra cargado («Value
   Encrypted») pero su valor está vacío o es solo espacios. Ramón lo va a recargar.
2. **Cloudflare intercepta las respuestas 5xx** que salen de una Pages Function y las reemplaza
   por su propia página en texto plano. Por eso el mensaje de error nunca llegaba a la persona.
   Ya no se usa ningún 5xx de cara al navegador.
3. **El navegador decía «revisa tu conexión»** cuando el problema era nuestro, porque no
   distinguía «el fetch no llegó» de «llegó y no pude leer la respuesta».

Y el tope de abuso estaba en 5 intentos por IP al día contando también los rechazos nuestros,
así que un fallo propio dejaba a la persona fuera del sitio el resto del día. Ya está en 15 y
solo cuenta las llamadas que de verdad cuestan.

**No vuelvas a reportar nada de eso.** Lo que necesito es lo que todavía no vimos.

---

## El sistema

Sitio estático + Cloudflare Pages Functions (runtime de Workers: Web Crypto, sin Node, sin npm
en runtime) con D1 y KV. Vende un kit de cumplimiento de la Ley 21.719 por $177.310 IVA incluido.

Código en `/Users/ramon/vyc-ley21719/verificaycumple/functions/api/`:
`pedido.js` (GET lee el pedido, POST lo crea y abre el pago), `webhook-mp.js`, `firma-mp.js`,
`cobro.js`, `pedidos.js`, `almacen.js`, `elegibilidad.js`, `etapas.js`, `intake.js`,
`chequeo.js`, `profundo.js`, `doce-puntos.js`.
Front en `public/index.html` (el chequeo y el paso de compra) y `public/pedido/index.html`.
Pruebas en `/Users/ramon/vyc-ideas/laboratorio/01-cumplimiento-ley-21719/pruebas/`, se corren
con `node prueba-X.mjs`. Hoy están en **862 aserciones en verde**.

---

## Lo que necesito, en orden de lo que más duele con tráfico encima

### 1. Lo que la persona VE cuando algo sale mal

Recorre **todos** los caminos de error del checkout y del intake, y para cada uno pregunta:
¿el texto que aparece en pantalla es cierto, es accionable, y no culpa a la persona de algo
nuestro? Ya encontramos uno que decía «revisa tu conexión» cuando la conexión estaba bien.
Busca los demás, incluidos los de `etapas.js` que se ven en la pantalla del pedido.

### 2. Lo que se rompe con gente real y no con una prueba

- Alguien que abre dos pestañas y compra en las dos.
- Alguien que vuelve con el botón «atrás» del navegador después de pagar.
- Alguien en un móvil con conexión mala, que toca dos veces porque no pasó nada.
- Alguien que cierra la pestaña a medio pagar y vuelve al rato.
- Alguien que llega con el enlace de un chequeo viejo.
- Alguien cuyo sitio cambió entre que vio el resultado y que apretó comprar.

Para cada uno: ¿qué pasa de verdad, leyendo el código? ¿Queda plata o pedidos en un estado
raro? ¿Qué ve la persona?

### 3. Accesibilidad y móvil del paso de compra

La mayoría del tráfico de una campaña de Meta llega desde el teléfono. Mira el formulario
`#compra` de `public/index.html` y el del intake en `public/pedido/index.html`: etiquetas
asociadas, foco visible, orden de tabulación, tamaño de los objetivos táctiles, contraste,
mensajes de error anunciados a un lector de pantalla, teclado correcto en cada campo.

### 4. Lo que una campaña pagada necesita y quizá no está

Los parámetros de campaña (UTM) llegan a la página y el pedido tiene columnas para guardarlos.
**Comprueba si de verdad se guardan**, siguiendo el camino entero desde la URL hasta la fila de
D1. Si una venta no se puede atribuir a la campaña que la trajo, la campaña no se puede medir ni
optimizar, y eso con presupuesto corriendo cuesta dinero.

### 5. Lo que sigue sin estar probado

Las pruebas están en 862 aserciones y el estándar es validarlas rompiendo el código a propósito.
Dime **qué partes del camino del dinero no tienen ninguna prueba que las proteja**, y cuáles
tienen una que pasaría igual con el código roto.

---

## Reglas

- **No apliques cambios al código.** Reporta hallazgos. Hay tráfico real y los cambios los
  reviso y despliego yo.
- Nada de reescrituras grandes, frameworks, ORMs ni librerías de prueba: no hay `npm` en
  runtime y las pruebas corren con Node pelado a propósito.
- La base ya está en producción: una migración de esquema es una decisión, no un detalle.
- Si no puedes reproducir algo leyendo el código, dilo como **sospecha**, no como hallazgo.

## Dónde dejas tu respuesta

`/Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/marketing/encargos-otras-sesiones/revision-codex-pulido-checkout.md`

Un bloque por hallazgo: **dónde** (archivo:línea), **gravedad**, **escenario** concreto, **qué
ve la persona**, **arreglo** acotado, y **cómo comprobarlo**. Ordena por lo que más daño hace
con tráfico encima, no por tipo. Y cierra con **«lo que miré y está bien»**.
