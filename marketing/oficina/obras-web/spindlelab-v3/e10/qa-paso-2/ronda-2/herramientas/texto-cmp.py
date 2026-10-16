# Compara palabra por palabra sin mayúsculas (text-transform es estilo, no texto) y por secuencia (difflib).
import json, sys, difflib, re, collections
d = json.load(open(sys.argv[1]))
for r in d:
    wb = ' '.join(r['build'].split()).lower().split()
    wp = ' '.join(r['proto'].split()).lower().split()
    cb, cp = collections.Counter(wb), collections.Counter(wp)
    sm = difflib.SequenceMatcher(None, wb, wp, autojunk=False)
    ops = [(t, ' '.join(wb[max(0,i1-3):i2+3]), ' '.join(wp[max(0,j1-3):j2+3])) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal']
    print(f"{r['dir']:8} {r['pag']:7} {r['w']:5} palabras build {len(wb)} proto {len(wp)} · secuencia {sm.ratio():.4f} · faltan {dict(cb-cp)} · sobran {dict(cp-cb)}")
    for o in ops: print('      ', o)
