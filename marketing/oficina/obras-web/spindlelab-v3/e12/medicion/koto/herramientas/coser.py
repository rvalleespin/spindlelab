"""E12 · Koto · cose las pantallas de capturar.mjs en tramos de ≤4000 px de imagen (JPEG 80).

Uso: python3 coser.py <dir-cuadros> <dir-capturas> <id> <ancho>
Cada pantalla se pega en su posición real de scroll; donde dos se pisan, manda la de más abajo
(es la que tenía esa franja más cerca del centro de la ventana). La primera pantalla también se
guarda sola como <id>-<ancho>-primera.jpg.
"""
import json
import os
import sys

from PIL import Image

dir_cuadros, dir_capt, pid, ancho = sys.argv[1:5]
meta = json.load(open(os.path.join(dir_cuadros, f"{pid}-{ancho}-cuadros.json")))
dpr = meta["dpr"]
cuadros = meta["cuadros"]
primera = Image.open(cuadros[0]["archivo"]).convert("RGB")
primera.save(os.path.join(dir_capt, f"{pid}-{ancho}-primera.jpg"), quality=80)
w = primera.size[0]
alto_img = (cuadros[-1]["y"] * dpr) + Image.open(cuadros[-1]["archivo"]).size[1]
lienzo = Image.new("RGB", (w, alto_img))
for c in cuadros:
    im = Image.open(c["archivo"]).convert("RGB")
    lienzo.paste(im, (0, c["y"] * dpr))
tramos = []
n = 1
for y in range(0, alto_img, 4000):
    h = min(4000, alto_img - y)
    nombre = f"{pid}-{ancho}-completa-{n:02d}.jpg"
    lienzo.crop((0, y, w, y + h)).save(os.path.join(dir_capt, nombre), quality=80)
    tramos.append({"archivo": nombre, "desde_px": y, "alto_px": h, "desde_css": y // dpr})
    n += 1
json.dump({"pagina": pid, "ancho": int(ancho), "dpr": dpr, "alto_css": meta["alto"], "alto_img": alto_img,
           "pantallas": len(cuadros), "tramos": tramos}, open(os.path.join(dir_cuadros, f"{pid}-{ancho}-tramos.json"), "w"), indent=1)
print("ok", pid, ancho, len(tramos), "tramos", alto_img, "px")
