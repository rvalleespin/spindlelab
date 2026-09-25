# Lista de exclusión del outbound

**Requisito de la estrategia de Verifica y Cumple (§6): tiene que existir antes del primer
envío.** Los 40 correos del lote ofrecen darse de baja y la política publicada
(`verifica.spindlelab.cl/privacidad`, puntos 04 y 10) dice que guardamos ese correo justamente
para no volver a contactarlo por error. Si no honramos eso, el primer abogado que quiera
devolvernos el golpe lo hace con una línea.

## Cómo se usa

- **Antes de cualquier envío**, cruzar la lista de destinatarios contra este archivo.
- Si alguien **pide darse de baja**: se agrega acá con `tipo=baja-solicitada`, se confirma en una
  línea y **no se pregunta por qué**.
- Una **negativa** ("no estamos interesados") también entra. No es lo mismo que una baja formal,
  pero volver a escribirle quema la marca.
- Los **rebotes** entran para no seguir gastando reputación de dominio en direcciones muertas.

## Tipos

| tipo | qué significa |
|---|---|
| `baja-solicitada` | Pidió explícitamente no recibir más correos. Bloqueo permanente. |
| `negativa` | Dijo que no al servicio. No re-contactar en esta campaña. |
| `rebote-duro` | La dirección no existe. |
| `rebote` | Buzón lleno o rechaza. Revisable más adelante. |
| `direccion-invalida` | La persona ya no está en la empresa. La empresa puede seguir siendo válida por otra dirección. |

## Ojo

El estado real de un prospecto vive en **Gmail**, no en los CSV de listas. Este archivo es la
capa de bloqueo, no el registro del pipeline.
