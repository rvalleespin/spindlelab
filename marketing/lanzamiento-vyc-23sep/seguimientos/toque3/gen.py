# -*- coding: utf-8 -*-
import os, csv, re

OUT = "/private/tmp/claude-501/-Users-ramon-Library-Mobile-Documents-com-apple-CloudDocs-SPINDLELAB/befb9f93-f301-497e-a5c3-ea7342366826/scratchpad/seguimientos/toque3"

BAJA = ("Si no quieres que te escriba, respondeme y no lo vuelvo a hacer. Saque tu correo de una base "
        "de prospeccion comercial; en verifica.spindlelab.cl/privacidad cuento que datos trato y como "
        "pedir que deje de hacerlo.")
# version con tildes reales
BAJA = ("Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo de una base de "
        "prospección comercial; en verifica.spindlelab.cl/privacidad cuento qué datos trato y cómo pedir "
        "que deje de hacerlo.")

FIRMA_HC = "Ramón Vallejos\nSpindleLab · hola@spindlelab.cl"
FIRMA_AB = "Ramón Vallejos\nSpindleLab · spindlelab.cl"

E = []

E.append(dict(
 archivo="01-awasi.txt", grupo="hoteles", nombre="(equipo)", empresa="Awasi",
 email="ppereira@awasi.com", dominio="awasi.com", firma=FIRMA_HC,
 asunto="Re: awasi.com carga Analytics, Meta y Reddit antes de pedir permiso",
 recurso="14 ter · transferencias internacionales",
 cuerpo="""Hola, equipo de Awasi:

Este es el último correo que te mando sobre esto.

Te dejo una cosa que sirve igual si no me contestas. Entre los doce puntos del artículo 14 ter está el de transferencias internacionales, que es nombrar a los proveedores que reciben los datos y decir dónde están. Los cuatro que te nombré entran ahí.

El chequeo queda publicado y gratis, por si lo quieres correr tú.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="02-hoteles-cumbres.txt", grupo="hoteles", nombre="(equipo)", empresa="Hoteles Cumbres",
 email="gfernandez@hotelescumbres.cl", dominio="hotelescumbres.cl", firma=FIRMA_HC,
 asunto="Re: hotelescumbres.com no tiene política de privacidad enlazada en la portada",
 recurso="14 ter · medio de contacto para solicitudes",
 cuerpo="""Hola, equipo de Hoteles Cumbres:

Hasta acá llego con esto, no te escribo más.

Te dejo lo más barato de los doce puntos del artículo 14 ter, que es el medio de contacto. Un correo publicado donde cualquiera pueda pedir sus datos o reclamar. No necesita abogado ni desarrollador.

El chequeo sigue arriba, gratis y sin registro, para cuando lo necesites.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="03-terrado.txt", grupo="hoteles", nombre="Ruperto Edwards", empresa="Terrado",
 email="ruperto.edwards@terrado.cl", dominio="terrado.cl", firma=FIRMA_HC,
 asunto="Re: terrado.cl carga los rastreadores antes de que alguien toque el aviso de cookies",
 recurso="14 ter · revocar el consentimiento",
 cuerpo="""Hola Ruperto:

Este es el último, no te molesto más con esto.

De los doce puntos que pide el artículo 14 ter, el del consentimiento tiene dos mitades. Pedirlo antes de cargar nada y dejar que lo retiren después. La segunda casi nadie la pone, y es un control en el pie que vuelva a abrir el aviso.

El chequeo queda público y gratis, por si algún día lo quieres correr tú.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="04-time.txt", grupo="hoteles", nombre="(equipo)", empresa="Time",
 email="afuenzalida@time.cl", dominio="time.cl", firma=FIRMA_HC,
 asunto="Re: time.cl pide el correo sin casilla de consentimiento",
 recurso="14 ter · política con versión y fecha",
 cuerpo="""Hola, equipo de Time:

Este es el último correo que te escribo.

Te dejo el punto de los doce del artículo 14 ter que más rinde por lo poco que cuesta. La política tiene que llevar su versión y la fecha en que se actualizó. Es una línea al final de la página, y es lo primero que mira alguien que llega desconfiando.

El chequeo sigue publicado, gratis y sin registro.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="05-patagonia-camp.txt", grupo="hoteles", nombre="(equipo)", empresa="Patagonia Camp",
 email="mramirez@patagoniacamp.com", dominio="patagoniacamp.com", firma=FIRMA_HC,
 asunto="Re: patagoniacamp.com deja cookies de 400 días sin aviso previo",
 recurso="14 ter · plazo de conservación",
 cuerpo="""Hola, equipo de Patagonia Camp:

Cierro acá y no te escribo de nuevo.

Entre los doce puntos del artículo 14 ter hay uno que se responde adentro, sin abogado, y es el plazo de conservación. Cuánto tiempo se guarda lo que entra por el formulario y cuándo se borra. Si nadie lo definió, la respuesta de hecho es para siempre.

El chequeo queda gratis y sin registro.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="06-las-torres.txt", grupo="clinicas-hoteles", nombre="(equipo)", empresa="Las Torres",
 email="jyk@lastorres.com", dominio="lastorres.com", firma=FIRMA_HC,
 asunto="Re: el aviso de lastorres.com frena a Google, no a Meta ni a Microsoft",
 recurso="14 ter · los cinco derechos y cómo ejercerlos",
 cuerpo="""Hola, equipo de Las Torres:

Este es el último correo que te mando.

Si alguna vez revisas tu política por dentro, yo miraría los cinco derechos, acceso, rectificación, supresión, oposición y portabilidad, y a qué correo se ejercen. Nunca la leí, así que no sé cómo está. Es lo que se echa de menos recién cuando alguien reclama.

El chequeo queda público y gratis.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="07-skinology.txt", grupo="clinicas", nombre="Antonia", empresa="Skinology",
 email="antonia@skinology.cl", dominio="skinology.cl", firma=FIRMA_HC,
 asunto="Re: skinology.cl manda la visita a Google, TikTok y Pinterest antes de cualquier aviso",
 recurso="14 ter · categorías de datos, destinatarios y finalidades",
 cuerpo="""Hola Antonia:

Este es el último que te escribo.

Si en algún momento revisas tu política por dentro, el punto que yo miraría es el de categorías de datos, que pide decir qué recoges, para qué, y quién los recibe, nombrando a cada proveedor. Nunca la leí, así que no sé cómo está. Es el que queda viejo apenas se suma una herramienta nueva.

El chequeo sigue gratis y sin registro.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="08-revitalaser.txt", grupo="clinicas", nombre="(equipo)", empresa="Revitalaser",
 email="arriojasem@revitalaser.cl", dominio="revitalaser.cl", firma=FIRMA_HC,
 asunto="Re: en revitalaser.cl basta mover el mouse para que carguen los rastreadores",
 recurso="dato técnico (plugin de velocidad vs. aviso) + chequeo",
 cuerpo="""Hola, equipo de Revitalaser:

Este es el último correo que te mando.

Te dejo un dato técnico por si algún día instalas el aviso de cookies. El plugin de velocidad que retrasa los scripts retrasa también el del aviso, salvo que lo saques a mano de esa lista. Si no, el aviso aparece cuando ya cargó todo.

El chequeo sigue gratis y sin registro.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="09-kydoft.txt", grupo="clinicas", nombre="Paola Dorta", empresa="Kydoft",
 email="paoladorta@kydoft.cl", dominio="kydoft.cl", firma=FIRMA_HC,
 asunto="Re: kydoft.cl no tiene política de privacidad enlazada y ya envía datos a Google",
 recurso="14 ter · identificación del responsable",
 cuerpo="""Hola Paola:

Este es el último que te mando.

De los doce puntos del artículo 14 ter, el que se enreda cuando una empresa tiene más de un sitio es el del responsable. Quién trata los datos, con nombre y RUT, y a quién se le reclama. Conviene que sea el mismo en todos, y eso lo defines tú antes de que lo escriba un abogado.

El chequeo sigue gratis y sin registro.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="10-aurea-med.txt", grupo="clinicas", nombre="Claudio Valdivia", empresa="Clínica Áurea",
 email="claudio.valdivia@aureamed.cl", dominio="clinicaaurea.cl", firma=FIRMA_HC,
 asunto="Re: clinicaaurea.cl carga Analytics y Meta sin aviso, y no publica política de privacidad",
 recurso="14 ter · transferencias internacionales",
 cuerpo="""Hola Claudio:

Cierro acá y no te escribo más.

Entre los doce puntos del artículo 14 ter está el de transferencias internacionales, que pide nombrar a los proveedores que reciben los datos y decir dónde están. Es el que más se olvida cuando las etiquetas salen por un dominio propio, porque desde afuera no se nota.

El chequeo queda público y gratis.
https://verifica.spindlelab.cl"""))

E.append(dict(
 archivo="11-garciaparot.txt", grupo="abogados", nombre="Emilia Tagle Cervero", empresa="García Parot",
 email="etagle@garciaparot.cl", dominio="garciaparot.cl", firma=FIRMA_AB,
 asunto="Re: la política de privacidad de garciaparot.cl",
 recurso="chequeo como herramienta (propia y de clientes)",
 cuerpo="""Hola Emilia,

Este es el último correo que te mando.

Te dejo la herramienta, que es lo único mío que te puede servir aunque nunca hablemos. El chequeo lee un sitio y muestra qué carga antes de que la persona acepte nada. Gratis, sin registro, y sirve igual para el sitio de un cliente.
https://verifica.spindlelab.cl

La parte legal es tuya. Yo solo miro lo que hace el sitio."""))

E.append(dict(
 archivo="12-atabogados.txt", grupo="abogados", nombre="Camila Retamal", empresa="AT Abogados",
 email="cretamal@atabogados.cl", dominio="atabogados.cl", firma=FIRMA_AB,
 asunto="Re: atabogados.cl no enlaza su política de privacidad",
 recurso="chequeo como herramienta (propia y de clientes)",
 cuerpo="""Hola Camila,

Cierro acá y no te escribo más.

Te dejo el chequeo por si alguna vez te sirve, para tu sitio o para el de un cliente. Muestra qué carga una página antes de que alguien acepte nada. Es gratis, no pide correo y no guarda el dominio que revisas.
https://verifica.spindlelab.cl

Lo legal lo sabes tú mejor que yo. Yo miro la parte técnica."""))

E.append(dict(
 archivo="13-delamaza.txt", grupo="abogados", nombre="Ricardo De La Maza", empresa="De La Maza Abogados",
 email="rdelamaza@delamazaycia.cl", dominio="delamazaycia.cl", firma=FIRMA_AB,
 asunto="Re: revisé delamazaycia.cl y no encontré la política de privacidad",
 recurso="chequeo como herramienta (propia y de clientes)",
 cuerpo="""Hola Ricardo,

Este es el último. No te escribo de nuevo.

Te dejo el chequeo, que es gratis y no pide nada. Sirve para tu sitio y para el de cualquier cliente que llegue preguntando por la 21.719, porque muestra lo que la página carga antes de que la persona elija.
https://verifica.spindlelab.cl

El derecho lo pones tú. Yo miro la parte técnica y ahí me quedo."""))

E.append(dict(
 archivo="14-cnsy.txt", grupo="abogados", nombre="Pablo Saffirio Espinoza", empresa="CNSY Abogados",
 email="pablos@cnsy.cl", dominio="cnsy.cl", firma=FIRMA_AB,
 asunto="Re: la política de privacidad de cnsy.cl y sus rastreadores",
 recurso="chequeo como herramienta (propia y de clientes)",
 cuerpo="""Hola Pablo,

Hasta acá llego, no te escribo de nuevo.

Te dejo el chequeo. Lo puedes correr sobre cualquier dominio, el tuyo o el de un cliente, y muestra qué carga la página antes de que alguien acepte nada. Gratis y sin registro.
https://verifica.spindlelab.cl

La lectura legal es tu terreno. Yo me quedo en lo técnico."""))

E.append(dict(
 archivo="15-tuane.txt", grupo="abogados", nombre="Savka Muñoz Hernández", empresa="Tuane & Cía Abogados",
 email="smunoz@tuane.cl", dominio="tuane.cl", firma=FIRMA_AB,
 asunto="Re: tuane.cl no enlaza su política de privacidad",
 recurso="chequeo + observación anónima (política publicada sin enlace)",
 cuerpo="""Hola Savka,

Este es el último correo que te mando.

Una cosa que me encontré revisando sitios y que te puede servir con tus clientes. Un sitio tenía su política publicada desde abril y ningún enlace llevaba a ella, así que en la práctica no existía para quien entraba.

El chequeo queda gratis y sin registro, para tu sitio o el de un cliente.
https://verifica.spindlelab.cl"""))

def wc(t):
    return len([w for w in re.split(r"\s+", t.strip()) if w])

rows = []
for e in E:
    txt = "Para: %s\nAsunto: %s\n\n%s\n\n%s\n\n%s\n" % (e["email"], e["asunto"], e["cuerpo"], BAJA, e["firma"])
    with open(os.path.join(OUT, e["archivo"]), "w", encoding="utf-8") as f:
        f.write(txt)
    rows.append(dict(
        orden=e["archivo"][:2], archivo=e["archivo"], grupo=e["grupo"], nombre=e["nombre"],
        empresa=e["empresa"], email=e["email"], dominio=e["dominio"], asunto=e["asunto"],
        recurso_util=e["recurso"], palabras_cuerpo=wc(e["cuerpo"]), enviar="2026-10-01",
    ))

with open(os.path.join(OUT, "indice.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    for r in rows:
        w.writerow(r)

for r in rows:
    flag = "  <-- SOBRE 80" if r["palabras_cuerpo"] >= 80 else ""
    print("%-26s %3d%s" % (r["archivo"], r["palabras_cuerpo"], flag))
