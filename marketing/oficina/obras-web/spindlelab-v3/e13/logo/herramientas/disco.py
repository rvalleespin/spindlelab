"""E13 · logo de SpindleLab, opción 2: «la i con su disco» (Bruno, 30-oct-2026).

Uso:  python3 -I disco.py <dir-logo> <google-sans-flex.woff2> [variantes]
      (dir-logo = marketing/oficina/obras-web/spindlelab-v3/e13/logo; la letra es la v23 de construccion.json,
       la misma de El huso: se baja a un temporal y no se guarda)

Sin «variantes»: escribe en <dir-logo>/ los tres cortes (grande, menú, pequeño) en blanco y negro, el de menú en
línea con fill="currentColor", el signo suelto, favicon.svg, favicon-16.png (a mano) y construccion.json.
Con «variantes»: escribe en <dir-logo>/prueba-disco/variantes/ los discos que se compararon antes de elegir.

Qué cambia contra El huso (e12/logo/final/): SOLO la «i». El resto de la palabra sale del mismo código de E12
(e12/logo/herramientas/construir.py y huso.py, que se importan sin copiar): la misma letra (Google Sans Flex v23), las
mismas instancias por corte, el mismo espaciado (−14 y el par «eL» −16; en el pequeño +8 y sus pares) y el mismo
sistema de coordenadas (altura de mayúscula = 100, línea de base en 0). Así el `d` nuevo se pega en Logo.astro sin
tocar su viewBox.

La «i»: el asta es el contorno de la propia letra (de la línea de base a la altura de x, sin la vara que asomaba ni la
tortera que la cruzaba) y el punto es un disco aplanado, centrado en el asta y separado de ella. El disco se dibuja
por corte (ver DISCOS): a 16 y 24 px tiene que leerse como el punto de una «i», y a 140 px como un disco.
"""
import json
import math
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
E12 = os.path.normpath(os.path.join(AQUI, "..", "..", "..", "e12", "logo", "herramientas"))
sys.path.insert(0, E12)
import construir as K  # noqa: E402
import huso as H  # noqa: E402
from fontTools.pens.boundsPen import BoundsPen  # noqa: E402
from fontTools.pens.recordingPen import DecomposingRecordingPen, RecordingPen  # noqa: E402
from fontTools.pens.transformPen import TransformPen  # noqa: E402

BLANCO, TINTA = "#FFFFFF", "#060606"
FIJOS = {"GRAD": 0, "ROND": 0, "wdth": 100}
LETRA_URL = "https://fonts.gstatic.com/s/googlesansflex/v23/t5t2IQcYNIWbFgDgAAzZ34auoVyXkJCOjsOqNGFbN5hF8LG572o.woff2"
# El viewBox de src/components/a/Logo.astro (El huso, corte menú). El `d` nuevo vive en las mismas coordenadas.
VB_SITIO = (3.34, -117.02, 716.32, 147.01)

# El disco, en astas (el grueso del asta de la propia «i»): ancho y alto, y dónde va: «arriba» es su borde de arriba en
# unidades (la línea de las ascendentes de d, l, L y b es 100) o «hueco» es el aire entre el asta y el disco, en astas.
# «lleno»: 1 = elipse; > 1, hombros más llenos, que se lee como disco y no como grano de arroz. Por corte (elegidos en
# prueba-disco/, ver README):
DISCOS = {
    # ≥ 40 px: aquí el disco tiene que notarse como disco: el doble de ancho que el asta y plano (2,7 : 1). Su borde de
    # arriba toca la línea de las ascendentes, con 0,6 de compensación por ser redondo (la letra compensa 2,33 en la «o»
    # y la «S»; el disco es casi plano arriba y necesita menos).
    "grande": {"ancho": 2.0, "alto": 0.74, "arriba": 100.6, "lleno": 1.06},
    # 18 a 39 px (24 en el encabezado): aquí manda que se lea como el punto de una «i». Más angosto y más alto que el
    # grande (1,8 : 1), para que no se lea como una raya (ī). Mismo borde de arriba que el grande.
    "menu": {"ancho": 1.62, "alto": 0.9, "arriba": 100.6, "lleno": 1.06},
    # 12 a 17 px: casi el punto de la letra (1,45 : 1), algo más grande que el punto redondo de la letra para que a 12 px
    # llene dos filas de píxeles, con el aire que la letra le da a su punto en opsz 12 y sobre las ascendentes, como el
    # punto original: a estos tamaños manda que el punto se vea y no se pegue al asta. (Ronda 1 de la lectura fría: con
    # 1,5 × 0,9 un lector vio a 12 px «una ı sin punto».)
    "pequeno": {"ancho": 1.6, "alto": 1.1, "hueco": 0.64, "lleno": 1.04},
}
CORTES = {
    "grande": {"instancia": {"opsz": 24, "wght": 600}, "ajuste": {"tracking": -14, "pares": {"eL": -16}},
               "desde_px": 40, "hasta_px": None},
    "menu": {"instancia": {"opsz": 24, "wght": 600}, "ajuste": {"tracking": -14, "pares": {"eL": -16}},
             "desde_px": 18, "hasta_px": 39},
    "pequeno": {"instancia": {"opsz": 12, "wght": 620}, "ajuste": {"tracking": 8, "pares": {"eL": -10, "pi": 4, "in": 4}},
                "desde_px": 12, "hasta_px": 17},
}

