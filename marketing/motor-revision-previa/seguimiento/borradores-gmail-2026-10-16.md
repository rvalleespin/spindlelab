# Borradores creados en Gmail (hola@spindlelab.cl), 16-oct-2026, 18:53 UTC

Primera ola, toque 1. **No se envió nada.** Los crea la sesión del motor; Ramón los revisa y los envía desde Gmail.

| Sitio | Para | Asunto | Id del borrador |
|---|---|---|---|
| lmabogados.cl | thernandez-hausdorf@lmabogados.cl | la primera pantalla de lmabogados.cl | r556993312728525782 |
| mgm-auditores.cl | lmorales@mgm-auditores.cl | el formulario de mgm-auditores.cl | r6897482272928497065 |
| grupoauditax.cl | contacto@grupoauditax.cl | grupoauditax.cl y su formulario | r4522346120098488518 |
| suizandina.com | sergioperez@suizandina.com | las cookies de suizandina.com | r-6195955870230125686 |
| almalodge.cl | carlos@almalodge.cl | las cookies de almalodge.cl | r-7224017921212469503 |

**Regla para quien siga (otra sesión o el copiloto):** estas 5 direcciones ya tienen borrador. No crear otro (el correo saldría doble: `in:sent` no ve los borradores, estrategia §12). Antes de crear cualquier borrador a estas direcciones, `list_drafts` por destinatario.

Los seguimientos del día 3 y el cierre del día 7 **no** se crean hasta que el toque 1 salga: van como respuesta en el mismo hilo (`replyToMessageId` del mensaje enviado).
Antes de enviar: abrir uno y comprobar que el enlace muestra el dominio (`verifica.spindlelab.cl`) y no una dirección larga de google.com.

## Enviados
Los 5 salieron el **16-oct-2026 a las 18:07 (hora de Santiago)**, confirmados en Gmail (`in:sent`), cada uno en su propio hilo. Ids de hilo y de mensaje en `envios-motor-2026-10.csv`. Seguimiento del día 3: **lunes 19-oct**, solo si no hubo respuesta, como respuesta en el mismo hilo.

## Segunda ola (6 correos genéricos o con cargo poco claro), borradores creados el 16-oct-2026, 21:25 UTC
Ramón pidió no esperar la tasa de rebote: el objetivo es afinar la búsqueda de leads enviando. **No se envió nada.** Antes de crearlos se revisó `list_drafts` (solo había un borrador a su propio correo) y `in:sent` por cada dirección (cero resultados).

| Id | Sitio | Para | Asunto | Id del borrador |
|---|---|---|---|---|
| X26 | pfeffer.cl | pfeffer@pfeffer.cl | el formulario de pfeffer.cl | r2440315703861331090 |
| X41 | gazmuri-cia.cl | aorezzoli@gazmuri-cia.cl | el formulario de gazmuri-cia.cl | r3023943771877241363 |
| X46 | pfvabogados.com | camilocereno@pfvabogados.com | pfvabogados.com y su formulario | r-2608374908331042641 |
| X49 | palavicino.cl | rolando.gonzalez@palavicino.cl | el formulario de palavicino.cl | r-7263119459256372345 |
| X50 | cisternasycia.cl | adintrans@cisternasycia.cl | el formulario de cisternasycia.cl | r5407696317083063891 |
| X52 | bacs.cl | atromo@bacs.cl | bacs.cl y la política de privacidad | r4634207068474301855 |

Misma regla anti duplicado: estas 6 direcciones ya tienen borrador, no crear otro.

