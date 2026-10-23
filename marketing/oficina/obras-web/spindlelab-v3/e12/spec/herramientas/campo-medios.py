"""E12 · spec sobre A · ¿qué medio es un «campo»? Lucía, 19-oct-2026; regla 2 del 23-oct-2026.

**Regla 1 (19-oct), la cubeta** (lock §20.1 y `proto/a/herramientas/campos.py`, `es_campo`, copiada sin cambios): un
medio es campo si su color dominante (cubeta de 16 niveles por canal, sobre la imagen reducida a 1/8) cubre el 30 % o
más del marco y es claro (luminancia ≥ 0,45) o de color (saturación ≥ 0,45 y valor ≥ 0,35).

**Regla 2 (23-oct, defecto 3 del acta de la obra, vuelta 1): la cubeta no ve un degradé de color.** Un fondo que pasa
de un azul a otro reparte su color en varias cubetas de 16 niveles y ninguna llega al 30 % aunque el ojo vea un solo
azul: la franja de Auditoría (`verifica-y-cumple-239.webp`) es un campo azul y la cubeta mayor era el blanco de las
letras, con 24,9 %. La regla 2 junta los tonos vecinos en una **familia de color**:

- un píxel **de color** (saturación ≥ 0,45 y valor ≥ 0,35, los umbrales de la regla 1) entra en una ventana de **40°
  de tono y 0,30 de valor**; la familia es la ventana que más píxeles junta (celdas de 10° × 0,05, barridas);
- el medio es campo si su familia de color cubre el **30 %** o más del marco, **o** si la regla 1 ya lo daba por campo
  (la 2 solo agrega: nada que era campo deja de serlo). **Los claros siguen con la cubeta** de la regla 1.

**Por qué esas ventanas y no otras** (`campo-regla2-ventanas.py` → `datos/campo-regla2-ventanas.json`): se probaron
once combinaciones sobre los 614 medios de Koto (las 22 páginas recorridas de nuevo el 23-oct a 1440,
`koto-campos-regla2.py`) y los de las 27 rutas de A. Lo que se pide a la regla: que la franja de Auditoría sea campo
(lo es con todas: 41,5 a 42,6 % de azul), que una foto con luz de color no lo sea, y que Koto contado con ella siga
diciendo lo que dice el lock §20.1 (interiores casi sin campo, el índice con más color que la home).
- **Una familia de claros** (ventana de luminancia, como la de color) mete fotos: con 0,30, el estudio de Koto pasa de
  0 a 10,1 % de campo y su home de 4,8 a 22,3 % (oficinas con paredes claras, gente con camisa blanca). Los claros de
  un degradé no son el problema que se encontró; se quedan con la cubeta.
- **Una ventana de tono de 60° o más** junta naranjas con rojos y amarillos: el índice de Koto pasa a 35,8 y 41,3 % y
  el de A a 37,3 % (la portada de Tonela, eslingas de seis colores, cuenta como un solo campo). Con 40° (y con 30°, que
  da lo mismo) el índice de Koto queda en 33,0 y el de A en 30,1.
- **Una ventana de valor de 0,45** vuelve campo la foto de Combeau con su banda de luz verde, la franja de Desarrollo
  web (33,4 % de verde; la página pasa de 3,5 a 13,2 %). Con 0,30 queda en 27,1 % y con 0,20 en 21,3: no es campo.

Koto con la regla 2 (40° × 0,30): casos del 4,3 al 42,4 % (mediana 27,0; con la regla 1, 2,9 a 35,5, mediana 23,0,
lo mismo que el 16-oct), `/work` 33,0, home 14,4, servicios 0,9, carreras 1,5, estudio, contacto y privacidad 0.

Se corre sobre cada imagen candidata tal como la recorta su marco: entera (su proporción) y, para la franja de una
interior, recortada al centro a 2,39:1 (el marco desde 834 px, spec §2.4) y a 16:9 (bajo 834).

Uso:
  python3 -I campo-medios.py <salida.json> <imagen> [<imagen> ...]
  python3 -I campo-medios.py --paginas <carpeta de campos.mjs> <salida.json>
     (la carpeta de `e12/qa-obra/vuelta-1/herramientas/campos.mjs` de Javiera: la captura de página entera a 1440 y la
     caja de cada medio; da el techo de §3.4 por página con las dos reglas)
"""
import colorsys
import json
import os
import sys
from collections import Counter

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

UMBRAL = 0.30
TONO = 40          # grados de la ventana de tono
VALOR = 0.30       # ancho de la ventana de valor


