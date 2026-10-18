#!/usr/bin/env python3
"""E12 · inventario · los @id y @type que publica bernardocombeau.cl en su JSON-LD (nota de señales de Simón).

Lee el HTML servido (bajado con curl a una carpeta fuera del repo) y guarda solo la estructura: por nodo, su @id, su
@type y el NOMBRE de sus claves, nunca sus valores. El HTML y los valores del grafo traen teléfono, correo y dirección
del cliente, que no entran al repo; el sha256 del HTML permite comprobar que el extracto sale de esa respuesta.

Uso: python3 -I ids-jsonld-combeau.py <portada.html> <modelo.html> <medidoEn ISO> > ../crudo/jsonld-ids-bernardocombeau.cl.json
"""
import hashlib
import json
import re
import sys

portada, modelo, cuando = sys.argv[1:4]


def nodos(n, acc):
    if isinstance(n, dict):
        if "@type" in n or "@id" in n:
            acc.append({"@id": n.get("@id"), "@type": n.get("@type"), "claves": sorted(k for k in n if not k.startswith("@"))})
        for v in n.values():
            nodos(v, acc)
    elif isinstance(n, list):
        for v in n:
            nodos(v, acc)
    return acc


def pagina(url, archivo):
    crudo = open(archivo, "rb").read()
    h = crudo.decode("utf-8")
    acc = []
    for b in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', h, re.S):
        nodos(json.loads(b), acc)
    return {"url": url, "bytes": len(crudo), "sha256": hashlib.sha256(crudo).hexdigest(), "nodos": acc}


json.dump({
    "medidoEn": cuando,
    "metodo": "curl -sS con user-agent de Chrome 141; extracto con ids-jsonld-combeau.py. Solo @id, @type y nombres de claves: ningún valor del grafo (trae datos de contacto del cliente).",
    "paginas": [pagina("https://bernardocombeau.cl/", portada), pagina("https://bernardocombeau.cl/modelo/", modelo)],
}, sys.stdout, ensure_ascii=False, indent=1)
print()
