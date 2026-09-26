#!/bin/zsh
# Render de la story a 1080x1920 con Chrome headless real.
# Se corre desde la carpeta de la pieza: las rutas del HTML son relativas.
set -e
cd "${0:A:h}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1080,1920 \
  --virtual-time-budget=6000 \
  --screenshot="story.png" "file://$PWD/story.html" 2>/dev/null
python3 -c "
from PIL import Image
im=Image.open('story.png'); print('render:', im.size, im.mode)
assert im.size==(1080,1920), 'tamano equivocado'
"
