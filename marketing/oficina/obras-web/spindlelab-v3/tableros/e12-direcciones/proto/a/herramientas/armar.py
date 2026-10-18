#!/usr/bin/env python3
"""Dirección A · Archivo: arma las cinco vistas desde el texto de Clara, la oferta y el caso de Sesenta.

Lucía, 17-oct-2026. El texto no se escribe aquí: se lee de
  - e12/texto/texto-paso2.json (Clara, con dos vueltas de lectura fría), tal cual;
  - spindlelab-astro/src/data/oferta-v3.json (los cuatro planes de Desarrollo web: nombre, precio, línea y puntos);
  - marketing/portafolio/06-sesenta/caso.md (Bruno: el caso de concepto; el texto de Clara no lo reescribe).
Lo que no está en esas fuentes y hace falta para que una pantalla funcione (los nombres accesibles de los botones de
pausa, el estado del chequeo, los alt de las imágenes) va listado en direccion-a.md §6.

Uso: python3 -I armar.py   → ../index.html, ../trabajo/index.html, ../trabajo/praxi/index.html,
                             ../trabajo/sesenta/index.html, ../servicios/desarrollo-web/index.html
"""
import html
import json
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent
A = AQUI.parent
REPO = Path("/home/user/spindlelab")
E12 = REPO / "marketing/oficina/obras-web/spindlelab-v3/e12"
TEXTO = json.loads((E12 / "texto/texto-paso2.json").read_text())
OFERTA = json.loads((REPO / "spindlelab-astro/src/data/oferta-v3.json").read_text())
MEDIOS = json.loads((A / "medios/medios.json").read_text())
TRAMOS = json.loads((A / "medios/cinta.json").read_text())
CASO_SESENTA = (REPO / "marketing/portafolio/06-sesenta/caso.md").read_text()
LOGO = (E12 / "logo/camino-2-el-huso/camino-2-el-huso-A-blanco.svg").read_text()
LOGO = LOGO.replace('fill="#FFFFFF"', 'fill="currentColor"').replace("<svg ", '<svg focusable="false" ', 1)

e = html.escape


# ------------------------------------------------------------------ el texto de Clara, por id
def _indice(o, acc):
    if isinstance(o, dict):
        if "id" in o and isinstance(o["id"], str):
            acc[o["id"]] = o
        for v in o.values():
            _indice(v, acc)
    elif isinstance(o, list):
        for v in o:
            _indice(v, acc)
    return acc


T = _indice(TEXTO, {})


def tx(i):
    return T[i]["texto"]


def pagina(pid):
    return next(p for p in TEXTO["paginas"] if p["id"] == pid)


ENTRADAS = {x["id"]: x for x in pagina("trabajo")["entradas"]}

# ------------------------------------------------------------------ rutas: lo construido va relativo, lo demás queda en /v3/
CONSTRUIDAS = {"/v3/": "", "/v3/trabajo/": "trabajo/", "/v3/trabajo/praxi/": "trabajo/praxi/",
               "/v3/trabajo/sesenta/": "trabajo/sesenta/", "/v3/servicios/desarrollo-web/": "servicios/desarrollo-web/"}


def ruta(destino, raiz):
    if destino in CONSTRUIDAS:
        return raiz + CONSTRUIDAS[destino] if (raiz + CONSTRUIDAS[destino]) else "./"
    return destino


def flecha():
    return ('<svg class="flecha" viewBox="0 0 12 12" aria-hidden="true" focusable="false">'
            '<path d="M1 6h9.5M6.5 2l4 4-4 4"/></svg>')


def dos_tintas(el, tag="h2", clase="t-declaracion", attrs=""):
    return (f'<{tag} class="{clase}"{attrs}><span class="tinta">{e(el["tinta"])}</span> '
            f'<span class="gris">{e(el["gris"])}</span></{tag}>')


def img(nombre, alt, raiz, clase="", eager=False, sizes=None):
    m = MEDIOS[nombre]
    w, h = m["px"]
    carga = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    c = f' class="{clase}"' if clase else ""
    return (f'<img{c} src="{raiz}medios/{nombre}" alt="{e(alt)}" width="{w}" height="{h}" {carga} decoding="async">')


def medio(nombre, alt, raiz, prop, eager=False, extra=""):
    return f'<div class="medio p-{prop}">{img(nombre, alt, raiz, eager=eager)}{extra}</div>'


PAUSA = ('<button class="pausa" type="button" aria-pressed="false" aria-label="Pausar el video" '
         'data-pausar="Pausar el video" data-seguir="Seguir el video">'
         '<svg class="icono-pausa" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12"/>'
         '<rect x="8.5" y="1" width="3.5" height="12"/></svg>'
         '<svg class="icono-seguir" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z"/></svg></button>')


def video(nombre, poster, alt, raiz, prop):
    """Un video que corre solo lleva su botón de pausa (WCAG 2.2.2); con movimiento reducido no arranca."""
    return (f'<div class="medio p-{prop}" data-video><video src="{raiz}medios/{nombre}" poster="{raiz}medios/{poster}" '
            f'muted loop playsinline preload="metadata" aria-label="{e(alt)}"></video>{PAUSA}</div>')


def cabecera(raiz, actual=None):
    nav = []
    for b in TEXTO["comun"]["nav"]:
        cur = ' aria-current="page"' if actual and b["destino"] == actual else ""
        nav.append(f'<li><a href="{ruta(b["destino"], raiz)}"{cur}>{e(b["texto"])}</a></li>')
    rot = TEXTO["comun"]["telemetria"][0]["texto"]
    return f'''<header class="cab">
  <div class="cab__placa" aria-hidden="true"></div>
  <div class="cab__fila">
    <a class="cab__logo" href="{ruta('/v3/', raiz)}">{LOGO}</a>
    <nav class="cab__nav" aria-label="Principal"><ul>{''.join(nav)}</ul></nav>
    <p class="cab__hora rotulo">{e(rot)} <span class="vivo" data-hora></span></p>
  </div>
</header>'''


def pie_sitio(raiz):
    rot = TEXTO["comun"]["telemetria"][0]["texto"]
    correo = "hola@spindlelab.cl"
    return f'''<footer class="pie-sitio">
  <a class="cab__logo" href="{ruta('/v3/', raiz)}">{LOGO}</a>
  <a class="rotulo" style="text-transform:none" href="mailto:{correo}">{correo}</a>
  <p class="cab__hora rotulo">{e(rot)} <span class="vivo" data-hora></span></p>
</footer>'''


