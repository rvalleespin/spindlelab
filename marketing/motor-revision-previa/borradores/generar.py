# Borradores de primer toque, escritos por la sesión del motor con la voz de Ramón (singular). Versión 2, tras la revisión independiente.
# NO se envía nada. Cada hecho sale de verificacion-independiente/2026-10-16-lote-contactos-existentes.json.
# Cambios de la v1: sin "Vi N cosas más" (los extras no están verificados), sin generalizaciones sobre los clientes del destinatario,
# sin "no dejó cookies" (no era parte de lo verificado), "unos diez segundos" (lo medido fue 11), "política propia" (los captcha enlazan la de Google/hCaptcha).
import json
BAJA_APOLLO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo de Apollo, una base comercial de contactos B2B; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
BAJA_SITIO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo del sitio de ustedes; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
KIT="son $149.000 + IVA, y queda en dos o tres días."
LINEA_PRECIO="Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada."
LLAMADA="Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría."
CHEQUEO="Puedes verlo tú, gratis y sin registro: verifica.spindlelab.cl"
COMPRUEBA_COOKIES="Lo puedes ver en 30 segundos: abre el sitio en una ventana nueva, sin tocar nada, y mira las cookies en el candado de la barra del navegador. El chequeo gratis está en verifica.spindlelab.cl"
DERIVA="Si no eres tú quien ve el sitio, ¿con quién lo hablo?"
D=[]
def add(**k): D.append(k)

# ---------- F10: sin acción de contacto en la primera pantalla (Desarrollo Web) ----------
add(id='',dominio='lmabogados.cl',para='thernandez-hausdorf@lmabogados.cl',contacto='Tomás Hernández-Hausdorf (Senior Lawyer)',oferta='F10',ola='1ª ola',baja=BAJA_APOLLO,
asunto='la primera pantalla de lmabogados.cl',
cuerpo=["Hola Tomás:",
"Abrí lmabogados.cl en un computador y con el tamaño de un celular, y en la primera pantalla de los dos no hay ningún botón para escribirles. En el computador se ven el menú y un video con el titular \"Excelencia, eficacia y rapidez donde sea que se requiera\"; en el celular, el logo, el ícono del menú y la foto de un edificio. El formulario, el teléfono y el correo están al final de la portada.",
"Eso lo arreglo yo. Dejo a la vista, desde la primera pantalla, la forma de escribirles, y lo pruebo en el celular.",
LLAMADA+" "+LINEA_PRECIO,
DERIVA],
notas="Primera pantalla sin acción de contacto en escritorio (1280x720) y móvil emulado (390x844); el contacto sí existe al final de la portada y el correo lo dice. El texto del arreglo es BORRADOR (no está en el corpus aprobado). El 5-oct se marcó 'revisar antes de escribir' (menciona datos personales); no choca con una oferta de sitio web, pero confirma que ya se vio.")

