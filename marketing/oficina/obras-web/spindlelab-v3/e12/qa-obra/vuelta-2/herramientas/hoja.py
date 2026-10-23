# Javiera, QA de obra E12, vuelta 2. Hoja de contacto: varias capturas en una fila o grilla, cada una escalada al mismo
# alto, con su nombre debajo. Uso: python3 hoja.py <salida.jpg> <alto> <columnas> <img1> <img2> ...
import sys
from PIL import Image, ImageDraw
sal, alto, cols, imgs = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4:]
ims = []
for f in imgs:
    im = Image.open(f).convert('RGB'); w = round(im.width * alto / im.height); ims.append((f.split('/')[-1], im.resize((w, alto))))
filas = [ims[i:i + cols] for i in range(0, len(ims), cols)]
W = max(sum(i.width for _, i in f) + 12 * (len(f) + 1) for f in filas); H = len(filas) * (alto + 34) + 12
hoja = Image.new('RGB', (W, H), (40, 40, 40)); d = ImageDraw.Draw(hoja)
y = 12
for f in filas:
    x = 12
    for n, im in f:
        hoja.paste(im, (x, y)); d.text((x, y + alto + 6), n, fill=(230, 230, 230)); x += im.width + 12
    y += alto + 34
hoja.save(sal, quality=72)
print(sal, hoja.size)
