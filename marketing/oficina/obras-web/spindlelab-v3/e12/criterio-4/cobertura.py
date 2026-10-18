"""E12, criterio 4 reescrito (Mauro, 18-oct-2026). De los píxeles FUERA de img/video/canvas/picture, a 1440:
negro = luminancia relativa <= 0,01; claro = luminancia >= 0,5 (la misma cuenta que qa-paso-2/vuelta-1/herramientas/cobertura.py).
Uso: python3 -I cobertura.py crudo.json <carpeta-de-capturas> cobertura.json
"""
import json, sys
import numpy as np
from PIL import Image
R = json.load(open(sys.argv[1])); carpeta = sys.argv[2]; out = {}
Image.MAX_IMAGE_PIXELS = None
for k, o in R.items():
    a = np.asarray(Image.open(f"{carpeta}/cap-{k}.png").convert("RGB")).astype(np.float64) / 255.0
    h, w, _ = a.shape
    mask = np.zeros((h, w), bool)
    for x, y, rw, rh in o["rects"]:
        x0, y0, x1, y1 = max(0, x), max(0, y), min(w, x + rw), min(h, y + rh)
        if x1 > x0 and y1 > y0: mask[y0:y1, x0:x1] = True
    lin = np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)
    lum = 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]
    f = ~mask
    out[k] = {"pagina": f"{w}x{h}", "medios": round(float(mask.mean()) * 100, 1),
              "negro_fuera_de_medios": round(float((lum[f] <= 0.01).sum() / max(1, f.sum())) * 100, 1),
              "claro_fuera_de_medios": round(float((lum[f] >= 0.5).sum() / max(1, f.sum())) * 100, 1),
              "html": o["html"], "body": o["body"], "fondos_fuera_de_tokens": o["nFondos"], "errores": len(o["errores"])}
    print(k, out[k])
json.dump(out, open(sys.argv[3], "w"), indent=1, ensure_ascii=False)
