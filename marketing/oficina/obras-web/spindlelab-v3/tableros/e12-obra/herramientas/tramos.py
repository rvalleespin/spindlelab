"""E12 · Tablero de la obra construida: la página completa de cada ruta, a 1440 y a 390, en tramos. Lucía, 23-oct-2026.

Las primeras pantallas del tablero son las de cierre de Mauro (`capturas/e12/primera/`), tal cual. Sus páginas enteras
no sirven para esto: a 1440 están reducidas a la mitad (720 px, JPEG 62), y a 390 la de Sesenta tiene una imagen sin
cargar (una placa vacía de 390 × 224 a los 4.480 px; las demás coinciden con las mías salvo en los cuadros de los
videos). Las páginas enteras se tomaron de nuevo sobre el build del 23-oct con `capturar-completa.mjs` (el método de
Mauro, más la espera a que cada imagen esté cargada; 0 sin cargar en las 54), y este script las parte en tramos iguales:

- a 1440: tramos de 2.700 px como mucho (tres pantallas de 900), JPEG 74, 1440 px de ancho;
- a 390: tramos de 4.220 px como mucho (cinco pantallas de 844), JPEG 78, 390 px de ancho;

para que ninguna imagen pase de ~4 megapíxeles. Escribe `img/<ruta>-<ancho>-<k>de<n>.jpg` y `datos/tramos.json` (de qué
captura sale cada tramo, sus px de inicio y fin, el alto de la página, y lo que anotó la captura), y copia el
`capturas.json` de cada corrida a `datos/capturas-<ancho>.json`.

Uso: python3 -I tramos.py <crudas-1440> <crudas-390>
"""
import json
import math
import shutil
import sys
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
BASE = Path(__file__).resolve().parent.parent
CORTE = {1440: (2700, 74), 390: (4220, 78)}
nombre = lambda r: 'home' if r == '/v3/' else r.removeprefix('/v3/').rstrip('/').replace('/', '_')
(BASE / 'img').mkdir(exist_ok=True)
(BASE / 'datos').mkdir(exist_ok=True)

salida = {}
for crudas in map(Path, sys.argv[1:3]):
    datos = json.loads((crudas / 'capturas.json').read_text())
    assert not datos['servidor404'], datos['servidor404']
    ancho = datos['R'][0]['ancho']
    tope, calidad = CORTE[ancho]
    shutil.copyfile(crudas / 'capturas.json', BASE / 'datos' / f'capturas-{ancho}.json')
    for viejo in (BASE / 'img').glob(f'*-{ancho}-*de*.jpg'):
        viejo.unlink()
    paginas = []
    for r in datos['R']:
        assert r['ancho'] == ancho and not r.get('error') and not r['aviso'] and not r['consola'] and not r['fallidos'] and r['sinCargar'] == [], r
        n = nombre(r['ruta'])
        im = Image.open(crudas / 'completa' / f'{n}-{ancho}.png').convert('RGB')
        assert im.width == ancho and im.height == r['alto'], (n, im.size, r['alto'])
        k = math.ceil(im.height / tope)
        alto = math.ceil(im.height / k / 2) * 2
        tramos = []
        for i in range(k):
            y0, y1 = i * alto, min((i + 1) * alto, im.height)
            f = BASE / 'img' / f'{n}-{ancho}-{i + 1}de{k}.jpg'
            im.crop((0, y0, ancho, y1)).save(f, 'JPEG', quality=calidad, optimize=True, progressive=True)
            tramos.append({'img': f'img/{f.name}', 'desde': y0, 'hasta': y1, 'bytes': f.stat().st_size})
        paginas.append({'ruta': r['ruta'], 'alto': im.height, 'tramos': tramos})
    salida[str(ancho)] = {'cuando': datos['cuando'], 'ventana': f"{ancho} × {900 if ancho == 1440 else 844}, dpr 1",
                          'tope': tope, 'calidad': calidad, 'paginas': paginas}
    print(ancho, len(paginas), 'páginas,', sum(len(p['tramos']) for p in paginas), 'tramos,',
          round(sum(t['bytes'] for p in paginas for t in p['tramos']) / 1e6, 2), 'MB; el mayor',
          max(t['bytes'] for p in paginas for t in p['tramos']))

assert sorted(salida) == ['1440', '390'], sorted(salida)
salida['herramienta'] = 'herramientas/capturar-completa.mjs (el método de e12/cierre/herramientas/capturas.mjs, más la espera de las imágenes)'
with open(BASE / 'datos' / 'tramos.json', 'w', encoding='utf-8') as f:
    json.dump(salida, f, ensure_ascii=False, indent=1)
    f.write('\n')