def documento(raiz, titulo, descripcion, cuerpo, actual=None, pie=True, clase_body=""):
    cb = f' class="{clase_body}"' if clase_body else ""
    return f'''<!doctype html>
<html lang="es-CL" class="sin-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(titulo)}</title>
<meta name="description" content="{e(descripcion)}">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="{raiz}favicon.svg" type="image/svg+xml">
<link rel="preload" href="{raiz}fuentes/google-sans-flex-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{raiz}fuentes/dm-mono-500-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{raiz}a.css">
</head>
<body{cb}>
{cabecera(raiz, actual)}
<main id="contenido">
{cuerpo}
</main>
{pie_sitio(raiz) if pie else ''}
<div class="circulo" aria-hidden="true"></div>
<script src="{raiz}vendor/motion-13.5.0.js"></script>
<script src="{raiz}a.js"></script>
</body>
</html>
'''


# ------------------------------------------------------------------ las portadas del índice (muro de Koto: 4:5, 4:3, 5:3)
PORTADA = {
    "combeau-fotografia": ("combeau-fotografia-45.webp", "45",
                           "La portada de bernardocombeau.cl en un celular: un retrato bañado en luz verde, la frase "
                           "«Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.» "
                           "y el botón «Ver retratos»"),
    "praxi": ("praxi-43.webp", "43", "El avatar de Praxi: una P negra con su punto, sobre el amarillo de la marca"),
    "sesenta": ("sesenta-45.webp", "45", "Portada de Sesenta: un 60 enorme en blanco cortado por el marco, sobre el azul "
                                          "de la ropa de trabajo, con la suma de un escrito en papel"),
    "verifica-y-cumple": ("verifica-y-cumple-53.webp", "53",
                          "La portada de verifica.spindlelab.cl: «¿Estás seguro?» en letras enormes blancas y lima sobre "
                          "azul, y una jinete de traje rosado que lee un papel"),
    "ocelo": ("ocelo-43.webp", "43", "Portada de Ocelo: la C de Landolt sobre una carta de optotipos encendida, con una "
                                      "franja roja y verde abajo"),
    "combeau-modelo": ("combeau-modelo-45.webp", "45",
                       "El book de modelo de Bernardo Combeau en un celular: el menú en inglés y él, de traje azul, "
                       "apoyado en una ventana"),
    "doceavo": ("doceavo-53.webp", "53", "Portada de Doceavo: el año en doce casillas sobre papel verde pálido de libro "
                                          "contable, con puntos rojos en los vencimientos"),
    "chequeo": ("chequeo-43.webp", "43", "La página del chequeo en spindlelab.cl: «¿Te puede leer la IA?», el campo para "
                                          "el dominio y el botón «Revisar mi sitio»"),
    "tonela": ("tonela-45.webp", "45", "Portada de Tonela: ocho bandas verticales de colores, cada una con su tonelaje, y "
                                        "la etiqueta cosida de la marca"),
    "spindlelab": ("spindlelab-53.webp", "53", "La portada de spindlelab.cl hoy, sobre negro: «Un motor de adquisición. "
                                                "No cuatro servicios sueltos.», con el aviso de cookies ya rechazado"),
}
ALTO_MURO = {"45": 655, "43": 393, "53": 314}  # alto de la portada a 524 px de ancho
CASOS_CONSTRUIDOS = {"praxi": "/v3/trabajo/praxi/", "sesenta": "/v3/trabajo/sesenta/"}


def destino_caso(i):
    return CASOS_CONSTRUIDOS.get(i, f"/v3/trabajo/{i}/")


def texto_cursor(entrada):
    c = TEXTO["comun"]["cursor"]
    return c[1]["texto"] if entrada["tipo"] == "Concepto" else c[0]["texto"]


def pieza_muro(i, n, raiz):
    en = ENTRADAS[i]
    nombre_img, prop, alt = PORTADA[i]
    ir = texto_cursor(en)
    return f'''<article class="pieza" data-tipo="{en['tipo'].lower()}" data-orden="{n}" data-alto="{ALTO_MURO[prop]}">
  <a class="medio-enlace" href="{ruta(destino_caso(i), raiz)}" data-ir="{e(ir)}" data-acortar aria-labelledby="p-{i}">
    <div class="medio p-{prop}">{img(nombre_img, alt, raiz)}<span class="pieza__velo"></span></div>
    <span class="quieto rotulo" aria-hidden="true">{e(ir)}</span>
  </a>
  <div class="pieza__txt">
    <h2 class="pieza__nombre" id="p-{i}"><span class="tinta">{e(en['nombre'])}</span> <span class="gris">{e(en['bajada'])}</span></h2>
    <p class="rotulo">{e(en['linea'])}</p>
  </div>
</article>'''


