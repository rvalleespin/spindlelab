"""E12 · Arma el tablero de la obra construida (`tablero.html`) y su lista de archivos (`archivos.json`) desde sus fuentes.
Lucía (dirección de arte), 23-oct-2026. Reutiliza la forma de `tableros/e12-direcciones/herramientas/armar-tablero.py`
(tokens, un solo tema en negro, figuras, marcos que bajan por dentro, comprobaciones del contrato antes de escribir).

Lee, sin escribir en ninguna:
- `e12/acta-obra.md`, «Vuelta 2»: el veredicto, los ocho defectos de la vuelta 1 y los defectos nuevos 9 y 10;
- `pendientes-traspaso-revisados.md` §0 (el cierre de Mauro): §0.1 (la pregunta del Layout, cerrada), §0.2 (antes de
  publicar), §0.3 (declarado y abierto), §0.4 (cuando haya plata o material) y §0.5 (la troncal);
- `spec-visual.md` §0.3 (los desvíos registrados) y §7 (la fila del 19-oct del Layout);
- `desvios.md`: cada punto de cada tanda; los que no se resumen aquí abajo (RESUMEN) o no se saltan con su porqué (SALTA)
  hacen fallar el script, y cada resumen trae las cifras que tiene que encontrar en su punto;
- `e12/insumos-ramon-19oct.md` §5 (la respuesta del Layout, textual) y `e12/texto/texto-obra.json` (la ficha, el `h1` y
  los créditos de los seis casos, de Clara, tal cual);
- `capturas/e12/primera/` (las primeras pantallas de cierre de Mauro, a 1440 y 390): se copian tal cual a `img/p-*.jpg`;
- `datos/tramos.json` y `img/<ruta>-<ancho>-<k>de<n>.jpg` (las páginas enteras, de `herramientas/tramos.py`);
- `datos/movimiento.json` y `video/*.webm` (la portada, la cinta y el teléfono, de `herramientas/grabar-movimiento.mjs`):
  los pies salen de lo medido, y si una medición no dice lo que el pie afirma, el script falla;
- `datos/verificacion/*.log` (build, `verificar` a 390 y 1440 y `comparar-produccion.mjs` del 23-oct);
- el `dist/` de `spindlelab-astro/`, si está: el `<title>` de cada ruta y si Praxi nombra sus dos modelos, que se guardan
  en `datos/sitio.json` (sin `dist/`, se leen de ahí).

Escribe `tablero.html` (sin doctype, html, head ni body), `img/p-*.jpg` (copias exactas), `video/*.mp4` (el H.264 de cada
grabación, para Safari), `img/v-*.jpg` (sus pósters) y `archivos.json` (toda ruta que el tablero referencia, con sus
bytes y su origen). Falla si una imagen pasa de 450 kB, un video de 8 MB, la página de 16 MB, el total de 60 MB o los
archivos de 250 (kB = 1.000 bytes; MB = 1.000.000).

Uso: python3 -I herramientas/armar-tablero.py    (desde cualquier carpeta; necesita ffmpeg y ffprobe)
"""
import filecmp
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from decimal import ROUND_HALF_UP, Decimal

from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(AQUI)  # tableros/e12-obra
V3 = os.path.dirname(os.path.dirname(BASE))  # obras-web/spindlelab-v3
REPO = os.path.abspath(os.path.join(V3, "..", "..", "..", ".."))
E12 = os.path.join(V3, "e12")
ASTRO = os.path.join(REPO, "spindlelab-astro")
IMG = os.path.join(BASE, "img")
VIDEO = os.path.join(BASE, "video")
DATOS = os.path.join(BASE, "datos")
PRIMERA = os.path.join(V3, "capturas", "e12", "primera")

FUENTES = "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wdth,wght@25..151,100..1000&family=DM+Mono:wght@500&display=swap"
FECHA = "23 de octubre de 2026"
MAX_IMG = 450_000
MAX_VIDEO = 8_000_000
MAX_PAGINA = 16_000_000
MAX_TOTAL = 60_000_000
MAX_ARCHIVOS = 250

e = html.escape


def leer(ruta):
    with open(ruta, encoding="utf-8") as f:
        return f.read()


def leer_json(ruta):
    with open(ruta, encoding="utf-8") as f:
        return json.load(f)


def num(x, dec=1):
    q = Decimal(str(x)).quantize(Decimal(1).scaleb(-dec), rounding=ROUND_HALF_UP)
    return f"{q:.{dec}f}".replace(".", ",")


def miles(n):
    return f"{n:,}".replace(",", ".")


def md(t):
    """Markdown en línea de las fuentes (negrita, código, cursiva, enlaces) a HTML escapado."""
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    t = e(t, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    t = re.sub(r"(?<![*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])", r"<em>\1</em>", t)
    return t


def seccion_md(texto, titulo, nivel="## "):
    a = texto.index(nivel + titulo)
    b = texto.find("\n" + nivel, a + 1)
    return texto[a: b if b > 0 else None]


def tabla_md(texto, encabezado, columnas):
    """Filas de la primera tabla markdown cuyo encabezado empieza con `encabezado`."""
    lineas = texto.splitlines()
    for i, l in enumerate(lineas):
        if l.startswith("|") and l.strip("| ").startswith(encabezado):
            filas = []
            for m in lineas[i + 2:]:
                if not m.startswith("|"):
                    break
                celdas = [c.strip() for c in m.strip().strip("|").split(" | ")]
                assert len(celdas) == columnas, (encabezado, celdas)
                filas.append(celdas)
            return filas
    raise KeyError(encabezado)


def vinetas(texto):
    """Los ítems «- …» de un bloque markdown, con sus líneas de continuación."""
    items = []
    for l in texto.splitlines():
        if l.startswith("- "):
            items.append(l[2:].strip())
        elif items and l.startswith("  ") and l.strip():
            items[-1] += " " + l.strip()
    return items


# ---------------------------------------------------------------- archivos
detalle = {}  # ruta relativa → origen y nota (para archivos.json)


def copia(origen, destino_rel, nota="copia exacta"):
    destino = os.path.join(BASE, destino_rel)
    if not (os.path.exists(destino) and filecmp.cmp(origen, destino, shallow=False)):
        shutil.copyfile(origen, destino)
    detalle[destino_rel] = {"origen": os.path.relpath(origen, BASE), "nota": nota}
    return destino_rel


def imagen(rel, origen, nota):
    ruta = os.path.join(BASE, rel)
    w, h = Image.open(ruta).size
    detalle[rel] = {"origen": origen, "nota": nota}
    return {"src": rel, "w": w, "h": h}


def sonda(ruta):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                        "stream=codec_name,profile,level,width,height:format=duration", "-of", "json", ruta],
                       capture_output=True, text=True, check=True)
    d = json.loads(r.stdout)
    s = d["streams"][0]
    return {"codec": s["codec_name"], "perfil": s.get("profile"), "nivel": s.get("level"), "w": s["width"],
            "h": s["height"], "dur": float(d["format"]["duration"])}


def tipo_mp4(info):
    perfil = {"Constrained Baseline": "42E0", "Baseline": "4200", "Main": "4D00", "High": "6400"}[info["perfil"]]
    return f'video/mp4; codecs="avc1.{perfil}{info["nivel"]:02X}"'


def a_mp4(webm, nombre, crf):
    destino = os.path.join(VIDEO, f"{nombre}.mp4")
    if not os.path.exists(destino) or os.path.getmtime(destino) < os.path.getmtime(webm):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", webm, "-an", "-c:v", "libx264", "-preset", "slow", "-crf",
                        str(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-map_metadata", "-1", destino], check=True)
    detalle[f"video/{nombre}.mp4"] = {"origen": os.path.relpath(webm, BASE), "nota": f"H.264 para Safari, hecho por el tablero con ffmpeg (libx264, crf {crf})"}
    return f"video/{nombre}.mp4"


def poster(webm, nombre, t, ancho_max):
    destino = os.path.join(IMG, f"v-{nombre}.jpg")
    with tempfile.TemporaryDirectory() as tmp:
        png = os.path.join(tmp, "cuadro.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", webm, "-frames:v", "1", png], check=True)
        im = Image.open(png).convert("RGB")
    if im.width > ancho_max:
        im = im.resize((ancho_max, round(im.height * ancho_max / im.width)), Image.LANCZOS)
    for q in (80, 76, 72, 68, 64):
        im.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(destino) <= MAX_IMG:
            break
    rel = f"img/v-{nombre}.jpg"
    detalle[rel] = {"origen": os.path.relpath(webm, BASE) + f" (cuadro del segundo {num(t)})", "nota": f"póster del video, {im.width} × {im.height}, JPEG {q}"}
    return {"src": rel, "w": im.width, "h": im.height}


def figura(f, alt, pie="", clase="", carga="lazy"):
    cap = f"<figcaption>{pie}</figcaption>" if pie else ""
    return (f'<figure class="fig {clase}"><img src="{f["src"]}" width="{f["w"]}" height="{f["h"]}" alt="{e(alt)}" '
            f'loading="{carga}" decoding="async">{cap}</figure>')


def visor(tramos, alt_base, clase):
    imgs = "".join(
        f'<img src="{t["src"]}" width="{t["w"]}" height="{t["h"]}" alt="{e(alt_base)}, tramo {i} de {len(tramos)}" loading="lazy" decoding="async">'
        for i, t in enumerate(tramos, 1))
    return (f'<div class="visor {clase}" tabindex="0" role="region" aria-label="{e(alt_base)}: baja dentro del marco">'
            f"{imgs}</div>")


