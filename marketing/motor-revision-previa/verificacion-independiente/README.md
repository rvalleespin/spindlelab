# Verificación independiente de hallazgos

El motor mide. Esta carpeta es el paso que **desconfía del motor**: dos revisores (agentes con contexto limpio) vuelven a medir
cada hallazgo en vivo por su cuenta, uno repitiendo la medición y otro intentando refutarla. Solo lo que ambos sostienen llega a
la redacción del correo. Nació del lote de 94 contactos del 16-oct-2026: de 33 hallazgos "fuertes", la verificación sacó 3 falsos
(sitios con contacto que el motor no vio), 1 sitio que solo redirige a otro y 1 con identidad dudosa, y cambió la frase de 3
(el sitio sí tenía aviso de cookies).

## Cómo correrla (sesión con la herramienta Workflow)

1. `node motor/preparar-verificacion.mjs <carpeta-del-lote> <carpeta-del-lote>/hallazgos.json` imprime los `ids`.
2. `Workflow` con `scriptPath` = `verificacion-independiente/workflow-verificacion.js` y
   `args = { archivo: "<ruta absoluta a hallazgos.json>", ids: [...], scratch: "<carpeta temporal>" }`.
3. Guardar el resultado como `<fecha>-<lote>.json` en esta carpeta con campos `id, dominio, oferta, final, nota, por, hechos, advertencias`
   (`final`: `confirmado | confirmado_con_aviso | refutado | no_concluyente | retener_identidad`). Ver el ejemplo de esta carpeta.
4. `node motor/exportar-emilia.mjs <salida> <carpeta-del-lote> --verificados <ese .json>` deja pasar como verificado solo lo confirmado.

Solo verifica C1, F1, F10 y F2. Lo demás sale como "falta verificación". Ningún revisor envía formularios ni acepta cookies: solo carga páginas.

## Límites
- Mide desde una IP de centro de datos de EE. UU.; un aviso que dependa de la geolocalización no se vería.
- No sabe si el destinatario administra el sitio (identidad): lo avisa, no lo resuelve.
- Es una verificación de máquina. No reemplaza que Ramón apruebe cada envío.
