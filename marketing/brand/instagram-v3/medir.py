# Mide cada lámina rendida (salida/<lámina>.png + salida/medidas/<lámina>.json) y deja:
#  · salida/mediciones.csv — oro, letra mínima, recortes, contraste sobre foto, desborde.
#  · legibilidad/<lámina>-390.png — la lámina al ancho de un teléfono (390 px).
# Oro = píxel a ±40 de #C9A227 en cada canal. Regla: todo el oro de la lámina está DENTRO de la
# caja del punto del wordmark (fuera = 0). Una lámina sin wordmark tiene que dar 0.
# Uso: python3 medir.py [láminas]   (sin argumentos, todas las de salida/)
import sys, os, glob, json, csv
from PIL import Image
from PIL import ImageChops
base = os.path.dirname(os.path.abspath(__file__))
S = f'{base}/salida'
os.makedirs(f'{base}/legibilidad', exist_ok=True)
nombres = sys.argv[1:] or sorted(os.path.basename(f)[:-4] for f in glob.glob(f'{S}/*.png'))
ORO = (201, 162, 39)
PAPEL = (247, 245, 240)
# Solo PIL (sin numpy, para que corra igual en la Mac).

def lum(rgb):
    c = [v / 255 for v in rgb]
    c = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]

def mascara_oro(img):
    # 255 donde los tres canales están a ±40 del oro.
    bandas = [b.point(lambda v, o=o: 255 if abs(v - o) <= 40 else 0) for b, o in zip(img.split(), ORO)]
    return ImageChops.multiply(ImageChops.multiply(bandas[0], bandas[1]), bandas[2])

def mascara_tono(img):
    # El criterio del sitio (relevamiento 7-oct): tono 38–54°, saturación ≥ 0,5, brillo ≥ 0,5.
    h, sat, v = img.convert('HSV').split()
    hm = h.point(lambda x: 255 if 27 <= x <= 38 else 0)        # 38–54° en la escala 0–255 de PIL
    sm = sat.point(lambda x: 255 if x >= 128 else 0)
    vm = v.point(lambda x: 255 if x >= 128 else 0)
    return ImageChops.multiply(ImageChops.multiply(hm, sm), vm)

def contar(mascara):
    return mascara.histogram()[255]

filas = []
for n in nombres:
    im = Image.open(f'{S}/{n}.png').convert('RGB')
    W, H = im.size
    m = json.load(open(f'{S}/medidas/{n}.json'))
    oro = mascara_oro(im)
    total = contar(oro)
    tono = mascara_tono(im)
    en_punto = tono_punto = 0
    for p in m['puntos']:
        caja = (max(0, int(p['x0']) - 2), max(0, int(p['y0']) - 2), min(W, int(p['x1']) + 3), min(H, int(p['y1']) + 3))
        en_punto += contar(oro.crop(caja)); tono_punto += contar(tono.crop(caja))
    tono_fuera = contar(tono) - tono_punto
    textos = [t for t in m['textos'] if not t['guia']]
    minpx = min(t['px'] for t in textos)
    may = [t for t in textos if t['may']]
    disp = ' '.join(t['t'] for t in may)
    # Recortes: 4:5 → lo esencial dentro del centro 3:4 de la grilla (x 34 a 1046).
    # 9:16 → banda segura del reel (y 269 a 1248, x 65 a 1015, fuera de la columna de íconos
    # x > 850 · y > 1150), que cae dentro de la de la story (250 a 1580) y del recorte 3:4 (240 a 1680).
    if H == 1350:
        fuera = [t['t'] for t in textos if t['x0'] < 34 or t['x1'] > 1046]
        fuera += ['wordmark'] if any(p['x0'] < 34 or p['x1'] > 1046 for p in m['puntos']) else []
        recorte = 'dentro del 3:4' if not fuera else 'FUERA: ' + '; '.join(fuera)
    else:
        fuera = [t['t'] for t in textos if t['y0'] < 269 or t['y1'] > 1248 or t['x0'] < 65 or t['x1'] > 1015 or (t['x1'] > 850 and t['y1'] > 1150)]
        recorte = 'dentro de la banda del reel' if not fuera else 'FUERA: ' + '; '.join(fuera)
    # Contraste sobre foto: el texto contra el píxel MÁS claro que pisa (captura sin texto).
    contraste = ''
    fondo = f'{S}/_2x/{n}-fondo@2x.png'
    if os.path.exists(fondo):
        f = Image.open(fondo).convert('RGB').resize((W, H), Image.LANCZOS)
        peor = 99
        for t in textos:
            caja = f.crop((int(t['x0']), int(t['y0']), int(t['x1']), int(t['y1'])))
            colores = caja.getcolors(caja.width * caja.height)
            if not colores: continue
            lmax = max(lum(c) for _, c in colores)
            peor = min(peor, (lum(PAPEL) + 0.05) / (lmax + 0.05))
        contraste = f'{peor:.2f}:1 (peor caso)'
    # Legibilidad: la lámina a 390 de ancho.
    Image.open(f'{S}/{n}.png').resize((390, round(H * 390 / W)), Image.LANCZOS).save(f'{base}/legibilidad/{n}-390.png', optimize=True)
    filas.append({
        'lamina': n, 'formato': f'{W}×{H}', 'oro_total_px': total, 'oro_en_punto_px': en_punto, 'oro_fuera_px': total - en_punto,
        'oro_fuera_por_tono_px': tono_fuera,
        'oro_ok': 'sí' if total - en_punto == 0 else ('falso positivo (no es oro por tono)' if tono_fuera == 0 else 'NO'),
        'letra_min_px': round(minpx, 1), 'letra_min_a_390': round(minpx * 390 / W, 1), 'legible_390': 'sí' if minpx * 390 / W >= 11 else 'NO',
        'display': f'«{disp}» ({len(disp)} car., {len(disp.split())} pal.)' if may else '—',
        'recorte': recorte, 'contraste_sobre_foto': contraste or '—', 'desborde': 'NO' if not m.get('desborde') else 'SÍ',
    })
# Con argumentos se actualizan solo esas filas; el resto del CSV se conserva.
previas = {}
if sys.argv[1:] and os.path.exists(f'{S}/mediciones.csv'):
    previas = {r['lamina']: r for r in csv.DictReader(open(f'{S}/mediciones.csv'))}
previas.update({f['lamina']: f for f in filas})
filas_csv = [previas[k] for k in sorted(previas)]
with open(f'{S}/mediciones.csv', 'w', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=list(filas[0].keys())); w.writeheader(); w.writerows(filas_csv)
for f in filas:
    print(' | '.join(str(v) for v in f.values()))
