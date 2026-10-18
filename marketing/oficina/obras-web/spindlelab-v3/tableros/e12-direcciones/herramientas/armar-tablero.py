"""E12 · Arma el tablero de la compuerta 2 (`tablero.html`) y su lista de archivos (`archivos.json`) desde sus fuentes.

Lee, sin escribir en ninguna:
- `e12/brief-de-obra.md`, sección «Compuerta 1» (lo que decidió Ramón el 16-oct, con sus citas);
- `e12/medicion/koto/paso2/medicion-color-y-casos.json` y `e12/lock-koto.md` §20 (cómo juega Koto con el color);
- las dos direcciones: `direccion-a.md` y `direccion-b.md` (de ahí salen las frases de cada dirección, que escribí yo),
  `proto/a/medicion/{render,mediciones,campos}.json` y `proto/b/datos/{capturas,campos,primera-y-ficha}.json`
  (qué capturas hay y los números que se citan), sus capturas en `img/` y sus recorridos en `video/`;
- `e12/logo/caminos.md` y sus láminas (`e12/logo/laminas/*.png`);
- `marketing/portafolio/plan-e12.md` (§0, §6 y §11: las cuatro piezas, sus nombres y lo que costaría generar fotos o
  video) y, de cada pieza, su pliego, las dos primeras pantallas de su home y su recorrido;
- `e12/texto/texto-paso2.json` (las tres opciones del hero) y `e12/texto/lectura-fria.md` (lo que entendieron);
- `e12/inventario-praxi.md` (§8.1 y §10) y `datos/estado-praxi.txt` (lo que respondió praxi.coach el día del tablero,
  medido con `herramientas/estado-praxi.sh`);
- `datos/diferencias-texto.json` (el texto visible de A contra el de B, medido con `herramientas/diferencias-texto.mjs`):
  cada palabra que está en un solo lado tiene que quedar explicada en la lista DIFERENCIAS, o el script falla.

Escribe:
- `tablero.html` (sin doctype, html, head ni body: lo envuelve el publicador);
- `img/t-*.jpg` (lo que el tablero deriva: láminas, pliegos, primeras pantallas, pósters y dos estados de A), cada uno de
  450 kB o menos (kB = 1.000 bytes);
- `video/t-*.mp4` y `video/t-c-*.webm` (el H.264 de cada recorrido de A y B, para Safari, y una copia exacta de cada
  recorrido de las piezas de concepto), cada uno de 8 MB o menos;
- `archivos.json` (toda ruta que el tablero referencia, con sus bytes: lo que hay que publicar con él).

Las capturas de A y B que pasan de 450 kB se recomprimen en su lugar (mismo nombre y ancho, menos calidad) y se anota
en `datos/recompresion.json`; en una segunda corrida ya no pasan y no se tocan. Si una imagen pasa de 450 kB, un video
de 8 MB o el total de 60 MB (MB = 1.000.000 de bytes), el script falla.

Uso: TMPDIR=<carpeta temporal> python3 -I armar-tablero.py   (desde cualquier carpeta; necesita ffmpeg y ffprobe)
"""
import filecmp
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from decimal import ROUND_HALF_UP, Decimal

from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(AQUI)  # tableros/e12-direcciones
V3 = os.path.dirname(os.path.dirname(BASE))  # obras-web/spindlelab-v3
REPO = os.path.abspath(os.path.join(V3, "..", "..", "..", ".."))
E12 = os.path.join(V3, "e12")
PORTAFOLIO = os.path.join(REPO, "marketing", "portafolio")
IMG = os.path.join(BASE, "img")
VIDEO = os.path.join(BASE, "video")
DATOS = os.path.join(BASE, "datos")
PA = os.path.join(BASE, "proto", "a")
PB = os.path.join(BASE, "proto", "b")
for d in (IMG, VIDEO, DATOS):
    os.makedirs(d, exist_ok=True)

FUENTES = ("https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900"
           "&family=Google+Sans+Flex:wdth,wght@25..151,100..1000&family=DM+Mono:wght@500&display=swap")
GITHUB = "https://github.com/rvalleespin/spindlelab/blob/claude/magical-franklin-ckfki2/"
MAX_IMG = 450_000
MAX_VIDEO = 8_000_000
MAX_TOTAL = 60_000_000

e = html.escape


def leer_json(ruta):
    with open(ruta, encoding="utf-8") as f:
        return json.load(f)


def leer(ruta):
    with open(ruta, encoding="utf-8") as f:
        return f.read()


def num(x, dec=1):
    q = Decimal(str(x)).quantize(Decimal(1).scaleb(-dec), rounding=ROUND_HALF_UP)
    return f"{q:.{dec}f}".replace(".", ",")


def md(t):
    """Markdown en línea de las fuentes (negrita, código, cursiva, enlaces) a HTML escapado."""
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    t = e(t, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    t = re.sub(r"(?<![*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])", r"<em>\1</em>", t)
    return t


def sin_md(t):
    return re.sub(r"[*`]", "", re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t))


def tabla_md(texto, encabezado):
    """Filas de la primera tabla markdown cuyo encabezado empieza con `encabezado`."""
    lineas = texto.splitlines()
    for i, l in enumerate(lineas):
        if l.startswith("|") and l.strip("| ").startswith(encabezado):
            filas = []
            for m in lineas[i + 2:]:
                if not m.startswith("|"):
                    break
                filas.append([c.strip() for c in m.strip().strip("|").split(" | ")])
            return filas
    raise KeyError(encabezado)


def seccion_md(texto, titulo, nivel="## "):
    a = texto.index(nivel + titulo)
    b = texto.find("\n" + nivel, a + 1)
    return texto[a: b if b > 0 else None]


# ---------------------------------------------------------------- archivos: imágenes y videos
detalle = {}  # ruta relativa → origen y nota (para archivos.json)
REC_PATH = os.path.join(DATOS, "recompresion.json")
recompresion = leer_json(REC_PATH) if os.path.exists(REC_PATH) else []


def _guardar_jpg(im, destino):
    for q in (82, 78, 74, 70, 66, 62, 58):
        im.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(destino) <= MAX_IMG:
            return q
    sys.exit(f"{destino}: {os.path.getsize(destino)} bytes, pasa de 450 kB")


def derivada(origen, nombre, ancho_max):
    """img/t-<nombre>.jpg a partir de `origen` (PNG o JPEG), reducida a `ancho_max` px y en 450 kB o menos."""
    destino = os.path.join(IMG, f"t-{nombre}.jpg")
    im = Image.open(origen).convert("RGB")
    if im.width > ancho_max:
        im = im.resize((ancho_max, round(im.height * ancho_max / im.width)), Image.LANCZOS)
    q = _guardar_jpg(im, destino)
    rel = f"img/t-{nombre}.jpg"
    detalle[rel] = {"origen": os.path.relpath(origen, BASE), "nota": f"derivada por el tablero: {im.width} × {im.height}, JPEG {q}"}
    return {"src": rel, "w": im.width, "h": im.height}


def captura(nombre):
    """Una captura de A o B que ya está en img/: se usa tal cual o, si pasa de 450 kB, se recomprime en su lugar."""
    ruta = os.path.join(IMG, nombre)
    if not os.path.exists(ruta):
        sys.exit(f"falta img/{nombre}")
    im = Image.open(ruta)
    w, h = im.size
    antes = os.path.getsize(ruta)
    if antes > MAX_IMG:
        im = im.convert("RGB")
        for q in (80, 76, 72, 68, 64, 60):
            im.save(ruta, "JPEG", quality=q, optimize=True, progressive=True)
            if os.path.getsize(ruta) <= MAX_IMG:
                break
        despues = os.path.getsize(ruta)
        if despues > MAX_IMG:
            sys.exit(f"img/{nombre}: {despues} bytes, pasa de 450 kB")
        recompresion.append({"img": f"img/{nombre}", "bytesAntes": antes, "bytesDespues": despues, "calidad": q,
                             "por": "herramientas/armar-tablero.py"})
        # se anota en el acto: si la corrida se cae después, la segunda ya no vería que esta captura pasaba de 450 kB
        with open(REC_PATH, "w", encoding="utf-8") as f:
            json.dump(recompresion, f, ensure_ascii=False, indent=1)
    rel = f"img/{nombre}"
    nota = "captura de la dirección, tal cual"
    for r in recompresion:
        if r["img"] == rel:
            nota = f"captura de la dirección, recomprimida por el tablero de {r['bytesAntes']} a {r['bytesDespues']} bytes (JPEG {r['calidad']})"
    detalle[rel] = {"origen": "la dirección (" + ("proto/a" if nombre.startswith("a-") else "proto/b") + ")", "nota": nota}
    return {"src": rel, "w": w, "h": h}


def sonda(ruta):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                        "stream=codec_name,profile,level,width,height:format=duration", "-of", "json", ruta],
                       capture_output=True, text=True, check=True)
    d = json.loads(r.stdout)
    s = d["streams"][0]
    return {"codec": s["codec_name"], "perfil": s.get("profile"), "nivel": s.get("level"), "w": s["width"],
            "h": s["height"], "dur": float(d["format"]["duration"])}


def tipo_mp4(info):
    perfil = {"Constrained Baseline": "42E0", "Baseline": "4200", "Main": "4D00", "High": "6400"}[info["perfil"]]
    return f'video/mp4; codecs="avc1.{perfil}{info["nivel"]:02X}"'


def a_mp4(webm, nombre):
    destino = os.path.join(VIDEO, f"t-{nombre}.mp4")
    if not os.path.exists(destino) or os.path.getmtime(destino) < os.path.getmtime(webm):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", webm, "-an", "-c:v", "libx264", "-preset", "slow", "-crf",
                        "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-map_metadata", "-1", destino], check=True)
    detalle[f"video/t-{nombre}.mp4"] = {"origen": os.path.relpath(webm, BASE), "nota": "H.264 para Safari, hecho por el tablero con ffmpeg (libx264, crf 24)"}
    return f"video/t-{nombre}.mp4"


def copia(origen, destino_rel):
    destino = os.path.join(BASE, destino_rel)
    if not (os.path.exists(destino) and filecmp.cmp(origen, destino, shallow=False)):
        shutil.copyfile(origen, destino)
    detalle[destino_rel] = {"origen": os.path.relpath(origen, BASE), "nota": "copia exacta"}
    return destino_rel


def cuadro(video, nombre, t=1.0):
    """Póster: el cuadro del segundo `t` del recorrido."""
    with tempfile.TemporaryDirectory() as tmp:
        png = os.path.join(tmp, "cuadro.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", video, "-frames:v", "1", png], check=True)
        f = derivada(png, nombre, 1440)
    detalle[f["src"]]["origen"] = os.path.relpath(video, BASE) + f" (cuadro del segundo {num(t)})"
    return f


