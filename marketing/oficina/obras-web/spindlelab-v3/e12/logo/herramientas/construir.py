"""E12 · logo · construye los tres caminos de wordmark de SpindleLab en SVG, a partir de letras libres.

Uso:  python3 -I construir.py <dir-logo>
      (dir-logo = marketing/oficina/obras-web/spindlelab-v3/e12/logo)

Qué hace, por camino y por dirección (A = Google Sans Flex, B = Mona Sans):
  1. Instancia la letra variable en el corte del camino (fontTools.varLib.instancer).
  2. Compone la palabra con HarfBuzz (uharfbuzz: avances y kerning del archivo) y suma el ajuste de espaciado
     escrito a mano en AJUSTES (es lo único «a ojo», y queda anotado).
  3. Saca los contornos con fontTools y los escribe ya transformados (sin <text>, sin letra cargada): el SVG es
     solo trazados, así no depende de que el navegador tenga la letra.
  4. Camino 2: reemplaza la «i» por un huso dibujado aquí (vara + tortera), con el asta de la propia letra.
     Camino 3: «Spindle» en la letra de la dirección y «Lab» en DM Mono 500 (la mono que comparten A y B),
     a la misma altura de mayúscula y con el mismo grueso de asta.
  5. Escribe cada wordmark en blanco (#FFFFFF, para el lienzo negro) y en negro (#060606, para blanco), y un
     favicon por camino en una retícula de 32 (se ve a 32 y a 16 px), con su fondo #060606.
  6. Deja `construccion.json` con cada número: instancia, alto de mayúscula, asta, ancho, alto y proporción.

Letras (las tres SIL OFL 1.1; licencias copiadas en fuentes/, de las que bajó Javiera en el paso 1):
  Google Sans Flex · Copyright 2015 The Google Sans Flex Authors · fuentes/OFL-google-sans-flex.txt
  Mona Sans · Copyright (c) 2023, GitHub, nombre reservado «Mona Sans» · fuentes/OFL-mona-sans.txt
  DM Mono · Copyright 2020 The DM Mono Project Authors · fuentes/OFL-dm-mono.txt
La OFL permite usar los contornos en un logo; lo que no permite es vender el archivo de la letra ni
distribuir una versión modificada con el nombre reservado. Aquí no se distribuye ninguna letra modificada:
se distribuyen dibujos (trazados) hechos a partir de ella.

Las letras de Google Fonts se bajan con curl por el proxy del entorno a un temporal (no se guardan en el repo,
salvo DM Mono, que es chica y la usan las láminas). Necesita fontTools, uharfbuzz, brotli y curl.
"""
import io
import json
import math
import os
import re
import subprocess
import sys
import tempfile

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import DecomposingRecordingPen, RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

LOGO = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
FUENTES = os.path.join(LOGO, "fuentes")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36"

TINTA = "#060606"   # el lienzo de Koto, y la tinta sobre blanco
BLANCO = "#FFFFFF"

# Altura de mayúscula en unidades del SVG: todo se escala a esto, así los tres caminos se comparan igual.
CAP = 100.0

LETRAS = {
    "A": {
        "familia": "Google Sans Flex",
        "css": "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wdth,wght,GRAD,ROND@6..144,25..151,1..1000,0..100,0..100&display=swap",
        "archivo": "google-sans-flex-latin.woff2",
        "licencia": "SIL OFL 1.1 · Copyright 2015 The Google Sans Flex Authors · fuentes/OFL-google-sans-flex.txt (https://github.com/google/fonts/blob/main/ofl/googlesansflex/OFL.txt)",
        # opsz 24: el tamaño en que el logo vive (el menú); ROND y GRAD en 0, el dibujo de fábrica
        "fijos": {"opsz": 24, "GRAD": 0, "ROND": 0, "wdth": 100},
    },
    "B": {
        "familia": "Mona Sans",
        "css": "https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&display=swap",
        "archivo": "mona-sans-latin.woff2",
        "licencia": "SIL OFL 1.1, nombre reservado «Mona Sans» · Copyright (c) 2023, GitHub · fuentes/OFL-mona-sans.txt (https://github.com/github/mona-sans/blob/main/LICENSE)",
        "fijos": {"wdth": 100},
    },
}
MONO = {
    "familia": "DM Mono",
    "archivo": "dm-mono-500-latin.woff2",
    "licencia": "SIL OFL 1.1 · Copyright 2020 The DM Mono Project Authors · fuentes/OFL-dm-mono.txt (https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt)",
}

