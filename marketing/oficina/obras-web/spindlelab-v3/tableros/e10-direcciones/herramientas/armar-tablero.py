# armar-tablero.py — tablero.html de la compuerta 2 de E10 (Lucía, 16-oct-2026).
# Lee img/medidas.json (renderizar.mjs), img/variantes.json (variantes.mjs), img/orden-hero.json (orden-hero.mjs),
# espacios-foto.json, texto-igual.json, img/cinta-prueba.json e img/oro.json, y escribe tablero.html para publicarse
# como Artifact privado (sin doctype/html/head/body; imágenes por ruta img/…).
# Ronda 1 de QA (acta-paso-2.md), lo que se agregó:
#   · defecto 3: «Lo que también decides»: lo que tu elección cambia del manual, regla por regla con su fecha, y el
#     punto dorado (A o B) con su captura;
#   · defecto 4: el orden del hero (el del sitio) dicho arriba y medido en «Lo comprobado»;
#   · defecto 5: la prueba del logo tapado sobre la 2.ª y la 3.ª pantalla de Pizarra limpia, escrita;
#   · defecto 6: la decisión de los colores (propios o los exactos de The Ready) con las dos capturas, y la prueba del
#     logo tapado sobre Taller.
# Uso: python3 -I herramientas/armar-tablero.py   (desde tableros/e10-direcciones/)
import html, json, os

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = json.load(open(os.path.join(AQUI, 'img/medidas.json'), encoding='utf-8'))
V = json.load(open(os.path.join(AQUI, 'img/variantes.json'), encoding='utf-8'))
H = json.load(open(os.path.join(AQUI, 'img/orden-hero.json'), encoding='utf-8'))
F = json.load(open(os.path.join(AQUI, 'espacios-foto.json'), encoding='utf-8'))
T = json.load(open(os.path.join(AQUI, 'texto-igual.json'), encoding='utf-8'))
C = json.load(open(os.path.join(AQUI, 'img/cinta-prueba.json'), encoding='utf-8'))
O = json.load(open(os.path.join(AQUI, 'img/oro.json'), encoding='utf-8'))
e = html.escape


def coma(x, dec=1):
    """Decimales con coma, como el resto de la obra (es-CL)."""
    return f'{x:.{dec}f}'.replace('.', ',')


PAGINAS = [('home', 'Home', 'la portada, con el chequeo arriba, el titular «Ahí se corta el circuito» y la fila de obras'),
           ('acompanamiento-mensual', 'Acompañamiento mensual', 'un servicio, con sus planes y el compromiso de los 3 meses'),
           ('trabajo', 'Trabajo', 'las cuatro piezas de obra')]

DIRS = {
    'taller': {
        'nombre': 'Taller',
        'bajada': 'The Ready a fondo en la letra y el juego. Lo demás, de SpindleLab.',
        'define': [
            'De The Ready, lo que marcaste: titulares de 138 px en caja de oración, la cinta en la home y en Acompañamiento, y el resaltador en hasta cuatro frases por página, siempre la que remata la idea.',
            'De SpindleLab: tu papel y tu ciruela, el módulo de navegación, el chequeo y los botones del sitio, y la fila de obras en el hero.',
            'Marcas de revisión a mano, una por página y donde hacen un trabajo: una flecha que apunta al chequeo, un visto junto a la prueba de los robots, un anillo alrededor de «Correr el chequeo». Y un sello con su rótulo en vez de la mancha naranja.',
            'Una banda del resaltador por página para lo que ganas, y fotos de gente trabajando que tocan los bordes de la pantalla.',
            'Lo que sacrifica: la calma. Hay más cosas compitiendo y pide 6 de las 8 fotos por generar.',
        ],
    },
    'pizarra': {
        'nombre': 'Pizarra limpia',
        'bajada': 'La letra de The Ready en todas las páginas, sobre la claridad de Gehl.',
        'define': [
            'Un solo fondo papel hasta el pie ciruela. Rótulo a la izquierda, columna de lectura a la derecha y el mismo aire entre bloques.',
            'La letra grande ya no vive solo en el hero: los titulares de página van a 138 px y los de sección a 91, a todo el ancho sobre la ficha.',
            'Los servicios ya no pesan igual: Desarrollo y Visibilidad son las dos puertas de entrada, a escala de titular; Continuidad y Alcance van en un par más chico.',
            'La cinta una vez (las 21 señales, en la home) y el resaltador en hasta cuatro frases por página, de a una a la vista. Sin bandas de color, sin sello ni marcas a mano.',
            'Lo que sacrifica: el juego de Taller. Su carácter está en la letra, no en el color, y las fotos van sin gente, como bandas a sangre.',
        ],
    },
}