# Las que se compararon antes de elegir (prueba-disco/). «maqueta» es la del 30-oct (logo-i-disco.svg: rx 17, ry 6,5,
# centro a 91,5): 34 × 13 unidades = 1,84 × 0,70 astas, hueco 13,31 = 0,72 astas, elipse. Las «elegido-*» son DISCOS.
VARIANTES = {
    "maqueta": {"ancho": 34 / 18.5, "alto": 13 / 18.5, "hueco": 13.31 / 18.5, "lleno": 1.0},
    "punto-letra": None,  # la «i» de la letra tal cual (el punto redondo de Google Sans Flex), como referencia
    "elegido-menu": DISCOS["menu"],
    "menu-mas-redondo": {"ancho": 1.5, "alto": 0.96, "arriba": 100.6, "lleno": 1.06},
    "elegido-grande": DISCOS["grande"],
    "grande-mas-bajo": {"ancho": 2.0, "alto": 0.74, "hueco": 0.66, "lleno": 1.06},
    "grande-arriba-S": {"ancho": 2.0, "alto": 0.74, "arriba": 102.33, "lleno": 1.06},
    "grande-mas-plano": {"ancho": 2.16, "alto": 0.66, "arriba": 100.6, "lleno": 1.06},
    "grande-elipse": {"ancho": 2.0, "alto": 0.74, "arriba": 100.6, "lleno": 1.0},
    "elegido-pequeno": DISCOS["pequeno"],
    "pequeno-ronda-1": {"ancho": 1.5, "alto": 0.9, "hueco": 0.68, "lleno": 1.04},
    "pequeno-redondo": {"ancho": 1.36, "alto": 1.0, "hueco": 0.68, "lleno": 1.04},
    "pequeno-160x105": {"ancho": 1.6, "alto": 1.05, "hueco": 0.68, "lleno": 1.04},
}
# Los favicons de 16 que se dibujaron (prueba-disco/favicon-16-candidatos.png, de izquierda a derecha en este orden).
# «d» fue el de la ronda 1 de la lectura fría; los dos lectores vieron su disco «medio rectangular, con puntas
# borrosas» y el hueco «achicado», y uno leyó ahí un clavo. «f» = FAVICON_16 es el elegido.
_ASTA = lambda a, b: {y: [(6, 9)] for y in range(a, b + 1)}
FAVICON_16_CANDIDATOS = {
    "a": {"filas": {2: [(5, 9)], 3: [(5, 9)], **{y: [(6, 8)] for y in range(6, 14)}},
          "grises": {(4, 2): 150, (10, 2): 150, (4, 3): 150, (10, 3): 150}},
    "b": {"filas": {2: [(5, 10)], 3: [(5, 10)], **_ASTA(6, 13)}, "grises": {(4, 2): 160, (11, 2): 160, (4, 3): 160, (11, 3): 160}},
    "c": {"filas": {2: [(6, 9)], 3: [(4, 11)], 4: [(6, 9)], **_ASTA(7, 13)}, "grises": {(5, 2): 170, (10, 2): 170, (5, 4): 170, (10, 4): 170}},
    "d": {"filas": {2: [(6, 9)], 3: [(5, 10)], 4: [(6, 9)], **_ASTA(7, 13)},
          "grises": {(5, 2): 110, (10, 2): 110, (5, 4): 110, (10, 4): 110, (4, 3): 130, (11, 3): 130}},
    "e": {"filas": {3: [(5, 10)], 4: [(5, 10)], **_ASTA(7, 13)}, "grises": {(4, 3): 120, (11, 3): 120, (4, 4): 120, (11, 4): 120}},
    "f": None,  # FAVICON_16
    "h": {"filas": {1: [(6, 9)], 2: [(5, 10)], 3: [(6, 9)], **_ASTA(7, 14)}, "grises": {(5, 1): 60, (10, 1): 60, (5, 3): 60, (10, 3): 60}},
    "j": {"filas": {2: [(6, 9)], 3: [(5, 10)], 4: [(6, 9)], **_ASTA(7, 14)},
          "grises": {(5, 2): 90, (10, 2): 90, (5, 4): 90, (10, 4): 90, (4, 3): 80, (11, 3): 80}},
}


