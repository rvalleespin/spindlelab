import json,sys
d=json.load(open(sys.argv[1])); ids=sys.argv[2].split(','); fld=[int(x) for x in sys.argv[3].split(',')]
cur={}
for s in d['muestras']:
    ch=[i for i in ids if i in s['cambios']]
    for i in ch: cur[i]=s['cambios'][i]
    if ch or s is d['muestras'][0]:
        print(s['y'], ' | '.join(f"{i}:"+(','.join(str(cur[i][f]) if cur.get(i) else 'null' for f in fld)) for i in ids if i in cur))
