#!/usr/bin/env python3
"""Medios de la dirección B (E12, paso 2). Lucía, 17-oct-2026.

Saca derivados livianos (WebP) de material que YA existe en el repo: las piezas de concepto de
Bruno (marketing/portafolio/0N-*), el material y las capturas de Praxi que juntó Diego
(e12/praxi/), las imágenes de obra del v3 (spindlelab-astro/public/assets/img/obra/, solo se
leen) y dos capturas del build local (herramientas/capturas-obra.mjs). No genera nada: recorta,
achica y convierte. Los videos de Praxi pasan de H.264 a VP9 porque el Chromium de Playwright no
reproduce H.264 (inventario-praxi §1).

Uso:  python3 -I medios.py <carpeta con obra-spindlelab-cl.png y obra-chequeo.png>
Escribe en ../medios/ y deja ../datos/medios.json con origen, recorte y peso de cada archivo.
"""
import json
import os
import subprocess
import sys

from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
B = os.path.dirname(AQUI)
RAIZ = os.path.abspath(os.path.join(B, *(['..'] * 8)))
SALIDA = os.path.join(B, 'medios')
CRUDO = sys.argv[1] if len(sys.argv) > 1 else ''
PORT = os.path.join(RAIZ, 'marketing/portafolio')
PRAXI = os.path.join(RAIZ, 'marketing/oficina/obras-web/spindlelab-v3/e12/praxi')
OBRA = os.path.join(RAIZ, 'spindlelab-astro/public/assets/img/obra')

registro = []


def guardar(origen, nombre, recorte=None, ancho=None, calidad=82):
    im = Image.open(origen).convert('RGB')
    w, h = im.size
    if recorte:
        # recorte = (proporción, ancla_x, ancla_y): recorta a esa proporción desde el ancla (0 a 1)
        prop, ax, ay = recorte
        if w / h > prop:
            nw, nh = round(h * prop), h
        else:
            nw, nh = w, round(w / prop)
        x = round((w - nw) * ax)
        y = round((h - nh) * ay)
        im = im.crop((x, y, x + nw, y + nh))
    if ancho and im.size[0] > ancho:
        im = im.resize((ancho, round(im.size[1] * ancho / im.size[0])), Image.LANCZOS)
    destino = os.path.join(SALIDA, nombre)
    im.save(destino, 'WEBP', quality=calidad, method=6)
    registro.append({
        'archivo': nombre, 'origen': os.path.relpath(origen, RAIZ), 'recorte': recorte,
        'ancho': im.size[0], 'alto': im.size[1], 'bytes': os.path.getsize(destino),
    })


def video(origen, nombre, ancho):
    destino = os.path.join(SALIDA, nombre)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', origen, '-an', '-vf', f'scale={ancho}:-2',
                    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-pix_fmt', 'yuv420p',
                    destino], check=True)
    registro.append({'archivo': nombre, 'origen': os.path.relpath(origen, RAIZ), 'recorte': None,
                     'ancho': ancho, 'bytes': os.path.getsize(destino)})


os.makedirs(SALIDA, exist_ok=True)
C43 = (4 / 3, 0.5, 0.5)
C169_ARRIBA = (16 / 9, 0.5, 0.0)
C45_ARRIBA = (4 / 5, 0.5, 0.0)

# Visor del índice (4:3, el tercer formato del muro de Koto): una por entrada.
guardar(f'{OBRA}/mock-combeau-fotografia-ancho.jpg', 'v-combeau-fotografia.webp', C43, 1080)
guardar(f'{PRAXI}/capturas/landing-1440-primera.jpg', 'v-praxi.webp', (4 / 3, 0.5, 0.0), 1080)
guardar(f'{PORT}/06-sesenta/identidad/portadas/sesenta-4x3.png', 'v-sesenta.webp', C43, 1050)
guardar(f'{OBRA}/mock-verifica-y-cumple-ancho.jpg', 'v-verifica-y-cumple.webp', C43, 1080)
guardar(f'{PORT}/05-ocelo/identidad/portadas/ocelo-43.png', 'v-ocelo.webp', C43, 1050)
guardar(f'{OBRA}/mock-combeau-modelo-ancho.jpg', 'v-combeau-modelo.webp', C43, 1080)
guardar(f'{PORT}/07-doceavo/identidad/portadas/portada-43.png', 'v-doceavo.webp', C43, 1050)
guardar(f'{PORT}/04-tonela/identidad/portadas/portada-4x3.png', 'v-tonela.webp', C43, 1050)
if CRUDO:
    guardar(f'{CRUDO}/obra-chequeo.png', 'v-chequeo.webp', C43, 1080)
    guardar(f'{CRUDO}/obra-spindlelab-cl.png', 'v-spindlelab.webp', C43, 1080)

