# Borradores de PRIMER TOQUE del piloto Vibe (19-oct-2026): contactos nuevos, sin correo previo de SpindleLab.
# VERSION 2 (19-oct, noche): molde aprobado por Ramon, "el dolor primero, y la solucion exacta con nombre".
#   Ramon: "estan un poco tecnicos respecto a tocar lo de las cookies; me centraria en el problema con una mejor explicacion y mas directa en ofrecer la solucion".
#   Reglas de estrategia §7 aplicadas: consecuencia primero en castellano llano; un dato como prueba, no el inventario; cero jerga (ni nombres de cookie, ni 'analitica', ni Clarity);
#   la solucion con nombre (Verifica y Cumple), lo que incluye, el precio y lo que NO incluye (asesoria legal: §1 'se dice, no se esconde'); bajo ~150 palabras.
# Hechos = lo que confirmaron DOS revisores independientes (verificacion-independiente/2026-10-19-piloto-vibe.json). Lo que se nombra son cookies que vieron AMBOS revisores.
# Decisiones aplicadas: precio SIN 'desde' (Ramon, 19-oct); SIN plazo (el material aprobado dice 'no se ofrece plazo'); la baja dice la fuente REAL ('del sitio de ustedes');
# NO se menciona la ley (§4: no se dice que exige, no se cita articulo); nunca se afirma 'Google recibe la visita' ni que el sitio 'no tiene politica' (solo se reviso la portada).
# Variacion (§7 regla 6): el parrafo del dolor rota entre tres redacciones para que no se lea como plantilla; los hechos son los mismos. NO se envia nada.
import json, re, csv, sys
RAIZ = '/home/user/spindlelab/marketing/motor-revision-previa/'
BAJA_SITIO = "Si no quieres que te escriba, dime y no insisto. Saqué tu correo del sitio de ustedes; en verifica.spindlelab.cl/privacidad digo qué datos trato y cómo pedir que deje de hacerlo."
KIT_C1 = "Lo resuelvo con Verifica y Cumple, nuestro kit de privacidad web: un aviso que pregunta antes de activar el seguimiento y la plantilla de política de privacidad, para que la revise tu abogado. Cuesta $149.000 + IVA, una sola vez, y no incluye asesoría legal."
KIT_C1_AVISO = "Lo resuelvo con Verifica y Cumple, nuestro kit de privacidad web: un aviso que pregunta antes de activar el seguimiento. Cuesta $149.000 + IVA, una sola vez."
KIT_F1 = "Lo resuelvo con Verifica y Cumple, nuestro kit de privacidad web: un aviso junto al formulario y la plantilla de política de privacidad, para que la revise tu abogado. Cuesta $149.000 + IVA, una sola vez, y no incluye asesoría legal."
KIT_F1_ESTUDIO = KIT_F1.replace('para que la revise tu abogado', 'para que la revisen en el estudio')
CIERRE = "Si quieres, lo vemos en una llamada de 20 minutos. Si no eres tú quien ve el sitio, ¿con quién lo hablo?"
COMPROBAR_F1 = "Puedes comprobarlo: baja hasta el formulario y busca ese enlace."

ver = {v['id']: v for v in json.load(open(RAIZ + 'verificacion-independiente/2026-10-19-piloto-vibe.json'))}
ent = {r['dominio'].replace('www.', ''): r for r in csv.DictReader(open(RAIZ + 'corridas/2026-10-19-piloto-vibe/entrada.csv', encoding='utf8'))}

# ---- quien es persona de verdad (el extractor llamo 'personal' a cualquier correo que no fuera de una lista de roles)
PERSONA = {'V08': 'dmunoz', 'V109': 'mvial', 'V25': 'nelson', 'V28': 'gromero', 'V64': 'vboetsch'}
SALUDO = {'V25': 'Hola Nelson:'}   # solo cuando el correo trae un nombre de pila; con inicial+apellido no se adivina
# sitios cuyo pie YA enlaza una politica de privacidad (lo dijeron los revisores): no se les ofrece 'la plantilla de politica'
CON_POLITICA = {'V07', 'V31', 'V54', 'V66', 'V70'}

