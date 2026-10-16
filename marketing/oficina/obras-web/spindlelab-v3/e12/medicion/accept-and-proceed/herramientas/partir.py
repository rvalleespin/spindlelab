"""Parte las capturas completas (PNG) en tramos de <= 4000 px de alto, JPEG calidad 80.
Uso: python3 -I partir.py <carpeta-png> <carpeta-capturas>
Nombra cada tramo <pagina>-<ancho>-completa-<n>de<N>.jpg y copia la primera pantalla como
<pagina>-<ancho>-pantalla1.jpg. A 390 la captura es a dpr 2 (780 px de ancho real)."""
import sys, os, math, glob
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
MAX = 4000
for f in sorted(glob.glob(os.path.join(src, '*-completa.png'))):
    im = Image.open(f).convert('RGB')
    w, h = im.size
    n = math.ceil(h / MAX)
    base = os.path.basename(f).replace('.png', '')
    for i in range(n):
        y0 = i * MAX
        y1 = min(h, y0 + MAX)
        im.crop((0, y0, w, y1)).save(os.path.join(dst, f'{base}-{i+1}de{n}.jpg'), 'JPEG', quality=80, optimize=True)
    print(base, w, h, n, 'tramos')
for f in sorted(glob.glob(os.path.join(src, '*-pantalla1.png'))):
    Image.open(f).convert('RGB').save(os.path.join(dst, os.path.basename(f).replace('.png', '.jpg')), 'JPEG', quality=80, optimize=True)
