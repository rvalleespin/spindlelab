# Nota para quien escriba el copy del sitio v3 — el largo de los titulares

**27-sep-2026 · pedido de Ramón: «cuidado con los títulos muy largos».**

> **Nota de estado · 13-oct-2026: superada por la decisión del 5-oct.** Esta nota se escribió
> para titulares en mayúsculas y a tamaño enorme. Desde el 5-oct las mayúsculas 800 van solo
> en cinco lugares, el titular del hero y las cuatro palabras de campo (manual de marca §05;
> spec §0), y todo otro titular va en caja normal, Manrope 500. Por eso sus tablas de `clamp`
> y de caracteres por línea ya no aplican, y el límite de 6 palabras y 34 caracteres es solo
> del display. Los tres ejemplos de la home («¿Te menciona la IA?», «67 de 69…» y
> «Herramientas gratis…») tampoco están en ninguna página v3.
>
> **Sigue vivo** el pedido de Ramón del 27-sep: cuidado con los títulos muy largos. La cifra de
> «Los ocho de las internas» quedó vieja; va corregida ahí mismo. Lo vigente está en
> [`spec-visual.md`](../oficina/obras-web/spindlelab-v3/spec-visual.md); la revisión de lo
> que quedaba, en
> [`pendientes-traspaso-revisados.md`](../oficina/obras-web/spindlelab-v3/pendientes-traspaso-revisados.md)
> (frente E5). Esta nota no reabre ninguna decisión.

En la v3 los titulares van en **mayúsculas y a tamaño enorme**. Eso cambia las reglas del
oficio: un titular que en un documento se lee bien, acá ocupa media pantalla y aplasta lo
que viene abajo. No es gusto, es aritmética.

## La medida, para no escribir a ojo

En Manrope ExtraBold mayúsculas, sobre un viewport de 1440 px con los márgenes del sitio.

> ⚠️ **Los caracteres por línea dependen del tamaño máximo del `clamp`, no son un número
> fijo.** La primera versión de esta nota decía «unos 20» sin más, y con eso se corrigió un
> h1 de 41 a 36 caracteres que **igual salió en tres líneas**: esa página usaba un `clamp`
> de 8,5 rem, donde caben ~13.

| `clamp` máx. | Caracteres por línea | Dónde se usa |
|---|---|---|
| 8 rem | ~20 | el h1 de la home |
| 5,5 rem | ~24 | los h1 de las internas (normalizado el 27-sep) |
| 5 rem | ~26 | los h2 de sección |

Con las internas ya normalizadas a 5,5 rem, la regla práctica queda:

| Caracteres | Líneas | Veredicto |
|---|---|---|
| hasta ~22 | 1 | ideal para un hero |
| ~23 a 40 | 2 | bien |
| más de 40 | 3+ | **no** |

**Y el arreglo no siempre es recortar texto.** Las internas tenían el `clamp` más grande
que la home: una página interior gritando más fuerte que la portada. Bajarlo de 8,5 a
5,5 rem resolvió más titulares que cualquier recorte, y protege los que se escriban después.

## Lo que se corrigió, como ejemplo

| Antes | Car. | Después | Car. |
|---|---|---|---|
| «Cuando tu cliente le pregunta a una IA quién puede ayudarlo, ¿aparece tu nombre?» | 79 | **«¿Te menciona la IA?»** | 19 |
| «De los últimos 69 sitios que revisamos, 67 tenían el mismo problema» | 66 | **«67 de 69 sitios tenían el mismo problema»** | 39 |
| «Herramientas que puedes usar sin hablar con nadie» | 48 | **«Herramientas gratis, sin registro»** | 32 |

**El movimiento en los tres casos es el mismo:** el titular se queda con la idea y el
contexto baja a la línea de apoyo, donde el texto es chico y no cuesta líneas. No se perdió
nada; cambió de lugar.

## Lo que no se puede sacrificar para acortar

Acortar es fácil si uno se salta la voz. Estas no se tocan:

- **El titular lleva verbo.** `voz-spindlelab` marca los fragmentos sin verbo como titular
  de impacto entre lo que nunca aparece en el texto aprobado. «Visibilidad en IA.» no es un
  titular, es una etiqueta.
- **Abre en la situación del lector.** Los dos posts en singular de Ramón abren así, muchas
  veces con un condicional: *«Si tu sitio está bien hecho y ChatGPT igual no te menciona…»*.
  Un titular que abre hablando de la casa ya empezó mal, sea corto o largo.
