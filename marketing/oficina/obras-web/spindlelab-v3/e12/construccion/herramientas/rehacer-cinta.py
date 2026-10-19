#!/usr/bin/env python3
"""La cinta de la home de A, rehecha sin el tramo viejo de «Combeau, modelo» (spec §3.2, defecto 21 del acta del paso 2).

Diego, 19-oct-2026 (E12, corrida 2, tanda 1). No genera nada: corta, escala y concatena grabaciones y capturas reales.

Qué cambia respecto de la cinta del prototipo (proto/a/medios/cinta.*, de proto/a/herramientas/medios.py):
  - Tramo 0, «Combeau, fotografía»: sale de e12/casos/combeau/medios/combeau-fotografia-cinta.mp4 (2 s, 1280 × 720).
  - Tramo 6, «Combeau, modelo»: sale de e12/casos/combeau/medios/combeau-modelo-cinta.mp4. El del prototipo bajaba por
    la captura completa de /modelo/ y entre los 12 y los 14 s mostraba su línea de medidas (inventario-casos §2.9).
  - Los otros seis, como estaban: mismas fuentes, mismo punto de partida y mismos parámetros que medios.py (las dos
    funciones de abajo están copiadas de ahí, sin cambios). Al final se comparan contra la cinta del prototipo, tramo por
    tramo, para comprobar que son los mismos (PSNR).

Fuentes de los seis tramos que no cambian: los recorridos de Bruno (marketing/portafolio/0N-*/movimiento/), la captura de
la landing de Praxi (e12/praxi/capturas/landing-1440-primera.jpg) y la captura viva de verifica.spindlelab.cl del 17-oct
(proto/a/herramientas/capturar-fuentes.mjs), que, como para medios.py, se pasa como carpeta: <fuente-a>.

Uso:  python3 -I rehacer-cinta.py <fuente-a>
Salida: spindlelab-astro/public/v3/cinta/{cinta.webm, cinta.mp4, cinta-poster.webp}
        spindlelab-astro/src/data/archivo/cinta.json (los tramos: desde, hasta, nombre, fuente)
        e12/construccion/herramientas/rehacer-cinta.json (lo medido: pesos, duración, PSNR contra el prototipo)
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

from PIL import Image

AQUI = Path(__file__).resolve().parent
REPO = Path(subprocess.run(["git", "rev-parse", "--show-toplevel"], cwd=AQUI, capture_output=True, text=True,
                           check=True).stdout.strip())
OBRA = REPO / "marketing/oficina/obras-web/spindlelab-v3"
PORT = REPO / "marketing/portafolio"
COMBEAU = OBRA / "e12/casos/combeau/medios"
PRAXI_CAP = OBRA / "e12/praxi/capturas"
PROTO = OBRA / "tableros/e12-direcciones/proto/a/medios"
SALIDA = REPO / "spindlelab-astro/public/v3/cinta"
DATOS = REPO / "spindlelab-astro/src/data/archivo"
if len(sys.argv) < 2:
    sys.exit("Falta <fuente-a>: la carpeta con verifica-y-cumple-1440-completa.png (capturar-fuentes.mjs, 17-oct).")
FUENTE = Path(sys.argv[1])

TRAMO = 2.0
W, H = 1280, 720
tmp = Path(os.environ.get("TMPDIR", "/tmp")) / "rehacer-cinta"
tmp.mkdir(parents=True, exist_ok=True)
SALIDA.mkdir(parents=True, exist_ok=True)
DATOS.mkdir(parents=True, exist_ok=True)


def rel(p):
    return str(Path(p).resolve().relative_to(REPO))


def abrir(p):
    return Image.open(p).convert("RGB")


def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


# ---- copiadas de proto/a/herramientas/medios.py (sin cambios) ----
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
# ---- fin de lo copiado ----


# (tipo, fuente, desde, nombre, tipo de pieza, nota, ¿cambia?)
plan = [
    ("video", COMBEAU / "combeau-fotografia-cinta.mp4", 0.0, "Combeau, fotografía", "Cliente", "", True),
    ("video", PORT / "06-sesenta/movimiento/recorrido.webm", 4.0, "Sesenta", "Concepto", "", False),
    ("captura", PRAXI_CAP / "landing-1440-primera.jpg", None, "Praxi", "Propio", "Las personas están generadas con IA.", False),
    ("video", PORT / "04-tonela/movimiento/recorrido.webm", 0.4, "Tonela", "Concepto", "", False),
    ("captura", FUENTE / "verifica-y-cumple-1440-completa.png", None, "Verifica y Cumple", "Propio", "", False),
    ("video", PORT / "05-ocelo/movimiento/recorrido.webm", 3.0, "Ocelo", "Concepto", "", False),
    ("video", COMBEAU / "combeau-modelo-cinta.mp4", 0.0, "Combeau, modelo", "Cliente", "", True),
    ("video", PORT / "07-doceavo/movimiento/recorrido.webm", 0.6, "Doceavo", "Concepto", "", False),
]

partes, tramos = [], []
for i, (tipo, src, desde, nombre, clase, nota, cambia) in enumerate(plan):
    if not Path(src).exists():
        sys.exit(f"No existe {src}")
    if tipo == "video":
        partes.append(tramo_de_video(src, desde, i))
    else:
        partes.append(tramo_de_captura(src, i, 0.35 if "landing" in str(src) else 0.9))
    fuente = rel(src) if str(Path(src).resolve()).startswith(str(REPO)) else f"captura viva: {Path(src).name}"
    tramos.append({"desde": round(i * TRAMO, 2), "hasta": round((i + 1) * TRAMO, 2), "nombre": nombre,
                   "tipo": clase, "nota": nota, "fuente": fuente, "rehecho": cambia})

lista = tmp / "lista.txt"
lista.write_text("".join(f"file '{p}'\n" for p in partes))
# VP9 a crf 36 y no a 34 como medios.py: con los dos tramos nuevos de Combeau, a 34 pesaba 1.087.506 bytes y el techo de
# la spec (§3.2 y §3.5.5) es 1 MB por formato; a 35, 1.027.052; a 36, 976.539. El H.264 queda como en medios.py (crf 26).
ffmpeg("-f", "concat", "-safe", "0", "-i", str(lista), "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36",
       "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", str(SALIDA / "cinta.webm"))
ffmpeg("-f", "concat", "-safe", "0", "-i", str(lista), "-c:v", "libx264", "-crf", "26", "-preset", "slow",
       "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(SALIDA / "cinta.mp4"))
ffmpeg("-i", str(partes[0]), "-frames:v", "1", "-q:v", "3", str(tmp / "poster.png"))
abrir(tmp / "poster.png").save(SALIDA / "cinta-poster.webp", "WEBP", quality=80, method=6)
(DATOS / "cinta.json").write_text(json.dumps(tramos, ensure_ascii=False, indent=1) + "\n")


# ---- comprobación: pesos, duración, sin audio, y los seis tramos que no cambian contra el prototipo ----
def probar(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,codec_name,width,height,pix_fmt",
                        "-show_entries", "format=duration", "-of", "json", str(p)], capture_output=True, text=True,
                       check=True)
    return json.loads(r.stdout)


def psnr(a, b, desde):
    r = subprocess.run(["ffmpeg", "-v", "info", "-ss", str(desde), "-t", str(TRAMO), "-i", str(a), "-ss", str(desde),
                        "-t", str(TRAMO), "-i", str(b), "-lavfi", "[0:v][1:v]psnr", "-f", "null", "-"],
                       capture_output=True, text=True)
    m = re.search(r"average:([0-9.inf]+)", r.stderr)
    return float(m.group(1)) if m and m.group(1) != "inf" else (99.0 if m else None)


def moov_antes_de_mdat(p):
    datos = Path(p).read_bytes()[:200000]
    return datos.find(b"moov") != -1 and (datos.find(b"mdat") == -1 or datos.find(b"moov") < datos.find(b"mdat"))


medido = {"archivos": {}, "tramos": []}
for n in ("cinta.webm", "cinta.mp4", "cinta-poster.webp"):
    p = SALIDA / n
    medido["archivos"][n] = {"bytes": p.stat().st_size}
    if n.endswith((".webm", ".mp4")):
        info = probar(p)
        medido["archivos"][n].update({
            "segundos": round(float(info["format"]["duration"]), 3),
            "pistas": [s["codec_type"] for s in info["streams"]],
            "codec": [s.get("codec_name") for s in info["streams"]],
            "px": [info["streams"][0].get("width"), info["streams"][0].get("height")],
        })
    if n.endswith(".mp4"):
        medido["archivos"][n]["faststart"] = moov_antes_de_mdat(p)
for t in tramos:
    fila = {"nombre": t["nombre"], "rehecho": t["rehecho"]}
    fila["psnr_contra_prototipo_mp4"] = psnr(SALIDA / "cinta.mp4", PROTO / "cinta.mp4", t["desde"])
    medido["tramos"].append(fila)
(AQUI / "rehacer-cinta.json").write_text(json.dumps(medido, ensure_ascii=False, indent=1) + "\n")
print(json.dumps(medido, ensure_ascii=False, indent=1))
