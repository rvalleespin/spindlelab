#!/usr/bin/env python3
"""Arma las cinco vistas de la dirección B «Banco» (E12, paso 2). Lucía, 17-oct-2026.

El HTML, el CSS (b.css) y el JS (b.js) están escritos a mano; este script solo pone el texto de
Clara TAL CUAL en las plantillas, para que no se cuele una palabra cambiada al copiarlo:
  - e12/texto/texto-paso2.json  (home, /trabajo/, el caso Praxi y Desarrollo web)
  - marketing/portafolio/06-sesenta/caso.md  (el caso de concepto: texto de Bruno, sin tocar)
  - spindlelab-astro/src/data/oferta-v3.json (los cuatro planes, como texto, sin tocar)
  - e12/praxi/crudo/verificacion-copia.txt (la placa del resultado de Praxi: el crudo, sin tocar)
Lo que B agrega a la vista y no está en esos archivos (rótulos de interfaz, la cifra grande
que repite un dato del párrafo) queda listado en direccion-b.md §6, con su fuente.

Uso:  python3 -I armar.py         (escribe index.html, trabajo/, trabajo/praxi/, trabajo/sesenta/,
                                    servicios/desarrollo-web/ dentro de proto/b/)
"""
import html
import json
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))
B = os.path.dirname(AQUI)
RAIZ = os.path.abspath(os.path.join(B, *(['..'] * 8)))
E12 = os.path.join(RAIZ, 'marketing/oficina/obras-web/spindlelab-v3/e12')

# Decisiones abiertas de Ramón (encargo §10). Se cambian aquí, en una línea, y se vuelve a armar.
PUNTAJES_PROPIOS = False   # §10.3: ¿se muestran los puntajes propios (Verifica y Cumple 54 → 94, spindlelab.cl 36 → 73)? Hasta que diga sí, va la alternativa de Clara.

TEXTO = json.load(open(os.path.join(E12, 'texto/texto-paso2.json'), encoding='utf-8'))
OFERTA = json.load(open(os.path.join(RAIZ, 'spindlelab-astro/src/data/oferta-v3.json'), encoding='utf-8'))
CRUDO_PRAXI = open(os.path.join(E12, 'praxi/crudo/verificacion-copia.txt'), encoding='utf-8').read()
CASO_SESENTA = open(os.path.join(RAIZ, 'marketing/portafolio/06-sesenta/caso.md'), encoding='utf-8').read()
LOGO = open(os.path.join(E12, 'logo/camino-3-dos-cortes/camino-3-dos-cortes-B-blanco.svg'), encoding='utf-8').read()

EL = {}
PAG = {}
for p in TEXTO['paginas']:
    PAG[p['id']] = p
    for s in p['secciones']:
        for e in s.get('elementos', []):
            EL[e['id']] = e
ENTRADAS = {e['id']: e for e in PAG['trabajo']['entradas']}
ORDEN = [e['id'] for e in PAG['trabajo']['entradas']]
HERO = next(o for o in PAG['home']['secciones'][0]['opciones'] if o['recomendada'])
HERO_EL = {e['rol']: e for e in HERO['elementos']}


def esc(s):
    return html.escape(s, quote=True)


def txt(i):
    return esc(EL[i]['texto'])


def dos_tintas(e):
    """La frase en dos tintas, con el texto exacto de Clara: la parte en tinta y la continuación en gris."""
    texto, gris = e['texto'], e['gris']
    k = texto.rfind(gris)
    tinta = texto[:k].rstrip()
    sep = texto[len(tinta):k]
    return f'<span class="tinta">{esc(tinta)}</span>{esc(sep)}<span class="gris">{esc(gris)}</span>'


# Rutas: las cinco vistas construidas se enlazan entre sí; el resto conserva la ruta final del v3
# (en el prototipo responden 404, a propósito: no se inventa una página que no está en el encargo).
CONSTRUIDAS = {
    '/v3/': '', '/v3/trabajo/': 'trabajo/', '/v3/trabajo/praxi/': 'trabajo/praxi/',
    '/v3/trabajo/sesenta/': 'trabajo/sesenta/', '/v3/servicios/desarrollo-web/': 'servicios/desarrollo-web/',
}


def ruta(destino, pre):
    if destino in CONSTRUIDAS:
        return pre + CONSTRUIDAS[destino] if (pre + CONSTRUIDAS[destino]) else './'
    return destino


def con_enlaces(e, pre):
    s = esc(e['texto'])
    for palabra, dest in (e.get('enlaces') or {}).items():
        s = s.replace(esc(palabra), f'<a href="{esc(ruta(dest, pre))}">{esc(palabra)}</a>', 1)
    return s


FLECHA = '<span class="flecha" aria-hidden="true">→</span>'
PAUSA_SVG = ('<svg class="ico-pausa" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" fill="currentColor"/>'
             '<rect x="8.5" y="1" width="3.5" height="12" fill="currentColor"/></svg>'
             '<svg class="ico-play" viewBox="0 0 14 14" aria-hidden="true" style="display:none"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>')


def boton_pausa(oculto=False):
    return (f'<button type="button" class="pausa" data-pausar="Pausar el video" data-reproducir="Reproducir el video" '
            f'aria-label="Pausar el video"{" hidden" if oculto else ""}>{PAUSA_SVG}</button>')


def logo():
    s = LOGO.replace('fill="#FFFFFF"', 'fill="currentColor"')
    return s


def cabecera(pre, actual):
    nav = []
    for n in TEXTO['comun']['nav']:
        cur = ' aria-current="page"' if n['destino'] == actual else ''
        nav.append(f'<a href="{esc(ruta(n["destino"], pre))}"{cur}>{esc(n["texto"])}</a>')
    santiago = esc(TEXTO['comun']['telemetria'][0]['texto'])
    return f'''<a class="saltar" href="#contenido">Ir al contenido</a>
<header class="cabecera reja">
  <span class="cabecera__placa" aria-hidden="true"></span>
  <a class="marca" href="{ruta('/v3/', pre)}">{logo()}</a>
  <nav class="nav" aria-label="Principal">{''.join(nav)}</nav>
  <p class="telemetria rotulo"><span>{santiago} <span data-reloj></span></span><span class="visita">Esta visita <span class="valor" data-visita></span></span></p>
  <button type="button" class="boton-menu" aria-expanded="false" aria-controls="menu">Menú</button>
  <div class="menu" id="menu" data-abierto="false">{''.join(nav)}<p class="telemetria-menu rotulo"><span>{santiago} <span data-reloj></span></span><span>Esta visita <span class="tinta" data-visita></span></span></p></div>
</header>'''


def pagina(pre, ruta_v3, pid, cuerpo, jsonld, extra_head=''):
    p = PAG[pid] if pid in PAG else None
    title = p['title'] if p else pid
    desc = p['description'] if p else ''
    return f'''<!doctype html>
<html lang="es-CL">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/svg+xml" href="{pre}../../../../e12/logo/camino-3-dos-cortes/favicon-B.svg">
<link rel="preload" href="{pre}fuentes/mona-sans-var-b.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{pre}fuentes/dm-mono-500-b.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{pre}b.css">
<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>
{extra_head}</head>
<body data-direccion="B" data-ruta="{esc(ruta_v3)}">
{cabecera(pre, ruta_v3)}
<main id="contenido">
{cuerpo}
</main>
<script src="{pre}vendor/motion-13.5.0.js"></script>
<script src="{pre}b.js"></script>
</body>
</html>
'''


ORG = {'@type': 'Organization', '@id': 'https://spindlelab.cl/#organizacion', 'name': 'SpindleLab', 'url': 'https://spindlelab.cl/'}

