# 07 · Doceavo · ficha

**Pieza de concepto del portafolio E12** · Bruno (dirección creativa y construcción), con el texto de Clara
(`texto.md`) y las fechas verificadas con el método de Simón (esta ficha). 16 y 17-oct-2026, rama
`claude/magical-franklin-ckfki2`. Manda `../plan-e12.md` §10; reglas en `../README.md`.

**Doceavo no existe.** Es un estudio contable y tributario inventado, en Concepción, con una contadora inventada.
Nada de lo que dice su sitio ocurrió. Las fechas sí son reales: son las del calendario del SII de 2026.

---

## 1 · Quién sería

Un estudio contable para pymes e independientes en Concepción: contabilidad mensual, F29, remuneraciones,
Operación Renta e inicio de actividades. Lo busca el dueño de una pyme que se enteró de un vencimiento por un aviso
del SII, o el independiente que emite boletas de honorarios y no sabe qué le toca en abril. No compra «asesoría»:
compra no enterarse tarde.

## 2 · El nombre

| Comprobación | Resultado | Cuándo |
|---|---|---|
| `doceavo.cl` en NIC Chile | Libre («Nombre de dominio no existe») | 16-oct-2026, 20:45 (`../plan-e12-evidencia.json`) y de nuevo a las 23:25 |
| Búsqueda web: «"Doceavo" contabilidad OR contable OR contadores Chile» | Ningún estudio, empresa ni marca con ese nombre | 16-oct-2026 |

Por qué suena inventado: es una fracción usada como nombre. Cada mes es un doceavo del año, y nadie se llama así.

## 3 · La contadora (ficticia)

| Nombre | Lo que haría | Comprobación |
|---|---|---|
| **Olga Treumún Achurra** | Contadora, responsable del estudio | Búsquedas web «"Treumún" contadora OR contador OR auditor» y «"Olga Treumún" OR "Treumún Achurra"», 16-oct-2026: cero resultados con ese nombre |

- No encontré un registro público de contadores que se pueda consultar por nombre; la comprobación es la búsqueda
  web. Se repite el día que la pieza entre al índice de `/trabajo/`.
- **Sin foto, sin RUT, sin teléfono, sin dirección con número.** El sitio dice que es ficticia donde aparece su nombre.
- El equipo no tiene nombres ni tamaño: el sitio habla en plural de marca («te escribimos»), nunca de «nuestro equipo».

## 4 · Hechos (los únicos números que el sitio afirma)

Regla del plan §4.2: ningún número que no esté en esta tabla. Consultado el **16-oct-2026, entre las 23:25 y las
23:45 (Chile)**. El detalle crudo, con las URL exactas y el texto de cada fuente, está en
`_herramientas/sii-calendario-2026.json`.

### 4.1 · F29 de 2026, mes por mes (calendario tributario del SII)

Fuente: Calendario Tributario del SII, vista «Declaración Mensual en Formulario 29 (IVA)» de cada mes de 2026
(`misiir.sii.cl/cgi_calendario/calendario.cgi?OPT=3&VIEW=2&YEAR=2026&MONTH=<m>&DAY=1&TYPE=F29`). El F29 que se
presenta en un mes declara el IVA del mes anterior.

| Mes | General, PEC | General, PEL (día 12) | Facturador electrónico, PEC | Facturador electrónico, PEL (día 20) | Sin movimiento |
|---|---|---|---|---|---|
| Enero | 11 | 12 | 19 | 20 | 28 |
| Febrero | 11 | 12 | 19 | 20 | 28 |
| Marzo | 11 | 12 | 19 | 20 | 28 |
| Abril | 12 | **13** | 19 | 20 | 28 |
| Mayo | 11 | 12 | 19 | 20 | 28 |
| Junio | 11 | 12 | 19 | **22** | 28 |
| Julio | 12 | **13** | 19 | 20 | 28 |
| Agosto | 11 | 12 | 19 | 20 | 28 |
| Septiembre | 13 | **14** | 20 | **21** | 28 |
| Octubre | 11 | **13** | 19 | 20 | 28 |
| Noviembre | 11 | 12 | 19 | 20 | 28 |
| Diciembre | 13 | **14** | 20 | **21** | 28 |

- **PEL** = pago en línea (cuenta corriente, cuenta vista o tarjeta). **PEC** = pago con mandato al banco. El día 20
  (y su PEC del 19) es para quien declara y paga en sii.cl y es facturador electrónico o emite boletas de honorarios
  electrónicas; el resto, el 12.
- En negrita, los meses en que el 12 o el 20 cayeron en sábado, domingo o feriado y el SII los corrió al día hábil
  siguiente. El texto del SII lo dice así: «Vencimiento día 12, en caso de sábado, domingo o feriado pasa al día hábil
  siguiente».
- Agosto trae además una nota para las comunas de Chillán y Chillán Viejo (el 20 pasó al 21). El sitio no la usa:
  Doceavo está en Concepción.
- **El F29 sin movimiento** («por Internet sin movimiento y sin pago») vence el 28 de cada mes. Es la respuesta a «¿tengo
  que declarar si este mes no vendí nada?».

