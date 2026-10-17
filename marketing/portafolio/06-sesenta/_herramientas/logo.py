"""Dibuja el logo de Sesenta como trazados (sin depender de la letra instalada).

Instancia Schibsted Grotesk en wght 900, saca los contornos de «SESENTA», de «60» y de los
rótulos del sello, aplica el kerning de la tabla GPOS (pares de clase y de glifo) y arma:

- sesenta-palabra-{blanco,tinta,azul}.svg   la palabra
- sesenta-sello-{blanco,azul,tinta}.svg     el timbre completo: doble filete, SESENTA arriba,
                                           60 al centro, DÍAS HÁBILES abajo
- sesenta-sello-simple-{...}.svg            el timbre con el 60 solo (encabezado, 32 px)
- sesenta-firma-{blanco,tinta}.svg          el timbre simple + la palabra
- sesenta-60-{512,32,16}.svg                el símbolo para pestaña e ícono (azul con 60 blanco)

Uso: python3 -I logo.py  (desde esta carpeta)
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

AQUI = os.path.dirname(os.path.abspath(__file__))
FUENTE = os.path.join(AQUI, '..', 'identidad', 'fuentes', 'schibsted-grotesk.woff2')
SALIDA = os.path.join(AQUI, '..', 'identidad', 'logo')
SITIO = os.path.join(AQUI, '..', 'sitio')

AZUL, BLANCO, TINTA, PAPEL = '#22408A', '#FFFFFF', '#111111', '#F3F1EA'

f = TTFont(FUENTE)
inst = instantiateVariableFont(f, {'wght': 900})
gs = inst.getGlyphSet()
cmap = inst.getBestCmap()
upm = inst['head'].unitsPerEm
hmtx = inst['hmtx']
cap = inst['OS/2'].sCapHeight


def kerning():
    """Pares de kerning de la GPOS (PairPos formato 1 y 2), solo XAdvance del primer glifo."""
    pares = {}
    if 'GPOS' not in inst:
        return lambda a, b: 0
    gpos = inst['GPOS'].table
    clases = []
    for lk in gpos.LookupList.Lookup:
        subt = lk.SubTable
        for st in subt:
            if lk.LookupType == 9:
                st = st.ExtSubTable
            if getattr(st, 'LookupType', lk.LookupType) != 2 and lk.LookupType not in (2, 9):
                continue
            if not hasattr(st, 'Format') or not hasattr(st, 'Coverage'):
                continue
            cov = st.Coverage.glyphs
            if st.Format == 1:
                for i, g1 in enumerate(cov):
                    for pvr in st.PairSet[i].PairValueRecord:
                        v = pvr.Value1.XAdvance if pvr.Value1 is not None and hasattr(pvr.Value1, 'XAdvance') else 0
                        if v:
                            pares.setdefault((g1, pvr.SecondGlyph), v)
            elif st.Format == 2:
                clases.append((set(cov), st.ClassDef1.classDefs, st.ClassDef2.classDefs, st.Class1Record))

    def k(a, b):
        if (a, b) in pares:
            return pares[(a, b)]
        for cov, cd1, cd2, rec in clases:
            if a not in cov:
                continue
            c1 = cd1.get(a, 0)
            c2 = cd2.get(b, 0)
            v = rec[c1].Class2Record[c2].Value1
            x = getattr(v, 'XAdvance', 0) if v is not None else 0
            if x:
                return x
        return 0
    return k


KERN = kerning()


def texto(s, tracking=0):
    """Contornos de una línea de texto: devuelve (d, ancho) en unidades de la fuente, base en y=0, y hacia arriba."""
    x = 0
    partes = []
    nombres = [cmap[ord(c)] for c in s]
    for i, g in enumerate(nombres):
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (1, 0, 0, -1, x, 0))  # invierte y para SVG
        gs[g].draw(tp)
        partes.append(pen.getCommands())
        x += hmtx[g][0] + tracking
        if i + 1 < len(nombres):
            x += KERN(g, nombres[i + 1])
    return ' '.join(partes), x - tracking


def caja(d_ancho, escala):
    return d_ancho * escala


def palabra(color, nombre):
    d, w = texto('SESENTA', tracking=-8)
    pad = 0
    vb = f'0 {-cap} {w:.0f} {cap}'
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Sesenta">'
           f'<path fill="{color}" d="{d}"/></svg>\n')
    open(os.path.join(SALIDA, nombre), 'w').write(svg)
    return w


def sello(color, nombre, completo=True, fondo=None):
    """El timbre: rectángulo de doble filete. Medidas en unidades de la fuente (alto H)."""
    d60, w60 = texto('60', tracking=-20)
    if completo:
        H = 2.05 * cap
        ds, ws = texto('SESENTA', tracking=60)
        dd, wd = texto('DÍAS HÁBILES', tracking=50)
        esc_r = 0.17  # rótulos a 17 % del alto de mayúscula
        W = max(w60 + 0.62 * cap, wd * esc_r + 0.5 * cap)
    else:
        H = 1.55 * cap
        W = w60 + 0.5 * cap
    s1 = 0.075 * cap   # filete de afuera
    g = 0.05 * cap     # luz entre filetes
    s2 = 0.03 * cap    # filete de adentro
    r = 0.06 * cap     # esquina, la de un timbre de goma
    partes = []
    if fondo:
        partes.append(f'<rect width="{W:.1f}" height="{H:.1f}" fill="{fondo}"/>')
    partes.append(f'<rect x="{s1/2:.1f}" y="{s1/2:.1f}" width="{W - s1:.1f}" height="{H - s1:.1f}" rx="{r:.1f}" fill="none" stroke="{color}" stroke-width="{s1:.1f}"/>')
    o = s1 + g + s2 / 2
    partes.append(f'<rect x="{o:.1f}" y="{o:.1f}" width="{W - 2*o:.1f}" height="{H - 2*o:.1f}" rx="{r/2:.1f}" fill="none" stroke="{color}" stroke-width="{s2:.1f}"/>')
    if completo:
        # bandas: SESENTA arriba, DÍAS HÁBILES abajo, separadas del 60 por un filete fino
        banda = 0.36 * cap
        y1 = o + banda
        y2 = H - o - banda
        partes.append(f'<line x1="{o:.1f}" y1="{y1:.1f}" x2="{W - o:.1f}" y2="{y1:.1f}" stroke="{color}" stroke-width="{s2:.1f}"/>')
        partes.append(f'<line x1="{o:.1f}" y1="{y2:.1f}" x2="{W - o:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{s2:.1f}"/>')
        for dtxt, wtxt, ybase in ((ds, ws, o + banda / 2 + cap * esc_r / 2), (dd, wd, H - o - banda / 2 + cap * esc_r / 2)):
            partes.append(f'<path fill="{color}" transform="translate({(W - wtxt * esc_r) / 2:.1f} {ybase:.1f}) scale({esc_r})" d="{dtxt}"/>')
        alto60 = y2 - y1
        esc60 = (alto60 - 0.2 * cap) / cap
        esc60 = min(esc60, 1)
        partes.append(f'<path fill="{color}" transform="translate({(W - w60 * esc60) / 2:.1f} {y1 + (alto60 + cap * esc60) / 2:.1f}) scale({esc60:.3f})" d="{d60}"/>')
    else:
        esc60 = 1
        partes.append(f'<path fill="{color}" transform="translate({(W - w60) / 2:.1f} {(H + cap) / 2:.1f})" d="{d60}"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {H:.1f}" role="img" aria-label="Sello 60 de Sesenta">'
           + ''.join(partes) + '</svg>\n')
    open(os.path.join(SALIDA, nombre), 'w').write(svg)
    return W, H


def firma(color, nombre):
    """Sello simple + palabra, con la palabra a la altura del 60."""
    d60, w60 = texto('60', tracking=-20)
    dp, wp = texto('SESENTA', tracking=-8)
    H = 1.55 * cap
    W1 = w60 + 0.5 * cap
    s1, g, s2, r = 0.075 * cap, 0.05 * cap, 0.03 * cap, 0.06 * cap
    o = s1 + g + s2 / 2
    sep = 0.42 * cap
    W = W1 + sep + wp
    p = []
    p.append(f'<rect x="{s1/2:.1f}" y="{s1/2:.1f}" width="{W1 - s1:.1f}" height="{H - s1:.1f}" rx="{r:.1f}" fill="none" stroke="{color}" stroke-width="{s1:.1f}"/>')
    p.append(f'<rect x="{o:.1f}" y="{o:.1f}" width="{W1 - 2*o:.1f}" height="{H - 2*o:.1f}" rx="{r/2:.1f}" fill="none" stroke="{color}" stroke-width="{s2:.1f}"/>')
    p.append(f'<path fill="{color}" transform="translate({(W1 - w60) / 2:.1f} {(H + cap) / 2:.1f})" d="{d60}"/>')
    p.append(f'<path fill="{color}" transform="translate({W1 + sep:.1f} {(H + cap) / 2:.1f})" d="{dp}"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {H:.1f}" role="img" aria-label="Sesenta">' + ''.join(p) + '</svg>\n')
    open(os.path.join(SALIDA, nombre), 'w').write(svg)


def simbolo(px, nombre, destino=SALIDA):
    """Ícono cuadrado: azul con el 60 blanco. A 16 px sin filete (no se lee), a 32 con un filete."""
    d60, w60 = texto('60', tracking=-30 if px <= 16 else -20)
    L = 100.0
    esc = (L * (0.86 if px <= 16 else 0.66)) / w60
    p = [f'<rect width="{L}" height="{L}" rx="{L*0.08:.1f}" fill="{AZUL}"/>']
    if px > 16:
        p.append(f'<rect x="7" y="7" width="86" height="86" rx="4" fill="none" stroke="{BLANCO}" stroke-width="4"/>')
    alto = cap * esc
    p.append(f'<path fill="{BLANCO}" transform="translate({(L - w60 * esc) / 2:.2f} {(L + alto) / 2:.2f}) scale({esc:.4f})" d="{d60}"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="{px}" height="{px}">' + ''.join(p) + '</svg>\n'
    open(os.path.join(destino, nombre), 'w').write(svg)


os.makedirs(SALIDA, exist_ok=True)
for c, n in ((BLANCO, 'blanco'), (TINTA, 'tinta'), (AZUL, 'azul')):
    palabra(c, f'sesenta-palabra-{n}.svg')
    sello(c, f'sesenta-sello-{n}.svg', completo=True)
    sello(c, f'sesenta-sello-simple-{n}.svg', completo=False)
for c, n in ((BLANCO, 'blanco'), (TINTA, 'tinta'), (AZUL, 'azul')):
    firma(c, f'sesenta-firma-{n}.svg')
for px in (512, 32, 16):
    simbolo(px, f'sesenta-60-{px}.svg')
simbolo(32, 'favicon.svg', destino=SITIO)
print('cap', cap, 'upm', upm, 'kern T-A', KERN(cmap[ord('T')], cmap[ord('A')]), 'kern 6-0', KERN(cmap[ord('6')], cmap[ord('0')]))
print(sorted(os.listdir(SALIDA)))