# ---------------------------------------------------------------- las rutas (el mapa del brief §3, en el orden de Javiera)
RUTAS = [
    "/v3/", "/v3/trabajo/", "/v3/trabajo/praxi/", "/v3/trabajo/combeau/", "/v3/trabajo/sesenta/", "/v3/trabajo/ocelo/",
    "/v3/trabajo/doceavo/", "/v3/trabajo/tonela/", "/v3/diagnostico/", "/v3/servicios/", "/v3/servicios/desarrollo-web/",
    "/v3/servicios/visibilidad-en-ia/", "/v3/servicios/auditoria-seo-tecnica/", "/v3/servicios/acompanamiento-mensual/",
    "/v3/servicios/redes-sociales/", "/v3/servicios/paid-media/", "/v3/metodo/", "/v3/nosotros/", "/v3/contacto/",
    "/v3/blog/", "/v3/blog/21-chequeos-visibilidad-ia/", "/v3/blog/como-aparecer-en-chatgpt/",
    "/v3/blog/como-elegir-verificar-agencia-aeo-geo-chile/", "/v3/blog/cuanto-cuesta-seo-tecnico-chile/",
    "/v3/blog/que-es-aeo-geo/", "/v3/blog/que-es-un-mini-diagnostico-seo/", "/v3/blog/seo-tecnico-fintechs-chile/",
]
GRUPOS = [
    ("La home y el índice de trabajo", RUTAS[0:2]),
    ("Los seis casos", RUTAS[2:8]),
    ("El chequeo y los servicios", RUTAS[8:16]),
    ("Método, nosotros y contacto", RUTAS[16:19]),
    ("El blog y sus siete artículos", RUTAS[19:27]),
]
assert sum(len(g[1]) for g in GRUPOS) == 27 and len(set(RUTAS)) == 27
nombre = lambda r: "home" if r == "/v3/" else r.removeprefix("/v3/").rstrip("/").replace("/", "_")

# El sitio: el <title> de cada ruta y lo que dice Praxi de sus modelos, desde el dist/ (o lo guardado, si no hay build)
SITIO = os.path.join(DATOS, "sitio.json")
if os.path.exists(os.path.join(ASTRO, "dist", "v3", "index.html")):
    sitio = {"de": "spindlelab-astro/dist (build del 23-oct)", "titulos": {}}
    for r in RUTAS:
        h = leer(os.path.join(ASTRO, "dist", r.lstrip("/"), "index.html"))
        sitio["titulos"][r] = html.unescape(re.search(r"<title>(.*?)</title>", h, re.S).group(1)).strip()
    hp = leer(os.path.join(ASTRO, "dist", "v3", "trabajo", "praxi", "index.html"))
    tp = html.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"<script.*?</script>|<style.*?</style>", "", hp, flags=re.S)))
    tp = " ".join(tp.split())
    sitio["praxi"] = {
        "sonnet": re.search(r"[^.]*Claude Sonnet 5, el modelo que conversa contigo como coach[^.]*\.", tp).group(0).strip(),
        "haiku": "Claude Haiku 4.5, un modelo de IA de Anthropic, convierte esa frase en un registro ordenado" in tp,
        "enlacePraxiCoach": "praxi.coach" in hp,
        "enPausa": bool(re.search(r"en pausa|fuera de l[ií]nea", tp, re.I)),
    }
    with open(SITIO, "w", encoding="utf-8") as f:
        json.dump(sitio, f, ensure_ascii=False, indent=1)
        f.write("\n")
sitio = leer_json(SITIO)
assert sitio["praxi"]["haiku"] and not sitio["praxi"]["enlacePraxiCoach"] and not sitio["praxi"]["enPausa"], sitio["praxi"]

# ---------------------------------------------------------------- 1 · el veredicto (acta de Javiera, vuelta 2)
acta = leer(os.path.join(E12, "acta-obra.md"))
v2 = seccion_md(acta, "Vuelta 2 (Javiera)")
assert "### Veredicto: **CON REPAROS**" in v2
ocho = tabla_md(v2, "# | Qué era", 5)
assert [f[0] for f in ocho] == [str(i) for i in range(1, 9)] and all(f[4].startswith("**Cerrado**") for f in ocho), [f[4] for f in ocho]
nuevos = {f[0]: f for f in tabla_md(v2, "# | Severidad", 7)}
assert sorted(nuevos) == ["10", "9"] and nuevos["9"][2] == "Diego" and nuevos["10"][2] == "Lucía"
for frase in ("64 casos", "el chequeo sobre el build local\nsaca 83, igual que el 16-oct", "Producción sigue igual byte a byte",
              "los dos se cierran antes de publicar la v3"):
    assert frase in v2, frase

# lo que verifiqué hoy, antes de armar el tablero
VER = os.path.join(DATOS, "verificacion")
build = leer(os.path.join(VER, "build.log"))
m_build = re.search(r"\[build\] (\d+) page\(s\) built", build)
assert m_build and "[build] Complete!" in build
PAGINAS_BUILD = int(m_build.group(1))
for a in (390, 1440):
    v = leer(os.path.join(VER, f"verificar-{a}.log"))
    assert f"27 página(s) revisadas a {a}px de ancho." in v and "Sin hallazgos." in v, a
comparar = leer(os.path.join(VER, "comparar-produccion.log"))
assert "Iguales byte a byte: ninguna página publicada ni archivo que sirvan cambió." in comparar
m_prod = re.search(r"Producción: (\d+) HTML, (\d+) archivos fuera de _astro/", comparar)

filas_ocho = "".join(
    f'<tr><th scope="row" data-rotulo="Defecto">{f[0]}</th><td data-rotulo="Qué era">{md(f[1])}</td>'
    f'<td data-rotulo="Cómo quedó">{md(f[4])}</td></tr>' for f in ocho)