# Espaciado escrito a mano, en milésimas de la altura de mayúscula (+ abre, − cierra), por par de letras.
# Es lo único que no sale del archivo de la letra; cada número se miró en la lámina a 24 px y en grande.
AJUSTES = {
    "camino-1-la-palabra": {"tracking": -10, "pares": {"A": {"eL": -14}, "B": {"eL": -12}}},
    "camino-2-el-huso": {"tracking": -14, "pares": {"A": {"pi": 6, "in": 6, "eL": -16}, "B": {"pi": 6, "in": 6, "eL": -14}}},
    "camino-3-dos-cortes": {"tracking": -8, "huecoMono": 10, "pares": {"A": {}, "B": {}}},
}
# Corte de cada camino. Camino 1: el peso del texto (A&P: el logo en el único peso de la casa, 400).
# Camino 2: más pesado que la interfaz, como el de Koto (asta/mayúscula 0,18 medido contra un cuerpo de 350).
# Camino 3: el peso cuya asta iguala la de «LAB» (DM Mono 500 puesta a la altura de la x): se calcula.
PESOS = {
    "camino-1-la-palabra": {"A": 430, "B": 430},
    "camino-2-el-huso": {"A": 600, "B": 600},
    "camino-3-dos-cortes": {"A": "igual_a_mono", "B": "igual_a_mono"},
}


def curl(url, dest, ua=None):
    cmd = ["curl", "-sS", "--retry", "3", "--max-time", "120", "-o", dest, url]
    if ua:
        cmd[1:1] = ["-A", ua]
    for _ in range(4):
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode == 0 and os.path.exists(dest) and os.path.getsize(dest) > 1000:
            return dest
    raise RuntimeError(f"no bajó {url}: {r.stderr}")


def bajar(letra, tmp):
    """Baja la letra variable de Google Fonts (tramo latin, el que trae a-z A-Z) a un temporal. No se guarda en
    el repo: pesa (Google Sans Flex, 763 kB) y lo que se entrega son los trazados."""
    css = curl(letra["css"], os.path.join(tmp, "f.css"), UA)
    t = open(css).read()
    m = re.search(r"/\*\s*latin\s*\*/\s*@font-face\s*{([^}]*)}", t)
    url = re.search(r"url\((https://[^)]+)\)", m.group(1)).group(1)
    letra["url"] = url                     # queda en construccion.json: la versión exacta que se usó
    return curl(url, os.path.join(tmp, letra["archivo"]))


def ttf_bytes(font):
    b = io.BytesIO()
    f = font
    f.flavor = None
    f.save(b)
    return b.getvalue()


