#!/usr/bin/env python3
"""E12 · caso Combeau en A · arma los medios del caso, listos para la construcción (corrida 2). Diego, 19-oct-2026.

Entradas (nada se genera; todo es del sitio vivo de Bernardo Combeau, con el permiso de la compuerta 1, punto 2):
  <cuadros>/modelo-1440/, <cuadros>/modelo-390/   cuadros de grabar-modelo-sin-medidas.mjs (sin la línea de medidas)
  <portadas>/*-primera.png                        de capturar-portadas.mjs (dpr 2; /modelo/ a 390, cortada sobre la línea)
  <beto3>                                         la foto de la portada como la entrega su sitio (Netlify Image CDN)
  e12/inventario/grabaciones/combeau-fotografia-*.mp4 y combeau-panel-entrada-1440.png (18-oct)

Salida: e12/casos/combeau/medios/ y medios.json (origen, px, bytes, sha256, nota y un alt de partida para Clara).
Formatos: video en VP9/WebM y H.264/MP4 (faststart), sin audio; imágenes en WebP. Nada va a spindlelab-astro/.

Uso: python3 -I medios-combeau.py <cuadros> <portadas> <beto3-servida.webp>
"""
import hashlib, json, shutil, subprocess, sys
from pathlib import Path
from PIL import Image

REPO = Path('/home/user/spindlelab')
E12 = REPO / 'marketing/oficina/obras-web/spindlelab-v3/e12'
SALIDA = E12 / 'casos/combeau/medios'
GRAB = E12 / 'inventario/grabaciones'
cuadros, portadas, beto3 = (Path(a) for a in sys.argv[1:4])
SALIDA.mkdir(parents=True, exist_ok=True)
registro = {}


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def ff(*args):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *map(str, args)], check=True)


def sonda(p):
    o = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
                                   'stream=codec_name,width,height,r_frame_rate:format=duration', '-of', 'json', str(p)],
                                  capture_output=True, text=True, check=True).stdout)
    s = o['streams'][0]
    n, d = s['r_frame_rate'].split('/')
    return {'codec': s['codec_name'], 'px': [s['width'], s['height']], 'cps': round(int(n) / int(d), 2),
            'segundos': round(float(o['format']['duration']), 2)}


def anotar(nombre, de, nota, alt, extra=None):
    p = SALIDA / nombre
    r = {'de': de, 'bytes': p.stat().st_size, 'sha256': sha(p), 'nota': nota, 'altDePartida': alt}
    if p.suffix in ('.webm', '.mp4'):
        r.update(sonda(p))
    else:
        with Image.open(p) as im:
            r['px'] = list(im.size)
    if extra:
        r.update(extra)
    registro[nombre] = r


def webp(im, nombre, de, nota, alt, calidad=82):
    im.convert('RGB').save(SALIDA / nombre, 'WEBP', quality=calidad, method=6)
    anotar(nombre, de, nota, alt)


def recorte_proporcion(im, prop, desde_arriba=True):
    """Recorta al ancho completo con la proporción ancho/alto pedida, desde arriba."""
    w, h = im.size
    alto = round(w / prop)
    if alto > h:
        ancho = round(h * prop)
        x = (w - ancho) // 2
        return im.crop((x, 0, x + ancho, h))
    return im.crop((0, 0, w, alto))


def video(origen_args, base, de, nota, alt, ancho_max=None, crf_vp9=34, crf_264=26):
    escala = ['-vf', f"scale='min({ancho_max},iw)':-2:flags=lanczos,format=yuv420p"] if ancho_max else ['-vf', 'format=yuv420p']
    ff(*origen_args, *escala, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', crf_vp9, '-row-mt', '1',
       '-deadline', 'good', '-cpu-used', '2', SALIDA / f'{base}.webm')
    ff(*origen_args, *escala, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', crf_264, '-movflags', '+faststart',
       SALIDA / f'{base}.mp4')
    anotar(f'{base}.webm', de, nota, alt)
    anotar(f'{base}.mp4', de, nota + ' Misma pieza en H.264, para Safari.', alt)


# 1. El book de modelo: recorrido sin la línea de medidas, 8 s
for ancho in (1440, 390):
    d = cuadros / f'modelo-{ancho}'
    video(['-framerate', '30', '-i', d / 'c%04d.png'], f'combeau-modelo-recorrido-{ancho}',
          [f'grabar-modelo-sin-medidas.mjs, bernardocombeau.cl/modelo/ a {ancho}, 19-oct-2026 (crudo/grabacion-modelo-sin-medidas.json)'],
          'Del retrato de portada ya fuera de cuadro hasta antes de «Reel»: el book, «Selected Work» y «Commercials». '
          'La línea de medidas, las polaroids, la ficha (#details) y el pie de contratación (#booking) no entran a ningún cuadro (comprobado cuadro a cuadro).',
          'Recorrido por el book de modelo de Bernardo Combeau: retratos, sus trabajos publicitarios y sus comerciales.')
    im = Image.open(d / 'c0000.png')
    webp(im if ancho == 1440 else im, f'combeau-modelo-recorrido-{ancho}-poster.webp',
         [f'primer cuadro de combeau-modelo-recorrido-{ancho}'], 'Póster del recorrido.',
         'Dos retratos del book de modelo de Bernardo Combeau.')

