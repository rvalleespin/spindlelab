# Borradores de primer toque, versión 4: lenguaje práctico para quien decide (marketing o gerencia), no para quien programa.
# Mismos hechos verificados que la v3 (verificacion-independiente/2026-10-16-lote-contactos-existentes.json); cambia cómo se dicen:
# primero lo que ve el visitante o el cliente, sin cifras de revisión ni vocabulario de la medición.
# NO se envía nada.
import json
BAJA_APOLLO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo de Apollo, una base comercial de contactos B2B; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
BAJA_SITIO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo del sitio de ustedes; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
PRECIO_ABOGADOS="Dejarlo resuelto, con un aviso junto al formulario y una plantilla de política para que la revises tú, que es tu oficio, cuesta $149.000 + IVA y queda en dos o tres días."
PRECIO_OTROS="Dejarlo resuelto, con un aviso junto al formulario y una plantilla de política que revise un abogado, cuesta $149.000 + IVA y queda en dos o tres días."
PRECIO_COOKIES="Dejar un aviso de cookies que pregunte antes cuesta $149.000 + IVA y queda en dos o tres días."
LLAMADA="Si quieres, lo vemos en una llamada de 20 minutos."
LLAMADA_MUESTRO="Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría."
LINEA_PRECIO="Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada."
CHEQUEO="Puedes verlo tú, gratis y sin registro: verifica.spindlelab.cl"
DERIVA="Si no eres tú quien ve el sitio, ¿con quién lo hablo?"
D=[]
def add(**k): D.append(k)