seccion_veredicto = f"""
<section id="veredicto" class="seccion" aria-labelledby="t-veredicto">
  <div class="seccion__lado"><p class="rotulo">1</p><h2 id="t-veredicto">El veredicto</h2></div>
  <div class="seccion__cuerpo">
    <div class="veredicto">
      <p><span class="sello">Con reparos</span></p>
      <p class="intro">Javiera revisó la obra en un contexto aparte, sin ver cómo se construyó. En la primera vuelta la rechazó, con cuatro defectos mayores y cuatro menores. En la segunda, el 23-oct, los ocho estaban cerrados y los midió con las mismas herramientas.</p>
      <p class="nota">Quedan dos menores nuevos, el 9 y el 10. No impiden mostrarte <code>/v3/</code>, y se cierran antes de publicar con una comprobación exprés de Javiera, sin otra vuelta completa (sección 6). Producción sigue igual byte a byte y en <code>Layout.astro</code> están las cinco props que aprobaste, nada más. Acta completa: <code>e12/acta-obra.md</code>.</p>
    </div>
    <div class="tabla-envuelta">
      <table class="tabla tabla--ocho">
        <caption class="rotulo">Los ocho defectos de la primera vuelta</caption>
        <thead><tr><th scope="col">#</th><th scope="col">Qué era</th><th scope="col">Cómo quedó en la segunda vuelta</th></tr></thead>
        <tbody>{filas_ocho}</tbody>
      </table>
    </div>
    <div class="bloque">
      <h3>Lo que comprobé hoy, antes de armar este tablero</h3>
      <ul class="hechos">
        <li><span class="rotulo">Build</span><span><code>npm run build</code>: {PAGINAS_BUILD} páginas, sin error (las 27 de <code>/v3/</code>, las cuatro maquetas archivadas y las dos v2).</span></li>
        <li><span class="rotulo">Verificar</span><span><code>npm run verificar -- --prefijo /v3/</code> a 390 y a 1440: 27 páginas, sin hallazgos.</span></li>
        <li><span class="rotulo">Producción</span><span>Los {m_prod.group(1)} HTML de producción y sus {m_prod.group(2)} archivos, iguales byte a byte a la línea base que dejó la tanda 1.</span></li>
      </ul>
      <p class="nota">Las capturas y las grabaciones de este tablero salen de ese build. <code>spindlelab-astro/</code> no cambió desde <code>f2fe7b4</code>, la obra que Javiera auditó.</p>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- 2 · en movimiento
mov = leer_json(os.path.join(DATOS, "movimiento.json"))["grabaciones"]
assert sorted(mov) == ["cinta-1440", "portada-1440", "telefono-390"], sorted(mov)
hilo = sonda(os.path.join(ASTRO, "public", "v3", "portada", "hilo-1920.webm"))
cinta_src = sonda(os.path.join(ASTRO, "public", "v3", "cinta", "cinta.webm"))
assert abs(cinta_src["dur"] - 16) < 0.05, cinta_src
ORDEN_CINTA = ["Combeau, fotografía", "Sesenta", "Praxi", "Tonela", "Verifica y Cumple", "Ocelo", "Combeau, modelo", "Doceavo"]


def clip(clave, crf, t_poster, ancho_poster, etiqueta, pie, clase=""):
    r = mov[clave]
    webm = os.path.join(BASE, r["archivo"])
    info = sonda(webm)
    assert info["codec"] == "vp9" and abs(info["dur"] - r["duracion"]) < 0.1 and (info["w"], info["h"]) == (r["ancho"], r["alto"]), (clave, info)
    assert not r["errores"], r["errores"]
    detalle[r["archivo"]] = {"origen": "herramientas/grabar-movimiento.mjs", "nota": f"grabado del build con el screencast de Chromium, VP9 crf {r['crf']}; lo medido, en datos/movimiento.json"}
    mp4 = a_mp4(webm, clave, crf)
    imp4 = sonda(os.path.join(BASE, mp4))
    assert imp4["codec"] == "h264" and abs(imp4["dur"] - info["dur"]) < 0.2, (mp4, imp4, info)
    p = poster(webm, clave, t_poster, ancho_poster)
    src = f'<source src="{mp4}" type=\'{tipo_mp4(imp4)}\'><source src="{r["archivo"]}" type="video/webm">'
    return (f'<figure class="fig clip {clase}"><video controls preload="none" playsinline poster="{p["src"]}" width="{info["w"]}" '
            f'height="{info["h"]}" aria-label="{e(etiqueta)}">{src}</video><figcaption>{pie}</figcaption></figure>')


pm = mov["portada-1440"]["medidas"]
assert [m["momento"] for m in pm] == ["al empezar", "a media grabación", "al terminar"]
assert all(m["portada"]["corre"] and m["portada"]["src"] == "/v3/portada/hilo-1920.webm" and "Pausar el video" in m["pausas"] for m in pm)
pie_portada = (f"La primera pantalla de <code>/v3/</code> a 1440 × 900, quieta, {num(mov['portada-1440']['duracion'])} s: dos vueltas del hilo "
               f"de oro, un bucle de {num(hilo['dur'], 2)} s en VP9 de {hilo['w']} × {hilo['h']}. Corre al empezar, a la mitad y al terminar la "
               "grabación, con su botón de pausa arriba a la derecha. La frase y el chequeo van encima, sobre el velo negro; el contraste "
               "lo midió Javiera sobre los 121 cuadros del video (la peor línea, 5,31:1).")
assert "la peor, **5,31:1**" in v2

cm = mov["cinta-1440"]
assert cm["fichas"][:8] == ORDEN_CINTA, cm["fichas"]
c0, c1 = cm["medidas"][0], cm["medidas"][-1]
assert c0["cinta"]["corre"] and c1["cinta"]["corre"] and not c0["portada"]["corre"]
# el póster de la cinta, a mitad del tramo de Sesenta (segundos 2 a 4 de la cinta), para que la ficha y el cuadro digan lo mismo
T_POSTER_CINTA = round(3.0 - c0["cinta"]["t"], 2)
assert 0.3 <= T_POSTER_CINTA <= cm["duracion"] - 0.5, T_POSTER_CINTA
pie_cinta = (f"La cinta, la primera sección después de la portada, a 1440 × 900, {num(cm['duracion'])} s: un video de "
             f"{num(cinta_src['dur'], 0)} s con ocho tramos de 2 s, y la ficha de al lado cambia con cada uno. Pasaron, en este orden: "
             f"{', '.join(ORDEN_CINTA[:-1])} y {ORDEN_CINTA[-1]}. Al bajar, el hilo de la portada se pausa solo.")

tm = mov["telefono-390"]
assert set(tm["fichas"]) >= set(ORDEN_CINTA), tm["fichas"]
t0 = tm["medidas"][0]
assert t0["portada"]["corre"] and t0["portada"]["src"] == "/v3/portada/hilo-960.webm" and not t0["punteroFino"]
en_cinta = next(m for m in tm["medidas"] if m["momento"] == "en la cinta")
assert en_cinta["cinta"]["corre"] and not en_cinta["portada"]["corre"]
pie_tel = (f"<code>/v3/</code> en un teléfono, 390 × 844 con dpr 2 y el dedo, {num(tm['duracion'])} s. La portada es una franja 16:9 "
           "con el hilo en su archivo de 960 px; debajo, la frase, el chequeo y la entradilla, en ese orden. Un deslizamiento con el "
           "dedo lleva a la cinta, que corre sus ocho tramos con el rótulo «nombre · tipo · año» encima.")

seccion_movimiento = f"""
<section id="movimiento" class="seccion" aria-labelledby="t-movimiento">
  <div class="seccion__lado"><p class="rotulo">2</p><h2 id="t-movimiento">La portada y la cinta, en movimiento</h2></div>
  <div class="seccion__cuerpo">
    <p class="nota">Grabadas del navegador sobre el build, con el aviso de cookies ya contestado y sin tocar el mouse (por eso no aparece el círculo del cursor). Los videos esperan a que les des play y corre uno a la vez.</p>
    {clip("portada-1440", 24, 2.0, 1440, "La portada de la home a 1440, grabada", pie_portada)}
    {clip("cinta-1440", 24, T_POSTER_CINTA, 1440, "La cinta de la home a 1440, grabada", pie_cinta)}
    {clip("telefono-390", 26, 12.0, 780, "La home en un teléfono, de la portada a la cinta, grabada", pie_tel, "clip--tel")}
  </div>
</section>"""

# ---------------------------------------------------------------- 3 · los seis casos
texto = leer_json(os.path.join(E12, "texto", "texto-obra.json"))
paginas = {p["id"]: p for p in texto["paginas"]}
CASOS = [  # el orden de «Siguiente» en el sitio (spec §2.3)
    ("combeau", "caso-combeau", "combeau", "real"),
    ("praxi", "caso-praxi", "praxi", "real"),
    ("sesenta", "caso-sesenta", "concepto.sesenta", "concepto"),
    ("ocelo", "caso-ocelo", "concepto.ocelo", "concepto"),
    ("doceavo", "caso-doceavo", "concepto.doceavo", "concepto"),
    ("tonela", "caso-tonela", "concepto.tonela", "concepto"),
]
CUIDA = {
    "combeau": "Una página con dos partes, la fotografía y el book de modelo. Sin sus medidas personales en ninguna imagen ni texto alternativo (Javiera midió 0 en su HTML).",
    "praxi": ("Nombra sus dos modelos con lo que hace cada uno, como lo dice la página: «Claude Haiku 4.5, un modelo de IA de Anthropic, "
              f"convierte esa frase en un registro ordenado» y «{e(sitio['praxi']['sonnet'].rstrip('.'))}». No enlaza a praxi.coach, no dice "
              "que está en pausa y su JSON-LD va sin <code>offers</code> ni <code>url</code>. Las pantallas internas van como hueco nombrado."),
    "concepto": "«Concepto» a la vista sin scroll en cualquier tamaño: Javiera lo midió en los cuatro conceptos a ocho anchos, con el aviso de cookies abierto y cerrado (64 de 64). Sin cifras de resultado ni testimonios; la marca es inventada y lo dice.",
}
assert "64 de 64" in v2 and "Combeau, 0 medidas en su HTML y sus `alt`" in v2


def elementos(pid):
    return {x["id"]: x for s in paginas[pid]["secciones"] for x in s.get("elementos", []) if "id" in x}


def primeras(n):
    p1440 = imagen(copia(os.path.join(PRIMERA, f"{n}-1440.jpg"), f"img/p-{n}-1440.jpg"), f"capturas/e12/primera/{n}-1440.jpg", "copia exacta de la captura de cierre de Mauro")
    p390 = imagen(copia(os.path.join(PRIMERA, f"{n}-390.jpg"), f"img/p-{n}-390.jpg"), f"capturas/e12/primera/{n}-390.jpg", "copia exacta de la captura de cierre de Mauro")
    for k in ("img/p-" + n + "-1440.jpg", "img/p-" + n + "-390.jpg"):
        detalle[k]["origen"] = os.path.relpath(os.path.join(PRIMERA, os.path.basename(k)[2:]), BASE)
    return p1440, p390


tarjetas = []
for clave, pid, pre, tipo in CASOS:
    el = elementos(pid)
    h1, ficha, cred = el[pre + ".h1"], el[pre + ".ficha"], el[pre + ".creditos"]
    ruta = paginas[pid]["ruta"]
    assert ruta == f"/v3/trabajo/{clave}/"
    campos = {c["rotulo"]: c["valor"] for c in ficha["campos"]}
    assert campos["Tipo"] == {"real": campos["Tipo"], "concepto": "Concepto"}[tipo]
    n = nombre(ruta)
    p1440, p390 = primeras(n)
    dl = "".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in campos.items() if k not in ("Tipo", "Año"))
    dl += f"<div><dt>Quién lo hizo</dt><dd>{e(cred['texto'])}</dd></div>"
    cuida = CUIDA[clave] if clave in CUIDA else CUIDA["concepto"]
    tarjetas.append(f"""
      <li class="caso" id="caso-{clave}">
        <div class="caso__cab">
          <p class="rotulo">{e(ficha['linea'])}</p>
          <h3 class="caso__h"><span class="t1">{e(h1['tinta'])}</span> <span class="t2">{e(h1['gris'])}</span></h3>
          <p class="nota">{e(paginas[pid]['description'])}</p>
        </div>
        <div class="par">
          {figura(p1440, f"{h1['tinta'].rstrip('.')}, primera pantalla a 1440", 'Primera pantalla a 1440 × 900', 'pantalla')}
          {figura(p390, f"{h1['tinta'].rstrip('.')}, primera pantalla a 390", 'A 390 × 844', 'pantalla pantalla--tel')}
        </div>
        <dl class="valores valores--chico">{dl}<div><dt>Las reglas que cumple</dt><dd>{cuida}</dd></div></dl>
        <p><a class="ir" href="#r-{n}">La página entera de {e(h1['tinta'].rstrip('.'))}, a 1440 y a 390</a></p>
      </li>""")

seccion_casos = f"""
<section id="casos" class="seccion" aria-labelledby="t-casos">
  <div class="seccion__lado"><p class="rotulo">3</p><h2 id="t-casos">Los seis casos</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Dos casos reales con página propia, Bernardo Combeau y Praxi, y cuatro conceptos rotulados.</span> <span class="t2">Van en el orden de «Siguiente» en el sitio. El texto de cada uno es el de Clara, tal cual.</span></p>
    <ol class="casos">{''.join(tarjetas)}</ol>
  </div>
