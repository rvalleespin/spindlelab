"""E12 · spec sobre A · Koto contado con la regla 2 de campo (defecto 3 del acta de la obra). Lucía, 23-oct-2026.

Los techos de campo de la spec §3.4 (caso 10 a 35 %, índice ≤ 35, home ≤ 20, interiores ≤ 5) salen de Koto contado
con la regla 1 (la cubeta de 16 niveles; lock §20.1, `medicion/koto/paso2/herramientas/pixeles.py`). Si la regla
cambia, Koto se cuenta de nuevo con la regla nueva, o los techos dejan de ser los de la referencia.

Es `pixeles.py` del paso 2 (16-oct) sin cambios en cómo recorre y deduplica los medios, más dos columnas por medio:
`regla2` (es_campo de `campo-medios.py`: la familia de color de la regla 2, o el tipo de la regla 1) y `familiaDeColor`. Al final,
por página, el área de campos sobre el área de la página con cada regla.

Uso: python3 -I koto-campos-regla2.py <dir-crudo> <dir-cuadros> <salida.json> [<dir-recortes>]
     (los crudos y cuadros de `recorrido.mjs`; el 23-oct se recorrieron de nuevo las 22 páginas a 1440:
      node ../../medicion/koto/paso2/herramientas/recorrido.mjs <id> <url> 1440 <dir-crudo> <dir-cuadros>, una por
      línea de paginas.txt. Con <dir-recortes>, guarda cada medio recortado, que lee campo-regla2-ventanas.py)

--- lo que sigue es el docstring de pixeles.py ---
E12 · Koto · paso 2 · dónde está el blanco, la crema y el color: contado en píxeles.

Uso: python3 -I pixeles.py <dir-crudo> <dir-cuadros>   → <dir-crudo>/pixeles.json

Por cada recorrido (recorrido.mjs), cada pantalla PNG aporta solo la franja que no repite la siguiente
(de su scroll al de la siguiente parada; la última, entera): cada píxel de la página se cuenta una vez.
Se reduce a 1/4 de px CSS (vecino más cercano) y se separa lo que cae dentro de una caja de medio del
DOM (img, video, iframe, canvas, fondo con imagen) de lo que cae fuera (la interfaz). Clases de píxel:
  lienzo  máx(R,G,B) ≤ 12 (el #060606)            placa  máx ≤ 40 y croma ≤ 10 (#141414, #202020)
  gris    croma ≤ 14 y máx < 215                   blanco mín ≥ 235 y croma ≤ 10
  crema   mín ≥ 190, R ≥ G ≥ B, R−B ≥ 6, croma ≤ 40 claro  mín ≥ 190 (el resto de los claros)
  color   saturación HSV ≥ 0,45 y valor ≥ 0,35 (con su familia de tono)       resto  lo demás (foto)
Cada medio, además, se mira en la pantalla donde más se ve: color dominante (16 niveles por canal),
qué parte del medio cubre, y si es un «campo» (el dominante cubre ≥ 30 %): claro, de color u oscuro.
Para los campos claros y de color se estima el par de lectura: el color frecuente (≥ 1,5 %) que más
contrasta con el campo, y su contraste WCAG. Es una estimación sobre píxeles, no texto del DOM.
Los textos del DOM (recorrido.mjs) dan el contraste real de cada texto contra lo que tiene debajo.
"""
import colorsys
import glob
import json
import os
import sys

from PIL import Image, ImageDraw, ImageOps

dir_crudo, dir_cuadros, SALIDA = sys.argv[1:4]
RECORTES = sys.argv[4] if len(sys.argv) > 4 else None
import importlib.util
_esp = importlib.util.spec_from_file_location("campo_medios", os.path.join(os.path.dirname(os.path.abspath(__file__)), "campo-medios.py"))
CM = importlib.util.module_from_spec(_esp)
_esp.loader.exec_module(CM)
F = 4  # px CSS por píxel contado


