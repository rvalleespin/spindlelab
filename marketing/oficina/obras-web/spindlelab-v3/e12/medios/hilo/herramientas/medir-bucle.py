"""E12 · portada de A · mide el hilo de oro: el corte del bucle, el peso, la calidad y la luz por zona.

Uso (lo llama hacer-hilo.sh):
  python3 -I medir-bucle.py <original.mp4> <maestro-1920.mkv> <maestro-movil.mkv> <dir-salida> <cuadros-de-fundido>

Escribe <dir-salida>/bucle.json. Cómo se mide el corte: cada cuadro se baja a gris, a un cuarto de su ancho, y se
compara (diferencia absoluta media, en niveles de 0 a 255, y SSIM global) con el que le sigue. El corte del bucle es
el par último → primero. Un corte que no salta es uno que cae dentro de lo que cambian dos cuadros seguidos del propio
clip (bajo su percentil 95). La calidad es el SSIM de ffmpeg contra el maestro sin pérdida del que sale cada archivo.
La luz es la luminancia relativa WCAG (sRGB linealizado) media de cada zona de una retícula de 3 × 3 (1920) o de
1 × 3 (teléfono), con el cuadro en que cada zona está más clara: es donde se mide el contraste de la frase.
"""
import hashlib
import json
import os
import re
import subprocess
import sys

import numpy as np

SRC, M1920, MMOVIL, OUT, D = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], int(sys.argv[5])


def probe(ruta):
    r = subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-show_entries",
                        "stream=codec_type,codec_name,profile,width,height,r_frame_rate,nb_read_frames,pix_fmt:format=size,duration,bit_rate",
                        "-of", "json", ruta], capture_output=True, text=True, check=True)
    j = json.loads(r.stdout)
    v = [s for s in j["streams"] if s["codec_type"] == "video"][0]
    num, den = map(int, v["r_frame_rate"].split("/"))
    return {"codec": v["codec_name"], "perfil": v.get("profile"), "ancho": v["width"], "alto": v["height"],
            "fps": num / den, "cuadros": int(v["nb_read_frames"]), "pixeles": v.get("pix_fmt"),
            "duracion_s": round(float(j["format"]["duration"]), 3), "bytes": int(j["format"]["size"]),
            "MB": round(int(j["format"]["size"]) / 1e6, 3), "kbit_s": round(int(j["format"]["bit_rate"]) / 1000),
            "audio": any(s["codec_type"] == "audio" for s in j["streams"])}


def primer_clave(ruta):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "frame=key_frame",
                        "-read_intervals", "%+#1", "-of", "csv=p=0", ruta], capture_output=True, text=True, check=True)
    return r.stdout.strip().splitlines()[0].strip(",") == "1"


def cuadros(ruta, w, h, gris=True):
    fmt = "gray" if gris else "rgb24"
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", ruta, "-vf", f"scale={w}:{h}:flags=area", "-pix_fmt", fmt,
                          "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.uint8)
    return a.reshape(-1, h, w) if gris else a.reshape(-1, h, w, 3)


def ssim_global(a, b):
    c1, c2 = (0.01 * 255) ** 2, (0.03 * 255) ** 2
    ma, mb = a.mean(), b.mean()
    va, vb = a.var(), b.var()
    cov = ((a - ma) * (b - mb)).mean()
    return float(((2 * ma * mb + c1) * (2 * cov + c2)) / ((ma * ma + mb * mb + c1) * (va + vb + c2)))


def corte(ruta, ancho, alto):
    w, h = ancho // 4, alto // 4
    f = cuadros(ruta, w, h).astype(np.float32)
    seg = [float(np.abs(f[i] - f[i + 1]).mean()) for i in range(len(f) - 1)]
    mad = float(np.abs(f[-1] - f[0]).mean())
    p95 = float(np.percentile(seg, 95))
    return {"cuadros": len(f), "difSeguidos": {"mediana": round(float(np.median(seg)), 2), "p95": round(p95, 2),
                                               "max": round(max(seg), 2)},
            "corte": {"dif": round(mad, 2), "ssim": round(ssim_global(f[-1], f[0]), 3),
                      "vecesLaMediana": round(mad / float(np.median(seg)), 2),
                      "luzMediaUltimoPrimero": [round(float(f[-1].mean()), 1), round(float(f[0].mean()), 1)]},
            "salta": mad > p95}


def ssim_contra(ruta, maestro):
    r = subprocess.run(["ffmpeg", "-i", ruta, "-i", maestro, "-lavfi", "[0][1]ssim", "-f", "null", "-"],
                       capture_output=True, text=True)
    m = re.search(r"All:([0-9.]+)", r.stderr)
    return round(float(m.group(1)), 4) if m else None


