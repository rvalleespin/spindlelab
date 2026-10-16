"""E12 · Arma el tablero de la compuerta 1 (`tablero.html`) desde sus fuentes.

Lee:
- `e12/medicion/koto/medicion.json` y `e12/medicion/accept-and-proceed/medicion.json` (valores que se citan) y sus
  capturas (las que se muestran se copian comprimidas a `img/`);
- `e12/inventario-casos.json` (casos, métricas, telemetría y sandboxes verdaderos);
- `e12/brief-de-obra.md` §8 (las preguntas de Mauro, con su opción recomendada);
- `datos/letras.json`, `datos/contraste.json`, `datos/resortes.json`, `datos/atmosfera.json` (lo medido para el lock);
- dos capturas planas de obra real de `spindlelab-astro/public/assets/img/obra/` (solo se leen y se copian).

Escribe `tablero.html` (sin doctype, html, head ni body: lo envuelve el publicador) e `img/manifiesto.json`.
Cada JPEG de `img/` queda en 450 kB o menos y el total en 14 MB o menos (kB = 1.000 bytes); si no, el script falla.

Uso: python3 -I armar-tablero.py   (desde cualquier carpeta)
"""
import html
import json
import os
import re
import sys
from decimal import ROUND_HALF_UP, Decimal

from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(AQUI)  # tableros/e12-laboratorio
V3 = os.path.dirname(os.path.dirname(BASE))  # obras-web/spindlelab-v3
REPO = os.path.abspath(os.path.join(V3, "..", "..", "..", ".."))
E12 = os.path.join(V3, "e12")
KOTO = os.path.join(E12, "medicion", "koto")
AP = os.path.join(E12, "medicion", "accept-and-proceed")
OBRA = os.path.join(REPO, "spindlelab-astro", "public", "assets", "img", "obra")
IMG = os.path.join(BASE, "img")
DATOS = os.path.join(BASE, "datos")
os.makedirs(IMG, exist_ok=True)

MOTION = "https://cdn.jsdelivr.net/npm/motion@13.5.0/dist/motion.js"  # publicada el 1-oct-2026 (npm)
FUENTES = ("https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900"
           "&family=Google+Sans+Flex:wdth,wght@25..151,100..1000&family=DM+Mono:wght@500&display=swap")
GITHUB = "https://github.com/rvalleespin/spindlelab/blob/claude/magical-franklin-ckfki2/"
MAX_IMG = 450_000  # kB = 1.000 bytes, la unidad del inventario y del lock
MAX_TOTAL = 14_000_000


def leer(ruta):
    with open(ruta, encoding="utf-8") as f:
        return json.load(f)


koto = leer(os.path.join(KOTO, "medicion.json"))
ap = leer(os.path.join(AP, "medicion.json"))
inv = leer(os.path.join(E12, "inventario-casos.json"))
letras = leer(os.path.join(DATOS, "letras.json"))
contraste = leer(os.path.join(DATOS, "contraste.json"))
resortes = leer(os.path.join(DATOS, "resortes.json"))
atm = leer(os.path.join(DATOS, "atmosfera.json"))  # herramientas/atmosfera.mjs, segunda vuelta
brief = open(os.path.join(E12, "brief-de-obra.md"), encoding="utf-8").read()

e = html.escape
manifiesto = []


def num(x, dec=2):
    # Redondeo a la mitad hacia arriba sobre el valor escrito (1,325 → 1,33), el mismo que usa el lock. El formato de
    # Python redondeaba 1.325 a 1,32 porque el binario guarda 1,32499…: defecto 14 del acta del paso 1.
    q = Decimal(str(x)).quantize(Decimal(1).scaleb(-dec), rounding=ROUND_HALF_UP)
    return f"{q:.{dec}f}".replace(".", ",")


# ---------------------------------------------------------------- imágenes
def foto(origen, nombre, ancho_max, recorte=None):
    """Copia `origen` a img/<nombre>.jpg, reducido a `ancho_max` px y comprimido hasta 450 kB (450.000 bytes).

    `recorte` (izquierda, arriba, derecha, abajo, en px de la captura) recorta antes de reducir."""
    destino = os.path.join(IMG, nombre + ".jpg")
    im = Image.open(origen).convert("RGB")
    if recorte:
        im = im.crop(recorte)
    if os.path.abspath(origen) == os.path.abspath(destino) and im.width <= ancho_max and os.path.getsize(destino) <= MAX_IMG:
        # La lámina de letras.py ya se escribe en img/: no se vuelve a comprimir en cada corrida (perdería calidad)
        tam = os.path.getsize(destino)
        manifiesto.append({"img": f"img/{nombre}.jpg", "origen": "herramientas/letras.py", "ancho": im.width,
                           "alto": im.height, "bytes": tam, "calidad": "la de letras.py"})
        return {"src": f"img/{nombre}.jpg", "w": im.width, "h": im.height}
    if im.width > ancho_max:
        im = im.resize((ancho_max, round(im.height * ancho_max / im.width)), Image.LANCZOS)
    for q in (82, 78, 74, 70, 66, 62, 58):
        im.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(destino) <= MAX_IMG:
            break
    tam = os.path.getsize(destino)
    if tam > MAX_IMG:
        sys.exit(f"{nombre}: {tam} bytes, pasa de 450 kB")
    manifiesto.append({"img": f"img/{nombre}.jpg", "origen": os.path.relpath(origen, REPO), "ancho": im.width,
                       "alto": im.height, "bytes": tam, "calidad": q, **({"recorte": list(recorte)} if recorte else {})})
    return {"src": f"img/{nombre}.jpg", "w": im.width, "h": im.height}


def figura(f, alt, pie, clase="", carga="lazy"):
    return (f'<figure class="fig {clase}"><img src="{f["src"]}" width="{f["w"]}" height="{f["h"]}" alt="{e(alt)}" '
            f'loading="{carga}" decoding="async"><figcaption>{pie}</figcaption></figure>')


K = lambda n: os.path.join(KOTO, "capturas", n)  # noqa: E731
A = lambda n: os.path.join(AP, "capturas", n)  # noqa: E731

img = {
    "k_trabajo": foto(K("trabajo-1440-primera.jpg"), "koto-trabajo-1440", 1440),
    "k_caso": foto(K("caso-1440-primera.jpg"), "koto-caso-1440", 1440),
    "k_portada": foto(K("home-1440-primera.jpg"), "koto-portada-1440", 1200),
    "k_dos_tintas": foto(K("detalle-tipo-declaracion-1440.jpg"), "koto-dos-tintas", 720),
    "k_cursor": foto(K("detalle-destacado-hover-1440.jpg"), "koto-cursor-destacado", 888),
    "k_pieza_reposo": foto(K("detalle-indice-pieza-reposo-1440.jpg"), "koto-pieza-reposo", 800),
    "k_pieza_hover": foto(K("detalle-indice-pieza-hover-1440.jpg"), "koto-pieza-hover", 800),
    "k_widgets": foto(K("detalle-widgets-1440.jpg"), "koto-telemetria", 1200),
    "k_ficha": foto(K("detalle-tipo-ficha-lateral-caso-1440.jpg"), "koto-ficha-caso", 672),
    "k_trabajo390": foto(K("trabajo-390-primera.jpg"), "koto-trabajo-390", 780),
    "k_caso390": foto(K("caso-390-primera.jpg"), "koto-caso-390", 780),
    "a_trabajo": foto(A("trabajo-1440-pantalla1.jpg"), "ap-trabajo-1440", 1440),
    "a_indice": foto(A("indice-patron-1440.jpg"), "ap-indice-patron", 1200),
    "a_cursor": foto(A("tarjeta-hover-con-cursor-1440.jpg"), "ap-cursor", 704),
    "a_carga": foto(A("carga-secuencia-normal.jpg"), "ap-carga", 1480),
    "a_escala": foto(A("tipografia-escala-1440.jpg"), "ap-escala-tipografica", 1200),
    "a_tabla": foto(A("lista-eva-filetes-1440.jpg"), "ap-tabla-filetes", 1200),
    "a_trabajo390": foto(A("trabajo-390-pantalla1.jpg"), "ap-trabajo-390", 780),
    # La pieza de Vans con su nombre, su bajada y sus dos etiquetas de pilar (defecto 2 del acta: la etiqueta medida)
    "a_etiquetas": foto(A("trabajo-1440-pantalla1.jpg"), "ap-etiquetas", 360, recorte=(32, 444, 392, 816)),
    "letras": foto(os.path.join(IMG, "letras-comparadas.jpg"), "letras-comparadas", 1600),
    "o_verifica": foto(os.path.join(OBRA, "verifica-y-cumple-ancho.jpg"), "obra-verifica-y-cumple", 1440),
    "o_combeau": foto(os.path.join(OBRA, "combeau-fotografia-ancho-2.jpg"), "obra-combeau-fotografia", 1440),
}

# ---------------------------------------------------------------- valores citados de las mediciones
k_cursor = koto["interaccion"]["home1440"]["cursorDestacado"]
assert k_cursor["texto"] == "VIEW CASE" and k_cursor["letra"]["tamano"] == "11px"
k_feed = koto["movimiento"]["variablesDeAnimacion"]["--animate-feed-in-transform"]
k_casos = koto["contenido"]["casos"]["resumen"]
assert k_casos["casos"] == 35 and not k_casos["conPorcentaje"]
ap_cursor = ap["interaccion"]["cursorPropio"]["seguimiento"]
c_pares = {p["uso"].split(":")[0]: p for p in contraste["pares"]}


def par(texto, fondo):
    for p in contraste["pares"]:
        if p["texto"].upper() == texto.upper() and p["fondo"].upper() == fondo.upper():
            return p["contraste"]
    raise KeyError((texto, fondo))


# Atmósfera (datos/atmosfera.json): ningún degradado con color ni púrpura, ningún dibujo grande, en las cuatro páginas
ATM_K = [atm["paginas"][f"koto/{p}"] for p in ("home", "trabajo")]
ATM_A = [atm["paginas"][f"acceptAndProceed/{p}"] for p in ("home", "trabajo")]
assert all(x["degradadosConColor"] == 0 and x["degradadosPurpura"] == 0 and not x["canvasYSvgGrandes"] for x in ATM_K + ATM_A)
# Etiquetas de A&P: cuántas piezas del índice llevan una y cuántas dos (medicion.json, contenido.indice)
_tags = [len(p["tags"]) for p in ap["contenido"]["indice"]]
AP_TAGS = (len(_tags), _tags.count(1), _tags.count(2))
assert AP_TAGS == (20, 12, 8), AP_TAGS
T = contraste["tokens"]
L = contraste["lineas"]
tono = contraste["tonos"]
R = resortes["resortes"]
M = resortes["medido"]
LD = letras["display"]
LC = letras["cuerpo"]
LM = letras["mono"]


def puesto(rol, fam):
    orden = sorted(letras[rol].items(), key=lambda kv: -kv[1]["forma"])
    return [k for k, _ in orden].index(fam) + 1, len(orden)


# ---------------------------------------------------------------- piezas de texto
def dos(tinta, gris):
    return f'<span class="t1">{tinta}</span> <span class="t2">{gris}</span>'