class Corte:
    """Una letra en un corte fijo: el archivo instanciado (contornos) y HarfBuzz (avances y kerning)."""

    def __init__(self, ruta, ubic=None):
        self.ruta = ruta
        self.ubic = dict(ubic or {})
        base = TTFont(ruta)
        if "fvar" in base and self.ubic:
            ejes = {a.axisTag for a in base["fvar"].axes}
            self.ubic = {k: v for k, v in self.ubic.items() if k in ejes}
            self.font = instancer.instantiateVariableFont(base, self.ubic)
        else:
            self.font = base
        self.gs = self.font.getGlyphSet()
        self.orden = self.font.getGlyphOrder()
        self.cmap = self.font.getBestCmap()
        self.upm = self.font["head"].unitsPerEm
        self.cap = self.caja("H")[3]
        data = ttf_bytes(TTFont(ruta))
        self.hbfont = hb.Font(hb.Face(data))
        if self.ubic:
            self.hbfont.set_variations({k: float(v) for k, v in self.ubic.items()})

    def nombre(self, ch):
        return self.cmap[ord(ch)]

    def caja(self, ch_o_nombre):
        g = ch_o_nombre if len(ch_o_nombre) > 1 else self.nombre(ch_o_nombre)
        bp = BoundsPen(self.gs)
        self.gs[g].draw(bp)
        return bp.bounds

    def asta(self):
        """Grueso del asta vertical: ancho de la «l» sin cola en las sans; en la mono, el asta de la «L»
        medida en el contorno (la «l» de DM Mono tiene pie)."""
        return asta_vertical(self, "l") if self.cmap.get(ord("l")) and not esmono(self) else asta_vertical(self, "L")

    def componer(self, texto):
        buf = hb.Buffer()
        buf.add_str(texto)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": False})
        return [(self.orden[i.codepoint], p.x_advance, p.x_offset, p.y_offset, texto[i.cluster])
                for i, p in zip(buf.glyph_infos, buf.glyph_positions)]


def esmono(c):
    return c.font["post"].isFixedPitch or "Mono" in (c.font["name"].getDebugName(1) or "")


def asta_vertical(c, ch):
    """Mide el asta vertical en el contorno: corta la letra a media altura de mayúscula y toma el tramo
    lleno más a la izquierda (para «l» y «L», es el asta)."""
    rec = DecomposingRecordingPen(c.gs)
    c.gs[c.nombre(ch)].draw(rec)
    y = c.cap * 0.5
    xs = []
    actual = None
    for op, pts in rec.value:
        if op == "moveTo":
            actual = pts[0]
            inicio = pts[0]
        elif op in ("lineTo", "qCurveTo", "curveTo"):
            seg = [actual] + list(pts)
            # se aproxima cada tramo por su polilínea de control (las astas son rectas: alcanza)
            for a, b in zip(seg, seg[1:]):
                if (a[1] - y) * (b[1] - y) < 0:
                    xs.append(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]))
            actual = pts[-1]
        elif op == "closePath":
            if actual and inicio and (actual[1] - y) * (inicio[1] - y) < 0:
                xs.append(actual[0] + (y - actual[1]) * (inicio[0] - actual[0]) / (inicio[1] - actual[1]))
    xs.sort()
    return xs[1] - xs[0] if len(xs) >= 2 else None


