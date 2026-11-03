# Registrar a Focus Contable (Eduardo Bascur) en el pipeline

**Para:** el troncal (`agente-troncal-marketing`), el único que edita `ventas/pipeline.md`
**De:** la sesión del motor de revisión previa · 3-nov-2026
**Pide:** Ramón ("anótalo en el pipeline como encargo para el troncal")
**Qué se pide:** agregar una fila en `ventas/pipeline.md`, o decidir que ya está bajo otro nombre. Esta sesión no edita el archivo.

## Por qué es necesario
- [Cierto] Buscando "focus" y "bascur" en `ventas/pipeline.md` no hay ninguna fila. Es el negocio más grande en juego (cotización de Sitio Completo) y no figura.
- [Cierto] El propio pipeline avisa que está "en reconstrucción desde el 21-sep" y que no es la realidad todavía. Este caso puede entrar con esa reconstrucción (`ventas/pipeline-reconstruccion-preguntas-2026-09-21.md`).
- [Cierto] El copiloto lo marcó el 2-nov como "el lead más caliente del embudo", sin respuesta desde el 27-oct. Esa alerta salió del copiloto; la hizo visible esta sesión al leer su resumen.

## Fila propuesta (el troncal decide etapa y redacción)

| Nombre / Empresa | Rubro | Fuente | Etapa | Próximo paso | Último contacto | Notas |
|---|---|---|---|---|---|---|
| Eduardo Bascur Hernández, Director de Operaciones. Focus Contable / HB Contadores (dos marcas del mismo dueño), Puerto Montt | Contadores y asesoría tributaria; además vende cursos ($25.000 a $70.000) | Guía de DiarioEmprende (`ventas/contactos-diarioemprende-30sep.csv`), lead de la sesión de búsqueda de leads | **Propuesta formal enviada** (etapa 4): cotización SPL-COT-2026-017, Sitio Completo, 23-oct | Si no responde al correo del 3-nov: WhatsApp o llamada el vie 6-nov (+56 9 6167 3894); correo de cierre el lun 9-nov. Lo decide Ramón | 3-nov 13:14 UTC, correo de Ramón en el hilo de la cotización | Sin respuesta desde la cotización (11 días). Pendiente de él: quién tiene el dominio y el hosting. Danaesp@hbcontadores.cl va en copia. Cursos quedan para una segunda etapa. Monto: ver el PDF de la cotización (no está en este repo, no verificado) |

## Línea de tiempo (todo verificable en Gmail de hola@spindlelab.cl)
1. **30-sep:** primer correo "focuscontable.cl vende cursos y no tiene política de privacidad" (hilo `1a0f2aceca48e041`). Origen: sesión de búsqueda de leads.
2. **1-oct 12:08 (Santiago):** Eduardo pide el diagnóstico gratis, textual: "Me interesa poder obtener un diagnóstico gratis…".
3. **2-oct 19:26:** diagnóstico enviado con PDF (`ventas/HANDOFF-diagnostico-focuscontable-2oct.md`).
4. **Mié 21-oct:** reunión (según el correo de la cotización: "la cotización que conversamos el miércoles"). Contenido de la reunión: no está en el repo; lo sabe Ramón.
5. **23-oct 13:44 UTC:** cotización enviada en el hilo `1a168f41cb965668`, mensaje `1a16901e5c77966f`, con PDF `SPL-COT-2026-017_focus_contable.pdf` y copia a Danaesp.
6. **27-oct 14:12 UTC:** seguimiento de Ramón (mensaje `1a17db4940f4d6f5`): pregunta cómo quedaron y quién tiene dominio y hosting.
7. **3-nov 13:14:58 UTC:** nuevo correo de Ramón en el mismo hilo (mensaje `1a1a18c72cd260ea`): "¿Pudieron mirar la cotización del sitio nuevo? … si el Sitio Completo les hizo sentido o si hay algo que quieran ajustar…". Ramón indicó que ese texto salió de la sesión de búsqueda de leads. Esta sesión no lo redactó.

## Reglas para no estropear el negocio
- Es un negocio de **Desarrollo Web**, no de Verifica y Cumple. El copiloto y el motor ven estos hilos por el pie de privacidad y los tratan como VyC. No enviarle toques de VyC mientras la cotización siga abierta.
- Hoy lo protege solo la etiqueta `copiloto/entregable-avisado` del hilo del diagnóstico. Si se quita, el copiloto lo vuelve a ver. El troncal puede decidir si conviene dejarlo en la lista de exclusión del copiloto con un motivo; el tipo `en-negociacion` no existe en `ventas/LEEME-lista-exclusion.md`, no inventarlo.
- La ficha del motor para focuscontable.cl dice "NO ENVIAR: falta verificación a mano. OFERTA DÉBIL" (`marketing/motor-revision-previa/entregas/para-emilia-2026-10-16-contactos-existentes/para-emilia.csv`, línea 57; ese archivo vive en la rama `claude/motor-revision-previa-build` y todavía no está en `main`). Es solo un hallazgo de portada pesada; no es la oferta de este negocio.
- Antes de escribir la fila, verificar las fechas con Gmail; no copiar este resumen sin comprobarlo (regla del repo sobre "ya está hecho").
- Sincronizar primero: `git fetch origin main && git diff origin/main HEAD -- ventas/pipeline.md`.
