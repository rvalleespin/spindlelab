# Mecanismo de leads con el motor integrado (decidido por Ramón, 19-oct-2026)

**Por qué existe:** el 16-19 oct la sesión del motor terminó haciendo parte del trabajo de la sesión de búsqueda de leads (armar la lista, cruzar exclusiones y Gmail, decidir a quién no escribir, redactar y dar seguimiento). Funcionó, pero quedó repartido en scripts sueltos y en la memoria de una sesión. Este documento propone dejarlo como **un embudo en el repo**, que cualquier sesión pueda correr, con un contrato entre etapas.

## El embudo, etapa por etapa
| # | Etapa | Entrada → salida | Herramienta | Estado |
|---|---|---|---|---|
| 1 | Fuentes de dominios | criterio de rubro → lista de dominios | Vibe Prospecting (1 crédito por fila, sin contactos), Google Maps con navegador, directorios | manual, sin script propio |
| 2 | Correo publicado | dominios → correo del propio sitio, verificado con MX | `motor/contactos.mjs` | **nuevo, probado** |
| 3 | Descartes baratos | correos → solo quien se puede escribir | exclusión, registro de enviados, Gmail por correo exacto, "vende protección de datos", parking, competidores | repartido en `p0.mjs` y scripts a mano |
| 4 | Medición | dominio → hallazgo con estado | `motor/lote.mjs` | hecho |
| 5 | Verificación independiente | hallazgo fuerte → confirmado o refutado | `verificacion-independiente/workflow-verificacion.js` | hecho |
| 6 | Borradores | hallazgo verificado → borrador + lectura independiente | `borradores/generar_*.py`, `html_correo.py` | hecho, a mano |
| 7 | Seguimiento | envíos → respuestas, toque 2 y 3 | `seguimiento/envios-motor-2026-10.csv`, recordatorios | hecho |

**Quién es dueño de qué (propuesta):** las etapas 1 a 3 las lleva la sesión de leads; 4 a 6 el motor; 7 y los documentos compartidos (`pipeline.md`, plan de 90 días) los edita solo el troncal. Una etapa entrega un archivo al repo, no un mensaje.

## Qué se midió de la etapa 2 (60 dominios al azar de los 228 que ya teníamos, 19-oct)
- 38 de 60 (63 %) publican un correo en su propio dominio; todos pasan la verificación MX.
- 14 de 60 (23 %) no publican ninguno; 4 solo muestran correos de terceros (el que hizo el sitio); 8 no respondieron (sitio caído o bloqueo 429).
- De los 38, unos 23 son buzones de rol (`contacto@`, `info@`, `abogados@`) y unos 15 parecen de una persona. **El decisor con nombre, que es lo que daba Apollo, casi no está publicado:** el correo que ya teníamos apareció entre los hallados en 13 de 60.
- Consecuencia: el correo sale a un buzón de rol y la línea "¿con quién lo hablo?" es obligatoria, no decorativa.

## Rendimiento esperado (extrapolado, no medido de punta a punta)
Del lote de 467 dominios que ya teníamos: 94 sin contacto previo, 11 borradores (2,4 %). Del lote de reactivación: 69 medibles, 15 borradores (22 %). Con dominios nuevos, por cada 100: unos 60 con correo propio, unos 50 medibles tras descartes, de 6 a 11 borradores. **Para sostener 30 correos nuevos por semana hacen falta del orden de 300 dominios nuevos por semana.**

## Fuentes de dominios: lo que se verificó
- **Vibe Prospecting** (conectado en esta sesión): 114.833 empresas chilenas con sitio web en su base. Solo la lista de empresas con dominio cuesta 1 crédito por fila (estimación del 19-oct para 200 filas = 200 créditos). Personas con correo disponible, en cargos de dueño o socio, en Chile: abogados 268, inmobiliario 187, contadores 40, hoteles 30, salud 19. Es poco para sacar personas; sirve más para sacar dominios y leer el correo del sitio con `contactos.mjs`. Precio del crédito y saldo: no verificados.
- **Sernatur y Superintendencia de Salud:** no se encontró descarga masiva con correos. Quedan como consulta ficha por ficha.
- **Google Maps y DiarioEmprende:** ya usados; DiarioEmprende agotado (53 avisos).
- **Apollo gratis y Hunter gratis:** las terceras fuentes dicen 10 créditos de exportación al mes y 50 créditos al mes; las cifras de Apollo se contradicen entre fuentes. Sirven para completar un nombre, no para armar volumen.

## Riesgos que hay que decidir antes de escalar
1. **Fecha de la ley.** El 31-ago el Gobierno ingresó el proyecto (boletín 18.623-07) para mover la entrada en vigencia de la Ley 21.719 del 1-dic-2026 al 1-dic-2027. Si se aprueba, se debilita el motivo de urgencia del kit.
2. **Cómo se escribe a un buzón de rol.** Menos respuesta que a un decisor; hay que medirlo por separado (columna `tipo` del correo en la hoja de seguimiento).
3. **Datos personales.** SpindleLab vende cumplimiento: cada correo lleva la fuente real y la baja, y no se guarda más de lo necesario. Un correo de persona sacado del sitio se trata igual que uno sacado de una base.
4. **Trabajo sin subir.** La sesión de leads tiene 25 commits sin subir en el Mac de Ramón.

## Decisiones de Ramón del 19-oct-2026
1. Se adopta el embudo en el repo con roles (etapas 1 a 3 leads, 4 a 6 motor, documentos compartidos solo el troncal). Traspaso para la sesión nueva: `marketing/encargos-otras-sesiones/arranque-sesion-leads-con-motor-2026-10-19.md`.
2. Se autorizan hasta 200 créditos de Vibe Prospecting en un piloto, **solo para empresas nuevas**: todo dominio ya analizado, contactado o usado se excluye antes de pagar (lista de exclusión de la cuenta + cruce posterior).
3. Se acepta escribir a buzones de rol. La derivación "¿con quién lo hablo?" es obligatoria y la respuesta de los buzones de rol se mide aparte (columna `tipo`).
4. El precio va sin "desde" en todo lo nuevo.
