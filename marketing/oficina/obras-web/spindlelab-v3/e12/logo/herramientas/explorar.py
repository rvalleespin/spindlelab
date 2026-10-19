"""E12 · logo final · la prueba de la tortera: dibuja las variantes y arma la hoja para mirarlas.

Uso: python3 -I explorar.py <dir-logo> <letra.woff2> <dir-salida>
Deja en <dir-salida>: <variante>-signo.svg, <variante>-palabra.svg (blanco) y hoja.html (todas, a varias escalas).
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import huso as H  # noqa: E402

LOGO, LETRA, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT, exist_ok=True)

# Las variantes. «camino» es la de la compuerta 2 (caminos.md §4), redibujada con estos mismos parámetros.
# Todas las que se dibujaron, en el orden en que se probaron (19-oct). Las que llevan «lector» en LEIDAS pasaron por
# la lectura fría (lector-frio.py, dos lectores cada una); las otras se descartaron mirándolas (final/README.md).
VARIANTES = {
    # vuelta 1
    "v0-camino": {"forma": "elipse", "ancho": 2.9, "alto": 1.7, "sobre_x": -0.425, "punta": 0.35, "punta_forma": "recta", "ancho_punta": 1.0},
    "v1-lente": {"forma": "lente", "ancho": 3.4, "alto": 1.15, "sobre_x": 0.15, "punta": 0.95, "punta_forma": "afinada", "ancho_punta": 0.5},
    "v2-disco": {"forma": "disco", "ancho": 3.2, "alto": 1.55, "canto": 0.42, "filete": 0.12, "lleno": 1.08, "sobre_x": 0.1, "punta": 0.8, "punta_forma": "afinada", "ancho_punta": 0.55},
    "v3-lente-recta": {"forma": "lente", "ancho": 3.2, "alto": 1.25, "sobre_x": 0.1, "punta": 0.75, "punta_forma": "recta", "ancho_punta": 1.0},
    "v4-plana": {"forma": "elipse", "ancho": 3.0, "alto": 1.15, "lleno": 1.12, "sobre_x": 0.15, "punta": 0.9, "punta_forma": "afinada", "ancho_punta": 0.55},
    # vuelta 2: la vara por delante o por detrás de la tortera
    "v5-cruce": {"forma": "elipse", "ancho": 3.0, "alto": 1.3, "lleno": 1.06, "sobre_x": 0.0, "punta": 0.5, "punta_forma": "afinada", "ancho_punta": 0.8, "cruce": "vara_delante", "hueco": 0.13},
    "v6-canto": {"forma": "elipse", "ancho": 3.0, "alto": 1.3, "lleno": 1.06, "sobre_x": 0.0, "punta": 0.5, "punta_forma": "afinada", "ancho_punta": 0.8, "cruce": "tortera_delante", "hueco": 0.13},
    "v7-refinado": {"forma": "elipse", "ancho": 3.0, "alto": 1.35, "lleno": 1.06, "sobre_x": -0.1, "punta": 0.5, "punta_forma": "afinada", "ancho_punta": 0.8},
    # vuelta 3: la vara por delante, afinando la punta
    "v5a-alto": {"forma": "elipse", "ancho": 3.0, "alto": 1.3, "lleno": 1.06, "sobre_x": 0.1, "punta": 0.5, "punta_forma": "afinada", "ancho_punta": 0.8, "cruce": "vara_delante", "hueco": 0.13},
    "v5b-aguja": {"forma": "elipse", "ancho": 3.0, "alto": 1.3, "lleno": 1.06, "sobre_x": 0.1, "punta": 0.6, "punta_forma": "afinada", "ancho_punta": 0.55, "cruce": "vara_delante", "hueco": 0.13},
    "v5c-lente": {"forma": "lente", "ancho": 3.2, "alto": 1.2, "sobre_x": 0.1, "punta": 0.5, "punta_forma": "afinada", "ancho_punta": 0.8, "cruce": "vara_delante", "hueco": 0.13},
    "v5d-plano": {"forma": "elipse", "ancho": 3.1, "alto": 1.1, "lleno": 1.1, "sobre_x": 0.15, "punta": 0.5, "punta_forma": "afinada", "ancho_punta": 0.8, "cruce": "vara_delante", "hueco": 0.13},
    "v8-ojiva": {"forma": "elipse", "ancho": 3.0, "alto": 1.3, "lleno": 1.06, "sobre_x": 0.1, "punta": 0.75, "punta_forma": "ojiva", "agudeza": 0.6, "cruce": "vara_delante", "hueco": 0.13},
    "v8b-ojiva-corta": {"forma": "elipse", "ancho": 3.0, "alto": 1.3, "lleno": 1.06, "sobre_x": 0.1, "punta": 0.6, "punta_forma": "ojiva", "agudeza": 0.4, "cruce": "vara_delante", "hueco": 0.13},
    # vuelta 4: el disco con canto, con punta de aguja
    "v9-disco-aguja": {"forma": "disco", "ancho": 3.2, "alto": 1.5, "canto": 0.42, "filete": 0.13, "lleno": 1.08, "sobre_x": 0.1, "punta": 0.85, "punta_forma": "ojiva", "agudeza": 0.7, "ancho_punta": 0.5},
    "v9b-disco-aguja-corta": {"forma": "disco", "ancho": 3.1, "alto": 1.45, "canto": 0.4, "filete": 0.13, "lleno": 1.08, "sobre_x": 0.1, "punta": 0.7, "punta_forma": "ojiva", "agudeza": 0.6, "ancho_punta": 0.55},
    "v9c-disco-ancho": {"forma": "disco", "ancho": 3.4, "alto": 1.45, "canto": 0.42, "filete": 0.13, "lleno": 1.1, "sobre_x": 0.1, "punta": 0.8, "punta_forma": "ojiva", "agudeza": 0.7, "ancho_punta": 0.5},
}
LEIDAS = ["v0-camino", "v2-disco", "v8-ojiva", "v9b-disco-aguja-corta"]
AJ = {"tracking": -14, "pares": {"pi": 0, "in": 0, "eL": -16}}
AJ_CAMINO = {"tracking": -14, "pares": {"pi": 6, "in": 6, "eL": -16}}

c = H.K.Corte(LETRA, {"opsz": 24, "GRAD": 0, "ROND": 0, "wdth": 100, "wght": 600})
esc = H.CAP / c.cap
reg = {}
for nombre, P in VARIANTES.items():
    signo, med, _ = H.huso(c, esc, 0.0, P)
    pal, _ = H.palabra(c, P, AJ_CAMINO if nombre == "v0-camino" else AJ)
    open(os.path.join(OUT, f"{nombre}-signo.svg"), "w").write(H.svg(signo, "#FFFFFF", "signo"))
    open(os.path.join(OUT, f"{nombre}-palabra.svg"), "w").write(H.svg(pal, "#FFFFFF"))
    b = pal.bounds
    reg[nombre] = {"parametros": P, "medidas": med, "palabra": {"ancho": round(b[2] - b[0], 1), "alto": round(b[3] - b[1], 1)}}
json.dump(reg, open(os.path.join(OUT, "variantes.json"), "w"), ensure_ascii=False, indent=1)

filas = []
for nombre in VARIANTES:
    s, p = f"{nombre}-signo.svg", f"{nombre}-palabra.svg"
    filas.append(f"""<section><h2>{nombre}</h2><div class=f>
<img src="{s}" style="height:220px"><img src="{s}" style="height:48px"><img src="{s}" style="height:32px"><img src="{s}" style="height:16px">
<img src="{p}" style="height:120px"><div class=ch><img src="{p}" style="height:24px"><img src="{p}" style="height:16px"><img src="{p}" style="height:12px"></div>
<div class=ch blanco><img src="{p}" style="height:24px;filter:invert(1)"><img src="{p}" style="height:16px;filter:invert(1)"><img src="{p}" style="height:12px;filter:invert(1)"></div></div></section>""")
open(os.path.join(OUT, "hoja.html"), "w").write("""<!doctype html><meta charset=utf-8><style>
body{margin:0;background:#060606;color:#999;font:12px monospace;padding:16px}section{margin-bottom:18px}h2{font:12px monospace;margin:0 0 6px}
.f{display:flex;align-items:flex-end;gap:28px}.ch{display:flex;flex-direction:column;gap:10px;padding:10px}.ch[blanco]{background:#fff}img{display:block}
</style>""" + "".join(filas))
print(json.dumps(reg, ensure_ascii=False, indent=1)[:3000])