- **Singular para lo observado, plural para lo que entrega el negocio.** Acortar no es
  excusa para mezclar registros en la misma pieza.
- **Cero urgencia fabricada y cero superlativos.** Un titular corto y vacío es peor que uno
  largo y con contenido. Si al recortar queda un eslogan, se recortó mal.
- **Ninguna cifra sin fuente.** El «67 de 69» se mantiene porque sale de corridas reales del
  chequeo (`marketing/metricas/corridas-chequeo-2026-08-31.md`), no porque suene bien.

## Los ocho de las internas

Al medir todas las páginas aparecieron **ocho** titulares sobre 40 caracteres, no los dos
que se habían marcado a ojo. Los seis extra venían del contenido de producción extraído
para las páginas de servicio.

| Página | Antes | Car. | Ahora | Car. |
|---|---|---|---|---|
| paid-media | «De la estrategia a la escala, con el gasto bajo control» | 55 | «Escalar con el gasto controlado» | 31 |
| redes-sociales | «Estrategia y ejecución, no publicar por publicar» | 48 | «No publicar por publicar» | 24 |
| auditoría | «Un informe que tu equipo puede ejecutar el lunes» | 48 | «Tu equipo lo ejecuta el lunes» | 29 |
| auditoría | «Del diagnóstico gratis a la auditoría a fondo» | 45 | «Del chequeo gratis a la auditoría» | 33 |
| visibilidad-en-ia | «Qué puede prometer este servicio y qué no» | 41 | «Qué prometemos y qué no» | 23 |
| visibilidad-en-ia | «De invisible a citable, en cuatro frentes» | 41 | «De invisible a citable» | 22 |
| desarrollo-web | «Cuéntanos qué necesita comunicar tu sitio» | 41 | «¿Qué necesita decir tu sitio?» | 29 |
| método (h1) | «Nuestro método de SEO y visibilidad en IA» | 41 | «Cómo trabajamos» | 15 |

**Qué se cuidó al recortar cada uno:**

- **«Qué prometemos y qué no»** conserva el «y qué no». Es la sección de honestidad del
  servicio, la que sostiene que no se promete monitoreo continuo de menciones en IA. Sin esa
  mitad, el titular se vuelve publicidad.
- **«Tu equipo lo ejecuta el lunes»** conserva «el lunes», que es el detalle concreto que
  hace creíble la frase, y le cambia el sujeto al lector.
- **«No publicar por publicar»** se queda con la mitad memorable; la primera parte era
  enumeración.
- **El h1 de método** perdió las palabras clave a propósito: siguen en el `<title>`
  («Nuestro método de auditoría SEO + visibilidad en IA») y en el párrafo de entrada, que
  las dice textualmente. Un h1 de 15 caracteres en una línea vale más que uno de 36 partido
  en tres con «EN IA» huérfano.

**Resultado verificado sobre el HTML compilado: cero titulares sobre 40 caracteres en las
14 páginas.**

> **Corrección del 13-oct-2026: esa cifra ya no es cierta.** Medido en el sitio compilado,
> sobre las 21 rutas v3, a 1440 y a 390 px: hay **32** h1 y h2 de más de 40 caracteres (8 h1
> y 24 h2), todos en caja normal y peso 500. 28 son del blog (los 7 h1 de artículo, los 7
> títulos del índice y 14 h2 de artículo) y 4 de servicios. Dos títulos de esta tabla volvieron
> a pasar de 40 por decisión registrada en el §7 de la spec (filas del 6-oct): Desarrollo web
> cierra con el h2 publicado «Cuéntanos qué necesita comunicar tu sitio» y Auditoría dice «Del
> mini-diagnóstico gratis a la auditoría». A 390 px, 9 títulos ocupan 3 o 4 líneas (los 7 h1 de
> artículo, el h1 de Desarrollo web y un h2 del índice del blog); a 1440, uno solo (el h1 de
> «cómo aparecer en ChatGPT», en 3). Desde el 5-oct esos títulos no tienen límite de largo que
> cumplir, porque el límite es del display. Si los h1 de artículo en 4 líneas a 390 molestan,
> el ajuste va en el `clamp` de `.d-h1` (`spindlelab-astro/src/styles/driftime.css`) y se anota en el §7 de la spec.

## Pendiente

Los textos siguen siendo **propuestas de trabajo**, no copy final: el propio brief dice que
Renata pasa el tono y Ramón aprueba. Lo que está cerrado es la restricción de largo, no la
redacción.