# ------------------------------------------------------------------ medios de cada entrada del índice
PORT = '../../../../../../../portafolio/'   # desde proto/b/ hasta marketing/portafolio/ (siete niveles)
VISOR = {
    'combeau-fotografia': ('medios/v-combeau-fotografia.webp', None, 'La primera pantalla del sitio de Bernardo Combeau a 1440: su retrato con luz verde, la frase de portada y el comienzo de la galería de retratos.'),
    'praxi': ('medios/v-praxi.webp', None, 'La portada de Praxi: «Se acuerda de cada serie que hiciste» junto a dos hombres en un press de banca (personas generadas con IA).'),
    'sesenta': ('medios/v-sesenta.webp', '06-sesenta', 'Portada de Sesenta, concepto: un 60 blanco enorme sobre azul de ropa de trabajo y la suma del escrito en papel.'),
    'verifica-y-cumple': ('medios/v-verifica-y-cumple.webp', None, 'La primera pantalla de Verifica y Cumple a 1440: «¿Estás seguro?» en blanco y verde limón sobre azul, con una mujer vestida de rosa a caballo.'),
    'ocelo': ('medios/v-ocelo.webp', '05-ocelo', 'Portada de Ocelo, concepto: una carta de optotipos con la C de Landolt y una franja roja y verde.'),
    'combeau-modelo': ('medios/v-combeau-modelo.webp', None, 'La primera pantalla del book de modelo de Bernardo Combeau a 1440: su retrato de traje azul junto a una ventana y sus medidas debajo.'),
    'doceavo': ('medios/v-doceavo.webp', '07-doceavo', 'Portada de Doceavo, concepto: el año en doce meses sobre papel de libro contable y un 1/12 grande.'),
    'chequeo': ('medios/v-chequeo.webp', None, 'La página del chequeo gratis del v3: «¿Te puede leer la IA?» con el campo para escribir el dominio.'),
    'tonela': ('medios/v-tonela.webp', '04-tonela', 'Portada de Tonela, concepto: ocho bandas de eslinga con los colores de la norma y su tonelaje.'),
    'spindlelab': ('medios/v-spindlelab.webp', None, 'La portada que spindlelab.cl publica hoy: «Un motor de adquisición. No cuatro servicios sueltos.»'),
}
PAGINA_CASO = {'praxi': '/v3/trabajo/praxi/', 'sesenta': '/v3/trabajo/sesenta/'}


def resultado(e):
    # Las dos entradas con puntaje propio llevan «condicion» y «alternativa» en texto-paso2.json (Clara, defecto 15 del acta del paso 2).
    if e['id'] in ('verifica-y-cumple', 'spindlelab') and not PUNTAJES_PROPIOS:
        return e['alternativa']['resultado']
    return e['resultado']


def cursor_de(e):
    return TEXTO['comun']['cursor'][1 if e['tipo'] == 'Concepto' else 0]['texto']


def tabla_indice(ids, pre, completa, nivel_nombre='h3'):
    cols = TEXTO['paginas'][1]['secciones'][0]['elementos'][5]['opciones']  # Nombre · Tipo · Año · Con qué está hecho · Resultado
    filas = []
    for i in ids:
        e = ENTRADAS[i]
        img, carpeta, alt = VISOR[i]
        video = f'{pre}{PORT}{carpeta}/movimiento/recorrido.webm' if carpeta else ''
        destino = PAGINA_CASO.get(i, f'/v3/trabajo/{i}/')
        href = ruta(destino, pre)
        linea = e['linea'] if completa else e['linea_corta']
        concepto = ' indice__tipo-concepto' if e['tipo'] == 'Concepto' else ''
        celdas = [f'''<td class="c-nombre">
        <img class="indice__mini medio r43" src="{pre}{img}" alt="{esc(alt)}" width="1080" height="810" loading="lazy">
        <{nivel_nombre} class="t-titulo"><a class="indice__nombre" href="{esc(href)}">{esc(e['nombre'])}</a></{nivel_nombre}>
        <p class="indice__bajada t-chico">{esc(e['bajada'])}</p>
        <p class="indice__foco rotulo">{esc(cursor_de(e))}</p></td>''',
                  f'<td class="c-tipo dato{concepto}" data-columna="{esc(cols[1])}">{esc(e["tipo"])}</td>',
                  f'<td class="c-anio dato indice__dato" data-columna="{esc(cols[2])}">{esc(e["anio"])}</td>']
        if completa:
            con = ' · '.join(e['ingredientes']) if e['ingredientes'] else '—'
            celdas.append(f'<td class="c-con dato indice__dato" data-columna="{esc(cols[3])}">{esc(con)}</td>')
            celdas.append(f'<td class="c-res t-chico indice__resultado" data-columna="{esc(cols[4])}">{esc(resultado(e))}</td>')
        filas.append(f'''<tr data-tipo="{esc(e['tipo'].lower())}" data-cursor="{esc(cursor_de(e))}" data-visor="{pre}{img}" data-alt="{esc(alt)}"
      data-video="{esc(video)}" data-nombre="{esc(e['nombre'])}" data-linea="{esc(linea)}">
      {''.join(celdas)}
    </tr>''')
    cab = [f'<th scope="col" class="rotulo col-nombre">{esc(cols[0])}</th>', f'<th scope="col" class="rotulo col-tipo">{esc(cols[1])}</th>',
           f'<th scope="col" class="rotulo col-anio">{esc(cols[2])}</th>']
    if completa:
        cab += [f'<th scope="col" class="rotulo col-con c-con">{esc(cols[3])}</th>', f'<th scope="col" class="rotulo">{esc(cols[4])}</th>']
    return f'''<table class="indice">
    <thead><tr>{''.join(cab)}</tr></thead>
    <tbody>
    {''.join(filas)}
    </tbody>
  </table>'''


def visor(ids, pre):
    e = ENTRADAS[ids[0]]
    img, _, alt = VISOR[ids[0]]
    return f'''<div class="riel visor-celda">
    <div class="visor">
      <figure class="medio r43">
        <img src="{pre}{img}" alt="{esc(alt)}" width="1080" height="810" loading="eager">
        <video muted loop playsinline preload="none" aria-hidden="true"></video>
        {boton_pausa(oculto=True)}
      </figure>
      <p class="visor__nombre" aria-hidden="true">{esc(e['nombre'])}</p>
      <p class="visor__linea dato" aria-hidden="true">{esc(e['linea'])}</p>
    </div>
  </div>'''


def regla(tramos_grandes=False):
    """La regla de las 21 señales: cada tramo pesa lo que pesa en chequeo.js (30 + 40 + 30)."""
    bloques = [
        ('¿Te pueden leer?', [('bots-indices', 7), ('bots-asistentes', 7), ('servidor-ua', 8), ('bots-entrenamiento', 2), ('https', 6)]),
        ('¿Te entienden?', [('jsonld', 6), ('entidad', 8), ('entidad-completa', 5), ('sameas', 6), ('autor', 5), ('title', 4), ('desc', 4), ('h1', 2)]),
        ('¿Te pueden citar?', [('llms', 4), ('faq', 6), ('sitemap', 4), ('canonical', 2), ('lang', 2), ('preguntas', 5), ('fecha', 4), ('sustancia', 3)]),
    ]
    out = []
    for titulo, items in bloques:
        total = sum(p for _, p in items)
        tramos = ''.join(f'<span class="regla__tramo" data-id="{i}" style="flex:{p}"></span>' for i, p in items)
        pesos = ''
        if tramos_grandes:
            pesos = '<div class="pesos" aria-hidden="true">' + ''.join(f'<span style="flex:{p}">{p}</span>' for _, p in items) + '</div>'
        out.append(f'<div class="regla__grupo"><div class="regla__tramos">{tramos}</div>{pesos}'
                   f'<p class="regla__nombre"><span>{esc(titulo)}</span><span class="dato">{total}</span></p></div>')
    return f'<div class="regla" aria-hidden="true">{"".join(out)}</div>'


