# Borradores de PRIMER TOQUE del piloto Vibe (19-oct-2026): contactos nuevos, sin correo previo de SpindleLab.
# Hechos = lo que confirmaron DOS revisores independientes (verificacion-independiente/2026-10-19-piloto-vibe.json). Voz y reglas de generar.py.
# Decisiones aplicadas: precio SIN 'desde' (Ramon, 19-oct); SIN plazo ('dos o tres días' no esta confirmado y el material aprobado dice 'no se ofrece plazo': ver nota en 05-mecanismo-de-leads.md);
# la linea de baja dice la fuente REAL ('del sitio de ustedes'); nunca se afirma 'Google recibe la visita' ni que el sitio 'no tiene politica' (solo la portada se reviso).
# Las cookies que se nombran son SOLO las de medicion que vieron los dos revisores a la vez. NO se envia nada.
import json, re, csv, sys
RAIZ = '/home/user/spindlelab/marketing/motor-revision-previa/'
BAJA_SITIO = "Si no quieres que te escriba, dime y no insisto. Saqué tu correo del sitio de ustedes; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
PRECIO_C1 = "Dejar un aviso de cookies que pregunte antes cuesta $149.000 + IVA."
PRECIO_F1 = "Arreglarlo cuesta $149.000 + IVA e incluye un aviso junto al formulario y una plantilla de política para que la revise tu abogado."
PRECIO_F1_ESTUDIO = "Arreglarlo cuesta $149.000 + IVA e incluye un aviso junto al formulario y una plantilla de política para que la revisen en el estudio."
LLAMADA = "Si quieres, lo vemos en una llamada de 20 minutos."
LLAMADA_MUESTRO = "Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo lo dejaría."
CHEQUEO = "Puedes verlo tú, gratis y sin registro: verifica.spindlelab.cl"
VERLO_F1 = "Puedes verlo tú: abre la portada, baja hasta el formulario y busca ese enlace."
INCOGNITO = "Puedes verlo tú: abre el sitio en una ventana de incógnito, sin aceptar nada, espera unos diez segundos y mira las cookies desde el ícono a la izquierda de la dirección."
DERIVA = "Si no eres tú quien ve el sitio, ¿con quién lo hablo?"
SIN_AVISO = "En la portada no vi ningún aviso donde el visitante pueda aceptar o rechazar."

ver = {v['id']: v for v in json.load(open(RAIZ + 'verificacion-independiente/2026-10-19-piloto-vibe.json'))}
ent = {r['dominio'].replace('www.', ''): r for r in csv.DictReader(open(RAIZ + 'corridas/2026-10-19-piloto-vibe/entrada.csv', encoding='utf8'))}

# ---- quien es persona de verdad (el extractor llamo 'personal' a cualquier correo que no fuera de una lista de roles)
PERSONA = {'V08': 'dmunoz', 'V109': 'mvial', 'V25': 'nelson', 'V28': 'gromero', 'V64': 'vboetsch'}
SALUDO = {'V25': 'Hola Nelson:'}   # solo cuando el correo trae un nombre de pila; con inicial+apellido no se adivina

def cuales(cookies):
    fam = set()
    for c in cookies:
        if re.match(r'_ga|_gid|_gat', c): fam.add('ga')
        elif re.match(r'_gcl_|IDE$', c): fam.add('ads')
        elif re.match(r'_fbp|_fbc|pys_', c): fam.add('meta')
        elif re.match(r'_clck|_clsk', c): fam.add('clarity')
        elif re.match(r'_hj', c): fam.add('hotjar')
        elif re.match(r'_uet', c): fam.add('msads')
        elif re.match(r'_ttp', c): fam.add('tiktok')
    partes = []
    if 'ga' in fam and 'ads' in fam: partes.append('de Google (analítica y publicidad)')
    elif 'ga' in fam: partes.append('de Google Analytics')
    elif 'ads' in fam: partes.append('de publicidad de Google')
    if 'meta' in fam: partes.append('de Meta (Facebook e Instagram)')
    if 'msads' in fam: partes.append('de Microsoft Ads')
    if 'tiktok' in fam: partes.append('de TikTok')
    if 'clarity' in fam: partes.append('de Microsoft Clarity, que registra la navegación')
    if 'hotjar' in fam: partes.append('de Hotjar, que registra la navegación')
    if not partes: return None, 0
    peso = ('ga' in fam) + ('ads' in fam) + 2 * ('meta' in fam) + 2 * ('clarity' in fam or 'hotjar' in fam) + ('msads' in fam) + ('tiktok' in fam)
    txt = 'cookies ' + (partes[0] if len(partes) == 1 else ', '.join(partes[:-1]) + ' y ' + partes[-1])
    return txt, peso

