"""Javiera, QA de obra E12, vuelta 1. La cuenta de portada-contraste.mjs: por cada tamaño y cada línea de texto de la
portada, el píxel más claro bajo su caja en cada uno de los 121 cuadros (con el velo pintado por el navegador y el texto
transparente), y el contraste WCAG 2.1 del color del texto contra ese píxel. Reporta la peor línea por tamaño, en qué
cuadro, y cuántas quedan bajo 4,5 (texto normal) o 3 (grande: ≥ 24 px, o ≥ 18,66 px en negrita, que aquí no hay).
Uso: python3 -I portada-contraste.py <carpeta de salida de portada-contraste.mjs> <salida.json>
"""
import json, os, re, sys
import numpy as np
from PIL import Image

base, salida = sys.argv[1], sys.argv[2]
meta = json.load(open(os.path.join(base, 'lineas.json')))

def lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def lum_rgb(rgb):
    r, g, b = [lin(np.asarray(v, dtype=np.float64)) for v in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

res = {}
for tam, d in meta.items():
    dir_ = os.path.join(base, tam)
    cuadros = sorted(f for f in os.listdir(dir_) if f.endswith('.png'))
    y0 = d['sec']['y']
    lineas = d['out']
    peor = [{'L': -1, 'cuadro': None} for _ in lineas]
    for f in cuadros:
        im = np.asarray(Image.open(os.path.join(dir_, f)).convert('RGB')).astype(np.float64)
        L = lum_rgb((im[..., 0], im[..., 1], im[..., 2]))
        H, W = L.shape
        for i, ln in enumerate(lineas):
            x1, x2 = max(0, int(np.floor(ln['x']))), min(W, int(np.ceil(ln['x'] + ln['w'])))
            ya, yb = max(0, int(np.floor(ln['y'] - y0))), min(H, int(np.ceil(ln['y'] - y0 + ln['h'])))
            if x2 <= x1 or yb <= ya:
                continue
            m = float(L[ya:yb, x1:x2].max())
            if m > peor[i]['L']:
                peor[i] = {'L': m, 'cuadro': f}
    filas = []
    for ln, p in zip(lineas, peor):
        rgb = [int(v) for v in re.findall(r'\d+', ln['color'])[:3]]
        lt = float(lum_rgb(rgb))
        cr = (lt + 0.05) / (p['L'] + 0.05) if p['L'] >= 0 else None
        minimo = 3.0 if ln['size'] >= 24 else 4.5
        filas.append({'txt': ln['txt'], 'color': ln['color'], 'size': ln['size'], 'contraste': round(cr, 2) if cr else None,
                      'minimo': minimo, 'cuadro': p['cuadro'], 'y': round(ln['y'])})
    medidas = [x for x in filas if x['contraste'] is not None]
    w = min(medidas, key=lambda x: x['contraste'] / x['minimo'])
    res[tam] = {'lineas': len(medidas), 'bajoMinimo': [x for x in medidas if x['contraste'] < x['minimo']],
                'peor': w, 'botonAlBorde': d['botonAlBorde'], 'filas': filas}
    print(f"{tam}: {len(medidas)} líneas · bajo el mínimo {len(res[tam]['bajoMinimo'])} · peor {w['contraste']}:1 "
          f"({w['txt']!r}, {w['color']}, {w['size']} px, {w['cuadro']}) · botón a {d['botonAlBorde']} px del borde")
json.dump(res, open(salida, 'w'), ensure_ascii=False, indent=1)