# ================================================================== HOME
def home():
    pre = ''
    h1 = HERO_EL['h1']
    obra_ids = ['combeau-fotografia', 'praxi', 'verifica-y-cumple', 'sesenta']
    vyc_pieza = EL['home.prueba.vyc.pieza']['texto'] if PUNTAJES_PROPIOS else EL['home.prueba.vyc.dato']['alternativa']['pieza']
    vyc_dato = EL['home.prueba.vyc.dato']['texto'] if PUNTAJES_PROPIOS else EL['home.prueba.vyc.dato']['alternativa']['dato']

    def ficha(i):
        c = EL[i]['campos'][0]
        return f'<p class="ficha-linea"><span class="rotulo">{esc(c["rotulo"])}</span><span class="dato">{esc(c["valor"])}</span></p>'

    servicios = []
    for k, ruta_s in [('dw', None), ('via', None), ('aud', None), ('aco', None)]:
        b = f'home.servicios.{k}'
        escena = f'<p class="servicio__escena t-chico">{txt(b + ".escena")}</p>' if (b + '.escena') in EL else ''
        servicios.append(f'''<article class="servicio sub">
        <div class="servicio__nombre">
          <p class="t-cuerpo">{txt(b + '.situacion')}</p>
          <h3 class="t-titulo">{txt(b + '.nombre')}</h3>
          <p class="servicio__precio dato">{txt(b + '.precio')}</p>
          <a class="enlace-dato" href="{esc(ruta(EL[b + '.boton']['destino'], pre))}">{txt(b + '.boton')} {FLECHA}</a>
        </div>
        <div class="servicio__texto">
          <p class="t-cuerpo">{txt(b + '.texto')}</p>
          {escena}
        </div>
      </article>''')

    cuerpo = f'''<section class="portada reja" aria-labelledby="titulo-portada">
  <p class="portada__rotulo rotulo">{esc(HERO_EL['rotulo']['texto'])}</p>
  <h1 class="portada__h1 t-monumental" id="titulo-portada">{dos_tintas(h1)}</h1>
  <div class="portada__pie">
    <p class="portada__entradilla entradilla">{esc(HERO_EL['entradilla']['texto'])}</p>
    <div class="chequeo panel" id="chequeo">
      <div class="chequeo__cabeza">
        <h2 class="rotulo">{txt('home.chequeo.rotulo')}</h2>
        <p class="chequeo__lectura" aria-live="polite"><span class="chequeo__cifra t-cifra">--</span><span class="dato">/100</span></p>
      </div>
      <p class="chequeo__intro t-chico">{txt('home.chequeo.intro')}</p>
      <form id="chq-form" data-contacto="/v3/contacto/" novalidate>
        <label for="chq-dominio" class="rotulo">{txt('home.chequeo.label')}</label>
        <div class="chequeo__fila">
          <input id="chq-dominio" name="dominio" type="text" inputmode="url" autocomplete="url" autocapitalize="off" spellcheck="false" placeholder="{txt('home.chequeo.placeholder')}">
          <button id="chq-btn" class="boton boton--lleno" type="submit">{txt('home.chequeo.boton')}</button>
        </div>
      </form>
      <p class="chequeo__ayuda t-pie">{txt('home.chequeo.ayuda')}</p>
      {regla()}
      <div id="chq-error" class="chequeo__error" role="alert" hidden></div>
      <div id="chq-out" class="lectura" hidden></div>
    </div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-obra" data-indice>
  <span class="cruz" aria-hidden="true"></span>
  <div class="cuerpo" style="grid-row:1"><h2 class="t-declaracion titular-seccion" id="titulo-obra">{dos_tintas(EL['home.obra.h2'])}</h2></div>
  {visor(obra_ids, pre).replace('class="riel visor-celda"', 'class="riel visor-celda" style="grid-row:2;margin-top:28px"')}
  <div class="cuerpo" style="grid-row:2;margin-top:28px" data-entra>
    {tabla_indice(obra_ids, pre, completa=False)}
    <p class="t-chico" style="margin-top:18px;max-width:493px">{txt('home.obra.concepto')}</p>
    <a class="enlace-indice" href="{ruta('/v3/trabajo/', pre)}">{txt('home.obra.todo')}</a>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-prueba">
  <div class="cuerpo">
    <h2 class="t-declaracion titular-seccion" id="titulo-prueba">{dos_tintas(EL['home.prueba.h2'])}</h2>
    <p class="t-cuerpo" style="margin-top:18px">{txt('home.prueba.aviso')}</p>
    <div style="margin-top:28px" data-entra>
      <article class="prueba-fila sub">
        <figure class="prueba-fila__medio medio r169"><img src="medios/p-combeau.webp" alt="La primera pantalla del sitio de Bernardo Combeau a 1440: su retrato con una luz verde, la frase «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.» y el comienzo de la galería de retratos." width="1440" height="810" loading="lazy"></figure>
        <div class="prueba-fila__dato">
          <h3 class="t-titulo">{txt('home.prueba.combeau.pieza')}</h3>
          <p class="t-cifra" aria-hidden="true">805 kB → 95 kB</p>
          <p class="t-cuerpo">{txt('home.prueba.combeau.dato')}</p>
          {ficha('home.prueba.combeau.ficha')}
        </div>
      </article>
      <article class="prueba-fila sub">
        <figure class="prueba-fila__medio medio medio--contener r169" style="background:#0F1117"><img src="medios/p-praxi-reglas.webp" alt="Captura de la portada de Praxi: «Debajo del chat hay reglas, no una corazonada», con las tres reglas que calcula el código." width="1440" height="526" loading="lazy"></figure>
        <div class="prueba-fila__dato">
          <h3 class="t-titulo">{txt('home.prueba.praxi.pieza')}</h3>
          <p class="t-cifra" aria-hidden="true">384 / 384</p>
          <p class="t-cuerpo">{txt('home.prueba.praxi.dato')}</p>
          {ficha('home.prueba.praxi.ficha')}
        </div>
      </article>
      <article class="prueba-fila sub">
        <div class="prueba-fila__medio instrumento" aria-hidden="true">{regla(tramos_grandes=True)}</div>
        <div class="prueba-fila__dato">
          <h3 class="t-titulo">{esc(vyc_pieza)}</h3>
          <p class="t-cifra" aria-hidden="true">{'54 → 94' if PUNTAJES_PROPIOS else '30 + 40 + 30'}</p>
          <p class="t-cuerpo">{esc(vyc_dato)}</p>
          {ficha('home.prueba.vyc.ficha') if PUNTAJES_PROPIOS else ''}
        </div>
      </article>
    </div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-servicios">
  <span class="cruz" aria-hidden="true"></span>
  <div class="cuerpo" style="grid-row:1">
    <h2 class="t-declaracion titular-seccion" id="titulo-servicios">{dos_tintas(EL['home.servicios.h2'])}</h2>
    <p class="t-cuerpo" style="margin-top:18px">{txt('home.servicios.guia')}</p>
    <div style="margin-top:28px" data-entra>
      {''.join(servicios)}
    </div>
    <p class="t-cuerpo" style="margin-top:22px;max-width:640px">{con_enlaces(EL['home.servicios.tambien'], pre)}</p>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-quien">
  <div class="cuerpo">
    <h2 class="t-declaracion titular-seccion" id="titulo-quien">{dos_tintas(EL['home.quien.h2'])}</h2>
    <div class="sub" style="margin-top:28px">
      <div class="columna-texto">
        <p class="t-cuerpo">{txt('home.quien.cv')}</p>
        <p class="t-cuerpo" style="margin-top:14px">{txt('home.quien.publicado')}</p>
        <a class="enlace-dato" style="margin-top:8px" href="{esc(ruta(EL['home.quien.boton']['destino'], pre))}">{txt('home.quien.boton')} {FLECHA}</a>
      </div>
    </div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-contacto">
  <div class="cuerpo">
    <h2 class="t-grande" id="titulo-contacto" style="max-width:1000px">{dos_tintas(EL['home.contacto.h2'])}</h2>
    <div class="sub" style="margin-top:32px">
      <div class="columna-texto">
        <p class="t-cuerpo">{txt('home.contacto.que-es')}</p>
        <p class="t-cuerpo" style="margin-top:14px">{txt('home.contacto.de-cero')}</p>
        <div class="acciones"><a class="boton boton--lleno" href="{esc(ruta(EL['home.contacto.boton']['destino'], pre))}">{txt('home.contacto.boton')}</a></div>
        <p class="t-chico" style="margin-top:14px">{esc(EL['home.contacto.correo']['texto']).replace('hola@spindlelab.cl', '<a href="mailto:hola@spindlelab.cl">hola@spindlelab.cl</a>')}</p>
      </div>
    </div>
  </div>
</section>
<div class="fin" aria-hidden="true"></div>'''
    jsonld = {'@context': 'https://schema.org', '@graph': [
        dict(ORG, description=PAG['home']['description']),
        {'@type': 'WebSite', 'name': 'SpindleLab', 'url': 'https://spindlelab.cl/', 'inLanguage': 'es-CL', 'publisher': {'@id': ORG['@id']}},
    ]}
    return pagina(pre, '/v3/', 'home', cuerpo, jsonld)