# =================================================================== 1 · HOME
def home():
    raiz = ""
    p = pagina("home")
    hero = next(o for o in T["hero"]["opciones"] if o["recomendada"])
    els = {x["id"]: x for x in hero["elementos"]}
    h1 = els["home.hero.sitio.h1"]
    POR_NOMBRE = {en["nombre"]: k for k, en in ENTRADAS.items()}
    tramos = []
    for t in TRAMOS:
        en = ENTRADAS[POR_NOMBRE[t["nombre"]]]
        tramos.append({k: t[k] for k in ("desde", "hasta", "nombre", "tipo", "nota")} |
                      {"bajada": en["bajada"], "linea": en["linea_corta"],
                       "href": ruta(destino_caso(POR_NOMBRE[t["nombre"]]), raiz)})
    tramos_json = json.dumps(tramos, ensure_ascii=False)
    t0 = tramos[0]
    portada = f'''<section class="portada reticula" aria-labelledby="h1">
  <div class="portada__decl">
    <p class="rotulo">{e(els['home.hero.sitio.rotulo']['texto'])}</p>
    {dos_tintas(h1, 'h1', 't-portada', ' id="h1"')}
    <p class="cuerpo entradilla">{e(els['home.hero.sitio.entradilla']['texto'])}</p>
  </div>
  <div class="portada__cinta" data-cinta>
    <div class="medio p-169">
      <video poster="medios/cinta-poster.webp" muted loop playsinline autoplay preload="auto"
        aria-label="Ocho piezas seguidas, dos segundos cada una: los sitios de Combeau, Praxi y Verifica y Cumple, y las piezas de concepto Sesenta, Tonela, Ocelo y Doceavo"><source src="medios/cinta.webm" type="video/webm"><source src="medios/cinta.mp4" type="video/mp4"></video>
      <p class="marca-medio rotulo" data-cinta-rotulo><span class="tinta">{e(t0['nombre'])}</span> <span class="gris">· {e(t0['tipo'])}</span></p>
      <p class="marca-medio chico" data-cinta-nota hidden style="top:auto;bottom:12px;left:12px;text-transform:none"></p>
      {PAUSA}
    </div>
    <script type="application/json" id="cinta-tramos">{tramos_json}</script>
  </div>
  <div class="portada__lado">
  <div class="cinta__ficha" data-cinta-ficha>
    <p class="rotulo" data-ficha-linea>{e(t0['linea'])}</p>
    <p class="t-titulo t-display"><a class="subrayado" data-ficha-nombre href="{t0['href']}">{e(t0['nombre'])}</a></p>
    <p class="chico" data-ficha-bajada>{e(t0['bajada'])}</p>
    <p class="chico tinta" data-ficha-nota{'' if t0['nota'] else ' hidden'}>{e(t0['nota'])}</p>
  </div>
  <div class="portada__chequeo chequeo" aria-labelledby="chq-rotulo">
    <p class="rotulo tinta" id="chq-rotulo">{e(tx('home.chequeo.rotulo'))}</p>
    <p class="chico">{e(tx('home.chequeo.intro'))}</p>
    <form class="chequeo__form" id="chq-form" data-contacto="/v3/contacto/" novalidate>
      <label class="rotulo" for="chq-dominio">{e(tx('home.chequeo.label'))}</label>
      <div class="chequeo__campo">
        <input id="chq-dominio" name="dominio" type="text" inputmode="url" autocomplete="url" spellcheck="false"
          placeholder="{e(tx('home.chequeo.placeholder'))}" aria-describedby="chq-ayuda">
        <button class="boton boton--claro" id="chq-btn" type="submit">{e(tx('home.chequeo.boton'))}</button>
      </div>
      <p class="chico" id="chq-ayuda">{e(tx('home.chequeo.ayuda'))}</p>
    </form>
    <div id="chq-error" class="chico tinta" role="alert" hidden></div>
    <div id="chq-out" class="chequeo__resultado" aria-live="polite"></div>
  </div>
  </div>
</section>'''

    # Índice corto: Combeau a ancho de columna; Praxi y Verifica y Cumple en par; Sesenta a ancho de columna
    def dest(i, nombre_img, prop, alt, eager=False):
        en = ENTRADAS[i]
        ir = texto_cursor(en)
        return f'''<article class="pieza-dest">
  <a class="medio-enlace" href="{ruta(destino_caso(i), raiz)}" data-ir="{e(ir)}" aria-labelledby="d-{i}">
    {medio(nombre_img, alt, raiz, prop, eager)}
    <span class="quieto rotulo" aria-hidden="true">{e(ir)}</span>
  </a>
  <div class="pieza-dest__txt">
    <h3 class="cuerpo" id="d-{i}" style="font-stretch:100%;font-weight:370"><span class="tinta">{e(en['nombre'])}</span> <span class="gris">{e(en['bajada'])}</span></h3>
    <p class="rotulo">{e(en['linea_corta'])}</p>
  </div>
</article>'''
    obra = f'''<section class="seccion destacados reticula" aria-labelledby="h-obra" data-entrada>
  <div class="destacados__cab">
    {dos_tintas(T['home.obra.h2'], 'h2', 't-declaracion', ' id="h-obra"')}
  </div>
  <div class="destacados__lista">
    {dest('combeau-fotografia', 'combeau-fotografia-169.webp', '169', 'La portada de bernardocombeau.cl a 1440: un retrato bañado en luz verde con la frase «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.»')}
    <div class="fila-par">
      {dest('praxi', 'praxi-45.webp', '45', PORTADA['praxi'][2])}
      {dest('verifica-y-cumple', 'verifica-y-cumple-45.webp', '45', 'La portada de verifica.spindlelab.cl en un celular: «¿Estás seguro?» en blanco y lima sobre azul, sobre la jinete de traje rosado')}
    </div>
    {dest('sesenta', 'sesenta-home-169.webp', '169', 'La primera pantalla del sitio de Sesenta: el plazo de 60 días hábiles para demandar, sobre azul, con el sello de concepto arriba')}
  </div>
  <div class="destacados__pie">
    <p class="chico">{e(tx('home.obra.concepto'))}</p>
    <a class="corchete" href="{ruta(T['home.obra.todo']['destino'], raiz)}">{e(tx('home.obra.todo'))}</a>
  </div>
</section>'''

    def fila_prueba(clave, nombre_img, alt):
        return f'''<div class="prueba__fila borde">
    <div class="prueba__medio">{medio(nombre_img, alt, raiz, '169')}</div>
    <div class="prueba__dato">
      <h3 class="t-titulo">{e(tx(f'home.prueba.{clave}.pieza'))}</h3>
      <p class="cuerpo">{e(tx(f'home.prueba.{clave}.dato'))}</p>
      <p class="ficha-linea"><span class="rotulo">{e(T[f'home.prueba.{clave}.ficha']['campos'][0]['rotulo'])}</span> <span class="dato tinta">{e(T[f'home.prueba.{clave}.ficha']['campos'][0]['valor'])}</span></p>
    </div>
  </div>'''
    prueba = f'''<section class="seccion prueba reticula" aria-labelledby="h-prueba">
  <div class="prueba__cab">
    {dos_tintas(T['home.prueba.h2'], 'h2', 't-declaracion', ' id="h-prueba"')}
    <p class="cuerpo caja">{e(tx('home.prueba.aviso'))}</p>
  </div>
  {fila_prueba('combeau', 'combeau-galeria-169.webp', 'La galería de retratos del sitio de Bernardo Combeau a 1440: Modelos, Corporativos y Retratos masculinos, cada una con su foto y sus años')}
  {fila_prueba('praxi', 'praxi-reglas-169.webp', 'Captura de la landing de Praxi: «Debajo del chat hay reglas, no una corazonada.», con las tres reglas que calcula el código')}
  {fila_prueba('vyc', 'verifica-y-cumple-12-169.webp', 'La sección «Las 12 cosas que tu sitio tiene que dejar publicadas» de verifica.spindlelab.cl, en blanco sobre azul, con los doce puntos en dos columnas')}
</section>'''

    def servicio(c, puerta=False):
        tam = "t-declaracion" if puerta else "t-titulo"
        return f'''<div class="servicio borde{' servicio--puerta' if puerta else ''}">
    <p class="servicio__sit cuerpo">{e(tx(f'home.servicios.{c}.situacion'))}</p>
    <div class="servicio__cuerpo">
      <h3 class="{tam}">{e(tx(f'home.servicios.{c}.nombre'))}</h3>
      <p class="cuerpo caja">{e(tx(f'home.servicios.{c}.texto'))}</p>
      {f'<p class="chico caja">{e(tx("home.servicios.via.escena"))}</p>' if c == 'via' else ''}
    </div>
    <div class="servicio__precio">
      <p class="cuerpo valor">{e(tx(f'home.servicios.{c}.precio'))}</p>
      <a class="boton {'boton--claro' if puerta else 'boton--placa'}" href="{ruta(T[f'home.servicios.{c}.boton']['destino'], raiz)}">{e(tx(f'home.servicios.{c}.boton'))}{flecha()}</a>
    </div>
  </div>'''
    tambien = T["home.servicios.tambien"]
    t_txt = e(tambien["texto"])
    for nombre, destino in tambien["enlaces"].items():
        t_txt = t_txt.replace(e(nombre), f'<a href="{destino}">{e(nombre)}</a>', 1)
    servicios = f'''<section class="seccion servicios reticula" aria-labelledby="h-serv">
  <div class="servicios__cab">
    {dos_tintas(T['home.servicios.h2'], 'h2', 't-declaracion', ' id="h-serv"')}
    <p class="cuerpo caja">{e(tx('home.servicios.guia'))}</p>
  </div>
  {servicio('dw', True)}
  {servicio('via')}
  {servicio('aud')}
  {servicio('aco')}
  <p class="servicios__tambien cuerpo">{t_txt}</p>
</section>'''

    quien = f'''<section class="seccion quien reticula" aria-labelledby="h-quien">
  <div class="quien__retrato" data-entrada>{medio('ramon-vallejos-34.webp', 'Ramón Vallejos, de camisa celeste, sobre fondo oscuro', raiz, '34')}</div>
  <div class="quien__txt">
    {dos_tintas(T['home.quien.h2'], 'h2', 't-declaracion', ' id="h-quien"')}
    <p class="cuerpo caja">{e(tx('home.quien.cv'))}</p>
    <p class="cuerpo caja">{e(tx('home.quien.publicado'))}</p>
    <p><a class="boton boton--placa" href="{ruta(T['home.quien.boton']['destino'], raiz)}">{e(tx('home.quien.boton'))}{flecha()}</a></p>
  </div>
</section>'''

    contacto = f'''<section class="seccion contacto reticula" aria-labelledby="h-contacto">
  <div class="contacto__txt">
    {dos_tintas(T['home.contacto.h2'], 'h2', 't-declaracion', ' id="h-contacto"')}
    <p class="cuerpo caja">{e(tx('home.contacto.que-es'))}</p>
    <p class="cuerpo caja">{e(tx('home.contacto.de-cero'))}</p>
    <p><a class="boton boton--claro" href="{ruta(T['home.contacto.boton']['destino'], raiz)}">{e(tx('home.contacto.boton'))}{flecha()}</a></p>
    <p class="chico"><a href="mailto:hola@spindlelab.cl">{e(tx('home.contacto.correo'))}</a></p>
  </div>
</section>'''
    cuerpo = "\n".join([portada, obra, prueba, servicios, quien, contacto])
    return documento(raiz, p["title"], p["description"], cuerpo, actual="/v3/")


