"""Javiera, QA de obra E12, vuelta 1. La cuenta de campos.mjs: por página, el área de los medios que son campo sobre el
área de la página (spec §3.4), con la regla de la spec (es_campo de e12/spec/herramientas/campo-medios.py, copiada) y
con la lectura por tono. Uso: python3 -I campos.py <carpeta de campos.mjs> <salida.json>"""
import colorsys, json, os, sys
from collections import Counter
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
def lum(r, g, b):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def es_campo(im):  # copiada de campo-medios.py (Lucía), sin cambios
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
def por_tono(im):
    peq = im.resize((max(1, im.width // 8), max(1, im.height // 8)))
    b = peq.tobytes(); px = [tuple(b[i:i + 3]) for i in range(0, len(b), 3)]
    k = 0
    for r, g, bb in px:
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, bb / 255)
        if (s >= 0.45 and v >= 0.35) or lum(r, g, bb) >= 0.45: k += 1
    return round(k / len(px), 3)
base, salida = sys.argv[1], sys.argv[2]
R = []
for f in sorted(os.listdir(base)):
    if not f.endswith('.json'): continue
    d = json.load(open(os.path.join(base, f)))
    im = Image.open(os.path.join(base, f[:-5] + '.png')).convert('RGB')
    area = im.width * im.height
    regla = tono = 0; filas = []
    for c in d['cajas']:
        caja = (round(c['x']), round(c['y']), round(c['x'] + c['w']), round(c['y'] + c['h']))
        rec = im.crop(caja); a = rec.width * rec.height
        t, info = es_campo(rec); pt = por_tono(rec)
        if t: regla += a
        if pt >= 0.30: tono += a
        filas.append({'src': c['src'].split('/')[-1], 'w': round(c['w']), 'h': round(c['h']), 'campo': t, **info, 'tono': pt})
    medios = sum(round(c['w']) * round(c['h']) for c in d['cajas'])
    R.append({'ruta': d['ruta'], 'campoRegla': round(100 * regla / area, 1), 'campoTono': round(100 * tono / area, 1), 'medios': round(100 * medios / area, 1), 'filas': filas})
json.dump(R, open(salida, 'w'), ensure_ascii=False, indent=1)
for r in R:
    dif = [x['src'] for x in r['filas'] if (x['tono'] >= 0.30) != bool(x['campo'])]
    print(f"{r['ruta']:52s} regla {r['campoRegla']:5.1f} %  tono {r['campoTono']:5.1f} %  medios {r['medios']:5.1f} %  {'· distintos: ' + ', '.join(dif) if dif else ''}")