# Prueba del logo tapado: lo que se ve en cada pantalla, mirado en la captura (variantes.mjs), dicho como es.
TAPADO = {
    ('pizarra', 'home', 2): 'Las cuatro obras con su rótulo mono, la cinta con las 21 señales del chequeo y la frase grande con el resaltador en «la consulta que pagaste termina en otra parte.». Se sostiene: la letra y el resaltador le quitan lo de sitio típico, y la cinta y las obras son tuyas.',
    ('pizarra', 'home', 3): 'Casi toda la pantalla es la foto F5, que todavía es un espacio gris, más el comienzo de «Desarrollo» a 91 px. Con el espacio vacío la prueba no se puede hacer: esta pantalla depende de la foto. Es una de las dos más débiles.',
    ('pizarra', 'acompanamiento-mensual', 2): 'La foto F7 (vacía todavía) y la entrada con el resaltador en «lo hace y lo sostiene.». La frase grande en ciruela con el resaltador se lee propia; la mitad de la pantalla depende de la foto.',
    ('pizarra', 'acompanamiento-mensual', 3): '«Lo que incluye» a 91 px, tu retrato y la lista con filetes. Es la más cercana a una consultora ordenada cualquiera: la distinguen la escala del titular y el ciruela. Sin tu retrato podría ser de otro. Es la otra pantalla débil.',
    ('pizarra', 'trabajo', 2): 'Las obras con su nombre a 52 px en la columna de rótulos y la pieza grande a la derecha. Se sostiene por las obras reales y la letra.',
    ('pizarra', 'trabajo', 3): 'La segunda obra y el comienzo de la tercera, igual que la anterior. Ordenada y propia por el contenido; el estilo es sobrio a propósito.',
    ('taller', 'home', 1): 'El chequeo arriba con el sello y la flecha, el titular de 138 px con el resaltador y la fila de obras. Ya no está nada de lo que la hacía pasar por The Ready (su encabezado de 90 px, el óvalo, el collage sobre cuadrícula, los ovillos y la mancha). Quien conozca The Ready va a reconocer la familia en la letra, el resaltador y la cinta, que son lo que elegiste.',
    ('taller', 'home', 2): 'Los rótulos de las obras, la cinta con los nombres de tus cuatro servicios y la frase grande junto a la foto F1. Se lee como SpindleLab por el contenido y el ciruela; la cinta es la de The Ready en forma, con tu separador y tu texto.',
}
TAPADO_CIERRE = {
    'pizarra': 'Lo que queda: del hero para abajo Pizarra limpia ya no es el sitio típico que le criticaste a Gehl en la letra ni en el resaltador. Sigue siendo la más sobria de las dos, y sus dos pantallas más débiles son la 3.ª de la home, que depende de la foto F5, y «Lo que incluye».',
    'taller': 'Lo que queda: con el logo tapado, Taller se lee como un sitio de la familia de The Ready, no como The Ready. Recurso por recurso, qué se tomó y qué se hizo propio está en el lock §10b.',
}

