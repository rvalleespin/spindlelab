"""E13 · el color de acción (--a-accion, el amarillo de Koto), medido desde el hex. Lucía, 30-oct-2026.

Ramón, 30-oct: el botón principal de la portada y el del encabezado pasan de blanco a AMARILLO LLENO #FFE800 con texto
#060606 (el único color de Koto, el de su logo: lock E12 §2.2). Esta herramienta:

  1. Describe #FFE800 en OKLCH (L, C, h) y en HSV, para que el estado al pasar el mouse y el apretado salgan del mismo
     tono y no de un «amarillo cualquiera».
  2. Genera los candidatos del estado al pasar y del apretado bajando L en OKLCH con el tono fijo (y la croma recortada
     lo justo para quedar dentro de sRGB), y también aclarando hacia el blanco, y mide de cada uno:
       · el contraste del texto #060606 sobre él (WCAG 2.1; el texto del botón es mono 11: mínimo 4,5);
       · el contraste contra el reposo (cuánto se nota el cambio; el botón claro pasa del blanco al gris con 2,88:1 y del
         blanco al apretado con 1,54:1);
       · la distancia en OKLab contra el reposo (ΔE ok; bajo 0,02 no se distingue a simple vista);
       · el corrimiento de tono (h) y si se va al oliva (h sube hacia el verde al oscurecer el amarillo).
  3. Mide los pares de la spec: el texto sobre el amarillo en sus tres estados; el amarillo contra el lienzo, la placa, la
     placa activa y el peor fondo del velo de la portada (0,88 de #060606 sobre un blanco puro); el foco (contorno blanco
     de 2 px a 3 px) contra esos fondos y contra el amarillo, y el hueco de 3 px entre los dos.
  4. Mide la distancia entre el amarillo y el oro del hilo de la portada (los píxeles del póster con el mismo filtro de
     spec-home §5: tono 30–60°, S ≥ 0,45, V ≥ 0,45), para que la regla «un solo dorado» pueda separar los dos colores.

El contraste del amarillo contra el video real, cuadro por cuadro, lo mide portada-30oct.mjs + contraste-portada.py
(E12, sin cambios): el «borde del campo» de esa herramienta es aquí el relleno del botón contra lo que lo rodea.

Uso: python3 accion-amarillo.py <poster.webp> <salida.json>
"""
import colorsys
import json
import math
import sys

import numpy as np
from PIL import Image

poster, salida = sys.argv[1:3]


# ---------------------------------------------------------------- sRGB, WCAG
def hexa(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def a_hex(c):
    return '#' + ''.join(f'{max(0, min(255, round(x))):02X}' for x in c)


def lineal(x):
    x /= 255
    return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4


def gamma(x):
    x = 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
    return x * 255


def lum(c):
    r, g, b = (lineal(float(v)) for v in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a, b):
    la, lb = lum(a), lum(b)
    return round((max(la, lb) + 0.05) / (min(la, lb) + 0.05), 2)


def sobre(c, a, fondo):
    """c con opacidad a sobre fondo, compuesto en sRGB como el navegador."""
    return [c[i] * a + fondo[i] * (1 - a) for i in range(3)]


# ---------------------------------------------------------------- OKLab / OKLCH (Björn Ottosson, 2020)
def a_oklab(c):
    r, g, b = (lineal(float(v)) for v in c)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l, m, s = (math.copysign(abs(x) ** (1 / 3), x) for x in (l, m, s))
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s]


def de_oklab(L, a, b):
    l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return [r, g, bb]


def oklch(c):
    L, a, b = a_oklab(c)
    return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360


def desde_oklch(L, C, h):
    """OKLCH → sRGB, recortando la croma lo justo para caer dentro del gamut (el tono y la L no se mueven)."""
    lo, hi = 0.0, C
    for _ in range(40):
        a, b = hi * math.cos(math.radians(h)), hi * math.sin(math.radians(h))
        rgb = de_oklab(L, a, b)
        if all(-1e-4 <= x <= 1 + 1e-4 for x in rgb):
            break
        mid = (lo + hi) / 2
        a, b = mid * math.cos(math.radians(h)), mid * math.sin(math.radians(h))
        if all(-1e-4 <= x <= 1 + 1e-4 for x in de_oklab(L, a, b)):
            lo = mid
        else:
            hi = mid
    a, b = hi * math.cos(math.radians(h)), hi * math.sin(math.radians(h))
    rgb = de_oklab(L, a, b)
    if not all(-1e-4 <= x <= 1 + 1e-4 for x in rgb):
        a, b = lo * math.cos(math.radians(h)), lo * math.sin(math.radians(h))
        rgb = de_oklab(L, a, b)
    return [gamma(min(1, max(0, x))) for x in rgb]


