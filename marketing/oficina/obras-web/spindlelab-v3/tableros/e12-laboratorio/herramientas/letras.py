"""E12 · Letras libres contra GT Kotoheim (la letra de Koto), medidas y no recordadas.

Qué hace, en orden:
1. Baja las tres letras que declara koto.com (display Condensed Light, la variable del cuerpo y la mono) a un
   directorio temporal, solo para compararlas, y las borra al terminar: no se guardan ni se publican (licencia
   exclusiva de Koto, `e12/medicion/koto/resumen.md`).
2. Baja de Google Fonts las candidatas libres (OFL salvo que se diga), en su archivo variable cuando lo hay.
3. Para cada candidata busca la instancia que más se le parece en lo que se puede ajustar: el **ancho** (si tiene
   eje wdth) hasta que la frase de prueba mida lo mismo que en Koto a igual altura de mayúscula, y el **peso** (si
   tiene eje wght) hasta que el asta mida lo mismo. Lo que queda distinto es la forma, y eso se mide aparte.
4. Mide en esa instancia: forma (IoU de cada letra a-z A-Z, o A-Z 0-9 en la mono, a 160 px de mayúscula,
   alineadas por la línea de base y centradas; 1 = idéntica), letras clave, ancho de la frase, x/mayúscula,
   asta, espacio entre palabras y si trae el castellano.
5. Escribe `datos/letras.json` y dibuja `img/letras-comparadas.jpg` (la frase en Koto y en las candidatas que
   importan, a igual altura de mayúscula).

Uso: python3 -I letras.py <carpeta del tablero>
Necesita fontTools con brotli, Pillow con FreeType y raqm, y curl con el proxy del entorno.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

from fontTools.ttLib import TTFont
from PIL import Image, ImageChops, ImageDraw, ImageFont

BASE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
DATOS = os.path.join(BASE, "datos")
IMG = os.path.join(BASE, "img")
os.makedirs(DATOS, exist_ok=True)
os.makedirs(IMG, exist_ok=True)

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
KOTO = {
    "display": "https://koto.com/_next/static/media/370eb69538f8e34a-s.p.woff2",  # GT Kotoheim Condensed Light (300)
    "cuerpo": "https://koto.com/_next/static/media/3ad55edee24c4b6e-s.p.ttf",  # GT Kotoheim VF (wdth 75-100, wght 100-1000)
    "mono": "https://koto.com/_next/static/media/e825d3a4d42a2e92-s.p.ttf",  # GT Kotoheim Mono Medium VF
}
# Lo que Koto usa de cada una, medido (e12/medicion/koto/medicion.json, tipografia.roles)
KOTO_INST = {"display": {}, "cuerpo": {"wdth": 100, "wght": 350}, "mono": {"wdth": 100}}

FRASE = "Un estudio de diseño y tecnología"
FRASE_MONO = "SANTIAGO 14:05 UTC-3 (6)"
CAP = 160
LETRAS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
LETRAS_MONO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
CLAVE = "aegtyrRGQ"
CASTELLANO = "áéíóúüñÑ¿¡«»"

# familia de Google Fonts → (ejes pedidos, rol, nota). Licencia: se lee del archivo (nameID 13/14).
DISPLAY = {
    "Archivo": "wdth,wght@62..125,100..900",
    "Mona Sans": "wdth,wght@75..125,200..900",
    "Encode Sans": "wdth,wght@75..125,100..900",
    "Pathway Extreme": "wdth,wght@75..100,100..900",
    "Bricolage Grotesque": "wdth,wght@75..100,200..800",
    "Anek Latin": "wdth,wght@75..125,100..800",
    "Saira": "wdth,wght@50..125,100..900",
    "Roboto Flex": "wdth,wght@25..151,100..1000",
    "Instrument Sans": "wdth,wght@75..100,400..700",
    "Sofia Sans Condensed": "wght@1..1000",
    "Roboto Condensed": "wght@100..900",
    "Oswald": "wght@200..700",
    "Fira Sans Condensed": "wght@300",
    "Barlow Condensed": "wght@300",
    "Asap Condensed": "wght@300",
    "Google Sans Flex": "wdth,wght@25..151,1..1000",
    "Hubot Sans": "wdth,wght@75..125,200..900",
    "Radio Canada": "wdth,wght@75..100,300..700",
    "Noto Sans": "wdth,wght@62.5..100,100..900",
    "Open Sans": "wdth,wght@75..100,300..800",
    "Nunito Sans": "wdth,wght@75..125,200..1000",
    "Sofia Sans Semi Condensed": "wght@1..1000",
    "Barlow Semi Condensed": "wght@300",
    "Antonio": "wght@100..700",
    "Big Shoulders Text": "wght@100..900",
    "Schibsted Grotesk": "wght@400..900",
    "Libre Franklin": "wght@100..900",
    "Public Sans": "wght@100..900",
    "Hanken Grotesk": "wght@100..900",
    "Inter Tight": "wght@100..900",
    "Inter": "wght@100..900",
    "Geist": "wght@100..900",
    "Space Grotesk": "wght@300..700",
    "Plus Jakarta Sans": "wght@200..800",
}
MONO = {
    "Geist Mono": "wght@100..900",
    "JetBrains Mono": "wght@100..800",
    "Chivo Mono": "wght@100..900",
    "Fragment Mono": "",
    "Martian Mono": "wdth,wght@75..112.5,100..800",
    "Red Hat Mono": "wght@300..700",
    "Roboto Mono": "wght@100..700",
    "DM Mono": "wght@500",
    "Space Mono": "",
    "Azeret Mono": "wght@100..900",
    "Source Code Pro": "wght@200..900",
    "Spline Sans Mono": "wght@300..700",
    "Ubuntu Sans Mono": "wght@400..700",
    "IBM Plex Mono": "wght@500",
}
# Por qué una familia queda fuera aunque mida bien (se dice en el lock §6)
FUERA = {
    "Instrument Sans": "letra de E10 (criterio 2 del brief de obra: ninguna dirección repite la letra de E10)",
    "IBM Plex Mono": "mono de E10 (criterio 2 del brief de obra)",
    "Space Grotesk": "la nombra el brief y la respuesta 4 de Ramón como cliché de sitio hecho con IA",
    "Plus Jakarta Sans": "la nombra el brief y la respuesta 4 de Ramón como cliché de sitio hecho con IA",
    "Geist": "letra por defecto de la plantilla de Next.js (create-next-app): la firma del sitio armado por IA",
    "Geist Mono": "mono por defecto de la plantilla de Next.js (create-next-app), junto con Geist",
    "Inter": "la letra de interfaz más usada; es el cuerpo de la marca hoy y no tiene corte condensado",
    "Inter Tight": "variante de Inter: mismo problema",
}


def curl(url, dest, ua=None):
    cmd = ["curl", "-sS", "--retry", "3", "--max-time", "90", "-o", dest, url]
    if ua:
        cmd[1:1] = ["-A", ua]
    for _ in range(4):
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode == 0 and os.path.exists(dest) and os.path.getsize(dest) > 200:
            return dest
    raise RuntimeError(f"no bajó {url}: {r.stderr}")


def a_ttf(ruta):
    if ruta.endswith(".woff2") or ruta.endswith(".woff"):
        t = TTFont(ruta)
        t.flavor = None
        nueva = re.sub(r"\.woff2?$", ".ttf", ruta)
        t.save(nueva)
        return nueva
    return ruta


def bajar_google(familia, ejes, tmp):
    """Pide el CSS2 con un navegador moderno (da el archivo variable en woff2) y baja el tramo latin."""
    q = familia.replace(" ", "+") + (":" + ejes if ejes else "")
    css_path = os.path.join(tmp, re.sub(r"\W", "", familia) + ".css")
    curl(f"https://fonts.googleapis.com/css2?family={q}&display=swap", css_path, UA)
    css = open(css_path).read()
    bloques = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*@font-face\s*{([^}]*)}", css)
    url = None
    for subset, cuerpo in bloques:
        if subset == "latin":
            url = re.search(r"url\((https://[^)]+)\)", cuerpo)[1]
            break
    if not url:
        url = re.search(r"url\((https://[^)]+)\)", css)[1]
    dest = os.path.join(tmp, re.sub(r"\W", "", familia) + os.path.splitext(url)[1])
    curl(url, dest)
    return a_ttf(dest), url


class Letra:
    def __init__(self, ruta, nombre):
        self.ruta = ruta
        self.nombre = nombre
        t = TTFont(ruta)
        self.ejes = {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in t["fvar"].axes} if "fvar" in t else {}
        self.orden = [a.axisTag for a in t["fvar"].axes] if "fvar" in t else []
        nombres = {r.nameID: str(r) for r in t["name"].names if r.platformID == 3}
        self.info = {
            "familia": nombres.get(1), "nombreCompleto": nombres.get(4), "version": nombres.get(5),
            "diseñador": nombres.get(9), "licencia": (nombres.get(13) or "")[:160], "licenciaUrl": nombres.get(14),
            "ejes": {k: list(v) for k, v in self.ejes.items()}, "usWeightClass": t["OS/2"].usWeightClass,
        }
        cmap = t.getBestCmap()
        self.castellano = all(ord(c) in cmap for c in CASTELLANO)
        self._cache = {}

    def fuente(self, tam, inst):
        clave = (round(tam, 2), tuple(sorted(inst.items())))
        if clave in self._cache:
            return self._cache[clave]
        f = ImageFont.truetype(self.ruta, max(1, int(round(tam))), layout_engine=ImageFont.Layout.RAQM)
        if self.orden:
            vals = []
            for tag in self.orden:
                mn, df, mx = self.ejes[tag]
                v = inst.get(tag, df)
                vals.append(min(mx, max(mn, v)))
            f.set_variation_by_axes(vals)
        self._cache[clave] = f
        return f

    def alto(self, ch, inst, tam=1000):
        f = self.fuente(tam, inst)
        x0, y0, x1, y1 = f.getbbox(ch, anchor="ls")
        return -y0

    def tam_para_cap(self, cap, inst):
        return 1000 * cap / self.alto("H", inst)


def mascara(letra, ch, inst, tam, W=420, H=420, base=320):
    img = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(img)
    f = letra.fuente(tam, inst)
    d.text((W // 2, base), ch, font=f, fill=255, anchor="ms")
    bb = img.getbbox()
    if not bb:
        return img.point(lambda v: 0), None
    # centra por la caja de tinta en x (la línea de base queda donde está)
    cx = (bb[0] + bb[2]) / 2
    dx = int(round(W / 2 - cx))
    out = Image.new("L", (W, H), 0)
    out.paste(img, (dx, 0))
    return out.point(lambda v: 255 if v >= 128 else 0), bb


def iou(a, b):
    a1, b1 = a.convert("1"), b.convert("1")
    inter = ImageChops.logical_and(a1, b1).convert("L").histogram()[255]
    union = ImageChops.logical_or(a1, b1).convert("L").histogram()[255]
    return inter / union if union else 1.0


def asta(letra, inst):
    """Grueso del asta izquierda de la H (a 1/4 de la mayúscula) y de la n (a 1/2 de la x), a 400 px de mayúscula."""
    tam = letra.tam_para_cap(400, inst)
    res = []
    for ch, frac_alto in (("H", 0.25), ("n", 0.5)):
        img = Image.new("L", (900, 700), 0)
        d = ImageDraw.Draw(img)
        d.text((100, 560), ch, font=letra.fuente(tam, inst), fill=255, anchor="ls")
        alto = 400 if ch == "H" else letra.alto("x", inst, tam)
        y = int(560 - alto * frac_alto)
        fila = [img.getpixel((x, y)) >= 128 for x in range(900)]
        try:
            i0 = fila.index(True)
            i1 = fila.index(False, i0)
            res.append(i1 - i0)
        except ValueError:
            res.append(0)
    return res


def ancho_frase(letra, inst, frase):
    tam = letra.tam_para_cap(CAP, inst)
    return letra.fuente(tam, inst).getlength(frase) / CAP


def medir(letra, inst, ref, letras):
    tam = letra.tam_para_cap(CAP, inst)
    tam_ref = ref["letra"].tam_para_cap(CAP, ref["inst"])
    por = {}
    for ch in letras:
        a, _ = mascara(letra, ch, inst, tam)
        b, _ = mascara(ref["letra"], ch, ref["inst"], tam_ref)
        por[ch] = round(iou(a, b), 3)
    clave = [por[c] for c in CLAVE if c in por]
    x_cap = letra.alto("x", inst) / letra.alto("H", inst)
    espacio = letra.fuente(1000, inst).getlength(" ") / 1000
    st = asta(letra, inst)
    peores = sorted(por.items(), key=lambda kv: kv[1])[:5]
    return {
        "forma": round(sum(por.values()) / len(por), 3),
        "clave": round(sum(clave) / len(clave), 3) if clave else None,
        "anchoFrase": round(ancho_frase(letra, inst, ref["frase"]) / ref["ancho"], 3),
        "xSobreCap": round(x_cap, 3),
        "asta": round(sum(st) / sum(ref["asta"]), 3) if sum(ref["asta"]) else None,
        "espacioEm": round(espacio, 3),
        "peores": peores,
    }


def buscar(fn, lo, hi, meta=1.0, pasos=14):
    """fn creciente: busca x en [lo, hi] con fn(x) ≈ meta."""
    flo, fhi = fn(lo), fn(hi)
    if meta <= flo:
        return lo
    if meta >= fhi:
        return hi
    for _ in range(pasos):
        mid = (lo + hi) / 2
        if fn(mid) < meta:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def ajustar(letra, ref):
    """Instancia que iguala ancho de frase y asta a la referencia, dentro de los ejes."""
    inst = {}
    if "wght" in letra.ejes:
        inst["wght"] = letra.ejes["wght"][1]
    if "wdth" in letra.ejes:
        inst["wdth"] = 100 if letra.ejes["wdth"][0] <= 100 <= letra.ejes["wdth"][2] else letra.ejes["wdth"][1]
    asta_ref = sum(ref["asta"])
    for _ in range(3):
        if "wght" in letra.ejes:
            mn, _, mx = letra.ejes["wght"]
            inst["wght"] = round(buscar(lambda w: sum(asta(letra, {**inst, "wght": w})) / asta_ref, mn, mx), 1)
        if "wdth" in letra.ejes and ref.get("ajustarAncho", True):
            mn, _, mx = letra.ejes["wdth"]
            inst["wdth"] = round(buscar(lambda w: ancho_frase(letra, {**inst, "wdth": w}, ref["frase"]) / ref["ancho"], mn, mx), 1)
    return inst


def main():
    tmp = tempfile.mkdtemp(prefix="e12-letras-")
    salida = {
        "fecha": "2026-10-16",
        "medidoPor": "Lucía (dirección de arte), E12",
        "metodo": (
            "Instancia ajustada por candidata: el ancho (eje wdth) hasta que «" + FRASE + "» mida lo mismo que en la referencia a "
            "igual altura de mayúscula, y el peso (eje wght) hasta que el asta de la H (a 1/4 de la mayúscula) y de la n (a 1/2 "
            "de la x) sume lo mismo, a 400 px de mayúscula. En esa instancia: forma = IoU medio de las máscaras de cada letra a 160 "
            "px de mayúscula, alineadas por la línea de base y centradas por su caja de tinta (1 = idéntica); clave = a e g t y r R "
            "G Q; anchoFrase y asta relativos a la referencia (1 = igual); espacio en em. Render de FreeType con raqm (Pillow), "
            "sin hinting de pantalla. Las letras de Koto se bajaron a un temporal y se borraron."
        ),
        "fraseDePrueba": FRASE,
        "fraseMono": FRASE_MONO,
        "referencias": {},
        "display": {},
        "cuerpo": {},
        "mono": {},
        "fuera": FUERA,
    }
    try:
        refs = {}
        for rol, url in KOTO.items():
            ruta = a_ttf(curl(url, os.path.join(tmp, f"koto-{rol}" + os.path.splitext(url)[1])))
            le = Letra(ruta, f"GT Kotoheim ({rol})")
            inst = dict(KOTO_INST[rol])
            frase = FRASE_MONO if rol == "mono" else FRASE
            refs[rol] = {"letra": le, "inst": inst, "frase": frase}
            refs[rol]["ancho"] = ancho_frase(le, inst, frase)
            refs[rol]["asta"] = asta(le, inst)
            info = dict(le.info)
            info.pop("licencia", None)
            salida["referencias"][rol] = {
                "info": info, "instancia": inst, "xSobreCap": round(le.alto("x", inst) / le.alto("H", inst), 3),
                "espacioEm": round(le.fuente(1000, inst).getlength(" ") / 1000, 3),
                "astaPx400": refs[rol]["asta"], "castellano": le.castellano,
            }
            print("ref", rol, le.info["nombreCompleto"], inst)

        letras_cargadas = {}
        for fam, ejes in {**DISPLAY, **MONO}.items():
            ruta, url = bajar_google(fam, ejes, tmp)
            letras_cargadas[fam] = (Letra(ruta, fam), url)

        for fam in DISPLAY:
            le, url = letras_cargadas[fam]
            inst = ajustar(le, refs["display"])
            m = medir(le, inst, refs["display"], LETRAS)
            salida["display"][fam] = {"archivo": url, "info": le.info, "instancia": inst, "castellano": le.castellano, **m}
            # el mismo archivo como cuerpo (ancho normal, peso igualado al 350 de Koto)
            if not ("wdth" in le.ejes and le.ejes["wdth"][2] < 100) and "Condensed" not in fam and fam not in ("Oswald",):
                inst_c = {}
                if "wdth" in le.ejes:
                    inst_c["wdth"] = 100
                if "wght" in le.ejes:
                    mn, _, mx = le.ejes["wght"]
                    ref_c = refs["cuerpo"]
                    inst_c["wght"] = round(buscar(lambda w: sum(asta(le, {**inst_c, "wght": w})) / sum(ref_c["asta"]), mn, mx), 1)
                mc = medir(le, inst_c, refs["cuerpo"], LETRAS)
                salida["cuerpo"][fam] = {"instancia": inst_c, **mc}
            print("display", fam, inst, m["forma"], m["anchoFrase"], m["asta"])

        for fam in MONO:
            le, url = letras_cargadas[fam]
            ref = dict(refs["mono"])
            ref["ajustarAncho"] = False  # en una mono el ancho es el paso; se informa, no se fuerza
            inst = ajustar(le, ref)
            m = medir(le, inst, refs["mono"], LETRAS_MONO)
            salida["mono"][fam] = {"archivo": url, "info": le.info, "instancia": inst, "castellano": le.castellano, **m}
            print("mono", fam, inst, m["forma"], m["anchoFrase"], m["asta"])

        # lámina: la frase en Koto y en las que importan, a igual altura de mayúscula
        filas_d = ["__koto_display", "Mona Sans", "Google Sans Flex", "Space Grotesk", "Plus Jakarta Sans"]
        filas_m = ["__koto_mono", "DM Mono", "Geist Mono", "JetBrains Mono"]
        cap = 46
        W, alto_fila = 1600, 104
        filas = filas_d + filas_m
        lam = Image.new("RGB", (W, alto_fila * len(filas) + 40), (246, 246, 244))
        d = ImageDraw.Draw(lam)
        rot = ImageFont.truetype(letras_cargadas["DM Mono"][0].ruta, 15)
        y = 20
        for fila in filas:
            if fila == "__koto_display":
                le, inst, frase, etiqueta = refs["display"]["letra"], refs["display"]["inst"], FRASE, "GT KOTOHEIM CONDENSED LIGHT · KOTO, LICENCIA EXCLUSIVA · REFERENCIA"
            elif fila == "__koto_mono":
                le, inst, frase, etiqueta = refs["mono"]["letra"], refs["mono"]["inst"], FRASE_MONO, "GT KOTOHEIM MONO · KOTO · REFERENCIA"
                d.line((24, y - 6, W - 24, y - 6), fill=(17, 17, 17), width=1)
            else:
                le = letras_cargadas[fila][0]
                rol = "mono" if fila in MONO else "display"
                datos = salida[rol][fila]
                inst = datos["instancia"]
                frase = FRASE_MONO if rol == "mono" else FRASE
                ejes = " ".join(f"{k} {v:g}" for k, v in inst.items())
                etiqueta = " · ".join(x for x in (fila.upper(), ejes.upper() or "ARCHIVO ESTÁTICO", f"FORMA {datos['forma']:.3f}", f"ANCHO {datos['anchoFrase']:.2f}", f"ASTA {datos['asta']:.2f}") if x)
            tam = le.tam_para_cap(cap, inst)
            d.text((24, y + 16), etiqueta, font=rot, fill=(102, 102, 99), anchor="ls")
            d.text((24, y + 26 + cap), frase, font=le.fuente(tam, inst), fill=(17, 17, 17), anchor="ls")
            y += alto_fila
        ruta_lam = os.path.join(IMG, "letras-comparadas.jpg")
        lam.save(ruta_lam, "JPEG", quality=86, optimize=True, progressive=True)
        salida["lamina"] = "img/letras-comparadas.jpg"
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    json.dump(salida, open(os.path.join(DATOS, "letras.json"), "w"), ensure_ascii=False, indent=1)
    print("listo", os.path.join(DATOS, "letras.json"))


if __name__ == "__main__":
    main()
