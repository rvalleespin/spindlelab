# armar-protos.py — prototipos del tablero E10 (Lucía, 16-oct-2026)
#
# Dos direcciones ancladas en The Ready (lock: e10/lock-the-ready.md), sobre el HTML CONSTRUIDO de
# verdad (spindlelab-astro/dist, `npm run build`), igual que E9 (base: e9-interiores/herramientas/
# armar-protos.py). Se cambia SOLO estilo y composición: los bloques se cortan del build con su
# marcado y se reordenan; no se escribe ni se borra una palabra del texto visible.
#
# Lo único que se agrega a la página:
#   · el rótulo de cada espacio de foto por generar («Foto por generar · F<n> · …», data-rotulo-foto);
#   · la cinta (aria-hidden, data-cinta): repite palabras que ya están publicadas (lista CINTAS abajo,
#     con su página de origen), y su botón de pausa (sin texto visible, aria-label «Pausar cinta»);
#   · el marcador amarillo (un <span class="mk"> alrededor de palabras que ya estaban);
#   · clases sobre etiquetas que ya estaban: el sello (un rótulo que ya existía), la marca de revisión (un
#     ::after decorativo, sin elemento) y las piezas de lectura de E9 re-rendidas en la paleta E10
#     (e9/piezas/salida-e10/, sin figcaption).
# Se quitan los scripts (gtag, Pixel, Lenis, menú, chequeo, aviso de cookies): el chequeo queda inerte.
# herramientas/texto-igual.mjs comprueba que el texto visible es el del build Y que el orden de lectura es el
# mismo (ronda 1 de QA, defecto 4): los bloques no se reordenan; la composición se hace con CSS.
#
# Ronda 1 de QA (acta-paso-2.md), lo que cambió acá:
#   · defecto 4: el hero vuelve al orden del sitio en las dos direcciones (instrumento → titular → fila de obras,
#     spec §0.4); la fila de obras vuelve al hero en Taller; el retrato de Acompañamiento va después de la lista
#     de «Lo que incluye», donde estaba la galería en el build.
#   · defecto 6: fuera el óvalo, los garabatos de The Ready (ovillo, rulos, lazo) y la mancha naranja; entran el
#     botón y el chequeo propios, las marcas de revisión (marcas.mjs) y el sello (lock §10b).
#   · defecto 5: Pizarra limpia separa los servicios en dos puertas de entrada y dos que siguen, y lleva el
#     resaltador en hasta cuatro frases por página (uno a la vista), en vez de uno.
#
# Ronda 2 de QA (acta-paso-2.md), lo que cambió acá:
#   · defecto 2: la regla de escala del lock §13 en todos los anchos. escala() le pone a cada titular su --palabra (la
#     palabra más larga en em, de img/palabras.json, × 1,01); el CSS hace min(escalón, caja ÷ palabra). Los titulares que
#     se ven juntos (SERIES) llevan la de la más larga del grupo. En el hero la unidad es la línea (UNIDAD_HERO).
#     Si cambia un texto, se corre antes herramientas/palabras.mjs (con proto/ servido) y después este script.
#   · defectos 3 y 8: el marcador de la entrada de Trabajo va al final de la frase («cuál es cuál en cada una.»).
#
# Una imagen cambia: en Trabajo, «Bernardo Combeau | Model» pasa de mock-combeau-modelo-alto-2.jpg
# (cuenta como oro: 0,059 %, la palmera; e9/piezas/manifiesto.json) a mock-combeau-modelo-ancho.jpg
# (0,0095 %, limpio), porque la vista lleva el punto dorado en el pie. Su alt es el que ya usa la home.
#
# Uso: python3 -I herramientas/armar-protos.py   (desde tableros/e10-direcciones/)
#      y servir proto/ con: python3 -m http.server 8770 --directory proto
import html as htmlmod, json, os, re, shutil

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.abspath(os.path.join(AQUI, '../../../../../..'))
DIST = os.path.join(REPO, 'spindlelab-astro/dist')
PUBLICO = os.path.join(REPO, 'spindlelab-astro/public')
PIEZAS = os.path.join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e9/piezas/salida-e10')
PROTO = os.path.join(AQUI, 'proto')

DIRS = {'taller': 'Taller', 'pizarra': 'Pizarra limpia'}

