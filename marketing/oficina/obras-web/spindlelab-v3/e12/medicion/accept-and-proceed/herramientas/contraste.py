"""Contraste WCAG 2.x de las combinaciones medidas. El gris del sitio es #8c8c8c con alfa 0,8: se
compone sobre su fondo antes de calcular. Para el texto blanco sobre la foto (tarjeta grande de la home)
se toma el color medio de la captura dentro del rectángulo del texto. Uso: python3 -I contraste.py <json> <png>"""
import sys, json, os
from PIL import Image, ImageStat
def lum(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
def cr(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return round((la + 0.05) / (lb + 0.05), 2)
def comp(fg, a, bg): return tuple(fg[i] * a + bg[i] * (1 - a) for i in range(3))
H = lambda h: tuple(int(h[i:i+2], 16) for i in (1, 3, 5))
papel, negro, gris, g1, oscuro, pieosc, blanco = H('#f9f7f3'), H('#000000'), H('#8c8c8c'), H('#ecebe7'), H('#151515'), H('#262626'), H('#ffffff')
res = {
 'negro sobre papel (titulares, cuerpo)': cr(negro, papel),
 'gris a0,8 sobre papel (bajadas, etiquetas, enlaces del pie) = #a2a1a0': cr(comp(gris, .8, papel), papel),
 'gris a0,8 sobre gris-1 #ecebe7 (enlaces del pie)': cr(comp(gris, .8, g1), g1),
 'gris #8c8c8c sobre gris-1 (Privacy, Data Policy, 10 px)': cr(gris, g1),
 'negro sobre gris-1 (pie, botón)': cr(negro, g1),
 'papel #f9f7f3 sobre #151515 (estudio: titulares)': cr(papel, oscuro),
 'gris a0,8 sobre #151515 (estudio: bajada 35 px y cuerpo 17 px) = #767675': cr(comp(gris, .8, oscuro), oscuro),
 'blanco a0,5 sobre #151515 (firma del testimonio)': cr(comp(blanco, .5, oscuro), oscuro),
 'papel sobre #262626 (pie oscuro)': cr(papel, pieosc),
 'botón en hover: invert(1) de negro sobre gris-1 → blanco sobre #131418': cr(blanco, (19, 20, 24)),
}
J, P = sys.argv[1], sys.argv[2]
d = json.load(open(os.path.join(J, 'home-1440.json')))
im = Image.open(os.path.join(P, 'home-1440-completa.png')).convert('RGB')
for t in d['textos']:
    if t['color'].startswith('#ffffff') and 'cms-card-title' in t['sel']:
        box = im.crop((int(t['x']), int(t['y']), int(t['x'] + t['w']), int(t['y'] + t['h'])))
        # fondo: mediana de la caja (el texto es fino; domina el fondo)
        med = tuple(int(v) for v in ImageStat.Stat(box).median)
        a = 0.8 if 'a0.8' in t['color'] else 1
        res[f"blanco{' a0,8' if a < 1 else ''} sobre el póster de la tarjeta grande ({t['texto'][:30]}…), fondo medido {'#%02x%02x%02x' % med}"] = cr(comp(blanco, a, med), med)
print(json.dumps(res, ensure_ascii=False, indent=1))