def figura(f, alt, pie="", clase="", carga="lazy"):
    cap = f"<figcaption>{pie}</figcaption>" if pie else ""
    return (f'<figure class="fig {clase}"><img src="{f["src"]}" width="{f["w"]}" height="{f["h"]}" alt="{e(alt)}" '
            f'loading="{carga}" decoding="async">{cap}</figure>')


def clip(fuentes, poster, etiqueta, pie, w, h):
    src = "".join(f'<source src="{s}" type=\'{t}\'>' for s, t in fuentes)
    return (f'<figure class="fig clip"><video controls preload="none" playsinline poster="{poster["src"]}" width="{w}" '
            f'height="{h}" aria-label="{e(etiqueta)}">{src}</video><figcaption>{pie}</figcaption></figure>')


# ---------------------------------------------------------------- 1 · compuerta 1 (brief)
brief = leer(os.path.join(E12, "brief-de-obra.md"))
c1 = {}
for fila in tabla_md(seccion_md(brief, "Compuerta 1 (16-oct)"), "# | Lo que decidió"):
    c1[int(fila[0])] = {"decidio": fila[1], "cita": fila[2]}
assert sorted(c1) == list(range(1, 10)), c1.keys()


def cita(n):
    c = c1[n]["cita"]
    assert c.startswith("«") and c.endswith("»"), (n, c)
    return e(c)


assert "(sin cita)" in c1[8]["cita"] and "(sin cita)" in c1[9]["cita"]
decidiste = [
    ("Las cinco preguntas del brief van con la opción recomendada: el mismo comprador, la declaración arriba con el "
     "chequeo como su prueba en la misma pantalla, <code>/trabajo/</code> como índice con una página por caso, y Redes "
     "y Paid Media en una línea de la home.", cita(1)),
    ("Dos casos reales nuevos: Combeau sin pedir más permiso, porque ya lo pediste, y Praxi como sitio y app.",
     f"{cita(2)} · {cita(3)}"),
    ("Los casos se cuentan como Koto: ficha lateral pegajosa, secciones, imágenes grandes y el resultado medido o «Sin "
     "métrica».", cita(4)),
    ("Cuatro piezas de concepto, una por rubro que vendemos (industrial B2B, clínica, estudio legal y servicios), con "
     "identidad, sitio y movimiento, rotuladas «Concepto».", cita(5)),
    ("Base negra como Koto, con juegos de blanco u otros colores en páginas o secciones interiores.", cita(6)),
    ("En diseño manda la referencia y el manual antiguo deja de regir: una letra por dirección (A, Google Sans Flex; B, "
     "Mona Sans; DM Mono en las dos) y Bruno propone los caminos de logo en esta compuerta.", cita(7)),
]
assert len(decidiste) == 6

# Koto: cómo juega con el color (medido el 16-oct, lock §20.1)
koto = leer_json(os.path.join(E12, "medicion", "koto", "paso2", "medicion-color-y-casos.json"))
pp = koto["color"]["porPagina"]
K_PARADAS = sum(v["paradas"] for v in pp.values())
K_RECORRIDOS = len(pp)
assert K_PARADAS == 640 and K_RECORRIDOS == 27, (K_PARADAS, K_RECORRIDOS)
assert all(v["fondoDeHtmlBodyMain"][0] == "rgb(6, 6, 6)" for v in pp.values())
lyft = pp["lyft-1440"]
lyft_r = koto["color"]["resumen"]["casos1440"]["lyft-1440"]
lock = leer(os.path.join(E12, "lock-koto.md"))
assert "`#F1F0EB` en Lyft" in lock and "magenta `#FF00C4` en Lyft" in lock
koto_lyft = derivada(os.path.join(E12, "medicion", "koto", "paso2", "capturas", "color-lyft-1440.jpg"), "koto-lyft-1440", 720)

# ---------------------------------------------------------------- 2 · las dos direcciones
a_render = leer_json(os.path.join(PA, "medicion", "render.json"))
a_med = leer_json(os.path.join(PA, "medicion", "mediciones.json"))
a_campos = leer_json(os.path.join(PA, "medicion", "campos.json"))
b_caps = leer_json(os.path.join(PB, "datos", "capturas.json"))["archivos"]
b_campos = leer_json(os.path.join(PB, "datos", "campos.json"))
b_primera = leer_json(os.path.join(PB, "datos", "primera-y-ficha.json"))
dir_a = leer(os.path.join(BASE, "direccion-a.md"))
dir_b = leer(os.path.join(BASE, "direccion-b.md"))

a_h1 = {(p["id"], p["w"]): p["estiloH1"] for p in a_med["paginas"]}
assert a_h1[("home", 1440)]["tam"] == "48px" and a_h1[("home", 1440)]["ancho"] == "76%"
A_PRIMERA = {p["w"]: p for p in a_med["primera"]}
assert A_PRIMERA[1440]["campoDentro"] and A_PRIMERA[1440]["botonDentro"]
B_H1 = float(b_primera["home@1440"]["h1px"].rstrip("px"))
assert b_primera["home@1440"]["campo"]["abajo"] <= 900
for clave in ("Problema", "Hipótesis", "Solución", "La pieza", "Sin métrica"):
    assert clave in b_primera["trabajo/praxi/@1440-mitad"]["secciones"]
# Los dos logos provisorios, como los dejan escritos las direcciones
assert "camino 2, «El huso»" in dir_a and "camino 3, «Dos cortes»" in dir_b
# A muestra los puntajes propios por defecto y B no: se dice en el tablero (decisión 6)
assert "el 54 → 94 de Verifica y Cumple" in dir_a and "`PUNTAJES_PROPIOS = False`" in dir_b

VISTAS = [
    # (clave, título, id en A, id en B, abierta)
    ("home", "Vista 1 · La home", "home", "home", True),
    ("trabajo", "Vista 2 · /trabajo/, el índice", "trabajo", "trabajo", True),
    ("praxi", "Vista 3 · Caso real: Praxi", "caso-praxi", "praxi", False),
    ("sesenta", "Vista 4 · Caso de concepto: Sesenta", "caso-sesenta", "sesenta", False),
    ("desarrollo-web", "Vista 5 · Desarrollo web, el juego de color", "desarrollo-web", "desarrollo-web", False),
]


def tramos_a(vid, ancho):
    r = [x for x in a_render if x["id"] == vid and x["ancho"] == ancho]
    assert len(r) == 1, (vid, ancho)
    return [f"a-{vid}-{ancho}-{k:02d}.jpg" for k in range(1, r[0]["tramos"] + 1)]


def tramos_b(vid, ancho):
    pre = f"b-{vid}-{ancho}-"
    t = sorted([x for x in b_caps if x.startswith(pre) and re.fullmatch(r"\d+de\d+\.jpg", x[len(pre):])],
               key=lambda x: int(x[len(pre):].split("de")[0]))
    assert t and int(t[-1][len(pre):].split("de")[1].split(".")[0]) == len(t), (vid, ancho, t)
    return t


def pct(x):
    return num(x * 100 if x <= 1 else x)


ac = a_campos
bc = b_campos
PIES = {
    "a": {
        "home": f"La cinta de ocho piezas llena la primera pantalla y la ficha de la pieza que pasa cambia con ella. La declaración va a {a_h1[('home', 1440)]['tam'].replace('px', ' px')} con el chequeo al lado: campo y botón dentro de los 900 px (el botón termina en el px {A_PRIMERA[1440]['boton']['bottom']}).",
        "trabajo": f"El muro de dos columnas en tres proporciones (4:5, 4:3 y 5:3), sin bordes. El filtro filtra de verdad y el conteo es el de las entradas. Imagen: {pct(ac['trabajo']['area_medios'])} % de la página.",
        "praxi": f"La barra lateral pegajosa con la ficha y el índice de secciones, el video del inicio de Praxi y las cinco secciones. Imagen: {pct(ac['caso-praxi']['area_medios'])} % de la página.",
        "sesenta": f"La misma plantilla con el texto de Bruno; «Concepto · 2026» en la ficha, sin scroll, a 1440 y a 390. Imagen: {pct(ac['caso-sesenta']['area_medios'])} %; campos de color: {pct(ac['caso-sesenta']['area_campos'])} %.",
        "desarrollo-web": "El lienzo no cambia, como en Koto: el color entra con una franja de Doceavo, las tres portadas de «Lo que construimos» y la fase a la vista, que pasa de gris a blanco al bajar. Los cuatro planes, tal cual <code>oferta-v3.json</code>.",
    },
    "b": {
        "home": f"La declaración a {num(B_H1, 0)} px y el panel del chequeo con la regla de las 21 señales, sin una sola imagen en la primera pantalla: campo y botón terminan en el px {b_primera['home@1440']['campo']['abajo']} de 900.",
        "trabajo": f"Una tabla de diez filas con filetes (Nombre · Tipo · Año · Con qué está hecho · Resultado) y un visor pegajoso que muestra la pieza al pasar o enfocar una fila. A 390, una lista con su imagen. Imagen: {pct(bc['trabajo']['medios_pct'])} % de la página.",
        "praxi": f"La barra de 346 px con la ficha como tabla; en «Sin métrica», la placa con el crudo de la verificación (384 de 384 tests, el 16-oct). Imagen: {pct(bc['praxi']['medios_pct'])} % de la página.",
        "sesenta": f"El texto de Bruno sin cambiar una palabra; «Concepto» en la ficha, en el sello de cada placa y en el video. Imagen: {pct(bc['sesenta']['medios_pct'])} %; campos de color: {pct(bc['sesenta']['campos_pct'])} %.",
        "desarrollo-web": f"Los planes van en una hoja blanca con la forma de un campo de Koto (marco de radio 6 a 16 px del borde), {pct(bc['desarrollo-web']['hoja_pct'])} % del alto de la página: el único campo que pone la interfaz y no el trabajo. Es un desvío de Koto, rotulado.",
    },
}
assert "384 / 384" in dir_b