def lum(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c[:3]
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def contraste(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def familia(r, g, b):
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    h *= 360
    for lim, n in [(15, "rojo"), (40, "naranja"), (65, "amarillo"), (160, "verde"), (200, "cian"), (255, "azul"), (290, "violeta"), (335, "magenta"), (361, "rojo")]:
        if h < lim:
            return n
    return "rojo"


def clase(p):
    r, g, b = p
    mx, mn = max(p), min(p)
    cr = mx - mn
    if mx <= 12:
        return "lienzo"
    if mx <= 40 and cr <= 10:
        return "placa"
    if mn >= 235 and cr <= 10:
        return "blanco"
    if mn >= 190 and r >= g >= b and r - b >= 6 and cr <= 40:
        return "crema"
    if mn >= 190:
        return "claro"
    if cr <= 14 and mx < 215:
        return "gris"
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    if s >= 0.45 and v >= 0.35:
        return "color:" + familia(r, g, b)
    return "resto"


def hexa(c):
    return "#%02x%02x%02x" % tuple(c[:3])


def tipo_campo(c, parte):
    if parte < 0.30:
        return "imagen"
    k = clase(c)
    if k in ("blanco", "crema", "claro"):
        return "campo claro"
    if k.startswith("color:"):
        return "campo de color"
    h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in c[:3]))
    if s >= 0.45 and max(c) > 40:
        return "campo oscuro de color"
    if max(c) <= 50:
        return "campo oscuro"
    return "campo neutro medio"


