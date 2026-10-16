# armar-tablero.py — tablero.html de la compuerta 2 de E10 (Lucía, 16-oct-2026).
# Lee img/medidas.json (renderizar.mjs), espacios-foto.json, texto-igual.json, img/cinta-prueba.json e img/oro.json,
# y escribe tablero.html para publicarse como Artifact privado (sin doctype/html/head/body; imágenes por ruta img/…).
# Uso: python3 -I herramientas/armar-tablero.py   (desde tableros/e10-direcciones/)
import html, json, os

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = json.load(open(os.path.join(AQUI, 'img/medidas.json'), encoding='utf-8'))
F = json.load(open(os.path.join(AQUI, 'espacios-foto.json'), encoding='utf-8'))
T = json.load(open(os.path.join(AQUI, 'texto-igual.json'), encoding='utf-8'))
C = json.load(open(os.path.join(AQUI, 'img/cinta-prueba.json'), encoding='utf-8'))
O = json.load(open(os.path.join(AQUI, 'img/oro.json'), encoding='utf-8'))
e = html.escape

PAGINAS = [('home', 'Home', 'la portada, con el hero «Ahí se corta el circuito» y el chequeo'),
           ('acompanamiento-mensual', 'Acompañamiento mensual', 'un servicio, con sus planes y el compromiso de los 3 meses'),
           ('trabajo', 'Trabajo', 'las cuatro piezas de obra')]

DIRS = {
    'taller': {
        'nombre': 'Taller',
        'bajada': 'The Ready a fondo.',
        'define': [
            'La cinta corre en la home y en Acompañamiento, y el subrayado amarillo marca hasta cuatro frases por página, siempre la que remata la idea.',
            'Cada banda de color tiene un trabajo: amarilla para lo que ganas, lima para la portada de Trabajo, ciruela para el cierre con el óvalo lavanda.',
            'Una mancha naranja y un garabato por página, el óvalo como botón principal y fotos de gente trabajando que tocan los bordes de la pantalla.',
            'Titulares de 138 px en la portada y una página con mucha cosa a la vista: el texto cubre 12 a 22 % de la página a 1440.',
            'Lo que sacrifica: la calma. Hay más elementos compitiendo y pide 6 de las 8 fotos por generar.',
        ],
    },
    'pizarra': {
        'nombre': 'Pizarra limpia',
        'bajada': 'La letra y los colores de The Ready sobre la claridad de Gehl.',
        'define': [
            'Un solo fondo papel hasta el pie ciruela. Rótulos a la izquierda y columna de lectura a la derecha, con el mismo aire entre bloques.',
            'La cinta aparece una vez, bajo el chequeo de la home, con las 21 señales que revisa. El subrayado va uno por página, en la palabra que importa: «se corta».',
            'Sin bandas amarillas, sin lima, sin mancha ni garabatos. El óvalo vive solo en el pie.',
            'Fotos a sangre como banda propia, sin nada escrito encima. El texto cubre 6 a 13 % de la página a 1440.',
            'Lo que sacrifica: el juego. Es la más cercana al «sitio típico» que le criticaste a Gehl; el carácter lo pone la letra grande del hero.',
        ],
    },
}


def tramos(clave, ancho):
    return M[f'{clave}-{ancho}']['tramos']


