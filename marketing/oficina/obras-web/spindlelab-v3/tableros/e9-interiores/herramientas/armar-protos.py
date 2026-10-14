# armar-protos.py — prototipos del tablero E9 (Lucía, 14-oct-2026)
#
# Parte del HTML CONSTRUIDO de verdad (spindlelab-astro/dist, `npm run build` sobre 72045f8) y
# cambia solo la composición y las imágenes. El copy sale del build tal cual (aprobado en E8):
# los bloques se cortan del HTML con su marcado, no se reescriben. Lo único que se agrega son
# los rótulos del bloque «Resultado · Plazo · Condición» y las cifras fechadas de Trabajo, que
# salen de palabras del texto aprobado (ver tablero.html).
#
# Se quitan los scripts (gtag, Pixel, Lenis, menú, aviso de cookies): el prototipo es para
# mirar, no para medir conversiones, y el aviso fijo tapaba el final de cada captura.
#
# Las páginas «antes» (recortes/*-antes.html) son el sitio de hoy y piden la foto
# /assets/img/d/hilo.jpg, que no se copia aquí: para volver a capturarlas, cópiala de
# spindlelab-astro/dist/assets/img/d/ a proto/assets/img/d/ y bórrala después.
#
# Uso: python3 -I herramientas/armar-protos.py   (desde tableros/e9-interiores/)
#      y servir proto/ con: python3 -m http.server 8765 --directory proto
import json, os, re, sys

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.abspath(os.path.join(AQUI, '../../../../../..'))
DIST = os.path.join(REPO, 'spindlelab-astro/dist')
PROTO = os.path.join(AQUI, 'proto')
CRUDO = os.path.join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e9/piezas/crudo/2026-10-14')


