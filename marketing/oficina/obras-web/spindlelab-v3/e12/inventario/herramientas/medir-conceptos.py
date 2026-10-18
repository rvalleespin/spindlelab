#!/usr/bin/env python3
"""E12 · inventario · lo que de verdad usan las cuatro piezas de concepto (defecto 3 del acta del paso 2).

Lee el árbol COMPROMETIDO (git show <commit>:ruta), no la copia de trabajo, para que el crudo se pueda rehacer sobre el
commit aunque Bruno esté editando la pieza al lado. Por cada pieza: sus páginas HTML (tipos de JSON-LD, meta robots,
scripts en línea y externos, las URL http(s) que el HTML o el CSS piden al abrirse, aparte de las que solo enlazan,
`@font-face` y `lang`), sus archivos JS y CSS con bytes, sus fuentes woff2 y el recorrido grabado (ffprobe: duración,
tamaño de cuadro, códec y cuadros por segundo).

Uso: python3 medir-conceptos.py [commit] > ../crudo/conceptos-repo.json
"""
import json
import re
import subprocess
import sys
import tempfile
import os

RAIZ = subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip()
COMMIT = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
SHA = subprocess.check_output(["git", "-C", RAIZ, "rev-parse", COMMIT], text=True).strip()
PIEZAS = ["04-tonela", "05-ocelo", "06-sesenta", "07-doceavo"]


def git_ls(prefijo):
    out = subprocess.check_output(["git", "-C", RAIZ, "ls-tree", "-r", "-l", SHA, prefijo], text=True)
    filas = []
    for linea in out.splitlines():
        meta, ruta = linea.split("\t", 1)
        partes = meta.split()
        filas.append((ruta, int(partes[3])))
    return filas


def git_cat(ruta):
    return subprocess.check_output(["git", "-C", RAIZ, "show", f"{SHA}:{ruta}"])


def tipos_jsonld(nodo, acc):
    if isinstance(nodo, dict):
        t = nodo.get("@type")
        if isinstance(t, str):
            acc.append(t)
        elif isinstance(t, list):
            acc.extend(t)
        for v in nodo.values():
            tipos_jsonld(v, acc)
    elif isinstance(nodo, list):
        for v in nodo:
            tipos_jsonld(v, acc)
    return acc


def claves(nodo, nombre, acc):
    if isinstance(nodo, dict):
        for k, v in nodo.items():
            if k == nombre:
                acc.append(v)
            claves(v, nombre, acc)
    elif isinstance(nodo, list):
        for v in nodo:
            claves(v, nombre, acc)
    return acc


# Lo que el navegador PIDE al abrir la página (src, poster, url() y <link href>) se separa de lo que solo ENLAZA (<a href>,
# las fuentes citadas, que no se descargan si nadie hace clic). Un tercero es lo primero, no lo segundo.
PIDE = re.compile(r"""(?:\bsrc|\bposter|\bdata-src)\s*=\s*["'](https?://[^"']+)["']|url\(\s*["']?(https?://[^)"']+)""", re.I)
LINK = re.compile(r"""<link\b[^>]*\bhref\s*=\s*["'](https?://[^"']+)["']""", re.I)
ENLAZA = re.compile(r"""<a\b[^>]*\bhref\s*=\s*["'](https?://[^"']+)["']""", re.I)


def externas(texto):
    vistas = [a or b for a, b in PIDE.findall(texto)] + LINK.findall(texto)
    return sorted(set(u for u in vistas if "schema.org" not in u))


def enlaces(texto):
    return sorted(set(ENLAZA.findall(texto)))