# ------------------------------------------------------------------ regla de escala (lock §13)
PALABRAS_JSON = os.path.join(AQUI, 'img/palabras.json')
EM = json.load(open(PALABRAS_JSON, encoding='utf-8'))['em'] if os.path.exists(PALABRAS_JSON) else None
MARGEN = 1.01
# Titulares que se ven juntos: van al mismo tamaño, el de la palabra más larga del grupo (con su caja, que es la misma).
SERIES = [
    ('Desarrollo', 'Visibilidad'),                      # las dos puertas de Pizarra (en Taller la serie de 4 va en taller.css)
    ('Continuidad', 'Alcance'),                         # el par de Taller y el de Pizarra
    ('Esencial', 'Pro', 'A medida'),                    # los tres planes, lado a lado
    ('Bernardo Combeau', 'Bernardo Combeau | Model', 'Verifica y Cumple', 'Raigal'),  # las cuatro obras (Pizarra: misma columna)
]
# El hero: la composición no deja partir «Ahí se corta»; en Taller la segunda línea entra con sangría de 1,15em.
UNIDAD_HERO = {'taller': lambda E: max(E['Ahí se corta'], 1.15 + E['el circuito']),
               'pizarra': lambda E: max(E['Ahí se corta'], E['el circuito'])}
DISPLAY = re.compile(r'<(h1|h2|h3|p|span)\b[^>]*\bclass="(?:[^"]*\s)?(?:d-display|d-h1|d-h2|d-h3|d-guia|d-fase__n)(?:\s[^"]*)?"[^>]*>')


def texto_de(el):
    el = re.sub(r'<span class="d-sr">.*?</span>', ' ', el, flags=re.S)
    return re.sub(r'\s+', ' ', htmlmod.unescape(re.sub(r'<br\s*/?>', ' ', re.sub(r'<(?!br)[^>]+>', '', el)))).strip()


def palabra_de(texto, direccion):
    if EM is None:
        raise SystemExit('falta img/palabras.json: sirve proto/ y corre node herramientas/palabras.mjs, después este script')
    faltan = [w for w in texto.split() if w not in EM]
    if faltan:
        raise SystemExit(f'img/palabras.json no tiene {faltan}: corre node herramientas/palabras.mjs y vuelve a armar')
    if texto.startswith('Ahí se corta'):
        return UNIDAD_HERO[direccion](EM)
    for serie in SERIES:
        if texto in serie:
            return max(EM[w] for t in serie for w in t.split())
    return max(EM[w] for w in texto.split())


def escala(h, direccion):
    """Le pone a cada titular en letra display su --palabra (lock §13). No cambia el texto."""
    out, pos = [], 0
    for m in DISPLAY.finditer(h):
        if m.start() < pos:
            continue
        el = balanceado(h, m.start(), m.group(1))
        t = texto_de(el)
        if not t:
            continue
        v = f'--palabra:{palabra_de(t, direccion) * MARGEN:.3f}'
        abre = m.group(0)
        nuevo = (abre.replace(' style="', f' style="{v};', 1) if ' style="' in abre else abre[:-1] + f' style="{v}">')
        out.append(h[pos:m.start()] + nuevo)
        pos = m.end()
    return ''.join(out) + h[pos:]


