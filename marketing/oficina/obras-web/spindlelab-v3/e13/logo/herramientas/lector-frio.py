"""E13 · logo opción 2 · lectura fría de «la i con su disco» (Bruno, 30-oct-2026).

Uso: python3 -I lector-frio.py <dir-capturas> <salida.json> <dir-vacio-de-trabajo> [solo-palabra]

Mismo método que e12/logo/herramientas/lector-frio.py (la prueba de la tortera): el lector es Claude Code
(`claude -p`) en un directorio vacío, en una conversación nueva, sin herramientas, sin skills, sin MCP, sin ajustes ni
CLAUDE.md, sin las variables de entorno que apuntan a los repos y a la sesión que lo llama, y con un prompt de sistema
que no dice qué es la imagen. Las imágenes van dentro del mensaje (base64): el lector no ve nombres de archivo.

Lo que cambia es lo que se pregunta, porque el riesgo es otro. Con El huso el riesgo era que la tortera se leyera
alfiler, cerradura o seta; con la «i» de disco es que el signo solo se lea como el símbolo de «información», un clavo o
un chinche, y que en el logo chico la «i» se lea «ī» (con raya) o «t». Tres turnos (con «solo-palabra», solo el 3):
  1. El signo solo (240 px y el favicon a 48, 32 y 16): ¿qué ves? (abierta)
  2. Una lista cerrada, en orden fijo: ordénala y descarta.
  3. El logo a 120, 24, 16 y 12 px y sobre blanco: ¿qué dice, letra por letra?, ¿qué letra cuesta?
"""
import base64
import json
import os
import subprocess
import sys
import time

D, SALIDA, CWD = sys.argv[1], sys.argv[2], sys.argv[3]
SOLO_PALABRA = len(sys.argv) > 4 and sys.argv[4] == "solo-palabra"
os.makedirs(CWD, exist_ok=True)

SISTEMA = ("Eres una persona adulta de Chile que mira imágenes y contesta con honestidad lo que ve, en español de "
           "Chile, tuteando, breve y concreto. No tienes ninguna información previa sobre las imágenes ni sobre quién "
           "te las muestra.")

PALABRA = (["palabra-dpr1.png", "palabra-dpr2.png", "palabra-blanco-dpr1.png"],
           "Te muestro un logo a varios tamaños (imagen 1, pantalla común; 2, alta densidad, como un celular; 3, sobre "
           "blanco, a los tamaños chicos). ¿Qué dice el logo, letra por letra? ¿Alguna letra te cuesta o te hace "
           "dudar, y a qué tamaño? Si alguna letra lleva una marca o un acento que no esperabas, di cuál y cómo lo "
           "lees.")
TURNOS = [
    (["signo-dpr1.png", "signo-dpr2.png", "signo-pixeles.png"],
     "Te muestro un signo gráfico, blanco sobre negro, a cuatro tamaños. La imagen 1 es como se ve en una pantalla "
     "común; la 2, en una pantalla de alta densidad, como la de un celular; la 3 amplía los dos tamaños más chicos "
     "para que se vean los píxeles. Sin pensarlo mucho: ¿qué ves? Dame tu primera lectura y otras dos posibles, cada "
     "una con seguridad alta, media o baja. Si a algún tamaño cambia lo que ves, dilo."),
    ([],
     "Ahora ordena esta lista de la más parecida a la menos parecida a lo que ves en el signo grande, y di cuáles "
     "descartas del todo: una letra i minúscula; el ícono de «información» (la i de los carteles y las apps); un "
     "clavo; un chinche (de los que se clavan en el corcho); una persona o figura humana; una seta u hongo; un signo "
     "de exclamación al revés (¡); una letra T; un disco sobre un poste."),
    PALABRA,
]
if SOLO_PALABRA:
    TURNOS = [PALABRA]

env = dict(os.environ)
for v in ("CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD", "CLAUDE_ADDITIONAL_DIRECTORIES",
          "CLAUDE_CODE_REMOTE_SESSION_ID", "CLAUDE_CODE_CHILD_SESSION", "CLAUDE_CODE_MESSAGING_SOCKET",
          "CLAUDE_CODE_MESSAGING_TOKEN"):
    env.pop(v, None)
cmd = ["claude", "-p", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose",
       "--tools", "", "--disable-slash-commands", "--strict-mcp-config", "--setting-sources", "",
       "--system-prompt", SISTEMA]
proc = subprocess.Popen(cmd, cwd=CWD, env=env, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                        text=True, bufsize=1)

registro = {"fecha": time.strftime("%Y-%m-%d %H:%M"), "capturas": os.path.basename(os.path.normpath(D)),
            "sistema": SISTEMA, "turnos": []}
for imgs, texto in TURNOS:
    contenido = [{"type": "text", "text": texto}]
    for i, f in enumerate(imgs, 1):
        contenido.append({"type": "text", "text": f"Imagen {i}:"})
        contenido.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                       "data": base64.b64encode(open(os.path.join(D, f), "rb").read()).decode()}})
    proc.stdin.write(json.dumps({"type": "user", "message": {"role": "user", "content": contenido}}) + "\n")
    proc.stdin.flush()
    respuesta = []
    for linea in proc.stdout:
        try:
            e = json.loads(linea)
        except json.JSONDecodeError:
            continue
        if e.get("type") == "system" and e.get("subtype") == "init":
            registro["init"] = {"herramientas": e.get("tools"), "skills": e.get("skills"), "mcp": e.get("mcp_servers"),
                                "modelo": e.get("model")}
        if e.get("type") == "assistant":
            for b in e["message"]["content"]:
                if b.get("type") == "text":
                    respuesta.append(b["text"])
        if e.get("type") == "result":
            break
    registro["turnos"].append({"imagenes": imgs, "pregunta": texto, "respuesta": "\n".join(respuesta)})
proc.stdin.close()
proc.wait(timeout=60)
json.dump(registro, open(SALIDA, "w"), ensure_ascii=False, indent=1)
print(SALIDA, "listo")
