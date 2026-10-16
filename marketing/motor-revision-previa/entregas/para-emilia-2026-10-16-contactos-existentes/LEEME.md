# Entrega para Emilia (16-oct-2026): contactos que la búsqueda de leads ya tenía

Sin Apollo: 94 sitios sacados de los CSV de `ventas/`, sin los excluidos, los ya contactados (cruzado con Gmail enviado) ni los ya marcados "no escribir".
Origen: `corridas/2026-10-15-lote-contactos-existentes/` (3 corridas de navegador por sitio). Verificación: `verificacion-independiente/2026-10-16-lote-contactos-existentes.json`.

**El motor no escribe el correo ni lo envía.** Esta entrega separa lo que se puede escribir de lo que no.

| Archivo | Para qué |
|---|---|
| `para-emilia.csv` | Encabezado idéntico al de Dereck: `empresa,dominio,email,hallazgo_medido,estado`. **Solo se escribe a las filas cuyo `estado` empieza con `VERIFICADO`.** |
| `para-emilia-detalle.csv` | Lo que se usa para redactar: `como_decirlo_en_castellano`, `frase_de_arreglo`, `puerta_a_la_reunion`, `linea_de_precio_de_referencia`, `que_no_afirmar` y, **nuevo**, `hechos_verificados` y `advertencias_de_la_verificacion` (lo que dos revisores independientes midieron por su cuenta). |

## Quién es quién (94 filas)
- **28 `VERIFICADO por revisión independiente`**: 12 de cookies sin aviso, 3 de cookies **con aviso** (ver abajo), 10 de formulario sin política de privacidad, 3 de sin acción de contacto en la primera pantalla.
- **1 `retener`** (identidad del sitio dudosa), **1 `no concluyente`** (el dominio solo redirige a otro sitio), **3 `NO ENVIAR: la verificación no lo sostuvo`** (el sitio sí tenía contacto): no escribir.
- **32 `NO ENVIAR: falta verificación`**: ofertas débiles o medias que nadie verificó. No escribir hasta decidir qué hacer con ellas.
- 27 `No enviar` por descartados antes, sitio caído o sin nada que decir.

## Reglas que Emilia no cambia
1. **Los hechos**: se redacta con `como_decirlo_en_castellano` y `hechos_verificados`, y se respetan `que_no_afirmar` y `advertencias_de_la_verificacion`.
2. **Cookies con aviso** (el `estado` lo dice): el sitio SÍ tiene aviso de cookies. Nunca escribir "no tienes aviso". La frase correcta es que las cookies ya estaban guardadas antes de elegir algo en el aviso. Es un gancho más débil.
3. **Identidad**: si la advertencia habla de redirección o de otra organización, no escribir "tu sitio" sin confirmar que el destinatario lo administra.
4. **Llamada de 20 minutos** como puerta; **línea de precio de referencia** salvo el kit (Desde $149.000 + IVA); sin plazos; registro singular.
5. **Cada envío lo aprueba Ramón.** Antes de enviar, confirmar en Gmail (`in:sent to:dominio`): el cruce de esta entrega busca por dominio del destinatario.

## Lo que no se probó
No hay dato de conversión. La verificación es de máquina (IP de datacenter de EE. UU.), no de una persona. Las frases de arreglo que no son del kit siguen siendo BORRADOR.
