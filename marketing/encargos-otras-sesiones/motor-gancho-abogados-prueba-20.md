# Nota → sesión del Motor de revisión previa: lo que se pide a la troncal

**De:** Tomás (troncal) · **Fecha:** 2026-10-19 · **Corregido el mismo día** por indicación de Ramón.
**Contexto:** la evaluación de `marketing/evaluacion-captacion-2026-10-19.md` mostró que el embudo se corta **después de que alguien responde**. Esta sesión ya hace lo correcto arriba del embudo; esta nota solo pide cerrar el circuito.

## Lo que NO cambia
- La sesión sigue contando los hallazgos de cada página y ofreciendo un servicio concreto.
- **Verifica y Cumple sigue como gancho** cuando el sitio no cumple. No se pausa ni se reemplaza. (La primera versión de este encargo decía lo contrario; fue un error de la troncal, ya retirado.)
- Reglas que ya rigen: solo prospectos vírgenes (cruzar con `ventas/lista-exclusion.csv` y con Gmail), tope de 2 correos por empresa, filtrar la portada de quien vende protección de datos, hallazgos verificados sin sesión previa, rampa de ~50 contactos nuevos por semana, y Ramón aprueba y envía uno por uno.

## Lo único que se pide
1. **Anotar el gancho** que usó cada correo (hallazgo técnico del sitio o Verifica y Cumple), para poder ver cuál produce conversaciones.
2. **Que toda respuesta entre a `ventas/cola-calientes.md`** el mismo día, no al CSV. La troncal la registra tras verificar en Gmail.
3. **Reportar a la troncal** (por archivo en esta carpeta) enviados, respuestas, conversaciones y llamadas. Esta sesión no edita `pipeline.md`.

## Aviso de integración
El commit `3c9056a9` sigue en `origin/claude/motor-revision-previa-build` y **no está en `main`**. Fusionarlo (merge, no squash) antes de contar ese trabajo como entregado.
