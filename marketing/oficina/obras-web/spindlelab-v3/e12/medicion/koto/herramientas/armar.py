"""E12 · Koto · junta todo lo medido en un solo medicion.json.

Uso: python3 -I armar.py <dir-crudo> <salida/medicion.json>
No escribe valores a mano: los roles tipográficos, los colores, la retícula y el movimiento salen de
los JSON crudos (medir.mjs, interaccion.mjs, movimiento.mjs, casos.mjs, librerias.mjs,
reconocer.mjs, pixeles.py). Cada valor lleva su página, su ancho y su selector.
"""
import glob
import json
import math
import os
import re
import sys
from collections import Counter, OrderedDict

crudo_dir, salida = sys.argv[1:3]
L = lambda n: json.load(open(os.path.join(crudo_dir, n)))
PAGS = ["home", "trabajo", "caso", "estudio"]
M = {}
for p in PAGS:
    for a in ["1440", "390"]:
        f = os.path.join(crudo_dir, f"{p}-{a}.json")
        if os.path.exists(f):
            M[f"{p}-{a}"] = json.load(open(f))
    f = os.path.join(crudo_dir, f"{p}-1440-reducido.json")
    if os.path.exists(f):
        M[f"{p}-1440-reducido"] = json.load(open(f))


# ---------- color: parseo y contraste WCAG 2.x ----------
def oklab_a_srgb(Lk, a, b):
    l_ = Lk + 0.3963377774 * a + 0.2158037573 * b
    m_ = Lk - 0.1055613458 * a - 0.0638541728 * b
    s_ = Lk - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    f = lambda c: 255 * (12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055)
    return tuple(max(0, min(255, round(f(c)))) for c in (r, g, bb))


def parse(c):
    """devuelve (r, g, b, alfa)"""
    c = c.strip()
    m = re.match(r"rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)", c)
    if m:
        return (float(m[1]), float(m[2]), float(m[3]), float(m[4]) if m[4] else 1.0)
    m = re.match(r"oklab\(([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*/\s*([\d.]+))?\)", c)
    if m:
        r, g, b = oklab_a_srgb(float(m[1]), float(m[2]), float(m[3]))
        return (r, g, b, float(m[4]) if m[4] else 1.0)
    m = re.match(r"#([0-9a-f]{6})", c, re.I)
    if m:
        h = m[1]
        return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), 1.0)
    return None


def hexa(t):
    return "#%02x%02x%02x" % tuple(round(x) for x in t[:3])


def sobre(fg, bg):
    a = fg[3]
    return tuple(fg[i] * a + bg[i] * (1 - a) for i in range(3)) + (1.0,)