def leer(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def escribir(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)


def balanceado(s, inicio, tag='div'):
    nivel = 0
    for m in re.finditer(rf'<(/?){tag}\b[^>]*>', s[inicio:]):
        nivel += -1 if m.group(1) else 1
        if nivel == 0:
            return s[inicio:inicio + m.end()]
    raise SystemExit(f'<{tag}> sin cerrar')


def elemento(s, patron, tag='div'):
    m = list(re.finditer(patron, s))
    if len(m) != 1:
        raise SystemExit(f'{patron}: {len(m)} coincidencias (se esperaba 1)')
    return balanceado(s, m[0].start(), tag)


def todos(s, patron, tag):
    return [balanceado(s, m.start(), tag) for m in re.finditer(patron, s)]


def cambiar(s, viejo, nuevo, nombre=''):
    """Reemplaza `viejo` por `nuevo` exigiendo exactamente una coincidencia."""
    n = s.count(viejo)
    if n != 1:
        raise SystemExit(f'«{nombre or viejo[:60]}»: {n} coincidencias (se esperaba 1)')
    return s.replace(viejo, nuevo)


def clase(s, viejo_attr, extra):
    """Agrega clases a la PRIMERA etiqueta que tiene class="viejo_attr" (sin tocar el texto)."""
    return cambiar(s, f'class="{viejo_attr}"', f'class="{viejo_attr} {extra}"', viejo_attr)


def mk(s, frase, variante=''):
    """El marcador: envuelve palabras que ya están en la página. No cambia el texto."""
    v = f' mk--{variante}' if variante else ''
    return cambiar(s, frase, f'<span class="mk{v}">{frase}</span>', 'marcador: ' + frase)


def cuerpo(html):
    html = re.sub(r' data-astro-cid-\w+', '', html)
    return html, re.search(r'<main[^>]*>(.*?)</main>', html, flags=re.S).group(1)


# ------------------------------------------------------------------ espacios de foto
FOTOS = {}  # id -> descripción corta (la misma en las dos direcciones si es la misma foto)


def slot(fid, que, r, r_cel=None, clase_extra=''):
    """Espacio de foto por generar: tamaño y proporción exactos, cruz de plano y rótulo visible."""
    FOTOS.setdefault(fid, que)
    if FOTOS[fid] != que:
        raise SystemExit(f'{fid} con dos descripciones')
    rc = f';--r-cel:{r_cel}' if r_cel else ''
    return (f'<figure class="foto-slot {clase_extra}" style="--r:{r}{rc}" data-foto="{fid}">'
            f'<figcaption class="foto-slot__rot" data-rotulo-foto>Foto por generar · {fid} · {que}</figcaption></figure>')


# ------------------------------------------------------------------ la cinta (lock §4 y §14)
PAUSA = ('<button class="cinta__pausa" type="button" aria-pressed="false" aria-label="Pausar cinta">'
         '<svg class="ico-pausa" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor"/></svg>'
         '<svg class="ico-mover" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg></button>')

# Texto de cada cinta: palabras ya publicadas, con su origen (lo comprueba texto-igual.mjs).
CINTAS = {
    'taller-home': {'origen': 'v3/index.html', 'items': ['Desarrollo', 'Visibilidad', 'Continuidad', 'Alcance']},
    'taller-acompanamiento': {'origen': 'v3/servicios/acompanamiento-mensual/index.html',
                              'items': ['Priorizar y ejecutar', 'Primer informe', 'Contenido y ajustes', 'Cierre y decisiones']},
    'pizarra-home': {'origen': 'v3/blog/21-chequeos-visibilidad-ia/index.html', 'items': [
        'Los índices de búsqueda de IA pueden entrar', 'Los asistentes de IA pueden visitarte en vivo',
        'El servidor no expulsa a los robots de IA', 'Robots de entrenamiento: decisión consciente',
        'El sitio responde por HTTPS', 'Tienes datos estructurados', 'Tu negocio está declarado como entidad',
        'Tu entidad tiene dirección y contacto', 'Te conectas con al menos 3 perfiles externos',
        'Hay una persona con credenciales detrás', 'El título dice qué haces y dónde', 'Tienes meta description útil',
        'Hay un solo H1', 'Tienes llms.txt', 'Tienes preguntas frecuentes marcadas', 'Tienes sitemap.xml',
        'Declaras la URL canónica', 'Declaras el idioma', 'Respondes preguntas en tus títulos',
        'Tu contenido tiene fecha', 'Tu portada tiene contenido suficiente']},
}


def cinta(clave, clase_extra=''):
    c = CINTAS[clave]
    grupo = ''.join(f'<span>{t}</span><span class="cinta__sep">·</span>' for t in c['items'])
    return (f'<div class="cinta-caja {clase_extra}" data-cinta-caja data-cinta="{clave}">'
            f'<div class="cinta" aria-hidden="true"><div class="cinta__pista"><div class="cinta__grupo">{grupo}</div></div></div>'
            f'{PAUSA}</div>')


def lectura(archivo, w, h, alt, clase_extra=''):
    return (f'<figure class="pieza-lectura {clase_extra}" style="--r:{w / h:.4f}">'
            f'<img src="/assets/img/e10/{archivo}" alt="{alt}" width="{w}" height="{h}" loading="eager" decoding="sync"></figure>')


L2 = ('l2-respuesta-robots-spindlelab.jpg', 1600, 1360,
      'La portada de spindlelab.cl pedida con el user-agent de GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot y Chrome: las cinco respondieron 200, el 14 de octubre de 2026')
L4 = ('l4-21-chequeos.jpg', 1600, 1013,
      'Los 21 chequeos del chequeo gratis con su peso, en tres bloques: ¿Te pueden leer? 30, ¿Te entienden? 40 y ¿Te pueden citar? 30')
V1 = ('v1-ley-36-73-100.jpg', 1600, 800,
      'spindlelab.cl en el chequeo de la Ley 21.719: 36 el 9 de septiembre, 73 el 21 de septiembre y 100 el 14 de octubre, ya con otra forma de puntuar')


# ------------------------------------------------------------------ la página
def pagina(html, nuevo_main, direccion, nombre):
    h = re.sub(r'<main[^>]*>.*?</main>', lambda _: '<main>' + nuevo_main + '</main>', html, count=1, flags=re.S)
    h = re.sub(r'<script\b(?![^>]*application/ld\+json)[^>]*>.*?</script>', '', h, flags=re.S)
    h = re.sub(r'<link rel="(preload|stylesheet|icon|apple-touch-icon)"[^>]*>', '', h)
    banner = re.search(r'<div id="cookie-banner"', h)
    if banner:
        h = h.replace(balanceado(h, banner.start()), '')
    h = re.sub(r'<noscript>.*?</noscript>', '', h, flags=re.S)
    # El punto del pie gigante: el único oro de la vista, sobre ciruela (lock §12, opción A).
    h = cambiar(h, '<p class="d-gigante" aria-hidden="true">SpindleLab.</p>',
                '<p class="d-gigante" aria-hidden="true">SpindleLab<span class="oro">.</span></p>', 'pie gigante')
    h = escala(h, direccion)
    css = (f'<link rel="stylesheet" href="/e10/base.css?v=5">'
           f'<link rel="stylesheet" href="/e10/{direccion}.css?v=5">'
           f'<script src="/e10/e10.js?v=5" defer></script>')
    h = h.replace('</head>', css + '</head>', 1)
    h = re.sub(r'<html([^>]*)>', lambda m: f'<html{m.group(1)} data-dir="{direccion}" data-pagina="{nombre}">', h, count=1)
    h = h.replace('<head>', f'<head>\n<!-- Prototipo E10 · dirección {DIRS[direccion]} · tablero de la compuerta 2. Base: dist/ del build. No es el sitio. -->', 1)
    if 'assets/img/d/' in h:
        raise SystemExit(f'{direccion}/{nombre}: quedó una foto de assets/img/d/')
    escribir(os.path.join(PROTO, direccion, f'{nombre}.html'), h)


# ------------------------------------------------------------------ home
def home():
    html, main = cuerpo(leer(os.path.join(DIST, 'v3/index.html')))
    instr = elemento(main, r'<div class="d-instr"')
    titular = elemento(main, r'<div class="d-titular"')
    filahero = elemento(main, r'<div class="d-fila d-fila--hero"')
    piezas_hero = todos(filahero, r'<figure class="d-pieza"', 'figure')
    pres = elemento(main, r'<section class="d-pres"', 'section')
    campos = {re.search(r'aria-labelledby="t-(\w+)"', s).group(1): s for s in todos(main, r'<section class="d-campo ', 'section')}
    quien = elemento(main, r'<section class="d-quien', 'section')
    indice = elemento(main, r'<section class="d-indice', 'section')
    assert len(piezas_hero) == 4 and list(campos) == ['desarrollo', 'visibilidad', 'continuidad', 'alcance']

    def cab(k):
        # «Escríbenos» de cada servicio pasa a ser el botón secundario (en línea): solo cambia la clase.
        return elemento(campos[k], r'<div class="d-campo__cab"').replace('<a class="d-btn" href="/v3/contacto/">', '<a class="d-btn d-btn--alt" href="/v3/contacto/">')

    def fila(k):
        return elemento(campos[k], r'<div class="d-fila d-fila--2"')

    def seccion(k, cls, interior):
        abre = re.match(r'<section[^>]*>', campos[k]).group(0)
        abre = re.sub(r'class="[^"]*"', f'class="d-campo {cls}"', abre, count=1)
        return f'{abre}{interior}</section>'

    tit = mk(titular, 'se corta')
    region = re.match(r'<div class="d-fila d-fila--hero"[^>]*>', filahero).group(0)

    # ── TALLER: The Ready a fondo, con lo propio de SpindleLab (lock §10b)
    # El hero en el orden del sitio (spec §0.4, decisión de Ramón): instrumento → titular → fila de obras.
    t_instr = clase(instr, 'd-rot', 'sello')
    t_instr = clase(t_instr, 'd-instr', 't-instr con-marca')
    t_fila = region.replace('class="d-fila d-fila--hero"', 'class="t-fila"') + ''.join(piezas_hero) + '</div>'
    t_hero = f'<section class="d-hero t-hero" aria-labelledby="h1">{t_instr}{tit}{t_fila}</section>'
    # «Qué hacemos»: la frase grande con el resaltador en la consecuencia, y la foto de gente (F1) a sangre derecha:
    # «tu sitio está escrito para personas».
    t_pres = mk(pres, 'la consulta que pagaste termina en otra parte.').replace('class="d-pres"', 'class="d-pres t-pres"', 1)
    t_pres = cambiar(t_pres, 'class="d-btn"', 'class="d-btn d-btn--alt"')
    t_pres = t_pres[:-len('</section>')] + slot('F1', 'gente de pie en una mesa con hojas y notas', '0.58', '0.8', 't-pres__foto') + '</section>'
    t_des = seccion('desarrollo', 't-campo t-campo--desarrollo', cab('desarrollo') + fila('desarrollo').replace('d-fila d-fila--2', 'd-fila t-obra-par', 1))
    t_vis = seccion('visibilidad', 't-campo t-banda-amarilla t-campo--visibilidad',
                    mk(cab('visibilidad'), 'puedan citarte cuando preguntan por tu rubro.', 'papel')
                    + slot('F2', 'alguien responde a un cliente en el mesón', '0.8', None, 't-campo__foto'))
    t_con = seccion('continuidad', 't-campo t-campo--media', slot('F3', 'notas en una planilla de cuatro columnas', '1.3333', None, 't-campo__foto') + cab('continuidad'))
    t_alc = seccion('alcance', 't-campo t-campo--media', slot('F4', 'un mensaje que llega al taller', '1.5', None, 't-campo__foto') + cab('alcance'))
    t_quien = mk(quien, 'Te muestro.').replace('class="d-quien d-tapa"', 'class="d-quien t-quien"', 1)
    t_quien = cambiar(t_quien, 'class="d-btn"', 'class="d-btn d-btn--alt"')
    t_main = ''.join([t_hero, cinta('taller-home'), t_pres, t_des, t_vis,
                      f'<div class="t-par">{t_con}{t_alc}</div>', t_quien,
                      indice.replace('class="d-indice d-tapa"', 'class="d-indice t-indice"', 1)])
    pagina(html, t_main, 'taller', 'home')

    # ── PIZARRA LIMPIA: la letra y el color de The Ready sobre el aire de Gehl
    # El hero en el orden del sitio: la ficha del chequeo (rótulo | campo) primero, después el titular.
    p_instr = cambiar(instr, '<p class="d-rot">', '<p class="d-rot p-rotulo">')
    p_hero = f'<section class="d-hero p-hero" aria-labelledby="h1"><div class="p-ficha">{p_instr}</div>{tit}</section>'
    p_ent = region.replace('class="d-fila d-fila--hero"', 'class="p-entregado"') + ''.join(piezas_hero) + '</div>'
    p_pres = mk(pres, 'la consulta que pagaste termina en otra parte.').replace('class="d-pres"', 'class="d-pres p-pres"', 1)
    p_pres = cambiar(p_pres, 'class="d-btn"', 'class="d-btn d-btn--alt"')
    p_sangre = slot('F5', 'una mesa larga junto a la ventana, con la cordillera', '2.3333', '0.8', 'p-sangre')
    # Los servicios dejan de pesar lo mismo (ronda 1, defecto 5): Desarrollo y Visibilidad son las dos puertas de
    # entrada («tu sitio te frena» / «tu sitio existe»), a escala de titular; Continuidad y Alcance son lo que
    # sigue, en un par compacto. Mismo orden del build.
    p_des = seccion('desarrollo', 'p-campo p-puerta', cab('desarrollo') + fila('desarrollo').replace('d-fila d-fila--2', 'd-fila p-obra-par', 1))
    p_vis = seccion('visibilidad', 'p-campo p-puerta', mk(cab('visibilidad'), 'puedan citarte cuando preguntan por tu rubro.'))
    p_sig = ''.join(seccion(k, 'p-campo p-sigue', cab(k)) for k in ('continuidad', 'alcance'))
    p_serv = f'<div class="p-servicios">{p_des}{p_vis}<div class="p-siguen">{p_sig}</div></div>'
    p_quien = mk(quien, 'Te muestro.').replace('class="d-quien d-tapa"', 'class="d-quien p-quien"', 1)
    p_quien = cambiar(p_quien, 'class="d-btn"', 'class="d-btn d-btn--alt"')
    p_main = ''.join([p_hero, p_ent, cinta('pizarra-home'), p_pres, p_sangre, p_serv, p_quien,
                      indice.replace('class="d-indice d-tapa"', 'class="d-indice p-indice"', 1)])
    pagina(html, p_main, 'pizarra', 'home')


# ------------------------------------------------------------------ Acompañamiento mensual
def acompanamiento():
    html, main = cuerpo(leer(os.path.join(DIST, 'v3/servicios/acompanamiento-mensual/index.html')))
    cab = elemento(main, r'<header class="d-cab"', 'header')
    entrada = elemento(main, r'<div class="d-entrada"')
    sec = {re.search(r'aria-labelledby="(s-\w+)"', s).group(1): s for s in todos(main, r'<section class="d-sec', 'section')}
    galeria = elemento(main, r'<div class="d-galeria d-galeria--svc"')
    retrato = todos(galeria, r'<figure class="d-pieza d-g-alta"', 'figure')[0]
    sig = elemento(main, r'<a class="d-siguiente"', 'a')
    assert list(sec) == ['s-inc', 's-pla', 's-blo', 's-faq', 's-cie']
    comp = re.search(r'<p class="d-cuerpo">En el Esencial y en el Pro nos comprometemos.*?</p>', sec['s-pla'], flags=re.S).group(0)
    planes_sin = cambiar(sec['s-pla'], comp, '')

    def con_comp(banda_cls, extra=''):
        p = mk(comp, 'lo compruebas tú.', 'papel' if 'amarilla' in banda_cls else '')
        return planes_sin.replace('</section>', f'<div class="{banda_cls}">{p}{extra}</div></section>')

    # El retrato va en «Lo que incluye», DESPUÉS de la lista: en el build la galería con el retrato viene justo después
    # de esa sección, así que el orden de lectura no cambia (ronda 1, defecto 4). Cada dirección lo pone con CSS bajo
    # el titular. Va solo: una foto generada con gente al lado de Ramón se leería como su equipo (regla nueva, §07b).
    inc = cambiar(sec['s-inc'], '</section>', retrato + '</section>', 'cierre de Lo que incluye')

    # ── TALLER
    t_cab = cab.replace('class="d-cab"', 'class="d-cab t-cab"', 1)
    t_ent = (f'<div class="t-entrada">{mk(entrada, "lo hace y lo sostiene.")}'
             + slot('F6', 'dos personas comparan hojas pegadas en la pared', '1.5', None, 't-entrada__foto') + '</div>')
    # La marca de revisión «comprobado» (un visto a mano) va sobre la prueba de los robots que responden 200.
    t_pla = con_comp('t-banda-amarilla t-comp', lectura(*L2, 't-comp__pieza con-marca'))
    t_main = ''.join([t_cab, t_ent, inc.replace('class="d-sec"', 'class="d-sec t-lista"', 1), t_pla,
                      cinta('taller-acompanamiento'), sec['s-blo'].replace('class="d-sec"', 'class="d-sec t-mes"', 1),
                      sec['s-faq'], sec['s-cie'], sig])
    pagina(html, t_main, 'taller', 'acompanamiento-mensual')

    # ── PIZARRA LIMPIA
    p_cab = cab.replace('class="d-cab"', 'class="d-cab p-cab"', 1)
    p_sangre = slot('F7', 'la mesa de una sala chica, después de la reunión', '2.3333', '0.8', 'p-sangre')
    p_pla = con_comp('p-comp', lectura(*L4, 'p-comp__pieza'))
    p_ent = mk(entrada, 'lo hace y lo sostiene.').replace('class="d-entrada"', 'class="d-entrada p-entrada"', 1)
    p_main = ''.join([p_cab, p_sangre, p_ent, inc.replace('class="d-sec"', 'class="d-sec p-lista"', 1), p_pla,
                      sec['s-blo'].replace('class="d-sec"', 'class="d-sec p-mes"', 1), sec['s-faq'], sec['s-cie'], sig])
    pagina(html, p_main, 'pizarra', 'acompanamiento-mensual')


# ------------------------------------------------------------------ Trabajo
MODELO_ALTO = ('<img src="/assets/img/obra/mock-combeau-modelo-alto-2.jpg" srcset="/assets/img/obra/mock-combeau-modelo-alto-2-800.jpg 800w, '
               '/assets/img/obra/mock-combeau-modelo-alto-2.jpg 1000w"')


def trabajo():
    html, main = cuerpo(leer(os.path.join(DIST, 'v3/trabajo/index.html')))
    cab = elemento(main, r'<header class="d-cab d-cab--trab"', 'header')
    entrada = elemento(main, r'<div class="d-entrada d-entrada-trab"')
    obras = elemento(main, r'<div class="d-obras-trab"')
    arts = {re.search(r'aria-labelledby="o-([\w-]+)"', a).group(1): a for a in todos(obras, r'<article class="d-obra-trab', 'article')}
    cierre = elemento(main, r'<section class="d-sec d-sec--quieta"', 'section')
    sig = elemento(main, r'<a class="d-siguiente"', 'a')
    assert list(arts) == ['combeau-fotografia', 'combeau-modelo', 'verifica-y-cumple', 'raigal']

    # Combeau | Model: la imagen sin oro (ver la cabecera)
    m = re.search(r'<img src="/assets/img/obra/mock-combeau-modelo-alto-2\.jpg"[^>]*>', arts['combeau-modelo'])
    if not m:
        raise SystemExit('no encontré la imagen de Combeau | Model')
    img_ancho = ('<img src="/assets/img/obra/mock-combeau-modelo-ancho.jpg" srcset="/assets/img/obra/mock-combeau-modelo-ancho-800.jpg 800w, '
                 '/assets/img/obra/mock-combeau-modelo-ancho.jpg 1600w" sizes="(max-width: 767px) 100vw, 60vw" '
                 'alt="El book de modelo de Bernardo Combeau abierto en un notebook y en un teléfono" width="1600" height="1200" loading="eager" decoding="async">')
    arts['combeau-modelo'] = arts['combeau-modelo'].replace(m.group(0), img_ancho)
    abre = re.match(r'<div class="d-obras-trab"[^>]*>', obras).group(0)

    def con_pieza(art, pieza):
        """La pieza 36 → 73 → 100 dentro del texto de Verifica y Cumple, antes del enlace."""
        return cambiar(art, '<a class="d-btn d-btn--alt d-pie-trab__enlace" href="https://verifica.spindlelab.cl/"',
                       pieza + '<a class="d-btn d-btn--alt d-pie-trab__enlace" href="https://verifica.spindlelab.cl/"', 'enlace de Verifica')

    # ── TALLER
    t_cab = cab.replace('class="d-cab d-cab--trab"', 'class="d-cab d-cab--trab t-cab"', 1)
    # Portada en papel (la lima era el rol de The Ready para sus casos; vuelve solo si Ramón elige sus colores).
    # El marcador al final de la frase, en la consecuencia (lock §13; ronda 2, defectos 3 y 8): «cuál es cuál en cada una.»
    t_portada = f'<div class="t-portada">{t_cab}' + mk(entrada, 'cuál es cuál en cada una.') + '</div>'
    # «Pieza de concepto · no es un cliente» va en el sello: lo que se estampa es justo la aclaración.
    t_arts = [mk(arts['combeau-fotografia'], 'el sitio se arma solo.').replace('d-obra-trab--ancha', 'd-obra-trab--ancha t-obra t-obra--1', 1),
              arts['combeau-modelo'].replace('d-obra-trab--alta', 'd-obra-trab--alta t-obra t-obra--2', 1),
              con_pieza(arts['verifica-y-cumple'], lectura(*V1, 't-v1')).replace('d-obra-trab--media', 'd-obra-trab--media t-obra t-obra--3', 1),
              arts['raigal'].replace('d-obra-trab--final', 'd-obra-trab--final t-obra t-obra--4', 1).replace('class="d-etq--concepto"', 'class="d-etq--concepto sello"', 1)]
    t_obras = abre.replace('class="d-obras-trab"', 'class="d-obras-trab t-obras"') + ''.join(t_arts) + '</div>'
    t_cie = mk(cierre, 'qué ve la IA en tu sitio.', 'papel').replace('class="d-sec d-sec--quieta"', 'class="d-sec d-sec--quieta t-banda-amarilla t-cierre"', 1)
    # La marca de revisión «haz esto» (un anillo a mano) rodea el botón del chequeo.
    t_cie = cambiar(t_cie, '<a class="d-btn" href="/v3/diagnostico/">', '<a class="d-btn con-marca t-anillo" href="/v3/diagnostico/">')
    t_cie = t_cie.replace('</section>', slot('F8', 'bocetos de páginas hechos a mano en papel', '1.3333', None, 't-cierre__foto') + '</section>')
    pagina(html, ''.join([t_portada, t_obras, t_cie, sig]), 'taller', 'trabajo')

    # ── PIZARRA LIMPIA
    p_arts = [arts['combeau-fotografia'], arts['combeau-modelo'], con_pieza(arts['verifica-y-cumple'], lectura(*V1, 'p-v1')), arts['raigal']]
    p_obras = abre.replace('class="d-obras-trab"', 'class="d-obras-trab p-obras"') + ''.join(a.replace('class="d-obra-trab ', 'class="d-obra-trab p-obra ', 1) for a in p_arts) + '</div>'
    p_cie = mk(cierre, 'qué ve la IA en tu sitio.').replace('class="d-sec d-sec--quieta"', 'class="d-sec d-sec--quieta p-cierre"', 1)
    p_cie = p_cie.replace('</section>', slot('F8', 'bocetos de páginas hechos a mano en papel', '1.3333', None, 'p-cierre__foto') + '</section>')
    pagina(html, ''.join([cab.replace('class="d-cab d-cab--trab"', 'class="d-cab d-cab--trab p-cab"', 1),
                          mk(entrada, 'cuál es cuál en cada una.').replace('d-entrada-trab', 'd-entrada-trab p-entrada', 1), p_obras, p_cie, sig]), 'pizarra', 'trabajo')


# ------------------------------------------------------------------ activos
def copiar_activos():
    destino = os.path.join(PROTO, 'assets/img')
    os.makedirs(os.path.join(destino, 'obra'), exist_ok=True)
    os.makedirs(os.path.join(destino, 'e10'), exist_ok=True)
    for f in os.listdir(os.path.join(PUBLICO, 'assets/img/obra')):
        shutil.copy2(os.path.join(PUBLICO, 'assets/img/obra', f), os.path.join(destino, 'obra', f))
    shutil.copy2(os.path.join(PUBLICO, 'assets/img/ramon-vallejos.jpg'), os.path.join(destino, 'ramon-vallejos.jpg'))
    for f in (L2[0], L4[0], V1[0]):
        shutil.copy2(os.path.join(PIEZAS, f), os.path.join(destino, 'e10', f))


def serie_taller():
    """La serie de los cuatro servicios de Taller cruza cajas distintas, así que va escrita en taller.css con la palabra
    de cada uno: este paso la reescribe desde img/palabras.json para que no se desalinee."""
    ruta = os.path.join(PROTO, 'e10/taller.css')
    css = leer(ruta)
    for var, w in (('--serv-d', 'Desarrollo'), ('--serv-v', 'Visibilidad'), ('--serv-c', 'Continuidad')):
        css, n = re.subn(rf'{var}: [0-9.]+;', f'{var}: {EM[w] * MARGEN:.4f};', css)
        if n != 1:
            raise SystemExit(f'taller.css: {var} aparece {n} veces')
    escribir(ruta, css)


if __name__ == '__main__':
    if EM is None:
        raise SystemExit('falta img/palabras.json: sirve proto/ y corre node herramientas/palabras.mjs, después este script')
    serie_taller()
    copiar_activos()
    home()
    acompanamiento()
    trabajo()
    print('prototipos listos:', ', '.join(f'{d}/{p}' for d in DIRS for p in ('home', 'acompanamiento-mensual', 'trabajo')))
    print('espacios de foto:', ', '.join(f'{k} ({v})' for k, v in FOTOS.items()))
