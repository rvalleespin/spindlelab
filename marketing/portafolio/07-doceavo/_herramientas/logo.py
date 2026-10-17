"""Doceavo · los archivos del logo, en SVG con la palabra en contornos (no depende de la fuente).

Uso: python3 -I logo.py  (desde cualquier carpeta)
- Instancia Recursive en wght 720, MONO 0, CASL 0, CRSV 0, slnt 0 (la misma del sitio) y dibuja
  «doceavo» con un tracking de -0,04 em, como en la cabecera.
- La retícula: 3 × 4 casillas, enero arriba a la izquierda; la del mes va llena.
Escribe en identidad/logo/: la palabra sola, el logo completo sobre tinta y sobre lienzo (octubre),
el símbolo de cada mes (01 a 12) y el símbolo chico para 32 y 16 px.
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
SALIDA = os.path.join(RAIZ, "identidad", "logo")
os.makedirs(SALIDA, exist_ok=True)

f = TTFont(os.path.join(RAIZ, "identidad", "fuentes", "recursive.woff2"))
f = instancer.instantiateVariableFont(f, {"wght": 720, "MONO": 0, "CASL": 0, "CRSV": 0, "slnt": 0})
upm = f["head"].unitsPerEm
cmap = f.getBestCmap()
gs = f.getGlyphSet()
hmtx = f["hmtx"]

def palabra(texto, tracking=-0.04):
    """Devuelve (d, ancho, ymin, ymax) en unidades de la fuente, con la línea base en y=0 hacia arriba."""
    x = 0
    pen = SVGPathPen(gs)
    bp = BoundsPen(gs)
    for i, ch in enumerate(texto):
        g = cmap[ord(ch)]
        t = TransformPen(pen, (1, 0, 0, 1, x, 0))
        gs[g].draw(t)
        gs[g].draw(TransformPen(bp, (1, 0, 0, 1, x, 0)))
        x += hmtx[g][0] + (tracking * upm if i < len(texto) - 1 else 0)
    xmin, ymin, xmax, ymax = bp.bounds
    return pen.getCommands(), xmax, ymin, ymax

d, ancho, ymin, ymax = palabra("doceavo")
asc = ymax  # alto de la d
print("palabra: ancho", round(ancho), "ymin", ymin, "ymax", ymax, "upm", upm)

def simbolo(mes, celda=6, hueco=2, trazo=1, chico=False, color="currentColor", vacio=None):
    w, h = 3 * celda + 2 * hueco, 4 * celda + 3 * hueco
    r = []
    for i in range(12):
        x, y = (i % 3) * (celda + hueco), (i // 3) * (celda + hueco)
        if i + 1 == mes:
            r.append(f'<rect x="{x}" y="{y}" width="{celda}" height="{celda}" fill="{color}"/>')
        elif chico:
            r.append(f'<rect x="{x}" y="{y}" width="{celda}" height="{celda}" fill="{vacio or color}"/>')
        else:
            s = trazo / 2
            r.append(f'<rect x="{x + s}" y="{y + s}" width="{celda - trazo}" height="{celda - trazo}" fill="none" stroke="{color}" stroke-width="{trazo}"/>')
    return w, h, "".join(r)

MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

def escribir(nombre, contenido):
    with open(os.path.join(SALIDA, nombre), "w", encoding="utf-8") as fh:
        fh.write(contenido)

# la palabra sola (viewBox en unidades de la fuente; y invertida)
pad = 0
escribir("doceavo-palabra.svg",
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {-ymax} {ancho:.0f} {ymax - ymin:.0f}" role="img" aria-label="doceavo">'
    f'<path transform="scale(1,-1)" fill="currentColor" d="{d}"/></svg>\n')

# el logo completo: el símbolo a la altura de la d, separado por el ancho de una casilla y media
def logo(mes, tinta, fondo=None):
    sw, sh, srects = simbolo(mes, color=tinta)
    esc = asc / sh               # el símbolo mide lo que mide la d
    sep = 1.5 * 6 * esc          # una casilla y media
    W = sw * esc + sep + ancho
    H = ymax - ymin
    bg = f'<rect x="{-0.2*asc:.0f}" y="{-ymax-0.2*asc:.0f}" width="{W+0.4*asc:.0f}" height="{H+0.4*asc:.0f}" fill="{fondo}"/>' if fondo else ""
    vb = f'{-0.2*asc:.0f} {-ymax-0.2*asc:.0f} {W+0.4*asc:.0f} {H+0.4*asc:.0f}' if fondo else f'0 {-ymax:.0f} {W:.0f} {H:.0f}'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="doceavo, {MESES[mes-1]}">{bg}'
            f'<g transform="translate(0,{-asc:.1f}) scale({esc:.4f})">{srects}</g>'
            f'<path transform="translate({sw*esc+sep:.1f},0) scale(1,-1)" fill="{tinta}" d="{d}"/></svg>\n')

escribir("doceavo-logo-tinta.svg", logo(10, "#141414"))
escribir("doceavo-logo-lienzo.svg", logo(10, "#DCE6D3"))
escribir("doceavo-logo-sobre-lienzo.svg", logo(10, "#141414", "#DCE6D3"))
escribir("doceavo-logo-sobre-tinta.svg", logo(10, "#DCE6D3", "#141414"))

for m in range(1, 13):
    w, h, r = simbolo(m)
    escribir(f"simbolo-{m:02d}-{MESES[m-1]}.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="doceavo, {MESES[m-1]}" color="#141414">{r}</svg>\n')

# chico: casillas llenas en verde de línea y la del mes en tinta (32 y 16 px, sobre lienzo)
for px, celda, hueco in ((32, 6, 2), (16, 3, 1)):
    w, h, r = simbolo(10, celda=celda, hueco=hueco, chico=True, color="#141414", vacio="#A9C0A0")
    lado = px  # una unidad = un píxel: las casillas caen en píxeles enteros y no se emborronan
    ox, oy = (lado - w) // 2, (lado - h) // 2
    escribir(f"simbolo-{px}.svg", f'<svg xmlns="http://www.w3.org/2000/svg" width="{px}" height="{px}" viewBox="0 0 {lado} {lado}" role="img" aria-label="doceavo"><rect width="{lado}" height="{lado}" fill="#DCE6D3"/><g transform="translate({ox},{oy})">{r}</g></svg>\n')
print("ok", sorted(os.listdir(SALIDA)))