# =================================================================== 2 · /trabajo/
def trabajo():
    raiz = "../"
    p = pagina("trabajo")
    orden = list(ENTRADAS.keys())  # el orden de Clara: un cliente primero, los conceptos intercalados
    cols = [[], []]
    altos = [0, 0]
    for n, i in enumerate(orden, 1):
        k = 0 if altos[0] <= altos[1] else 1
        cols[k].append(pieza_muro(i, n, raiz))
        altos[k] += ALTO_MURO[PORTADA[i][1]] + 110
    tipos = [("todo", 0), ("cliente", 1), ("propio", 2), ("concepto", 3)]
    opciones = T["trabajo.filtro"]["opciones"]
    filtro = "".join(
        f'<li><button type="button" data-tipo="{t}" aria-pressed="{"true" if t == "todo" else "false"}">{e(opciones[k])}</button></li>'
        for t, k in tipos)
    cuerpo = f'''<div class="indice">
  <aside class="indice__lateral" aria-label="{e(T['trabajo.h1']['tinta'].rstrip('.'))}">
    {dos_tintas(T['trabajo.h1'], 'h1', 't-titulo')}
    <p class="rotulo">{e(tx('trabajo.conteo'))}</p>
    <p class="chico">{e(tx('trabajo.entradilla'))}</p>
    <p class="chico">{e(tx('trabajo.nota-herramientas'))}</p>
    <nav class="filtro" data-filtro aria-label="{e(T['trabajo.h1']['tinta'].rstrip('.'))}"><ul>{filtro}</ul></nav>
  </aside>
  <div class="muro">
    <div class="muro__col">{''.join(cols[0])}</div>
    <div class="muro__col">{''.join(cols[1])}</div>
  </div>
</div>'''
    return documento(raiz, p["title"], p["description"], cuerpo, actual="/v3/trabajo/")


# =================================================================== 3 y 4 · el caso, como Koto (§21.5)
def fila(forma, medios, raiz, pie=None):
    """forma: '169', 'par', '45-162', '162-45'. medios: lista de (html_del_medio)."""
    if forma == "169":
        cuerpo = f'<div class="fila">{medios[0]}</div>'
    elif forma == "par":
        cuerpo = f'<div class="fila fila--par">{medios[0]}{medios[1]}</div>'
    elif forma == "45-162":
        cuerpo = f'<div class="fila fila--45-162">{medios[0]}<div class="pila">{medios[1]}{medios[2]}</div></div>'
    else:
        cuerpo = f'<div class="fila fila--162-45"><div class="pila">{medios[0]}{medios[1]}</div>{medios[2]}</div>'
    if pie:
        cuerpo = f'<figure>{cuerpo}<figcaption class="pie">{e(pie)}</figcaption></figure>'
    return cuerpo


def seccion_caso(sid, nombre, h2, parrafos, filas, extra=""):
    """Las cinco secciones llevan su rótulo mono a la vista, también Problema (la introducción de Koto, que allí no lo
    lleva): criterio 6 del encargo y lock §21.5, corregido el 18-oct por el defecto 13 del acta del paso 2."""
    pars = "".join(f'<p class="cuerpo">{e(x)}</p>' for x in parrafos)
    izq = f'<p class="rotulo">{e(nombre)}</p><h2>{e(h2)}</h2>'
    filas_html = f'<div class="filas">{"".join(filas)}</div>' if filas else ""
    return f'''<section class="caso-bloque" id="{sid}" data-nombre="{e(nombre)}" aria-label="{e(nombre)}">
  <div class="caso-sec">
    <div class="caso-sec__izq">{izq}</div>
    <div class="caso-sec__der">{pars}{extra}</div>
  </div>
  {filas_html}
</section>'''


