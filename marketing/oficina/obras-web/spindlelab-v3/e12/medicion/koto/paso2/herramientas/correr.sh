#!/usr/bin/env bash
# E12 · Koto · paso 2 · repite la medición de color y de casos.
# Uso: bash correr.sh <dir-trabajo> [paralelo=3]
# Deja en <dir-trabajo>/crudo los JSON y en <dir-trabajo>/cuadros las pantallas; después pixeles.py,
# capturas.py y armar.py escriben ../medicion-color-y-casos.json y ../capturas/.
# Necesita el proxy del entorno (HTTPS_PROXY) y Playwright de spindlelab-astro/node_modules.
set -u
H="$(cd "$(dirname "$0")" && pwd)"
P="$(dirname "$H")"
W="${1:?falta el directorio de trabajo}"
N="${2:-3}"
mkdir -p "$W/crudo" "$W/cuadros" "$P/capturas"
node "$H/reconocer.mjs" "$W/crudo/reconocer.json"
# una línea por corrida: tipo id url ancho
grep -v '^#' "$H/paginas.txt" | while read -r id url ar ac; do
  for a in ${ar//,/ }; do echo "recorrido $id $url $a"; done
  [ "$ac" != "-" ] && for a in ${ac//,/ }; do echo "caso $id $url $a"; done
done > "$W/trabajos.txt"
correr() {
  set -- $1
  local tipo=$1 id=$2 url=$3 a=$4 f
  [ "$tipo" = recorrido ] && f="$W/crudo/recorrido-$id-$a.json" || f="$W/crudo/caso-$id-$a.json"
  [ -s "$f" ] && { echo "ya $tipo $id $a"; return; }
  for i in 1 2 3; do
    if [ "$tipo" = recorrido ]; then node "$H/recorrido.mjs" "$id" "$url" "$a" "$W/crudo" "$W/cuadros" && return; else node "$H/caso.mjs" "$id" "$url" "$a" "$W/crudo" && return; fi
    echo "reintento $tipo $id $a ($i)"
  done
}
export -f correr; export H W
xargs -P "$N" -I{} bash -c 'correr "{}"' < "$W/trabajos.txt"
node "$H/menu-pie.mjs" "$W/crudo" "$P/capturas"
node "$H/velo.mjs" "$W/crudo"
node "$H/tinta.mjs" "$W/crudo"
python3 -I "$H/contraste-negro.py" "$W/crudo/contraste-negro.json"
python3 -I "$H/pixeles.py" "$W/crudo" "$W/cuadros"
python3 -I "$H/capturas.py" "$W/crudo" "$W/cuadros" "$P/capturas"
python3 -I "$H/armar.py" "$W/crudo" "$P/medicion-color-y-casos.json"
