"""E12 · Contraste (WCAG 2.x) de cada par de uso de la paleta del brief, y dónde cae el cobalto en el círculo de tono.

No se mira la pantalla: se calcula desde el hex, con la fórmula de WCAG 2.1 (luminancia relativa sRGB). Las
líneas con transparencia se componen sobre su fondo antes de medir. El tono se mide en OKLCH (Björn Ottosson,
matriz publicada), para comparar el cobalto con el índigo de Tailwind, que es la firma del sitio hecho por IA
(`refero-design/references/anti-ai-slop.md`, tell #1).

Uso: python3 -I contraste.py <carpeta del tablero>   →   datos/contraste.json
"""
import json
import math
import os
import sys

BASE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
os.makedirs(os.path.join(BASE, "datos"), exist_ok=True)

# Tokens del brief de Ramón (insumos-ramon-16oct.md §2), con el nombre que les da el lock
BRIEF = {
    "papel": "#F6F6F4",
    "placa": "#EFEFEA",
    "hoja": "#FFFFFF",
    "tinta": "#111111",
    "gris": "#666663",
    "senal": "#0029FF",
    "senalOscura": "#0B25B7",
}
# Lo medido en los referentes (e12/medicion/*/resumen.md)
KOTO = {"lienzo": "#060606", "placa": "#141414", "corrido": "#989898", "nombrado": "#FFFFFF", "apagado": "#595959", "filete": "#2D2D2D"}
AP = {"papel": "#F9F7F3", "negro": "#000000", "gris": "#8C8C8C", "grisAlfa": 0.8, "placa": "#ECEBE7"}
# Para ubicar el cobalto: índigo y violeta de Tailwind (tell #1) y el azul que el detector propone en su lugar
TONOS = {"indigo-500 (Tailwind)": "#6366F1", "violet-500 (Tailwind)": "#8B5CF6", "indigo-600 (Tailwind)": "#4F46E5",
         "blue-600 (Tailwind)": "#2563EB", "azul Klein (IKB, aprox.)": "#002FA7"}


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def hexa(c):
    return "#" + "".join(f"{max(0, min(255, round(v))):02X}" for v in c)


def lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def lum(h):
    r, g, b = rgb(h)
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return round((hi + 0.05) / (lo + 0.05), 2)


def sobre(color, alfa, fondo):
    c, f = rgb(color), rgb(fondo)
    return hexa(tuple(alfa * c[i] + (1 - alfa) * f[i] for i in range(3)))


def oklch(h):
    r, g, b = (lin(v) for v in rgb(h))
    l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = (math.copysign(abs(v) ** (1 / 3), v) for v in (l_, m_, s_))
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    C = math.hypot(A, B)
    H = math.degrees(math.atan2(B, A)) % 360
    return {"L": round(L, 3), "C": round(C, 3), "H": round(H, 1)}


def alfa_para(contraste, color, fondo):
    lo, hi = 0.0, 1.0
    for _ in range(40):
        mid = (lo + hi) / 2
        if ratio(sobre(color, mid, fondo), fondo) < contraste:
            lo = mid
        else:
            hi = mid
    return round((lo + hi) / 2, 3)


def gris_en_posicion(frac, fondo, tinta):
    """Gris neutro cuya claridad OKLab queda a `frac` del camino entre fondo y tinta."""
    Lf, Lt = oklch(fondo)["L"], oklch(tinta)["L"]
    meta = Lf + frac * (Lt - Lf)
    lo, hi = 0, 255
    for _ in range(30):
        mid = (lo + hi) / 2
        if oklch(hexa((mid, mid, mid - 3 * (mid / 255))))["L"] > meta:
            hi = mid
        else:
            lo = mid
    v = (lo + hi) / 2
    return hexa((v, v, v - 3 * (v / 255)))


