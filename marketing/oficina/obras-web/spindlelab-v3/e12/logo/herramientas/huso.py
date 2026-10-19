"""E12 · logo final · el dibujo del huso y del wordmark, con contornos limpios (Bruno, 19-oct-2026).

Lo usan final.py (las piezas) y explorar.py (la prueba de la tortera). Unidades: altura de mayúscula = 100, y hacia
arriba, como en construir.py. Todo contorno sale unido con skia-pathops: un solo trazado por forma, sin
superposiciones ni tramos de largo cero (los que dejaba el instanciador en las curvas de la letra variable).

El huso: la vara es el asta de la «i»; sube desde la línea de base, atraviesa la tortera y asoma por arriba. Lo que
varía entre tortera y tortera está en PARAMS (forma, ancho, alto, altura, punta).
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import construir as K  # noqa: E402
import pathops  # noqa: E402
from fontTools.pens.svgPathPen import SVGPathPen  # noqa: E402
from fontTools.pens.transformPen import TransformPen  # noqa: E402
from fontTools.pens.boundsPen import BoundsPen  # noqa: E402
from fontTools.pens.recordingPen import DecomposingRecordingPen, RecordingPen  # noqa: E402

CAP = K.CAP


def _f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".") if abs(v) >= 0.005 else "0"


def nuevo():
    return pathops.Path()


def rect(x0, y0, x1, y1):
    p = nuevo(); pen = p.getPen()
    pen.moveTo((x0, y0)); pen.lineTo((x1, y0)); pen.lineTo((x1, y1)); pen.lineTo((x0, y1)); pen.closePath()
    return p


def poligono(pts):
    p = nuevo(); pen = p.getPen()
    pen.moveTo(pts[0])
    for q in pts[1:]:
        pen.lineTo(q)
    pen.closePath()
    return p


def elipse(cx, cy, rx, ry, n=1.0):
    """Superelipse aproximada con cuatro cúbicas: n = 1 es la elipse (k = 0,5523); n > 1 hombros más llenos
    (k crece), que se lee como un disco con canto y no como una bola."""
    k = 0.5522847498 * n
    p = nuevo(); pen = p.getPen()
    pen.moveTo((cx + rx, cy))
    pen.curveTo((cx + rx, cy + k * ry), (cx + k * rx, cy + ry), (cx, cy + ry))
    pen.curveTo((cx - k * rx, cy + ry), (cx - rx, cy + k * ry), (cx - rx, cy))
    pen.curveTo((cx - rx, cy - k * ry), (cx - k * rx, cy - ry), (cx, cy - ry))
    pen.curveTo((cx + k * rx, cy - ry), (cx + rx, cy - k * ry), (cx + rx, cy))
    pen.closePath()
    return p


def lente(cx, cy, rx, ry):
    """Lente de puntas: dos arcos de círculo que se juntan en (cx ± rx, cy), con flecha ry arriba y abajo. Así se
    ve una tortera de canto (bicónica): ancha, delgada y con las puntas en el ecuador, nada parecido a una bola."""
    R = (rx * rx + ry * ry) / (2 * ry)
    th = 2 * math.asin(rx / R)          # ángulo de cada arco
    p = nuevo(); pen = p.getPen()

    def arco(c, a0, a1):
        # arco de centro c, de a0 a a1 (radianes), en tramos de 90° como máximo
        pasos = max(1, math.ceil(abs(a1 - a0) / (math.pi / 2)))
        da = (a1 - a0) / pasos
        kk = 4 / 3 * math.tan(da / 4) * R
        for i in range(pasos):
            t0, t1 = a0 + i * da, a0 + (i + 1) * da
            p0 = (c[0] + R * math.cos(t0), c[1] + R * math.sin(t0))
            p3 = (c[0] + R * math.cos(t1), c[1] + R * math.sin(t1))
            p1 = (p0[0] - kk * math.sin(t0), p0[1] + kk * math.cos(t0))
            p2 = (p3[0] + kk * math.sin(t1), p3[1] - kk * math.cos(t1))
            pen.curveTo(p1, p2, p3)

    sup = (cx, cy + ry - R)   # centro del arco de arriba
    inf = (cx, cy - ry + R)   # centro del arco de abajo
    pen.moveTo((cx + rx, cy))
    arco(sup, math.pi / 2 - th / 2, math.pi / 2 + th / 2)          # arriba, de derecha a izquierda
    arco(inf, -math.pi / 2 - th / 2, -math.pi / 2 + th / 2)        # abajo, de izquierda a derecha
    pen.closePath()
    return p


def union(paths):
    out = nuevo()
    pathops.union(paths, out.getPen())
    return out


def resta(a, b):
    return pathops.op(a, b, pathops.PathOp.DIFFERENCE)


def glifo(c, nombre, esc, dx, dy=0.0):
    """El contorno de un glifo como Path de pathops, escalado y movido (y hacia arriba), sin superposiciones."""
    p = nuevo()
    tp = TransformPen(p.getPen(), (esc, 0, 0, esc, dx, dy))
    c.gs[nombre].draw(tp)
    out = nuevo()
    pathops.union([p], out.getPen())
    return out


def caja(p):
    b = p.bounds
    return b if b else None


def a_svg_d(p, alto_total):
    """Path de pathops → 'd' de SVG con y hacia abajo (y' = -y)."""
    sp = SVGPathPen(None, ntos=_f)
    p.draw(TransformPen(sp, (1, 0, 0, -1, 0, 0)))
    return sp.getCommands()


# ---------------------------------------------------------------- el huso

def huso(c, esc, dx, P):
    """La «i» como huso, con los parámetros P. Devuelve (Path, medidas). x de la vara = asta de la «i»."""
    rec = DecomposingRecordingPen(c.gs)
    c.gs[c.nombre("i")].draw(rec)
    contornos, cur = [], []
    for op, pts in rec.value:
        cur.append((op, pts))
        if op in ("closePath", "endPath"):
            contornos.append(cur); cur = []
    cajas = []
    for ct in contornos:
        rp = RecordingPen()
        for op, pts in ct:
            getattr(rp, op)(*pts)
        bp = BoundsPen(None); rp.replay(bp); cajas.append(bp.bounds)
    asta = min(cajas, key=lambda b: b[1])
    punto = max(cajas, key=lambda b: b[1])
    sx0, sx1 = dx + asta[0] * esc, dx + asta[2] * esc
    s = sx1 - sx0
    cx = (sx0 + sx1) / 2
    xh = c.caja("x")[3] * esc
    rx, ry = P["ancho"] * s / 2, P["alto"] * s / 2
    cy = xh + P["sobre_x"] * s + ry          # el borde de abajo de la tortera, sobre la x
    arriba = cy + ry
    punta = arriba + P["punta"] * s
    piezas = []
    # la vara, de la línea de base hasta donde empieza la punta (o hasta la x, si el punto va suelto)
    piezas.append(rect(sx0, 0, sx1, xh if P.get("suelto") else cy))
    # la tortera
    if P["forma"] == "elipse":
        piezas.append(elipse(cx, cy, rx, ry, P.get("lleno", 1.0)))
    elif P["forma"] == "lente":
        piezas.append(lente(cx, cy, rx, ry))
    elif P["forma"] == "disco":
        # un disco visto un poco desde arriba: la cara de arriba (elipse) y el canto (una banda abajo), con un
        # filete negativo entre los dos que solo existe en grande
        canto = P["canto"] * s
        cara = elipse(cx, cy + canto / 2, rx, ry - canto / 2, P.get("lleno", 1.0))
        base = elipse(cx, cy - canto / 2, rx, ry - canto / 2, P.get("lleno", 1.0))
        banda = union([base, rect(cx - rx, cy - canto / 2, cx + rx, cy + canto / 2)])
        piezas += [banda, cara]
    # la punta: la vara sigue sobre la tortera y se afina
    if P["punta"] > 0:
        w = P.get("ancho_punta", 1.0) * s / 2
        base_p = cy  # nace dentro de la tortera
        if P.get("punta_forma", "recta") == "recta":
            piezas.append(rect(cx - w, base_p, cx + w, punta))
        elif P["punta_forma"] == "ojiva":
            # la vara sigue recta hasta el borde de arriba de la tortera y desde ahí se cierra en una nariz convexa,
            # sin quiebre (tangente vertical al nacer, horizontal en la punta): el perfil de la punta de un huso.
            # «agudeza» (0 a 1): cuánto se afina antes de redondear la punta
            y0 = arriba
            L = punta - y0
            a_ = P.get("agudeza", 0.5)
            c1 = 0.55 + 0.25 * a_          # cuánto sube recta antes de cerrarse
            c2 = 0.55 - 0.4 * a_           # qué tan ancha llega a la punta
            hw = P.get("ancho_punta", 1.0) * s / 2      # la punta puede ser más delgada que la vara
            px0, px1 = cx - hw, cx + hw
            q = nuevo(); pen = q.getPen()
            pen.moveTo((px0, base_p)); pen.lineTo((px1, base_p)); pen.lineTo((px1, y0))
            pen.curveTo((px1, y0 + c1 * L), (cx + c2 * hw, punta), (cx, punta))
            pen.curveTo((cx - c2 * hw, punta), (px0, y0 + c1 * L), (px0, y0))
            pen.closePath()
            piezas.append(q)
        else:  # afinada: trapecio de la vara a w, con la cabeza redonda
            r = w
            piezas.append(poligono([(sx0, base_p), (sx1, base_p), (cx + w, punta - r), (cx - w, punta - r)]))
            piezas.append(elipse(cx, punta - r, w, r))
    forma = union(piezas)
    g = P.get("hueco", 0) * s
    if g > 0 and P.get("cruce") == "vara_delante":
        # la vara pasa por delante de la tortera: la tortera se corta a cada lado de la vara con un hueco g
        tort = elipse(cx, cy, rx, ry, P.get("lleno", 1.0)) if P["forma"] == "elipse" else lente(cx, cy, rx, ry)
        alas = resta(tort, rect(sx0 - g, cy - ry - 1, sx1 + g, cy + ry + 1))
        vara = rect(sx0, 0, sx1, cy)
        resto = [vara, alas]
        if P["punta"] > 0:
            resto += [p for p in piezas[2:]]
        forma = union(resto)
    elif g > 0 and P.get("cruce") == "tortera_delante":
        # la tortera tapa la vara: la vara de abajo se corta siguiendo el borde de adelante de la tortera
        tort = elipse(cx, cy, rx, ry, P.get("lleno", 1.0)) if P["forma"] == "elipse" else lente(cx, cy, rx, ry)
        sombra = resta(elipse(cx, cy - g, rx + g * 0.6, ry + g * 0.2, P.get("lleno", 1.0)) if P["forma"] == "elipse" else lente(cx, cy - g, rx, ry), tort)
        vara = resta(rect(sx0, 0, sx1, cy), sombra)
        forma = union([vara, tort] + piezas[2:])
    if P["forma"] == "disco" and P.get("filete", 0) > 0:
        # el filete: la media luna negativa bajo la cara de arriba (gruesa al frente, nula a los lados), que separa
        # la cara del canto; donde pasa la vara no se corta
        canto = P["canto"] * s
        ryc = ry - canto / 2
        cara_baja = elipse(cx, cy + canto / 2 - P["filete"] * s, rx, ryc, P.get("lleno", 1.0))
        cara = elipse(cx, cy + canto / 2, rx, ryc, P.get("lleno", 1.0))
        luna = resta(resta(cara_baja, cara), rect(sx0, cy - 50, sx1, cy + 50))
        forma = resta(forma, luna)
    med = {"asta": round(s, 2), "tortera": [round(2 * rx, 2), round(2 * ry, 2)], "tortera_en_astas": [P["ancho"], P["alto"]],
           "borde_abajo_tortera": round(cy - ry, 2), "centro_tortera": round(cy, 2), "arriba_tortera": round(arriba, 2),
           "punta": round(punta, 2), "punto_original": [round(punto[1] * esc, 2), round(punto[3] * esc, 2)],
           "altura_x": round(xh, 2), "avance_i": round(c.gs[c.nombre("i")].width * esc, 2), "cx": round(cx, 3), "vara_x": [round(sx0, 3), round(sx1, 3)]}
    return forma, med, (cx - rx, cx + rx)


def palabra(c, P, aj):
    """SpindleLab con el huso. aj: {'tracking': milésimas de la mayúscula, 'pares': {...}}. Devuelve (Path, medidas)."""
    esc = CAP / c.cap
    piezas, x, med = [], 0.0, {}
    texto = "SpindleLab"
    gl = c.componer(texto)
    for k, (g, adv, xo, yo, ch) in enumerate(gl):
        if ch == "i":
            x += aj["pares"].get("pi", 0) * CAP / 1000
            forma, med, _ = huso(c, esc, x, P)
            piezas.append(forma)
            x += adv * esc + aj["tracking"] * CAP / 1000 + aj["pares"].get("in", 0) * CAP / 1000
            continue
        piezas.append(glifo(c, g, esc, x + xo * esc, yo * esc))
        x += adv * esc + aj["tracking"] * CAP / 1000
        if k + 1 < len(gl):
            x += aj["pares"].get(ch + gl[k + 1][4], 0) * CAP / 1000
    return union(piezas), med


def svg(path, color, titulo="SpindleLab", pad=0.0, fondo=None, caja_fija=None):
    x0, y0, x1, y1 = caja_fija or path.bounds
    # a y hacia abajo
    X0, Y0, X1, Y1 = x0 - pad, -y1 - pad, x1 + pad, -y0 + pad
    w, h = X1 - X0, Y1 - Y0
    bg = f'<rect x="{_f(X0)}" y="{_f(Y0)}" width="{_f(w)}" height="{_f(h)}" fill="{fondo}"/>' if fondo else ""
    d = a_svg_d(path, 0)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{_f(X0)} {_f(Y0)} {_f(w)} {_f(h)}" role="img" '
            f'aria-label="{titulo}"><title>{titulo}</title>{bg}<path fill="{color}" d="{d}"/></svg>\n')
