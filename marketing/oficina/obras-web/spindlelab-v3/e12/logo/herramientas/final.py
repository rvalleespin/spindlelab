"""E12 · logo final de SpindleLab · camino 2, «El huso» (Bruno, 19-oct-2026).

Uso:  python3 -I final.py <dir-logo> [<google-sans-flex.woff2>]
      (dir-logo = marketing/oficina/obras-web/spindlelab-v3/e12/logo; sin la letra, la baja de Google Fonts)

Escribe en <dir-logo>/final/ los SVG del logo en sus tres cortes, el signo, el favicon en SVG y
construccion-final.json. Los PNG, el .ico y la lámina los hace final-render.mjs con estos SVG.

Lo que se decidió y por qué (detalle en final/README.md y en logo/caminos.md §11):
  · La tortera es un disco con canto: una superelipse (hombros un 8 % más llenos que la elipse) para la cara de
    arriba, una banda debajo para el canto y un filete negativo entre las dos. Es la variante «v2-disco» de la prueba
    de la tortera (final/prueba-tortera/): la que mejor esquivó alfiler, cerradura y seta sin abrir una lectura
    peor (la «v8», con la vara por delante de la tortera, se leyó como daga).
  · Tres cortes por tamaño, porque lo que se ve cambia con el tamaño (lo mismo que hace el eje opsz de la letra):
      grande   ≥ 40 px de alto: el dibujo entero, con el filete.
      menu     18 a 39 px: el mismo, sin el filete (a 24 px mide 0,4 px y solo ensucia la tortera).
      pequeno  12 a 17 px: Google Sans Flex en opsz 12 (más ancha y abierta), tortera pegada a la vara y sin punta,
               interletra +8: a esos tamaños la punta convertía la «i» en una «t» o una cruz (lectura fría).
  · Monocromo: blanco #FFFFFF sobre #060606 y #060606 sobre blanco. Google Sans Flex wght 600, SIL OFL 1.1.
Necesita fontTools, uharfbuzz, brotli, skia-pathops y curl.
"""
import json
import math
import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import huso as H  # noqa: E402

K = H.K
LOGO = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
FINAL = os.path.join(LOGO, "final")
os.makedirs(FINAL, exist_ok=True)

BLANCO, TINTA = "#FFFFFF", "#060606"
FIJOS = {"GRAD": 0, "ROND": 0, "wdth": 100}

# La tortera de la prueba: «v2-disco» (prueba-tortera/variantes.json), tal cual se probó.
TORTERA = {"forma": "disco", "ancho": 3.2, "alto": 1.55, "canto": 0.42, "filete": 0.12, "lleno": 1.08,
           "sobre_x": 0.1, "punta": 0.8, "punta_forma": "afinada", "ancho_punta": 0.55}
CORTES = {
    "grande": {"instancia": {"opsz": 24, "wght": 600}, "tortera": TORTERA,
               "ajuste": {"tracking": -14, "pares": {"eL": -16}}, "desde_px": 40, "hasta_px": None},
    "menu": {"instancia": {"opsz": 24, "wght": 600}, "tortera": {**TORTERA, "forma": "elipse", "filete": 0},
             "ajuste": {"tracking": -14, "pares": {"eL": -16}}, "desde_px": 18, "hasta_px": 39},
    "pequeno": {"instancia": {"opsz": 12, "wght": 620},
                "tortera": {"forma": "elipse", "ancho": 2.5, "alto": 1.55, "lleno": 1.04, "sobre_x": 0.12, "punta": 0},
                "ajuste": {"tracking": 8, "pares": {"eL": -10, "pi": 4, "in": 4}}, "desde_px": 12, "hasta_px": 17},
}


def tramos(path):
    """Cuenta los tramos del contorno y los de largo cero (los que el instanciador deja en las curvas)."""
    n = cero = 0
    prev = None
    for verbo, pts in path.segments:
        if verbo in ("moveTo",):
            prev = pts[-1]
            continue
        if verbo == "closePath" or not pts:
            continue
        n += 1
        if all(abs(p[0] - prev[0]) < 1e-6 and abs(p[1] - prev[1]) < 1e-6 for p in pts):
            cero += 1
        prev = pts[-1]
    return n, cero