def quienes(cookies):
    """Quien hace el seguimiento, en palabras que un dueño conoce. Devuelve (texto, peso, cantidad_de_cookies)."""
    fam = set()
    for c in cookies:
        if re.match(r'_ga|_gid|_gat|_gcl_|IDE$', c): fam.add('google')
        elif re.match(r'_fbp|_fbc|pys_', c): fam.add('facebook')
        elif re.match(r'_clck|_clsk|_uet', c): fam.add('microsoft')
        elif re.match(r'_hj', c): fam.add('hotjar')
        elif re.match(r'_ttp', c): fam.add('tiktok')
    orden = [('google', 'de Google'), ('facebook', 'de Facebook'), ('microsoft', 'de Microsoft'), ('hotjar', 'de Hotjar'), ('tiktok', 'de TikTok')]
    partes = [t for k, t in orden if k in fam]
    if not partes: return None, 0, 0, False
    # peso: lo que mas se siente (publicidad de Meta / grabacion de sesion) pesa mas que solo Google
    g_ads = any(re.match(r'_gcl_|IDE$', c) for c in cookies)
    peso = ('google' in fam) + g_ads + 2 * ('facebook' in fam) + 2 * ('microsoft' in fam or 'hotjar' in fam) + ('tiktok' in fam)
    txt = partes[0] if len(partes) == 1 else ', '.join(partes[:-1]) + ' y ' + partes[-1]
    solo_ga = fam == {'google'} and not g_ads
    return txt, peso, len(cookies), solo_ga

D = []
RESERVA = []   # confirmados que NO se escriben ahora, con el motivo (criterio de corte de Ramon, 14-oct)
def base(id, **k):
    v = ver[id]; e = ent[v['dominio']]
    d = dict(id=id, dominio=v['dominio'], empresa=e['empresa'], para=e['email'], tipo=('persona' if id in PERSONA else 'rol'), oferta=v['oferta'], ola='Piloto Vibe',
             baja=BAJA_SITIO, fuente_dominio='Vibe Prospecting 19-oct-2026; correo publicado en el sitio')
    d.update(k); return d

# ---- C1: cookies de seguimiento antes de cualquier aviso (nombradas desde las que vieron los DOS revisores)
P1 = [  # el parrafo del dolor, en tres redacciones (mismos hechos)
 "Entré a {dom} como entraría un cliente, sin aceptar nada, y en diez segundos el sitio ya había guardado en mi navegador {ck}. En ningún momento me preguntó si estaba de acuerdo.",
 "Abrí {dom} como lo abriría cualquier visita, sin aceptar nada, y a los diez segundos mi navegador ya tenía {ck}. Nadie me preguntó antes.",
 "Entré a {dom} sin tocar nada y en diez segundos mi navegador ya llevaba {ck}. El sitio no me preguntó si estaba de acuerdo.",
]
P2 = [
 "Ese permiso se pide con un aviso de cookies, y en tu portada no vi ninguno. Puedes comprobarlo: abre tu sitio en una ventana de incógnito y mira si aparece un cuadro para aceptar o rechazar cookies.",
 "Lo normal es pedir ese permiso con un aviso de cookies, y en tu portada no vi ninguno. Puedes comprobarlo: abre tu sitio en una ventana de incógnito y mira si aparece un cuadro para aceptar o rechazar cookies.",
 "Ese permiso se pide con un aviso de cookies y en tu portada no vi ninguno. Para comprobarlo, abre tu sitio en una ventana de incógnito y mira si aparece un cuadro para aceptar o rechazar cookies.",
]
FORM = "Más abajo hay un formulario de contacto, así que quien te escribe ya tiene esas cookies guardadas."
EXTRA_C1 = {'V07': FORM, 'V29': FORM}   # formulario visto por el motor en 2-3 rondas, por un revisor y en la captura r1-B: la consecuencia que el dueño siente (criterio 3 de Ramon)
n_c1 = 0
for id, v in ver.items():
    if v['final'] != 'confirmado' or v['oferta'] != 'C1': continue
    quien, peso, ncook, solo_ga = quienes(v['cookies_medicion_en_ambos'] or [])
    dom = v['dominio']
    if not quien:
        RESERVA.append(dict(id=id, dominio=dom, email=ent[dom]['email'], motivo='Confirmado, pero los dos revisores no coinciden en ninguna cookie de medicion nombrable: remedir')); continue
    if solo_ga:
        # Criterio 3 de Ramon (14-oct): solo Analytics, sin formulario, sin grabacion de sesion y sin publicidad = el correo diria 'cookies' y nada mas.
        extra = {'V58': 'tiene 1 formulario en la portada: candidato a F1, falta verificarlo con dos revisores', 'V74': 'el motor y un revisor vieron Clarity (grabacion de sesion) pero el otro no: remedir antes de escribir'}.get(id, 'sin formulario, sin Pixel de Meta, sin Clarity/Hotjar y sin publicidad: no hay consecuencia que el dueño sienta')
        RESERVA.append(dict(id=id, dominio=dom, email=ent[dom]['email'], motivo='Solo cookies de Google Analytics; ' + extra)); continue
    ck = ('una cookie de seguimiento ' if ncook == 1 else 'cookies de seguimiento ') + quien   # una sola cookie = singular (V54, V21)
    i = n_c1 % 3; n_c1 += 1
    if id == 'V43':
        # Revision independiente: solo la cookie de publicidad se escribe en carga pasiva; las de medicion aparecen tras mover el mouse o hacer scroll.
        p1 = f"Entré a {dom} sin aceptar nada. Al cargar, el sitio guardó en mi navegador una cookie de publicidad de Google y, al navegar un poco, se sumaron otras. Nadie me preguntó si estaba de acuerdo."
        p2 = "Ese permiso se pide con un aviso de cookies, y en tu portada no vi ninguno. Más abajo hay un formulario, y quien lo llena ya lleva esas cookies guardadas. Compruébalo en una ventana de incógnito: mira si aparece un cuadro para aceptar o rechazar cookies."
    else:
        p1 = P1[i].format(dom=dom, ck=ck)
        p2 = P2[i] + (' ' + EXTRA_C1[id] if id in EXTRA_C1 else '')
    kit = KIT_C1_AVISO if id in CON_POLITICA else KIT_C1
    D.append(base(id, asunto='las cookies de ' + dom, peso=peso,
                  cuerpo=[SALUDO.get(id, 'Hola:'), p1, p2, kit, CIERRE],
                  notas=f"Verificado por 2 revisores (19-oct). Cookies nombradas = las de medición que vieron ambos: {', '.join(v['cookies_medicion_en_ambos'])}. Sin aviso visible en ninguna captura (antes y despues del primer gesto). Medido desde IP de nube. Sin Consent Mode bloqueante (gcs=G100) en ninguna peticion. NO se afirma que Google/Meta 'reciban la visita' ni que el sitio 'no tenga politica'."
                        + (" El formulario de la portada lo vieron el motor en 2-3 rondas, un revisor y la captura r1-B." if id in EXTRA_C1 or id == 'V43' else '')
                        + (" ESTE SITIO YA TIENE politica de privacidad en el pie (lo dijeron los revisores): el correo ofrece solo el aviso, no la plantilla de politica." if id in CON_POLITICA else '')
                        + (" V43: solo la cookie de publicidad se escribe en carga pasiva; las de medicion aparecen tras mover el mouse o hacer scroll: el correo lo dice asi." if id == 'V43' else '')))