### Corrección del 17-oct-2026: links largos en los 6 borradores de la segunda ola
Ramón vio los links largos. Causa (medida leyendo los borradores con `get_draft`): `create_draft` con solo `body` autoenlaza los dominios y deja como TEXTO VISIBLE la dirección `https://www.google.com/url?q=...&source=gmail&ust=...`. Pasar `body` junto con `htmlBody` tampoco sirve: Gmail autoenlaza también la parte de texto.
**Arreglo:** los 6 se actualizaron con `update_draft` usando SOLO `htmlBody`, con la firma de tabla de la primera ola (no la firma de imagen de Gmail, no usar `includeSignature`). Solo `verifica.spindlelab.cl` y `spindlelab.cl` llevan enlace; el dominio del prospecto va en texto plano. Verificado después con `list_drafts` FULL: el texto visible de cada enlace es corto; la dirección de google.com queda solo en el `href`, igual que en los 5 correos de la primera ola ya enviados.
Generador: `borradores/html_correo.py` (borrador → htmlBody). **Regla para quien siga:** nunca crear un borrador con solo `body` ni con `body` + `htmlBody`.


## Reactivación (15 borradores), creados el 17-oct-2026 ~02:50 UTC, sin enviar
Contactos que recibieron correos de SEO/ChatGPT entre julio y el 10-sep, sin respuesta, con un hallazgo NUEVO de cumplimiento o de contacto verificado por dos revisores independientes y leído por un tercero. Creados con `htmlBody` propio (links cortos, firma de tabla). Propuesta de ritmo: tanda A (8) el lunes 19 o martes 20; tanda B (7) el miércoles 21 o jueves 22.

| Id | Tanda | Sitio | Para | Oferta | Asunto | Id del borrador |
|---|---|---|---|---|---|---|
| R30 | A | oscplus.cl | contacto@oscplus.cl | F9 | los enlaces legales de oscplus.cl | r-8028042650570251170 |
| R34 | A | tuoficinacontable.cl | somos@tuoficinacontable.cl | F3 | los botones contratar de tuoficinacontable.cl | r3915547586167611771 |
| R24 | A | paragonadvisors.cl | alberto.bezanilla@paragonadvisors.cl | F1 | el formulario de paragonadvisors.cl | r8822873982007873124 |
| R46 | A | neosit.cl | patricio.gutierrez@neosit.cl | F1 | el formulario de neosit.cl | r1064020852307637440 |
| R42 | A | mcontabilidad.cl | julio@mcontabilidad.cl | C1 | las cookies de mcontabilidad.cl | r-7258516529191241049 |
| R62 | A | corredoresintegrados.cl | coor@corredoresintegrados.cl | C1 | las cookies de corredoresintegrados.cl | r6174443108029710206 |
| R57 | A | gesinpropiedades.cl | joseviveros@gesinpropiedades.cl | F1 | el formulario de gesinpropiedades.cl | r-5808223601789132422 |
| R35 | A | akcontadores.cl | contacto@akcontadores.cl | C1 | las cookies de akcontadores.cl | r-8674622314350890312 |
| R32 | B | clavetributariacontadores.cl | hola@clavetributariacontadores.cl | F1 | el formulario de clavetributariacontadores.cl | r7151930647404809849 |
| R44 | B | a2rcontadores.cl | contacto@a2rcontadores.cl | F1 | el formulario de a2rcontadores.cl | r-722951544637733538 |
| R33 | B | contable.app | hola@contable.app | C1 | las cookies de contable.app | r8712580074806384705 |
| R48 | B | taxwork.cl | contacto@taxwork.cl | C1 | las cookies de taxwork.cl | r4219192887704495978 |
| R50 | B | rento.cl | contacto@rento.cl | C1 | las cookies de rento.cl | r-4553678514828741734 |
| R68 | B | urbac.cl | propiedades@urbac.cl | C1 | las cookies de urbac.cl | r-4360661296008401231 |
| R69 | B | goycooleapropiedades.cl | contacto@goycooleapropiedades.cl | C1 | las cookies de goycooleapropiedades.cl | r-6340400834518843357 |

Regla anti duplicado: estas 15 direcciones ya tienen borrador. El Copiloto Verifica y Cumple salta direcciones con borrador sin enviar, pero detecta por `verifica.spindlelab.cl` los correos ya enviados; ver nota sobre toque 2 en la conversación.
Revisión independiente: `borradores/revisiones-reactivacion-2026-10-17.json` (5 ok, 10 ajustar, 0 no enviar; todas las correcciones se aplicaron salvo el precio de la segunda ola).
