# Deslinde — derecho laboral y cumplimiento para empresas

> **PIEZA DE CONCEPTO. Deslinde no existe.** No es un cliente, no es un caso, y
> ninguna de las personas nombradas existe. Reglas de la serie en
> [`../README.md`](../README.md).

## Estado: guardada, sin revisión fina

Escrita el 29-sep-2026. **Ramón pidió no seguir gastando en las piezas de concepto**
ese mismo día: *«si por los proyectos no nos gastemos. serán sitios que más adelante
voy a echarle un ojo más fino porque lo que me muestras es algo bastante genérico.
cumple con el propósito de llenar el sitio en este momento»*.

Queda escrita y verificada, **no incorporada al índice de trabajo del sitio**. Entra
cuando él lo decida, no antes.

## El nombre

«Deslindar» es fijar dónde termina una cosa y empieza otra, que es literalmente el
trabajo. Palabra común, no apellido — a propósito: en Chile los estudios se llaman por
el apellido de los socios, así que un apellido plausible es justo lo que la regla 2 de
la serie prohíbe.

**Colisión verificada antes de fijarlo.** El primer candidato era *Cauce*, y se
descartó: **Cauce Capital Abogados existe en Chile**. Búsqueda de «Deslinde» + abogados
Chile devuelve el concepto jurídico (deslinde de propiedades) y estudios que lo ofrecen
como materia, pero **ningún estudio llamado así**.

## Por qué este rubro

B2B y YMYL a la vez: decisiones laborales con plata y con consecuencia jurídica. Las
consultas son largas y específicas («¿puedo despedir a alguien con licencia?»), que es
el formato que un motor de IA cita, y la competencia las responde con un formulario de
contacto.

## Bloqueo visual (Refero, antes de componer)

| Aporte | Fuente | Qué se toma |
|---|---|---|
| Base | [mode.com](https://mode.com) | Lienzo bosque profundo, el titular metido DENTRO de un bloque de realce macizo, superficies de papel para lo secundario, radio 16px, apilado a la izquierda, cero sombras. |
| Detalle | [legora.com](https://legora.com) | Gravedad editorial legal: display serif grande con tracking negativo contra cuerpo sans chico. |
| Detalle | [vectary.com](https://vectary.com) | Tratamiento de documento normativo para el contenido: secciones numeradas, listas estructuradas, metadatos. |

**Se rechaza a propósito** lo que tiene el 90% del rubro: azul marino con dorado,
columnas, balanza, martillo, corbata de stock, apellido como marca.

**Compone contra las otras dos**, que es la regla de la serie: Raigal es hueso cálido y
serif de libro; Aplomo es papel frío y monoespaciada; Deslinde es bosque oscuro y slab.
Y contra el sitio de la propia agencia, que es casi negro con Manrope.

**Tipografía:** Zilla Slab (titulares) + Libre Franklin (cuerpo). Ninguna de las dos se
usa en las otras piezas ni en SpindleLab.

**Contraste calculado sobre los valores, no estimado:** papel sobre bosque 11,86:1 ·
salvia sobre bosque 7,12:1 · realce sobre bosque 9,67:1 · bosque sobre realce 9,67:1 ·
gris sobre papel 6,42:1.

## El activo que reemplaza a la foto

Misma lección que Raigal: no se deja la ranura vacía ni se finge una foto. Se dibuja lo
que el oficio sí dibuja. Acá son dos:

- **La matriz de cumplimiento** — tabla de obligación / responsable / evidencia /
  frecuencia / riesgo. Es un entregable real de este trabajo y ningún estudio de la
  competencia lo publica.
- **La línea del vínculo laboral** — cuatro etapas, sin plazos en días.

## Cuidado YMYL: por qué no hay plazos ni respuestas cerradas

Un plazo legal mal escrito en una pieza de concepto sigue siendo un plazo legal mal
escrito. Las cinco preguntas se responden **por lo que determina la respuesta** —que es
como responde un abogado de verdad— y no con un sí o un no que sería falso en la mitad
de los casos. La línea de etapas no lleva días. Y la página dice tres veces, arriba,
en el aviso y en el pie, que nada de eso es asesoría legal.

## Capa técnica que demuestra

`@graph` con `LegalService` + `Person` (la abogada, con `knowsAbout`) + `FAQPage` con
las cinco preguntas largas + `BreadcrumbList`. La ficción va **dentro del structured
data**, en `disambiguatingDescription` y en la `description` de la persona, no solo en
el HTML visible: si un motor lee el JSON-LD y no el texto, igual tiene que enterarse de
que esto no existe.

Las preguntas van como texto plano con encabezados reales, no dentro de un acordeón
cerrado por JS: lo que no está en el documento no se cita.

## Verificado

Render a 1440px: 7.473px de alto, **desborde horizontal 0**, 0 imágenes rotas, 1 bloque
JSON-LD. `noindex, nofollow` puesto.

## Lo que falta si alguna vez se retoma

- La revisión fina de Ramón, que es lo que está pendiente para las tres piezas.
- Páginas internas: hoy es una sola pantalla larga, como Raigal y Aplomo.
- Fotografía, si alguna vez se desbloquea. Hoy la pieza funciona sin ninguna.
