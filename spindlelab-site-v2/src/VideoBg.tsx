import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  className?: string;
};

/**
 * Fondo de video en loop, mudo y auto-reproducido. Se auto-hospeda desde
 * /public, sin depender de URLs externas.
 *
 * Autoplay robusto: React no siempre refleja `muted` como atributo del DOM en
 * el primer render, y sin `muted` el navegador bloquea el autoplay; por eso lo
 * fijamos en el elemento. Además intentamos play() de inmediato y, como
 * fallback para contextos con autoplay restringido, al primer gesto del usuario.
 */
export default function VideoBg({ src, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    let started = false;

    const cleanup = () => {
      v.removeEventListener('canplay', start);
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
      window.removeEventListener('scroll', start);
    };

    function start() {
      if (started) return;
      v!.play()
        .then(() => {
          started = true;
          cleanup();
        })
        .catch(() => {});
    }

    start();
    v.addEventListener('canplay', start);
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('scroll', start, { passive: true });

    return cleanup;
  }, [src]);

  return (
    <video
      ref={ref}
      className={className ?? 'absolute inset-0 w-full h-full object-cover'}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