def trazo(c, nombre, esc, dx, dy=0.0):
    """Contorno de un glifo como 'd' de SVG, ya escalado, volteado (y hacia abajo) y movido."""
    sp = SVGPathPen(c.gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    tp = TransformPen(sp, (esc, 0, 0, -esc, dx, dy))
    c.gs[nombre].draw(tp)
    return sp.getCommands()


def caja_glifo(c, nombre, esc, dx, dy=0.0):
    bp = BoundsPen(c.gs)
    c.gs[nombre].draw(bp)
    if not bp.bounds:
        return None
    x0, y0, x1, y1 = bp.bounds
    return (dx + x0 * esc, dy - y1 * esc, dx + x1 * esc, dy - y0 * esc)


def elipse(cx, cy, rx, ry):
    k = 0.5522847498
    f = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")
    return (f"M{f(cx + rx)} {f(cy)}C{f(cx + rx)} {f(cy + k * ry)} {f(cx + k * rx)} {f(cy + ry)} {f(cx)} {f(cy + ry)}"
            f"C{f(cx - k * rx)} {f(cy + ry)} {f(cx - rx)} {f(cy + k * ry)} {f(cx - rx)} {f(cy)}"
            f"C{f(cx - rx)} {f(cy - k * ry)} {f(cx - k * rx)} {f(cy - ry)} {f(cx)} {f(cy - ry)}"
            f"C{f(cx + k * rx)} {f(cy - ry)} {f(cx + rx)} {f(cy - k * ry)} {f(cx + rx)} {f(cy)}Z")


def rect(x0, y0, x1, y1):
    f = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")
    # mismo sentido de giro que la elipse de arriba (horario en pantalla), para que se sumen con nonzero
    return f"M{f(x1)} {f(y0)}L{f(x1)} {f(y1)}L{f(x0)} {f(y1)}L{f(x0)} {f(y0)}Z"


def huso(c, esc, dx):
    """La «i» como huso: la vara es el asta de la «i» que sigue de largo y atraviesa la tortera (el punto,
    achatado y ensanchado en un disco visto de canto), y asoma un poco por encima, como la punta de un huso
    de tortera alta. Devuelve los trazados, la caja y las medidas, en unidades del SVG."""
    rec = DecomposingRecordingPen(c.gs)   # la «i» suele ser compuesta (i sin punto + punto)
    c.gs[c.nombre("i")].draw(rec)
    contornos, cur = [], []
    for op, pts in rec.value:
        cur.append((op, pts))
        if op in ("closePath", "endPath"):
            contornos.append(cur)
            cur = []
    cajas = []
    for ct in contornos:
        p = RecordingPen()
        for op, pts in ct:
            getattr(p, op)(*pts)
        bp = BoundsPen(None)
        p.replay(bp)
        cajas.append(bp.bounds)
    asta = min(cajas, key=lambda b: b[1])          # la que toca la línea de base
    punto = max(cajas, key=lambda b: b[1])          # la de arriba
    sx0, _, sx1, _ = asta
    grueso = sx1 - sx0
    cx = (sx0 + sx1) / 2
    xh = c.caja("x")[3]
    # La tortera es un disco visto un poco desde arriba (una lente gorda: 2,9 astas de ancho, 1,7 de alto),
    # sentado sobre la altura de la x, donde termina el asta de la «i». La vara la atraviesa y asoma un tercio
    # de asta por encima. Probado el 17-oct en tres vueltas: con un disco plano y la vara larga arriba se leía
    # «†», y con la punta de media asta, a 24 px y en el favicon, todavía; con un tercio, la punta se ve en
    # grande y a 24 px se funde en el disco.
    rx = 1.45 * grueso
    ry = 0.85 * grueso
    cy = xh + 0.50 * ry
    punta = cy + ry + 0.35 * grueso
    # a unidades del SVG (y hacia abajo)
    X = lambda v: dx + v * esc
    Y = lambda v: -v * esc
    d = rect(X(sx0), Y(punta), X(sx1), Y(0)) + elipse(X(cx), Y(cy), rx * esc, ry * esc)
    caja = (X(cx - rx), Y(punta), X(cx + rx), Y(0))
    medidas = {"asta": grueso * esc, "tortera_ancho": 2 * rx * esc, "tortera_alto": 2 * ry * esc,
               "centro_tortera_sobre_base": cy * esc, "punta_sobre_base": punta * esc,
               "punto_original_arriba": punto[3] * esc, "altura_x": xh * esc}
    return d, caja, medidas, (cx - rx, cx + rx, sx0, sx1)


def svg(d_list, caja, color, titulo="SpindleLab", pad=0.0, fondo=None):
    x0, y0, x1, y1 = caja
    x0 -= pad; y0 -= pad; x1 += pad; y1 += pad
    w, h = x1 - x0, y1 - y0
    f = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")
    cuerpo = "".join(f'<path d="{d}"/>' for d in d_list)
    bg = f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(w)}" height="{f(h)}" fill="{fondo}"/>' if fondo else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(w)} {f(h)}" role="img" '
            f'aria-label="{titulo}"><title>{titulo}</title>{bg}<g fill="{color}">{cuerpo}</g></svg>\n')


def palabra(c, texto, esc, x, tracking, pares, letra):
    """Pone `texto` desde x; devuelve trazados, cajas de tinta por letra y la x final (avance)."""
    out, cajas = [], []
    glifos = c.componer(texto)
    for k, (g, adv, xo, yo, ch) in enumerate(glifos):
        d = trazo(c, g, esc, x + xo * esc, -yo * esc)
        if d:
            out.append(d)
        cajas.append((ch, caja_glifo(c, g, esc, x + xo * esc, -yo * esc)))
        x += adv * esc + tracking * CAP / 1000
        if k + 1 < len(glifos):
            par = ch + glifos[k + 1][4]
            x += pares.get(par, 0) * CAP / 1000
    return out, cajas, x