# 2. El sitio de fotografía: las grabaciones del inventario (18-oct) no muestran ningún dato personal; se recodifican
for ancho in (1440, 390):
    src = GRAB / f'combeau-fotografia-{ancho}.mp4'
    video(['-i', src], f'combeau-fotografia-recorrido-{ancho}',
          [f'e12/inventario/grabaciones/combeau-fotografia-{ancho}.mp4 (18-oct-2026, sha256 en inventario/crudo/grabaciones-combeau.json)'],
          'La portada de punta a punta: el hero, «Retratos» y «Proyectos». Sin enlaces de contacto (0, medido al grabar).',
          'Recorrido por el sitio de fotografía de Bernardo Combeau: la portada, sus retratos y sus proyectos.')
    im = Image.open(GRAB / f'combeau-fotografia-{ancho}-poster.jpg')
    webp(im, f'combeau-fotografia-recorrido-{ancho}-poster.webp', [f'combeau-fotografia-{ancho}-poster.jpg (inventario)'],
         'Póster del recorrido.', 'Portada del sitio de Bernardo Combeau: «Un buen retrato no se toma. Se construye dirigiendo a la persona hasta su mejor versión.»')

# 3. Las imágenes fijas: primeras pantallas en dpr 2, y las proporciones que usa A (16:9 a 1600 px, 4:5 a 780 px)
p = {n: Image.open(portadas / f'{n}-primera.png') for n in ('fotografia-1440', 'fotografia-390', 'modelo-1440', 'modelo-390')}
webp(recorte_proporcion(p['fotografia-1440'], 16 / 9).resize((1600, 900), Image.LANCZOS), 'combeau-fotografia-169.webp',
     ['capturar-portadas.mjs: bernardocombeau.cl a 1440, dpr 2, 19-oct-2026'], '',
     'Portada del sitio de fotografía de Bernardo Combeau, con su frase sobre un retrato en verde.')
webp(recorte_proporcion(p['fotografia-390'], 4 / 5), 'combeau-fotografia-45.webp',
     ['capturar-portadas.mjs: bernardocombeau.cl a 390, dpr 2, 19-oct-2026'], '',
     'La portada del sitio de fotografía de Bernardo Combeau en un teléfono.')
webp(recorte_proporcion(p['modelo-1440'], 16 / 9).resize((1600, 900), Image.LANCZOS), 'combeau-modelo-169.webp',
     ['capturar-portadas.mjs: bernardocombeau.cl/modelo/ a 1440, dpr 2, 19-oct-2026'],
     'Primera pantalla entera: a 1440 la línea de medidas queda bajo el pliegue (y = 916 con la ventana de 900).',
     'Portada del book de modelo de Bernardo Combeau: él, de traje, apoyado en una columna.')
webp(recorte_proporcion(p['modelo-390'], 4 / 5), 'combeau-modelo-45.webp',
     ['capturar-portadas.mjs: bernardocombeau.cl/modelo/ a 390, dpr 2, 19-oct-2026'],
     'Recortada sobre la línea de medidas (la captura termina 8 px antes; el 4:5 corta más arriba aún), como la de A en proto/a/medios.',
     'El book de modelo de Bernardo Combeau en un teléfono: su nombre, el menú y su retrato de traje.')

# 4. La pantalla de entrada del panel (sin hacer clic: el panel por dentro es un hueco nombrado)
webp(Image.open(GRAB / 'combeau-panel-entrada-1440.png'), 'combeau-panel-entrada-169.webp',
     ['e12/inventario/grabaciones/combeau-panel-entrada-1440.png (18-oct-2026)'],
     'Solo la puerta del panel (Decap CMS); por dentro no se grabó: pide la sesión de GitHub de Bernardo.',
     'La pantalla de entrada del panel donde Bernardo carga sus series, con el botón para entrar con GitHub.')

