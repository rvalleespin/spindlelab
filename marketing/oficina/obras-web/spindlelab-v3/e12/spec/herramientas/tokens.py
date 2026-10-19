"""E12 · spec sobre A · el contraste de cada par de tokens de la spec §1.1, calculado desde el hex. Lucía, 19-oct-2026.

WCAG 2.1 (luminancia relativa con el umbral 0,04045 de sRGB). Las transparencias se componen sobre su fondo en sRGB, como
el navegador. Cada par dice su mínimo: 4,5 para texto de menos de 24 px, 3 para texto desde 24 px y para formas y bordes
que identifican un control (1.4.11). Los pares «decorativos» no cargan información y no tienen mínimo.

Uso: python3 -I tokens.py <salida.json>
"""
import json
import sys


def hexa(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def lum(c):
    def f(x):
        x /= 255
        return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def sobre(c, a, fondo):
    return [round(c[i] * a + fondo[i] * (1 - a), 3) for i in range(3)]


T = {
    'lienzo': hexa('#060606'), 'placa': hexa('#141414'), 'placa-activa': hexa('#202020'), 'blanco': hexa('#FFFFFF'),
    'gris': hexa('#989898'), 'linea-seccion': hexa('#2D2D2D'), 'borde-campo': hexa('#707070'), 'apretado': hexa('#D0D0D0'),
}
T['blanco-70'] = sobre(T['blanco'], .70, T['lienzo'])           # el menú en reposo
T['linea'] = sobre(T['blanco'], .10, T['lienzo'])               # blanco al 10 % sobre el lienzo
T['subrayado'] = sobre(T['blanco'], .45, T['lienzo'])           # el subrayado de un enlace del cuerpo en reposo
T['velo-portada'] = sobre(T['lienzo'], .88, T['blanco'])        # el peor caso del velo de la portada: .88 sobre un blanco puro
T['velo-indice-blanco'] = sobre(T['lienzo'], .70, T['blanco'])  # una pieza blanca bajo el velo del índice

PARES = [
    # (texto o forma, fondo, mínimo, rol)
    ('blanco', 'lienzo', 4.5, 'lo nombrado: titulares, la primera tinta, lo activo'),
    ('blanco', 'placa', 4.5, 'el texto de un botón de placa, el encabezado plegado, la barra del caso'),
    ('blanco', 'placa-activa', 4.5, 'la sección activa en la barra de 390'),
    ('gris', 'lienzo', 4.5, 'el cuerpo, la continuación, los rótulos y el menú en reposo'),
    ('gris', 'placa', 4.5, 'el nombre del caso en la barra de 390, el placeholder del campo'),
    ('gris', 'placa-activa', 4.5, 'el gris más justo: sobre la placa activa nada más oscuro que el gris'),
    ('blanco-70', 'lienzo', 4.5, 'el menú del encabezado en reposo (Koto: 70 % → 100 % en 167 ms)'),
    ('lienzo', 'blanco', 4.5, 'el texto del botón claro y del círculo del cursor'),
    ('lienzo', 'gris', 4.5, 'el botón claro al pasar el mouse (fondo gris)'),
    ('lienzo', 'apretado', 4.5, 'el botón claro apretado'),
    ('blanco', 'lienzo', 3.0, 'el contorno del foco (2 px) contra el lienzo'),
    ('blanco', 'placa', 3.0, 'el contorno del foco contra la placa'),
    ('borde-campo', 'lienzo', 3.0, 'el borde del campo (1.4.11) sobre el lienzo'),
    ('borde-campo', 'velo-portada', 3.0, 'el borde del campo sobre el peor fondo del velo de la portada (.88 sobre blanco)'),
    ('gris', 'velo-portada', 4.5, 'el gris sobre el peor fondo del velo de la portada'),
    ('blanco', 'velo-portada', 4.5, 'el blanco sobre el peor fondo del velo de la portada'),
    ('lienzo', 'blanco', 3.0, 'el anillo de 1 px del círculo del cursor sobre un campo blanco'),
    ('blanco', 'gris', 3.0, 'el punto activo de 3 px contra el gris de su fila: no basta, por eso el punto y no el color'),
    ('linea-seccion', 'lienzo', None, 'el borde de sección (decorativo: separa, no informa)'),
    ('linea', 'lienzo', None, 'el separador entre filas (decorativo)'),
    ('placa', 'lienzo', None, 'la placa contra el lienzo (decorativo: Koto 1,10)'),
    ('subrayado', 'lienzo', None, 'el subrayado de un enlace en reposo (el enlace se distingue por el color blanco, 2,88:1 contra el gris del cuerpo, y por el subrayado)'),
]

R = {'tokens': {k: '#%02X%02X%02X' % tuple(round(x) for x in v) for k, v in T.items()}, 'pares': []}
for a, b, minimo, rol in PARES:
    c = ratio(T[a], T[b])
    R['pares'].append({'texto': a, 'fondo': b, 'contraste': round(c, 2), 'minimo': minimo,
                       'aprueba': None if minimo is None else c >= minimo, 'rol': rol})
    print(f"{a:14s} sobre {b:18s} {c:6.2f}:1  mín {minimo}  {rol}")
json.dump(R, open(sys.argv[1], 'w'), ensure_ascii=False, indent=1)
