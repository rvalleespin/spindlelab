# Publicar — Query fan-out: la consulta que optimizas no es la que el modelo ejecuta

**Cuándo:** MIÉRCOLES 23-sep-2026 · **Canal:** perfil personal de Ramón · **Voz:** singular
**Estado:** ✅ **PUBLICADO el 23-sep**, con su primer comentario. Texto puro, sin pieza visual.
**Escribe:** Renata (agente-copywriter) · **Publicó:** esta sesión, con aprobación de Ramón.

## Por qué existe esta pieza

Ramón rechazó el banco de tres posts que se había escrito el 22-sep: *"no habla desde lo técnico
o algo relevante que me entregue autoridad como experto en el área. no habla de tendencia y ni de
análisis"*. Tenía razón: los tres eran **anécdotas** (cosas que le pasaron), sin mecanismo ni
lectura que solo pueda dar alguien del oficio.

Esta pieza es la corrección: **análisis técnico con fuente primaria**.

## Cuerpo (publicado)

Google explicó cómo arma sus respuestas con IA y hay una parte que cambia bastante las cosas, aunque casi no se está comentando.

Cuando alguien hace una pregunta, el sistema no corre esa búsqueda. Corre varias. Se abre en subpreguntas, busca cada una por separado, y después arma la respuesta con lo que encontró en cada rama. Le llaman query fan-out.

Piensa lo que significa. No estás compitiendo por "abogado laboral en Santiago". Estás compitiendo por las cinco o seis preguntas que el modelo se hace en el camino, y ninguna de esas aparece en tu informe de posiciones.

Y explica algo que a primera vista no cuadra. Un sitio puede rankear bien y no aparecer mencionado nunca.

La misma documentación dice cuál es el requisito para salir como enlace en una de esas respuestas. Tu página tiene que estar indexada y poder mostrarse con snippet. Eso es todo. Si arrastras un nosnippet de hace años, o tu CDN le cierra la puerta al rastreador, quedas fuera con el mejor contenido del mundo.

Después está la frase que más me llamó la atención, casi textual: no necesitas crear archivos nuevos legibles por máquina, ni archivos de texto para IA, ni marcado especial, ni datos estructurados particulares.

Ahí se cae llms.txt, que lleva meses apareciendo en propuestas. Y no lo digo yo, lo dice la documentación del buscador para el que supuestamente sirve.

Esto es sobre Google, y la diferencia importa. ChatGPT y Perplexity recuperan de otra forma. A quien te ofrezca optimizar "para la IA" así en general, pregúntale para cuál.

Si quieres revisar algo hoy, parte por lo básico, que es si el rastreador puede entrar y leerte. Armé un chequeo que hace justo eso sobre tu dominio, gratis y sin registro, y lo dejo en el primer comentario.

Y después viene la parte larga. Escribe las preguntas que alguien se hace antes de contratar en tu rubro. No la búsqueda con la que crees que te encuentran, las de antes. Si no tienes una página que responda cada una, no tienes con qué entrar al fan-out.

## Primer comentario (publicado al tiro)

El chequeo está acá: spindlelab.cl/diagnostico

Son 21 señales de tu sitio, corre en segundos y no pide correo.

Y la documentación de Google que cito, por si la quieres leer entera: developers.google.com/search/docs/appearance/ai-features

---

## Fuente primaria, verificada el 23-sep

`developers.google.com/search/docs/appearance/ai-features`, leída entera. Las tres afirmaciones
del post salen de ahí, textuales:

| Afirmación del post | Dónde está |
|---|---|
| El sistema se abre en subpreguntas ("query fan-out") | *"Both AI Overviews and AI Mode may use a 'query fan-out' technique — issuing multiple related searches across subtopics and data sources"* (How AI features work in Search) |
| El requisito es estar indexado y ser elegible para snippet | *"a page must be indexed and eligible to be shown in Google Search with a snippet... There are no additional technical requirements"* |
| No hacen falta archivos ni schema para IA | *"You don't need to create new machine readable files, AI text files, or markup... There's also no special schema.org structured data that you need to add"* |

**Lo que NO se afirmó, a propósito:** nada sobre cómo recuperan ChatGPT o Perplexity. El post dice
explícitamente que esto es Google y que la diferencia importa. Esa precisión es parte del
argumento, no una nota al pie.

## Chequeo de duplicación (a mano)

No se pisa con el post de GEO del 21-sep. **Aquel discutía el encuadre comercial de la sigla
(no existe el presupuesto aparte). Este explica el mecanismo.** El cierre se reescribió justo
porque el primer borrador terminaba igual que aquel ("la pregunta no es cuánto cuesta, es qué van
a hacer ahí"), que habría sido repetirse.

## Pendiente de medición

Desde el 22-sep el sitio no carga Analytics sin permiso del visitante, así que **el tráfico que
llegue de este post va a quedar subcontado en GA4**, y `generate_lead` también. Si el jueves se
ven pocas visitas, ese es el motivo, no que el post no haya funcionado.
