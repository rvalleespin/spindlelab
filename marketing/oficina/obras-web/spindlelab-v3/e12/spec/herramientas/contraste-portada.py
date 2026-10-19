"""E12 · spec sobre A · contraste de la portada sobre el video del hilo de oro, cuadro por cuadro. Lucía, 19-oct-2026.

La mitad de los píxeles: lee lo que guardó portada.mjs (el velo pintado por el navegador sobre un blanco puro, y la caja
de cada línea de texto) y lo cruza con TODOS los cuadros del bucle que sirve la portada (hilo-1920.webm de Bruno, 121
cuadros, el primero es el póster). Para cada ancho:

  1. α del velo en cada píxel, desde la captura en blanco: el navegador compone en sRGB, así que donde el velo vale α
     el blanco queda en 255 − 249·α (el velo es #060606). α = (255 − R) / 249.
  2. cada cuadro del video, escalado y recortado como `object-fit: cover; object-position: 50% 50%` sobre la caja del
     medio; fuera de esa caja, el lienzo.
  3. el fondo de cada píxel = α·6 + (1 − α)·video, canal por canal (la misma composición del navegador).
  4. por cada línea de texto: la luminancia WCAG más alta de ese fondo dentro de la caja de la línea, en cada cuadro;
     el contraste contra el color del texto en el peor cuadro, y el mínimo que pide WCAG 2.1 (4,5:1; 3:1 desde 24 px).
     Es la cota estricta: un solo píxel claro bajo la caja cuenta.
  5. el borde del campo del chequeo contra el fondo que lo rodea (1.4.11, 3:1) y el α del velo bajo el texto.

Uso: python3 -I contraste-portada.py <carpeta de portada.mjs> <video> <salida.json>
"""
import json
import subprocess
import sys

import numpy as np
from PIL import Image

carpeta, video, salida = sys.argv[1:4]
render = json.load(open(f'{carpeta}/portada-render.json'))


def lin(c):
    c = np.asarray(c, dtype=np.float64) / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def lum(rgb):
    l = lin(rgb)
    return 0.2126 * l[..., 0] + 0.7152 * l[..., 1] + 0.0722 * l[..., 2]


def ratio(a, b):
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def color(s):
    n = [float(x) for x in s[s.index('(') + 1:s.index(')')].replace('/', ',').split(',') if x.strip()]
    return n[:3]


