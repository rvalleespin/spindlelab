#!/usr/bin/env python3
"""Arma texto-paso2.md desde texto-paso2.json, que es la fuente.

Uso:
  python3 md.py                 escribe ../texto-paso2.md
  python3 md.py --lector RUTA   escribe en RUTA solo el texto visible de las páginas,
                                sin fuentes, notas ni razonamiento (para la lectura fría)

Sin dependencias. Si cambias el texto, cambia el JSON y vuelve a correr esto: el .md no
se edita a mano.
"""
import json
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent
FUENTE = RAIZ / "texto-paso2.json"
SALIDA = RAIZ / "texto-paso2.md"


def texto_de(el):
    if el.get("tinta"):
        return f"{el['tinta']} *{el['gris']}*"
    if el.get("opciones"):
        return " · ".join(el["opciones"])
    if el.get("items"):
        return "\n".join(f"  - {i}" for i in el["items"])
    if el.get("campos"):
        return "\n".join(f"  - **{c['rotulo']}:** {c['valor']}" for c in el["campos"])
    return el.get("texto", "")


def etiqueta(el):
    rol = el["rol"]
    if rol == "h2" and el.get("nivel") == 3:
        rol = "h3"
    uso = f" · {el['uso']}" if el.get("uso") else ""
    return f"`{rol}{uso}`"


def linea_md(el):
    cuerpo = texto_de(el)
    pre = f"**{el['rotulo']}** · " if el.get("rotulo") and el["rol"] != "ficha" else ""
    s = f"- {etiqueta(el)} {pre}{cuerpo}" if "\n" not in cuerpo else f"- {etiqueta(el)} {pre}\n{cuerpo}"
    extra = []
    if el.get("destino"):
        extra.append(f"→ `{el['destino']}`")
    if el.get("enlaces"):
        extra.append("enlaces: " + ", ".join(f"«{k}» → `{v}`" for k, v in el["enlaces"].items()))
    if el.get("linea"):
        extra.append(f"línea mono: «{el['linea']}»")
    if extra:
        s += "  \n  " + " · ".join(extra)
    if el.get("fuente"):
        s += f"  \n  <sub>Fuente: {el['fuente']}</sub>"
    if el.get("condicion"):
        s += f"  \n  ⚠ **Condición:** {el['condicion']}"
    if el.get("alternativa"):
        alt = "; ".join(f"{k}: «{v}»" for k, v in el["alternativa"].items())
        s += f"  \n  **Si la respuesta es no:** {alt}"
    if el.get("nota") and isinstance(el.get("nota"), str):
        s += f"  \n  <sub>Nota: {el['nota']}</sub>"
    if el.get("donde"):
        s += f"  \n  <sub>Dónde: {el['donde']}</sub>"
    return s


def lista(titulo, items, out):
    if items:
        out.append(f"\n**{titulo}**\n")
        out.extend(f"- {i}" for i in items)


def seccion_md(sec, out):
    out.append(f"\n### {sec['nombre']}\n")
    if sec.get("trabajo"):
        out.append(f"*Trabajo del bloque:* {sec['trabajo']}\n")
    for op in sec.get("opciones", []):
        marca = " · **recomendada**" if op.get("recomendada") else ""
        out.append(f"\n#### {op['marca']}{marca}\n")
        out.extend(linea_md(e) for e in op["elementos"])
        if op.get("notas"):
            out.append(f"\n<sub>{op['notas']}</sub>")
    if sec.get("opciones"):
        out.append("\n#### Común a las tres opciones\n")
    out.extend(linea_md(e) for e in sec.get("elementos", []))
    if sec.get("notas"):
        out.append(f"\n<sub>{sec['notas']}</sub>")
    lista("Descartes del titular", sec.get("descartes"), out)
    lista("Lo que se borró del texto anterior, y por qué", sec.get("borrado"), out)


