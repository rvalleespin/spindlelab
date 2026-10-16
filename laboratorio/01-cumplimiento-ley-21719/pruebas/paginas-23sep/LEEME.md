# Una página capturada, del 23-sep-2026

`home-www.bancoestado.cl.html` (650 bytes, md5 `db6f6e8515a72efebd3f3f00b1fe62f1`) es el
cuerpo **exacto** que `https://www.bancoestado.cl/` le devolvió a nuestro lector automático
el 23-sep-2026: un **200** que dice "se ha restringido este acceso". Los dos chequeos lo
puntuaban como si fuera la portada del banco, y ese es el falso verde que cerró el detector
de páginas de bloqueo.

Lo leen `prueba-destino.mjs` §18 y `prueba-vyc-streaming.mjs`, por una ruta relativa a sí
mismas.

## Por qué vive acá

Hasta el 26-sep las dos pruebas lo leían de
`/private/tmp/claude-501/…/<uuid-de-sesión>/scratchpad/verif/integracion/`: la carpeta de
scratchpad de **una** sesión de Claude Code, con su UUID escrito en la ruta. Pasaban por
casualidad —la sesión que las corría era justo esa— y en cualquier otra máquina, o en la
siguiente sesión, reventaban con `ENOENT`. Es el mismo problema que el banco de mediciones:
la evidencia de un falso verde no puede vivir en una carpeta que se borra sola.

## Cómo se rehace

Pidiendo la portada con el mismo agente que usa el chequeo
(`VerificaYCumple/1.0 (+https://verifica.spindlelab.cl/)`) y guardando el cuerpo tal cual.
Ojo: **el contenido cambia** — la última línea trae un `Reference:` distinto en cada
respuesta, y la prueba comprueba el largo (entre 600 y 700 bytes) y la frase, no el md5. Si
se rehace, esa comprobación es la que dice si la captura sigue siendo la misma evidencia.