D = []
RESERVA = []   # confirmados que NO se escriben ahora, con el motivo (criterio de corte de Ramon, 14-oct)
def base(id, **k):
    v = ver[id]; e = ent[v['dominio']]
    d = dict(id=id, dominio=v['dominio'], empresa=e['empresa'], para=e['email'], tipo=('persona' if id in PERSONA else 'rol'), oferta=v['oferta'], ola='Piloto Vibe',
             baja=BAJA_SITIO, fuente_dominio='Vibe Prospecting 19-oct-2026; correo publicado en el sitio')
    d.update(k); return d

# ---- C1: cookies antes de cualquier consentimiento (generado desde las cookies que vieron los DOS revisores)
for id, v in ver.items():
    if v['final'] != 'confirmado' or v['oferta'] != 'C1': continue
    txt, peso = cuales(v['cookies_medicion_en_ambos'] or [])
    if not txt:
        RESERVA.append(dict(id=id, dominio=v['dominio'], email=ent[v['dominio']]['email'], motivo='Confirmado, pero los dos revisores no coinciden en ninguna cookie de medicion nombrable: remedir')); continue
    dom = v['dominio']
    FORM = "Más abajo, en esa misma portada, hay un formulario de contacto, así que quien te escribe ya tiene esas cookies guardadas en su navegador."
    EXTRA_C1 = {'V07': FORM, 'V29': FORM}   # formulario visto por el motor en 2-3 rondas, por un revisor y en la captura r1-B; consecuencia que el dueño siente (criterio 3 de Ramon)
    if txt == 'cookies de Google Analytics':
        # Criterio 3 de Ramon (14-oct): solo Analytics, sin formulario, sin grabacion de sesion y sin publicidad = el correo diria 'cookies' y nada mas.
        extra = {'V58': 'tiene 1 formulario en la portada: candidato a F1, falta verificarlo con dos revisores', 'V74': 'el motor y un revisor vieron Clarity (grabacion de sesion) pero el otro no: remedir antes de escribir'}.get(id, 'sin formulario, sin Pixel de Meta, sin Clarity/Hotjar y sin publicidad: no hay consecuencia que el dueño sienta')
        RESERVA.append(dict(id=id, dominio=dom, email=ent[dom]['email'], motivo='Solo cookies de Google Analytics; ' + extra)); continue
    ncook = len(v['cookies_medicion_en_ambos'])
    if id == 'V43':
        # Revision independiente: solo _gcl_au se escribe en carga pasiva; _ga y _ga_* aparecen tras mover el mouse o hacer scroll. No se dice 'sin hacer nada' de las de analitica.
        p2 = f"Entré a {dom} sin aceptar nada y, en cuanto cargó la portada, mi navegador guardó una cookie de publicidad de Google; al navegar un poco más se sumaron las de analítica. {SIN_AVISO} Más abajo hay un formulario que pide nombre, teléfono y correo, y quien lo llena ya lleva esas cookies guardadas."
        inc = "Puedes verlo tú: abre el sitio en una ventana de incógnito, sin aceptar nada, y mira las cookies desde el ícono a la izquierda de la dirección, al cargar y de nuevo después de bajar por la página."
    else:
        guardadas = ('guardada una ' + txt.replace('cookies ', 'cookie ', 1)) if ncook == 1 else ('guardadas ' + txt)   # una sola cookie = singular (V54, V21)
        p2 = f"Entré a {dom} sin hacer nada y, en unos diez segundos, mi navegador ya tenía {guardadas}. {SIN_AVISO}" + (' ' + EXTRA_C1[id] if id in EXTRA_C1 else '')
        inc = INCOGNITO
    d = base(id, asunto='las cookies de ' + dom, peso=peso,
             cuerpo=[SALUDO.get(id, 'Hola:'), p2, inc, PRECIO_C1 + ' ' + LLAMADA_MUESTRO, DERIVA],
             notas=f"Verificado por 2 revisores (19-oct). Cookies nombradas = las de medición que vieron ambos: {', '.join(v['cookies_medicion_en_ambos'])}. Sin aviso visible en ninguna captura (antes y despues del primer gesto). Medido desde IP de nube. Sin Consent Mode bloqueante (gcs=G100) en ninguna peticion. NO se afirma que Google/Meta 'reciban la visita' ni que el sitio 'no tenga politica'."
                   + (" El formulario de la portada lo vieron el motor en 2-3 rondas, un revisor y la captura r1-B." if id in EXTRA_C1 or id == 'V43' else '')
                   + (" ESTE SITIO SI TIENE politica de privacidad en el pie: el correo no habla de politica." if id == 'V07' else '')
                   + (" V43: solo _gcl_au se escribe en carga pasiva; las de analitica (_ga, _ga_*) aparecen tras mover el mouse o hacer scroll: el correo lo dice asi." if id == 'V43' else ''))
    D.append(d)

