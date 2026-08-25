# Prompts fuente — Casa inundada

Los prompts se escribieron en inglés por adherencia del modelo. El brief original
en español (de Ramón) está reproducido al final.

## Dirección A — nano_banana_pro, 16:9

### A1 / A2 (primera tanda)

```
Editorial newspaper cartoon illustration, thick confident hand-drawn ink linework, slightly rough pen strokes, flat matte paper texture. Muted desaturated palette of blue-greys and dull ochres; one single warm amber accent, present ONLY as the glow of the lantern flame.

Horizontal composition. Interior of a modest humble home, flooded with murky opaque brown water up to mid-calf. Everyday belongings floating on the water: an overturned wooden chair, a collapsed soggy cardboard box, one lone sneaker. In the centre of the room, an adult human figure seen from behind, back to the viewer, face not visible at all, holding up a small lantern that lights only a small circle of the room. Beside them, a small child figure, also seen from behind, face not visible, kept small and in the mid-ground, never in the foreground.

Entering through the doorway frame from the side: one enormous, deliberately disproportionate hand wearing a crisp formal shirt cuff with a cufflink, gripping an electrical cable that runs out of the wall socket and pulling it. The cable is stretched taut, one instant from being unplugged.

Far background, through a broken window pane: the barely suggested silhouette of a small institutional building with columns, tiny, faint and out of focus.

Strict requirements: absolutely NO text, NO letters, NO numbers, NO signage, NO logos, NO brand marks of any kind anywhere in the image, including on the floating objects. No recognisable faces; no figure resembles any identifiable real person. No flags, no political party emblems, no religious symbols, no institutional insignia. Do not aestheticise the disaster: no dramatic beauty in the water, no epic atmosphere, no cinematic god-rays, no sparkle or reflections made pretty; keep it dry, plain and restrained, the tone of quiet reportage. No blood, no gore, no injured bodies. Not a 3D render, not photorealistic, not video-game art, no digital airbrush gloss.
```

### A3 / A4 (refinada — la que dio la pieza elegida)

Cambios respecto de la anterior: se ancla el recorrido del cable por el tercio
inferior para que no cruce a las figuras, se explicita el nivel del agua a media
pantorrilla del adulto, y se refuerza que todo lo que no sea el farol queda frío.

```
Editorial newspaper cartoon illustration, thick confident hand-drawn ink linework, slightly rough pen strokes, flat matte paper texture. Muted desaturated palette of blue-greys and dull ochres; one single warm amber accent, present ONLY as the glow of the lantern flame — every other surface stays cold and grey.

Horizontal composition, eye-level. Interior of a modest humble home, flooded with murky opaque brown water. The water level is clearly at mid-calf on the standing adult. Everyday belongings floating on the water: an overturned wooden chair at lower left, a collapsed soggy cardboard box, one single lone sneaker. In the centre of the room, an adult human figure seen from behind, back to the viewer, face completely not visible, holding up a small lantern in one raised hand; the lantern lights only a small circle around them. Beside them, a small child figure, also seen from behind, face not visible, small and kept in the mid-ground, never in the foreground.

On the right, entering through an open doorway frame, one enormous, deliberately disproportionate hand wearing a crisp formal shirt cuff with a plain cufflink. The hand grips an electrical cable and pulls it. IMPORTANT: the cable runs LOW, along the lower third of the picture just above the waterline, from a wall socket on the right-hand wall to the giant hand — the cable never crosses in front of the adult or the child, and never touches them. The cable is stretched taut, the plug one instant from leaving the socket.

On the left wall, a window with a broken cracked pane; through it, far away, the barely suggested faint silhouette of a small institutional building with columns, tiny and out of focus.

Strict requirements: absolutely NO text, NO letters, NO numbers, NO signage, NO logos, NO brand marks of any kind anywhere, including on the floating objects. No recognisable faces; no figure resembles any identifiable real person. No flags, no political party emblems, no religious symbols, no institutional insignia. Do not aestheticise the disaster: no dramatic beauty in the water, no epic atmosphere, no cinematic god-rays, no pretty sparkling reflections; keep it plain, dry and restrained, the tone of quiet reportage. No blood, no gore, no injured bodies. Not a 3D render, not photorealistic, not video-game art, no digital airbrush gloss.
```

## Dirección B — recraft_v4_1 (descartada, archivada)

`model_type: standard` · `resolution: 2k` · `aspect_ratio: 16:9`
`colors: ["#3E4C59","#6B7A8C","#A9B4BE","#7E6B4A","#A98A55","#D6CDBE","#E0A44A"]`

```
Flat editorial press cartoon, risograph print feel, thick bold ink outlines, limited flat colour fills, visible paper grain. Muted blue-greys and dull ochres only; a single warm amber accent used exclusively for the lantern light.

Horizontal scene: the inside of a modest flooded home, murky brown water up to mid-calf. Floating everyday objects: an overturned wooden chair, a soggy collapsed cardboard box, one sneaker. Centre: an adult figure seen from behind, face not visible, raising a small lantern that lights a small circle. Next to the adult, a small child figure also from behind, face not visible, small and in the mid-ground.

Through the doorway comes one giant, out-of-scale hand in a formal shirt cuff with a cufflink, pulling an electrical cable out of the wall; the cable is taut, about to disconnect.

Through a broken window in the far background, the faint tiny silhouette of an institutional building with columns, blurred and small.

Strict: no text, no letters, no numbers, no signs, no logos, no brand marks anywhere. No recognisable faces. No flags, party emblems, religious symbols or institutional insignia. No beautified or dramatic water, no epic mood, no cinematic lighting. No gore, no wounds. Not 3D, not photorealistic, not video-game art.
```

**Aprendizaje:** forzar la paleta con `colors` en Recraft no equivale a "un solo
acento". El modelo reparte los 7 hex por toda la superficie, y el ocre que iba a ser
el farol terminó pintando el suelo entero. Para la regla de acento único conviene
describirla en el prompt y **no** entregar el color de acento en la lista de paleta.

---

## Brief original (español, de Ramón)

> Estilo: caricatura editorial, línea gruesa, paleta apagada de grises azulados y ocres
> con un solo acento cálido en la fuente de luz. Composición horizontal.
> Escena: interior de una casa modesta inundada, agua turbia hasta media pantorrilla.
> Muebles cotidianos flotando: una silla volcada, una caja de cartón deshecha, una
> zapatilla. En el centro, una figura humana adulta de espaldas, sin rostro visible,
> sosteniendo una vela o linterna que ilumina un pequeño círculo. Junto a ella, una
> figura infantil pequeña, también de espaldas.
> Entrando por el marco de la puerta, una mano enorme y desproporcionada con puño de
> camisa y gemelo formal, tirando de un cable eléctrico que sale de la pared. El cable
> está tenso, a punto de desconectarse.
> Al fondo, a través de una ventana rota, la silueta apenas sugerida de un edificio
> institucional con columnas, muy pequeño y difuso.
> Restricciones negativas (obligatorias):
> * Sin texto legible de ningún tipo, sin letreros, sin números, sin logos
> * Sin rostros reconocibles; ninguna figura debe parecerse a una persona real identificable
> * Sin banderas, emblemas partidarios, símbolos religiosos ni insignias institucionales reconocibles
> * Sin estetización del desastre: nada de belleza dramática en el agua, nada de atmósfera épica
> * Sin gore, sin cuerpos heridos, sin niños en primer plano ni con el rostro visible
> * Sin estética de videojuego, sin render 3D, sin fotorrealismo
> * Sin marcas comerciales de ningún tipo en los objetos flotantes