def contornos_i(c):
    """Los dos contornos de la «i» de la letra (asta y punto), cada uno con su caja, en unidades de la letra."""
    rec = DecomposingRecordingPen(c.gs)
    c.gs[c.nombre("i")].draw(rec)
    out, cur = [], []
    for op, pts in rec.value:
        cur.append((op, pts))
        if op in ("closePath", "endPath"):
            rp = RecordingPen()
            for o, p in cur:
                getattr(rp, o)(*p)
            bp = BoundsPen(None)
            rp.replay(bp)
            out.append((rp, bp.bounds))
            cur = []
    asta = min(out, key=lambda t: t[1][1])
    punto = max(out, key=lambda t: t[1][1])
    return asta, punto


def i_disco(c, esc, dx, D):
    """La «i» con su disco. D = DISCOS[corte] (en astas), o None para la «i» de la letra tal cual."""
    (asta_rp, ab), (punto_rp, pb) = contornos_i(c)
    p = H.nuevo()
    asta_rp.replay(TransformPen(p.getPen(), (esc, 0, 0, esc, dx, 0)))
    asta = H.union([p])
    sx0, sx1 = dx + ab[0] * esc, dx + ab[2] * esc
    s = sx1 - sx0
    cx = (sx0 + sx1) / 2
    xh = ab[3] * esc
    med = {"asta": round(s, 2), "altura_x": round(xh, 2), "cx": round(cx, 3), "asta_x": [round(sx0, 2), round(sx1, 2)],
           "punto_letra": {"x": [round(dx + pb[0] * esc, 2), round(dx + pb[2] * esc, 2)],
                           "y": [round(pb[1] * esc, 2), round(pb[3] * esc, 2)]}}
    if D is None:
        q = H.nuevo()
        punto_rp.replay(TransformPen(q.getPen(), (esc, 0, 0, esc, dx, 0)))
        return H.union([asta, q]), med
    w, h = D["ancho"] * s, D["alto"] * s
    abajo = D["arriba"] - h if "arriba" in D else xh + D["hueco"] * s
    g = abajo - xh
    disco = H.elipse(cx, abajo + h / 2, w / 2, h / 2, D.get("lleno", 1.0))
    med.update({"disco": [round(w, 2), round(h, 2)], "disco_en_astas": [D["ancho"], D["alto"]],
                "hueco": round(g, 2), "hueco_en_astas": round(g / s, 3), "disco_abajo": round(abajo, 2),
                "disco_centro": round(abajo + h / 2, 2), "disco_arriba": round(abajo + h, 2), "lleno": D.get("lleno", 1.0)})
    return H.union([asta, disco]), med


def palabra(c, D, aj):
    """SpindleLab con la «i» de disco. Mismo recorrido que huso.palabra (E12): solo cambia la «i»."""
    esc = H.CAP / c.cap
    piezas, x, med = [], 0.0, {}
    gl = c.componer("SpindleLab")
    for k, (g, adv, xo, yo, ch) in enumerate(gl):
        if ch == "i":
            x += aj["pares"].get("pi", 0) * H.CAP / 1000
            forma, med = i_disco(c, esc, x, D)
            piezas.append(forma)
            x += adv * esc + aj["tracking"] * H.CAP / 1000 + aj["pares"].get("in", 0) * H.CAP / 1000
            continue
        piezas.append(H.glifo(c, g, esc, x + xo * esc, yo * esc))
        x += adv * esc + aj["tracking"] * H.CAP / 1000
        if k + 1 < len(gl):
            x += aj["pares"].get(ch + gl[k + 1][4], 0) * H.CAP / 1000
    return H.union(piezas), med


