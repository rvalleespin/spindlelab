# Traspaso del motor de revisión previa (28-oct-2026)

Para quien siga esto con un agente barato (Codex u otro). Lee solo este archivo y `pendientes-por-dia.md`. No hace falta leer la sesión anterior.

## Regla de oro
**Nunca se envía nada.** Solo se dejan borradores en Gmail (hola@spindlelab.cl) y Ramón los envía. Sin subagentes, sin comprar contactos, sin tocar el texto de los correos: los textos ya están escritos y revisados.

## Qué es esto
SpindleLab ofrece el kit "Verifica y Cumple" ($149.000 + IVA, una sola vez, no incluye asesoría legal) a sitios chilenos que usan cookies de seguimiento sin aviso o tienen un formulario sin política de privacidad. Cada correo parte de un hallazgo real medido por el motor. Secuencia: 3 toques por contacto (día 0, 3 y 7), los toques 2 y 3 como **respuesta en el mismo hilo**.

## Dónde estamos (verificado en Gmail el 28-oct)
| Grupo | Toque 1 | Toque 2 | Toque 3 |
|---|---|---|---|
| 1ª ola (5) | 16-oct | 19-oct | 23-oct, hecho |
| 2ª ola y reactivación (21) | 19-oct | 23-oct | vencido desde el 26-oct, sin texto para las 15 R |
| Tanda 1 Vibe (13 vivos; V28 y V44 rebotaron) | 23-oct | 27-oct | **vie 30-oct** |
| Tanda 2 Vibe (15) | 26-oct | **jue 29-oct** | **lun 2-nov** |

Sin respuestas ni rebotes de los motor desde el 23-oct. Una respuesta de terrantai.com llegó a un hilo del copiloto (no del motor): la lee Ramón.

## Calendario
1. **Jue 29-oct:** crear 15 borradores de toque 2 de la tanda 2 (`borradores/borradores-toque2-tanda2.json`).
2. **Vie 30-oct:** crear 13 borradores de toque 3 de la tanda 1 (`borradores/borradores-toque3-tanda1.json`).
3. **Lun 2-nov:** crear 15 borradores de toque 3 de la tanda 2 (`borradores/borradores-toque3-tanda2.json`).
4. **Hacia el 3-6 nov:** lectura de resultados (respuestas por tipo de hallazgo, cookies o formulario, y por tipo de destinatario). Comparar contra el ~5% del método anterior.

## Cómo crear cada lote (con acceso a Gmail)
1. `list_drafts` e `in:sent`: no duplicar. `search_threads` en la bandeja desde el último envío: quien respondió, pidió baja o rebotó queda fuera.
2. Por cada correo: `html, _ = construir(item)` (`borradores/html_correo.py`) y `create_draft` con `to`, `subject` (el del JSON), `replyToMessageId` = `ultimo_mensaje_enviado` de `seguimiento/hilos-enviados.json` y **solo `htmlBody`** (no pasar `body`).
3. Anotar en `seguimiento/envios-motor-2026-10.csv`: `fecha_toqueN` solo cuando Ramón confirme que envió; el id del borrador en `borrador_gmail`. Commit y push a `claude/motor-revision-previa-build`.

## Sin acceso a Gmail
`pendientes-por-dia.md` trae cada texto completo, con destinatario y asunto, para pegarlo a mano como respuesta en el hilo.

## Riesgos y decisiones de Ramón
- **Pago de Google Workspace fallido** (aviso de Google del 26-oct). Según lo que se vio antes, la suspensión sería el 2-nov: confirmarlo en ese correo y pagar. Si se suspende hola@, se cortan los hilos del toque 3.
- Rebotes: 2 de 15 en la tanda 1. "Correo publicado en el sitio" no garantiza que la casilla exista.
- Ritmo: el 23-oct salieron 52 correos juntos. Mejor repartir en el día.
- V37 (bgconsultoria.cl) es una dirección de Gmail y ya recibió el primer toque.
- Cerrar o no a las 15 R de reactivación (sin texto de toque 3).
- Lead supply (Vibe sin créditos, Apollo con 13 candidatos): no comprar ni armar listas hasta leer resultados.

## Archivos clave (en `marketing/motor-revision-previa/`)
`seguimiento/envios-motor-2026-10.csv` (registro), `seguimiento/hilos-enviados.json`, `seguimiento/pendientes-por-dia.md`, `borradores/` (textos, `html_correo.py`, `lint.mjs`), `corridas/` (mediciones del motor), `motor/` (scripts; `remedir.mjs` vuelve a medir un sitio).

## Prueba de bandeja (29-oct)
Ramón envió el mismo correo a manuvalleespin@hotmail.com y r.valleespin@gmail.com. Gmail llegó; en Hotmail no apareció, sin rebote. Pendiente: ver si está en Correo no deseado o demorado. `proveedor-correo.csv` clasifica a los 56 destinatarios por proveedor de correo (MX): 16 Microsoft, 20 Google, 20 otro. Usarlo en la lectura de resultados para separar respuestas por proveedor.
Resultado (29-oct): en Gmail el correo llegó a Principal. En Hotmail los correos de prueba (A: texto plano sin enlaces; B: con enlace) llegaron a Correo no deseado; Ramón no precisó si el original también. Lectura: Microsoft recibe el correo y lo manda a no deseado, y el texto plano sin enlaces no lo evita, así que el filtro no reacciona solo al contenido (dominio nuevo, ráfaga de 52 envíos el 23-oct). Afecta sobre todo a los 16 destinatarios alojados en Microsoft. Acciones: nombre del remitente "Ramón Vallejos (SpindleLab)", máximo 15-20 envíos por día sin ráfagas, y para los contactos en Microsoft un canal alternativo (teléfono publicado en su sitio).

## Decisión de Ramón (29-oct): el correo es un canal complementario, sin gasto
- No se compra dominio ni casilla nueva, ni listas de contactos. El dinero va a redes sociales.
- Modo mantenimiento: terminar los toques en curso, ritmo de 15 a 20 por día sin ráfagas, nombre del remitente "Ramón Vallejos (SpindleLab)", y no mandar primeros toques nuevos a contactos alojados en Microsoft (ver `proveedor-correo.csv`).
- Los hallazgos del motor sirven también para redes (datos agregados, sin nombrar empresas). Lectura de resultados del correo el jue 5-nov.

## Coordinación con el copiloto (30-oct)
- El copiloto (rutina aparte, misma cuenta hola@) usa otra cadencia: toque 2 a +4 días y toque 3 a +10 (`marketing/outbound/copiloto-outbound.md`), y exige 4 días entre toques. El motor usa +3 y +7 desde el primer toque. Para no cruzarse: el motor deja los borradores y Ramón los envía a partir del lunes 2-nov; el copiloto no escribe a quien ya tiene un borrador pendiente.
- `gromero@ulloaycia.cl` rebotó el 23-oct (5.1.3, la casilla no existe) pero el copiloto no lo sabe y lo da como "toque 2 pendiente". Pendiente de agregar a la lista de exclusión (no la edita el motor).
- Decisiones que el copiloto dejó a Ramón (ver su resumen del 30-oct): cerrar o medir de verdad a contotal.cl, az400.cl y holding.wiki (venían de la campaña AEO, sin hallazgo de Verifica); y de dónde salieron cespina@segal.cl y camilo@mba.legal.
