# Brief de obra — SpindleLab (la casa) · v3 del sitio propio

**Fecha:** 2026-10-02 · **Ficha:** `oficina/clientes/spindlelab.md` ·
**Repo y rama:** este repo, `spindlelab-astro/`; la v3 vive en
`claude/rebranding-webdev-exploracion` (52 commits, 117 archivos, sin mergear)
**Tipo:** **obra** · **Aprueba:** Ramón

> **Hallazgo del encuadre: esta obra no empieza de cero.** La v3 está construida: 14
> páginas bajo `/v3/*`, sistema de diseño propio (campos de color, Manrope auto-alojada,
> AA verificado), lock de referencias real y auditado (driftime.com, Colin Morella), 99
> renders, y el manual de marca reescrito a v2.0 sobre ese sistema. Lo que falta no es
> diseñarla: es **cerrarla, auditarla y publicarla**.
>
> **Consecuencia sobre el protocolo:** la compuerta 2 ya se pagó. Hubo tres direcciones
> construidas y miradas (`/v3/a` papel, `/v3/b` instrumento, `/v3/c` galería), eligió C,
> y C evolucionó a lo que hoy es la v3. Pedirte ahora que elijas entre dos tableros
> sería cobrarte una decisión que ya tomaste. Esta obra corre con **una compuerta: este
> brief.**

## 1 · Qué tiene que lograr (negocio, no diseño)

**Que el tráfico de alta intención que ya llega deje sus datos.** Hoy no lo hace, y hay
tres fuentes independientes del propio repo que apuntan al mismo cuello:

| Fuente | Dato | De dónde |
|---|---|---|
| Google Ads | **104 clics, CTR 16,05 %, 0 conversiones**, CLP 100.411 gastados | `marketing/metricas/checkpoint-dia77-2026-09-21.md` §3, verificado en la cuenta |
| Outbound | 4,9 % de respuesta (7/142) → **0 llamadas registradas** | ídem §1, conteo sobre `ventas/enviados/REGISTRO-enviados.csv` |
| Menciones en IA | 0/45 (mes 1) | `marketing/metricas/test-menciones-ia.md` |

Un CTR de 16 % en Búsqueda es excepcional: el anuncio y las keywords funcionaban. El
sitio no convirtió. Y la ficha ya tiene la regla escrita: **no se arregla la forma de
pago de Ads hasta que la conversión del sitio esté resuelta y medida.** Esta obra es lo
que desbloquea eso.

El giro de mensaje del 29-sep (el sitio al centro, el AEO como su especificación, no
como servicio aparte) es el **medio**: cambia la oferta de "cuatro servicios" a "un
producto con una especificación comprobable". El fin es la conversión.

## 2 · A quién le habla

Dos entradas, distinta temperatura, y el orden de los campos de la home ya las ordena:

- **El que va a construir o rehacer su sitio** (campo 01 DESARROLLO, brasa). Llega de
  Ads con intención alta y de referido. Ticket $390.000–$1.190.000, ciclo corto. Es la
  puerta.
- **El que ya tiene sitio y no lo va a rehacer** (campo 02 VISIBILIDAD / auditoría).
  Llega del outbound a abogados — el nicho que los datos ascendieron a principal el
  21-sep (5,8 % vs 1,4 % de salud).

En la home manda el primero. Quien ya tiene sitio tiene su propia puerta: el chequeo.

## 3 · Mapa de rutas

Las 20 URLs vivas se conservan **idénticas** (requisito, no preferencia: hay orgánico y
Ads apuntando ahí). Verificado: los 7 slugs del blog de la v3 calzan uno a uno con el
sitemap en vivo.

| Ruta | Para qué existe | Qué tiene que pasar ahí |
|---|---|---|
| `/` | La oferta como cuatro campos; el orden es el mensaje | Entender qué se vende y chequear el dominio sin salir |
| `/servicios/` + 6 internas | Una pantalla por servicio, precios publicados | Ver el plan y el precio sin pedirlo |
| `/trabajo/` **(nueva)** | Índice de obra: 3 piezas reales + 1 de concepto rotulada | Creer que esto se hace de verdad |
| `/diagnostico/` | El gancho gratis de 1 página | Pedirlo |
| `/metodo/` | Los 4 pasos, cierre "El primer paso es gratis." | Entender el orden del trabajo |
| `/blog/` + 7 posts | Corpus técnico citable (el activo de AEO) | Ser citado por un motor de IA |
| `/contacto/` | **La única conversión medida** (`generate_lead`) | Dejar los datos |
| `/nosotros/` · `/privacidad/` | Entidad verificable · obligación legal | — |

## 4 · Jerarquía de la home (5 segundos)

Primer viewport: qué se construye, para quién, y el chequeo del propio dominio dentro
del hero (dejó de ser una página aparte). Después, los cuatro campos en orden
DESARROLLO → VISIBILIDAD → CONTINUIDAD → ALCANCE. **Única acción pedida:** chequear el
dominio. Es la de menor fricción y la que entrega un dato que justifica la conversación.

## 5 · Activos reales (verificados en la rama, no prometidos)

