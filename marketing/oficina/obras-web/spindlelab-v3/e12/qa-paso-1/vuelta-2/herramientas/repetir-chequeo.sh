#!/usr/bin/env bash
# QA E12 paso 1, vuelta 2 (Javiera) · repite el chequeo de 21 señales sobre dos dominios y lo compara, señal por
# señal, con el crudo del inventario (e12/inventario/crudo/chequeo-<dominio>.json).
# Uso: bash repetir-chequeo.sh <carpeta-crudo> <dominio> [<dominio>…]
set -u
salida="$1"; shift
inv="$(cd "$(dirname "$0")/../../../inventario/crudo" && pwd)"
for d in "$@"; do
  curl -sS -D "$salida/chequeo-$d.headers.txt" -o "$salida/chequeo-$d.json" \
    -A "Mozilla/5.0 (QA SpindleLab, Javiera)" "https://spindlelab.cl/api/chequeo?dominio=$d"
  echo "== $d (curl exit $?)"
  python3 -I - "$inv/chequeo-$d.json" "$salida/chequeo-$d.json" <<'EOF'
import json, sys
a = json.load(open(sys.argv[1])); b = json.load(open(sys.argv[2]))
print(f"inventario: puntaje {a['puntaje']} · peso {a.get('pesoConfirmado')}/{a.get('pesoTotal')} · revisadoEn {a.get('revisadoEn')}")
print(f"hoy (QA):   puntaje {b['puntaje']} · peso {b.get('pesoConfirmado')}/{b.get('pesoTotal')} · revisadoEn {b.get('revisadoEn')}")
def mapa(x):
    return {i.get('id') or i.get('clave') or i.get('nombre'): (i.get('estado'), i.get('peso')) for i in x['items']}
ma, mb = mapa(a), mapa(b)
print(f"señales: {len(ma)} y {len(mb)}")
dif = [(k, ma.get(k), mb.get(k)) for k in sorted(set(ma) | set(mb), key=str) if ma.get(k) != mb.get(k)]
print("diferencias:", dif if dif else "ninguna")
from collections import Counter
print("estados hoy:", dict(Counter(v[0] for v in mb.values())))
print("bloques hoy:", [(bl.get('id') or bl.get('nombre'), bl.get('peso')) for bl in b.get('bloques', [])])
EOF
done
