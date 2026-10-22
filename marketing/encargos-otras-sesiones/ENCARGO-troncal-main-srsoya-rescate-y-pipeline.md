# Encargo a la sesión troncal que trabaja sobre `main`: SR.SOYA

- **De:** Tomás, desde la rama `claude/spotify-landing-page-campaigns-a4pvct` · **22-oct-2026**
- **Dos cosas:** un rescate de archivos y una fila de pipeline desactualizada.

---

## 1. ⚠️ Esta rama NO se puede fusionar a `main`

Verificado: **no hay ancestro común.**

```
git merge-base HEAD origin/main   →  (vacío)
raíz de la rama:  4171b217…       (424 commits)
raíz de main:     e1ab6bb5…       (242 commits)
```

`git merge` responde `fatal: refusing to merge unrelated histories`. **No forzar con
`--allow-unrelated-histories`:** son dos árboles paralelos del mismo repo y el merge produciría
«added in both» en masa, que es justo lo que este repo ya sufrió con los squash.

**El rescate correcto es por archivo.** Estos diez existen **solo en la rama** y ninguno está en
`main`:

| Archivo | Qué es |
|---|---|
| `marketing/oficina/clientes/sr-soya.md` | **La ficha del cliente.** Lo más importante del lote |
| `ventas/cotizaciones/SPL-COT-2026-016-srsoya-academia-vocal.html` / `.pdf` | **La cotización que se le envió el 20-oct** |
| `ventas/anexos/SPL-NT-2026-002-srsoya-academia-vocal.html` / `.pdf` | El anexo que se envió con ella |
| `ventas/sr-soya-revision-troncal-2026-10-22.md` | **Esta revisión. Trae el hallazgo del IVA** |
| `ventas/sr-soya-que-estamos-vendiendo.md` | El cruce entre lo vendido y lo pedido |
| `ventas/sr-soya-validacion-funnel-meta.md` | La validación del embudo con datos de plataforma |
| `ventas/reunion-srsoya-academia-vocal.md` | Guion de la reunión: riesgos, accesos, material |
| `ventas/sr-soya-correo-respuesta-academia.md` | Registro del correo |

Hay además documentos anteriores de SR.SOYA en commits previos de la misma rama
(`sr-soya-academia-vocal-analisis.md`, `sr-soya-modelo-de-cobro.md`, los análisis de Terapias 5D,
`SPL-NT-2026-001`, `SPL-COT-2026-015`). **Conviene revisar si alguno falta en `main` también.**

## 2. La fila de Carlos Soya en `ventas/pipeline.md` está desactualizada

La de `main` es **anterior al giro**: lo llama «proyecto Terapias 5D», su próximo paso son las dos
preguntas del 19-oct, y no sabe que salió una cotización nueva. Lo verificado al 22-oct:

- **20-oct 21:51 UTC: se envió la respuesta**, mensaje `1a15b4c03e1ca083`, **con los dos PDF
  adjuntos**. Lo confirma la etiqueta `SENT` y los nombres de archivo de los adjuntos.
- **Carlos no ha respondido.** Van dos días.
- **Sigue sin pagar.** El depósito del 12-oct nunca llegó.

**Fila lista para reemplazar:**

```
| Carlos Soya (srsoya.com · «Academia vocal online») | Clases de canto online para alumnos de EE.UU. (marca nueva, sin web, agenda ni cobro) | Reunión por Meet el 10-sep | **Cotización nueva enviada — sin pago, sin arranque** | **Esperar su respuesta al correo del 20-oct** y agendar los 30 min que se le propusieron. Guion en `ventas/reunion-srsoya-academia-vocal.md`. Si no responde, retomar | 20-oct-2026 21:51 UTC: Ramón envió la propuesta nueva con `SPL-COT-2026-016` y `SPL-NT-2026-002` adjuntos (verificado en Gmail). Carlos no ha contestado | **Tercer enfoque del mismo cliente:** disco (15-sep) → Terapias 5D (21-sep) → academia vocal (19-oct). **No ha pagado nada**: el depósito del 12-oct nunca llegó. **Cotización vigente: SPL-COT-2026-016**, que reemplaza a la 015 y vende el embudo de compra más la administración de campañas en Meta por los mismos $200.000/mes × 3. La página ($290.000) va incluida **por única vez**, y eso quedó escrito. ⚠️ **$200.000 es + IVA: el costo real son $338.000/mes, no los $300.000 que Carlos tiene en la cabeza.** Decisión de precio pendiente de Ramón, detalle en `ventas/sr-soya-revision-troncal-2026-10-22.md` §1. ⚠️ Tampoco está escrito qué pasa con la gestión de redes del proyecto musical durante los tres meses |
```

## 3. Lo que NO hay que hacer

- **No pasar a `proyectos-en-curso.md`.** No ha pagado, así que todavía no es un proyecto en curso.
  La fila de pipeline es el lugar correcto.
- **No dar por iniciado el trabajo.** Los plazos, según la cotización enviada, corren desde el
  primer pago y los accesos. Ninguno de los dos ha ocurrido.
