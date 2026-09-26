# Seis mediciones reales, del 25-sep-2026

Sitios abiertos con Chrome por CDP (contexto nuevo, sin un solo clic) usando el **mismo
`medirConNavegador`** que corre en producción: lo único local fue el cliente WebSocket. Cada
archivo es lo que devolvió ese guion, podado a lo que `armarInforme` lee.

| archivo | qué es |
|---|---|
| `santander.json` | **El bloqueante.** `www.santander.cl` manda a una pared de Akamai en `banco.santander.cl` y el chequeo profundo le ponía **77/100 con tres ítems en verde**, incluido "tu sitio no dejó ninguna cookie de rastreo" sobre las dos cookies del bot manager que acababa de detectarnos (`_abck`, `bm_sz`). |
| `tuane.json` | Portada real de **261 letras**. Es el caso que prohíbe cortar por "poco texto" a secas. |
| `uhc.json`, `hjmc.json`, `pdnd.json`, `zarhi.json` | Los otros cuatro prospectos reales (estudios de abogados). Ninguno tiene cookies de portero, y los cinco tienen que seguir recibiendo informe después de cualquier arreglo del bloqueante. |

## Por qué viven acá y no en el banco de `ev0/ev1/ev2`

Ese banco está en una **carpeta de sesión** (`scratchpad/borradores/`) que se borra, y el
`LEEME.md` de arriba ya dice "si esa carpeta ya no está, se rehace". Este caso no se puede
perder: es un falso verde que llegó vivo hasta la víspera del despliegue. Por eso estos seis
archivos viven junto a la prueba que los usa, y `prueba-profundo.mjs` los lee por una ruta
relativa a sí misma, no por la variable de entorno del banco.

## Cómo se rehacen

Con Chrome headless en un puerto de CDP y el medidor del scratchpad
(`profundo/cierre-api/medir.mjs`), que arma el cliente `{ enviar, al }` y llama a
`medirConNavegador`. Si se rehacen, **las cifras congeladas en `prueba-profundo.mjs` §21 y
§22 cambian con ellas**: son un retrato del sitio en una fecha, no una constante.