def lateral_caso(h1, linea, datos, indice, creditos_rot, creditos, intro_movil=""):
    dl = "".join(f'<dt class="dato">{e(r)}</dt><dd class="dato">{e(v)}</dd>' for r, v in datos)
    idx = "".join(f'<li><a href="#{sid}" aria-current="{"true" if n == 0 else "false"}">{e(nombre)}</a></li>'
                  for n, (sid, nombre) in enumerate(indice))
    return f'''<aside class="lateral" aria-label="{e(h1['tinta'])}">
  {dos_tintas(h1, 'h1', 't-titulo')}
  <div class="lateral__ficha">
    <p class="rotulo">{e(linea)}</p>
    {f'<dl class="lateral__datos">{dl}</dl>' if dl else ''}
  </div>
  {intro_movil}
  <nav class="lateral__indice" data-indice aria-label="Secciones"><ul>{idx}</ul></nav>
  <div class="lateral__creditos">
    <p class="rotulo">{e(creditos_rot)}</p>
    <p class="chico">{e(creditos)}</p>
  </div>
</aside>'''


def barra_caso(nombre, indice):
    lis = "".join(f'<li><a href="#{sid}" aria-current="{"true" if n == 0 else "false"}">{e(nm)}</a></li>'
                  for n, (sid, nm) in enumerate(indice))
    return f'''<nav class="barra" data-indice aria-label="{e(nombre)}">
  <details>
    <summary><span class="rotulo">{e(nombre)}</span><span class="barra__activa rotulo" data-barra-activa>{e(indice[0][1])}</span><span class="barra__mas" aria-hidden="true">+</span></summary>
    <ul>{lis}</ul>
  </details>
</nav>'''


def praxi():
    raiz = "../../"
    p = pagina("caso-praxi")
    pie_gen = tx("praxi.pieza.pie-generado")
    pie_ej = tx("praxi.pieza.pie-ejemplo")
    ficha = T["praxi.ficha"]
    datos = [(c["rotulo"], c["valor"]) for c in ficha["campos"] if c["rotulo"] in ("Hecho", "Estado")]
    nombres = T["praxi.indice"]["opciones"]
    sids = ["problema", "hipotesis", "solucion", "la-pieza", "resultado"]
    indice = list(zip(sids, nombres))
    M = lambda n, alt, prop: medio(n, alt, raiz, prop)  # noqa: E731
    ingredientes = "".join(
        f'<li>{e(it[:it.rfind(" (")])}<span class="herr">{e(it[it.rfind(" (") + 2:-1])}</span></li>' if it.endswith(")")
        else f'<li>{e(it)}</li>' for it in T["praxi.solucion.ingredientes"]["items"])
    principal = f'''<figure class="medio-principal">
  {video('praxi-hero.webm', 'praxi-hero-poster.webp', tx('praxi.medio.alt'), raiz, '169')}
  <figcaption class="pie">{e(tx('praxi.medio.pie'))}</figcaption>
</figure>'''
    secciones = [
        seccion_caso("problema", nombres[0], tx("praxi.problema.h2"),
                     [tx("praxi.problema.p1"), tx("praxi.problema.p2")], []),
        # El segundo párrafo de Hipótesis sale: su señal («persona activada») no tiene fila en inventario-praxi
        # (condición escrita por Clara en el elemento praxi.hipotesis.p2)
        seccion_caso("hipotesis", nombres[1], tx("praxi.hipotesis.h2"), [tx("praxi.hipotesis.p1")],
                     [fila("par", [M("praxi-portada-390-45.webp", "La portada de Praxi en un celular: «Se acuerda de cada serie que hiciste.», sobre la foto de un hombre que entrena", "45"),
                                   M("praxi-login-390-45.webp", "La entrada de Praxi en un celular, con el lema de antes: «Praxi. Entrena sabiendo por qué.» y el formulario para entrar", "45")], raiz, pie_gen)]),
        seccion_caso("solucion", nombres[2], tx("praxi.solucion.h2"),
                     [tx("praxi.solucion.p1"), tx("praxi.solucion.p2"), tx("praxi.solucion.p3"), tx("praxi.solucion.p4")],
                     [fila("169", [M("praxi-reglas-169.webp", "Captura de la landing de Praxi: «Debajo del chat hay reglas, no una corazonada.», con las tres reglas que calcula el código", "169")], raiz),
                      fila("par", [M("praxi-frase-45.webp", "Captura de Praxi en un celular: una conversación de ejemplo, «Hoy hice press banca 3x10 con 60 kg, RIR 2», y lo que quedó guardado", "45"),
                                   M("praxi-numeros-45.webp", "Captura de Praxi en un celular: «Tu progreso, en números.» y el glosario de los términos del entrenamiento", "45")], raiz, pie_ej),
                      fila("169", [M("praxi-numeros-169.webp", "Captura de la landing de Praxi: cuatro gráficos de progreso con cifras de ejemplo", "169")], raiz, pie_ej)],
                     extra=f'''<p class="rotulo" style="margin-top:16px">{e(tx('praxi.solucion.ingredientes.rotulo'))}</p>
<p class="chico">{e(tx('praxi.solucion.ingredientes.intro'))}</p>
<ul class="ingredientes">{ingredientes}</ul>'''),
        seccion_caso("la-pieza", nombres[3], tx("praxi.pieza.h2"), [tx("praxi.pieza.p1"), tx("praxi.pieza.p2")],
                     [fila("169", [M("praxi-amarillo-169.webp", "La marca de Praxi: la P negra con su punto, grande, sobre el amarillo del acento", "169")], raiz),
                      fila("169", [M("praxi-facebook-169.webp", "La portada de Facebook de Praxi: un hombre que levanta una barra en penumbra y, a la derecha, «Praxi.» y «Entrena sabiendo por qué»", "169")], raiz, pie_gen),
                      fila("45-162", [video('praxi-reel-45.webm', 'praxi-reel-poster-45.webp', 'El reel de campaña de Praxi: un atleta entrena y encima aparece la conversación con el coach', raiz, '45'),
                                      M("praxi-avatar-amarillo-162.webp", "El avatar de Praxi: la P negra con su punto sobre el amarillo de la marca", "162"),
                                      M("praxi-avatar-oscuro-162.webp", "El avatar de Praxi en su versión oscura: la P blanca con el punto amarillo", "162")], raiz, pie_gen),
                      fila("par", [M("praxi-carrusel-1-45.webp", "Primera lámina del carrusel de Praxi: «La mitad de tus series quizá no cuentan.» sobre la foto de un hombre que entrena", "45"),
                                   M("praxi-carrusel-3-45.webp", "Tercera lámina del carrusel de Praxi: «No las cuentas tú.», con un ejemplo de series que cuentan", "45")], raiz, pie_gen + " " + pie_ej)],
                     extra=f'<p class="chico hueco">{e(tx("praxi.pieza.hueco"))}</p>'),
        seccion_caso("resultado", nombres[4], tx("praxi.resultado.h2"),
                     [tx("praxi.resultado.p1"), tx("praxi.resultado.p2")],
                     [fila("169", [M("praxi-empezar-169.webp", "La página «Lo que te llevas gratis» de Praxi, con el botón amarillo «Empezar gratis»", "169")], raiz)]),
    ]
    contacto = T["praxi.siguiente.contacto"]
    sig = T["praxi.siguiente.caso"]
    siguiente = f'''<section class="siguiente" aria-labelledby="h-sig">
  <div class="siguiente__contacto">
    <p class="t-titulo t-display"><span class="tinta">{e(contacto['tinta'])}</span> <span class="gris">{e(contacto['gris'])}</span></p>
    <p class="cuerpo caja">{e(tx('praxi.siguiente.puente'))}</p>
    <a class="boton boton--claro" href="{ruta(T['praxi.siguiente.boton']['destino'], raiz)}">{e(tx('praxi.siguiente.boton'))}{flecha()}</a>
  </div>
  <div class="siguiente__caso">
    <p class="rotulo">{e(tx('praxi.siguiente.rotulo'))}</p>
    <a class="medio-enlace" href="{ruta('/v3/trabajo/sesenta/', raiz)}" data-ir="{e(TEXTO['comun']['cursor'][1]['texto'])}" aria-labelledby="h-sig">
      {medio('sesenta-53.webp', PORTADA['sesenta'][2], raiz, '53')}
      <span class="quieto rotulo" aria-hidden="true">{e(TEXTO['comun']['cursor'][1]['texto'])}</span>
    </a>
    <h2 class="t-siguiente" id="h-sig"><span class="tinta">{e(sig['tinta'])}</span> <span class="gris">{e(sig['gris'])}</span></h2>
    <p class="rotulo">{e(ENTRADAS['sesenta']['linea'])}</p>
    <a class="corchete siguiente__todo" href="{ruta(T['praxi.siguiente.todo']['destino'], raiz)}">{e(tx('praxi.siguiente.todo'))}</a>
  </div>
</section>'''
    lat = lateral_caso(T["praxi.h1"], ficha["linea"], datos, indice, tx("praxi.creditos.rotulo"), tx("praxi.creditos"))
    cuerpo = f'''<div class="caso caso-pagina">
  {lat}
  <div class="columna">
    {principal}
    {''.join(secciones)}
    {siguiente}
  </div>
</div>
{barra_caso(T['praxi.h1']['tinta'], indice)}'''
    return documento(raiz, p["title"], p["description"], cuerpo, actual=None, pie=False)


