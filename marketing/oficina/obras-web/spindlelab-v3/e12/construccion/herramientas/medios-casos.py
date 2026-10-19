#!/usr/bin/env python3
"""Los medios de las seis páginas de caso de A (obra E12, corrida 2, tanda 3). Diego, 19-oct-2026.

No genera nada: copia, recorta, escala y pasa a WebP lo que ya existe (spec §3.3, «Plan de media por slot»; brief
«Compuerta 2», punto 5: ninguna generación pagada ni imagen nueva generada).

  · Praxi: las capturas y recortes del prototipo de A (proto/a/medios/praxi-*), tal cual; el video del inicio en VP9
    (el del prototipo) y en H.264 (e12/praxi/material/praxi-hero-secuencia.mp4, tal cual); el reel en VP9 (prototipo)
    y en H.264, recortado a 4:5 con el mismo corte que usó el prototipo (crop=720:900:0:100).
  · Combeau: solo e12/casos/combeau/medios/ (inventario §2.9, «Lo que se puede usar»), copiados tal cual. Nada de
    e12/inventario/grabaciones/ ni del cinta.* del prototipo (spec §6.10).
  · Sesenta: las placas del prototipo de A (proto/a/medios/sesenta-*), que son las de Bruno escaladas; su recorrido.
  · Ocelo, Doceavo, Tonela: las placas, capturas y medios de marketing/portafolio/0N-*/, escalados y pasados a WebP
    (calidad 80, como el prototipo); el recorrido en VP9 y H.264, tal cual.
  · El medio principal de cada concepto a 390 (4:5) es el que dice su caso.md (Bruno), «Medio principal».

Salida: spindlelab-astro/public/v3/trabajo/<caso>/ y spindlelab-astro/src/data/archivo/medios-casos.json (qué es cada
archivo, de dónde sale, su tamaño y el nombre con que Clara lo lista en texto-obra.json, para leer su alt y su pie).
Uso: python3 -I medios-casos.py
"""
import hashlib
import json
import shutil
import subprocess
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
REPO = Path(__file__).resolve().parents[7]
OBRA = REPO / "marketing/oficina/obras-web/spindlelab-v3"
P = OBRA / "tableros/e12-direcciones/proto/a/medios"
PX = OBRA / "e12/praxi/material"
C = OBRA / "e12/casos/combeau/medios"
PORT = REPO / "marketing/portafolio"
ASTRO = REPO / "spindlelab-astro"
SALIDA = ASTRO / "public/v3/trabajo"
MANIFIESTO = ASTRO / "src/data/archivo/medios-casos.json"


def rel(p):
    return str(Path(p).resolve().relative_to(REPO))


def recorte(im, prop, ancla=(0.5, 0.5)):
    """Recorta a la proporción ancho/alto pedida, anclado (x, y) en 0..1. Si ya la tiene (±0,5 %), no toca nada."""
    w, h = im.size
    if abs(w / h - prop) / prop < 0.005:
        return im
    if w / h > prop:
        nw, nh = round(h * prop), h
    else:
        nw, nh = w, round(w / prop)
    x = round((w - nw) * ancla[0])
    y = round((h - nh) * ancla[1])
    return im.crop((x, y, x + nw, y + nh))


PROP = {"169": 16 / 9, "45": 4 / 5, "162": 1.62, "828": 1.0}
ANCHO = {"169": 1600, "45": 1050, "162": 1050, "828": 828}


def webp(fuente, destino, forma, ancla=(0.5, 0.5)):
    im = Image.open(fuente).convert("RGB")
    im = recorte(im, PROP[forma], ancla)
    a = ANCHO[forma]
    if im.width > a:
        im = im.resize((a, round(im.height * a / im.width)), Image.LANCZOS)
    im.save(destino, "WEBP", quality=80, method=6)


