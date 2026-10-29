# Dominio aparte para la venta en frío (propuesta del 29-oct-2026)

**Por qué:** el 29-oct se probó la entrega. El mismo correo a Gmail llegó a Principal; a Hotmail, los dos correos de prueba desde hola@spindlelab.cl (uno en texto plano, sin enlaces) cayeron en no deseado, y un correo normal desde el Gmail personal de Ramón sí llegó. Lectura: Microsoft desconfía del dominio spindlelab.cl como remitente (dominio nuevo, 52 envíos en un día el 23-oct). Ese mismo correo, hola@, es el que se usa con clientes y proveedores. La venta en frío debe correr por un dominio aparte para que su reputación no arrastre a la del dominio principal.

## Dominio sugerido (verificado en el registro el 29-oct, sin comprar)
| Dominio | Disponible | Precio primer año | Renovación |
|---|---|---|---|
| getspindlelab.com | sí | US$11,25 | US$11,25 |
| spindlelabseo.com | sí | US$11,25 | US$11,25 |
| spindlelab.io | sí | US$14,99 | US$46 |
| spindlelab.com, spindlelab.co | no (ya tienen dueño) | | |

Recomendado: **getspindlelab.com** (se reconoce la marca y la renovación es barata).

## Pasos (no hacer nada hasta que Ramón diga que sí)
1. **Arreglar antes el pago fallido de Google Workspace** (aviso del 26-oct).
2. Comprar el dominio (Ramón, con su tarjeta).
3. En Google Workspace: agregar el dominio como secundario y crear un usuario nuevo (por ejemplo ramon@getspindlelab.com). Es un usuario facturable más (estimado US$7 a 14 al mes).
4. En el DNS del dominio nuevo: registros MX de Google; SPF `v=spf1 include:_spf.google.com ~all`; DKIM (se genera en Admin > Aplicaciones > Gmail > Autenticar correo y se publica como TXT); DMARC `v=DMARC1; p=none; rua=mailto:ramon@getspindlelab.com`. Subir DMARC a `quarantine` después de unas semanas sin fallas.
5. Redirigir getspindlelab.com a spindlelab.cl, para que quien lo busque llegue al sitio.
6. Nombre del remitente "Ramón Vallejos (SpindleLab)" y firma de texto simple.
7. Calentamiento, 2 a 4 semanas: semana 1 unos 5 por día, semana 2 de 10 a 15, semana 3 de 20 a 30, con conversaciones reales (conocidos que respondan). Máximo 30 por día por casilla.
8. Seguir con hola@spindlelab.cl solo para clientes y respuestas.
9. Control semanal: correo de prueba a Hotmail y Gmail, y revisar los informes DMARC que llegan a la casilla.

## Costo estimado
Dominio: US$11,25 al año. Casilla extra de Workspace: US$7 a 14 al mes (estimado, depende del plan). Tiempo de calentamiento: 2 a 4 semanas antes de subir el volumen.
