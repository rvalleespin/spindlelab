"""Lee la tabla name (familia, fundición, diseñador, versión, licencia), los ejes variables y las
métricas verticales de un archivo de letra. Solo lee: no copia ni modifica la fuente.
Uso: python3 -I leer-fuente.py <archivo.otf|ttf> [...]"""
import sys, json
from fontTools.ttLib import TTFont
out = {}
for p in sys.argv[1:]:
    f = TTFont(p, lazy=True)
    names = {}
    for rec in f['name'].names:
        if rec.nameID in (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17) and rec.platformID in (3, 1):
            try: names.setdefault(rec.nameID, rec.toUnicode())
            except Exception: pass
    info = {'name': names, 'glifos': f['maxp'].numGlyphs}
    if 'fvar' in f:
        info['ejes'] = [{'tag': a.axisTag, 'min': a.minValue, 'def': a.defaultValue, 'max': a.maxValue} for a in f['fvar'].axes]
        info['instancias'] = len(f['fvar'].instances)
    upm = f['head'].unitsPerEm
    os2 = f['OS/2']
    info['metricas'] = {'unitsPerEm': upm, 'capHeight': getattr(os2, 'sCapHeight', None), 'xHeight': getattr(os2, 'sxHeight', None), 'ascender': os2.sTypoAscender, 'descender': os2.sTypoDescender, 'capHeight_em': round(getattr(os2, 'sCapHeight', 0) / upm, 3), 'xHeight_em': round(getattr(os2, 'sxHeight', 0) / upm, 3), 'pesoOS2': os2.usWeightClass, 'anchoOS2': os2.usWidthClass}
    out[p.split('/')[-1]] = info
print(json.dumps(out, ensure_ascii=False, indent=1))
