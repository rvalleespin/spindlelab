#!/usr/bin/env python3
"""Comprueba texto-obra.json contra las reglas que se pueden medir. Sale con 1 si algo falla.

  python3 comprobar-obra.py

 1. Cada precio visible existe tal cual en oferta-v3.json o servicios-v3.json; los nombres de servicio, bien escritos.
 2. Cero rayas, voseo, verbos de folleto, «no solo», «IA propietaria», «RAG», 40 % ni +150.
 3. Preguntas solo como títulos de preguntas frecuentes o citadas entre «».
 4. Conteos del índice: filtro y «[ Todo el trabajo ] (n)» iguales a las entradas.
 5. Dos tintas: la parte en tinta, hasta 8 palabras; la gris, de 6 a 13 (lock §14).
 6. Casos: titulares de sección de 2 a 7 palabras; de 1 a 3 párrafos por sección (lock §21.5). Los párrafos fuera de
    42 a 66 palabras se avisan, no fallan (es el rango de Koto, no una regla).
 7. Compuerta 2: ni 54 → 94 ni 36 → 73; ni «en pausa» ni «fuera de línea»; ningún enlace a praxi.coach; Combeau sin
    medidas; cada nombre de modelo con lo que hace; los conceptos con «Concepto» en la ficha y «no existe» al cerrar.
 8. A lo más un corchete por página; ningún código de color a la vista; ningún alt vacío o de relleno.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
REPO = Path(__file__).resolve().parents[7]
DATOS = REPO / 'spindlelab-astro' / 'src' / 'data'
d = json.loads((RAIZ / 'texto-obra.json').read_text(encoding='utf-8'))
oferta = (DATOS / 'oferta-v3.json').read_text(encoding='utf-8') + (DATOS / 'servicios-v3.json').read_text(encoding='utf-8')

NO_VISIBLE = {'fuente', 'nota', 'notas', 'condicion', 'trabajo', 'borrado', 'descartes', 'donde', 'destino', 'enlaces',
              'id', 'rol', 'uso', 'nivel', 'marca', 'autor', 'estructura', 'orden', 'origen', 'antes', 'por_que',
              'senales', 'regla', 'modo', 'protegido', 'reglas', 'cambios_de_registro', 'archivo', 'forma',
              'herramientas_fuera', 'ancla', 'estado', 'ruta', 'title', 'description', 'tipo', 'anio', 'nombre_seccion'}


def textos(x, ruta=''):
    if isinstance(x, dict):
        if x.get('uso') == 'referencia':
            return
        for k, v in x.items():
            if k in NO_VISIBLE:
                continue
            if k == 'nombre' and 'trabajo' in x:  # el nombre de una sección es para quien construye
                continue
            yield from textos(v, f'{ruta}.{k}')
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from textos(v, f'{ruta}[{i}]')
    elif isinstance(x, str):
        yield ruta, x


def sin_citas(t):
    return re.sub(r'«[^»]*»', '«»', t)


fallas, avisos = [], []
visibles = [(f"{p['id']}{r}", t) for p in d['paginas'] for r, t in textos(p)]
visibles += [(f'comun{r}', t) for r, t in textos(d['comun'])]
metas = [(p['id'], p.get('title', '') + ' ' + p.get('description', '')) for p in d['paginas']]

# 1 · precios y nombres
for r, t in visibles + metas:
    for m in re.finditer(r'\$[\d.]+(?:/mes)?(?: \+ IVA)?', t):
        if m.group(0) not in oferta:
            fallas.append(f'precio sin fila en los JSON: «{m.group(0)}» en {r}')
    for malo in ('Paid Media Google', 'Paid media', 'Redes sociales (', 'Auditoria SEO'):
        if malo in t:
            fallas.append(f'nombre de servicio mal escrito «{malo}» en {r}')

# 2 · vetadas
VETADAS = ['—', '–', 'IA propietaria', 'RAG', 'despliegue de modelos', '40 %', '+150', 'impulsa', 'potencia',
           'transforma', 'revoluciona', 'soluciones a tu medida', 'siguiente nivel', '¿Listo', 'líderes con visión',
           'podés', 'querés', 'tenés', 'sabés', 'vos', 'usted', 'en un mundo', 'no solo', 'sinergia', 'maximiza']
for r, t in visibles:
    for v in VETADAS:
        patron = re.escape(v) if not v.replace(' ', '').isalpha() else r'\b' + re.escape(v) + r'\b'
        if re.search(patron, t, flags=re.IGNORECASE):
            fallas.append(f'«{v}» en {r}: {t[:90]}')

# 3 · preguntas
for r, t in visibles:
    s = sin_citas(t)
    if '?' in s and not re.match(r'^¿[^?]+\?$', s.strip()):
        fallas.append(f'pregunta dentro de un texto: {r}: {t[:90]}')

# 4 · conteos del índice
trabajo = next(p for p in d['paginas'] if p['id'] == 'trabajo')
ent = trabajo['entradas']
c = Counter(e['tipo'] for e in ent)
esperado = [f'Todo ({len(ent)})'] + [f'{t} ({c[t]})' for t in ('Cliente', 'Propio', 'Concepto') if c[t]]
filtro = next(e for s in trabajo['secciones'] for e in s['elementos'] if e['id'] == 'trabajo.filtro')['opciones']
if filtro != esperado:
    fallas.append(f'filtro {filtro} no calza con las entradas {esperado}')
for r, t in visibles:
    for m in re.finditer(r'\[ Todo el trabajo \] \((\d+)\)', t):
        if int(m.group(1)) != len(ent):
            fallas.append(f'conteo {m.group(0)} en {r}, y hay {len(ent)} entradas')
for e in ent:
    if e['linea'] != f"{e['tipo']} · {e['anio']}":
        fallas.append(f"{e['nombre']}: la línea mono de A es tipo · año, y dice «{e['linea']}»")


def palabras(t):
    return len(re.findall(r"[\wáéíóúñü/,.\-]+", t.replace(' · ', ' ')))


# 5 · dos tintas
def elementos(p):
    for s in p.get('secciones', []):
        for e in s.get('elementos', []):
            yield s, e


for p in d['paginas']:
    for s, e in elementos(p):
        if e.get('tinta'):
            nt, ng = len(e['tinta'].split()), len(e['gris'].split())
            if nt > 8:
                fallas.append(f"{e['id']}: la parte en tinta tiene {nt} palabras (hasta 8)")
            if not 6 <= ng <= 13:
                fallas.append(f"{e['id']}: la parte gris tiene {ng} palabras (de 6 a 13)")

# 6 · casos
for p in d['paginas']:
    if not p['ruta'].startswith('/v3/trabajo/') or p['ruta'] == '/v3/trabajo/':
        continue
    for s in p['secciones']:
        if s['id'] in ('lateral', 'medio', 'siguiente'):
            continue
        h2 = [e for e in s['elementos'] if e['rol'] == 'h2' and e.get('nivel') != 3]
        pars = [e for e in s['elementos'] if e['rol'] == 'parrafo']
        for h in h2:
            n = len(h['texto'].split())
            if not 2 <= n <= 7:
                fallas.append(f"{h['id']}: titular de {n} palabras (de 2 a 7)")
        if s['id'] != 'pieza' and not 1 <= len(pars) <= 3:
            fallas.append(f"{p['id']} · {s['id']}: {len(pars)} párrafos (de 1 a 3)")
        if s['id'] == 'pieza' and len(pars) > 4:
            fallas.append(f"{p['id']} · pieza: {len(pars)} párrafos")
        for e in pars:
            n = len(e['texto'].split())
            if not 30 <= n <= 80:
                avisos.append(f"{e['id']}: párrafo de {n} palabras (Koto: 42 a 66)")

# 7 · compuerta 2
todo = '\n'.join(t for _, t in visibles)
for prohibido in ('54 → 94', '36 → 73', '54 de 100', 'fuera de línea', 'en pausa', 'praxi.coach'):
    if prohibido.lower() in todo.lower():
        fallas.append(f'«{prohibido}» a la vista')
for p in d['paginas']:
    for s, e in elementos(p):
        if 'praxi.coach' in (e.get('destino') or ''):
            fallas.append(f"{e['id']}: enlace a praxi.coach")
combeau = next(p for p in d['paginas'] if p['id'] == 'caso-combeau')
for r, t in textos(combeau):
    for m in ('edad', 'estatura', 'altura', 'ojos', 'pelo', 'cabello', 'hair', 'eyes', 'medidas', 'cm', 'años'):
        if re.search(r'\b' + m + r'\b', t, flags=re.IGNORECASE):
            fallas.append(f'Combeau: «{m}» en {r}')
for r, t in visibles:
    if re.search(r'Sonnet|Haiku', t) and not re.search(r'convers|registr|convierte|observación|coach|contesta', t):
        fallas.append(f'nombre de modelo sin lo que hace: {r}: {t[:90]}')
for p in d['paginas']:
    if p['id'] in ('caso-tonela', 'caso-ocelo', 'caso-sesenta', 'caso-doceavo'):
        ficha = next(e for _, e in elementos(p) if e['rol'] == 'ficha')
        if 'Concepto' not in json.dumps(ficha, ensure_ascii=False):
            fallas.append(f"{p['id']}: la ficha no dice «Concepto»")
        cierre = next(e for s, e in elementos(p) if s['id'] == 'resultado' and e['rol'] == 'h2')
        if 'no existe' not in cierre['texto']:
            fallas.append(f"{p['id']}: «Sin métrica» no dice que no existe")

# 8 · corchetes, códigos de color, alt
for p in d['paginas']:
    n = sum(t.count('[ ') for _, t in textos(p))
    if n > 1:
        fallas.append(f"{p['id']}: {n} corchetes (a lo más 1)")
for r, t in visibles:
    if re.search(r'#[0-9A-Fa-f]{6}\b', t):
        fallas.append(f'código de color a la vista: {r}')
for p in d['paginas']:
    for s in p.get('secciones', []):
        for m in s.get('medios', []):
            if m['archivo'].startswith('('):
                continue
            a = (m.get('alt') or m.get('descripcion') or '').strip()
            if len(a) < 12 or a.lower() in ('imagen', 'foto', '.'):
                fallas.append(f"alt vacío o de relleno: {m['archivo']}")

n = len(visibles)
print(f'{n} textos visibles, {sum(len(t.split()) for _, t in visibles)} palabras, {len(d["paginas"])} páginas')
for a in avisos:
    print('aviso:', a)
if fallas:
    print('\n'.join(fallas))
    sys.exit(1)
print('sin fallas: precios y nombres iguales a los JSON; cero rayas, voseo y vetadas; dos tintas en sus largos; '
      'casos con sus largos; compuerta 2 cumplida en el texto')
