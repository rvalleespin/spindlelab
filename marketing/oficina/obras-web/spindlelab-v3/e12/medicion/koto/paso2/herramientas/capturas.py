"""E12 · Koto · paso 2 · capturas para mirar (las mediciones salen de los PNG sin pérdida, no de estas).

Uso: python3 -I capturas.py <dir-crudo> <dir-cuadros> <dir-capturas>

- tira-<id>-<ancho>.jpg: la página entera, cosida desde las pantallas del recorrido (cada una pegada en
  su scroll real), reducida a 1/5 de px CSS y cortada en columnas de 1.600 px puestas lado a lado. Sirve
  para ver de un vistazo dónde entra el blanco o el color. Lo fijo (encabezado, barra lateral) se repite.
- color-<id>-1440.jpg: la pantalla de cada caso con más superficie de campo claro o de color (según
  pixeles.json), a la mitad (720 × 450).
- El caso medido en detalle (lyft): primera pantalla a 1440 y a 390 a tamaño real, la página cosida a
  la mitad (1440) y entera (390, a 1×), la barra lateral con la sección activa a media página, y las
  últimas pantallas del cierre («Next up»).
"""
import json
import os
import sys

from PIL import Image

dir_crudo, dir_cuadros, dir_capt = sys.argv[1:4]
os.makedirs(dir_capt, exist_ok=True)
pix = json.load(open(os.path.join(dir_crudo, "pixeles.json")))
hechas = []


def coser(d, escala):
    """Cose las pantallas de un recorrido en una sola imagen, a `escala` px por px CSS."""
    dpr = d["dpr"]
    par = sorted(d["paradas"], key=lambda z: z["y"])
    w = int(d["ancho"] * escala)
    alto = int((par[-1]["y"] + d["vh"]) * escala)
    lienzo = Image.new("RGB", (w, alto), (6, 6, 6))
    for p in par:
        ruta = os.path.join(dir_cuadros, p["archivo"])
        if not os.path.exists(ruta):
            continue
        im = Image.open(ruta).convert("RGB")
        im = im.resize((w, int(d["vh"] * escala)), Image.LANCZOS)
        lienzo.paste(im, (0, int(p["y"] * escala)))
    return lienzo


def guardar(im, nombre, q=74):
    im.save(os.path.join(dir_capt, nombre), quality=q, optimize=True)
    hechas.append(nombre)


recorridos = sorted(f for f in os.listdir(dir_crudo) if f.startswith("recorrido-") and f.endswith(".json"))
for f in recorridos:
    d = json.load(open(os.path.join(dir_crudo, f)))
    pid, ancho = d["id"], d["ancho"]
    # tira
    lienzo = coser(d, 0.2)
    col = 1600
    cols = [lienzo.crop((0, y, lienzo.size[0], min(lienzo.size[1], y + col))) for y in range(0, lienzo.size[1], col)]
    sep = 8
    tira = Image.new("RGB", (len(cols) * (lienzo.size[0] + sep) - sep, min(col, lienzo.size[1])), (128, 128, 128))
    for i, c in enumerate(cols):
        tira.paste(c, (i * (lienzo.size[0] + sep), 0))
    guardar(tira, f"tira-{pid}-{ancho}.jpg", 72)
    # momento de color de cada caso (1440)
    clave = f"{pid}-{ancho}"
    if ancho == 1440 and clave in pix["paginas"] and "/projects/" in d["url"]:
        medios = [m for m in pix["paginas"][clave]["medios"] if m["tipo"] in ("campo claro", "campo de color")]
        if medios:
            mejor, mejor_area = None, 0
            for p in d["paradas"]:
                a = 0
                for m in medios:
                    y0, y1 = max(p["y"], m["y"]), min(p["y"] + d["vh"], m["y"] + m["h"])
                    a += max(0, y1 - y0) * m["w"]
                if a > mejor_area:
                    mejor, mejor_area = p, a
            if mejor:
                im = Image.open(os.path.join(dir_cuadros, mejor["archivo"])).convert("RGB").resize((720, 450), Image.LANCZOS)
                guardar(im, f"color-{pid}-1440.jpg", 78)

# el caso medido en detalle
for ancho in (1440, 390):
    ruta = os.path.join(dir_crudo, f"recorrido-lyft-{ancho}.json")
    if not os.path.exists(ruta):
        continue
    d = json.load(open(ruta))
    par = sorted(d["paradas"], key=lambda z: z["y"])
    guardar(Image.open(os.path.join(dir_cuadros, par[0]["archivo"])).convert("RGB"), f"caso-lyft-{ancho}-primera.jpg", 80)
    lienzo = coser(d, 0.5 if ancho == 1440 else 1.0)
    for n, y in enumerate(range(0, lienzo.size[1], 4000), 1):
        guardar(lienzo.crop((0, y, lienzo.size[0], min(lienzo.size[1], y + 4000))), f"caso-lyft-{ancho}-completa-{n:02d}.jpg", 74)
    # cierre: las tres últimas pantallas
    for n, p in enumerate(par[-3:], 1):
        im = Image.open(os.path.join(dir_cuadros, p["archivo"])).convert("RGB")
        if ancho == 1440:
            im = im.resize((720, 450), Image.LANCZOS)
        else:
            im = im.resize((390, 844), Image.LANCZOS)
        guardar(im, f"caso-lyft-{ancho}-cierre-{n}.jpg", 78)
    if ancho == 1440:
        # barra lateral con la sección activa, a media página, tamaño real
        p = par[len(par) // 2]
        im = Image.open(os.path.join(dir_cuadros, p["archivo"])).convert("RGB")
        guardar(im.crop((0, 0, 360, 900)), "detalle-lateral-activa-1440.jpg", 82)

json.dump(hechas, open(os.path.join(dir_crudo, "capturas.json"), "w"), indent=1)
print("ok", len(hechas), "capturas")