# Lo que tu elección cambia del manual (lock §15): regla de hoy, cuándo se aprobó y cómo queda con cada dirección.
MANUAL = [
    ('§04 · El lienzo es negro puro (#000000) y el texto va en papel.', '27-sep, tú',
     'Papel #F7F5F0 (el papel de tu manual) con tinta ciruela #341F34.', 'Igual.'),
    ('§04 · Cuatro campos de color a pantalla entera, uno por pilar (brasa, navy, petróleo, ciruela).', '5-oct, ratificado al fijar driftime como vara',
     'Sin campos por pilar: una banda del resaltador por página, para lo que ganas, y la banda ciruela al final.', 'Sin bandas: un solo fondo; solo el pie va en ciruela.'),
    ('§05 · Manrope en titulares y cuerpo.', '29-sep, tú',
     'Instrument Sans en titulares, IBM Plex Sans en el cuerpo, IBM Plex Mono en rótulos y botones.', 'Igual.'),
    ('§05 · Display en MAYÚSCULAS 800 en cinco lugares; los demás titulares, chicos (h1 de 60 px, h2 de 30).', '5-oct, tú',
     'Todos los titulares en caja de oración, peso 500, y grandes en todas las páginas: 138, 91 y 52 px.', 'Igual.'),
    ('§05 · Rótulos en caja normal, sin interletra positiva.', '5-oct, tú',
     'Rótulos, navegación y botones en Plex Mono, en MAYÚSCULAS, con +0,03em y +0,1em.', 'Igual.'),
    ('§06 y §02 · El punto dorado va en el módulo de navegación, en cada vista.', '5-oct (un oro por vista); la regla de 3:1 del punto, manual v3.0, 7-oct',
     'Sobre papel el oro no llega a 3:1: o el punto va en el pie ciruela (A) o el módulo pasa a ciruela (B). Lo decides abajo.', 'Igual.'),
    ('§07 · Radio único de 6 px, botones chicos de 36 px, cero píldoras.', '5-oct, ratificado; escrito en la spec el 6-oct',
     'El radio de 6 px se queda en botones, campo del chequeo, módulo y pestañas; las fotos y las piezas van con radio 0; los botones suben a 50 px, en mono.', 'Igual.'),
    ('§07 · Movimiento: entrada, scroll suave y campos pegajosos.', 'Sin fecha: lo escribió la spec, no hay un sí tuyo registrado',
     'Se suman la cinta, que se puede pausar, y el dibujo del resaltador. Los campos pegajosos salen, porque no hay campos.', 'Se suman la cinta (una vez) y el dibujo del resaltador. Los campos pegajosos salen.'),
]

PROPIA = [('Papel', '#F7F5F0', 'el de tu manual (§04): fondo de todas las páginas'),
          ('Ciruela', '#341F34', 'el de tu manual (§04): la única tinta y la banda final'),
          ('Resaltador', '#EEF26E', 'propio: más fluor y un poco más verde que el de ellos, fuera del tono del oro'),
          ('Oro', '#C9A227', 'solo el punto del wordmark, uno por vista')]
EXACTA = [('Papel', '#FFFEFA', ''), ('Ciruela', '#1B0925', ''), ('Casi negro', '#0D0C0E', ''), ('Amarillo', '#F4F480', ''),
          ('Lima', '#E6FA97', ''), ('Lavanda', '#EDD1FF', ''), ('Naranja', '#EC6227', '')]


def tramos(clave, ancho):
    return M[f'{clave}-{ancho}']['tramos']


def img(nombre, w, h, alt, lazy=True):
    carga = ' loading="lazy"' if lazy else ''
    nombre = nombre if nombre.startswith('img/') else 'img/' + nombre
    return f'<img src="{e(nombre)}" width="{w}" height="{h}" alt="{e(alt)}"{carga} decoding="async">'


def tam(ruta):
    from PIL import Image
    with Image.open(os.path.join(AQUI, ruta)) as im:
        return im.size


def bloque_pagina(d, slug, titulo, que):
    clave = f'{d}-{slug}'
    t14, t39 = tramos(clave, 1440), tramos(clave, 390)
    n = DIRS[d]['nombre']
    alt14 = f'{n}, {titulo}, a 1440 px'
    alt39 = f'{n}, {titulo}, a 390 px'
    resto14 = ''.join(img(t[0], t[1], t[2], f'{alt14}, tramo {i + 2}') for i, t in enumerate(t14[1:]))
    resto39 = ''.join(img(t[0], t[1], t[2], f'{alt39}, tramo {i + 2}') for i, t in enumerate(t39[1:]))
    return f'''
      <article class="pagina" id="{d}-{slug}">
        <header class="pagina__cab">
          <h3>{e(titulo)}</h3>
          <p>{e(que)}</p>
        </header>
        <div class="par">
          <figure class="vista vista--ancha"><figcaption>1440 px</figcaption>{img(t14[0][0], t14[0][1], t14[0][2], alt14 + ', primer tramo', lazy=not (d == 'taller' and slug == 'home'))}</figure>
          <figure class="vista vista--cel"><figcaption>390 px</figcaption>{img(t39[0][0], t39[0][1], t39[0][2], alt39 + ', primer tramo', lazy=not (d == 'taller' and slug == 'home'))}</figure>
        </div>
        <details>
          <summary>Ver la página completa</summary>
          <div class="par par--resto">
            <div class="vista vista--ancha">{resto14 or '<p class="nada">La página entra en un tramo.</p>'}</div>
            <div class="vista vista--cel">{resto39 or '<p class="nada">La página entra en un tramo.</p>'}</div>
          </div>
        </details>
      </article>'''