| Activo | Dónde está | Permiso |
|---|---|---|
| 2 sitios de Bernardo Combeau, recapturados de los sitios vivos | `public/assets/img/obra/combeau-*.jpg` | ✅ **dado el 30-sep-2026** |
| Verifica y Cumple — **producto propio de la casa** (`verifica.spindlelab.cl`), no cliente | `.../verifica-y-cumple-*.jpg` | ✅ propio, sin permiso que pedir |
| Raigal — pieza de concepto, rubro implantología | `.../raigal*.jpg` + `marketing/portafolio/01-raigal/` | ✅ propia, **rotulada en la pieza** |
| Aplomo · Deslinde — piezas de concepto | `marketing/portafolio/02-, 03-` | Fuera del sitio por decisión registrada |
| Manrope + Gabarito + Inter, auto-alojadas | `public/fonts/` (woff2 + css) | ✅ licencia en el repo |
| El chequeo de 21 señales (`/api/chequeo`) | función en producción | ✅ propio |
| Precios publicados de los 4 servicios | `src/data/servicios-v3.json` | ✅ vigentes, **no se tocan** |
| 7 posts, cuerpo verbatim | `src/data/blog-v3/` | ✅ propios |

**Hueco declarado, sin rellenar:** no hay caso de cliente con cifras de resultado. No se
inventa ninguna. La prueba es el trabajo mostrado y el chequeo reproducible sobre el
dominio del visitante.

## 6 · Restricciones (lo que no se puede tocar ni decir)

- **Las 20 URLs vivas no cambian.** Ni un slug.
- **La medición no se reconstruye.** `generate_lead` en `/contacto/`, captura de UTM en
  `sessionStorage`, los nombres `.contact-form` / `#f-utm-source|medium|campaign` /
  `.form-status` / `.form-success`, el banner de consentimiento y el Meta Pixel. El
  `Layout.astro` de la rama ya los lleva; hay que **comprobarlo disparando el evento**,
  no leyendo el código.
- **Cero prueba social inventada.** Ni cifras de resultado, ni testimonios, ni logos.
  Las piezas de concepto van rotuladas **visibles sin scroll** (regla ya escrita en
  `marketing/portafolio/README.md`).
- **Precios: los números no se mueven.** El giro reordena el argumento, no la tarifa.
- **Oro `#C9A227` escaso:** un uso por vista. La home en vivo hoy gasta dos (punto del
  wordmark + palabra «motor»); la v3 tiene que cerrar eso, no heredarlo.
- **Las maquetas no se publican:** `/v3/a`, `/v3/b`, `/v3/c`, `/v3/maqueta-inicial`
  salen del árbol o quedan con `noindex` fuera del sitemap.
- **Lenis (scroll suave, 20 kB / 5,9 kB gz):** decisión pendiente heredada. En el sitio
  de una consultora que vende rendimiento, es lo primero que mide un prospecto.

## 7 · Criterios de aceptación (se comprueban mirando el entregable)

- [ ] `generate_lead` **se dispara de verdad** al enviar el formulario de la `/contacto/`
      publicada, con los tres UTM poblados desde una visita con `?utm_source=test`.
      Comprobado en el navegador, con la evidencia en el acta.
- [ ] Las 20 URLs del sitemap en vivo responden 200 y su contenido es el equivalente v3.
      Cero 404, cero redirecciones nuevas.
- [ ] `/trabajo/` publica 4 piezas; la de concepto trae su rótulo visible en el primer
      viewport, sin scroll.
- [ ] Cero cifras de resultado de cliente en todo el sitio (barrido con grep).
- [ ] Un solo uso de `#C9A227` en el primer viewport de la home, a 1440 y a 390.
- [ ] Las 4 páginas de servicio muestran el mismo precio que `servicios-v3.json`, y ese
      archivo tiene los precios vigentes de la ficha.
- [ ] Contraste AA en cuerpo y en los 4 campos de color (medido, no estimado).
- [ ] `/v3/*`, `a`, `b`, `c` y `maqueta-inicial` no son alcanzables ni indexables.
- [ ] JSON-LD parseado en home, un servicio, un post y `/trabajo/`; canonical y OG en las 20.
- [ ] Sin scroll horizontal a 390 (medido en la página, no deducido de la captura).
- [ ] Render a 390 / 768 / 1440 de las 14 plantillas, capturas guardadas.

## 8 · Lo que NO se hace en esta obra

1. **No se reabre la dirección visual.** El sistema de la v3 es el acuerdo. Un cambio de
   dirección es otra obra.
2. **No se escriben páginas nuevas** más allá de `/trabajo/`.
3. **No se tocan los precios** ni la estructura de planes.
4. **No se publican Aplomo ni Deslinde** (decisión ya registrada: una sola pieza de
   concepto en el sitio).
5. **No se reenciende Google Ads.** Eso viene después de medir, y es decisión de Ramón.
6. **No se toca `spindlelab-site/` (v1) ni `spindlelab-site-v2/`** (el experimento en
   React que nunca se usó). Su limpieza es otro encargo.
7. **No se migra el blog a Markdown ni a content collections.** Va como está en la rama.

## 9 · Supuestos (reversibles en una línea)

- La obra se publica reemplazando el sitio en vivo, no queda en una rama de muestra.
- Los enlaces internos de los cuerpos de post, que hoy apuntan al sitio vivo, quedan
  correctos al publicar (misma ruta); se verifica, no se reescribe.
- `/trabajo/` entra al `sitemap.xml`; `/privacidad/` se conserva tal cual (HTML estático).
- Lenis se conserva salvo que el QA mida un costo real de rendimiento.

## 10 · Compuerta 1
- **Aprobado por:** — · **Fecha:** — · **Cambios pedidos al aprobar:** —
