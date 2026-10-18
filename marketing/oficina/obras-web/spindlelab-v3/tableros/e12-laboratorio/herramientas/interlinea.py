#!/usr/bin/env python3
"""E12 · La interlínea del cuerpo de cada dirección, medida en el archivo de letra que usa (lock-koto.md §6.4).

Lucía, 18-oct-2026 (acta del paso 2, defecto 6). Koto escribe el cuerpo a 16 / 1,25 con GT Kotoheim, cuya x mide
0,654 de la mayúscula en el corte del cuerpo (wdth 100 · wght 350; `datos/letras.json`, «referencias.cuerpo», medido
el 16-oct por `letras.py`). Una letra con la x más alta, a igual interlínea, se ve más apretada; para que el aire entre
líneas sea el de Koto, la interlínea crece en la misma proporción:

    interlínea = 1,25 × (x/H de la letra) / 0,654, redondeada al 0,05 más cercano.

Se mide la altura de la «x» y de la «H» (el tope de su caja de dibujo) en la instancia del cuerpo de cada dirección,
con fontTools, en el archivo que carga el prototipo:
  - A: proto/a/fuentes/google-sans-flex-latin.woff2, wdth 100 · wght 370;
  - B: proto/b/fuentes/mona-sans-var-b.woff2, wdth 100 · wght 390.

Uso: python3 -I interlinea.py   → ../datos/interlinea.json
"""
import json
import os
from datetime import datetime, timezone
from decimal import ROUND_HALF_UP, Decimal

from fontTools import version as ft_version
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

AQUI = os.path.dirname(os.path.abspath(__file__))
LAB = os.path.dirname(AQUI)  # tableros/e12-laboratorio
DIRS = os.path.join(os.path.dirname(LAB), "e12-direcciones", "proto")

with open(os.path.join(LAB, "datos", "letras.json"), encoding="utf-8") as f:
    KOTO = json.load(f)["referencias"]["cuerpo"]
X_KOTO = KOTO["xSobreCap"]
assert X_KOTO == 0.654, X_KOTO

DIRECCIONES = [
    ("A", "Google Sans Flex", os.path.join(DIRS, "a", "fuentes", "google-sans-flex-latin.woff2"), {"wdth": 100, "wght": 370}, 1.35),
    ("B", "Mona Sans", os.path.join(DIRS, "b", "fuentes", "mona-sans-var-b.woff2"), {"wdth": 100, "wght": 390}, 1.4),
]


def alto(gs, cmap, ch):
    p = BoundsPen(gs)
    gs[cmap[ord(ch)]].draw(p)
    return p.bounds[3]


def al_005(v):
    return float((Decimal(str(v)) / Decimal("0.05")).quantize(Decimal("1"), rounding=ROUND_HALF_UP) * Decimal("0.05"))


salida = {
    "fecha": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    "medidoPor": "Lucía, herramientas/interlinea.py",
    "fontTools": ft_version,
    "koto": {"letra": KOTO["info"]["familia"], "instancia": KOTO["instancia"], "xSobreCap": X_KOTO,
             "interlinea": 1.25, "fuente": "datos/letras.json, referencias.cuerpo"},
    "regla": "1,25 × (x/H) / 0,654, al 0,05 más cercano",
    "direcciones": [],
}
for nombre, familia, ruta, inst, en_css in DIRECCIONES:
    f = instantiateVariableFont(TTFont(ruta), inst)
    gs, cmap = f.getGlyphSet(), f.getBestCmap()
    x, h = alto(gs, cmap, "x"), alto(gs, cmap, "H")
    calc = 1.25 * (x / h) / X_KOTO
    fila = {"direccion": nombre, "letra": familia, "archivo": os.path.relpath(ruta, LAB), "instancia": inst,
            "unidadesPorEm": f["head"].unitsPerEm, "altoX": round(x, 1), "altoH": round(h, 1),
            "xSobreCap": round(x / h, 4), "calculada": round(calc, 4), "redondeada": al_005(calc),
            "enElPrototipo": en_css}
    assert fila["redondeada"] == en_css, fila
    salida["direcciones"].append(fila)
    print(f"{nombre} {familia}: x/H {x / h:.4f} → 1,25 × {x / h:.4f} / {X_KOTO} = {calc:.3f} → {al_005(calc)}")

with open(os.path.join(LAB, "datos", "interlinea.json"), "w", encoding="utf-8") as f:
    json.dump(salida, f, ensure_ascii=False, indent=1)
    f.write("\n")
print("→ datos/interlinea.json")
