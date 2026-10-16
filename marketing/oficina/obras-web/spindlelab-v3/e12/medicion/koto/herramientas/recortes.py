"""E12 · Koto · recortes de tipografía, sacados de las pantallas cosidas (PNG) con las cajas medidas.

Uso: python3 -I recortes.py <dir-cuadros> <dir-crudo> <dir-capturas>
Cada recorte es la unión de las cajas de los textos nombrados (de medir.mjs), con aire alrededor.
"""
import json
import os
import sys

from PIL import Image

dir_cuadros, dir_crudo, dir_capt = sys.argv[1:4]


def lienzo(pid, ancho):
    meta = json.load(open(os.path.join(dir_cuadros, f"{pid}-{ancho}-cuadros.json")))
    dpr = meta["dpr"]
    cs = meta["cuadros"]
    w = Image.open(cs[0]["archivo"]).size[0]
    alto = cs[-1]["y"] * dpr + Image.open(cs[-1]["archivo"]).size[1]
    lz = Image.new("RGB", (w, alto))
    for c in cs:
        lz.paste(Image.open(c["archivo"]).convert("RGB"), (0, c["y"] * dpr))
    return lz, dpr


def cajas(pid, ancho, textos, rango=None, solo_primera=True):
    m = json.load(open(os.path.join(dir_crudo, f"{pid}-{ancho}.json")))
    out = []
    for buscado in textos:
        for t in m["textos"]:
            if rango and not (rango[0] <= t["y"] <= rango[1]):
                continue
            if t["texto"].startswith(buscado) and t["w"] > 2 and 0 <= t["x"] < m["anchoDoc"]:
                out.append((t["x"], t["y"], t["x"] + t["w"], t["y"] + t["h"]))
                if solo_primera:
                    break
    return out


PEDIDOS = [
    ("tipo-display-portada-1440", "home", "1440", ["We’re Koto", "The Creative Company"], 28),
    ("tipo-titulo-con-bajada-1440", "trabajo", "1440", ["Our work", "Ambitious ideas for ambitious"], 20),
    ("tipo-seccion-de-caso-1440", "caso", "1440", ["The Impossible Brief", "Unraveling a unique paradox", "Instagram’s wordmark is encountered", "Redesigning one of the world"], 24, (1700, 2100)),
    ("tipo-ficha-lateral-caso-1440", "caso", "1440", ["Instagram", "A new mark with old memories", "Social Media", "2026", "Challenge", "Solution"], 20),
    ("tipo-cita-de-caso-1440", "caso", "1440", ["The craft was a given", "Cynthia Pratomo", "Director of Brand Design"], 28),
    ("tipo-display-portada-390", "home", "390", ["We’re Koto", "The Creative Company"], 16),
    ("tipo-seccion-de-caso-390", "caso", "390", ["The Impossible Brief", "Unraveling a unique paradox", "Instagram’s wordmark is encountered"], 16, (1380, 1700)),
]
# El párrafo de presentación de la home sube con el scroll (translateY de ~675 px a 0, «scrub»): su
# caja medida arriba no es donde queda. Se recorta de la pantalla 2 (scroll 900), donde ya asentó.
POR_PANTALLA = [
    ("tipo-declaracion-1440", "home", "1440", 1, (0, 220, 720, 440)),
]
cache = {}
hechos = []
for nombre, pid, ancho, n, caja in POR_PANTALLA:
    meta = json.load(open(os.path.join(dir_cuadros, f"{pid}-{ancho}-cuadros.json")))
    c = meta["cuadros"][n]
    dpr = meta["dpr"]
    im = Image.open(c["archivo"]).convert("RGB").crop(tuple(v * dpr for v in caja))
    im.save(os.path.join(dir_capt, f"detalle-{nombre}.jpg"), quality=85)
    hechos.append({"archivo": f"detalle-{nombre}.jpg", "pagina": pid, "ancho": int(ancho), "pantalla": n, "scrollY": c["y"], "caja_css_en_pantalla": list(caja)})
    print("ok", nombre, im.size)
for pedido in PEDIDOS:
    nombre, pid, ancho, textos, aire = pedido[:5]
    rango = pedido[5] if len(pedido) > 5 else None
    try:
        if (pid, ancho) not in cache:
            cache[(pid, ancho)] = lienzo(pid, ancho)
        lz, dpr = cache[(pid, ancho)]
        cs = cajas(pid, ancho, textos, rango)
    except FileNotFoundError as e:
        print("falta", e)
        continue
    if not cs:
        print("sin cajas", nombre)
        continue
    x0 = max(0, min(c[0] for c in cs) - aire)
    y0 = max(0, min(c[1] for c in cs) - aire)
    x1 = min(lz.size[0] // dpr, max(c[2] for c in cs) + aire)
    y1 = max(c[3] for c in cs) + aire
    rec = lz.crop((x0 * dpr, y0 * dpr, x1 * dpr, y1 * dpr))
    rec.save(os.path.join(dir_capt, f"detalle-{nombre}.jpg"), quality=85)
    hechos.append({"archivo": f"detalle-{nombre}.jpg", "pagina": pid, "ancho": int(ancho), "caja_css": [x0, y0, x1, y1], "textos": textos})
    print("ok", nombre, rec.size)
json.dump(hechos, open(os.path.join(dir_crudo, "recortes.json"), "w"), ensure_ascii=False, indent=1)
