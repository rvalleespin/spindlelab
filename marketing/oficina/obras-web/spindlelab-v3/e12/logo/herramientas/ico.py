"""E12 · logo final · arma favicon.ico con los PNG de 16 (a mano), 32 y 48 (de favicon.svg). Uso: python3 -I ico.py <dir-final>"""
import os
import sys
from PIL import Image

F = sys.argv[1]
ims = [Image.open(os.path.join(F, f"favicon-{n}.png")).convert("RGBA") for n in (16, 32, 48)]
ims[2].save(os.path.join(F, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ims[:2])
chk = Image.open(os.path.join(F, "favicon.ico"))
print("favicon.ico:", sorted(chk.info.get("sizes", [])), os.path.getsize(os.path.join(F, "favicon.ico")), "bytes")
# que el 16 dentro del .ico sea el dibujado a mano, no un 48 achicado
chk.size = (16, 16)
a = chk.convert("RGBA").tobytes()
b = ims[0].tobytes()
print("el 16 del .ico es el de favicon-16.png:", a == b)
