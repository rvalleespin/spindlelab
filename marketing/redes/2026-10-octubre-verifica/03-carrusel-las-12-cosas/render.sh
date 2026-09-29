#!/bin/zsh
# Rehace las 6 laminas del carrusel a 1080x1080.
# Cada lamina se pide por ?s=N y se dibuja sola: el render es determinista y
# se puede rehacer una suelta sin tocar las otras.
#
#   ./render.sh        -> las 6
#   ./render.sh 3      -> solo la lamina 3
set -e
cd "${0:A:h}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[[ -x "$CHROME" ]] || { echo "Falta Chrome en $CHROME"; exit 1; }
URL=$(python3 -c "import pathlib,sys;print(pathlib.Path(sys.argv[1]).resolve().as_uri())" "carrusel.html")

DESDE=${1:-1}; HASTA=${2:-${1:-6}}
for s in $(seq $DESDE $HASTA); do
  OUT=$(printf "lamina-%02d.png" $s)
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1080,1080 \
    --virtual-time-budget=2500 \
    --screenshot="$OUT" "${URL}?s=${s}" 2>/dev/null
  echo "  $OUT"
done

python3 -c "
from PIL import Image
import glob
for f in sorted(glob.glob('lamina-*.png')):
    im=Image.open(f)
    assert im.size==(1080,1080), f+' tamano equivocado: '+str(im.size)
    print(f, im.size, im.mode)
"
