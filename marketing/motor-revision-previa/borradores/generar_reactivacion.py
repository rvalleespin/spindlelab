# Borradores de REACTIVACION (17-oct-2026): contactos que recibieron correos de SEO/ChatGPT hace mas de 4 semanas y no respondieron.
# Gancho nuevo = un hallazgo de cumplimiento o de contacto, VERIFICADO por dos revisores independientes (verificacion-independiente/2026-10-17-reactivacion-completo.json).
# Misma voz y mismas reglas que generar.py; la primera frase de la reactivacion reconoce el correo anterior y dice que hoy es otro tema.
# DECISION DE RAMON (19-oct-2026): el precio va SIN 'desde' en todo lo nuevo. Los 14 correos de reactivacion con precio ya salieron con 'desde $149.000 + IVA' el 19-oct.
# NO se envia nada.
import json
BAJA_APOLLO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo de Apollo, una base comercial de contactos B2B; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
BAJA_SITIO="Si no quieres que te escriba, dime y no insisto. Saqué tu correo del sitio de ustedes; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
PRECIO_F1="Arreglarlo cuesta $149.000 + IVA y queda en dos o tres días: un aviso junto al formulario y una plantilla de política para que la revise tu abogado."
PRECIO_C1="Dejar un aviso de cookies que pregunte antes cuesta $149.000 + IVA y queda en dos o tres días."
PRECIO_F9="Arreglarlo cuesta $149.000 + IVA y queda en dos o tres días: una plantilla de política de privacidad para que la revise tu abogado, y los dos enlaces del pie funcionando."
LLAMADA="Si quieres, lo vemos en una llamada de 20 minutos."
LLAMADA_MUESTRO="Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría."
LINEA_PRECIO="Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada."
CHEQUEO="Puedes verlo tú, gratis y sin registro: verifica.spindlelab.cl"
INCOGNITO="Puedes verlo tú: abre el sitio en una ventana de incógnito, sin aceptar nada, y mira las cookies desde el ícono a la izquierda de la dirección."
DERIVA="Si no eres tú quien ve el sitio, ¿con quién lo hablo?"
CUANDO={'jul':"En julio",'agosto':"A fines de agosto",'sep':"A comienzos de septiembre"}
CIERRES=["Hoy te escribo por otra cosa.","Esta vez es por otra cosa.","Hoy es por otra cosa."]
_n=[0]
def puente(k, cuando=None):
    cierre=CIERRES[_n[0]%len(CIERRES)]; _n[0]+=1
    return (cuando or (CUANDO[k]+" te escribí"))+" por cómo aparece tu sitio en Google y ChatGPT. "+cierre
SIN_AVISO=". Quien entra no alcanza a decidir nada: en la portada no vi ningún aviso donde pueda aceptar o rechazar."
D=[]
def add(**k): D.append(k)
def c1(id,dom,para,saludo,tanda,cuando,cuales,notas,baja=BAJA_SITIO,contacto='(correo genérico)',sin_aviso=SIN_AVISO,precio=None,puente_txt=None):
    add(id=id,dominio=dom,para=para,contacto=contacto,oferta='C1',ola='Reactivación '+tanda,baja=baja,asunto='las cookies de '+dom,
        cuerpo=[saludo,puente(cuando,puente_txt),
        f"Entré a {dom} sin hacer nada y, en unos diez segundos, mi navegador ya tenía guardadas {cuales}{sin_aviso}",
        INCOGNITO,(precio or PRECIO_C1)+" "+LLAMADA_MUESTRO,DERIVA],notas=notas)
def f1(id,dom,para,saludo,tanda,cuando,hecho,notas,baja=BAJA_SITIO,contacto='(correo genérico)'):
    add(id=id,dominio=dom,para=para,contacto=contacto,oferta='F1',ola='Reactivación '+tanda,baja=baja,asunto=('el formulario de '+dom),
        cuerpo=[saludo,puente(cuando),hecho,CHEQUEO,PRECIO_F1+" "+LLAMADA,DERIVA],notas=notas)