def img(nombre, w, h, alt, lazy=True):
    carga = ' loading="lazy"' if lazy else ''
    return f'<img src="img/{e(nombre)}" width="{w}" height="{h}" alt="{e(alt)}"{carga} decoding="async">'


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
    </section>'''


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
desborde = [k for k, v in M.items() if k.endswith('-390') and v['scrollWidth'] != 390]
cintas_ok = all(c['ok'] for c in C['casos'])
vel = sorted({c['velocidad_px_s'] for c in C['casos']})
oro_ok = all(p['fuera_del_punto']['limpio'] for p in O['paginas'])
dens = {d: [M[f'{d}-{p}-1440']['densidad_texto'] for p, _, _ in PAGINAS] for d in DIRS}

pagina = f'''<meta charset="utf-8">
<title>Tablero direcciones E10</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..600&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@500&display=swap');
  /* Tablero de trabajo de un solo tema claro, a propósito: las capturas son de páginas claras y se comparan
     sobre el mismo papel. Una columna: qué se decide, cada dirección con sus tres páginas (1440 y 390 lado a
     lado, el resto de cada página plegado), y al final los espacios de foto y lo comprobado. */
  :root {{
    color-scheme: light;
    --papel: #FFFEFA;      /* fondo */
    --tinta: #1B0925;      /* titulares y texto principal */
    --texto: #2B2430;      /* cuerpo */
    --suave: #5E5763;      /* notas (7,0:1 sobre papel) */
    --linea: #D9D3DC;      /* filetes */
    --marco: #EDEAE4;      /* fondo detrás de las capturas */
    --amarillo: #F4F480;   /* solo el resaltado de la pregunta */
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
  .rotulo, .vista figcaption, summary, th, .num {{ font-family: var(--f-mono); font-weight: 500; }}
  .rotulo {{ font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--suave); }}
  a {{ color: var(--tinta); }}
  :focus-visible {{ outline: 2px solid var(--tinta); outline-offset: 3px; }}

  /* Arriba: qué se decide */
  .decide {{ display: grid; gap: 20px; padding-bottom: 40px; border-bottom: 1px solid var(--tinta); }}
  .decide ol {{ list-style: none; padding: 0; display: grid; gap: 6px; max-width: 66ch; font-size: 18px; color: var(--tinta); }}
  .decide mark {{ background: var(--amarillo); color: var(--tinta); padding: 0 .12em; }}
  .indice {{ display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 15px; }}

  /* Cada dirección */
  .direccion {{ padding-top: 56px; display: grid; gap: 40px; }}
  .direccion + .direccion {{ margin-top: 56px; border-top: 1px solid var(--tinta); }}
  .direccion__cab {{ display: grid; gap: 14px; max-width: 70ch; }}
  .bajada {{ font: 500 22px/1.3 var(--f-display); color: var(--tinta); }}
  .define {{ display: grid; gap: 8px; padding-left: 1.1em; }}
  .define li:last-child {{ color: var(--tinta); font-weight: 600; }}
  .pagina {{ display: grid; gap: 16px; padding-top: 28px; border-top: 1px solid var(--linea); }}
  .pagina__cab {{ display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; }}
  .pagina__cab p {{ color: var(--suave); font-size: 15px; }}
  .par {{ display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 1fr); gap: 20px; align-items: start; }}
  .vista {{ margin: 0; min-width: 0; display: grid; gap: 8px; }}
  .vista figcaption {{ font-size: 12px; color: var(--suave); }}
  .vista img {{ display: block; width: 100%; max-width: 100%; height: auto; background: var(--marco); outline: 1px solid var(--linea); }}
  .vista--ancha img + img, .vista--cel img + img {{ outline-offset: 0; }}
  details {{ border: 1px solid var(--linea); }}
  summary {{ cursor: pointer; padding: 12px 16px; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; color: var(--tinta); }}
  summary:hover {{ background: var(--marco); }}
  .par--resto {{ padding: 4px 16px 16px; }}
  .par--resto .vista {{ gap: 0; }}
  .nada {{ color: var(--suave); font-size: 14px; }}

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
  .chequeos code {{ font-family: var(--f-mono); font-size: 13px; }}

  @media (max-width: 700px) {{
    .par {{ grid-template-columns: minmax(0, 1fr); }}
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
      <li>Si quieres algo de la otra, dilo por su nombre (por ejemplo, «la cinta de Pizarra en Taller»).</li>
      <li>Las dos usan el texto de E8 tal cual, el mismo chequeo y los mismos precios.</li>
      <li>Lo que elijas se escribe como especificación visual antes de construir.</li>
    </ol>
    <nav class="indice" aria-label="En este tablero">
      <a href="#taller">Taller</a><a href="#pizarra">Pizarra limpia</a><a href="#fotos">Espacios de foto</a><a href="#comprobado">Lo comprobado</a>
    </nav>
  </header>

  {bloque_direccion('taller')}
  {bloque_direccion('pizarra')}

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
      <li>Texto visible igual al del sitio construido en {iguales} de {vistas} vistas (3 páginas, 2 direcciones, 1440 y 390). Solo se agregan los rótulos de foto y la cinta, que repite palabras ya publicadas.</li>
      <li>Sin desborde a 390 en ninguna página{"" if not desborde else ": revisar " + ", ".join(desborde)}.</li>
      <li>La cinta corre a {vel[0]:g}-{vel[-1]:g} px por segundo, se pausa con su botón y queda quieta con movimiento reducido{"" if cintas_ok else " (con fallas, ver img/cinta-prueba.json)"}.</li>
      <li>Un solo oro por página: el punto del wordmark en el pie ciruela{"" if oro_ok else " (hay oro fuera del punto, ver img/oro.json)"}. El amarillo no cuenta como oro.</li>
      <li>Texto sobre el área de la página a 1440: Taller {min(dens["taller"]):g} a {max(dens["taller"]):g} %, Pizarra limpia {min(dens["pizarra"]):g} a {max(dens["pizarra"]):g} %.</li>
      <li>En Trabajo, «Bernardo Combeau | Model» usa la captura en notebook en vez de la del teléfono: la del teléfono tiene una palmera que cuenta como oro.</li>
      <li>El subrayado del hero va en «se corta», al final de la primera línea: en castellano la consecuencia está en el verbo.</li>
    </ul>
  </section>
</div>
'''
open(os.path.join(AQUI, 'tablero.html'), 'w', encoding='utf-8').write(pagina)
print('tablero.html', len(pagina.encode('utf-8')), 'bytes;', sum(len(M[k]['tramos']) for k in M), 'imágenes')