def union(cajas):
    cs = [b for b in cajas if b]
    return (min(b[0] for b in cs), min(b[1] for b in cs), max(b[2] for b in cs), max(b[3] for b in cs))


def construir_camino(clave, dirx, c, mono, registro):
    aj = AJUSTES[clave]
    pares = aj["pares"][dirx]
    esc = CAP / c.cap
    trazos, cajas, medidas = [], [], {}
    if clave == "camino-1-la-palabra":
        t, cj, _ = palabra(c, "SpindleLab", esc, 0.0, aj["tracking"], pares, dirx)
        trazos += t; cajas += [b for _, b in cj]
    elif clave == "camino-2-el-huso":
        t, cj, x = palabra(c, "Sp", esc, 0.0, aj["tracking"], pares, dirx)
        trazos += t; cajas += [b for _, b in cj]
        x += pares.get("pi", 0) * CAP / 1000
        # la «i» de la letra se reemplaza por el huso, en el mismo avance (el espaciado no cambia)
        g_i = c.nombre("i")
        d, caja, medidas, (tx0, tx1, sx0, sx1) = huso(c, esc, x)
        trazos.append(d); cajas.append(caja)
        x += c.gs[g_i].width * esc + aj["tracking"] * CAP / 1000 + pares.get("in", 0) * CAP / 1000
        t, cj, _ = palabra(c, "ndleLab", esc, x, aj["tracking"], pares, dirx)
        trazos += t; cajas += [b for _, b in cj]
        medidas["tortera_sobre_avance_i"] = round((tx1 - tx0) / c.gs[g_i].width, 3)
    elif clave == "camino-3-dos-cortes":
        t, cj, x = palabra(c, "Spindle", esc, 0.0, aj["tracking"], pares, dirx)
        trazos += t; cajas += [b for _, b in cj]
        # «LAB» en DM Mono 500, en mayúsculas y con la mayúscula a la altura de la x de la sans: es el rótulo
        # del sitio (DM Mono 500 en mayúsculas, interletra +0,03em, lock §6.3) puesto dentro del nombre.
        xh = c.caja("x")[3] * esc
        escm = xh / mono.cap
        # hueco entre la «e» y la «L»: el de la propia sans entre «e» y «l», más el ajuste de AJUSTES
        ref = c.componer("el")
        e_caja = caja_glifo(c, ref[0][0], esc, 0)
        l_caja = caja_glifo(c, ref[1][0], esc, ref[0][1] * esc + aj["tracking"] * CAP / 1000)
        hueco = l_caja[0] - e_caja[2] + aj.get("huecoMono", 0) * CAP / 1000
        e_fin = cj[-1][1][2]                      # borde derecho de la tinta de la última «e»
        gl = mono.componer("LAB")
        L_lsb = BoundsPen(mono.gs); mono.gs[gl[0][0]].draw(L_lsb)
        xm = e_fin + hueco - L_lsb.bounds[0] * escm
        interletra = 0.03 * mono.upm * escm       # +0,03em, el del rótulo
        for g, adv, xo, yo, ch in gl:
            d = trazo(mono, g, escm, xm + xo * escm, -yo * escm)
            trazos.append(d)
            cajas.append(caja_glifo(mono, g, escm, xm + xo * escm, -yo * escm))
            xm += adv * escm + interletra
        medidas["hueco_e_L"] = round(hueco, 2)
        medidas["mayuscula_mono"] = round(mono.cap * escm, 2)
        medidas["asta_mono"] = round(mono.asta() * escm, 2)
        medidas["altura_x_sans"] = round(xh, 2)

    caja = union(cajas)
    asta = c.asta() * esc
    w, h = caja[2] - caja[0], caja[3] - caja[1]
    registro.update({
        "letra": LETRAS[dirx]["familia"], "archivo": LETRAS[dirx].get("url"), "instancia": c.ubic, "licencia": LETRAS[dirx]["licencia"],
        "altoMayuscula": CAP, "asta": round(asta, 2), "astaSobreMayuscula": round(asta / CAP, 3),
        "ancho": round(w, 2), "alto": round(h, 2), "proporcion": round(w / h, 3),
        "aAltoDe24px": {"ancho_px": round(24 * w / h, 1), "mayuscula_px": round(24 * CAP / h, 1), "asta_px": round(24 * asta / h, 2)},
        **({"medidas": {k: round(v, 3) if isinstance(v, float) else v for k, v in medidas.items()}} if medidas else {}),
        "ajustesAMano": {"trackingMilesimasDeMayuscula": aj["tracking"], "pares": pares},
    })
    if clave == "camino-3-dos-cortes":
        registro["letraLab"] = {"letra": MONO["familia"] + " 500", "licencia": MONO["licencia"]}
    return trazos, caja


