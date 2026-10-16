# espacios-foto.py — escribe espacios-foto.json desde las medidas del render (img/medidas.json). Lucía, 16-oct-2026.
# Uso: python3 -I herramientas/espacios-foto.py   (después de renderizar.mjs)
import json, os
AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = json.load(open(os.path.join(AQUI, 'img/medidas.json'), encoding='utf-8'))
NOMBRE = {'taller': 'Taller', 'pizarra': 'Pizarra limpia'}
PAG = {'home': 'Home (/v3/)', 'acompanamiento-mensual': 'Acompañamiento mensual (/v3/servicios/acompanamiento-mensual/)', 'trabajo': 'Trabajo (/v3/trabajo/)'}
# id: (dirección, página, proporción escrita, rótulo, qué muestra, por qué aquí, pauta de Bruno del 16-oct)
F = [
 ('F1', 'taller', 'home', '0,58 vertical a 1440 · 4:5 a 390', 'gente de pie en una mesa con hojas y notas',
  'Tres personas de pie alrededor de una mesa larga con hojas impresas y notas de colores, en la oficina vidriada de una empresa cliente (una distribuidora, la bodega al fondo). De espaldas o de perfil, nadie posa a cámara. Luz de día, grano en el archivo.',
  'A sangre derecha, al lado de «Tu sitio está escrito para personas…» (la frase grande de «Qué hacemos»): gente trabajando es la energía de Taller. Desde la ronda 1 de QA ya no va en el hero, que vuelve al orden del sitio (instrumento, titular, fila de obras). Es gente en su trabajo, no un equipo de SpindleLab ni un cliente (regla nueva de personas generadas).', 'F1'),
 ('F2', 'taller', 'home', '4:5', 'alguien responde a un cliente en el mesón',
  'Detrás del mesón de una ferretería o distribuidora, una persona responde el mensaje de un cliente en el teléfono, de perfil; la pantalla no se lee. Estanterías ordenadas fuera de foco.',
  'Va en la banda del resaltador de Visibilidad («lo que ganas»): que te encuentren cuando preguntan por tu rubro es la consulta que llega al mesón.', 'F10'),
 ('F3', 'taller', 'home', '4:3', 'notas en una planilla de cuatro columnas',
  'Dos personas de espaldas mueven notas de colores en una planilla de cuatro columnas hecha con cinta sobre una pizarra, en el entrepiso de una bodega.',
  'Encabeza Continuidad (Acompañamiento mensual): las cuatro columnas son las cuatro semanas del mes tipo. Columna izquierda del par Continuidad y Alcance.', 'F6'),
 ('F4', 'taller', 'home', '3:2', 'un mensaje que llega al taller',
  'En una maestranza, un hombre de unos cincuenta con chaqueta de trabajo lee un mensaje en el teléfono junto al banco de trabajo; otro trabajador al fondo. Luz de día por el techo.',
  'Encabeza Alcance (redes y Google Ads): llegar a quien ya está buscando es el mensaje que entra al negocio. Columna derecha del par, bajada 120 px (la asimetría de The Ready).', 'F5'),
 ('F5', 'pizarra', 'home', '21:9 a 1440 · 4:5 a 390', 'una mesa larga junto a la ventana, con la cordillera',
  'Planta libre en altura: una mesa blanca larga junto al ventanal, una sola persona chica al fondo trabajando en un notebook, la cordillera con nieve detrás. Color natural, sin grano, mucho aire.',
  'Es la foto a sangre de Gehl hecha banda propia, sin nada escrito encima (manual §07b): separa «Qué hacemos» de los servicios y es la única foto grande de la home en Pizarra limpia.', 'F2'),
 ('F6', 'taller', 'acompanamiento-mensual', '3:2', 'dos personas comparan hojas pegadas en la pared',
  'En la sala de reuniones de una empresa mediana, de cielo alto, dos personas pegan hojas impresas en fila en la pared y las comparan; una de perfil, otra de espaldas.',
  'A sangre derecha, al lado de «Una auditoría te dice qué hacer; este servicio lo hace y lo sostiene»: el trabajo en marcha, en la empresa del cliente.', 'F7'),
 ('F7', 'pizarra', 'acompanamiento-mensual', '21:9 a 1440 · 4:5 a 390', 'la mesa de una sala chica, después de la reunión',
  'Una sala chica y quieta después de una reunión: mesa blanca, una silla corrida, una hoja con una grilla de cuatro semanas, el notebook cerrado y dos tazas. Sin personas.',
  'Banda a sangre bajo la cabecera, donde el build tenía d/ventana.jpg (que sale). Sin personas: Pizarra limpia deja la gente para Taller y cuenta el servicio con objetos.', 'F9'),
 ('F8', 'taller', 'trabajo', '4:3', 'bocetos de páginas hechos a mano en papel',
  'Hojas blancas con esquemas de páginas web dibujados a mano con plumón ciruela (cajas y líneas, sin letras), dos notas de colores y el plumón destapado. Sin personas.',
  '«Antes de construir el tuyo»: el boceto es lo que viene antes de construir. En Taller va en la banda del resaltador, al lado del botón «Correr el chequeo».', 'F8'),
 ('F8', 'pizarra', 'trabajo', '4:3', 'bocetos de páginas hechos a mano en papel',
  'La misma foto que en Taller.',
  'En la columna de lectura, bajo el cierre «Antes de construir el tuyo», como las fotos intermedias de Gehl.', 'F8'),
]
out = []
for fid, d, p, prop, rot, que, porque, bruno in F:
    e14 = [e for e in M[f'{d}-{p}-1440']['espacios'] if e['id'] == fid]
    e39 = [e for e in M[f'{d}-{p}-390']['espacios'] if e['id'] == fid]
    assert len(e14) == 1 and len(e39) == 1, (fid, d, p)
    a, b = e14[0], e39[0]
    out.append({'id': fid, 'direccion': NOMBRE[d], 'pagina': PAG[p], 'proporcion': prop,
                'ancho_px_1440': a['ancho'], 'alto_px_1440': a['alto'], 'ancho_px_390': b['ancho'], 'alto_px_390': b['alto'],
                'rotulo': f'Foto por generar · {fid} · {rot}', 'que_muestra': que, 'por_que_aqui': porque,
                'pauta_bruno_16oct': bruno})
nota = ('Medidas en px CSS del render (img/medidas.json): a 1440 con deviceScaleFactor 1 y a 390 con 2, así que el archivo '
        'tiene que tener al menos el doble del ancho a 390 y 1× a 1440 (mejor 2× para pantallas retina). Las personas son '
        'ambiente: nada las presenta como equipo de SpindleLab ni como clientes (regla nueva, manual §07b); ninguna va al '
        'lado del retrato de Ramón. Se mide el oro igual que en el pool. «pauta_bruno_16oct» es la foto de e10/fotos/pauta.json '
        'que corresponde, como estaba el 16-oct a las 00:21; si Bruno renumera, manda su tabla de equivalencia.')
# El encargo pide una lista: [{id, direccion, pagina, proporcion, ancho_px_1440, que_muestra, por_que_aqui}]. La nota va
# en cada entrada como «notas» para que la lista se lea sola.
for e in out:
    e['notas'] = nota
json.dump(out, open(os.path.join(AQUI, 'espacios-foto.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(out), 'espacios;', len({e['id'] for e in out}), 'fotos distintas')
