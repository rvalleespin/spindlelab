"""E12 · logo · arma las tres láminas (1920 × 1080) y la página del menú, en HTML, desde construccion.json.

Uso:  python3 -I armar-laminas.py <dir-logo>
Después: node render.mjs <dir-logo>   (las rasteriza y saca las capturas del menú y los favicon en PNG)

Cada lámina: el wordmark grande en A y en B; el menú del sitio a 1440 (los primeros 860 px, a tamaño real) y a
390, sobre el lienzo negro (#060606) y sobre blanco; el favicon a 16 y 32 px reales, en una pestaña oscura y
una clara, y el de 16 ampliado por 6 para ver sus píxeles; el porqué en tres líneas, lo que toma de la
referencia y la letra con su licencia. El menú sigue el lock (§6.3, §11, §20.2): rótulos en DM Mono 500 de 11 px
en mayúsculas con +0,03em, blanco al 70 % sobre negro; la hora del visitante con su huso, calculada al abrir.
Los textos del menú son los de Clara (`e12/texto/texto-paso2.json`, comun.nav).
"""
import html
import json
import os
import sys

LOGO = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
LAM = os.path.join(LOGO, "laminas")
os.makedirs(LAM, exist_ok=True)
REG = json.load(open(os.path.join(LOGO, "construccion.json")))
TEXTO = json.load(open(os.path.join(LOGO, "..", "texto", "texto-paso2.json")))
NAV = [n["texto"] for n in TEXTO["comun"]["nav"]]

DIRS = {"A": "A · Archivo · Google Sans Flex", "B": "B · Banco · Mona Sans"}

CAMINOS = [
    {
        "clave": "camino-1-la-palabra",
        "n": 1,
        "nombre": "La palabra",
        "difiere": "Construcción: ninguna. Es el nombre compuesto en la letra de la dirección, sin un trazo dibujado.",
        "porque": [
            "El nombre en la letra del sitio y nada más, como Accept & Proceed: su logo es su nombre en la letra de su menú, en el único peso de la casa.",
            "Cambia con la dirección (Google Sans Flex en A, Mona Sans en B, las dos a 430) y deja que la forma la ponga el trabajo.",
            "Es el más seguro y el que menos dice: a 16 px queda una «S» que podría ser de cualquiera.",
        ],
        "referencia": "De A&P toma que el logo sea la letra de la casa en un solo peso; no toma su letra (Messina es comercial) ni su favicon, que allí es otro signo.",
        "favicon": "La «S» de la palabra, sola.",
        "favicons": ["favicon-A.svg", "favicon-B.svg"],
    },
    {
        "clave": "camino-2-el-huso",
        "n": 2,
        "nombre": "El huso",
        "difiere": "Un signo propio: la «i» se vuelve un huso, la vara que atraviesa la tortera.",
        "porque": [
            "Spindle es huso: la «i» de la palabra es uno, la vara que atraviesa el disco y asoma arriba, donde iba el punto.",
            "Una idea hecha con una letra, como la cara que Koto esconde en su nombre, y más pesada que la interfaz, como la de ellos.",
            "A 16 px queda el huso solo, un signo y no una letra; si se lee como alfiler o como seta, la idea se pierde, y aquí se ve si pasa.",
        ],
        "referencia": "De Koto toma la idea hecha con las letras del nombre, el logo más pesado que el texto y el favicon que es un trozo del logo; no toma su cara, su letra redonda ni su amarillo.",
        "favicon": "El huso solo, dibujado en una retícula de 32: a 16 px, vara de 2 px y tortera de 8 × 5 px.",
        "favicons": ["favicon.svg"],
    },
    {
        "clave": "camino-3-dos-cortes",
        "n": 3,
        "nombre": "Dos cortes",
        "difiere": "Construcción en dos letras: Spindle en la sans de la dirección y LAB en DM Mono, en mayúsculas a la altura de la x.",
        "porque": [
            "Spindle en la letra de la dirección y LAB en la mono del sitio, como un rótulo: las dos voces del sitio dentro del nombre.",
            "Koto usa una letra en tres cortes; aquí son dos, y la mitad en DM Mono no cambia si cambia la dirección, porque A y B la comparten.",
            "A 16 px queda una «S» con una «L» chica; el riesgo es que LAB se lea como el sufijo de cualquier marca de tecnología.",
        ],
        "referencia": "De Koto toma el sistema de una letra en cortes, con la mono como voz de los datos; no toma su letra ni su logo.",
        "favicon": "La «S» de la sans y la «L» de la mono a la altura de su x, como en la palabra.",
        "favicons": ["favicon-A.svg", "favicon-B.svg"],
    },
]