def pagina(ruta):
    h = git_cat(ruta).decode("utf-8")
    bloques = re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)
    tipos, ficcion, prohibidos = [], [], []
    for b in bloques:
        d = json.loads(b)
        tipos += tipos_jsonld(d, [])
        ficcion += claves(d, "disambiguatingDescription", [])
        for k in ("review", "aggregateRating", "telephone", "address", "sameAs", "taxID", "vatID"):
            if claves(d, k, []):
                prohibidos.append(k)
    scripts_ext = re.findall(r'<script[^>]+src="([^"]+)"', h)
    en_linea = [s for s in re.findall(r"<script(?![^>]*src=)([^>]*)>", h) if "ld+json" not in s]
    robots = re.findall(r'<meta name="robots" content="([^"]+)"', h)
    lang = re.findall(r'<html[^>]*lang="([^"]+)"', h)
    h1 = len(re.findall(r"<h1[\s>]", h))
    concepto = len(re.findall(r"concepto", h, re.I))
    return {
        "ruta": ruta,
        "bytes": len(h.encode("utf-8")),
        "lang": lang[0] if lang else None,
        "robots": robots[0] if robots else None,
        "h1": h1,
        "jsonldBloques": len(bloques),
        "jsonldTipos": sorted(set(tipos)),
        "disambiguatingDescription": ficcion,
        "jsonldClavesQueNoDebeTener": sorted(set(prohibidos)),
        "scriptsExternos": scripts_ext,
        "scriptsEnLinea": len(en_linea),
        "urlsHttpQuePide": externas(h),
        "urlsHttpQueEnlaza": enlaces(h),
        "vecesQueDiceConcepto": concepto,
    }


def video(ruta):
    with tempfile.NamedTemporaryFile(suffix=os.path.splitext(ruta)[1], delete=False) as f:
        f.write(git_cat(ruta))
        tmp = f.name
    try:
        out = subprocess.check_output([
            "ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
            "stream=codec_name,width,height,r_frame_rate:format=duration,size", "-of", "json", tmp], text=True)
    finally:
        os.unlink(tmp)
    d = json.loads(out)
    s, fmt = d["streams"][0], d["format"]
    num, den = s["r_frame_rate"].split("/")
    return {
        "ruta": ruta,
        "bytes": int(fmt["size"]),
        "segundos": round(float(fmt["duration"]), 2),
        "ancho": s["width"],
        "alto": s["height"],
        "codec": s["codec_name"],
        "cuadrosPorSegundo": round(int(num) / int(den), 2),
    }


salida = {"commit": SHA, "herramienta": "e12/inventario/herramientas/medir-conceptos.py", "piezas": {}}
for pieza in PIEZAS:
    base = f"marketing/portafolio/{pieza}/"
    archivos = git_ls(base)
    rel = {r[len(base):]: b for r, b in archivos}
    paginas = [pagina(base + r) for r in sorted(rel) if r.startswith("sitio/") and r.endswith(".html")]
    css_js = {r: b for r, b in rel.items() if r.startswith("sitio/") and r.endswith((".css", ".js"))}
    terceros_css = []
    for r in css_js:
        if r.endswith(".css"):
            terceros_css += externas(git_cat(base + r).decode("utf-8"))
    fuentes = {r: b for r, b in rel.items() if r.startswith("sitio/fuentes/") and r.endswith(".woff2")}
    licencias = sorted(r for r in rel if r.startswith("sitio/fuentes/") and r.lower().startswith("sitio/fuentes/ofl"))
    videos = [video(base + r) for r in sorted(rel) if r.startswith("movimiento/recorrido.") and r.endswith((".mp4", ".webm"))]
    salida["piezas"][pieza] = {
        "paginas": paginas,
        "cssJs": css_js,
        "urlsHttpQuePideElCss": sorted(set(terceros_css)),
        "fuentesWoff2": fuentes,
        "licenciasDeFuentesEnSitio": licencias,
        "recorrido": videos,
        "portadas": sorted(r for r in rel if r.startswith("identidad/portadas/") and r.endswith(".png")),
        "placas": len([r for r in rel if r.startswith("identidad/placas/") and r.endswith(".png")]),
        "capturas": len([r for r in rel if r.startswith("capturas/") and r.endswith((".png", ".jpg"))]),
    }

json.dump(salida, sys.stdout, ensure_ascii=False, indent=1)
print()
