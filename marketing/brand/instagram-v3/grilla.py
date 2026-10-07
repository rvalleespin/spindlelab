# Simula la grilla del perfil: 3 columnas, cada miniatura en 3:4 (centro 1012×1350 de un 4:5;
# en un reel, el centro 1080×1440 de su portada 9:16). Deja grilla.png (modo oscuro) y
# grilla-clara.png (modo claro). El orden es el de publicación al revés: lo último, arriba.
import os
from PIL import Image
base = os.path.dirname(os.path.abspath(__file__))
ORDEN = [
    'carrusel-1-portada', 'post-campo-visibilidad', 'post-obra',
    'post-campo-desarrollo', 'post-foto', 'post-campo-continuidad',
    'post-titular', 'post-campo-alcance',
    # Sin story: una story NO aparece en la grilla del perfil, y además `story-portada` quedó
    # archivada el 7-oct (manual §10.6b). Con 8 publicaciones la última fila va incompleta, que
    # es exactamente como se ve un perfil con 8 piezas.
]
TW, TH, GAP = 358, 477, 3          # 3 × 358 + 2 × 3 = 1080: el ancho de un teléfono a 1080
def miniatura(n):
    im = Image.open(f'{base}/salida/{n}.png').convert('RGB')
    if im.height == 1920: im = im.crop((0, 240, 1080, 1680))          # portada de reel
    else: im = im.crop((34, 0, 1046, 1350))                              # 4:5 → 3:4
    return im.resize((TW, TH), Image.LANCZOS)
for nombre, fondo in (('grilla.png', (0, 0, 0)), ('grilla-clara.png', (255, 255, 255))):
    g = Image.new('RGB', (3 * TW + 2 * GAP, 3 * TH + 2 * GAP), fondo)
    for i, n in enumerate(ORDEN):
        g.paste(miniatura(n), ((i % 3) * (TW + GAP), (i // 3) * (TH + GAP)))
    g.save(f'{base}/{nombre}', optimize=True)
    print(nombre, g.size)