def svg_linea(path):
    """El corte menú para pegar en línea: un solo <path>, fill="currentColor", con el viewBox de Logo.astro."""
    vb = " ".join(H._f(v) for v in VB_SITIO)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="SpindleLab">'
            f'<title>SpindleLab</title><path fill="currentColor" d="{H.a_svg_d(path, 0)}"/></svg>\n')


def svg_caja(path, color, caja, titulo="SpindleLab"):
    """El SVG en una caja dada (x0, y0, x1, y1 con y hacia arriba): para comparar con El huso en su misma caja."""
    return H.svg(path, color, titulo, caja_fija=caja)


def aire(c, D, aj):
    """Aire mínimo entre el disco y sus vecinas («p» y «n»), y entre el disco y el asta, en unidades y en astas."""
    esc = H.CAP / c.cap
    x = 0.0
    gl = c.componer("SpindleLab")
    vec, med = {}, None
    for k, (g, adv, xo, yo, ch) in enumerate(gl):
        if ch == "i":
            x += aj["pares"].get("pi", 0) * H.CAP / 1000
            _, med = i_disco(c, esc, x, D)
            x += adv * esc + aj["tracking"] * H.CAP / 1000 + aj["pares"].get("in", 0) * H.CAP / 1000
            continue
        if ch in "pn" and ch not in vec:
            vec[ch] = H.glifo(c, g, esc, x + xo * esc, yo * esc)
        x += adv * esc + aj["tracking"] * H.CAP / 1000
        if k + 1 < len(gl):
            x += aj["pares"].get(ch + gl[k + 1][4], 0) * H.CAP / 1000
    w, h = med["disco"]
    disco = H.elipse(med["cx"], med["disco_centro"], w / 2, h / 2, D.get("lleno", 1.0))
    s = med["asta"]
    out = {}
    for k_, v in vec.items():
        d = distancia(disco, v)
        out[k_] = {"unidades": round(d, 2), "astas": round(d / s, 2)}
    return out


def distancia(a, b):
    return min(math.dist(p, q) for p in muestras(a) for q in muestras(b))


def muestras(p):
    out, prev = [], None
    for verbo, pts in p.segments:
        if verbo == "moveTo":
            prev = pts[-1]
            out.append(prev)
            continue
        if verbo == "closePath" or not pts:
            continue
        ctrl = [prev] + list(pts)
        for t in [i / 24 for i in range(1, 25)]:
            q = ctrl[:]
            while len(q) > 1:
                q = [(q[i][0] + (q[i + 1][0] - q[i][0]) * t, q[i][1] + (q[i + 1][1] - q[i][1]) * t) for i in range(len(q) - 1)]
            out.append(q[0])
        prev = pts[-1]
    return out


def tramos(path):
    n = cero = 0
    prev = None
    for verbo, pts in path.segments:
        if verbo == "moveTo":
            prev = pts[-1]
            continue
        if verbo == "closePath" or not pts:
            continue
        n += 1
        if all(abs(p[0] - prev[0]) < 1e-6 and abs(p[1] - prev[1]) < 1e-6 for p in pts):
            cero += 1
        prev = pts[-1]
    return n, cero


# ---------------------------------------------------------------- favicon

def favicon_svg():
    """El signo en una retícula de 32 (fondo #060606): el de 16 a mano, al doble y con curvas. Asta de 8 × 16 (x 12 a
    20, y 14 a 30), hueco de 6 y disco de 13,2 × 6 (superelipse 1,06, x 9,4 a 22,6, y 2 a 8). En coordenadas de
    pantalla; el conjunto va de y 2 a 30, centrado."""
    asta = H.rect(12, 14, 20, 30)
    disco = H.elipse(16, 5, 6.6, 3, 1.06)
    forma = H.union([asta, disco])
    sp = H.SVGPathPen(None, ntos=H._f)
    forma.draw(sp)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="SpindleLab">'
            '<title>SpindleLab</title><rect width="32" height="32" fill="#060606"/>'
            f'<path fill="#FFFFFF" d="{sp.getCommands()}"/></svg>\n')


# El de 16 px, píxel a píxel (candidato «f»): asta de 4 × 8 (columnas 6 a 9, filas 7 a 14), hueco de 3 filas (4 a 6) y
# disco de 3 filas: 4 blancos, 6 y 4, con un gris 100 en cada esquina, para que se lea ovalado y no como una raya ni
# como un rectángulo. Ocupa las filas 1 a 14 y las columnas 5 a 10: centrado en la retícula de 16.
FAVICON_16 = {
    "filas": {1: [(6, 9)], 2: [(5, 10)], 3: [(6, 9)], **_ASTA(7, 14)},
    "grises": {(5, 1): 100, (10, 1): 100, (5, 3): 100, (10, 3): 100},
}


