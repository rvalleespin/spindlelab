#!/usr/bin/env python3
"""Mauro, cierre de la obra E12 (23-oct-2026). Deja en el repo las capturas que tomó capturas.mjs, más livianas, y arma
las hojas de contacto para mirarlas.

- primera/<ruta>-<ancho>.jpg: la primera pantalla a su tamaño real (390 × 844, 768 × 1024, 1440 × 900), JPEG 80.
- completa/<ruta>-<ancho>.jpg: la página entera, a la mitad del ancho desde 768 (384 y 720 px) y a 390 en el teléfono,
  JPEG 62. Una página más alta que el tope de JPEG (65.500 px) se parte en tramos -1, -2.
- hoja-primera-<ancho>.jpg: las 27 primeras pantallas de un ancho, en el orden del mapa (brief §3), con su ruta escrita.
- hoja-completa-<ruta>.jpg (solo en --hojas-completas): las tres páginas enteras de una ruta lado a lado, a un alto
  común, para mirarlas de una vez. Se quedan fuera del repo.

Uso: python3 -I reducir.py <crudas> <destino> [--hojas-completas <carpeta>]
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

Image.MAX_IMAGE_PIXELS = None
crudas, destino = Path(sys.argv[1]), Path(sys.argv[2])
hojas_completas = Path(sys.argv[sys.argv.index('--hojas-completas') + 1]) if '--hojas-completas' in sys.argv else None
datos = json.loads((crudas / 'capturas.json').read_text())
orden = []
for r in datos['R']:
    if r['ruta'] not in orden:
        orden.append(r['ruta'])
nombre = lambda r: 'home' if r == '/v3/' else r.removeprefix('/v3/').rstrip('/').replace('/', '_')
ANCHOS = [390, 768, 1440]
REDUCE = {390: 390, 768: 384, 1440: 720}
TOPE = 65000

(destino / 'primera').mkdir(parents=True, exist_ok=True)
(destino / 'completa').mkdir(parents=True, exist_ok=True)
try:
    letra = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 20)
except OSError:
    letra = ImageFont.load_default()

pesos = {'primera': 0, 'completa': 0, 'hojas': 0}
for ruta in orden:
    for a in ANCHOS:
        n = f'{nombre(ruta)}-{a}'
        im = Image.open(crudas / 'primera' / f'{n}.png').convert('RGB')
        f = destino / 'primera' / f'{n}.jpg'
        im.save(f, quality=80, optimize=True, progressive=True)
        pesos['primera'] += f.stat().st_size
        im = Image.open(crudas / 'completa' / f'{n}.png').convert('RGB')
        w = REDUCE[a]
        if im.width != w:
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        tramos = [im] if im.height <= TOPE else [im.crop((0, y, w, min(y + TOPE, im.height))) for y in range(0, im.height, TOPE)]
        for i, t in enumerate(tramos):
            f = destino / 'completa' / (f'{n}.jpg' if len(tramos) == 1 else f'{n}-{i + 1}.jpg')
            t.save(f, quality=62, optimize=True, progressive=True)
            pesos['completa'] += f.stat().st_size

# Hojas de la primera pantalla: 27 por ancho, en columnas, con la ruta escrita arriba de cada una.
for a in ANCHOS:
    cols = {390: 9, 768: 7, 1440: 5}[a]
    escala = {390: 0.5, 768: 0.33, 1440: 0.25}[a]
    ims = [Image.open(destino / 'primera' / f'{nombre(r)}-{a}.jpg') for r in orden]
    w, h = round(ims[0].width * escala), round(ims[0].height * escala)
    filas = -(-len(ims) // cols)
    hoja = Image.new('RGB', (cols * (w + 8) + 8, filas * (h + 36) + 8), (40, 40, 40))
    d = ImageDraw.Draw(hoja)
    for i, (r, im) in enumerate(zip(orden, ims)):
        x, y = 8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 36)
        d.text((x, y + 4), r.removeprefix('/v3'), fill=(230, 230, 230), font=letra)
        hoja.paste(im.resize((w, h), Image.LANCZOS), (x, y + 28))
    f = destino / f'hoja-primera-{a}.jpg'
    hoja.save(f, quality=78, optimize=True)
    pesos['hojas'] += f.stat().st_size

if hojas_completas:
    hojas_completas.mkdir(parents=True, exist_ok=True)
    for ruta in orden:
        ims = [Image.open(crudas / 'completa' / f'{nombre(ruta)}-{a}.png').convert('RGB') for a in ANCHOS]
        alto = 2400
        tiras = [im.resize((max(1, round(im.width * alto / im.height)), alto), Image.LANCZOS) for im in ims]
        hoja = Image.new('RGB', (sum(t.width for t in tiras) + 8 * (len(tiras) + 1), alto + 16), (40, 40, 40))
        x = 8
        for t in tiras:
            hoja.paste(t, (x, 8))
            x += t.width + 8
        hoja.save(hojas_completas / f'hoja-completa-{nombre(ruta)}.jpg', quality=80)

print({k: f'{v / 1e6:.1f} MB' for k, v in pesos.items()})
