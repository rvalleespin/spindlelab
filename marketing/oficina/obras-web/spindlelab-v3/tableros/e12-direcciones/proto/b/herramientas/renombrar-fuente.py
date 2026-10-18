#!/usr/bin/env python3
"""Le cambia el nombre interno a la Mona Sans recortada de B (defecto 10 del acta del paso 2). Lucía (B), 18-oct-2026.

proto/b/fuentes/mona-sans-var-b.woff2 es una Versión Modificada de Mona Sans 2.000 (instanciada a wdth 85-100 y
wght 300-420, 71 kB). La licencia (OFL-mona-sans.txt) reserva el nombre «Mona» («with Reserved Font Name "Mona"»), y la
OFL §3 dice que una Versión Modificada no puede usarlo; la FAQ de la OFL (2.6 y 5.3) cuenta el recorte de una letra web
como modificación y el nombre que se pone en un documento como parte de esa regla. Por eso:

  - el nombre interno pasa a «Riel Sans» (el riel es la columna vacía de B; no es el nombre de otra letra conocida):
    IDs 1, 3, 4, 6, 16, 17 y 25 de la tabla `name`;
  - el aviso de copyright (ID 0), que la OFL obliga a conservar, queda igual, con su «Reserved Font Name "Mona"»;
  - se agregan la descripción (ID 10: de dónde sale y por qué cambió de nombre) y la licencia (IDs 13 y 14).

Los contornos, las variaciones y los metadatos de diseño no se tocan: el render es el mismo. En b.css la familia se
llama «Riel Sans B» por la misma razón. El archivo conserva su nombre de disco (dice de dónde sale, no cómo se llama).

Uso:  python3 -I renombrar-fuente.py      (reescribe el archivo en su lugar; se puede correr de nuevo sin efecto)
"""
import os

from fontTools.ttLib import TTFont

AQUI = os.path.dirname(os.path.abspath(__file__))
ARCHIVO = os.path.join(os.path.dirname(AQUI), 'fuentes', 'mona-sans-var-b.woff2')

NOMBRES = {
    1: 'Riel Sans Light',
    2: 'Regular',
    3: '2.000;SPLB;RielSans-Light',
    4: 'Riel Sans Light',
    6: 'RielSans-Light',
    10: ('Riel Sans es una Versión Modificada de Mona Sans 2.000 (The Mona Sans Project Authors): instanciada a wdth '
         '85-100 y wght 300-420 por SpindleLab el 17-oct-2026 para un prototipo, y renombrada el 18-oct-2026 porque la '
         'SIL Open Font License reserva el nombre "Mona".'),
    13: 'This Font Software is licensed under the SIL Open Font License, Version 1.1.',
    14: 'https://openfontlicense.org',
    16: 'Riel Sans',
    17: 'Light',
    25: 'RielSans',
}

f = TTFont(ARCHIVO)
tabla = f['name']
for nid, texto in NOMBRES.items():
    tabla.setName(texto, nid, 3, 1, 0x409)
# Ningún registro que nombre la letra puede seguir diciendo «Mona» (el copyright y la descripción sí la citan: son la
# atribución, no el nombre).
for r in tabla.names:
    if r.nameID in (1, 3, 4, 6, 16, 17, 18, 21, 22, 25) and 'mona' in r.toUnicode().lower():
        raise SystemExit(f'Queda «Mona» en el ID {r.nameID}: {r.toUnicode()}')
f.flavor = 'woff2'
f.save(ARCHIVO)
print(ARCHIVO, os.path.getsize(ARCHIVO), 'bytes')
for r in TTFont(ARCHIVO)['name'].names:
    if r.nameID < 256:
        print(r.nameID, r.toUnicode()[:110])