def cuadros(ancho_medio, alto_medio):
    """Todos los cuadros del video como `object-fit: cover; object-position: 50% 50%` en una caja de ese tamaño."""
    w0, h0 = 1920, 1080
    s = max(ancho_medio / w0, alto_medio / h0)
    sw, sh = max(ancho_medio, round(w0 * s)), max(alto_medio, round(h0 * s))
    cx, cy = (sw - ancho_medio) // 2, (sh - alto_medio) // 2
    cmd = ['ffmpeg', '-v', 'error', '-i', video, '-vf', f'scale={sw}:{sh}:flags=bicubic,crop={ancho_medio}:{alto_medio}:{cx}:{cy}',
           '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    n = len(raw) // (ancho_medio * alto_medio * 3)
    return np.frombuffer(raw, np.uint8)[:n * ancho_medio * alto_medio * 3].reshape(n, alto_medio, ancho_medio, 3)


R = {'cuando': render['cuando'], 'video': video, 'metodo': __doc__.strip().split('\n\n')[1], 'vistas': []}
for v in render['vistas']:
    W, H = v['ancho'], v['alto']
    py = v['portada']['y']
    blanco = np.asarray(Image.open(f"{carpeta}/{v['velo']}").convert('RGB'), dtype=np.float64)
    hh = blanco.shape[0]
    alfa = np.clip((255.0 - blanco[..., 0]) / 249.0, 0, 1)  # (hh, W)
    mx, my = round(v['medio']['x']), round(v['medio']['y'] - py)
    mw, mh = round(v['medio']['w']), round(v['medio']['h'])
    F = cuadros(mw, mh)
    n = F.shape[0]
    # fondo de video alineado a la captura; fuera del medio, el lienzo
    lineas = []
    for li in v['lineas']:
        x0, y0 = max(0, int(np.floor(li['x']))), max(0, int(np.floor(li['y'] - py)))
        x1, y1 = min(W, int(np.ceil(li['x'] + li['w']))), min(hh, int(np.ceil(li['y'] - py + li['h'])))
        if x1 <= x0 or y1 <= y0:
            continue
        a = alfa[y0:y1, x0:x1][None, ..., None]
        # el trozo del video bajo la línea (lienzo donde la línea sale del medio)
        vid = np.full((n, y1 - y0, x1 - x0, 3), 6.0)
        ix0, iy0, ix1, iy1 = max(x0, mx), max(y0, my), min(x1, mx + mw), min(y1, my + mh)
        if ix1 > ix0 and iy1 > iy0:
            vid[:, iy0 - y0:iy1 - y0, ix0 - x0:ix1 - x0] = F[:, iy0 - my:iy1 - my, ix0 - mx:ix1 - mx]
        fondo = a * 6.0 + (1 - a) * vid
        L = lum(fondo).reshape(n, -1)
        peor = L.max(axis=1)  # el píxel más claro bajo la línea, en cada cuadro
        k = int(peor.argmax())
        Lt = float(lum(np.array(color(li['color']))))
        grande = li['tam'] >= 24 or (li['tam'] >= 18.66 and li['peso'] >= 700)
        minimo = 3.0 if grande else 4.5
        c = ratio(Lt, float(peor[k]))
        # el mismo texto sin velo (α = 0 sobre el video): para saber cuánto trabaja el velo
        sin_velo = ratio(Lt, float(lum(vid).reshape(n, -1).max())) if (ix1 > ix0 and iy1 > iy0) else None
        sobre_video = bool(ix1 > ix0 and iy1 > iy0)
        lineas.append({'texto': li['texto'], 'sel': li['sel'], 'tam': li['tam'], 'color': li['color'], 'sobreVideo': sobre_video,
                       'alfaMin': round(float(alfa[y0:y1, x0:x1].min()), 3), 'peorCuadro': k, 'luzMax': round(float(peor[k]), 4),
                       'contraste': round(c, 2), 'contrasteSinVelo': round(sin_velo, 2) if sin_velo else None, 'minimo': minimo, 'aprueba': c >= minimo,
                       'contrasteP99': round(ratio(Lt, float(np.percentile(L[k], 99))), 2)})
    # el borde del campo (1 px) contra el fondo que lo rodea: un anillo de 2 px por fuera
    cpo = v['campo']
    bx0, by0 = int(cpo['x']) - 3, int(cpo['y'] - py) - 3
    bx1, by1 = int(cpo['x'] + cpo['w']) + 3, int(cpo['y'] - py + cpo['h']) + 3
    anillo = np.zeros((hh, W), bool)
    anillo[max(0, by0):by1, max(0, bx0):bx1] = True
    anillo[max(0, by0 + 3):by1 - 3, max(0, bx0 + 3):bx1 - 3] = False
    ys, xs = np.nonzero(anillo)
    a = alfa[ys, xs][None, :, None]
    vid = np.full((n, len(ys), 3), 6.0)
    dentro = (xs >= mx) & (xs < mx + mw) & (ys >= my) & (ys < my + mh)
    vid[:, dentro] = F[:, ys[dentro] - my, xs[dentro] - mx]
    Lborde = float(lum(np.array(color(cpo['borde']))))
    borde = ratio(Lborde, float(lum(a * 6.0 + (1 - a) * vid).max())) if len(ys) else None
    sobre = [x for x in lineas if x['sobreVideo']]
    R['vistas'].append({
        'vista': f'{W}x{H}', 'portada': {'y': py, 'alto': v['portada']['h']}, 'medio': v['medio'], 'cuadros': n,
        'lineas': lineas,
        'resumen': {
            'lineas': len(lineas), 'sobreVideo': len(sobre), 'bajoMinimo': sum(1 for x in lineas if not x['aprueba']),
            'peor': min(lineas, key=lambda x: x['contraste'] / x['minimo']) if lineas else None,
            'alfaMinBajoTexto': min((x['alfaMin'] for x in sobre), default=None),
            'peorSinVelo': min((x['contrasteSinVelo'] for x in sobre), default=None),
            'bordeCampo': {'color': cpo['borde'], 'contraContorno': round(borde, 2), 'minimo': 3.0, 'aprueba': borde is not None and borde >= 3.0},
            'campoArriba': round(cpo['y'], 1), 'botonAbajo': round(v['boton']['y'] + v['boton']['h'], 1),
            'margenBajoBoton': round(H - (v['boton']['y'] + v['boton']['h']), 1),
            # alto del video sin velo: desde el fin de la costura de arriba (48 px) hasta donde empieza la rampa del velo
            'videoSinVelo': round(v['pie']['y'] - (v['medio']['y'] + 48), 1) if W >= 834 else round(v['medio']['h'], 1),
        }})
    s = R['vistas'][-1]['resumen']
    print(f"{W}x{H}: {s['lineas']} líneas ({s['sobreVideo']} sobre el video), bajo el mínimo {s['bajoMinimo']}; peor "
          f"{s['peor']['contraste']}:1 ({s['peor']['sel']} «{s['peor']['texto'][:24]}», mín {s['peor']['minimo']}, cuadro {s['peor']['peorCuadro']}); "
          f"α mín bajo texto {s['alfaMinBajoTexto']}; sin velo {s['peorSinVelo']}:1; borde del campo {s['bordeCampo']['contraContorno']}:1; botón a {s['margenBajoBoton']} px del borde")
json.dump(R, open(salida, 'w'), ensure_ascii=False, indent=1)
