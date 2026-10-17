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
