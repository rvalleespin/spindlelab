#!/usr/bin/env python3
"""Dirección A · el negro y los campos, medidos en la captura de página completa a 1440 (lock §20.1 y §20.3).

- Negro: de los píxeles que quedan FUERA de los medios, qué parte tiene luminancia relativa ≤ 0,01 (el lienzo
  #060606 da 0,0018; criterio 4 del encargo: al menos el 80 % en la home y en /trabajo/).
- Medios: qué parte del área de la página cubren (criterio 6: un tercio o más en los casos; Koto, del 33 al 72 %).
- Campos: un medio es campo si su color dominante (cubeta de 16 niveles por canal) cubre el 30 % o más del medio y es
  claro (luminancia ≥ 0,45) o de color (saturación ≥ 0,45 y valor ≥ 0,35). Es la regla de §20.1. Techo en un caso:
  del 10 al 35 % del área de la página; en una interior, el color en una franja o en las portadas.
Uso: python3 -I campos.py <carpeta con a-<vista>-1440-completa.png y .json> <salida.json>
"""
import colorsys
import json
import sys
from collections import Counter
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
carpeta, salida = Path(sys.argv[1]), Path(sys.argv[2])


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


res = {}
for png in sorted(carpeta.glob("a-*-1440-completa.png")):
    vista = png.name[2:-len("-1440-completa.png")]
    datos = json.loads(png.with_suffix(".json").read_text())
    im = Image.open(png).convert("RGB")
    W, H = im.size
    mascara = Image.new("L", (W, H), 0)
    area_medios = 0
    campos = []
    for x, y, w, h in datos["medios"]:
        x0, y0, x1, y1 = max(0, x), max(0, y), min(W, x + w), min(H, y + h)
        if x1 <= x0 or y1 <= y0:
            continue
        mascara.paste(255, (x0, y0, x1, y1))
        area_medios += (x1 - x0) * (y1 - y0)
        tipo, info = es_campo(im.crop((x0, y0, x1, y1)))
        if tipo:
            campos.append({"caja": [x0, y0, x1 - x0, y1 - y0], "tipo": tipo, **info})
    # negro fuera de los medios (muestreo de 1 de cada 4 píxeles en cada eje)
    total = negros = 0
    pm, pi = mascara.load(), im.load()
    for yy in range(0, H, 4):
        for xx in range(0, W, 4):
            if pm[xx, yy]:
                continue
            total += 1
            if lum(*pi[xx, yy]) <= 0.01:
                negros += 1
    area = W * H
    a_campos = sum(c["caja"][2] * c["caja"][3] for c in campos)
    # campos seguidos (en el orden de la página): el tramo más largo
    seguidos = maximo = 0
    cajas = sorted(([x, y, w, h] for x, y, w, h in datos["medios"]), key=lambda c: (c[1], c[0]))
    claves = {tuple(c["caja"][:2]) for c in campos}
    filas = {}
    for c in cajas:
        filas.setdefault(c[1], []).append(c)
    for _, fila in sorted(filas.items()):
        if any((max(0, c[0]), max(0, c[1])) in claves for c in fila):
            seguidos += 1
            maximo = max(maximo, seguidos)
        else:
            seguidos = 0
    res[vista] = {
        "pagina_px": [W, H],
        "negro_fuera_de_medios": round(negros / total, 4) if total else None,
        "medios": len(datos["medios"]),
        "area_medios": round(area_medios / area, 4),
        "campos": len(campos),
        "area_campos": round(a_campos / area, 4),
        "filas_de_campos_seguidas_max": maximo,
        "detalle_campos": campos,
    }
    print(f"{vista:16s} negro fuera de medios {res[vista]['negro_fuera_de_medios']:.1%} · medios {res[vista]['area_medios']:.1%} "
          f"· campos {len(campos)} = {res[vista]['area_campos']:.1%} · seguidos máx {maximo}")
salida.write_text(json.dumps(res, ensure_ascii=False, indent=1))