### 4.2 · Operación Renta 2026 y declaraciones juradas

| Fecha | Qué | Fuente |
|---|---|---|
| 27 de marzo | Declaraciones juradas 1887 (sueldos) y 1879 (retenciones de honorarios), entre otras: 1829, 1840, 1841, 1843, 1933, 1944, 1953, 1956, 1943, 1947 y 1948 (sociedad con socios personas naturales) | Res. Ex. SII N° 123, 25-sep-2025 (`sii.cl/normativa_legislacion/resoluciones/2025/reso123.pdf`) |
| 1 de abril | Comienza el plazo del F22 sin pago | Calendario del SII, F22, abril de 2026 |
| 30 de abril | Vence el F22 por Internet con pago (pago en línea) | Ídem |
| 8 de mayo | Vence el F22 por Internet sin pago | Calendario del SII, F22, mayo de 2026 |
| 30 de junio | Declaraciones juradas 1847 (balance) y otras: 1866, 1867, 1907, 1913, 1926, 1930, 1937, 1945, 1946, 1929, 1950, 1951, 1952, 1958, 1960, 1961, 1963 y 1964 | Res. Ex. SII N° 123 de 2025 |

**Por qué las DJ salen de la resolución y no del calendario:** la vista de declaraciones juradas del calendario del SII
para marzo y junio, y la vista por día del 17 al 27 de marzo y del 24 al 30 de junio, devuelven una página vacía
(HTTP 200 con largo 0), repetido cuatro veces. La resolución es la fuente que el propio calendario resume.

### 4.3 · Lo demás

| Hecho | Dónde se usa | Fuente |
|---|---|---|
| Las cotizaciones de los trabajadores se pagan dentro de los 10 primeros días del mes siguiente (si vence en sábado, domingo o festivo, pasa al hábil siguiente); **declaradas y pagadas por un medio electrónico, hasta el día 13, aunque sea sábado, domingo o festivo** | El 13 de cada mes, en rojo; la pregunta de las cotizaciones | Superintendencia de Pensiones, «¿Cuál es el plazo para pagar las cotizaciones previsionales?» (`spensiones.cl/portal/institucional/594/w3-article-2728.html`) |
| Un F29 declarado y pagado fuera de plazo paga reajustes, intereses por cada mes o fracción de mes de atraso y la multa sobre los montos reajustados; uno sin pago presentado tarde también puede tener multa | La pregunta «¿qué pasa si declaro fuera de plazo?» | SII, preguntas frecuentes (`sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1228.htm` y `001_130_1062.htm`) |
| Feriados de 2026 que tocan el calendario: 12 de octubre (Encuentro de Dos Mundos, Ley 3.810 y 19.668) y 31 de octubre (Iglesias Evangélicas y Protestantes, Ley 20.299), y el resto de la lista nacional | Los días marcados «feriado» en el mes | `feriados.cl`, con el respaldo legal de cada fecha |

**Lo que el sitio no dice, a propósito:** ninguna tasa de interés ni porcentaje de multa (cambian y se publican cada
mes), ningún precio, ningún plazo de entrega del estudio, ningún número de clientes, ninguna promesa de pagar menos
impuestos ni de «evitar multas», ningún RUT, teléfono ni dirección con número. Las fechas de 2027 no existen todavía: el
sitio lo dice.

**La rutina del estudio es ficción declarada.** Los días en que Doceavo «cierra el mes», «te manda el borrador» o «te
manda el comprobante» no son norma: se calculan desde las fechas del SII (el primer día hábil del mes; tres días hábiles
antes del F29 general; el día hábil siguiente al F29 de facturadores) y el caso lo dice.

## 5 · Color (medido con la fórmula WCAG 2.x)

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `--lienzo` | `#DCE6D3` | El papel del libro contable | Tinta sobre lienzo 14,30:1 |
| `--tinta` | `#141414` | La letra; lo lleno (el mes y el día en curso) | |
| `--verde` | `#4A5A44` | Texto secundario, lo que ya pasó, los feriados | 5,75:1 sobre lienzo |
| `--linea` | `#A9C0A0` | Las líneas del papel columnar (no texto) | 1,52:1: decorativa |
| `--renglon` | `#D2DEC8` | La fila alterna de una tabla | Verde sobre renglón 5,30:1; rojo 4,68:1 |
| `--rojo` | `#B3261A` | **Solo** lo que vence | 5,08:1 sobre lienzo; lienzo sobre rojo 5,08:1 |
| `--rojo-noche` | `#E8553F` | El mismo rojo sobre tinta | 5,09:1 sobre tinta |
| `--verde-noche` | `#9DB092` | Texto secundario sobre tinta | 7,95:1 sobre tinta |
| `--linea-noche` | `#34402F` | Las líneas del papel sobre tinta | Decorativa |

- **Lleno = en curso; rojo = vence.** Son las dos únicas marcas del sistema. El rojo nunca marca un error, un botón ni
  un feriado: el almanaque al revés.
- El lienzo da **15,73:1 contra el negro del sitio** (`#060606`).

## 6 · Ingredientes reales para la fila del inventario (encargo §5)

Se completa al cerrar la pieza (ver `caso.md`).
