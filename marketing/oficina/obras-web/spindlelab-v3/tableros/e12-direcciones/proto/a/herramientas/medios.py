#!/usr/bin/env python3
"""Dirección A · Archivo: los medios de las cinco vistas, derivados de material real.

Lucía, 17-oct-2026. No genera nada: recorta, escala y compone capturas y grabaciones que ya existen.

Fuentes (todas reales, ninguna generada con pago):
  - marketing/portafolio/0[4-7]-*/   portadas, placas, medios y recorridos de las cuatro piezas de concepto (Bruno)
  - e12/praxi/                       capturas de la copia local de Praxi y su material (Diego, inventario-praxi §6 y §7)
  - <fuente-a>/                      capturas de los sitios vivos, hechas con herramientas/capturar-fuentes.mjs
                                     (Combeau, Verifica y Cumple, el chequeo y spindlelab.cl; 17-oct, 04:17 a 04:24 UTC)
  - spindlelab-astro/public/assets/img/ramon-vallejos.jpg (el retrato de /nosotros/, solo lectura)

Lo que NO se usa (inventario-praxi §6 y §7): landing-1440-completa.jpg, landing-390-completa.jpg y
landing-1440-sec06.jpg, porque llevan landing-3.jpg, una foto sin procedencia escrita.

Uso: python3 -I medios.py <fuente-a>
Salida: ../medios/ (webp de calidad 80, videos VP9 y H.264) y ../medios/medios.json (qué es cada archivo y de dónde sale).
"""
import json
import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops

AQUI = Path(__file__).resolve().parent
A = AQUI.parent
SALIDA = A / "medios"
REPO = Path("/home/user/spindlelab")
PORT = REPO / "marketing/portafolio"
PRAXI = REPO / "marketing/oficina/obras-web/spindlelab-v3/e12/praxi"
FUENTE = Path(sys.argv[1]) if len(sys.argv) > 1 else None

SALIDA.mkdir(parents=True, exist_ok=True)
registro = {}

PRAXI_FONDO = (0x0F, 0x11, 0x17)  # fondo de la marca de Praxi (brand.json, inventario-praxi §7)
PRAXI_AMARILLO = (0xE2, 0xF3, 0x49)  # su acento
SESENTA_AZUL = (0x22, 0x40, 0x8A)


def rel(p):
    return str(Path(p).resolve().relative_to(REPO))


def guardar(im, nombre, fuente, nota=""):
    destino = SALIDA / nombre
    im.convert("RGB").save(destino, "WEBP", quality=80, method=6)
    registro[nombre] = {"de": fuente if isinstance(fuente, list) else [fuente], "px": list(im.size),
                        "bytes": destino.stat().st_size, "nota": nota}


def recorte(im, prop, ancla=(0.5, 0.0)):
    """Recorta a la proporción ancho/alto pedida, anclado (x, y) en 0..1."""
    w, h = im.size
    if w / h > prop:
        nw, nh = round(h * prop), h
    else:
        nw, nh = w, round(w / prop)
    x = round((w - nw) * ancla[0])
    y = round((h - nh) * ancla[1])
    return im.crop((x, y, x + nw, y + nh))


def escala(im, ancho):
    if im.width <= ancho:
        return im
    return im.resize((ancho, round(im.height * ancho / im.width)), Image.LANCZOS)


def ajustar(pieza, color, aire=40):
    """Quita el fondo de la captura que sobra alrededor del contenido (el mismo color de la marca), con aire."""
    fondo = Image.new("RGB", pieza.size, pieza.getpixel((2, 2)))
    caja = ImageChops.difference(pieza, fondo).convert("L").point(lambda v: 255 if v > 18 else 0).getbbox()
    if not caja:
        return pieza
    x0, y0, x1, y1 = caja
    return pieza.crop((max(0, x0 - aire), max(0, y0 - aire), min(pieza.width, x1 + aire), min(pieza.height, y1 + aire)))