def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def px(ruta):
    if ruta.suffix in (".webm", ".mp4"):
        s = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                            "-of", "csv=p=0", str(ruta)], capture_output=True, text=True, check=True).stdout.strip()
        w, h = s.split(",")[:2]
        return int(w), int(h)
    with Image.open(ruta) as im:
        return im.size


# (salida, fuente, cómo, nombre en texto-obra.json de Clara o None)
#   cómo: "copia" (tal cual), ("webp", forma[, ancla]), "reel-h264"
def concepto(carpeta, marca, placas, recorrido_movil):
    base = PORT / carpeta
    filas = [
        (f"{marca}-recorrido.webm", base / "movimiento/recorrido.webm", "copia", None),
        (f"{marca}-recorrido.mp4", base / "movimiento/recorrido.mp4", "copia", None),
        (f"{marca}-recorrido-poster.webp", base / "movimiento/poster.jpg", ("webp", "169"), None),
        (f"{marca}-movil-45.webp", base / recorrido_movil, ("webp", "45", (0.5, 0.0)), None),
    ]
    for salida, fuente, forma, *ancla in placas:
        filas.append((salida, base / fuente, ("webp", forma, *ancla), Path(fuente).name))
    return filas


CASOS = {
    "praxi": [
        ("praxi-hero.webm", P / "praxi-hero.webm", "copia", None),
        ("praxi-hero.mp4", PX / "praxi-hero-secuencia.mp4", "copia", None),
        ("praxi-hero-poster.webp", P / "praxi-hero-poster.webp", "copia", None),
        ("praxi-reel-45.webm", P / "praxi-reel-45.webm", "copia", "praxi-reel-45.webm"),
        ("praxi-reel-45.mp4", PX / "praxi-reel-a-memoria-720.mp4", "reel-h264", "praxi-reel-45.webm"),
        ("praxi-reel-poster-45.webp", P / "praxi-reel-poster-45.webp", "copia", None),
    ] + [(n, P / n, "copia", n) for n in (
        "praxi-portada-390-45.webp", "praxi-login-390-45.webp", "praxi-reglas-169.webp", "praxi-frase-45.webp",
        "praxi-numeros-45.webp", "praxi-numeros-169.webp", "praxi-amarillo-169.webp", "praxi-avatar-amarillo-162.webp",
        "praxi-avatar-oscuro-162.webp", "praxi-facebook-169.webp", "praxi-carrusel-1-45.webp",
        "praxi-carrusel-3-45.webp", "praxi-empezar-169.webp")],
    "combeau": [(n, C / n, "copia", n) for n in (
        "combeau-fotografia-recorrido-1440.webm", "combeau-fotografia-recorrido-1440.mp4",
        "combeau-fotografia-recorrido-1440-poster.webp", "combeau-fotografia-recorrido-390.webm",
        "combeau-fotografia-recorrido-390.mp4", "combeau-fotografia-recorrido-390-poster.webp",
        "combeau-modelo-recorrido-1440.webm", "combeau-modelo-recorrido-1440.mp4",
        "combeau-modelo-recorrido-1440-poster.webp", "combeau-modelo-recorrido-390.webm",
        "combeau-modelo-recorrido-390.mp4", "combeau-modelo-recorrido-390-poster.webp",
        "combeau-panel-entrada-169.webp", "combeau-panel-encuadre-169.webp", "combeau-panel-colecciones-169.webp",
        "combeau-foto-servida-828.webp", "combeau-fotografia-169.webp", "combeau-fotografia-45.webp",
        "combeau-modelo-169.webp", "combeau-modelo-45.webp")],
    "sesenta": [
        ("sesenta-recorrido.webm", PORT / "06-sesenta/movimiento/recorrido.webm", "copia", None),
        ("sesenta-recorrido.mp4", PORT / "06-sesenta/movimiento/recorrido.mp4", "copia", None),
        ("sesenta-recorrido-poster.webp", P / "sesenta-recorrido-poster.webp", "copia", None),
        ("sesenta-movil-45.webp", P / "sesenta-45.webp", "copia", None),
    ] + [(n, P / n, "copia", n) for n in (
        "sesenta-suma-169.webp", "sesenta-logo-169.webp", "sesenta-sello-45.webp", "sesenta-paleta-45.webp",
        "sesenta-contador-169.webp", "sesenta-letra-45.webp", "sesenta-courier-162.webp", "sesenta-otrosi-162.webp",
        "sesenta-home-169.webp", "sesenta-home-390-45.webp", "sesenta-interior-390-45.webp",
        "sesenta-finiquito-169.webp", "sesenta-hoja-162.webp", "sesenta-tarjeta-162.webp",
        "sesenta-lector-390-45.webp", "sesenta-lector-169.webp", "sesenta-interior-169.webp",
        "sesenta-pregunta-169.webp")],
    "ocelo": concepto("05-ocelo", "ocelo", [
        ("ocelo-carta-169.webp", "identidad/placas/carta-tinta.png", "169"),
        ("ocelo-logotipo-169.webp", "identidad/placas/logotipo-tinta.png", "169"),
        ("ocelo-landolt-45.webp", "identidad/placas/landolt-tinta.png", "45"),
        ("ocelo-letra-45.webp", "identidad/placas/letra-tinta.png", "45"),
        ("ocelo-duocromo-169.webp", "identidad/placas/duocromo-tinta.png", "169"),
        ("ocelo-interruptor-45.webp", "identidad/placas/interruptor-tinta.png", "45"),
        ("ocelo-mono-162.webp", "identidad/placas/mono-tinta.png", "162"),
        ("ocelo-puerta-162.webp", "identidad/placas/puerta-tinta.png", "162"),
        ("ocelo-home-luz-169.webp", "medios/home-1440-luz.png", "169"),
        ("ocelo-home-390-sala-45.webp", "medios/home-390-sala.png", "45", (0.5, 0.0)),
        ("ocelo-home-390-luz-45.webp", "medios/home-390-luz.png", "45", (0.5, 0.0)),
        ("ocelo-evaluacion-pasos-169.webp", "medios/evaluacion-1440-pasos.png", "169"),
        ("ocelo-informe-tinta-162.webp", "identidad/placas/informe-tinta.png", "162"),
        ("ocelo-informe-lienzo-162.webp", "identidad/placas/informe-lienzo.png", "162"),
        ("ocelo-evaluacion-390-duocromo-45.webp", "medios/evaluacion-390-duocromo.png", "45", (0.5, 0.0)),
        ("ocelo-prometer-169.webp", "medios/prometer-1440.png", "169"),
    ], "identidad/portadas/ocelo-45.png"),
    "doceavo": concepto("07-doceavo", "doceavo", [
        ("doceavo-anio-169.webp", "identidad/placas/16x9-anio-tinta.png", "169"),
        ("doceavo-logo-45.webp", "identidad/placas/4x5-logo-tinta.png", "45"),
        ("doceavo-meses-45.webp", "identidad/placas/4x5-meses-tinta.png", "45"),
        ("doceavo-letra-45.webp", "identidad/placas/4x5-letra-tinta.png", "45"),
        ("doceavo-eje-162.webp", "identidad/placas/1-62-eje-tinta.png", "162"),
        ("doceavo-cifras-162.webp", "identidad/placas/1-62-cifras-tinta.png", "162"),
        ("doceavo-papel-169.webp", "identidad/placas/16x9-papel-tinta.png", "169"),
        ("doceavo-home-169.webp", "medios/home-1440.png", "169"),
        ("doceavo-home-390-45.webp", "medios/home-390.png", "45", (0.5, 0.0)),
        ("doceavo-calendario-390-45.webp", "medios/calendario-390.png", "45", (0.5, 0.0)),
        ("doceavo-lomo-162.webp", "identidad/placas/1-62-lomo-lienzo.png", "162"),
        ("doceavo-hoja-162.webp", "identidad/placas/1-62-hoja-tinta.png", "162"),
        ("doceavo-informe-45.webp", "identidad/placas/4x5-informe-tinta.png", "45"),
        ("doceavo-calendario-169.webp", "medios/calendario-1440.png", "169"),
        ("doceavo-f29-169.webp", "identidad/placas/16x9-f29-tinta.png", "169"),
    ], "identidad/portadas/portada-45.png"),
    "tonela": concepto("04-tonela", "tonela", [
        ("tonela-codigo-169.webp", "identidad/placas/16x9-codigo-tinta.png", "169"),
        ("tonela-logo-169.webp", "identidad/placas/16x9-logo-tinta.png", "169"),
        ("tonela-eslinga-2-lienzo-45.webp", "identidad/placas/4x5-eslinga-2-lienzo.png", "45"),
        ("tonela-eslinga-5-tinta-45.webp", "identidad/placas/4x5-eslinga-5-tinta.png", "45"),
        ("tonela-letra-45.webp", "identidad/placas/4x5-letra-tinta.png", "45"),
        ("tonela-stencil-162.webp", "identidad/placas/1-62-stencil-lienzo.png", "162"),
        ("tonela-barlow-162.webp", "identidad/placas/1-62-barlow-lienzo.png", "162"),
        ("tonela-tabla-169.webp", "identidad/placas/16x9-tabla-lienzo.png", "169"),
        ("tonela-pliego-169.webp", "identidad/pliego.png", "169"),
        # las capturas de 1440 miden 1440 × 900: el 16:9 se corta desde arriba (la primera pantalla, con su rótulo)
        ("tonela-home-169.webp", "capturas/home-1440-primera.png", "169", (0.5, 0.0)),
        ("tonela-home-390-45.webp", "capturas/medio-4x5-390.png", "45", (0.5, 0.0)),
        ("tonela-inspeccion-390-45.webp", "capturas/inspeccion-4x5-390.png", "45", (0.5, 0.0)),
        ("tonela-registro-162.webp", "identidad/placas/1-62-registro-tinta.png", "162"),
        ("tonela-rotulo-162.webp", "identidad/placas/1-62-rotulo-tinta.png", "162"),
        ("tonela-eslinga-2-tinta-45.webp", "identidad/placas/4x5-eslinga-2-tinta.png", "45"),
        ("tonela-inspeccion-169.webp", "capturas/inspeccion-1440-primera.png", "169", (0.5, 0.0)),
    ], "capturas/medio-4x5-390.png"),
}

