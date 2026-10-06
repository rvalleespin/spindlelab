# Reduce las piezas de 2x a 1200x630. JPEG con croma completo (subsampling=0): con el 4:2:0
# por defecto, el punto dorado del wordmark (5 px) salía apagado, #8D834E en vez de #C9A227.
import sys
from PIL import Image
for n in sys.argv[1:]:
    Image.open(f'{n}@2x.png').convert('RGB').resize((1200, 630), Image.LANCZOS).save(
        f'{n}.jpg', 'JPEG', quality=90, subsampling=0, optimize=True, progressive=True)
    print(n, 'ok')