# ---------- F1: formulario sin enlace a política de privacidad (Verifica y Cumple) ----------
add(id='',dominio='pfeffer.cl',para='pfeffer@pfeffer.cl',contacto='(correo genérico del estudio)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de pfeffer.cl',
cuerpo=["Hola:",
"En pfeffer.cl, al final de la portada, hay un formulario que pide nombre, teléfono, correo y la consulta. Junto a él no hay ninguna casilla ni texto sobre qué se hace con esos datos, y ni en el menú ni en el pie encontré un enlace a una política de privacidad del estudio.",
"Quien lo llena deja sus datos sin que el sitio diga para qué. Lo medí dos veces y las dos salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA,
DERIVA],
notas="Solo se midió la portada: el correo dice 'no encontré un enlace', no 'no tienen política'. La portada muestra el badge de reCAPTCHA (enlaza a la política de Google, por eso el correo dice 'del estudio').")
add(id='',dominio='gazmuri-cia.cl',para='aorezzoli@gazmuri-cia.cl',contacto='Andrea Orezzoli (cargo en la base: "Social")',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de gazmuri-cia.cl',
cuerpo=["Hola Andrea:",
"Al pie de la portada de gazmuri-cia.cl hay un formulario de contacto que pide tu correo, un asunto y el mensaje. Cerca de él no hay texto sobre qué se hace con esos datos, y en el resto del pie tampoco hay un enlace a una política de privacidad.",
"Lo medí dos veces y las dos dio lo mismo.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA,
DERIVA],
notas="El formulario NO pide teléfono, solo correo. Cargo poco claro: por eso va la derivación. Solo portada.")
add(id='',dominio='pfvabogados.com',para='camilocereno@pfvabogados.com',contacto='Camilo Cereno (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='pfvabogados.com y su formulario',
cuerpo=["Hola Camilo:",
"En la portada de pfvabogados.com, en la sección Contáctenos, hay un formulario que pide nombre, correo y mensaje. Revisé el menú, el bloque de contacto y el pie, y no hay ningún enlace a una política de privacidad ni a términos.",
"Quien escribe ahí deja su correo sin que el sitio diga qué se hace con él. Lo volví a medir y salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA],
notas="El formulario pide correo, no teléfono. Solo se revisó la portada (el menú trae 'Estudio', 'Abogados', 'Especialidades': no se abrieron).")
add(id='',dominio='palavicino.cl',para='rolando.gonzalez@palavicino.cl',contacto='Rolando González (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de palavicino.cl',
cuerpo=["Hola Rolando:",
"El formulario que está al final de la portada de palavicino.cl pide nombre, correo y teléfono, los tres obligatorios. Al lado no hay ninguna casilla ni texto sobre el uso de esos datos, y en la portada no encontré un enlace a una política de privacidad del estudio.",
"Lo revisé dos veces y las dos salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA],
notas="El formulario usa reCAPTCHA (su badge enlaza a la política de Google: por eso el correo dice 'del estudio'). Al final de la portada, no en la primera pantalla. Solo portada. El 5-oct figuraba como 'sitio caído'; el 16-oct cargó bien.")
add(id='',dominio='cisternasycia.cl',para='adintrans@cisternasycia.cl',contacto='Andrés Dintrans (Knowledge Management, Legal Operations)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de cisternasycia.cl',
cuerpo=["Hola Andrés:",
"En la portada de cisternasycia.cl hay un formulario con nombre, mail y mensaje. No tiene casilla de consentimiento ni un texto que diga qué se hace con lo que se envía, y en la portada, pie incluido, no hay un enlace a una política de privacidad ni a términos.",
"Lo comprobé dos veces y las dos dio lo mismo.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA,
DERIVA],
notas="El campo se llama 'Mail', pide solo correo. Contacto de operaciones legales: incluye derivación. No se midieron cookies en este lead, por eso no se mencionan.")
add(id='',dominio='bacs.cl',para='atromo@bacs.cl',contacto='Antonino Tromo (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='bacs.cl y la política de privacidad',
cuerpo=["Hola Antonino:",
"En bacs.cl, bajo \"Tengamos una conversación\", hay un formulario que pide nombre, correo y mensaje. Revisé los 40 enlaces de la portada y el pie y ninguno lleva a una política de privacidad o a un aviso sobre el uso de los datos. Junto al formulario tampoco hay una casilla ni una leyenda.",
"Lo medí dos veces y las dos salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA],
notas="No se envió ni se probó el formulario (solo lectura). Solo portada en español.")
add(id='',dominio='mgm-auditores.cl',para='lmorales@mgm-auditores.cl',contacto='(sin nombre en la base)',oferta='F1',ola='1ª ola',baja=BAJA_SITIO,
asunto='el formulario de mgm-auditores.cl',
cuerpo=["Hola:",
"La portada de mgm-auditores.cl tiene, en la sección \"¿Hablemos?\", un formulario que pide nombre, correo y teléfono. Al lado no hay ninguna leyenda sobre qué se hace con esos datos, y en el menú, el bloque de contacto y el pie no hay un enlace a una política de privacidad propia.",
"Lo repetí y salió lo mismo.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA,
DERIVA],
notas="Lead de Google Maps: la baja dice 'del sitio de ustedes' (confirmar que el correo está publicado en su sitio). Sin dato de catch-all. El hCaptcha del bloque muestra enlaces 'Privacidad - Condiciones' que son del captcha, por eso el correo dice 'propia'.")
add(id='',dominio='grupoauditax.cl',para='contacto@grupoauditax.cl',contacto='(correo genérico)',oferta='F1',ola='1ª ola',baja=BAJA_SITIO,
asunto='grupoauditax.cl y su formulario',
cuerpo=["Hola:",
"El formulario Contáctanos, al final de la portada de grupoauditax.cl, pide nombre, teléfono, correo y la consulta, los cuatro obligatorios. Junto a él no hay texto sobre cómo se tratan esos datos, y en la portada, pie incluido, no hay un enlace a una política de privacidad.",
"Lo medí dos veces y las dos fue igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
LLAMADA,
DERIVA],
notas="Lead de Google Maps ('del sitio de ustedes'). Correo genérico: conviene buscar un nombre. Formulario al final de la portada.")

# ---------- C1: cookies de rastreo antes de aceptar nada (Verifica y Cumple) ----------
add(id='',dominio='suizandina.com',para='sergioperez@suizandina.com',contacto='(sin nombre confirmado)',oferta='C1',ola='1ª ola',baja=BAJA_APOLLO,
asunto='las cookies de suizandina.com',
cuerpo=["Hola:",
"Entré a suizandina.com sin tocar nada y, en unos diez segundos, el navegador ya había guardado una cookie de Meta. No apareció ningún aviso de cookies, ni al abrir ni al bajar por la página.",
"Eso no cambió cuando moví el mouse y bajé por el sitio.",
COMPRUEBA_COOKIES,
"Poner el aviso para que frene eso hasta que la persona decide "+KIT,
LLAMADA],
notas="HALLAZGO CHICO: una sola cookie (la de Meta). No decir que Meta 'recibió' la visita (solo cargó el script) ni para qué la usa. 'Ni al abrir ni al bajar por la página' vale para la portada.")
add(id='',dominio='almalodge.cl',para='carlos@almalodge.cl',contacto='(sin nombre confirmado)',oferta='C1',ola='1ª ola',baja=BAJA_APOLLO,
asunto='las cookies de almalodge.cl',
cuerpo=["Hola:",
"Abrí almalodge.cl sin aceptar nada y, en unos diez segundos, ya había en el navegador una cookie de Meta. En la portada no vi aviso de cookies, y en el pie no hay un enlace a una política de privacidad ni de cookies.",
"Moví el mouse y bajé por la página, y seguía igual.",
COMPRUEBA_COOKIES,
"Poner el aviso para que frene eso hasta que la persona decide "+KIT,
LLAMADA],
notas="HALLAZGO CHICO (una cookie de Meta). La revisión de turismo del 13-oct lo marcó 'sin hallazgo': decide Ramón si se envía. No decir que Meta 'recibió' la visita.")

L={l['dominio']:l['id'] for l in json.load(open('../corridas/2026-10-15-lote-contactos-existentes/lista.json'))['leads']}
for d in D: d['id']=L[d['dominio']]   # el id sale de la lista del lote, no de memoria
json.dump(D,open('borradores-primer-toque.json','w'),ensure_ascii=False,indent=1)
print(len(D))