# ---------- favicons, en una retícula de 32 (2 unidades = 1 px a 16) ----------

def favicon_letras(partes, alto_mayus, color=BLANCO, fondo=TINTA, lado=32.0):
    """partes: [(Corte, texto)] puestas una tras otra, centradas en el cuadrado, a `alto_mayus` unidades de
    mayúscula. Devuelve el SVG del favicon."""
    trazos, cajas, x = [], [], 0.0
    for c, texto, extra in partes:
        esc = alto_mayus / c.cap
        for g, adv, xo, yo, ch in c.componer(texto):
            trazos.append(trazo(c, g, esc, x + xo * esc, 0))
            cajas.append(caja_glifo(c, g, esc, x + xo * esc, 0))
            x += adv * esc + extra
    b = union(cajas)
    w, h = b[2] - b[0], b[3] - b[1]
    dx = (lado - w) / 2 - b[0]
    dy = (lado - h) / 2 - b[1]
    f = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")
    cuerpo = "".join(f'<path d="{d}" transform="translate({f(dx)} {f(dy)})"/>' for d in trazos)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(lado)} {int(lado)}">'
            f'<rect width="{int(lado)}" height="{int(lado)}" fill="{fondo}"/><g fill="{color}">{cuerpo}</g></svg>\n'), {"ancho": round(w, 2), "alto": round(h, 2)}


def favicon_s_lab(c, mono, color=BLANCO, fondo=TINTA, lado=32.0):
    """Camino 3: «S» de la sans con mayúscula de 20 unidades y, a su derecha, la «L» de DM Mono con la
    mayúscula a la altura de la x de esa «S» (la misma relación que en la palabra), centradas."""
    cap = 20.0
    esc = cap / c.cap
    xh = c.caja("x")[3] * esc
    escm = xh / mono.cap
    gS = c.nombre("S"); gL = mono.nombre("L")
    bS = caja_glifo(c, gS, esc, 0)
    bL0 = caja_glifo(mono, gL, escm, 0)
    hueco = 1.6
    dxL = bS[2] + hueco - bL0[0]
    trazos = [trazo(c, gS, esc, 0), trazo(mono, gL, escm, dxL)]
    b = union([bS, caja_glifo(mono, gL, escm, dxL)])
    w, h = b[2] - b[0], b[3] - b[1]
    dx = (lado - w) / 2 - b[0]
    dy = (lado - h) / 2 - b[1]
    f = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")
    cuerpo = "".join(f'<path d="{d}" transform="translate({f(dx)} {f(dy)})"/>' for d in trazos)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(lado)} {int(lado)}">'
            f'<rect width="{int(lado)}" height="{int(lado)}" fill="{fondo}"/><g fill="{color}">{cuerpo}</g></svg>\n'), {"ancho": round(w, 2), "alto": round(h, 2), "mayuscula_S": cap, "mayuscula_L": round(xh, 2)}


