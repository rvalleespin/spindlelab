"""QA E12 paso 2, vuelta 1 (Javiera). Criterios 4 y 6 del encargo, medidos sobre la página completa a 1440.

Lee crudo/interacciones.json (los rectángulos de cada img/video/canvas/picture visible, en coordenadas de página,
tomados por interacciones.mjs) y la captura de página completa que esa misma corrida guardó en $TMPCAP
(medios-<dir>-<vista>.png). Calcula:
  - medios: área de la unión de los rectángulos / área de la página;
  - negro: de los píxeles FUERA de esos rectángulos, la fracción con luminancia relativa <= 0,01 (criterio 4).
Uso: python3 -I cobertura.py <interacciones.json> <carpeta-de-capturas> <salida.json>
"""
import json
import sys

import numpy as np
from PIL import Image

entrada, carpeta, salida = sys.argv[1:4]
R = json.load(open(entrada))
res = {}
for k, o in R["vistas"].items():
    m = o["medios1440"]
    im = Image.open(f"{carpeta}/medios-{k}.png").convert("RGB")
    a = np.asarray(im).astype(np.float64) / 255.0
    h, w, _ = a.shape
    mask = np.zeros((h, w), bool)
    for x, y, rw, rh in m["rects"]:
        x0, y0 = max(0, x), max(0, y)
        x1, y1 = min(w, x + rw), min(h, y + rh)
        if x1 > x0 and y1 > y0:
            mask[y0:y1, x0:x1] = True
    lin = np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)
    lum = 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]
    fuera = ~mask
    negro = float((lum[fuera] <= 0.01).sum() / max(1, fuera.sum()))
    claro = float((lum[fuera] >= 0.5).sum() / max(1, fuera.sum()))
    res[k] = {"captura": f"{w}x{h}", "pagina_dom": f'{m["W"]}x{m["H"]}', "medios": round(float(mask.mean()) * 100, 1),
              "negro_fuera_de_medios": round(negro * 100, 1), "claro_fuera_de_medios": round(claro * 100, 1),
              "rects": len(m["rects"])}
    print(k, res[k])
json.dump(res, open(salida, "w"), indent=1, ensure_ascii=False)
