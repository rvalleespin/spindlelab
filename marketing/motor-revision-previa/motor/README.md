# Motor de revisión previa: cómo correrlo

Detector de **sospecha**. Dice dónde mirar. No produce el hallazgo del correo (ese se comprueba
abriendo el sitio) y no manda nada. La regla de todo esto está en `../01-jerarquia.md`.

Sin dependencias: Node 22 y un Chromium.

## Correr un dominio

```bash
# Entorno cloud (con proxy): NODE_USE_ENV_PROXY=1 es obligatorio, el fetch de Node no lee HTTPS_PROXY solo.
# En el Mac no hace falta.
NODE_USE_ENV_PROXY=1 node --no-warnings revisar.mjs <dominio> --id S01 --out ../corridas/<carpeta>
#   --correo x@y.cl   cruza también la lista de exclusión por correo
#   --sin-corte       salta exclusión / ya-contactado / parking. SOLO para probar el motor sobre sitios propios.
```

Chromium: se busca en `/opt/pw-browsers`; en el Mac, Chrome. Para otro binario: `CHROME_BIN=/ruta`.
Cada dominio tarda ~1,5 a 2 minutos (dos corridas de navegador de ~25 s, la sonda de borde y el resto).

## Fijar la muestra antes de correr

```bash
node muestra.mjs 10 > ../corridas/muestra-preregistrada.json
```

## Qué sale, por dominio (carpeta `<out>/<id>/`)

| Archivo | Para quién |
|---|---|
| `ficha.md` | Quien lee: resultado, hallazgo, qué se puede y qué NO se puede afirmar, las cuatro condiciones. |
| `ficha.json` | Máquinas (el mismo contenido más el mapa y la evidencia cruda). |
| `navegador-r1.json`, `navegador-r2.json` | Peticiones, cookies y DOM por tramo, de cada corrida. |
| `r1-A.jpg`, `r1-B.jpg`, `r2-A.jpg`, `r2-B.jpg` | Capturas del tramo A (quieto) y B (con movimiento). **La captura B es lo que prueba o desmiente "no hay aviso".** |

`resultado` es uno de: `hallazgo-capa-2` · `sin-gancho-capa-2` (hay punteros, ninguno estable) ·
`solo-capa-1` · `sin-hallazgo` · `no-concluyente` · `descartado:<motivo>`.

## Las pasadas

| | Archivo | Qué hace |
|---|---|---|
| 0 | `pasadas/p0.mjs` | Exclusión (correo y dominio), ya contactado, responde, es sitio propio, el HTML alcanza. |
| 1 | `pasadas/p1.mjs` | Capa 1 por HTTP: contacto, analítica, robots para agentes de IA, llms.txt, sitemap, JSON-LD. |
| 2 | `lib/navegador.mjs` | Dos tramos, dos corridas, cero clics. Cargó / cookie / envió, en columnas separadas. |
| 3 | `pasadas/p3.mjs` | Borde por diferencia de agente, contenedor de Tag Manager, contacto estructural, entidad interna. |
| 4 | `pasadas/p4.mjs` | Cuatro condiciones con razón escrita, estado, topes y orden. |
| + | `lib/arreglo.mjs` | **De hallazgo a lo que se vende:** producto, precio, frase de arreglo y cómo se le diría al dueño en castellano. Solo usa precios y textos documentados en el repo; lo demás va como `POR DEFINIR` y `BORRADOR`. Pasa por un revisor de tono (raya larga, "soluciones", plazos inventados). |
| + | `exportar-emilia.mjs` | **Entrega para Emilia (agente-outbound):** un CSV con el encabezado exacto de los lotes de Dereck (`empresa,dominio,email,hallazgo_medido,estado`) y un detalle aparte con castellano, arreglo, precio y qué no afirmar. No escribe ni envía el correo. |
| + | `reemitir.mjs` | Añade la propuesta a fichas ya generadas, sin abrir navegadores. |

## Topes que están en el código (no se aflojan sin decisión)

- `verificado` no existe en el motor. Máximo es `estable` (la misma conclusión en 2 de 2 corridas).
- **C2 (medición) y C4 (entidad)** nunca pasan de `sospecha`. La rotura de formulario de **C5** tampoco: un GET no es un envío y el motor no envía.
- **C3 (borde)** solo es candidato si nombra la causa; sin causa es capa 1. Y se prueba con el *nombre* del agente desde una IP que **no** es la oficial, así que la frase permitida es "al presentarse con el nombre X, el servidor respondió Y", nunca "bloquea al bot real".
- Lo que cambia entre las dos corridas queda fuera de la afirmación y se anota.
- Los rastreadores se afirman por **cookie escrita**, no por "recibió la visita" (cargó ≠ dejó cookie ≠ envió datos).

## Límites conocidos

- Desde el entorno cloud la IP es de datacenter y sale por un proxy. Esto puede distorsionar la sonda de borde y cualquier sitio que trate distinto a una IP de datacenter. La confirmación y la repetición de la sonda de borde van en el Mac.
- Sin clics (§3) no se ve qué se dispara al enviar un formulario.
- El cruce de entidad con la ficha de Google y LinkedIn es manual.
- C6 (subdominio o staging viejo indexado) no está construido: se hace si las corridas lo piden.