DIRECCIONES = {
    "a": {
        "nombre": "A · Archivo",
        "clase": "nombre-a",
        "lema": ("El trabajo es lo grande.", "Un lienzo negro donde la interfaz se retira, en gris, chica y sin negrita, y lo que ocupa la pantalla son las capturas y grabaciones del trabajo en su marco."),
        "distinta": [
            f"Carga la pantalla el trabajo: la cinta en la primera pantalla, el índice como muro de imágenes ({pct(ac['trabajo']['area_medios'])} % de <code>/trabajo/</code>) y casos con {pct(ac['caso-praxi']['area_medios'])} a {pct(ac['caso-sesenta']['area_medios'])} % de imagen.",
            f"El titular a la escala de Koto: {a_h1[('home', 1440)]['tam'].replace('px', ' px')} en la home a 1440, en Google Sans Flex liviana (peso {a_h1[('home', 1440)]['peso']}, ancho {a_h1[('home', 1440)]['ancho'].replace('%', ' %')}).",
            "El color lo pone cada pieza dentro de su marco y la interfaz no tiene ninguno: ni en Desarrollo web cambia el lienzo.",
        ],
        "valores": [
            ("Qué sacrifica", "El hero monumental: la frase va a 48 px, no a escala de cartel. Y depende del material grabado: sin capturas buenas, A se cae."),
            ("Riesgo de la letra", "Google Sans Flex es la letra de los productos de Google: un estudio que vende aparecer en Google, escrito con ella, puede leerse como «de Google». La elegiste sabiéndolo; aquí la puedes pesar mirándola."),
            ("Logo provisorio", "Camino 2, «El huso» (sección 3). Va de muestra: el camino lo eliges tú."),
            ("Medido a 1440", f"Negro fuera de los medios: home {pct(ac['home']['negro_fuera_de_medios'])} %, <code>/trabajo/</code> {pct(ac['trabajo']['negro_fuera_de_medios'])} % (piso 80 %). El chequeo, dentro de la primera pantalla a 1440 × 900 y a 390 × 844."),
        ],
        "recorridos": ["home", "trabajo"],
        "estados": [
            (os.path.join(PA, "medicion", "a-cursor-1440.png"), "a-cursor-1440", 1000, "Dirección A: el círculo blanco con «Ver el caso» sobre Combeau en el índice, la pieza recortada y la vecina bajo el velo", "El cursor sobre una pieza del índice: círculo blanco con «Ver el caso»; las demás quedan bajo el velo al 70 %."),
            (os.path.join(PA, "medicion", "a-chequeo-resultado-1440.png"), "a-chequeo-1440", 346, "Dirección A: el panel del chequeo con el resultado 94 de 100 y la lista de las 21 señales", "El chequeo corrido de verdad contra <code>/api/chequeo</code> sobre verifica.spindlelab.cl, sitio propio: 94/100 con sus 21 ítems."),
        ],
    },
    "b": {
        "nombre": "B · Banco",
        "clase": "nombre-b",
        "lema": ("El dato vivo es lo grande.", "La declaración a escala de cartel, el chequeo de verdad como su prueba y el índice como una tabla con filetes donde cada fila abre su pieza."),
        "distinta": [
            "Carga la pantalla el dato vivo: el chequeo con la regla de sus 21 señales en la primera pantalla, la cifra que prueba cada pieza y la hora y el peso de tu visita.",
            f"La declaración a {num(B_H1, 0)} px en Mona Sans liviana (peso 340, ancho 89 %), sin una sola imagen en la primera pantalla de la home.",
            f"El índice es una tabla con un visor que muestra la pieza al pasar o enfocar ({pct(bc['trabajo']['medios_pct'])} % de imagen en <code>/trabajo/</code>), y los planes van en una hoja blanca.",
        ],
        "valores": [
            ("Qué sacrifica", "El muro de imágenes de Koto: en el índice el trabajo se ve de a una pieza, en un visor de 346 px. Y más texto por pantalla, con el riesgo de leerse como panel."),
            ("Logo provisorio", "Camino 3, «Dos cortes» (sección 3): la mono, que en B es la voz del dato, entra en el nombre. Va de muestra: el camino lo eliges tú."),
            ("Medido a 1440", f"Negro fuera de los medios: home {pct(bc['home']['negro_fuera_de_medios_pct'])} %, <code>/trabajo/</code> {pct(bc['trabajo']['negro_fuera_de_medios_pct'])} % (piso 80 %). El chequeo, dentro de la primera pantalla a 1440 × 900 y a 390 × 844."),
        ],
        "recorridos": ["home", "trabajo"],
        "estados": [
            (os.path.join(IMG, "b-trabajo-1440-visor.jpg"), None, None, "Dirección B: el mouse sobre la fila de Tonela, la fila activa, el círculo blanco y el visor con el recorrido del concepto", "El mouse sobre la fila de Tonela: la fila pasa a la placa activa, aparece el círculo y el visor corre el recorrido del concepto."),
            (os.path.join(IMG, "b-home-1440-chequeo.jpg"), None, None, "Dirección B: el panel del chequeo corrido sobre example.com con 30 de 100 y la regla de 21 tramos llena", "El chequeo corrido de verdad sobre example.com, el dominio de ejemplo de la IANA: 30/100, y la regla de las 21 señales llena."),
        ],
    },
}
for k, d in DIRECCIONES.items():
    assert len(d["distinta"]) == 3


def visor(tramos, alt_base, clase):
    imgs = "".join(
        f'<img src="{t["src"]}" width="{t["w"]}" height="{t["h"]}" alt="{e(alt_base)}, tramo {i} de {len(tramos)}" loading="lazy" decoding="async">'
        for i, t in enumerate(tramos, 1))
    return (f'<div class="visor {clase}" tabindex="0" role="region" aria-label="{e(alt_base)}: se desplaza dentro del marco">'
            f"{imgs}</div>")


def bloque_vista(k, clave, titulo, vid, abierta):
    if k == "a":
        p1440 = captura(f"a-{vid}-1440-primera.jpg")
        p390 = captura(f"a-{vid}-390-primera.jpg")
        t1440 = [captura(x) for x in tramos_a(vid, 1440)]
        t390 = [captura(x) for x in tramos_a(vid, 390)]
    else:
        p1440 = captura(f"b-{vid}-1440-primera.jpg")
        p390 = captura(f"b-{vid}-390-primera.jpg")
        t1440 = [captura(x) for x in tramos_b(vid, 1440)]
        t390 = [captura(x) for x in tramos_b(vid, 390)]
    letra = k.upper()
    nombre_vista = titulo.split(" · ", 1)[1]
    cuerpo = f"""
      <p class="pie-vista">{PIES[k][clave]}</p>
      <div class="par">
        {figura(p1440, f'Dirección {letra}, {nombre_vista}, a 1440: primera pantalla', 'Primera pantalla a 1440 × 900', 'pantalla')}
        {figura(p390, f'Dirección {letra}, {nombre_vista}, a 390: primera pantalla', 'A 390 × 844', 'pantalla pantalla--tel')}
      </div>
      <div class="par par--visor">
        <div class="visor-caja"><p class="rotulo">Página completa a 1440 · baja dentro del marco</p>{visor(t1440, f'Dirección {letra}, {nombre_vista}, página completa a 1440', 'visor--1440')}</div>
        <div class="visor-caja visor-caja--tel"><p class="rotulo">A 390</p>{visor(t390, f'Dirección {letra}, {nombre_vista}, página completa a 390', 'visor--390')}</div>
      </div>"""
    if abierta:
        return f'<div class="vista" id="{k}-{clave}"><h3>{e(titulo)}</h3>{cuerpo}</div>'
    return (f'<details class="vista plegable" id="{k}-{clave}"><summary><h3>{e(titulo)}</h3>'
            f'<span class="mas" aria-hidden="true"></span></summary>{cuerpo}</details>')


DUR = {}


def seccion_direccion(k):
    d = DIRECCIONES[k]
    letra = k.upper()
    distinta = "".join(f"<li><span>{x}</span></li>" for x in d["distinta"])
    valores = "".join(f"<div><dt>{e(a)}</dt><dd>{b}</dd></div>" for a, b in d["valores"])
    clips = []
    for vid in d["recorridos"]:
        webm = os.path.join(VIDEO, f"{k}-{vid}-1440.webm")
        info = sonda(webm)
        mp4 = a_mp4(webm, f"{k}-{vid}-1440")
        imp4 = sonda(os.path.join(BASE, mp4))
        assert imp4["codec"] == "h264" and abs(imp4["dur"] - info["dur"]) < 0.2, (mp4, imp4, info)
        detalle[f"video/{k}-{vid}-1440.webm"] = {"origen": "la dirección", "nota": f"recorrido grabado del navegador, {info['codec'].upper()}"}
        poster = cuadro(webm, f"{k}-{vid}-1440-recorrido")
        nombre = "la home" if vid == "home" else "/trabajo/"
        DUR[(k, vid)] = info["dur"]
        clips.append(clip([(mp4, tipo_mp4(imp4)), (f"video/{k}-{vid}-1440.webm", "video/webm")], poster,
                          f"Recorrido de {nombre} de la dirección {letra}, a 1440",
                          f"Recorrido de {e(nombre)} a 1440 × 900, {num(info['dur'])} s, grabado del navegador con el mouse de verdad: el movimiento corre con Motion, no es una animación aparte.",
                          info["w"], info["h"]))
    estados = []
    for origen, nombre, ancho, alt, pie in d["estados"]:
        f = derivada(origen, nombre, ancho) if nombre else captura(os.path.basename(origen))
        estados.append(figura(f, alt, pie))
    vistas = "".join(bloque_vista(k, *v[:2], v[2] if k == "a" else v[3], v[4]) for v in VISTAS)
    lema = f'<span class="t1">{e(d["lema"][0])}</span> <span class="t2">{e(d["lema"][1])}</span>'
    return f"""
<section id="{k}" class="seccion" aria-labelledby="t-{k}">
  <div class="seccion__lado"><p class="rotulo">2 · Dirección {letra}</p><h2 id="t-{k}" class="{d['clase']}">{e(d['nombre'])}</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro">{lema}</p>
    <div class="bloque"><p class="rotulo">Qué la hace distinta</p><ol class="tres">{distinta}</ol></div>
    <dl class="valores">{valores}</dl>
    <div class="bloque"><h3>Recorridos</h3><div class="galeria galeria--2">{''.join(clips)}</div></div>
    <div class="bloque"><h3>Las cinco vistas</h3><p class="nota">La home y el índice van abiertos; las otras tres se abren con un toque. Cada vista trae su primera pantalla a 1440 y a 390 y, debajo, la página completa en un marco que se baja por dentro.</p></div>
    {vistas}
    <details class="plegable"><summary><h3>Dos estados que una captura de página no muestra</h3><span class="mas" aria-hidden="true"></span></summary>
      <div class="galeria galeria--2 estados">{''.join(estados)}</div>
    </details>
  </div>
</section>"""


seccion_a = seccion_direccion("a")
seccion_b = seccion_direccion("b")

# ---------------------------------------------------------------- 3 · logo
caminos_md = leer(os.path.join(E12, "logo", "caminos.md"))
filas_c = {f[0]: f[1:] for f in tabla_md(seccion_md(caminos_md, "6 · Los tres, lado a lado"), "1 · La palabra")}
# la tabla tiene la fila de encabezado con los nombres; tabla_md devuelve las filas de datos con el rótulo en f[0]
filas_c = {sin_md(k): v for k, v in filas_c.items()}
for clave in ("Lo que lo hace distinto", "Lenguaje", "Favicon", "Riesgo"):
    assert clave in filas_c and len(filas_c[clave]) == 3, (clave, filas_c.keys())
