# Nota para quien escriba el copy del sitio v3 — el largo de los titulares

**27-sep-2026 · pedido de Ramón: «cuidado con los títulos muy largos».**

En la v3 los titulares van en **mayúsculas y a tamaño enorme**. Eso cambia las reglas del
oficio: un titular que en un documento se lee bien, acá ocupa media pantalla y aplasta lo
que viene abajo. No es gusto, es aritmética.

## La medida, para no escribir a ojo

A tamaño máximo (`clamp` hasta 6,5–8 rem) en Manrope ExtraBold mayúsculas, sobre un
viewport de 1440 px con los márgenes del sitio:

> **Caben unos 20 caracteres por línea.**

De ahí sale la única regla que hace falta:

| Caracteres | Líneas | Veredicto |
|---|---|---|
| hasta ~20 | 1 | ideal para un hero |
| ~21 a 40 | 2 | bien |
| ~41 a 60 | 3 | ya pesa; solo si el titular es el contenido |
| más de 60 | 4+ | **no** |

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

## Pendiente

Los `h1` de las internas vienen del contenido publicado y no se tocaron. Dos quedan largos
para el tamaño nuevo y conviene revisarlos cuando se apruebe el copy definitivo:

- `/v3/metodo/` → «Nuestro método de SEO y visibilidad en IA» (41 car.)
- `/v3/servicios/desarrollo-web/` → el cierre «Cuéntanos qué necesita comunicar tu sitio» (41 car.)

Los textos de la home siguen siendo **propuestas de trabajo**, no copy final: el propio
brief dice que Renata pasa el tono y Ramón aprueba.
