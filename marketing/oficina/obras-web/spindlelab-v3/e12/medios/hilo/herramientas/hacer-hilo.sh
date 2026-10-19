#!/usr/bin/env bash
# E12 · portada de A · medios del hilo de oro (Bruno, 19-oct-2026).
# Uso: bash herramientas/hacer-hilo.sh        (desde cualquier lugar del repo)
#
# Sale de spindlelab-astro/public/hero-hilo-de-oro.mp4 sin tocarlo (solo se lee) y deja en e12/medios/hilo/:
#   hilo-1920.webm  VP9, 1920 × 1080        hilo-1920.mp4  H.264 High, 1920 × 1080
#   hilo-movil.webm VP9, 500 × 1080 (9:19,5) hilo-movil.mp4 H.264 High, 500 × 1080
#   hilo-1920-poster.webp, hilo-movil-poster.webp (el primer cuadro del bucle)
# y bucle.json con las medidas (herramientas/medir-bucle.py).
#
# Qué le hace al clip, y nada más (ninguna generación, ningún gasto):
#   1. El bucle. El clip original termina en una maraña de hilos y empieza en tres hilos sueltos: el corte del
#      bucle salta (medido: 8,6 veces la diferencia mediana entre dos cuadros seguidos, y la luz media pasa de 53
#      a 23). Se arregla con un fundido de 24 cuadros (1 s): el bucle empieza en el cuadro 24 del original y sus
#      últimos 24 cuadros se funden con los cuadros 0 a 23. Queda de 121 cuadros (5,04 s) y el corte cae en un
#      cuadro que se parece al siguiente tanto como dos cuadros seguidos cualesquiera.
#   2. El recorte del teléfono: 500 × 1080 desde x 518 (centro en el 40 % del ancho), donde el hilo de oro se ve en
#      el 90 % de los cuadros. Koto pone su reel a pantalla completa a 390 × 844 (lock-koto.md, medicion.json:
#      showreel-video-container 390 × 844), así que la variante del teléfono es vertical.
#   3. Sin audio (el original ya no tiene), un cuadro clave al inicio y faststart en el MP4, para que el navegador
#      lo empiece a mostrar antes de bajarlo entero.
set -euo pipefail
RAIZ="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
AQUI="$RAIZ/marketing/oficina/obras-web/spindlelab-v3/e12/medios/hilo"
SRC="$RAIZ/spindlelab-astro/public/hero-hilo-de-oro.mp4"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

D=24                                   # cuadros del fundido del bucle (1 s a 24 fps)
FPS=24
N=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$SRC")
L=$((N - D))                           # cuadros del bucle
OFF=$(python3 -c "print(($L - $D) / $FPS)")
DUR=$(python3 -c "print($D / $FPS)")
X_MOVIL=518                            # recorte del teléfono: 500 px de ancho, centro en el 40 % de 1920

echo "original: $N cuadros; bucle: $L cuadros ($D de fundido)"

# 1 · maestro sin pérdida (FFV1), del que salen todas las versiones
ffmpeg -v error -y -i "$SRC" -filter_complex \
  "[0:v]split[a][b];[a]trim=start_frame=$D,setpts=PTS-STARTPTS[m];[b]trim=end_frame=$D,setpts=PTS-STARTPTS[h];[m][h]xfade=transition=fade:duration=$DUR:offset=$OFF,format=yuv420p[v]" \
  -map "[v]" -c:v ffv1 -an "$TMP/maestro-1920.mkv"
ffmpeg -v error -y -i "$TMP/maestro-1920.mkv" -vf "crop=500:1080:$X_MOVIL:0" -c:v ffv1 -an "$TMP/maestro-movil.mkv"

# 2 · VP9 (WebM), dos pasadas, calidad constante (crf 31): sale bajo 1,1 MB a 1920
vp9 () {  # vp9 <maestro> <salida> <tile-columns>
  ffmpeg -v error -y -i "$1" -c:v libvpx-vp9 -b:v 0 -crf 31 -pass 1 -passlogfile "$TMP/vp9" -row-mt 1 -tile-columns "$3" \
    -deadline good -cpu-used 4 -g "$L" -an -f null /dev/null
  ffmpeg -v error -y -i "$1" -c:v libvpx-vp9 -b:v 0 -crf 31 -pass 2 -passlogfile "$TMP/vp9" -row-mt 1 -tile-columns "$3" \
    -deadline good -cpu-used 1 -g "$L" -an "$2"
}
# 3 · H.264 (MP4), dos pasadas a tasa fija: High 4.0, yuv420p, faststart
h264 () {  # h264 <maestro> <salida> <kbit/s>
  ffmpeg -v error -y -i "$1" -c:v libx264 -preset slower -profile:v high -level 4.0 -pix_fmt yuv420p \
    -b:v "${3}k" -maxrate "$(( $3 * 2 ))k" -bufsize "$(( $3 * 3 ))k" -x264-params "keyint=$L:min-keyint=$L:aq-mode=3" \
    -pass 1 -passlogfile "$TMP/h264" -an -f null /dev/null
  ffmpeg -v error -y -i "$1" -c:v libx264 -preset slower -profile:v high -level 4.0 -pix_fmt yuv420p \
    -b:v "${3}k" -maxrate "$(( $3 * 2 ))k" -bufsize "$(( $3 * 3 ))k" -x264-params "keyint=$L:min-keyint=$L:aq-mode=3" \
    -pass 2 -passlogfile "$TMP/h264" -an -movflags +faststart "$2"
}
vp9  "$TMP/maestro-1920.mkv"  "$AQUI/hilo-1920.webm"  2
h264 "$TMP/maestro-1920.mkv"  "$AQUI/hilo-1920.mp4"   2250
vp9  "$TMP/maestro-movil.mkv" "$AQUI/hilo-movil.webm" 0
h264 "$TMP/maestro-movil.mkv" "$AQUI/hilo-movil.mp4"  800

# 4 · pósteres: el primer cuadro del bucle (así no salta cuando el video arranca), WebP calidad 82
ffmpeg -v error -y -i "$TMP/maestro-1920.mkv"  -vf "select=eq(n\,0)" -frames:v 1 -c:v libwebp -quality 82 -compression_level 6 "$AQUI/hilo-1920-poster.webp"
ffmpeg -v error -y -i "$TMP/maestro-movil.mkv" -vf "select=eq(n\,0)" -frames:v 1 -c:v libwebp -quality 82 -compression_level 6 "$AQUI/hilo-movil-poster.webp"

# 5 · medidas
python3 -I "$AQUI/herramientas/medir-bucle.py" "$SRC" "$TMP/maestro-1920.mkv" "$TMP/maestro-movil.mkv" "$AQUI" "$D"