CAMINOS = [
    ("camino-1-la-palabra", "1 · La palabra", "El nombre en la letra del sitio, sin dibujo."),
    ("camino-2-el-huso", "2 · El huso", "La «i» de Spindle se vuelve un huso: un signo propio dentro del nombre."),
    ("camino-3-dos-cortes", "3 · Dos cortes", "«Spindle» en la sans de la dirección y «LAB» en la mono del sitio."),
]
assert "**Mi recomendación: el camino 2, El huso.**" in caminos_md
logo_html = []
for i, (slug, titulo, idea) in enumerate(CAMINOS):
    f = derivada(os.path.join(E12, "logo", "laminas", f"{slug}.png"), f"logo-{slug}", 1920)
    usa = {1: " Va de muestra en la dirección A.", 2: " Va de muestra en la dirección B."}.get(i, "")
    rec = ' <span class="sello sello--suave">Bruno lo recomienda</span>' if i == 1 else ""
    logo_html.append(f"""
      <li class="camino">
        <h3>{e(titulo)}{rec}</h3>
        <p class="t1">{e(idea)}{e(usa)}</p>
        {figura(f, f'Lámina del camino {titulo} del logo de SpindleLab: el wordmark en A y en B, el menú a 1440 y 390 sobre negro y sobre blanco, y el favicon a 16 y 32 px', '')}
        <dl class="valores valores--chico">
          <div><dt>Lo distinto</dt><dd>{md(filas_c['Lo que lo hace distinto'][i])}</dd></div>
          <div><dt>Lenguaje</dt><dd>{md(filas_c['Lenguaje'][i])}</dd></div>
          <div><dt>Favicon</dt><dd>{md(filas_c['Favicon'][i])}</dd></div>
          <div><dt>Riesgo</dt><dd>{md(filas_c['Riesgo'][i])}</dd></div>
        </dl>
      </li>""")
seccion_logo = f"""
<section id="logo" class="seccion" aria-labelledby="t-logo">
  <div class="seccion__lado"><p class="rotulo">3</p><h2 id="t-logo">Los caminos de logo</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Tres caminos, cada uno con una sola idea.</span> <span class="t2">Monocromos, sin el oro ni Gabarito, hechos con letras libres (OFL) dibujadas como trazados. Lo que eliges es el camino; el dibujo final se hace con la dirección elegida.</span></p>
    <ol class="caminos">{''.join(logo_html)}</ol>
    <p class="nota">Cada lámina trae el wordmark en A y en B, el menú del sitio a tamaño real a 1440 y a 390 sobre negro y sobre blanco, y el favicon a 16 y 32 px. Detalle, construcción y licencias: <code>e12/logo/caminos.md</code>.</p>
  </div>
</section>"""

# ---------------------------------------------------------------- 4 · piezas de concepto
plan = leer(os.path.join(PORTAFOLIO, "plan-e12.md"))
p0 = tabla_md(seccion_md(plan, "0 · En corto"), "Carpeta | Marca")
p6 = {sin_md(f[0]): f for f in tabla_md(seccion_md(plan, "6 · Comprobación de nombres"), "Nombre |")}
p11_sec = seccion_md(plan, "11 · Fotografía y video")
p11 = {sin_md(f[0]): f for f in tabla_md(p11_sec, "Pieza | Fotos")}
assert "**USD 49 por un mes**" in p11_sec and "**Saldo: 0 créditos, plan gratuito.**" in p11_sec
assert sin_md(p11["Total"][3]) == "~75", p11["Total"]
assert "USD 0,04 por imagen" in p11_sec


def minus(t):
    return t[:1].lower() + t[1:]


def tanda(c):
    fotos, clips = int(sin_md(c[1])), int(sin_md(c[2]))
    partes = [f"{fotos} foto{'s' if fotos != 1 else ''}"]
    if clips:
        partes.append(f"{clips} clip{'s' if clips != 1 else ''} de 5 s")
    return " y ".join(partes)


PIEZAS = []
for f in p0:
    carpeta = sin_md(f[0])
    marca = sin_md(f[1])
    slug = marca.lower()
    base = os.path.join(PORTAFOLIO, carpeta)
    PIEZAS.append({"carpeta": carpeta, "marca": marca, "slug": slug, "rubro": sin_md(f[2]), "quien": f[3], "lienzo": f[4],
                   "recurso": f[5], "nombre": p6[marca], "costo": p11[marca], "base": base})
assert [p["marca"] for p in PIEZAS] == ["Tonela", "Ocelo", "Sesenta", "Doceavo"], [p["marca"] for p in PIEZAS]
conceptos_html = []
for p in PIEZAS:
    s = p["slug"]
    b = p["base"]
    pliego = derivada(os.path.join(b, "identidad", "pliego.png"), f"c-{s}-pliego", 1920)
    h1440 = derivada(os.path.join(b, "capturas", "home-1440-primera.png"), f"c-{s}-home-1440", 1440)
    h390 = derivada(os.path.join(b, "capturas", "home-390-primera.png"), f"c-{s}-home-390", 780)
    poster = derivada(os.path.join(b, "movimiento", "poster.jpg"), f"c-{s}-recorrido", 1440)
    mp4 = copia(os.path.join(b, "movimiento", "recorrido.mp4"), f"video/t-c-{s}.mp4")
    webm = copia(os.path.join(b, "movimiento", "recorrido.webm"), f"video/t-c-{s}.webm")
    imp4 = sonda(os.path.join(BASE, mp4))
    iwebm = sonda(os.path.join(BASE, webm))
    assert imp4["codec"] == "h264" and iwebm["codec"] in ("vp8", "vp9"), (imp4, iwebm)
    extra = ""
    if s == "ocelo":
        luz = derivada(os.path.join(b, "capturas", "home-1440-luz-primera.png"), "c-ocelo-home-1440-luz", 1440)
        extra = figura(luz, "Ocelo, concepto: la primera pantalla de su home a 1440 con la luz encendida", "La misma primera pantalla con la luz encendida. Bruno pregunta cuál va por defecto (sección 7).", "pantalla")
    mas_lejos = ' <span class="sello sello--suave">La vista 4 de A y de B</span>' if s == "sesenta" else ""
    c = p["costo"]
    nombre = p["nombre"]
    conceptos_html.append(f"""
      <li class="concepto" id="c-{s}">
        <div class="concepto__cab">
          <p><span class="sello">Concepto</span> <span class="rotulo">{e(p['rubro'])}</span></p>
          <h3>{e(p['marca'])}{mas_lejos}</h3>
          <p class="t2">{md(p['quien'])}. Lienzo: {md(minus(p['lienzo']))}. Recurso propio: {md(minus(p['recurso']))}.</p>
          <p class="nota">Nombre: <code>{s}.cl</code> {md(nombre[1]).lower()} en NIC Chile el 16-oct; búsqueda web: {md(nombre[2]).lower()}. {md(nombre[3])}.</p>
        </div>
        {figura(pliego, f'Pliego de identidad de {p["marca"]}, concepto: logo, colores con su rol, letra y su recurso propio', 'Pliego de identidad.')}
        <div class="par">
          {figura(h1440, f'{p["marca"]}, concepto: primera pantalla de su home a 1440', 'Su home, primera pantalla a 1440 × 900.', 'pantalla')}
          {figura(h390, f'{p["marca"]}, concepto: primera pantalla de su home a 390', 'A 390 × 844.', 'pantalla pantalla--tel')}
        </div>
        {extra}
        {clip([(mp4, tipo_mp4(imp4)), (webm, 'video/webm')], poster, f'Recorrido de la home de {p["marca"]}, concepto', f'Recorrido de {num(imp4["dur"])} s grabado del navegador desde su HTML (no generado).', imp4['w'], imp4['h'])}
        <div class="pregunta">
          <p class="rotulo">¿Subirla de nivel con foto o video generado?</p>
          <p>{tanda(c)}, unos {sin_md(c[3]).lstrip('~')} créditos. <span class="t1">Suma:</span> {md(c[4])}. <span class="t1">Sin eso:</span> {md(c[5])}.</p>
        </div>
      </li>""")