</section>"""

# ---------------------------------------------------------------- 4 · las 27 rutas
tramos = leer_json(os.path.join(DATOS, "tramos.json"))
porancho = {a: {p["ruta"]: p for p in tramos[str(a)]["paginas"]} for a in (1440, 390)}
assert all(sorted(porancho[a]) == sorted(RUTAS) for a in (1440, 390))
bloques = []
for titulo_grupo, rutas_g in GRUPOS:
    items = []
    for r in rutas_g:
        n = nombre(r)
        p1440, p390 = primeras(n)
        t1440 = [imagen(t["img"], f"herramientas/tramos.py, de la captura de página entera a 1440 (px {t['desde']} a {t['hasta']})", "tramo de la página entera, JPEG 74") for t in porancho[1440][r]["tramos"]]
        t390 = [imagen(t["img"], f"herramientas/tramos.py, de la captura de página entera a 390 (px {t['desde']} a {t['hasta']})", "tramo de la página entera, JPEG 78") for t in porancho[390][r]["tramos"]]
        assert all(t["w"] == 1440 for t in t1440) and all(t["w"] == 390 for t in t390)
        tit = sitio["titulos"][r]
        alto = f"{miles(porancho[1440][r]['alto'])} px a 1440 · {miles(porancho[390][r]['alto'])} a 390"
        items.append(f"""
        <details class="ruta plegable" id="r-{n}">
          <summary><span class="ruta__cab"><code class="ruta__path">{e(r)}</code><span class="ruta__titulo">{e(tit)}</span><span class="rotulo">{alto}</span></span><span class="mas" aria-hidden="true"></span></summary>
          <div class="ruta__cuerpo">
            <div class="par">
              {figura(p1440, f'{r} a 1440: primera pantalla', 'Primera pantalla a 1440 × 900', 'pantalla')}
              {figura(p390, f'{r} a 390: primera pantalla', 'A 390 × 844', 'pantalla pantalla--tel')}
            </div>
            <div class="par par--visor">
              <div class="visor-caja"><p class="rotulo">Página entera a 1440 · baja dentro del marco</p>{visor(t1440, f'{r}, página entera a 1440', 'visor--1440')}</div>
              <div class="visor-caja visor-caja--tel"><p class="rotulo">A 390</p>{visor(t390, f'{r}, página entera a 390', 'visor--390')}</div>
            </div>
          </div>
        </details>""")
    bloques.append(f'<div class="grupo"><h3>{e(titulo_grupo)} <span class="cuenta">({len(rutas_g)})</span></h3>{"".join(items)}</div>')

seccion_rutas = f"""
<section id="rutas" class="seccion" aria-labelledby="t-rutas">
  <div class="seccion__lado"><p class="rotulo">4</p><h2 id="t-rutas">Las 27 rutas</h2></div>
  <div class="seccion__cuerpo">
    <p class="nota">Cada ruta a 1440 y a 390. La primera pantalla es la captura de cierre de Mauro, a 1,2 s de cargada, con los videos corriendo. La página entera la tomé hoy de nuevo, esperando a que cargara cada imagen, y baja dentro de su marco. En los casos y los artículos, la barra flotante aparece una sola vez, donde estaba al tomar la captura; en el navegador va pegada al pie de la ventana. Abre una ruta para verla.</p>
    {''.join(bloques)}
  </div>