def lum(t):
    def ch(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * ch(t[0]) + 0.7152 * ch(t[1]) + 0.0722 * ch(t[2])


def contraste(a, b):
    la, lb = lum(a), lum(b)
    return round((max(la, lb) + 0.05) / (min(la, lb) + 0.05), 2)


NEGRO = parse("#060606")

# ---------- tipografía ----------
def texto_util(t, ancho_doc=None):
    # fuera: texto de lector de pantalla (sr-only) y paneles corridos fuera de la pantalla (widgets cerrados)
    if "sr-only" in t.get("clase", "") or t["w"] <= 2 or t["h"] <= 2:
        return False
    # (no se filtra por opacidad: lo que Koto revela con el scroll está en 0 cuando se mide arriba)
    if t["x"] + t["w"] <= 0 or t["x"] >= (ancho_doc or (1425 if t["x"] > 400 else 390)):
        return False
    return True


def medida_de_linea(pagina, ancho, tamano, familia="gtKotoheim", minimo=120):
    """caracteres por línea del cuerpo: largo del párrafo / líneas (alto / interlineado en px)"""
    m = M.get(f"{pagina}-{ancho}")
    if not m:
        return None
    filas = []
    for t in m["textos"]:
        if t["familia"] == familia and t["tamano"] == tamano and t["largo"] >= minimo and texto_util(t, m["anchoDoc"]):
            lh = t["interlinea"] * t["tamano"] if t["interlinea"] != "normal" else 1.2 * t["tamano"]
            lineas = max(1, round(t["h"] / lh))
            if lineas >= 3:
                filas.append((t["largo"] / lineas, t["w"], t["sel"]))
    if not filas:
        return None
    cpl = sorted(f[0] for f in filas)
    return {"pagina": pagina, "ancho": ancho, "tamanoPx": tamano, "anchoCajaPx": Counter(f[1] for f in filas).most_common(1)[0][0], "caracteresPorLinea_min": round(cpl[0]), "mediana": round(cpl[len(cpl) // 2]), "max": round(cpl[-1]), "parrafos": len(filas), "selectorEjemplo": filas[0][2], "nota": "las últimas líneas cortas de cada párrafo bajan el promedio"}


def grupos(m):
    g = OrderedDict()
    for t in m["textos"]:
        if not texto_util(t, m["anchoDoc"]):
            continue
        k = (t["familia"], t["tamano"], t["interlinea"], t["interletraEm"], t["peso"], t["caja"])
        e = g.setdefault(k, {"familia": k[0], "tamano": k[1], "interlinea": k[2], "interletraEm": k[3], "peso": k[4], "caja": k[5], "nodos": 0, "caracteres": 0, "colores": Counter(), "ejemplos": []})
        e["nodos"] += 1
        e["caracteres"] += t["largo"]
        e["colores"][t["color"]] += t["largo"]
        if len(e["ejemplos"]) < 3:
            e["ejemplos"].append({"texto": t["texto"][:70], "selector": t["sel"], "tag": t["tag"], "color": t["color"]})
    out = []
    for e in g.values():
        e["colores"] = dict(e["colores"].most_common())
        out.append(e)
    return sorted(out, key=lambda e: (-e["tamano"], -e["caracteres"]))


ROLES = [
    # (rol, predicado, páginas donde se busca primero)
    ("Display de portada", lambda t, a: t["familia"] == "gtKotoheimCondensed" and t["tamano"] == (48 if a == "1440" else 36) and t["interlinea"] == 1, ["home"]),
    ("Declaración / titular de sección", lambda t, a: t["familia"] == "gtKotoheimCondensed" and t["tamano"] == (38 if a == "1440" else 26), ["home", "estudio"]),
    ("Titular de página y de caso (con bajada gris)", lambda t, a: t["familia"] == "gtKotoheimCondensed" and t["tamano"] == (24 if a == "1440" else 23), ["trabajo", "caso"]),
    ("Siguiente caso (pie del caso)", lambda t, a: t["familia"] == "gtKotoheimCondensed" and t["tamano"] == (32 if a == "1440" else 23) and "Norton" in t["texto"], ["caso"]),
    ("Cuerpo", lambda t, a: t["familia"] == "gtKotoheim" and t["tamano"] == (16 if a == "1440" else 15) and t["largo"] > 80, ["caso", "home"]),
    ("Cuerpo chico (noticias, valores, créditos)", lambda t, a: t["familia"] == "gtKotoheim" and t["tamano"] == (14 if a == "1440" else 13) and t["largo"] > 60, ["estudio", "home"]),
    ("Lista del equipo (nombres)", lambda t, a: t["familia"] == "gtKotoheim" and t["tamano"] == (18 if a == "1440" else 17), ["estudio"]),
    ("Rótulo mono (navegación, secciones, botones)", lambda t, a: t["familia"] == "gtKotoheimMono" and t["tamano"] == 11 and t["caja"] == "uppercase", ["caso", "home", "estudio"]),
    ("Micro mono (canales, horas, etiquetas de noticia)", lambda t, a: t["familia"] == "gtKotoheimMono" and t["tamano"] == 9, ["home", "estudio"]),
    ("Dato mono en caja normal (cargos, direcciones, fechas)", lambda t, a: t["familia"] == "gtKotoheimMono" and t["tamano"] == 12 and t["caja"] == "none", ["estudio", "home"]),
]


def roles():
    out = []
    for nombre, pred, prefer in ROLES:
        fila = {"rol": nombre}
        for a in ["1440", "390"]:
            hallado = None
            for p in prefer + [x for x in PAGS if x not in prefer]:
                m = M.get(f"{p}-{a}")
                if not m:
                    continue
                for t in m["textos"]:
                    if texto_util(t, m["anchoDoc"]) and pred(t, a):
                        hallado = (p, t)
                        break
                if hallado:
                    break
            if hallado:
                p, t = hallado
                todos = [tt for k, mm in M.items() if k.endswith("-" + a) for tt in mm["textos"] if texto_util(tt, mm["anchoDoc"]) and pred(tt, a)]
                usos = len(todos)
                tinta = Counter()
                for tt in todos:
                    tinta[hexa(sobre(parse(tt["color"]), NEGRO))] += tt["largo"]
                colores = {c: round(100 * n / max(1, sum(tinta.values()))) for c, n in tinta.most_common(4)}
                fila[a] = {"familia": t["familia"], "tamanoPx": t["tamano"], "interlinea": t["interlinea"], "interletraEm": t["interletraEm"], "peso": t["peso"], "caja": "MAYÚSCULAS" if t["caja"] == "uppercase" else "como se escribe", "coloresPorCaracteres_pct": colores, "pagina": p, "selector": t["sel"], "ejemplo": t["texto"][:80], "nodosEnLasCuatroPaginas": usos}
            else:
                fila[a] = None
        out.append(fila)
    return out


# ---------- color: uso por caracteres y contraste ----------
def uso_texto():
    res = {}
    for k, m in M.items():
        if "reducido" in k:
            continue
        c = Counter()
        for t in m["textos"]:
            if texto_util(t, m["anchoDoc"]):
                c[t["color"]] += t["largo"]
        tot = sum(c.values()) or 1
        res[k] = {hexa(sobre(parse(col), NEGRO)) + ("" if parse(col)[3] == 1 else f" (blanco al {round(parse(col)[3] * 100)} %)"): round(100 * n / tot, 1) for col, n in c.most_common()}
    return res


def contrastes():
    vistos = {}
    for k, m in M.items():
        if "reducido" in k:
            continue
        for t in m["textos"]:
            if not texto_util(t, m["anchoDoc"]):
                continue
            fg = parse(t["color"])
            bg = parse(t["fondo"]) or NEGRO
            if bg[3] < 1:
                bg = sobre(bg, NEGRO)
            fgc = sobre(fg, bg)
            # se mide con el texto ya revelado: la opacidad que el scroll pone en 0 arriba no cuenta
            clave = (hexa(fgc), hexa(bg))
            e = vistos.setdefault(clave, {"texto": clave[0], "fondo": clave[1], "contraste": contraste(fgc, bg), "tamanos": set(), "nodos": 0, "ejemplo": None})
            e["tamanos"].add(t["tamano"])
            e["nodos"] += 1
            if not e["ejemplo"]:
                e["ejemplo"] = {"pagina": k, "selector": t["sel"], "texto": t["texto"][:60], "colorDeclarado": t["color"], "fondoDeclarado": t["fondo"]}
    out = []
    for e in vistos.values():
        e["tamanos"] = sorted(e["tamanos"])
        e["apruebaAA"] = "sí" if e["contraste"] >= 4.5 else ("solo texto grande" if e["contraste"] >= 3 else "no")
        out.append(e)
    return sorted(out, key=lambda e: -e["nodos"])


# ---------- retícula ----------
def reticula():
    r = {}
    for k, m in M.items():
        if "reducido" in k:
            continue
        gr = [g for g in m["grillas"] if g["display"].endswith("grid")]
        cols = Counter((g["nCols"], g["gapCol"]) for g in gr)
        env = Counter((e["pl"], e["pr"]) for e in m["envoltorios"] if e["pl"] or e["pr"])
        medios = [x for x in m["medios"] if x["tag"] in ("img", "video") and x["w"] >= 100]
        props = Counter(round(x["proporcion"], 2) for x in medios)
        radios_medios = Counter((x["recortePor"] or {}).get("radio", x["radio"]) for x in medios)
        lineas = Counter((l["tipo"], l["grosor"], hexa(sobre(parse(l["color"]), NEGRO)) + ("" if parse(l["color"])[3] == 1 else f" (blanco al {round(parse(l['color'])[3] * 100)} %)")) for l in m["lineas"])
        ejemplos_lineas = {}
        for l in m["lineas"]:
            kk = f"{l['tipo']} {l['grosor']}px"
            ejemplos_lineas.setdefault(kk, [])
            if len(ejemplos_lineas[kk]) < 3:
                ejemplos_lineas[kk].append({"selector": l["sel"], "largo": l["largo"], "x": l["x"], "y": l["y"], "color": l["color"]})
        r[k] = {
            "anchoDocumento": m["anchoDoc"],
            "grillas": [{"columnas": c, "gutter": g, "veces": n} for (c, g), n in cols.most_common(8)],
            "ejemplosGrilla": [{"selector": g["sel"], "columnas": g["nCols"], "pista": g["columnas"].split(" ")[0], "gutter": g["gapCol"], "gapFilas": g["gapFila"], "x": g["x"], "w": g["w"], "clase": g["clase"][:120]} for g in gr[:6]],
            "rellenosLaterales": [{"izq": a, "der": b, "veces": n} for (a, b), n in env.most_common(6)],
            "maxAnchos": sorted({e["maxWidth"] for e in m["envoltorios"] if e["maxWidth"] not in ("none", "100%")}),
            "proporcionesMedios": [{"proporcion": p, "veces": n} for p, n in props.most_common(10)],
            "radioDeMedios": dict(radios_medios),
            "lineas": [{"tipo": t, "grosorPx": g, "color": c, "veces": n} for (t, g, c), n in lineas.most_common(12)],
            "ejemplosLineas": ejemplos_lineas,
            "radios": {k2: v["n"] for k2, v in m["radios"].items()},
        }
    return r


# ---------- movimiento (hojas + animaciones vistas + entradas) ----------
def movimiento():
    h = M["home-1440"]["hojas"]
    vistas = {}
    for k, m in M.items():
        for a in m["animacionesVistas"]:
            kk = (a["tipo"], a["nombre"], a["duracion"], a["retardo"], a["curva"] if a["curva"] != "linear" or not a.get("curvaKf") else a["curvaKf"])
            e = vistas.setdefault(kk, {"tipo": a["tipo"], "propiedadOAnimacion": a["nombre"], "duracionMs": a["duracion"], "retardoMs": a["retardo"], "curva": kk[4], "paginas": set(), "selector": a["sel"], "clase": (a.get("clase") or "")[:140]})
            e["paginas"].add(k)
    vistas_l = []
    for e in vistas.values():
        e["paginas"] = sorted(e["paginas"])
        vistas_l.append(e)
    entradas = {}
    for k, m in M.items():
        log = m["entradas"]["log"]
        vig = m["entradas"]["vigilados"]
        cambian = sorted({x["i"] for x in log})
        entradas[k] = {
            "elementosOcultosOCorridosAntesDeEntrar": len(vig),
            "cambiaronAlBajar": len(cambian),
            "ejemplos": [{"selector": v["sel"], "estiloInlineInicial": v["estiloInline"], "opacidadInicial": v["opacidad"], "transformInicial": v["transform"]} for v in vig[:8]],
            "registro": log[:40],
        }
    return {"hojas": {"duraciones": h["duraciones"], "curvas": h["curvas"], "keyframes": h["keyframes"], "reglasPrefersReducedMotion": len(h["reducido"]), "mediaQueries": h["mediaQueries"], "reglasHover": h["hover"], "ejemplosHover": h["hoverEjemplos"][:30], "cursor": h["cursor"]}, "animacionesYTransicionesVistas": sorted(vistas_l, key=lambda e: (e["tipo"], -(e["duracionMs"] or 0))), "entradasConScroll": entradas}


# ---------- capturas ----------
def capturas(dir_capt):
    fs = sorted(os.path.basename(f) for f in glob.glob(os.path.join(dir_capt, "*.jpg")))
    return fs


tokens = L("reconocer-home.json") if os.path.exists(os.path.join(crudo_dir, "reconocer-home.json")) else {}
dir_capt = os.path.join(os.path.dirname(os.path.abspath(salida)), "capturas")
inter = L("interaccion.json") if os.path.exists(os.path.join(crudo_dir, "interaccion.json")) else {}
mov = L("movimiento.json") if os.path.exists(os.path.join(crudo_dir, "movimiento.json")) else {}
casos = L("casos.json") if os.path.exists(os.path.join(crudo_dir, "casos.json")) else {}
libs = L("librerias.json") if os.path.exists(os.path.join(crudo_dir, "librerias.json")) else {}
pix = L("pixeles.json") if os.path.exists(os.path.join(crudo_dir, "pixeles.json")) else {}
variables = tokens.get("variables", {})
nombres_letras = L("letras.json") if os.path.exists(os.path.join(crudo_dir, "letras.json")) else {}

paginas = {}
for p in PAGS:
    m1, m3 = M.get(f"{p}-1440"), M.get(f"{p}-390")
    paginas[p] = {"url": (m1 or m3)["url"], "titulo": (m1 or m3)["titulo"], "alto1440": m1 and m1["alto"], "alto390": m3 and m3["alto"], "cargaVerificada1440": m1 and m1["carga"], "cargaVerificada390": m3 and m3["carga"]}

libs_resumen = {}
for url, r in libs.items():
    libs_resumen[url] = {lib: sum(h["n"] for h in hits) for lib, hits in r.get("firmas", {}).items()}

doc = OrderedDict()
doc["fecha"] = "2026-10-16"
doc["sitio"] = "https://koto.com/"
doc["medidoPor"] = "Lucía (dirección de arte), obra E12 del sitio v3 de SpindleLab"
doc["medidoCon"] = "Chromium 141 headless (/opt/pw-browsers/chromium-1194) con Playwright 1.63, por el proxy del entorno; zona horaria America/Santiago, idioma es-CL"
doc["metodo"] = ("Cada página se carga hasta que llegan enteros el JS, el CSS y las tres letras (se reintenta si el proxy corta un archivo), "
                 "se aceptan las cookies, se baja en pasos de 0,4 pantallas para disparar lo que aparece con el scroll y se vuelve arriba. "
                 "Se lee getComputedStyle de cada nodo con texto visible, las hojas (document.styleSheets), las variables :root de Tailwind, "
                 "document.getAnimations() en cada paso y un MutationObserver sobre lo que estaba oculto o corrido antes de entrar. "
                 "1440×900 a dpr 1; 390×844 a dpr 2 como teléfono (isMobile, sin hover). Las capturas son pantallas cosidas (capturar.mjs + coser.py).")
doc["limitaciones"] = [
    "Video: este Chromium no trae H.264 (canPlayType('video/mp4; avc1') = ''), así que ningún video de Koto se reproduce; se ven los pósteres. El showreel de la portada es un iframe de Vimeo (background=1, muted, loop) y queda negro.",
    "El iframe de Vimeo se bloqueó en todas las corridas: al fallar movía el scroll de la página ~2 s después (medido: de 0 a 2205 px en el caso, sin ninguna llamada de Koto a scrollTo).",
    "El encabezado fijo y las columnas pegajosas aparecen en cada pantalla de las capturas cosidas: así se ven al bajar.",
    "A 390 la página se pide como teléfono (isMobile, hasTouch): Koto pone sus hovers dentro de @media (hover: hover), que ahí no aplica.",
    "Las cajas de texto y de medios se suman por elemento: la densidad (densidad.textoPct, medioPct) es orden de magnitud; el área de color medida en serio está en pixeles.",
]
doc["paginas"] = paginas
doc["tipografia"] = {
    "fontFace": tokens.get("fontFaces"),
    "identificacion": nombres_letras,
    "variablesDeLetra": {k: v for k, v in variables.items() if k.startswith(("--font", "--text", "--leading", "--tracking", "--default-font", "--default-mono"))},
    "roles": roles(),
    "medidaDeLinea": [x for x in [medida_de_linea("caso", "1440", 16), medida_de_linea("caso", "390", 15), medida_de_linea("home", "1440", 16), medida_de_linea("estudio", "1440", 14)] if x],
    "estilosPorPagina": {k: grupos(m) for k, m in M.items() if "reducido" not in k},
}
doc["color"] = {
    "variablesDeColor": {k: v for k, v in variables.items() if k.startswith("--color")},
    "usoEnTextoPorCaracteres_pct": uso_texto(),
    "contrasteMedido": contrastes(),
    "areaEnPixeles": pix,
    "fondosPorElemento": {k: {kk: {"areaPx": round(v["area"]), "n": v["n"], "ejemplos": v["ejemplos"]} for kk, v in sorted(m["fondos"].items(), key=lambda kv: -kv[1]["area"])[:12]} for k, m in M.items() if "reducido" not in k},
    "estados": {
        "enlaceDelNav": inter.get("home1440", {}).get("navHover"),
        "piezaDelIndice_130ms": inter.get("trabajo1440", {}).get("piezaDif130"),
        "piezaDelIndice_830ms": inter.get("trabajo1440", {}).get("piezaDif830"),
        "animacionesAlEntrarEnPieza": inter.get("trabajo1440", {}).get("animsPieza130"),
    },
}
doc["reticula"] = {"porPaginaYAncho": reticula(), "variablesDeEspacio": {k: v for k, v in variables.items() if k.startswith(("--spacing", "--radius", "--blur"))}, "indiceDeTrabajo": {"barraLateral": inter.get("trabajo1440", {}).get("barraLateral"), "piezas": inter.get("trabajo1440", {}).get("indice"), "filtro": inter.get("trabajo1440", {}).get("filtroAbierto"), "botonFiltro": inter.get("trabajo1440", {}).get("botonFiltro")}}
doc["interaccion"] = inter
if os.path.exists(os.path.join(crudo_dir, "aviso.json")):
    doc["interaccion"]["avisoCookies"] = L("aviso.json")
if os.path.exists(os.path.join(crudo_dir, "recortes.json")):
    doc["recortes"] = L("recortes.json")
doc["movimiento"] = {"librerias": libs_resumen, "lecturaLibrerias": "GSAP 3.13.0 (window.gsapVersions) con ScrollTrigger (y su Observer), SplitText, CustomEase y Draggable: cada uno deja su aviso «Please gsap.registerPlugin(…)» en los trozos de JS. ScrollSmoother e InertiaPlugin aparecen solo como menciones dentro del código de ScrollTrigger y de Draggable (no hay #smooth-wrapper y una vuelta de rueda de 100 px mueve la página en un cuadro). Cero coincidencias de Lenis, Framer Motion/Motion, Barba, Swup, Three, Locomotive, Lottie, startViewTransition y prefers-reduced-motion. Next.js (App Router, __next_f) con React y Tailwind v4 (variables --color-*, --text-*, --animate-* en :root).", "gsap": (M["home-1440"]["carga"] or {}).get("gsap"), "variablesDeAnimacion": {k: v for k, v in variables.items() if k.startswith(("--animate", "--default-transition", "--ease"))}, **movimiento(), "pruebas": mov}
doc["contenido"] = {
    "encabezados": {k: m["encabezados"] for k, m in M.items() if "reducido" not in k and k.endswith("1440")},
    "h1": {k: m["h1"] for k, m in M.items() if "reducido" not in k},
    "casos": casos,
}
doc["capturas"] = capturas(dir_capt)
doc["crudo"] = {k: {kk: m[kk] for kk in ["url", "ancho", "dpr", "reducido", "titulo", "alto", "html", "body", "encabezado", "secciones", "densidad", "cursorPropio", "cursores", "textos", "lineas", "grillas", "envoltorios", "medios"]} for k, m in M.items()}
json.dump(doc, open(salida, "w"), ensure_ascii=False, indent=1, default=lambda o: sorted(o) if isinstance(o, set) else str(o))
print("ok", salida, round(os.path.getsize(salida) / 1024), "KB")