total = p11["Total"]
seccion_conceptos = f"""
<section id="conceptos" class="seccion" aria-labelledby="t-conceptos">
  <div class="seccion__lado"><p class="rotulo">4</p><h2 id="t-conceptos">Cuatro piezas de concepto</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Una por rubro que vendemos, opuestas entre sí.</span> <span class="t2">Marcas inventadas que suenan inventadas, sin cifras de resultado ni testimonios, con las restricciones reales de su rubro y el rótulo «Concepto» a la vista sin scroll. Son las mismas en A y en B: lo que cambia es cómo las presenta cada dirección.</span></p>
    <ol class="conceptos">{''.join(conceptos_html)}</ol>
    <div class="bloque costo">
      <h3>Lo que costaría la foto y el video generados</h3>
      <p>Las cuatro están terminadas sin generar nada. Si las subimos de nivel, las cuatro tandas suman <strong>{sin_md(total[1])} fotos y {sin_md(total[2])} clips, unos {sin_md(total[3]).lstrip('~')} créditos</strong> de Higgsfield, estimados por Bruno (el número exacto lo da el cálculo de costo de cada generación, que no se corrió). La cuenta tiene 0 créditos y no admite recargas sueltas, así que el costo real es un mes del plan PLUS: <strong>USD 49</strong>. La API de Gemini directa cuesta unos USD 0,04 por imagen, pero pide una clave que no tenemos y no hace video. Ninguna foto llevaría personas, y cada una se diría generada en su caso.</p>
      <p class="nota">Bruno recomienda decidirlo mirando cada pieza aquí. Detalle: <code>marketing/portafolio/plan-e12.md</code> §11. Cero créditos gastados hasta ahora.</p>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- 5b · el texto de A contra el de B (criterio 14)
texto_c = leer_json(os.path.join(E12, "texto", "texto-paso2.json"))
DIF = leer_json(os.path.join(DATOS, "diferencias-texto.json"))
_trabajo_t = next(p for p in texto_c["paginas"] if p["id"] == "trabajo")
assert all(x["linea_corta"] == f"{x['tipo']} · {x['anio']}" for x in _trabajo_t["entradas"])
assert "Fuera de la home y de Desarrollo web (línea solo con tipo y año)" in leer(os.path.join(E12, "texto", "lectura-fria.md"))


def palabras(t):
    return set(re.findall(r"[^\W_]+", t.lower()))


CRUDO_PRAXI = palabras(leer(os.path.join(E12, "praxi", "crudo", "verificacion-copia.txt")) + " e12/praxi/crudo/verificacion-copia.txt vitest run archivos npm design check exit tsc noemit")
INTERFAZ_B = {"ir", "al", "contenido", "menú", "esta", "visita"}
ENCABEZADOS_B = {"nombre", "tipo", "año", "hecho", "resultado"}
DIFERENCIAS = [
    # (vista, palabras solo en A, palabras solo en B, qué cambia, por qué)
    ("home", {"14", "54", "94", "agregamos", "bloque", "comprobarlo", "faltaba", "nuestro", "quién", "sacaba", "sacó", "ve"},
     {"cualquiera", "metodología", "publicada", "puntos", "revise", "sobre", "suma"},
     "En «Cada pieza, con su prueba», A muestra el 54 → 94 de Verifica y Cumple con su fecha; B, la alternativa que dejó Clara («Mira 21 cosas de un sitio y las suma sobre 100 puntos…»).",
     "Los puntajes propios esperan tu sí: A los dejó puestos y B no. Con tu respuesta (abajo, «Lo demás que está abierto») quedan iguales."),
    ("home", set(), {"2", "3", "4", "5", "6", "7", "8", "40", "citar", "entienden"},
     "La regla de las 21 señales del chequeo: sus tres títulos («¿Te pueden leer?», «¿Te entienden?», «¿Te pueden citar?») y lo que pesa cada señal.",
     "Es el instrumento de B; los títulos son los que ya muestra el resultado del chequeo en producción y los pesos salen de <code>chequeo.js</code>."),
    ("trabajo", set(), {"100", "16", "384", "805", "95", "así", "automáticas", "cuántas", "descargar", "dominios", "guarda", "ha", "kb", "llega", "métrica", "nada", "negocio", "ningún", "oct", "pruebas", "puntos", "página", "revisiones", "sabemos", "usado", "uso", "veces", "verde"},
     "La columna «Resultado» del índice, una línea por entrada (Clara la escribió para cada una).",
     "El muro de A sigue al índice de Koto (nombre, bajada y línea mono) y deja el resultado para cada caso. Los puntajes de nuestro chequeo no entran en esa columna mientras no digas sí: Verifica y Cumple y spindlelab.cl llevan la alternativa de Clara."),
    ("praxi", set(), CRUDO_PRAXI,
     "En «Sin métrica», la placa con el crudo de la verificación: 384 de 384 tests en 35 archivos, 8 de 8 de la revisión de marca, <code>tsc</code> sin errores, la lista de archivos y la fecha.",
     "Es el dato vivo de B, copiado tal cual de <code>e12/praxi/crudo/verificacion-copia.txt</code>; A dice lo mismo en una frase."),
    ("sesenta", {"hecho", "identidad", "palabra", "sello", "símbolo", "color", "letra", "recurso", "e", "movimiento"}, {"derecho", "laboral", "lado", "trabajador", "centro", "ficticio"},
     "La ficha lateral: A lleva «Lo hecho» (identidad, sitio y movimiento); B, el rubro («Estudio legal · derecho laboral, del lado del trabajador, Santiago centro, ficticio»).",
     "Las dos salen de la ficha de <code>06-sesenta/caso.md</code>; cada dirección tomó una fila distinta. Se iguala con la dirección elegida."),
    ("sesenta", {"21", "24", "719", "asesoría", "certifica", "cumples", "diagnóstico", "dirección", "gratis", "horas", "ley", "mandamos", "mini", "personales", "revisa", "señales", "técnicas"}, set(),
     "El cierre: A pone el contacto de la home y la bajada de Verifica y Cumple, que es el caso siguiente; B, solo el botón y el nombre del siguiente.",
     "El caso de Bruno no trae texto de cierre. Clara lo escribe para las dos (es su pendiente)."),
    ("desarrollo-web", {"decap", "netlify", "image", "cdn", "api", "anthropic"}, set(),
     "Bajo las portadas de «Lo que construimos», A pone la línea con las herramientas (Decap CMS, Netlify Image CDN, API de Anthropic).",
     "Es un defecto de A: después de la lectura fría, Clara dejó para la home y esta página la línea corta, solo tipo y año (<code>linea_corta</code> en <code>texto-paso2.json</code>). Se corrige al construir la elegida."),
    ("desarrollo-web", {"doceavo"}, set(),
     "El nombre de la franja ancha de A: «Doceavo · Concepto · 2026».",
     "Es el juego de color de A en esta página; B no lleva esa franja."),
]
for v in ("trabajo", "desarrollo-web"):
    DIFERENCIAS.append((v, {"hola", "cl"}, set(), "El pie con <code>hola@spindlelab.cl</code> que A pone en las páginas de la casa (en la home no cuenta como diferencia porque B también da la dirección en su contacto).", "A deja sin pie solo los casos, como Koto; B termina todas sus páginas en el contacto, sin pie."))
for v in ("home", "trabajo", "praxi", "sesenta", "desarrollo-web"):
    DIFERENCIAS.append((v, set(), INTERFAZ_B | ENCABEZADOS_B, "Interfaz de B: «Ir al contenido», «Menú» a 390, «Esta visita» y los encabezados de sus tablas (Nombre, Tipo, Año, Con qué está hecho, Resultado).", "Son de B: la telemetría de la visita, el menú plegado y las columnas que Clara escribió para su tabla."))
for v, d in DIF["vistas"].items():
    cubre_a = set().union(*[x[1] for x in DIFERENCIAS if x[0] == v])
    cubre_b = set().union(*[x[2] for x in DIFERENCIAS if x[0] == v])
    sueltas_a = [w for w in d["soloA"] if w not in cubre_a]
    sueltas_b = [w for w in d["soloB"] if w not in cubre_b]
    assert not sueltas_a and not sueltas_b, (v, sueltas_a, sueltas_b)
for x in DIFERENCIAS:
    assert (x[1] & set(DIF["vistas"][x[0]]["soloA"])) or (x[2] & set(DIF["vistas"][x[0]]["soloB"])), ("diferencia que ya no está", x[0], x[3][:40])
NOMBRE_VISTA = {"home": "Home", "trabajo": "/trabajo/", "praxi": "Praxi", "sesenta": "Sesenta", "desarrollo-web": "Desarrollo web"}
# una fila por diferencia, con las vistas donde aparece juntas («las cinco» si está en todas)
filas = {}
for v, _, _, que, por in DIFERENCIAS:
    filas.setdefault((que, por), []).append(v)
filas_dif = []
for (que, por), vs in filas.items():
    donde = "Las cinco" if len(vs) == 5 else " y ".join(NOMBRE_VISTA[v] for v in vs)
    filas_dif.append(f'<tr><th scope="row">{donde}</th><td data-rotulo="Qué cambia">{que}</td><td data-rotulo="Por qué">{por}</td></tr>')
total_a = sum(len(d["soloA"]) for d in DIF["vistas"].values())
total_b = sum(len(d["soloB"]) for d in DIF["vistas"].values())
diferencias_html = f"""<details class="plegable"><summary><h3>El texto de A contra el de B: lo que cambia y por qué</h3><span class="mas" aria-hidden="true"></span></summary>
      <p class="nota">El texto de Clara es el mismo en las dos; esto es lo que cada dirección muestra de más o de menos. Medido palabra por palabra en las cinco vistas, a 1440 y a 390, sin la hora ni el peso de la visita (<code>herramientas/diferencias-texto.mjs</code>, <code>datos/diferencias-texto.json</code>): {total_a} palabras solo en A y {total_b} solo en B, todas explicadas aquí. Lo que no está en esta lista es igual en A y en B.</p>
      <div class="tabla-envuelta"><table class="tabla tabla--dif"><thead><tr><th scope="col">Vista</th><th scope="col">Qué cambia</th><th scope="col">Por qué</th></tr></thead><tbody>{''.join(filas_dif)}</tbody></table></div>
    </details>"""

# ---------------------------------------------------------------- 5 · texto: el hero y la lectura fría
texto = leer_json(os.path.join(E12, "texto", "texto-paso2.json"))
home_t = next(p for p in texto["paginas"] if p["id"] == "home")
hero = next(s for s in home_t["secciones"] if s["id"] == "hero")
assert [o["id"] for o in hero["opciones"]] == ["hero-ramon", "hero-estudio", "hero-sitio"]
assert texto["decision_hero"]["recomendada"] == "hero-sitio"
fria = leer(os.path.join(E12, "texto", "lectura-fria.md"))
filas_h = tabla_md(seccion_md(fria, "La decisión del hero"), "Versión | Vuelta 1")
assert len(filas_h) == 3
no_corr = seccion_md(fria, "Lo que no se corrigió, y por qué").split("\n---")[0]
no_corr_items = re.findall(r"^\d+\. \*\*(.+?)\*\*(.*?)(?=^\d+\. |\Z)", no_corr, flags=re.S | re.M)
assert len(no_corr_items) == 7, len(no_corr_items)
como = seccion_md(fria, "Cómo se hizo")
assert "gerente comercial de una industrial B2B de 40 personas" in como
hero_html = []
for i, o in enumerate(hero["opciones"]):
    el = {x["rol"]: x for x in o["elementos"]}
    h1 = el["h1"]
    frase = f'<span class="t1">{e(h1["tinta"])}</span> <span class="t2">{e(h1["gris"])}</span>'
    rec = ' <span class="sello sello--suave">Recomendada</span>' if o["recomendada"] else ""
    v1, v2 = filas_h[i][1], filas_h[i][2]
    hero_html.append(f"""
      <li class="opcion" id="hero-{i + 1}">
        <h3>{e(o['marca'])}{rec}</h3>
        <div class="especimenes">
          <div class="especimen"><p class="rotulo">En A, a escala de la home a 1440</p><p class="esp esp-a" lang="es-CL">{frase}</p></div>
          <div class="especimen"><p class="rotulo">En B, a escala de la home a 1440</p><p class="esp esp-b" lang="es-CL">{frase}</p></div>
        </div>
        <p class="entradilla">{e(el['entradilla']['texto'])}</p>
        <dl class="valores valores--chico">
          <div><dt>Primera lectura</dt><dd>{md(v1)}</dd></div>
          <div><dt>Segunda lectura</dt><dd>{md(v2)}</dd></div>
        </dl>
      </li>""")
def resto(r):
    r = " ".join(r.split())
    return md(r) if r[:1] in ",.;:" else " " + md(r)


no_corr_html = "".join(f"<li><strong>{md(t)}</strong>{resto(r)}</li>" for t, r in no_corr_items)
seccion_texto = f"""
<section id="texto" class="seccion" aria-labelledby="t-texto">
  <div class="seccion__lado"><p class="rotulo">5</p><h2 id="t-texto">El texto: el hero en sus tres opciones</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Las tres van con el mismo chequeo debajo.</span> <span class="t2">Las leyeron tres lectores fríos que no sabían quién escribió cada una: el gerente comercial de una industrial B2B, la dueña de una clínica dental de regiones y el socio de un estudio de abogados, en dos vueltas.</span></p>
    <p class="nota">Las dos direcciones están construidas con la opción 3. Las muestras de abajo son la frase en la letra y la escala de cada dirección, reducidas al ancho de esta columna para que el corte de línea sea el de la home a 1440. Es una lectura simulada, no un test con personas: sirve para ver dónde se pierde alguien que no sabe de SEO, no para contar cuántos (<code>e12/texto/lectura-fria.md</code>).</p>
    <ol class="opciones">{''.join(hero_html)}</ol>
    <details class="plegable"><summary><h3>Lo que los lectores pidieron y no se arregla escribiendo</h3><span class="mas" aria-hidden="true"></span></summary>
      <p class="nota">Tal como lo dejó Clara en <code>lectura-fria.md</code>: piden una decisión tuya o un dato que no está en el repo.</p>
      <ol class="lista-larga">{no_corr_html}</ol>
    </details>
    {diferencias_html}
  </div>
