"""Lectura en frío de la obra E13 (brief §7, criterio 4). Tres lectores sin contexto leen el texto del sitio construido y dicen qué
entendieron. Mismo aislamiento que e12/cierre/herramientas/criterio13-lector.py: Claude Code (`claude -p`) en un directorio vacío, una
conversación nueva por lector, sin herramientas, sin skills, sin MCP, sin ajustes ni CLAUDE.md y sin las variables de entorno de la
sesión. Lo único que recibe es `instrucciones.txt` con su perfil y el texto que sacó lectura-fria-texto.mjs.

Uso: python3 -I lectura-fria.py <carpeta con instrucciones.txt y entrada.txt> <directorio vacío>
Escribe <carpeta>/lector-<n>.txt con la respuesta íntegra y <carpeta>/lectores.json con la fecha y el perfil.
"""
import json, os, subprocess, sys, time

CARPETA, VACIO = sys.argv[1], sys.argv[2]
os.makedirs(VACIO, exist_ok=True)
assert not os.listdir(VACIO), "el directorio del lector tiene que estar vacío"

PERFILES = [
    "Dueña de una consultora de 4 personas en Santiago. Te llegan consultas por recomendación y por LinkedIn, pero no sabes cuántas "
    "terminan en venta. No sabes de SEO ni de sitios web; sí de tu negocio.",
    "Gerente comercial de una clínica de 14 personas. Pagas anuncios en Google y en Instagram todos los meses y le rindes cuentas al "
    "dueño. Sabes de ventas; el sitio lo hizo una agencia hace años.",
    "Dueño de un restaurante con dos locales. Tu sitio lo hizo un conocido y casi no lo miras. Vendes por reservas y por redes. "
    "Lees con desconfianza cuando alguien te quiere vender algo.",
]
SISTEMA = ("Eres una persona que lee un sitio web por primera vez y cuenta con honestidad qué entendió. No eres un "
           "asistente ni un experto: respondes como la persona que se te describe.")

plantilla = open(os.path.join(CARPETA, "instrucciones.txt"), encoding="utf-8").read()
texto = open(os.path.join(CARPETA, "entrada.txt"), encoding="utf-8").read()

env = dict(os.environ)
for v in ("CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD", "CLAUDE_ADDITIONAL_DIRECTORIES",
          "CLAUDE_CODE_REMOTE_SESSION_ID", "CLAUDE_CODE_CHILD_SESSION", "CLAUDE_CODE_MESSAGING_SOCKET",
          "CLAUDE_CODE_MESSAGING_TOKEN"):
    env.pop(v, None)

registro = {"fecha": time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime()), "sistema": SISTEMA, "lectores": []}
for n, perfil in enumerate(PERFILES, 1):
    prompt = plantilla.replace("{PERFIL}", perfil) + "\n" + texto
    cmd = ["claude", "-p", "--output-format", "text", "--tools", "", "--disable-slash-commands",
           "--strict-mcp-config", "--setting-sources", "", "--system-prompt", SISTEMA]
    r = subprocess.run(cmd, cwd=VACIO, env=env, input=prompt, capture_output=True, text=True, timeout=900)
    salida = r.stdout.strip()
    if r.returncode != 0 or not salida:
        print(f"lector {n}: falló ({r.returncode}): {r.stderr[-800:]}", file=sys.stderr)
        sys.exit(1)
    open(os.path.join(CARPETA, f"lector-{n}.txt"), "w", encoding="utf-8").write(f"PERFIL: {perfil}\n\n{salida}\n")
    registro["lectores"].append({"n": n, "perfil": perfil, "caracteres": len(salida)})
    print(f"lector {n}: {len(salida)} caracteres")
    assert not os.listdir(VACIO), "el lector escribió en su directorio"

json.dump(registro, open(os.path.join(CARPETA, "lectores.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
