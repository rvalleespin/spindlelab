"""E12 · paso 2 · la paleta sobre el negro de Koto: contraste WCAG 2.1 de cada par de uso, y la señal.

Uso: python3 -I contraste-negro.py <salida.json>
Los valores de Koto son los medidos (paso 1 y paso 2: #060606, #141414, #202020, #2d2d2d, #989898,
#ffffff, #595959). Las transparencias se componen sobre su fondo. Para la señal se recalcula el cobalto
del brief (#0029FF) sobre #060606 y se buscan, en el mismo tono OKLCH (264,2°), las versiones más
oscuras que dan 3:1 (forma) y 4,5:1 (texto chico) contra el lienzo, con el croma máximo que cabe en sRGB.
"""
import json
import math
import sys


def lin(v):
    v /= 255
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def hx(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def lum(c):
    r, g, b = (lin(x) for x in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def k(a, b):
    la, lb = lum(a), lum(b)
    return round((max(la, lb) + 0.05) / (min(la, lb) + 0.05), 2)


def sobre(c, alfa, fondo):
    return tuple(round(c[i] * alfa + fondo[i] * (1 - alfa)) for i in range(3))


def hexa(c):
    return "#%02x%02x%02x" % c


def oklch_a_srgb(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_, m_, s_ = L + 0.3963377774 * a + 0.2158037573 * b, L - 0.1055613458 * a - 0.0638541728 * b, L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    rl = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    gl = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    def g(x):
        return 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
    out = [g(x) for x in (rl, gl, bl)]
    if any(x < -1e-4 or x > 1 + 1e-4 for x in out):
        return None
    return tuple(max(0, min(255, round(255 * x))) for x in out)


def srgb_a_oklch(c):
    r, g, b = (lin(x) for x in c)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = l ** (1 / 3), m ** (1 / 3), s ** (1 / 3)
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    return round(L, 4), round(math.hypot(a, bb), 4), round(math.degrees(math.atan2(bb, a)) % 360, 1)


LIENZO, PLACA, PLACA2, LINEA = hx("#060606"), hx("#141414"), hx("#202020"), hx("#2d2d2d")
BLANCO, GRIS, APAGADO, CC = hx("#ffffff"), hx("#989898"), hx("#595959"), hx("#cccccc")
pares = []
def par(nombre, t, f, minimo, nota=""):
    pares.append({"par": nombre, "texto": hexa(t), "fondo": hexa(f), "contraste": k(t, f), "minimo": minimo, "aprueba": k(t, f) >= minimo, "nota": nota})

for nf, f in (("lienzo #060606", LIENZO), ("placa #141414", PLACA), ("placa activa #202020", PLACA2)):
    par(f"blanco sobre {nf}", BLANCO, f, 4.5)
    par(f"gris #989898 sobre {nf}", GRIS, f, 4.5)
    par(f"#595959 sobre {nf}", APAGADO, f, 4.5, "el apagado de Koto: no se toma")
par("blanco al 70 % (nav en reposo) sobre lienzo", sobre(BLANCO, 0.7, LIENZO), LIENZO, 4.5)
par("#cccccc (rótulo de tarjeta) sobre placa", CC, PLACA, 4.5)
par("línea #2d2d2d contra lienzo (borde de sección)", LINEA, LIENZO, 1.0, "decorativa: separa, no informa")
par("blanco al 10 % contra lienzo (separador)", sobre(BLANCO, 0.10, LIENZO), LIENZO, 1.0, "decorativa")
par("placa contra lienzo (forma)", PLACA, LIENZO, 1.0, "Koto: la placa no lleva información por su borde")
# el velo del índice: negro al 70 % sobre una pieza; qué le pasa a un blanco y a un color de campo
for nombre, c in (("blanco de un campo", BLANCO), ("crema de un campo #f1f0eb", hx("#f1f0eb")), ("magenta de un campo #ff00c4", hx("#ff00c4"))):
    v = sobre(LIENZO, 0.7, c)
    pares.append({"par": f"velo del índice (negro al 70 %) sobre {nombre}", "resultado": hexa(v), "contraVsLienzo": k(v, LIENZO), "nota": "lo que queda de un campo cuando otra pieza tiene el mouse"})
# campos claros y de color: el texto horneado en la pieza (estimado en pixeles.py) y el texto de interfaz si cayera encima
for nombre, f in (("campo blanco #ffffff", BLANCO), ("campo crema #f1f0eb", hx("#f1f0eb")), ("campo verde claro #eaf1ea", hx("#eaf1ea"))):
    par(f"lienzo #060606 como texto sobre {nombre}", LIENZO, f, 4.5, "solo dentro de la pieza (texto de la pieza)")
    par(f"gris #989898 sobre {nombre}", GRIS, f, 4.5, "por qué ningún texto de la interfaz va sobre un campo claro")
# la señal
cob = hx("#0029FF")
senal = {"cobaltoDelBrief": {"hex": "#0029ff", "oklch": srgb_a_oklch(cob), "contraLienzo": k(cob, LIENZO), "contraPlaca": k(cob, PLACA), "blancoSobreEl": k(BLANCO, cob), "lienzoSobreEl": k(LIENZO, cob)}}
H = srgb_a_oklch(cob)[2]
candidatos = []
for objetivo in (3.0, 4.5, 7.0):
    mejor = None
    for Li in range(300, 1000):
        L = Li / 1000
        cmax = None
        for Ci in range(400, 0, -1):
            c = oklch_a_srgb(L, Ci / 1000, H)
            if c:
                cmax = (Ci / 1000, c)
                break
        if not cmax:
            continue
        if k(cmax[1], LIENZO) >= objetivo:
            mejor = (L, cmax)
            break
    if mejor:
        L, (C, c) = mejor
        candidatos.append({"objetivoContraLienzo": objetivo, "hex": hexa(c), "oklch": [L, C, H], "contraLienzo": k(c, LIENZO), "contraPlaca": k(c, PLACA), "blancoSobreEl": k(BLANCO, c), "lienzoSobreEl": k(LIENZO, c)})
senal["mismoTonoMasClaro"] = candidatos
senal["blancoComoSenal"] = {"nota": "Koto: lo activo es blanco y lo que reposa, gris; la sección activa suma un punto blanco de 3 px", "blancoContraLienzo": k(BLANCO, LIENZO), "grisContraLienzo": k(GRIS, LIENZO), "blancoContraGris": k(BLANCO, GRIS)}
json.dump({"metodo": __doc__.strip(), "pares": pares, "senal": senal}, open(sys.argv[1], "w"), ensure_ascii=False, indent=1)
for p in pares:
    print(p)
print(json.dumps(senal, ensure_ascii=False, indent=1))