</section>"""

# ---------------------------------------------------------------- 6 · Praxi
inv = leer(os.path.join(E12, "inventario-praxi.md"))
s81 = tabla_md(seccion_md(inv, "8.1 · Se puede decir", "### "), "Afirmación | Fuente")
s10 = seccion_md(inv, "10 · Pedir a Ramón")
pedir = re.findall(r"^\d+\. \*\*(.+?)\*\*(.*?)(?=^\d+\. |\Z)", s10, flags=re.S | re.M)
assert len(s81) == 12 and len(pedir) == 6, (len(s81), len(pedir))
assert "la vista 3 sigue siendo Combeau" in inv
estado = leer(os.path.join(DATOS, "estado-praxi.txt"))
m_fecha = re.search(r"medido (\d{4}-\d\d-\d\d)T(\d\d):(\d\d)", estado)
codigos = re.findall(r"^HTTP/\S+ (\d{3})", estado, flags=re.M)
errores_v = re.findall(r"^x-vercel-error: (\S+)", estado, flags=re.M | re.I)
assert codigos and all(c != "200" for c in codigos), codigos
CODIGO = codigos[0]
ERROR_V = errores_v[0] if errores_v else ""
_h = (int(m_fecha[2]) - 3) % 24  # Santiago en octubre: UTC-3
HORA_CL = f"{_h:02d}:{m_fecha[3]}"
assert m_fecha[1] == "2026-10-17", m_fecha[1]
hay_html = "".join(f"<li><span>{md(a)}</span><span class=\"fuente\">{md(b)}</span></li>" for a, b in s81)
PEDIR = [
    ("Capturas de la app", "<strong>Capturas de la app:</strong> Inicio, el Coach guardando un registro, Registro con la tarjeta del día, Progreso y Perfil, a 390 de ancho, desde una cuenta de prueba tuya y nunca la de un usuario. Como praxi.coach está apagado, sería corriendo Praxi en tu Mac. O dime que el caso va sin ellas."),
    ("¿Se cuenta que Praxi está en pausa?", "<strong>¿Contamos que Praxi está en pausa?</strong> Si lo reactivas, se mide de nuevo y recién ahí se enlaza."),
    ("De dónde salen `landing-1.jpg`, `landing-2.jpg` y `landing-3.jpg`", "<strong>¿De dónde salen las tres fotos de la landing</strong> (<code>landing-1.jpg</code> a <code>landing-3.jpg</code>): generadas, de banco o compradas, y con qué licencia? Mientras no se sepa, no entran al caso."),
    ("¿Se nombran los modelos", "<strong>¿Nombramos los modelos</strong> (Sonnet 5 y Haiku 4.5) o basta con «la API de Anthropic»?"),
    ("Los datos de uso del 24-ago no se publican", "<strong>Los datos de uso del 24-ago no se publican</strong>, salvo que tú lo decidas; recomendamos «Sin métrica»."),
    ("Permiso:", "<strong>Permiso:</strong> no hace falta el de nadie más, porque es tuyo. Solo dinos si el caso cuenta que lo construiste con agentes de IA, como dicen los commits."),
]
assert [t for t, _ in pedir] == [t for t, _ in PEDIR], [t for t, _ in pedir]
pedir_html = "".join(f"<li>{h}</li>" for _, h in PEDIR)
seccion_praxi = f"""
<section id="praxi" class="seccion" aria-labelledby="t-praxi">
  <div class="seccion__lado"><p class="rotulo">6</p><h2 id="t-praxi">Praxi: lo que hay y lo que te pedimos</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Es el único trabajo con IA programada y la única app con cuentas y cobro.</span> <span class="t2">El caso se puede contar con fecha e instrumento por su oficio, no por su uso: «Sin métrica».</span></p>
    <dl class="valores">
      <div><dt>Hoy, 17-oct, {HORA_CL}</dt><dd>praxi.coach responde <strong>{CODIGO}</strong> con <code>{e(ERROR_V)}</code>, en la portada y en <code>/planes</code> (<code>datos/estado-praxi.txt</code>). Por eso ninguna vista enlaza a praxi.coach.</dd></div>
      <div><dt>Vista 3</dt><dd>Las dos direcciones usan Praxi como caso real. Diego recomendaba Combeau porque a Praxi le faltan las pantallas de la app, y a los tres lectores fríos les bajó la confianza un caso apagado y sin usuarios.</dd></div>
    </dl>
    <div class="dos-listas">
      <div><h3>Lo que se puede decir, con su fuente</h3><ul class="hay">{hay_html}</ul></div>
      <div><h3>Lo que te pedimos</h3><ol class="lista-larga">{pedir_html}</ol></div>
    </div>
    <p class="nota">Del inventario de Diego del 16-oct, <code>e12/inventario-praxi.md</code> §8.1 (tal cual) y §10 (dicho de tú a tú). El repo de Praxi solo se leyó: sigue en su último commit y sin cambios.</p>
  </div>
</section>"""

# ---------------------------------------------------------------- 7 · lo que decides
comparar = [
    ("Letra", "Google Sans Flex (titular liviano, ancho 76 %)", "Mona Sans (titular liviano, ancho 89 %)"),
    ("Titular de la home a 1440", f"{a_h1[('home', 1440)]['tam'].replace('px', ' px')}, a la escala de Koto", f"{num(B_H1, 0)} px, a escala de cartel"),
    ("Primera pantalla de la home", "El trabajo (la cinta) con la frase y el chequeo", "La frase y el chequeo, sin imagen"),
    ("Imagen en /trabajo/", f"{pct(ac['trabajo']['area_medios'])} %: el muro", f"{pct(bc['trabajo']['medios_pct'])} %: la tabla y su visor"),
    ("Imagen en el caso Sesenta", f"{pct(ac['caso-sesenta']['area_medios'])} %", f"{pct(bc['sesenta']['medios_pct'])} %"),
    ("Juego de color en Desarrollo web", "Dentro de los marcos del trabajo; el lienzo no cambia", "Una hoja blanca para los planes (desvío de Koto, rotulado)"),
    ("Logo de muestra", "Camino 2, «El huso»", "Camino 3, «Dos cortes»"),
]
comparar_html = "".join(f'<tr><th scope="row">{e(a)}</th><td data-rotulo="A · Archivo">{e(b)}</td><td data-rotulo="B · Banco">{e(c)}</td></tr>' for a, b, c in comparar)
seccion_decides = f"""
<section id="decides" class="seccion" aria-labelledby="t-decides">
  <div class="seccion__lado"><p class="rotulo">7</p><h2 id="t-decides">Lo que decides en esta compuerta</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Cinco respuestas.</span> <span class="t2">Basta con una línea por cada una; lo que no contestes queda como dice la lista de abajo.</span></p>
    <ol class="decide">
      <li><h3>¿A · Archivo o B · Banco?</h3><p>Se pueden pedir ajustes a la que elijas, pero no se mezclan: la mezcla es el promedio, y el promedio de dos direcciones fuertes es una dirección débil. Si no es ninguna, se vuelve al lock y a la medición de Koto, no a este tablero.</p>
        <div class="tabla-envuelta"><table class="tabla"><caption class="rotulo">A y B, lado a lado, medido a 1440</caption><thead><tr><th scope="col">Eje</th><th scope="col">A · Archivo</th><th scope="col">B · Banco</th></tr></thead><tbody>{comparar_html}</tbody></table></div></li>
      <li><h3>¿Qué camino de logo?</h3><p>1 · La palabra, 2 · El huso o 3 · Dos cortes. Bruno recomienda el 2; su riesgo es que el huso se lea como alfiler o cerradura. El dibujo final sale con la dirección que elijas.</p></li>
      <li><h3>¿Qué hero?</h3><p>La 3 es la que los tres lectores entendieron en la segunda vuelta. Si quieres la tuya (la 1), conviene que la acompañe la bajada de la 3, que es la que dice qué vendemos.</p></li>
      <li><h3>¿Pagamos fotos o video para los conceptos?</h3><p>Nada, o un mes del plan PLUS de Higgsfield (USD 49) para las {sin_md(total[1])} fotos y {sin_md(total[2])} clips de las cuatro, o solo para las piezas que elijas mirando la sección 4. Sin tu sí no se genera nada.</p></li>
      <li><h3>¿Qué pasa con Praxi?</h3><p>Las capturas de la app desde una cuenta de prueba tuya (o ir sin ellas); si cuentas que está en pausa o lo reactivas; de dónde salen las tres fotos de la landing sin procedencia; si se nombran los modelos; y si el caso dice que lo construiste con agentes de IA. Y con eso, si el caso real de la vista 3 sigue siendo Praxi o pasa a Combeau.</p></li>
    </ol>
    <h3>Lo demás que está abierto, con lo que queda si no dices nada</h3>
    <ul class="abiertas">
      <li><strong>Los puntajes propios</strong> (Verifica y Cumple 54 → 94 y spindlelab.cl 36 → 73): <span class="t2">no se muestran. Hoy A trae el 54 → 94 puesto y B no; si dices que no, sale de A y el texto queda igual en las dos.</span></li>
      <li><strong>El color del círculo del cursor:</strong> <span class="t2">blanco, como Koto, que no tiene color de interfaz. El cobalto del brief, aclarado a <code>#316BFF</code> para que se lea sobre negro, queda a una línea.</span></li>
      <li><strong>Una interior con el lienzo claro:</strong> <span class="t2">no. Koto no cambia el lienzo en ninguna de sus {K_PARADAS} paradas medidas; su juego está dentro de los marcos (sección 1). Si lo quieres igual, se construye como desvío rotulado.</span></li>
      <li><strong>Color en el logo:</strong> <span class="t2">no; es monocromo, y si lo quieres como el único color del sitio (el gesto de Koto), se decide con la dirección.</span></li>
      <li><strong>Los cuatro nombres de los conceptos,</strong> Ocelo a oscuras por defecto con la luz que se enciende, Sesenta como la pieza que va más lejos, y Raigal, Aplomo y Deslinde como archivo fuera del índice: <span class="t2">quedan así (Bruno, <code>plan-e12.md</code> §14).</span></li>
    </ul>
  </div>