# Home, «cada pieza con su prueba».
guardar(f'{OBRA}/mock-combeau-fotografia-ancho.jpg', 'p-combeau.webp', (16 / 9, 0.5, 0.5), 1440)
guardar(f'{PRAXI}/capturas/landing-1440-sec09.jpg', 'p-praxi-reglas.webp', None, 1440)

# Caso Praxi.
guardar(f'{PRAXI}/material/praxi-hero-poster.jpg', 'c-praxi-poster.webp', None, 1000)
video(f'{PRAXI}/material/praxi-hero-secuencia.mp4', 'c-praxi-hero.webm', 568)
guardar(f'{PRAXI}/capturas/landing-1440-primera.jpg', 'c-praxi-portada.webp', C169_ARRIBA, 1440)
guardar(f'{PRAXI}/capturas/landing-1440-sec02.jpg', 'c-praxi-problema.webp', None, 1440)
guardar(f'{PRAXI}/capturas/landing-1440-sec03.jpg', 'c-praxi-conversacion.webp', None, 1440)
guardar(f'{PRAXI}/capturas/landing-390-sec03.jpg', 'c-praxi-390-conversacion.webp', C45_ARRIBA, 780)
guardar(f'{PRAXI}/capturas/landing-390-primera.jpg', 'c-praxi-390-portada.webp', C45_ARRIBA, 780)
guardar(f'{PRAXI}/capturas/landing-1440-sec08.jpg', 'c-praxi-progreso.webp', C169_ARRIBA, 1440)
guardar(f'{PRAXI}/capturas/planes-1440-completa.jpg', 'c-praxi-planes.webp', C169_ARRIBA, 1440)
guardar(f'{PRAXI}/material/praxi-reel-a-memoria-poster.jpg', 'c-praxi-reel-poster.webp', None, 720)
video(f'{PRAXI}/material/praxi-reel-a-memoria-720.mp4', 'c-praxi-reel.webm', 540)
guardar(f'{PRAXI}/material/praxi-avatar-amarillo.png', 'c-praxi-avatar-amarillo.webp', None, 800)
guardar(f'{PRAXI}/material/praxi-avatar-oscuro.png', 'c-praxi-avatar-oscuro.webp', None, 800)
guardar(f'{PRAXI}/material/praxi-portada-facebook.jpg', 'c-praxi-portada-facebook.webp', None, 1200)
guardar(f'{PRAXI}/material/praxi-carrusel-v2-s1.jpg', 'c-praxi-carrusel-1.webp', None, 860)
guardar(f'{PRAXI}/material/praxi-carrusel-v2-s4.jpg', 'c-praxi-carrusel-4.webp', None, 860)

# Caso Sesenta (filas de 06-sesenta/caso.md, en su orden).
S = f'{PORT}/06-sesenta'
for origen, nombre, ancho in [
    ('identidad/placas/16x9-suma-tinta.png', 's-suma.webp', 1600),
    ('identidad/placas/16x9-logo-tinta.png', 's-logo.webp', 1600),
    ('identidad/placas/4x5-sello-tinta.png', 's-sello.webp', 860),
    ('identidad/placas/4x5-paleta-tinta.png', 's-paleta.webp', 860),
    ('identidad/placas/16x9-contador-tinta.png', 's-contador.webp', 1600),
    ('identidad/placas/4x5-letra-tinta.png', 's-letra.webp', 860),
    ('identidad/placas/1-62-courier-tinta.png', 's-courier.webp', 860),
    ('identidad/placas/1-62-otrosi-tinta.png', 's-otrosi.webp', 860),
    ('medios/home-1440.png', 's-home-1440.webp', 1600),
    ('medios/home-390.png', 's-home-390.webp', 780),
    ('medios/interior-390.png', 's-interior-390.webp', 780),
    ('identidad/placas/16x9-finiquito-tinta.png', 's-finiquito.webp', 1600),
    ('identidad/placas/1-62-hoja-tinta.png', 's-hoja.webp', 860),
    ('identidad/placas/1-62-tarjeta-tinta.png', 's-tarjeta.webp', 860),
    ('medios/lector-390.png', 's-lector-390.webp', 780),
    ('medios/lector-1440.png', 's-lector-1440.webp', 1600),
    ('medios/interior-1440.png', 's-interior-1440.webp', 1600),
    ('identidad/placas/16x9-pregunta-tinta.png', 's-pregunta.webp', 1600),
    ('identidad/portadas/sesenta-4x5.png', 's-portada-4x5.webp', 860),
    ('movimiento/poster.jpg', 's-poster.webp', 1440),
]:
    guardar(f'{S}/{origen}', nombre, None, ancho, 84)

os.makedirs(os.path.join(B, 'datos'), exist_ok=True)
with open(os.path.join(B, 'datos', 'medios.json'), 'w', encoding='utf-8') as f:
    json.dump(registro, f, ensure_ascii=False, indent=1)
total = sum(r['bytes'] for r in registro)
print(f'{len(registro)} archivos, {total / 1000:.0f} kB')
