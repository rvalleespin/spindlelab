# Aplomo — constructora industrial y edificación corporativa

> **PIEZA DE CONCEPTO. Aplomo no existe.** No es una constructora, no es un cliente y
> ninguna de las obras ocurrió. Reglas de la serie en [`../README.md`](../README.md).

## Por qué este rubro

Construcción industrial B2B es el complemento exacto de Raigal: mismo perfil de decisión
(cara, lenta, investigada) pero en el otro extremo del espectro visual y con un comprador
distinto. Un jefe de operaciones o un gerente de planta no compra igual que un paciente.

- **El ticket es el más alto de la cartera.** Una nave de 2.500 m² son del orden de 50.000
  UF. Un sitio que gana una licitación de ese tamaño se paga muchas veces.
- **Las preguntas son técnicas, largas y nadie las responde.** «¿Cuánto cuesta una nave
  industrial por m²?», «¿cuánto demora la recepción municipal?», «¿suma alzada o
  administración delegada?». La competencia contesta con un formulario de contacto.
- **El comprador investiga antes de llamar.** Arma su presupuesto interno con lo que
  encuentra. Quien le da el número primero, entra a la licitación.

## La marca ficticia

- **Nombre:** Aplomo. Significa las dos cosas a la vez: que un muro está **a plomo**, y la
  serenidad de quien no se descompone. Es exactamente lo que vende un contratista B2B.
- **Posicionamiento:** cuatro tipologías, nada de vivienda ni retail ni obra pública. En
  industrial, el que repite tipología es el que acierta el plazo.
- **Tono:** de oficio, sin adjetivos. Habla de luz libre, altura de hombro y mecánica de
  suelos porque su comprador habla así.
- **Titular:** «A plomo y a plazo». Usa el doble sentido del nombre y nombra las dos únicas
  cosas que un mandante compra.

## Bloqueo visual

Investigado con Refero antes de componer. En este rubro el catálogo sí tenía material
bueno:

| Aporte | Fuente | Qué se toma |
|---|---|---|
| Base | [19-86.fr](https://19-86.fr) | Archivo arquitectónico impreso: blanco, filetes de 1px, alineación tabular, titular monumental sin peso ornamental. «Parece impreso, no diseñado». |
| Detalle | [timescale.com](https://www.timescale.com) | Panel de borde duro con sombra desplazada, y el acento de alta visibilidad usado como marca técnica y no como decoración. |
| Detalle | [mostlikely.at](https://mostlikely.at) | El grano y la severidad deliberada. |

**La regla del acento:** el amarillo de alta visibilidad (`#D6E000`) **solo existe como
bloque relleno con texto negro encima**. Nunca como texto de color, nunca como fondo de
sección. Es la regla del chaleco reflectante: funciona porque aparece poco y siempre en el
mismo sitio. En toda la home se usa tres veces: el aviso de concepto, la ruta crítica del
programa y el hover de los botones.

**Lo que se rechaza:** el casco de stock, el degradado gris hormigón, el héroe centrado de
«construimos tus sueños» y la grilla de tarjetas de servicios.

**Tipografía:** la familia IBM Plex completa, en tres cortes con trabajo distinto. Condensed
para los monumentos, Sans para el cuerpo, **Mono para todo lo que es dato medido y nada
más**. Esa última regla es la que hace que la página se lea como una lámina.

## Distancia con Raigal, a propósito

Las dos piezas tienen que probar rango, así que están construidas como opuestos:

| | Raigal | Aplomo |
|---|---|---|
| Lienzo | Hueso cálido | Papel frío, casi blanco |
| Tipografía | Archivo + Newsreader (serif en el cuerpo) | IBM Plex Condensed / Sans / Mono |
| Temperatura | Cálida, un acero frío de acento | Fría, un amarillo de alta visibilidad |
| Densidad | Aire, pocas cosas | Tabular, densa, llena de datos |
| Forma | Sin bordes, filetes suaves | Todo con filete negro y sombra dura |

## Los activos propios del oficio

Aplicando lo aprendido en Raigal: donde falta fotografía, va el activo que el rubro
produce de verdad.

1. **Programa de obra (Gantt) a escala real.** Ocho partidas en una grilla de 44 columnas
   que son 44 semanas, con la ruta crítica marcada. Es **el** documento de la
   construcción y ninguna constructora lo publica. Prueba el titular de la sección de un
   vistazo: casi cuatro meses se van antes de que llegue una máquina.
2. **Corte tipo en SVG** de una nave de estructura metálica, con las cotas reales que
   definen el precio (luz libre 25,00 m, hombro 8,00 m, cumbrera 10,20 m).
3. **Tabla de costos por m²** en UF por tipología, con plazo referencial.

## Lo que la pieza demuestra

1. **Un segundo mundo visual**, que no se parece ni a SpindleLab ni a Raigal.
2. **Capa AEO:** `GeneralContractor` con `OfferCatalog` y rangos de precio por m² en UF,
   más `FAQPage` con seis preguntas técnicas respondidas completas.
3. **Publicar lo que el rubro esconde** como argumento de venta: precio por m², programa
   de obra y condiciones de contrato. La sección «lo que no controlamos» (DOM, precio del
   acero, suelo, lluvia) es el equivalente a los límites clínicos de Raigal.

## Estado

- [x] Ficha y bloqueo visual
- [x] Home construida (`sitio/index.html`)
- [x] Barrido limpio a 390 px y 1440 px
- [ ] Páginas internas (tipologías, obras, contrato)
- [ ] Fotografía de obra, si se suma después. La pieza no depende de ella.
- [ ] Revisión humana antes de usar esto con un prospecto
