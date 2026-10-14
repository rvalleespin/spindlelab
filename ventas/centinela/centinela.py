#!/usr/bin/env python3
"""Centinela de sitios entregados.

Mide los dos chequeos publicos de la casa sobre cada dominio vigilado, guarda la
foto del dia, la compara con la anterior y deja un BORRADOR de informe.

No manda nada. No publica nada. El envio lo hace Ramon despues de leerlo.

Uso:  python3 ventas/centinela/centinela.py
      python3 ventas/centinela/centinela.py --dominio bernardocombeau.cl
"""
import json, subprocess, sys, datetime, pathlib, argparse

BASE = pathlib.Path(__file__).resolve().parent
SNAPS = BASE / "snapshots"
INFOR = BASE / "informes"
API_AEO = "https://spindlelab.cl/api/chequeo?dominio="
API_VYC = "https://verifica.spindlelab.cl/api/chequeo?dominio="
HOY = datetime.date.today().isoformat()


def pedir(url, intentos=3):
    """curl, no urllib: funciona igual en la nube y en el Mac, y respeta el proxy."""
    for i in range(intentos):
        p = subprocess.run(["curl", "-sS", "-m", "60", url],
                           capture_output=True, text=True)
        if p.returncode == 0 and p.stdout.strip():
            try:
                return json.loads(p.stdout)
            except json.JSONDecodeError:
                pass
        if i == intentos - 1:
            return {"error": (p.stderr or p.stdout or "sin respuesta").strip()[:300]}
    return {"error": "sin respuesta"}


def medir(dominio):
    aeo = pedir(API_AEO + dominio)
    vyc = pedir(API_VYC + dominio)
    return {
        "dominio": dominio,
        "fecha": HOY,
        "aeo": {
            "puntaje": aeo.get("puntaje"),
            "error": aeo.get("error"),
            "items": {i["id"]: i.get("estado") for i in aeo.get("items", [])},
            "titulos": {i["id"]: i.get("titulo") for i in aeo.get("items", [])},
            "prioridades": [p.get("titulo") for p in (aeo.get("prioridades") or [])][:3],
            "arreglos": {p.get("titulo"): p.get("arreglo") for p in (aeo.get("prioridades") or [])},
        },
        "vyc": {"puntaje": vyc.get("puntaje"), "error": vyc.get("error")},
    }


def anterior(dominio):
    previos = sorted(SNAPS.glob(f"{dominio}-*.json"))
    if not previos:
        return None
    return json.loads(previos[-1].read_text(encoding="utf-8"))


def flecha(hoy, antes):
    if hoy is None or antes is None:
        return "sin dato"
    d = hoy - antes
    if d > 0:
        return f"**subio {d}** (de {antes} a {hoy})"
    if d < 0:
        return f"**BAJO {abs(d)}** (de {antes} a {hoy})"
    return f"igual ({hoy})"


def informe(cliente, foto, prev):
    L = []
    L.append(f"# Centinela — {cliente} ({foto['dominio']})")
    L.append("")
    L.append(f"**Medicion del {foto['fecha']}.** Borrador: lo lee Ramon antes de que salga a ninguna parte.")
    if prev:
        L.append(f"Comparado con la medicion del {prev['fecha']}.")
    else:
        L.append("Primera medicion registrada. No hay con que comparar todavia.")
    L.append("")

    a_hoy, v_hoy = foto["aeo"]["puntaje"], foto["vyc"]["puntaje"]
    a_ant = prev["aeo"]["puntaje"] if prev else None
    v_ant = prev["vyc"]["puntaje"] if prev else None
    L.append("| Chequeo | Hoy | Respecto de la vez anterior |")
    L.append("|---|---|---|")
    L.append(f"| Visibilidad en IA (21 senales) | {a_hoy if a_hoy is not None else 'sin dato'}/100 | {flecha(a_hoy, a_ant)} |")
    L.append(f"| Cumplimiento Ley 21.719 | {v_hoy if v_hoy is not None else 'sin dato'}/100 | {flecha(v_hoy, v_ant)} |")
    L.append("")

    for capa, et in (("aeo", "visibilidad en IA"), ("vyc", "cumplimiento")):
        if foto[capa].get("error"):
            L.append(f"> El chequeo de {et} no respondio: `{foto[capa]['error']}`. **El dato de arriba no vale**; hay que repetir la medicion antes de usarlo.")
            L.append("")

    if prev:
        cambios = []
        for id_, estado in foto["aeo"]["items"].items():
            antes = prev["aeo"]["items"].get(id_)
            if antes and antes != estado:
                t = foto["aeo"]["titulos"].get(id_, id_)
                cambios.append((id_, t, antes, estado))
        if cambios:
            L.append("## Lo que cambio de estado")
            L.append("")
            for id_, t, antes, ahora in cambios:
                signo = "se arreglo" if ahora == "ok" else "**se rompio**"
                L.append(f"- {signo}: {t} (`{id_}`), de `{antes}` a `{ahora}`")
            L.append("")
        else:
            L.append("## Lo que cambio de estado")
            L.append("")
            L.append("Nada. Las 21 senales estan igual que la vez anterior.")
            L.append("")

    pr = foto["aeo"]["prioridades"]
    if pr:
        L.append("## Lo que toca arreglar primero")
        L.append("")
        L.append("En el orden que da el propio chequeo (acceso antes que entidad, entidad antes que citabilidad):")
        L.append("")
        for t in pr:
            arreglo = foto["aeo"]["arreglos"].get(t, "")
            L.append(f"1. **{t}** — {arreglo}")
        L.append("")

    L.append("---")
    L.append("")
    L.append("**Como se midio.** `GET /api/chequeo` sobre el dominio, en los dos chequeos publicos de la casa. ")
    L.append("Cualquiera puede reproducirlo: son publicos y corren sobre cualquier dominio. ")
    L.append("**Lo que esto NO mide:** cuanta gente llega, cuantos contactan, ni si una IA de verdad lo cita hoy. ")
    L.append("Mide lo que depende del sitio.")
    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dominio", help="medir solo este dominio")
    args = ap.parse_args()

    SNAPS.mkdir(exist_ok=True)
    INFOR.mkdir(exist_ok=True)
    cfg = json.loads((BASE / "clientes.json").read_text(encoding="utf-8"))
    sitios = [s for s in cfg["sitios"] if not args.dominio or s["dominio"] == args.dominio]
    if not sitios:
        print(f"No hay ningun sitio con dominio {args.dominio} en clientes.json")
        return 1

    for s in sitios:
        prev = anterior(s["dominio"])
        foto = medir(s["dominio"])
        (SNAPS / f"{s['dominio']}-{HOY}.json").write_text(
            json.dumps(foto, ensure_ascii=False, indent=2), encoding="utf-8")
        texto = informe(s["cliente"], foto, prev)
        destino = INFOR / f"{HOY}-{s['dominio']}.md"
        destino.write_text(texto, encoding="utf-8")
        print(f"{s['dominio']}: IA {foto['aeo']['puntaje']} · cumplimiento {foto['vyc']['puntaje']} → {destino.relative_to(BASE.parent.parent)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