</section>"""

# ---------------------------------------------------------------- 5 · lo que se desvió
spec = leer(os.path.join(V3, "spec-visual.md"))
s03 = seccion_md(spec, "0.3 · Desvíos registrados", "### ")
desvios_spec = []
for l in s03.splitlines():
    m = re.match(r"^(\d+)\. (.*)$", l)
    if m:
        desvios_spec.append([int(m.group(1)), m.group(2).strip()])
    elif desvios_spec and l.startswith("   ") and l.strip():
        desvios_spec[-1][1] += " " + l.strip()
assert [d[0] for d in desvios_spec] == list(range(1, 11)), [d[0] for d in desvios_spec]
lista_spec = []
for n_, t in desvios_spec:
    m = re.match(r"^\*\*(.+?)\*\*(.*)$", t)
    assert m, t
    lista_spec.append(f'<li><p class="t1">{md(m.group(1).rstrip("."))}</p><p class="t2">{md(m.group(2).strip().lstrip(",.:; "))}</p></li>')

# desvios.md, punto por punto. Cada resumen: (si se ve en el sitio, el resumen, cifras o frases que tienen que estar en su punto)
SE_VE, DENTRO = "Se ve en el sitio", "Por dentro"
RESUMEN = {
    ("Tanda 1", 1): (DENTRO, "Las cinco props del <code>Layout</code> que aprobaste, cada una con su valor de siempre por defecto: las páginas publicadas salieron iguales byte a byte. El cargo de Ramón en <code>#autor-ramon</code> es la propuesta de Simón y espera tu visto.", ["Ramón la confirme antes de publicar"]),
    ("Tanda 1", 2): (DENTRO, "Lenis no se puede dejar de cargar sin cambiar un archivo que comparten las páginas publicadas: queda cargado pero inerte, y la rueda es la nativa en toda la página. Se resuelve al publicar.", ["data-lenis-prevent"]),
    ("Tanda 1", 3): (DENTRO, "Motion queda fijo en 13.5.0; la librería que trae por dentro quedó en 13.5.1, fijada en el lock, así que el build se repite igual.", ["13.5.1"]),
    ("Tanda 1", 4): (SE_VE, "La cinta en VP9 a crf 36 para quedar bajo 1 MB, y el tramo de Tonela sale del recorrido que Bruno corrigió el 18-oct. Los dos tramos de Combeau, sin su línea de medidas.", ["976.539", "ninguna línea\n  de medidas"]),
    ("Tanda 1", 5): (DENTRO, "Ningún componente importa el <code>Layout</code>: si uno lo hace, el CSS de las páginas publicadas cambia de nombre. Cada página de A lo importa ella misma.", ["ningún componente importa el `Layout`"]),
    ("Tanda 1", 6): (DENTRO, "La lógica de A va en archivos que Tailwind no lee, para que ninguna palabra nueva sume una clase al CSS publicado.", ["src/scripts/archivo/*.mjs"]),
    ("Tanda 1", 7): (SE_VE, "Lo que la spec no fijaba (los espacios del encabezado, el anillo del cursor, la miga, la pausa, el aviso que confirma las cookies, que nada fijo tape el foco), resuelto con la escala de la spec y anotado uno por uno.", ["scroll-padding-top: 80px"]),
    ("Tanda 2", 1): (SE_VE, "En el muro, la portada de spindlelab.cl es la página de privacidad y no la home: la home lleva el hilo de oro, y el hilo va solo en la portada de <code>/v3/</code>. Queda para mí (sección 6).", ["**`/privacidad/`**"]),
    ("Tanda 2", 2): (SE_VE, "En «Cada pieza, con un dato medido», Praxi va con la captura de sus números (de ejemplo, y lo dice el pie), como pide la spec; el prototipo usaba la de las reglas.", ["praxi-numeros-169"]),
    ("Tanda 2", 3): (DENTRO, "El texto de Clara llega al sitio copiado por un script, sin una letra cambiada; el build se cae si un precio o un nombre no es igual al de los JSON de la oferta.", ["**el build se cae**"]),
    ("Tanda 2", 4): (SE_VE, "Lo que la spec no fijaba de la home (el título de la sección 4, los espacios de la portada, dónde va la nota de la cinta bajo 1194, los botones de servicios), con su porqué.", ["c10–c12"]),
    ("Tanda 2", 5): (SE_VE, "El muro sigue el orden de Clara también con el teclado y en el teléfono; un script reparte las piezas en las dos columnas, y al cargar la página se mueve poco (CLS de 0,027 como mucho).", ["0,027"]),
    ("Tanda 2", 6): (SE_VE, "El filtro con su conteo, y la línea mono del muro solo con tipo y año: los ingredientes no cabían.", ["cero cabe"]),
    ("Tanda 2", 7): (SE_VE, "La barra del índice, pegajosa desde 1194 y con la miga arriba; si no cabe, baja por dentro.", ["Desde 1194 es pegajosa"]),
    ("Tanda 2", 8): (DENTRO, "Title, description y JSON-LD de Simón. Las imágenes al compartir se hicieron en HTML con la letra y el negro de A, sin nada generado y sin el hilo.", ["nada generado, sin el hilo"]),
    ("Tanda 2", 9): (SE_VE, "El resultado vacío del chequeo ya no empuja el campo: el chequeo queda apoyado en la misma línea que la frase.", ["#chq-out:empty"]),
    ("Tanda 2", 10): (SE_VE, "La portada medida sobre los 121 cuadros del video en siete tamaños: ninguna línea bajo el mínimo, la peor a 5,31:1, y a 1440 × 900 el botón del chequeo queda a 108 px del borde.", ["5,31:1", "**a 108**"]),
    ("Tanda 2", 11): (SE_VE, "Campos de color medidos: la home 10,3 % (techo 20) y <code>/trabajo/</code> 26,6 % (techo 35).", ["**Home: 10,3 %**", "26,6 %"]),
    ("Tanda 2", 13): (SE_VE, "Un video por el que se pasaba rápido quedaba parado para siempre; quedó arreglado y comprobado.", ["AbortError"]),
    ("Tanda 3", 1): (SE_VE, "Bajo 834, el medio principal de los conceptos es una imagen quieta 4:5, la que eligió Bruno, sin video ni pausa; Combeau usa el recorrido del teléfono.", ["posterAngosto"]),
    ("Tanda 3", 2): (SE_VE, "Las filas de Praxi, reordenadas para cumplir las dos reglas de la spec: cada sección abre con una 16:9 y dos filas partidas nunca van seguidas.", ["las mismas nueve filas más el hueco"]),
    ("Tanda 3", 3): (SE_VE, "Combeau en las cuatro formas de Koto: la foto servida va en 4:5 junto a la portada de su sitio en un celular. Si la prefieres en 1:1, es una línea.", ["1:1"]),
    ("Tanda 3", 4): (SE_VE, "Los conceptos siguen el orden de su <code>caso.md</code>: Doceavo abre Solución con un par, y Tonela muestra a 390 la misma captura dos veces (sección 6).", ["se ve dos veces"]),
    ("Tanda 3", 5): (SE_VE, "«Siguiente» en el orden de la spec, con el póster del caso que sigue; el de Praxi es la captura de las reglas, porque su video tiene personas generadas.", ["`praxi-reglas-169`"]),
    ("Tanda 3", 6): (SE_VE, "La ficha, «Con qué está hecho», el punto del índice que se mueve a la sección activa, la barra flotante y el hueco punteado de Praxi, resueltos y anotados.", ["`--a-hueco`"]),
    ("Tanda 3", 7): (DENTRO, "El JSON-LD de Simón: Praxi sin <code>offers</code>, <code>url</code> ni <code>sameAs</code>; Combeau con sus dos partes; cada concepto con <code>genre</code> «Concepto».", ["**sin `offers`, `url` ni\n`sameAs`**"]),
    ("Tanda 3", 8): (SE_VE, "Campos de color de 18,9 a 30,2 % en los conceptos y 24,2 % en Combeau. Praxi queda en 6,1 %, bajo el piso, como la spec ya admite: su marca es oscura y de un solo acento.", ["**6,1 %**", "30,2 %", "18,9 %"]),
    ("Tanda 4", 1): (DENTRO, "Al reemplazar una página vieja, el CSS publicado perdía una clase; un archivo de guardia la conserva y producción sale igual byte a byte.", ["guardia-tailwind.ts"]),
    ("Tanda 4", 2): (SE_VE, "Las franjas de Visibilidad en IA y de Auditoría se veían borrosas a 1440; salen de la misma captura, a 1920 de ancho. Nada generado. (La de Auditoría salió después, en la QA.)", ["Nada se genera"]),
    ("Tanda 4", 3): (SE_VE, "El texto alternativo de la franja de Visibilidad en IA describe lo que la imagen muestra, el chequeo con el campo vacío, y no un resultado que no está.", ["**El archivo de la spec no tiene resultado:**"]),
    ("Tanda 4", 4): (SE_VE, "Lo que la spec no fijaba de la plantilla interior (el pie de la franja, las filas de <code>/servicios/</code>, la fase a la vista en Desarrollo web), con su porqué.", ["47,5 %"]),
    ("Tanda 4", 5): (SE_VE, "Los cinco servicios quedan con su texto de hoy, en la forma de A; cambia solo lo que Clara cambió.", ["«queda tal cual, desde su dato»"]),
    ("Tanda 4", 6): (DENTRO, "Title y description desde la copia de Clara; el grafo de hoy queda, y la FAQ de Desarrollo web marca solo las preguntas que se ven.", ["seis preguntas de Clara que se ven"]),
    ("Tanda 4", 7): (SE_VE, "Interiores: Desarrollo web con 3,5 % de campo (techo 5); las demás, 0 %.", ["**3,5 %**"]),
    ("Tanda 5", 1): (DENTRO, "Lo mismo que en la tanda 4, con seis clases; la guardia las conserva.", ["`.text-wrap`"]),
    ("Tanda 5", 2): (SE_VE, "Método, diagnóstico, nosotros y contacto: cambia lo que Clara listó y lo demás queda letra por letra. Los textos en primera persona de <code>/nosotros/</code> esperan tu lectura.", ["«queda con ajustes»"]),
    ("Tanda 5", 3): (SE_VE, "Lo que la spec no fijaba en esas páginas (el orden de la cabecera del método, la nota de la fase 01, los datos de cada fase, los botones), con su porqué.", ["La fase 01 es gratis."]),
    ("Tanda 5", 4): (SE_VE, "En los artículos, el índice marca la sección que pasó los 120 px de arriba.", ['data-linea="120"']),
    ("Tanda 5", 5): (DENTRO, "Cada precio a la vista está, como texto, en los JSON de la oferta; los artículos van tal cual, con los precios de terceros que citan.", ["`$590.000/mes`"]),
    ("Tanda 5", 6): (DENTRO, "Las señales de Simón en las doce rutas; ninguna FAQ marca una pregunta que no se vea.", ["Ninguna `FAQPage` marca una pregunta que\n  no se vea"]),
    ("Tanda 5", 7): (SE_VE, "Las doce páginas, con 0 % de campo.", ["**Las doce páginas, 0 % de campo**"]),
    ("Tanda 5", 10): (DENTRO, "El barrido final: las 27 rutas, ningún enlace roto entre ellas, ningún comentario servido, ninguna página con el CSS viejo y las maquetas fuera, con <code>noindex</code>.", ["**Ningún enlace interno roto entre las rutas de A:**"]),
    ("QA de obra", 1): (DENTRO, "La home vuelve a llevar sus fechas; <code>dateModified</code> la escribe el build, así que el HTML de <code>/v3/</code> cambia cada día aunque la página no cambie.", ["**la home saca 83**"]),
    ("QA de obra", 2): (SE_VE, "El tope de 493 px del texto, también en las filas de «Cada pieza» y la ayuda del chequeo. La línea «También: Paid Media…» lo pasa desde 1194: es el defecto 10.", ["con el tope **bajo 1194**"]),
    ("QA de obra", 3): (SE_VE, "Sin espera toda imagen que cae en la primera pantalla en algún tamaño: las cuatro primeras portadas del muro y el retrato del autor.", ['`loading="eager"`']),
    ("QA de obra", 4): (SE_VE, "Las áreas de toque del pie y de «Ver la original» sin pisarse. El arreglo corrió la de «Cookies» sobre la hora: es el defecto 9.", ["**el 100 % del\nárea es propia en los dos**"]),
    ("QA de obra", 5): (SE_VE, "«TONELA · CONCEPTO» en la barra flotante de los conceptos, y la barra sube 8 px sobre el aviso de cookies mientras está abierto.", ["«TONELA · CONCEPTO»"]),
    ("QA de obra", 6): (SE_VE, "Auditoría SEO técnica sin franja: queda como Acompañamiento mensual.", ["la página queda como Acompañamiento mensual"]),
    ("QA de obra", 7): (SE_VE, "Bajo 834 la portada se lee rótulo, frase, chequeo y entradilla; desde 834 el aviso de cookies va en una fila de 69 px.", ["Ahora mide 69 desde 834"]),
    ("QA de obra", 8): (SE_VE, "Los tres <code>title</code> de Clara, en mayúscula inicial.", ["`extraer-texto.mjs auditoria-seo-tecnica acompanamiento-mensual redes-sociales`"]),
}
SALTA = {  # (el comienzo del título, por qué no va como punto)
    "Lo que queda para": "lo junta Mauro en sus pendientes (sección 6)",
    "Lo verificado en esta": "la comprobación de cada tanda",
    "La página de prueba": "una página de prueba que se borró antes del commit",
}
desvios = leer(os.path.join(V3, "desvios.md"))
tandas = []
for bloque in re.split(r"\n(?=## )", desvios)[1:]:
    cab = bloque.splitlines()[0][3:]
    clave_t = "QA de obra" if cab.startswith("QA de obra") else re.match(r"Tanda \d", cab).group(0)
    puntos = re.split(r"\n(?=### )", bloque)[1:]
    filas, saltados = [], []
    for pt in puntos:
        m = re.match(r"### (\d+)\. (.+)", pt)
        assert m, pt[:80]
        k, tit = int(m.group(1)), m.group(2).strip()
        if (clave_t, k) in RESUMEN:
            donde, res, cifras = RESUMEN.pop((clave_t, k))
            for c in cifras:
                assert c in pt, (clave_t, k, c)
            filas.append(f'<li><p class="punto__cab"><span class="rotulo">{k}</span><span class="t1">{md(tit)}</span>'
                         f'<span class="chip{" chip--ve" if donde == SE_VE else ""}">{donde}</span></p><p class="t2">{res}</p></li>')
        else:
            assert any(tit.startswith(s) for s in SALTA), f"desvios.md, {clave_t} punto {k} sin resumen: {tit}"
            saltados.append(k)
    titulo_t = re.sub(r"\s*\((\d+)-oct-2026, ([^)]+)\)", r" · \1-oct, \2", cab)
    tandas.append((titulo_t, filas, saltados))
assert not RESUMEN, f"resúmenes sin su punto en desvios.md: {sorted(RESUMEN)}"
assert len(tandas) == 6, [t[0] for t in tandas]
total_puntos = sum(len(t[1]) for t in tandas)
se_ven = sum(f.count('chip--ve') for t in tandas for f in t[1])
bloques_desvios = "".join(
    f'<details class="plegable tanda"><summary><h4>{md(t)}</h4><span class="rotulo">{len(f)} puntos</span><span class="mas" aria-hidden="true"></span></summary>'
    f'<ol class="puntos">{"".join(f)}</ol></details>' for t, f, _ in tandas)

seccion_desvios = f"""
<section id="desvios" class="seccion" aria-labelledby="t-desvios">
  <div class="seccion__lado"><p class="rotulo">5</p><h2 id="t-desvios">Lo que se desvió</h2></div>
  <div class="seccion__cuerpo">
    <div class="bloque">
      <h3>Los desvíos que registra la spec</h3>
      <p class="nota">Diez decisiones que se apartan de Koto, del lock o del brief, cada una con su porqué (<code>spec-visual.md</code> §0.3). Un desvío que no está en esta lista es un defecto. El primero es el que autorizaste en la compuerta 2: el hilo de oro.</p>
      <ol class="desvios">{''.join(lista_spec)}</ol>
    </div>
    <div class="bloque">
      <h3>Lo que la construcción resolvió distinto, o la spec no cubría</h3>
      <p class="nota">Diego lo dejó escrito en <code>desvios.md</code>, tanda por tanda, con su porqué y la solución mínima. Aquí van sus {total_puntos} puntos, en una línea cada uno; {se_ven} se ven en el sitio y los demás son por dentro. Cada tanda cierra además con lo que verificó y lo que dejó para otros, que Mauro juntó en la sección 6.</p>
      {bloques_desvios}
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- 6 · lo que queda abierto (el cierre de Mauro)
pend = leer(os.path.join(V3, "pendientes-traspaso-revisados.md"))
p0 = seccion_md(pend, "0 · Al cierre de E12")
p01 = seccion_md(p0, "0.1 · Lo que E12 cerró", "### ")
p02 = seccion_md(p0, "0.2 · Antes de publicar", "### ")
p03 = seccion_md(p0, "0.3 · Declarado y abierto", "### ")
p04 = seccion_md(p0, "0.4 · Cuando haya plata o material", "### ")
p05 = seccion_md(p0, "0.5 · Para la troncal", "### ")
assert "**Cerrada el 19-oct, 11:44:** Ramón contestó «Sí, agrégalas»" in p01
insumos = leer(os.path.join(E12, "insumos-ramon-19oct.md"))
assert "## 5. La pregunta del Layout (spec §0.5), contestada el 19-oct a las 11:44 (Chile)" in insumos and "**«Sí, agrégalas (Recomendado)»**" in insumos
assert "**Ramón aprobó la propuesta de §0.5** («Sí, agrégalas»" in spec
filas02 = tabla_md(p02, "# | Qué", 4)
nums = [f[0] for f in filas02 if f[0]]
assert nums == [str(i) for i in range(1, 17)], nums
assert filas02[0][1].startswith("**Defecto 9 (menor):**") and filas02[1][1].startswith("**Defecto 10 (menor):**")
expres = next(f for f in filas02 if not f[0])
assert "exprés" in expres[1] and expres[2] == "**Javiera**"