def lum(r, g, b):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def pixeles(im):
    peq = im.resize((max(1, im.width // 8), max(1, im.height // 8)))
    b = peq.tobytes()
    return [tuple(b[i:i + 3]) for i in range(0, len(b), 3)]


def es_campo_cubeta(px):
    """Regla 1, sin cambios."""
    cubetas = Counter((r // 16, g // 16, b // 16) for r, g, b in px)
    (cr, cg, cb), n = cubetas.most_common(1)[0]
    r, g, b = cr * 16 + 8, cg * 16 + 8, cb * 16 + 8
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    parte = n / len(px)
    claro = lum(r, g, b) >= 0.45
    color = s >= 0.45 and v >= 0.35
    tipo = "claro" if claro else ("color" if color else None)
    return (tipo if parte >= UMBRAL else None), {"dominante": "#%02X%02X%02X" % (r, g, b), "parte": round(parte, 3)}


def histograma(px):
    """Los píxeles de color en celdas de 10° de tono × 0,05 de valor (desde 0,35)."""
    hv = Counter()
    for r, g, b in px:
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if s >= 0.45 and v >= 0.35:
            hv[(int(h * 36) % 36, min(13, int((v - 0.35) / 0.05)))] += 1
    return hv


def familia_de_color(hv, n, tono=TONO, valor=VALOR):
    """Regla 2: la ventana de tono × valor que más píxeles de color junta, como parte del marco, y dónde está."""
    nt, nv = round(tono / 10), round(valor / 0.05)
    mejor, donde = 0, None
    for t0 in range(36):
        for v0 in range(14):
            k = sum(hv[((t0 + i) % 36, v0 + j)] for i in range(nt) for j in range(nv) if v0 + j < 14)
            if k > mejor:
                mejor, donde = k, {"tono": (t0 * 10 + tono / 2) % 360, "valor": round(0.35 + v0 * 0.05 + valor / 2, 3)}
    return round(mejor / n, 3), donde


def es_campo(im):
    """La regla vigente (2): campo si la familia de color llega al 30 %, o si la cubeta ya lo decía."""
    px = pixeles(im)
    t1, info = es_campo_cubeta(px)
    parte, donde = familia_de_color(histograma(px), len(px))
    t2 = "color" if parte >= UMBRAL else None
    return (t1 or t2), {**info, "cubeta": t1, "familiaDeColor": parte, "familiaEn": donde}


def recorte(im, prop):
    w, h = im.size
    if w / h > prop:
        nw = round(h * prop)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / prop)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))


def medios(salida, imagenes):
    R = []
    for ruta in imagenes:
        im = Image.open(ruta).convert("RGB")
        fila = {"imagen": ruta.split("obras-web/spindlelab-v3/")[-1].split("marketing/")[-1].split("spindlelab-astro/")[-1],
                "px": list(im.size)}
        for nombre, prop in (("entera", None), ("franja-2.39", 2.39), ("franja-16:9", 16 / 9)):
            t, info = es_campo(im if prop is None else recorte(im, prop))
            fila[nombre] = {"campo": t, **info}
        R.append(fila)
        e, f = fila["entera"], fila["franja-2.39"]
        print(f"{fila['imagen'][-60:]:60s} entera {str(e['campo']):6s} (cubeta {e['parte']:.2f}, familia {e['familiaDeColor']:.2f}) · "
              f"2,39 {str(f['campo']):6s} (cubeta {f['parte']:.2f}, familia {f['familiaDeColor']:.2f})")
    json.dump({"regla": "2 (23-oct): familia de color de 40° × 0,30 de valor ≥ 30 % del marco, o la cubeta de la regla 1",
               "medios": R}, open(salida, "w"), ensure_ascii=False, indent=1)


def paginas(base, salida):
    R = []
    for f in sorted(os.listdir(base)):
        if not f.endswith(".json"):
            continue
        d = json.load(open(os.path.join(base, f)))
        im = Image.open(os.path.join(base, f[:-5] + ".png")).convert("RGB")
        area = im.width * im.height
        r1 = r2 = 0
        filas = []
        for c in d["cajas"]:
            caja = (round(c["x"]), round(c["y"]), round(c["x"] + c["w"]), round(c["y"] + c["h"]))
            rec = im.crop(caja)
            a = rec.width * rec.height
            t, info = es_campo(rec)
            if info["cubeta"]:
                r1 += a
            if t:
                r2 += a
            filas.append({"src": c["src"].split("/")[-1], "w": round(c["w"]), "h": round(c["h"]), "campo": t,
                          "cubeta": info["cubeta"], "parteCubeta": info["parte"], "familiaDeColor": info["familiaDeColor"]})
        R.append({"ruta": d["ruta"], "regla1": round(100 * r1 / area, 1), "regla2": round(100 * r2 / area, 1), "filas": filas})
        nuevos = [x["src"] for x in filas if x["campo"] and not x["cubeta"]]
        print(f"{d['ruta']:52s} regla 1 {R[-1]['regla1']:5.1f} %  regla 2 {R[-1]['regla2']:5.1f} %"
              f"{'  · nuevos: ' + ', '.join(nuevos) if nuevos else ''}")
    json.dump(R, open(salida, "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    if sys.argv[1] == "--paginas":
        paginas(sys.argv[2], sys.argv[3])
    else:
        medios(sys.argv[1], sys.argv[2:])
