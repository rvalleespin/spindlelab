# Cuadros de referencia

Cuatro JPG sacados **del `reel.mp4` actual**, uno por tiempo, para ver la pieza sin abrir el
video. No son los cuadros fuente del render.

⚠️ Antes había nueve PNG de 1080×1920 acá (unos 10 MB). Se sacaron por dos razones: pesaban en
un repo que vive en iCloud, y **estaban obsoletos**, porque se renderizaron antes del arreglo
de estructura del 25-sep y ya no coincidían con el MP4. Un cuadro de muestra que no calza con
el video es peor que ninguno.

**Los 330 cuadros reales se regeneran idénticos** con `./render.sh`: el render es determinista,
cada cuadro se pide por `?f=N` y se dibuja solo en función de N. Van a una carpeta temporal
fuera del repo, no acá.