add(dominio='lmabogados.cl',para='thernandez-hausdorf@lmabogados.cl',contacto='Tomás Hernández-Hausdorf (Senior Lawyer)',oferta='F10',ola='1ª ola',baja=BAJA_APOLLO,
asunto='la primera pantalla de lmabogados.cl',
cuerpo=["Hola Tomás:",
"Abrí lmabogados.cl desde un celular y en la primera pantalla no hay cómo contactarlos: ni un botón ni un teléfono. El formulario está al final de la página, a más de tres pantallas hacia abajo, y quien no baja no sabe cómo escribirles.",
"Lo puedes ver abriendo el sitio en tu celular, sin bajar.",
"Lo arreglo yo: dejo la forma de contactarlos a la vista desde el primer momento y lo pruebo en el celular. "+LLAMADA_MUESTRO+" "+LINEA_PRECIO,
DERIVA],
notas="Hecho: en la primera pantalla (celular y computador) no hay botón ni teléfono; el contacto está al final de la página. El video de la portada no se vio reproducirse, por eso no se menciona. El texto del arreglo es borrador tuyo por aprobar.")
add(dominio='pfeffer.cl',para='pfeffer@pfeffer.cl',contacto='(correo genérico del estudio)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de pfeffer.cl',
cuerpo=["Hola:",
"El formulario de contacto de www.pfeffer.cl pide nombre, teléfono y correo, y en ninguna parte de la portada se le dice a quien lo llena qué se hace con esos datos: no hay un enlace a una política de privacidad del estudio.",
"Puedes verlo tú: abre la portada, baja hasta el formulario y busca ese enlace.",
PRECIO_ABOGADOS+" "+LLAMADA,
DERIVA],
notas="OJO: la dirección sin www (pfeffer.cl) dio error de seguridad; por eso el correo dice www.pfeffer.cl y no enlaza al chequeo gratis. Solo se miró la portada: el correo dice 'no hay un enlace', no 'no tienen política'.")
add(dominio='gazmuri-cia.cl',para='aorezzoli@gazmuri-cia.cl',contacto='Andrea Orezzoli (cargo en la base: "Social")',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de gazmuri-cia.cl',
cuerpo=["Hola Andrea:",
"El formulario de contacto del pie de gazmuri-cia.cl pide nombre y correo, y en ninguna parte de la portada se le dice a quien lo llena qué se hace con esos datos: no hay un enlace a una política de privacidad del estudio.",
CHEQUEO,
PRECIO_ABOGADOS+" "+LLAMADA,
DERIVA],
notas="El formulario pide correo, no teléfono. Cargo poco claro: por eso la derivación.")
add(dominio='pfvabogados.com',para='camilocereno@pfvabogados.com',contacto='Camilo Cereno (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='pfvabogados.com y su formulario',
cuerpo=["Hola Camilo:",
"Quien te escribe por el formulario de pfvabogados.com no ve en ninguna parte qué se hace con su correo: ni en el formulario, ni en el menú, ni en el pie hay un enlace a una política de privacidad.",
CHEQUEO,
PRECIO_ABOGADOS+" "+LLAMADA,
DERIVA],
notas="El formulario pide correo, no teléfono. Solo portada.")
add(dominio='palavicino.cl',para='rolando.gonzalez@palavicino.cl',contacto='Rolando González (Lawyer; la portada presenta a los socios aparte)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de palavicino.cl',
cuerpo=["Hola Rolando:",
"El formulario del final de la portada de palavicino.cl pide nombre, correo y teléfono, y en ninguna parte se le dice a quien lo llena qué se hace con esos datos: no hay un enlace a una política de privacidad del estudio.",
CHEQUEO,
PRECIO_ABOGADOS+" "+LLAMADA,
DERIVA],
notas="Solo portada. El formulario usa un captcha de Google cuyo enlace de privacidad no cuenta: por eso el correo dice 'del estudio'.")
add(dominio='cisternasycia.cl',para='adintrans@cisternasycia.cl',contacto='Andrés Dintrans (Knowledge Management, Legal Operations)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de cisternasycia.cl',
cuerpo=["Hola Andrés:",
"Quien llena el formulario de contacto de cisternasycia.cl no encuentra en ninguna parte de la portada qué se hace con sus datos: no hay un enlace a una política de privacidad.",
CHEQUEO,
PRECIO_ABOGADOS+" "+LLAMADA,
DERIVA],
notas="Solo portada. Pide correo, no teléfono.")
add(dominio='bacs.cl',para='atromo@bacs.cl',contacto='Antonino Tromo (Lawyer; la portada lista unos 25 abogados)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='bacs.cl y la política de privacidad',
cuerpo=["Hola Antonino:",
"Quien te escribe por el formulario de bacs.cl no ve en ninguna parte qué se hace con su correo: ni en el menú ni en el pie de la portada hay un enlace a una política de privacidad.",
CHEQUEO,
PRECIO_ABOGADOS+" "+LLAMADA,
DERIVA],
notas="Solo portada en español. No se probó el formulario.")
add(dominio='mgm-auditores.cl',para='lmorales@mgm-auditores.cl',contacto='(sin nombre en la base)',oferta='F1',ola='1ª ola',baja=BAJA_SITIO,
asunto='el formulario de mgm-auditores.cl',
cuerpo=["Hola:",
"El formulario \"¿Hablemos?\" de mgm-auditores.cl pide nombre, correo y teléfono, y en ninguna parte de la portada se le dice a quien lo llena qué se hace con esos datos: no hay un enlace a una política de privacidad propia.",
CHEQUEO,
PRECIO_OTROS+" "+LLAMADA,
DERIVA],
notas="Correo sacado del sitio (Google Maps). Sin dato de catch-all. Solo portada.")
add(dominio='grupoauditax.cl',para='contacto@grupoauditax.cl',contacto='(correo genérico)',oferta='F1',ola='1ª ola',baja=BAJA_SITIO,
asunto='grupoauditax.cl y su formulario',
cuerpo=["Hola:",
"El formulario Contáctanos de grupoauditax.cl pide nombre, teléfono y correo, y en ninguna parte de la portada se le dice a quien lo llena qué se hace con esos datos: no hay un enlace a una política de privacidad.",
CHEQUEO,
PRECIO_OTROS+" "+LLAMADA,
DERIVA],
notas="Correo sacado del sitio (Google Maps). Correo genérico: conviene buscar un nombre. Solo portada.")
add(dominio='suizandina.com',para='sergioperez@suizandina.com',contacto='(sin nombre confirmado)',oferta='C1',ola='1ª ola',baja=BAJA_APOLLO,
asunto='las cookies de suizandina.com',
cuerpo=["Hola:",
"Entré a suizandina.com sin hacer nada y, en unos diez segundos, Meta (Facebook e Instagram) ya había dejado una cookie en mi navegador. En la portada no vi ningún aviso donde el visitante pueda aceptar o rechazar.",
"Puedes verlo tú: abre el sitio en una ventana de incógnito y mira las cookies desde el candado de la barra del navegador.",
PRECIO_COOKIES+" "+LLAMADA_MUESTRO,
DERIVA],
notas="HALLAZGO CHICO: una sola cookie. Es el correo más débil del lote. No se afirma qué hace Meta con ella.")
add(dominio='almalodge.cl',para='carlos@almalodge.cl',contacto='(sin nombre confirmado)',oferta='C1',ola='1ª ola',baja=BAJA_APOLLO,
asunto='las cookies de almalodge.cl',
cuerpo=["Hola:",
"Entré a almalodge.cl sin hacer nada y, en unos diez segundos, Meta (Facebook e Instagram) ya había dejado una cookie en mi navegador. En la portada no vi ningún aviso donde el visitante pueda aceptar o rechazar, ni una política de privacidad enlazada en el pie.",
"Puedes verlo tú: abre el sitio en una ventana de incógnito y mira las cookies desde el candado de la barra del navegador.",
PRECIO_COOKIES+" "+LLAMADA_MUESTRO,
DERIVA],
notas="HALLAZGO CHICO: una sola cookie. La revisión de turismo del 13-oct había marcado a ALMA como 'sin hallazgo'. No se afirma qué hace Meta con la cookie.")

L={l['dominio']:l['id'] for l in json.load(open('../corridas/2026-10-15-lote-contactos-existentes/lista.json'))['leads']}
for d in D: d['id']=L[d['dominio']]
json.dump(D,open('borradores-primer-toque.json','w'),ensure_ascii=False,indent=1)
print(len(D))