def favicon_16(ruta, dibujo=FAVICON_16):
    from PIL import Image
    im = Image.new("RGB", (16, 16), (6, 6, 6))
    px = im.load()
    for y, tr in dibujo["filas"].items():
        for a, b in tr:
            for x in range(a, b + 1):
                px[x, y] = (255, 255, 255)
    for (x, y), v in dibujo["grises"].items():
        px[x, y] = (v, v, v)
    im.save(ruta)


# ---------------------------------------------------------------- main

def variantes(dir_logo, letra):
    out = os.path.join(dir_logo, "prueba-disco", "variantes")
    os.makedirs(out, exist_ok=True)
    reg = {}
    for corte in ("menu", "grande", "pequeno"):
        C = CORTES[corte]
        c = K.Corte(letra, {**FIJOS, **C["instancia"]})
        hechas = {n: palabra(c, D, C["ajuste"]) for n, D in VARIANTES.items()}
        if corte == "pequeno":   # otra letra (opsz 12), más ancha: una caja común a todas sus variantes
            bs = [p.bounds for p, _ in hechas.values()]
            caja = (min(b[0] for b in bs), min(b[1] for b in bs), max(b[2] for b in bs), max(b[3] for b in bs))
        else:                    # la caja del sitio: la letra mide lo mismo que hoy en el encabezado
            caja = sitio_caja()
        for nombre, (pal, med) in hechas.items():
            for color, hex_ in (("blanco", BLANCO), ("negro", TINTA)):
                open(os.path.join(out, f"{corte}--{nombre}-{color}.svg"), "w").write(svg_caja(pal, hex_, caja))
            reg[f"{corte}--{nombre}"] = {"disco": VARIANTES[nombre], "medidas": med, "caja": [round(v, 2) for v in caja]}
    json.dump(reg, open(os.path.join(out, "variantes.json"), "w"), ensure_ascii=False, indent=1)
    # los favicons de 16 candidatos: ×10 arriba y a tamaño real abajo, en el lienzo y en una pestaña clara
    from PIL import Image
    hoja = Image.new("RGB", (len(FAVICON_16_CANDIDATOS) * 180 + 20, 230), (6, 6, 6))
    for k, (nombre, dib) in enumerate(FAVICON_16_CANDIDATOS.items()):
        ruta = os.path.join(out, f"favicon-16-{nombre}.png")
        favicon_16(ruta, dib or FAVICON_16)
        im = Image.open(ruta)
        hoja.paste(im.resize((160, 160), Image.NEAREST), (20 + k * 180, 20))
        hoja.paste(im, (20 + k * 180, 196))
        pest = Image.new("RGB", (48, 24), (241, 243, 244))
        pest.paste(im, (4, 4))
        hoja.paste(pest, (60 + k * 180, 192))
        os.remove(ruta)
    hoja.save(os.path.join(dir_logo, "prueba-disco", "favicon-16-candidatos.png"))
    print(len(reg), "variantes en", out)


def sitio_caja():
    x, y, w, h = VB_SITIO
    return (x, -(y + h), x + w, -y)   # a y hacia arriba