# ================================================================== /trabajo/
def trabajo():
    pre = '../'
    filtro = EL['trabajo.filtro']['opciones']
    claves = ['todo', 'cliente', 'propio', 'concepto']
    botones = ''.join(f'<button type="button" data-filtro="{k}" aria-pressed="{"true" if k == "todo" else "false"}">{esc(o)}</button>'
                      for k, o in zip(claves, filtro))
    cuerpo = f'''<section class="portada reja" aria-labelledby="titulo-trabajo" style="padding-top:56px">
  <h1 class="t-grande" id="titulo-trabajo" style="grid-column:1/span 13;color:#fff">{dos_tintas(EL['trabajo.h1'])}</h1>
  <div class="cuerpo" style="margin-top:28px">
    <p class="entradilla">{txt('trabajo.entradilla')}</p>
    <p class="t-chico" style="margin-top:14px;max-width:493px">{txt('trabajo.nota-herramientas')}</p>
  </div>
</section>

<section class="bloque reja" aria-label="Índice" data-indice style="margin-top:56px">
  <span class="cruz" aria-hidden="true"></span>
  <div class="riel" style="grid-row:1"><p class="t-cifra" aria-hidden="true" style="color:#fff">{esc(EL['trabajo.conteo']['texto'])}</p></div>
  <div class="cuerpo" style="grid-row:1;align-self:end">
    <div class="filtro" role="group" aria-label="{esc(EL['trabajo.columnas']['opciones'][1])}">{botones}</div>
  </div>
  {visor(ORDEN, pre).replace('class="riel visor-celda"', 'class="riel visor-celda" style="grid-row:2"')}
  <div class="cuerpo" style="grid-row:2">
    {tabla_indice(ORDEN, pre, completa=True, nivel_nombre='h2')}
  </div>
</section>
<div class="fin" aria-hidden="true"></div>'''
    jsonld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CollectionPage', 'name': PAG['trabajo']['title'], 'description': PAG['trabajo']['description'], 'inLanguage': 'es-CL',
         'isPartOf': {'@type': 'WebSite', 'url': 'https://spindlelab.cl/'}, 'publisher': {'@id': ORG['@id']}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': 'https://spindlelab.cl/v3/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Trabajo', 'item': 'https://spindlelab.cl/v3/trabajo/'}]},
        ORG,
    ]}
    return pagina(pre, '/v3/trabajo/', 'trabajo', cuerpo, jsonld)


# ================================================================== casos (plantilla de §21.5)
SECCIONES_CASO = ['Problema', 'Hipótesis', 'Solución', 'La pieza', 'Sin métrica']   # praxi.indice: el juego que elige Lucía
IDS_SECCION = ['problema', 'hipotesis', 'solucion', 'pieza', 'resultado']


def medio(src, alt, cls='r169', w=1440, h=810, fondo=None, contener=False):
    estilo = f' style="background:{fondo}"' if fondo else ''
    c = ' medio--contener' if contener else ''
    return f'<figure class="medio {cls}{c}"{estilo}><img src="{src}" alt="{esc(alt)}" width="{w}" height="{h}" loading="lazy"></figure>'


def con_pie(contenido, pie):
    return f'<figure class="figura">{contenido}<figcaption class="pie">{esc(pie)}</figcaption></figure>'


def lateral(titulo_html, ficha_html, nombre_corto, creditos_html, pre):
    enlaces = ''.join(f'<li><a href="#{i}">{esc(n)}</a></li>' for i, n in zip(IDS_SECCION, SECCIONES_CASO))
    return f'''<aside class="caso__lateral" aria-label="Ficha del caso">
    <h1 class="caso__titulo t-titulo">{titulo_html}</h1>
    {ficha_html}
    <nav aria-label="Secciones del caso" style="position:relative"><span class="secciones__punto" aria-hidden="true"></span><ul class="secciones">{enlaces}</ul></nav>
    {creditos_html}
  </aside>'''


def cabeza_movil(ficha_html):
    # Bajo 834 px: la ficha va aquí, debajo del título. El título no se repite: es el h1 de la barra lateral, que b.css
    # baja entre el medio principal y esta ficha (defecto 1 del acta del paso 2: antes iba un <p aria-hidden> y el h1
    # quedaba en display: none, y la página no tenía título para un lector de pantalla).
    return f'''<div class="caso-cabeza-movil">
      {ficha_html}
    </div>'''


def barra_movil(nombre):
    enlaces = ''.join(f'<a href="#{i}">{esc(n)}</a>' for i, n in zip(IDS_SECCION, SECCIONES_CASO))
    return f'''<div class="barra-caso" role="navigation" aria-label="Secciones del caso">
  <span class="barra-caso__nombre rotulo">{esc(nombre)}</span>
  <span class="barra-caso__activa rotulo">{esc(SECCIONES_CASO[0])}</span>
  <button type="button" aria-expanded="false" aria-controls="menu-caso" aria-label="Secciones del caso"><span aria-hidden="true">+</span></button>
</div>
<div class="barra-caso__menu" id="menu-caso" hidden>{enlaces}</div>'''


def seccion_caso(i, rotulo, h2, parrafos_html, filas_html, entra=True):
    return f'''<section class="caso__seccion" id="{i}" aria-labelledby="t-{i}">
      <div class="caso__texto">
        <p class="caso__rotulo rotulo">{esc(rotulo)}</p>
        <div class="caso__escrito">
          <h2 class="t-titulo" id="t-{i}">{esc(h2)}</h2>
          {parrafos_html}
        </div>
      </div>
      {f'<div class="filas"{" data-entra" if entra else ""}>{filas_html}</div>' if filas_html else ''}
    </section>'''