def campo(pieza, prop, ancho, color, margen=0.06, ajuste=False, max_aumento=1.4):
    """La pieza plana dentro de un campo del color de su marca (lock §20.2, regla 2 y 3)."""
    alto = round(ancho / prop)
    lienzo = Image.new("RGB", (ancho, alto), color)
    m = round(ancho * margen)
    p = ajustar(pieza, color) if ajuste else pieza.copy()
    f = min((ancho - 2 * m) / p.width, (alto - 2 * m) / p.height, max_aumento)
    p = p.resize((round(p.width * f), round(p.height * f)), Image.LANCZOS)
    lienzo.paste(p, ((ancho - p.width) // 2, (alto - p.height) // 2))
    return lienzo


def abrir(p):
    return Image.open(p).convert("RGB")


# ---------------------------------------------------------------- portadas del índice (muro: 4:5, 4:3, 5:3)
PORTADAS = {
    "sesenta": PORT / "06-sesenta/identidad/portadas/sesenta-{}.png",
    "ocelo": PORT / "05-ocelo/identidad/portadas/ocelo-{}.png",
    "doceavo": PORT / "07-doceavo/identidad/portadas/portada-{}.png",
    "tonela": PORT / "04-tonela/identidad/portadas/portada-{}.png",
}
SUFIJOS = {"sesenta": ("4x5", "4x3", "5x3"), "ocelo": ("45", "43", "53"), "doceavo": ("45", "43", "53"),
           "tonela": ("4x5", "4x3", "5x3")}
USADAS = {"sesenta": ("45", "53"), "ocelo": ("43",), "doceavo": ("53",), "tonela": ("45",)}  # las que pide el muro de A
for marca, patron in PORTADAS.items():
    for suf, prop in zip(SUFIJOS[marca], ("45", "43", "53")):
        if prop not in USADAS[marca]:
            continue
        src = Path(str(patron).format(suf))
        guardar(escala(abrir(src), 1050), f"{marca}-{prop}.webp", rel(src), "portada de Bruno, tal cual")

# Praxi: el avatar amarillo (renderizado desde el wordmark del código, no generado: inventario-praxi §7) en su campo
avatar_am = abrir(PRAXI / "material/praxi-avatar-amarillo.png")
avatar_os = abrir(PRAXI / "material/praxi-avatar-oscuro.png")
for prop, nombre in ((4 / 3, "praxi-43.webp"), (4 / 5, "praxi-45.webp")):
    guardar(campo(avatar_am, prop, 1050, PRAXI_AMARILLO, margen=0.0), nombre,
            rel(PRAXI / "material/praxi-avatar-amarillo.png"), "el avatar de Praxi en su amarillo; no es generado")

if FUENTE:
    f = lambda n: FUENTE / n  # noqa: E731
    def fuente_viva(n):
        return f"captura de {n}, sitio vivo, 17-oct-2026 (capturar-fuentes.mjs)"
    guardar(escala(recorte(abrir(f("combeau-fotografia-390-primera.png")), 4 / 5), 780), "combeau-fotografia-45.webp",
            fuente_viva("bernardocombeau.cl a 390"))
    guardar(escala(recorte(abrir(f("combeau-modelo-390-primera.png")), 4 / 5), 780), "combeau-modelo-45.webp",
            fuente_viva("bernardocombeau.cl/modelo/ a 390"))
    guardar(escala(recorte(abrir(f("verifica-y-cumple-390-primera.png")), 4 / 5), 780), "verifica-y-cumple-45.webp",
            fuente_viva("verifica.spindlelab.cl a 390"))
    guardar(escala(recorte(abrir(f("verifica-y-cumple-1440-primera.png")), 5 / 3, (0.5, 0)), 1050),
            "verifica-y-cumple-53.webp", fuente_viva("verifica.spindlelab.cl a 1440"))
    guardar(escala(recorte(abrir(f("chequeo-1440-primera.png")), 4 / 3, (0.0, 0)), 1050), "chequeo-43.webp",
            fuente_viva("spindlelab.cl/diagnostico/ a 1440"))
    guardar(escala(recorte(abrir(f("spindlelab-1440-primera.png")), 5 / 3, (0.5, 0)), 1050), "spindlelab-53.webp",
            fuente_viva("spindlelab.cl a 1440, con el aviso de cookies rechazado"))
    # Para «la pieza y su prueba»: la galería de retratos de Combeau (lo que pesa 805 kB y llega en 95) y la lista de
    # «Las 12 cosas» de Verifica y Cumple, para no repetir las portadas del índice corto
    Image.MAX_IMAGE_PIXELS = None
    comp = abrir(f("combeau-fotografia-1440-completa.png"))
    guardar(escala(comp.crop((0, 1300, 2880, 2920)), 1600), "combeau-galeria-169.webp",
            fuente_viva("bernardocombeau.cl a 1440, la galería de retratos"))
    comp = abrir(f("verifica-y-cumple-1440-completa.png"))
    guardar(escala(comp.crop((0, 5980, 2880, 7600)), 1600), "verifica-y-cumple-12-169.webp",
            fuente_viva("verifica.spindlelab.cl a 1440, «Las 12 cosas que tu sitio tiene que dejar publicadas»"))
    # 16:9 para la home y el caso
    for n in ("combeau-fotografia",):
        guardar(escala(recorte(abrir(f(f"{n}-1440-primera.png")), 16 / 9), 1600), f"{n}-169.webp",
                fuente_viva(f"{n} a 1440"))

# ---------------------------------------------------------------- Praxi (capturas de la copia local, sin las vetadas)
cap = PRAXI / "capturas"
guardar(campo(abrir(cap / "landing-1440-sec09.jpg").crop((150, 0, 1290, 526)), 16 / 9, 1600, PRAXI_FONDO, margen=0.03), "praxi-reglas-169.webp",
        rel(cap / "landing-1440-sec09.jpg"), "sin personas, sin datos de ejemplo")
guardar(campo(abrir(cap / "landing-1440-sec08.jpg"), 16 / 9, 1600, PRAXI_FONDO, margen=0.04, ajuste=True), "praxi-numeros-169.webp",
        rel(cap / "landing-1440-sec08.jpg"), "datos de ejemplo de la landing: lleva pie")
guardar(recorte(abrir(cap / "landing-390-sec03.jpg"), 4 / 5, (0.5, 0.18)), "praxi-frase-45.webp",
        rel(cap / "landing-390-sec03.jpg"), "datos de ejemplo: lleva pie")
guardar(recorte(abrir(cap / "landing-390-sec08.jpg"), 4 / 5, (0.5, 0.07)), "praxi-numeros-45.webp",
        rel(cap / "landing-390-sec08.jpg"), "datos de ejemplo: lleva pie")
guardar(recorte(abrir(cap / "landing-390-primera.jpg"), 4 / 5), "praxi-portada-390-45.webp",
        rel(cap / "landing-390-primera.jpg"), "el hombre del hero es generado: lleva pie")
guardar(recorte(abrir(cap / "login-390-primera.jpg"), 4 / 5, (0.5, 1.0)), "praxi-login-390-45.webp",
        rel(cap / "login-390-primera.jpg"), "la entrada con el lema viejo, «Entrena sabiendo por qué»; la mujer del fondo es generada")
guardar(escala(recorte(abrir(cap / "empezar-1440-primera.jpg"), 16 / 9, (0.5, 0.5)), 1440), "praxi-empezar-169.webp",
        rel(cap / "empezar-1440-primera.jpg"))
mat = PRAXI / "material"
guardar(campo(abrir(mat / "praxi-portada-facebook.jpg"), 16 / 9, 1600, PRAXI_FONDO, margen=0.04),
        "praxi-facebook-169.webp", rel(mat / "praxi-portada-facebook.jpg"), "fondo tratado como generado: lleva pie")
guardar(escala(recorte(abrir(mat / "praxi-carrusel-v2-s1.jpg"), 4 / 5), 1050), "praxi-carrusel-1-45.webp",
        rel(mat / "praxi-carrusel-v2-s1.jpg"), "foto generada: lleva pie")
guardar(escala(recorte(abrir(mat / "praxi-carrusel-v2-s3.jpg"), 4 / 5), 1050), "praxi-carrusel-3-45.webp",
        rel(mat / "praxi-carrusel-v2-s3.jpg"), "foto generada y cifra de ejemplo: lleva pie")
guardar(campo(avatar_am, 1.62, 1050, PRAXI_AMARILLO, margen=0.0), "praxi-avatar-amarillo-162.webp",
        rel(mat / "praxi-avatar-amarillo.png"))
guardar(campo(avatar_os, 1.62, 1050, PRAXI_FONDO, margen=0.0), "praxi-avatar-oscuro-162.webp",
        rel(mat / "praxi-avatar-oscuro.png"))
guardar(abrir(mat / "praxi-hero-poster.jpg"), "praxi-hero-poster.webp", rel(mat / "praxi-hero-poster.jpg"))
guardar(recorte(abrir(mat / "praxi-reel-a-memoria-poster.jpg"), 4 / 5, (0.5, 0.45)), "praxi-reel-poster-45.webp",
        rel(mat / "praxi-reel-a-memoria-poster.jpg"))

# ---------------------------------------------------------------- Sesenta: placas y medios que pide su caso.md
ses = PORT / "06-sesenta"
SESENTA = [
    ("identidad/placas/16x9-suma-tinta.png", "sesenta-suma-169.webp", 1600),
    ("identidad/placas/16x9-logo-tinta.png", "sesenta-logo-169.webp", 1600),
    ("identidad/placas/4x5-sello-tinta.png", "sesenta-sello-45.webp", 1050),
    ("identidad/placas/4x5-paleta-tinta.png", "sesenta-paleta-45.webp", 1050),
    ("identidad/placas/16x9-contador-tinta.png", "sesenta-contador-169.webp", 1600),
    ("identidad/placas/4x5-letra-tinta.png", "sesenta-letra-45.webp", 1050),
    ("identidad/placas/1-62-courier-tinta.png", "sesenta-courier-162.webp", 1050),
    ("identidad/placas/1-62-otrosi-tinta.png", "sesenta-otrosi-162.webp", 1050),
    ("medios/home-1440.png", "sesenta-home-169.webp", 1600),
    ("medios/home-390.png", "sesenta-home-390-45.webp", 780),
    ("medios/interior-390.png", "sesenta-interior-390-45.webp", 780),
    ("identidad/placas/16x9-finiquito-tinta.png", "sesenta-finiquito-169.webp", 1600),
    ("identidad/placas/1-62-hoja-tinta.png", "sesenta-hoja-162.webp", 1050),
    ("identidad/placas/1-62-tarjeta-tinta.png", "sesenta-tarjeta-162.webp", 1050),
    ("medios/lector-390.png", "sesenta-lector-390-45.webp", 780),
    ("medios/lector-1440.png", "sesenta-lector-169.webp", 1600),
    ("medios/interior-1440.png", "sesenta-interior-169.webp", 1600),
    ("identidad/placas/16x9-pregunta-tinta.png", "sesenta-pregunta-169.webp", 1600),
]
for src, nombre, ancho in SESENTA:
    guardar(escala(abrir(ses / src), ancho), nombre, rel(ses / src), "placa o medio de Bruno, tal cual")
guardar(abrir(ses / "movimiento/poster.jpg"), "sesenta-recorrido-poster.webp", rel(ses / "movimiento/poster.jpg"))

# Desarrollo web: la franja de imagen del trabajo (lock §20.2, regla 4: en una interior, el color va en una franja)
doc = PORT / "07-doceavo/medios/home-1440.png"
guardar(escala(abrir(doc), 1600), "doceavo-home-169.webp", rel(doc), "captura de Bruno; el sello «Concepto» va dentro")

# Ramón, el retrato de /nosotros/ (896 × 1200, 3:4)
ret = REPO / "spindlelab-astro/public/assets/img/ramon-vallejos.jpg"
guardar(abrir(ret), "ramon-vallejos-34.webp", rel(ret), "retrato real, el de /v3/nosotros/")


# ---------------------------------------------------------------- videos
def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def video_registro(nombre, fuente, nota=""):
    p = SALIDA / nombre
    registro[nombre] = {"de": fuente if isinstance(fuente, list) else [fuente], "bytes": p.stat().st_size, "nota": nota}


# El medio principal de Praxi: Chromium de Playwright no reproduce H.264 (inventario-praxi §1), así que va en VP9
hero = mat / "praxi-hero-secuencia.mp4"
ffmpeg("-i", str(hero), "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "30", "-row-mt", "1", "-an", str(SALIDA / "praxi-hero.webm"))
video_registro("praxi-hero.webm", rel(hero), "los cinco clips del hero, generados con IA (Seedance 2.0): lleva pie")
reel = mat / "praxi-reel-a-memoria-720.mp4"
ffmpeg("-i", str(reel), "-vf", "crop=720:900:0:100,scale=720:900", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32",
       "-row-mt", "1", "-an", str(SALIDA / "praxi-reel-45.webm"))
video_registro("praxi-reel-45.webm", rel(reel), "reel de campaña recortado a 4:5; el atleta es generado: lleva pie")
for marca, carpeta in (("sesenta", "06-sesenta"),):
    src = PORT / carpeta / "movimiento/recorrido.webm"
    ffmpeg("-i", str(src), "-c", "copy", str(SALIDA / f"{marca}-recorrido.webm"))
    video_registro(f"{marca}-recorrido.webm", rel(src), "recorrido de Bruno, copiado tal cual")

# ---------------------------------------------------------------- la cinta de la home (reel): ocho tramos de 2 s
TRAMO = 2.0
W, H = 1280, 720
tmp = Path(os.environ.get("TMPDIR", "/tmp")) / "a-reel"
tmp.mkdir(exist_ok=True)
tramos = []


def tramo_de_video(src, desde, n):
    out = tmp / f"t{n}.mp4"
    ffmpeg("-ss", str(desde), "-t", str(TRAMO), "-i", str(src), "-vf", f"scale={W}:{H},fps=30,format=yuv420p",
           "-c:v", "libx264", "-crf", "16", "-preset", "fast", "-an", str(out))
    return out


def tramo_de_captura(img_path, n, recorrido=0.9):
    """Baja por una captura de página completa como bajaría un visitante: de arriba a `recorrido` pantallas."""
    im = abrir(img_path)
    im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    src = tmp / f"c{n}.png"
    im.save(src)
    desplazar = min(im.height - H, round(H * recorrido))
    out = tmp / f"t{n}.mp4"
    # posición con salida y llegada suaves (coseno), 60 cuadros
    expr = f"{desplazar}*(1-cos(PI*t/{TRAMO}))/2"
    ffmpeg("-loop", "1", "-t", str(TRAMO), "-i", str(src), "-vf",
           f"crop={W}:{H}:0:'{expr}',fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "16", "-preset", "fast",
           "-an", str(out))
    return out


if FUENTE:
    plan = [
        ("captura", FUENTE / "combeau-fotografia-1440-completa.png", None, "Combeau, fotografía", "Cliente", ""),
        ("video", PORT / "06-sesenta/movimiento/recorrido.webm", 4.0, "Sesenta", "Concepto", ""),
        ("captura", cap / "landing-1440-primera.jpg", None, "Praxi", "Propio", "Las personas están generadas con IA."),
        ("video", PORT / "04-tonela/movimiento/recorrido.webm", 0.4, "Tonela", "Concepto", ""),
        ("captura", FUENTE / "verifica-y-cumple-1440-completa.png", None, "Verifica y Cumple", "Propio", ""),
        ("video", PORT / "05-ocelo/movimiento/recorrido.webm", 3.0, "Ocelo", "Concepto", ""),
        ("captura", FUENTE / "combeau-modelo-1440-completa.png", None, "Combeau, modelo", "Cliente", ""),
        ("video", PORT / "07-doceavo/movimiento/recorrido.webm", 0.6, "Doceavo", "Concepto", ""),
    ]
    partes = []
    for i, (tipo, src, desde, nombre, clase, nota) in enumerate(plan):
        if tipo == "video":
            partes.append(tramo_de_video(src, desde, i))
        else:
            partes.append(tramo_de_captura(src, i, 0.35 if "landing" in str(src) else 0.9))
        tramos.append({"desde": round(i * TRAMO, 2), "hasta": round((i + 1) * TRAMO, 2), "nombre": nombre,
                       "tipo": clase, "nota": nota, "fuente": rel(src) if str(src).startswith(str(REPO)) else
                       f"captura viva: {Path(src).name}"})
    lista = tmp / "lista.txt"
    lista.write_text("".join(f"file '{p}'\n" for p in partes))
    ffmpeg("-f", "concat", "-safe", "0", "-i", str(lista), "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34",
           "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", str(SALIDA / "cinta.webm"))
    ffmpeg("-f", "concat", "-safe", "0", "-i", str(lista), "-c:v", "libx264", "-crf", "26", "-preset", "slow",
           "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(SALIDA / "cinta.mp4"))
    ffmpeg("-i", str(partes[0]), "-frames:v", "1", "-q:v", "3", str(tmp / "poster.png"))
    guardar(abrir(tmp / "poster.png"), "cinta-poster.webp", "primer cuadro de la cinta")
    video_registro("cinta.webm", [t["fuente"] for t in tramos], "ocho tramos de 2 s, cortes secos, sin audio")
    video_registro("cinta.mp4", [t["fuente"] for t in tramos], "la misma cinta en H.264, para Safari")
    (SALIDA / "cinta.json").write_text(json.dumps(tramos, ensure_ascii=False, indent=1))

(SALIDA / "medios.json").write_text(json.dumps(registro, ensure_ascii=False, indent=1))
total = sum(v["bytes"] for v in registro.values())
print(f"{len(registro)} archivos, {total / 1e6:.2f} MB")
