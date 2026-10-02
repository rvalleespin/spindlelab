# Fase 1 — resultado · y por qué la compuerta 2 no se abre

**2-oct-2026.** 16 agentes, 0 errores, 3,3 M tokens, 93 minutos.
52 hallazgos · 15 bloqueantes de conversión · 34 referencias (29 verificadas) ·
2 direcciones construidas y renderizadas · 6 críticas independientes.

## Veredicto: ninguna de las dos direcciones sobrevivió

| | Dirección A · el instrumento manda | Dirección B · la afirmación manda |
|---|---|---|
| Anti-slop | **no pasa** | **no pasa** |
| Conversión | **no pasa** | **no pasa** |
| Marca y voz | **no pasa** | pasa con reparos |
| Bloqueantes | 9 | 7 |

Cinco de seis veredictos son "no pasa". Ningún crítico vio la conversación donde se
construyó lo que auditaba.

## Por qué no se abre la compuerta

**1 · Las dos direcciones no se oponen.** Comparten la primera frase de la bajada
carácter por carácter, la misma cláusula de cierre en la nota, la misma segunda puerta
como enlace subrayado en la misma posición, la misma paleta, cero imagen y cero campos de
color. Lo único que las separa es **qué elemento toma el tamaño display**: el campo en A
(93,6 px) con el titular bajado a 24 px, el titular en B (120,96 px) con el campo a 32 px.
Preguntar cuál se elige es preguntar por un tamaño de letra, no por una dirección.

**2 · Las dos fallan por lo mismo.** Seis defectos aparecen en ambas: ninguna captura
dato, ninguna trae plan de medición, ninguna nombra el referente («el primero en llegar no
es una persona» y se detiene: nunca dice qué es), el titular vuelve a sostenerse en un
texto de más abajo, el público que el brief pone primero queda mal servido, y las dos
fallan la prueba del logo tapado. **Un defecto que aparece en las dos no es un defecto de
dirección: es del encuadre o de una decisión que nadie tomó.**

**3 · Las dos empeoran el problema que la obra existe para resolver.** Suben la promesa de
no-registro («Sin registro.» en A como primeras palabras de la nota; «No pide registro.»
en B) a **mayor jerarquía de la que tiene hoy**. Bajo un criterio de conversión, las dos le
hacen publicidad al callejón sin salida.

## Dos defectos que las capturas no muestran

- **A: el campo no aguanta un dominio chileno real.** Las dos capturas están tomadas en
  reposo con el placeholder de 12 caracteres. Con un dominio de 28 caracteres a 390 px se
  ve el 56 % de lo escrito. Y el arreglo no es cosmético: para que quepa, el campo baja a
  ~24 px, o sea por debajo del nivel display — que es **exactamente lo que define la
  dirección**. Elegir A mirando esa captura es elegir algo que no existe.
- **B: la segunda puerta es impulsable en 3 de 5 anchos.** El aviso de cookies real la
  tapa. Es la única entrada del público que el brief §2 pone primero: ticket $390.000 a
  $1.190.000, ciclo corto.

## El hallazgo que reordena la obra: el cuello está después del botón

El diagnóstico midió el camino completo, no solo el hero:

1. **El chequeo entrega el arreglo de cada señal que falla y no pide un solo dato.**
   Medido inyectando la respuesta real de `/api/chequeo`: `hayCampoEmailEnResultado:
   false`, `hayFormularioEnResultado: false`, 3 arreglos literales y gratis. Rompe de
   frente la regla 5b de la casa, escrita en la skill del mini-diagnóstico: *«Si la
   corrección regalada es la única necesidad visible, el prospecto la arregla solo y la
   venta muere.»* El instrumento del hero hace lo que el documento de venta prohíbe.
2. **El dominio escrito no se guarda en ninguna parte.** `onRequestGet({ request })` sin
   `env`: la función no tiene binding a KV, D1 ni R2. Cero `.put(`. La señal de intención
   más barata y más calificada del sitio se descarta en el milisegundo siguiente.
3. **El único CTA del resultado está 2,6 pantallas por debajo del botón**, y sus dos ramas
   («quiero el análisis completo» / «prefiero hablarlo contigo») apuntan al mismo sitio sin
   marca que las distinga: la única calificación gratis que el sitio podría capturar, se
   pierde.
4. **Desde el hero no hay camino visible a la conversión medida.** El primer enlace a
   contacto visible está en el píxel 10.834 de un documento de 12.062 px.

## Dos afirmaciones verificadas a mano, porque cambiaban la premisa

- **«Los 0,00 de Ads pueden ser un artefacto de medición.»** Un agente lo marcó como
  bloqueante: `generate_lead` solo se dispara si la persona aceptó cookies. **Es cierto
  hoy y es falso para el período que importa.** El banner y la compuerta de consentimiento
  son del árbol Astro, de fines de septiembre. Durante la campaña (14-jul → ~24-ago) el
  sitio en vivo era `spindlelab-site/` (v1): gtag sin condición, `generate_lead` sin
  condición, **cero banner de cookies**. Verificado en el archivo.
  **Los 104 clics sin conversión son reales.** La premisa de la obra se sostiene.
- **«El brief miente sobre la captura de UTM.»** Cierto, y el error era del encuadre.
  Corregido en el brief: la captura vive solo dentro de `public/contacto/index.html` y lee
  la query de la página en que corre. Quien entra por la home con `?utm_source=google` y
  luego navega a contacto envía los tres UTM vacíos.

## Lo que el protocolo dice que toca ahora

Está escrito de antemano en `estudio-web/protocolo-compuertas.md`: *«Si en la compuerta 2
la respuesta es "ninguna de las dos", eso es información valiosa, no un fracaso: significa
que el lock de referencias apuntó al lugar equivocado. Se vuelve a `referencias.md`, no al
tablero.»*

Y hay evidencia escrita, anterior a que Ramón mire nada, de que ese es el caso: **el lock
se eligió con criterio de efecto visual y oficio, no de conversión** — y la opción que era
exactamente el hero que convierte («el wow no es pictórico, es funcional: la portada ES la
herramienta») **se descartó por escrito, con el motivo «no luce el oficio de diseño».**
Ese es justamente el criterio que la compuerta 1 derogó.

Además: de las tres referencias que la dirección C declara como lock principal, **dos
(Cardan Made, Beans Agency) no tienen URL en ningún documento del repo y nadie pudo
abrirlas.** Lo construido sigue a driftime, que era el lock de otra dirección.
"Ramón eligió la dirección C" no es lo mismo que "Ramón eligió lo que hay".
