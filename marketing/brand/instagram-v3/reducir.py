# Reduce las láminas de 2x a 1080 de ancho. Deja dos archivos por lámina en salida/:
#  · <lámina>.png  — sin pérdida, para revisar y para subir si se prefiere PNG.
#  · <lámina>.jpg  — para subir: JPEG q90 con croma COMPLETO (subsampling=0). Con el 4:2:0 por
#    defecto el punto dorado del wordmark salía apagado (#8D834E en vez de #C9A227; OG v3).
# Sin argumentos reduce todo lo que haya en salida/_2x/.
import sys, os, glob
from PIL import Image
base = os.path.dirname(os.path.abspath(__file__))
nombres = sys.argv[1:] or [os.path.basename(f)[:-7] for f in sorted(glob.glob(f'{base}/salida/_2x/*@2x.png'))]
for n in nombres:
    im = Image.open(f'{base}/salida/_2x/{n}@2x.png').convert('RGB')
    im = im.resize((1080, round(im.height * 1080 / im.width)), Image.LANCZOS)
    im.save(f'{base}/salida/{n}.png', optimize=True)
    im.save(f'{base}/salida/{n}.jpg', 'JPEG', quality=90, subsampling=0, optimize=True, progressive=True)
    print(n, f'{im.width}×{im.height}', 'ok')
