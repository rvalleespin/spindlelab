"""Recortes de detalle desde las capturas completas, ubicados con los rectángulos medidos (JSON):
- indice-patron-1440.jpg: las tres primeras filas del índice /work (el patrón se repite cada tres filas).
- tipografia-escala-1440.jpg: un nodo real por cada tamaño de la escala, recortado de la página, con su rótulo.
- tipografia-titulo-trabajo-1440.jpg / -caso-1440.jpg: el bloque título + bajada.
Uso: python3 -I recortes.py <carpeta-json> <carpeta-png> <carpeta-capturas>"""
import sys, json, os
from PIL import Image, ImageDraw
J, P, C = sys.argv[1:4]
def load(k): return json.load(open(os.path.join(J, k + '.json'))), Image.open(os.path.join(P, k + '-completa.png')).convert('RGB')
d, im = load('trabajo-1440')
im.crop((0, 400, 1440, 2200)).save(os.path.join(C, 'indice-patron-1440.jpg'), 'JPEG', quality=80)
h1 = next(t for t in d['textos'] if t['tag'] == 'h1')
im.crop((int(h1['x']) - 24, int(h1['y']) - 24, 1440, int(h1['y']) + 160)).save(os.path.join(C, 'tipografia-titulo-trabajo-1440.jpg'), 'JPEG', quality=80)
dc, imc = load('caso-1440')
h1c = next(t for t in dc['textos'] if t['tag'] == 'h1')
imc.crop((int(h1c['x']) - 24, int(h1c['y']) - 24, 1440, int(h1c['y']) + 280)).save(os.path.join(C, 'tipografia-titulo-caso-1440.jpg'), 'JPEG', quality=80)
# Escala: un ejemplo por tamaño (de las cuatro páginas a 1440)
fuentes = {}
for k in ['home-1440', 'trabajo-1440', 'caso-1440']:
    dd, ii = load(k)
    for t in dd['textos']:
        if t['opacidad'] < 1 or t['w'] < 20 or 'Letterform' in t['familia'] or 'custom-cursor' in t['sel']: continue
        key = (t['tam'], t['color'])
        if key not in fuentes and t['y'] > 60:
            fuentes[key] = (t, ii)
items = sorted(fuentes.items(), key=lambda kv: -float(kv[0][0][:-2]))
crops = []
for (tam, col), (t, ii) in items:
    w = min(int(t['w']) + 12, 900)
    cr = ii.crop((int(t['x']) - 6, int(t['y']) - 6, int(t['x']) - 6 + w, int(t['y']) + int(t['h']) + 6))
    rot = f"{t['familia'].split(',')[0].strip(chr(34))} · {tam} / {t['interlinea']} · {t['peso']} · tracking {t['tracking']} · {col} · {t['sel'].split(' > ')[-1][:40]}"
    crops.append((cr, rot))
W = max(max(c.size[0] for c, _ in crops), 700) + 20
H = sum(c.size[1] + 34 for c, _ in crops) + 20
out = Image.new('RGB', (W, H), (249, 247, 243))
dr = ImageDraw.Draw(out)
y = 10
for c, rot in crops:
    dr.text((10, y), rot, fill=(200, 0, 120))
    out.paste(c, (10, y + 16)); y += c.size[1] + 34
out.save(os.path.join(C, 'tipografia-escala-1440.jpg'), 'JPEG', quality=85)
print(len(crops), 'tamaños')
# (añadido) Lista de Endless Vital Activity en la home: el único lugar con filetes negros de 1 px.
d, im = load('home-1440')
sec = next(s for s in d['secciones'] if 'home-s4' in s['sel'])
im.crop((0, int(sec['y']), 1440, int(sec['y'] + sec['h']))).save(os.path.join(C, 'lista-eva-filetes-1440.jpg'), 'JPEG', quality=80)
# (añadido) El pie a 1440 (claro, desde /work) y a 1440 en tema oscuro (About), y el reloj del pie ampliado.
for k, nombre in (('trabajo-1440', 'pie-1440.jpg'), ('estudio-1440', 'pie-oscuro-1440.jpg')):
    d, im = load(k)
    pie = next(s for s in d['secciones'] if s['sel'].startswith('footer'))
    im.crop((0, int(pie['y']), 1440, min(im.size[1], int(pie['y'] + pie['h'])))).save(os.path.join(C, nombre), 'JPEG', quality=80)
d, im = load('trabajo-1440')
reloj = [t for t in d['textos'] if 'header-and-footer-clock-text' in t['sel']]
x0, y0 = min(t['x'] for t in reloj), min(t['y'] for t in reloj)
x1, y1 = max(t['x'] + t['w'] for t in reloj), max(t['y'] + t['h'] for t in reloj)
cr = im.crop((int(x0) - 16, int(y0) - 16, int(x1) + 16, int(y1) + 16))
cr.resize((cr.size[0] * 3, cr.size[1] * 3), Image.NEAREST).save(os.path.join(C, 'pie-reloj-x3-1440.jpg'), 'JPEG', quality=85)
