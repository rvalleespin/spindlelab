# Borradores de primer toque, escritos por la sesión del motor con la voz de Ramón (singular).
# NO se envía nada. Cada hecho sale de verificacion-independiente/2026-10-16-lote-contactos-existentes.json.
import json,re
BAJA_APOLLO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo de Apollo, una base comercial de contactos B2B; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
BAJA_SITIO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo del sitio de ustedes; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
KIT="son $149.000 + IVA, y queda en dos o tres días."
LINEA_PRECIO="Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada."
CHEQUEO="Puedes verlo tú, gratis y sin registro: verifica.spindlelab.cl"
D=[]
def add(**k): D.append(k)

# ---------- F10: sin contacto en la primera pantalla (Desarrollo Web) ----------
add(id='X24',dominio='lmabogados.cl',para='thernandez-hausdorf@lmabogados.cl',contacto='Tomás Hernández-Hausdorf (Senior Lawyer)',oferta='F10',ola='1ª ola',baja=BAJA_APOLLO,
asunto='la primera pantalla de lmabogados.cl',
cuerpo=["Hola Tomás:",
"Abrí lmabogados.cl en un computador y en un celular. En la primera pantalla aparecen el logo, el menú y un video con el titular \"Excelencia, eficacia y rapidez donde sea que se requiera\", pero ningún botón para escribirles. El formulario, el teléfono y el correo están al final de la portada.",
"Lo medí en los dos tamaños y salió igual. Es lo que ve cualquiera antes de decidir si sigue bajando.",
"Eso se arregla: dejo a la vista, desde la primera pantalla, la forma de escribirles y lo pruebo en el celular. "+LINEA_PRECIO,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="Primera pantalla sin acción de contacto (escritorio 1280x720 y móvil 390x844); el contacto sí existe al final de la portada, por eso el correo lo dice. Oferta Desarrollo Web: el texto del arreglo es BORRADOR (no está en el corpus aprobado).")
add(id='X36',dominio='vmklegal.cl',para='ricardo.olivares@vmklegal.cl',contacto='Ricardo Olivares (General Counsel)',oferta='F10',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='vmklegal.cl desde el celular',
cuerpo=["Hola Ricardo:",
"Entré a vmklegal.cl desde un computador y desde un celular. Lo primero que se ve son tres mensajes del estudio que van cambiando (compromiso, equipo, confianza) y el menú, sin un botón para contactarlos. El formulario, el teléfono y el correo quedan mucho más abajo, en el pie.",
"Quien llega con prisa no siempre baja hasta ahí. En los dos tamaños pasa lo mismo.",
"Dejo a la vista, desde la primera pantalla, la forma de escribirles, y lo pruebo en el celular. "+LINEA_PRECIO,
"Vi 2 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="Mismo hallazgo que lmabogados.cl con otra redacción. Catch-all: va en 2ª ola. Texto del arreglo BORRADOR.")

# ---------- F1: formulario sin enlace a política de privacidad (Verifica y Cumple) ----------
add(id='X26',dominio='pfeffer.cl',para='pfeffer@pfeffer.cl',contacto='(correo genérico del estudio)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de pfeffer.cl',
cuerpo=["Hola:",
"Entré a pfeffer.cl sin tocar nada y no dejó ninguna cookie, eso está bien. Lo que sí encontré es el formulario del final de la portada: pide nombre, teléfono, correo y la consulta, y ni ahí ni en el pie hay un enlace a una política de privacidad que diga qué se hace con esos datos.",
"Quien escribe por un formulario así suele contar su caso. Lo repetí desde cero y salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="Formulario sin casilla de consentimiento ni enlace a política en la portada ni en el pie. Solo se midió la portada: el correo dice 'no hay un enlace', no 'no tienen política'.")
add(id='X41',dominio='gazmuri-cia.cl',para='aorezzoli@gazmuri-cia.cl',contacto='Andrea Orezzoli (cargo en la base: "Social")',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de gazmuri-cia.cl',
cuerpo=["Hola Andrea:",
"En gazmuri-cia.cl, al pie de la portada, hay un formulario de contacto que pide tu correo, un asunto y el mensaje. Cerca de él no hay ningún enlace ni texto sobre qué se hace con esos datos, y en el resto del pie tampoco. Abrí el sitio sin tocar nada y no dejó cookies.",
"Quien escribe a un estudio de abogados suele contar algo que no cuenta en cualquier parte. Lo medí dos veces y las dos dio lo mismo.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="El formulario NO pide teléfono, solo correo. Contacto con cargo poco claro: por eso va la línea de derivación.")
add(id='X46',dominio='pfvabogados.com',para='camilocereno@pfvabogados.com',contacto='Camilo Cereno (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='pfvabogados.com y su formulario',
cuerpo=["Hola Camilo:",
"En la portada de pfvabogados.com, en la sección Contáctenos, hay un formulario que pide nombre, correo y mensaje. Revisé el menú, el bloque de contacto y el pie y no hay ningún enlace a una política de privacidad ni a términos. El pie dice solo \"@2021\".",
"Es lo primero que mira quien duda antes de escribirle a un abogado. Lo repetí con otro navegador limpio y no cambió.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="El formulario pide correo, no teléfono. Solo se revisó la portada. ('Es lo primero que mira quien duda...' es una generalización mía: Ramón puede sacarla.)")
add(id='X49',dominio='palavicino.cl',para='rolando.gonzalez@palavicino.cl',contacto='Rolando González (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de palavicino.cl',
cuerpo=["Hola Rolando:",
"El formulario que está al final de la portada de palavicino.cl pide nombre, correo y teléfono, los tres obligatorios. Al lado no hay ninguna casilla ni texto sobre el uso de esos datos, y en toda la portada no encontré un enlace a una política de privacidad.",
"Un teléfono y un correo dejados por alguien que busca un abogado son datos que conviene tratar con cuidado. Lo revisé dos veces y las dos salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 2 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="Formulario con reCAPTCHA, al final de la portada (no en la primera pantalla). Solo portada.")
add(id='X50',dominio='cisternasycia.cl',para='adintrans@cisternasycia.cl',contacto='Andrés Dintrans (Knowledge Management, Legal Operations)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='el formulario de cisternasycia.cl',
cuerpo=["Hola Andrés:",
"Cerca del final de la portada de cisternasycia.cl hay un formulario con nombre, mail y mensaje. No tiene casilla de consentimiento ni un texto que diga qué se hace con lo que se envía, y en la portada, pie incluido, no hay un enlace a una política de privacidad, a términos ni a cookies.",
"Lo comprobé cargando la página limpia y mirando el código, y las dos veces dio lo mismo.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi otra cosa que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="El campo se llama 'Mail', pide solo correo. Contacto de operaciones legales: incluye derivación.")
add(id='X52',dominio='bacs.cl',para='atromo@bacs.cl',contacto='Antonino Tromo (Lawyer)',oferta='F1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='bacs.cl y la política de privacidad',
cuerpo=["Hola Antonino:",
"En bacs.cl, bajo \"Tengamos una conversación\", hay un formulario que pide nombre, correo y mensaje. Revisé los 40 enlaces de la portada y el pie y ninguno lleva a una política de privacidad o a un aviso sobre el uso de los datos. Junto al formulario tampoco hay una casilla ni una leyenda.",
"Cargué la página como un visitante nuevo y lo miré también en el código. Salió igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="No se envió ni se probó el formulario (solo lectura). Solo portada en español.")
add(id='X64',dominio='mgm-auditores.cl',para='lmorales@mgm-auditores.cl',contacto='(sin nombre en la base)',oferta='F1',ola='1ª ola',baja=BAJA_SITIO,
asunto='el formulario de mgm-auditores.cl',
cuerpo=["Hola:",
"La portada de mgm-auditores.cl tiene, en la sección \"¿Hablemos?\", un formulario que pide nombre, correo y teléfono. Al lado no hay ninguna leyenda sobre qué se hace con esos datos, y en el menú, el bloque de contacto y el pie no hay un enlace a una política de privacidad. El pie dice solo \"MGM Auditores 2026\".",
"Quien deja su teléfono a una firma de auditoría espera saber para qué. Lo repetí desde cero y salió lo mismo.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="Lead de Google Maps: la línea de baja dice 'del sitio de ustedes' (confirmar que el correo está publicado en su sitio). Sin dato de catch-all.")
add(id='X67',dominio='grupoauditax.cl',para='contacto@grupoauditax.cl',contacto='(correo genérico)',oferta='F1',ola='1ª ola',baja=BAJA_SITIO,
asunto='grupoauditax.cl y su formulario',
cuerpo=["Hola:",
"El formulario Contáctanos, al final de la portada de grupoauditax.cl, pide nombre, teléfono, correo y la consulta, los cuatro obligatorios. Junto a él no hay texto sobre cómo se tratan esos datos, y en la portada, pie incluido, no hay un enlace a una política de privacidad.",
"Es una consulta con datos de la empresa de quien escribe. Lo medí dos veces y las dos fue igual.",
CHEQUEO,
"Dejar la política y el aviso junto al formulario "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="Lead de Google Maps ('del sitio de ustedes'). Correo genérico: conviene buscar un nombre. Formulario al final de la portada.")

# ---------- C1: cookies de rastreo antes de aceptar nada (Verifica y Cumple) ----------
add(id='X30',dominio='schneiderabogados.cl',para='c.pihan@schneiderabogados.cl',contacto='Consuelo Pihan (Lawyer)',oferta='C1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='las cookies de schneiderabogados.cl',
cuerpo=["Hola Consuelo:",
"Tienen una política de cookies publicada, pero no vi un aviso que pregunte antes. Entré a schneiderabogados.cl, no toqué nada y en diez segundos el navegador ya había guardado dos cookies de Google Analytics.",
"Quien entra no sabe que se le está midiendo, y eso es lo que un aviso a tiempo resuelve. Lo repetí desde cero y salió igual.",
CHEQUEO,
"Poner el aviso para que frene la medición hasta que la persona decide "+KIT,
"Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.",
"Si no eres tú quien ve el sitio, ¿con quién lo hablo?"],
notas="La política de cookies existe y nombra Google Analytics: por eso se reconoce en la primera frase. El código declara un Consent Mode con analítica concedida por defecto. No decir que 'no informa' ni citar la ley.")
add(id='X45',dominio='fontaineycia.cl',para='rwaidele@fontaineycia.cl',contacto='Rosario Waidele (General Manager)',oferta='C1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='lo que mide fontaineycia.cl al entrar',
cuerpo=["Hola Rosario:",
"Entré a fontaineycia.cl en una ventana limpia, sin aceptar ni tocar nada, y en diez segundos el navegador ya tenía cuatro cookies de Google Analytics. No apareció ningún aviso de cookies, ni al abrir ni al bajar por la página.",
"Eso significa que se mide a cada persona que entra sin haberle preguntado. Lo repetí con movimiento de mouse y scroll y las mismas cuatro seguían ahí.",
CHEQUEO,
"Poner el aviso para que frene la medición hasta que la persona decide "+KIT,
"Vi otra cosa que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="Cuatro cookies de Analytics (_ga, _gid, _gat, _ga_*). No decir que 'Google recibió datos' ni citar la ley.")
add(id='X55b',dominio='peritum.cl',para='pgonzalez@peritum.cl',contacto='Pablo González (cargo en la base: Intern)',oferta='C1',ola='2ª ola (catch-all)',baja=BAJA_APOLLO,
asunto='las cookies de peritum.cl',
cuerpo=["Hola Pablo:",
"Peritum tiene su política de privacidad publicada, pero en peritum.cl no vi un aviso de cookies. Entré sin tocar nada y en diez segundos el navegador ya tenía cinco cookies: de Google Analytics, de Google Ads y de una herramienta de Microsoft que registra cómo se mueve el visitante por la página.",
"Lo repetí moviendo el mouse y bajando por el sitio, y las mismas cinco seguían ahí.",
CHEQUEO,
"Poner el aviso para que frene todo eso hasta que la persona decide "+KIT,
"Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría.",
"No sé si eres quien ve el sitio. Si no, ¿con quién lo hablo?"],
notas="El contacto figura como Intern: el correo pide la derivación. Hay enlace a política de privacidad en el pie (no se leyó su contenido).")
add(id='X77',dominio='suizandina.com',para='sergioperez@suizandina.com',contacto='(sin nombre confirmado)',oferta='C1',ola='1ª ola',baja=BAJA_APOLLO,
asunto='lo que deja suizandina.com al entrar',
cuerpo=["Hola:",
"Entré a suizandina.com sin tocar nada y, en diez segundos, el navegador ya tenía la cookie con la que Meta reconoce a quien visitó el sitio. No apareció ningún aviso de cookies, ni al abrir ni al bajar por la página.",
"Para un lodge que se promociona en redes es un dato que se usa. Lo repetí desde cero y salió igual.",
CHEQUEO,
"Poner el aviso para que frene eso hasta que la persona decide "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="HALLAZGO CHICO: una sola cookie (la de Meta). 'Se promociona en redes' es una inferencia mía: sacarla si no es seguro. No decir que Meta 'recibió' la visita (solo cargó el script).")
add(id='X78',dominio='almalodge.cl',para='carlos@almalodge.cl',contacto='(sin nombre confirmado)',oferta='C1',ola='1ª ola',baja=BAJA_APOLLO,
asunto='las cookies de almalodge.cl',
cuerpo=["Hola:",
"Abrí almalodge.cl sin aceptar nada y, a los diez segundos, ya había en el navegador una cookie de Meta, la que usa para reconocer a quien entró. En la portada no vi aviso de cookies y en el pie no hay enlace a una política de privacidad o de cookies.",
"Después moví el mouse y bajé por la página y no cambió.",
CHEQUEO,
"Poner el aviso para que frene eso hasta que la persona decide "+KIT,
"Vi 3 cosas más que no te anoto acá. Si quieres, lo vemos en una llamada de 20 minutos."],
notas="HALLAZGO CHICO (una cookie de Meta). La revisión de turismo del 13-oct lo había marcado 'sin hallazgo': decide Ramón si se envía. No decir que Meta 'recibió' la visita.")

L={l['dominio']:l['id'] for l in json.load(open('../corridas/2026-10-15-lote-contactos-existentes/lista.json'))['leads']}
for d in D: d['id']=L[d['dominio']]   # el id sale de la lista del lote, no de memoria
json.dump(D,open('borradores-primer-toque.json','w'),ensure_ascii=False,indent=1)
print(len(D))
