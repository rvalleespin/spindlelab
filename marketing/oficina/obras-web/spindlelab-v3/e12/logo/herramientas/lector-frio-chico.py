"""E12 · logo final · lectura fría del logo chico (Bruno, 19-oct-2026).

Uso: python3 -I lector-frio-chico.py <dir-con-fila-dpr1.png-y-fila-dpr2.png> <salida.json> <dir-vacio>
Un turno, el mismo lector limpio de lector-frio.py: tres versiones del logo a 16, 14 y 12 px (A = punto suelto,
B = el corte grande achicado, C = tortera pegada sin punta, en ese orden en la imagen y sin decir cuál es cuál):
qué dice cada fila, qué letra cuesta y cuál se lee mejor.
"""
import base64, json, os, subprocess, sys
D, SAL, CWD = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(CWD, exist_ok=True)
env = dict(os.environ)
for v in ("CLAUDE_CODE_SESSION_ID","CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD","CLAUDE_ADDITIONAL_DIRECTORIES","CLAUDE_CODE_REMOTE_SESSION_ID","CLAUDE_CODE_CHILD_SESSION","CLAUDE_CODE_MESSAGING_SOCKET","CLAUDE_CODE_MESSAGING_TOKEN"): env.pop(v, None)
SIS = "Eres una persona adulta de Chile que mira imágenes y contesta con honestidad lo que ve, en español de Chile, tuteando, breve y concreto. No tienes ninguna información previa sobre las imágenes ni sobre quién te las muestra."
txt = ("Te muestro tres versiones (filas A, B y C) de un mismo logo chico, a 16, 14 y 12 píxeles de alto, sobre negro y sobre blanco. "
       "La imagen 1 es una pantalla común y la 2 una de alta densidad (celular). Para cada fila: ¿qué dice el logo, letra por letra, leyéndolo a tamaño real? "
       "¿Hay alguna letra que te cueste o que leas como otra? Al final, ordena las tres filas de la que se lee mejor a la que se lee peor.")
c = [{"type":"text","text":txt}]
for i,f in enumerate(("fila-dpr1.png","fila-dpr2.png"),1):
    c += [{"type":"text","text":f"Imagen {i}:"},{"type":"image","source":{"type":"base64","media_type":"image/png","data":base64.b64encode(open(os.path.join(D,f),"rb").read()).decode()}}]
cmd = ["claude","-p","--input-format","stream-json","--output-format","stream-json","--verbose","--tools","","--disable-slash-commands","--strict-mcp-config","--setting-sources","","--system-prompt",SIS]
r = subprocess.run(cmd, cwd=CWD, env=env, input=json.dumps({"type":"user","message":{"role":"user","content":c}})+"\n", capture_output=True, text=True, timeout=600)
out=[]
for l in r.stdout.splitlines():
    try: e=json.loads(l)
    except: continue
    if e.get("type")=="assistant":
        out += [b["text"] for b in e["message"]["content"] if b.get("type")=="text"]
json.dump({"pregunta":txt,"filas":{"A":"s2 (punto suelto)","B":"s0 (corte estándar escalado)","C":"s1 (tortera pegada, sin punta)"},"respuesta":"\n".join(out)}, open(SAL,"w"), ensure_ascii=False, indent=1)
print("\n".join(out))