def distancia_minima(a, b, paso=0.5):
    """Distancia mínima entre dos contornos, muestreando sus tramos (unidades del dibujo)."""
    def muestras(p):
        out, prev = [], None
        for verbo, pts in p.segments:
            if verbo == "moveTo":
                prev = pts[-1]; out.append(prev); continue
            if verbo == "closePath" or not pts:
                continue
            ctrl = [prev] + list(pts)
            for t in [i / 24 for i in range(1, 25)]:
                if len(ctrl) == 2:
                    q = (ctrl[0][0] + (ctrl[1][0] - ctrl[0][0]) * t, ctrl[0][1] + (ctrl[1][1] - ctrl[0][1]) * t)
                else:  # de Casteljau
                    pts_ = ctrl[:]
                    while len(pts_) > 1:
                        pts_ = [(pts_[i][0] + (pts_[i + 1][0] - pts_[i][0]) * t, pts_[i][1] + (pts_[i + 1][1] - pts_[i][1]) * t) for i in range(len(pts_) - 1)]
                    q = pts_[0]
                out.append(q)
            prev = pts[-1]
        return out
    ma, mb = muestras(a), muestras(b)
    return min(math.dist(p, q) for p in ma for q in mb)


def letras_vecinas(c, P, aj):
    """Las «p» y «n» que rodean al huso, puestas como en la palabra, para medir el aire alrededor de la tortera."""
    esc = H.CAP / c.cap
    x, out = 0.0, {}
    gl = c.componer("SpindleLab")
    for k, (g, adv, xo, yo, ch) in enumerate(gl):
        if ch == "i":
            x += aj["pares"].get("pi", 0) * H.CAP / 1000
            forma, _, _ = H.huso(c, esc, x, P)
            out["huso"] = forma
            x += adv * esc + aj["tracking"] * H.CAP / 1000 + aj["pares"].get("in", 0) * H.CAP / 1000
            continue
        if ch in "pn" and ch not in out:
            out[ch] = H.glifo(c, g, esc, x + xo * esc, yo * esc)
        x += adv * esc + aj["tracking"] * H.CAP / 1000
        if k + 1 < len(gl):
            x += aj["pares"].get(ch + gl[k + 1][4], 0) * H.CAP / 1000
    return out


def favicon_svg():
    """El huso solo, en una retícula de 32 (fondo #060606): el mismo dibujo que el favicon de 16 px hecho a mano
    (favicon_16), al doble y con curvas. Cara de la tortera 20 × 8, filete de 2, canto que asoma 2 debajo, vara de
    4 de ancho y punta redonda que asoma 4 sobre la cara. Escrito en coordenadas de pantalla (y hacia abajo)."""
    cx = 16.0
    cara = H.elipse(cx, 12, 10, 4, 1.08)                                  # y de 8 a 16
    banda = H.union([H.elipse(cx, 15, 10, 4, 1.08), H.rect(cx - 10, 12, cx + 10, 15)])
    luna = H.resta(H.elipse(cx, 14, 10, 4, 1.08), cara)                  # el filete: 2 de grueso al frente
    canto = H.resta(H.resta(banda, cara), luna)
    vara = H.rect(14, 6, 18, 28)
    cabeza = H.elipse(cx, 6, 2, 2)                                        # la punta termina en y 4
    forma = H.union([vara, cabeza, cara, canto])
    sp = H.SVGPathPen(None, ntos=H._f)
    forma.draw(sp)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="SpindleLab">'
            '<title>SpindleLab</title><rect width="32" height="32" fill="#060606"/>'
            f'<path fill="#FFFFFF" d="{sp.getCommands()}"/></svg>\n')


# El favicon de 16 px, dibujado píxel a píxel: a 16 px ningún vector escalado se lee (la tortera lisa se lee cruz y el
# canto con curvas se ensucia de gris). Filas y tramos encendidos (x incluidos), más unos grises de borde a mano.
FAVICON_16 = {
    "filas": {2: [(7, 8)], 3: [(7, 8)], 4: [(4, 11)], 5: [(3, 12)], 6: [(3, 12)], 7: [(4, 11)], 8: [(7, 8)],
              9: [(4, 11)], 10: [(7, 8)], 11: [(7, 8)], 12: [(7, 8)], 13: [(7, 8)]},
    "grises": {(4, 4): 150, (11, 4): 150, (3, 5): 200, (12, 5): 200, (3, 6): 200, (12, 6): 200, (4, 7): 170,
               (11, 7): 170, (4, 9): 120, (11, 9): 120},
}


def favicon_16(ruta):
    from PIL import Image
    im = Image.new("RGB", (16, 16), (6, 6, 6))
    px = im.load()
    for y, tramos_ in FAVICON_16["filas"].items():
        for a, b in tramos_:
            for x in range(a, b + 1):
                px[x, y] = (255, 255, 255)
    for (x, y), v in FAVICON_16["grises"].items():
        px[x, y] = (v, v, v)
    im.save(ruta)