def sesenta():
    """El caso de concepto: el texto es el de Bruno en 06-sesenta/caso.md (Clara no lo reescribe)."""
    raiz = "../../"
    secs = {}
    for bloque in re.split(r"\n## ", CASO_SESENTA)[1:]:
        titulo, _, resto = bloque.partition("\n")
        m = re.search(r"\*\*(.+?)\*\*", resto)
        h2 = m.group(1) if m else ""
        parrafos = []
        for par in resto[m.end():].split("\n\n") if m else []:
            par = par.strip()
            if not par or par.startswith("|") or par.startswith("*(") or par.startswith("---") or par.startswith("El pliego") or par.startswith("**Cierre"):
                continue
            parrafos.append(" ".join(par.split()))
        secs[titulo.strip()] = (h2, parrafos)
    # Un solo juego de rótulos en los casos (pendiente 1 de Clara): el del lock §21.5, el mismo de Praxi
    nombres = T["praxi.indice"]["opciones"]
    sids = ["problema", "hipotesis", "solucion", "la-pieza", "resultado"]
    koto = ["Desafío", "Estrategia", "Identidad", "Aplicación", "Qué muestra"]
    indice = list(zip(sids, nombres))
    M = lambda n, alt, prop: medio(n, alt, raiz, prop)  # noqa: E731
    sin_md = lambda t: re.sub(r"`([^`]+)`", r"\1", re.sub(r"\*([^*]+)\*", r"\1", t))  # noqa: E731
    filas = {
        "hipotesis": [fila("169", [M("sesenta-suma-169.webp", "Placa de Sesenta: la suma de un escrito judicial, «En lo principal», «Primer otrosí», y la pantalla del sitio que sale de ella", "169")], raiz)],
        "solucion": [
            fila("169", [M("sesenta-logo-169.webp", "Placa de Sesenta: la palabra SESENTA y el sello del 60 con doble filete, en blanco sobre tinta", "169")], raiz),
            fila("par", [M("sesenta-sello-45.webp", "El sello del 60 y sus versiones a 32 y 16 px", "45"),
                         M("sesenta-paleta-45.webp", "Los cinco colores de Sesenta, cada uno con su rol y su contraste", "45")], raiz),
            fila("169", [M("sesenta-contador-169.webp", "El contador de Sesenta: el 60 que baja hasta los días hábiles que quedan, con la línea de tiempo del plazo", "169")], raiz),
            fila("45-162", [M("sesenta-letra-45.webp", "La letra de Sesenta, Schibsted Grotesk, con su escala", "45"),
                            M("sesenta-courier-162.webp", "Courier Prime, la letra de los documentos de Sesenta", "162"),
                            M("sesenta-otrosi-162.webp", "Un rótulo de escrito judicial, «Primer otrosí», con su título en palabras de la persona", "162")], raiz),
        ],
        "la-pieza": [
            fila("169", [M("sesenta-home-169.webp", "La primera pantalla del sitio de Sesenta a 1440, con el sello «Concepto de SpindleLab: Sesenta no existe» arriba", "169")], raiz),
            fila("par", [M("sesenta-home-390-45.webp", "La portada de Sesenta en un celular", "45"),
                         M("sesenta-interior-390-45.webp", "La página «¿Qué artículo dice tu carta?» de Sesenta en un celular", "45")], raiz),
            fila("169", [M("sesenta-finiquito-169.webp", "Placa de Sesenta: un finiquito con cinco notas al margen, sobre tinta", "169")], raiz),
            fila("162-45", [M("sesenta-hoja-162.webp", "La hoja de la primera reunión, para imprimir", "162"),
                            M("sesenta-tarjeta-162.webp", "La tarjeta de Sesenta, con los datos tachados porque es ficticia", "162"),
                            M("sesenta-lector-390-45.webp", "El lector de la carta de Sesenta en un celular", "45")], raiz),
            fila("169", [M("sesenta-lector-169.webp", "El lector de la carta de Sesenta a 1440, con el artículo 161 marcado por un óvalo de tinta", "169")], raiz),
            fila("169", [M("sesenta-interior-169.webp", "La página interior de Sesenta a 1440, en el artículo 161", "169")], raiz),
        ],
        "resultado": [fila("169", [M("sesenta-pregunta-169.webp", "Placa de Sesenta: la pregunta «¿Cuánto plazo tengo para demandar…?» y su respuesta tal como está en el sitio, con el JSON-LD que dice que es concepto", "169")], raiz)],
        "problema": [],
    }
    secciones = []
    for n, (sid, nombre) in enumerate(indice):
        h2, pars = secs[koto[n]]
        secciones.append(seccion_caso(sid, nombre, sin_md(h2), [sin_md(x) for x in pars], filas[sid]))
    principal = f'''<figure class="medio-principal">
  <div class="solo-ancho">{video('sesenta-recorrido.webm', 'sesenta-recorrido-poster.webp', 'Recorrido de diez segundos por el sitio de Sesenta: la portada con el 60, el contador que baja hasta 35 y el lector de la carta en el artículo 161', raiz, '169')}</div>
  <div class="solo-angosto">{M('sesenta-45.webp', PORTADA['sesenta'][2], '45')}</div>
</figure>'''
    h1 = {"tinta": "Sesenta", "gris": "El plazo antes que el juicio"}  # caso.md, ficha lateral, «Nombre y bajada»
    linea = "Concepto · 2026"  # caso.md, «Ficha mono»
    lat = lateral_caso(h1, linea, [], indice, "Lo hecho",  # caso.md, ficha lateral: «Lo hecho»
                       "Identidad (palabra, sello, símbolo, color, letra, recurso propio), sitio (home e interior), movimiento")
    vyc = ENTRADAS["verifica-y-cumple"]
    contacto = T["home.contacto.h2"]
    siguiente = f'''<section class="siguiente" aria-labelledby="h-sig">
  <div class="siguiente__contacto">
    <p class="t-titulo t-display"><span class="tinta">{e(contacto['tinta'])}</span> <span class="gris">{e(contacto['gris'])}</span></p>
    <a class="boton boton--claro" href="{ruta(T['home.contacto.boton']['destino'], raiz)}">{e(tx('home.contacto.boton'))}{flecha()}</a>
  </div>
  <div class="siguiente__caso">
    <p class="rotulo">{e(tx('praxi.siguiente.rotulo'))}</p>
    <a class="medio-enlace" href="{ruta(destino_caso('verifica-y-cumple'), raiz)}" data-ir="{e(TEXTO['comun']['cursor'][0]['texto'])}" aria-labelledby="h-sig">
      {medio('verifica-y-cumple-53.webp', PORTADA['verifica-y-cumple'][2], raiz, '53')}
      <span class="quieto rotulo" aria-hidden="true">{e(TEXTO['comun']['cursor'][0]['texto'])}</span>
    </a>
    <h2 class="t-siguiente" id="h-sig"><span class="tinta">{e(vyc['nombre'])}</span> <span class="gris">{e(vyc['bajada'])}</span></h2>
    <p class="rotulo">{e(vyc['linea'])}</p>
    <a class="corchete siguiente__todo" href="{ruta('/v3/trabajo/', raiz)}">{e(tx('praxi.siguiente.todo'))}</a>
  </div>
</section>'''
    cuerpo = f'''<div class="caso caso-pagina">
  {lat}
  <div class="columna">
    {principal}
    {''.join(secciones)}
    {siguiente}
  </div>
</div>
{barra_caso('Sesenta', indice)}'''
    titulo = "Sesenta, un estudio laboral que no existe · Concepto · Trabajo · SpindleLab"
    desc = ENTRADAS["sesenta"]["bajada"]
    return documento(raiz, titulo, desc, cuerpo, actual=None, pie=False)