def leer(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def escribir(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)


def uno(patron, s, nombre):
    m = re.findall(patron, s, flags=re.S)
    if len(m) != 1:
        raise SystemExit(f'«{nombre}»: {len(m)} coincidencias (se esperaba 1)')
    return m[0]


def balanceado(s, inicio, tag='div'):
    """Devuelve el elemento que empieza en `inicio` (índice de su «<tag»), con sus hijos."""
    nivel, i = 0, inicio
    for m in re.finditer(rf'<(/?){tag}\b[^>]*>', s[inicio:]):
        nivel += -1 if m.group(1) else 1
        if nivel == 0:
            return s[inicio:inicio + m.end()]
    raise SystemExit(f'<{tag}> sin cerrar')


def elemento(s, patron, tag='div', obligatorio=True):
    m = re.search(patron, s)
    if not m:
        if obligatorio:
            raise SystemExit(f'no encontré {patron}')
        return ''
    return balanceado(s, m.start(), tag)


def bloques(html):
    """Corta <main> en sus bloques, con el marcado tal cual sale del build."""
    main = uno(r'<main[^>]*>(.*?)</main>', html, 'main')
    b = {
        'cab': uno(r'(<header class="d-cab[^"]*".*?</header>)', main, 'cabecera'),
        'siguiente': uno(r'(<a class="d-siguiente.*?</a>)', main, 'siguiente'),
        'sangre': elemento(main, r'<figure class="d-sangre"', 'figure', False),
        'entrada': elemento(main, r'<div class="d-entrada[ "]', 'div', False),
        'galeria-svc': elemento(main, r'<div class="d-galeria d-galeria--svc"', 'div', False),
    }
    for sec in re.findall(r'<section [^>]*?aria-labelledby="s-[a-z]+".*?</section>', main, flags=re.S):
        b[re.search(r'aria-labelledby="(s-[a-z]+)"', sec).group(1)] = sec
    return main, b


def pagina(html, nuevo_main, direccion, extra_css=()):
    """El documento del build con otro <main>, sin scripts ni aviso de cookies."""
    h = re.sub(r'<main[^>]*>.*?</main>', lambda _: '<main>' + nuevo_main + '</main>', html, count=1, flags=re.S)
    h = re.sub(r'<script\b(?![^>]*application/ld\+json)[^>]*>.*?</script>', '', h, flags=re.S)
    h = re.sub(r'<link rel="preload"[^>]*>', '', h)
    banner = elemento(h, r'<div id="cookie-banner"', 'div', False)
    if banner:
        h = h.replace(banner, '')
    h = re.sub(r'<noscript>.*?</noscript>', '', h, flags=re.S)
    css = ''.join(f'<link rel="stylesheet" href="{c}">' for c in ('/e9/e9.css', *extra_css))
    h = h.replace('</head>', css + '</head>', 1)
    h = re.sub(r'<html([^>]*)>', lambda m: f'<html{m.group(1)} data-dir="{direccion}">', h, count=1)
    h = h.replace('<head>', '<head>\n<!-- Prototipo E9 (tablero de la compuerta). Base: dist/ de 72045f8. No es el sitio. -->', 1)
    if direccion != 'base' and 'assets/img/d/' in h:
        raise SystemExit('quedó una foto de assets/img/d/ en el prototipo')
    return h


# ------------------------------------------------------------------ piezas
def pieza(src, w, h, alt, etq=None, concepto=False, abajo=False, clase='', src_cel=None):
    r = w / h
    cls = 'd-pieza' + (' d-pieza--etq-abajo' if abajo else '') + (f' {clase}' if clase else '')
    etiquetas = ''
    if etq or concepto:
        spans = ('<span class="d-etq--concepto">Pieza de concepto · no es un cliente</span>' if concepto else '') + (f'<span>{etq}</span>' if etq else '')
        etiquetas = f'<figcaption class="d-etq">{spans}</figcaption>'
    fuente = f'<source media="(max-width: 767px)" srcset="{src_cel}">' if src_cel else ''
    return (f'<figure class="{cls}" style="--r:{r:.4f}"><picture>{fuente}<img src="{src}" alt="{alt}" width="{w}" height="{h}" '
            f'loading="eager" decoding="sync"></picture>{etiquetas}</figure>')


def fila(piezas, clase=''):
    suma = sum(p[1] / p[2] for p in piezas)
    cuerpo = ''.join(pieza(*p[:4], **(p[4] if len(p) > 4 else {})) for p in piezas)
    return f'<div class="e9-fila {clase}" style="--n:{len(piezas)};--suma:{suma:.4f}">{cuerpo}</div>'


def gal(*filas, cab=''):
    return f'<div class="e9-gal">{cab}{"".join(filas)}</div>'


E9 = '/assets/img/e9/'
OBRA = '/assets/img/obra/'
P = {  # (src, ancho, alto, alt, opciones)
    'n1-ancho': (E9 + 'n1-robots-petroleo-ancho.jpg', 1600, 669, 'El robots.txt de spindlelab.cl abierto en un notebook y en un teléfono, sobre fondo petróleo',
                 {'etq': 'spindlelab.cl · robots.txt · 14-oct-2026', 'src_cel': E9 + 'n1-robots-petroleo.jpg'}),
    'n2-pet': (E9 + 'n2-jsonld-petroleo.jpg', 1600, 1200, 'Los datos estructurados de la portada de spindlelab.cl abiertos en un notebook y en un teléfono, sobre fondo petróleo',
               {'etq': 'spindlelab.cl · JSON-LD de la portada · 14-oct-2026'}),
    'n2-bra': (E9 + 'n2-jsonld-brasa.jpg', 1600, 1200, 'Los datos estructurados de la portada de spindlelab.cl abiertos en un notebook y en un teléfono, sobre fondo brasa',
               {'etq': 'spindlelab.cl · JSON-LD de la portada · 14-oct-2026'}),
    'ramon': ('/assets/img/ramon-vallejos.jpg', 896, 1200, 'Ramón Vallejos, consultor de SpindleLab', {'etq': 'Ramón Vallejos'}),
    'l1p': (E9 + 'l1-robots-spindlelab--petroleo.jpg', 1600, 1600, 'Líneas del robots.txt de spindlelab.cl: GPTBot, PerplexityBot y ClaudeBot con Allow: /, leído el 14 de octubre de 2026'),
    'l2': (E9 + 'l2-respuesta-robots-spindlelab.jpg', 1600, 1360, 'La portada de spindlelab.cl pedida con el user-agent de GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot y Chrome: las cinco respondieron 200, el 14 de octubre de 2026'),
    'l3': (E9 + 'l3-jsonld-spindlelab.jpg', 1600, 1720, 'Los nodos del JSON-LD de la portada de spindlelab.cl (ProfessionalService, WebSite, Person y FAQPage) con sus propiedades, leído el 14 de octubre de 2026'),
    'l4': (E9 + 'l4-21-chequeos.jpg', 1600, 1013, 'Los 21 chequeos del chequeo gratis con su peso, en tres bloques: ¿Te pueden leer? 30, ¿Te entienden? 40 y ¿Te pueden citar? 30'),
    'l4b': (E9 + 'l4-21-chequeos--brasa.jpg', 1600, 1013, 'Los 21 chequeos del chequeo gratis con su peso, en tres bloques: ¿Te pueden leer? 30, ¿Te entienden? 40 y ¿Te pueden citar? 30'),
    'p1': (E9 + 'p1-verifica-12-cosas.jpg', 1600, 1200, 'Verifica y Cumple abierto en un notebook y en un teléfono, en la sección «Las 12 cosas que tu sitio tiene que dejar publicadas»',
           {'etq': 'Verifica y Cumple · Producto propio'}),
    'p2': (E9 + 'p2-verifica-como-revisamos.jpg', 1600, 1760, 'Verifica y Cumple en un teléfono, en la sección «Cómo revisamos tu sitio»',
           {'etq': 'Verifica y Cumple · Producto propio'}),
    'combeau-plana': (OBRA + 'combeau-fotografia-ancho-2.jpg', 1440, 616, 'Portada de bernardocombeau.cl, con el titular «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.»',
                      {'etq': 'Combeau, fotografía · Cliente', 'abajo': True}),
    'combeau-mock': (OBRA + 'mock-combeau-fotografia-ancho.jpg', 1600, 1200, 'El sitio de fotografía de Bernardo Combeau abierto en un notebook y en un teléfono',
                     {'etq': 'Combeau, fotografía · Cliente'}),
    'modelo-ancho': (OBRA + 'mock-combeau-modelo-ancho.jpg', 1600, 1200, 'El book de modelo de Bernardo Combeau abierto en un notebook y en un teléfono',
                     {'etq': 'Combeau, modelo · Cliente'}),
    'raigal': (OBRA + 'mock-raigal-ancho.jpg', 1600, 1200, 'La pieza de concepto Raigal abierta en un notebook y en un teléfono, con su aviso de concepto arriba y el titular «Volver a morder»',
               {'etq': 'Raigal · Implantología', 'concepto': True}),
}


def p(k):
    return P[k]


def una(k, clase=''):
    return pieza(*P[k][:4], **({**(P[k][4] if len(P[k]) > 4 else {}), **({'clase': clase} if clase else {})}))


# ------------------------------------------------------------------ el compromiso
FRASE = ('En el Esencial y en el Pro nos comprometemos a que, a los 3 meses (el mínimo del plan), tu sitio saque en el '
         '<a class="d-enl-svc" href="/v3/diagnostico/">chequeo gratis</a> más puntos que el día en que partimos, contando las '
         'mismas señales, y a que los robots de ChatGPT, Claude y Perplexity puedan entrar a él. Si tu sitio ya parte en 100, el '
         'compromiso es que no baje y que cerremos lo que encontremos pendiente. Necesitamos a alguien de tu equipo que apruebe '
         'los cambios, y acceso a donde se configura qué robots entran, como Cloudflare u otro CDN. El chequeo es público, así '
         'que lo compruebas tú.')


def compromiso(pla, banda=False):
    """Saca el <p> del compromiso de la sección de planes y lo devuelve partido en tres."""
    m = re.search(r'<p class="d-cuerpo"[^>]*>(En el Esencial y en el Pro nos comprometemos.*?)</p>', pla, flags=re.S)
    texto = re.sub(r' data-astro-cid-\w+', '', m.group(1))
    if texto != FRASE:
        raise SystemExit('el compromiso del build no es el texto esperado:\n' + texto)
    sin = pla.replace(m.group(0), '')
    corte1 = '(el mínimo del plan), '
    corte2 = 'pendiente. '
    a, resto = texto.split(corte1)
    a += corte1.strip()
    b, c = resto.split(corte2)
    b += corte2.strip()
    assert (a + ' ' + b + ' ' + c) == texto  # las palabras, en su orden, sin una de más ni de menos
    a = a.replace('a los 3 meses', '<b>a los 3 meses</b>')
    b = b.replace('más puntos que el día en que partimos', '<b>más puntos que el día en que partimos</b>')
    c = c.replace('a alguien de tu equipo que apruebe los cambios', '<b>a alguien de tu equipo que apruebe los cambios</b>')
    partes = ''.join(f'<div class="e9-comp__parte"><p class="e9-comp__rot">{rot}</p><p class="e9-comp__txt">{t}</p></div>'
                     for rot, t in (('Plazo', a), ('Resultado', b), ('Condición', c)))
    clase = 'e9-comp e9-comp--banda' if banda else 'e9-comp'
    return sin, f'<div class="{clase}" role="group" aria-label="El compromiso de los 3 meses">{partes}</div>'


def tira(sec, cols):
    return sec.replace('class="d-sec"', f'class="d-sec e9-tira" style="--cols:{cols}"', 1)


def banda(cab, campo):
    return f'<div class="e9-banda e9-banda--{campo}">{cab}</div>'


def par(entrada, k, lado='der'):
    interior = re.sub(r'^<div class="d-entrada[^"]*"[^>]*>|</div>$', '', entrada.strip(), flags=re.S)
    return f'<div class="e9-par"><div class="e9-par__txt">{interior}</div>{una(k)}</div>'


# ------------------------------------------------------------------ Acompañamiento mensual
def acompanamiento():
    html = leer(os.path.join(DIST, 'v3/servicios/acompanamiento-mensual/index.html'))
    _, b = bloques(html)
    pla, comp1 = compromiso(b['s-pla'])
    _, comp2 = compromiso(b['s-pla'], banda=True)
    # D1 · Pantallas: 6 piezas, una galería entre sección y sección
    d1 = ''.join([
        b['cab'],
        (f'<figure class="d-sangre"><picture><source media="(max-width: 767px)" srcset="{E9}n1-robots-petroleo.jpg">'
         f'<img src="{E9}n1-robots-petroleo-ancho.jpg" alt="{P["n1-ancho"][3]}" width="1600" height="669" loading="eager"></picture>'
         f'<figcaption class="d-etq"><span>spindlelab.cl · robots.txt · 14-oct-2026</span></figcaption></figure>'),
        b['entrada'], b['s-inc'],
        gal(fila([p('ramon'), p('n2-pet')])),
        pla, comp1,
        gal(fila([p('l4')], 'e9-fila--8')),
        tira(b['s-blo'], 4),
        gal(fila([p('l1p'), p('l2')], 'e9-fila--10 e9-fila--der')),
        b['s-faq'], b['s-cie'], b['siguiente'],
    ])
    # D2 · Lectura de máquina: banda petróleo + 4 piezas grandes
    d2 = ''.join([
        banda(b['cab'], 'petroleo'),
        par(b['entrada'], 'l2'),
        b['s-inc'],
        gal(fila([p('l4')])),
        pla, comp2,
        b['s-blo'],
        gal(fila([p('l1p'), p('ramon')])),
        b['s-faq'], b['s-cie'], b['siguiente'],
    ])
    escribir(os.path.join(PROTO, 'd1-pantallas/acompanamiento-mensual.html'), pagina(html, d1, 'd1'))
    escribir(os.path.join(PROTO, 'd2-lectura/acompanamiento-mensual.html'), pagina(html, d2, 'd2'))


# ------------------------------------------------------------------ Desarrollo web
def insertar_tras_linea(sec, n, bloque):
    """Inserta un bloque después de la línea n (1-based) de la lista de «Todo parte con esto»."""
    lineas = re.findall(r'<p class="d-guia"[^>]*>.*?</p>', sec, flags=re.S)
    return sec.replace(lineas[n - 1], lineas[n - 1] + bloque, 1)


def desarrollo(ok=None):
    html = leer(os.path.join(DIST, 'v3/servicios/desarrollo-web/index.html'))
    _, b = bloques(html)
    obra_cab = uno(r'(<div class="d-galeria__cab".*?</div>)', b['s-obra'], 'cabecera de la obra').replace('d-galeria__cab', 'e9-gal__cab')
    sangre_dw = (f'<figure class="d-sangre e9-sangre-r d-pieza--etq-abajo" style="--r:{1440/616:.4f};--r-cel:{1000/1100:.4f}"><picture>'
                 f'<source media="(max-width: 767px)" srcset="{OBRA}mock-combeau-fotografia-alto.jpg">'
                 f'<img src="{OBRA}combeau-fotografia-ancho-2.jpg" alt="Portada de bernardocombeau.cl, con el titular «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.»" width="1440" height="616" loading="eager"></picture>'
                 f'<figcaption class="d-etq"><span>Combeau, fotografía · Cliente</span></figcaption></figure>')
    # D1 · Pantallas: 7 piezas
    obra1 = (f'<section class="e9-gal" aria-labelledby="s-obra">{obra_cab}'
             + fila([p('p1'), p('p2')]) + fila([p('modelo-ancho'), p('n2-bra')]) + '</section>')
    d1 = ''.join([
        b['cab'], sangre_dw, b['entrada'], b['s-inc'], obra1,
        b['s-pla'],
        gal(fila([p('raigal')], 'e9-fila--8')),
        tira(b['s-fas'], 5),
        gal(fila([p('combeau-mock')], 'e9-fila--7 e9-fila--der')),
        b['s-faq'], b['s-cie'], b['siguiente'],
    ])
    # D2 · Lectura de máquina: banda brasa + l3 grande + l4 junto a «Te dejamos el puntaje por escrito»
    inc2 = insertar_tras_linea(b['s-inc'], 2, f'<div class="e9-en-lista">{una("l4b")}</div>')
    obra2 = (f'<section class="e9-gal" aria-labelledby="s-obra">{obra_cab}'
             + fila([p('combeau-plana')]) + fila([p('modelo-ancho'), p('p2')]) + fila([p('raigal')], 'e9-fila--8') + '</section>')
    d2 = ''.join([
        banda(b['cab'], 'brasa'), par(b['entrada'], 'l3'), inc2, obra2,
        b['s-pla'], b['s-fas'], b['s-faq'], b['s-cie'], b['siguiente'],
    ])
    escribir(os.path.join(PROTO, 'd1-pantallas/desarrollo-web.html'), pagina(html, d1, 'd1'))
    escribir(os.path.join(PROTO, 'd2-lectura/desarrollo-web.html'), pagina(html, d2, 'd2'))
    # Panel «Espera tu OK»: K2 y K3 en su lugar, en la lista de «Todo parte con esto»
    k2 = f'<div class="e9-ok">{pieza("/assets/img/e9/k2-chequeo-ia-85-54-tablero.jpg", 1600, 706, "Espera tu OK: el resultado del chequeo gratis para spindlelab.cl (85 de 100) y verifica.spindlelab.cl (54 de 100), tal como lo pinta la página del chequeo")}</div>'
    k3 = f'<div class="e9-ok">{pieza("/assets/img/e9/k3-panel-combeau-tablero.jpg", 1600, 1200, "Espera tu OK: el panel de administración del sitio de Bernardo Combeau en un notebook y en un teléfono", etq="Combeau, fotografía · Cliente · panel de administración")}</div>'
    for nombre, n, bloque in (('ok-k2-desarrollo-web', 2, k2), ('ok-k3-desarrollo-web', 3, k3)):
        m = ''.join([b['cab'], insertar_tras_linea(b['s-inc'], n, bloque), b['siguiente']])
        escribir(os.path.join(PROTO, f'recortes/{nombre}.html'), pagina(html, m, 'd1'))


# ------------------------------------------------------------------ Trabajo
def trabajo():
    html = leer(os.path.join(DIST, 'v3/trabajo/index.html'))
    viejo = ('El primer sitio que revisó fue el nuestro. spindlelab.cl sacó 36 de 100 el 9 de septiembre de 2026 y, con lo que '
             'encontró ya arreglado, 73 el 21 de septiembre. El 14 de octubre, ya con otra forma de puntuar, sacó 100. Lo que no '
             'se ve desde afuera, como si el aviso de cookies frena de verdad a los rastreadores, hoy no suma ni resta.')
    m = re.search(r'<p class="d-cuerpo"([^>]*)>' + re.escape(viejo) + '</p>', html)
    if not m:
        raise SystemExit('no encontré el párrafo del 36 → 73 → 100 en Trabajo')
    a = m.group(1)
    nuevo = (f'<p class="d-cuerpo"{a}>El primer sitio que revisó fue el nuestro.</p>'
             f'<p class="d-rot"{a}>spindlelab.cl en el chequeo de la Ley 21.719</p>'
             f'<ol class="e9-cifras">'
             f'<li><span class="e9-cifra">36</span><span class="e9-cifra__fecha">9 de septiembre de 2026</span></li>'
             f'<li><span class="e9-cifra">73</span><span class="e9-cifra__fecha">21 de septiembre</span><span class="e9-cifra__nota">con lo que encontró ya arreglado</span></li>'
             f'<li><span class="e9-cifra">100</span><span class="e9-cifra__fecha">14 de octubre</span><span class="e9-cifra__nota">ya con otra forma de puntuar</span></li>'
             f'</ol>'
             f'<p class="d-cuerpo"{a}>Lo que no se ve desde afuera, como si el aviso de cookies frena de verdad a los rastreadores, hoy no suma ni resta.</p>')
    h = html.replace(m.group(0), nuevo).replace('<div class="d-obras-trab"', '<div class="d-obras-trab e9-cuadra"', 1)
    main = uno(r'<main[^>]*>(.*?)</main>', h, 'main')
    escribir(os.path.join(PROTO, 'recortes/trabajo-despues.html'), pagina(h, main, 'd1'))
    main0 = uno(r'<main[^>]*>(.*?)</main>', html, 'main')
    escribir(os.path.join(PROTO, 'recortes/trabajo-antes.html'), pagina(html, main0, 'base'))


# ------------------------------------------------------------------ Diagnóstico
def diagnostico():
    html = leer(os.path.join(DIST, 'v3/diagnostico/index.html'))
    main, b = bloques(html)
    api = json.load(open(os.path.join(CRUDO, 'spindlelab.cl/chequeo-ia.json'), encoding='utf-8'))
    nota = uno(r'<p class="d-nota-card"[^>]*>(.*?)</p>', b['entrada'], 'nota de la entrada')
    cols = ''
    for bl in api['bloques']:
        items = [i for i in api['items'] if i['bloque'] == bl['id']]
        peso = sum(i['peso'] for i in items)
        lis = ''.join(f'<li>{i["titulo"]}<span>{i["peso"]}</span></li>' for i in items)
        cols += (f'<div class="e9-metodo__bloque" style="--peso:{peso}"><div class="e9-metodo__barra" aria-hidden="true"></div>'
                 f'<span class="e9-metodo__n">{peso}</span><p class="e9-metodo__q">{bl["titulo"]}</p>'
                 f'<ul class="e9-metodo__lista">{lis}</ul></div>')
    dibujo = (f'<figure class="e9-metodo" aria-label="Los 21 chequeos y su peso"><p class="e9-metodo__nota">{nota}</p>'
              f'<div class="e9-metodo__cols">{cols}</div></figure>')
    entrada = re.sub(r'<p class="d-nota-card"[^>]*>.*?</p>', '<div aria-hidden="true"></div>', b['entrada'], count=1, flags=re.S)
    m_despues = main.replace(b['sangre'], dibujo, 1).replace(b['entrada'], entrada, 1)
    escribir(os.path.join(PROTO, 'recortes/diagnostico-despues.html'), pagina(html, m_despues, 'd1'))
    escribir(os.path.join(PROTO, 'recortes/diagnostico-antes.html'), pagina(html, main, 'base'))
    # Espera tu OK · el 67 de 69, al lado de «¿Te pueden citar?»
    k1 = (f'<div class="e9-gal" style="padding-top:40px"><div class="e9-fila e9-fila--4 e9-fila--der e9-ok" style="--n:1;--suma:{1600/1760:.4f}">'
          f'{pieza("/assets/img/e9/k1-67-de-69-tablero.jpg", 1600, 1760, "Espera tu OK: el chequeo «Tienes preguntas frecuentes marcadas» lo fallan 67 de 69 sitios en las corridas del chequeo público del 31 de agosto de 2026: 37 de 38 inmobiliarias y 30 de 31 contadores")}'
          f'</div></div>')
    m_ok = m_despues.replace(dibujo, dibujo + k1, 1)
    escribir(os.path.join(PROTO, 'recortes/ok-k1-diagnostico.html'), pagina(html, m_ok, 'd1'))


if __name__ == '__main__':
    acompanamiento()
    desarrollo()
    trabajo()
    diagnostico()
    print('prototipos listos en', os.path.relpath(PROTO, AQUI))
