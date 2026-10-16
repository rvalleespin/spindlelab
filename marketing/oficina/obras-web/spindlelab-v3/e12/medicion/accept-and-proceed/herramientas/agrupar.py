"""Agrupa los nodos de texto medidos por estilo (familia, tamaño, peso, interlínea, tracking, caja, color)
y cuenta cuántos hay y cuánta área cubren. Uso: python3 -I agrupar.py <carpeta-json> [pagina-ancho ...]"""
import sys, json, glob, os, collections
src = sys.argv[1]
filtro = sys.argv[2:]
for f in sorted(glob.glob(os.path.join(src, '*.json'))):
    k = os.path.basename(f)[:-5]
    if filtro and k not in filtro: continue
    d = json.load(open(f))
    g = collections.OrderedDict()
    for t in d['textos']:
        fam = t['familia'].split(',')[0].strip('"')
        key = (fam, t['tam'], t['peso'], t['interlinea'], t['tracking'], t['caja'], t['color'], t['estilo'])
        e = g.setdefault(key, {'n': 0, 'area': 0, 'ej': [], 'sel': set(), 'fondos': set(), 'op': set()})
        e['n'] += 1; e['area'] += t['w'] * t['h']
        if len(e['ej']) < 3: e['ej'].append(t['texto'][:50])
        e['sel'].add(t['sel'].split(' > ')[-1][:45]); e['fondos'].add(t['fondo']['color']); e['op'].add(t['opacidad'])
    print(f'===== {k}  alto {d["alto"]}  body {d["claseBody"]} fondo {d["fondoBody"]} color {d["colorBody"]} palabras {d["palabrasMain"]}')
    for key, e in sorted(g.items(), key=lambda kv: -float(kv[0][1][:-2])):
        print(f'{key[1]:>8} {key[0][:22]:22} w{key[2]} lh {key[3]:>7} ls {key[4]:>7} {key[5]:9} {key[6]:12} {key[7][:6]} n{e["n"]:3} | {"; ".join(e["ej"])[:90]} | {", ".join(list(e["sel"])[:2])} | fondo {",".join(e["fondos"])} op {",".join(map(str,e["op"]))}')