def de_ok(c1, c2):
    a, b = a_oklab(c1), a_oklab(c2)
    return round(math.dist(a, b), 4)


def hsv(c):
    h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in c))
    return round(h * 360, 1), round(s, 3), round(v, 3)


# ---------------------------------------------------------------- tokens de la spec (§1.1) y el de acción
T = {
    'lienzo': hexa('#060606'), 'placa': hexa('#141414'), 'placa-activa': hexa('#202020'), 'blanco': hexa('#FFFFFF'),
    'gris': hexa('#989898'), 'apretado': hexa('#D0D0D0'), 'accion': hexa('#FFE800'), 'texto-accion': hexa('#060606'),
}
T['velo-peor'] = sobre(T['lienzo'], .88, T['blanco'])   # el peor fondo del velo de la portada (§3.1): 0,88 sobre blanco puro
T['velo-1'] = T['lienzo']                                # el velo a 1 en el borde de abajo de la portada

R = {'herramienta': 'e13/herramientas/accion-amarillo.py', 'cuando': '2026-10-30'}
Lr, Cr, hr = oklch(T['accion'])
R['accion'] = {'hex': '#FFE800', 'oklch': [round(Lr, 4), round(Cr, 4), round(hr, 2)], 'hsv': hsv(T['accion']),
               'luminancia': round(lum(T['accion']), 4)}

# ---------------------------------------------------------------- 2 · candidatos
cand = []
for dL in (-0.02, -0.04, -0.05, -0.06, -0.08, -0.10, -0.12, -0.14, -0.16, -0.20):
    c = desde_oklch(Lr + dL, Cr, hr)
    cand.append(('oscurecer', dL, c))
for mezcla in (0.15, 0.25, 0.35, 0.5):  # aclarar hacia el blanco (mezcla en sRGB, como un velo blanco)
    c = sobre(T['blanco'], mezcla, T['accion'])
    cand.append(('aclarar', mezcla, c))
R['candidatos'] = []
for modo, paso, c in cand:
    cc = [round(x) for x in c]
    L, C, h = oklch(cc)
    R['candidatos'].append({
        'modo': modo, 'paso': paso, 'hex': a_hex(cc), 'oklch': [round(L, 4), round(C, 4), round(h, 2)], 'hsv': hsv(cc),
        'textoSobre': ratio(T['texto-accion'], cc), 'contraReposo': ratio(cc, T['accion']), 'deOkContraReposo': de_ok(cc, T['accion']),
        'corrimientoTono': round(h - hr, 2), 'contraLienzo': ratio(cc, T['lienzo']),
    })

# Lo elegido (ver spec-visual §1.1 y la fila del 30-oct de §7): al pasar, un paso de L −0,06; apretado, −0,12. Los dos en
# el mismo tono que el reposo, en la misma dirección (como el botón de placa: reposo → al pasar → apretado se aleja del
# reposo en un solo sentido, así que en táctil, sin estado al pasar, el apretado se nota igual).
ELEGIDO = {'reposo': '#FFE800', 'pasar': None, 'apretado': None}
for x in R['candidatos']:
    if x['modo'] == 'oscurecer' and x['paso'] == -0.06:
        ELEGIDO['pasar'] = x['hex']
    if x['modo'] == 'oscurecer' and x['paso'] == -0.12:
        ELEGIDO['apretado'] = x['hex']
R['elegido'] = ELEGIDO
P = {k: hexa(v) for k, v in ELEGIDO.items()}

# ---------------------------------------------------------------- 3 · pares
pares = []


def par(nombre, a, b, minimo, rol):
    pares.append({'par': nombre, 'contraste': ratio(a, b), 'minimo': minimo, 'aprueba': (ratio(a, b) >= minimo) if minimo else None, 'rol': rol})


for k in ('reposo', 'pasar', 'apretado'):
    par(f'texto #060606 sobre el amarillo ({k}, {ELEGIDO[k]})', T['texto-accion'], P[k], 4.5, 'el texto mono 11 del botón y su flecha')
for k in ('reposo', 'pasar', 'apretado'):
    par(f'blanco sobre el amarillo ({k})', T['blanco'], P[k], 4.5, 'para que conste por qué el texto no va en blanco')
for f in ('lienzo', 'placa', 'placa-activa', 'velo-peor'):
    for k in ('reposo', 'pasar', 'apretado'):
        par(f'amarillo ({k}) contra {f}', P[k], T[f], 3.0, 'el borde del botón: identifica el control (WCAG 1.4.11)')