def bloque_tapado(d):
    casos = [c for c in V['logo_tapado'] if c['direccion'] == d]
    nombre = DIRS[d]['nombre']
    pant = 'la primera y la segunda pantalla de la home' if d == 'taller' else 'la segunda y la tercera pantalla de cada página'
    figs = ''
    for c in casos:
        w, h = tam(c['archivo'])
        titulo = dict((p[0], p[1]) for p in PAGINAS)[c['pagina']]
        alt = f'{nombre}, {titulo}, pantalla {c["pantalla"]} a 1440 × 900, con el logo tapado'
        figs += (f'<figure class="tapado"><figcaption>{e(titulo)} · pantalla {c["pantalla"]}</figcaption>'
                 f'{img(c["archivo"], w, h, alt)}'
                 f'<p>{e(TAPADO[(d, c["pagina"], c["pantalla"])])}</p></figure>')
    return f'''
      <article class="pagina prueba" id="{d}-tapado">
        <header class="pagina__cab">
          <h3>La prueba del logo tapado</h3>
          <p>{e(pant)}, a 1440 × 900, con el wordmark del módulo y el del pie tapados</p>
        </header>
        <div class="tapados">{figs}</div>
        <p class="nota">{e(TAPADO_CIERRE[d])}</p>
      </article>'''


def bloque_direccion(d):
    D = DIRS[d]
    lineas = ''.join(f'<li>{e(x)}</li>' for x in D['define'])
    paginas = ''.join(bloque_pagina(d, *p) for p in PAGINAS)
    return f'''
    <section class="direccion direccion--{d}" id="{d}" aria-labelledby="t-{d}">
      <div class="direccion__cab">
        <p class="rotulo">Dirección</p>
        <h2 id="t-{d}">{e(D['nombre'])}</h2>
        <p class="bajada">{e(D['bajada'])}</p>
        <ul class="define">{lineas}</ul>
      </div>
      {paginas}
      {bloque_tapado(d)}
    </section>'''


def tabla_manual():
    filas = ''.join(f'<tr><th scope="row">{e(a)}</th><td class="fecha">{e(b)}</td><td>{e(c)}</td><td>{e(d)}</td></tr>' for a, b, c, d in MANUAL)
    return f'''<div class="tabla" role="region" aria-label="Lo que tu elección cambia del manual" tabindex="0">
      <table class="t-manual">
        <thead><tr><th scope="col">Regla del manual hoy</th><th scope="col">Se aprobó</th><th scope="col">Con Taller</th><th scope="col">Con Pizarra limpia</th></tr></thead>
        <tbody>{filas}</tbody>
      </table>
    </div>'''


def muestras(lista):
    return '<ul class="muestras">' + ''.join(
        f'<li><span class="chip" style="background:{h}"></span><span><b>{e(n)}</b> <code>{h}</code>{(" · " + e(r)) if r else ""}</span></li>' for n, h, r in lista) + '</ul>'


def bloque_colores():
    par = {}
    for c in V['colores']:
        par.setdefault(c['pagina'], {})[c['paleta']] = c['archivo']
    figs = ''
    for pagina, d in par.items():
        titulo = dict((p[0], p[1]) for p in PAGINAS)[pagina]
        for cual, rot in (('propia', 'Propios (lo que ves)'), ('the-ready', 'Los exactos de The Ready')):
            w, h = tam(d[cual])
            figs += f'<figure class="vista"><figcaption>{e(titulo)} de Taller · {e(rot)}</figcaption>{img(d[cual], w, h, f"Taller, {titulo}, primera pantalla con los colores {rot.lower()}")}</figure>'
    return f'''
      <article class="decision" id="colores">
        <h3>2 · Los colores: propios o los exactos de The Ready</h3>
        <div class="dos">
          <div><p class="rotulo">Propios · lo que ves en las dos direcciones</p>{muestras(PROPIA)}
            <p>Sin lima, lavanda ni naranja: la portada de Trabajo va en papel, el botón del pie en papel y el rótulo del chequeo en un sello de tinta.</p></div>
          <div><p class="rotulo">Exactos de The Ready</p>{muestras(EXACTA)}
            <p>Son sus siete colores, medidos en su sitio. Si los eliges, los eliges sabiendo que son los suyos. Vuelven en el rol que tienen allá: la lima en la portada de Trabajo, la lavanda en el botón del pie y el naranja en el sello.</p></div>
        </div>
        <div class="cuadro">{figs}</div>
      </article>'''