def construccion_md(p, out):
    """Lo que queda escrito para la construcción de la dirección elegida (no se ve en los prototipos)."""
    c = p["para_la_construccion"]
    nombres = {e["id"]: e["nombre"] for e in p.get("entradas", [])}
    out += ["", f"### Para la construcción: {c['titulo'][0].lower()}{c['titulo'][1:]}", "", c["problema"], "",
            f"*{c['mientras_tanto']}*"]
    for s in c["salidas"]:
        out += ["", f"#### Dirección {s['direccion']}", "", f"**{s['salida']}** {s['por_que']}", ""]
        out.extend(f"- {x}" for x in s["cambios"])
        if s.get("nota_nueva"):
            out += ["", f"- `nota` (nueva) {s['nota_nueva']}"]
    out += ["", "#### «Con qué está hecho», lo que hace cada herramienta (salida de B)", "",
            "| Entrada | Lo que hace (letra del cuerpo) | Herramienta (mono) | Fuente |", "|---|---|---|---|"]
    out.extend(f"| {nombres.get(x['entrada'], x['entrada'])} | {x['hace']} | {x['herramienta']} | {x['fuente']} |"
               for x in c["con_que_esta_hecho"])
    out += ["", f"<sub>{c['sin_lectura_fria']}</sub>"]


def md(d):
    out = [
        "# E12 · Paso 2 · El texto de las páginas de la compuerta 2",
        "",
        f"**{d['encargo']} · {d['quien']}** · rama `claude/magical-franklin-ckfki2` · fuente: "
        "`texto-paso2.json` (este archivo sale de ahí con `herramientas/md.py`; no se edita a mano).",
        "",
        f"**Estado:** {d['estado']}",
        "",
        "**Manda:** " + "; ".join(d["manda"]) + ".",
        "",
        "## Cómo leer esto",
        "",
    ]
    out.extend(f"- {c}" for c in d["convenciones"])
    out.append("- Cada línea empieza con su rol entre comillas invertidas: " + ", ".join(
        f"`{k}`" for k in d["roles"]) + ". *La parte en cursiva* es la continuación en gris.")
    out.append("- `Fuente` dice de dónde sale el hecho; `Condición`, qué decisión espera.")

    dh = d.get("decision_hero", {})
    out += ["", "## La decisión del hero", "", f"**Recomendada:** `{dh.get('recomendada')}`. {dh.get('por_que', '')}", ""]
    for p in dh.get("puntos", []):
        out.append(f"- {p}")

    for p in d["paginas"]:
        out += ["", f"## {p['ruta']} · {p['id']}", "", f"- `title` {p['title']}", f"- `description` {p['description']}"]
        if p.get("estructura"):
            out.append(f"- *Estructura:* {p['estructura']}")
        for s in p.get("secciones", []):
            seccion_md(s, out)
        if p.get("entradas"):
            out += ["", "### Las entradas del índice", "", f"*{p.get('orden', '')}*", "",
                    "| # | Nombre | Bajada (gris) | Línea mono | Resultado (columna de B) |",
                    "|---|---|---|---|---|"]
            for i, e in enumerate(p["entradas"], 1):
                res = e["resultado"]
                if e.get("condicion"):
                    res += f" ⚠ {e['condicion']} Si no: «{e['alternativa']['resultado']}»"
                out.append(f"| {i} | **{e['nombre']}** | {e['bajada']} | {e['linea']}<br><sub>home y servicio: {e['linea_corta']}</sub> | {res} |")
            out += ["", "<sub>Fuentes por entrada: " + " · ".join(f"{e['nombre']}: {e['fuente']}" for e in p["entradas"]) + "</sub>"]
            filas = [f"«{k}» → {v}" for e in p["entradas"] for k, v in e.get("filas_inventario", {}).items()]
            out += ["", "<sub>Cada herramienta de la línea mono y su fila en el inventario: " + " · ".join(dict.fromkeys(filas)) + "</sub>"]
            for e in p["entradas"]:
                if e.get("nota"):
                    out.append(f"\n<sub>{e['nombre']}: {e['nota']}</sub>")
            lista("Lo que se borró del texto anterior, y por qué", p.get("borrado"), out)
        if p.get("para_la_construccion"):
            construccion_md(p, out)

    out += ["", "## Afirmaciones por verificar antes de publicar", ""]
    out.extend(f"- **{a['texto']}.** {a['estado']}" for a in d["afirmaciones_por_verificar"])
    out += ["", "## Pendientes que no son míos", ""]
    out.extend(f"- {x}" for x in d["pendientes"])
    if d.get("lectura_fria"):
        lf = d["lectura_fria"]
        out += ["", "## Lo que cambió con la lectura fría", "", lf.get("resumen", ""), ""]
        out.extend(f"- {c}" for c in lf.get("cambios", []))
    out += ["", "## Historial de correcciones", "", "| Fecha | Corrección | Origen |", "|---|---|---|"]
    out.extend(f"| {h['fecha']} | {h['que']} | {h['origen']} |" for h in d.get("historial", []))
    return "\n".join(out) + "\n"