# ---- F1: formulario que pide correo/telefono y ningun enlace a politica de privacidad en la portada (redactado a mano desde lo que vieron los dos revisores)

# Reescritura del 19-oct tras el primer lector independiente (V28): el F1 abre con la CONSECUENCIA que el dueño siente (quien deja sus datos no ve que se hace con ellos), no con el inventario de campos;
# y no se manda al chequeo gratis de verifica.spindlelab.cl: nadie lo corrio sobre estos dominios, y si el dueño no ve lo mismo el correo queda desmentido. Se le dice donde mirar en SU portada.
LUGAR = "ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad"
HECHO_F1 = {
 'V06': 'Revisé la portada de cypauditores.cl. El formulario de contacto pide nombre, correo y celular. Ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V111': 'Revisé la portada de molinarios.cl. El formulario de la sección Contáctanos pide nombre y correo. Ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad del estudio que diga qué se hace con esos datos.',
 'V17': 'Revisé la portada de finpartner.cl. El formulario de Diagnóstico gratuito, en la primera pantalla, pide además del correo la facturación y el régimen tributario. No encontré un enlace a una política de privacidad que diga qué se hace con esos datos, ni junto al formulario, ni en el menú, ni en el pie.',
 'V20': 'Revisé lcconsultores.cl. El formulario de la sección Contacto pide nombre y correo, y opcionalmente teléfono. En la página, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V28': 'Revisé la portada de ulloaycia.cl. El formulario de la sección Escríbenos pide nombre y correo. Ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V30': 'Revisé la portada de sbsolutions.cl. El formulario de la sección Contacto pide nombre, correo y consulta. Ni junto al formulario ni en el pie encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V37': 'Revisé la portada de bgconsultoria.cl. El formulario «¿Tienes alguna consulta?» pide nombre, teléfono y correo. Ni en el menú ni en el pie encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V57': 'Revisé la portada de reb-chile.cl. El formulario «Vende con nosotros», al final de la página, pide nombre, correo y teléfono. Ni junto al formulario ni en el pie encontré un enlace a una política de privacidad de REB que diga qué se hace con esos datos.',
 'V65': 'Revisé la portada de remax-start.cl. El formulario Escríbenos, al final de la página, pide nombre, correo y teléfono. Ni cerca del formulario ni en el pie encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V67': 'Revisé la portada de audiprop.com. El formulario de la sección Contáctanos, al final de la página, pide nombre, apellido y correo. Ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad que diga qué se hace con esos datos.',
 'V89': 'Revisé la portada de medicinachina.cl. El formulario para pedir hora clínica pide nombre y teléfono. Ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad de la escuela que diga qué se hace con esos datos.',
 'V94': 'Revisé la portada de trustdoc.cl. El formulario de contacto pide nombre, cargo, organización y correo, y teléfono si quiere. Bajo el botón dice que los datos se tratarán conforme a la ley, pero ni junto a ese texto, ni en el menú, ni en el pie encontré un enlace a una política de privacidad que explique cómo.',
}
VERLO_CUSTOM = {'V17': "Puedes verlo tú: abre la portada y busca ese enlace."}
def f1(id, hecho, notas, precio=PRECIO_F1, verlo=VERLO_F1):
    dom = ver[id]['dominio']
    hecho = HECHO_F1.get(id, hecho)
    if verlo == CHEQUEO: verlo = VERLO_F1
    verlo = VERLO_CUSTOM.get(id, verlo)
    D.append(base(id, asunto='el formulario de ' + dom, peso=2,
                  cuerpo=[SALUDO.get(id, 'Hola:'), hecho, verlo, precio + ' ' + LLAMADA, DERIVA], notas='Verificado por 2 revisores (19-oct). ' + notas))
f1('V06', "El formulario de contacto de la portada de cypauditores.cl pide nombre, correo y celular, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada. El celular es obligatorio. El pie solo tiene Inicio, Nosotros, Servicios y Contacto. Firma de auditoria (no estudio juridico): el precio dice 'tu abogado'.")
f1('V111', "El formulario de la sección Contáctanos de molinarios.cl pide nombre, correo y mensaje, y en la portada, pie incluido, no encontré un enlace a una política de privacidad del estudio que diga qué se hace con esos datos.",
   "Solo portada en español (hay version en ingles sin medir). NO pide telefono. Cuatro rutas tipicas de politica dan 404, pero eso no prueba que no exista otra: el correo dice 'en la portada'. Estudio de abogados: tono sobrio.", precio=PRECIO_F1_ESTUDIO, verlo=CHEQUEO)
