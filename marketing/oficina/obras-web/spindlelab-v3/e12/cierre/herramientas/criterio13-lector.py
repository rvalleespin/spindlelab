"""Mauro, cierre de la obra E12 (23-oct-2026). Criterio 13 del brief: tres lectores fríos (los perfiles de E11) leen la
home y un caso del sitio construido y dicen qué hacemos, si entendieron que también hacemos SEO técnico y visibilidad en
IA, qué harían ahora y dónde tropezaron.

El lector es Claude Code (`claude -p`) en un directorio vacío, en una conversación nueva por lector, sin herramientas,
sin skills, sin servidores MCP, sin ajustes ni CLAUDE.md y sin las variables de entorno que apuntan a esta sesión: el
mismo aislamiento de `e12/logo/herramientas/lector-frio.py` (Bruno) y de `e12/texto/lectura-fria.md` (Clara). Lo único
que recibe es `instrucciones.txt` con su perfil y el texto que sacó `criterio13-texto.mjs` del `dist/`.

Uso: python3 -I criterio13-lector.py <carpeta criterio-13> <directorio vacío>
Escribe <carpeta>/lector-<n>.txt con la respuesta íntegra y <carpeta>/lectores.json con la fecha y el perfil.
"""
import json, os, subprocess, sys, time

CARPETA, VACIO = sys.argv[1], sys.argv[2]
os.makedirs(VACIO, exist_ok=True)
assert not os.listdir(VACIO), "el directorio del lector tiene que estar vacío"

PERFILES = [
    "Gerente comercial de una empresa industrial B2B de 40 personas, en Santiago. Pagas Google Ads todos los meses y le "
    "rindes cuentas a la gerencia general. Sabes de ventas; no sabes de sitios web ni de SEO.",
    "Dueña de una clínica dental en una ciudad de regiones. Promocionas en Instagram. Tu sitio lo hizo un conocido hace "
    "años. No sabes qué es el SEO.",
    "Socio de un estudio de abogados de 8 personas. Los clientes te llegan por recomendación y ya trabajas con una "
    "empresa de marketing digital. Lees con desconfianza, como lees un contrato.",
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