def placa_praxi():
    """El resultado de Praxi como placa de datos: el crudo de la verificación, tal cual, en una fila 16:9."""
    lineas = [l for l in CRUDO_PRAXI.splitlines() if re.match(r'^lib/.+\s\d+/\d+$', l)]
    filas = ''.join(f'<li><span>{esc(l.split()[0])}</span><span>{esc(l.split()[1])}</span></li>' for l in lineas)
    fecha = re.search(r'Fecha UTC: (\S+)', CRUDO_PRAXI).group(1)
    total = re.search(r'TOTAL (\d+/\d+) en (\d+) archivos', CRUDO_PRAXI)
    gate = re.search(r'PASS · (\d+/\d+) checks', CRUDO_PRAXI)
    tsc = re.search(r'## tsc --noEmit\nexit (\d+)', CRUDO_PRAXI)
    return f'''<figure class="figura"><div class="placa-datos" role="img" aria-label="Lectura de la verificación del 16 de octubre de 2026: {esc(total.group(1))} pruebas en {esc(total.group(2))} archivos, {esc(gate.group(1))} reglas de marca, tipos sin errores.">
      <div class="placa-datos__cifras">
        <p><span class="t-cifra">{esc(total.group(1).replace('/', ' / '))}</span><span class="rotulo">vitest run · {esc(total.group(2))} archivos</span></p>
        <p><span class="t-cifra">{esc(gate.group(1).replace('/', ' / '))}</span><span class="rotulo">npm run design-check</span></p>
        <p><span class="t-cifra">exit {esc(tsc.group(1))}</span><span class="rotulo">tsc --noEmit</span></p>
      </div>
      <ul class="placa-datos__lista dato" aria-hidden="true">{filas}</ul>
      <p class="placa-datos__pie rotulo">a360d7a · {esc(fecha)}</p>
    </div><figcaption class="pie">e12/praxi/crudo/verificacion-copia.txt</figcaption></figure>'''


def caso_praxi():
    pre = '../../'
    e = {i: EL[i] for i in EL if i.startswith('praxi.')}
    titulo = dos_tintas(EL['praxi.h1'])
    campos = EL['praxi.ficha']['campos']
    ficha = '<dl class="ficha">' + ''.join(f'<div><dt class="rotulo">{esc(c["rotulo"])}</dt><dd class="dato">{esc(c["valor"])}</dd></div>' for c in campos) + '</dl>'
    creditos = f'<div class="creditos"><p class="rotulo">{txt("praxi.creditos.rotulo")}</p><p>{txt("praxi.creditos")}</p></div>'
    P = lambda i: f'<p class="t-cuerpo">{txt(i)}</p>'
    pie_ej = EL['praxi.pieza.pie-ejemplo']['texto']
    pie_gen = EL['praxi.pieza.pie-generado']['texto']
    # Hipótesis, p2: su condición pide una fila en inventario-praxi.md que no existe → sale (texto-paso2, «condicion»).
    ingredientes = ''.join(
        (lambda m: f'<li>{esc(m.group(1))}<span class="con">{esc(m.group(2))}</span></li>' if m else f'<li>{esc(t)}</li>')(re.match(r'^(.*?)\s\(([^()]*)\)$', t))
        for t in EL['praxi.solucion.ingredientes']['items'])
    # Fila del teléfono en Solución (defecto 2 del acta del paso 2): la conversación trae cifras de ejemplo y la portada,
    # personas generadas; cada captura lleva su pie de Clara debajo (uno solo para las dos diría «esta captura» de una).
    D = '#0F1117'   # el fondo de la marca de Praxi (inventario-praxi §7): el campo es de la pieza, no de la interfaz
    columna = f'''<div class="medio-principal" data-video-autonomo>
      <figure class="figura">
        <div class="medio r169">
          <video muted loop playsinline preload="metadata" poster="{pre}medios/c-praxi-poster.webp" aria-label="{esc(EL['praxi.medio.alt']['texto'])}">
            <source src="{pre}medios/c-praxi-hero.webm" type="video/webm"></video>
          {boton_pausa()}
        </div>
        <figcaption class="pie">{txt('praxi.medio.pie')}</figcaption>
      </figure>
    </div>
    {cabeza_movil(ficha)}
    {seccion_caso('problema', EL['praxi.problema.rotulo']['texto'], EL['praxi.problema.h2']['texto'],
                  P('praxi.problema.p1') + P('praxi.problema.p2'),
                  medio(f'{pre}medios/c-praxi-problema.webp', 'Captura de la portada de Praxi: «Llevas tres meses en 60 kg».', fondo=D, contener=True, w=1440, h=311))}
    {seccion_caso('hipotesis', EL['praxi.hipotesis.rotulo']['texto'], EL['praxi.hipotesis.h2']['texto'],
                  P('praxi.hipotesis.p1'),
                  con_pie(medio(f'{pre}medios/c-praxi-portada.webp', 'La primera pantalla de Praxi: «Se acuerda de cada serie que hiciste», con dos hombres en un press de banca.'), pie_gen))}
    {seccion_caso('solucion', EL['praxi.solucion.rotulo']['texto'], EL['praxi.solucion.h2']['texto'],
                  P('praxi.solucion.p1') + P('praxi.solucion.p2') + P('praxi.solucion.p3') + P('praxi.solucion.p4') +
                  f'<p class="rotulo" style="margin-top:28px">{txt("praxi.solucion.ingredientes.rotulo")}</p><p class="t-chico" style="margin-top:8px">{txt("praxi.solucion.ingredientes.intro")}</p><ul class="ingredientes">{ingredientes}</ul>',
                  con_pie(medio(f'{pre}medios/c-praxi-conversacion.webp', 'Captura de Praxi: un mensaje «Hoy hice press banca 3×10 con 60 kg, RIR 2» y la respuesta del coach, que lo guarda como dato.', fondo=D, contener=True, w=1440, h=500), pie_ej) +
                  '<div class="fila-par">' + con_pie(medio(f'{pre}medios/c-praxi-390-conversacion.webp', 'La misma conversación de ejemplo en un teléfono.', 'r45', 780, 975), pie_ej) +
                  con_pie(medio(f'{pre}medios/c-praxi-390-portada.webp', 'La primera pantalla de Praxi en un teléfono: dos hombres en un press de banca, uno levanta y el otro lo asiste.', 'r45', 780, 975), pie_gen) + '</div>' +
                  medio(f'{pre}medios/p-praxi-reglas.webp', 'Captura de Praxi: «Debajo del chat hay reglas, no una corazonada», con las tres reglas que calcula el código.', fondo=D, contener=True, w=1440, h=526))}
    {seccion_caso('pieza', EL['praxi.pieza.rotulo']['texto'], EL['praxi.pieza.h2']['texto'],
                  P('praxi.pieza.p1') + P('praxi.pieza.p2') + f'<p class="t-chico" style="margin-top:14px">{txt("praxi.pieza.hueco")}</p>',
                  medio(f'{pre}medios/c-praxi-avatar-amarillo.webp', 'El avatar de Praxi: una P y un punto en negro sobre el amarillo de la marca.', 'r169', 800, 800, fondo='#E2F349', contener=True) +
                  con_pie('<div class="fila-mixta"><div class="medio r45" style="background:#0F1117" data-video-autonomo>'
                          f'<video muted loop playsinline preload="none" poster="{pre}medios/c-praxi-reel-poster.webp" aria-label="El reel de la campaña de Praxi: un hombre entrena y encima aparece la conversación con el coach." style="object-fit:contain"><source src="{pre}medios/c-praxi-reel.webm" type="video/webm"></video>{boton_pausa()}</div>'
                          '<div class="fila-pila">' + medio(f'{pre}medios/c-praxi-avatar-oscuro.webp', 'El avatar de Praxi en su versión oscura, con el punto amarillo.', 'r162', 800, 800, fondo='#0F1117', contener=True) +
                          medio(f'{pre}medios/c-praxi-empezar.webp', 'Captura de la página «Lo que te llevas gratis» de Praxi.', 'r162', 1440, 900) + '</div></div>', pie_gen) +
                  con_pie(medio(f'{pre}medios/c-praxi-progreso.webp', 'Captura de Praxi: «Tu progreso, en números», con los gráficos de esfuerzo y de carga.'), pie_ej) +
                  con_pie('<div class="fila-par">' + medio(f'{pre}medios/c-praxi-carrusel-1.webp', 'Lámina del carrusel de Praxi: «La mitad de tus series quizá no cuentan.»', 'r45', 860, 1075) +
                          medio(f'{pre}medios/c-praxi-carrusel-4.webp', 'Lámina del carrusel de Praxi: «Y la próxima semana se acuerda.», con una familia en la mesa.', 'r45', 860, 1075) + '</div>', pie_gen) +
                  medio(f'{pre}medios/c-praxi-planes.webp', 'Captura de la página de planes de Praxi: «Nada de lo que entrenas se pierde».'))}
    {seccion_caso('resultado', EL['praxi.resultado.rotulo']['texto'], EL['praxi.resultado.h2']['texto'],
                  P('praxi.resultado.p1') + P('praxi.resultado.p2'), placa_praxi())}
    <section class="siguiente" aria-labelledby="t-siguiente" data-entra>
      <div class="siguiente__contacto"><div>
        <p class="t-titulo">{dos_tintas_plano(EL['praxi.siguiente.contacto'])}</p>
        <p class="t-cuerpo" style="margin-top:14px">{txt('praxi.siguiente.puente')}</p>
        <div class="acciones"><a class="boton boton--lleno" href="{esc(ruta(EL['praxi.siguiente.boton']['destino'], pre))}">{txt('praxi.siguiente.boton')}</a></div>
      </div></div>
      <div class="siguiente__caso">
        <a class="siguiente__medio" href="{ruta('/v3/trabajo/sesenta/', pre)}" tabindex="-1" aria-hidden="true" data-cursor="{esc(TEXTO['comun']['cursor'][1]['texto'])}">{medio(f'{pre}medios/v-sesenta.webp', VISOR['sesenta'][2], 'r169', 1050, 788)}</a>
        <div>
          <p class="rotulo">{txt('praxi.siguiente.rotulo')}</p>
          <h2 class="siguiente__nombre" id="t-siguiente" style="margin-top:12px"><a href="{ruta('/v3/trabajo/sesenta/', pre)}">{dos_tintas(EL['praxi.siguiente.caso'])}</a></h2>
          <p class="dato" style="margin-top:12px;color:#fff">{esc(ENTRADAS['sesenta']['linea'])}</p>
          <a class="enlace-indice" style="margin-top:10px" href="{ruta('/v3/trabajo/', pre)}">{txt('praxi.siguiente.todo')}</a>
        </div>
      </div>
    </section>'''
    cuerpo = f'''<div class="caso">
  {lateral(titulo, ficha, 'Praxi', creditos, pre)}
  <div class="caso__columna">
    {columna}
  </div>
</div>
{barra_movil('Praxi')}'''
    jsonld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CreativeWork', 'name': 'Praxi', 'description': PAG['caso-praxi']['description'], 'inLanguage': 'es-CL',
         'dateCreated': '2026-07-21', 'creator': {'@type': 'Person', '@id': 'https://spindlelab.cl/#autor-ramon', 'name': 'Ramón Vallejos'},
         'about': {'@type': 'SoftwareApplication', 'name': 'Praxi', 'applicationCategory': 'HealthApplication', 'operatingSystem': 'Web'},
         'publisher': {'@id': ORG['@id']}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': 'https://spindlelab.cl/v3/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Trabajo', 'item': 'https://spindlelab.cl/v3/trabajo/'},
            {'@type': 'ListItem', 'position': 3, 'name': 'Praxi', 'item': 'https://spindlelab.cl/v3/trabajo/praxi/'}]},
        ORG,
    ]}
    return pagina(pre, '/v3/trabajo/praxi/', 'caso-praxi', cuerpo, jsonld)