manifiesto = {"nota": "Lo escribe e12/construccion/herramientas/medios-casos.py (tanda 3); no se edita a mano. "
                      "«clara» es el nombre del archivo en texto-obra.json, de donde salen su alt y su pie.",
              "casos": {}}
for caso, filas in CASOS.items():
    destino = SALIDA / caso
    if destino.exists():
        shutil.rmtree(destino)
    destino.mkdir(parents=True)
    reg = {}
    for salida, fuente, como, clara in filas:
        d = destino / salida
        if como == "copia":
            shutil.copyfile(fuente, d)
        elif como == "reel-h264":
            ffmpeg("-i", str(fuente), "-vf", "crop=720:900:0:100", "-c:v", "libx264", "-crf", "26", "-preset", "slow",
                   "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(d))
        else:
            webp(fuente, d, como[1], *(como[2:] or [(0.5, 0.5)]))
        w, h = px(d)
        reg[salida] = {"src": f"/v3/trabajo/{caso}/{salida}", "ancho": w, "alto": h, "bytes": d.stat().st_size,
                       "sha256": hashlib.sha256(d.read_bytes()).hexdigest(), "de": rel(fuente),
                       "como": como if isinstance(como, str) else "webp " + como[1], "clara": clara}
    manifiesto["casos"][caso] = reg
    print(f"{caso}: {len(reg)} archivos, {sum(r['bytes'] for r in reg.values()) / 1e6:.2f} MB")

MANIFIESTO.write_text(json.dumps(manifiesto, ensure_ascii=False, indent=1) + "\n")
