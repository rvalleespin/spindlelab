"""E12 · spec sobre A · regla 2 de campo: qué ventanas de tono, valor y claro. Lucía, 23-oct-2026.

Prueba combinaciones de ventana sobre los medios de Koto (los recortes de `koto-campos-regla2.py`, 22 páginas a 1440) y
sobre los de las 27 rutas de A (la carpeta de `e12/qa-obra/vuelta-1/herramientas/campos.mjs`), y por cada una da el
área de campo de cada página con la regla «cubeta (regla 1) o familia ≥ 30 %». Lo que se le pide a la ventana elegida
(spec §3.4, fila del 23-oct del §7): la franja de Auditoría es campo; la foto de Combeau con su banda de luz verde
no; Koto contado con ella sigue diciendo lo del lock §20.1 (interiores casi sin campo; el índice, más que la home).

Uso: python3 -I campo-regla2-ventanas.py <dir-recortes de Koto> <koto-campos-regla2.json> <carpeta de campos.mjs> <salida.json>
"""
import colorsys
import importlib.util
import json
import os
import statistics
import sys
from collections import Counter, defaultdict

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
_e = importlib.util.spec_from_file_location("campo_medios", os.path.join(os.path.dirname(os.path.abspath(__file__)), "campo-medios.py"))
CM = importlib.util.module_from_spec(_e)
_e.loader.exec_module(CM)

dir_koto, json_koto, dir_a, salida = sys.argv[1:5]
CASOS = ["amazon", "call-of-duty", "de-extinction", "deezer", "gofundme", "instagram", "lyft", "machinex", "norton",
         "rakbank", "stack-overflow", "washington-post", "whatsapp"]
INTERIORES_KOTO = ["servicios", "estudio", "carreras", "contacto", "privacidad"]


def claros(px):
    cl = Counter()
    for r, g, b in px:
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if not (s >= 0.45 and v >= 0.35):
            L = CM.lum(r, g, b)
            if L >= 0.45:
                cl[min(54, int((L - 0.45) / 0.01))] += 1
    return cl


def familia_clara(cl, n, ancho):
    if not ancho:
        return 0
    w = round(ancho / 0.01)
    return max(sum(cl[l0 + j] for j in range(w) if l0 + j < 55) for l0 in range(55)) / n


# cada medio una vez: su histograma de color, sus claros y su cubeta
medios = []
ko = json.load(open(json_koto))["paginas"]
for pag in sorted(os.listdir(dir_koto)):
    area_pag = 1440 * ko[f"{pag}-1440"]["altoPx"]
    for f in sorted(os.listdir(os.path.join(dir_koto, pag))):
        y, x, w, h, tipo = f[:-4].split("-", 4)
        px = CM.pixeles(Image.open(os.path.join(dir_koto, pag, f)).convert("RGB"))
        medios.append(("koto", pag, int(w) * int(h), area_pag, CM.histograma(px), claros(px), len(px),
                       tipo in ("campo_claro", "campo_de_color"), f))
for f in sorted(os.listdir(dir_a)):
    if not f.endswith(".json"):
        continue
    d = json.load(open(os.path.join(dir_a, f)))
    im = Image.open(os.path.join(dir_a, f[:-5] + ".png")).convert("RGB")
    for c in d["cajas"]:
        rec = im.crop((round(c["x"]), round(c["y"]), round(c["x"] + c["w"]), round(c["y"] + c["h"])))
        px = CM.pixeles(rec)
        medios.append(("A", d["ruta"], rec.width * rec.height, im.width * im.height, CM.histograma(px), claros(px), len(px),
                       bool(CM.es_campo_cubeta(px)[0]), c["src"].split("/")[-1]))

R = []
for tono, valor, claro in [(0, 0, 0), (60, .30, .30), (60, .30, 0), (60, .30, .10), (60, .20, .10), (90, .30, 0),
                           (60, .45, 0), (60, .20, 0), (40, .30, 0), (40, .20, 0), (30, .30, 0)]:
    area, base, detalle = defaultdict(float), {}, {}
    for g, p, a, A, hv, cl, n, cub, src in medios:
        fc = CM.familia_de_color(hv, n, tono, valor)[0] if tono else 0
        fl = familia_clara(cl, n, claro)
        campo = cub or max(fc, fl) >= CM.UMBRAL
        area[(g, p)] += a * campo
        base[(g, p)] = A
        if src in ("verifica-y-cumple-239.webp", "combeau-fotografia-169.webp") and g == "A" and "servicios" in p:
            detalle[src] = {"familiaDeColor": round(fc, 3), "campo": campo}
    pct = {k: round(100 * v / base[k], 1) for k, v in area.items()}
    kc = [pct.get(("koto", c), 0.0) for c in CASOS]
    fila = {"ventana": "regla 1 sola" if not tono else f"tono {tono}° × valor {valor}" + (f" + claro {claro}" if claro else ", claros con la cubeta"),
            "koto": {"casos": {"min": min(kc), "max": max(kc), "mediana": statistics.median(kc)},
                     "home": pct.get(("koto", "home"), 0.0), "work": pct.get(("koto", "trabajo"), 0.0),
                     "interiores": {i: pct.get(("koto", i), 0.0) for i in INTERIORES_KOTO}, "noticias": pct.get(("koto", "noticias"), 0.0)},
            "A": {k[1]: v for k, v in sorted(pct.items()) if k[0] == "A" and v}, "franjas": detalle}
    R.append(fila)
    a = fila["A"]
    print(f"{fila['ventana']:42s} Koto casos {min(kc):4.1f}–{max(kc):4.1f} (med {statistics.median(kc):4.1f}) home {fila['koto']['home']:4.1f} "
          f"work {fila['koto']['work']:4.1f} interiores ≤ {max(fila['koto']['interiores'].values()):4.1f} · A home {a.get('/v3/', 0):4.1f} "
          f"trabajo {a.get('/v3/trabajo/', 0):4.1f} tonela {a.get('/v3/trabajo/tonela/', 0):4.1f} DW {a.get('/v3/servicios/desarrollo-web/', 0):4.1f} "
          f"auditoría {a.get('/v3/servicios/auditoria-seo-tecnica/', 0):4.1f}")
json.dump({"fecha": "2026-10-23", "elegida": "tono 40° × valor 0.3, claros con la cubeta", "pruebas": R}, open(salida, "w"),
          ensure_ascii=False, indent=1)