def dos_tintas_plano(e):
    """Un párrafo que trae «texto» y su parte en gris marcada en el md con cursiva: aquí, todo lo que sigue a la primera coma."""
    if 'gris' in e:
        return dos_tintas(e)
    t = e['texto']
    k = t.find(', ')
    if k < 0:
        return f'<span class="tinta">{esc(t)}</span>'
    return f'<span class="tinta">{esc(t[:k + 1])}</span> <span class="gris">{esc(t[k + 2:])}</span>'


# ================================================================== caso de concepto: Sesenta (texto de Bruno)
def leer_sesenta():
    """Saca del caso.md de Bruno la ficha, cada sección (título en negrita y párrafos) y sus filas."""
    t = CASO_SESENTA
    secs = {}
    for nombre in ['Desafío', 'Estrategia', 'Identidad', 'Aplicación', 'Qué muestra']:
        m = re.search(r'^## ' + nombre + r'\n(.*?)(?=^## |\Z)', t, re.S | re.M)
        cuerpo = m.group(1).strip()
        titulo = re.match(r'\*\*(.+?)\*\*', cuerpo).group(1)
        resto = cuerpo[len(titulo) + 4:].strip()
        bloques = [b.strip() for b in resto.split('\n\n') if b.strip()]
        parrafos = [' '.join(b.split('\n')) for b in bloques if not b.startswith(('|', '*(', 'El pliego completo', '**Cierre', '---'))]
        filas = [b for b in bloques if b.startswith('|')]
        secs[nombre] = {'titulo': titulo, 'parrafos': parrafos, 'filas': filas[0] if filas else ''}
    ficha = {}
    for l in re.search(r'## Ficha lateral\n\n(.*?)\n\n', t, re.S).group(1).splitlines()[2:]:
        c = [x.strip() for x in l.strip('|').split('|')]
        ficha[c[0]] = c[1]
    return secs, ficha


def md_en_linea(s):
    s = esc(s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'\1', s)
    return s


