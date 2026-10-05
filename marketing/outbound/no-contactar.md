# La lista de exclusión NO vive acá

**Vive en [`ventas/lista-exclusion.csv`](../../ventas/lista-exclusion.csv)**, con su regla en
[`ventas/LEEME-lista-exclusion.md`](../../ventas/LEEME-lista-exclusion.md).

El 25-sep-2026 dos sesiones construyeron una lista de exclusión el mismo día sin saber una de
la otra: esta, en `marketing/outbound/`, y la de `ventas/`. **Dos listas de exclusión son peores
que ninguna**, porque cada quien consulta la suya y alguien que pidió la baja igual recibe
correo. Esta se disolvió en la de `ventas/`, que ya estaba en uso por el copiloto de outbound y
tenía diez filas reales sacadas de Gmail.

Lo único que esta versión aportaba y que se trasladó allá:

**Se busca por correo Y por dominio.** Alguien puede responder desde una dirección distinta de
la que le escribimos; el socio contesta desde su cuenta personal y el buzón al que escribimos no
aparece en ninguna parte. **La baja es de la empresa, no del buzón.**

Lo que NO se trasladó, y conviene saber por qué: los descartes por *sitio que no existe*
(Ópticas CL Visión, SG Fertility) no entraron. Esa lista es capa de bloqueo, y un prospecto sin
sitio no es un bloqueo, es un descarte de calificación. Viven en el LEEME de su lote.

Este archivo se queda solo como señal, para que nadie vuelva a crear la lista acá.