CSS = """
@font-face { font-family: 'DM Mono'; font-weight: 500; font-style: normal;
  src: url('../fuentes/dm-mono-500-latin.woff2') format('woff2'); }
:root { --lienzo: #060606; --placa: #141414; --placa-activa: #202020; --blanco: #FFFFFF; --gris: #989898;
  --linea-seccion: #2D2D2D; --linea: rgba(255,255,255,.10); }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--lienzo); color: var(--blanco); }
body { font-family: 'DM Mono', monospace; font-weight: 500; -webkit-font-smoothing: antialiased; }
.rot { font-size: 13px; line-height: 1; text-transform: uppercase; letter-spacing: .03em; color: var(--gris); }
.rot b { color: var(--blanco); font-weight: 500; }
/* el menú, como en el sitio */
.nav { position: relative; display: flex; align-items: center; overflow: hidden; }
.nav.negro { background: var(--lienzo); }
.nav.blanco { background: #FFFFFF; }
.nav .logo { display: block; height: 24px; width: auto; flex: none; }
.nav ul { list-style: none; display: flex; gap: 36px; margin-left: 60px; }
.nav li, .nav .hora, .nav .menu { font-size: 11px; line-height: 1; text-transform: uppercase; letter-spacing: .03em; white-space: nowrap; }
.nav.negro li, .nav.negro .hora, .nav.negro .menu { color: rgba(255,255,255,.7); }
.nav.blanco li, .nav.blanco .hora, .nav.blanco .menu { color: rgba(6,6,6,.7); }
.nav .hora { margin-left: auto; }
.nav.ancho-1440 { height: 80px; padding: 0 16px; }
.nav.ancho-390 { height: 72px; padding: 0 16px; justify-content: space-between; }
.nav.ancho-390 .menu { margin-left: auto; }
"""

HORA_JS = """
<script>
(function () {
  // la hora del visitante con su huso (lock §11): se calcula al abrir, no hay hora escrita a mano
  var d = new Date();
  var hh = String(d.getHours()).padStart(2, '0'), mm = String(d.getMinutes()).padStart(2, '0');
  var off = -d.getTimezoneOffset() / 60;
  var huso = 'UTC' + (off >= 0 ? '+' : '') + (Number.isInteger(off) ? off : off.toFixed(1));
  document.querySelectorAll('.hora').forEach(function (e) { e.textContent = hh + ':' + mm + ' ' + huso; });
})();
</script>
"""


def nav_html(clave, dirx, fondo, ancho, recorte=None):
    color = "blanco" if fondo == "negro" else "negro"      # wordmark blanco sobre negro, negro sobre blanco
    src = f"../{clave}/{clave}-{dirx}-{color}.svg"
    estilo = f' style="width:{recorte}px"' if recorte else ""
    if ancho == 1440:
        items = "".join(f"<li>{html.escape(t)}</li>" for t in NAV)
        cuerpo = f'<img class="logo" src="{src}" alt="SpindleLab"><ul>{items}</ul><span class="hora">--:--</span>'
    else:
        cuerpo = f'<img class="logo" src="{src}" alt="SpindleLab"><span class="menu">Menú</span>'
    return f'<div class="nav {fondo} ancho-{ancho}"{estilo}>{cuerpo}</div>'


def coma(v, n=3):
    return f"{v:.{n}f}".replace(".", ",")