def main():
    dir_logo = os.path.abspath(sys.argv[1])
    letra = sys.argv[2]
    if len(sys.argv) > 3 and sys.argv[3] == "variantes":
        return variantes(dir_logo, letra)
    os.makedirs(dir_logo, exist_ok=True)
    reg = {"fecha": "2026-10-30", "hechoPor": "Bruno (dirección creativa)",
           "decision": "Ramón, 30-oct: opción 2, «la i con su disco» («logo 2 por ahora»)",
           "letra": {"familia": "Google Sans Flex", "archivo": LETRA_URL,
                     "licencia": "SIL OFL 1.1 · Copyright 2015 The Google Sans Flex Authors · OFL-google-sans-flex.txt"},
           "unidad": "altura de mayúscula = 100 unidades del SVG; línea de base en 0",
           "color": {"blanco": BLANCO, "tinta": TINTA}, "viewBoxSitio": " ".join(H._f(v) for v in VB_SITIO),
           "cortes": {}}
    for nombre, C in CORTES.items():
        c = K.Corte(letra, {**FIJOS, **C["instancia"]})
        D = DISCOS[nombre]
        pal, med = palabra(c, D, C["ajuste"])
        n1, cero1 = tramos(pal)
        b = pal.bounds
        ancho, alto = b[2] - b[0], b[3] - b[1]
        for color, hex_ in (("blanco", BLANCO), ("negro", TINTA)):
            open(os.path.join(dir_logo, f"logo-{nombre}-{color}.svg"), "w").write(H.svg(pal, hex_))
        archivos = [f"logo-{nombre}-blanco.svg", f"logo-{nombre}-negro.svg"]
        if nombre == "menu":
            open(os.path.join(dir_logo, "logo-menu-linea.svg"), "w").write(svg_linea(pal))
            archivos.append("logo-menu-linea.svg")
        s = med["asta"]
        reg["cortes"][nombre] = {
            "usar": (f"de {C['desde_px']} a {C['hasta_px']} px de alto" if C["hasta_px"] else f"desde {C['desde_px']} px de alto"),
            "instancia": {**FIJOS, **C["instancia"]}, "ajusteAMano": C["ajuste"], "disco": D, "medidas": med,
            "caja": [round(v, 2) for v in b], "ancho": round(ancho, 2), "alto": round(alto, 2),
            "proporcion": round(ancho / alto, 3),
            "aAltoDe": {str(px): {"ancho_px": round(px * ancho / alto, 1), "asta_px": round(px * s / alto, 2),
                                  "disco_px": [round(px * med["disco"][0] / alto, 2), round(px * med["disco"][1] / alto, 2)],
                                  "hueco_px": round(px * med["hueco"] / alto, 2)}
                        for px in (12, 16, 20, 24, 39, 48, 140)},
            "enElViewBoxDelSitio": {str(px): {"disco_px": [round(px * med["disco"][0] / VB_SITIO[3], 2), round(px * med["disco"][1] / VB_SITIO[3], 2)],
                                              "hueco_px": round(px * med["hueco"] / VB_SITIO[3], 2),
                                              "asta_px": round(px * s / VB_SITIO[3], 2)} for px in (20, 24, 39)},
            "aireDisco": aire(c, D, C["ajuste"]),
            "contornos": {"tramos": n1, "deLargoCero": cero1, "paths": 1},
            "archivos": archivos,
        }
        if nombre == "grande":
            signo, med_s = i_disco(c, H.CAP / c.cap, 0.0, D)
            for color, hex_ in (("blanco", BLANCO), ("negro", TINTA)):
                open(os.path.join(dir_logo, f"signo-{color}.svg"), "w").write(H.svg(signo, hex_, "SpindleLab"))
            sb = signo.bounds
            reg["signo"] = {"archivos": ["signo-blanco.svg", "signo-negro.svg"], "ancho": round(sb[2] - sb[0], 2),
                            "alto": round(sb[3] - sb[1], 2), "dibujo": "la «i» del corte grande, sola: asta y disco"}
    open(os.path.join(dir_logo, "favicon.svg"), "w").write(favicon_svg())
    favicon_16(os.path.join(dir_logo, "favicon-16.png"))
    reg["favicon"] = {"archivos": ["favicon.svg", "favicon-16.png"], "reticula": 32,
                      "dibujo32": "asta de 8 × 16 (x 12 a 20, y 14 a 30), hueco de 6, disco de 13,2 × 6 (superelipse 1,06, x 9,4 a 22,6, y 2 a 8); fondo #060606",
                      "dibujo16": "a mano, píxel a píxel (FAVICON_16, candidato «f»): asta de 4 × 8, hueco de 3 filas, disco de 3 filas (4, 6 y 4 blancos, gris 100 en las esquinas)",
                      "favicon16": FAVICON_16 | {"grises": {f"{x},{y}": v for (x, y), v in FAVICON_16["grises"].items()}}}
    json.dump(reg, open(os.path.join(dir_logo, "construccion.json"), "w"), ensure_ascii=False, indent=1)
    for k, v in reg["cortes"].items():
        print(k, v["usar"], v["ancho"], "x", v["alto"], "disco", v["medidas"]["disco"], "hueco", v["medidas"]["hueco"],
              "arriba", v["medidas"]["disco_arriba"], "aire", v["aireDisco"], "tramos", v["contornos"])


if __name__ == "__main__":
    main()