for f in ('lienzo', 'placa', 'velo-peor'):
    par(f'foco blanco contra {f}', T['blanco'], T[f], 3.0, 'el contorno de 2 px a 3 px, sobre el fondo que rodea al botón')
for k in ('reposo', 'pasar', 'apretado'):
    par(f'foco blanco contra el amarillo ({k})', T['blanco'], P[k], 3.0, 'si el contorno tocara el botón: NO aprueba, por eso el hueco de 3 px no se quita')
for f in ('lienzo', 'placa', 'velo-peor'):
    par(f'hueco de 3 px ({f}) contra el amarillo', T[f], P['reposo'], 3.0, 'lo que separa el contorno del relleno')
par('estado al pasar contra el reposo', P['pasar'], P['reposo'], None, 'cuánto se nota (el botón claro: blanco → gris 2,88; blanco → apretado 1,54)')
par('apretado contra el reposo', P['apretado'], P['reposo'], None, 'ídem')
par('apretado contra el estado al pasar', P['apretado'], P['pasar'], None, 'ídem')
par('botón claro: gris contra blanco (referencia)', T['gris'], T['blanco'], None, 'el cambio al pasar del botón claro de hoy')
par('botón claro: apretado contra blanco (referencia)', T['apretado'], T['blanco'], None, 'el cambio al apretar del botón claro de hoy')
R['pares'] = pares
R['deOk'] = {'pasar-reposo': de_ok(P['pasar'], P['reposo']), 'apretado-reposo': de_ok(P['apretado'], P['reposo']),
             'apretado-pasar': de_ok(P['apretado'], P['pasar']), 'gris-blanco (claro, referencia)': de_ok(T['gris'], T['blanco']),
             'apretado-blanco (claro, referencia)': de_ok(T['apretado'], T['blanco'])}

# ---------------------------------------------------------------- 4 · el oro del hilo contra el amarillo
img = np.asarray(Image.open(poster).convert('RGB'), dtype=np.float64) / 255
mx, mn = img.max(axis=2), img.min(axis=2)
s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-9), 0)
r, g, b = img[..., 0], img[..., 1], img[..., 2]
dif = np.maximum(mx - mn, 1e-9)
hue = np.where(mx == r, ((g - b) / dif) % 6, np.where(mx == g, (b - r) / dif + 2, (r - g) / dif + 4)) * 60
oro = (hue >= 30) & (hue <= 60) & (s >= 0.45) & (mx >= 0.45)
n = int(oro.sum())
hs = hue[oro]
pix = (img[oro] * 255).round().astype(int)
okh = [oklch(p)[2] for p in pix[:: max(1, n // 4000)]]
R['oroDelHilo'] = {
    'poster': poster, 'pixeles': n, 'fraccion': round(n / oro.size, 4),
    'tonoHsv': {'p5': round(float(np.percentile(hs, 5)), 1), 'mediana': round(float(np.median(hs)), 1), 'p95': round(float(np.percentile(hs, 95)), 1), 'max': round(float(hs.max()), 1)},
    'tonoOklch': {'p5': round(float(np.percentile(okh, 5)), 1), 'mediana': round(float(np.median(okh)), 1), 'p95': round(float(np.percentile(okh, 95)), 1)},
    'colorMediano': a_hex(np.median(pix, axis=0)),
    'deOkMedianoContraAccion': de_ok(np.median(pix, axis=0), T['accion']),
    'fraccionSobre52grados': round(float((hs > 52).mean()), 4),
}

json.dump(R, open(salida, 'w'), ensure_ascii=False, indent=1)

print('accion', R['accion'])
print('\ncandidatos (modo, paso, hex, texto sobre, contra reposo, ΔEok, corrimiento de tono)')
for x in R['candidatos']:
    print(f"  {x['modo']:9} {x['paso']:>6} {x['hex']}  texto {x['textoSobre']:>5}  vs reposo {x['contraReposo']:>4}  ΔE {x['deOkContraReposo']:.3f}  h {x['oklch'][2]:.1f} ({x['corrimientoTono']:+.2f})  hsv {x['hsv']}")
print('\nelegido', ELEGIDO)
for p_ in pares:
    print(f"  {p_['contraste']:>6}  {'ok ' if p_['aprueba'] else ('NO ' if p_['aprueba'] is False else '   ')} {p_['par']}")
print('ΔEok', R['deOk'])
print('oro del hilo', R['oroDelHilo'])
