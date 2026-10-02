# Encargo al troncal — agregar a Eduardo Bascur (Focus Contable) al pipeline

**De:** sesión de mini-diagnóstico (Valen) · **Para:** troncal (Tomás) · **Fecha:** 2-oct-2026

## Qué hay que hacer

Agregar una fila en `ventas/pipeline.md` para este prospecto. Es un lead **tibio y real**:
respondió un outbound pidiendo el diagnóstico. **Verifica contra la evidencia antes de registrar**
(regla de la casa); toda la evidencia está en Gmail de `hola@spindlelab.cl`.

## Estado real (con evidencia, no de oído)

- **Prospecto:** Eduardo Bascur Hernández — **Director de Operaciones**.
- **Empresas:** `focuscontable.cl` (marca de cursos + servicios tributarios, el sitio auditado) y
  `hbcontadores.cl` (su firma contable; de ahí es su correo y su dirección). Es **contador en
  Puerto Montt** (firma de correo: Valle Volcanes 5202, Puerto Montt).
- **Correo de contacto:** `eduardohb@hbcontadores.cl` · tel. publicado +56 9 6167 3894.
- **Fuente del lead:** outbound de SpindleLab del **30-sep-2026** (asunto *"focuscontable.cl vende
  cursos y no tiene política de privacidad"*). Sacado de la Guía de Empresas de DiarioEmprende.
- **Respuesta del prospecto (1-oct-2026):** pidió el diagnóstico gratis, textual *"Me interesa poder
  obtener un diagnóstico gratis… para evaluar la situación actual de nuestra empresa"*. → Esto ya es
  **evidencia de etapa "Contactado" con interés activo**, verificable en el hilo de Gmail.
- **Diagnóstico:** `SPL-DIAG-2026-007` LISTO (ver `marketing/diagnosticos/SPL-DIAG-2026-007-focuscontable/`).
  Borrador de respuesta **creado en Gmail**, en el hilo, con el PDF por adjuntar. **Lo manda Ramón.**

## Cómo registrarlo

1. **Ahora** (ya hay evidencia): fila en pipeline como **Contactado → respondió, pidió diagnóstico**.
   Fuente: outbound DiarioEmprende. Próximo paso: "Ramón envía SPL-DIAG-2026-007".
2. **Cuando Ramón confirme que mandó el correo** (verifícalo: el correo sale de "Borradores" y aparece
   en "Enviados" del hilo): mover a **"Diagnóstico/propuesta enviada"**, con fecha. No lo muevas antes
   solo porque el borrador existe; un borrador no es un envío.

## Avisos que deben viajar con este registro

- **Incidente a tener presente:** durante la auditoría, dos subagentes **enviaron los formularios
  reales de focuscontable.cl en producción** (prueba de anti-spam, marcado "Third-Party Attack").
  Ramón incluye una línea de disculpa en el correo. Si el prospecto lo menciona, ya está reconocido.
  Detalle en el README del diagnóstico.
- **Encargo aparte para Diego/diseñador** (no es tuyo, troncal, pero déjalo anotado si no existe):
  revisar por qué el workflow de auditoría terminó haciendo POST a formularios de un tercero, para
  que no se repita.