# ---- Tanda A
add(id='R30',dominio='oscplus.cl',para='contacto@oscplus.cl',contacto='(correo genérico)',oferta='F9',ola='Reactivación A',baja=BAJA_SITIO,asunto='los enlaces legales de oscplus.cl',
 cuerpo=["Hola:",puente('agosto'),
 "En el pie de oscplus.cl hay dos enlaces, \"Aviso legal\" y \"Privacidad\", y los dos llevan a una página de error. Quien quiera leer qué se hace con sus datos no tiene dónde, al menos desde el pie de la página.",
 "Puedes verlo tú: baja hasta el pie de la portada y haz clic en cada uno.",
 PRECIO_F9+" "+LLAMADA,DERIVA],
 notas="Verificado por 2 revisores (17-oct): /legal-notice y /privacy responden 404 desde el pie. No se afirma que el sitio no tenga política en otra dirección. Un revisor vio además que en /contacto el texto de consentimiento del formulario sale sin armar ('{{ ... |trans }}'); no se usa porque lo vio solo uno.")
add(id='R34',dominio='tuoficinacontable.cl',para='somos@tuoficinacontable.cl',contacto='(correo genérico)',oferta='F3',ola='Reactivación A',baja=BAJA_SITIO,asunto='los botones contratar de tuoficinacontable.cl',
 cuerpo=["Hola:",puente('sep'),
 "Revisé tuoficinacontable.cl y los cuatro botones Contratar de la sección Planes son los que toca quien ya decidió contratar. Enlazan a WhatsApp con el número sin el 56 de Chile (962830584), y WhatsApp espera el número completo. El botón verde flotante sí trae el 56.",
 "Puedes verlo tú: en el computador, pasa el cursor sobre un botón Contratar y mira la dirección que aparece abajo. Termina en wa.me/962830584, sin el 56.",
 "Lo arreglo con el 56 y lo pruebo desde el celular. "+LLAMADA+" "+LINEA_PRECIO,DERIVA],
 notas="Verificado por 2 revisores: los 4 botones CONTRATAR de Planes enlazan a wa.me/962830584 (sin 56); el flotante usa 56962830584. NO se afirma que 'no abre' ni que se pierdan clientes: nadie lo probó en un celular. El revisor independiente pidió comprobar con el cursor sobre el botón (la dirección del enlace), que es lo que sí se midió. Oferta Desarrollo Web: precio solo como referencia.")
f1('R24','paragonadvisors.cl','alberto.bezanilla@paragonadvisors.cl','Hola Alberto:','A','jul',
 "El formulario de la sección Contacto de paragonadvisors.cl pide nombre, teléfono y correo, y en la portada no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
 "Verificado por 2 revisores. El formulario está al final de la portada, no en la primera pantalla. El pie solo dice 'Paragon Advisors - 2023', sin enlaces. La sección Documentos lista 5 PDF que nadie abrió: por eso el correo dice 'en la portada'. Asesora de inversiones: tono sobrio.",baja=BAJA_APOLLO,contacto='Alberto Bezanilla')
f1('R46','neosit.cl','patricio.gutierrez@neosit.cl','Hola Patricio:','A','sep',
 "El formulario de la sección Contáctenos de neosit.cl pide nombre, correo y teléfono, y en la portada, incluido el pie, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
 "Verificado por 2 revisores. Aparte: la portada tiene texto de relleno ('Lorem ipsum' en Rubros y testimonios 'Nombre Apellido / Cargo'); lo vio un revisor. Podría ser un gancho más fuerte para Desarrollo Web, pero no pasó por verificación doble.",contacto='Patricio Gutiérrez')
c1('R42','mcontabilidad.cl','julio@mcontabilidad.cl','Hola Julio:','A','sep',
 "cookies de Google Analytics y de Microsoft Clarity, una herramienta que registra cómo navega el visitante",
 "Verificado por 2 revisores (cookies de Analytics y Clarity a los 11 s, antes de mover el mouse; sin aviso ni enlace de privacidad en la portada). Medido desde una IP de nube: un aviso por país no se puede descartar del todo.",contacto='Julio (sin apellido en la base)')
c1('R62','corredoresintegrados.cl','coor@corredoresintegrados.cl','Hola:','A','sep',
 "cookies de Google (analítica y publicidad), de Meta (Facebook e Instagram) y de Microsoft Clarity, que registra la navegación",
 "Verificado por 2 revisores. El chat de Cliengo que se abre solo NO es un aviso de cookies. No se afirma que Meta recibió la visita, solo que dejó su cookie.")
