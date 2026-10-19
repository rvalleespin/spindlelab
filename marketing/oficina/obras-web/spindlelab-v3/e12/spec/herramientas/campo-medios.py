"""E12 · spec sobre A · ¿qué medio es un «campo»? Lucía, 19-oct-2026.

La misma regla del lock §20.1 y de `proto/a/herramientas/campos.py` (`es_campo`, copiada sin cambios): un medio es campo
si su color dominante (cubeta de 16 niveles por canal, sobre la imagen reducida a 1/8) cubre el 30 % o más del marco y
es claro (luminancia ≥ 0,45) o de color (saturación ≥ 0,45 y valor ≥ 0,35). Se corre sobre cada imagen candidata tal
como la recorta su marco: entera (su proporción) y, para la franja de una interior, recortada al centro a 2,39:1 (el
marco de la franja desde 834 px, spec §2) y a 16:9 (bajo 834). Sirve para cumplir el techo de las interiores (spec
§3.4, defecto 22 del acta del paso 2) eligiendo la franja antes de construir.

Uso: python3 -I campo-medios.py <salida.json> <imagen> [<imagen> ...]
"""
import colorsys
import json
import sys
from collections import Counter

from PIL import Image


def lum(r, g, b):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def es_campo(im):
    peq = im.resize((max(1, im.width // 8), max(1, im.height // 8)))
    b = peq.tobytes()
    px = [tuple(b[i:i + 3]) for i in range(0, len(b), 3)]
    cubetas = Counter((r // 16, g // 16, b // 16) for r, g, b in px)
    (cr, cg, cb), n = cubetas.most_common(1)[0]
    r, g, b = cr * 16 + 8, cg * 16 + 8, cb * 16 + 8
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    parte = n / len(px)
    claro = lum(r, g, b) >= 0.45
    color = s >= 0.45 and v >= 0.35
    tipo = "claro" if claro else ("color" if color else None)
    return (tipo if parte >= 0.30 else None), {"dominante": "#%02X%02X%02X" % (r, g, b), "parte": round(parte, 3)}


def recorte(im, prop):
    w, h = im.size
    if w / h > prop:
        nw = round(h * prop)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / prop)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))


salida, imagenes = sys.argv[1], sys.argv[2:]
R = []
for ruta in imagenes:
    im = Image.open(ruta).convert("RGB")
    fila = {"imagen": ruta.split("obras-web/spindlelab-v3/")[-1].split("marketing/")[-1], "px": list(im.size)}
    for nombre, prop in (("entera", None), ("franja-2.39", 2.39), ("franja-16:9", 16 / 9)):
        t, info = es_campo(im if prop is None else recorte(im, prop))
        fila[nombre] = {"campo": t, **info}
    R.append(fila)
    print(f"{fila['imagen']:70s} entera {str(fila['entera']['campo']):6s} {fila['entera']['dominante']} {fila['entera']['parte']:.2f} · "
          f"2,39 {str(fila['franja-2.39']['campo']):6s} {fila['franja-2.39']['parte']:.2f}")
json.dump(R, open(salida, "w"), ensure_ascii=False, indent=1)
