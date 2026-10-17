#!/usr/bin/env python3
"""Comprueba el texto de texto-paso2.json contra las reglas que se pueden medir.

  python3 comprobar.py

1. Cada precio visible («$… + IVA», «$…/mes + IVA») existe tal cual en oferta-v3.json o
   servicios-v3.json.
2. Los nombres de servicio y de plan visibles son los de esos JSON.
3. Cero rayas (— ni –), cero voseo, cero palabras vetadas por el brief y el detector.
4. Las preguntas visibles son solo títulos de preguntas frecuentes.
Sale con 1 si algo falla.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
REPO = Path(__file__).resolve().parents[7]
DATOS = REPO / "spindlelab-astro" / "src" / "data"
d = json.loads((RAIZ / "texto-paso2.json").read_text(encoding="utf-8"))
oferta_txt = (DATOS / "oferta-v3.json").read_text(encoding="utf-8") + (DATOS / "servicios-v3.json").read_text(encoding="utf-8")


def textos(x, ruta=""):
    """Todo el texto visible: texto, tinta, gris, items, opciones, campos, bajadas, líneas."""
    if isinstance(x, dict):
        if x.get("uso") in ("referencia", "planes"):
            return  # notas para quien construye, no texto de la página
        for k, v in x.items():
            if k in ("fuente", "nota", "notas", "condicion", "trabajo", "borrado", "descartes", "donde",
                     "destino", "enlaces", "id", "rol", "uso", "nivel", "marca", "autor", "estructura",
                     "orden", "fuente", "ingredientes_propuestos", "filas_inventario", "linea_corta"):
                continue
            yield from textos(v, f"{ruta}.{k}")
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from textos(v, f"{ruta}[{i}]")
    elif isinstance(x, str):
        yield ruta, x


visibles = [(r, t) for p in d["paginas"] for r, t in textos(p, p["id"])]
fallas = []

# 1 · precios
for r, t in visibles:
    for m in re.finditer(r"\$[\d.]+(?:/mes)?(?: \+ IVA)?", t):
        precio = m.group(0)
        if precio not in oferta_txt:
            fallas.append(f"precio sin fila en los JSON: «{precio}» en {r}")

# 2 · nombres de servicio
servicios = ["Desarrollo web", "Visibilidad en IA", "Auditoría SEO técnica", "Acompañamiento mensual",
             "Paid Media (Google)", "Gestión de redes sociales", "Página de Campaña", "Sitio Esencial",
             "Sitio Completo", "Plataforma a Medida"]
for s in servicios:
    if s not in oferta_txt and s != "Desarrollo web":
        fallas.append(f"nombre que no está en los JSON: «{s}»")
for r, t in visibles:
    for malo in ("Paid Media Google", "Paid media", "Redes sociales (", "Auditoria SEO"):
        if malo in t:
            fallas.append(f"nombre de servicio mal escrito «{malo}» en {r}")

# 3 · rayas, voseo, vetadas
vetadas = ["—", "–", "IA propietaria", "RAG", "despliegue de modelos", "40 %", "+150", "impulsa", "potencia",
           "transforma", "revoluciona", "soluciones a tu medida", "siguiente nivel", "¿Listo", "líderes con visión ",
           "podés", "querés", "tenés", "sabés", "vos ", "usted", "en un mundo", "no solo", "sinergia"]
for r, t in visibles:
    if ".hero-ramon" in r or r.startswith("home.secciones[0].opciones[0]"):
        continue  # la frase de Ramón va textual, marcada
    for v in vetadas:
        patron = re.escape(v.strip()) if not v.strip().isalpha() else r"\b" + re.escape(v.strip()) + r"\b"
        if re.search(patron, t, flags=re.IGNORECASE):
            fallas.append(f"«{v}» en {r}: {t[:80]}")

# 4 · preguntas
for r, t in visibles:
    if "?" in t and not re.match(r"^¿[^?]+\?$", t.strip()):
        fallas.append(f"pregunta dentro de un texto: {r}: {t[:80]}")

# 5 · conteos del índice: el filtro y los «(10)» dicen lo mismo que las entradas
from collections import Counter
entradas = next(p for p in d["paginas"] if p["id"] == "trabajo")["entradas"]
c = Counter(e["tipo"] for e in entradas)
esperado = [f"Todo ({len(entradas)})"] + [f"{t} ({c[t]})" for t in ("Cliente", "Propio", "Concepto") if c[t]]
filtro = next(e for s_ in next(p for p in d["paginas"] if p["id"] == "trabajo")["secciones"]
              for e in s_["elementos"] if e["id"] == "trabajo.filtro")["opciones"]
if filtro != esperado:
    fallas.append(f"filtro {filtro} no calza con las entradas {esperado}")
for r, t in visibles:
    for m in re.finditer(r"\[ Todo el trabajo \] \((\d+)\)", t):
        if int(m.group(1)) != len(entradas):
            fallas.append(f"conteo {m.group(0)} en {r}, y hay {len(entradas)} entradas")
for e in entradas:
    if e["tipo"] == "Concepto" and e["ingredientes"]:
        fallas.append(f"{e['nombre']}: un concepto con ingredientes sin fila en el inventario")
    if len(e["ingredientes"]) > 2:
        fallas.append(f"{e['nombre']}: más de dos ingredientes en la línea (lock §14)")
    if e["linea"] != " · ".join([e["tipo"], e["anio"]] + e["ingredientes"]):
        fallas.append(f"{e['nombre']}: la línea mono no calza con tipo, año e ingredientes")

n = len(visibles)
palabras = sum(len(t.split()) for _, t in visibles)
print(f"{n} textos visibles, {palabras} palabras")
if fallas:
    print("\n".join(fallas))
    sys.exit(1)
print("sin fallas: precios y nombres iguales a los JSON, cero rayas, cero voseo, cero vetadas")
