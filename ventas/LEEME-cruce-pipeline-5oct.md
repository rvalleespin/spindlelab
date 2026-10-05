# El cruce completo del pipeline contra Gmail (5-oct-2026)

Se cruzaron **308 dominios, uno por uno**, contra `in:sent` sin límite de fecha. No por
muestreo: esta misma mañana una muestra de 16 direcciones dijo que había un 38% sin tocar
en las inmobiliarias y el real era 8%. Las listas se agotan a ritmos muy distintos y una
muestra no sirve para decidir dónde prospectar.

Antes de este cruce ya se habían hecho, completos: clínicas dentales y médicas (104),
inmobiliarias de Maps (38) y la guía de DiarioEmprende (53).

## El número

| | |
|---|---|
| Direcciones únicas en todos los bancos | **493** |
| Dominios cruzados en esta pasada | 308 |
| Ya contactados | 222 |
| **Vírgenes** | **86** (28%) |

Las 86 están en `virgenes-cruce-5oct.csv` con su correo y su CSV de origen.

Sumando lo de antes: de los 493 del pipeline completo, quedan **86 + 25 clínicas sin
medir = 111 leads vírgenes**. El resto está contactado, cerrado o descartado.

## La merma que hay que descontar

De las 39 clínicas vírgenes del banco anterior, solo **12 terminaron en correo**. El 69%
se cayó: tres dominios muertos, uno aparcado en GoDaddy, uno reciclado por otro negocio,
tres que eran distribuidores de insumos y no clínicas, y seis sin un hallazgo que justifique
escribir.

Si esa proporción se repite, de las 86 vírgenes saldrían unos **27 correos reales**. Hay que
contarlo así al planificar, porque el número bruto engaña.

## Por qué Apollo no es la prioridad

En Apollo hay **4.522 estudios de abogados disponibles** y tenemos 220. El pozo existe. Pero
el cuello de botella no es la lista: cada primer contacto necesita abrir el sitio en un
navegador real con la sonda, dos tramos, y leer la salida. Hoy se midieron 28 sitios y eso
ocupó casi toda la sesión.

Con 111 vírgenes ya en mano hay cuatro o cinco sesiones de medición por delante. Sacar más
leads ahora solo engorda una cola que no se alcanza a procesar. Y cuando se vuelva a Apollo,
conviene pedir un filtro que reduzca esa merma del 69% —empresas con sitio propio
verificado, no un correo genérico de Gmail— en vez de volumen.

## Lo que apareció de paso, y vale más que el conteo

**Dos entregables enviados sin respuesta, además de Focus Contable:**

- **corteszamora.cl** (Gabriel Zamora) pidió una cotización el 20-ago, la recibió el 21-ago
  con el diagnóstico adjunto, y se le escribió el 24-ago, el 1-sep y el 22-sep sin respuesta.
  Es el lead más avanzado del pipeline: pidió precio.
- **plabogados.cl** (Claudia Osorio) respondió el 10-sep que estaban rehaciendo el sitio y
  **"podríamos conversar (en noviembre?)"**. Nadie agendó eso. Noviembre es ahora.

Los dos deberían caer en el PASO 3B del copiloto, que se agregó hoy. El de Claudia no, porque
no lleva adjunto: ese hay que agendarlo a mano.

**Dos rebotes de agosto y septiembre que nunca se registraron:** dentalschneider.cl (19-ago)
y santiagocontadores.cl (3-sep). Con los de la mañana van seis en un día, todos anteriores
al 28-sep, que es cuando se creó la lista de exclusión.

## Nota de método

A mitad del cruce tipeé mal un dominio (`lizambogados` por `lizamabogados`) y ese lead quedó
sin revisar hasta que lo pillé. El origen fue retipear las tandas en vez de copiarlas del
script que las genera. **Si se repite este trabajo: generar las cadenas de búsqueda con un
script y copiarlas literal.** Un dominio mal tipeado no da error: da un hueco silencioso, y
un inventario con huecos no sirve para decidir.
