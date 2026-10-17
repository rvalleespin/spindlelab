#!/usr/bin/env python3
"""Cuenta, sobre la captura de página completa a 1440, el área de medios y la de campos claros o de color.
Un medio es campo si su color dominante (claro: L > 0,75; de color: croma > 0,12 en OKLab aproximado)
cubre al menos el 30 % del medio (la regla de medición del lock §20.1). Uso: python3 -I campos.py <campos.json> <salida.json>"""
import json, sys
from PIL import Image

def lin(c):
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def oklab(r, g, b):
    r, g, b = lin(r), lin(g), lin(b)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l, m, s = l ** (1 / 3), m ** (1 / 3), s ** (1 / 3)
    L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
    a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
    bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    return L, (a * a + bb * bb) ** 0.5

datos = json.load(open(sys.argv[1]))
res = {}
for n, d in datos.items():
    im = Image.open(d['png']).convert('RGB')
    W, H = im.size
    area_pag = W * H
    area_medios = area_campos = 0
    detalle = []
    for m in d['medios']:
        if m['clase'] == 'hoja':
            continue
        x0, y0 = max(0, int(m['x'])), max(0, int(m['y']))
        x1, y1 = min(W, int(m['x'] + m['w'])), min(H, int(m['y'] + m['h']))
        if x1 <= x0 or y1 <= y0:
            continue
        a = (x1 - x0) * (y1 - y0)
        area_medios += a
        rec = im.crop((x0, y0, x1, y1)).resize((60, max(1, round(60 * (y1 - y0) / (x1 - x0)))))
        px = list(rec.get_flattened_data()) if hasattr(rec, 'get_flattened_data') else list(rec.getdata())
        claros = sum(1 for p in px if oklab(*p)[0] > 0.75) / len(px)
        color = sum(1 for p in px if oklab(*p)[1] > 0.12) / len(px)
        campo = claros >= 0.30 or color >= 0.30
        if campo:
            area_campos += a
        detalle.append({'y': round(m['y']), 'w': round(m['w']), 'h': round(m['h']), 'claro': round(claros, 2), 'color': round(color, 2), 'campo': campo})
    hoja = sum(m['w'] * m['h'] for m in d['medios'] if m['clase'] == 'hoja')
    # Criterio 4 del encargo: fuera de imágenes y video, ¿qué parte de los píxeles es negra (luminancia ≤ 0,01)?
    mascara = Image.new('L', (W, H), 0)
    from PIL import ImageDraw
    dib = ImageDraw.Draw(mascara)
    for m in d['medios']:
        if m['clase'] != 'hoja':
            dib.rectangle([m['x'], m['y'], m['x'] + m['w'], m['y'] + m['h']], fill=255)
    chica = im.resize((W // 4, H // 4))
    mchica = mascara.resize((W // 4, H // 4))
    tot = neg = 0
    for (r, g, b), k in zip(chica.getdata(), mchica.getdata()):
        if k:
            continue
        tot += 1
        if 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) <= 0.01:
            neg += 1
    negro = round(100 * neg / tot, 1)
    res[n] = {'alto': H, 'medios_pct': round(100 * area_medios / area_pag, 1), 'campos_pct': round(100 * area_campos / area_pag, 1),
              'hoja_pct': round(100 * hoja / area_pag, 1), 'negro_fuera_de_medios_pct': negro, 'n_medios': len(detalle), 'detalle': detalle}
    print(n, 'alto', H, '· medios', res[n]['medios_pct'], '% · campos', res[n]['campos_pct'], '% · hoja', res[n]['hoja_pct'], '% · negro fuera de medios', res[n]['negro_fuera_de_medios_pct'], '%')
json.dump(res, open(sys.argv[2], 'w'), indent=1)
