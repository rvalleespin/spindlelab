"""La cinta de la home, tramo por tramo, con la regla de campo del lock §20.1 (la de proto/a/herramientas/campos.py).
Diego, 19-oct-2026 (tanda 2). La spec §3.4 cuenta la home «con la cinta en su tramo más claro»: este script saca el
cuadro del medio de cada tramo de cinta.webm (1, 3, 5… 15 s), lo pasa por es_campo() y suma, al área de campos que dio
campos.py para la home (con la cinta en su póster, el tramo 1), la del tramo que más área de campo agregue.
Uso: python3 -I campos-cinta.py <carpeta de campos-tanda-2.mjs> <campos.json de campos.py> <cinta.webm> <salida.json>
"""
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image

carpeta, campos_json, video, salida = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3], Path(sys.argv[4])
proto = Path(__file__).resolve().parents[3] / 'tableros/e12-direcciones/proto/a/herramientas/campos.py'
fuente = proto.read_text()
ns = {}
exec(fuente[:fuente.index('res = {}')].replace('carpeta, salida = Path(sys.argv[1]), Path(sys.argv[2])', ''), ns)
es_campo = ns['es_campo']

datos = json.loads((carpeta / 'a-home-1440-completa.json').read_text())
x, y, w, h = datos['cinta'][0]
home = json.loads(campos_json.read_text())['home']
W, H = home['pagina_px']
area_pagina = W * H
tramos = []
for k in range(8):
    t = 2 * k + 1
    crudo = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(t), '-i', video, '-frames:v', '1', '-vf', f'scale={w}:{h}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
    im = Image.frombytes('RGB', (w, h), crudo)
    tipo, info = es_campo(im)
    tramos.append({'segundo': t, 'campo': tipo, **info})
ya = any(c['caja'][1] == y for c in home['detalle_campos'])
peor = max((w * h if tr['campo'] else 0) for tr in tramos)
extra = 0 if ya else peor
res = {
    'home_con_poster': home['area_campos'],
    'tramos': tramos,
    'cinta_area': round(w * h / area_pagina, 4),
    'home_con_el_tramo_mas_claro': round((home['area_campos'] * area_pagina + extra) / area_pagina, 4),
}
salida.write_text(json.dumps(res, ensure_ascii=False, indent=1))
print(json.dumps(res, ensure_ascii=False))