def main():
    B = BRIEF
    pares = []

    def par(texto, fondo, uso, minimo, tipo="texto"):
        c = ratio(texto, fondo)
        pares.append({"texto": texto, "fondo": fondo, "uso": uso, "contraste": c, "minimo": minimo, "tipo": tipo, "aprueba": c >= minimo})

    for fondo, nombre in ((B["papel"], "papel"), (B["placa"], "placa"), (B["hoja"], "hoja")):
        par(B["tinta"], fondo, f"tinta sobre {nombre}: lo que se nombra, titulares, enlaces", 4.5)
        par(B["gris"], fondo, f"gris sobre {nombre}: la continuación de la frase, cuerpo corrido, rótulos", 4.5)
        par(B["senal"], fondo, f"cobalto #0029FF sobre {nombre}: dato vivo en mono 11-12 px, estado activo", 4.5)
        par(B["senalOscura"], fondo, f"cobalto oscuro #0B25B7 sobre {nombre} (la otra opción del brief)", 4.5)
    par("#FFFFFF", B["senal"], "blanco sobre cobalto: el texto del cursor (mono 11 px)", 4.5)
    par("#FFFFFF", B["senalOscura"], "blanco sobre cobalto oscuro (la otra opción)", 4.5)
    par(B["senal"], B["papel"], "el círculo del cursor y el punto activo contra el papel (no texto: 3:1)", 3.0, "forma")
    par(B["tinta"], B["papel"], "foco de teclado: contorno de 2 px en tinta (no texto: 3:1)", 3.0, "forma")
    par(B["tinta"], B["senal"], "foco sobre el círculo del cursor, si coinciden (no texto: 3:1)", 3.0, "forma")
    par(B["placa"], B["papel"], "placa contra papel: no carga información, se mide para saber cuánto se ve", 1.0, "forma")
    par(B["hoja"], B["papel"], "hoja (campo, salida del sandbox) contra papel", 1.0, "forma")

    linea = sobre(B["tinta"], 0.08, B["papel"])
    koto_filete = ratio(KOTO["filete"], KOTO["lienzo"])
    koto_sep = ratio(sobre("#FFFFFF", 0.10, KOTO["lienzo"]), KOTO["lienzo"])
    lineas = {
        "brief_08_sobre_papel": {"compuesto": linea, "contraste": ratio(linea, B["papel"])},
        "brief_08_sobre_placa": {"compuesto": sobre(B["tinta"], 0.08, B["placa"]), "contraste": ratio(sobre(B["tinta"], 0.08, B["placa"]), B["placa"])},
        "koto_filete_2d2d2d_sobre_060606": koto_filete,
        "koto_separador_blanco10_sobre_060606": koto_sep,
        "alfa_de_tinta_que_iguala_el_filete_de_koto": alfa_para(koto_filete, B["tinta"], B["papel"]),
        "alfa_de_tinta_que_iguala_el_separador_de_koto": alfa_para(koto_sep, B["tinta"], B["papel"]),
    }
    a_fil = lineas["alfa_de_tinta_que_iguala_el_filete_de_koto"]
    lineas["linea_seccion_propuesta"] = {"alfa": round(a_fil, 2), "compuesto": sobre(B["tinta"], round(a_fil, 2), B["papel"]),
                                        "contraste": ratio(sobre(B["tinta"], round(a_fil, 2), B["papel"]), B["papel"])}

    # Dónde cae el gris entre el lienzo y la tinta (claridad OKLab), en Koto y aquí
    def pos(g, f, t):
        Lg, Lf, Lt = oklch(g)["L"], oklch(f)["L"], oklch(t)["L"]
        return round((Lg - Lf) / (Lt - Lf), 3)

    dos_tintas = {
        "koto": {"gris": KOTO["corrido"], "sobre": KOTO["lienzo"], "contrasteGris": ratio(KOTO["corrido"], KOTO["lienzo"]),
                 "contrasteNombrado": ratio(KOTO["nombrado"], KOTO["lienzo"]), "posicionDelGris": pos(KOTO["corrido"], KOTO["lienzo"], KOTO["nombrado"])},
        "brief": {"gris": B["gris"], "sobre": B["papel"], "contrasteGris": ratio(B["gris"], B["papel"]),
                  "contrasteNombrado": ratio(B["tinta"], B["papel"]), "posicionDelGris": pos(B["gris"], B["papel"], B["tinta"])},
    }
    eq = gris_en_posicion(dos_tintas["koto"]["posicionDelGris"], B["papel"], B["tinta"])
    dos_tintas["grisEnLaPosicionDeKoto"] = {"hex": eq, "contraste": ratio(eq, B["papel"]), "posicion": pos(eq, B["papel"], B["tinta"])}

    referentes = {
        "koto": {k: {"hex": v, "contrasteSobreLienzo": ratio(v, KOTO["lienzo"])} for k, v in KOTO.items() if k != "lienzo"},
        "acceptAndProceed": {
            "negroSobrePapel": ratio(AP["negro"], AP["papel"]),
            "grisAl80SobrePapel": ratio(sobre(AP["gris"], AP["grisAlfa"], AP["papel"]), AP["papel"]),
            "placaContraPapel": ratio(AP["placa"], AP["papel"]),
        },
    }
    tonos = {"#0029FF (brief)": oklch(B["senal"]), "#0B25B7 (brief, opción)": oklch(B["senalOscura"])}
    tonos.update({k: oklch(v) for k, v in TONOS.items()})
    tonos["tintaYPapel"] = {"tinta": oklch(B["tinta"]), "papel": oklch(B["papel"]), "placa": oklch(B["placa"]), "gris": oklch(B["gris"])}

    out = {
        "fecha": "2026-10-16", "medidoPor": "Lucía (dirección de arte), E12",
        "metodo": "WCAG 2.1, luminancia relativa sRGB; transparencias compuestas sobre su fondo; tono en OKLCH (Ottosson).",
        "tokens": B, "pares": pares, "lineas": lineas, "dosTintas": dos_tintas, "referentes": referentes, "tonos": tonos,
    }
    json.dump(out, open(os.path.join(BASE, "datos", "contraste.json"), "w"), ensure_ascii=False, indent=1)
    for p in pares:
        print(f"{p['contraste']:6.2f} {'ok ' if p['aprueba'] else 'NO '} {p['uso']}")
    print(json.dumps({"lineas": lineas, "dosTintas": dos_tintas, "referentes": referentes, "tonos": tonos}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
