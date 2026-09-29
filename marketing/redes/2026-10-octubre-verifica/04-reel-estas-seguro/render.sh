#!/bin/zsh
# Rehace el Reel entero desde reel.html.
#
# El render es DETERMINISTA: cada cuadro se pide por ?f=N y se dibuja solo en
# funcion de N, asi que sale identico cada vez y se puede rehacer un tramo suelto
# sin tocar el resto.
#
#   ./render.sh               -> los 480 cuadros + reel.mp4
#   ./render.sh 240 341       -> solo ese tramo
#   ./render.sh 0 479 montar  -> fuerza el montaje
#
set -e
AQUI=${0:a:h}
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FFMPEG="$HOME/bin/ffmpeg"
TOTAL=480            # 16 s a 30 cuadros

# EN SERIE A PROPOSITO. Paralelizar cuelga Chrome headless: los procesos quedan
# vivos sin escribir el PNG. Documentado en la pieza 01 el 25-sep-2026. No lo
# vuelvas a paralelizar sin comprobar que termina.
#
# Los cuadros NO van a la carpeta del repo: son ~480 PNG de ~1,2 MB y esta
# carpeta vive en iCloud Drive. Van a disco local y de ahi sale el MP4.
SALIDA="${CUADROS_DIR:-${TMPDIR:-/tmp}/verifica-reel-estas-seguro}"
DESDE=${1:-0}
HASTA=${2:-$((TOTAL-1))}

[[ -x "$CHROME" ]] || { echo "Falta Chrome en $CHROME"; exit 1; }
[[ -x "$FFMPEG" ]] || { echo "Falta ffmpeg en $FFMPEG"; exit 1; }

mkdir -p "$SALIDA"
URL=$(python3 -c "import pathlib,sys;print(pathlib.Path(sys.argv[1]).resolve().as_uri())" "$AQUI/reel.html")

echo "Cuadros $DESDE..$HASTA -> $SALIDA"
for f in $(seq $DESDE $HASTA); do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1920 --virtual-time-budget=1500 \
    --screenshot="$(printf "%s/cuadro-%04d.png" "$SALIDA" $f)" "${URL}?f=${f}" >/dev/null 2>&1
  (( f % 40 == 0 )) && echo "  ...$f"
done

HECHOS=$(ls "$SALIDA" | grep -c '^cuadro-' || true)
echo "Cuadros en disco: $HECHOS"

if [[ "$DESDE" == "0" && "$HASTA" == "$((TOTAL-1))" ]] || [[ "$3" == "montar" ]]; then
  [[ "$HECHOS" -eq "$TOTAL" ]] || { echo "Faltan cuadros ($HECHOS de $TOTAL), no monto"; exit 1; }
  echo "Montando reel.mp4"
  # -pix_fmt yuv420p no es opcional: sin eso Instagram y QuickTime pueden no reproducirlo.
  "$FFMPEG" -y -loglevel error -framerate 30 -i "$SALIDA/cuadro-%04d.png" \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart \
    "$AQUI/reel.mp4"
  echo "Listo: $AQUI/reel.mp4"
fi
