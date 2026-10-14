# medir.py — ayudante de generar.mjs (E9, 14-oct-2026). Solo PIL, sin numpy (corre igual en la Mac).
#
#   python3 -I medir.py jpg <png> <jpg> [ancho_max=1600]   PNG 2x -> JPEG con croma completo
#   python3 -I medir.py oro <imagen>                        fracción de píxeles «oro» (manual §07b)
#   python3 -I medir.py borde <png>                         color medio de la fila superior (barra del teléfono)
#
# JPEG con subsampling=0 (4:4:4), igual que marketing/brand/og-v3/reducir.py: con el 4:2:0 por
# defecto un detalle chico de color sale apagado.
# Oro: el criterio del relevamiento del 7-oct (manual §07b), el mismo `mascara_tono` de
# marketing/brand/instagram-v3/medir.py: tono 38–54°, saturación ≥ 0,5, brillo ≥ 0,5.
# Menos de 0,05 % de la imagen es «limpio».
import sys, json
from PIL import Image, ImageChops


def mascara_tono(img):
    h, sat, v = img.convert('HSV').split()
    hm = h.point(lambda x: 255 if 27 <= x <= 38 else 0)        # 38–54° en la escala 0–255 de PIL
    sm = sat.point(lambda x: 255 if x >= 128 else 0)
    vm = v.point(lambda x: 255 if x >= 128 else 0)
    return ImageChops.multiply(ImageChops.multiply(hm, sm), vm)


def oro(ruta):
    im = Image.open(ruta).convert('RGB')
    m = mascara_tono(im)
    n = m.histogram()[255]
    total = im.size[0] * im.size[1]
    caja = m.getbbox()
    return {'pixeles': n, 'total': total, 'pct': round(100 * n / total, 4),
            'limpio': (100 * n / total) < 0.05, 'caja': list(caja) if caja else None}


def jpg(png, salida, ancho_max=1600):
    im = Image.open(png).convert('RGB')
    w, h = im.size
    if w > ancho_max:
        im = im.resize((ancho_max, round(h * ancho_max / w)), Image.LANCZOS)
    im.save(salida, 'JPEG', quality=88, subsampling=0, optimize=True, progressive=True)
    return {'ancho': im.size[0], 'alto': im.size[1]}


def borde(png):
    im = Image.open(png).convert('RGB')
    w, _ = im.size
    fila = im.crop((0, 0, w, 2)).resize((1, 1), Image.BOX).getpixel((0, 0))
    lum = sum(c * k for c, k in zip(fila, (0.2126, 0.7152, 0.0722))) / 255
    return {'barra': '#%02x%02x%02x' % fila, 'tinta': '#000000' if lum > 0.55 else '#ffffff'}


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'jpg':
        r = jpg(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 1600)
    elif cmd == 'oro':
        r = oro(sys.argv[2])
    elif cmd == 'borde':
        r = borde(sys.argv[2])
    else:
        raise SystemExit('comando desconocido: ' + cmd)
    print(json.dumps(r))