</section>"""

# ---------------------------------------------------------------- 1 · página
lista_dec = "".join(f'<li><p class="t1">{a}</p><p class="cita">{b}</p></li>' for a, b in decidiste)
seccion_decidiste = f"""
<section id="decidiste" class="seccion" aria-labelledby="t-decidiste">
  <div class="seccion__lado"><p class="rotulo">1</p><h2 id="t-decidiste">Lo que decidiste en la compuerta 1</h2></div>
  <div class="seccion__cuerpo">
    <ol class="pedidos">{lista_dec}</ol>
    <p class="nota">Se mantiene: Astro, Tailwind y Motion; casos reales solo con lo medido; cero prueba social inventada; ningún prospecto nombrado; precios y oferta iguales a <code>oferta-v3.json</code> y <code>servicios-v3.json</code>; nada publicado y nada generado con pago. Si «no te contesté los 4 puntos» quería decir que siguen abiertos, se cierran en esta compuerta. Registro completo: <code>e12/brief-de-obra.md</code>, sección «Compuerta 1».</p>
    <div class="bloque koto">
      <h3>Cómo juega Koto con el negro, medido para tu punto del color</h3>
      <div class="par par--koto">
        {figura(koto_lyft, 'Koto, caso Lyft a 1440: sobre el lienzo negro, un campo crema con una pantalla de la app y otro magenta, cada uno dentro de su marco', 'Koto, caso Lyft a 1440. Captura para estudio interno: nada de Koto va al sitio.')}
        <div class="koto__texto">
          <p>El 16-oct recorrí {K_RECORRIDOS} páginas de koto.com bajando de media en media pantalla: <strong>{K_PARADAS} paradas, y el lienzo es <code>#060606</code> en todas.</strong> El blanco y los colores están dentro de los marcos del trabajo, con el color de cada cliente.</p>
          <p>En <code>{e(lyft['url'])}</code> a 1440: imagen en el {num(lyft_r['medios_pct'])} % de la página, campos claros en el {num(lyft_r['campoClaro_pctPagina'])} % (el crema <code>#F1F0EB</code> de Lyft) y de color en el {num(lyft_r['campoDeColor_pctPagina'])} % (su magenta <code>#FF00C4</code>), a 8 px del negro y con radio 6.</p>
          <p class="nota">Así es como A y B juegan con el color: el que pone cada pieza. Lo que no se toma es lo que rechazaste de driftime: un color fijo por servicio. Tapa las imágenes y en las dos queda una página negra con texto blanco y gris. Detalle: <code>e12/lock-koto.md</code> §20.</p>
        </div>
      </div>
    </div>
  </div>
</section>"""

CSS = """
  /* Tablero de trabajo en negro, a propósito: las dos direcciones van sobre el lienzo #060606 de Koto y se comparan
     sobre él. Un solo tema; contraste AA medido (blanco 20,26:1 y gris #989898 7,02:1 sobre el lienzo, 6,39:1 sobre la
     placa). La letra del tablero es la del sistema y no la de ninguna dirección, para no inclinar la elección: Google
     Sans Flex y Mona Sans aparecen solo donde se muestran (el nombre de cada dirección y las muestras del hero). Desde
     1194 px cada sección lleva su título en una barra de 320 px, como el caso de Koto. */
  :root {
    color-scheme: dark;
    --lienzo: #060606;
    --placa: #141414;
    --placa-activa: #202020;
    --blanco: #FFFFFF;
    --gris: #989898;
    --linea: rgba(255,255,255,.10);
    --linea-seccion: #2D2D2D;
    --f-texto: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --f-mono: 'DM Mono', ui-monospace, Menlo, monospace;
    --f-a: 'Google Sans Flex', system-ui, sans-serif;
    --f-b: 'Mona Sans', system-ui, sans-serif;
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body { margin: 0; background: var(--lienzo); color: var(--blanco); font: 400 16px/1.45 var(--f-texto); -webkit-font-smoothing: antialiased; }
  .marco { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 16px 64px; }
  h1, h2, h3 { font-weight: 400; margin: 0; text-wrap: balance; }
  h1 { font-size: clamp(32px, 3.4vw, 48px); line-height: 1.05; letter-spacing: -.01em; max-width: 24ch; }
  h2 { font-size: clamp(26px, 2.4vw, 34px); line-height: 1.1; letter-spacing: -.01em; }
  h3 { font-size: clamp(20px, 1.6vw, 22px); line-height: 1.25; }
  p, ul, ol, dl, figure { margin: 0; }
  a { color: var(--blanco); text-underline-offset: 3px; }
  code { font-family: var(--f-mono); font-size: max(11px, .82em); letter-spacing: .01em; overflow-wrap: anywhere; }
  strong { font-weight: 600; color: var(--blanco); }
  :focus-visible { outline: 2px solid var(--blanco); outline-offset: 3px; }
  .rotulo { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  .rotulo code { font-size: 1em; text-transform: none; }
  .t1 { color: var(--blanco); }
  .t2 { color: var(--gris); }
  .intro { font-size: clamp(19px, 1.7vw, 23px); line-height: 1.3; max-width: 36em; text-wrap: pretty; }
  .nota { color: var(--gris); max-width: 68ch; font-size: 15px; }
  .nota strong { color: var(--blanco); }
  .bloque { display: grid; gap: 12px; }

  /* cabecera */
  .cab { display: grid; gap: 20px; padding: 8px 0 40px; }
  .cab__fila { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; }
  .indice { display: flex; flex-wrap: wrap; gap: 0 20px; list-style: none; padding: 0; }
  .indice a { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--blanco); text-decoration: none; display: inline-block; padding: 14px 0; }
  .indice a:hover { text-decoration: underline; }

  /* secciones */
  .seccion { position: relative; border-top: 1px solid var(--linea-seccion); padding: 20px 0 64px; display: grid; gap: 24px; }
  .seccion__lado { display: grid; gap: 8px; align-content: start; }
  .seccion__cuerpo { display: grid; gap: 28px; min-width: 0; }
  @media (min-width: 1194px) {
    .seccion { grid-template-columns: 320px minmax(0, 1fr); gap: 16px; }
    .seccion__lado { position: sticky; top: 16px; align-self: start; padding-right: 24px; }
  }
  .nombre-a { font-family: var(--f-a); font-stretch: 76%; font-weight: 300; font-size: clamp(32px, 3.2vw, 48px); line-height: 1; }
  .nombre-b { font-family: var(--f-b); font-stretch: 89%; font-weight: 340; font-size: clamp(36px, 3.8vw, 56px); line-height: .98; }

  /* 1 · lo que decidiste */
  .pedidos { list-style: none; padding: 0; display: grid; gap: 14px; counter-reset: p; max-width: 52em; }
  .pedidos li { counter-increment: p; display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 2px 8px; }
  .pedidos li::before { content: counter(p); font: 500 11px/1.9 var(--f-mono); color: var(--gris); grid-row: span 2; }
  .pedidos .t1 { font-size: 18px; line-height: 1.35; }
  .cita { color: var(--gris); font-size: 15px; }
  .par--koto { align-items: start; }
  .koto__texto { display: grid; gap: 10px; }

  /* figuras y pares */
  .galeria { display: grid; gap: 16px; }
  @media (min-width: 834px) { .galeria--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .fig { display: grid; gap: 8px; align-content: start; min-width: 0; }
  .fig img, .fig video { display: block; width: 100%; height: auto; border-radius: 6px; background: var(--placa); }
  .fig figcaption { font-size: 14px; line-height: 1.4; color: var(--gris); max-width: 64ch; }
  .par { display: grid; gap: 16px; align-items: start; }
  @media (min-width: 834px) {
    .par { grid-template-columns: minmax(0, 3.3fr) minmax(0, 1fr); }
    .par--koto { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  }
  .pantalla--tel { max-width: 300px; }
  @media (min-width: 834px) { .pantalla--tel { max-width: none; } }

  /* vistas */
  .vista { display: grid; gap: 16px; padding-top: 16px; border-top: 1px solid var(--linea-seccion); }
  .pie-vista { color: var(--gris); max-width: 70ch; }
  .visor-caja { display: grid; gap: 8px; min-width: 0; }
  .visor { height: clamp(360px, 72vh, 820px); overflow-y: auto; overflow-x: hidden; border-radius: 6px; background: var(--placa); outline: 1px solid var(--linea); scrollbar-color: #4A4A4A var(--placa); }
  .visor img { display: block; width: 100%; height: auto; }
  .visor-caja--tel { max-width: 300px; }
  @media (min-width: 834px) { .visor-caja--tel { max-width: none; } }

  /* plegables */
  .plegable { border-top: 1px solid var(--linea-seccion); }
  .plegable > summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 56px; padding: 8px 0; cursor: pointer; }
  .plegable > summary::-webkit-details-marker { display: none; }
  .plegable > summary:hover h3 { text-decoration: underline; text-underline-offset: 4px; }
  .mas { flex: none; width: 32px; height: 32px; border-radius: 4px; background: var(--placa); display: grid; place-items: center; }
  .mas::before { content: "+"; font: 500 16px/1 var(--f-mono); color: var(--blanco); }
  .plegable[open] > summary .mas::before { content: "\\2212"; }
  .plegable[open] { display: grid; gap: 16px; padding-bottom: 8px; }
  details.vista { padding-top: 0; }
  details.vista[open] { padding-bottom: 8px; }

  /* tres líneas y valores */
  .tres { list-style: none; padding: 0; counter-reset: t; display: grid; gap: 10px; border-top: 1px solid var(--linea-seccion); padding-top: 12px; max-width: 60em; }
  .tres li { counter-increment: t; display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 8px; font-size: 17px; line-height: 1.4; }
  .tres li::before { content: counter(t); font: 500 11px/2 var(--f-mono); color: var(--gris); }
  .valores { display: grid; border-top: 1px solid var(--linea-seccion); }
  .valores div { display: grid; gap: 4px; padding: 12px 0; border-bottom: 1px solid var(--linea); }
  .valores dt { font: 500 11px/1.4 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  .valores dd { margin: 0; color: var(--gris); max-width: 72ch; }
  @media (min-width: 834px) { .valores div { grid-template-columns: 180px minmax(0, 1fr); gap: 16px; } }
  .valores--chico dd { font-size: 15px; }

  /* sellos */
  .sello { display: inline-block; vertical-align: middle; border: 1px solid var(--blanco); border-radius: 2px; padding: 4px 7px; font: 500 11px/1 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--blanco); }
  .sello--suave { border-color: #4A4A4A; color: var(--gris); margin-left: 8px; }

  /* 3 · logo, 4 · conceptos, 5 · opciones */
  .caminos, .conceptos, .opciones { list-style: none; padding: 0; display: grid; gap: 40px; }
  .camino, .concepto, .opcion { display: grid; gap: 14px; padding-top: 16px; border-top: 1px solid var(--linea-seccion); min-width: 0; }
  .concepto__cab { display: grid; gap: 8px; }
  .concepto__cab p:first-child { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; }
  .pregunta { display: grid; gap: 6px; padding: 14px 16px; border-radius: 4px; background: var(--placa); color: var(--gris); }
  .costo p { max-width: 72ch; color: var(--gris); }
  .estados .fig img { width: auto; max-width: 100%; }
  .especimenes { display: grid; gap: 16px; }
  @media (min-width: 834px) { .especimenes { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .especimen { container-type: inline-size; display: grid; gap: 8px; align-content: start; padding: 16px; border-radius: 4px; background: var(--placa); min-width: 0; }
  .esp { letter-spacing: -.01em; overflow-wrap: break-word; }
  /* el h1 de A mide 48 px en una columna de 1054 px; el de B, 87,84 px en una de 1408 */
  .esp-a { font-family: var(--f-a); font-stretch: 76%; font-weight: 300; font-size: max(16px, 4.554cqw); line-height: 1; }
  .esp-b { font-family: var(--f-b); font-stretch: 89%; font-weight: 340; font-size: max(18px, 6.239cqw); line-height: .98; }
  .entradilla { color: var(--gris); max-width: 62ch; }

  /* 6 · Praxi */
  .dos-listas { display: grid; gap: 28px; }
  @media (min-width: 1194px) { .dos-listas { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .dos-listas > div { display: grid; gap: 12px; align-content: start; min-width: 0; }
  .hay { list-style: none; padding: 0; border-top: 1px solid var(--linea-seccion); }
  .hay li { display: grid; gap: 4px; padding: 10px 0; border-bottom: 1px solid var(--linea); }
  .hay .fuente { color: var(--gris); font-size: 14px; }
  .lista-larga { padding-left: 20px; display: grid; gap: 10px; color: var(--gris); max-width: 72ch; }
  .lista-larga li::marker { font: 500 12px var(--f-mono); color: var(--gris); }

  /* 7 · decides */
  .decide { list-style: none; padding: 0; counter-reset: d; border-top: 1px solid var(--linea-seccion); }
  .decide > li { counter-increment: d; padding: 18px 0; border-bottom: 1px solid var(--linea); display: grid; gap: 10px; min-width: 0; }
  .decide h3::before { content: counter(d) " · "; color: var(--gris); }
  .decide p { color: var(--gris); max-width: 72ch; }
  .abiertas { list-style: none; padding: 0; display: grid; gap: 0; border-top: 1px solid var(--linea-seccion); }
  .abiertas li { padding: 12px 0; border-bottom: 1px solid var(--linea); max-width: 80ch; }
  .tabla-envuelta { max-width: 100%; }
  .tabla { border-collapse: collapse; width: 100%; font-size: 15px; }
  .tabla caption { text-align: left; padding-bottom: 8px; }
  .tabla th, .tabla td { text-align: left; padding: 9px 12px 9px 0; border-bottom: 1px solid var(--linea); vertical-align: top; }
  .tabla thead th { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); border-bottom: 1px solid var(--linea-seccion); }
  .tabla tbody th { font-weight: 400; color: var(--blanco); }
  .tabla td { color: var(--gris); }
  .tabla--dif td { font-size: 14px; }
  @media (min-width: 834px) { .tabla--dif th[scope="row"] { width: 120px; } }
  @media (max-width: 833px) {
    .tabla thead { display: none; }
    .tabla tr { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 12px; padding: 10px 0; border-bottom: 1px solid var(--linea); }
    .tabla th, .tabla td { border: 0; padding: 0; }
    .tabla th[scope="row"] { grid-column: 1 / -1; }
    .tabla--dif td { grid-column: 1 / -1; }
    .tabla td::before { content: attr(data-rotulo); display: block; font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  }
  .pie { border-top: 1px solid var(--linea-seccion); padding-top: 16px; color: var(--gris); font-size: 14px; display: grid; gap: 6px; max-width: 90ch; }
"""

JS = r"""
(function () {
  // La hora de Santiago con su huso, calculada en tu navegador (telemetría verdadera)
  function hora() {
    var ahora = new Date();
    var h = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false }).format(ahora);
    var huso = '';
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' }).formatToParts(ahora)
        .forEach(function (x) { if (x.type === 'timeZoneName') huso = x.value.replace('GMT', 'UTC'); });
    } catch (err) { huso = ''; }
    document.querySelectorAll('.reloj').forEach(function (n) { n.textContent = h; });
    if (huso) document.querySelectorAll('.huso').forEach(function (n) { n.textContent = huso; });
  }
  hora();
  setInterval(hora, 15000);
  // Un video a la vez: al dar play a uno, los demás se pausan
  var videos = [].slice.call(document.querySelectorAll('video'));
  videos.forEach(function (v) {
    v.addEventListener('play', function () { videos.forEach(function (o) { if (o !== v && !o.paused) o.pause(); }); });
  });
})();
"""

pagina = f"""<meta charset="utf-8">
<title>Tablero direcciones E12</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FUENTES}">
<style>{CSS}</style>
<div class="marco">
  <header class="cab">
    <div class="cab__fila">
      <p class="rotulo">SpindleLab v3 · E12 · compuerta 2 · 17 de octubre de 2026</p>
      <p class="rotulo">Santiago <span class="reloj">--:--</span> <span class="huso">UTC-3</span></p>
    </div>
    <h1>Dos direcciones sobre negro: Archivo y Banco</h1>
    <p class="intro"><span class="t1">Eliges una, un camino de logo y un hero.</span> <span class="t2">Todo lo que ves está construido y corrido en el navegador, con el texto real y el chequeo de verdad. Nada está publicado y nada se generó con pago.</span></p>
    <nav aria-label="Secciones del tablero"><ul class="indice">
      <li><a href="#decidiste">1 · Lo que decidiste</a></li><li><a href="#a">2 · A Archivo</a></li><li><a href="#b">2 · B Banco</a></li>
      <li><a href="#logo">3 · Logo</a></li><li><a href="#conceptos">4 · Conceptos</a></li><li><a href="#texto">5 · El hero</a></li>
      <li><a href="#praxi">6 · Praxi</a></li><li><a href="#decides">7 · Lo que decides</a></li>
    </ul></nav>
  </header>
  <main>
    {seccion_decidiste}
    {seccion_a}
    {seccion_b}
    {seccion_logo}
    {seccion_conceptos}
    {seccion_texto}
    {seccion_praxi}
    {seccion_decides}
  </main>
  <footer class="pie">
    <p>Armado por <code>tableros/e12-direcciones/herramientas/armar-tablero.py</code> desde las dos direcciones (<code>direccion-a.md</code>, <code>direccion-b.md</code> y sus mediciones), el brief, el lock, los caminos de Bruno, su plan de las piezas, el texto de Clara y su lectura fría, y el inventario de Praxi. Verificado con <code>herramientas/verificar.mjs</code> a 360, 390, 768 y 1440.</p>
    <p>Las vistas en vivo, con el chequeo de verdad, se abren con los servidores de cada dirección (<code>direccion-a.md</code> §1 y <code>direccion-b.md</code> §0). La captura de Koto es para estudio interno. Las capturas de A y B que pasaban de 450 kB se recomprimieron para el tablero (<code>datos/recompresion.json</code>).</p>
  </footer>
</div>
<script>{JS}</script>
"""

# ---------------------------------------------------------------- comprobaciones del contrato antes de escribir
visible = re.sub(r"<style>.*?</style>|<script.*?</script>", "", pagina, flags=re.S)
assert pagina.count("<h1") == 1
assert "<!--" not in pagina, "sin comentarios HTML"
assert "—" not in visible, "sin raya en el texto"
assert not re.search(r"<!doctype|<(html|head|body)[\s>]", pagina, flags=re.I)
assert re.search(r"<title>(\S+ ){1,3}\S+</title>", pagina)
assert "praxi.coach\"" not in pagina and "href=\"https://praxi" not in pagina, "ningún enlace a praxi.coach"
for src in re.findall(r'<script src="([^"]+)"', pagina):
    assert src.startswith("https://cdn.jsdelivr.net/npm/") and re.search(r"@\d+\.\d+\.\d+/", src), src
for href in re.findall(r'<link rel="stylesheet" href="([^"]+)"', pagina):
    assert href.startswith("https://fonts.googleapis.com/"), href
for prohibido in ("IA propietaria", "modelos RAG", "despliegue de modelos", "+150 %", "40 %"):
    assert prohibido not in visible, prohibido

rutas = sorted(set(re.findall(r'(?:src|poster)="((?:img|video)/[^"]+)"', pagina)))
for r in rutas:
    assert os.path.exists(os.path.join(BASE, r)), r
    t = os.path.getsize(os.path.join(BASE, r))
    if r.startswith("img/"):
        assert r.endswith(".jpg") and t <= MAX_IMG, (r, t)
    else:
        assert t <= MAX_VIDEO, (r, t)
sin_detalle = [r for r in rutas if r not in detalle]
assert not sin_detalle, sin_detalle
total_bytes = len(pagina.encode("utf-8")) + sum(os.path.getsize(os.path.join(BASE, r)) for r in rutas)
if total_bytes > MAX_TOTAL:
    sys.exit(f"el tablero con sus archivos suma {total_bytes} bytes, pasa de 60 MB")

with open(os.path.join(BASE, "tablero.html"), "w", encoding="utf-8") as f:
    f.write(pagina)
json.dump(recompresion, open(REC_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
archivos = {
    "pagina": "tablero.html",
    "armadoPor": "herramientas/armar-tablero.py",
    "rutas": rutas,
    "detalle": [{"ruta": r, "bytes": os.path.getsize(os.path.join(BASE, r)), **detalle[r]} for r in rutas],
    "imagenes": sum(1 for r in rutas if r.startswith("img/")),
    "videos": sum(1 for r in rutas if r.startswith("video/")),
    "bytesPagina": len(pagina.encode("utf-8")),
    "bytesTotal": total_bytes,
    "unidad": "bytes; kB = 1.000 y MB = 1.000.000",
}
with open(os.path.join(BASE, "archivos.json"), "w", encoding="utf-8") as f:
    json.dump(archivos, f, ensure_ascii=False, indent=1)
    f.write("\n")
mayor_img = max(os.path.getsize(os.path.join(BASE, r)) for r in rutas if r.startswith("img/"))
mayor_vid = max(os.path.getsize(os.path.join(BASE, r)) for r in rutas if r.startswith("video/"))
print(f"tablero.html {len(pagina.encode('utf-8'))} bytes · {archivos['imagenes']} imágenes y {archivos['videos']} videos · "
      f"total {total_bytes / 1e6:.2f} MB · la imagen mayor {mayor_img / 1e3:.0f} kB · el video mayor {mayor_vid / 1e6:.2f} MB · "
      f"{len(recompresion)} capturas recomprimidas")
