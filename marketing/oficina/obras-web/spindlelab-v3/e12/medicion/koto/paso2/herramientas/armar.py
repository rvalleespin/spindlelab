"""E12 · Koto · paso 2 · arma medicion-color-y-casos.json desde los crudos.

Uso: python3 -I armar.py <dir-crudo> <salida.json>
Junta: reconocer.json (qué páginas hay), recorrido-*.json + pixeles.json (color por página, en px y en
DOM), menu-pie.json y velo.json (menú, pie, hover), caso-*.json (anatomía de 13 casos) y capturas.json.
Calcula los agregados que usa el lock (§20 y §21): cuánto ocupa el negro, dónde entra el claro o el
color, el contraste de cada par de texto, y la plantilla del caso (filas, proporciones, largos).
"""
import collections
import glob
import json
import os
import statistics
import sys

from PIL import Image, ImageChops

dir_crudo, salida = sys.argv[1:3]
J = lambda n: json.load(open(os.path.join(dir_crudo, n)))
pix = J("pixeles.json")
rec = J("reconocer.json")
mp = J("menu-pie.json")
velo = J("velo.json")
capt = J("capturas.json")

CASA = ["home", "trabajo", "estudio", "servicios", "noticias", "articulo", "carreras", "contacto", "privacidad"]


def cuartiles(xs):
    xs = sorted(xs)
    if not xs:
        return None
    q = statistics.quantiles(xs, n=4, method='inclusive') if len(xs) > 1 else [xs[0]] * 3
    return {"n": len(xs), "min": xs[0], "p25": round(q[0], 1), "mediana": round(statistics.median(xs), 1), "p75": round(q[2], 1), "max": xs[-1]}


# ---------- color, por página ----------
por_pagina = {}
for k, p in pix["paginas"].items():
    campos = [{"x": m["x"], "y": m["y"], "w": m["w"], "h": m["h"], "tipo": m["tipo"], "dominante": m["dominante"], "parteDominante": m["parteDominante"], "parDeLectura": m["parDeLectura"], "radio": m["radio"]} for m in p["medios"]]
    orden = [m["tipo"] for m in sorted(p["medios"], key=lambda m: (m["y"], m["x"]))]
    racha, mx = 0, 0
    for t in orden:
        racha = racha + 1 if t in ("campo claro", "campo de color") else 0
        mx = max(mx, racha)
    por_pagina[k] = {
        "url": p["url"], "titulo": p["titulo"], "altoPx": p["altoPx"], "paradas": p["paradas"],
        "fondoDeHtmlBodyMain": p["fondosDeHtmlBodyMain"],
        "cajasDeMediosPct": p["cajasDeMediosPct"],
        "interfaz_pct": p["fueraDeMedios_pct"], "dentroDeMedios_pct": p["dentroDeMedios_pct"],
        "mediosPorTipo": p["mediosPorTipo"],
        "maxMediosClarosODeColorSeguidos": mx,
        "medios": campos,
        "textosSobreFondoCss": p["textosSobreFondoCss"],
        "textosConOpacidadParcialNoContados": p["textosConOpacidadParcialNoContados"],
        "nTextosSobreMedio": p["nTextosSobreMedio"],
        "textosSobreMedio": sorted({(t["t"], t["color"], t["fs"]) for t in p["textosSobreMedio"]})[:25],
        "cambiosDeColorConScroll": p["cambiosDeColorConScroll"],
        "puntosDeLaMallaQueCambiaronEntre120y900ms": p["puntosDeLaMallaQueCambiaronEntre120y900ms"],
        "reglasDeFondoNoOscuras": p["reglasDeFondoNoOscuras"],
    }

# agregados
def tipo_de(k):
    return "casa" if k.split("-")[0] in CASA else "caso"