def tarjeta_defecto(n):
    f = nuevos[n]
    return (f'<li class="defecto"><p class="defecto__cab"><span class="sello">Defecto {n}</span><span class="rotulo">{e(f[1])} · {e(f[2])}</span></p>'
            f'<dl class="valores valores--chico"><div><dt>Dónde</dt><dd>{md(f[3])}</dd></div><div><dt>Qué está mal</dt><dd>{md(f[4])}</dd></div>'
            f'<div><dt>Contra qué</dt><dd>{md(f[5])}</dd></div><div><dt>Cómo se cierra</dt><dd>{md(f[6])}</dd></div></dl></li>')


filas_resto = "".join(
    f'<tr><th scope="row" data-rotulo="#">{f[0]}</th><td data-rotulo="Qué">{md(f[1])}</td><td data-rotulo="Quién">{md(f[2])}</td>'
    f'<td data-rotulo="Cómo se da por cerrado">{md(f[3])}</td></tr>' for f in filas02 if f[0] and int(f[0]) >= 3)
abiertos03 = "".join(f"<li>{md(x)}</li>" for x in vinetas(p03))
abiertos04 = "".join(f"<li>{md(x)}</li>" for x in vinetas(p04))
abiertos05 = "".join(f"<li>{md(x)}</li>" for x in vinetas(p05))
assert len(vinetas(p03)) == 4 and len(vinetas(p04)) == 3 and len(vinetas(p05)) == 3

seccion_abierto = f"""
<section id="abierto" class="seccion" aria-labelledby="t-abierto">
  <div class="seccion__lado"><p class="rotulo">6</p><h2 id="t-abierto">Lo que queda abierto</h2></div>
  <div class="seccion__cuerpo">
    <p class="intro"><span class="t1">Primero, antes de publicar: los dos menores de Javiera.</span> <span class="t2">El 9 es de Diego. El 10 es mío: la spec se contradice y tengo que escribir cuál de las dos reglas manda.</span></p>
    <ol class="defectos">{tarjeta_defecto("9")}{tarjeta_defecto("10")}</ol>
    <p class="nota">Javiera comprueba los dos en exprés: {md(expres[3][0].lower() + expres[3][1:])}.</p>
    <div class="cerrada">
      <p class="rotulo">Ya contestada</p>
      <p><strong>La pregunta del <code>Layout</code>: sí, el 19-oct a las 11:44.</strong> Respondiste «Sí, agrégalas»: cinco props opcionales que solo pasa <code>/v3/</code> (Lenis, letras precargadas, <code>theme-color</code>, favicon y <code>#org</code>/<code>jobTitle</code>), cada una con el valor de antes por defecto. Las páginas publicadas salieron iguales byte a byte en cada tanda y en las dos vueltas de la QA, y gtag, el consentimiento y el Pixel no cambiaron. Registro: <code>spec-visual.md</code> §7, fila del 19-oct.</p>
    </div>
    <div class="tabla-envuelta">
      <table class="tabla tabla--pend">
        <caption class="rotulo">El resto de lo que va antes de publicar, cada uno con su dueño (Mauro, pendientes §0.2)</caption>
        <thead><tr><th scope="col">#</th><th scope="col">Qué</th><th scope="col">Quién</th><th scope="col">Cómo se da por cerrado</th></tr></thead>
        <tbody>{filas_resto}</tbody>
      </table>
    </div>
    <div class="dos-listas">
      <div><h3>Declarado y abierto, no frena publicar</h3><p class="nota">Casos que la spec no cubría y que Diego resolvió con la solución mínima. Esperan a Clara o a mí.</p><ul class="lista-larga">{abiertos03}</ul></div>
      <div><h3>Cuando haya plata o material</h3><p class="nota">No frenan nada. Nada se genera sin tu OK.</p><ul class="lista-larga">{abiertos04}</ul>
      <h3 class="h3--sep">Para la troncal</h3><ul class="lista-larga">{abiertos05}</ul></div>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- página
# Los tokens del tablero: los de A · Archivo (spec §1.1). Un solo tema, en negro: se declaran en :root y se repiten tal
# cual bajo los selectores de tema del publicador, como en el tablero de la compuerta 2, para que ningún visor los cambie.
TOKENS = """
    color-scheme: dark;
    --lienzo: #060606;
    --placa: #141414;
    --placa-activa: #202020;
    --blanco: #FFFFFF;
    --gris: #989898;
    --linea: rgba(255,255,255,.10);
    --linea-seccion: #2D2D2D;
    --borde: #707070;
    --f-texto: 'Google Sans Flex', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
    --f-mono: 'DM Mono', ui-monospace, Menlo, monospace;
  """
CSS = """
  /* Tablero de la obra en el lenguaje de A · Archivo: el lienzo #060606, la interfaz en gris y chica, Google Sans Flex
     liviana para lo grande y DM Mono 500 en mayúsculas para los rótulos; lo que ocupa la pantalla son las capturas.
     Sin acento: la interfaz de A no tiene color (spec §1.1). Desde 1194 px cada sección lleva su título en una barra de
     320 px, como el caso de Koto. Un solo tema a propósito: el sitio se juzga sobre su negro. Contraste AA medido
     (blanco 20,26:1 y gris 7,02:1 sobre el lienzo, 6,39:1 sobre la placa). */
  :root {""" + TOKENS + """}
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {""" + TOKENS + """}
  }
  @media (prefers-color-scheme: light) {
    :root:not([data-theme="dark"]) {""" + TOKENS + """}
  }
  :root[data-theme="dark"], :root[data-theme="light"] {""" + TOKENS + """}