# =================================================================== 5 · Desarrollo web: la interior con el juego de Koto
def desarrollo_web():
    raiz = "../../"
    p = pagina("desarrollo-web")
    miga = T["dw.miga"]["opciones"]
    miga_html = (f'<nav class="miga rotulo" aria-label="{e(miga[0])}"><ol><li><a href="{ruta("/v3/", raiz)}">{e(miga[0])}</a></li>'
                 f'<li><a href="/v3/servicios/">{e(miga[1])}</a></li><li><span aria-current="page">{e(miga[2])}</span></li></ol></nav>')
    entr = T["dw.entradilla"]
    entr_txt = e(entr["texto"])
    for nm, dest in entr.get("enlaces", {}).items():
        entr_txt = entr_txt.replace(e(nm), f'<a href="{dest}">{e(nm)}</a>', 1)
    cab = f'''<section class="dw-cab reticula" aria-labelledby="h1">
  {miga_html}
  {dos_tintas(T['dw.h1'], 'h1', 't-declaracion', ' id="h1"')}
  <p class="cuerpo entradilla caja">{entr_txt}</p>
  <div class="botones">
    <a class="boton boton--claro" href="#planes">{e(tx('dw.boton.planes'))}</a>
    <a class="boton boton--placa" href="{ruta(T['dw.boton.escribir']['destino'], raiz)}">{e(tx('dw.boton.escribir'))}{flecha()}</a>
  </div>
</section>
<figure class="franja reticula" style="padding-inline:var(--m)" data-entrada>
  <div class="medio" style="grid-column:1/-1">{img('doceavo-home-169.webp', 'La portada de Doceavo, un estudio contable de concepto, a 1440: «El IVA de septiembre se declara hasta el martes 20 de octubre», sobre papel verde pálido, con el calendario del año a la derecha y la nota «Concepto de SpindleLab» al margen', raiz)}</div>
  <figcaption class="pie" style="grid-column:1/-1"><span class="tinta">{e(ENTRADAS['doceavo']['nombre'])}</span> <span class="rotulo">· {e(ENTRADAS['doceavo']['linea'])}</span></figcaption>
</figure>'''
    incl = T["dw.incluye.h2"]
    incluye_ps = "".join(
        f'<p class="cuerpo">{_enlazar(T[k], raiz)}</p>' for k in
        ("dw.incluye.1", "dw.incluye.2", "dw.incluye.3", "dw.incluye.4", "dw.incluye.6", "dw.incluye.7"))
    incluye = f'''<section class="seccion reticula" aria-labelledby="h-incl">
  <div class="sec-cab">{dos_tintas(incl, 'h2', 't-declaracion', ' id="h-incl"')}</div>
  <div class="lista-txt">{incluye_ps}</div>
</section>'''

    def obra_item(i, nombre_img, alt):
        en = ENTRADAS[i]
        ir = texto_cursor(en)
        return f'''<article>
  <a class="medio-enlace" href="{ruta(destino_caso(i), raiz)}" data-ir="{e(ir)}" data-acortar aria-labelledby="o-{i}">
    {medio(nombre_img, alt, raiz, '45')}
    <span class="quieto rotulo" aria-hidden="true">{e(ir)}</span>
  </a>
  <div class="pieza__txt">
    <h3 class="pieza__nombre" id="o-{i}" style="font-stretch:100%;font-weight:370"><span class="tinta">{e(en['nombre'])}</span> <span class="gris">{e(en['bajada'])}</span></h3>
    <p class="rotulo">{e(en['linea_corta'])}</p>
  </div>
</article>'''
    obra = f'''<section class="seccion reticula" aria-labelledby="h-obra">
  <div class="sec-cab">{dos_tintas(T['dw.obra.h2'], 'h2', 't-declaracion', ' id="h-obra"')}</div>
  <div class="obra3">
    {obra_item('combeau-fotografia', 'combeau-fotografia-45.webp', PORTADA['combeau-fotografia'][2])}
    {obra_item('praxi', 'praxi-45.webp', PORTADA['praxi'][2])}
    {obra_item('sesenta', 'sesenta-45.webp', PORTADA['sesenta'][2])}
  </div>
  <div class="obra3__pie">
    <p class="chico">{e(tx('dw.obra.concepto'))}</p>
    <a class="boton boton--placa" href="{ruta(T['dw.obra.boton']['destino'], raiz)}">{e(tx('dw.obra.boton'))}{flecha()}</a>
  </div>
</section>'''
    glos = "".join(f'<p class="chico">{_glosa(x)}</p>' for x in T["dw.planes.glosario"]["items"])
    planes_html = ""
    for pl in OFERTA["momentos"][0]["planes"]:
        pts = "".join(f"<li>{e(x)}</li>" for x in pl["puntos"])
        planes_html += f'''<article class="plan">
  <div><h3>{e(pl['n'])}</h3><p class="cuerpo plan__precio" style="margin-top:8px">{e(pl['p'])}</p></div>
  <p class="cuerpo">{e(pl['d'])}</p>
  <ul>{pts}</ul>
</article>'''
    planes = f'''<section class="seccion reticula" id="planes" aria-labelledby="h-planes">
  <div class="sec-cab">{dos_tintas(T['dw.planes.h2'], 'h2', 't-declaracion', ' id="h-planes"')}</div>
  <div class="planes">
    <div class="glosario"><p class="rotulo glosario__rot">{e(tx('dw.planes.glosario.rotulo'))}</p>{glos}</div>
    {planes_html}
    <p class="chico planes__nota">{e(tx('dw.planes.nota'))}</p>
  </div>
</section>'''
    fases_html = "".join(
        f'<div class="fase"><p class="t-fase">{e(T[f"dw.fase.{n}"]["rotulo"])}</p><p class="cuerpo caja">{e(tx(f"dw.fase.{n}"))}</p></div>'
        for n in range(1, 6))
    fases = f'''<section class="seccion reticula" aria-labelledby="h-fases">
  <div class="sec-cab">{dos_tintas(T['dw.fases.h2'], 'h2', 't-declaracion', ' id="h-fases"')}</div>
  <div class="fases">{fases_html}</div>
</section>'''
    faq_html = "".join(
        f'<div class="faq__item"><h3>{e(tx(f"dw.faq.{n}.p"))}</h3><p class="cuerpo caja">{e(tx(f"dw.faq.{n}.r"))}</p></div>'
        for n in range(1, 7))
    faq = f'''<section class="seccion reticula" aria-labelledby="h-faq">
  <div class="sec-cab"><h2 class="t-declaracion" id="h-faq">{e(tx('dw.faq.h2'))}</h2></div>
  <div class="faq">{faq_html}</div>
</section>'''
    sig = T["dw.siguiente"]
    cierre = f'''<section class="seccion reticula" aria-labelledby="h-cierre">
  <div class="cierre">
    {dos_tintas(T['dw.cierre.h2'], 'h2', 't-declaracion', ' id="h-cierre"')}
    <p class="cuerpo caja">{e(tx('dw.cierre.p'))}</p>
    <div class="botones">
      <a class="boton boton--claro" href="{ruta(T['dw.cierre.boton1']['destino'], raiz)}">{e(tx('dw.cierre.boton1'))}{flecha()}</a>
      <a class="boton boton--placa" href="{ruta(T['dw.cierre.boton2']['destino'], raiz)}">{e(tx('dw.cierre.boton2'))}</a>
    </div>
    <p style="margin-top:32px"><span class="rotulo">{e(sig['rotulo'])}</span><br><a class="t-titulo t-display subrayado" href="{sig['destino']}">{e(sig['texto'].replace(' →', ''))} {flecha()}</a></p>
  </div>
</section>'''
    cuerpo = "\n".join([cab, incluye, obra, planes, fases, faq, cierre])
    return documento(raiz, p["title"], p["description"], cuerpo, actual="/v3/servicios/")


def _enlazar(el, raiz):
    t = e(el["texto"])
    for nm, dest in el.get("enlaces", {}).items():
        t = t.replace(e(nm), f'<a href="{dest}">{e(nm)}</a>', 1)
    return t


def _glosa(x):
    termino, _, resto = x.partition(":")
    return f'<span class="tinta">{e(termino)}:</span>{e(resto)}'


SALIDAS = {
    A / "index.html": home,
    A / "trabajo/index.html": trabajo,
    A / "trabajo/praxi/index.html": praxi,
    A / "trabajo/sesenta/index.html": sesenta,
    A / "servicios/desarrollo-web/index.html": desarrollo_web,
}
for destino, fn in SALIDAS.items():
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(fn())
    print(destino.relative_to(A), destino.stat().st_size, "bytes")