f1('R57','gesinpropiedades.cl','joseviveros@gesinpropiedades.cl','Hola:','A','sep',
 "El formulario \"Contáctanos\" de la portada de gesinpropiedades.cl pide nombre, correo y teléfono. Quien lo llena no ve dónde leer qué se hace con esos datos: ni en el menú ni en el pie encontré un enlace a una política de privacidad de la empresa.",
 "Verificado por 2 revisores. El formulario está en la primera pantalla. El reCAPTCHA de Google trae sus propios enlaces de privacidad: por eso el correo dice 'de la empresa'. El buscador de la portada mostraba '¡No se han encontrado resultados!' (no se usa: puede ser temporal).",contacto='José (según el correo; sin apellido confirmado)')
c1('R35','akcontadores.cl','contacto@akcontadores.cl','Hola:','A','sep',
 "cookies de Google (analítica y publicidad) y de Meta (Facebook e Instagram)",
 "Verificado por 2 revisores. La ventana 'Podemos Ayudarte!' que se abre al cargar es un formulario de captación, NO un aviso de cookies; el correo no habla de ventanas emergentes.")
# ---- Tanda B
f1('R32','clavetributariacontadores.cl','hola@clavetributariacontadores.cl','Hola:','B','agosto',
 "El formulario \"Envía un mensaje\" de la portada de clavetributariacontadores.cl pide nombre, correo y teléfono, y en la portada no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
 "Verificado por 2 revisores. OJO PARA LA LLAMADA: un revisor leyó el código del sitio y el formulario parece no enviar nada (comentario 'no hay backend real'; muestra 'Mensaje enviado' y se limpia). Nadie lo probó y NO va en el correo. Si es cierto es un hallazgo mayor que la política: se comprueba a mano antes de hablar.")
f1('R44','a2rcontadores.cl','contacto@a2rcontadores.cl','Hola:','B','sep',
 "El formulario de contacto de la portada de a2rcontadores.cl pide nombre, empresa, teléfono y correo. Ni junto al formulario ni en el pie encontré un enlace a una política de privacidad de la empresa, así que quien lo llena no tiene a la vista qué se hace con esos datos.",
 "Verificado por 2 revisores. El formulario tiene reCAPTCHA de Google (su enlace no cuenta: por eso 'de la empresa'). Sitio con plantilla de 2018: no se menciona.")
c1('R33','contable.app','hola@contable.app','Hola:','B','sep',
 "cookies de Google (analítica y publicidad) y de Meta (Facebook e Instagram)",
 "Verificado por 2 revisores. ESTE SITIO SÍ TIENE política de privacidad enlazada en el pie: el correo no dice nada sobre política. No se afirma que Meta recibió la visita.")
c1('R48','taxwork.cl','contacto@taxwork.cl','Hola:','B','sep',
 "cookies de Google Analytics y de Meta (Facebook e Instagram)",
 "Verificado por 2 revisores. Medido desde una IP de nube: un aviso por país no se puede descartar del todo.")
c1('R50','rento.cl','contacto@rento.cl','Hola:','B','agosto',
 "varias cookies de Google (analítica y publicidad) y de Meta (Facebook e Instagram)",
 "Verificado por 2 revisores (misma lista con dos navegadores distintos). OJO: el HTML trae un plugin de aviso de cookies (Hu-manity, 'blocking': false) que no se pintó en la medición desde IP de nube; un revisor lo vio y el otro no. Por eso el correo NO dice 'no vi ningún aviso': solo que las cookies estaban antes de aceptar o rechazar. No decir 'no tienen aviso'. Salieron además cookies de otra herramienta de medición (_ym_*) que no se nombra.",
 sin_aviso=", antes de que yo aceptara o rechazara algo.",
 precio="Que el sitio pregunte antes de guardar esas cookies cuesta $149.000 + IVA y queda en dos o tres días.",
 puente_txt="Entre fines de agosto y comienzos de septiembre te escribí")
c1('R68','urbac.cl','propiedades@urbac.cl','Hola:','B','sep',
 "cookies de Google (analítica y publicidad)",
 "Verificado por 2 revisores. El más flojo de los C1: solo Google. Un revisor vio el pie sin enlace a política; el otro no lo buscó, por eso el correo no lo menciona.")
c1('R69','goycooleapropiedades.cl','contacto@goycooleapropiedades.cl','Hola:','B','sep',
 "cookies de Google (analítica y publicidad) y de Meta (Facebook e Instagram)",
 "Verificado por 2 revisores. No se afirma que Meta recibió la visita ni nada sobre política de privacidad (solo se miró la portada).")
json.dump(D,open('borradores-reactivacion.json','w'),ensure_ascii=False,indent=1)
print(len(D))