f1('V17', "La portada de finpartner.cl tiene tres formularios que piden correo, entre ellos el de Diagnóstico gratuito de la primera pantalla, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada. La portada dice 'Confidencialidad total' y 'Sin spam' junto a los formularios: por eso el correo habla de 'enlace a una politica', no de que no digan nada.")
f1('V20', "El formulario de la sección Contacto de lcconsultores.cl pide nombre y correo, y opcionalmente teléfono. En la página, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Sitio de una sola pagina con desplazamiento horizontal: el formulario esta en el panel Contacto, NO en la primera pantalla. Cuatro rutas tipicas dan 404 y no hay sitemap (no prueba ausencia total).", verlo="Puedes verlo tú: abre el sitio, entra a la sección Contacto y busca ese enlace.")
f1('V28', "El formulario de la sección Escríbenos de ulloaycia.cl pide nombre y correo, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada y /contacto/. NO pide telefono. Correo de persona (inicial+apellido): saludo sin nombre.", verlo=CHEQUEO)
f1('V30', "El formulario de la sección Contacto de sbsolutions.cl pide nombre, correo y consulta, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada. NO pide telefono (aparece solo como dato de contacto).")
f1('V37', "El formulario ¿Tienes alguna consulta? de bgconsultoria.cl pide nombre, teléfono y correo, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada y /servicios/. El correo publicado en el sitio es una direccion gmail (bgconsultorempresas@gmail.com): es el contacto que el propio sitio muestra, pero es un buzon de gmail; Ramon decide si se escribe.")
f1('V57', "El formulario Vende con nosotros del final de la portada de reb-chile.cl pide nombre, correo y teléfono, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada. El formulario esta cerca del final de la pagina (no en la primera pantalla): el correo dice 'del final de la portada'. El correo publicado es reb@ (siglas de la empresa): buzon de rol.", verlo=CHEQUEO)
f1('V65', "El formulario Escríbenos del final de la portada de remax-start.cl pide nombre, correo y teléfono, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada, sitio de una pagina con anclas. El formulario esta al final (fuera de la primera pantalla). Cuatro rutas tipicas dan 404: no prueba ausencia total.")
f1('V67', "El formulario de la sección Contáctanos, al final de la portada de audiprop.com, pide nombre, apellido, correo y mensaje, y en la portada, pie incluido, no encontré un enlace a una política de privacidad que diga qué se hace con esos datos.",
   "Solo portada. NO pide telefono (el telefono aparece solo como texto y WhatsApp). El dominio redirige a www.audiprop.com (misma organizacion).", verlo=CHEQUEO)
f1('V89', "El formulario Solicite su hora clínica de la portada de medicinachina.cl pide nombre y teléfono, y en la portada, pie incluido, no encontré un enlace a una política de privacidad de la escuela que diga qué se hace con esos datos.",
   "Solo portada. El reCAPTCHA de Google trae sus propios enlaces: por eso el correo dice 'de la escuela'. El campo de telefono se llama 'email' en el codigo pero a la vista es Telefono: el correo habla de telefono.")
f1('V94', "El formulario de contacto de la portada de trustdoc.cl pide nombre, cargo, organización, correo y teléfono. Bajo el botón dice que los datos se tratarán conforme a la ley, pero en la portada no encontré un enlace a una política de privacidad que explique cómo.",
   "Solo portada. Hay una linea de texto bajo el boton (sin enlace) que cita las leyes 19.628 y 21.719: el correo NO la cita ni califica. Empresa de documentos digitales: puede conocer bien el tema; prioridad baja.")

# ---- orden y tandas de 15 (una por dia habil): personas primero, luego por peso del hallazgo
D.sort(key=lambda d: (d['tipo'] != 'persona', -d['peso'], d['id']))
for i, d in enumerate(D): d['tanda'] = i // 15 + 1
json.dump(D, open(RAIZ + 'borradores/borradores-piloto-vibe.json', 'w'), ensure_ascii=False, indent=1)
json.dump(RESERVA, open(RAIZ + 'borradores/reserva-piloto-vibe.json', 'w'), ensure_ascii=False, indent=1)
print(len(RESERVA), 'en reserva (no se escriben ahora):', [r['id'] for r in RESERVA])
por = {}
for d in D: por[(d['tanda'], d['tipo'], d['oferta'])] = por.get((d['tanda'], d['tipo'], d['oferta']), 0) + 1
print(len(D), 'borradores'); [print(' tanda', k[0], k[1], k[2], v) for k, v in sorted(por.items())]
