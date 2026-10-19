#!/usr/bin/env python3
"""Las franjas de Visibilidad en IA y Auditoría SEO técnica a 2,39, nítidas (obra E12, corrida 2, tanda 4). Diego, 19-oct-2026.

La spec §2.4 pone en esas franjas `proto/a/medios/chequeo-43.webp` y `verifica-y-cumple-53.webp`, «recortados a 2,39 al
centro». Esos archivos miden 1050 px de ancho: en la franja de 1440 (1408 px) el navegador los agranda 1,34 veces y a
1920 (1888 px), 1,8 veces, y la captura se ve blanda. Este script saca, de la MISMA captura de la que salieron (la de
1440 a 2× que hizo Lucía el 17-oct con proto/a/herramientas/capturar-fuentes.mjs), el MISMO encuadre: primero el recorte
del prototipo (4:3 anclado arriba a la izquierda para el chequeo; 5:3 anclado arriba y al centro para Verifica y Cumple,
medios.py) y después el centro a 2,39, como pide la spec. Solo cambia la cantidad de píxeles. Nada se genera.

Uso: python3 -I franjas-tanda-4.py <carpeta-de-las-capturas-del-17-oct>
Salida: spindlelab-astro/public/v3/medios/chequeo-239.webp y verifica-y-cumple-239.webp (1920 de ancho, WebP 80, como el
prototipo), y cuánto pesan.
"""
import sys
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[7]
SALIDA = REPO / "spindlelab-astro/public/v3/medios"
FUENTE = Path(sys.argv[1])


def recorte(im, prop, ancla=(0.5, 0.0)):
    """El de proto/a/herramientas/medios.py, igual: recorta a la proporción ancho/alto, anclado (x, y) en 0..1."""
    w, h = im.size
    if w / h > prop:
        nw, nh = round(h * prop), h
    else:
        nw, nh = w, round(w / prop)
    x = round((w - nw) * ancla[0])
    y = round((h - nh) * ancla[1])
    return im.crop((x, y, x + nw, y + nh))


def franja(origen, prop, ancla, nombre):
    im = Image.open(FUENTE / origen).convert("RGB")
    pieza = recorte(im, prop, ancla)               # el encuadre del archivo de la spec
    centro = recorte(pieza, 2.39, (0.5, 0.5))      # su centro a 2,39 (spec §2.4, §3.3)
    if centro.width > 1920:
        centro = centro.resize((1920, round(centro.height * 1920 / centro.width)), Image.LANCZOS)
    destino = SALIDA / nombre
    centro.save(destino, "WEBP", quality=80, method=6)
    print(nombre, centro.size, destino.stat().st_size, "bytes, de", origen, im.size)


franja("chequeo-1440-primera.png", 4 / 3, (0.0, 0.0), "chequeo-239.webp")
franja("verifica-y-cumple-1440-primera.png", 5 / 3, (0.5, 0.0), "verifica-y-cumple-239.webp")
