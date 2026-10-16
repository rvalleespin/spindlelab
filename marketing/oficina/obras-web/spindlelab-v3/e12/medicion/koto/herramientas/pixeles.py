"""E12 · Koto · cuánto ocupa cada color en pantalla, contado en píxeles.

Uso: python3 -I pixeles.py <dir-cuadros> <dir-crudo>   → <dir-crudo>/pixeles.json
Se cose otra vez cada página desde las pantallas PNG (sin pérdida, no los JPEG) y se clasifica cada
píxel contra los colores declarados en las variables de Koto (--color-*), con tolerancia, más el
amarillo por tono. Lo que no calza con ninguno es «imagen o video» (fotos, pósteres, ilustraciones).
Además se separa: dentro de las cajas de medios del DOM (img/video de medir.mjs) y fuera de ellas,
para saber cuánto pesa cada color en la interfaz sin contar las fotos.
Nota: el encabezado fijo aparece en cada pantalla cosida; su aporte es chico (≤ 48 px por pantalla).
"""
import colorsys
import json
import os
import sys

from PIL import Image, ImageDraw

dir_cuadros, dir_crudo = sys.argv[1:3]

TOKENS = {
    "black #060606": (6, 6, 6),
    "off-black #141414": (20, 20, 20),
    "darkest-grey #202020": (32, 32, 32),
    "dark-grey #2d2d2d": (45, 45, 45),
    "mid-grey #595959": (89, 89, 89),
    "grey #989898": (152, 152, 152),
    "light-grey #cccccc": (204, 204, 204),
    "white #ffffff": (255, 255, 255),
}
TOL = 5


def clase(rgb):
    r, g, b = rgb
    for nombre, (tr, tg, tb) in TOKENS.items():
        if abs(r - tr) <= TOL and abs(g - tg) <= TOL and abs(b - tb) <= TOL:
            return nombre
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    if 0.13 <= h <= 0.17 and s >= 0.8 and v >= 0.85:
        return "yellow #ffe800 (por tono)"
    if max(r, g, b) <= 3:
        return "negro puro #000000 (cajas de video que aquí no corren, letterbox)"
    if max(r, g, b) - min(r, g, b) <= 6:
        return "otros grises neutros (bordes suavizados del texto, velos, fotos en blanco y negro)"
    return "imagen o video"


def coser(pid, ancho):
    meta = json.load(open(os.path.join(dir_cuadros, f"{pid}-{ancho}-cuadros.json")))
    dpr = meta["dpr"]
    cuadros = meta["cuadros"]
    w = Image.open(cuadros[0]["archivo"]).size[0]
    alto = cuadros[-1]["y"] * dpr + Image.open(cuadros[-1]["archivo"]).size[1]
    lienzo = Image.new("RGB", (w, alto))
    for c in cuadros:
        lienzo.paste(Image.open(c["archivo"]).convert("RGB"), (0, c["y"] * dpr))
    return lienzo, dpr


salida = {"metodo": __doc__.strip().split("\n\n")[1], "tolerancia": TOL, "paginas": {}}
for pid in ["home", "trabajo", "caso", "estudio"]:
    for ancho in ["1440", "390"]:
        try:
            lienzo, dpr = coser(pid, ancho)
        except FileNotFoundError:
            continue
        # se reduce para contar rápido (el reparto de colores no cambia a esta escala)
        f = 4 if ancho == "1440" else 4
        peq = lienzo.resize((lienzo.size[0] // f, lienzo.size[1] // f), Image.NEAREST)
        mascara = Image.new("L", peq.size, 0)
        try:
            crudo = json.load(open(os.path.join(dir_crudo, f"{pid}-{ancho}.json")))
            dib = ImageDraw.Draw(mascara)
            for m in crudo.get("medios", []):
                if m["tag"] in ("img", "video", "iframe", "canvas") and m["w"] >= 60 and m["h"] >= 60:
                    x0, y0 = m["x"] * dpr / f, m["y"] * dpr / f
                    dib.rectangle([x0, y0, x0 + m["w"] * dpr / f, y0 + m["h"] * dpr / f], fill=255)
        except FileNotFoundError:
            pass
        tot, dentro, fuera = {}, {}, {}
        px = peq.load()
        mk = mascara.load()
        n = peq.size[0] * peq.size[1]
        nd = 0
        for y in range(peq.size[1]):
            for x in range(peq.size[0]):
                k = clase(px[x, y])
                tot[k] = tot.get(k, 0) + 1
                if mk[x, y]:
                    dentro[k] = dentro.get(k, 0) + 1
                    nd += 1
                else:
                    fuera[k] = fuera.get(k, 0) + 1
        pct = lambda d, base: {k: round(100 * v / base, 2) for k, v in sorted(d.items(), key=lambda kv: -kv[1])} if base else {}
        salida["paginas"][f"{pid}-{ancho}"] = {
            "pixelesContados": n,
            "escala": f"1/{f}",
            "cajasDeMediosPct": round(100 * nd / n, 1),
            "toda_la_pagina_pct": pct(tot, n),
            "fuera_de_medios_pct": pct(fuera, n - nd),
            "dentro_de_medios_pct": pct(dentro, nd),
        }
        print("ok", pid, ancho, salida["paginas"][f"{pid}-{ancho}"]["toda_la_pagina_pct"])
json.dump(salida, open(os.path.join(dir_crudo, "pixeles.json"), "w"), indent=1, ensure_ascii=False)