def lamina(c):
    clave = c["clave"]
    reg = REG["caminos"][clave]
    grandes = ""
    for dirx in ("A", "B"):
        r = reg[dirx]
        inst = r["instancia"]
        corte = f"wght {inst.get('wght')}" + (f" · wdth {inst.get('wdth')}" if "wdth" in inst else "") + (f" · opsz {inst['opsz']}" if "opsz" in inst else "")
        extra = " + DM Mono 500 en «LAB»" if clave == "camino-3-dos-cortes" else ""
        grandes += f"""
      <figure class="grande">
        <img src="../{clave}/{clave}-{dirx}-blanco.svg" alt="SpindleLab, camino {c['n']}, dirección {dirx}">
        <figcaption class="rot"><b>{DIRS[dirx]}</b> · {corte}{extra} · asta {coma(r['astaSobreMayuscula'])} de la mayúscula</figcaption>
      </figure>"""
    navs = ""
    for dirx in ("A", "B"):
        navs += f"""
      <section class="col">
        <p class="rot"><b>{DIRS[dirx]}</b> · menú a 1440, primeros 860 px · tamaño real · logo a 24 px</p>
        {nav_html(clave, dirx, 'negro', 1440, 860)}
        {nav_html(clave, dirx, 'blanco', 1440, 860)}
      </section>"""
    tel = "".join(f"""
      <section class="col">
        <p class="rot"><b>{DIRS[dirx]}</b> · menú a 390 · tamaño real · sobre negro y sobre blanco</p>
        <div class="par">{nav_html(clave, dirx, 'negro', 390, 390)}{nav_html(clave, dirx, 'blanco', 390, 390)}</div>
      </section>""" for dirx in ("A", "B"))
    favs = ""
    for f in c["favicons"]:
        etiqueta = {"favicon-A.svg": "A", "favicon-B.svg": "B", "favicon.svg": "A y B"}[f]
        base = f[:-4]
        favs += f"""
        <div class="fav">
          <div class="fila">
            <div class="tabs">
              <div class="tab oscura"><img src="../{clave}/{f}" width="16" height="16" alt=""><span>SpindleLab · Estudio de diseño y tecnología</span></div>
              <div class="tab clara"><img src="../{clave}/{f}" width="16" height="16" alt=""><span>SpindleLab · Estudio de diseño y tecnología</span></div>
            </div>
            <img src="../{clave}/{f}" width="32" height="32" alt="">
            <img src="../{clave}/{base}-16.png" width="80" height="80" class="pix" alt="">
          </div>
          <p class="rot">Favicon {etiqueta} · 16 y 32 px reales · el de 16 ampliado ×5</p>
        </div>"""
    porque = "".join(f"<li>{html.escape(l)}</li>" for l in c["porque"])
    licencias = []
    for dirx in ("A", "B"):
        licencias.append(f"{reg[dirx]['letra']}: {reg[dirx]['licencia'].split(' · fuentes/')[0]}")
    if clave == "camino-3-dos-cortes":
        licencias.append(f"DM Mono 500: {reg['A']['letraLab']['licencia'].split(' · fuentes/')[0]}")
    lic = "".join(f"<li>{html.escape(l)}</li>" for l in licencias)
    return f"""<!doctype html>
<html lang="es-CL">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1920">
<title>Logo, camino {c['n']}: {html.escape(c['nombre'])}</title>
<style>{CSS}
body {{ width: 1920px; height: 1080px; overflow: hidden; position: relative; }}
header.top {{ position: absolute; left: 64px; right: 64px; top: 48px; display: flex; justify-content: space-between; }}
.heroe {{ position: absolute; left: 64px; top: 104px; width: 1060px; display: flex; flex-direction: column; gap: 34px; }}
.grande img {{ display: block; height: 150px; width: auto; }}
.grande figcaption {{ margin-top: 14px; }}
aside {{ position: absolute; left: 1184px; right: 64px; top: 104px; }}
aside h1 {{ font-size: 13px; line-height: 1; letter-spacing: .03em; text-transform: uppercase; color: var(--gris); font-weight: 500; }}
aside .nombre {{ font-size: 36px; line-height: 1.05; letter-spacing: -.01em; margin-top: 12px; }}
aside .difiere {{ font-size: 14px; line-height: 1.45; color: var(--gris); margin-top: 10px; }}
aside ol {{ list-style: none; margin-top: 18px; display: grid; gap: 8px; counter-reset: l; }}
aside ol li {{ font-size: 15px; line-height: 1.42; padding-left: 26px; position: relative; counter-increment: l; }}
aside ol li::before {{ content: counter(l); position: absolute; left: 0; color: var(--gris); }}
aside .ref {{ font-size: 13px; line-height: 1.45; color: var(--gris); margin-top: 14px; }}
.favs {{ position: absolute; left: 1184px; right: 64px; top: 494px; display: flex; gap: 24px; }}
.fav {{ display: grid; gap: 8px; }}
.fav .rot {{ font-size: 11px; }}
.fila {{ display: flex; align-items: flex-end; gap: 12px; }}
.tabs {{ display: grid; gap: 6px; }}
.tab {{ width: 176px; height: 30px; display: flex; align-items: center; gap: 8px; padding: 0 10px; border-radius: 8px 8px 0 0; overflow: hidden; }}
.tab img {{ flex: none; }}
.tab span {{ font-family: system-ui, sans-serif; font-weight: 400; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }}
.tab.oscura {{ background: #35363a; }} .tab.oscura span {{ color: #e8eaed; }}
.tab.clara {{ background: #f1f3f4; }} .tab.clara span {{ color: #202124; }}
.pix {{ image-rendering: pixelated; outline: 1px solid var(--linea); }}
.navs {{ position: absolute; left: 64px; right: 64px; top: 624px; display: grid; grid-template-columns: 860px 860px; justify-content: space-between; row-gap: 18px; }}
.col {{ display: grid; gap: 8px; align-content: start; }}
.nav {{ outline: 1px solid var(--linea); }}
.par {{ display: flex; gap: 16px; }}
footer.pie {{ position: absolute; left: 64px; right: 64px; bottom: 36px; display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; }}
footer.pie ul {{ list-style: none; font-size: 12px; line-height: 1.5; color: var(--gris); }}
footer.pie .rot {{ font-size: 11px; text-align: right; line-height: 1.5; }}
</style>
</head>
<body>
  <header class="top">
    <p class="rot"><b>E12 · Logo de SpindleLab</b> · camino {c['n']} de 3</p>
    <p class="rot">Compuerta 2 · borrador para Ramón · 17-oct-2026</p>
  </header>
  <main>
    <div class="heroe">{grandes}
    </div>
    <aside>
      <h1>Camino {c['n']}</h1>
      <p class="nombre">{html.escape(c['nombre'])}</p>
      <p class="difiere">{html.escape(c['difiere'])}</p>
      <ol>{porque}</ol>
      <p class="ref">{html.escape(c['referencia'])}</p>
    </aside>
    <div class="favs">{favs}
    </div>
    <div class="navs">{navs}
{tel}
    </div>
  </main>
  <footer class="pie">
    <ul>{lic}</ul>
    <p class="rot">Trazados a mano en SVG desde letras libres, sin letra cargada · e12/logo/construccion.json<br>Monocromo: blanco sobre #060606 y #060606 sobre blanco · sin oro, sin Gabarito</p>
  </footer>
{HORA_JS}
</body>
</html>
"""