def visible(el):
    """Solo lo que se ve en pantalla, sin fuentes ni condiciones."""
    if el.get("uso") in ("referencia", "planes"):
        return None
    if el.get("uso") == "alt":
        return f"[IMAGEN O VIDEO: {el['texto']}]"
    t = el["texto"] if el.get("tinta") else texto_de(el).replace("*", "")
    if el.get("rotulo") and el["rol"] != "ficha":
        t = f"{el['rotulo']}: {t}"
    rol = el["rol"]
    if rol == "h2" and el.get("nivel") == 3:
        rol = "subtítulo"
    nombres = {"h1": "TITULAR", "h2": "TÍTULO DE SECCIÓN", "entradilla": "BAJADA", "parrafo": "TEXTO",
               "boton": "BOTÓN O ENLACE", "nota": "TEXTO CHICO", "rotulo": "ETIQUETA", "ficha": "FICHA",
               "cita": "CITA", "subtítulo": "SUBTÍTULO"}
    return f"[{nombres.get(rol, rol)}] {t}"


def lector(d):
    out = []
    porId = {e["id"]: e for p in d["paginas"] for e in p.get("entradas", [])}

    def entradas(ids):
        for i in ids:
            e = porId[i]
            out.append(f"[PIEZA DEL ÍNDICE] {e['nombre']}. {e['bajada']} ({e['linea_corta']})")

    for p in d["paginas"]:
        out += ["", "=" * 60, f"PÁGINA: {p['ruta']}", "=" * 60]
        for s in p.get("secciones", []):
            out.append("")
            if s.get("opciones"):
                out.append("[EL TITULAR DE ESTA PÁGINA TIENE TRES VERSIONES EN PRUEBA. LEE LAS TRES.]")
                for op in s["opciones"]:
                    out.append(f"--- Versión {op['marca'].split('·')[0].strip().replace('Opción ', '')} ---")
                    out.extend(v for v in (visible(e) for e in op["elementos"]) if v)
                out.append("--- Lo que sigue va igual con cualquiera de las tres ---")
            for e in s.get("elementos", []):
                if e["id"] == "home.obra.entradas":
                    entradas(["combeau-fotografia", "praxi", "verifica-y-cumple", "sesenta"])
                elif e["id"] == "dw.obra.entradas":
                    entradas(["combeau-fotografia", "praxi", "sesenta"])
                elif e["id"] == "dw.planes.lista":
                    out.append("[PLANES]")
                    for pl in PLANES:
                        out.append(f"  {pl['n']} · {pl['p']} · {pl['d']} · " + " / ".join(pl["puntos"]))
                else:
                    v = visible(e)
                    if v:
                        out.append(v)
        if p.get("entradas"):
            out.append("")
            for e in p["entradas"]:
                out.append(f"[PIEZA] {e['nombre']} · {e['linea']}\n   {e['bajada']}\n   Resultado: {e['resultado']}")
    return "\n".join(out).strip() + "\n"


PLANES = []

if __name__ == "__main__":
    d = json.loads(FUENTE.read_text(encoding="utf-8"))
    if "--lector" in sys.argv:
        oferta = RAIZ.parents[3].parent.parent / "spindlelab-astro" / "src" / "data" / "oferta-v3.json"
        PLANES.extend(json.loads(oferta.read_text(encoding="utf-8"))["momentos"][0]["planes"])
        destino = Path(sys.argv[sys.argv.index("--lector") + 1])
        destino.write_text(lector(d), encoding="utf-8")
        print(f"texto para el lector: {destino}")
    else:
        SALIDA.write_text(md(d), encoding="utf-8")
        print(f"escrito: {SALIDA}")