def bloque_oro():
    op = {(o['opcion'], o['ancho']): o for o in V['oro']}
    def fig(o, cual, que):
        w, h = tam(o[cual])
        return f'<figure class="vista"><figcaption>{e(que)}</figcaption>{img(o[cual], w, h, que)}</figure>'
    a14, b14, a39, b39 = op[('A', 1440)], op[('B', 1440)], op[('A', 390)], op[('B', 390)]
    return f'''
      <article class="decision" id="oro">
        <h3>3 · Dónde va el punto dorado</h3>
        <div class="dos">
          <div><p class="rotulo">A · recomendada · lo que ves en los prototipos</p>
            <p>El punto del módulo va en ciruela: sobre papel el oro da 2,22:1, bajo el 3:1 de tu manual. El único oro de la vista es el punto del wordmark grande del pie, sobre ciruela (6,24:1): el punto donde te encuentran, al final, donde se invita a conversar. La primera pantalla queda sin oro, que el manual da por válido.</p>
            {fig(a14, 'modulo', 'A · el módulo a 1440')}{fig(a14, 'pie', 'A · el pie a 1440')}
            <div class="par par--chico">{fig(a39, 'modulo', 'A · el módulo a 390')}{fig(a39, 'pie', 'A · el pie a 390')}</div></div>
          <div><p class="rotulo">B · el oro en la primera pantalla</p>
            <p>El módulo pasa a ciruela (la «única placa» de tu manual, hoy negra) y lleva el punto dorado arriba, a 6,24:1. Entonces el punto del pie va en papel, como dice el manual §02: un oro por vista. Pesa más arriba y el resaltador nunca comparte banda con el oro.</p>
            {fig(b14, 'modulo', 'B · el módulo a 1440')}{fig(b14, 'pie', 'B · el pie a 1440')}
            <div class="par par--chico">{fig(b39, 'modulo', 'B · el módulo a 390')}{fig(b39, 'pie', 'B · el pie a 390')}</div></div>
        </div>
      </article>'''


def tabla_fotos():
    filas = ''
    for f in F:
        filas += (f'<tr><th scope="row">{e(f["id"])}</th><td>{e(f["direccion"])}</td><td>{e(f["pagina"].split(" (")[0])}</td>'
                  f'<td>{e(f["proporcion"])}</td><td class="num">{f["ancho_px_1440"]} × {f["alto_px_1440"]}</td>'
                  f'<td class="num">{f["ancho_px_390"]} × {f["alto_px_390"]}</td><td>{e(f["que_muestra"])}</td></tr>')
    return filas


# Comprobaciones (números de los archivos, no escritos a mano)
vistas = len(T['paginas'])
iguales = sum(1 for p in T['paginas'] if p['texto_igual'])
orden = sum(1 for p in T['paginas'] if p['mismo_orden_de_lectura'])
desborde = [k for k, v in M.items() if k.endswith('-390') and v['scrollWidth'] != 390]
cintas_ok = all(c['ok'] for c in C['casos'])
vel = sorted({c['velocidad_px_s'] for c in C['casos']})
oro_ok = all(p['fuera_del_punto']['limpio'] for p in O['paginas'])
dens = {d: [M[f'{d}-{p}-1440']['densidad_texto'] for p, _, _ in PAGINAS] for d in DIRS}
lect = {d: [M[f'{d}-{p}-1440']['densidad_lectura'] for p, _, _ in PAGINAS] for d in DIRS}
hero = {(c['cual'], c['ancho']): c for c in H['casos']}


def y_hero(cual, ancho):
    c = hero[(cual, ancho)]
    return f'chequeo en y {c["chequeo"]}, titular en {c["h1"]}'


