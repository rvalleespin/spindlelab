"""Arma una tira de cuadros (secuencia en el tiempo) en una sola imagen JPEG calidad 80, cada cuadro
reducido a 480 px de ancho con su rótulo de tiempo. Uso: python3 -I tira.py <salida.jpg> <png:rótulo> ..."""
import sys
from PIL import Image, ImageDraw
out = sys.argv[1]
items = []
for a in sys.argv[2:]:
    f, _, rot = a.partition(':')
    try:
        im = Image.open(f).convert('RGB')
    except Exception:
        continue
    s = 480 / im.size[0]
    items.append((im.resize((480, int(im.size[1] * s))), rot))
if not items: sys.exit(0)
cols = 3
rows = (len(items) + cols - 1) // cols
h = max(i.size[1] for i, _ in items) + 26
W = cols * 480 + (cols + 1) * 10
c = Image.new('RGB', (W, rows * h + (rows + 1) * 10), (40, 40, 40))
d = ImageDraw.Draw(c)
for n, (im, rot) in enumerate(items):
    x = 10 + (n % cols) * 490; y = 10 + (n // cols) * (h + 10)
    c.paste(im, (x, y + 26))
    d.text((x + 4, y + 6), rot, fill=(255, 255, 255))
c.save(out, 'JPEG', quality=80)