def analizar_medio(im, caja):
    x0, y0, x1, y1 = caja
    rec = im.crop((x0, y0, x1, y1))
    w, h = rec.size
    if w < 4 or h < 4:
        return None
    esc = max(1, int(max(w, h) / 160))
    rec = rec.resize((max(1, w // esc), max(1, h // esc)), Image.NEAREST)
    pos = ImageOps.posterize(rec, 4)
    cols = pos.getcolors(maxcolors=1 << 16) or []
    n = sum(c for c, _ in cols)
    cols.sort(key=lambda z: -z[0])
    # el dominante: el bin más frecuente, con el promedio real de sus píxeles
    top_bin = cols[0][1]
    px_o = list(rec.getdata())
    px_p = list(pos.getdata())
    sel = [o for o, q in zip(px_o, px_p) if q == top_bin]
    dom = tuple(round(sum(v[i] for v in sel) / len(sel)) for i in range(3))
    parte = cols[0][0] / n
    tipo = tipo_campo(dom, parte)
    par = None
    if tipo in ("campo claro", "campo de color", "campo oscuro de color"):
        mejor = None
        for c, q in cols[1:40]:
            if c / n < 0.015:
                break
            sq = [o for o, qq in zip(px_o, px_p) if qq == q]
            prom = tuple(round(sum(v[i] for v in sq) / len(sq)) for i in range(3))
            k = contraste(dom, prom)
            if mejor is None or k > mejor[0]:
                mejor = (k, prom, c / n)
        if mejor:
            par = {"color": hexa(mejor[1]), "parte": round(mejor[2], 3), "contraste": round(mejor[0], 2)}
    clases = {}
    for o in px_o:
        k = clase(o)
        clases[k] = clases.get(k, 0) + 1
    return {"dominante": hexa(dom), "claseDominante": clase(dom), "parteDominante": round(parte, 3), "tipo": tipo, "parDeLectura": par,
            "clasesPct": {k: round(100 * v / len(px_o), 1) for k, v in sorted(clases.items(), key=lambda kv: -kv[1]) if v / len(px_o) >= 0.01}}


salida = {"metodo": __doc__.strip(), "paginas": {}}
for f in sorted(glob.glob(os.path.join(dir_crudo, "recorrido-*.json"))):
    d = json.load(open(f))
    dpr = d["dpr"]
    vh = d["vh"]
    par = sorted(d["paradas"], key=lambda z: z["y"])
    fuera, dentro = {}, {}
    medios = {}
    fijos = {}
    for i, p in enumerate(par):
        ruta = os.path.join(dir_cuadros, p["archivo"])
        if not os.path.exists(ruta):
            continue
        im = Image.open(ruta).convert("RGB")
        banda = (par[i + 1]["y"] - p["y"]) if i + 1 < len(par) else vh
        banda = max(0, min(vh, banda))
        esc = F * dpr
        peq = im.resize((im.size[0] // esc, im.size[1] // esc), Image.NEAREST)
        mask = Image.new("L", peq.size, 0)
        dib = ImageDraw.Draw(mask)
        for m in p["medios"]:
            dib.rectangle([m["x"] / F, m["yv"] / F, (m["x"] + m["w"]) / F - 1, (m["yv"] + m["h"]) / F - 1], fill=255)
            # el medio, en la pantalla donde más se ve
            vis_y0, vis_y1 = max(0, m["yv"]), min(vh, m["yv"] + m["h"])
            vis_x0, vis_x1 = max(0, m["x"]), min(im.size[0] / dpr, m["x"] + m["w"])
            area = max(0, vis_y1 - vis_y0) * max(0, vis_x1 - vis_x0)
            k = (m["sel"], m["x"], m["w"], m["h"], round(m["y"] / 4))
            fijos.setdefault((m["sel"], m["x"], m["w"], m["h"]), set()).add((m["yv"], m["y"]))
            if area > 0 and (k not in medios or area > medios[k]["_area"]):
                medios[k] = {"_area": area, "_ruta": ruta, "_caja": [int(vis_x0 * dpr), int(vis_y0 * dpr), int(vis_x1 * dpr), int(vis_y1 * dpr)], "_g": (m["sel"], m["x"], m["w"], m["h"]), "tag": m["tag"], "x": m["x"], "y": m["y"], "yv": m["yv"], "w": m["w"], "h": m["h"], "radio": m["radio"], "src": m.get("src")}
        px = peq.load()
        mk = mask.load()
        for y in range(min(peq.size[1], banda // F)):
            for x in range(peq.size[0]):
                k = clase(px[x, y])
                if mk[x, y]:
                    dentro[k] = dentro.get(k, 0) + 1
                else:
                    fuera[k] = fuera.get(k, 0) + 1
    # medios fijos o pegajosos (misma caja en la ventana con distinto scroll): uno solo
    fijo = {g for g, v in fijos.items() if len({yv for yv, _ in v}) == 1 and len({y for _, y in v}) > 2}
    vistos_fijos = set()
    lista = []
    for m in sorted(medios.values(), key=lambda m: (m["y"], m["x"])):
        if m["_g"] in fijo:
            if m["_g"] in vistos_fijos:
                continue
            vistos_fijos.add(m["_g"])
            m["fijoEnLaVentana"] = True
        lista.append(m)
    # el cierre del caso mueve el contenido (sale hacia la izquierda mientras entra «Next up»): un medio
    # con la misma imagen ya contado, o que no entra entero en el ancho de la ventana, no se cuenta otra vez
    por_src = {}
    for m in lista:
        if m.get("src") and "koto.com/projects" not in m["src"]:
            por_src.setdefault(m["src"], []).append(m)
    lista = [m for m in lista if not (m.get("src") in por_src and len(por_src[m["src"]]) > 1 and m is not max(por_src[m["src"]], key=lambda o: (o["x"] >= 0, -o["y"] if False else 0, o["_area"])))]
    lista = [m for m in lista if m["x"] >= -1 and m["x"] + m["w"] <= d["ancho"] + 1]
    # un video sin fuente propia (el de «Next up», que crece al final) aparece en varios tamaños: el mayor
    sin_src = {}
    for m in lista:
        if not m.get("src") or "koto.com/projects" in (m.get("src") or "") or (m.get("src") or "").startswith("https://koto.com/"):
            sin_src.setdefault(m["_g"][0], []).append(m)
    lista = [m for m in lista if not (m["_g"][0] in sin_src and len(sin_src[m["_g"][0]]) > 1 and m is not max(sin_src[m["_g"][0]], key=lambda o: o["w"] * o["h"]))]
    # quitar los medios contenidos en otro (un img dentro de su marco con fondo de imagen)
    limpia = []
    for i, m in enumerate(lista):
        dentro_de_otro = False
        for j, o in enumerate(lista):
            if j == i:
                continue
            cont = o["x"] <= m["x"] + 1 and o["y"] <= m["y"] + 1 and o["x"] + o["w"] >= m["x"] + m["w"] - 1 and o["y"] + o["h"] >= m["y"] + m["h"] - 1
            if cont and (o["w"] * o["h"] > m["w"] * m["h"] + 4 or (abs(o["w"] * o["h"] - m["w"] * m["h"]) <= 4 and j < i)):
                dentro_de_otro = True
                break
        if not dentro_de_otro:
            limpia.append(m)
    analisis = []
    for m in limpia:
        if m["w"] < 80 or m["h"] < 60:
            continue
        im = Image.open(m["_ruta"]).convert("RGB")
        a = analizar_medio(im, m["_caja"])
        if not a:
            continue
        rec = im.crop(tuple(m["_caja"]))
        if RECORTES:
            os.makedirs(os.path.join(RECORTES, d["id"]), exist_ok=True)
            rec.save(os.path.join(RECORTES, d["id"], "%05d-%05d-%d-%d-%s.png" % (m["y"], m["x"], m["w"], m["h"], a["tipo"].replace(" ", "_"))))
        t2, i2 = CM.es_campo(rec)
        # regla 1 tal como la contó el paso 2 (su tipo) o la familia de color de la regla 2
        a["regla2"] = (a["tipo"].replace("campo ", "") if a["tipo"] in ("campo claro", "campo de color") else None) or ("color" if i2["familiaDeColor"] >= CM.UMBRAL else None)
        a["familiaDeColor"] = i2["familiaDeColor"]
        analisis.append({k: v for k, v in m.items() if not k.startswith("_")} | a)
    n_f, n_d = sum(fuera.values()), sum(dentro.values())
    n = n_f + n_d
    pct = lambda dd, base: {k: round(100 * v / base, 2) for k, v in sorted(dd.items(), key=lambda kv: -kv[1]) if 100 * v / base >= 0.05} if base else {}
    tipos = {}
    for a in analisis:
        tipos.setdefault(a["tipo"], {"n": 0, "areaPx": 0})
        tipos[a["tipo"]]["n"] += 1
        tipos[a["tipo"]]["areaPx"] += a["w"] * a["h"]
    area_medios = sum(t["areaPx"] for t in tipos.values()) or 1
    for t in tipos.values():
        t["pctDelAreaDeMedios"] = round(100 * t["areaPx"] / area_medios, 1)
        t["pctDeLaPagina"] = round(100 * t["areaPx"] / (d["ancho"] * d["alto"]), 1)
    # textos del DOM: contraste real contra el fondo de CSS; los que van sobre un medio, aparte
    pares, sobre_medio = {}, []
    transitorios = 0
    vistos = set()
    for p in par:
        for t in p["textos"]:
            k = (t["t"], t["y"])
            if k in vistos:
                continue
            vistos.add(k)
            c = [int(v) for v in t["color"].replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",")[:3]] if t["color"].startswith("rgb") else None
            if t["fondo"] == "medio":
                sobre_medio.append({"t": t["t"], "color": t["color"], "fs": t["fs"], "ff": t["ff"]})
                continue
            if not c or not isinstance(t["fondo"], list):
                continue
            if t["opacidad"] < 0.95:
                transitorios += 1
                continue
            # color del texto con su opacidad, compuesto sobre el fondo
            alfa = t["opacidad"]
            if t["color"].startswith("rgba("):
                alfa *= float(t["color"].split(",")[3].strip(" )"))
            comp = [round(c[i] * alfa + t["fondo"][i] * (1 - alfa)) for i in range(3)]
            kk = (hexa(comp), hexa(t["fondo"]))
            q = pares.setdefault(kk, {"texto": kk[0], "fondo": kk[1], "contraste": round(contraste(comp, t["fondo"]), 2), "n": 0, "tamanos": set(), "ejemplo": t["t"]})
            q["n"] += 1
            q["tamanos"].add(t["fs"])
    pares_l = sorted(pares.values(), key=lambda q: -q["n"])
    for q in pares_l:
        q["tamanos"] = sorted(q["tamanos"], key=lambda s: float(s.replace("px", "")))
    fondos_html = sorted({p["html"] for p in par} | {p["body"] for p in par} | {str(p["main"]) for p in par})
    salida["paginas"][f"{d['id']}-{d['ancho']}"] = {
        "url": d["url"], "titulo": d["titulo"], "ancho": d["ancho"], "altoPx": d["alto"], "paradas": len(par),
        "fondosDeHtmlBodyMain": fondos_html,
        "puntosDeLaMallaQueCambiaronEntre120y900ms": sum(len(p["cambiosEntre120y900"]) for p in par),
        "cambiosDeColorConScroll": d["cambiosDeColorConScroll"],
        "pixelesContados": n, "escala": f"1/{F} px CSS",
        "cajasDeMediosPct": round(100 * n_d / n, 1) if n else 0,
        "fueraDeMedios_pct": pct(fuera, n_f), "dentroDeMedios_pct": pct(dentro, n_d),
        "medios": analisis, "mediosPorTipo": tipos,
        "textosSobreFondoCss": pares_l[:40], "textosConOpacidadParcialNoContados": transitorios, "textosSobreMedio": sobre_medio[:60], "nTextosSobreMedio": len(sobre_medio),
        "reglasDeFondoNoOscuras": [r for r in d["reglasDeFondo"] if not any(s in r["bg"] for s in ("--color-black", "--color-off-black", "--color-darkest-grey", "--color-dark-grey", "transparent", "#000", "rgba(0", "#0000", "--color-transparent"))][:60],
    }
    area_pag = d["ancho"] * d["alto"]
    r1 = sum(a["w"] * a["h"] for a in analisis if a["tipo"] in ("campo claro", "campo de color"))
    r2 = sum(a["w"] * a["h"] for a in analisis if a["regla2"])
    salida["paginas"][f"{d['id']}-{d['ancho']}"]["campoRegla1Pct"] = round(100 * r1 / area_pag, 1)
    salida["paginas"][f"{d['id']}-{d['ancho']}"]["campoRegla2Pct"] = round(100 * r2 / area_pag, 1)
    print("campos", d["id"], round(100 * r1 / area_pag, 1), round(100 * r2 / area_pag, 1))
    print("ok", d["id"], d["ancho"], salida["paginas"][f"{d['id']}-{d['ancho']}"]["cajasDeMediosPct"], {k: v["n"] for k, v in tipos.items()})
resumen = {k: {"url": v["url"], "altoPx": v["altoPx"], "mediosPct": v["cajasDeMediosPct"], "campoRegla1Pct": v["campoRegla1Pct"], "campoRegla2Pct": v["campoRegla2Pct"],
               "medios": [{"src": (a.get("src") or "")[-60:], "w": a["w"], "h": a["h"], "tipo": a["tipo"], "dominante": a["dominante"], "parte": a["parteDominante"], "regla2": a["regla2"], "familiaDeColor": a["familiaDeColor"]} for a in v["medios"]]}
           for k, v in salida["paginas"].items()}
json.dump({"fecha": "2026-10-23", "fuente": "koto.com, recorrido.mjs a 1440 (22 páginas)", "paginas": resumen}, open(SALIDA, "w"), indent=1, ensure_ascii=False)
