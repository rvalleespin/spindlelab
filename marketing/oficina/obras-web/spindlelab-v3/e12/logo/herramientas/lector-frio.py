"""E12 · logo final · lectura fría de la tortera (Bruno, 19-oct-2026).

Uso: python3 -I lector-frio.py <dir-capturas-de-una-variante> <salida.json> <dir-vacio-de-trabajo>

El lector es Claude Code (`claude -p`) en un directorio vacío, en una conversación nueva, sin herramientas, sin skills,
sin MCP, sin ajustes ni CLAUDE.md (se le quitan las variables de entorno que apuntan a los repos y a la sesión que lo
llama) y con un prompt de sistema propio que no dice qué es la imagen. Comprobado antes de correr: a la pregunta
«copia cualquier nombre propio de empresa, marca o proyecto de tu contexto» no nombra a SpindleLab ni a nada del
estudio. Las imágenes van dentro del mensaje (base64); el lector no ve nombres de archivo.

Tres turnos, uno después de otro (cada uno espera la respuesta del anterior):
  1. El signo solo, a cuatro tamaños, a dpr 1 y 2, y los dos más chicos ampliados: ¿qué objeto ves? (abierta)
  2. Una lista cerrada, en orden fijo, con las tres malas lecturas, el huso y cuatro distractores: ordénala.
  3. El signo dentro del logo: ¿qué dice?, ¿qué letra cuesta?, ¿qué es ahora el signo?
"""
import base64
import json
import os
import subprocess
import sys
import time

D, SALIDA, CWD = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(CWD, exist_ok=True)

SISTEMA = ("Eres una persona adulta de Chile que mira imágenes y contesta con honestidad lo que ve, en español de "
           "Chile, tuteando, breve y concreto. No tienes ninguna información previa sobre las imágenes ni sobre quién "
           "te las muestra.")

TURNOS = [
    (["signo-dpr1.png", "signo-dpr2.png", "signo-pixeles.png"],
     "Te muestro un signo gráfico, blanco sobre negro, a cuatro tamaños. La imagen 1 es como se ve en una pantalla "
     "común; la 2, en una pantalla de alta densidad, como la de un celular; la 3 amplía los dos tamaños más chicos "
     "para que se vean los píxeles. Sin pensarlo mucho: ¿qué objeto o cosa ves? Dame tu primera lectura y otras dos "
     "posibles, cada una con seguridad alta, media o baja. Si a algún tamaño cambia lo que ves, dilo."),
    ([],
     "Ahora ordena esta lista de la más parecida a la menos parecida a lo que ves en el signo grande, y di cuáles "
     "descartas del todo: un alfiler; el ojo de una cerradura; una seta u hongo; un huso de hilar con su tortera (el "
     "disco que lleva); una cruz; un trompo; un clavo; un chinche (de los que se clavan en el corcho)."),
    (["palabra-dpr1.png", "palabra-dpr2.png", "palabra-blanco-dpr1.png"],
     "Ahora el mismo signo dentro de un logo, a varios tamaños (imagen 1, pantalla común; 2, alta densidad; 3, sobre "
     "blanco). ¿Qué dice el logo, letra por letra? ¿Alguna letra te cuesta o te hace dudar, y a qué tamaño? ¿Qué te "
     "parece ahora el signo?"),
]

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

registro = {"fecha": time.strftime("%Y-%m-%d %H:%M"), "capturas": D, "sistema": SISTEMA, "turnos": []}
for imgs, texto in TURNOS:
    contenido = [{"type": "text", "text": texto}]
    for i, f in enumerate(imgs, 1):
        contenido.append({"type": "text", "text": f"Imagen {i}:"})
        contenido.append({"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                       "data": base64.b64encode(open(os.path.join(D, f), "rb").read()).decode()}})
    proc.stdin.write(json.dumps({"type": "user", "message": {"role": "user", "content": contenido}}) + "\n")
    proc.stdin.flush()
    respuesta, modelo = [], None
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