pagina = f'''<meta charset="utf-8">
<title>Tablero direcciones E10</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..600&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@500&display=swap');
  /* Tablero de trabajo de un solo tema claro, a propósito: las capturas son de páginas claras y se comparan
     sobre el mismo papel. Una columna: qué se decide, cada dirección con sus tres páginas (1440 y 390 lado a
     lado, el resto de cada página plegado) y su prueba del logo tapado, lo que también decides (manual, colores
     y punto dorado), y al final los espacios de foto y lo comprobado. */
  :root {{
    color-scheme: light;
    --papel: #F7F5F0;      /* fondo (el papel del manual) */
    --tinta: #341F34;      /* titulares y texto principal (el ciruela del manual) */
    --texto: #2E2430;      /* cuerpo */
    --suave: #5E5763;      /* notas (6,4:1 sobre papel) */
    --linea: #D9D3DC;      /* filetes */
    --marco: #EBE7E0;      /* fondo detrás de las capturas */
    --amarillo: #EEF26E;   /* solo el resaltado de la pregunta */
    --f-display: 'Instrument Sans', 'Helvetica Neue', Arial, sans-serif;
    --f-cuerpo: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
    --f-mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;
  }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: var(--papel); color: var(--texto); font: 400 16px/1.55 var(--f-cuerpo); -webkit-font-smoothing: antialiased; }}
  .marco {{ max-width: 1240px; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 40px 72px; }}
  h1, h2, h3 {{ font-family: var(--f-display); font-weight: 500; color: var(--tinta); letter-spacing: -.02em; text-wrap: balance; margin: 0; }}
  h1 {{ font-size: clamp(34px, 5.4vw, 64px); line-height: 1; }}
  h2 {{ font-size: clamp(32px, 4.6vw, 56px); line-height: 1; }}
  h3 {{ font-size: clamp(22px, 2.4vw, 28px); line-height: 1.15; }}
  p, ul, ol {{ margin: 0; }}
  .rotulo, .vista figcaption, .tapado figcaption, summary, th, .num {{ font-family: var(--f-mono); font-weight: 500; }}
  .rotulo {{ font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--suave); }}
  a {{ color: var(--tinta); }}
  code {{ font-family: var(--f-mono); font-size: 13px; }}
  :focus-visible {{ outline: 2px solid var(--tinta); outline-offset: 3px; }}

  /* Arriba: qué se decide */
  .decide {{ display: grid; gap: 20px; padding-bottom: 40px; border-bottom: 1px solid var(--tinta); }}
  .decide ol {{ list-style: none; padding: 0; display: grid; gap: 6px; max-width: 70ch; font-size: 18px; color: var(--tinta); }}
  .decide mark {{ background: var(--amarillo); color: var(--tinta); padding: 0 .12em; }}
  .indice {{ display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 15px; }}

  /* Cada dirección */
  .direccion {{ padding-top: 56px; display: grid; gap: 40px; }}
  .direccion + .direccion {{ margin-top: 56px; border-top: 1px solid var(--tinta); }}
  .direccion__cab {{ display: grid; gap: 14px; max-width: 72ch; }}
  .bajada {{ font: 500 22px/1.3 var(--f-display); color: var(--tinta); }}
  .define {{ display: grid; gap: 8px; padding-left: 1.1em; }}
  .define li:last-child {{ color: var(--tinta); font-weight: 600; }}
  .pagina {{ display: grid; gap: 16px; padding-top: 28px; border-top: 1px solid var(--linea); }}
  .pagina__cab {{ display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; }}
  .pagina__cab p {{ color: var(--suave); font-size: 15px; }}
  .par {{ display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 1fr); gap: 20px; align-items: start; }}
  .par--chico {{ grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }}
  .vista {{ margin: 0; min-width: 0; display: grid; gap: 8px; }}
  .vista figcaption, .tapado figcaption {{ font-size: 12px; color: var(--suave); }}
  .vista img, .tapado img {{ display: block; width: 100%; max-width: 100%; height: auto; background: var(--marco); outline: 1px solid var(--linea); }}
  details {{ border: 1px solid var(--linea); }}
  summary {{ cursor: pointer; padding: 12px 16px; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; color: var(--tinta); }}
  summary:hover {{ background: var(--marco); }}
  .par--resto {{ padding: 4px 16px 16px; }}
  .par--resto .vista {{ gap: 0; }}
  .nada {{ color: var(--suave); font-size: 14px; }}
  .tapados {{ display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; }}
  .tapado {{ margin: 0; display: grid; gap: 8px; align-content: start; }}
  .tapado p {{ font-size: 15px; color: var(--texto); max-width: 62ch; }}

  /* Lo que también decides */
  .decisiones {{ margin-top: 72px; padding-top: 40px; border-top: 1px solid var(--tinta); display: grid; gap: 48px; }}
  .decisiones__cab {{ display: grid; gap: 14px; max-width: 72ch; }}
  .decision {{ display: grid; gap: 20px; padding-top: 28px; border-top: 1px solid var(--linea); }}
  .dos {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: start; }}
  .dos > div {{ display: grid; gap: 14px; align-content: start; }}
  .cuadro {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; }}
  .muestras {{ list-style: none; padding: 0; display: grid; gap: 8px; }}
  .muestras li {{ display: flex; gap: 10px; align-items: center; font-size: 15px; }}
  .chip {{ flex: none; width: 28px; height: 28px; outline: 1px solid var(--linea); }}
  .t-manual th[scope="row"] {{ font: 500 14px/1.4 var(--f-cuerpo); width: 30%; }}
  .t-manual .fecha {{ font-family: var(--f-mono); font-size: 12px; white-space: normal; width: 16%; }}
  .sin-cambio {{ font-size: 15px; max-width: 72ch; }}

  /* Espacios de foto y comprobaciones */
  .anexo {{ margin-top: 72px; padding-top: 40px; border-top: 1px solid var(--tinta); display: grid; gap: 24px; }}
  .tabla {{ overflow-x: auto; border: 1px solid var(--linea); }}
  table {{ border-collapse: collapse; width: 100%; min-width: 820px; font-size: 14px; }}
  th, td {{ text-align: left; vertical-align: top; padding: 10px 12px; border-bottom: 1px solid var(--linea); }}
  thead th {{ font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--suave); background: var(--marco); }}
  tbody th {{ color: var(--tinta); font-size: 14px; }}
  .num {{ font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; }}
  .nota {{ font: 500 20px/1.35 var(--f-display); color: var(--tinta); max-width: 60ch; }}
  .chequeos {{ display: grid; gap: 6px; padding-left: 1.1em; max-width: 80ch; }}

  @media (max-width: 700px) {{
    .par, .tapados, .dos, .cuadro {{ grid-template-columns: minmax(0, 1fr); }}
    .par--chico {{ grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }}
    .vista--cel {{ width: 64%; }}
    .par--resto {{ padding: 4px 8px 8px; }}
  }}
</style>

<div class="marco">
  <header class="decide">
    <p class="rotulo">SpindleLab v3 · E10 · compuerta 2 · 16 de octubre de 2026</p>
    <h1>Dos direcciones para el sitio, las dos desde The Ready</h1>
    <ol>
      <li><mark>Elige una dirección: Taller o Pizarra limpia.</mark></li>
      <li>Decide también tres cosas que tu elección trae: las reglas del manual que cambian, los colores (propios o los exactos de The Ready) y dónde va el punto dorado. Están en «Lo que también decides», después de las dos direcciones.</li>
      <li>Si quieres algo de la otra, dilo por su nombre (por ejemplo, «la cinta de Pizarra en Taller»).</li>
      <li>Las dos usan el texto de E8 tal cual y en el mismo orden que el sitio: el chequeo arriba, después el titular y la fila de obras, como decidiste (spec §0.4). Solo se agregan los rótulos de foto y la cinta.</li>
      <li>Lo que elijas se escribe como especificación visual antes de construir.</li>
    </ol>
    <nav class="indice" aria-label="En este tablero">
      <a href="#taller">Taller</a><a href="#pizarra">Pizarra limpia</a><a href="#decides">Lo que también decides</a><a href="#fotos">Espacios de foto</a><a href="#comprobado">Lo comprobado</a>
    </nav>
  </header>

  {bloque_direccion('taller')}
  {bloque_direccion('pizarra')}

  <section class="decisiones" id="decides" aria-labelledby="t-decides">
    <div class="decisiones__cab">
      <p class="rotulo">Lo que también decides</p>
      <h2 id="t-decides">Lo que tu elección cambia</h2>
      <p>Elegir cualquiera de las dos cambia reglas que tú aprobaste. Ninguna se aplica sin tu sí: decide cada una aquí, con la dirección.</p>
    </div>
    <article class="decision" id="manual">
      <h3>1 · Lo que tu elección cambia del manual</h3>
      {tabla_manual()}
      <p class="sin-cambio"><b>No cambia:</b> Gabarito para el wordmark, el punto como única firma, un solo oro por vista, el texto de E8, los precios, el chequeo y el formulario. La regla de personas generadas como ambiente (nunca como tu equipo ni como clientes) ya la aprobaste el 15-oct.</p>
    </article>
    {bloque_colores()}
    {bloque_oro()}
  </section>

  <section class="anexo" id="fotos" aria-labelledby="t-fotos">
    <p class="rotulo">Fotos por generar</p>
    <h2 id="t-fotos">Espacios de foto</h2>
    <p>Cada espacio gris con la cruz es una foto nueva, del tamaño y la proporción exactos. Las personas son ambiente de la empresa del cliente: nada las presenta como equipo de SpindleLab ni como clientes, y ninguna va al lado de tu retrato. La obra, las pantallas y tu retrato son reales.</p>
    <div class="tabla" role="region" aria-label="Lista de espacios de foto" tabindex="0">
      <table>
        <thead><tr><th scope="col">Foto</th><th scope="col">Dirección</th><th scope="col">Página</th><th scope="col">Proporción</th><th scope="col">A 1440 (px)</th><th scope="col">A 390 (px)</th><th scope="col">Qué muestra</th></tr></thead>
        <tbody>{tabla_fotos()}</tbody>
      </table>
    </div>
    <p class="nota">Las fotos F1 a F{max(int(f["id"][1:]) for f in F)} se generan con IA en la sesión siguiente; lo que ves marcado es su lugar y su tamaño.</p>
  </section>

  <section class="anexo" id="comprobado" aria-labelledby="t-comprobado">
    <p class="rotulo">Medido en el navegador</p>
    <h2 id="t-comprobado">Lo comprobado</h2>
    <ul class="chequeos">
      <li>Texto visible igual al del sitio construido en {iguales} de {vistas} vistas (3 páginas, 2 direcciones, 1440 y 390), y en el mismo orden de lectura en {orden} de {vistas}. Se comparó con JavaScript apagado en las dos: con JavaScript, el sitio suma en el pie el control «Cookies» del aviso de cookies, que los prototipos no cargan. Solo se agregan los rótulos de foto y la cinta, que repite palabras ya publicadas.</li>
      <li>El hero en el orden del sitio, a 1440: sitio {y_hero('build', 1440)}; Taller {y_hero('taller', 1440)}; Pizarra limpia {y_hero('pizarra', 1440)}. A 390: sitio {y_hero('build', 390)}; Taller {y_hero('taller', 390)}; Pizarra limpia {y_hero('pizarra', 390)}.</li>
      <li>Sin desborde a 390 en ninguna página{"" if not desborde else ": revisar " + ", ".join(desborde)}. Contraste: ningún hallazgo con <code>npm run verificar</code> sobre los seis prototipos, a 390 y a 1440.</li>
      <li>La cinta corre a {coma(vel[0])} a {coma(vel[-1])} px por segundo, se pausa con su botón y queda quieta con movimiento reducido{"" if cintas_ok else " (con fallas, ver img/cinta-prueba.json)"}.</li>
      <li>Un solo oro por página: el punto del wordmark en el pie ciruela{"" if oro_ok else " (hay oro fuera del punto, ver img/oro.json)"}. El resaltador no cuenta como oro.</li>
      <li>Texto sobre el área de la página a 1440: Taller {coma(min(dens["taller"]))} a {coma(max(dens["taller"]))} %, Pizarra limpia {coma(min(dens["pizarra"]))} a {coma(max(dens["pizarra"]))} %. Sin la letra display (40 px o más), que ocupa área pero se lee de un golpe: Taller {coma(min(lect["taller"]))} a {coma(max(lect["taller"]))} %, Pizarra limpia {coma(min(lect["pizarra"]))} a {coma(max(lect["pizarra"]))} %. Con la letra grande de vuelta en Pizarra, la densidad ya no es lo que más separa a las dos: las separan el color, las marcas a mano, la gente en las fotos y la estructura.</li>
      <li>En Trabajo, «Bernardo Combeau | Model» usa la captura en notebook en vez de la del teléfono: la del teléfono tiene una palmera que cuenta como oro.</li>
      <li>El subrayado del hero va en «se corta», al final de la primera línea: en castellano la consecuencia está en el verbo.</li>
    </ul>
  </section>
</div>
'''
open(os.path.join(AQUI, 'tablero.html'), 'w', encoding='utf-8').write(pagina)
n_img = pagina.count('<img ')
print('tablero.html', len(pagina.encode('utf-8')), 'bytes;', n_img, 'imágenes')