def luz(ruta, ancho, alto, cols, filas):
    w, h = ancho // 4, alto // 4
    f = cuadros(ruta, w, h, gris=False).astype(np.float32) / 255.0
    lin = np.where(f <= 0.04045, f / 12.92, ((f + 0.055) / 1.055) ** 2.4)
    Y = 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]
    nombres_f = ["arriba", "medio", "abajo"]
    nombres_c = ["izquierda", "centro", "derecha"] if cols == 3 else ["todo el ancho"]
    zonas = []
    for fi in range(filas):
        for ci in range(cols):
            z = Y[:, fi * h // filas:(fi + 1) * h // filas, ci * w // cols:(ci + 1) * w // cols]
            media = z.reshape(len(z), -1).mean(1)
            p95 = np.percentile(z.reshape(len(z), -1), 95, axis=1)
            k = int(media.argmax())
            zonas.append({"zona": f"{nombres_f[fi]} · {nombres_c[ci]}", "luzMediaMax": round(float(media.max()), 4),
                          "cuadro": k, "segundo": round(k / 24, 3), "luzP95EnEseCuadro": round(float(p95[k]), 4),
                          "luzMediaPromedio": round(float(media.mean()), 4),
                          "contrasteBlancoContraLaMediaMax": round(1.05 / (float(media.max()) + 0.05), 2)})
    total = Y.reshape(len(Y), -1).mean(1)
    return {"cuadroMasClaro": int(total.argmax()), "segundo": round(int(total.argmax()) / 24, 3),
            "luzMediaMax": round(float(total.max()), 4), "zonas": zonas}


def sha(ruta):
    h = hashlib.sha256()
    with open(ruta, "rb") as fh:
        for b in iter(lambda: fh.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


salida = {
    "fecha": "2026-10-19", "hechoPor": "Bruno (dirección creativa)",
    "original": {"ruta": "spindlelab-astro/public/hero-hilo-de-oro.mp4", "sha256": sha(SRC), **probe(SRC),
                 "bucle": corte(SRC, 1920, 1080)},
    "fundido": {"cuadros": D, "segundos": round(D / 24, 3),
                "como": f"el bucle empieza en el cuadro {D} del original; sus últimos {D} cuadros se funden (xfade fade) con los cuadros 0 a {D - 1}"},
    "archivos": {},
}
for nombre, maestro, (an, al) in (("hilo-1920.webm", M1920, (1920, 1080)), ("hilo-1920.mp4", M1920, (1920, 1080)),
                                   ("hilo-movil.webm", MMOVIL, (500, 1080)), ("hilo-movil.mp4", MMOVIL, (500, 1080))):
    ruta = os.path.join(OUT, nombre)
    salida["archivos"][nombre] = {**probe(ruta), "primerCuadroEsClave": primer_clave(ruta),
                                  "ssimContraMaestro": ssim_contra(ruta, maestro), "bucle": corte(ruta, an, al)}
for p in ("hilo-1920-poster.webp", "hilo-movil-poster.webp"):
    ruta = os.path.join(OUT, p)
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", ruta],
                       capture_output=True, text=True, check=True)
    w, h = r.stdout.strip().split(",")[:2]
    salida["archivos"][p] = {"ancho": int(w), "alto": int(h), "bytes": os.path.getsize(ruta),
                             "que": "el primer cuadro del bucle (el cuadro %d del original)" % D}
salida["luz"] = {"nota": "luminancia relativa WCAG, de 0 (negro) a 1 (blanco), sin velo; «contrasteBlancoContraLaMediaMax» es el del blanco puro sobre la media de esa zona en su cuadro más claro, sin velo: es una cota, no la medida de la frase, que se hace con el velo puesto y sobre los píxeles detrás de cada letra",
                 "hilo-1920.webm": luz(os.path.join(OUT, "hilo-1920.webm"), 1920, 1080, 3, 3),
                 "hilo-movil.webm": luz(os.path.join(OUT, "hilo-movil.webm"), 500, 1080, 1, 3)}
with open(os.path.join(OUT, "bucle.json"), "w") as fh:
    json.dump(salida, fh, ensure_ascii=False, indent=2)
o = salida["original"]["bucle"]["corte"]
print("original: corte", o, "salta:", salida["original"]["bucle"]["salta"])
for k, v in salida["archivos"].items():
    if "bucle" in v:
        print(k, v["MB"], "MB", v["ancho"], "x", v["alto"], "ssim", v["ssimContraMaestro"], "corte", v["bucle"]["corte"], "salta:", v["bucle"]["salta"])
    else:
        print(k, v)
