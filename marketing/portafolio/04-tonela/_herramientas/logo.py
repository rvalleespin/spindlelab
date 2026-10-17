"""Dibuja el logo de Tonela como trazados (sin depender de la letra instalada).

Instancia Big Shoulders en wght 800 / opsz 72, saca los contornos de «TONELA» y de «T»
y arma los SVG: la etiqueta cosida (tinta, costura punteada y la presilla en zigzag
de las cintas de izaje en el extremo cosido) y el símbolo para 32 y 16 px.

Uso: python3 -I logo.py  (desde esta carpeta)
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

AQUI = os.path.dirname(os.path.abspath(__file__))
FUENTE = os.path.join(AQUI, '..', 'identidad', 'fuentes', 'big-shoulders-var.woff2')
SALIDA = os.path.join(AQUI, '..', 'identidad', 'logo')

LIENZO, TINTA = '#F1F2EF', '#121314'

f = TTFont(FUENTE)
inst = instantiateVariableFont(f, {'wght': 800, 'opsz': 72})
gs = inst.getGlyphSet()
cmap = inst.getBestCmap()
upm = inst['head'].unitsPerEm
hmtx = inst['hmtx']
os2 = inst['OS/2']
cap = os2.sCapHeight


def palabra(texto, tracking=0.0):
    """Devuelve (path_d, ancho) en unidades de la fuente, línea base en y=0, y hacia abajo."""
    x = 0
    ds = []
    for ch in texto:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(pen)
        d = pen.getCommands()
        # fontTools dibuja con y hacia arriba: se invierte con transform al usar
        ds.append((x, d))
        x += hmtx[g][0] + tracking * upm
    ancho = x - tracking * upm
    return ds, ancho


def grupo(ds, escala, x0, y0, color):
    partes = []
    for (dx, d) in ds:
        partes.append(f'<path transform="translate({x0 + dx*escala:.3f} {y0:.3f}) scale({escala:.5f} {-escala:.5f})" d="{d}"/>')
    return f'<g fill="{color}">' + ''.join(partes) + '</g>'


def bbox_x(texto):
    """Borde izquierdo de la primera letra y derecho de la última (para centrar ópticamente)."""
    g0, g1 = cmap[ord(texto[0])], cmap[ord(texto[-1])]
    b0 = BoundsPen(gs); gs[g0].draw(b0)
    b1 = BoundsPen(gs); gs[g1].draw(b1)
    return b0.bounds[0], b1.bounds[2]


def etiqueta(fondo, tinta_letra, costura, nombre, ancho_total=520, alto=120):
    """La etiqueta cosida: rectángulo, costura punteada perimetral y la presilla en zigzag."""
    ds, w = palabra('TONELA', tracking=0.04)
    alto_letra = alto * 0.46            # altura de mayúscula
    esc = alto_letra / cap
    caja = alto * 0.10                  # ancho del remate (presilla en zigzag)
    m = alto * 0.13                     # margen de la costura perimetral
    x_caja = m + alto * 0.15
    x_texto = x_caja + caja + alto * 0.30
    izq, der = bbox_x('TONELA')
    ancho_letras = (w - hmtx[cmap[ord('A')]][0] + der) * esc - izq * esc
    ancho_total = x_texto + ancho_letras + alto * 0.42
    base = alto / 2 + alto_letra / 2
    trazo = max(1.6, alto * 0.018)
    dash = f'{alto*0.045:.2f} {alto*0.035:.2f}'
    alto_z = alto * 0.50
    yc = (alto - alto_z) / 2
    n = 13
    pts = []
    for i in range(n + 1):
        x = x_caja if i % 2 == 0 else x_caja + caja
        pts.append(f'{x:.2f} {yc + alto_z * i / n:.2f}')
    zig = 'M' + ' L'.join(pts)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ancho_total:.1f} {alto}" width="{ancho_total:.1f}" height="{alto}" role="img" aria-label="Tonela">
<title>Tonela</title>
<rect width="{ancho_total:.1f}" height="{alto}" rx="{alto*0.04:.2f}" fill="{fondo}"/>
<rect x="{m:.2f}" y="{m:.2f}" width="{ancho_total-2*m:.2f}" height="{alto-2*m:.2f}" fill="none" stroke="{costura}" stroke-width="{trazo:.2f}" stroke-dasharray="{dash}" stroke-linecap="round"/>
<path d="{zig}" fill="none" stroke="{costura}" stroke-width="{trazo*1.25:.2f}" stroke-linejoin="round" stroke-linecap="round"/>
{grupo(ds, esc, x_texto - izq*esc, base, tinta_letra)}
</svg>
'''
    with open(os.path.join(SALIDA, nombre), 'w') as fh:
        fh.write(svg)
    return ancho_total


def simbolo(fondo, letra, costura, nombre, lado, con_costura):
    ds, w = palabra('T')
    alto_letra = lado * (0.56 if con_costura else 0.70)
    esc = alto_letra / cap
    izq, der = bbox_x('T')
    ancho_letra = (der - izq) * esc
    x = (lado - ancho_letra) / 2 - izq * esc
    base = lado / 2 + alto_letra / 2
    cos = ''
    if con_costura:
        m = lado * 0.11
        trazo = lado * 0.045
        cos = (f'<rect x="{m:.2f}" y="{m:.2f}" width="{lado-2*m:.2f}" height="{lado-2*m:.2f}" fill="none" '
               f'stroke="{costura}" stroke-width="{trazo:.2f}" stroke-dasharray="{lado*0.075:.2f} {lado*0.055:.2f}"/>')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lado} {lado}" width="{lado}" height="{lado}" role="img" aria-label="Tonela">
<title>Tonela</title>
<rect width="{lado}" height="{lado}" rx="{lado*0.06:.2f}" fill="{fondo}"/>
{cos}
{grupo(ds, esc, x, base, letra)}
</svg>
'''
    with open(os.path.join(SALIDA, nombre), 'w') as fh:
        fh.write(svg)


os.makedirs(SALIDA, exist_ok=True)
a = etiqueta(TINTA, LIENZO, LIENZO, 'tonela-etiqueta.svg')
etiqueta(LIENZO, TINTA, TINTA, 'tonela-etiqueta-clara.svg')
simbolo(TINTA, LIENZO, LIENZO, 'tonela-simbolo-32.svg', 32, True)
simbolo(TINTA, LIENZO, LIENZO, 'tonela-simbolo-16.svg', 16, False)
simbolo(TINTA, LIENZO, LIENZO, 'tonela-simbolo-512.svg', 512, True)
print('etiqueta ancho', round(a, 1), 'cap', cap, 'upm', upm)