def md_en_linea(t):
    t = e(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    return t


def preguntas_de_mauro():
    sec = brief.split("## 8 · Para Ramón, todo junto", 1)[1].split("**Supuestos", 1)[0]
    items = re.findall(r"^\d\. (.+?)(?=^\d\. |\Z)", sec, flags=re.S | re.M)
    out = []
    for it in items:
        it = " ".join(it.split())
        m = re.match(r"\*\*(.+?)\*\* Recomendado: (.+)", it)
        out.append((m[1], m[2]))
    assert len(out) == 5, out
    sup = " ".join(brief.split("**Supuestos, reversibles en una línea:**", 1)[1].split("## 9", 1)[0].split())
    return out, sup


preguntas, supuestos = preguntas_de_mauro()

# ---------------------------------------------------------------- sección 2: medido
koto_valores = [
    ("Letra", "GT Kotoheim, de Grilli Type, hecha para Koto (licencia exclusiva). Tres cortes: condensado liviano 300 para "
              "titulares (48, 38 y 24 px a 1440), regular 350 para el cuerpo (16 px, línea de 1,25) y mono de 11 px en "
              "mayúsculas para rótulos. <strong>Ni una negrita</strong> en las cuatro páginas."),
    ("Color", f"Lienzo <code>#060606</code> (85 a 96 % de lo que no es imagen), placa <code>#141414</code>, texto corrido "
              f"<code>#989898</code> ({num(contraste['referentes']['koto']['corrido']['contrasteSobreLienzo'])}:1) y lo nombrado en "
              f"blanco ({num(contraste['referentes']['koto']['nombrado']['contrasteSobreLienzo'])}:1). El amarillo está solo en el "
              "logo. <strong>Las imágenes cubren del 33 al 72 % de cada página: el color lo pone el trabajo.</strong>"),
    ("Retícula", "Márgenes de 16 px, 16 columnas con 8 px entre ellas, de borde a borde, sin ancho máximo. Cortes en 834 y "
                 "1194 px."),
    ("Índice", "Barra lateral de 320 px y un muro de dos columnas con tres proporciones (4:5, 4:3, 5:3). "
               "<strong>Sin bordes ni cajas de datos.</strong>"),
    ("Cursor", f"Una etiqueta mono de {k_cursor['letra']['tamano'].replace('px', ' px')}, «{e(k_cursor['texto'])}», sin color, "
               "solo sobre el trabajo. Sigue al mouse sin retardo."),
    ("Hover", "La pieza se acorta 24 px en 167 ms y aparece su bajada. Sin zoom, sin color."),
    ("Movimiento", f"GSAP, scroll nativo, tiempos en cuadros con curvas propias (la entrada: <code>{e(k_feed.split(' ', 1)[1].replace('forwards', '').strip())}</code>). "
                   "<strong>Nada rebota.</strong> Ignora el movimiento reducido."),
    ("Cómo escriben", "Un rótulo de dos palabras y una continuación en gris de 6 a 13. Corchetes solo en un enlace: «[ VIEW ALL ]»."),
    ("Casos", f"{k_casos['casos']} casos, <strong>ninguno con un porcentaje</strong>. Ficha lateral, secciones (Challenge, "
              "Strategy, Identity, Application, Outcome) y uno solo con un resultado medido."),
]
ap_valores = [
    ("Letra", "Messina Sans en un solo peso, 400. Tope de 35 px. <strong>Cero mono</strong>; la home no tiene h1."),
    ("Color", f"Papel <code>#F9F7F3</code>, negro ({num(contraste['referentes']['acceptAndProceed']['negroSobrePapel'])}:1), "
              f"gris al 80 % ({num(contraste['referentes']['acceptAndProceed']['grisAl80SobrePapel'])}:1, <strong>no aprueba</strong>) "
              "y una placa <code>#ECEBE7</code>. <strong>Ningún acento</strong>: el color está todo en las imágenes."),
    ("Retícula", "8 columnas, margen de 44 px a 1440. Títulos en la columna 5 con las cuatro primeras vacías; pares de "
                 "tarjetas con columnas vacías entre ellas."),
    ("Cursor", "Círculo gris de 16 px que sobre un proyecto se vuelve «View Project». "
               + e(re.search(r"Medido con un salto de 800 px: (.+?)\.", ap_cursor)[1]) + "."),
    ("Carga", "Cada imagen espera en un marco gris con su radio real; el contenido sube en 1,5 s. Ignora el movimiento reducido."),
    ("Casos", "La casilla «Metric» está vacía en los 20 casos."),
]


def valores(lista):
    return "<dl class=\"valores\">" + "".join(f"<div><dt>{e(k)}</dt><dd>{v}</dd></div>" for k, v in lista) + "</dl>"


seccion_medido = f"""
<section id="medido" class="seccion registro" aria-labelledby="t-medido">
  <div class="seccion__lado"><p class="rotulo">2</p><h2 id="t-medido">Koto y Accept &amp; Proceed, medidos</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro">{dos('Medidos en el navegador el 16 de octubre, a 1440 y a 390.', 'Cada valor tiene su página y su selector en <code>e12/medicion/koto/medicion.json</code> y <code>e12/medicion/accept-and-proceed/medicion.json</code>.')}</p>

    <h3>Koto</h3>
    <p class="tesis">{dos('Un lienzo casi negro donde la interfaz se retira.', 'Gris, chica, una sola letra en tres cortes y sin negritas. El único color es el del trabajo, y lo único vivo en la interfaz es dato verdadero.')}</p>
    <div class="galeria galeria--2">
      {figura(img['k_portada'], 'Portada de Koto a 1440: pantalla negra con la navegación en mono arriba, la hora con su huso a la derecha y abajo a la izquierda We’re Koto en blanco y The Creative Company en gris', 'La portada: «We’re Koto» a 48 px, en una esquina. Lo grande es el showreel, que sale negro porque el video no corre en el navegador de medición. 1440.')}
      {figura(img['k_trabajo'], 'Índice de trabajo de Koto a 1440: barra lateral oscura con el título a la izquierda y un muro de imágenes en dos columnas a la derecha', 'El índice: barra lateral de 320 px y un muro de dos columnas, sin bordes. 1440.')}
    </div>
    <div class="galeria galeria--3">
      {figura(img['k_caso'], 'Caso de Instagram en Koto a 1440: ficha lateral con secciones y una imagen grande', 'Un caso: ficha lateral pegajosa, índice de secciones con un punto en la activa, rótulo y titular de sección a la izquierda y cuerpo gris a la derecha. 1440.', 'fig--ancha')}
      {figura(img['k_ficha'], 'Ficha lateral de un caso de Koto: título, bajada gris, SOCIAL MEDIA 2026 en mono y las secciones', 'La ficha del caso: tipo y año en mono, verdaderos.')}
    </div>
    <div class="galeria galeria--3">
      {figura(img['k_dos_tintas'], 'Declaración de Koto: la primera parte en blanco y la continuación en gris, al mismo tamaño', 'Dos tintas en una frase: lo nombrado en blanco, la continuación en gris.')}
      {figura(img['k_cursor'], 'Destacado de Koto con el cursor encima: una etiqueta chica que dice VIEW CASE sobre la imagen oscurecida', 'El cursor: etiqueta mono de 11 px, sin color, solo sobre el trabajo.')}
      {figura(img['k_widgets'], 'Panel de Koto abierto: estudios por ciudad, un reloj con la hora de Nueva York y noticias', 'Telemetría verdadera: la hora de cada estudio y sus noticias; «[ ALL ]» es un enlace.')}
    </div>
    <div class="galeria galeria--chica">
      {figura(img['k_pieza_reposo'], 'Una pieza del índice de Koto en reposo: el marco gris oscuro donde espera la imagen, que todavía no cargaba', 'Pieza del índice en reposo. La imagen no había cargado: se ve el marco de la placa donde espera.')}
      {figura(img['k_pieza_hover'], 'La misma pieza al pasar el mouse: el marco más bajo y debajo Instagram en blanco y A new mark with old memories en gris', 'Al pasar el mouse: se acorta 24 px en 167 ms y aparece la bajada, en dos tintas.')}
    </div>
    <div class="galeria galeria--tel">
      {figura(img['k_trabajo390'], 'Índice de Koto a 390: una columna con nombre y bajada bajo cada imagen y el conteo (35) junto al rótulo', 'A 390: una columna, nombre y bajada siempre a la vista, el conteo «(35)».')}
      {figura(img['k_caso390'], 'Caso de Instagram en Koto a 390: la imagen arriba y debajo el título, la bajada gris, SOCIAL MEDIA 2026 en mono y el cuerpo', 'El caso a 390: la ficha arriba, el cuerpo debajo.')}
    </div>
    {valores(koto_valores)}

    <h3>Accept &amp; Proceed</h3>
    <p class="tesis">{dos('Un archivo de trabajo sobre papel claro.', 'Una sola letra, chica; columnas vacías a propósito; la imagen es lo grande y la interfaz no tiene ningún acento.')}</p>
    <div class="galeria galeria--2">
      {figura(img['a_trabajo'], 'Página Work de Accept & Proceed a 1440: título chico arriba a la derecha y dos imágenes', 'Work: el título en la columna 5, las cuatro primeras vacías. 1440.')}
      {figura(img['a_indice'], 'Índice de Accept & Proceed: pares de imágenes de distinto ancho con espacio vacío entre ellas', 'Pares con columnas vacías y 149 px entre filas. Sin bordes.')}
    </div>
    <div class="galeria galeria--2">
      {figura(img['a_cursor'], 'Tarjeta de Accept & Proceed con el cursor encima: una pastilla gris translúcida que dice View Project', '«View Project»: el cursor dice adónde lleva, sin color.')}
      {figura(img['a_tabla'], 'Tabla de episodios de Accept & Proceed con filetes de un pixel', 'Filetes de 1 px: en las etiquetas de cada pieza y en una tabla.')}
    </div>
    <div class="galeria galeria--3">
      {figura(img['a_carga'], 'Nueve cuadros de la carga de una página de Accept & Proceed: primero rectángulos grises, después el contenido', 'La carga: cada bloque espera en un marco gris con su radio real y el contenido entra después.', 'fig--ancha')}
      {figura(img['a_escala'], 'Escala tipográfica de Accept & Proceed medida: una sola letra en siete tamaños, cada muestra con su rótulo de medición en magenta', 'Una letra, un peso, de 35 a 7,5 px. Los rótulos en magenta son de la medición, no del sitio.')}
    </div>
    <div class="galeria galeria--tel">
      {figura(img['a_trabajo390'], 'Página Work de Accept & Proceed a 390: título negro, bajada gris grande y la primera pieza con su nombre y dos etiquetas con borde', 'A 390: el título, la bajada en gris y cada pieza con nombre y etiquetas.')}
    </div>
    {valores(ap_valores)}
  </div>
</section>"""

# ---------------------------------------------------------------- sección 3: qué tomamos
tomamos = [
    "La interfaz que se retira: papel, una placa apenas más oscura, gris para lo que se lee y tinta para lo que se nombra. El color lo pone el trabajo.",
    "Una sola letra en dos cortes y sin negritas: titulares condensados y livianos, cuerpo regular, y una mono para los datos.",
    "Dos tintas en una frase: la parte en tinta nombra y la gris explica qué le hace al cliente. Así no damos nada por sabido.",
    "El índice de Koto: un muro sin bordes, con el tipo, el año y hasta dos ingredientes verificados en una línea mono bajo cada pieza.",
    "El caso de Koto: ficha lateral con secciones y un punto en la sección que estás leyendo.",
    "La pieza del índice que se acorta cuando pasas el mouse.",
    "El reloj, los conteos y la ficha: datos que se recalculan.",
    "De A&amp;P, la carga: cada imagen espera en un marco del color de la placa.",
]
no_tomamos = [
    "El negro de Koto: pediste claro, y A&amp;P muestra que el sistema funciona en papel.",
    "GT Kotoheim y Messina: una es exclusiva de Koto y la otra es de pago.",
    "Entradas atadas al scroll, texto que sube línea por línea y el scroll suavizado.",
    "El vidrio con desenfoque y el velo negro sobre la imagen.",
    "Los grises que no se leen (2,89:1 en Koto, 2,41:1 en A&amp;P) y la letra de 9 px.",
    "Que ignoren a quien pide menos movimiento: los dos lo hacen.",
    "La entrada de 1,5 s de A&amp;P: la de Koto llega al 90 % en menos de un tercio de lo que tarda la de A&amp;P (261 contra 850 ms).",
    "La etiqueta con filete e icono que A&amp;P pone bajo cada pieza: su gris no aprueba contraste y, con nuestros ingredientes, serían nubes de cajas.",
]
brief_puntos = [
    ("Claro: <code>#F6F6F4</code>, <code>#EFEFEA</code>, <code>#FFFFFF</code>, <code>#111111</code>, <code>#666663</code>",
     "Koto es negro; A&amp;P es claro y funciona", "<strong>Se queda.</strong> Cada color con un rol (abajo, en los tokens). Los que llevan texto aprueban contraste en las tres superficies."),
    ("Filosofía «Form &amp; Intelligence»: alta costura visual y arquitectura de software e IA propietaria",
     "Koto no rotula su filosofía: la dice en una frase llana («Built on optimism. Driven by collaboration. Defined by craft.»). A&amp;P tampoco tiene lema",
     "<strong>Queda como estructura, no como lema.</strong> La forma es el trabajo plano en su marco y la letra; la inteligencia, la línea mono con datos que se recalculan y los sandboxes verdaderos. Se juntan en Craft y Logic: la pieza al lado de lo que la prueba. «IA propietaria» no va: no hay un proyecto así a la vista."),
    ("Atmósfera: microinteracciones táctiles, sin redes neuronales dibujadas ni gradientes púrpura",
     f"Koto: pocas microinteracciones, y cada una responde a algo que hiciste (la pieza se acorta, el menú se aclara en 167 ms); ninguna rebota. Medido hoy en la home y el índice: Koto tiene {ATM_K[0]['degradados']} y {ATM_K[1]['degradados']} degradados, todos grises (el velo de la parte baja de los destacados y los del aviso de cookies); A&amp;P, {ATM_A[0]['degradados'] + ATM_A[1]['degradados']}. Ninguno con color, ninguno púrpura y ningún dibujo grande en canvas o SVG",
     f"<strong>Se toma.</strong> Lo táctil son los tres resortes que responden a quien visita, con techo por página; en el teléfono, lo que el hover muestra queda a la vista. El único color de la interfaz es el cobalto ({num(tono['#0029FF (brief)']['H'], 0)}° en OKLCH, no el índigo de {num(tono['indigo-500 (Tailwind)']['H'], 0)}°) y la imagen es siempre trabajo real."),
    ("Líneas de 1 px al 8 %", f"Koto: dos líneas, de {num(L['koto_separador_blanco10_sobre_060606'])} y {num(L['koto_filete_2d2d2d_sobre_060606'])} de contraste",
     f"<strong>Se queda, y se suma una al 18 %</strong> para el borde de cada sección: la tuya da {num(L['brief_08_sobre_papel']['contraste'])}, la de Koto {num(L['koto_filete_2d2d2d_sobre_060606'])}."),
    ("Cobalto <code>#0029FF</code> o <code>#0B25B7</code> «únicamente para estados activos, cursores magnéticos y telemetría de código vivo»", "Koto tiene un solo color, puro, en un solo lugar",
     "<strong>Se queda el <code>#0029FF</code></strong>, el puro, y marca solo lo que responde a quien visita. El oscuro era la versión segura de lo mismo."),
    ("Titulares geométricos anchos en negrita; Space Grotesk o Plus Jakarta Sans", "Koto: condensada, liviana, cero negritas",
     f"<strong>Cambia.</strong> Medidas contra la letra de Koto, quedan {puesto('display', 'Space Grotesk')[0]}.ª y {puesto('display', 'Plus Jakarta Sans')[0]}.ª de {puesto('display', 'Space Grotesk')[1]}, y no se pueden condensar. Además las marcaste como cliché."),
    ("Mono: Geist Mono o JetBrains Mono", "Koto: mono de 11 px en mayúsculas",
     f"<strong>Cambia a DM Mono.</strong> Geist Mono se parece mucho pero es la que trae la plantilla de Next.js; JetBrains Mono queda {puesto('mono', 'JetBrains Mono')[0]}.ª de {puesto('mono', 'JetBrains Mono')[1]}."),
    ("Bento brutalista con bordes y cajas de datos", "Ni Koto ni A&amp;P lo usan",
     "<strong>Cambia.</strong> Las cajas de datos pedirían datos que no tenemos. El dato va en una línea mono bajo cada pieza."),
    ("Etiquetas de ingredientes al lado de cada proyecto: «[React]», «[Modelos RAG]», «[WebGL]», «[Estrategia C-Level]»",
     f"Koto: ninguna etiqueta con borde; el tipo y el año van en una línea mono («SOCIAL MEDIA · 2026»). A&amp;P: bajo cada pieza, una o dos etiquetas con filete de 1 px y un icono ({AP_TAGS[1]} y {AP_TAGS[2]} de {AP_TAGS[0]} piezas), que nombran uno de sus tres pilares; su texto gris queda a {num(contraste['referentes']['acceptAndProceed']['grisAl80SobrePapel'])}:1."
     f'<img class="puntos__img" src="{img["a_etiquetas"]["src"]}" width="{img["a_etiquetas"]["w"]}" height="{img["a_etiquetas"]["h"]}" alt="Pieza de Vans en el índice de Accept &amp; Proceed: la imagen, el nombre en negro, la bajada en gris y dos etiquetas con borde fino y un icono, New Ambition y New Expressions" loading="lazy" decoding="async">',
     "<strong>Van en la línea mono, solo las verificadas: hasta dos por pieza en el índice</strong> y todas en el caso. De A&amp;P tomamos la medida (una o dos por pieza), no la forma: su gris no aprueba contraste, cada etiqueta pide un icono y, con 2 a 9 ingredientes por proyecto, serían nubes de cajas con borde. Las cuatro de tu ejemplo no se usaron en ningún proyecto. Sin corchetes."),
    ("Titular monumental pegado a los márgenes", "Koto: 48 px en una esquina. A&amp;P: 35 px",
     "<strong>Lo decides en la compuerta 2:</strong> una dirección lo trae y la otra usa la escala de Koto."),
    ("Ficha mono «[ LAB_STATUS: ACTIVE ]» y, en tu segundo texto, «[ LAB_01 ]»", "Koto: «SOCIAL MEDIA · 2026», la hora con su huso",
     "<strong>La ficha sí, con datos verdaderos</strong> (la hora de Santiago, el tipo, el año). «LAB_STATUS» y «LAB_01» no: declaran un estado o numeran sin nada detrás. Corchetes solo alrededor de un enlace, como Koto."),
    ("«LAT. 33.44° S | SYS. ACTIVO | VOL. 04»", "Koto no tiene ningún dato de adorno",
     "<strong>No.</strong> Tu texto dice que no significan nada, y un número de adorno hace dudar de los verdaderos."),
    ("Cursor: círculo de color que dice «Ver despliegue»", "Koto y A&amp;P: el cursor dice adónde lleva, sin color",
     "<strong>Sí:</strong> círculo cobalto que dice adónde lleva, solo sobre el trabajo y solo con mouse. <strong>Magnético, no:</strong> el círculo va donde va el puntero; ni Koto ni A&amp;P lo atraen, y uno que se corre hacia el centro de la pieza deja de decir dónde estás."),
    ("Craft y Logic lado a lado", "Ningún referente lo tiene",
     "<strong>Sí, con datos reales:</strong> la pieza al lado de lo que la prueba (su chequeo, su peso, sus datos), con fecha."),
    ("Sandboxes: «Ejecutar optimización», pasar a wireframe", "Ningún referente",
     "<strong>Solo los verdaderos:</strong> el chequeo, la página como la lee un robot y un modo esqueleto que dibuja la retícula real."),
    ("Casos con métrica C-Level (+X %)", "Koto: 0 porcentajes en 35 casos. A&amp;P: «Metric» vacío en 20",
     "<strong>Problema, hipótesis, solución y resultado medido</strong>, o «sin métrica» dicho con todas sus letras."),
    ("Framer Motion con resortes", "Koto: curvas propias, nada rebota",
     "<strong>Motion</strong> (la misma librería, sin React) con tres resortes ajustados a los tiempos de Koto."),
    ("Líneas de corte y registro cruzadas en las esquinas", "Koto: ninguna marca de corte; los filetes se cuentan con los dedos",
     "<strong>Una cruz chica, del mismo gris que el borde, donde el borde de sección cruza el límite de la barra lateral</strong>; dos por página como máximo, y la retícula completa solo en el modo esqueleto. Koto no trae ninguna: es lo mínimo de tu idea, y si en la compuerta 2 se lee como adorno, sale."),
    ("Next.js", "", "<strong>No:</strong> Astro, como respondiste."),
]

seccion_tomamos = f"""
<section id="tomamos" class="seccion" aria-labelledby="t-tomamos">
  <div class="seccion__lado"><p class="rotulo">3</p><h2 id="t-tomamos">Qué tomamos y qué no</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro">{dos('Koto manda en el sistema.', 'Accept &amp; Proceed solo prueba que funciona en claro y presta la carga. De tu brief queda la intención; la forma cambia donde lo medido dice otra cosa, y aquí está por qué.')}</p>
    <div class="dos-listas">
      <div><h3>Tomamos</h3><ul class="lista">{''.join(f'<li>{t}</li>' for t in tomamos)}</ul></div>
      <div><h3>No tomamos</h3><ul class="lista">{''.join(f'<li>{t}</li>' for t in no_tomamos)}</ul></div>
    </div>
    <h3>Tu brief, punto por punto</h3>
    <ol class="puntos">
      {''.join(f'<li><p class="puntos__pedido"><span class="rotulo">Pediste</span>{a}</p><p class="puntos__medido"><span class="rotulo">Lo medido</span>{b or "Sin medición: es una decisión de stack"}</p><p class="puntos__decision"><span class="rotulo">Qué hacemos</span>{c}</p></li>' for a, b, c in brief_puntos)}
    </ol>
  </div>
</section>"""

# ---------------------------------------------------------------- sección 4: tokens
fichas = [
    ("--papel", T["papel"], "El lienzo de todas las páginas.", [("texto en tinta", par(T["tinta"], T["papel"])), ("en gris", par(T["gris"], T["papel"])), ("en cobalto", par(T["senal"], T["papel"]))]),
    ("--placa", T["placa"], "Encabezado plegado, menú, panel de datos y el marco donde espera cada imagen. Nunca una tarjeta.", [("tinta", par(T["tinta"], T["placa"])), ("gris", par(T["gris"], T["placa"])), ("cobalto", par(T["senal"], T["placa"]))]),
    ("--hoja", T["hoja"], "Solo donde escribes (el campo del chequeo) o lees lo que devolvió una máquina.", [("tinta", par(T["tinta"], T["hoja"])), ("gris", par(T["gris"], T["hoja"])), ("cobalto", par(T["senal"], T["hoja"]))]),
    ("--tinta", T["tinta"], "Lo que se nombra: titulares, la primera parte de la frase, enlaces y el foco del teclado.", [("sobre papel", par(T["tinta"], T["papel"]))]),
    ("--gris", T["gris"], "La continuación de la frase, el cuerpo y los rótulos en reposo.", [("sobre papel", par(T["gris"], T["papel"])), ("sobre placa, el par más justo", par(T["gris"], T["placa"]))]),
    ("--senal", T["senal"], "Lo que responde a ti: el círculo del cursor, lo que elegiste y el resultado de tu visita. Nunca fondos, botones ni titulares.", [("sobre papel", par(T["senal"], T["papel"])), ("texto blanco encima", par("#FFFFFF", T["senal"]))]),
]


def ficha(nombre, hexa, rol, pares):
    # Un solo atributo style: con dos, el navegador descarta el segundo y el contorno de las fichas claras no existía
    # (defecto 3 del acta del paso 1). Las tres claras llevan el contorno de sección para verse sobre el papel.
    estilo = f"background:{hexa}" + (";outline:1px solid var(--linea-seccion);outline-offset:-1px" if hexa.upper() in ("#FFFFFF", "#F6F6F4", "#EFEFEA") else "")
    pp = "".join(f"<li><span>{e(k)}</span> <span class=\"dato\">{num(v)}:1</span></li>" for k, v in pares)
    return (f'<li class="ficha"><span class="ficha__chip" style="{estilo}"></span>'
            f'<div><p class="ficha__nombre"><code>{nombre}</code> <span class="dato">{hexa}</span></p><p class="ficha__rol">{rol}</p>'
            f'<ul class="ficha__pares">{pp}</ul></div></li>')


mona, gsf = LD["Mona Sans"], LD["Google Sans Flex"]
mona_c, gsf_c = LC["Mona Sans"], LC["Google Sans Flex"]
dm = LM["DM Mono"]
MUESTRA_A, MUESTRA_B = "Diseñamos experiencias.", "Programamos inteligencia."
CUERPO = "Un estudio de diseño y tecnología construyendo infraestructura digital a medida para líderes con visión."


def opcion(n, nombre, clase, d, c, nota):
    return f"""
    <article class="opcion {clase}">
      <p class="rotulo">Opción {n} · {e(nombre)} · {nota}</p>
      <p class="muestra muestra--48">{MUESTRA_A}</p>
      <p class="muestra muestra--38">{dos(MUESTRA_A, MUESTRA_B)}</p>
      <p class="muestra muestra--24">{MUESTRA_A} {MUESTRA_B}</p>
      <p class="muestra-cuerpo">{CUERPO}</p>
      <p class="dato">Titular: ancho {d['instancia'].get('wdth'):g} · peso {round(d['instancia'].get('wght')):d} · forma {num(d['forma'], 3)} · ancho de frase {num(d['anchoFrase'])}<br>Cuerpo: ancho 100 · peso {round(c['instancia'].get('wght')):d} · forma {num(c['forma'], 3)}</p>
    </article>"""


reg_svg = """
<div class="registro-caja">
<svg class="registro-dibujo" viewBox="0 0 1440 360" role="img" aria-labelledby="reg-t reg-d">
  <title id="reg-t">Retícula de 1440 px con las líneas de registro</title>
  <desc id="reg-d">Margen de 16 px, dieciséis columnas con 8 px entre ellas, la barra lateral de 320 px (sombreada solo en el dibujo: en la página no tiene fondo ni borde), el borde de una sección al 18 % y una cruz de registro del mismo gris donde ese borde cruza el límite de la barra, rodeada por un círculo que la señala.</desc>
  <rect x="0" y="0" width="1440" height="360" fill="var(--papel)"/>
  <g fill="var(--placa)">COLUMNAS</g>
  <rect x="16" y="40" width="320" height="300" fill="var(--placa)" opacity=".9"/>
  <line x1="16" y1="120.5" x2="1424" y2="120.5" stroke="rgba(17,17,17,.18)" stroke-width="1"/>
  <line x1="352" y1="200.5" x2="1424" y2="200.5" stroke="rgba(17,17,17,.08)" stroke-width="1"/>
  <line x1="352" y1="260.5" x2="1424" y2="260.5" stroke="rgba(17,17,17,.08)" stroke-width="1"/>
  <g stroke="rgba(17,17,17,.18)" stroke-width="1"><line x1="331.5" y1="120.5" x2="340.5" y2="120.5"/><line x1="336.5" y1="116" x2="336.5" y2="125"/></g>
  <circle cx="336.5" cy="120.5" r="22" fill="none" stroke="var(--gris)" stroke-width="2" stroke-dasharray="4 4"/>
</svg>
NUMEROS
</div>"""
cols = []
x = 16.0
for i in range(16):
    cols.append(f'<rect x="{x:.1f}" y="40" width="79.5" height="300" opacity=".55"/>')
    x += 79.5 + 8
reg_svg = reg_svg.replace("COLUMNAS", "".join(cols))
# cada número (su esquina de arriba a la izquierda), en % del dibujo de 1440 × 360, para que mida 11 px también a 360
reg_svg = reg_svg.replace("NUMEROS", "".join(
    f'<span class="registro-num rotulo" style="left:{x / 1440 * 100:.2f}%;top:{y / 360 * 100:.2f}%" aria-hidden="true">{n}</span>'
    for n, x, y in ((1, 372, 70), (2, 372, 168), (3, 296, 66), (4, 24, 8))))

# gráfico de resortes: tres paneles pequeños, misma escala de tiempo
PANELES = [
    ("cursor", "Cursor", [("apCursor", "A&P: 90 % a 75 ms")]),
    ("estado", "Estado (hover)", [("kotoHover", "Koto: 167 ms lineal")]),
    ("entrada", "Entrada", [("kotoFeedIn", "Koto: 0,5 s (0,0,0,1)"), ("apEntrada", "A&P: 1,5 s")]),
]
X0, X1, Y0, Y1, TMAX = 44, 388, 176, 24, 600


def xs(t):
    return X0 + (X1 - X0) * t / TMAX


def ys(v):
    return Y0 - (Y0 - Y1) * v


def panel(clave, titulo, medidas):
    r = R[clave]
    pts = " ".join(f"{xs(t):.1f},{ys(v):.1f}" for t, v in r["serie"] if t <= TMAX)
    capas = []
    nombres = []
    datos_js = {"resorte": [[t, v] for t, v in r["serie"] if t <= TMAX], "medidas": []}
    for i, (mk, etiqueta) in enumerate(medidas):
        m = M[mk]
        if "serie" in m:
            serie = [[t, v] for t, v in m["serie"] if t <= TMAX]
            dash = "6 4" if i == 0 else "2 4"
            capas.append(f'<polyline points="{" ".join(f"{xs(t):.1f},{ys(v):.1f}" for t, v in serie)}" fill="none" stroke="var(--gris)" stroke-width="2" stroke-dasharray="{dash}"/>')
            nombres.append(f'<span class="g-l g-l--{"rayas" if i == 0 else "puntos"}"></span> {e(etiqueta)}')
            datos_js["medidas"].append({"etiqueta": etiqueta, "serie": serie})
        else:
            capas.append(f'<circle cx="{xs(m["t90"]):.1f}" cy="{ys(0.9):.1f}" r="5" fill="var(--papel)" stroke="var(--gris)" stroke-width="2"/>')
            nombres.append(f'<span class="g-punto"></span> {e(etiqueta)}')
            datos_js["medidas"].append({"etiqueta": etiqueta, "punto": [m["t90"], 0.9]})
    ejes = "".join(f'<line x1="{X0}" y1="{ys(v):.1f}" x2="{X1}" y2="{ys(v):.1f}" stroke="var(--linea)"/><text x="{X0 - 8}" y="{ys(v) + 4:.1f}" text-anchor="end" class="g-ej">{num(v, 1) if v not in (0, 1) else int(v)}</text>' for v in (0, 0.5, 0.9, 1))
    ejes += "".join(f'<text x="{xs(t):.1f}" y="{Y0 + 22}" text-anchor="middle" class="g-ej">{t}</text>' for t in (0, 200, 400))
    ejes += f'<text x="{X1 + 8}" y="{Y0 + 22}" text-anchor="end" class="g-ej">600 ms</text>'
    resumen = f"Resorte {titulo.lower()}: 90 % a {r['t90']} ms, 99 % a {r['t99']} ms, sin sobrepaso."
    return f"""
      <figure class="g-panel" data-clave="{clave}">
        <svg viewBox="0 0 400 210" role="img" aria-label="{e(resumen)}">
          {ejes}
          {''.join(capas)}
          <polyline points="{pts}" fill="none" stroke="var(--tinta)" stroke-width="2"/>
          <line class="g-cruz" x1="0" y1="{Y1}" x2="0" y2="{Y0}" stroke="var(--tinta)" stroke-width="1" visibility="hidden"/>
          <rect class="g-zona" x="{X0}" y="{Y1 - 10}" width="{X1 - X0}" height="{Y0 - Y1 + 10}" fill="transparent"/>
        </svg>
        <figcaption><span class="t1">{e(titulo)}</span> <span class="t2">{r['stiffness']} · {r['damping']} · {r['mass']}</span><span class="g-medidas">{'<br>'.join(nombres)}</span></figcaption>
        <p class="g-tip" hidden></p>
        <script type="application/json" class="g-datos">{json.dumps(datos_js)}</script>
      </figure>"""


grafico = "".join(panel(*p) for p in PANELES)
# Cada celda lleva su rótulo en data-rotulo: bajo 834 px el thead se esconde y el rótulo se ve con ::before (defecto 8).
# La fuente de cada curva medida va entera, sin recortar (defecto 7).
COLS = ("stiffness · damping · mass", "ζ", "50 %", "90 %", "99 %", "Sobrepaso")


COLSPAN3 = ' colspan="3"'


def celda(rotulo, valor, extra=""):
    return f'<td data-rotulo="{e(rotulo)}"{extra}>{valor}</td>'


filas_hitos = "".join(
    f"<tr><th scope=\"row\">{k}</th>{celda(COLS[0], str(v['stiffness']) + ' · ' + str(v['damping']) + ' · ' + str(v['mass']))}"
    f"{celda(COLS[1], num(v['zeta'], 3))}{celda(COLS[2], str(v['t50']) + ' ms')}{celda(COLS[3], str(v['t90']) + ' ms')}"
    f"{celda(COLS[4], str(v['t99']) + ' ms')}{celda(COLS[5], num(v['sobrepaso'], 0) + ' %')}</tr>" for k, v in R.items())
filas_medidas = "".join(
    f"<tr><th scope=\"row\">{e(M[k]['fuente'].split(':')[0])}</th>{celda('Lo medido', e(M[k]['fuente'].split(':', 1)[1].strip()), COLSPAN3)}"
    f"{celda(COLS[3], str(M[k].get('t90')) + ' ms')}{celda(COLS[4], (str(M[k]['t99']) + ' ms') if M[k].get('t99') is not None else 'sin dato')}{celda(COLS[5], '0 %')}</tr>"
    for k in ("apCursor", "kotoHover", "kotoFeedIn", "apEntrada"))

ABRIR_LAMINA = f'<a href="{img["letras"]["src"]}">Abrir la lámina a tamaño completo</a>'

seccion_tokens = f"""
<section id="tokens" class="seccion" aria-labelledby="t-tokens">
  <div class="seccion__lado"><p class="rotulo">4</p><h2 id="t-tokens">Los tokens, dibujados</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro">{dos('Tus colores, con un rol cada uno.', 'Contraste calculado desde el hex con la fórmula de WCAG; el mínimo para texto es 4,5:1.')}</p>
    <ul class="fichas">{''.join(ficha(*f) for f in fichas)}</ul>
    <p class="nota">Líneas: <code>rgba(17,17,17,.08)</code> entre filas ({num(L['brief_08_sobre_papel']['contraste'])}:1) y <code>rgba(17,17,17,.18)</code> en el borde de cada sección ({num(L['linea_seccion_propuesta']['contraste'])}:1, el de Koto). El cobalto tiene tono {num(tono['#0029FF (brief)']['H'], 1)}° en OKLCH: el del azul, no el del índigo de las plantillas ({num(tono['indigo-500 (Tailwind)']['H'], 1)}°). Detalle en <code>datos/contraste.json</code>.</p>

    <h3 id="letra">La letra</h3>
    <p class="intro">{dos('Dos opciones libres con el carácter que medimos en Koto:', 'condensada y liviana en titulares, regular en el cuerpo, la misma letra en dos cortes. A tamaño real: 48, 38, 24 y 16 px.')}</p>
    <p class="aviso rotulo">Texto de muestra, no el definitivo: la frase de tu brief</p>
    {opcion(1, 'Mona Sans', 'opcion--mona', mona, mona_c, 'la que recomiendo')}
    {opcion(2, 'Google Sans Flex', 'opcion--gsf', gsf, gsf_c, 'la más parecida a Koto')}
    <article class="opcion opcion--mono">
      <p class="rotulo">Mono · DM Mono 500 · interletra +0,03em</p>
      <p class="mono-11">Producto propio · 2026 · Cloudflare Pages</p>
      <p class="mono-11">Santiago <span class="reloj">--:--</span> <span class="huso">UTC-3</span> · Trabajo (6)</p>
      <p class="mono-12">Build de la vista previa: f0d911c, 14-oct-2026 · 21 señales, 30 + 40 + 30</p>
      <p class="dato">Forma {num(dm['forma'], 3)} · letras clave {num(dm['clave'], 3)}, la mejor de {len(LM)} · 11 px en mayúsculas para rótulos, 12 px para datos</p>
      <p class="nota">Las tres líneas son verdaderas, no de adorno: Verifica y Cumple es producto propio de 2026 en Cloudflare Pages; la hora la calcula tu navegador para Santiago; el índice tiene seis entradas; la vista previa del v3 sirve el build de <code>f0d911c</code>, del 14-oct, y el chequeo tiene 21 señales, con pesos de 30, 40 y 30 por bloque (inventario §2 y §4).</p>
    </article>
    <p class="recomiendo">{dos('Recomiendo Mona Sans.', f"Google Sans Flex se parece más a Koto ({num(gsf['forma'], 3)} contra {num(mona['forma'], 3)} en titulares y {num(gsf_c['forma'], 3)} contra {num(mona_c['forma'], 3)} en cuerpo), pero es la letra de Gmail y de los teléfonos Android: un estudio que vende aparecer en Google, escrito con la letra de Google, invita a leer «es de Google». Si prefieres la más cercana, dilo y va esa.")}</p>
    {figura(img['letras'], 'Lámina: la misma frase en la letra de Koto, en Mona Sans, en Google Sans Flex, en Space Grotesk y en Plus Jakarta Sans, y una línea de datos en cuatro letras mono', f"Medidas contra Koto a igual altura de mayúscula, con ancho y peso igualados. Space Grotesk y Plus Jakarta quedan {puesto('display', 'Space Grotesk')[0]}.ª y {puesto('display', 'Plus Jakarta Sans')[0]}.ª de {len(LD)}: no se pueden condensar y miden {num(LD['Space Grotesk']['anchoFrase'])} y {num(LD['Plus Jakarta Sans']['anchoFrase'])} veces el ancho de Koto. Geist Mono es la mono por defecto de Next.js; JetBrains Mono queda {puesto('mono', 'JetBrains Mono')[0]}.ª de {len(LM)}. {ABRIR_LAMINA}.", 'fig--ancha')}

    <h3 id="registro">Líneas de registro</h3>
    {reg_svg}
    <ol class="leyenda">
      <li><span class="rotulo">1</span> Borde de sección al 18 %, de margen a margen: separa una sección de otra.</li>
      <li><span class="rotulo">2</span> Línea al 8 % entre filas de una lista.</li>
      <li><span class="rotulo">3</span> La única marca de registro (el círculo punteado solo la señala en el dibujo): una cruz de 9 px, del mismo gris que el borde, donde el borde de la sección cruza el límite de la barra lateral (x = 336). Ese límite no se dibuja: la cruz es lo único que lo marca. Dos por página como máximo y ninguna bajo 1194 px. Koto no trae ninguna; es lo mínimo de tu idea de los planos, y si se lee como adorno, sale. Este tablero la lleva en las secciones 2 y 5.</li>
      <li><span class="rotulo">4</span> Las 16 columnas solo se ven en el modo esqueleto, leídas del CSS de la página. Dibujadas de adorno serían decoración.</li>
    </ol>

    <h3 id="cursor">El cursor, sobre trabajo real</h3>
    <p class="intro">{dos('Pasa el mouse por la pieza.', 'Con teclado (Tab) el círculo se esconde y el foco se ve; con movimiento reducido o en un teléfono, no hay círculo y el rótulo queda quieto.')}</p>
    <div class="demo-cursor">
      <a class="pieza" href="#casos" data-ir="Ver el caso">
        <span class="pieza__medio"><img src="{img['o_verifica']['src']}" width="{img['o_verifica']['w']}" height="{img['o_verifica']['h']}" alt="Portada de Verifica y Cumple: titular gigante ¿Estás seguro? sobre fondo azul y una jinete con un mapa" loading="lazy" decoding="async"><span class="pieza__ir" aria-hidden="true">Ver el caso ↗</span></span>
        <span class="pieza__pie"><span class="t1">Verifica y Cumple</span> <span class="t2">Chequeo gratuito de las señales de la Ley 21.719 que se ven desde afuera.</span></span>
        <span class="pieza__ficha rotulo">Producto propio · 2026 · Cloudflare Pages</span>
      </a>
      <p class="nota">El texto del círculo («Ver el caso») es de muestra; el definitivo lo escribe Clara. Resorte del cursor: {R['cursor']['stiffness']} · {R['cursor']['damping']} · {R['cursor']['mass']}, 90 % del salto en {R['cursor']['t90']} ms.</p>
    </div>
    <div class="circulo" aria-hidden="true">Ver el caso</div>

    <h3 id="resorte">El resorte</h3>
    <p class="intro">{dos('Tres resortes, ajustados a los tiempos de Koto.', 'Ninguno rebota, porque ninguna curva de Koto ni de A&amp;P pasa de su destino. Elige uno y muévelo; el número en azul lo mide tu navegador.')}</p>
    <div class="demo-resorte">
      <fieldset class="resorte__tipo">
        <legend class="rotulo">Resorte</legend>
        <label><input type="radio" name="resorte" value="cursor"> cursor</label>
        <label><input type="radio" name="resorte" value="estado"> estado</label>
        <label><input type="radio" name="resorte" value="entrada" checked> entrada</label>
      </fieldset>
      <div class="pista" aria-hidden="true"><span class="bloque"><span class="rotulo">masa 1</span></span></div>
      <div class="resorte__mando">
        <button type="button" class="boton" id="mover">Mover</button>
        <p class="lectura" aria-live="polite">Sin medir todavía.</p>
      </div>
    </div>
    <div class="g-leyenda" aria-hidden="true"><span class="g-l g-l--tinta"></span> resorte propuesto <span class="g-l g-l--rayas"></span> lo medido, nombrado bajo cada gráfico</div>
    <div class="grafico">{grafico}</div>
    <div class="tabla-envuelta">
      <table class="tabla">
        <caption class="rotulo">Calculado con el <code>spring()</code> de Motion 13.5.0 (<code>datos/resortes.json</code>)</caption>
        <thead><tr><th scope="col">Resorte o curva</th><th scope="col">stiffness · damping · mass</th><th scope="col"><span class="sin-mayus">ζ</span></th><th scope="col">50 %</th><th scope="col">90 %</th><th scope="col">99 %</th><th scope="col">Sobrepaso</th></tr></thead>
        <tbody>{filas_hitos}{filas_medidas}</tbody>
      </table>
    </div>
    <p class="nota">Con movimiento reducido no corre ningún resorte: el bloque salta y en el sitio todo está en su lugar desde el principio. Koto y A&amp;P no respetan esa preferencia; aquí sí.</p>
  </div>
</section>"""

# ---------------------------------------------------------------- sección 5: casos y datos
TIPO = {"cliente": "Cliente", "propio": "Propio", "herramienta": "Herramienta propia", "concepto": "Concepto"}


# La nota de las mediciones de carga se repetía igual en seis filas (defecto 10 del acta): va una vez, arriba de los
# casos, y en cada fila queda su resumen. Después de los dos puntos, minúscula.
NOTA_CARGA = "Los kB, sí, con fecha y método. Los ms, no como «velocidad para tus clientes»: son de laboratorio y desde EE.UU."
assert sum(m.get("publicable") == NOTA_CARGA for p in inv["proyectos"] for m in p.get("metricas") or []) >= 2


def publicable(m):
    t = m.get("publicable", "sin decir")
    if t == NOTA_CARGA:
        return "kB sí, ms no"
    return t[:1].lower() + t[1:]


def caso(p):
    med = []
    for m in p.get("metricas") or []:
        fecha = m.get("fecha", "")
        if "valor" in m:
            valor = str(m["valor"])
        elif "a390" in m and "a1440" in m:
            valor = f"{m['a390']['kbTransferidos']} kB a 390 · {m['a1440']['kbTransferidos']} kB a 1440, transferidos"
        else:
            valor = "ver el inventario"
        med.append(f"<li><span class=\"t1\">{e(m['nombre'])}</span>: <span class=\"dato\">{e(valor)}</span> <span class=\"t2\">({e(fecha[:10] if fecha[:4].isdigit() else fecha)} · publicable: {e(publicable(m))})</span></li>")
    medido = "<ul class=\"lista lista--chica\">" + "".join(med) + "</ul>" if med else "<p class=\"t2\">Nada medido hoy.</p>"
    sin = "".join(f"<li>{e(s)}</li>" for s in (p.get("sinMetrica") or [])[:3])
    ingr = " · ".join(e(i["etiqueta"]) for i in p.get("ingredientes", []))
    return f"""
      <li class="caso">
        <p class="caso__ficha rotulo">{TIPO.get(p['tipo'], e(p['tipo']))} · {p['anio']}</p>
        <h3>{e(p['nombre'])}</h3>
        <p class="caso__hizo">{e(p['queSeHizo'])}</p>
        <p class="caso__ingr dato">{ingr}</p>
        <div class="caso__col caso__col--medido"><p class="rotulo">Medido</p>{medido}</div>
        <div class="caso__col caso__col--sin"><p class="rotulo">Sin métrica</p><ul class="lista lista--chica">{sin}</ul></div>
      </li>"""


casos_html = "".join(caso(p) for p in inv["proyectos"])
tele = "".join(f"<li><span class=\"t1\">{e(t['que'])}</span> <span class=\"t2\">{e(t['origen'])} · {e(t['cuando'])}</span> <span class=\"rotulo\">{'existe' if t.get('existe') else 'por construir'}</span></li>" for t in inv["telemetria"]["verdadera"])
sand = "".join(f"<li><span class=\"t1\">{e(s['nombre'])}</span> <span class=\"t2\">{e(s['que'])}</span> <span class=\"rotulo\">{e(s['estado'])}</span></li>" for s in inv["sandboxes"]["verdaderos"])
nopuede = "".join(f"<li><span class=\"t1\">{e(n['que'])}</span> <span class=\"t2\">{e(n['por'])}</span></li>" for n in inv["noSePuedeDecir"])

seccion_casos = f"""
<section id="casos" class="seccion registro" aria-labelledby="t-casos">
  <div class="seccion__lado"><p class="rotulo">5</p><h2 id="t-casos">Casos y datos reales con que contamos</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro">{dos(f"Seis cosas reales que mostrar, y una sola de cliente.", "Todo sale del inventario de Diego del 16-oct (<code>e12/inventario-casos.md</code>): lo que se hizo, lo que se usó de verdad, lo que se midió hoy y lo que no se puede decir. Ninguna de estas cifras se publica sin tu decisión.")}</p>
    <div class="galeria galeria--2">
      {figura(img['o_verifica'], 'Portada de Verifica y Cumple: titular ¿Estás seguro? en blanco y lima sobre azul', 'Verifica y Cumple, plano en su marco: así va el trabajo, sin maqueta de computador.')}
      {figura(img['o_combeau'], 'Portada del sitio de Bernardo Combeau: retrato con luz verde y la frase sobre el retrato', 'Combeau, fotografía: el caso tiene permiso verbal; medirlo o grabarlo pide su OK escrito.')}
    </div>
    <p class="nota"><strong>Las mediciones de carga y peso</strong> son de laboratorio, corridas desde EE.UU. Se pueden publicar los kB, con fecha y método; los ms no, como «velocidad para tus clientes». En cada caso queda como «kB sí, ms no».</p>
    <ol class="casos">{casos_html}</ol>
    <div class="tres-listas">
      <div><h3>Telemetría verdadera</h3><ul class="lista lista--chica">{tele}</ul></div>
      <div><h3>Sandboxes verdaderos</h3><ul class="lista lista--chica">{sand}</ul></div>
      <div><h3>Lo que no se puede decir</h3><ul class="lista lista--chica">{nopuede}</ul></div>
    </div>
    <p class="nota">Fuera del índice, por permiso o por decisión tuya: un cliente en construcción sin permiso de caso, un cliente de SEO sin permiso, dos piezas de concepto sin revisión y Praxi, que es el único proyecto con IA programada y vive en otro repo (inventario §8).</p>
  </div>
</section>"""

# ---------------------------------------------------------------- sección 6: decides
dec = "".join(f"<li><h3>{md_en_linea(q)}</h3><p><span class=\"rotulo\">Recomendado</span> {md_en_linea(r)}</p></li>" for q, r in preguntas)
seccion_decides = f"""
<section id="decides" class="seccion" aria-labelledby="t-decides">
  <div class="seccion__lado"><p class="rotulo">6</p><h2 id="t-decides">Lo que decides en esta compuerta</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro">{dos('Las cinco preguntas del brief de Mauro, con la opción que recomendamos.', 'Basta con responder «de acuerdo» o decir cuál cambias.')}</p>
    <ol class="decide">{dec}</ol>
    <p class="nota"><strong>Supuestos de Mauro, reversibles en una línea:</strong> {md_en_linea(supuestos)}</p>
    <p class="nota"><strong>Y la letra:</strong> recomiendo Mona Sans; si prefieres la más cercana a Koto, Google Sans Flex. Se puede decidir aquí o en la compuerta 2.</p>
    <h3>Lo que viene: dos direcciones, no tres</h3>
    <p>{dos('A · Archivo.', 'El trabajo es lo grande: capturas y grabaciones a sangre, la escala de Koto (48 px de tope) y el muro de dos columnas.')}</p>
    <p>{dos('B · Banco.', 'El dato vivo es lo grande: tu declaración a escala monumental en el corte liviano, el chequeo como su prueba y el índice como tabla con filetes.')}</p>
    <p class="nota">Las dos comparten colores, letra, cursor y resortes; difieren en lo que carga la pantalla, en la escala del titular y en cómo se arma el índice. Detalle en <code>e12/lock-koto.md</code> §16.</p>
  </div>
</section>"""

# ---------------------------------------------------------------- página
CSS = """
  /* Tablero de trabajo en un solo tema claro, a propósito: es la dirección que se aprueba (papel, tinta y una señal
     cobalto escasa) y las capturas de los referentes se comparan sobre ese papel. Una columna; desde 1194 px cada
     sección lleva su título en una barra de 320 px, como el caso de Koto. */
  :root {
    color-scheme: light;
    --papel: #F6F6F4;
    --placa: #EFEFEA;
    --hoja: #FFFFFF;
    --tinta: #111111;
    --gris: #666663;
    --linea: rgba(17,17,17,.08);
    --linea-seccion: rgba(17,17,17,.18);
    --senal: #0029FF;
    --f-letra: 'Mona Sans', 'Helvetica Neue', Arial, sans-serif;
    --f-mono: 'DM Mono', ui-monospace, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--papel); color: var(--tinta); font: 390 16px/1.4 var(--f-letra); font-stretch: 100%; -webkit-font-smoothing: antialiased; }
  .marco { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 16px 64px; }
  h1, h2, h3 { font-family: var(--f-letra); font-stretch: 89%; font-weight: 340; margin: 0; text-wrap: balance; }
  h1 { font-size: clamp(36px, 3.4vw, 48px); line-height: 1; letter-spacing: -.01em; max-width: 22ch; }
  h2 { font-size: clamp(26px, 2.65vw, 38px); line-height: 1.1; letter-spacing: -.01em; }
  h3 { font-size: clamp(23px, 1.7vw, 24px); line-height: 1.2; margin-top: 40px; }
  p, ul, ol, dl, figure { margin: 0; }
  a { color: var(--tinta); text-underline-offset: 3px; }
  code { font-family: var(--f-mono); font-size: max(11px, .8em); letter-spacing: .01em; word-break: break-word; }
  /* dentro de un rótulo (11 px, mayúsculas) el código va a 1em y sin mayúsculas: spring(), datos/resortes.json */
  .rotulo code, caption code, .valores dt code, .mono-11 code, thead code { font-size: 1em; text-transform: none; letter-spacing: 0; }
  strong, b, th, legend, caption { font-weight: inherit; }
  strong { color: var(--tinta); }
  :focus-visible { outline: 2px solid var(--tinta); outline-offset: 3px; }
  .rotulo { font: 500 11px/1.25 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  .dato { font: 500 12px/1.4 var(--f-mono); letter-spacing: .03em; color: var(--gris); }
  .t1 { color: var(--tinta); }
  .t2 { color: var(--gris); }
  .intro, .tesis { font-family: var(--f-letra); font-stretch: 89%; font-weight: 340; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.2; max-width: 34em; text-wrap: pretty; }
  .nota { color: var(--gris); max-width: 62ch; margin-top: 16px; font-size: 15px; }
  .nota strong { color: var(--tinta); }

  /* cabecera */
  .cab { display: grid; gap: 20px; padding: 8px 0 40px; }
  .cab__fila { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; }
  .indice { display: flex; flex-wrap: wrap; gap: 8px 20px; list-style: none; padding: 0; }
  .indice a { font: 500 11px/1.25 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--tinta); text-decoration: none; display: inline-block; padding: 12px 0; }
  .indice a:hover { text-decoration: underline; }
  .cab .intro { max-width: 30em; }

  /* secciones con barra lateral desde 1194 */
  .seccion { position: relative; border-top: 1px solid var(--linea-seccion); padding: 20px 0 56px; display: grid; gap: 24px; }
  .seccion__lado { display: grid; gap: 8px; align-content: start; }
  .seccion__cuerpo { display: grid; gap: 20px; min-width: 0; }
  @media (min-width: 1194px) {
    .seccion { grid-template-columns: 320px minmax(0, 1fr); gap: 16px; }
    .seccion__lado { position: sticky; top: 16px; align-self: start; padding-right: 24px; }
    .registro::before, .registro::after { content: ""; position: absolute; top: -5px; left: 315px; width: 9px; height: 9px; pointer-events: none; }
    .registro::before { border-top: 1px solid var(--linea-seccion); top: -1px; height: 0; }
    .registro::after { border-left: 1px solid var(--linea-seccion); left: 319px; width: 0; }
  }

  /* lo que pediste */
  .pedidos { list-style: none; padding: 0; display: grid; gap: 12px; counter-reset: p; max-width: 46em; }
  .pedidos li { counter-increment: p; display: grid; grid-template-columns: 28px 1fr; gap: 8px; font-size: 18px; line-height: 1.35; }
  .pedidos li::before { content: counter(p); font: 500 11px/1.9 var(--f-mono); color: var(--gris); }

  /* figuras */
  .galeria { display: grid; gap: 8px; }
  .fig { display: grid; gap: 8px; align-content: start; min-width: 0; }
  .fig img { display: block; width: 100%; height: auto; border-radius: 6px; background: var(--placa); }
  .fig figcaption { font-size: 14px; line-height: 1.35; color: var(--gris); max-width: 60ch; }
  @media (min-width: 834px) {
    .galeria--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .galeria--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .galeria--3 .fig--ancha { grid-column: span 2; }
  }
  .galeria--tel { grid-template-columns: repeat(auto-fill, minmax(150px, 260px)); }
  .galeria--chica { grid-template-columns: repeat(auto-fill, minmax(150px, 340px)); }
  .valores { display: grid; gap: 0; border-top: 1px solid var(--linea-seccion); }
  .valores div { display: grid; gap: 4px; padding: 12px 0; border-bottom: 1px solid var(--linea); }
  .valores dt { font: 500 11px/1.4 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  .valores dd { margin: 0; color: var(--gris); max-width: 70ch; }
  @media (min-width: 834px) { .valores div { grid-template-columns: 180px minmax(0, 1fr); gap: 16px; } }

  /* qué tomamos */
  .dos-listas, .tres-listas { display: grid; gap: 24px; }
  @media (min-width: 834px) { .dos-listas { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1194px) { .tres-listas { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .lista { list-style: none; padding: 0; border-top: 1px solid var(--linea-seccion); }
  .lista li { padding: 10px 0; border-bottom: 1px solid var(--linea); color: var(--tinta); }
  .lista--chica li { font-size: 15px; }
  .puntos { list-style: none; padding: 0; border-top: 1px solid var(--linea-seccion); }
  .puntos li { display: grid; gap: 6px; padding: 14px 0; border-bottom: 1px solid var(--linea); }
  .puntos p { color: var(--gris); }
  .puntos p > .rotulo { display: block; margin-bottom: 2px; }
  .puntos .puntos__decision { color: var(--tinta); }
  .puntos__img { display: block; width: 100%; max-width: 240px; height: auto; margin-top: 10px; border-radius: 4px; }
  @media (min-width: 834px) { .puntos li { grid-template-columns: minmax(0, 1fr) minmax(0, .9fr) minmax(0, 1.3fr); gap: 16px; } }

  /* fichas de color */
  .fichas { list-style: none; padding: 0; display: grid; gap: 8px; }
  @media (min-width: 834px) { .fichas { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1194px) { .fichas { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .ficha { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-top: 1px solid var(--linea); }
  .ficha__chip { width: 56px; height: 56px; border-radius: 4px; display: block; }
  .ficha__nombre { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; }
  .ficha__rol { color: var(--gris); font-size: 15px; margin-top: 4px; }
  .ficha__pares { list-style: none; padding: 0; margin-top: 6px; display: grid; gap: 2px; font-size: 14px; color: var(--gris); }

  /* letras */
  .aviso { color: var(--tinta); }
  .opcion { display: grid; gap: 12px; padding: 20px 0; border-top: 1px solid var(--linea-seccion); min-width: 0; }
  .muestra { font-weight: 340; overflow-wrap: anywhere; }
  .muestra--48 { font-size: 48px; line-height: 1; letter-spacing: -.01em; }
  .muestra--38 { font-size: 38px; line-height: 1.1; letter-spacing: -.01em; }
  .muestra--24 { font-size: 24px; line-height: 1.2; }
  .muestra-cuerpo { font-size: 16px; line-height: 1.4; color: var(--gris); max-width: 493px; }
  .opcion--mona .muestra { font-family: 'Mona Sans', sans-serif; font-stretch: 89%; font-weight: 340; }
  .opcion--mona .muestra-cuerpo { font-family: 'Mona Sans', sans-serif; font-stretch: 100%; font-weight: 390; }
  .opcion--gsf .muestra { font-family: 'Google Sans Flex', sans-serif; font-stretch: 76%; font-weight: 300; }
  .opcion--gsf .muestra-cuerpo { font-family: 'Google Sans Flex', sans-serif; font-stretch: 100%; font-weight: 370; }
  @media (max-width: 833px) {
    .muestra--48 { font-size: 36px; }
    .muestra--38 { font-size: 26px; line-height: 1.2; }
    .muestra--24 { font-size: 23px; }
    .muestra-cuerpo { font-size: 15px; }
  }
  .mono-11 { font: 500 11px/1.25 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--tinta); }
  .mono-12 { font: 500 12px/1.4 var(--f-mono); letter-spacing: .03em; color: var(--tinta); }
  .recomiendo { font-stretch: 89%; font-weight: 340; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.2; max-width: 34em; }
  .fig--ancha img { background: var(--hoja); }

  /* registro */
  .registro-caja { position: relative; }
  .registro-dibujo { display: block; width: 100%; height: auto; border-radius: 4px; outline: 1px solid var(--linea); }
  .registro-num { position: absolute; color: var(--tinta); line-height: 1; }
  .leyenda { list-style: none; padding: 0; display: grid; gap: 6px; color: var(--gris); max-width: 70ch; }
  .leyenda li { display: grid; grid-template-columns: 24px 1fr; gap: 8px; }
  .leyenda .rotulo { color: var(--tinta); line-height: 1.9; }

  /* demo del cursor */
  .demo-cursor { display: grid; gap: 12px; max-width: 720px; }
  .pieza { display: grid; gap: 8px; color: inherit; text-decoration: none; border-radius: 6px; }
  .pieza__medio { position: relative; display: block; overflow: hidden; border-radius: 6px; background: var(--placa); aspect-ratio: 16 / 9; }
  .pieza__medio img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .pieza__ir { position: absolute; left: 12px; bottom: 12px; padding: 6px 8px; border-radius: 2px; background: var(--hoja); color: var(--tinta); font: 500 11px/1 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; opacity: 0; }
  .pieza__pie { display: block; }
  .pieza:focus-visible .pieza__ir, .sin-circulo .pieza:hover .pieza__ir { opacity: 1; }
  .con-circulo .pieza__medio { cursor: none; }
  .circulo { position: fixed; left: 0; top: 0; width: 88px; height: 88px; margin: -44px 0 0 -44px; border-radius: 50%; background: var(--senal); color: #FFFFFF; display: none; place-items: center; text-align: center; padding: 10px; font: 500 11px/1.15 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; pointer-events: none; z-index: 20; transform: scale(0); }
  .con-circulo .circulo { display: grid; }
  .teclado .circulo { visibility: hidden; }

  /* demo del resorte */
  .demo-resorte { display: grid; gap: 16px; padding: 16px; border-radius: 4px; background: var(--placa); }
  .resorte__tipo { border: 0; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 4px 20px; align-items: center; }
  .resorte__tipo legend { float: left; margin-right: 12px; padding: 0; line-height: 44px; }
  .resorte__tipo label { display: inline-flex; gap: 8px; align-items: center; min-height: 44px; cursor: pointer; }
  .resorte__tipo input { accent-color: var(--tinta); width: 18px; height: 18px; margin: 0; }
  .pista { position: relative; height: 72px; border-top: 1px solid var(--linea-seccion); border-bottom: 1px solid var(--linea-seccion); }
  .bloque { position: absolute; left: 0; top: 11px; width: 120px; height: 48px; border-radius: 4px; background: var(--hoja); display: grid; place-items: center; outline: 1px solid var(--linea-seccion); }
  .bloque .rotulo { color: var(--tinta); }
  .resorte__mando { display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; }
  .boton { font: 500 11px/1 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--papel); background: var(--tinta); border: 0; border-radius: 4px; min-height: 44px; padding: 0 20px; cursor: pointer; }
  .lectura { color: var(--gris); }
  .vivo { color: var(--senal); font-family: var(--f-mono); font-weight: 500; }
  .g-leyenda { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; font-size: 14px; color: var(--gris); }
  .g-l { display: inline-block; width: 28px; border-top: 2px solid var(--tinta); }
  .g-l--rayas { border-top: 2px dashed var(--gris); }
  .g-l--puntos { border-top: 2px dotted var(--gris); }
  .g-punto { display: inline-block; width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--gris); vertical-align: -1px; margin: 0 9px; }
  .g-medidas { display: block; font-size: 14px; color: var(--gris); margin-top: 4px; }
  .grafico { display: grid; gap: 16px; }
  @media (min-width: 834px) { .grafico { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .g-panel { position: relative; display: grid; gap: 4px; min-width: 0; }
  .g-panel svg { display: block; width: 100%; height: auto; overflow: visible; touch-action: pan-y; }
  .g-ej { font: 500 13.5px var(--f-mono); fill: var(--gris); }
  .g-tip { position: absolute; top: 0; right: 0; padding: 4px 8px; border-radius: 2px; background: var(--hoja); outline: 1px solid var(--linea-seccion); font: 500 11px/1.4 var(--f-mono); color: var(--tinta); pointer-events: none; max-width: 100%; }
  .tabla-envuelta { max-width: 100%; overflow-x: auto; }
  .tabla { border-collapse: collapse; width: 100%; font-size: 14px; }
  .tabla caption { text-align: left; padding-bottom: 8px; }
  .tabla th, .tabla td { text-align: left; padding: 8px 10px 8px 0; border-bottom: 1px solid var(--linea); vertical-align: top; }
  .sin-mayus { text-transform: none; }
  .tabla thead th { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); border-bottom: 1px solid var(--linea-seccion); }
  .tabla td { color: var(--gris); font-family: var(--f-mono); font-size: 12px; white-space: nowrap; }
  .tabla td[colspan] { white-space: normal; }
  @media (max-width: 833px) {
    .tabla thead { display: none; }
    .tabla tr { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px 12px; padding: 10px 0; border-bottom: 1px solid var(--linea); }
    .tabla th, .tabla td { border: 0; padding: 0; }
    .tabla th[scope="row"] { grid-column: 1 / -1; }
    .tabla td[colspan] { grid-column: 1 / -1; }
    .tabla td[data-rotulo="ζ"]::before { text-transform: none; }
    .tabla td::before { content: attr(data-rotulo); display: block; font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  }

  /* casos */
  .casos { list-style: none; padding: 0; border-top: 1px solid var(--linea-seccion); }
  .caso { display: grid; gap: 8px; padding: 18px 0; border-bottom: 1px solid var(--linea); }
  .caso h3 { margin-top: 0; font-size: 23px; }
  .caso__hizo { color: var(--gris); max-width: 62ch; }
  .caso__col { display: grid; gap: 4px; align-content: start; margin-top: 8px; }
  @media (min-width: 1194px) {
    .caso { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1fr); grid-template-rows: auto auto auto auto 1fr; gap: 8px 16px; }
    .caso__ficha, .caso h3, .caso__hizo, .caso__ingr { grid-column: 1; }
    .caso__col { grid-row: 1 / span 5; margin-top: 0; }
    .caso__col--medido { grid-column: 2; }
    .caso__col--sin { grid-column: 3; }
  }

  /* decides */
  .decide { list-style: none; padding: 0; counter-reset: d; border-top: 1px solid var(--linea-seccion); }
  .decide li { counter-increment: d; padding: 16px 0; border-bottom: 1px solid var(--linea); display: grid; gap: 8px; }
  .decide h3 { margin: 0; }
  .decide h3::before { content: counter(d) " · "; color: var(--gris); }
  .decide p { color: var(--gris); max-width: 70ch; }
  .pie { border-top: 1px solid var(--linea-seccion); padding-top: 16px; color: var(--gris); font-size: 14px; display: grid; gap: 6px; }
"""

JS = r"""
(function () {
  var M = window.Motion || null;
  var html = document.documentElement;
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fino = window.matchMedia('(hover: hover) and (pointer: fine)');
  var RES = RESORTES_JSON;

  // La hora de Santiago, con su huso, calculada en tu navegador (telemetría verdadera, en gris)
  function hora() {
    var ahora = new Date();
    var h = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false }).format(ahora);
    var huso = '';
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' }).formatToParts(ahora);
      p.forEach(function (x) { if (x.type === 'timeZoneName') huso = x.value.replace('GMT', 'UTC'); });
    } catch (err) { huso = ''; }
    document.querySelectorAll('.reloj').forEach(function (n) { n.textContent = h; });
    if (huso) document.querySelectorAll('.huso').forEach(function (n) { n.textContent = huso; });
  }
  hora();
  setInterval(hora, 15000);

  // ---- Cursor: círculo cobalto solo sobre el trabajo, solo con mouse fino y sin movimiento reducido
  var circulo = document.querySelector('.circulo');
  function modo() {
    var con = !!M && fino.matches && !reducir.matches;
    html.classList.toggle('con-circulo', con);
    html.classList.toggle('sin-circulo', !con);
  }
  modo();
  [reducir, fino].forEach(function (q) { if (q.addEventListener) q.addEventListener('change', modo); });
  if (M && circulo) { M.animate(circulo, { scale: 0 }, { duration: 0 }); }
  var dentro = false;
  function entrar(ev, pieza) {
    dentro = true;
    circulo.textContent = pieza.getAttribute('data-ir') || '';
    M.animate(circulo, { x: ev.clientX, y: ev.clientY }, { duration: 0 });
    M.animate(circulo, { scale: 1 }, { type: 'spring', stiffness: RES.estado.stiffness, damping: RES.estado.damping, mass: RES.estado.mass });
  }
  document.querySelectorAll('.pieza__medio').forEach(function (medio) {
    var pieza = medio.closest('.pieza');
    // Al entrar: no si se está usando el teclado (el navegador también avisa la entrada cuando la página se desplaza
    // bajo un mouse quieto, por ejemplo al tabular)
    medio.addEventListener('pointerenter', function (ev) {
      if (!html.classList.contains('con-circulo') || ev.pointerType !== 'mouse' || html.classList.contains('teclado')) return;
      entrar(ev, pieza);
    });
    // Un movimiento real del mouse devuelve el círculo, también si el teclado lo había escondido dentro de la pieza
    medio.addEventListener('pointermove', function (ev) {
      if (!html.classList.contains('con-circulo') || ev.pointerType !== 'mouse') return;
      html.classList.remove('teclado');
      if (!dentro) { entrar(ev, pieza); return; }
      M.animate(circulo, { x: ev.clientX, y: ev.clientY }, { type: 'spring', stiffness: RES.cursor.stiffness, damping: RES.cursor.damping, mass: RES.cursor.mass });
    });
    medio.addEventListener('pointerleave', function () {
      if (!dentro) return;
      dentro = false;
      if (M) M.animate(circulo, { scale: 0 }, { type: 'spring', stiffness: RES.estado.stiffness, damping: RES.estado.damping, mass: RES.estado.mass });
    });
  });
  // Con teclado el círculo se esconde (el foco de tinta sobre el cobalto no se leería) y vuelve al mover el mouse
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Tab') { html.classList.add('teclado'); if (M && circulo) M.animate(circulo, { scale: 0 }, { duration: 0 }); dentro = false; }
  });
  document.addEventListener('pointermove', function (ev) { if (ev.pointerType === 'mouse') html.classList.remove('teclado'); });

  // ---- Resorte: el bloque va y vuelve; tu navegador mide cuándo llega al 90 %
  var boton = document.getElementById('mover');
  var bloque = document.querySelector('.bloque');
  var pista = document.querySelector('.pista');
  var lectura = document.querySelector('.lectura');
  var lado = 0;
  function xActual() {
    var m = getComputedStyle(bloque).transform;
    if (!m || m === 'none') return 0;
    var v = m.match(/matrix(3d)?\(([^)]+)\)/);
    if (!v) return 0;
    var n = v[2].split(',').map(parseFloat);
    return v[1] ? n[12] : n[4];
  }
  if (boton) boton.addEventListener('click', function () {
    var elegido = document.querySelector('input[name="resorte"]:checked').value;
    var r = RES[elegido];
    var destino = lado === 0 ? Math.max(0, pista.clientWidth - bloque.offsetWidth) : 0;
    lado = 1 - lado;
    var desde = xActual();
    if (!M || reducir.matches) {
      bloque.style.transform = 'translateX(' + destino + 'px)';
      lectura.textContent = 'Movimiento reducido: sin resorte, el bloque salta a su lugar.';
      return;
    }
    var t0 = performance.now();
    var t90 = null;
    var anim = M.animate(bloque, { x: destino }, { type: 'spring', stiffness: r.stiffness, damping: r.damping, mass: r.mass });
    function medir() {
      var x = xActual();
      var p = destino === desde ? 1 : (x - desde) / (destino - desde);
      if (t90 === null && p >= 0.9) t90 = performance.now() - t0;
      if (t90 === null) requestAnimationFrame(medir);
      else lectura.innerHTML = 'Resorte ' + elegido + ': en tu navegador llegó al 90 % a <span class="vivo">' + Math.round(t90) + ' ms</span> (calculado: ' + r.t90 + ' ms).';
    }
    requestAnimationFrame(medir);
    window.__ultimaAnimacion = anim;
  });

  // ---- Gráfico: cruz y valores al pasar el puntero
  document.querySelectorAll('.g-panel').forEach(function (fig) {
    var svg = fig.querySelector('svg');
    var datos = JSON.parse(fig.querySelector('.g-datos').textContent);
    var cruz = fig.querySelector('.g-cruz');
    var tip = fig.querySelector('.g-tip');
    var zona = fig.querySelector('.g-zona');
    function valor(serie, t) {
      var mejor = serie[0];
      serie.forEach(function (p) { if (Math.abs(p[0] - t) < Math.abs(mejor[0] - t)) mejor = p; });
      return mejor[1];
    }
    zona.addEventListener('pointermove', function (ev) {
      var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
      var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      var t = Math.max(0, Math.min(600, Math.round((loc.x - 44) / (388 - 44) * 600 / 10) * 10));
      var x = 44 + (388 - 44) * t / 600;
      cruz.setAttribute('x1', x); cruz.setAttribute('x2', x); cruz.setAttribute('visibility', 'visible');
      var partes = [t + ' ms', 'resorte ' + Math.round(valor(datos.resorte, t) * 100) + ' %'];
      datos.medidas.forEach(function (m) { if (m.serie) partes.push(m.etiqueta.split(':')[0] + ' ' + Math.round(valor(m.serie, t) * 100) + ' %'); });
      tip.textContent = partes.join(' · ');
      tip.hidden = false;
    });
    zona.addEventListener('pointerleave', function () { cruz.setAttribute('visibility', 'hidden'); tip.hidden = true; });
  });
})();
"""

res_js = json.dumps({k: {"stiffness": v["stiffness"], "damping": v["damping"], "mass": v["mass"], "t90": v["t90"]} for k, v in R.items()})

pagina = f"""<meta charset="utf-8">
<title>Tablero laboratorio E12</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FUENTES}">
<style>{CSS}</style>
<div class="marco">
  <header class="cab">
    <div class="cab__fila">
      <p class="rotulo">SpindleLab v3 · E12 · compuerta 1 · 16 de octubre de 2026</p>
      <p class="rotulo">Santiago <span class="reloj">--:--</span> <span class="huso">UTC-3</span></p>
    </div>
    <h1>El laboratorio: lo que medimos de Koto y qué hacemos con tu brief</h1>
    <p class="intro">{dos('Koto manda y tu brief orienta.', 'Aquí está lo medido, lo que se toma, lo que no y por qué, los tokens dibujados y lo que decides hoy para pasar a las dos direcciones.')}</p>
    <nav aria-label="Secciones del tablero"><ul class="indice">
      <li><a href="#pediste">1 · Lo que pediste</a></li><li><a href="#medido">2 · Medido</a></li><li><a href="#tomamos">3 · Qué tomamos</a></li>
      <li><a href="#tokens">4 · Tokens</a></li><li><a href="#casos">5 · Casos y datos</a></li><li><a href="#decides">6 · Lo que decides</a></li>
    </ul></nav>
  </header>
  <main>
    <section id="pediste" class="seccion" aria-labelledby="t-pediste">
      <div class="seccion__lado"><p class="rotulo">1</p><h2 id="t-pediste">Lo que pediste</h2></div>
      <div class="seccion__cuerpo">
        <ol class="pedidos">
          <li>Que SpindleLab se presente como un estudio de diseño y tecnología que también hace SEO técnico y visibilidad en IA, con la misma oferta y los mismos precios.</li>
          <li>Astro, Tailwind y Motion, sobre lo que ya funciona: el chequeo, los formularios, la verificación y el despliegue en Cloudflare.</li>
          <li>Casos solo con lo medido: problema, hipótesis, solución y lo que de verdad se midió. Donde no hay métrica, no se pone.</li>
          <li>Koto manda y tu brief orienta: medimos koto.com y acceptandproceed.com, mantenemos la intención y reemplazamos lo que huela a plantilla, diciendo por qué.</li>
        </ol>
        <p class="nota">Tus mensajes del 16-oct, textuales: <a href="{GITHUB}marketing/oficina/obras-web/spindlelab-v3/e12/insumos-ramon-16oct.md"><code>e12/insumos-ramon-16oct.md</code></a>. El detalle de este tablero, valor por valor: <code>e12/lock-koto.md</code>.</p>
      </div>
    </section>
    {seccion_medido}
    {seccion_tomamos}
    {seccion_tokens}
    {seccion_casos}
    {seccion_decides}
  </main>
  <footer class="pie">
    <p>Armado por <code>tableros/e12-laboratorio/herramientas/armar-tablero.py</code> desde las mediciones de Koto y de Accept &amp; Proceed, el inventario de casos, el brief de obra y <code>datos/</code>. Verificado con <code>herramientas/verificar.mjs</code> a 360, 390, 768 y 1440.</p>
    <p>Las capturas de Koto y de Accept &amp; Proceed son para estudio interno: nada de sus letras, imágenes ni código va al sitio. Nada de este tablero está publicado.</p>
  </footer>
</div>
<script src="{MOTION}"></script>
<script>{JS.replace('RESORTES_JSON', res_js)}</script>
"""

# Comprobaciones del contrato antes de escribir
assert pagina.count("<h1") == 1
assert "<!--" not in pagina, "sin comentarios HTML"
assert "—" not in re.sub(r"<style>.*?</style>|<script.*?</script>", "", pagina, flags=re.S), "sin raya en el texto"
for src in re.findall(r'<script src="([^"]+)"', pagina):
    assert src.startswith("https://cdn.jsdelivr.net/npm/") and re.search(r"@\d+\.\d+\.\d+/", src), src
for href in re.findall(r'<link rel="stylesheet" href="([^"]+)"', pagina):
    assert href.startswith("https://fonts.googleapis.com/"), href

with open(os.path.join(BASE, "tablero.html"), "w", encoding="utf-8") as f:
    f.write(pagina)
total = sum(m["bytes"] for m in manifiesto)
if total > MAX_TOTAL:
    sys.exit(f"img/ suma {total} bytes, pasa de 14 MB")
json.dump({"imagenes": manifiesto, "total": total}, open(os.path.join(IMG, "manifiesto.json"), "w"), ensure_ascii=False, indent=1)
mayor = max(m["bytes"] for m in manifiesto)
print(f"tablero.html {len(pagina)} bytes · {len(manifiesto)} imágenes · {total / 1e6:.2f} MB (kB = 1.000 bytes) · la mayor {mayor / 1e3:.0f} kB")
