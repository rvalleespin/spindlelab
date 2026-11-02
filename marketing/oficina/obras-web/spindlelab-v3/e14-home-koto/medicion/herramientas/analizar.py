import json,sys
d=json.load(open(sys.argv[1]))
info=d['info']; M=d['muestras']
# per element: list of (y, state) changes; summarize which fields change (excluding top shift equal to... we stored doc-top so sticky shows changes)
F=['top','left','w','h','op','tf','clip','filter','vis','tr','sc','cls']
hist={}
for s in M[1:]:
    for k,v in s['cambios'].items(): hist.setdefault(k,[]).append((s['y'],v))
# group: for each element, which fields vary
rows=[]
for k,h in hist.items():
    vals=[v for _,v in h if v]
    if not vals: continue
    var=[F[i] for i in range(len(F)) if len(set(json.dumps(v[i]) for v in vals))>1]
    rows.append((int(k),var,h[0][0],h[-1][0],len(h)))
rows.sort()
filt=sys.argv[2] if len(sys.argv)>2 else None
for k,var,y0,y1,n in rows:
    i=info[str(k)]
    if not i: continue
    if filt and not any(f in var for f in filt.split(',')): continue
    print(k,i['t'],var,f'y{y0}-{y1} n{n}','«'+i['txt'][:30]+'»',i['c'][:90])
