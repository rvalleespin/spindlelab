# Piloto Vibe, tanda 2: borradores en Gmail (23-oct-2026)

**Estado (23-oct):** 15 borradores en Gmail (hola@spindlelab.cl) con el mismo texto v2 que la tanda 1: 7 de cookies y 8 de formulario sin política. **Nada está enviado.**

**Remedidos hoy:** los 15 sitios se volvieron a medir con el motor el 23-oct (se habían medido el 19-oct). El hallazgo de cada correo sigue vigente y las cookies que nombran los correos siguen todas presentes. Resultado en `corridas/2026-10-23-remedicion-tanda2/<id>/remedicion/remedicion.json`.

## Qué cambió respecto de la tanda 1
- **2 de los 15 primeros toques de la tanda 1 rebotaron** (V28 ulloaycia.cl: la casilla no existe; V44 iluminaservicios.cl: la organización rechaza la casilla). Ambos figuraban como "correo publicado en el sitio". Publicado no garantiza que reciba. Un rebote del 13% en un dominio nuevo pesa en la reputación del remitente; mientras más rebotes, más probable que Gmail y Outlook manden lo siguiente a spam.
- Los 15 de la tanda 2 son todos buzones de rol (contacto@, info@, hola@, reb@, atfgroup.chile@, sbscontacto@) más uno de Gmail (V37). No se puede comprobar una casilla sin enviarle algo: si alguno rebota, queda registrado y se descarta.

## Ritmo
Hoy ya salieron 41 correos juntos (15 primeros toques, 21 toques 2 y 5 toques 3). No mandes los 15 de esta tanda hoy. Lo razonable: mañana o el lunes, y repartidos en el día. El lunes 26-oct tocan los toques 2 de la tanda 1.

| id | dominio | para | tipo de hallazgo | qué debes ver (si lo compruebas) |
|---|---|---|---|---|
| V06 | cypauditores.cl | contacto@cypauditores.cl | formulario sin política | formulario con nombre, correo y celular; ningún enlace a política de privacidad (menú, pie ni junto al formulario) |
| V07 | atfgroup.cl | atfgroup.chile@atfgroup.cl | cookies | cookies de Google, sin aviso de cookies. **Este sitio ya tiene política en el pie**: el correo ofrece solo el aviso |
| V111 | molinarios.cl | info@molinarios.cl | formulario sin política | formulario Contáctanos (nombre y correo); sin enlace a política del estudio |
| V17 | finpartner.cl | contacto@finpartner.cl | formulario sin política | formulario Diagnóstico gratuito (pide facturación y régimen tributario); sin enlace a política. Dice "Confidencialidad total" junto al formulario |
| V20 | lcconsultores.cl | contacto@lcconsultores.cl | formulario sin política | formulario en la sección Contacto; sin enlace a política. Sitio de una sola página con desplazamiento horizontal |
| V21 | hqsconsultores.cl | contacto@hqsconsultores.cl | cookies | una cookie de Google; sin aviso de cookies |
| V29 | marquezauditores.cl | contacto@marquezauditores.cl | cookies | cookies de Google; sin aviso; formulario de contacto más abajo |
| V30 | sbsolutions.cl | sbscontacto@sbsolutions.cl | formulario sin política | formulario en la sección Contacto; sin enlace a política |
| V37 | bgconsultoria.cl | **bgconsultorempresas@gmail.com** | formulario sin política | formulario "¿Tienes alguna consulta?" (nombre, teléfono, correo); sin enlace a política. **Es una dirección de Gmail**: tú decides si se escribe |
| V42 | condominio.cl | contacto@condominio.cl | cookies | cookies de Google; sin aviso |
| V43 | urbanally.cl | contacto@urbanally.cl | cookies | una cookie de publicidad de Google al cargar y otras al navegar; sin aviso; formulario más abajo |
| V49 | duplica.cl | hola@duplica.cl | cookies | cookies de Google; sin aviso |
| V54 | aguasbonitas.cl | contacto@aguasbonitas.cl | cookies | una cookie de Facebook; sin aviso. El correo ofrece solo el aviso (sin plantilla de política) |
| V57 | reb-chile.cl | reb@reb-chile.cl | formulario sin política | formulario "Vende con nosotros" al final de la página; sin enlace a política de REB |
| V65 | remax-start.cl | contacto@remax-start.cl | formulario sin política | formulario Escríbenos al final de la página; sin enlace a política |

## Lo que NO dice ninguno de estos correos (por diseño)
Igual que la tanda 1: no dice que Google o Meta "reciben la visita", no dice que el sitio "no tiene política" (solo se revisó la portada), no cita leyes, no promete plazo y no usa "desde" en el precio. La línea de baja dice "Saqué tu correo del sitio de ustedes".

## Para la llamada, no para el correo
- **V06:** la ficha del motor marca que el destino del formulario (`/bat/rd-mailform.php`) responde 404. Si el formulario está muerto, pesa más que la política. Es sospecha, no se afirma en el correo.

## Pendiente de tu decisión
- V37: ¿se escribe a una dirección de Gmail? (el borrador existe; si no quieres, bórralo).
- La tanda 3 (V67, V84, V89, V94) sigue sin crearse en Gmail; se crea cuando salga la tanda 2.
- Los 15 sitios en reserva (solo Analytics): `borradores/reserva-piloto-vibe.json`.

Registro de cada borrador, con el id de Gmail: `seguimiento/envios-motor-2026-10.csv` (ola "Piloto Vibe, tanda 2").