def main():
    letra = sys.argv[2] if len(sys.argv) > 2 else K.bajar(K.LETRAS["A"], tempfile.mkdtemp(prefix="logo-final-"))
    url = K.LETRAS["A"].get("url", "(archivo local: " + os.path.basename(letra) + ")")
    reg = {"fecha": "2026-10-19", "hechoPor": "Bruno (dirección creativa)",
           "letra": {"familia": "Google Sans Flex", "archivo": url, "licencia": K.LETRAS["A"]["licencia"]},
           "unidad": "altura de mayúscula = 100 unidades del SVG", "color": {"blanco": BLANCO, "tinta": TINTA},
           "cortes": {}}
    for nombre, C in CORTES.items():
        c = K.Corte(letra, {**FIJOS, **C["instancia"]})
        esc = H.CAP / c.cap
        crudo = H.nuevo()
        tp = H.TransformPen(crudo.getPen(), (esc, 0, 0, esc, 0, 0))
        for ch in "SpndleLab":
            c.gs[c.nombre(ch)].draw(tp)
        n0, cero0 = tramos(crudo)
        pal, med = H.palabra(c, C["tortera"], C["ajuste"])
        n1, cero1 = tramos(pal)
        b = pal.bounds
        ancho, alto = b[2] - b[0], b[3] - b[1]
        for color, hex_ in (("blanco", BLANCO), ("negro", TINTA)):
            open(os.path.join(FINAL, f"logo-{nombre}-{color}.svg"), "w").write(H.svg(pal, hex_))
        vec = letras_vecinas(c, C["tortera"], C["ajuste"])
        asta = c.asta() * esc
        reg["cortes"][nombre] = {
            "usar": (f"de {C['desde_px']} a {C['hasta_px']} px de alto" if C["hasta_px"] else f"desde {C['desde_px']} px de alto"),
            "instancia": {**FIJOS, **C["instancia"]}, "tortera": C["tortera"], "ajusteAMano": C["ajuste"],
            "medidas": med, "asta": round(asta, 2), "ancho": round(ancho, 1), "alto": round(alto, 1),
            "proporcion": round(ancho / alto, 3),
            "aAltoDe": {str(px): {"ancho_px": round(px * ancho / alto, 1), "asta_px": round(px * asta / alto, 2),
                                  "tortera_px": [round(px * med["tortera"][0] / alto, 1), round(px * med["tortera"][1] / alto, 1)]}
                        for px in (12, 16, 24, 40, 120)},
            "aireTorteraContra": {k: round(distancia_minima(vec["huso"], v), 2) for k, v in vec.items() if k != "huso"},
            "aireEnAstas": {k: round(distancia_minima(vec["huso"], v) / asta, 2) for k, v in vec.items() if k != "huso"},
            "contornos": {"tramosLetraInstanciada": n0, "deLargoCero": cero0, "tramosLogo": n1, "deLargoCeroEnElLogo": cero1},
            "archivos": [f"logo-{nombre}-blanco.svg", f"logo-{nombre}-negro.svg"],
        }
        if nombre == "grande":
            signo, med_s, _ = H.huso(c, esc, 0.0, C["tortera"])
            for color, hex_ in (("blanco", BLANCO), ("negro", TINTA)):
                open(os.path.join(FINAL, f"signo-{color}.svg"), "w").write(H.svg(signo, hex_, "SpindleLab"))
            sb = signo.bounds
            reg["signo"] = {"archivos": ["signo-blanco.svg", "signo-negro.svg"], "ancho": round(sb[2] - sb[0], 1),
                            "alto": round(sb[3] - sb[1], 1), "dibujo": "el huso del corte grande, solo"}
    open(os.path.join(FINAL, "favicon.svg"), "w").write(favicon_svg())
    favicon_16(os.path.join(FINAL, "favicon-16.png"))
    reg["favicon"] = {"archivos": ["favicon.svg", "favicon-16.png"], "reticula": 32,
                      "dibujo32": "cara de la tortera 20 × 8 (superelipse), filete de 2, canto que asoma 2, vara de 4 × 22, punta redonda que asoma 4 sobre la cara; fondo #060606",
                      "dibujo16": "a mano, píxel a píxel (FAVICON_16): cara de 10 × 4 px, filete de 1 px, canto de 8 × 1 px, vara de 2 px, punta de 2 × 2 px"}
    json.dump(reg, open(os.path.join(FINAL, "construccion-final.json"), "w"), ensure_ascii=False, indent=1)
    for k, v in reg["cortes"].items():
        print(k, v["usar"], v["ancho"], "x", v["alto"], "aire", v["aireEnAstas"], "contornos", v["contornos"])


if __name__ == "__main__":
    main()
