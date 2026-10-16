"""Área de cada color de la interfaz en las capturas completas: cada píxel se asigna al color de la
paleta medida más cercano si está a menos de 10 unidades (distancia euclídea RGB); el resto es
«imagen, video o borde de letra». También mide cuánto de ese resto es color saturado (S > 0,25 en HSV),
para saber si la interfaz tiene algún acento propio o si todo el color viene de las imágenes.
Uso: python3 -I area-color.py <carpeta-png> > salida.json"""
import sys, glob, os, json
from PIL import Image
import colorsys
PALETA = {
    'papel #f9f7f3': (249, 247, 243), 'negro #000000': (0, 0, 0), 'gris-1 #ecebe7 (pie)': (236, 235, 231),
    'blanco #ffffff': (255, 255, 255), 'gris de texto #8c8c8c a0,8 sobre papel = #a2a1a0': (162, 161, 160),
    'tarjeta de tema oscuro #151515': (21, 21, 21), 'pie oscuro #262626': (38, 38, 38),
    'gris claro #e4e4e4': (228, 228, 228), 'gris ultraclaro #f0f0f0': (240, 240, 240),
}
res = {}
for f in sorted(glob.glob(os.path.join(sys.argv[1], '*-completa.png'))):
    im = Image.open(f).convert('RGB')
    w, h = im.size
    # muestreo: 1 de cada 4 píxeles en cada eje (suficiente para áreas en %)
    im = im.resize((w // 4, h // 4), Image.NEAREST)
    px = list(im.getdata())
    n = len(px)
    cuenta = {k: 0 for k in PALETA}; resto = 0; saturado = 0
    for p in px:
        best, bd = None, 1e9
        for k, c in PALETA.items():
            d = (p[0]-c[0])**2 + (p[1]-c[1])**2 + (p[2]-c[2])**2
            if d < bd: bd, best = d, k
        if bd <= 100: cuenta[best] += 1
        else:
            resto += 1
            hh, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in p))
            if s > 0.25 and v > 0.15: saturado += 1
    clave = os.path.basename(f).replace('-completa.png', '')
    res[clave] = {k: round(v / n * 100, 1) for k, v in cuenta.items() if v / n > 0.0005}
    res[clave]['imagen, video o borde de letra'] = round(resto / n * 100, 1)
    res[clave]['de eso, color saturado (S>0,25)'] = round(saturado / n * 100, 1)
print(json.dumps(res, ensure_ascii=False, indent=1))
