"""QA E12 paso 2, vuelta 2 (Javiera, 18-oct-2026). Criterio 4, segundo punto: los campos claros y de color de las
páginas de caso a 1440, contados como el lock §20.1 («un medio cuyo color dominante cubre al menos el 30 % es un campo:
claro o de color»). Implementación propia, no la de Lucía:
  - cada rectángulo de medio (img/video/canvas/picture visible) de crudo/interacciones.json (medios1440.rects), recortado
    de la captura de página completa medios-<vista>.png;
  - color dominante: el cajón más poblado al cuantizar RGB en pasos de 16; su parte de los píxeles del medio;
  - si esa parte es >= 30 %: campo CLARO si la luminancia relativa del cajón es >= 0,40; campo DE COLOR si su croma
    (max-min, 0-255) es >= 60 y su luminancia >= 0,05; si no, el medio es oscuro o neutro y no es campo;
  - % de campo = área de los medios que son campo (la unión, sin contar dos veces lo que se superpone) / área de la página.
Además cuenta los medios claros o de color seguidos (techo del lock §20.3: cuatro).
Uso: python3 -I campos.py <interacciones.json> <carpeta-capturas> <salida.json> [vista ...]
"""
import json
import sys

import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
entrada, carpeta, salida = sys.argv[1:4]
vistas = sys.argv[4:] or ["a-praxi", "a-sesenta", "b-praxi", "b-sesenta", "a-desarrollo-web", "b-desarrollo-web", "a-trabajo", "b-trabajo", "a-home", "b-home"]
R = json.load(open(entrada))


def lum(rgb):
    c = np.asarray(rgb, float) / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return float(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2])


res = {}
for k in vistas:
    m = R["vistas"][k]["medios1440"]
    im = np.asarray(Image.open(f"{carpeta}/medios-{k}.png").convert("RGB"))
    h, w, _ = im.shape
    campo = np.zeros((h, w), bool)
    medios = []
    for x, y, rw, rh in sorted(m["rects"], key=lambda r: (r[1], r[0])):
        x0, y0, x1, y1 = max(0, x), max(0, y), min(w, x + rw), min(h, y + rh)
        if x1 - x0 < 8 or y1 - y0 < 8:
            continue
        sub = im[y0:y1, x0:x1].reshape(-1, 3)
        q = (sub // 16).astype(np.int32)
        clave = q[:, 0] * 256 + q[:, 1] * 16 + q[:, 2]
        vals, cuenta = np.unique(clave, return_counts=True)
        i = int(cuenta.argmax())
        parte = float(cuenta[i] / cuenta.sum())
        sel = sub[clave == vals[i]]
        dom = sel.mean(axis=0)
        L = lum(dom)
        croma = float(dom.max() - dom.min())
        tipo = "oscuro"
        if parte >= 0.30:
            if L >= 0.40:
                tipo = "claro"
            elif croma >= 60 and L >= 0.05:
                tipo = "color"
        if tipo != "oscuro":
            campo[y0:y1, x0:x1] = True
        medios.append({"rect": [x, y, rw, rh], "dominante": "#%02X%02X%02X" % tuple(int(v) for v in dom), "parte": round(parte * 100, 1), "L": round(L, 3), "tipo": tipo})
    seguidos, maxseg = 0, 0
    for md in medios:
        seguidos = seguidos + 1 if md["tipo"] != "oscuro" else 0
        maxseg = max(maxseg, seguidos)
    res[k] = {"pagina": f"{w}x{h}", "campo_pct": round(float(campo.mean()) * 100, 1),
              "claro_pct": None, "medios": len(medios), "campos": sum(1 for md in medios if md["tipo"] != "oscuro"),
              "max_seguidos": maxseg, "detalle": medios}
    cl = np.zeros((h, w), bool); co = np.zeros((h, w), bool)
    for md in medios:
        x, y, rw, rh = md["rect"]
        if md["tipo"] == "claro":
            cl[max(0, y):min(h, y + rh), max(0, x):min(w, x + rw)] = True
        elif md["tipo"] == "color":
            co[max(0, y):min(h, y + rh), max(0, x):min(w, x + rw)] = True
    res[k]["claro_pct"] = round(float(cl.mean()) * 100, 1)
    res[k]["color_pct"] = round(float(co.mean()) * 100, 1)
    print(k, {kk: vv for kk, vv in res[k].items() if kk != "detalle"})
json.dump(res, open(salida, "w"), indent=1, ensure_ascii=False)
