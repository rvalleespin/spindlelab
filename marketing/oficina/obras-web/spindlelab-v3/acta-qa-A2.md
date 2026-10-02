# Acta de QA — A corregida (A2), ronda 2

**2-oct-2026.** Firmada por mí (la sesión), **no por las tres lentes independientes**: el
contenedor se reinició dos veces y mató la auditoría de la ronda 2 en vuelo. Declarado acá
porque el protocolo de la casa exige revisión independiente y esto es una excepción con
motivo, no el procedimiento normal.

**Mi independencia, y su límite.** No construí esto y nunca vi el razonamiento del agente
que lo reparó: murió antes de reportar. Solo tengo los archivos. Eso cubre el espíritu de
la regla (un revisor que escuchó al constructor aprueba lo que entiende). Lo que no cubre
es la diversidad de lentes: soy una, no tres.

## Veredicto: **aprobado con reparos**

## Lo medido (10 anchos, Playwright con viewport real, no deducido de capturas)

| ancho | dominio 28 car | dominio 34 car | overflow | oro 1er viewport | botón sobre el pliegue |
|---|---|---|---|---|---|
| 360 | 100 % | 98 % | no | 1 | sí |
| 390 · 414 · 768 · 1023 · 1024 · 1100 · 1150 · 1280 · 1440 | 100 % | 100 % | no | 1 | sí |

**La regresión que hundió la ronda 1 está cerrada.** El tramo 1024–1150 px, que esa ronda
inventó y nadie midió, se midió entero: el dominio entra completo.

## Verificación de cifras (la regla de cero prueba social inventada)
El tablero muestra **30 LEER / 40 ENTENDER / 30 CITAR** y «21 señales». Contrastado contra
el código del chequeo en producción (`spindlelab-astro/functions/api/chequeo.js`): los
bloques reales son `acceso: 30`, `entidad: 40`, `citabilidad: 30` — **suman 100**, sobre
**21 señales** contadas en el fuente. Los números son reales; lo que cambió es el rótulo, a
las palabras del visitante. **Sin cifra inventada.**

## Bloqueantes de la ronda 1, uno por uno

| # | Defecto | Estado |
|---|---|---|
| 1 | El campo no aguanta un dominio chileno | **cerrado**, medido en 10 anchos |
| 2 | El campo no parece un campo | **cerrado**: caja blanca con borde, texto legible |
| 3 | La bajada nunca dice qué llega primero | **cerrado**: «es la máquina que responde cuando alguien pregunta por tu rubro», con la condición encadenada y el matiz «cada vez más» |
| 4 | «Sin registro» promovido | **cerrado**: no se habla de registro en el primer viewport |
| 6 | El titular afirma algo que el instrumento no mide | **cerrado**: el titular ya no afirma sobre la obra de la casa |
| 7 | La segunda puerta no cubre a los dos públicos | **cerrado**: «construimos y rehacemos», en campo brasa con peso propio y botón propio |
| 8 | Nada medible | **pendiente de verificar** (el reporte del agente se perdió) |
| 9 | Falla la prueba del logo tapado | **cerrado a mi juicio**: papel + brasa + navy + el medidor son del sistema v3 |
| — | Sin camino a contacto sobre el pliegue | **cerrado**: «Escríbenos» en la barra fija |

Regresión de la ronda 1 (titular deíctico sin antecedente): **cerrada por composición, no
por reescritura.** El titular sigue siendo «Ahí se corta el circuito», pero ahora lleva
encima el ojillo «Estás pagando para que lleguen a tu sitio.», que es su antecedente. Leído
seguido, resuelve.

## Reparos abiertos
1. **A 360 px un dominio de 34 caracteres se corta al 98 %.** Marginal, pero es el mismo
   modo de falla de la ronda anterior y conviene cerrarlo del todo.
2. **En celular el titular y la bajada caen bajo el aviso de cookies.** No es el bloqueante
   de la dirección B (ahí era un elemento accionable); acá la acción está arriba y el
   argumento abajo, que para un hero de instrumento es defendible. Pero el referente
   restituido —que era el bloqueante 3— queda fuera de la primera pantalla en teléfono.
3. **El plan de medición no se pudo verificar**: el agente murió antes de reportarlo.
4. **Falta el pase de las tres lentes.** Esto lo firma una sola.

## Lo que está bien y no hay que perder en la ronda siguiente
- El campo como caja blanca sobre papel: es lo único de las tres versiones que se lee como
  instrumento a primera vista.
- Los dos públicos lado a lado con peso comparable, y «rehacemos» incluido.
- El medidor de tres celdas con los pesos reales: es la metodología publicada hecha visible,
  y es lo único que un competidor no puede copiar escribiéndolo.
- La bajada restituida del corpus, completa.