# 4b. El panel por dentro, de las capturas del 3-sep-2026 (revisión del panel, Bruno y Diego): una copia de su repo
# (`0c32d879`) corriendo en local con el backend local de Decap y sus datos reales de ese día, no su sesión. Se recorta
# arriba (16:9) para que no entre el campo «Descripción para lectores de pantalla», que trae el nombre de pila de la
# persona retratada. La biblioteca de medios (05, 09) no se usa: muestra nombres de archivo de terceros.
REV = REPO / 'marketing/encargos-otras-sesiones/revision-panel-admin-bernardo-capturas'
DE_REV = 'marketing/encargos-otras-sesiones/revision-panel-admin-bernardo-capturas/{} (3-sep-2026; método en revision-panel-admin-bernardo.md, «Cómo se hizo esta revisión»)'
NOTA_REV = ('Captura del 3-sep-2026, de una copia de su repo corriendo en local con el backend local de Decap y sus datos de ese día; '
            'no es su panel en producción, que pide su sesión de GitHub. Lo que sí coincide con producción el 18-oct: la pantalla de entrada, sin el logo de Decap y con su nombre.')
webp(recorte_proporcion(Image.open(REV / '11-encuadre-widget-portada.png'), 16 / 9), 'combeau-panel-encuadre-169.webp',
     [DE_REV.format('11-encuadre-widget-portada.png')], NOTA_REV + ' Recortada arriba: el campo con el nombre de la persona retratada queda fuera.',
     'El panel de Bernardo editando una serie de retratos: a la izquierda elige qué parte de la foto no se corta; a la derecha, la página como va a quedar.')
webp(recorte_proporcion(Image.open(REV / '08-rediseno-sidebar-agrupada.png'), 16 / 9), 'combeau-panel-colecciones-169.webp',
     [DE_REV.format('08-rediseno-sidebar-agrupada.png')], NOTA_REV,
     'El panel de Bernardo: la lista de lo que puede editar (portada, sobre mí, estudio, servicios, contacto, retratos, proyectos).')

# 5. La foto que él sube y la que ve su visitante: la servida, byte a byte como la entrega su sitio
shutil.copyfile(beto3, SALIDA / 'combeau-foto-servida-828.webp')
anotar('combeau-foto-servida-828.webp',
       ['GET https://bernardocombeau.cl/.netlify/images?url=%2Fuploads%2Fbeto3.jpg&w=828&h=828&q=80, 19-oct-2026 13:14Z'],
       'Sin recodificar: los mismos 94.576 bytes que su sitio entrega (el 16-oct también). El original, https://bernardocombeau.cl/uploads/beto3.jpg, '
       'pesa 804.697 bytes (HEAD del 19-oct, mismo etag que el 16-oct) y no se copia: se enlaza.',
       'Retrato de un músico con un acordeón rojo, de la serie «El músico» de Bernardo Combeau.',
       {'original': {'url': 'https://bernardocombeau.cl/uploads/beto3.jpg', 'bytes': 804697, 'tipo': 'image/jpeg'}})

# 6. Los dos tramos de la cinta de la home de A, limpios (2 s, 1280 × 720, como proto/a/medios/cinta.*)
TRAMO = 2
for nombre, args in (
    ('combeau-modelo-cinta', ['-framerate', '30', '-start_number', '18', '-i', cuadros / 'modelo-1440' / 'c%04d.png']),
    ('combeau-fotografia-cinta', ['-ss', '1.0', '-i', GRAB / 'combeau-fotografia-1440.mp4']),
):
    ff(*args, '-t', TRAMO, '-vf', 'scale=1280:720:flags=lanczos,fps=30,format=yuv420p', '-an', '-c:v', 'libx264',
       '-crf', '16', '-preset', 'fast', SALIDA / f'{nombre}-tramo.mp4')
    src = SALIDA / f'{nombre}-tramo.mp4'
    ff('-i', src, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', SALIDA / f'{nombre}.webm')
    ff('-i', src, '-an', '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-movflags', '+faststart', SALIDA / f'{nombre}.mp4')
    src.unlink()
    de = ['combeau-modelo-recorrido-1440 (cuadros 18 a 77)'] if 'modelo' in nombre else ['combeau-fotografia-1440.mp4 del inventario, de 1,0 a 3,0 s']
    nota = ('Tramo de 2 s para rehacer la cinta de la home de A: la cinta de proto/a/medios muestra la línea de medidas en su tramo '
            '«Combeau, modelo» (12 a 14 s) y no se reutiliza tal cual.') if 'modelo' in nombre else 'Tramo de 2 s para la cinta de la home de A.'
    alt = 'Combeau, modelo: su book, bajando.' if 'modelo' in nombre else 'Combeau, fotografía: la portada de su sitio, bajando.'
    anotar(f'{nombre}.webm', de, nota, alt)
    anotar(f'{nombre}.mp4', de, nota + ' En H.264.', alt)

(SALIDA.parent / 'medios.json').write_text(json.dumps(registro, ensure_ascii=False, indent=1) + '\n')
total = sum(v['bytes'] for v in registro.values())
print(f'{len(registro)} archivos, {total / 1e6:.2f} MB')
for k, v in registro.items():
    print(k, v.get('px'), v['bytes'], v.get('segundos', ''))
