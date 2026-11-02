#!/usr/bin/env python3
# Junta capturas en una hoja: hoja.py <salida.jpg> <columnas> <png...>. Cada cuadro a la mitad, con su número.
import sys
from PIL import Image, ImageDraw
salida, cols, archivos = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(a).convert('RGB') for a in archivos]
w, h = ims[0].size
esc = 0.5 if w > 500 else 0.6
cw, ch = int(w * esc), int(h * esc)
filas = (len(ims) + cols - 1) // cols
hoja = Image.new('RGB', (cols * cw + (cols + 1) * 12, filas * ch + (filas + 1) * 12), (40, 40, 40))
d = ImageDraw.Draw(hoja)
for i, im in enumerate(ims):
    x, y = 12 + (i % cols) * (cw + 12), 12 + (i // cols) * (ch + 12)
    hoja.paste(im.resize((cw, ch)), (x, y))
    d.rectangle([x, y, x + 22, y + 16], fill=(255, 232, 0))
    d.text((x + 5, y + 2), str(i + 1), fill=(0, 0, 0))
hoja.save(salida, quality=78)