def caso_sesenta():
    pre = '../../'
    secs, ficha_md = leer_sesenta()
    nombre, bajada = [x.strip(' *') for x in ficha_md['Nombre y bajada'].split('/')]
    titulo = f'<span class="tinta">{esc(nombre)}</span> <span class="gris">{esc(bajada)}</span>'
    tipo, anio = [x.strip() for x in ficha_md['Ficha mono'].split('·')]
    ficha = ('<dl class="ficha">'
             f'<div class="concepto"><dt class="rotulo">Tipo</dt><dd class="dato">{esc(tipo.capitalize())}</dd></div>'
             f'<div><dt class="rotulo">Año</dt><dd class="dato">{esc(anio)}</dd></div>'
             f'<div><dt class="rotulo">Rubro</dt><dd class="dato">{md_en_linea(ficha_md["Rubro"])}</dd></div>'
             '</dl>')
    S = f'{pre}medios/'
    A = {   # alt de cada medio, mirando el archivo
        's-suma': 'Placa de Sesenta: la suma de un escrito judicial en papel y la pantalla del sitio que sale de ella.',
        's-logo': 'Placa de Sesenta: la palabra SESENTA y el sello del 60 de doble filete, en blanco sobre azul.',
        's-sello': 'El sello del 60 y su versión a 32 y 16 píxeles.',
        's-paleta': 'Los cinco colores de Sesenta con su rol y su contraste.',
        's-contador': 'Placa de Sesenta: el 60 que baja hasta los días hábiles que quedan.',
        's-letra': 'La letra de Sesenta, Schibsted Grotesk, en sus pesos.',
        's-courier': 'Courier Prime, la letra de los documentos de Sesenta.',
        's-otrosi': 'Un rótulo de escrito judicial, «Primer otrosí», como se usa en el sitio.',
        's-home-1440': 'La primera pantalla del sitio de Sesenta a 1440: el 60 enorme cortado por el marco y la suma en papel.',
        's-home-390': 'La primera pantalla del sitio de Sesenta en un teléfono.',
        's-interior-390': 'La página «¿Qué artículo dice tu carta?» de Sesenta en un teléfono.',
        's-finiquito': 'Placa de Sesenta: un finiquito con cinco notas al margen, sobre azul.',
        's-hoja': 'La hoja de la primera reunión, para imprimir.',
        's-tarjeta': 'Una tarjeta de Sesenta escrita a máquina.',
        's-lector-390': 'El lector de la carta de despido en un teléfono, con el óvalo de tinta.',
        's-lector-1440': 'El lector de la carta en el artículo 161, con el óvalo de tinta sobre la línea.',
        's-interior-1440': 'La página interior de Sesenta en el artículo 161.',
        's-pregunta': 'Placa de Sesenta: «¿Cuánto plazo tengo para demandar…?» y su respuesta, con los datos estructurados que dicen que es concepto.',
    }
    M = lambda n, r='r169', w=1600, h=900: medio(f'{S}{n}.webp', A[n], r, w, h)
    filas = {
        'Desafío': '',
        'Estrategia': M('s-suma'),
        'Identidad': M('s-logo') + '<div class="fila-par">' + M('s-sello', 'r45', 860, 1075) + M('s-paleta', 'r45', 860, 1075) + '</div>' +
                     M('s-contador') + '<div class="fila-mixta">' + M('s-letra', 'r45', 860, 1075) + '<div class="fila-pila">' +
                     M('s-courier', 'r162', 860, 531) + M('s-otrosi', 'r162', 860, 531) + '</div></div>',
        'Aplicación': M('s-home-1440') + '<div class="fila-par">' + M('s-home-390', 'r45', 780, 976) + M('s-interior-390', 'r45', 780, 976) + '</div>' +
                      M('s-finiquito') + '<div class="fila-mixta"><div class="fila-pila">' + M('s-hoja', 'r162', 860, 531) + M('s-tarjeta', 'r162', 860, 531) +
                      '</div>' + M('s-lector-390', 'r45', 780, 976) + '</div>' + M('s-lector-1440') + M('s-interior-1440'),
        'Qué muestra': M('s-pregunta'),
    }
    nombres = ['Desafío', 'Estrategia', 'Identidad', 'Aplicación', 'Qué muestra']
    secciones = ''.join(seccion_caso(i, rot, secs[n]['titulo'], ''.join(f'<p class="t-cuerpo">{md_en_linea(p)}</p>' for p in secs[n]['parrafos']), filas[n])
                        for i, rot, n in zip(IDS_SECCION, SECCIONES_CASO, nombres))
    sig = ENTRADAS[ORDEN[ORDEN.index('sesenta') + 1]]
    img_sig, _, alt_sig = VISOR[sig['id']]
    columna = f'''<div class="medio-principal" data-video-autonomo>
      <figure class="figura">
        <div class="medio r169">
          <video muted loop playsinline preload="metadata" poster="{S}s-poster.webp" aria-label="Recorrido de diez segundos por el sitio de Sesenta: el 60 que baja hasta los días que quedan y el lector de la carta en el 161.">
            <source src="{pre}{PORT}06-sesenta/movimiento/recorrido.webm" type="video/webm"></video>
          {boton_pausa()}
          <img class="solo-movil" src="{S}s-portada-4x5.webp" alt="Portada de Sesenta, concepto: un 60 blanco cortado por el marco sobre el azul de trabajo, con la suma del escrito en papel." width="860" height="1075" loading="eager">
        </div>
      </figure>
    </div>
    {cabeza_movil(ficha)}
    {secciones}
    <section class="siguiente" aria-labelledby="t-siguiente" data-entra>
      <div class="siguiente__contacto"><div>
        <div class="acciones" style="margin-top:0"><a class="boton boton--lleno" href="/v3/contacto/">{txt('praxi.siguiente.boton')}</a></div>
      </div></div>
      <div class="siguiente__caso">
        <a class="siguiente__medio" href="/v3/trabajo/{sig['id']}/" tabindex="-1" aria-hidden="true" data-cursor="{esc(cursor_de(sig))}">{medio(f'{pre}{img_sig}', alt_sig, 'r169', 1080, 810)}</a>
        <div>
          <p class="rotulo">{txt('praxi.siguiente.rotulo')}</p>
          <h2 class="siguiente__nombre" id="t-siguiente" style="margin-top:12px"><a href="/v3/trabajo/{sig['id']}/">{esc(sig['nombre'])}</a></h2>
          <p class="dato" style="margin-top:12px;color:#fff">{esc(sig['linea'])}</p>
          <a class="enlace-indice" style="margin-top:10px" href="{ruta('/v3/trabajo/', pre)}">{txt('praxi.siguiente.todo')}</a>
        </div>
      </div>
    </section>'''
    cuerpo = f'''<div class="caso">
  {lateral(titulo, ficha, nombre, '', pre)}
  <div class="caso__columna">
    {columna}
  </div>
</div>
{barra_movil(nombre)}'''
    jsonld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CreativeWork', 'name': f'{nombre}, pieza de concepto', 'inLanguage': 'es-CL', 'dateCreated': '2026-10-17',
         'genre': 'Concepto', 'disambiguatingDescription': 'Pieza de concepto de SpindleLab: Sesenta no existe y no llevó ninguna causa.',
         'creator': {'@id': ORG['@id']}, 'publisher': {'@id': ORG['@id']}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': 'https://spindlelab.cl/v3/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Trabajo', 'item': 'https://spindlelab.cl/v3/trabajo/'},
            {'@type': 'ListItem', 'position': 3, 'name': nombre, 'item': 'https://spindlelab.cl/v3/trabajo/sesenta/'}]},
        ORG,
    ]}
    PAG['caso-sesenta'] = {'title': f'{nombre}, concepto · Trabajo · SpindleLab',
                           'description': f'{nombre} es una pieza de concepto: {bajada.lower()}. Identidad, sitio y movimiento para un estudio laboral que no existe.'}
    return pagina(pre, '/v3/trabajo/sesenta/', 'caso-sesenta', cuerpo, jsonld)