lienzo_placa = {k: round(v["interfaz_pct"].get("lienzo", 0) + v["interfaz_pct"].get("placa", 0), 1) for k, v in por_pagina.items() if v["interfaz_pct"]}
claros_interfaz = {k: round(sum(x for c, x in v["interfaz_pct"].items() if c in ("blanco", "crema", "claro")), 2) for k, v in por_pagina.items()}
fondos_html = sorted({f for v in por_pagina.values() for f in v["fondoDeHtmlBodyMain"]})
casos_1440 = [k for k in por_pagina if tipo_de(k) == "caso" and k.endswith("-1440")]
casa_1440 = [k for k in por_pagina if tipo_de(k) == "casa" and k.endswith("-1440")]
pct_tipo = lambda k, t: por_pagina[k]["mediosPorTipo"].get(t, {}).get("pctDeLaPagina", 0)
resumen_casos = {k: {"medios_pct": por_pagina[k]["cajasDeMediosPct"], "campoClaro_pctPagina": pct_tipo(k, "campo claro"), "campoDeColor_pctPagina": pct_tipo(k, "campo de color"),
                     "campoOscuroDeColor_pctPagina": pct_tipo(k, "campo oscuro de color"), "campoOscuro_pctPagina": pct_tipo(k, "campo oscuro"), "imagen_pctPagina": pct_tipo(k, "imagen"),
                     "nCamposClaros": por_pagina[k]["mediosPorTipo"].get("campo claro", {}).get("n", 0), "nCamposDeColor": por_pagina[k]["mediosPorTipo"].get("campo de color", {}).get("n", 0),
                     "nMedios": sum(t["n"] for t in por_pagina[k]["mediosPorTipo"].values()), "maxClarosODeColorSeguidos": por_pagina[k]["maxMediosClarosODeColorSeguidos"]} for k in casos_1440}
dominantes_claros = collections.Counter(m["dominante"] for k in casos_1440 for m in por_pagina[k]["medios"] if m["tipo"] == "campo claro")
pares_lectura = [m["parDeLectura"]["contraste"] for k in casos_1440 for m in por_pagina[k]["medios"] if m["tipo"] == "campo claro" and m["parDeLectura"]]
pares_color = [m["parDeLectura"]["contraste"] for k in casos_1440 for m in por_pagina[k]["medios"] if m["tipo"] == "campo de color" and m["parDeLectura"]]
todos_pares = collections.defaultdict(lambda: {"n": 0, "tamanos": set()})
for k, v in por_pagina.items():
    for q in v["textosSobreFondoCss"]:
        t = todos_pares[(q["texto"], q["fondo"], q["contraste"])]
        t["n"] += q["n"]
        t["tamanos"].update(q["tamanos"])
todos_pares_l = sorted([{"texto": a, "fondo": b, "contraste": c, "n": v["n"], "tamanos": sorted(v["tamanos"], key=lambda s: float(s[:-2]))} for (a, b, c), v in todos_pares.items()], key=lambda z: -z["n"])