def pagina_menu():
    """Una página con el menú a ancho real, para las capturas de 1440 y 390 (render.mjs le pasa el camino,
    la dirección, el ancho y el fondo por la URL)."""
    caminos = json.dumps({c["clave"]: c["n"] for c in CAMINOS})
    items = "".join(f"<li>{html.escape(t)}</li>" for t in NAV)
    return f"""<!doctype html>
<html lang="es-CL">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Menú del sitio con el logo</title>
<style>{CSS}
body {{ min-height: 100vh; }}
body.blanco {{ background: #FFFFFF; }}
</style>
</head>
<body>
  <div id="nav"></div>
<script>
(function () {{
  var q = new URLSearchParams(location.search);
  var clave = q.get('camino'), dir = q.get('dir'), fondo = q.get('fondo') || 'negro';
  var ancho = window.innerWidth >= 834 ? 1440 : 390;
  var color = fondo === 'negro' ? 'blanco' : 'negro';
  if (!({caminos})[clave] || !/^[AB]$/.test(dir)) {{ document.body.textContent = 'falta ?camino=…&dir=A|B'; return; }}
  document.body.className = fondo;
  var src = '../' + clave + '/' + clave + '-' + dir + '-' + color + '.svg';
  var cuerpo = '<img class="logo" src="' + src + '" alt="SpindleLab">' +
    (ancho === 1440 ? '<ul>{items}</ul><span class="hora">--:--</span>' : '<span class="menu">Menú</span>');
  document.getElementById('nav').outerHTML = '<div class="nav ' + fondo + ' ancho-' + ancho + '">' + cuerpo + '</div>';
}})();
</script>
{HORA_JS}
</body>
</html>
"""


def main():
    for c in CAMINOS:
        with open(os.path.join(LAM, f"{c['clave']}.html"), "w") as fh:
            fh.write(lamina(c))
    with open(os.path.join(LAM, "menu.html"), "w") as fh:
        fh.write(pagina_menu())
    with open(os.path.join(LAM, "caminos.json"), "w") as fh:
        json.dump(CAMINOS, fh, ensure_ascii=False, indent=2)
    print("láminas:", [c["clave"] for c in CAMINOS], "+ menu.html")


if __name__ == "__main__":
    main()