# ---- F1: formulario que pide correo/telefono y ningun enlace a politica de privacidad en la portada
F1 = {  # id: (parrafo del dolor, como comprobarlo, kit)
 'V06': ("Revisé la portada de cypauditores.cl. El formulario de contacto pide nombre, correo y celular, y quien lo llena no tiene dónde leer qué haces con esos datos: ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad.", None, KIT_F1,
         "Solo portada. El celular es obligatorio. El pie solo tiene Inicio, Nosotros, Servicios y Contacto. Firma de auditoria (no estudio juridico): el precio dice 'tu abogado'."),
 'V111': ("Revisé la portada de molinarios.cl. El formulario de la sección Contáctanos pide nombre y correo, y quien escribe por ahí no tiene dónde leer qué hace el estudio con esos datos: ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad del estudio.", None, KIT_F1_ESTUDIO,
          "Solo portada en español (hay version en ingles sin medir). NO pide telefono. Cuatro rutas tipicas de politica dan 404, pero eso no prueba que no exista otra: el correo dice 'en la portada'. Estudio de abogados: tono sobrio."),
 'V17': ("Revisé la portada de finpartner.cl. El formulario de Diagnóstico gratuito, en la primera pantalla, pide además del correo la facturación y el régimen tributario, y quien lo llena no tiene dónde leer qué haces con esos datos: ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad.", "Puedes comprobarlo: abre la portada y busca ese enlace.", KIT_F1,
         "Solo portada. La portada dice 'Confidencialidad total' y 'Sin spam' junto a los formularios: por eso el correo habla de 'enlace a una politica', no de que no digan nada. El formulario esta en la primera pantalla."),
 'V20': ("Revisé lcconsultores.cl. El formulario de la sección Contacto pide nombre y correo, y opcionalmente teléfono, y quien escribe por ahí no tiene dónde leer qué haces con esos datos: en la página, pie incluido, no encontré un enlace a una política de privacidad.", "Puedes comprobarlo: abre el sitio, entra a la sección Contacto y busca ese enlace.", KIT_F1,
         "Sitio de una sola pagina con desplazamiento horizontal: el formulario esta en el panel Contacto, NO en la primera pantalla. Cuatro rutas tipicas dan 404 y no hay sitemap (no prueba ausencia total)."),
 'V28': ("Revisé la portada de ulloaycia.cl. El formulario de la sección Escríbenos pide nombre y correo, y quien te escribe por ahí no tiene dónde leer qué haces con sus datos: ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad.", None, KIT_F1,
         "Solo portada. NO pide telefono. Correo de persona (inicial+apellido): saludo sin nombre."),
 'V30': ("Revisé la portada de sbsolutions.cl. El formulario de la sección Contacto pide nombre, correo y consulta, y quien escribe por ahí no tiene dónde leer qué haces con esos datos: ni junto al formulario ni en el pie encontré un enlace a una política de privacidad.", None, KIT_F1,
         "Solo portada. NO pide telefono (aparece solo como dato de contacto)."),
 'V37': ("Revisé la portada de bgconsultoria.cl. El formulario «¿Tienes alguna consulta?» pide nombre, teléfono y correo, y quien escribe por ahí no tiene dónde leer qué haces con esos datos: ni en el menú ni en el pie encontré un enlace a una política de privacidad.", None, KIT_F1,
         "Solo portada y /servicios/. El correo publicado en el sitio es una direccion gmail (bgconsultorempresas@gmail.com): es el contacto que el propio sitio muestra, pero es un buzon de gmail; Ramon decide si se escribe."),
 'V57': ("Revisé la portada de reb-chile.cl. El formulario «Vende con nosotros», al final de la página, pide nombre, correo y teléfono, y quien lo llena no tiene dónde leer qué hace REB con esos datos: ni junto al formulario ni en el pie encontré un enlace a una política de privacidad de REB.", None, KIT_F1,
         "Solo portada. El formulario esta cerca del final de la pagina (no en la primera pantalla). La insignia de reCAPTCHA de Google trae sus propios enlaces: por eso el correo dice 'de REB'. El correo publicado es reb@ (siglas de la empresa): buzon de rol."),
 'V65': ("Revisé la portada de remax-start.cl. El formulario Escríbenos, al final de la página, pide nombre, correo y teléfono, y quien escribe por ahí no tiene dónde leer qué haces con esos datos: ni cerca del formulario ni en el pie encontré un enlace a una política de privacidad.", None, KIT_F1,
         "Solo portada, sitio de una pagina con anclas. El formulario esta al final (fuera de la primera pantalla). Cuatro rutas tipicas dan 404: no prueba ausencia total."),
 'V67': ("Revisé la portada de audiprop.com. El formulario de la sección Contáctanos, al final de la página, pide nombre, apellido y correo, y quien escribe por ahí no tiene dónde leer qué haces con esos datos: ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad.", None, KIT_F1,
         "Solo portada. NO pide telefono (el telefono aparece solo como texto y WhatsApp). El dominio redirige a www.audiprop.com (misma organizacion)."),
 'V89': ("Revisé la portada de medicinachina.cl. El formulario para pedir hora clínica pide nombre y teléfono, y ni junto al formulario, ni en el menú, ni en el pie encontré un enlace a una política de privacidad de la escuela que diga qué se hace con esos datos.", None, KIT_F1,
         "Solo portada. El reCAPTCHA de Google trae sus propios enlaces: por eso el correo dice 'de la escuela'. El formulario ya dice 'lo llamaremos para agendar': por eso este NO afirma 'no tiene donde leer', solo la ausencia del enlace. El campo de telefono se llama 'email' en el codigo pero a la vista es Telefono."),
 'V94': ("Revisé la portada de trustdoc.cl. El formulario de contacto pide nombre, cargo, organización y correo, y teléfono si quiere. Bajo el botón dice que los datos se tratarán conforme a la ley, pero ni junto a ese texto, ni en el menú, ni en el pie encontré un enlace a una política de privacidad que explique cómo.", None, KIT_F1,
         "Solo portada. Hay una linea de texto bajo el boton (sin enlace) que cita las leyes 19.628 y 21.719: el correo NO la cita ni califica. Empresa de documentos digitales: afirma cumplir la ley pero no enlaza politica; Ramon decide si se escribe y cuando."),
}
for id, (p1, comprobar, kit, notas) in F1.items():
    dom = ver[id]['dominio']
    D.append(base(id, asunto='el formulario de ' + dom, peso=2,
                  cuerpo=[SALUDO.get(id, 'Hola:'), p1, comprobar or COMPROBAR_F1, kit, CIERRE], notas='Verificado por 2 revisores (19-oct). ' + notas))

# ---- orden y tandas de 15 (una por dia habil): personas primero, luego por peso del hallazgo
D.sort(key=lambda d: (d['tipo'] != 'persona', -d['peso'], d['id']))
for i, d in enumerate(D): d['tanda'] = i // 15 + 1
json.dump(D, open(RAIZ + 'borradores/borradores-piloto-vibe.json', 'w'), ensure_ascii=False, indent=1)
json.dump(RESERVA, open(RAIZ + 'borradores/reserva-piloto-vibe.json', 'w'), ensure_ascii=False, indent=1)
print(len(RESERVA), 'en reserva (no se escriben ahora):', [r['id'] for r in RESERVA])
por = {}
for d in D: por[(d['tanda'], d['tipo'], d['oferta'])] = por.get((d['tanda'], d['tipo'], d['oferta']), 0) + 1
print(len(D), 'borradores'); [print(' tanda', k[0], k[1], k[2], v) for k, v in sorted(por.items())]
