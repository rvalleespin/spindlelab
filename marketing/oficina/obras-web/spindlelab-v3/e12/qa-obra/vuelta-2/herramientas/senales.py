"""Javiera, QA de obra E12, vuelta 2 (la de la vuelta 1, más las fechas de la home y los tres title del defecto 8).
El JSON-LD y los title/description de cada ruta, parseados del dist/ y comparados
con lo que fija senales-obra.md (Simón): §1.1 (#org, #autor-ramon), §2.1 a §2.11 (title, description, nodos, @id y
campos con valor escrito en la nota). Uso: python3 -I senales.py <dist> <senales-obra.md> <salida.json>"""
import json, re, sys
dist, senales, salida = sys.argv[1:4]
S = open(senales, encoding='utf-8').read()
def grafo(ruta):
    h = open(f'{dist}{ruta}index.html', encoding='utf-8').read()
    nodos = []
    for m in re.finditer(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', h, re.S):
        d = json.loads(m.group(1)); nodos += d.get('@graph', [d])
    t = re.search(r'<title>(.*?)</title>', h, re.S).group(1)
    desc = re.search(r'<meta name="description" content="([^"]*)"', h).group(1)
    import html as H
    return {n.get('@id', n.get('@type')): n for n in nodos}, H.unescape(t), H.unescape(desc)
# title y description de las tablas de §2 (filas «| `title` | … | n |»)
esperado = {}
secciones = re.split(r'\n### 2\.\d+ · ', S)
mapa = {'`/` · home': '/v3/', '`/trabajo/` · índice': '/v3/trabajo/', '`/trabajo/praxi/`': '/v3/trabajo/praxi/', '`/trabajo/combeau/`': '/v3/trabajo/combeau/',
        '`/diagnostico/`': '/v3/diagnostico/', '`/metodo/`': '/v3/metodo/', '`/nosotros/`': '/v3/nosotros/', '`/contacto/`': '/v3/contacto/'}
for sec in secciones[1:]:
    cab = sec.split('\n')[0]
    ruta = next((v for k, v in mapa.items() if cab.startswith(k)), None)
    if not ruta: continue
    for campo in ('title', 'description'):
        m = re.search(r'\| `' + campo + r'` \| (.*?) \| (\d+) \|', sec)
        if m: esperado.setdefault(ruta, {})[campo] = re.sub(r' \((la de Clara|el de Clara)\)$', '', m.group(1)).strip()
# conceptos y servicios (tablas con title (n) y description (n))
for fila in re.finditer(r'\| `(/trabajo/\w+/)` \| (.*?) \((\d+)\) \| (.*?) \((\d+)\) \|', S):
    esperado.setdefault('/v3' + fila.group(1), {}).update(title=fila.group(2), description=fila.group(4))
for fila in re.finditer(r'\| `(/servicios/[\w-]*/?)` \| (.*?) \((\d+)(?:, queda)?\) \| (.*?) \((\d+)(?:, la de Clara)?\) \|', S):
    d = fila.group(4).replace('(queda) ', '')
    esperado.setdefault('/v3' + fila.group(1), {}).update(title=fila.group(2), description=d)
R = []
for ruta, e in sorted(esperado.items()):
    g, t, d = grafo(ruta)
    R.append({'ruta': ruta, 'title_ok': t == e.get('title'), 'title': t, 'esperado_title': e.get('title'), 'desc_ok': d == e.get('description'), 'description': d, 'esperado_desc': e.get('description')})
# comprobaciones de nodos con valores escritos
B = 'https://spindlelab.cl'
chk = []
def ok(nombre, cond, valor=None): chk.append({'que': nombre, 'ok': bool(cond), 'valor': valor})
g, _, _ = grafo('/v3/')
org, autor = g[f'{B}/#org'], g[f'{B}/#autor-ramon']
ok('#org.description = §1.1', org.get('description') == 'Estudio de diseño y tecnología en Santiago: diseñamos y programamos sitios y herramientas a medida, y hacemos SEO técnico y visibilidad en motores de IA (AEO/GEO) para que Google y ChatGPT puedan leerlos.', org.get('description'))
ok('#org.knowsAbout suma Diseño web y Desarrollo de aplicaciones web', {'Diseño web', 'Desarrollo de aplicaciones web'} <= set(org.get('knowsAbout', [])), org.get('knowsAbout'))
ok('#org.logo es el PNG de El huso ≥ 512', 'icon-512' in json.dumps(org.get('logo')), org.get('logo'))
ok('#autor-ramon.jobTitle = propuesta de §1.1', autor.get('jobTitle') == 'Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad en IA', autor.get('jobTitle'))
wp = g[f'{B}/#webpage']; ok('home WebPage con isPartOf #website y about #org', wp.get('isPartOf', {}).get('@id') == f'{B}/#website' and wp.get('about', {}).get('@id') == f'{B}/#org')
ok('home WebPage con dateModified (§1.2: «lo escribe el build»)', 'dateModified' in wp, {k: v for k, v in wp.items() if 'date' in k})
import datetime, zoneinfo
hoy = datetime.datetime.now(zoneinfo.ZoneInfo('America/Santiago')).date().isoformat()
ok('home WebPage datePublished 2026-07-08 (el de producción y el del 16-oct) y dateModified = el día del build en Chile', wp.get('datePublished') == '2026-07-08' and wp.get('dateModified') == hoy, [wp.get('datePublished'), wp.get('dateModified'), hoy])
for r_, t_ in (('/v3/servicios/auditoria-seo-tecnica/', 'Auditoría SEO técnica para empresas · SpindleLab'), ('/v3/servicios/acompanamiento-mensual/', 'Acompañamiento mensual de SEO e IA · SpindleLab'), ('/v3/servicios/redes-sociales/', 'Gestión de redes sociales para empresas · SpindleLab')):
    h_ = open(f'{dist}{r_}index.html', encoding='utf-8').read()
    import html as H_
    tt = H_.unescape(re.search(r'<title>(.*?)</title>', h_, re.S).group(1)); og = H_.unescape(re.search(r'<meta property="og:title" content="([^"]*)"', h_).group(1))
    ok(f'defecto 8: {r_} title y og:title en mayúscula inicial', tt == t_ and og == t_, [tt, og])
g, _, _ = grafo('/v3/trabajo/')
il = next(n for n in g.values() if n.get('@type') == 'ItemList')
ok('/trabajo/ ItemList numberOfItems 10', il.get('numberOfItems') == 10, il.get('numberOfItems'))
items = [(x.get('name'), x.get('url') or (x.get('item') if isinstance(x.get('item'), str) else (x.get('item') or {}).get('url') or ('CreativeWork sin url' if isinstance(x.get('item'), dict) else None))) for x in il['itemListElement']]
ok('/trabajo/ ItemList: nombres y destinos', True, items)
g, _, _ = grafo('/v3/trabajo/praxi/')
caso, app = g[f'{B}/trabajo/praxi/#caso'], g[f'{B}/trabajo/praxi/#app']
ok('Praxi #caso dateCreated 2026-07-21 y temporalCoverage', caso.get('dateCreated') == '2026-07-21' and caso.get('temporalCoverage') == '2026-07-21/2026-08-25', [caso.get('dateCreated'), caso.get('temporalCoverage')])
ok('Praxi #app sin offers, url ni sameAs', not any(k in app for k in ('offers', 'url', 'sameAs')) and not any(k in caso for k in ('offers', 'url', 'sameAs')), sorted(app))
ok('Praxi #app HealthApplication / Web', app.get('applicationCategory') == 'HealthApplication' and app.get('operatingSystem') == 'Web')
g, _, _ = grafo('/v3/trabajo/combeau/')
c = g[f'{B}/trabajo/combeau/#caso']
ok('Combeau hasPart #fotografia y #modelo con sus url', [(p.get('@id', '').split('#')[-1], p.get('url')) for p in c.get('hasPart', [])] == [('fotografia', 'https://bernardocombeau.cl/'), ('modelo', 'https://bernardocombeau.cl/modelo/')], [(p.get('@id'), p.get('url')) for p in c.get('hasPart', [])])
ok('Combeau datePublished 2026-07-24', c.get('datePublished') == '2026-07-24', c.get('datePublished'))
s = g.get(f'{B}/trabajo/combeau/#sitio', {})
ok('Combeau #sitio publisher bernardocombeau.cl/#persona', s.get('publisher', {}).get('@id') == 'https://bernardocombeau.cl/#persona')
DIS = {'tonela': 'Pieza de concepto de SpindleLab: Tonela no existe; no tiene clientes, faenas, dirección ni RUT.', 'ocelo': 'Pieza de concepto de SpindleLab: esta clínica no existe y no atiende pacientes.',
       'sesenta': 'Pieza de concepto de SpindleLab: Sesenta no existe, no atiende a nadie y no llevó ninguna causa.', 'doceavo': 'Pieza de concepto de SpindleLab: Doceavo no existe y no tiene clientes; las fechas son las del calendario del SII de 2026.'}
ABOUT = {'tonela': 'Izaje: eslingas, cadenas y grilletes', 'ocelo': 'Cirugía refractiva y de cataratas', 'sesenta': 'Derecho laboral del lado del trabajador', 'doceavo': 'Contabilidad y tributación de pymes'}
for k in DIS:
    g, _, _ = grafo(f'/v3/trabajo/{k}/')
    c = g[f'{B}/trabajo/{k}/#caso']
    ok(f'{k}: genre Concepto, disambiguating, about, dateCreated 2026-10-16', c.get('genre') == 'Concepto' and c.get('disambiguatingDescription') == DIS[k] and c.get('about', {}).get('name') == ABOUT[k] and c.get('dateCreated') == '2026-10-16', [c.get('genre'), c.get('dateCreated'), c.get('about')])
    ok(f'{k}: sin Organization/LocalBusiness/Medical/Legal/Accounting', not any(n.get('@type') in ('LocalBusiness', 'MedicalClinic', 'LegalService', 'AccountingService') or (n.get('@type') == 'Organization') for n in g.values()))
g, _, _ = grafo('/v3/diagnostico/')
w = g.get(f'{B}/diagnostico/#chequeo', {})
ok('diagnóstico WebApplication #chequeo como §2.6', w.get('@type') == 'WebApplication' and w.get('isAccessibleForFree') is True and w.get('applicationCategory') == 'BusinessApplication' and w.get('name') == 'Chequeo de 21 señales', {k: w.get(k) for k in ('@type', 'name', 'applicationCategory', 'isAccessibleForFree')})
g, _, _ = grafo('/v3/contacto/')
ok('contacto ContactPage about #org', any(n.get('@type') == 'ContactPage' and n.get('about', {}).get('@id') == f'{B}/#org' for n in g.values()))
json.dump({'titulos': R, 'nodos': chk}, open(salida, 'w'), ensure_ascii=False, indent=1)
for r in R: print(('✓' if r['title_ok'] and r['desc_ok'] else '✗'), r['ruta'], '' if r['title_ok'] else f"title «{r['title']}» ≠ «{r['esperado_title']}»", '' if r['desc_ok'] else f"desc «{r['description']}» ≠ «{r['esperado_desc']}»")
for c in chk: print('✓' if c['ok'] else '✗', c['que'], '' if c['ok'] and c['que'] != '/trabajo/ ItemList: nombres y destinos' else json.dumps(c['valor'], ensure_ascii=False)[:400])