# ================================================================== /servicios/desarrollo-web/ (vista 5: la hoja)
def desarrollo_web():
    pre = '../../'
    miga = EL['dw.miga']['opciones']
    miga_html = (f'<nav aria-label="Miga" class="miga rotulo"><a href="{ruta("/v3/", pre)}">{esc(miga[0])}</a><span aria-hidden="true">·</span>'
                 f'<a href="/v3/servicios/">{esc(miga[1])}</a><span aria-hidden="true">·</span><span aria-current="page">{esc(miga[2])}</span></nav>')
    incluye = ''.join(f'<p class="t-cuerpo">{con_enlaces(EL[i], pre)}</p>' for i in ['dw.incluye.1', 'dw.incluye.2', 'dw.incluye.3', 'dw.incluye.4', 'dw.incluye.6', 'dw.incluye.7'])
    planes = OFERTA['momentos'][0]['planes']
    planes_html = ''.join(f'''<article class="plan">
        <h3 class="t-titulo">{esc(p['n'])}</h3>
        <p class="plan__precio dato">{esc(p['p'])}</p>
        <p class="plan__linea">{esc(p['d'])}</p>
        <ul>{''.join(f'<li>{esc(x)}</li>' for x in p['puntos'])}</ul>
      </article>''' for p in planes)
    glosario = ''.join(
        (lambda k: f'<div><dt>{esc(t[:k])}:</dt> <dd>{esc(t[k + 2:])}</dd></div>')(t.index(': ')) for t in EL['dw.planes.glosario']['items'])
    fases = ''.join(f'<div class="fase"><p class="rotulo">{esc(EL[f"dw.fase.{n}"]["rotulo"])}</p><p class="t-cuerpo">{txt(f"dw.fase.{n}")}</p></div>' for n in range(1, 6))
    faq = ''.join(f'<div class="pregunta"><h3>{txt(f"dw.faq.{n}.p")}</h3><p class="t-cuerpo">{txt(f"dw.faq.{n}.r")}</p></div>' for n in range(1, 7))
    obra_ids = ['combeau-fotografia', 'praxi', 'sesenta']
    cuerpo = f'''<section class="portada reja" aria-labelledby="titulo-dw" style="padding-top:44px">
  <div style="grid-column:1/-1">{miga_html}</div>
  <h1 class="t-grande" id="titulo-dw" style="grid-column:1/span 13;margin-top:22px;color:#fff">{dos_tintas(EL['dw.h1'])}</h1>
  <div class="cuerpo" style="margin-top:28px">
    <p class="entradilla">{con_enlaces(EL['dw.entradilla'], pre)}</p>
    <div class="acciones">
      <a class="boton boton--lleno" href="#planes">{txt('dw.boton.planes')}</a>
      <a class="boton boton--linea" href="{esc(ruta(EL['dw.boton.escribir']['destino'], pre))}">{txt('dw.boton.escribir')}</a>
    </div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-incluye">
  <span class="cruz" aria-hidden="true"></span>
  <div class="cuerpo" style="grid-row:1">
    <h2 class="t-declaracion titular-seccion" id="titulo-incluye">{dos_tintas(EL['dw.incluye.h2'])}</h2>
    <div class="lista-filetes" style="margin-top:28px" data-entra>{incluye}</div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-obra-dw" data-indice>
  <div class="cuerpo" style="grid-row:1"><h2 class="t-declaracion titular-seccion" id="titulo-obra-dw">{dos_tintas(EL['dw.obra.h2'])}</h2></div>
  {visor(obra_ids, pre).replace('class="riel visor-celda"', 'class="riel visor-celda" style="grid-row:2;margin-top:28px"')}
  <div class="cuerpo" style="grid-row:2;margin-top:28px">
    {tabla_indice(obra_ids, pre, completa=False)}
    <p class="t-chico" style="margin-top:18px;max-width:493px">{txt('dw.obra.concepto')}</p>
    <a class="enlace-dato" href="{ruta('/v3/trabajo/', pre)}">{txt('dw.obra.boton')} {FLECHA}</a>
  </div>
</section>

<section class="reja" id="planes" aria-labelledby="titulo-planes" style="margin-top:120px">
  <div class="hoja" data-entra>
    <div class="hoja__cabeza"><h2 class="t-declaracion" id="titulo-planes">{dos_tintas(EL['dw.planes.h2'])}</h2></div>
    <div class="glosario">
      <p class="rotulo">{txt('dw.planes.glosario.rotulo')}</p>
      <dl>{glosario}</dl>
    </div>
    <div class="planes">{planes_html}</div>
    <p class="hoja__nota">{txt('dw.planes.nota')}</p>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-fases">
  <span class="cruz" aria-hidden="true"></span>
  <div class="cuerpo" style="grid-row:1">
    <h2 class="t-declaracion titular-seccion" id="titulo-fases">{dos_tintas(EL['dw.fases.h2'])}</h2>
    <div style="margin-top:28px" data-entra>{fases}</div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-faq">
  <div class="cuerpo">
    <h2 class="t-declaracion titular-seccion" id="titulo-faq">{txt('dw.faq.h2')}</h2>
    <div style="margin-top:28px">{faq}</div>
  </div>
</section>

<section class="bloque reja" aria-labelledby="titulo-cierre">
  <div class="cuerpo">
    <h2 class="t-grande" id="titulo-cierre" style="max-width:1000px">{dos_tintas(EL['dw.cierre.h2'])}</h2>
    <div class="sub" style="margin-top:32px"><div class="columna-texto">
      <p class="t-cuerpo">{txt('dw.cierre.p')}</p>
      <div class="acciones">
        <a class="boton boton--lleno" href="{esc(ruta(EL['dw.cierre.boton1']['destino'], pre))}">{txt('dw.cierre.boton1')}</a>
        <a class="boton boton--linea" href="{esc(ruta(EL['dw.cierre.boton2']['destino'], pre))}">{txt('dw.cierre.boton2')}</a>
      </div>
      <p style="margin-top:40px"><span class="rotulo">{esc(EL['dw.siguiente']['rotulo'])}</span></p>
      <a class="enlace-dato" href="{esc(ruta(EL['dw.siguiente']['destino'], pre))}">{esc(EL['dw.siguiente']['texto'].replace(' →', ''))} {FLECHA}</a>
    </div></div>
  </div>
</section>
<div class="fin" aria-hidden="true"></div>'''
    faq_ld = [{'@type': 'Question', 'name': EL[f'dw.faq.{n}.p']['texto'], 'acceptedAnswer': {'@type': 'Answer', 'text': EL[f'dw.faq.{n}.r']['texto']}} for n in range(1, 7)]
    jsonld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'Service', 'name': 'Desarrollo web', 'serviceType': 'Desarrollo web a medida', 'areaServed': 'CL', 'provider': {'@id': ORG['@id']},
         'description': PAG['desarrollo-web']['description'],
         'offers': [{'@type': 'Offer', 'name': p['n'], 'priceCurrency': 'CLP', 'price': re.sub(r'\D', '', p['p']) or None,
                     'description': p['p']} for p in planes if re.search(r'\d', p['p'])]},
        {'@type': 'FAQPage', 'mainEntity': faq_ld},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': 'https://spindlelab.cl/v3/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Servicios', 'item': 'https://spindlelab.cl/v3/servicios/'},
            {'@type': 'ListItem', 'position': 3, 'name': 'Desarrollo web', 'item': 'https://spindlelab.cl/v3/servicios/desarrollo-web/'}]},
        ORG,
    ]}
    return pagina(pre, '/v3/servicios/desarrollo-web/', 'desarrollo-web', cuerpo, jsonld)


def escribir(rel, contenido):
    destino = os.path.join(B, rel)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    with open(destino, 'w', encoding='utf-8') as f:
        f.write(contenido)
    print(rel, len(contenido.encode('utf-8')), 'bytes')


escribir('index.html', home())
escribir('trabajo/index.html', trabajo())
escribir('trabajo/praxi/index.html', caso_praxi())
escribir('trabajo/sesenta/index.html', caso_sesenta())
escribir('servicios/desarrollo-web/index.html', desarrollo_web())
