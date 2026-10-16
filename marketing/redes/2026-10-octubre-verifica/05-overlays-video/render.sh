#!/bin/zsh
# Rehace los overlays transparentes de esta carpeta.
#
#   ./render.sh                 -> todos
#   ./render.sh recuadro-sitio  -> solo ese
#
# Lo que NO se puede cambiar sin romperlo:
#   --default-background-color=00000000  deja el fondo transparente. Sin esto el
#       PNG sale opaco y el overlay tapa el video. El HTML tampoco puede declarar
#       un `background` en html/body.
#   --force-device-scale-factor=1        o sale al doble de tamano.
#
# `timeout` NO existe en macOS (es de coreutils). Si alguna vez hay que vigilar
# un render colgado, se hace como en 04-reel-estas-seguro/render.sh: proceso al
# fondo y `kill` a mano. Y ojo con `(( i++ ))` bajo `set -e`: devuelve el valor
# ANTERIOR, y un 0 aritmetico se lee como fallo y mata el script sin decir nada.
# Se escribe `i=$(( i + 1 ))`.
set -e
AQUI=${0:a:h}
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[[ -x "$CHROME" ]] || { echo "Falta Chrome en $CHROME"; exit 1; }

# pieza:modo:ancho:alto
PIEZAS=(
  "recuadro-sitio:cuadro:1080:1920"
  "recuadro-sitio:justo:1080:355"
)

filtro=${1:-}
for p in $PIEZAS; do
  nombre=${p%%:*}; resto=${p#*:}
  modo=${resto%%:*}; resto=${resto#*:}
  ancho=${resto%%:*}; alto=${resto#*:}
  [[ -n "$filtro" && "$nombre" != "$filtro" ]] && continue
  salida="$AQUI/${nombre}-${modo}.png"
  url="file://$(python3 -c "import pathlib,sys;print(pathlib.Path(sys.argv[1]).resolve())" "$AQUI/${nombre}.html")?modo=${modo}"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --default-background-color=00000000 --window-size=${ancho},${alto} \
    --screenshot="$salida" "$url" >/dev/null 2>&1
  # Un PNG sin canal alfa no sirve de overlay y se ve bien al abrirlo, asi que se
  # comprueba siempre: color-type 6 = RGBA.
  python3 - "$salida" <<'PY'
import sys,struct
d=open(sys.argv[1],'rb').read()
w,h,bd,ct=struct.unpack('>IIBB',d[16:26])
estado='OK' if ct==6 else 'SIN ALFA, NO SIRVE'
print(f"  {sys.argv[1].split('/')[-1]:<32} {w}x{h}  {estado}")
if ct!=6: raise SystemExit(1)
PY
done
