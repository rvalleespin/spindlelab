"""Javiera, QA de obra E12, vuelta 2 (23-oct-2026). La cuenta de campos.mjs: por página, el área de los medios que son
campo sobre el área de la página a 1440 (spec §3.4), con la regla vigente desde el 23-oct (la 2: `es_campo` de
e12/spec/herramientas/campo-medios.py, IMPORTADA, no copiada, como pide §3.4: «toda herramienta que cuente campos usa
ese es_campo»), la regla 1 (la cubeta sola) para comparar con la vuelta 1, y los seguidos: la racha más larga de medios
que son campo, en el orden del documento.
Uso: python3 -I campos.py <carpeta de campos.mjs> <salida.json>"""
import importlib.util, json, os, sys
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

AQUI = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('campo_medios', os.path.join(AQUI, '../../../spec/herramientas/campo-medios.py'))
cm = importlib.util.module_from_spec(spec); spec.loader.exec_module(cm)

base, salida = sys.argv[1], sys.argv[2]
R = []
for f in sorted(os.listdir(base)):
    if not f.endswith('.json'): continue
    d = json.load(open(os.path.join(base, f)))
    im = Image.open(os.path.join(base, f[:-5] + '.png')).convert('RGB')
    area = im.width * im.height
    r1 = r2 = 0; filas = []
    for c in sorted(d['cajas'], key=lambda c: (round(c['y']), c['x'])):
        caja = (round(c['x']), round(c['y']), round(c['x'] + c['w']), round(c['y'] + c['h']))
        rec = im.crop(caja); a = rec.width * rec.height
        t, info = cm.es_campo(rec)
        if info['cubeta']: r1 += a
        if t: r2 += a
        filas.append({'src': c['src'].split('/')[-1], 'y': round(c['y']), 'w': round(c['w']), 'h': round(c['h']), 'campo': t,
                      'cubeta': info['cubeta'], 'dominante': info['dominante'], 'parteCubeta': info['parte'], 'familiaDeColor': info['familiaDeColor']})
    racha = mejor = 0
    for x in filas:
        racha = racha + 1 if x['campo'] else 0; mejor = max(mejor, racha)
    medios = sum(round(c['w']) * round(c['h']) for c in d['cajas'])
    R.append({'ruta': d['ruta'], 'alto': im.height, 'regla1': round(100 * r1 / area, 1), 'regla2': round(100 * r2 / area, 1),
              'seguidos': mejor, 'medios': round(100 * medios / area, 1), 'n': len(filas), 'filas': filas})
json.dump(R, open(salida, 'w'), ensure_ascii=False, indent=1)
for r in R:
    nuevos = [x['src'] for x in r['filas'] if x['campo'] and not x['cubeta']]
    print(f"{r['ruta']:52s} regla 2 {r['regla2']:5.1f} %  (regla 1 {r['regla1']:5.1f})  seguidos {r['seguidos']}  medios {r['medios']:5.1f} % en {r['n']}"
          f"{'  · campo solo con la 2: ' + ', '.join(nuevos) if nuevos else ''}")
