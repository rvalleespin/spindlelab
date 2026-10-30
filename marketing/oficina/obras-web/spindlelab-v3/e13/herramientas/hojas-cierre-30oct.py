"""E13 · cierre del 30-oct · Mauro.

Uso: python3 hojas-cierre-30oct.py <carpeta PNG de capturas-cierre-30oct.mjs> <carpeta de salida> [commit del build]

Pasa las capturas a JPG livianos y arma dos hojas de contacto (1440 y 390) con las primeras pantallas de las
22 rutas, en el orden del sitemap del build (registro.json).
- primera/<ruta>-<ancho>.jpg: a su tamaño (1440 × 900 y 390 × 844), calidad 78.
- completa/<ruta>-1440.jpg a la mitad (720 de ancho); completa/<ruta>-390.jpg a su tamaño; calidad 72.
- hoja-primera-1440.jpg: 4 columnas, cada pantalla a 480 × 300. hoja-primera-390.jpg: 8 columnas, a 195 × 422.
El tercer argumento es el commit que va en el título de las hojas (30-oct, tarde: se agregó; sin él, el del cierre de la
mañana, 0d9bce8a).
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

origen, destino = Path(sys.argv[1]), Path(sys.argv[2])
build = sys.argv[3] if len(sys.argv) > 3 else "0d9bce8a"
registro = json.loads((origen / "registro.json").read_text())["capturas"]
(destino / "primera").mkdir(parents=True, exist_ok=True)
(destino / "completa").mkdir(parents=True, exist_ok=True)
letra = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 13)
LIENZO = (6, 6, 6)
TINTA = (236, 236, 236)
GRIS = (150, 150, 150)

for c in registro:
    im = Image.open(origen / c["archivo"]).convert("RGB")
    if c["tipo"] == "completa" and c["ancho"] == 1440:
        im = im.resize((720, round(im.height * 720 / im.width)), Image.LANCZOS)
    calidad = 78 if c["tipo"] == "primera" else 72
    im.save(destino / c["archivo"].replace(".png", ".jpg"), "JPEG", quality=calidad, optimize=True, progressive=True)


def hoja(ancho, columnas, miniatura, titulo):
    primeras = [c for c in registro if c["tipo"] == "primera" and c["ancho"] == ancho]
    filas = -(-len(primeras) // columnas)
    margen, pie, cabeza = 16, 22, 40
    w = margen + columnas * (miniatura[0] + margen)
    h = cabeza + filas * (miniatura[1] + pie + margen) + margen
    lamina = Image.new("RGB", (w, h), LIENZO)
    d = ImageDraw.Draw(lamina)
    d.text((margen, 14), titulo, font=letra, fill=TINTA)
    for i, c in enumerate(primeras):
        x = margen + (i % columnas) * (miniatura[0] + margen)
        y = cabeza + (i // columnas) * (miniatura[1] + pie + margen)
        im = Image.open(origen / c["archivo"]).convert("RGB").resize(miniatura, Image.LANCZOS)
        lamina.paste(im, (x, y))
        d.rectangle([x - 1, y - 1, x + miniatura[0], y + miniatura[1]], outline=(48, 48, 48))
        etiqueta = f"{i + 1:02d} {c['ruta']}"
        if d.textlength(etiqueta, font=letra) > miniatura[0]:
            while d.textlength(etiqueta + "…", font=letra) > miniatura[0] and len(etiqueta) > 4:
                etiqueta = etiqueta[:-1]
            etiqueta += "…"
        d.text((x, y + miniatura[1] + 4), etiqueta, font=letra, fill=GRIS)
    nombre = destino / f"hoja-primera-{ancho}.jpg"
    lamina.save(nombre, "JPEG", quality=80, optimize=True, progressive=True)
    return nombre, len(primeras)


for args in (
    (1440, 4, (480, 300), f"SpindleLab · sitio nuevo · primera pantalla a 1440 × 900 · build de {build} · 30-oct-2026"),
    (390, 8, (195, 422), f"SpindleLab · sitio nuevo · primera pantalla a 390 × 844 · build de {build} · 30-oct-2026"),
):
    n, k = hoja(*args)
    print(n.name, k, "pantallas", f"{n.stat().st_size / 1024:.0f} kB")

total = sum(p.stat().st_size for p in destino.rglob("*.jpg"))
print(f"{len(list(destino.rglob('*.jpg')))} JPG, {total / 1024 / 1024:.1f} MB")