"""
CSS += """  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body { margin: 0; background: var(--lienzo); color: var(--blanco); font: 400 16px/1.45 var(--f-texto); -webkit-font-smoothing: antialiased; }
  .marco { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 16px 64px; }
  h1, h2, h3, h4 { font-weight: 400; margin: 0; text-wrap: balance; }
  h1 { font-size: clamp(32px, 3.4vw, 48px); font-weight: 300; font-stretch: 76%; line-height: 1.04; letter-spacing: -.01em; max-width: 22ch; }
  h2 { font-size: clamp(26px, 2.4vw, 34px); font-weight: 300; font-stretch: 76%; line-height: 1.08; letter-spacing: -.005em; }
  h3 { font-size: clamp(20px, 1.6vw, 22px); line-height: 1.25; }
  h4 { font-size: 17px; line-height: 1.3; }
  p, ul, ol, dl, figure { margin: 0; }
  a { color: var(--blanco); text-underline-offset: 3px; }
  code { font-family: var(--f-mono); font-size: max(11px, .8em); letter-spacing: .01em; overflow-wrap: anywhere; }
  strong { font-weight: 500; color: var(--blanco); }
  em { font-style: italic; }
  :focus-visible { outline: 2px solid var(--blanco); outline-offset: 3px; }
  .rotulo { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  .rotulo code { font-size: 1em; text-transform: none; }
  .t1 { color: var(--blanco); }
  .t2 { color: var(--gris); }
  .intro { font-size: clamp(19px, 1.7vw, 23px); line-height: 1.3; max-width: 36em; text-wrap: pretty; }
  .nota { color: var(--gris); max-width: 68ch; font-size: 15px; }
  .nota strong, .nota code { color: var(--blanco); }
  .bloque { display: grid; gap: 14px; }
  .sello { display: inline-block; vertical-align: middle; border: 1px solid var(--blanco); border-radius: 2px; padding: 5px 8px; font: 500 11px/1 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--blanco); }

  /* cabecera */
  .cab { display: grid; gap: 20px; padding: 8px 0 40px; }
  .cab__fila { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; }
  .cab h1 .t2 { color: var(--gris); }
  .indice { display: flex; flex-wrap: wrap; gap: 0 20px; list-style: none; padding: 0; }
  .indice a { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--blanco); text-decoration: none; display: inline-block; padding: 14px 0; }
  .indice a:hover { text-decoration: underline; }

  /* secciones */
  .seccion { position: relative; border-top: 1px solid var(--linea-seccion); padding: 20px 0 64px; display: grid; gap: 24px; }
  .seccion__lado { display: grid; gap: 8px; align-content: start; }
  .seccion__cuerpo { display: grid; gap: 32px; min-width: 0; }
  @media (min-width: 1194px) {
    .seccion { grid-template-columns: 320px minmax(0, 1fr); gap: 16px; }
    .seccion__lado { position: sticky; top: 16px; align-self: start; padding-right: 24px; }
  }

  /* 1 · veredicto */
  .veredicto { display: grid; gap: 14px; }
  .hechos { list-style: none; padding: 0; border-top: 1px solid var(--linea-seccion); }
  .hechos li { display: grid; gap: 4px; padding: 12px 0; border-bottom: 1px solid var(--linea); color: var(--gris); }
  @media (min-width: 834px) { .hechos li { grid-template-columns: 140px minmax(0, 1fr); gap: 16px; } }
  .hechos li > span:last-child { min-width: 0; }

  /* figuras, pares y marcos */
  .fig { display: grid; gap: 8px; align-content: start; min-width: 0; }
  .fig img, .fig video { display: block; width: 100%; height: auto; border-radius: 6px; background: var(--placa); }
  .fig figcaption { font-size: 14px; line-height: 1.45; color: var(--gris); max-width: 72ch; }
  .fig figcaption code { color: var(--blanco); }
  .par { display: grid; gap: 16px; align-items: start; }
  @media (min-width: 834px) { .par { grid-template-columns: minmax(0, 3.3fr) minmax(0, 1fr); } }
  .pantalla--tel, .visor-caja--tel { max-width: 300px; }
  @media (min-width: 834px) { .pantalla--tel, .visor-caja--tel { max-width: none; } }
  .visor-caja { display: grid; gap: 8px; min-width: 0; }
  .visor { height: clamp(360px, 72vh, 820px); overflow-y: auto; overflow-x: hidden; border-radius: 6px; background: var(--placa); outline: 1px solid var(--linea); scrollbar-color: #4A4A4A var(--placa); }
  .visor img { display: block; width: 100%; height: auto; }
  .clip--tel { max-width: 300px; }
  @media (min-width: 834px) {
    .clip--tel { max-width: none; grid-template-columns: 300px minmax(0, 1fr); gap: 8px 20px; align-items: start; }
  }

  /* plegables */
  .plegable { border-top: 1px solid var(--linea-seccion); }
  .plegable > summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 56px; padding: 8px 0; cursor: pointer; }
  .plegable > summary::-webkit-details-marker { display: none; }
  .plegable > summary:hover .ruta__titulo, .plegable > summary:hover h4 { text-decoration: underline; text-underline-offset: 4px; }
  .mas { flex: none; width: 32px; height: 32px; border-radius: 4px; background: var(--placa); display: grid; place-items: center; }
  .mas::before { content: "+"; font: 500 16px/1 var(--f-mono); color: var(--blanco); }
  .plegable[open] > summary .mas::before { content: "\\2212"; }
  .plegable[open] { padding-bottom: 20px; }

  /* 3 · casos */
  .casos { list-style: none; padding: 0; display: grid; gap: 56px; }
  .caso { display: grid; gap: 16px; padding-top: 16px; border-top: 1px solid var(--linea-seccion); min-width: 0; }
  .caso__cab { display: grid; gap: 8px; max-width: 60em; }
  .caso__h { font-size: clamp(26px, 2.6vw, 36px); font-weight: 300; font-stretch: 76%; line-height: 1.08; }
  .valores { display: grid; border-top: 1px solid var(--linea-seccion); }
  .valores div { display: grid; gap: 4px; padding: 12px 0; border-bottom: 1px solid var(--linea); }
  .valores dt { font: 500 11px/1.4 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  .valores dd { margin: 0; color: var(--gris); max-width: 72ch; min-width: 0; }
  .valores dd code { color: var(--blanco); }
  @media (min-width: 834px) { .valores div { grid-template-columns: 180px minmax(0, 1fr); gap: 16px; } }
  .valores--chico dd { font-size: 15px; }
  .ir { display: inline-block; padding: 12px 0; font-size: 15px; }

  /* 4 · rutas */
  .grupo { display: grid; gap: 0; }
  .grupo > h3 { padding-bottom: 12px; }
  .cuenta { color: var(--gris); }
  .ruta__cab { flex: 1 1 auto; display: grid; gap: 4px 16px; min-width: 0; }
  @media (min-width: 834px) { .ruta__cab { grid-template-columns: minmax(0, 15em) minmax(0, 1fr) auto; align-items: baseline; } }
  .ruta__path { font-size: 13px; color: var(--blanco); }
  .ruta__titulo { color: var(--gris); font-size: 15px; min-width: 0; }
  .ruta__cuerpo { display: grid; gap: 16px; }

  /* 5 · desvíos */
  .desvios { list-style: none; padding: 0; counter-reset: d; display: grid; border-top: 1px solid var(--linea-seccion); }
  .desvios li { counter-increment: d; display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 4px 8px; padding: 14px 0; border-bottom: 1px solid var(--linea); }
  .desvios li::before { content: counter(d); font: 500 11px/2 var(--f-mono); color: var(--gris); grid-row: span 2; }
  .desvios .t1 { font-size: 17px; line-height: 1.35; }
  .desvios .t2, .puntos .t2 { font-size: 15px; max-width: 72ch; }
  .tanda > summary h4 { flex: 1 1 auto; min-width: 0; }
  .tanda > summary .rotulo { flex: none; }
  .puntos { list-style: none; padding: 0; display: grid; }
  .puntos li { display: grid; gap: 6px; padding: 14px 0; border-top: 1px solid var(--linea); }
  .punto__cab { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 12px; }
  .punto__cab .t1 { flex: 1 1 24em; min-width: 0; }
  .chip { flex: none; font: 500 11px/1 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); border: 1px solid var(--linea-seccion); border-radius: 2px; padding: 4px 6px; }
  .chip--ve { color: var(--blanco); border-color: var(--borde); }

  /* 6 · abierto */
  .defectos { list-style: none; padding: 0; display: grid; gap: 16px; }
  @media (min-width: 1194px) { .defectos { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .defecto { display: grid; gap: 12px; align-content: start; padding: 16px; border-radius: 4px; background: var(--placa); min-width: 0; }
  .defecto__cab { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
  .defecto .valores div { grid-template-columns: none; }
  .cerrada { display: grid; gap: 8px; padding: 16px 0; border-top: 1px solid var(--linea-seccion); border-bottom: 1px solid var(--linea-seccion); color: var(--gris); max-width: 80ch; }
  .dos-listas { display: grid; gap: 28px; }
  @media (min-width: 1194px) { .dos-listas { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .dos-listas > div { display: grid; gap: 12px; align-content: start; min-width: 0; }
  .h3--sep { padding-top: 16px; }
  .lista-larga { padding-left: 20px; display: grid; gap: 10px; color: var(--gris); max-width: 72ch; font-size: 15px; }
  .lista-larga strong, .lista-larga code { color: var(--blanco); }

  /* tablas */
  .tabla-envuelta { max-width: 100%; }
  .tabla { border-collapse: collapse; width: 100%; font-size: 15px; }
  .tabla caption { text-align: left; padding-bottom: 10px; }
  .tabla th, .tabla td { text-align: left; padding: 10px 12px 10px 0; border-bottom: 1px solid var(--linea); vertical-align: top; }
  .tabla thead th { font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); border-bottom: 1px solid var(--linea-seccion); }
  .tabla tbody th { font: 500 13px/1.5 var(--f-mono); color: var(--blanco); width: 40px; }
  .tabla td { color: var(--gris); }
  .tabla td strong, .tabla td code { color: var(--blanco); }
  @media (min-width: 834px) { .tabla--pend td:nth-child(3) { width: 180px; } .tabla--ocho td:last-child { width: 45%; } }
  @media (max-width: 833px) {
    .tabla thead { display: none; }
    .tabla tr { display: grid; gap: 6px; padding: 12px 0; border-bottom: 1px solid var(--linea); }
    .tabla th, .tabla td { border: 0; padding: 0; width: auto; }
    .tabla td::before { content: attr(data-rotulo); display: block; font: 500 11px/1.3 var(--f-mono); letter-spacing: .03em; text-transform: uppercase; color: var(--gris); }
  }
  .pie { border-top: 1px solid var(--linea-seccion); padding-top: 16px; color: var(--gris); font-size: 14px; display: grid; gap: 6px; max-width: 90ch; }
  .pie code { color: var(--blanco); }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
"""

JS = r"""
(function () {
  // La hora de Santiago con su huso, calculada en tu navegador: el mismo dato que lleva el encabezado del sitio
  function hora() {
    var ahora = new Date();
    var h = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false }).format(ahora);
    var huso = '';
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', timeZoneName: 'shortOffset' }).formatToParts(ahora)
        .forEach(function (x) { if (x.type === 'timeZoneName') huso = x.value.replace('GMT', 'UTC'); });
    } catch (err) { huso = ''; }
    document.querySelectorAll('.reloj').forEach(function (n) { n.textContent = h; });
    if (huso) document.querySelectorAll('.huso').forEach(function (n) { n.textContent = huso; });
  }
  hora();
  setInterval(hora, 15000);
  // Un video a la vez: al dar play a uno, los demás se pausan
  var videos = [].slice.call(document.querySelectorAll('video'));
  videos.forEach(function (v) {
    v.addEventListener('play', function () { videos.forEach(function (o) { if (o !== v && !o.paused) o.pause(); }); });
  });
  // Un enlace a una ruta abre su plegable
  function abrir() {
    var id = decodeURIComponent((location.hash || '').slice(1));
    var d = id && document.getElementById(id);
    if (d && d.tagName === 'DETAILS') d.open = true;
  }
  window.addEventListener('hashchange', abrir);
  document.querySelectorAll('a.ir').forEach(function (a) {
    a.addEventListener('click', function () {
      var d = document.getElementById(a.getAttribute('href').slice(1));
      if (d) d.open = true;
    });
  });
  abrir();
})();
"""

pagina = f"""<meta charset="utf-8">
<title>Obra E12 construida</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FUENTES}">
<style>{CSS}</style>
<div class="marco">
  <header class="cab">
    <div class="cab__fila">
      <p class="rotulo">SpindleLab v3 · E12 · la obra construida · {FECHA}</p>
      <p class="rotulo">Santiago <span class="reloj">--:--</span> <span class="huso">UTC-3</span></p>
    </div>
    <h1><span class="t1">A · Archivo, construida.</span> <span class="t2">Las 27 rutas de /v3/, como quedaron después de la QA.</span></h1>
    <p class="intro"><span class="t1">Javiera cerró la QA con reparos: los ocho defectos de la primera vuelta están cerrados y quedan dos menores, el 9 y el 10, que se cierran antes de publicar.</span> <span class="t2">Todo lo que ves sale del build del 23-oct, en capturas y grabaciones sin retoque. Nada está publicado y /v3/ sigue con noindex.</span></p>
    <nav aria-label="Secciones del tablero"><ul class="indice">
      <li><a href="#veredicto">1 · El veredicto</a></li><li><a href="#movimiento">2 · En movimiento</a></li><li><a href="#casos">3 · Los seis casos</a></li>
      <li><a href="#rutas">4 · Las 27 rutas</a></li><li><a href="#desvios">5 · Lo que se desvió</a></li><li><a href="#abierto">6 · Lo que queda abierto</a></li>
    </ul></nav>
  </header>
  <main>
    {seccion_veredicto}
    {seccion_movimiento}
    {seccion_casos}
    {seccion_rutas}
    {seccion_desvios}
    {seccion_abierto}
  </main>
  <footer class="pie">
    <p>Armado por <code>tableros/e12-obra/herramientas/armar-tablero.py</code> desde el acta de Javiera, los pendientes de cierre de Mauro, la spec (§0.3 y §7), <code>desvios.md</code>, el texto de Clara y las capturas y grabaciones de la obra. Verificado con <code>herramientas/verificar.mjs</code> a 360, 390, 768 y 1440.</p>
    <p>Las primeras pantallas son las de cierre de Mauro (<code>capturas/e12/primera/</code>), tal cual. Las páginas enteras las tomé de nuevo (<code>herramientas/capturar-completa.mjs</code>, su método más la espera a que cargue cada imagen): las suyas a 1440 están a la mitad del ancho, y en la de Sesenta a 390 una imagen no alcanzó a cargar (una placa vacía de 390 × 224 a los 4.480 px). Lo demás coincide, salvo los cuadros de los videos.</p>
    <p>Un solo tema, a propósito: el tablero va en negro también si tu visor está en claro, porque el sitio se juzga sobre su lienzo.</p>
  </footer>
