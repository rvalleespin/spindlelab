"""E12 · Koto · qué letra es: lee la tabla `name`, los ejes y el juego de caracteres de las tres
letras que declara Koto en @font-face, y borra los archivos al terminar (no se guardan ni se copian).

Uso: python3 -I letras.py <reconocer-home.json> <salida/letras.json>
Necesita fontTools (con brotli para WOFF2) y curl con el proxy del entorno.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

from fontTools.ttLib import TTFont

reco, salida = sys.argv[1:3]
faces = [f for f in json.load(open(reco))["fontFaces"] if "url(" in f["src"]]
tmp = tempfile.mkdtemp(prefix="koto-letras-")
out = {"nota": "Archivos leídos en un directorio temporal y borrados; nada de esto se usa en el sitio.", "letras": []}
try:
    for f in faces:
        ruta = re.search(r'url\("?([^")]+)"?\)', f["src"])[1]
        url = "https://koto.com" + ruta if ruta.startswith("/") else ruta
        dest = os.path.join(tmp, os.path.basename(ruta))
        for _ in range(4):
            r = subprocess.run(["curl", "-sS", "--retry", "3", "-o", dest, url], capture_output=True, text=True)
            if r.returncode == 0 and os.path.getsize(dest) > 1000:
                break
        t = TTFont(dest)
        nombres = {}
        for rec in t["name"].names:
            if rec.platformID == 3 and rec.nameID in (0, 1, 2, 4, 5, 6, 8, 9, 11, 16, 17):
                nombres[str(rec.nameID)] = str(rec)
        os2 = t["OS/2"]
        cmap = t.getBestCmap()
        out["letras"].append({
            "familiaCSS": f["family"], "pesoDeclarado": f["weight"], "archivo": os.path.basename(ruta), "bytes": os.path.getsize(dest),
            "copyright": nombres.get("0"), "familia": nombres.get("1"), "nombreCompleto": nombres.get("4"), "version": nombres.get("5"),
            "fundicion": nombres.get("8"), "diseñador": nombres.get("9"), "urlFundicion": nombres.get("11"),
            "familiaTipografica": nombres.get("16"), "subfamilia": nombres.get("17"),
            "ejes": [{"eje": a.axisTag, "min": a.minValue, "defecto": a.defaultValue, "max": a.maxValue} for a in t["fvar"].axes] if "fvar" in t else None,
            "instancias": len(t["fvar"].instances) if "fvar" in t else None,
            "usWeightClass": os2.usWeightClass, "usWidthClass": os2.usWidthClass, "alturaX": getattr(os2, "sxHeight", None), "alturaMayuscula": getattr(os2, "sCapHeight", None), "unidadesPorEme": t["head"].unitsPerEm,
            "glifos": t["maxp"].numGlyphs, "caracteres": len(cmap), "castellano": all(ord(c) in cmap for c in "áéíóúüñÑ¿¡«»"),
        })
        print("ok", f["family"], nombres.get("4"))
finally:
    shutil.rmtree(tmp, ignore_errors=True)
out["lectura"] = ("GT Kotoheim es una letra de Grilli Type hecha para Koto (nombre de familia propio, «Copyright © 2015 by Grilli Type», "
                  "diseñador en la tabla: Noel Leu). Fundición, diseñador, año y ejes (ancho 75-100, peso 100-1000, inclinación 0-6) "
                  "coinciden con GT America, de la que sería un corte a medida; eso es inferencia: la tabla no la nombra. Licencia comercial "
                  "y exclusiva de Koto: no se puede usar.")
json.dump(out, open(salida, "w"), ensure_ascii=False, indent=1)