def favicon_huso(color=BLANCO, fondo=TINTA):
    """El huso solo, en la retícula de 32: vara de 4 unidades (2 px a 16) de y 4 a y 29; tortera de 16 × 10
    (8 × 5 px a 16) centrada en y 11; la vara asoma 2 unidades (1 px) por encima. Probado contra una tortera
    plana de 12 × 7 con la punta de 2 px, que a 16 px se leía como una cruz («†»)."""
    vara = rect(14, 4, 18, 29)
    tortera = elipse(16, 11, 8, 5)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="{fondo}"/>'
            f'<g fill="{color}"><path d="{vara}"/><path d="{tortera}"/></g></svg>\n')


def main():
    tmp = tempfile.mkdtemp(prefix="logo-e12-")
    reg = {"fecha": "2026-10-17", "unidad": "altura de mayúscula = 100 unidades del SVG", "caminos": {}}
    rutas = {k: bajar(v, tmp) for k, v in LETRAS.items()}
    mono = Corte(os.path.join(FUENTES, MONO["archivo"]))
    reg["dmMono500"] = {"asta": round(mono.asta() * CAP / mono.cap, 2), "astaSobreMayuscula": round(mono.asta() / mono.cap, 3)}
    for clave in AJUSTES:
        carpeta = os.path.join(LOGO, clave)
        os.makedirs(carpeta, exist_ok=True)
        reg["caminos"][clave] = {}
        for dirx in ("A", "B"):
            peso = PESOS[clave][dirx]
            if peso == "igual_a_mono":
                # busca el peso cuya asta/mayúscula iguala la de DM Mono 500 (bisección sobre el eje wght)
                lo, hi = 250.0, 700.0
                for _ in range(14):
                    mid = (lo + hi) / 2
                    cc = Corte(rutas[dirx], {**LETRAS[dirx]["fijos"], "wght": mid})
                    # el asta de «LAB» es la de DM Mono escalada a la altura de la x de este corte
                    objetivo = (mono.asta() / mono.cap) * (cc.caja("x")[3] / cc.cap)
                    if cc.asta() / cc.cap < objetivo:
                        lo = mid
                    else:
                        hi = mid
                peso = round((lo + hi) / 2)
            c = Corte(rutas[dirx], {**LETRAS[dirx]["fijos"], "wght": peso})
            r = {}
            trazos, caja = construir_camino(clave, dirx, c, mono, r)
            for nombre, color in (("blanco", BLANCO), ("negro", TINTA)):
                with open(os.path.join(carpeta, f"{clave}-{dirx}-{nombre}.svg"), "w") as fh:
                    fh.write(svg(trazos, caja, color))
            r["archivos"] = [f"{clave}-{dirx}-blanco.svg", f"{clave}-{dirx}-negro.svg"]
            reg["caminos"][clave][dirx] = r
            # favicons
            if clave == "camino-1-la-palabra":
                s, m = favicon_letras([(c, "S", 0)], 22)
                nombre = f"favicon-{dirx}.svg"
                open(os.path.join(carpeta, nombre), "w").write(s)
                r["favicon"] = {"archivo": nombre, "dibujo": "la «S» de la palabra, sola", "alto_mayuscula_32": 22, **m}
            elif clave == "camino-3-dos-cortes":
                s, m = favicon_s_lab(c, mono)
                nombre = f"favicon-{dirx}.svg"
                open(os.path.join(carpeta, nombre), "w").write(s)
                r["favicon"] = {"archivo": nombre, "dibujo": "la «S» de la sans y la «L» de la mono a la altura de su x, como en la palabra", **m}
        if clave == "camino-2-el-huso":
            open(os.path.join(carpeta, "favicon.svg"), "w").write(favicon_huso())
            reg["caminos"][clave]["favicon"] = {"archivo": "favicon.svg", "dibujo": "el huso solo: vara de 4 × 25 y tortera de 16 × 10 en una retícula de 32 (a 16 px: 2 × 12,5 y 8 × 5 px)"}
    with open(os.path.join(LOGO, "construccion.json"), "w") as fh:
        json.dump(reg, fh, ensure_ascii=False, indent=2)
    print(json.dumps(reg, ensure_ascii=False, indent=1)[:4000])


if __name__ == "__main__":
    main()