# hover del índice: cuánto de la ventana se oscurece
def diff_png(a, b):
    ia, ib = Image.open(os.path.join(dir_crudo, a)).convert("L"), Image.open(os.path.join(dir_crudo, b)).convert("L")
    ia, ib = ia.resize((ia.size[0] // 4, ia.size[1] // 4)), ib.resize((ib.size[0] // 4, ib.size[1] // 4))
    pa, pb = list(ia.getdata()), list(ib.getdata())
    osc = sum(1 for x, y in zip(pa, pb) if x > 30 and y < x * 0.6)
    cla = sum(1 for x, y in zip(pa, pb) if y > 30 and x < y * 0.6)
    return {"pctDeLaVentanaQueSeOscurece": round(100 * osc / len(pa), 1), "pctQueSeAclara": round(100 * cla / len(pa), 1)}


hover_indice = dict(mp.get("hoverIndice", {}))
if hover_indice.get("hallado"):
    hover_indice["diferenciaEnPixeles"] = diff_png(hover_indice["pngReposo"], hover_indice["pngHover"])
hover_dest = dict(mp.get("hoverDestacado", {}))
if hover_dest.get("hallado"):
    hover_dest["diferenciaEnPixeles"] = diff_png(hover_dest["pngReposo"], hover_dest["pngHover"])

def resumir_vista(v):
    if not v:
        return None
    return {"html": v["html"], "body": v["body"], "main": v["main"],
            "fondosGrandes": [f for f in v["fondos"] if f["w"] * f["h"] >= 20000][:12],
            "textos": collections.Counter(f'{t["color"]} · {t["fs"]} · {t["ff"]}' for t in v["textos"]).most_common(10)}

menu_pie = {
    "menu1440": {"pagina": "home, con la barra plegada (scroll 1400)", "abierto": resumir_vista(mp["menu1440"].get("abierto")), "captura": mp["menu1440"].get("captura")},
    "menu390": {"pagina": "estudio", "abierto": resumir_vista(mp["menu390"].get("abierto")), "captura": mp["menu390"].get("captura")},
    "pie": {k[4:]: {"footer": v.get("footer"), "vista": resumir_vista(v["vista"]), "captura": v["captura"]} for k, v in mp.items() if k.startswith("pie_")},
    "hoverIndice": hover_indice, "hoverDestacado": hover_dest,
    "veloDelIndice": {"elemento": velo["velo"], "piezaConMouse": velo["piezaConMouse"], "piezaMedida": velo["piezaMedida"],
                      "entrar": [(x["t"], x.get("op")) for x in velo["entrar"]], "salir": [(x["t"], x.get("op")) for x in velo["salir"]]},
}

# ---------- casos: anatomía ----------
RAZ = [("16:9", 1.778), ("4:5", 0.8), ("1,62", 1.62), ("5:3", 1.667), ("3:2", 1.5), ("4:3", 1.333), ("1:1", 1.0), ("2:1", 2.0), ("9:16", 0.5625)]


def razon(p):
    for n, v in RAZ:
        if abs(p - v) < 0.03:
            return n
    return "%.2f" % p


def patron_fila(ms):
    cols = collections.OrderedDict()
    for m in sorted(ms, key=lambda m: (m["xEnColumna"], m["y"])):
        cols.setdefault(m["xEnColumna"], []).append(m)
    return " | ".join("+".join(razon(m["proporcion"]) for m in l) for l in cols.values())


casos = {}
filas_tot = collections.Counter()
palabras_cuerpo, palabras_tit, palabras_cita, secciones_n, filas_por_seccion = [], [], [], [], []
for f in sorted(glob.glob(os.path.join(dir_crudo, "caso-*.json"))):
    d = json.load(open(f))
    cid, ancho = d["id"], d["ancho"]
    lat = d["lateralArriba"]
    # los marcos de la columna (sin la barra lateral, sin medios sueltos y sin las miniaturas de 96 px de
    # las tarjetas «Deep dive»)
    medios = [m for m in d["medios"] if not m["enLateral"] and not m.get("sinMarco") and m["w"] >= 150]
    filas = collections.OrderedDict()
    for m in medios:
        filas.setdefault(m["fila"], []).append(m)
    textos_col = [t for t in d["textos"] if t["enColumna"]]
    # bloques en orden
    bloques = []
    for fl in filas.values():
        y = min(m["y"] for m in fl)
        bloques.append({"tipo": "fila de medios", "y": y, "patron": patron_fila(fl), "alto": max(m["y"] + m["h"] for m in fl) - y,
                        "medios": [{"x": m["xEnColumna"], "w": m["w"], "h": m["h"], "proporcion": razon(m["proporcion"]), "radio": m["radio"], "tipo": m["tipo"], "aSangre": m["aSangre"]} for m in sorted(fl, key=lambda m: (m["xEnColumna"], m["y"]))]})
    secs = collections.OrderedDict()
    for t in textos_col:
        if t["seccion"] and t["seccion"] != "project-content":
            secs.setdefault(t["seccion"], []).append(t)
    for sid, ts in secs.items():
        y = min(t["y"] for t in ts)
        rot = [t["t"] for t in ts if t["ff"].endswith("Mono") and t["fs"] == "11px"]
        tit = [t for t in ts if t["fs"] == "24px"]
        cuerpo = [t for t in ts if t["ff"] == "gtKotoheim" and t["fs"] == "16px" and t["color"] == "rgb(152, 152, 152)" and t["w"] >= 400]
        tarjeta = [t["t"] for t in ts if t["ff"] == "gtKotoheimMono" and t["fs"] == "9px"]
        bloques.append({"tipo": "texto", "y": y, "seccion": sid, "rotulo": rot[0] if rot else None, "titular": tit[0]["t"] if tit else None,
                        "palabrasTitular": tit[0]["palabras"] if tit else 0, "parrafos": [{"palabras": t["palabras"], "caracteres": t["caracteres"], "lineas": t["lineas"], "ancho": t["w"]} for t in cuerpo],
                        "borde": next((t["borde"] for t in ts if t["borde"]), None), "tarjetaDeepDive": bool(tarjeta)})
        if ancho == 1440:
            palabras_cuerpo += [t["palabras"] for t in cuerpo]
            if tit:
                palabras_tit.append(tit[0]["palabras"])
    citas = [t for t in textos_col if t["fs"] in ("24px", "23px") and t["palabras"] >= 25 and (t["seccion"] in (None, "project-content"))]
    for c in citas:
        firma = [t["t"] for t in textos_col if t["ff"].endswith("Mono") and 0 < t["y"] - c["y"] < c["h"] + 80]
        bloques.append({"tipo": "cita", "y": c["y"], "palabras": c["palabras"], "x": c["xEnColumna"], "ancho": c["w"], "firma": firma, "texto": c["t"][:160]})
        if ancho == 1440:
            palabras_cita.append(c["palabras"])
    bloques.sort(key=lambda b: b["y"])
    # filas por sección
    actual, conteo = None, collections.Counter()
    for b in bloques:
        if b["tipo"] == "texto":
            actual = b["seccion"]
            conteo[actual] += 0
        elif b["tipo"] == "fila de medios" and actual:
            conteo[actual] += 1
    if ancho == 1440:
        filas_tot.update(b["patron"] for b in bloques if b["tipo"] == "fila de medios")
        secciones_n.append(len(secs))
        filas_por_seccion += list(conteo.values())
    indice = [t["t"] for t in lat["textos"] if t["ff"] == "gtKotoheim" and t["fs"] == "16px" and t["x"] < 60]
    creditos = [t["t"] for t in lat["textos"] if t["fs"] == "14px"]
    casos[f"{cid}-{ancho}"] = {
        "url": d["url"], "ancho": ancho, "altoPx": d["alto"], "columna": d["columna"],
        "lateral": {"visible": lat["visible"], "x": lat["x"], "w": lat["w"], "position": lat["position"], "top": lat["top"],
                    "titulo": next((t["t"] for t in lat["textos"] if t["tag"] == "h1"), None),
                    "textos": [{k: t[k] for k in ("t", "ff", "fs", "color", "x", "y", "w")} for t in lat["textos"]][:30],
                    "indiceDeSecciones": indice, "marcadorActivo": {"arriba": lat["puntos"], "aMediaPagina": d["lateralMitad"]["puntos"],
                    "colorDeLaActivaAMediaPagina": [(t["t"], t["color"]) for t in d["lateralMitad"]["textos"] if t["ff"] == "gtKotoheim" and t["fs"] == "16px" and t["x"] < 60]},
                    "creditos": creditos},
        "nSecciones": len(secs), "nFilasDeMedios": len(filas), "nMedios": len(medios),
        "filasPorPatron": collections.Counter(b["patron"] for b in bloques if b["tipo"] == "fila de medios").most_common(),
        "filasPorSeccion": dict(conteo),
        "medioPrincipal": next(({"w": m["w"], "h": m["h"], "proporcion": razon(m["proporcion"]), "radio": m["radio"], "aSangre": m["aSangre"], "sinMarco": m.get("sinMarco", False)} for m in sorted(d["medios"], key=lambda m: m["y"]) if m["w"] >= 0.9 * min(d["ventana"], d["columna"]["w"])), None),
        "bloques": bloques,
        "cierre": d["cierre"],
    }

plantilla = {
    "casosMedidos1440": len(secciones_n),
    "filasDeMediosPorPatron": filas_tot.most_common(),
    "filasDeMediosTotal": sum(filas_tot.values()),
    "seccionesPorCaso": cuartiles(secciones_n),
    "filasDeMediosPorSeccion": cuartiles(filas_por_seccion),
    "palabrasPorParrafo": cuartiles(palabras_cuerpo),
    "palabrasPorTitularDeSeccion": cuartiles(palabras_tit),
    "palabrasPorCita": cuartiles(palabras_cita),
    "casosConCita": sorted({k.rsplit("-", 1)[0] for k, v in casos.items() if k.endswith("-1440") and any(b["tipo"] == "cita" for b in v["bloques"])}),
    "casosConCreditos": sorted({k.rsplit("-", 1)[0] for k, v in casos.items() if k.endswith("-1440") and v["lateral"]["creditos"]}),
    "casosConTarjetaDeepDive": sorted({k.rsplit("-", 1)[0] for k, v in casos.items() if k.endswith("-1440") and any(b.get("tarjetaDeepDive") for b in v["bloques"])}),
}

out = {
    "fecha": "2026-10-16",
    "sitio": "https://koto.com",
    "medidoPor": "Lucía (dirección de arte) · obra E12 · paso 2 (compuerta 1: «negro con juegos de color» y «el caso, como Koto»)",
    "medidoCon": "Chromium 141 (/opt/pw-browsers/chromium-1194) + Playwright 1.63 de spindlelab-astro, por el proxy del entorno; Pillow para los píxeles. Herramientas en paso2/herramientas/ (correr.sh repite todo).",
    "metodo": [
        "reconocer.mjs: enlaces del encabezado, del menú y del pie de la home, y los 35 casos de /work.",
        "recorrido.mjs: 27 recorridos (9 páginas de la casa y 13 casos a 1440; home, trabajo, Lyft, Instagram y Stack Overflow también a 390) de media pantalla en media pantalla: fondo de html, body y main; malla de 4 × 6 puntos leída a los 120 y a los 900 ms de parar (si cambia, hay transición); cada medio con su caja; cada texto con su color y lo que tiene debajo; un MutationObserver que anota todo cambio de color de fondo o de texto de una caja grande mientras se baja; las reglas de las hojas que pintan un fondo.",
        "pixeles.py: cada píxel de la página contado una vez (a 1/4 de px CSS), separado en interfaz y medios, en clases (lienzo, placa, gris, blanco, crema, claro, color por familia, resto); cada medio, con su color dominante y si es un campo (el dominante cubre ≥ 30 %); para los campos claros y de color, el par de lectura estimado (el color frecuente que más contrasta y su contraste WCAG).",
        "menu-pie.mjs: menú abierto a 1440 y 390, pie de la home, el estudio y servicios, cierre de un caso, hover sobre una pieza del índice y un destacado de la home (fondos computados y diferencia de píxeles).",
        "velo.mjs: el velo que oscurece las demás piezas del índice: su clase y su opacidad leída en cada cuadro al entrar y al salir.",
        "caso.mjs: anatomía de 13 casos a 1440 y de 3 a 390: barra lateral (título, ficha, índice y marcador activo arriba y a media página, créditos), cada marco de medio con su fila, proporción y radio, cada bloque de texto con rótulo, titular y párrafos (palabras, caracteres, líneas), citas con firma, y el cierre «Next up» leído al 90, 95, 98 y 100 % del recorrido.",
    ],
    "limitaciones": [
        "Ningún video corre (este Chromium no trae H.264) y el reproductor de Vimeo se bloquea: se ven los pósteres. Un medio que en Koto es video se midió por su póster.",
        "Los campos claros y de color se detectan en píxeles: un «campo» es un medio cuyo color dominante (16 niveles por canal) cubre ≥ 30 % de lo visible. El par de lectura es una estimación sobre píxeles (texto horneado en la imagen), no un texto del DOM.",
        "Las tiras cosidas repiten lo fijo (encabezado, barra lateral) en cada pantalla y, al final de cada caso, superponen el cierre (el contenido se corre mientras entra «Next up»).",
        "Hover con mouse real de Playwright; el muestreo por requestAnimationFrame del velo tiene la cadencia del cuadro del navegador sin pantalla (16 a 70 ms entre lecturas).",
    ],
    "paginasDeLaNavegacion": [{"href": e["href"], "texto": e["texto"]} for e in rec["homeEnlaces"] if e["href"].startswith("/") and not e["href"].startswith("/projects/") and e["href"] != "/"][:30],
    "casosDelIndice": len(rec["casos"]),
    "color": {
        "resumen": {
            "fondoDeHtmlBodyMainEnTodasLasPaginasYParadas": fondos_html,
            "interfazQueEsLienzoOPlaca_pct": lienzo_placa,
            "interfazQueEsBlancoCremaOClaro_pct": claros_interfaz,
            "cajasDeMedios_pct": {k: por_pagina[k]["cajasDeMediosPct"] for k in sorted(por_pagina)},
            "casos1440": resumen_casos,
            "casa1440": {k: {"medios_pct": por_pagina[k]["cajasDeMediosPct"], "campoClaro_pctPagina": pct_tipo(k, "campo claro"), "campoDeColor_pctPagina": pct_tipo(k, "campo de color")} for k in casa_1440},
            "camposClarosEnCasos_dominantes": dominantes_claros.most_common(20),
            "camposClarosEnCasos_contrasteDelParDeLectura": cuartiles(pares_lectura),
            "camposDeColorEnCasos_contrasteDelParDeLectura": cuartiles(pares_color),
            "paresDeTextoSobreFondoCss_todasLasPaginas": todos_pares_l[:30],
        },
        "porPagina": por_pagina,
        "menuPieYHover": menu_pie,
    },
    "casos": {"plantilla": plantilla, "porCaso": casos},
    "capturas": capt,
}
json.dump(out, open(salida, "w"), ensure_ascii=False, indent=1)
print("ok", salida, os.path.getsize(salida) // 1024, "KiB")