</div>
<script>{JS}</script>
"""

# ---------------------------------------------------------------- comprobaciones del contrato antes de escribir
visible = re.sub(r"<style>.*?</style>|<script.*?</script>", "", pagina, flags=re.S)
assert pagina.count("<h1") == 1
assert "<!--" not in pagina, "sin comentarios HTML"
assert "—" not in visible, "sin raya en el texto"
assert not re.search(r"<!doctype|<(html|head|body)[\s>]", pagina, flags=re.I)
assert re.search(r"<title>(\S+ ){1,3}\S+</title>", pagina)
assert 'href="https://praxi' not in pagina and 'href="http://praxi' not in pagina, "ningún enlace a praxi.coach"
assert not re.findall(r'<script src="', pagina), "sin scripts externos"
for href in re.findall(r'<link rel="stylesheet" href="([^"]+)"', pagina):
    assert href.startswith("https://fonts.googleapis.com/"), href
for prohibido in ("54 → 94", "36 → 73", "IA propietaria", "modelos RAG", "despliegue de modelos"):
    assert prohibido not in visible, prohibido
for vacio in re.findall(r'href="#([^"]*)"', pagina):
    assert vacio and f'id="{vacio}"' in pagina, f"enlace a #{vacio} sin destino"

rutas = sorted(set(re.findall(r'(?:src|poster)="((?:img|video)/[^"]+)"', pagina)))
for r in rutas:
    assert os.path.exists(os.path.join(BASE, r)), r
    t = os.path.getsize(os.path.join(BASE, r))
    if r.startswith("img/"):
        assert r.endswith(".jpg") and t <= MAX_IMG, (r, t)
    else:
        assert t <= MAX_VIDEO, (r, t)
sin_detalle = [r for r in rutas if r not in detalle]
assert not sin_detalle, sin_detalle
sobran = sorted((set(f"img/{f}" for f in os.listdir(IMG)) | set(f"video/{f}" for f in os.listdir(VIDEO))) - set(rutas))
assert not sobran, f"archivos en img/ o video/ que el tablero no usa: {sobran}"
bytes_pagina = len(pagina.encode("utf-8"))
total_bytes = bytes_pagina + sum(os.path.getsize(os.path.join(BASE, r)) for r in rutas)
assert bytes_pagina <= MAX_PAGINA, bytes_pagina
if total_bytes > MAX_TOTAL or len(rutas) + 1 > MAX_ARCHIVOS:
    sys.exit(f"el tablero con sus archivos suma {total_bytes} bytes en {len(rutas) + 1} archivos: pasa de 60 MB o de 250 archivos")

with open(os.path.join(BASE, "tablero.html"), "w", encoding="utf-8") as f:
    f.write(pagina)
archivos = {
    "pagina": "tablero.html",
    "armadoPor": "herramientas/armar-tablero.py",
    "rutas": rutas,
    "detalle": [{"ruta": r, "bytes": os.path.getsize(os.path.join(BASE, r)), **detalle[r]} for r in rutas],
    "imagenes": sum(1 for r in rutas if r.startswith("img/")),
    "videos": sum(1 for r in rutas if r.startswith("video/")),
    "archivos": len(rutas) + 1,
    "bytesPagina": bytes_pagina,
    "bytesTotal": total_bytes,
    "unidad": "bytes; kB = 1.000 y MB = 1.000.000",
}
with open(os.path.join(BASE, "archivos.json"), "w", encoding="utf-8") as f:
    json.dump(archivos, f, ensure_ascii=False, indent=1)
    f.write("\n")
mayor_img = max(os.path.getsize(os.path.join(BASE, r)) for r in rutas if r.startswith("img/"))
mayor_vid = max(os.path.getsize(os.path.join(BASE, r)) for r in rutas if r.startswith("video/"))
print(f"tablero.html {bytes_pagina} bytes · {archivos['imagenes']} imágenes y {archivos['videos']} videos ({archivos['archivos']} archivos con la página) · "
      f"total {total_bytes / 1e6:.2f} MB · la imagen mayor {mayor_img / 1e3:.0f} kB · el video mayor {mayor_vid / 1e6:.2f} MB · "
      f"desvíos.md: {total_puntos} puntos ({se_ven} se ven)")
